import { useState, useCallback, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLessonById } from '../data/lessons';
import { getLessonWordsFromFirestore } from '../services/wordService';
import { generateWordQuiz } from '../utils/generateQuiz';
import { useSettings } from '../contexts/SettingsContext';
import QuestionCard from '../components/quiz/QuestionCard';
import ResultsScreen from '../components/quiz/ResultsScreen';

export default function WordQuizPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { settings } = useSettings();
  const { language, scriptMode } = settings;

  const lesson = getLessonById(lessonId);

  // Firestore words state
  const [firestoreWords, setFirestoreWords] = useState(null);
  const [loading, setLoading] = useState(true);

  // Quiz state
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizComplete, setQuizComplete] = useState(false);

  // Fetch words from Firestore, fall back to local data
  useEffect(() => {
    if (!lesson) return;
    setLoading(true);

    getLessonWordsFromFirestore(lessonId)
      .then((words) => {
        if (words && words.length > 0) {
          setFirestoreWords(words);
        }
      })
      .catch(() => {
        // fall back to local data
      })
      .finally(() => setLoading(false));
  }, [lessonId, lesson]);

  // Effective word set
  const effectiveWords = useMemo(
    () => firestoreWords || lesson?.words || [],
    [firestoreWords, lesson],
  );

  // Generate word-only quiz questions
  const questions = useMemo(() => {
    const generated = generateWordQuiz(effectiveWords, lessonId, 10, scriptMode);

    // Shuffle
    if (generated.length > 1) {
      for (let i = generated.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [generated[i], generated[j]] = [generated[j], generated[i]];
      }
    }

    return generated;
  }, [effectiveWords, lessonId, scriptMode]);

  const totalQuestions = questions.length;

  // Guard: loading or not enough words
  useEffect(() => {
    if (loading) return;
    if (!lesson || totalQuestions === 0) {
      navigate(`/lesson/${lessonId}`, { replace: true });
    }
  }, [lesson, lessonId, navigate, totalQuestions, loading]);

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

  if (!lesson) return null;

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-duolingo-green border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-duolingo-text-muted">
            {language === 'en' ? 'Loading vocabulary quiz...' : 'शब्दावली प्रश्नोत्तरी लोड हुँदै...'}
          </p>
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
