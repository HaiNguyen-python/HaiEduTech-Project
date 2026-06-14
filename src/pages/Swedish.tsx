/**
 * @file Swedish.tsx
 * @description /swedish — YKI-testi ruotsi oriented learning hub (A1 → B1).
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  BookOpen,
  Headphones,
  PencilLine,
  Mic,
  Sparkles,
  Compass,
  GraduationCap,
  Briefcase,
  CheckCircle2,
  Play,
  Square,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "@/hooks/use-toast";

/* -------------------------------------------------------------------------- */
/* Types & data                                                                */
/* -------------------------------------------------------------------------- */

type YkiSkill = "read" | "listen" | "write" | "speak";

interface Example {
  sv: string;
  vi: string;
  en: string;
}

interface VocabItem {
  sv: string;
  vi: string;
  en: string;
}

interface Lesson {
  id: string;
  titleVi: string;
  titleEn: string;
  descVi: string;
  descEn: string;
  skills: YkiSkill[];
  /** Optional grammar formula displayed as monospace. */
  formula?: string;
  /** Worked examples in Swedish with VI + EN gloss. */
  examples?: Example[];
  /** Mini thematic vocabulary list. */
  vocab?: VocabItem[];
  /** Teacher Hai's strategy tip for the YKI exam. */
  tipVi?: string;
  tipEn?: string;
}

interface Tier {
  id: string;
  level: "A1" | "A2" | "B1";
  ykiLevel: 1 | 2 | 3;
  titleVi: string;
  titleEn: string;
  taglineVi: string;
  taglineEn: string;
  focusVi: string;
  focusEn: string;
  gradient: string;
  Icon: typeof Compass;
  lessons: Lesson[];
  focusCorner: { titleVi: string; titleEn: string; bullets: { vi: string; en: string; skills: YkiSkill[] }[] };
}

