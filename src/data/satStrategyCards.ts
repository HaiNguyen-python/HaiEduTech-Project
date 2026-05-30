/**
 * @file satStrategyCards.ts
 * @description Reusable SAT question-type strategy cards. Each card maps to a
 * keyword found in lesson titles/ids so they can be auto-injected into the
 * lesson view without per-lesson wiring.
 */
export interface SatStrategyCard {
  /** Lowercase keywords matched against lesson id/title to auto-attach. */
  match: string[];
  emoji: string;
  title: { vi: string; en: string };
  steps: { vi: string; en: string }[];
  example: { vi: string; en: string };
  trap: { vi: string; en: string };
}

export const SAT_STRATEGY_CARDS: SatStrategyCard[] = [
  {
    match: ["words in context", "vocab", "word-in-context", "wic"],
    emoji: "📖",
    title: { vi: "Words in Context — 3 bước", en: "Words in Context — 3 steps" },
    steps: [
      { vi: "1. Che 4 đáp án, đoán nghĩa từ chỗ trống bằng tiếng Anh đơn giản.", en: "1. Cover the 4 options; predict the meaning in plain English." },
      { vi: "2. Ghép đáp án nào sát nghĩa gốc nhất, KHÔNG chọn nghĩa hay nhất.", en: "2. Match the option closest to YOUR prediction, not the fanciest one." },
      { vi: "3. Thay từ vào câu, đọc lại — phải tự nhiên với tone của đoạn.", en: "3. Plug it back in and re-read — it must match the passage's tone." },
    ],
    example: {
      vi: "“The data ___ the hypothesis.” → đoán “support” → chọn corroborate, không chọn refute.",
      en: "“The data ___ the hypothesis.” → predict “support” → pick corroborate, not refute.",
    },
    trap: {
      vi: "Bẫy: đáp án có nghĩa phổ biến nhất thường SAI. SAT thưởng nghĩa secondary chính xác hơn.",
      en: "Trap: the most common meaning is usually WRONG. SAT rewards the precise secondary meaning.",
    },
  },
  {
    match: ["evidence", "command of evidence", "support"],
    emoji: "🎯",
    title: { vi: "Command of Evidence — 3 bước", en: "Command of Evidence — 3 steps" },
    steps: [
      { vi: "1. Đọc claim/hypothesis cần củng cố hoặc phản bác — gạch chân.", en: "1. Read the claim/hypothesis to support or weaken — underline it." },
      { vi: "2. Loại đáp án OFF-TOPIC trước, sau đó loại đáp án CÙNG HƯỚNG nhưng đo SAI biến.", en: "2. Eliminate off-topic options first; then drop options that match direction but the wrong variable." },
      { vi: "3. Chọn đáp án trực tiếp chứa số liệu/sự kiện liên quan claim.", en: "3. Pick the option that DIRECTLY cites data/facts tied to the claim." },
    ],
    example: {
      vi: "Claim: 'Cây cao hơn cho nhiều quả hơn' → chọn dữ liệu so chiều cao vs số quả, không phải tuổi cây.",
      en: "Claim: 'Taller trees yield more fruit' → pick data comparing height vs fruit count, not age.",
    },
    trap: { vi: "Bẫy: đáp án 'đúng sự thật' nhưng KHÔNG liên quan claim — SAT vẫn coi là sai.", en: "Trap: factually true but UNRELATED to the claim is still wrong on the SAT." },
  },
  {
    match: ["rhetorical synthesis", "synthesis", "notes"],
    emoji: "📝",
    title: { vi: "Rhetorical Synthesis — 3 bước", en: "Rhetorical Synthesis — 3 steps" },
    steps: [
      { vi: "1. ĐỌC YÊU CẦU TRƯỚC — xác định goal (emphasize, contrast, introduce…).", en: "1. READ THE GOAL FIRST — identify the rhetorical aim (emphasize, contrast, introduce...)." },
      { vi: "2. Loại đáp án dùng bullet không phục vụ goal, dù thông tin đúng.", en: "2. Eliminate options that use bullets not serving the goal, even if facts are correct." },
      { vi: "3. Chọn đáp án kết hợp TỐI THIỂU 2 bullet vào 1 câu trôi chảy.", en: "3. Pick the option that combines AT LEAST 2 bullets into one smooth sentence." },
    ],
    example: { vi: "Goal: emphasize discovery → 'X discovered Y in 2020, the first ever' tốt hơn 'X did Y. Y is new.'", en: "Goal: emphasize discovery → 'X discovered Y in 2020, the first ever' beats 'X did Y. Y is new.'" },
    trap: { vi: "Bẫy: đáp án dài nhất nghe sang nhưng không phục vụ goal cụ thể.", en: "Trap: longest option sounds polished but doesn't hit the specific goal." },
  },
  {
    match: ["transition", "boundaries", "punctuation", "comma", "semicolon"],
    emoji: "🔗",
    title: { vi: "Transitions & Boundaries — 3 bước", en: "Transitions & Boundaries — 3 steps" },
    steps: [
      { vi: "1. Đọc 2 câu trước–sau khoảng trống → quan hệ là Same / Opposite / Cause.", en: "1. Read sentences before & after the gap → relationship is Same / Opposite / Cause." },
      { vi: "2. Nhóm transitions: however/yet (đối lập), therefore/thus (kết quả), moreover (bổ sung).", en: "2. Group transitions: however/yet (contrast), therefore/thus (result), moreover (addition)." },
      { vi: "3. Với dấu câu: kiểm tra 2 vế có phải independent clauses không → ';' chỉ nối 2 vế độc lập.", en: "3. For punctuation: check if both halves are independent clauses → ';' joins only two independent clauses." },
    ],
    example: { vi: "“He trained daily; therefore, he won.” — ';' đúng vì 2 vế đều IC.", en: "“He trained daily; therefore, he won.” — ';' is right because both sides are ICs." },
    trap: { vi: "Bẫy: comma splice — nối 2 IC chỉ bằng ',' luôn sai trên SAT.", en: "Trap: comma splice — joining two ICs with just ',' is always wrong on the SAT." },
  },
  {
    match: ["main idea", "central idea", "purpose"],
    emoji: "🎯",
    title: { vi: "Main Idea / Purpose — 3 bước", en: "Main Idea / Purpose — 3 steps" },
    steps: [
      { vi: "1. Đọc câu đầu + câu cuối — main idea thường nằm ở 1 trong 2.", en: "1. Read the first and last sentence — main idea usually lives in one of them." },
      { vi: "2. Tóm ý đoạn bằng 5 từ trước khi nhìn đáp án.", en: "2. Summarize the passage in 5 words BEFORE looking at options." },
      { vi: "3. Loại đáp án quá hẹp (chỉ 1 chi tiết) hoặc quá rộng (đi xa khỏi đoạn).", en: "3. Eliminate options that are too narrow (one detail) or too broad (beyond the passage)." },
    ],
    example: { vi: "Đoạn nói về 3 thí nghiệm chứng minh giả thuyết → main idea là 'evidence supports hypothesis', không phải mô tả 1 thí nghiệm.", en: "Passage discusses 3 experiments confirming a hypothesis → main idea is 'evidence supports hypothesis', not one experiment." },
    trap: { vi: "Bẫy: đáp án nhắc 1 chi tiết thật trong bài nhưng KHÔNG phải main idea.", en: "Trap: option mentions a true detail but is NOT the main idea." },
  },
  {
    match: ["linear", "algebra", "equation", "system"],
    emoji: "📐",
    title: { vi: "Linear Equations — 3 bước", en: "Linear Equations — 3 steps" },
    steps: [
      { vi: "1. Đặt biến rõ ràng — viết 1 dòng 'Let x = …'.", en: "1. Define variables clearly — write 'Let x = …'." },
      { vi: "2. Dịch từng cụm sang phương trình; chú ý 'is/equals' = '='.", en: "2. Translate each phrase to an equation; 'is/equals' → '='." },
      { vi: "3. Nếu hệ 2 ẩn → dùng substitution; nếu cần slope → Desmos nhanh hơn.", en: "3. Two unknowns → use substitution; need a slope → Desmos is faster." },
    ],
    example: { vi: "'Sum is 30, difference is 4' → x+y=30, x−y=4 → x=17, y=13.", en: "'Sum is 30, difference is 4' → x+y=30, x−y=4 → x=17, y=13." },
    trap: { vi: "Bẫy: hỏi 'value of x+y' mà bạn tính riêng x và y rồi cộng — mất thời gian. Cộng/trừ 2 PT trực tiếp.", en: "Trap: asking 'value of x+y' — don't solve separately; add/subtract the equations directly." },
  },
  {
    match: ["geometry", "trig", "circle", "triangle"],
    emoji: "📏",
    title: { vi: "Geometry & Trig — 3 bước", en: "Geometry & Trig — 3 steps" },
    steps: [
      { vi: "1. Vẽ lại hình ra nháp — đánh dấu góc bằng nhau, cạnh bằng nhau.", en: "1. Redraw the figure on scratch paper; mark equal angles and equal sides." },
      { vi: "2. Liệt kê công thức liên quan (Pythagoras, 30-60-90, sin/cos).", en: "2. List relevant formulas (Pythagoras, 30-60-90, sin/cos)." },
      { vi: "3. Thử số nguyên đẹp trước khi giải đại số phức.", en: "3. Try clean integers before grinding algebra." },
    ],
    example: { vi: "Tam giác vuông cạnh 3-4-? → 5 ngay, không cần tính.", en: "Right triangle 3-4-? → it's 5, no calculation needed." },
    trap: { vi: "Bẫy: hình không vẽ theo tỉ lệ — đừng đo bằng mắt.", en: "Trap: figure not drawn to scale — don't eyeball measurements." },
  },
  {
    match: ["statistics", "data", "mean", "median", "regression"],
    emoji: "📊",
    title: { vi: "Statistics & Data — 3 bước", en: "Statistics & Data — 3 steps" },
    steps: [
      { vi: "1. Xác định loại đo: mean (tổng/đếm), median (giữa), mode (hay nhất).", en: "1. Identify the measure: mean (sum/count), median (middle), mode (most frequent)." },
      { vi: "2. Khi thêm/bớt phần tử lớn nhất–nhỏ nhất → median ÍT đổi, mean đổi nhiều.", en: "2. Adding/removing extremes → median barely shifts, mean shifts a lot." },
      { vi: "3. Đọc trục đồ thị TRƯỚC khi đọc số — đơn vị thường là bẫy.", en: "3. Read graph axes BEFORE the values — units are common traps." },
    ],
    example: { vi: "Dãy {1,2,3,100} → mean=26.5 nhưng median=2.5.", en: "Set {1,2,3,100} → mean=26.5 but median=2.5." },
    trap: { vi: "Bẫy: confuse 'correlation' với 'causation'. SAT phạt nặng.", en: "Trap: confusing 'correlation' with 'causation'. SAT penalises heavily." },
  },
];

/** Find the best-matching strategy card for a lesson by id/title keywords. */
export const findSatStrategyCard = (lessonId: string, lessonTitle: string): SatStrategyCard | null => {
  const hay = `${lessonId} ${lessonTitle}`.toLowerCase();
  for (const card of SAT_STRATEGY_CARDS) {
    if (card.match.some((kw) => hay.includes(kw))) return card;
  }
  return null;
};
