import { useState, useCallback, useEffect, useMemo } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { getLessonById, getAllLessons } from '../data/lessons';
import vocabulary from '../data/vocabulary';
import { getLessonWordsFromFirestore } from '../services/wordService';
import { getLessonGrammarFromFirestore } from '../services/grammarService';
import { getGrammarByLesson } from '../data/grammar';
import { generateQuizFromLesson, generateWordQuiz } from '../utils/generateQuiz';
import { useProgress } from '../contexts/ProgressContext';
import { useAuth } from '../contexts/AuthContext';
import { useSettings } from '../contexts/SettingsContext';
import QuestionCard from '../components/quiz/QuestionCard';
import ResultsScreen from '../components/quiz/ResultsScreen';

const ALL_LESSONS = getAllLessons();
const LESSON_OPTIONS = ALL_LESSONS.map((l) => ({
  value: l.id,
  label: `Lesson ${l.id}: ${l.titleEn.replace(/Lesson \d+: /, '')}`,
}));

function QuizConfigForm({ onStart, initialFrom, initialTo }) {
  const [fromLesson, setFromLesson] = useState(initialFrom || 1);
  const [toLesson, setToLesson] = useState(initialTo || 1);
  const [quizType, setQuizType] = useState('full'); // 'vocab' | 'full'

  const handleStart = () => {
    onStart({ from: Number(fromLesson), to: Number(toLesson), type: quizType });
  };

  return (
    <div className="animate-fade-in max-w-lg mx-auto w-full">
      <h1 className="text-2xl font-bold text-duolingo-text-primary mb-2">
        Custom Quiz
      </h1>
      <p className="text-sm text-duolingo-text-secondary mb-6">
        Choose what to study. Questions are generated from vocabulary and grammar.
      </p>

      {/* Lesson range */}
      <div className="card mb-4">
        <label className="block text-sm font-semibold text-duolingo-text-primary mb-3">
          Lessons
        </label>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <label className="block text-xs text-duolingo-text-secondary mb-1">From</label>
            <select
              value={fromLesson}
              onChange={(e) => {
                const v = Number(e.target.value);
                setFromLesson(v);
                if (v > toLesson) setToLesson(v);
              }}
              className="w-full rounded-xl border-2 border-duolingo-card-border px-3 py-2.5 text-sm font-medium text-duolingo-text-primary bg-white focus:border-duolingo-green focus:outline-none transition-colors"
            >
              {LESSON_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <span className="text-duolingo-text-secondary font-bold pt-5">→</span>
          <div className="flex-1">
            <label className="block text-xs text-duolingo-text-secondary mb-1">To</label>
            <select
              value={toLesson}
              onChange={(e) => setToLesson(Number(e.target.value))}
              className="w-full rounded-xl border-2 border-duolingo-card-border px-3 py-2.5 text-sm font-medium text-duolingo-text-primary bg-white focus:border-duolingo-green focus:outline-none transition-colors"
            >
              {LESSON_OPTIONS.filter((opt) => opt.value >= fromLesson).map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Quiz type */}
      <div className="card mb-6">
        <label className="block text-sm font-semibold text-duolingo-text-primary mb-3">
          Quiz Type
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setQuizType('vocab')}
            className={`p-4 rounded-2xl border-2 text-center transition-all duration-200 ${
              quizType === 'vocab'
                ? 'border-duolingo-green bg-duolingo-green/10 ring-2 ring-duolingo-green/20'
                : 'border-duolingo-card-border hover:border-duolingo-green/30 hover:bg-gray-50'
            }`}
          >
            <span className="text-2xl block mb-1">📖</span>
            <span className={`text-sm font-bold ${
              quizType === 'vocab' ? 'text-duolingo-green' : 'text-duolingo-text-primary'
            }`}>
              Vocab Only
            </span>
            <p className="text-xs text-duolingo-text-secondary mt-1">
              Words and meanings
            </p>
          </button>
          <button
            onClick={() => setQuizType('full')}
            className={`p-4 rounded-2xl border-2 text-center transition-all duration-200 ${
              quizType === 'full'
                ? 'border-duolingo-green bg-duolingo-green/10 ring-2 ring-duolingo-green/20'
                : 'border-duolingo-card-border hover:border-duolingo-green/30 hover:bg-gray-50'
            }`}
          >
            <span className="text-2xl block mb-1">📚</span>
            <span className={`text-sm font-bold ${
              quizType === 'full' ? 'text-duolingo-green' : 'text-duolingo-text-primary'
            }`}>
              Full Quiz
            </span>
            <p className="text-xs text-duolingo-text-secondary mt-1">
              Vocab + Grammar
            </p>
          </button>
        </div>
      </div>

      <button
        onClick={handleStart}
        className="btn-primary w-full text-lg"
      >
        Start Quiz →
      </button>
    </div>
  );
}

