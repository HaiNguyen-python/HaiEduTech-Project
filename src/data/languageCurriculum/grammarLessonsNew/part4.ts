import type { LanguageLesson } from "../types";

/** Batch 4: beginner foundation lessons (tenses, articles & prepositions, modals). */
export const newGrammarLessonsPart4: Record<string, LanguageLesson[]> = {
  "grammar-tenses": [
    {
      id: "tenses-be-basic-statements",
      title: "Động từ to be và câu phủ định cơ bản",
      titleEn: "The verb to be and simple negatives",
      level: 1,
      difficulty: "beginner",
      theory: `## To be: am, is, are

### 1. Quy tắc
Động từ **to be** đổi theo chủ ngữ: **I am**, **he/she/it is**, **we/you/they are**.

### 2. Công thức
| Dạng | Mẫu câu |
| --- | --- |
| Khẳng định | She **is** a student. |
| Phủ định | They **are not** ready. |
| Câu hỏi | **Am** I late? |

### 3. Khi nào dùng
- Giới thiệu tên, tuổi, nghề nghiệp.
- Miêu tả trạng thái hoặc cảm xúc.
- Nói về vị trí của người và vật.

### 4. Câu mẫu
- *I am a teacher.* (Tôi là giáo viên.)
- *My brother is not at home.* (Anh tôi không có ở nhà.)
- *We are very tired today.* (Hôm nay chúng tôi rất mệt.)

### 5. Lỗi thường gặp
- Sai: *She are my friend.* Đúng: *She is my friend.*
- Sai: *I no am ready.* Đúng: *I am not ready.*

### 6. So sánh nhanh
**is** dùng cho một người hoặc một vật, **are** dùng cho nhiều người hoặc nhiều vật.`,
      theoryEn: `## To be: am, is, are

### 1. Rule
The verb **to be** changes with the subject: **I am**, **he/she/it is**, **we/you/they are**.

### 2. Form
| Type | Model |
| --- | --- |
| Positive | She **is** a student. |
| Negative | They **are not** ready. |
| Question | **Am** I late? |

### 3. When to use
- To give a name, an age or a job.
- To describe a state or a feeling.
- To say where people and things are.

### 4. Model sentences
- I am a teacher.
- My brother is not at home.
- We are very tired today.

### 5. Common mistakes
- Wrong: She are my friend. Right: She is my friend. Why: a singular subject takes is.
- Wrong: I no am ready. Right: I am not ready. Why: the negative word not follows the verb be.

### 6. Contrast box
Use **is** for one person or thing and **are** for more than one person or thing.`,
      proTips: [
        "Học theo cặp chủ ngữ - động từ: I am, he is, they are.",
        "Viết dạng rút gọn khi nói: I'm, she's, they aren't.",
        "Đặt not ngay sau am, is, are để tạo câu phủ định.",
      ],
      proTipsEn: [
        "Learn subject and verb as one pair: I am, he is, they are.",
        "Use contractions in speech: I'm, she's, they aren't.",
        "Put not directly after am, is or are to make a negative.",
      ],
      vocabulary: [
        { word: "student", ipa: "/ˈstjuːdnt/", meaning: "học sinh, sinh viên", meaningEn: "a person who studies", example: "My sister is a student in Hanoi.", exampleEn: "My sister is a student in Hanoi.", partOfSpeech: "noun" },
        { word: "tired", ipa: "/ˈtaɪəd/", meaning: "mệt", meaningEn: "needing rest", example: "The children are tired after school.", exampleEn: "The children are tired after school.", partOfSpeech: "adjective" },
        { word: "ready", ipa: "/ˈredi/", meaning: "sẵn sàng", meaningEn: "prepared for something", example: "I am ready for the test.", exampleEn: "I am ready for the test.", partOfSpeech: "adjective" },
        { word: "neighbour", ipa: "/ˈneɪbə/", meaning: "người láng giềng", meaningEn: "a person living next to you", example: "Our neighbour is very kind.", exampleEn: "Our neighbour is very kind.", partOfSpeech: "noun" },
      ],
      exercises: [
        {
          type: "fill-in-blank",
          instruction: "Điền am, is hoặc are.",
          instructionEn: "Write am, is or are.",
          sentences: [
            { text: "My father ___ a doctor.", textEn: "My father ___ a doctor.", answer: "is" },
            { text: "I ___ from Da Nang.", textEn: "I ___ from Da Nang.", answer: "am" },
            { text: "The books ___ on the desk.", textEn: "The books ___ on the desk.", answer: "are" },
          ],
        },
        {
          type: "error-correction",
          instruction: "Sửa lỗi động từ to be.",
          instructionEn: "Correct the mistake with the verb to be.",
          items: [
            { wrong: "She are my classmate.", correct: "She is my classmate.", explanation: "A singular subject takes is." },
            { wrong: "We is not late.", correct: "We are not late.", explanation: "The plural subject we takes are." },
          ],
        },
        {
          type: "transformation",
          instruction: "Viết lại câu ở dạng phủ định.",
          instructionEn: "Rewrite each sentence in the negative.",
          items: [
            { prompt: "He is busy this morning.", target: "He is not busy this morning.", cue: "not" },
            { prompt: "They are at the market.", target: "They are not at the market.", cue: "not" },
          ],
        },
        {
          type: "matching",
          instruction: "Nối chủ ngữ với dạng đúng của to be.",
          instructionEn: "Match each subject with the correct form of to be.",
          pairs: [
            { left: "I", right: "am a student" },
            { left: "My teacher", right: "is very patient" },
            { left: "My parents", right: "are at work" },
          ],
        },
      ],
      quiz: [
        { question: "My mother ___ a nurse.", options: ["are", "is", "am", "be"], answer: 1, explanation: "A singular subject takes is." },
        { question: "I ___ happy today.", options: ["is", "are", "am", "be"], answer: 2, explanation: "The subject I always takes am." },
        { question: "The students ___ in the library.", options: ["are", "is", "am", "was"], answer: 0, explanation: "A plural subject takes are." },
        { question: "Choose the correct negative sentence.", options: ["He not is ready.", "He is not ready.", "He no is ready.", "He is no ready."], answer: 1, explanation: "Not comes directly after is." },
        { question: "___ you a new student here?", options: ["Is", "Am", "Are", "Be"], answer: 2, explanation: "You takes are in questions." },
        { question: "Which sentence uses to be correctly with one person?", options: ["My friend are kind.", "My friend is kind.", "My friend am kind.", "My friend be kind."], answer: 1, explanation: "One person takes is." },
        { question: "We ___ not at school on Sunday.", options: ["is", "am", "are", "be"], answer: 2, explanation: "We takes are." },
        { question: "Which contraction means she is?", options: ["she's", "shes'", "she're", "she'is"], answer: 0, explanation: "She is contracts to she's." },
        { question: "It ___ very cold in Finland in January.", options: ["are", "am", "is", "be"], answer: 2, explanation: "It takes is." },
        { question: "Which sentence is correct?", options: ["They aren't tired.", "They isn't tired.", "They amn't tired.", "They not are tired."], answer: 0, explanation: "Are not contracts to aren't." },
      ],
    },
    {
      id: "tenses-present-simple-basics",
      title: "Hiện tại đơn với chủ ngữ số ít và số nhiều",
      titleEn: "Present simple with singular and plural subjects",
      level: 1,
      difficulty: "beginner",
      theory: `## Hiện tại đơn cơ bản

### 1. Quy tắc
Với **he, she, it** thêm **-s** vào động từ; các chủ ngữ khác giữ nguyên động từ.

### 2. Công thức
| Dạng | Mẫu câu |
| --- | --- |
| Khẳng định | She **works** in a bank. |
| Phủ định | They **do not live** here. |
| Câu hỏi | **Does** he **speak** English? |

### 3. Khi nào dùng
- Nói về thói quen hằng ngày.
- Nói về sự thật hiển nhiên.
- Nói về thời gian biểu cố định.

### 4. Câu mẫu
- *I go to school at seven.* (Tôi đi học lúc bảy giờ.)
- *My sister studies Chinese.* (Em tôi học tiếng Trung.)
- *We do not watch TV on weekdays.* (Chúng tôi không xem TV vào ngày thường.)

### 5. Lỗi thường gặp
- Sai: *He go to work by bus.* Đúng: *He goes to work by bus.*
- Sai: *She doesn't likes coffee.* Đúng: *She doesn't like coffee.*

### 6. So sánh nhanh
Sau **do/does** động từ luôn ở dạng nguyên mẫu, không thêm **-s**.`,
      theoryEn: `## Present simple basics

### 1. Rule
Add **-s** to the verb after **he, she, it**; keep the base verb for all other subjects.

### 2. Form
| Type | Model |
| --- | --- |
| Positive | She **works** in a bank. |
| Negative | They **do not live** here. |
| Question | **Does** he **speak** English? |

### 3. When to use
- For daily habits and routines.
- For general facts.
- For fixed timetables.

### 4. Model sentences
- I go to school at seven.
- My sister studies Chinese.
- We do not watch TV on weekdays.

### 5. Common mistakes
- Wrong: He go to work by bus. Right: He goes to work by bus. Why: he needs the -s ending.
- Wrong: She doesn't likes coffee. Right: She doesn't like coffee. Why: after does the verb stays in the base form.

### 6. Contrast box
After **do/does** the main verb is always the base form, never with **-s**.`,
      proTips: [
        "Nhớ câu thần chú: he, she, it thì thêm s.",
        "Động từ kết thúc bằng -y sau phụ âm thì đổi thành -ies: study - studies.",
        "Chỉ dùng does cho he, she, it; các chủ ngữ khác dùng do.",
      ],
      proTipsEn: [
        "Remember the chant: he, she, it takes an s.",
        "Verbs ending in consonant plus -y become -ies: study becomes studies.",
        "Use does only with he, she and it; all other subjects take do.",
      ],
      vocabulary: [
        { word: "routine", ipa: "/ruːˈtiːn/", meaning: "việc làm thường ngày", meaningEn: "a regular way of doing things", example: "My morning routine starts at six.", exampleEn: "My morning routine starts at six.", partOfSpeech: "noun" },
        { word: "usually", ipa: "/ˈjuːʒuəli/", meaning: "thường thường", meaningEn: "most of the time", example: "She usually walks to school.", exampleEn: "She usually walks to school.", partOfSpeech: "adverb" },
        { word: "weekday", ipa: "/ˈwiːkdeɪ/", meaning: "ngày trong tuần", meaningEn: "any day from Monday to Friday", example: "We study English on weekdays.", exampleEn: "We study English on weekdays.", partOfSpeech: "noun" },
        { word: "practise", ipa: "/ˈpræktɪs/", meaning: "luyện tập", meaningEn: "to do something regularly to improve", example: "He practises the guitar every evening.", exampleEn: "He practises the guitar every evening.", partOfSpeech: "verb" },
      ],
      exercises: [
        {
          type: "fill-in-blank",
          instruction: "Chia động từ ở hiện tại đơn.",
          instructionEn: "Put the verb into the present simple.",
          sentences: [
            { text: "My brother ___ (play) football on Sunday.", textEn: "My brother ___ (play) football on Sunday.", answer: "plays" },
            { text: "We ___ (finish) class at four o'clock.", textEn: "We ___ (finish) class at four o'clock.", answer: "finish" },
            { text: "She ___ (study) two languages at university.", textEn: "She ___ (study) two languages at university.", answer: "studies" },
          ],
        },
        {
          type: "error-correction",
          instruction: "Sửa lỗi ở thì hiện tại đơn.",
          instructionEn: "Correct the present simple mistake.",
          items: [
            { wrong: "My cousin live in Turku.", correct: "My cousin lives in Turku.", explanation: "A singular subject needs the -s ending." },
            { wrong: "Does she likes chocolate?", correct: "Does she like chocolate?", explanation: "After does the verb stays in the base form." },
          ],
        },
        {
          type: "transformation",
          instruction: "Viết lại câu với chủ ngữ được cho.",
          instructionEn: "Rewrite the sentence with the given subject.",
          items: [
            { prompt: "I teach young learners.", target: "She teaches young learners.", cue: "She" },
            { prompt: "They cook dinner together.", target: "He cooks dinner together.", cue: "He" },
          ],
        },
        {
          type: "matching",
          instruction: "Nối chủ ngữ với động từ đúng.",
          instructionEn: "Match each subject with the correct verb form.",
          pairs: [
            { left: "My father", right: "drives to work" },
            { left: "My friends", right: "walk to school" },
            { left: "The shop", right: "opens at eight" },
          ],
        },
      ],
      quiz: [
        { question: "My sister ___ English every evening.", options: ["study", "studies", "studys", "studing"], answer: 1, explanation: "Consonant plus -y becomes -ies after she." },
        { question: "We ___ breakfast at half past six.", options: ["has", "haves", "have", "having"], answer: 2, explanation: "We takes the base form have." },
        { question: "___ your brother work in a hospital?", options: ["Do", "Does", "Is", "Are"], answer: 1, explanation: "A singular third person subject takes does." },
        { question: "He ___ like spicy food.", options: ["doesn't", "don't", "isn't", "aren't"], answer: 0, explanation: "He takes doesn't in the negative." },
        { question: "Which sentence describes a habit correctly?", options: ["She goes to the gym twice a week.", "She go to the gym twice a week.", "She going to the gym twice a week.", "She is go to the gym twice a week."], answer: 0, explanation: "Habits use the present simple with -s after she." },
        { question: "The train ___ at seven every morning.", options: ["leave", "leaves", "leaving", "left"], answer: 1, explanation: "A timetable uses the present simple with -s." },
        { question: "They ___ not watch television during the week.", options: ["does", "is", "do", "are"], answer: 2, explanation: "They takes do in the negative." },
        { question: "Choose the correct question.", options: ["Do she speak Finnish?", "Does she speaks Finnish?", "Does she speak Finnish?", "Is she speak Finnish?"], answer: 2, explanation: "Does plus base form is correct." },
        { question: "My mother ___ vegetables at the local market.", options: ["buy", "buys", "buyes", "buying"], answer: 1, explanation: "Add -s after a singular subject." },
        { question: "Which verb form follows does?", options: ["base form", "-s form", "-ing form", "past form"], answer: 0, explanation: "The base form always follows does." },
      ],
    },
  ],
  "grammar-articles-prepositions": [
    {
      id: "articles-a-an-the-daily-life",
      title: "A, an, the trong tình huống hằng ngày",
      titleEn: "A, an and the in everyday situations",
      level: 1,
      difficulty: "beginner",
      theory: `## Mạo từ cơ bản

### 1. Quy tắc
Dùng **a/an** khi nhắc đến vật lần đầu, dùng **the** khi người nghe đã biết vật đó.

### 2. Công thức
| Mạo từ | Khi dùng | Mẫu câu |
| --- | --- | --- |
| a | trước phụ âm | I have **a** bicycle. |
| an | trước nguyên âm | She eats **an** apple. |
| the | vật đã xác định | **The** apple is sweet. |

### 3. Khi nào dùng
- Giới thiệu một vật mới trong câu chuyện.
- Nhắc lại vật đã được nói đến.
- Nói về vật duy nhất: the sun, the moon.

### 4. Câu mẫu
- *There is a cat in the garden.* (Có một con mèo trong vườn.)
- *The cat is sleeping now.* (Con mèo đang ngủ.)
- *He wants an orange juice.* (Anh ấy muốn một ly nước cam.)

### 5. Lỗi thường gặp
- Sai: *I need a umbrella.* Đúng: *I need an umbrella.*
- Sai: *Sun is very hot today.* Đúng: *The sun is very hot today.*

### 6. So sánh nhanh
**a/an** giới thiệu vật mới, **the** nhắc lại vật đã biết.`,
      theoryEn: `## Basic articles

### 1. Rule
Use **a/an** for something mentioned for the first time and **the** when the listener already knows it.

### 2. Form
| Article | Use | Model |
| --- | --- | --- |
| a | before a consonant sound | I have **a** bicycle. |
| an | before a vowel sound | She eats **an** apple. |
| the | a known item | **The** apple is sweet. |

### 3. When to use
- To introduce a new thing in a story.
- To mention something again.
- To talk about unique things: the sun, the moon.

### 4. Model sentences
- There is a cat in the garden.
- The cat is sleeping now.
- He wants an orange juice.

### 5. Common mistakes
- Wrong: I need a umbrella. Right: I need an umbrella. Why: umbrella starts with a vowel sound.
- Wrong: Sun is very hot today. Right: The sun is very hot today. Why: unique things take the.

### 6. Contrast box
**A/an** introduces something new, while **the** points back to something already known.`,
      proTips: [
        "Chọn a hay an theo âm thanh, không theo chữ cái: an hour, a university.",
        "Dùng the khi chỉ có một vật duy nhất trong ngữ cảnh.",
        "Không dùng a/an trước danh từ không đếm được: water, money.",
      ],
      proTipsEn: [
        "Choose a or an by sound, not spelling: an hour, a university.",
        "Use the when only one such thing exists in the context.",
        "Never use a/an before uncountable nouns such as water or money.",
      ],
      vocabulary: [
        { word: "umbrella", ipa: "/ʌmˈbrelə/", meaning: "cái dù", meaningEn: "a cover used in the rain", example: "Take an umbrella with you.", exampleEn: "Take an umbrella with you.", partOfSpeech: "noun" },
        { word: "bicycle", ipa: "/ˈbaɪsɪkl/", meaning: "xe đạp", meaningEn: "a two-wheeled vehicle", example: "I ride a bicycle to school.", exampleEn: "I ride a bicycle to school.", partOfSpeech: "noun" },
        { word: "garden", ipa: "/ˈɡɑːdn/", meaning: "khu vườn", meaningEn: "an area for plants", example: "The garden behind our house is small.", exampleEn: "The garden behind our house is small.", partOfSpeech: "noun" },
        { word: "engineer", ipa: "/ˌendʒɪˈnɪə/", meaning: "kỹ sư", meaningEn: "a person who designs machines or systems", example: "My uncle is an engineer.", exampleEn: "My uncle is an engineer.", partOfSpeech: "noun" },
      ],
      exercises: [
        {
          type: "fill-in-blank",
          instruction: "Điền a, an hoặc the.",
          instructionEn: "Write a, an or the.",
          sentences: [
            { text: "My mother works as ___ nurse in a small clinic.", textEn: "My mother works as ___ nurse in a small clinic.", answer: "a" },
            { text: "I bought ___ egg and some bread.", textEn: "I bought ___ egg and some bread.", answer: "an" },
            { text: "Please close ___ door behind you.", textEn: "Please close ___ door behind you.", answer: "the" },
          ],
        },
        {
          type: "error-correction",
          instruction: "Sửa lỗi mạo từ.",
          instructionEn: "Correct the article mistake.",
          items: [
            { wrong: "He is a honest boy.", correct: "He is an honest boy.", explanation: "Honest begins with a vowel sound." },
            { wrong: "Moon looks beautiful tonight.", correct: "The moon looks beautiful tonight.", explanation: "Unique objects take the." },
          ],
        },
        {
          type: "transformation",
          instruction: "Viết lại câu bằng mạo từ được gợi ý.",
          instructionEn: "Rewrite the sentence using the article in the cue.",
          items: [
            { prompt: "I saw cat near our gate.", target: "I saw a cat near our gate.", cue: "a" },
            { prompt: "Answer is written on page ten.", target: "The answer is written on page ten.", cue: "the" },
          ],
        },
        {
          type: "matching",
          instruction: "Nối danh từ với mạo từ đúng.",
          instructionEn: "Match each noun with the correct article.",
          pairs: [
            { left: "hour", right: "an hour" },
            { left: "university", right: "a university" },
            { left: "sun", right: "the sun" },
          ],
        },
      ],
      quiz: [
        { question: "She wants ___ apple for breakfast.", options: ["a", "an", "the", "no article"], answer: 1, explanation: "Apple starts with a vowel sound." },
        { question: "I live in ___ small village near the sea.", options: ["an", "a", "the", "no article"], answer: 1, explanation: "Small begins with a consonant sound." },
        { question: "Can you turn off ___ light, please?", options: ["a", "an", "the", "no article"], answer: 2, explanation: "Both speakers know which light." },
        { question: "My father is ___ engineer.", options: ["a", "an", "the", "no article"], answer: 1, explanation: "Engineer starts with a vowel sound." },
        { question: "Which sentence is correct?", options: ["I waited an hour.", "I waited a hour.", "I waited the hour.", "I waited hour."], answer: 0, explanation: "Hour has a silent h, so it takes an." },
        { question: "___ earth moves around the sun.", options: ["A", "An", "The", "No article"], answer: 2, explanation: "Unique objects take the." },
        { question: "I need ___ water, not juice.", options: ["a", "an", "some", "the"], answer: 2, explanation: "Uncountable nouns do not take a/an." },
        { question: "We watched ___ film last night. ___ film was funny.", options: ["a / The", "the / A", "an / The", "a / An"], answer: 0, explanation: "First mention takes a, second mention takes the." },
        { question: "She is ___ university student in Helsinki.", options: ["an", "a", "the", "no article"], answer: 1, explanation: "University begins with a /j/ sound, so it takes a." },
        { question: "When do you use the?", options: ["for a new thing", "for a known thing", "for plural only", "for questions only"], answer: 1, explanation: "The refers to something already identified." },
      ],
    },
    {
      id: "prepositions-time-place-basics",
      title: "Giới từ chỉ thời gian và địa điểm cơ bản",
      titleEn: "Basic prepositions of time and place",
      level: 2,
      difficulty: "beginner",
      theory: `## In, on, at cho thời gian và địa điểm

### 1. Quy tắc
**in** cho khoảng lớn, **on** cho ngày và bề mặt, **at** cho điểm cụ thể.

### 2. Công thức
| Giới từ | Thời gian | Địa điểm |
| --- | --- | --- |
| in | in July, in 2026 | in Hanoi, in the room |
| on | on Monday, on 5 May | on the table, on the wall |
| at | at six o'clock, at noon | at school, at the bus stop |

### 3. Khi nào dùng
- Nói giờ hẹn và ngày hẹn.
- Chỉ vị trí của người và vật.
- Miêu tả lịch trình đi lại.

### 4. Câu mẫu
- *Our class starts at eight.* (Lớp học bắt đầu lúc tám giờ.)
- *We travel in December.* (Chúng tôi đi du lịch vào tháng Mười Hai.)
- *The keys are on the shelf.* (Chìa khóa ở trên kệ.)

### 5. Lỗi thường gặp
- Sai: *I wake up in six o'clock.* Đúng: *I wake up at six o'clock.*
- Sai: *She was born at 2010.* Đúng: *She was born in 2010.*

### 6. So sánh nhanh
**at** chỉ điểm nhỏ, **on** chỉ ngày hoặc bề mặt, **in** chỉ khoảng thời gian và không gian lớn.`,
      theoryEn: `## In, on and at for time and place

### 1. Rule
Use **in** for large periods and spaces, **on** for days and surfaces, and **at** for exact points.

### 2. Form
| Preposition | Time | Place |
| --- | --- | --- |
| in | in July, in 2026 | in Hanoi, in the room |
| on | on Monday, on 5 May | on the table, on the wall |
| at | at six o'clock, at noon | at school, at the bus stop |

### 3. When to use
- To give a clock time and a date.
- To say where a person or a thing is.
- To describe travel schedules.

### 4. Model sentences
- Our class starts at eight.
- We travel in December.
- The keys are on the shelf.

### 5. Common mistakes
- Wrong: I wake up in six o'clock. Right: I wake up at six o'clock. Why: clock times take at.
- Wrong: She was born at 2010. Right: She was born in 2010. Why: years take in.

### 6. Contrast box
**At** marks a small point, **on** marks a day or a surface, and **in** marks a longer period or a larger space.`,
      proTips: [
        "Nhớ thứ tự nhỏ đến lớn: at giờ, on ngày, in tháng và năm.",
        "Địa điểm nằm trong không gian kín thường dùng in.",
        "Bề mặt phẳng như bàn, tường, sàn dùng on.",
      ],
      proTipsEn: [
        "Remember the order from small to large: at for clock time, on for days, in for months and years.",
        "Enclosed spaces usually take in.",
        "Flat surfaces such as tables, walls and floors take on.",
      ],
      vocabulary: [
        { word: "shelf", ipa: "/ʃelf/", meaning: "cái kệ", meaningEn: "a flat board for storing things", example: "The dictionary is on the shelf.", exampleEn: "The dictionary is on the shelf.", partOfSpeech: "noun" },
        { word: "corner", ipa: "/ˈkɔːnə/", meaning: "góc", meaningEn: "the point where two lines or streets meet", example: "We meet at the corner of the street.", exampleEn: "We meet at the corner of the street.", partOfSpeech: "noun" },
        { word: "midnight", ipa: "/ˈmɪdnaɪt/", meaning: "nửa đêm", meaningEn: "twelve o'clock at night", example: "The shop closes at midnight.", exampleEn: "The shop closes at midnight.", partOfSpeech: "noun" },
        { word: "schedule", ipa: "/ˈʃedjuːl/", meaning: "thời gian biểu", meaningEn: "a plan of times and activities", example: "Our schedule changes in September.", exampleEn: "Our schedule changes in September.", partOfSpeech: "noun" },
      ],
      exercises: [
        {
          type: "fill-in-blank",
          instruction: "Điền in, on hoặc at.",
          instructionEn: "Write in, on or at.",
          sentences: [
            { text: "The meeting begins ___ nine o'clock.", textEn: "The meeting begins ___ nine o'clock.", answer: "at" },
            { text: "My birthday is ___ 14 March.", textEn: "My birthday is ___ 14 March.", answer: "on" },
            { text: "It snows a lot ___ winter.", textEn: "It snows a lot ___ winter.", answer: "in" },
          ],
        },
        {
          type: "error-correction",
          instruction: "Sửa lỗi giới từ.",
          instructionEn: "Correct the preposition mistake.",
          items: [
            { wrong: "We arrive on the airport at noon.", correct: "We arrive at the airport at noon.", explanation: "A point of arrival takes at." },
            { wrong: "My cousin lives at Turku.", correct: "My cousin lives in Turku.", explanation: "Cities take in." },
          ],
        },
        {
          type: "transformation",
          instruction: "Viết lại câu bằng giới từ được gợi ý.",
          instructionEn: "Rewrite the sentence using the preposition in the cue.",
          items: [
            { prompt: "The lesson finishes 4 p.m.", target: "The lesson finishes at 4 p.m.", cue: "at" },
            { prompt: "The photos are the wall.", target: "The photos are on the wall.", cue: "on" },
          ],
        },
        {
          type: "matching",
          instruction: "Nối cụm thời gian với giới từ đúng.",
          instructionEn: "Match each time phrase with the correct preposition.",
          pairs: [
            { left: "Sunday", right: "on Sunday" },
            { left: "August", right: "in August" },
            { left: "half past seven", right: "at half past seven" },
          ],
        },
      ],
      quiz: [
        { question: "The train leaves ___ ten past six.", options: ["in", "on", "at", "by"], answer: 2, explanation: "Clock times take at." },
        { question: "We moved to Sweden ___ 2021.", options: ["in", "on", "at", "for"], answer: 0, explanation: "Years take in." },
        { question: "There is a map ___ the wall.", options: ["in", "at", "on", "to"], answer: 2, explanation: "Flat surfaces take on." },
        { question: "I have a class ___ Friday morning.", options: ["at", "on", "in", "by"], answer: 1, explanation: "Days take on." },
        { question: "My grandparents live ___ a quiet village.", options: ["at", "on", "in", "to"], answer: 2, explanation: "Larger places take in." },
        { question: "Let's meet ___ the bus stop.", options: ["in", "at", "on", "by"], answer: 1, explanation: "A specific meeting point takes at." },
        { question: "Which phrase is correct?", options: ["at the evening", "in the evening", "on the evening", "by the evening"], answer: 1, explanation: "Parts of the day take in, except at night." },
        { question: "The exam is ___ 20 June.", options: ["in", "at", "on", "for"], answer: 2, explanation: "Dates take on." },
        { question: "She is waiting ___ home.", options: ["in", "at", "on", "to"], answer: 1, explanation: "At home is a fixed expression." },
        { question: "Which preposition is used for a month?", options: ["at", "on", "in", "by"], answer: 2, explanation: "Months take in." },
      ],
    },
  ],
  "grammar-modals": [
    {
      id: "modals-can-cant-ability-beginner",
      title: "Can và can't diễn tả khả năng",
      titleEn: "Can and can't for ability",
      level: 1,
      difficulty: "beginner",
      theory: `## Can và can't

### 1. Quy tắc
Dùng **can + động từ nguyên mẫu** để nói về khả năng; phủ định là **cannot / can't**.

### 2. Công thức
| Dạng | Mẫu câu |
| --- | --- |
| Khẳng định | I **can swim** very well. |
| Phủ định | He **can't drive** a car. |
| Câu hỏi | **Can** you **cook** Vietnamese food? |

### 3. Khi nào dùng
- Nói về kỹ năng của bản thân và người khác.
- Xin phép một cách thân mật.
- Đề nghị giúp đỡ.

### 4. Câu mẫu
- *She can speak three languages.* (Cô ấy nói được ba ngôn ngữ.)
- *We can't hear the teacher.* (Chúng tôi không nghe thấy giáo viên.)
- *Can I use your pen?* (Tôi dùng bút của bạn được không?)

### 5. Lỗi thường gặp
- Sai: *She cans play piano.* Đúng: *She can play the piano.*
- Sai: *He can to ride a bike.* Đúng: *He can ride a bike.*

### 6. So sánh nhanh
**can** nói về khả năng hiện tại, **could** nói về khả năng trong quá khứ.`,
      theoryEn: `## Can and can't

### 1. Rule
Use **can + base verb** to talk about ability; the negative is **cannot / can't**.

### 2. Form
| Type | Model |
| --- | --- |
| Positive | I **can swim** very well. |
| Negative | He **can't drive** a car. |
| Question | **Can** you **cook** Vietnamese food? |

### 3. When to use
- To describe your own skills and other people's skills.
- To ask permission in an informal way.
- To offer help.

### 4. Model sentences
- She can speak three languages.
- We can't hear the teacher.
- Can I use your pen?

### 5. Common mistakes
- Wrong: She cans play piano. Right: She can play the piano. Why: can never takes an -s.
- Wrong: He can to ride a bike. Right: He can ride a bike. Why: no to after can.

### 6. Contrast box
**Can** describes present ability, while **could** describes past ability.`,
      proTips: [
        "Can không bao giờ thêm s hay to.",
        "Đảo can lên trước chủ ngữ để tạo câu hỏi.",
        "Nói can't nhanh và nhấn mạnh để người nghe phân biệt với can.",
      ],
      proTipsEn: [
        "Can never takes an -s or a following to.",
        "Move can before the subject to form a question.",
        "Stress can't clearly so listeners can hear the difference from can.",
      ],
      vocabulary: [
        { word: "ability", ipa: "/əˈbɪləti/", meaning: "khả năng", meaningEn: "the power to do something", example: "Reading ability improves with practice.", exampleEn: "Reading ability improves with practice.", partOfSpeech: "noun" },
        { word: "swim", ipa: "/swɪm/", meaning: "bơi", meaningEn: "to move through water", example: "My little sister can swim now.", exampleEn: "My little sister can swim now.", partOfSpeech: "verb" },
        { word: "permission", ipa: "/pəˈmɪʃn/", meaning: "sự cho phép", meaningEn: "the right to do something", example: "Ask for permission before you leave.", exampleEn: "Ask for permission before you leave.", partOfSpeech: "noun" },
        { word: "repair", ipa: "/rɪˈpeə/", meaning: "sửa chữa", meaningEn: "to fix something broken", example: "My father can repair old radios.", exampleEn: "My father can repair old radios.", partOfSpeech: "verb" },
      ],
      exercises: [
        {
          type: "fill-in-blank",
          instruction: "Điền can hoặc can't.",
          instructionEn: "Write can or can't.",
          sentences: [
            { text: "My grandmother ___ use a smartphone very easily.", textEn: "My grandmother ___ use a smartphone very easily.", answer: "can" },
            { text: "I ___ find my glasses anywhere.", textEn: "I ___ find my glasses anywhere.", answer: "can't" },
            { text: "___ you help me with this exercise?", textEn: "___ you help me with this exercise?", answer: "Can" },
          ],
        },
        {
          type: "error-correction",
          instruction: "Sửa lỗi khi dùng can.",
          instructionEn: "Correct the mistake with can.",
          items: [
            { wrong: "She cans ride a motorbike.", correct: "She can ride a motorbike.", explanation: "Can never takes an -s." },
            { wrong: "They can to join the club.", correct: "They can join the club.", explanation: "No to comes after can." },
          ],
        },
        {
          type: "transformation",
          instruction: "Viết lại câu với can hoặc can't.",
          instructionEn: "Rewrite the sentence with can or can't.",
          items: [
            { prompt: "He is able to play chess.", target: "He can play chess.", cue: "can" },
            { prompt: "I am not able to read this handwriting.", target: "I can't read this handwriting.", cue: "can't" },
          ],
        },
        {
          type: "matching",
          instruction: "Nối câu hỏi với câu trả lời hợp lý.",
          instructionEn: "Match each question with a suitable answer.",
          pairs: [
            { left: "Can you swim?", right: "Yes, I can swim quite well." },
            { left: "Can he cook?", right: "No, he can't cook at all." },
            { left: "Can I borrow your book?", right: "Of course, take it." },
          ],
        },
      ],
      quiz: [
        { question: "My brother ___ play the violin.", options: ["can", "cans", "can to", "is can"], answer: 0, explanation: "Can never changes form." },
        { question: "We ___ see the board from here.", options: ["can not to", "cann't", "can't", "not can"], answer: 2, explanation: "The negative contraction is can't." },
        { question: "___ she speak Finnish?", options: ["Does can", "Can", "Is", "Do"], answer: 1, explanation: "Questions start with can." },
        { question: "Choose the correct sentence.", options: ["He can drives fast.", "He can drive fast.", "He can to drive fast.", "He cans drive fast."], answer: 1, explanation: "Can takes the base verb." },
        { question: "What does can mainly express here: I can lift this box?", options: ["ability", "past habit", "obligation", "prediction"], answer: 0, explanation: "Can shows present ability." },
        { question: "___ I open the window?", options: ["Can", "Am", "Do", "Does"], answer: 0, explanation: "Can is used to ask permission informally." },
        { question: "They ___ come to class tomorrow because of the trip.", options: ["can", "can't", "cans", "cannot to"], answer: 1, explanation: "The trip prevents them, so can't is correct." },
        { question: "Which is the past of can?", options: ["canned", "could", "can't", "will can"], answer: 1, explanation: "Could is the past form." },
        { question: "She ___ swim, but she can ride a bike.", options: ["can't", "can", "cans", "couldn't"], answer: 0, explanation: "The contrast needs a negative ability." },
        { question: "Which sentence offers help?", options: ["Can I help you?", "I can helped you.", "Can help I you?", "I helping can you."], answer: 0, explanation: "Can plus I plus base verb offers help." },
      ],
    },
  ],
};
