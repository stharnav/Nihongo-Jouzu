import { useState, useCallback, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLessonById } from '../data/lessons';
import { getLessonWordsFromFirestore } from '../services/wordService';
import { getLessonGrammarFromFirestore } from '../services/grammarService';
import { getGrammarByLesson } from '../data/grammar';
import { generateQuizFromLesson } from '../utils/generateQuiz';
import { useProgress } from '../contexts/ProgressContext';
import { useAuth } from '../contexts/AuthContext';
import { useSettings } from '../contexts/SettingsContext';
import QuestionCard from '../components/quiz/QuestionCard';
import ResultsScreen from '../components/quiz/ResultsScreen';

export default function QuizPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { updateLessonProgress, isLessonUnlocked } = useProgress();
  const { user } = useAuth();
  const { settings } = useSettings();
  const { language } = settings;

  const lesson = getLessonById(lessonId);
  const localGrammar = getGrammarByLesson(lessonId);

  // Firestore data state
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

  // Fetch words and grammar from Firestore, fall back to local data
  useEffect(() => {
    if (!lesson) return;
    setLoading(true);

    Promise.all([
      getLessonWordsFromFirestore(lessonId),
      getLessonGrammarFromFirestore(lessonId),
    ])
      .then(([words, grammar]) => {
        if (words && words.length > 0) {
          setFirestoreWords(words);
        }
        if (grammar && grammar.length > 0) {
          setFirestoreGrammar(grammar);
        }
      })
      .catch(() => {
        // fallback to local data
      })
      .finally(() => setLoading(false));
  }, [lessonId, lesson]);

  // Determine effective data sets
  const effectiveWords = firestoreWords || lesson?.words || [];
  const effectiveGrammar =
    firestoreGrammar ||
    (lesson?.grammar?.length > 0 ? lesson.grammar : localGrammar);

  // Generate quiz from both vocabulary and grammar, respecting script mode
  const questions = useMemo(() => {
    // Use static quiz if the lesson has one defined
    if (lesson?.quiz?.length > 0) return lesson.quiz;
    // Otherwise generate dynamically from words + grammar
    if (effectiveWords.length >= 4 || effectiveGrammar.length >= 2) {
      return generateQuizFromLesson(effectiveWords, effectiveGrammar, lessonId, {
        scriptMode: settings.scriptMode,
      });
    }
    return [];
  }, [lesson, effectiveWords, effectiveGrammar, lessonId, settings.scriptMode]);

  const totalQuestions = questions.length;

  // Guard: loading, locked, or no questions
  useEffect(() => {
    if (loading) return;
    if (!lesson || !isLessonUnlocked(lessonId) || totalQuestions === 0) {
      navigate(`/lesson/${lessonId}`, { replace: true });
    }
  }, [lesson, lessonId, isLessonUnlocked, navigate, totalQuestions, loading]);

  const handleAnswer = useCallback((isCorrect, selectedIndex) => {
    setSelectedAnswer(selectedIndex);
    setShowResult(true);
    setAnswers((prev) => [...prev, { selected: selectedIndex, correct: isCorrect }]);
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
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
  }, []);

  // Save progress when quiz completes
  useEffect(() => {
    if (!quizComplete || totalQuestions === 0) return;

    const percentage = Math.round((score / totalQuestions) * 100);
    updateLessonProgress(lessonId, {
      quizCompleted: true,
      quizScore: percentage,
      quizAttempts: 1,
    });
  }, [quizComplete, score, totalQuestions, lessonId, updateLessonProgress]);

  if (!lesson) return null;

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-duolingo-green border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-duolingo-text-muted">Loading quiz data...</p>
        </div>
      </div>
    );
  }

  // Results screen
  if (quizComplete) {
    return (
      <div className="animate-fade-in">
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
          onClick={() => navigate(`/lesson/${lessonId}`)}
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
