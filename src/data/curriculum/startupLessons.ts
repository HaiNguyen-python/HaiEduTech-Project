/**
 * Startup curriculum - 6 modules · 30 lessons for aspiring tech founders.
 * Content style: bilingual (VI theory + short EN mirror), hyphen only (no em-dash),
 * each lesson has runnable/code-shaped snippet + exercise + 5-question quiz.
 */
import type { ExtendedProgrammingModule, ExtendedProgrammingLesson } from "./types";

type L = ExtendedProgrammingLesson;

const q = (question: string, options: string[], answer: number, explanation: string) => ({
  question, options, answer, explanation,
});

// ---------------------------------------------------------------------------
// Module 1 - Founder Mindset
// ---------------------------------------------------------------------------
const founderLessons: L[] = [
  {
    id: "su-1-1",
    title: "Startup là gì? Startup vs SME vs Corporate",
    titleEn: "What is a startup? Startup vs SME vs Corporate",
    level: 1, difficulty: "beginner",
    theory: `## 1. 🚦 Vấn đề đời thường
Nhiều bạn học sinh nghĩ "mở quán trà sữa" cũng là startup. Steve Blank định nghĩa lại: startup là **tổ chức tạm thời đi tìm mô hình kinh doanh có thể lặp lại và mở rộng**. SME (doanh nghiệp nhỏ) và corporate (doanh nghiệp lớn) đã BIẾT mô hình - họ chỉ tối ưu. Startup còn đang KHÁM PHÁ.

## 2. 💡 Ba khác biệt cốt lõi
| Tiêu chí | Startup | SME | Corporate |
|---|---|---|---|
| Mục tiêu | Tăng trưởng 10x/năm | Ổn định 10-30%/năm | Bảo vệ thị phần |
| Nguồn vốn | VC / Angel / Grant | Vốn chủ + vay | Cổ đông + trái phiếu |
| Rủi ro | 90% thất bại | 30-50% thất bại 5 năm | Thấp |
| Sản phẩm | Chưa có PMF | Đã có khách quen | Portfolio ổn định |

## 3. 🎯 Ví dụ Việt Nam
- **Startup**: VinAI năm 2018 (đang tìm mô hình AI thương mại hoá).
- **SME**: Quán phở gia đình 3 chi nhánh.
- **Corporate**: FPT, Viettel, Vingroup.

## 4. ⚠️ Hiểu nhầm
> - "Startup phải công nghệ": không nhất thiết, nhưng công nghệ giúp scale rẻ.
> - "Startup = khởi nghiệp": khởi nghiệp có thể là SME. Startup là subset có scale + innovation.

## 5. ✅ Best practice
> 💡 Trước khi gọi mình là founder, hãy trả lời: "Mô hình của tôi có scale gấp 100 lần chi phí không?" Nếu không, có thể bạn đang xây SME - vẫn tốt, chỉ khác kênh vốn và cách đo.
`,
    theoryEn: `Startup = temporary organization searching for a repeatable, scalable business model (Steve Blank). SME optimizes a known model; corporates defend market share. Rule of thumb: if revenue does not scale much faster than cost, it is likely an SME, not a startup.`,
    code: `// Quick self-check: is my idea a Startup, SME, or Corporate move?
type IdeaShape = { scalable: boolean; repeatable: boolean; venturable: boolean };
function classify(i: IdeaShape) {
  if (i.scalable && i.repeatable && i.venturable) return "Startup";
  if (i.repeatable && !i.scalable) return "SME";
  return "Project";
}
console.log(classify({ scalable: true, repeatable: true, venturable: true })); // Startup`,
    codeLanguage: "typescript",
    exercise: "Liệt kê 3 ý tưởng của bạn và phân loại: Startup / SME / Project. Giải thích scale factor.",
    exerciseEn: "List 3 of your ideas and classify each. Explain the scale factor.",
    quiz: [
      q("Đặc điểm quan trọng nhất phân biệt startup với SME?", ["Có công nghệ", "Mô hình scale được", "Có website", "Có nhiều nhân viên"], 1, "Scale là yếu tố cốt lõi theo Steve Blank."),
      q("Ai định nghĩa startup là 'organization searching for a repeatable and scalable business model'?", ["Paul Graham", "Steve Blank", "Peter Thiel", "Elon Musk"], 1, "Steve Blank - cha đẻ Customer Development."),
      q("Tỷ lệ startup thất bại điển hình?", ["10%", "30%", "60%", "90%"], 3, "Khoảng 90% startup thất bại trong 10 năm đầu."),
      q("Nguồn vốn phổ biến nhất của startup giai đoạn sớm?", ["Vay ngân hàng", "Angel / VC / Grant", "IPO", "Trái phiếu"], 1, "Ngân hàng ngại rủi ro; startup dùng vốn cổ phần."),
      q("Quán trà sữa 3 chi nhánh gia đình là gì?", ["Startup", "SME", "Corporate", "NGO"], 1, "Không scale phi tuyến - đây là SME."),
    ],
    solutionExplanation: "Startup phải có scale + repeatable + venturable. Nếu bỏ 1 yếu tố, xếp SME hoặc Project.",
  },
  {
    id: "su-1-2",
    title: "Founder mindset: Growth, First-principles, Bias for action",
    titleEn: "Founder mindset",
    level: 1, difficulty: "beginner",
    theory: `## 1. 🚦 Vấn đề
Kỹ năng có thể học, nhưng mindset quyết định bạn sống sót năm đầu tiên hay không. Y Combinator thống kê 80% startup chết vì founder bỏ cuộc, không phải vì thị trường.

## 2. 💡 3 mindset cốt lõi
1. **Growth mindset (Carol Dweck)**: "Tôi chưa giỏi cái này - CHƯA". Não coi thất bại là data.
2. **First-principles thinking (Elon Musk)**: bóc ý tưởng về nguyên lý vật lý/kinh tế gốc, không copy tương tự.
3. **Bias for action (Amazon)**: quyết định 70% thông tin rồi làm; 100% là quá muộn.

## 3. 🎯 Bài tập first-principles
"Pin xe điện đắt vì Tesla đắt" - sai. First-principles: pin = Li + Co + Ni + graphite + shell. Tổng nguyên liệu ~$80/kWh, market ~$600/kWh. Có cửa giảm 5x nếu tự lắp - đó là insight khai sinh Tesla.

## 4. ⚠️ Anti-pattern
> - Chờ ý tưởng "hoàn hảo" mới bắt đầu (paralysis by analysis).
> - So sánh mình với founder trên Forbes (survivorship bias).
> - Đọc 50 sách startup mà không phỏng vấn 1 khách hàng.

## 5. ✅ Thói quen hàng ngày
> 💡 Journaling 5 phút: "Hôm nay tôi học được gì về khách hàng? Tôi đã làm 1 hành động phi hoàn hảo nào?"
`,
    theoryEn: `Three founder mindsets: growth (failure is data), first-principles (unpack to physics/economics), bias for action (decide at 70% info). YC data: 80% of dead startups died because the founder quit, not because of the market.`,
    code: `// Decision framework: should I ship today?
function shipDecision(infoCompleteness: number, reversible: boolean) {
  if (reversible && infoCompleteness >= 0.7) return "SHIP";
  if (!reversible && infoCompleteness < 0.9) return "GATHER MORE DATA";
  return "SHIP";
}
console.log(shipDecision(0.75, true)); // SHIP`,
    codeLanguage: "typescript",
    exercise: "Chọn 1 niềm tin của bạn về ngành công nghệ VN. Bóc first-principles thành 3 giả định nền tảng.",
    exerciseEn: "Pick a belief you hold about VN tech. Break it into 3 first-principle assumptions.",
    quiz: [
      q("First-principles thinking là gì?", ["Copy đối thủ", "Bóc về nguyên lý gốc", "Nghe chuyên gia", "Học MBA"], 1, "Bóc về physics/economics gốc."),
      q("Amazon nói 'Disagree and commit' liên quan mindset nào?", ["Growth", "Bias for action", "Frugality", "Ownership"], 1, "Quyết nhanh, cam kết dù không đồng ý."),
      q("Nguyên nhân số 1 khiến startup chết theo YC?", ["Hết tiền", "Founder bỏ cuộc", "Đối thủ mạnh", "Luật cấm"], 1, "80% do founder quit."),
      q("'Reversible decision' nên?", ["Chờ 100% data", "Ra quyết định ở 70%", "Bỏ phiếu team", "Xin sếp"], 1, "Bezos: reversible = one-way door mở được, ship nhanh."),
      q("Growth mindset khác Fixed mindset ở đâu?", ["Học nhanh", "Coi thất bại là data", "Có bằng cấp", "Nhiều tiền"], 1, "Carol Dweck: thất bại là bước học."),
    ],
    solutionExplanation: "Kết hợp 3 mindset: học liên tục + bóc gốc + hành động nhanh. Đo qua weekly journaling.",
  },
  {
    id: "su-1-3",
    title: "Tìm ý tưởng: Pain point & trend AI/EdTech/Fintech VN 2026",
    titleEn: "Finding ideas: pain points & VN 2026 trends",
    level: 2, difficulty: "beginner",
    theory: `## 1. 🚦 Vấn đề
Ý tưởng KHÔNG đến từ brainstorm phòng máy lạnh - nó đến từ **pain point** bạn hoặc người quen chịu đựng đủ lâu để trả tiền giải quyết.

## 2. 💡 Công thức tìm ý tưởng
> **Idea = (Trend đang lên) × (Pain point cụ thể) × (Insight người khác chưa thấy)**

Trend VN 2026: AI Việt hoá, EdTech K-12, Fintech cho freelancer, Green tech, Elderly care, Micro-SaaS cho SME 5-30 người.

## 3. 🎯 Bài tập "Painstorming"
Trong 30 phút, liệt kê:
1. 20 việc bạn/gia đình ghét làm hàng tuần.
2. Ghi cạnh: "Tôi sẵn sàng trả bao nhiêu/tháng để tự động?"
3. Loại bỏ items < 50k VND/tháng - không đủ market.
4. Còn 3-5 items = candidate ideas.

## 4. ⚠️ Bẫy phổ biến
> - Ý tưởng "hay quá đến mức người khác đã làm" - google kỹ trước khi build.
> - Solution in search of a problem: có công nghệ AI mà đi tìm chỗ dùng.
> - Ý tưởng chỉ giải quyết pain của chính bạn - market có thể quá nhỏ.

## 5. ✅ Best practice
> 💡 Ghi lại **5 pain point/ngày** trong 30 ngày. Cuối tháng review - 3 pain xuất hiện nhiều lần là ứng viên startup.
`,
    theoryEn: `Idea = Trend × Pain × Insight. VN 2026 hot verticals: Vietnamese-first AI, K-12 EdTech, freelancer Fintech, green tech, elderly care, micro-SaaS for 5-30-person SMEs. Do 30-day pain journaling to find repeating pains.`,
    code: `// Pain-point scoring
type Pain = { name: string; frequency: number; wtp: number; severity: number };
function score(p: Pain) { return p.frequency * p.severity * (p.wtp / 100); }
const p = { name: "IELTS Speaking Grading", frequency: 8, wtp: 200000, severity: 9 };
console.log(score(p)); // 144000`,
    codeLanguage: "typescript",
    exercise: "Painstorm 20 pain trong 30 phút. Chấm điểm frequency (1-10), severity (1-10), WTP (VND/tháng). Chọn top 3.",
    exerciseEn: "Painstorm 20 pains in 30 minutes. Score frequency, severity, WTP. Pick top 3.",
    quiz: [
      q("Công thức ý tưởng tốt?", ["Trend × Pain × Insight", "Tiền × Team × Time", "Ý × Idea × Luck", "AI × Data × Cloud"], 0, "Trend × Pain × Insight."),
      q("Trend nào KHÔNG phải hot VN 2026?", ["AI Việt hoá", "K-12 EdTech", "Blockchain gaming", "Micro-SaaS SME"], 2, "Crypto/blockchain gaming đang lạnh sau 2022."),
      q("WTP viết tắt của?", ["Way To Profit", "Willingness To Pay", "Weekly Total Payment", "Working Time Product"], 1, "Willingness To Pay."),
      q("Pain journal nên làm bao lâu?", ["1 ngày", "1 tuần", "30 ngày", "1 năm"], 2, "30 ngày để pattern lặp lại nổi bật."),
      q("'Solution in search of a problem' là?", ["Tốt", "Anti-pattern", "Growth hack", "PMF"], 1, "Anti-pattern: có công nghệ đi tìm chỗ dùng."),
    ],
    solutionExplanation: "Ý tưởng tốt = trend lên + pain đủ đau + insight riêng. Đo bằng frequency × severity × WTP.",
  },
  {
    id: "su-1-4",
    title: "Kiểm chứng ý tưởng: 10-customer-interview rule",
    titleEn: "Idea validation: 10-customer-interview rule",
    level: 2, difficulty: "beginner",
    theory: `## 1. 🚦 Vấn đề
Bạn nghĩ ý tưởng hay - nhưng "hay với bạn" không phải "hay với market". Steve Blank: **Get out of the building**.

## 2. 💡 Nguyên tắc "Mom Test" (Rob Fitzpatrick)
Đừng hỏi "Bạn có mua sản phẩm X không?" (ai cũng nói có để lịch sự). Thay bằng:
1. Hỏi về **quá khứ**, không giả thuyết: "Lần cuối bạn gặp pain này khi nào?"
2. Hỏi về **hành vi cụ thể**: "Bạn đã thử gì để giải quyết?"
3. Hỏi về **tiền thật**: "Bạn đã trả bao nhiêu cho giải pháp hiện tại?"

## 3. 🎯 Cấu trúc phỏng vấn 15 phút
- 2' warm-up: hỏi về ngày làm việc.
- 8' pain digging: 5 whys, không đề cập giải pháp.
- 3' current workflow: họ đang giải quyết bằng cách gì.
- 2' next step: xin phỏng vấn tiếp / refer.

## 4. ⚠️ Bẫy
> - Pitch quá sớm - phỏng vấn trở thành demo, không phải research.
> - Chỉ phỏng vấn bạn bè - họ sẽ khen.
> - Không note quote nguyên văn - mất insight.

## 5. ✅ Số học
> 💡 10 interviews có sức nặng thống kê ban đầu. Nếu 7/10 gật đầu về pain, đi tiếp. < 4/10 - đổi hypothesis.
`,
    theoryEn: `Do 10 customer interviews before writing any code. Use Rob Fitzpatrick's Mom Test: ask about past behavior, concrete actions, and real money spent - never hypothetical future purchases.`,
    code: `// Interview scoring rubric
interface Interview { painMentioned: boolean; triedWorkarounds: string[]; paidExisting: number }
const sample: Interview[] = [
  { painMentioned: true, triedWorkarounds: ["Excel","Zalo"], paidExisting: 0 },
  { painMentioned: true, triedWorkarounds: ["Notion"], paidExisting: 200000 },
];
const validated = sample.filter(i => i.painMentioned && i.triedWorkarounds.length > 0).length;
console.log("Signal score:", validated, "/", sample.length);`,
    codeLanguage: "typescript",
    exercise: "Lên danh sách 10 người phỏng vấn cho ý tưởng top-1. Viết 5 câu hỏi theo Mom Test.",
    exerciseEn: "List 10 interview targets for your top idea. Write 5 Mom-Test questions.",
    quiz: [
      q("Tác giả 'The Mom Test'?", ["Steve Blank", "Rob Fitzpatrick", "Eric Ries", "Peter Thiel"], 1, "Rob Fitzpatrick 2013."),
      q("Câu nào TỐT theo Mom Test?", ["Bạn có mua X không?", "Lần cuối bạn gặp pain này khi nào?", "Bạn thấy ý tưởng thế nào?", "Bạn thích màu gì?"], 1, "Hỏi hành vi quá khứ."),
      q("Số interview tối thiểu trước khi code?", ["3", "5", "10", "50"], 2, "10 - đủ tín hiệu ban đầu."),
      q("Nếu 2/10 nói có pain, nên?", ["Xây MVP", "Đổi hypothesis", "Xin vốn", "Đăng TikTok"], 1, "Không đủ signal."),
      q("Kỹ thuật '5 whys' để?", ["Bán hàng", "Đào sâu pain gốc", "Định giá", "Tuyển team"], 1, "Hỏi 'why' 5 lần để tới nguyên nhân gốc."),
    ],
    solutionExplanation: "10 interviews × Mom Test = validation rẻ, nhanh. Signal 7/10 = go, < 4/10 = pivot.",
  },
  {
    id: "su-1-5",
    title: "Co-founder & team: equity, vesting, roles",
    titleEn: "Co-founder & team: equity, vesting, roles",
    level: 2, difficulty: "intermediate",
    theory: `## 1. 🚦 Vấn đề
65% startup thất bại do co-founder conflict (Noam Wasserman). Chia cổ phần sai từ ngày 1 = bom nổ chậm.

## 2. 💡 Công thức chia cổ phần
Slicing Pie (Mike Moyer) hoặc **equal split + vesting 4 năm cliff 1 năm** là chuẩn Silicon Valley cho team 2-3 người skill tương đương.

**Yếu tố cần cân nhắc**:
- Ý tưởng gốc (10-15%)
- Full-time vs part-time (2x)
- Vốn góp
- Skill khan hiếm (CTO AI vs marketing)
- Nghĩa vụ tương lai

## 3. 🎯 Vesting 4/1
- Cliff 1 năm: không có gì trong 12 tháng đầu; nếu bỏ trước, mất 100%.
- Sau cliff: 25% ngay, còn lại vest 1/48 mỗi tháng.
- Bảo vệ startup khỏi co-founder biến mất tháng thứ 3.

## 4. 🎯 Bộ ba vai trò lý tưởng
- **Hacker (CTO)**: build product.
- **Hustler (CEO)**: sale + fundraise.
- **Hipster (CPO/Designer)**: UX + brand.

## 5. ⚠️ Sai lầm
> - Chia 50/50 không vesting.
> - Anh em ruột không viết founder agreement (mất tình nghĩa lẫn công ty).
> - Cho advisor 5% không vesting.

## 6. ✅ Best practice
> 💡 Trước khi đăng ký công ty, ký **Founder Agreement** có: equity split, vesting, IP assignment, dispute resolution.
`,
    theoryEn: `65% of startups die from co-founder conflict (Wasserman). Standard: equal-ish split, 4-year vesting with 1-year cliff, plus Founders' Agreement covering IP, dispute resolution, and exit.`,
    code: `// Simple vesting calculator
function vestedShares(total: number, monthsIn: number, cliff = 12, vestMonths = 48) {
  if (monthsIn < cliff) return 0;
  return Math.min(total, Math.floor(total * monthsIn / vestMonths));
}
console.log(vestedShares(1000000, 18)); // ~375000`,
    codeLanguage: "typescript",
    exercise: "Draft equity split cho team 3 người: CEO ý tưởng full-time, CTO part-time skill AI khan hiếm, CPO full-time. Justify.",
    exerciseEn: "Draft an equity split for a 3-person team. Justify each %.",
    quiz: [
      q("% startup chết vì co-founder conflict?", ["10%", "25%", "65%", "90%"], 2, "Wasserman: 65%."),
      q("Vesting chuẩn Silicon Valley?", ["1 năm", "2 năm không cliff", "4 năm cliff 1 năm", "10 năm"], 2, "4/1 là chuẩn."),
      q("'Cliff' 1 năm nghĩa là?", ["Rơi cổ phần", "Không nhận gì trong 12 tháng đầu", "Bonus", "Thưởng cuối năm"], 1, "Không vest trong 12 tháng đầu."),
      q("3H trong team startup?", ["Hacker/Hustler/Hipster", "Head/Heart/Hand", "Hard/Happy/Healthy", "Hype/Hold/Hire"], 0, "Hacker CTO / Hustler CEO / Hipster CPO."),
      q("Founder Agreement PHẢI có?", ["Logo", "IP assignment + vesting", "Website", "Card visit"], 1, "IP + vesting + dispute clause."),
    ],
    solutionExplanation: "Không có công thức chia đúng tuyệt đối. Nhưng phải có vesting và founder agreement để bảo vệ startup.",
  },
];

