// YKI Finnish Prep Dashboard — Vocabulary, Grammar, Mock Exams with progress tracking
import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import finnishFlagImg from "@/assets/finnish-flag.png";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import {
  BookOpen, ChevronRight, ChevronLeft, Volume2, VolumeX,
  Clock, CheckCircle, Timer, Snowflake, Star, Mic, Square,
  Languages, Trophy, Flag, Loader2,
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
  finnishVocabExpansion3Modules,
  finnishLessonModules,
  finnishLessonExpansionModules,
  finnishMockExamModules,
  finnishMockExamExpansionModules,
  finnishMockExamExpansion2Modules,
  finnishMockExamExpansion3Modules,
  finnishLessonExpansion2Modules,
  type FinnishModule,
  type FinnishLesson,
  type FinnishVocabEntry,
} from "@/data/finnishCurriculum";
import FinnishVocabExercises from "@/components/FinnishVocabExercises";
import { playFinnishTts } from "@/lib/finnishTts";
import AISpeakingCoach from "@/components/AISpeakingCoach";

// Merge original + expansion data
import { finnishVocabExpansion4Modules } from "@/data/finnishCurriculum/vocabularyExpansion4";
const allVocabModules = [...finnishVocabModules, ...finnishVocabExpansionModules, ...finnishVocabExpansion2Modules, ...finnishVocabExpansion3Modules, ...finnishVocabExpansion4Modules];
const allMockExamModules = [...finnishMockExamModules, ...finnishMockExamExpansionModules, ...finnishMockExamExpansion2Modules, ...finnishMockExamExpansion3Modules];
const allLessonModules = [...finnishLessonModules, ...finnishLessonExpansionModules, ...finnishLessonExpansion2Modules];

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

