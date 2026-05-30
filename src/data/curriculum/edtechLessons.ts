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
        theory: `## 1. 🧠 Đường cong quên Ebbinghaus

Sau 1 ngày bạn quên ~50% kiến thức. Spaced Repetition lên lịch ôn đúng lúc đường cong rơi xuống ~80% — tốn ít công, nhớ rất lâu.

## 2. 📐 Thuật toán SM-2 (Anki)

Mỗi flashcard có:
- **EF** (easiness factor, mặc định 2.5)
- **interval** (số ngày tới lần ôn kế)
- **repetitions** (số lần trả lời đúng liên tiếp)

Sau mỗi lần đánh giá \`q\` (0–5):

\`\`\`
if q < 3: repetitions = 0; interval = 1
else:
    if repetitions == 0: interval = 1
    elif repetitions == 1: interval = 6
    else: interval = round(interval * EF)
    repetitions += 1
EF = max(1.3, EF + 0.1 - (5-q)*(0.08 + (5-q)*0.02))
\`\`\`

## 3. 🎯 Vì sao nó hiệu quả?

- Card khó → interval ngắn, EF giảm → gặp lại sớm.
- Card dễ → interval nhân lên (vài tuần → vài tháng).

## 4. ⚠️ Bẫy

- Quên giới hạn EF ≥ 1.3 → card có thể "biến mất".
- Không reset repetitions khi q<3 → người học quên mãi mà vẫn bị giãn lịch.
`,
        theoryEn: `SM-2 schedules each flashcard by tracking easiness factor (EF), interval, and repetitions. After each rating q (0-5), the algorithm updates EF and decides when to show the card again — short for hard cards, exponential for easy ones.`,
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
        theory: `## 1. 🎯 Adaptive learning

Hệ thống tự **tăng/giảm độ khó** theo kết quả người học — giống như HLV cá nhân. Hai cách phổ biến:

- **Rule-based:** đúng ≥ 80% → lên level; sai ≥ 50% → xuống level.
- **Item Response Theory (IRT):** mô hình hóa năng lực \\(\\theta\\) và độ khó \\(b\\) của câu hỏi.

## 2. 📊 Mastery score

Mastery thường tính bằng **exponential moving average (EMA)**:

\`\`\`
mastery = alpha * is_correct + (1 - alpha) * mastery
\`\`\`

\`alpha = 0.3\` giúp kết quả gần đây có trọng số cao hơn.

## 3. 🧪 Khi nào coi là "mastered"?

Một quy tắc đơn giản: **mastery ≥ 0.85 và đúng 3 lần gần nhất**.

## 4. ⚠️ Bẫy

- Lên độ khó quá nhanh → nản. Quy tắc: cần ≥ 5 mẫu trước khi quyết định.
- Bỏ qua thời gian phản hồi → người học đoán bừa vẫn được tính đúng.
`,
        theoryEn: `Adaptive systems tune difficulty using rules or IRT, and track mastery with an exponential moving average so recent answers weigh more.`,
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
        theory: `## 1. 🤖 AI Tutor khác chatbot thường ở đâu?

- **Sư phạm**: dùng phương pháp Socratic — đặt câu hỏi dẫn dắt thay vì cho đáp án ngay.
- **Bối cảnh học sinh**: biết level, lỗi gần đây, mục tiêu (IELTS 6.5? HSK 4?).
- **Phản hồi cụ thể**: thay vì "Good job", chỉ ra "Bạn quên 's' cuối — chia 3rd person số ít".

## 2. 🧱 Kiến trúc

\`Student msg\` → \`Pre-processor (lấy profile, history)\` → \`System prompt sư phạm\` → \`LLM\` → \`Post-processor (validate, log mastery)\` → \`UI\`

## 3. 📝 System prompt mẫu

\`\`\`
Bạn là gia sư IELTS Writing. Học sinh hiện ở Band {{band}}.
- Không cho đáp án ngay. Hỏi 1 câu gợi mở trước.
- Chỉ ra MỘT lỗi quan trọng nhất, kèm ví dụ sửa.
- Kết thúc bằng câu hỏi: "Bạn muốn thử lại không?"
\`\`\`

## 4. ⚠️ Bẫy

- Cho LLM "muốn nói gì cũng được" → mất tính sư phạm.
- Không log mastery → AI không nhớ học sinh tiến bộ tới đâu.
`,
        theoryEn: `An AI tutor differs from a chatbot by following Socratic pedagogy, using student profile/history, and giving concrete corrective feedback — wrapped in a strict system prompt and a logging layer.`,
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
        theory: `## 1. 📝 3 lớp chấm bài

| Lớp | Kỹ thuật | Ví dụ |
|-----|---------|-------|
| **Surface** | Regex, đếm từ, spell-check | Đủ 250 từ chưa? |
| **Statistical** | TF-IDF, similarity với đáp án mẫu | Có đúng chủ đề không? |
| **Semantic** | LLM rubric prompting | Band 6.5 vì lý do gì? |

## 2. 🎤 Speaking grading

- **STT (Speech-to-Text)**: chuyển âm thanh → text.
- So sánh **WER (Word Error Rate)** với câu mẫu để đo phát âm.
- Dùng LLM chấm fluency, lexical resource, grammar theo rubric IELTS.

## 3. 🧪 Rubric prompting

\`\`\`
Chấm essay theo rubric IELTS Writing Task 2 (band 0–9):
- Task Response
- Coherence & Cohesion
- Lexical Resource
- Grammatical Range & Accuracy
Trả JSON: { "scores": {...}, "feedback": "..." }
\`\`\`

## 4. ⚠️ Bẫy

- Cho 1 điểm tổng duy nhất → không học được gì.
- Không yêu cầu LLM trả JSON → khó parse, không build UI được.
`,
        theoryEn: `Auto-grading uses three layers (surface, statistical, semantic). Speaking grading combines STT, WER, and rubric-based LLM scoring returning structured JSON.`,
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
        theory: `## 1. 🎯 Vì sao cần?

Một nền tảng có 500 bài → học sinh dễ lạc. Gợi ý bài kế tiếp giữ chân và tăng tốc tiến bộ.

## 2. 🧰 3 chiến thuật phổ biến

- **Rule-based**: hoàn thành A → đề xuất B (graph prerequisites).
- **Content-based**: tìm bài có topic giống bài học sinh thích.
- **Collaborative filtering**: "học sinh giống bạn cũng học bài X".

## 3. 📐 Công thức gợi ý lai

\`score = 0.5 * mastery_gap + 0.3 * topic_similarity + 0.2 * popularity\`

- **mastery_gap**: ưu tiên kỹ năng yếu.
- **topic_similarity**: TF-IDF / embedding.
- **popularity**: tránh "cold start".

## 4. ⚠️ Bẫy

- Chỉ đề xuất bài dễ → học sinh không tiến.
- Bỏ qua đa dạng → chán.
`,
        theoryEn: `Hybrid recommendations combine rule-based prerequisites, content similarity, and collaborative signals, weighted to balance mastery gap, relevance, and popularity.`,
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
