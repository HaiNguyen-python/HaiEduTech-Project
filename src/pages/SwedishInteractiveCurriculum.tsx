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
  exampleEn: string;
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
      { sv: "mamma", vi: "mẹ", en: "mom", example: "Min mamma lagar mat.", exampleVi: "Mẹ tôi nấu ăn.", exampleEn: "My mom cooks food." },
      { sv: "pappa", vi: "bố", en: "dad", example: "Min pappa jobbar i Vasa.", exampleVi: "Bố tôi làm ở Vaasa.", exampleEn: "My dad works in Vaasa." },
      { sv: "syster", vi: "chị/em gái", en: "sister", example: "Jag har en syster.", exampleVi: "Tôi có một chị/em gái.", exampleEn: "I have a sister." },
      { sv: "bror", vi: "anh/em trai", en: "brother", example: "Min bror studerar.", exampleVi: "Anh tôi đang học.", exampleEn: "My brother studies." },
      { sv: "mormor / farmor", vi: "bà ngoại / bà nội", en: "grandma (maternal/paternal)", example: "Mormor bor i Åbo.", exampleVi: "Bà ngoại sống ở Turku.", exampleEn: "Grandma lives in Turku (Åbo)." },
      { sv: "barn", vi: "con (số ít/nhiều)", en: "child/children", example: "Vi har två barn.", exampleVi: "Chúng tôi có hai con.", exampleEn: "We have two children." },
      { sv: "man / fru", vi: "chồng / vợ", en: "husband / wife", example: "Min man heter Hai.", exampleVi: "Chồng tôi tên Hải.", exampleEn: "My husband is called Hai." },
      { sv: "släkting", vi: "họ hàng", en: "relative", example: "Mina släktingar bor i Vietnam.", exampleVi: "Họ hàng tôi sống ở Việt Nam.", exampleEn: "My relatives live in Vietnam." },
    ],
  },
  {
    id: "v-food", emoji: "🍞", titleVi: "Ẩm thực hàng ngày", titleEn: "Everyday food", level: "A1",
    words: [
      { sv: "bröd", vi: "bánh mì", en: "bread", example: "Jag äter bröd till frukost.", exampleVi: "Tôi ăn bánh mì cho bữa sáng.", exampleEn: "I eat bread for breakfast." },
      { sv: "kaffe", vi: "cà phê", en: "coffee", example: "En kopp kaffe, tack.", exampleVi: "Một ly cà phê, cảm ơn.", exampleEn: "A cup of coffee, please." },
      { sv: "mjölk", vi: "sữa", en: "milk", example: "Mjölken är kall.", exampleVi: "Sữa lạnh.", exampleEn: "The milk is cold." },
      { sv: "ost", vi: "phô mai", en: "cheese", example: "Jag älskar svensk ost.", exampleVi: "Tôi mê phô mai Thụy Điển.", exampleEn: "I love Swedish cheese." },
      { sv: "äpple", vi: "quả táo", en: "apple", example: "Ett rött äpple, tack.", exampleVi: "Một quả táo đỏ, cảm ơn.", exampleEn: "One red apple, please." },
      { sv: "kött", vi: "thịt", en: "meat", example: "Vi äter inte kött.", exampleVi: "Chúng tôi không ăn thịt.", exampleEn: "We don't eat meat." },
      { sv: "fisk", vi: "cá", en: "fish", example: "Fisken är färsk.", exampleVi: "Cá tươi lắm.", exampleEn: "The fish is fresh." },
      { sv: "frukost / lunch / middag", vi: "bữa sáng / trưa / tối", en: "breakfast / lunch / dinner", example: "Middag klockan sex.", exampleVi: "Bữa tối lúc 6 giờ.", exampleEn: "Dinner at six o'clock." },
    ],
  },
  {
    id: "v-work", emoji: "💼", titleVi: "Công sở", titleEn: "Workplace", level: "A2",
    words: [
      { sv: "möte", vi: "cuộc họp", en: "meeting", example: "Vi har möte klockan tio.", exampleVi: "Chúng ta họp lúc 10 giờ.", exampleEn: "We have a meeting at ten." },
      { sv: "chef", vi: "sếp", en: "boss", example: "Min chef är väldigt snäll.", exampleVi: "Sếp tôi rất tử tế.", exampleEn: "My boss is very kind." },
      { sv: "kollega", vi: "đồng nghiệp", en: "colleague", example: "Mina kollegor är trevliga.", exampleVi: "Đồng nghiệp tôi vui tính.", exampleEn: "My colleagues are pleasant." },
      { sv: "lön", vi: "lương", en: "salary", example: "Lönen kommer den sista.", exampleVi: "Lương trả vào ngày cuối tháng.", exampleEn: "The salary arrives on the last day of the month." },
      { sv: "semester", vi: "nghỉ phép", en: "vacation", example: "Vi har semester i juli.", exampleVi: "Chúng tôi nghỉ phép tháng 7.", exampleEn: "We are on vacation in July." },
      { sv: "deadline", vi: "hạn chót", en: "deadline", example: "Deadline är på fredag.", exampleVi: "Hạn chót là thứ Sáu.", exampleEn: "The deadline is on Friday." },
      { sv: "projekt", vi: "dự án", en: "project", example: "Projektet är klart.", exampleVi: "Dự án xong rồi.", exampleEn: "The project is done." },
      { sv: "anställning", vi: "việc làm/biên chế", en: "employment", example: "Jag fick fast anställning.", exampleVi: "Tôi được vào biên chế.", exampleEn: "I got a permanent position." },
    ],
  },
  {
    id: "v-society", emoji: "🌍", titleVi: "Xã hội & môi trường", titleEn: "Society & environment", level: "B1",
    words: [
      { sv: "klimatförändring", vi: "biến đổi khí hậu", en: "climate change", example: "Klimatförändringen påverkar oss alla.", exampleVi: "Biến đổi khí hậu ảnh hưởng tới tất cả.", exampleEn: "Climate change affects us all." },
      { sv: "förnybar energi", vi: "năng lượng tái tạo", en: "renewable energy", example: "Vindkraft är förnybar energi.", exampleVi: "Điện gió là năng lượng tái tạo.", exampleEn: "Wind power is renewable energy." },
      { sv: "integration", vi: "hội nhập", en: "integration", example: "Integration tar tid.", exampleVi: "Hội nhập cần thời gian.", exampleEn: "Integration takes time." },
      { sv: "regering", vi: "chính phủ", en: "government", example: "Regeringen tar beslut idag.", exampleVi: "Chính phủ ra quyết định hôm nay.", exampleEn: "The government makes a decision today." },
      { sv: "utbildning", vi: "giáo dục", en: "education", example: "Utbildning är viktig.", exampleVi: "Giáo dục rất quan trọng.", exampleEn: "Education is important." },
      { sv: "arbetsmarknad", vi: "thị trường lao động", en: "labour market", example: "Arbetsmarknaden behöver experter.", exampleVi: "Thị trường lao động cần chuyên gia.", exampleEn: "The labour market needs experts." },
      { sv: "låginkomsttagare", vi: "người thu nhập thấp", en: "low-income earner", example: "Stöd för låginkomsttagare.", exampleVi: "Hỗ trợ cho người thu nhập thấp.", exampleEn: "Support for low-income earners." },
      { sv: "skatt", vi: "thuế", en: "tax", example: "Skatten är hög i Norden.", exampleVi: "Thuế ở Bắc Âu cao.", exampleEn: "Taxes are high in the Nordics." },
    ],
  },
  {
    id: "v-home", emoji: "🏠", titleVi: "Nhà cửa & đồ dùng", titleEn: "Home & household", level: "A1",
    words: [
      { sv: "hus", vi: "ngôi nhà", en: "house", example: "Vårt hus är gult.", exampleVi: "Nhà chúng tôi màu vàng.", exampleEn: "Our house is yellow." },
      { sv: "lägenhet", vi: "căn hộ", en: "apartment", example: "Jag bor i en lägenhet.", exampleVi: "Tôi sống trong một căn hộ.", exampleEn: "I live in an apartment." },
      { sv: "kök", vi: "nhà bếp", en: "kitchen", example: "Köket är litet men fint.", exampleVi: "Bếp nhỏ nhưng xinh.", exampleEn: "The kitchen is small but nice." },
      { sv: "sovrum", vi: "phòng ngủ", en: "bedroom", example: "Sovrummet ligger uppe.", exampleVi: "Phòng ngủ ở tầng trên.", exampleEn: "The bedroom is upstairs." },
      { sv: "badrum", vi: "phòng tắm", en: "bathroom", example: "Badrummet är rent.", exampleVi: "Phòng tắm sạch sẽ.", exampleEn: "The bathroom is clean." },
      { sv: "bord", vi: "cái bàn", en: "table", example: "Boken ligger på bordet.", exampleVi: "Quyển sách nằm trên bàn.", exampleEn: "The book is on the table." },
      { sv: "stol", vi: "cái ghế", en: "chair", example: "Sätt dig på stolen.", exampleVi: "Ngồi xuống ghế đi.", exampleEn: "Sit down on the chair." },
      { sv: "säng", vi: "cái giường", en: "bed", example: "Sängen är bekväm.", exampleVi: "Giường êm ái.", exampleEn: "The bed is comfortable." },
    ],
  },
  {
    id: "v-transport", emoji: "🚌", titleVi: "Giao thông", titleEn: "Transport", level: "A2",
    words: [
      { sv: "buss", vi: "xe buýt", en: "bus", example: "Bussen går klockan åtta.", exampleVi: "Xe buýt chạy lúc 8 giờ.", exampleEn: "The bus leaves at eight." },
      { sv: "tåg", vi: "tàu hoả", en: "train", example: "Tåget till Stockholm är försenat.", exampleVi: "Tàu đi Stockholm bị trễ.", exampleEn: "The train to Stockholm is delayed." },
      { sv: "spårvagn", vi: "tàu điện", en: "tram", example: "Spårvagn nummer tre går till centrum.", exampleVi: "Tàu điện số 3 vào trung tâm.", exampleEn: "Tram number three goes to the centre." },
      { sv: "cykel", vi: "xe đạp", en: "bicycle", example: "Jag cyklar till jobbet.", exampleVi: "Tôi đạp xe đi làm.", exampleEn: "I bike to work." },
      { sv: "bil", vi: "xe hơi", en: "car", example: "Vi har en gammal bil.", exampleVi: "Chúng tôi có một chiếc xe cũ.", exampleEn: "We have an old car." },
      { sv: "flyg", vi: "máy bay", en: "flight", example: "Flyget landar klockan sju.", exampleVi: "Máy bay hạ cánh lúc 7 giờ.", exampleEn: "The flight lands at seven." },
      { sv: "biljett", vi: "vé", en: "ticket", example: "En biljett till Åbo, tack.", exampleVi: "Một vé đi Turku, cảm ơn.", exampleEn: "One ticket to Turku, please." },
      { sv: "hållplats", vi: "trạm dừng", en: "stop", example: "Nästa hållplats är Kampen.", exampleVi: "Trạm kế tiếp là Kamppi.", exampleEn: "The next stop is Kamppi." },
    ],
  },
  {
    id: "v-health", emoji: "🩺", titleVi: "Sức khoẻ & y tế", titleEn: "Health & healthcare", level: "A2",
    words: [
      { sv: "läkare", vi: "bác sĩ", en: "doctor", example: "Jag måste träffa en läkare.", exampleVi: "Tôi phải gặp bác sĩ.", exampleEn: "I have to see a doctor." },
      { sv: "sjuksköterska", vi: "y tá", en: "nurse", example: "Sjuksköterskan hjälpte mig.", exampleVi: "Y tá đã giúp tôi.", exampleEn: "The nurse helped me." },
      { sv: "medicin", vi: "thuốc", en: "medicine", example: "Ta medicinen efter maten.", exampleVi: "Uống thuốc sau khi ăn.", exampleEn: "Take the medicine after food." },
      { sv: "feber", vi: "sốt", en: "fever", example: "Barnet har feber.", exampleVi: "Đứa trẻ bị sốt.", exampleEn: "The child has a fever." },
      { sv: "huvudvärk", vi: "đau đầu", en: "headache", example: "Jag har huvudvärk idag.", exampleVi: "Hôm nay tôi bị đau đầu.", exampleEn: "I have a headache today." },
      { sv: "sjukhus", vi: "bệnh viện", en: "hospital", example: "Sjukhuset ligger nära.", exampleVi: "Bệnh viện ở gần.", exampleEn: "The hospital is nearby." },
      { sv: "recept", vi: "toa thuốc", en: "prescription", example: "Läkaren skrev ett recept.", exampleVi: "Bác sĩ kê toa thuốc.", exampleEn: "The doctor wrote a prescription." },
      { sv: "hälsa", vi: "sức khoẻ", en: "health", example: "Din hälsa är viktig.", exampleVi: "Sức khoẻ của bạn rất quan trọng.", exampleEn: "Your health is important." },
    ],
  },
  {
    id: "v-education", emoji: "📚", titleVi: "Học tập & trường lớp", titleEn: "Education & school", level: "B1",
    words: [
      { sv: "kurs", vi: "khoá học", en: "course", example: "Kursen börjar i september.", exampleVi: "Khoá học bắt đầu tháng 9.", exampleEn: "The course starts in September." },
      { sv: "universitet", vi: "đại học", en: "university", example: "Hon studerar vid ett universitet i Helsingfors.", exampleVi: "Cô ấy học tại một trường đại học ở Helsinki.", exampleEn: "She studies at a university in Helsinki." },
      { sv: "tenta", vi: "kỳ thi", en: "exam", example: "Jag har tenta imorgon.", exampleVi: "Ngày mai tôi thi.", exampleEn: "I have an exam tomorrow." },
      { sv: "uppsats", vi: "tiểu luận", en: "essay", example: "Uppsatsen ska vara klar på fredag.", exampleVi: "Bài tiểu luận phải xong vào thứ Sáu.", exampleEn: "The essay must be ready on Friday." },
      { sv: "föreläsning", vi: "bài giảng", en: "lecture", example: "Föreläsningen var intressant.", exampleVi: "Bài giảng thú vị.", exampleEn: "The lecture was interesting." },
      { sv: "stipendium", vi: "học bổng", en: "scholarship", example: "Jag fick ett stipendium.", exampleVi: "Tôi được học bổng.", exampleEn: "I got a scholarship." },
      { sv: "handledare", vi: "người hướng dẫn", en: "supervisor", example: "Min handledare är hjälpsam.", exampleVi: "Người hướng dẫn của tôi rất hữu ích.", exampleEn: "My supervisor is helpful." },
      { sv: "examen", vi: "bằng tốt nghiệp", en: "degree", example: "Hon tog examen ifjol.", exampleVi: "Cô ấy tốt nghiệp năm ngoái.", exampleEn: "She graduated last year." },
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
  {
    id: "s-adj-agree", titleVi: "Hoà hợp tính từ (en/ett/số nhiều)", titleEn: "Adjective agreement (en/ett/plural)",
    level: "A1",
    pattern: "en stor bil  ·  ett stort hus  ·  stora hus  ·  den stora bilen  ·  det stora huset",
    explainVi: "Tính từ đứng trước danh từ phải hoà hợp: -Ø với 'en', -t với 'ett', -a với số nhiều/xác định.",
    explainEn: "Attributive adjectives must agree: -Ø with 'en', -t with 'ett', -a with plural/definite forms.",
    examples: [
      { sv: "En stor bil står på gatan.", vi: "Một chiếc xe to đậu trên đường.", en: "A big car is parked on the street." },
      { sv: "Ett stort hus i skogen.", vi: "Một căn nhà lớn trong rừng.", en: "A big house in the forest." },
      { sv: "Stora hus är dyra.", vi: "Nhà lớn thì đắt.", en: "Big houses are expensive." },
    ],
    pitfallVi: "❌ 'Ett stor hus' — sai. Sau 'ett' phải thêm -t: 'ett stort hus'.",
    pitfallEn: "❌ 'Ett stor hus' — wrong. After 'ett' add -t: 'ett stort hus'.",
  },
  {
    id: "s-questions", titleVi: "Câu hỏi Ja/Nej và Frågeord", titleEn: "Yes/No & Wh- questions",
    level: "A1",
    pattern: "Ja/Nej: [VERB] [Subjekt] …?  ·  Wh-: [Frågeord] [VERB] [Subjekt] …?",
    explainVi: "Câu hỏi Ja/Nej đảo động từ lên đầu. Câu hỏi Wh- dùng vad, vem, var, när, varför, hur — sau đó vẫn V2.",
    explainEn: "Yes/No questions invert verb to the front. Wh-questions use vad, vem, var, när, varför, hur — verb still stays in position 2.",
    examples: [
      { sv: "Bor du i Vasa?", vi: "Bạn sống ở Vaasa à?", en: "Do you live in Vaasa?" },
      { sv: "Vad heter du?", vi: "Bạn tên gì?", en: "What is your name?" },
      { sv: "Varför lär du dig svenska?", vi: "Vì sao bạn học tiếng Thụy Điển?", en: "Why are you learning Swedish?" },
    ],
    pitfallVi: "Không dùng 'do/does' như tiếng Anh — chỉ đảo động từ chính.",
    pitfallEn: "No 'do/does' auxiliary like English — just invert the main verb.",
  },
  {
    id: "s-time", titleVi: "Chỉ thời gian với klockan / på / i / om", titleEn: "Time expressions: klockan / på / i / om",
    level: "A2",
    pattern: "klockan [X]  ·  på [dag]  ·  i [tháng/năm]  ·  om [thời lượng]",
    explainVi: "Dùng 'klockan' cho giờ, 'på' cho ngày trong tuần, 'i' cho tháng/năm, 'om' cho khoảng thời gian trong tương lai.",
    explainEn: "Use 'klockan' for clock time, 'på' for weekdays, 'i' for months/years, 'om' for a future duration.",
    examples: [
      { sv: "Vi träffas klockan sju på måndag.", vi: "Gặp nhau lúc 7 giờ thứ Hai nhé.", en: "Let's meet at seven on Monday." },
      { sv: "Jag åker till Sverige i juli.", vi: "Tôi đi Thụy Điển vào tháng 7.", en: "I'm going to Sweden in July." },
      { sv: "Tåget går om tio minuter.", vi: "Tàu chạy sau 10 phút nữa.", en: "The train leaves in ten minutes." },
    ],
  },
  {
    id: "s-perfect", titleVi: "Thì hoàn thành: har + supinum", titleEn: "Perfect tense: har + supine",
    level: "A2",
    pattern: "[Subjekt] har [supinum]  ·  jobbat / bott / gjort / varit",
    explainVi: "Thì hoàn thành = har + dạng supinum (thường -at, -t hoặc -it). Diễn tả kinh nghiệm hoặc việc mới xảy ra.",
    explainEn: "Perfect = har + supine (usually -at, -t or -it). Used for experience or a recently completed action.",
    examples: [
      { sv: "Jag har bott i Finland i fem år.", vi: "Tôi đã sống ở Phần Lan 5 năm.", en: "I have lived in Finland for five years." },
      { sv: "Har du ätit lunch?", vi: "Bạn đã ăn trưa chưa?", en: "Have you eaten lunch?" },
      { sv: "Vi har aldrig varit i Lappland.", vi: "Chúng tôi chưa bao giờ đến Lapland.", en: "We have never been to Lapland." },
    ],
    pitfallVi: "Supinum khác với particip. 'jobbad' (particip) ≠ 'jobbat' (supinum).",
    pitfallEn: "Supine differs from participle. 'jobbad' (participle) ≠ 'jobbat' (supine).",
  },
  {
    id: "s-reflexive", titleVi: "Động từ phản thân (sig)", titleEn: "Reflexive verbs (sig)",
    level: "B1",
    pattern: "[Subjekt] [VERB] [mig/dig/sig/oss/er/sig] …",
    explainVi: "Nhiều động từ Thụy Điển bắt buộc phải có đại từ phản thân: tvätta sig, klä sig, känna sig, träffas.",
    explainEn: "Many Swedish verbs require a reflexive pronoun: tvätta sig, klä sig, känna sig, träffas.",
    examples: [
      { sv: "Jag känner mig trött idag.", vi: "Hôm nay tôi thấy mệt.", en: "I feel tired today." },
      { sv: "Barnen tvättar sig innan middagen.", vi: "Bọn trẻ rửa ráy trước bữa tối.", en: "The children wash themselves before dinner." },
      { sv: "Vi träffades i Åbo förra året.", vi: "Chúng tôi gặp nhau ở Turku năm ngoái.", en: "We met in Turku last year." },
    ],
  },
  {
    id: "s-relative", titleVi: "Mệnh đề quan hệ với 'som'", titleEn: "Relative clauses with 'som'",
    level: "B1",
    pattern: "…, som [Subjekt] [VERB] …  ·  …, som [VERB] …",
    explainVi: "'Som' thay cho who/which/that. Không được lược bỏ như trong tiếng Anh. Chú ý BIFF khi có 'inte'.",
    explainEn: "'Som' replaces who/which/that. It cannot be dropped like in English. Apply BIFF if 'inte' appears.",
    examples: [
      { sv: "Boken som jag läser är intressant.", vi: "Quyển sách mà tôi đang đọc thú vị.", en: "The book that I'm reading is interesting." },
      { sv: "Jag har en vän som bor i Stockholm.", vi: "Tôi có một người bạn sống ở Stockholm.", en: "I have a friend who lives in Stockholm." },
      { sv: "Filmen som vi såg igår var fantastisk.", vi: "Bộ phim mà chúng tôi xem hôm qua tuyệt vời.", en: "The film we saw yesterday was fantastic." },
    ],
    pitfallVi: "❌ 'Boken jag läser…' — thiếu 'som'. Tiếng Thụy Điển không lược bỏ được.",
    pitfallEn: "❌ 'Boken jag läser…' — missing 'som'. Swedish never drops the relativiser.",
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
  {
    id: "d-greet", emoji: "👋", titleVi: "Chào hỏi & làm quen", titleEn: "Greetings & introductions", level: "A1",
    scenarioVi: "Hai người mới quen chào hỏi và giới thiệu tại lớp học.",
    scenarioEn: "Two new classmates greet and introduce themselves.",
    lines: [
      { speaker: "A", sv: "Hej! Vad heter du?", vi: "Chào! Bạn tên gì?" },
      { speaker: "B", sv: "Hej, jag heter Lan. Och du?", vi: "Chào, mình là Lan. Còn bạn?" },
      { speaker: "A", sv: "Jag heter Erik. Trevligt att träffas.", vi: "Mình là Erik. Rất vui được gặp bạn." },
      { speaker: "B", sv: "Detsamma! Var kommer du ifrån?", vi: "Cũng vậy! Bạn đến từ đâu?" },
      { speaker: "A", sv: "Jag kommer från Vasa. Och du då?", vi: "Mình từ Vaasa. Còn bạn?" },
      { speaker: "B", sv: "Jag kommer från Vietnam men bor i Åbo nu.", vi: "Mình từ Việt Nam nhưng giờ sống ở Turku." },
    ],
    keyPhrasesVi: "Vad heter du? · Var kommer du ifrån? · Trevligt att träffas.",
    keyPhrasesEn: "Vad heter du? · Var kommer du ifrån? · Trevligt att träffas.",
  },
  {
    id: "d-shop", emoji: "🛒", titleVi: "Mua sắm ở siêu thị", titleEn: "Grocery shopping", level: "A1",
    scenarioVi: "Bạn hỏi nhân viên K-market về giá và vị trí hàng hoá.",
    scenarioEn: "You ask a K-market clerk about prices and product locations.",
    lines: [
      { speaker: "B", sv: "Ursäkta, var hittar jag mjölk?", vi: "Xin lỗi, sữa ở đâu ạ?" },
      { speaker: "A", sv: "Mjölken finns i kylen längst bak.", vi: "Sữa ở tủ mát phía cuối." },
      { speaker: "B", sv: "Tack! Vad kostar bröd?", vi: "Cảm ơn! Bánh mì bao nhiêu?" },
      { speaker: "A", sv: "Ett bröd kostar två euro.", vi: "Một ổ 2 euro." },
      { speaker: "B", sv: "Har ni ekologiska ägg?", vi: "Có trứng hữu cơ không ạ?" },
      { speaker: "A", sv: "Ja, de står bredvid mjölken.", vi: "Có, nằm cạnh sữa." },
      { speaker: "B", sv: "Tack så mycket!", vi: "Cảm ơn nhiều!" },
    ],
    keyPhrasesVi: "Var hittar jag…? · Vad kostar…? · Har ni…?",
    keyPhrasesEn: "Var hittar jag…? · Vad kostar…? · Har ni…?",
  },
  {
    id: "d-directions", emoji: "🗺️", titleVi: "Hỏi đường", titleEn: "Asking for directions", level: "A2",
    scenarioVi: "Bạn hỏi đường đến ga xe lửa ở trung tâm Helsinki.",
    scenarioEn: "You ask for directions to Helsinki central station.",
    lines: [
      { speaker: "B", sv: "Ursäkta, hur kommer jag till järnvägsstationen?", vi: "Xin lỗi, đi ga xe lửa thế nào ạ?" },
      { speaker: "A", sv: "Gå rakt fram två kvarter och sväng vänster.", vi: "Đi thẳng hai dãy nhà rồi rẽ trái." },
      { speaker: "B", sv: "Är det långt härifrån?", vi: "Có xa không ạ?" },
      { speaker: "A", sv: "Nej, det tar cirka tio minuter till fots.", vi: "Không, đi bộ chừng 10 phút." },
      { speaker: "B", sv: "Finns det en spårvagn dit också?", vi: "Có tàu điện đến đó không?" },
      { speaker: "A", sv: "Ja, spårvagn nummer sex stannar precis där.", vi: "Có, tàu số 6 dừng ngay đó." },
      { speaker: "B", sv: "Tack för hjälpen!", vi: "Cảm ơn vì đã giúp!" },
    ],
    keyPhrasesVi: "Hur kommer jag till…? · rakt fram · sväng vänster/höger",
    keyPhrasesEn: "Hur kommer jag till…? · rakt fram · sväng vänster/höger",
  },
  {
    id: "d-restaurant", emoji: "🍽️", titleVi: "Gọi món ở nhà hàng", titleEn: "Ordering at a restaurant", level: "A2",
    scenarioVi: "Hai người bạn gọi món tối tại một nhà hàng ở Turku.",
    scenarioEn: "Two friends order dinner at a Turku restaurant.",
    lines: [
      { speaker: "A", sv: "Välkomna! Har ni bokat bord?", vi: "Chào mừng! Anh chị có đặt bàn không?" },
      { speaker: "B", sv: "Ja, ett bord för två i namnet Lan.", vi: "Có, bàn hai người tên Lan." },
      { speaker: "A", sv: "Perfekt. Här är menyn. Vill ni beställa något att dricka?", vi: "Tuyệt. Menu đây. Anh chị uống gì trước?" },
      { speaker: "B", sv: "Två glas vatten, tack. Vad rekommenderar ni?", vi: "Hai ly nước lọc, cảm ơn. Nhà hàng gợi ý món gì?" },
      { speaker: "A", sv: "Dagens fisk är väldigt populär.", vi: "Cá của ngày rất được yêu thích." },
      { speaker: "B", sv: "Vi tar två portioner, tack.", vi: "Cho tụi tôi hai phần nhé." },
      { speaker: "A", sv: "Utmärkt val. Maten kommer strax.", vi: "Lựa chọn rất hay. Món sẽ ra ngay." },
    ],
    keyPhrasesVi: "Har ni bokat bord? · Vad rekommenderar ni? · Vi tar…",
    keyPhrasesEn: "Har ni bokat bord? · Vad rekommenderar ni? · Vi tar…",
  },
  {
    id: "d-apartment", emoji: "🔑", titleVi: "Xem thuê căn hộ", titleEn: "Viewing a rental apartment", level: "B1",
    scenarioVi: "Bạn liên hệ chủ nhà để xem một căn hộ 2 phòng ở Espoo.",
    scenarioEn: "You contact a landlord to view a two-room apartment in Espoo.",
    lines: [
      { speaker: "B", sv: "Hej, jag ringer angående lägenheten på Tapiolavägen.", vi: "Chào, tôi gọi vì căn hộ trên đường Tapiolavägen." },
      { speaker: "A", sv: "Hej! Är du intresserad av att titta på den?", vi: "Chào! Anh muốn tới xem à?" },
      { speaker: "B", sv: "Ja, vore det möjligt att komma på lördag?", vi: "Vâng, thứ Bảy này có được không ạ?" },
      { speaker: "A", sv: "Absolut. Klockan fjorton passar det?", vi: "Chắc chắn. 14 giờ tiện không?" },
      { speaker: "B", sv: "Perfekt. Ingår el och vatten i hyran?", vi: "Tuyệt. Tiền điện nước có tính vào giá thuê không?" },
      { speaker: "A", sv: "Vatten ingår, men elen betalar du separat.", vi: "Nước gồm rồi, còn điện anh trả riêng." },
      { speaker: "B", sv: "Tack för informationen. Vi ses på lördag.", vi: "Cảm ơn đã cho biết. Hẹn thứ Bảy." },
    ],
    keyPhrasesVi: "Jag ringer angående… · Ingår el och vatten? · Vore det möjligt att…?",
    keyPhrasesEn: "Jag ringer angående… · Ingår el och vatten? · Vore det möjligt att…?",
  },
  {
    id: "d-bank", emoji: "🏦", titleVi: "Mở tài khoản ngân hàng", titleEn: "Opening a bank account", level: "B1",
    scenarioVi: "Bạn đến ngân hàng ở Helsinki để mở tài khoản khi mới định cư.",
    scenarioEn: "You visit a Helsinki bank to open an account as a new resident.",
    lines: [
      { speaker: "B", sv: "Hej, jag skulle vilja öppna ett bankkonto.", vi: "Chào, tôi muốn mở một tài khoản ngân hàng." },
      { speaker: "A", sv: "Har du finskt personnummer och legitimation?", vi: "Anh có mã cá nhân Phần Lan và giấy tờ tuỳ thân không?" },
      { speaker: "B", sv: "Ja, jag har både personnummer och pass.", vi: "Có, tôi có mã cá nhân và hộ chiếu." },
      { speaker: "A", sv: "Perfekt. Vilken typ av konto vill du ha?", vi: "Tốt. Anh muốn loại tài khoản nào?" },
      { speaker: "B", sv: "Ett vanligt lönekonto med nätbank.", vi: "Tài khoản lương thông thường có ngân hàng online." },
      { speaker: "A", sv: "Vi behöver också veta din adress och arbetsgivare.", vi: "Chúng tôi cần biết địa chỉ và nơi làm việc của anh." },
      { speaker: "B", sv: "Här är hyresavtalet och anställningsbeviset.", vi: "Đây là hợp đồng thuê nhà và giấy xác nhận công việc." },
      { speaker: "A", sv: "Utmärkt. Kortet skickas hem inom en vecka.", vi: "Rất tốt. Thẻ sẽ gửi về nhà trong vòng một tuần." },
    ],
    keyPhrasesVi: "Jag skulle vilja öppna… · finskt personnummer · Kortet skickas hem…",
    keyPhrasesEn: "Jag skulle vilja öppna… · finskt personnummer · Kortet skickas hem…",
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
                                  <div className="text-xs text-muted-foreground mt-0.5">{t(w.exampleVi, w.exampleEn)}</div>
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
