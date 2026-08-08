/**
 * @file cambridgeFunZone.ts
 * @description Builds a playful "Fun Zone" for every Cambridge lecture from the
 * lecture's own data (vocabulary, topic, level): a chant, a riddle, a tongue
 * twister, a scramble game, a movement game and a fun fact. Nothing is random at
 * render time - everything is derived deterministically from the lecture id so a
 * child always gets the same games for the same lesson.
 */
import type { CambridgeLecture, CambridgeLevel } from "@/data/cambridgeLecturesData";

export interface FunRiddle {
  clue: string;
  clueVi: string;
  options: string[];
  answer: number;
}

export interface FunGame {
  icon: string;
  title: string;
  titleVi: string;
  how: string[];
  howVi: string[];
}

export interface FunZone {
  chantTitle: string;
  chantTitleVi: string;
  chant: string[];
  riddles: FunRiddle[];
  tongueTwister: string;
  tongueTwisterVi: string;
  scramble: { scrambled: string; answer: string; hint: string; hintVi: string }[];
  games: FunGame[];
  funFact: string;
  funFactVi: string;
  reward: string;
  rewardVi: string;
}

/** Deterministic small hash so a lecture always gets the same fun content. */
const hash = (s: string) => {
  let h = 7;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 99991;
  return h;
};

const pick = <T,>(arr: T[], seed: number): T => arr[seed % arr.length];

/** Shuffle a word using a seed (never returns the original spelling). */
const scrambleWord = (word: string, seed: number) => {
  const letters = word.split("");
  if (letters.length < 3) return word.toUpperCase();
  for (let i = letters.length - 1; i > 0; i--) {
    const j = (seed * (i + 3) + 11) % (i + 1);
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }
  const out = letters.join("");
  return (out.toLowerCase() === word.toLowerCase() ? letters.reverse().join("") : out).toUpperCase();
};

const CHANT_PATTERNS: ((w: string[], topic: string) => string[])[] = [
  (w, topic) => [
    `Clap, clap! We learn about ${topic}!`,
    `"${w[0]}" and "${w[1]}" - say them twice!`,
    `"${w[2]}" and "${w[3]}" - say them nice!`,
    `Clap, clap! Now I know ${topic}!`,
  ],
  (w, topic) => [
    `One, two - I can say "${w[0]}"!`,
    `Three, four - I can say "${w[1]}"!`,
    `Five, six - "${w[2]}" and "${w[3]}" too!`,
    `${topic} is easy, look at me!`,
  ],
  (w, topic) => [
    `Hello, hello, it's ${topic} time!`,
    `"${w[0]}", "${w[1]}" - that's my rhyme!`,
    `"${w[2]}", "${w[3]}" - I say them loud!`,
    `I speak English and I feel proud!`,
  ],
];

const TWISTERS: string[] = [
  "Six silly seals sing sweet songs on Sunday.",
  "Ten tiny tigers tried to teach ten tiny turtles.",
  "Brave brown bears bring big blue balloons.",
  "Fluffy Freddy fries five fresh fish.",
  "Pretty parrots practise perfect English.",
  "Cheerful children chase cheeky chickens.",
];

const TWISTERS_VI: string[] = [
  "Đọc thật nhanh 3 lần mà không sai nhé!",
  "Đọc chậm 1 lần, rồi nhanh 2 lần.",
  "Thi với bạn xem ai đọc nhanh hơn!",
  "Đọc to trước gương và cười thật tươi.",
  "Ghi âm giọng mình rồi nghe lại.",
  "Vỗ tay theo từng từ khi đọc.",
];

