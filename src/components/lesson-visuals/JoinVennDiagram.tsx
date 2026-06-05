/**
 * @file JoinVennDiagram.tsx
 * @description High-contrast SQL JOIN Venn diagrams. Replaces the small blue
 *              SVG version with bold colors + larger labels for instant readability.
 */

interface VennProps {
  type: "INNER" | "LEFT" | "RIGHT" | "FULL";
  caption: string;
}

const COLOR_MAP: Record<VennProps["type"], { from: string; to: string; emoji: string }> = {
  INNER: { from: "from-violet-500", to: "to-fuchsia-500", emoji: "🎯" },
  LEFT: { from: "from-orange-500", to: "to-red-500", emoji: "👈" },
  RIGHT: { from: "from-emerald-500", to: "to-teal-500", emoji: "👉" },
  FULL: { from: "from-blue-500", to: "to-purple-500", emoji: "🌐" },
};

const Venn = ({ type, caption }: VennProps) => {
  const left = "#fb923c"; // orange-400
  const right = "#10b981"; // emerald-500
  const showLeft = type === "LEFT" || type === "FULL" || type === "INNER";
  const showRight = type === "RIGHT" || type === "FULL" || type === "INNER";
  const c = COLOR_MAP[type];

  return (
    <div className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-card border-2 border-border shadow-md">
      <svg viewBox="0 0 220 140" className="w-full max-w-[220px]" role="img" aria-label={`${type} JOIN diagram`}>
        <defs>
          <linearGradient id={`lg-${type}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={left} stopOpacity="0.5" />
            <stop offset="100%" stopColor={right} stopOpacity="0.5" />
          </linearGradient>
        </defs>

        {/* Left circle (A) */}
        <circle
          cx="85" cy="70" r="52"
          fill={showLeft ? left : "transparent"}
          fillOpacity={type === "INNER" ? "0.18" : "0.55"}
          stroke={left} strokeWidth="3"
        />
        {/* Right circle (B) */}
        <circle
          cx="135" cy="70" r="52"
          fill={showRight ? right : "transparent"}
          fillOpacity={type === "INNER" ? "0.18" : "0.55"}
          stroke={right} strokeWidth="3"
        />
        {/* Intersection highlight for INNER */}
        {type === "INNER" && (
          <>
            <clipPath id={`clip-${type}`}>
              <circle cx="85" cy="70" r="52" />
            </clipPath>
            <circle cx="135" cy="70" r="52" fill={`url(#lg-${type})`} fillOpacity="0.95" clipPath={`url(#clip-${type})`} />
          </>
        )}

        <text x="55" y="76" textAnchor="middle" fontSize="20" fontWeight="900" fill="#fff" stroke="#000" strokeWidth="0.5">A</text>
        <text x="165" y="76" textAnchor="middle" fontSize="20" fontWeight="900" fill="#fff" stroke="#000" strokeWidth="0.5">B</text>
      </svg>
      <div className="text-center w-full">
        <div className={`inline-block px-3 py-1 rounded-full text-sm font-extrabold text-white bg-gradient-to-r ${c.from} ${c.to} shadow-sm`}>
          {c.emoji} {type} JOIN
        </div>
        <div className="text-sm font-medium text-foreground mt-2 leading-snug">{caption}</div>
      </div>
    </div>
  );
};

const JoinVennDiagram = () => (
  <figure className="not-prose my-8 rounded-2xl border-2 border-border bg-gradient-to-br from-muted/30 to-background p-5 shadow-sm">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Venn type="INNER" caption="Chỉ giữ phần CHUNG của 2 bảng" />
      <Venn type="LEFT" caption="Giữ TOÀN BỘ bảng A + phần chung" />
      <Venn type="RIGHT" caption="Giữ TOÀN BỘ bảng B + phần chung" />
      <Venn type="FULL" caption="Giữ TẤT CẢ dòng của cả A và B" />
    </div>
    <figcaption className="text-sm text-center text-muted-foreground mt-4 font-medium">
      🍊 Vòng cam = bảng bên trái · 🟢 Vòng xanh lá = bảng bên phải · Phần tô đậm = dòng được trả về
    </figcaption>
  </figure>
);

export default JoinVennDiagram;