const SKILL_META: Record<YkiSkill, { vi: string; en: string; color: string; Icon: typeof BookOpen }> = {
  read:   { vi: "Đọc",  en: "Read",   color: "bg-blue-500/15 text-blue-600 dark:text-blue-300 border-blue-500/30",     Icon: BookOpen   },
  listen: { vi: "Nghe", en: "Listen", color: "bg-purple-500/15 text-purple-600 dark:text-purple-300 border-purple-500/30", Icon: Headphones },
  write:  { vi: "Viết", en: "Write",  color: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border-emerald-500/30", Icon: PencilLine },
  speak:  { vi: "Nói",  en: "Speak",  color: "bg-rose-500/15 text-rose-600 dark:text-rose-300 border-rose-500/30",     Icon: Mic        },
};

/* ----- Tier A1 ----- */
const A1_LESSONS: Lesson[] = [
  {
    id: "a1-pron",
    titleVi: "Phát âm chuẩn Bắc Âu",
    titleEn: "Nordic pronunciation basics",
    descVi: "Nguyên âm dài/ngắn, sj-/tj-, trọng âm hai âm tiết.",
    descEn: "Long/short vowels, sj-/tj- sounds, two-syllable stress.",
    skills: ["listen", "speak"],
    formula: "sj- ≈ /ɧ/ (hush)  ·  tj-/k(e/i) ≈ /ɕ/  ·  long vowel = double letter often missing",
    examples: [
      { sv: "sju sjuksköterskor", vi: "bảy y tá nữ", en: "seven nurses" },
      { sv: "tjugo kycklingar",   vi: "hai mươi con gà",  en: "twenty chickens" },
      { sv: "vit / vitt",          vi: "trắng (en/ett)",   en: "white (en/ett form)" },
    ],
    vocab: [
      { sv: "hej", vi: "xin chào", en: "hi" },
      { sv: "tack", vi: "cảm ơn", en: "thanks" },
      { sv: "ja / nej", vi: "có / không", en: "yes / no" },
      { sv: "förlåt", vi: "xin lỗi", en: "sorry" },
    ],
    tipVi: "Trong YKI Hörförståelse, phân biệt sj-/tj- giúp bạn nghe ra số đếm (sju/tjugo) — luyện 5 phút/ngày.",
    tipEn: "In YKI Hörförståelse, telling sj- from tj- helps you catch numbers (sju/tjugo) — 5 minutes a day.",
  },
  {
    id: "a1-self",
    titleVi: "Bản thân & gia đình",
    titleEn: "Self & family",
    descVi: "Giới thiệu tên, tuổi, nghề nghiệp, các thành viên trong gia đình.",
    descEn: "Introduce your name, age, job and family members.",
    skills: ["speak", "write"],
    formula: "Jag heter X. Jag är Y år. Jag jobbar som Z.",
    examples: [
      { sv: "Jag heter Lan och jag är 28 år.",           vi: "Tôi tên Lan và tôi 28 tuổi.",          en: "My name is Lan and I'm 28." },
      { sv: "Min mamma jobbar som sjuksköterska.",       vi: "Mẹ tôi làm y tá.",                     en: "My mother works as a nurse." },
      { sv: "Vi har en hund som heter Bella.",           vi: "Chúng tôi có một con chó tên Bella.",  en: "We have a dog called Bella." },
    ],
    vocab: [
      { sv: "mamma / pappa", vi: "mẹ / bố", en: "mom / dad" },
      { sv: "bror / syster", vi: "anh-em trai / chị-em gái", en: "brother / sister" },
      { sv: "make / fru",    vi: "chồng / vợ", en: "husband / wife" },
      { sv: "barn",          vi: "con (số ít/nhiều)", en: "child / children" },
    ],
    tipVi: "Trong Tala A1, hãy có sẵn 3 câu giới thiệu — đừng nói quá dài, phát âm rõ là đủ điểm.",
    tipEn: "In Tala A1, prepare 3 set introduction lines — keep them short, clear pronunciation scores well.",
  },
  {
    id: "a1-num",
    titleVi: "Số đếm, ngày & giờ",
    titleEn: "Numbers, dates & time",
    descVi: "Đếm 1–100, xem giờ klockan, ngày trong tuần, tháng.",
    descEn: "Count 1–100, read the clock, weekdays and months.",
    skills: ["read", "listen"],
    formula: "Klockan är [hel]. [kvart i / kvart över / halv]",
    examples: [
      { sv: "Klockan är halv nio.",         vi: "Bây giờ là 8 giờ rưỡi (8:30).", en: "It's half past eight (8:30)." },
      { sv: "Idag är det måndag den 5 maj.", vi: "Hôm nay là thứ Hai, ngày 5/5.", en: "Today is Monday, the 5th of May." },
      { sv: "Tåget går klockan sjutton.",   vi: "Tàu chạy lúc 17:00.",            en: "The train leaves at 17:00." },
    ],
    vocab: [
      { sv: "måndag–söndag", vi: "thứ 2 – Chủ nhật", en: "Mon–Sun" },
      { sv: "januari–december", vi: "tháng 1–12", en: "Jan–Dec" },
      { sv: "idag / igår / imorgon", vi: "hôm nay / hôm qua / ngày mai", en: "today / yesterday / tomorrow" },
    ],
    tipVi: "Lưu ý: 'halv nio' = 8:30 (nửa đường ĐẾN 9), không phải 9:30 — đây là bẫy phổ biến trong YKI.",
    tipEn: "Note: 'halv nio' = 8:30 (half-way TO 9), not 9:30 — a classic YKI trap.",
  },
  {
    id: "a1-greetings",
    titleVi: "Chào hỏi & lịch sự cơ bản",
    titleEn: "Greetings & basic politeness",
    descVi: "Hej, hejdå, ursäkta, varsågod — phản xạ giao tiếp đầu tiên.",
    descEn: "Hej, hejdå, ursäkta, varsågod — your first reflexes.",
    skills: ["speak", "listen"],
    examples: [
      { sv: "Hej, hur mår du? — Bra, tack. Och du?", vi: "Chào, bạn khỏe không? — Khỏe, cảm ơn. Còn bạn?", en: "Hi, how are you? — Good, thanks. And you?" },
      { sv: "Ursäkta, var ligger toaletten?",        vi: "Xin lỗi, nhà vệ sinh ở đâu?",                    en: "Excuse me, where is the toilet?" },
      { sv: "Varsågod! — Tack så mycket.",           vi: "Đây ạ! — Cảm ơn rất nhiều.",                     en: "Here you go! — Thank you very much." },
    ],
    vocab: [
      { sv: "god morgon / god kväll", vi: "chào buổi sáng / tối", en: "good morning / evening" },
      { sv: "trevligt att träffas", vi: "rất vui được gặp", en: "nice to meet you" },
      { sv: "vi ses!", vi: "hẹn gặp lại!", en: "see you!" },
    ],
    tipVi: "YKI A1 luôn có 1 câu chào hỏi mở đầu. Dùng 'Hej!' + mỉm cười — giám khảo ghi nhận thái độ tự tin.",
    tipEn: "YKI A1 always opens with a greeting. 'Hej!' + a smile signals confidence to the examiner.",
  },
  {
    id: "a1-shopping",
    titleVi: "Mua sắm cơ bản & giá tiền",
    titleEn: "Basic shopping & prices",
    descVi: "Hỏi giá, trả tiền mặt/thẻ, các đơn vị Phần Lan (euro, cent).",
    descEn: "Ask prices, pay by cash/card, Finnish units (euro, cent).",
    skills: ["listen", "speak"],
    formula: "Hur mycket kostar [det / X] ?  —  Det kostar Y euro.",
    examples: [
      { sv: "Hur mycket kostar mjölken?", vi: "Sữa giá bao nhiêu?", en: "How much does the milk cost?" },
      { sv: "Jag tar två stycken, tack.", vi: "Cho tôi hai cái, cảm ơn.", en: "I'll take two, thanks." },
      { sv: "Kan jag betala med kort?",    vi: "Tôi trả bằng thẻ được không?", en: "Can I pay by card?" },
    ],
    vocab: [
      { sv: "kvitto",       vi: "hoá đơn",    en: "receipt" },
      { sv: "rabatt",       vi: "giảm giá",   en: "discount" },
      { sv: "kassa",        vi: "quầy thu ngân", en: "checkout" },
      { sv: "påse",         vi: "túi",        en: "bag" },
    ],
    tipVi: "Học thuộc 'Kan jag få…?' (Tôi xin…) — dùng được ở quán cà phê, siêu thị, nhà hàng YKI A1/A2.",
    tipEn: "Memorise 'Kan jag få…?' (May I have…) — works in cafés, shops, restaurants across YKI A1/A2.",
  },
  {
    id: "a1-directions",
    titleVi: "Hỏi đường & phương tiện công cộng",
    titleEn: "Asking directions & public transport",
    descVi: "Hỏi đường, hiểu hướng dẫn cơ bản, mua vé.",
    descEn: "Ask directions, follow simple instructions, buy a ticket.",
    skills: ["listen", "read"],
    examples: [
      { sv: "Hur kommer jag till centrum?", vi: "Tôi đi vào trung tâm bằng cách nào?", en: "How do I get to the centre?" },
      { sv: "Ta buss nummer fyra.",          vi: "Bắt xe buýt số 4.",                  en: "Take bus number four." },
      { sv: "En enkel biljett, tack.",       vi: "Một vé một chiều, cảm ơn.",          en: "A single ticket, please." },
    ],
    vocab: [
      { sv: "till höger / vänster", vi: "rẽ phải / trái", en: "to the right / left" },
      { sv: "rakt fram",            vi: "đi thẳng",       en: "straight ahead" },
      { sv: "tunnelbana / spårvagn", vi: "tàu điện ngầm / tram", en: "metro / tram" },
      { sv: "hållplats",            vi: "trạm dừng",      en: "stop" },
    ],
    tipVi: "Trong Hörförståelse A1 hay xuất hiện thông báo HSL (Helsinki). Học sẵn 'nästa station' = ga kế tiếp.",
    tipEn: "HSL (Helsinki) announcements show up in A1 Hörförståelse. Memorise 'nästa station' = next stop.",
  },
];

/* ----- Tier A2 ----- */
const A2_LESSONS: Lesson[] = [
  {
    id: "a2-v2",
    titleVi: "Trật tự từ V2 & đảo ngữ",
    titleEn: "V2 word order & inversion",
    descVi: "Quy tắc V2 — động từ luôn đứng thứ hai, kể cả khi câu mở đầu bằng trạng từ.",
    descEn: "The V2 rule — the finite verb is always second, even when the sentence starts with an adverb.",
    skills: ["write", "read"],
    formula: "[Subjekt] [Verb] [resten]   ·   [Adverb], [Verb] [Subjekt] [resten]",
    examples: [
      { sv: "Jag dricker kaffe på morgonen.", vi: "Tôi uống cà phê vào buổi sáng.", en: "I drink coffee in the morning." },
      { sv: "På morgonen dricker jag kaffe.", vi: "Buổi sáng tôi uống cà phê. (đảo ngữ)", en: "In the morning I drink coffee. (inversion)" },
      { sv: "Igår åkte vi till Stockholm.",   vi: "Hôm qua chúng tôi đi Stockholm.", en: "Yesterday we went to Stockholm." },
    ],
    tipVi: "Lỗi V2 là lỗi #1 của thí sinh YKI A2 Skriva. Luôn check: động từ có ở vị trí 2 chưa?",
    tipEn: "Breaking V2 is the #1 mistake on YKI A2 Skriva. Always check: is the verb in position 2?",
  },
  {
    id: "a2-enett",
    titleVi: "Danh từ En/Ett & dạng xác định",
    titleEn: "En/Ett nouns & definite forms",
    descVi: "Phân biệt giống en/ett, dạng xác định số ít và số nhiều.",
    descEn: "Tell en/ett genders apart, definite singular and plural forms.",
    skills: ["read", "write"],
    formula: "en bok → boken → böcker → böckerna  ·  ett hus → huset → hus → husen",
    examples: [
      { sv: "Jag läser en bok. Boken är spännande.", vi: "Tôi đang đọc một cuốn sách. Cuốn sách rất hấp dẫn.", en: "I'm reading a book. The book is exciting." },
      { sv: "Vi har ett hus i Esbo.",                vi: "Chúng tôi có một căn nhà ở Espoo.",                  en: "We have a house in Espoo." },
      { sv: "Barnen leker i parken.",                vi: "Bọn trẻ đang chơi trong công viên.",                  en: "The children are playing in the park." },
    ],
    vocab: [
      { sv: "en stol → stolen", vi: "ghế (en)", en: "a chair → the chair" },
      { sv: "ett bord → bordet", vi: "bàn (ett)", en: "a table → the table" },
      { sv: "en bil → bilen", vi: "xe hơi (en)", en: "a car → the car" },
      { sv: "ett äpple → äpplet", vi: "quả táo (ett)", en: "an apple → the apple" },
    ],
    tipVi: "~75% danh từ là 'en'. Khi không chắc, đoán 'en' sẽ thắng nhiều hơn.",
    tipEn: "~75% of nouns are 'en'. When unsure, guess 'en' — you'll win more often.",
  },
  {
    id: "a2-tense",
    titleVi: "Thì Hiện tại & Quá khứ (Preteritum)",
    titleEn: "Present & past tense (Preteritum)",
    descVi: "4 nhóm động từ, đuôi -ar/-er/-r/-de/-te, các động từ bất quy tắc thông dụng.",
    descEn: "Four verb groups with -ar/-er/-r/-de/-te endings, plus common irregulars.",
    skills: ["write", "speak"],
    formula: "Grupp 1: jobba → jobbade  ·  Grupp 2: ringa → ringde  ·  Grupp 4 oregelbundna: gå → gick",
    examples: [
      { sv: "Igår jobbade jag hemma.",       vi: "Hôm qua tôi làm việc ở nhà.",       en: "Yesterday I worked from home." },
      { sv: "Hon ringde sin mamma.",         vi: "Cô ấy đã gọi mẹ.",                  en: "She called her mum." },
      { sv: "Vi gick till skolan klockan åtta.", vi: "Chúng tôi đến trường lúc 8 giờ.", en: "We went to school at eight." },
    ],
    vocab: [
      { sv: "vara → var",   vi: "là/ở → đã",  en: "to be → was/were" },
      { sv: "ha → hade",     vi: "có → đã có", en: "to have → had" },
      { sv: "se → såg",      vi: "thấy → đã thấy", en: "to see → saw" },
      { sv: "göra → gjorde", vi: "làm → đã làm", en: "to do → did" },
    ],
    tipVi: "YKI A2 Skriva luôn cần ít nhất 2 câu quá khứ. Học thuộc 6 động từ bất quy tắc là đủ.",
    tipEn: "YKI A2 Skriva needs at least 2 past-tense sentences. Memorising 6 irregulars covers most cases.",
  },
  {
    id: "a2-email",
    titleVi: "Viết email & tin nhắn ngắn",
    titleEn: "Writing emails & short messages",
    descVi: "Mở đầu, thân bài, kết, cách dùng 'du / Ni' phù hợp.",
    descEn: "Opening, body, closing — using 'du / Ni' appropriately.",
    skills: ["write", "read"],
    formula: "Hej [Namn], … Med vänliga hälsningar, [Du]",
    examples: [
      { sv: "Hej Anna, jag kan tyvärr inte komma på mötet imorgon.", vi: "Chào Anna, tiếc là mình không thể tham gia họp ngày mai.", en: "Hi Anna, unfortunately I can't make tomorrow's meeting." },
      { sv: "Kan vi flytta tiden till fredag?",                       vi: "Mình dời sang thứ Sáu được không?",                        en: "Can we move the time to Friday?" },
      { sv: "Med vänliga hälsningar, Lan",                            vi: "Trân trọng, Lan",                                          en: "Best regards, Lan" },
    ],
    vocab: [
      { sv: "tack på förhand", vi: "cảm ơn trước", en: "thanks in advance" },
      { sv: "tyvärr",          vi: "tiếc là",       en: "unfortunately" },
      { sv: "bifoga",          vi: "đính kèm",      en: "to attach" },
      { sv: "svara senast",    vi: "phản hồi trước", en: "reply by" },
    ],
    tipVi: "Email YKI A2 luôn cần: lời chào + lý do + đề xuất + lời cảm ơn. Thiếu 1 phần = mất điểm cấu trúc.",
    tipEn: "A YKI A2 email needs greeting + reason + suggestion + thanks. Missing any one = structure points lost.",
  },
  {
    id: "a2-modal",
    titleVi: "Động từ khuyết thiếu (kan, vill, ska, måste)",
    titleEn: "Modal verbs (kan, vill, ska, måste)",
    descVi: "Diễn đạt khả năng, mong muốn, kế hoạch, nghĩa vụ.",
    descEn: "Express ability, want, plan, obligation.",
    skills: ["speak", "write"],
    formula: "[Subjekt] + [modal] + [verb ở dạng nguyên thể, KHÔNG 'att']",
    examples: [
      { sv: "Jag kan prata lite svenska.",      vi: "Tôi có thể nói chút tiếng Thụy Điển.", en: "I can speak a little Swedish." },
      { sv: "Vi vill resa till Lappland.",       vi: "Chúng tôi muốn đi Lapland.",           en: "We want to travel to Lapland." },
      { sv: "Du måste fylla i blanketten.",      vi: "Bạn phải điền vào mẫu này.",           en: "You must fill in the form." },
    ],
    tipVi: "Modal + động từ nguyên thể KHÔNG có 'att'. Sai 'att' là dấu hiệu A1 chứ không phải A2.",
    tipEn: "Modal + bare infinitive, NEVER 'att'. Using 'att' here signals A1 instead of A2.",
  },
  {
    id: "a2-work",
    titleVi: "Công sở cơ bản & nói chuyện đồng nghiệp",
    titleEn: "Basic workplace talk",
    descVi: "Báo nghỉ, đặt lịch họp, hỏi đồng nghiệp, giới thiệu công việc.",
    descEn: "Calling in sick, booking meetings, chatting with colleagues, describing your job.",
    skills: ["speak", "write"],
    examples: [
      { sv: "Jag är sjuk idag och kommer inte till jobbet.", vi: "Hôm nay tôi ốm, không đi làm được.", en: "I'm sick today and won't come to work." },
      { sv: "Kan vi boka ett möte på torsdag klockan tio?",  vi: "Mình đặt họp thứ Năm 10 giờ nhé?",  en: "Can we book a meeting on Thursday at ten?" },
      { sv: "Jag jobbar som lärare på en grundskola.",        vi: "Tôi làm giáo viên trường tiểu học.", en: "I work as a teacher at a primary school." },
    ],
    vocab: [
      { sv: "kollega",     vi: "đồng nghiệp", en: "colleague" },
      { sv: "chef",        vi: "sếp",         en: "boss" },
      { sv: "lön",         vi: "lương",       en: "salary" },
      { sv: "semester",    vi: "kỳ nghỉ phép", en: "holiday/leave" },
    ],
    tipVi: "Trong Tala A2 'beskriv ditt jobb' (mô tả công việc) là câu hỏi gần như chắc chắn — chuẩn bị 4 câu.",
    tipEn: "In Tala A2, 'describe your job' is almost guaranteed — prepare 4 set sentences.",
  },
  {
    id: "a2-health",
    titleVi: "Sức khỏe & đi khám bác sĩ",
    titleEn: "Health & visiting the doctor",
    descVi: "Mô tả triệu chứng, đặt lịch khám, hiểu chỉ dẫn dùng thuốc.",
    descEn: "Describe symptoms, book an appointment, understand medicine instructions.",
    skills: ["listen", "speak"],
    examples: [
      { sv: "Jag har ont i magen sedan igår.",         vi: "Tôi đau bụng từ hôm qua.",          en: "I've had stomach pain since yesterday." },
      { sv: "Jag skulle vilja boka en tid hos läkaren.", vi: "Tôi muốn đặt lịch khám bác sĩ.",   en: "I'd like to book a doctor's appointment." },
      { sv: "Ta en tablett tre gånger om dagen.",       vi: "Uống 1 viên, 3 lần một ngày.",      en: "Take one tablet three times a day." },
    ],
    vocab: [
      { sv: "feber",     vi: "sốt",        en: "fever" },
      { sv: "huvudvärk", vi: "đau đầu",    en: "headache" },
      { sv: "recept",    vi: "đơn thuốc",  en: "prescription" },
      { sv: "apotek",    vi: "nhà thuốc",  en: "pharmacy" },
    ],
    tipVi: "'Jag har ont i + [bộ phận]' = công thức vạn năng. Học thuộc 6 bộ phận cơ thể là đủ cho YKI A2.",
    tipEn: "'Jag har ont i + [body part]' is the universal pattern. Six body-part words cover most YKI A2 cases.",
  },
];

/* ----- Tier B1 ----- */
const B1_LESSONS: Lesson[] = [
  {
    id: "b1-sub",
    titleVi: "Mệnh đề phụ nâng cao (Bisatser)",
    titleEn: "Advanced subordinate clauses",
    descVi: "Mệnh đề với att, eftersom, fastän, om — trạng từ inte đứng TRƯỚC động từ.",
    descEn: "Clauses with att, eftersom, fastän, om — adverb 'inte' goes BEFORE the verb.",
    skills: ["write", "read"],
    formula: "BIFF: I Bisats kommer Inte Före Finita verbet  →  …att jag inte vet.",
    examples: [
      { sv: "Jag tror att hon inte kommer idag.",            vi: "Tôi nghĩ là cô ấy không đến hôm nay.",          en: "I think she isn't coming today." },
      { sv: "Vi stannar hemma eftersom det regnar.",          vi: "Chúng tôi ở nhà vì trời đang mưa.",             en: "We're staying home because it's raining." },
      { sv: "Fastän han är trött, fortsätter han att jobba.", vi: "Mặc dù anh ấy mệt, anh vẫn tiếp tục làm việc.", en: "Although he is tired, he keeps working." },
    ],
    tipVi: "Nhớ BIFF: trong bisats, 'inte' đứng TRƯỚC động từ. Đây là dấu hiệu rõ nhất của B1 vs A2.",
    tipEn: "Remember BIFF: in subordinate clauses, 'inte' goes BEFORE the verb. This is the clearest B1 vs A2 marker.",
  },
  {
    id: "b1-inv",
    titleVi: "Câu đảo ngữ & liên kết logic",
    titleEn: "Inversion & logical connectors",
    descVi: "Liên từ däremot, dessutom, alltså, trots det — nối ý mượt mà.",
    descEn: "Connectors däremot, dessutom, alltså, trots det — smooth idea flow.",
    skills: ["write", "speak"],
    examples: [
      { sv: "Maten var god. Dessutom var den billig.",       vi: "Đồ ăn ngon. Hơn nữa, lại rẻ.",                 en: "The food was good. Moreover, it was cheap." },
      { sv: "Han älskar sport, däremot tycker hon inte om det.", vi: "Anh ấy mê thể thao, trái lại cô ấy không thích.", en: "He loves sport; she, on the other hand, doesn't." },
      { sv: "Det regnade, alltså stannade vi hemma.",         vi: "Trời mưa, vì vậy chúng tôi ở nhà.",            en: "It was raining, so we stayed home." },
    ],
    vocab: [
      { sv: "däremot",   vi: "trái lại",    en: "on the other hand" },
      { sv: "dessutom",  vi: "hơn nữa",     en: "moreover" },
      { sv: "alltså",    vi: "vì vậy",      en: "therefore" },
      { sv: "trots det", vi: "dù vậy",      en: "despite that" },
    ],
    tipVi: "Dùng ít nhất 2 liên từ trong bài viết YKI B1 — giám khảo chấm điểm 'cohesion' rất cao.",
    tipEn: "Use at least 2 connectors in YKI B1 writing — examiners weight 'cohesion' heavily.",
  },
  {
    id: "b1-vocab",
    titleVi: "Từ vựng chuyên đề: Môi trường, Giáo dục, Việc làm",
    titleEn: "Themed vocab: Environment, Education, Work",
    descVi: "Cụm từ thường xuất hiện trong báo Hufvudstadsbladet và Yle.",
    descEn: "Phrases that recur in Hufvudstadsbladet and Yle articles.",
    skills: ["read", "listen"],
    vocab: [
      { sv: "klimatförändring", vi: "biến đổi khí hậu", en: "climate change" },
      { sv: "förnybar energi",  vi: "năng lượng tái tạo", en: "renewable energy" },
      { sv: "utbildning",       vi: "giáo dục",          en: "education" },
      { sv: "arbetsmarknad",    vi: "thị trường lao động", en: "labour market" },
      { sv: "anställning",      vi: "việc làm/biên chế", en: "employment" },
      { sv: "integration",      vi: "hội nhập",          en: "integration" },
    ],
    examples: [
      { sv: "Klimatförändringen påverkar Östersjön.", vi: "Biến đổi khí hậu tác động đến biển Baltic.", en: "Climate change affects the Baltic Sea." },
      { sv: "Den finska arbetsmarknaden behöver kunniga invandrare.", vi: "Thị trường lao động Phần Lan cần người nhập cư có tay nghề.", en: "The Finnish labour market needs skilled immigrants." },
    ],
    tipVi: "Mỗi tuần đọc 1 bài Yle text-TV và highlight 5 từ mới — sau 2 tháng bạn đã đủ vốn từ YKI B1.",
    tipEn: "Read one Yle text-TV article weekly and highlight 5 new words — in 2 months you'll have B1 vocabulary.",
  },
  {
    id: "b1-opinion",
    titleVi: "Viết thư kiến nghị / Opinion letter",
    titleEn: "Opinion / feedback letters",
    descVi: "Cấu trúc 4 đoạn: chào — lý do viết — quan điểm có lập luận — kết.",
    descEn: "Four-paragraph structure: greeting — reason — argued opinion — closing.",
    skills: ["write"],
    formula: "1) Hej [Redaktion] 2) Jag skriver för att… 3) Jag tycker att…, eftersom… 4) Med vänliga hälsningar",
    examples: [
      { sv: "Jag skriver för att uttrycka min åsikt om kollektivtrafiken i Helsingfors.", vi: "Tôi viết để bày tỏ ý kiến về giao thông công cộng tại Helsinki.", en: "I'm writing to express my opinion about public transport in Helsinki." },
      { sv: "Jag tycker att biljettpriserna är för höga, eftersom många familjer har låg inkomst.", vi: "Tôi cho rằng giá vé quá cao vì nhiều gia đình thu nhập thấp.", en: "I think ticket prices are too high because many families have low incomes." },
      { sv: "Därför föreslår jag att HSL inför familjerabatt.", vi: "Vì vậy tôi đề nghị HSL áp dụng giảm giá gia đình.", en: "Therefore I suggest HSL introduce a family discount." },
    ],
    tipVi: "Công thức điểm cao YKI B1: 1 quan điểm + 2 lý do + 1 đề xuất + 1 ví dụ cá nhân.",
    tipEn: "High-score formula on YKI B1: 1 opinion + 2 reasons + 1 suggestion + 1 personal example.",
  },
  {
    id: "b1-news",
    titleVi: "Đọc hiểu báo chí (Yle, Hbl)",
    titleEn: "Reading news (Yle, Hbl)",
    descVi: "Kỹ thuật scan — skim — kéo chi tiết, đoán nghĩa từ ngữ cảnh.",
    descEn: "Scan — skim — locate details, guess meaning from context.",
    skills: ["read"],
    examples: [
      { sv: "Enligt en ny rapport ökar elpriserna i Finland med 8 procent.", vi: "Theo báo cáo mới, giá điện ở Phần Lan tăng 8%.", en: "According to a new report, electricity prices in Finland rise by 8%." },
      { sv: "Regeringen planerar att stödja låginkomsttagare.",              vi: "Chính phủ dự định hỗ trợ nhóm thu nhập thấp.",    en: "The government plans to support low-income earners." },
    ],
    vocab: [
      { sv: "enligt",            vi: "theo",       en: "according to" },
      { sv: "öka / minska",      vi: "tăng / giảm", en: "to increase / decrease" },
      { sv: "regering",          vi: "chính phủ",  en: "government" },
      { sv: "låginkomsttagare",  vi: "người thu nhập thấp", en: "low-income earner" },
    ],
    tipVi: "YKI B1 Läsförståelse: ĐỪNG dịch từng từ. Đọc tiêu đề + đoạn 1 + đoạn cuối trước khi xem câu hỏi.",
    tipEn: "YKI B1 Läsförståelse: do NOT translate word-by-word. Read the title + first + last paragraph before the questions.",
  },
  {
    id: "b1-discuss",
    titleVi: "Thảo luận chủ đề xã hội Phần Lan",
    titleEn: "Discussing Finnish social topics",
    descVi: "Cấu trúc 'Å ena sidan… å andra sidan…' để cân bằng ý kiến.",
    descEn: "Use 'On the one hand… on the other hand…' to balance opinions.",
    skills: ["speak", "listen"],
    formula: "Å ena sidan…, å andra sidan…  ·  Det beror på…",
    examples: [
      { sv: "Å ena sidan är distansarbete bekvämt. Å andra sidan blir man ensam.", vi: "Một mặt làm việc từ xa rất tiện. Mặt khác lại thấy cô đơn.", en: "On the one hand remote work is convenient. On the other hand it gets lonely." },
      { sv: "Det beror på vilken bransch man jobbar i.",                            vi: "Cái đó tuỳ vào ngành mình làm.",                              en: "It depends on which industry you work in." },
    ],
    tipVi: "Trong Tala B1, KHÔNG đưa ý kiến tuyệt đối. Luôn cân bằng 'å ena sidan / å andra sidan' để đạt B1+.",
    tipEn: "In Tala B1, never give absolute opinions. Always balance with 'å ena sidan / å andra sidan' to reach B1+.",
  },
  {
    id: "b1-job",
    titleVi: "Đơn xin việc & phỏng vấn",
    titleEn: "Job applications & interviews",
    descVi: "CV, thư xin việc, câu hỏi phỏng vấn phổ biến tại Phần Lan.",
    descEn: "CV, cover letter, common interview questions in Finland.",
    skills: ["write", "speak"],
    examples: [
      { sv: "Jag söker tjänsten som dataingenjör hos er.", vi: "Tôi ứng tuyển vị trí Kỹ sư Dữ liệu tại quý công ty.", en: "I'm applying for the data engineer position at your company." },
      { sv: "Mina styrkor är problemlösning och samarbete.", vi: "Điểm mạnh của tôi là giải quyết vấn đề và làm việc nhóm.", en: "My strengths are problem-solving and teamwork." },
      { sv: "Varför vill du jobba just hos oss?",            vi: "Vì sao bạn muốn làm việc tại chúng tôi?",          en: "Why do you want to work specifically with us?" },
    ],
    vocab: [
      { sv: "ansökan",      vi: "đơn ứng tuyển", en: "application" },
      { sv: "personligt brev", vi: "thư xin việc", en: "cover letter" },
      { sv: "referenser",   vi: "người tham chiếu", en: "references" },
      { sv: "anställningsintervju", vi: "phỏng vấn xin việc", en: "job interview" },
    ],
    tipVi: "Phỏng vấn ở Phần Lan rất coi trọng 'samarbete' (làm việc nhóm) và 'självständigt arbete' — luôn nhắc cả 2.",
    tipEn: "Finnish interviews value 'samarbete' (teamwork) and 'självständigt arbete' (independence) — always mention both.",
  },
];

const TIERS: Tier[] = [
  {
    id: "a1",
    level: "A1",
    ykiLevel: 1,
    titleVi: "Chặng 1: YKI Cấp 1 (A1) — Nền tảng Sơ cấp",
    titleEn: "Stage 1: YKI Level 1 (A1) — Beginner Foundation",
    taglineVi: "Beginner Level",
    taglineEn: "Beginner Level",
    focusVi: "Làm quen với các tình huống giao tiếp cơ bản nhất trong đời sống Phần Lan.",
    focusEn: "Get familiar with the most basic everyday communication situations in Finland.",
    gradient: "from-sky-500 to-blue-500",
    Icon: Compass,
    lessons: A1_LESSONS,
    focusCorner: {
      titleVi: "YKI Focus Corner — Nghe & Đọc thông báo ngắn",
      titleEn: "YKI Focus Corner — Listening & Reading short messages",
      bullets: [
        { vi: "Đọc bảng hiệu, biển báo, lời nhắn SMS ngắn.", en: "Read signs, notices, short SMS messages.", skills: ["read"] },
        { vi: "Nghe thông báo trên tàu/xe buýt và sân bay.",  en: "Listen to announcements on trains, buses and airports.", skills: ["listen"] },
      ],
    },
  },
  {
    id: "a2",
    level: "A2",
    ykiLevel: 2,
    titleVi: "Chặng 2: YKI Cấp 2 (A2) — Chuẩn Quốc tịch Sơ cấp",
    titleEn: "Stage 2: YKI Level 2 (A2) — Basic Citizenship Target",
    taglineVi: "Basic Citizenship Target",
    taglineEn: "Basic Citizenship Target",
    focusVi: "Xử lý giao dịch xã hội thường nhật: mua sắm, hỏi đường, công sở cơ bản.",
    focusEn: "Handle everyday social transactions: shopping, asking directions, basic office life.",
    gradient: "from-emerald-500 to-teal-500",
    Icon: GraduationCap,
    lessons: A2_LESSONS,
    focusCorner: {
      titleVi: "YKI Focus Corner — Skriva & Tala",
      titleEn: "YKI Focus Corner — Skriva & Tala",
      bullets: [
        { vi: "Skriva: viết email xin nghỉ phép, thư cảm ơn, phản hồi tin nhắn dịch vụ.", en: "Skriva: write a short leave-of-absence email, thank-you note, reply to service messages.", skills: ["write"] },
        { vi: "Tala: phản xạ trả lời hội thoại ngắn trong phòng thi máy.",                 en: "Tala: respond to short conversational prompts in the recording booth.",                       skills: ["speak"] },
      ],
    },
  },
  {
    id: "b1",
    level: "B1",
    ykiLevel: 3,
    titleVi: "Chặng 3: YKI Cấp 3 (B1) — Quốc tịch Trung cấp & Việc làm",
    titleEn: "Stage 3: YKI Level 3 (B1) — Intermediate Citizenship & Employment",
    taglineVi: "Intermediate / Official Citizenship Level",
    taglineEn: "Intermediate / Official Citizenship Level",
    focusVi: "Trình bày quan điểm cá nhân, đọc hiểu báo chí và thảo luận chủ đề xã hội.",
    focusEn: "Express personal opinions, read the press and discuss social topics.",
    gradient: "from-amber-500 to-rose-500",
    Icon: Briefcase,
    lessons: B1_LESSONS,
    focusCorner: {
      titleVi: "YKI Focus Corner — Läsförståelse & Viết luận",
      titleEn: "YKI Focus Corner — Reading comprehension & Opinion writing",
      bullets: [
        { vi: "Läsförståelse: phân tích bài báo Yle text-TV và Hufvudstadsbladet.", en: "Läsförståelse: analyse Yle text-TV and Hufvudstadsbladet articles.", skills: ["read"] },
        { vi: "Viết luận: thư kiến nghị thể hiện đồng ý/phản đối về vấn đề công cộng.", en: "Opinion writing: feedback letter agreeing or disagreeing on a public issue.", skills: ["write"] },
      ],
    },
  },
];


/* -------------------------------------------------------------------------- */
/* Small UI atoms                                                              */
/* -------------------------------------------------------------------------- */

const SkillBadge = ({ skill }: { skill: YkiSkill }) => {
  const { t } = useLanguage();
  const meta = SKILL_META[skill];
  const Icon = meta.Icon;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold ${meta.color}`}
    >
      <Icon className="h-3 w-3" />
      YKI: {t(meta.vi, meta.en)}
    </span>
  );
};

const GlobalIndicator = () => {
  const { t } = useLanguage();
  return (
    <div className="rounded-full border border-primary/30 bg-gradient-to-r from-primary/10 to-emerald-500/10 px-4 py-2 text-center text-xs font-semibold text-primary sm:text-sm">
      <Sparkles className="mr-1 inline h-4 w-4" />
      {t(
        "Định hướng theo khung năng lực chuẩn YKI Testi Phần Lan (Cấp độ 1 – 3)",
        "Aligned with Finland's official YKI Testi proficiency framework (Levels 1 – 3)"
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Roadmap section                                                             */
/* -------------------------------------------------------------------------- */

const TierCard = ({ tier, index }: { tier: Tier; index: number }) => {
  const { t } = useLanguage();
  const Icon = tier.Icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
    >
      <Card className="overflow-hidden border-border/60">
        <div className={`bg-gradient-to-r ${tier.gradient} p-4 text-white sm:p-5`}>
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-white/20 p-2">
              <Icon className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold uppercase tracking-wider opacity-90">
                YKI {tier.ykiLevel} · {tier.level} · {t(tier.taglineVi, tier.taglineEn)}
              </div>
              <h3 className="mt-1 font-display text-lg font-bold sm:text-xl">{t(tier.titleVi, tier.titleEn)}</h3>
              <p className="mt-1 text-sm leading-relaxed opacity-95">{t(tier.focusVi, tier.focusEn)}</p>
            </div>
          </div>
        </div>

        <CardContent className="space-y-4 p-4 sm:p-5">
          <div className="grid gap-3 md:grid-cols-3">
            {tier.lessons.map((l) => (
              <div key={l.id} className="rounded-lg border border-border/60 bg-card/50 p-3">
                <div className="mb-2 flex flex-wrap gap-1">
                  {l.skills.map((s) => (
                    <SkillBadge key={s} skill={s} />
                  ))}
                </div>
                <h4 className="text-sm font-semibold text-foreground">{t(l.titleVi, l.titleEn)}</h4>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{t(l.descVi, l.descEn)}</p>
              </div>
            ))}
          </div>

          <div className="rounded-lg border border-primary/30 bg-primary/5 p-3 sm:p-4">
            <div className="mb-2 text-xs font-bold uppercase tracking-wider text-primary">
              {t(tier.focusCorner.titleVi, tier.focusCorner.titleEn)}
            </div>
            <ul className="space-y-1.5">
              {tier.focusCorner.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <div className="min-w-0 flex-1">
                    <p className="text-foreground">{t(b.vi, b.en)}</p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {b.skills.map((s) => (
                        <SkillBadge key={s} skill={s} />
                      ))}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

/* -------------------------------------------------------------------------- */
/* YKI Test Simulator widget                                                   */
/* -------------------------------------------------------------------------- */

const READING_Q = {
  passageVi:
    "Thông báo: 'Hissen i Mannerheimvägen 12 är ur funktion mellan 8.00 och 14.00 på fredag på grund av reparation. Använd trapporna.'",
  passageEn:
    "Notice: 'The lift at Mannerheimvägen 12 is out of order between 8.00 and 14.00 on Friday due to repair. Please use the stairs.'",
  question: { vi: "Có thể đi thang máy lúc 10 giờ sáng thứ Sáu.", en: "It is possible to use the lift at 10:00 on Friday." },
  options: [
    { id: "true", vi: "Đúng (Sant)", en: "True (Sant)" },
    { id: "false", vi: "Sai (Falskt)", en: "False (Falskt)" },
    { id: "nm", vi: "Không đề cập (Nämns inte)", en: "Not mentioned (Nämns inte)" },
  ],
  answer: "false",
};

const WRITING_PROMPT = {
  vi: "Viết một email bằng tiếng Thụy Điển gửi chủ nhà giải thích rằng đường ống nước trong bếp đang bị rò rỉ. Đề xuất thời gian thợ có thể đến sửa. (60–80 từ)",
  en: "Write an email in Swedish to your landlord explaining that a pipe in the kitchen is leaking. Suggest a time when a plumber can visit. (60–80 words)",
};

const SimulatorReading = () => {
  const { t } = useLanguage();
  const [choice, setChoice] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const correct = choice === READING_Q.answer;
  return (
    <div className="space-y-4">
      <div className="rounded-lg border bg-muted/40 p-4">
        <div className="mb-1 text-xs font-semibold text-muted-foreground">Läsförståelse · Hörförståelse</div>
        <p className="text-sm leading-relaxed text-foreground">{t(READING_Q.passageVi, READING_Q.passageEn)}</p>
      </div>
      <div>
        <p className="mb-2 text-sm font-semibold">{t(READING_Q.question.vi, READING_Q.question.en)}</p>
        <RadioGroup value={choice} onValueChange={(v) => { setChoice(v); setSubmitted(false); }}>
          {READING_Q.options.map((o) => (
            <div key={o.id} className="flex items-center gap-2 rounded-md border border-border/60 p-2">
              <RadioGroupItem id={`r-${o.id}`} value={o.id} />
              <Label htmlFor={`r-${o.id}`} className="cursor-pointer text-sm">{t(o.vi, o.en)}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <Button disabled={!choice} onClick={() => setSubmitted(true)}>{t("Kiểm tra", "Check answer")}</Button>
      {submitted && (
        <div className={`rounded-md border p-3 text-sm ${correct ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" : "border-rose-500/40 bg-rose-500/10 text-rose-700 dark:text-rose-300"}`}>
          {correct
            ? t("Chính xác! Thợ sửa đang làm việc từ 8–14h.", "Correct! The lift is being repaired 8–14.")
            : t("Chưa đúng. Thang máy hỏng từ 8–14h.", "Not quite. The lift is out of order 8–14.")}
        </div>
      )}
    </div>
  );
};

