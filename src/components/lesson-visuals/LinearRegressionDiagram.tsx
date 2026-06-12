/**
 * @file LinearRegressionDiagram.tsx
 * @description High-contrast Linear Regression visual with large fonts,
 *              clear gradient line, vivid scatter dots, and legend chips.
 */

const LinearRegressionDiagram = () => {
  const points = [
    [70, 175], [100, 158], [130, 144], [160, 132], [190, 118],
    [220, 102], [250, 88], [280, 76], [310, 62], [340, 50],
    [110, 134], [165, 148], [225, 78], [245, 100], [185, 138],
  ];

  return (
    <figure className="not-prose my-8 rounded-2xl border-2 border-border bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/20 p-5 shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <h4 className="text-base font-extrabold text-foreground flex items-center gap-2">
          📈 Hồi quy tuyến tính (Linear Regression)
        </h4>
        <div className="flex gap-2 text-xs">
          <span className="px-2 py-1 rounded-full bg-emerald-500 text-white font-bold flex items-center gap-1">● Dữ liệu thực</span>
          <span className="px-2 py-1 rounded-full bg-orange-500 text-white font-bold flex items-center gap-1">- Mô hình dự đoán</span>
        </div>
      </div>

      <svg viewBox="0 0 420 260" className="w-full h-auto bg-card rounded-xl p-2" role="img" aria-label="Linear Regression scatter plot">
        {/* Grid */}
        {[60, 100, 140, 180].map((y) => (
          <line key={y} x1="50" y1={y} x2="400" y2={y} stroke="hsl(var(--border))" strokeDasharray="3 4" strokeWidth="1" />
        ))}
        {/* Axes */}
        <line x1="50" y1="220" x2="400" y2="220" stroke="hsl(var(--foreground))" strokeWidth="2" />
        <line x1="50" y1="30" x2="50" y2="220" stroke="hsl(var(--foreground))" strokeWidth="2" />

        {/* Best-fit line: gradient orange→red */}
        <defs>
          <linearGradient id="lr-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#fb923c" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
        </defs>
        <line
          x1="60" y1={225 - 0.55 * 60}
          x2="380" y2={225 - 0.55 * 380}
          stroke="url(#lr-line)" strokeWidth="4" strokeLinecap="round"
        />

        {/* Scatter dots */}
        {points.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="6" fill="#10b981" stroke="white" strokeWidth="2" />
        ))}

        {/* Equation pill */}
        <rect x="265" y="36" width="135" height="34" rx="10" fill="#fb923c" />
        <text x="332" y="58" textAnchor="middle" fontSize="16" fontWeight="900" fill="white" fontFamily="monospace">
          y = wx + b
        </text>

        {/* Axis labels */}
        <text x="225" y="248" textAnchor="middle" fontSize="14" fill="hsl(var(--foreground))" fontWeight="700">
          Diện tích (m²) →
        </text>
        <text x="22" y="125" textAnchor="middle" fontSize="14" fill="hsl(var(--foreground))" fontWeight="700" transform="rotate(-90 22 125)">
          Giá (triệu) →
        </text>
      </svg>

      <figcaption className="text-sm text-center text-foreground mt-3 font-medium">
        Mỗi 🟢 chấm xanh = 1 căn nhà thực tế · 🟧 Đường cam = mô hình dự đoán tốt nhất
      </figcaption>
    </figure>
  );
};

export default LinearRegressionDiagram;
