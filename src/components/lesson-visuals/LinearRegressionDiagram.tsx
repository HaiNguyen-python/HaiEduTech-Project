const LinearRegressionDiagram = () => {
  // Synthetic scatter points
  const points = [
    [60, 180], [85, 165], [110, 150], [135, 138], [160, 125],
    [185, 110], [210, 95], [235, 85], [260, 72], [285, 60],
    [95, 140], [140, 155], [200, 80], [220, 105], [165, 145],
  ];

  return (
    <figure className="not-prose my-6 rounded-xl border border-border bg-card p-4 shadow-sm">
      <svg viewBox="0 0 360 240" className="w-full h-auto" role="img" aria-label="Linear Regression scatter plot">
        {/* Axes */}
        <line x1="40" y1="210" x2="340" y2="210" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <line x1="40" y1="20" x2="40" y2="210" stroke="hsl(var(--foreground))" strokeWidth="1.5" />

        {/* Grid */}
        {[50, 90, 130, 170].map((y) => (
          <line key={y} x1="40" y1={y} x2="340" y2={y} stroke="hsl(var(--border))" strokeDasharray="2 3" strokeWidth="0.8" />
        ))}

        {/* Best fit line: roughly y = -0.55x + 215 */}
        <line
          x1="50" y1={215 - 0.55 * 50}
          x2="320" y2={215 - 0.55 * 320}
          stroke="hsl(217 91% 60%)" strokeWidth="2.5"
        />

        {/* Scatter dots */}
        {points.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="4.5" fill="hsl(160 84% 39%)" stroke="white" strokeWidth="1.5" />
        ))}

        {/* Equation label */}
        <rect x="220" y="28" width="115" height="26" rx="6" fill="hsl(217 91% 60% / 0.12)" stroke="hsl(217 91% 60%)" strokeWidth="1" />
        <text x="277" y="46" textAnchor="middle" fontSize="13" fontWeight="700" fill="hsl(217 91% 50%)" fontFamily="monospace">
          y = wx + b
        </text>

        {/* Axis labels */}
        <text x="190" y="232" textAnchor="middle" fontSize="12" fill="hsl(var(--muted-foreground))" fontWeight="600">
          Diện tích (m²)
        </text>
        <text x="14" y="115" textAnchor="middle" fontSize="12" fill="hsl(var(--muted-foreground))" fontWeight="600" transform="rotate(-90 14 115)">
          Giá (triệu)
        </text>
      </svg>
      <figcaption className="text-xs text-center text-muted-foreground mt-2">
        Mỗi chấm xanh = 1 căn nhà thực tế. Đường xanh dương = mô hình dự đoán tốt nhất (best-fit line).
      </figcaption>
    </figure>
  );
};

export default LinearRegressionDiagram;
