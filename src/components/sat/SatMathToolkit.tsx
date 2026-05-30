/**
 * @file SatMathToolkit.tsx
 * @description Floating drawer for SAT Math lessons. Contains:
 *  - Embedded Desmos graphing calculator (iframe)
 *  - SAT reference formula sheet (the ones SAT provides + memorize-only)
 * Designed to be reusable on every Math lesson without cluttering the page.
 */
import { useState } from "react";
import { Calculator, X, ChevronDown, ChevronUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const FORMULAS = [
  {
    title: { vi: "Đã cho sẵn trên đề (SAT Reference Sheet)", en: "Provided on the SAT (Reference Sheet)" },
    items: [
      "Area of circle: A = πr²",
      "Circumference: C = 2πr",
      "Area of rectangle: A = lw",
      "Area of triangle: A = ½bh",
      "Pythagorean: a² + b² = c²",
      "Special right triangles: 30-60-90 (x, x√3, 2x) · 45-45-90 (x, x, x√2)",
      "Volume rectangular solid: V = lwh",
      "Volume cylinder: V = πr²h",
      "Volume sphere: V = (4/3)πr³",
      "Volume cone: V = (1/3)πr²h",
      "Volume pyramid: V = (1/3)lwh",
      "Number of degrees in a circle: 360 · Number of radians: 2π",
      "Sum of angles in a triangle: 180°",
    ],
  },
  {
    title: { vi: "Phải HỌC THUỘC (không có trên đề)", en: "Must MEMORISE (NOT on the sheet)" },
    items: [
      "Slope: m = (y₂ − y₁) / (x₂ − x₁)",
      "Slope-intercept: y = mx + b",
      "Point-slope: y − y₁ = m(x − x₁)",
      "Standard form line: Ax + By = C",
      "Distance: d = √((x₂−x₁)² + (y₂−y₁)²)",
      "Midpoint: ((x₁+x₂)/2, (y₁+y₂)/2)",
      "Quadratic formula: x = (−b ± √(b²−4ac)) / 2a",
      "Vertex form: y = a(x − h)² + k → vertex (h, k)",
      "Discriminant: Δ = b² − 4ac (>0 two real, =0 one, <0 none)",
      "Exponent rules: aᵐ·aⁿ = aᵐ⁺ⁿ ; (aᵐ)ⁿ = aᵐⁿ ; a⁻ⁿ = 1/aⁿ ; a^(1/n) = ⁿ√a",
      "Percent change: (new − old) / old × 100%",
      "Probability: favorable / total",
      "Mean = sum / count · Median = middle value · Mode = most frequent",
      "SOH-CAH-TOA: sin=opp/hyp · cos=adj/hyp · tan=opp/adj",
      "Arc length: s = rθ (θ in radians)",
    ],
  },
];

const SatMathToolkit = () => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"desmos" | "formulas">("formulas");
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <>
      {/* Floating launcher */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-24 right-4 z-40 inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-sky-500 to-emerald-500 text-white font-semibold text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
        aria-label={t("Mở công cụ Math", "Open Math toolkit")}
      >
        <Calculator className="w-4 h-4" />
        {t("Math Toolkit", "Math Toolkit")}
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-6"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full md:max-w-3xl bg-background rounded-t-3xl md:rounded-3xl border border-border shadow-2xl max-h-[88vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-primary" />
                <h2 className="font-display font-bold text-foreground">
                  {t("SAT Math Toolkit", "SAT Math Toolkit")}
                </h2>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex border-b border-border">
              {(["formulas", "desmos"] as const).map((k) => (
                <button
                  key={k}
                  onClick={() => setTab(k)}
                  className={`flex-1 py-3 text-sm font-semibold transition-colors ${
                    tab === k
                      ? "text-primary border-b-2 border-primary bg-primary/5"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {k === "formulas"
                    ? t("📐 Công thức", "📐 Formulas")
                    : t("🧮 Desmos Calculator", "🧮 Desmos Calculator")}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto">
              {tab === "formulas" && (
                <div className="p-4 space-y-3">
                  {FORMULAS.map((sec, i) => (
                    <div key={i} className="rounded-xl border border-border bg-card">
                      <button
                        onClick={() => setExpanded(expanded === i ? null : i)}
                        className="w-full flex items-center justify-between p-3 text-left"
                      >
                        <span className="font-semibold text-foreground text-sm md:text-base">
                          {t(sec.title.vi, sec.title.en)}
                        </span>
                        {expanded === i ? (
                          <ChevronUp className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        )}
                      </button>
                      {expanded === i && (
                        <ul className="px-4 pb-4 space-y-1.5 text-sm font-mono text-foreground/90">
                          {sec.items.map((it, j) => (
                            <li key={j} className="border-l-2 border-primary/40 pl-3 py-0.5">
                              {it}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {tab === "desmos" && (
                <div className="h-[60vh] md:h-[600px]">
                  <iframe
                    title="Desmos Calculator"
                    src="https://www.desmos.com/calculator?embed"
                    className="w-full h-full border-0"
                    loading="lazy"
                    allow="clipboard-write"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SatMathToolkit;
