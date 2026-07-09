// Minna no Nihongo N5 — Lessons 1-25
// Real content based on the Minna no Nihongo textbook series
import vocabulary from './vocabulary';
import { getQuizByLesson } from './quiz';

const LESSON_META = [
  { id: 1, title: '第1課', titleEn: 'Lesson 1: Introducing Yourself', titleNp: 'पाठ १: आफ्नो परिचय दिने' },
  { id: 2, title: '第2課', titleEn: 'Lesson 2: This and That (これ・それ・あれ)', titleNp: 'पाठ २: यो र त्यो' },
  { id: 3, title: '第3課', titleEn: 'Lesson 3: Here and There (ここ・そこ・あそこ)', titleNp: 'पाठ ३: यहाँ र त्यहाँ' },
  { id: 4, title: '第4課', titleEn: 'Lesson 4: Time and Days', titleNp: 'पाठ ४: समय र दिन' },
  { id: 5, title: '第5課', titleEn: 'Lesson 5: Going Places & Transportation', titleNp: 'पाठ ५: यात्रा र सवारी' },
  { id: 6, title: '第6課', titleEn: 'Lesson 6: Verbs — Eating, Drinking, Doing', titleNp: 'पाठ ६: क्रियाहरू' },
  { id: 7, title: '第7課', titleEn: 'Lesson 7: Tools and Methods', titleNp: 'पाठ ७: उपकरण र विधि' },
  { id: 8, title: '第8課', titleEn: 'Lesson 8: Na-Adjectives', titleNp: 'पाठ ८: ना-विशेषण' },
  { id: 9, title: '第9課', titleEn: 'Lesson 9: I-Adjectives', titleNp: 'पाठ ९: इ-विशेषण' },
  { id: 10, title: '第10課', titleEn: 'Lesson 10: Existence (あります・います)', titleNp: 'पाठ १०: अस्तित्व' },
  { id: 11, title: '第11課', titleEn: 'Lesson 11: Counters and Numbers', titleNp: 'पाठ ११: गणक र सङ्ख्या' },
  { id: 12, title: '第12課', titleEn: 'Lesson 12: Past Tense & Weather', titleNp: 'पाठ १२: भूतकाल र मौसम' },
  { id: 13, title: '第13課', titleEn: 'Lesson 13: Wanting (～たい・ほしい)', titleNp: 'पाठ १३: चाहना' },
  { id: 14, title: '第14課', titleEn: 'Lesson 14: Te-form Requests', titleNp: 'पाठ १४: ते-रूप अनुरोध' },
  { id: 15, title: '第15課', titleEn: 'Lesson 15: Permission and Prohibition', titleNp: 'पाठ १५: अनुमति र निषेध' },
  { id: 16, title: '第16課', titleEn: 'Lesson 16: Giving and Receiving', titleNp: 'पाठ १६: दिने र पाउने' },
  { id: 17, title: '第17課', titleEn: 'Lesson 17: Plain Form & Thoughts', titleNp: 'पाठ १७: सादा रूप' },
  { id: 18, title: '第18課', titleEn: 'Lesson 18: Ability (Potential Form)', titleNp: 'पाठ १८: क्षमता' },
  { id: 19, title: '第19課', titleEn: 'Lesson 19: Experience (Ta-form ことがある)', titleNp: 'पाठ १९: अनुभव' },
  { id: 20, title: '第20課', titleEn: 'Lesson 20: Health and Body', titleNp: 'पाठ २०: स्वास्थ्य र शरीर' },
  { id: 21, title: '第21課', titleEn: 'Lesson 21: Opinions and Quotations', titleNp: 'पाठ २१: विचार र उद्धरण' },
  { id: 22, title: '第22課', titleEn: 'Lesson 22: Relative Clauses', titleNp: 'पाठ २२: सम्बन्धित वाक्य' },
  { id: 23, title: '第23課', titleEn: 'Lesson 23: Doing Favors', titleNp: 'पाठ २३: उपकार गर्ने' },
  { id: 24, title: '第24課', titleEn: 'Lesson 24: Gifts and Shopping', titleNp: 'पाठ २४: उपहार र किनमेल' },
  { id: 25, title: '第25課', titleEn: 'Lesson 25: Conditionals (たら・ば)', titleNp: 'पाठ २५: सर्त वाक्य' },
];

// Build lesson objects — words from vocabulary.js, quiz from quiz.js
const lessons = LESSON_META.map((meta) => ({
  ...meta,
  lessonNumber: meta.id,
  words: vocabulary[meta.id] || [],
  grammar: [],
  quiz: getQuizByLesson(meta.id),
}));