// ---------------------------------------------------------------------------
// Module 2 - Product & MVP
// ---------------------------------------------------------------------------
const productLessons: L[] = [
  {
    id: "su-2-1",
    title: "Design Thinking & Jobs-To-Be-Done",
    titleEn: "Design Thinking & JTBD",
    level: 2, difficulty: "beginner",
    theory: `## 1. 🚦 Vấn đề
Người ta không mua sản phẩm - họ "thuê" sản phẩm để hoàn thành công việc (Job). Milkshake không bán vì ngon; bán vì "job" giết thời gian trên xe buýt sáng.

## 2. 💡 JTBD framework
Job Statement: **When ___ (situation), I want to ___ (motivation), so I can ___ (expected outcome)**.
Ví dụ: "Khi tôi ôn thi IELTS lúc 22h, tôi muốn được chấm Writing ngay, để không mất thói quen viết mỗi tối."

## 3. 🎯 5 bước Design Thinking (Stanford d.school)
1. **Empathize** - phỏng vấn + observe.
2. **Define** - viết POV: "User X cần Y vì insight Z".
3. **Ideate** - HMW ("How Might We..."), 20+ ideas.
4. **Prototype** - low-fi (giấy) → hi-fi.
5. **Test** - user thử, ghi feedback thô.

## 4. ⚠️ Bẫy
> - Empathize bằng cách hỏi bạn bè.
> - Prototype quá đẹp - user không dám phê bình.
> - Test 1 lần rồi tưởng đủ.

## 5. ✅ Best practice
> 💡 Vẽ **customer journey map**: bước, hành động, cảm xúc, pain, cơ hội. Sản phẩm tốt xen vào đúng khoảnh khắc pain.
`,
    theoryEn: `Users hire products to do a Job. Use JTBD statements and Stanford's 5-step design thinking. Prototype low-fidelity so users feel safe to criticize.`,
    code: `// JTBD template
const jtbd = {
  when: "a student revises IELTS at 10pm",
  wants: "get Writing graded instantly",
  soThat: "keep a nightly writing streak",
};
console.log(\`Job: When \${jtbd.when}, I want to \${jtbd.wants}, so I can \${jtbd.soThat}.\`);`,
    codeLanguage: "typescript",
    exercise: "Viết 3 Job Statements cho ý tưởng của bạn. Vẽ customer journey map 6 bước.",
    exerciseEn: "Write 3 JTBD statements. Draw a 6-step journey map.",
    quiz: [
      q("JTBD viết tắt của?", ["Just Take Big Data", "Jobs To Be Done", "Journey Time Base Design", "Junior Team Beta Deploy"], 1, "Jobs To Be Done, Clayton Christensen."),
      q("Bước 1 của Design Thinking?", ["Prototype", "Empathize", "Ship", "Scale"], 1, "Empathize."),
      q("HMW nghĩa là?", ["Help Me Win", "How Might We", "High Margin Way", "Human-Machine Work"], 1, "How Might We - kỹ thuật ideate."),
      q("Câu chuyện milkshake của Christensen dạy?", ["Ngon là quan trọng", "User thuê SP làm 1 job", "Giá rẻ thắng", "Branding thắng"], 1, "Milkshake được 'thuê' để giết thời gian."),
      q("Nên prototype?", ["Đẹp hoàn hảo", "Low-fi trước", "Skip", "Chỉ Figma"], 1, "Low-fi để user dám phê bình."),
    ],
    solutionExplanation: "JTBD giúp thiết kế cho công việc thật của user, không phải feature list.",
  },
  {
    id: "su-2-2",
    title: "Lean Canvas 9 ô",
    titleEn: "Lean Canvas 9 blocks",
    level: 2, difficulty: "beginner",
    theory: `## 1. 🚦 Vấn đề
Business Plan 40 trang không ai đọc. Lean Canvas (Ash Maurya) - 1 trang, 9 ô, 20 phút.

## 2. 💡 9 ô
1. **Problem** (3 pain đầu)
2. **Customer Segments** (Early adopters cụ thể)
3. **Unique Value Proposition**
4. **Solution** (3 tính năng đầu)
5. **Channels** (kênh reach)
6. **Revenue Streams**
7. **Cost Structure**
8. **Key Metrics** (1-3 số)
9. **Unfair Advantage** (không copy được)

## 3. 🎯 Thứ tự điền
Problem → Segments → UVP → Solution → Channels → Revenue → Cost → Metrics → Unfair Advantage.

## 4. ⚠️ Bẫy
> - "Everyone" là segment - vô nghĩa. Chọn early adopter cực hẹp.
> - Unfair advantage = "team giỏi" - không đủ; phải là network effect, data, IP, brand.

## 5. ✅ Best practice
> 💡 Update Lean Canvas mỗi 2 tuần. Version control (v1, v2, v3) để thấy pivot.
`,
    theoryEn: `Ash Maurya's Lean Canvas: 9 blocks on one page. Fill in the order Problem → Segments → UVP → Solution → Channels → Revenue → Cost → Metrics → Unfair Advantage. Update every 2 weeks.`,
    code: `// Lean canvas as data
const canvas = {
  problem: ["IELTS Writing grading slow by 2 days","No specific feedback","Teachers expensive"],
  segments: ["11th-12th grade students targeting 6.5+, studying at night"],
  uvp: "AI grades IELTS Writing in 30 seconds with feedback according to band descriptor",
  solution: ["Auto grading","Feedback per sentence","Progress dashboard"],
  channels: ["TikTok","IELTS study Facebook Group"],
  revenue: ["Freemium 3 essays/month, Pro 99k/month"],
  cost: ["AI API","Hosting","Marketing"],
  metrics: ["WAU","Conversion free->pro"],
  moat: ["Dataset 20k essays graded by teachers with band 8.5+"],
};
console.log(Object.keys(canvas).length); // 9`,
    codeLanguage: "typescript",
    exercise: "Viết Lean Canvas cho ý tưởng của bạn. Đăng lên slack/lớp để nhận feedback.",
    exerciseEn: "Write a Lean Canvas for your idea. Share it for peer feedback.",
    quiz: [
      q("Lean Canvas có mấy ô?", ["5", "7", "9", "12"], 2, "9 ô."),
      q("Tác giả?", ["Alex Osterwalder", "Ash Maurya", "Eric Ries", "Steve Blank"], 1, "Ash Maurya adapted from BMC."),
      q("Ô đầu tiên nên điền?", ["Solution", "Problem", "Revenue", "Team"], 1, "Problem trước."),
      q("Unfair advantage TỐT?", ["Team hardworking", "Dataset độc quyền", "Có website", "Có logo"], 1, "Moat khó copy."),
      q("Nên update Lean Canvas?", ["Mỗi năm", "Mỗi 2 tuần", "Không cần", "Khi IPO"], 1, "Mỗi sprint 2 tuần."),
    ],
    solutionExplanation: "Lean Canvas là living document. Version hoá để thấy pivot.",
  },
  {
    id: "su-2-3",
    title: "MVP: từ Figma đến No-code đến Code",
    titleEn: "MVP: Figma to No-code to Code",
    level: 2, difficulty: "intermediate",
    theory: `## 1. 🚦 Vấn đề
MVP không phải "sản phẩm xấu". MVP là **thí nghiệm nhỏ nhất để trả lời câu hỏi rủi ro nhất**.

## 2. 💡 Thang MVP (Eric Ries + biến thể)
1. **Landing page test**: bán trước khi build (Dropbox video 2007).
2. **Concierge MVP**: làm dịch vụ tay để hiểu quy trình.
3. **Wizard of Oz**: user tưởng AI, thực ra người ngồi trả lời.
4. **No-code MVP**: Lovable / Bubble / Softr - 1 tuần có app.
5. **Code MVP**: khi biết chắc PMF gần đến.

## 3. 🎯 Ví dụ VN
- **ELSA Speak** phiên bản đầu: script Python chấm phát âm, không có app.
- **Base.vn**: dùng Airtable + Zapier trước khi tự viết.

## 4. ⚠️ Bẫy
> - Build 6 tháng rồi mới cho user thử.
> - "MVP xấu quá không ai xài" - nếu pain đủ đau, họ chịu xấu (Craigslist).
> - Feature creep: MVP có 20 màn hình.

## 5. ✅ Best practice
> 💡 MVP chỉ được có **1 job to be done**. Cắt mọi feature không phục vụ job đó.
`,
    theoryEn: `MVP is the smallest experiment that answers the riskiest question. Ladder: landing page → concierge → wizard-of-Oz → no-code → code. Ship with a single job.`,
    code: `// MVP scope checker
function isMinimum(features: string[], coreJob: string) {
  return features.every(f => f.toLowerCase().includes(coreJob.toLowerCase()));
}
console.log(isMinimum(["Grade IELTS","Login","Chat"], "IELTS")); // false -> cut down`,
    codeLanguage: "typescript",
    exercise: "Liệt kê 10 feature mơ ước. Chọn 1 job chính. Đánh dấu chỉ 3 feature buộc phải có để phục vụ job đó.",
    exerciseEn: "List 10 dream features. Pick a core job. Keep only 3 features that serve it.",
    quiz: [
      q("MVP nghĩa là?", ["Most Valuable Player", "Minimum Viable Product", "Maximum Value Prototype", "Master Version Public"], 1, "Minimum Viable Product."),
      q("Dropbox 2007 dùng MVP dạng?", ["No-code", "Concierge", "Landing video", "Wizard-of-Oz"], 2, "Video demo trước khi có sản phẩm."),
      q("Concierge MVP là?", ["Làm dịch vụ bằng tay", "Auto AI", "Chatbot", "Landing"], 0, "Founder tự làm bằng tay để học quy trình."),
      q("MVP nên có bao nhiêu core job?", ["1", "3", "5", "Nhiều"], 0, "Đúng 1 để giữ scope hẹp."),
      q("Công cụ no-code phổ biến?", ["Lovable/Bubble", "React/Vue", "TensorFlow", "Kubernetes"], 0, "No-code = Lovable, Bubble, Softr."),
    ],
    solutionExplanation: "MVP = 1 job, 3 features, càng rẻ càng tốt. Ship trong tuần, không tháng.",
  },
  {
    id: "su-2-4",
    title: "UX/UI cho founder không phải designer",
    titleEn: "UX/UI for non-designer founders",
    level: 2, difficulty: "intermediate",
    theory: `## 1. 🚦 Vấn đề
Founder không cần trở thành designer, nhưng phải biết đủ để không giết sản phẩm.

## 2. 💡 5 nguyên tắc sống còn
1. **Hierarchy**: 1 primary action / màn hình. Nút chính nổi bật nhất.
2. **Whitespace**: đừng nhồi. 40-60% khoảng trắng.
3. **Contrast**: text > 4.5:1 với nền (WCAG AA).
4. **Consistency**: cùng button style, cùng spacing scale (4/8/16/24/32).
5. **Feedback**: mọi action có loading/success/error state.

## 3. 🎯 Font & màu
- 1 font family (Inter, SF Pro). Tối đa 2.
- 1 primary color + 1 accent. 3-5 neutrals grey.
- Free tool: **Coolors.co**, **Realtime Colors**.

## 4. ⚠️ Bẫy
> - Copy Apple: dark + trong suốt - thiếu contrast.
> - Icon không label - user đoán.
> - Modal chồng modal.

## 5. ✅ Best practice
> 💡 Chạy **5-second test**: cho user thấy trang 5 giây → hỏi "Sản phẩm này làm gì?". Nếu không trả lời được, sửa hero.
`,
    theoryEn: `Non-designer rules: 1 primary action per screen, generous whitespace, WCAG AA contrast, consistent spacing scale (4/8/16), and feedback on every action. Run a 5-second test.`,
    code: `// Spacing tokens
const space = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, "2xl": 48 };
function pad(size: keyof typeof space) { return \`\${space[size]}px\`; }
console.log(pad("md")); // 16px`,
    codeLanguage: "typescript",
    exercise: "Chọn 1 landing page của bạn/idol. Chấm 5 nguyên tắc trên (1-5). Đề xuất 3 sửa đổi cụ thể.",
    exerciseEn: "Grade a landing page on the 5 principles. Propose 3 concrete fixes.",
    quiz: [
      q("Contrast tối thiểu WCAG AA?", ["1.5:1", "3:1", "4.5:1", "10:1"], 2, "4.5:1 cho normal text."),
      q("Spacing scale phổ biến?", ["3/6/9", "4/8/16/24", "5/10/15", "7/14/21"], 1, "4/8/16 hoặc bội số 8."),
      q("Một màn hình nên có mấy primary CTA?", ["1", "3", "5", "Không giới hạn"], 0, "1 để tránh phân tâm."),
      q("5-second test dùng để?", ["Test performance", "Test hero comprehension", "Test bug", "Test API"], 1, "User nhìn 5s có hiểu SP không."),
      q("Icon nên?", ["Không label", "Có label", "3D", "Neon"], 1, "Icon + label để rõ nghĩa."),
    ],
    solutionExplanation: "5 nguyên tắc + 5-second test là bộ tối giản đủ cho founder không design.",
  },
  {
    id: "su-2-5",
    title: "North Star Metric & AARRR funnel",
    titleEn: "North Star Metric & AARRR",
    level: 3, difficulty: "intermediate",
    theory: `## 1. 🚦 Vấn đề
"Đo hết mọi thứ" = không đo gì. Cần **1 chỉ số duy nhất** phản ánh giá trị tạo cho user.

## 2. 💡 North Star Metric (NSM)
- Airbnb: nights booked.
- Spotify: time listened.
- WhatsApp: messages sent.
- ELSA Speak: minutes of speaking practice.

**Tiêu chí NSM tốt**: (1) đo giá trị user nhận, (2) leading indicator của revenue, (3) team hiểu ngay.

## 3. 🎯 AARRR (Dave McClure)
| Bước | Ý nghĩa | Ví dụ metric |
|---|---|---|
| **A**cquisition | User đến từ đâu | CAC, click-through |
| **A**ctivation | Aha moment | % user hoàn thành onboarding |
| **R**etention | Quay lại | D1/D7/D30 retention |
| **R**evenue | Trả tiền | ARPU, conversion |
| **R**eferral | Giới thiệu | K-factor, NPS |

## 4. ⚠️ Bẫy
> - Vanity metrics: page views, downloads.
> - NSM đổi mỗi tháng - team lạc hướng.

## 5. ✅ Best practice
> 💡 Dashboard 1 màn hình: NSM + 5 AARRR metric. Review weekly.
`,
    theoryEn: `North Star Metric captures the value users get and predicts revenue. Pair with AARRR (Acquisition, Activation, Retention, Revenue, Referral). Avoid vanity metrics like raw downloads.`,
    code: `// AARRR dashboard row
const week = {
  nsm_minutes_practiced: 12400,
  acquisition_signups: 320,
  activation_pct: 0.42,
  d7_retention: 0.28,
  paid_users: 41,
  k_factor: 0.6,
};
console.log("NSM/user:", week.nsm_minutes_practiced / week.acquisition_signups);`,
    codeLanguage: "typescript",
    exercise: "Chọn NSM cho ý tưởng của bạn. Viết công thức tính. Định nghĩa 5 metric AARRR.",
    exerciseEn: "Pick your NSM. Write its formula. Define 5 AARRR metrics.",
    quiz: [
      q("NSM Airbnb?", ["Downloads", "Nights booked", "Listings", "Reviews"], 1, "Nights booked."),
      q("A đầu tiên trong AARRR?", ["Activation", "Acquisition", "Amazing", "Auth"], 1, "Acquisition."),
      q("Vanity metric?", ["Retention D7", "Page views", "MRR", "LTV"], 1, "Page views không phản ánh giá trị."),
      q("D7 retention là?", ["% user còn dùng sau 7 giờ", "% user còn dùng ngày 7", "1 tuần active", "7 downloads"], 1, "% user quay lại vào ngày thứ 7."),
      q("K-factor đo?", ["Referral virality", "Cost", "CAC", "MRR"], 0, "Số user mới do 1 user hiện tại kéo về."),
    ],
    solutionExplanation: "1 NSM + AARRR = bộ đo chuẩn giai đoạn sớm.",
  },
];

