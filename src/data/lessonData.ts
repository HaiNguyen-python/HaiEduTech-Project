export interface LessonItem {
  id: string;
  title: string;
  titleEn: string;
  icon: string;
  description: string;
  descriptionEn: string;
  lessons: SeedLesson[];
}

export interface SeedLesson {
  id: string;
  title: string;
  titleEn: string;
  content: LessonContent;
}

export interface LessonContent {
  passage?: string;
  points?: LessonPoint[];
  vocabulary?: VocabItem[];
  quiz: QuizQuestion[];
  tips?: string[];
}

export interface LessonPoint {
  rule: string;
  examples: string[];
}

export interface VocabItem {
  word: string;
  pinyin?: string;
  meaning: string;
  example: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

// ============ ENGLISH RESOURCES ============

export const englishResources: LessonItem[] = [
  {
    id: "en-grammar",
    title: "Ngữ pháp cơ bản → Nâng cao",
    titleEn: "Grammar: Basic → Advanced",
    icon: "📝",
    description: "12 thì, câu điều kiện, bị động, mệnh đề quan hệ, đảo ngữ",
    descriptionEn: "12 tenses, conditionals, passive, relative clauses, inversion",
    lessons: [
      {
        id: "en-grammar-1",
        title: "Present Simple vs Present Continuous",
        titleEn: "Present Simple vs Present Continuous",
        content: {
          points: [
            {
              rule: "Present Simple: diễn tả thói quen, sự thật hiển nhiên, lịch trình cố định.",
              examples: [
                "She **works** at a hospital. (thói quen)",
                "The sun **rises** in the east. (sự thật)",
                "The train **leaves** at 8 PM. (lịch trình)",
              ],
            },
            {
              rule: "Present Continuous: hành động đang xảy ra, kế hoạch tương lai gần, sự thay đổi.",
              examples: [
                "He **is studying** for the exam right now.",
                "We **are meeting** the client tomorrow.",
                "The weather **is getting** colder.",
              ],
            },
            {
              rule: "Stative verbs (know, believe, love, own...) KHÔNG dùng continuous.",
              examples: [
                "✅ I **know** the answer. ❌ I am knowing the answer.",
                "✅ She **loves** music. ❌ She is loving music.",
              ],
            },
          ],
          tips: [
            "Từ nhận biết Simple: always, usually, often, every day, never",
            "Từ nhận biết Continuous: now, at the moment, currently, right now",
            "Một số động từ vừa là stative vừa là dynamic: think, have, see → nghĩa thay đổi theo ngữ cảnh",
          ],
          quiz: [
            { question: "She ___ (work) as a nurse at City Hospital.", options: ["works", "is working", "work", "working"], answer: 0, explanation: "Diễn tả nghề nghiệp (thói quen/sự thật) → dùng Present Simple." },
            { question: "Look! The children ___ (play) in the garden.", options: ["play", "plays", "are playing", "is playing"], answer: 2, explanation: "'Look!' cho thấy hành động đang xảy ra → Present Continuous." },
            { question: "I ___ (not/believe) his story.", options: ["am not believing", "don't believe", "doesn't believe", "not believe"], answer: 1, explanation: "'Believe' là stative verb → dùng Present Simple." },
          ],
        },
      },
      {
        id: "en-grammar-2",
        title: "Câu điều kiện loại 1, 2, 3",
        titleEn: "Conditionals Type 1, 2, 3",
        content: {
          points: [
            {
              rule: "Type 1 (có thật ở hiện tại/tương lai): If + S + V(s/es), S + will + V.",
              examples: ["If it **rains**, I **will stay** home.", "If you **study** hard, you **will pass** the exam."],
            },
            {
              rule: "Type 2 (giả định không có thật ở hiện tại): If + S + V(ed/were), S + would + V.",
              examples: ["If I **were** rich, I **would travel** the world.", "If she **knew** the answer, she **would tell** you."],
            },
            {
              rule: "Type 3 (giả định không có thật ở quá khứ): If + S + had + V3, S + would have + V3.",
              examples: ["If I **had studied** harder, I **would have passed**.", "If they **had left** earlier, they **wouldn't have missed** the flight."],
            },
          ],
          tips: [
            "Type 2: luôn dùng 'were' cho tất cả chủ ngữ (If I were, If he were...)",
            "Mixed conditional: If + had V3, S + would + V (quá khứ ảnh hưởng hiện tại)",
            "Unless = If not: Unless you hurry, you'll be late.",
          ],
          quiz: [
            { question: "If I ___ (be) you, I would apologize.", options: ["am", "was", "were", "be"], answer: 2, explanation: "Câu điều kiện loại 2 → dùng 'were' cho mọi chủ ngữ." },
            { question: "If she had known, she ___ (help) us.", options: ["will help", "would help", "would have helped", "helped"], answer: 2, explanation: "Câu điều kiện loại 3 → would have + V3." },
            { question: "If it ___ tomorrow, we'll cancel the picnic.", options: ["rains", "rained", "will rain", "rain"], answer: 0, explanation: "Câu điều kiện loại 1: If + V(s/es)." },
          ],
        },
      },
      {
        id: "en-grammar-3",
        title: "Câu bị động (Passive Voice)",
        titleEn: "Passive Voice",
        content: {
          points: [
            {
              rule: "Công thức: S + be + V3/ed (+ by + agent). Biến đổi tân ngữ thành chủ ngữ.",
              examples: [
                "Active: The chef **cooks** the meal. → Passive: The meal **is cooked** by the chef.",
                "Active: They **built** this bridge in 1990. → Passive: This bridge **was built** in 1990.",
              ],
            },
            {
              rule: "Bị động với modal verbs: S + modal + be + V3.",
              examples: ["This report **must be finished** by Friday.", "The rules **should be followed** strictly."],
            },
            {
              rule: "Bị động kép (câu tường thuật): It is said/believed/reported that...",
              examples: [
                "People say he is rich. → **It is said that** he is rich. / He **is said to be** rich.",
              ],
            },
          ],
          tips: [
            "Không phải lúc nào cũng cần 'by + agent' - bỏ khi agent không quan trọng hoặc hiển nhiên.",
            "Các thì bị động thường gặp trong IELTS: Present Simple, Past Simple, Present Perfect.",
            "Get + V3 dùng trong văn nói: He got fired. (informal)",
          ],
          quiz: [
            { question: "The report ___ (write) by the manager yesterday.", options: ["was written", "is written", "wrote", "has written"], answer: 0, explanation: "'Yesterday' → Past Simple Passive: was/were + V3." },
            { question: "English ___ (speak) in many countries.", options: ["speaks", "is spoken", "spoke", "spoken"], answer: 1, explanation: "Sự thật hiển nhiên → Present Simple Passive." },
            { question: "The homework must ___ before Friday.", options: ["finish", "finished", "be finished", "be finishing"], answer: 2, explanation: "Modal + be + V3 trong câu bị động." },
          ],
        },
      },
    ],
  },
  {
    id: "en-vocabulary",
    title: "Từ vựng Academic IELTS",
    titleEn: "Academic IELTS Vocabulary",
    icon: "🎯",
    description: "2000+ từ vựng Academic theo 20 chủ đề thi IELTS",
    descriptionEn: "2000+ academic words across 20 IELTS exam topics",
    lessons: [
      {
        id: "en-vocab-1",
        title: "Environment & Nature",
        titleEn: "Environment & Nature",
        content: {
          vocabulary: [
            { word: "sustainability", meaning: "tính bền vững", example: "**Sustainability** is crucial for future generations." },
            { word: "deforestation", meaning: "nạn phá rừng", example: "**Deforestation** contributes to climate change significantly." },
            { word: "biodiversity", meaning: "đa dạng sinh học", example: "Protecting **biodiversity** is a global priority." },
            { word: "carbon footprint", meaning: "dấu chân carbon", example: "We should reduce our **carbon footprint** by using public transport." },
            { word: "renewable energy", meaning: "năng lượng tái tạo", example: "Solar and wind are forms of **renewable energy**." },
            { word: "ecosystem", meaning: "hệ sinh thái", example: "Coral reefs are a vital **ecosystem** for marine life." },
          ],
          tips: [
            "Nhóm từ theo chủ đề giúp nhớ nhanh hơn (chunking method)",
            "Dùng collocations: 'environmental degradation', 'carbon emissions', 'ecological balance'",
            "IELTS Writing Task 2 thường có topic về environment - nắm chắc từ vựng này!",
          ],
          quiz: [
            { question: "The ___ of rainforests has led to the extinction of many species.", options: ["deforestation", "sustainability", "biodiversity", "ecosystem"], answer: 0, explanation: "Deforestation (phá rừng) dẫn đến tuyệt chủng - phù hợp ngữ cảnh." },
            { question: "Solar power is a form of ___.", options: ["carbon footprint", "deforestation", "renewable energy", "fossil fuel"], answer: 2, explanation: "Solar power = năng lượng mặt trời = renewable energy." },
            { question: "Protecting ___ means preserving the variety of life on Earth.", options: ["carbon footprint", "biodiversity", "sustainability", "deforestation"], answer: 1, explanation: "Biodiversity = sự đa dạng của sự sống trên Trái Đất." },
          ],
        },
      },
      {
        id: "en-vocab-2",
        title: "Education & Technology",
        titleEn: "Education & Technology",
        content: {
          vocabulary: [
            { word: "curriculum", meaning: "chương trình giảng dạy", example: "The school updated its **curriculum** to include coding." },
            { word: "pedagogy", meaning: "phương pháp sư phạm", example: "Modern **pedagogy** emphasizes student-centered learning." },
            { word: "artificial intelligence", meaning: "trí tuệ nhân tạo", example: "**Artificial intelligence** is transforming education worldwide." },
            { word: "digital literacy", meaning: "kỹ năng số", example: "Students need **digital literacy** skills for the modern workplace." },
            { word: "vocational training", meaning: "đào tạo nghề", example: "**Vocational training** provides practical skills for specific careers." },
          ],
          tips: [
            "IELTS thường hỏi: 'technology in education' - chuẩn bị cả ưu và nhược điểm",
            "Formal synonyms: 'students' → 'learners/pupils', 'teacher' → 'educator/instructor'",
          ],
          quiz: [
            { question: "The national ___ requires all students to study mathematics.", options: ["pedagogy", "curriculum", "literacy", "vocational"], answer: 1, explanation: "Curriculum = chương trình giảng dạy do nhà trường/quốc gia quy định." },
            { question: "___ focuses on hands-on skills rather than academic theory.", options: ["Digital literacy", "Pedagogy", "Vocational training", "Curriculum"], answer: 2, explanation: "Vocational training = đào tạo nghề, tập trung kỹ năng thực hành." },
            { question: "Understanding how to use computers safely is part of ___.", options: ["artificial intelligence", "pedagogy", "digital literacy", "vocational training"], answer: 2, explanation: "Digital literacy = khả năng sử dụng công nghệ số hiệu quả và an toàn." },
          ],
        },
      },
      {
        id: "en-vocab-3",
        title: "Health & Well-being",
        titleEn: "Health & Well-being",
        content: {
          vocabulary: [
            { word: "sedentary lifestyle", meaning: "lối sống ít vận động", example: "A **sedentary lifestyle** increases the risk of heart disease." },
            { word: "mental health", meaning: "sức khỏe tinh thần", example: "Employers are paying more attention to **mental health** in the workplace." },
            { word: "obesity", meaning: "béo phì", example: "Childhood **obesity** has become a serious public health issue." },
            { word: "well-being", meaning: "sự khỏe mạnh toàn diện", example: "Exercise contributes to physical and mental **well-being**." },
            { word: "pandemic", meaning: "đại dịch", example: "The COVID-19 **pandemic** changed the way we work and learn." },
          ],
          tips: [
            "IELTS Writing: 'health' topics cần phân biệt physical health vs mental health",
            "Collocations: 'public health crisis', 'health-conscious', 'preventive measures'",
          ],
          quiz: [
            { question: "Sitting at a desk all day leads to a ___.", options: ["pandemic", "well-being", "sedentary lifestyle", "mental health"], answer: 2, explanation: "Sedentary = ít vận động, ngồi nhiều." },
            { question: "The government launched a campaign to fight childhood ___.", options: ["well-being", "obesity", "pandemic", "sedentary"], answer: 1, explanation: "Obesity = béo phì, đặc biệt ở trẻ em là vấn đề y tế công cộng." },
            { question: "Meditation and yoga can improve your ___.", options: ["obesity", "pandemic", "mental health", "sedentary lifestyle"], answer: 2, explanation: "Thiền và yoga giúp cải thiện sức khỏe tinh thần." },
          ],
        },
      },
    ],
  },
  {
    id: "en-listening",
    title: "Luyện nghe đa cấp độ",
    titleEn: "Multi-level Listening",
    icon: "🎧",
    description: "Podcast, TED Talks, bài nghe IELTS/TOEIC theo cấp độ A1–C1",
    descriptionEn: "Podcasts, TED Talks, IELTS/TOEIC listening graded A1–C1",
    lessons: [
      {
        id: "en-listen-1", title: "Listening Strategies for IELTS", titleEn: "Listening Strategies for IELTS",
        content: {
          points: [
            { rule: "Prediction: Đọc câu hỏi trước khi nghe để dự đoán câu trả lời.", examples: ["Xác định loại thông tin cần tìm: số, tên, địa điểm, thời gian", "Gạch chân keywords trong câu hỏi"] },
            { rule: "Paraphrasing: IELTS luôn diễn đạt lại - không bao giờ copy nguyên văn.", examples: ["'expensive' trong audio = 'costly/pricey' trong đáp án", "'go up' = 'increase/rise'"] },
            { rule: "Signpost words: Lắng nghe từ chuyển ý để bắt đáp án.", examples: ["'However', 'But', 'Actually' → thường đi trước đáp án thật", "'First', 'Then', 'Finally' → giúp theo dõi thứ tự"] },
          ],
          tips: ["Nghe 1.25x speed để luyện tai - khi thi sẽ thấy tốc độ thật chậm hơn", "Section 1 & 2 dễ nhất - đừng để mất điểm ở đây", "Viết đáp án bằng BÚT CHÌ - có 10 phút chuyển đáp án cuối bài"],
          quiz: [
            { question: "Khi nghe thấy 'However' hoặc 'But', điều gì thường xảy ra?", options: ["Thông tin bổ sung", "Đáp án thật sắp xuất hiện", "Kết thúc phần nghe", "Lặp lại thông tin"], answer: 1, explanation: "Signpost words như 'However/But' thường báo hiệu thông tin quan trọng (đáp án) sắp đến." },
            { question: "Tại sao IELTS Listening cần kỹ năng paraphrasing?", options: ["Vì đề thi viết bằng tiếng khác", "Vì audio và câu hỏi dùng từ khác nhau cùng nghĩa", "Vì cần dịch sang tiếng mẹ đẻ", "Vì phải viết lại câu trả lời"], answer: 1, explanation: "IELTS luôn paraphrase - từ trong audio khác với từ trong câu hỏi." },
            { question: "Bạn có bao nhiêu phút để chuyển đáp án?", options: ["5 phút", "10 phút", "15 phút", "Không có thời gian"], answer: 1, explanation: "Cuối bài Listening có 10 phút để chuyển đáp án sang answer sheet." },
          ],
        },
      },
      {
        id: "en-listen-2", title: "Note-taking & Gap-fill", titleEn: "Note-taking & Gap-fill",
        content: {
          points: [
            { rule: "Xác định giới hạn từ: NO MORE THAN TWO WORDS / ONE WORD AND A NUMBER.", examples: ["'large garden' = 2 words ✅", "'a large garden' = 3 words ❌ nếu giới hạn là 2 từ"] },
            { rule: "Spelling counts: Viết sai chính tả = sai hoàn toàn.", examples: ["'Wednesday' không phải 'Wensday'", "'accommodation' có 2 chữ 'c' và 2 chữ 'm'"] },
          ],
          tips: ["Dùng viết tắt khi note: info, govt, approx → rồi viết đầy đủ lúc chuyển đáp án", "Đáp án thường theo thứ tự audio - nếu bỏ lỡ thì bỏ qua, đừng mất câu sau"],
          quiz: [
            { question: "Nếu đề yêu cầu 'NO MORE THAN TWO WORDS', đáp án nào hợp lệ?", options: ["a big house", "big house", "the biggest house", "very big house"], answer: 1, explanation: "'big house' = 2 words, các đáp án khác đều vượt giới hạn." },
            { question: "Viết sai chính tả trong Listening thì sao?", options: ["Được nửa điểm", "Vẫn đúng nếu nghe đúng", "Sai hoàn toàn", "Tuỳ giám khảo"], answer: 2, explanation: "IELTS Listening chấm chính xác - sai chính tả = 0 điểm cho câu đó." },
            { question: "Nếu bỏ lỡ câu 15, bạn nên làm gì?", options: ["Tua lại nghe", "Bỏ qua, tập trung câu 16", "Đoán ngay lập tức", "Hỏi giám thị"], answer: 1, explanation: "Audio chỉ phát 1 lần - bỏ lỡ thì đi tiếp, đừng mất thêm câu sau." },
          ],
        },
      },
      {
        id: "en-listen-3", title: "TOEIC Listening Part 1–4", titleEn: "TOEIC Listening Part 1–4",
        content: {
          points: [
            { rule: "Part 1 (Photos): Mô tả hình ảnh - cẩn thận với similar sounds.", examples: ["'copying' vs 'coping'", "'work' vs 'walk'"] },
            { rule: "Part 3 & 4 (Conversations & Talks): Đọc câu hỏi trước khi nghe.", examples: ["Xác định ai nói, ở đâu, về chủ đề gì", "Chú ý intent questions: 'What does the man imply?'"] },
          ],
          tips: ["TOEIC Listening có 4 accents: Mỹ, Anh, Úc, Canada", "Part 2 không có hình - chỉ nghe → tập trung 100%", "Đáp án 'trap' thường chứa từ giống trong audio nhưng sai nghĩa"],
          quiz: [
            { question: "TOEIC Listening có mấy phần?", options: ["3 phần", "4 phần", "5 phần", "6 phần"], answer: 1, explanation: "TOEIC Listening có 4 parts: Photos, Q&A, Conversations, Talks." },
            { question: "Part 1 yêu cầu bạn làm gì?", options: ["Nghe hội thoại", "Mô tả hình ảnh", "Điền từ vào chỗ trống", "Đọc đoạn văn"], answer: 1, explanation: "Part 1: Nghe 4 câu mô tả và chọn câu đúng nhất với hình." },
            { question: "TOEIC Listening sử dụng bao nhiêu loại accent?", options: ["1 (chỉ Mỹ)", "2 (Mỹ và Anh)", "4 (Mỹ, Anh, Úc, Canada)", "Không xác định"], answer: 2, explanation: "TOEIC sử dụng 4 accents: American, British, Australian, Canadian." },
          ],
        },
      },
    ],
  },
  {
    id: "en-writing",
    title: "Bài mẫu Writing IELTS",
    titleEn: "IELTS Writing Samples",
    icon: "✍️",
    description: "100+ bài mẫu Task 1 & Task 2 band 7.0–8.5 có phân tích chi tiết",
    descriptionEn: "100+ sample essays Task 1 & 2 at band 7.0–8.5 with detailed analysis",
    lessons: [
      {
        id: "en-writing-1", title: "Task 2: Opinion Essay Structure", titleEn: "Task 2: Opinion Essay Structure",
        content: {
          points: [
            { rule: "Cấu trúc 4 đoạn: Introduction → Body 1 → Body 2 → Conclusion.", examples: ["Introduction: Paraphrase đề + nêu quan điểm", "Body: 1 idea chính + explanation + example"] },
            { rule: "Introduction mẫu: 'It is argued that... I completely agree/disagree with this view because...'", examples: ["KHÔNG bắt đầu bằng 'In today's modern world...' - cliché!", "Paraphrase đề bằng synonyms, KHÔNG copy nguyên văn"] },
            { rule: "Kết luận: Tóm tắt lại quan điểm, KHÔNG thêm ý mới.", examples: ["'In conclusion, I firmly believe that...'", "Chỉ cần 2–3 câu, ngắn gọn và rõ ràng"] },
          ],
          tips: ["250+ words minimum - lý tưởng 270–300 words", "Dành 5 phút plan trước khi viết - brainstorm ideas", "Task 2 chiếm 2/3 điểm Writing - ưu tiên hơn Task 1"],
          quiz: [
            { question: "Bài Task 2 nên có bao nhiêu đoạn?", options: ["2–3 đoạn", "4 đoạn", "5–6 đoạn", "Tuỳ ý"], answer: 1, explanation: "Cấu trúc chuẩn: Introduction, Body 1, Body 2, Conclusion = 4 đoạn." },
            { question: "Trong phần Conclusion, bạn nên làm gì?", options: ["Thêm ý mới", "Tóm tắt quan điểm", "Đặt câu hỏi", "Kể chuyện cá nhân"], answer: 1, explanation: "Conclusion chỉ tóm tắt - KHÔNG thêm ý mới hoặc ví dụ mới." },
            { question: "Task 2 chiếm bao nhiêu phần trăm điểm Writing?", options: ["50%", "33%", "66%", "75%"], answer: 2, explanation: "Task 2 = 2/3 tổng điểm Writing, quan trọng hơn Task 1." },
          ],
        },
      },
      {
        id: "en-writing-2", title: "Task 1: Line Graph Description", titleEn: "Task 1: Line Graph Description",
        content: {
          points: [
            { rule: "Mở bài: Paraphrase đề + Overview (xu hướng chính).", examples: ["'The line graph illustrates... Overall, it is clear that...'"] },
            { rule: "Body: Nhóm dữ liệu theo xu hướng tương tự, so sánh.", examples: ["'While X increased sharply, Y remained relatively stable.'", "Dùng số liệu cụ thể: 'rising from 20% to 45% between 2010 and 2020.'"] },
          ],
          tips: ["Overview là phần quan trọng nhất - thiếu overview = mất band", "Dùng đa dạng từ vựng: increase/rise/grow/climb, decrease/fall/drop/decline", "150+ words minimum - không cần dài hơn 180 words"],
          quiz: [
            { question: "Phần nào quan trọng nhất trong Task 1?", options: ["Introduction", "Overview", "Body paragraph", "Conclusion"], answer: 1, explanation: "Thiếu Overview là lỗi nghiêm trọng nhất - ảnh hưởng trực tiếp đến band score." },
            { question: "'The number of students rose dramatically.' - từ nào thể hiện mức tăng?", options: ["number", "students", "rose dramatically", "the"], answer: 2, explanation: "'Rose dramatically' = tăng mạnh - cần đa dạng từ vựng miêu tả xu hướng." },
            { question: "Task 1 yêu cầu tối thiểu bao nhiêu từ?", options: ["100 words", "150 words", "200 words", "250 words"], answer: 1, explanation: "Task 1 yêu cầu minimum 150 words." },
          ],
        },
      },
      {
        id: "en-writing-3", title: "Cohesive Devices & Linking Words", titleEn: "Cohesive Devices & Linking Words",
        content: {
          points: [
            { rule: "Thêm ý: Furthermore, Moreover, In addition, Additionally", examples: ["'Furthermore, education plays a vital role in reducing poverty.'"] },
            { rule: "Đối lập: However, Nevertheless, On the other hand, In contrast", examples: ["'However, not all experts agree with this viewpoint.'"] },
            { rule: "Kết quả: Therefore, Consequently, As a result, Thus", examples: ["'As a result, many young people are choosing to work abroad.'"] },
          ],
          tips: ["KHÔNG lạm dụng linking words - dùng tự nhiên, không nhồi nhét", "Mỗi đoạn dùng 2–3 linking words là đủ", "Band 7+: dùng cả cohesive devices (this, such, the former/latter) chứ không chỉ linking words"],
          quiz: [
            { question: "Từ nối nào thể hiện sự đối lập?", options: ["Furthermore", "However", "Therefore", "In addition"], answer: 1, explanation: "However = tuy nhiên, thể hiện sự đối lập/tương phản." },
            { question: "Lạm dụng linking words sẽ ảnh hưởng đến tiêu chí nào?", options: ["Task Achievement", "Coherence & Cohesion", "Lexical Resource", "Grammar"], answer: 1, explanation: "Dùng linking words không tự nhiên ảnh hưởng trực tiếp đến điểm Coherence & Cohesion." },
            { question: "'___, the government decided to increase funding.' (kết quả)", options: ["However", "In addition", "Consequently", "For example"], answer: 2, explanation: "Consequently = do đó, kết quả - phù hợp ngữ cảnh chỉ kết quả." },
          ],
        },
      },
      {
        id: "en-writing-4", title: "Task 2 Band 7.0: Technology & Society", titleEn: "Task 2 Band 7.0: Technology & Society",
        content: {
          passage: "**Topic:** Some people believe that technology has made our lives more complicated rather than simpler. To what extent do you agree or disagree?\n\n**Band 7.0 Sample:**\n\nIt is often argued that modern technology, despite its intended purpose of simplifying daily life, has actually introduced greater complexity. I partially agree with this viewpoint, as technology has both streamlined certain activities and created new challenges.\n\nOn the one hand, technology has undeniably made many aspects of life more convenient. For instance, online banking and digital payment systems have eliminated the need to visit physical branches, saving considerable time. Similarly, communication tools such as video conferencing platforms have enabled people to connect with others across the globe instantly, which was previously impossible.\n\nOn the other hand, the rapid pace of technological change has introduced significant complications. Individuals now face constant notifications, information overload, and the pressure to remain digitally connected at all times. Furthermore, cybersecurity threats such as identity theft and data breaches have created entirely new categories of risk that did not exist in pre-digital societies.\n\nIn conclusion, while technology has genuinely simplified many practical tasks, it has simultaneously introduced complexities that require careful management. The key lies in developing digital literacy skills to harness the benefits while mitigating the drawbacks.\n\n**(Word count: 172)**",
          points: [
            { rule: "📊 Phân tích từ vựng ăn điểm (Lexical Resource):", examples: ["**streamlined** = làm cho hiệu quả hơn", "**eliminated the need** = loại bỏ sự cần thiết", "**information overload** = quá tải thông tin", "**harness the benefits** = tận dụng lợi ích", "**mitigating the drawbacks** = giảm thiểu hạn chế"] },
            { rule: "📐 Cấu trúc ngữ pháp nổi bật:", examples: ["'It is often argued that...' - passive voice mở bài academic", "'Despite its intended purpose of + V-ing' - mệnh đề nhượng bộ", "'...which was previously impossible' - relative clause bổ nghĩa", "'The key lies in + V-ing' - cấu trúc kết luận tinh tế"] },
          ],
          tips: ["Band 7.0: Có ý tưởng rõ ràng, từ vựng đa dạng nhưng đôi chỗ còn lặp", "Cần thêm ví dụ cụ thể hơn và phát triển ý sâu hơn để lên 7.5+", "Bài này thiếu số liệu/ví dụ cụ thể - nên thêm: 'According to a survey...'"],
          quiz: [
            { question: "'Streamlined' trong bài có nghĩa gì?", options: ["Phức tạp hoá", "Làm hiệu quả, gọn gàng hơn", "Loại bỏ hoàn toàn", "Thay đổi hoàn toàn"], answer: 1, explanation: "'Streamline' = làm cho quy trình hiệu quả, nhanh hơn, bớt rườm rà." },
            { question: "Bài viết thuộc dạng nào?", options: ["Agree/Disagree", "Discussion", "Problem-Solution", "Advantages-Disadvantages"], answer: 0, explanation: "Đề hỏi 'To what extent do you agree or disagree?' = dạng Opinion/Agree-Disagree." },
            { question: "Để lên Band 7.5+, bài này cần cải thiện điều gì?", options: ["Thêm linking words", "Thêm ví dụ cụ thể và số liệu", "Viết dài hơn 300 từ", "Dùng nhiều idioms hơn"], answer: 1, explanation: "Band 7.5+ cần ví dụ cụ thể (specific examples) và phát triển ý sâu hơn." },
          ],
        },
      },
      {
        id: "en-writing-5", title: "Task 2 Band 7.5: Education System", titleEn: "Task 2 Band 7.5: Education System",
        content: {
          passage: "**Topic:** Some people think that the best way to improve education is to increase teacher salaries. Others believe there are better ways. Discuss both views and give your own opinion.\n\n**Band 7.5 Sample:**\n\nThe quality of education is a subject of ongoing debate, with some advocating for higher teacher salaries as the primary solution, while others propose alternative approaches. This essay will examine both perspectives before presenting my own viewpoint.\n\nProponents of salary increases argue that **competitive remuneration** attracts and retains talented individuals in the teaching profession. In countries such as Finland and Singapore, where teachers receive **above-average salaries**, student outcomes consistently rank among the highest globally. When educators feel financially valued, their **job satisfaction** and **commitment to professional development** tend to increase substantially.\n\nHowever, others contend that factors beyond pay are equally, if not more, important. Investment in **modern teaching resources**, including interactive technology and **updated curricula**, can directly enhance the learning experience. Additionally, reducing **class sizes** and providing teachers with **ongoing professional training** may yield more immediate improvements in educational quality.\n\nIn my opinion, a **multifaceted approach** is most effective. While raising teacher salaries is a necessary step to attract high-calibre candidates, it must be complemented by systemic reforms that address classroom conditions, resource availability, and **pedagogical innovation**.\n\n**(Word count: 186)**",
          points: [
            { rule: "📊 Từ vựng Band 7.5 (Lexical Resource):", examples: ["**competitive remuneration** = mức lương cạnh tranh", "**above-average salaries** = mức lương trên trung bình", "**commitment to professional development** = cam kết phát triển chuyên môn", "**multifaceted approach** = cách tiếp cận đa chiều", "**pedagogical innovation** = đổi mới phương pháp sư phạm", "**high-calibre candidates** = ứng viên chất lượng cao"] },
            { rule: "📐 Cấu trúc ngữ pháp Band 7.5:", examples: ["'...with some advocating for..., while others propose...' - complex sentence mở bài", "'In countries such as Finland and Singapore, where...' - relative clause + examples", "'...equally, if not more, important' - cấu trúc so sánh nâng cao", "'...it must be complemented by...' - passive voice trong kết luận"] },
          ],
          tips: ["Band 7.5 đạt được nhờ: ý tưởng phát triển tốt + ví dụ cụ thể (Finland, Singapore)", "Cấu trúc Discussion essay: cả 2 views đều được phân tích kỹ + opinion rõ ràng", "Từ vựng academic nhưng tự nhiên, không gượng ép"],
          quiz: [
            { question: "'Competitive remuneration' nghĩa là gì?", options: ["Phần thưởng cạnh tranh", "Mức lương cạnh tranh", "Thi đấu thù lao", "Đãi ngộ đặc biệt"], answer: 1, explanation: "'Remuneration' = thù lao, lương thưởng. 'Competitive remuneration' = mức lương đủ hấp dẫn để cạnh tranh." },
            { question: "Bài này thuộc dạng essay nào?", options: ["Opinion Essay", "Discussion Essay", "Problem-Solution", "Cause-Effect"], answer: 1, explanation: "'Discuss both views and give your own opinion' = Discussion Essay." },
            { question: "'Multifaceted approach' dùng trong trường hợp nào?", options: ["Khi chỉ có 1 giải pháp duy nhất", "Khi cần kết hợp nhiều giải pháp", "Khi phản đối hoàn toàn", "Khi không có giải pháp"], answer: 1, explanation: "'Multifaceted' = đa chiều, nhiều mặt → cần nhiều giải pháp kết hợp." },
          ],
        },
      },
      {
        id: "en-writing-6", title: "Task 1 Band 7.0: Bar Chart", titleEn: "Task 1 Band 7.0: Bar Chart",
        content: {
          passage: "**Topic:** The bar chart shows the percentage of people in three countries who used the Internet for different purposes in 2023.\n\n**Band 7.0 Sample:**\n\nThe bar chart **illustrates** the proportion of Internet users in the USA, Germany, and Japan who engaged in four online activities - social media, online shopping, banking, and streaming - in 2023.\n\n**Overall**, social media was the most popular activity in all three countries, while online banking had the lowest usage rates. The USA consistently showed the highest percentages across all categories.\n\nIn terms of social media, the USA led with 82%, followed closely by Germany at 76%, and Japan at 68%. A similar pattern was observed for online shopping, where American users accounted for 74%, compared to 65% for Germany and 58% for Japan.\n\nRegarding online banking and streaming, the **disparities** were more **pronounced**. Only 42% of Japanese users engaged in online banking, significantly lower than the USA's 71% and Germany's 63%. However, streaming figures were relatively **comparable**, ranging from 55% in Japan to 67% in the USA.\n\n**(Word count: 152)**",
          points: [
            { rule: "📊 Từ vựng mô tả biểu đồ (Data Description):", examples: ["**illustrates** = minh họa (thay cho 'shows')", "**the proportion of** = tỷ lệ của", "**disparities** = sự chênh lệch", "**pronounced** = rõ rệt, đáng kể", "**comparable** = tương đương, có thể so sánh", "**accounted for** = chiếm (tỷ lệ)"] },
            { rule: "📐 Cấu trúc mô tả số liệu:", examples: ["'...led with 82%, followed closely by Germany at 76%' - so sánh + số liệu cụ thể", "'A similar pattern was observed for...' - transition giữa các nhóm dữ liệu", "'...significantly lower than...' - so sánh mức độ chênh lệch", "'...ranging from 55% to 67%' - diễn tả khoảng dao động"] },
          ],
          tips: ["Task 1 Band 7.0: Overview rõ ràng + nhóm dữ liệu logic + từ vựng đa dạng", "KHÔNG liệt kê số liệu theo thứ tự - phải NHÓM theo xu hướng tương tự", "Luôn có Overview ngay sau mở bài - thiếu Overview = mất 1 band"],
          quiz: [
            { question: "'Disparities' có nghĩa gì?", options: ["Sự giống nhau", "Sự chênh lệch", "Sự ổn định", "Sự tăng trưởng"], answer: 1, explanation: "'Disparity' = sự chênh lệch, khác biệt rõ rệt giữa các nhóm." },
            { question: "Trong Task 1, phần nào KHÔNG nên có?", options: ["Overview", "Số liệu cụ thể", "Ý kiến cá nhân", "So sánh dữ liệu"], answer: 2, explanation: "Task 1 chỉ mô tả dữ liệu - KHÔNG đưa ý kiến cá nhân." },
            { question: "'Accounted for 74%' có nghĩa gì?", options: ["Tính toán 74%", "Chiếm 74%", "Giảm 74%", "Tăng 74%"], answer: 1, explanation: "'Account for' = chiếm (một tỷ lệ nào đó)." },
          ],
        },
      },
      {
        id: "en-writing-7", title: "Task 2 Band 8.0: Environment", titleEn: "Task 2 Band 8.0: Environment",
        content: {
          passage: "**Topic:** Environmental problems are too big for individuals to solve. Only governments and large companies can make a real difference. To what extent do you agree or disagree?\n\n**Band 8.0 Sample:**\n\nThe **escalating severity** of environmental challenges has prompted debate over whether individuals can meaningfully contribute to solutions, or whether responsibility should rest primarily with governments and corporations. While I acknowledge the **indispensable role** of institutional action, I believe that individual contributions remain **fundamentally important**.\n\nUndoubtedly, governments possess the **legislative authority** to enact policies that drive systemic change. For example, the European Union's carbon emissions trading scheme has **demonstrably reduced** industrial pollution across member states by approximately 35% since its inception. Similarly, multinational corporations can invest in **sustainable supply chains** and renewable energy infrastructure at a scale that individuals simply cannot match.\n\nNevertheless, dismissing individual action would be a **grave oversight**. Consumer behaviour collectively shapes market demand; when millions of consumers opt for **sustainably sourced** products, companies are compelled to adapt their practices. Moreover, grassroots movements such as Fridays for Future, initiated by a single individual, have successfully pressured governments worldwide to **accelerate climate legislation**.\n\nIn conclusion, while institutional actors are essential for implementing **large-scale environmental reforms**, individual actions serve as the **catalyst** that drives policy change and corporate accountability. A **synergistic approach** combining both is paramount.\n\n**(Word count: 188)**",
          points: [
            { rule: "📊 Từ vựng Band 8.0 - Academic & Precise:", examples: ["**escalating severity** = mức độ nghiêm trọng ngày càng tăng", "**indispensable role** = vai trò không thể thiếu", "**legislative authority** = quyền lập pháp", "**demonstrably reduced** = giảm một cách có thể chứng minh được", "**grave oversight** = sự bỏ qua nghiêm trọng", "**synergistic approach** = cách tiếp cận phối hợp tạo hiệu ứng cộng hưởng"] },
            { rule: "📐 Cấu trúc Band 8.0 - Sophisticated & Varied:", examples: ["'While I acknowledge..., I believe...' - nhượng bộ + quan điểm rõ ràng", "'...has demonstrably reduced... by approximately 35% since its inception' - passive + data", "'...when millions of consumers opt for..., companies are compelled to...' - conditional logic", "Kết luận: 'A synergistic approach combining both is paramount' - cô đọng, mạnh mẽ"] },
          ],
          tips: ["Band 8.0: Từ vựng chính xác, ít lỗi, ý tưởng phát triển sâu với ví dụ cụ thể (EU carbon trading, Fridays for Future)", "Sử dụng less common vocabulary tự nhiên: 'demonstrably', 'compelled', 'paramount'", "Cấu trúc câu đa dạng: simple + compound + complex sentences xen kẽ"],
          quiz: [
            { question: "'Synergistic approach' nghĩa là gì?", options: ["Cách tiếp cận đơn lẻ", "Cách tiếp cận phối hợp tạo hiệu ứng cộng hưởng", "Cách tiếp cận tiêu cực", "Cách tiếp cận truyền thống"], answer: 1, explanation: "'Synergy' = sức mạnh cộng hưởng → 'synergistic approach' = kết hợp nhiều bên tạo hiệu quả lớn hơn." },
            { question: "Ví dụ nào trong bài thể hiện sức mạnh cá nhân?", options: ["EU carbon trading", "Sustainable supply chains", "Fridays for Future movement", "Renewable energy infrastructure"], answer: 2, explanation: "Fridays for Future - bắt đầu từ 1 cá nhân (Greta Thunberg) nhưng ảnh hưởng toàn cầu." },
            { question: "'Grave oversight' có nghĩa gì?", options: ["Tầm nhìn rộng", "Sự bỏ qua nghiêm trọng", "Đánh giá cao", "Phát hiện quan trọng"], answer: 1, explanation: "'Grave' = nghiêm trọng, 'oversight' = sự bỏ qua → sai lầm nghiêm trọng khi bỏ qua." },
          ],
        },
      },
      {
        id: "en-writing-8", title: "Task 2 Band 8.5: Globalisation", titleEn: "Task 2 Band 8.5: Globalisation",
        content: {
          passage: "**Topic:** Globalisation has brought more benefits than drawbacks to developing countries. Do you agree or disagree?\n\n**Band 8.5 Sample:**\n\nThe **inexorable march** of globalisation has profoundly reshaped the economic and cultural landscapes of developing nations. While acknowledging that this phenomenon carries certain risks, I **contend** that its benefits substantially outweigh its disadvantages.\n\nThe most **compelling argument** in favour of globalisation lies in its capacity to **catalyse economic growth**. Foreign direct investment from multinational enterprises has created millions of jobs in countries such as Vietnam and Bangladesh, where the manufacturing sector now contributes over 25% of GDP. Furthermore, **technology transfer** - a direct consequence of global economic integration - has enabled developing nations to **leapfrog** traditional development stages, as exemplified by Kenya's mobile banking revolution through M-Pesa.\n\nCritics, however, raise **legitimate concerns** about cultural **homogenisation** and economic dependency. The proliferation of Western brands and media content threatens to **erode indigenous traditions**, while developing economies may become **disproportionately vulnerable** to global market fluctuations. The 2008 financial crisis, for instance, devastated export-dependent economies in Southeast Asia.\n\nNevertheless, these drawbacks can be **mitigated through judicious policymaking**. Nations like South Korea have demonstrated that it is possible to embrace globalisation while **preserving cultural identity** and building **economic resilience**. The key lies not in resisting globalisation but in **navigating it strategically**.\n\n**(Word count: 196)**",
          points: [
            { rule: "📊 Từ vựng Band 8.5 - Exceptional Range:", examples: ["**inexorable march** = bước tiến không thể ngăn cản", "**catalyse economic growth** = thúc đẩy tăng trưởng kinh tế", "**leapfrog development stages** = nhảy cóc qua các giai đoạn phát triển", "**cultural homogenisation** = đồng nhất hóa văn hóa", "**disproportionately vulnerable** = dễ tổn thương một cách bất cân xứng", "**judicious policymaking** = hoạch định chính sách khôn ngoan", "**navigating it strategically** = định hướng một cách chiến lược"] },
            { rule: "📐 Cấu trúc Band 8.5 - Masterful:", examples: ["'While acknowledging that..., I contend that...' - nhượng bộ phức tạp", "'...as exemplified by Kenya's mobile banking revolution through M-Pesa' - ví dụ cụ thể, thuyết phục", "'The key lies not in... but in...' - cấu trúc đối lập tinh tế", "Bài có thesis rõ → body 1 (ủng hộ) → body 2 (phản biện) → body 3 (phản biện lại) → conclusion"] },
          ],
          tips: ["Band 8.5: Từ vựng hiếm nhưng chính xác tuyệt đối, hầu như không có lỗi", "Ví dụ cực kỳ cụ thể: M-Pesa (Kenya), 2008 crisis, Vietnam/Bangladesh/South Korea", "4 đoạn body thay vì 2 - thể hiện khả năng phát triển ý đa chiều", "Kết luận không chỉ tóm tắt mà đưa ra 'way forward' - rất ấn tượng"],
          quiz: [
            { question: "'Leapfrog development stages' nghĩa là gì?", options: ["Quay lại giai đoạn trước", "Nhảy cóc qua các giai đoạn phát triển", "Phát triển chậm dần", "Dừng phát triển"], answer: 1, explanation: "'Leapfrog' = nhảy cóc → bỏ qua bước trung gian, tiến thẳng lên bước cao hơn (ví dụ: M-Pesa bỏ qua ngân hàng truyền thống)." },
            { question: "M-Pesa được dùng làm ví dụ cho điều gì?", options: ["Cultural homogenisation", "Economic dependency", "Technology transfer và leapfrog development", "Global market fluctuations"], answer: 2, explanation: "M-Pesa là ví dụ cho technology transfer - Kenya nhảy cóc qua hệ thống ngân hàng truyền thống nhờ mobile banking." },
            { question: "Band 8.5 khác Band 7.5 ở điểm nào rõ nhất?", options: ["Viết dài hơn", "Dùng nhiều linking words hơn", "Từ vựng hiếm + ví dụ cực kỳ cụ thể + phát triển ý đa chiều", "Dùng nhiều idioms"], answer: 2, explanation: "Band 8.5 nổi bật nhờ less common vocabulary dùng chính xác + ví dụ cụ thể có dữ liệu + phân tích đa chiều." },
          ],
        },
      },
      {
        id: "en-writing-9", title: "Task 1 Band 8.0: Process Diagram", titleEn: "Task 1 Band 8.0: Process Diagram",
        content: {
          passage: "**Topic:** The diagram shows the process of recycling plastic bottles.\n\n**Band 8.0 Sample:**\n\nThe diagram **delineates** the sequential process by which used plastic bottles are recycled into new products, encompassing seven distinct stages from collection to manufacturing.\n\n**Overall**, the process is **cyclical** in nature, beginning with consumer disposal and culminating in the production of new plastic items, which then re-enter the consumption cycle.\n\nIn the **initial phase**, consumers deposit used bottles into designated recycling bins. These are subsequently collected by specialised vehicles and transported to a **sorting facility**, where they are separated by colour and plastic type using both manual and automated systems.\n\nFollowing sorting, the bottles undergo **mechanical shredding** into small flakes, which are then thoroughly washed to remove contaminants such as labels and adhesive residue. The cleaned flakes are **subjected to** a melting process at approximately 260°C, transforming them into **homogeneous pellets**.\n\nIn the **final stages**, these pellets serve as raw material for manufacturers, who mould them into new bottles, containers, or textile fibres. The **regenerated products** are then distributed to retailers, thereby completing the recycling loop.\n\n**(Word count: 168)**",
          points: [
            { rule: "📊 Từ vựng mô tả quy trình (Process Vocabulary):", examples: ["**delineates** = mô tả chi tiết (thay cho 'shows')", "**sequential process** = quy trình tuần tự", "**cyclical in nature** = có tính chất tuần hoàn", "**subjected to** = trải qua (quá trình nào đó)", "**homogeneous pellets** = viên nhựa đồng nhất", "**regenerated products** = sản phẩm tái sinh"] },
            { rule: "📐 Cấu trúc mô tả quy trình:", examples: ["Passive voice xuyên suốt: 'are collected', 'are separated', 'are subjected to'", "'Following sorting, the bottles undergo...' - transition mượt mà", "'...which then re-enter the consumption cycle' - thể hiện tính tuần hoàn", "Sequencing: 'In the initial phase' → 'Following' → 'then' → 'In the final stages'"] },
          ],
          tips: ["Process diagram: LUÔN dùng passive voice - focus vào quá trình, không phải người thực hiện", "Overview phải nêu: quy trình có bao nhiêu bước + tính chất (tuyến tính hay tuần hoàn)", "Dùng sequencing words đa dạng: initially, subsequently, following this, in the final stage"],
          quiz: [
            { question: "Tại sao Process Diagram nên dùng Passive Voice?", options: ["Vì ngắn gọn hơn", "Vì focus vào quá trình, không phải người thực hiện", "Vì dễ viết hơn Active", "Vì giám khảo thích passive"], answer: 1, explanation: "Process = mô tả các bước → quan trọng là WHAT happens, không phải WHO does it." },
            { question: "'Delineates' là từ thay thế cho từ nào?", options: ["Describes", "Shows", "Illustrates", "Tất cả đều đúng"], answer: 3, explanation: "'Delineates' = mô tả chi tiết, có thể thay cho shows/illustrates/describes trong mở bài." },
            { question: "'Cyclical in nature' mô tả quy trình như thế nào?", options: ["Một chiều, không lặp lại", "Tuần hoàn, lặp lại", "Ngẫu nhiên", "Song song"], answer: 1, explanation: "'Cyclical' = tuần hoàn - sản phẩm cuối quay lại thành nguyên liệu đầu." },
          ],
        },
      },
      {
        id: "en-writing-10", title: "Task 2 Band 6.5: Health & Lifestyle", titleEn: "Task 2 Band 6.5: Health & Lifestyle",
        content: {
          passage: "**Topic:** In many countries, people are becoming less physically active. What are the causes of this trend, and what measures can be taken to address it?\n\n**Band 6.5 Sample:**\n\nNowadays, many people around the world are becoming less active. This essay will discuss the main causes of this problem and suggest some solutions.\n\nOne of the main reasons is the change in working conditions. Many jobs now require people to sit at a desk and use a computer for long hours. For example, office workers often spend 8 hours sitting without much movement. In addition, technology like smartphones and social media encourages people to spend their free time indoors instead of doing exercise.\n\nAnother cause is the lack of sports facilities in some areas. In many cities, there are not enough parks or gyms for people to exercise. Also, gym memberships can be expensive, which makes it harder for low-income people to stay active.\n\nTo solve this problem, governments should build more public sports facilities such as free outdoor gyms and running tracks. Companies can also help by giving employees time for exercise during work hours. Furthermore, schools should increase the number of physical education classes to help children develop healthy habits.\n\nIn conclusion, the decrease in physical activity is caused by modern lifestyles and lack of facilities, but it can be addressed through government, workplace, and school initiatives.\n\n**(Word count: 195)**",
          points: [
            { rule: "📊 Phân tích Band 6.5 - Điểm mạnh:", examples: ["Cấu trúc bài rõ ràng: Introduction → Causes → Solutions → Conclusion", "Ý tưởng hợp lý và có ví dụ cơ bản", "Linking words cơ bản nhưng đúng: 'In addition', 'Furthermore', 'Also'"] },
            { rule: "📊 Điểm yếu cần cải thiện để lên Band 7.0:", examples: ["Từ vựng còn đơn giản: 'becoming less active' → nên dùng '**sedentary lifestyle**'", "'Many jobs' → '**the majority of white-collar occupations**'", "'not enough parks' → '**insufficient recreational infrastructure**'", "'expensive' → '**prohibitively costly**'", "Thiếu collocation nâng cao và cấu trúc phức tạp"] },
          ],
          tips: ["Band 6.5 → 7.0: Thay từ đơn giản bằng academic vocabulary + thêm ví dụ cụ thể hơn", "Mở bài 'Nowadays, many people...' quá generic → thử: 'The prevalence of sedentary lifestyles has become a pressing public health concern'", "Kết luận tốt hơn nếu có 'future outlook': 'If these measures are implemented...'"],
          quiz: [
            { question: "Bài Band 6.5 này thiếu điều gì nhất?", options: ["Cấu trúc bài", "Từ vựng academic nâng cao", "Linking words", "Số đoạn văn"], answer: 1, explanation: "Band 6.5 thường thiếu less common vocabulary - dùng từ quá đơn giản và lặp lại." },
            { question: "'Sedentary lifestyle' là cách nói nâng cao hơn cho?", options: ["Active lifestyle", "Becoming less active", "Healthy lifestyle", "Modern lifestyle"], answer: 1, explanation: "'Sedentary lifestyle' = lối sống ít vận động - academic hơn 'becoming less active'." },
            { question: "Bài thuộc dạng essay nào?", options: ["Opinion", "Discussion", "Cause-Solution", "Advantages-Disadvantages"], answer: 2, explanation: "'What are the causes... and what measures...' = Cause-Solution essay." },
          ],
        },
      },
      {
        id: "en-writing-11", title: "Task 1 Band 7.5: Table Data", titleEn: "Task 1 Band 7.5: Table Data",
        content: {
          passage: "**Topic:** The table shows the percentage of household income spent on food and drink in five countries in 1990 and 2020.\n\n**Band 7.5 Sample:**\n\nThe table **compares** the proportion of household income **allocated to** food and drink expenditure across five nations - the USA, UK, Japan, Brazil, and India - over a 30-year period.\n\n**Overall**, all countries experienced a **decline** in the share of income devoted to food, although **considerable disparities** remained between developed and developing nations.\n\nIn 1990, Indian households spent the highest proportion of their income on food and drink, at 52%, while the USA had the lowest figure at just 15%. The UK and Japan fell in between, at 22% and 26% respectively, with Brazil spending 35%.\n\nBy 2020, **across-the-board reductions** were evident. India's figure dropped to 34%, representing the most **dramatic decrease** of 18 percentage points. The USA and UK saw **more modest declines** to 10% and 15% respectively. Notably, despite the overall downward trend, India and Brazil still **allocated a considerably larger share** of household income to food compared to their developed counterparts.\n\n**(Word count: 160)**",
          points: [
            { rule: "📊 Từ vựng mô tả bảng số liệu:", examples: ["**allocated to** = phân bổ cho", "**across-the-board reductions** = giảm toàn diện ở mọi mục", "**dramatic decrease** = giảm mạnh, đáng kể", "**more modest declines** = giảm nhẹ hơn", "**developed counterparts** = các quốc gia phát triển tương ứng"] },
            { rule: "📐 Kỹ thuật so sánh số liệu:", examples: ["'...representing the most dramatic decrease of 18 percentage points' - dùng 'percentage points' thay vì '%'", "'...fell in between, at 22% and 26% respectively' - 'respectively' khi liệt kê", "'...despite the overall downward trend' - mệnh đề nhượng bộ với dữ liệu"] },
          ],
          tips: ["Table: Nhóm theo xu hướng (tăng vs giảm) hoặc theo nhóm quốc gia (developed vs developing)", "Phân biệt: '18 percentage points' vs '18%' - ví dụ: từ 52% giảm còn 34% = giảm 18 percentage POINTS (không phải 18%)", "Band 7.5: So sánh có chiều sâu + dùng approximation: 'approximately', 'roughly', 'just over'"],
          quiz: [
            { question: "Từ 52% giảm còn 34%, giảm bao nhiêu?", options: ["18%", "18 percentage points", "34%", "52%"], answer: 1, explanation: "52% - 34% = 18 PERCENTAGE POINTS (không nói '18%' vì 18% của 52% = 9.36%)." },
            { question: "'Across-the-board reductions' có nghĩa gì?", options: ["Giảm ở một số mục", "Giảm toàn diện, đồng đều", "Tăng toàn bộ", "Không thay đổi"], answer: 1, explanation: "'Across the board' = toàn diện, áp dụng cho tất cả." },
            { question: "'Respectively' được dùng khi nào?", options: ["Khi so sánh 2 thứ", "Khi liệt kê theo đúng thứ tự đã nêu", "Khi kết luận", "Khi phản biện"], answer: 1, explanation: "'Respectively' = theo thứ tự tương ứng đã đề cập trước đó." },
          ],
        },
      },
      {
        id: "en-writing-12", title: "Task 2 Band 7.0: Crime & Punishment", titleEn: "Task 2 Band 7.0: Crime & Punishment",
        content: {
          passage: "**Topic:** Some people think that the most effective way to reduce crime is to give longer prison sentences. Others believe that there are better methods. Discuss both views and give your opinion.\n\n**Band 7.0 Sample:**\n\nCrime reduction is a **pressing concern** in many societies, and opinions differ on whether longer prison sentences are the most effective approach. This essay will examine both perspectives.\n\nAdvocates of **harsher sentences** argue that the threat of prolonged imprisonment serves as a strong **deterrent**. When potential offenders are aware that they face years in prison, they may think twice before committing crimes. Additionally, longer sentences keep dangerous criminals away from society for extended periods, thereby **enhancing public safety**.\n\nHowever, others maintain that **alternative measures** are more effective in the long run. Investment in education and **rehabilitation programmes** can address the **root causes** of crime, such as poverty and lack of opportunities. For example, Norway's prison system, which focuses on rehabilitation rather than punishment, has one of the **lowest recidivism rates** in the world at around 20%.\n\nIn my view, while severe sentences have a role in dealing with violent criminals, a **holistic approach** that combines punishment with rehabilitation and social programmes would yield more **sustainable results**.\n\n**(Word count: 170)**",
          points: [
            { rule: "📊 Từ vựng chủ đề Crime Band 7.0:", examples: ["**pressing concern** = mối quan ngại cấp bách", "**deterrent** = biện pháp răn đe", "**harsher sentences** = án phạt nghiêm khắc hơn", "**rehabilitation programmes** = chương trình phục hồi", "**recidivism rates** = tỷ lệ tái phạm", "**holistic approach** = cách tiếp cận toàn diện"] },
            { rule: "📐 Cấu trúc nổi bật:", examples: ["'...the threat of prolonged imprisonment serves as a strong deterrent' - subject + verb chuẩn academic", "'...which focuses on rehabilitation rather than punishment' - relative clause + contrast", "'...would yield more sustainable results' - 'yield results' thay cho 'give results'"] },
          ],
          tips: ["Crime topics: nhớ cặp từ - crime/criminal, offend/offender, imprison/imprisonment, rehabilitate/rehabilitation", "Ví dụ Norway rất thuyết phục vì có số liệu cụ thể (20% recidivism rate)", "Band 7.0 discussion: cần balance cả 2 views + opinion rõ ở conclusion"],
          quiz: [
            { question: "'Recidivism' nghĩa là gì?", options: ["Số vụ phạm tội", "Tỷ lệ tái phạm", "Mức án phạt", "Số tù nhân"], answer: 1, explanation: "'Recidivism' = tái phạm tội - quay lại phạm tội sau khi đã chấp hành xong án." },
            { question: "'Deterrent' có chức năng gì?", options: ["Khuyến khích hành vi tốt", "Ngăn chặn, răn đe hành vi xấu", "Phục hồi tù nhân", "Giáo dục cộng đồng"], answer: 1, explanation: "'Deterrent' = biện pháp răn đe - ngăn người ta phạm tội vì sợ hậu quả." },
            { question: "'Holistic approach' phù hợp nhất trong trường hợp nào?", options: ["Chỉ tăng án phạt", "Chỉ giáo dục", "Kết hợp nhiều biện pháp đồng thời", "Không làm gì"], answer: 2, explanation: "'Holistic' = toàn diện → kết hợp punishment + rehabilitation + social programmes." },
          ],
        },
      },
      {
        id: "en-writing-13", title: "Task 2 Band 8.0: Work-Life Balance", titleEn: "Task 2 Band 8.0: Work-Life Balance",
        content: {
          passage: "**Topic:** Many people find it difficult to balance their work and personal lives. What are the reasons for this? What can employers do to help?\n\n**Band 8.0 Sample:**\n\nThe **blurring of boundaries** between professional obligations and personal life has become an increasingly **pervasive** challenge in contemporary society. Several factors contribute to this phenomenon, and employers bear a significant responsibility in **facilitating a healthier equilibrium**.\n\nThe **proliferation of digital communication tools** is arguably the primary catalyst for this imbalance. Smartphones and email have created an expectation of **perpetual availability**, with many employees feeling compelled to respond to work-related messages well beyond office hours. Compounding this issue, the rise of remote work - accelerated by the pandemic - has **dissolved the physical demarcation** between workspace and home, making it increasingly difficult to establish clear boundaries.\n\nFurthermore, **intensifying workplace competition** and the fear of redundancy drive many individuals to overwork. In economies where job security is precarious, employees often sacrifice personal time to **demonstrate their indispensability**, leading to chronic stress and **diminished quality of life**.\n\nEmployers can implement several **evidence-based interventions**. Establishing **mandatory disconnection policies** - as enacted by law in France since 2017 - would protect employees' right to personal time. Additionally, offering **flexible working arrangements** and **subsidised wellness programmes** can significantly reduce burnout while simultaneously improving **workforce productivity**.\n\n**(Word count: 192)**",
          points: [
            { rule: "📊 Từ vựng Band 8.0 - Work & Society:", examples: ["**blurring of boundaries** = sự mờ nhạt ranh giới", "**perpetual availability** = luôn sẵn sàng 24/7", "**dissolved the physical demarcation** = xóa bỏ ranh giới vật lý", "**demonstrate their indispensability** = chứng tỏ sự không thể thay thế", "**evidence-based interventions** = biện pháp can thiệp dựa trên bằng chứng", "**mandatory disconnection policies** = chính sách ngắt kết nối bắt buộc"] },
            { rule: "📐 Kỹ thuật viết Band 8.0:", examples: ["Opening: không generic - đi thẳng vào vấn đề bằng từ vựng nâng cao", "Ví dụ cụ thể có năm: 'as enacted by law in France since 2017'", "Cause-Effect rõ ràng: digital tools → perpetual availability → difficulty establishing boundaries", "Parallelism: 'offering flexible working arrangements and subsidised wellness programmes'"] },
          ],
          tips: ["Band 8.0 cause-solution: causes phải phân tích SÂU (không chỉ liệt kê) + solutions phải THỰC TẾ", "Ví dụ pháp luật France 2017 rất ấn tượng - giám khảo đánh giá cao kiến thức thực tế", "Kết nối logic chặt chẽ: mỗi cause → tại sao nó là vấn đề → ảnh hưởng cụ thể"],
          quiz: [
            { question: "'Perpetual availability' mô tả điều gì?", options: ["Luôn có thể nghỉ ngơi", "Luôn phải sẵn sàng làm việc 24/7", "Có nhiều thời gian rảnh", "Được nghỉ phép dài"], answer: 1, explanation: "'Perpetual' = vĩnh viễn, liên tục → 'perpetual availability' = phải online/sẵn sàng mọi lúc." },
            { question: "Pháp ban hành luật gì năm 2017?", options: ["Tăng giờ làm việc", "Quyền ngắt kết nối cho nhân viên", "Bắt buộc remote work", "Giảm lương nhân viên"], answer: 1, explanation: "France's 'right to disconnect' law 2017 - nhân viên có quyền không trả lời email ngoài giờ làm." },
            { question: "'Evidence-based interventions' yêu cầu giải pháp phải?", options: ["Dựa trên cảm tính", "Dựa trên bằng chứng, nghiên cứu", "Dựa trên ý kiến cá nhân", "Dựa trên truyền thống"], answer: 1, explanation: "'Evidence-based' = dựa trên dữ liệu, nghiên cứu - không phải ý kiến chủ quan." },
          ],
        },
      },
    ],
  },
  {
    id: "en-idioms",
    title: "Idioms & Collocations",
    titleEn: "Idioms & Collocations",
    icon: "💡",
    description: "500+ thành ngữ và cụm từ cố định thường gặp trong giao tiếp & thi cử",
    descriptionEn: "500+ common idioms and collocations for communication & exams",
    lessons: [
      {
        id: "en-idioms-1", title: "Idioms about Work & Success", titleEn: "Idioms about Work & Success",
        content: {
          vocabulary: [
            { word: "burn the midnight oil", meaning: "thức khuya làm việc/học", example: "She's been **burning the midnight oil** to finish her thesis." },
            { word: "go the extra mile", meaning: "cố gắng hơn mức bình thường", example: "Good employees always **go the extra mile** for their clients." },
            { word: "break new ground", meaning: "đi tiên phong, làm điều chưa ai làm", example: "This research **breaks new ground** in cancer treatment." },
            { word: "a piece of cake", meaning: "dễ như ăn bánh", example: "The exam was **a piece of cake** - I finished in 30 minutes." },
            { word: "hit the nail on the head", meaning: "nói đúng trọng tâm", example: "You **hit the nail on the head** - that's exactly the problem." },
          ],
          tips: ["Dùng idioms trong IELTS Speaking Part 3 để ghi điểm Lexical Resource", "Không nên dùng idioms trong IELTS Writing - quá informal", "Học idioms theo chủ đề sẽ dễ nhớ hơn học ngẫu nhiên"],
          quiz: [
            { question: "'She's been ___ to prepare for the IELTS exam.' (thức khuya học)", options: ["breaking new ground", "burning the midnight oil", "hitting the nail on the head", "going the extra mile"], answer: 1, explanation: "Burn the midnight oil = thức khuya làm việc/học bài." },
            { question: "Idiom nào có nghĩa 'rất dễ dàng'?", options: ["Go the extra mile", "Break new ground", "A piece of cake", "Hit the nail on the head"], answer: 2, explanation: "A piece of cake = dễ dàng, không tốn sức." },
            { question: "Nên dùng idioms ở phần nào của IELTS?", options: ["Writing Task 1", "Writing Task 2", "Speaking", "Cả Writing và Speaking"], answer: 2, explanation: "Idioms phù hợp với Speaking (informal) - Writing cần formal language." },
          ],
        },
      },
      { id: "en-idioms-2", title: "Collocations with Make & Do", titleEn: "Collocations with Make & Do",
        content: {
          vocabulary: [
            { word: "make a decision", meaning: "đưa ra quyết định", example: "We need to **make a decision** by tomorrow." },
            { word: "make progress", meaning: "tiến bộ", example: "Students are **making progress** with their English skills." },
            { word: "do research", meaning: "nghiên cứu", example: "Scientists **do research** on renewable energy." },
            { word: "do homework", meaning: "làm bài tập", example: "Have you **done** your **homework** yet?" },
            { word: "make an effort", meaning: "nỗ lực", example: "You should **make an effort** to attend every class." },
          ],
          tips: ["MAKE thường đi với sản phẩm/kết quả: make a plan, make money, make a mistake", "DO thường đi với hoạt động/công việc: do exercise, do business, do the dishes", "Ngoại lệ cần nhớ: do harm, make do (xoay xở)"],
          quiz: [
            { question: "She ___ a lot of research before writing her essay.", options: ["made", "did", "took", "had"], answer: 1, explanation: "'Do research' là collocation chuẩn - không dùng 'make research'." },
            { question: "'We need to ___ a decision quickly.'", options: ["do", "make", "take", "have"], answer: 1, explanation: "'Make a decision' - MAKE đi với kết quả/sản phẩm." },
            { question: "Quy tắc chung: MAKE đi với gì?", options: ["Hoạt động hàng ngày", "Sản phẩm/kết quả", "Bài tập về nhà", "Thể dục"], answer: 1, explanation: "MAKE + sản phẩm/kết quả: make money, make a plan, make progress." },
          ],
        },
      },
      { id: "en-idioms-3", title: "Phrasal Verbs for Daily Life", titleEn: "Phrasal Verbs for Daily Life",
        content: {
          vocabulary: [
            { word: "look forward to", meaning: "mong chờ", example: "I'm **looking forward to** the holiday." },
            { word: "come up with", meaning: "nghĩ ra (ý tưởng)", example: "She **came up with** a brilliant idea." },
            { word: "figure out", meaning: "tìm ra, hiểu được", example: "I can't **figure out** how to solve this problem." },
            { word: "put off", meaning: "trì hoãn", example: "Don't **put off** studying until the last minute!" },
            { word: "turn down", meaning: "từ chối", example: "He **turned down** the job offer because of the low salary." },
          ],
          tips: ["Phrasal verbs làm cho Speaking tự nhiên hơn - nhưng cần dùng đúng ngữ cảnh", "Học theo nhóm: look up/look forward to/look into/look after", "Một số phrasal verb tách được (separable): 'turn it down', một số không: 'look forward to it'"],
          quiz: [
            { question: "I'm really ___ meeting you next week!", options: ["looking forward to", "coming up with", "putting off", "turning down"], answer: 0, explanation: "Look forward to + V-ing = mong chờ điều gì đó." },
            { question: "'Can you ___ what this word means?' (tìm ra)", options: ["put off", "turn down", "figure out", "come up with"], answer: 2, explanation: "Figure out = tìm hiểu, giải đáp." },
            { question: "He ___ the invitation because he was too busy.", options: ["looked forward to", "came up with", "turned down", "figured out"], answer: 2, explanation: "Turn down = từ chối (lời mời, đề nghị)." },
          ],
        },
      },
    ],
  },
  {
    id: "en-tests",
    title: "Đề thi thử Full Test",
    titleEn: "Full Practice Tests",
    icon: "📋",
    description: "Đề thi thử IELTS, TOEIC, Cambridge, THPT QG có đáp án & giải thích",
    descriptionEn: "IELTS, TOEIC, Cambridge, National Exam mocks with answers & explanations",
    lessons: [
      {
        id: "en-test-1", title: "Mini IELTS Reading Test", titleEn: "Mini IELTS Reading Test",
        content: {
          passage: "The concept of urban farming has gained significant traction in recent years as cities worldwide grapple with food security challenges. Unlike traditional agriculture, urban farming utilizes rooftops, vacant lots, and even vertical structures to grow food within city boundaries. Proponents argue that it reduces transportation costs, provides fresh produce to food deserts, and creates community bonds. However, critics point out that the scale of urban farming is insufficient to feed entire cities and that contaminated urban soil can pose health risks. Despite these concerns, cities like Singapore, Detroit, and Copenhagen have implemented ambitious urban farming programs, with some producing up to 30% of their vegetable needs locally.",
          tips: ["Đọc câu hỏi TRƯỚC khi đọc bài - biết cần tìm gì", "Scanning: tìm keywords, không cần đọc từng từ", "True/False/Not Given: 'Not Given' = thông tin KHÔNG có trong bài, khác với 'False'"],
          quiz: [
            { question: "According to the passage, urban farming uses which of the following?", options: ["Only rooftops", "Rooftops, vacant lots, and vertical structures", "Traditional farmland near cities", "Underground facilities"], answer: 1, explanation: "Bài viết liệt kê: 'rooftops, vacant lots, and even vertical structures'." },
            { question: "What is one criticism of urban farming mentioned?", options: ["It is too expensive", "The scale is insufficient to feed cities", "It uses too much water", "It requires too many workers"], answer: 1, explanation: "'Critics point out that the scale of urban farming is insufficient to feed entire cities'." },
            { question: "How much of vegetable needs do some cities produce locally?", options: ["Up to 10%", "Up to 20%", "Up to 30%", "Up to 50%"], answer: 2, explanation: "'Some producing up to 30% of their vegetable needs locally'." },
          ],
        },
      },
      {
        id: "en-test-2", title: "THPT Quốc gia: Grammar & Vocabulary", titleEn: "National Exam: Grammar & Vocab",
        content: {
          points: [
            { rule: "Dạng bài từ vựng: chọn từ phù hợp ngữ cảnh, đồng nghĩa, trái nghĩa.", examples: ["'She is very ___. She always helps others.' → generous (hào phóng)"] },
            { rule: "Dạng bài ngữ pháp: thì, câu điều kiện, bị động, mệnh đề quan hệ.", examples: ["'If I ___ (know), I would have told you.' → had known (Type 3)"] },
          ],
          tips: ["50 câu trong 60 phút = 1.2 phút/câu - phải nhanh!", "Câu dễ làm trước, câu khó đánh dấu quay lại", "Đọc kỹ cả 4 đáp án trước khi chọn - tránh bẫy"],
          quiz: [
            { question: "She is the most ___ person I know. She always helps everyone.", options: ["generous", "selfish", "lazy", "rude"], answer: 0, explanation: "'Always helps everyone' → generous (hào phóng, rộng rãi)." },
            { question: "If he ___ the truth, he would have apologized.", options: ["knows", "knew", "had known", "has known"], answer: 2, explanation: "Câu điều kiện loại 3: If + had V3 → would have V3." },
            { question: "'Có kinh nghiệm' trong tiếng Anh là gì?", options: ["experienced", "experiment", "experience", "experimenting"], answer: 0, explanation: "'Experienced' (adj) = có kinh nghiệm. 'Experience' (n) = kinh nghiệm." },
          ],
        },
      },
      {
        id: "en-test-3", title: "Cambridge KET Practice", titleEn: "Cambridge KET Practice",
        content: {
          points: [
            { rule: "KET (A2): Kiểm tra khả năng giao tiếp cơ bản trong tình huống hàng ngày.", examples: ["Reading & Writing: 60 phút, 7 parts", "Listening: 30 phút, 5 parts", "Speaking: 8–10 phút (thi theo cặp)"] },
          ],
          tips: ["KET phù hợp cho học sinh 10–12 tuổi bắt đầu học Cambridge", "Tập trung vào từ vựng hàng ngày: gia đình, trường học, sở thích", "Speaking: luyện tập mô tả hình ảnh đơn giản"],
          quiz: [
            { question: "KET tương đương trình độ nào trong CEFR?", options: ["A1", "A2", "B1", "B2"], answer: 1, explanation: "KET = Key English Test = trình độ A2 trong khung CEFR." },
            { question: "Phần Speaking của KET thi như thế nào?", options: ["Thi 1 mình", "Thi theo cặp", "Thi nhóm 4 người", "Không có Speaking"], answer: 1, explanation: "KET Speaking thi theo cặp (2 thí sinh) với 2 giám khảo." },
            { question: "KET phù hợp cho lứa tuổi nào?", options: ["6–8 tuổi", "10–12 tuổi", "15–18 tuổi", "Người lớn"], answer: 1, explanation: "KET thường dành cho học sinh 10–12 tuổi bắt đầu hệ Cambridge." },
          ],
        },
      },
    ],
  },
];

// ============ CHINESE RESOURCES ============

export const chineseResources: LessonItem[] = [
  {
    id: "cn-pinyin",
    title: "Bảng Pinyin toàn diện",
    titleEn: "Complete Pinyin Chart",
    icon: "🔤",
    description: "Bảng phiên âm đầy đủ 400+ âm tiết với audio chuẩn",
    descriptionEn: "Full chart of 400+ syllables with standard audio",
    lessons: [
      {
        id: "cn-pinyin-1", title: "4 Thanh điệu cơ bản", titleEn: "4 Basic Tones",
        content: {
          points: [
            { rule: "Thanh 1 (ˉ): Cao, bằng phẳng - giữ giọng cao đều.", examples: ["**mā** (妈) = mẹ", "**tā** (他) = anh ấy", "**shū** (书) = sách"] },
            { rule: "Thanh 2 (ˊ): Lên - từ trung bình lên cao (như hỏi 'Hả?').", examples: ["**má** (麻) = cây gai", "**rén** (人) = người", "**xué** (学) = học"] },
            { rule: "Thanh 3 (ˇ): Xuống rồi lên - trầm nhất rồi lên lại.", examples: ["**mǎ** (马) = ngựa", "**nǐ** (你) = bạn", "**hǎo** (好) = tốt"] },
            { rule: "Thanh 4 (ˋ): Xuống mạnh - từ cao xuống thấp dứt khoát.", examples: ["**mà** (骂) = mắng", "**shì** (是) = là", "**dà** (大) = lớn"] },
          ],
          vocabulary: [
            { word: "妈", pinyin: "mā", meaning: "mẹ", example: "我**妈**很好。(Mẹ tôi rất tốt.)" },
            { word: "麻", pinyin: "má", meaning: "cây gai / tê", example: "我的手**麻**了。(Tay tôi bị tê.)" },
            { word: "马", pinyin: "mǎ", meaning: "ngựa", example: "这匹**马**很快。(Con ngựa này rất nhanh.)" },
            { word: "骂", pinyin: "mà", meaning: "mắng", example: "老师**骂**学生了。(Thầy mắng học sinh.)" },
          ],
          tips: [
            "Thanh 3 đứng trước thanh 3 → thanh 3 đầu đọc thành thanh 2: nǐ hǎo → ní hǎo",
            "Thanh điệu SAI = nghĩa KHÁC hoàn toàn - đây là lỗi phổ biến nhất của người Việt",
            "Luyện tập: nói chậm rãi, phóng đại thanh điệu trước → rồi nói tự nhiên dần",
          ],
          quiz: [
            { question: "'mā' (thanh 1) có nghĩa là gì?", options: ["Ngựa", "Mẹ", "Mắng", "Cây gai"], answer: 1, explanation: "mā (妈) = mẹ - thanh 1 cao bằng." },
            { question: "Khi hai thanh 3 đứng cạnh nhau, thanh 3 đầu đọc thành?", options: ["Thanh 1", "Thanh 2", "Thanh 4", "Giữ nguyên"], answer: 1, explanation: "Quy tắc biến thanh: thanh 3 + thanh 3 → thanh 2 + thanh 3." },
            { question: "Thanh nào đọc 'xuống mạnh, dứt khoát'?", options: ["Thanh 1", "Thanh 2", "Thanh 3", "Thanh 4"], answer: 3, explanation: "Thanh 4 (ˋ): xuống mạnh, từ cao xuống thấp." },
          ],
        },
      },
      {
        id: "cn-pinyin-2", title: "Nguyên âm & Phụ âm", titleEn: "Initials & Finals",
        content: {
          points: [
            { rule: "21 phụ âm đầu (Initials): b, p, m, f, d, t, n, l, g, k, h, j, q, x, zh, ch, sh, r, z, c, s", examples: ["Khó nhất: zh/ch/sh (uốn lưỡi) vs z/c/s (không uốn)", "j/q/x chỉ đi với ü (viết là u): jū, qū, xū"] },
            { rule: "36 vần cuối (Finals): a, o, e, i, u, ü, ai, ei, ao, ou, an, en, ang, eng, ong...", examples: ["'ü' (như chữ 'u' tiếng Pháp): lǜ, nǚ, lǚ", "'e' đọc khác 'e' tiếng Việt - gần giống 'ơ'"] },
          ],
          tips: ["Phân biệt zh/ch/sh (uốn lưỡi) vs z/c/s (bẹt lưỡi) - rất quan trọng!", "ü khi đi sau j/q/x thì viết là 'u' nhưng ĐỌC là 'ü'", "Tổng cộng khoảng 400+ âm tiết khi kết hợp phụ âm + vần + thanh"],
          quiz: [
            { question: "Tiếng Trung có bao nhiêu phụ âm đầu (initials)?", options: ["18", "21", "24", "26"], answer: 1, explanation: "Tiếng Trung có 21 phụ âm đầu (initials)." },
            { question: "'zh, ch, sh' và 'z, c, s' khác nhau ở điểm nào?", options: ["Thanh điệu", "Uốn lưỡi vs bẹt lưỡi", "Vần cuối", "Không khác"], answer: 1, explanation: "zh/ch/sh = uốn lưỡi (retroflexes), z/c/s = bẹt lưỡi (alveolars)." },
            { question: "'jū' thực chất đọc là gì?", options: ["ju (như tiếng Việt)", "jü", "jou", "jao"], answer: 1, explanation: "'u' sau j/q/x thực chất là 'ü' - viết tắt không có dấu chấm." },
          ],
        },
      },
      {
        id: "cn-pinyin-3", title: "Quy tắc ghép vần & Biến thanh", titleEn: "Spelling Rules & Tone Changes",
        content: {
          points: [
            { rule: "Biến thanh chữ 不 (bù): trước thanh 4 → đọc thành thanh 2.", examples: ["不是 bú shì (không phải)", "不对 bú duì (không đúng)", "Nhưng: 不好 bù hǎo (giữ thanh 4)"] },
            { rule: "Biến thanh chữ 一 (yī): trước thanh 4 → thanh 2; trước thanh 1/2/3 → thanh 4.", examples: ["一个 yí gè (thanh 2)", "一天 yì tiān (thanh 4)", "一年 yì nián (thanh 4)"] },
          ],
          tips: ["Quy tắc biến thanh chỉ áp dụng khi NÓI - khi viết Pinyin vẫn giữ nguyên", "Thanh nhẹ (轻声): một số từ âm tiết thứ 2 không có thanh: 妈妈 māma", "Luyện đọc theo cặp từ để nắm vững biến thanh tự nhiên"],
          quiz: [
            { question: "'不是' đọc đúng thanh điệu là gì?", options: ["bù shì", "bú shì", "bǔ shì", "bū shì"], answer: 1, explanation: "不 trước thanh 4 (是 shì) → biến thành thanh 2: bú shì." },
            { question: "'一天' đọc đúng thanh điệu là gì?", options: ["yī tiān", "yí tiān", "yì tiān", "yǐ tiān"], answer: 2, explanation: "一 trước thanh 1 (天 tiān) → biến thành thanh 4: yì tiān." },
            { question: "Khi viết Pinyin, có cần viết theo thanh đã biến không?", options: ["Có, luôn viết thanh đã biến", "Không, viết thanh gốc", "Tuỳ trường hợp", "Không có quy tắc"], answer: 1, explanation: "Khi VIẾT Pinyin luôn giữ thanh gốc - biến thanh chỉ khi NÓI." },
          ],
        },
      },
    ],
  },
  {
    id: "cn-radicals",
    title: "Chữ Hán theo bộ thủ",
    titleEn: "Characters by Radicals",
    icon: "🈷️",
    description: "Học 214 bộ thủ & 500+ chữ Hán thường dùng nhất",
    descriptionEn: "Learn 214 radicals & 500+ most common characters",
    lessons: [
      {
        id: "cn-radical-1", title: "10 Bộ thủ quan trọng nhất", titleEn: "Top 10 Essential Radicals",
        content: {
          vocabulary: [
            { word: "人 (亻)", pinyin: "rén", meaning: "Bộ Nhân - người", example: "他 (tā) = anh ấy, 你 (nǐ) = bạn, 们 (men) = các" },
            { word: "口", pinyin: "kǒu", meaning: "Bộ Khẩu - miệng", example: "吃 (chī) = ăn, 喝 (hē) = uống, 叫 (jiào) = gọi" },
            { word: "水 (氵)", pinyin: "shuǐ", meaning: "Bộ Thuỷ - nước", example: "河 (hé) = sông, 海 (hǎi) = biển, 洗 (xǐ) = rửa" },
            { word: "木", pinyin: "mù", meaning: "Bộ Mộc - cây/gỗ", example: "林 (lín) = rừng, 森 (sēn) = rừng rậm, 桌 (zhuō) = bàn" },
            { word: "火 (灬)", pinyin: "huǒ", meaning: "Bộ Hoả - lửa", example: "烧 (shāo) = đốt, 热 (rè) = nóng, 煮 (zhǔ) = nấu" },
            { word: "日", pinyin: "rì", meaning: "Bộ Nhật - mặt trời/ngày", example: "明 (míng) = sáng, 时 (shí) = thời gian, 早 (zǎo) = sớm" },
            { word: "月", pinyin: "yuè", meaning: "Bộ Nguyệt - mặt trăng/tháng", example: "朋 (péng) = bạn, 期 (qī) = kỳ, 明 (míng) = sáng" },
            { word: "心 (忄)", pinyin: "xīn", meaning: "Bộ Tâm - tim/lòng", example: "想 (xiǎng) = nghĩ, 情 (qíng) = tình cảm, 快 (kuài) = vui/nhanh" },
            { word: "手 (扌)", pinyin: "shǒu", meaning: "Bộ Thủ - tay", example: "打 (dǎ) = đánh, 拿 (ná) = cầm, 找 (zhǎo) = tìm" },
            { word: "女", pinyin: "nǚ", meaning: "Bộ Nữ - phụ nữ", example: "妈 (mā) = mẹ, 好 (hǎo) = tốt, 姐 (jiě) = chị" },
          ],
          tips: [
            "Biết bộ thủ = đoán được nghĩa: thấy 氵 → liên quan nước, thấy 火 → liên quan lửa/nóng",
            "214 bộ thủ nhưng chỉ cần nhớ 50 bộ phổ biến nhất là đủ đọc 80% chữ Hán",
            "Bộ thủ thường nằm bên trái hoặc phía trên chữ Hán",
          ],
          quiz: [
            { question: "Bộ thủ 氵 (3 chấm thuỷ) liên quan đến gì?", options: ["Lửa", "Nước", "Đất", "Gió"], answer: 1, explanation: "氵 là dạng viết tắt của 水 (shuǐ) = nước." },
            { question: "Chữ 好 (hǎo = tốt) gồm bộ thủ nào?", options: ["口 + 人", "女 + 子", "日 + 月", "木 + 火"], answer: 1, explanation: "好 = 女 (nữ) + 子 (con) → phụ nữ bế con = tốt đẹp." },
            { question: "Thấy bộ 忄 trong chữ Hán, nghĩa thường liên quan đến?", options: ["Tay", "Nước", "Tâm trạng/cảm xúc", "Thức ăn"], answer: 2, explanation: "忄 = 心 (xīn = tim/lòng) → liên quan tình cảm, suy nghĩ." },
          ],
        },
      },
      {
        id: "cn-radical-2", title: "Thứ tự nét viết cơ bản", titleEn: "Basic Stroke Order",
        content: {
          points: [
            { rule: "Quy tắc 1: Từ trên xuống dưới (上→下)", examples: ["三 (sān): nét ngang trên → giữa → dưới", "字 (zì): phần trên 宀 viết trước, 子 viết sau"] },
            { rule: "Quy tắc 2: Từ trái sang phải (左→右)", examples: ["他 (tā): bộ 亻 bên trái viết trước, 也 bên phải viết sau", "明 (míng): 日 trái trước, 月 phải sau"] },
            { rule: "Quy tắc 3: Nét ngang trước, nét sổ sau", examples: ["十 (shí): ngang (一) trước, sổ (丨) sau", "七 (qī): ngang trước, sổ cong sau"] },
            { rule: "Quy tắc 4: Khung ngoài trước, ruột sau, đóng khung cuối", examples: ["国 (guó): 口 viết 3 nét trước → 玉 bên trong → nét ngang đóng cuối", "回 (huí): khung ngoài → khung trong → đóng"] },
          ],
          tips: [
            "8 nét cơ bản: 横 (ngang), 竖 (sổ), 撇 (phẩy trái), 捺 (mác phải), 点 (chấm), 提 (hất), 折 (gấp), 钩 (móc)",
            "Viết đúng thứ tự nét giúp chữ ĐẸP hơn và nhớ LÂU hơn",
            "Luyện viết mỗi ngày 5–10 chữ mới, mỗi chữ viết 10 lần theo thứ tự nét",
          ],
          quiz: [
            { question: "Khi viết chữ Hán, quy tắc cơ bản nhất là gì?", options: ["Từ dưới lên trên", "Từ phải sang trái", "Từ trên xuống dưới, trái sang phải", "Viết tùy ý"], answer: 2, explanation: "2 quy tắc cơ bản nhất: trên→dưới và trái→phải." },
            { question: "Chữ 国 (guó = nước) viết thế nào?", options: ["Ruột trước, khung sau", "Khung ngoài trước → ruột → đóng khung", "Từ dưới lên", "Từ phải sang trái"], answer: 1, explanation: "Quy tắc: khung ngoài trước → nội dung bên trong → nét đóng cuối cùng." },
            { question: "Tiếng Trung có bao nhiêu nét cơ bản?", options: ["4 nét", "6 nét", "8 nét", "10 nét"], answer: 2, explanation: "8 nét cơ bản: ngang, sổ, phẩy, mác, chấm, hất, gấp, móc." },
          ],
        },
      },
      {
        id: "cn-radical-3", title: "Chữ tượng hình & Hội ý", titleEn: "Pictographs & Ideographs",
        content: {
          vocabulary: [
            { word: "山", pinyin: "shān", meaning: "núi - hình dáng giống 3 đỉnh núi", example: "这座**山**很高。(Ngọn núi này rất cao.)" },
            { word: "水", pinyin: "shuǐ", meaning: "nước - hình dòng nước chảy", example: "我要喝**水**。(Tôi muốn uống nước.)" },
            { word: "火", pinyin: "huǒ", meaning: "lửa - hình ngọn lửa bốc lên", example: "小心**火**！(Cẩn thận lửa!)" },
            { word: "日", pinyin: "rì", meaning: "mặt trời - hình tròn có gạch giữa", example: "今**日**天气好。(Hôm nay thời tiết tốt.)" },
            { word: "月", pinyin: "yuè", meaning: "mặt trăng - hình trăng lưỡi liềm", example: "**月**亮很美。(Mặt trăng rất đẹp.)" },
            { word: "木", pinyin: "mù", meaning: "cây - hình cây có cành", example: "这棵**木**很大。" },
            { word: "林", pinyin: "lín", meaning: "rừng - 2 cây = rừng nhỏ", example: "**林**子里有很多鸟。(Trong rừng có nhiều chim.)" },
            { word: "森", pinyin: "sēn", meaning: "rừng rậm - 3 cây = rừng dày", example: "**森**林很大。(Rừng rậm rất lớn.)" },
          ],
          tips: [
            "Chữ tượng hình (象形): vẽ lại hình dáng sự vật → 山, 水, 火, 日, 月",
            "Chữ hội ý (会意): ghép 2+ thành phần tạo nghĩa mới → 木+木=林, 日+月=明(sáng)",
            "Hiểu nguồn gốc chữ Hán giúp nhớ lâu hơn gấp 3 lần so với học thuộc lòng!",
          ],
          quiz: [
            { question: "Tại sao chữ 林 (lín) có nghĩa là 'rừng'?", options: ["Vì đọc giống 'lín'", "Vì gồm 2 chữ 木 (cây) ghép lại", "Vì có bộ thuỷ", "Vì giống hình núi"], answer: 1, explanation: "木 (1 cây) → 林 (2 cây = rừng nhỏ) → 森 (3 cây = rừng rậm)." },
            { question: "Chữ 明 (míng = sáng) gồm những bộ nào?", options: ["火 + 水", "日 + 月", "人 + 口", "心 + 手"], answer: 1, explanation: "日 (mặt trời) + 月 (mặt trăng) = 明 (sáng) - chữ hội ý." },
            { question: "Chữ tượng hình là gì?", options: ["Chữ ghép từ nhiều bộ thủ", "Chữ vẽ lại hình dáng sự vật", "Chữ có thanh điệu đặc biệt", "Chữ viết tắt"], answer: 1, explanation: "Tượng hình (象形) = vẽ lại hình dáng: 山=núi, 水=nước, 火=lửa." },
          ],
        },
      },
    ],
  },
  {
    id: "cn-grammar",
    title: "Ngữ pháp HSK 1–6",
    titleEn: "HSK Grammar 1–6",
    icon: "📝",
    description: "Hệ thống ngữ pháp từ cơ bản đến nâng cao với ví dụ thực tế",
    descriptionEn: "Grammar system from basic to advanced with real-life examples",
    lessons: [
      {
        id: "cn-grammar-1", title: "Cấu trúc câu cơ bản SVO", titleEn: "Basic SVO Sentence Structure",
        content: {
          points: [
            { rule: "Tiếng Trung dùng trật tự SVO giống tiếng Việt: Chủ ngữ + Động từ + Tân ngữ", examples: ["我 **吃** 饭。(Wǒ chī fàn.) = Tôi ăn cơm.", "她 **学** 中文。(Tā xué zhōngwén.) = Cô ấy học tiếng Trung."] },
            { rule: "Phủ định với 不 (bù) và 没 (méi)", examples: ["我 **不** 喜欢。(Wǒ bù xǐhuan.) = Tôi không thích.", "他 **没** 来。(Tā méi lái.) = Anh ấy chưa đến."] },
            { rule: "Câu hỏi: thêm 吗 (ma) cuối câu hoặc dùng từ nghi vấn.", examples: ["你好吗？(Nǐ hǎo ma?) = Bạn có khỏe không?", "你叫什么名字？(Nǐ jiào shénme míngzi?) = Bạn tên gì?"] },
          ],
          vocabulary: [
            { word: "是", pinyin: "shì", meaning: "là", example: "我**是**学生。(Tôi là học sinh.)" },
            { word: "有", pinyin: "yǒu", meaning: "có", example: "我**有**一本书。(Tôi có một quyển sách.)" },
            { word: "在", pinyin: "zài", meaning: "ở, đang", example: "他**在**家。(Anh ấy ở nhà.)" },
          ],
          tips: [
            "不 (bù) phủ định hiện tại/tương lai; 没 (méi) phủ định quá khứ/chưa xảy ra",
            "Tiếng Trung KHÔNG chia động từ theo ngôi - 我吃, 你吃, 他吃 đều giống nhau!",
            "Thứ tự thời gian trong câu: Chủ ngữ + Thời gian + Động từ: 我明天去。",
          ],
          quiz: [
            { question: "'Tôi không thích' dịch sang tiếng Trung là?", options: ["我没喜欢", "我不喜欢", "我没有喜欢", "我是不喜欢"], answer: 1, explanation: "Phủ định sở thích (hiện tại) dùng 不: 我不喜欢。" },
            { question: "Cách đặt câu hỏi đơn giản nhất trong tiếng Trung?", options: ["Đảo chủ vị", "Thêm 吗 cuối câu", "Thêm 不 đầu câu", "Dùng trợ từ 了"], answer: 1, explanation: "Thêm 吗 cuối câu trần thuật → thành câu hỏi Yes/No." },
            { question: "Tiếng Trung có chia động từ theo ngôi không?", options: ["Có, chia như tiếng Anh", "Có, nhưng đơn giản hơn", "Không chia", "Chỉ chia ngôi thứ 3"], answer: 2, explanation: "Tiếng Trung KHÔNG chia động từ - đây là điểm dễ hơn tiếng Anh!" },
          ],
        },
      },
      {
        id: "cn-grammar-2", title: "了, 过, 着 - Ba trợ từ quan trọng", titleEn: "了, 过, 着 - Three Key Particles",
        content: {
          points: [
            { rule: "了 (le): hoàn thành / thay đổi trạng thái", examples: ["我吃**了**饭。(Tôi đã ăn cơm rồi.)", "天气冷**了**。(Thời tiết đã lạnh rồi.)"] },
            { rule: "过 (guò): trải nghiệm trong quá khứ (từng)", examples: ["我去**过**中国。(Tôi từng đi Trung Quốc.)", "你吃**过**北京烤鸭吗？(Bạn từng ăn vịt quay Bắc Kinh chưa?)"] },
            { rule: "着 (zhe): trạng thái đang diễn ra / tiếp diễn", examples: ["门开**着**。(Cửa đang mở.)", "他笑**着**说。(Anh ấy vừa cười vừa nói.)"] },
          ],
          tips: [
            "了 ≠ quá khứ! Nó biểu thị 'hoàn thành' hoặc 'thay đổi' - có thể dùng cho tương lai",
            "过 nhấn mạnh TRẢI NGHIỆM: đã từng làm hay chưa (không quan tâm khi nào)",
            "着 giống '-ing' trong tiếng Anh nhưng chỉ trạng thái, không phải hành động đang làm",
          ],
          quiz: [
            { question: "'Tôi từng đi Nhật Bản' dịch đúng là?", options: ["我去了日本", "我去过日本", "我在去日本", "我去着日本"], answer: 1, explanation: "过 biểu thị trải nghiệm 'từng' → 我去过日本。" },
            { question: "'了' có phải lúc nào cũng chỉ quá khứ không?", options: ["Đúng, luôn là quá khứ", "Không, còn biểu thị thay đổi trạng thái", "Chỉ dùng cho tương lai", "Không có nghĩa gì"], answer: 1, explanation: "了 biểu thị hoàn thành HOẶC thay đổi trạng thái - không chỉ quá khứ!" },
            { question: "'门开着' (cửa đang mở) - 着 diễn tả gì?", options: ["Hành động đã xong", "Trải nghiệm", "Trạng thái đang tiếp diễn", "Mệnh lệnh"], answer: 2, explanation: "着 biểu thị trạng thái đang duy trì/tiếp diễn." },
          ],
        },
      },
      {
        id: "cn-grammar-3", title: "把 (bǎ) - Cấu trúc đặc biệt", titleEn: "把 Construction",
        content: {
          points: [
            { rule: "Cấu trúc 把: S + 把 + O + Verb + Complement. Nhấn mạnh TÁC ĐỘNG lên đối tượng.", examples: ["我**把**书放在桌子上。(Tôi ĐỂ sách LÊN bàn.)", "请你**把**门关上。(Xin bạn ĐÓNG cửa LẠI.)"] },
            { rule: "Khi nào dùng 把? Khi muốn nhấn mạnh hành động làm thay đổi vị trí/trạng thái của tân ngữ.", examples: ["他**把**作业做完了。(Anh ấy ĐÃ LÀM XONG bài tập.)", "别**把**钱花光了！(Đừng TIÊU HẾT tiền!)"] },
          ],
          tips: [
            "Động từ sau 把 PHẢI có bổ ngữ (complement) - không được đứng một mình",
            "KHÔNG dùng 把 với: 是, 有, 在, 知道, 喜欢 (động từ không gây thay đổi)",
            "Cấu trúc 把 rất phổ biến từ HSK 3 trở lên - nắm chắc sẽ nói tự nhiên hơn",
          ],
          quiz: [
            { question: "'请把门关上' nghĩa là gì?", options: ["Xin hãy mở cửa", "Xin hãy đóng cửa lại", "Cửa đang đóng", "Cửa bị hỏng"], answer: 1, explanation: "把门关上 = đóng cửa lại - 把 nhấn mạnh tác động lên 'cửa'." },
            { question: "Tại sao không nói '我把他喜欢'?", options: ["Vì sai ngữ pháp cơ bản", "Vì 喜欢 không gây thay đổi trạng thái", "Vì thiếu chủ ngữ", "Vì 把 chỉ dùng cho vật"], answer: 1, explanation: "把 chỉ dùng khi hành động GÂY THAY ĐỔI - 'thích' không thay đổi đối tượng." },
            { question: "Cấu trúc đúng của câu 把 là?", options: ["S + V + 把 + O", "S + 把 + O + V + Complement", "把 + S + V + O", "S + O + 把 + V"], answer: 1, explanation: "Cấu trúc: S + 把 + O + V + Complement." },
          ],
        },
      },
    ],
  },
  {
    id: "cn-listening",
    title: "Luyện nghe theo cấp độ",
    titleEn: "Graded Listening",
    icon: "🎧",
    description: "Hội thoại, tin tức, podcast theo trình độ HSK 1–6",
    descriptionEn: "Dialogues, news, podcasts graded by HSK 1–6 level",
    lessons: [
      {
        id: "cn-listen-1", title: "HSK 1–2: Hội thoại cơ bản", titleEn: "HSK 1–2: Basic Dialogues",
        content: {
          points: [
            { rule: "Chủ đề: Chào hỏi, giới thiệu bản thân, mua sắm, hỏi giờ.", examples: ["A: 你好！你叫什么名字？B: 我叫小明。(Xin chào! Bạn tên gì? - Tôi tên Tiểu Minh.)", "A: 这个多少钱？B: 十块钱。(Cái này bao nhiêu tiền? - 10 tệ.)"] },
            { rule: "Chiến lược nghe HSK 1–2: Bắt từ khóa, không cần hiểu 100%.", examples: ["Nghe thấy 几点 → câu hỏi về giờ", "Nghe thấy 多少钱 → câu hỏi về giá tiền"] },
          ],
          tips: ["HSK 1 chỉ cần 150 từ - tập trung nghe các từ này", "Tốc độ nói HSK 1–2 rất chậm - luyện thêm tốc độ tự nhiên", "Nghe 2 lần: lần 1 bắt ý chính, lần 2 tìm chi tiết"],
          quiz: [
            { question: "HSK 1 yêu cầu biết bao nhiêu từ vựng?", options: ["100 từ", "150 từ", "300 từ", "500 từ"], answer: 1, explanation: "HSK 1 = 150 từ vựng cơ bản nhất." },
            { question: "Nghe thấy '多少钱', câu hỏi về gì?", options: ["Thời gian", "Địa điểm", "Giá tiền", "Số lượng"], answer: 2, explanation: "多少钱 = bao nhiêu tiền → hỏi về giá." },
            { question: "Chiến lược nghe HSK 1–2 tốt nhất là gì?", options: ["Dịch từng từ", "Bắt từ khóa quan trọng", "Viết lại toàn bộ", "Đoán ngẫu nhiên"], answer: 1, explanation: "Ở trình độ thấp, bắt từ khóa là chiến lược hiệu quả nhất." },
          ],
        },
      },
      {
        id: "cn-listen-2", title: "HSK 3–4: Hội thoại nâng cao", titleEn: "HSK 3–4: Intermediate Dialogues",
        content: {
          points: [
            { rule: "Chủ đề mở rộng: Du lịch, sức khỏe, công việc, môi trường.", examples: ["讨论旅游计划 (Thảo luận kế hoạch du lịch)", "去医院看病 (Đi bệnh viện khám bệnh)"] },
            { rule: "Nghe hiểu ý ngầm: Không phải lúc nào người nói cũng nói thẳng.", examples: ["'这个嘛...' = đang do dự, có thể từ chối", "'你看着办吧' = tôi không muốn quyết định"] },
          ],
          tips: ["HSK 3: 600 từ, HSK 4: 1200 từ - bước nhảy lớn!", "Bắt đầu nghe podcast tiếng Trung đơn giản", "Chú ý ngữ khí (tone of voice) để hiểu thái độ người nói"],
          quiz: [
            { question: "HSK 4 yêu cầu bao nhiêu từ vựng?", options: ["600 từ", "900 từ", "1200 từ", "2500 từ"], answer: 2, explanation: "HSK 4 = 1200 từ vựng." },
            { question: "'这个嘛...' thường biểu thị gì?", options: ["Đồng ý ngay", "Do dự / có thể từ chối", "Rất vui", "Không hiểu"], answer: 1, explanation: "这个嘛... biểu thị sự do dự, chưa chắc chắn." },
            { question: "Từ HSK 3 đến HSK 4, số từ vựng tăng bao nhiêu?", options: ["200 từ", "400 từ", "600 từ", "1000 từ"], answer: 2, explanation: "HSK 3 = 600 từ → HSK 4 = 1200 từ → tăng 600 từ." },
          ],
        },
      },
      {
        id: "cn-listen-3", title: "HSK 5–6: Nghe hiểu chuyên sâu", titleEn: "HSK 5–6: Advanced Listening",
        content: {
          points: [
            { rule: "Chủ đề phức tạp: Kinh tế, chính trị, triết học, khoa học.", examples: ["新闻报道 (Bản tin thời sự)", "学术讲座 (Bài giảng học thuật)"] },
            { rule: "Yêu cầu: Tóm tắt ý chính, phân tích quan điểm, suy luận.", examples: ["Hiểu được lập luận của người nói", "Phân biệt sự thật vs ý kiến"] },
          ],
          tips: ["HSK 5: 2500 từ, HSK 6: 5000+ từ", "Xem phim Trung Quốc KHÔNG phụ đề để luyện tai", "Đọc tin tức bằng tiếng Trung giúp mở rộng từ vựng đồng thời"],
          quiz: [
            { question: "HSK 6 yêu cầu bao nhiêu từ vựng?", options: ["2500 từ", "3500 từ", "5000+ từ", "8000 từ"], answer: 2, explanation: "HSK 6 = 5000+ từ vựng - trình độ cao nhất." },
            { question: "Cách luyện nghe HSK 5–6 hiệu quả nhất?", options: ["Chỉ nghe audio HSK", "Xem phim/tin tức không phụ đề", "Chỉ đọc sách", "Chỉ học từ vựng"], answer: 1, explanation: "Nghe tự nhiên (phim, tin tức) hiệu quả nhất cho trình độ cao." },
            { question: "HSK 5–6 yêu cầu kỹ năng nghe nào?", options: ["Chỉ nghe từ khóa", "Tóm tắt, phân tích, suy luận", "Chỉ nghe số liệu", "Chỉ bắt tên riêng"], answer: 1, explanation: "Trình độ cao yêu cầu tóm tắt ý chính, phân tích quan điểm." },
          ],
        },
      },
    ],
  },
  {
    id: "cn-chengyu",
    title: "Thành ngữ & Chengyu",
    titleEn: "Idioms & Chengyu",
    icon: "💡",
    description: "200+ thành ngữ 4 chữ phổ biến với nguồn gốc & cách dùng",
    descriptionEn: "200+ popular 4-character idioms with origins & usage",
    lessons: [
      {
        id: "cn-chengyu-1", title: "10 Thành ngữ phổ biến nhất", titleEn: "Top 10 Most Common Chengyu",
        content: {
          vocabulary: [
            { word: "一举两得", pinyin: "yī jǔ liǎng dé", meaning: "Một công đôi việc", example: "学中文还能了解文化，真是**一举两得**。" },
            { word: "自言自语", pinyin: "zì yán zì yǔ", meaning: "Tự nói tự nghe (nói một mình)", example: "他常常**自言自语**。" },
            { word: "马马虎虎", pinyin: "mǎ ma hū hū", meaning: "Qua loa, tàm tạm", example: "他做事总是**马马虎虎**的。" },
            { word: "入乡随俗", pinyin: "rù xiāng suí sú", meaning: "Nhập gia tuỳ tục", example: "到了中国就要**入乡随俗**。" },
            { word: "半途而废", pinyin: "bàn tú ér fèi", meaning: "Nửa đường bỏ cuộc", example: "学习不能**半途而废**。" },
          ],
          tips: [
            "Chengyu (成语) là thành ngữ 4 chữ - đặc trưng của tiếng Trung",
            "Dùng chengyu trong HSK 5–6 Writing sẽ ghi điểm cao",
            "Mỗi chengyu thường có câu chuyện lịch sử đằng sau - học chuyện = nhớ nghĩa",
          ],
          quiz: [
            { question: "'一举两得' có nghĩa tương tự thành ngữ nào trong tiếng Việt?", options: ["Một công đôi việc", "Nước đổ đầu vịt", "Ếch ngồi đáy giếng", "Có công mài sắt"], answer: 0, explanation: "一举两得 = một hành động, hai kết quả = một công đôi việc." },
            { question: "'马马虎虎' mô tả điều gì?", options: ["Rất giỏi", "Qua loa, không cẩn thận", "Rất đẹp", "Rất nhanh"], answer: 1, explanation: "马马虎虎 = làm qua loa, tàm tạm, không nghiêm túc." },
            { question: "Chengyu thường có bao nhiêu chữ?", options: ["2 chữ", "3 chữ", "4 chữ", "5 chữ"], answer: 2, explanation: "Đặc trưng của 成语 (chengyu) là luôn có 4 chữ." },
          ],
        },
      },
      {
        id: "cn-chengyu-2", title: "Chengyu trong đời sống", titleEn: "Chengyu in Daily Life",
        content: {
          vocabulary: [
            { word: "脚踏实地", pinyin: "jiǎo tà shí dì", meaning: "Chân đạp đất thật - làm việc thực tế, chắc chắn", example: "做事要**脚踏实地**，不要好高骛远。" },
            { word: "爱不释手", pinyin: "ài bù shì shǒu", meaning: "Yêu không rời tay - rất thích, không muốn buông", example: "这本书太好了，让人**爱不释手**。" },
            { word: "异口同声", pinyin: "yì kǒu tóng shēng", meaning: "Khác miệng cùng lời - đồng thanh nói", example: "大家**异口同声**地回答'好！'" },
            { word: "刻苦学习", pinyin: "kè kǔ xué xí", meaning: "Học tập chăm chỉ, cần cù", example: "她从小就**刻苦学习**。" },
          ],
          tips: [
            "Dùng chengyu trong giao tiếp hàng ngày thể hiện trình độ tiếng Trung cao",
            "Khi viết thư/email tiếng Trung, chengyu làm văn phong sang trọng hơn",
            "App gợi ý: Pleco - tra chengyu cực nhanh với ví dụ và nguồn gốc",
          ],
          quiz: [
            { question: "'爱不释手' dùng khi nào?", options: ["Khi ghét thứ gì đó", "Khi rất thích, không muốn buông", "Khi buồn ngủ", "Khi tức giận"], answer: 1, explanation: "爱不释手 = yêu đến mức không muốn rời tay - rất thích." },
            { question: "'异口同声' nghĩa là?", options: ["Nói khác nhau", "Cùng nói một lời", "Im lặng", "Nói to"], answer: 1, explanation: "异口同声 = nhiều miệng nhưng cùng một lời = đồng thanh." },
            { question: "'脚踏实地' khuyên ta điều gì?", options: ["Bay cao", "Làm việc thực tế, chắc chắn", "Đi du lịch", "Nghỉ ngơi"], answer: 1, explanation: "脚踏实地 = chân đạp đất thật = làm việc thực tế, không viển vông." },
          ],
        },
      },
      {
        id: "cn-chengyu-3", title: "Chengyu từ câu chuyện lịch sử", titleEn: "Chengyu from Historical Stories",
        content: {
          vocabulary: [
            { word: "守株待兔", pinyin: "shǒu zhū dài tù", meaning: "Ôm cây đợi thỏ - chờ may mắn, không chịu cố gắng", example: "不能**守株待兔**，要主动去找机会。" },
            { word: "画蛇添足", pinyin: "huà shé tiān zú", meaning: "Vẽ rắn thêm chân - làm thừa, phản tác dụng", example: "已经很好了，别**画蛇添足**。" },
            { word: "对牛弹琴", pinyin: "duì niú tán qín", meaning: "Đàn gảy tai trâu - nói với người không hiểu", example: "跟他解释物理就像**对牛弹琴**。" },
            { word: "刻舟求剑", pinyin: "kè zhōu qiú jiàn", meaning: "Khắc thuyền tìm kiếm - cứng nhắc, không biết thay đổi", example: "时代变了，别**刻舟求剑**。" },
          ],
          tips: [
            "Mỗi chengyu từ lịch sử đều có câu chuyện hấp dẫn - đọc chuyện trước, nhớ nghĩa sau",
            "守株待兔: Nông dân thấy thỏ đâm vào gốc cây chết → ngồi đợi thỏ tiếp theo mãi mà không làm gì",
            "画蛇添足: Cuộc thi vẽ rắn - người xong trước vẽ thêm chân → bị loại vì rắn không có chân!",
          ],
          quiz: [
            { question: "'画蛇添足' dạy ta bài học gì?", options: ["Nên sáng tạo thêm", "Đừng làm thừa, sẽ phản tác dụng", "Vẽ cho đẹp", "Cần thêm chi tiết"], answer: 1, explanation: "Vẽ rắn thêm chân = làm thừa → kết quả xấu hơn." },
            { question: "'对牛弹琴' tương tự thành ngữ nào trong tiếng Việt?", options: ["Nước đổ lá khoai", "Đàn gảy tai trâu", "Ếch ngồi đáy giếng", "Cá chậu chim lồng"], answer: 1, explanation: "对牛弹琴 = đàn gảy tai trâu - nói với người không hiểu/không quan tâm." },
            { question: "'守株待兔' phê phán thái độ nào?", options: ["Chăm chỉ quá mức", "Chờ may mắn, không chịu cố gắng", "Quá liều lĩnh", "Quá cẩn thận"], answer: 1, explanation: "守株待兔 = ôm cây đợi thỏ = thụ động chờ vận may." },
          ],
        },
      },
    ],
  },
  {
    id: "cn-tests",
    title: "Đề thi HSK các cấp",
    titleEn: "HSK Practice Tests",
    icon: "📋",
    description: "Bộ đề thi thử HSK 1–6 mô phỏng đề thi thực + đáp án chi tiết",
    descriptionEn: "HSK 1–6 mock tests simulating real exams + detailed answers",
    lessons: [
      {
        id: "cn-test-1", title: "HSK 1 Mini Test", titleEn: "HSK 1 Mini Test",
        content: {
          passage: "小明今天去学校。他的老师叫王老师。王老师说：'今天我们学习中文。' 小明很高兴。他喜欢学中文。下课以后，小明去吃饭。他吃了米饭和鸡蛋。\n\n(Tiểu Minh hôm nay đi học. Thầy giáo của anh ấy tên là thầy Vương. Thầy Vương nói: 'Hôm nay chúng ta học tiếng Trung.' Tiểu Minh rất vui. Anh ấy thích học tiếng Trung. Sau giờ học, Tiểu Minh đi ăn cơm. Anh ấy ăn cơm và trứng gà.)",
          tips: ["HSK 1 đọc hiểu: chỉ cần hiểu ý chính, không cần hiểu từng từ", "Từ khóa HSK 1: 去, 学校, 老师, 学习, 喜欢, 吃"],
          quiz: [
            { question: "小明今天去哪里？(Tiểu Minh hôm nay đi đâu?)", options: ["去医院 (Bệnh viện)", "去学校 (Trường học)", "去商店 (Cửa hàng)", "去公园 (Công viên)"], answer: 1, explanation: "Bài viết nói: 小明今天去学校 = Tiểu Minh hôm nay đi trường học." },
            { question: "小明喜欢什么？(Tiểu Minh thích gì?)", options: ["学英语 (Học tiếng Anh)", "学中文 (Học tiếng Trung)", "看电影 (Xem phim)", "打球 (Chơi bóng)"], answer: 1, explanation: "他喜欢学中文 = Anh ấy thích học tiếng Trung." },
            { question: "小明吃了什么？(Tiểu Minh ăn gì?)", options: ["面条 (Mì)", "米饭和鸡蛋 (Cơm và trứng)", "饺子 (Há cảo)", "面包 (Bánh mì)"], answer: 1, explanation: "他吃了米饭和鸡蛋 = Anh ấy ăn cơm và trứng gà." },
          ],
        },
      },
      {
        id: "cn-test-2", title: "HSK 3 Grammar Practice", titleEn: "HSK 3 Grammar Practice",
        content: {
          points: [
            { rule: "HSK 3 trọng tâm: 把 sentence, 被 passive, comparison with 比.", examples: ["我把书放在桌子上了。", "他比我高。", "蛋糕被他吃了。"] },
          ],
          tips: ["HSK 3 = 600 từ, bắt đầu xuất hiện ngữ pháp phức tạp", "Luyện viết câu ngắn dùng 把, 被, 比 mỗi ngày"],
          quiz: [
            { question: "'他比我高' nghĩa là gì?", options: ["Anh ấy thấp hơn tôi", "Anh ấy cao hơn tôi", "Anh ấy bằng tôi", "Anh ấy béo hơn tôi"], answer: 1, explanation: "比 = so sánh hơn: 他比我高 = anh ấy cao hơn tôi." },
            { question: "'蛋糕被他吃了' dùng cấu trúc gì?", options: ["把 sentence", "被 passive", "比 comparison", "是...的 emphasis"], answer: 1, explanation: "被 = bị/được (passive): bánh bị anh ấy ăn rồi." },
            { question: "Chọn câu đúng:", options: ["我把看书了", "我把书看了", "把我书看了", "书把我看了"], answer: 1, explanation: "把 sentence: S + 把 + O + V + complement → 我把书看了。" },
          ],
        },
      },
      {
        id: "cn-test-3", title: "HSK 5 Reading Comprehension", titleEn: "HSK 5 Reading Comprehension",
        content: {
          passage: "随着科技的发展，人工智能已经深入到我们生活的方方面面。从智能手机上的语音助手，到医院里的辅助诊断系统，AI正在改变着我们的工作和生活方式。然而，也有人担心AI会取代人类的工作岗位，甚至威胁人类的安全。专家认为，关键在于如何合理地使用AI，让它成为人类的工具，而不是替代品。\n\n(Cùng với sự phát triển công nghệ, trí tuệ nhân tạo đã thâm nhập vào mọi mặt cuộc sống. Từ trợ lý giọng nói trên smartphone, đến hệ thống hỗ trợ chẩn đoán trong bệnh viện, AI đang thay đổi cách chúng ta làm việc và sống. Tuy nhiên, cũng có người lo AI sẽ thay thế việc làm của con người, thậm chí đe doạ an toàn nhân loại. Chuyên gia cho rằng, điều quan trọng là sử dụng AI hợp lý, để nó trở thành công cụ chứ không phải vật thay thế.)",
          tips: ["HSK 5 đọc hiểu: cần phân tích quan điểm + suy luận", "Từ vựng nâng cao: 人工智能, 取代, 威胁, 合理"],
          quiz: [
            { question: "Theo bài viết, AI đang ảnh hưởng đến gì?", options: ["Chỉ giải trí", "Công việc và cuộc sống", "Chỉ y tế", "Chỉ giáo dục"], answer: 1, explanation: "AI正在改变着我们的工作和生活方式 = AI thay đổi công việc và cuộc sống." },
            { question: "Người ta lo ngại gì về AI?", options: ["AI quá đắt", "AI sẽ thay thế con người", "AI quá chậm", "AI khó sử dụng"], answer: 1, explanation: "担心AI会取代人类的工作岗位 = lo AI thay thế việc làm con người." },
            { question: "Chuyên gia khuyên điều gì?", options: ["Cấm AI hoàn toàn", "Sử dụng AI hợp lý như công cụ", "Phát triển AI mạnh hơn", "Bỏ qua lo ngại"], answer: 1, explanation: "合理地使用AI，让它成为工具 = dùng AI hợp lý, biến thành công cụ." },
          ],
        },
      },
    ],
  },
];
