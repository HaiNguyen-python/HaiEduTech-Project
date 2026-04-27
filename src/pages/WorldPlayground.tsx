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
  Lightbulb,
  UtensilsCrossed,
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
import heroCuisine from "@/assets/zone-cuisine.jpg";

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
  /** Optional deeper "Did you know?" insight (1–2 sentences). */
  didYouKnow?: string;
  didYouKnowEn?: string;
  image: string; // realistic high-quality photo (Unsplash CDN, optimized)
}

interface ExplorationZone {
  id: "geography" | "culture" | "languages" | "landmarks" | "cuisine";
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
  // ==================== ZONE 1: GEOGRAPHY & WONDERS ====================
  {
    id: "geography",
    icon: Globe2,
    title: "Địa lý & Kỳ quan",
    titleEn: "Geography & Wonders",
    tagline: "Khám phá lục địa, danh thắng và hệ sinh thái diệu kỳ",
    taglineEn: "Continents, landmarks, and breathtaking ecosystems",
    accent: "from-sky-500/20 via-cyan-400/10 to-blue-500/20",
    hero: heroGeography,
    lessons: [
      {
        id: "geo-aurora-fi", country: "Phần Lan", countryEn: "Finland", flag: "🇫🇮",
        title: "Bắc Cực Quang trên bầu trời Lapland",
        titleEn: "Aurora Borealis over Lapland",
        summary: "Tại vùng Lapland, bầu trời đêm bừng sáng với những dải xanh-tím khi gió mặt trời chạm vào từ trường Trái Đất.",
        summaryEn: "In Lapland, the night sky glows green and violet when solar wind meets Earth's magnetic field.",
        funFact: "Có thể nhìn thấy aurora khoảng 200 đêm mỗi năm ở Bắc Lapland.",
        funFactEn: "Aurora is visible on about 200 nights per year in northern Lapland.",
        image: "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?auto=format&fit=crop&w=800&q=75",
      },
      {
        id: "geo-pyramids-eg", country: "Ai Cập", countryEn: "Egypt", flag: "🇪🇬",
        title: "Đại Kim Tự Tháp Giza",
        titleEn: "The Great Pyramid of Giza",
        summary: "Kỳ quan duy nhất còn lại của thế giới cổ đại, được xây dựng cách đây hơn 4.500 năm bằng hơn 2 triệu khối đá.",
        summaryEn: "The last surviving Wonder of the Ancient World, built over 4,500 years ago from 2+ million stone blocks.",
        funFact: "Mỗi cạnh đáy dài gần 230 mét — sai số chưa tới 5 cm!",
        funFactEn: "Each base side is nearly 230 m long — accurate to within 5 cm!",
        image: "https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=800&q=75",
      },
      {
        id: "geo-amazon-br", country: "Brazil", countryEn: "Brazil", flag: "🇧🇷",
        title: "Rừng Amazon — Lá phổi xanh",
        titleEn: "The Amazon — Earth's green lungs",
        summary: "Rừng nhiệt đới lớn nhất hành tinh, là nhà của hơn 10% các loài sinh vật được biết đến.",
        summaryEn: "The planet's largest rainforest, home to more than 10% of all known species on Earth.",
        funFact: "Sông Amazon đổ ra biển khoảng 209.000 m³ nước mỗi giây.",
        funFactEn: "The Amazon River discharges about 209,000 m³ of water per second.",
        image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=800&q=75",
      },
      {
        id: "geo-himalaya-np", country: "Nepal", countryEn: "Nepal", flag: "🇳🇵",
        title: "Đỉnh Everest — Nóc nhà thế giới",
        titleEn: "Mount Everest — Roof of the World",
        summary: "Cao 8.848,86 m, Everest tiếp tục cao thêm khoảng 4 mm mỗi năm do va chạm mảng kiến tạo.",
        summaryEn: "At 8,848.86 m, Everest still grows about 4 mm per year as tectonic plates collide.",
        funFact: "Người Sherpa gọi Everest là “Sagarmatha” — Trán của bầu trời.",
        funFactEn: "Sherpas call Everest 'Sagarmatha' — Forehead of the Sky.",
        image: "https://images.unsplash.com/photo-1486911278844-a81c5267e227?auto=format&fit=crop&w=800&q=75",
      },
      {
        id: "geo-grandcanyon-us", country: "Hoa Kỳ", countryEn: "USA", flag: "🇺🇸",
        title: "Grand Canyon — Vết chạm khắc của thời gian",
        titleEn: "Grand Canyon — Time's masterpiece",
        summary: "Con sông Colorado đã bào mòn lớp đá hơn 6 triệu năm để tạo nên hẻm núi sâu 1,8 km, dài 446 km.",
        summaryEn: "The Colorado River carved this 1.8 km deep, 446 km long canyon over 6 million years.",
        funFact: "Đáy hẻm núi có lớp đá cổ tới 1,8 tỷ năm tuổi.",
        funFactEn: "Rocks at the bottom are up to 1.8 billion years old.",
        image: "https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?auto=format&fit=crop&w=800&q=75",
      },
      {
        id: "geo-greatbarrier-au", country: "Úc", countryEn: "Australia", flag: "🇦🇺",
        title: "Rạn san hô Great Barrier",
        titleEn: "The Great Barrier Reef",
        summary: "Cấu trúc sống lớn nhất Trái Đất — có thể nhìn thấy từ vũ trụ — gồm 2.900 rạn riêng lẻ trải dài 2.300 km.",
        summaryEn: "Earth's largest living structure — visible from space — made of 2,900 reefs spanning 2,300 km.",
        funFact: "Là nhà của hơn 1.500 loài cá và 600 loại san hô.",
        funFactEn: "Home to 1,500+ fish species and 600+ types of coral.",
        image: "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?auto=format&fit=crop&w=800&q=75",
      },
      {
        id: "geo-sahara-ma", country: "Bắc Phi", countryEn: "North Africa", flag: "🇲🇦",
        title: "Sa mạc Sahara",
        titleEn: "The Sahara Desert",
        summary: "Sa mạc nóng lớn nhất thế giới, rộng gần bằng cả châu Âu, trải dài qua 11 quốc gia.",
        summaryEn: "The world's largest hot desert — nearly the size of Europe — spanning 11 countries.",
        funFact: "Đôi khi tuyết vẫn rơi ở Sahara — gần đây nhất là năm 2022!",
        funFactEn: "Snow occasionally falls in the Sahara — most recently in 2022!",
        image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=800&q=75",
      },
      {
        id: "geo-fjords-no", country: "Na Uy", countryEn: "Norway", flag: "🇳🇴",
        title: "Vịnh hẹp (Fjord) Na Uy",
        titleEn: "Norwegian Fjords",
        summary: "Vách đá dựng đứng cao tới 1.000 m bao quanh nước biển sâu — kiệt tác do sông băng tạo nên.",
        summaryEn: "Sheer 1,000 m cliffs around deep sea water — sculpted by ancient glaciers.",
        funFact: "Sognefjord dài 205 km, là vịnh hẹp dài thứ hai thế giới.",
        funFactEn: "Sognefjord stretches 205 km, the world's 2nd longest fjord.",
        image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=75",
      },
      {
        id: "geo-victoriafalls-zm", country: "Zambia & Zimbabwe", countryEn: "Zambia & Zimbabwe", flag: "🇿🇲",
        title: "Thác Victoria — Khói rền vang",
        titleEn: "Victoria Falls — The Smoke that Thunders",
        summary: "Bức tường nước rộng 1.708 m, cao 108 m — một trong bảy kỳ quan thiên nhiên thế giới.",
        summaryEn: "A 1,708 m wide, 108 m high wall of water — one of the Seven Natural Wonders.",
        funFact: "Tên bản địa Mosi-oa-Tunya nghĩa là “Khói rền vang”.",
        funFactEn: "Indigenous name 'Mosi-oa-Tunya' means 'The Smoke that Thunders'.",
        image: "https://images.unsplash.com/photo-1564507004663-b6dfb3c824d5?auto=format&fit=crop&w=800&q=75",
      },
      {
        id: "geo-galapagos-ec", country: "Ecuador", countryEn: "Ecuador", flag: "🇪🇨",
        title: "Quần đảo Galápagos",
        titleEn: "Galápagos Islands",
        summary: "Phòng thí nghiệm sống của Darwin — nơi các loài tiến hóa độc nhất trên 19 đảo núi lửa giữa Thái Bình Dương.",
        summaryEn: "Darwin's living laboratory — unique evolution across 19 volcanic islands in the Pacific.",
        funFact: "Rùa khổng lồ Galápagos có thể sống tới hơn 150 năm.",
        funFactEn: "Galápagos giant tortoises can live for 150+ years.",
        image: "https://images.unsplash.com/photo-1589182337358-2cb63099350c?auto=format&fit=crop&w=800&q=75",
      },
      {
        id: "geo-reef-au", country: "Úc", countryEn: "Australia", flag: "🇦🇺",
        title: "Rạn san hô Great Barrier",
        titleEn: "The Great Barrier Reef",
        summary: "Hệ rạn san hô lớn nhất thế giới dài 2.300 km, có thể nhìn thấy từ vũ trụ và là nơi sinh sống của 1.500 loài cá.",
        summaryEn: "The world's largest reef stretches 2,300 km, is visible from space, and hosts 1,500 fish species.",
        funFact: "Great Barrier Reef gồm hơn 2.900 rạn riêng lẻ và 900 hòn đảo.",
        funFactEn: "It is made up of 2,900+ individual reefs and 900 islands.",
        didYouKnow: "Toàn bộ rạn được hình thành bởi sinh vật sống nhỏ xíu gọi là polyp san hô — nó là cấu trúc sinh học lớn nhất hành tinh.",
        didYouKnowEn: "The entire reef is built by tiny living organisms called coral polyps — making it the largest living structure on Earth.",
        image: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=800&q=75",
      },
      {
        id: "geo-matterhorn-ch", country: "Thụy Sĩ", countryEn: "Switzerland", flag: "🇨🇭",
        title: "Đỉnh Matterhorn — Kim tự tháp đá",
        titleEn: "The Matterhorn — Stone pyramid",
        summary: "Đỉnh núi 4.478 m hình kim tự tháp gần như hoàn hảo, biểu tượng của dãy Alps Thụy Sĩ và nhãn chocolate Toblerone.",
        summaryEn: "A nearly perfect pyramid peak at 4,478 m — symbol of the Swiss Alps and the Toblerone logo.",
        funFact: "Matterhorn nằm chính xác trên biên giới Thụy Sĩ — Ý.",
        funFactEn: "The Matterhorn sits exactly on the Swiss–Italian border.",
        didYouKnow: "Matterhorn được chinh phục lần đầu năm 1865 — chuyến leo lịch sử kết thúc bằng tai nạn khiến 4 người thiệt mạng khi xuống núi.",
        didYouKnowEn: "First climbed in 1865 — the historic ascent ended in tragedy when 4 climbers died on the descent.",
        image: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=800&q=75",
      },
      {
        id: "geo-sahara-ma", country: "Bắc Phi", countryEn: "North Africa", flag: "🏜️",
        title: "Sa mạc Sahara",
        titleEn: "The Sahara Desert",
        summary: "Sa mạc nóng lớn nhất thế giới, rộng 9 triệu km² — bao trùm 11 quốc gia với những cồn cát cao tới 180 m.",
        summaryEn: "The world's largest hot desert at 9 million km² — covering 11 countries with dunes up to 180 m tall.",
        funFact: "Cách đây 10.000 năm, Sahara từng là vùng đất xanh tươi với hồ và đồng cỏ.",
        funFactEn: "10,000 years ago, the Sahara was green with lakes and grasslands.",
        didYouKnow: "Bão cát Sahara mang khoáng chất bay xuyên Đại Tây Dương, bón phân cho rừng Amazon ở phía bên kia trái đất.",
        didYouKnowEn: "Sahara dust storms travel across the Atlantic and fertilize the Amazon rainforest on the other side of the world.",
        image: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=800&q=75",
      },
      {
        id: "geo-grandcanyon-us", country: "Hoa Kỳ", countryEn: "United States", flag: "🇺🇸",
        title: "Grand Canyon — Hẻm núi vĩ đại",
        titleEn: "Grand Canyon — The Great Gorge",
        summary: "Hẻm núi sâu 1,8 km được sông Colorado bào mòn suốt 6 triệu năm, để lộ lịch sử địa chất 2 tỷ năm.",
        summaryEn: "A 1.8 km deep gorge carved by the Colorado River over 6 million years — exposing 2 billion years of geology.",
        funFact: "Grand Canyon dài 446 km — bằng quãng đường từ Hà Nội tới Đà Nẵng.",
        funFactEn: "The canyon is 446 km long — the distance from Hanoi to Da Nang.",
        didYouKnow: "Mỗi lớp đá là một 'trang sách' của Trái Đất; tầng đáy có niên đại bằng gần một nửa tuổi của hành tinh.",
        didYouKnowEn: "Each rock layer is a 'page' of Earth's history; the bottom layer is nearly half as old as the planet itself.",
        image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=75",
      },
      {
        id: "geo-niagara-ca", country: "Canada & Hoa Kỳ", countryEn: "Canada & USA", flag: "🇨🇦",
        title: "Thác Niagara hùng vĩ",
        titleEn: "Mighty Niagara Falls",
        summary: "Ba thác kết hợp với lưu lượng 2.400 m³/giây — một trong những thác có dòng chảy mạnh nhất Bắc Mỹ.",
        summaryEn: "Three combined falls with a flow of 2,400 m³/sec — among North America's most powerful cascades.",
        funFact: "Vào ban đêm, thác được chiếu sáng bằng nhiều màu rực rỡ.",
        funFactEn: "At night, the falls are lit up in vibrant colors.",
        didYouKnow: "Niagara đang lùi về thượng nguồn khoảng 30 cm mỗi năm do xói mòn — sau ~50.000 năm sẽ biến mất hoàn toàn.",
        didYouKnowEn: "Niagara recedes upstream about 30 cm per year due to erosion — it will disappear entirely in ~50,000 years.",
        image: "https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?auto=format&fit=crop&w=800&q=75",
      },
    ],
  },