// ---------------------------------------------------------------------------
// Module 3 - Business Model & Market
// ---------------------------------------------------------------------------
const bizLessons: L[] = [
  {
    id: "su-3-1",
    title: "Business Model Canvas & Revenue streams",
    titleEn: "Business Model Canvas & revenue streams",
    level: 3, difficulty: "intermediate",
    theory: `## 1. 🚦 Vấn đề
"Bạn kiếm tiền thế nào?" - câu hỏi đầu tiên investor hỏi. Trả lời mơ hồ = out.

## 2. 💡 9 mô hình doanh thu phổ biến
1. **SaaS subscription** (Notion, Base.vn).
2. **Freemium** (Zoom, Canva).
3. **Marketplace commission** (Shopee, Grab).
4. **Transaction fee** (VNPay).
5. **Advertising** (Google, TikTok).
6. **Licensing / API** (OpenAI, Stripe).
7. **Hardware + service** (Apple, Tesla).
8. **Data / insights** (Nielsen).
9. **B2B enterprise** (Salesforce, MISA).

## 3. 🎯 Ma trận chọn model
- Volume cao, giá thấp → Freemium/Ad.
- Volume thấp, giá cao → Enterprise.
- Marketplace hai bên → Commission.
- Sản phẩm mở rộng chức năng → SaaS tier.

## 4. ⚠️ Bẫy
> - Chọn "sẽ tính sau" - VC không đầu tư.
> - Đa doanh thu ngay từ đầu - phân tán.
> - Ad-based với < 100k DAU - bất khả thi ở VN.

## 5. ✅ Best practice
> 💡 Chọn 1 mô hình chính + 1 secondary tiềm năng. Test pricing với 10 khách trước khi setup Stripe.
`,
    theoryEn: `9 common revenue models: SaaS, freemium, marketplace commission, transaction fee, ads, licensing/API, hardware+service, data, B2B enterprise. Match model to volume × price economics.`,
    code: `type Model = "SaaS"|"Freemium"|"Marketplace"|"Ads"|"Enterprise";
function suggest(volume: number, price: number): Model {
  if (volume > 1_000_000 && price < 5) return "Ads";
  if (volume > 100_000 && price < 20) return "Freemium";
  if (volume < 1000 && price > 500) return "Enterprise";
  return "SaaS";
}
console.log(suggest(50000, 15)); // Freemium`,
    codeLanguage: "typescript",
    exercise: "Chọn 2 mô hình phù hợp cho ý tưởng của bạn. Justify bằng volume × price.",
    exerciseEn: "Pick 2 revenue models for your idea. Justify with volume × price.",
    quiz: [
      q("Grab dùng model?", ["SaaS", "Marketplace commission", "Hardware", "Ads"], 1, "Ăn % mỗi chuyến."),
      q("Zoom dùng?", ["Freemium", "Enterprise thuần", "Ads", "Marketplace"], 0, "Free + Pro tier."),
      q("Với 500 khách hàng B2B giá $1000/tháng nên chọn?", ["Ads", "Enterprise SaaS", "Freemium", "Marketplace"], 1, "Volume thấp × giá cao = enterprise."),
      q("Ad model cần?", ["Volume rất cao", "Giá rất cao", "1-1 sales", "Hardware"], 0, "Cần DAU lớn để CPM có ý nghĩa."),
      q("Nên có mấy revenue model chính lúc đầu?", ["1", "3", "5", "Càng nhiều càng tốt"], 0, "1 để focus."),
    ],
    solutionExplanation: "Model = f(volume, price). Chọn 1 chính, 1 backup.",
  },
  {
    id: "su-3-2",
    title: "TAM SAM SOM cho thị trường VN/SEA",
    titleEn: "TAM-SAM-SOM for VN/SEA market",
    level: 3, difficulty: "intermediate",
    theory: `## 1. 🚦 Vấn đề
"Thị trường 100 tỷ USD" - VC nghe xong bĩu môi. Cần **TAM/SAM/SOM** cụ thể, có công thức bottom-up.

## 2. 💡 Định nghĩa
- **TAM (Total Addressable Market)**: nếu 100% người có nhu cầu mua sản phẩm bạn.
- **SAM (Serviceable Available)**: phần TAM bạn có thể phục vụ (kênh, ngôn ngữ, quy định).
- **SOM (Serviceable Obtainable)**: phần thực tế 3 năm đầu (1-10% SAM).

## 3. 🎯 Tính bottom-up
> IELTS EdTech VN:
> - TAM = 500k thí sinh IELTS/năm VN × 3M VND/năm phí = **1.500 tỷ VND**.
> - SAM = 200k thí sinh 15-22 tuổi ở thành phố lớn × 3M = **600 tỷ VND**.
> - SOM (Year 3) = 3% SAM = **18 tỷ VND**.

## 4. ⚠️ Bẫy
> - Top-down: "1% của 100 triệu dân" - VC ghét.
> - Bao gồm cả TAM toàn cầu khi bạn chỉ ship VN.

## 5. ✅ Best practice
> 💡 Show cả TAM SEA (600M dân) để VC thấy expansion path.
`,
    theoryEn: `TAM/SAM/SOM built bottom-up: (# customers) × (price) × (frequency). Include a SEA-wide TAM to show expansion room.`,
    code: `function tamSamSom(customers: number, price: number, samShare: number, somShare: number) {
  const tam = customers * price;
  const sam = tam * samShare;
  const som = sam * somShare;
  return { tam, sam, som };
}
console.log(tamSamSom(500000, 3_000_000, 0.4, 0.03));`,
    codeLanguage: "typescript",
    exercise: "Tính TAM/SAM/SOM cho ý tưởng của bạn ở VN. Thử scale lên SEA.",
    exerciseEn: "Compute TAM/SAM/SOM for your idea. Extend to SEA.",
    quiz: [
      q("TAM là?", ["Total Addressable Market", "Team Alignment Metric", "Total Ads Money", "Top Aggregated Market"], 0, "TAM."),
      q("Bottom-up nghĩa?", ["Từ dân số toàn cầu", "Từ số khách cụ thể × giá", "Từ báo cáo Gartner", "Từ ước lượng"], 1, "Đi từ đơn vị nhỏ."),
      q("SOM năm 3 hợp lý?", ["50% SAM", "20% SAM", "1-10% SAM", "100% SAM"], 2, "1-10% là realistic."),
      q("SAM khác TAM ở?", ["Ngôn ngữ/kênh/quy định", "Không khác", "SAM > TAM", "SAM đơn vị EUR"], 0, "SAM = phần bạn có thể phục vụ."),
      q("VC ghét cách trình bày nào?", ["Bottom-up chi tiết", "Top-down '1% của 100 triệu'", "SEA expansion", "SOM Year 3"], 1, "Top-down lười biếng."),
    ],
    solutionExplanation: "TAM/SAM/SOM bottom-up chứng minh bạn hiểu thị trường thật.",
  },
  {
    id: "su-3-3",
    title: "Định giá sản phẩm",
    titleEn: "Pricing strategy",
    level: 3, difficulty: "intermediate",
    theory: `## 1. 🚦 Vấn đề
Định giá là quyết định marketing quan trọng nhất - ảnh hưởng CAC, LTV, positioning cùng lúc.

## 2. 💡 3 chiến lược
1. **Cost-plus**: cost × (1 + margin). Đơn giản, thiếu insight.
2. **Competitor-based**: theo đối thủ ± 10-20%.
3. **Value-based**: dựa trên giá trị user nhận. Ví dụ ELSA tiết kiệm 3 triệu VND/tháng giáo viên → giá 199k/tháng là 15x ROI.

## 3. 🎯 Tiered pricing (Notion, Slack)
| Tier | Đối tượng | Giá | Feature khoá |
|---|---|---|---|
| Free | Học sinh cá nhân | 0 | 5 bài/tháng |
| Pro | Ôn thi nghiêm túc | 99k/tháng | Unlimited + AI feedback |
| Team | Trung tâm | 500k/tháng/5 users | Dashboard giáo viên |

## 4. ⚠️ Bẫy
> - Giá tròn 100k - nghiên cứu cho thấy 99k > 100k về conversion.
> - Free tier quá rộng - không ai upgrade.
> - Đổi giá tuần/tuần - user mất tin tưởng.

## 5. ✅ Van Westendorp
Hỏi 4 câu để tìm price range:
1. Giá quá rẻ tới mức nghi ngờ chất lượng?
2. Giá rẻ = hời?
3. Giá bắt đầu đắt?
4. Giá quá đắt không mua?
`,
    theoryEn: `Three pricing strategies: cost-plus, competitor-based, value-based (best). Use tiered pricing. Test range with Van Westendorp's 4 questions.`,
    code: `// Value-based pricing helper
function priceFromValue(valuePerMonthVND: number, capturePct = 0.1) {
  return Math.round(valuePerMonthVND * capturePct / 1000) * 1000;
}
console.log(priceFromValue(3_000_000, 0.07)); // ~210,000`,
    codeLanguage: "typescript",
    exercise: "Định giá 3 tier cho ý tưởng của bạn. Chạy Van Westendorp trên 10 người.",
    exerciseEn: "Set 3-tier pricing. Run Van Westendorp on 10 people.",
    quiz: [
      q("Chiến lược pricing MẠNH nhất?", ["Cost-plus", "Competitor", "Value-based", "Ngẫu nhiên"], 2, "Value-based capture nhiều giá trị nhất."),
      q("Van Westendorp có mấy câu?", ["2", "4", "6", "10"], 1, "4 câu."),
      q("99k > 100k vì?", ["Rẻ hơn thật", "Charm pricing psychology", "SEO tốt hơn", "Ngẫu nhiên"], 1, "Charm pricing left-digit effect."),
      q("Free tier nên?", ["Rất rộng", "Đủ tạo aha, không đủ giải quyết hết", "Không có", "Trả tiền để dùng free"], 1, "Aha but not full solve."),
      q("Đổi giá tuần/tuần?", ["Tốt", "Xấu - phá tin cậy", "Bắt buộc", "Không ảnh hưởng"], 1, "Phá trust."),
    ],
    solutionExplanation: "Value-based + tiered + charm pricing + test Van Westendorp = pricing chuẩn founder.",
  },
  {
    id: "su-3-4",
    title: "Unit Economics: CAC, LTV, Payback, Gross margin",
    titleEn: "Unit Economics: CAC, LTV, payback, gross margin",
    level: 3, difficulty: "intermediate",
    theory: `## 1. 🚦 Vấn đề
Startup có unit economics dương = scale được. Âm = càng scale càng chết.

## 2. 💡 Công thức
- **CAC** = tổng chi marketing/sale ÷ số user mới.
- **LTV** = ARPU × gross margin × 1/churn.
- **LTV/CAC** > 3 là healthy; > 5 excellent.
- **Payback period** = CAC / (ARPU × margin). < 12 tháng consumer, < 18 B2B.

## 3. 🎯 Ví dụ
- ARPU = 99k/tháng.
- Gross margin = 80% (chi phí API + hosting).
- Churn = 8%/tháng → lifetime = 12.5 tháng.
- LTV = 99k × 0.8 × 12.5 = **990k**.
- CAC = 200k (TikTok).
- LTV/CAC = **4.95** ✅.
- Payback = 200k / (99k × 0.8) = **2.5 tháng** ✅.

## 4. ⚠️ Bẫy
> - Ignore churn cho SaaS.
> - CAC không tính lương sales.
> - LTV vô hạn ("chắc user ở lại mãi").

## 5. ✅ Best practice
> 💡 Track weekly. Nếu LTV/CAC < 3 sau 3 tháng, sửa product hoặc CAC channel.
`,
    theoryEn: `Unit economics: CAC = spend/new users, LTV = ARPU × margin / churn. Target LTV/CAC ≥ 3, payback ≤ 12-18 months.`,
    code: `function unitEcon(arpu: number, margin: number, churn: number, cac: number) {
  const lifetime = 1 / churn;
  const ltv = arpu * margin * lifetime;
  const payback = cac / (arpu * margin);
  return { ltv, ratio: ltv / cac, payback };
}
console.log(unitEcon(99000, 0.8, 0.08, 200000));`,
    codeLanguage: "typescript",
    exercise: "Tính unit economics cho ý tưởng của bạn ở 3 kịch bản: pessimistic, base, optimistic.",
    exerciseEn: "Compute unit economics under 3 scenarios.",
    quiz: [
      q("LTV/CAC tối thiểu healthy?", ["1", "2", "3", "10"], 2, "3 là ngưỡng healthy."),
      q("Payback period lý tưởng consumer?", ["24 tháng", "< 12 tháng", "< 3 tháng", "0"], 1, "Consumer < 12 tháng."),
      q("Nếu churn 10%/tháng, lifetime?", ["1 tháng", "10 tháng", "100 tháng", "0"], 1, "1/0.1 = 10 tháng."),
      q("CAC bao gồm?", ["Chỉ ads", "Marketing + sales lương", "Chỉ Google Ads", "Chỉ TikTok"], 1, "Cả lương sales."),
      q("Gross margin 80% nghĩa?", ["Lãi 80k trên mỗi 100k doanh thu", "Lãi 20k", "Không lãi", "Không rõ"], 0, "Sau chi phí trực tiếp còn 80%."),
    ],
    solutionExplanation: "Unit economics là bảng số founder phải thuộc lòng.",
  },
  {
    id: "su-3-5",
    title: "Go-To-Market cho AI/EdTech VN",
    titleEn: "GTM for AI/EdTech in Vietnam",
    level: 3, difficulty: "intermediate",
    theory: `## 1. 🚦 Vấn đề
Sản phẩm tốt + GTM yếu = chết. VN có kênh đặc thù: TikTok, Zalo, KOL/KOC, group Facebook.

## 2. 💡 5 kênh chính cho EdTech VN
1. **TikTok organic**: video 15-30s dạy 1 mẹo. CAC ~50k/user.
2. **Facebook Group ôn thi**: nurture, chia sẻ giá trị.
3. **KOC micro (10k-50k follower)**: rẻ hơn KOL, trust cao.
4. **B2B trường/trung tâm**: ARPU cao, sales cycle 3-6 tháng.
5. **Referral trong app**: mời bạn giảm 30%.

## 3. 🎯 Kịch bản 90 ngày đầu
- Tuần 1-4: 3 video TikTok/tuần + 1 group tự lập.
- Tuần 5-8: partner 5 KOC.
- Tuần 9-12: pitch 3 trung tâm.

## 4. ⚠️ Bẫy
> - Đổ tiền Google Ads ngay - đắt cho consumer VN.
> - Bỏ Zalo OA - kênh CRM rẻ nhất VN.
> - Copy content Mỹ - không hợp văn hoá.

## 5. ✅ Best practice
> 💡 Chạy 3 kênh cùng lúc, đo CAC riêng. Sau 30 ngày, cắt kênh CAC > 3x LTV/tháng.
`,
    theoryEn: `Vietnam GTM channels: TikTok organic, ôn-thi Facebook Groups, micro-KOC, B2B schools, in-app referral. Run 3 channels in parallel, cut the losers after 30 days.`,
    code: `type Channel = { name: string; cac: number; volume: number };
const channels: Channel[] = [
  { name: "TikTok", cac: 50000, volume: 200 },
  { name: "KOC", cac: 120000, volume: 80 },
  { name: "GoogleAds", cac: 400000, volume: 30 },
];
const winner = channels.sort((a,b)=>a.cac-b.cac)[0];
console.log(winner);`,
    codeLanguage: "typescript",
    exercise: "Lên kế hoạch 90 ngày cho 3 kênh GTM. Ngân sách, KPI mỗi kênh.",
    exerciseEn: "Plan 90 days across 3 GTM channels with budgets and KPIs.",
    quiz: [
      q("Kênh CAC rẻ nhất consumer VN thường?", ["Google Ads", "TikTok organic", "TV", "Billboard"], 1, "TikTok organic 2024-2026."),
      q("KOC khác KOL?", ["Follower nhỏ hơn, trust cao", "Follower lớn hơn", "Diễn viên", "Chỉ B2B"], 0, "Key Opinion Consumer - micro-influencer."),
      q("Sales cycle B2B trường học?", ["1 tuần", "3-6 tháng", "2 năm", "1 ngày"], 1, "Ngân sách năm học."),
      q("Zalo OA dùng để?", ["CRM + push", "Ads", "Video dài", "Livestream"], 0, "CRM và broadcast."),
      q("Nên chạy mấy kênh 90 ngày đầu?", ["1", "3", "10", "0"], 1, "3 để so sánh CAC."),
    ],
    solutionExplanation: "GTM VN = mix TikTok + Zalo + KOC + B2B, đo CAC theo kênh.",
  },
];

