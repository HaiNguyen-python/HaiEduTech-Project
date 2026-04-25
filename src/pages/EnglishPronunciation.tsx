/**
 * @file EnglishPronunciation.tsx
 * @description "Pronunciation & Intonation" — A self-contained interactive
 * page under the English Foundation pillar. It teaches IPA basics, intonation
 * patterns, connected speech (linking, elision, assimilation), reduced forms
 * (schwa & weak forms), word/sentence stress, and contrasts British vs
 * American English with side-by-side audio + listening discrimination quiz.
 *
 * The page uses the browser SpeechSynthesis API to demo each model sentence in
 * either an en-GB or en-US voice (no backend required, no API keys). All copy
 * is bilingual via useLanguage().
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Mic2,
  Volume2,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Music2,
  Languages,
  Sparkles,
  Headphones,
  GraduationCap,
  Crown,
  Flag,
  Waves,
  Layers3,
  AudioLines,
  Trophy,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

/* -------------------------------------------------------------------------- */
/*  Speech helpers                                                            */
/* -------------------------------------------------------------------------- */

type Accent = "en-GB" | "en-US";

const speak = (text: string, accent: Accent = "en-US", rate = 0.9) => {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    toast.error("Trình duyệt không hỗ trợ phát âm tự động");
    return;
  }
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = accent;
  utter.rate = rate;
  utter.pitch = 1;
  // Try to pick a matching accent voice if available
  const voices = window.speechSynthesis.getVoices();
  const match =
    voices.find((v) => v.lang === accent) ||
    voices.find((v) => v.lang.startsWith(accent.slice(0, 2)));
  if (match) utter.voice = match;
  window.speechSynthesis.speak(utter);
};

/* -------------------------------------------------------------------------- */
/*  Curriculum data                                                           */
/* -------------------------------------------------------------------------- */

interface PhonemeRow {
  ipa: string;
  example: string;
  vi: string;
  tip: string;
  tipEn: string;
}

const VOWELS: PhonemeRow[] = [
  { ipa: "/iː/", example: "see, tree, beach", vi: "Âm i dài, kéo căng môi", tip: "Mỉm cười, kéo dài âm i", tipEn: "Smile and stretch the i sound" },
  { ipa: "/ɪ/", example: "sit, ship, bit", vi: "i ngắn, môi thả lỏng", tip: "Ngắn và lỏng, đừng kéo dài", tipEn: "Short and lax, don't stretch" },
  { ipa: "/e/", example: "bed, head, said", vi: "e ngắn rõ ràng", tip: "Mở miệng vừa, lưỡi giữa", tipEn: "Mid-open mouth, mid tongue" },
  { ipa: "/æ/", example: "cat, hat, bad", vi: "a bẹt, đặc trưng Mỹ", tip: "Hạ hàm, kéo dài hơn /e/", tipEn: "Drop jaw, longer than /e/" },
  { ipa: "/ʌ/", example: "cup, love, sun", vi: "â trầm, ngắn", tip: "Như tiếng 'ơ' bật nhẹ", tipEn: "Like a soft 'uh'" },
  { ipa: "/ɑː/", example: "car, father, palm", vi: "a dài, mở miệng to", tip: "Hạ lưỡi, mở rộng miệng", tipEn: "Lower tongue, open wide" },
  { ipa: "/ɒ/", example: "hot, dog, lot (UK)", vi: "o tròn ngắn (Anh-Anh)", tip: "Tròn môi, ngắn", tipEn: "Round lips, keep it short" },
  { ipa: "/ɔː/", example: "law, bought, four", vi: "o dài tròn môi", tip: "Tròn môi, kéo dài", tipEn: "Rounded lips, hold the sound" },
  { ipa: "/ʊ/", example: "book, put, good", vi: "u ngắn, môi tròn nhẹ", tip: "Ngắn và lỏng môi", tipEn: "Short with relaxed lips" },
  { ipa: "/uː/", example: "food, blue, moon", vi: "u dài, môi chu", tip: "Đẩy môi thật xa", tipEn: "Push lips far forward" },
  { ipa: "/ə/", example: "about, sofa, banana", vi: "Schwa - âm yếu phổ biến nhất", tip: "Cực ngắn, gần như nuốt", tipEn: "Very short, nearly swallowed" },
  { ipa: "/ɜː/", example: "bird, work, learn", vi: "ơ dài, lưỡi giữa", tip: "Giữ lưỡi giữa, kéo dài", tipEn: "Keep tongue mid, sustain" },
];

const CONSONANTS: PhonemeRow[] = [
  { ipa: "/θ/", example: "think, thank, three", vi: "Lưỡi giữa hai răng, hơi xì", tip: "Đặt đầu lưỡi giữa hai hàm răng", tipEn: "Tongue tip between teeth" },
  { ipa: "/ð/", example: "this, that, mother", vi: "Như /θ/ nhưng có rung", tip: "Như /θ/, nhưng rung dây thanh", tipEn: "Voiced /θ/ — feel vibration" },
  { ipa: "/ʃ/", example: "she, ship, fashion", vi: "Sh — môi tròn nhẹ", tip: "Tròn môi, hơi đẩy phía trước", tipEn: "Round lips, push air forward" },
  { ipa: "/ʒ/", example: "vision, measure", vi: "Như /ʃ/ nhưng rung", tip: "Voiced /ʃ/", tipEn: "Voiced version of /ʃ/" },
  { ipa: "/tʃ/", example: "church, cheese, watch", vi: "Ch — bật + xì", tip: "Bật khí mạnh + đuôi /ʃ/", tipEn: "Stop + release into /ʃ/" },
  { ipa: "/dʒ/", example: "judge, gem, age", vi: "J — như /tʃ/ có rung", tip: "Voiced /tʃ/", tipEn: "Voiced version of /tʃ/" },
  { ipa: "/ŋ/", example: "sing, ring, long", vi: "Ng cuối từ, không bật /g/", tip: "Đừng phát âm chữ g cuối", tipEn: "Don't pop the final g" },
  { ipa: "/r/", example: "red, very, around", vi: "R cuộn lưỡi nhẹ", tip: "Lưỡi cong lên, không chạm vòm", tipEn: "Curl tongue but don't touch roof" },
  { ipa: "/l/", example: "light vs feel", vi: "L sáng đầu / L tối cuối", tip: "Đầu từ: nhẹ. Cuối từ: 'tối' hơn", tipEn: "Light L initial, dark L final" },
  { ipa: "/v/", example: "very, voice, love", vi: "Răng trên cắn nhẹ môi dưới", tip: "Khác với /w/ — có rung", tipEn: "Lip-teeth contact, voiced" },
  { ipa: "/w/", example: "we, wait, away", vi: "Tròn môi, không cắn", tip: "Khác /v/: tròn môi, không răng", tipEn: "Rounded lips, no teeth" },
];

