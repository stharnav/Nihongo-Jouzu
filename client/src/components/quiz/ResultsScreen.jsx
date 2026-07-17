import { useNavigate } from 'react-router-dom';
import { useSettings } from '../../contexts/SettingsContext';

export default function ResultsScreen({ score, total, lessonId, onRetry }) {
  const navigate = useNavigate();
  const { settings } = useSettings();
  const { language } = settings;

  const percentage = Math.round((score / total) * 100);
  const passed = percentage >= 60;

  const getMessage = () => {
    if (language === 'np') {
      if (percentage === 100) return { emoji: '🏆', title: 'पूर्ण अंक!', subtitle: 'तपाईंले सबै प्रश्न सही जवाफ दिनुभयो!' };
      if (passed) return { emoji: '🎉', title: 'उत्कृष्ट!', subtitle: 'तपाईं यो पाठ उत्तीर्ण गर्नुभयो।' };
      if (percentage >= 40) return { emoji: '💪', title: 'लगभग!', subtitle: 'थोरै अभ्यासले पुग्नेछ।' };
      return { emoji: '📚', title: 'पढ्दै जानुहोस्!', subtitle: 'शब्द र व्याकरणको समीक्षा गर्नुहोस्, फेरि प्रयास गर्नुहोस्।' };
    }
    if (percentage === 100) return { emoji: '🏆', title: 'Perfect Score!', subtitle: 'You nailed every question!' };
    if (passed) return { emoji: '🎉', title: 'Great Job!', subtitle: 'You passed this lesson.' };
    if (percentage >= 40) return { emoji: '💪', title: 'Almost There!', subtitle: 'A bit more practice and you\'ll get it.' };
    return { emoji: '📚', title: 'Keep Studying!', subtitle: 'Review the words and grammar, then try again.' };
  };

  const msg = getMessage();

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center animate-bounce-in">
      {/* Result Card */}
      <div className="card w-full max-w-sm text-center py-8">
        <div className="text-6xl mb-4">{msg.emoji}</div>
        <h2 className="text-2xl font-bold text-duolingo-text-primary mb-1">{msg.title}</h2>
        <p className="text-duolingo-text-secondary mb-6 text-sm">{msg.subtitle}</p>

        {/* Score Circle */}
        <div className="relative w-32 h-32 mx-auto mb-6">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50" cy="50" r="45"
              fill="none"
              stroke="#E5E5E5"
              strokeWidth="8"
            />
            {/* Score circle */}
            <circle
              cx="50" cy="50" r="45"
              fill="none"
              stroke={passed ? '#FF4081' : '#FF4B4B'}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${(percentage / 100) * 283} 283`}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-duolingo-text-primary">{percentage}%</span>
            <span className="text-sm text-duolingo-text-secondary">{score}/{total}</span>
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
          <div className="bg-duolingo-green/10 rounded-xl p-3">
            <div className="font-bold text-duolingo-green-dark">
              {language === 'en' ? `${score} correct` : `${score} सही`}
            </div>
            <div className="text-xs text-duolingo-text-secondary">
              {language === 'en' ? 'Answered right' : 'सही जवाफ'}
            </div>
          </div>
          <div className="bg-red-50 rounded-xl p-3">
            <div className="font-bold text-duolingo-red">
              {language === 'en' ? `${total - score} wrong` : `${total - score} गलत`}
            </div>
            <div className="text-xs text-duolingo-text-secondary">
              {language === 'en' ? 'Needs review' : 'पुनरावलोकन आवश्यक'}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={onRetry}
            className="btn-primary w-full"
          >
            🔄 {language === 'en' ? 'Retry Quiz' : 'पुनः प्रयास गर्नुहोस्'}
          </button>
          <button
            onClick={() => navigate(`/lesson/${lessonId}`)}
            className="btn-secondary w-full"
          >
            📖 {language === 'en' ? 'Review Lesson' : 'पाठको समीक्षा गर्नुहोस्'}
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="text-sm text-duolingo-text-secondary hover:text-duolingo-green transition-colors"
          >
            ← {language === 'en' ? 'Back to Dashboard' : 'ड्यासबोर्डमा फर्कनुहोस्'}
          </button>
        </div>
      </div>
    </div>
  );
}
