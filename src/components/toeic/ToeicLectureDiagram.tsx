/**
 * @file ToeicLectureDiagram.tsx
 * @description SVG diagrams minh họa kỹ thuật cốt lõi của 20 bài TOEIC.
 * Sử dụng tokens HSL từ design system (bg-card, text-foreground...).
 */
import { useLanguage } from "@/contexts/LanguageContext";

interface Props {
  lectureId: string;
}

const Wrapper = ({ title, titleVi, children }: { title: string; titleVi: string; children: React.ReactNode }) => {
  const { t } = useLanguage();
  return (
    <figure className="rounded-xl border border-white/10 bg-white/[0.03] p-4 md:p-5 my-4">
      <figcaption className="text-sm font-semibold text-blue-300 mb-3 flex items-center gap-2">
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

// Helper colors from semantic tokens (Deep Business Blue theme)
const C = {
  bg: "#0F172A",
  card: "#1E293B",
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
  border: "#334155",
};

const ToeicLectureDiagram = ({ lectureId }: Props) => {
  // === LISTENING DIAGRAMS ===
  if (lectureId === "toeic-part1-distractors") {
    return (
      <Wrapper title="Sound-Alike Trap Detector" titleVi="Bộ phát hiện bẫy âm thanh giống nhau">
        <svg viewBox="0 0 600 220" className="w-full max-w-[600px] mx-auto" role="img" aria-label="Sound-alike traps diagram">
          <rect x="10" y="10" width="580" height="200" rx="12" fill={C.card} stroke={C.border} />
          <text x="300" y="38" textAnchor="middle" fill={C.blueLight} fontSize="14" fontWeight="700">You hear: "She's writing on the board"</text>
          {/* Sound waves */}
          <g>
            {[0, 1, 2, 3, 4].map((i) => (
              <path key={i} d={`M ${60 + i * 12} 90 Q ${66 + i * 12} ${75 + i * 3}, ${72 + i * 12} 90`} stroke={C.blue} strokeWidth="2" fill="none" />
            ))}
          </g>
          {/* Trap options */}
          <g transform="translate(40,120)">
            <rect width="160" height="70" rx="10" fill={C.rose} fillOpacity="0.15" stroke={C.rose} />
            <text x="80" y="22" textAnchor="middle" fill={C.roseLight} fontSize="11" fontWeight="700">❌ TRAP A</text>
            <text x="80" y="42" textAnchor="middle" fill={C.text} fontSize="12">"riding" (sounds like</text>
            <text x="80" y="58" textAnchor="middle" fill={C.text} fontSize="12">writing)</text>
          </g>
          <g transform="translate(220,120)">
            <rect width="160" height="70" rx="10" fill={C.emerald} fillOpacity="0.15" stroke={C.emerald} />
            <text x="80" y="22" textAnchor="middle" fill={C.emeraldLight} fontSize="11" fontWeight="700">✅ CORRECT</text>
            <text x="80" y="42" textAnchor="middle" fill={C.text} fontSize="12">"writing on the</text>
            <text x="80" y="58" textAnchor="middle" fill={C.text} fontSize="12">board"</text>
          </g>
          <g transform="translate(400,120)">
            <rect width="160" height="70" rx="10" fill={C.rose} fillOpacity="0.15" stroke={C.rose} />
            <text x="80" y="22" textAnchor="middle" fill={C.roseLight} fontSize="11" fontWeight="700">❌ TRAP B</text>
            <text x="80" y="42" textAnchor="middle" fill={C.text} fontSize="12">"board" alone (right</text>
            <text x="80" y="58" textAnchor="middle" fill={C.text} fontSize="12">word, wrong action)</text>
          </g>
        </svg>
      </Wrapper>
    );
  }

  if (lectureId === "toeic-part2-5w1h") {
    return (
      <Wrapper title="5W1H Decision Tree" titleVi="Cây quyết định 5W1H">
        <svg viewBox="0 0 600 280" className="w-full max-w-[600px] mx-auto" role="img" aria-label="5W1H decision tree">
          <rect x="10" y="10" width="580" height="260" rx="12" fill={C.card} stroke={C.border} />
          {/* Root */}
          <rect x="220" y="30" width="160" height="40" rx="20" fill={C.blue} fillOpacity="0.25" stroke={C.blue} />
          <text x="300" y="55" textAnchor="middle" fill={C.blueLight} fontSize="13" fontWeight="700">Listen to FIRST WORD</text>
          {/* Branches */}
          {[
            { x: 50, label: "WHO", ans: "→ Person/Name", color: C.emerald },
            { x: 175, label: "WHEN", ans: "→ Time/Date", color: C.emerald },
            { x: 300, label: "WHERE", ans: "→ Location", color: C.emerald },
            { x: 425, label: "WHY", ans: "→ Reason (Because)", color: C.amber },
            { x: 550, label: "HOW", ans: "→ Method/Manner", color: C.amber },
          ].map((b, i) => (
            <g key={i} transform={`translate(${b.x - 50}, 130)`}>
              <line x1="60" y1="-50" x2="60" y2="-10" stroke={C.border} strokeWidth="1.5" strokeDasharray="3 3" />
              <rect width="100" height="40" rx="8" fill={b.color} fillOpacity="0.2" stroke={b.color} />
              <text x="50" y="25" textAnchor="middle" fill={C.text} fontSize="12" fontWeight="700">{b.label}?</text>
              <text x="50" y="60" textAnchor="middle" fill={C.textMute} fontSize="10">{b.ans}</text>
            </g>
          ))}
          <text x="300" y="250" textAnchor="middle" fill={C.amberLight} fontSize="11" fontStyle="italic">⚡ 80% bài Part 2 quyết định bằng từ đầu tiên</text>
        </svg>
      </Wrapper>
    );
  }

  if (lectureId === "toeic-part34-graphic" || lectureId === "toeic-part3-preread") {
    return (
      <Wrapper title="Pre-Read → Listen → Confirm" titleVi="Đọc trước → Nghe → Xác nhận">
        <svg viewBox="0 0 600 200" className="w-full max-w-[600px] mx-auto" role="img" aria-label="Pre-read flow">
          <rect x="10" y="10" width="580" height="180" rx="12" fill={C.card} stroke={C.border} />
          {[
            { x: 30, label: "1. PRE-READ", desc: "Đọc câu hỏi & biểu đồ (15s)", color: C.blue },
            { x: 220, label: "2. LISTEN", desc: "Nghe & ghép keywords", color: C.amber },
            { x: 410, label: "3. ANSWER", desc: "Chọn đáp án (3s)", color: C.emerald },
          ].map((s, i) => (
            <g key={i}>
              <rect x={s.x} y="60" width="160" height="80" rx="12" fill={s.color} fillOpacity="0.18" stroke={s.color} strokeWidth="2" />
              <text x={s.x + 80} y="90" textAnchor="middle" fill={s.color} fontSize="14" fontWeight="800">{s.label}</text>
              <text x={s.x + 80} y="115" textAnchor="middle" fill={C.text} fontSize="11">{s.desc}</text>
              {i < 2 && (
                <g>
                  <line x1={s.x + 165} y1="100" x2={s.x + 215} y2="100" stroke={C.border} strokeWidth="2" markerEnd="url(#arrow)" />
                </g>
              )}
            </g>
          ))}
          <defs>
            <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
              <polygon points="0 0, 10 5, 0 10" fill={C.border} />
            </marker>
          </defs>
          <text x="300" y="175" textAnchor="middle" fill={C.amberLight} fontSize="11" fontStyle="italic">⏱ Tổng: ~30 giây cho mỗi set 3 câu</text>
        </svg>
      </Wrapper>
    );
  }

  if (lectureId === "toeic-part2-indirect") {
    return (
      <Wrapper title="3 Indirect Answer Patterns" titleVi="3 mẫu câu trả lời gián tiếp">
        <svg viewBox="0 0 600 240" className="w-full max-w-[600px] mx-auto" role="img" aria-label="Indirect answers">
          <rect x="10" y="10" width="580" height="220" rx="12" fill={C.card} stroke={C.border} />
          <text x="300" y="35" textAnchor="middle" fill={C.blueLight} fontSize="13" fontWeight="700">Q: "When does the report deadline?"</text>
          {[
            { x: 30, type: "REDIRECT", ex: "→ \"Ask Ms. Kim, she knows.\"", color: C.blue },
            { x: 215, type: "CONDITIONAL", ex: "→ \"It depends on the budget.\"", color: C.amber },
            { x: 400, type: "COUNTER-Q", ex: "→ \"Why do you ask?\"", color: C.rose },
          ].map((p, i) => (
            <g key={i}>
              <rect x={p.x} y="70" width="170" height="120" rx="10" fill={p.color} fillOpacity="0.15" stroke={p.color} />
              <text x={p.x + 85} y="95" textAnchor="middle" fill={p.color} fontSize="12" fontWeight="800">{p.type}</text>
              <foreignObject x={p.x + 8} y="105" width="154" height="80">
                <div style={{ color: C.text, fontSize: "11px", textAlign: "center", lineHeight: 1.5 }}>
                  {p.ex}
                </div>
              </foreignObject>
            </g>
          ))}
          <text x="300" y="215" textAnchor="middle" fill={C.emeraldLight} fontSize="11" fontStyle="italic">💡 Nếu không có đáp án "hoàn hảo" → chọn câu gián tiếp</text>
        </svg>
      </Wrapper>
    );
  }

  // === GRAMMAR / READING DIAGRAMS ===
  if (lectureId === "toeic-part5-word-forms") {
    return (
      <Wrapper title="Word-Form Position Rules" titleVi="Quy tắc vị trí loại từ">
        <svg viewBox="0 0 600 240" className="w-full max-w-[600px] mx-auto" role="img" aria-label="Word form rules">
          <rect x="10" y="10" width="580" height="220" rx="12" fill={C.card} stroke={C.border} />
          {[
            { y: 35, slot: "the ___ + N", form: "ADJECTIVE", ex: "the (successful) launch", color: C.blue },
            { y: 80, slot: "V + ___ + V", form: "ADVERB", ex: "works (efficiently)", color: C.emerald },
            { y: 125, slot: "the/a + ___", form: "NOUN", ex: "the (decision)", color: C.amber },
            { y: 170, slot: "S + ___ + O", form: "VERB", ex: "He (manages) the team", color: C.rose },
          ].map((r, i) => (
            <g key={i}>
              <rect x="30" y={r.y} width="140" height="36" rx="8" fill={C.bg} stroke={r.color} />
              <text x="100" y={r.y + 22} textAnchor="middle" fill={C.text} fontSize="12" fontFamily="monospace">{r.slot}</text>
              <text x="190" y={r.y + 22} fill={r.color} fontSize="13" fontWeight="700">→ {r.form}</text>
              <text x="340" y={r.y + 22} fill={C.textMute} fontSize="11" fontStyle="italic">{r.ex}</text>
            </g>
          ))}
          <text x="300" y="215" textAnchor="middle" fill={C.amberLight} fontSize="11">⚡ Nhìn vị trí trước, không cần hiểu nghĩa</text>
        </svg>
      </Wrapper>
    );
  }

  if (lectureId === "toeic-part56-conjunctions") {
    return (
      <Wrapper title="Conjunction vs Preposition" titleVi="Liên từ vs Giới từ">
        <svg viewBox="0 0 600 240" className="w-full max-w-[600px] mx-auto" role="img" aria-label="Conjunction vs preposition">
          <rect x="10" y="10" width="580" height="220" rx="12" fill={C.card} stroke={C.border} />
          <text x="300" y="35" textAnchor="middle" fill={C.blueLight} fontSize="13" fontWeight="700">Look at what follows the blank ___</text>
          {/* Two paths */}
          <g>
            <rect x="30" y="60" width="260" height="160" rx="12" fill={C.emerald} fillOpacity="0.12" stroke={C.emerald} />
            <text x="160" y="85" textAnchor="middle" fill={C.emerald} fontSize="14" fontWeight="800">→ CLAUSE (S + V)</text>
            <text x="160" y="110" textAnchor="middle" fill={C.text} fontSize="12">Use a CONJUNCTION</text>
            <text x="160" y="140" textAnchor="middle" fill={C.emeraldLight} fontSize="11" fontFamily="monospace">because, although, since</text>
            <text x="160" y="165" textAnchor="middle" fill={C.emeraldLight} fontSize="11" fontFamily="monospace">while, if, when, before</text>
            <text x="160" y="195" textAnchor="middle" fill={C.text} fontSize="11" fontStyle="italic">"___ he was tired, he stayed."</text>
          </g>
          <g>
            <rect x="310" y="60" width="260" height="160" rx="12" fill={C.amber} fillOpacity="0.12" stroke={C.amber} />
            <text x="440" y="85" textAnchor="middle" fill={C.amber} fontSize="14" fontWeight="800">→ NOUN / NOUN PHRASE</text>
            <text x="440" y="110" textAnchor="middle" fill={C.text} fontSize="12">Use a PREPOSITION</text>
            <text x="440" y="140" textAnchor="middle" fill={C.amberLight} fontSize="11" fontFamily="monospace">because of, despite, since</text>
            <text x="440" y="165" textAnchor="middle" fill={C.amberLight} fontSize="11" fontFamily="monospace">during, in case of, before</text>
            <text x="440" y="195" textAnchor="middle" fill={C.text} fontSize="11" fontStyle="italic">"___ his fatigue, he stayed."</text>
          </g>
        </svg>
      </Wrapper>
    );
  }

  if (lectureId === "toeic-part7-skimming") {
    return (
      <Wrapper title="SOFA Email Method" titleVi="Phương pháp SOFA cho Email">
        <svg viewBox="0 0 600 240" className="w-full max-w-[600px] mx-auto" role="img" aria-label="SOFA method">
          <rect x="10" y="10" width="580" height="220" rx="12" fill={C.card} stroke={C.border} />
          <text x="300" y="35" textAnchor="middle" fill={C.blueLight} fontSize="13" fontWeight="700">SOFA = Subject · Opening · Focus · Action</text>
          {[
            { x: 30, l: "S", w: "Subject", desc: "Đọc dòng tiêu đề (3s)", color: C.blue },
            { x: 175, l: "O", w: "Opening", desc: "Dòng đầu = mục đích", color: C.emerald },
            { x: 320, l: "F", w: "Focus", desc: "Câu in đậm/số liệu", color: C.amber },
            { x: 465, l: "A", w: "Action", desc: "Câu cuối = yêu cầu", color: C.rose },
          ].map((s, i) => (
            <g key={i}>
              <circle cx={s.x + 55} cy="115" r="35" fill={s.color} fillOpacity="0.2" stroke={s.color} strokeWidth="2.5" />
              <text x={s.x + 55} y="123" textAnchor="middle" fill={s.color} fontSize="22" fontWeight="900">{s.l}</text>
              <text x={s.x + 55} y="170" textAnchor="middle" fill={C.text} fontSize="12" fontWeight="700">{s.w}</text>
              <text x={s.x + 55} y="190" textAnchor="middle" fill={C.textMute} fontSize="10">{s.desc}</text>
            </g>
          ))}
          <text x="300" y="220" textAnchor="middle" fill={C.amberLight} fontSize="11" fontStyle="italic">⏱ 10 giây = nắm 70% nội dung</text>
        </svg>
      </Wrapper>
    );
  }

  if (lectureId === "toeic-part7-double-triple") {
    return (
      <Wrapper title="Cross-Reference Bridge" titleVi="Cầu nối thông tin giữa các bài đọc">
        <svg viewBox="0 0 600 220" className="w-full max-w-[600px] mx-auto" role="img" aria-label="Cross-reference">
          <rect x="10" y="10" width="580" height="200" rx="12" fill={C.card} stroke={C.border} />
          {/* 3 documents */}
          {[
            { x: 40, label: "📧 Email", info: "Date: Mar 5\nName: Mr. Lee" },
            { x: 230, label: "📋 Schedule", info: "Mar 5: Meeting\nMar 6: Trip" },
            { x: 420, label: "🧾 Invoice", info: "Mr. Lee: $200\nDate: Mar 5" },
          ].map((d, i) => (
            <g key={i}>
              <rect x={d.x} y="40" width="140" height="100" rx="10" fill={C.bg} stroke={C.blue} />
              <text x={d.x + 70} y="65" textAnchor="middle" fill={C.blueLight} fontSize="13" fontWeight="700">{d.label}</text>
              {d.info.split("\n").map((line, j) => (
                <text key={j} x={d.x + 70} y={90 + j * 18} textAnchor="middle" fill={C.text} fontSize="11" fontFamily="monospace">{line}</text>
              ))}
            </g>
          ))}
          {/* Bridges */}
          <path d="M 180 90 Q 215 30, 250 90" stroke={C.amber} strokeWidth="2" fill="none" strokeDasharray="4 3" />
          <path d="M 370 90 Q 405 30, 440 90" stroke={C.amber} strokeWidth="2" fill="none" strokeDasharray="4 3" />
          <text x="215" y="25" textAnchor="middle" fill={C.amberLight} fontSize="10" fontWeight="700">Date</text>
          <text x="405" y="25" textAnchor="middle" fill={C.amberLight} fontSize="10" fontWeight="700">Name</text>
          <text x="300" y="180" textAnchor="middle" fill={C.emeraldLight} fontSize="11" fontStyle="italic">💡 Dùng Tên · Ngày · Số làm cầu nối giữa các tài liệu</text>
        </svg>
      </Wrapper>
    );
  }

  if (lectureId === "toeic-time-management") {
    return (
      <Wrapper title="75-Minute Reading Allocation" titleVi="Phân bổ 75 phút Reading">
        <svg viewBox="0 0 600 260" className="w-full max-w-[600px] mx-auto" role="img" aria-label="Time allocation">
          <rect x="10" y="10" width="580" height="240" rx="12" fill={C.card} stroke={C.border} />
          <text x="300" y="35" textAnchor="middle" fill={C.blueLight} fontSize="13" fontWeight="700">Total: 75 minutes · 100 questions</text>
          {/* Pie-like bar */}
          {(() => {
            const segs = [
              { label: "Part 5 (30Q)", time: "10 min", w: 90, color: C.emerald },
              { label: "Part 6 (16Q)", time: "10 min", w: 90, color: C.blue },
              { label: "Part 7 (54Q)", time: "55 min", w: 360, color: C.amber },
            ];
            let acc = 60;
            return segs.map((s, i) => {
              const x = acc;
              acc += s.w;
              return (
                <g key={i}>
                  <rect x={x} y="80" width={s.w} height="40" fill={s.color} fillOpacity="0.3" stroke={s.color} strokeWidth="2" />
                  <text x={x + s.w / 2} y="105" textAnchor="middle" fill={C.text} fontSize="12" fontWeight="700">{s.label}</text>
                  <text x={x + s.w / 2} y="140" textAnchor="middle" fill={s.color} fontSize="13" fontWeight="800">{s.time}</text>
                </g>
              );
            });
          })()}
          {/* Tips */}
          <g transform="translate(60, 170)">
            <text x="0" y="0" fill={C.emeraldLight} fontSize="12" fontWeight="700">✓ 20s/câu Part 5</text>
            <text x="0" y="22" fill={C.blueLight} fontSize="12" fontWeight="700">✓ 35s/câu Part 6</text>
            <text x="0" y="44" fill={C.amberLight} fontSize="12" fontWeight="700">✓ 60s/câu Part 7 (single) · 90s/câu (multi)</text>
            <text x="0" y="68" fill={C.roseLight} fontSize="11" fontStyle="italic">⚠ Bỏ qua câu khó &gt; 30s, quay lại sau!</text>
          </g>
        </svg>
      </Wrapper>
    );
  }

  if (lectureId === "toeic-paraphrasing-secrets" || lectureId === "toeic-vocab-synonyms") {
    return (
      <Wrapper title="Paraphrasing 3 Levels" titleVi="3 cấp độ Paraphrasing">
        <svg viewBox="0 0 600 240" className="w-full max-w-[600px] mx-auto" role="img" aria-label="Paraphrasing levels">
          <rect x="10" y="10" width="580" height="220" rx="12" fill={C.card} stroke={C.border} />
          {[
            { y: 50, lvl: "Lv 1: Synonym", src: "purchase", dst: "buy", color: C.emerald },
            { y: 110, lvl: "Lv 2: Structure", src: "is responsible for", dst: "manages", color: C.amber },
            { y: 170, lvl: "Lv 3: Inference", src: "ran out of stock", dst: "unavailable", color: C.rose },
          ].map((r, i) => (
            <g key={i}>
              <rect x="30" y={r.y - 22} width="120" height="40" rx="8" fill={r.color} fillOpacity="0.15" stroke={r.color} />
              <text x="90" y={r.y + 4} textAnchor="middle" fill={r.color} fontSize="11" fontWeight="800">{r.lvl}</text>
              <rect x="170" y={r.y - 22} width="160" height="40" rx="8" fill={C.bg} stroke={C.border} />
              <text x="250" y={r.y + 4} textAnchor="middle" fill={C.text} fontSize="12" fontFamily="monospace">{r.src}</text>
              <line x1="335" y1={r.y - 2} x2="370" y2={r.y - 2} stroke={r.color} strokeWidth="2" markerEnd="url(#a2)" />
              <rect x="380" y={r.y - 22} width="180" height="40" rx="8" fill={r.color} fillOpacity="0.1" stroke={r.color} />
              <text x="470" y={r.y + 4} textAnchor="middle" fill={r.color} fontSize="12" fontFamily="monospace" fontWeight="700">{r.dst}</text>
            </g>
          ))}
          <defs>
            <marker id="a2" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <polygon points="0 0, 8 4, 0 8" fill={C.text} />
            </marker>
          </defs>
        </svg>
      </Wrapper>
    );
  }

  if (lectureId === "toeic-business-verbs" || lectureId === "toeic-vocab-office-supply") {
    return (
      <Wrapper title="Business Vocab Network" titleVi="Mạng từ vựng kinh doanh">
        <svg viewBox="0 0 600 260" className="w-full max-w-[600px] mx-auto" role="img" aria-label="Business vocab network">
          <rect x="10" y="10" width="580" height="240" rx="12" fill={C.card} stroke={C.border} />
          <circle cx="300" cy="130" r="50" fill={C.blue} fillOpacity="0.25" stroke={C.blue} strokeWidth="2" />
          <text x="300" y="125" textAnchor="middle" fill={C.blueLight} fontSize="12" fontWeight="800">MEETING</text>
          <text x="300" y="142" textAnchor="middle" fill={C.text} fontSize="10">cuộc họp</text>
          {[
            { x: 90, y: 60, w: "schedule", color: C.emerald },
            { x: 510, y: 60, w: "postpone", color: C.amber },
            { x: 90, y: 200, w: "attend", color: C.emerald },
            { x: 510, y: 200, w: "minutes", color: C.amber },
            { x: 60, y: 130, w: "agenda", color: C.rose },
            { x: 540, y: 130, w: "adjourn", color: C.rose },
          ].map((n, i) => (
            <g key={i}>
              <line x1="300" y1="130" x2={n.x} y2={n.y} stroke={n.color} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
              <circle cx={n.x} cy={n.y} r="32" fill={n.color} fillOpacity="0.2" stroke={n.color} />
              <text x={n.x} y={n.y + 4} textAnchor="middle" fill={C.text} fontSize="11" fontWeight="700">{n.w}</text>
            </g>
          ))}
        </svg>
      </Wrapper>
    );
  }

  if (lectureId === "toeic-part5-relative-clauses") {
    return (
      <Wrapper title="Relative Pronoun Selector" titleVi="Bộ chọn Đại từ quan hệ">
        <svg viewBox="0 0 600 220" className="w-full max-w-[600px] mx-auto" role="img" aria-label="Relative pronouns">
          <rect x="10" y="10" width="580" height="200" rx="12" fill={C.card} stroke={C.border} />
          {[
            { x: 40, ant: "Person", pro: "who / whom", ex: "the manager who hired me", color: C.blue },
            { x: 220, ant: "Thing", pro: "which / that", ex: "the report which is due", color: C.emerald },
            { x: 400, ant: "Possession", pro: "whose", ex: "client whose order is late", color: C.amber },
          ].map((r, i) => (
            <g key={i}>
              <rect x={r.x} y="40" width="160" height="140" rx="10" fill={r.color} fillOpacity="0.12" stroke={r.color} />
              <text x={r.x + 80} y="65" textAnchor="middle" fill={r.color} fontSize="12" fontWeight="800">If antecedent =</text>
              <text x={r.x + 80} y="85" textAnchor="middle" fill={r.color} fontSize="14" fontWeight="800">{r.ant}</text>
              <text x={r.x + 80} y="115" textAnchor="middle" fill={C.text} fontSize="13" fontFamily="monospace">→ {r.pro}</text>
              <foreignObject x={r.x + 5} y="130" width="150" height="45">
                <div style={{ color: C.textMute, fontSize: "10px", textAlign: "center", fontStyle: "italic" }}>{r.ex}</div>
              </foreignObject>
            </g>
          ))}
        </svg>
      </Wrapper>
    );
  }

  if (lectureId === "toeic-part5-subjunctive") {
    return (
      <Wrapper title="Subjunctive Trigger Verbs" titleVi="Động từ kích hoạt thể giả định">
        <svg viewBox="0 0 600 220" className="w-full max-w-[600px] mx-auto" role="img" aria-label="Subjunctive">
          <rect x="10" y="10" width="580" height="200" rx="12" fill={C.card} stroke={C.border} />
          <rect x="40" y="40" width="220" height="140" rx="10" fill={C.amber} fillOpacity="0.15" stroke={C.amber} />
          <text x="150" y="65" textAnchor="middle" fill={C.amber} fontSize="13" fontWeight="800">TRIGGER VERBS</text>
          {["recommend", "suggest", "insist", "demand", "require", "request"].map((v, i) => (
            <text key={v} x="150" y={95 + i * 15} textAnchor="middle" fill={C.text} fontSize="11" fontFamily="monospace">{v}</text>
          ))}
          <text x="305" y="115" textAnchor="middle" fill={C.text} fontSize="20" fontWeight="800">→</text>
          <rect x="340" y="40" width="220" height="140" rx="10" fill={C.emerald} fillOpacity="0.15" stroke={C.emerald} />
          <text x="450" y="65" textAnchor="middle" fill={C.emerald} fontSize="13" fontWeight="800">that S + (BARE V)</text>
          <text x="450" y="100" textAnchor="middle" fill={C.text} fontSize="12" fontStyle="italic">"that he go" ✓</text>
          <text x="450" y="125" textAnchor="middle" fill={C.text} fontSize="12" fontStyle="italic">"that she be present" ✓</text>
          <text x="450" y="155" textAnchor="middle" fill={C.roseLight} fontSize="11">❌ NOT "that he goes"</text>
        </svg>
      </Wrapper>
    );
  }

  if (lectureId === "toeic-part6-text-completion") {
    return (
      <Wrapper title="Part 6 Context Clues" titleVi="Dấu hiệu ngữ cảnh Part 6">
        <svg viewBox="0 0 600 220" className="w-full max-w-[600px] mx-auto" role="img" aria-label="Part 6 context">
          <rect x="10" y="10" width="580" height="200" rx="12" fill={C.card} stroke={C.border} />
          <text x="300" y="35" textAnchor="middle" fill={C.blueLight} fontSize="13" fontWeight="700">For each blank, scan ±1 sentence around it</text>
          {[
            { x: 30, type: "Tense Clue", src: "yesterday, last week", out: "→ PAST tense", color: C.blue },
            { x: 215, type: "Pronoun Clue", src: "Ms. Kim... she", out: "→ Match gender", color: C.emerald },
            { x: 400, type: "Linker Clue", src: "However, Therefore", out: "→ Logic flow", color: C.amber },
          ].map((c, i) => (
            <g key={i}>
              <rect x={c.x} y="60" width="170" height="130" rx="10" fill={c.color} fillOpacity="0.12" stroke={c.color} />
              <text x={c.x + 85} y="85" textAnchor="middle" fill={c.color} fontSize="12" fontWeight="800">{c.type}</text>
              <text x={c.x + 85} y="120" textAnchor="middle" fill={C.text} fontSize="11" fontFamily="monospace">{c.src}</text>
              <text x={c.x + 85} y="160" textAnchor="middle" fill={c.color} fontSize="12" fontWeight="700">{c.out}</text>
            </g>
          ))}
        </svg>
      </Wrapper>
    );
  }

  if (lectureId === "toeic-part7-inference") {
    return (
      <Wrapper title="Inference Question Decoder" titleVi="Bộ giải mã câu hỏi suy luận">
        <svg viewBox="0 0 600 220" className="w-full max-w-[600px] mx-auto" role="img" aria-label="Inference">
          <rect x="10" y="10" width="580" height="200" rx="12" fill={C.card} stroke={C.border} />
          <rect x="40" y="40" width="240" height="140" rx="10" fill={C.blue} fillOpacity="0.15" stroke={C.blue} />
          <text x="160" y="65" textAnchor="middle" fill={C.blue} fontSize="12" fontWeight="800">QUESTION SIGNALS</text>
          <text x="160" y="95" textAnchor="middle" fill={C.text} fontSize="11" fontStyle="italic">"What is implied...?"</text>
          <text x="160" y="115" textAnchor="middle" fill={C.text} fontSize="11" fontStyle="italic">"What can be inferred...?"</text>
          <text x="160" y="135" textAnchor="middle" fill={C.text} fontSize="11" fontStyle="italic">"Most likely..."</text>
          <text x="160" y="155" textAnchor="middle" fill={C.text} fontSize="11" fontStyle="italic">"Suggest about..."</text>
          <text x="305" y="115" textAnchor="middle" fill={C.text} fontSize="20" fontWeight="800">→</text>
          <rect x="320" y="40" width="240" height="140" rx="10" fill={C.emerald} fillOpacity="0.15" stroke={C.emerald} />
          <text x="440" y="65" textAnchor="middle" fill={C.emerald} fontSize="12" fontWeight="800">DECODE STEPS</text>
          <text x="440" y="90" textAnchor="middle" fill={C.text} fontSize="11">1. Locate the exact line</text>
          <text x="440" y="110" textAnchor="middle" fill={C.text} fontSize="11">2. Read 1 line before + after</text>
          <text x="440" y="130" textAnchor="middle" fill={C.text} fontSize="11">3. Eliminate "too strong" answers</text>
          <text x="440" y="155" textAnchor="middle" fill={C.amberLight} fontSize="11" fontWeight="700">⚠ Đừng chọn quá rõ ràng!</text>
        </svg>
      </Wrapper>
    );
  }

  if (lectureId === "toeic-part7-online-chat") {
    return (
      <Wrapper title="Chat Tone Mapping" titleVi="Bản đồ tông giọng trong chat">
        <svg viewBox="0 0 600 240" className="w-full max-w-[600px] mx-auto" role="img" aria-label="Chat tone">
          <rect x="10" y="10" width="580" height="220" rx="12" fill={C.card} stroke={C.border} />
          <text x="300" y="35" textAnchor="middle" fill={C.blueLight} fontSize="13" fontWeight="700">"What does X mean by '...'?" → Read 2 lines before</text>
          {/* Chat bubbles */}
          {[
            { y: 60, name: "Mike", text: "The deadline is tomorrow.", side: "L", color: C.blue },
            { y: 105, name: "Sara", text: "I haven't started yet.", side: "R", color: C.emerald },
            { y: 150, name: "Mike", text: "🚨 \"You're kidding!\"", side: "L", color: C.amber, focus: true },
            { y: 195, name: "Mike", text: "= expressing SHOCK / DISBELIEF", side: "L", color: C.amber, hint: true },
          ].map((b, i) => {
            if (b.hint) {
              return <text key={i} x="60" y={b.y} fill={C.amberLight} fontSize="11" fontStyle="italic" fontWeight="700">→ {b.text}</text>;
            }
            const x = b.side === "L" ? 50 : 290;
            return (
              <g key={i}>
                <rect x={x} y={b.y - 15} width="260" height="32" rx="14" fill={b.color} fillOpacity={b.focus ? "0.35" : "0.15"} stroke={b.color} strokeWidth={b.focus ? "2" : "1"} />
                <text x={x + 12} y={b.y + 5} fill={C.text} fontSize="11" fontWeight="700">{b.name}:</text>
                <text x={x + 60} y={b.y + 5} fill={C.text} fontSize="11">{b.text}</text>
              </g>
            );
          })}
        </svg>
      </Wrapper>
    );
  }

  if (lectureId === "toeic-no-wait-method") {
    return (
      <Wrapper title="No-Wait Loop" titleVi="Vòng lặp Không-Chờ">
        <svg viewBox="0 0 600 220" className="w-full max-w-[600px] mx-auto" role="img" aria-label="No wait method">
          <rect x="10" y="10" width="580" height="200" rx="12" fill={C.card} stroke={C.border} />
          {[
            { cx: 130, label: "ANSWER", desc: "Q1 (3s)", color: C.emerald },
            { cx: 300, label: "PRE-READ", desc: "Q2-3 (5s)", color: C.blue },
            { cx: 470, label: "LISTEN", desc: "Audio Q2-3", color: C.amber },
          ].map((s, i) => (
            <g key={i}>
              <circle cx={s.cx} cy="110" r="55" fill={s.color} fillOpacity="0.2" stroke={s.color} strokeWidth="2.5" />
              <text x={s.cx} y="105" textAnchor="middle" fill={s.color} fontSize="13" fontWeight="800">{s.label}</text>
              <text x={s.cx} y="125" textAnchor="middle" fill={C.text} fontSize="11">{s.desc}</text>
            </g>
          ))}
          {/* Loop arrows */}
          <path d="M 185 110 L 245 110" stroke={C.text} strokeWidth="2" markerEnd="url(#a3)" />
          <path d="M 355 110 L 415 110" stroke={C.text} strokeWidth="2" markerEnd="url(#a3)" />
          <path d="M 470 165 Q 300 220, 130 165" stroke={C.amberLight} strokeWidth="2" fill="none" strokeDasharray="4 4" markerEnd="url(#a3)" />
          <defs>
            <marker id="a3" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <polygon points="0 0, 8 4, 0 8" fill={C.text} />
            </marker>
          </defs>
          <text x="300" y="200" textAnchor="middle" fill={C.amberLight} fontSize="11" fontStyle="italic">⚡ Không bao giờ chờ — luôn đi trước audio 1 bước</text>
        </svg>
      </Wrapper>
    );
  }

  // Default: no diagram for this lecture
  return null;
};

export default ToeicLectureDiagram;
