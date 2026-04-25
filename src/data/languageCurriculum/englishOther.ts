// Cambridge & National Exam curriculum
import type { LanguageModule } from "./types";

export const cambridgeModules: LanguageModule[] = [
  {
    id: "cambridge-starters",
    title: "Cambridge Starters",
    titleEn: "Cambridge Starters",
    icon: "🌟",
    color: "from-yellow-500/20 to-orange-500/20",
    description: "Tiếng Anh cho trẻ 6-8 tuổi theo khung Cambridge",
    descriptionEn: "English for children 6-8 following Cambridge framework",
    category: "cambridge",
    language: "english",
    lessons: [
      {
        id: "cam-start-1",
        title: "Animals & Colors",
        titleEn: "Animals & Colors",
        level: 1,
        difficulty: "beginner",
        theory: "**Chủ đề: Động vật & Màu sắc**\n\n**Animals (Động vật):**\n- 🐱 cat: con mèo\n- 🐶 dog: con chó\n- 🐟 fish: con cá\n- 🐦 bird: con chim\n- 🐘 elephant: con voi\n- 🐒 monkey: con khỉ\n- 🦁 lion: con sư tử\n- 🐸 frog: con ếch\n\n**Colors (Màu sắc):**\n- 🔴 red: đỏ\n- 🔵 blue: xanh dương\n- 🟢 green: xanh lá\n- 🟡 yellow: vàng\n- 🟠 orange: cam\n- 🟣 purple: tím\n- ⚫ black: đen\n- ⚪ white: trắng\n\n**Mẫu câu:**\n- What color is it? → It's red.\n- What animal is this? → It's a cat.\n- I can see a blue bird.",
        theoryEn: "**Topic: Animals & Colors**\n\n**Animals:** cat, dog, fish, bird, elephant, monkey, lion, frog\n**Colors:** red, blue, green, yellow, orange, purple, black, white\n\n**Sentence patterns:**\n- What color is it? → It's red.\n- What animal is this? → It's a cat.",
        vocabulary: [
          { word: "cat", meaning: "con mèo", example: "I have a white cat.", partOfSpeech: "noun" },
          { word: "dog", meaning: "con chó", example: "The dog is brown.", partOfSpeech: "noun" },
          { word: "elephant", meaning: "con voi", example: "Elephants are very big.", partOfSpeech: "noun" },
          { word: "blue", meaning: "xanh dương", example: "The sky is blue.", partOfSpeech: "adjective" },
          { word: "green", meaning: "xanh lá", example: "The frog is green.", partOfSpeech: "adjective" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền tên động vật hoặc màu sắc phù hợp",
            instructionEn: "Fill in the animal or color name",
            sentences: [
              { text: "🐱 This is a ___.", textEn: "🐱 This is a ___.", answer: "cat" },
              { text: "🔴 The apple is ___.", textEn: "🔴 The apple is ___.", answer: "red" },
              { text: "🐘 The ___ is very big.", textEn: "🐘 The ___ is very big.", answer: "elephant" },
              { text: "🟢 The ___ is green.", textEn: "🟢 The ___ is green.", answer: "frog" },
            ],
          },
          {
            type: "sentence-reorder",
            instruction: "Sắp xếp thành câu đúng",
            instructionEn: "Arrange into correct sentence",
            items: [
              { scrambled: ["is", "The", "cat", "white"], correct: "The cat is white" },
              { scrambled: ["see", "I", "a", "can", "bird", "blue"], correct: "I can see a blue bird" },
            ],
          },
        ],
        quiz: [
          { question: "What does 'elephant' mean?", options: ["Cat", "Elephant", "Dog", "Fish"], answer: 1, explanation: "'Elephant' = a large grey animal with a trunk 🐘" },
          { question: "Which color is 'purple'?", options: ["Green", "Yellow", "Purple", "Orange"], answer: 2, explanation: "'Purple' = a color between red and blue 🟣" },
          { question: "'The dog is ___.' (brown)", options: ["The dog is browns.", "The dog is brown.", "The dog brown is.", "Dog is the brown."], answer: 1, explanation: "Structure: The + noun + is + adjective." },
        ],
      },
      {
        id: "cam-start-2",
        title: "Family & Body Parts",
        titleEn: "Family & Body Parts",
        level: 1,
        difficulty: "beginner",
        theory: "**Family Members (Gia đình):**\n- 👨 father/dad: bố\n- 👩 mother/mom: mẹ\n- 👦 brother: anh/em trai\n- 👧 sister: chị/em gái\n- 👴 grandfather: ông\n- 👵 grandmother: bà\n\n**Body Parts (Bộ phận cơ thể):**\n- 👀 eyes: mắt\n- 👃 nose: mũi\n- 👄 mouth: miệng\n- 👂 ears: tai\n- ✋ hands: tay\n- 🦶 feet: chân\n- 🦵 legs: chân (phần trên)\n- 💪 arms: cánh tay\n\n**Mẫu câu:**\n- This is my mother.\n- I have two eyes.\n- Touch your nose!",
        theoryEn: "**Family:** father, mother, brother, sister, grandfather, grandmother\n**Body:** eyes, nose, mouth, ears, hands, feet, legs, arms\n\n**Patterns:** This is my..., I have..., Touch your...!",
        vocabulary: [
          { word: "father", meaning: "bố", example: "My father is tall.", partOfSpeech: "noun" },
          { word: "mother", meaning: "mẹ", example: "My mother is kind.", partOfSpeech: "noun" },
          { word: "eyes", meaning: "mắt", example: "I have brown eyes.", partOfSpeech: "noun" },
          { word: "hands", meaning: "tay", example: "Wash your hands!", partOfSpeech: "noun" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền từ phù hợp",
            instructionEn: "Fill in the correct word",
            sentences: [
              { text: "My ___ is my mom's husband.", textEn: "My ___ is my mom's husband.", answer: "father" },
              { text: "I can see with my ___.", textEn: "I can see with my ___.", answer: "eyes" },
              { text: "I walk with my ___.", textEn: "I walk with my ___.", answer: "feet" },
            ],
          },
        ],
        quiz: [
          { question: "What does 'sister' mean?", options: ["Brother", "Sister", "Mother", "Grandmother"], answer: 1, explanation: "'Sister' = a female sibling." },
          { question: "We hear with our?", options: ["Eyes", "Nose", "Ears", "Mouth"], answer: 2, explanation: "'Ears' = the body parts we use for hearing." },
        ],
      },
    ],
  },
  {
    id: "cambridge-movers",
    title: "Cambridge Movers",
    titleEn: "Cambridge Movers",
    icon: "🚀",
    color: "from-green-500/20 to-teal-500/20",
    description: "Tiếng Anh cho trẻ 8-10 tuổi, cấp độ Movers",
    descriptionEn: "English for children 8-10, Movers level",
    category: "cambridge",
    language: "english",
    lessons: [
      {
        id: "cam-move-1",
        title: "Daily Routines & Time",
        titleEn: "Daily Routines & Time",
        level: 1,
        difficulty: "beginner",
        theory: "**Daily Routines (Thói quen hàng ngày):**\n- wake up: thức dậy\n- brush teeth: đánh răng\n- have breakfast: ăn sáng\n- go to school: đi học\n- have lunch: ăn trưa\n- do homework: làm bài tập\n- have dinner: ăn tối\n- go to bed: đi ngủ\n\n**Telling Time (Nói giờ):**\n- It's 7 o'clock. (7:00)\n- It's half past eight. (8:30)\n- It's quarter past nine. (9:15)\n- It's quarter to ten. (9:45)\n\n**Mẫu câu:**\n- I wake up at 6 o'clock.\n- What time do you go to school?\n- She has lunch at noon.\n- We usually do homework after school.",
        theoryEn: "**Daily Routines:** wake up, brush teeth, have breakfast, go to school\n**Telling Time:** o'clock, half past, quarter past, quarter to\n\n**Patterns:** I wake up at..., What time do you...?, She has lunch at...",
        vocabulary: [
          { word: "wake up", meaning: "thức dậy", example: "I wake up at 6 o'clock.", partOfSpeech: "phrasal verb" },
          { word: "breakfast", meaning: "bữa sáng", example: "I have breakfast at 7.", partOfSpeech: "noun" },
          { word: "homework", meaning: "bài tập về nhà", example: "I do homework after school.", partOfSpeech: "noun" },
          { word: "o'clock", meaning: "giờ đúng", example: "It's 3 o'clock.", partOfSpeech: "adverb" },
        ],
        exercises: [
          {
            type: "sentence-reorder",
            instruction: "Sắp xếp thành câu đúng",
            instructionEn: "Arrange into correct sentence",
            items: [
              { scrambled: ["at", "wake up", "I", "6", "o'clock"], correct: "I wake up at 6 o'clock" },
              { scrambled: ["do", "time", "you", "What", "school", "go to", "?"], correct: "What time do you go to school?" },
              { scrambled: ["has", "She", "at", "lunch", "noon"], correct: "She has lunch at noon" },
            ],
          },
          {
            type: "fill-in-blank",
            instruction: "Điền hoạt động phù hợp",
            instructionEn: "Fill in the appropriate activity",
            sentences: [
              { text: "In the morning, I ___ my teeth.", textEn: "In the morning, I ___ my teeth.", answer: "brush" },
              { text: "After school, I ___ homework.", textEn: "After school, I ___ homework.", answer: "do" },
              { text: "At 9 PM, I ___ to bed.", textEn: "At 9 PM, I ___ to bed.", answer: "go" },
            ],
          },
        ],
        quiz: [
          { question: "What time is 'half past eight'?", options: ["8:00", "8:15", "8:30", "8:45"], answer: 2, explanation: "'Half past eight' = 8:30 (thirty minutes after eight)." },
          { question: "What do we say before going to bed?", options: ["Good morning!", "Good night!", "Good afternoon!", "Good day!"], answer: 1, explanation: "'Good night!' is used before going to sleep." },
        ],
      },
    ],
  },
];

