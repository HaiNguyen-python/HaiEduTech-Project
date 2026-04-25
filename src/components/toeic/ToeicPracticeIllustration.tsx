// Contextual illustration for TOEIC practice set items.
// Picks an SVG scene + emoji + gradient based on keywords in the context string.

interface Props {
  context: string;
  contextVi?: string;
  index: number;
}

type Scene = {
  emoji: string;
  label: string;
  labelVi: string;
  gradient: string;
  ring: string;
  svg: JSX.Element;
};

const SCENES: Record<string, Scene> = {
  photocopier: {
    emoji: "🖨️",
    label: "Office · Photocopier",
    labelVi: "Văn phòng · Máy photocopy",
    gradient: "from-sky-100 via-blue-50 to-indigo-100",
    ring: "ring-sky-300/60",
    svg: (
      <svg viewBox="0 0 120 80" className="w-full h-full">
        <rect x="30" y="20" width="60" height="40" rx="4" fill="#94a3b8" />
        <rect x="34" y="26" width="52" height="10" rx="2" fill="#e2e8f0" />
        <circle cx="42" cy="46" r="3" fill="#0ea5e9" />
        <rect x="50" y="42" width="36" height="8" rx="1" fill="#cbd5e1" />
        <rect x="54" y="60" width="12" height="14" fill="#fb923c" />
        <circle cx="60" cy="74" r="2" fill="#1e293b" />
        <rect x="20" y="56" width="8" height="20" fill="#475569" />
      </svg>
    ),
  },
  handshake: {
    emoji: "🤝",
    label: "Conference · Handshake",
    labelVi: "Hội nghị · Bắt tay",
    gradient: "from-emerald-100 via-teal-50 to-cyan-100",
    ring: "ring-emerald-300/60",
    svg: (
      <svg viewBox="0 0 120 80" className="w-full h-full">
        <rect x="0" y="0" width="120" height="80" fill="url(#g1)" />
        <defs>
          <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#a7f3d0" />
            <stop offset="1" stopColor="#bae6fd" />
          </linearGradient>
        </defs>
        <circle cx="35" cy="28" r="10" fill="#fcd34d" />
        <rect x="22" y="38" width="26" height="30" rx="6" fill="#1e40af" />
        <circle cx="85" cy="28" r="10" fill="#fdba74" />
        <rect x="72" y="38" width="26" height="30" rx="6" fill="#7c2d12" />
        <rect x="48" y="46" width="24" height="8" rx="3" fill="#fde68a" stroke="#92400e" strokeWidth="1" />
      </svg>
    ),
  },
  parking: {
    emoji: "🅿️",
    label: "Parking Lot",
    labelVi: "Bãi đỗ xe",
    gradient: "from-slate-100 via-zinc-50 to-stone-100",
    ring: "ring-slate-300/60",
    svg: (
      <svg viewBox="0 0 120 80" className="w-full h-full">
        <rect x="0" y="0" width="120" height="80" fill="#475569" />
        {[10, 35, 60, 85].map((x) => (
          <rect key={x} x={x} y="10" width="2" height="60" fill="#fde047" />
        ))}
        <rect x="14" y="18" width="18" height="10" rx="2" fill="#ef4444" />
        <rect x="64" y="44" width="18" height="10" rx="2" fill="#3b82f6" />
        <text x="100" y="20" fontSize="14" fill="#fde047" fontWeight="bold">P</text>
      </svg>
    ),
  },
  meeting: {
    emoji: "👥",
    label: "Business Meeting",
    labelVi: "Cuộc họp kinh doanh",
    gradient: "from-indigo-100 via-violet-50 to-purple-100",
    ring: "ring-indigo-300/60",
    svg: (
      <svg viewBox="0 0 120 80" className="w-full h-full">
        <ellipse cx="60" cy="50" rx="40" ry="14" fill="#a78bfa" />
        <ellipse cx="60" cy="48" rx="40" ry="14" fill="#c4b5fd" />
        <circle cx="30" cy="35" r="6" fill="#fcd34d" />
        <circle cx="60" cy="28" r="6" fill="#fdba74" />
        <circle cx="90" cy="35" r="6" fill="#fca5a5" />
        <circle cx="30" cy="65" r="6" fill="#86efac" />
        <circle cx="90" cy="65" r="6" fill="#7dd3fc" />
        <rect x="55" y="46" width="10" height="6" fill="#1e293b" />
      </svg>
    ),
  },
  email: {
    emoji: "📧",
    label: "Email Discussion",
    labelVi: "Trao đổi email",
    gradient: "from-blue-100 via-sky-50 to-cyan-100",
    ring: "ring-blue-300/60",
    svg: (
      <svg viewBox="0 0 120 80" className="w-full h-full">
        <rect x="20" y="20" width="80" height="50" rx="4" fill="#fff" stroke="#3b82f6" strokeWidth="2" />
        <path d="M20 24 L60 50 L100 24" fill="none" stroke="#3b82f6" strokeWidth="2" />
        <rect x="28" y="56" width="40" height="3" fill="#cbd5e1" />
        <rect x="28" y="62" width="30" height="3" fill="#cbd5e1" />
        <circle cx="92" cy="58" r="6" fill="#ef4444" />
        <text x="89" y="62" fontSize="8" fill="#fff" fontWeight="bold">!</text>
      </svg>
    ),
  },
  chart: {
    emoji: "📊",
    label: "Chart / Graphic",
    labelVi: "Biểu đồ / Đồ họa",
    gradient: "from-amber-100 via-yellow-50 to-orange-100",
    ring: "ring-amber-300/60",
    svg: (
      <svg viewBox="0 0 120 80" className="w-full h-full">
        <rect x="10" y="10" width="100" height="60" rx="4" fill="#fff" stroke="#f59e0b" strokeWidth="1.5" />
        <rect x="22" y="40" width="12" height="22" fill="#3b82f6" />
        <rect x="42" y="30" width="12" height="32" fill="#10b981" />
        <rect x="62" y="22" width="12" height="40" fill="#f59e0b" />
        <rect x="82" y="34" width="12" height="28" fill="#ef4444" />
        <line x1="18" y1="64" x2="100" y2="64" stroke="#1e293b" strokeWidth="1" />
      </svg>
    ),
  },
  schedule: {
    emoji: "📅",
    label: "Schedule",
    labelVi: "Lịch trình",
    gradient: "from-rose-100 via-pink-50 to-fuchsia-100",
    ring: "ring-rose-300/60",
    svg: (
      <svg viewBox="0 0 120 80" className="w-full h-full">
        <rect x="20" y="14" width="80" height="58" rx="4" fill="#fff" stroke="#e11d48" strokeWidth="1.5" />
        <rect x="20" y="14" width="80" height="12" fill="#e11d48" />
        {[0, 1, 2, 3].map((r) =>
          [0, 1, 2, 3].map((c) => (
            <rect key={`${r}-${c}`} x={24 + c * 18} y={30 + r * 10} width="14" height="8" fill={r === 1 && c === 2 ? "#fcd34d" : "#f1f5f9"} stroke="#cbd5e1" />
          ))
        )}
      </svg>
    ),
  },
  pricelist: {
    emoji: "💲",
    label: "Price List",
    labelVi: "Bảng giá",
    gradient: "from-green-100 via-emerald-50 to-lime-100",
    ring: "ring-green-300/60",
    svg: (
      <svg viewBox="0 0 120 80" className="w-full h-full">
        <rect x="20" y="10" width="80" height="60" rx="4" fill="#fff" stroke="#16a34a" strokeWidth="1.5" />
        {["$29", "$49", "$79", "$149"].map((p, i) => (
          <g key={p}>
            <rect x="26" y={18 + i * 13} width="40" height="10" fill="#dcfce7" />
            <text x="30" y={26 + i * 13} fontSize="8" fill="#15803d" fontWeight="bold">{p}</text>
            <rect x="70" y={20 + i * 13} width="22" height="6" fill="#86efac" />
          </g>
        ))}
      </svg>
    ),
  },
  sentence: {
    emoji: "✍️",
    label: "Sentence Completion",
    labelVi: "Hoàn thành câu",
    gradient: "from-violet-100 via-purple-50 to-pink-100",
    ring: "ring-violet-300/60",
    svg: (
      <svg viewBox="0 0 120 80" className="w-full h-full">
        <rect x="14" y="18" width="92" height="50" rx="4" fill="#fff" stroke="#8b5cf6" strokeWidth="1.5" />
        <rect x="22" y="28" width="60" height="4" fill="#c4b5fd" />
        <rect x="22" y="38" width="76" height="4" fill="#c4b5fd" />
        <rect x="22" y="48" width="40" height="4" fill="#fbbf24" />
        <rect x="68" y="46" width="20" height="8" fill="none" stroke="#8b5cf6" strokeDasharray="2 2" />
      </svg>
    ),
  },
  reading: {
    emoji: "📖",
    label: "Reading Passage",
    labelVi: "Đoạn văn đọc hiểu",
    gradient: "from-teal-100 via-cyan-50 to-sky-100",
    ring: "ring-teal-300/60",
    svg: (
      <svg viewBox="0 0 120 80" className="w-full h-full">
        <path d="M10 20 Q60 10 110 20 L110 70 Q60 60 10 70 Z" fill="#fff" stroke="#0d9488" strokeWidth="1.5" />
        <line x1="60" y1="14" x2="60" y2="65" stroke="#0d9488" strokeWidth="1" />
        {[28, 36, 44, 52].map((y) => (
          <g key={y}>
            <rect x="18" y={y} width="36" height="2" fill="#94a3b8" />
            <rect x="66" y={y} width="36" height="2" fill="#94a3b8" />
          </g>
        ))}
      </svg>
    ),
  },
  factory: {
    emoji: "🏭",
    label: "Factory / Workplace",
    labelVi: "Nhà máy / Nơi làm việc",
    gradient: "from-orange-100 via-amber-50 to-yellow-100",
    ring: "ring-orange-300/60",
    svg: (
      <svg viewBox="0 0 120 80" className="w-full h-full">
        <rect x="10" y="40" width="30" height="30" fill="#64748b" />
        <rect x="40" y="30" width="30" height="40" fill="#475569" />
        <rect x="70" y="50" width="40" height="20" fill="#334155" />
        <rect x="20" y="20" width="6" height="20" fill="#94a3b8" />
        <circle cx="23" cy="18" r="4" fill="#cbd5e1" opacity="0.7" />
        <rect x="48" y="38" width="6" height="6" fill="#fde047" />
        <rect x="58" y="38" width="6" height="6" fill="#fde047" />
        <rect x="80" y="58" width="6" height="6" fill="#fde047" />
      </svg>
    ),
  },
  phone: {
    emoji: "📞",
    label: "Phone Call",
    labelVi: "Cuộc điện thoại",
    gradient: "from-cyan-100 via-sky-50 to-blue-100",
    ring: "ring-cyan-300/60",
    svg: (
      <svg viewBox="0 0 120 80" className="w-full h-full">
        <rect x="40" y="14" width="40" height="58" rx="6" fill="#1e293b" />
        <rect x="44" y="20" width="32" height="42" rx="2" fill="#0ea5e9" />
        <circle cx="60" cy="68" r="2" fill="#cbd5e1" />
        <rect x="50" y="30" width="20" height="3" fill="#fff" opacity="0.8" />
        <rect x="50" y="38" width="14" height="3" fill="#fff" opacity="0.6" />
      </svg>
    ),
  },
  default: {
    emoji: "💼",
    label: "Business Scene",
    labelVi: "Cảnh kinh doanh",
    gradient: "from-slate-100 via-blue-50 to-indigo-100",
    ring: "ring-blue-300/60",
    svg: (
      <svg viewBox="0 0 120 80" className="w-full h-full">
        <rect x="20" y="30" width="80" height="40" rx="4" fill="#3b82f6" />
        <rect x="50" y="20" width="20" height="14" rx="2" fill="#1e3a8a" />
        <rect x="38" y="40" width="44" height="4" fill="#dbeafe" />
        <rect x="38" y="50" width="30" height="4" fill="#dbeafe" />
      </svg>
    ),
  },
};