// ---------------------------------------------------------------------------
// Module 4 - Fundraising & Finance
// ---------------------------------------------------------------------------
const fundLessons: L[] = [
  {
    id: "su-4-1",
    title: "Bootstrapping vs VC vs Angel vs Grant",
    titleEn: "Bootstrap vs VC vs Angel vs Grant",
    level: 3, difficulty: "intermediate",
    theory: `## 1. 🚦 Vấn đề
Không phải startup nào cũng nên gọi vốn. Basecamp, Mailchimp bootstrap tới tỷ đô.

## 2. 💡 4 con đường
| | Bootstrap | Angel | VC | Grant |
|---|---|---|---|---|
| Vốn | Của mình | 100k-500k$ | 500k$-nhiều triệu | Miễn phí |
| Dilution | 0% | 5-15% | 20-30%/vòng | 0% |
| Áp lực scale | Thấp | TB | Rất cao | Thấp |
| Kỳ vọng exit | Không cần | Cần | Bắt buộc | Không |
| VN 2026 | Base.vn giai đoạn đầu | Do Ventures Angel | 500 Global, Ascend | NIC, JICA, EU H2020 |

## 3. 🎯 Khi nào chọn gì?
- Ý tưởng cần scale nhanh, đốt tiền để giành thị phần → **VC**.
- Sản phẩm profitable từ tháng 6 → **Bootstrap**.
- Cần credibility ban đầu → **Angel** (kèm mentor).
- Deep tech / xã hội → **Grant** (NIC, EU).

## 4. ⚠️ Bẫy
> - Gọi VC quá sớm → dilute quá nhiều.
> - Bootstrap khi thị trường winner-take-all → thua.
> - Nhận grant với ràng buộc IP không thoát được.

## 5. ✅ Best practice
> 💡 Kết hợp: bootstrap 6-12 tháng để có traction, angel ở seed, VC ở Series A.
`,
    theoryEn: `4 paths: bootstrap, angel, VC, grant. Choose by (a) speed of scale required, (b) willingness to dilute, (c) exit expectation.`,
    code: `type Path = "bootstrap"|"angel"|"vc"|"grant";
function suggestPath(scaleUrgency: number, profitableIn6mo: boolean, deepTech: boolean): Path {
  if (deepTech) return "grant";
  if (profitableIn6mo && scaleUrgency < 5) return "bootstrap";
  if (scaleUrgency > 7) return "vc";
  return "angel";
}
console.log(suggestPath(8, false, false)); // vc`,
    codeLanguage: "typescript",
    exercise: "Chọn con đường cho ý tưởng của bạn. Justify 3 lý do.",
    exerciseEn: "Pick a funding path with 3 justifications.",
    quiz: [
      q("Basecamp gọi vốn?", ["Angel", "VC", "Grant", "Bootstrap toàn bộ"], 3, "Bootstrap, không VC."),
      q("Dilution seed round điển hình?", ["1%", "5%", "20%", "50%"], 2, "15-25% cho seed."),
      q("Grant VN cho startup deep tech?", ["NIC", "Shopee", "Techcombank", "Vinamilk"], 0, "National Innovation Center."),
      q("VC kỳ vọng?", ["Không exit", "IPO/M&A trong 7-10 năm", "Chia cổ tức", "Bán ngay"], 1, "10x return qua IPO/M&A."),
      q("Angel VN nổi tiếng?", ["Do Ventures", "Google Ventures", "SoftBank", "Sequoia"], 0, "Do Ventures của Dzung Nguyen."),
    ],
    solutionExplanation: "Không có 1 con đường đúng - chọn theo tốc độ scale + profit + deep tech.",
  },
  {
    id: "su-4-2",
    title: "Cap Table 101 & Dilution",
    titleEn: "Cap Table 101 & dilution",
    level: 4, difficulty: "advanced",
    theory: `## 1. 🚦 Vấn đề
Cap Table = danh sách ai sở hữu bao nhiêu % công ty. Sai 1 dòng = kiện tụng 10 năm.

## 2. 💡 Cấu trúc cap table
- **Founders** (chia đều/vesting).
- **ESOP** (Employee Stock Option Pool) 10-15%.
- **Angel/Seed investors**.
- **Advisors** 0.25-1% mỗi người.

## 3. 🎯 Ví dụ dilution
Bắt đầu:
- 2 founders: 45% + 45% = 90%.
- ESOP: 10%.

Sau seed round $500k @ $4M pre-money = $4.5M post:
- New investors: 500/4500 = **11.1%**.
- Founders diluted: 45% × (1-0.111) = **40%** mỗi người.
- ESOP: 10% × 0.889 = 8.9%.

Sau Series A ($3M @ $12M pre = $15M post):
- Founders: 40% × (15-3)/15 = **32%** mỗi người.

## 4. ⚠️ Bẫy
> - Cho advisor 5% không vesting → dilution ngay.
> - ESOP tạo sau round → founder bị dilute thêm.
> - Không có drag-along/tag-along clause.

## 5. ✅ Best practice
> 💡 Dùng Carta/Pulley/spreadsheet Google. Cập nhật sau mỗi round.
`,
    theoryEn: `Cap table = ownership registry. Model dilution before signing term sheet. Standard: create ESOP pre-money so founders bear that dilution.`,
    code: `// Post-money dilution calculator
function dilute(founders: number, esop: number, roundSize: number, preMoney: number) {
  const post = preMoney + roundSize;
  const investorPct = roundSize / post;
  return {
    founders: founders * (1 - investorPct),
    esop: esop * (1 - investorPct),
    investors: investorPct,
  };
}
console.log(dilute(0.9, 0.1, 500_000, 4_000_000));`,
    codeLanguage: "typescript",
    exercise: "Model cap table sau 3 round (seed, A, B) cho startup của bạn. Founders còn > 30% sau Series B?",
    exerciseEn: "Model 3 rounds. Founders > 30% after Series B?",
    quiz: [
      q("Cap table là gì?", ["Bảng menu", "Bảng sở hữu %", "Bảng CAC", "Bảng revenue"], 1, "Ownership table."),
      q("ESOP nghĩa?", ["Employee Stock Option Pool", "Extra SaaS Onboarding Plan", "Executive Sales Plan", "Early Startup Onboarding"], 0, "Pool cổ phần cho nhân viên."),
      q("Pre-money vs post-money?", ["Không khác", "Post = pre + round", "Post < pre", "Post = pre × 2"], 1, "Post-money = pre + round size."),
      q("Advisor equity điển hình?", ["10%", "0.25-1%", "5%", "20%"], 1, "0.25-1% có vesting 2 năm."),
      q("Nên tạo ESOP?", ["Sau round", "Trước round (pre-money)", "Không cần", "Sau IPO"], 1, "Trước để founders chịu dilution."),
    ],
    solutionExplanation: "Cap table là spreadsheet quan trọng nhất của founder.",
  },
  {
    id: "su-4-3",
    title: "Pitch Deck 10 slide",
    titleEn: "10-slide pitch deck",
    level: 3, difficulty: "intermediate",
    theory: `## 1. 🚦 Vấn đề
VC xem 500 deck/tháng. Nếu 10 slide đầu không convincing, bạn out.

## 2. 💡 Chuẩn 10 slide (YC + Sequoia)
1. **Cover**: tên + tagline 1 dòng.
2. **Problem**: pain cụ thể + số.
3. **Solution**: giải pháp + demo screenshot.
4. **Market**: TAM/SAM/SOM.
5. **Product**: how it works.
6. **Traction**: metric + hockey stick.
7. **Business model**: pricing + unit economics.
8. **Competition**: 2x2 matrix, bạn ở góc phải.
9. **Team**: 3-5 người, why unique.
10. **Ask**: raise bao nhiêu, dùng vào đâu, milestone.

## 3. 🎯 Design principles
- 30 chữ / slide.
- 1 concept / slide.
- Font >= 24pt.
- Không bullet dài; dùng hình + số.

## 4. ⚠️ Bẫy
> - Slide "vision 2050 chinh phục vũ trụ".
> - Slide competition trống "chưa có đối thủ" - VC nghĩ không có market.
> - Financial projection 5 năm hockey stick không có giả định.

## 5. ✅ Best practice
> 💡 Version deck: 3-min deck (email), 10-min deck (meeting), 30-min data room deck.
`,
    theoryEn: `10-slide standard: Cover, Problem, Solution, Market, Product, Traction, Model, Competition, Team, Ask. Keep 30 words per slide, 24pt+ font.`,
    code: `const deckOutline = [
  "Cover","Problem","Solution","Market","Product",
  "Traction","Model","Competition","Team","Ask"
];
console.log("Slide count:", deckOutline.length);`,
    codeLanguage: "typescript",
    exercise: "Draft 10 slide cho startup của bạn (Google Slides). Mỗi slide 1 câu tagline.",
    exerciseEn: "Draft 10 slides for your startup, one tagline per slide.",
    quiz: [
      q("Bao nhiêu slide chuẩn YC?", ["5", "10", "20", "50"], 1, "10 slides."),
      q("Slide trống competition = ?", ["Tốt", "VC nghĩ không có market", "Bí mật", "Chưa quan trọng"], 1, "Signal xấu."),
      q("Font tối thiểu?", ["10pt", "12pt", "24pt+", "72pt"], 2, "Đọc từ xa."),
      q("'Ask' slide gồm?", ["Chỉ số tiền", "Số tiền + use + milestone", "Chỉ milestone", "Chỉ team"], 1, "Đủ 3."),
      q("3 phiên bản deck?", ["3-min, 10-min, 30-min", "1 phiên bản", "5", "Không cần"], 0, "Email/meeting/data room."),
    ],
    solutionExplanation: "10 slide + 3 phiên bản (email/meeting/data room) là kit chuẩn.",
  },
  {
    id: "su-4-4",
    title: "Term Sheet: SAFE, Convertible Note, Priced Round",
    titleEn: "Term Sheet: SAFE, Convertible Note, Priced Round",
    level: 4, difficulty: "advanced",
    theory: `## 1. 🚦 Vấn đề
Term Sheet 5 trang có thể lấy công ty của bạn nếu ký ẩu.

## 2. 💡 3 công cụ đầu tư
- **SAFE** (Y Combinator): không nợ, không lãi, convert khi có priced round. Cap + Discount.
- **Convertible Note**: có lãi (thường 5-8%), có maturity date.
- **Priced Round (Preferred Shares)**: định giá rõ, cấu trúc phức tạp hơn.

## 3. 🎯 Điều khoản quan trọng
- **Valuation cap**: giá cao nhất SAFE convert.
- **Discount**: 10-20%.
- **Pro-rata rights**: investor được mua thêm ở round sau.
- **Liquidation preference**: 1x non-participating là chuẩn.
- **Board seat**: cân nhắc kỹ.
- **Anti-dilution**: broad-based weighted average (fair) vs full ratchet (nguy hiểm).

## 4. ⚠️ Đỏ cờ
> - 2x participating liquidation preference.
> - Full ratchet anti-dilution.
> - Founder vesting reset về 4 năm.
> - Drag-along quá mạnh.

## 5. ✅ Best practice
> 💡 Luôn thuê luật sư startup (Anh Nguyen, LNT & Partners, Baker McKenzie) để review. Chi 30-50 triệu VND đáng.
`,
    theoryEn: `SAFE (no interest, converts on priced round), Convertible Note (interest + maturity), Priced Round (preferred shares). Watch for participating liquidation, full-ratchet anti-dilution, and reset vesting. Always hire a startup lawyer.`,
    code: `// SAFE conversion math (cap-only, no discount)
function safeConvert(investment: number, cap: number, newValuation: number) {
  const price = Math.min(cap, newValuation);
  return { pctOfCompany: investment / price };
}
console.log(safeConvert(200_000, 5_000_000, 10_000_000));`,
    codeLanguage: "typescript",
    exercise: "Đọc 1 SAFE template YC. Highlight 3 điều khoản có thể đàm phán.",
    exerciseEn: "Read YC SAFE template. Highlight 3 negotiable clauses.",
    quiz: [
      q("SAFE có lãi suất?", ["Có", "Không", "5%", "10%"], 1, "SAFE không lãi."),
      q("Liquidation preference chuẩn?", ["1x non-participating", "3x participating", "0", "10x"], 0, "1x non-participating."),
      q("Full ratchet anti-dilution?", ["Founder-friendly", "Investor-friendly, đỏ cờ", "Neutral", "Không tồn tại"], 1, "Rất bất lợi founder."),
      q("Convertible Note khác SAFE?", ["Không khác", "Có lãi + maturity", "Không convert", "Rẻ hơn"], 1, "Note có lãi + hạn."),
      q("Cần luật sư khi ký term sheet?", ["Không", "Có, luôn luôn", "Chỉ khi > $10M", "Chỉ Series A"], 1, "Luôn cần."),
    ],
    solutionExplanation: "SAFE đơn giản nhất; hiểu preference/anti-dilution để không mất công ty.",
  },
  {
    id: "su-4-5",
    title: "Burn rate, Runway, 3-statement forecast",
    titleEn: "Burn, runway, 3-statement forecast",
    level: 3, difficulty: "intermediate",
    theory: `## 1. 🚦 Vấn đề
Startup chết khi tiền hết, không khi ý tưởng sai. Phải luôn biết còn bao nhiêu tháng.

## 2. 💡 Công thức
- **Burn rate** = tiền out - tiền in mỗi tháng.
- **Net burn** = burn sau doanh thu.
- **Runway** = cash / net burn.

## 3. 🎯 3-statement mini (Google Sheet 12 cột)
1. **P&L** (revenue, COGS, opex, EBITDA).
2. **Cash flow** (operating, investing, financing).
3. **Balance sheet** (cash, AR, AP, equity).

## 4. ⚠️ Luật ngón cái
- Runway < 6 tháng → gọi vốn NGAY hoặc cắt burn.
- Fundraise mất 3-6 tháng → khởi động khi còn 9-12 tháng runway.
- Không đếm revenue chưa ký hợp đồng.

## 5. ✅ Best practice
> 💡 Cập nhật burn/runway đầu mỗi tháng. Board slide luôn có "months of runway" ở góc trên phải.
`,
    theoryEn: `Runway = cash / net burn. Start fundraising with 9-12 months left. Update burn monthly and put runway on every board slide.`,
    code: `function runway(cashVND: number, netBurnPerMonth: number) {
  return netBurnPerMonth <= 0 ? Infinity : cashVND / netBurnPerMonth;
}
console.log(runway(3_000_000_000, 350_000_000).toFixed(1), "months");`,
    codeLanguage: "typescript",
    exercise: "Xây spreadsheet 12 tháng: revenue, cost, cash, burn, runway. Test scenario hire 2 engineers.",
    exerciseEn: "Build a 12-month spreadsheet. Test hiring 2 engineers.",
    quiz: [
      q("Runway = ?", ["Cash × burn", "Cash / net burn", "Revenue / cost", "Team size"], 1, "Cash / net burn."),
      q("Nên bắt đầu gọi vốn khi runway còn?", ["1 tháng", "3 tháng", "9-12 tháng", "24 tháng"], 2, "3-6 tháng cho close + buffer."),
      q("Net burn khác gross burn?", ["Không khác", "Net = gross - revenue", "Net > gross", "Net = cash"], 1, "Net trừ revenue."),
      q("3-statement gồm?", ["P&L, CF, BS", "P&L, KPI, deck", "CAC, LTV, MRR", "Sales, HR, IT"], 0, "P&L + Cash Flow + Balance Sheet."),
      q("Đếm revenue chưa ký?", ["Có", "Không, chỉ ký + tiền về", "Chỉ ước lượng", "Có nếu VC hỏi"], 1, "Conservative."),
    ],
    solutionExplanation: "Founder phải update burn/runway hàng tháng, không quý.",
  },
];

