import type { ExtendedProgrammingModule } from "./types";

/**
 * EdTech Expansion - advanced production lessons that complement edtechLessons.ts.
 * Heavy use of ASCII diagrams, comparison tables, and analogies to act as
 * "illustrations" inside the markdown theory renderer.
 */
export const edtechExpansionModules: ExtendedProgrammingModule[] = [
  {
    id: "edtech-production",
    title: "EdTech Production & Growth (2026)",
    titleEn: "EdTech Production & Growth (2026)",
    icon: "📈",
    color: "from-emerald-500 to-teal-600",
    description:
      "Đo lường học tập, giữ chân học sinh, A/B test sư phạm và kiến trúc nền tảng EdTech tỉ lệ lớn.",
    descriptionEn:
      "Measure learning, retain students, run pedagogical A/B tests, and architect EdTech platforms at scale.",
    course: "edtech",
    lessons: [
      {
        id: "edtech-7",
        title: "Learning Analytics - đo điều thực sự quan trọng",
        titleEn: "Learning Analytics - Measure What Actually Matters",
        level: 3,
        difficulty: "intermediate",
        theory: `## 1. 🎯 Vanity vs. Actionable metric

| Loại | Ví dụ | Vấn đề |
|------|-------|--------|
| **Vanity** | Tổng lượt đăng ký, số phút online | Cảm thấy đẹp nhưng không đổi quyết định |
| **Actionable** | DAU/MAU, mastery growth, time-to-mastery | Hành động được: cải thiện bài, nhắc nhở, đổi UX |

## 2. 📊 4 chỉ số xương sống của EdTech

\`\`\`
    ┌──────────────────────────────────────────────────────┐
    │  LEARNING FUNNEL                                     │
    │  ─────────────────────────────────────────────────── │
    │  Sign-up ─▶ Activated ─▶ Habit ─▶ Mastery ─▶ Outcome │
    │  100%      60%         30%      18%        12%       │
    │            ▲           ▲        ▲          ▲         │
    │     onboarding      D7 streak  mastery   exam pass   │
    │       quality                  ≥ 0.8     / cert      │
    └──────────────────────────────────────────────────────┘
\`\`\`

| Metric | Công thức | Healthy benchmark |
|--------|-----------|-------------------|
| **Activation** | % học ≥ 3 bài trong 24h đầu | > 40% |
| **D7 retention** | % quay lại sau 7 ngày | > 25% |
| **Mastery growth** | Δ mastery / tuần / kỹ năng | > +0.05 |
| **Time-to-mastery** | Giờ học để đạt mastery 0.85 | càng thấp càng tốt |

## 3. 🧪 Cohort analysis (phân tích theo lớp tuần)

\`\`\`
              D0   D1   D3   D7   D14  D30
   cohort W1  100  62   41   28   18   12
   cohort W2  100  65   45   31   22   15   ← onboarding mới tốt hơn
   cohort W3  100  60   38   24   14   09   ← regression! điều tra ngay
\`\`\`

Cohort phơi bày **xu hướng theo phiên bản app** mà tổng số không thấy được.

## 4. 🔄 Event schema tối thiểu

\`\`\`json
{
  "ts": "2026-05-29T08:30:11Z",
  "user_id": "u_123",
  "event": "lesson_completed",
  "lesson_id": "hsk-1-12",
  "score": 0.92,
  "time_ms": 184000,
  "device": "mobile",
  "ab_variant": "v2"
}
\`\`\`

Quy tắc: **mỗi event 1 dòng, immutable**, kèm \`ab_variant\` để slice mọi metric theo experiment.

## 5. ⚠️ Bẫy

- Đếm "lượt mở app" → khuyến khích thông báo spam.
- Không loại bot/dev → metric phồng giả.
- Chỉ nhìn trung bình → bỏ qua đuôi (10% học sinh khó nhất là nhóm cần giúp nhất).
`,
        theoryEn: `## 1. Vanity vs Actionable Metrics

**Vanity metrics** look great in screenshots (total signups, minutes online, "AI calls served") but never tell you whether to **change anything**. **Actionable metrics** drive decisions because they map to real learning outcomes.

| Vanity | Actionable |
|--------|-----------|
| Total registrations | Activation rate (≥3 lessons in first 24h) |
| Minutes online | Mastery growth per active day |
| App opens | D7 / D30 retention |
| "AI calls served" | Helpfulness (👍 / total) |

## 2. The EdTech Funnel

\`\`\`
   sign-up ──▶ activated ──▶ habit ──▶ mastery ──▶ outcome
   100%        ~30%          ~12%       ~6%         ~3%
\`\`\`

- **Activation** - did the learner experience the *aha* moment? (≥3 completed lessons in 24h is a strong proxy.)
- **Habit** - at least one session in 4 of 7 days.
- **Mastery** - % of target skills above threshold (e.g. 0.8 BKT mastery).
- **Outcome** - externally validated (IELTS band, HSK level, job placed).

## 3. Cohort Analysis

Group users by **signup week** and track each cohort over time. Cohorts let you spot regressions tied to specific releases that *averages hide*:

\`\`\`
              W+0   W+1   W+2   W+4
Apr cohort    100%  45%   32%   24%
May cohort    100%  52%   38%   28%   ← onboarding update shipped
Jun cohort    100%  38%   25%   18%   ← regression after refactor
\`\`\`

## 4. Event Logging Discipline

- **One row per event**, immutable, append-only.
- Always bake in \`ab_variant\` so every metric can be sliced by experiment.
- Bot/dev traffic filtered before aggregation - otherwise metrics inflate.
- Look at the **distribution tails** (p10 / p50 / p90), not just the mean - the bottom decile of learners is who you need to help most.

## 5. Common Traps

- Counting "app opens" rewards spammy push notifications.
- Reporting only averages hides struggling learners.
- Mutable events break A/B replay and audit forever.
- Vanity dashboards win meetings but lose product direction.`,
        code: `from collections import defaultdict
from datetime import datetime, timedelta

events = [
    {"user": "u1", "ts": "2026-05-22", "event": "signup"},
    {"user": "u1", "ts": "2026-05-22", "event": "lesson_done", "score": 0.9},
    {"user": "u1", "ts": "2026-05-29", "event": "lesson_done", "score": 0.95},
    {"user": "u2", "ts": "2026-05-22", "event": "signup"},
    # u2 không quay lại
]

def parse(d): return datetime.fromisoformat(d)

def d7_retention(events):
    signed = {e["user"]: parse(e["ts"]) for e in events if e["event"] == "signup"}
    returned = set()
    for e in events:
        if e["event"] == "signup": continue
        gap = parse(e["ts"]) - signed.get(e["user"], parse(e["ts"]))
        if timedelta(days=7) <= gap <= timedelta(days=8):
            returned.add(e["user"])
    return len(returned) / max(1, len(signed))

print(f"D7 retention = {d7_retention(events):.0%}")`,
        codeLanguage: "python",
        exercise:
          "Viết hàm activation_rate(events) → % user có ≥ 3 event lesson_done trong 24h đầu sau signup.",
        exerciseEn:
          "Write activation_rate(events) → % of users with ≥3 lesson_done events in the first 24h after signup.",
        quiz: [
          { question: "Vì sao 'tổng phút online' là vanity metric?", options: ["Khó tính", "Không đổi quyết định gì cụ thể; có thể tăng nhờ spam noti", "Quá chính xác", "Riêng tư"], answer: 1, explanation: "Vanity metric đẹp nhưng không hướng dẫn hành động." },
          { question: "Cohort analysis giúp phát hiện?", options: ["Bug front-end", "Regression theo từng tuần ra mắt, ẩn trong số trung bình", "Tốc độ API", "Số DB index"], answer: 1, explanation: "Cohort tách user theo tuần đăng ký để so phiên bản app." },
          { question: "Vì sao event nên immutable?", options: ["Để dễ sửa", "Để audit, replay, A/B chính xác về sau", "Tiết kiệm dung lượng", "Không cần thiết"], answer: 1, explanation: "Sửa event = mất sự thật lịch sử → mọi metric sai." },
          { question: "Healthy D7 retention với EdTech tốt là?", options: [">5%", ">25%", ">75%", ">95%"], answer: 1, explanation: ">25% D7 là benchmark mạnh cho EdTech tự học." },
          { question: "Bẫy 'chỉ nhìn trung bình' nghĩa là?", options: ["Bỏ qua đuôi phân phối - người yếu nhất cần giúp nhất", "Median tốt hơn mean", "Không có ý nghĩa", "Chỉ nên dùng mode"], answer: 0, explanation: "Trung bình che giấu nhóm cần hỗ trợ; nên xem phân vị 10/50/90." },
        ],
      },
      {
        id: "edtech-8",
        title: "Gamification & Engagement Loops",
        titleEn: "Gamification & Engagement Loops",
        level: 3,
        difficulty: "intermediate",
        theory: `## 1. 🎮 Vì sao gamification?

Học là việc khó & kéo dài → não cần **phần thưởng ngắn hạn** để chịu đựng quá trình dài hạn. Nhưng gamification **sai cách** biến học sinh thành nô lệ XP, **đúng cách** biến họ thành người tự chủ.

## 2. 🔁 Engagement Loop kinh điển

\`\`\`
        ┌──────────────────────────────────────┐
        │                                      │
        ▼                                      │
  TRIGGER  ─▶  ACTION  ─▶  VARIABLE REWARD ─▶  INVESTMENT
  (noti,       (làm bài)   (XP, badge,         (streak,
   streak)                  bất ngờ)            collection,
                                                hồ sơ)
\`\`\`

(Nir Eyal - "Hooked"). Khoá quan trọng: **variable reward** (đôi khi 10 XP, đôi khi 50 XP + huy hiệu) > reward cố định.

## 3. 🪜 4 trụ cột nên dùng

| Trụ cột | Cơ chế | HaiEduTech ví dụ |
|---------|--------|------------------|
| **Progression** | XP, level, mastery bar | Climber, Skier chibi |
| **Social** | Leaderboard tuần, lớp | Mastered Words board |
| **Identity** | Avatar, badge, tiêu đề | Scholar, Linguistics Architect |
| **Surprise** | Drop ngẫu nhiên, mini-game | Flying stars, confetti |

## 4. ⚠️ Mặt tối - Dark Patterns cần TRÁNH

- **Streak shaming** ("Bạn vừa mất 47 ngày streak!") → lo âu.
- **Pay-to-skip-learning** → giết mục đích giáo dục.
- **Endless leaderboard** → 95% học sinh luôn thấy mình thất bại.

Nguyên tắc HaiEduTech: gamification **phục vụ học**, không thay thế học.

## 5. 📐 Công thức cân bằng phần thưởng

\`\`\`
   reward = base_xp * difficulty_factor * streak_bonus * (1 + surprise())
   surprise() = random.choice([0, 0, 0, 0.5, 1.0])   # 20% có drop bất ngờ
\`\`\`

Mẹo: **giảm dần XP** khi học sinh lặp đúng bài quá dễ → tránh "XP farming".
`,
        theoryEn: `## 1. Why Gamification Matters

Learning is slow and effortful, so the brain needs **short-term rewards** to endure the long journey to mastery. Done **wrong**, gamification turns students into XP slaves. Done **right**, it builds intrinsic motivation by rewarding the right behaviors.

## 2. The Hook Loop (Nir Eyal)

\`\`\`
   ┌──────────────────────────────────────┐
   │                                      │
   ▼                                      │
 TRIGGER ──▶ ACTION ──▶ VARIABLE REWARD ──▶ INVESTMENT
 (push,      (do a     (XP, badge,         (streak,
  streak)     lesson)   surprise drop)      collection)
\`\`\`

**Variable reward beats fixed reward** - the "slot machine" effect: sometimes 10 XP, sometimes 50 XP + a rare badge. Dopamine spikes more on uncertainty than on predictability.

## 3. The Four Pillars

| Pillar | Mechanic | HaiEduTech example |
|--------|----------|--------------------|
| **Progression** | XP, levels, mastery bar | Climber & Skier chibis |
| **Social** | Weekly leaderboard, class ranks | Mastered Words board |
| **Identity** | Avatar, badge, titles | "Scholar", "Linguistics Architect" |
| **Surprise** | Random drops, mini-games | Flying stars, confetti |

## 4. Dark Patterns to Avoid

- **Streak shaming** ("You lost a 47-day streak!") → anxiety, especially for kids.
- **Pay-to-skip-learning** → kills the educational purpose.
- **Endless global leaderboard** → 95% of learners always feel like losers - use weekly + class-scoped leaderboards instead.
- **Lootbox-style purchases for minors** → ethically and legally risky.

## 5. Balanced Reward Formula

\`\`\`
reward = base_xp * difficulty * streak_bonus * (1 + surprise())
surprise() = random.choice([0, 0, 0, 0.5, 1.0])   # 20% drop
\`\`\`

**Decay XP for repeated easy tasks** so users can't farm trivial reps - XP must stay tied to real learning. Cap streak bonuses (e.g. +60%) so long streaks don't dwarf today's progress.`,
        code: `import random

def xp(base: int, difficulty: float, streak_days: int, attempts: int) -> int:
    streak_bonus = 1 + min(streak_days, 30) * 0.02      # tối đa +60%
    repeat_decay = max(0.2, 1.0 - 0.1 * (attempts - 1)) # bài lặp giảm dần
    surprise = random.choice([0, 0, 0, 0.5, 1.0])       # 20% có drop
    return round(base * difficulty * streak_bonus * repeat_decay * (1 + surprise))

for day, atts in [(1,1), (7,1), (30,1), (30,5)]:
    print(f"day={day:>2} attempts={atts} → xp={xp(10, 1.2, day, atts)}")`,
        codeLanguage: "python",
        exercise:
          "Thêm hàm tier(xp_total) trả về 'Bronze' (<500) / 'Silver' (<2000) / 'Gold' (<5000) / 'Platinum'.",
        exerciseEn:
          "Add tier(xp_total) returning 'Bronze' (<500) / 'Silver' (<2000) / 'Gold' (<5000) / 'Platinum'.",
        quiz: [
          { question: "Variable reward mạnh hơn fixed reward vì?", options: ["Rẻ hơn", "Kích hoạt hệ dopamine mạnh hơn nhờ yếu tố bất ngờ", "Dễ code", "Đẹp UI"], answer: 1, explanation: "Slot-machine effect: bất ngờ giữ chân tốt hơn đều đặn." },
          { question: "Dark pattern nào sau đây cần TRÁNH trong EdTech?", options: ["Streak shaming", "Mastery bar", "Avatar chibi", "Leaderboard tuần ngắn"], answer: 0, explanation: "Streak shaming gây lo âu, đặc biệt với học sinh nhỏ." },
          { question: "Investment trong Hook loop nghĩa là?", options: ["Đầu tư tiền", "User để lại thứ có giá trị (streak, collection) khiến quay lại dễ hơn", "Quảng cáo", "Nâng cấp server"], answer: 1, explanation: "Investment làm tăng switching cost theo cách lành mạnh (sở hữu)." },
          { question: "Vì sao nên decay XP cho bài lặp dễ?", options: ["Phạt user", "Tránh XP farming, giữ XP gắn với học thật", "Tiết kiệm DB", "Không có lý do"], answer: 1, explanation: "Không decay → user farm bài dễ thay vì học bài khó." },
          { question: "Trụ cột 'Identity' trong gamification gồm?", options: ["Avatar, badge, danh hiệu", "API key", "Hệ DB", "Caching"], answer: 0, explanation: "Cảm giác 'tôi là ai trong nền tảng' là động lực dài hạn." },
        ],
      },
      {
        id: "edtech-9",
        title: "A/B Testing sư phạm - đo cải tiến thực sự",
        titleEn: "Pedagogical A/B Testing - Measure Real Improvement",
        level: 4,
        difficulty: "advanced",
        theory: `## 1. 🧪 Vì sao cần A/B test?

Đổi UI/đổi bài giảng "vì thấy hay" rất dễ **làm tệ đi mà không biết**. A/B test cho phép nói: "Phiên bản B làm mastery tăng 12% so với A với độ tin cậy 95%".

## 2. ⚙️ Cấu trúc thí nghiệm

\`\`\`
            ┌──────────────────────────────┐
   Học sinh │  RANDOM ASSIGN (50/50)        │
   mới      │  hash(user_id) % 2 → A | B    │
            └──────────┬──────────────┬─────┘
                       ▼              ▼
                ┌────────────┐ ┌────────────┐
                │ Variant A  │ │ Variant B  │
                │ (control)  │ │ (treatment)│
                └─────┬──────┘ └─────┬──────┘
                      ▼              ▼
                 Đo mastery_growth sau 14 ngày
                          ▼
             t-test / Mann-Whitney → p-value
\`\`\`

## 3. 🔢 Sample size - đủ bao nhiêu là vừa?

Quy tắc thô: phát hiện effect 5% (mastery growth từ 0.30 → 0.315) cần **~3,000 user/nhánh** với α=0.05, β=0.2.

| Effect mong muốn | Sample / nhánh |
|------------------|----------------|
| 20% | ~200 |
| 10% | ~800 |
| 5%  | ~3,000 |
| 1%  | ~70,000 |

**Đừng "peek" mỗi ngày** - \`peeking\` tăng false-positive khủng khiếp. Quy ước thời gian trước.

## 4. 🧮 Đọc p-value đúng cách

- p < 0.05 → có bằng chứng B khác A.
- KHÔNG đồng nghĩa "B chắc chắn tốt hơn" - luôn nhìn **kích cỡ effect** và **khoảng tin cậy**.
- Nếu chạy 20 metric mà 1 cái p<0.05 → có thể chỉ là nhiễu (multiple comparison).

## 5. 🛑 Khi nào DỪNG sớm?

- **Harm threshold**: nếu mastery của nhánh B giảm > 10% → dừng ngay để bảo vệ học sinh.
- **Bayesian early stop**: dùng khung Bayesian (Optimizely) chính thống thay vì peek frequentist.

## 6. ⚠️ Bẫy

- **SRM (Sample Ratio Mismatch)**: 60/40 thay vì 50/50 → assignment bị bias, kết quả vô giá trị.
- **Novelty effect**: phiên bản mới đẹp → user thử nhiều, 2 tuần sau hết hứng.
- **Network effect**: leaderboard A và B chung → 2 nhánh ảnh hưởng nhau.
`,
        theoryEn: `## 1. Why Pedagogical A/B Testing?

Changing a UI or lecture "because it feels better" is the easiest way to **make things worse without knowing**. A/B testing lets you say with statistical confidence: *"Variant B raised mastery by 12% with 95% confidence."*

## 2. Experiment Structure

\`\`\`
   New learners
        │
   RANDOM ASSIGN (hash(user_id) % 2)
        │
   ┌────────┴────────┐
   ▼                 ▼
 Variant A         Variant B
 (control)         (treatment)
   │                 │
   └────────┬────────┘
            ▼
   Measure mastery_growth after 14 days
            │
            ▼
   Welch's t-test / Mann-Whitney → p-value + CI
\`\`\`

## 3. Sample Size - Pre-Register It

Detecting tiny effects requires huge samples. Rough rule (α=0.05, power=0.8):

| Effect | Sample per arm |
|--------|----------------|
| 20% | ~200 |
| 10% | ~800 |
| 5% | ~3,000 |
| 1% | ~70,000 |

**Pre-register** the sample size and duration **before** you launch. *Never* peek at p-values daily - peeking inflates false-positive rate from 5% to 30%+.

## 4. Reading Results Correctly

- \`p < 0.05\` means *evidence* B differs from A - not "B is definitely better."
- Always report **effect size** + **95% CI**, not just p-value.
- 20 metrics tested, 1 below 0.05? Probably noise (multiple comparison).
- A CI that crosses 0 → **not** significant.

## 5. Stopping Rules

- **Harm threshold** - stop immediately if Variant B drops mastery > 10%. Protecting students overrides statistical purity.
- **Bayesian early stopping** - only valid under a proper framework (Optimizely, Beta-Binomial). Frequentist peeking is *not* valid.

## 6. Common Traps

- **SRM** (Sample Ratio Mismatch) - split is 60/40 instead of 50/50 → routing bug, results invalid.
- **Novelty effect** - flashy new UI wins for 2 weeks, then collapses; run experiments long enough to pass it.
- **Network effects** - shared leaderboards or social feeds let arms contaminate each other; cluster-randomize by class.
- **Multiple testing** - Bonferroni-correct or pre-specify your primary metric.`,
        code: `import hashlib, random
from statistics import mean, pstdev
from math import sqrt

def assign(user_id: str) -> str:
    h = int(hashlib.md5(user_id.encode()).hexdigest(), 16)
    return "A" if h % 2 == 0 else "B"

# Mô phỏng: B làm mastery growth tăng nhẹ
random.seed(7)
data = {"A": [], "B": []}
for i in range(2000):
    uid = f"u_{i}"
    arm = assign(uid)
    base = random.gauss(0.30, 0.10)
    lift = 0.02 if arm == "B" else 0.0
    data[arm].append(max(0, base + lift + random.gauss(0, 0.05)))

def welch_t(a, b):
    ma, mb = mean(a), mean(b)
    sa, sb = pstdev(a), pstdev(b)
    se = sqrt(sa*sa/len(a) + sb*sb/len(b))
    return (mb - ma) / se, mb - ma

t, diff = welch_t(data["A"], data["B"])
print(f"Δ mastery = {diff:+.3f}, t ≈ {t:.2f}  →  {'có ý nghĩa' if abs(t) > 1.96 else 'không đủ'}")`,
        codeLanguage: "python",
        exercise:
          "Thêm hàm srm_check(n_a, n_b) cảnh báo nếu tỉ lệ phân nhánh lệch >55/45 - dấu hiệu bias.",
        exerciseEn:
          "Write srm_check(n_a, n_b) warning if the split is more skewed than 55/45 - a sign of bias.",
        quiz: [
          { question: "Vì sao không nên peek p-value mỗi ngày?", options: ["Tốn server", "Tăng false-positive nghiêm trọng (multiple testing)", "Vi phạm RLS", "Không có vấn đề"], answer: 1, explanation: "Peeking biến α=5% thành 30%+ thực tế." },
          { question: "Sample Ratio Mismatch nghĩa là?", options: ["Sample quá nhỏ", "Tỉ lệ phân nhánh lệch khỏi thiết kế (vd 60/40)", "Quá nhiều nhánh", "Hết RAM"], answer: 1, explanation: "SRM cho thấy assignment hỏng - kết quả không đáng tin." },
          { question: "Novelty effect là?", options: ["Bug mới", "User hứng thú tạm thời với phiên bản mới, hết sau 1–2 tuần", "Tốc độ tăng", "Token mới"], answer: 1, explanation: "Phải chạy đủ dài để vượt qua giai đoạn novelty." },
          { question: "p < 0.05 nghĩa là?", options: ["B chắc chắn tốt hơn", "Có bằng chứng B khác A - vẫn cần nhìn effect size và CI", "B tốt 95%", "Không có ý nghĩa"], answer: 1, explanation: "Phải kết hợp effect size và khoảng tin cậy để diễn giải." },
          { question: "Khi nào dừng experiment sớm?", options: ["Khi cảm thấy đủ", "Khi nhánh B gây hại rõ (harm threshold) hoặc dùng khung Bayesian", "Khi sếp yêu cầu", "Bất cứ lúc nào"], answer: 1, explanation: "Dừng sớm tuỳ tiện làm hỏng tính thống kê - chỉ dừng vì harm hoặc Bayesian." },
        ],
      },
    ],
  },
  {
    id: "edtech-helsinki-research",
    title: "Nghiên cứu EdTech - 10 bài đọc kinh điển từ Đại học Helsinki",
    titleEn: "EdTech Research - 10 Must-Read Papers from University of Helsinki",
    icon: "🎓",
    color: "from-sky-500 to-indigo-600",
    description:
      "Tủ sách nghiên cứu EdTech do các giáo sư Đại học Helsinki (UH) - cái nôi của giáo dục Bắc Âu - thực hiện. Mỗi bài đều có tóm tắt và link đọc trực tiếp.",
    descriptionEn:
      "A curated research shelf authored by University of Helsinki professors - the cradle of Nordic education. Every paper includes a summary and a direct reading link.",
    course: "edtech",
    lessons: [
      {
        id: "edtech-helsinki-1",
        title: "10 bài nghiên cứu học thuật EdTech hay nhất từ Đại học Helsinki",
        titleEn: "Top 10 EdTech Academic Papers from the University of Helsinki",
        level: 4,
        difficulty: "advanced",
        theoryEn: `Why read research from the University of Helsinki (UH)? Finland leads PISA, and UH is the largest producer of educational knowledge in the Nordics. Professors such as Hannele Niemi, Kirsti Lonka, Kai Hakkarainen, Auli Toom, Sami Paavola, Minna Lakkala, Erika Löfström, Anne Nevgi, Liisa Postareff, and Katariina Salmela-Aro publish on AIED, CSCL, sustainable pedagogy, multiliteracy, engagement and study burnout. This lesson curates 10 must-read papers with direct Google Scholar links plus the official UH portals: HELDA (helda.helsinki.fi) and the UH research portal (researchportal.helsinki.fi).`,
        theory: `## 🎓 Vì sao đọc nghiên cứu từ Đại học Helsinki?

Phần Lan luôn nằm trong top thế giới về PISA, và **Đại học Helsinki (UH)** là trung tâm sản xuất tri thức giáo dục lớn nhất Bắc Âu. Các giáo sư của UH (Hannele Niemi, Kirsti Lonka, Kai Hakkarainen, Auli Toom, Sami Paavola, Minna Lakkala, Erika Löfström, Anne Nevgi, Liisa Postareff, Katariina Salmela-Aro…) đã xuất bản hàng nghìn nghiên cứu về:

- AI trong giáo dục (AIED)
- Học tập hợp tác qua mạng (CSCL - Computer-Supported Collaborative Learning)
- Sư phạm phát triển bền vững
- Học tập đa năng (multiliteracy) và digital literacy
- Sức khoẻ tinh thần & gắn kết học tập (engagement, burnout)

> 📚 Mẹo đọc nhanh của thầy Hải: với mỗi bài, đọc **Abstract → Conclusion → Figures**. Nếu thấy hay mới quay lại đọc Method.

---

## 📖 10 bài đọc tinh tuyển

### 1. AI in Learning: Preparing Grounds for Future Learning
- **Tác giả chính:** Hannele Niemi (UH, giáo sư danh dự Giáo dục học)
- **Tóm tắt:** Tổng quan cách AI tái định hình lớp học, từ adaptive learning đến đạo đức dữ liệu. Bài đặt nền cho mọi giáo viên muốn dùng AI nhân văn.
- 🔗 [Đọc trên Google Scholar](https://scholar.google.com/scholar?q=Hannele+Niemi+AI+in+learning+preparing+grounds)

### 2. Engaging Learning Environments for the Future - Phenomenon-Based Learning
- **Tác giả chính:** Kirsti Lonka (UH, Professor of Educational Psychology)
- **Tóm tắt:** Mô hình "phenomenon-based learning" - học theo hiện tượng đa môn - đã trở thành chuẩn của chương trình quốc gia Phần Lan từ 2016.
- 🔗 [Đọc trên Google Scholar](https://scholar.google.com/scholar?q=Kirsti+Lonka+phenomenon-based+learning)

### 3. The Knowledge Creation Metaphor - A Third Approach to Learning
- **Tác giả chính:** Sami Paavola & Kai Hakkarainen (UH)
- **Tóm tắt:** Giới thiệu "ẩn dụ thứ ba" về học tập (bên cạnh acquisition và participation): học là **kiến tạo tri thức mới**. Kim chỉ nam cho mọi nền tảng EdTech hợp tác.
- 🔗 [Đọc trên Google Scholar](https://scholar.google.com/scholar?q=Paavola+Hakkarainen+knowledge+creation+metaphor)

### 4. Networked Expertise - Professional and Educational Perspectives
- **Tác giả chính:** Kai Hakkarainen, Sami Paavola, Kirsti Lonka (UH)
- **Tóm tắt:** Sách/bài cột mốc về "chuyên môn nối mạng" - lý giải vì sao nhóm học tập kết nối lại vượt qua chuyên gia cô lập trong kỷ nguyên số.
- 🔗 [Đọc trên Google Scholar](https://scholar.google.com/scholar?q=Hakkarainen+networked+expertise)

### 5. Designing Pedagogical Infrastructures for Trialogical Learning
- **Tác giả chính:** Minna Lakkala, Liisa Ilomäki, Sami Paavola (UH)
- **Tóm tắt:** Khung "trialogical learning" - thiết kế bài học xoay quanh **đối tượng tri thức được chia sẻ** (shared artifact). Mẫu cho mọi nền tảng dự án.
- 🔗 [Đọc trên Google Scholar](https://scholar.google.com/scholar?q=Lakkala+Paavola+trialogical+learning+design)

### 6. Teacher Education in Finland - Research-Based Curriculum
- **Tác giả chính:** Auli Toom & Jukka Husu (UH, Faculty of Educational Sciences)
- **Tóm tắt:** Phân tích vì sao giáo viên Phần Lan đều có bằng Thạc sĩ và được đào tạo theo mô hình "research-based teacher education".
- 🔗 [Đọc trên Google Scholar](https://scholar.google.com/scholar?q=Auli+Toom+research-based+teacher+education+Finland)

### 7. Schoolwork Engagement and Burnout Among Finnish Students
- **Tác giả chính:** Katariina Salmela-Aro (UH, Professor of Educational Psychology)
- **Tóm tắt:** Bộ thang đo EDA (Engagement) và SBI (Study Burnout) - chuẩn vàng để đo gắn kết và kiệt sức học tập. Áp dụng được vào mọi LMS.
- 🔗 [Đọc trên Google Scholar](https://scholar.google.com/scholar?q=Salmela-Aro+schoolwork+engagement+burnout)

### 8. Conceptions of Teaching and Approaches to Teaching in Higher Education
- **Tác giả chính:** Liisa Postareff & Sari Lindblom-Ylänne (UH, Centre for University Teaching and Learning)
- **Tóm tắt:** Mô tả phổ "teacher-focused → student-focused" - dùng để cải tiến giảng dạy đại học và thiết kế khoá EdTech cho người lớn.
- 🔗 [Đọc trên Google Scholar](https://scholar.google.com/scholar?q=Postareff+Lindblom-Yl%C3%A4nne+conceptions+of+teaching)

### 9. Ethics in Educational Research and AI-Supported Learning
- **Tác giả chính:** Erika Löfström (UH, Professor of Education)
- **Tóm tắt:** Khung đạo đức nghiên cứu giáo dục - đặc biệt quan trọng khi LMS thu thập dữ liệu hành vi của học sinh vị thành niên.
- 🔗 [Đọc trên Google Scholar](https://scholar.google.com/scholar?q=Erika+L%C3%B6fstr%C3%B6m+ethics+educational+research)

### 10. Approaches to Learning and Study Success in Higher Education
- **Tác giả chính:** Anne Nevgi & Sari Lindblom-Ylänne (UH)
- **Tóm tắt:** Liên kết "deep / surface / strategic approach" với thành tích học - cơ sở để adaptive system gợi ý chiến lược học phù hợp.
- 🔗 [Đọc trên Google Scholar](https://scholar.google.com/scholar?q=Anne+Nevgi+approaches+to+learning+higher+education)

---

## 🧭 Cách dùng tủ sách này

\`\`\`
   ┌────────────┐    ┌─────────────┐    ┌────────────────┐
   │ 1. Chọn    │ ─▶ │ 2. Đọc 30'  │ ─▶ │ 3. Ghi 3 ý     │
   │   1 bài    │    │   (Abstract │    │   ứng dụng     │
   │   /tuần    │    │   + Concl.) │    │   vào lớp/app  │
   └────────────┘    └─────────────┘    └────────────────┘
\`\`\`

> 💡 Mỗi bài nghiên cứu là một "viên gạch sư phạm". Đọc 10 viên - bạn xây được nền móng EdTech vững như Phần Lan.

## 🔗 Cổng nghiên cứu chính thức của UH

- **HELDA** (kho luận văn & bài báo của UH): [helda.helsinki.fi](https://helda.helsinki.fi)
- **TUHAT** (cổng nghiên cứu của UH): [researchportal.helsinki.fi](https://researchportal.helsinki.fi)
- **Faculty of Educational Sciences:** [helsinki.fi/en/faculty-educational-sciences](https://www.helsinki.fi/en/faculty-educational-sciences)`,
        code: `# "Reading log" mini-helper - chạy thử bằng Python
helsinki_papers = [
    {"id": 1,  "author": "Hannele Niemi",        "topic": "AI in Learning"},
    {"id": 2,  "author": "Kirsti Lonka",          "topic": "Phenomenon-Based Learning"},
    {"id": 3,  "author": "Paavola & Hakkarainen", "topic": "Knowledge Creation Metaphor"},
    {"id": 4,  "author": "Hakkarainen et al.",    "topic": "Networked Expertise"},
    {"id": 5,  "author": "Lakkala et al.",        "topic": "Trialogical Learning Design"},
    {"id": 6,  "author": "Toom & Husu",           "topic": "Research-based Teacher Education"},
    {"id": 7,  "author": "Salmela-Aro",           "topic": "Engagement & Burnout (EDA/SBI)"},
    {"id": 8,  "author": "Postareff & Lindblom",  "topic": "Teaching Conceptions in HE"},
    {"id": 9,  "author": "Erika Löfström",        "topic": "Ethics in Educational Research"},
    {"id": 10, "author": "Nevgi & Lindblom",      "topic": "Approaches to Learning"},
]

# Lên lịch đọc 1 bài/tuần trong 10 tuần.
for i, p in enumerate(helsinki_papers, start=1):
    print(f"Tuần {i}: đọc bài #{p['id']} - {p['topic']} ({p['author']})")`,
        codeLanguage: "python",
        exercise:
          "Chọn 1 bài trong danh sách, viết tóm tắt 5 câu và đề xuất 1 tính năng cho HaiEduTech có thể áp dụng kết quả nghiên cứu đó.",
        exerciseEn:
          "Pick one paper, write a 5-sentence summary and propose one HaiEduTech feature that could apply the finding.",
        quiz: [
          {
            question: "Ai là tác giả của mô hình 'Phenomenon-Based Learning' nổi tiếng của Phần Lan?",
            options: ["Hannele Niemi", "Kirsti Lonka", "Sami Paavola", "Auli Toom"],
            answer: 1,
            explanation: "Kirsti Lonka (UH) là một trong những người truyền bá phenomenon-based learning mạnh nhất.",
          },
          {
            question: "Ẩn dụ 'Knowledge Creation' (kiến tạo tri thức) thuộc về cặp tác giả nào?",
            options: ["Niemi & Toom", "Paavola & Hakkarainen", "Lonka & Salmela-Aro", "Löfström & Nevgi"],
            answer: 1,
            explanation: "Sami Paavola và Kai Hakkarainen đề xuất 'third metaphor' bên cạnh acquisition và participation.",
          },
          {
            question: "Thang đo EDA và SBI dùng để đo điều gì trong học tập?",
            options: ["IQ học sinh", "Engagement và burnout", "Tốc độ đọc", "Khả năng coding"],
            answer: 1,
            explanation: "Katariina Salmela-Aro phát triển EDA (Engagement) và SBI (Study Burnout Inventory).",
          },
          {
            question: "Vì sao giáo viên Phần Lan đều phải có bằng Thạc sĩ?",
            options: [
              "Vì luật bắt buộc nhưng không có cơ sở khoa học",
              "Vì mô hình 'research-based teacher education' (Toom, Husu)",
              "Vì lương cao",
              "Vì truyền thống tôn giáo",
            ],
            answer: 1,
            explanation: "Mô hình của Toom & Husu yêu cầu giáo viên có năng lực nghiên cứu thực hành.",
          },
          {
            question: "Cổng nào dưới đây là kho công bố chính thức của Đại học Helsinki?",
            options: ["arxiv.org", "helda.helsinki.fi", "pubmed.gov", "jstor.org"],
            answer: 1,
            explanation: "HELDA là kho lưu trữ luận văn và bài báo của UH.",
          },
        ],
      },
    ],
  },
];

