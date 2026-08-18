import type { ExtendedProgrammingModule } from "./types";

/**
 * Learning Science Practicum - 6 lessons on the science behind good EdTech:
 * cognitive load, backward design, retrieval practice, feedback loops,
 * motivation, and accessibility. Fully bilingual (VI + EN mirrors).
 */
export const edtechPracticumModules: ExtendedProgrammingModule[] = [
  {
    id: "edtech-practicum-2026",
    title: "Learning Science Practicum - Thiết kế bài học hiệu quả",
    titleEn: "Learning Science Practicum - Designing Lessons That Work",
    icon: "🧪",
    color: "from-teal-500 to-cyan-600",
    description:
      "6 bài học nền tảng: tải nhận thức, thiết kế ngược, luyện gợi nhớ, vòng phản hồi, động lực và khả năng tiếp cận. Mỗi bài có ví dụ cụ thể từ sản phẩm thật.",
    descriptionEn:
      "6 foundational lessons: cognitive load, backward design, retrieval practice, feedback loops, motivation, and accessibility. Each lesson uses concrete examples from real products.",
    course: "edtech",
    lessons: [
      {
        id: "edtech-prac-1",
        title: "Tải nhận thức và học đa phương tiện (Sweller, Mayer)",
        titleEn: "Cognitive Load and Multimedia Learning (Sweller, Mayer)",
        level: 2,
        difficulty: "beginner",
        theory: `## 1. 🧠 Bộ nhớ làm việc rất nhỏ

Bộ nhớ làm việc chỉ giữ được khoảng **4 khối thông tin** trong ~20 giây. Mọi thiết kế bài học đều phải tôn trọng giới hạn này.

\`\`\`
   Giác quan  →  Bộ nhớ làm việc (4 khối, 20s)  →  Bộ nhớ dài hạn
                        ▲   nút thắt cổ chai
                        │
        Nếu nhồi quá nhiều: học sinh "đơ", bỏ cuộc
\`\`\`

## 2. 📦 Ba loại tải

| Loại tải | Bản chất | Nên làm gì |
|---|---|---|
| **Nội tại** (intrinsic) | Độ khó tự thân của kiến thức | Chia nhỏ, dạy theo thứ tự phụ thuộc |
| **Ngoại lai** (extraneous) | Do thiết kế tệ gây ra | Cắt bỏ triệt để |
| **Hữu ích** (germane) | Dùng để xây sơ đồ tư duy | Tăng lên khi học sinh đã sẵn sàng |

## 3. 🎬 6 nguyên tắc Mayer dùng được ngay

1. **Coherence**: bỏ nhạc nền, hình trang trí vô nghĩa.
2. **Signaling**: tô đậm, mũi tên, đánh số các bước.
3. **Contiguity**: đặt nhãn ngay cạnh hình, không để chú thích ở cuối trang.
4. **Modality**: giải thích hình bằng **giọng nói**, không phải đoạn text dài song song.
5. **Redundancy**: không đọc y nguyên chữ đang hiện trên màn hình.
6. **Segmenting**: cho học sinh bấm "Tiếp" giữa các đoạn thay vì video 20 phút liền.

## 4. 🛠️ Áp dụng vào HaiEduTech

- Mỗi màn hình chỉ **một mục tiêu học tập**.
- Ví dụ code dài hơn 25 dòng thì tách thành 2 bước có giải thích.
- Bảng trên mobile: tối đa 3 cột, cột còn lại chuyển thành dòng phụ.
- Bài nghe: tách theo đoạn 20-40 giây, có nút phát lại từng đoạn.

## 5. 🛑 Sai lầm thường gặp

1. Nhét cả lý thuyết, ví dụ, bài tập và quiz vào một màn hình cuộn dài.
2. Hoạt hình chuyển cảnh lòe loẹt làm mất dấu nội dung chính.
3. Đọc to đúng từng chữ đang hiển thị (vi phạm redundancy).
4. Với người mới, bắt tự khám phá thay vì cho ví dụ mẫu đã giải sẵn.`,
        theoryEn: `## 1. 🧠 Working memory is tiny

Working memory holds roughly **4 chunks** of information for about 20 seconds. Every lesson design has to respect that limit.

\`\`\`
   Senses  →  Working memory (4 chunks, 20s)  →  Long-term memory
                     ▲   the bottleneck
                     │
     Overload it and the learner freezes, then quits
\`\`\`

## 2. 📦 Three kinds of load

| Load type | What it is | What to do |
|---|---|---|
| **Intrinsic** | Inherent difficulty of the material | Break it down, teach in dependency order |
| **Extraneous** | Created by bad design | Remove it ruthlessly |
| **Germane** | Used to build mental schemas | Increase it once learners are ready |

## 3. 🎬 6 Mayer principles you can use today

1. **Coherence**: drop background music and decorative images.
2. **Signaling**: bold text, arrows, numbered steps.
3. **Contiguity**: put labels next to the picture, not in a caption at the bottom.
4. **Modality**: explain a diagram with **narration**, not a long parallel wall of text.
5. **Redundancy**: do not read on-screen text word for word.
6. **Segmenting**: let learners click "Next" between chunks instead of one 20-minute video.

## 4. 🛠️ Applying this at HaiEduTech

- One **learning objective** per screen.
- Any code sample longer than 25 lines is split into 2 explained steps.
- Mobile tables: 3 columns maximum, the rest becomes a sub-line.
- Listening tasks: 20-40 second segments with a replay button per segment.

## 5. 🛑 Common mistakes

1. Cramming theory, examples, exercises and a quiz into one long scrolling screen.
2. Flashy transition animations that hide the actual content.
3. Narrating on-screen text verbatim (a redundancy violation).
4. Forcing pure discovery on novices instead of giving worked examples.`,
        code: `# Estimate extraneous load of a lesson screen (simple heuristic)
def load_score(elements: dict) -> int:
    """elements: counts of items competing for attention on one screen."""
    weights = {
        "objectives": 3,      # more than 1 objective = split the screen
        "images": 1,
        "code_lines": 0.1,
        "table_columns": 0.5,
        "animations": 2,
    }
    return round(sum(weights[k] * v for k, v in elements.items()))

screen = {"objectives": 2, "images": 3, "code_lines": 40, "table_columns": 6, "animations": 2}
print(load_score(screen))   # 20 -> too heavy, split into 2 screens
print(load_score({"objectives": 1, "images": 1, "code_lines": 20, "table_columns": 3, "animations": 0}))  # 8 -> fine`,
        codeLanguage: "python",
        exercise:
          "Chọn một màn hình bài học bất kỳ trên HaiEduTech, liệt kê mọi yếu tố gây tải ngoại lai và viết lại thành 2 màn hình, mỗi màn hình một mục tiêu.",
        exerciseEn:
          "Pick any lesson screen on HaiEduTech, list every source of extraneous load, and redesign it as 2 screens with one objective each.",
        quiz: [
          {
            question: "Bộ nhớ làm việc giữ được khoảng bao nhiêu khối thông tin?",
            options: ["1", "4", "12", "Không giới hạn"],
            answer: 1,
            explanation: "Nghiên cứu hiện đại cho con số khoảng 4 khối, ngắn hơn con số 7 cũ.",
            questionEn: "About how many chunks can working memory hold?",
            optionsEn: ["1", "4", "12", "Unlimited"],
            explanationEn: "Modern research points to about 4 chunks, lower than the classic 7.",
          },
          {
            question: "Loại tải nào cần cắt bỏ triệt để?",
            options: ["Nội tại", "Ngoại lai", "Hữu ích", "Cả ba"],
            answer: 1,
            explanation: "Tải ngoại lai do thiết kế tệ gây ra, không đóng góp gì cho việc học.",
            questionEn: "Which load type should be removed ruthlessly?",
            optionsEn: ["Intrinsic", "Extraneous", "Germane", "All three"],
            explanationEn: "Extraneous load comes from poor design and adds nothing to learning.",
          },
          {
            question: "Nguyên tắc modality khuyên điều gì?",
            options: [
              "Giải thích hình bằng giọng nói",
              "Thêm nhạc nền",
              "Đọc y nguyên chữ trên màn hình",
              "Dùng nhiều font",
            ],
            answer: 0,
            explanation: "Kênh nghe và kênh nhìn xử lý song song nên chia tải tốt hơn.",
            questionEn: "What does the modality principle recommend?",
            optionsEn: [
              "Explain a diagram with narration",
              "Add background music",
              "Read on-screen text verbatim",
              "Use many fonts",
            ],
            explanationEn: "Audio and visual channels process in parallel, spreading the load.",
          },
          {
            question: "Segmenting nghĩa là gì?",
            options: [
              "Cắt nội dung thành đoạn nhỏ do người học điều khiển nhịp",
              "Chia lớp thành nhóm",
              "Nén video",
              "Chia màn hình thành hai cột",
            ],
            answer: 0,
            explanation: "Người học tự bấm Tiếp giúp họ kiểm soát nhịp độ nạp thông tin.",
            questionEn: "What does segmenting mean?",
            optionsEn: [
              "Splitting content into learner-paced chunks",
              "Splitting the class into groups",
              "Compressing video",
              "Splitting the screen into two columns",
            ],
            explanationEn: "Learner-controlled pacing keeps incoming information manageable.",
          },
          {
            question: "Với người mới bắt đầu, cách nào hiệu quả hơn?",
            options: [
              "Ví dụ mẫu đã giải sẵn",
              "Tự khám phá hoàn toàn",
              "Đọc tài liệu tham khảo",
              "Xem video 30 phút",
            ],
            answer: 0,
            explanation: "Hiệu ứng worked example: người mới học nhanh hơn khi thấy lời giải mẫu.",
            questionEn: "For novices, which is more effective?",
            optionsEn: [
              "Worked examples",
              "Pure discovery learning",
              "Reading reference docs",
              "Watching a 30-minute video",
            ],
            explanationEn: "The worked-example effect: novices learn faster from modelled solutions.",
          },
        ],
      },
      {
        id: "edtech-prac-2",
        title: "Thiết kế ngược và thang Bloom",
        titleEn: "Backward Design and Bloom's Taxonomy",
        level: 2,
        difficulty: "beginner",
        theory: `## 1. 🎯 Thiết kế ngược là gì?

Thay vì bắt đầu bằng "dạy gì", ta bắt đầu bằng "học sinh phải **làm được** gì".

\`\`\`
  Bước 1: Kết quả mong muốn   →  "Viết được đoạn Task 2 band 6.5"
  Bước 2: Bằng chứng đánh giá →  Rubric 4 tiêu chí + 2 bài chấm mẫu
  Bước 3: Hoạt động học tập   →  Ví dụ mẫu, luyện từng câu, viết đủ bài
\`\`\`

Hầu hết khóa học tệ vì làm ngược: soạn slide trước, nghĩ đề kiểm tra sau.

## 2. 🪜 Thang Bloom và động từ hành động

| Cấp | Động từ | Ví dụ nhiệm vụ |
|---|---|---|
| Nhớ | liệt kê, gọi tên | Liệt kê 5 liên từ chỉ tương phản |
| Hiểu | giải thích, tóm tắt | Giải thích khác biệt giữa however và although |
| Áp dụng | dùng, giải | Viết 3 câu dùng although |
| Phân tích | so sánh, phân loại | Tìm lỗi liên từ trong đoạn văn mẫu |
| Đánh giá | phê bình, chấm | Chấm một bài viết theo rubric |
| Sáng tạo | thiết kế, soạn | Viết đoạn 120 từ có 3 kiểu liên kết |

> 💡 Mục tiêu học tập tốt luôn có động từ **quan sát được**. "Hiểu về thì" là mục tiêu tệ vì không đo được.

## 3. 📏 Rubric 4 tiêu chí

\`\`\`
Tiêu chí        | 1 (yếu)      | 2 (đạt)        | 3 (tốt)          | 4 (xuất sắc)
Nội dung        | lạc đề       | đúng đề, sơ sài| đủ ý, có ví dụ   | sâu, thuyết phục
Bố cục          | rời rạc      | có mở/thân/kết | liên kết mượt    | mạch lạc cao
Ngữ pháp        | nhiều lỗi    | lỗi nhỏ        | hầu như đúng     | đa dạng, chính xác
Từ vựng         | lặp lại      | cơ bản         | có collocation   | tự nhiên, học thuật
\`\`\`

## 4. 🧭 Bản đồ căn chỉnh

Mỗi hoạt động phải nối được với một mục tiêu, và mỗi mục tiêu phải có ít nhất một câu hỏi kiểm tra. Nếu một hoạt động không nối được vào đâu thì hãy xóa nó.

## 5. 🛑 Sai lầm thường gặp

1. Mục tiêu dùng động từ mơ hồ: biết, hiểu, nắm được.
2. Quiz chỉ dừng ở cấp Nhớ trong khi mục tiêu là Áp dụng.
3. Rubric không có mô tả từng mức nên chấm không nhất quán.
4. Thêm hoạt động vui nhưng không phục vụ mục tiêu nào.`,
        theoryEn: `## 1. 🎯 What is backward design?

Instead of starting from "what should I teach", start from "what should the learner be able to **do**".

\`\`\`
  Step 1: Desired result     ->  "Write a band 6.5 Task 2 body paragraph"
  Step 2: Evidence of it     ->  4-criteria rubric + 2 graded samples
  Step 3: Learning activities->  Worked example, sentence drills, full write-up
\`\`\`

Most weak courses are built backwards: slides first, assessment as an afterthought.

## 2. 🪜 Bloom's taxonomy and action verbs

| Level | Verbs | Example task |
|---|---|---|
| Remember | list, name | List 5 contrast connectors |
| Understand | explain, summarize | Explain the difference between however and although |
| Apply | use, solve | Write 3 sentences using although |
| Analyze | compare, classify | Find connector errors in a sample paragraph |
| Evaluate | critique, grade | Grade an essay against the rubric |
| Create | design, compose | Write a 120-word paragraph with 3 cohesion devices |

> 💡 A good objective always uses an **observable** verb. "Understand tenses" is a poor objective because it cannot be measured.

## 3. 📏 A 4-criteria rubric

\`\`\`
Criterion    | 1 (weak)     | 2 (pass)         | 3 (good)          | 4 (excellent)
Content      | off topic    | on topic, thin   | complete, examples| deep, persuasive
Structure    | disjointed   | intro/body/end   | smooth links      | highly coherent
Grammar      | many errors  | minor errors     | mostly accurate   | varied, accurate
Vocabulary   | repetitive   | basic            | uses collocations | natural, academic
\`\`\`

## 4. 🧭 The alignment map

Every activity must map to an objective, and every objective must have at least one assessment item. If an activity maps to nothing, delete it.

## 5. 🛑 Common mistakes

1. Objectives with vague verbs: know, understand, be familiar with.
2. Quizzes stuck at the Remember level while the objective is Apply.
3. Rubrics without level descriptors, which makes grading inconsistent.
4. Fun activities that serve no objective at all.`,
        code: `# Check curriculum alignment: objectives <-> assessment items
objectives = {
    "O1": "Apply: use 'although' in 3 original sentences",
    "O2": "Analyze: find connector errors in a paragraph",
    "O3": "Create: write a 120-word cohesive paragraph",
}
items = [
    {"id": "Q1", "objective": "O1", "bloom": "apply"},
    {"id": "Q2", "objective": "O1", "bloom": "remember"},
    {"id": "Q3", "objective": "O2", "bloom": "analyze"},
]

covered = {i["objective"] for i in items}
missing = [o for o in objectives if o not in covered]
print("Objectives with no assessment:", missing)   # ['O3'] -> add a writing task

mismatch = [i["id"] for i in items if i["objective"] == "O1" and i["bloom"] != "apply"]
print("Bloom mismatch:", mismatch)                 # ['Q2'] -> rewrite or retag`,
        codeLanguage: "python",
        exercise:
          "Chọn một bài học bạn đang dạy, viết 3 mục tiêu bằng động từ quan sát được, thiết kế rubric 4 tiêu chí và ánh xạ từng câu hỏi quiz vào mục tiêu tương ứng.",
        exerciseEn:
          "Take a lesson you teach, write 3 objectives with observable verbs, design a 4-criteria rubric, and map every quiz item to its objective.",
        quiz: [
          {
            question: "Thiết kế ngược bắt đầu từ bước nào?",
            options: ["Soạn slide", "Kết quả mong muốn", "Chọn công cụ", "Quay video"],
            answer: 1,
            explanation: "Xác định kết quả mong muốn trước, rồi tới bằng chứng, sau cùng là hoạt động.",
            questionEn: "Where does backward design start?",
            optionsEn: ["Writing slides", "Desired results", "Choosing tools", "Recording video"],
            explanationEn: "Desired results come first, then evidence, then activities.",
          },
          {
            question: "Mục tiêu nào viết đúng chuẩn?",
            options: [
              "Học sinh hiểu về thì hiện tại hoàn thành",
              "Học sinh viết được 3 câu đúng với thì hiện tại hoàn thành",
              "Học sinh nắm ngữ pháp",
              "Học sinh yêu thích tiếng Anh",
            ],
            answer: 1,
            explanation: "Chỉ phương án này có động từ quan sát được và có thể đo lường.",
            questionEn: "Which objective is written correctly?",
            optionsEn: [
              "Students understand the present perfect",
              "Students write 3 correct present perfect sentences",
              "Students grasp grammar",
              "Students enjoy English",
            ],
            explanationEn: "Only this one has an observable, measurable verb.",
          },
          {
            question: "Nhiệm vụ chấm một bài viết theo rubric thuộc cấp Bloom nào?",
            options: ["Nhớ", "Áp dụng", "Đánh giá", "Sáng tạo"],
            answer: 2,
            explanation: "Chấm và phê bình theo tiêu chí là cấp Đánh giá.",
            questionEn: "Grading an essay against a rubric sits at which Bloom level?",
            optionsEn: ["Remember", "Apply", "Evaluate", "Create"],
            explanationEn: "Judging against criteria is the Evaluate level.",
          },
          {
            question: "Nếu một hoạt động không ánh xạ được vào mục tiêu nào thì nên?",
            options: ["Giữ lại cho vui", "Xóa hoặc viết lại mục tiêu", "Chuyển sang bài khác", "Tính điểm gấp đôi"],
            answer: 1,
            explanation: "Căn chỉnh là bắt buộc; hoạt động lạc mục tiêu chỉ tạo tải ngoại lai.",
            questionEn: "If an activity maps to no objective, you should?",
            optionsEn: ["Keep it for fun", "Delete it or rewrite the objective", "Move it to another lesson", "Double its score"],
            explanationEn: "Alignment is mandatory; orphan activities only add extraneous load.",
          },
          {
            question: "Vì sao rubric cần mô tả từng mức điểm?",
            options: [
              "Để chấm nhất quán giữa các giáo viên",
              "Để bài dài hơn",
              "Để tăng độ khó",
              "Để tránh dùng phần mềm",
            ],
            answer: 0,
            explanation: "Mô tả rõ từng mức giúp độ tin cậy giữa người chấm cao hơn.",
            questionEn: "Why do rubrics need level descriptors?",
            optionsEn: [
              "To keep grading consistent across graders",
              "To make the document longer",
              "To increase difficulty",
              "To avoid using software",
            ],
            explanationEn: "Clear descriptors raise inter-rater reliability.",
          },
        ],
      },
      {
        id: "edtech-prac-3",
        title: "Luyện gợi nhớ, xen kẽ và khó khăn hữu ích",
        titleEn: "Retrieval Practice, Interleaving and Desirable Difficulties",
        level: 3,
        difficulty: "intermediate",
        theory: `## 1. 🔁 Testing effect

Kiểm tra không chỉ để đo, nó chính là **hoạt động học**. Tự lấy lại thông tin từ trí nhớ củng cố đường dẫn thần kinh mạnh hơn nhiều so với đọc lại.

\`\`\`
  Đọc lại 4 lần        →  nhớ sau 1 tuần: khoảng 30%
  Đọc 1 lần + tự test 3 lần →  nhớ sau 1 tuần: khoảng 60%
\`\`\`

Cảm giác "đọc lại thấy quen thuộc" là một ảo giác về sự thành thạo.

## 2. 🔀 Xen kẽ (interleaving) so với khối (blocking)

| Kiểu | Cách làm | Kết quả |
|---|---|---|
| Blocking | AAAA BBBB CCCC | Trong buổi học thấy giỏi, tuần sau quên |
| Interleaving | ABCA CBAB CACB | Trong buổi học thấy khó, giữ lâu hơn hẳn |

Xen kẽ buộc não phải **chọn chiến lược** chứ không chạy tự động, đó là kỹ năng thi thật cần.

## 3. 🧗 Khó khăn hữu ích

- **Giãn cách**: học lại sau khi đã quên một phần.
- **Đa dạng bối cảnh**: đổi loại bài, đổi ví dụ, đổi giọng đọc.
- **Sinh trước, dạy sau**: cho học sinh đoán trước rồi mới giải thích.
- **Phản hồi trễ vừa phải**: chờ vài giây trước khi báo đúng sai để học sinh tự soát.

> ⚠️ Khó khăn hữu ích khác với khó khăn vô ích. Font khó đọc, giao diện rối và hướng dẫn mơ hồ chỉ làm hại.

## 4. 🧩 Thiết kế trong sản phẩm

- Mở đầu mỗi bài bằng 3 câu ôn từ bài trước, tính điểm nhẹ.
- Kho câu hỏi trộn chủ đề, không xếp theo đúng thứ tự bài học.
- Ưu tiên câu trả lời tự gõ hơn trắc nghiệm khi kiểm tra từ vựng.
- Hàng đợi ôn tập lấy 70% câu cũ và 30% câu mới.

## 5. 🛑 Sai lầm thường gặp

1. Cho quiz ngay sau lý thuyết rồi không bao giờ hỏi lại.
2. Chỉ dùng trắc nghiệm 4 lựa chọn nên học sinh đoán mò.
3. Xếp câu hỏi theo đúng thứ tự bài giảng, tạo hiệu ứng mồi.
4. Coi điểm quiz đầu tiên là năng lực thật thay vì điểm sau khi giãn cách.`,
        theoryEn: `## 1. 🔁 The testing effect

Testing is not only measurement, it is a **learning activity**. Pulling information out of memory strengthens the retrieval path far more than rereading.

\`\`\`
  Reread 4 times             ->  recall after 1 week: about 30%
  Read once + self-test 3x   ->  recall after 1 week: about 60%
\`\`\`

The familiarity you feel while rereading is an illusion of mastery.

## 2. 🔀 Interleaving versus blocking

| Style | Pattern | Outcome |
|---|---|---|
| Blocking | AAAA BBBB CCCC | Feels great in session, forgotten next week |
| Interleaving | ABCA CBAB CACB | Feels hard in session, retained much longer |

Interleaving forces the brain to **choose a strategy** instead of running on autopilot, which is exactly what a real exam demands.

## 3. 🧗 Desirable difficulties

- **Spacing**: revisit material after partial forgetting.
- **Varied context**: change task type, examples, and speaker voice.
- **Generate before teaching**: let learners guess first, explain second.
- **Slightly delayed feedback**: wait a few seconds so learners self-check first.

> ⚠️ Desirable difficulty is not the same as pointless difficulty. Unreadable fonts, cluttered UI, and vague instructions only hurt.

## 4. 🧩 Product design implications

- Open every lesson with 3 recall questions from the previous lesson, lightly scored.
- Keep a mixed question bank rather than lesson-ordered sets.
- Prefer typed answers over multiple choice for vocabulary checks.
- Build the review queue from 70% old items and 30% new ones.

## 5. 🛑 Common mistakes

1. Quizzing right after the theory and never asking again.
2. Using only 4-option multiple choice, which invites guessing.
3. Ordering questions exactly like the lecture, which primes the answers.
4. Treating the first quiz score as true ability instead of the spaced score.`,
        code: `# Build a mixed review queue: 70% due old items, 30% new
import random

def build_queue(due_items, new_items, size=10, old_ratio=0.7):
    n_old = min(len(due_items), round(size * old_ratio))
    n_new = size - n_old
    queue = random.sample(due_items, n_old) + new_items[:n_new]
    random.shuffle(queue)          # interleave topics
    return queue

due = [f"old-{i}" for i in range(30)]
new = [f"new-{i}" for i in range(10)]
print(build_queue(due, new))       # 7 old + 3 new, shuffled across topics`,
        codeLanguage: "python",
        exercise:
          "Thiết kế lại một bài ôn tập 10 câu theo hướng xen kẽ 3 chủ đề, trong đó 7 câu là kiến thức cũ, và giải thích vì sao thứ tự này khó hơn nhưng tốt hơn.",
        exerciseEn:
          "Redesign a 10-question review so it interleaves 3 topics with 7 old items, and explain why this order feels harder but works better.",
        quiz: [
          {
            question: "Testing effect nói rằng?",
            options: [
              "Tự gợi nhớ củng cố trí nhớ tốt hơn đọc lại",
              "Thi nhiều gây stress nên giảm nhớ",
              "Đọc lại luôn tốt hơn",
              "Chỉ nên thi cuối kỳ",
            ],
            answer: 0,
            explanation: "Hành động lấy lại thông tin chính là cơ chế củng cố mạnh nhất.",
            questionEn: "The testing effect states that?",
            optionsEn: [
              "Self-retrieval strengthens memory more than rereading",
              "Frequent testing causes stress and reduces recall",
              "Rereading is always better",
              "You should only test at the end of term",
            ],
            explanationEn: "The act of retrieval is itself the strongest consolidation mechanism.",
          },
          {
            question: "Xen kẽ mang lại điều gì?",
            options: [
              "Điểm cao ngay trong buổi học",
              "Giữ kiến thức lâu hơn dù cảm giác khó hơn",
              "Ít câu hỏi hơn",
              "Bài giảng ngắn hơn",
            ],
            answer: 1,
            explanation: "Hiệu suất trong buổi giảm nhưng khả năng giữ lại và chuyển giao tăng.",
            questionEn: "What does interleaving deliver?",
            optionsEn: [
              "Higher scores during the session",
              "Better long-term retention despite feeling harder",
              "Fewer questions",
              "Shorter lectures",
            ],
            explanationEn: "In-session performance drops but retention and transfer improve.",
          },
          {
            question: "Đâu KHÔNG phải khó khăn hữu ích?",
            options: ["Giãn cách", "Font khó đọc, giao diện rối", "Đa dạng bối cảnh", "Sinh trước, dạy sau"],
            answer: 1,
            explanation: "Đó là tải ngoại lai, chỉ làm hao tài nguyên nhận thức mà không tạo học tập.",
            questionEn: "Which is NOT a desirable difficulty?",
            optionsEn: ["Spacing", "Unreadable fonts and cluttered UI", "Varied context", "Generate before teaching"],
            explanationEn: "That is extraneous load, burning cognitive resources without learning.",
          },
          {
            question: "Tỷ lệ hợp lý cho hàng đợi ôn tập là?",
            options: ["100% câu mới", "70% cũ, 30% mới", "50% cũ, 50% ngẫu nhiên trùng", "100% câu cũ"],
            answer: 1,
            explanation: "Đa số là củng cố, phần nhỏ là mở rộng để giữ động lực.",
            questionEn: "A sensible review queue mix is?",
            optionsEn: ["100% new items", "70% old, 30% new", "50% old, 50% duplicates", "100% old items"],
            explanationEn: "Mostly consolidation with a small share of new material to keep motivation.",
          },
          {
            question: "Vì sao nên ưu tiên câu trả lời tự gõ khi kiểm tra từ vựng?",
            options: [
              "Vì gợi nhớ chủ động mạnh hơn nhận diện",
              "Vì dễ chấm hơn",
              "Vì tốn ít băng thông",
              "Vì học sinh thích hơn",
            ],
            answer: 0,
            explanation: "Trắc nghiệm chỉ cần nhận diện, tự gõ buộc phải truy xuất chủ động.",
            questionEn: "Why prefer typed answers for vocabulary checks?",
            optionsEn: [
              "Free recall is stronger than recognition",
              "It is easier to grade",
              "It uses less bandwidth",
              "Students prefer it",
            ],
            explanationEn: "Multiple choice only needs recognition; typing forces active retrieval.",
          },
        ],
      },
      {
        id: "edtech-prac-4",
        title: "Khoa học phản hồi và đánh giá quá trình",
        titleEn: "Feedback Science and Formative Assessment",
        level: 3,
        difficulty: "intermediate",
        theory: `## 1. 💬 Phản hồi tốt trả lời 3 câu hỏi

Theo Hattie và Timperley, mọi phản hồi hiệu quả đều trả lời:

1. **Tôi đang đi đâu?** Mục tiêu và tiêu chí thành công.
2. **Tôi đang ở đâu?** Bằng chứng cụ thể từ bài làm.
3. **Bước tiếp theo là gì?** Một hành động rõ ràng, làm được ngay.

## 2. 🎚️ Bốn tầng phản hồi

| Tầng | Ví dụ | Hiệu quả |
|---|---|---|
| Nhiệm vụ | "Câu 3 sai thì động từ" | Tốt cho người mới |
| Quy trình | "Hãy soát thì trước khi soát từ vựng" | Rất cao |
| Tự điều chỉnh | "Bạn thường bỏ qua bước lập dàn ý" | Cao nhất khi đã vững |
| Cá nhân | "Em giỏi lắm" | Gần như vô tác dụng |

> ⚠️ Khen chung chung không phải phản hồi. Nó chỉ tạo cảm giác dễ chịu tạm thời.

## 3. ⏱️ Thời điểm và liều lượng

- Bài kỹ năng vận động hoặc phát âm: phản hồi gần như tức thì.
- Bài tư duy phức tạp: trễ vài giây tới vài phút để học sinh tự soát trước.
- Mỗi lần chỉ nêu tối đa **2 điểm cần sửa**, ưu tiên lỗi ảnh hưởng lớn nhất.

## 4. 🤖 Phản hồi tự động bằng AI

\`\`\`
  Bài làm → Rubric có mô tả từng mức → LLM chấm với temperature 0.2
        → Trích dẫn bằng chứng từ chính bài làm
        → 1 lời khen cụ thể + 2 bước hành động
        → Người thật soát mẫu 10% để hiệu chỉnh
\`\`\`

Luôn buộc mô hình **trích dẫn câu gốc** làm bằng chứng, đây là cách rẻ nhất để giảm bịa.

## 5. 🛑 Sai lầm thường gặp

1. Trả về một bảng điểm dài không kèm hành động tiếp theo.
2. Sửa hết mọi lỗi làm học sinh choáng và bỏ cuộc.
3. Chấm bằng AI mà không có mẫu đối chiếu của người thật.
4. Phản hồi ở tầng cá nhân thay vì tầng quy trình.`,
        theoryEn: `## 1. 💬 Good feedback answers 3 questions

Following Hattie and Timperley, every effective piece of feedback answers:

1. **Where am I going?** Goal and success criteria.
2. **How am I doing?** Concrete evidence from the work itself.
3. **What next?** One clear action the learner can take now.

## 2. 🎚️ Four feedback levels

| Level | Example | Effectiveness |
|---|---|---|
| Task | "Question 3 has the wrong tense" | Good for novices |
| Process | "Check tenses before checking vocabulary" | Very high |
| Self-regulation | "You often skip the outlining step" | Highest once skills are solid |
| Personal | "You are so smart" | Nearly useless |

> ⚠️ Generic praise is not feedback. It creates a short-lived good feeling and nothing else.

## 3. ⏱️ Timing and dosage

- Motor or pronunciation skills: give feedback almost immediately.
- Complex reasoning tasks: delay a few seconds to a few minutes so learners self-check first.
- Raise at most **2 fix points** at a time, starting with the highest-impact error.

## 4. 🤖 Automated feedback with AI

\`\`\`
  Submission -> Rubric with level descriptors -> LLM grades at temperature 0.2
        -> Quote evidence from the submission itself
        -> 1 specific compliment + 2 action steps
        -> Human reviews a 10% sample to calibrate
\`\`\`

Always force the model to **quote the original sentence** as evidence. It is the cheapest way to cut hallucination.

## 5. 🛑 Common mistakes

1. Returning a long score table with no next action.
2. Correcting every error at once, which overwhelms and demotivates.
3. Grading with AI and never calibrating against human samples.
4. Giving personal-level feedback instead of process-level feedback.`,
        code: `# Turn a raw grade into actionable feedback (max 2 fix points)
def actionable_feedback(scores: dict, evidence: dict) -> str:
    weakest = sorted(scores.items(), key=lambda kv: kv[1])[:2]
    strongest = max(scores, key=scores.get)
    lines = [f"Strength: {strongest} is solid - \\"{evidence[strongest]}\\""]
    for crit, sc in weakest:
        lines.append(f"Next step ({crit}, {sc}/4): fix \\"{evidence[crit]}\\"")
    return "\\n".join(lines)

scores = {"content": 3, "structure": 2, "grammar": 2, "vocabulary": 4}
evidence = {
    "content": "You gave one clear example about traffic.",
    "structure": "Paragraph 2 has no topic sentence.",
    "grammar": "'He go to school' should be 'He goes to school'.",
    "vocabulary": "Nice use of 'commuting costs'.",
}
print(actionable_feedback(scores, evidence))`,
        codeLanguage: "python",
        exercise:
          "Lấy một bài chấm gần đây, viết lại phản hồi theo cấu trúc 3 câu hỏi của Hattie, chỉ nêu 2 bước hành động và trích dẫn bằng chứng từ chính bài làm.",
        exerciseEn:
          "Take a recent graded piece, rewrite the feedback using Hattie's 3 questions, list only 2 action steps, and quote evidence from the submission.",
        quiz: [
          {
            question: "Ba câu hỏi của phản hồi hiệu quả là?",
            options: [
              "Đi đâu, đang ở đâu, bước tiếp theo",
              "Ai, khi nào, ở đâu",
              "Điểm, hạng, phần trăm",
              "Đúng, sai, bỏ trống",
            ],
            answer: 0,
            explanation: "Đây là khung Feed Up, Feed Back, Feed Forward của Hattie và Timperley.",
            questionEn: "The three questions of effective feedback are?",
            optionsEn: [
              "Where am I going, how am I doing, what next",
              "Who, when, where",
              "Score, rank, percentile",
              "Right, wrong, blank",
            ],
            explanationEn: "This is Hattie and Timperley's Feed Up, Feed Back, Feed Forward frame.",
          },
          {
            question: "Tầng phản hồi nào gần như vô tác dụng?",
            options: ["Nhiệm vụ", "Quy trình", "Tự điều chỉnh", "Cá nhân"],
            answer: 3,
            explanation: "Khen con người chung chung không cho biết cần làm gì tiếp theo.",
            questionEn: "Which feedback level is nearly useless?",
            optionsEn: ["Task", "Process", "Self-regulation", "Personal"],
            explanationEn: "Generic praise about the person gives no next step.",
          },
          {
            question: "Nên nêu bao nhiêu điểm cần sửa mỗi lần?",
            options: ["Tất cả", "Tối đa 2", "Ít nhất 10", "Không nêu"],
            answer: 1,
            explanation: "Giới hạn 2 điểm giúp học sinh thực sự hành động thay vì choáng ngợp.",
            questionEn: "How many fix points should one round of feedback raise?",
            optionsEn: ["All of them", "At most 2", "At least 10", "None"],
            explanationEn: "Capping at 2 keeps the feedback actionable instead of overwhelming.",
          },
          {
            question: "Cách rẻ nhất để giảm bịa khi AI chấm bài?",
            options: [
              "Buộc trích dẫn câu gốc làm bằng chứng",
              "Tăng temperature",
              "Rút ngắn rubric",
              "Ẩn điểm số",
            ],
            answer: 0,
            explanation: "Trích dẫn neo nhận định vào văn bản thật, dễ kiểm chứng.",
            questionEn: "Cheapest way to cut hallucination in AI grading?",
            optionsEn: [
              "Force quoting the original sentence as evidence",
              "Raise the temperature",
              "Shorten the rubric",
              "Hide the score",
            ],
            explanationEn: "Quotes anchor the judgment to the real text and are easy to verify.",
          },
          {
            question: "Với bài tư duy phức tạp, thời điểm phản hồi tốt là?",
            options: ["Ngay lập tức", "Trễ một chút để học sinh tự soát", "Sau một tháng", "Không phản hồi"],
            answer: 1,
            explanation: "Độ trễ vừa phải tạo cơ hội tự điều chỉnh trước khi nhận đáp án.",
            questionEn: "For complex reasoning tasks, good feedback timing is?",
            optionsEn: ["Immediate", "Slightly delayed so learners self-check", "After a month", "No feedback"],
            explanationEn: "A modest delay creates room for self-regulation before the answer arrives.",
          },
        ],
      },
      {
        id: "edtech-prac-5",
        title: "Động lực học tập: SDT, thói quen và chống nghiện điểm",
        titleEn: "Learner Motivation: SDT, Habits and Avoiding Point Addiction",
        level: 3,
        difficulty: "intermediate",
        theory: `## 1. 🔥 Ba nhu cầu tâm lý (Self-Determination Theory)

| Nhu cầu | Nghĩa là | Thiết kế tương ứng |
|---|---|---|
| **Tự chủ** | Tôi được chọn | Cho chọn chủ đề, độ khó, thứ tự |
| **Năng lực** | Tôi đang tiến bộ | Thanh tiến độ theo kỹ năng, không chỉ theo số bài |
| **Kết nối** | Tôi thuộc về đâu đó | Bảng xếp hạng lớp, bình luận của giáo viên |

Thiếu bất kỳ nhu cầu nào thì động lực nội tại tụt nhanh, dù phần thưởng bên ngoài vẫn còn.

## 2. ⚠️ Hiệu ứng phần thưởng lấn át

Nếu điểm và huy hiệu trở thành lý do duy nhất để học, khi ngừng thưởng thì hành vi biến mất. Cách phòng:

- Gắn phần thưởng vào **quá trình** (chuỗi ngày học) chứ không chỉ **kết quả** (điểm cao).
- Phần thưởng bất ngờ tốt hơn phần thưởng hứa trước.
- Luôn hiển thị **ý nghĩa thật**: "Bạn đã đủ vốn từ để đọc một bài báo A2".

## 3. 🔁 Vòng lặp thói quen

\`\`\`
  Gợi nhắc  →  Hành động nhỏ  →  Phần thưởng  →  Đầu tư
  (nhắc 20h)   (1 thẻ từ vựng)   (chuỗi +1)      (đặt mục tiêu ngày mai)
\`\`\`

Chìa khóa là **hành động tối thiểu đủ nhỏ**: một thẻ, một câu, một phút. Bắt đầu mới là phần khó nhất.

## 4. 🧯 Bảo vệ chuỗi ngày học

Chuỗi bị đứt là lý do bỏ cuộc số một. Hãy có:

- 1 vé đóng băng mỗi tuần.
- Mục tiêu tối thiểu linh hoạt vào ngày bận.
- Khôi phục chuỗi bằng một buổi ôn tập bù, không bằng tiền.

## 5. 🛑 Sai lầm thường gặp

1. Bảng xếp hạng toàn hệ thống làm 90% người học thấy mình vô vọng, nên xếp hạng theo nhóm nhỏ.
2. Thông báo đẩy quá nhiều dẫn tới tắt hết thông báo.
3. Chuỗi ngày quá nghiêm khắc, mất một ngày là mất tất cả.
4. Đo thành công bằng thời gian trong ứng dụng thay vì bằng kiến thức giữ được.`,
        theoryEn: `## 1. 🔥 Three psychological needs (Self-Determination Theory)

| Need | Meaning | Matching design |
|---|---|---|
| **Autonomy** | I get to choose | Let learners pick topic, difficulty, order |
| **Competence** | I am improving | Progress bars per skill, not just lesson counts |
| **Relatedness** | I belong somewhere | Class leaderboards, teacher comments |

Starve any one of these and intrinsic motivation drops fast, even when external rewards continue.

## 2. ⚠️ The overjustification effect

If points and badges become the only reason to study, behaviour disappears the moment rewards stop. Countermeasures:

- Attach rewards to the **process** (study streaks) rather than only **outcomes** (high scores).
- Unexpected rewards beat pre-announced ones.
- Always show **real meaning**: "You now know enough words to read an A2 news article".

## 3. 🔁 The habit loop

\`\`\`
  Cue      ->  Tiny action     ->  Reward     ->  Investment
  (8pm ping)   (1 vocab card)     (streak +1)    (set tomorrow's goal)
\`\`\`

The key is making the **minimum action genuinely tiny**: one card, one sentence, one minute. Starting is the hard part.

## 4. 🧯 Protecting the streak

A broken streak is the number one reason people quit. Provide:

- One freeze token per week.
- A flexible minimum goal for busy days.
- Streak recovery through a catch-up review session, not through payment.

## 5. 🛑 Common mistakes

1. Global leaderboards that make 90% of learners feel hopeless; rank within small cohorts instead.
2. Too many push notifications, which leads to all notifications being disabled.
3. Streaks so strict that one missed day wipes everything.
4. Measuring success by time in app instead of knowledge retained.`,
        code: `# Streak with weekly freeze tokens and a flexible minimum goal
from datetime import date, timedelta

def update_streak(state, today, minutes_studied, min_minutes=5):
    last = state["last_day"]
    gap = (today - last).days
    if minutes_studied >= min_minutes:
        state["streak"] = state["streak"] + 1 if gap <= 1 else 1
        state["last_day"] = today
    elif gap == 1 and state["freezes"] > 0:
        state["freezes"] -= 1          # streak survives, day is frozen
        state["last_day"] = today
    elif gap > 1:
        state["streak"] = 0
    return state

s = {"streak": 12, "freezes": 1, "last_day": date(2026, 8, 17)}
print(update_streak(s, date(2026, 8, 18), minutes_studied=0))  # frozen, streak kept`,
        codeLanguage: "python",
        exercise:
          "Thiết kế lại hệ thống điểm của một tính năng bất kỳ sao cho thỏa mãn cả ba nhu cầu SDT và không phụ thuộc hoàn toàn vào phần thưởng bên ngoài.",
        exerciseEn:
          "Redesign the point system of any feature so it satisfies all three SDT needs and does not rely purely on external rewards.",
        quiz: [
          {
            question: "Ba nhu cầu trong SDT là?",
            options: [
              "Tự chủ, năng lực, kết nối",
              "Tiền, điểm, huy hiệu",
              "Tốc độ, chính xác, bền bỉ",
              "Đọc, viết, nói",
            ],
            answer: 0,
            explanation: "Autonomy, competence, relatedness là ba trụ cột của động lực nội tại.",
            questionEn: "The three SDT needs are?",
            optionsEn: [
              "Autonomy, competence, relatedness",
              "Money, points, badges",
              "Speed, accuracy, persistence",
              "Reading, writing, speaking",
            ],
            explanationEn: "Autonomy, competence and relatedness underpin intrinsic motivation.",
          },
          {
            question: "Hiệu ứng phần thưởng lấn át xảy ra khi?",
            options: [
              "Phần thưởng ngoài thay thế động lực nội tại",
              "Học sinh học quá nhiều",
              "Bài quá dễ",
              "Không có bảng xếp hạng",
            ],
            answer: 0,
            explanation: "Khi ngừng thưởng, hành vi biến mất vì lý do bên trong đã bị thay thế.",
            questionEn: "The overjustification effect happens when?",
            optionsEn: [
              "External rewards replace intrinsic motivation",
              "Learners study too much",
              "Lessons are too easy",
              "There is no leaderboard",
            ],
            explanationEn: "Remove the reward and behaviour collapses because the inner reason was displaced.",
          },
          {
            question: "Hành động tối thiểu trong vòng lặp thói quen nên?",
            options: ["Rất nhỏ, khoảng một phút", "Ít nhất 60 phút", "Một bài thi đầy đủ", "Không xác định"],
            answer: 0,
            explanation: "Rào cản khởi động thấp là yếu tố quyết định để thói quen hình thành.",
            questionEn: "The minimum action in a habit loop should be?",
            optionsEn: ["Very tiny, about one minute", "At least 60 minutes", "A full mock exam", "Undefined"],
            explanationEn: "A low starting barrier is what makes the habit stick.",
          },
          {
            question: "Bảng xếp hạng nên thiết kế thế nào để không làm nản lòng?",
            options: [
              "Xếp theo nhóm nhỏ cùng trình độ",
              "Toàn hệ thống, hiển thị top 3",
              "Chỉ hiện người giỏi nhất",
              "Không hiện tiến bộ cá nhân",
            ],
            answer: 0,
            explanation: "Nhóm nhỏ cùng trình độ giúp mỗi người đều thấy cơ hội tiến lên.",
            questionEn: "How should leaderboards be designed to avoid discouragement?",
            optionsEn: [
              "Rank within small, similar-ability cohorts",
              "Global ranking showing only the top 3",
              "Show only the best learner",
              "Hide personal progress",
            ],
            explanationEn: "Small similar-ability cohorts keep advancement plausible for everyone.",
          },
          {
            question: "Chỉ số nào đo thành công tốt hơn?",
            options: ["Thời gian trong ứng dụng", "Kiến thức giữ được sau 30 ngày", "Số lần mở app", "Số thông báo gửi"],
            answer: 1,
            explanation: "Mục tiêu của EdTech là học được, không phải giữ chân người dùng lâu nhất.",
            questionEn: "Which metric measures success better?",
            optionsEn: ["Time in app", "Knowledge retained after 30 days", "App opens", "Notifications sent"],
            explanationEn: "The goal of EdTech is learning, not maximizing time on screen.",
          },
        ],
      },
      {
        id: "edtech-prac-6",
        title: "Khả năng tiếp cận, UDL và sản phẩm đa ngôn ngữ",
        titleEn: "Accessibility, UDL and Multilingual Products",
        level: 3,
        difficulty: "intermediate",
        theory: `## 1. ♿ UDL: ba nguyên tắc

Universal Design for Learning yêu cầu cung cấp nhiều phương án cho:

1. **Cách tiếp nhận** (representation): chữ, âm thanh, hình, phụ đề.
2. **Cách thể hiện** (action and expression): gõ, nói, chọn, vẽ.
3. **Cách tạo động lực** (engagement): chọn chủ đề, mức thử thách, cách ghi nhận.

Thiết kế cho người có nhu cầu đặc biệt gần như luôn làm sản phẩm tốt hơn cho tất cả mọi người.

## 2. 🎯 WCAG những điểm thực dụng nhất

| Hạng mục | Ngưỡng | Cách kiểm tra nhanh |
|---|---|---|
| Tương phản chữ thường | 4.5:1 | Công cụ contrast trong DevTools |
| Tương phản chữ lớn | 3:1 | Áp dụng từ 18.66px đậm trở lên |
| Vùng chạm | tối thiểu 44x44 px | Kiểm tra trên điện thoại thật |
| Bàn phím | mọi thao tác đều dùng được Tab | Rút chuột ra và thử đi hết trang |
| Ảnh có nghĩa | luôn có alt mô tả | Tắt ảnh và đọc lại trang |

## 3. 🔊 Âm thanh và phụ đề

- Mọi audio bài học cần bản chép lời có thể mở ra.
- Video cần phụ đề, không chỉ tự động sinh mà phải soát lại thuật ngữ.
- Cho phép chỉnh tốc độ phát 0.5x tới 1.5x, rất quan trọng với người mới học ngoại ngữ.

## 4. 🌏 Đa ngôn ngữ đúng cách

\`\`\`
  ❌ Ghép chuỗi: "Bạn đã học " + n + " bài"
  ✅ Có tham số và số nhiều: t("lessons_done", { count: n })
\`\`\`

- Tiếng Việt cần chuẩn hóa Unicode NFC để dấu hiển thị đúng trên mọi thiết bị.
- Chừa chỗ cho văn bản dài hơn, bản dịch tiếng Việt và tiếng Phần Lan thường dài hơn tiếng Anh 20 đến 30%.
- Ngày tháng, tiền tệ và tên riêng phải theo locale, không hardcode.
- Nội dung song ngữ phải **cùng độ sâu**, không được rút gọn một bên.

## 5. 🛑 Sai lầm thường gặp

1. Chỉ dùng màu để báo đúng sai, người mù màu không phân biệt được, nên thêm biểu tượng.
2. Đặt chữ lên ảnh nền có độ tương phản thấp.
3. Modal không bẫy tiêu điểm bàn phím nên người dùng bị kẹt.
4. Bản dịch máy không soát, làm sai thuật ngữ chuyên môn.`,
        theoryEn: `## 1. ♿ UDL: three principles

Universal Design for Learning asks for multiple options in:

1. **Representation**: text, audio, visuals, captions.
2. **Action and expression**: typing, speaking, selecting, drawing.
3. **Engagement**: choice of topic, challenge level, and recognition style.

Designing for people with specific needs almost always makes the product better for everyone.

## 2. 🎯 The most practical WCAG points

| Item | Threshold | Quick check |
|---|---|---|
| Body text contrast | 4.5:1 | Contrast tool in DevTools |
| Large text contrast | 3:1 | Applies from 18.66px bold up |
| Touch target | at least 44x44 px | Test on a real phone |
| Keyboard | every action reachable by Tab | Unplug the mouse and traverse the page |
| Meaningful images | always have descriptive alt | Disable images and reread the page |

## 3. 🔊 Audio and captions

- Every lesson audio needs an openable transcript.
- Videos need captions, and auto-generated captions must be proofread for terminology.
- Offer playback speed from 0.5x to 1.5x, which matters enormously for language beginners.

## 4. 🌏 Doing multilingual properly

\`\`\`
  Bad:  string concat: "You finished " + n + " lessons"
  Good: parameters and plurals: t("lessons_done", { count: n })
\`\`\`

- Vietnamese needs Unicode NFC normalization so diacritics render correctly everywhere.
- Leave room for longer strings; Vietnamese and Finnish translations often run 20 to 30% longer than English.
- Dates, currency and proper names must follow the locale rather than being hardcoded.
- Bilingual content must have the **same depth**; never ship an abridged side.

## 5. 🛑 Common mistakes

1. Signalling correctness with colour alone; colour-blind users cannot tell, so add icons.
2. Placing text over low-contrast background images.
3. Modals that do not trap keyboard focus, leaving users stuck.
4. Shipping unreviewed machine translation that mangles domain terminology.`,
        code: `# Quick accessibility audit for a lesson card component
def audit(card):
    issues = []
    if card["contrast_ratio"] < 4.5:
        issues.append("Body text contrast below 4.5:1")
    if min(card["touch_w"], card["touch_h"]) < 44:
        issues.append("Touch target smaller than 44x44 px")
    if card["has_image"] and not card["alt_text"]:
        issues.append("Meaningful image without alt text")
    if card["state_signal"] == "color_only":
        issues.append("Correctness shown by colour only, add an icon")
    if not card["keyboard_reachable"]:
        issues.append("Not reachable by keyboard")
    return issues or ["Passes the basic checks"]

print(audit({
    "contrast_ratio": 3.9, "touch_w": 40, "touch_h": 40, "has_image": True,
    "alt_text": "", "state_signal": "color_only", "keyboard_reachable": True,
}))`,
        codeLanguage: "python",
        exercise:
          "Chạy kiểm tra tiếp cận cho một trang bài học: đo tương phản, đi hết trang chỉ bằng bàn phím, tắt ảnh và liệt kê mọi chỗ mất thông tin.",
        exerciseEn:
          "Run an accessibility pass on one lesson page: measure contrast, traverse it using only the keyboard, disable images, and list every place information is lost.",
        quiz: [
          {
            question: "Ba nguyên tắc của UDL là?",
            options: [
              "Tiếp nhận, thể hiện, động lực",
              "Đọc, viết, nghe",
              "Màu, font, khoảng cách",
              "Web, mobile, máy tính bảng",
            ],
            answer: 0,
            explanation: "Representation, action and expression, engagement.",
            questionEn: "The three UDL principles are?",
            optionsEn: [
              "Representation, expression, engagement",
              "Reading, writing, listening",
              "Colour, font, spacing",
              "Web, mobile, tablet",
            ],
            explanationEn: "Representation, action and expression, and engagement.",
          },
          {
            question: "Tỷ lệ tương phản tối thiểu cho chữ thường theo WCAG AA?",
            options: ["2:1", "3:1", "4.5:1", "10:1"],
            answer: 2,
            explanation: "Chữ lớn được phép 3:1, chữ thường cần 4.5:1.",
            questionEn: "Minimum contrast ratio for body text under WCAG AA?",
            optionsEn: ["2:1", "3:1", "4.5:1", "10:1"],
            explanationEn: "Large text may use 3:1, body text requires 4.5:1.",
          },
          {
            question: "Báo đúng sai chỉ bằng màu là vấn đề vì?",
            options: [
              "Người mù màu không phân biệt được",
              "Màu tốn băng thông",
              "Màu làm chậm trang",
              "Không có vấn đề gì",
            ],
            answer: 0,
            explanation: "Cần thêm biểu tượng hoặc chữ để truyền tải cùng thông tin.",
            questionEn: "Signalling correctness by colour alone is a problem because?",
            optionsEn: [
              "Colour-blind users cannot distinguish it",
              "Colour costs bandwidth",
              "Colour slows the page",
              "It is not a problem",
            ],
            explanationEn: "Add an icon or text so the same information reaches everyone.",
          },
          {
            question: "Vì sao cần chuẩn hóa Unicode NFC cho tiếng Việt?",
            options: [
              "Để dấu hiển thị đúng và tìm kiếm khớp chuỗi",
              "Để giảm dung lượng ảnh",
              "Để tăng tốc mạng",
              "Để đổi font tự động",
            ],
            answer: 0,
            explanation: "Cùng một từ có thể có nhiều dạng mã hóa nếu không chuẩn hóa.",
            questionEn: "Why normalize Vietnamese text to Unicode NFC?",
            optionsEn: [
              "So diacritics render correctly and string search matches",
              "To shrink images",
              "To speed up the network",
              "To switch fonts automatically",
            ],
            explanationEn: "Without normalization the same word can exist in several encodings.",
          },
          {
            question: "Nội dung song ngữ đúng chuẩn phải?",
            options: [
              "Có cùng độ sâu ở cả hai ngôn ngữ",
              "Bản tiếng Anh ngắn hơn cho gọn",
              "Chỉ dịch tiêu đề",
              "Dùng dịch máy không soát",
            ],
            answer: 0,
            explanation: "Người học không được nhận ít nội dung hơn chỉ vì chọn ngôn ngữ khác.",
            questionEn: "Proper bilingual content must?",
            optionsEn: [
              "Have the same depth in both languages",
              "Keep the English side shorter for brevity",
              "Translate only the titles",
              "Use unreviewed machine translation",
            ],
            explanationEn: "No learner should get less content just because of the language they picked.",
          },
        ],
      },
    ],
  },
];