// ---------------------------------------------------------------------------
// Module 5 - Operations & Growth
// ---------------------------------------------------------------------------
const opsLessons: L[] = [
  {
    id: "su-5-1",
    title: "Xây team đầu tiên: hire slow, fire fast",
    titleEn: "Building the first team",
    level: 3, difficulty: "intermediate",
    theory: `## 1. 🚦 Vấn đề
5 người đầu tiên định hình culture 5 năm. Sai 1 người = văn hoá lệch.

## 2. 💡 Framework hire
- **Values first**: culture fit > skill 1 chút.
- **T-shape**: 1 lĩnh vực sâu + rộng ngang.
- **Missionary > mercenary**: yêu bài toán, không chỉ tiền.
- **Reference check**: gọi 3 người quản lý cũ.

## 3. 🎯 Bộ câu hỏi phỏng vấn founder
1. "Kể lần cuối bạn thất bại lớn - học được gì?"
2. "Nếu có 3 tháng làm freelance với X triệu/tháng vs join startup của tôi lương thấp, chọn gì? Vì sao?"
3. "Đưa cho tôi feedback 3 điều bạn thấy sai ở buổi phỏng vấn này."

## 4. ⚠️ Bẫy
> - Hire vì thân quen.
> - Hire senior quá sớm - văn hoá build-fast bị hỏng.
> - Không probation - khó fire.

## 5. ✅ Best practice
> 💡 "Hire slow, fire fast". 30-60-90 day plan cho mỗi hire mới.
`,
    theoryEn: `Hire slow, fire fast. First 5 hires define culture. Prefer T-shaped, mission-driven candidates. Always reference check 3 past managers.`,
    code: `type Score = { culture: number; skill: number; mission: number };
function offerDecision(s: Score) {
  return s.culture >= 8 && s.mission >= 7 && s.skill >= 7 ? "OFFER" : "PASS";
}
console.log(offerDecision({culture: 9, skill: 8, mission: 8}));`,
    codeLanguage: "typescript",
    exercise: "Viết job description cho hire tiếp theo. Bao gồm values, T-shape skill, 3 câu hỏi phỏng vấn.",
    exerciseEn: "Write a JD for your next hire with values, T-shape skills, 3 interview questions.",
    quiz: [
      q("Câu 'hire slow, fire fast' nghĩa?", ["Tuyển nhanh sa thải chậm", "Tuyển kỹ, sa thải quyết đoán khi sai", "Không tuyển", "Không sa thải"], 1, "Kỹ càng khi tuyển, dứt khoát khi thấy sai."),
      q("Reference check nên?", ["Bỏ qua", "3 manager cũ", "Chỉ đọc CV", "Google"], 1, "3 manager để lấy pattern."),
      q("Missionary vs mercenary?", ["Đều tốt", "Missionary bám bài toán, tốt hơn giai đoạn sớm", "Mercenary tốt hơn", "Không khác"], 1, "Missionary bám lâu."),
      q("T-shape là?", ["Chỉ chiều sâu", "Chỉ chiều rộng", "Sâu 1 mảng + rộng nhiều mảng", "Chữ T logo"], 2, "Sâu + rộng."),
      q("Probation nên?", ["Bỏ", "60-90 ngày", "5 năm", "Không cần luật"], 1, "60-90 ngày."),
    ],
    solutionExplanation: "Team đầu = culture. Hire slow, evaluate 60-90 day plan.",
  },
  {
    id: "su-5-2",
    title: "Growth Hacking: viral loops, referral, SEO/ASO",
    titleEn: "Growth Hacking",
    level: 3, difficulty: "intermediate",
    theory: `## 1. 🚦 Vấn đề
Marketing budget nhỏ - cần đòn bẩy sản phẩm (viral, referral, SEO organic).

## 2. 💡 Viral loop math
K-factor = (số invite/user) × (conversion rate). K > 1 = viral, K < 1 = flat.

## 3. 🎯 4 growth tactics
1. **Referral**: Dropbox 2008 +60% signup bằng "invite bạn +500MB".
2. **Product-led loops**: mỗi share Notion tạo signup mới.
3. **SEO organic**: viết 1 bài dài 3000 từ / vertical / tuần.
4. **ASO app store**: keyword, screenshot, review.

## 4. ⚠️ Bẫy
> - Referral thưởng bằng tiền → hack fraud.
> - SEO không có backlink strategy → không rank.
> - Viral loop nhưng không có retention → thùng thủng.

## 5. ✅ Best practice
> 💡 Trước khi hack growth, đảm bảo retention D7 > 30%. Không có retention = đổ nước vào rổ thủng.
`,
    theoryEn: `Growth = product-driven loops (K-factor), referral, SEO/ASO. Don't scale growth without D7 retention ≥ 30% - a leaky bucket.`,
    code: `function kFactor(invitesPerUser: number, conversion: number) {
  return invitesPerUser * conversion;
}
console.log(kFactor(3, 0.25)); // 0.75 -> not viral yet`,
    codeLanguage: "typescript",
    exercise: "Thiết kế 1 viral loop cho sản phẩm của bạn. Ước lượng K-factor.",
    exerciseEn: "Design a viral loop. Estimate K-factor.",
    quiz: [
      q("Viral khi K = ?", ["> 0", "> 0.5", "> 1", "> 10"], 2, "K > 1 = organic growth."),
      q("Dropbox 2008 growth hack?", ["Ads TV", "Referral 500MB", "SEO", "Bill Gates promote"], 1, "Referral tăng 60%."),
      q("Retention D7 tối thiểu trước growth?", ["10%", "30%", "80%", "0%"], 1, "> 30%."),
      q("ASO là?", ["App Store Optimization", "Ad Sales Ops", "Anti-Spam Op", "Api Server Ops"], 0, "App Store Optimization."),
      q("Referral bằng tiền mặt?", ["Tốt", "Dễ fraud - dùng credit trong app", "Không hoạt động", "Bắt buộc"], 1, "Dùng credit in-app an toàn hơn."),
    ],
    solutionExplanation: "Retention trước, growth sau. K-factor + product-led loops.",
  },
  {
    id: "su-5-3",
    title: "Product-Market Fit: Sean Ellis test",
    titleEn: "Product-Market Fit & Sean Ellis test",
    level: 3, difficulty: "intermediate",
    theory: `## 1. 🚦 Vấn đề
"PMF" mơ hồ. Sean Ellis chuẩn hoá bằng 1 câu hỏi.

## 2. 💡 Sean Ellis test
Hỏi user hoạt động (dùng >2 lần): **"Bạn cảm thấy thế nào nếu không được dùng sản phẩm này nữa?"**
- Very disappointed
- Somewhat disappointed
- Not disappointed

Nếu ≥ **40%** trả lời "very disappointed" → PMF.

## 3. 🎯 Dấu hiệu khác
- Retention curve flatten (không xuống 0).
- Word-of-mouth: user tự viral.
- Sales dễ, không cần đẩy.

## 4. ⚠️ Bẫy PMF giả
- User dùng vì free.
- 1 KOL post viral, 1 tuần rồi tắt.
- Retention 60% ngày 1 nhưng 0% ngày 30.

## 5. ✅ Best practice
> 💡 Sau mỗi feature lớn, chạy Sean Ellis. Nếu tăng "very disappointed" → đúng hướng.
`,
    theoryEn: `Sean Ellis test: survey active users - "How would you feel if you could no longer use this?" ≥40% "very disappointed" = PMF signal. Complement with flattening retention and organic word-of-mouth.`,
    code: `function seanEllis(veryDisappointed: number, total: number) {
  const pct = veryDisappointed / total;
  return { pct, pmf: pct >= 0.4 };
}
console.log(seanEllis(52, 120));`,
    codeLanguage: "typescript",
    exercise: "Chạy Sean Ellis test trên 30 user. Ghi kết quả. Nếu < 40%, chọn 1 feature để cải thiện.",
    exerciseEn: "Run Sean Ellis on 30 users. If < 40%, pick 1 feature to improve.",
    quiz: [
      q("Ngưỡng PMF của Sean Ellis?", ["10%", "25%", "40%", "80%"], 2, "40% 'very disappointed'."),
      q("Đối tượng khảo sát?", ["Tất cả visitor", "User dùng > 2 lần", "Chỉ paid", "Chỉ free"], 1, "User active."),
      q("PMF giả nếu?", ["Retention flatten", "1 KOL push rồi tắt", "Word-of-mouth mạnh", "Sales dễ"], 1, "Spike ngắn hạn."),
      q("Retention curve PMF?", ["Xuống 0", "Flatten", "Tăng vô hạn", "Không quan trọng"], 1, "Flatten = user ở lại."),
      q("Ai đề xuất test này?", ["Steve Blank", "Sean Ellis", "Eric Ries", "Paul Graham"], 1, "Sean Ellis (Dropbox growth)."),
    ],
    solutionExplanation: "Sean Ellis + retention flatten + WoM = PMF thật.",
  },
  {
    id: "su-5-4",
    title: "Culture, OKRs, và weekly rituals",
    titleEn: "Culture, OKRs, weekly rituals",
    level: 3, difficulty: "intermediate",
    theory: `## 1. 🚦 Vấn đề
> "Culture eats strategy for breakfast" - Peter Drucker.

Không có culture code = mọi conflict thành cá nhân.

## 2. 💡 3 công cụ cốt lõi
1. **Values 5-7 câu** (Netflix, Amazon LP). Ví dụ: "Ship xấu > không ship", "Data over opinion", "Học sinh trước, doanh thu sau".
2. **OKR quý**: 3 Objective, mỗi Object 3 KR đo lường được.
3. **Weekly rituals**: Monday planning, Friday demo, retro 2 tuần.

## 3. 🎯 OKR ví dụ
> **O1**: Đạt PMF cho học sinh lớp 12 ôn IELTS.
> KR1: Sean Ellis ≥ 45%.
> KR2: D30 retention ≥ 25%.
> KR3: 200 paid user.

## 4. ⚠️ Bẫy
> - Values chỉ dán tường - không dùng khi phỏng vấn.
> - OKR = KPI (không phải). OKR ambitious 70% hoàn thành là tốt.
> - Meeting mỗi ngày → không ai làm việc.

## 5. ✅ Best practice
> 💡 Retrospective 2 tuần: What went well / not / try. Public trong team.
`,
    theoryEn: `Culture = values + OKRs + weekly rituals. OKRs are ambitious - 70% completion is good. Retros every 2 weeks.`,
    code: `type OKR = { objective: string; keyResults: { text: string; progress: number }[] };
const q3: OKR = {
  objective: "Reach PMF for grade-12 IELTS learners",
  keyResults: [
    { text: "Sean Ellis >= 45%", progress: 0.6 },
    { text: "D30 retention >= 25%", progress: 0.4 },
    { text: "200 paid users", progress: 0.35 },
  ],
};
const avg = q3.keyResults.reduce((s,k)=>s+k.progress,0) / q3.keyResults.length;
console.log((avg*100).toFixed(0) + "%");`,
    codeLanguage: "typescript",
    exercise: "Viết 5 values + 3 OKR cho quý tới. Public với team.",
    exerciseEn: "Write 5 values + 3 OKRs. Share publicly.",
    quiz: [
      q("OKR viết tắt của?", ["Objectives and Key Results", "Ops Key Report", "Organization Key Rules", "Owner-Key-Result"], 0, "Andy Grove Intel."),
      q("Hoàn thành OKR 70% là?", ["Fail", "Tốt (ambitious)", "Trung bình", "Excellent 100%"], 1, "70% cho OKR ambitious."),
      q("Values nên có ở đâu?", ["Chỉ tường", "Phỏng vấn + performance review", "Website landing", "Không cần"], 1, "Ứng dụng vào quyết định."),
      q("Retro tần suất?", ["Hàng ngày", "2 tuần", "1 năm", "Chỉ khi crisis"], 1, "Sprint retro."),
      q("'Culture eats strategy for breakfast' ai nói?", ["Bezos", "Drucker", "Musk", "Zuck"], 1, "Peter Drucker."),
    ],
    solutionExplanation: "Values + OKR + rituals là hệ điều hành startup.",
  },
  {
    id: "su-5-5",
    title: "Legal cho startup VN",
    titleEn: "Legal essentials for VN startups",
    level: 3, difficulty: "intermediate",
    theory: `## 1. 🚦 Vấn đề
Đăng ký sai loại hình = mất 6 tháng sửa. Không có IP assignment = code không thuộc công ty.

## 2. 💡 Loại hình phổ biến
- **TNHH 1 thành viên**: đơn giản, thuế 20%.
- **TNHH 2+ thành viên**: cho co-founders VN.
- **Cổ phần (JSC)**: cần cho gọi VC lớn / IPO.

## 3. 🎯 Checklist tháng đầu
1. Founder Agreement + vesting.
2. Đăng ký DN (Sở KHĐT tỉnh).
3. Mã số thuế + hoá đơn điện tử.
4. Đăng ký nhãn hiệu (Cục SHTT).
5. Điều lệ có clause preferred share cho VC.
6. Hợp đồng lao động + IP assignment.
7. Compliance: PDPD (Nghị định 13/2023 về bảo vệ dữ liệu cá nhân).

## 4. ⚠️ Bẫy
> - Dùng logo/tên trùng - kiện.
> - Không đăng ký nhãn hiệu - đối thủ đăng ký cướp.
> - Thuê freelance không NDA + IP assignment.

## 5. ✅ Best practice
> 💡 Chi 20-40 triệu setup pháp lý ban đầu (Công ty luật LNT, Baker McKenzie, YKVN, Vilaf). Rẻ hơn kiện tụng sau này.
`,
    theoryEn: `VN legal essentials: choose company type (LLC vs JSC), file founder agreement + vesting, register trademark, sign IP assignment with everyone, comply with PDPD (Decree 13/2023). Budget 20-40M VND up-front for a startup law firm.`,
    code: `const legalChecklist = [
  "Founder Agreement",
  "Company Registration",
  "Tax ID + E-invoice",
  "Trademark",
  "Charter with preferred share clause",
  "Employment Agreements + IP Assignment",
  "PDPD Compliance",
];
console.log(legalChecklist.length, "items");`,
    codeLanguage: "typescript",
    exercise: "Chuẩn bị legal checklist cho startup của bạn. Chọn 1 công ty luật để consult.",
    exerciseEn: "Prep a legal checklist. Pick a law firm to consult.",
    quiz: [
      q("Loại hình cần cho gọi VC lớn?", ["TNHH 1TV", "JSC (cổ phần)", "Hợp tác xã", "Hộ kinh doanh"], 1, "JSC cho preferred shares."),
      q("PDPD là?", ["Personal Data Protection Decree", "Public DB Design", "Product Dev Plan", "Prof Data Push"], 0, "Nghị định 13/2023."),
      q("Đăng ký nhãn hiệu ở?", ["Sở KHĐT", "Cục SHTT", "Bộ TT&TT", "Ngân hàng"], 1, "Cục Sở hữu trí tuệ."),
      q("IP assignment bắt buộc?", ["Không", "Có với mọi nhân viên + freelance", "Chỉ founder", "Chỉ CTO"], 1, "Mọi contributor."),
      q("Thuế TNHH VN?", ["10%", "20%", "35%", "50%"], 1, "20% thu nhập doanh nghiệp."),
    ],
    solutionExplanation: "Legal setup 20-40M VND đầu tiên rẻ hơn kiện tụng.",
  },
];