  // ==================== ZONE 2: CULTURAL TAPESTRY ====================
  {
    id: "culture",
    icon: Sparkles,
    title: "Văn hóa đa dạng",
    titleEn: "Cultural Tapestry",
    tagline: "Lễ hội, trang phục và ẩm thực từ khắp năm châu",
    taglineEn: "Festivals, attire, and cuisine from every continent",
    accent: "from-rose-500/20 via-orange-400/10 to-amber-500/20",
    hero: heroCulture,
    lessons: [
      {
        id: "cul-holi-in", country: "Ấn Độ", countryEn: "India", flag: "🇮🇳",
        title: "Holi — Lễ hội sắc màu",
        titleEn: "Holi — Festival of Colors",
        summary: "Mỗi mùa xuân, mọi người tung bột màu để chào đón tình yêu, sự tha thứ và một khởi đầu mới.",
        summaryEn: "Every spring, people throw colored powder to celebrate love, forgiveness, and new beginnings.",
        funFact: "Mỗi màu mang ý nghĩa riêng: đỏ là tình yêu, xanh là Krishna, vàng là sức khỏe.",
        funFactEn: "Each color has meaning: red for love, blue for Krishna, yellow for health.",
        image: "https://images.unsplash.com/photo-1583687355032-89b902b7335f?auto=format&fit=crop&w=800&q=75",
      },
      {
        id: "cul-kimono-jp", country: "Nhật Bản", countryEn: "Japan", flag: "🇯🇵",
        title: "Kimono — Trang phục truyền thống",
        titleEn: "Kimono — Traditional attire",
        summary: "Một bộ kimono có thể có hơn 12 lớp và được mặc cho lễ trà, cưới hỏi hay năm mới.",
        summaryEn: "A kimono may have over 12 layers and is worn for tea ceremonies, weddings, and New Year.",
        funFact: "“Kimono” nghĩa đen là “thứ để mặc” (ki = mặc, mono = vật).",
        funFactEn: "'Kimono' literally means 'thing to wear' (ki = wear, mono = thing).",
        image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=800&q=75",
      },
      {
        id: "cul-pasta-it", country: "Ý", countryEn: "Italy", flag: "🇮🇹",
        title: "Nghệ thuật mì Ý",
        titleEn: "The art of Italian pasta",
        summary: "Có hơn 350 hình dạng mì khác nhau, mỗi loại được thiết kế riêng cho một loại sốt.",
        summaryEn: "There are 350+ pasta shapes, each engineered to pair with a specific sauce.",
        funFact: "Người Ý ăn trung bình 23 kg mì mỗi người mỗi năm.",
        funFactEn: "Italians eat about 23 kg of pasta per person each year.",
        image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=75",
      },
      {
        id: "cul-dayofdead-mx", country: "Mexico", countryEn: "Mexico", flag: "🇲🇽",
        title: "Día de los Muertos",
        titleEn: "Day of the Dead",
        summary: "Lễ tưởng niệm tổ tiên với bàn thờ ofrenda, hoa cúc vạn thọ và những chiếc sọ đường đầy màu sắc.",
        summaryEn: "An ancestral remembrance with ofrenda altars, marigolds, and vibrant sugar skulls.",
        funFact: "UNESCO đã công nhận lễ hội này là Di sản văn hóa phi vật thể từ năm 2008.",
        funFactEn: "UNESCO inscribed it as Intangible Cultural Heritage in 2008.",
        image: "https://images.unsplash.com/photo-1605196560547-b2f7281b7355?auto=format&fit=crop&w=800&q=75",
      },
      {
        id: "cul-octoberfest-de", country: "Đức", countryEn: "Germany", flag: "🇩🇪",
        title: "Oktoberfest — Đại lễ hội bia Munich",
        titleEn: "Oktoberfest — Munich's Beer Festival",
        summary: "Lễ hội dân gian lớn nhất thế giới với hơn 6 triệu khách, lều bia khổng lồ và nhạc Bavarian truyền thống.",
        summaryEn: "World's largest folk festival — 6+ million visitors, giant beer tents, traditional Bavarian music.",
        funFact: "Oktoberfest thực ra bắt đầu từ giữa tháng 9 — “Oktober” là khi nó kết thúc!",
        funFactEn: "Oktoberfest actually starts in mid-September — 'Oktober' is when it ends!",
        image: "https://images.unsplash.com/photo-1505075106905-fb052892c116?auto=format&fit=crop&w=800&q=75",
      },
      {
        id: "cul-hanbok-kr", country: "Hàn Quốc", countryEn: "South Korea", flag: "🇰🇷",
        title: "Hanbok — Vẻ đẹp đường cong",
        titleEn: "Hanbok — Elegant curved beauty",
        summary: "Trang phục truyền thống Hàn Quốc với jeogori (áo) và chima (váy), nổi bật bởi đường cong mềm mại.",
        summaryEn: "Korea's traditional attire — jeogori (top) and chima (skirt) — defined by soft, flowing curves.",
        funFact: "Màu sắc hanbok thể hiện địa vị xã hội và mùa trong năm.",
        funFactEn: "Hanbok colors signal social status and the season.",
        image: "https://images.unsplash.com/photo-1611348586804-61bf6c080437?auto=format&fit=crop&w=800&q=75",
      },
      {
        id: "cul-tagine-ma", country: "Ma-rốc", countryEn: "Morocco", flag: "🇲🇦",
        title: "Tagine — Bữa tiệc trên nồi đất",
        titleEn: "Tagine — A feast in clay",
        summary: "Món hầm Bắc Phi nấu chậm trong nồi đất nung hình nón, kết hợp thịt, trái cây khô và gia vị thơm.",
        summaryEn: "A North African slow-cooked stew in a conical clay pot — meat, dried fruits, and warm spices.",
        funFact: "Phần nắp nón giúp hơi nước ngưng tụ và rơi trở lại, giữ thức ăn ẩm mọng.",
        funFactEn: "The conical lid recirculates steam, keeping food incredibly moist.",
        image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=800&q=75",
      },
      {
        id: "cul-songkran-th", country: "Thái Lan", countryEn: "Thailand", flag: "🇹🇭",
        title: "Songkran — Tết té nước",
        titleEn: "Songkran — Water Festival",
        summary: "Năm mới Thái Lan diễn ra giữa tháng 4 với những trận chiến nước khổng lồ tượng trưng cho gột rửa và tái sinh.",
        summaryEn: "Thai New Year in mid-April — giant water fights symbolize cleansing and renewal.",
        funFact: "Songkran đã được UNESCO công nhận là di sản văn hóa phi vật thể (2023).",
        funFactEn: "UNESCO inscribed Songkran as intangible heritage in 2023.",
        image: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=800&q=75",
      },
      {
        id: "cul-flamenco-es", country: "Tây Ban Nha", countryEn: "Spain", flag: "🇪🇸",
        title: "Flamenco — Tiếng vỗ và lửa Andalucía",
        titleEn: "Flamenco — Andalusia's clapping fire",
        summary: "Nghệ thuật tổng hợp gồm hát (cante), múa (baile) và đàn guitar, sinh ra từ vùng Andalucía thế kỷ 18.",
        summaryEn: "A fusion of song (cante), dance (baile), and guitar born in 18th-century Andalusia.",
        funFact: "Flamenco có hơn 50 “palos” (thể điệu) khác nhau với cảm xúc riêng.",
        funFactEn: "Flamenco has 50+ different 'palos' (styles), each with its own mood.",
        image: "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?auto=format&fit=crop&w=800&q=75",
      },
      {
        id: "cul-sushi-jp", country: "Nhật Bản", countryEn: "Japan", flag: "🍣",
        title: "Sushi — Tinh tế giản dị",
        titleEn: "Sushi — Refined simplicity",
        summary: "Bắt nguồn là cách bảo quản cá bằng cơm lên men, sushi nay là biểu tượng tinh tế của ẩm thực Nhật.",
        summaryEn: "Originally a way to preserve fish in fermented rice — now an icon of refined Japanese cuisine.",
        funFact: "Đầu bếp sushi cần 10+ năm đào tạo để được gọi là “itamae”.",
        funFactEn: "Sushi chefs train 10+ years to earn the title 'itamae'.",
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=75",
      },
      {
        id: "cul-mariachi-mx", country: "Mexico", countryEn: "Mexico", flag: "🎺",
        title: "Mariachi — Bản hùng ca đường phố",
        titleEn: "Mariachi — Streets serenade",
        summary: "Ban nhạc truyền thống với violin, vihuela, guitarrón và kèn trumpet — biểu tượng âm nhạc của Mexico.",
        summaryEn: "Traditional ensembles of violin, vihuela, guitarrón, and trumpet — Mexico's musical icon.",
        funFact: "Mariachi được UNESCO công nhận là di sản văn hóa phi vật thể năm 2011.",
        funFactEn: "Mariachi was inscribed as UNESCO intangible heritage in 2011.",
        didYouKnow: "Bộ trang phục 'charro' bằng da đen với nút bạc của mariachi vốn xuất phát từ phong cách của các kỵ sĩ chăn bò.",
        didYouKnowEn: "The black 'charro' suit with silver buttons originated from the attire of Mexican horseback ranchers.",
        image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=800&q=75",
      },
      {
        id: "cul-carnival-br", country: "Brazil", countryEn: "Brazil", flag: "🇧🇷",
        title: "Carnival Rio — Vũ điệu Samba",
        titleEn: "Rio Carnival — Samba Spectacle",
        summary: "Lễ hội đường phố lớn nhất hành tinh ở Rio de Janeiro với 2 triệu người mỗi ngày, samba parade, và sambódromo.",
        summaryEn: "The world's largest street festival in Rio — 2 million people daily, samba parades, and the Sambódromo.",
        funFact: "Mỗi 'trường samba' có thể có 4.000 thành viên diễu hành cùng lúc.",
        funFactEn: "Each samba school can field 4,000 members marching at once.",
        didYouKnow: "Carnival diễn ra ngay trước Mùa Chay (Lent) — vốn là dịp 'ăn chơi cuối cùng' trước 40 ngày kiêng khem theo truyền thống Công giáo.",
        didYouKnowEn: "Carnival happens just before Lent — historically a 'last hurrah' before 40 days of Catholic fasting.",
        image: "https://images.unsplash.com/photo-1583416750470-965b2707b355?auto=format&fit=crop&w=800&q=75",
      },
      {
        id: "cul-geisha-jp", country: "Nhật Bản", countryEn: "Japan", flag: "🎎",
        title: "Geisha — Nghệ nhân giải trí",
        titleEn: "Geisha — Masters of refined arts",
        summary: "Geisha là nghệ nhân lành nghề về múa, hát, đàn shamisen và nghệ thuật trò chuyện — không phải gái mại dâm như hiểu lầm phổ biến.",
        summaryEn: "Geisha are skilled artists of dance, song, shamisen, and conversation — often misunderstood in the West.",
        funFact: "Một geisha cần 5–6 năm tu luyện và bắt đầu từ thiếu nữ 'maiko'.",
        funFactEn: "A geisha trains for 5–6 years, starting as a young 'maiko' apprentice.",
        didYouKnow: "Lớp trang điểm trắng đặc trưng có nguồn gốc từ thời chưa có điện — giúp khuôn mặt rực sáng dưới ánh nến.",
        didYouKnowEn: "The iconic white makeup originated before electric lighting — to make the face glow under candlelight.",
        image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=800&q=75",
      },
      {
        id: "cul-hammam-tr", country: "Thổ Nhĩ Kỳ", countryEn: "Türkiye", flag: "🇹🇷",
        title: "Hammam — Phòng tắm hơi Thổ",
        titleEn: "Hammam — Turkish bath",
        summary: "Nghi thức tắm hơi thư giãn kết hợp tẩy tế bào chết, mát-xa và xông hơi trong những căn phòng đá cẩm thạch tuyệt đẹp.",
        summaryEn: "A relaxing bathing ritual blending exfoliation, massage, and steam in stunning marble chambers.",
        funFact: "Một số hammam ở Istanbul đã hoạt động liên tục từ thế kỷ 16.",
        funFactEn: "Some Istanbul hammams have operated continuously since the 16th century.",
        didYouKnow: "Hammam không chỉ để tắm — đây từng là nơi phụ nữ Ottoman gặp gỡ, mai mối hôn nhân và chia sẻ tin tức cộng đồng.",
        didYouKnowEn: "Hammams weren't just for bathing — they served as social hubs where Ottoman women matchmade marriages and shared news.",
        image: "https://images.unsplash.com/photo-1614851099175-e5b30eb6f696?auto=format&fit=crop&w=800&q=75",
      },
      {
        id: "cul-haka-nz", country: "New Zealand", countryEn: "New Zealand", flag: "🇳🇿",
        title: "Haka — Vũ điệu chiến binh Maori",
        titleEn: "Haka — Maori warrior dance",
        summary: "Vũ điệu nghi lễ với động tác mạnh mẽ, biểu cảm khuôn mặt dữ dội và tiếng hô vang — biểu tượng văn hóa Maori.",
        summaryEn: "A ceremonial dance with powerful moves, fierce expressions, and thunderous chants — a Maori cultural icon.",
        funFact: "Đội bóng bầu dục All Blacks biểu diễn haka trước mỗi trận đấu quốc tế.",
        funFactEn: "The All Blacks rugby team performs the haka before every international match.",
        didYouKnow: "Haka không chỉ dành cho chiến tranh — còn được dùng để chào mừng khách quý, tang lễ và lễ tốt nghiệp.",
        didYouKnowEn: "The haka isn't only for war — it's also performed to welcome guests, at funerals, and at graduations.",
        image: "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?auto=format&fit=crop&w=800&q=75",
      },
    ],
  },

