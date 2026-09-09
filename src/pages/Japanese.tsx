/**
 * @file Japanese.tsx
 * @description Basic Japanese learning hub (N5) - Kana, Greetings, Numbers, Vocab, Grammar.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useState, useMemo, useEffect, useRef, lazy, Suspense } from "react";
import { useSearchParams } from "react-router-dom";
import { Volume2, Star } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlacementCta from "@/components/personalization/PlacementCta";
import FloatingJapaneseIcons from "@/components/japanese/FloatingJapaneseIcons";
import JaSection, { JaSectionItem } from "@/components/japanese/JaSection";
import {
  HIRAGANA_DAKUTEN, HIRAGANA_YOON, KATAKANA_DAKUTEN,
  GREETINGS_EXTRA, COUNTERS, VOCAB_EXTRA, KANJI_EXTRA,
  DIALOGUES_EXTRA, GRAMMAR_EXTRA, JA_QUIZ,
} from "@/data/japaneseExpansion";
import { JA_QUIZ_EXTRA } from "@/data/japanese/quizBank";
import { VOCAB_TOPICS } from "@/data/japanese/vocab";
import { KANJI_GROUPS } from "@/data/japanese/kanji";
import {
  VOCAB_EXTRA_2, KANJI_EXTRA_2, DIALOGUES_EXTRA_2,
  GRAMMAR_EXTRA_2, JA_QUIZ_EXTRA_2,
} from "@/data/japanese/expansion2";
import { VOCAB_EXTRA_3, KANJI_EXTRA_3 } from "@/data/japanese/expansion3";
import { GRAMMAR_EXTRA_3, DIALOGUES_EXTRA_3, JA_QUIZ_EXTRA_3 } from "@/data/japanese/expansion4";
import { VOCAB_EXTRA_5, KANJI_EXTRA_5 } from "@/data/japanese/expansion5";
import {
  GRAMMAR_EXTRA_6_PACK, DIALOGUES_EXTRA_6_PACK, JA_QUIZ_EXTRA_6_PACK,
} from "@/data/japanese/expansion6";
import { useMasteredVocab } from "@/hooks/useMasteredVocab";
import WordQuest from "@/components/vocab/WordQuest";
import DailyWordMission from "@/components/vocab/DailyWordMission";
import { countDue, loadSrs } from "@/lib/vocab/srsEngine";
import { japaneseToQuest } from "@/lib/vocab/vocabAdapter";
import { recordVocabReviewTracked } from "@/lib/vocabReview";

const VocabBrainPanel = lazy(() => import("@/components/vocab/VocabBrainPanel"));
const JapaneseSpeakingCoach = lazy(() => import("@/components/AISpeakingCoach"));
const JapaneseListening = lazy(() => import("@/components/japanese/JapaneseListening"));
const JapaneseDictation = lazy(() => import("@/components/japanese/JapaneseDictation"));
const JapaneseFlashcards = lazy(() => import("@/components/japanese/JapaneseFlashcards"));
const JapaneseJlpt = lazy(() => import("@/components/japanese/JapaneseJlpt"));
const JapaneseCulture = lazy(() => import("@/components/japanese/JapaneseCulture"));
const JA_MILESTONES = [
  { words: 100, band: "JLPT N5" },
  { words: 300, band: "N5+" },
  { words: 600, band: "JLPT N4" },
  { words: 1000, band: "N4+" },
];

// ---------- TTS ----------
function speakJa(text: string, rate = 0.85) {
  try {
    const s = window.speechSynthesis;
    if (!s) return;
    s.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "ja-JP";
    u.rate = rate;
    const jaVoice = s.getVoices().find(v => v.lang?.toLowerCase().startsWith("ja"));
    if (jaVoice) u.voice = jaVoice;
    s.speak(u);
  } catch {}
}

// ---------- Data ----------
const HIRAGANA: Array<[string, string]> = [
  ["あ","a"],["い","i"],["う","u"],["え","e"],["お","o"],
  ["か","ka"],["き","ki"],["く","ku"],["け","ke"],["こ","ko"],
  ["さ","sa"],["し","shi"],["す","su"],["せ","se"],["そ","so"],
  ["た","ta"],["ち","chi"],["つ","tsu"],["て","te"],["と","to"],
  ["な","na"],["に","ni"],["ぬ","nu"],["ね","ne"],["の","no"],
  ["は","ha"],["ひ","hi"],["ふ","fu"],["へ","he"],["ほ","ho"],
  ["ま","ma"],["み","mi"],["む","mu"],["め","me"],["も","mo"],
  ["や","ya"],["ゆ","yu"],["よ","yo"],
  ["ら","ra"],["り","ri"],["る","ru"],["れ","re"],["ろ","ro"],
  ["わ","wa"],["を","wo"],["ん","n"],
];
const KATAKANA: Array<[string, string]> = [
  ["ア","a"],["イ","i"],["ウ","u"],["エ","e"],["オ","o"],
  ["カ","ka"],["キ","ki"],["ク","ku"],["ケ","ke"],["コ","ko"],
  ["サ","sa"],["シ","shi"],["ス","su"],["セ","se"],["ソ","so"],
  ["タ","ta"],["チ","chi"],["ツ","tsu"],["テ","te"],["ト","to"],
  ["ナ","na"],["ニ","ni"],["ヌ","nu"],["ネ","ne"],["ノ","no"],
  ["ハ","ha"],["ヒ","hi"],["フ","fu"],["ヘ","he"],["ホ","ho"],
  ["マ","ma"],["ミ","mi"],["ム","mu"],["メ","me"],["モ","mo"],
  ["ヤ","ya"],["ユ","yu"],["ヨ","yo"],
  ["ラ","ra"],["リ","ri"],["ル","ru"],["レ","re"],["ロ","ro"],
  ["ワ","wa"],["ヲ","wo"],["ン","n"],
];

interface Phrase { jp: string; romaji: string; vi: string; en: string; }

const GREETINGS: Phrase[] = [
  { jp: "おはようございます。", romaji: "Ohayō gozaimasu.", vi: "Chào buổi sáng.", en: "Good morning." },
  { jp: "こんにちは。", romaji: "Konnichiwa.", vi: "Xin chào (ban ngày).", en: "Hello / Good afternoon." },
  { jp: "こんばんは。", romaji: "Konbanwa.", vi: "Chào buổi tối.", en: "Good evening." },
  { jp: "おやすみなさい。", romaji: "Oyasuminasai.", vi: "Chúc ngủ ngon.", en: "Good night." },
  { jp: "さようなら。", romaji: "Sayōnara.", vi: "Tạm biệt.", en: "Goodbye." },
  { jp: "またあした。", romaji: "Mata ashita.", vi: "Hẹn gặp lại ngày mai.", en: "See you tomorrow." },
  { jp: "ありがとうございます。", romaji: "Arigatō gozaimasu.", vi: "Cảm ơn.", en: "Thank you." },
  { jp: "すみません。", romaji: "Sumimasen.", vi: "Xin lỗi / Xin phép.", en: "Excuse me / Sorry." },
  { jp: "ごめんなさい。", romaji: "Gomen nasai.", vi: "Xin lỗi.", en: "I'm sorry." },
  { jp: "はじめまして。", romaji: "Hajimemashite.", vi: "Rất vui được gặp bạn.", en: "Nice to meet you." },
  { jp: "わたしはハイです。", romaji: "Watashi wa Hai desu.", vi: "Tôi là Hải.", en: "I am Hai." },
  { jp: "よろしくおねがいします。", romaji: "Yoroshiku onegaishimasu.", vi: "Rất mong được giúp đỡ.", en: "Pleased to meet you." },
  { jp: "おげんきですか。", romaji: "Ogenki desu ka.", vi: "Bạn khỏe không?", en: "How are you?" },
  { jp: "はい、げんきです。", romaji: "Hai, genki desu.", vi: "Vâng, tôi khỏe.", en: "Yes, I'm fine." },
  { jp: "いってきます。", romaji: "Ittekimasu.", vi: "Tôi đi đây.", en: "I'm heading out." },
];

const NUMBERS_1_10: Array<[number, string, string]> = [
  [1,"いち","ichi"],[2,"に","ni"],[3,"さん","san"],[4,"よん / し","yon / shi"],[5,"ご","go"],
  [6,"ろく","roku"],[7,"なな / しち","nana / shichi"],[8,"はち","hachi"],[9,"きゅう / く","kyū / ku"],[10,"じゅう","jū"],
];
const NUMBERS_BIG: Array<[string, string, string]> = [
  ["11","じゅういち","jū-ichi"],["20","にじゅう","ni-jū"],["30","さんじゅう","san-jū"],
  ["50","ごじゅう","go-jū"],["100","ひゃく","hyaku"],["1000","せん","sen"],["10000","まん","man"],
];
const TIME_WORDS: Phrase[] = [
  { jp: "いま なんじですか。", romaji: "Ima nan-ji desu ka.", vi: "Bây giờ là mấy giờ?", en: "What time is it?" },
  { jp: "しちじです。", romaji: "Shichi-ji desu.", vi: "Bảy giờ.", en: "It's 7 o'clock." },
  { jp: "きょうは げつようびです。", romaji: "Kyō wa getsuyōbi desu.", vi: "Hôm nay là thứ Hai.", en: "Today is Monday." },
  { jp: "あした、あいましょう。", romaji: "Ashita, aimashō.", vi: "Ngày mai gặp nhé.", en: "Let's meet tomorrow." },
];

const VOCAB: Array<{ topic: string; items: Phrase[] }> = [
  { topic: "👨‍👩‍👧 Gia đình / Family", items: [
    { jp: "かぞく", romaji: "kazoku", vi: "gia đình", en: "family" },
    { jp: "ちち", romaji: "chichi", vi: "bố (nhà mình)", en: "father" },
    { jp: "はは", romaji: "haha", vi: "mẹ (nhà mình)", en: "mother" },
    { jp: "あに", romaji: "ani", vi: "anh trai", en: "older brother" },
    { jp: "あね", romaji: "ane", vi: "chị gái", en: "older sister" },
    { jp: "おとうと", romaji: "otōto", vi: "em trai", en: "younger brother" },
    { jp: "いもうと", romaji: "imōto", vi: "em gái", en: "younger sister" },
    { jp: "こども", romaji: "kodomo", vi: "trẻ con", en: "child" },
  ]},
  { topic: "🏠 Đồ vật hằng ngày / Everyday items", items: [
    { jp: "ほん", romaji: "hon", vi: "sách", en: "book" },
    { jp: "つくえ", romaji: "tsukue", vi: "bàn", en: "desk" },
    { jp: "いす", romaji: "isu", vi: "ghế", en: "chair" },
    { jp: "でんわ", romaji: "denwa", vi: "điện thoại", en: "phone" },
    { jp: "みず", romaji: "mizu", vi: "nước", en: "water" },
    { jp: "ごはん", romaji: "gohan", vi: "cơm / bữa ăn", en: "rice / meal" },
    { jp: "がっこう", romaji: "gakkō", vi: "trường học", en: "school" },
    { jp: "うち", romaji: "uchi", vi: "nhà", en: "home" },
  ]},
  { topic: "🎯 Động từ cơ bản / Basic verbs", items: [
    { jp: "たべます", romaji: "tabemasu", vi: "ăn", en: "to eat" },
    { jp: "のみます", romaji: "nomimasu", vi: "uống", en: "to drink" },
    { jp: "いきます", romaji: "ikimasu", vi: "đi", en: "to go" },
    { jp: "きます", romaji: "kimasu", vi: "đến", en: "to come" },
    { jp: "みます", romaji: "mimasu", vi: "xem / nhìn", en: "to watch / look" },
    { jp: "よみます", romaji: "yomimasu", vi: "đọc", en: "to read" },
    { jp: "かきます", romaji: "kakimasu", vi: "viết", en: "to write" },
    { jp: "べんきょうします", romaji: "benkyō shimasu", vi: "học", en: "to study" },
  ]},
  { topic: "🎨 Tính từ / Adjectives", items: [
    { jp: "おおきい", romaji: "ōkii", vi: "to, lớn", en: "big" },
    { jp: "ちいさい", romaji: "chiisai", vi: "nhỏ", en: "small" },
    { jp: "たかい", romaji: "takai", vi: "cao / đắt", en: "tall / expensive" },
    { jp: "やすい", romaji: "yasui", vi: "rẻ", en: "cheap" },
    { jp: "おいしい", romaji: "oishii", vi: "ngon", en: "delicious" },
    { jp: "げんき", romaji: "genki", vi: "khỏe mạnh", en: "energetic / well" },
    { jp: "しずか", romaji: "shizuka", vi: "yên tĩnh", en: "quiet" },
    { jp: "きれい", romaji: "kirei", vi: "đẹp / sạch", en: "beautiful / clean" },
  ]},
  { topic: "🌈 Màu sắc / Colors", items: [
    { jp: "あか", romaji: "aka", vi: "màu đỏ", en: "red" },
    { jp: "あお", romaji: "ao", vi: "màu xanh dương", en: "blue" },
    { jp: "みどり", romaji: "midori", vi: "màu xanh lá", en: "green" },
    { jp: "きいろ", romaji: "kiiro", vi: "màu vàng", en: "yellow" },
    { jp: "しろ", romaji: "shiro", vi: "màu trắng", en: "white" },
    { jp: "くろ", romaji: "kuro", vi: "màu đen", en: "black" },
    { jp: "ちゃいろ", romaji: "chairo", vi: "màu nâu", en: "brown" },
    { jp: "ピンク", romaji: "pinku", vi: "màu hồng", en: "pink" },
  ]},
  { topic: "🍣 Đồ ăn - Thức uống / Food & Drink", items: [
    { jp: "すし", romaji: "sushi", vi: "sushi", en: "sushi" },
    { jp: "ラーメン", romaji: "rāmen", vi: "mì ramen", en: "ramen" },
    { jp: "パン", romaji: "pan", vi: "bánh mì", en: "bread" },
    { jp: "たまご", romaji: "tamago", vi: "trứng", en: "egg" },
    { jp: "にく", romaji: "niku", vi: "thịt", en: "meat" },
    { jp: "さかな", romaji: "sakana", vi: "cá", en: "fish" },
    { jp: "おちゃ", romaji: "ocha", vi: "trà", en: "tea" },
    { jp: "コーヒー", romaji: "kōhī", vi: "cà phê", en: "coffee" },
  ]},
  { topic: "📅 Ngày trong tuần / Days of the week", items: [
    { jp: "げつようび", romaji: "getsuyōbi", vi: "thứ Hai", en: "Monday" },
    { jp: "かようび", romaji: "kayōbi", vi: "thứ Ba", en: "Tuesday" },
    { jp: "すいようび", romaji: "suiyōbi", vi: "thứ Tư", en: "Wednesday" },
    { jp: "もくようび", romaji: "mokuyōbi", vi: "thứ Năm", en: "Thursday" },
    { jp: "きんようび", romaji: "kinyōbi", vi: "thứ Sáu", en: "Friday" },
    { jp: "どようび", romaji: "doyōbi", vi: "thứ Bảy", en: "Saturday" },
    { jp: "にちようび", romaji: "nichiyōbi", vi: "chủ nhật", en: "Sunday" },
    { jp: "しゅうまつ", romaji: "shūmatsu", vi: "cuối tuần", en: "weekend" },
  ]},
  { topic: "🌤️ Thời tiết / Weather", items: [
    { jp: "はれ", romaji: "hare", vi: "trời nắng", en: "sunny" },
    { jp: "くもり", romaji: "kumori", vi: "trời nhiều mây", en: "cloudy" },
    { jp: "あめ", romaji: "ame", vi: "mưa", en: "rain" },
    { jp: "ゆき", romaji: "yuki", vi: "tuyết", en: "snow" },
    { jp: "かぜ", romaji: "kaze", vi: "gió", en: "wind" },
    { jp: "あつい", romaji: "atsui", vi: "nóng", en: "hot" },
    { jp: "さむい", romaji: "samui", vi: "lạnh", en: "cold" },
    { jp: "すずしい", romaji: "suzushii", vi: "mát mẻ", en: "cool" },
  ]},
  { topic: "🏙️ Địa điểm / Places", items: [
    { jp: "えき", romaji: "eki", vi: "nhà ga", en: "station" },
    { jp: "びょういん", romaji: "byōin", vi: "bệnh viện", en: "hospital" },
    { jp: "ぎんこう", romaji: "ginkō", vi: "ngân hàng", en: "bank" },
    { jp: "ゆうびんきょく", romaji: "yūbinkyoku", vi: "bưu điện", en: "post office" },
    { jp: "こうえん", romaji: "kōen", vi: "công viên", en: "park" },
    { jp: "みせ", romaji: "mise", vi: "cửa hàng", en: "shop" },
    { jp: "としょかん", romaji: "toshokan", vi: "thư viện", en: "library" },
    { jp: "レストラン", romaji: "resutoran", vi: "nhà hàng", en: "restaurant" },
  ]},
];

// Kanji cơ bản N5 với âm on / kun và nghĩa
const KANJI_BASIC: Array<{ kanji: string; on: string; kun: string; meaning_vi: string; meaning_en: string; example: string }> = [
  { kanji: "日", on: "ニチ / ジツ", kun: "ひ / -び", meaning_vi: "ngày, mặt trời", meaning_en: "day, sun", example: "日本 (Nihon - Nhật Bản)" },
  { kanji: "月", on: "ゲツ / ガツ", kun: "つき", meaning_vi: "tháng, mặt trăng", meaning_en: "month, moon", example: "月曜日 (getsuyōbi - thứ Hai)" },
  { kanji: "火", on: "カ", kun: "ひ", meaning_vi: "lửa", meaning_en: "fire", example: "火よう日 (kayōbi - thứ Ba)" },
  { kanji: "水", on: "スイ", kun: "みず", meaning_vi: "nước", meaning_en: "water", example: "水を のむ (mizu o nomu - uống nước)" },
  { kanji: "人", on: "ジン / ニン", kun: "ひと", meaning_vi: "người", meaning_en: "person", example: "日本人 (Nihonjin - người Nhật)" },
  { kanji: "山", on: "サン", kun: "やま", meaning_vi: "núi", meaning_en: "mountain", example: "富士山 (Fujisan - núi Phú Sĩ)" },
  { kanji: "口", on: "コウ", kun: "くち", meaning_vi: "miệng", meaning_en: "mouth", example: "入口 (iriguchi - lối vào)" },
  { kanji: "大", on: "ダイ / タイ", kun: "おおきい", meaning_vi: "to, lớn", meaning_en: "big", example: "大学 (daigaku - đại học)" },
  { kanji: "小", on: "ショウ", kun: "ちいさい", meaning_vi: "nhỏ", meaning_en: "small", example: "小学校 (shōgakkō - tiểu học)" },
  { kanji: "年", on: "ネン", kun: "とし", meaning_vi: "năm", meaning_en: "year", example: "今年 (kotoshi - năm nay)" },
  { kanji: "学", on: "ガク", kun: "まなぶ", meaning_vi: "học", meaning_en: "study", example: "学生 (gakusei - học sinh)" },
  { kanji: "生", on: "セイ", kun: "いきる", meaning_vi: "sinh, sống", meaning_en: "life, birth", example: "先生 (sensei - giáo viên)" },
];

// Hội thoại N5 - Interactive Dialogues
const DIALOGUES: Array<{ title: string; scene: string; lines: Array<{ speaker: string; jp: string; romaji: string; vi: string; en: string }> }> = [
  {
    title: "🤝 Chào hỏi lần đầu / First meeting",
    scene: "Hai người mới gặp nhau tại trường.",
    lines: [
      { speaker: "A", jp: "はじめまして。たなかです。", romaji: "Hajimemashite. Tanaka desu.", vi: "Xin chào lần đầu. Tôi là Tanaka.", en: "Nice to meet you. I'm Tanaka." },
      { speaker: "B", jp: "はじめまして。ハイです。ベトナムじんです。", romaji: "Hajimemashite. Hai desu. Betonamu-jin desu.", vi: "Xin chào. Tôi là Hải. Tôi là người Việt Nam.", en: "Nice to meet you. I'm Hai. I'm Vietnamese." },
      { speaker: "A", jp: "よろしくおねがいします。", romaji: "Yoroshiku onegaishimasu.", vi: "Rất mong được giúp đỡ.", en: "Pleased to meet you." },
      { speaker: "B", jp: "こちらこそ よろしくおねがいします。", romaji: "Kochira koso yoroshiku onegaishimasu.", vi: "Tôi cũng vậy, rất mong được giúp đỡ.", en: "Likewise, pleased to meet you." },
    ],
  },
  {
    title: "☕ Ở quán cà phê / At the café",
    scene: "Gọi đồ uống tại quán.",
    lines: [
      { speaker: "店員", jp: "いらっしゃいませ。", romaji: "Irasshaimase.", vi: "Xin mời quý khách.", en: "Welcome." },
      { speaker: "客", jp: "コーヒーを ひとつ ください。", romaji: "Kōhī o hitotsu kudasai.", vi: "Cho tôi một ly cà phê.", en: "One coffee, please." },
      { speaker: "店員", jp: "はい、500えんです。", romaji: "Hai, gohyaku-en desu.", vi: "Vâng, 500 yên.", en: "Sure, that's 500 yen." },
      { speaker: "客", jp: "はい、どうぞ。", romaji: "Hai, dōzo.", vi: "Đây ạ.", en: "Here you are." },
      { speaker: "店員", jp: "ありがとうございました。", romaji: "Arigatō gozaimashita.", vi: "Xin cảm ơn.", en: "Thank you very much." },
    ],
  },
  {
    title: "🚉 Hỏi đường / Asking for directions",
    scene: "Hỏi đường đến nhà ga.",
    lines: [
      { speaker: "A", jp: "すみません、えきは どこですか。", romaji: "Sumimasen, eki wa doko desu ka.", vi: "Xin lỗi, nhà ga ở đâu ạ?", en: "Excuse me, where is the station?" },
      { speaker: "B", jp: "まっすぐ いって、みぎに まがってください。", romaji: "Massugu itte, migi ni magatte kudasai.", vi: "Đi thẳng rồi rẽ phải.", en: "Go straight and turn right." },
      { speaker: "A", jp: "とおいですか。", romaji: "Tōi desu ka.", vi: "Có xa không ạ?", en: "Is it far?" },
      { speaker: "B", jp: "いいえ、ちかいです。あるいて 5ふんです。", romaji: "Iie, chikai desu. Aruite go-fun desu.", vi: "Không, gần thôi. Đi bộ 5 phút.", en: "No, close. Five minutes on foot." },
      { speaker: "A", jp: "どうも ありがとうございます。", romaji: "Dōmo arigatō gozaimasu.", vi: "Cảm ơn nhiều ạ.", en: "Thank you very much." },
    ],
  },
  {
    title: "🍜 Ở nhà hàng / At the restaurant",
    scene: "Gọi món tại nhà hàng ramen.",
    lines: [
      { speaker: "店員", jp: "ごちゅうもんは？", romaji: "Go-chūmon wa?", vi: "Quý khách gọi món gì ạ?", en: "What would you like to order?" },
      { speaker: "客", jp: "しおラーメンを ひとつ おねがいします。", romaji: "Shio-rāmen o hitotsu onegaishimasu.", vi: "Cho tôi một tô ramen muối.", en: "One salt ramen, please." },
      { speaker: "店員", jp: "おのみものは いかがですか。", romaji: "O-nomimono wa ikaga desu ka.", vi: "Quý khách dùng nước gì ạ?", en: "Would you like a drink?" },
      { speaker: "客", jp: "みずを おねがいします。", romaji: "Mizu o onegaishimasu.", vi: "Cho tôi nước lọc.", en: "Water, please." },
      { speaker: "客", jp: "いただきます！", romaji: "Itadakimasu!", vi: "Xin phép dùng bữa!", en: "Let's eat!" },
    ],
  },
  {
    title: "📞 Cuộc gọi điện thoại / A phone call",
    scene: "Gọi cho bạn để rủ đi chơi.",
    lines: [
      { speaker: "A", jp: "もしもし、ハイさんですか。", romaji: "Moshi moshi, Hai-san desu ka.", vi: "Alo, anh Hải phải không ạ?", en: "Hello, is this Hai?" },
      { speaker: "B", jp: "はい、そうです。", romaji: "Hai, sō desu.", vi: "Vâng, đúng rồi.", en: "Yes, speaking." },
      { speaker: "A", jp: "あした、いっしょに えいがを みませんか。", romaji: "Ashita, issho ni eiga o mimasen ka.", vi: "Ngày mai đi xem phim cùng nhau nhé?", en: "Would you like to watch a movie tomorrow?" },
      { speaker: "B", jp: "いいですね。なんじに あいましょうか。", romaji: "Ii desu ne. Nan-ji ni aimashō ka.", vi: "Được đấy. Mấy giờ gặp nhỉ?", en: "Sounds good. What time shall we meet?" },
      { speaker: "A", jp: "ろくじに えきで あいましょう。", romaji: "Roku-ji ni eki de aimashō.", vi: "Gặp ở nhà ga lúc 6 giờ nhé.", en: "Let's meet at the station at 6." },
    ],
  },
  {
    title: "🛍️ Đi mua sắm / Shopping",
    scene: "Mua áo tại cửa hàng.",
    lines: [
      { speaker: "客", jp: "この シャツは いくらですか。", romaji: "Kono shatsu wa ikura desu ka.", vi: "Áo này bao nhiêu tiền?", en: "How much is this shirt?" },
      { speaker: "店員", jp: "3000えんです。", romaji: "San-zen-en desu.", vi: "3000 yên ạ.", en: "It's 3000 yen." },
      { speaker: "客", jp: "もう すこし ちいさいのは ありますか。", romaji: "Mō sukoshi chiisai no wa arimasu ka.", vi: "Có size nhỏ hơn một chút không?", en: "Do you have a slightly smaller size?" },
      { speaker: "店員", jp: "はい、こちらです。", romaji: "Hai, kochira desu.", vi: "Vâng, bên đây ạ.", en: "Yes, here it is." },
      { speaker: "客", jp: "これを ください。", romaji: "Kore o kudasai.", vi: "Cho tôi cái này.", en: "I'll take this one." },
    ],
  },
];

const GRAMMAR: Array<{ title: string; explain: string; examples: Phrase[] }> = [
  {
    title: "1. は (wa) - Trợ từ chủ đề",
    explain: "Đứng sau chủ đề của câu. Đọc là 'wa' dù viết là は. Dùng để giới thiệu điều bạn muốn nói tới.",
    examples: [
      { jp: "わたしは がくせいです。", romaji: "Watashi wa gakusei desu.", vi: "Tôi là học sinh.", en: "I am a student." },
      { jp: "これは ほんです。", romaji: "Kore wa hon desu.", vi: "Đây là quyển sách.", en: "This is a book." },
    ],
  },
  {
    title: "2. です / だ - Là / thì / ở",
    explain: "です là dạng lịch sự nghĩa 'là'. Phủ định: じゃありません. Quá khứ: でした.",
    examples: [
      { jp: "せんせいです。", romaji: "Sensei desu.", vi: "Là giáo viên.", en: "I am a teacher." },
      { jp: "がくせい じゃありません。", romaji: "Gakusei ja arimasen.", vi: "Không phải học sinh.", en: "Not a student." },
    ],
  },
  {
    title: "3. を (o) - Trợ từ tân ngữ",
    explain: "Đứng sau tân ngữ trực tiếp của động từ. Đọc là 'o'.",
    examples: [
      { jp: "ほんを よみます。", romaji: "Hon o yomimasu.", vi: "Đọc sách.", en: "I read a book." },
      { jp: "みずを のみます。", romaji: "Mizu o nomimasu.", vi: "Uống nước.", en: "I drink water." },
    ],
  },
  {
    title: "4. に / へ - Chỉ nơi đến, thời điểm",
    explain: "に chỉ thời điểm hoặc điểm đến; へ (đọc 'e') chỉ hướng di chuyển.",
    examples: [
      { jp: "がっこうに いきます。", romaji: "Gakkō ni ikimasu.", vi: "Tôi đến trường.", en: "I go to school." },
      { jp: "しちじに おきます。", romaji: "Shichi-ji ni okimasu.", vi: "Tôi dậy lúc 7 giờ.", en: "I wake up at 7." },
    ],
  },
  {
    title: "5. Dạng ます - Động từ lịch sự",
    explain: "Đuôi ます (masu) làm cho động từ lịch sự. Phủ định: ません. Quá khứ: ました / ませんでした.",
    examples: [
      { jp: "たべます。", romaji: "Tabemasu.", vi: "Tôi ăn.", en: "I eat." },
      { jp: "たべませんでした。", romaji: "Tabemasen deshita.", vi: "Tôi đã không ăn.", en: "I did not eat." },
    ],
  },
  {
    title: "6. Thì hiện tại / quá khứ đơn",
    explain: "Tiếng Nhật không phân biệt hiện tại và tương lai. Quá khứ chỉ đổi đuôi động từ (~ました) hoặc です → でした.",
    examples: [
      { jp: "きのう べんきょうしました。", romaji: "Kinō benkyō shimashita.", vi: "Hôm qua tôi đã học.", en: "I studied yesterday." },
      { jp: "あした いきます。", romaji: "Ashita ikimasu.", vi: "Ngày mai tôi sẽ đi.", en: "I will go tomorrow." },
    ],
  },
  {
    title: "7. の - Trợ từ sở hữu / bổ nghĩa",
    explain: "Nối hai danh từ, danh từ đứng trước bổ nghĩa cho danh từ đứng sau. Giống 'của' trong tiếng Việt.",
    examples: [
      { jp: "わたしの ほんです。", romaji: "Watashi no hon desu.", vi: "Là sách của tôi.", en: "It's my book." },
      { jp: "にほんごの せんせい", romaji: "Nihongo no sensei", vi: "giáo viên tiếng Nhật", en: "Japanese teacher" },
    ],
  },
  {
    title: "8. も - Cũng",
    explain: "Thay thế は khi muốn nói 'cũng vậy'.",
    examples: [
      { jp: "わたしも がくせいです。", romaji: "Watashi mo gakusei desu.", vi: "Tôi cũng là học sinh.", en: "I am also a student." },
      { jp: "コーヒーも おねがいします。", romaji: "Kōhī mo onegaishimasu.", vi: "Cho tôi cả cà phê nữa.", en: "Coffee too, please." },
    ],
  },
  {
    title: "9. で - Nơi diễn ra hành động / phương tiện",
    explain: "Chỉ nơi hành động xảy ra (khác với に - điểm đến), hoặc chỉ phương tiện di chuyển.",
    examples: [
      { jp: "レストランで たべます。", romaji: "Resutoran de tabemasu.", vi: "Ăn ở nhà hàng.", en: "I eat at a restaurant." },
      { jp: "でんしゃで いきます。", romaji: "Densha de ikimasu.", vi: "Đi bằng tàu điện.", en: "I go by train." },
    ],
  },
  {
    title: "10. Tính từ い / な",
    explain: "Có 2 loại tính từ: い-tính từ (kết thúc bằng い như おおきい) và な-tính từ (cần thêm な khi bổ nghĩa như きれいな).",
    examples: [
      { jp: "おおきい いえ", romaji: "Ōkii ie", vi: "ngôi nhà lớn", en: "a big house" },
      { jp: "きれいな はな", romaji: "Kirei na hana", vi: "bông hoa đẹp", en: "a pretty flower" },
    ],
  },
  {
    title: "11. ~たい - Muốn làm gì",
    explain: "Bỏ ます của động từ, thêm たい để diễn tả nguyện vọng của bản thân.",
    examples: [
      { jp: "にほんに いきたいです。", romaji: "Nihon ni ikitai desu.", vi: "Tôi muốn đi Nhật.", en: "I want to go to Japan." },
      { jp: "すしを たべたいです。", romaji: "Sushi o tabetai desu.", vi: "Tôi muốn ăn sushi.", en: "I want to eat sushi." },
    ],
  },
  {
    title: "12. ~てください - Xin hãy làm gì",
    explain: "Dùng để yêu cầu lịch sự. Cần chia động từ về dạng て trước.",
    examples: [
      { jp: "みてください。", romaji: "Mite kudasai.", vi: "Xin hãy xem.", en: "Please look." },
      { jp: "ここに かいてください。", romaji: "Koko ni kaite kudasai.", vi: "Xin hãy viết vào đây.", en: "Please write here." },
    ],
  },
];


// ---------- Merged (base + expansion) datasets ----------
/** Keep the first occurrence of every key so merged packs never show duplicates. */
function dedupeBy<T>(items: T[], key: (it: T) => string): T[] {
  const seen = new Set<string>();
  return items.filter((it) => {
    const k = key(it);
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

const ALL_GREETINGS: Phrase[] = dedupeBy([...GREETINGS, ...GREETINGS_EXTRA], (p) => p.jp);

/** Vocabulary topics merged, then de-duplicated word by word across every topic. */
const ALL_VOCAB = (() => {
  const seen = new Set<string>();
  return [...VOCAB, ...VOCAB_EXTRA, ...VOCAB_TOPICS.map((g) => ({ topic: g.topic, items: g.items })), ...VOCAB_EXTRA_2, ...VOCAB_EXTRA_3]
    .map((g) => ({
      topic: g.topic,
      items: g.items.filter((p) => {
        if (seen.has(p.jp)) return false;
        seen.add(p.jp);
        return true;
      }),
    }))
    .filter((g) => g.items.length > 0);
})();

/** Japanese word -> phrase, used by the memory brain tooltips. */
const JA_WORD_INDEX = new Map<string, Phrase>(
  ALL_VOCAB.flatMap((g) => g.items.map((p) => [p.jp, p] as [string, Phrase]))
);
const ALL_DIALOGUES = dedupeBy([...DIALOGUES, ...DIALOGUES_EXTRA, ...DIALOGUES_EXTRA_2, ...DIALOGUES_EXTRA_3], (d) => d.title);
const ALL_GRAMMAR = dedupeBy([...GRAMMAR, ...GRAMMAR_EXTRA, ...GRAMMAR_EXTRA_2, ...GRAMMAR_EXTRA_3], (g) => g.title);
const ALL_QUIZ = dedupeBy([...JA_QUIZ, ...JA_QUIZ_EXTRA, ...JA_QUIZ_EXTRA_2, ...JA_QUIZ_EXTRA_3], (q) => q.q);

/** Kana tables, one collapsible section each. */
const KANA_TABLES: Array<{ vi: string; en: string; rows: Array<[string, string]> }> = [
  { vi: "Hiragana (ひらがな)", en: "Hiragana (ひらがな)", rows: HIRAGANA },
  { vi: "Hiragana biến âm (だくてん)", en: "Hiragana voiced (dakuten)", rows: HIRAGANA_DAKUTEN },
  { vi: "Hiragana ghép âm (ようおん)", en: "Hiragana contracted (yōon)", rows: HIRAGANA_YOON },
  { vi: "Katakana (カタカナ)", en: "Katakana (カタカナ)", rows: KATAKANA },
  { vi: "Katakana biến âm (ダクテン)", en: "Katakana voiced (dakuten)", rows: KATAKANA_DAKUTEN },
];

interface KanjiCard {
  kanji: string; on: string; kun: string;
  meaning_vi: string; meaning_en: string; example: string;
}

/** Kanji grouped by theme, each character shown only once across all groups. */
const KANJI_SECTIONS: Array<{ group: string; items: KanjiCard[] }> = (() => {
  const seen = new Set<string>();
  return [
    { group: "🈴 Kanji cốt lõi N5 / Core N5 kanji", items: KANJI_BASIC },
    { group: "➕ Kanji mở rộng / Extra kanji", items: KANJI_EXTRA },
    ...KANJI_GROUPS.map((g) => ({ group: g.group, items: g.items as KanjiCard[] })),
    { group: "🖌️ Kanji động từ & sinh hoạt / Verb & daily-life kanji", items: KANJI_EXTRA_2 },
  ]
    .map((g) => ({
      group: g.group,
      items: g.items.filter((k) => {
        if (seen.has(k.kanji)) return false;
        seen.add(k.kanji);
        return true;
      }),
    }))
    .filter((g) => g.items.length > 0);
})();

const ALL_KANJI = KANJI_SECTIONS.flatMap((g) => g.items);


const KanaGrid = ({ rows }: { rows: Array<[string, string]> }) => (
  <div>
    <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-2">
      {rows.map(([ch, ro]) => (
        <button
          key={ch}
          onClick={() => speakJa(ch)}
          className="rounded-lg border border-pink-200 bg-white hover:bg-pink-50 hover:border-pink-400 p-3 text-center transition shadow-sm"
        >
          <div className="text-2xl font-bold text-slate-800">{ch}</div>
          <div className="text-xs text-slate-500 mt-1">{ro}</div>
        </button>
      ))}
    </div>
  </div>
);

const PhraseRow = ({
  p,
  lang,
  mastered,
  onToggleMastered,
  onListen,
}: {
  p: Phrase;
  lang: "vi" | "en";
  /** When defined, a star toggle is shown so the word feeds the memory brain. */
  mastered?: boolean;
  onToggleMastered?: () => void;
  /** Listening to a mastered word counts as a review (shadowing practice). */
  onListen?: () => void;
}) => (
  <div className="flex items-start justify-between gap-3 py-3 border-b border-pink-100 last:border-0">
    <div className="flex-1 min-w-0">
      <div className="text-lg font-semibold text-slate-800">{p.jp}</div>
      <div className="text-sm text-pink-700 italic">{p.romaji}</div>
      <div className="text-sm text-slate-600 mt-1">{lang === "vi" ? p.vi : p.en}</div>
    </div>
    <div className="flex shrink-0 items-center gap-2">
      {onToggleMastered && (
        <Button
          size="sm"
          variant="outline"
          onClick={onToggleMastered}
          aria-label={mastered ? "Remove from mastered" : "Mark as mastered"}
          className={mastered ? "border-amber-300 bg-amber-50 text-amber-600" : ""}
        >
          <Star className={`h-4 w-4 ${mastered ? "fill-amber-400 text-amber-500" : ""}`} />
        </Button>
      )}
      <Button size="sm" variant="outline" onClick={() => { speakJa(p.jp); onListen?.(); }}>
        <Volume2 className="h-4 w-4" />
      </Button>
    </div>
  </div>
);

// ---------- Page ----------
const Japanese = () => {
  const [quizPicks, setQuizPicks] = useState<Record<number, number>>({});
  const { mastered, toggle: toggleMastered } = useMasteredVocab("japanese");
  /** Words already credited with a review this session (no double counting). */
  const jaReviewedRef = useRef<Set<string>>(new Set());
  const { lang, t } = useLanguage();
  const [params, setParams] = useSearchParams();
  const initialTab = params.get("tab") || "overview";
  const [tab, setTab] = useState(initialTab);
  const [dueToday, setDueToday] = useState(() => countDue(loadSrs("japanese")));
  useEffect(() => {
    const id = window.setInterval(() => setDueToday(countDue(loadSrs("japanese"))), 5000);
    return () => window.clearInterval(id);
  }, []);
  /** All Japanese phrases, shared by Word Quest and Daily Mission. */
  const jaQuestWords = useMemo(
    () => ALL_VOCAB.flatMap((g) => g.items.map((p) => japaneseToQuest(p, { category: g.topic }))),
    []
  );

  useEffect(() => { setTab(params.get("tab") || "overview"); }, [params]);

  const handleTab = (v: string) => {
    setTab(v);
    if (v === "overview") setParams({}); else setParams({ tab: v });
  };

  // Warm up voices (Chrome loads voices asynchronously)
  useEffect(() => {
    const s = window.speechSynthesis;
    if (s) { s.getVoices(); s.onvoiceschanged = () => s.getVoices(); }
  }, []);

  const uiLang: "vi" | "en" = lang === "vi" ? "vi" : "en";

  const totalVocab = ALL_VOCAB.reduce((n, g) => n + g.items.length, 0);

  const chunk = <T,>(arr: T[], size: number): T[][] => {
    const out: T[][] = [];
    for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
    return out;
  };

  // ----- Section models (memo-free: data is static module scope) -----
  const kanaSections: JaSectionItem[] = KANA_TABLES.map((tb, i) => ({
    id: `kana-${i}`,
    title: t(tb.vi, tb.en),
    badge: `${tb.rows.length} ${t("chữ", "chars")}`,
    render: () => <KanaGrid rows={tb.rows} />,
  }));

  const greetingSections: JaSectionItem[] = chunk(ALL_GREETINGS, 10).map((part, i) => ({
    id: `greet-${i}`,
    title: `${t("Nhóm", "Set")} ${i + 1}`,
    subtitle: part[0].jp,
    badge: `${part.length} ${t("câu", "phrases")}`,
    searchText: part.map((p) => `${p.jp} ${p.romaji} ${p.vi} ${p.en}`).join(" ").toLowerCase(),
    render: () => (
      <div className="divide-y divide-pink-100">
        {part.map((p, j) => <PhraseRow key={j} p={p} lang={uiLang} />)}
      </div>
    ),
  }));

  const numberSections: JaSectionItem[] = [
    {
      id: "num-small",
      title: `🔢 ${t("Số 1-10", "Numbers 1-10")}`,
      badge: `${NUMBERS_1_10.length}`,
      render: () => (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {NUMBERS_1_10.map(([n, kana, ro]) => (
            <button key={n} onClick={() => speakJa(kana.split(" ")[0])}
              className="rounded-lg border border-pink-200 bg-white p-3 text-center transition hover:bg-pink-50">
              <div className="text-2xl font-bold text-rose-700">{n}</div>
              <div className="text-base">{kana}</div>
              <div className="text-xs text-slate-500">{ro}</div>
            </button>
          ))}
        </div>
      ),
    },
    {
      id: "num-big",
      title: `💯 ${t("Số lớn hơn", "Larger numbers")}`,
      badge: `${NUMBERS_BIG.length}`,
      render: () => (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {NUMBERS_BIG.map(([n, kana, ro]) => (
            <button key={n} onClick={() => speakJa(kana)}
              className="rounded-lg border border-pink-200 bg-white p-3 text-center transition hover:bg-pink-50">
              <div className="text-xl font-bold text-rose-700">{n}</div>
              <div className="text-base">{kana}</div>
              <div className="text-xs text-slate-500">{ro}</div>
            </button>
          ))}
        </div>
      ),
    },
    {
      id: "num-time",
      title: `🕒 ${t("Nói giờ & ngày", "Time & date")}`,
      badge: `${TIME_WORDS.length}`,
      render: () => (
        <div className="divide-y divide-pink-100">
          {TIME_WORDS.map((p, i) => <PhraseRow key={i} p={p} lang={uiLang} />)}
        </div>
      ),
    },
    ...COUNTERS.map((c, i) => ({
      id: `counter-${i}`,
      title: c.title,
      subtitle: uiLang === "vi" ? c.note_vi : c.note_en,
      badge: `${c.items.length}`,
      render: () => (
        <div className="divide-y divide-pink-100">
          {c.items.map((p, j) => <PhraseRow key={j} p={p} lang={uiLang} />)}
        </div>
      ),
    })),
  ];

  const vocabSections: JaSectionItem[] = ALL_VOCAB.map((group, i) => {
    const learned = group.items.filter((p) => mastered.has(p.jp)).length;
    return {
      id: `vocab-${i}`,
      title: group.topic,
      badge: `${learned}/${group.items.length} ⭐`,
      searchText: group.items
        .map((p) => `${p.jp} ${p.romaji} ${p.vi} ${p.en}`)
        .join(" ")
        .toLowerCase(),
      render: () => (
        <div className="divide-y divide-pink-100">
          {group.items.map((p, j) => (
            <PhraseRow
              key={j}
              p={p}
              lang={uiLang}
              mastered={mastered.has(p.jp)}
              onToggleMastered={() => toggleMastered(p.jp)}
              onListen={() => {
                // Listening to a word already marked ⭐ counts as a real repetition.
                if (!mastered.has(p.jp) || jaReviewedRef.current.has(p.jp)) return;
                jaReviewedRef.current.add(p.jp);
                void recordVocabReviewTracked("japanese", [p.jp]);
              }}
            />
          ))}
        </div>
      ),
    };
  });

  const kanjiSections: JaSectionItem[] = KANJI_SECTIONS.map((g, i) => ({
    id: `kanji-${i}`,
    title: g.group,
    badge: `${g.items.length} ${t("chữ", "chars")}`,
    searchText: g.items
      .map((k) => `${k.kanji} ${k.on} ${k.kun} ${k.meaning_vi} ${k.meaning_en}`)
      .join(" ")
      .toLowerCase(),
    render: () => (
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {g.items.map((k) => (
          <button
            key={`${g.group}-${k.kanji}`}
            onClick={() => speakJa(k.kanji)}
            className="flex items-start gap-3 rounded-lg border border-pink-200 bg-white p-3 text-left transition hover:bg-pink-50"
          >
            <div className="w-14 shrink-0 text-center text-4xl font-bold text-rose-700">{k.kanji}</div>
            <div className="min-w-0 flex-1">
              <div className="text-base font-semibold text-slate-800">
                {uiLang === "vi" ? k.meaning_vi : k.meaning_en}
              </div>
              <div className="mt-1 text-sm text-slate-600">
                <span className="font-semibold">On:</span> {k.on}
                <span className="mx-2">·</span>
                <span className="font-semibold">Kun:</span> {k.kun}
              </div>
              <div className="mt-1 text-sm italic text-pink-700">{k.example}</div>
            </div>
          </button>
        ))}
      </div>
    ),
  }));

  const dialogueSections: JaSectionItem[] = ALL_DIALOGUES.map((d, i) => ({
    id: `dlg-${i}`,
    title: d.title,
    subtitle: d.scene,
    badge: `${d.lines.length} ${t("lượt", "lines")}`,
    searchText: `${d.title} ${d.scene} ${d.lines.map((l) => `${l.jp} ${l.romaji}`).join(" ")}`.toLowerCase(),
    render: () => (
      <div className="space-y-3">
        {d.lines.map((ln, j) => (
          <div key={j} className="flex items-start gap-3 rounded-lg border border-pink-100 bg-pink-50/60 p-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 to-pink-500 text-sm font-bold text-white">
              {ln.speaker}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-base font-semibold text-slate-800">{ln.jp}</div>
              <div className="text-sm italic text-pink-700">{ln.romaji}</div>
              <div className="mt-1 text-sm text-slate-600">{uiLang === "vi" ? ln.vi : ln.en}</div>
            </div>
            <Button size="sm" variant="outline" onClick={() => speakJa(ln.jp)} className="shrink-0">
              <Volume2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    ),
  }));

  const grammarSections: JaSectionItem[] = ALL_GRAMMAR.map((g, i) => ({
    id: `gr-${i}`,
    title: g.title,
    subtitle: g.explain.length > 90 ? `${g.explain.slice(0, 90)}...` : g.explain,
    badge: `${g.examples.length} ${t("ví dụ", "examples")}`,
    searchText: `${g.title} ${g.explain}`.toLowerCase(),
    render: () => (
      <>
        <p className="mb-3 text-base leading-relaxed text-slate-700">{g.explain}</p>
        <div className="divide-y divide-pink-100">
          {g.examples.map((p, j) => <PhraseRow key={j} p={p} lang={uiLang} />)}
        </div>
      </>
    ),
  }));

  const quizSections: JaSectionItem[] = chunk(ALL_QUIZ, 10).map((part, gi) => {
    const offset = gi * 10;
    const answered = part.filter((_, j) => quizPicks[offset + j] !== undefined).length;
    const correct = part.filter((q, j) => quizPicks[offset + j] === q.answer).length;
    return {
      id: `quiz-${gi}`,
      title: `${t("Bộ", "Set")} ${gi + 1} · ${t("câu", "Q")} ${offset + 1}-${offset + part.length}`,
      subtitle:
        answered > 0
          ? `${t("Đã làm", "Answered")} ${answered}/${part.length} · ${t("đúng", "correct")} ${correct}`
          : t("Chưa làm", "Not started"),
      badge: `${part.length} ${t("câu", "Q")}`,
      render: () => (
        <div className="space-y-4">
          {part.map((q, j) => {
            const idx = offset + j;
            return (
              <div key={idx} className="rounded-lg border border-pink-200 bg-white p-4">
                <div className="mb-2 text-base font-semibold text-slate-800">{idx + 1}. {q.q}</div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {q.options.map((op, oi) => (
                    <button
                      key={oi}
                      onClick={() => setQuizPicks((prev) => ({ ...prev, [idx]: oi }))}
                      className={`rounded-md border p-2 text-left text-base transition ${
                        quizPicks[idx] === oi
                          ? oi === q.answer
                            ? "border-emerald-400 bg-emerald-50 text-emerald-800"
                            : "border-rose-400 bg-rose-50 text-rose-800"
                          : "border-pink-200 bg-white hover:bg-pink-50"
                      }`}
                    >
                      {op}
                    </button>
                  ))}
                </div>
                {quizPicks[idx] !== undefined && (
                  <p className="mt-2 text-base text-slate-700">
                    {quizPicks[idx] === q.answer ? "✅ " : "❌ "}
                    {uiLang === "vi" ? q.explain_vi : q.explain_en}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      ),
    };
  });

  const STATS = [
    { icon: "🈶", n: KANA_TABLES.reduce((s, k) => s + k.rows.length, 0), label: t("chữ kana", "kana") },
    { icon: "📖", n: totalVocab, label: t("từ vựng", "words") },
    { icon: "🈴", n: ALL_KANJI.length, label: t("kanji", "kanji") },
    { icon: "🗣️", n: ALL_DIALOGUES.length, label: t("hội thoại", "dialogues") },
    { icon: "✍️", n: ALL_GRAMMAR.length, label: t("ngữ pháp", "grammar") },
    { icon: "🧠", n: ALL_QUIZ.length, label: t("câu ôn tập", "quiz Qs") },
  ];

  const TABS: Array<[string, string]> = [
    ["overview", `🌸 ${t("Tổng quan", "Overview")}`],
    ["kana", `🈶 ${t("Bảng chữ", "Kana")}`],
    ["greetings", `💬 ${t("Chào hỏi", "Greetings")}`],
    ["numbers", `🔢 ${t("Số & Giờ", "Numbers")}`],
    ["vocab", `📖 ${t("Từ vựng", "Vocabulary")}`],
    ["kanji", `🈴 ${t("Kanji", "Kanji")}`],
    ["dialogues", `🗣️ ${t("Hội thoại", "Dialogues")}`],
    ["grammar", `✍️ ${t("Ngữ pháp", "Grammar")}`],
    ["listening", `🎧 ${t("Luyện nghe", "Listening")}`],
    ["dictation", `⌨️ ${t("Chính tả kana", "Kana Dictation")}`],
    ["flashcards", `🃏 ${t("Flashcard", "Flashcards")}`],
    ["jlpt", `📝 ${t("Đề JLPT", "JLPT Tests")}`],
    ["culture", `🎎 ${t("Văn hoá & Du học", "Culture & Study Abroad")}`],
    ["speaking", `🎤 ${t("Speaking Coach", "Speaking Coach")}`],
    ["quest", `✨ Word Quest`],
    ["mission", `🎯 ${t("Nhiệm vụ", "Daily Mission")}${dueToday > 0 ? ` (${dueToday})` : ""}`],
    ["quiz", `🧠 ${t("Ôn tập", "Quiz")}`],
  ];

  const sectionLabels = {
    expand: t("Mở tất cả", "Expand all"),
    collapse: t("Thu gọn", "Collapse"),
    empty: t("Không tìm thấy nội dung.", "Nothing found."),
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">
      <FloatingJapaneseIcons />
      <Navbar />
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 text-white">
        <div className="relative mx-auto max-w-6xl px-4 py-8 md:py-10">
          <div className="mb-1 text-5xl">🌸</div>
          <h1 className="mb-1 text-3xl font-extrabold md:text-4xl">
            {t("Học Tiếng Nhật (N5 - N3)", "Learn Japanese (N5 - N3)")}
          </h1>
          <p className="max-w-2xl text-base text-white/90">
            {t(
              "Kana, từ vựng, kanji, hội thoại và ngữ pháp - bấm bất kỳ chữ nào để nghe phát âm.",
              "Kana, vocabulary, kanji, dialogues and grammar - tap any word to hear it spoken."
            )}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {STATS.map((s) => (
              <span key={s.label} className="rounded-full bg-white/15 px-3 py-1 text-sm font-semibold backdrop-blur">
                {s.icon} {s.n} {s.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-6 md:py-8">
        <Tabs value={tab} onValueChange={handleTab}>
          <div className="-mx-4 overflow-x-auto px-4 pb-1 md:mx-0 md:px-0">
            <TabsList className="inline-flex h-auto w-max gap-1.5 rounded-xl bg-white/70 p-1.5 shadow-sm ring-1 ring-pink-200 backdrop-blur md:w-full md:flex-wrap">
              {TABS.map(([v, label]) => (
                <TabsTrigger
                  key={v}
                  value={v}
                  className="whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold text-rose-700/80 data-[state=active]:bg-gradient-to-r data-[state=active]:from-rose-500 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow"
                >
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="overview" className="mt-6">
            <Card className="space-y-5 border-pink-200 p-6">
              <h2 className="text-2xl font-bold text-rose-700">
                {t("Chào mừng đến với Tiếng Nhật!", "Welcome to Japanese!")}
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { n: 1, icon: "🈶", vi: "Học Hiragana & Katakana", en: "Master Hiragana & Katakana" },
                  { n: 2, icon: "💬", vi: "Chào hỏi, số đếm, giờ - ngày", en: "Greetings, numbers, time" },
                  { n: 3, icon: "📖", vi: "Từ vựng theo chủ đề + kanji", en: "Topic vocabulary + kanji" },
                  { n: 4, icon: "🗣️", vi: "Hội thoại, ngữ pháp, luyện nói", en: "Dialogues, grammar, speaking" },
                ].map((s) => (
                  <div key={s.n} className="rounded-xl border border-pink-200 bg-pink-50/70 p-4">
                    <div className="text-2xl">{s.icon}</div>
                    <div className="mt-1 text-sm font-bold text-rose-600">
                      {t("Bước", "Step")} {s.n}
                    </div>
                    <div className="text-base font-semibold text-slate-800">{t(s.vi, s.en)}</div>
                  </div>
                ))}
              </div>
              <p className="text-base leading-relaxed text-slate-700">
                {t(
                  `Mỗi ngày 20 phút theo 4 bước trên. Toàn bộ khoá hiện có ${totalVocab} từ vựng, ${ALL_KANJI.length} kanji, ${ALL_DIALOGUES.length} đoạn hội thoại, ${ALL_GRAMMAR.length} điểm ngữ pháp và ${ALL_QUIZ.length} câu ôn tập.`,
                  `Twenty minutes a day through the four steps above. The course now holds ${totalVocab} words, ${ALL_KANJI.length} kanji, ${ALL_DIALOGUES.length} dialogues, ${ALL_GRAMMAR.length} grammar points and ${ALL_QUIZ.length} quiz questions.`
                )}
              </p>
              <div className="flex flex-wrap gap-2">
                {TABS.slice(1).map(([v, label]) => (
                  <Button
                    key={v}
                    size="sm"
                    variant="outline"
                    className="border-pink-200 bg-white text-rose-700 hover:bg-pink-50 hover:text-rose-800"
                    onClick={() => handleTab(v)}
                  >
                    {label}
                  </Button>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="kana" className="mt-6">
            <JaSection items={kanaSections} labels={sectionLabels} />
          </TabsContent>

          <TabsContent value="greetings" className="mt-6">
            <JaSection
              items={greetingSections}
              labels={sectionLabels}
              searchPlaceholder={t("Tìm câu chào hỏi...", "Search greetings...")}
            />
          </TabsContent>

          <TabsContent value="numbers" className="mt-6">
            <JaSection items={numberSections} labels={sectionLabels} />
          </TabsContent>

          {/* Word Quest + Daily Mission — forceMount keeps progress across tab switches */}
          <TabsContent value="quest" forceMount className={tab === "quest" ? "mt-6" : "hidden"}>
            <WordQuest
              words={jaQuestWords}
              allWords={jaQuestWords}
              t={t}
              storageKey="japanese_word_quest_v1"
              speak={(text) => speakJa(text)}
              typingLabel={{ vi: "Gõ romaji của từ có nghĩa:", en: "Type the romaji of the word meaning:" }}
              onWordLearned={(w) => { if (!mastered.has(w)) toggleMastered(w); }}
            />
          </TabsContent>
          <TabsContent value="mission" forceMount className={tab === "mission" ? "mt-6" : "hidden"}>
            <DailyWordMission
              bank={jaQuestWords}
              allWords={jaQuestWords}
              t={t}
              subject="japanese"
              speak={(text) => speakJa(text)}
              onWordMastered={(w) => { if (!mastered.has(w)) toggleMastered(w); }}
            />
          </TabsContent>

          <TabsContent value="vocab" className="mt-6 space-y-5">
            <Card className="border-pink-200 bg-white/80 p-4 text-base text-slate-700">
              {t(
                `Bấm ⭐ để đánh dấu từ đã nhớ. Bạn đã nhớ ${mastered.size} từ - các từ này sẽ sáng lên trong Bộ não từ vựng 3D ở cuối trang.`,
                `Tap ⭐ to mark a word as mastered. You have ${mastered.size} mastered words - they light up the 3D vocabulary brain at the bottom of this page.`
              )}
            </Card>
            <JaSection
              items={vocabSections}
              labels={sectionLabels}
              searchPlaceholder={t("Tìm từ (kana, romaji, nghĩa)...", "Search words (kana, romaji, meaning)...")}
            />

            {/* 3D memory brain for Japanese vocabulary */}
            <Suspense fallback={<div className="h-40 animate-pulse rounded-xl bg-pink-50" />}>
              <VocabBrainPanel
                subject="japanese"
                localWords={[...mastered]}
                t={t}
                lookupWord={(word) => {
                  const found = JA_WORD_INDEX.get(word);
                  if (!found) return null;
                  return {
                    word: found.jp,
                    phonetic: found.romaji,
                    definitionVi: found.vi,
                    definitionEn: found.en,
                  };
                }}
                speak={speakJa}
                milestones={JA_MILESTONES}
                onPractice={() => {
                  handleTab("quiz");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            </Suspense>
          </TabsContent>

          <TabsContent value="kanji" className="mt-6 space-y-4">
            <Card className="border-pink-200 bg-white/80 p-4 text-base text-slate-700">
              {t(
                "Kanji có 2 cách đọc: âm On (gốc Hán) và âm Kun (thuần Nhật). Bấm vào chữ để nghe phát âm.",
                "Each kanji has two readings: On (Sino-Japanese) and Kun (native). Tap a character to hear it."
              )}
            </Card>
            <JaSection
              items={kanjiSections}
              labels={sectionLabels}
              searchPlaceholder={t("Tìm kanji hoặc nghĩa...", "Search kanji or meaning...")}
            />
          </TabsContent>

          <TabsContent value="dialogues" className="mt-6">
            <JaSection
              items={dialogueSections}
              labels={sectionLabels}
              searchPlaceholder={t("Tìm hội thoại theo tình huống...", "Search dialogues by situation...")}
            />
          </TabsContent>

          <TabsContent value="grammar" className="mt-6">
            <JaSection
              items={grammarSections}
              labels={sectionLabels}
              searchPlaceholder={t("Tìm điểm ngữ pháp...", "Search grammar points...")}
            />
          </TabsContent>

          <TabsContent value="listening" className="mt-6">

            <Suspense fallback={<div className="p-6 text-base text-slate-600">...</div>}>

              <JapaneseListening t={t} lang={lang} speak={speakJa} />

            </Suspense>

          </TabsContent>


          <TabsContent value="dictation" className="mt-6">

            <Suspense fallback={<div className="p-6 text-base text-slate-600">...</div>}>

              <JapaneseDictation t={t} lang={lang} speak={speakJa} />

            </Suspense>

          </TabsContent>


          <TabsContent value="flashcards" className="mt-6">

            <Suspense fallback={<div className="p-6 text-base text-slate-600">...</div>}>

              <JapaneseFlashcards

                t={t}

                lang={lang}

                speak={speakJa}

                vocab={ALL_VOCAB.flatMap((g) => g.items).map((p) => ({

                  key: p.jp,

                  front: p.jp,

                  reading: p.romaji,

                  vi: p.vi,

                  en: p.en,

                }))}

                kanji={ALL_KANJI.map((k: any) => ({

                  key: k.kanji,

                  front: k.kanji,

                  reading: `On: ${k.on} / Kun: ${k.kun}`,

                  vi: k.meaning_vi,

                  en: k.meaning_en,

                  extra: k.example,

                }))}

              />

            </Suspense>

          </TabsContent>


          <TabsContent value="jlpt" className="mt-6">

            <Suspense fallback={<div className="p-6 text-base text-slate-600">...</div>}>

              <JapaneseJlpt t={t} lang={lang} />

            </Suspense>

          </TabsContent>


          <TabsContent value="culture" className="mt-6">

            <Suspense fallback={<div className="p-6 text-base text-slate-600">...</div>}>

              <JapaneseCulture t={t} lang={lang} speak={speakJa} />

            </Suspense>

          </TabsContent>


          <TabsContent value="speaking" className="mt-6">
            <Suspense fallback={<div className="p-6 text-base text-slate-600">{t("Đang tải...", "Loading...")}</div>}>
              <JapaneseSpeakingCoach language="japanese" />
            </Suspense>
          </TabsContent>

          <TabsContent value="quiz" className="mt-6">
            <JaSection items={quizSections} labels={sectionLabels} />
          </TabsContent>
        </Tabs>
      </div>
      <section className="container mx-auto px-4 sm:px-6 pb-12">
        <PlacementCta subject="japanese" />
      </section>
      <Footer />
    </div>
  );
};

export default Japanese;
