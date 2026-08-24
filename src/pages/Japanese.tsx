/**
 * @file Japanese.tsx
 * @description Basic Japanese learning hub (N5) — Kana, Greetings, Numbers, Vocab, Grammar.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { useSearchParams } from "react-router-dom";
import { Volume2, Star } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  HIRAGANA_DAKUTEN, HIRAGANA_YOON, KATAKANA_DAKUTEN,
  GREETINGS_EXTRA, COUNTERS, VOCAB_EXTRA, KANJI_EXTRA,
  DIALOGUES_EXTRA, GRAMMAR_EXTRA, JA_QUIZ,
} from "@/data/japaneseExpansion";
import { JA_QUIZ_EXTRA } from "@/data/japanese/quizBank";
import { VOCAB_TOPICS } from "@/data/japanese/vocab";
import { KANJI_GROUPS } from "@/data/japanese/kanji";
import { useMasteredVocab } from "@/hooks/useMasteredVocab";
import { recordVocabReviewTracked } from "@/lib/vocabReview";

const VocabBrainPanel = lazy(() => import("@/components/vocab/VocabBrainPanel"));
const JapaneseSpeakingCoach = lazy(() => import("@/components/AISpeakingCoach"));
const JA_MILESTONES = [
  { words: 100, band: "JLPT N5" },
  { words: 300, band: "N5+" },
  { words: 600, band: "JLPT N4" },
  { words: 1000, band: "N4+" },
];

// ---------- TTS ----------
function speakJa(text: string) {
  try {
    const s = window.speechSynthesis;
    if (!s) return;
    s.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "ja-JP";
    u.rate = 0.85;
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
    title: "1. は (wa) — Trợ từ chủ đề",
    explain: "Đứng sau chủ đề của câu. Đọc là 'wa' dù viết là は. Dùng để giới thiệu điều bạn muốn nói tới.",
    examples: [
      { jp: "わたしは がくせいです。", romaji: "Watashi wa gakusei desu.", vi: "Tôi là học sinh.", en: "I am a student." },
      { jp: "これは ほんです。", romaji: "Kore wa hon desu.", vi: "Đây là quyển sách.", en: "This is a book." },
    ],
  },
  {
    title: "2. です / だ — Là / thì / ở",
    explain: "です là dạng lịch sự nghĩa 'là'. Phủ định: じゃありません. Quá khứ: でした.",
    examples: [
      { jp: "せんせいです。", romaji: "Sensei desu.", vi: "Là giáo viên.", en: "I am a teacher." },
      { jp: "がくせい じゃありません。", romaji: "Gakusei ja arimasen.", vi: "Không phải học sinh.", en: "Not a student." },
    ],
  },
  {
    title: "3. を (o) — Trợ từ tân ngữ",
    explain: "Đứng sau tân ngữ trực tiếp của động từ. Đọc là 'o'.",
    examples: [
      { jp: "ほんを よみます。", romaji: "Hon o yomimasu.", vi: "Đọc sách.", en: "I read a book." },
      { jp: "みずを のみます。", romaji: "Mizu o nomimasu.", vi: "Uống nước.", en: "I drink water." },
    ],
  },
  {
    title: "4. に / へ — Chỉ nơi đến, thời điểm",
    explain: "に chỉ thời điểm hoặc điểm đến; へ (đọc 'e') chỉ hướng di chuyển.",
    examples: [
      { jp: "がっこうに いきます。", romaji: "Gakkō ni ikimasu.", vi: "Tôi đến trường.", en: "I go to school." },
      { jp: "しちじに おきます。", romaji: "Shichi-ji ni okimasu.", vi: "Tôi dậy lúc 7 giờ.", en: "I wake up at 7." },
    ],
  },
  {
    title: "5. Dạng ます — Động từ lịch sự",
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
    title: "7. の — Trợ từ sở hữu / bổ nghĩa",
    explain: "Nối hai danh từ, danh từ đứng trước bổ nghĩa cho danh từ đứng sau. Giống 'của' trong tiếng Việt.",
    examples: [
      { jp: "わたしの ほんです。", romaji: "Watashi no hon desu.", vi: "Là sách của tôi.", en: "It's my book." },
      { jp: "にほんごの せんせい", romaji: "Nihongo no sensei", vi: "giáo viên tiếng Nhật", en: "Japanese teacher" },
    ],
  },
  {
    title: "8. も — Cũng",
    explain: "Thay thế は khi muốn nói 'cũng vậy'.",
    examples: [
      { jp: "わたしも がくせいです。", romaji: "Watashi mo gakusei desu.", vi: "Tôi cũng là học sinh.", en: "I am also a student." },
      { jp: "コーヒーも おねがいします。", romaji: "Kōhī mo onegaishimasu.", vi: "Cho tôi cả cà phê nữa.", en: "Coffee too, please." },
    ],
  },
  {
    title: "9. で — Nơi diễn ra hành động / phương tiện",
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
    title: "11. ~たい — Muốn làm gì",
    explain: "Bỏ ます của động từ, thêm たい để diễn tả nguyện vọng của bản thân.",
    examples: [
      { jp: "にほんに いきたいです。", romaji: "Nihon ni ikitai desu.", vi: "Tôi muốn đi Nhật.", en: "I want to go to Japan." },
      { jp: "すしを たべたいです。", romaji: "Sushi o tabetai desu.", vi: "Tôi muốn ăn sushi.", en: "I want to eat sushi." },
    ],
  },
  {
    title: "12. ~てください — Xin hãy làm gì",
    explain: "Dùng để yêu cầu lịch sự. Cần chia động từ về dạng て trước.",
    examples: [
      { jp: "みてください。", romaji: "Mite kudasai.", vi: "Xin hãy xem.", en: "Please look." },
      { jp: "ここに かいてください。", romaji: "Koko ni kaite kudasai.", vi: "Xin hãy viết vào đây.", en: "Please write here." },
    ],
  },
];


// ---------- UI helpers ----------
// ---------- Merged (base + expansion) datasets ----------
const ALL_GREETINGS: Phrase[] = [...GREETINGS, ...GREETINGS_EXTRA];
const ALL_VOCAB = [...VOCAB, ...VOCAB_EXTRA, ...VOCAB_TOPICS.map((g) => ({ topic: g.topic, items: g.items }))];

/** Japanese word -> phrase, used by the memory brain tooltips. */
const JA_WORD_INDEX = new Map<string, Phrase>(
  ALL_VOCAB.flatMap((g) => g.items.map((p) => [p.jp, p] as [string, Phrase]))
);
const ALL_KANJI = [...KANJI_BASIC, ...KANJI_EXTRA, ...KANJI_GROUPS.flatMap((g) => g.items)];
const ALL_DIALOGUES = [...DIALOGUES, ...DIALOGUES_EXTRA];
const ALL_GRAMMAR = [...GRAMMAR, ...GRAMMAR_EXTRA];
const ALL_QUIZ = [...JA_QUIZ, ...JA_QUIZ_EXTRA];

