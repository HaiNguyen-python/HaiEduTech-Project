interface VennProps {
  type: "INNER" | "LEFT" | "RIGHT" | "FULL";
  caption: string;
}

const Venn = ({ type, caption }: VennProps) => {
  const blue = "hsl(217 91% 60%)";
  const green = "hsl(160 84% 39%)";

  return (
    <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-card border border-border">
      <svg viewBox="0 0 120 80" className="w-full max-w-[160px]" role="img" aria-label={`${type} JOIN diagram`}>
        {/* Left circle (A) */}
        <circle
          cx="45" cy="40" r="28"
          fill={type === "LEFT" || type === "FULL" || type === "INNER" ? blue : "transparent"}
          fillOpacity={type === "INNER" ? "0.15" : "0.55"}
          stroke={blue} strokeWidth="1.5"
        />
        {/* Right circle (B) */}
        <circle
          cx="75" cy="40" r="28"
          fill={type === "RIGHT" || type === "FULL" || type === "INNER" ? green : "transparent"}
          fillOpacity={type === "INNER" ? "0.15" : "0.55"}
          stroke={green} strokeWidth="1.5"
        />
        {/* Intersection always filled darker for INNER */}
        {type === "INNER" && (
          <clipPath id="clipInner">
            <circle cx="45" cy="40" r="28" />
          </clipPath>
        )}
        {type === "INNER" && (
          <circle cx="75" cy="40" r="28" fill="hsl(217 91% 50%)" fillOpacity="0.7" clipPath="url(#clipInner)" />
        )}

        <text x="32" y="44" textAnchor="middle" fontSize="9" fontWeight="700" fill="white">A</text>
        <text x="88" y="44" textAnchor="middle" fontSize="9" fontWeight="700" fill="white">B</text>
      </svg>
      <div className="text-center">
        <div className="text-xs font-bold text-foreground">{type} JOIN</div>
        <div className="text-[10px] text-muted-foreground">{caption}</div>
      </div>
    </div>
  );
};

const JoinVennDiagram = () => (
  <figure className="not-prose my-6 rounded-xl border border-border bg-muted/30 p-4">
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <Venn type="INNER" caption="Chỉ phần chung" />
      <Venn type="LEFT" caption="Toàn bộ A + chung" />
      <Venn type="RIGHT" caption="Toàn bộ B + chung" />
      <Venn type="FULL" caption="Cả A và B" />
    </div>
    <figcaption className="text-xs text-center text-muted-foreground mt-3">
      Vòng A = bảng bên trái, vòng B = bảng bên phải. Phần tô màu = dòng được trả về.
    </figcaption>
  </figure>
);

export default JoinVennDiagram;
