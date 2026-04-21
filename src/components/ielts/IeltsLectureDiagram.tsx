/**
 * @file IeltsLectureDiagram.tsx
 * @description Inline SVG diagrams for IELTS Writing & Speaking lectures.
 * Theme-aware via semantic HSL design tokens. Returns null when no diagram exists.
 */
import { useLanguage } from "@/contexts/LanguageContext";

interface Props {
  lectureId: string;
}

const Wrapper = ({ titleVi, title, children }: { titleVi: string; title: string; children: React.ReactNode }) => {
  const { t } = useLanguage();
  return (
    <figure className="rounded-xl border border-border bg-muted/30 p-4 md:p-5 my-5">
      <figcaption className="text-sm font-semibold text-primary mb-3 flex items-center gap-2">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        {t("Sơ đồ minh họa: ", "Visual diagram: ")}{t(titleVi, title)}
      </figcaption>
      <div className="overflow-x-auto">{children}</div>
    </figure>
  );
};

// Palette tuned for both light & dark themes (mid-tones)
const C = {
  card: "hsl(217 33% 17%)",
  cardLight: "hsl(217 33% 22%)",
  text: "#E2E8F0",
  textMute: "#94A3B8",
  blue: "#3B82F6",
  blueLight: "#93C5FD",
  emerald: "#10B981",
  emeraldLight: "#6EE7B7",
  amber: "#F59E0B",
  amberLight: "#FCD34D",
  rose: "#F43F5E",
  roseLight: "#FDA4AF",
  purple: "#A855F7",
  purpleLight: "#D8B4FE",
  border: "#334155",
};