const speakFinnish = (text: string) => {
  void playFinnishTts(text).then((played) => {
    if (!played) {
      toast.error("Không thể phát âm chuẩn tiếng Phần Lan trên thiết bị này.");
    }
  });
};

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
  kahvi: "☕", tee: "🍵", vesi: "💧", mehu: "🧃", sokeri: "🍬", suola: "🧂",
  omena: "🍎", riisi: "🍚", voileipä: "🥪", jäätelö: "🍦", kana: "🍗", pasta: "🍝",
  jogurtti: "🥛", olut: "🍺",
  // Health
  terveys: "❤️", sairas: "🤒", kipu: "😣", kuume: "🤧", flunssa: "🤧", apteekki: "💊",
  lääke: "💊", resepti: "📋", terveysasema: "🏥", ajanvaraus: "📆", hammaslääkäri: "🦷",
  allerginen: "⚠️", liikunta: "🏃", uni: "😴", hyvinvointi: "🧘",
  hammas: "🦷", yskä: "🤧", nenä: "👃", selkä: "🔙", vatsa: "🤢", nuha: "🤧", polvi: "🦵",
  // Nature & Weather
  aurinko: "☀️", sade: "🌧️", lumi: "❄️", tuuli: "💨", pilvi: "☁️", puu: "🌳",
  kukka: "🌸", eläin: "🐾", lintu: "🐦", kevät: "🌱", kesä: "🌞", syksy: "🍂",
  talvi: "⛄", lämpötila: "🌡️", myrsky: "⛈️",
  // Leisure
  harrastus: "🎯", urheilu: "⚽", lukeminen: "📖", musiikki: "🎵", elokuva: "🎬",
  uida: "🏊", juosta: "🏃", hiihtää: "⛷️", valokuvata: "📸", maalata: "🎨",
  soittaa: "🎸", kirjasto: "📚", teatteri: "🎭", konsertti: "🎶", näyttely: "🖼️",
  lenkkeily: "🏃", uinti: "🏊", maalaus: "🎨", peli: "🎮", kalastus: "🎣", pyöräily: "🚴",
  valokuvaus: "📸", hiihtäminen: "⛷️", luistelu: "⛸️", puutarha: "🌻", lautapeli: "🎲", käsityö: "🧶",
  retki: "🥾",
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
  // Family
  äiti: "👩", isä: "👨", veli: "👦", sisko: "👧", lapsi: "👶", vaimo: "👰",
  mies: "👨", mummo: "👵", ukki: "👴", perhe: "👨‍👩‍👧‍👦", vauva: "🍼",
  ystävä: "🤝", naapuri: "🏘️", serkku: "👫", täti: "👩", setä: "👨",
  anoppi: "👩‍🦳", sisarus: "👨‍👩‍👧", tytär: "👧", poika: "👦", puoliso: "💑",
  // Common verbs/nouns/adjectives
  puhua: "🗣️", syödä: "🍽️", juoda: "🥤", mennä: "🚶", tulla: "🏠", tehdä: "🔨",
  sanoa: "💬", tietää: "🧠", haluta: "💫", voida: "✅", pitää: "👍", antaa: "🤲",
  ottaa: "✋", lukea: "📖", kirjoittaa: "✍️", asua: "🏠", opiskella: "📚",
  työskennellä: "💼", ostaa: "🛒", maksaa: "💳", odottaa: "⏳", auttaa: "🤝",
  kysyä: "❓", vastata: "💡",
  ihminen: "👤", nainen: "👩", aika: "⏰",
  päivä: "📆", vuosi: "📅", raha: "💰", paikka: "📍", kaupunki: "🏙️",
  maa: "🌍", kieli: "🗣️", numero: "🔢", sää: "🌤️",
  hyvä: "👍", huono: "👎", iso: "🔵", pieni: "🔹", uusi: "✨", vanha: "🏚️",
  kaunis: "🌹", kylmä: "🥶", lämmin: "🔥", helppo: "😌", vaikea: "😰",
  nopea: "⚡", hidas: "🐢", kallis: "💎", halpa: "🪙",
  // Emotions & Personality
  onnellinen: "😊", vihainen: "😠", rohkea: "🦁", ujo: "🙈",
  ahkera: "💪", laiska: "😴", kärsivällinen: "🧘", ystävällinen: "🤗",
  // Technology
  tietokone: "💻", puhelin: "📱", sähköposti: "📧", salasana: "🔒",
  sovellus: "📲", verkko: "🌐", tulostin: "🖨️", näppäimistö: "⌨️",
  // Travel
  hotelli: "🏨", passi: "🛂", nähtävyys: "🗼", museo: "🏛️",
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
const U = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=400&h=300&q=80`;
const VOCAB_IMAGES: Record<string, string> = {
  // Work & Professions
  lääkäri: U("photo-1612349317150-e413f6a5b16d"), opettaja: U("photo-1577896851231-70ef18881754"),
  insinööri: U("photo-1581092160607-ee22621dd758"), sairaanhoitaja: U("photo-1559839734-2b71ea197ec2"),
  myyjä: U("photo-1556742049-0cfed4f6a45d"), kokki: U("photo-1556910103-1c02745aae4d"),
  palkka: U("photo-1554224155-6726b3ff858f"), työsopimus: U("photo-1450101499163-c8848c66ca85"),
  työhaastattelu: U("photo-1565688534245-05d6b5be184a"), ansioluettelo: U("photo-1586281380349-632531db7ed4"),
  työtoveri: U("photo-1522071820081-009f0129c71c"), esimies: U("photo-1560250097-0b93528c311a"),
  lomake: U("photo-1554224154-26032ffc0d07"), hakea: U("photo-1486312338219-ce68d2c6f44d"),
  palkkio: U("photo-1567427017947-545c5f8d16ad"), pomo: U("photo-1519085360753-af0119f7cbe7"),
  haastattelu: U("photo-1573497620053-ea5300f94f21"), hakemus: U("photo-1484480974693-6ca0a78fb36b"),
  työ: U("photo-1521737604893-d14cc237f11d"), työpaikka: U("photo-1497366216548-37526070297c"),
  työnhakija: U("photo-1507679799987-c73779587ccf"), työkokemus: U("photo-1454165804606-c3d57bc86b40"),
  työtarjous: U("photo-1553877522-43269d4ea984"), työvuoro: U("photo-1504384308090-c894fdcc538d"),
  irtisanominen: U("photo-1573497019940-1c28c88b4f3e"), lomarahat: U("photo-1507525428034-b723cf961d3e"),
  palkkatuki: U("photo-1526304640581-d334cdbbf45e"), kokous: U("photo-1557804506-669a67965ba0"),
  työttömyys: U("photo-1584438784894-089d6a62b8fa"), työttömyyspäiväraha: U("photo-1579621970563-ebec7560ff3e"),
  työvoimatoimisto: U("photo-1575505586569-646b2ca898fc"), koulutus: U("photo-1524178232363-1fb2b075b655"),
  tutkinto: U("photo-1497633762265-9d179a990aa6"), ammattikoulu: U("photo-1562774053-701939374585"),
  etuus: U("photo-1526304640581-d334cdbbf45e"), sairauspäiväraha: U("photo-1576091160399-112ba8d25d1d"),
  kotouttamiskoulutus: U("photo-1427504494785-3a9ca7044f45"), kotoutumissuunnitelma: U("photo-1517245386747-41f6b27a0ab0"),
  // Transport
  bussi: U("photo-1544620347-c4fd4a3d5957"), juna: U("photo-1474487548417-781cb71495f3"),
  raitiovaunu: U("photo-1581262177000-8139a463e531"), lentokone: U("photo-1556388158-158ea5ccacbd"),
  lippu: U("photo-1459257831348-f0cdd359235f"), asema: U("photo-1515861461179-7fef85aed02c"),
  pysäkki: U("photo-1567443024551-f3e3cc2be870"), aikataulu: U("photo-1501139083538-0139583c060f"),
  matka: U("photo-1488646953014-85cb44e25828"), lentokenttä: U("photo-1436491865332-7a61a109db05"),
  vaihtaa: U("photo-1517048676732-d65bc937f952"), myöhässä: U("photo-1508962914676-134849a727f0"),
  matkalaukku: U("photo-1553062407-98eeb64c6a62"), matkustaa: U("photo-1469854523086-cc02fe5d8800"),
  saapua: U("photo-1540959733332-eab4deabeeaf"), nousta: U("photo-1517400508447-f8dd041b476b"),
  suoraan: U("photo-1476480862126-209bfaa8edc8"), vasemmalle: U("photo-1519500099198-fd81846b8f03"),
  oikealle: U("photo-1527427337751-fdca2f128ce5"), suunta: U("photo-1524661135-423995f22d0b"),
  kartta: U("photo-1526778548025-fa2f459cd5c1"),
  // Food & Restaurant
  leipä: U("photo-1509440159596-0249088772ff"), maito: U("photo-1563636619-e9143da7973b"),
  juusto: U("photo-1486297678162-eb2a19b0a32d"), liha: U("photo-1607623814075-e51df1bdc82f"),
  kala: U("photo-1510130387422-82bed34b37e9"), peruna: U("photo-1596560548464-f010549b84d7"),
  salaatti: U("photo-1512621776951-a57141f2eefd"), keitto: U("photo-1547592166-23ac45744acd"),
  jälkiruoka: U("photo-1551024601-bec78aea704b"), tilata: U("photo-1414235077428-338989a2e8c0"),
  lasku: U("photo-1450101499163-c8848c66ca85"), tarjoilija: U("photo-1559329007-40df8a9345d8"),
  ruokalista: U("photo-1568901346375-23c9450c58cd"), hedelmä: U("photo-1619566636858-adf3ef46400b"),
  vihannes: U("photo-1540420773420-3366772f4999"), ruoka: U("photo-1504674900247-0877df9cc836"),
  kahvi: U("photo-1509042239860-f550ce710b93"), tee: U("photo-1556679343-c7306c1976bc"),
  vesi: U("photo-1548839140-29a749e1cf4d"), aamupala: U("photo-1533089860892-a7c6f0a88666"),
  lounas: U("photo-1476224203421-9ac39bcb3327"), ravintola: U("photo-1517248135467-4c7edcad34c4"),
  marja: U("photo-1464965911861-746a04b4bca6"), sieni: U("photo-1504545102780-26774c1bb073"),
  päivällinen: U("photo-1432139509613-5c4255a1d849"),
  // Health & Body
  terveys: U("photo-1505751172876-fa1923c5c528"), sairas: U("photo-1584515933487-779824d29309"),
  kipu: U("photo-1559757175-5700dde675bc"), kuume: U("photo-1512678080530-7760d81faba6"),
  flunssa: U("photo-1578307985320-34b61a66c195"), apteekki: U("photo-1585435557343-3b092031a831"),
  lääke: U("photo-1584308666744-24d5c474f2ae"), resepti: U("photo-1471864190281-a93a3070b6de"),
  terveysasema: U("photo-1519494026892-80bbd2d6fd0d"), sairaala: U("photo-1538108149393-fbbd81895907"),
  ajanvaraus: U("photo-1506784983877-45594efa4cbe"), hammaslääkäri: U("photo-1606811841689-23dfddce3e95"),
  allerginen: U("photo-1576091160550-2173dba999ef"), allergia: U("photo-1607619056574-7b8d3ee536b2"),
  liikunta: U("photo-1571019613454-1cb2f99b2d8b"), uni: U("photo-1541781774459-bb2af2f05b55"),
  hyvinvointi: U("photo-1544367567-0f2fcb009e0b"), hammas: U("photo-1588776814546-1ffcf47267a5"),
  hammassärky: U("photo-1606811841689-23dfddce3e95"), oireet: U("photo-1579684385127-1ef15d508118"),
  päänsärky: U("photo-1616012480717-fd5867611ac7"), vatsa: U("photo-1571019613454-1cb2f99b2d8b"),
  vatsakipu: U("photo-1559757175-5700dde675bc"), yskä: U("photo-1578307985320-34b61a66c195"),
  särkylääke: U("photo-1587854692152-cbe660dbde88"), päivystys: U("photo-1538108149393-fbbd81895907"),
  sairausloma: U("photo-1527613426441-4da17471b66d"), verenvuoto: U("photo-1603398938378-e54eab446dde"),
  tajuton: U("photo-1516574187841-cb9cc2ca948b"), myrkytys: U("photo-1587854692152-cbe660dbde88"),
  elvyttää: U("photo-1576091160399-112ba8d25d1d"),
  // Body parts
  pää: U("photo-1544348817-5f2cf14b88c8"), käsi: U("photo-1582213782179-e0d53f98f2ca"),
  jalka: U("photo-1515886657613-9f3515b0c78f"), selkä: U("photo-1544367567-0f2fcb009e0b"),
  silmä: U("photo-1494869042583-f6c911f04b4c"), korva: U("photo-1576091160550-2173dba999ef"),
  nenä: U("photo-1588776814546-1ffcf47267a5"), suu: U("photo-1581803118522-7b72a50f7e9f"),
  // Nature & Weather
  aurinko: U("photo-1506748686214-e9df14d4d9d0"), sade: U("photo-1515694346937-94d85e41e6f0"),
  lumi: U("photo-1491002052546-bf38f186af56"), tuuli: U("photo-1527482797697-8795b05a13fe"),
  pilvi: U("photo-1534088568595-a066f410bcda"), puu: U("photo-1502082553048-f009c37129b9"),
  kukka: U("photo-1490535532122-98eef371d4f8"), eläin: U("photo-1530281700549-e82e7bf110d6"),
  lintu: U("photo-1444464666168-49d633b86797"), kevät: U("photo-1513836279014-a89f7a76ae86"),
  kesä: U("photo-1473496169904-658ba7c44d8a"), syksy: U("photo-1507003211169-0a1dd7228f2d"),
  talvi: U("photo-1483921020237-2ff51e8e4b22"), lämpötila: U("photo-1561484930-998b6a7b22e8"),
  myrsky: U("photo-1509316975850-ff9c5deb0cd9"), metsä: U("photo-1448375240586-882707db888b"),
  järvi: U("photo-1501785888041-af3ef285b470"), joki: U("photo-1495521939206-a217db9df264"),
  meri: U("photo-1505118380757-91f5f5632de0"), vuori: U("photo-1464822759023-fed622ff2c3b"),
  saaristo: U("photo-1559128010-7c1ad6e1b6a7"), tunturi: U("photo-1520769945061-0a448c463865"),
  // Leisure
  harrastus: U("photo-1513364776144-60967b0f800f"), urheilu: U("photo-1517649763962-0c623066013b"),
  lukeminen: U("photo-1512820790803-83ca734da794"), musiikki: U("photo-1511379938547-c1f69419868d"),
  elokuva: U("photo-1489599849927-2ee91cede3ba"), uida: U("photo-1530549387789-4c1017266635"),
  juosta: U("photo-1552674605-db6ffd4facb5"), hiihtää: U("photo-1551698618-1dfe5d97d256"),
  valokuvata: U("photo-1452587925148-ce544e77e70d"), maalata: U("photo-1460661419201-fd4cecdf8a8b"),
  soittaa: U("photo-1507838153414-b4b713384a76"), kirjasto: U("photo-1521587760476-6c12a4b040da"),
  teatteri: U("photo-1503095396549-807759245b35"), konsertti: U("photo-1493225457124-a3eb161ffa5f"),
  näyttely: U("photo-1531243269054-5ebf6f34081e"), katsoa: U("photo-1485846234645-a62644f84728"),
  kuunnella: U("photo-1505740420928-5e560c06d30e"),
  // Education
  koulu: U("photo-1580582932707-520aed937b7b"), yliopisto: U("photo-1541339907198-e08756dedf3f"),
  kurssi: U("photo-1524178232363-1fb2b075b655"), luokka: U("photo-1509062522246-3755977927d7"),
  koe: U("photo-1434030216411-0b793f4b4173"), tehtävä: U("photo-1456513080510-7bf3a84b82f8"),
  kirja: U("photo-1544947950-fa07a98d237f"), opiskelija: U("photo-1523240795612-9a054b0db644"),
  oppilas: U("photo-1503676260728-1c00da094a0b"), todistus: U("photo-1589330694653-ded6df03f754"),
  arvosana: U("photo-1606326608606-aa0b62935f2b"), luento: U("photo-1524178232363-1fb2b075b655"),
  oppitunti: U("photo-1509062522246-3755977927d7"), valmistua: U("photo-1523050854058-8df90110c9f1"),
  läksy: U("photo-1456513080510-7bf3a84b82f8"), tentti: U("photo-1434030216411-0b793f4b4173"),
  lukio: U("photo-1562774053-701939374585"), lukukausi: U("photo-1427504494785-3a9ca7044f45"),
  // Shopping
  kauppa: U("photo-1604719312566-8912e9227c6a"), hinta: U("photo-1556742049-0cfed4f6a45d"),
  alennus: U("photo-1607083206968-13611e3d76db"), kassa: U("photo-1601598851547-4302969ef0e8"),
  kuitti: U("photo-1572883454114-3ef1f2b0a97c"), käteinen: U("photo-1526304640581-d334cdbbf45e"),
  kortti: U("photo-1556742111-a301076d9d18"), tarjous: U("photo-1607083206968-13611e3d76db"),
  pussi: U("photo-1591085686350-798c0f9faa7f"), kokonaishinta: U("photo-1553729459-afe8f2e2882d"),
  asiakas: U("photo-1549637642-90187f64f420"), takuu: U("photo-1589829545856-d10d557cf95f"),
  // Public Services
  asumistuki: U("photo-1560518883-ce09059eeffa"), toimeentulotuki: U("photo-1579621970563-ebec7560ff3e"),
  henkilötunnus: U("photo-1633265486064-086b219458ec"), lapsilisä: U("photo-1503454537195-1dcabb73ffb9"),
  opintotuki: U("photo-1523240795612-9a054b0db644"), viranomainen: U("photo-1575505586569-646b2ca898fc"),
  paketti: U("photo-1566576912321-d58ddd7a6088"), osoite: U("photo-1526778548025-fa2f459cd5c1"),
  lähettää: U("photo-1579783902614-a3fb3927b6a5"), allekirjoitus: U("photo-1450101499163-c8848c66ca85"),
  oleskelulupa: U("photo-1569154941061-e231b4725ef1"), työlupa: U("photo-1486312338219-ce68d2c6f44d"),
  posti: U("photo-1557200134-90327ee9fafa"), kirje: U("photo-1579783902614-a3fb3927b6a5"),
  postimaksu: U("photo-1553729784-e91953dec042"), postilaatikko: U("photo-1557200134-90327ee9fafa"),
  postinumero: U("photo-1526778548025-fa2f459cd5c1"), noutopiste: U("photo-1566576912321-d58ddd7a6088"),
  asuinkunta: U("photo-1449824913935-59a10b8d2000"), ilmoittautua: U("photo-1586281380349-632531db7ed4"),
  liite: U("photo-1554224154-26032ffc0d07"), päätös: U("photo-1589829545856-d10d557cf95f"),
  valittaa: U("photo-1573497019418-b400bb3ab074"), valitus: U("photo-1450101499163-c8848c66ca85"),
  vastaanottaa: U("photo-1553729784-e91953dec042"),
  // Emergency
  hätänumero: U("photo-1587825140708-dfaf72ae4b04"), ambulanssi: U("photo-1587745416684-47953f16f02f"),
  palokunta: U("photo-1586953208448-b95a79798f07"), tulipalo: U("photo-1486551937199-baf066858de7"),
  onnettomuus: U("photo-1603398938378-e54eab446dde"), ensiapu: U("photo-1576091160399-112ba8d25d1d"),
  vaara: U("photo-1558002038-1055907df827"), palovaroitin: U("photo-1585503418537-88331351ad99"),
  vakuutus: U("photo-1450101499163-c8848c66ca85"), pelastaa: U("photo-1587745416684-47953f16f02f"),
  hätäkeskus: U("photo-1587825140708-dfaf72ae4b04"), hälytys: U("photo-1504439468489-c8920d796a29"),
  hätäuloskäynti: U("photo-1565538810643-b5bdb714032a"), ensiapulaukku: U("photo-1603398938378-e54eab446dde"),
  sammutin: U("photo-1586953208448-b95a79798f07"), sammuttaa: U("photo-1486551937199-baf066858de7"),
  evakuoida: U("photo-1565538810643-b5bdb714032a"), turvallisuus: U("photo-1558002038-1055907df827"),
  poliisi: U("photo-1575505586569-646b2ca898fc"), rikosilmoitus: U("photo-1589829545856-d10d557cf95f"),
  varkaus: U("photo-1555949963-ff9fe0c870eb"), loukkaantua: U("photo-1603398938378-e54eab446dde"),
  kaatua: U("photo-1516574187841-cb9cc2ca948b"),
  // Social & Feelings
  lahja: U("photo-1513151233558-d860c5398176"), juhla: U("photo-1530103862676-de8c9debad1d"),
  mielipide: U("photo-1557804506-669a67965ba0"), iloinen: U("photo-1492681290082-e932832941e6"),
  surullinen: U("photo-1541199249251-f713e6145474"), väsynyt: U("photo-1541781774459-bb2af2f05b55"),
  vihainen: U("photo-1509248961158-e54f6934749c"), huolestunut: U("photo-1516302752625-fcc3c50ae61f"),
  innostunut: U("photo-1533227268428-f9ed0900fb3b"), pelottava: U("photo-1509099836639-18ba1795216d"),
  tyytyväinen: U("photo-1489278353717-f64c6ee8a4d2"), yllättynyt: U("photo-1504257432389-52343af06ae3"),
  jännittävä: U("photo-1506836467174-27f1042aa48c"), syntymäpäivä: U("photo-1558636508-e0db3814bd1d"),
  onnitella: U("photo-1577563908411-5077b6dc7624"), kutsua: U("photo-1529156069898-49953e39b3ac"),
  vierailla: U("photo-1543610892-0b1f7e6d8ac1"), jutella: U("photo-1573497019418-b400bb3ab074"),
  // Culture & Finland
  itsenäisyyspäivä: U("photo-1535498730771-e735b998cd64"), juhannus: U("photo-1498855926480-d98e83099315"),
  sisu: U("photo-1483721310020-03333e577078"), joulupukki: U("photo-1545622783-b3e021430fee"),
  revontulet: U("photo-1531366936337-7c912a4589a7"), mökki: U("photo-1510798831971-661eb04b3739"),
  jokamiehenoikeus: U("photo-1501854140801-50d01698950b"), kaamos: U("photo-1477601263568-180e2c6d046e"),
  sauna: U("photo-1535530992057-309c4f7b01e7"), joulu: U("photo-1545622783-b3e021430fee"),
  pääsiäinen: U("photo-1457301353672-324d6d14f471"), vappu: U("photo-1504196606672-aef5c9cefc92"),
  kokko: U("photo-1475552113915-6fcb52652ba2"), perinne: U("photo-1535498730771-e735b998cd64"),
  runeberginpäivä: U("photo-1558961363-fa8fdf82db35"), kansallislaulu: U("photo-1507676184212-d03ab07a01bf"),
  Kalevala: U("photo-1501854140801-50d01698950b"), Lappi: U("photo-1520769945061-0a448c463865"),
  // Home & Housing
  koti: U("photo-1518780664697-55e3ad937233"), huone: U("photo-1513694203232-719a280e022f"),
  keittiö: U("photo-1556909114-f6e7ad7d3136"), kylpyhuone: U("photo-1552321554-5fefe8c9ef14"),
  makuuhuone: U("photo-1540518614846-7eded433c457"), olohuone: U("photo-1585128792020-803d29415281"),
  ovi: U("photo-1600596542815-ffad4c1539a9"), ikkuna: U("photo-1509644851169-2acc08aa25b5"),
  seinä: U("photo-1560448204-e02f11c3d0e2"), lattia: U("photo-1585089854273-68c1c41e9d60"),
  pöytä: U("photo-1555041469-a586c61ea9bc"), tuoli: U("photo-1506439773649-6e0eb8cfb237"),
  sänky: U("photo-1540518614846-7eded433c457"), lamppu: U("photo-1507692812060-98338d07aca3"),
  jääkaappi: U("photo-1571175443880-49e1d25b2bc5"), pesukone: U("photo-1626806787461-102c1bfaaea1"),
  hissi: U("photo-1572981779307-38b8cabb2407"), kerros: U("photo-1486406146926-c627a92ad1ab"),
  parveke: U("photo-1499916078039-922301b0eb9b"), avain: U("photo-1582213782179-e0d53f98f2ca"),
  naapuri: U("photo-1543610892-0b1f7e6d8ac1"), sähkö: U("photo-1473341304170-971dccb5ac1e"),
  vuokra: U("photo-1560518883-ce09059eeffa"), vuokrasopimus: U("photo-1554224154-26032ffc0d07"),
  taloyhtiö: U("photo-1486406146926-c627a92ad1ab"), remontti: U("photo-1581092160607-ee22621dd758"),
  // Common verbs
  puhua: U("photo-1573497019418-b400bb3ab074"), syödä: U("photo-1504674900247-0877df9cc836"),
  juoda: U("photo-1544145945-f90425340c7e"), mennä: U("photo-1476480862126-209bfaa8edc8"),
  tulla: U("photo-1506784983877-45594efa4cbe"), tehdä: U("photo-1504384308090-c894fdcc538d"),
  lukea: U("photo-1512820790803-83ca734da794"), kirjoittaa: U("photo-1455390582262-044cdead277a"),
  asua: U("photo-1560518883-ce09059eeffa"), opiskella: U("photo-1523240795612-9a054b0db644"),
  työskennellä: U("photo-1521737604893-d14cc237f11d"), ostaa: U("photo-1472851294608-062f824d29cc"),
  maksaa: U("photo-1556742111-a301076d9d18"), odottaa: U("photo-1501139083538-0139583c060f"),
  auttaa: U("photo-1469571486292-0ba58a3f068b"), nukkua: U("photo-1541781774459-bb2af2f05b55"),
  herätä: U("photo-1506126613408-eca07ce68773"), pestä: U("photo-1552321554-5fefe8c9ef14"),
  pukea: U("photo-1489987707025-afc232f7ea0f"), kävellä: U("photo-1551884170-09fb70a3a2ed"),
  lähteä: U("photo-1488085061387-422e29b40080"), palata: U("photo-1507003211169-0a1dd7228f2d"),
  muuttaa: U("photo-1600518464441-9154a4dea21b"), varata: U("photo-1506784983877-45594efa4cbe"),
  pyytää: U("photo-1573497019418-b400bb3ab074"),
  // Common nouns & adjectives
  auto: U("photo-1494976388531-d1058494cdd8"), ihminen: U("photo-1529156069898-49953e39b3ac"),
  lapsi: U("photo-1503454537195-1dcabb73ffb9"), raha: U("photo-1554224155-6726b3ff858f"),
  kaupunki: U("photo-1449824913935-59a10b8d2000"), sää: U("photo-1504608524841-42fe6f032b4b"),
  perhe: U("photo-1511895426328-dc8714191300"), ystävä: U("photo-1543610892-0b1f7e6d8ac1"),
  aamu: U("photo-1506748686214-e9df14d4d9d0"), ilta: U("photo-1477601263568-180e2c6d046e"),
  yö: U("photo-1507400492013-162706c8c05e"),
  // Greetings & Phrases
  hei: U("photo-1529156069898-49953e39b3ac"), terve: U("photo-1577563908411-5077b6dc7624"),
  tervetuloa: U("photo-1558618666-fcd25c85f82e"), kiitos: U("photo-1489278353717-f64c6ee8a4d2"),
  anteeksi: U("photo-1516302752625-fcc3c50ae61f"),
  // Emotions & Personality
  onnellinen: U("photo-1492681290082-e932832941e6"),
  pelokas: U("photo-1509099836639-18ba1795216d"),
  ylpeä: U("photo-1507003211169-0a1dd7228f2d"),
  rohkea: U("photo-1483721310020-03333e577078"), ujo: U("photo-1517849845537-4d257902454a"),
  ahkera: U("photo-1504384308090-c894fdcc538d"), laiska: U("photo-1541781774459-bb2af2f05b55"),
  kärsivällinen: U("photo-1506126613408-eca07ce68773"), ystävällinen: U("photo-1543610892-0b1f7e6d8ac1"),
  rehellinen: U("photo-1521791055366-0d553872125f"), kiitollinen: U("photo-1489278353717-f64c6ee8a4d2"),
  stressaantunut: U("photo-1516302752625-fcc3c50ae61f"),
  // Technology
  tietokone: U("photo-1496181133206-80ce9b88a853"), puhelin: U("photo-1511707171634-5f897ff02aa9"),
  sähköposti: U("photo-1596526131083-e8c633c948d2"), salasana: U("photo-1555949963-ff9fe0c870eb"),
  sovellus: U("photo-1512941937669-90a1b58e7e9c"), verkko: U("photo-1544197150-b99a580bb7a8"),
  tulostin: U("photo-1612815154858-60aa4c59eaa6"), näppäimistö: U("photo-1587829741301-dc798b83add3"),
  näyttö: U("photo-1527443224154-c4a3942d3acf"), ladata: U("photo-1511707171634-5f897ff02aa9"),
  tallentaa: U("photo-1496181133206-80ce9b88a853"), verkkosivusto: U("photo-1460925895917-afdab827c52f"),
  hakukone: U("photo-1555949963-ff9fe0c870eb"), tabletti: U("photo-1544244015-0df4b3ffc6b0"),
  päivittää: U("photo-1512941937669-90a1b58e7e9c"),
  // Travel & Tourism
  hotelli: U("photo-1566073771259-6a8506099945"), majoitus: U("photo-1582719508461-905c673771eb"),
  varaus: U("photo-1506784983877-45594efa4cbe"), passi: U("photo-1569154941061-e231b4725ef1"),
  viisumi: U("photo-1569154941061-e231b4725ef1"), matkatoimisto: U("photo-1488646953014-85cb44e25828"),
  opas: U("photo-1469854523086-cc02fe5d8800"), nähtävyys: U("photo-1467269204594-9661b134dd2b"),
  retki: U("photo-1501785888041-af3ef285b470"),
  muistomerkki: U("photo-1467269204594-9661b134dd2b"),
  museo: U("photo-1531243269054-5ebf6f34081e"), ranta: U("photo-1505118380757-91f5f5632de0"),
  vuokrata: U("photo-1494976388531-d1058494cdd8"),
  // Society & Media
  uutiset: U("photo-1495020689067-958852a7765e"), sanomalehti: U("photo-1504711331083-9c895941bf81"),
  vaalit: U("photo-1540910419892-4a36d2c3266c"), äänestää: U("photo-1540910419892-4a36d2c3266c"),
  laki: U("photo-1589829545856-d10d557cf95f"), oikeus: U("photo-1589829545856-d10d557cf95f"),
  verotus: U("photo-1554224155-6726b3ff858f"), kansalainen: U("photo-1529156069898-49953e39b3ac"),
  mainos: U("photo-1557838923-2985c318be48"), toimittaja: U("photo-1504711331083-9c895941bf81"),
  ohjelma: U("photo-1485846234645-a62644f84728"), artikkeli: U("photo-1495020689067-958852a7765e"),
  yhteiskunta: U("photo-1449824913935-59a10b8d2000"),
  // Family (expansion4)
  äiti: U("photo-1596464716127-f2a82984de30"), isä: U("photo-1540569014015-19a7be504e3a"),
  veli: U("photo-1529333166437-7750a6dd5a70"), sisko: U("photo-1516627145497-ae6968895b74"),
  vaimo: U("photo-1519741497674-611481863552"), mummo: U("photo-1581579438747-104c53d7fbc4"),
  ukki: U("photo-1566753323558-f4e0952af115"), vauva: U("photo-1522771739844-6a9f6d5f14af"),
  serkku: U("photo-1529156069898-49953e39b3ac"), täti: U("photo-1544005313-94ddf0286df2"),
  setä: U("photo-1507003211169-0a1dd7228f2d"), anoppi: U("photo-1581579438747-104c53d7fbc4"),
  sisarus: U("photo-1511895426328-dc8714191300"), tytär: U("photo-1516627145497-ae6968895b74"),
  poika: U("photo-1503454537195-1dcabb73ffb9"), puoliso: U("photo-1519741497674-611481863552"),
  // Food expansion
  voileipä: U("photo-1528735602780-2552fd46c7af"), jäätelö: U("photo-1497034825429-c343d7c6a68f"),
  kana: U("photo-1587593810167-a84920ea0781"), pasta: U("photo-1551462147-37885acc36f1"),
  jogurtti: U("photo-1488477181946-6428a0291777"), olut: U("photo-1535958636474-b021ee887b13"),
  omena: U("photo-1570913149827-d2ac84ab3f9a"), riisi: U("photo-1516684732162-798a0062be99"),
  mehu: U("photo-1600271886742-f049cd451bba"), sokeri: U("photo-1558642452-9d2a7deb7f62"),
  suola: U("photo-1518110925495-5fe2c8cf4caa"),
  // Hobbies expansion
  lenkkeily: U("photo-1476480862126-209bfaa8edc8"), uinti: U("photo-1530549387789-4c1017266635"),
  maalaus: U("photo-1460661419201-fd4cecdf8a8b"), peli: U("photo-1511512578047-dfb367046420"),
  kalastus: U("photo-1504309092620-4d0ec726efa4"), pyöräily: U("photo-1541625602330-2277a4c46182"),
  valokuvaus: U("photo-1452587925148-ce544e77e70d"), hiihtäminen: U("photo-1551698618-1dfe5d97d256"),
  luistelu: U("photo-1551632436-cbf8dd35adfa"), puutarha: U("photo-1416879595882-3373a0480b5b"),
  lautapeli: U("photo-1610890716171-6b1bb98ffd09"), käsityö: U("photo-1452587925148-ce544e77e70d"),
  // Health expansion
  nuha: U("photo-1578307985320-34b61a66c195"), polvi: U("photo-1571019613454-1cb2f99b2d8b"),
  // Missing greetings & social
  näkemiin: U("photo-1529156069898-49953e39b3ac"), kyllä: U("photo-1489278353717-f64c6ee8a4d2"),
  ei: U("photo-1509248961158-e54f6934749c"),
  // Missing travel
  loma: U("photo-1507525428034-b723cf961d3e"),
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
  emotions: "https://images.unsplash.com/photo-1492681290082-e932832941e6?auto=format&fit=crop&w=400&h=300&q=80",
  technology: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=400&h=300&q=80",
  travel: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=400&h=300&q=80",
  society: "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=400&h=300&q=80",
  family: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=400&h=300&q=80",
  relationships: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=400&h=300&q=80",
  body: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&h=300&q=80",
  hobbies: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=400&h=300&q=80",
  drinks: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&h=300&q=80",
  daily: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&h=300&q=80",
  puhekieli: "https://images.unsplash.com/photo-1573497019418-b400bb3ab074?auto=format&fit=crop&w=400&h=300&q=80",
  home: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=400&h=300&q=80",
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
    void playFinnishTts(vocab.word, { playbackRate: 0.85, speechRate: 0.8 }).then((played) => {
      if (!played) {
        toast.error("Không thể phát âm chuẩn tiếng Phần Lan trên thiết bị này.");
      }
      setIsPlaying(false);
    });
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
      className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all group shadow-sm"
    >
      {/* Two-column layout: text left, image right */}
      <div className="flex flex-col sm:flex-row">
        {/* Left column — text content (60%) */}
        <div className="flex-1 p-5 sm:p-6 min-w-0">
          {/* Top row: Word + POS + Category badges */}
          <div className="flex items-start gap-2 mb-3 flex-wrap">
            <h3 className="text-[20px] font-extrabold text-gray-900 leading-tight">{vocab.word}</h3>
            <Badge className={`text-[10px] shrink-0 ${posColors[vocab.partOfSpeech] || posColors.noun}`}>
              {vocab.partOfSpeech.charAt(0).toUpperCase()}
            </Badge>
            {vocab.category && (
              <Badge className="text-[10px] bg-primary/80 text-white shrink-0">
                {vocab.category}
              </Badge>
            )}
            {isMastered && (
              <Badge className="text-[10px] bg-amber-500 text-white shrink-0 gap-0.5">
                <Star className="w-2.5 h-2.5 fill-white" /> Mastered
              </Badge>
            )}
            {/* Audio + Star icons */}
            <div className="ml-auto flex items-center gap-1.5 shrink-0">
              <button
                onClick={playAudio}
                className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                aria-label={`Play pronunciation for ${vocab.word}`}
              >
                {isPlaying ? <VolumeX className="w-3.5 h-3.5 text-gray-600" /> : <Volume2 className="w-3.5 h-3.5 text-gray-600" />}
              </button>
              {onMaster && (
                <button
                  onClick={(e) => onMaster(vocab.word, e)}
                  className="w-7 h-7 rounded-full bg-gray-100 hover:bg-amber-100 flex items-center justify-center transition-colors"
                  aria-label={isMastered ? "Unmark mastered" : "Mark as mastered"}
                >
                  <Star className={`w-3.5 h-3.5 ${isMastered ? "fill-amber-400 text-amber-400" : "text-gray-400"}`} />
                </button>
              )}
            </div>
          </div>

          {/* Pronunciation */}
          {vocab.ipa && <p className="text-[13px] text-gray-500 mb-2 font-mono">{vocab.ipa}</p>}

          {/* Meanings */}
          <p className="text-[17px] font-bold text-blue-700 mb-1">{vocab.meaningEn}</p>
          <p className="text-[15px] text-gray-600 mb-3">{vocab.meaningVi}</p>

          {vocab.puhekieli && vocab.puhekieli !== vocab.word && (
            <div className="mb-3">
              <Badge variant="outline" className="text-[11px] border-orange-400 text-orange-600">
                🗣️ Puhekieli: {vocab.puhekieli}
              </Badge>
            </div>
          )}

          {/* Example sentence */}
          <div className="pt-2 border-t border-gray-200 space-y-1">
            <p className="text-[15px] text-gray-800 font-medium leading-relaxed">
              <span className="text-gray-400 text-[13px]">Example:</span> {vocab.example}
            </p>
            <p className="text-[13px] text-gray-500 italic">{vocab.exampleEn}</p>
          </div>

          {/* Conjugation popover for verbs */}
          {vocab.partOfSpeech === "verb" && VERB_CONJUGATIONS[vocab.word] && (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="mt-3 text-xs gap-1 border-gray-300 text-gray-600 hover:bg-gray-50">
                  🔄 Conjugation
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-72 bg-white border-gray-200">
                <h4 className="font-bold mb-2 text-sm text-gray-900">Conjugation: {vocab.word}</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="font-semibold text-primary mb-1">Present</p>
                    {VERB_CONJUGATIONS[vocab.word].present.map((form, i) => (
                      <p key={i} className="text-gray-500">{PERSONS[i]}: <span className="text-gray-900 font-medium">{form}</span></p>
                    ))}
                  </div>
                  <div>
                    <p className="font-semibold text-primary mb-1">Past</p>
                    {VERB_CONJUGATIONS[vocab.word].past.map((form, i) => (
                      <p key={i} className="text-gray-500">{PERSONS[i]}: <span className="text-gray-900 font-medium">{form}</span></p>
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
            {imageUrl && !imgError ? (
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
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-white/20 pointer-events-none" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Spaced Repetition Engine (Leitner system with localStorage)
interface SRData {
  box: number; // 1-5 (1=new/hard, 5=well-known)
  nextReview: number; // timestamp
  lastReview: number;
  correctStreak: number;
}

const SR_KEY = "yki-spaced-repetition";
const BOX_INTERVALS = [0, 1, 3, 7, 14, 30]; // days per box level

const getSRStore = (): Record<string, SRData> => {
  try { return JSON.parse(localStorage.getItem(SR_KEY) || "{}"); } catch { return {}; }
};

const saveSRStore = (store: Record<string, SRData>) => {
  localStorage.setItem(SR_KEY, JSON.stringify(store));
};

const getSRData = (word: string): SRData => {
  const store = getSRStore();
  return store[word] || { box: 1, nextReview: 0, lastReview: 0, correctStreak: 0 };
};

const updateSRData = (word: string, correct: boolean) => {
  const store = getSRStore();
  const current = store[word] || { box: 1, nextReview: 0, lastReview: 0, correctStreak: 0 };
  const now = Date.now();
  
  if (correct) {
    current.box = Math.min(current.box + 1, 5);
    current.correctStreak += 1;
  } else {
    current.box = Math.max(current.box - 1, 1);
    current.correctStreak = 0;
  }
  
  current.lastReview = now;
  current.nextReview = now + BOX_INTERVALS[current.box] * 24 * 60 * 60 * 1000;
  store[word] = current;
  saveSRStore(store);
  return current;
};

const sortBySR = (vocabulary: FinnishVocabEntry[]): FinnishVocabEntry[] => {
  const now = Date.now();
  return [...vocabulary].sort((a, b) => {
    const srA = getSRData(a.word);
    const srB = getSRData(b.word);
    // Priority: due for review first, then lower box first, then never-reviewed first
    const dueA = srA.nextReview <= now ? 0 : 1;
    const dueB = srB.nextReview <= now ? 0 : 1;
    if (dueA !== dueB) return dueA - dueB;
    return srA.box - srB.box;
  });
};

// SR confidence level colors
const SR_BOX_COLORS = [
  "", // unused index 0
  "bg-red-100 text-red-700 border-red-200",      // box 1 - new/hard
  "bg-orange-100 text-orange-700 border-orange-200", // box 2
  "bg-yellow-100 text-yellow-700 border-yellow-200", // box 3
  "bg-emerald-100 text-emerald-700 border-emerald-200", // box 4
  "bg-blue-100 text-blue-700 border-blue-200",    // box 5 - mastered
];

const SR_BOX_LABELS = ["", "Uusi", "Oppimassa", "Tuttu", "Hyvin tuttu", "Osattu"];

// Flashcard View Component
const FlashcardView = ({
  vocabulary,
  currentIndex,
  isFlipped,
  onFlip,
  onNext,
  onPrev,
  isMastered,
  onMaster,
  srMode = false,
  onSRAnswer,
}: {
  vocabulary: FinnishVocabEntry[];
  currentIndex: number;
  isFlipped: boolean;
  onFlip: () => void;
  onNext: () => void;
  onPrev: () => void;
  isMastered: (word: string) => boolean;
  onMaster: (word: string, e: React.MouseEvent) => void;
  srMode?: boolean;
  onSRAnswer?: (word: string, correct: boolean) => void;
}) => {
  const vocab = vocabulary[currentIndex];
  if (!vocab) return null;

  const imageUrl = getVocabImageUrl(vocab.meaningEn, vocab.word, vocab.category);
  const illustration = getWordIllustration(vocab.word);
  const gradient = getCategoryGradient(vocab.category);
  const mastered = isMastered(vocab.word);
  const srData = srMode ? getSRData(vocab.word) : null;

  // Keyboard support
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code === "Space") { e.preventDefault(); onFlip(); }
      if (e.code === "ArrowRight") onNext();
      if (e.code === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onFlip, onNext, onPrev]);

  // Count due words
  const now = Date.now();
  const dueCount = vocabulary.filter(v => getSRData(v.word).nextReview <= now).length;

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Counter + SR info */}
      <div className="flex items-center gap-3 flex-wrap justify-center">
        <Badge variant="outline" className="text-sm px-3 py-1">
          {currentIndex + 1} / {vocabulary.length}
        </Badge>
        {srMode && (
          <Badge className="bg-primary/10 text-primary text-sm gap-1">
            🔄 {dueCount} due
          </Badge>
        )}
        {srMode && srData && (
          <Badge className={`text-xs border ${SR_BOX_COLORS[srData.box]}`}>
            📦 Box {srData.box}: {SR_BOX_LABELS[srData.box]}
          </Badge>
        )}
        {mastered && (
          <Badge className="bg-amber-500 text-white text-sm gap-1">
            <Star className="w-3 h-3 fill-white" /> Mastered
          </Badge>
        )}
      </div>

      {/* Flashcard */}
      <div
        className="w-full max-w-lg cursor-pointer"
        style={{ perspective: "1000px" }}
        onClick={onFlip}
      >
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 260, damping: 20 }}
          style={{ transformStyle: "preserve-3d" }}
          className="relative w-full min-h-[320px]"
        >
          {/* Front */}
          <div
            className="absolute inset-0 bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden"
            style={{ backfaceVisibility: "hidden" }}
          >
            {/* Image */}
            <div className="h-40 relative overflow-hidden">
              {imageUrl ? (
                <img src={imageUrl} alt={vocab.meaningEn} className="w-full h-full object-cover" loading="lazy" />
              ) : (
                <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                  <span className="text-5xl">{illustration}</span>
                </div>
              )}
            </div>
            <div className="p-6 text-center">
              <h2 className="text-3xl font-extrabold text-foreground mb-2">{vocab.word}</h2>
              {vocab.ipa && <p className="text-sm text-muted-foreground font-mono mb-3">{vocab.ipa}</p>}
              <p className="text-sm text-muted-foreground">Klikkaa kääntääksesi • Click to flip</p>
              <button
                onClick={(e) => { e.stopPropagation(); speakFinnish(vocab.word); }}
                className="mt-3 w-10 h-10 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center mx-auto transition-colors"
              >
                <Volume2 className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden p-6"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
              <p className="text-xl font-bold text-blue-700">{vocab.meaningEn}</p>
              <p className="text-lg text-gray-600">{vocab.meaningVi}</p>
              {vocab.puhekieli && vocab.puhekieli !== vocab.word && (
                <Badge variant="outline" className="text-xs border-orange-400 text-orange-600">
                  🗣️ Puhekieli: {vocab.puhekieli}
                </Badge>
              )}
              <div className="mt-3 pt-3 border-t border-gray-200 w-full">
                <p className="text-sm text-gray-800 font-medium">{vocab.example}</p>
                <p className="text-xs text-gray-500 italic mt-1">{vocab.exampleEn}</p>
              </div>

              {/* SR Answer Buttons — shown on back of card */}
              {srMode && isFlipped && onSRAnswer && (
                <div className="mt-4 pt-3 border-t border-gray-200 w-full">
                  <p className="text-xs text-muted-foreground mb-2">Muistitko tämän sanan?</p>
                  <div className="flex gap-3 justify-center">
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1 border-red-300 text-red-600 hover:bg-red-50"
                      onClick={(e) => { e.stopPropagation(); onSRAnswer(vocab.word, false); onNext(); }}
                    >
                      ❌ Ei
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1 border-emerald-300 text-emerald-600 hover:bg-emerald-50"
                      onClick={(e) => { e.stopPropagation(); onSRAnswer(vocab.word, true); onNext(); }}
                    >
                      ✅ Kyllä
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={onPrev} disabled={currentIndex === 0} className="gap-1">
          <ChevronLeft className="w-4 h-4" /> Edellinen
        </Button>
        <button
          onClick={(e) => onMaster(vocab.word, e)}
          className="w-10 h-10 rounded-full bg-muted hover:bg-amber-100 flex items-center justify-center transition-colors"
        >
          <Star className={`w-5 h-5 ${mastered ? "fill-amber-400 text-amber-400" : "text-gray-400"}`} />
        </button>
        <Button variant="outline" size="sm" onClick={onNext} disabled={currentIndex === vocabulary.length - 1} className="gap-1">
          Seuraava <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      <p className="text-xs text-muted-foreground">⌨️ Space = flip, ← → = navigate</p>
    </div>
  );
};


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
          {showFinnishOnly ? (showTranslation ? "Select the correct answer" : "Valitse oikea vaihtoehto") : "Quiz"}
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
              {score >= quiz.length * 0.8 ? (showTranslation ? "Excellent! 🌟" : "Erinomainen! 🌟") : score >= quiz.length * 0.6 ? (showTranslation ? "Good job! 👍" : "Hyvä työ! 👍") : (showTranslation ? "Keep practicing! 💪" : "Harjoittele lisää! 💪")}
            </span>
          </div>
          <Button size="sm" variant="ghost" onClick={handleReset} className="ml-auto">{showTranslation ? "Try again" : "Yritä uudelleen"}</Button>
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
            </p>
          )}
        </div>
      ))}

      {!submitted && Object.keys(answers).length > 0 && (
        <Button onClick={handleSubmit} className="w-full text-lg py-6 font-bold">
          {showTranslation ? "Submit answers ✓" : "Lähetä vastaukset ✓"}
        </Button>
      )}
    </div>
  );
};

// Writing Section with word counter
// Sample A2 model answers for writing tasks
const SAMPLE_ANSWERS: Record<string, string> = {
  "yki-mock-writing-1": `Hei Mikka!