const SimulatorWriting = () => {
  const { t } = useLanguage();
  const [text, setText] = useState("");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const onTarget = words >= 60 && words <= 80;
  return (
    <div className="space-y-3">
      <div className="rounded-lg border bg-muted/40 p-4 text-sm leading-relaxed">
        <div className="mb-1 text-xs font-semibold text-muted-foreground">Skriftlig färdighet</div>
        {t(WRITING_PROMPT.vi, WRITING_PROMPT.en)}
      </div>
      <Textarea value={text} onChange={(e) => setText(e.target.value)} rows={8} placeholder={t("Viết câu trả lời bằng tiếng Thụy Điển…", "Write your reply in Swedish…")} />
      <div className="flex items-center justify-between text-xs">
        <span className={onTarget ? "text-emerald-600" : "text-muted-foreground"}>
          {words} {t("từ", "words")} {onTarget && "✓"}
        </span>
        <Button
          size="sm"
          variant="outline"
          disabled={words < 30}
          onClick={() => toast({ title: t("Đã lưu nháp", "Draft saved"), description: t("Tiếp tục luyện trên trang YKI B1.", "Keep practising on the YKI B1 page.") })}
        >
          {t("Lưu nháp", "Save draft")}
        </Button>
      </div>
    </div>
  );
};

