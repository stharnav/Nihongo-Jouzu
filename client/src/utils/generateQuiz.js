/**
 * Dynamically generate multiple-choice quiz questions from lesson vocabulary and grammar.
 * Used when a lesson has no pre-defined quiz data.
 */

/**
 * Format a word's Japanese text according to the user's script mode.
 *
 * @param {Object} word - Word object { japanese, reading }
 * @param {string} scriptMode - 'kanji' | 'hiragana' | 'furigana'
 * @returns {string} Formatted text
 */
function formatJapanese(word, scriptMode = 'kanji') {
  if (scriptMode === 'hiragana') return word.reading || word.japanese;
  if (scriptMode === 'furigana' && word.reading && word.reading !== word.japanese) {
    return `${word.japanese}(${word.reading})`;
  }
  return word.japanese;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickDistractors(allWords, correctValue, count = 3, field) {
  const candidates = [];
  const seen = new Set([correctValue]);
  for (const w of allWords) {
    const val = (typeof field === 'function' ? field(w) : w[field]);
    if (!seen.has(val)) {
      seen.add(val);
      candidates.push(val);
    }
  }
  return shuffle(candidates).slice(0, count);
}

/**
 * Generate quiz questions from an array of vocabulary words.
 *
 * @param {Array} words - Array of word objects { japanese, reading, meaning, meaningNp }
 * @param {number|string} lessonId - Lesson identifier for question IDs
 * @param {number} maxQuestions - Maximum number of questions to generate (default: 8)
 * @param {string} scriptMode - 'kanji' | 'hiragana' | 'furigana' (default: 'kanji')
 * @returns {Array} Array of question objects compatible with QuestionCard
 */
export function generateQuizFromWords(words, lessonId, maxQuestions = 8, scriptMode = 'kanji') {
  if (!words || words.length < 4) return [];

  const questions = [];
  const shuffled = shuffle(words);
  const count = Math.min(shuffled.length, maxQuestions);
  let id = 0;

  // Kanji mode → reading questions (tests ability to read kanji)
  // Hiragana / Furigana mode → skip reading questions (text already shows reading)
  const TYPES = scriptMode === 'kanji'
    ? ['reading']
    : ['jp-to-meaning', 'meaning-to-jp'];

  for (let i = 0; i < count; i++) {
    const word = shuffled[i];
    const type = TYPES[i % TYPES.length];
    const displayJp = formatJapanese(word, scriptMode);

    if (type === 'reading' && word.japanese === word.reading) {
      // Skip reading type for kana-only words, do jp-to-meaning instead
      const correct = word.meaning;
      const distractors = pickDistractors(
        words,
        correct,
        3,
        (w) => w.meaning
      );
      if (distractors.length < 3) continue;
      const options = shuffle([correct, ...distractors]);
      questions.push({
        id: `gen-${lessonId}-${id++}`,
        type: 'multiple-choice',
        question: `What is the meaning of 「${displayJp}」?`,
        options,
        correctAnswer: options.indexOf(correct),
      });
      continue;
    }

    if (type === 'jp-to-meaning') {
      const correct = word.meaning;
      const distractors = pickDistractors(
        words,
        correct,
        3,
        (w) => w.meaning
      );
      if (distractors.length < 3) continue;
      const options = shuffle([correct, ...distractors]);
      questions.push({
        id: `gen-${lessonId}-${id++}`,
        type: 'multiple-choice',
        question: `What is the meaning of 「${displayJp}」?`,
        options,
        correctAnswer: options.indexOf(correct),
      });
    } else if (type === 'meaning-to-jp') {
      const correct = formatJapanese(word, scriptMode);
      const distractors = shuffle(
        words
          .filter((w) => w.japanese !== word.japanese)
          .map((w) => formatJapanese(w, scriptMode))
      ).slice(0, 3);
      // Deduplicate
      const uniqueDistractors = [];
      const seen = new Set([correct]);
      for (const d of distractors) {
        if (!seen.has(d)) {
          seen.add(d);
          uniqueDistractors.push(d);
        }
      }
      if (uniqueDistractors.length < 3) continue;
      const options = shuffle([correct, ...uniqueDistractors]);
      questions.push({
        id: `gen-${lessonId}-${id++}`,
        type: 'multiple-choice',
        question: `How do you say "${word.meaning}" in Japanese?`,
        options,
        correctAnswer: options.indexOf(correct),
      });
    } else if (type === 'reading') {
      const correct = word.reading;
      const distractors = pickDistractors(
        words,
        correct,
        3,
        (w) => w.reading
      );
      if (distractors.length < 3) continue;
      const options = shuffle([correct, ...distractors]);
      questions.push({
        id: `gen-${lessonId}-${id++}`,
        type: 'multiple-choice',
        question: `What is the reading of 「${displayJp}」?`,
        options,
        correctAnswer: options.indexOf(correct),
      });
    }
  }

  return questions;
}

/**
 * Generate quiz questions from an array of grammar points.
 *
 * @param {Array} grammar - Array of grammar point objects { pattern, explanation, examples }
 * @param {number|string} lessonId - Lesson identifier for question IDs
 * @param {number} maxQuestions - Maximum number of questions to generate (default: 4)
 * @param {string} scriptMode - 'kanji' | 'hiragana' | 'furigana' (default: 'kanji')
 * @returns {Array} Array of question objects compatible with QuestionCard
 */
export function generateQuizFromGrammar(grammar, lessonId, maxQuestions = 4, scriptMode = 'kanji') {
  if (!grammar || grammar.length < 2) return [];

  const questions = [];
  const shuffled = shuffle(grammar);
  const count = Math.min(shuffled.length, maxQuestions);
  let id = 0;

  const TYPES = ['which-pattern', 'example-completion'];

  for (let i = 0; i < count; i++) {
    const point = shuffled[i];
    const type = TYPES[i % TYPES.length];

    if (type === 'which-pattern') {
      if (!point.examples || point.examples.length === 0) continue;
      const example = point.examples[0];
      const correct = point.pattern;
      const distractors = shuffle(
        grammar.filter((g) => g.pattern !== point.pattern)
      )
        .slice(0, 3)
        .map((g) => g.pattern);

      if (distractors.length < 3) continue;
      const options = shuffle([correct, ...distractors]);
      questions.push({
        id: `gram-${lessonId}-${id++}`,
        type: 'multiple-choice',
        question: `Which grammar pattern is used in 「${formatJapanese(example, scriptMode)}」?`,
        options,
        correctAnswer: options.indexOf(correct),
      });
    } else if (type === 'example-completion') {
      if (!point.examples || point.examples.length === 0) continue;
      const example = point.examples[0];
      const parts = point.pattern.split(/[ 　]+/);
      if (parts.length < 2) continue;
      const blanked = shuffle(parts).find(
        (p) => p.length >= 2 && !p.includes('〜') && !p.includes('～')
      );
      if (!blanked || !example.japanese.includes(blanked.replace(/[N数〜～]/g, '').trim())) continue;

      const correct = blanked;
      const distractors = shuffle(
        grammar
          .filter((g) => g.pattern !== point.pattern)
          .flatMap((g) => g.pattern.split(/[ 　]+/))
          .filter((p) => p.length >= 2 && p !== correct)
      ).slice(0, 3);

      if (distractors.length < 3) continue;
      const options = shuffle([correct, ...distractors]);
      questions.push({
        id: `gram-${lessonId}-${id++}`,
        type: 'multiple-choice',
        question: `Which particle/word fits the pattern 「${point.pattern}」?`,
        options,
        correctAnswer: options.indexOf(correct),
      });
    }
  }

  return questions;
}

/**
 * Generate word-only quiz questions with bilingual (English/Nepali) support.
 * Tests Japanese → meaning and meaning → Japanese.
 *
 * Each question includes both `question`/`questionNp` and `options`/`optionsNp`
 * so QuestionCard renders the correct language based on the user's setting.
 *
 * @param {Array} words - Array of word objects { japanese, reading, meaning, meaningNp }
 * @param {number|string} lessonId - Lesson identifier for question IDs
 * @param {number} maxQuestions - Maximum number of questions to generate (default: 10)
 * @param {string} scriptMode - 'kanji' | 'hiragana' | 'furigana' (default: 'kanji')
 * @returns {Array} Array of question objects with bilingual fields
 */
export function generateWordQuiz(words, lessonId, maxQuestions = 10, scriptMode = 'kanji') {
  if (!words || words.length < 4) return [];

  const questions = [];
  const shuffled = shuffle(words);
  const count = Math.min(shuffled.length, maxQuestions);
  let id = 0;

  const TYPES = ['jp-to-meaning', 'meaning-to-jp'];

  for (let i = 0; i < count; i++) {
    const word = shuffled[i];
    const type = TYPES[i % TYPES.length];
    const displayJp = formatJapanese(word, scriptMode);

    if (type === 'jp-to-meaning') {
      // Japanese → meaning (English / Nepali)
      const correctEn = word.meaning;
      const distractorsEn = pickDistractors(words, correctEn, 3, (w) => w.meaning);
      if (distractorsEn.length < 3) continue;

      const optionsEn = shuffle([correctEn, ...distractorsEn]);

      // Build matching Nepali options array (preserving index order)
      const optionsNp = optionsEn.map((opt) => {
        const match = words.find((w) => w.meaning === opt);
        return match ? match.meaningNp || match.meaning : opt;
      });

      questions.push({
        id: `wq-${lessonId}-${id++}`,
        type: 'multiple-choice',
        question: `What is the meaning of 「${displayJp}」?`,
        questionNp: `「${displayJp}」 को अर्थ के हो?`,
        options: optionsEn,
        optionsNp,
        correctAnswer: optionsEn.indexOf(correctEn),
      });
    } else if (type === 'meaning-to-jp') {
      // Meaning → Japanese
      const correct = formatJapanese(word, scriptMode);
      const distractors = shuffle(
        words
          .filter((w) => w.japanese !== word.japanese)
          .map((w) => formatJapanese(w, scriptMode))
      ).slice(0, 3);

      const uniqueDistractors = [];
      const seen = new Set([correct]);
      for (const d of distractors) {
        if (!seen.has(d)) {
          seen.add(d);
          uniqueDistractors.push(d);
        }
      }
      if (uniqueDistractors.length < 3) continue;

      const options = shuffle([correct, ...uniqueDistractors]);
      const meaningNp = word.meaningNp || word.meaning;

      questions.push({
        id: `wq-${lessonId}-${id++}`,
        type: 'multiple-choice',
        question: `How do you say "${word.meaning}" in Japanese?`,
        questionNp: `"${meaningNp}" जापानीमा कसरी भनिन्छ?`,
        options,
        optionsNp: options,
        correctAnswer: options.indexOf(correct),
      });
    }
  }

  return questions;
}

/**
 * Generate a full quiz for a lesson from both vocabulary and grammar data.
 * Combines word-based and grammar-based questions, then shuffles them together.
 *
 * @param {Array} words - Array of word objects
 * @param {Array} grammar - Array of grammar point objects
 * @param {number|string} lessonId - Lesson identifier
 * @param {Object} options - Optional overrides
 * @param {number} options.maxVocabQuestions - Max vocab questions (default 8)
 * @param {number} options.maxGrammarQuestions - Max grammar questions (default 4)
 * @param {string} options.scriptMode - 'kanji' | 'hiragana' | 'furigana' (default 'kanji')
 * @returns {Array} Shuffled array of combined quiz questions
 */
export function generateQuizFromLesson(words, grammar, lessonId, options = {}) {
  const {
    maxVocabQuestions = 8,
    maxGrammarQuestions = 4,
    scriptMode = 'kanji',
  } = options;

  const wordQuestions = generateQuizFromWords(words, lessonId, maxVocabQuestions, scriptMode);
  const grammarQuestions = generateQuizFromGrammar(grammar, lessonId, maxGrammarQuestions, scriptMode);

  const combined = [...wordQuestions, ...grammarQuestions];
  return shuffle(combined);
}