Miten menee? Minulla on hyviä uutisia! Aloitin uuden suomen kielen kurssin viime viikolla. Kurssi on Helsingin kansalaisopistossa maanantaisin ja keskiviikkoisin kello 18–20. Opettaja on todella mukava ja tunnit ovat hauskoja. Opimme paljon uusia sanoja ja puhumme paljon suomea tunnilla. Haluaisitko tulla mukaan? Kurssilla on vielä tilaa!

Nähdään pian!
Terveisin, [Nimi]`,
  "yki-mock-writing-2": `Hei opettaja!

En valitettavasti pääse huomisen tunnille. Lapseni on sairas ja minun täytyy olla kotona hänen kanssaan. Voisitteko ystävällisesti kertoa, mitä tunnilla tehdään? Jos on läksyjä, voisitteko lähettää ne minulle sähköpostilla?

Kiitos ymmärryksestä!
Ystävällisin terveisin, [Nimi]`,
  "yki-mock-writing-3": `Hyvä ravintolan johtaja,

Haluan valittaa palvelusta ravintolassanne viime lauantaina. Ensinnäkin odotimme ruokaa 45 minuuttia, mikä on liian pitkä aika. Kun ruoka vihdoin tuli, se oli kylmää. Lisäksi tarjoilija oli epäystävällinen eikä pyytänyt anteeksi. Olen pettynyt palveluun, koska ravintolanne on yleensä hyvä. Toivoisin hyvitystä tai anteeksipyyntöä.

