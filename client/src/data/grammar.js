// Minna no Nihongo N5 — Grammar points for Lessons 1–25
// Based on the Minna no Nihongo Shokyu textbook series

const grammar = {
  1: [
    {
      pattern: 'N1 は N2 です',
      explanation: 'A is B. 「は」 is the topic particle, and 「です」 means "is / are / am."',
      explanationNp: 'A भनेको B हो। 「は」 विषय कण हो, र 「です」 को अर्थ "हो" हो।',
      examples: [
        { japanese: 'わたしは学生です。', reading: 'わたしはがくせいです', meaning: 'I am a student.', meaningNp: 'म विद्यार्थी हुँ।' },
        { japanese: '田中さんは先生です。', reading: 'たなかさんはせんせいです', meaning: 'Mr. Tanaka is a teacher.', meaningNp: 'तानाका सान शिक्षक हुन्।' },
      ],
    },
    {
      pattern: 'N1 は N2 ではありません',
      explanation: 'A is not B. Negative form of 「です」.',
      explanationNp: 'A भनेको B होइन। 「です」 को नकारात्मक रूप।',
      examples: [
        { japanese: 'わたしは学生ではありません。', reading: 'わたしはがくせいではありません', meaning: 'I am not a student.', meaningNp: 'म विद्यार्थी होइन।' },
        { japanese: '山田さんは医者ではありません。', reading: 'やまださんはいしゃではありません', meaning: 'Mr. Yamada is not a doctor.', meaningNp: 'यामादा सान डाक्टर होइनन्।' },
      ],
    },
    {
      pattern: 'N1 は N2 ですか',
      explanation: 'Is A B? Question form: add 「か」 at the end. Answer with 「はい」 (yes) or 「いいえ」 (no).',
      explanationNp: 'के A B हो? प्रश्न रूप: अन्त्यमा 「か」 थप्नुहोस्। 「はい」(हो) वा 「いいえ」(होइन) मा जवाफ दिनुहोस्।',
      examples: [
        { japanese: 'あなたは学生ですか。', reading: 'あなたはがくせいですか', meaning: 'Are you a student?', meaningNp: 'के तपाईं विद्यार्थी हुनुहुन्छ?' },
        { japanese: 'はい、学生です。', reading: 'はい、がくせいです', meaning: 'Yes, I am a student.', meaningNp: 'हो, म विद्यार्थी हुँ।' },
        { japanese: 'いいえ、学生ではありません。', reading: 'いいえ、がくせいではありません', meaning: 'No, I am not a student.', meaningNp: 'होइन, म विद्यार्थी होइन।' },
      ],
    },
    {
      pattern: 'N1 の N2',
      explanation: 'The particle 「の」 connects two nouns. N1 modifies N2 (N2 of N1).',
      explanationNp: 'कण 「の」 ले दुई संज्ञा जोड्दछ। N1 ले N2 लाई परिमार्जन गर्दछ (N1 को N2)।',
      examples: [
        { japanese: 'わたしの名前は田中です。', reading: 'わたしのなまえはたなかです', meaning: 'My name is Tanaka.', meaningNp: 'मेरो नाउँ तानाका हो।' },
        { japanese: '大学の先生', reading: 'だいがくのせんせい', meaning: 'A university teacher', meaningNp: 'विश्वविद्यालयका शिक्षक' },
      ],
    },
    {
      pattern: '〜さん',
      explanation: '「さん」 is a polite suffix added after a person\'s name. Never use it for yourself.',
      explanationNp: '「さん」 व्यक्तिको नाम पछि थपिने आदरसूचक प्रत्यय हो। आफ्नो लागि प्रयोग नगर्नुहोस्।',
      examples: [
        { japanese: '田中さん', reading: 'たなかさん', meaning: 'Mr. Tanaka', meaningNp: 'तानाका सान' },
        { japanese: 'スミスさん', reading: 'すみすさん', meaning: 'Mr. Smith', meaningNp: 'स्मिथ सान' },
      ],
    },
  ],
  2: [
    {
      pattern: 'これ／それ／あれ',
      explanation: '「これ」is this thing near me, 「それ」is that thing near you, 「あれ」is that thing over there.',
      explanationNp: '「これ」मेरो नजिकको वस्तु, 「それ」तिम्रो नजिकको वस्तु, 「あれ」टाढाको वस्तु।',
      examples: [
        { japanese: 'これは本です。', reading: 'これはほんです', meaning: 'This is a book.', meaningNp: 'यो पुस्तक हो।' },
        { japanese: 'それは辞書です。', reading: 'それはじしょです', meaning: 'That (near you) is a dictionary.', meaningNp: 'त्यो शब्दकोश हो।' },
        { japanese: 'あれは新聞です。', reading: 'あれはしんぶんです', meaning: 'That (over there) is a newspaper.', meaningNp: 'त्यो समाचारपत्र हो।' },
      ],
    },
    {
      pattern: 'この／その／あの N',
      explanation: '「この/その/あの」must be followed by a noun. 「この本」= this book.',
      explanationNp: '「この/その/あの」पछि संज्ञा हुनैपर्छ। 「この本」= यो पुस्तक।',
      examples: [
        { japanese: 'この本はわたしのです。', reading: 'このほんはわたしのです', meaning: 'This book is mine.', meaningNp: 'यो पुस्तक मेरो हो।' },
        { japanese: 'そのかばんはだれのですか。', reading: 'そのかばんはだれのですか', meaning: 'Whose bag is that?', meaningNp: 'त्यो झोला कसको हो?' },
      ],
    },
    {
      pattern: 'そうです／そうですか',
      explanation: '「そうです」means "That\'s right." 「そうですか」means "I see" or "Is that so?"',
      explanationNp: '「そうです」को अर्थ "त्यसै हो।" 「そうですか」को अर्थ "त्यसो हो?" वा "बुझें।"',
      examples: [
        { japanese: 'これは本ですか。—はい、そうです。', reading: 'これはほんですか。—はい、そうです。', meaning: 'Is this a book? — Yes, it is.', meaningNp: 'के यो पुस्तक हो? — हो, त्यसै हो।' },
      ],
    },
    {
      pattern: 'N の N (ownership)',
      explanation: '「の」also marks ownership: 「わたしの本」= "my book".',
      explanationNp: '「の」ले स्वामित्व पनि जनाउँछ: 「わたしの本」= "मेरो पुस्तक"।',
      examples: [
        { japanese: 'これはわたしの本です。', reading: 'これはわたしのほんです', meaning: 'This is my book.', meaningNp: 'यो मेरो पुस्तक हो।' },
        { japanese: 'そのかぎはだれのですか。', reading: 'そのかぎはだれのですか', meaning: 'Whose key is that?', meaningNp: 'त्यो साँचो कसको हो?' },
      ],
    },
  ],
  3: [
    {
      pattern: 'ここ／そこ／あそこ',
      explanation: '「ここ」= here, 「そこ」= there (near you), 「あそこ」= over there.',
      explanationNp: '「ここ」= यहाँ, 「そこ」= त्यहाँ (तिम्रो नजिक), 「あそこ」= टाढा।',
      examples: [
        { japanese: 'ここは図書館です。', reading: 'ここはとしょかんです', meaning: 'Here is the library.', meaningNp: 'यहाँ पुस्तकालय हो।' },
        { japanese: 'あそこは病院です。', reading: 'あそこはびょういんです', meaning: 'Over there is the hospital.', meaningNp: 'टाढा अस्पताल छ।' },
        { japanese: 'うけつけはここです。', reading: 'うけつけはここです', meaning: 'The reception desk is here.', meaningNp: 'रिसेप्सन यहाँ छ।' },
      ],
    },
    {
      pattern: 'こちら／そちら／あちら',
      explanation: 'Polite versions of 「ここ/そこ/あそこ」. Also means "this way / that way."',
      explanationNp: '「ここ/そこ/あそこ」को आदरपूर्ण रूप। "यता / त्यता" पनि जनाउँछ।',
      examples: [
        { japanese: 'こちらは受付です。', reading: 'こちらはうけつけです', meaning: 'This (over here) is the reception desk.', meaningNp: 'यता रिसेप्सन छ।' },
      ],
    },
    {
      pattern: 'N は どこですか',
      explanation: 'Ask where something is. 「どこ」= where.',
      explanationNp: 'केही कहाँ छ भनेर सोध्नुहोस्। 「どこ」= कहाँ।',
      examples: [
        { japanese: 'トイレはどこですか。', reading: 'といれはどこですか', meaning: 'Where is the restroom?', meaningNp: 'शौचालय कहाँ छ?' },
        { japanese: '銀行はあそこです。', reading: 'ぎんこうはあそこです', meaning: 'The bank is over there.', meaningNp: 'बैंक त्यहाँ छ।' },
      ],
    },
    {
      pattern: 'N は ～ (building) です',
      explanation: 'Use this pattern to describe what a place is. 「ここは図書館です」= "This place is a library."',
      explanationNp: 'यो ढाँचा स्थानको बारेमा बताउन प्रयोग गरिन्छ।',
      examples: [
        { japanese: 'ここはコンビニです。', reading: 'ここはこんびにです', meaning: 'This is a convenience store.', meaningNp: 'यहाँ कन्भिनियन्स स्टोर हो।' },
      ],
    },
  ],
  4: [
    {
      pattern: 'いま〜じ〜ふんです',
      explanation: 'Tell time: 「今」= now, 「〜時」= hour, 「〜分」= minute. E.g. 「今８時です」= It is 8 o\'clock.',
      explanationNp: 'समय बताउनुहोस्: 「今」= अहिले, 「〜時」= घण्टा, 「〜分」= मिनेट।',
      examples: [
        { japanese: '今９時です。', reading: 'いまくじです', meaning: 'It is 9 o\'clock.', meaningNp: 'अहिले ९ बजे छ।' },
        { japanese: '今６時半です。', reading: 'いまろくじはんです', meaning: 'It is 6:30.', meaningNp: 'अहिले साढे ६ बजे छ।' },
      ],
    },
    {
      pattern: '〜じから〜じまで',
      explanation: 'From time A to time B. 「から」= from, 「まで」= until.',
      explanationNp: 'समय A देखि समय B सम्म। 「から」= देखि, 「まで」= सम्म।',
      examples: [
        { japanese: '９時から５時まで働きます。', reading: 'くじからごじまではたらきます', meaning: 'I work from 9 to 5.', meaningNp: 'म ९ देखि ५ बजेसम्म काम गर्छु।' },
      ],
    },
    {
      pattern: '〜ます／〜ません (polite present)',
      explanation: 'Polite affirmative: 「〜ます」. Polite negative: 「〜ません」.',
      explanationNp: 'आदरपूर्ण सकारात्मक: 「〜ます」. आदरपूर्ण नकारात्मक: 「〜ません」.',
      examples: [
        { japanese: '毎日勉強します。', reading: 'まいにちべんきょうします', meaning: 'I study every day.', meaningNp: 'म हरेक दिन पढ्छु।' },
        { japanese: '日曜日は働きません。', reading: 'にちようびははたらきません', meaning: 'I do not work on Sundays.', meaningNp: 'म आइतबार काम गर्दिन।' },
      ],
    },
    {
      pattern: '〜じに〜ます',
      explanation: 'Do something at a specific time. 「に」marks the time an action occurs.',
      explanationNp: 'एक निश्चित समयमा केही गर्नुहोस्। 「に」ले कार्यको समय जनाउँछ।',
      examples: [
        { japanese: '７時に起きます。', reading: 'しちじにおきます', meaning: 'I wake up at 7 o\'clock.', meaningNp: 'म ७ बजे उठ्छु।' },
      ],
    },
  ],
  5: [
    {
      pattern: '〜へいきます／きます／かえります',
      explanation: '「へ」marks direction. Used with verbs of movement: go / come / return.',
      explanationNp: '「へ」ले दिशा जनाउँछ। गति क्रियाहरूसँग प्रयोग गरिन्छ: जानु / आउनु / फर्कनु।',
      examples: [
        { japanese: '日本へ行きます。', reading: 'にほんへいきます', meaning: 'I go to Japan.', meaningNp: 'म जापान जान्छु।' },
        { japanese: 'うちへ帰ります。', reading: 'うちへかえります', meaning: 'I go back home.', meaningNp: 'म घर फर्कन्छु।' },
      ],
    },
    {
      pattern: '〜でいきます (transport)',
      explanation: '「で」marks the means of transportation. 「でんしゃでいきます」= go by train.',
      explanationNp: '「で」ले यातायातको साधन जनाउँछ। 「でんしゃでいきます」= रेलमा जानु।',
      examples: [
        { japanese: 'バスで学へ行きます。', reading: 'バスでがっこうへいきます', meaning: 'I go to school by bus.', meaningNp: 'म बसमा विद्यालय जान्छु।' },
        { japanese: '歩いてうちへ帰ります。', reading: 'あるいてうちへかえります', meaning: 'I walk back home.', meaningNp: 'म पैदल घर फर्कन्छु।' },
      ],
    },
    {
      pattern: '〜といきます',
      explanation: '「と」marks a companion. 「ともだちと行きます」= go with a friend.',
      explanationNp: '「と」ले साथीलाई जनाउँछ। 「ともだちと行きます」= साथीसँग जानु।',
      examples: [
        { japanese: '友だちと映画へ行きます。', reading: 'ともだちとえいがへいきます', meaning: 'I go to the movies with a friend.', meaningNp: 'म साथीसँग चलचित्र हेर्न जान्छु।' },
      ],
    },
    {
      pattern: '〜から〜まで (place)',
      explanation: 'From place A to place B. 「から」= from, 「まで」= to/until.',
      explanationNp: 'स्थान A देखि स्थान B सम्म। 「から」= देखि, 「まで」= सम्म।',
      examples: [
        { japanese: 'うちから学校まで30分かかります。', reading: 'うちからがっこうまでさんじゅっぷんかかります', meaning: 'It takes 30 minutes from my home to school.', meaningNp: 'घरदेखि विद्यालयसम्म ३० मिनेट लाग्छ।' },
      ],
    },
  ],
  6: [
    {
      pattern: '〜を〜ます (object particle)',
      explanation: '「を」marks the direct object of a verb. E.g. 「ほんをよみます」= read a book.',
      explanationNp: '「を」ले क्रियाको प्रत्यक्ष कर्म जनाउँछ।',
      examples: [
        { japanese: '水を飲みます。', reading: 'みずをのみます', meaning: 'I drink water.', meaningNp: 'म पानी पिउँछु।' },
        { japanese: '新聞を読みます。', reading: 'しんぶんをよみます', meaning: 'I read the newspaper.', meaningNp: 'म समाचारपत्र पढ्छु।' },
      ],
    },
    {
      pattern: '〜で (means / tool)',
      explanation: '「で」marks the means or tool used to do something. E.g. 「はしでたべべます」= eat with chopsticks.',
      explanationNp: '「で」ले कार्य गर्न प्रयोग गरिने साधन जनाउँछ।',
      examples: [
        { japanese: 'はしで食べます。', reading: 'はしでたべます', meaning: 'I eat with chopsticks.', meaningNp: 'म चपस्टीले खान्छु।' },
        { japanese: '日本語で話します。', reading: 'にほんごではなします', meaning: 'I speak in Japanese.', meaningNp: 'म जापानीमा बोल्छु।' },
      ],
    },
    {
      pattern: '〜を〜ませんか (invitation)',
      explanation: '"Won\'t you ~?" — a polite invitation. E.g. 「おちゃをのみませんか。」= Won\'t you have some tea?',
      explanationNp: '"के तपाईं ~ गर्नुहुन्न?" — विनम्र निमन्त्रणा।',
      examples: [
        { japanese: 'コーヒーを飲みませんか。', reading: 'コーヒーをのみませんか', meaning: 'Won\'t you have some coffee?', meaningNp: 'के तपाईं कफी पिउनुहुन्न?' },
      ],
    },
    {
      pattern: '〜ましょう (let\'s)',
      explanation: '"Let\'s do ~." E.g. 「食べましょう」= Let\'s eat.',
      explanationNp: '"~ गरौं।"',
      examples: [
        { japanese: 'いっしょに行きましょう。', reading: 'いっしょにいきましょう', meaning: 'Let\'s go together.', meaningNp: 'सँगै जाऔं।' },
      ],
    },
  ],
  7: [
    {
      pattern: '〜で〜ます (tool / means)',
      explanation: '「で」marks the tool or instrument. E.g. 「はさみで切ります」= cut with scissors.',
      explanationNp: '「で」ले उपकरण वा साधन जनाउँछ।',
      examples: [
        { japanese: 'ペンで書きます。', reading: 'ぺんでかきます', meaning: 'I write with a pen.', meaningNp: 'म कलमले लेख्छु।' },
        { japanese: 'コンピューターで仕事をします。', reading: 'こんぴゅーたーでしごとをします', meaning: 'I work on a computer.', meaningNp: 'म कम्प्युटरमा काम गर्छु।' },
      ],
    },
    {
      pattern: '〜語で (in language)',
      explanation: '「〜語」= language. 「〜で」= in. E.g. 「えいごで」= in English.',
      explanationNp: '「〜語」= भाषा। 「〜で」= मा।',
      examples: [
        { japanese: '日本語で手紙を書きます。', reading: 'にほんごでてがみをかきます', meaning: 'I write a letter in Japanese.', meaningNp: 'म जापानीमा पत्र लेख्छु।' },
      ],
    },
    {
      pattern: '〜に (frequency)',
      explanation: '「に」marks frequency per time period. E.g. 「週に２回」= twice a week.',
      explanationNp: '「に」ले समय अवधिमा हुने आवृत्ति जनाउँछ।',
      examples: [
        { japanese: '週に３回日本語を勉強します。', reading: 'しゅうにさんかいにほんごをべんきょうします', meaning: 'I study Japanese 3 times a week.', meaningNp: 'म हप्तामा ३ पटक जापानी पढ्छु।' },
      ],
    },
    {
      pattern: '〜をください',
      explanation: '"Please give me ~." Used when asking for something.',
      explanationNp: '"कृपया मलाई ~ दिनुहोस्।" केही माग्दा प्रयोग गरिन्छ।',
      examples: [
        { japanese: '水をください。', reading: 'みずをください', meaning: 'Please give me water.', meaningNp: 'कृपया मलाई पानी दिनुहोस्।' },
        { japanese: 'コーヒーをください。', reading: 'こーひーをください', meaning: 'Please give me coffee.', meaningNp: 'कृपया मलाई कफी दिनुहोस्।' },
      ],
    },
  ],
  8: [
    {
      pattern: 'な-adjectives (present affirmative)',
      explanation: 'Na-adjectives take 「な」before a noun and 「です」at the end. E.g. 「元気な人」= energetic person.',
      explanationNp: 'ना-विशेषणले संज्ञा अगाडि 「な」लिन्छ र अन्त्यमा 「です」हुन्छ।',
      examples: [
        { japanese: 'この町はにぎやかです。', reading: 'このまちはにぎやかです', meaning: 'This town is lively.', meaningNp: 'यो सहर जीवन्त छ।' },
        { japanese: '富士山はきれいです。', reading: 'ふじさんはきれいです', meaning: 'Mt. Fuji is beautiful.', meaningNp: 'फुजी पर्वत सुन्दर छ।' },
      ],
    },
    {
      pattern: 'な-adjectives (present negative)',
      explanation: 'Negative: replace 「です」with 「ではありません」or 「じゃないです」. E.g. 「元気ではありません」.',
      explanationNp: 'नकारात्मक: 「です」को सट्टा 「ではありません」वा 「じゃないです」प्रयोग गर्नुहोस्।',
      examples: [
        { japanese: 'この町はにぎやかではありません。', reading: 'このまちはにぎやかではありません', meaning: 'This town is not lively.', meaningNp: 'यो सहर जीवन्त छैन।' },
      ],
    },
    {
      pattern: 'な-adjectives + な + N',
      explanation: 'When modifying a noun, add 「な」. E.g. 「元気な人」= energetic person.',
      explanationNp: 'संज्ञालाई परिमार्जन गर्दा 「な」थप्नुहोस्।',
      examples: [
        { japanese: 'にぎやかな町', reading: 'にぎやかなまち', meaning: 'A lively town', meaningNp: 'जीवन्त सहर' },
        { japanese: 'きれいな花', reading: 'きれいなはな', meaning: 'A beautiful flower', meaningNp: 'सुन्दर फूल' },
      ],
    },
    {
      pattern: 'とても／あまり',
      explanation: '「とても」= very (positive). 「あまり + ない」= not very (negative).',
      explanationNp: '「とても」= धेरै (सकारात्मक)। 「あまり + ない」= धेरै होइन (नकारात्मक)।',
      examples: [
        { japanese: 'この町はとてもにぎやかです。', reading: 'このまちはとてもにぎやかです', meaning: 'This town is very lively.', meaningNp: 'यो सहर धेरै जीवन्त छ।' },
        { japanese: 'この町はあまりにぎやかではありません。', reading: 'このまちはあまりにぎやかではありません', meaning: 'This town is not very lively.', meaningNp: 'यो सहर धेरै जीवन्त छैन।' },
      ],
    },
  ],
  9: [
    {
      pattern: 'い-adjectives (present affirmative)',
      explanation: 'I-adjectives end in 「い」. The adjective itself conjugates. E.g. 「高い」= expensive/tall.',
      explanationNp: 'इ-विशेषण 「い」मा समाप्त हुन्छ। विशेषण आफैं परिवर्तन हुन्छ।',
      examples: [
        { japanese: 'この本は高いです。', reading: 'このほんはたかいです', meaning: 'This book is expensive.', meaningNp: 'यो पुस्तक महँगो छ।' },
        { japanese: '今日は暑いです。', reading: 'きょうはあついです', meaning: 'Today is hot.', meaningNp: 'आज गर्मी छ।' },
      ],
    },
    {
      pattern: 'い-adjectives (present negative)',
      explanation: 'Remove final 「い」, add 「くないです」or 「くありません」. E.g. 「高くないです」= not expensive.',
      explanationNp: 'अन्तिम 「い」हटाएर 「くないです」वा 「くありません」थप्नुहोस्।',
      examples: [
        { japanese: 'この本は高くないです。', reading: 'このほんはたかくないです', meaning: 'This book is not expensive.', meaningNp: 'यो पुस्तक महँगो छैन।' },
        { japanese: '今日は暑くありません。', reading: 'きょうはあつくありません', meaning: 'Today is not hot.', meaningNp: 'आज गर्मी छैन।' },
      ],
    },
    {
      pattern: 'い-adjectives + N',
      explanation: 'I-adjectives directly modify nouns without any particle. E.g. 「高い本」= an expensive book.',
      explanationNp: 'इ-विशेषणले कुनै कण बिना संज्ञालाई सिधा परिमार्जन गर्छ।',
      examples: [
        { japanese: '高い車', reading: 'たかいくるま', meaning: 'An expensive car', meaningNp: 'महँगो कार' },
        { japanese: 'おいしい料理', reading: 'おいしいりょうり', meaning: 'Delicious food', meaningNp: 'स्वादिष्ट खाना' },
      ],
    },
    {
      pattern: 'とても／かなり／あまり／全然',
      explanation: 'Degree adverbs: 「とても」= very, 「かなり」= fairly, 「あまり+ない」= not very, 「全然+ない」= not at all.',
      explanationNp: 'मात्रा क्रियाविशेषण: 「とても」= धेरै, 「かなり」= प्रशस्त, 「あまり+ない」= धेरै होइन, 「全然+ない」= पटक्कै छैन।',
      examples: [
        { japanese: 'この料理はとてもおいしいです。', reading: 'このりょうりはとてもおいしいです', meaning: 'This dish is very delicious.', meaningNp: 'यो परिकार धेरै स्वादिष्ट छ।' },
        { japanese: 'この映画は全然おもしろくないです。', reading: 'このえいがはぜんぜんおもしろくないです', meaning: 'This movie is not interesting at all.', meaningNp: 'यो चलचित्र पटक्कै रोचक छैन।' },
      ],
    },
  ],
  10: [
    {
      pattern: '〜があります (inanimate)',
      explanation: '「あります」is used for inanimate objects and plants. E.g. 「本があります」= There is a book.',
      explanationNp: '「あります」निर्जीव वस्तु र बिरुवाको लागि प्रयोग हुन्छ।',
      examples: [
        { japanese: '机があります。', reading: 'つくえがあります', meaning: 'There is a desk.', meaningNp: 'डेस्क छ।' },
        { japanese: '公園があります。', reading: 'こうえんがあります', meaning: 'There is a park.', meaningNp: 'पार्क छ।' },
      ],
    },
    {
      pattern: '〜がいます (animate)',
      explanation: '「います」is used for living things (people, animals). E.g. 「猫がいます」= There is a cat.',
      explanationNp: '「います」चल चीजहरू (मानिस, जनावर) को लागि प्रयोग हुन्छ।',
      examples: [
        { japanese: '猫がいます。', reading: 'ねこがいます', meaning: 'There is a cat.', meaningNp: 'बिरालो छ।' },
        { japanese: '田中さんがいます。', reading: 'たなかさんがいます', meaning: 'Mr. Tanaka is here.', meaningNp: 'तानाका सान यहाँ हुनुहुन्छ।' },
      ],
    },
    {
      pattern: 'N に N が あります／います',
      explanation: '「に」marks location. 「部屋に机があります」= There is a desk in the room.',
      explanationNp: '「に」ले स्थान जनाउँछ। 「部屋に机があります」= कोठामा डेस्क छ।',
      examples: [
        { japanese: '庭に犬がいます。', reading: 'にわにいぬがいます', meaning: 'There is a dog in the garden.', meaningNp: 'बगैंचामा कुकुर छ।' },
        { japanese: 'ここに電話があります。', reading: 'ここにでんわがあります', meaning: 'There is a telephone here.', meaningNp: 'यहाँ टेलिफोन छ।' },
      ],
    },
    {
      pattern: '〜は どこに ありますか／いますか',
      explanation: 'Ask where something/someone is. E.g. 「本はどこにありますか」= Where is the book?',
      explanationNp: 'केही/कोही कहाँ छ भनेर सोध्नुहोस्।',
      examples: [
        { japanese: '田中さんはどこにいますか。', reading: 'たなかさんはどこにいますか', meaning: 'Where is Mr. Tanaka?', meaningNp: 'तानाका सान कहाँ हुनुहुन्छ?' },
      ],
    },
  ],
  11: [
    {
      pattern: 'Counter: 〜つ (1-10)',
      explanation: 'The general counter 「つ」is used for numbers 1-10: ひとつ, ふたつ, みっつ, etc.',
      explanationNp: 'सामान्य गणक 「つ」अङ्क १-१० को लागि प्रयोग गरिन्छ: ひとつ, ふたつ, みっつ, आदि।',
      examples: [
        { japanese: 'りんごを３つください。', reading: 'りんごをみっつください', meaning: 'Please give me 3 apples.', meaningNp: 'कृपया मलाई ३ वटा स्याउ दिनुहोस्।' },
      ],
    },
    {
      pattern: '〜人 (counter for people)',
      explanation: 'Counter for people: ひとり, ふたり, さんにん, etc.',
      explanationNp: 'मानिसको लागि गणक: ひとり, ふたり, さんにん, आदि।',
      examples: [
        { japanese: 'うちは４人です。', reading: 'うちはよにんです', meaning: 'My family has 4 people.', meaningNp: 'हाम्रो परिवारमा ४ जना छन्।' },
      ],
    },
    {
      pattern: '〜だけ',
      explanation: '「だけ」means "only" or "just." E.g. 「これだけ」= only this.',
      explanationNp: '「だけ」को अर्थ "मात्र" वा "केवल" हो।',
      examples: [
        { japanese: 'これだけください。', reading: 'これだけください', meaning: 'Please give me just this.', meaningNp: 'कृपया मलाई यति मात्र दिनुहोस्।' },
      ],
    },
    {
      pattern: '〜と〜とどちらが〜ですか',
      explanation: 'Ask "which one between A and B?" E.g. 「コーヒーと紅茶とどちらが好きですか。」',
      explanationNp: '"A र B मध्ये कुन?" सोध्नुहोस्।',
      examples: [
        { japanese: '犬と猫とどちらが好きですか。', reading: 'いぬとねことどちらがすきですか', meaning: 'Which do you prefer, dogs or cats?', meaningNp: 'कुकुर र बिरालो मध्ये कुन मन पर्छ?' },
      ],
    },
  ],
  12: [
    {
      pattern: 'Past tense: 〜ました／〜ませんでした',
      explanation: 'Past affirmative: 「〜ました」. Past negative: 「〜ませんでした」. E.g. 「食べました」= ate.',
      explanationNp: 'भूतकाल सकारात्मक: 「〜ました」. भूतकाल नकारात्मक: 「〜ませんでした」.',
      examples: [
        { japanese: '昨日勉強しました。', reading: 'きのうべんきょうしました', meaning: 'I studied yesterday.', meaningNp: 'हिजो मैले पढें।' },
        { japanese: '日曜日は働きませんでした。', reading: 'にちようびははたらきませんでした', meaning: 'I did not work on Sunday.', meaningNp: 'मैले आइतबार काम गरिन।' },
      ],
    },
    {
      pattern: '〜は〜より (comparison)',
      explanation: 'A は B より = A is more ~ than B. E.g. 「日本はインドより小さいです。」',
      explanationNp: 'A は B より = A, B भन्दा बढी ~ छ।',
      examples: [
        { japanese: '日本語は英語より難しいです。', reading: 'にほんごはえいごよりむずかしいです', meaning: 'Japanese is more difficult than English.', meaningNp: 'जापानी अङ्ग्रेजी भन्दा कठिन छ।' },
      ],
    },
    {
      pattern: '〜のほうが〜 (comparison)',
      explanation: 'A のほうが B より = A is more ~ than B (alternative form).',
      explanationNp: 'A のほうが B より = A, B भन्दा बढी ~ छ (वैकल्पिक रूप)।',
      examples: [
        { japanese: '電車のほうがバスより速いです。', reading: 'でんしゃのほうがばすよりはやいです', meaning: 'The train is faster than the bus.', meaningNp: 'रेल बस भन्दा छिटो छ।' },
      ],
    },
    {
      pattern: 'Past tense of adjectives',
      explanation: 'い-adjective past: replace 「い」with 「かったです」. Na-adjective past: 「でした」.',
      explanationNp: 'इ-विशेषण भूतकाल: 「い」को सट्टा 「かったです」। ना-विशेषण भूतकाल: 「でした」।',
      examples: [
        { japanese: '昨日は暑かったです。', reading: 'きのうはあつかったです', meaning: 'It was hot yesterday.', meaningNp: 'हिजो गर्मी थियो।' },
        { japanese: '町はにぎやかでした。', reading: 'まちはにぎやかでした', meaning: 'The town was lively.', meaningNp: 'सहर जीवन्त थियो।' },
      ],
    },
  ],
  13: [
    {
      pattern: '〜がほしい (want something)',
      explanation: '「ほしい」is an い-adjective meaning "want." E.g. 「新しい車がほしいです」= I want a new car.',
      explanationNp: '「ほしい」भन्नाले "चाहनु" हुन्छ। यो इ-विशेषण हो।',
      examples: [
        { japanese: '新しい電話がほしいです。', reading: 'あたらしいでんわがほしいです', meaning: 'I want a new phone.', meaningNp: 'मलाई नयाँ फोन चाहिन्छ।' },
      ],
    },
    {
      pattern: '〜たい (want to do)',
      explanation: 'Add 「たい」to the stem of a verb to express desire. E.g. 「食べたい」= want to eat.',
      explanationNp: 'क्रियाको स्टेममा 「たい」थपेर इच्छा व्यक्त गरिन्छ।',
      examples: [
        { japanese: '日本へ行きたいです。', reading: 'にほんへいきたいです', meaning: 'I want to go to Japan.', meaningNp: 'म जापान जान चाहन्छु।' },
        { japanese: 'すしを食べたいです。', reading: 'すしをたべたいです', meaning: 'I want to eat sushi.', meaningNp: 'म सुशी खान चाहन्छु।' },
      ],
    },
    {
      pattern: '〜に 行く／来る (purpose)',
      explanation: 'Use the stem of a verb + 「に」to express purpose. E.g. 「買い物に行きます」= go shopping.',
      explanationNp: 'क्रियाको स्टेम + 「に」ले उद्देश्य जनाउँछ।',
      examples: [
        { japanese: '映画を見に行きます。', reading: 'えいがをみにいきます', meaning: 'I go to see a movie.', meaningNp: 'म चलचित्र हेर्न जान्छु।' },
      ],
    },
    {
      pattern: '〜たい (negative)',
      explanation: 'Negative of 「たい」: add 「くない」. E.g. 「行きたくないです」= don\'t want to go.',
      explanationNp: '「たい」को नकारात्मक: 「くない」थप्नुहोस्।',
      examples: [
        { japanese: '今日は勉強したくないです。', reading: 'きょうはべんきょうしたくないです', meaning: 'I don\'t want to study today.', meaningNp: 'म आज पढ्न चाहन्न।' },
      ],
    },
  ],
  14: [
    {
      pattern: '〜てください (request)',
      explanation: '「てください」is a polite request. Use the te-form of the verb. E.g. 「待ってください」= Please wait.',
      explanationNp: '「てください」विनम्र अनुरोध हो। क्रियाको ते-रूप प्रयोग गर्नुहोस्।',
      examples: [
        { japanese: '名前を書いてください。', reading: 'なまえをかいてください', meaning: 'Please write your name.', meaningNp: 'कृपया आफ्नो नाउँ लेख्नुहोस्।' },
        { japanese: 'ドアを閉めてください。', reading: 'どあをしめてください', meaning: 'Please close the door.', meaningNp: 'कृपया ढोका बन्द गर्नुहोस्।' },
      ],
    },
    {
      pattern: '〜ています (progressive / state)',
      explanation: '「〜ています」indicates an ongoing action or current state. E.g. 「読んでいます」= reading / is reading.',
      explanationNp: '「〜ています」चलिरहेको कार्य वा वर्तमान अवस्था जनाउँछ।',
      examples: [
        { japanese: '本を読んでいます。', reading: 'ほんをよんでいます', meaning: 'I am reading a book.', meaningNp: 'म पुस्तक पढ्दै छु।' },
        { japanese: '結婚しています。', reading: 'けっこんしています', meaning: 'I am married.', meaningNp: 'म विवाहित छु।' },
      ],
    },
    {
      pattern: '〜ましょうか (offer)',
      explanation: '"Shall I ~?" — an offer to help. E.g. 「持ちましょうか」= Shall I carry it?',
      explanationNp: '"के म ~ गरौं?" — मद्दतको प्रस्ताव।',
      examples: [
        { japanese: '窓を開けましょうか。', reading: 'まどをあけましょうか', meaning: 'Shall I open the window?', meaningNp: 'के म झ्याल खोलौं?' },
      ],
    },
    {
      pattern: 'Verb te-form conjugation (group 1)',
      explanation: 'Group 1 verbs: く→いて, ぐ→いで, む/ぶ/ぬ→んで, う/つ/る→って, す→して.',
      explanationNp: 'समूह १ क्रियाहरू: く→いて, ぐ→いで, む/ぶ/ぬ→んで, う/つ/る→って, す→して।',
      examples: [
        { japanese: '書く→書いて', reading: 'かく→かいて', meaning: 'write → writing', meaningNp: 'लेख्नु' },
        { japanese: '読む→読んで', reading: 'よむ→よんで', meaning: 'read → reading', meaningNp: 'पढ्नु' },
      ],
    },
  ],
  15: [
    {
      pattern: '〜てもいいです (permission)',
      explanation: '"May I ~?" or "It is okay to ~." E.g. 「ここに座ってもいいですか」= May I sit here?',
      explanationNp: '"के म ~ गर्न सक्छु?" वा "~ गर्न ठीक छ।"',
      examples: [
        { japanese: 'ここで写真を撮ってもいいですか。', reading: 'ここでしゃしんをとってもいいですか', meaning: 'May I take a picture here?', meaningNp: 'के म यहाँ फोटो खिच्न सक्छु?' },
      ],
    },
    {
      pattern: '〜てはいけません (prohibition)',
      explanation: '"Must not ~." E.g. 「ここでタバコを吸ってはいけません」= You must not smoke here.',
      explanationNp: '"~ गर्न हुँदैन।"',
      examples: [
        { japanese: '授業中に電話を使ってはいけません。', reading: 'じゅぎょうちゅうにでんわをつかってはいけません', meaning: 'You must not use your phone during class.', meaningNp: 'कक्षामा फोन प्रयोग गर्न हुँदैन।' },
      ],
    },
    {
      pattern: '〜て (sequential actions)',
      explanation: 'The te-form can connect sequential actions. E.g. 「起きて、歯を磨きます」= get up, then brush teeth.',
      explanationNp: 'ते-रूपले क्रमिक क्रियाहरू जोड्न सकिन्छ।',
      examples: [
        { japanese: 'スーパーへ行って、買い物をします。', reading: 'すーぱーへいって、かいものをします', meaning: 'I go to the supermarket and shop.', meaningNp: 'म सुपरमार्केट गएर किनमेल गर्छु।' },
      ],
    },
    {
      pattern: '〜から (reason)',
      explanation: '「から」means "because" and gives a reason. Comes after the reason clause. E.g. 「安いから買います」= I\'ll buy it because it\'s cheap.',
      explanationNp: '「から」को अर्थ "किनकि" हो र कारण बताउँछ।',
      examples: [
        { japanese: 'おもしろいから、この本を読んでください。', reading: 'おもしろいから、このほんをよんでください', meaning: 'Please read this book because it\'s interesting.', meaningNp: 'रोचक भएर कृपया यो पुस्तक पढ्नुहोस्।' },
      ],
    },
  ],
  16: [
    {
      pattern: '〜あげます (give)',
      explanation: '「あげます」= I give to someone else. 「わたしは友だちに本をあげました」= I gave a book to my friend.',
      explanationNp: '「あげます」= म अरूलाई दिन्छु।',
      examples: [
        { japanese: '母に花をあげました。', reading: 'ははにはなをあげました', meaning: 'I gave flowers to my mother.', meaningNp: 'मैले आमालाई फूल दिएँ।' },
      ],
    },
    {
      pattern: '〜もらいます (receive)',
      explanation: '「もらいます」= I receive from someone. 「友だちに本をもらいました」= I received a book from my friend.',
      explanationNp: '「もらいます」= म अरूबाट प्राप्त गर्छु।',
      examples: [
        { japanese: '先生に辞書をもらいました。', reading: 'せんせいにじしょをもらいました', meaning: 'I received a dictionary from my teacher.', meaningNp: 'मैले शिक्षकबाट शब्दकोश पाएँ।' },
      ],
    },
    {
      pattern: '〜くれます (give me)',
      explanation: '「くれます」= someone gives to me. 「友だちが本をくれました」= My friend gave me a book.',
      explanationNp: '「くれます」= कसैले मलाई दिन्छ।',
      examples: [
        { japanese: '母がセーターをくれました。', reading: 'ははがせーたーをくれました', meaning: 'My mother gave me a sweater.', meaningNp: 'आमाले मलाई स्वेटर दिनुभयो।' },
      ],
    },
    {
      pattern: '〜に (direction of giving)',
      explanation: '「に」marks the recipient when giving. E.g. 「友だちに本をあげます」= give a book to a friend.',
      explanationNp: '「に」ले दिँदा प्राप्तकर्तालाई जनाउँछ।',
      examples: [
        { japanese: '田中さんにプレゼントをあげます。', reading: 'たなかさんにぷれぜんとをあげます', meaning: 'I will give a present to Mr. Tanaka.', meaningNp: 'म तानाका सानलाई उपहार दिनेछु।' },
      ],
    },
  ],
  17: [
    {
      pattern: '〜ないでください (negative request)',
      explanation: '"Please don\'t ~." Use the ない-form of the verb. E.g. 「食べないでください」= Please don\'t eat.',
      explanationNp: '"कृपया ~ नगर्नुहोस्।" क्रियाको नाइ-रूप प्रयोग गर्नुहोस्।',
      examples: [
        { japanese: 'ここに車を止めないでください。', reading: 'ここにくるまをとめないでください', meaning: 'Please don\'t park the car here.', meaningNp: 'कृपया यहाँ गाडी नरोक्नुहोस्।' },
      ],
    },
    {
      pattern: '〜なければなりません (obligation)',
      explanation: '"Must do ~" or "have to do ~." E.g. 「勉強しなければなりません」= I have to study.',
      explanationNp: '"~ गर्नै पर्छ।"',
      examples: [
        { japanese: '毎日漢字を覚えなければなりません。', reading: 'まいにちかんじをおぼえなければなりません', meaning: 'I have to memorize kanji every day.', meaningNp: 'मैले हरेक दिन कान्जी सम्झनै पर्छ।' },
      ],
    },
    {
      pattern: '〜なくてもいいです (no obligation)',
      explanation: '"Don\'t have to ~." E.g. 「来なくてもいいです」= You don\'t have to come.',
      explanationNp: '"~ गर्नु पर्दैन।"',
      examples: [
        { japanese: '全部を覚えなくてもいいです。', reading: 'ぜんぶをおぼえなくてもいいです', meaning: 'You don\'t have to memorize everything.', meaningNp: 'तपाईंले सबै सम्झनु पर्दैन।' },
      ],
    },
    {
      pattern: 'Plain present form (dictionary form)',
      explanation: 'The dictionary form is used in casual speech and before certain grammar patterns.',
      explanationNp: 'कोश रूप सामान्य बोलचाल र निश्चित व्याकरण ढाँचा अगाडि प्रयोग हुन्छ।',
      examples: [
        { japanese: '毎日勉強する。', reading: 'まいにちべんきょうする', meaning: 'I study every day. (plain)', meaningNp: 'म हरेक दिन पढ्छु।' },
        { japanese: '毎日勉強しない。', reading: 'まいにちべんきょうしない', meaning: 'I don\'t study every day. (plain neg.)', meaningNp: 'म हरेक दिन पढ्दिन।' },
      ],
    },
  ],
  18: [
    {
      pattern: '〜ことができます (ability)',
      explanation: '"Can do ~" / "able to do ~." Use the dictionary form before 「ことができます」. E.g. 「泳ぐことができます」= can swim.',
      explanationNp: '"~ गर्न सक्छु।" कोश रूप अगाडि प्रयोग गर्नुहोस्।',
      examples: [
        { japanese: '日本語を話すことができます。', reading: 'にほんごをはなすことができます', meaning: 'I can speak Japanese.', meaningNp: 'म जापानी बोल्न सक्छु।' },
        { japanese: 'ギターを弾くことができます。', reading: 'ぎたーをひくことができます', meaning: 'I can play the guitar.', meaningNp: 'म गितार बजाउन सक्छु।' },
      ],
    },
    {
      pattern: '〜こと (nominalization)',
      explanation: '「こと」turns a verb into a noun. E.g. 「趣味は読むことです」= My hobby is reading.',
      explanationNp: '「こと」ले क्रियालाई संज्ञामा परिवर्तन गर्छ।',
      examples: [
        { japanese: '趣味は写真を撮ることです。', reading: 'しゅみはしゃしんをとることです', meaning: 'My hobby is taking pictures.', meaningNp: 'मेरो रुचि फोटो खिच्नु हो।' },
      ],
    },
    {
      pattern: 'Plain past form (た-form)',
      explanation: 'The た-form is the plain past affirmative. Used in casual speech and before grammar patterns.',
      explanationNp: 'た-रूप सामान्य भूतकाल सकारात्मक हो।',
      examples: [
        { japanese: '昨日映画を見た。', reading: 'きのうえいがをみた', meaning: 'I watched a movie yesterday. (plain)', meaningNp: 'हिजो चलचित्र हेरें।' },
      ],
    },
    {
      pattern: '〜方がいい (advice)',
      explanation: '"You should ~." Use the た-form or ない-form. E.g. 「行った方がいいです」= You should go.',
      explanationNp: '"तपाईंले ~ गर्नु राम्रो।"',
      examples: [
        { japanese: '早く寝た方がいいですよ。', reading: 'はやくねたほうがいいですよ', meaning: 'You should go to bed early.', meaningNp: 'तपाईंले चाँडो सुत्नु राम्रो।' },
        { japanese: '無理しない方がいいです。', reading: 'むりしないほうがいいです', meaning: 'You shouldn\'t overdo it.', meaningNp: 'तपाईंले धेरै गर्नु हुँदैन।' },
      ],
    },
  ],
  19: [
    {
      pattern: '〜たことがあります (experience)',
      explanation: '"Have done ~ before." Use the た-form. E.g. 「日本に行ったことがあります」= I have been to Japan.',
      explanationNp: '"पहिले ~ गरेको छु।" た-रूप प्रयोग गर्नुहोस्।',
      examples: [
        { japanese: 'すしを食べたことがあります。', reading: 'すしをたべたことがあります', meaning: 'I have eaten sushi before.', meaningNp: 'मैले सुशी खाएको छु।' },
        { japanese: '富士山に登ったことがありません。', reading: 'ふじさんにのぼったことがありません', meaning: 'I have never climbed Mt. Fuji.', meaningNp: 'मैले फुजी पर्वत चढेको छैन।' },
      ],
    },
    {
      pattern: '〜たり〜たりします',
      explanation: 'Do things like ~ and ~ (listing representative activities). E.g. 「読んだり書いたりします」= do things like reading and writing.',
      explanationNp: '~ र ~ जस्ता कार्य गर्नुहोस् (प्रतिनिधि क्रियाहरू सूचीबद्ध गर्ने)।',
      examples: [
        { japanese: '日曜日は映画を見たり、買い物をしたりします。', reading: 'にちようびはえいがをみたり、かいものをしたりします', meaning: 'On Sundays, I do things like watching movies and shopping.', meaningNp: 'आइतबार चलचित्र हेर्ने र किनमेल गर्ने जस्ता काम गर्छु।' },
      ],
    },
    {
      pattern: '〜た後で (after doing)',
      explanation: '"After doing ~." Use the た-form. E.g. 「食べた後で」= after eating.',
      explanationNp: '"~ गरेपछि।" た-रूप प्रयोग गर्नुहोस्।',
      examples: [
        { japanese: '仕事が終わった後で、飲みに行きます。', reading: 'しごとがおわったあとで、のみにいきます', meaning: 'After work finishes, I\'ll go for a drink.', meaningNp: 'काम सकेपछि पिउन जान्छु।' },
      ],
    },
    {
      pattern: '〜た方がいい (comparative advice)',
      explanation: '"It\'s better to do ~." Use the た-form. E.g. 「医者に行った方がいいです」= It\'s better to go to a doctor.',
      explanationNp: '"~ गर्नु राम्रो।" た-रूप प्रयोग गर्नुहोस्।',
      examples: [
        { japanese: '薬を飲んだ方がいいですよ。', reading: 'くすりをのんだほうがいいですよ', meaning: 'You\'d better take some medicine.', meaningNp: 'तपाईंले औषधि खानु राम्रो।' },
      ],
    },
  ],
  20: [
    {
      pattern: '〜て (connection / sequence)',
      explanation: 'The te-form can connect related clauses or express a sequence. E.g. 「頭が痛くて、休みました」= I had a headache and rested.',
      explanationNp: 'ते-रूपले सम्बन्धित वाक्यांश वा क्रम जोड्न सकिन्छ।',
      examples: [
        { japanese: '風邪を引いて、学校を休みました。', reading: 'かぜをひいて、がっこうをやすみました', meaning: 'I caught a cold and stayed home from school.', meaningNp: 'रुघा लागेर विद्यालय बिदा बसें।' },
      ],
    },
    {
      pattern: '〜から (reason with plain form)',
      explanation: '「から」with plain form in casual speech. E.g. 「忙しいから、行かない」= I\'m busy so I\'m not going.',
      explanationNp: '「から」सादा रूपसँग सामान्य बोलचालमा।',
      examples: [
        { japanese: '熱があるから、病院へ行きます。', reading: 'ねつがあるから、びょういんへいきます', meaning: 'I have a fever, so I\'ll go to the hospital.', meaningNp: 'ज्वरो भएर अस्पताल जान्छु।' },
      ],
    },
    {
      pattern: '〜症状の言い方 (describing symptoms)',
      explanation: 'Use 「〜が痛いです」for pain. E.g. 「頭が痛いです」= My head hurts.',
      explanationNp: 'पीडाको वर्णन गर्न 「〜が痛いです」प्रयोग गर्नुहोस्।',
      examples: [
        { japanese: 'おなかが痛いです。', reading: 'おなかがいたいです', meaning: 'My stomach hurts.', meaningNp: 'मेरो पेट दुख्छ।' },
        { japanese: '熱が３８度あります。', reading: 'ねつがさんじゅうはちどあります', meaning: 'I have a fever of 38 degrees.', meaningNp: 'मेरो ३८ डिग्री ज्वरो छ।' },
      ],
    },
    {
      pattern: '〜てください (health advice)',
      explanation: 'Using 「〜てください」to give advice. E.g. 「ゆっくり休んでください」= Please rest well.',
      explanationNp: 'सल्लाह दिन 「〜てください」प्रयोग गर्नुहोस्।',
      examples: [
        { japanese: '水をたくさん飲んでください。', reading: 'みずをたくさんのんでください', meaning: 'Please drink lots of water.', meaningNp: 'कृपया धेरै पानी पिउनुहोस्।' },
      ],
    },
  ],
  21: [
    {
      pattern: '〜と思います (I think)',
      explanation: '"I think that ~." Attach to the plain form. E.g. 「日本人だと思います」= I think (he) is Japanese.',
      explanationNp: '"मलाई लाग्छ ~।" सादा रूपमा जोड्नुहोस्।',
      examples: [
        { japanese: '明日は雨が降ると思います。', reading: 'あしたはあめがふるとおもいます', meaning: 'I think it will rain tomorrow.', meaningNp: 'मलाई लाग्छ भोलि पानी पर्छ।' },
        { japanese: 'この料理はおいしいと思います。', reading: 'このりょうりはおいしいとおもいます', meaning: 'I think this dish is delicious.', meaningNp: 'मलाई लाग्छ यो परिकार स्वादिष्ट छ।' },
      ],
    },
    {
      pattern: '〜と言います (say / quote)',
      explanation: '"Someone says ~." Quote with 「と」. E.g. 「~と言いました」= said that ~.',
      explanationNp: '"कसैले ~ भन्छ।" 「と」सँग उद्धरण।',
      examples: [
        { japanese: '田中さんは「来週休みます」と言いました。', reading: 'たなかさんは「らいしゅうやすみます」といいました', meaning: 'Mr. Tanaka said, "I will take next week off."', meaningNp: 'तानाका सानले "अर्को हप्ता बिदा लिन्छु" भन्नुभयो।' },
      ],
    },
    {
      pattern: '〜のです／んです (explanation)',
      explanation: 'Add explanatory nuance. 「〜んです」is the casual spoken form. E.g. 「〜んですか」= is it that ~?',
      explanationNp: 'व्याख्यात्मक अर्थ थप्छ। 「〜んです」सामान्य बोलचालको रूप हो।',
      examples: [
        { japanese: 'どうしたんですか。—頭が痛いんです。', reading: 'どうしたんですか。—あたまがいたいんです', meaning: 'What happened? — (The thing is,) I have a headache.', meaningNp: 'के भयो? — मेरो टाउको दुखेको छ।' },
      ],
    },
    {
      pattern: '〜でしょうか (polite question)',
      explanation: '「でしょうか」is a polite question form, softer than 「ですか」. E.g. 「どこでしょうか」= I wonder where it is.',
      explanationNp: '「でしょうか」एक विनम्र प्रश्न रूप हो, 「ですか」भन्दा नरम।',
      examples: [
        { japanese: '銀行はどこでしょうか。', reading: 'ぎんこうはどこでしょうか', meaning: 'I wonder where the bank is?', meaningNp: 'बैंक कहाँ होला?' },
      ],
    },
  ],
  22: [
    {
      pattern: 'Relative clauses (noun modification)',
      explanation: 'In Japanese, the modifier comes BEFORE the noun. E.g. 「わたしが読んだ本」= the book I read.',
      explanationNp: 'जापानीमा, परिमार्जक संज्ञा अगाडि आउँछ।',
      examples: [
        { japanese: 'これは先週見た映画です。', reading: 'これはせんしゅうみたえいがです', meaning: 'This is the movie I saw last week.', meaningNp: 'यो हप्ता देखेको चलचित्र हो।' },
        { japanese: 'あそこにいる人は先生です。', reading: 'あそこにいるひとはせんせいです', meaning: 'The person over there is a teacher.', meaningNp: 'त्यहाँ भएको व्यक्ति शिक्षक हुन्।' },
      ],
    },
    {
      pattern: '〜時 (when / at the time)',
      explanation: '「〜時」means "when / at the time ~." Use the plain form before 「時」. E.g. 「子供の時」= when I was a child.',
      explanationNp: '「〜時」को अर्थ "~ हुँदा" हो। 「時」अगाडि सादा रूप प्रयोग गर्नुहोस्।',
      examples: [
        { japanese: '日本に行く時に、このカメラを買いました。', reading: 'にほんにいくときに、このかめらをかいました', meaning: 'I bought this camera when I went to Japan.', meaningNp: 'जापान जाँदा यो क्यामेरा किनें।' },
      ],
    },
    {
      pattern: '〜前に (before)',
      explanation: '"Before doing ~." Use the dictionary form + 「前に」. E.g. 「寝る前に」= before sleeping.',
      explanationNp: '"~ गर्नु अघि।" कोश रूप + 「前に」प्रयोग गर्नुहोस्।',
      examples: [
        { japanese: '寝る前に本を読みます。', reading: 'ねるまえにほんをよみます', meaning: 'I read a book before sleeping.', meaningNp: 'सुत्नु अघि पुस्तक पढ्छु।' },
      ],
    },
    {
      pattern: '〜た後で (after)',
      explanation: '"After doing ~." Use た-form + 「後で」. E.g. 「食べた後で」= after eating.',
      explanationNp: '"~ गरेपछि।" た-रूप + 「後で」प्रयोग गर्नुहोस्।',
      examples: [
        { japanese: '食事をした後で、散歩します。', reading: 'しょくじをしたあとで、さんぽします', meaning: 'After eating, I take a walk.', meaningNp: 'खाना खाएपछि हिंड्न जान्छु।' },
      ],
    },
  ],
  23: [
    {
      pattern: '〜てあげます (do for someone)',
      explanation: 'Do something for someone. E.g. 「本を読んであげます」= I read a book for (someone).',
      explanationNp: 'कसैको लागि केही गर्नुहोस्।',
      examples: [
        { japanese: '友だちに日本語を教えてあげました。', reading: 'ともだちににほんごをおしえてあげました', meaning: 'I taught Japanese to my friend.', meaningNp: 'मैले साथीलाई जापानी सिकाएँ।' },
      ],
    },
    {
      pattern: '〜てくれます (do for me)',
      explanation: 'Someone does something for me/us. E.g. 「友だちが本を貸してくれました」= My friend lent me a book.',
      explanationNp: 'कसैले मेरो/हाम्रो लागि केही गर्छ।',
      examples: [
        { japanese: '母がセーターを編んでくれました。', reading: 'ははがせーたーをあんでくれました', meaning: 'My mother knitted me a sweater.', meaningNp: 'आमाले मेरो लागि स्वेटर बुन्नुभयो।' },
      ],
    },
    {
      pattern: '〜てもらいます (have someone do)',
      explanation: 'Have/get someone to do something. E.g. 「医者に見てもらいました」= I had a doctor look at it.',
      explanationNp: 'कसैलाई केही गर्न लगाउनु।',
      examples: [
        { japanese: '先生に作文を直してもらいました。', reading: 'せんせいにさくぶんをなおしてもらいました', meaning: 'I had my teacher correct my essay.', meaningNp: 'मैले शिक्षकबाट निबन्ध सुधार गराएँ।' },
      ],
    },
    {
      pattern: '〜ていただけませんか (polite request)',
      explanation: '"Could you please ~ for me?" Very polite. E.g. 「教えていただけませんか」= Could you please teach me?',
      explanationNp: '"के तपाईं मेरो लागि ~ गर्न सक्नुहुन्छ?" धेरै विनम्र।',
      examples: [
        { japanese: '書き方を教えていただけませんか。', reading: 'かきかたをおしえていただけませんか', meaning: 'Could you please teach me how to write it?', meaningNp: 'के तपाईं मलाई लेख्ने तरिका सिकाउन सक्नुहुन्छ?' },
      ],
    },
  ],
  24: [
    {
      pattern: '〜くれませんか (request favor)',
      explanation: '"Won\'t you ~ for me?" A polite request. E.g. 「ちょっと手伝ってくれませんか」= Won\'t you help me a bit?',
      explanationNp: '"के तपाईं मेरो लागि ~ गर्नुहुन्न?" विनम्र अनुरोध।',
      examples: [
        { japanese: 'ドアを開けてくれませんか。', reading: 'どあをあけてくれませんか', meaning: 'Could you open the door for me?', meaningNp: 'के तपाईं मेरो लागि ढोका खोल्न सक्नुहुन्छ?' },
      ],
    },
    {
      pattern: '〜ましょうか (offering)',
      explanation: '"Shall I ~ for you?" An offering. E.g. 「荷物を持ちましょうか」= Shall I carry your luggage?',
      explanationNp: '"के म ~ गरौं?" प्रस्ताव।',
      examples: [
        { japanese: 'お金を貸しましょうか。', reading: 'おかねをかしましょうか', meaning: 'Shall I lend you some money?', meaningNp: 'के म तपाईंलाई पैसा सापटी दिऊँ?' },
      ],
    },
    {
      pattern: '〜で (total / cost)',
      explanation: '「で」marks the total cost. E.g. 「全部で1000円です」= 1000 yen in total.',
      explanationNp: '「で」ले कुल मूल्य जनाउँछ।',
      examples: [
        { japanese: '全部でいくらですか。', reading: 'ぜんぶでいくらですか', meaning: 'How much is it in total?', meaningNp: 'जम्मा कति भयो?' },
      ],
    },
    {
      pattern: 'Shopping expressions',
      explanation: 'Common shopping phrases: 「いくらですか」= How much? 「これをください」= I\'ll take this.',
      explanationNp: 'सामान्य किनमेल वाक्यांशहरू।',
      examples: [
        { japanese: 'これをください。', reading: 'これをください', meaning: 'I\'ll take this, please.', meaningNp: 'कृपया मलाई यो दिनुहोस्।' },
        { japanese: 'もっと安いのはありますか。', reading: 'もっともやすいのはありますか', meaning: 'Do you have something cheaper?', meaningNp: 'के सस्तो पनि छ?' },
      ],
    },
  ],
  25: [
    {
      pattern: '〜たら (conditional: if / when)',
      explanation: '「〜たら」means "if ~" or "when ~." Use た-form + 「ら」. E.g. 「食べたら」= if (I) eat.',
      explanationNp: '「〜たら」को अर्थ "यदि ~" वा "~ गर्दा" हो। た-रूप + 「ら」प्रयोग गर्नुहोस्।',
      examples: [
        { japanese: '雨が降ったら、出かけません。', reading: 'あめがふったら、でかけません', meaning: 'If it rains, I won\'t go out.', meaningNp: 'यदि पानी पर्यो भने, बाहिर जान्न।' },
        { japanese: '日本に行ったら、すしを食べたいです。', reading: 'にほんにいったら、すしをたべたいです', meaning: 'If I go to Japan, I want to eat sushi.', meaningNp: 'जापान गए सुशी खान चाहन्छु।' },
      ],
    },
    {
      pattern: '〜ば (conditional)',
      explanation: '「〜ば」is another conditional form. For verbs: change う-column to え-column + 「ば」.',
      explanationNp: '「〜ば」अर्को सर्त रूप हो। क्रियाको लागि: う-स्तम्भलाई え-स्तम्भमा + 「ば」।',
      examples: [
        { japanese: '安ければ買います。', reading: 'やすければかいます', meaning: 'If it\'s cheap, I\'ll buy it.', meaningNp: 'सस्तो भए किन्छु।' },
        { japanese: '天気がよければ散歩します。', reading: 'てんきがよければさんぽします', meaning: 'If the weather is nice, I\'ll go for a walk.', meaningNp: 'मौसम राम्रो भए हिंड्न जान्छु।' },
      ],
    },
    {
      pattern: '〜と (conditional: natural consequence)',
      explanation: '「〜と」means "when ~" for natural/habitual consequences. E.g. 「春になると、花が咲きます」= When spring comes, flowers bloom.',
      explanationNp: '「〜と」को अर्थ प्राकृतिक/अभ्यस्त परिणामको लागि "~ गर्दा" हो।',
      examples: [
        { japanese: 'このボタンを押すと、ドアが開きます。', reading: 'このぼたんをおすと、どあがあきます', meaning: 'When you press this button, the door opens.', meaningNp: 'यो बटन थिच्दा ढोका खुल्छ।' },
      ],
    },
    {
      pattern: '〜ても (even if)',
      explanation: '「〜ても」means "even if ~." Use the te-form. E.g. 「雨でも行きます」= Even if it rains, I\'ll go.',
      explanationNp: '「〜ても」को अर्थ "~ भए पनि" हो। ते-रूप प्रयोग गर्नुहोस्।',
      examples: [
        { japanese: '高くても買います。', reading: 'たくてもかいます', meaning: 'Even if it\'s expensive, I\'ll buy it.', meaningNp: 'महँगो भए पनि किन्छु।' },
      ],
    },
  ],
};

export default grammar;

export function getGrammarByLesson(id) {
  return grammar[Number(id)] || [];
}

export function getAllGrammar() {
  return grammar;
}
