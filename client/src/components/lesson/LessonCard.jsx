import { useSettings } from '../../contexts/SettingsContext';

export default function LessonCard({ lesson, progress, isUnlocked, onClick }) {
  const { settings } = useSettings();
  const { language } = settings;

  const hasWords = lesson.words.length > 0;
  const hasGrammar = lesson.grammar.length > 0;
  const hasQuiz = lesson.quiz.length > 0;

  const wordsDone = progress?.wordsViewed;
  const grammarDone = progress?.grammarViewed;
  const quizDone = progress?.quizCompleted;
  const quizScore = progress?.quizScore || 0;

  return (
    <button
      onClick={onClick}
      disabled={!isUnlocked}
      className={`card w-full text-left transition-all duration-150 hover:shadow-md
        ${isUnlocked ? 'cursor-pointer hover:border-duolingo-green' : 'cursor-not-allowed opacity-60'}`}
    >
      <div className="flex items-center gap-4">
        {/* Status Icon */}
        <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
          ${quizDone && quizScore >= 60 ? 'bg-green-100' : isUnlocked ? 'bg-blue-50' : 'bg-gray-100'}">
          {quizDone && quizScore >= 60 ? (
            <span className="text-xl">✅</span>
          ) : isUnlocked ? (
            <span className="text-xl">📘</span>
          ) : (
            <span className="text-xl">🔒</span>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-duolingo-text-primary truncate">
              {lesson.title}
            </h3>
            {isUnlocked && (
              <span className="text-xs text-duolingo-text-muted flex-shrink-0">
                {language === 'en' ? lesson.titleEn : (lesson.titleNp || lesson.titleEn)}
              </span>
            )}
          </div>

          {/* Mini progress bars */}
          <div className="flex gap-2 mt-2">
            <ProgressDot label="Words" done={wordsDone} enabled={hasWords} />
            <ProgressDot label="Grammar" done={grammarDone} enabled={hasGrammar} />
            <ProgressDot label="Quiz" done={quizDone} enabled={hasQuiz} score={quizScore} />
          </div>
        </div>

        {/* Arrow or Score */}
        <div className="flex-shrink-0">
          {quizDone ? (
            <div className="text-right">
              <div className={`text-lg font-bold ${quizScore >= 60 ? 'text-duolingo-green' : 'text-duolingo-red'}`}>
                {quizScore}%
              </div>
              <div className="text-xs text-duolingo-text-muted">Best</div>
            </div>
          ) : (
            <span className="text-duolingo-text-muted text-xl">→</span>
          )}
        </div>
      </div>
    </button>
  );
}

function ProgressDot({ label, done, enabled, score }) {
  if (!enabled) return null;
  return (
    <div className={`text-xs px-2 py-0.5 rounded-full font-medium ${
      done && score !== undefined && score >= 60
        ? 'bg-green-100 text-duolingo-green-dark'
        : done
        ? 'bg-blue-50 text-duolingo-blue'
        : 'bg-gray-100 text-duolingo-text-muted'
    }`}>
      {label}
    </div>
  );
}
