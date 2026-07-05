import { useSettings } from '../../contexts/SettingsContext';
import FuriText from '../common/FuriText';

export default function GrammarView({ grammar }) {
  const { settings } = useSettings();
  const { language } = settings;

  if (!grammar || grammar.length === 0) {
    return (
      <div className="text-center py-12 text-duolingo-text-muted">
        <div className="text-4xl mb-3">📝</div>
        <p className="font-medium">Grammar points coming soon for this lesson.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      {grammar.map((point, index) => (
        <div key={index} className="card">
          {/* Pattern */}
          <div className="bg-duolingo-green/5 rounded-xl p-4 mb-4 border border-duolingo-green/10">
            <div className="text-xs font-bold text-duolingo-text-secondary uppercase tracking-wider mb-1">
              Pattern
            </div>
            <div className="text-lg font-bold text-duolingo-text-primary font-japanese">
              {point.pattern}
            </div>
          </div>

          {/* Explanation */}
          <p className="text-sm text-duolingo-text-primary mb-4 leading-relaxed">
            {language === 'en' ? point.explanation : (point.explanationNp || point.explanation)}
          </p>

          {/* Examples */}
          <div>
            <div className="text-xs font-bold text-duolingo-text-secondary uppercase tracking-wider mb-2">
              {language === 'en' ? 'Examples' : 'उदाहरणहरू'}
            </div>
            <div className="space-y-2">
              {point.examples.map((example, eIndex) => (
                <div
                  key={eIndex}
                  className="bg-duolingo-gray rounded-xl p-3 text-sm"
                >
                  <div className="font-japanese font-medium text-duolingo-text-primary mb-1">
                    <FuriText japanese={example.japanese} reading={example.reading} />
                  </div>
                  <div className="text-duolingo-text-secondary">
                    {language === 'en' ? example.meaning : (example.meaningNp || example.meaning)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