// ---------------------------------------------------------------------------
// Module 6 - AI Startup Playbook
// ---------------------------------------------------------------------------
const aiLessons: L[] = [
  {
    id: "su-6-1",
    title: "Bối cảnh AI 2026: LLM wrapper vs Vertical AI vs Infra",
    titleEn: "AI landscape 2026",
    level: 3, difficulty: "intermediate",
    theory: `## 1. 🚦 Vấn đề
AI startup 2026 chia 3 tầng. Chọn sai tầng = khó defensible.

## 2. 💡 3 tầng
1. **Infrastructure**: model foundation (OpenAI, Anthropic), GPU cloud (CoreWeave), vector DB (Pinecone). Đắt, cần deep tech.
2. **Vertical AI**: sản phẩm chuyên ngành + domain data (Harvey cho luật, ELSA cho phát âm, Cursor cho code).
3. **LLM wrapper**: UI + prompt + user data mỏng. Dễ copy.

## 3. 🎯 Insight
Vertical AI là sweet spot cho founder VN: data domain (giáo dục VN, kế toán SME, y tế địa phương) là moat.

## 4. ⚠️ Bẫy
> - Xây "ChatGPT phiên bản VN" - không moat.
> - Xây foundation model 1B tham số không có $50M - đốt tiền.

## 5. ✅ Best practice
> 💡 Chọn 1 vertical hẹp. Sở hữu data pipeline. Fine-tune / RAG trên data đó.
`,
    theoryEn: `AI stack has 3 layers: infra, vertical, wrapper. For VN founders, vertical AI with proprietary domain data is the best defensible spot.`,
    code: `type Layer = "infra"|"vertical"|"wrapper";
function moatScore(layer: Layer, hasProprietaryData: boolean) {
  const base = { infra: 5, vertical: 4, wrapper: 1 }[layer];
  return base + (hasProprietaryData ? 4 : 0);
}
console.log(moatScore("vertical", true)); // 8`,
    codeLanguage: "typescript",
    exercise: "Xếp 5 AI startup nổi tiếng vào 3 tầng. Đâu là moat của họ?",
    exerciseEn: "Map 5 AI startups to 3 layers. Identify their moats.",
    quiz: [
      q("ELSA thuộc tầng?", ["Infra", "Vertical AI", "Wrapper", "Không AI"], 1, "Vertical AI phát âm."),
      q("Wrapper moat mạnh?", ["Rất mạnh", "Yếu, dễ copy", "Trung bình", "Vô địch"], 1, "UI dễ copy."),
      q("VN founder nên chọn tầng?", ["Infra vì lớn", "Vertical với data domain", "Wrapper vì rẻ", "Không AI"], 1, "Vertical là sweet spot."),
      q("Foundation model 7B params cần?", ["$1000", "$1M", "$10-50M+", "Free"], 2, "GPU + data + team đắt."),
      q("Vector DB thuộc tầng?", ["Infra", "Vertical", "Wrapper", "Không có"], 0, "Infra layer."),
    ],
    solutionExplanation: "Vertical + proprietary data = moat mạnh nhất cho VN.",
  },
  {
    id: "su-6-2",
    title: "Build AI product với API",
    titleEn: "Building with AI APIs",
    level: 3, difficulty: "intermediate",
    theory: `## 1. 🚦 Vấn đề
Không cần train GPU cluster - dùng API. Nhưng cần biết chọn model + tối ưu cost.

## 2. 💡 Stack AI 2026
- **LLM API**: OpenAI GPT, Anthropic Claude, Google Gemini, open-source (Llama, Qwen).
- **Embedding**: OpenAI, Cohere, VoyageAI.
- **Vector DB**: Pinecone, Weaviate, pgvector.
- **Orchestration**: LangChain, LlamaIndex, hoặc raw SDK.
- **Gateway**: Lovable AI Gateway giúp swap model dễ.

## 3. 🎯 Cost optimization
- Route model theo độ khó: nhanh/rẻ (Gemini Flash) cho simple, mạnh (Claude Opus) cho complex.
- Cache prompt static.
- Prompt ngắn: mỗi 1000 token ~ $0.01-0.03.

## 4. ⚠️ Bẫy
> - Prompt injection: user chèn "Ignore instructions".
> - PII leak: gửi tên/SĐT thẳng API.
> - Không rate limit → hoá đơn 10k$.

## 5. ✅ Best practice
> 💡 Có evaluation set 50-200 câu để so sánh model. Đừng chọn model theo hype.
`,
    theoryEn: `Route by difficulty, cache static prompts, sanitize PII, rate-limit. Maintain a 50-200 case eval set to compare models objectively.`,
    code: `// Model router
function pickModel(taskLen: number, needsReasoning: boolean) {
  if (needsReasoning) return "anthropic/claude-sonnet";
  if (taskLen < 500) return "google/gemini-2.5-flash";
  return "openai/gpt-5-mini";
}
console.log(pickModel(200, false));`,
    codeLanguage: "typescript",
    exercise: "Thiết kế stack AI cho ý tưởng: model, vector DB, orchestration, safety. Tính cost 1000 request.",
    exerciseEn: "Design an AI stack: model, vector DB, orchestration, safety. Cost per 1000 requests.",
    quiz: [
      q("Cost/1000 token GPT-5 mini xấp xỉ?", ["$0.001-0.01", "$1", "$10", "$100"], 0, "Vài cent."),
      q("Prompt injection là?", ["Bug", "User chèn instruction để lật system prompt", "Feature", "OK"], 1, "Tấn công phổ biến."),
      q("Vector DB phổ biến?", ["Pinecone/pgvector", "MySQL", "MongoDB thuần", "Excel"], 0, "Store embeddings."),
      q("Eval set nên có?", ["1 câu", "50-200 câu", "0", "10000"], 1, "Đủ đại diện."),
      q("Cache prompt tĩnh?", ["Vô ích", "Giảm cost đáng kể", "Tăng cost", "Không dùng"], 1, "OpenAI/Anthropic hỗ trợ prompt cache."),
    ],
    solutionExplanation: "Route + cache + eval + safety = AI stack chuẩn founder.",
  },
  {
    id: "su-6-3",
    title: "Data moat & Fine-tuning: khi nào cần?",
    titleEn: "Data moat & fine-tuning",
    level: 4, difficulty: "advanced",
    theory: `## 1. 🚦 Vấn đề
"Fine-tune GPT" nghe hay nhưng 90% trường hợp không cần. Prompt + RAG đã đủ.

## 2. 💡 Quyết định 3 tầng
1. **Prompt engineering**: đủ 70% task.
2. **RAG (Retrieval-Augmented Generation)**: khi cần knowledge private.
3. **Fine-tuning**: khi cần style/format cố định (medical notes, legal drafting) hoặc giảm latency/cost với model nhỏ.

## 3. 🎯 Data moat thật
- Data mà chỉ bạn thu thập được: 20k bài IELTS chấm bởi giáo viên band 8.5.
- Data flywheel: user dùng → feedback → model tốt hơn → user quay lại.
- Data phải structured + labeled + updated.

## 4. ⚠️ Bẫy
> - Fine-tune trước khi có prompt tốt.
> - "Data 100k row" - nếu không label thì vô dụng.
> - Data crawl công khai không phải moat.

## 5. ✅ Best practice
> 💡 Trước khi fine-tune, chạy: (1) prompt engineering, (2) few-shot, (3) RAG. Nếu vẫn thiếu → fine-tune.
`,
    theoryEn: `Escalation ladder: prompt → RAG → fine-tune. Real data moats are (a) exclusive collection, (b) labeled, (c) flywheel-generating.`,
    code: `type Approach = "prompt"|"rag"|"finetune";
function pick(needsPrivate: boolean, needsStyle: boolean, latencyCritical: boolean): Approach {
  if (needsPrivate) return "rag";
  if (needsStyle || latencyCritical) return "finetune";
  return "prompt";
}
console.log(pick(true, false, false));`,
    codeLanguage: "typescript",
    exercise: "Cho ý tưởng của bạn, quyết định prompt vs RAG vs fine-tune. Justify.",
    exerciseEn: "Decide prompt vs RAG vs fine-tune. Justify.",
    quiz: [
      q("Bước đầu tiên nên thử?", ["Fine-tune", "Prompt engineering", "Train from scratch", "Không dùng AI"], 1, "Rẻ nhất."),
      q("RAG là?", ["Random AI Gen", "Retrieval-Augmented Generation", "Rating AI Gen", "Rapid AI Growth"], 1, "Lấy context từ vector DB."),
      q("Data moat thật khi?", ["Crawl từ Wikipedia", "Exclusive + labeled + flywheel", "1000 row Excel", "Public dataset"], 1, "Exclusive + labeled + flywheel."),
      q("Fine-tune GPT tốt cho?", ["Style/format cố định", "Kiến thức mới", "Tăng độ chính xác không giới hạn", "Giảm hallucination hoàn toàn"], 0, "Style/format."),
      q("Data flywheel nghĩa?", ["Vòng lặp user → feedback → model tốt hơn", "Ổ đĩa quay", "AWS service", "Excel macro"], 0, "Vòng lặp tự cải thiện."),
    ],
    solutionExplanation: "Prompt → RAG → fine-tune theo bậc thang. Moat = data độc quyền.",
  },
  {
    id: "su-6-4",
    title: "Case studies: ELSA, VinAI, Misa, Got It, Trusting Social",
    titleEn: "Case studies: VN AI winners",
    level: 3, difficulty: "intermediate",
    theory: `## 1. 🚦 Vấn đề
Học từ 5 AI startup Việt đã đi xa: cùng thấy pattern.

## 2. 💡 5 case
### ELSA Speak (2015)
- Vấn đề: người Việt nói tiếng Anh khó hiểu.
- Data moat: bảng lỗi phát âm theo native language.
- Series C ~ $23M từ Google & Monk's Hill.

### VinAI (2018)
- Vấn đề: NLP tiếng Việt chưa tốt.
- Ra ViT5, PhoBERT open-source.
- Kênh: enterprise VinGroup + xuất khẩu.

### Misa AVA (2019)
- Vấn đề: kế toán SME tốn 5h/ngày nhập hoá đơn.
- OCR + AI phân loại chi phí.
- B2B, ARPU cao.

### Got It (2015)
- Q&A tutoring cho học sinh Mỹ 24/7.
- Marketplace expert + AI hỗ trợ.
- Xuất khẩu Việt → Mỹ.

### Trusting Social (2013)
- Chấm điểm tín dụng người không banking history.
- Data thay thế (SMS, telecom) + ML.

## 3. 🎯 Pattern chung
1. Giải bài toán **rất Việt Nam** hoặc rất **địa phương**.
2. Data moat từ ngày đầu.
3. B2B enterprise hoặc B2C nhưng có bên trả tiền rõ ràng.
4. Founder có background cả tech + industry.

## 4. ✅ Rút ra
> 💡 Đừng làm ChatGPT VN. Hãy làm cái ChatGPT KHÔNG giải được.
`,
    theoryEn: `5 VN AI winners share a pattern: local pain, proprietary data, clear payer, founders with tech + industry background.`,
    code: `const cases = [
  { name:"ELSA", moat:"pronunciation error data by L1" },
  { name:"VinAI", moat:"open Vietnamese NLP models" },
  { name:"Misa AVA", moat:"invoice dataset + SME workflow" },
  { name:"Got It", moat:"expert network + AI assist" },
  { name:"Trusting Social", moat:"alt data for credit scoring" },
];
console.log(cases.map(c => \`\${c.name}: \${c.moat}\`).join("\\n"));`,
    codeLanguage: "typescript",
    exercise: "Chọn 1 case study. Viết 500 từ phân tích: pain, moat, GTM, next 5 years.",
    exerciseEn: "Analyze 1 case study in 500 words.",
    quiz: [
      q("ELSA moat?", ["Ads", "Data lỗi phát âm theo native language", "Team lớn", "Bằng sáng chế"], 1, "Pronunciation error data."),
      q("VinAI open-source model?", ["BERT", "PhoBERT/ViT5", "GPT-2 VN", "T5"], 1, "PhoBERT & ViT5."),
      q("Misa AVA target?", ["Học sinh", "Kế toán SME", "Freelancer nghệ", "Ngân hàng lớn"], 1, "SME accountants."),
      q("Trusting Social giải?", ["Video ngắn", "Chấm điểm tín dụng thay thế", "Bán quần áo", "Grab-clone"], 1, "Credit scoring alt data."),
      q("Pattern chung 5 case?", ["Đều dùng blockchain", "Local pain + data moat + B2B/B2C payer rõ", "Đều IPO", "Đều 5 founders"], 1, "Local + moat + payer."),
    ],
    solutionExplanation: "5 case = 1 pattern: local pain + data moat + clear payer.",
  },
  {
    id: "su-6-5",
    title: "Từ VN ra thế giới: YC, Antler, 500 Global",
    titleEn: "From VN to global: YC, Antler, 500 Global",
    level: 4, difficulty: "advanced",
    theory: `## 1. 🚦 Vấn đề
Thị trường VN 100 triệu dân đủ để test PMF; muốn scale x100 cần ra SEA/global.

## 2. 💡 Top accelerator cho founder VN
| Chương trình | Vé cấp | Ưu điểm |
|---|---|---|
| **Y Combinator** (US) | $500k | Alumni network, deal flow best |
| **500 Global** (US/SEA) | $200-500k | Đông SEA batch, hỗ trợ VN |
| **Antler** (Singapore) | $100k+ | Cho founder chưa có team |
| **Iterative** (SG) | $150k | SEA focus, founder-friendly |
| **Techstars** | $120k | Corporate networks |

## 3. 🎯 Checklist apply
1. **Traction**: ưu tiên revenue > MAU > waitlist.
2. **Team video**: 1 phút, mô tả why-us.
3. **Market**: TAM global, không chỉ VN.
4. **Insight**: 1 điều duy nhất chỉ bạn biết.

## 4. ⚠️ Bẫy
> - Apply YC với deck lộn xộn - fail ngay.
> - Không có traction English-speaking market.
> - Founder không nói tiếng Anh fluent - accelerator US khó.

## 5. ✅ Best practice
> 💡 Trước khi apply YC, có 3 khách hàng ngoài VN (Sing/US/UK). Chứng minh cross-border traction.
`,
    theoryEn: `Top accelerators for VN founders: YC, 500 Global, Antler, Iterative, Techstars. Before applying: have revenue traction, especially cross-border customers, and a global TAM story.`,
    code: `const accelerators = [
  { name:"Y Combinator", check:2500000, batch:"S+W", location:"US" },
  { name:"500 Global", check:200000, batch:"rolling", location:"US/SEA" },
  { name:"Antler", check:100000, batch:"rolling", location:"SG" },
];
console.log("Total capital available:", accelerators.reduce((s,a)=>s+a.check,0));`,
    codeLanguage: "typescript",
    exercise: "Chuẩn bị bộ apply YC: 1-min video (script), 10-slide deck, list 5 câu hỏi lo lắng nhất VC.",
    exerciseEn: "Prep a YC application kit: 1-min video script + 10-slide deck + 5 hard VC questions.",
    quiz: [
      q("YC vé đầu tư standard?", ["$50k", "$500k", "$5M", "$50"], 1, "$500k tại 2024+."),
      q("Antler đặc biệt vì?", ["Cho founder chưa có team", "Chỉ ở VN", "Chỉ crypto", "Chỉ enterprise"], 0, "Match co-founder."),
      q("Trước khi apply YC nên có?", ["0 user", "Traction + insight", "IPO", "3 co-founder VN"], 1, "Traction rõ."),
      q("500 Global mạnh về?", ["Blockchain thuần", "Đông SEA + VN founder", "Chỉ US", "Chỉ AI"], 1, "SEA network."),
      q("Application video dài?", ["10 phút", "1 phút", "1 giờ", "10 giây"], 1, "1 phút."),
    ],
    solutionExplanation: "YC/500/Antler đều cần traction + insight + team clip. Cross-border customer là điểm cộng lớn.",
  },
];