Ystävällisin terveisin, [Nimi]`,
  "yki-mock-writing-4": `Hei ystävät!

Tervetuloa juhlimaan kanssani! Täytän 30 vuotta lauantaina 15. maaliskuuta. Juhlat ovat kotonani osoitteessa Mannerheimintie 10 kello 18 alkaen. Tarjolla on ruokaa, kakkua ja juomia. Illalla on myös musiikkia ja pelejä. Ilmoitathan tulostasi 10. maaliskuuta mennessä!

Nähdään juhlissa!
[Nimi]`,
  "yki-mock-writing-5": `Hyvä isännöitsijä,

Haluan ilmoittaa viasta asunnossani. Kylpyhuoneen hana on vuotanut viikon ajan. Vesi tippuu koko ajan, vaikka hana on kiinni. Pyydän korjausta mahdollisimman pian, koska tilanne pahenee. Olen kotona arkisin kello 16 jälkeen ja viikonloppuisin koko päivän. Voitte soittaa minulle numeroon 040-1234567.

Ystävällisin terveisin, [Nimi]`,
};

const getSampleAnswer = (lessonId: string): string => {
  return SAMPLE_ANSWERS[lessonId] || `Hei!

Tässä on esimerkkivastaus A2-tasolla. Muista käyttää yksinkertaisia lauseita, vastata kaikkiin kysymyksiin ja tarkistaa oikeinkirjoitus. Hyvä vastaus on 50–80 sanaa pitkä.

