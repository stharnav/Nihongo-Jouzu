import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLessonById } from '../data/lessons';
import { getLessonWordsFromFirestore } from '../services/wordService';
import { getLessonGrammarFromFirestore } from '../services/grammarService';
import { getGrammarByLesson } from '../data/grammar';
import { generateQuizFromWords } from '../utils/generateQuiz';
import { useProgress } from '../contexts/ProgressContext';
import WordList from '../components/lesson/WordList';
import GrammarView from '../components/lesson/GrammarView';

export default function LessonDetail() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { updateLessonProgress, isLessonUnlocked } = useProgress();
  const [activeTab, setActiveTab] = useState('words');
  const [firestoreWords, setFirestoreWords] = useState(null);
  const [firestoreGrammar, setFirestoreGrammar] = useState(null);
  const [wordsLoading, setWordsLoading] = useState(true);
  const [grammarLoading, setGrammarLoading] = useState(true);

  const lesson = getLessonById(lessonId);
  const localGrammar = getGrammarByLesson(lessonId);

  // Determine the effective word set (Firestore preferred)
  const effectiveWords = firestoreWords || lesson?.words || [];
  // Determine the effective grammar set (Firestore preferred)
  const effectiveGrammar = firestoreGrammar || (lesson?.grammar?.length > 0 ? lesson.grammar : localGrammar);
  // If no static quiz but words exist, generate dynamic question count
  const hasStaticQuiz = lesson?.quiz?.length > 0;
  const dynamicQuizCount = hasStaticQuiz ? lesson.quiz.length : Math.min(effectiveWords.length, 8);

  // Try fetching words from Firestore; fall back to local data
  useEffect(() => {
    if (!lesson) return;
    setWordsLoading(true);
    getLessonWordsFromFirestore(lessonId)
      .then((words) => {
        if (words && words.length > 0) {
          setFirestoreWords(words);
        }
      })
      .catch(() => {
        // fallback to local
      })
      .finally(() => setWordsLoading(false));
  }, [lessonId, lesson]);

  // Try fetching grammar from Firestore; fall back to local data
  useEffect(() => {
    if (!lesson) return;
    setGrammarLoading(true);
    getLessonGrammarFromFirestore(lessonId)
      .then((grammar) => {
        if (grammar && grammar.length > 0) {
          setFirestoreGrammar(grammar);
        }
      })
      .catch(() => {
        // fallback to local
      })
      .finally(() => setGrammarLoading(false));
  }, [lessonId, lesson]);

  useEffect(() => {
    if (!lesson) return;

    // Mark words/grammar as viewed when tabs are switched
    if (activeTab === 'words') {
      updateLessonProgress(lessonId, { wordsViewed: true });
    } else if (activeTab === 'grammar') {
      updateLessonProgress(lessonId, { grammarViewed: true });
    }
  }, [activeTab, lessonId, lesson, updateLessonProgress]);

  // Redirect to dashboard if lesson is locked or doesn't exist
  if (!lesson) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">📖</div>
        <h2 className="text-xl font-bold mb-2">Lesson not found</h2>
        <p className="text-duolingo-text-secondary mb-4">
          This lesson doesn't exist yet.
        </p>
        <button
          onClick={() => navigate('/dashboard')}
          className="btn-primary"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  if (!isLessonUnlocked(lessonId)) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">🔒</div>
        <h2 className="text-xl font-bold mb-2">Lesson Locked</h2>
        <p className="text-duolingo-text-secondary mb-4">
          Complete the previous lesson with a score of 60% or higher to unlock this lesson.
        </p>
        <button
          onClick={() => navigate('/dashboard')}
          className="btn-primary"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const tabs = [
    { id: 'words', label: 'Words', icon: '📖', count: effectiveWords.length },
    { id: 'grammar', label: 'Grammar', icon: '📝', count: effectiveGrammar.length },
    { id: 'quiz', label: 'Quiz', icon: '✍️', count: dynamicQuizCount },
  ];

  return (
    <div className="animate-fade-in">
      {/* Back + Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/dashboard')}
          className="text-sm text-duolingo-text-secondary hover:text-duolingo-green transition-colors mb-2 flex items-center gap-1"
        >
          ← Back to lessons
        </button>
        <h1 className="text-2xl font-bold text-duolingo-text-primary">
          {lesson.title}
        </h1>
        <p className="text-duolingo-text-secondary text-sm">{lesson.titleEn}</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex bg-duolingo-gray rounded-2xl p-1 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-sm font-semibold transition-all ${
              activeTab === tab.id
                ? 'bg-white text-duolingo-green shadow-sm'
                : 'text-duolingo-text-secondary hover:text-duolingo-text-primary'
            }`}
          >
            <span>{tab.icon}</span>
            <span className="hidden sm:inline">{tab.label}</span>
            {tab.count > 0 && (
              <span className="text-xs text-duolingo-text-muted">({tab.count})</span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'words' && (
          wordsLoading ? (
            <div className="text-center py-12 text-duolingo-text-muted">
              <div className="w-6 h-6 border-2 border-duolingo-green border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm">Loading vocabulary...</p>
            </div>
          ) : (
            <WordList words={firestoreWords || lesson.words} />
          )
        )}
        {activeTab === 'grammar' && (
          grammarLoading ? (
            <div className="text-center py-12 text-duolingo-text-muted">
              <div className="w-6 h-6 border-2 border-duolingo-green border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm">Loading grammar...</p>
            </div>
          ) : (
            <GrammarView grammar={effectiveGrammar} />
          )
        )}
        {activeTab === 'quiz' && (
          <div className="card text-center py-8">
            <div className="text-5xl mb-4">✍️</div>
            <h2 className="text-xl font-bold mb-2">Ready to test yourself?</h2>
            <p className="text-duolingo-text-secondary mb-6 text-sm">
              {hasStaticQuiz
                ? `${lesson.quiz.length} hand-crafted + dynamic questions.`
                : effectiveWords.length >= 4
                ? `${dynamicQuizCount} questions generated from ${effectiveWords.length} vocabulary words.`
                : 'Add more vocabulary words to enable the quiz.'}
            </p>
            {(hasStaticQuiz || effectiveWords.length >= 4) ? (
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {effectiveWords.length >= 4 && (
                  <button
                    onClick={() => navigate(`/word-quiz/${lessonId}`)}
                    className="btn-secondary inline-flex items-center gap-2 justify-center"
                  >
                    📝 Vocabulary Practice →
                  </button>
                )}
                <button
                  onClick={() => navigate(`/quiz/${lessonId}`)}
                  className="btn-primary inline-flex items-center gap-2 justify-center"
                >
                  ✍️ Full Quiz →
                </button>
              </div>
            ) : (
              <div className="text-duolingo-text-muted text-sm italic">
                Not enough vocabulary to generate a quiz.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
