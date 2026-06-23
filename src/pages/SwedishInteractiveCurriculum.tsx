/**
 * @file SwedishInteractiveCurriculum.tsx
 * @description Interactive Curriculum for Swedish — vocabulary, sentence
 *              structures and conversation practice with browser TTS.
 *              Mirrors the English / Chinese interactive curriculum format.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useMemo, useState } from "react";
import SwedishHeroBanner from "@/components/swedish/SwedishHeroBanner";
import FloatingNordicParticles from "@/components/FloatingNordicParticles";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Volume2,
  BookOpen,
  MessageCircle,
  Wrench,
  Sparkles,
  Search,
  CheckCircle2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "@/hooks/use-toast";
import { playSwedishTts, stopSwedishTts } from "@/lib/swedishTts";

/* -------------------------------------------------------------------------- */
/* Audio helper                                                                */
/* -------------------------------------------------------------------------- */

const speakSwedish = async (text: string) => {
  stopSwedishTts();
  const ok = await playSwedishTts(text, { playbackRate: 0.9, speechRate: 0.85 });
  if (!ok) toast({ title: "Không phát được audio sv-SE" });
};

const speakSwedishSequence = async (lines: string[]) => {
  stopSwedishTts();
  for (const line of lines) {
    const ok = await playSwedishTts(line, { playbackRate: 0.9, speechRate: 0.85 });
    if (!ok) break;
    await new Promise((r) => setTimeout(r, 250));
  }
};

/* -------------------------------------------------------------------------- */
/* Data — vocabulary                                                           */
/* -------------------------------------------------------------------------- */

interface VocabRow {
  sv: string;
  vi: string;
  en: string;
  example: string;
  exampleVi: string;
}
interface VocabTopic {
  id: string;
  emoji: string;
  titleVi: string;
  titleEn: string;
  level: "A1" | "A2" | "B1";
  words: VocabRow[];
}

