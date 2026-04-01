// YKI Finnish Prep Dashboard — Vocabulary, Grammar, Mock Exams with progress tracking
import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import {
  BookOpen, ChevronRight, ChevronLeft, Volume2, VolumeX,
  Clock, CheckCircle, Timer, Snowflake, Star, Mic, Square,
  Languages, Trophy, Flag,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import FinnishSkier from "@/components/FinnishSkier";
import FloatingFinnishDictionary from "@/components/FloatingFinnishDictionary";
import {
  finnishVocabModules,
  finnishVocabExpansionModules,
  finnishVocabExpansion2Modules,
  finnishLessonModules,
  finnishLessonExpansionModules,
  finnishMockExamModules,
  finnishMockExamExpansionModules,
  type FinnishModule,
  type FinnishLesson,
  type FinnishVocabEntry,
} from "@/data/finnishCurriculum";
import FinnishVocabExercises from "@/components/FinnishVocabExercises";

// Merge original + expansion data
const allVocabModules = [...finnishVocabModules, ...finnishVocabExpansionModules, ...finnishVocabExpansion2Modules];
const allMockExamModules = [...finnishMockExamModules, ...finnishMockExamExpansionModules];
const allLessonModules = [...finnishLessonModules, ...finnishLessonExpansionModules];

// Verb conjugation helper data
const VERB_CONJUGATIONS: Record<string, { present: string[]; past: string[] }> = {
  puhua: {
    present: ["puhun", "puhut", "puhuu", "puhumme", "puhutte", "puhuvat"],
    past: ["puhuin", "puhuit", "puhui", "puhuimme", "puhuitte", "puhuivat"],
  },
  syödä: {
    present: ["syön", "syöt", "syö", "syömme", "syötte", "syövät"],
    past: ["söin", "söit", "söi", "söimme", "söitte", "söivät"],
  },
  olla: {
    present: ["olen", "olet", "on", "olemme", "olette", "ovat"],
    past: ["olin", "olit", "oli", "olimme", "olitte", "olivat"],
  },
  mennä: {
    present: ["menen", "menet", "menee", "menemme", "menette", "menevät"],
    past: ["menin", "menit", "meni", "menimme", "menitte", "menivät"],
  },
  tulla: {
    present: ["tulen", "tulet", "tulee", "tulemme", "tulette", "tulevat"],
    past: ["tulin", "tulit", "tuli", "tulimme", "tulitte", "tulivat"],
  },
};

const PERSONS = ["minä", "sinä", "hän", "me", "te", "he"];

// Enhanced Finnish TTS — select best available Finnish voice
const speakFinnish = (text: string) => {
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "fi-FI";
  u.rate = 0.8;
  u.pitch = 1.0;
  // Try to find a proper Finnish voice
  const voices = window.speechSynthesis.getVoices();
  const finnishVoice = voices.find(v => v.lang === "fi-FI") 
    || voices.find(v => v.lang.startsWith("fi"))
    || voices.find(v => v.name.toLowerCase().includes("finnish"));
  if (finnishVoice) u.voice = finnishVoice;
  window.speechSynthesis.speak(u);
};

// Ensure voices are loaded for TTS
if (typeof window !== "undefined" && window.speechSynthesis) {
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
}

// Word-to-illustration emoji mapping for visual vocabulary cards
const WORD_ILLUSTRATIONS: Record<string, string> = {
  // Work & Professions
  lääkäri: "👨‍⚕️", opettaja: "👩‍🏫", insinööri: "👷", sairaanhoitaja: "👩‍⚕️", myyjä: "🛒", kokki: "👨‍🍳",
  palkka: "💰", työsopimus: "📝", työhaastattelu: "🤝", ansioluettelo: "📄", työtoveri: "🤝", esimies: "👔",
  lomake: "📋", hakea: "🔍", palkkio: "🏆",
  // Transport
  bussi: "🚌", juna: "🚂", raitiovaunu: "🚋", lentokone: "✈️", lippu: "🎫", asema: "🏢",
  pysäkki: "🚏", aikataulu: "📅", matka: "🧳", lentokenttä: "🛫", vaihtaa: "🔄",
  myöhässä: "⏰", suoraan: "⬆️", vasemmalle: "⬅️", oikealle: "➡️",
  // Food & Restaurant
  leipä: "🍞", maito: "🥛", juusto: "🧀", liha: "🥩", kala: "🐟", peruna: "🥔",
  salaatti: "🥗", keitto: "🍲", jälkiruoka: "🍰", tilata: "📋", lasku: "🧾",
  tarjoilija: "🧑‍🍳", ruokalista: "📜", hedelmä: "🍎", vihannes: "🥕",
  // Health
  terveys: "❤️", sairas: "🤒", kipu: "😣", kuume: "🤧", flunssa: "🤧", apteekki: "💊",
  lääke: "💊", resepti: "📋", terveysasema: "🏥", ajanvaraus: "📆", hammaslääkäri: "🦷",
  allerginen: "⚠️", liikunta: "🏃", uni: "😴", hyvinvointi: "🧘",
  // Nature & Weather
  aurinko: "☀️", sade: "🌧️", lumi: "❄️", tuuli: "💨", pilvi: "☁️", puu: "🌳",
  kukka: "🌸", eläin: "🐾", lintu: "🐦", kevät: "🌱", kesä: "🌞", syksy: "🍂",
  talvi: "⛄", lämpötila: "🌡️", myrsky: "⛈️",
  // Leisure
  harrastus: "🎯", urheilu: "⚽", lukeminen: "📖", musiikki: "🎵", elokuva: "🎬",
  uida: "🏊", juosta: "🏃", hiihtää: "⛷️", valokuvata: "📸", maalata: "🎨",
  soittaa: "🎸", kirjasto: "📚", teatteri: "🎭", konsertti: "🎶", näyttely: "🖼️",
  // Education
  koulu: "🏫", yliopisto: "🎓", kurssi: "📝", luokka: "🏫", koe: "📝",
  tehtävä: "✏️", kirja: "📕", opiskelija: "👨‍🎓", oppilas: "👧", todistus: "📜",
  arvosana: "💯", luento: "🎤", oppitunti: "📐", valmistua: "🎓", läksy: "📓",
  // Shopping
  kauppa: "🏪", hinta: "🏷️", alennus: "🔖", kassa: "💳", kuitti: "🧾",
  käteinen: "💵", kortti: "💳", tarjous: "🎁", pussi: "🛍️", kokonaishinta: "💰",
  // Public Services
  asumistuki: "🏠", toimeentulotuki: "📃", henkilötunnus: "🆔", lapsilisä: "👶",
  opintotuki: "🎓", viranomainen: "🏛️", paketti: "📦", osoite: "📍", lähettää: "📤",
  allekirjoitus: "✍️", oleskelulupa: "🛂", työlupa: "📄",
  // Emergency
  hätänumero: "📞", ambulanssi: "🚑", palokunta: "🚒", tulipalo: "🔥",
  onnettomuus: "⚠️", ensiapu: "🩹", vaara: "⛔", palovaroitin: "🔔",
  vakuutus: "🛡️", pelastaa: "🦸",
  // Social
  lahja: "🎁", juhla: "🎉", mielipide: "💭", iloinen: "😊", surullinen: "😢", väsynyt: "😩",
  // Culture
  itsenäisyyspäivä: "🇫🇮", juhannus: "🌅", sisu: "💪", joulupukki: "🎅",
  järvi: "🏞️", metsä: "🌲", revontulet: "🌌", mökki: "🏡",
  jokamiehenoikeus: "🌿", kaamos: "🌑",
  // Common verbs/nouns/adjectives
  puhua: "🗣️", syödä: "🍽️", juoda: "🥤", mennä: "🚶", tulla: "🏠", tehdä: "🔨",
  sanoa: "💬", tietää: "🧠", haluta: "💫", voida: "✅", pitää: "👍", antaa: "🤲",
  ottaa: "✋", lukea: "📖", kirjoittaa: "✍️", asua: "🏠", opiskella: "📚",
  työskennellä: "💼", ostaa: "🛒", maksaa: "💳", odottaa: "⏳", auttaa: "🤝",
  kysyä: "❓", vastata: "💡",
  ihminen: "👤", mies: "👨", nainen: "👩", lapsi: "👶", aika: "⏰",
  päivä: "📆", vuosi: "📅", raha: "💰", paikka: "📍", kaupunki: "🏙️",
  maa: "🌍", kieli: "🗣️", numero: "🔢", sää: "🌤️",
  hyvä: "👍", huono: "👎", iso: "🔵", pieni: "🔹", uusi: "✨", vanha: "🏚️",
  kaunis: "🌹", kylmä: "🥶", lämmin: "🔥", helppo: "😌", vaikea: "😰",
  nopea: "⚡", hidas: "🐢", kallis: "💎", halpa: "🪙",
};

const getWordIllustration = (word: string): string => {
  return WORD_ILLUSTRATIONS[word.toLowerCase()] || "📝";
};

// Category-to-gradient mapping for visual vocab card headers
const CATEGORY_GRADIENTS: Record<string, string> = {
  work: "from-blue-500 to-indigo-600",
  transport: "from-indigo-500 to-violet-600",
  food: "from-orange-400 to-red-500",
  health: "from-teal-400 to-emerald-600",
  nature: "from-emerald-400 to-sky-500",
  weather: "from-sky-400 to-blue-500",
  leisure: "from-pink-400 to-rose-500",
  education: "from-purple-500 to-fuchsia-600",
  shopping: "from-amber-400 to-orange-500",
  services: "from-cyan-500 to-blue-600",
  emergency: "from-red-500 to-rose-700",
  social: "from-pink-400 to-purple-500",
  culture: "from-blue-600 to-indigo-700",
  default: "from-slate-500 to-slate-700",
};

const getCategoryGradient = (category?: string): string => {
  if (!category) return CATEGORY_GRADIENTS.default;
  const key = category.toLowerCase();
  for (const [k, v] of Object.entries(CATEGORY_GRADIENTS)) {
    if (key.includes(k)) return v;
  }
  return CATEGORY_GRADIENTS.default;
};

// Curated word-to-Unsplash-photo mapping for vivid, real-world illustrations
const VOCAB_IMAGES: Record<string, string> = {
  // Work & Professions
  lääkäri: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&h=300&q=80",
  opettaja: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=400&h=300&q=80",
  insinööri: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&h=300&q=80",
  sairaanhoitaja: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&h=300&q=80",
  myyjä: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=400&h=300&q=80",
  kokki: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=400&h=300&q=80",
  palkka: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=400&h=300&q=80",
  työsopimus: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=400&h=300&q=80",
  työhaastattelu: "https://images.unsplash.com/photo-1565688534245-05d6b5be184a?auto=format&fit=crop&w=400&h=300&q=80",
  ansioluettelo: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=400&h=300&q=80",
  työtoveri: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&h=300&q=80",
  esimies: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&h=300&q=80",
  lomake: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=400&h=300&q=80",
  hakea: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=400&h=300&q=80",
  palkkio: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=400&h=300&q=80",
  // Transport
  bussi: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=400&h=300&q=80",
  juna: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=400&h=300&q=80",
  raitiovaunu: "https://images.unsplash.com/photo-1581262177000-8139a463e531?auto=format&fit=crop&w=400&h=300&q=80",
  lentokone: "https://images.unsplash.com/photo-1436491865332-7a61a109db05?auto=format&fit=crop&w=400&h=300&q=80",
  lippu: "https://images.unsplash.com/photo-1459257831348-f0cdd359235f?auto=format&fit=crop&w=400&h=300&q=80",
  asema: "https://images.unsplash.com/photo-1515965885361-f1e0ff4add39?auto=format&fit=crop&w=400&h=300&q=80",
  pysäkki: "https://images.unsplash.com/photo-1567443024551-f3e3cc2be870?auto=format&fit=crop&w=400&h=300&q=80",
  aikataulu: "https://images.unsplash.com/photo-1501139083538-0139583c060f?auto=format&fit=crop&w=400&h=300&q=80",
  matka: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=400&h=300&q=80",
  lentokenttä: "https://images.unsplash.com/photo-1436491865332-7a61a109db05?auto=format&fit=crop&w=400&h=300&q=80",
  vaihtaa: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=400&h=300&q=80",
  myöhässä: "https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=400&h=300&q=80",
  // Food & Restaurant
  leipä: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&h=300&q=80",
  maito: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=400&h=300&q=80",
  juusto: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=400&h=300&q=80",
  liha: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=400&h=300&q=80",
  kala: "https://images.unsplash.com/photo-1510130387422-82bed34b37e9?auto=format&fit=crop&w=400&h=300&q=80",
  peruna: "https://images.unsplash.com/photo-1518977676601-b53f82ber640?auto=format&fit=crop&w=400&h=300&q=80",
  salaatti: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&h=300&q=80",
  keitto: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=400&h=300&q=80",
  jälkiruoka: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=400&h=300&q=80",
  tilata: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=400&h=300&q=80",
  lasku: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=400&h=300&q=80",
  tarjoilija: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?auto=format&fit=crop&w=400&h=300&q=80",
  ruokalista: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&h=300&q=80",
  hedelmä: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=400&h=300&q=80",
  vihannes: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&h=300&q=80",
  ruoka: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&h=300&q=80",
  kahvi: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&h=300&q=80",
  tee: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=400&h=300&q=80",
  vesi: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=400&h=300&q=80",
  // Health
  terveys: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=400&h=300&q=80",
  sairas: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=400&h=300&q=80",
  kipu: "https://images.unsplash.com/photo-1616012480717-fd5588de26bc?auto=format&fit=crop&w=400&h=300&q=80",
  kuume: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=400&h=300&q=80",
  flunssa: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=400&h=300&q=80",
  apteekki: "https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=400&h=300&q=80",
  lääke: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&h=300&q=80",
  resepti: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=400&h=300&q=80",
  terveysasema: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=400&h=300&q=80",
  sairaala: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=400&h=300&q=80",
  ajanvaraus: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=400&h=300&q=80",
  hammaslääkäri: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=400&h=300&q=80",
  allerginen: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=400&h=300&q=80",
  liikunta: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&h=300&q=80",
  uni: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=400&h=300&q=80",
  hyvinvointi: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=400&h=300&q=80",
  // Nature & Weather
  aurinko: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=400&h=300&q=80",
  sade: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=400&h=300&q=80",
  lumi: "https://images.unsplash.com/photo-1491002052546-bf38f186af56?auto=format&fit=crop&w=400&h=300&q=80",
  tuuli: "https://images.unsplash.com/photo-1527482797697-8795b05a13fe?auto=format&fit=crop&w=400&h=300&q=80",
  pilvi: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=400&h=300&q=80",
  puu: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&h=300&q=80",
  kukka: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?auto=format&fit=crop&w=400&h=300&q=80",
  eläin: "https://images.unsplash.com/photo-1474511320723-9a56873571b7?auto=format&fit=crop&w=400&h=300&q=80",
  lintu: "https://images.unsplash.com/photo-1444464666168-49d633b86797?auto=format&fit=crop&w=400&h=300&q=80",
  kevät: "https://images.unsplash.com/photo-1462275646964-a0e3c11f18a6?auto=format&fit=crop&w=400&h=300&q=80",
  kesä: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&h=300&q=80",
  syksy: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=300&q=80",
  talvi: "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&w=400&h=300&q=80",
  lämpötila: "https://images.unsplash.com/photo-1561484930-998b6a7b22e8?auto=format&fit=crop&w=400&h=300&q=80",
  myrsky: "https://images.unsplash.com/photo-1527482937786-6c94a3550836?auto=format&fit=crop&w=400&h=300&q=80",
  metsä: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=400&h=300&q=80",
  järvi: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=400&h=300&q=80",
  joki: "https://images.unsplash.com/photo-1432405972618-c6b0cfba8673?auto=format&fit=crop&w=400&h=300&q=80",
  meri: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&h=300&q=80",
  vuori: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&h=300&q=80",
  // Leisure
  harrastus: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=400&h=300&q=80",
  urheilu: "https://images.unsplash.com/photo-1461896836934-bd45ba7b5e93?auto=format&fit=crop&w=400&h=300&q=80",
  lukeminen: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&h=300&q=80",
  musiikki: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=400&h=300&q=80",
  elokuva: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=400&h=300&q=80",
  uida: "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=400&h=300&q=80",
  juosta: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=400&h=300&q=80",
  hiihtää: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=400&h=300&q=80",
  valokuvata: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=400&h=300&q=80",
  maalata: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=400&h=300&q=80",
  soittaa: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=400&h=300&q=80",
  kirjasto: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=400&h=300&q=80",
  teatteri: "https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=400&h=300&q=80",
  konsertti: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=400&h=300&q=80",
  näyttely: "https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?auto=format&fit=crop&w=400&h=300&q=80",
  // Education
  koulu: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=400&h=300&q=80",
  yliopisto: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=400&h=300&q=80",
  kurssi: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=400&h=300&q=80",
  luokka: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=400&h=300&q=80",
  koe: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=400&h=300&q=80",
  tehtävä: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=400&h=300&q=80",
  kirja: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&h=300&q=80",
  opiskelija: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=400&h=300&q=80",
  oppilas: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=400&h=300&q=80",
  todistus: "https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&w=400&h=300&q=80",
  arvosana: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=400&h=300&q=80",
  luento: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=400&h=300&q=80",
  oppitunti: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=400&h=300&q=80",
  valmistua: "https://images.unsplash.com/photo-1523050854058-8df90110c476?auto=format&fit=crop&w=400&h=300&q=80",
  läksy: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=400&h=300&q=80",
  // Shopping
  kauppa: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=400&h=300&q=80",
  hinta: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=400&h=300&q=80",
  alennus: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?auto=format&fit=crop&w=400&h=300&q=80",
  kassa: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=400&h=300&q=80",
  kuitti: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=400&h=300&q=80",
  käteinen: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=400&h=300&q=80",
  kortti: "https://images.unsplash.com/photo-1556742111-a301076d9d18?auto=format&fit=crop&w=400&h=300&q=80",
  tarjous: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?auto=format&fit=crop&w=400&h=300&q=80",
  pussi: "https://images.unsplash.com/photo-1591085686350-798c0f9faa7f?auto=format&fit=crop&w=400&h=300&q=80",
  // Public Services
  asumistuki: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=400&h=300&q=80",
  toimeentulotuki: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=400&h=300&q=80",
  henkilötunnus: "https://images.unsplash.com/photo-1633265486064-086b219458ec?auto=format&fit=crop&w=400&h=300&q=80",
  lapsilisä: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=400&h=300&q=80",
  opintotuki: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=400&h=300&q=80",
  viranomainen: "https://images.unsplash.com/photo-1575505586569-646b2ca898fc?auto=format&fit=crop&w=400&h=300&q=80",
  paketti: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=400&h=300&q=80",
  osoite: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=400&h=300&q=80",
  lähettää: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=400&h=300&q=80",
  allekirjoitus: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=400&h=300&q=80",
  oleskelulupa: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=400&h=300&q=80",
  työlupa: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=400&h=300&q=80",
  // Emergency
  hätänumero: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=400&h=300&q=80",
  ambulanssi: "https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=400&h=300&q=80",
  palokunta: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=400&h=300&q=80",
  tulipalo: "https://images.unsplash.com/photo-1486551937199-baf066858de7?auto=format&fit=crop&w=400&h=300&q=80",
  onnettomuus: "https://images.unsplash.com/photo-1541968249-b5b4e2aa0b13?auto=format&fit=crop&w=400&h=300&q=80",
  ensiapu: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=400&h=300&q=80",
  vaara: "https://images.unsplash.com/photo-1599707367812-045c6006776e?auto=format&fit=crop&w=400&h=300&q=80",
  palovaroitin: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=400&h=300&q=80",
  vakuutus: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=400&h=300&q=80",
  pelastaa: "https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=400&h=300&q=80",
  // Social & Feelings
  lahja: "https://images.unsplash.com/photo-1549465220-1a8b9238f760?auto=format&fit=crop&w=400&h=300&q=80",
  juhla: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=400&h=300&q=80",
  mielipide: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=400&h=300&q=80",
  iloinen: "https://images.unsplash.com/photo-1492681290082-e932832941e6?auto=format&fit=crop&w=400&h=300&q=80",
  surullinen: "https://images.unsplash.com/photo-1541199249251-f713e6145474?auto=format&fit=crop&w=400&h=300&q=80",
  väsynyt: "https://images.unsplash.com/photo-1541199249251-f713e6145474?auto=format&fit=crop&w=400&h=300&q=80",
  // Culture & Finland
  itsenäisyyspäivä: "https://images.unsplash.com/photo-1535498730771-e735b998cd64?auto=format&fit=crop&w=400&h=300&q=80",
  juhannus: "https://images.unsplash.com/photo-1498855926480-d98e83099315?auto=format&fit=crop&w=400&h=300&q=80",
  sisu: "https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=400&h=300&q=80",
  joulupukki: "https://images.unsplash.com/photo-1545622783-b3e021430fee?auto=format&fit=crop&w=400&h=300&q=80",
  revontulet: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=400&h=300&q=80",
  mökki: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=400&h=300&q=80",
  jokamiehenoikeus: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=400&h=300&q=80",
  kaamos: "https://images.unsplash.com/photo-1477601263568-180e2c6d046e?auto=format&fit=crop&w=400&h=300&q=80",
  sauna: "https://images.unsplash.com/photo-1554223090-7e11e3dce5e1?auto=format&fit=crop&w=400&h=300&q=80",
  // Common verbs
  puhua: "https://images.unsplash.com/photo-1573497019418-b400bb3ab074?auto=format&fit=crop&w=400&h=300&q=80",
  syödä: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&h=300&q=80",
  juoda: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=400&h=300&q=80",
  mennä: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=400&h=300&q=80",
  tulla: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=400&h=300&q=80",
  tehdä: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&h=300&q=80",
  lukea: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&h=300&q=80",
  kirjoittaa: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=400&h=300&q=80",
  asua: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=400&h=300&q=80",
  opiskella: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=400&h=300&q=80",
  työskennellä: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=400&h=300&q=80",
  ostaa: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=400&h=300&q=80",
  maksaa: "https://images.unsplash.com/photo-1556742111-a301076d9d18?auto=format&fit=crop&w=400&h=300&q=80",
  odottaa: "https://images.unsplash.com/photo-1501139083538-0139583c060f?auto=format&fit=crop&w=400&h=300&q=80",
  auttaa: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=400&h=300&q=80",
  // Common nouns
  koti: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=400&h=300&q=80",
  auto: "https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?auto=format&fit=crop&w=400&h=300&q=80",
  ihminen: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=400&h=300&q=80",
  lapsi: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=400&h=300&q=80",
  raha: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=400&h=300&q=80",
  kaupunki: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=400&h=300&q=80",
  sää: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=400&h=300&q=80",
  perhe: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=400&h=300&q=80",
  ystävä: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=400&h=300&q=80",
  työ: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=400&h=300&q=80",
};

// Category-level fallback images when no exact word match exists
const CATEGORY_IMAGES: Record<string, string> = {
  work: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=400&h=300&q=80",
  transport: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=400&h=300&q=80",
  food: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&h=300&q=80",
  health: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=400&h=300&q=80",
  nature: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=400&h=300&q=80",
  weather: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=400&h=300&q=80",
  leisure: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=400&h=300&q=80",
  education: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=400&h=300&q=80",
  shopping: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=400&h=300&q=80",
  services: "https://images.unsplash.com/photo-1575505586569-646b2ca898fc?auto=format&fit=crop&w=400&h=300&q=80",
  emergency: "https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=400&h=300&q=80",
  social: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=400&h=300&q=80",
  culture: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=400&h=300&q=80",
};

// Three-tier fallback: exact word → category → null (triggers gradient+emoji)
const getVocabImageUrl = (meaningEn: string, word: string, category?: string): string | null => {
  const key = word.toLowerCase();
  if (VOCAB_IMAGES[key]) return VOCAB_IMAGES[key];
  if (category) {
    const catKey = category.toLowerCase();
    for (const [k, v] of Object.entries(CATEGORY_IMAGES)) {
      if (catKey.includes(k)) return v;
    }
  }
  return null;
};

// Vocabulary Card Component with two-column layout (text left, image right)
const VocabCard = ({ vocab, index, isMastered, onMaster }: { vocab: FinnishVocabEntry; index: number; isMastered?: boolean; onMaster?: (word: string, e: React.MouseEvent) => void }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [imgError, setImgError] = useState(false);

  const playAudio = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(vocab.word);
    u.lang = "fi-FI";
    u.rate = 0.75;
    u.pitch = 1.0;
    const voices = window.speechSynthesis.getVoices();
    const finnishVoice = voices.find(v => v.lang === "fi-FI")
      || voices.find(v => v.lang.startsWith("fi"))
      || voices.find(v => v.name.toLowerCase().includes("finnish"));
    if (finnishVoice) u.voice = finnishVoice;
    u.onend = () => setIsPlaying(false);
    u.onerror = () => setIsPlaying(false);
    window.speechSynthesis.speak(u);
  };

  const posColors: Record<string, string> = {
    noun: "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300",
    verb: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
    adjective: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
    adverb: "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300",
    numeral: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300",
    phrase: "bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300",
  };

  const illustration = getWordIllustration(vocab.word);
  const gradient = getCategoryGradient(vocab.category);
  const imageUrl = getVocabImageUrl(vocab.meaningEn, vocab.word, vocab.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="bg-slate-900 border border-slate-700/60 rounded-xl overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all group"
    >
      {/* Two-column layout: text left, image right */}
      <div className="flex flex-col sm:flex-row">
        {/* Left column — text content (60%) */}
        <div className="flex-1 p-5 sm:p-6 min-w-0">
          {/* Top row: Word + POS + Category badges */}
          <div className="flex items-start gap-2 mb-3 flex-wrap">
            <h3 className="text-[20px] font-extrabold text-white leading-tight">{vocab.word}</h3>
            <Badge className={`text-[10px] shrink-0 ${posColors[vocab.partOfSpeech] || posColors.noun}`}>
              {vocab.partOfSpeech.charAt(0).toUpperCase()}
            </Badge>
            {vocab.category && (
              <Badge className="text-[10px] bg-primary/80 text-white shrink-0">
                {vocab.category}
              </Badge>
            )}
            {isMastered && (
              <Badge className="text-[10px] bg-amber-500/90 text-white shrink-0 gap-0.5">
                <Star className="w-2.5 h-2.5 fill-white" /> Mastered
              </Badge>
            )}
            {/* Audio + Star icons */}
            <div className="ml-auto flex items-center gap-1.5 shrink-0">
              <button
                onClick={playAudio}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label={`Play pronunciation for ${vocab.word}`}
              >
                {isPlaying ? <VolumeX className="w-3.5 h-3.5 text-white/80" /> : <Volume2 className="w-3.5 h-3.5 text-white/80" />}
              </button>
              {onMaster && (
                <button
                  onClick={(e) => onMaster(vocab.word, e)}
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-amber-500/30 flex items-center justify-center transition-colors"
                  aria-label={isMastered ? "Unmark mastered" : "Mark as mastered"}
                >
                  <Star className={`w-3.5 h-3.5 ${isMastered ? "fill-amber-400 text-amber-400" : "text-white/60"}`} />
                </button>
              )}
            </div>
          </div>

          {/* Pronunciation */}
          {vocab.ipa && <p className="text-[13px] text-slate-400 mb-2 font-mono">{vocab.ipa}</p>}

          {/* Meanings */}
          <p className="text-[17px] font-bold text-blue-400 mb-1">{vocab.meaningEn}</p>
          <p className="text-[15px] text-slate-300 mb-3">
            <span className="text-slate-500 text-[13px]">Việt nam:</span> {vocab.meaningVi}
          </p>

          {vocab.puhekieli && vocab.puhekieli !== vocab.word && (
            <div className="mb-3">
              <Badge variant="outline" className="text-[11px] border-orange-400/50 text-orange-300">
                🗣️ Puhekieli: {vocab.puhekieli}
              </Badge>
            </div>
          )}

          {/* Example sentence */}
          <div className="pt-2 border-t border-slate-700/60 space-y-1">
            <p className="text-[15px] text-slate-200 font-medium leading-relaxed">
              <span className="text-slate-500 text-[13px]">Example:</span> {vocab.example}
            </p>
            <p className="text-[13px] text-slate-400 italic">{vocab.exampleEn}</p>
          </div>

          {/* Conjugation popover for verbs */}
          {vocab.partOfSpeech === "verb" && VERB_CONJUGATIONS[vocab.word] && (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="mt-3 text-xs gap-1 border-slate-600 text-slate-300 hover:bg-slate-800">
                  🔄 Conjugation
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-72 bg-slate-800 border-slate-700">
                <h4 className="font-bold mb-2 text-sm text-white">Conjugation: {vocab.word}</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="font-semibold text-primary mb-1">Present</p>
                    {VERB_CONJUGATIONS[vocab.word].present.map((form, i) => (
                      <p key={i} className="text-slate-400">{PERSONS[i]}: <span className="text-white font-medium">{form}</span></p>
                    ))}
                  </div>
                  <div>
                    <p className="font-semibold text-primary mb-1">Past</p>
                    {VERB_CONJUGATIONS[vocab.word].past.map((form, i) => (
                      <p key={i} className="text-slate-400">{PERSONS[i]}: <span className="text-white font-medium">{form}</span></p>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Right column — illustration image (35-40%) */}
        <div className="sm:w-[38%] shrink-0 relative">
          {/* Mobile: image on top; Desktop: image on right */}
          <div className="w-full h-48 sm:h-full sm:min-h-[220px] relative overflow-hidden">
            {!imgError ? (
              <img
                src={imageUrl}
                alt={`Illustration for ${vocab.meaningEn}`}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={() => setImgError(true)}
              />
            ) : (
              // Fallback: gradient + large emoji
              <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                <span className="text-6xl drop-shadow-lg select-none">{illustration}</span>
              </div>
            )}
            {/* Subtle inner shadow overlay */}
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-slate-900/30 pointer-events-none" />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-none pointer-events-none" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Quiz Component with 15-minute skill timer and Finnish-first display
const QuizSection = ({
  quiz,
  timerEnabled = false,
  showFinnishOnly = false,
  onExamComplete,
}: {
  quiz: { question: string; options: string[]; answer: number; explanation: string }[];
  timerEnabled?: boolean;
  showFinnishOnly?: boolean;
  onExamComplete?: (score: number, total: number) => void;
}) => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timerEnabled ? 15 * 60 : 0); // 15 minutes per skill
  const [timerActive, setTimerActive] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = useCallback(() => {
    setTimerActive(true);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setSubmitted(true);
          setTimerActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const score = Object.entries(answers).filter(([i, a]) => quiz[Number(i)].answer === a).length;

  const handleSubmit = () => {
    setSubmitted(true);
    setTimerActive(false);
    if (timerRef.current) clearInterval(timerRef.current);
    onExamComplete?.(score, quiz.length);
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setTimeLeft(timerEnabled ? 15 * 60 : 0);
    setTimerActive(false);
    setShowTranslation(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-primary" />
          {showFinnishOnly ? "Valitse oikea vaihtoehto" : "Quiz"}
        </h3>
        <div className="flex items-center gap-2">
          {showFinnishOnly && (
            <Button
              size="sm"
              variant={showTranslation ? "default" : "outline"}
              onClick={() => setShowTranslation(!showTranslation)}
              className="gap-1 text-xs"
            >
              <Languages className="w-3.5 h-3.5" />
              {showTranslation ? "Piilota käännös" : "Näytä käännös"}
            </Button>
          )}
          {timerEnabled && (
            <>
              {!timerActive && !submitted && (
                <Button size="sm" variant="outline" onClick={startTimer} className="gap-1">
                  <Timer className="w-4 h-4" /> Aloita (15 min)
                </Button>
              )}
              {timerActive && (
                <Badge variant="destructive" className="text-sm gap-1 px-3 py-1">
                  <Clock className="w-3.5 h-3.5" />
                  {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
                </Badge>
              )}
            </>
          )}
        </div>
      </div>

      {submitted && (
        <div className="flex items-center gap-3 p-4 rounded-lg bg-primary/10 border border-primary/20">
          <span className="text-3xl font-bold text-primary">{score}/{quiz.length}</span>
          <div>
            <span className="text-sm text-foreground font-medium">
              {score >= quiz.length * 0.8 ? "Erinomainen! 🌟" : score >= quiz.length * 0.6 ? "Hyvä työ! 👍" : "Harjoittele lisää! 💪"}
            </span>
            {showTranslation && (
              <p className="text-xs text-muted-foreground mt-0.5">
                {score >= quiz.length * 0.8 ? "Excellent!" : score >= quiz.length * 0.6 ? "Good job!" : "Keep practicing!"}
              </p>
            )}
          </div>
          <Button size="sm" variant="ghost" onClick={handleReset} className="ml-auto">Yritä uudelleen</Button>
        </div>
      )}

      {quiz.map((q, qi) => (
        <div key={qi} className="p-4 rounded-lg bg-muted/50 border border-border">
          <p className="font-medium text-foreground mb-3 text-[20px] leading-relaxed">{qi + 1}. {q.question}</p>
          <div className="grid gap-2">
            {q.options.map((opt, oi) => {
              const isSelected = answers[qi] === oi;
              const isCorrect = q.answer === oi;
              let cls = "p-3 rounded-lg border text-[18px] cursor-pointer transition-all text-left w-full ";
              if (submitted) {
                if (isCorrect) cls += "bg-emerald-50 border-emerald-300 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700 font-semibold";
                else if (isSelected) cls += "bg-rose-50 border-rose-300 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300 dark:border-rose-700";
                else cls += "bg-card border-border text-muted-foreground";
              } else {
                cls += isSelected
                  ? "bg-primary/10 border-primary text-foreground font-medium"
                  : "bg-card border-border text-foreground hover:border-primary/40";
              }
              return (
                <button
                  key={oi}
                  className={cls}
                  onClick={() => !submitted && setAnswers((a) => ({ ...a, [qi]: oi }))}
                  disabled={submitted}
                >
                  {opt}
                </button>
              );
            })}
          </div>
          {submitted && (
            <p className="mt-2 text-sm text-muted-foreground italic">
              💡 {q.explanation}
              {showTranslation && q.explanation && (
                <span className="block mt-1 text-xs text-muted-foreground/70">
                  (Translation available)
                </span>
              )}
            </p>
          )}
        </div>
      ))}

      {!submitted && Object.keys(answers).length > 0 && (
        <Button onClick={handleSubmit} className="w-full text-lg py-6 font-bold">
          Lähetä vastaukset ✓
        </Button>
      )}
    </div>
  );
};

// Writing Section with word counter
const WritingSection = ({ lesson }: { lesson: FinnishLesson }) => {
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [timerActive, setTimerActive] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  const startTimer = () => {
    setTimerActive(true);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setTimerActive(false);
          setSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          ✍️ Kirjoitustehtävä
        </h3>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant={showTranslation ? "default" : "outline"}
            onClick={() => setShowTranslation(!showTranslation)}
            className="gap-1 text-xs"
          >
            <Languages className="w-3.5 h-3.5" />
            {showTranslation ? "Piilota käännös" : "Näytä käännös"}
          </Button>
          {!timerActive && !submitted && (
            <Button size="sm" variant="outline" onClick={startTimer} className="gap-1">
              <Timer className="w-4 h-4" /> Aloita (15 min)
            </Button>
          )}
          {timerActive && (
            <Badge variant="destructive" className="text-sm gap-1 px-3 py-1">
              <Clock className="w-3.5 h-3.5" />
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
            </Badge>
          )}
        </div>
      </div>

      {/* Task instructions in Finnish */}
      <Card className="border-[#003580]/10">
        <CardContent className="p-5 prose prose-sm dark:prose-invert max-w-none">
          <ReactMarkdown>{lesson.theory || ""}</ReactMarkdown>
          {showTranslation && lesson.theoryEn && (
            <div className="mt-4 pt-4 border-t border-border">
              <Badge variant="outline" className="mb-2 text-xs">🌐 Translation</Badge>
              <ReactMarkdown>{lesson.theoryEn}</ReactMarkdown>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Writing area */}
      <div className="space-y-2">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Kirjoita vastauksesi tähän..."
          className="min-h-[200px] text-[18px] leading-relaxed border-[#003580]/15 focus:border-[#003580]/30"
          disabled={submitted}
        />
        <div className="flex items-center justify-between text-sm">
          <span className={`font-medium ${wordCount > 80 ? "text-rose-500" : wordCount >= 20 ? "text-emerald-600" : "text-muted-foreground"}`}>
            📝 Sanamäärä: {wordCount} / 50–80 sanaa
          </span>
          {!submitted && text.trim().length > 0 && (
            <Button onClick={() => { setSubmitted(true); if (timerRef.current) clearInterval(timerRef.current); setTimerActive(false); }} className="text-lg px-8 py-3 font-bold">
              Lähetä ✓
            </Button>
          )}
        </div>
      </div>

      {submitted && (
        <Card className="border-emerald-200 bg-emerald-50/50 dark:bg-emerald-900/20 dark:border-emerald-800">
          <CardContent className="p-4">
            <p className="font-bold text-emerald-800 dark:text-emerald-300 mb-2">✅ Vastauksesi on lähetetty!</p>
            <p className="text-sm text-muted-foreground">Sanamäärä: {wordCount}. Tarkista vastauksesi ja vertaa tehtävänantoon.</p>
            <Button variant="ghost" size="sm" className="mt-2" onClick={() => { setSubmitted(false); setText(""); setTimeLeft(15 * 60); }}>
              Kirjoita uudelleen
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

// Speaking Recorder Component for mock exams with situation prompt
const SpeakingRecorder = ({ lesson }: { lesson?: FinnishLesson }) => {
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(40);
  const [showTranslation, setShowTranslation] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];
      recorder.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setAudioUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach((t) => t.stop());
      };
      mediaRecorderRef.current = recorder;
      recorder.start();
      setRecording(true);
      setTimeLeft(40);
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            recorder.stop();
            setRecording(false);
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch { toast.error("Microphone access denied."); }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          🎤 Puhumistehtävä
        </h3>
        {lesson && (
          <Button
            size="sm"
            variant={showTranslation ? "default" : "outline"}
            onClick={() => setShowTranslation(!showTranslation)}
            className="gap-1 text-xs"
          >
            <Languages className="w-3.5 h-3.5" />
            {showTranslation ? "Piilota käännös" : "Näytä käännös"}
          </Button>
        )}
      </div>

      {/* Situation prompt in Finnish */}
      {lesson?.theory && (
        <Card className="border-[#003580]/10">
          <CardContent className="p-5 prose prose-sm dark:prose-invert max-w-none">
            <ReactMarkdown>{lesson.theory}</ReactMarkdown>
            {showTranslation && lesson.theoryEn && (
              <div className="mt-4 pt-4 border-t border-border">
                <Badge variant="outline" className="mb-2 text-xs">🌐 Translation</Badge>
                <ReactMarkdown>{lesson.theoryEn}</ReactMarkdown>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Recording controls */}
      <Card className="border-[#003580]/15">
        <CardContent className="p-4">
          <h4 className="font-bold text-foreground text-sm mb-3 flex items-center gap-2">
            <Mic className="w-4 h-4 text-rose-500" /> Nauhoita vastauksesi (40 sekuntia)
          </h4>
          <div className="flex items-center gap-3">
            {!recording ? (
              <Button size="lg" onClick={startRecording} className="gap-2 bg-rose-500 hover:bg-rose-600 text-lg px-6 font-bold">
                <Mic className="w-5 h-5" /> Aloita nauhoitus
              </Button>
            ) : (
              <Button size="lg" variant="destructive" onClick={stopRecording} className="gap-2 text-lg px-6 font-bold">
                <Square className="w-5 h-5" /> Lopeta ({timeLeft}s)
              </Button>
            )}
          </div>
          {audioUrl && (
            <div className="mt-4 flex items-center gap-3">
              <audio controls src={audioUrl} className="h-10 flex-1" />
              <Button variant="outline" size="sm" onClick={() => { setAudioUrl(null); }}>
                Nauhoita uudelleen
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// Finnish motivational quotes for mastered words
const FINNISH_QUOTES = [
  "Hienoa työtä! 🎿", "Jatka samaan malliin! ❄️", "Olet todella taitava! 🌟",
  "Mahtavaa! 🏔️", "Loistavaa! 🇫🇮", "Sisu! 💪", "Upea suoritus! ✨",
];

// YKI A2 Ready Badge Dialog
const YkiReadyBadge = ({ show, onClose }: { show: boolean; onClose: () => void }) => (
  <Dialog open={show} onOpenChange={onClose}>
    <DialogContent className="text-center max-w-sm">
      <DialogHeader>
        <DialogTitle className="text-2xl text-center">🇫🇮 YKI A2 Ready!</DialogTitle>
      </DialogHeader>
      <div className="py-6 space-y-4">
        <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[#003580] to-[#0066cc] flex items-center justify-center shadow-xl">
          <Trophy className="w-12 h-12 text-white" />
        </div>
        <p className="text-lg font-bold text-foreground">Onneksi olkoon! 🎉</p>
        <p className="text-sm text-muted-foreground">
          Olet suorittanut kaikki neljä YKI-taitoaluetta! Olet valmis Perustaso-kokeeseen.
        </p>
        <Badge className="text-sm px-4 py-2 bg-[#003580]">
          <Flag className="w-4 h-4 mr-1 inline" /> YKI A2 Certified Ready
        </Badge>
      </div>
    </DialogContent>
  </Dialog>
);

// Main Dashboard Component
const YkiDashboard = () => {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const initialModule = searchParams.get("module");

  const [activePillar, setActivePillar] = useState<"vocabulary" | "lessons" | "mock-exams">("vocabulary");
  const [selectedModule, setSelectedModule] = useState<FinnishModule | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<FinnishLesson | null>(null);
  const [showBadge, setShowBadge] = useState(false);

  // Mastered words state for Skier gamification
  const getMasteredWords = (): string[] => {
    try { return JSON.parse(localStorage.getItem("yki-mastered-words") || "[]"); } catch { return []; }
  };
  const [masteredWords, setMasteredWords] = useState<string[]>(getMasteredWords());
  const [flyingStars, setFlyingStars] = useState<{ id: number; startX: number; startY: number }[]>([]);
  const skierContainerRef = useRef<HTMLDivElement | null>(null);

  // Exam scores for skier integration
  const getExamScores = (): Record<string, { score: number; total: number }> => {
    try { return JSON.parse(localStorage.getItem("yki-exam-scores") || "{}"); } catch { return {}; }
  };
  const [examScores, setExamScores] = useState<Record<string, { score: number; total: number }>>(getExamScores());

  const allVocabWords = useMemo(() =>
    allVocabModules.flatMap(m => m.lessons.flatMap(l => l.vocabulary || [])),
  []);

  const handleMasterWord = (word: string, event: React.MouseEvent) => {
    const isCurrentlyMastered = masteredWords.includes(word);

    if (isCurrentlyMastered) {
      // Unmark mastered
      const newMastered = masteredWords.filter(w => w !== word);
      setMasteredWords(newMastered);
      localStorage.setItem("yki-mastered-words", JSON.stringify(newMastered));
      toast.info(`"${word}" unmarked from mastery`);
      return;
    }

    // Mark as mastered
    const newMastered = [...masteredWords, word];
    setMasteredWords(newMastered);
    localStorage.setItem("yki-mastered-words", JSON.stringify(newMastered));

    // Flying star animation
    const rect = skierContainerRef.current?.getBoundingClientRect();
    if (rect) {
      setFlyingStars((prev) => [...prev, {
        id: Date.now(),
        startX: event.clientX - rect.left,
        startY: event.clientY - rect.top,
      }]);
    }

    const quote = FINNISH_QUOTES[Math.floor(Math.random() * FINNISH_QUOTES.length)];
    toast.success(quote, { style: { fontSize: "18px", fontWeight: "bold" } });
  };

  const handleStarLanded = (id: number) => {
    setFlyingStars((prev) => prev.filter((s) => s.id !== id));
  };

  // Handle exam completion — link to skier progress
  const handleExamComplete = (lessonId: string, score: number, total: number) => {
    const newScores = { ...examScores, [lessonId]: { score, total } };
    setExamScores(newScores);
    localStorage.setItem("yki-exam-scores", JSON.stringify(newScores));

    // If score >= 80%, move skier up by adding "exam words"
    if (score >= total * 0.8) {
      toast.success("Erinomainen tulos! Hiihtäjäsi etenee vuorella! ⛷️🏔️");
    }

    // Check if all 4 skill modules are completed
    const skillModuleIds = ["yki-mock-reading", "yki-mock-listening", "yki-mock-writing", "yki-mock-speaking"];
    const allSkillsDone = skillModuleIds.every(moduleId => {
      const mod = allMockExamModules.find(m => m.id === moduleId);
      if (!mod) return false;
      return mod.lessons.some(l => {
        const s = newScores[l.id];
        return s && s.score >= s.total * 0.8;
      });
    });

    if (allSkillsDone) {
      setTimeout(() => setShowBadge(true), 1000);
    }
  };

  // Initialize from URL param
  useMemo(() => {
    if (initialModule) {
      const allMods = [...allVocabModules, ...allLessonModules, ...allMockExamModules];
      const found = allMods.find((m) => m.id === initialModule);
      if (found) {
        setActivePillar(found.pillar);
        setSelectedModule(found);
        if (found.lessons.length > 0) setSelectedLesson(found.lessons[0]);
      }
    }
  }, [initialModule]);

  const currentModules = activePillar === "vocabulary"
    ? allVocabModules
    : activePillar === "lessons"
    ? allLessonModules
    : allMockExamModules;

  const handleSelectModule = (mod: FinnishModule) => {
    setSelectedModule(mod);
    setSelectedLesson(mod.lessons[0] || null);
  };

  const handleBack = () => {
    if (selectedLesson) {
      setSelectedLesson(null);
    } else {
      setSelectedModule(null);
    }
  };

  // Progress checklist (stored in localStorage)
  const getProgress = () => {
    try { return JSON.parse(localStorage.getItem("yki-progress") || "{}"); } catch { return {}; }
  };

  const progress = getProgress();
  const totalLessons = [...allVocabModules, ...allLessonModules, ...allMockExamModules]
    .reduce((sum, m) => sum + m.lessons.length, 0);
  const completedLessons = Object.keys(progress).filter((k) => progress[k]).length;
  const vocabCompleted = allVocabModules.flatMap(m => m.lessons).filter(l => progress[l.id]).length;
  const vocabTotal = allVocabModules.flatMap(m => m.lessons).length;
  const grammarCompleted = allLessonModules.flatMap(m => m.lessons).filter(l => progress[l.id]).length;
  const grammarTotal = allLessonModules.flatMap(m => m.lessons).length;
  const mockCompleted = allMockExamModules.flatMap(m => m.lessons).filter(l => progress[l.id]).length;
  const mockTotal = allMockExamModules.flatMap(m => m.lessons).length;

  const markComplete = (lessonId: string) => {
    const p = getProgress();
    p[lessonId] = true;
    localStorage.setItem("yki-progress", JSON.stringify(p));
  };

  // Determine if current lesson is a writing or speaking exam
  const isWritingExam = selectedModule?.id === "yki-mock-writing";
  const isSpeakingExam = selectedModule?.id === "yki-mock-speaking";
  const isMockExam = selectedModule?.pillar === "mock-exams";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 lg:pt-28 pb-12">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">🇫🇮</span>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                  YKI Finnish Prep Dashboard
                </h1>
                <p className="text-sm text-muted-foreground">
                  {t("Perustaso — Trình độ A2", "Perustaso — Level A2")}
                </p>
              </div>
            </div>

            {/* YKI Checklist Progress */}
            <Card className="mt-4 border-[#003580]/15">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Snowflake className="w-5 h-5 text-[#003580]" />
                  <h3 className="font-semibold text-foreground text-sm">YKI Progress Checklist</h3>
                  <Badge variant="outline" className="ml-auto text-xs">
                    {completedLessons}/{totalLessons}
                  </Badge>
                </div>
                <Progress value={totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0} className="h-2 mb-3" />
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div className="text-center">
                    <p className="text-muted-foreground">Vocabulary</p>
                    <p className="font-bold text-foreground">{Math.round((vocabTotal > 0 ? vocabCompleted / vocabTotal : 0) * 100)}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-muted-foreground">Grammar</p>
                    <p className="font-bold text-foreground">{Math.round((grammarTotal > 0 ? grammarCompleted / grammarTotal : 0) * 100)}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-muted-foreground">Mock Exams</p>
                    <p className="font-bold text-foreground">{mockCompleted}/{mockTotal} completed</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Finnish Skier Progress */}
            <div className="mt-4">
              <FinnishSkier
                mastered={masteredWords.length}
                total={allVocabWords.length}
                flyingStars={flyingStars}
                onStarLanded={handleStarLanded}
                containerRef={skierContainerRef}
              />
            </div>
          </div>

          {/* Pillar Tabs */}
          <Tabs value={activePillar} onValueChange={(v) => { setActivePillar(v as any); setSelectedModule(null); setSelectedLesson(null); }}>
            <TabsList className="w-full max-w-lg grid grid-cols-3 h-11 mb-6">
              <TabsTrigger value="vocabulary" className="text-xs sm:text-sm">📖 Sanasto</TabsTrigger>
              <TabsTrigger value="lessons" className="text-xs sm:text-sm">🎓 Oppitunnit</TabsTrigger>
              <TabsTrigger value="mock-exams" className="text-xs sm:text-sm">📝 Kokeet</TabsTrigger>
            </TabsList>

            <TabsContent value={activePillar}>
              {/* Module detail view */}
              {selectedModule && selectedLesson ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Button variant="ghost" size="sm" onClick={handleBack} className="mb-4 gap-1">
                    <ChevronLeft className="w-4 h-4" /> Takaisin
                  </Button>

                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-3xl">{selectedLesson.icon}</span>
                    <div>
                      {/* Show Finnish title first for mock exams */}
                      <h2 className="text-xl font-bold text-foreground">
                        {isMockExam ? selectedLesson.title : selectedLesson.titleEn}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {isMockExam ? selectedLesson.titleEn : selectedLesson.title}
                      </p>
                    </div>
                    <Badge className="ml-auto" variant="outline">{selectedLesson.level}</Badge>
                  </div>

                  {/* Lesson sidebar if module has multiple lessons */}
                  {selectedModule.lessons.length > 1 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedModule.lessons.map((l) => (
                        <Button
                          key={l.id}
                          size="sm"
                          variant={selectedLesson.id === l.id ? "default" : "outline"}
                          onClick={() => setSelectedLesson(l)}
                          className="text-xs"
                        >
                          {l.icon} {isMockExam ? l.title : l.titleEn}
                        </Button>
                      ))}
                    </div>
                  )}

                  {/* Writing Exam — show writing section */}
                  {isWritingExam ? (
                    <WritingSection lesson={selectedLesson} />
                  ) : isSpeakingExam ? (
                    /* Speaking Exam — show speaking recorder */
                    <SpeakingRecorder lesson={selectedLesson} />
                  ) : (
                    <>
                      {/* Theory/Grammar — show Finnish for exams */}
                      {selectedLesson.theory && !isWritingExam && !isSpeakingExam && (
                        <Card className="mb-6 border-[#003580]/10">
                          <CardContent className="p-6 prose prose-sm dark:prose-invert max-w-none text-[18px]">
                            <ReactMarkdown>
                              {isMockExam ? selectedLesson.theory : (selectedLesson.theoryEn || selectedLesson.theory)}
                            </ReactMarkdown>
                          </CardContent>
                        </Card>
                      )}

                      {/* Grammar Points */}
                      {selectedLesson.grammar && selectedLesson.grammar.length > 0 && (
                        <div className="space-y-4 mb-6">
                          <h3 className="text-lg font-bold text-foreground">📐 Grammar Points</h3>
                          {selectedLesson.grammar.map((gp, i) => (
                            <Card key={i} className="border-[#003580]/10">
                              <CardHeader className="pb-2">
                                <CardTitle className="text-base">{gp.titleEn || gp.title}</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p className="text-sm text-muted-foreground mb-3">{gp.explanationEn || gp.explanation}</p>
                                <div className="space-y-1.5">
                                  {gp.examples.map((ex, j) => (
                                    <div key={j} className="flex items-start gap-2 text-sm">
                                      <button onClick={() => speakFinnish(ex.finnish)} className="shrink-0 mt-0.5">
                                        <Volume2 className="w-3.5 h-3.5 text-[#003580]" />
                                      </button>
                                      <span className="font-medium text-foreground">{ex.finnish}</span>
                                      <span className="text-muted-foreground">— {ex.english}</span>
                                    </div>
                                  ))}
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}

                      {/* Dialogues */}
                      {selectedLesson.dialogues && selectedLesson.dialogues.length > 0 && (
                        <div className="space-y-4 mb-6">
                          <h3 className="text-lg font-bold text-foreground">💬 Dialogues</h3>
                          {selectedLesson.dialogues.map((d, i) => (
                            <Card key={i} className="border-[#003580]/10">
                              <CardHeader className="pb-2">
                                <CardTitle className="text-base">{d.situationEn}</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-2">
                                {d.lines.map((line, j) => (
                                  <div key={j} className={`flex items-start gap-2 text-sm p-2 rounded-lg ${line.speaker === "Sinä" ? "bg-primary/5" : "bg-muted/50"}`}>
                                    <Badge variant="outline" className="text-xs shrink-0">{line.speaker}</Badge>
                                    <div>
                                      <button onClick={() => speakFinnish(line.finnish)} className="inline mr-1">
                                        <Volume2 className="w-3 h-3 text-[#003580] inline" />
                                      </button>
                                      <span className="font-medium text-foreground">{line.finnish}</span>
                                      <p className="text-xs text-muted-foreground italic">{line.english}</p>
                                    </div>
                                  </div>
                                ))}
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}

                      {/* Vocabulary */}
                      {selectedLesson.vocabulary && selectedLesson.vocabulary.length > 0 && (
                        <div className="mb-6">
                          <h3 className="text-lg font-bold text-foreground mb-4">📖 Sanasto</h3>
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                            {selectedLesson.vocabulary.map((v, i) => (
                              <VocabCard
                                key={v.word}
                                vocab={v}
                                index={i}
                                isMastered={masteredWords.includes(v.word)}
                                onMaster={handleMasterWord}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Interactive Exercises for vocabulary modules */}
                      {selectedLesson.vocabulary && selectedLesson.vocabulary.length >= 4 && selectedModule.pillar === "vocabulary" && (
                        <div className="mb-6">
                          <FinnishVocabExercises
                            vocabulary={selectedLesson.vocabulary}
                            onExerciseComplete={(score, total) => {
                              if (score >= total * 0.7) {
                                toast.success("Hienoa työtä! Harjoitukset suoritettu! ⛷️");
                              }
                            }}
                          />
                        </div>
                      )}

                      {/* Quiz — Finnish-first for mock exams */}
                      {selectedLesson.quiz && selectedLesson.quiz.length > 0 && (
                        <div className="mb-6">
                          <QuizSection
                            quiz={selectedLesson.quiz}
                            timerEnabled={isMockExam}
                            showFinnishOnly={isMockExam}
                            onExamComplete={(score, total) => handleExamComplete(selectedLesson.id, score, total)}
                          />
                        </div>
                      )}
                    </>
                  )}

                  {/* Speaking recorder for reading/listening exams */}
                  {isMockExam && !isWritingExam && !isSpeakingExam && (
                    <div className="mt-6">
                      <SpeakingRecorder />
                    </div>
                  )}

                  {/* Mark Complete */}
                  <div className="text-center mt-8">
                    {progress[selectedLesson.id] ? (
                      <Badge className="bg-emerald-100 text-emerald-800 text-sm py-2 px-4">
                        ✅ Suoritettu
                      </Badge>
                    ) : (
                      <Button
                        onClick={() => {
                          markComplete(selectedLesson.id);
                          window.location.reload();
                        }}
                        className="gap-2 text-lg px-8 py-3 font-bold"
                      >
                        <CheckCircle className="w-5 h-5" />
                        Merkitse valmiiksi
                      </Button>
                    )}
                  </div>
                </motion.div>
              ) : selectedModule ? (
                // Module lesson list
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Button variant="ghost" size="sm" onClick={handleBack} className="mb-4 gap-1">
                    <ChevronLeft className="w-4 h-4" /> Takaisin
                  </Button>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-3xl">{selectedModule.icon}</span>
                    <div>
                      <h2 className="text-xl font-bold text-foreground">{selectedModule.titleEn}</h2>
                      <p className="text-sm text-muted-foreground">{selectedModule.descriptionEn}</p>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedModule.lessons.map((lesson, i) => (
                      <motion.div
                        key={lesson.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <button
                          onClick={() => setSelectedLesson(lesson)}
                          className="w-full text-left rounded-xl border border-[#003580]/15 bg-card/80 backdrop-blur-sm p-5 hover:shadow-md hover:border-[#003580]/30 transition-all"
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl">{lesson.icon}</span>
                            <div className="min-w-0">
                              <h3 className="font-semibold text-foreground truncate">
                                {isMockExam ? lesson.title : lesson.titleEn}
                              </h3>
                              <p className="text-xs text-muted-foreground">
                                {isMockExam ? lesson.titleEn : lesson.title}
                              </p>
                            </div>
                            {progress[lesson.id] && <CheckCircle className="w-4 h-4 text-emerald-500 ml-auto shrink-0" />}
                          </div>
                          <div className="flex gap-2">
                            <Badge variant="outline" className="text-xs">{lesson.level}</Badge>
                            {lesson.vocabulary && <Badge variant="secondary" className="text-xs">{lesson.vocabulary.length} sanaa</Badge>}
                            {lesson.quiz && <Badge variant="secondary" className="text-xs">{lesson.quiz.length} kysymystä</Badge>}
                          </div>
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                // Module grid
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {currentModules.map((mod, i) => (
                    <motion.div
                      key={mod.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <button
                        onClick={() => handleSelectModule(mod)}
                        className="w-full text-left rounded-2xl border-2 border-[#003580]/15 bg-card p-6 hover:shadow-lg hover:border-[#003580]/30 transition-all group"
                      >
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${mod.color} flex items-center justify-center text-white text-2xl mb-4`}>
                          {mod.icon}
                        </div>
                        <h3 className="text-lg font-bold text-foreground group-hover:text-[#003580] transition-colors mb-1">
                          {mod.titleEn}
                        </h3>
                        <p className="text-xs text-muted-foreground mb-2">{mod.title}</p>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{mod.descriptionEn}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs border-[#003580]/20">
                            {mod.lessons.length} {mod.lessons.length === 1 ? "lesson" : "lessons"}
                          </Badge>
                          <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto group-hover:text-[#003580] transition-colors" />
                        </div>
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />

      {/* Floating Finnish Dictionary */}
      <FloatingFinnishDictionary />

      {/* YKI A2 Ready Badge */}
      <YkiReadyBadge show={showBadge} onClose={() => setShowBadge(false)} />
    </div>
  );
};

export default YkiDashboard;
