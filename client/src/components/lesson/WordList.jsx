import { useSettings } from '../../contexts/SettingsContext';
import FuriText from '../common/FuriText';

export default function WordList({ words }) {
  const { settings } = useSettings();
  const { language } = settings;

  if (!words || words.length === 0) {
    return (
      <div className="text-center py-12 text-duolingo-text-muted">
        <div className="text-4xl mb-3">📚</div>
        <p className="font-medium">Vocabulary list coming soon for this lesson.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2 animate-fade-in">
      {/* Header */}
      <div className="card py-3 px-4 flex items-center gap-3 text-sm font-bold text-duolingo-text-secondary">
        <div className="flex-1">Japanese</div>
        <div className="flex-1">Reading</div>
        <div className="flex-1">{language === 'en' ? 'Meaning' : 'अर्थ'}</div>
      </div>

      {/* Word List */}
      <div className="space-y-1">
        {words.map((word, index) => (
          <div
            key={index}
            className="card py-3 px-4 flex items-center gap-3 hover:shadow-sm transition-shadow"
          >
            <div className="flex-1 font-japanese text-lg text-duolingo-text-primary">
              <FuriText japanese={word.japanese} reading={word.reading} />
            </div>
            <div className="flex-1 text-duolingo-text-secondary text-sm">
              {word.reading}
            </div>
            <div className="flex-1 text-duolingo-text-primary text-sm">
              {language === 'en' ? word.meaning : (word.meaningNp || word.meaning)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