// ——— Lesson 1: Full grammar & quiz ———
lessons[0].grammar.push(
  {
    pattern: 'N1 は N2 です',
    explanation:
      'A is B. 「は」 is the topic particle, and 「です」 means "is / are / am."',
    explanationNp:
      'A भनेको B हो। 「は」 विषय कण हो, र 「です」 को अर्थ "हो" हो।',
    examples: [
      {
        japanese: 'わたしは学生です。',
        reading: 'わたしはがくせいです',
        meaning: 'I am a student.',
        meaningNp: 'म विद्यार्थी हुँ।',
      },
      {
        japanese: '田中さんは先生です。',
        reading: 'たなかさんはせんせいです',
        meaning: 'Mr. Tanaka is a teacher.',
        meaningNp: 'तानाका सान शिक्षक हुन्।',
      },
    ],
  },
  {
    pattern: 'N1 は N2 ではありません',
    explanation: 'A is not B. Negative form of 「です」.',
    explanationNp: 'A भनेको B होइन। 「です」 को नकारात्मक रूप।',
    examples: [
      {
        japanese: 'わたしは学生ではありません。',
        reading: 'わたしはがくせいではありません',
        meaning: 'I am not a student.',
        meaningNp: 'म विद्यार्थी होइन।',
      },
      {
        japanese: '山田さんは医者ではありません。',
        reading: 'やまださんはいしゃではありません',
        meaning: 'Mr. Yamada is not a doctor.',
        meaningNp: 'यामादा सान डाक्टर होइनन्।',
      },
    ],
  },
  {
    pattern: 'N1 は N2 ですか',
    explanation:
      'Is A B? Question form: add 「か」 at the end. Answer with 「はい」 (yes) or 「いいえ」 (no).',
    explanationNp:
      'के A B हो? प्रश्न रूप: अन्त्यमा 「か」 थप्नुहोस्। 「はい」(हो) वा 「いいえ」(होइन) मा जवाफ दिनुहोस्।',
    examples: [
      {
        japanese: 'あなたは学生ですか。',
        reading: 'あなたはがくせいですか',
        meaning: 'Are you a student?',
        meaningNp: 'के तपाईं विद्यार्थी हुनुहुन्छ?',
      },
      {
        japanese: 'はい、学生です。',
        reading: 'はい、がくせいです',
        meaning: 'Yes, I am a student.',
        meaningNp: 'हो, म विद्यार्थी हुँ।',
      },
      {
        japanese: 'いいえ、学生ではありません。',
        reading: 'いいえ、がくせいではありません',
        meaning: 'No, I am not a student.',
        meaningNp: 'होइन, म विद्यार्थी होइन।',
      },
    ],
  },
  {
    pattern: 'N1 の N2',
    explanation:
      "The particle 「の」 connects two nouns. N1 modifies N2 (N2 of N1 / N1's N2).",
    explanationNp:
      'कण 「の」 ले दुई संज्ञा जोड्दछ। N1 ले N2 लाई परिमार्जन गर्दछ (N1 को N2)।',
    examples: [
      {
        japanese: 'わたしの名前は田中です。',
        reading: 'わたしのなまえはたなかです',
        meaning: 'My name is Tanaka.',
        meaningNp: 'मेरो नाउँ तानाका हो।',
      },
      {
        japanese: '大学の先生',
        reading: 'だいがくのせんせい',
        meaning: 'A university teacher',
        meaningNp: 'विश्वविद्यालयका शिक्षक',
      },
    ],
  },
  {
    pattern: '～さん',
    explanation:
      "「さん」 is a polite suffix added after a person's name. Never use it for yourself.",
    explanationNp:
      '「さん」 व्यक्तिको नाम पछि थपिने आदरसूचक प्रत्यय हो। आफ्नो लागि प्रयोग नगर्नुहोस्।',
    examples: [
      {
        japanese: '田中さん',
        reading: 'たなかさん',
        meaning: 'Mr. Tanaka',
        meaningNp: 'तानाका सान',
      },
      {
        japanese: 'スミスさん',
        reading: 'すみすさん',
        meaning: 'Mr. Smith',
        meaningNp: 'स्मिथ सान',
      },
    ],
  }
);

// Quiz questions for all lessons are loaded from quiz.js via getQuizByLesson() above

export function getLessonById(id) {
  return lessons.find((l) => l.id === Number(id));
}

export function getAllLessons() {
  return lessons;
}

export default lessons;