const GAMES_YOUNG: FunGame[] = [
  {
    icon: "🦘",
    title: "Jump and Say",
    titleVi: "Nhảy và Nói",
    how: [
      "Put 4 word cards on the floor.",
      "A grown-up says a word - you jump on it.",
      "Say the word out loud when you land.",
    ],
    howVi: [
      "Đặt 4 tấm thẻ từ xuống sàn.",
      "Người lớn đọc một từ - em nhảy lên thẻ đó.",
      "Khi nhảy tới, nói to từ đó lên.",
    ],
  },
  {
    icon: "🕵️",
    title: "I Spy",
    titleVi: "Tôi Nhìn Thấy",
    how: [
      "Look around your room.",
      'Say: "I spy something ..." and give one clue.',
      "Your partner guesses in English.",
    ],
    howVi: [
      "Nhìn quanh phòng của em.",
      'Nói: "I spy something ..." và cho một gợi ý.',
      "Bạn của em đoán bằng tiếng Anh.",
    ],
  },
  {
    icon: "🎭",
    title: "Act It Out",
    titleVi: "Diễn Tả Bằng Hành Động",
    how: [
      "Choose a word but keep it secret.",
      "Act it - no talking!",
      "The winner acts the next word.",
    ],
    howVi: [
      "Chọn một từ nhưng giữ bí mật.",
      "Diễn tả bằng hành động - không được nói!",
      "Ai đoán đúng sẽ diễn từ tiếp theo.",
    ],
  },
  {
    icon: "🎲",
    title: "Word Dice",
    titleVi: "Xúc Xắc Từ Vựng",
    how: [
      "Write 6 words on paper, number them 1-6.",
      "Roll a dice and read the word you get.",
      "Make a sentence with it in 5 seconds.",
    ],
    howVi: [
      "Viết 6 từ ra giấy, đánh số 1-6.",
      "Tung xúc xắc và đọc từ tương ứng.",
      "Đặt một câu với từ đó trong 5 giây.",
    ],
  },
];

const GAMES_TEEN: FunGame[] = [
  {
    icon: "⏱️",
    title: "60-Second Challenge",
    titleVi: "Thử Thách 60 Giây",
    how: [
      "Set a timer for 60 seconds.",
      "Speak about the topic without stopping.",
      "Count how many target words you used.",
    ],
    howVi: [
      "Bấm đồng hồ 60 giây.",
      "Nói về chủ đề này không ngừng.",
      "Đếm xem em dùng được bao nhiêu từ mục tiêu.",
    ],
  },
  {
    icon: "🗣️",
    title: "Two Truths, One Lie",
    titleVi: "Hai Thật, Một Giả",
    how: [
      "Write 3 sentences about the topic - one is false.",
      "Read them to a partner.",
      "Your partner finds the lie and explains why.",
    ],
    howVi: [
      "Viết 3 câu về chủ đề - trong đó 1 câu sai.",
      "Đọc cho bạn nghe.",
      "Bạn phải tìm ra câu sai và giải thích lý do.",
    ],
  },
  {
    icon: "🔁",
    title: "Paraphrase Ping-Pong",
    titleVi: "Diễn Đạt Lại Kiểu Bóng Bàn",
    how: [
      "Say a model sentence out loud.",
      "Your partner says it again with different words.",
      "Keep going until someone repeats a word.",
    ],
    howVi: [
      "Nói to một câu mẫu.",
      "Bạn nói lại câu đó bằng từ khác.",
      "Cứ thế cho tới khi ai đó lặp lại từ cũ.",
    ],
  },
  {
    icon: "📸",
    title: "Photo Talk",
    titleVi: "Nói Về Ảnh",
    how: [
      "Open any photo on your phone.",
      "Describe it for 45 seconds using today's words.",
      "Record yourself, then listen once.",
    ],
    howVi: [
      "Mở một tấm ảnh bất kỳ trên điện thoại.",
      "Miêu tả ảnh trong 45 giây, dùng từ của bài hôm nay.",
      "Ghi âm lại rồi nghe một lần.",
    ],
  },
];

const FUN_FACTS: { en: string; vi: string }[] = [
  { en: "English has about 170,000 words, but you only need around 800 to pass Starters!", vi: "Tiếng Anh có khoảng 170.000 từ, nhưng em chỉ cần khoảng 800 từ để đậu Starters!" },
  { en: "Saying a new word 7 times out loud helps your brain keep it much longer.", vi: "Đọc to một từ mới 7 lần giúp não em nhớ lâu hơn rất nhiều." },
  { en: "The most common letter in English is 'e' - count them in this lesson!", vi: "Chữ xuất hiện nhiều nhất trong tiếng Anh là 'e' - thử đếm trong bài này xem!" },
  { en: "Singing words is the fastest way to remember them - that's why chants work!", vi: "Hát các từ là cách nhớ nhanh nhất - vì thế các bài chant rất hiệu quả!" },
  { en: "Cambridge exams give every child at least one shield or star, so nobody fails.", vi: "Kỳ thi Cambridge cho mỗi bạn ít nhất một khiên hoặc một sao, nên không ai bị điểm 0." },
  { en: "Your mouth uses more than 100 muscles to speak English - it's a real workout!", vi: "Miệng em dùng hơn 100 cơ để nói tiếng Anh - đúng là một bài tập thể dục!" },
];

