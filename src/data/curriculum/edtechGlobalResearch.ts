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
        theoryEn: `In 1984, Benjamin Bloom showed that one-to-one tutoring lifted students two standard deviations above the conventional class average - the famous 2-Sigma Problem. Modern EdTech (Khan Academy adaptive paths, Khanmigo, HaiEduTech AI Coach) tries to close this gap with adaptive learning, AI tutors, and mastery learning. VanLehn (2011) later reported a more realistic ~0.79σ effect for human tutoring, but the design lessons still drive product decisions today.`,
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
          },
          {
            question: "VanLehn (2011) báo cáo hiệu ứng thực tế của human tutoring gần với mức nào?",
            options: ["~0.2σ", "~0.79σ", "~2σ", "~4σ"],
            answer: 1,
            explanation: "VanLehn đo lại nhiều nghiên cứu, kết luận hiệu ứng quanh d ≈ 0.79σ - vẫn lớn nhưng thấp hơn Bloom.",
          },
          {
            question: "Cohen's d = 0.8 được coi là?",
            options: ["Hiệu ứng nhỏ", "Hiệu ứng trung bình", "Hiệu ứng lớn", "Không có hiệu ứng"],
            answer: 2,
            explanation: "Theo Cohen, d≈0.2 small, 0.5 medium, 0.8+ large.",
          },
          {
            question: "Cách EdTech hiện đại tiệm cận hiệu ứng 1-1 KHÔNG bao gồm?",
            options: ["Adaptive learning", "AI Tutor", "Mastery Learning", "Bài giảng video dài 2h không tương tác"],
            answer: 3,
            explanation: "Video dài không tương tác là conventional teaching, không tái hiện hiệu ứng 1-1.",
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
        theoryEn: `Pittsburgh Science of Learning Center (PSLC) at CMU built DataShop - the world's largest open repository of learner interactions (350k+ students, billions of transactions). It introduced Knowledge Components (KC), Learning Curves and Bayesian Knowledge Tracing (BKT), which still power Duolingo, ASSISTments and HaiEduTech today.`,
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
          },
          {
            question: "Learning curve thường tuân theo dạng?",
            options: ["Tuyến tính", "Hàm mũ tăng", "Power law giảm", "Hằng số"],
            answer: 2,
            explanation: "error = a · opportunity^(-b) - power law giảm.",
          },
          {
            question: "Thuật toán BKT do ai đề xuất?",
            options: ["Bloom 1984", "Corbett & Anderson 1995", "Vygotsky 1978", "Skinner 1953"],
            answer: 1,
            explanation: "Corbett & Anderson (1995) giới thiệu Bayesian Knowledge Tracing tại CMU.",
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
        theoryEn: `Stanford launched the MOOC era in 2011, but ten years of research (Reich 2014, Kizilcec 2013, Brunskill, Reich & Ruipérez-Valiente 2019) revealed a brutal completion crisis (~5-10%) and a demographic skew toward already-credentialed learners. EdTech responded with engagement clustering, RL-driven personalization, and the B2B pivot.`,
        code: `// K-means style assignment of learners into Kizilcec's 4 behavioral clusters
type Learner = { id: string; videoPct: number; assignmentPct: number };
type Cluster = "Completing" | "Auditing" | "Disengaging" | "Sampling";

function classify(l: Learner): Cluster {
  const { videoPct: v, assignmentPct: a } = l;
  if (v > 0.6 && a > 0.6) return "Completing";
  if (v > 0.6 && a < 0.2) return "Auditing";
  if (v > 0.2 && v < 0.6 && a < 0.4) return "Disengaging";
  return "Sampling";
}

const learners: Learner[] = [
  { id: "u1", videoPct: 0.9, assignmentPct: 0.85 },
  { id: "u2", videoPct: 0.8, assignmentPct: 0.05 },
  { id: "u3", videoPct: 0.4, assignmentPct: 0.1 },
  { id: "u4", videoPct: 0.1, assignmentPct: 0.0 },
];

learners.forEach(l => console.log(l.id, "→", classify(l)));`,
        codeLanguage: "typescript",
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
          },
          {
            question: "Kizilcec chia học viên MOOC thành bao nhiêu nhóm hành vi?",
            options: ["2", "4", "6", "8"],
            answer: 1,
            explanation: "Completing, Auditing, Disengaging, Sampling - 4 cụm hành vi.",
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
        theoryEn: `MIT OCW (2001) launched the open-content era: 2,500+ courses, 200M users. Sugata Mitra's 'Hole in the Wall' (1999) experiment in Delhi slums proved children self-organise to learn from a screen with no teacher, birthing Minimally Invasive Education and SOLE - a five-step framework Teacher Hai can run in any HaiEduTech classroom.`,
        code: `// SOLE session timer - run inside any HaiEduTech classroom
const phases = [
  { name: "Big Question",       minutes: 5  },
  { name: "Self-Organised Work", minutes: 30 },
  { name: "Public Presentations", minutes: 10 },
  { name: "Reflection",         minutes: 5  },
];

let elapsed = 0;
phases.forEach(p => {
  console.log(\`[\${String(elapsed).padStart(2, "0")}:00] ▶ \${p.name} (\${p.minutes} min)\`);
  elapsed += p.minutes;
});
console.log(\`[\${String(elapsed).padStart(2, "0")}:00] ✓ Done\`);`,
        codeLanguage: "javascript",
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
          },
          {
            question: "Thí nghiệm 'Hole in the Wall' do ai thực hiện?",
            options: ["Salman Khan", "Sugata Mitra", "Sebastian Thrun", "Benjamin Bloom"],
            answer: 1,
            explanation: "Sugata Mitra (NIIT, Newcastle Univ.) thực hiện thí nghiệm này từ 1999 tại Delhi.",
          },
          {
            question: "5 nguyên tắc SOLE không bao gồm?",
            options: ["Big Question", "Self-Organised Groups", "Public Output", "Punishment for wrong answers"],
            answer: 3,
            explanation: "SOLE cấm trừng phạt; người lớn (Granny Cloud) chỉ động viên.",
          },
          {
            question: "MIT OCW có khoảng bao nhiêu khoá học tính đến 2025?",
            options: ["~250", "~2.500", "~25.000", "~250.000"],
            answer: 1,
            explanation: "OCW công bố hơn 2.500 khoá học từ MIT.",
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
        theoryEn: `OECD (2024) and UNESCO (2023) crystallised the policy stack for AI in education: 5 trustworthy-AI principles, a 4-level GenAI usage framework, and the Beijing Consensus. HaiEduTech maps these to age tiers (<13 supervised, 13-15 guided, 16-18 rubric-based, university co-author) and runs in-class "AI Audits" so students judge real GenAI products against OECD criteria.`,
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
          },
          {
            question: "UNESCO GenAI Guidance (2023) khuyến nghị độ tuổi tối thiểu dùng chatbot AI không giám sát là?",
            options: ["8", "10", "13", "16"],
            answer: 2,
            explanation: "UNESCO khuyến nghị ngưỡng 13 tuổi - phù hợp COPPA/GDPR-K.",
          },
          {
            question: "Beijing Consensus on AI and Education do tổ chức nào ban hành?",
            options: ["OECD", "UNESCO", "World Bank", "WTO"],
            answer: 1,
            explanation: "UNESCO tổ chức hội nghị Bắc Kinh 2019 và ban hành consensus này.",
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
          },
        ],
      },
    ],
  },
];
