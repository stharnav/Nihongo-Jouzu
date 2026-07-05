import { useNavigate } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import { getAllLessons } from '../data/lessons';
import LessonCard from '../components/lesson/LessonCard';

export default function Dashboard() {
  const navigate = useNavigate();
  const { isLessonUnlocked, progress } = useProgress();
  const lessons = getAllLessons();

  // Calculate overall progress
  const completedLessons = lessons.filter(
    l => l.id > 1 && progress[l.id]?.quizCompleted && progress[l.id]?.quizScore >= 60
  ).length;

  const totalScore = lessons.reduce((sum, l) => sum + (progress[l.id]?.quizScore || 0), 0);

  return (
    <div className="animate-fade-in">
      {/* Level Header */}
      <div className="card mb-6 text-center">
        <div className="text-4xl mb-2">🇯🇵</div>
        <h1 className="text-2xl font-bold text-duolingo-text-primary">
          N5 — Minna no Nihongo
        </h1>
        <p className="text-duolingo-text-secondary text-sm mt-1">
          {25} lessons · {completedLessons}/{25} completed
        </p>
        {/* Overall progress */}
        <div className="progress-bar mt-4">
          <div
            className="progress-bar-fill"
            style={{ width: `${(completedLessons / 25) * 100}%` }}
          />
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="card text-center py-4">
          <div className="text-2xl font-bold text-duolingo-green">{totalScore}</div>
          <div className="text-xs text-duolingo-text-secondary">Total Points</div>
        </div>
        <div className="card text-center py-4">
          <div className="text-2xl font-bold text-duolingo-blue">
            {lessons.filter(l => isLessonUnlocked(l.id)).length}
          </div>
          <div className="text-xs text-duolingo-text-secondary">Lessons Available</div>
        </div>
      </div>

      {/* Lesson Grid */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-duolingo-text-secondary uppercase tracking-wider px-1">
          Lessons
        </h2>
        <div className="grid grid-cols-1 gap-3">
          {lessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              progress={progress[lesson.id]}
              isUnlocked={isLessonUnlocked(lesson.id)}
              onClick={() => {
                if (isLessonUnlocked(lesson.id)) {
                  navigate(`/lesson/${lesson.id}`);
                }
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
