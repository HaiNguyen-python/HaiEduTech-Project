import type { ExtendedProgrammingModule } from "./types";

/**
 * EdTech Product Landscape - 6 bilingual lessons mapping the world's most used
 * EdTech products to the concrete technology stacks behind them.
 */
export const edtechProductLandscapeModules: ExtendedProgrammingModule[] = [
  {
    id: "edtech-product-landscape-2026",
    title: "Bản đồ sản phẩm EdTech thế giới và công nghệ phía sau",
    titleEn: "World EdTech Products and the Technology Behind Them",
    icon: "🌍",
    color: "from-indigo-500 to-emerald-500",
    description:
      "6 bài học mổ xẻ các sản phẩm EdTech lớn nhất thế giới (Duolingo, Khan Academy, Coursera, Quizlet, Anki, Google Classroom, Photomath, ChatGPT Study Mode...) và kiến trúc công nghệ thật sự chạy bên dưới.",
    descriptionEn:
      "6 lessons dissecting the world's biggest EdTech products (Duolingo, Khan Academy, Coursera, Quizlet, Anki, Google Classroom, Photomath, ChatGPT Study Mode and more) and the real technical architecture running underneath.",
    course: "edtech",
    lessons: [
      {
        id: "edtech-landscape-1",
        title: "Toàn cảnh thị trường EdTech 2026: ai đang dẫn đầu",
        titleEn: "The 2026 EdTech Landscape: Who Leads and Why",
        level: 1,
        difficulty: "beginner",
        theory: `## 1. 🗺️ Sáu nhóm sản phẩm chính

| Nhóm | Sản phẩm tiêu biểu | Mô hình doanh thu |
|---|---|---|
| Học ngôn ngữ | Duolingo, Babbel, Busuu, HelloTalk | Freemium + quảng cáo |
| Khoá học mở (MOOC) | Coursera, edX, Udemy, Khan Academy | Bán khoá / bằng cấp / phi lợi nhuận |
| Ôn tập và trí nhớ | Anki, Quizlet, Memrise, RemNote | Freemium / mã nguồn mở |
| Lớp học và quản trị | Google Classroom, Canvas, Moodle, Schoology | Bán cho trường (B2B) |
| Giải bài bằng AI | Photomath, Symbolab, Khanmigo, ChatGPT Study Mode | Thuê bao |
| Học qua trò chơi | Kahoot, Blooket, Prodigy, Scratch | Freemium / tài trợ |

## 2. 📈 Con số cần nhớ

- Duolingo: hơn 100 triệu người dùng tháng, hơn 40 ngôn ngữ.
- Khan Academy: phi lợi nhuận, phủ toán từ mẫu giáo đến đại học, dịch ra 50+ ngôn ngữ.
- Moodle: mã nguồn mở PHP, chạy trên hàng trăm nghìn cơ sở giáo dục.
- Anki: mã nguồn mở, thuật toán lặp lại ngắt quãng là chuẩn de-facto cho trí nhớ.

## 3. 🧩 Vì sao họ thắng

1. **Vòng lặp ngắn**: mỗi thao tác của học sinh đều có phản hồi tức thì.
2. **Dữ liệu là tài sản**: mọi lần trả lời đúng/sai đều được ghi lại để cá nhân hoá.
3. **Chi phí biên gần 0**: một bài học phục vụ được 1 hay 10 triệu người như nhau.
4. **Kênh phân phối**: Google Classroom đi kèm Google Workspace, Duolingo đi bằng app store.

## 4. 🛠️ Bài học cho sản phẩm Việt Nam

- Không cạnh tranh bề rộng, cạnh tranh **độ sâu ngữ cảnh địa phương** (IELTS, HSK, thi THPT).
- Dùng hạ tầng có sẵn (Supabase, LLM API) thay vì tự xây từ đầu.
- Ưu tiên phần học sinh chạm hằng ngày: luyện tập, phản hồi, tiến độ.

## 5. 🛑 Sai lầm thường gặp

1. Sao chép giao diện Duolingo mà không có dữ liệu để cá nhân hoá.
2. Xây LMS đầy đủ trước khi có 100 học sinh thật.
3. Bỏ tiền vào nội dung video dài trong khi học sinh chỉ xem 3 phút đầu.`,
        theoryEn: `## 1. 🗺️ Six main product categories

| Category | Flagship products | Revenue model |
|---|---|---|
| Language learning | Duolingo, Babbel, Busuu, HelloTalk | Freemium + ads |
| Open courses (MOOC) | Coursera, edX, Udemy, Khan Academy | Course/degree sales, non-profit |
| Review and memory | Anki, Quizlet, Memrise, RemNote | Freemium / open source |
| Classroom and admin | Google Classroom, Canvas, Moodle, Schoology | B2B sales to schools |
| AI problem solving | Photomath, Symbolab, Khanmigo, ChatGPT Study Mode | Subscription |
| Game-based learning | Kahoot, Blooket, Prodigy, Scratch | Freemium / grants |

## 2. 📈 Numbers worth remembering

- Duolingo: over 100 million monthly users across 40+ languages.
- Khan Academy: non-profit, K-12 through college maths, translated into 50+ languages.
- Moodle: open-source PHP, running in hundreds of thousands of institutions.
- Anki: open source, its spaced-repetition scheduler is the de-facto memory standard.

## 3. 🧩 Why they win

1. **Short loops**: every learner action gets immediate feedback.
2. **Data as an asset**: every right/wrong answer is stored and used for personalisation.
3. **Near-zero marginal cost**: one lesson serves 1 or 10 million learners equally.
4. **Distribution**: Google Classroom rides Google Workspace, Duolingo rides the app stores.

## 4. 🛠️ Lessons for a Vietnamese product

- Do not compete on breadth, compete on **local context depth** (IELTS, HSK, national exam).
- Reuse existing infrastructure (Supabase, LLM APIs) instead of building from scratch.
- Prioritise what students touch daily: practice, feedback, progress.

## 5. 🛑 Common mistakes

1. Copying Duolingo's UI without the data needed to personalise anything.
2. Building a full LMS before having 100 real students.
3. Investing in long video content when learners only watch the first 3 minutes.`,
        code: `# Rough unit economics of an EdTech feature (per active learner / month)
def monthly_cost(llm_calls: int, tokens_per_call: int, price_per_mtok: float,
                 storage_gb: float, storage_price: float = 0.021) -> float:
    llm = llm_calls * tokens_per_call / 1_000_000 * price_per_mtok
    return round(llm + storage_gb * storage_price, 3)

# AI tutor: 60 chats/month, ~2k tokens each, $0.30 per 1M tokens
print(monthly_cost(60, 2000, 0.30, 0.05))   # ~0.037 USD -> scalable
# Heavy essay grading: 30 essays, 12k tokens each, $3.00 per 1M tokens
print(monthly_cost(30, 12000, 3.00, 0.2))   # ~1.084 USD -> needs a paid tier`,
        codeLanguage: "python",
        exercise:
          "Chọn 3 sản phẩm EdTech thế giới bạn hay dùng. Với mỗi sản phẩm, viết ra: nhóm sản phẩm, mô hình doanh thu, vòng lặp phản hồi chính, và một tính năng bạn có thể áp dụng cho học sinh Việt Nam.",
        exerciseEn:
          "Pick 3 world EdTech products you use. For each, write down: its category, revenue model, main feedback loop, and one feature you could adapt for Vietnamese learners.",
        quiz: [
          {
            question: "Sản phẩm nào là mã nguồn mở và trở thành chuẩn de-facto cho lặp lại ngắt quãng?",
            options: ["Quizlet", "Anki", "Kahoot", "Coursera"],
            answer: 1,
            explanation: "Anki mã nguồn mở, thuật toán lịch ôn của nó được rất nhiều app khác học theo.",
            questionEn: "Which product is open source and became the de-facto spaced-repetition standard?",
            optionsEn: ["Quizlet", "Anki", "Kahoot", "Coursera"],
            explanationEn: "Anki is open source and its scheduling algorithm is copied by many other apps.",
          },
          {
            question: "Lợi thế phân phối lớn nhất của Google Classroom là gì?",
            options: [
              "Đi kèm sẵn với Google Workspace của trường",
              "Quảng cáo trên TV",
              "Giá rẻ hơn Moodle",
              "Có nhiều trò chơi",
            ],
            answer: 0,
            explanation: "Trường đã dùng Gmail/Drive nên bật Classroom gần như không tốn công triển khai.",
            questionEn: "What is Google Classroom's biggest distribution advantage?",
            optionsEn: [
              "It ships with the school's existing Google Workspace",
              "TV advertising",
              "Cheaper than Moodle",
              "It has more games",
            ],
            explanationEn: "Schools already use Gmail/Drive, so enabling Classroom costs almost no rollout effort.",
          },
          {
            question: "Vì sao chi phí biên của sản phẩm EdTech số gần bằng 0?",
            options: [
              "Vì nội dung số phục vụ thêm một người gần như không tốn thêm chi phí",
              "Vì giáo viên làm miễn phí",
              "Vì máy chủ miễn phí",
              "Vì không cần nội dung",
            ],
            answer: 0,
            explanation: "Chi phí lớn nằm ở lần sản xuất đầu tiên, phục vụ thêm người dùng chỉ tốn băng thông nhỏ.",
            questionEn: "Why is the marginal cost of a digital EdTech product near zero?",
            optionsEn: [
              "Serving one extra learner adds almost no cost to digital content",
              "Teachers work for free",
              "Servers are free",
              "No content is needed",
            ],
            explanationEn: "The cost sits in first production; each extra learner only adds small bandwidth.",
          },
          {
            question: "Chiến lược hợp lý nhất cho một sản phẩm EdTech Việt Nam mới?",
            options: [
              "Đi sâu vào ngữ cảnh địa phương như IELTS, HSK, thi THPT",
              "Làm 40 ngôn ngữ ngay từ đầu",
              "Xây LMS đầy đủ trước khi có học sinh",
              "Chỉ làm video dài",
            ],
            answer: 0,
            explanation: "Độ sâu ngữ cảnh địa phương là chỗ các ông lớn toàn cầu phục vụ kém nhất.",
            questionEn: "What is the most sensible strategy for a new Vietnamese EdTech product?",
            optionsEn: [
              "Go deep on local context like IELTS, HSK, the national exam",
              "Launch 40 languages immediately",
              "Build a full LMS before having students",
              "Only produce long videos",
            ],
            explanationEn: "Local context depth is exactly where global giants serve users worst.",
          },
          {
            question: "Moodle được xây bằng công nghệ nào?",
            options: ["PHP mã nguồn mở", "Swift", "Rust", "COBOL"],
            answer: 0,
            explanation: "Moodle là ứng dụng PHP mã nguồn mở, thường chạy cùng MySQL/PostgreSQL.",
            questionEn: "What technology is Moodle built on?",
            optionsEn: ["Open-source PHP", "Swift", "Rust", "COBOL"],
            explanationEn: "Moodle is an open-source PHP application, usually paired with MySQL/PostgreSQL.",
          },
        ],
      },
      {
        id: "edtech-landscape-2",
        title: "Duolingo: gamification, A/B test và mô hình học máy phía sau",
        titleEn: "Duolingo: Gamification, A/B Testing and the ML Behind It",
        level: 2,
        difficulty: "beginner",
        theory: `## 1. 🦉 Cỗ máy giữ chân người dùng

Duolingo không thắng nhờ nội dung hiếm, họ thắng nhờ **thói quen**:

- Streak (chuỗi ngày học) + Streak Freeze để giảm cảm giác mất mát.
- Thông báo đúng khung giờ người dùng thường học.
- Leaderboard theo giải đấu (Bronze -> Diamond) tạo cạnh tranh nhẹ.
- Bài học 3-5 phút, luôn kết thúc bằng cảm giác thắng.

## 2. 🧠 Công nghệ lõi: Half-Life Regression

Duolingo công bố mô hình **HLR** để dự đoán xác suất người học còn nhớ một từ:

\`\`\`
p_nhớ = 2^(-Δt / h)
Δt = thời gian từ lần ôn cuối
h  = "chu kỳ bán rã trí nhớ", học từ dữ liệu (số lần đúng, số lần sai, đặc trưng từ)
\`\`\`

Khi p_nhớ tụt xuống dưới ngưỡng (khoảng 0.5), từ đó được đưa lại vào bài ôn.

## 3. 🔬 Văn hoá A/B test

- Gần như mọi thay đổi giao diện đều chạy thí nghiệm có nhóm đối chứng.
- Chỉ số chính: **DAU giữ chân ngày 1 / ngày 7**, không phải số bài học hoàn thành.
- Thí nghiệm nổi tiếng: thay đổi cách hiển thị streak làm tăng giữ chân hai chữ số phần trăm.

## 4. 🏗️ Kiến trúc kỹ thuật (mức khái quát)

| Lớp | Công nghệ điển hình |
|---|---|
| App | Swift (iOS), Kotlin (Android), React web |
| Backend | Python, dịch vụ trên AWS |
| Dữ liệu | Kafka -> kho dữ liệu -> mô hình HLR/Birdbrain |
| Chấm nói | Nhận dạng giọng nói + chấm phát âm |
| AI mới | LLM cho Duolingo Max (Roleplay, Explain My Answer) |

## 5. 🛑 Sai lầm khi bắt chước

1. Sao chép streak nhưng không có nội dung đủ để học mỗi ngày.
2. Gamification nặng làm học sinh chạy theo điểm thay vì hiểu bài.
3. Không đo lường: thêm huy hiệu mà không biết nó có tăng giữ chân hay không.`,
        theoryEn: `## 1. 🦉 The retention machine

Duolingo does not win on rare content, it wins on **habit**:

- Streaks plus Streak Freeze to soften loss aversion.
- Notifications timed to when each user usually studies.
- League-based leaderboards (Bronze to Diamond) for light competition.
- 3-5 minute lessons that always end on a win.

## 2. 🧠 Core technology: Half-Life Regression

Duolingo published **HLR**, a model predicting the probability a learner still remembers a word:

\`\`\`
p_recall = 2^(-Δt / h)
Δt = time since last review
h  = memory "half-life", learned from data (correct count, error count, word features)
\`\`\`

When p_recall drops below a threshold (around 0.5), the word is scheduled for review again.

## 3. 🔬 A/B testing culture

- Nearly every UI change ships behind a controlled experiment.
- Primary metric: **day-1 / day-7 retention**, not lessons completed.
- Famous experiment: redesigning the streak display lifted retention by double-digit percent.

## 4. 🏗️ Technical architecture (high level)

| Layer | Typical technology |
|---|---|
| Apps | Swift (iOS), Kotlin (Android), React web |
| Backend | Python services on AWS |
| Data | Kafka -> data warehouse -> HLR/Birdbrain models |
| Speech | Speech recognition plus pronunciation scoring |
| Newer AI | LLMs powering Duolingo Max (Roleplay, Explain My Answer) |

## 5. 🛑 Mistakes when copying it

1. Copying streaks without enough content to justify daily study.
2. Heavy gamification that makes students chase points instead of understanding.
3. No measurement: adding badges without knowing whether retention moved.`,
        code: `import math

def half_life_recall(days_since_review: float, half_life_days: float) -> float:
    """Duolingo-style recall probability."""
    return 2 ** (-days_since_review / half_life_days)

def estimate_half_life(correct: int, wrong: int, base: float = 1.0) -> float:
    """Simplified HLR: more correct answers -> longer half-life."""
    return base * 2 ** (0.6 * correct - 1.2 * wrong)

h = estimate_half_life(correct=4, wrong=1)
print(round(h, 2))                                   # ~3.5 days
print(round(half_life_recall(2, h), 2))              # still remembered
print(round(half_life_recall(10, h), 2))             # below 0.5 -> schedule review`,
        codeLanguage: "python",
        exercise:
          "Cài đặt hàm chọn 10 từ cần ôn hôm nay từ danh sách 100 từ, dùng công thức HLR ở trên và chọn những từ có p_nhớ thấp nhất. Sau đó giải thích vì sao không nên chọn các từ có p_nhớ quá thấp (đã quên hẳn).",
        exerciseEn:
          "Write a function that picks today's 10 review words from a list of 100 using the HLR formula above, choosing the lowest recall probabilities. Then explain why words with extremely low recall (fully forgotten) may need re-teaching instead of review.",
        quiz: [
          {
            question: "Half-Life Regression dự đoán điều gì?",
            options: [
              "Xác suất người học còn nhớ một từ",
              "Tốc độ tải trang",
              "Doanh thu quảng cáo",
              "Số bạn bè trong app",
            ],
            answer: 0,
            explanation: "HLR ước lượng chu kỳ bán rã trí nhớ để xếp lịch ôn tập.",
            questionEn: "What does Half-Life Regression predict?",
            optionsEn: [
              "The probability a learner still recalls a word",
              "Page load speed",
              "Ad revenue",
              "Number of friends in the app",
            ],
            explanationEn: "HLR estimates memory half-life in order to schedule reviews.",
          },
          {
            question: "Streak Freeze phục vụ mục đích tâm lý nào?",
            options: [
              "Giảm cảm giác mất mát khi lỡ một ngày",
              "Tăng độ khó bài học",
              "Giảm chi phí máy chủ",
              "Chặn gian lận",
            ],
            answer: 0,
            explanation: "Nó bảo vệ chuỗi ngày học nên người dùng không bỏ hẳn sau một ngày lỡ.",
            questionEn: "What psychological purpose does Streak Freeze serve?",
            optionsEn: [
              "Softening loss aversion when a day is missed",
              "Making lessons harder",
              "Cutting server cost",
              "Blocking cheating",
            ],
            explanationEn: "It protects the streak so users do not quit entirely after one missed day.",
          },
          {
            question: "Chỉ số chính Duolingo dùng để đánh giá thí nghiệm là gì?",
            options: ["Giữ chân ngày 1 và ngày 7", "Số dòng code", "Số ngôn ngữ", "Dung lượng app"],
            answer: 0,
            explanation: "Giữ chân là chỉ số dẫn dắt tăng trưởng dài hạn của sản phẩm học tập.",
            questionEn: "Which metric does Duolingo use to judge experiments?",
            optionsEn: ["Day-1 and day-7 retention", "Lines of code", "Number of languages", "App size"],
            explanationEn: "Retention is the leading indicator of long-term growth for a learning product.",
          },
          {
            question: "Trong công thức p = 2^(-Δt/h), tăng h sẽ làm gì?",
            options: [
              "Trí nhớ phai chậm hơn, ôn thưa hơn",
              "Trí nhớ phai nhanh hơn",
              "Không ảnh hưởng",
              "Xoá từ khỏi danh sách",
            ],
            answer: 0,
            explanation: "h là chu kỳ bán rã, h lớn nghĩa là từ được nhớ lâu hơn.",
            questionEn: "In p = 2^(-Δt/h), what happens when h increases?",
            optionsEn: [
              "Memory decays slower, reviews get further apart",
              "Memory decays faster",
              "No effect",
              "The word is deleted",
            ],
            explanationEn: "h is the half-life, so a larger h means the word is retained longer.",
          },
          {
            question: "Rủi ro lớn nhất của gamification nặng là gì?",
            options: [
              "Học sinh chạy theo điểm thay vì hiểu bài",
              "Server quá tải",
              "App quá nhẹ",
              "Không ai tải app",
            ],
            answer: 0,
            explanation: "Động lực ngoại sinh có thể lấn át động lực nội tại nếu thiết kế sai.",
            questionEn: "What is the biggest risk of heavy gamification?",
            optionsEn: [
              "Students chase points instead of understanding",
              "Server overload",
              "App too small",
              "Nobody downloads the app",
            ],
            explanationEn: "Extrinsic motivation can crowd out intrinsic motivation when designed badly.",
          },
        ],
      },
      {
        id: "edtech-landscape-3",
        title: "Khan Academy, Coursera, Moodle: hạ tầng nội dung và LMS",
        titleEn: "Khan Academy, Coursera, Moodle: Content Infrastructure and LMS",
        level: 2,
        difficulty: "intermediate",
        theory: `## 1. 🏫 Ba mô hình khác nhau

| Sản phẩm | Bản chất | Công nghệ nổi bật |
|---|---|---|
| Khan Academy | Phi lợi nhuận, luyện tập theo kỹ năng | Python/Go, Google Cloud, đồ thị kỹ năng, Khanmigo (LLM) |
| Coursera | Nền tảng khoá học của đại học | Scala/Java + React, video CDN, chấm bài đồng đẳng |
| Moodle | LMS mã nguồn mở tự cài | PHP + MySQL/PostgreSQL, plugin, chuẩn SCORM/LTI |

## 2. 🧭 Đồ thị kỹ năng của Khan Academy

Nội dung không phải danh sách phẳng, nó là **đồ thị phụ thuộc**:

\`\`\`
Cộng số nguyên -> Nhân số nguyên -> Phân số -> Tỉ lệ -> Phương trình bậc nhất
\`\`\`

Hệ thống chỉ mở kỹ năng mới khi các kỹ năng cha đạt mức thành thạo, và khi học sinh sai nhiều thì gợi ý quay lại nút cha.

## 3. 🎥 Hạ tầng video của MOOC

- Video được **transcode** ra nhiều độ phân giải (240p đến 1080p).
- Phát bằng HLS/DASH: chia video thành các đoạn vài giây, tự đổi chất lượng theo mạng.
- Phụ đề đa ngôn ngữ (WebVTT) vừa hỗ trợ tiếp cận vừa giúp tìm kiếm nội dung.
- CDN đặt bản sao gần người xem để giảm độ trễ.

## 4. 🔌 Chuẩn liên thông cần biết

- **LTI**: cho phép nhúng công cụ bên ngoài vào LMS và truyền điểm về.
- **SCORM / xAPI**: đóng gói và ghi lại hành vi học tập.
- **QTI**: chuẩn mô tả câu hỏi và đề thi.

Ba chuẩn này là lý do một trường có thể đổi LMS mà không mất toàn bộ nội dung.

## 5. 🛑 Sai lầm thường gặp

1. Lưu video trực tiếp trong cơ sở dữ liệu thay vì object storage + CDN.
2. Thiết kế nội dung phẳng, không có phụ thuộc kỹ năng nên không cá nhân hoá được.
3. Bỏ qua LTI khiến sản phẩm không bán được cho trường học.`,
        theoryEn: `## 1. 🏫 Three different models

| Product | Nature | Notable technology |
|---|---|---|
| Khan Academy | Non-profit, skill-based practice | Python/Go, Google Cloud, skill graph, Khanmigo (LLM) |
| Coursera | University course marketplace | Scala/Java + React, video CDN, peer grading |
| Moodle | Self-hosted open-source LMS | PHP + MySQL/PostgreSQL, plugins, SCORM/LTI standards |

## 2. 🧭 Khan Academy's skill graph

Content is not a flat list, it is a **dependency graph**:

\`\`\`
Integer addition -> Integer multiplication -> Fractions -> Ratios -> Linear equations
\`\`\`

New skills unlock only when parent skills reach mastery, and repeated errors push the learner back to the parent node.

## 3. 🎥 MOOC video infrastructure

- Videos are **transcoded** into multiple resolutions (240p to 1080p).
- Delivered via HLS/DASH: split into few-second segments with adaptive bitrate.
- Multilingual captions (WebVTT) serve both accessibility and content search.
- A CDN keeps copies close to viewers to cut latency.

## 4. 🔌 Interoperability standards to know

- **LTI**: embed external tools into an LMS and pass grades back.
- **SCORM / xAPI**: package content and record learning behaviour.
- **QTI**: standard format for questions and assessments.

These three standards are why a school can switch LMS without losing all its content.

## 5. 🛑 Common mistakes

1. Storing video blobs in the database instead of object storage plus a CDN.
2. Flat content design with no skill dependencies, making personalisation impossible.
3. Ignoring LTI, which blocks sales into schools.`,
        code: `# Skill-graph unlocking, the Khan Academy way
GRAPH = {
    "fractions": ["integer_mult"],
    "integer_mult": ["integer_add"],
    "ratios": ["fractions"],
    "linear_eq": ["ratios", "integer_mult"],
    "integer_add": [],
}

def unlocked(skill: str, mastery: dict, threshold: float = 0.8) -> bool:
    return all(mastery.get(p, 0) >= threshold for p in GRAPH[skill])

def next_skills(mastery: dict) -> list:
    return [s for s in GRAPH if mastery.get(s, 0) < 0.8 and unlocked(s, mastery)]

m = {"integer_add": 0.95, "integer_mult": 0.82, "fractions": 0.4}
print(next_skills(m))    # ['fractions'] -> ratios stays locked until fractions is mastered`,
        codeLanguage: "python",
        exercise:
          "Vẽ đồ thị kỹ năng cho một chủ đề bạn dạy (ví dụ IELTS Writing Task 1) với ít nhất 6 nút và quan hệ phụ thuộc, rồi cài đặt hàm gợi ý kỹ năng tiếp theo dựa trên mức thành thạo.",
        exerciseEn:
          "Draw a skill graph for a topic you teach (for example IELTS Writing Task 1) with at least 6 nodes and dependencies, then implement a function recommending the next skill from mastery levels.",
        quiz: [
          {
            question: "Chuẩn nào cho phép nhúng công cụ ngoài vào LMS và trả điểm về?",
            options: ["LTI", "HTTP", "JPEG", "SMTP"],
            answer: 0,
            explanation: "LTI là chuẩn liên thông công cụ học tập, gồm cả truyền điểm.",
            questionEn: "Which standard lets an external tool embed into an LMS and return grades?",
            optionsEn: ["LTI", "HTTP", "JPEG", "SMTP"],
            explanationEn: "LTI is the Learning Tools Interoperability standard, including grade passback.",
          },
          {
            question: "HLS/DASH giải quyết vấn đề gì?",
            options: [
              "Tự điều chỉnh chất lượng video theo tốc độ mạng",
              "Nén ảnh",
              "Mã hoá mật khẩu",
              "Sao lưu cơ sở dữ liệu",
            ],
            answer: 0,
            explanation: "Video được chia đoạn nhỏ nên trình phát đổi độ phân giải giữa chừng được.",
            questionEn: "What problem do HLS/DASH solve?",
            optionsEn: [
              "Adapting video quality to network speed",
              "Image compression",
              "Password hashing",
              "Database backup",
            ],
            explanationEn: "Video is segmented so the player can switch resolution mid-stream.",
          },
          {
            question: "Vì sao đồ thị kỹ năng quan trọng hơn danh sách bài phẳng?",
            options: [
              "Cho phép mở khoá và gợi ý ôn theo phụ thuộc kiến thức",
              "Giúp video nhẹ hơn",
              "Giảm số câu hỏi",
              "Tăng giá bán",
            ],
            answer: 0,
            explanation: "Biết nút cha nào yếu thì hệ thống mới quay lại đúng chỗ hổng kiến thức.",
            questionEn: "Why is a skill graph better than a flat lesson list?",
            optionsEn: [
              "It enables unlocking and remediation based on knowledge dependencies",
              "It makes videos smaller",
              "It reduces question count",
              "It raises the price",
            ],
            explanationEn: "Knowing which parent node is weak lets the system send learners to the real gap.",
          },
          {
            question: "Moodle chạy trên nền công nghệ nào?",
            options: ["PHP với MySQL/PostgreSQL", "Node.js với MongoDB", "Elixir", "Delphi"],
            answer: 0,
            explanation: "Moodle là ứng dụng PHP mã nguồn mở, hỗ trợ MySQL và PostgreSQL.",
            questionEn: "What stack does Moodle run on?",
            optionsEn: ["PHP with MySQL/PostgreSQL", "Node.js with MongoDB", "Elixir", "Delphi"],
            explanationEn: "Moodle is an open-source PHP application supporting MySQL and PostgreSQL.",
          },
          {
            question: "Cách lưu video đúng cho nền tảng học trực tuyến?",
            options: [
              "Object storage kèm CDN",
              "Lưu nhị phân trong bảng cơ sở dữ liệu",
              "Gửi qua email",
              "Chỉ để trên máy giáo viên",
            ],
            answer: 0,
            explanation: "Object storage rẻ, CDN đưa nội dung gần người xem và giảm tải máy chủ gốc.",
            questionEn: "What is the right way to store video for an online learning platform?",
            optionsEn: [
              "Object storage with a CDN",
              "Binary blobs inside database tables",
              "Email attachments",
              "Only on the teacher's laptop",
            ],
            explanationEn: "Object storage is cheap and a CDN brings content close to viewers, offloading origin servers.",
          },
        ],
      },
      {
        id: "edtech-landscape-4",
        title: "Anki, Quizlet, Memrise: khoa học trí nhớ thành sản phẩm",
        titleEn: "Anki, Quizlet, Memrise: Turning Memory Science into Product",
        level: 3,
        difficulty: "intermediate",
        theory: `## 1. 🧠 Từ đường cong quên tới thuật toán

Ebbinghaus chỉ ra trí nhớ phai theo hàm mũ. Lặp lại ngắt quãng chống lại điều đó bằng cách ôn **ngay trước khi quên**.

Ba thế hệ thuật toán:

| Thế hệ | Đại diện | Ý tưởng |
|---|---|---|
| SM-2 (1987) | Anki cổ điển, Mnemosyne | Hệ số dễ (ease factor) nhân dần khoảng cách |
| Học máy | Duolingo HLR | Hồi quy dự đoán chu kỳ bán rã |
| FSRS (2023+) | Anki hiện đại | Mô hình 3 thành phần: độ khó, độ bền, độ gợi nhớ |

## 2. ⚙️ SM-2 rút gọn

\`\`\`
Nếu điểm tự đánh giá q < 3: lặp lại trong ngày, interval = 1
Ngược lại: interval = 1, 6, rồi interval * EF
EF mới = EF + (0.1 - (5-q) * (0.08 + (5-q) * 0.02)), tối thiểu 1.3
\`\`\`

## 3. 🃏 Khác biệt sản phẩm

- **Anki**: mạnh về thuật toán và tuỳ biến, giao diện khô, cộng đồng chia sẻ bộ thẻ.
- **Quizlet**: mạnh về tốc độ tạo thẻ, chế độ chơi (Match, Test), học nhóm trong lớp.
- **Memrise**: nhấn mạnh video người bản xứ nói thật, ngữ cảnh đời thường.

## 4. 🏗️ Kiến trúc một hệ thẻ ghi nhớ

\`\`\`
Bảng cards(id, front, back, deck_id)
Bảng reviews(card_id, user_id, rating, reviewed_at, interval, ease, due_at)
Truy vấn hằng ngày: SELECT * FROM reviews WHERE user_id = ? AND due_at <= now()
\`\`\`

Điểm kỹ thuật quan trọng: lịch ôn thuộc về **người dùng**, không thuộc về thẻ, nên cùng một bộ thẻ dùng chung cho hàng nghìn người.

## 5. 🛑 Sai lầm thường gặp

1. Chỉ hiển thị thẻ theo thứ tự cố định, không có due date.
2. Thẻ hai mặt nhồi cả đoạn văn thay vì một ý duy nhất.
3. Không tách bảng lịch ôn theo người dùng nên không chia sẻ được bộ thẻ.`,
        theoryEn: `## 1. 🧠 From the forgetting curve to algorithms

Ebbinghaus showed memory decays exponentially. Spaced repetition fights that by reviewing **just before forgetting**.

Three algorithm generations:

| Generation | Representative | Idea |
|---|---|---|
| SM-2 (1987) | Classic Anki, Mnemosyne | An ease factor multiplies the interval |
| Machine learning | Duolingo HLR | Regression predicting memory half-life |
| FSRS (2023+) | Modern Anki | Three components: difficulty, stability, retrievability |

## 2. ⚙️ SM-2 in short

\`\`\`
If self-rating q < 3: repeat same day, interval = 1
Otherwise: interval = 1, then 6, then interval * EF
New EF = EF + (0.1 - (5-q) * (0.08 + (5-q) * 0.02)), floor 1.3
\`\`\`

## 3. 🃏 Product differences

- **Anki**: strongest algorithm and customisation, plain UI, big shared-deck community.
- **Quizlet**: fastest card creation, play modes (Match, Test), classroom group study.
- **Memrise**: emphasises real native-speaker video clips and everyday context.

## 4. 🏗️ Architecture of a flashcard system

\`\`\`
Table cards(id, front, back, deck_id)
Table reviews(card_id, user_id, rating, reviewed_at, interval, ease, due_at)
Daily query: SELECT * FROM reviews WHERE user_id = ? AND due_at <= now()
\`\`\`

Key technical point: the schedule belongs to the **user**, not the card, so one deck can serve thousands of learners.

## 5. 🛑 Common mistakes

1. Showing cards in a fixed order with no due dates.
2. Cramming a whole paragraph onto a card instead of one idea.
3. Not separating per-user scheduling, which makes deck sharing impossible.`,
        code: `def sm2(quality: int, repetitions: int, ease: float, interval: int):
    """SM-2 scheduler. quality: 0-5 self rating."""
    if quality < 3:
        return 0, max(1.3, ease), 1              # reset, review again tomorrow
    repetitions += 1
    if repetitions == 1:
        interval = 1
    elif repetitions == 2:
        interval = 6
    else:
        interval = round(interval * ease)
    ease = max(1.3, ease + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)))
    return repetitions, round(ease, 2), interval

state = (0, 2.5, 0)
for q in [4, 5, 3, 5]:
    state = sm2(q, *state)
    print(state)      # (1, 2.5, 1) -> (2, 2.6, 6) -> (3, 2.46, 16) -> (4, 2.56, 39)`,
        codeLanguage: "python",
        exercise:
          "Thiết kế lược đồ bảng cho một hệ thẻ ghi nhớ dùng chung bộ thẻ nhưng lịch ôn riêng theo người dùng, rồi viết truy vấn lấy 20 thẻ đến hạn hôm nay, ưu tiên thẻ quá hạn lâu nhất.",
        exerciseEn:
          "Design the table schema for a flashcard system with shared decks but per-user schedules, then write the query returning today's 20 due cards, prioritising the most overdue.",
        quiz: [
          {
            question: "Lặp lại ngắt quãng ôn tập vào thời điểm nào là tối ưu?",
            options: ["Ngay trước khi sắp quên", "Ngay sau khi vừa học xong", "Một năm sau", "Ngẫu nhiên"],
            answer: 0,
            explanation: "Ôn ngay trước ngưỡng quên tạo nỗ lực gợi nhớ, củng cố trí nhớ mạnh nhất.",
            questionEn: "When is the optimal moment for a spaced review?",
            optionsEn: ["Just before forgetting", "Immediately after learning", "A year later", "At random"],
            explanationEn: "Reviewing at the edge of forgetting creates retrieval effort, which strengthens memory most.",
          },
          {
            question: "Trong SM-2, ease factor tối thiểu là bao nhiêu?",
            options: ["1.3", "0", "2.5", "5"],
            answer: 0,
            explanation: "SM-2 chặn dưới ở 1.3 để khoảng cách ôn không co lại vô hạn.",
            questionEn: "What is the minimum ease factor in SM-2?",
            optionsEn: ["1.3", "0", "2.5", "5"],
            explanationEn: "SM-2 floors ease at 1.3 so intervals do not collapse indefinitely.",
          },
          {
            question: "FSRS mô hình hoá ba đại lượng nào?",
            options: [
              "Độ khó, độ bền, độ gợi nhớ",
              "Giá, tốc độ, dung lượng",
              "Đúng, sai, bỏ qua",
              "Nghe, nói, đọc",
            ],
            answer: 0,
            explanation: "FSRS tách riêng difficulty, stability và retrievability cho từng thẻ.",
            questionEn: "Which three quantities does FSRS model?",
            optionsEn: [
              "Difficulty, stability, retrievability",
              "Price, speed, storage",
              "Right, wrong, skipped",
              "Listening, speaking, reading",
            ],
            explanationEn: "FSRS models difficulty, stability and retrievability per card.",
          },
          {
            question: "Vì sao lịch ôn phải gắn với người dùng chứ không gắn với thẻ?",
            options: [
              "Để nhiều người dùng chung một bộ thẻ với tiến độ riêng",
              "Để tiết kiệm ổ cứng",
              "Để thẻ đẹp hơn",
              "Để chặn đăng nhập",
            ],
            answer: 0,
            explanation: "Mỗi người quên khác nhau nên trạng thái ôn phải riêng biệt.",
            questionEn: "Why must the schedule belong to the user, not the card?",
            optionsEn: [
              "So many users can share one deck with individual progress",
              "To save disk space",
              "To make cards prettier",
              "To block logins",
            ],
            explanationEn: "Everyone forgets differently, so review state must be per user.",
          },
          {
            question: "Điểm mạnh riêng của Memrise so với Anki là gì?",
            options: [
              "Video người bản xứ nói trong ngữ cảnh thật",
              "Thuật toán mở",
              "Miễn phí hoàn toàn",
              "Chạy offline tốt hơn",
            ],
            answer: 0,
            explanation: "Memrise tập trung vào clip người bản xứ để dạy ngữ điệu và ngữ cảnh đời thường.",
            questionEn: "What is Memrise's distinctive strength versus Anki?",
            optionsEn: [
              "Native-speaker video in real context",
              "Open algorithm",
              "Completely free",
              "Better offline mode",
            ],
            explanationEn: "Memrise centres on native-speaker clips that teach intonation and everyday context.",
          },
        ],
      },
      {
        id: "edtech-landscape-5",
        title: "AI trong EdTech: Khanmigo, Photomath, ChatGPT Study Mode",
        titleEn: "AI in EdTech: Khanmigo, Photomath, ChatGPT Study Mode",
        level: 4,
        difficulty: "advanced",
        theory: `## 1. 🤖 Ba kiểu sản phẩm AI giáo dục

| Sản phẩm | Cách hoạt động | Công nghệ chính |
|---|---|---|
| Khanmigo | Gia sư Socratic, không cho đáp án ngay | GPT + system prompt sư phạm + ràng buộc nội dung Khan |
| Photomath | Chụp ảnh bài toán, giải từng bước | OCR toán học + CAS (hệ đại số máy tính) |
| ChatGPT Study Mode | Hỏi ngược, chia bước, kiểm tra hiểu | LLM + prompt điều hướng học tập |
| Grammarly / Writing AI | Sửa và giải thích lỗi viết | Mô hình ngôn ngữ + luật ngữ pháp |

## 2. 🔍 Photomath không chỉ là AI

Điểm mấu chốt: **OCR nhận ký hiệu toán -> chuyển thành biểu thức -> CAS giải theo luật**. CAS cho lời giải đúng và có thể trình bày từng bước, việc mà LLM thuần rất dễ sai số học.

Bài học: với miền có luật rõ ràng, hãy dùng công cụ tất định và chỉ dùng LLM để diễn giải.

## 3. 🎓 Vì sao gia sư AI phải theo lối Socratic

Nếu AI đưa đáp án ngay, học sinh chép và không học. Khanmigo dùng system prompt buộc mô hình:

- Hỏi lại học sinh đang nghĩ gì.
- Đưa gợi ý nhỏ dần thay vì lời giải.
- Chỉ xác nhận đáp án sau khi học sinh tự viết ra.

## 4. 🧱 RAG: đưa AI về đúng chương trình học

\`\`\`
Câu hỏi -> embedding -> tìm đoạn bài giảng gần nhất trong vector DB
        -> ghép vào prompt -> LLM trả lời kèm trích dẫn bài học
\`\`\`

RAG giúp AI trả lời theo đúng giáo trình của trường và giảm bịa đặt.

## 5. 🛡️ An toàn và chi phí

- Lọc nội dung hai đầu (đầu vào và đầu ra), có đường báo cho giáo viên.
- Không gửi dữ liệu định danh học sinh vào prompt.
- Cache câu hỏi lặp lại, đặt hạn mức token theo học sinh mỗi ngày.
- Ghi log để đánh giá chất lượng sư phạm, không chỉ đo độ trễ.

## 6. 🛑 Sai lầm thường gặp

1. Dùng LLM để tính toán số học thay vì gọi công cụ tính.
2. Không có RAG nên AI trả lời lệch giáo trình.
3. Không giới hạn chi phí, một học sinh spam có thể đốt hết ngân sách tháng.`,
        theoryEn: `## 1. 🤖 Three kinds of AI education products

| Product | How it works | Core technology |
|---|---|---|
| Khanmigo | Socratic tutor, never gives the answer first | GPT + pedagogical system prompt + Khan content grounding |
| Photomath | Photograph a problem, get step-by-step solving | Maths OCR + CAS (computer algebra system) |
| ChatGPT Study Mode | Asks back, splits steps, checks understanding | LLM + study-oriented prompting |
| Grammarly / writing AI | Corrects and explains writing errors | Language models + grammar rules |

## 2. 🔍 Photomath is not only AI

The key is: **OCR reads maths symbols -> converts to an expression -> a CAS solves it by rules**. The CAS gives correct, presentable step-by-step work, exactly where a pure LLM makes arithmetic errors.

Lesson: in domains with clear rules, use deterministic tools and let the LLM only explain.

## 3. 🎓 Why an AI tutor must be Socratic

If the AI hands over the answer, students copy and learn nothing. Khanmigo's system prompt forces the model to:

- Ask what the student is thinking.
- Give progressively smaller hints instead of solutions.
- Confirm the answer only after the student writes it themselves.

## 4. 🧱 RAG: grounding AI in the actual syllabus

\`\`\`
Question -> embedding -> nearest lesson chunks in a vector DB
         -> injected into the prompt -> LLM answers with lesson citations
\`\`\`

RAG keeps answers aligned to the school's curriculum and reduces hallucination.

## 5. 🛡️ Safety and cost

- Filter both input and output, with an escalation path to a teacher.
- Never put personally identifying student data into prompts.
- Cache repeated questions and cap daily tokens per student.
- Log for pedagogical quality review, not just latency.

## 6. 🛑 Common mistakes

1. Using an LLM for arithmetic instead of calling a calculator tool.
2. Skipping RAG, so answers drift away from the syllabus.
3. No cost caps, letting one spamming student burn the monthly budget.`,
        code: `SOCRATIC_PROMPT = """You are a patient tutor for a 15-year-old student.
Rules:
1. Never give the final answer before the student attempts it.
2. Ask one guiding question at a time.
3. If the student is stuck twice, give a small hint, not the solution.
4. Use the provided lesson excerpts as the only source of truth.
Lesson excerpts:
{context}
"""

def build_messages(question: str, retrieved_chunks: list[str]) -> list[dict]:
    context = "\\n---\\n".join(retrieved_chunks[:4])
    return [
        {"role": "system", "content": SOCRATIC_PROMPT.format(context=context)},
        {"role": "user", "content": question},
    ]

def within_budget(tokens_today: int, daily_cap: int = 30_000) -> bool:
    return tokens_today < daily_cap

print(build_messages("How do I solve 2x + 3 = 11?", ["Linear equations: isolate x ..."])[0]["role"])`,
        codeLanguage: "python",
        exercise:
          "Viết system prompt cho một gia sư AI môn IELTS Writing theo lối Socratic: không viết bài hộ, chỉ hỏi ngược và gợi ý dàn ý. Thêm ba luật an toàn và một hạn mức token mỗi ngày.",
        exerciseEn:
          "Write a Socratic system prompt for an IELTS Writing AI tutor: never write the essay, only ask back and suggest outlines. Add three safety rules and a daily token cap.",
        quiz: [
          {
            question: "Photomath giải toán chính xác nhờ thành phần nào?",
            options: [
              "Hệ đại số máy tính (CAS) sau bước OCR",
              "Chỉ một mô hình ngôn ngữ lớn",
              "Tìm kiếm Google",
              "Con người chấm thủ công",
            ],
            answer: 0,
            explanation: "OCR đọc biểu thức rồi CAS giải theo luật toán học tất định.",
            questionEn: "What component makes Photomath's solutions reliable?",
            optionsEn: [
              "A computer algebra system after OCR",
              "Only a large language model",
              "Google search",
              "Manual human grading",
            ],
            explanationEn: "OCR reads the expression and a CAS solves it with deterministic maths rules.",
          },
          {
            question: "Mục đích chính của RAG trong gia sư AI là gì?",
            options: [
              "Neo câu trả lời vào đúng giáo trình và giảm bịa đặt",
              "Tăng tốc GPU",
              "Nén ảnh",
              "Tạo giọng nói",
            ],
            answer: 0,
            explanation: "RAG chèn đoạn bài giảng liên quan vào prompt trước khi mô hình trả lời.",
            questionEn: "What is RAG's main purpose in an AI tutor?",
            optionsEn: [
              "Grounding answers in the syllabus and cutting hallucination",
              "Speeding up the GPU",
              "Compressing images",
              "Generating speech",
            ],
            explanationEn: "RAG injects relevant lesson chunks into the prompt before the model answers.",
          },
          {
            question: "Vì sao Khanmigo không đưa đáp án ngay?",
            options: [
              "Để học sinh tự nỗ lực gợi nhớ và thật sự học",
              "Để tiết kiệm token",
              "Vì mô hình không biết đáp án",
              "Vì luật cấm",
            ],
            answer: 0,
            explanation: "Đưa đáp án ngay sẽ triệt tiêu nỗ lực nhận thức, phần tạo ra việc học.",
            questionEn: "Why does Khanmigo withhold the answer?",
            optionsEn: [
              "So the student does the retrieval effort and actually learns",
              "To save tokens",
              "Because the model does not know",
              "Because of a law",
            ],
            explanationEn: "Giving the answer removes the cognitive effort that produces learning.",
          },
          {
            question: "Biện pháp nào giúp kiểm soát chi phí AI trong lớp học?",
            options: [
              "Cache câu hỏi lặp và đặt hạn mức token mỗi học sinh",
              "Tắt HTTPS",
              "Dùng mô hình lớn nhất cho mọi câu",
              "Bỏ ghi log",
            ],
            answer: 0,
            explanation: "Cache và hạn mức là hai đòn bẩy đơn giản nhất để giữ chi phí ổn định.",
            questionEn: "Which measure controls AI cost in a classroom?",
            optionsEn: [
              "Caching repeated questions and per-student token caps",
              "Disabling HTTPS",
              "Using the largest model for every query",
              "Removing logs",
            ],
            explanationEn: "Caching and caps are the simplest levers to keep costs predictable.",
          },
          {
            question: "Nguyên tắc quyền riêng tư cơ bản khi gọi LLM cho học sinh?",
            options: [
              "Không đưa dữ liệu định danh học sinh vào prompt",
              "Gửi kèm số điện thoại phụ huynh",
              "Lưu prompt công khai",
              "Dùng chung một tài khoản cho cả lớp",
            ],
            answer: 0,
            explanation: "Ẩn danh hoá trước khi gửi là yêu cầu tối thiểu để bảo vệ dữ liệu trẻ em.",
            questionEn: "What is the basic privacy rule when calling an LLM for students?",
            optionsEn: [
              "Never place identifying student data in the prompt",
              "Include parent phone numbers",
              "Publish prompts publicly",
              "Share one account for the whole class",
            ],
            explanationEn: "Anonymising before sending is the minimum requirement for protecting children's data.",
          },
        ],
      },
      {
        id: "edtech-landscape-6",
        title: "Dựng lại một sản phẩm EdTech: kiến trúc tham chiếu",
        titleEn: "Rebuilding an EdTech Product: Reference Architecture",
        level: 4,
        difficulty: "advanced",
        theory: `## 1. 🏗️ Kiến trúc tham chiếu 2026

\`\`\`
Web/App (React, TypeScript)
   │  gọi API có xác thực
   ▼
Backend as a Service (Postgres + Auth + Storage + Edge Functions)
   │            │              │
   │            │              └─> Object storage cho audio, ảnh, PDF
   │            └─> Edge Function gọi LLM / TTS / STT
   └─> Bảng progress, reviews, activity_log  ->  Dashboard phân tích
\`\`\`

Bốn khối bắt buộc: **xác thực, dữ liệu tiến độ, nội dung, dịch vụ AI**.

## 2. 🗃️ Mô hình dữ liệu tối thiểu

| Bảng | Vai trò |
|---|---|
| profiles | Tên hiển thị, ngôn ngữ, vai trò |
| lessons | Nội dung tĩnh hoặc tham chiếu tới file |
| progress | Trạng thái hoàn thành theo học sinh và bài |
| reviews | Lịch ôn theo thuật toán ngắt quãng |
| activity_log | Mọi sự kiện học tập, nền tảng cho phân tích |

Bật RLS trên mọi bảng: học sinh chỉ đọc dữ liệu của chính mình, giáo viên đọc theo lớp.

## 3. 🔊 Dịch vụ media

- TTS cho luyện nghe, gọi qua Edge Function để giấu khoá API.
- STT cho luyện nói, chấm phát âm bằng so khớp từ và độ tương đồng.
- Cache audio đã sinh theo hash của câu để không trả tiền hai lần.

## 4. 📊 Vòng lặp dữ liệu

\`\`\`
Học sinh làm bài -> activity_log -> tổng hợp hằng đêm
   -> chỉ số: giữ chân, độ chính xác, thời gian học
   -> điều chỉnh độ khó và nội dung gợi ý
\`\`\`

Không có vòng lặp này thì sản phẩm chỉ là sách điện tử.

## 5. ✅ Danh sách kiểm tra trước khi phát hành

1. Hoạt động tốt trên mạng 3G và điện thoại tầm trung.
2. Có chế độ ngoại tuyến hoặc ít nhất lưu tạm bài đang làm.
3. Xoá tài khoản và xuất dữ liệu theo yêu cầu (GDPR).
4. Chi phí AI mỗi học sinh được đo và đặt trần.
5. Có đường phản hồi cho giáo viên khi AI trả lời sai.

## 6. 🛑 Sai lầm thường gặp

1. Xây phân tích trước khi có sự kiện học tập nào được ghi lại.
2. Gọi thẳng API LLM từ trình duyệt, lộ khoá.
3. Không có RLS nên một học sinh xem được điểm cả lớp.`,
        theoryEn: `## 1. 🏗️ A 2026 reference architecture

\`\`\`
Web/App (React, TypeScript)
   │  authenticated API calls
   ▼
Backend as a Service (Postgres + Auth + Storage + Edge Functions)
   │            │              │
   │            │              └─> Object storage for audio, images, PDFs
   │            └─> Edge Function calling LLM / TTS / STT
   └─> progress, reviews, activity_log tables  ->  Analytics dashboard
\`\`\`

Four mandatory blocks: **auth, progress data, content, AI services**.

## 2. 🗃️ Minimum data model

| Table | Role |
|---|---|
| profiles | Display name, language, role |
| lessons | Static content or references to files |
| progress | Completion state per student per lesson |
| reviews | Spaced-repetition schedule |
| activity_log | Every learning event, the base for analytics |

Enable RLS everywhere: students read only their own rows, teachers read by class.

## 3. 🔊 Media services

- TTS for listening practice, called through an Edge Function so API keys stay hidden.
- STT for speaking practice, scored by word matching and similarity.
- Cache generated audio by sentence hash so you never pay twice.

## 4. 📊 The data loop

\`\`\`
Student practises -> activity_log -> nightly aggregation
   -> metrics: retention, accuracy, time on task
   -> adjust difficulty and recommended content
\`\`\`

Without this loop the product is just an e-book.

## 5. ✅ Pre-launch checklist

1. Works on 3G networks and mid-range phones.
2. Offline mode, or at minimum drafts saved locally.
3. Account deletion and data export on request (GDPR).
4. AI cost per student measured and capped.
5. A feedback path for teachers when the AI answers wrongly.

## 6. 🛑 Common mistakes

1. Building analytics before a single learning event is logged.
2. Calling the LLM API straight from the browser, leaking the key.
3. No RLS, so one student can read the whole class's scores.`,
        code: `-- Minimal EdTech schema with per-user isolation
create table public.progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id text not null,
  score numeric,
  completed_at timestamptz default now(),
  unique (user_id, lesson_id)
);

grant select, insert, update, delete on public.progress to authenticated;
grant all on public.progress to service_role;

alter table public.progress enable row level security;

create policy "own progress" on public.progress
  for all to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);`,
        codeLanguage: "sql",
        exercise:
          "Phác thảo kiến trúc cho một sản phẩm luyện nghe tiếng Anh 10.000 học sinh: liệt kê bảng dữ liệu, nơi gọi TTS, cách cache audio, chính sách RLS và cách đo chi phí AI mỗi học sinh.",
        exerciseEn:
          "Sketch the architecture for an English listening product serving 10,000 students: list the tables, where TTS is called, how audio is cached, the RLS policies, and how AI cost per student is measured.",
        quiz: [
          {
            question: "Vì sao phải gọi API LLM qua Edge Function thay vì từ trình duyệt?",
            options: [
              "Để không lộ khoá API và kiểm soát được hạn mức",
              "Để trang tải nhanh hơn",
              "Để tránh dùng HTTPS",
              "Để bỏ qua đăng nhập",
            ],
            answer: 0,
            explanation: "Khoá đặt trong trình duyệt là công khai, ai cũng lấy và dùng được.",
            questionEn: "Why call the LLM API through an Edge Function instead of the browser?",
            optionsEn: [
              "To keep the API key secret and enforce quotas",
              "To load pages faster",
              "To avoid HTTPS",
              "To skip login",
            ],
            explanationEn: "A key shipped to the browser is public and anyone can extract and use it.",
          },
          {
            question: "Bảng nào là nền tảng cho mọi phân tích học tập?",
            options: ["activity_log", "profiles", "lessons", "settings"],
            answer: 0,
            explanation: "Không ghi sự kiện thì không có dữ liệu để tổng hợp thành chỉ số.",
            questionEn: "Which table is the foundation of all learning analytics?",
            optionsEn: ["activity_log", "profiles", "lessons", "settings"],
            explanationEn: "Without event logging there is nothing to aggregate into metrics.",
          },
          {
            question: "Cách hiệu quả để giảm chi phí TTS?",
            options: [
              "Cache audio theo hash của câu",
              "Sinh lại audio mỗi lần mở trang",
              "Dùng chất lượng cao nhất mọi lúc",
              "Tắt cache trình duyệt",
            ],
            answer: 0,
            explanation: "Cùng một câu chỉ cần sinh một lần rồi phục vụ từ storage.",
            questionEn: "What is an effective way to cut TTS cost?",
            optionsEn: [
              "Cache audio by sentence hash",
              "Regenerate audio on every page view",
              "Always use the highest quality",
              "Disable browser cache",
            ],
            explanationEn: "The same sentence only needs generating once, then served from storage.",
          },
          {
            question: "RLS trong Postgres bảo vệ điều gì?",
            options: [
              "Giới hạn mỗi người dùng chỉ truy cập dòng dữ liệu của mình",
              "Nén bảng",
              "Tăng tốc truy vấn",
              "Sao lưu tự động",
            ],
            answer: 0,
            explanation: "Row Level Security áp chính sách ngay ở tầng cơ sở dữ liệu.",
            questionEn: "What does RLS in Postgres protect?",
            optionsEn: [
              "It limits each user to their own rows",
              "Table compression",
              "Query speed",
              "Automatic backups",
            ],
            explanationEn: "Row Level Security enforces access policy at the database layer itself.",
          },
          {
            question: "Yêu cầu GDPR nào phải có trong sản phẩm EdTech?",
            options: [
              "Cho phép xoá tài khoản và xuất dữ liệu cá nhân",
              "Bắt buộc dùng tiếng Anh",
              "Lưu mật khẩu dạng văn bản thường",
              "Chia sẻ dữ liệu với đối tác quảng cáo",
            ],
            answer: 0,
            explanation: "Quyền xoá và quyền mang dữ liệu đi là hai quyền cốt lõi của GDPR.",
            questionEn: "Which GDPR requirement must an EdTech product support?",
            optionsEn: [
              "Account deletion and personal data export",
              "English-only interface",
              "Plain-text password storage",
              "Sharing data with ad partners",
            ],
            explanationEn: "The right to erasure and the right to data portability are core GDPR rights.",
          },
        ],
      },
    ],
  },
];