  // ==================== ZONE 3: GLOBAL LANGUAGES ====================
  {
    id: "languages",
    icon: Languages,
    title: "Ngôn ngữ thế giới",
    titleEn: "Global Languages",
    tagline: "Lời chào và sự thật thú vị về các hệ chữ viết",
    taglineEn: "Greetings and fun facts about writing systems",
    accent: "from-emerald-500/20 via-teal-400/10 to-green-500/20",
    hero: heroLanguages,
    lessons: [
      {
        id: "lang-latin", country: "Hệ chữ Latin", countryEn: "Latin script", flag: "🔤",
        title: "Hello — Bonjour — Hola",
        titleEn: "Hello — Bonjour — Hola",
        summary: "Hơn 2 tỷ người dùng bảng chữ cái Latin — bảng chữ phổ biến nhất hành tinh.",
        summaryEn: "Over 2 billion people use the Latin alphabet — the most widely used script on Earth.",
        funFact: "Chữ “W” chỉ xuất hiện vào thế kỷ 7, vốn là hai chữ V ghép lại.",
        funFactEn: "The letter 'W' only appeared in the 7th century — it was originally two Vs.",
        image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=75",
      },
      {
        id: "lang-kanji", country: "Kanji (Nhật)", countryEn: "Kanji (Japan)", flag: "🈳",
        title: "こんにちは — Konnichiwa",
        titleEn: "こんにちは — Konnichiwa",
        summary: "Tiếng Nhật dùng 3 hệ chữ song song: Kanji (mượn từ Hán), Hiragana và Katakana.",
        summaryEn: "Japanese uses 3 scripts in parallel: Kanji (from Chinese), Hiragana, and Katakana.",
        funFact: "Học sinh Nhật học khoảng 2.136 chữ kanji thường dùng (jōyō kanji).",
        funFactEn: "Japanese students learn around 2,136 common-use kanji (jōyō kanji).",
        image: "https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=800&q=75",
      },
      {
        id: "lang-cyrillic", country: "Cyrillic (Nga)", countryEn: "Cyrillic (Russia)", flag: "🇷🇺",
        title: "Здравствуйте — Zdravstvuyte",
        titleEn: "Здравствуйте — Zdravstvuyte",
        summary: "Bảng chữ Cyrillic gồm 33 chữ cái, được tạo bởi hai tu sĩ Cyril và Methodius vào thế kỷ 9.",
        summaryEn: "The Cyrillic alphabet has 33 letters, created by monks Cyril & Methodius in the 9th century.",
        funFact: "Hơn 250 triệu người dùng Cyrillic làm chữ viết chính thức.",
        funFactEn: "Over 250 million people use Cyrillic as their official script.",
        image: "https://images.unsplash.com/photo-1513326738677-b964603b136d?auto=format&fit=crop&w=800&q=75",
      },
      {
        id: "lang-arabic", country: "Arabic (Ả Rập)", countryEn: "Arabic", flag: "🇸🇦",
        title: "مرحبا — Marhaban",
        titleEn: "مرحبا — Marhaban",
        summary: "Tiếng Ả Rập viết từ phải sang trái với 28 chữ cái, mỗi chữ có 4 hình dạng tùy vị trí.",
        summaryEn: "Arabic is written right-to-left with 28 letters, each having 4 forms by position.",
        funFact: "Các chữ số “Ả Rập” (0–9) mà thế giới dùng hôm nay thực ra có gốc từ Ấn Độ.",
        funFactEn: "Today's 'Arabic' numerals (0–9) actually originated in India.",
        image: "https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=800&q=75",
      },
      {
        id: "lang-hangul-kr", country: "Hangul (Hàn)", countryEn: "Hangul (Korea)", flag: "🇰🇷",
        title: "안녕하세요 — Annyeonghaseyo",
        titleEn: "안녕하세요 — Annyeonghaseyo",
        summary: "Hangul được Vua Sejong sáng tạo năm 1443 — bảng chữ duy nhất trên thế giới có “tác giả” và ngày khai sinh xác định.",
        summaryEn: "Hangul was invented by King Sejong in 1443 — the only alphabet with a known creator and birth date.",
        funFact: "Hình dạng phụ âm mô phỏng vị trí của lưỡi và miệng khi phát âm.",
        funFactEn: "Consonant shapes mimic the tongue and mouth position when speaking.",
        image: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=800&q=75",
      },
      {
        id: "lang-thai-th", country: "Thái Lan", countryEn: "Thailand", flag: "🇹🇭",
        title: "สวัสดี — Sawasdee",
        titleEn: "สวัสดี — Sawasdee",
        summary: "Tiếng Thái có 44 phụ âm và 5 thanh điệu — viết liền nhau không cách giữa các từ.",
        summaryEn: "Thai has 44 consonants and 5 tones — written with no spaces between words.",
        funFact: "Cùng một âm “mai” có thể mang 5 nghĩa khác nhau tùy thanh điệu.",
        funFactEn: "The syllable 'mai' can mean 5 different things depending on tone.",
        image: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?auto=format&fit=crop&w=800&q=75",
      },
      {
        id: "lang-greek-gr", country: "Hy Lạp", countryEn: "Greece", flag: "🇬🇷",
        title: "Γειά σου — Yia sou",
        titleEn: "Γειά σου — Yia sou",
        summary: "Bảng chữ Hy Lạp (24 chữ) là tổ tiên trực tiếp của Latin và Cyrillic, dùng liên tục hơn 2.700 năm.",
        summaryEn: "The Greek alphabet (24 letters) is the direct ancestor of Latin and Cyrillic — in use for 2,700+ years.",
        funFact: "Toán học, vật lý dùng nhiều chữ Hy Lạp như α, β, π, Σ.",
        funFactEn: "Math and physics borrow heavily from Greek letters: α, β, π, Σ.",
        image: "https://images.unsplash.com/photo-1555993539-1732b0258235?auto=format&fit=crop&w=800&q=75",
      },
      {
        id: "lang-hindi-in", country: "Ấn Độ", countryEn: "India", flag: "🇮🇳",
        title: "नमस्ते — Namaste",
        titleEn: "नमस्ते — Namaste",
        summary: "Tiếng Hindi dùng chữ Devanagari, được nhận diện bởi đường gạch ngang phía trên các chữ.",
        summaryEn: "Hindi uses Devanagari script — recognizable by the horizontal line connecting letters on top.",
        funFact: "“Namaste” nghĩa đen: “Tôi cúi chào điều thiêng liêng trong bạn.”",
        funFactEn: "'Namaste' literally means: 'I bow to the divine in you.'",
        image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=75",
      },
      {
        id: "lang-mandarin-cn", country: "Trung Quốc", countryEn: "China", flag: "🇨🇳",
        title: "你好 — Nǐ hǎo",
        titleEn: "你好 — Nǐ hǎo",
        summary: "Tiếng Trung phổ thông có 4 thanh điệu và hơn 50.000 chữ Hán; người trưởng thành cần biết ~3.000 để đọc báo.",
        summaryEn: "Mandarin has 4 tones and 50,000+ characters; adults need ~3,000 to read a newspaper.",
        funFact: "Chữ “明” (sáng) ghép từ “日” (mặt trời) và “月” (mặt trăng).",
        funFactEn: "The character '明' (bright) combines '日' (sun) and '月' (moon).",
        image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=800&q=75",
      },
      {
        id: "lang-swahili-ke", country: "Đông Phi", countryEn: "East Africa", flag: "🇰🇪",
        title: "Jambo — Hakuna matata",
        titleEn: "Jambo — Hakuna matata",
        summary: "Tiếng Swahili là cầu nối của hơn 100 triệu người ở Đông Phi, dùng bảng chữ Latin cải tiến.",
        summaryEn: "Swahili connects 100+ million speakers across East Africa, using a modified Latin alphabet.",
        funFact: "“Hakuna matata” — “không có vấn đề gì” — nổi tiếng nhờ phim Lion King.",
        funFactEn: "'Hakuna matata' — 'no worries' — was popularized by The Lion King.",
        image: "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?auto=format&fit=crop&w=800&q=75",
      },
      {
        id: "lang-vietnamese-vn", country: "Việt Nam", countryEn: "Vietnam", flag: "🇻🇳",
        title: "Xin chào — Quốc ngữ",
        titleEn: "Xin chào — Quốc ngữ",
        summary: "Tiếng Việt dùng bảng chữ Latin với 6 thanh điệu — được linh mục Alexandre de Rhodes hệ thống hóa thế kỷ 17.",
        summaryEn: "Vietnamese uses a Latin script with 6 tones — formalized by missionary Alexandre de Rhodes in the 17th century.",
        funFact: "Cùng một âm 'ma' có thể mang 6 nghĩa: ma, má, mà, mả, mã, mạ.",
        funFactEn: "The syllable 'ma' can mean 6 different things depending on tone: ghost, mother, but, tomb, horse, rice seedling.",
        didYouKnow: "Trước khi có Quốc ngữ, người Việt dùng 'chữ Nôm' — hệ chữ Hán biến thể, mỗi từ có thể có hàng chục cách viết.",
        didYouKnowEn: "Before the Latin-based script, Vietnamese used 'Nôm' — a Chinese-derived system where each word could have dozens of variants.",
        image: "https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?auto=format&fit=crop&w=800&q=75",
      },
      {
        id: "lang-german-de", country: "Đức", countryEn: "Germany", flag: "🇩🇪",
        title: "Guten Tag — Tiếng Đức",
        titleEn: "Guten Tag — German",
        summary: "Tiếng Đức nổi tiếng với những danh từ ghép dài — và quy tắc viết hoa mọi danh từ trong câu.",
        summaryEn: "German is famous for its compound nouns and the rule of capitalizing every noun in a sentence.",
        funFact: "'Donaudampfschifffahrtsgesellschaftskapitän' (44 chữ) nghĩa là 'thuyền trưởng tàu hơi nước Danube'.",
        funFactEn: "'Donaudampfschifffahrtsgesellschaftskapitän' (44 letters) means 'Danube steamship captain'.",
        didYouKnow: "Tiếng Đức có một từ riêng cho cảm giác 'vui sướng trước nỗi khổ của người khác' — Schadenfreude.",
        didYouKnowEn: "German has a single word for 'pleasure derived from someone else's misfortune' — Schadenfreude.",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=75",
      },
      {
        id: "lang-portuguese-pt", country: "Bồ Đào Nha & Brazil", countryEn: "Portugal & Brazil", flag: "🇵🇹",
        title: "Olá — Tiếng Bồ Đào Nha",
        titleEn: "Olá — Portuguese",
        summary: "Hơn 260 triệu người nói tiếng Bồ — đứng thứ 6 thế giới, được dùng tại 9 quốc gia trên 4 châu lục.",
        summaryEn: "260+ million speakers — the world's 6th most spoken language, official in 9 countries across 4 continents.",
        funFact: "Brazil chiếm tới 85% người nói tiếng Bồ trên toàn cầu.",
        funFactEn: "Brazil accounts for 85% of all Portuguese speakers worldwide.",
        didYouKnow: "Có hai biến thể chính: Bồ Đào Nha châu Âu và Brazil — phát âm khác đến mức nhiều người nghĩ đó là hai ngôn ngữ.",
        didYouKnowEn: "Two main variants exist — European and Brazilian — with pronunciations so different many think they're two languages.",
        image: "https://images.unsplash.com/photo-1488998427799-e3362cec87c3?auto=format&fit=crop&w=800&q=75",
      },
      {
        id: "lang-finnish-fi", country: "Phần Lan", countryEn: "Finland", flag: "🇫🇮",
        title: "Hei — Tiếng Phần Lan",
        titleEn: "Hei — Finnish",
        summary: "Một trong những ngôn ngữ khó học nhất thế giới — không thuộc nhóm Ấn-Âu, có 15 cách biến đổi danh từ.",
        summaryEn: "One of the world's hardest languages — not Indo-European, with 15 grammatical cases.",
        funFact: "Tiếng Phần Lan không có thì tương lai và không có giống đực/cái cho danh từ.",
        funFactEn: "Finnish has no future tense and no grammatical gender for nouns.",
        didYouKnow: "Người Phần có khái niệm 'sisu' — sự kiên trì bền bỉ vượt qua nghịch cảnh — không thể dịch chính xác sang ngôn ngữ khác.",
        didYouKnowEn: "Finns have a concept called 'sisu' — stoic determination in the face of adversity — that cannot be precisely translated.",
        image: "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?auto=format&fit=crop&w=800&q=75",
      },
      {
        id: "lang-hebrew-il", country: "Israel", countryEn: "Israel", flag: "🇮🇱",
        title: "שלום — Shalom",
        titleEn: "שלום — Shalom",
        summary: "Tiếng Hebrew được 'hồi sinh' từ ngôn ngữ tôn giáo cổ thành tiếng nói hằng ngày vào thế kỷ 19 — câu chuyện độc nhất trong lịch sử ngôn ngữ.",
        summaryEn: "Hebrew was 'revived' from a religious tongue into a daily language in the 19th century — unique in linguistic history.",
        funFact: "Eliezer Ben-Yehuda được coi là người 'tái sinh' tiếng Hebrew hiện đại.",
        funFactEn: "Eliezer Ben-Yehuda is credited as the 'father' of modern Hebrew.",
        didYouKnow: "'Shalom' không chỉ là 'xin chào/tạm biệt' — còn nghĩa là 'hòa bình' và 'sự trọn vẹn'.",
        didYouKnowEn: "'Shalom' isn't just 'hello/goodbye' — it also means 'peace' and 'wholeness'.",
        image: "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=800&q=75",
      },
    ],
  },

