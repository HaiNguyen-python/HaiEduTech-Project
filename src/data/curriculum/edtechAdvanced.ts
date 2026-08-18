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
        theoryEn: `![Ebbinghaus forgetting curve and spaced repetition](/lesson-illustrations/edtech-spaced-repetition.jpg)

## 1. \u{1F9E0} The Ebbinghaus Forgetting Curve

Memory decays exponentially: \`R(t) = e^(-t / S)\` where \`S\` = "stability". Every correct review increases \`S\`, which stretches the gap until the next review.

\`\`\`
   Retention
     1.0 │●
         │ \\
     0.8 │  ●         ← review here (R≈0.85) is the cost/benefit optimum
         │   \\\\
     0.5 │     ●_____
         │           ‾●______
     0.2 │                    ‾‾●_____
         └──────────────────────────────▶ days
              1    3    7    14    30
\`\`\`

## 2. ⚙️ The SM-2 Algorithm (Anki, 1987)

Every review gets a quality score \`q ∈ {0..5}\` (0 = complete blackout, 5 = perfect recall).

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

Simple, and it has worked for 38 years.

## 3. 🚀 FSRS (Free Spaced Repetition Scheduler, 2023+)

A 3-variable model per card:

| Variable | Meaning |
|------|---------|
| **D** Difficulty | How hard the card is for this user (1-10) |
| **S** Stability | How long the memory "sticks" before R falls to a threshold |
| **R** Retrievability | Probability of recalling it right now |

Scheduling uses a **target retention** (e.g. 90%): solve \`R = exp(-t/S)\` backwards → \`t = -S · ln(0.9)\`.

Compared to SM-2:

| Aspect | SM-2 | FSRS |
|-----------|------|------|
| Basis | Heuristic | Statistical model fit to real logs |
| User parameters | 0 | ~17 (learned from data) |
| Efficiency | Good | 20-30% higher per Anki benchmarks |
| Deployment | A few lines | Needs params fit from review logs |

## 4. 🏗️ Minimal Review-Table Schema

\`\`\`
   reviews(user_id, card_id, ts, rating 1–4,
           prev_interval_d, new_interval_d,
           stability, difficulty)
\`\`\`

Rules:
- **Immutable**: never edit old reviews - if you need to re-fit FSRS, replay the log.
- Store the **raw rating** instead of just pass/fail - so you can swap algorithms later.

## 5. ⚠️ Common Pitfalls

- Resetting the interval to 1 just because the user missed one day is demoralizing. FSRS handles "lateness" more smoothly.
- Setting target retention to 99% causes way too many reviews - users quit. 85–90% is the sweet spot.
- Mixing "new" and "due" cards at the wrong ratio overwhelms users. Rule of thumb: ≤ 20 new cards/day for beginners.

## ✨ 2026 Upgrade - Modern SRS

- **FSRS-5** (open-source, used in Anki since 2024) beats classic SM-2/Anki: 20-30% fewer reviews for the same retention.
- **Half-life regression** (Duolingo) estimates directly "when will this learner forget" - great fit for apps with more data than a single user.
- **Per-item adaptive intervals**: "cake" is easier than "ubiquitous" - don't put them on the same curve. FSRS scores a "difficulty 1-10" per item from recall history.
- **Practical tip for HaiEduTech**: combine SRS with **interleaving** (mixing topics) - boosts long-term retention 15-25% versus blocked practice.

`,
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
        theoryEn: `![Adaptive learning system overview](/lesson-illustrations/edtech-adaptive-learning.jpg)

## 1. 🎯 Why "static tests" fail every student

Fixed tests: strong students get bored, weak students get discouraged. Adaptive testing picks each item **based on the estimated ability** so every question carries the most information possible.

\`\`\`
                       Ability θ
       ───────────────────────────────────────▶
       weak   ─────  ●  ─────────  ●  ───────  strong
                   user A                user B
       item for A: matches A's level    item for B: matches B's level
\`\`\`

## 2. 📐 IRT 2PL - 2-Parameter Item Response Theory

The probability that a learner of ability \`θ\` answers correctly an item with difficulty \`b\` and discrimination \`a\`:

\`\`\`
                          1
   P(correct | θ, a, b) = ─────────────────
                          1 + exp(-a (θ - b))
\`\`\`

\`\`\`
   P
   1 ┤              ____________  large a → steep curve
     │            /                (item discriminates well)
   0.5┤  ─ ─ ─ ─/─ ─ ─ ─ ─        crosses 0.5 at θ = b
     │       /
   0 ┤_____/_______________________ θ
             b
\`\`\`

Adaptive algorithm:
1. Guess an initial \`θ₀\` from the learner's profile.
2. Pick an item with \`b ≈ θ\` (maximizes Fisher information).
3. Update \`θ\` via MAP/MLE after each item.
4. Stop when the standard error \`SE(θ) < threshold\` (e.g. 0.3).

## 3. 🪜 Mastery Learning (Bloom)

A skill is considered **mastered** when \`P(correct) ≥ 0.85\` across N consecutive items. Structure the curriculum as a **prerequisite graph**:

\`\`\`
   addition ─┐
             ├─▶ multiplication ─┐
   counting ─┘                   ├─▶ fractions ─▶ algebra
                   ─── subtraction ┘
\`\`\`

A learner only unlocks a child node once every parent node has reached mastery.

## 4. 🎰 Multi-Armed Bandits - choosing the next lesson

When several lessons fit equally well, use a bandit to balance **explore** (try a new item that might help) vs **exploit** (repeat an item known to work).

| Algorithm | Pro | Con |
|------------|----|----|
| **ε-greedy** | Very simple | Poorly directed exploration |
| **UCB1** | Good regret guarantees | Needs accurate counts |
| **Thompson Sampling** | Bayesian, works well in practice | Needs a prior |

Reward = Δ mastery after the lesson, or engagement (completion / no drop-off).

## 5. 🔁 The complete adaptive loop

\`\`\`
   ┌──────────────────────────────────────────────────────────┐
   │  PROFILE (θ per skill)                                   │
   └──────────────┬───────────────────────────────────────────┘
                  ▼
   ┌──────────────────────────────────────────────────────────┐
   │  POLICY: pick skill (mastery gap) → pick item (IRT)      │
   │          ─OR─ bandit pick from a short-list              │
   └──────────────┬───────────────────────────────────────────┘
                  ▼
              user answers
                  │
                  ▼
   ┌──────────────────────────────────────────────────────────┐
   │  UPDATE: θ ← bayes_update(θ, response)                   │
   │           mastery ← rolling_window_correct()             │
   │           log immutably for a later RL/feedback loop     │
   └──────────────────────────────────────────────────────────┘
\`\`\`

## 6. ⚠️ Pitfalls

- Picking too many items with \`b ≈ θ\` makes every item feel like a coin flip → frustrating. Sprinkle in periodic "easy wins."
- Mastery with no time decay → wrong assessment a month later. Combine with spaced repetition (previous lesson).
- A bandit without \`min_pulls\` means a new lesson never gets a fair shot and sleeps forever.

## ✨ 2026 upgrade - smarter adaptivity

- **2-Parameter IRT** (difficulty + discrimination) is still the backbone of CAT (Computerized Adaptive Testing). The Duolingo English Test and GMAT Focus both use it.
- **Multi-Armed Bandits** vs **A/B testing**: bandits win once you have ≥ 5 variants and want continuous optimization. EXP3 handles non-stationary settings (students change week to week).
- **Reinforcement Learning** (DeepTutor, AlphaTutor 2025): a policy picks the next lesson to maximize "Δmastery − α·time_spent". Harder to tune but outperforms IRT by about 12%.
- **Warning**: adapting too fast means students never get a "comfort zone" → drop-off. Always keep 20% of items "easy" to build momentum.
`,
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
          { question: "Vì sao Fisher information cực đại tại b ≈ θ?", options: ["Vì hàm đẹp", "Câu sát trình độ user mang nhiều thông tin nhất để tinh chỉnh θ", "Vì RNG", "Không thật"], answer: 1, explanation: "Đường cong dốc nhất tại b=θ → mỗi đúng/sai cập nhật θ mạnh nhất.", questionEn: "Why is Fisher information maximized at b ≈ θ?", optionsEn: ["Because the function looks nice", "An item matching the user's level carries the most information to refine θ", "Because of RNG", "It isn't true"], explanationEn: "The curve is steepest at b=θ → each right/wrong answer updates θ the most." },
          { question: "Mastery 0.85 trên N câu liên tiếp giúp?", options: ["Tránh mở khóa nhầm khi user gặp may", "Tăng tốc API", "Bảo mật", "Không có ý nghĩa"], answer: 0, explanation: "Cần bằng chứng đủ lớn, không chỉ 1 câu đúng do may.", questionEn: "What does a 0.85 mastery threshold over N consecutive items achieve?", optionsEn: ["Avoids unlocking wrongly when the user just got lucky", "Speeds up the API", "Security", "No real purpose"], explanationEn: "You need enough evidence, not just one lucky correct answer." },
          { question: "Bandit thiếu min_pulls dẫn đến?", options: ["Crash", "Bài mới không có cơ hội cạnh tranh fair → ngủ vĩnh viễn", "Tăng latency", "Không ảnh hưởng"], answer: 1, explanation: "Cold-start problem: cần explore tối thiểu trước khi tin exploit.", questionEn: "What happens if a bandit lacks min_pulls?", optionsEn: ["It crashes", "A new lesson never gets a fair chance to compete → sleeps forever", "Latency increases", "No effect"], explanationEn: "This is the cold-start problem: you need minimum exploration before trusting exploitation." },
          { question: "Thompson Sampling thuộc nhóm nào?", options: ["Greedy thuần", "Bayesian - sample từ posterior rồi chọn", "Heuristic", "Brute force"], answer: 1, explanation: "Sample θ từ posterior mỗi vòng → cân bằng explore/exploit tự nhiên.", questionEn: "What category does Thompson Sampling belong to?", optionsEn: ["Pure greedy", "Bayesian - sample from the posterior then choose", "Heuristic", "Brute force"], explanationEn: "It samples θ from the posterior each round → naturally balances explore/exploit." },
          { question: "Vì sao cần kết hợp adaptive + spaced repetition?", options: ["Để slogan đẹp", "Adaptive đo trình độ; spaced repetition giữ kiến thức khỏi phai", "Vì hardware", "Không cần"], answer: 1, explanation: "Mastery hôm nay ≠ mastery tháng sau - cần củng cố theo lịch.", questionEn: "Why combine adaptive testing with spaced repetition?", optionsEn: ["For a nicer slogan", "Adaptive measures ability; spaced repetition keeps knowledge from fading", "Because of hardware", "No need"], explanationEn: "Today's mastery isn't next month's mastery - it needs scheduled reinforcement." },
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
        theoryEn: `![AI tutor with RAG on curriculum and safety guardrails](/lesson-illustrations/edtech-ai-tutor-rag.jpg)

## 1. 🎯 Why "plain ChatGPT" isn't enough as a tutor

- It invents facts absent from your curriculum → contradicts the lessons.
- It replies at the wrong level (college-level explanations for a 5th grader).
- It doesn't know what lesson the student is on or what they've already mastered.

A real tutor = **LLM + retrieval over YOUR curriculum + student state + a safety layer**.

## 2. 🏗️ Reference architecture

\`\`\`
   ┌────────────────────────────────────────────────────────────┐
   │  STUDENT MESSAGE                                           │
   └──────────────┬─────────────────────────────────────────────┘
                  ▼
   ┌───────────────────────┐    ┌────────────────────────────┐
   │ Safety Pre-filter     │───▶│ block self-harm, NSFW,     │
   │ (regex + classifier)  │    │ personal data leaks        │
   └──────────┬────────────┘    └────────────────────────────┘
              ▼
   ┌────────────────────────────────────────────────────────────┐
   │ Context Builder                                            │
   │   • current_lesson, mastery, learner_age                   │
   │   • RAG: top-k chunks from the curriculum vector DB        │
   │   • last 5 exchanges (rolling memory)                      │
   └──────────────┬─────────────────────────────────────────────┘
                  ▼
   ┌────────────────────────────────────────────────────────────┐
   │ LLM with a structured prompt                                │
   │   [persona] a gentle teacher for age {age}                 │
   │   [grounding] use ONLY the context below; say so if it's   │
   │               missing                                       │
   │   [pedagogy] ask a guiding question before giving the      │
   │              answer; Socratic style                         │
   └──────────────┬─────────────────────────────────────────────┘
                  ▼
   ┌───────────────────────┐    ┌────────────────────────────┐
   │ Safety Post-filter    │───▶│ check citations, length,   │
   │                       │    │ age-appropriate language   │
   └──────────┬────────────┘    └────────────────────────────┘
              ▼
        Return to the student
\`\`\`

## 3. 🧰 Persona by age band

| Age | Tone | Sample opener |
|---------|------|-----------------|
| 6-10 | Playful, toy/animal examples | "Imagine your cat has 3 apples..." |
| 11-14 | Encourage self-discovery | "Before I solve it, try guessing..." |
| 15-18 | Academic + real-world application | "This idea is used in finance when..." |
| Adult | Concise, jargon allowed | "TL;DR: ..." |

## 4. 🧪 Socratic vs solution-first

Default to **Socratic**: ask a guiding question → the user works it out → the tutor confirms. Switch to solution-first when:

- The user has failed the same concept ≥ 2 times.
- The user explicitly asks to "just show me the solution."
- Time-on-task > 5 minutes with no progress.

## 5. 🛡️ EdTech-specific safety

- **PII redaction**: never store names/phone numbers/addresses in logs sent to the LLM.
- **Self-harm escalation**: detection → return a hotline number and flag teacher_contact_requests.
- **Academic integrity**: if a user pastes a currently-running exam question, politely refuse.
- **Bias audit**: run a 200-item eval set covering race/gender sensitivity every release.

## 6. 📏 Measurement - not just thumbs up/down

| Metric | How it's measured |
|--------|---------|
| **Groundedness** | % of replies with a valid citation from a retrieved chunk |
| **Pedagogy score** | LLM-judge rating Socratic vs spoon-feeding |
| **Age-appropriateness** | Flesch reading ease, tone classifier |
| **Resolution** | % of sessions ending with "I get it now" (self-report + post-quiz pass) |

## 7. ⚠️ Pitfalls

- Giving the LLM internet access breaks grounding and increases hallucination.
- Unbounded memory lets old context dominate replies and burns tokens. A rolling 5-10 turns is enough.
- Ignoring latency: a tutor that feels slower than 3s loses a child's attention. Stream tokens and use a small LLM for intent classification.

## ✨ 2026 upgrade - a safer tutor for children

- **3-layer guardrails**: (1) a hardened system prompt + spotlighting, (2) Llama-Guard / ShieldGemma on both input and output, (3) a **dedicated toxicity classifier** for Vietnamese (PhoBERT-toxic).
- **COPPA/GDPR-K**: data from children under 13 requires parental consent and deletion on request. Never let chat logs with PII leak into training data.
- **Socratic tutoring**: instead of giving the answer, ask 2-3 guiding questions. Evaluate with "% of turns where the LLM answers without revealing the key answer" - target ≥ 80%.
- **Fallback to a human**: detecting a "distress signal" (sadness, low self-esteem, violence) should pause the tutor and route to teacher_contact_requests. Already deployed in the Counseling Hub.
`,
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
          { question: "Vì sao tutor mặc định nên Socratic?", options: ["Đẹp", "Buộc học sinh chủ động tư duy → học sâu hơn cho-đáp-án-luôn", "Vì tốn ít token", "Bắt buộc bởi RLS"], answer: 1, explanation: "Hỏi ngược kích hoạt retrieval trong não user - bằng chứng giáo dục mạnh.", questionEn: "Why should a tutor default to being Socratic?", optionsEn: ["It looks nicer", "It forces the student to think actively → deeper learning than giving the answer right away", "It uses fewer tokens", "It's mandated by RLS"], explanationEn: "Asking a guiding question triggers active retrieval in the user's brain - strong pedagogical evidence." },
          { question: "Khi nào chuyển sang solution-first?", options: ["Sau câu hỏi đầu tiên", "Khi user sai nhiều lần cùng concept hoặc xin xem lời giải", "Không bao giờ", "Khi vui"], answer: 1, explanation: "Tránh tutor 'gây ức chế'. Quy tắc rõ ràng để biết khi nào dừng Socratic.", questionEn: "When should the tutor switch to solution-first?", optionsEn: ["After the first question", "When the user fails the same concept repeatedly or explicitly asks for the solution", "Never", "Whenever it feels like it"], explanationEn: "This avoids a tutor that frustrates the user, with a clear rule for when to stop being Socratic." },
          { question: "Groundedness đo gì?", options: ["Tốc độ", "% câu trả lời có trích xuất hợp lệ từ context retrieved", "Độ dài", "Cost"], answer: 1, explanation: "Đảm bảo LLM không bịa ngoài curriculum.", questionEn: "What does groundedness measure?", optionsEn: ["Speed", "% of replies with a valid citation from the retrieved context", "Length", "Cost"], explanationEn: "It ensures the LLM doesn't fabricate facts outside the curriculum." },
          { question: "Memory rolling 5–10 lượt thay vì vô hạn vì?", options: ["Cost & focus - log dài làm LLM lệch và tốn token", "Vì RLS", "Vì RAM", "Không có lý do"], answer: 0, explanation: "Memory dài tăng cost, giảm chất lượng do nhiễu lịch sử.", questionEn: "Why use a rolling 5-10 turn memory instead of unlimited?", optionsEn: ["Cost & focus - a long log biases the LLM and burns tokens", "Because of RLS", "Because of RAM", "No reason"], explanationEn: "Long memory raises cost and reduces quality due to historical noise." },
          { question: "Self-harm signal nên dẫn tới?", options: ["Tutor tự giải quyết", "Hiển thị hotline + escalate đến giáo viên / phụ huynh", "Bỏ qua", "Log thầm"], answer: 1, explanation: "Tutor không phải bác sĩ - phải escalate đúng kênh.", questionEn: "A self-harm signal should lead to?", optionsEn: ["The tutor resolves it itself", "Showing a hotline + escalating to a teacher / parent", "Ignoring it", "Silently logging it"], explanationEn: "A tutor isn't a doctor - it must escalate through the right channel." },
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
        theoryEn: `![AI auto-grading essay and speaking with rubric](/lesson-illustrations/edtech-auto-grading.jpg)

## 1. 🎯 Auto-grading isn't "let the LLM assign a score and call it done"

Real-world requirements:
- **Reliable**: same essay, same rubric → score varies by ±0.5 at most.
- **Explainable**: the student understands why they got 6.5 and how to fix it.
- **Fair**: doesn't penalize accent / regional spelling / an unusual (but valid) topic angle.
- **Auditable**: teachers can review quickly, and logs are enough to re-grade.

## 2. 📐 Rubric-first, not LLM-first

\`\`\`
   rubric.json
   {
     "task_response":  {weight: 0.25, scale: 0-9, anchors: {...}},
     "coherence":      {weight: 0.25, ...},
     "lexical":        {weight: 0.25, ...},
     "grammar":        {weight: 0.25, ...}
   }
\`\`\`

The LLM grades **each criterion separately** against concrete anchors (e.g. "9 = sharp argument, concrete examples; 5 = disjointed argument"). The total score = weighted sum + rounding to a half-band (IELTS style).

## 3. 🔁 A real-world IELTS Writing pipeline

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
   │  Aggregator: weighted → round to half-band → confidence   │
   └───────────────┬───────────────────────────────────────────┘
                   ▼
   ┌───────────────────────────────────────────────────────────┐
   │  Calibration layer: if confidence is low or near a        │
   │   boundary, route → human grader (sample 10-20%)          │
   └───────────────────────────────────────────────────────────┘
\`\`\`

## 4. 🎙️ Speaking - how is it different from essays?

| Issue | Handling |
|--------|------------|
| ASR mis-hears a word → unfair penalty | Use **word confidence**; only penalize when the student truly errs (against context) |
| Regional accent | Multi-accent ASR + don't grade pronunciation against a single "standard" accent |
| Fluency | WPM in the range [100, 180]; filler ratio ("um", "uh") |
| Pronunciation | Phoneme-level scoring (e.g. Azure Pronunciation Assessment) |
| Coherence | The LLM grades the transcript with a rubric similar to essays |

## 5. 🧪 Calibration - verifying reliability

| Step | Description |
|------|-------------|
| **Gold set** | 200 essays graded by 2 IELTS-certified teachers, take the median |
| **Agreement** | Quadratic Weighted Kappa (QWK) between AI and human; target ≥ 0.75 |
| **Drift watch** | Re-run the gold set on every model/prompt change; alert if QWK drops > 0.05 |
| **Human-in-the-loop** | Sample 10-20% of real essays for teacher review; update the rubric |

## 6. 🛡️ Anti-cheating and bias

- The **AI-generated detector** is a signal, not proof - don't auto-deduct points from it.
- An **off-topic detector** (cosine similarity between prompt and essay) blocks memorized essays.
- **Demographic blind**: never send names/nationality to the LLM.
- **Disparate impact audit**: compare average scores by class/nationality - investigate if the gap exceeds σ.

## 7. ⚠️ Pitfalls

- Grading with one prompt → one total score loses explainability. Always go per-criterion.
- LLMs drift "generous" over time → gold-set checks need to run periodically.
- Returning a score with no **actionable feedback** ("improve cohesive devices") is useless.

## ✨ 2026 upgrade - fair grading

- **Per-criterion rubrics** (task achievement, coherence, lexical, grammar) beat one overall score. Variance drops 3-4x, and parents accept it more readily.
- **Calibrate against humans**: take 200 hand-graded essays → compute Quadratic Weighted Kappa (QWK). Target QWK ≥ 0.7 before trusting it in production.
- **Bias audit**: split essays by gender/region → check the score gap. A 2025 IELTS auto-grader was sued over a 0.3-band gap between Asian and European ESL speakers.
- **Show your work**: return feedback that **cites specific sentences** ("Sentence 3 uses 'although' at the start of an independent clause"). Builds trust and creates teachable moments.
- **Speaking grading**: WER isn't enough - you also need fluency (WPM, filled pauses), pronunciation (GOP score), and content evaluated separately.
`,
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
          { question: "Vì sao phải chấm per-criterion thay vì 1 điểm tổng?", options: ["Tốn token hơn", "Để giải thích và sửa được - học sinh biết cần cải thiện gì", "Để giấu bug", "Không khác biệt"], answer: 1, explanation: "Điểm tổng không actionable; per-criterion + feedback mới giúp tiến bộ.", questionEn: "Why grade per-criterion instead of one overall score?", optionsEn: ["It uses more tokens", "To be explainable and fixable - students know what to improve", "To hide bugs", "No difference"], explanationEn: "An overall score isn't actionable; per-criterion + feedback drives improvement." },
          { question: "QWK đo gì?", options: ["Tốc độ chấm", "Agreement giữa 2 grader có ordinal scale, phạt mạnh lệch xa hơn lệch gần", "Cost", "RAM"], answer: 1, explanation: "QWK chuẩn vàng cho essay scoring (Hewlett ASAP).", questionEn: "What does QWK measure?", optionsEn: ["Grading speed", "Agreement between two graders on an ordinal scale, penalizing large gaps more than small ones", "Cost", "RAM"], explanationEn: "QWK is the gold standard for essay scoring (Hewlett ASAP)." },
          { question: "Vì sao không tự động trừ điểm khi 'AI-generated detector' báo dương?", options: ["Phát hiện AI hiện rất nhiễu - chỉ là tín hiệu, không phải bằng chứng", "Bằng chứng tuyệt đối", "Vì RLS", "Vì latency"], answer: 0, explanation: "Detector hiện vẫn FP cao - phạt tự động gây bất công.", questionEn: "Why not automatically deduct points when an 'AI-generated detector' flags positive?", optionsEn: ["Current AI detection is noisy - it's a signal, not proof", "It's absolute proof", "Because of RLS", "Because of latency"], explanationEn: "Detectors still have a high false-positive rate - auto-penalizing is unfair." },
          { question: "Speaking: vì sao dùng word confidence từ ASR?", options: ["Để tránh trừ điểm khi ASR sai từ chứ không phải user", "Tăng tốc", "Bảo mật", "Không cần"], answer: 0, explanation: "Phải tách lỗi ASR khỏi lỗi học sinh để công bằng.", questionEn: "Speaking: why use word confidence from ASR?", optionsEn: ["To avoid penalizing when ASR mis-hears a word rather than the student erring", "To speed things up", "Security", "No need"], explanationEn: "ASR errors must be separated from student errors for fairness." },
          { question: "Khi nào route bài cho giáo viên review?", options: ["Tất cả", "Khi confidence thấp hoặc điểm gần ngưỡng band quan trọng + 10–20% sample định kỳ", "Không bao giờ", "Mỗi 1000 bài"], answer: 1, explanation: "Human-in-loop có chọn lọc giữ chất lượng mà không quá tải giáo viên.", questionEn: "When should an essay be routed to a teacher for review?", optionsEn: ["All essays", "When confidence is low or the score is near an important band boundary + a periodic 10-20% sample", "Never", "Every 1000 essays"], explanationEn: "Selective human-in-the-loop maintains quality without overloading teachers." },
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
        theoryEn: `![Knowledge tracing: mastery curve and Bayesian network](/lesson-illustrations/edtech-knowledge-tracing.jpg)

## 1. 🎯 The problem: "answered correctly" ≠ "understood"

A student can guess correctly, copy an answer, or memorize without understanding. **Knowledge Tracing (KT)** is the problem of **estimating the probability a student has mastered a skill** from their answer history.

\`\`\`
   History:       Q1✓  Q2✗  Q3✓  Q4✓  Q5✗  Q6✓
   Skill:         past-tense   articles    past-tense  ...
   KT model →     P(mastery past-tense) = 0.82
                  P(mastery articles)   = 0.41
\`\`\`

## 2. 🧮 BKT (Bayesian Knowledge Tracing) - the classic, 1995

4 parameters per skill:

| Param | Meaning | Typical range |
|-------|---------|------------------|
| \`p_init\` | P(already knew it before this lesson) | 0.1 - 0.3 |
| \`p_learn\` | P(learns it after one attempt) | 0.05 - 0.2 |
| \`p_slip\` | P(knows it but answers WRONG) | 0.05 - 0.1 |
| \`p_guess\` | P(doesn't know it but answers RIGHT) | 0.1 - 0.25 |

Bayesian update after every item:

\`\`\`
   If CORRECT:  p_known' = p_known * (1 - p_slip) /
                            [ p_known * (1 - p_slip) + (1 - p_known) * p_guess ]
   If WRONG:    p_known' = p_known * p_slip /
                            [ p_known * p_slip + (1 - p_known) * (1 - p_guess) ]
   Then learn:  p_known  = p_known' + (1 - p_known') * p_learn
\`\`\`

## 3. 🧠 DKT (Deep Knowledge Tracing, 2015) - RNN/Transformer

BKT assumes skills are independent of each other → weak when skills are related (past simple ↔ past perfect). DKT uses an **RNN/Transformer** to learn skill embeddings automatically → captures these dependencies.

\`\`\`
        x_1 ─▶ ┌────┐
        x_2 ─▶ │RNN ├─▶ h_t ─▶ Dense ─▶ P(correct on the next item, per skill)
        x_3 ─▶ └────┘
        x_t = (skill_id, correct?)
\`\`\`

## 4. 🪜 Mastery threshold - when is a skill "mastered"?

| Threshold | Consequence |
|--------|--------|
| 0.70 | Fast progress, but a lot gets forgotten afterward |
| **0.85** | Good balance (ASSISTments, Khan, Duolingo) |
| 0.95 | Slow, time-consuming; suited to certification |

Combine with **Spaced Repetition**: once 0.85 is reached, add it to a long-term review schedule (mastered isn't "done forever").

## 5. 🔗 Skill Graph - the dependency map

\`\`\`
              [present simple]
                  │
                  ▼
              [past simple] ───▶ [past perfect]
                  │                  │
                  └────▶ [future] ◀──┘
\`\`\`

When a student is stuck on \`past perfect\`, the system automatically **suggests reviewing \`past simple\`** (the prerequisite) instead of forcing harder material.

## 6. ⚠️ Pitfalls

- **Cold start**: no data yet → use a sensible prior (e.g. default low mastery for HSK 1).
- **Dirty skill tagging**: one item tagged with 5 skills dilutes the KT signal. Keep each item to ≤ 2 primary skills.
- **Time decay**: ignoring forgetting over time → combining KT with spaced repetition (SRS) is mandatory.

## ✨ 2026 upgrade - measuring "truly known"

- **BKT vs DKT vs SAKT**: BKT is easy to understand, DKT is stronger but needs ≥10K students, and SAKT (transformer-based) is the current SOTA on ASSISTments 2024.
- **Hierarchical mastery**: one skill = several subskills (subtract → borrow → multi-digit). Only unlock a skill once 80% of its subskills reach ≥ 0.85 mastery.
- **Forgetting in KT**: mastery isn't monotonically increasing - it must decay over time. Models like DKT-Forget or KTM handle this.
- **Explainability**: parents/teachers need to know "why hasn't my child reached mastery yet." Visualize mastery as a radar chart per skill - already implemented in the Student Dashboard.
`,
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
          { question: "Vì sao 'trả lời đúng' không đồng nghĩa 'đã hiểu' trong KT?", options: ["Có thể đoán hoặc nhớ tạm", "Lỗi UI", "Sai đáp án gold", "Không có vấn đề"], answer: 0, explanation: "BKT mô hình hoá p_guess và p_slip vì lý do này.", questionEn: "Why doesn't 'answered correctly' mean 'understood' in KT?", optionsEn: ["The student may have guessed or memorized temporarily", "UI bug", "Wrong gold answer", "No issue at all"], explanationEn: "BKT models p_guess and p_slip precisely for this reason." },
          { question: "p_slip trong BKT nghĩa là?", options: ["P(không biết nhưng đúng)", "P(biết nhưng trả lời sai do bất cẩn)", "Tỉ lệ skip bài", "Cost"], answer: 1, explanation: "Slip = biết mà lỡ; Guess = không biết mà trúng.", questionEn: "What does p_slip mean in BKT?", optionsEn: ["P(doesn't know but answers correctly)", "P(knows but answers wrong due to a careless slip)", "The skip rate", "Cost"], explanationEn: "Slip = knows but slips up; Guess = doesn't know but gets lucky." },
          { question: "DKT khắc phục điểm yếu nào của BKT?", options: ["Quá nhanh", "Giả định kỹ năng độc lập - DKT bắt phụ thuộc qua RNN", "Quá rẻ", "Không có khác biệt"], answer: 1, explanation: "RNN/Transformer học embedding kỹ năng → bắt liên kết.", questionEn: "What BKT weakness does DKT fix?", optionsEn: ["Too fast", "The independent-skill assumption - DKT captures dependencies via an RNN", "Too cheap", "No difference"], explanationEn: "The RNN/Transformer learns skill embeddings → captures relationships between them." },
          { question: "Ngưỡng mastery 0.85 phổ biến vì?", options: ["Số đẹp", "Cân bằng tiến độ và retention; chuẩn ngành (Khan, Duolingo)", "Tốc độ", "Không lý do"], answer: 1, explanation: "0.70 quên nhanh; 0.95 quá chậm; 0.85 là sweet spot.", questionEn: "Why is a 0.85 mastery threshold common?", optionsEn: ["It's a nice round number", "It balances progress and retention; industry standard (Khan, Duolingo)", "Speed", "No reason"], explanationEn: "0.70 forgets too fast; 0.95 is too slow; 0.85 is the sweet spot." },
          { question: "Khi học sinh kẹt ở 'past perfect', hệ thống nên?", options: ["Cho bài khó hơn", "Ôn lại prerequisite 'past simple' trong skill graph", "Bỏ qua", "Hiển thị quảng cáo"], answer: 1, explanation: "Skill graph cho phép route về gốc khi học sinh chưa vững cơ sở.", questionEn: "When a student is stuck on 'past perfect', the system should?", optionsEn: ["Give harder items", "Review the prerequisite 'past simple' in the skill graph", "Ignore it", "Show an ad"], explanationEn: "The skill graph lets the system route back to fundamentals when a student isn't solid yet." },
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
        theoryEn: `![Onboarding funnel: signup -> first lesson -> aha moment -> habit loop](/lesson-illustrations/edtech-onboarding-funnel.jpg)

## 1. 🎯 The "aha moment" - the moment that decides retention

In EdTech, the **aha moment** is not when a user signs up, but when they **first feel real progress** (finishing the first lesson + seeing the mastery bar jump).

\`\`\`
   signup -> first lesson -> first quiz pass -> first streak day 2
     100%      72%             48%                 31%   <- AHA cluster
                                                   |
                                                   v
                                     user is 30x more likely to retain
\`\`\`

Onboarding's goal: **push as many users through the aha cluster as fast as possible**.

## 2. 🚪 Friction audit - counting clicks to value

| Step | Clicks | Time | Drop |
|------|-------|-----------|------|
| Landing -> Signup | 1 | 5s | 35% |
| Signup -> Email verify | 1 + email | 2 min | 22% |
| Verify -> First lesson | 3 | 90s | 18% |
| First lesson -> Quiz pass | quiz | 4 min | 28% |

Rule of thumb: **every 1 extra click = ~10% drop**. Email verification is a silent killer - consider a magic link or OAuth instead.

## 3. 🧪 Empty state ≠ blank page

An empty state is a **teaching opportunity**, not a UI bug. A good pattern:

\`\`\`
   +------------------------------------------------+
   |  👋 Hi there! Try your first lesson:            |
   |                                                  |
   |  [ ▶ Start with "Hello, World!" - 3 minutes ]   |
   |                                                  |
   |  💡 After this lesson you'll earn the "First    |
   |     Step" badge and unlock the Coding Lab.      |
   +------------------------------------------------+
\`\`\`

Required elements: **a single CTA**, **expected time**, **a concrete reward**.

## 4. 📣 Behavioral triggers - push the right person at the right time

| Trigger | When it fires | Channel | Goal |
|---------|--------------|---------|------|
| Welcome | T+0 | In-app + email | Set expectations + CTA for lesson 1 |
| Lesson nudge | T+24h, hasn't studied | Push | 5-minute lesson |
| Streak save | Streak at risk, 22:00 | Push | Protect the streak |
| Win-back | 7d inactive | Email | Personalized "new" lesson |
| Re-engagement | 30d inactive | Email | Showcase progress + gentle nudge |

**Rule**: at most **1 push/day**, never before 8 AM or after 9 PM local time. Every notification must have a **deep link straight to the action** (not just to home).

## 5. 🧭 Personalized onboarding via skill assessment

Instead of 5 intro screens, ask 3 golden questions:

1. **Goal** (study abroad / job / hobby) -> roadmap.
2. **Current level** (a 3-question quiz) -> adaptive start at the right level.
3. **Time per day** (5/15/30 minutes) -> size of the first lesson.

Output: the student sees a first lesson that is **at the right level, matching their goal, and the right length** -> aha in under 10 minutes.

## 6. ⚠️ Common traps

- **A 12-screen "show-and-tell" onboarding** - users bounce immediately. Rule: teach by **doing**, not by **telling**.
- **Streak shaming in the first week** - it drives out weak users before they get a chance to bond with the product.
- **Not measuring cohorts by onboarding version** - you never know which change helped or hurt.

## ✨ 2026 upgrade - activation in practice

- **Quantify the aha moment**: use cohort analysis to find the action that D7-retained users take in their first 24h. Duolingo: "complete 2 lessons + turn on notifications" -> retention x3.
- **Empty-state design**: the very first state must have a clear CTA and a sample example. Don't let a student see an empty list -> 60% will bounce immediately.
- **Behavioral activation loops**: trigger (push) -> action (lesson) -> variable reward (XP, badge, streak) -> investment (saved progress). This applies Nir Eyal's Hook Model.
- **Notification cap**: ≤1 push/day for new students, ≤3 for power users. Exceeding the cap makes opt-out rates rise non-linearly.
- **Cohort + funnel** are 2 mandatory dashboards. Every new feature must report the "D1/D7/D30 delta" after a 2-week A/B test.

`,
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
          { question: "Aha moment trong EdTech là?", options: ["Lúc đăng ký", "Lần đầu cảm nhận tiến bộ rõ rệt (vd quiz pass + mastery nhảy)", "Khi mở app", "Khi xoá tài khoản"], answer: 1, explanation: "User vượt qua aha cluster có khả năng retain cao hơn nhiều lần.",
            questionEn: "What is the aha moment in EdTech?", optionsEn: ["Signing up", "The first time they feel clear progress (e.g. a quiz pass + mastery jump)", "Opening the app", "Deleting the account"], explanationEn: "Users who pass through the aha cluster are far more likely to retain." },
          { question: "Vì sao verify-by-email hại onboarding?", options: ["Bảo mật yếu", "Tạo break ~2 phút và 22% drop - phá đà tiến tới aha", "Tốn DB", "Không hại"], answer: 1, explanation: "Magic-link / OAuth giảm drop đáng kể.",
            questionEn: "Why does email verification hurt onboarding?", optionsEn: ["Weak security", "It creates a ~2-minute break and a 22% drop - killing momentum toward the aha moment", "Wastes DB space", "It doesn't hurt"], explanationEn: "Magic links / OAuth significantly reduce this drop." },
          { question: "Empty state nên có gì?", options: ["Logo to", "Một CTA duy nhất + thời gian dự kiến + phần thưởng cụ thể", "3 banner ads", "Không quan trọng"], answer: 1, explanation: "Empty state là cơ hội dạy bằng hành động, không phải lỗi UI.",
            questionEn: "What should an empty state contain?", optionsEn: ["A big logo", "A single CTA + expected time + a concrete reward", "3 banner ads", "It doesn't matter"], explanationEn: "An empty state is a chance to teach by action, not a UI flaw." },
          { question: "Quy tắc tần suất push hợp lý?", options: ["Càng nhiều càng tốt", "≤1/ngày, tránh 21:00–08:00 địa phương", "Mỗi giờ", "Không có quy tắc"], answer: 1, explanation: "Vượt cap → unsubscribe và đánh giá thấp app store.",
            questionEn: "What's a sensible push frequency rule?", optionsEn: ["As many as possible", "≤1/day, avoid 9 PM-8 AM local time", "Every hour", "No rule needed"], explanationEn: "Exceeding the cap drives up unsubscribes and low app-store ratings." },
          { question: "Onboarding 12 màn show-and-tell vấn đề gì?", options: ["Quá đắt", "Dạy bằng kể thay vì làm - user bỏ trước khi chạm aha", "Quá nhanh", "Không vấn đề"], answer: 1, explanation: "Onboarding tốt dạy bằng hành động + phản hồi tức thì.",
            questionEn: "What's wrong with a 12-screen show-and-tell onboarding?", optionsEn: ["Too expensive", "It teaches by telling instead of doing - users leave before reaching the aha moment", "Too fast", "Nothing wrong"], explanationEn: "Good onboarding teaches through action + instant feedback." },
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
        theoryEn: `## 1. 🧭 How this differs from commercial recommenders

Netflix recommends movies you'll **like** -> maximizing clicks. EdTech recommends lessons you **should study** -> maximizing **mastery growth** and **sustained motivation**. Recommending a lesson that's too easy = boring; too hard = users quit; just right = "flow".

## 2. 🎯 The Zone of Proximal Development framework (Vygotsky)

\`\`\`
   hard | ################ frustration zone (quits)
        | ################
        | ################  <- ZPD (sweet spot)
        | ################
   easy | ################ boredom zone (bored)
        +------------------
              learner ability
\`\`\`

Goal: pick a lesson with a **pass probability of about 0.6-0.8** based on current mastery.

## 3. 🧮 Three algorithm families

| Approach | Mechanism | Strength / Weakness |
|------|--------|-----------|
| **Content-based** | Lessons similar in skill tags | Good cold-start / narrow |
| **Collaborative filtering** | "Students like you studied X next" | Broad discovery / needs data |
| **Knowledge-graph + mastery** | Prerequisite DAG + mastery score | Pedagogically sound / hard to build |

Production: **hybridize all three** - the knowledge graph ensures validity, collaborative filtering adds diversity, content-based handles cold-start.

## 4. 🪜 Recommendation pipeline

\`\`\`
   +------------------------------------------------+
   | 1. Candidate generation (200 valid lessons)     |
   |    - filter by satisfied prerequisites          |
   |    - filter by user's level                     |
   +------------------------------------------------+
   | 2. Scoring (ranking)                            |
   |    score = 0.5*mastery_gap                      |
   |          + 0.2*novelty                          |
   |          + 0.2*similar_users                    |
   |          - 0.1*recent_seen                      |
   +------------------------------------------------+
   | 3. Diversity re-rank (MMR)                      |
   |    avoid 5 lessons on the same topic in a row   |
   +------------------------------------------------+
   | 4. Constraints                                  |
   |    daily cap, don't recommend lessons passed    |
   |    less than 7 days ago                         |
   +------------------------------------------------+
\`\`\`

## 5. ❄️ Cold-start (new user)

- Ask 3-5 survey questions (goal, self-assessed level).
- Run an **adaptive placement quiz** of 8-12 questions (IRT) to estimate theta.
- Map theta -> an entry node in the knowledge graph.

## 6. ⚠️ Traps

- **Pedagogical filter bubble**: only recommending topics the learner is strong in -> they never develop weak skills. You must **interleave** about 20% "weak skill" lessons.
- **Popularity bias**: hot lessons always get recommended -> good but new lessons die quietly. Inject randomness with epsilon = 0.05.
- **Reward hacking**: optimizing CTR -> recommends super easy lessons. Optimize **mastery growth per week**, not clicks.
`,
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
          { question: "Mục tiêu recommender EdTech khác Netflix ở chỗ?", options: ["Không khác", "Tối đa mastery growth + động lực, không phải click/watch time", "Đa dạng hơn", "Rẻ hơn"], answer: 1, explanation: "Mục tiêu giáo dục ≠ thương mại - tối ưu CTR sẽ gợi bài siêu dễ.",
            questionEn: "How does an EdTech recommender's goal differ from Netflix's?", optionsEn: ["No difference", "It maximizes mastery growth + motivation, not clicks/watch time", "It's more diverse", "It's cheaper"], explanationEn: "Educational goals differ from commercial ones - optimizing for CTR ends up recommending overly easy lessons." },
          { question: "ZPD nói rằng bài nên có pass_prob ≈?", options: ["0.1", "0.6–0.8", "0.95", "0.5 chính xác"], answer: 1, explanation: "Vừa sức = sweet spot 60–80%.",
            questionEn: "The ZPD framework suggests a lesson should have pass_prob approximately?", optionsEn: ["0.1", "0.6-0.8", "0.95", "Exactly 0.5"], explanationEn: "The 'just right' sweet spot is 60-80%." },
          { question: "Filter bubble sư phạm là?", options: ["Bug UI", "Chỉ gợi điểm mạnh → user không phát triển kỹ năng yếu", "Bài giảng quá dài", "Caching"], answer: 1, explanation: "Cần inject ~20% bài kỹ năng yếu.",
            questionEn: "What is a pedagogical filter bubble?", optionsEn: ["A UI bug", "Only recommending strengths -> the user never develops weak skills", "Lessons that are too long", "A caching issue"], explanationEn: "You need to inject about 20% weak-skill lessons." },
          { question: "Cold-start tốt cho EdTech là?", options: ["Đoán random", "Survey + adaptive placement quiz IRT để ước lượng θ", "Đợi 1 tháng", "Hỏi giáo viên"], answer: 1, explanation: "Vài câu IRT tốt hơn nhiều survey thuần.",
            questionEn: "What is a good cold-start approach for EdTech?", optionsEn: ["Guess randomly", "A survey + an adaptive IRT placement quiz to estimate theta", "Wait a month", "Ask the teacher"], explanationEn: "A few IRT questions outperform a purely survey-based approach." },
          { question: "Popularity bias khắc phục bằng?", options: ["Không gợi bài hot", "ε-greedy / random 5% để bài mới có cơ hội", "Tăng giá bài hot", "Không có cách"], answer: 1, explanation: "Khám phá ngẫu nhiên giúp tránh winner-takes-all.",
            questionEn: "How do you fix popularity bias?", optionsEn: ["Never recommend hot lessons", "Epsilon-greedy / 5% randomness so new lessons get a chance", "Raise the price of hot lessons", "There's no fix"], explanationEn: "Random exploration helps avoid a winner-takes-all outcome." },
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
        theoryEn: `## 1. ⚖️ Why is EdTech scrutinized so closely?

EdTech learners can be **children under 13** (US) or **under 16** (EU). Data protection laws for children's data are **many times stricter** than laws for adults - violations mean multi-million-dollar fines and app store removal.

## 2. 🗺️ Map of the laws

| Law | Scope | Age | Core requirement |
|------|---------|------|--------------|
| **COPPA** (US) | US services collecting children's PII | <13 | Verifiable Parental Consent (VPC) before collection |
| **GDPR-K** (EU) | Any processing of EU citizens' PII | <16 (each country may lower to 13) | Lawful basis + parental consent |
| **FERPA** (US) | School education records | any age | School is in control, vendor is a 'school official' |
| **PIPL** (China) | Chinese citizens | <14 | Separate consent for minors |
| **PDP Law 2025** (Vietnam) | Vietnamese citizens | <15 needs parent | Similar to GDPR, with education exceptions |

## 3. 🚦 The Data Minimization principle

\`\`\`
   +------------------------------------------------+
   |  COLLECT AS LITTLE AS POSSIBLE                  |
   |  ------------------------------------------------ |
   |  ❌ Full name + address + birthdate + gender    |
   |  ✅ Nickname + age-bucket (8-10, 11-13)          |
   |                                                  |
   |  ❌ User-uploaded face photos                    |
   |  ✅ Chibi avatar picked from a library           |
   +------------------------------------------------+
\`\`\`

## 4. 🔐 Correct patterns for children's EdTech

| Pattern | Description |
|---------|-------|
| **Parent gate** | A multiplication problem to unlock Settings (blocks kids from changing consent themselves) |
| **Parent email verification** | Magic link to the parent's email before collecting PII |
| **No third-party tracking** | ABSOLUTELY no Facebook Pixel or personalized-ad GA on children's pages |
| **No DMs between users** | Or if present, must be moderated + premade messages only |
| **Right to be forgotten** | Delete-account button -> real-time cascading delete, not just "hiding" |
| **Audit log** | Staff access to PII must be logged |

## 5. 🧹 Data lifecycle

\`\`\`
   collect -> encrypt at rest -> retention timer -> purge
                                       ^                |
                                       +- user/parent deletes -+
\`\`\`

Sample retention rule: activity logs 90 days, learning results 2 years, audio recordings 7 days, and **no** raw PII in the analytics warehouse (only pseudonymous IDs).

## 6. ⚠️ Common traps

- "We don't share it with anyone" - but your ad/analytics SDKs share it for you. **Audit every SDK**.
- Storing IP + user-agent forever -> that's still indirect PII.
- "Anonymous" data with 3 attributes (zip + age + gender) can re-identify 87% of people.
- Letting teachers export the full class's data to their own machine -> loss of control, and you're still liable.
`,
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
          { question: "COPPA bảo vệ trẻ em dưới?", options: ["10", "13", "16", "18"], answer: 1, explanation: "<13 ở Mỹ, cần Verifiable Parental Consent.",
            questionEn: "COPPA protects children under what age?", optionsEn: ["10", "13", "16", "18"], explanationEn: "Under 13 in the US, requiring Verifiable Parental Consent." },
          { question: "GDPR-K có thể hạ tuổi consent xuống tối thiểu?", options: ["10", "13 (mỗi nước EU tự chọn 13–16)", "16 mọi nơi", "18"], answer: 1, explanation: "Mặc định 16, mỗi quốc gia có thể hạ xuống tối thiểu 13.",
            questionEn: "GDPR-K allows the consent age to be lowered to a minimum of?", optionsEn: ["10", "13 (each EU country chooses between 13-16)", "16 everywhere", "18"], explanationEn: "The default is 16, but each country may lower it to a minimum of 13." },
          { question: "Bẫy 'anonymous' tệ nhất là?", options: ["UI xấu", "Quasi-identifiers (zip+age+gender) re-identify ~87% người", "Tốn DB", "Không có"], answer: 1, explanation: "Latanya Sweeney 2000 và các nghiên cứu sau đều xác nhận.",
            questionEn: "What's the worst 'anonymous' data trap?", optionsEn: ["Ugly UI", "Quasi-identifiers (zip+age+gender) can re-identify ~87% of people", "It wastes DB space", "There is none"], explanationEn: "Latanya Sweeney's 2000 study and later research both confirm this." },
          { question: "Parent gate (phép tính nhân) dùng để?", options: ["Vui", "Chặn trẻ em tự đổi consent / mua hàng", "Test toán", "Bảo mật server"], answer: 1, explanation: "Một cổng kiểm tra người lớn nhanh, không có PII.",
            questionEn: "What is a parent gate (multiplication problem) used for?", optionsEn: ["Fun", "Blocking kids from changing consent / making purchases themselves", "Testing math skills", "Server security"], explanationEn: "It's a quick adult-check gate that collects no PII." },
          { question: "Khi user xoá tài khoản, EdTech nên?", options: ["Soft delete vĩnh viễn", "Cascade xoá thật trong khung thời gian luật quy định + audit log", "Giữ để báo cáo", "Bán cho bên thứ 3"], answer: 1, explanation: "Right to be forgotten là bắt buộc; soft-delete vô thời hạn = vi phạm.",
            questionEn: "When a user deletes their account, EdTech should?", optionsEn: ["Soft-delete forever", "Do a real cascading delete within the legally required timeframe + log it", "Keep it for reporting", "Sell it to a third party"], explanationEn: "Right to be forgotten is mandatory; indefinite soft-delete is a violation." },
        ],
      },
    ],
  },
];