function pickScene(text: string): Scene {
  const t = text.toLowerCase();
  if (/photocop|copier|copy/.test(t)) return SCENES.photocopier;
  if (/handshak|shaking hand|greet/.test(t)) return SCENES.handshake;
  if (/parking|car|vehicle/.test(t)) return SCENES.parking;
  if (/email|mail|inbox/.test(t)) return SCENES.email;
  if (/schedule|lịch|calendar|room.*\d|9am|10am/.test(t)) return SCENES.schedule;
  if (/price|\$\d|cost|bảng giá/.test(t)) return SCENES.pricelist;
  if (/chart|graphic|graph|biểu đồ|đồ họa/.test(t)) return SCENES.chart;
  if (/meeting|conference|cuộc họp|hội nghị/.test(t)) return SCENES.meeting;
  if (/sentence completion|hoàn thành câu|part 5|part 6/.test(t)) return SCENES.sentence;
  if (/passage|reading|đoạn văn|part 7/.test(t)) return SCENES.reading;
  if (/factory|warehouse|nhà máy|workplace/.test(t)) return SCENES.factory;
  if (/phone|call|điện thoại/.test(t)) return SCENES.phone;
  if (/photo|picture|hình|ảnh/.test(t)) return SCENES.default;
  return SCENES.default;
}

const ToeicPracticeIllustration = ({ context, contextVi, index }: Props) => {
  const scene = pickScene(`${context} ${contextVi ?? ""}`);
  return (
    <div
      className={`relative w-full sm:w-44 h-28 sm:h-32 shrink-0 rounded-xl overflow-hidden bg-gradient-to-br ${scene.gradient} ring-1 ${scene.ring} shadow-sm flex items-center justify-center`}
      aria-label={scene.label}
      role="img"
    >
      <div className="absolute inset-0 opacity-90">{scene.svg}</div>
      <div className="absolute top-1.5 left-1.5 flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/80 dark:bg-slate-900/70 backdrop-blur text-[10px] font-semibold text-slate-700 dark:text-slate-200">
        <span>{scene.emoji}</span>
        <span>#{index + 1}</span>
      </div>
      <div className="absolute bottom-1.5 right-1.5 px-2 py-0.5 rounded-full bg-slate-900/70 text-white text-[10px] font-medium tracking-wide">
        {scene.label}
      </div>
    </div>
  );
};

export default ToeicPracticeIllustration;
