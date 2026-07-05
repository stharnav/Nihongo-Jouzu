import { useSettings } from '../../contexts/SettingsContext';

/**
 * Renders a Japanese word according to the user's script preference.
 *
 * - kanji:    shows the kanji text (e.g., "私")
 * - hiragana: shows the kana reading (e.g., "わたし")
 * - furigana: shows kanji with <ruby> annotation (e.g., "私" with "わたし" above)
 */
export default function FuriText({ japanese, reading, className = '' }) {
  const { settings } = useSettings();
  const { scriptMode } = settings;

  const displayReading = reading || japanese;

  // Hiragana-only mode
  if (scriptMode === 'hiragana') {
    return <span className={className}>{displayReading}</span>;
  }

  // Furigana mode — only wrap in <ruby> if the text actually differs
  if (scriptMode === 'furigana' && displayReading !== japanese) {
    return (
      <ruby className={className}>
        {japanese}<rt>{displayReading}</rt>
      </ruby>
    );
  }

  // Default / kanji mode
  return <span className={className}>{japanese}</span>;
}
