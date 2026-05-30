import type { ExtendedProgrammingModule } from "./types";

/**
 * EdTech Advanced - practitioner-grade reinforcement module covering the
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
    title: "EdTech Nâng cao (2026) - Thuật toán đứng sau nền tảng học",
    titleEn: "Advanced EdTech (2026) - The Algorithms Behind Learning Platforms",
    icon: "🎓",
    color: "from-pink-500 to-rose-600",
    description:
      "4 bài chuyên sâu: Spaced Repetition (SM-2/FSRS), adaptive difficulty (IRT + bandits), AI Tutor RAG, và auto-grading đáng tin cậy. Đây chính là stack HaiEduTech.",
    descriptionEn:
      "4 deep lessons: Spaced Repetition (SM-2/FSRS), adaptive difficulty (IRT + bandits), AI Tutor RAG, and trustworthy auto-grading - the very stack powering HaiEduTech.",
    course: "edtech",
    lessons: [
      {
        id: "edtech-adv-1",
        title: "Spaced Repetition - SM-2 và FSRS giải mã",
        titleEn: "Spaced Repetition - SM-2 and FSRS Decoded",
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

## ✨ Nâng cấp 2026 - SRS hiện đại

- **FSRS-5** (open-source, dùng trong Anki từ 2024) đã đánh bại SM-2 và Anki cổ điển: giảm 20-30% số lượt ôn cho cùng tỉ lệ nhớ.
- **Half-life regression** (Duolingo) ước tính trực tiếp "khi nào người học quên" → phù hợp với app có nhiều data hơn cá nhân.
- **Adaptive interval theo từng item**: từ "cake" dễ hơn "ubiquitous" - đừng để chung curve. FSRS chấm "difficulty 1-10" cho từng item dựa lịch sử nhớ.
- **Tip thực hành cho HaiEduTech**: kết hợp SRS với **interleaving** (xen chủ đề) - tăng long-term retention thêm 15-25% so với block practice.

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

# Mô phỏng 6 phiên - user nhớ tốt dần
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
          { question: "Tại sao R≈0.85 thường là 'sweet spot' để ôn?", options: ["Vì đẹp", "Đủ khó để củng cố trí nhớ nhưng chưa quên hẳn", "Yêu cầu RLS", "Để spam noti"], answer: 1, explanation: "Ôn quá dễ phí; quá khó cần học lại từ đầu - 0.85 cân bằng." },
          { question: "FSRS hơn SM-2 ở điểm nào?", options: ["Code ngắn hơn", "Học tham số từ dữ liệu thật, lịch tốt hơn 20–30%", "Không cần review", "Miễn phí hơn"], answer: 1, explanation: "FSRS fit model với log thật → cá nhân hoá hơn heuristic cố định." },
          { question: "Vì sao review log phải immutable?", options: ["Để re-fit thuật toán và audit khi đổi scheduler", "Tiết kiệm RAM", "Bắt buộc bởi GDPR", "Không có lý do"], answer: 0, explanation: "Sửa log = mất nguồn sự thật, không thể re-train hay so sánh model." },
          { question: "Đặt target retention 99% có vấn đề gì?", options: ["Không có", "User phải review quá nhiều → bỏ", "Lưu nhiều dữ liệu hơn", "Latency cao"], answer: 1, explanation: "Hiệu suất học cận biên giảm mạnh; user kiệt sức." },
          { question: "Trong SM-2, khi q < 3 thì?", options: ["Reset repetitions=0 và interval=1", "Tăng interval", "Xóa thẻ", "Ban user"], answer: 0, explanation: "Quên rồi → coi như học lại từ đầu, lần sau 1 ngày." },
        ],
      },
      {
        id: "edtech-adv-2",
        title: "Adaptive Difficulty - IRT, mastery và Multi-Armed Bandits",
        titleEn: "Adaptive Difficulty - IRT, Mastery, and Multi-Armed Bandits",
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

## 2. 📐 IRT 2PL - Item Response Theory 2 tham số

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

## 4. 🎰 Multi-Armed Bandits - chọn bài tiếp theo

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

## ✨ Nâng cấp 2026 - Adaptive thông minh hơn

- **2-Parameter IRT** (difficulty + discrimination) vẫn là backbone cho CAT (Computerized Adaptive Testing). Duolingo English Test, GMAT Focus dùng nó.
- **Multi-Armed Bandits** vs **A/B test**: bandit thắng khi bạn có ≥ 5 variant và muốn tối ưu liên tục. EXP3 cho non-stationary (học sinh thay đổi theo tuần).
- **Reinforcement Learning** (DeepTutor, AlphaTutor 2025): policy chọn bài tiếp theo tối đa hoá "Δmastery − α·time_spent". Khó tune nhưng outperform IRT ~12%.
- **Cảnh báo**: adaptive quá nhanh = học sinh không có "comfort zone" → drop-off. Luôn để 20% bài "ngon ăn" tạo momentum.

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
          { question: "Thompson Sampling thuộc nhóm nào?", options: ["Greedy thuần", "Bayesian - sample từ posterior rồi chọn", "Heuristic", "Brute force"], answer: 1, explanation: "Sample θ từ posterior mỗi vòng → cân bằng explore/exploit tự nhiên." },
          { question: "Vì sao cần kết hợp adaptive + spaced repetition?", options: ["Để slogan đẹp", "Adaptive đo trình độ; spaced repetition giữ kiến thức khỏi phai", "Vì hardware", "Không cần"], answer: 1, explanation: "Mastery hôm nay ≠ mastery tháng sau - cần củng cố theo lịch." },
        ],
      },
      {
        id: "edtech-adv-3",
        title: "AI Tutor - RAG trên curriculum + an toàn cho trẻ em",
        titleEn: "AI Tutor - RAG Over Curriculum + Child-Safety",
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

## 6. 📏 Đo lường - không chỉ thumbs up/down

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

## ✨ Nâng cấp 2026 - Tutor an toàn cho trẻ em

- **Guardrails 3 lớp**: (1) system prompt cứng + spotlighting, (2) Llama-Guard / ShieldGemma trên cả input + output, (3) **toxicity classifier** chuyên biệt cho tiếng Việt (PhoBERT-toxic).
- **COPPA/GDPR-K**: dữ liệu của trẻ <13 tuổi cần phụ huynh đồng ý + xoá khi yêu cầu. Đừng để chat log có PII vào training data.
- **Socratic tutoring**: thay vì cho đáp án, hỏi 2-3 câu dẫn dắt. Eval bằng "% lượt LLM trả lời mà không tiết lộ key answer" - target ≥ 80%.
- **Fallback to human**: phát hiện "distress signal" (buồn, tự ti, bạo lực) → ngắt tutor, chuyển teacher_contact_requests. Đã triển khai ở Counseling Hub.

`,
        theoryEn: `A real AI tutor ≠ plain ChatGPT. It's an LLM grounded on YOUR curriculum (RAG), aware of the learner's state (current lesson, mastery, age), and wrapped in a safety pre/post filter. Default to Socratic prompting and switch to solution-first only after repeated failure or explicit request. Tune persona to age band. Evaluate beyond thumbs up/down - track groundedness, pedagogy score, age-appropriateness (Flesch), and resolution rate. Watch for hallucination from internet access, runaway memory, and >3s latency that loses young learners.`,
        code: `# Minimal child-safe tutor skeleton - pseudocode-ish but runnable
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
          { question: "Vì sao tutor mặc định nên Socratic?", options: ["Đẹp", "Buộc học sinh chủ động tư duy → học sâu hơn cho-đáp-án-luôn", "Vì tốn ít token", "Bắt buộc bởi RLS"], answer: 1, explanation: "Hỏi ngược kích hoạt retrieval trong não user - bằng chứng giáo dục mạnh." },
          { question: "Khi nào chuyển sang solution-first?", options: ["Sau câu hỏi đầu tiên", "Khi user sai nhiều lần cùng concept hoặc xin xem lời giải", "Không bao giờ", "Khi vui"], answer: 1, explanation: "Tránh tutor 'gây ức chế'. Quy tắc rõ ràng để biết khi nào dừng Socratic." },
          { question: "Groundedness đo gì?", options: ["Tốc độ", "% câu trả lời có trích xuất hợp lệ từ context retrieved", "Độ dài", "Cost"], answer: 1, explanation: "Đảm bảo LLM không bịa ngoài curriculum." },
          { question: "Memory rolling 5–10 lượt thay vì vô hạn vì?", options: ["Cost & focus - log dài làm LLM lệch và tốn token", "Vì RLS", "Vì RAM", "Không có lý do"], answer: 0, explanation: "Memory dài tăng cost, giảm chất lượng do nhiễu lịch sử." },
          { question: "Self-harm signal nên dẫn tới?", options: ["Tutor tự giải quyết", "Hiển thị hotline + escalate đến giáo viên / phụ huynh", "Bỏ qua", "Log thầm"], answer: 1, explanation: "Tutor không phải bác sĩ - phải escalate đúng kênh." },
        ],
      },
      {
        id: "edtech-adv-4",
        title: "Auto-Grading bằng AI - chấm essay/speaking đáng tin và công bằng",
        titleEn: "AI Auto-Grading - Trustworthy and Fair Essay/Speaking Assessment",
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

## 4. 🎙️ Speaking - khác essay ở đâu?

| Vấn đề | Cách xử lý |
|--------|------------|
| ASR sai từ → trừ oan | Dùng **word confidence**; chỉ phạt khi user thật sự sai (so với ngữ cảnh) |
| Accent vùng miền | ASR đa accent + không chấm pronunciation theo chuẩn 1 vùng |
| Fluency | WPM trong khoảng [100, 180]; tỷ lệ filler ("um", "uh") |
| Pronunciation | Phoneme-level scoring (vd Azure Pronunciation Assessment) |
| Coherence | LLM chấm transcript theo rubric tương tự essay |

## 5. 🧪 Calibration - kiểm chứng độ tin cậy

| Bước | Mô tả |
|------|-------|
| **Gold set** | 200 bài chấm bởi 2 giáo viên IELTS-certified, lấy median |
| **Agreement** | QWK (Quadratic Weighted Kappa) giữa AI và human; mục tiêu ≥ 0.75 |
| **Drift watch** | Chạy lại gold set mỗi khi đổi model/prompt; alert nếu QWK giảm > 0.05 |
| **Human-in-loop** | Sample 10–20% bài thật để giáo viên review; cập nhật rubric |

## 6. 🛡️ Chống gian lận & bias

- **AI-generated detector** là tín hiệu, không phải bằng chứng - không trừ điểm tự động.
- **Off-topic detector** (cosine giữa prompt và essay) chặn essay học thuộc.
- **Demographic blind**: không gửi tên/quốc tịch vào LLM.
- **Disparate impact audit**: so điểm trung bình theo lớp/quốc tịch - nếu khác biệt > σ, điều tra.

## 7. ⚠️ Bẫy

- Chấm 1 prompt → tổng score → mất tính giải thích. Luôn per-criterion.
- LLM "rộng tay" theo thời gian (drift) → cần gold set định kỳ.
- Trả điểm mà không trả **feedback hành động được** ("cải thiện cohesive devices") → vô dụng.

## ✨ Nâng cấp 2026 - Chấm công bằng

- **Per-criterion rubric** (task achievement, coherence, lexical, grammar) > 1 điểm tổng. Variance thấp hơn 3-4×, phụ huynh dễ chấp nhận.
- **Calibration với human**: lấy 200 bài đã chấm tay → tính Quadratic Weighted Kappa (QWK). Target QWK ≥ 0.7 mới dám dùng production.
- **Bias audit**: chia bài theo giới tính/vùng miền → kiểm score gap. IELTS auto-grader 2025 đã bị kiện vì gap 0.3 band giữa speakers ESL Á và Âu.
- **Show your work**: trả về **feedback có trích dẫn câu cụ thể** ("Câu 3 dùng 'although' đứng đầu vế độc lập"). Tăng trust và teachable moment.
- **Speaking grading**: WER không đủ - cần đánh giá fluency (WPM, filled pauses), pronunciation (GOP score) và content riêng.

`,
        theoryEn: `Trustworthy auto-grading is rubric-first, not LLM-first: score each criterion independently with concrete anchors, weight and round to the band. Run pre-checks (word count, off-topic, copy-paste). For speaking, use word-confidence ASR, fluency (WPM, fillers), phoneme-level pronunciation, and grade transcript coherence like an essay. Calibrate against a gold set of human-graded items, target QWK ≥ 0.75, watch drift on every model/prompt change, and route low-confidence cases to humans. Audit for demographic bias and always return actionable feedback, not just a number.`,
        code: `# Per-criterion rubric grader stub (LLM call faked)
# Đây là một đoạn mã giả lập việc chấm điểm bài luận dựa trên các tiêu chí (rubric).
# Nó giả lập cuộc gọi đến một mô hình ngôn ngữ lớn (LLM) để chấm điểm.
import json, statistics

# Định nghĩa các tiêu chí chấm điểm (rubric).
# Mỗi tiêu chí có một trọng số (weight) và điểm tối đa (max).
RUBRIC = {
    "task_response": {"weight": 0.25, "max": 9}, # Tiêu chí phản hồi nhiệm vụ
    "coherence":     {"weight": 0.25, "max": 9}, # Tiêu chí mạch lạc
    "lexical":       {"weight": 0.25, "max": 9}, # Tiêu chí từ vựng
    "grammar":       {"weight": 0.25, "max": 9}, # Tiêu chí ngữ pháp
}

# Hàm giả lập việc chấm điểm của LLM cho một tiêu chí cụ thể.
# Đầu vào: essay (bài luận), criterion (tiêu chí).
# Đầu ra: Một từ điển chứa điểm số, bằng chứng và phản hồi.
def fake_llm_judge(essay: str, criterion: str) -> dict:
    """Stub - replace with structured-output LLM call."""
    # Đây là hàm giả lập, cần được thay thế bằng cuộc gọi LLM thực tế.
    # Tính điểm cơ bản với một chút biến thể nhỏ dựa vào độ dài bài luận.
    base = 6 + (len(essay) % 3)        # toy variation
    # Trả về một từ điển với điểm số (giới hạn tối đa là 9),
    # bằng chứng (40 ký tự đầu của bài luận) và phản hồi chung.
    return {"score": min(9, base), "evidence": [essay[:40]],
            "feedback": f"Improve {criterion} by adding specific examples."}

# Hàm làm tròn điểm về nửa band (ví dụ: 6.0, 6.5, 7.0).
# Đầu vào: x (điểm số dạng float).
# Đầu ra: Điểm đã làm tròn về nửa band.
def half_band(x: float) -> float:
    return round(x * 2) / 2

# Hàm chính để chấm điểm toàn bộ bài luận.
# Đầu vào: essay (bài luận).
# Đầu ra: Một từ điển chứa điểm tổng thể, điểm từng tiêu chí, độ tin cậy và liệu có cần người xem lại không.
def grade_essay(essay: str) -> dict:
    # Chấm điểm từng tiêu chí bằng cách gọi hàm fake_llm_judge.
    # Đầu vào: bài luận và từng tiêu chí từ RUBRIC.
    # Đầu ra: Một từ điển chứa kết quả chấm điểm cho mỗi tiêu chí.
    per = {c: fake_llm_judge(essay, c) for c in RUBRIC}
    # Tính điểm tổng thể bằng cách lấy tổng điểm từng tiêu chí nhân với trọng số tương ứng,
    # sau đó làm tròn về nửa band.
    overall = half_band(sum(per[c]["score"] * RUBRIC[c]["weight"] for c in RUBRIC))
    # Tính độ lệch chuẩn của các điểm thành phần để đánh giá độ "phân tán" của điểm.
    spread = statistics.pstdev([per[c]["score"] for c in RUBRIC])
    # Xác định độ tin cậy dựa trên độ lệch chuẩn.
    # Nếu độ lệch chuẩn nhỏ, độ tin cậy cao.
    confidence = "high" if spread < 1.0 else "medium" if spread < 2.0 else "low"
    # Xác định xem bài luận có cần người xem lại hay không.
    # Cần xem lại nếu độ tin cậy thấp hoặc điểm tổng thể là 6.0 hoặc 7.0 (có thể là điểm biên).
    return {"overall": overall, "per": per, "confidence": confidence,
            "needs_human_review": confidence == "low" or overall in (6.0, 7.0)}

# Chấm điểm một bài luận mẫu (được lặp lại 20 lần để có độ dài).
# Đầu vào: Một chuỗi văn bản dài.
# Đầu ra: Một từ điển chứa kết quả chấm điểm.
result = grade_essay("Nowadays, technology helps students learn faster ... " * 20)
# In kết quả ra màn hình dưới dạng JSON dễ đọc.
# ensure_ascii=False để hiển thị ký tự tiếng Việt nếu có.
# indent=2 để định dạng JSON có thụt lề 2 khoảng trắng.
# Kết quả mong đợi là một đối tượng JSON với các trường "overall", "per", "confidence", "needs_human_review".
print(json.dumps(result, ensure_ascii=False, indent=2))`,
        codeLanguage: "python",
        exercise:
          "Viết qwk(human_scores, ai_scores) tính Quadratic Weighted Kappa giữa 2 list điểm (0..9). Cảnh báo khi qwk < 0.75.",
        exerciseEn:
          "Write qwk(human_scores, ai_scores) computing Quadratic Weighted Kappa between two lists of scores (0..9). Warn when qwk < 0.75.",
        quiz: [
          { question: "Vì sao phải chấm per-criterion thay vì 1 điểm tổng?", options: ["Tốn token hơn", "Để giải thích và sửa được - học sinh biết cần cải thiện gì", "Để giấu bug", "Không khác biệt"], answer: 1, explanation: "Điểm tổng không actionable; per-criterion + feedback mới giúp tiến bộ." },
          { question: "QWK đo gì?", options: ["Tốc độ chấm", "Agreement giữa 2 grader có ordinal scale, phạt mạnh lệch xa hơn lệch gần", "Cost", "RAM"], answer: 1, explanation: "QWK chuẩn vàng cho essay scoring (Hewlett ASAP)." },
          { question: "Vì sao không tự động trừ điểm khi 'AI-generated detector' báo dương?", options: ["Phát hiện AI hiện rất nhiễu - chỉ là tín hiệu, không phải bằng chứng", "Bằng chứng tuyệt đối", "Vì RLS", "Vì latency"], answer: 0, explanation: "Detector hiện vẫn FP cao - phạt tự động gây bất công." },
          { question: "Speaking: vì sao dùng word confidence từ ASR?", options: ["Để tránh trừ điểm khi ASR sai từ chứ không phải user", "Tăng tốc", "Bảo mật", "Không cần"], answer: 0, explanation: "Phải tách lỗi ASR khỏi lỗi học sinh để công bằng." },
          { question: "Khi nào route bài cho giáo viên review?", options: ["Tất cả", "Khi confidence thấp hoặc điểm gần ngưỡng band quan trọng + 10–20% sample định kỳ", "Không bao giờ", "Mỗi 1000 bài"], answer: 1, explanation: "Human-in-loop có chọn lọc giữ chất lượng mà không quá tải giáo viên." },
        ],
      },
      {
        id: "edtech-adv-5",
        title: "Knowledge Tracing & Mastery - đo 'học sinh thực sự biết gì'",
        titleEn: "Knowledge Tracing & Mastery - Measuring What a Student Really Knows",
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

## 2. 🧮 BKT (Bayesian Knowledge Tracing) - kinh điển 1995

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

## 3. 🧠 DKT (Deep Knowledge Tracing, 2015) - RNN/Transformer

BKT giả định độc lập giữa kỹ năng → kém khi kỹ năng liên quan (past simple ↔ past perfect). DKT dùng **RNN/Transformer** học embedding kỹ năng tự động → bắt được phụ thuộc.

\`\`\`
        x_1 ─▶ ┌────┐
        x_2 ─▶ │RNN ├─▶ h_t ─▶ Dense ─▶ P(đúng câu kế tiếp về mỗi skill)
        x_3 ─▶ └────┘
        x_t = (skill_id, correct?)
\`\`\`

## 4. 🪜 Mastery threshold - khi nào coi là "đã master"?

| Ngưỡng | Hệ quả |
|--------|--------|
| 0.70 | Tiến nhanh, nhưng nhiều bài bị quên sau |
| **0.85** | Cân bằng tốt (ASSISTments, Khan, Duolingo) |
| 0.95 | Chậm, tốn thời gian; phù hợp chứng chỉ |

Kết hợp với **Spaced Repetition**: đạt 0.85 → đưa vào lịch ôn dài hạn (không phải xong-là-quên).

## 5. 🔗 Skill Graph - bản đồ phụ thuộc

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

## ✨ Nâng cấp 2026 - Đo "thực sự biết"

- **BKT vs DKT vs SAKT**: BKT dễ hiểu, DKT mạnh hơn nhưng cần ≥10K học sinh, SAKT (transformer-based) hiện SOTA trên ASSISTments 2024.
- **Hierarchical mastery**: 1 skill = nhiều subskill (subtract → borrow → multi-digit). Chỉ unlock skill khi 80% subskill ≥ 0.85 mastery.
- **Forgetting in KT**: mastery không tăng đơn điệu - phải decay theo thời gian. Mô hình DKT-Forget hoặc KTM giải quyết.
- **Explainability**: parents/teachers cần biết "vì sao con tôi chưa đạt". Visualize mastery dưới dạng radar chart per skill - đã làm ở Student Dashboard.

`,
        theoryEn: `Knowledge Tracing estimates the probability a learner has mastered a skill from their answer history. BKT (1995) uses 4 params per skill (p_init, p_learn, p_slip, p_guess) with Bayesian updates. DKT (2015) uses RNN/Transformer to capture skill dependencies missed by BKT. Use a 0.85 mastery threshold (industry standard) and pair KT with spaced repetition to fight forgetting. Maintain a prerequisite skill graph so the system reroutes to fundamentals when a learner stalls. Watch for cold start, dirty skill tags, and ignoring time decay.`,
        code: `# Định nghĩa một hàm để cập nhật xác suất người học biết một kỹ năng
# Hàm này thực hiện một bước cập nhật trong mô hình Bayesian Knowledge Tracing (BKT)
# Đầu vào:
#   p_known: Xác suất hiện tại người học biết kỹ năng (số thực từ 0 đến 1).
#   correct: Kết quả của lần thử hiện tại (True nếu đúng, False nếu sai).
#   p_slip: Xác suất người học biết kỹ năng nhưng vẫn trả lời sai (lỗi trượt). Mặc định là 0.1.
#   p_guess: Xác suất người học không biết kỹ năng nhưng vẫn trả lời đúng (đoán mò). Mặc định là 0.2.
#   p_learn: Xác suất người học học được kỹ năng sau một lần thử. Mặc định là 0.1.
# Đầu ra:
#   Xác suất cập nhật người học biết kỹ năng sau lần thử.
def bkt_update(p_known: float, correct: bool,
               p_slip=0.1, p_guess=0.2, p_learn=0.1) -> float:
    """One-step Bayesian Knowledge Tracing update."""
    # Nếu người học trả lời đúng
    if correct:
        # Tính tử số (numerator) của công thức Bayes khi trả lời đúng
        # Đây là xác suất người học biết và không bị trượt
        num = p_known * (1 - p_slip)
        # Tính mẫu số (denominator) của công thức Bayes khi trả lời đúng
        # Đây là tổng xác suất trả lời đúng (biết và không trượt HOẶC không biết và đoán đúng)
        den = num + (1 - p_known) * p_guess
    # Nếu người học trả lời sai
    else:
        # Tính tử số của công thức Bayes khi trả lời sai
        # Đây là xác suất người học biết nhưng bị trượt
        num = p_known * p_slip
        # Tính mẫu số của công thức Bayes khi trả lời sai
        # Đây là tổng xác suất trả lời sai (biết và trượt HOẶC không biết và không đoán đúng)
        den = num + (1 - p_known) * (1 - p_guess)
    # Tính xác suất hậu nghiệm (posterior probability)
    # Nếu mẫu số khác 0, thì chia tử số cho mẫu số. Ngược lại, giữ nguyên p_known để tránh lỗi chia cho 0.
    posterior = num / den if den else p_known
    # Áp dụng bước học (learning step)
    # Đây là xác suất người học có thể học được kỹ năng sau lần thử, ngay cả khi xác suất hậu nghiệm thấp.
    # Đầu ra là xác suất cuối cùng sau khi đã tính đến khả năng học.
    return posterior + (1 - posterior) * p_learn

# Mô phỏng một người học với kỹ năng "quá khứ đơn" (past simple)
# Khởi tạo xác suất ban đầu người học biết kỹ năng (trạng thái "lạnh")
p = 0.15  # cold-start prior
# Lịch sử các lần thử của người học (True = đúng, False = sai)
history = [True, False, True, True, True, False, True, True]
# Lặp qua từng lần thử trong lịch sử
# i là số thứ tự câu hỏi (bắt đầu từ 1), c là kết quả của lần thử đó
for i, c in enumerate(history, 1):
    # Cập nhật xác suất người học biết kỹ năng sau mỗi lần thử
    # Đầu vào: xác suất hiện tại p, kết quả lần thử c
    # Đầu ra: xác suất p đã được cập nhật
    p = bkt_update(p, c)
    # Đặt cờ "MASTERED ✓" nếu xác suất biết kỹ năng đạt ngưỡng 0.85 trở lên
    flag = "MASTERED ✓" if p >= 0.85 else ""
    # In ra kết quả của từng câu hỏi: số câu, kết quả đúng/sai, xác suất biết kỹ năng, và cờ "MASTERED" nếu có
    # Kết quả mong đợi: Dòng chữ hiển thị tiến trình học của người học qua từng câu hỏi.
    print(f"Q{i} {'✓' if c else '✗'}  p(known) = {p:.3f}  {flag}")`,
        codeLanguage: "python",
        exercise:
          "Viết route_next_skill(skill_mastery: dict, graph: dict) chọn kỹ năng kế tiếp: nếu prerequisite < 0.6 → ôn nó trước; nếu hiện tại ≥ 0.85 → tiến lên skill con; ngược lại tiếp tục skill hiện tại.",
        exerciseEn:
          "Write route_next_skill(skill_mastery, graph): if a prerequisite is < 0.6, review it first; if current ≥ 0.85, advance to a child skill; otherwise stay on current.",
        quiz: [
          { question: "Vì sao 'trả lời đúng' không đồng nghĩa 'đã hiểu' trong KT?", options: ["Có thể đoán hoặc nhớ tạm", "Lỗi UI", "Sai đáp án gold", "Không có vấn đề"], answer: 0, explanation: "BKT mô hình hoá p_guess và p_slip vì lý do này." },
          { question: "p_slip trong BKT nghĩa là?", options: ["P(không biết nhưng đúng)", "P(biết nhưng trả lời sai do bất cẩn)", "Tỉ lệ skip bài", "Cost"], answer: 1, explanation: "Slip = biết mà lỡ; Guess = không biết mà trúng." },
          { question: "DKT khắc phục điểm yếu nào của BKT?", options: ["Quá nhanh", "Giả định kỹ năng độc lập - DKT bắt phụ thuộc qua RNN", "Quá rẻ", "Không có khác biệt"], answer: 1, explanation: "RNN/Transformer học embedding kỹ năng → bắt liên kết." },
          { question: "Ngưỡng mastery 0.85 phổ biến vì?", options: ["Số đẹp", "Cân bằng tiến độ và retention; chuẩn ngành (Khan, Duolingo)", "Tốc độ", "Không lý do"], answer: 1, explanation: "0.70 quên nhanh; 0.95 quá chậm; 0.85 là sweet spot." },
          { question: "Khi học sinh kẹt ở 'past perfect', hệ thống nên?", options: ["Cho bài khó hơn", "Ôn lại prerequisite 'past simple' trong skill graph", "Bỏ qua", "Hiển thị quảng cáo"], answer: 1, explanation: "Skill graph cho phép route về gốc khi học sinh chưa vững cơ sở." },
        ],
      },
      {
        id: "edtech-adv-6",
        title: "Onboarding & Behavioral Activation - kéo học sinh qua 'aha moment'",
        titleEn: "Onboarding & Behavioral Activation - Getting Learners to the 'Aha Moment'",
        level: 3,
        difficulty: "intermediate",
        theory: `![Onboarding funnel: signup → first lesson → aha moment → habit loop](/lesson-illustrations/edtech-onboarding-funnel.jpg)

## 1. 🎯 "Aha moment" - khoảnh khắc quyết định ở lại

Trong EdTech, **aha moment** không phải khi user đăng ký, mà khi họ **lần đầu cảm nhận tiến bộ rõ rệt** (hoàn thành bài đầu tiên + thấy mastery bar nhảy).

\`\`\`
   signup ─▶ first lesson ─▶ first quiz pass ─▶ first streak day 2
     100%      72%             48%                 31%   ← AHA cluster
                                                   │
                                                   ▼
                                    user 30× nhiều khả năng retain
\`\`\`

Mục tiêu onboarding: **đưa càng nhiều user qua cụm aha càng nhanh**.

## 2. 🚪 Friction audit - đếm clicks tới giá trị

| Bước | Click | Thời gian | Drop |
|------|-------|-----------|------|
| Landing → Signup | 1 | 5s | 35% |
| Signup → Email verify | 1 + email | 2 min | 22% |
| Verify → First lesson | 3 | 90s | 18% |
| First lesson → Quiz pass | quiz | 4 min | 28% |

Quy tắc: **mỗi 1 click thừa = ~10% drop**. Verify-by-email là kẻ giết người im lặng - cân nhắc magic-link hoặc OAuth.

## 3. 🧪 Empty state ≠ trang trắng

Empty state là **cơ hội dạy**, không phải lỗi UI. Mẫu tốt:

\`\`\`
   ┌──────────────────────────────────────────────┐
   │  👋 Chào bạn! Hãy thử bài đầu tiên:           │
   │                                              │
   │  [ ▶ Bắt đầu với "Hello, World!" - 3 phút ]  │
   │                                              │
   │  💡 Sau bài này, bạn sẽ nhận badge "First    │
   │     Step" và mở khoá Coding Lab.             │
   └──────────────────────────────────────────────┘
\`\`\`

Yếu tố bắt buộc: **CTA duy nhất**, **thời gian dự kiến**, **phần thưởng cụ thể**.

## 4. 📣 Behavioral triggers - push đúng người, đúng lúc

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

- **Onboarding 12 màn hình "show-and-tell"** - user bỏ ngay. Nguyên tắc: dạy bằng **làm**, không bằng **kể**.
- **Streak shaming trong tuần đầu** - đuổi user yếu trước khi họ kịp gắn bó.
- **Không đo cohort theo onboarding version** - không biết thay đổi nào giúp/hại.

## ✨ Nâng cấp 2026 - Activation thực chiến

- **Aha moment định lượng**: dùng phân tích cohort, tìm hành động mà người dùng D7-retained làm trong 24h đầu. Duolingo: "hoàn thành 2 lesson + đặt notification" → retention ×3.
- **Empty-state design**: state đầu tiên phải có CTA rõ + ví dụ mẫu. Đừng để học sinh thấy danh sách trống → 60% bỏ ngay.
- **Behavioral activation loops**: trigger (push) → action (lesson) → variable reward (XP, badge, streak) → investment (lưu progress). Áp dụng Nir Eyal Hook Model.
- **Notification cap**: ≤ 1 push/ngày cho học sinh mới, ≤ 3 cho power user. Vượt cap → opt-out rate tăng phi tuyến.
- **Cohort + funnel** là 2 dashboard bắt buộc. Mọi feature mới phải báo cáo "delta D1/D7/D30" sau A/B test 2 tuần.

`,
        theoryEn: `The aha moment in EdTech isn't sign-up - it's the first felt sense of progress (first quiz pass + mastery bar moving). Optimize onboarding to push more users into that cluster fast. Audit friction click-by-click (every extra click ≈ 10% drop). Replace empty states with single-CTA teaching moments. Wire behavioral triggers with strict frequency caps (≤1/day, 8 AM – 9 PM local) and deep links. Replace marketing tours with a 3-question intake (goal, level, time/day) that personalizes the first lesson so aha lands in under 10 minutes.`,
        code: `# Nhập các lớp cần thiết từ thư viện \`dataclasses\` để tạo lớp dữ liệu.
from dataclasses import dataclass
# Nhập các đối tượng \`datetime\` và \`timedelta\` từ thư viện \`datetime\` để làm việc với ngày và thời gian.
from datetime import datetime, timedelta
# Nhập \`Optional\` từ thư viện \`typing\` để chỉ ra rằng một giá trị có thể là một kiểu cụ thể hoặc \`None\`.
from typing import Optional

# Định nghĩa một lớp dữ liệu (dataclass) tên là \`Learner\`.
# Dataclass tự động tạo các phương thức như __init__, __repr__ cho chúng ta.
@dataclass
class Learner:
    # ID duy nhất của người học.
    user_id: str
    # Thời điểm người học đăng ký.
    signup_at: datetime
    # Thời điểm người học hoạt động gần đây nhất.
    last_active_at: datetime
    # Số ngày liên tiếp người học đã hoàn thành bài học.
    streak_days: int
    # Tổng số bài học đã hoàn thành.
    completed_lessons: int

# Định nghĩa một hằng số chứa các giờ "yên tĩnh" (từ 21h đến 23h).
# Trong khoảng thời gian này, hệ thống sẽ không gửi thông báo.
QUIET_HOURS = range(21, 24)  # don't push 21:00–08:00

# Định nghĩa hàm kiểm tra xem thời gian hiện tại có nằm trong "giờ yên tĩnh" hay không.
# Đầu vào: \`now\` (thời gian hiện tại).
# Đầu ra: \`True\` nếu đang trong giờ yên tĩnh, \`False\` nếu không.
def in_quiet_hours(now: datetime) -> bool:
    # Trả về True nếu giờ hiện tại nằm trong QUIET_HOURS (21, 22, 23) hoặc nhỏ hơn 8 (0, 1, ..., 7).
    return now.hour in QUIET_HOURS or now.hour < 8

# Định nghĩa hàm \`pick_trigger\` để chọn loại thông báo (trigger) phù hợp cho người học.
# Đầu vào: \`l\` (đối tượng Learner), \`now\` (thời gian hiện tại).
# Đầu ra: Một chuỗi mô tả loại thông báo hoặc \`None\` nếu không có thông báo nào phù hợp.
def pick_trigger(l: Learner, now: datetime) -> Optional[str]:
    # Bước 1: Kiểm tra xem có đang trong giờ yên tĩnh không.
    # Nếu có, không gửi thông báo nào.
    if in_quiet_hours(now):
        return None
    # Tính số ngày không hoạt động của người học.
    inactive = (now - l.last_active_at).days
    # Bước 2: Kiểm tra điều kiện gửi thông báo "chào mừng" cho người mới.
    # Nếu người học chưa hoàn thành bài nào và đã không hoạt động ít nhất 1 ngày.
    if l.completed_lessons == 0 and inactive >= 1:
        # Trả về thông báo gợi ý bài học khởi đầu.
        return "welcome_nudge:try a 5-min starter lesson"
    # Bước 3: Kiểm tra điều kiện gửi thông báo "giữ chuỗi" cho người có chuỗi học.
    # Nếu người học có chuỗi học từ 2 ngày trở lên, không hoạt động ít nhất 1 ngày và hiện tại là 20h.
    if l.streak_days >= 2 and inactive >= 1 and now.hour == 20:
        # Trả về thông báo nhắc nhở giữ chuỗi.
        return "streak_save:keep your streak alive"
    # Bước 4: Kiểm tra điều kiện gửi thông báo "kéo lại" sau 7 ngày không hoạt động.
    # Nếu người học không hoạt động đúng 7 ngày.
    if inactive == 7:
        # Trả về thông báo gợi ý bài học mới.
        return "winback:a fresh lesson tailored for you"
    # Bước 5: Kiểm tra điều kiện gửi thông báo "tái tương tác" sau 30 ngày không hoạt động.
    # Nếu người học không hoạt động đúng 30 ngày.
    if inactive == 30:
        # Trả về thông báo khuyến khích xem lại tiến độ.
        return "reengage:see how far you came + one small win"
    # Bước 6: Nếu không có điều kiện nào ở trên khớp, không gửi thông báo nào.
    return None

# Khởi tạo thời gian hiện tại giả định là 20h05 ngày 29 tháng 5 năm 2026.
now = datetime(2026, 5, 29, 20, 5)
# Khởi tạo một đối tượng Learner với các thông tin giả định.
# Người học có ID "u1", đăng ký 10 ngày trước, hoạt động lần cuối 1 ngày trước, có chuỗi 3 ngày, hoàn thành 4 bài.
l = Learner("u1", now - timedelta(days=10), now - timedelta(days=1), 3, 4)
# Gọi hàm \`pick_trigger\` để xác định thông báo cho người học \`l\` tại thời điểm \`now\`.
# In kết quả ra màn hình.
# Kết quả mong đợi: "streak_save:keep your streak alive" vì l.streak_days >= 2, inactive >= 1 và now.hour == 20.
print(pick_trigger(l, now))`,
        codeLanguage: "python",
        exercise:
          "Thêm logic frequency cap: nếu user đã nhận ≥ 1 push trong 24h qua, trả về None bất kể trigger nào.",
        exerciseEn:
          "Add a frequency cap: if the user already received ≥1 push in the last 24h, return None regardless of trigger.",
        quiz: [
          { question: "Aha moment trong EdTech là?", options: ["Lúc đăng ký", "Lần đầu cảm nhận tiến bộ rõ rệt (vd quiz pass + mastery nhảy)", "Khi mở app", "Khi xoá tài khoản"], answer: 1, explanation: "User vượt qua aha cluster có khả năng retain cao hơn nhiều lần." },
          { question: "Vì sao verify-by-email hại onboarding?", options: ["Bảo mật yếu", "Tạo break ~2 phút và 22% drop - phá đà tiến tới aha", "Tốn DB", "Không hại"], answer: 1, explanation: "Magic-link / OAuth giảm drop đáng kể." },
          { question: "Empty state nên có gì?", options: ["Logo to", "Một CTA duy nhất + thời gian dự kiến + phần thưởng cụ thể", "3 banner ads", "Không quan trọng"], answer: 1, explanation: "Empty state là cơ hội dạy bằng hành động, không phải lỗi UI." },
          { question: "Quy tắc tần suất push hợp lý?", options: ["Càng nhiều càng tốt", "≤1/ngày, tránh 21:00–08:00 địa phương", "Mỗi giờ", "Không có quy tắc"], answer: 1, explanation: "Vượt cap → unsubscribe và đánh giá thấp app store." },
          { question: "Onboarding 12 màn show-and-tell vấn đề gì?", options: ["Quá đắt", "Dạy bằng kể thay vì làm - user bỏ trước khi chạm aha", "Quá nhanh", "Không vấn đề"], answer: 1, explanation: "Onboarding tốt dạy bằng hành động + phản hồi tức thì." },
        ],
      },
      {
        id: "edtech-adv-7",
        title: "Recommendation cho lộ trình học - gợi bài tiếp theo đúng người đúng lúc",
        titleEn: "Learning-path Recommendation - The Right Next Lesson",
        level: 4,
        difficulty: "advanced",
        theory: `## 1. 🧭 Khác biệt với recommender thương mại

Netflix gợi phim **thích** → tối đa hoá click. EdTech gợi bài **nên học** → tối đa hoá **mastery growth** và **giữ động lực**. Recommend bài quá dễ = chán; quá khó = bỏ; vừa sức = "flow".

## 2. 🎯 Khung Zone of Proximal Development (Vygotsky)

\`\`\`
   khó │ ░░░░░░░░░░░░░░░░ frustration zone (bỏ)
       │ ░░░░░░░░░░░░░░░░
       │ ████████████████  ← ZPD (sweet spot)
       │ ████████████████
   dễ  │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ boredom zone (chán)
       └──────────────────
              khả năng người học
\`\`\`

Mục tiêu: chọn bài có **xác suất pass ≈ 0.6–0.8** dựa trên mastery hiện tại.

## 3. 🧮 Ba họ thuật toán

| Cách | Cơ chế | Mạnh / Yếu |
|------|--------|-----------|
| **Content-based** | Bài tương đồng skill tags | Cold-start tốt / hẹp |
| **Collaborative filtering** | "Học sinh giống bạn đã học X tiếp theo" | Khám phá rộng / cần dữ liệu |
| **Knowledge-graph + mastery** | DAG prerequisite + mastery score | Sư phạm chuẩn / khó dựng |

Production: **lai cả ba** - KG để hợp lệ, CF để đa dạng, content để cold-start.

## 4. 🪜 Pipeline gợi ý

\`\`\`
   ┌──────────────────────────────────────────────┐
   │ 1. Candidate generation (200 bài hợp lệ)     │
   │    - lọc theo prerequisite đã thoả           │
   │    - lọc theo level user                     │
   ├──────────────────────────────────────────────┤
   │ 2. Scoring (ranking)                          │
   │    score = 0.5*mastery_gap                    │
   │          + 0.2*novelty                        │
   │          + 0.2*similar_users                  │
   │          - 0.1*recent_seen                    │
   ├──────────────────────────────────────────────┤
   │ 3. Diversity re-rank (MMR)                    │
   │    tránh 5 bài cùng chủ đề liên tiếp          │
   ├──────────────────────────────────────────────┤
   │ 4. Constraints                                │
   │    daily cap, không gợi bài đã pass <7 ngày   │
   └──────────────────────────────────────────────┘
\`\`\`

## 5. ❄️ Cold-start (user mới)

- Hỏi 3–5 câu khảo sát (mục tiêu, trình độ tự đánh giá).
- Chạy **placement quiz adaptive** 8–12 câu (IRT) để ước lượng θ.
- Map θ → entry node trong knowledge graph.

## 6. ⚠️ Bẫy

- **Filter bubble sư phạm**: chỉ gợi chủ đề mạnh → user không phát triển kỹ năng yếu. Phải **gợi xen** 20% bài "kỹ năng yếu".
- **Popularity bias**: bài hot luôn được gợi → bài tốt nhưng mới chết yểu. Inject randomness ε=0.05.
- **Reward hack**: tối ưu CTR → gợi bài siêu dễ. Tối ưu **mastery growth/tuần**, không phải click.
`,
        theoryEn: `Educational recommenders optimize mastery growth, not clicks. Aim for the ZPD (~60–80% pass probability). Combine content-based, collaborative filtering, and knowledge-graph approaches. Pipeline: candidate generation → ranking → MMR diversity → constraints. Solve cold-start with surveys + adaptive placement quiz. Beware filter bubbles, popularity bias, and reward hacking - explicitly inject weak-skill practice and randomness.`,
        code: `# Nhập các thư viện cần thiết.
# 'math' để sử dụng các hàm toán học như exp (số mũ).
# 'random' để tạo số ngẫu nhiên.
import math, random
# 'dataclass' từ module 'dataclasses' giúp tạo các lớp (class) đơn giản để lưu trữ dữ liệu.
from dataclasses import dataclass

# Định nghĩa một lớp dữ liệu (dataclass) có tên 'Lesson'.
# Lớp này dùng để biểu diễn một bài học với các thuộc tính cụ thể.
@dataclass
class Lesson:
    # ID duy nhất của bài học (chuỗi).
    id: str
    # Kỹ năng mà bài học này tập trung vào (chuỗi).
    skill: str
    # Độ khó của bài học, giá trị từ 0 đến 1 (số thực).
    difficulty: float   # 0–1
    # Danh sách các ID bài học là điều kiện tiên quyết để học bài này (danh sách chuỗi).
    prereqs: list[str]

# Định nghĩa một lớp dữ liệu (dataclass) có tên 'Learner'.
# Lớp này dùng để biểu diễn một người học với các thuộc tính về trình độ.
@dataclass
class Learner:
    # Mức độ thành thạo của người học đối với từng kỹ năng.
    # Là một từ điển (dict) với khóa là tên kỹ năng (chuỗi) và giá trị là mức độ thành thạo (số thực từ 0 đến 1).
    mastery: dict[str, float]   # skill -> 0..1
    # Tập hợp (set) các ID bài học mà người học đã hoàn thành.
    completed: set[str]

# Định nghĩa hàm 'passable' để kiểm tra xem người học có đủ điều kiện để học một bài học hay không.
# Đầu vào: 'lesson' (một đối tượng Lesson), 'learner' (một đối tượng Learner).
# Đầu ra: True nếu người học đã hoàn thành tất cả các điều kiện tiên quyết, ngược lại là False.
def passable(lesson, learner):
    # Kiểm tra xem TẤT CẢ các điều kiện tiên quyết (prereqs) của bài học
    # có nằm trong danh sách các bài đã hoàn thành (completed) của người học hay không.
    return all(p in learner.completed for p in lesson.prereqs)

# Định nghĩa hàm 'pass_prob' để tính xác suất người học sẽ vượt qua một bài học.
# Đầu vào: 'lesson' (một đối tượng Lesson), 'learner' (một đối tượng Learner).
# Đầu ra: Xác suất vượt qua bài học (số thực từ 0 đến 1).
def pass_prob(lesson, learner):
    # Lấy mức độ thành thạo của người học đối với kỹ năng của bài học.
    # Nếu kỹ năng chưa có trong 'mastery', mặc định là 0.0.
    m = learner.mastery.get(lesson.skill, 0.0)
    # Tính toán xác suất dựa trên mô hình logistic.
    # Xác suất cao nếu mức độ thành thạo (m) cao hơn độ khó (difficulty).
    # logistic gap: high prob if mastery ≥ difficulty
    return 1 / (1 + math.exp(-6 * (m - lesson.difficulty + 0.1)))

# Định nghĩa hàm 'score' để tính điểm "phù hợp" của một bài học đối với người học.
# Điểm này cho biết bài học đó có "vừa sức" với người học hay không.
# Đầu vào: 'lesson' (một đối tượng Lesson), 'learner' (một đối tượng Learner).
# Đầu ra: Điểm phù hợp (số thực).
def score(lesson, learner):
    # Tính xác suất người học vượt qua bài học.
    p = pass_prob(lesson, learner)
    # Tính toán độ "phù hợp" dựa trên xác suất vượt qua.
    # Điểm cao nhất khi xác suất p gần 0.7 (bài học không quá dễ, không quá khó).
    # sweet spot p≈0.7 → max score; penalise too easy / too hard
    fit = 1 - abs(p - 0.7) * 2
    # Đảm bảo điểm không âm (ít nhất là 0).
    return max(0, fit)

# Định nghĩa hàm 'recommend' để đề xuất các bài học cho người học.
# Đầu vào:
#   'catalog': Danh sách tất cả các bài học có sẵn.
#   'learner': Đối tượng người học.
#   'k': Số lượng bài học muốn đề xuất (mặc định là 3).
#   'weak_skill_quota': Tỷ lệ cơ hội để đề xuất một bài học về kỹ năng yếu nhất (mặc định là 0.2).
# Đầu ra: Danh sách các bài học được đề xuất.
def recommend(catalog, learner, k=3, weak_skill_quota=0.2):
    # Lọc ra các bài học mà người học đủ điều kiện (passable) và chưa hoàn thành.
    eligible = [l for l in catalog if passable(l, learner) and l.id not in learner.completed]
    # Sắp xếp các bài học đủ điều kiện theo điểm phù hợp (score) giảm dần.
    eligible.sort(key=lambda l: score(l, learner), reverse=True)
    # Chọn 'k' bài học có điểm phù hợp cao nhất.
    pick = eligible[:k]
    # Logic để "chèn" một bài học về kỹ năng yếu nhất của người học.
    # inject weak-skill bait
    # Tìm kỹ năng yếu nhất của người học (kỹ năng có mức độ thành thạo thấp nhất).
    weakest = min(learner.mastery, key=learner.mastery.get)
    # Tìm các bài học đủ điều kiện liên quan đến kỹ năng yếu nhất và chưa có trong danh sách đề xuất ban đầu.
    weak = [l for l in eligible if l.skill == weakest and l not in pick]
    # Nếu có bài học về kỹ năng yếu và một số ngẫu nhiên nhỏ hơn 'weak_skill_quota',
    # thì thay thế bài học cuối cùng trong danh sách đề xuất bằng bài học về kỹ năng yếu nhất.
    if weak and random.random() < weak_skill_quota:
        pick[-1] = weak[0]
    # Trả về danh sách các bài học được đề xuất.
    return pick

# Tạo một danh mục (catalog) gồm 20 bài học mẫu.
# Mỗi bài học có ID, kỹ năng ngẫu nhiên ("read" hoặc "listen"), độ khó ngẫu nhiên và không có điều kiện tiên quyết.
cat = [Lesson(f"L{i}", random.choice(["read","listen"]), random.random(), []) for i in range(20)]
# Tạo một đối tượng người học mẫu với mức độ thành thạo và danh sách bài đã hoàn thành.
me = Learner(mastery={"read": 0.6, "listen": 0.3}, completed=set())
# Gọi hàm 'recommend' để lấy danh sách các bài học được đề xuất cho người học 'me'.
# Sau đó, in ra ID, kỹ năng, độ khó (làm tròn 2 chữ số) và điểm phù hợp (làm tròn 2 chữ số) của mỗi bài học.
# Kết quả mong đợi: 3 bài học được đề xuất, mỗi bài trên một dòng với các thông tin đã làm tròn.
for l in recommend(cat, me): print(l.id, l.skill, round(l.difficulty,2), round(score(l, me),2))`,
        codeLanguage: "python",
        exercise:
          "Thêm MMR re-rank: với 5 candidate top, đảm bảo không có 2 bài cùng skill liên tiếp (xáo dạng).",
        exerciseEn:
          "Add MMR re-rank on the top-5 candidates so no two consecutive items share the same skill.",
        quiz: [
          { question: "Mục tiêu recommender EdTech khác Netflix ở chỗ?", options: ["Không khác", "Tối đa mastery growth + động lực, không phải click/watch time", "Đa dạng hơn", "Rẻ hơn"], answer: 1, explanation: "Mục tiêu giáo dục ≠ thương mại - tối ưu CTR sẽ gợi bài siêu dễ." },
          { question: "ZPD nói rằng bài nên có pass_prob ≈?", options: ["0.1", "0.6–0.8", "0.95", "0.5 chính xác"], answer: 1, explanation: "Vừa sức = sweet spot 60–80%." },
          { question: "Filter bubble sư phạm là?", options: ["Bug UI", "Chỉ gợi điểm mạnh → user không phát triển kỹ năng yếu", "Bài giảng quá dài", "Caching"], answer: 1, explanation: "Cần inject ~20% bài kỹ năng yếu." },
          { question: "Cold-start tốt cho EdTech là?", options: ["Đoán random", "Survey + adaptive placement quiz IRT để ước lượng θ", "Đợi 1 tháng", "Hỏi giáo viên"], answer: 1, explanation: "Vài câu IRT tốt hơn nhiều survey thuần." },
          { question: "Popularity bias khắc phục bằng?", options: ["Không gợi bài hot", "ε-greedy / random 5% để bài mới có cơ hội", "Tăng giá bài hot", "Không có cách"], answer: 1, explanation: "Khám phá ngẫu nhiên giúp tránh winner-takes-all." },
        ],
      },
      {
        id: "edtech-adv-8",
        title: "Quyền riêng tư trẻ em - COPPA, GDPR-K, FERPA cho EdTech",
        titleEn: "Children's Privacy - COPPA, GDPR-K, FERPA for EdTech",
        level: 4,
        difficulty: "advanced",
        theory: `## 1. ⚖️ Vì sao EdTech bị soi đặc biệt?

Người học EdTech có thể là **trẻ em < 13** (Mỹ) hoặc **< 16** (EU). Luật bảo vệ dữ liệu trẻ em **nghiêm hơn nhiều** lần luật người lớn - vi phạm = phạt triệu USD và mất app store.

## 2. 🗺️ Bản đồ luật

| Luật | Phạm vi | Tuổi | Điểm cốt lõi |
|------|---------|------|--------------|
| **COPPA** (US) | Dịch vụ Mỹ thu PII trẻ em | <13 | Verifiable Parental Consent (VPC) trước thu thập |
| **GDPR-K** (EU) | Mọi xử lý PII công dân EU | <16 (mỗi nước có thể hạ xuống 13) | Lawful basis + parental consent |
| **FERPA** (US) | Hồ sơ giáo dục trường học | mọi tuổi | Trường kiểm soát, vendor là 'school official' |
| **PIPL** (TQ) | Công dân TQ | <14 | Consent riêng cho minor |
| **Luật BVDLCN 2025** (VN) | Người Việt | <15 cần cha mẹ | Tương tự GDPR, có ngoại lệ giáo dục |

## 3. 🚦 Nguyên tắc Data Minimization

\`\`\`
   ┌──────────────────────────────────────────────┐
   │  THU CÀNG ÍT CÀNG TỐT                        │
   │  ─────────────────────────────────────────── │
   │  ❌ Họ tên + địa chỉ + ngày sinh + giới tính │
   │  ✅ Nickname + tuổi-bucket (8–10, 11–13)     │
   │                                              │
   │  ❌ Ảnh khuôn mặt user-uploaded              │
   │  ✅ Avatar chibi chọn từ thư viện            │
   └──────────────────────────────────────────────┘
\`\`\`

## 4. 🔐 Patterns đúng cho EdTech trẻ em

| Pattern | Mô tả |
|---------|-------|
| **Parent gate** | Phép tính nhân để mở Settings (chặn trẻ tự đổi consent) |
| **Email verify cha mẹ** | Magic link tới email cha mẹ trước khi thu PII |
| **No third-party tracking** | TUYỆT ĐỐI không Facebook Pixel, GA cá nhân hoá quảng cáo trên trang trẻ em |
| **No DM giữa user** | Hoặc nếu có thì moderated + premade messages |
| **Right to be forgotten** | Nút xoá tài khoản → cascade xoá real-time, không "ẩn" |
| **Audit log** | Truy cập PII của staff phải log |

## 5. 🧹 Data lifecycle

\`\`\`
   collect ─▶ encrypt at rest ─▶ retention timer ─▶ purge
                                      ▲                │
                                      └─ user/parent xoá ┘
\`\`\`

Retention rule mẫu: log hoạt động 90 ngày, kết quả học 2 năm, audio recording 7 ngày, **không có** raw PII trong analytics warehouse (chỉ pseudonymous ID).

## 6. ⚠️ Bẫy thường gặp

- "Chúng tôi không gửi cho ai cả" - nhưng SDK ads/analytics gửi giùm bạn. **Audit mọi SDK**.
- Lưu IP + user-agent vĩnh viễn → vẫn là PII gián tiếp.
- "Anonymous" mà có 3 thuộc tính (zip + tuổi + giới tính) = re-identify được 87% người.
- Cho phép giáo viên export full class data về máy → mất kiểm soát, vẫn là bạn chịu trách nhiệm.
`,
        theoryEn: `EdTech faces stricter privacy law because users may be minors: COPPA (<13, US, parental consent), GDPR-K (<16, EU), FERPA (US school records), PIPL (China, <14), and Vietnam's 2025 PDP law (<15). Apply data minimization (no real names if a nickname will do), parent gates, email-verified parental consent, ban third-party ad SDKs, support right-to-be-forgotten with cascading deletes, and enforce strict retention timers. Avoid quasi-identifiers that re-enable re-identification.`,
        code: `# Nhập các lớp và hàm cần thiết từ thư viện \`datetime\` để làm việc với ngày giờ.
from datetime import datetime, timedelta
# Nhập các lớp và hàm cần thiết từ thư viện \`dataclasses\` để tạo các lớp dữ liệu gọn gàng.
from dataclasses import dataclass, field

# Định nghĩa một từ điển chứa số ngày lưu trữ (retention days) cho từng loại dữ liệu.
# Đầu vào: Tên loại dữ liệu (chuỗi).
# Đầu ra: Số ngày dữ liệu đó được giữ lại trước khi bị xóa.
RETENTION_DAYS = {
    "activity_log": 90,
    "lesson_result": 730,
    "audio_recording": 7,
    "raw_pii_in_analytics": 0,   # never - không bao giờ được lưu trữ, luôn xóa ngay lập tức
}

# Định nghĩa một lớp dữ liệu (dataclass) để biểu diễn một bản ghi.
# Dataclass giúp tạo các lớp đơn giản để lưu trữ dữ liệu.
@dataclass
class Record:
    # Trường \`kind\` (loại) của bản ghi, ví dụ: "audio_recording".
    kind: str
    # Trường \`created_at\` (thời gian tạo) của bản ghi, kiểu datetime.
    created_at: datetime
    # Trường \`data\` (dữ liệu) của bản ghi, là một từ điển.
    # \`default_factory=dict\` đảm bảo mỗi đối tượng Record có một từ điển \`data\` riêng biệt.
    data: dict = field(default_factory=dict)

# Định nghĩa hàm kiểm tra xem một bản ghi có nên bị xóa (purge) hay không.
# Đầu vào:
#   - \`r\`: Một đối tượng \`Record\` cần kiểm tra.
#   - \`now\`: Thời điểm hiện tại (kiểu datetime) để so sánh.
# Đầu ra: \`True\` nếu bản ghi nên bị xóa, \`False\` nếu không.
def should_purge(r: Record, now: datetime) -> bool:
    # Lấy số ngày lưu trữ cho loại bản ghi này từ từ điển \`RETENTION_DAYS\`.
    # Nếu không tìm thấy loại bản ghi, mặc định là 30 ngày.
    days = RETENTION_DAYS.get(r.kind, 30)
    # Nếu số ngày lưu trữ là 0, có nghĩa là bản ghi này không được phép lưu trữ.
    # Nó phải được xóa ngay lập tức.
    if days == 0:  # forbidden in this store - không được phép lưu trữ trong hệ thống này
        return True
    # Tính toán sự khác biệt thời gian giữa hiện tại và thời gian tạo bản ghi.
    # So sánh sự khác biệt này với số ngày lưu trữ.
    # Nếu thời gian đã trôi qua lớn hơn số ngày cho phép, bản ghi nên bị xóa.
    return (now - r.created_at) > timedelta(days=days)

# Định nghĩa hàm kiểm tra xem một người có phải là trẻ vị thành niên hay không.
# Đầu vào:
#   - \`age\`: Tuổi của người đó (số nguyên).
#   - \`jurisdiction\`: Khu vực pháp lý (quốc gia, ví dụ: "US", "EU").
# Đầu ra: \`True\` nếu là trẻ vị thành niên, \`False\` nếu không.
def is_minor(age: int, jurisdiction: str) -> bool:
    # Định nghĩa tuổi giới hạn (cap) cho từng khu vực pháp lý.
    # Nếu khu vực không có trong danh sách, mặc định là 16 tuổi.
    cap = {"US": 13, "EU": 16, "CN": 14, "VN": 15}.get(jurisdiction, 16)
    # So sánh tuổi với giới hạn. Nếu tuổi nhỏ hơn giới hạn, đó là trẻ vị thành niên.
    return age < cap

# Định nghĩa hàm kiểm tra xem một người có cần sự đồng ý của phụ huynh hay không.
# Hàm này chỉ đơn giản gọi hàm \`is_minor\` để xác định.
# Đầu vào:
#   - \`age\`: Tuổi của người đó (số nguyên).
#   - \`jurisdiction\`: Khu vực pháp lý.
# Đầu ra: \`True\` nếu cần sự đồng ý của phụ huynh, \`False\` nếu không.
def requires_parental_consent(age: int, jurisdiction: str) -> bool:
    # Trả về kết quả của việc kiểm tra xem người đó có phải là trẻ vị thành niên hay không.
    return is_minor(age, jurisdiction)

# Định nghĩa thời điểm hiện tại giả định để kiểm tra.
now = datetime(2026, 5, 29)
# Tạo một danh sách các bản ghi mẫu để kiểm tra.
records = [
    # Bản ghi âm, tạo cách đây 10 ngày.
    Record("audio_recording", now - timedelta(days=10)),
    # Kết quả bài học, tạo cách đây 400 ngày.
    Record("lesson_result",   now - timedelta(days=400)),
    # Dữ liệu PII thô trong phân tích, tạo ngay tại thời điểm \`now\`.
    Record("raw_pii_in_analytics", now),
]
# Lặp qua từng bản ghi trong danh sách.
for r in records:
    # In ra loại bản ghi và kết quả của việc kiểm tra xem nó có nên bị xóa hay không.
    # Kết quả mong đợi:
    # audio_recording → purge? True (vì 10 ngày > 7 ngày)
    # lesson_result → purge? False (vì 400 ngày < 730 ngày)
    # raw_pii_in_analytics → purge? True (vì retention_days là 0)
    print(r.kind, "→ purge?" , should_purge(r, now))

# Lặp qua một danh sách các cặp (tuổi, khu vực pháp lý) để kiểm tra.
for age, juris in [(10,"US"), (14,"EU"), (15,"VN"), (18,"US")]:
    # In ra tuổi, khu vực pháp lý và kết quả của việc kiểm tra xem có cần sự đồng ý của phụ huynh hay không.
    # Kết quả mong đợi:
    # age=10 US → parental consent? True
    # age=14 EU → parental consent? True
    # age=15 VN → parental consent? False
    # age=18 US → parental consent? False
    print(f"age={age} {juris} → parental consent? {requires_parental_consent(age, juris)}")`,
        codeLanguage: "python",
        exercise:
          "Viết hàm pseudonymize(record) thay user_id thật bằng HMAC-SHA256(salt + user_id) và loại bỏ trường tên/email khỏi bản analytics.",
        exerciseEn:
          "Write pseudonymize(record) that replaces real user_id with HMAC-SHA256(salt + user_id) and strips name/email fields from the analytics copy.",
        quiz: [
          { question: "COPPA bảo vệ trẻ em dưới?", options: ["10", "13", "16", "18"], answer: 1, explanation: "<13 ở Mỹ, cần Verifiable Parental Consent." },
          { question: "GDPR-K có thể hạ tuổi consent xuống tối thiểu?", options: ["10", "13 (mỗi nước EU tự chọn 13–16)", "16 mọi nơi", "18"], answer: 1, explanation: "Mặc định 16, mỗi quốc gia có thể hạ xuống tối thiểu 13." },
          { question: "Bẫy 'anonymous' tệ nhất là?", options: ["UI xấu", "Quasi-identifiers (zip+age+gender) re-identify ~87% người", "Tốn DB", "Không có"], answer: 1, explanation: "Latanya Sweeney 2000 và các nghiên cứu sau đều xác nhận." },
          { question: "Parent gate (phép tính nhân) dùng để?", options: ["Vui", "Chặn trẻ em tự đổi consent / mua hàng", "Test toán", "Bảo mật server"], answer: 1, explanation: "Một cổng kiểm tra người lớn nhanh, không có PII." },
          { question: "Khi user xoá tài khoản, EdTech nên?", options: ["Soft delete vĩnh viễn", "Cascade xoá thật trong khung thời gian luật quy định + audit log", "Giữ để báo cáo", "Bán cho bên thứ 3"], answer: 1, explanation: "Right to be forgotten là bắt buộc; soft-delete vô thời hạn = vi phạm." },
        ],
      },
    ],
  },
];