const IeltsLectureDiagram = ({ lectureId }: Props) => {
  // ============== WRITING TASK 2 — OPINION ==============
  if (lectureId === "writing-task2-opinion") {
    return (
      <Wrapper titleVi="Cấu trúc 4-đoạn cho Opinion Essay" title="4-Paragraph Opinion Essay Structure">
        <svg viewBox="0 0 700 320" className="w-full max-w-[700px] mx-auto" role="img" aria-label="Opinion essay structure">
          <rect x="10" y="10" width="680" height="300" rx="14" fill={C.card} stroke={C.border} />
          {/* Intro */}
          <g transform="translate(30,40)">
            <rect width="160" height="80" rx="10" fill={C.blue} fillOpacity="0.18" stroke={C.blue} />
            <text x="80" y="22" textAnchor="middle" fill={C.blueLight} fontSize="12" fontWeight="700">¶1 INTRODUCTION</text>
            <text x="80" y="42" textAnchor="middle" fill={C.text} fontSize="11">Hook → Paraphrase</text>
            <text x="80" y="58" textAnchor="middle" fill={C.text} fontSize="11">→ Thesis (clear stance)</text>
            <text x="80" y="73" textAnchor="middle" fill={C.amberLight} fontSize="10">~50 words</text>
          </g>
          {/* Body 1 */}
          <g transform="translate(210,40)">
            <rect width="160" height="80" rx="10" fill={C.emerald} fillOpacity="0.18" stroke={C.emerald} />
            <text x="80" y="22" textAnchor="middle" fill={C.emeraldLight} fontSize="12" fontWeight="700">¶2 MAIN REASON 1</text>
            <text x="80" y="42" textAnchor="middle" fill={C.text} fontSize="11">Topic sentence →</text>
            <text x="80" y="58" textAnchor="middle" fill={C.text} fontSize="11">Explain → Example</text>
            <text x="80" y="73" textAnchor="middle" fill={C.amberLight} fontSize="10">~95 words</text>
          </g>
          {/* Body 2 */}
          <g transform="translate(390,40)">
            <rect width="160" height="80" rx="10" fill={C.emerald} fillOpacity="0.18" stroke={C.emerald} />
            <text x="80" y="22" textAnchor="middle" fill={C.emeraldLight} fontSize="12" fontWeight="700">¶3 MAIN REASON 2</text>
            <text x="80" y="42" textAnchor="middle" fill={C.text} fontSize="11">Topic sentence →</text>
            <text x="80" y="58" textAnchor="middle" fill={C.text} fontSize="11">Explain → Example</text>
            <text x="80" y="73" textAnchor="middle" fill={C.amberLight} fontSize="10">~95 words</text>
          </g>
          {/* Conclusion */}
          <g transform="translate(540,140)">
            <rect width="130" height="80" rx="10" fill={C.amber} fillOpacity="0.18" stroke={C.amber} />
            <text x="65" y="22" textAnchor="middle" fill={C.amberLight} fontSize="12" fontWeight="700">¶4 CONCLUSION</text>
            <text x="65" y="42" textAnchor="middle" fill={C.text} fontSize="11">Restate thesis →</text>
            <text x="65" y="58" textAnchor="middle" fill={C.text} fontSize="11">Summary → Final</text>
            <text x="65" y="73" textAnchor="middle" fill={C.amberLight} fontSize="10">~40 words</text>
          </g>
          {/* Arrows */}
          <path d="M 190 80 L 210 80" stroke={C.blueLight} strokeWidth="2" markerEnd="url(#arrW)" />
          <path d="M 370 80 L 390 80" stroke={C.emeraldLight} strokeWidth="2" markerEnd="url(#arrW)" />
          <path d="M 550 95 Q 605 110 605 140" stroke={C.amberLight} strokeWidth="2" fill="none" markerEnd="url(#arrW)" />
          <defs>
            <marker id="arrW" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={C.amberLight} />
            </marker>
          </defs>
          {/* Band targets */}
          <g transform="translate(30,170)">
            <rect width="490" height="120" rx="10" fill={C.cardLight} stroke={C.border} />
            <text x="245" y="22" textAnchor="middle" fill={C.amberLight} fontSize="13" fontWeight="700">📊 BAND TARGETS</text>
            <g transform="translate(20,40)">
              <rect width="100" height="60" rx="8" fill={C.rose} fillOpacity="0.15" stroke={C.rose} />
              <text x="50" y="22" textAnchor="middle" fill={C.roseLight} fontSize="11" fontWeight="700">Band 5.0</text>
              <text x="50" y="40" textAnchor="middle" fill={C.text} fontSize="10">Basic structure,</text>
              <text x="50" y="52" textAnchor="middle" fill={C.text} fontSize="10">simple opinions</text>
            </g>
            <g transform="translate(135,40)">
              <rect width="100" height="60" rx="8" fill={C.amber} fillOpacity="0.15" stroke={C.amber} />
              <text x="50" y="22" textAnchor="middle" fill={C.amberLight} fontSize="11" fontWeight="700">Band 6.5</text>
              <text x="50" y="40" textAnchor="middle" fill={C.text} fontSize="10">Clear thesis +</text>
              <text x="50" y="52" textAnchor="middle" fill={C.text} fontSize="10">2 reasons</text>
            </g>
            <g transform="translate(250,40)">
              <rect width="100" height="60" rx="8" fill={C.emerald} fillOpacity="0.15" stroke={C.emerald} />
              <text x="50" y="22" textAnchor="middle" fill={C.emeraldLight} fontSize="11" fontWeight="700">Band 7.5</text>
              <text x="50" y="40" textAnchor="middle" fill={C.text} fontSize="10">Cohesive devices,</text>
              <text x="50" y="52" textAnchor="middle" fill={C.text} fontSize="10">specific examples</text>
            </g>
            <g transform="translate(365,40)">
              <rect width="100" height="60" rx="8" fill={C.purple} fillOpacity="0.18" stroke={C.purple} />
              <text x="50" y="22" textAnchor="middle" fill={C.purpleLight} fontSize="11" fontWeight="700">Band 8.0+</text>
              <text x="50" y="40" textAnchor="middle" fill={C.text} fontSize="10">Nuanced view,</text>
              <text x="50" y="52" textAnchor="middle" fill={C.text} fontSize="10">rare lexis, flow</text>
            </g>
          </g>
        </svg>
      </Wrapper>
    );
  }

  // ============== WRITING TASK 2 — AGREE/DISAGREE ==============
  if (lectureId === "writing-task2-agree-disagree") {
    return (
      <Wrapper titleVi="Cây quyết định Agree / Disagree / Partially" title="Agree / Disagree / Partially Decision Tree">
        <svg viewBox="0 0 700 340" className="w-full max-w-[700px] mx-auto" role="img" aria-label="Agree disagree decision tree">
          <rect x="10" y="10" width="680" height="320" rx="14" fill={C.card} stroke={C.border} />
          {/* Question */}
          <g transform="translate(250,30)">
            <rect width="200" height="50" rx="25" fill={C.blue} fillOpacity="0.2" stroke={C.blue} />
            <text x="100" y="22" textAnchor="middle" fill={C.blueLight} fontSize="12" fontWeight="700">"To what extent do</text>
            <text x="100" y="38" textAnchor="middle" fill={C.blueLight} fontSize="12" fontWeight="700">you agree?"</text>
          </g>
          {/* 3 branches */}
          <path d="M 350 80 L 130 130" stroke={C.emeraldLight} strokeWidth="2" />
          <path d="M 350 80 L 350 130" stroke={C.amberLight} strokeWidth="2" />
          <path d="M 350 80 L 570 130" stroke={C.purpleLight} strokeWidth="2" />
          {/* Branch 1: STRONGLY AGREE */}
          <g transform="translate(40,130)">
            <rect width="180" height="170" rx="10" fill={C.emerald} fillOpacity="0.15" stroke={C.emerald} />
            <text x="90" y="22" textAnchor="middle" fill={C.emeraldLight} fontSize="12" fontWeight="700">✅ STRONGLY AGREE</text>
            <line x1="15" y1="32" x2="165" y2="32" stroke={C.border} />
            <text x="15" y="50" fill={C.text} fontSize="11" fontWeight="700">Body 1:</text>
            <text x="15" y="65" fill={C.text} fontSize="10.5">Reason A (strongest)</text>
            <text x="15" y="85" fill={C.text} fontSize="11" fontWeight="700">Body 2:</text>
            <text x="15" y="100" fill={C.text} fontSize="10.5">Reason B (support)</text>
            <text x="15" y="125" fill={C.amberLight} fontSize="10" fontStyle="italic">Use: "I completely</text>
            <text x="15" y="138" fill={C.amberLight} fontSize="10" fontStyle="italic">agree because..."</text>
            <text x="15" y="158" fill={C.emeraldLight} fontSize="10">Risk: low if reasons solid</text>
          </g>
          {/* Branch 2: PARTIALLY */}
          <g transform="translate(260,130)">
            <rect width="180" height="170" rx="10" fill={C.amber} fillOpacity="0.15" stroke={C.amber} />
            <text x="90" y="22" textAnchor="middle" fill={C.amberLight} fontSize="12" fontWeight="700">⚖️ PARTIALLY AGREE</text>
            <line x1="15" y1="32" x2="165" y2="32" stroke={C.border} />
            <text x="15" y="50" fill={C.text} fontSize="11" fontWeight="700">Body 1:</text>
            <text x="15" y="65" fill={C.text} fontSize="10.5">What you agree with</text>
            <text x="15" y="85" fill={C.text} fontSize="11" fontWeight="700">Body 2:</text>
            <text x="15" y="100" fill={C.text} fontSize="10.5">What you disagree with</text>
            <text x="15" y="125" fill={C.amberLight} fontSize="10" fontStyle="italic">Use: "While... is true,</text>
            <text x="15" y="138" fill={C.amberLight} fontSize="10" fontStyle="italic">I disagree that..."</text>
            <text x="15" y="158" fill={C.amberLight} fontSize="10">Best for nuanced topics</text>
          </g>
          {/* Branch 3: STRONGLY DISAGREE */}
          <g transform="translate(480,130)">
            <rect width="180" height="170" rx="10" fill={C.purple} fillOpacity="0.15" stroke={C.purple} />
            <text x="90" y="22" textAnchor="middle" fill={C.purpleLight} fontSize="12" fontWeight="700">❌ STRONGLY DISAGREE</text>
            <line x1="15" y1="32" x2="165" y2="32" stroke={C.border} />
            <text x="15" y="50" fill={C.text} fontSize="11" fontWeight="700">Body 1:</text>
            <text x="15" y="65" fill={C.text} fontSize="10.5">Refute the statement</text>
            <text x="15" y="85" fill={C.text} fontSize="11" fontWeight="700">Body 2:</text>
            <text x="15" y="100" fill={C.text} fontSize="10.5">Counter-evidence</text>
            <text x="15" y="125" fill={C.amberLight} fontSize="10" fontStyle="italic">Use: "I firmly disagree</text>
            <text x="15" y="138" fill={C.amberLight} fontSize="10" fontStyle="italic">with the notion that..."</text>
            <text x="15" y="158" fill={C.purpleLight} fontSize="10">Pick if you have evidence</text>
          </g>
        </svg>
      </Wrapper>
    );
  }

  // ============== WRITING TASK 1 — TRENDS ==============
  if (lectureId === "writing-task1-trends") {
    return (
      <Wrapper titleVi="Bánh xe ngôn ngữ mô tả xu hướng" title="Trend Vocabulary Wheel">
        <svg viewBox="0 0 700 320" className="w-full max-w-[700px] mx-auto" role="img" aria-label="Trend vocabulary wheel">
          <rect x="10" y="10" width="680" height="300" rx="14" fill={C.card} stroke={C.border} />
          {/* Up section */}
          <g transform="translate(40,30)">
            <rect width="200" height="260" rx="10" fill={C.emerald} fillOpacity="0.12" stroke={C.emerald} />
            <text x="100" y="24" textAnchor="middle" fill={C.emeraldLight} fontSize="13" fontWeight="700">📈 UPWARD ↑</text>
            <line x1="15" y1="34" x2="185" y2="34" stroke={C.border} />
            <text x="15" y="55" fill={C.amberLight} fontSize="11" fontWeight="700">Verbs:</text>
            <text x="15" y="72" fill={C.text} fontSize="11">rose / increased</text>
            <text x="15" y="88" fill={C.text} fontSize="11">climbed / surged</text>
            <text x="15" y="104" fill={C.text} fontSize="11">soared (dramatic)</text>
            <text x="15" y="120" fill={C.text} fontSize="11">rocketed (extreme)</text>
            <text x="15" y="142" fill={C.amberLight} fontSize="11" fontWeight="700">Nouns:</text>
            <text x="15" y="159" fill={C.text} fontSize="11">a rise / an increase</text>
            <text x="15" y="175" fill={C.text} fontSize="11">a surge / a leap</text>
            <text x="15" y="195" fill={C.amberLight} fontSize="11" fontWeight="700">Adverbs:</text>
            <text x="15" y="212" fill={C.text} fontSize="11">slightly / gradually</text>
            <text x="15" y="228" fill={C.text} fontSize="11">significantly / sharply</text>
            <text x="15" y="248" fill={C.emeraldLight} fontSize="10" fontStyle="italic">"Sales rose sharply by 20%"</text>
          </g>
          {/* Down section */}
          <g transform="translate(255,30)">
            <rect width="200" height="260" rx="10" fill={C.rose} fillOpacity="0.12" stroke={C.rose} />
            <text x="100" y="24" textAnchor="middle" fill={C.roseLight} fontSize="13" fontWeight="700">📉 DOWNWARD ↓</text>
            <line x1="15" y1="34" x2="185" y2="34" stroke={C.border} />
            <text x="15" y="55" fill={C.amberLight} fontSize="11" fontWeight="700">Verbs:</text>
            <text x="15" y="72" fill={C.text} fontSize="11">fell / declined</text>
            <text x="15" y="88" fill={C.text} fontSize="11">dropped / decreased</text>
            <text x="15" y="104" fill={C.text} fontSize="11">plummeted (dramatic)</text>
            <text x="15" y="120" fill={C.text} fontSize="11">crashed (extreme)</text>
            <text x="15" y="142" fill={C.amberLight} fontSize="11" fontWeight="700">Nouns:</text>
            <text x="15" y="159" fill={C.text} fontSize="11">a fall / a decline</text>
            <text x="15" y="175" fill={C.text} fontSize="11">a drop / a plunge</text>
            <text x="15" y="195" fill={C.amberLight} fontSize="11" fontWeight="700">Adverbs:</text>
            <text x="15" y="212" fill={C.text} fontSize="11">marginally / steadily</text>
            <text x="15" y="228" fill={C.text} fontSize="11">considerably / drastically</text>
            <text x="15" y="248" fill={C.roseLight} fontSize="10" fontStyle="italic">"Prices plummeted by 30%"</text>
          </g>
          {/* Stable & fluctuate */}
          <g transform="translate(470,30)">
            <rect width="200" height="125" rx="10" fill={C.amber} fillOpacity="0.12" stroke={C.amber} />
            <text x="100" y="24" textAnchor="middle" fill={C.amberLight} fontSize="13" fontWeight="700">→ STABLE</text>
            <text x="15" y="48" fill={C.text} fontSize="11">remained stable/constant</text>
            <text x="15" y="65" fill={C.text} fontSize="11">leveled off / plateaued</text>
            <text x="15" y="82" fill={C.text} fontSize="11">stayed unchanged</text>
            <text x="15" y="105" fill={C.amberLight} fontSize="10" fontStyle="italic">"Figures plateaued at 50%"</text>
          </g>
          <g transform="translate(470,165)">
            <rect width="200" height="125" rx="10" fill={C.purple} fillOpacity="0.12" stroke={C.purple} />
            <text x="100" y="24" textAnchor="middle" fill={C.purpleLight} fontSize="13" fontWeight="700">∿ FLUCTUATE</text>
            <text x="15" y="48" fill={C.text} fontSize="11">fluctuated / oscillated</text>
            <text x="15" y="65" fill={C.text} fontSize="11">peaked at... / hit a low</text>
            <text x="15" y="82" fill={C.text} fontSize="11">reached a peak/trough</text>
            <text x="15" y="105" fill={C.purpleLight} fontSize="10" fontStyle="italic">"Prices fluctuated wildly"</text>
          </g>
        </svg>
      </Wrapper>
    );
  }

  // ============== WRITING TASK 1 — PROCESS ==============
  if (lectureId === "writing-task1-describe-process") {
    return (
      <Wrapper titleVi="Sequencer cho mô tả quy trình" title="Process Description Sequencer">
        <svg viewBox="0 0 700 280" className="w-full max-w-[700px] mx-auto" role="img" aria-label="Process sequence">
          <rect x="10" y="10" width="680" height="260" rx="14" fill={C.card} stroke={C.border} />
          <text x="350" y="40" textAnchor="middle" fill={C.amberLight} fontSize="13" fontWeight="700">⚙️ Sequence connectors mapping</text>
          {/* 5 stages */}
          {[
            { x: 30, label: "First / Initially", color: C.blue, colorLight: C.blueLight, hint: "The process begins with..." },
            { x: 165, label: "After that / Next", color: C.emerald, colorLight: C.emeraldLight, hint: "...is then transferred..." },
            { x: 300, label: "Subsequently", color: C.amber, colorLight: C.amberLight, hint: "...undergoes..." },
            { x: 435, label: "Following this", color: C.purple, colorLight: C.purpleLight, hint: "...is processed by..." },
            { x: 570, label: "Finally", color: C.rose, colorLight: C.roseLight, hint: "...resulting in..." },
          ].map((s, i) => (
            <g key={i} transform={`translate(${s.x},70)`}>
              <circle cx="50" cy="35" r="30" fill={s.color} fillOpacity="0.2" stroke={s.color} strokeWidth="2" />
              <text x="50" y="40" textAnchor="middle" fill={s.colorLight} fontSize="14" fontWeight="700">{i + 1}</text>
              <text x="50" y="90" textAnchor="middle" fill={s.colorLight} fontSize="11" fontWeight="700">{s.label}</text>
              <text x="50" y="115" textAnchor="middle" fill={C.text} fontSize="9.5">{s.hint}</text>
            </g>
          ))}
          {/* Arrows */}
          {[0, 1, 2, 3].map((i) => (
            <path key={i} d={`M ${110 + i * 135} 105 L ${145 + i * 135} 105`} stroke={C.amberLight} strokeWidth="2" markerEnd="url(#arrPC)" />
          ))}
          <defs>
            <marker id="arrPC" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={C.amberLight} />
            </marker>
          </defs>
          {/* Tip box */}
          <g transform="translate(30,200)">
            <rect width="640" height="55" rx="10" fill={C.cardLight} stroke={C.amber} />
            <text x="20" y="22" fill={C.amberLight} fontSize="12" fontWeight="700">⭐ Mr. Hai's tip:</text>
            <text x="20" y="40" fill={C.text} fontSize="11">Always use PASSIVE VOICE: "is heated", "are mixed", "is then poured" — sounds objective &amp; technical (Band 7+).</text>
          </g>
        </svg>
      </Wrapper>
    );
  }

  // ============== WRITING TASK 1 — MAPS ==============
  if (lectureId === "writing-task1-maps-diagrams") {
    return (
      <Wrapper titleVi="Khung phân tích Maps: 4 loại thay đổi" title="Maps: 4 Types of Changes Framework">
        <svg viewBox="0 0 700 290" className="w-full max-w-[700px] mx-auto" role="img" aria-label="Map changes framework">
          <rect x="10" y="10" width="680" height="270" rx="14" fill={C.card} stroke={C.border} />
          <text x="350" y="36" textAnchor="middle" fill={C.amberLight} fontSize="13" fontWeight="700">🗺️ When comparing two maps, look for:</text>
          {/* 4 categories */}
          <g transform="translate(30,60)">
            <rect width="155" height="200" rx="10" fill={C.emerald} fillOpacity="0.15" stroke={C.emerald} />
            <text x="77" y="22" textAnchor="middle" fill={C.emeraldLight} fontSize="12" fontWeight="700">➕ ADDED</text>
            <text x="77" y="50" textAnchor="middle" fill={C.text} fontSize="22">🏢</text>
            <text x="15" y="85" fill={C.text} fontSize="10.5">"A new... was built"</text>
            <text x="15" y="103" fill={C.text} fontSize="10.5">"...was constructed"</text>
            <text x="15" y="121" fill={C.text} fontSize="10.5">"...was erected"</text>
            <text x="15" y="155" fill={C.amberLight} fontSize="10" fontStyle="italic">e.g. shops, parks,</text>
            <text x="15" y="170" fill={C.amberLight} fontSize="10" fontStyle="italic">housing estates</text>
          </g>
          <g transform="translate(200,60)">
            <rect width="155" height="200" rx="10" fill={C.rose} fillOpacity="0.15" stroke={C.rose} />
            <text x="77" y="22" textAnchor="middle" fill={C.roseLight} fontSize="12" fontWeight="700">➖ REMOVED</text>
            <text x="77" y="50" textAnchor="middle" fill={C.text} fontSize="22">🌳→🏚️</text>
            <text x="15" y="85" fill={C.text} fontSize="10.5">"...was demolished"</text>
            <text x="15" y="103" fill={C.text} fontSize="10.5">"...was knocked down"</text>
            <text x="15" y="121" fill={C.text} fontSize="10.5">"...disappeared"</text>
            <text x="15" y="155" fill={C.amberLight} fontSize="10" fontStyle="italic">e.g. forests cleared,</text>
            <text x="15" y="170" fill={C.amberLight} fontSize="10" fontStyle="italic">old buildings gone</text>
          </g>
          <g transform="translate(370,60)">
            <rect width="155" height="200" rx="10" fill={C.amber} fillOpacity="0.15" stroke={C.amber} />
            <text x="77" y="22" textAnchor="middle" fill={C.amberLight} fontSize="12" fontWeight="700">🔄 REPLACED</text>
            <text x="77" y="50" textAnchor="middle" fill={C.text} fontSize="22">🏠↔🏬</text>
            <text x="15" y="85" fill={C.text} fontSize="10.5">"...was replaced by..."</text>
            <text x="15" y="103" fill={C.text} fontSize="10.5">"...was converted into"</text>
            <text x="15" y="121" fill={C.text} fontSize="10.5">"...gave way to..."</text>
            <text x="15" y="155" fill={C.amberLight} fontSize="10" fontStyle="italic">e.g. farmland → mall,</text>
            <text x="15" y="170" fill={C.amberLight} fontSize="10" fontStyle="italic">house → office block</text>
          </g>
          <g transform="translate(540,60)">
            <rect width="130" height="200" rx="10" fill={C.purple} fillOpacity="0.15" stroke={C.purple} />
            <text x="65" y="22" textAnchor="middle" fill={C.purpleLight} fontSize="12" fontWeight="700">📐 EXPANDED</text>
            <text x="65" y="50" textAnchor="middle" fill={C.text} fontSize="22">⬜→⬛</text>
            <text x="15" y="85" fill={C.text} fontSize="10.5">"...was extended"</text>
            <text x="15" y="103" fill={C.text} fontSize="10.5">"...was enlarged"</text>
            <text x="15" y="121" fill={C.text} fontSize="10.5">"...was widened"</text>
            <text x="15" y="155" fill={C.amberLight} fontSize="10" fontStyle="italic">e.g. roads, port,</text>
            <text x="15" y="170" fill={C.amberLight} fontSize="10" fontStyle="italic">school grounds</text>
          </g>
        </svg>
      </Wrapper>
    );
  }

  // ============== SPEAKING PART 1 — EXPANDING ==============
  if (lectureId === "speaking-part1-expanding") {
    return (
      <Wrapper titleVi="Công thức mở rộng PEEL cho Part 1" title="PEEL Expansion Formula for Part 1">
        <svg viewBox="0 0 700 290" className="w-full max-w-[700px] mx-auto" role="img" aria-label="PEEL formula">
          <rect x="10" y="10" width="680" height="270" rx="14" fill={C.card} stroke={C.border} />
          <text x="350" y="36" textAnchor="middle" fill={C.blueLight} fontSize="13" fontWeight="700">🎤 Q: "Do you like reading?"</text>
          {/* PEEL letters */}
          {[
            { x: 30, letter: "P", word: "POINT", wordVi: "Trả lời thẳng", hint: '"Yes, I love reading!"', color: C.blue, colorLight: C.blueLight },
            { x: 195, letter: "E", word: "EXPLAIN", wordVi: "Giải thích", hint: '"It helps me unwind after a long day."', color: C.emerald, colorLight: C.emeraldLight },
            { x: 360, letter: "E", word: "EXAMPLE", wordVi: "Ví dụ cụ thể", hint: '"I just finished a Murakami novel..."', color: C.amber, colorLight: C.amberLight },
            { x: 525, letter: "L", word: "LINK", wordVi: "Liên kết / mở rộng", hint: '"...so I plan to read more this year."', color: C.purple, colorLight: C.purpleLight },
          ].map((p, i) => (
            <g key={i} transform={`translate(${p.x},60)`}>
              <rect width="145" height="195" rx="12" fill={p.color} fillOpacity="0.15" stroke={p.color} />
              <circle cx="72" cy="42" r="28" fill={p.color} fillOpacity="0.3" stroke={p.color} strokeWidth="2" />
              <text x="72" y="50" textAnchor="middle" fill={p.colorLight} fontSize="22" fontWeight="800">{p.letter}</text>
              <text x="72" y="92" textAnchor="middle" fill={p.colorLight} fontSize="12" fontWeight="700">{p.word}</text>
              <text x="72" y="108" textAnchor="middle" fill={C.textMute} fontSize="10">{p.wordVi}</text>
              <foreignObject x="10" y="120" width="125" height="65">
                <div style={{ color: C.text, fontSize: 10.5, fontStyle: "italic", lineHeight: 1.35, textAlign: "center" as const }}>{p.hint}</div>
              </foreignObject>
            </g>
          ))}
          {/* Connecting arrows */}
          {[0, 1, 2].map((i) => (
            <path key={i} d={`M ${175 + i * 165} 155 L ${195 + i * 165} 155`} stroke={C.amberLight} strokeWidth="2" markerEnd="url(#arrSP1)" />
          ))}
          <defs>
            <marker id="arrSP1" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={C.amberLight} />
            </marker>
          </defs>
        </svg>
      </Wrapper>
    );
  }

  // ============== SPEAKING PART 2 — CUE CARD ==============
  if (lectureId === "speaking-part2-technique") {
    return (
      <Wrapper titleVi="Cấu trúc 1-phút prep + 2-phút trả lời" title="1-min Prep + 2-min Delivery Structure">
        <svg viewBox="0 0 700 320" className="w-full max-w-[700px] mx-auto" role="img" aria-label="Speaking part 2 structure">
          <rect x="10" y="10" width="680" height="300" rx="14" fill={C.card} stroke={C.border} />
          {/* Timeline */}
          <text x="40" y="40" fill={C.blueLight} fontSize="13" fontWeight="700">⏱️ TIMELINE</text>
          <line x1="40" y1="60" x2="660" y2="60" stroke={C.border} strokeWidth="2" />
          {/* 1 min prep */}
          <g>
            <rect x="40" y="50" width="180" height="20" rx="4" fill={C.amber} fillOpacity="0.4" stroke={C.amber} />
            <text x="130" y="65" textAnchor="middle" fill={C.text} fontSize="11" fontWeight="700">1 min PREP</text>
            <rect x="225" y="50" width="435" height="20" rx="4" fill={C.emerald} fillOpacity="0.4" stroke={C.emerald} />
            <text x="442" y="65" textAnchor="middle" fill={C.text} fontSize="11" fontWeight="700">2 min DELIVERY</text>
          </g>
          {/* Prep notes */}
          <g transform="translate(40,90)">
            <rect width="180" height="200" rx="10" fill={C.amber} fillOpacity="0.12" stroke={C.amber} />
            <text x="90" y="22" textAnchor="middle" fill={C.amberLight} fontSize="12" fontWeight="700">📝 PREP NOTES</text>
            <line x1="15" y1="32" x2="165" y2="32" stroke={C.border} />
            <text x="15" y="52" fill={C.text} fontSize="11" fontWeight="700">Write keywords only:</text>
            <text x="15" y="72" fill={C.text} fontSize="10.5">• WHO (person)</text>
            <text x="15" y="90" fill={C.text} fontSize="10.5">• WHEN (time)</text>
            <text x="15" y="108" fill={C.text} fontSize="10.5">• WHERE (place)</text>
            <text x="15" y="126" fill={C.text} fontSize="10.5">• WHAT (event)</text>
            <text x="15" y="144" fill={C.text} fontSize="10.5">• WHY (feeling)</text>
            <text x="15" y="170" fill={C.amberLight} fontSize="10" fontStyle="italic">3-5 keywords MAX</text>
            <text x="15" y="185" fill={C.amberLight} fontSize="10" fontStyle="italic">DON'T write sentences</text>
          </g>
          {/* Delivery 4 sections */}
          <g transform="translate(235,90)">
            <rect width="100" height="200" rx="10" fill={C.blue} fillOpacity="0.15" stroke={C.blue} />
            <text x="50" y="22" textAnchor="middle" fill={C.blueLight} fontSize="11" fontWeight="700">OPENER</text>
            <text x="50" y="38" textAnchor="middle" fill={C.amberLight} fontSize="9">~15 sec</text>
            <line x1="10" y1="46" x2="90" y2="46" stroke={C.border} />
            <text x="10" y="68" fill={C.text} fontSize="10">"I'd like to talk</text>
            <text x="10" y="82" fill={C.text} fontSize="10">about a..."</text>
            <text x="10" y="105" fill={C.text} fontSize="10">"It happened</text>
            <text x="10" y="119" fill={C.text} fontSize="10">when..."</text>
            <text x="10" y="155" fill={C.blueLight} fontSize="9" fontStyle="italic">Buy time with</text>
            <text x="10" y="167" fill={C.blueLight} fontSize="9" fontStyle="italic">a paraphrase</text>
          </g>
          <g transform="translate(345,90)">
            <rect width="100" height="200" rx="10" fill={C.emerald} fillOpacity="0.15" stroke={C.emerald} />
            <text x="50" y="22" textAnchor="middle" fill={C.emeraldLight} fontSize="11" fontWeight="700">DETAILS</text>
            <text x="50" y="38" textAnchor="middle" fill={C.amberLight} fontSize="9">~45 sec</text>
            <line x1="10" y1="46" x2="90" y2="46" stroke={C.border} />
            <text x="10" y="68" fill={C.text} fontSize="10">Address the</text>
            <text x="10" y="82" fill={C.text} fontSize="10">first 3 bullets</text>
            <text x="10" y="105" fill={C.text} fontSize="10">on cue card.</text>
            <text x="10" y="155" fill={C.emeraldLight} fontSize="9" fontStyle="italic">Use past tenses,</text>
            <text x="10" y="167" fill={C.emeraldLight} fontSize="9" fontStyle="italic">descriptive adj</text>
          </g>
          <g transform="translate(455,90)">
            <rect width="100" height="200" rx="10" fill={C.purple} fillOpacity="0.15" stroke={C.purple} />
            <text x="50" y="22" textAnchor="middle" fill={C.purpleLight} fontSize="11" fontWeight="700">STORY</text>
            <text x="50" y="38" textAnchor="middle" fill={C.amberLight} fontSize="9">~45 sec</text>
            <line x1="10" y1="46" x2="90" y2="46" stroke={C.border} />
            <text x="10" y="68" fill={C.text} fontSize="10">Add anecdote,</text>
            <text x="10" y="82" fill={C.text} fontSize="10">specific moment,</text>
            <text x="10" y="98" fill={C.text} fontSize="10">a conversation,</text>
            <text x="10" y="114" fill={C.text} fontSize="10">a sensory detail.</text>
            <text x="10" y="150" fill={C.purpleLight} fontSize="9" fontStyle="italic">This is where</text>
            <text x="10" y="162" fill={C.purpleLight} fontSize="9" fontStyle="italic">Band 7+ shines</text>
          </g>
          <g transform="translate(565,90)">
            <rect width="95" height="200" rx="10" fill={C.amber} fillOpacity="0.15" stroke={C.amber} />
            <text x="47" y="22" textAnchor="middle" fill={C.amberLight} fontSize="11" fontWeight="700">FEELING</text>
            <text x="47" y="38" textAnchor="middle" fill={C.amberLight} fontSize="9">~15 sec</text>
            <line x1="10" y1="46" x2="85" y2="46" stroke={C.border} />
            <text x="10" y="68" fill={C.text} fontSize="10">Address final</text>
            <text x="10" y="82" fill={C.text} fontSize="10">bullet (How</text>
            <text x="10" y="96" fill={C.text} fontSize="10">do you feel?)</text>
            <text x="10" y="135" fill={C.amberLight} fontSize="9" fontStyle="italic">"Looking back,</text>
            <text x="10" y="147" fill={C.amberLight} fontSize="9" fontStyle="italic">I still feel..."</text>
          </g>
        </svg>
      </Wrapper>
    );
  }

  // ============== SPEAKING PART 3 — DISCUSSION ==============
  if (lectureId === "speaking-part3-discussion") {
    return (
      <Wrapper titleVi="Khung trả lời 4 bước (OREO+) cho Part 3" title="OREO+ 4-Step Framework for Part 3">
        <svg viewBox="0 0 700 290" className="w-full max-w-[700px] mx-auto" role="img" aria-label="OREO framework">
          <rect x="10" y="10" width="680" height="270" rx="14" fill={C.card} stroke={C.border} />
          <text x="350" y="36" textAnchor="middle" fill={C.blueLight} fontSize="13" fontWeight="700">🎤 Q: "Why do people prefer cities to rural areas?"</text>
          {[
            { x: 30, letter: "O", word: "OPINION", hint: '"Well, I think the main reason is..."', color: C.blue, colorLight: C.blueLight },
            { x: 195, letter: "R", word: "REASON", hint: '"...because cities offer better job prospects."', color: C.emerald, colorLight: C.emeraldLight },
            { x: 360, letter: "E", word: "EXAMPLE", hint: '"For instance, my cousin moved to Hanoi for a tech job..."', color: C.amber, colorLight: C.amberLight },
            { x: 525, letter: "O", word: "OUTCOME", hint: '"...so this trend will likely continue."', color: C.purple, colorLight: C.purpleLight },
          ].map((p, i) => (
            <g key={i} transform={`translate(${p.x},65)`}>
              <rect width="145" height="195" rx="12" fill={p.color} fillOpacity="0.15" stroke={p.color} />
              <circle cx="72" cy="42" r="28" fill={p.color} fillOpacity="0.3" stroke={p.color} strokeWidth="2" />
              <text x="72" y="50" textAnchor="middle" fill={p.colorLight} fontSize="22" fontWeight="800">{p.letter}</text>
              <text x="72" y="92" textAnchor="middle" fill={p.colorLight} fontSize="12" fontWeight="700">{p.word}</text>
              <foreignObject x="10" y="105" width="125" height="80">
                <div style={{ color: C.text, fontSize: 10.5, fontStyle: "italic", lineHeight: 1.35, textAlign: "center" as const }}>{p.hint}</div>
              </foreignObject>
            </g>
          ))}
          {[0, 1, 2].map((i) => (
            <path key={i} d={`M ${175 + i * 165} 160 L ${195 + i * 165} 160`} stroke={C.amberLight} strokeWidth="2" markerEnd="url(#arrSP3)" />
          ))}
          <defs>
            <marker id="arrSP3" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={C.amberLight} />
            </marker>
          </defs>
        </svg>
      </Wrapper>
    );
  }

  // ============== NATURAL FILLERS ==============
  if (lectureId === "natural-fillers-speaking") {
    return (
      <Wrapper titleVi="Bộ filler tự nhiên (an toàn) vs nguy hiểm" title="Safe Fillers vs Dangerous Fillers">
        <svg viewBox="0 0 700 290" className="w-full max-w-[700px] mx-auto" role="img" aria-label="Filler comparison">
          <rect x="10" y="10" width="680" height="270" rx="14" fill={C.card} stroke={C.border} />
          {/* Safe column */}
          <g transform="translate(30,30)">
            <rect width="315" height="240" rx="12" fill={C.emerald} fillOpacity="0.12" stroke={C.emerald} />
            <text x="157" y="26" textAnchor="middle" fill={C.emeraldLight} fontSize="13" fontWeight="700">✅ SAFE — Use these</text>
            <line x1="15" y1="36" x2="300" y2="36" stroke={C.border} />
            <text x="15" y="58" fill={C.amberLight} fontSize="11" fontWeight="700">Buy thinking time:</text>
            <text x="15" y="76" fill={C.text} fontSize="11">• "Well, that's an interesting question..."</text>
            <text x="15" y="92" fill={C.text} fontSize="11">• "Let me think about that for a second."</text>
            <text x="15" y="108" fill={C.text} fontSize="11">• "Hmm, I haven't thought about it before..."</text>
            <text x="15" y="132" fill={C.amberLight} fontSize="11" fontWeight="700">Soften opinions:</text>
            <text x="15" y="150" fill={C.text} fontSize="11">• "I'd say..." / "I suppose..."</text>
            <text x="15" y="166" fill={C.text} fontSize="11">• "It seems to me that..."</text>
            <text x="15" y="190" fill={C.amberLight} fontSize="11" fontWeight="700">Reformulate:</text>
            <text x="15" y="208" fill={C.text} fontSize="11">• "What I mean is..." / "In other words..."</text>
            <text x="15" y="224" fill={C.emeraldLight} fontSize="10" fontStyle="italic">→ Examiners hear: natural fluency</text>
          </g>
          {/* Dangerous column */}
          <g transform="translate(355,30)">
            <rect width="315" height="240" rx="12" fill={C.rose} fillOpacity="0.12" stroke={C.rose} />
            <text x="157" y="26" textAnchor="middle" fill={C.roseLight} fontSize="13" fontWeight="700">❌ DANGEROUS — Avoid</text>
            <line x1="15" y1="36" x2="300" y2="36" stroke={C.border} />
            <text x="15" y="58" fill={C.amberLight} fontSize="11" fontWeight="700">Empty noises:</text>
            <text x="15" y="76" fill={C.text} fontSize="11">• "Uhhh...", "Ummm..." (repeated)</text>
            <text x="15" y="92" fill={C.text} fontSize="11">• "Like, like..." (overused)</text>
            <text x="15" y="108" fill={C.text} fontSize="11">• "You know what I mean?"</text>
            <text x="15" y="132" fill={C.amberLight} fontSize="11" fontWeight="700">Confidence killers:</text>
            <text x="15" y="150" fill={C.text} fontSize="11">• "I don't know..." (without follow-up)</text>
            <text x="15" y="166" fill={C.text} fontSize="11">• "It's hard to say..." (and stop)</text>
            <text x="15" y="190" fill={C.amberLight} fontSize="11" fontWeight="700">Native-only slang:</text>
            <text x="15" y="208" fill={C.text} fontSize="11">• "Gonna", "wanna" (in formal Q)</text>
            <text x="15" y="224" fill={C.roseLight} fontSize="10" fontStyle="italic">→ Examiners hear: hesitation, low fluency</text>
          </g>
        </svg>
      </Wrapper>
    );
  }

  // ============== TIPS GENERAL → SPECIFIC SPEAKING ==============
  if (lectureId === "tips-speaking-general-specific") {
    return (
      <Wrapper titleVi="Phễu General → Specific cho Speaking" title="General → Specific Funnel Technique">
        <svg viewBox="0 0 700 290" className="w-full max-w-[700px] mx-auto" role="img" aria-label="General to specific funnel">
          <rect x="10" y="10" width="680" height="270" rx="14" fill={C.card} stroke={C.border} />
          <text x="350" y="36" textAnchor="middle" fill={C.blueLight} fontSize="13" fontWeight="700">🎯 Q: "Tell me about your hometown."</text>
          {/* Funnel */}
          <polygon points="200,70 500,70 430,250 270,250" fill={C.blue} fillOpacity="0.12" stroke={C.blue} strokeWidth="2" />
          {/* Layer 1: General */}
          <g>
            <rect x="220" y="80" width="260" height="35" rx="6" fill={C.blue} fillOpacity="0.2" stroke={C.blue} />
            <text x="350" y="100" textAnchor="middle" fill={C.blueLight} fontSize="11" fontWeight="700">🌍 GENERAL — Country &amp; Region</text>
            <text x="350" y="113" textAnchor="middle" fill={C.text} fontSize="10" fontStyle="italic">"It's in northern Vietnam..."</text>
          </g>
          {/* Layer 2: City */}
          <g>
            <rect x="245" y="125" width="210" height="35" rx="6" fill={C.emerald} fillOpacity="0.2" stroke={C.emerald} />
            <text x="350" y="145" textAnchor="middle" fill={C.emeraldLight} fontSize="11" fontWeight="700">🏙️ CITY — Setting</text>
            <text x="350" y="158" textAnchor="middle" fill={C.text} fontSize="10" fontStyle="italic">"Hanoi, the capital..."</text>
          </g>
          {/* Layer 3: District */}
          <g>
            <rect x="270" y="170" width="160" height="35" rx="6" fill={C.amber} fillOpacity="0.2" stroke={C.amber} />
            <text x="350" y="190" textAnchor="middle" fill={C.amberLight} fontSize="11" fontWeight="700">📍 DISTRICT</text>
            <text x="350" y="203" textAnchor="middle" fill={C.text} fontSize="10" fontStyle="italic">"...Tay Ho district..."</text>
          </g>
          {/* Layer 4: Personal */}
          <g>
            <rect x="290" y="215" width="120" height="32" rx="6" fill={C.purple} fillOpacity="0.25" stroke={C.purple} />
            <text x="350" y="232" textAnchor="middle" fill={C.purpleLight} fontSize="11" fontWeight="700">💝 PERSONAL</text>
            <text x="350" y="245" textAnchor="middle" fill={C.text} fontSize="10" fontStyle="italic">"...where I grew up."</text>
          </g>
          {/* Side label */}
          <text x="40" y="155" fill={C.amberLight} fontSize="11" fontWeight="700">Wide</text>
          <text x="40" y="170" fill={C.text} fontSize="9.5">context</text>
          <text x="610" y="240" fill={C.purpleLight} fontSize="11" fontWeight="700">Deep</text>
          <text x="605" y="255" fill={C.text} fontSize="9.5">personal</text>
          <path d="M 70 175 L 195 165" stroke={C.amberLight} strokeWidth="1.5" />
          <path d="M 600 235 L 425 235" stroke={C.purpleLight} strokeWidth="1.5" />
        </svg>
      </Wrapper>
    );
  }

  return null;
};

export default IeltsLectureDiagram;