const VOCAB: VocabTopic[] = [
  {
    id: "v-family", emoji: "👨‍👩‍👧", titleVi: "Gia đình", titleEn: "Family", level: "A1",
    words: [
      { sv: "mamma", vi: "mẹ", en: "mom", example: "Min mamma lagar mat.", exampleVi: "Mẹ tôi nấu ăn." },
      { sv: "pappa", vi: "bố", en: "dad", example: "Min pappa jobbar i Vasa.", exampleVi: "Bố tôi làm ở Vaasa." },
      { sv: "syster", vi: "chị/em gái", en: "sister", example: "Jag har en syster.", exampleVi: "Tôi có một chị/em gái." },
      { sv: "bror", vi: "anh/em trai", en: "brother", example: "Min bror studerar.", exampleVi: "Anh tôi đang học." },
      { sv: "mormor / farmor", vi: "bà ngoại / bà nội", en: "grandma (maternal/paternal)", example: "Mormor bor i Åbo.", exampleVi: "Bà ngoại sống ở Turku." },
      { sv: "barn", vi: "con (số ít/nhiều)", en: "child/children", example: "Vi har två barn.", exampleVi: "Chúng tôi có hai con." },
      { sv: "man / fru", vi: "chồng / vợ", en: "husband / wife", example: "Min man heter Hai.", exampleVi: "Chồng tôi tên Hải." },
      { sv: "släkting", vi: "họ hàng", en: "relative", example: "Mina släktingar bor i Vietnam.", exampleVi: "Họ hàng tôi sống ở Việt Nam." },
    ],
  },
  {
    id: "v-food", emoji: "🍞", titleVi: "Ẩm thực hàng ngày", titleEn: "Everyday food", level: "A1",
    words: [
      { sv: "bröd", vi: "bánh mì", en: "bread", example: "Jag äter bröd till frukost.", exampleVi: "Tôi ăn bánh mì cho bữa sáng." },
      { sv: "kaffe", vi: "cà phê", en: "coffee", example: "En kopp kaffe, tack.", exampleVi: "Một ly cà phê, cảm ơn." },
      { sv: "mjölk", vi: "sữa", en: "milk", example: "Mjölken är kall.", exampleVi: "Sữa lạnh." },
      { sv: "ost", vi: "phô mai", en: "cheese", example: "Jag älskar svensk ost.", exampleVi: "Tôi mê phô mai Thụy Điển." },
      { sv: "äpple", vi: "quả táo", en: "apple", example: "Ett rött äpple, tack.", exampleVi: "Một quả táo đỏ, cảm ơn." },
      { sv: "kött", vi: "thịt", en: "meat", example: "Vi äter inte kött.", exampleVi: "Chúng tôi không ăn thịt." },
      { sv: "fisk", vi: "cá", en: "fish", example: "Fisken är färsk.", exampleVi: "Cá tươi lắm." },
      { sv: "frukost / lunch / middag", vi: "bữa sáng / trưa / tối", en: "breakfast / lunch / dinner", example: "Middag klockan sex.", exampleVi: "Bữa tối lúc 6 giờ." },
    ],
  },
  {
    id: "v-work", emoji: "💼", titleVi: "Công sở", titleEn: "Workplace", level: "A2",
    words: [
      { sv: "möte", vi: "cuộc họp", en: "meeting", example: "Vi har möte klockan tio.", exampleVi: "Chúng ta họp lúc 10 giờ." },
      { sv: "chef", vi: "sếp", en: "boss", example: "Min chef är väldigt snäll.", exampleVi: "Sếp tôi rất tử tế." },
      { sv: "kollega", vi: "đồng nghiệp", en: "colleague", example: "Mina kollegor är trevliga.", exampleVi: "Đồng nghiệp tôi vui tính." },
      { sv: "lön", vi: "lương", en: "salary", example: "Lönen kommer den sista.", exampleVi: "Lương trả vào ngày cuối tháng." },
      { sv: "semester", vi: "nghỉ phép", en: "vacation", example: "Vi har semester i juli.", exampleVi: "Chúng tôi nghỉ phép tháng 7." },
      { sv: "deadline", vi: "hạn chót", en: "deadline", example: "Deadline är på fredag.", exampleVi: "Hạn chót là thứ Sáu." },
      { sv: "projekt", vi: "dự án", en: "project", example: "Projektet är klart.", exampleVi: "Dự án xong rồi." },
      { sv: "anställning", vi: "việc làm/biên chế", en: "employment", example: "Jag fick fast anställning.", exampleVi: "Tôi được vào biên chế." },
    ],
  },
  {
    id: "v-society", emoji: "🌍", titleVi: "Xã hội & môi trường", titleEn: "Society & environment", level: "B1",
    words: [
      { sv: "klimatförändring", vi: "biến đổi khí hậu", en: "climate change", example: "Klimatförändringen påverkar oss alla.", exampleVi: "Biến đổi khí hậu ảnh hưởng tới tất cả." },
      { sv: "förnybar energi", vi: "năng lượng tái tạo", en: "renewable energy", example: "Vindkraft är förnybar energi.", exampleVi: "Điện gió là năng lượng tái tạo." },
      { sv: "integration", vi: "hội nhập", en: "integration", example: "Integration tar tid.", exampleVi: "Hội nhập cần thời gian." },
      { sv: "regering", vi: "chính phủ", en: "government", example: "Regeringen tar beslut idag.", exampleVi: "Chính phủ ra quyết định hôm nay." },
      { sv: "utbildning", vi: "giáo dục", en: "education", example: "Utbildning är viktig.", exampleVi: "Giáo dục rất quan trọng." },
      { sv: "arbetsmarknad", vi: "thị trường lao động", en: "labour market", example: "Arbetsmarknaden behöver experter.", exampleVi: "Thị trường lao động cần chuyên gia." },
      { sv: "låginkomsttagare", vi: "người thu nhập thấp", en: "low-income earner", example: "Stöd för låginkomsttagare.", exampleVi: "Hỗ trợ cho người thu nhập thấp." },
      { sv: "skatt", vi: "thuế", en: "tax", example: "Skatten är hög i Norden.", exampleVi: "Thuế ở Bắc Âu cao." },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* Data — sentence structures                                                  */
/* -------------------------------------------------------------------------- */

interface Structure {
  id: string;
  titleVi: string;
  titleEn: string;
  level: "A1" | "A2" | "B1";
  pattern: string;
  explainVi: string;
  explainEn: string;
  examples: { sv: string; vi: string; en: string }[];
  pitfallVi?: string;
  pitfallEn?: string;
}

const STRUCTURES: Structure[] = [
  {
    id: "s-v2", titleVi: "Quy tắc V2 — Động từ luôn ở vị trí 2", titleEn: "V2 rule — verb always second",
    level: "A1",
    pattern: "[Subjekt] [VERB] [resten]   ·   [Adverb], [VERB] [Subjekt] [resten]",
    explainVi: "Trong tiếng Thụy Điển, động từ chia luôn ở vị trí thứ 2 trong câu. Khi câu mở đầu bằng trạng từ, chủ ngữ phải đảo ra sau động từ.",
    explainEn: "In Swedish, the finite verb is always the second element. When an adverb opens the sentence, the subject moves AFTER the verb.",
    examples: [
      { sv: "Jag dricker kaffe på morgonen.", vi: "Tôi uống cà phê buổi sáng.", en: "I drink coffee in the morning." },
      { sv: "På morgonen dricker jag kaffe.", vi: "Buổi sáng tôi uống cà phê.", en: "In the morning I drink coffee." },
      { sv: "Igår åkte vi till Stockholm.", vi: "Hôm qua chúng tôi đi Stockholm.", en: "Yesterday we went to Stockholm." },
    ],
    pitfallVi: "Sai phổ biến: 'Igår jag åkte…' — phải là 'Igår åkte jag…'.",
    pitfallEn: "Common mistake: 'Igår jag åkte…' — must be 'Igår åkte jag…'.",
  },
  {
    id: "s-enett", titleVi: "Danh từ En/Ett & mạo từ xác định", titleEn: "En/Ett nouns & definite article",
    level: "A1",
    pattern: "en bok → boken → böcker → böckerna  ·  ett hus → huset → hus → husen",
    explainVi: "Tiếng Thụy Điển có 2 giống danh từ (en/ett). Mạo từ xác định gắn vào CUỐI từ chứ không đứng trước như tiếng Anh.",
    explainEn: "Swedish has 2 noun genders (en/ett). The definite article attaches to the END of the noun, unlike English.",
    examples: [
      { sv: "Jag läser en bok. Boken är spännande.", vi: "Tôi đọc một quyển sách. Quyển sách hấp dẫn.", en: "I read a book. The book is exciting." },
      { sv: "Vi har ett hus. Huset är stort.", vi: "Chúng tôi có một căn nhà. Căn nhà to.", en: "We have a house. The house is big." },
      { sv: "Böckerna ligger på bordet.", vi: "Những quyển sách nằm trên bàn.", en: "The books are on the table." },
    ],
    pitfallVi: "~75% danh từ là 'en'. Khi không chắc, đoán 'en' thắng nhiều hơn.",
    pitfallEn: "~75% of nouns are 'en'. When unsure, guessing 'en' wins more often.",
  },
  {
    id: "s-modal", titleVi: "Modal verb — KHÔNG có 'att'", titleEn: "Modal verbs — NO 'att'",
    level: "A2",
    pattern: "[Subjekt] + [kan/vill/ska/måste] + [verb nguyên thể]",
    explainVi: "Sau modal verb (kan, vill, ska, måste) là động từ nguyên thể, KHÔNG có 'att'. Dùng 'att' ở đây là lỗi sơ cấp.",
    explainEn: "After a modal (kan, vill, ska, måste) comes a bare infinitive — NEVER 'att'. Adding 'att' is a beginner mistake.",
    examples: [
      { sv: "Jag kan prata svenska.", vi: "Tôi có thể nói tiếng Thụy Điển.", en: "I can speak Swedish." },
      { sv: "Vi vill resa till Lappland.", vi: "Chúng tôi muốn đi Lapland.", en: "We want to travel to Lapland." },
      { sv: "Du måste fylla i blanketten.", vi: "Bạn phải điền vào mẫu này.", en: "You must fill in the form." },
    ],
    pitfallVi: "❌ 'Jag kan ATT prata svenska' — sai. ✅ 'Jag kan prata svenska'.",
    pitfallEn: "❌ 'Jag kan ATT prata svenska' — wrong. ✅ 'Jag kan prata svenska'.",
  },
  {
    id: "s-past", titleVi: "Quá khứ (Preteritum) — 4 nhóm động từ", titleEn: "Past tense (Preteritum) — 4 groups",
    level: "A2",
    pattern: "G1: -ar → -ade  ·  G2: -er → -de/-te  ·  G3: -r → -dde  ·  G4: oregelbundna",
    explainVi: "Học 6 động từ bất quy tắc quan trọng (vara→var, ha→hade, se→såg, göra→gjorde, gå→gick, komma→kom) là đủ 80% bài thi YKI A2 Skriva.",
    explainEn: "Memorising 6 key irregulars (vara→var, ha→hade, se→såg, göra→gjorde, gå→gick, komma→kom) covers 80% of YKI A2 Skriva.",
    examples: [
      { sv: "Igår jobbade jag hemma.", vi: "Hôm qua tôi làm việc ở nhà.", en: "Yesterday I worked from home." },
      { sv: "Hon ringde sin mamma.", vi: "Cô ấy đã gọi mẹ.", en: "She called her mum." },
      { sv: "Vi gick till skolan klockan åtta.", vi: "Chúng tôi đến trường lúc 8 giờ.", en: "We went to school at eight." },
    ],
  },
  {
    id: "s-biff", titleVi: "Quy tắc BIFF — 'inte' đứng TRƯỚC động từ trong mệnh đề phụ", titleEn: "BIFF rule — 'inte' BEFORE verb in subordinate clauses",
    level: "B1",
    pattern: "Bisats: [att/eftersom/...] [Subjekt] [INTE] [VERB]  ·  Huvudsats: [Subjekt] [VERB] [INTE]",
    explainVi: "Trong mệnh đề phụ (sau att/eftersom/fastän/om/när…), 'inte' phải đứng TRƯỚC động từ chia. Đây là dấu hiệu rõ nhất phân biệt B1 với A2.",
    explainEn: "In subordinate clauses (after att/eftersom/fastän/om/när…), 'inte' must come BEFORE the finite verb. This is the clearest B1-vs-A2 marker.",
    examples: [
      { sv: "Jag tror att hon inte kommer idag.", vi: "Tôi nghĩ cô ấy không đến hôm nay.", en: "I think she isn't coming today." },
      { sv: "Vi stannar hemma eftersom det inte är varmt.", vi: "Chúng tôi ở nhà vì trời không ấm.", en: "We stay home because it isn't warm." },
      { sv: "Han kommer inte idag.", vi: "Anh ấy không đến hôm nay. (mệnh đề chính)", en: "He isn't coming today. (main clause)" },
    ],
    pitfallVi: "BIFF = Bisats Inte Före Finita verbet. Học thuộc 4 chữ này!",
    pitfallEn: "BIFF = In Bisats, Inte before the Finita verb. Memorise these 4 letters!",
  },
  {
    id: "s-conn", titleVi: "Liên từ logic — kết nối ý nâng cao", titleEn: "Logical connectors — advanced cohesion",
    level: "B1",
    pattern: "..., dessutom ...  ·  ..., däremot ...  ·  ..., alltså ...  ·  trots det ...",
    explainVi: "Mỗi bài viết YKI B1 nên có ít nhất 2 liên từ logic. Giám khảo chấm điểm 'cohesion' rất cao.",
    explainEn: "Use at least 2 logical connectors per YKI B1 essay — examiners weight 'cohesion' heavily.",
    examples: [
      { sv: "Maten var god. Dessutom var den billig.", vi: "Đồ ăn ngon. Hơn nữa, lại rẻ.", en: "The food was good. Moreover, it was cheap." },
      { sv: "Han älskar sport, däremot tycker hon inte om det.", vi: "Anh mê thể thao, còn cô thì không.", en: "He loves sport; she, however, doesn't." },
      { sv: "Det regnade, alltså stannade vi hemma.", vi: "Trời mưa, vì vậy chúng tôi ở nhà.", en: "It was raining, so we stayed home." },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* Data — conversation packs                                                   */
/* -------------------------------------------------------------------------- */

interface DialogueLine {
  speaker: "A" | "B";
  sv: string;
  vi: string;
}
interface Dialogue {
  id: string;
  emoji: string;
  titleVi: string;
  titleEn: string;
  level: "A1" | "A2" | "B1";
  scenarioVi: string;
  scenarioEn: string;
  lines: DialogueLine[];
  keyPhrasesVi: string;
  keyPhrasesEn: string;
}

const DIALOGUES: Dialogue[] = [
  {
    id: "d-cafe", emoji: "☕", titleVi: "Tại quán cà phê", titleEn: "At the café", level: "A1",
    scenarioVi: "Gọi đồ uống và bánh ngọt tại quán cà phê ở Helsinki.",
    scenarioEn: "Ordering a drink and pastry at a Helsinki café.",
    lines: [
      { speaker: "A", sv: "Hej! Vad får det vara?", vi: "Chào! Cho bạn dùng gì?" },
      { speaker: "B", sv: "Hej, en kaffe och en kanelbulle, tack.", vi: "Chào, cho mình một cà phê và một bánh quế." },
      { speaker: "A", sv: "Stor eller liten kaffe?", vi: "Cà phê size lớn hay nhỏ?" },
      { speaker: "B", sv: "Liten, tack. Hur mycket kostar det?", vi: "Nhỏ thôi nhé. Tổng bao nhiêu?" },
      { speaker: "A", sv: "Det blir fem euro och femtio cent.", vi: "Hết 5 euro 50 xu." },
      { speaker: "B", sv: "Kan jag betala med kort?", vi: "Mình trả bằng thẻ được không?" },
      { speaker: "A", sv: "Självklart. Här är kvittot. Trevlig dag!", vi: "Tất nhiên. Hoá đơn của bạn đây. Chúc một ngày vui!" },
    ],
    keyPhrasesVi: "Vad får det vara? · en kaffe, tack · Kan jag betala med kort?",
    keyPhrasesEn: "Vad får det vara? · en kaffe, tack · Kan jag betala med kort?",
  },
  {
    id: "d-doctor", emoji: "🏥", titleVi: "Đặt lịch khám bác sĩ", titleEn: "Booking a doctor's appointment", level: "A2",
    scenarioVi: "Bạn gọi đến phòng khám để đặt lịch khám vì đau đầu.",
    scenarioEn: "You call the clinic to book an appointment for a headache.",
    lines: [
      { speaker: "A", sv: "Hälsocentralen, hej.", vi: "Trạm y tế xin nghe." },
      { speaker: "B", sv: "Hej, jag skulle vilja boka en tid hos en läkare.", vi: "Chào, tôi muốn đặt lịch khám bác sĩ." },
      { speaker: "A", sv: "Vad är problemet?", vi: "Bạn bị làm sao?" },
      { speaker: "B", sv: "Jag har huvudvärk och feber sedan i tisdags.", vi: "Tôi đau đầu và sốt từ thứ Ba." },
      { speaker: "A", sv: "Kan du komma imorgon klockan nio?", vi: "Bạn đến được lúc 9 giờ ngày mai không?" },
      { speaker: "B", sv: "Ja, det går bra. Tack så mycket.", vi: "Vâng được. Cảm ơn nhiều." },
      { speaker: "A", sv: "Ta med ditt FPA-kort. Vi ses imorgon.", vi: "Mang theo thẻ FPA. Hẹn gặp ngày mai." },
    ],
    keyPhrasesVi: "Jag skulle vilja boka… · Jag har ont i… · Vi ses imorgon.",
    keyPhrasesEn: "Jag skulle vilja boka… · Jag har ont i… · Vi ses imorgon.",
  },
  {
    id: "d-interview", emoji: "🎯", titleVi: "Phỏng vấn xin việc", titleEn: "Job interview", level: "B1",
    scenarioVi: "Phỏng vấn vị trí Kỹ sư Dữ liệu tại một công ty Phần Lan.",
    scenarioEn: "Interview for a Data Engineer role at a Finnish company.",
    lines: [
      { speaker: "A", sv: "Berätta lite om dig själv.", vi: "Hãy giới thiệu chút về bản thân." },
      { speaker: "B", sv: "Jag heter Lan och har fem års erfarenhet som dataingenjör.", vi: "Tôi là Lan, có 5 năm kinh nghiệm làm kỹ sư dữ liệu." },
      { speaker: "A", sv: "Varför söker du just den här tjänsten?", vi: "Vì sao bạn ứng tuyển vị trí này?" },
      { speaker: "B", sv: "Eftersom ert företag arbetar med förnybar energi, vilket jag brinner för.", vi: "Vì công ty làm về năng lượng tái tạo — lĩnh vực tôi đam mê." },
      { speaker: "A", sv: "Vad är dina styrkor?", vi: "Điểm mạnh của bạn?" },
      { speaker: "B", sv: "Mina styrkor är problemlösning och samarbete. Dessutom trivs jag i team.", vi: "Điểm mạnh là giải quyết vấn đề và làm việc nhóm. Hơn nữa tôi hợp với teamwork." },
      { speaker: "A", sv: "När kan du börja?", vi: "Khi nào bạn có thể bắt đầu?" },
      { speaker: "B", sv: "Jag kan börja efter en månads uppsägningstid.", vi: "Tôi có thể bắt đầu sau 1 tháng báo trước." },
    ],
    keyPhrasesVi: "Berätta om dig själv · Mina styrkor är… · eftersom…, dessutom…",
    keyPhrasesEn: "Berätta om dig själv · Mina styrkor är… · eftersom…, dessutom…",
  },
];

/* -------------------------------------------------------------------------- */
/* UI                                                                          */
/* -------------------------------------------------------------------------- */

const LevelBadge = ({ level }: { level: "A1" | "A2" | "B1" }) => {
  const color =
    level === "A1"
      ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30"
      : level === "A2"
      ? "bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-500/30"
      : "bg-violet-500/15 text-violet-700 dark:text-violet-300 border-violet-500/30";
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-bold ${color}`}>
      YKI {level === "A1" ? "1" : level === "A2" ? "2" : "3"} · {level}
    </span>
  );
};

const SpeakButton = ({ text, label }: { text: string; label?: string }) => (
  <Button
    size="sm"
    variant="ghost"
    onClick={() => speakSwedish(text)}
    className="h-7 gap-1 px-2 text-xs text-primary hover:text-primary hover:bg-primary/10"
    aria-label={`Speak ${label ?? text}`}
  >
    <Volume2 className="h-3.5 w-3.5" />
    {label ?? "Nghe"}
  </Button>
);

const SwedishInteractiveCurriculum = () => {
  const { t, lang } = useLanguage();
  const [query, setQuery] = useState("");

  const filteredVocab = useMemo(() => {
    if (!query.trim()) return VOCAB;
    const q = query.toLowerCase();
    return VOCAB.map((topic) => ({
      ...topic,
      words: topic.words.filter(
        (w) =>
          w.sv.toLowerCase().includes(q) ||
          w.vi.toLowerCase().includes(q) ||
          w.en.toLowerCase().includes(q)
      ),
    })).filter((topic) => topic.words.length > 0);
  }, [query]);

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-background">
      <FloatingNordicParticles variant="swedish" />
      <SEO
        title="Interactive Curriculum — Học Tiếng Thụy Điển | HaiEduTech"
        description="Luyện từ vựng, cấu trúc câu và hội thoại tiếng Thụy Điển có audio. Tổ chức theo YKI A1, A2, B1 — phù hợp người Việt định cư Phần Lan."
        path="/swedish/curriculum"
      />
      <Navbar />
      <main className="pt-24 lg:pt-28 pb-12">
        <SwedishHeroBanner pickKey="SwedishInteractiveCurriculum" compact />
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <Link to="/swedish" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-4">
            <ArrowLeft className="h-4 w-4" />
            {t("Quay lại Tổng quan Thụy Điển", "Back to Swedish Overview")}
          </Link>

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-emerald-500/10 via-sky-500/10 to-violet-500/10 p-6 md:p-8 mb-6">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-gradient-to-br from-emerald-500 to-sky-500 p-3 text-white shadow-md">
                  <Sparkles className="h-6 w-6" />
                </div>
                <div className="min-w-0">
                  <Badge className="mb-2 bg-primary/15 text-primary hover:bg-primary/20">
                    {t("Interactive Curriculum", "Interactive Curriculum")}
                  </Badge>
                  <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                    {t(
                      "Interactive Curriculum — Học Tiếng Thụy Điển",
                      "Interactive Swedish Curriculum"
                    )}
                  </h1>
                  <p className="mt-2 text-sm md:text-base text-muted-foreground leading-relaxed">
                    {t(
                      "Luyện từ vựng theo chủ đề, nắm cấu trúc câu cốt lõi và thực hành hội thoại có audio — tất cả tổ chức theo khung YKI A1 → B1.",
                      "Drill themed vocabulary, master core sentence structures, and practise audio dialogues — all organised by the YKI A1 → B1 framework."
                    )}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tabs */}
          <Tabs defaultValue="vocab" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6 h-auto">
              <TabsTrigger value="vocab" className="flex-col gap-1 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <BookOpen className="h-4 w-4" />
                <span className="text-xs sm:text-sm font-semibold">{t("Từ vựng", "Vocabulary")}</span>
              </TabsTrigger>
              <TabsTrigger value="structure" className="flex-col gap-1 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Wrench className="h-4 w-4" />
                <span className="text-xs sm:text-sm font-semibold">{t("Cấu trúc câu", "Structures")}</span>
              </TabsTrigger>
              <TabsTrigger value="convo" className="flex-col gap-1 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <MessageCircle className="h-4 w-4" />
                <span className="text-xs sm:text-sm font-semibold">{t("Hội thoại", "Dialogues")}</span>
              </TabsTrigger>
            </TabsList>

            {/* VOCAB */}
            <TabsContent value="vocab" className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t("Tìm từ tiếng Thụy Điển / tiếng Việt / English…", "Search Swedish / Vietnamese / English…")}
                  className="pl-9"
                />
              </div>

              {filteredVocab.length === 0 && (
                <p className="text-center text-sm text-muted-foreground py-8">
                  {t("Không tìm thấy từ phù hợp.", "No matching words.")}
                </p>
              )}

              <Accordion type="multiple" defaultValue={filteredVocab.slice(0, 1).map((t) => t.id)} className="space-y-3">
                {filteredVocab.map((topic) => (
                  <AccordionItem key={topic.id} value={topic.id} className="rounded-xl border border-border bg-card overflow-hidden">
                    <AccordionTrigger className="px-4 py-3 hover:no-underline">
                      <div className="flex items-center gap-3 text-left">
                        <span className="text-2xl">{topic.emoji}</span>
                        <div>
                          <div className="font-semibold text-foreground">{t(topic.titleVi, topic.titleEn)}</div>
                          <div className="mt-1 flex items-center gap-2">
                            <LevelBadge level={topic.level} />
                            <span className="text-xs text-muted-foreground">{topic.words.length} {t("từ", "words")}</span>
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="overflow-x-auto">
                        <table className="w-full min-w-[600px] text-sm">
                          <thead>
                            <tr className="border-b border-border text-left text-xs uppercase text-muted-foreground">
                              <th className="py-2 pr-3 font-semibold">Svenska</th>
                              <th className="py-2 pr-3 font-semibold">{lang === "vi" ? "Tiếng Việt" : "English"}</th>
                              <th className="py-2 pr-3 font-semibold">{t("Ví dụ", "Example")}</th>
                              <th className="py-2 font-semibold text-right">{t("Nghe", "Audio")}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {topic.words.map((w, i) => (
                              <tr key={i} className="border-b border-border/40 last:border-0">
                                <td className="py-2 pr-3 font-semibold text-primary">{w.sv}</td>
                                <td className="py-2 pr-3 text-foreground/90">{t(w.vi, w.en)}</td>
                                <td className="py-2 pr-3 text-foreground/80">
                                  <div className="italic">"{w.example}"</div>
                                  <div className="text-xs text-muted-foreground mt-0.5">{t(w.exampleVi, w.example)}</div>
                                </td>
                                <td className="py-2 text-right">
                                  <SpeakButton text={w.example} label={t("Phát", "Play")} />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>

            {/* STRUCTURES */}
            <TabsContent value="structure" className="space-y-4">
              {STRUCTURES.map((s) => (
                <Card key={s.id} className="border-border/60">
                  <CardHeader className="pb-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <LevelBadge level={s.level} />
                      <CardTitle className="text-lg md:text-xl">{t(s.titleVi, s.titleEn)}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="rounded-lg bg-muted/60 px-3 py-2 font-mono text-xs sm:text-sm text-foreground overflow-x-auto">
                      {s.pattern}
                    </div>
                    <p className="text-sm text-foreground/90 leading-relaxed">
                      {t(s.explainVi, s.explainEn)}
                    </p>
                    <div className="space-y-2">
                      {s.examples.map((ex, i) => (
                        <div key={i} className="rounded-lg border border-border/60 bg-card p-3">
                          <div className="flex items-start justify-between gap-2">
                            <div className="font-semibold text-primary flex-1 break-words">{ex.sv}</div>
                            <SpeakButton text={ex.sv} label={t("Phát", "Play")} />
                          </div>
                          <div className="mt-1 text-xs text-muted-foreground">{t(ex.vi, ex.en)}</div>
                        </div>
                      ))}
                    </div>
                    {s.pitfallVi && (
                      <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-sm">
                        <span className="font-bold text-amber-700 dark:text-amber-400">⚠️ {t("Bẫy", "Pitfall")}: </span>
                        <span className="text-foreground/90">{t(s.pitfallVi, s.pitfallEn ?? s.pitfallVi)}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* DIALOGUES */}
            <TabsContent value="convo" className="space-y-4">
              {DIALOGUES.map((d) => (
                <Card key={d.id} className="border-border/60">
                  <CardHeader className="pb-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-2xl">{d.emoji}</span>
                      <CardTitle className="text-lg md:text-xl">{t(d.titleVi, d.titleEn)}</CardTitle>
                      <LevelBadge level={d.level} />
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{t(d.scenarioVi, d.scenarioEn)}</p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-end">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          void speakSwedishSequence(d.lines.map((ln) => ln.sv));
                        }}
                        className="gap-1"
                      >
                        <Volume2 className="h-4 w-4" />
                        {t("Phát toàn bộ hội thoại", "Play full dialogue")}
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {d.lines.map((ln, i) => (
                        <div
                          key={i}
                          className={`flex gap-2 ${ln.speaker === "A" ? "justify-start" : "justify-end"}`}
                        >
                          <div
                            className={`max-w-[85%] rounded-2xl px-3 py-2 ${
                              ln.speaker === "A"
                                ? "bg-muted text-foreground rounded-tl-sm"
                                : "bg-primary/10 text-foreground rounded-tr-sm"
                            }`}
                          >
                            <div className="text-[10px] uppercase font-bold text-muted-foreground mb-1">
                              {ln.speaker === "A" ? t("Người A", "Person A") : t("Bạn (B)", "You (B)")}
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="font-semibold text-primary flex-1 break-words">{ln.sv}</div>
                              <SpeakButton text={ln.sv} label="" />
                            </div>
                            <div className="mt-1 text-xs text-muted-foreground">{ln.vi}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 rounded-lg border border-emerald-500/30 bg-emerald-500/5 px-3 py-2 text-sm">
                      <span className="font-bold text-emerald-700 dark:text-emerald-400 inline-flex items-center gap-1">
                        <CheckCircle2 className="h-4 w-4" /> {t("Cụm cần thuộc", "Key phrases")}:{" "}
                      </span>
                      <span className="text-foreground/90">{t(d.keyPhrasesVi, d.keyPhrasesEn)}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SwedishInteractiveCurriculum;