  // ==================== ZONE 4: SPECIAL LANDMARKS ====================
  {
    id: "landmarks",
    icon: MapPin,
    title: "Nét đặc trưng",
    titleEn: "Special Landmarks",
    tagline: "Câu chuyện độc đáo của từng quốc gia",
    taglineEn: "Unique stories from each country",
    accent: "from-violet-500/20 via-fuchsia-400/10 to-purple-500/20",
    hero: heroLandmarks,
    lessons: [
      {
        id: "lm-sauna-fi", country: "Phần Lan", countryEn: "Finland", flag: "🇫🇮",
        title: "Văn hóa Sauna",
        titleEn: "Sauna culture",
        summary: "Phần Lan có khoảng 3 triệu sauna cho 5,5 triệu dân — sauna là nơi thư giãn, hội họp, thậm chí đàm phán.",
        summaryEn: "Finland has ~3 million saunas for 5.5 million people — for relaxation, gatherings, even negotiations.",
        funFact: "UNESCO công nhận văn hóa sauna Phần Lan là di sản phi vật thể (2020).",
        funFactEn: "UNESCO recognised Finnish sauna culture as intangible heritage (2020).",
        image: "https://images.unsplash.com/photo-1614849963640-9cc74b2a826f?auto=format&fit=crop&w=800&q=75",
      },
      {
        id: "lm-coffee-vn", country: "Việt Nam", countryEn: "Vietnam", flag: "🇻🇳",
        title: "Văn hóa cà phê Việt",
        titleEn: "Vietnamese coffee culture",
        summary: "Từ phin nhỏ giọt đến cà phê trứng Hà Nội và cà phê muối Huế — cà phê Việt là một trải nghiệm chậm rãi.",
        summaryEn: "From the slow-drip 'phin' to Hanoi egg coffee and Huế salt coffee — Vietnamese coffee is a slow ritual.",
        funFact: "Việt Nam là nước xuất khẩu cà phê Robusta lớn nhất thế giới.",
        funFactEn: "Vietnam is the world's largest exporter of Robusta coffee.",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=75",
      },
      {
        id: "lm-tea-uk", country: "Anh Quốc", countryEn: "United Kingdom", flag: "🇬🇧",
        title: "Afternoon Tea",
        titleEn: "Afternoon Tea",
        summary: "Bắt đầu từ thế kỷ 19 bởi Nữ công tước Anna, trà chiều gồm trà đen, scone và bánh ngọt nhỏ.",
        summaryEn: "Started in the 19th century by Duchess Anna — black tea served with scones and dainty cakes.",
        funFact: "Người Anh uống khoảng 100 triệu tách trà mỗi ngày.",
        funFactEn: "Brits drink about 100 million cups of tea every single day.",
        image: "https://images.unsplash.com/photo-1596445836561-991bcd39a86d?auto=format&fit=crop&w=800&q=75",
      },
      {
        id: "lm-tango-ar", country: "Argentina", countryEn: "Argentina", flag: "🇦🇷",
        title: "Tango — Vũ điệu Buenos Aires",
        titleEn: "Tango — The dance of Buenos Aires",
        summary: "Sinh ra ở các khu cảng Buenos Aires cuối thế kỷ 19, tango là cuộc trò chuyện không lời giữa hai người.",
        summaryEn: "Born in the Buenos Aires docks in the late 1800s — a wordless conversation between two dancers.",
        funFact: "UNESCO công nhận tango là Di sản văn hóa phi vật thể năm 2009.",
        funFactEn: "UNESCO inscribed tango as Intangible Cultural Heritage in 2009.",
        image: "https://images.unsplash.com/photo-1545959570-a94084071b5d?auto=format&fit=crop&w=800&q=75",
      },
      {
        id: "lm-cherryblossom-jp", country: "Nhật Bản", countryEn: "Japan", flag: "🌸",
        title: "Hanami — Ngắm hoa anh đào",
        titleEn: "Hanami — Cherry blossom viewing",
        summary: "Mỗi tháng 4, người Nhật trải bạt dưới gốc sakura để ngắm hoa nở — biểu tượng của vẻ đẹp phù du.",
        summaryEn: "Every April, Japanese spread mats under sakura trees to admire fleeting beauty.",
        funFact: "Sóng hoa nở “sakura zensen” được dự báo trên TV như dự báo thời tiết.",
        funFactEn: "The cherry blossom front 'sakura zensen' is forecast on TV like weather.",
        image: "https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=800&q=75",
      },
      {
        id: "lm-tulip-nl", country: "Hà Lan", countryEn: "Netherlands", flag: "🇳🇱",
        title: "Cánh đồng tulip Keukenhof",
        titleEn: "Tulip fields of Keukenhof",
        summary: "Mỗi mùa xuân, 7 triệu củ tulip nở rộ trên những dải sọc màu trải dài tới chân trời.",
        summaryEn: "Every spring, 7 million tulip bulbs bloom in striped fields stretching to the horizon.",
        funFact: "Vào thế kỷ 17, một củ tulip quý có giá bằng cả một ngôi nhà ở Amsterdam.",
        funFactEn: "In the 17th century, a single rare tulip bulb could cost as much as an Amsterdam house.",
        image: "https://images.unsplash.com/photo-1510074377623-8cf13fb86c08?auto=format&fit=crop&w=800&q=75",
      },
      {
        id: "lm-balloon-tr", country: "Thổ Nhĩ Kỳ", countryEn: "Türkiye", flag: "🇹🇷",
        title: "Khinh khí cầu Cappadocia",
        titleEn: "Cappadocia hot-air balloons",
        summary: "Mỗi sáng, hàng trăm khinh khí cầu cùng bay lên giữa “ống khói cổ tích” và thung lũng đá núi lửa.",
        summaryEn: "Every morning, hundreds of balloons rise together over fairy chimneys and volcanic valleys.",
        funFact: "Cappadocia là một trong những nơi tốt nhất thế giới để bay khinh khí cầu — nhờ gió ổn định.",
        funFactEn: "Cappadocia is one of the world's best ballooning sites — thanks to steady winds.",
        image: "https://images.unsplash.com/photo-1570213489059-0aac6626cade?auto=format&fit=crop&w=800&q=75",
      },
      {
        id: "lm-maple-ca", country: "Canada", countryEn: "Canada", flag: "🇨🇦",
        title: "Mùa thu lá phong & syrup",
        titleEn: "Maple autumn & syrup",
        summary: "Canada cung cấp 71% lượng syrup phong toàn cầu — và mùa thu nhuộm cả khu rừng đỏ rực.",
        summaryEn: "Canada produces 71% of the world's maple syrup — and autumn turns its forests fiery red.",
        funFact: "Cần khoảng 40 lít nhựa cây để làm 1 lít syrup phong nguyên chất.",
        funFactEn: "It takes 40 liters of sap to produce just 1 liter of pure maple syrup.",
        image: "https://images.unsplash.com/photo-1507783548227-544c3b8fc065?auto=format&fit=crop&w=800&q=75",
      },
      {
        id: "lm-yoga-in", country: "Ấn Độ", countryEn: "India", flag: "🧘",
        title: "Yoga — Hợp nhất thân và tâm",
        titleEn: "Yoga — Uniting body and mind",
        summary: "Hơn 5.000 năm tuổi, yoga là khoa học cổ về hơi thở, tư thế và thiền định, lan tỏa khắp thế giới.",
        summaryEn: "5,000+ years old, yoga is an ancient science of breath, posture, and meditation now practiced worldwide.",
        funFact: "Liên Hiệp Quốc đã chọn 21/6 là Ngày Quốc tế Yoga.",
        funFactEn: "The UN designated June 21 as International Yoga Day.",
        image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=75",
      },
      {
        id: "lm-pizza-it", country: "Ý", countryEn: "Italy", flag: "🍕",
        title: "Pizza Napoli — Di sản UNESCO",
        titleEn: "Pizza Napoletana — UNESCO heritage",
        summary: "Pizza Margherita ra đời ở Napoli năm 1889 với 3 màu xanh-trắng-đỏ vinh danh quốc kỳ Ý.",
        summaryEn: "Margherita pizza was born in Naples in 1889 — green-white-red honoring the Italian flag.",
        funFact: "Nghệ thuật làm pizza “Pizzaiuolo” được UNESCO công nhận năm 2017.",
        funFactEn: "The 'Pizzaiuolo' pizza-making craft was UNESCO inscribed in 2017.",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=75",
      },
      {
        id: "lm-outback-au", country: "Úc", countryEn: "Australia", flag: "🇦🇺",
        title: "Outback — Trái tim đỏ của Úc",
        titleEn: "The Outback — Australia's red heart",
        summary: "Vùng nội địa hoang mạc rộng lớn với đất đỏ rực, núi đá Uluru linh thiêng và bầu trời sao trong vắt.",
        summaryEn: "A vast inland desert with red earth, sacred Uluru rock, and crystal-clear starry skies.",
        funFact: "Outback chiếm 70% diện tích nước Úc nhưng chỉ có chưa đến 5% dân số sinh sống.",
        funFactEn: "The Outback covers 70% of Australia but is home to less than 5% of the population.",
        didYouKnow: "Uluru cao 348 m so với mặt đất, nhưng phần chìm dưới đất sâu tới 2,5 km — như một tảng băng trôi đá.",
        didYouKnowEn: "Uluru rises 348 m above ground, but extends 2.5 km underground — like a stone iceberg.",
        image: "https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=800&q=75",
      },
      {
        id: "lm-maple-ca", country: "Canada", countryEn: "Canada", flag: "🇨🇦",
        title: "Si rô lá phong — Vàng lỏng",
        titleEn: "Maple syrup — Liquid gold",
        summary: "Canada sản xuất 71% si rô lá phong toàn cầu — chiết xuất từ nhựa cây phong vào mỗi mùa xuân.",
        summaryEn: "Canada produces 71% of the world's maple syrup — tapped from maple trees every spring.",
        funFact: "Cần 40 lít nhựa cây để làm ra chỉ 1 lít si rô.",
        funFactEn: "It takes 40 liters of sap to make just 1 liter of syrup.",
        didYouKnow: "Canada có 'Kho dự trữ si rô lá phong chiến lược' giống như kho dầu — để bình ổn giá toàn cầu.",
        didYouKnowEn: "Canada maintains a 'Strategic Maple Syrup Reserve' — much like an oil reserve — to stabilize global prices.",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=75",
      },
      {
        id: "lm-chai-in", country: "Ấn Độ", countryEn: "India", flag: "🇮🇳",
        title: "Chai — Trà sữa Ấn Độ",
        titleEn: "Chai — Indian milk tea",
        summary: "Trà đen đun với sữa, gừng, bạch đậu khấu, quế và hồi — phục vụ tại mọi 'chai stall' trên đường phố.",
        summaryEn: "Black tea simmered with milk, ginger, cardamom, cinnamon, and star anise — sold at every street 'chai stall'.",
        funFact: "Người Ấn uống khoảng 837.000 tấn chè mỗi năm — đứng top thế giới.",
        funFactEn: "Indians consume about 837,000 tons of tea per year — among the world's highest.",
        didYouKnow: "'Chai' là từ tiếng Hindi cho 'trà' — vì vậy 'chai tea' nói đúng nghĩa là 'trà trà'.",
        didYouKnowEn: "'Chai' is the Hindi word for 'tea' — so 'chai tea' literally means 'tea tea'.",
        image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=75",
      },
      {
        id: "lm-skyline-us", country: "Hoa Kỳ", countryEn: "United States", flag: "🗽",
        title: "Skyline New York — Giấc mơ Mỹ",
        titleEn: "NYC Skyline — The American Dream",
        summary: "Đường chân trời Manhattan với Empire State, One World Trade và hơn 6.000 nhà cao tầng — biểu tượng đô thị hiện đại.",
        summaryEn: "Manhattan's skyline — Empire State, One World Trade, and 6,000+ high-rises — icon of the modern metropolis.",
        funFact: "Empire State Building được xây xong trong vòng 410 ngày vào thời Đại Khủng Hoảng.",
        funFactEn: "The Empire State Building was built in just 410 days during the Great Depression.",
        didYouKnow: "Manhattan có thể đỡ những tòa nhà siêu cao nhờ nền đá granite tự nhiên ngay dưới mặt đất.",
        didYouKnowEn: "Manhattan can support skyscrapers thanks to a natural granite bedrock just beneath the surface.",
        image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&w=800&q=75",
      },
      {
        id: "lm-bazaar-tr", country: "Thổ Nhĩ Kỳ", countryEn: "Türkiye", flag: "🇹🇷",
        title: "Grand Bazaar — Thiên đường mua sắm",
        titleEn: "Grand Bazaar — Shopper's paradise",
        summary: "Một trong những chợ có mái che lâu đời và lớn nhất thế giới ở Istanbul: 4.000 cửa hàng trên 64 con phố.",
        summaryEn: "One of the world's oldest and largest covered markets in Istanbul — 4,000 shops across 64 streets.",
        funFact: "Mỗi ngày Grand Bazaar đón 250.000 — 400.000 lượt khách.",
        funFactEn: "The Grand Bazaar welcomes 250,000–400,000 visitors per day.",
        didYouKnow: "Mặc cả không chỉ được chấp nhận — mà còn là một phần văn hóa: chủ shop sẽ thất vọng nếu bạn không trả giá!",
        didYouKnowEn: "Bargaining isn't just accepted — it's expected: shopkeepers feel disappointed if you don't haggle!",
        image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=800&q=75",
      },
    ],
  },