const SimulatorSpeaking = () => {
  const { t } = useLanguage();
  const [recording, setRecording] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const TOTAL = 30;
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!recording) {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = window.setInterval(() => {
      setElapsed((e) => {
        if (e + 1 >= TOTAL) {
          setRecording(false);
          return TOTAL;
        }
        return e + 1;
      });
    }, 1000);
    return () => { if (intervalRef.current) window.clearInterval(intervalRef.current); };
  }, [recording]);

  const start = () => { setElapsed(0); setRecording(true); };
  const stop = () => setRecording(false);
  const pct = (elapsed / TOTAL) * 100;
  const remaining = TOTAL - elapsed;

  return (
    <div className="space-y-4">
      <div className="rounded-lg border bg-muted/40 p-4 text-sm leading-relaxed">
        <div className="mb-1 text-xs font-semibold text-muted-foreground">Muntlig färdighet</div>
        {t(
          "Prompt: 'Berätta om dina fritidsintressen. Du har 30 sekunder.' (Hãy nói về sở thích cá nhân trong 30 giây.)",
          "Prompt: 'Berätta om dina fritidsintressen. Du har 30 sekunder.' (Talk about your hobbies for 30 seconds.)"
        )}
      </div>
      <div className="rounded-xl border bg-card p-5 text-center">
        <div className={`mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full ${recording ? "animate-pulse bg-rose-500/20 text-rose-500" : "bg-muted text-muted-foreground"}`}>
          <Mic className="h-7 w-7" />
        </div>
        <Progress value={pct} className="h-2" />
        <div className="mt-2 text-xs text-muted-foreground">
          {recording
            ? t(`Đang ghi… còn ${remaining}s`, `Recording… ${remaining}s left`)
            : elapsed >= TOTAL
              ? t("Đã hết thời gian. Phòng thi tự nộp.", "Time's up. The booth has auto-submitted.")
              : t("Sẵn sàng — nhấn để mô phỏng ghi âm.", "Ready — press to simulate the recording.")}
        </div>
        <div className="mt-3 flex justify-center gap-2">
          {!recording ? (
            <Button onClick={start} className="gap-2"><Play className="h-4 w-4" />{t("Bắt đầu", "Start")}</Button>
          ) : (
            <Button variant="destructive" onClick={stop} className="gap-2"><Square className="h-4 w-4" />{t("Dừng", "Stop")}</Button>
          )}
        </div>
        <p className="mt-3 text-[11px] text-muted-foreground">
          {t(
            "Mô phỏng định dạng phòng thi YKI: ghi âm có giới hạn thời gian, không thể tạm dừng.",
            "Simulates the YKI booth format: timed recording, no pause allowed."
          )}
        </p>
      </div>
    </div>
  );
};

