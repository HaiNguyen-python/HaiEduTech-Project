import type { ExtendedProgrammingModule } from "./types";

/**
 * EdTech Advanced — practitioner-grade reinforcement module covering the
 * algorithms and product systems that power modern learning platforms
 * (including HaiEduTech itself): Spaced Repetition (SM-2/FSRS),
 * adaptive difficulty (IRT + bandits), AI Tutors (RAG over curriculum),
 * and trustworthy auto-grading with AI.
 *
 * Visuals are ASCII diagrams and comparison tables (the markdown renderer
 * for programming theory doesn't render <img>).
 */
export const edtechAdvancedModules: ExtendedProgrammingModule[] = [
  {
    id: "edtech-advanced-2026",
    title: "EdTech Nâng cao (2026) — Thuật toán đứng sau nền tảng học",
    titleEn: "Advanced EdTech (2026) — The Algorithms Behind Learning Platforms",
    icon: "🎓",
    color: "from-pink-500 to-rose-600",
    description:
      "4 bài chuyên sâu: Spaced Repetition (SM-2/FSRS), adaptive difficulty (IRT + bandits), AI Tutor RAG, và auto-grading đáng tin cậy. Đây chính là stack HaiEduTech.",
    descriptionEn:
      "4 deep lessons: Spaced Repetition (SM-2/FSRS), adaptive difficulty (IRT + bandits), AI Tutor RAG, and trustworthy auto-grading — the very stack powering HaiEduTech.",
    course: "edtech",
    lessons: [
      {
        id: "edtech-adv-1",
        title: "Spaced Repetition — SM-2 và FSRS giải mã",
        titleEn: "Spaced Repetition — SM-2 and FSRS Decoded",
        level: 3,
        difficulty: "intermediate",
        theory: `![Ebbinghaus forgetting curve and spaced repetition](/lesson-illustrations/edtech-spaced-repetition.jpg)

## 1. 🧠 Đường cong quên Ebbinghaus

Trí nhớ phai theo hàm mũ: \`R(t) = e^(-t / S)\` với \`S\` = "stability". Mỗi lần ôn đúng → \`S\` tăng → khoảng cách lần ôn tiếp tăng.

\`\`\`
   Retention
     1.0 │●
         │ \\
     0.8 │  ●         ← ôn đây (R≈0.85) là tối ưu chi phí/lợi ích
         │   \\\\
     0.5 │     ●_____
         │           ‾●______
     0.2 │                    ‾‾●_____
         └──────────────────────────────▶ ngày
              1    3    7    14    30
\`\`\`

## 2. ⚙️ Thuật toán SM-2 (Anki, 1987)

Mỗi review nhận điểm \`q ∈ {0..5}\` (0 = quên hẳn, 5 = nhớ hoàn hảo).

\`\`\`
   if q < 3:
       repetitions = 0
       interval    = 1                      # reset
   else:
       repetitions += 1
       if repetitions == 1: interval = 1
       elif repetitions == 2: interval = 6
       else: interval = round(interval * EF)

   EF = max(1.3, EF + 0.1 - (5-q)*(0.08 + (5-q)*0.02))
   next_due = today + interval days
\`\`\`

Đơn giản, đã hoạt động 38 năm.

## 3. 🚀 FSRS (Free Spaced Repetition Scheduler, 2023+)

Mô hình 3 biến cho mỗi thẻ:

| Biến | Ý nghĩa |
|------|---------|
| **D** Difficulty | Thẻ khó cỡ nào với user (1–10) |
| **S** Stability | Bao lâu kiến thức "bám" trước khi R rơi xuống ngưỡng |
| **R** Retrievability | Xác suất nhớ lại ngay bây giờ |

Lập lịch theo **target retention** (vd 90%): giải ngược \`R = exp(-t/S)\` → \`t = -S · ln(0.9)\`.

So với SM-2:

| Khía cạnh | SM-2 | FSRS |
|-----------|------|------|
| Cơ sở | Heuristic | Mô hình thống kê fit theo log thật |
| Tham số người dùng | 0 | ~17 (học từ dữ liệu) |
| Hiệu quả | Tốt | Cao hơn 20–30% theo benchmark Anki |
| Triển khai | Vài dòng | Cần fit param từ log review |

## 4. 🏗️ Schema bảng review tối thiểu

\`\`\`
   reviews(user_id, card_id, ts, rating 1–4,
           prev_interval_d, new_interval_d,
           stability, difficulty)
\`\`\`

Quy tắc:
- **Immutable**: không sửa review cũ → cần re-fit FSRS thì replay log.
- Lưu **rating gốc** thay vì chỉ pass/fail → cho phép đổi thuật toán sau.

## 5. ⚠️ Bẫy thường gặp

- Reset interval về 1 khi user lỡ vắng 1 ngày → demoralizing. FSRS xử lý "lateness" mượt hơn.
- Để target retention 99% → review quá nhiều, user bỏ. 85–90% là điểm cân bằng.
- Trộn thẻ "mới" và "tới hạn" sai tỷ lệ → user choáng. Quy tắc: ≤ 20 thẻ mới/ngày cho người mới.
`,
        theoryEn: `Memory decays exponentially (Ebbinghaus). SM-2 (1987) is a heuristic with no per-user parameters that still works. FSRS (2023+) models each card with Difficulty/Stability/Retrievability, schedules from a target retention (typically 85–90%), and beats SM-2 by 20–30% on Anki benchmarks. Always store immutable review logs with the raw rating so you can re-fit your scheduler later.`,
        code: `from dataclasses import dataclass

@dataclass
class Card:
    repetitions: int = 0
    interval: int = 0          # days
    ef: float = 2.5            # ease factor

def sm2(card: Card, q: int) -> Card:
    """SuperMemo-2 update. q: 0..5 quality of recall."""
    if q < 3:
        return Card(repetitions=0, interval=1, ef=card.ef)
    reps = card.repetitions + 1
    if reps == 1: interval = 1
    elif reps == 2: interval = 6
    else: interval = round(card.interval * card.ef)
    ef = max(1.3, card.ef + 0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
    return Card(repetitions=reps, interval=interval, ef=ef)

# Mô phỏng 6 phiên — user nhớ tốt dần
c = Card()
for q in [3, 4, 5, 5, 4, 5]:
    c = sm2(c, q)
    print(f"q={q}  reps={c.repetitions}  next in {c.interval:>3}d  ef={c.ef:.2f}")`,
        codeLanguage: "python",
        exercise:
          "Viết hàm fsrs_next_interval(stability, target_retention=0.9) trả về số ngày tới review tiếp theo theo R = exp(-t/S).",
        exerciseEn:
          "Write fsrs_next_interval(stability, target_retention=0.9) returning the days until next review from R = exp(-t/S).",
        quiz: [
          { question: "Tại sao R≈0.85 thường là 'sweet spot' để ôn?", options: ["Vì đẹp", "Đủ khó để củng cố trí nhớ nhưng chưa quên hẳn", "Yêu cầu RLS", "Để spam noti"], answer: 1, explanation: "Ôn quá dễ phí; quá khó cần học lại từ đầu — 0.85 cân bằng." },
          { question: "FSRS hơn SM-2 ở điểm nào?", options: ["Code ngắn hơn", "Học tham số từ dữ liệu thật, lịch tốt hơn 20–30%", "Không cần review", "Miễn phí hơn"], answer: 1, explanation: "FSRS fit model với log thật → cá nhân hoá hơn heuristic cố định." },
          { question: "Vì sao review log phải immutable?", options: ["Để re-fit thuật toán và audit khi đổi scheduler", "Tiết kiệm RAM", "Bắt buộc bởi GDPR", "Không có lý do"], answer: 0, explanation: "Sửa log = mất nguồn sự thật, không thể re-train hay so sánh model." },
          { question: "Đặt target retention 99% có vấn đề gì?", options: ["Không có", "User phải review quá nhiều → bỏ", "Lưu nhiều dữ liệu hơn", "Latency cao"], answer: 1, explanation: "Hiệu suất học cận biên giảm mạnh; user kiệt sức." },
          { question: "Trong SM-2, khi q < 3 thì?", options: ["Reset repetitions=0 và interval=1", "Tăng interval", "Xóa thẻ", "Ban user"], answer: 0, explanation: "Quên rồi → coi như học lại từ đầu, lần sau 1 ngày." },
        ],
      },
      {
        id: "edtech-adv-2",
        title: "Adaptive Difficulty — IRT, mastery và Multi-Armed Bandits",
        titleEn: "Adaptive Difficulty — IRT, Mastery, and Multi-Armed Bandits",
        level: 4,
        difficulty: "advanced",
        theory: `![Adaptive learning system overview](/lesson-illustrations/edtech-adaptive-learning.jpg)

## 1. 🎯 Vì sao "đề tĩnh" thất bại với mọi học sinh

Đề cố định: học sinh giỏi chán, học sinh yếu nản. Adaptive testing chọn câu **theo trình độ ước lượng** → mỗi câu mang nhiều thông tin nhất.

\`\`\`
                       Trình độ θ
       ───────────────────────────────────────▶
       weak   ─────  ●  ─────────  ●  ───────  strong
                   user A                user B
       câu cho A: vừa sức A         câu cho B: vừa sức B
\`\`\`

## 2. 📐 IRT 2PL — Item Response Theory 2 tham số

Xác suất học sinh trình độ \`θ\` trả lời đúng câu có độ khó \`b\`, độ phân biệt \`a\`:

\`\`\`
                          1
   P(correct | θ, a, b) = ─────────────────
                          1 + exp(-a (θ - b))
\`\`\`

\`\`\`
   P
   1 ┤              ____________  a lớn → đường cong dốc
     │            /                (câu phân biệt tốt)
   0.5┤  ─ ─ ─ ─/─ ─ ─ ─ ─        cắt 0.5 tại θ = b
     │       /
   0 ┤_____/_______________________ θ
            b
\`\`\`

Thuật toán adaptive:
1. Đoán \`θ₀\` từ profile.
2. Chọn câu có \`b ≈ θ\` (tối đa Fisher information).
3. Cập nhật \`θ\` bằng MAP/MLE sau mỗi câu.
4. Dừng khi sai số chuẩn \`SE(θ) < ngưỡng\` (vd 0.3).

## 3. 🪜 Mastery Learning (Bloom)

Một skill được coi là **mastered** khi \`P(correct) ≥ 0.85\` trên N câu liên tiếp. Cấu trúc curriculum thành **đồ thị tiền-điều kiện**:

\`\`\`
   addition ─┐
             ├─▶ multiplication ─┐
   counting ─┘                   ├─▶ fractions ─▶ algebra
                  ─── subtraction ┘
\`\`\`

Học sinh chỉ unlock node con khi tất cả node cha đạt mastery.

## 4. 🎰 Multi-Armed Bandits — chọn bài tiếp theo

Khi có nhiều bài cùng phù hợp, dùng bandit để cân bằng **explore** (thử bài mới có thể hữu ích) vs **exploit** (lặp bài đã biết hiệu quả).

| Thuật toán | Ưu | Nhược |
|------------|----|----|
| **ε-greedy** | Cực đơn giản | Khám phá kém định hướng |
| **UCB1** | Lý thuyết regret tốt | Cần đếm chính xác |
| **Thompson Sampling** | Bayesian, hoạt động tốt thực tế | Cần prior |

Phần thưởng = Δ mastery sau bài, hoặc engagement (hoàn thành / không bỏ).

## 5. 🔁 Vòng adaptive loop hoàn chỉnh

\`\`\`
   ┌──────────────────────────────────────────────────────────┐
   │  PROFILE (θ per skill)                                   │
   └──────────────┬───────────────────────────────────────────┘
                  ▼
   ┌──────────────────────────────────────────────────────────┐
   │  POLICY: chọn skill (mastery gap) → chọn item (IRT)      │
   │          ─OR─ bandit pick từ short-list                  │
   └──────────────┬───────────────────────────────────────────┘
                  ▼
              user trả lời
                  │
                  ▼
   ┌──────────────────────────────────────────────────────────┐
   │  UPDATE: θ ← bayes_update(θ, response)                   │
   │           mastery ← rolling_window_correct()             │
   │           log immutable cho RL/feedback loop sau         │
   └──────────────────────────────────────────────────────────┘
\`\`\`

## 6. ⚠️ Bẫy

- Chọn quá nhiều câu \`b ≈ θ\` → user thấy mọi câu đều ~50/50 → frustrating. Thêm chút "easy win" định kỳ.
- Mastery không có thời gian phai → đánh giá sai 1 tháng sau. Kết hợp với spaced repetition (bài trước).
- Bandit không có \`min_pulls\` → bài mới chưa bao giờ thắng, vĩnh viễn ngủ yên.
`,
        theoryEn: `Static tests fail both ends of the curve. Adaptive testing uses IRT to pick items where item difficulty ≈ learner ability θ, updating θ after each answer until SE(θ) drops below a threshold. Mastery Learning models the curriculum as a prerequisite graph; a skill unlocks the next when correctness exceeds ~0.85. When several lessons fit, frame next-lesson selection as a multi-armed bandit (Thompson Sampling works well). Combine with spaced repetition so mastery doesn't silently decay.`,
        code: `import math, random

def p_correct(theta: float, a: float, b: float) -> float:
    """IRT 2PL probability of a correct response."""
    return 1.0 / (1.0 + math.exp(-a * (theta - b)))

def update_theta(theta: float, a: float, b: float, correct: bool, lr: float = 0.4) -> float:
    """One-step gradient ascent on log-likelihood (proxy for MLE update)."""
    p = p_correct(theta, a, b)
    grad = a * ((1 if correct else 0) - p)
    return theta + lr * grad

# Mô phỏng: user thật có θ_true = 0.6, ta khởi tạo 0.0 rồi học dần qua 20 câu
random.seed(1)
theta_true, theta_est = 0.6, 0.0
items = [(random.uniform(0.7, 1.6), random.uniform(-1.5, 1.5)) for _ in range(20)]

for i, (a, b) in enumerate(items, 1):
    correct = random.random() < p_correct(theta_true, a, b)
    theta_est = update_theta(theta_est, a, b, correct)
    if i % 5 == 0:
        print(f"after {i:>2} items → θ_est = {theta_est:+.3f}  (true {theta_true:+.2f})")`,
        codeLanguage: "python",
        exercise:
          "Viết next_item(items, theta_est) chọn câu có |b - θ_est| nhỏ nhất trong số câu chưa làm. Trả về index.",
        exerciseEn:
          "Write next_item(items, theta_est) returning the index of the unseen item whose |b − θ_est| is smallest.",
        quiz: [
          { question: "Vì sao Fisher information cực đại tại b ≈ θ?", options: ["Vì hàm đẹp", "Câu sát trình độ user mang nhiều thông tin nhất để tinh chỉnh θ", "Vì RNG", "Không thật"], answer: 1, explanation: "Đường cong dốc nhất tại b=θ → mỗi đúng/sai cập nhật θ mạnh nhất." },
          { question: "Mastery 0.85 trên N câu liên tiếp giúp?", options: ["Tránh mở khóa nhầm khi user gặp may", "Tăng tốc API", "Bảo mật", "Không có ý nghĩa"], answer: 0, explanation: "Cần bằng chứng đủ lớn, không chỉ 1 câu đúng do may." },
          { question: "Bandit thiếu min_pulls dẫn đến?", options: ["Crash", "Bài mới không có cơ hội cạnh tranh fair → ngủ vĩnh viễn", "Tăng latency", "Không ảnh hưởng"], answer: 1, explanation: "Cold-start problem: cần explore tối thiểu trước khi tin exploit." },
          { question: "Thompson Sampling thuộc nhóm nào?", options: ["Greedy thuần", "Bayesian — sample từ posterior rồi chọn", "Heuristic", "Brute force"], answer: 1, explanation: "Sample θ từ posterior mỗi vòng → cân bằng explore/exploit tự nhiên." },
          { question: "Vì sao cần kết hợp adaptive + spaced repetition?", options: ["Để slogan đẹp", "Adaptive đo trình độ; spaced repetition giữ kiến thức khỏi phai", "Vì hardware", "Không cần"], answer: 1, explanation: "Mastery hôm nay ≠ mastery tháng sau — cần củng cố theo lịch." },
        ],
      },
      {
        id: "edtech-adv-3",
        title: "AI Tutor — RAG trên curriculum + an toàn cho trẻ em",
        titleEn: "AI Tutor — RAG Over Curriculum + Child-Safety",
        level: 4,
        difficulty: "advanced",
        theory: `![AI tutor with RAG on curriculum and safety guardrails](/lesson-illustrations/edtech-ai-tutor-rag.jpg)

## 1. 🎯 Vì sao "ChatGPT thường" không đủ làm tutor

- Bịa kiến thức không có trong giáo trình → mâu thuẫn bài giảng.
- Trả lời ngôn ngữ sai trình độ (giảng đại học cho học sinh lớp 5).
- Không biết user đang học bài nào, đã master gì.

Tutor đúng nghĩa = **LLM + retrieval trên curriculum của bạn + state của học sinh + safety layer**.

## 2. 🏗️ Kiến trúc tham chiếu

\`\`\`
   ┌────────────────────────────────────────────────────────────┐
   │  STUDENT MESSAGE                                           │
   └──────────────┬─────────────────────────────────────────────┘
                  ▼
   ┌───────────────────────┐    ┌────────────────────────────┐
   │ Safety Pre-filter     │───▶│ block self-harm, NSFW,     │
   │ (regex + classifier)  │    │ personal data leak         │
   └──────────┬────────────┘    └────────────────────────────┘
              ▼
   ┌────────────────────────────────────────────────────────────┐
   │ Context Builder                                            │
   │   • current_lesson, mastery, learner_age                   │
   │   • RAG: top-k chunks từ curriculum vector DB              │
   │   • last 5 exchanges (rolling memory)                      │
   └──────────────┬─────────────────────────────────────────────┘
                  ▼
   ┌────────────────────────────────────────────────────────────┐
   │ LLM with structured prompt                                 │
   │   [persona] Thầy/cô giáo dịu dàng cấp {age}                │
   │   [grounding] CHỈ dùng context dưới đây; nếu thiếu nói rõ  │
   │   [pedagogy] Hỏi ngược trước khi cho đáp án; Socratic      │
   └──────────────┬─────────────────────────────────────────────┘
                  ▼
   ┌───────────────────────┐    ┌────────────────────────────┐
   │ Safety Post-filter    │───▶│ kiểm citation, độ dài,     │
   │                       │    │ ngôn ngữ phù hợp tuổi      │
   └──────────┬────────────┘    └────────────────────────────┘
              ▼
        Trả về cho học sinh
\`\`\`

## 3. 🧰 Persona theo lứa tuổi

| Độ tuổi | Tone | Câu mẫu mở đầu |
|---------|------|-----------------|
| 6–10 | Vui, dùng ví dụ đồ chơi/động vật | "Tưởng tượng mèo của con có 3 quả táo…" |
| 11–14 | Khuyến khích tự tìm | "Trước khi mình giải, con thử đoán xem…" |
| 15–18 | Học thuật + ứng dụng đời thực | "Ý tưởng này dùng trong tài chính khi…" |
| Adult | Concise, jargon cho phép | "TL;DR: …" |

## 4. 🧪 Socratic vs Solution-first

Default **Socratic**: hỏi ngược → user tự tìm → tutor confirm. Chuyển sang solution-first khi:

- User đã sai ≥ 2 lần cùng concept.
- User chủ động nói "cho mình xem lời giải".
- Time-on-task > 5 phút mà chưa tiến.

## 5. 🛡️ Safety đặc thù EdTech

- **PII redaction**: không lưu tên/SĐT/địa chỉ trong log gửi LLM.
- **Self-harm escalation**: phát hiện → trả số hotline + flag teacher_contact_requests.
- **Academic integrity**: nếu user paste đề thi đang diễn ra → từ chối lịch sự.
- **Bias audit**: chạy eval set 200 câu chứa nhạy cảm chủng tộc/giới mỗi release.

## 6. 📏 Đo lường — không chỉ thumbs up/down

| Metric | Cách đo |
|--------|---------|
| **Groundedness** | % câu trả lời có citation hợp lệ từ chunk retrieved |
| **Pedagogy score** | LLM-judge chấm Socratic vs spoon-feeding |
| **Age-appropriateness** | Flesch reading ease, tone classifier |
| **Resolution** | % phiên kết thúc với "tôi hiểu rồi" (self-report + post-quiz pass) |

## 7. ⚠️ Bẫy

- Cho LLM truy cập internet → mất grounding, tăng hallucination.
- Memory dài vô hạn → user cũ chi phối câu trả lời, tốn token. Rolling 5–10 lượt là đủ.
- Bỏ qua latency: tutor > 3s feel-time → trẻ em mất tập trung. Stream token + dùng small-LLM cho intent classify.
`,
        theoryEn: `A real AI tutor ≠ plain ChatGPT. It's an LLM grounded on YOUR curriculum (RAG), aware of the learner's state (current lesson, mastery, age), and wrapped in a safety pre/post filter. Default to Socratic prompting and switch to solution-first only after repeated failure or explicit request. Tune persona to age band. Evaluate beyond thumbs up/down — track groundedness, pedagogy score, age-appropriateness (Flesch), and resolution rate. Watch for hallucination from internet access, runaway memory, and >3s latency that loses young learners.`,
        code: `# Minimal child-safe tutor skeleton — pseudocode-ish but runnable
import re, json

BANNED = re.compile(r"\\b(kill|suicide|porn|drug deal)\\b", re.I)
PII    = re.compile(r"(\\b\\d{10,11}\\b|\\b[\\w.]+@[\\w.]+\\.[a-z]{2,}\\b)")

def safety_pre(msg: str) -> tuple[bool, str]:
    if BANNED.search(msg):
        return False, "Bạn ơi, mình không thể giúp chủ đề này. Mình có thể giúp gì khác?"
    return True, PII.sub("[REDACTED]", msg)

def build_prompt(student, retrieved_chunks, msg):
    persona = {
        "kid":   "Bạn là cô giáo dịu dàng cho học sinh tiểu học, dùng ví dụ đồ chơi.",
        "teen":  "Bạn là gia sư khuyến khích học sinh THCS tự tìm câu trả lời.",
        "adult": "Bạn là cố vấn học tập súc tích, được dùng thuật ngữ chuyên ngành.",
    }[student["band"]]
    context = "\\n---\\n".join(c["text"] for c in retrieved_chunks) or "(không có)"
    return f"""[ROLE] {persona}
[GROUNDING] CHỈ dùng nội dung sau; nếu thiếu hãy nói 'mình chưa chắc'.
{context}
[STUDENT_STATE] lesson={student['lesson']} mastery={student['mastery']:.2f}
[PEDAGOGY] Hỏi ngược 1 câu định hướng trước khi đưa đáp án.
[QUESTION] {msg}
[OUTPUT_JSON] {{ "reply": str, "citations": [str], "asked_back": bool }}"""

ok, clean = safety_pre("Em muốn hỏi về phép cộng, sđt của em là 0987654321")
print("safe:", ok, "→", clean)
print(build_prompt({"band":"kid","lesson":"add-2digit","mastery":0.42},
                   [{"text":"Phép cộng 2 chữ số: đặt thẳng cột, cộng từ phải."}],
                   "Tại sao 17 + 25 = 42?")[:300], "...")`,
        codeLanguage: "python",
        exercise:
          "Thêm safety_post(reply, retrieved_chunks) trả False nếu reply chứa số liệu KHÔNG xuất hiện trong bất kỳ chunk nào (chống bịa số).",
        exerciseEn:
          "Add safety_post(reply, retrieved_chunks) returning False when reply cites numbers that don't appear in any retrieved chunk (anti-fabrication).",
        quiz: [
          { question: "Vì sao tutor mặc định nên Socratic?", options: ["Đẹp", "Buộc học sinh chủ động tư duy → học sâu hơn cho-đáp-án-luôn", "Vì tốn ít token", "Bắt buộc bởi RLS"], answer: 1, explanation: "Hỏi ngược kích hoạt retrieval trong não user — bằng chứng giáo dục mạnh." },
          { question: "Khi nào chuyển sang solution-first?", options: ["Sau câu hỏi đầu tiên", "Khi user sai nhiều lần cùng concept hoặc xin xem lời giải", "Không bao giờ", "Khi vui"], answer: 1, explanation: "Tránh tutor 'gây ức chế'. Quy tắc rõ ràng để biết khi nào dừng Socratic." },
          { question: "Groundedness đo gì?", options: ["Tốc độ", "% câu trả lời có trích xuất hợp lệ từ context retrieved", "Độ dài", "Cost"], answer: 1, explanation: "Đảm bảo LLM không bịa ngoài curriculum." },
          { question: "Memory rolling 5–10 lượt thay vì vô hạn vì?", options: ["Cost & focus — log dài làm LLM lệch và tốn token", "Vì RLS", "Vì RAM", "Không có lý do"], answer: 0, explanation: "Memory dài tăng cost, giảm chất lượng do nhiễu lịch sử." },
          { question: "Self-harm signal nên dẫn tới?", options: ["Tutor tự giải quyết", "Hiển thị hotline + escalate đến giáo viên / phụ huynh", "Bỏ qua", "Log thầm"], answer: 1, explanation: "Tutor không phải bác sĩ — phải escalate đúng kênh." },
        ],
      },
      {
        id: "edtech-adv-4",
        title: "Auto-Grading bằng AI — chấm essay/speaking đáng tin và công bằng",
        titleEn: "AI Auto-Grading — Trustworthy and Fair Essay/Speaking Assessment",
        level: 5,
        difficulty: "advanced",
        theory: `![AI auto-grading essay and speaking with rubric](/lesson-illustrations/edtech-auto-grading.jpg)

## 1. 🎯 Auto-grading không phải "LLM cho điểm là xong"

Yêu cầu thực tế:
- **Reliable**: cùng bài, cùng rubric → điểm dao động ±0.5.
- **Explainable**: học sinh hiểu vì sao 6.5, sửa được.
- **Fair**: không phạt accent / chính tả vùng miền / chủ đề lệch.
- **Auditable**: giáo viên review nhanh, log đủ để re-grade.

## 2. 📐 Rubric-first, không phải LLM-first

\`\`\`
   rubric.json
   {
     "task_response":  {weight: 0.25, scale: 0-9, anchors: {...}},
     "coherence":      {weight: 0.25, ...},
     "lexical":        {weight: 0.25, ...},
     "grammar":        {weight: 0.25, ...}
   }
\`\`\`

LLM chấm **từng tiêu chí riêng** với anchor cụ thể (vd "9 = lập luận sắc bén, ví dụ cụ thể; 5 = lập luận rời rạc"). Tổng điểm = weighted sum + rounding nửa band (IELTS).

## 3. 🔁 Pipeline IELTS Writing thực chiến

\`\`\`
   ┌───────────────────────────────────────────────────────────┐
   │  ESSAY                                                    │
   └───────────────┬───────────────────────────────────────────┘
                   ▼
   ┌───────────────────────────────────────────────────────────┐
   │  Pre-check: word count, off-topic detector, copy-paste    │
   │             flag, AI-generated detector (informational)   │
   └───────────────┬───────────────────────────────────────────┘
                   ▼
   ┌───────────────────────────────────────────────────────────┐
   │  Per-criterion grader (LLM-judge, JSON-mode)              │
   │   → {task: 6, coherence: 7, lexical: 6, grammar: 7,       │
   │      evidence: [quote spans], feedback: str}              │
   └───────────────┬───────────────────────────────────────────┘
                   ▼
   ┌───────────────────────────────────────────────────────────┐
   │  Aggregator: weighted → round half-band → confidence      │
   └───────────────┬───────────────────────────────────────────┘
                   ▼
   ┌───────────────────────────────────────────────────────────┐
   │  Calibration layer: nếu confidence low hoặc gần biên,     │
   │   route → human grader (sampling 10–20%)                  │
   └───────────────────────────────────────────────────────────┘
\`\`\`

## 4. 🎙️ Speaking — khác essay ở đâu?

| Vấn đề | Cách xử lý |
|--------|------------|
| ASR sai từ → trừ oan | Dùng **word confidence**; chỉ phạt khi user thật sự sai (so với ngữ cảnh) |
| Accent vùng miền | ASR đa accent + không chấm pronunciation theo chuẩn 1 vùng |
| Fluency | WPM trong khoảng [100, 180]; tỷ lệ filler ("um", "uh") |
| Pronunciation | Phoneme-level scoring (vd Azure Pronunciation Assessment) |
| Coherence | LLM chấm transcript theo rubric tương tự essay |

## 5. 🧪 Calibration — kiểm chứng độ tin cậy

| Bước | Mô tả |
|------|-------|
| **Gold set** | 200 bài chấm bởi 2 giáo viên IELTS-certified, lấy median |
| **Agreement** | QWK (Quadratic Weighted Kappa) giữa AI và human; mục tiêu ≥ 0.75 |
| **Drift watch** | Chạy lại gold set mỗi khi đổi model/prompt; alert nếu QWK giảm > 0.05 |
| **Human-in-loop** | Sample 10–20% bài thật để giáo viên review; cập nhật rubric |

## 6. 🛡️ Chống gian lận & bias

- **AI-generated detector** là tín hiệu, không phải bằng chứng — không trừ điểm tự động.
- **Off-topic detector** (cosine giữa prompt và essay) chặn essay học thuộc.
- **Demographic blind**: không gửi tên/quốc tịch vào LLM.
- **Disparate impact audit**: so điểm trung bình theo lớp/quốc tịch — nếu khác biệt > σ, điều tra.

## 7. ⚠️ Bẫy

- Chấm 1 prompt → tổng score → mất tính giải thích. Luôn per-criterion.
- LLM "rộng tay" theo thời gian (drift) → cần gold set định kỳ.
- Trả điểm mà không trả **feedback hành động được** ("cải thiện cohesive devices") → vô dụng.
`,
        theoryEn: `Trustworthy auto-grading is rubric-first, not LLM-first: score each criterion independently with concrete anchors, weight and round to the band. Run pre-checks (word count, off-topic, copy-paste). For speaking, use word-confidence ASR, fluency (WPM, fillers), phoneme-level pronunciation, and grade transcript coherence like an essay. Calibrate against a gold set of human-graded items, target QWK ≥ 0.75, watch drift on every model/prompt change, and route low-confidence cases to humans. Audit for demographic bias and always return actionable feedback, not just a number.`,
        code: `# Per-criterion rubric grader stub (LLM call faked)
import json, statistics

RUBRIC = {
    "task_response": {"weight": 0.25, "max": 9},
    "coherence":     {"weight": 0.25, "max": 9},
    "lexical":       {"weight": 0.25, "max": 9},
    "grammar":       {"weight": 0.25, "max": 9},
}

def fake_llm_judge(essay: str, criterion: str) -> dict:
    """Stub — replace with structured-output LLM call."""
    base = 6 + (len(essay) % 3)        # toy variation
    return {"score": min(9, base), "evidence": [essay[:40]],
            "feedback": f"Improve {criterion} by adding specific examples."}

def half_band(x: float) -> float:
    return round(x * 2) / 2

def grade_essay(essay: str) -> dict:
    per = {c: fake_llm_judge(essay, c) for c in RUBRIC}
    overall = half_band(sum(per[c]["score"] * RUBRIC[c]["weight"] for c in RUBRIC))
    spread = statistics.pstdev([per[c]["score"] for c in RUBRIC])
    confidence = "high" if spread < 1.0 else "medium" if spread < 2.0 else "low"
    return {"overall": overall, "per": per, "confidence": confidence,
            "needs_human_review": confidence == "low" or overall in (6.0, 7.0)}

result = grade_essay("Nowadays, technology helps students learn faster ... " * 20)
print(json.dumps(result, ensure_ascii=False, indent=2))`,
        codeLanguage: "python",
        exercise:
          "Viết qwk(human_scores, ai_scores) tính Quadratic Weighted Kappa giữa 2 list điểm (0..9). Cảnh báo khi qwk < 0.75.",
        exerciseEn:
          "Write qwk(human_scores, ai_scores) computing Quadratic Weighted Kappa between two lists of scores (0..9). Warn when qwk < 0.75.",
        quiz: [
          { question: "Vì sao phải chấm per-criterion thay vì 1 điểm tổng?", options: ["Tốn token hơn", "Để giải thích và sửa được — học sinh biết cần cải thiện gì", "Để giấu bug", "Không khác biệt"], answer: 1, explanation: "Điểm tổng không actionable; per-criterion + feedback mới giúp tiến bộ." },
          { question: "QWK đo gì?", options: ["Tốc độ chấm", "Agreement giữa 2 grader có ordinal scale, phạt mạnh lệch xa hơn lệch gần", "Cost", "RAM"], answer: 1, explanation: "QWK chuẩn vàng cho essay scoring (Hewlett ASAP)." },
          { question: "Vì sao không tự động trừ điểm khi 'AI-generated detector' báo dương?", options: ["Phát hiện AI hiện rất nhiễu — chỉ là tín hiệu, không phải bằng chứng", "Bằng chứng tuyệt đối", "Vì RLS", "Vì latency"], answer: 0, explanation: "Detector hiện vẫn FP cao — phạt tự động gây bất công." },
          { question: "Speaking: vì sao dùng word confidence từ ASR?", options: ["Để tránh trừ điểm khi ASR sai từ chứ không phải user", "Tăng tốc", "Bảo mật", "Không cần"], answer: 0, explanation: "Phải tách lỗi ASR khỏi lỗi học sinh để công bằng." },
          { question: "Khi nào route bài cho giáo viên review?", options: ["Tất cả", "Khi confidence thấp hoặc điểm gần ngưỡng band quan trọng + 10–20% sample định kỳ", "Không bao giờ", "Mỗi 1000 bài"], answer: 1, explanation: "Human-in-loop có chọn lọc giữ chất lượng mà không quá tải giáo viên." },
        ],
      },
      {
        id: "edtech-adv-5",
        title: "Knowledge Tracing & Mastery — đo 'học sinh thực sự biết gì'",
        titleEn: "Knowledge Tracing & Mastery — Measuring What a Student Really Knows",
        level: 4,
        difficulty: "advanced",
        theory: `![Knowledge tracing: mastery curve and Bayesian network](/lesson-illustrations/edtech-knowledge-tracing.jpg)

## 1. 🎯 Vấn đề: "trả lời đúng" ≠ "đã hiểu"

Một học sinh có thể đoán đúng, copy đáp án, hoặc thuộc lòng mà không hiểu. **Knowledge Tracing (KT)** là bài toán **ước lượng xác suất học sinh đã nắm kỹ năng** dựa trên lịch sử trả lời.

\`\`\`
   Lịch sử:       Q1✓  Q2✗  Q3✓  Q4✓  Q5✗  Q6✓
   Skill:         past-tense   articles    past-tense  ...
   KT model →     P(mastery past-tense) = 0.82
                  P(mastery articles)   = 0.41
\`\`\`

## 2. 🧮 BKT (Bayesian Knowledge Tracing) — kinh điển 1995

4 tham số / kỹ năng:

| Param | Ý nghĩa | Khoảng điển hình |
|-------|---------|------------------|
| \`p_init\` | P(biết trước khi học) | 0.1 – 0.3 |
| \`p_learn\` | P(học được sau 1 lần thử) | 0.05 – 0.2 |
| \`p_slip\` | P(biết nhưng trả lời SAI) | 0.05 – 0.1 |
| \`p_guess\` | P(không biết nhưng trả lời ĐÚNG) | 0.1 – 0.25 |

Cập nhật Bayes sau mỗi câu:

\`\`\`
   Nếu ĐÚNG:    p_known' = p_known * (1 - p_slip) /
                            [ p_known * (1 - p_slip) + (1 - p_known) * p_guess ]
   Nếu SAI:     p_known' = p_known * p_slip /
                            [ p_known * p_slip + (1 - p_known) * (1 - p_guess) ]
   Sau đó học:  p_known  = p_known' + (1 - p_known') * p_learn
\`\`\`

## 3. 🧠 DKT (Deep Knowledge Tracing, 2015) — RNN/Transformer

BKT giả định độc lập giữa kỹ năng → kém khi kỹ năng liên quan (past simple ↔ past perfect). DKT dùng **RNN/Transformer** học embedding kỹ năng tự động → bắt được phụ thuộc.

\`\`\`
        x_1 ─▶ ┌────┐
        x_2 ─▶ │RNN ├─▶ h_t ─▶ Dense ─▶ P(đúng câu kế tiếp về mỗi skill)
        x_3 ─▶ └────┘
        x_t = (skill_id, correct?)
\`\`\`

## 4. 🪜 Mastery threshold — khi nào coi là "đã master"?

| Ngưỡng | Hệ quả |
|--------|--------|
| 0.70 | Tiến nhanh, nhưng nhiều bài bị quên sau |
| **0.85** | Cân bằng tốt (ASSISTments, Khan, Duolingo) |
| 0.95 | Chậm, tốn thời gian; phù hợp chứng chỉ |

Kết hợp với **Spaced Repetition**: đạt 0.85 → đưa vào lịch ôn dài hạn (không phải xong-là-quên).

## 5. 🔗 Skill Graph — bản đồ phụ thuộc

\`\`\`
              [present simple]
                  │
                  ▼
              [past simple] ───▶ [past perfect]
                  │                  │
                  └────▶ [future] ◀──┘
\`\`\`

Khi học sinh kẹt ở \`past perfect\`, hệ thống tự **gợi ý ôn lại \`past simple\`** (prerequisite) chứ không cố nhồi bài khó hơn.

## 6. ⚠️ Bẫy

- **Cold start**: chưa có dữ liệu → dùng prior nghề nghiệp (ví dụ HSK 1 mặc định mastery thấp).
- **Skill tagging bẩn**: 1 câu bị tag 5 skill → KT loãng. Mỗi câu ≤ 2 skill chính.
- **Time decay**: bỏ qua quên theo thời gian → kết hợp KT + SRS bắt buộc.
`,
        theoryEn: `Knowledge Tracing estimates the probability a learner has mastered a skill from their answer history. BKT (1995) uses 4 params per skill (p_init, p_learn, p_slip, p_guess) with Bayesian updates. DKT (2015) uses RNN/Transformer to capture skill dependencies missed by BKT. Use a 0.85 mastery threshold (industry standard) and pair KT with spaced repetition to fight forgetting. Maintain a prerequisite skill graph so the system reroutes to fundamentals when a learner stalls. Watch for cold start, dirty skill tags, and ignoring time decay.`,
        code: `def bkt_update(p_known: float, correct: bool,
               p_slip=0.1, p_guess=0.2, p_learn=0.1) -> float:
    """One-step Bayesian Knowledge Tracing update."""
    if correct:
        num = p_known * (1 - p_slip)
        den = num + (1 - p_known) * p_guess
    else:
        num = p_known * p_slip
        den = num + (1 - p_known) * (1 - p_guess)
    posterior = num / den if den else p_known
    # apply learning step (chance to learn from the attempt)
    return posterior + (1 - posterior) * p_learn

# Simulate a learner on "past simple"
p = 0.15  # cold-start prior
history = [True, False, True, True, True, False, True, True]
for i, c in enumerate(history, 1):
    p = bkt_update(p, c)
    flag = "MASTERED ✓" if p >= 0.85 else ""
    print(f"Q{i} {'✓' if c else '✗'}  p(known) = {p:.3f}  {flag}")`,
        codeLanguage: "python",
        exercise:
          "Viết route_next_skill(skill_mastery: dict, graph: dict) chọn kỹ năng kế tiếp: nếu prerequisite < 0.6 → ôn nó trước; nếu hiện tại ≥ 0.85 → tiến lên skill con; ngược lại tiếp tục skill hiện tại.",
        exerciseEn:
          "Write route_next_skill(skill_mastery, graph): if a prerequisite is < 0.6, review it first; if current ≥ 0.85, advance to a child skill; otherwise stay on current.",
        quiz: [
          { question: "Vì sao 'trả lời đúng' không đồng nghĩa 'đã hiểu' trong KT?", options: ["Có thể đoán hoặc nhớ tạm", "Lỗi UI", "Sai đáp án gold", "Không có vấn đề"], answer: 0, explanation: "BKT mô hình hoá p_guess và p_slip vì lý do này." },
          { question: "p_slip trong BKT nghĩa là?", options: ["P(không biết nhưng đúng)", "P(biết nhưng trả lời sai do bất cẩn)", "Tỉ lệ skip bài", "Cost"], answer: 1, explanation: "Slip = biết mà lỡ; Guess = không biết mà trúng." },
          { question: "DKT khắc phục điểm yếu nào của BKT?", options: ["Quá nhanh", "Giả định kỹ năng độc lập — DKT bắt phụ thuộc qua RNN", "Quá rẻ", "Không có khác biệt"], answer: 1, explanation: "RNN/Transformer học embedding kỹ năng → bắt liên kết." },
          { question: "Ngưỡng mastery 0.85 phổ biến vì?", options: ["Số đẹp", "Cân bằng tiến độ và retention; chuẩn ngành (Khan, Duolingo)", "Tốc độ", "Không lý do"], answer: 1, explanation: "0.70 quên nhanh; 0.95 quá chậm; 0.85 là sweet spot." },
          { question: "Khi học sinh kẹt ở 'past perfect', hệ thống nên?", options: ["Cho bài khó hơn", "Ôn lại prerequisite 'past simple' trong skill graph", "Bỏ qua", "Hiển thị quảng cáo"], answer: 1, explanation: "Skill graph cho phép route về gốc khi học sinh chưa vững cơ sở." },
        ],
      },
      {
        id: "edtech-adv-6",
        title: "Onboarding & Behavioral Activation — kéo học sinh qua 'aha moment'",
        titleEn: "Onboarding & Behavioral Activation — Getting Learners to the 'Aha Moment'",
        level: 3,
        difficulty: "intermediate",
        theory: `![Onboarding funnel: signup → first lesson → aha moment → habit loop](/lesson-illustrations/edtech-onboarding-funnel.jpg)

## 1. 🎯 "Aha moment" — khoảnh khắc quyết định ở lại

Trong EdTech, **aha moment** không phải khi user đăng ký, mà khi họ **lần đầu cảm nhận tiến bộ rõ rệt** (hoàn thành bài đầu tiên + thấy mastery bar nhảy).

\`\`\`
   signup ─▶ first lesson ─▶ first quiz pass ─▶ first streak day 2
     100%      72%             48%                 31%   ← AHA cluster
                                                   │
                                                   ▼
                                    user 30× nhiều khả năng retain
\`\`\`

Mục tiêu onboarding: **đưa càng nhiều user qua cụm aha càng nhanh**.

## 2. 🚪 Friction audit — đếm clicks tới giá trị

| Bước | Click | Thời gian | Drop |
|------|-------|-----------|------|
| Landing → Signup | 1 | 5s | 35% |
| Signup → Email verify | 1 + email | 2 min | 22% |
| Verify → First lesson | 3 | 90s | 18% |
| First lesson → Quiz pass | quiz | 4 min | 28% |

Quy tắc: **mỗi 1 click thừa = ~10% drop**. Verify-by-email là kẻ giết người im lặng — cân nhắc magic-link hoặc OAuth.

## 3. 🧪 Empty state ≠ trang trắng

Empty state là **cơ hội dạy**, không phải lỗi UI. Mẫu tốt:

\`\`\`
   ┌──────────────────────────────────────────────┐
   │  👋 Chào bạn! Hãy thử bài đầu tiên:           │
   │                                              │
   │  [ ▶ Bắt đầu với "Hello, World!" — 3 phút ]  │
   │                                              │
   │  💡 Sau bài này, bạn sẽ nhận badge "First    │
   │     Step" và mở khoá Coding Lab.             │
   └──────────────────────────────────────────────┘
\`\`\`

Yếu tố bắt buộc: **CTA duy nhất**, **thời gian dự kiến**, **phần thưởng cụ thể**.

## 4. 📣 Behavioral triggers — push đúng người, đúng lúc

| Trigger | Khi nào fire | Channel | Goal |
|---------|--------------|---------|------|
| Welcome | T+0 | In-app + email | Đặt kỳ vọng + CTA bài 1 |
| Lesson nudge | T+24h, chưa học | Push | Bài 5 phút |
| Streak save | Streak risk, 22:00 | Push | Bảo vệ streak |
| Win-back | 7d inactive | Email | Bài "mới" cá nhân hoá |
| Re-engagement | 30d inactive | Email | Showcase tiến bộ + nudge nhẹ |

**Quy tắc**: tối đa **1 push/ngày**, không bao giờ trước 8h hoặc sau 21h địa phương. Mọi noti có **deep-link tới hành động** (không phải về home).

## 5. 🧭 Onboarding cá nhân hoá bằng skill assessment

Thay vì 5 trang giới thiệu, hỏi 3 câu vàng:

1. **Mục tiêu** (đi du học / việc làm / sở thích) → roadmap.
2. **Trình độ hiện tại** (1 quiz 3 câu) → adaptive bắt đầu đúng level.
3. **Thời gian/ngày** (5/15/30 phút) → kích cỡ bài đầu tiên.

Output: học sinh thấy bài đầu **đúng trình độ, đúng mục tiêu, đúng thời lượng** → aha trong < 10 phút.

## 6. ⚠️ Bẫy phổ biến

- **Onboarding 12 màn hình "show-and-tell"** — user bỏ ngay. Nguyên tắc: dạy bằng **làm**, không bằng **kể**.
- **Streak shaming trong tuần đầu** — đuổi user yếu trước khi họ kịp gắn bó.
- **Không đo cohort theo onboarding version** — không biết thay đổi nào giúp/hại.
`,
        theoryEn: `The aha moment in EdTech isn't sign-up — it's the first felt sense of progress (first quiz pass + mastery bar moving). Optimize onboarding to push more users into that cluster fast. Audit friction click-by-click (every extra click ≈ 10% drop). Replace empty states with single-CTA teaching moments. Wire behavioral triggers with strict frequency caps (≤1/day, 8 AM – 9 PM local) and deep links. Replace marketing tours with a 3-question intake (goal, level, time/day) that personalizes the first lesson so aha lands in under 10 minutes.`,
        code: `from dataclasses import dataclass
from datetime import datetime, timedelta
from typing import Optional

@dataclass
class Learner:
    user_id: str
    signup_at: datetime
    last_active_at: datetime
    streak_days: int
    completed_lessons: int

QUIET_HOURS = range(21, 24)  # don't push 21:00–08:00
def in_quiet_hours(now: datetime) -> bool:
    return now.hour in QUIET_HOURS or now.hour < 8

def pick_trigger(l: Learner, now: datetime) -> Optional[str]:
    if in_quiet_hours(now):
        return None
    inactive = (now - l.last_active_at).days
    if l.completed_lessons == 0 and inactive >= 1:
        return "welcome_nudge:try a 5-min starter lesson"
    if l.streak_days >= 2 and inactive >= 1 and now.hour == 20:
        return "streak_save:keep your streak alive"
    if inactive == 7:
        return "winback:a fresh lesson tailored for you"
    if inactive == 30:
        return "reengage:see how far you came + one small win"
    return None

now = datetime(2026, 5, 29, 20, 5)
l = Learner("u1", now - timedelta(days=10), now - timedelta(days=1), 3, 4)
print(pick_trigger(l, now))`,
        codeLanguage: "python",
        exercise:
          "Thêm logic frequency cap: nếu user đã nhận ≥ 1 push trong 24h qua, trả về None bất kể trigger nào.",
        exerciseEn:
          "Add a frequency cap: if the user already received ≥1 push in the last 24h, return None regardless of trigger.",
        quiz: [
          { question: "Aha moment trong EdTech là?", options: ["Lúc đăng ký", "Lần đầu cảm nhận tiến bộ rõ rệt (vd quiz pass + mastery nhảy)", "Khi mở app", "Khi xoá tài khoản"], answer: 1, explanation: "User vượt qua aha cluster có khả năng retain cao hơn nhiều lần." },
          { question: "Vì sao verify-by-email hại onboarding?", options: ["Bảo mật yếu", "Tạo break ~2 phút và 22% drop — phá đà tiến tới aha", "Tốn DB", "Không hại"], answer: 1, explanation: "Magic-link / OAuth giảm drop đáng kể." },
          { question: "Empty state nên có gì?", options: ["Logo to", "Một CTA duy nhất + thời gian dự kiến + phần thưởng cụ thể", "3 banner ads", "Không quan trọng"], answer: 1, explanation: "Empty state là cơ hội dạy bằng hành động, không phải lỗi UI." },
          { question: "Quy tắc tần suất push hợp lý?", options: ["Càng nhiều càng tốt", "≤1/ngày, tránh 21:00–08:00 địa phương", "Mỗi giờ", "Không có quy tắc"], answer: 1, explanation: "Vượt cap → unsubscribe và đánh giá thấp app store." },
          { question: "Onboarding 12 màn show-and-tell vấn đề gì?", options: ["Quá đắt", "Dạy bằng kể thay vì làm — user bỏ trước khi chạm aha", "Quá nhanh", "Không vấn đề"], answer: 1, explanation: "Onboarding tốt dạy bằng hành động + phản hồi tức thì." },
        ],
      },
    ],
  },
];

