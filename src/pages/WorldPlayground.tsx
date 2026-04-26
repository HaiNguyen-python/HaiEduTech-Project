/**
 * @file WorldPlayground.tsx
 * @description "The World is Your Playground" — a global exploration module covering
 *              geography, culture, languages, and unique landmarks. Includes a virtual
 *              passport (per-lesson digital stamps) and a "Where in the World?" mini-quiz.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  Globe2,
  Camera,
  Languages,
  Sparkles,
  Star,
  CheckCircle2,
  RotateCcw,
  Trophy,
  MapPin,
  Stamp,
  BookmarkPlus,
  Plane,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import confetti from "canvas-confetti";

// Hero photos for each exploration zone (realistic, high quality)
import heroGeography from "@/assets/zone-geography.jpg";
import heroCulture from "@/assets/zone-culture.jpg";
import heroLanguages from "@/assets/zone-languages.jpg";
import heroLandmarks from "@/assets/zone-landmarks.jpg";

// =============================================================================
// Types
// =============================================================================

interface ExplorationLesson {
  id: string;
  country: string;
  countryEn: string;
  flag: string;
  title: string;
  titleEn: string;
  summary: string;
  summaryEn: string;
  funFact: string;
  funFactEn: string;
}

interface ExplorationZone {
  id: "geography" | "culture" | "languages" | "landmarks";
  icon: typeof Compass;
  title: string;
  titleEn: string;
  tagline: string;
  taglineEn: string;
  accent: string; // tailwind gradient stops referencing semantic tokens
  hero: string; // hero photo (imported asset)
  lessons: ExplorationLesson[];
}

interface QuizQuestion {
  id: string;
  emoji: string;
  clue: string;
  clueEn: string;
  options: string[];
  optionsEn: string[];
  answerIndex: number;
}

// =============================================================================
// Curriculum Data (4 Exploration Zones)
// =============================================================================

const zones: ExplorationZone[] = [
  {
    id: "geography",
    icon: Globe2,
    title: "Địa lý & Kỳ quan",
    titleEn: "Geography & Wonders",
    tagline: "Khám phá lục địa, danh thắng và hệ sinh thái diệu kỳ",
    taglineEn: "Continents, landmarks, and breathtaking ecosystems",
    accent: "from-sky-500/20 via-cyan-400/10 to-blue-500/20",
    lessons: [
      {
        id: "geo-aurora-fi",
        country: "Phần Lan",
        countryEn: "Finland",
        flag: "🇫🇮",
        title: "Bắc Cực Quang trên bầu trời Lapland",
        titleEn: "Aurora Borealis over Lapland",
        summary:
          "Tại vùng Lapland, bầu trời đêm bừng sáng với những dải xanh-tím khi gió mặt trời chạm vào từ trường Trái Đất.",
        summaryEn:
          "In Lapland, the night sky glows green and violet when solar wind meets Earth's magnetic field.",
        funFact: "Có thể nhìn thấy aurora khoảng 200 đêm mỗi năm ở Bắc Lapland.",
        funFactEn: "Aurora is visible on about 200 nights per year in northern Lapland.",
      },
      {
        id: "geo-pyramids-eg",
        country: "Ai Cập",
        countryEn: "Egypt",
        flag: "🇪🇬",
        title: "Đại Kim Tự Tháp Giza",
        titleEn: "The Great Pyramid of Giza",
        summary:
          "Kỳ quan duy nhất còn lại của thế giới cổ đại, được xây dựng cách đây hơn 4.500 năm bằng hơn 2 triệu khối đá.",
        summaryEn:
          "The last surviving Wonder of the Ancient World, built over 4,500 years ago from 2+ million stone blocks.",
        funFact: "Mỗi cạnh đáy dài gần 230 mét — sai số chưa tới 5 cm!",
        funFactEn: "Each base side is nearly 230 m long — accurate to within 5 cm!",
      },
      {
        id: "geo-amazon-br",
        country: "Brazil",
        countryEn: "Brazil",
        flag: "🇧🇷",
        title: "Rừng Amazon — Lá phổi xanh",
        titleEn: "The Amazon — Earth's green lungs",
        summary:
          "Rừng nhiệt đới lớn nhất hành tinh, là nhà của hơn 10% các loài sinh vật được biết đến.",
        summaryEn:
          "The planet's largest rainforest, home to more than 10% of all known species on Earth.",
        funFact: "Sông Amazon đổ ra biển khoảng 209.000 m³ nước mỗi giây.",
        funFactEn: "The Amazon River discharges about 209,000 m³ of water per second.",
      },
      {
        id: "geo-himalaya-np",
        country: "Nepal",
        countryEn: "Nepal",
        flag: "🇳🇵",
        title: "Đỉnh Everest — Nóc nhà thế giới",
        titleEn: "Mount Everest — Roof of the World",
        summary:
          "Cao 8.848,86 m, Everest tiếp tục cao thêm khoảng 4 mm mỗi năm do va chạm mảng kiến tạo.",
        summaryEn:
          "At 8,848.86 m, Everest still grows about 4 mm per year as tectonic plates collide.",
        funFact: "Người Sherpa gọi Everest là “Sagarmatha” — Trán của bầu trời.",
        funFactEn: "Sherpas call Everest 'Sagarmatha' — Forehead of the Sky.",
      },
    ],
  },
  {
    id: "culture",
    icon: Sparkles,
    title: "Văn hóa đa dạng",
    titleEn: "Cultural Tapestry",
    tagline: "Lễ hội, trang phục và ẩm thực từ khắp năm châu",
    taglineEn: "Festivals, attire, and cuisine from every continent",
    accent: "from-rose-500/20 via-orange-400/10 to-amber-500/20",
    lessons: [
      {
        id: "cul-holi-in",
        country: "Ấn Độ",
        countryEn: "India",
        flag: "🇮🇳",
        title: "Holi — Lễ hội sắc màu",
        titleEn: "Holi — Festival of Colors",
        summary:
          "Mỗi mùa xuân, mọi người tung bột màu để chào đón tình yêu, sự tha thứ và một khởi đầu mới.",
        summaryEn:
          "Every spring, people throw colored powder to celebrate love, forgiveness, and new beginnings.",
        funFact: "Mỗi màu mang ý nghĩa riêng: đỏ là tình yêu, xanh là Krishna, vàng là sức khỏe.",
        funFactEn: "Each color has meaning: red for love, blue for Krishna, yellow for health.",
      },
      {
        id: "cul-kimono-jp",
        country: "Nhật Bản",
        countryEn: "Japan",
        flag: "🇯🇵",
        title: "Kimono — Trang phục truyền thống",
        titleEn: "Kimono — Traditional attire",
        summary:
          "Một bộ kimono có thể có hơn 12 lớp và được mặc cho lễ trà, cưới hỏi hay năm mới.",
        summaryEn:
          "A kimono may have over 12 layers and is worn for tea ceremonies, weddings, and New Year.",
        funFact: "“Kimono” nghĩa đen là “thứ để mặc” (ki = mặc, mono = vật).",
        funFactEn: "'Kimono' literally means 'thing to wear' (ki = wear, mono = thing).",
      },
      {
        id: "cul-pasta-it",
        country: "Ý",
        countryEn: "Italy",
        flag: "🇮🇹",
        title: "Nghệ thuật mì Ý",
        titleEn: "The art of Italian pasta",
        summary:
          "Có hơn 350 hình dạng mì khác nhau, mỗi loại được thiết kế riêng cho một loại sốt.",
        summaryEn:
          "There are 350+ pasta shapes, each engineered to pair with a specific sauce.",
        funFact: "Người Ý ăn trung bình 23 kg mì mỗi người mỗi năm.",
        funFactEn: "Italians eat about 23 kg of pasta per person each year.",
      },
      {
        id: "cul-dayofdead-mx",
        country: "Mexico",
        countryEn: "Mexico",
        flag: "🇲🇽",
        title: "Día de los Muertos",
        titleEn: "Day of the Dead",
        summary:
          "Lễ tưởng niệm tổ tiên với bàn thờ ofrenda, hoa cúc vạn thọ và những chiếc sọ đường đầy màu sắc.",
        summaryEn:
          "An ancestral remembrance with ofrenda altars, marigolds, and vibrant sugar skulls.",
        funFact: "UNESCO đã công nhận lễ hội này là Di sản văn hóa phi vật thể từ năm 2008.",
        funFactEn: "UNESCO inscribed it as Intangible Cultural Heritage in 2008.",
      },
    ],
  },
  {
    id: "languages",
    icon: Languages,
    title: "Ngôn ngữ thế giới",
    titleEn: "Global Languages",
    tagline: "Lời chào và sự thật thú vị về các hệ chữ viết",
    taglineEn: "Greetings and fun facts about writing systems",
    accent: "from-emerald-500/20 via-teal-400/10 to-green-500/20",
    lessons: [
      {
        id: "lang-latin",
        country: "Hệ chữ Latin",
        countryEn: "Latin script",
        flag: "🔤",
        title: "Hello — Bonjour — Hola",
        titleEn: "Hello — Bonjour — Hola",
        summary:
          "Hơn 2 tỷ người dùng bảng chữ cái Latin — bảng chữ phổ biến nhất hành tinh.",
        summaryEn:
          "Over 2 billion people use the Latin alphabet — the most widely used script on Earth.",
        funFact: "Chữ “W” chỉ xuất hiện vào thế kỷ 7, vốn là hai chữ V ghép lại.",
        funFactEn: "The letter 'W' only appeared in the 7th century — it was originally two Vs.",
      },
      {
        id: "lang-kanji",
        country: "Kanji (Nhật)",
        countryEn: "Kanji (Japan)",
        flag: "🈳",
        title: "こんにちは — Konnichiwa",
        titleEn: "こんにちは — Konnichiwa",
        summary:
          "Tiếng Nhật dùng 3 hệ chữ song song: Kanji (mượn từ Hán), Hiragana và Katakana.",
        summaryEn:
          "Japanese uses 3 scripts in parallel: Kanji (from Chinese), Hiragana, and Katakana.",
        funFact: "Học sinh Nhật học khoảng 2.136 chữ kanji thường dùng (jōyō kanji).",
        funFactEn: "Japanese students learn around 2,136 common-use kanji (jōyō kanji).",
      },
      {
        id: "lang-cyrillic",
        country: "Cyrillic (Nga)",
        countryEn: "Cyrillic (Russia)",
        flag: "🇷🇺",
        title: "Здравствуйте — Zdravstvuyte",
        titleEn: "Здравствуйте — Zdravstvuyte",
        summary:
          "Bảng chữ Cyrillic gồm 33 chữ cái, được tạo bởi hai tu sĩ Cyril và Methodius vào thế kỷ 9.",
        summaryEn:
          "The Cyrillic alphabet has 33 letters, created by monks Cyril & Methodius in the 9th century.",
        funFact: "Hơn 250 triệu người dùng Cyrillic làm chữ viết chính thức.",
        funFactEn: "Over 250 million people use Cyrillic as their official script.",
      },
      {
        id: "lang-arabic",
        country: "Arabic (Ả Rập)",
        countryEn: "Arabic",
        flag: "🇸🇦",
        title: "مرحبا — Marhaban",
        titleEn: "مرحبا — Marhaban",
        summary:
          "Tiếng Ả Rập viết từ phải sang trái với 28 chữ cái, mỗi chữ có 4 hình dạng tùy vị trí.",
        summaryEn:
          "Arabic is written right-to-left with 28 letters, each having 4 forms by position.",
        funFact: "Các chữ số “Ả Rập” (0–9) mà thế giới dùng hôm nay thực ra có gốc từ Ấn Độ.",
        funFactEn: "Today's 'Arabic' numerals (0–9) actually originated in India.",
      },
    ],
  },
  {
    id: "landmarks",
    icon: MapPin,
    title: "Nét đặc trưng",
    titleEn: "Special Landmarks",
    tagline: "Câu chuyện độc đáo của từng quốc gia",
    taglineEn: "Unique stories from each country",
    accent: "from-violet-500/20 via-fuchsia-400/10 to-purple-500/20",
    lessons: [
      {
        id: "lm-sauna-fi",
        country: "Phần Lan",
        countryEn: "Finland",
        flag: "🇫🇮",
        title: "Văn hóa Sauna",
        titleEn: "Sauna culture",
        summary:
          "Phần Lan có khoảng 3 triệu sauna cho 5,5 triệu dân — sauna là nơi thư giãn, hội họp, thậm chí đàm phán.",
        summaryEn:
          "Finland has ~3 million saunas for 5.5 million people — for relaxation, gatherings, even negotiations.",
        funFact: "UNESCO công nhận văn hóa sauna Phần Lan là di sản phi vật thể (2020).",
        funFactEn: "UNESCO recognised Finnish sauna culture as intangible heritage (2020).",
      },
      {
        id: "lm-coffee-vn",
        country: "Việt Nam",
        countryEn: "Vietnam",
        flag: "🇻🇳",
        title: "Văn hóa cà phê Việt",
        titleEn: "Vietnamese coffee culture",
        summary:
          "Từ phin nhỏ giọt đến cà phê trứng Hà Nội và cà phê muối Huế — cà phê Việt là một trải nghiệm chậm rãi.",
        summaryEn:
          "From the slow-drip 'phin' to Hanoi egg coffee and Huế salt coffee — Vietnamese coffee is a slow ritual.",
        funFact: "Việt Nam là nước xuất khẩu cà phê Robusta lớn nhất thế giới.",
        funFactEn: "Vietnam is the world's largest exporter of Robusta coffee.",
      },
      {
        id: "lm-tea-uk",
        country: "Anh Quốc",
        countryEn: "United Kingdom",
        flag: "🇬🇧",
        title: "Afternoon Tea",
        titleEn: "Afternoon Tea",
        summary:
          "Bắt đầu từ thế kỷ 19 bởi Nữ công tước Anna, trà chiều gồm trà đen, scone và bánh ngọt nhỏ.",
        summaryEn:
          "Started in the 19th century by Duchess Anna — black tea served with scones and dainty cakes.",
        funFact: "Người Anh uống khoảng 100 triệu tách trà mỗi ngày.",
        funFactEn: "Brits drink about 100 million cups of tea every single day.",
      },
      {
        id: "lm-tango-ar",
        country: "Argentina",
        countryEn: "Argentina",
        flag: "🇦🇷",
        title: "Tango — Vũ điệu Buenos Aires",
        titleEn: "Tango — The dance of Buenos Aires",
        summary:
          "Sinh ra ở các khu cảng Buenos Aires cuối thế kỷ 19, tango là cuộc trò chuyện không lời giữa hai người.",
        summaryEn:
          "Born in the Buenos Aires docks in the late 1800s — a wordless conversation between two dancers.",
        funFact: "UNESCO công nhận tango là Di sản văn hóa phi vật thể năm 2009.",
        funFactEn: "UNESCO inscribed tango as Intangible Cultural Heritage in 2009.",
      },
    ],
  },
];

// =============================================================================
// "Where in the World?" Quiz Data
// =============================================================================

const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    emoji: "🗼",
    clue: "Tháp sắt cao 330 m, biểu tượng của thủ đô tình yêu.",
    clueEn: "A 330 m iron tower, icon of the city of love.",
    options: ["Paris, Pháp", "London, Anh", "Rome, Ý", "Berlin, Đức"],
    optionsEn: ["Paris, France", "London, UK", "Rome, Italy", "Berlin, Germany"],
    answerIndex: 0,
  },
  {
    id: "q2",
    emoji: "🏯",
    clue: "Lâu đài trắng tinh được mệnh danh 'Hạc trắng' tại quốc gia mặt trời mọc.",
    clueEn: "A pure-white castle nicknamed 'White Heron' in the land of the rising sun.",
    options: ["Himeji, Nhật", "Seoul, Hàn", "Bắc Kinh, TQ", "Bangkok, Thái"],
    optionsEn: ["Himeji, Japan", "Seoul, Korea", "Beijing, China", "Bangkok, Thailand"],
    answerIndex: 0,
  },
  {
    id: "q3",
    emoji: "🦘",
    clue: "Quốc gia kiêm lục địa, quê hương của kangaroo và koala.",
    clueEn: "A country and a continent — home to kangaroos and koalas.",
    options: ["New Zealand", "Úc", "Nam Phi", "Argentina"],
    optionsEn: ["New Zealand", "Australia", "South Africa", "Argentina"],
    answerIndex: 1,
  },
  {
    id: "q4",
    emoji: "🌋",
    clue: "Hòn đảo lửa và băng ở Bắc Đại Tây Dương với hơn 100 núi lửa.",
    clueEn: "An island of fire and ice in the North Atlantic with 100+ volcanoes.",
    options: ["Greenland", "Na Uy", "Iceland", "Ireland"],
    optionsEn: ["Greenland", "Norway", "Iceland", "Ireland"],
    answerIndex: 2,
  },
  {
    id: "q5",
    emoji: "🛕",
    clue: "Đền Angkor Wat khổng lồ nằm ở quốc gia Đông Nam Á nào?",
    clueEn: "The mighty Angkor Wat temple sits in which Southeast Asian country?",
    options: ["Thái Lan", "Lào", "Campuchia", "Myanmar"],
    optionsEn: ["Thailand", "Laos", "Cambodia", "Myanmar"],
    answerIndex: 2,
  },
];

// =============================================================================
// Local-storage helpers (Virtual Passport)
// =============================================================================

const PASSPORT_KEY = "world-playground:passport";

const loadPassport = (): string[] => {
  try {
    const raw = localStorage.getItem(PASSPORT_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
};

const savePassport = (stamps: string[]) => {
  try {
    localStorage.setItem(PASSPORT_KEY, JSON.stringify(stamps));
  } catch {
    // ignore quota/permission errors — passport is a delight, not critical state
  }
};

// Confetti burst when a new stamp is earned
const fireStampConfetti = () => {
  const defaults = { spread: 70, ticks: 90, gravity: 0.6, decay: 0.93, startVelocity: 28, zIndex: 9999 };
  confetti({ ...defaults, particleCount: 40, origin: { x: 0.5, y: 0.6 } });
  setTimeout(() => {
    confetti({ ...defaults, particleCount: 25, origin: { x: 0.3, y: 0.5 } });
    confetti({ ...defaults, particleCount: 25, origin: { x: 0.7, y: 0.5 } });
  }, 200);
};

// =============================================================================
// Page
// =============================================================================

const WorldPlayground = () => {
  const { t, lang } = useLanguage();
  const [passport, setPassport] = useState<string[]>([]);
  const [activeZone, setActiveZone] = useState<ExplorationZone["id"]>("geography");

  // Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [quizDone, setQuizDone] = useState(false);

  useEffect(() => {
    setPassport(loadPassport());
  }, []);

  const stampLesson = (lessonId: string, label: string) => {
    if (passport.includes(lessonId)) {
      toast.info(t("Bạn đã có dấu mộc cho bài này rồi!", "You already collected this stamp!"));
      return;
    }
    const next = [...passport, lessonId];
    setPassport(next);
    savePassport(next);
    fireStampConfetti();
    toast.success(
      t(`✈️ Mộc mới: ${label}`, `✈️ New stamp: ${label}`),
      { description: t("Đã thêm vào hộ chiếu của bạn.", "Added to your passport.") }
    );
  };

  // Save a "Global Fact" to the Smart Notebook (localStorage bridge)
  const saveToNotebook = (lesson: ExplorationLesson) => {
    try {
      const KEY = "smart-notebook:global-facts";
      const raw = localStorage.getItem(KEY);
      const list: Array<{ id: string; title: string; fact: string; addedAt: number }> = raw ? JSON.parse(raw) : [];
      if (list.some((item) => item.id === lesson.id)) {
        toast.info(t("Đã có trong sổ tay rồi!", "Already in your notebook!"));
        return;
      }
      list.push({
        id: lesson.id,
        title: lang === "vi" ? lesson.title : lesson.titleEn,
        fact: lang === "vi" ? lesson.funFact : lesson.funFactEn,
        addedAt: Date.now(),
      });
      localStorage.setItem(KEY, JSON.stringify(list));
      toast.success(t("✍️ Đã lưu vào Sổ tay!", "✍️ Saved to your Notebook!"));
    } catch {
      toast.error(t("Không thể lưu sổ tay.", "Could not save to notebook."));
    }
  };

  const totalLessons = useMemo(() => zones.reduce((acc, z) => acc + z.lessons.length, 0), []);
  const progressPct = Math.round((passport.length / totalLessons) * 100);

  // Quiz handlers
  const currentQ = quizQuestions[quizIndex];
  const handlePick = (idx: number) => {
    if (picked !== null) return;
    setPicked(idx);
    if (idx === currentQ.answerIndex) {
      setQuizScore((s) => s + 1);
      fireStampConfetti();
    }
    setTimeout(() => {
      if (quizIndex + 1 >= quizQuestions.length) {
        setQuizDone(true);
      } else {
        setQuizIndex((i) => i + 1);
        setPicked(null);
      }
    }, 1100);
  };

  const resetQuiz = () => {
    setQuizIndex(0);
    setQuizScore(0);
    setPicked(null);
    setQuizDone(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={t(
          "Thế giới là sân chơi của bạn | HaiEduTech",
          "The World is Your Playground | HaiEduTech"
        )}
        description={t(
          "Khám phá địa lý, văn hóa, ngôn ngữ và những nét đặc trưng độc đáo từ khắp nơi trên thế giới với hộ chiếu điện tử và quiz đoán địa danh.",
          "Explore geography, culture, languages, and unique landmarks from around the world — with a virtual passport and a 'Where in the World?' quiz."
        )}
      />
      <Navbar />

      {/* ============================== Hero ============================== */}
      <section className="relative py-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-transparent to-emerald-500/10" />
        <div className="absolute -top-10 -right-10 text-[180px] opacity-10 select-none pointer-events-none">🌍</div>
        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
              <Compass className="w-5 h-5" />
              <span className="font-medium">
                {t("Nhà thám hiểm toàn cầu", "Global Explorer")}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              {t("Thế giới là sân chơi của bạn", "The World is Your Playground")}
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              {t(
                "Khám phá lục địa, văn hóa, ngôn ngữ và những nét đặc trưng độc đáo. Mỗi bài học đưa bạn đi một quốc gia mới — và đóng dấu vào hộ chiếu điện tử của bạn.",
                "Explore continents, cultures, languages, and unique traditions. Every lesson takes you to a new country — and stamps your virtual passport."
              )}
            </p>

            {/* Passport progress */}
            <div className="glass-card p-4 max-w-md mx-auto">
              <div className="flex items-center justify-between mb-2">
                <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Stamp className="w-4 h-4 text-primary" />
                  {t("Hộ chiếu điện tử", "Virtual Passport")}
                </span>
                <span className="text-sm font-mono text-muted-foreground">
                  {passport.length} / {totalLessons}
                </span>
              </div>
              <div className="h-2 rounded-full bg-secondary overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-sky-500 to-emerald-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPct}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================== Zones ============================== */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <Tabs value={activeZone} onValueChange={(v) => setActiveZone(v as ExplorationZone["id"])}>
            <TabsList className="w-full flex flex-wrap h-auto justify-center gap-2 bg-transparent mb-8">
              {zones.map((z) => {
                const Icon = z.icon;
                return (
                  <TabsTrigger
                    key={z.id}
                    value={z.id}
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2 px-4 py-2"
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{t(z.title, z.titleEn)}</span>
                    <span className="sm:hidden">{t(z.title.split(" ")[0], z.titleEn.split(" ")[0])}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            <AnimatePresence mode="wait">
              {zones.map((zone) =>
                zone.id === activeZone ? (
                  <TabsContent key={zone.id} value={zone.id} forceMount>
                    <motion.div
                      key={zone.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className={`rounded-2xl bg-gradient-to-br ${zone.accent} p-6 md:p-8 mb-8 text-center`}>
                        <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
                          {t(zone.title, zone.titleEn)}
                        </h2>
                        <p className="text-muted-foreground">{t(zone.tagline, zone.taglineEn)}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {zone.lessons.map((lesson, idx) => {
                          const stamped = passport.includes(lesson.id);
                          return (
                            <motion.article
                              key={lesson.id}
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: idx * 0.06 }}
                              className="glass-card p-5 flex flex-col group hover:shadow-lg transition-shadow"
                            >
                              <div className="flex items-start justify-between mb-3">
                                <span className="text-4xl" aria-hidden>{lesson.flag}</span>
                                {stamped && (
                                  <Badge className="bg-emerald-500/15 text-emerald-600 border-emerald-500/30 gap-1">
                                    <CheckCircle2 className="w-3 h-3" />
                                    {t("Đã đóng dấu", "Stamped")}
                                  </Badge>
                                )}
                              </div>

                              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                                {t(lesson.country, lesson.countryEn)}
                              </p>
                              <h3 className="font-display font-bold text-foreground mb-2 leading-tight">
                                {t(lesson.title, lesson.titleEn)}
                              </h3>
                              <p className="text-sm text-muted-foreground leading-relaxed mb-3 flex-1">
                                {t(lesson.summary, lesson.summaryEn)}
                              </p>

                              <div className="bg-secondary/40 rounded-lg p-3 mb-4">
                                <p className="text-xs flex items-start gap-2">
                                  <Sparkles className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                                  <span className="text-foreground/90">
                                    <strong>{t("Fun fact: ", "Fun fact: ")}</strong>
                                    {t(lesson.funFact, lesson.funFactEn)}
                                  </span>
                                </p>
                              </div>

                              <div className="flex items-center gap-2 mt-auto">
                                <Button
                                  size="sm"
                                  variant={stamped ? "secondary" : "default"}
                                  className="flex-1 gap-1"
                                  onClick={() => stampLesson(lesson.id, lang === "vi" ? lesson.country : lesson.countryEn)}
                                >
                                  <Stamp className="w-3.5 h-3.5" />
                                  {stamped ? t("Đã ghé thăm", "Visited") : t("Đóng dấu", "Stamp it")}
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="px-2"
                                  title={t("Lưu vào sổ tay", "Save to notebook")}
                                  onClick={() => saveToNotebook(lesson)}
                                >
                                  <BookmarkPlus className="w-4 h-4" />
                                </Button>
                              </div>
                            </motion.article>
                          );
                        })}
                      </div>
                    </motion.div>
                  </TabsContent>
                ) : null
              )}
            </AnimatePresence>
          </Tabs>
        </div>
      </section>

      {/* ============================== Quiz ============================== */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 bg-accent/10 text-primary px-4 py-2 rounded-full mb-3">
                <Camera className="w-5 h-5" />
                <span className="font-medium">
                  {t("Thử thách", "Mini Game")}
                </span>
              </div>
              <h2 className="text-3xl font-display font-bold text-foreground mb-2">
                {t("Where in the World?", "Where in the World?")}
              </h2>
              <p className="text-muted-foreground">
                {t("Đoán địa danh dựa vào gợi ý!", "Guess the place from the clue!")}
              </p>
            </div>

            <div className="glass-card p-6 md:p-8">
              {!quizDone ? (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentQ.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                      <span>
                        {t("Câu", "Question")} {quizIndex + 1} / {quizQuestions.length}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        {quizScore}
                      </span>
                    </div>

                    <div className="text-center mb-6">
                      <div className="text-7xl mb-4" aria-hidden>{currentQ.emoji}</div>
                      <p className="text-lg text-foreground">{t(currentQ.clue, currentQ.clueEn)}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {(lang === "vi" ? currentQ.options : currentQ.optionsEn).map((opt, idx) => {
                        const isCorrect = idx === currentQ.answerIndex;
                        const isPicked = picked === idx;
                        const showState = picked !== null;
                        return (
                          <Button
                            key={idx}
                            variant="outline"
                            disabled={picked !== null}
                            onClick={() => handlePick(idx)}
                            className={`h-auto py-3 text-base justify-start ${
                              showState && isCorrect
                                ? "border-emerald-500 bg-emerald-500/10 text-emerald-700"
                                : showState && isPicked && !isCorrect
                                ? "border-rose-500 bg-rose-500/10 text-rose-700"
                                : ""
                            }`}
                          >
                            {opt}
                          </Button>
                        );
                      })}
                    </div>
                  </motion.div>
                </AnimatePresence>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-4"
                >
                  <Trophy className="w-14 h-14 text-yellow-500 mx-auto mb-3" />
                  <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                    {t("Hoàn thành!", "Completed!")}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {t("Bạn đã trả lời đúng", "You scored")}{" "}
                    <strong className="text-foreground">
                      {quizScore} / {quizQuestions.length}
                    </strong>
                  </p>
                  <Button onClick={resetQuiz} className="gap-2">
                    <RotateCcw className="w-4 h-4" />
                    {t("Chơi lại", "Play again")}
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================== Closing ============================== */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <Plane className="w-8 h-8 text-primary mx-auto mb-4" />
            <p className="text-lg text-muted-foreground italic leading-relaxed">
              {t(
                '"Thế giới là một cuốn sách, và những ai không du hành chỉ đọc một trang." — Augustinô',
                '"The world is a book, and those who do not travel read only one page." — St. Augustine'
              )}
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WorldPlayground;