interface MinimalPair {
  vi: string;
  pair: [string, string];
  ipa: [string, string];
}
const MIN_PAIRS: MinimalPair[] = [
  { vi: "i ngắn vs i dài", pair: ["ship", "sheep"], ipa: ["/ʃɪp/", "/ʃiːp/"] },
  { vi: "i ngắn vs i dài", pair: ["live", "leave"], ipa: ["/lɪv/", "/liːv/"] },
  { vi: "/ʌ/ vs /æ/", pair: ["cup", "cap"], ipa: ["/kʌp/", "/kæp/"] },
  { vi: "/e/ vs /æ/", pair: ["bed", "bad"], ipa: ["/bed/", "/bæd/"] },
  { vi: "/θ/ vs /s/", pair: ["think", "sink"], ipa: ["/θɪŋk/", "/sɪŋk/"] },
  { vi: "/v/ vs /w/", pair: ["vest", "west"], ipa: ["/vest/", "/west/"] },
  { vi: "/r/ vs /l/", pair: ["right", "light"], ipa: ["/raɪt/", "/laɪt/"] },
  { vi: "/ʃ/ vs /tʃ/", pair: ["sheep", "cheap"], ipa: ["/ʃiːp/", "/tʃiːp/"] },
];

interface IntonationItem {
  pattern: string;
  patternEn: string;
  example: string;
  note: string;
  noteEn: string;
}
const INTONATION: IntonationItem[] = [
  {
    pattern: "Câu tường thuật → giọng đi xuống ↘",
    patternEn: "Statements → falling tone ↘",
    example: "I live in Hanoi.",
    note: "Hạ giọng ở từ cuối nhấn (Hanoi).",
    noteEn: "Lower pitch on the last stressed word (Hanoi).",
  },
  {
    pattern: "Câu hỏi Wh- → giọng đi xuống ↘",
    patternEn: "Wh-questions → falling ↘",
    example: "Where do you live?",
    note: "Wh-questions kết thúc bằng giọng giảm.",
    noteEn: "Wh-questions end with a falling tone.",
  },
  {
    pattern: "Câu hỏi Yes/No → giọng đi lên ↗",
    patternEn: "Yes/No questions → rising ↗",
    example: "Do you live in Hanoi?",
    note: "Lên giọng ở từ cuối.",
    noteEn: "Rise on the final word.",
  },
  {
    pattern: "Liệt kê → lên ↗ ↗ ↗ rồi xuống ↘",
    patternEn: "Lists → rise rise rise then fall",
    example: "I bought apples, oranges, bananas, and grapes.",
    note: "Mỗi mục lên, mục cuối xuống.",
    noteEn: "Rise on each item, fall on the last.",
  },
  {
    pattern: "Câu hỏi đuôi (chắc chắn) → xuống ↘",
    patternEn: "Tag question (sure) → falling ↘",
    example: "It's cold today, isn't it?",
    note: "Bạn đã chắc → hạ giọng phần đuôi.",
    noteEn: "You're sure → fall on the tag.",
  },
  {
    pattern: "Câu hỏi đuôi (thật sự hỏi) → lên ↗",
    patternEn: "Tag question (real question) → rising ↗",
    example: "You're coming, aren't you?",
    note: "Bạn không chắc → lên giọng đuôi.",
    noteEn: "You're unsure → rise on the tag.",
  },
];

interface LinkingItem {
  type: string;
  typeEn: string;
  example: string;
  ipa: string;
  rule: string;
  ruleEn: string;
}
const LINKING: LinkingItem[] = [
  {
    type: "Phụ âm + Nguyên âm (nối liền)",
    typeEn: "Consonant → Vowel (linking)",
    example: "an apple",
    ipa: "/ə‿nˈæp.l̩/",
    rule: "Phụ âm cuối từ chạy sang nguyên âm đầu từ kế tiếp.",
    ruleEn: "Move final consonant onto next initial vowel.",
  },
  {
    type: "Nguyên âm + Nguyên âm + /j/ /w/",
    typeEn: "Vowel → Vowel insert /j/ or /w/",
    example: "go on, see it",
    ipa: "/ɡoʊwɒn/, /siːjɪt/",
    rule: "Chèn /j/ sau i,e; /w/ sau u,o.",
    ruleEn: "Insert /j/ after i,e; /w/ after u,o.",
  },
  {
    type: "Nuốt âm /t/ /d/ (Elision)",
    typeEn: "Elision of /t/ /d/",
    example: "next day → 'nex day'",
    ipa: "/neks deɪ/",
    rule: "Bỏ /t/ /d/ giữa hai phụ âm để nói nhanh hơn.",
    ruleEn: "Drop /t/ /d/ between consonants for fluency.",
  },
  {
    type: "Đồng hóa (Assimilation)",
    typeEn: "Assimilation",
    example: "good boy → 'goob boy'",
    ipa: "/ɡʊb bɔɪ/",
    rule: "/d/ biến thành /b/ vì âm sau là /b/.",
    ruleEn: "/d/ becomes /b/ before /b/.",
  },
  {
    type: "Catenation /t/ + you = /tʃ/",
    typeEn: "/t/ + you → /tʃu/",
    example: "What you want? → /wʌtʃu wɒnt/",
    ipa: "/wʌtʃu/",
    rule: "/t/ + /j/ thường nối thành /tʃ/.",
    ruleEn: "/t/ + /j/ blends into /tʃ/.",
  },
  {
    type: "Catenation /d/ + you = /dʒ/",
    typeEn: "/d/ + you → /dʒu/",
    example: "Did you eat? → /dɪdʒu iːt/",
    ipa: "/dɪdʒu/",
    rule: "/d/ + /j/ thường nối thành /dʒ/.",
    ruleEn: "/d/ + /j/ blends into /dʒ/.",
  },
];