const SimulatorWidget = () => {
  const { t } = useLanguage();
  return (
    <Card className="border-primary/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          {t("YKI Thử Thách 4 Kỹ Năng", "YKI 4-Skills Challenge")}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {t(
            "Mô phỏng cấu trúc đề thi YKI Ruotsi với 4 kỹ năng riêng biệt.",
            "Simulates the YKI Swedish exam structure across the four separate skills."
          )}
        </p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="read">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="read" className="text-xs sm:text-sm">
              <BookOpen className="mr-1 h-4 w-4" />
              {t("Đọc & Nghe", "Read & Listen")}
            </TabsTrigger>
            <TabsTrigger value="write" className="text-xs sm:text-sm">
              <PencilLine className="mr-1 h-4 w-4" />
              {t("Viết", "Write")}
            </TabsTrigger>
            <TabsTrigger value="speak" className="text-xs sm:text-sm">
              <Mic className="mr-1 h-4 w-4" />
              {t("Nói", "Speak")}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="read" className="mt-4"><SimulatorReading /></TabsContent>
          <TabsContent value="write" className="mt-4"><SimulatorWriting /></TabsContent>
          <TabsContent value="speak" className="mt-4"><SimulatorSpeaking /></TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

/* -------------------------------------------------------------------------- */
/* Page                                                                        */
/* -------------------------------------------------------------------------- */

