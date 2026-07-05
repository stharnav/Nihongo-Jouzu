import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../contexts/SettingsContext';
import { useProgress } from '../contexts/ProgressContext';
import { useAuth } from '../contexts/AuthContext';
import { logout } from '../services/firebase';

const SCRIPT_MODES = [
  { value: 'kanji', label: '漢字 Kanji', desc: 'Full kanji with native Japanese script', icon: '漢' },
  { value: 'hiragana', label: 'Hiragana', desc: 'All Japanese in hiragana only', icon: 'ひ' },
  { value: 'furigana', label: 'Furigana', desc: 'Kanji with hiragana reading above', icon: '漢⤴ひ' },
];

const LANGUAGES = [
  { value: 'en', label: 'English', icon: '🇬🇧' },
  { value: 'np', label: 'नेपाली', icon: '🇳🇵' },
];

export default function Settings() {
  const navigate = useNavigate();
  const { settings, updateSettings } = useSettings();
  const { unlockAllLessons } = useProgress();
  const { user } = useAuth();
  const [showUnlockConfirm, setShowUnlockConfirm] = useState(false);

  const goBack = () => {
    // If there's no previous page, go to landing
    if (window.history.length <= 1) {
      navigate('/');
    } else {
      navigate(-1);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto w-full px-4 space-y-8">
      {/* Header */}
      <div className="animate-slide-up">
        <div className="flex items-center gap-4">
          <button
            onClick={goBack}
            aria-label="Go back"
            className="w-10 h-10 rounded-xl bg-white border border-duolingo-card-border flex items-center justify-center text-duolingo-text-secondary hover:text-duolingo-green hover:border-duolingo-green/30 transition-all shadow-sm"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-duolingo-text-primary">Settings</h1>
            <p className="text-sm text-duolingo-text-secondary">Customize your learning experience</p>
          </div>
        </div>
      </div>

      {/* Japanese Script Section */}
      <div className="animate-slide-up card">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center">
            <span className="text-lg">🔤</span>
          </div>
          <div>
            <h2 className="font-bold text-duolingo-text-primary">Japanese Script</h2>
            <p className="text-xs text-duolingo-text-secondary">Choose how Japanese text is displayed</p>
          </div>
        </div>
        <div className="h-px bg-duolingo-card-border -mx-6 mb-4" />

        <div className="space-y-2" role="radiogroup" aria-label="Japanese script mode">
          {SCRIPT_MODES.map((mode) => (
            <button
              key={mode.value}
              role="radio"
              aria-checked={settings.scriptMode === mode.value}
              onClick={() => updateSettings({ scriptMode: mode.value })}
              className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 ${
                settings.scriptMode === mode.value
                  ? 'border-duolingo-green bg-green-50 shadow-sm scale-[1.01]'
                  : 'border-duolingo-card-border hover:border-duolingo-green/30 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm transition-all duration-200 ${
                    settings.scriptMode === mode.value
                      ? 'bg-duolingo-green text-white shadow-md shadow-green-200'
                      : 'bg-gray-100 text-duolingo-text-secondary'
                  }`}
                >
                  {mode.icon}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-duolingo-text-primary">{mode.label}</div>
                  <div className="text-xs text-duolingo-text-secondary">{mode.desc}</div>
                </div>
                {settings.scriptMode === mode.value && (
                  <span className="text-duolingo-green text-lg animate-bounce-in">✓</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Translation Language Section */}
      <div className="animate-slide-up card" style={{ animationDelay: '0.1s' }}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
            <span className="text-lg">🌐</span>
          </div>
          <div>
            <h2 className="font-bold text-duolingo-text-primary">Translation Language</h2>
            <p className="text-xs text-duolingo-text-secondary">Language for meanings and explanations</p>
          </div>
        </div>
        <div className="h-px bg-duolingo-card-border -mx-6 mb-4" />

        <div className="grid grid-cols-2 gap-3">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.value}
              onClick={() => updateSettings({ language: lang.value })}
              className={`relative p-5 rounded-2xl border-2 text-center transition-all duration-200 ${
                settings.language === lang.value
                  ? 'border-duolingo-green bg-green-50 ring-2 ring-green-100 scale-[1.02]'
                  : 'border-duolingo-card-border hover:border-duolingo-green/30 hover:scale-[1.02] hover:bg-gray-50'
              }`}
            >
              <div className="text-3xl mb-2">{lang.icon}</div>
              <div
                className={`font-bold text-sm ${
                  settings.language === lang.value
                    ? 'text-duolingo-green'
                    : 'text-duolingo-text-primary'
                }`}
              >
                {lang.label}
              </div>
              {settings.language === lang.value && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-duolingo-green rounded-full flex items-center justify-center animate-bounce-in">
                  <span className="text-white text-xs leading-none">✓</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Unlock All Lessons */}
      <div className="animate-slide-up card" style={{ animationDelay: '0.15s' }}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center">
            <span className="text-lg">🔓</span>
          </div>
          <div>
            <h2 className="font-bold text-duolingo-text-primary">Unlock All Lessons</h2>
            <p className="text-xs text-duolingo-text-secondary">Skip ahead and access every lesson</p>
          </div>
        </div>
        <div className="h-px bg-duolingo-card-border -mx-6 mb-4" />

        {showUnlockConfirm ? (
          <div className="space-y-3">
            <p className="text-sm text-duolingo-text-secondary">
              This will mark all 25 lessons as completed with 100% score. Are you sure?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  unlockAllLessons();
                  setShowUnlockConfirm(false);
                }}
                className="flex-1 bg-duolingo-orange text-white font-bold py-3 px-4 rounded-2xl shadow-md hover:bg-duolingo-orange-hover transition-all duration-150"
              >
                Yes, Unlock All
              </button>
              <button
                onClick={() => setShowUnlockConfirm(false)}
                className="flex-1 bg-white text-duolingo-text-primary font-bold py-3 px-4 rounded-2xl border-2 border-duolingo-card-border hover:border-duolingo-text-secondary transition-all duration-150"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowUnlockConfirm(true)}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl border-2 border-duolingo-card-border text-duolingo-text-secondary hover:text-duolingo-orange hover:border-duolingo-orange/30 hover:bg-orange-50 transition-all duration-200 font-semibold text-sm"
          >
            🔓 Unlock All Lessons
          </button>
        )}
      </div>

      {/* Preview Section */}
      <div className="animate-slide-up card bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 border-blue-100" style={{ animationDelay: '0.2s' }}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center">
              <span className="text-lg">👀</span>
            </div>
            <div>
              <h2 className="font-bold text-duolingo-text-primary">Preview</h2>
              <p className="text-xs text-duolingo-text-secondary">プレビュー</p>
            </div>
          </div>
          <span className="text-2xl">🦉</span>
        </div>
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-white/50 overflow-hidden">
          <div className="divide-y divide-gray-100">
            <div className="flex items-center gap-4 px-4 py-3 bg-gray-50/50">
              <span className="text-xs font-semibold text-duolingo-text-secondary uppercase tracking-wider w-20">Word</span>
              {settings.scriptMode === 'furigana' ? (
                <ruby className="text-lg font-japanese font-bold text-duolingo-text-primary">
                  私<rt className="text-sm">わたし</rt>
                </ruby>
              ) : (
                <span className="text-lg font-japanese font-bold text-duolingo-text-primary">
                  {settings.scriptMode === 'kanji' ? '私' : 'わたし'}
                </span>
              )}
            </div>
            <div className="flex items-center gap-4 px-4 py-3">
              <span className="text-xs font-semibold text-duolingo-text-secondary uppercase tracking-wider w-20">Reading</span>
              <span className="text-duolingo-text-secondary">わたし</span>
            </div>
            <div className="flex items-center gap-4 px-4 py-3 bg-gray-50/50">
              <span className="text-xs font-semibold text-duolingo-text-secondary uppercase tracking-wider w-20">Meaning</span>
              <span className="text-duolingo-text-primary font-medium">
                {settings.language === 'en' ? 'I; me' : 'म'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Account / Logout */}
      <div className="animate-slide-up card" style={{ animationDelay: '0.3s' }}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-100 to-red-50 flex items-center justify-center">
            <span className="text-lg">👤</span>
          </div>
          <div>
            <h2 className="font-bold text-duolingo-text-primary">Account</h2>
            <p className="text-xs text-duolingo-text-secondary">
              {user?.email || (user?.isAnonymous ? 'Guest' : 'Signed in')}
            </p>
          </div>
        </div>
        <div className="h-px bg-duolingo-card-border -mx-6 mb-4" />

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl border-2 border-duolingo-card-border text-duolingo-text-secondary hover:text-duolingo-red hover:border-duolingo-red/30 hover:bg-red-50 transition-all duration-200 font-semibold text-sm"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Sign Out
        </button>
      </div>

      {/* Save indicator */}
      <div className="animate-fade-in text-center" style={{ animationDelay: '0.5s' }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-100">
          <span className="w-2 h-2 rounded-full bg-duolingo-green animate-pulse" />
          <span className="text-xs text-duolingo-green-dark font-medium">Auto-saved to browser</span>
        </div>
      </div>
    </div>
  );
}