interface WeakForm {
  word: string;
  strong: string;
  weak: string;
  example: string;
}
const WEAK_FORMS: WeakForm[] = [
  { word: "and", strong: "/ænd/", weak: "/ənd/ or /n̩/", example: "fish and chips → 'fish 'n chips'" },
  { word: "to", strong: "/tuː/", weak: "/tə/", example: "I want to go → /aɪ wɒnt tə ɡoʊ/" },
  { word: "of", strong: "/ɒv/", weak: "/əv/", example: "a cup of tea → /ə kʌp əv tiː/" },
  { word: "for", strong: "/fɔːr/", weak: "/fər/", example: "for me → /fər miː/" },
  { word: "can", strong: "/kæn/", weak: "/kən/", example: "I can swim → /aɪ kən swɪm/" },
  { word: "have", strong: "/hæv/", weak: "/həv/ or /əv/", example: "could have → /kʊd əv/ ('coulda')" },
  { word: "are", strong: "/ɑːr/", weak: "/ər/", example: "you are right → /jʊ ər raɪt/" },
  { word: "the", strong: "/ðiː/", weak: "/ðə/", example: "the book → /ðə bʊk/" },
];

interface AccentRow {
  feature: string;
  featureEn: string;
  uk: string;
  us: string;
  example: string;
}
const ACCENT_TABLE: AccentRow[] = [
  {
    feature: "Âm /r/ ở cuối",
    featureEn: "Rhotic /r/",
    uk: "Không phát âm (non-rhotic)",
    us: "Có phát âm rõ (rhotic)",
    example: "car, hard, mother",
  },
  {
    feature: "Âm /æ/ vs /ɑː/",
    featureEn: "/æ/ vs /ɑː/",
    uk: "/ɑː/ — dài, mở (UK)",
    us: "/æ/ — bẹt, ngắn (US)",
    example: "dance, can't, after",
  },
  {
    feature: "Âm /t/ giữa từ",
    featureEn: "Intervocalic /t/",
    uk: "/t/ rõ — 'water'",
    us: "/d/ flap — 'wader'",
    example: "water, butter, better, city",
  },
  {
    feature: "Âm /ɒ/ vs /ɑː/",
    featureEn: "Hot vowel",
    uk: "/ɒ/ — tròn ngắn",
    us: "/ɑː/ — dài mở",
    example: "hot, lot, dog, bottle",
  },
  {
    feature: "Trọng âm từ Latin",
    featureEn: "Stress shift",
    uk: "ad-VER-tise-ment",
    us: "AD-ver-tise-ment",
    example: "advertisement, garage, ballet",
  },
  {
    feature: "Schedule",
    featureEn: "Schedule",
    uk: "/ˈʃedjuːl/ ('shed-yool')",
    us: "/ˈskedʒuːl/ ('sked-jool')",
    example: "schedule",
  },
  {
    feature: "Either / Neither",
    featureEn: "Either / Neither",
    uk: "/ˈaɪðə/",
    us: "/ˈiːðər/",
    example: "either, neither",
  },
  {
    feature: "Tomato",
    featureEn: "Tomato",
    uk: "/təˈmɑːtəʊ/",
    us: "/təˈmeɪtoʊ/",
    example: "tomato, potato",
  },
];

/* -------------------------------------------------------------------------- */
/*  Quiz                                                                      */
/* -------------------------------------------------------------------------- */

interface QuizQ {
  question: string;
  questionEn: string;
  audio: { text: string; accent: Accent };
  options: string[];
  answer: number;
  explain: string;
  explainEn: string;
}

