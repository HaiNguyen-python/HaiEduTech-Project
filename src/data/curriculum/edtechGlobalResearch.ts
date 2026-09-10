import type { ExtendedProgrammingModule } from "./types";

/**
 * EdTech Global Research & Classroom Activities (2026)
 * --------------------------------------------------------
 * Expands the EdTech track with five deep lessons covering landmark
 * research from MIT, Stanford, Carnegie Mellon, OECD and UNESCO,
 * each paired with hands-on classroom activities Teacher Hai can
 * run with HaiEduTech students. All ASCII visuals so the markdown
 * renderer stays responsive on mobile.
 */
export const edtechGlobalResearchModules: ExtendedProgrammingModule[] = [
  {
    id: "edtech-global-research",
    title: "Nghiên cứu EdTech toàn cầu & Hoạt động lớp học",
    titleEn: "Global EdTech Research & Classroom Activities",
    icon: "🌍",
    color: "from-indigo-500 to-cyan-600",
    description:
      "5 bài chuyên sâu về các nghiên cứu kinh điển EdTech (MIT, Stanford, Carnegie Mellon, OECD, UNESCO) cùng hoạt động lớp học áp dụng ngay.",
    descriptionEn:
      "5 deep lessons on landmark EdTech research (MIT, Stanford, Carnegie Mellon, OECD, UNESCO) paired with ready-to-run classroom activities.",
    course: "edtech",
    lessons: [
      // ---------- Lesson 1: Bloom's 2-Sigma ----------
      {
        id: "edtech-gr-1",
        title: "Bài toán 2-Sigma của Bloom - tại sao 1-1 vẫn là chuẩn vàng",
        titleEn: "Bloom's 2-Sigma Problem - Why 1:1 Tutoring is Still the Gold Standard",
        level: 4,
        difficulty: "advanced",
        theory: `## 🧠 Phát hiện chấn động năm 1984

Benjamin Bloom (University of Chicago) so sánh 3 nhóm học sinh:

\`\`\`
   Học sinh trung bình (Conventional)        ████████░░░░░░░░░  ~50th %
   Học theo Mastery Learning                 ████████████░░░░░  ~84th %  (+1σ)
   Học 1-1 (One-to-One Tutoring)             ████████████████░  ~98th %  (+2σ)
\`\`\`

→ Học sinh được kèm 1-1 vượt 98% bạn cùng lớp. Khoảng cách 2 độ lệch chuẩn này được gọi là **Bloom's 2-Sigma Problem**: làm sao để 30 em/lớp đạt hiệu quả như được kèm 1 thầy 1 trò?

## 🤖 EdTech hiện đại trả lời thế nào?

1. **Adaptive learning** (Khan Academy, Duolingo, HaiEduTech): mỗi học sinh có lộ trình riêng dựa trên IRT + mastery tracking.
2. **AI Tutor** (Khanmigo, MagicSchool, HaiEduTech AI Coach): mô phỏng giáo viên 1-1 bằng LLM với RAG trên curriculum.
3. **Mastery Learning** (Bloom 1968 → ALEKS, Mathia): không tiến qua bài mới đến khi đạt 80%+.

## 📚 Tài liệu gốc

- 🔗 [Bloom (1984) - The 2 Sigma Problem](https://web.mit.edu/5.95/readings/bloom-two-sigma.pdf) (PDF MIT mirror)
- 🔗 [VanLehn (2011) - Relative effectiveness of human tutoring](https://scholar.google.com/scholar?q=VanLehn+2011+relative+effectiveness+human+tutoring) - thực tế hiệu ứng ~0.79σ chứ không phải 2σ.

## 🎯 Hoạt động lớp học áp dụng (45 phút)

\`\`\`
   ┌─────────────────────┐   ┌──────────────────────┐   ┌─────────────────────┐
   │ 1. Pre-test 10 câu  │ ─▶│ 2. AI Tutor 1-1      │ ─▶│ 3. Post-test 10 câu │
   │   (placement test)  │   │    20 phút (Khanmigo │   │   so sánh delta     │
   │                     │   │    hoặc HaiEdu Coach)│   │                     │
   └─────────────────────┘   └──────────────────────┘   └─────────────────────┘
\`\`\`

> 🧪 Đo Cohen's d giữa pre và post. Nếu d > 0.8 → bạn vừa tái hiện hiệu ứng Bloom trong 45 phút.`,
        theoryEn: `## 🧠 A Shocking 1984 Discovery

Benjamin Bloom (University of Chicago) compared 3 groups of students:

\`\`\`
   Average student (Conventional)             ████████░░░░░░░░░  ~50th %
   Mastery Learning                            ████████████░░░░░  ~84th %  (+1σ)
   One-to-One Tutoring                         ████████████████░  ~98th %  (+2σ)
\`\`\`

→ Students who got 1:1 tutoring outperformed 98% of their peers. This gap of 2 standard deviations is called **Bloom's 2-Sigma Problem**: how can 30 students in a classroom get results as good as being tutored 1-on-1?

## 🤖 How Does Modern EdTech Answer This?

1. **Adaptive learning** (Khan Academy, Duolingo, HaiEduTech): every student gets a personal path based on IRT (Item Response Theory) + mastery tracking.
2. **AI Tutor** (Khanmigo, MagicSchool, HaiEduTech AI Coach): simulates a 1:1 teacher using an LLM with RAG over the curriculum.
3. **Mastery Learning** (Bloom 1968 → ALEKS, Mathia): students cannot move to a new lesson until they hit 80%+ mastery.

## 📚 Source Reading

- 🔗 [Bloom (1984) - The 2 Sigma Problem](https://web.mit.edu/5.95/readings/bloom-two-sigma.pdf) (MIT PDF mirror)
- 🔗 [VanLehn (2011) - Relative effectiveness of human tutoring](https://scholar.google.com/scholar?q=VanLehn+2011+relative+effectiveness+human+tutoring) - the real-world effect is closer to ~0.79σ, not the full 2σ.

## 🎯 A Classroom Activity to Try (45 minutes)

\`\`\`
   ┌─────────────────────┐   ┌──────────────────────┐   ┌─────────────────────┐
   │ 1. Pre-test 10 qs   │ ─▶│ 2. AI Tutor 1-on-1   │ ─▶│ 3. Post-test 10 qs │
   │   (placement test)  │   │    20 min (Khanmigo  │   │   compare the delta │
   │                     │   │    or HaiEdu Coach)  │   │                     │
   └─────────────────────┘   └──────────────────────┘   └─────────────────────┘
\`\`\`

> 🧪 Measure Cohen's d between pre and post. If d > 0.8, you have just reproduced Bloom's effect in 45 minutes.`,
        code: `# Compute Cohen's d for a pre/post tutoring experiment
from math import sqrt

def cohens_d(pre, post):
    mean = lambda xs: sum(xs) / len(xs)
    variance = lambda xs, m: sum((x - m) ** 2 for x in xs) / (len(xs) - 1)
    m_pre, m_post = mean(pre), mean(post)
    sd_pooled = sqrt((variance(pre, m_pre) + variance(post, m_post)) / 2)
    return (m_post - m_pre) / sd_pooled

pre  = [4, 5, 6, 5, 4, 7, 5, 6, 5, 4]
post = [7, 8, 9, 8, 7, 9, 8, 9, 8, 7]
print(f"Cohen's d = {cohens_d(pre, post):.2f}")
# → d ≈ 1.7 (huge effect, gần với 2-sigma)`,
        codeLanguage: "python",
        exercise:
          "Thiết kế một mini-study trong lớp: chọn 6 học sinh, chia 2 nhóm (control vs AI Tutor), chạy pre/post test 10 câu trong 30 phút, tính Cohen's d.",
        exerciseEn:
          "Design an in-class mini-study: pick 6 students, split into control vs AI Tutor groups, run a 30-minute pre/post test, compute Cohen's d.",
        quiz: [
          {
            question: "Bloom's 2-Sigma Problem nói rằng học 1-1 nâng học sinh lên bao nhiêu độ lệch chuẩn so với lớp thường?",
            options: ["0.5σ", "1σ", "2σ", "3σ"],
            answer: 2,
            explanation: "Bloom (1984) báo cáo hiệu ứng ~2σ giữa nhóm 1-1 và nhóm conventional.",
            questionEn: "Bloom's 2-Sigma Problem claims 1:1 tutoring raises students by how many standard deviations compared to a normal class?",
            optionsEn: ["0.5σ", "1σ", "2σ", "3σ"],
            explanationEn: "Bloom (1984) reported a ~2σ effect between the 1:1 tutoring group and the conventional group.",
          },
          {
            question: "VanLehn (2011) báo cáo hiệu ứng thực tế của human tutoring gần với mức nào?",
            options: ["~0.2σ", "~0.79σ", "~2σ", "~4σ"],
            answer: 1,
            explanation: "VanLehn đo lại nhiều nghiên cứu, kết luận hiệu ứng quanh d ≈ 0.79σ - vẫn lớn nhưng thấp hơn Bloom.",
            questionEn: "VanLehn (2011) reported the real-world effect of human tutoring close to which value?",
            optionsEn: ["~0.2σ", "~0.79σ", "~2σ", "~4σ"],
            explanationEn: "VanLehn re-analysed many studies and concluded the effect is around d ≈ 0.79σ - still large, but lower than Bloom's figure.",
          },
          {
            question: "Cohen's d = 0.8 được coi là?",
            options: ["Hiệu ứng nhỏ", "Hiệu ứng trung bình", "Hiệu ứng lớn", "Không có hiệu ứng"],
            answer: 2,
            explanation: "Theo Cohen, d≈0.2 small, 0.5 medium, 0.8+ large.",
            questionEn: "A Cohen's d of 0.8 is considered?",
            optionsEn: ["A small effect", "A medium effect", "A large effect", "No effect"],
            explanationEn: "By Cohen's convention, d≈0.2 is small, 0.5 is medium, and 0.8+ is large.",
          },
          {
            question: "Cách EdTech hiện đại tiệm cận hiệu ứng 1-1 KHÔNG bao gồm?",
            options: ["Adaptive learning", "AI Tutor", "Mastery Learning", "Bài giảng video dài 2h không tương tác"],
            answer: 3,
            explanation: "Video dài không tương tác là conventional teaching, không tái hiện hiệu ứng 1-1.",
            questionEn: "Which of these is NOT a way modern EdTech tries to approximate the 1:1 tutoring effect?",
            optionsEn: ["Adaptive learning", "AI Tutor", "Mastery Learning", "A non-interactive 2-hour lecture video"],
            explanationEn: "A long non-interactive video is conventional teaching, and does not reproduce the 1:1 effect.",
          },
        ],
      },
      // ---------- Lesson 2: CMU PSLC ----------
      {
        id: "edtech-gr-2",
        title: "Carnegie Mellon PSLC - kho dữ liệu học tập lớn nhất thế giới",
        titleEn: "Carnegie Mellon PSLC - The World's Largest Learning Data Repository",
        level: 4,
        difficulty: "advanced",
        theory: `## 🏛️ PSLC là gì?

**Pittsburgh Science of Learning Center (PSLC)** tại Carnegie Mellon University (CMU) đã xây **DataShop** - kho dữ liệu mở lớn nhất thế giới về tương tác học tập, hơn **350.000 học sinh** và **hàng tỷ "transactions"** (mỗi click, mỗi câu trả lời).

\`\`\`
   ┌──────────────────────────────────────────────────────┐
   │  CMU DataShop  -  datashop.memphis.edu               │
   ├──────────────────────────────────────────────────────┤
   │  • 1500+ datasets công khai                          │
   │  • Định dạng chuẩn: Student / KC / Step / Outcome    │
   │  • API tải về CSV để chạy Knowledge Tracing tại nhà  │
   └──────────────────────────────────────────────────────┘
\`\`\`

## 🔑 Khái niệm KC - Knowledge Component

Mỗi bước giải bài (step) gắn với 1+ **Knowledge Component** (đơn vị kiến thức nhỏ nhất). Đường cong học (Learning Curve) cho thấy tỉ lệ sai giảm theo số lần luyện:

\`\`\`
   Error rate
     0.5 │●
         │ ●
     0.3 │  ●
         │    ●
     0.1 │       ●●●●●●●  ← đã "thông" KC này
         └──────────────────▶ # lần luyện
              1   2   3   4   5   6   7
\`\`\`

→ Power law: \`error = a · opportunity^(-b)\`. Đây là cơ sở của **Bayesian Knowledge Tracing (BKT)** mà DuoLingo, ASSISTments và HaiEduTech đều dùng.

## 📚 Đọc thêm

- 🔗 [Koedinger et al. (2010) - A Data Repository for the EDM Community](https://scholar.google.com/scholar?q=Koedinger+DataShop+2010)
- 🔗 [CMU DataShop](https://pslcdatashop.web.cmu.edu)
- 🔗 [Corbett & Anderson (1995) - BKT gốc](https://scholar.google.com/scholar?q=Corbett+Anderson+1995+knowledge+tracing)

## 🎯 Hoạt động lớp học (60 phút)

1. **15'** - Mỗi học sinh chọn 1 dataset từ DataShop, mô tả 3 KC chính.
2. **30'** - Vẽ learning curve bằng Excel/Python từ CSV tải về.
3. **15'** - Thuyết trình: KC nào "khó học" nhất? Đề xuất bài luyện thêm.`,
        theoryEn: `## 1. What Is the PSLC DataShop?

The **Pittsburgh Science of Learning Center (PSLC)** at Carnegie Mellon University built **DataShop** - the world's largest open repository of fine-grained learner interaction data. As of 2025 it hosts logs from **350,000+ learners** and **billions of transactions** across math, science, language and reading tutors. Anyone can register, download datasets, and run analyses on real classroom data.

## 2. Three Ideas That Changed EdTech

DataShop popularized three concepts that now power Duolingo, ASSISTments, Khan Academy and HaiEduTech:

| Concept | What it is | Why it matters |
|---------|------------|----------------|
| **Knowledge Component (KC)** | Atomic skill needed for one step of a problem | Lets you model *what* the learner knows, not just *which lesson* they did |
| **Learning Curve** | Plot of error rate vs opportunities to practice a KC | Reveals which KCs are easy vs hard to learn |
| **Bayesian Knowledge Tracing (BKT)** | HMM with 4 params (init, transit, slip, guess) tracking P(mastered) | Standard model behind adaptive tutors since 1995 |

## 3. The Power-Law of Learning

Empirically, error rate decays as a power law: \`error = a · opportunity^(-b)\`. A high \`b\` (≈ 0.7+) means the KC is learned fast; a low \`b\` (< 0.3) flags a stubborn KC that needs better scaffolding.

\`\`\`
   error
    0.5 │●
        │ ●
    0.3 │  ●
        │    ●
    0.1 │       ●●●●●●●    ← KC "mastered"
        └──────────────────▶ practice opportunities
\`\`\`

## 4. How to Use DataShop in Your Research

1. **Browse** the dataset catalog (Algebra I, Geometry, Chinese tones, Andes Physics…).
2. **Download** the transaction-level CSV or use the web analysis tools.
3. **Pick a KC** with enough opportunities (>500) for stable curves.
4. **Fit a power law** and compare \`b\` across student segments.
5. **Cite** Koedinger et al. (2010) for the data repository paper.

## 5. Why It Still Matters in 2026

LLM tutors are great at generating explanations but **bad at memory modeling**. Pairing an LLM with BKT (or its modern cousin **Deep Knowledge Tracing**) gives you the best of both: rich dialogue *and* an accurate model of what the learner has actually mastered.`,
        code: `# Fit a power-law learning curve: error = a * opportunity^(-b)
import numpy as np

# Aggregated error rate per opportunity (from a DataShop CSV)
opportunities = np.array([1, 2, 3, 4, 5, 6, 7, 8])
error_rate    = np.array([0.52, 0.40, 0.31, 0.24, 0.18, 0.14, 0.11, 0.09])

# Linearise: log(error) = log(a) - b * log(opp)
log_opp = np.log(opportunities)
log_err = np.log(error_rate)
b, log_a = np.polyfit(log_opp, log_err, 1)
b = -b
a = np.exp(log_a)

print(f"Estimated curve: error = {a:.2f} * opp^(-{b:.2f})")
# A high 'b' (~0.7+) means this KC is learned quickly.`,
        codeLanguage: "python",
        exercise:
          "Tải 1 dataset bất kỳ từ DataShop, chọn 1 KC và vẽ learning curve. Báo cáo giá trị b và nhận xét tốc độ học.",
        exerciseEn:
          "Download a DataShop dataset, pick a KC and plot its learning curve. Report the b-coefficient and comment on the learning rate.",
        quiz: [
          {
            question: "DataShop của PSLC thuộc trường nào?",
            options: ["MIT", "Stanford", "Carnegie Mellon", "Harvard"],
            answer: 2,
            explanation: "PSLC là dự án của Carnegie Mellon University (CMU).",
            questionEn: "PSLC's DataShop belongs to which university?",
            optionsEn: ["MIT", "Stanford", "Carnegie Mellon", "Harvard"],
            explanationEn: "PSLC is a project of Carnegie Mellon University (CMU).",
          },
          {
            question: "Knowledge Component (KC) là gì?",
            options: [
              "Một chương sách giáo khoa",
              "Đơn vị kiến thức nhỏ nhất gắn với 1 bước giải",
              "Một file CSV",
              "Một mô hình deep learning",
            ],
            answer: 1,
            explanation: "KC là đơn vị kiến thức nguyên tử mà 1 step luyện tập đụng tới.",
            questionEn: "What is a Knowledge Component (KC)?",
            optionsEn: [
              "A textbook chapter",
              "The smallest unit of knowledge tied to one problem step",
              "A CSV file",
              "A deep learning model",
            ],
            explanationEn: "A KC is the atomic unit of knowledge that a single practice step touches.",
          },
          {
            question: "Learning curve thường tuân theo dạng?",
            options: ["Tuyến tính", "Hàm mũ tăng", "Power law giảm", "Hằng số"],
            answer: 2,
            explanation: "error = a · opportunity^(-b) - power law giảm.",
            questionEn: "Learning curves typically follow which shape?",
            optionsEn: ["Linear", "Increasing exponential", "Decaying power law", "Constant"],
            explanationEn: "error = a · opportunity^(-b) - a decaying power law.",
          },
          {
            question: "Thuật toán BKT do ai đề xuất?",
            options: ["Bloom 1984", "Corbett & Anderson 1995", "Vygotsky 1978", "Skinner 1953"],
            answer: 1,
            explanation: "Corbett & Anderson (1995) giới thiệu Bayesian Knowledge Tracing tại CMU.",
            questionEn: "Who proposed the BKT algorithm?",
            optionsEn: ["Bloom 1984", "Corbett & Anderson 1995", "Vygotsky 1978", "Skinner 1953"],
            explanationEn: "Corbett & Anderson (1995) introduced Bayesian Knowledge Tracing at CMU.",
          },
        ],
      },
      // ---------- Lesson 3: Stanford MOOC research ----------
      {
        id: "edtech-gr-3",
        title: "Stanford & MOOC - bài học từ 10 năm học trực tuyến đại trà",
        titleEn: "Stanford & MOOCs - 10 Years of Lessons from Massive Online Learning",
        level: 3,
        difficulty: "intermediate",
        theory: `## 🌐 MOOC bùng nổ 2011 - 2025

Stanford khởi xướng làn sóng MOOC năm 2011 với khoá AI của Sebastian Thrun & Peter Norvig (Coursera, Udacity, edX ra đời sau đó). Nhưng 10 năm sau, ngành EdTech rút ra nhiều bài học cay đắng và quý giá.

\`\`\`
   Tỉ lệ hoàn thành MOOC điển hình
                          
   Đăng ký   ████████████████████  100%
   Xem video ███████████░░░░░░░░░   55%
   Làm assignment ████░░░░░░░░░░░   20%
   Hoàn thành ██░░░░░░░░░░░░░░░░   5-10%   ← "completion crisis"
\`\`\`

## 🔑 5 phát hiện kinh điển từ Stanford CAROL & HCI Lab

1. **Reich (2014, Science)** - "MOOCs and the science of learning": completion ~ 5%, demographic skew về người đã có bằng cử nhân.
2. **Kizilcec et al. (2013)** - 4 nhóm hành vi học viên: Completing / Auditing / Disengaging / Sampling - cơ sở cho mọi engagement analytics ngày nay.
3. **Mitros & Mehta (2014, edX)** - Forum discussion tốt cho học hơn lecture video dài.
4. **Brunskill (Stanford)** - RL cho personalization: Thompson Sampling tăng retention ~20%.
5. **Reich & Ruipérez-Valiente (2019, Science)** - "The MOOC pivot": từ B2C → B2B (certification cho doanh nghiệp).

## 🎯 Hoạt động lớp học (90 phút)

\`\`\`
   ┌────────────────┐   ┌─────────────────┐   ┌──────────────────┐   ┌──────────────────┐
   │ 1. Chia 4 nhóm │ ─▶│ 2. Mỗi nhóm     │ ─▶│ 3. Vẽ funnel     │ ─▶│ 4. Đề xuất 3     │
   │   hành vi      │   │    đóng vai 1   │   │    completion    │   │    can thiệp     │
   │   Kizilcec     │   │    persona      │   │    cho persona   │   │    cụ thể        │
   └────────────────┘   └─────────────────┘   └──────────────────┘   └──────────────────┘
\`\`\`

## 📚 Đọc thêm

- 🔗 [Reich (2014) - Rebooting MOOC research](https://www.science.org/doi/10.1126/science.1261627)
- 🔗 [Kizilcec et al. (2013) - Deconstructing disengagement](https://scholar.google.com/scholar?q=Kizilcec+2013+deconstructing+disengagement)
- 🔗 [Reich & Ruipérez-Valiente (2019) - The MOOC pivot](https://www.science.org/doi/10.1126/science.aav7958)`,
        theoryEn: `## 1. The 2011 MOOC Explosion

Stanford launched the modern MOOC era in fall 2011 when Sebastian Thrun and Peter Norvig opened their AI course to the world - **160,000+ learners enrolled**. Coursera (Daphne Koller, Andrew Ng), Udacity and edX (MIT + Harvard) followed within months. The industry believed online courses would democratize elite education globally.

## 2. The Completion Crisis

Ten years of empirical research delivered a sobering verdict:

\`\`\`
   Typical MOOC funnel
   Enrolled       ████████████████████  100%
   Watched video  ███████████░░░░░░░░░   55%
   Did assignment ████░░░░░░░░░░░░░░░░   20%
   Completed      ██░░░░░░░░░░░░░░░░░░   5-10%
\`\`\`

Reich (2014, *Science*) showed completion ~5%, with a strong demographic skew toward learners who **already** hold a bachelor's degree - the opposite of democratization.

## 3. Five Classic Findings

| Year | Author | Insight |
|------|--------|---------|
| 2013 | **Kizilcec et al.** | 4 behavior clusters: Completing / Auditing / Disengaging / Sampling - basis for every modern engagement dashboard |
| 2014 | **Reich** (Science) | "Completion crisis" - design must shift from credentials to outcomes |
| 2014 | **Mitros & Mehta** (edX) | Forum discussion drives more learning than long lecture videos |
| 2018 | **Brunskill** (Stanford) | RL personalization (Thompson Sampling) lifts retention ~20% |
| 2019 | **Reich & Ruipérez-Valiente** | "MOOC pivot" - industry moved from B2C free to B2B certification |

## 4. Lessons for HaiEduTech 2026

1. Treat the **5% completers** as your real product - design retention loops for them.
2. Use **Kizilcec's four clusters** to send targeted interventions (different nudges per cluster).
3. **Short videos** (<10 min) + active checks beat hour-long lectures.
4. **Cohort dashboards** weekly, not aggregate funnels - the average hides everything.
5. Combine **B2C reach** with **B2B certification** revenue for sustainability.

## 5. Reading List

- Reich (2014) - *Rebooting MOOC research* (Science)
- Kizilcec et al. (2013) - *Deconstructing disengagement*
- Reich & Ruipérez-Valiente (2019) - *The MOOC pivot* (Science)`,
        code: `# K-means style assignment of learners into Kizilcec's 4 behavioral clusters
def classify(learner):
    v = learner["video_pct"]
    a = learner["assignment_pct"]
    if v > 0.6 and a > 0.6:
        return "Completing"
    if v > 0.6 and a < 0.2:
        return "Auditing"
    if 0.2 < v < 0.6 and a < 0.4:
        return "Disengaging"
    return "Sampling"

learners = [
    {"id": "u1", "video_pct": 0.9, "assignment_pct": 0.85},
    {"id": "u2", "video_pct": 0.8, "assignment_pct": 0.05},
    {"id": "u3", "video_pct": 0.4, "assignment_pct": 0.10},
    {"id": "u4", "video_pct": 0.1, "assignment_pct": 0.00},
]

for l in learners:
    print(l["id"], "→", classify(l))`,
        codeLanguage: "python",
        exercise:
          "Phân tích log của 20 học viên trên HaiEduTech, chia về 4 cụm Kizilcec và đề xuất 1 chiến lược can thiệp cho mỗi cụm.",
        exerciseEn:
          "Take logs of 20 HaiEduTech learners, classify them into the 4 Kizilcec clusters, and propose one intervention strategy per cluster.",
        quiz: [
          {
            question: "Tỉ lệ hoàn thành điển hình của một MOOC là?",
            options: ["~50%", "~30%", "~5-10%", "~90%"],
            answer: 2,
            explanation: "Reich (2014) báo cáo completion ~5-10% cho hầu hết MOOC mở.",
            questionEn: "What is a typical completion rate for a MOOC?",
            optionsEn: ["~50%", "~30%", "~5-10%", "~90%"],
            explanationEn: "Reich (2014) reported completion of ~5-10% for most open MOOCs.",
          },
          {
            question: "Kizilcec chia học viên MOOC thành bao nhiêu nhóm hành vi?",
            options: ["2", "4", "6", "8"],
            answer: 1,
            explanation: "Completing, Auditing, Disengaging, Sampling - 4 cụm hành vi.",
            questionEn: "How many behavior clusters did Kizilcec split MOOC learners into?",
            optionsEn: ["2", "4", "6", "8"],
            explanationEn: "Completing, Auditing, Disengaging, Sampling - 4 behavioral clusters.",
          },
          {
            question: "MOOC pivot (Reich & Ruipérez-Valiente 2019) chỉ điều gì?",
            options: [
              "MOOC chuyển từ B2C miễn phí sang B2B/credential trả phí",
              "MOOC chuyển sang chỉ học bằng video",
              "MOOC bỏ hoàn toàn",
              "MOOC thay bằng VR",
            ],
            answer: 0,
            explanation: "Ngành MOOC dịch chuyển sang model doanh nghiệp + chứng chỉ trả phí.",
            questionEn: "What does the 'MOOC pivot' (Reich & Ruipérez-Valiente 2019) refer to?",
            optionsEn: [
              "MOOCs shifting from free B2C to paid B2B/credentialing",
              "MOOCs shifting to video-only learning",
              "MOOCs being abandoned entirely",
              "MOOCs being replaced by VR",
            ],
            explanationEn: "The MOOC industry pivoted toward a corporate model plus paid certification.",
          },
          {
            question: "Ai là 2 giáo sư Stanford khởi xướng MOOC AI 2011?",
            options: [
              "Andrew Ng & Daphne Koller",
              "Sebastian Thrun & Peter Norvig",
              "Fei-Fei Li & Chris Manning",
              "Jeff Dean & Andrej Karpathy",
            ],
            answer: 1,
            explanation: "Thrun & Norvig dạy khoá AI 2011 với ~160k học viên, dẫn tới Udacity.",
            questionEn: "Which two Stanford professors launched the 2011 AI MOOC?",
            optionsEn: [
              "Andrew Ng & Daphne Koller",
              "Sebastian Thrun & Peter Norvig",
              "Fei-Fei Li & Chris Manning",
              "Jeff Dean & Andrej Karpathy",
            ],
            explanationEn: "Thrun & Norvig taught the 2011 AI course with ~160k learners, which led to Udacity.",
          },
        ],
      },
      // ---------- Lesson 4: MIT Open Learning + Mitra ----------
      {
        id: "edtech-gr-4",
        title: "MIT OpenCourseWare & 'Hole in the Wall' - học mở quy mô lớn",
        titleEn: "MIT OCW & 'Hole in the Wall' - Open Learning at Scale",
        level: 3,
        difficulty: "intermediate",
        theory: `## 🏛️ MIT OpenCourseWare (OCW) - 2001 mở đầu một kỷ nguyên

Năm 2001 MIT công bố **toàn bộ tài liệu khoá học** (slide, đề thi, ghi âm) miễn phí - một quyết định gây sốc ngành. Đến 2025 OCW có **2.500+ khoá**, **200 triệu lượt người dùng** từ 180 quốc gia.

\`\`\`
   ┌──────────────┐    ┌──────────────┐    ┌────────────────┐
   │ MIT OCW 2001 │ ─▶ │ Khan Acad.   │ ─▶ │ MOOCs 2011     │
   │ (open files) │    │  2008        │    │ (Coursera/edX) │
   └──────────────┘    └──────────────┘    └────────────────┘
                                              │
                                              ▼
                                       ┌────────────────┐
                                       │ HaiEduTech AI  │
                                       │ Tutor (2025+)  │
                                       └────────────────┘
\`\`\`

## 🕳️ "Hole in the Wall" - Sugata Mitra (1999, Newcastle Univ.)

Mitra đặt một máy tính trong **lỗ tường khu ổ chuột Delhi**, không hướng dẫn. Vài tháng sau, trẻ em tự dạy nhau dùng Internet bằng tiếng Anh - tạo ra khái niệm **Minimally Invasive Education (MIE)** và **SOLE - Self-Organised Learning Environment**.

## 🔑 5 nguyên tắc SOLE cho EdTech 2026

1. **Big Question** - bắt đầu bằng 1 câu hỏi khó, không có đáp án sẵn.
2. **Self-Organised Groups** - 4-5 em, không gán vai trò.
3. **Public Output** - phải trình bày kết quả công khai.
4. **Granny Cloud** - người lớn động viên, không sửa câu trả lời.
5. **Reflection** - 10 phút cuối tự đánh giá.

## 🎯 Hoạt động lớp học (50 phút) - chạy thử SOLE

\`\`\`
   0:00 - 0:05  Big Question (vd: "Vì sao AI có thể sai?")
   0:05 - 0:35  Học sinh tự tổ chức, dùng HaiEduTech Search
   0:35 - 0:45  Mỗi nhóm trình bày 2 phút
   0:45 - 0:50  Reflection: ghi 1 điều em đã sai trước đó
\`\`\`

## 📚 Đọc thêm

- 🔗 [MIT OCW](https://ocw.mit.edu)
- 🔗 [Mitra (2003) - Minimally Invasive Education](https://scholar.google.com/scholar?q=Sugata+Mitra+hole+in+the+wall+2003)
- 🔗 [SOLE Toolkit (TED Prize)](https://www.theschoolinthecloud.org)`,
        theoryEn: `## 1. MIT OpenCourseWare (2001) - The Spark

In 2001, MIT made the shocking decision to release **all** course materials - slides, exams, lecture recordings - for free under a Creative Commons license. The industry called it reckless. By 2025, **MIT OCW** hosts **2,500+ courses** with **200 million users** from 180 countries, and it inspired Khan Academy (2008), Coursera/edX (2011) and today's AI tutors.

\`\`\`
 MIT OCW 2001 ──▶ Khan Acad 2008 ──▶ MOOCs 2011 ──▶ AI Tutors 2025+
 (open files)      (free videos)      (interactive)    (1-on-1 dialogue)
\`\`\`

## 2. Sugata Mitra's "Hole in the Wall" (1999)

Mitra placed a computer in a **hole in the wall of a Delhi slum**, with no instructions. Within months, children - who had never seen a PC and didn't speak English - taught **each other** to browse the web. The experiment was replicated across India and Cambodia with the same result. From it came two ideas:

- **Minimally Invasive Education (MIE)** - children learn more when adults intervene less.
- **SOLE - Self-Organised Learning Environment** - a five-element classroom format.

## 3. The Five Elements of SOLE

| # | Element | Description |
|---|---------|-------------|
| 1 | **Big Question** | Open-ended, no quick answer (e.g. "Why can AI be wrong?") |
| 2 | **Self-Organised Groups** | Groups of 4-5, no assigned roles |
| 3 | **Public Output** | Each group presents back |
| 4 | **Granny Cloud** | Adults encourage, never correct |
| 5 | **Reflection** | Final 10 min - what did I get wrong before? |

## 4. A 50-Minute SOLE Plan

\`\`\`
0:00–0:05  Big Question announced
0:05–0:35  Self-organised work with internet access
0:35–0:45  2-min presentations per group
0:45–0:50  Written reflection
\`\`\`

## 5. Why It Still Works in the AI Era

LLMs are powerful but breed **passive consumption** if used wrongly. SOLE flips the dynamic: the AI is a *tool* the group queries, debates, and audits - not an oracle. Pair "Big Question" with a HaiEduTech AI search and you get the best of both: open inquiry + accurate information.

## 6. Reading List

- MIT OpenCourseWare - \`ocw.mit.edu\`
- Mitra (2003) - *Minimally Invasive Education*
- SOLE Toolkit - *The School in the Cloud* (TED Prize)`,
        code: `# SOLE session timer - run inside any HaiEduTech classroom
phases = [
    {"name": "Big Question",         "minutes": 5},
    {"name": "Self-Organised Work",  "minutes": 30},
    {"name": "Public Presentations", "minutes": 10},
    {"name": "Reflection",           "minutes": 5},
]

elapsed = 0
for p in phases:
    print(f"[{str(elapsed).zfill(2)}:00] ▶ {p['name']} ({p['minutes']} min)")
    elapsed += p["minutes"]
print(f"[{str(elapsed).zfill(2)}:00] ✓ Done")`,
        codeLanguage: "python",
        exercise:
          "Thiết kế 1 phiên SOLE 50 phút cho lớp HaiEduTech, đề ra 'Big Question' liên quan đến môn em đang dạy và tiêu chí chấm.",
        exerciseEn:
          "Design a 50-minute SOLE session for a HaiEduTech class with a 'Big Question' tied to your subject and a clear rubric.",
        quiz: [
          {
            question: "MIT OpenCourseWare ra mắt năm nào?",
            options: ["1995", "2001", "2008", "2012"],
            answer: 1,
            explanation: "MIT công bố toàn bộ tài liệu khoá học miễn phí năm 2001.",
            questionEn: "In what year did MIT OpenCourseWare launch?",
            optionsEn: ["1995", "2001", "2008", "2012"],
            explanationEn: "MIT released all its course materials for free in 2001.",
          },
          {
            question: "Thí nghiệm 'Hole in the Wall' do ai thực hiện?",
            options: ["Salman Khan", "Sugata Mitra", "Sebastian Thrun", "Benjamin Bloom"],
            answer: 1,
            explanation: "Sugata Mitra (NIIT, Newcastle Univ.) thực hiện thí nghiệm này từ 1999 tại Delhi.",
            questionEn: "Who conducted the 'Hole in the Wall' experiment?",
            optionsEn: ["Salman Khan", "Sugata Mitra", "Sebastian Thrun", "Benjamin Bloom"],
            explanationEn: "Sugata Mitra (NIIT, Newcastle Univ.) ran this experiment starting in 1999 in Delhi.",
          },
          {
            question: "5 nguyên tắc SOLE không bao gồm?",
            options: ["Big Question", "Self-Organised Groups", "Public Output", "Punishment for wrong answers"],
            answer: 3,
            explanation: "SOLE cấm trừng phạt; người lớn (Granny Cloud) chỉ động viên.",
            questionEn: "Which of these is NOT one of the 5 SOLE elements?",
            optionsEn: ["Big Question", "Self-Organised Groups", "Public Output", "Punishment for wrong answers"],
            explanationEn: "SOLE forbids punishment; adults (the Granny Cloud) only encourage.",
          },
          {
            question: "MIT OCW có khoảng bao nhiêu khoá học tính đến 2025?",
            options: ["~250", "~2.500", "~25.000", "~250.000"],
            answer: 1,
            explanation: "OCW công bố hơn 2.500 khoá học từ MIT.",
            questionEn: "About how many courses does MIT OCW host as of 2025?",
            optionsEn: ["~250", "~2,500", "~25,000", "~250,000"],
            explanationEn: "OCW has published more than 2,500 MIT courses.",
          },
        ],
      },
      // ---------- Lesson 5: OECD / UNESCO + AI ethics ----------
      {
        id: "edtech-gr-5",
        title: "OECD & UNESCO 2023-2025 - chính sách AI trong giáo dục",
        titleEn: "OECD & UNESCO 2023-2025 - Policy on AI in Education",
        level: 4,
        difficulty: "advanced",
        theory: `## 🌐 Ba văn bản phải đọc của EdTech làm chính sách

\`\`\`
   ┌─────────────────────────────┬──────┬────────────────────────────────────┐
   │ Văn bản                     │ Năm  │ Trọng tâm                          │
   ├─────────────────────────────┼──────┼────────────────────────────────────┤
   │ UNESCO AI & Education       │ 2021 │ Beijing Consensus, human-centred AI│
   │ OECD AI Recommendation      │ 2024 │ 5 nguyên tắc AI đáng tin cậy       │
   │ UNESCO GenAI Guidance       │ 2023 │ Khung dùng GenAI trong trường học  │
   └─────────────────────────────┴──────┴────────────────────────────────────┘
\`\`\`

## 🔑 5 nguyên tắc AI đáng tin cậy (OECD)

1. **Inclusive growth, sustainable development & well-being**
2. **Human-centred values & fairness**
3. **Transparency & explainability**
4. **Robustness, security & safety**
5. **Accountability**

## 🛡️ Khung 4 cấp dùng GenAI trong lớp (UNESCO 2023)

\`\`\`
   Mức 1: Cấm hoàn toàn         (trẻ < 13, không giám sát)
   Mức 2: Cho phép có hướng dẫn (13-15, có giáo viên kèm)
   Mức 3: Dùng tự do có rubric  (16-18, học sinh tự đánh giá AI)
   Mức 4: Đồng sáng tạo         (đại học, kết hợp AI thành đồng-tác-giả)
\`\`\`

## 🇻🇳 Áp dụng tại Việt Nam (HaiEduTech)

- **<13 tuổi:** chat AI có safety layer + log gửi phụ huynh.
- **13-15:** AI Tutor đi kèm rubric "AI nói đúng/sai chỗ nào?".
- **16-18:** dùng AI sửa essay, học sinh phải gửi cả prompt + diff.
- **Sinh viên:** đồng-tác-giả với AI, ghi rõ tỉ lệ AI vs người.

## 🎯 Hoạt động lớp học (60 phút) - "AI Audit"

\`\`\`
   ┌─────────────────────┐   ┌──────────────────────┐   ┌────────────────────┐
   │ 1. Mỗi nhóm chọn 1  │ ─▶│ 2. Hỏi AI 5 câu khó  │ ─▶│ 3. Cho điểm theo 5 │
   │    sản phẩm GenAI   │   │    có chủ ý lừa AI   │   │    nguyên tắc OECD │
   └─────────────────────┘   └──────────────────────┘   └────────────────────┘
\`\`\`

## 📚 Đọc thêm

- 🔗 [OECD AI Principles (2024 update)](https://oecd.ai/en/ai-principles)
- 🔗 [UNESCO - Guidance for GenAI in Education and Research (2023)](https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research)
- 🔗 [Beijing Consensus on AI and Education (2019)](https://unesdoc.unesco.org/ark:/48223/pf0000368303)`,
        theoryEn: `## 1. Three Must-Read Policy Documents

| Document | Year | Focus |
|----------|------|-------|
| **UNESCO - AI & Education (Beijing Consensus)** | 2019/2021 | Human-centred AI principles for education |
| **OECD AI Recommendation** (updated) | 2024 | Five principles of trustworthy AI |
| **UNESCO GenAI Guidance for Schools** | 2023 | Practical framework for ChatGPT-era classrooms |

Together they form the **policy stack** every EdTech team needs to align with.

## 2. OECD's Five Trustworthy-AI Principles

1. **Inclusive growth, sustainable development & well-being** - AI must benefit people and the planet.
2. **Human-centred values & fairness** - respect human rights, diversity and the rule of law.
3. **Transparency & explainability** - users must understand AI decisions affecting them.
4. **Robustness, security & safety** - systems must function safely throughout their lifecycle.
5. **Accountability** - actors are responsible for the AI systems they build and deploy.

## 3. UNESCO's 4-Tier GenAI Usage Framework (2023)

\`\`\`
 Tier 1: Fully restricted     (children <13, unsupervised)
 Tier 2: Guided use           (13-15, with a teacher)
 Tier 3: Independent + rubric (16-18, students audit AI)
 Tier 4: Co-creation          (university, AI as co-author)
\`\`\`

## 4. Applying It in Vietnam (HaiEduTech)

| Age | Implementation |
|-----|----------------|
| **<13** | Chat behind a safety layer + parent activity log |
| **13-15** | AI Tutor paired with rubric: "Where is the AI right / wrong?" |
| **16-18** | Free essay editing, but students submit **prompt + diff** |
| **University** | Co-authorship allowed with declared AI percentage |

## 5. The "AI Audit" Classroom Activity (60 min)

1. Each group picks a real GenAI product (ChatGPT, Gemini, Claude…).
2. They ask 5 deliberately hard / tricky questions.
3. They score the answers 1-5 on each of the 5 OECD principles.
4. They debate which principle the product violated most.

This turns students from passive AI consumers into **critical evaluators** - exactly what UNESCO and OECD want from 21st-century learners.

## 6. Reading List

- OECD AI Principles (2024 update) - \`oecd.ai/en/ai-principles\`
- UNESCO - Guidance for Generative AI in Education and Research (2023)
- Beijing Consensus on AI and Education (UNESCO, 2019)`,
        code: `# Score a GenAI product against the OECD 5 principles
PRINCIPLES = [
    "inclusive_growth",
    "human_centred_fairness",
    "transparency",
    "robustness_safety",
    "accountability",
]

def audit(product: str, scores: dict[str, int]) -> dict:
    assert set(scores) == set(PRINCIPLES), "Missing principle"
    total = sum(scores.values())
    grade = "A" if total >= 22 else "B" if total >= 18 else "C" if total >= 14 else "D"
    return {"product": product, "total": total, "grade": grade, "scores": scores}

print(audit("HaiEduTech AI Coach", {
    "inclusive_growth": 5,
    "human_centred_fairness": 5,
    "transparency": 4,
    "robustness_safety": 5,
    "accountability": 5,
}))`,
        codeLanguage: "python",
        exercise:
          "Chọn 1 chatbot (ChatGPT, Gemini, Claude) và chấm điểm 5 nguyên tắc OECD trên thang 1-5, viết 1 đoạn lý giải mỗi điểm.",
        exerciseEn:
          "Pick one chatbot (ChatGPT, Gemini, Claude) and score it 1-5 against the 5 OECD principles, with a written justification each.",
        quiz: [
          {
            question: "OECD AI Recommendation liệt kê bao nhiêu nguyên tắc cốt lõi?",
            options: ["3", "5", "7", "10"],
            answer: 1,
            explanation: "5 nguyên tắc: inclusive growth, human-centred values, transparency, robustness, accountability.",
            questionEn: "How many core principles does the OECD AI Recommendation list?",
            optionsEn: ["3", "5", "7", "10"],
            explanationEn: "5 principles: inclusive growth, human-centred values, transparency, robustness, accountability.",
          },
          {
            question: "UNESCO GenAI Guidance (2023) khuyến nghị độ tuổi tối thiểu dùng chatbot AI không giám sát là?",
            options: ["8", "10", "13", "16"],
            answer: 2,
            explanation: "UNESCO khuyến nghị ngưỡng 13 tuổi - phù hợp COPPA/GDPR-K.",
            questionEn: "What minimum age does UNESCO's GenAI Guidance (2023) recommend for unsupervised AI chatbot use?",
            optionsEn: ["8", "10", "13", "16"],
            explanationEn: "UNESCO recommends a threshold of age 13 - aligned with COPPA/GDPR-K.",
          },
          {
            question: "Beijing Consensus on AI and Education do tổ chức nào ban hành?",
            options: ["OECD", "UNESCO", "World Bank", "WTO"],
            answer: 1,
            explanation: "UNESCO tổ chức hội nghị Bắc Kinh 2019 và ban hành consensus này.",
            questionEn: "Which organization issued the Beijing Consensus on AI and Education?",
            optionsEn: ["OECD", "UNESCO", "World Bank", "WTO"],
            explanationEn: "UNESCO held the 2019 Beijing conference and issued this consensus.",
          },
          {
            question: "Nguyên tắc 'transparency & explainability' yêu cầu điều gì?",
            options: [
              "Công khai mã nguồn AI",
              "Giải thích được cách AI ra quyết định",
              "AI phải miễn phí",
              "AI phải chạy on-device",
            ],
            answer: 1,
            explanation: "OECD yêu cầu AI giải thích được quyết định để con người kiểm tra.",
            questionEn: "What does the 'transparency & explainability' principle require?",
            optionsEn: [
              "Making the AI's source code public",
              "Being able to explain how the AI reaches its decisions",
              "The AI must be free of charge",
              "The AI must run on-device",
            ],
            explanationEn: "OECD requires AI decisions to be explainable so humans can audit them.",
          },
        ],
      },
    ],
  },
];
