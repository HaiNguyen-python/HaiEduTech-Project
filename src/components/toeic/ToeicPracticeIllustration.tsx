// Realistic TOEIC-style illustrations for Practice Set items.
// Uses curated Unsplash photos that match common TOEIC Part 1-7 scene types.

interface Props {
  context: string;
  contextVi?: string;
  index: number;
}

type Scene = {
  emoji: string;
  label: string;
  labelVi: string;
  // Multiple images per scene so different questions don't show the same photo
  images: string[];
  partTag?: string;
};

// All images sourced from Unsplash (free for commercial use, no attribution required)
// Sized to 480px wide for fast loading.
const u = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=480&q=70`;

const SCENES: Record<string, Scene> = {
  photocopier: {
    emoji: "🖨️",
    label: "Office equipment",
    labelVi: "Thiết bị văn phòng",
    partTag: "Part 1",
    images: [
      u("photo-1581094794329-c8112a89af12"), // office printer
      u("photo-1497032628192-86f99bcd76bc"), // office desk + machine
      u("photo-1556761175-5973dc0f32e7"), // office worker
    ],
  },
  handshake: {
    emoji: "🤝",
    label: "Business handshake",
    labelVi: "Bắt tay kinh doanh",
    partTag: "Part 1",
    images: [
      u("photo-1521791136064-7986c2920216"), // handshake
      u("photo-1573497019940-1c28c88b4f3e"), // business greeting
      u("photo-1556761175-b413da4baf72"), // meeting handshake
    ],
  },
  parking: {
    emoji: "🅿️",
    label: "Parking lot",
    labelVi: "Bãi đỗ xe",
    partTag: "Part 1",
    images: [
      u("photo-1506521781263-d8422e82f27a"), // parking lot
      u("photo-1568605114967-8130f3a36994"), // car parked
      u("photo-1449965408869-eaa3f722e40d"), // empty lot with cars
    ],
  },
  meeting: {
    emoji: "👥",
    label: "Business meeting",
    labelVi: "Cuộc họp kinh doanh",
    partTag: "Part 3",
    images: [
      u("photo-1517245386807-bb43f82c33c4"), // boardroom meeting
      u("photo-1542744173-8e7e53415bb0"), // team discussion
      u("photo-1543269865-cbf427effbad"), // collaborative meeting
    ],
  },
  email: {
    emoji: "📧",
    label: "Email / correspondence",
    labelVi: "Email / Thư từ",
    partTag: "Part 7",
    images: [
      u("photo-1596526131083-e8c633c948d2"), // laptop email
      u("photo-1551836022-d5d88e9218df"), // inbox screen
      u("photo-1557200134-90327ee9fafa"), // typing email
    ],
  },
  chart: {
    emoji: "📊",
    label: "Chart / Graphic",
    labelVi: "Biểu đồ / Đồ họa",
    partTag: "Part 3-4",
    images: [
      u("photo-1551288049-bebda4e38f71"), // analytics dashboard
      u("photo-1460925895917-afdab827c52f"), // business charts
      u("photo-1543286386-713bdd548da4"), // graphs report
    ],
  },
  schedule: {
    emoji: "📅",
    label: "Schedule / Timetable",
    labelVi: "Lịch trình",
    partTag: "Part 7",
    images: [
      u("photo-1506784983877-45594efa4cbe"), // planner calendar
      u("photo-1611224923853-80b023f02d71"), // schedule notebook
      u("photo-1484480974693-6ca0a78fb36b"), // appointment calendar
    ],
  },
  pricelist: {
    emoji: "💲",
    label: "Price list / Receipt",
    labelVi: "Bảng giá / Hóa đơn",
    partTag: "Part 7",
    images: [
      u("photo-1554224155-6726b3ff858f"), // receipt invoice
      u("photo-1554224154-26032ffc0d07"), // pricing chart
      u("photo-1450101499163-c8848c66ca85"), // store receipt
    ],
  },
  sentence: {
    emoji: "✍️",
    label: "Grammar / Sentence",
    labelVi: "Ngữ pháp / Câu",
    partTag: "Part 5-6",
    images: [
      u("photo-1456513080510-7bf3a84b82f8"), // open notebook writing
      u("photo-1517842645767-c639042777db"), // grammar book
      u("photo-1455390582262-044cdead277a"), // study notes
    ],
  },
  reading: {
    emoji: "📖",
    label: "Reading passage",
    labelVi: "Bài đọc",
    partTag: "Part 7",
    images: [
      u("photo-1481627834876-b7833e8f5570"), // open book reading
      u("photo-1532012197267-da84d127e765"), // reading material
      u("photo-1495446815901-a7297e633e8d"), // newspaper article
    ],
  },
  factory: {
    emoji: "🏭",
    label: "Factory / Warehouse",
    labelVi: "Nhà máy / Kho hàng",
    partTag: "Part 1",
    images: [
      u("photo-1565514020179-026b92b84bb6"), // warehouse
      u("photo-1581092918056-0c4c3acd3789"), // factory worker
      u("photo-1586528116311-ad8dd3c8310d"), // industrial workspace
    ],
  },
  phone: {
    emoji: "📞",
    label: "Phone call",
    labelVi: "Cuộc điện thoại",
    partTag: "Part 3",
    images: [
      u("photo-1556745753-b2904692b3cd"), // person on phone office
      u("photo-1573496359142-b8d87734a5a2"), // business phone call
      u("photo-1580894732444-8ecded7900cd"), // call center
    ],
  },
  restaurant: {
    emoji: "🍽️",
    label: "Restaurant / Cafe",
    labelVi: "Nhà hàng / Quán cafe",
    partTag: "Part 1-3",
    images: [
      u("photo-1517248135467-4c7edcad34c4"), // restaurant interior
      u("photo-1555396273-367ea4eb4db5"), // cafe customer
      u("photo-1414235077428-338989a2e8c0"), // dining
    ],
  },
  store: {
    emoji: "🛒",
    label: "Retail / Store",
    labelVi: "Cửa hàng bán lẻ",
    partTag: "Part 1-3",
    images: [
      u("photo-1441986300917-64674bd600d8"), // retail shopping
      u("photo-1604719312566-8912e9227c6a"), // store shelves
      u("photo-1568010434901-1d4b2c4b5b2d"), // shopping
    ],
  },
  airport: {
    emoji: "✈️",
    label: "Airport / Travel",
    labelVi: "Sân bay / Du lịch",
    partTag: "Part 3-4",
    images: [
      u("photo-1436491865332-7a61a109cc05"), // airport terminal
      u("photo-1542296332-2e4473faf563"), // airplane window
      u("photo-1569154941061-e231b4725ef1"), // travel luggage
    ],
  },
  hotel: {
    emoji: "🏨",
    label: "Hotel / Reception",
    labelVi: "Khách sạn / Lễ tân",
    partTag: "Part 3-4",
    images: [
      u("photo-1566073771259-6a8506099945"), // hotel room
      u("photo-1582719508461-905c673771fd"), // hotel lobby
      u("photo-1564501049412-61c2a3083791"), // luxury hotel
    ],
  },
  presentation: {
    emoji: "📽️",
    label: "Presentation",
    labelVi: "Bài thuyết trình",
    partTag: "Part 4",
    images: [
      u("photo-1475721027785-f74eccf877e2"), // presentation
      u("photo-1559223607-a43c990c692c"), // speaker presenting
      u("photo-1540575467063-178a50c2df87"), // conference talk
    ],
  },
  default: {
    emoji: "💼",
    label: "Business scene",
    labelVi: "Cảnh kinh doanh",
    partTag: "TOEIC",
    images: [
      u("photo-1497366216548-37526070297c"), // modern office
      u("photo-1497032628192-86f99bcd76bc"), // workspace
      u("photo-1521737711867-e3b97375f902"), // business team
    ],
  },
};

function pickScene(text: string): Scene {
  const t = text.toLowerCase();
  if (/photocop|copier|copy machine/.test(t)) return SCENES.photocopier;
  if (/handshak|shaking hand|greet/.test(t)) return SCENES.handshake;
  if (/parking|bãi đỗ/.test(t)) return SCENES.parking;
  if (/email|inbox|memo|letter|notice/.test(t)) return SCENES.email;
  if (/schedule|timetable|lịch|agenda|appointment/.test(t)) return SCENES.schedule;
  if (/price|\$\d|cost|invoice|receipt|bảng giá|hóa đơn/.test(t)) return SCENES.pricelist;
  if (/chart|graphic|graph|biểu đồ|đồ họa|diagram|statistic/.test(t)) return SCENES.chart;
  if (/restaurant|cafe|dining|nhà hàng|quán/.test(t)) return SCENES.restaurant;
  if (/store|shop|retail|customer.*purchase|cửa hàng/.test(t)) return SCENES.store;
  if (/airport|flight|airplane|sân bay|máy bay/.test(t)) return SCENES.airport;
  if (/hotel|reception|guest|khách sạn|lễ tân/.test(t)) return SCENES.hotel;
  if (/presentation|present|speaker|thuyết trình|diễn giả/.test(t)) return SCENES.presentation;
  if (/meeting|conference|cuộc họp|hội nghị|boardroom/.test(t)) return SCENES.meeting;
  if (/sentence completion|hoàn thành câu|part 5|part 6|grammar/.test(t)) return SCENES.sentence;
  if (/passage|reading|đoạn văn|part 7|article|newspaper/.test(t)) return SCENES.reading;
  if (/factory|warehouse|nhà máy|workplace|industrial|construction/.test(t)) return SCENES.factory;
  if (/phone|call|điện thoại|telephone/.test(t)) return SCENES.phone;
  return SCENES.default;
}

const ToeicPracticeIllustration = ({ context, contextVi, index }: Props) => {
  const scene = pickScene(`${context} ${contextVi ?? ""}`);
  const img = scene.images[index % scene.images.length];

  return (
    <figure className="relative w-full sm:w-56 h-36 sm:h-40 shrink-0 rounded-xl overflow-hidden ring-1 ring-slate-200 dark:ring-white/10 shadow-md bg-slate-100 dark:bg-slate-800">
      <img
        src={img}
        alt={scene.label}
        loading="lazy"
        className="w-full h-full object-cover"
        onError={(e) => {
          // graceful fallback to a generic business scene if Unsplash blocks/loads slowly
          (e.currentTarget as HTMLImageElement).src = SCENES.default.images[0];
        }}
      />
      {/* Top-left part badge */}
      {scene.partTag && (
        <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur text-white text-[10px] font-bold tracking-wide">
          {scene.partTag} · #{index + 1}
        </div>
      )}
      {/* Bottom caption like a real TOEIC test photo number */}
      <figcaption className="absolute bottom-0 left-0 right-0 px-2.5 py-1 bg-gradient-to-t from-black/85 via-black/55 to-transparent text-white text-[11px] font-medium flex items-center gap-1.5">
        <span>{scene.emoji}</span>
        <span className="truncate">{scene.label}</span>
      </figcaption>
    </figure>
  );
};

export default ToeicPracticeIllustration;
