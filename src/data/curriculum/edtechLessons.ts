import type { ExtendedProgrammingModule } from "./types";

/**
 * EdTech pillar — applied lessons that teach how learning platforms (like HaiEduTech)
 * are designed and built: learning science, spaced repetition algorithms, adaptive
 * difficulty, AI tutors, content recommendation, and speech/language tooling.
 */
export const edtechModules: ExtendedProgrammingModule[] = [
  {
    id: "edtech-foundations",
    title: "Nền tảng EdTech",
    titleEn: "EdTech Foundations",
    icon: "🎓",
    color: "from-pink-500 to-rose-600",
    description: "Khoa học học tập, kiến trúc LMS và cách thiết kế sản phẩm giáo dục số.",
    descriptionEn: "Learning science, LMS architecture, and how to design digital education products.",
    course: "edtech",
    lessons: [
      {
        id: "edtech-1",
        title: "EdTech là gì? Khoa học học tập trong sản phẩm số",
        titleEn: "What is EdTech? Learning Science in Digital Products",
        level: 1,
        difficulty: "beginner",
        theory: `## 1. 🎓 EdTech là gì? Định nghĩa đầy đủ

**EdTech (Education Technology)** là việc dùng công nghệ — web, mobile, AI, dữ liệu lớn — để **giúp người học tiến bộ nhanh hơn, sâu hơn, vui hơn, và công bằng hơn**. EdTech tốt **KHÔNG** chỉ là "số hoá sách giáo khoa": nó phải tái thiết kế trải nghiệm học theo những gì khoa học nhận thức (cognitive science) đã chứng minh trong 50 năm qua.

> 💡 **Phân biệt:** "Digital learning" = đưa nội dung lên màn hình. "EdTech" = dùng dữ liệu + AI + sư phạm để **cá nhân hoá** đường đi cho từng học sinh.

### Ba thế hệ EdTech
1. **Gen 1 (2000s)** — LMS như Moodle, Blackboard: chủ yếu lưu trữ tài liệu + bài kiểm tra.
2. **Gen 2 (2010s)** — MOOC (Coursera, edX), Duolingo: nội dung tương tác + game hoá.
3. **Gen 3 (2020s+)** — AI tutor, adaptive learning, speech grading: cá nhân hoá thời gian thực.

## 2. 🧠 4 nguyên lý vàng của Learning Science

| Nguyên lý | Cơ chế não bộ | Áp dụng trong sản phẩm |
|-----------|---------------|------------------------|
| **Spaced Repetition** | Đường cong quên Ebbinghaus: ôn ngay trước khi quên giúp củng cố synapse | Anki, HSK Vocab Bank, IELTS Mastered Words |
| **Retrieval Practice** | "Testing effect" (Roediger 2006): gợi nhớ chủ động mạnh hơn đọc lại 3× | Quiz cuối bài, flashcard 2 chiều, fill-in-blank |
| **Interleaving** | Trộn dạng bài buộc não chuyển ngữ cảnh → nhớ phân biệt rõ hơn | Mix listening + grammar + vocab trong 1 session |
| **Feedback Loop** | Dopamine + correction window: phản hồi <2s giữ động lực | AI Grading band tức thì, IPA pronunciation check |

### Nguyên lý phụ rất quan trọng
- **Desirable Difficulty (Bjork):** bài hơi khó hơn năng lực hiện tại giúp nhớ lâu hơn bài dễ.
- **Dual Coding (Paivio):** ghép hình ảnh + chữ → nhớ gấp đôi (vì vậy vocab có illustration).
- **Worked Examples (Sweller):** với người mới, cho lời giải mẫu hiệu quả hơn bắt tự giải.

## 3. 🏗️ Kiến trúc một sản phẩm EdTech điển hình

\`\`\`
┌─────────────┐   ┌──────────┐   ┌────────────┐   ┌─────────────┐
│  Frontend   │──▶│   API    │──▶│  Database  │   │  AI Services│
│  React/RN   │   │ REST/RPC │   │  Postgres  │   │ TTS, LLM,   │
│  PWA        │   │  Edge fn │   │  +Vector   │◀──│ STT, Embed  │
└─────────────┘   └──────────┘   └────────────┘   └─────────────┘
       ▲                │              │                  ▲
       │                ▼              ▼                  │
       │         ┌──────────────────────────┐             │
       └─────────│  Analytics & Mastery     │─────────────┘
                 │  Events · Cohorts · A/B  │
                 └──────────────────────────┘
\`\`\`

**Các tầng phải có:**
- **Content layer:** bài học, câu hỏi, audio — versioned để A/B test.
- **Progress layer:** lưu mastery, streak, XP, lần ôn cuối cùng.
- **Adaptive engine:** chọn bài kế tiếp dựa trên mastery_gap.
- **AI gateway:** wrap LLM/TTS/STT với rate limit + cost monitoring.
- **Analytics:** event stream để đo Activation/Retention/Mastery.

## 4. 🎮 Game hoá có chủ đích (Purposeful Gamification)

Không phải cứ thêm sao + huy hiệu là tốt. **Game hoá đúng** phải gắn với hành vi học:
- ⭐ Sao thưởng **khi đạt mastery** (không phải khi mở app).
- 🔥 Streak để khuyến khích **đều đặn** (não cần lặp lại để củng cố).
- 🏆 Leaderboard chỉ nên dựa trên **tiến bộ tương đối**, không phải điểm tuyệt đối → tránh học sinh yếu nản.

## 5. ⚠️ Bẫy thường gặp khi xây EdTech

1. **Game hoá quá mức** → học sinh chỉ chơi để có sao, không hấp thụ kiến thức.
2. **Không đo mastery** → không biết ai cần giúp, mọi quyết định dựa cảm tính.
3. **Content khoá cứng theo level** → học sinh giỏi bị chậm, học sinh yếu bị bỏ rơi.
4. **Bỏ qua mobile-first** → > 70% học sinh VN dùng điện thoại.
5. **Không có offline mode** → mạng yếu = mất bài học.
6. **Lạm dụng AI** → AI trả lời thay vì hướng dẫn → mất tính sư phạm.
`,
        theoryEn: `## 1. 🎓 What is EdTech?

EdTech uses web, mobile, AI, and data to help learners progress **faster, deeper, and with more joy**. Good EdTech is grounded in **learning science** — 50 years of cognitive research — not just shiny UI.

### Three generations
1. **Gen 1 (2000s):** LMS (Moodle, Blackboard) — content storage + quizzes.
2. **Gen 2 (2010s):** MOOC + Duolingo — interactive content + gamification.
3. **Gen 3 (2020s+):** AI tutors, adaptive learning, speech grading — real-time personalization.

## 2. 🧠 Four golden principles + supporting science

- **Spaced Repetition** — review just before forgetting (Ebbinghaus curve).
- **Retrieval Practice** — actively recall beats re-reading 3× (Roediger 2006 testing effect).
- **Interleaving** — mix problem types so the brain learns to discriminate.
- **Feedback Loop** — corrections within 2s preserve motivation and prevent error fossilization.
- **Desirable Difficulty** (Bjork): slightly above current ability gives the strongest retention.
- **Dual Coding** (Paivio): image + word doubles recall.
- **Worked Examples** (Sweller): for novices, show fully-solved examples before practice.

## 3. 🏗️ Architecture stack

Frontend (React/RN, PWA) → API (REST/Edge Functions) → Database (Postgres + vector) → AI services (TTS, STT, LLM, embeddings) → Analytics (events, cohorts, A/B). Every layer must be **versioned and instrumented** so you can experiment safely.

## 4. 🎮 Purposeful gamification
Stars only when **mastery threshold is hit**, streaks for **consistency**, leaderboards based on **relative progress** — never raw scores.

## 5. ⚠️ Common pitfalls
Over-gamification, no mastery tracking, hard-coded level locks, ignoring mobile-first, no offline support, AI giving answers instead of guiding.
`,
        code: `# Mô phỏng đơn giản: ghi nhận một lần học và tính tỉ lệ nhớ
sessions = [
    {"word": "apple", "correct": True},
    {"word": "apple", "correct": True},
    {"word": "banana", "correct": False},
]

from collections import defaultdict
stats = defaultdict(lambda: {"seen": 0, "correct": 0})
for s in sessions:
    stats[s["word"]]["seen"] += 1
    stats[s["word"]]["correct"] += 1 if s["correct"] else 0

for w, st in stats.items():
    acc = st["correct"] / st["seen"]
    print(f"{w}: accuracy = {acc:.0%}")`,
        codeLanguage: "python",
        exercise: "Thêm 2 phiên học mới và in ra danh sách từ có accuracy < 70% (cần ôn thêm).",
        exerciseEn: "Add 2 more sessions and print words with accuracy < 70% (need more practice).",
        quiz: [
          { question: "Spaced Repetition giúp điều gì?", options: ["Học nhanh hơn 1 đêm", "Ôn đúng lúc sắp quên để nhớ lâu", "Tăng tốc độ đọc", "Giảm số bài tập"], answer: 1, explanation: "Spaced Repetition lên lịch ôn ngay trước khi não quên — nhớ lâu với ít công sức nhất." },
          { question: "Retrieval practice là gì?", options: ["Đọc đi đọc lại", "Chủ động gợi nhớ thông tin (làm quiz)", "Xem video", "Ghi chép"], answer: 1, explanation: "Gợi nhớ chủ động hiệu quả hơn nhiều so với đọc lại thụ động." },
          { question: "EdTech tốt cần đo lường gì nhất?", options: ["Thời gian online", "Mastery / tiến bộ thực sự", "Số lượt mở app", "Màu sắc UI"], answer: 1, explanation: "Đo mastery giúp biết ai đã hiểu và ai cần hỗ trợ thêm." },
          { question: "Interleaving nghĩa là gì?", options: ["Học một chủ đề duy nhất", "Trộn nhiều dạng bài / chủ đề trong một buổi", "Học liên tục không nghỉ", "Học theo nhóm"], answer: 1, explanation: "Trộn dạng bài giúp não phân biệt và nhớ sâu hơn." },
          { question: "Vì sao feedback loop quan trọng?", options: ["Để app đẹp hơn", "Người học sửa sai ngay, ngăn lỗi đóng băng", "Để tăng doanh thu", "Không quan trọng"], answer: 1, explanation: "Phản hồi nhanh giúp người học sửa lỗi trước khi nó in vào trí nhớ dài hạn." },
        ],
      },
      {
        id: "edtech-2",
        title: "Thuật toán Spaced Repetition (SM-2)",
        titleEn: "Spaced Repetition Algorithm (SM-2)",
        level: 2,
        difficulty: "intermediate",
        theory: `## 1. 🧠 Đường cong quên Ebbinghaus — gốc rễ của Spaced Repetition

Năm 1885, Hermann Ebbinghaus tự thí nghiệm trên bản thân và phát hiện: sau khi học một thông tin mới, tốc độ quên gần như **lũy thừa âm**:
- Sau **20 phút** quên ~40%
- Sau **1 ngày** quên ~50–70%
- Sau **6 ngày** quên ~75%
- Sau **31 ngày** quên ~80% (nếu không ôn lại)

\`\`\`
  Retention %
   100│●
      │ \\
    80│  ●_
      │    \\__       (không ôn)
    60│       \\___
      │           \\____
    40│                \\_____
      │                      \\____
    20│                           \\____
      │                                 \\____
     0└────────────────────────────────────────▶ Time
       0   20m  1h   1d   6d   31d
\`\`\`

**Spaced Repetition** đặt mỗi lần ôn **đúng lúc đường cong vừa rơi xuống ~80%** — ngay trước khi quên hẳn. Mỗi lần ôn đúng, đường cong "reset" và **dốc xuống chậm hơn** — đó là lý do interval tăng theo cấp số nhân.

## 2. 📐 Thuật toán SM-2 (lõi của Anki, SuperMemo, Mochi)

SM-2 (Piotr Wozniak, 1987) là thuật toán đầu tiên được công bố công khai. Mỗi flashcard lưu 3 biến:

| Biến | Ý nghĩa | Giá trị khởi tạo |
|------|---------|------------------|
| **EF** (easiness factor) | Độ "dễ" của card với người học này | 2.5 |
| **interval** | Số ngày tới lần ôn kế | 0 |
| **repetitions** | Số lần trả lời đúng liên tiếp | 0 |

Sau mỗi lần đánh giá \`q ∈ [0..5]\` (0 = quên sạch, 5 = nhớ hoàn hảo):

\`\`\`
if q < 3:                          # Trả lời sai → coi như học lại từ đầu
    repetitions = 0
    interval    = 1
else:                              # Trả lời đúng
    if repetitions == 0: interval = 1
    elif repetitions == 1: interval = 6
    else:                interval = round(interval * EF)
    repetitions += 1

# Cập nhật EF cho mọi q (kể cả q<3, để card "khó" dần)
EF = max(1.3, EF + 0.1 - (5-q)*(0.08 + (5-q)*0.02))
\`\`\`

### Ví dụ ngày-theo-ngày của 1 card
| Ngày | q | repetitions | interval | EF | Ghi chú |
|------|---|-------------|----------|------|---------|
| 0 | – | 0 | 0 | 2.50 | Học mới |
| 1 | 5 | 1 | 1 | 2.60 | Đúng dễ |
| 2 | 4 | 2 | 6 | 2.60 | Vẫn đúng |
| 8 | 5 | 3 | 16 | 2.70 | Đúng dễ → giãn lịch |
| 24 | 2 | 0 | 1 | 2.46 | **Quên!** reset |

> 🔑 **Insight:** EF chỉ thay đổi từ từ (±0.15/lần), nên card cần **vài chục lần ôn** để hệ thống "hiểu" độ khó thực sự với người học.

## 3. 🎯 Vì sao SM-2 hiệu quả?

- **Card khó** → interval ngắn, EF giảm → người học gặp lại sớm để củng cố.
- **Card dễ** → interval nhân lên theo EF (vài tuần → vài tháng → vài năm).
- **Tự cân bằng workload**: lượng card "due" mỗi ngày ổn định ~5–10% kho.
- **Cá nhân hoá**: cùng một card, EF khác nhau cho mỗi người học.

## 4. 🆚 SM-2 vs các thế hệ kế tiếp

| Thuật toán | Năm | Khác biệt chính |
|------------|-----|-----------------|
| **SM-2** | 1987 | Đơn giản, 3 biến — đủ tốt cho 95% use case |
| **SM-17** | 2016 | Mô hình quên 2 chiều, dùng ML — phức tạp hơn nhiều |
| **FSRS** | 2022+ | Free Spaced Repetition Scheduler, hiện đã thay SM-2 trong Anki 23+, dựa trên DSR model (Difficulty/Stability/Retrievability) |

Khi mới làm sản phẩm EdTech, **bắt đầu bằng SM-2** rồi nâng cấp FSRS khi có > 10k phiên ôn để huấn luyện.

## 5. ⚠️ Các bẫy triển khai

1. **Quên giới hạn EF ≥ 1.3** → card có EF tiến về 0 → interval bằng 0 → "biến mất" hoặc loop vô tận.
2. **Không reset repetitions khi q<3** → người học quên mãi mà card vẫn bị giãn lịch → frustration.
3. **Không giới hạn số card mới/ngày** → tuần sau đột nhiên 500 card "due" → bỏ cuộc.
4. **Bỏ qua "leech" cards** (sai > 8 lần) → cần đánh dấu để giáo viên xem lại nội dung.
5. **Đo q sai** — nếu UI chỉ có nút "Đúng/Sai" thì mất thông tin granular của thang 0–5.
`,
        theoryEn: `## 1. 🧠 Ebbinghaus forgetting curve

Without review, retention drops to ~50% after 1 day and ~20% after a month. Spaced Repetition schedules each review **right before the curve crashes** — minimal effort, maximum retention.

## 2. 📐 SM-2 algorithm (core of Anki / SuperMemo)

Each card stores **EF** (easiness factor, default 2.5), **interval** (days to next review), and **repetitions** (consecutive correct streak). After rating \`q ∈ [0..5]\`:
- If \`q < 3\` → reset repetitions to 0 and interval to 1.
- Else: first correct → 1 day, second → 6 days, then \`interval × EF\`.
- Always update \`EF = max(1.3, EF + 0.1 - (5-q)*(0.08 + (5-q)*0.02))\`.

## 3. 🎯 Why it works
Hard cards shrink in interval and EF; easy cards exponentially grow (weeks → months → years). Daily due-load self-balances around 5–10% of the deck.

## 4. 🆚 SM-2 vs newer
**SM-2** (1987) is simple and good enough for 95% of cases. **FSRS** (2022+) replaced SM-2 in Anki 23+ using a Difficulty/Stability/Retrievability model — adopt it once you have > 10k reviews to fit.

## 5. ⚠️ Pitfalls
EF floor 1.3 missing → cards "vanish"; not resetting repetitions on q<3; no daily new-card cap; ignoring leech cards (failed > 8×); collapsing q into binary correct/wrong loses granularity.
`,
        code: `def sm2(card, q):
    """Update card after a review. q in [0..5]."""
    if q < 3:
        card["repetitions"] = 0
        card["interval"] = 1
    else:
        if card["repetitions"] == 0:
            card["interval"] = 1
        elif card["repetitions"] == 1:
            card["interval"] = 6
        else:
            card["interval"] = round(card["interval"] * card["ef"])
        card["repetitions"] += 1
    card["ef"] = max(1.3, card["ef"] + 0.1 - (5-q)*(0.08 + (5-q)*0.02))
    return card

card = {"word": "ephemeral", "ef": 2.5, "interval": 0, "repetitions": 0}
for q in [5, 4, 5, 2, 5]:
    card = sm2(card, q)
    print(f"q={q} → interval={card['interval']}d, EF={card['ef']:.2f}")`,
        codeLanguage: "python",
        exercise: "Mô phỏng 20 lần ôn với điểm ngẫu nhiên (random 0-5). In ra interval cuối cùng và tổng số ngày đã giả lập.",
        exerciseEn: "Simulate 20 reviews with random scores 0-5. Print final interval and total simulated days.",
        quiz: [
          { question: "Khi người học trả lời sai (q<3), điều gì xảy ra với repetitions?", options: ["Tăng 1", "Reset về 0", "Giữ nguyên", "Tăng 2"], answer: 1, explanation: "Sai → coi như học lại từ đầu, repetitions = 0 và interval = 1." },
          { question: "EF không được nhỏ hơn?", options: ["1.0", "1.3", "2.0", "0.5"], answer: 1, explanation: "SM-2 chặn EF ≥ 1.3 để tránh card bị giãn lịch quá ngắn vô tận." },
          { question: "Sau lần ôn đúng thứ 2, interval đặt thành?", options: ["1", "3", "6", "10"], answer: 2, explanation: "Lần 1 → 1 ngày, lần 2 → 6 ngày, sau đó nhân với EF." },
          { question: "SM-2 lấy cảm hứng từ?", options: ["Định luật Newton", "Đường cong quên Ebbinghaus", "Định luật Moore", "Lý thuyết game"], answer: 1, explanation: "SM-2 (Piotr Wozniak) dựa trên nghiên cứu quên của Ebbinghaus." },
          { question: "Mục tiêu của SM-2?", options: ["Học càng nhiều càng tốt mỗi ngày", "Ôn đúng lúc sắp quên, tối ưu công sức", "Phạt người sai", "Không có mục tiêu"], answer: 1, explanation: "Tối thiểu công sức – tối đa độ nhớ dài hạn." },
        ],
      },
      {
        id: "edtech-3",
        title: "Adaptive Difficulty & Mastery Tracking",
        titleEn: "Adaptive Difficulty & Mastery Tracking",
        level: 2,
        difficulty: "intermediate",
        theory: `## 1. 🎯 Adaptive Learning là gì?

Hệ thống **tự tăng/giảm độ khó theo kết quả người học** — giống một huấn luyện viên cá nhân: hôm nay bạn yếu listening → mai cho thêm listening; nay bạn đã thạo present simple → chuyển sang present perfect.

Trái với **One-size-fits-all** (cả lớp học cùng bài), Adaptive Learning đảm bảo mỗi học sinh luôn ở **Zone of Proximal Development (Vygotsky)** — vừa đủ thách thức để tiến bộ, không quá dễ (chán) cũng không quá khó (nản).

### Hai trường phái chính
| Cách | Nguyên lý | Ưu | Nhược |
|------|-----------|-----|-------|
| **Rule-based** | If/else: ≥80% đúng → lên level; ≥50% sai → xuống | Đơn giản, dễ giải thích | Cứng, không học từ dữ liệu |
| **Item Response Theory (IRT)** | Mô hình xác suất 2 tham số: năng lực θ học sinh × độ khó b câu hỏi | Chuẩn vàng (TOEIC, SAT, GMAT) | Cần dữ liệu lớn để calibrate |
| **Bayesian Knowledge Tracing (BKT)** | Mô hình Markov: 4 xác suất (init, learn, slip, guess) | Cân bằng độ chính xác và độ phức tạp | Khó debug khi sai |
| **Deep Knowledge Tracing (DKT)** | LSTM trên chuỗi tương tác | Bắt được pattern phức tạp | Black-box, khó giải thích cho phụ huynh |

> 🎯 **Khuyến nghị thực tế:** Bắt đầu bằng rule-based (1 tuần code), thêm BKT khi có > 5k phiên (1 tháng), nâng cấp IRT/DKT khi quy mô > 100k phiên.

## 2. 📊 Mastery Score — đo "đã hiểu" như thế nào?

Mastery thường được tính bằng **Exponential Moving Average (EMA)** thay vì trung bình thường, vì kết quả gần đây phản ánh năng lực hiện tại tốt hơn:

\`\`\`
mastery_new = α × is_correct + (1 - α) × mastery_old
\`\`\`

| α | Đặc tính | Khi nào dùng |
|---|---------|--------------|
| **0.1** | "Trí nhớ dài" — phản ứng chậm | Kỹ năng nền (đọc hiểu, ngữ pháp gốc) |
| **0.3** | Cân bằng | Mặc định cho hầu hết kỹ năng |
| **0.5+** | Nhạy, dao động | Kỹ năng đang luyện cấp tốc trước thi |

### Ví dụ 10 lần trả lời (α=0.3, mastery khởi tạo 0.5)
\`\`\`
Lượt: 1   2   3   4   5   6   7   8   9   10
KQ:   ✓   ✓   ✗   ✓   ✓   ✓   ✗   ✓   ✓   ✓
Mst: .65 .76 .53 .67 .77 .84 .59 .71 .80 .86
\`\`\`

## 3. 🧪 Khi nào coi là "Mastered"?

Quy tắc đơn lẻ dễ bị lừa. Dùng **AND** của nhiều điều kiện:

\`\`\`
mastered = (mastery ≥ 0.85)
         AND (đúng 3 lần gần nhất liên tiếp)
         AND (tổng số lần thử ≥ 5)
         AND (thời gian phản hồi trung bình ≤ 2× baseline)
\`\`\`

Điều kiện thứ 4 chống **"đoán bừa nhanh"**: nếu học sinh trả lời quá nhanh (<1s), khả năng cao là click bừa hoặc đã thuộc lòng vị trí đáp án.

### Bộ 4 mức kết quả (đáp ứng adaptive engine)
| Mức | mastery | Hành động hệ thống |
|-----|---------|--------------------|
| 🟥 **Struggling** | < 0.4 | Giảm độ khó, cho worked example |
| 🟧 **Learning** | 0.4–0.65 | Giữ độ khó, thêm scaffold (hint) |
| 🟨 **Practicing** | 0.65–0.85 | Tăng độ khó nhẹ, interleave |
| 🟩 **Mastered** | ≥ 0.85 + streak | Chuyển sang spaced repetition, mở topic mới |

## 4. 🔁 Vòng lặp Adaptive trong sản phẩm

\`\`\`
   ┌──────────────────────────────────────────────┐
   │  1. Chọn câu hỏi theo mastery + độ khó target │
   │  2. Người học trả lời                         │
   │  3. Cập nhật mastery (EMA) + log event        │
   │  4. Quyết định next: same / harder / easier   │
   │  5. (định kỳ) Re-calibrate độ khó câu hỏi     │
   └──────────────────────────────────────────────┘
\`\`\`

## 5. ⚠️ Các bẫy thường gặp

1. **Lên độ khó quá nhanh** → học sinh nản. Quy tắc: cần ≥ 5 mẫu trước khi quyết định đổi.
2. **Bỏ qua thời gian phản hồi** → đoán bừa vẫn được tính đúng.
3. **Không calibrate độ khó câu hỏi** — câu "khó" lúc viết có thể thực ra dễ.
4. **Mastery quá lạc quan** (chỉ cần 1 lần đúng = mastered) → ảo tưởng tiến bộ.
5. **Không reset mastery sau thời gian dài** — học sinh nghỉ 6 tháng vẫn "mastered" là sai.
6. **Áp đặt 1 mô hình cho mọi kỹ năng** — vocab cần α cao hơn ngữ pháp.
`,
        theoryEn: `## 1. 🎯 What is Adaptive Learning?

The system **automatically tunes difficulty to the learner**, keeping them in Vygotsky's Zone of Proximal Development: hard enough to grow, not so hard they quit.

Two main schools: **rule-based** (if ≥80% correct → level up), **statistical** (IRT, BKT, DKT — used by TOEIC/SAT). Start rule-based, graduate to BKT after 5k sessions, IRT/DKT past 100k.

## 2. 📊 Mastery via EMA

\`mastery = α·correct + (1-α)·mastery\`. α=0.1 = "long memory", α=0.3 = default, α=0.5+ = fast cram-mode.

## 3. 🧪 "Mastered" requires multiple conditions
mastery ≥ 0.85 AND 3 most-recent correct AND ≥ 5 attempts AND response time ≤ 2× baseline (filters lucky guesses).

### Four tiers drive adaptive decisions
- 🟥 Struggling (<0.4) → easier + worked examples
- 🟧 Learning (0.4–0.65) → same level + hints
- 🟨 Practicing (0.65–0.85) → harder + interleave
- 🟩 Mastered (≥0.85 + streak) → spaced repetition, new topic

## 4. 🔁 Adaptive loop
Select → answer → update mastery → decide next difficulty → periodically re-calibrate item difficulty.

## 5. ⚠️ Pitfalls
Changing difficulty after < 5 samples; ignoring response time (rewards lucky guesses); never calibrating items; declaring mastery too easily; never decaying mastery on long absence; one model for every skill type.
`,
        code: `class Skill:
    def __init__(self, alpha=0.3):
        self.mastery = 0.5
        self.alpha = alpha
        self.recent = []

    def update(self, correct: bool):
        self.mastery = self.alpha * (1 if correct else 0) + (1 - self.alpha) * self.mastery
        self.recent.append(correct)
        self.recent = self.recent[-3:]

    def is_mastered(self):
        return self.mastery >= 0.85 and len(self.recent) == 3 and all(self.recent)

s = Skill()
for ans in [True, False, True, True, True, True]:
    s.update(ans)
    print(f"mastery={s.mastery:.2f} mastered={s.is_mastered()}")`,
        codeLanguage: "python",
        exercise: "Thêm hàm next_difficulty() trả về 'easier' / 'same' / 'harder' dựa trên mastery (<0.4, 0.4–0.8, >0.8).",
        exerciseEn: "Add next_difficulty() returning 'easier' / 'same' / 'harder' from mastery (<0.4, 0.4–0.8, >0.8).",
        quiz: [
          { question: "EMA với alpha lớn hơn nghĩa là?", options: ["Quên kết quả cũ chậm hơn", "Kết quả gần đây có trọng số cao hơn", "Không thay đổi gì", "Reset mastery"], answer: 1, explanation: "alpha lớn → phản ứng nhanh với kết quả mới." },
          { question: "Tại sao cần ≥ 5 mẫu trước khi đổi độ khó?", options: ["Để code đẹp", "Tránh quyết định dựa trên may mắn", "Tiết kiệm RAM", "Không cần"], answer: 1, explanation: "Mẫu nhỏ dễ bị nhiễu — quyết định sai gây frustrate." },
          { question: "IRT mô hình hóa điều gì?", options: ["Mầu UI", "Năng lực học sinh và độ khó câu hỏi", "Tốc độ mạng", "Doanh thu"], answer: 1, explanation: "IRT (θ, b) là chuẩn vàng trong test chuẩn hóa như TOEIC, SAT." },
          { question: "Quy tắc 'mastered' trong bài gồm?", options: ["Mastery ≥ 0.85 và 3 lần đúng gần nhất", "Chỉ cần đúng 1 lần", "Học đủ 10 phút", "Không có quy tắc"], answer: 0, explanation: "Cần cả ngưỡng mastery và streak gần đây để chắc chắn." },
          { question: "Bẫy lớn khi adaptive?", options: ["Quá an toàn", "Tăng độ khó quá nhanh khiến nản", "Quá nhiều màu", "Không có bẫy"], answer: 1, explanation: "Adaptive sai gây frustration nặng hơn cả không adaptive." },
        ],
      },
    ],
  },
  {
    id: "edtech-applied",
    title: "EdTech Ứng Dụng AI",
    titleEn: "Applied EdTech with AI",
    icon: "🤖",
    color: "from-fuchsia-500 to-purple-600",
    description: "AI tutor, chấm bài tự động, gợi ý nội dung và speech-to-text cho học ngoại ngữ.",
    descriptionEn: "AI tutors, auto-grading, content recommendation, and speech-to-text for language learning.",
    course: "edtech",
    lessons: [
      {
        id: "edtech-4",
        title: "Xây dựng AI Tutor với LLM",
        titleEn: "Building an AI Tutor with LLMs",
        level: 3,
        difficulty: "intermediate",
        theory: `## 1. 🤖 AI Tutor vs Chatbot thông thường

| Tiêu chí | Chatbot thường (ChatGPT thuần) | AI Tutor đúng nghĩa |
|----------|-------------------------------|---------------------|
| **Mục tiêu** | Trả lời nhanh | Giúp học sinh **tự hiểu** |
| **Phương pháp** | Cung cấp đáp án | Socratic — đặt câu hỏi dẫn dắt |
| **Bối cảnh** | Quên ngay sau hội thoại | Nhớ level, lỗi gần đây, mục tiêu |
| **Feedback** | "Good job!" chung chung | "Bạn quên 's' cuối — 3rd person số ít" |
| **Đánh giá** | Không log | Log mastery, dùng cho adaptive engine |
| **Ràng buộc** | Open-ended | Strict system prompt + guardrails |

> 🎓 **Triết lý:** Một AI tutor giỏi giống một **gia sư Toán giàu kinh nghiệm**: KHÔNG bao giờ giải bài hộ — họ chỉ hỏi *"Bước này em thấy gì?"* cho tới khi học sinh tự nhìn ra lỗi.

## 2. 🧱 Kiến trúc hoàn chỉnh của AI Tutor

\`\`\`
┌───────────────┐   ┌─────────────────┐   ┌──────────────┐
│ Student input │──▶│ Pre-processor   │──▶│  LLM call    │
│ (msg / audio) │   │ • Load profile  │   │  + system    │
└───────────────┘   │ • Recent errors │   │    prompt    │
                    │ • Goal (band)   │   │  + history   │
                    │ • Tokenize/STT  │   └──────┬───────┘
                    └─────────────────┘          │
                                                  ▼
┌───────────────┐   ┌─────────────────┐   ┌──────────────┐
│   UI / TTS    │◀──│ Post-processor  │◀──│ LLM response │
│   render      │   │ • Validate JSON │   │  (Socratic   │
└───────────────┘   │ • Log mastery   │   │   question)  │
                    │ • Safety filter │   └──────────────┘
                    │ • PII redact    │
                    └─────────────────┘
\`\`\`

### Vai trò từng tầng
- **Pre-processor:** ghép \`student_profile + last_5_errors + goal\` vào context. Giảm cost bằng cách **chỉ gửi lỗi liên quan đến topic hiện tại**.
- **System prompt:** "hợp đồng" giữ AI đúng vai trò. Phải nêu rõ: tone, độ dài, được/không được làm gì.
- **Post-processor:** parse JSON, đánh giá an toàn (không vi phạm guideline), log mastery theo \`topic_id\`.

## 3. 📝 Mẫu System Prompt theo cấp độ

### Mức 1 — Cơ bản (1 dòng, kém hiệu quả)
\`\`\`
"Bạn là gia sư tiếng Anh, giúp học sinh học IELTS."
\`\`\`
👉 Quá mơ hồ. LLM dễ "trượt" sang trả lời thẳng.

### Mức 2 — Có cấu trúc Socratic
\`\`\`
Bạn là gia sư IELTS Writing. Học sinh hiện ở Band {{band}}, mục tiêu {{goal}}.
QUY TẮC NGHIÊM:
1. KHÔNG cho đáp án ngay. Hỏi 1 câu gợi mở trước.
2. Chỉ ra MỘT lỗi quan trọng nhất, kèm ví dụ sửa.
3. Kết thúc bằng câu hỏi: "Bạn muốn thử lại không?"
4. Tối đa 60 từ.
5. Nếu học sinh hỏi câu lạc đề (không IELTS), chuyển hướng lịch sự.
\`\`\`

### Mức 3 — Production (kèm output JSON để parse)
\`\`\`
Bạn là gia sư IELTS Writing Band {{band}}.
Trả về JSON theo schema:
{
  "feedback_vi": "...",       // tiếng Việt, < 80 từ
  "socratic_question": "...", // 1 câu hỏi dẫn dắt
  "topic_tag": "tense|article|cohesion|vocab|...",
  "is_correct": boolean,
  "next_action": "retry|new_question|explain"
}
\`\`\`

## 4. 🔄 Few-shot examples nâng chất lượng

Thêm 2-3 ví dụ mẫu vào system prompt → LLM bắt chước tone & độ dài chính xác:
\`\`\`
Ví dụ tốt:
HS: "He go to school."
TUTOR: { "feedback_vi": "Gần đúng! 'He' là ngôi 3 số ít — động từ cần đuôi gì nhỉ?",
         "socratic_question": "Thử chia lại 'go' xem?",
         "topic_tag": "tense-3rd-person-s", ... }
\`\`\`

## 5. 🧠 Memory & Personalization

| Loại memory | Lưu ở đâu | Dùng để |
|-------------|-----------|---------|
| **Short-term** | Context window LLM | Hội thoại 5-10 lượt gần nhất |
| **Mid-term** | DB summary mỗi 20 lượt | "HS hay sai article, mạnh vocab" |
| **Long-term** | Profile + mastery map | Adaptive lesson planning |

## 6. ⚠️ Bẫy thường gặp

1. **Cho LLM "muốn nói gì cũng được"** → mất tính sư phạm, trả lời thẳng đáp án.
2. **Không log mastery** → AI không nhớ học sinh tiến bộ tới đâu.
3. **Prompt quá dài (>2k token)** → cost tăng + LLM bỏ qua rule cuối.
4. **Không có fallback khi LLM lỗi** → app crash hoặc trả "Tôi không hiểu".
5. **Không rate limit** → 1 học sinh spam → $100/ngày.
6. **Bỏ PII redaction** → log lưu tên/email vi phạm GDPR.
7. **Không A/B test prompt** → không biết phiên bản nào dạy tốt hơn.
`,
        theoryEn: `## 1. 🤖 Tutor vs plain chatbot
A tutor follows Socratic pedagogy, knows the student's profile + recent errors + goal, gives specific corrective feedback, logs mastery, and runs inside a strict system-prompt guardrail. A chatbot just answers.

## 2. 🧱 Architecture
Pre-processor (profile + last errors + goal) → system prompt + history → LLM → post-processor (validate JSON, log mastery, safety + PII filter) → UI / TTS.

## 3. 📝 Prompt levels
- **L1:** one-line role — too vague.
- **L2:** add Socratic rules (no answers, one error at a time, end with a question, max 60 words).
- **L3 production:** require strict JSON schema so the FE can render structured feedback and persist topic tags.

## 4. 🔄 Few-shot examples
Add 2–3 worked examples in the system prompt; the LLM imitates tone and length.

## 5. 🧠 Memory tiers
Short-term (context window), mid-term (rolling summary every 20 turns), long-term (profile + mastery map).

## 6. ⚠️ Pitfalls
No guardrails; no mastery logging; bloated prompts (>2k tokens); no fallback on LLM error; no rate limit; PII in logs; never A/B testing prompts.
`,
        code: `# Pseudo-code cho 1 vòng tutor
def tutor_reply(student_msg, profile, history):
    system = f"""Bạn là gia sư {profile['subject']}. Học sinh band {profile['band']}.
Hỏi 1 câu gợi mở trước, chỉ 1 lỗi quan trọng, kết thúc bằng câu hỏi."""
    messages = [{"role":"system","content":system}, *history,
                {"role":"user","content":student_msg}]
    # response = llm.chat(messages)    # gọi LLM thật ở đây
    response = "Câu của em hay rồi! Nhưng 'He go' nên thành gì nhỉ?"
    log_mastery(profile["id"], topic="3rd-person-s", correct=False)
    return response

def log_mastery(uid, topic, correct):
    print(f"[log] {uid} · {topic} · {'✓' if correct else '✗'}")

print(tutor_reply("He go to school", {"id":1,"subject":"English","band":5.5}, []))`,
        codeLanguage: "python",
        exercise: "Thêm rule: nếu học sinh sai cùng topic 3 lần → tutor chuyển sang giải thích trực tiếp thay vì hỏi.",
        exerciseEn: "Add a rule: if the student fails the same topic 3 times → switch from Socratic to direct explanation.",
        quiz: [
          { question: "AI Tutor khác chatbot thường ở chỗ?", options: ["Đẹp hơn", "Có sư phạm + profile học sinh", "Chạy nhanh hơn", "Rẻ hơn"], answer: 1, explanation: "Tutor có pedagogy và personalization, không chỉ trả lời." },
          { question: "Socratic method nghĩa là?", options: ["Cho đáp án ngay", "Đặt câu hỏi dẫn dắt", "Phạt sai", "Khen tất cả"], answer: 1, explanation: "Socratic giúp học sinh tự khám phá → nhớ sâu hơn." },
          { question: "System prompt giữ vai trò gì?", options: ["Trang trí", "Ràng buộc hành vi AI để sư phạm", "Tăng tốc", "Giảm token"], answer: 1, explanation: "System prompt là 'hợp đồng' giữ AI đi đúng vai trò sư phạm." },
          { question: "Vì sao cần log mastery sau mỗi lượt?", options: ["Để báo cáo doanh thu", "Để adaptive system điều chỉnh độ khó", "Để tăng SEO", "Không cần"], answer: 1, explanation: "Mastery log nuôi adaptive engine và báo cáo tiến bộ." },
          { question: "Bẫy lớn nhất khi triển khai AI tutor?", options: ["UI xấu", "Không ràng buộc sư phạm → trả lời tuỳ tiện", "API chậm", "Quá rẻ"], answer: 1, explanation: "Không có guardrail sư phạm → mất giá trị giáo dục." },
        ],
      },
      {
        id: "edtech-5",
        title: "Chấm bài tự động (Auto-grading)",
        titleEn: "Automated Essay & Speaking Grading",
        level: 3,
        difficulty: "advanced",
        theory: `## 1. 📝 Vì sao chấm bài tự động khó?

Một bài essay IELTS Band 6 và Band 7 nhìn rất giống nhau với máy: cùng độ dài, cùng chủ đề, ít lỗi chính tả. Sự khác biệt nằm ở **chiều sâu lập luận, cohesion, lexical range** — những thứ trước 2022 chỉ con người chấm được. LLM thay đổi cuộc chơi: GPT-4 chấm IELTS Writing có **tương quan 0.85+** với chấm thủ công (gần bằng inter-rater giữa 2 giáo viên người).

## 2. 🧅 Kiến trúc 3 lớp chấm bài

| Lớp | Kỹ thuật | Câu hỏi trả lời | Cost | Thời gian |
|-----|---------|------------------|------|-----------|
| **L1 Surface** | Regex, đếm từ, spell-check, language detect | Có đủ 250 từ? Có lạc đề ngôn ngữ? | ~0 | < 50ms |
| **L2 Statistical** | TF-IDF, cosine similarity với essay mẫu Band 8 | Có đúng chủ đề? Có vay mượn câu trả lời sẵn? | rẻ | < 200ms |
| **L3 Semantic** | LLM với rubric prompting | Tại sao Band 6.5? Cụ thể lỗi ở đâu? | tốn | 3–8s |

**Pipeline:** mỗi essay qua L1 trước (loại bài rỗng/spam), L2 (detect plagiarism + topic match), rồi mới gọi L3 (đắt tiền nhất).

## 3. 🎤 Speaking Grading Pipeline

\`\`\`
┌────────┐  ┌────────┐  ┌──────────┐  ┌────────────┐  ┌───────────┐
│ Audio  │─▶│  STT   │─▶│  WER vs  │─▶│  LLM rubric │─▶│ Final band│
│ (.wav) │  │Whisper │  │  sample  │  │  scoring    │  │ + feedback│
└────────┘  └────────┘  └──────────┘  └────────────┘  └───────────┘
                            │
                            ▼
                      pronunciation
                          score
\`\`\`

### WER (Word Error Rate)
\`\`\`
WER = (Substitutions + Insertions + Deletions) / Total_words
\`\`\`
- WER = 0 → phát âm hoàn hảo.
- WER < 0.15 → fluent.
- WER > 0.3 → khó hiểu.

> ⚠️ **Cẩn thận:** STT cũng có lỗi (~5-10%). Nên dùng **confidence score** từ STT để loại từ STT đoán mò trước khi tính WER.

## 4. 🧪 Rubric Prompting — "linh hồn" của L3

### Prompt mẫu cho IELTS Writing Task 2
\`\`\`
Bạn là examiner IELTS có chứng chỉ. Chấm essay theo rubric chính thức
(band 0–9, bước 0.5) trên 4 tiêu chí:

1. Task Response — trả lời đúng câu hỏi chưa, có position rõ chưa
2. Coherence & Cohesion — paragraphing, linking words
3. Lexical Resource — từ vựng đa dạng, đúng collocation
4. Grammatical Range & Accuracy — câu phức, đúng tense

QUY TẮC:
- Trả về JSON đúng schema bên dưới.
- Mỗi tiêu chí: kèm 1 câu giải thích + 1 ví dụ trích từ essay.
- Overall = trung bình 4 tiêu chí, làm tròn 0.5.

Schema:
{
  "scores": { "task": 6.5, "coherence": 6.0, "lexical": 6.5, "grammar": 6.0 },
  "overall": 6.5,
  "feedback_per_criterion": { "task": "...", ... },
  "top_3_improvements": ["...", "...", "..."],
  "highlighted_strengths": ["..."]
}
\`\`\`

### Vì sao bắt JSON?
- Frontend render từng tiêu chí thành bar chart.
- DB lưu cấu trúc để báo cáo tiến bộ theo từng kỹ năng.
- Dễ validate (Zod / Pydantic) → fail-fast nếu LLM trả thiếu trường.

## 5. 🛡️ Validation & Reliability

| Vấn đề | Giải pháp |
|--------|-----------|
| LLM trả JSON sai format | Schema validator + retry với "Sửa JSON" prompt |
| LLM chấm dao động giữa các lần | Set **temperature = 0**, gọi 3 lần và lấy median |
| LLM thiên vị (length bias) | Truncate essay đến độ dài chuẩn trước khi chấm |
| Học sinh paste essay mẫu Band 9 | Plagiarism check L2 trước khi tới L3 |
| Cost vượt budget | Cache theo hash(essay) — 2 lần submit giống nhau = 1 lần gọi |

## 6. 📈 Calibration với chấm người thật

Để biết AI chấm đúng tới đâu:
1. Lấy 100 essay đã chấm bởi 2 examiner người (ground truth).
2. Cho LLM chấm cùng 100 essay.
3. Tính **Pearson correlation** và **Mean Absolute Error (MAE)**.
4. Đặt mục tiêu: correlation > 0.8, MAE < 0.5 band.
5. Nếu chưa đạt → tinh chỉnh prompt, thêm few-shot examples.

## 7. ⚠️ Bẫy lớn nhất

1. **Cho 1 điểm tổng duy nhất** → học sinh không biết sửa gì.
2. **Không yêu cầu JSON** → khó parse, không build UI tốt được.
3. **Không cache** → cost bùng nổ với essay lặp lại.
4. **Tin tuyệt đối vào LLM** — phải có "Yêu cầu giáo viên review" cho band quan trọng.
5. **Bỏ qua chấm tự động cho writing dài < 50 từ** → cho LLM 5 từ → vô nghĩa, lãng phí token.
6. **Không monitor drift** — mô hình LLM update → chấm có thể tăng/giảm 0.5 band bất ngờ.
`,
        theoryEn: `## 1. 📝 Why auto-grading is hard
Band 6 vs Band 7 essays look similar to machines; the difference is argument depth, cohesion, lexical range. LLMs since 2022 reach 0.85+ correlation with human raters on IELTS Writing.

## 2. 🧅 Three-layer pipeline
- **L1 Surface** (regex/wordcount/spell) — < 50ms, near-zero cost.
- **L2 Statistical** (TF-IDF/cosine vs Band-8 reference) — topic + plagiarism.
- **L3 Semantic** (LLM rubric) — slow & costly; only run after L1/L2 pass.

## 3. 🎤 Speaking pipeline
Audio → STT (Whisper) → WER vs sample (pronunciation) → LLM rubric (fluency, lexical, grammar). Always weight WER by STT confidence to avoid penalising STT errors.

## 4. 🧪 Rubric prompting
Force the LLM to return strict JSON with per-criterion scores, evidence quotes, and top-3 improvements. JSON unlocks UI rendering and DB analytics.

## 5. 🛡️ Reliability tricks
Schema validator + retry; temperature = 0 + median of 3 calls; truncate to avoid length bias; cache by essay hash; plagiarism filter before L3.

## 6. 📈 Calibration
Score 100 human-graded essays with the LLM, target Pearson > 0.8 and MAE < 0.5 bands; iterate prompts and few-shot examples.

## 7. ⚠️ Pitfalls
One total score (useless), unstructured output, no cache, blind trust without teacher review, grading sub-50-word stubs, ignoring model drift.
`,
        code: `import json, re

ESSAY = """Nowadays technology changes our life. Students use phone every day..."""

def surface_check(text):
    words = re.findall(r"\\w+", text)
    return {"word_count": len(words), "min_ok": len(words) >= 250}

def fake_llm_grade(text):
    # Giả lập kết quả LLM trả JSON theo rubric
    return {
        "scores": {"task": 6.0, "coherence": 6.5, "lexical": 5.5, "grammar": 6.0},
        "feedback": "Mở bài tốt; cần ví dụ cụ thể; tránh lặp 'technology'."
    }

print(surface_check(ESSAY))
print(json.dumps(fake_llm_grade(ESSAY), indent=2, ensure_ascii=False))`,
        codeLanguage: "python",
        exercise: "Tính band tổng = trung bình 4 tiêu chí (làm tròn 0.5). Thêm warning nếu word_count < 250.",
        exerciseEn: "Compute overall band = average of 4 criteria (rounded to 0.5). Warn if word_count < 250.",
        quiz: [
          { question: "Lớp 'surface' kiểm tra gì?", options: ["Ý nghĩa sâu", "Số từ, chính tả, định dạng", "Cảm xúc", "Logic"], answer: 1, explanation: "Surface là kiểm tra hình thức: đủ từ, đúng định dạng, lỗi chính tả." },
          { question: "WER trong speaking dùng để?", options: ["Đo tốc độ mạng", "Đo độ chính xác phát âm bằng so khớp text", "Đo cảm xúc", "Đo độ dài"], answer: 1, explanation: "WER so text từ STT với câu mẫu → tỉ lệ lỗi." },
          { question: "Vì sao bắt LLM trả JSON?", options: ["Để đẹp", "Để code FE parse và hiển thị từng tiêu chí", "Để LLM nghĩ kỹ hơn", "Để tốn ít token"], answer: 1, explanation: "JSON cho phép hiển thị rubric chi tiết và lưu DB." },
          { question: "Bẫy lớn nhất của chấm tự động?", options: ["Quá đắt", "Chỉ trả 1 điểm tổng, không feedback cụ thể", "Quá chậm", "Quá chính xác"], answer: 1, explanation: "1 điểm tổng không giúp học sinh sửa — phải có feedback theo tiêu chí." },
          { question: "Speaking grading thường kết hợp?", options: ["STT + WER + LLM rubric", "Chỉ STT", "Chỉ LLM", "Chỉ regex"], answer: 0, explanation: "Pipeline 3 bước cho điểm chính xác và feedback giàu." },
        ],
      },
      {
        id: "edtech-6",
        title: "Recommendation: gợi ý bài học kế tiếp",
        titleEn: "Recommendation: Next-Best Lesson",
        level: 3,
        difficulty: "intermediate",
        theory: `## 1. 🎯 Vì sao Recommendation quan trọng trong EdTech?

Một nền tảng EdTech trưởng thành có **500–5000 bài học**. Học sinh đăng nhập và đối mặt câu hỏi "Học gì tiếp theo?" → đa số chọn bừa hoặc thoát app. Theo nghiên cứu Coursera (2019): **gợi ý cá nhân hoá tăng tỉ lệ hoàn thành khóa 38%** so với danh sách phẳng.

> 🎯 **Mục tiêu kép:** (a) tăng retention (giữ chân) và (b) tăng learning velocity (tiến bộ nhanh) — KHÔNG chỉ là click-through rate như recommendation thương mại điện tử.

## 2. 🧰 Ba chiến thuật phổ biến — phân tích sâu

### a) Rule-based (Knowledge Graph)
Bài học có quan hệ **prerequisite** (A phải xong trước B). Biểu diễn dưới dạng đồ thị có hướng:
\`\`\`
"Hiện tại đơn" ──▶ "Hiện tại tiếp diễn" ──▶ "Hiện tại hoàn thành"
        │                                          │
        ▼                                          ▼
"Câu hỏi Yes/No"                          "Câu bị động hoàn thành"
\`\`\`

- ✅ **Ưu:** dễ giải thích cho giáo viên; không cần dữ liệu lớn.
- ❌ **Nhược:** cứng, không thấy được sở thích cá nhân.

### b) Content-based Filtering
Mỗi bài học có **vector đặc trưng** (topic, độ khó, kỹ năng, độ dài). Tìm bài có vector gần với bài học sinh đã thích/hoàn thành tốt.

| Đặc trưng | Cách tính |
|-----------|-----------|
| **Topic** | TF-IDF trên transcript, hoặc embedding (text-embedding-3-small) |
| **Difficulty** | Tham số b từ IRT, hoặc level 1-5 |
| **Skill mix** | One-hot: [listening, reading, vocab, grammar, speaking] |
| **Duration** | Phút dự kiến |

Similarity = cosine của 2 vector → > 0.7 coi là "tương tự".

- ✅ **Ưu:** xử lý được học sinh mới (chỉ cần biết họ thích gì).
- ❌ **Nhược:** "filter bubble" — chỉ gợi bài giống nhau, không khám phá topic mới.

### c) Collaborative Filtering
"Học sinh giống bạn cũng học bài X." Ma trận user × lesson với rating (mastery đạt được). Dùng SVD / ALS / Matrix Factorization để tìm latent factors.

- ✅ **Ưu:** phát hiện pattern bất ngờ ("HS học HSK 2 thường thích podcast văn hoá").
- ❌ **Nhược:** **Cold start** — học sinh mới hoặc bài mới không có data.

## 3. 📐 Hybrid Scoring — công thức thực dụng

Không cần chọn một — kết hợp 3:

\`\`\`
score(lesson) = w1 · mastery_gap(skill)
              + w2 · topic_similarity(history)
              + w3 · popularity(global)
              + w4 · prereq_ready(graph)
              − w5 · freshness_penalty(last_24h)
\`\`\`

| Trọng số | Khuyến nghị ban đầu | Tinh chỉnh bằng |
|----------|---------------------|-----------------|
| w1 (mastery_gap) | 0.5 | Cao hơn → ưu tiên kỹ năng yếu |
| w2 (similarity) | 0.3 | Cao hơn → cá nhân hoá mạnh |
| w3 (popularity) | 0.2 | Tránh cold start |
| w4 (prereq) | 1.0 (hard gate) | Không gợi nếu chưa đủ prereq |
| w5 (freshness) | 0.1 | Tránh lặp bài vừa làm |

> 🔧 **Tune trọng số bằng A/B test** trên 4 chỉ số: completion rate, mastery growth, time-to-mastery, D7 retention.

## 4. 🧊 Cold Start — vấn đề luôn phải giải

| Tình huống | Giải pháp |
|-----------|-----------|
| **Học sinh mới** | Hỏi 3 câu onboarding (goal, level, sở thích) → khởi tạo profile |
| **Bài học mới** | Dựa vào metadata (topic, difficulty) — fallback sang content-based |
| **Cả hai mới** | Hiển thị "top phổ biến trong cohort tương tự" (theo độ tuổi/mục tiêu) |

## 5. 🌈 Diversity & Serendipity

Recommendation chỉ tối ưu **relevance** sẽ làm người học chán. Thêm:
- **MMR (Maximal Marginal Relevance):** giảm điểm cho bài quá giống bài đã gợi.
- **ε-greedy exploration:** 10% lần gợi ý **random** trong top 50 → khám phá topic mới.
- **Skill balance:** đảm bảo gợi ý đủ 4 kỹ năng trong tuần (không spam listening).

## 6. 📊 Evaluation Metrics

| Metric | Đo gì | Lưu ý |
|--------|------|-------|
| **Precision@k** | Trong top-k gợi ý, bao nhiêu được click | Dễ đo, nhưng thiên về relevance ngắn hạn |
| **NDCG@k** | Có tính vị trí trong list | Tốt hơn cho ranking |
| **Mastery lift** | Δ mastery sau khi follow gợi ý | **Đo đúng cái EdTech cần** |
| **Coverage** | % bài học từng được gợi ý | Tránh "Matthew effect" (giàu càng giàu) |

## 7. ⚠️ Bẫy thường gặp

1. **Chỉ đề xuất bài dễ** → tăng engagement ảo, không tiến bộ.
2. **Bỏ qua đa dạng** → học sinh chán, drop-off cao.
3. **Không có hard gate prereq** → gợi bài quá khó → frustration.
4. **Optimize chỉ click-through** → giống TikTok, mất tính giáo dục.
5. **Không refresh model định kỳ** → recommendation lệch theo cohort cũ.
6. **Quên giải thích "vì sao gợi bài này"** → giảm trust. Thêm dòng "Vì bạn vừa hoàn thành X."
`,
        theoryEn: `## 1. 🎯 Why EdTech recommendation matters
A mature platform has 500–5000 lessons; personalized recommendations boost course completion ~38% (Coursera 2019). Goal is **retention + learning velocity**, not just CTR.

## 2. 🧰 Three strategies
- **Rule-based / knowledge graph:** prerequisite DAG. Simple, explainable, no personalization.
- **Content-based:** embed lesson features (topic vector via embeddings, difficulty, skill mix, duration); cosine similarity. Handles new users; risks filter bubble.
- **Collaborative filtering:** user × lesson matrix, ALS/SVD. Surfaces surprising patterns but suffers cold start.

## 3. 📐 Hybrid formula
\`score = w1·mastery_gap + w2·similarity + w3·popularity + w4·prereq_ready − w5·freshness_penalty\`. Tune weights via A/B on completion, mastery growth, time-to-mastery, D7.

## 4. 🧊 Cold start
New users → 3-question onboarding. New lessons → metadata-only ranking. Both new → cohort popularity.

## 5. 🌈 Diversity
Add **MMR** to penalize near-duplicates, **ε-greedy** for 10% exploration, and weekly skill-balance constraints.

## 6. 📊 Metrics
Precision@k, NDCG@k, mastery lift (the metric EdTech actually needs), coverage (avoid Matthew effect).

## 7. ⚠️ Pitfalls
Recommending only easy lessons; no diversity; missing prereq hard-gate; optimizing CTR like TikTok; never retraining; no "why this lesson" explanation → low trust.
`,
        code: `lessons = [
    {"id": "g1", "topic": "grammar", "popularity": 0.8},
    {"id": "v3", "topic": "vocab",   "popularity": 0.6},
    {"id": "l2", "topic": "listening","popularity": 0.5},
]
mastery = {"grammar": 0.4, "vocab": 0.8, "listening": 0.3}
liked_topic = "listening"

def score(lesson):
    gap = 1 - mastery.get(lesson["topic"], 0.5)          # kỹ năng yếu được điểm cao
    sim = 1.0 if lesson["topic"] == liked_topic else 0.3
    return 0.5*gap + 0.3*sim + 0.2*lesson["popularity"]

ranked = sorted(lessons, key=score, reverse=True)
for l in ranked:
    print(f"{l['id']:>3} · score={score(l):.2f}")`,
        codeLanguage: "python",
        exercise: "Thêm yếu tố 'freshness' (-0.1 nếu học sinh vừa làm bài đó trong 24h qua). In ra top-2.",
        exerciseEn: "Add a 'freshness' factor (-0.1 if user did the lesson in last 24h). Print top-2.",
        quiz: [
          { question: "Mastery gap cao có nghĩa?", options: ["Học sinh giỏi kỹ năng đó", "Học sinh yếu kỹ năng đó, cần luyện", "Bài quá khó", "Không có ý nghĩa"], answer: 1, explanation: "Gap = 1 - mastery → cao = yếu = nên gợi ý." },
          { question: "Collaborative filtering dựa trên?", options: ["Nội dung bài", "Hành vi của học sinh tương tự", "Giá tiền", "Màu sắc UI"], answer: 1, explanation: "Tìm pattern từ người dùng giống nhau (Netflix, Spotify)." },
          { question: "Cold start là vấn đề gì?", options: ["Server lạnh", "Không có dữ liệu cho học sinh / bài mới", "Internet chậm", "Hết pin"], answer: 1, explanation: "Học sinh mới chưa có history → collaborative không hoạt động." },
          { question: "Vì sao kết hợp 3 chiến thuật?", options: ["Cho vui", "Mỗi cách bù khuyết điểm của cách khác", "Để code dài", "Không cần"], answer: 1, explanation: "Hybrid mạnh hơn từng cách riêng lẻ." },
          { question: "Bẫy khi chỉ đề xuất bài dễ?", options: ["Tăng tự tin nhưng không tiến bộ", "Học sinh giỏi nhanh", "Tiết kiệm thời gian", "Không có bẫy"], answer: 0, explanation: "Phải có thử thách vừa sức (zone of proximal development)." },
        ],
      },
    ],
  },
];