const SwedishPage = () => {
  const { t } = useLanguage();
  const tiers = useMemo(() => TIERS, []);

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>{t("Học Tiếng Thụy Điển YKI A1–B1 | HaiEduTech", "Learn Swedish YKI A1–B1 | HaiEduTech")}</title>
        <meta
          name="description"
          content={t(
            "Lộ trình học tiếng Thụy Điển định hướng theo kỳ thi YKI Testi Ruotsi của Phần Lan, từ A1 đến B1 với mô phỏng 4 kỹ năng.",
            "Swedish learning roadmap aligned with Finland's YKI Testi Ruotsi exam, A1 to B1, with 4-skill simulator."
          )}
        />
        <link rel="canonical" href="https://haiedutech.com/swedish" />
      </Helmet>

      <div className="container mx-auto max-w-5xl space-y-8 px-4 py-8 sm:py-12">
        <GlobalIndicator />

        <header className="text-center">
          <h1 className="font-display text-3xl font-bold sm:text-4xl">
            {t("Học Tiếng Thụy Điển — Lộ trình YKI", "Learn Swedish — YKI Roadmap")}
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {t(
              "Chương trình đồng bộ với chuẩn YKI Testi Ruotsi (Phần Lan) — 3 chặng A1 → A2 → B1, mỗi chặng có thẻ kỹ năng rõ ràng và YKI Focus Corner.",
              "Aligned with Finland's YKI Testi Ruotsi standard — three stages A1 → A2 → B1, every lesson tagged with the skill it trains, plus a YKI Focus Corner."
            )}
          </p>
        </header>

        <section className="space-y-4">
          {tiers.map((tier, i) => (
            <TierCard key={tier.id} tier={tier} index={i} />
          ))}
        </section>

        <section>
          <SimulatorWidget />
        </section>
      </div>
    </main>
  );
};

export default SwedishPage;
