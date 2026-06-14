/**
 * @file SwedishTierView.tsx
 * @description Shared renderer for a single YKI Swedish tier (A1 / A2 / B1).
 *              Contains the full curriculum data, lesson accordion and 4-skills simulator.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useRef, useState } from "react";
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
  {
    id: "a1-weather",
    titleVi: "Thời tiết & mùa Bắc Âu",
    titleEn: "Weather & Nordic seasons",
    descVi: "Bốn mùa, mô tả thời tiết, ánh sáng vùng cực và mặc đồ theo mùa.",
    descEn: "Four seasons, weather phrases, polar light and dressing for the season.",
    skills: ["listen", "speak"],
    formula: "Det är [adj].  ·  Det regnar / snöar / blåser.",
    examples: [
      { sv: "Det är kallt och soligt idag.", vi: "Hôm nay lạnh và nắng.", en: "It's cold and sunny today." },
      { sv: "På vintern snöar det ofta i Finland.", vi: "Mùa đông ở Phần Lan hay có tuyết.", en: "In winter it often snows in Finland." },
      { sv: "Sommarnatten är ljus i Lappland.", vi: "Đêm hè ở Lapland sáng (đêm trắng).", en: "The summer night is bright in Lapland." },
    ],
    vocab: [
      { sv: "vinter / sommar", vi: "đông / hè", en: "winter / summer" },
      { sv: "vår / höst", vi: "xuân / thu", en: "spring / autumn" },
      { sv: "regn / snö / dimma", vi: "mưa / tuyết / sương mù", en: "rain / snow / fog" },
      { sv: "varm / kall / sval", vi: "ấm / lạnh / mát", en: "warm / cold / cool" },
    ],
    tipVi: "YKI A1 luôn hỏi 'Hur är vädret?'. Học thuộc 3 câu mô tả ngắn là an toàn.",
    tipEn: "YKI A1 always asks 'Hur är vädret?'. Memorise 3 short weather sentences to stay safe.",
  },
  {
    id: "a1-restaurant",
    titleVi: "Gọi món ở quán cà phê & nhà hàng",
    titleEn: "Ordering at a café / restaurant",
    descVi: "Tình huống fika kinh điển: chào, gọi đồ, hỏi giá, trả tiền.",
    descEn: "The classic 'fika' scenario: greeting, ordering, asking the price, paying.",
    skills: ["speak", "listen"],
    formula: "Jag tar [maträtt], tack.  ·  Kan jag få [drycken]?",
    examples: [
      { sv: "Jag tar en kanelbulle och en kaffe, tack.", vi: "Cho mình một bánh quế và một cà phê, cảm ơn.", en: "I'll have a cinnamon bun and a coffee, please." },
      { sv: "Kan jag få vattnet utan is?", vi: "Cho mình nước không đá nhé?", en: "Can I have the water without ice?" },
      { sv: "Notan, tack.", vi: "Cho mình hoá đơn nhé.", en: "The bill, please." },
    ],
    vocab: [
      { sv: "meny", vi: "thực đơn", en: "menu" },
      { sv: "förrätt / huvudrätt / efterrätt", vi: "khai vị / món chính / tráng miệng", en: "starter / main / dessert" },
      { sv: "dricks", vi: "tiền tip", en: "tip" },
      { sv: "smaklig måltid!", vi: "chúc ăn ngon!", en: "enjoy your meal!" },
    ],
    tipVi: "'Tack' lặp lại nhiều lần thay vì 'snälla' — đó là phong cách Bắc Âu lịch sự.",
    tipEn: "Repeat 'Tack' often instead of begging with 'snälla' — that's the Nordic polite style.",
  },
  {
    id: "a1-weather-seasons",
    titleVi: "Thời tiết & 4 mùa Bắc Âu",
    titleEn: "Weather & the four Nordic seasons",
    descVi: "Mô tả thời tiết hằng ngày và sự thay đổi 4 mùa — chủ đề bắt buộc trong YKI A1 listening.",
    descEn: "Describe daily weather and the changing seasons — a recurring YKI A1 listening topic.",
    skills: ["listen", "speak"],
    formula: "Det är [adj]   ·   Det [regnar / snöar / blåser]   ·   Temperaturen är [tal] grader.",
    examples: [
      { sv: "Det är kallt och det snöar mycket i januari.", vi: "Tháng 1 lạnh và tuyết nhiều.", en: "It's cold and snowing a lot in January." },
      { sv: "På sommaren går solen knappt ner i norra Sverige.", vi: "Mùa hè mặt trời gần như không lặn ở Bắc Thuỵ Điển.", en: "In summer the sun barely sets in northern Sweden." },
      { sv: "Idag är det soligt men ganska blåsigt.", vi: "Hôm nay nắng nhưng khá gió.", en: "Today it's sunny but quite windy." },
    ],
    vocab: [
      { sv: "vinter / vår / sommar / höst", vi: "đông / xuân / hè / thu", en: "winter / spring / summer / autumn" },
      { sv: "soligt / molnigt / regnigt / snöigt", vi: "nắng / nhiều mây / mưa / có tuyết", en: "sunny / cloudy / rainy / snowy" },
      { sv: "grader (Celsius)", vi: "độ C", en: "degrees Celsius" },
      { sv: "minusgrader", vi: "nhiệt độ âm", en: "sub-zero" },
    ],
    tipVi: "Khi nghe dự báo Yle/SVT, hãy ghi 3 dữ liệu: nhiệt độ, mưa/tuyết, gió. Đó là cấu trúc câu hỏi cố định.",
    tipEn: "When listening to Yle/SVT forecasts, note 3 data points: temperature, rain/snow, wind. That mirrors the YKI question format.",
  },
  {
    id: "a1-nature-allemansrätten",
    titleVi: "Thiên nhiên Bắc Âu & Allemansrätten",
    titleEn: "Nordic nature & the Right of Public Access",
    descVi: "Từ vựng rừng, hồ, núi và luật Allemansrätten — văn hoá đặc trưng Thuỵ Điển.",
    descEn: "Forest, lake and fell vocabulary plus Allemansrätten — a uniquely Swedish cultural concept.",
    skills: ["read", "speak"],
    examples: [
      { sv: "Allemansrätten betyder att alla får vandra fritt i skogen.", vi: "Allemansrätten nghĩa là ai cũng được tự do đi bộ trong rừng.", en: "Allemansrätten means everyone may freely roam the forest." },
      { sv: "Vi plockar bär och svamp på hösten.", vi: "Mùa thu chúng tôi hái dâu và nấm.", en: "We pick berries and mushrooms in autumn." },
      { sv: "I fjällen bor det renar och älgar.", vi: "Ở vùng núi có nai và tuần lộc.", en: "Reindeer and moose live in the fells." },
    ],
    vocab: [
      { sv: "skog / sjö / fjäll", vi: "rừng / hồ / núi cao", en: "forest / lake / fell" },
      { sv: "bär (lingon, blåbär)", vi: "dâu (việt quất đỏ/xanh)", en: "berries (lingonberry, blueberry)" },
      { sv: "vandra", vi: "đi bộ đường dài", en: "to hike" },
      { sv: "tystnad", vi: "sự yên lặng", en: "silence" },
    ],
    tipVi: "Allemansrätten là câu hỏi văn hoá kinh điển — học một định nghĩa 2 câu để dùng trong cả Tala và Skriva.",
    tipEn: "Allemansrätten is a classic culture question — memorise a 2-sentence definition you can reuse in Tala and Skriva.",
  },
  {
    id: "a1-shopping-ica",
    titleVi: "Mua sắm ở siêu thị ICA / Lidl",
    titleEn: "Grocery shopping at ICA / Lidl",
    descVi: "Hỏi giá, hỏi vị trí kệ hàng, đọc nhãn 'Erbjudande' (giảm giá) — phản xạ A1 hằng ngày.",
    descEn: "Ask prices, find aisles and read 'Erbjudande' (offer) tags — daily A1 reflex.",
    skills: ["speak", "read"],
    formula: "Var hittar jag [vara]?  ·  Hur mycket kostar [vara]?  ·  Jag tar [antal], tack.",
    examples: [
      { sv: "Ursäkta, var hittar jag mjölken?", vi: "Xin lỗi, sữa ở đâu vậy?", en: "Excuse me, where do I find the milk?" },
      { sv: "Hur mycket kostar de här äpplena?", vi: "Mấy quả táo này bao nhiêu tiền?", en: "How much do these apples cost?" },
      { sv: "Jag tar två, tack. Kan jag betala med kort?", vi: "Tôi lấy 2, cảm ơn. Trả thẻ được không?", en: "I'll take two, thanks. Can I pay by card?" },
    ],
    vocab: [
      { sv: "erbjudande", vi: "ưu đãi / giảm giá", en: "offer" },
      { sv: "påse / kasse", vi: "túi mua hàng", en: "bag" },
      { sv: "kort / kontant", vi: "thẻ / tiền mặt", en: "card / cash" },
      { sv: "kassan", vi: "quầy thu ngân", en: "the till" },
    ],
    tipVi: "Người Thuỵ Điển hiếm khi trả giá — học phản xạ 'Jag tar…' để chốt đơn tự tin.",
    tipEn: "Swedes rarely haggle — learn the reflex 'Jag tar…' to close a purchase confidently.",
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
  {
    id: "a2-housing",
    titleVi: "Tìm nhà & thuê căn hộ",
    titleEn: "Finding housing & renting",
    descVi: "Đọc tin rao 'bostad uthyres', hỏi diện tích, tiền cọc, tiện ích.",
    descEn: "Read 'bostad uthyres' ads, ask about size, deposit and utilities.",
    skills: ["read", "speak"],
    formula: "Jag söker en [storlek] i [område] för max [pris] kronor.",
    examples: [
      { sv: "Jag söker en tvårummare i Vasa för max 800 euro.", vi: "Tôi tìm căn 2 phòng ở Vaasa, tối đa 800 euro.", en: "I'm looking for a two-room flat in Vaasa, max 800 euro." },
      { sv: "Ingår el och vatten i hyran?", vi: "Tiền điện và nước có gồm trong giá thuê không?", en: "Are electricity and water included in the rent?" },
      { sv: "Hur stor är depositionen?", vi: "Tiền cọc là bao nhiêu?", en: "How big is the deposit?" },
    ],
    vocab: [
      { sv: "hyra", vi: "tiền thuê", en: "rent" },
      { sv: "deposition", vi: "tiền cọc", en: "deposit" },
      { sv: "möblerad / omöblerad", vi: "có nội thất / không nội thất", en: "furnished / unfurnished" },
      { sv: "tvårummare / trerummare", vi: "căn 2 phòng / 3 phòng", en: "two-room / three-room flat" },
    ],
    tipVi: "Trong Skriva A2, mô tả nhà 'lägenheten' luôn có 'kök', 'badrum', 'sovrum' — học thuộc 3 từ này.",
    tipEn: "On Skriva A2, describing 'lägenheten' always needs 'kök', 'badrum', 'sovrum' — memorise these three.",
  },
  {
    id: "a2-transport",
    titleVi: "Mua vé HSL & đi tàu liên thành phố VR",
    titleEn: "Buying HSL tickets & inter-city VR train",
    descVi: "Sử dụng app HSL, hỏi tàu VR (Helsinki ↔ Tampere ↔ Vaasa), hiểu thông báo.",
    descEn: "Use the HSL app, ask about VR trains (Helsinki ↔ Tampere ↔ Vaasa), understand announcements.",
    skills: ["listen", "read"],
    examples: [
      { sv: "En enkelbiljett till Tammerfors, andra klass, tack.", vi: "Một vé một chiều đi Tampere, hạng 2, cảm ơn.", en: "A single ticket to Tampere, second class, please." },
      { sv: "Tåget från spår fyra avgår om fem minuter.", vi: "Tàu ở ke số 4 sẽ chạy trong 5 phút.", en: "The train from platform four departs in five minutes." },
      { sv: "Måste jag byta tåg?", vi: "Tôi có phải đổi tàu không?", en: "Do I need to change trains?" },
    ],
    vocab: [
      { sv: "enkelbiljett / tur och retur", vi: "vé một chiều / khứ hồi", en: "single / return ticket" },
      { sv: "spår", vi: "đường ray (ke ga)", en: "platform" },
      { sv: "avgång / ankomst", vi: "khởi hành / đến", en: "departure / arrival" },
      { sv: "byta tåg", vi: "đổi tàu", en: "change trains" },
    ],
    tipVi: "Thông báo VR luôn dùng giờ 24 giờ — 'klockan sjutton' = 17:00. Đừng nhầm với 'klockan sju' (07:00).",
    tipEn: "VR announcements use 24-hour time — 'klockan sjutton' = 17:00. Don't confuse it with 'klockan sju' (07:00).",
  },
  {
    id: "a2-doctor-visit",
    titleVi: "Đi khám bác sĩ ở Vårdcentral",
    titleEn: "Visiting a doctor at the Vårdcentral",
    descVi: "Đặt lịch 1177, mô tả triệu chứng và hiểu chỉ dẫn dùng thuốc — kịch bản YKI A2 Tala phổ biến.",
    descEn: "Book via 1177, describe symptoms and follow medication instructions — a frequent YKI A2 Tala scenario.",
    skills: ["speak", "listen"],
    formula: "Jag har ont i [kroppsdel]   ·   Det gör ont när jag [verb]   ·   Jag känner mig [adj].",
    examples: [
      { sv: "Jag har ont i halsen och hög feber sedan i går.", vi: "Tôi đau họng và sốt cao từ hôm qua.", en: "I have a sore throat and a high fever since yesterday." },
      { sv: "Kan jag boka en tid med en läkare imorgon?", vi: "Tôi có thể đặt lịch bác sĩ ngày mai không?", en: "Can I book an appointment with a doctor tomorrow?" },
      { sv: "Ta en tablett tre gånger om dagen efter maten.", vi: "Uống 1 viên 3 lần/ngày sau ăn.", en: "Take one tablet three times a day after meals." },
    ],
    vocab: [
      { sv: "vårdcentral", vi: "trung tâm y tế cơ sở", en: "primary healthcare clinic" },
      { sv: "recept", vi: "đơn thuốc", en: "prescription" },
      { sv: "apotek", vi: "hiệu thuốc", en: "pharmacy" },
      { sv: "biverkning", vi: "tác dụng phụ", en: "side effect" },
    ],
    tipVi: "Trong Tala A2, đừng kể bệnh dài dòng — chỉ cần 3 câu: triệu chứng + khi nào bắt đầu + bạn cần gì.",
    tipEn: "In Tala A2 don't ramble — just 3 sentences: symptom + when it started + what you need.",
  },
  {
    id: "a2-emotions-small-talk",
    titleVi: "Cảm xúc & small-talk văn phòng",
    titleEn: "Emotions & office small-talk",
    descVi: "Hỏi thăm đồng nghiệp, mô tả tâm trạng và phản ứng lịch sự — luyện phản xạ Tala A2.",
    descEn: "Greet colleagues, describe moods and respond politely — Tala A2 reflex practice.",
    skills: ["speak", "write"],
    examples: [
      { sv: "Hur mår du idag? – Tack, jag är ganska trött men glad.", vi: "Hôm nay bạn sao? – Cảm ơn, hơi mệt nhưng vui.", en: "How are you today? – Thanks, a bit tired but happy." },
      { sv: "Jag är lite nervös inför mötet klockan tre.", vi: "Tôi hơi lo trước cuộc họp 3 giờ.", en: "I'm a bit nervous about the 3 o'clock meeting." },
      { sv: "Det är synd att höra. Hoppas du mår bättre snart.", vi: "Tiếc quá. Mong bạn sớm khoẻ.", en: "Sorry to hear that. Hope you feel better soon." },
    ],
    vocab: [
      { sv: "glad / ledsen / trött / stressad", vi: "vui / buồn / mệt / căng thẳng", en: "happy / sad / tired / stressed" },
      { sv: "hoppas att …", vi: "hy vọng rằng…", en: "hope that…" },
      { sv: "synd / tråkigt / kul", vi: "tiếc / chán / vui", en: "a pity / boring / fun" },
      { sv: "ta hand om dig", vi: "giữ gìn sức khoẻ", en: "take care" },
    ],
    tipVi: "Phản xạ với cụm 'Det är synd' / 'Vad kul!' để câu trả lời tự nhiên hơn 'Ja' / 'Nej' đơn lẻ.",
    tipEn: "React with 'Det är synd' / 'Vad kul!' to sound more natural than a bare 'Ja' / 'Nej'.",
  },
  {
    id: "a2-bank-id",
    titleVi: "Mở tài khoản ngân hàng & BankID",
    titleEn: "Opening a bank account & BankID",
    descVi: "Hỏi điều kiện, chuẩn bị giấy tờ và đặt lịch hẹn tại Nordea / SEB — chủ đề YKI A2 cao tần.",
    descEn: "Ask requirements, prepare documents and book an appointment at Nordea / SEB — high-frequency YKI A2 topic.",
    skills: ["read", "speak"],
    formula: "Jag skulle vilja [verb] …  ·  Vad behöver jag ta med mig?",
    examples: [
      { sv: "Jag skulle vilja öppna ett bankkonto och få BankID.", vi: "Tôi muốn mở tài khoản ngân hàng và lấy BankID.", en: "I'd like to open a bank account and get BankID." },
      { sv: "Vilka dokument behöver jag ta med mig?", vi: "Tôi cần mang theo giấy tờ gì?", en: "What documents do I need to bring?" },
      { sv: "Kan jag boka en tid på torsdag eftermiddag?", vi: "Tôi đặt lịch chiều thứ năm được không?", en: "Can I book an appointment Thursday afternoon?" },
    ],
    vocab: [
      { sv: "personnummer", vi: "mã định danh cá nhân", en: "personal ID number" },
      { sv: "uppehållstillstånd", vi: "giấy phép cư trú", en: "residence permit" },
      { sv: "konto / kort", vi: "tài khoản / thẻ", en: "account / card" },
      { sv: "BankID", vi: "định danh số Thuỵ Điển", en: "Swedish digital ID" },
    ],
    tipVi: "Cụm 'Jag skulle vilja…' chuyển nhanh giọng A2 từ trẻ con sang người lớn — luôn dùng khi đến cơ quan.",
    tipEn: "The phrase 'Jag skulle vilja…' instantly bumps A2 tone from childish to adult — use at every office visit.",
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
  {
    id: "b1-environment",
    titleVi: "Môi trường & năng lượng tái tạo",
    titleEn: "Environment & renewable energy",
    descVi: "Phân tích bài đọc về khí hậu Bắc Âu, tranh luận đề tài xanh.",
    descEn: "Analyse Nordic climate reading and debate green topics.",
    skills: ["read", "speak", "write"],
    formula: "Å ena sidan… å andra sidan…  ·  Det är viktigt att… eftersom…",
    examples: [
      { sv: "Sverige satsar stort på vindkraft och solenergi.", vi: "Thụy Điển đầu tư mạnh vào điện gió và mặt trời.", en: "Sweden invests heavily in wind and solar power." },
      { sv: "Återvinning är en självklarhet i hela Norden.", vi: "Tái chế là chuyện hiển nhiên ở Bắc Âu.", en: "Recycling is taken for granted across the Nordics." },
      { sv: "Det är viktigt att minska utsläppen eftersom klimatet förändras snabbt.", vi: "Quan trọng là giảm khí thải vì khí hậu thay đổi nhanh.", en: "It's important to cut emissions because the climate is changing fast." },
    ],
    vocab: [
      { sv: "hållbar utveckling", vi: "phát triển bền vững", en: "sustainable development" },
      { sv: "fossila bränslen", vi: "nhiên liệu hoá thạch", en: "fossil fuels" },
      { sv: "koldioxidutsläpp", vi: "khí thải CO2", en: "carbon emissions" },
      { sv: "biologisk mångfald", vi: "đa dạng sinh học", en: "biodiversity" },
    ],
    tipVi: "Chủ đề môi trường xuất hiện trong 60% bài Skriva B1. Học sẵn 5 cụm từ vựng để dùng nhanh.",
    tipEn: "Environmental topics show up in 60% of Skriva B1 prompts. Stock up on 5 ready-to-use phrases.",
  },
  {
    id: "b1-future",
    titleVi: "Mục tiêu cá nhân & kế hoạch 5 năm",
    titleEn: "Personal goals & 5-year plan",
    descVi: "Diễn đạt mong muốn, kế hoạch học tập và sự nghiệp tại Phần Lan/Bắc Âu.",
    descEn: "Express wishes, study and career plans for life in Finland/the Nordics.",
    skills: ["speak", "write"],
    formula: "Om fem år hoppas jag att jag… eftersom jag vill…",
    examples: [
      { sv: "Om fem år hoppas jag att jag jobbar som dataingenjör i Finland.", vi: "5 năm nữa tôi mong được làm kỹ sư dữ liệu ở Phần Lan.", en: "In five years I hope to work as a data engineer in Finland." },
      { sv: "Mitt mål är att klara YKI B1 Ruotsi och få jobb i Vasa.", vi: "Mục tiêu của tôi là đỗ YKI B1 Ruotsi và xin việc tại Vaasa.", en: "My goal is to pass YKI B1 Ruotsi and land a job in Vaasa." },
      { sv: "Jag planerar att studera vidare på universitetet.", vi: "Tôi định học tiếp lên đại học.", en: "I plan to continue my studies at the university." },
    ],
    vocab: [
      { sv: "mål", vi: "mục tiêu", en: "goal" },
      { sv: "drömjobb", vi: "công việc mơ ước", en: "dream job" },
      { sv: "vidareutbildning", vi: "đào tạo nâng cao", en: "further education" },
      { sv: "karriär", vi: "sự nghiệp", en: "career" },
    ],
    tipVi: "Khi nói về tương lai trong Tala B1, dùng cấu trúc 'hoppas att…' để thể hiện ngữ điệu tự nhiên, tránh 'kommer att' trùng lặp.",
    tipEn: "When talking about the future in Tala B1, use 'hoppas att…' for natural intonation — don't overuse 'kommer att'.",
  },
  {
    id: "b1-climate-debate",
    titleVi: "Tranh luận về biến đổi khí hậu",
    titleEn: "Climate change debate",
    descVi: "Cấu trúc lập luận pro/contra với 'å ena sidan / å andra sidan' — chìa khoá Skriva B1 opinion essay.",
    descEn: "Pro/contra structure with 'å ena sidan / å andra sidan' — the key to a B1 opinion essay.",
    skills: ["write", "speak"],
    formula: "Å ena sidan …, å andra sidan …  ·  Det viktigaste argumentet är att …  ·  Sammanfattningsvis tycker jag att …",
    examples: [
      { sv: "Å ena sidan är flyget bekvämt, å andra sidan släpper det ut mycket koldioxid.", vi: "Một mặt đi máy bay tiện, mặt khác thải nhiều CO2.", en: "On one hand flying is convenient, on the other it releases a lot of CO2." },
      { sv: "Vi måste investera mer i solenergi och kollektivtrafik.", vi: "Phải đầu tư hơn vào điện mặt trời và giao thông công cộng.", en: "We must invest more in solar energy and public transport." },
      { sv: "Sammanfattningsvis tycker jag att klimatet är vår viktigaste fråga.", vi: "Tóm lại, tôi nghĩ khí hậu là vấn đề quan trọng nhất.", en: "In conclusion, I think climate is our most important issue." },
    ],
    vocab: [
      { sv: "klimatförändring", vi: "biến đổi khí hậu", en: "climate change" },
      { sv: "utsläpp", vi: "khí thải", en: "emissions" },
      { sv: "förnybar energi", vi: "năng lượng tái tạo", en: "renewable energy" },
      { sv: "hållbar utveckling", vi: "phát triển bền vững", en: "sustainable development" },
    ],
    tipVi: "Cấu trúc 'Å ena sidan / å andra sidan / Sammanfattningsvis' đảm bảo essay đủ 3 đoạn — chuẩn chấm B1.",
    tipEn: "The 'Å ena sidan / å andra sidan / Sammanfattningsvis' frame guarantees three paragraphs — the B1 rubric.",
  },
  {
    id: "b1-digital-life",
    titleVi: "Đời sống số & mạng xã hội",
    titleEn: "Digital life & social media",
    descVi: "Bàn luận ảnh hưởng smartphone, AI và sociala medier — chủ đề báo Hbl & Yle gần đây.",
    descEn: "Discuss the impact of smartphones, AI and social media — a recent Hbl & Yle headline topic.",
    skills: ["read", "write"],
    formula: "[Subjekt] [verb] eftersom …   ·   Trots att … så …",
    examples: [
      { sv: "Många ungdomar använder sociala medier flera timmar varje dag.", vi: "Nhiều thanh niên dùng mạng xã hội nhiều giờ mỗi ngày.", en: "Many young people use social media many hours every day." },
      { sv: "Trots att tekniken är användbar, kan den också vara beroendeframkallande.", vi: "Dù công nghệ hữu ích, nó cũng có thể gây nghiện.", en: "Although technology is useful, it can also be addictive." },
      { sv: "Skolan borde lära elever att tänka kritiskt om information online.", vi: "Trường nên dạy học sinh tư duy phản biện thông tin online.", en: "Schools should teach pupils to think critically about info online." },
    ],
    vocab: [
      { sv: "sociala medier", vi: "mạng xã hội", en: "social media" },
      { sv: "skärmtid", vi: "thời gian màn hình", en: "screen time" },
      { sv: "beroende", vi: "nghiện / phụ thuộc", en: "addiction / dependence" },
      { sv: "källkritik", vi: "phản biện nguồn", en: "source criticism" },
    ],
    tipVi: "Liên từ 'trots att' luôn theo sau bằng mệnh đề phụ — đây là bẫy BIFF kinh điển trong Skriva B1.",
    tipEn: "'Trots att' is always followed by a subordinate clause — a classic BIFF trap in Skriva B1.",
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
          <Accordion type="multiple" className="space-y-2">
            {tier.lessons.map((l) => (
              <AccordionItem
                key={l.id}
                value={l.id}
                className="rounded-lg border border-border/60 bg-card/50 px-3"
              >
                <AccordionTrigger className="py-3 hover:no-underline">
                  <div className="flex flex-1 flex-col items-start gap-1.5 pr-2 text-left">
                    <div className="flex flex-wrap gap-1">
                      {l.skills.map((s) => (
                        <SkillBadge key={s} skill={s} />
                      ))}
                    </div>
                    <h4 className="text-sm font-semibold text-foreground sm:text-base">
                      {t(l.titleVi, l.titleEn)}
                    </h4>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {t(l.descVi, l.descEn)}
                    </p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-3 pb-4">
                  {l.formula && (
                    <div className="rounded-md border border-primary/20 bg-primary/5 p-2.5">
                      <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                        {t("Công thức", "Formula")}
                      </div>
                      <p className="font-mono text-xs leading-relaxed text-foreground whitespace-pre-wrap">
                        {l.formula}
                      </p>
                    </div>
                  )}
                  {l.examples && l.examples.length > 0 && (
                    <div>
                      <div className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-300">
                        {t("Ví dụ", "Examples")}
                      </div>
                      <ul className="space-y-2">
                        {l.examples.map((ex, i) => (
                          <li key={i} className="rounded-md bg-muted/40 p-2 text-xs leading-relaxed">
                            <p className="font-semibold text-foreground">🇸🇪 {ex.sv}</p>
                            <p className="text-muted-foreground">{t(`🇻🇳 ${ex.vi}`, `🇬🇧 ${ex.en}`)}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {l.vocab && l.vocab.length > 0 && (
                    <div>
                      <div className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-300">
                        {t("Từ vựng cốt lõi", "Core vocabulary")}
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full min-w-[320px] text-xs">
                          <tbody>
                            {l.vocab.map((v, i) => (
                              <tr key={i} className="border-b border-border/40 last:border-0">
                                <td className="py-1.5 pr-3 font-semibold text-foreground">{v.sv}</td>
                                <td className="py-1.5 text-muted-foreground">{t(v.vi, v.en)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  {(l.tipVi || l.tipEn) && (
                    <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-2.5">
                      <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-300">
                        {t("💡 Mẹo vàng thầy Hải", "💡 Teacher Hai's tip")}
                      </div>
                      <p className="text-xs leading-relaxed text-foreground">
                        {t(l.tipVi || "", l.tipEn || "")}
                      </p>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>


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
/* Public exports                                                              */
/* -------------------------------------------------------------------------- */

/** A small banner shown above every Swedish/YKI sub-page. */
export const SwedishGlobalIndicator = GlobalIndicator;

/** Renders the lessons + YKI simulator for a single tier (A1 / A2 / B1). */
export const SwedishTierView = ({ tierId }: { tierId: "a1" | "a2" | "b1" }) => {
  const tier = TIERS.find((t) => t.id === tierId);
  if (!tier) return null;
  return (
    <div className="space-y-8">
      <GlobalIndicator />
      <TierCard tier={tier} index={0} />
      <SimulatorWidget />
    </div>
  );
};

export type { Tier };
export { TIERS };
