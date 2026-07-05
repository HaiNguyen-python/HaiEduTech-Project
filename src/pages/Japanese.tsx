/**
 * @file Japanese.tsx
 * @description Basic Japanese learning hub (N5) — Kana, Greetings, Numbers, Vocab, Grammar.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Volume2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

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
];

// ---------- UI helpers ----------
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

const PhraseRow = ({ p, lang }: { p: Phrase; lang: "vi" | "en" }) => (
  <div className="flex items-start justify-between gap-3 py-3 border-b border-pink-100 last:border-0">
    <div className="flex-1 min-w-0">
      <div className="text-lg font-semibold text-slate-800">{p.jp}</div>
      <div className="text-sm text-pink-700 italic">{p.romaji}</div>
      <div className="text-sm text-slate-600 mt-1">{lang === "vi" ? p.vi : p.en}</div>
    </div>
    <Button size="sm" variant="outline" onClick={() => speakJa(p.jp)} className="shrink-0">
      <Volume2 className="h-4 w-4" />
    </Button>
  </div>
);

// ---------- Page ----------
const Japanese = () => {
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
            <TabsTrigger value="grammar">✍️ {t("Ngữ pháp", "Grammar")}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <Card className="p-6 space-y-4">
              <h2 className="text-2xl font-bold text-rose-700">
                {t("Chào mừng đến với Tiếng Nhật!", "Welcome to Japanese!")}
              </h2>
              <p className="text-slate-700 leading-relaxed">
                {t(
                  "Lộ trình đề xuất cho người mới: học Hiragana → Katakana → 15 câu chào hỏi → số đếm → 40 từ N5 → 6 điểm ngữ pháp cốt lõi. Mỗi ngày 20 phút là đủ để bạn tự giới thiệu bản thân trong 2 tuần.",
                  "Suggested roadmap: Hiragana → Katakana → 15 greetings → numbers → 40 N5 vocabulary → 6 core grammar points. Twenty minutes a day is enough to introduce yourself within two weeks."
                )}
              </p>
              <ul className="grid md:grid-cols-2 gap-3 text-sm">
                <li className="p-3 bg-pink-50 rounded-lg border border-pink-200">🈶 {t("46 chữ Hiragana + 46 Katakana", "46 Hiragana + 46 Katakana characters")}</li>
                <li className="p-3 bg-pink-50 rounded-lg border border-pink-200">💬 {t("15 câu chào hỏi thực dụng", "15 practical greetings")}</li>
                <li className="p-3 bg-pink-50 rounded-lg border border-pink-200">🔢 {t("Số đếm 1–10.000 & cách hỏi giờ", "Numbers 1–10,000 & telling time")}</li>
                <li className="p-3 bg-pink-50 rounded-lg border border-pink-200">📖 {t("32 từ vựng N5 theo chủ đề", "32 N5 words by topic")}</li>
                <li className="p-3 bg-pink-50 rounded-lg border border-pink-200">✍️ {t("6 điểm ngữ pháp N5 cốt lõi", "6 core N5 grammar points")}</li>
                <li className="p-3 bg-pink-50 rounded-lg border border-pink-200">🔊 {t("Nghe phát âm bằng 1 cú click", "One-click pronunciation")}</li>
              </ul>
            </Card>
          </TabsContent>

          <TabsContent value="kana" className="mt-6 space-y-6">
            <Card className="p-6"><KanaGrid rows={HIRAGANA} label={t("Hiragana (ひらがな)", "Hiragana (ひらがな)")} /></Card>
            <Card className="p-6"><KanaGrid rows={KATAKANA} label={t("Katakana (カタカナ)", "Katakana (カタカナ)")} /></Card>
          </TabsContent>

          <TabsContent value="greetings" className="mt-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-3 text-rose-700">💬 {t("15 câu chào hỏi cơ bản", "15 basic greetings")}</h3>
              <div className="divide-y divide-pink-100">
                {GREETINGS.map((p, i) => <PhraseRow key={i} p={p} lang={uiLang} />)}
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
          </TabsContent>

          <TabsContent value="vocab" className="mt-6 space-y-6">
            {VOCAB.map(group => (
              <Card key={group.topic} className="p-6">
                <h3 className="text-xl font-bold mb-3 text-rose-700">{group.topic}</h3>
                <div className="divide-y divide-pink-100">
                  {group.items.map((p, i) => <PhraseRow key={i} p={p} lang={uiLang} />)}
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="grammar" className="mt-6 space-y-4">
            {GRAMMAR.map((g, i) => (
              <Card key={i} className="p-6">
                <h3 className="text-lg font-bold text-rose-700 mb-2">{g.title}</h3>
                <p className="text-slate-700 mb-3">{g.explain}</p>
                <div className="divide-y divide-pink-100">
                  {g.examples.map((p, j) => <PhraseRow key={j} p={p} lang={uiLang} />)}
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Japanese;