const REWARDS: { en: string; vi: string }[] = [
  { en: "🌟 Star Speaker sticker - you earned it!", vi: "🌟 Sticker Ngôi Sao Nói - em xứng đáng!" },
  { en: "🏅 Word Hero medal unlocked!", vi: "🏅 Mở khoá huy chương Người Hùng Từ Vựng!" },
  { en: "🚀 Rocket Learner badge - blast off!", vi: "🚀 Huy hiệu Học Sinh Tên Lửa - phóng thôi!" },
  { en: "🦁 Brave Voice trophy - you spoke out loud!", vi: "🦁 Cúp Giọng Nói Dũng Cảm - em đã nói to!" },
];

/** Clean topic label used in chants (no emoji, no leading verb, first idea only). */
const VERB_LEAD =
  /^(master|learn|learning|discover|practise|practice|explore|meet|use|using|build|say|tell|talk about|understand|know|crack|unlock|win|boost|grow|start|remember|beat|nail|revise)\s+(the\s+|your\s+|a\s+|an\s+)?/i;

const topicOf = (lecture: CambridgeLecture) => {
  const raw = lecture.title
    .replace(/^[^A-Za-z]+/, "")
    .split(/\s*[&:\-–]\s*/)[0]
    .trim()
    .replace(VERB_LEAD, "")
    .toLowerCase()
    .trim();
  return raw.length > 2 ? raw : "English";
};

/** Capitalise a chant line so it always reads like a real sentence. */
const capitaliseLines = (lines: string[]) =>
  lines.map((l) => l.charAt(0).toUpperCase() + l.slice(1));

const YOUNG: CambridgeLevel[] = ["starters", "movers", "flyers"];

export function buildFunZone(lecture: CambridgeLecture): FunZone {
  const seed = hash(lecture.id);
  const vocab = (lecture.vocabulary ?? []).filter((v) => v?.word);
  const words = vocab.map((v) => v.word);
  const topic = topicOf(lecture);
  const young = YOUNG.includes(lecture.level);

  // Chant needs 4 words - repeat the list if the lecture has fewer.
  const chantWords = Array.from({ length: 4 }, (_, i) => words[(seed + i) % Math.max(1, words.length)] ?? "English");
  const chant = pick(CHANT_PATTERNS, seed)(chantWords, topic);

  // Riddles: guess the word from its meaning, with 3 sibling words as options.
  const riddles: FunRiddle[] = vocab.slice(0, 3).map((v, i) => {
    const distractors = words.filter((w) => w !== v.word).slice(0, 8);
    const opts = [v.word, distractors[(seed + i) % Math.max(1, distractors.length)] ?? "book", distractors[(seed + i + 3) % Math.max(1, distractors.length)] ?? "happy"]
      .filter((w, idx, arr) => w && arr.indexOf(w) === idx);
    while (opts.length < 3) opts.push(["ball", "cat", "school", "friend"][opts.length]);
    const answerIdx = (seed + i) % opts.length;
    const ordered = [...opts];
    [ordered[0], ordered[answerIdx]] = [ordered[answerIdx], ordered[0]];
    return {
      clue: `I mean "${v.meaning}". Who am I?`,
      clueVi: `Tôi có nghĩa là "${v.meaningVi}". Tôi là từ nào?`,
      options: ordered,
      answer: ordered.indexOf(v.word),
    };
  });

  const scramble = vocab.slice(0, 4).map((v, i) => ({
    scrambled: scrambleWord(v.word, seed + i),
    answer: v.word,
    hint: v.meaning,
    hintVi: v.meaningVi,
  }));

  const gamePool = young ? GAMES_YOUNG : GAMES_TEEN;
  const games = [gamePool[seed % gamePool.length], gamePool[(seed + 1) % gamePool.length]];

  const fact = pick(FUN_FACTS, seed);
  const reward = pick(REWARDS, seed + 2);

  return {
    chantTitle: `Our ${topic} chant`,
    chantTitleVi: `Bài chant về ${topic}`,
    chant,
    riddles,
    tongueTwister: pick(TWISTERS, seed),
    tongueTwisterVi: pick(TWISTERS_VI, seed),
    scramble,
    games,
    funFact: fact.en,
    funFactVi: fact.vi,
    reward: reward.en,
    rewardVi: reward.vi,
  };
}

export default buildFunZone;