  // ==================== ZONE 5: GLOBAL CUISINE ====================
  {
    id: "cuisine",
    icon: UtensilsCrossed,
    title: "Ẩm thực thế giới",
    titleEn: "Global Cuisine",
    tagline: "Hành trình vị giác qua các nền ẩm thực biểu tượng",
    taglineEn: "A flavor journey through iconic cuisines",
    accent: "from-amber-500/20 via-red-400/10 to-orange-500/20",
    hero: heroCuisine,
    lessons: [
      {
        id: "cui-pizza-it", country: "Ý", countryEn: "Italy", flag: "🍕",
        title: "Pizza Napoletana — Bột nướng kinh điển",
        titleEn: "Pizza Napoletana — Classic dough art",
        summary: "Đế bột mềm, viền giòn, nướng trong lò củi 485 °C chỉ 60–90 giây — chuẩn 'vera pizza' Naples.",
        summaryEn: "Soft base, crisp edges, fired in a 485 °C wood oven for just 60–90 seconds — true 'vera pizza' from Naples.",
        funFact: "Pizza Margherita được tạo năm 1889 để vinh danh Nữ hoàng Margherita của Ý.",
        funFactEn: "Margherita pizza was created in 1889 to honor Queen Margherita of Italy.",
        didYouKnow: "Có một hiệp hội (AVPN) cấp chứng nhận 'pizza Napoletana đích thực' — chỉ những lò đạt 7 tiêu chí khắt khe mới được dán nhãn.",
        didYouKnowEn: "An association (AVPN) certifies 'true Neapolitan pizza' — only ovens meeting 7 strict criteria can use the label.",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=75",
      },
      {
        id: "cui-sushi-jp", country: "Nhật Bản", countryEn: "Japan", flag: "🍣",
        title: "Sushi — Nghệ thuật cá tươi",
        titleEn: "Sushi — The art of fresh fish",
        summary: "Cơm dấm kết hợp hải sản tươi sống — từ nigiri đơn giản tới omakase nhiều món ở các nhà hàng cao cấp.",
        summaryEn: "Vinegared rice paired with fresh seafood — from simple nigiri to elaborate omakase at fine-dining counters.",
        funFact: "Một con cá ngừ vây xanh từng bán đấu giá tới 3,1 triệu USD ở chợ Toyosu Tokyo (2019).",
        funFactEn: "A bluefin tuna once sold for $3.1 million at Tokyo's Toyosu market (2019).",
        didYouKnow: "Wasabi thật rất hiếm và đắt — phần lớn 'wasabi' bạn ăn ở nhà hàng thực ra là cải ngựa nhuộm xanh.",
        didYouKnowEn: "Real wasabi is rare and expensive — most 'wasabi' served at restaurants is actually dyed horseradish.",
        image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=800&q=75",
      },
      {
        id: "cui-pho-vn", country: "Việt Nam", countryEn: "Vietnam", flag: "🍜",
        title: "Phở — Linh hồn ẩm thực Việt",
        titleEn: "Phở — Soul of Vietnamese cuisine",
        summary: "Nước dùng ninh xương 8–12 giờ với quế, hồi, thảo quả, đinh hương — bánh phở mềm, thịt bò tái và rau thơm tươi.",
        summaryEn: "Bone broth simmered 8–12 hours with cinnamon, star anise, cardamom, cloves — soft rice noodles, beef, fresh herbs.",
        funFact: "Phở được tạp chí Business Insider xếp vào top 50 món ngon nhất thế giới.",
        funFactEn: "Phở is listed by Business Insider among the world's 50 best dishes.",
        didYouKnow: "Phở ra đời đầu thế kỷ 20 ở Nam Định/Hà Nội — chịu ảnh hưởng từ món pot-au-feu Pháp và truyền thống ăn bún Việt.",
        didYouKnowEn: "Phở emerged in early-20th-century Nam Định/Hanoi — influenced by French pot-au-feu and Vietnam's noodle traditions.",
        image: "https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=800&q=75",
      },
      {
        id: "cui-tacos-mx", country: "Mexico", countryEn: "Mexico", flag: "🌮",
        title: "Tacos — Vũ điệu vị giác Mexico",
        titleEn: "Tacos — A Mexican flavor dance",
        summary: "Bánh ngô (tortilla) gói thịt nướng, hành tây, ngò rí, chanh và sốt salsa — món đường phố biểu tượng của Mexico.",
        summaryEn: "Corn tortillas wrapping grilled meat, onions, cilantro, lime, and salsa — Mexico's iconic street food.",
        funFact: "Mexico City có hơn 50.000 quầy taco — taco al pastor là loại nổi tiếng nhất.",
        funFactEn: "Mexico City has 50,000+ taco stands — 'al pastor' is the most famous variety.",
        didYouKnow: "Taco al pastor có nguồn gốc từ kỹ thuật shawarma do người Liban di cư mang đến Mexico đầu thế kỷ 20.",
        didYouKnowEn: "Taco al pastor's spit-roasting technique came from Lebanese shawarma, brought to Mexico by immigrants in the early 1900s.",
        image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=75",
      },
      {
        id: "cui-croissant-fr", country: "Pháp", countryEn: "France", flag: "🥐",
        title: "Croissant — Bánh trăng khuyết",
        titleEn: "Croissant — The crescent pastry",
        summary: "Bột pâte feuilletée gấp lớp với bơ — nướng giòn rụm bên ngoài, mềm xốp bên trong. Bữa sáng kinh điển của Pháp.",
        summaryEn: "Laminated puff pastry folded with butter — crisp outside, soft inside. France's classic breakfast.",
        funFact: "Một chiếc croissant chuẩn có tới 81 lớp bột-bơ xen kẽ.",
        funFactEn: "A proper croissant has 81 alternating layers of dough and butter.",
        didYouKnow: "Croissant thực ra có gốc từ Áo (kipferl) — Marie Antoinette mang công thức sang Pháp khi kết hôn với Louis XVI.",
        didYouKnowEn: "Croissants actually originated in Austria (kipferl) — Marie Antoinette brought the recipe to France when she married Louis XVI.",
        image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=75",
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
                      {/* Zone hero: realistic photo + gradient overlay + title */}
                      <div className="relative rounded-2xl overflow-hidden mb-8 shadow-lg">
                        <img
                          src={zone.hero}
                          alt={t(zone.title, zone.titleEn)}
                          loading="lazy"
                          width={1280}
                          height={512}
                          className="w-full h-48 md:h-64 object-cover"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent`} />
                        <div className={`absolute inset-0 bg-gradient-to-br ${zone.accent} mix-blend-overlay`} />
                        <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 text-center">
                          <h2 className="text-2xl md:text-4xl font-display font-bold text-foreground mb-2 drop-shadow-md">
                            {t(zone.title, zone.titleEn)}
                          </h2>
                          <p className="text-foreground/90 text-sm md:text-base drop-shadow">{t(zone.tagline, zone.taglineEn)}</p>
                        </div>
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
                              className="glass-card overflow-hidden flex flex-col group hover:shadow-lg transition-shadow"
                            >
                              {/* Realistic photo thumbnail */}
                              <div className="relative w-full h-40 overflow-hidden bg-secondary/40">
                                <img
                                  src={lesson.image}
                                  alt={t(lesson.title, lesson.titleEn)}
                                  loading="lazy"
                                  width={800}
                                  height={500}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                  onError={(e) => {
                                    const img = e.currentTarget;
                                    if (!img.dataset.fallback) {
                                      img.dataset.fallback = "1";
                                      img.src = `https://source.unsplash.com/800x500/?${encodeURIComponent(lesson.titleEn || lesson.countryEn)}`;
                                    } else {
                                      img.style.display = "none";
                                    }
                                  }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                                <span
                                  className="absolute top-2 left-2 text-3xl drop-shadow-md"
                                  aria-hidden
                                >
                                  {lesson.flag}
                                </span>
                                {stamped && (
                                  <Badge className="absolute top-2 right-2 bg-emerald-500/90 text-white border-0 gap-1 shadow">
                                    <CheckCircle2 className="w-3 h-3" />
                                    {t("Đã đóng dấu", "Stamped")}
                                  </Badge>
                                )}
                              </div>

                              <div className="p-5 flex flex-col flex-1">

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