Onnea harjoitteluun!`;
};

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
          ✍️ {showTranslation ? "Writing Task" : "Kirjoitustehtävä"}
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
              <Timer className="w-4 h-4" /> {showTranslation ? "Start (15 min)" : "Aloita (15 min)"}
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
          placeholder={showTranslation ? "Write your answer here..." : "Kirjoita vastauksesi tähän..."}
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
        <div className="space-y-4">
          <Card className="border-emerald-200 bg-emerald-50/50 dark:bg-emerald-900/20 dark:border-emerald-800">
            <CardContent className="p-4">
              <p className="font-bold text-emerald-800 dark:text-emerald-300 mb-2">✅ Vastauksesi on lähetetty!</p>
              <p className="text-sm text-muted-foreground">Sanamäärä: {wordCount}. Tarkista vastauksesi ja vertaa tehtävänantoon.</p>
              <Button variant="ghost" size="sm" className="mt-2" onClick={() => { setSubmitted(false); setText(""); setTimeLeft(15 * 60); }}>
                Kirjoita uudelleen
              </Button>
            </CardContent>
          </Card>

          {/* Writing hints */}
          <Card className="border-blue-200 bg-blue-50/50 dark:bg-blue-900/20 dark:border-blue-800">
            <CardContent className="p-4">
              <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-2">💡 Vinkkejä kirjoittamiseen</h4>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Aloita tervehdyksellä ja lopeta lopputoivotuksella.</li>
                <li>Käytä yksinkertaisia lauseita ja tuttuja sanoja.</li>
                <li>Vastaa kaikkiin tehtävänannon kysymyksiin.</li>
                <li>Tarkista oikeinkirjoitus ennen lähettämistä.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Model A2 answer */}
          <Card className="border-amber-200 bg-amber-50/50 dark:bg-amber-900/20 dark:border-amber-800">
            <CardContent className="p-4">
              <h4 className="font-bold text-amber-800 dark:text-amber-300 mb-2">📝 Mallivastaus (A2-taso)</h4>
              <div className="text-sm text-foreground leading-relaxed whitespace-pre-line">
                {getSampleAnswer(lesson.id)}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

// Speaking Recorder Component for mock exams with model answer + grading
const SpeakingRecorder = ({ lesson }: { lesson?: FinnishLesson }) => {
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(40);
  const [showTranslation, setShowTranslation] = useState(false);
  const [showSampleAnswer, setShowSampleAnswer] = useState(false);
  const [isPlayingModel, setIsPlayingModel] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [graded, setGraded] = useState(false);
  const [accuracy, setAccuracy] = useState(0);
  const [wordResults, setWordResults] = useState<{ word: string; status: "correct" | "incorrect" | "missing" }[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const recognitionRef = useRef<any>(null);

  const sampleAnswer = lesson?.sampleAnswer || "";

  // Normalize text for comparison
  const normalize = (text: string) => text.toLowerCase().replace(/[^a-zäöåü\s]/g, "").trim();

  // Simple Levenshtein
  const levenshtein = (a: string, b: string): number => {
    const m = a.length, n = b.length;
    const dp = Array.from({ length: m + 1 }, (_, i) => {
      const row = new Array(n + 1).fill(0);
      row[0] = i;
      return row;
    });
    for (let j = 1; j <= n; j++) dp[0][j] = j;
    for (let i = 1; i <= m; i++)
      for (let j = 1; j <= n; j++)
        dp[i][j] = a[i-1] === b[j-1] ? dp[i-1][j-1] : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
    return dp[m][n];
  };

  // Grade transcript against sample answer
  const gradeTranscript = (spokenText: string) => {
    if (!sampleAnswer) return;
    const sampleWords = normalize(sampleAnswer).split(/\s+/).filter(Boolean);
    const spokenWords = normalize(spokenText).split(/\s+/).filter(Boolean);
    
    const results: { word: string; status: "correct" | "incorrect" | "missing" }[] = [];
    let correct = 0;
    
    for (const sw of sampleWords) {
      const match = spokenWords.find(w => w === sw || levenshtein(w, sw) <= 1);
      if (match) {
        results.push({ word: sw, status: "correct" });
        correct++;
      } else {
        results.push({ word: sw, status: "missing" });
      }
    }
    
    // Check for incorrect spoken words not in sample
    for (const w of spokenWords) {
      const inSample = sampleWords.some(sw => sw === w || levenshtein(w, sw) <= 1);
      if (!inSample) {
        results.push({ word: w, status: "incorrect" });
      }
    }
    
    setWordResults(results);
    setAccuracy(sampleWords.length > 0 ? Math.round((correct / sampleWords.length) * 100) : 0);
    setGraded(true);
  };

  // Play model answer via TTS
  const playModelAnswer = async () => {
    if (!sampleAnswer || isPlayingModel) return;
    setIsPlayingModel(true);
    try {
      const sentences = sampleAnswer.split(/(?<=[.!?])\s+/).filter(s => s.trim());
      for (const sentence of sentences) {
        await playFinnishTts(sentence.trim());
        await new Promise(r => setTimeout(r, 600));
      }
    } catch { /* handled */ }
    setIsPlayingModel(false);
  };

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
      setTranscript("");
      setGraded(false);

      // Start speech recognition
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "fi-FI";
        let finalText = "";
        recognition.onresult = (event: any) => {
          let interim = "";
          for (let i = 0; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
              finalText += event.results[i][0].transcript + " ";
            } else {
              interim += event.results[i][0].transcript;
            }
          }
          setTranscript((finalText + interim).trim());
        };
        recognition.onerror = () => {};
        recognition.start();
        recognitionRef.current = recognition;
      }

      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            recorder.stop();
            setRecording(false);
            if (timerRef.current) clearInterval(timerRef.current);
            recognitionRef.current?.stop();
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
    recognitionRef.current?.stop();
  };

  // Auto-grade when recording stops and we have transcript + sample
  useEffect(() => {
    if (!recording && transcript && sampleAnswer && !graded) {
      gradeTranscript(transcript);
    }
  }, [recording, transcript]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          🎤 Puhumistehtävä
        </h3>
        <div className="flex items-center gap-2">
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

      {/* Model answer section */}
      {sampleAnswer && (
        <Card className="border-amber-200 bg-amber-50/50 dark:bg-amber-900/20 dark:border-amber-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-amber-800 dark:text-amber-300 text-sm flex items-center gap-2">
                🎧 Mallivastaus (Bài nói mẫu)
              </h4>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={playModelAnswer}
                  disabled={isPlayingModel}
                  className="gap-1 text-xs border-amber-300 text-amber-700 hover:bg-amber-100"
                >
                  {isPlayingModel ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Volume2 className="w-3.5 h-3.5" />}
                  {isPlayingModel ? "Toistetaan..." : "Kuuntele"}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowSampleAnswer(!showSampleAnswer)}
                  className="text-xs text-amber-700"
                >
                  {showSampleAnswer ? "Piilota teksti" : "Näytä teksti"}
                </Button>
              </div>
            </div>
            {showSampleAnswer && (
              <p className="text-sm text-foreground leading-relaxed mt-2 p-3 bg-amber-100/50 dark:bg-amber-900/30 rounded-lg">
                {sampleAnswer}
              </p>
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

          {/* Live transcript */}
          {(recording || transcript) && (
            <div className="mt-4 p-3 bg-muted/50 rounded-lg">
              <p className="text-xs font-medium text-muted-foreground mb-1">📝 Transkriptio:</p>
              <p className="text-sm text-foreground min-h-[40px]">
                {transcript || <span className="text-muted-foreground italic">Puhu nyt...</span>}
              </p>
            </div>
          )}

          {audioUrl && (
            <div className="mt-4 flex items-center gap-3">
              <audio controls src={audioUrl} className="h-10 flex-1" />
              <Button variant="outline" size="sm" onClick={() => { setAudioUrl(null); setTranscript(""); setGraded(false); setWordResults([]); }}>
                Nauhoita uudelleen
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Grading results */}
      {graded && sampleAnswer && (
        <Card className="border-emerald-200 bg-emerald-50/50 dark:bg-emerald-900/20 dark:border-emerald-800">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-emerald-800 dark:text-emerald-300 text-sm">📊 Arviointi (Đánh giá)</h4>
              <Badge className={`text-lg px-4 py-1 ${accuracy >= 80 ? "bg-emerald-500" : accuracy >= 50 ? "bg-amber-500" : "bg-rose-500"} text-white`}>
                {accuracy}%
              </Badge>
            </div>

            {/* Word-by-word results */}
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">Sanavertailu (So sánh từ):</p>
              <div className="flex flex-wrap gap-1.5">
                {wordResults.map((wr, i) => (
                  <span
                    key={i}
                    className={`px-2 py-0.5 rounded text-xs font-medium ${
                      wr.status === "correct" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300" :
                      wr.status === "incorrect" ? "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300" :
                      "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
                    }`}
                  >
                    {wr.word} {wr.status === "correct" ? "✓" : wr.status === "missing" ? "✗" : "?"}
                  </span>
                ))}
              </div>
              <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                <span>✓ Oikein (Đúng)</span>
                <span>✗ Puuttuu (Thiếu)</span>
                <span>? Ylimääräinen (Thừa)</span>
              </div>
            </div>

            {/* Improvement tips */}
            <div className="pt-3 border-t border-emerald-200 dark:border-emerald-800">
              <h5 className="font-semibold text-sm text-foreground mb-2">💡 Parannusehdotuksia (Gợi ý cải thiện):</h5>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                {accuracy < 50 && <li>Kuuntele mallivastaus uudelleen ja toista perässä.</li>}
                {accuracy < 80 && <li>Keskity puuttuviin sanoihin (keltaisella merkityt).</li>}
                {accuracy >= 80 && <li>Erinomainen! Yritä käyttää lisää omia lauseita.</li>}
                <li>Harjoittele ääntämistä AI Puhevalmennus -osiossa.</li>
              </ul>
            </div>

            {/* Re-listen model */}
            <Button
              size="sm"
              variant="outline"
              onClick={playModelAnswer}
              disabled={isPlayingModel}
              className="gap-1 text-xs"
            >
              <Volume2 className="w-3.5 h-3.5" />
              Kuuntele mallivastaus uudelleen
            </Button>
          </CardContent>
        </Card>
      )}
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

  const [activePillar, setActivePillar] = useState<"vocabulary" | "lessons" | "mock-exams" | "speaking-coach">("vocabulary");
  const [selectedModule, setSelectedModule] = useState<FinnishModule | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<FinnishLesson | null>(null);
  const [showBadge, setShowBadge] = useState(false);
  const [vocabViewMode, setVocabViewMode] = useState<'grid' | 'flashcard' | 'spaced'>('grid');
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [flashcardFlipped, setFlashcardFlipped] = useState(false);

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
  const isWritingExam = selectedModule?.id?.includes("writing") ?? false;
  const isSpeakingExam = selectedModule?.id?.includes("speaking") ?? false;
  const isListeningExam = selectedModule?.id?.includes("listening") ?? false;
  const isMockExam = selectedModule?.pillar === "mock-exams";

  // Extract Finnish dialogue text from theory markdown for listening TTS
  const [isPlayingListening, setIsPlayingListening] = useState(false);
  const listeningCancelRef = useRef(false);

  const extractFinnishDialogue = (theory: string): string[] => {
    const lines: string[] = [];
    for (const line of theory.split("\n")) {
      const dialogueMatch = line.match(/^>\s*\*\*(.+?)\*\*\s*(.+)/);
      if (dialogueMatch) {
        lines.push(`${dialogueMatch[1]} ${dialogueMatch[2]}`);
        continue;
      }
      const quoteMatch = line.match(/^>\s*"(.+)"?\s*$/);
      if (quoteMatch) {
        lines.push(quoteMatch[1].replace(/"$/, ""));
      }
    }
    return lines;
  };

  const playListeningAudio = async () => {
    if (!selectedLesson?.theory) return;

    // Toggle stop if already playing
    if (isPlayingListening) {
      listeningCancelRef.current = true;
      return;
    }

    listeningCancelRef.current = false;
    setIsPlayingListening(true);
    try {
      const dialogueLines = extractFinnishDialogue(selectedLesson.theory);
      if (dialogueLines.length === 0) {
        const cleanText = selectedLesson.theory.replace(/[#*>_\[\]()]/g, "");
        const sentences = cleanText.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 2);
        for (const sentence of sentences) {
          if (listeningCancelRef.current) break;
          await playFinnishTts(sentence.trim());
          if (listeningCancelRef.current) break;
          await new Promise(r => setTimeout(r, 800));
        }
      } else {
        for (const line of dialogueLines) {
          if (listeningCancelRef.current) break;
          await playFinnishTts(line);
          if (listeningCancelRef.current) break;
          await new Promise(r => setTimeout(r, 800));
        }
      }
    } catch {
      // handled
    } finally {
      setIsPlayingListening(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 lg:pt-28 pb-12">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <img src={finnishFlagImg} alt="Finnish flag" className="w-10 h-10 object-contain" />
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
          <div className="w-full max-w-2xl grid grid-cols-4 h-11 mb-6 rounded-lg bg-muted p-1">
            {([
              { value: "vocabulary" as const, label: "📖 Sanasto" },
              { value: "lessons" as const, label: "🎓 Oppitunnit" },
              { value: "mock-exams" as const, label: "📝 Kokeet" },
              { value: "speaking-coach" as const, label: "🎙️ Puhevalmennus" },
            ]).map((tab) => (
              <button
                key={tab.value}
                onClick={() => { setActivePillar(tab.value); setSelectedModule(null); setSelectedLesson(null); }}
                className={`text-xs sm:text-sm font-medium rounded-md transition-all ${
                  activePillar === tab.value
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div>
            {/* Speaking Coach tab content */}
            {activePillar === "speaking-coach" ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                    🎙️ AI Puhevalmennus
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Harjoittele suomen kielen ääntämistä tekoälyn avulla
                  </p>
                </div>
                <AISpeakingCoach
                  language="finnish"
                  onScoreUpdate={(score) => {
                    if (score >= 90) {
                      const quote = FINNISH_QUOTES[Math.floor(Math.random() * FINNISH_QUOTES.length)];
                      toast.success(`⛷️ ${quote}`, { style: { fontSize: "18px", fontWeight: "bold" } });
                    }
                  }}
                />
              </motion.div>
            ) : (
              <>
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
                      {/* Listening Audio Player */}
                      {isListeningExam && selectedLesson.theory && (
                        <Card className="mb-4 border-primary/20 bg-primary/5">
                          <CardContent className="p-4 flex items-center gap-4">
                            <Button
                              onClick={playListeningAudio}
                              size="lg"
                              className="gap-2 font-bold text-base"
                              variant={isPlayingListening ? "destructive" : "default"}
                            >
                              {isPlayingListening ? (
                                <>
                                  <Square className="w-4 h-4" />
                                  Pysäytä
                                </>
                              ) : (
                                <>
                                  <Volume2 className="w-5 h-5" />
                                  🎧 Kuuntele
                                </>
                              )}
                            </Button>
                            <div className="text-sm text-muted-foreground">
                              <p className="font-medium text-foreground">Kuuntele keskustelu ensin</p>
                              <p className="text-xs">Paina kuuntele-nappia ja vastaa sitten kysymyksiin</p>
                            </div>
                          </CardContent>
                        </Card>
                      )}

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

                      {selectedLesson.vocabulary && selectedLesson.vocabulary.length > 0 && (
                        <div className="mb-6">
                          <div className="flex items-center gap-3 mb-4 flex-wrap">
                            <h3 className="text-lg font-bold text-foreground">📖 Sanasto</h3>
                            <div className="ml-auto flex gap-1 bg-muted rounded-lg p-0.5">
                              <button
                                onClick={() => setVocabViewMode('grid')}
                                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${vocabViewMode === 'grid' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                              >
                                📖 Cards
                              </button>
                              <button
                                onClick={() => {
                                  setVocabViewMode('flashcard');
                                  setFlashcardIndex(0);
                                  setFlashcardFlipped(false);
                                }}
                                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${vocabViewMode === 'flashcard' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                              >
                                🃏 Flashcards
                              </button>
                              <button
                                onClick={() => {
                                  setVocabViewMode('spaced');
                                  setFlashcardIndex(0);
                                  setFlashcardFlipped(false);
                                }}
                                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${vocabViewMode === 'spaced' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                              >
                                🔄 Spaced
                              </button>
                            </div>
                          </div>

                          {vocabViewMode === 'grid' ? (
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
                          ) : (
                            <FlashcardView
                              vocabulary={vocabViewMode === 'spaced' ? sortBySR(selectedLesson.vocabulary) : selectedLesson.vocabulary}
                              currentIndex={flashcardIndex}
                              isFlipped={flashcardFlipped}
                              onFlip={() => setFlashcardFlipped(f => !f)}
                              onNext={() => { setFlashcardFlipped(false); setFlashcardIndex(i => Math.min(i + 1, (selectedLesson.vocabulary?.length || 1) - 1)); }}
                              onPrev={() => { setFlashcardFlipped(false); setFlashcardIndex(i => Math.max(i - 1, 0)); }}
                              isMastered={(w) => masteredWords.includes(w)}
                              onMaster={handleMasterWord}
                              srMode={vocabViewMode === 'spaced'}
                              onSRAnswer={(word, correct) => {
                                const result = updateSRData(word, correct);
                                if (correct) {
                                  toast.success(`✅ "${word}" → Box ${result.box} (${SR_BOX_LABELS[result.box]})`, { style: { fontSize: "14px" } });
                                } else {
                                  toast.info(`🔁 "${word}" → Box ${result.box} — yritetään uudelleen!`, { style: { fontSize: "14px" } });
                                }
                              }}
                            />
                          )}
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
                <div key={activePillar} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
              </>
            )}
            </div>
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