export const nationalExamModules: LanguageModule[] = [
  {
    id: "natexam-grammar",
    title: "Ngữ pháp ôn thi THPT",
    titleEn: "National Exam Grammar Review",
    icon: "📋",
    color: "from-red-500/20 to-rose-500/20",
    description: "Ôn tập ngữ pháp trọng tâm cho thi THPT Quốc gia",
    descriptionEn: "Key grammar review for the National High School Exam",
    category: "national-exam",
    language: "english",
    lessons: [
      {
        id: "nat-gram-1",
        title: "Thì trong tiếng Anh (Tenses)",
        titleEn: "English Tenses Review",
        level: 2,
        difficulty: "intermediate",
        theory: "**12 Thì trong Tiếng Anh - Tổng hợp:**\n\n**1. Present Simple:** S + V(s/es)\n- Thói quen, sự thật: She *goes* to school every day.\n\n**2. Present Continuous:** S + am/is/are + V-ing\n- Đang xảy ra: They *are studying* now.\n\n**3. Present Perfect:** S + have/has + V3\n- Đã xảy ra, còn liên quan hiện tại: I *have lived* here for 5 years.\n\n**4. Past Simple:** S + V2/ed\n- Đã xảy ra và kết thúc: He *visited* Hanoi last year.\n\n**5. Past Continuous:** S + was/were + V-ing\n- Đang xảy ra tại một thời điểm quá khứ: I *was reading* at 8 PM.\n\n**6. Past Perfect:** S + had + V3\n- Xảy ra TRƯỚC một hành động khác trong quá khứ: She *had left* before I arrived.\n\n**7. Future Simple:** S + will + V\n- Dự đoán, quyết định tức thời: It *will rain* tomorrow.\n\n**Dấu hiệu nhận biết:**\n- every day, usually, often → Present Simple\n- now, at the moment → Present Continuous\n- already, yet, since, for → Present Perfect\n- yesterday, last week, ago → Past Simple\n- at that time, while → Past Continuous\n- before, after, by the time → Past Perfect\n- tomorrow, next week → Future Simple",
        theoryEn: "**12 English Tenses - Summary:**\n\n1. Present Simple: habits/facts\n2. Present Continuous: happening now\n3. Present Perfect: past with present relevance\n4. Past Simple: completed past\n5. Past Continuous: in progress at past moment\n6. Past Perfect: before another past action\n7. Future Simple: predictions/decisions",
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Chia động từ đúng thì",
            instructionEn: "Use the correct tense",
            sentences: [
              { text: "She ___ (go) to school every day.", textEn: "She ___ (go) to school every day.", answer: "goes", hint: "Present Simple" },
              { text: "They ___ (study) when I called.", textEn: "They ___ (study) when I called.", answer: "were studying", hint: "Past Continuous" },
              { text: "I ___ (already/finish) my homework.", textEn: "I ___ (already/finish) my homework.", answer: "have already finished", hint: "Present Perfect" },
              { text: "He ___ (visit) Paris last summer.", textEn: "He ___ (visit) Paris last summer.", answer: "visited", hint: "Past Simple" },
              { text: "By the time she arrived, he ___ (leave).", textEn: "By the time she arrived, he ___ (leave).", answer: "had left", hint: "Past Perfect" },
            ],
          },
        ],
        quiz: [
          { question: "'Since' and 'for' are signal words for which tense?", options: ["Past Simple", "Present Perfect", "Future Simple", "Present Continuous"], answer: 1, explanation: "'Since' (from a point in time) and 'for' (duration) are signals for Present Perfect." },
          { question: "'While' is usually used with which tense?", options: ["Present Simple", "Present Perfect", "Past Continuous", "Future Simple"], answer: 2, explanation: "'While' is used with Past Continuous to describe an action in progress." },
          { question: "Choose the correct sentence:", options: ["I have visited Hanoi yesterday.", "I visited Hanoi yesterday.", "I was visit Hanoi yesterday.", "I had visit Hanoi yesterday."], answer: 1, explanation: "'Yesterday' → Past Simple. Don't use Present Perfect with specific past time markers." },
        ],
      },
      {
        id: "nat-gram-2",
        title: "Câu điều kiện (Conditionals)",
        titleEn: "Conditional Sentences",
        level: 2,
        difficulty: "intermediate",
        theory: "**4 loại câu điều kiện:**\n\n**Type 0 - Sự thật/Quy luật:**\nIf + Present Simple, Present Simple\n→ If you heat water to 100°C, it *boils*.\n\n**Type 1 - Có thể xảy ra (tương lai):**\nIf + Present Simple, will + V\n→ If it *rains*, I *will stay* home.\n\n**Type 2 - Không có thật ở hiện tại:**\nIf + Past Simple, would + V\n→ If I *were* rich, I *would travel* the world.\n⚠️ Luôn dùng 'were' cho tất cả chủ ngữ (I were, he were)\n\n**Type 3 - Không có thật ở quá khứ:**\nIf + Past Perfect, would have + V3\n→ If I *had studied* harder, I *would have passed* the exam.\n\n**Đảo ngữ:**\n- Type 1: *Should* it rain, I will stay home.\n- Type 2: *Were* I rich, I would travel.\n- Type 3: *Had* I studied harder, I would have passed.",
        theoryEn: "**4 types of conditionals:**\nType 0: If + Present, Present (facts)\nType 1: If + Present, will + V (possible future)\nType 2: If + Past, would + V (unreal present)\nType 3: If + Past Perfect, would have + V3 (unreal past)",
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Hoàn thành câu điều kiện",
            instructionEn: "Complete the conditional sentences",
            sentences: [
              { text: "If I ___ (be) you, I would study abroad.", textEn: "If I ___ (be) you, I would study abroad.", answer: "were", hint: "Type 2: dùng 'were'" },
              { text: "If she studies hard, she ___ (pass) the exam.", textEn: "If she studies hard, she ___ (pass).", answer: "will pass", hint: "Type 1" },
              { text: "If he ___ (study) harder, he would have passed.", textEn: "If he ___ (study) harder...", answer: "had studied", hint: "Type 3: Past Perfect" },
              { text: "If you heat ice, it ___ (melt).", textEn: "If you heat ice, it ___.", answer: "melts", hint: "Type 0: sự thật" },
            ],
          },
          {
            type: "sentence-reorder",
            instruction: "Sắp xếp thành câu điều kiện đúng",
            instructionEn: "Arrange into correct conditional sentence",
            items: [
              { scrambled: ["rich,", "were", "I", "If", "would", "I", "world.", "the", "travel"], correct: "If I were rich, I would travel the world." },
              { scrambled: ["rains,", "it", "If", "will", "we", "home.", "stay"], correct: "If it rains, we will stay home." },
            ],
          },
        ],
        quiz: [
          { question: "Which tense is used in the IF clause of Type 2 conditionals?", options: ["Present Simple", "Past Simple", "Past Perfect", "Future Simple"], answer: 1, explanation: "Type 2: If + Past Simple (use 'were' for all subjects)." },
          { question: "'If I had known, I would have helped.' What type is this?", options: ["Type 1", "Type 2", "Type 3", "Type 0"], answer: 2, explanation: "If + had + V3 → would have + V3 = Type 3 (unreal past condition)." },
          { question: "What is the inversion of 'If I were you'?", options: ["Were I you", "Was I you", "If were I you", "Should I you"], answer: 0, explanation: "Type 2 inversion: Were + S → Were I you, I would..." },
        ],
      },
      {
        id: "nat-gram-3",
        title: "Câu bị động (Passive Voice)",
        titleEn: "Passive Voice",
        level: 2,
        difficulty: "intermediate",
        theory: "**Passive Voice:** S + be + V3 (+ by + agent)\n\n**Chuyển đổi theo thì:**\n\n| Thì | Active | Passive |\n|-----|--------|---------|\n| Present Simple | They **build** houses. | Houses **are built**. |\n| Past Simple | They **built** a school. | A school **was built**. |\n| Present Perfect | They **have built** a bridge. | A bridge **has been built**. |\n| Modal verbs | They **can solve** it. | It **can be solved**. |\n\n**Câu bị động đặc biệt:**\n\n1. **Với 2 tân ngữ:** They gave **me** **a book**.\n→ I was given a book. (ưu tiên)\n→ A book was given to me.\n\n2. **Với động từ tường thuật:** People say that...\n→ It is said that...\n→ He is said to be...\n\n3. **Với have/get:** I **had/got** my car **repaired**. (nhờ ai làm gì)",
        theoryEn: "**Passive Voice:** S + be + V3\n\n**By tense:**\n- Present: am/is/are + V3\n- Past: was/were + V3\n- Perfect: have/has been + V3\n- Modal: can/must be + V3",
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Chuyển sang câu bị động",
            instructionEn: "Convert to passive voice",
            sentences: [
              { text: "They build houses. → Houses ___ ___.", textEn: "They build houses → Houses ___.", answer: "are built", hint: "Present Simple Passive" },
              { text: "Someone stole my bike. → My bike ___ ___.", textEn: "Someone stole my bike → My bike ___.", answer: "was stolen", hint: "Past Simple Passive" },
              { text: "They can solve the problem. → The problem ___ ___ ___.", textEn: "They can solve it → It ___.", answer: "can be solved", hint: "Modal Passive" },
              { text: "People say that he is rich. → It ___ ___ that he is rich.", textEn: "People say he is rich → It ___.", answer: "is said", hint: "Reporting Passive" },
            ],
          },
        ],
        quiz: [
          { question: "What is the passive of 'They have finished the project'?", options: ["The project have been finished.", "The project has been finished.", "The project was finished.", "The project is finished."], answer: 1, explanation: "Present Perfect Passive: has/have been + V3. 'The project' (singular) → 'has been finished'." },
          { question: "Which sentence is correct?", options: ["My car was repaired.", "My car was repair.", "My car is repair.", "My car repaired."], answer: 0, explanation: "Passive: was + V3 (repaired). 'My car was repaired' = correct passive form." },
        ],
      },
    ],
  },
  {
    id: "natexam-reading",
    title: "Đọc hiểu THPT",
    titleEn: "National Exam Reading",
    icon: "📰",
    color: "from-indigo-500/20 to-blue-500/20",
    description: "Luyện đọc hiểu dạng đề thi THPT Quốc gia",
    descriptionEn: "Reading practice in National Exam format",
    category: "national-exam",
    language: "english",
    lessons: [
      {
        id: "nat-read-1",
        title: "Đọc hiểu: Tìm ý chính",
        titleEn: "Reading: Finding Main Ideas",
        level: 2,
        difficulty: "intermediate",
        theory: "**Tìm ý chính (Main Idea)** - dạng câu hỏi phổ biến nhất.\n\n**Câu hỏi mẫu:**\n- What is the passage mainly about?\n- What is the best title for the passage?\n- What is the main idea of paragraph 2?\n\n**Chiến lược:**\n1. Đọc câu **đầu tiên** và **cuối cùng** của mỗi đoạn\n2. Main idea thường nằm ở **topic sentence** (câu đầu đoạn)\n3. Loại trừ đáp án **quá cụ thể** (chỉ nói về 1 chi tiết nhỏ)\n4. Loại trừ đáp án **quá chung** (không phản ánh nội dung cụ thể)\n\n**Ví dụ:**\n'Social media has transformed communication in the 21st century. People can now connect instantly across continents. However, this constant connectivity has also led to concerns about privacy and mental health.'\n\n→ Main idea: The impact of social media on communication and its drawbacks.",
        theoryEn: "**Finding Main Ideas** - the most common question type.\n\n**Strategy:**\n1. Read first and last sentences of each paragraph\n2. Main idea is usually in the topic sentence\n3. Eliminate too specific or too general answers",
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Đọc đoạn văn và xác định Main Idea:\n\n'Recycling is one of the most effective ways to reduce waste. By separating paper, plastic, and glass, individuals can help conserve natural resources. Moreover, recycling reduces the amount of waste sent to landfills, which helps protect the environment.'",
            instructionEn: "Read and identify the Main Idea",
            sentences: [
              { text: "Main idea: The benefits of ___ for the environment.", textEn: "Main idea: Benefits of ___.", answer: "recycling" },
            ],
          },
        ],
        quiz: [
          { question: "Where is the main idea usually found in a paragraph?", options: ["Middle sentence", "First sentence (topic sentence)", "Last sentence", "No fixed position"], answer: 1, explanation: "The main idea is usually in the topic sentence - the first sentence of the paragraph." },
          { question: "Which answer should be eliminated?", options: ["An answer summarizing the whole passage", "An answer too specific (only 1 detail)", "An answer with keywords from the text", "An answer paraphrasing the text"], answer: 1, explanation: "An overly specific answer only mentions one small detail, not the main idea." },
        ],
      },
    ],
  },
];