const QUIZ: QuizQ[] = [
  {
    question: "Bạn nghe được từ nào?",
    questionEn: "Which word do you hear?",
    audio: { text: "ship", accent: "en-US" },
    options: ["sheep", "ship", "shape"],
    answer: 1,
    explain: "/ɪ/ ngắn (ship) khác /iː/ dài (sheep).",
    explainEn: "Short /ɪ/ vs long /iː/.",
  },
  {
    question: "Câu này dùng intonation gì?",
    questionEn: "Which intonation is used?",
    audio: { text: "Do you live in Hanoi?", accent: "en-US" },
    options: ["Falling ↘", "Rising ↗", "Flat →"],
    answer: 1,
    explain: "Yes/No questions thường lên giọng cuối câu.",
    explainEn: "Yes/No questions rise at the end.",
  },
  {
    question: "Cụm 'Did you eat?' nối thành âm gì?",
    questionEn: "What linking sound forms in 'Did you eat?'",
    audio: { text: "Did you eat?", accent: "en-US" },
    options: ["/dʒu/", "/tju/", "/diju/"],
    answer: 0,
    explain: "/d/ + /j/ → /dʒ/ (catenation).",
    explainEn: "/d/ + /j/ catenates to /dʒ/.",
  },
  {
    question: "Đây là giọng nào?",
    questionEn: "Which accent is this?",
    audio: { text: "Water in the bottle.", accent: "en-US" },
    options: ["British (UK)", "American (US)"],
    answer: 1,
    explain: "Mỹ phát âm 'water' với /t/ flap thành /d/ → 'wader'.",
    explainEn: "American flapping turns /t/ into /d/.",
  },
  {
    question: "Đây là giọng nào?",
    questionEn: "Which accent is this?",
    audio: { text: "Park the car in the yard.", accent: "en-GB" },
    options: ["British (UK)", "American (US)"],
    answer: 0,
    explain: "Anh-Anh non-rhotic: /r/ cuối từ không phát âm.",
    explainEn: "British is non-rhotic: final /r/ is dropped.",
  },
  {
    question: "Schwa /ə/ xuất hiện ở từ nào?",
    questionEn: "Where is the schwa?",
    audio: { text: "banana", accent: "en-US" },
    options: ["âm thứ 1", "âm thứ 2", "âm thứ 1 và 3"],
    answer: 2,
    explain: "ba-NA-na: âm 1 và 3 là /ə/, âm 2 nhấn /næ/.",
    explainEn: "ba-NA-na: syllables 1 & 3 reduce to /ə/.",
  },
  {
    question: "Nghe thấy từ nào (minimal pair)?",
    questionEn: "Which word do you hear?",
    audio: { text: "think", accent: "en-US" },
    options: ["sink", "think", "thing"],
    answer: 1,
    explain: "/θ/ — đặt lưỡi giữa hai răng, không phải /s/.",
    explainEn: "/θ/ — tongue between teeth, not /s/.",
  },
  {
    question: "'I want to go' — từ 'to' đọc như thế nào?",
    questionEn: "How is 'to' pronounced in connected speech?",
    audio: { text: "I want to go", accent: "en-US" },
    options: ["/tuː/ (strong)", "/tə/ (weak)"],
    answer: 1,
    explain: "Trong câu nói tự nhiên, 'to' giảm thành /tə/.",
    explainEn: "In natural speech, 'to' reduces to /tə/.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

const SectionHeader = ({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: any;
  title: string;
  subtitle: string;
}) => (
  <div className="flex items-start gap-3 mb-6">
    <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
      <Icon className="w-6 h-6 text-primary" />
    </div>
    <div>
      <h2 className="text-2xl font-display font-bold text-foreground">{title}</h2>
      <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
    </div>
  </div>
);

const PlayBtn = ({
  text,
  accent = "en-US",
  small,
}: {
  text: string;
  accent?: Accent;
  small?: boolean;
}) => (
  <button
    onClick={() => speak(text, accent, 0.9)}
    className={`inline-flex items-center gap-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors font-medium ${
      small ? "px-2 py-1 text-xs" : "px-3 py-1.5 text-sm"
    }`}
    aria-label={`Play ${text}`}
  >
    <Volume2 className={small ? "w-3 h-3" : "w-4 h-4"} />
    {accent === "en-GB" ? "🇬🇧" : "🇺🇸"}
  </button>
);

const EnglishPronunciation = () => {
  const { t } = useLanguage();

  // Quiz state
  const [quizIdx, setQuizIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [finished, setFinished] = useState(false);
  const startedRef = useRef(false);

  const currentQ = QUIZ[quizIdx];

  useEffect(() => {
    // Prime voices on first interaction
    if ("speechSynthesis" in window) window.speechSynthesis.getVoices();
  }, []);

  const handleAnswer = (idx: number) => {
    if (revealed) return;
    setSelected(idx);
    setRevealed(true);
    if (idx === currentQ.answer) {
      setScore((s) => s + 1);
      toast.success(t("Chính xác!", "Correct!"));
    } else {
      toast.error(t("Chưa đúng", "Not quite"));
    }
  };

  const nextQ = () => {
    if (quizIdx + 1 >= QUIZ.length) {
      setFinished(true);
      return;
    }
    setQuizIdx((i) => i + 1);
    setSelected(null);
    setRevealed(false);
  };

  const restartQuiz = () => {
    setQuizIdx(0);
    setSelected(null);
    setRevealed(false);
    setScore(0);
    setFinished(false);
  };

  const PRACTICE_SENTENCES = useMemo(
    () => [
      {
        text: "Could you tell me the way to the station?",
        focus: t("Câu hỏi lịch sự — giọng lên cuối", "Polite question — rising end"),
      },
      {
        text: "I'd like a cup of coffee, please.",
        focus: t("Weak form 'of' = /əv/, 'a' = /ə/", "Weak forms 'of' = /əv/, 'a' = /ə/"),
      },
      {
        text: "What are you doing this weekend?",
        focus: t("'What are you' nối thành 'wadaya'", "'What are you' links to 'wadaya'"),
      },
      {
        text: "She sells seashells by the seashore.",
        focus: t("Luyện /s/ vs /ʃ/", "Practice /s/ vs /ʃ/"),
      },
      {
        text: "Three thirsty thieves thanked the king.",
        focus: t("Luyện /θ/ — lưỡi giữa hai răng", "/θ/ practice — tongue between teeth"),
      },
      {
        text: "How much wood would a woodchuck chuck?",
        focus: t("Luyện /w/ và nối âm tự nhiên", "/w/ and natural linking"),
      },
    ],
    [t],
  );

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={t(
          "Pronunciation & Intonation — Phát âm chuẩn tiếng Anh | HaiEduTech",
          "Pronunciation & Intonation — Master Standard English | HaiEduTech",
        )}
        description={t(
          "Học bảng IPA, intonation, nối âm, weak forms, và phân biệt giọng Anh-Anh vs Anh-Mỹ với bài tập tương tác có audio.",
          "Master IPA, intonation, linking, weak forms, and contrast British vs American English with interactive audio exercises.",
        )}
        path="/english/pronunciation"
      />
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sky-500 via-primary to-emerald-500 text-primary-foreground">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.18),transparent_60%)]" />
        <div className="absolute -top-10 -right-10 w-60 h-60 rounded-full bg-white/15 blur-3xl" />
        <div className="container mx-auto px-4 py-14 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 text-sm font-medium mb-4">
              <Mic2 className="w-4 h-4" />
              {t("Nền tảng Anh ngữ • Phát âm", "English Foundation • Pronunciation")}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4 leading-tight">
              {t(
                "Pronunciation & Intonation",
                "Pronunciation & Intonation",
              )}
            </h1>
            <p className="text-base sm:text-lg text-white/90 mb-6 max-w-2xl">
              {t(
                "Làm chủ phát âm IPA, ngữ điệu, nối âm, luyến láy và phân biệt rõ ràng giữa Anh-Anh (British) và Anh-Mỹ (American). Mỗi ví dụ đều có nút phát âm 🇬🇧 / 🇺🇸.",
                "Master IPA, intonation, linking, connected speech, and clearly distinguish British vs American English. Every example has 🇬🇧 / 🇺🇸 audio buttons.",
              )}
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                { icon: "🔊", label: t("Audio chuẩn 2 giọng", "Native UK + US audio") },
                { icon: "📖", label: t("Bảng IPA đầy đủ", "Complete IPA chart") },
                { icon: "🎯", label: t("Quiz tương tác", "Interactive quiz") },
                { icon: "🇬🇧", label: t("So sánh UK vs US", "UK vs US comparison") },
              ].map((c) => (
                <span
                  key={c.label}
                  className="px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-xs sm:text-sm"
                >
                  {c.icon} {c.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="container mx-auto px-4 py-10">
        <Tabs defaultValue="ipa" className="w-full">
          <TabsList className="flex flex-wrap h-auto gap-2 bg-secondary/60 p-2 rounded-xl mb-8 justify-start">
            <TabsTrigger value="ipa" className="gap-2"><Layers3 className="w-4 h-4" />{t("Bảng IPA", "IPA Chart")}</TabsTrigger>
            <TabsTrigger value="minpairs" className="gap-2"><Headphones className="w-4 h-4" />{t("Cặp tối thiểu", "Minimal Pairs")}</TabsTrigger>
            <TabsTrigger value="intonation" className="gap-2"><Music2 className="w-4 h-4" />{t("Ngữ điệu", "Intonation")}</TabsTrigger>
            <TabsTrigger value="linking" className="gap-2"><Waves className="w-4 h-4" />{t("Nối âm & Luyến láy", "Linking & Connected")}</TabsTrigger>
            <TabsTrigger value="weak" className="gap-2"><AudioLines className="w-4 h-4" />{t("Weak Forms", "Weak Forms")}</TabsTrigger>
            <TabsTrigger value="ukus" className="gap-2"><Flag className="w-4 h-4" />{t("Anh-Anh vs Anh-Mỹ", "British vs American")}</TabsTrigger>
            <TabsTrigger value="practice" className="gap-2"><GraduationCap className="w-4 h-4" />{t("Luyện câu", "Sentence Drill")}</TabsTrigger>
            <TabsTrigger value="quiz" className="gap-2"><Trophy className="w-4 h-4" />{t("Quiz nghe", "Listening Quiz")}</TabsTrigger>
          </TabsList>

          {/* ============== IPA chart ============== */}
          <TabsContent value="ipa" className="space-y-8">
            <SectionHeader
              icon={Layers3}
              title={t("Bảng phiên âm IPA", "IPA Phoneme Chart")}
              subtitle={t(
                "44 âm vị tiếng Anh chuẩn — bấm 🔊 để nghe ví dụ.",
                "The 44 standard English phonemes — tap 🔊 for examples.",
              )}
            />
            <div className="grid lg:grid-cols-2 gap-6">
              {[
                { title: t("Nguyên âm (Vowels)", "Vowels"), rows: VOWELS, color: "from-amber-500/15 to-amber-500/5", border: "border-amber-500/30" },
                { title: t("Phụ âm khó (Consonants)", "Tricky Consonants"), rows: CONSONANTS, color: "from-sky-500/15 to-sky-500/5", border: "border-sky-500/30" },
              ].map((group) => (
                <div key={group.title} className={`rounded-2xl border ${group.border} bg-gradient-to-br ${group.color} p-5`}>
                  <h3 className="font-display font-bold text-lg mb-4 text-foreground">{group.title}</h3>
                  <div className="space-y-2">
                    {group.rows.map((row) => (
                      <div key={row.ipa} className="bg-card/80 backdrop-blur-sm rounded-lg p-3 border border-border/60">
                        <div className="flex items-center justify-between mb-1.5 gap-2">
                          <div className="flex items-center gap-3">
                            <span className="font-mono font-bold text-primary text-lg">{row.ipa}</span>
                            <span className="text-sm text-foreground">{row.example}</span>
                          </div>
                          <PlayBtn text={row.example.split(",")[0].trim()} />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          💡 {t(row.tip, row.tipEn)} · <span className="italic">{row.vi}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* ============== Minimal pairs ============== */}
          <TabsContent value="minpairs" className="space-y-6">
            <SectionHeader
              icon={Headphones}
              title={t("Cặp âm tối thiểu (Minimal Pairs)", "Minimal Pairs")}
              subtitle={t(
                "Hai từ chỉ khác nhau 1 âm — luyện phân biệt là chìa khóa nói chuẩn.",
                "Two words differing by one sound — discriminating them is key.",
              )}
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {MIN_PAIRS.map((mp) => (
                <div key={mp.pair.join("-")} className="rounded-xl border border-border bg-card p-4">
                  <div className="text-xs text-muted-foreground mb-3">{mp.vi}</div>
                  <div className="grid grid-cols-2 gap-3">
                    {mp.pair.map((w, i) => (
                      <div key={w} className="text-center bg-secondary/50 rounded-lg p-3 border border-border/60">
                        <div className="font-bold text-foreground text-lg">{w}</div>
                        <div className="font-mono text-xs text-primary mt-0.5">{mp.ipa[i]}</div>
                        <div className="flex justify-center gap-1 mt-2">
                          <PlayBtn text={w} accent="en-US" small />
                          <PlayBtn text={w} accent="en-GB" small />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* ============== Intonation ============== */}
          <TabsContent value="intonation" className="space-y-6">
            <SectionHeader
              icon={Music2}
              title={t("Ngữ điệu (Intonation Patterns)", "Intonation Patterns")}
              subtitle={t(
                "Cao độ thay đổi theo loại câu — đúng intonation là đúng nghĩa.",
                "Pitch changes based on sentence type — right intonation, right meaning.",
              )}
            />
            <div className="grid md:grid-cols-2 gap-4">
              {INTONATION.map((it) => (
                <div key={it.pattern} className="rounded-xl border border-border bg-card p-5">
                  <div className="inline-flex items-center gap-2 text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium mb-3">
                    <Music2 className="w-3 h-3" /> {t(it.pattern, it.patternEn)}
                  </div>
                  <p className="text-foreground font-medium mb-3 text-base">"{it.example}"</p>
                  <div className="flex items-center gap-2 mb-3">
                    <PlayBtn text={it.example} accent="en-US" />
                    <PlayBtn text={it.example} accent="en-GB" />
                  </div>
                  <p className="text-sm text-muted-foreground">{t(it.note, it.noteEn)}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* ============== Linking ============== */}
          <TabsContent value="linking" className="space-y-6">
            <SectionHeader
              icon={Waves}
              title={t("Nối âm & Luyến láy (Connected Speech)", "Linking & Connected Speech")}
              subtitle={t(
                "Người bản xứ nối các từ liền lạc — không nói rời rạc từng chữ.",
                "Native speakers connect words fluidly — they don't say each word separately.",
              )}
            />
            <div className="grid md:grid-cols-2 gap-4">
              {LINKING.map((lk) => (
                <div key={lk.example} className="rounded-xl border border-border bg-card p-5">
                  <h4 className="font-display font-semibold text-foreground mb-2">
                    {t(lk.type, lk.typeEn)}
                  </h4>
                  <div className="bg-secondary/60 rounded-lg p-3 mb-3 border border-border/50">
                    <div className="font-medium text-foreground mb-1">{lk.example}</div>
                    <div className="font-mono text-xs text-primary">{lk.ipa}</div>
                    <div className="mt-2"><PlayBtn text={lk.example} /></div>
                  </div>
                  <p className="text-sm text-muted-foreground">{t(lk.rule, lk.ruleEn)}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* ============== Weak forms ============== */}
          <TabsContent value="weak" className="space-y-6">
            <SectionHeader
              icon={AudioLines}
              title={t("Weak Forms & Schwa /ə/", "Weak Forms & Schwa /ə/")}
              subtitle={t(
                "Các từ chức năng (and, to, of, can…) thường bị giảm thành schwa khi nói nhanh.",
                "Function words (and, to, of, can…) reduce to schwa in connected speech.",
              )}
            />
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm" style={{ minWidth: 600 }}>
                <thead className="bg-secondary text-foreground">
                  <tr>
                    <th className="text-left p-3 font-semibold">{t("Từ", "Word")}</th>
                    <th className="text-left p-3 font-semibold">{t("Dạng mạnh", "Strong")}</th>
                    <th className="text-left p-3 font-semibold">{t("Dạng yếu", "Weak")}</th>
                    <th className="text-left p-3 font-semibold">{t("Ví dụ", "Example")}</th>
                    <th className="p-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {WEAK_FORMS.map((wf, i) => (
                    <tr key={wf.word} className={i % 2 === 0 ? "bg-card" : "bg-secondary/30"}>
                      <td className="p-3 font-bold text-primary">{wf.word}</td>
                      <td className="p-3 font-mono text-xs">{wf.strong}</td>
                      <td className="p-3 font-mono text-xs text-emerald-600 dark:text-emerald-400">{wf.weak}</td>
                      <td className="p-3 text-foreground">{wf.example}</td>
                      <td className="p-3"><PlayBtn text={wf.example.split("→")[0].trim()} small /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-foreground">
              💡 <strong>{t("Mẹo của thầy Hải:", "Mr. Hai's Tip:")}</strong> {t(
                "Người Việt học tiếng Anh hay phát âm rõ từng chữ → nghe 'cứng'. Hãy luyện giảm các từ chức năng (and, of, to, for, are…) thành /ə/ — bạn sẽ tự nhiên hơn ngay lập tức.",
                "Vietnamese learners often pronounce every word clearly → sounds 'stiff'. Practice reducing function words to /ə/ — you'll sound natural immediately.",
              )}
            </div>
          </TabsContent>

          {/* ============== UK vs US ============== */}
          <TabsContent value="ukus" className="space-y-6">
            <SectionHeader
              icon={Flag}
              title={t("Anh-Anh (British) vs Anh-Mỹ (American)", "British vs American English")}
              subtitle={t(
                "Hai biến thể chính — bấm 🇬🇧 và 🇺🇸 để nghe sự khác biệt.",
                "Two major varieties — tap 🇬🇧 and 🇺🇸 to hear the difference.",
              )}
            />
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-blue-500/5 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Crown className="w-5 h-5 text-blue-600" />
                  <h3 className="font-display font-bold text-lg">🇬🇧 British (RP)</h3>
                </div>
                <ul className="text-sm text-foreground space-y-1.5 list-disc list-inside">
                  <li>{t("Non-rhotic — không phát âm /r/ cuối", "Non-rhotic — drops final /r/")}</li>
                  <li>{t("/t/ rõ ở giữa từ (water → 'wo-tah')", "Crisp /t/ between vowels")}</li>
                  <li>{t("/ɑː/ dài (dance, can't)", "Long /ɑː/ (dance, can't)")}</li>
                  <li>{t("/ɒ/ tròn ngắn (hot, lot)", "Rounded short /ɒ/ (hot, lot)")}</li>
                  <li>{t("Ngữ điệu lên xuống mạnh hơn", "More melodic intonation")}</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-500/10 to-red-500/5 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Flag className="w-5 h-5 text-red-600" />
                  <h3 className="font-display font-bold text-lg">🇺🇸 American (GA)</h3>
                </div>
                <ul className="text-sm text-foreground space-y-1.5 list-disc list-inside">
                  <li>{t("Rhotic — luôn phát âm /r/ cuối", "Rhotic — always pronounces final /r/")}</li>
                  <li>{t("/t/ flap thành /d/ (water → 'wader')", "/t/ flapping → 'wader'")}</li>
                  <li>{t("/æ/ bẹt (dance, can't)", "Flat /æ/ (dance, can't)")}</li>
                  <li>{t("/ɑː/ mở (hot, lot, bottle)", "Open /ɑː/ (hot, lot, bottle)")}</li>
                  <li>{t("Ngữ điệu phẳng và đều hơn", "Flatter, more even intonation")}</li>
                </ul>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm" style={{ minWidth: 600 }}>
                <thead className="bg-secondary">
                  <tr>
                    <th className="text-left p-3 font-semibold">{t("Đặc điểm", "Feature")}</th>
                    <th className="text-left p-3 font-semibold">🇬🇧 UK</th>
                    <th className="text-left p-3 font-semibold">🇺🇸 US</th>
                    <th className="text-left p-3 font-semibold">{t("Nghe ví dụ", "Listen")}</th>
                  </tr>
                </thead>
                <tbody>
                  {ACCENT_TABLE.map((row, i) => (
                    <tr key={row.feature} className={i % 2 === 0 ? "bg-card" : "bg-secondary/30"}>
                      <td className="p-3 font-medium text-foreground">{t(row.feature, row.featureEn)}</td>
                      <td className="p-3 text-foreground">{row.uk}</td>
                      <td className="p-3 text-foreground">{row.us}</td>
                      <td className="p-3">
                        <div className="flex gap-1.5">
                          <PlayBtn text={row.example.split(",")[0].trim()} accent="en-GB" small />
                          <PlayBtn text={row.example.split(",")[0].trim()} accent="en-US" small />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 text-sm text-foreground">
              <strong>{t("Chọn giọng nào?", "Which accent should I learn?")}</strong>{" "}
              {t(
                "IELTS/Cambridge → khuyến khích Anh-Anh nhưng cả hai đều được chấp nhận. TOEIC/SAT → Anh-Mỹ. Quan trọng nhất: chọn 1 giọng và kiên trì luyện cho nhất quán.",
                "IELTS/Cambridge → British preferred but both accepted. TOEIC/SAT → American. Most important: pick one and practice consistently.",
              )}
            </div>
          </TabsContent>

          {/* ============== Sentence Practice ============== */}
          <TabsContent value="practice" className="space-y-6">
            <SectionHeader
              icon={GraduationCap}
              title={t("Luyện đọc câu (Shadowing)", "Sentence Shadowing Drill")}
              subtitle={t(
                "Bấm phát, lặp lại theo audio, ghi âm và so sánh — luyện shadowing 5-10 phút mỗi ngày.",
                "Listen, shadow, record and compare — 5-10 minutes a day.",
              )}
            />
            <div className="grid md:grid-cols-2 gap-4">
              {PRACTICE_SENTENCES.map((s, i) => (
                <motion.div
                  key={s.text}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <p className="text-foreground text-base font-medium mb-3 leading-relaxed">
                    "{s.text}"
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <PlayBtn text={s.text} accent="en-US" />
                    <PlayBtn text={s.text} accent="en-GB" />
                    <button
                      onClick={() => speak(s.text, "en-US", 0.55)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg bg-secondary text-foreground hover:bg-secondary/80 font-medium"
                    >
                      🐢 {t("Chậm", "Slow")}
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground">🎯 {s.focus}</p>
                </motion.div>
              ))}
            </div>
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-5 text-sm text-foreground flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <strong>{t("Kết hợp với AI Speaking Coach", "Combine with AI Speaking Coach")}:</strong>{" "}
                {t(
                  "Sau khi luyện ở đây, hãy ghi âm thử ở AI Speaking Coach để được chấm điểm phát âm chi tiết.",
                  "After practicing here, record yourself in the AI Speaking Coach for detailed pronunciation scoring.",
                )}{" "}
                <Link to="/speaking-coach/english" className="text-primary font-semibold underline">
                  {t("Mở AI Speaking Coach", "Open AI Speaking Coach")} →
                </Link>
              </div>
            </div>
          </TabsContent>

          {/* ============== Quiz ============== */}
          <TabsContent value="quiz" className="space-y-6">
            <SectionHeader
              icon={Trophy}
              title={t("Quiz nghe & phân biệt giọng", "Listening & Accent Quiz")}
              subtitle={t(
                `${QUIZ.length} câu hỏi: minimal pairs, intonation, nối âm, UK vs US.`,
                `${QUIZ.length} questions: minimal pairs, intonation, linking, UK vs US.`,
              )}
            />

            {!finished ? (
              <div className="rounded-2xl border border-border bg-card p-6 max-w-2xl mx-auto">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-muted-foreground">
                    {t("Câu", "Question")} {quizIdx + 1} / {QUIZ.length}
                  </span>
                  <span className="text-sm font-semibold text-primary">
                    {t("Điểm", "Score")}: {score}
                  </span>
                </div>

                <div className="h-1.5 bg-secondary rounded-full overflow-hidden mb-6">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-emerald-500 transition-all"
                    style={{ width: `${((quizIdx + (revealed ? 1 : 0)) / QUIZ.length) * 100}%` }}
                  />
                </div>

                <h3 className="font-display font-bold text-lg text-foreground mb-4">
                  {t(currentQ.question, currentQ.questionEn)}
                </h3>

                <div className="flex flex-wrap items-center gap-2 mb-6 p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                  <button
                    onClick={() => speak(currentQ.audio.text, currentQ.audio.accent, 0.9)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:brightness-110 transition-all"
                  >
                    <Volume2 className="w-5 h-5" /> {t("Phát audio", "Play audio")}
                  </button>
                  <button
                    onClick={() => speak(currentQ.audio.text, currentQ.audio.accent, 0.55)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-secondary text-foreground font-medium hover:bg-secondary/80"
                  >
                    🐢 {t("Phát chậm", "Play slow")}
                  </button>
                </div>

                <div className="space-y-2 mb-6">
                  {currentQ.options.map((opt, i) => {
                    const isCorrect = revealed && i === currentQ.answer;
                    const isWrong = revealed && i === selected && i !== currentQ.answer;
                    return (
                      <button
                        key={opt}
                        onClick={() => handleAnswer(i)}
                        disabled={revealed}
                        className={`w-full text-left px-4 py-3 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                          isCorrect
                            ? "border-emerald-500 bg-emerald-500/10 text-foreground"
                            : isWrong
                            ? "border-red-500 bg-red-500/10 text-foreground"
                            : "border-border bg-secondary/40 hover:bg-secondary text-foreground"
                        } ${revealed ? "cursor-default" : "cursor-pointer"}`}
                      >
                        <span className="font-medium">{opt}</span>
                        {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                        {isWrong && <XCircle className="w-5 h-5 text-red-600 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {revealed && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl bg-secondary/60 border border-border p-4 mb-4 text-sm text-foreground"
                  >
                    💡 {t(currentQ.explain, currentQ.explainEn)}
                  </motion.div>
                )}

                {revealed && (
                  <button
                    onClick={nextQ}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:brightness-110 transition-all"
                  >
                    {quizIdx + 1 >= QUIZ.length ? t("Xem kết quả", "See results") : t("Câu tiếp theo", "Next question")}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            ) : (
              <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/15 to-emerald-500/10 p-8 max-w-xl mx-auto text-center">
                <Trophy className="w-14 h-14 text-primary mx-auto mb-3" />
                <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                  {t("Hoàn thành!", "All done!")}
                </h3>
                <p className="text-lg text-foreground mb-1">
                  {t("Điểm số của bạn", "Your score")}:{" "}
                  <span className="font-bold text-primary">
                    {score} / {QUIZ.length}
                  </span>
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  {score >= QUIZ.length * 0.8
                    ? t("Xuất sắc! Tai nghe của bạn rất nhạy.", "Excellent! Sharp ears.")
                    : score >= QUIZ.length * 0.5
                    ? t("Tốt — luyện thêm minimal pairs.", "Good — keep drilling minimal pairs.")
                    : t("Đừng nản — quay lại học bảng IPA và intonation.", "Don't worry — revisit IPA & intonation.")}
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <button
                    onClick={restartQuiz}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:brightness-110"
                  >
                    {t("Làm lại", "Retry")}
                  </button>
                  <Link
                    to="/speaking-coach/english"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-secondary text-foreground font-semibold hover:bg-secondary/80"
                  >
                    <Mic2 className="w-4 h-4" /> {t("Tới AI Speaking Coach", "To AI Speaking Coach")}
                  </Link>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Companion CTA */}
        <div className="mt-14 grid md:grid-cols-3 gap-4">
          {[
            { to: "/english/grammar", icon: BookOpenIcon, title: t("Ngữ pháp", "Grammar"), desc: t("9 modules ngữ pháp toàn diện", "9 grammar modules") },
            { to: "/english/conversational", icon: ChatIcon, title: t("Giao tiếp", "Conversational"), desc: t("38 bài giao tiếp với TTS", "38 lessons with TTS") },
            { to: "/songs/english", icon: SongIcon, title: t("Học qua bài hát", "Learn via Songs"), desc: t("Karaoke + bài tập điền từ", "Karaoke + fill-in-blank") },
          ].map((c) => (
            <Link
              key={c.to}
              to={c.to}
              className="rounded-2xl border border-border bg-card p-5 hover:border-primary/40 hover:shadow-md transition-all group"
            >
              <c.icon className="w-6 h-6 text-primary mb-2" />
              <h4 className="font-display font-bold text-foreground group-hover:text-primary transition-colors">
                {c.title}
              </h4>
              <p className="text-xs text-muted-foreground mt-1">{c.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

// Tiny icon shims to avoid extra imports
const BookOpenIcon = (props: any) => <Languages {...props} />;
const ChatIcon = (props: any) => <Mic2 {...props} />;
const SongIcon = (props: any) => <Music2 {...props} />;

export default EnglishPronunciation;