// ---------------------------------------------------------------------------
// Modules aggregate
// ---------------------------------------------------------------------------
const mk = (
  id: string, title: string, titleEn: string, icon: string, color: string,
  description: string, descriptionEn: string, lessons: L[],
): ExtendedProgrammingModule => ({
  id, title, titleEn, icon, color, description, descriptionEn,
  course: "startup", lessons,
});

export const startupModules: ExtendedProgrammingModule[] = [
  mk("startup-1-founder", "Tư duy Founder", "Founder Mindset", "🚀", "from-orange-500 to-rose-600",
    "5 bài học nền tảng để nghĩ như một founder tech Việt Nam.",
    "5 foundational lessons to think like a Vietnamese tech founder.",
    founderLessons),
  mk("startup-2-product", "Sản phẩm & MVP", "Product & MVP", "🎯", "from-amber-500 to-orange-600",
    "Design Thinking, Lean Canvas, MVP, UX, và metric đầu tiên.",
    "Design Thinking, Lean Canvas, MVP, UX, and first metrics.",
    productLessons),
  mk("startup-3-business", "Business Model & Market", "Business Model & Market", "💼", "from-emerald-500 to-teal-600",
    "Doanh thu, TAM/SAM/SOM, pricing, unit economics, GTM VN.",
    "Revenue, TAM/SAM/SOM, pricing, unit economics, GTM in VN.",
    bizLessons),
  mk("startup-4-fund", "Gọi vốn & Tài chính", "Fundraising & Finance", "💰", "from-blue-500 to-indigo-600",
    "Bootstrap vs VC, cap table, pitch deck, term sheet, runway.",
    "Bootstrap vs VC, cap table, pitch deck, term sheet, runway.",
    fundLessons),
  mk("startup-5-ops", "Vận hành & Tăng trưởng", "Ops & Growth", "📈", "from-purple-500 to-fuchsia-600",
    "Team, growth hacking, PMF, culture/OKR, legal VN.",
    "Team, growth hacking, PMF, culture/OKR, VN legal.",
    opsLessons),
  mk("startup-6-ai", "AI Startup Playbook", "AI Startup Playbook", "🤖", "from-pink-500 to-rose-600",
    "AI stack 2026, build với API, data moat, case VN, ra thế giới.",
    "2026 AI stack, building with APIs, data moat, VN cases, going global.",
    aiLessons),
];