const KanaGrid = ({ rows, label }: { rows: Array<[string, string]>; label: string }) => (
  <div>
    <h3 className="text-xl font-bold mb-3 text-pink-700">{label}</h3>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">
      <Navbar />
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 text-white">

        <div className="max-w-6xl mx-auto px-4 py-12 relative">
          <div className="text-6xl mb-2">🌸</div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
            {t("Học Tiếng Nhật cơ bản (N5)", "Learn Basic Japanese (N5)")}
          </h1>
          <p className="text-white/90 max-w-2xl">
            {t(
              "Kana, chào hỏi, số đếm, từ vựng và ngữ pháp N5 — bấm bất kỳ chữ nào để nghe phát âm.",
              "Kana, greetings, numbers, N5 vocabulary and grammar — click any word to hear it spoken."
            )}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <Tabs value={tab} onValueChange={handleTab}>
          <TabsList className="flex flex-wrap h-auto gap-2 bg-pink-100/60 p-2">
            <TabsTrigger value="overview">🌸 {t("Tổng quan", "Overview")}</TabsTrigger>
            <TabsTrigger value="kana">🈶 {t("Bảng chữ", "Kana")}</TabsTrigger>
            <TabsTrigger value="greetings">💬 {t("Chào hỏi", "Greetings")}</TabsTrigger>
            <TabsTrigger value="numbers">🔢 {t("Số & Giờ", "Numbers")}</TabsTrigger>
            <TabsTrigger value="vocab">📖 {t("Từ vựng", "Vocabulary")}</TabsTrigger>
            <TabsTrigger value="kanji">🈴 {t("Kanji cơ bản", "Basic Kanji")}</TabsTrigger>
            <TabsTrigger value="dialogues">🗣️ {t("Hội thoại", "Dialogues")}</TabsTrigger>
            <TabsTrigger value="grammar">✍️ {t("Ngữ pháp", "Grammar")}</TabsTrigger>
            <TabsTrigger value="speaking">🎤 {t("Speaking Coach", "Speaking Coach")}</TabsTrigger>
            <TabsTrigger value="quiz">🧠 {t("Ôn tập", "Quiz")}</TabsTrigger>
          </TabsList>


          <TabsContent value="overview" className="mt-6">
            <Card className="p-6 space-y-4">
              <h2 className="text-2xl font-bold text-rose-700">
                {t("Chào mừng đến với Tiếng Nhật!", "Welcome to Japanese!")}
              </h2>
              <p className="text-slate-700 leading-relaxed">
                {t(
                  "Lộ trình đề xuất: Hiragana → Katakana → 15 câu chào hỏi → số đếm → 56 từ N5 (8 chủ đề) → 12 Kanji cốt lõi → 6 hội thoại thực tế → 12 điểm ngữ pháp. Mỗi ngày 20 phút, sau 3 tuần bạn có thể tự giới thiệu, gọi món và hỏi đường.",
                  "Suggested roadmap: Hiragana → Katakana → 15 greetings → numbers → 56 N5 words across 8 topics → 12 essential Kanji → 6 real-life dialogues → 12 grammar points. Twenty minutes a day gets you self-introducing, ordering food and asking directions in 3 weeks."
                )}
              </p>
              <ul className="grid md:grid-cols-2 gap-3 text-sm">
                <li className="p-3 bg-pink-50 rounded-lg border border-pink-200">🈶 {t("46 chữ Hiragana + 46 Katakana", "46 Hiragana + 46 Katakana characters")}</li>
                <li className="p-3 bg-pink-50 rounded-lg border border-pink-200">💬 {t("15 câu chào hỏi thực dụng", "15 practical greetings")}</li>
                <li className="p-3 bg-pink-50 rounded-lg border border-pink-200">🔢 {t("Số đếm 1–10.000 & cách hỏi giờ", "Numbers 1–10,000 & telling time")}</li>
                <li className="p-3 bg-pink-50 rounded-lg border border-pink-200">📖 {t("56 từ vựng N5 · 8 chủ đề (màu sắc, thức ăn, ngày, thời tiết, địa điểm...)", "56 N5 words · 8 topics (colors, food, days, weather, places...)")}</li>
                <li className="p-3 bg-pink-50 rounded-lg border border-pink-200">🈴 {t("12 Kanji cốt lõi kèm âm On / Kun", "12 essential Kanji with On / Kun readings")}</li>
                <li className="p-3 bg-pink-50 rounded-lg border border-pink-200">🗣️ {t("6 đoạn hội thoại thực tế (nhà hàng, mua sắm, hỏi đường...)", "6 real-life dialogues (restaurant, shopping, directions...)")}</li>
                <li className="p-3 bg-pink-50 rounded-lg border border-pink-200">✍️ {t("12 điểm ngữ pháp N5 cốt lõi", "12 core N5 grammar points")}</li>
                <li className="p-3 bg-pink-50 rounded-lg border border-pink-200">🔊 {t("Nghe phát âm bằng 1 cú click", "One-click pronunciation")}</li>
              </ul>

            </Card>
          </TabsContent>

          <TabsContent value="kana" className="mt-6 space-y-6">
            <Card className="p-6"><KanaGrid rows={HIRAGANA} label={t("Hiragana (ひらがな)", "Hiragana (ひらがな)")} /></Card>
            <Card className="p-6"><KanaGrid rows={HIRAGANA_DAKUTEN} label={t("Hiragana biến âm (だくてん)", "Hiragana voiced (dakuten)")} /></Card>
            <Card className="p-6"><KanaGrid rows={HIRAGANA_YOON} label={t("Hiragana ghép âm (ようおん)", "Hiragana contracted (yōon)")} /></Card>
            <Card className="p-6"><KanaGrid rows={KATAKANA} label={t("Katakana (カタカナ)", "Katakana (カタカナ)")} /></Card>
            <Card className="p-6"><KanaGrid rows={KATAKANA_DAKUTEN} label={t("Katakana biến âm (ダクテン)", "Katakana voiced (dakuten)")} /></Card>
          </TabsContent>

          <TabsContent value="greetings" className="mt-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-3 text-rose-700">💬 {t(`${ALL_GREETINGS.length} câu chào hỏi & giao tiếp cơ bản`, `${ALL_GREETINGS.length} everyday greetings & phrases`)}</h3>
              <div className="divide-y divide-pink-100">
                {ALL_GREETINGS.map((p, i) => <PhraseRow key={i} p={p} lang={uiLang} />)}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="numbers" className="mt-6 space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-3 text-rose-700">🔢 {t("Số 1–10", "Numbers 1–10")}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {NUMBERS_1_10.map(([n, kana, ro]) => (
                  <button key={n} onClick={() => speakJa(kana.split(" ")[0])}
                    className="rounded-lg border border-pink-200 bg-white hover:bg-pink-50 p-3 text-center transition">
                    <div className="text-2xl font-bold text-rose-700">{n}</div>
                    <div className="text-base">{kana}</div>
                    <div className="text-xs text-slate-500">{ro}</div>
                  </button>
                ))}
              </div>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-3 text-rose-700">{t("Số lớn hơn", "Larger numbers")}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {NUMBERS_BIG.map(([n, kana, ro]) => (
                  <button key={n} onClick={() => speakJa(kana)}
                    className="rounded-lg border border-pink-200 bg-white hover:bg-pink-50 p-3 text-center transition">
                    <div className="text-xl font-bold text-rose-700">{n}</div>
                    <div className="text-base">{kana}</div>
                    <div className="text-xs text-slate-500">{ro}</div>
                  </button>
                ))}
              </div>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-3 text-rose-700">🕒 {t("Nói giờ & ngày", "Time & date")}</h3>
              <div className="divide-y divide-pink-100">
                {TIME_WORDS.map((p, i) => <PhraseRow key={i} p={p} lang={uiLang} />)}
              </div>
            </Card>
            {COUNTERS.map((c) => (
              <Card key={c.title} className="p-6">
                <h3 className="text-xl font-bold mb-1 text-rose-700">{c.title}</h3>
                <p className="text-sm text-slate-600 mb-3">{uiLang === "vi" ? c.note_vi : c.note_en}</p>
                <div className="divide-y divide-pink-100">
                  {c.items.map((p, i) => <PhraseRow key={i} p={p} lang={uiLang} />)}
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="vocab" className="mt-6 space-y-6">
            <p className="text-sm text-slate-600">
              {t(
                `Bấm ⭐ để đánh dấu từ đã nhớ. Bạn đã nhớ ${mastered.size} từ - các từ này sẽ sáng lên trong Bộ não từ vựng 3D ở cuối trang.`,
                `Tap ⭐ to mark a word as mastered. You have ${mastered.size} mastered words - they light up the 3D vocabulary brain at the bottom of this page.`
              )}
            </p>
            {ALL_VOCAB.map(group => (
              <Card key={group.topic} className="p-6">
                <h3 className="text-xl font-bold mb-3 text-rose-700">{group.topic}</h3>
                <div className="divide-y divide-pink-100">
                  {group.items.map((p, i) => (
                    <PhraseRow
                      key={i}
                      p={p}
                      lang={uiLang}
                      mastered={mastered.has(p.jp)}
                      onToggleMastered={() => toggleMastered(p.jp)}
                      onListen={() => {
                        // Listening to a word you already marked ⭐ is a real
                        // repetition, so it consolidates in the memory brain.
                        if (!mastered.has(p.jp) || jaReviewedRef.current.has(p.jp)) return;
                        jaReviewedRef.current.add(p.jp);
                        void recordVocabReviewTracked("japanese", [p.jp]);
                      }}
                    />
                  ))}
                </div>
              </Card>
            ))}

            {/* 3D memory brain for Japanese vocabulary */}
            <Suspense fallback={<div className="h-40 rounded-xl bg-pink-50 animate-pulse" />}>
              <VocabBrainPanel
                subject="japanese"
                localWords={[...mastered]}
                t={t}
                lookupWord={(w) => {
                  const found = JA_WORD_INDEX.get(w);
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

          <TabsContent value="kanji" className="mt-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-2 text-rose-700">🈴 {t(`${ALL_KANJI.length} Kanji cốt lõi N5`, `${ALL_KANJI.length} essential N5 Kanji`)}</h3>
              <p className="text-sm text-slate-600 mb-4">
                {t(
                  "Kanji có 2 cách đọc: âm On (từ gốc Hán) và âm Kun (thuần Nhật). Bấm để nghe phát âm.",
                  "Each Kanji has two readings: On (Sino-Japanese) and Kun (native). Click to hear it."
                )}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {ALL_KANJI.map((k) => (
                  <button
                    key={k.kanji}
                    onClick={() => speakJa(k.kanji)}
                    className="flex items-start gap-3 rounded-lg border border-pink-200 bg-white hover:bg-pink-50 p-3 text-left transition"
                  >
                    <div className="text-4xl font-bold text-rose-700 shrink-0 w-14 text-center">{k.kanji}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-slate-800">
                        {uiLang === "vi" ? k.meaning_vi : k.meaning_en}
                      </div>
                      <div className="text-xs text-slate-600 mt-1">
                        <span className="font-semibold">On:</span> {k.on}
                        <span className="mx-2">·</span>
                        <span className="font-semibold">Kun:</span> {k.kun}
                      </div>
                      <div className="text-xs text-pink-700 mt-1 italic">{k.example}</div>
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="dialogues" className="mt-6 space-y-6">
            {ALL_DIALOGUES.map((d, i) => (
              <Card key={i} className="p-6">
                <h3 className="text-xl font-bold text-rose-700 mb-1">{d.title}</h3>
                <p className="text-sm text-slate-600 italic mb-4">{d.scene}</p>
                <div className="space-y-3">
                  {d.lines.map((ln, j) => (
                    <div key={j} className="flex items-start gap-3 p-3 rounded-lg bg-pink-50/60 border border-pink-100">
                      <div className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 text-white flex items-center justify-center font-bold">
                        {ln.speaker}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-base font-semibold text-slate-800">{ln.jp}</div>
                        <div className="text-sm text-pink-700 italic">{ln.romaji}</div>
                        <div className="text-sm text-slate-600 mt-1">{uiLang === "vi" ? ln.vi : ln.en}</div>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => speakJa(ln.jp)} className="shrink-0">
                        <Volume2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </TabsContent>



          <TabsContent value="grammar" className="mt-6 space-y-4">
            {ALL_GRAMMAR.map((g, i) => (
              <Card key={i} className="p-6">
                <h3 className="text-lg font-bold text-rose-700 mb-2">{g.title}</h3>
                <p className="text-slate-700 mb-3">{g.explain}</p>
                <div className="divide-y divide-pink-100">
                  {g.examples.map((p, j) => <PhraseRow key={j} p={p} lang={uiLang} />)}
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="speaking" className="mt-6">
            <Suspense fallback={<div className="p-6 text-slate-600">{t("Đang tải...", "Loading...")}</div>}>
              <JapaneseSpeakingCoach language="japanese" />
            </Suspense>
          </TabsContent>

          <TabsContent value="quiz" className="mt-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-3 text-rose-700">🧠 {t(`Tự kiểm tra N5 - N4 (${ALL_QUIZ.length} câu)`, `N5 - N4 self-check (${ALL_QUIZ.length} questions)`)}</h3>
              <div className="space-y-5">
                {ALL_QUIZ.map((q, i) => (
                  <div key={i} className="rounded-lg border border-pink-200 bg-white p-4">
                    <div className="font-semibold text-slate-800 mb-2">{i + 1}. {q.q}</div>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {q.options.map((op, j) => (
                        <button
                          key={j}
                          onClick={() => setQuizPicks((prev) => ({ ...prev, [i]: j }))}
                          className={`rounded-md border p-2 text-left text-sm transition ${
                            quizPicks[i] === j
                              ? j === q.answer
                                ? "border-emerald-400 bg-emerald-50 text-emerald-800"
                                : "border-rose-400 bg-rose-50 text-rose-800"
                              : "border-pink-200 bg-white hover:bg-pink-50"
                          }`}
                        >
                          {op}
                        </button>
                      ))}
                    </div>
                    {quizPicks[i] !== undefined && (
                      <p className="mt-2 text-sm text-slate-700">
                        {quizPicks[i] === q.answer ? "✅ " : "❌ "}
                        {uiLang === "vi" ? q.explain_vi : q.explain_en}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default Japanese;