export default function QuizPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { updateLessonProgress, isLessonUnlocked } = useProgress();
  const { user } = useAuth();
  const { settings } = useSettings();
  const { language } = settings;

  // Range quiz config (set via config form)
  const [quizConfig, setQuizConfig] = useState(null); // { from, to, type }

  // Single lesson quiz data
  const lesson = lessonId ? getLessonById(lessonId) : null;
  const localGrammar = lessonId ? getGrammarByLesson(lessonId) : [];

  // Firestore data state (single lesson)
  const [firestoreWords, setFirestoreWords] = useState(null);
  const [firestoreGrammar, setFirestoreGrammar] = useState(null);
  const [loading, setLoading] = useState(true);

  // Quiz state
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizComplete, setQuizComplete] = useState(false);

  // Fetch single lesson data from Firestore
  useEffect(() => {
    if (!lesson || !lessonId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    Promise.all([
      getLessonWordsFromFirestore(lessonId),
      getLessonGrammarFromFirestore(lessonId),
    ])
      .then(([words, grammar]) => {
        if (words?.length) setFirestoreWords(words);
        if (grammar?.length) setFirestoreGrammar(grammar);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [lessonId, lesson]);

  // Effective data for single lesson
  const effectiveWords = firestoreWords || lesson?.words || [];
  const effectiveGrammar =
    firestoreGrammar ||
    (lesson?.grammar?.length > 0 ? lesson.grammar : localGrammar);

  // Generate single lesson questions
  const singleLessonQuestions = useMemo(() => {
    if (!lesson) return [];
    const combined = [];
    if (lesson?.quiz?.length > 0) combined.push(...lesson.quiz);
    if (effectiveWords.length >= 4 || effectiveGrammar.length >= 2) {
      const dynamic = generateQuizFromLesson(effectiveWords, effectiveGrammar, lessonId, {
        scriptMode: settings.scriptMode,
      });
      combined.push(...dynamic);
    }
    if (combined.length > 1) {
      for (let i = combined.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [combined[i], combined[j]] = [combined[j], combined[i]];
      }
    }
    return combined;
  }, [lesson, effectiveWords, effectiveGrammar, lessonId, settings.scriptMode]);

  // Generate range quiz questions from config
  const rangeQuestions = useMemo(() => {
    if (!quizConfig) return [];
    const { from, to, type } = quizConfig;
    const allWords = [];
    const allGrammar = [];

    for (let i = from; i <= to; i++) {
      const words = vocabulary[i] || [];
      allWords.push(...words);
      const grammar = getGrammarByLesson(String(i));
      allGrammar.push(...grammar);
    }

    if (type === 'vocab') {
      return generateWordQuiz(allWords, 'range', 20, settings.scriptMode);
    }
    return generateQuizFromLesson(allWords, allGrammar, 'range', {
      maxVocabQuestions: 15,
      maxGrammarQuestions: 5,
      scriptMode: settings.scriptMode,
    });
  }, [quizConfig, settings.scriptMode]);

  // Determine which questions to use
  const questions = lessonId ? singleLessonQuestions : rangeQuestions;
  const totalQuestions = questions.length;
  const isRangeQuiz = !lessonId;

  // Guard: single lesson locked or no questions
  useEffect(() => {
    if (loading || isRangeQuiz) return;
    if (!lesson || !isLessonUnlocked(lessonId) || totalQuestions === 0) {
      navigate(`/lesson/${lessonId}`, { replace: true });
    }
  }, [lesson, lessonId, isLessonUnlocked, navigate, totalQuestions, loading, isRangeQuiz]);

  const handleAnswer = useCallback((isCorrect, selectedIndex) => {
    setSelectedAnswer(selectedIndex);
    setShowResult(true);
    setAnswers((prev) => [...prev, { selected: selectedIndex, correct: isCorrect }]);
    if (isCorrect) setScore((prev) => prev + 1);
  }, []);

  const handleNext = useCallback(() => {
    if (currentQuestion + 1 < totalQuestions) {
      setCurrentQuestion((prev) => prev + 1);
      setShowResult(false);
      setSelectedAnswer(null);
    } else {
      setQuizComplete(true);
    }
  }, [currentQuestion, totalQuestions]);

  const handleRetry = useCallback(() => {
    setCurrentQuestion(0);
    setScore(0);
    setAnswers([]);
    setShowResult(false);
    setSelectedAnswer(null);
    setQuizComplete(false);
    if (isRangeQuiz) {
      // Regenerate questions
      setQuizConfig((prev) => ({ ...prev }));
    }
  }, [isRangeQuiz]);

  const handleBackToConfig = useCallback(() => {
    setQuizConfig(null);
    setCurrentQuestion(0);
    setScore(0);
    setAnswers([]);
    setShowResult(false);
    setSelectedAnswer(null);
    setQuizComplete(false);
  }, []);

  // Save progress for single lesson quizzes only
  useEffect(() => {
    if (!quizComplete || totalQuestions === 0 || isRangeQuiz) return;
    const percentage = Math.round((score / totalQuestions) * 100);
    updateLessonProgress(lessonId, {
      quizCompleted: true,
      quizScore: percentage,
      quizAttempts: 1,
    });
  }, [quizComplete, score, totalQuestions, lessonId, updateLessonProgress, isRangeQuiz]);

  // ——— Render: Config form (no lessonId, no config set) ———
  if (!lessonId && !quizConfig) {
    return (
      <div className="py-6">
        <QuizConfigForm onStart={setQuizConfig} initialFrom={1} initialTo={1} />
      </div>
    );
  }

  // ——— Render: Loading ———
  if (loading && lessonId) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-duolingo-green border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-duolingo-text-muted">Loading quiz data...</p>
        </div>
      </div>
    );
  }

  // ——— Render: Results ———
  if (quizComplete) {
    return (
      <div className="animate-fade-in">
        {isRangeQuiz && (
          <button
            onClick={handleBackToConfig}
            className="text-sm text-duolingo-text-secondary hover:text-duolingo-green transition-colors mb-4 flex items-center gap-1"
          >
            ← New Quiz
          </button>
        )}
        <ResultsScreen
          score={score}
          total={totalQuestions}
          lessonId={lessonId}
          onRetry={handleRetry}
        />
      </div>
    );
  }

  const progressPercent = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="animate-fade-in">
      {/* Top bar */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => {
            if (isRangeQuiz) {
              handleBackToConfig();
            } else {
              navigate(`/lesson/${lessonId}`);
            }
          }}
          className="text-duolingo-text-secondary hover:text-duolingo-green transition-colors"
        >
          ✕
        </button>
        <div className="flex-1 progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <span className="text-sm font-semibold text-duolingo-text-secondary">
          {currentQuestion + 1}/{totalQuestions}
        </span>
      </div>

      {/* Question */}
      <QuestionCard
        key={currentQuestion}
        question={questions[currentQuestion]}
        onAnswer={handleAnswer}
        showResult={showResult}
        selectedAnswer={selectedAnswer}
      />

      {/* Next / Continue Button */}
      {showResult && (
        <div className="mt-6 animate-slide-up">
          <button onClick={handleNext} className="btn-primary w-full text-lg">
            {currentQuestion + 1 < totalQuestions
              ? language === 'en'
                ? 'Continue →'
                : 'जारी राख्नुहोस् →'
              : language === 'en'
                ? 'See Results →'
                : 'नतिजा हेर्नुहोस् →'}
          </button>
        </div>
      )}
    </div>
  );
}
