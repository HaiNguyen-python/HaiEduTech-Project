import type { LanguageLesson } from "../types";

/** Batch 5: beginner foundation lessons (comparisons, sentence patterns, punctuation, prepositional phrases, questions). */
export const newGrammarLessonsPart5: Record<string, LanguageLesson[]> = {
  "grammar-comparisons": [
    {
      id: "comparisons-short-adjectives-beginner",
      title: "So sánh hơn với tính từ ngắn",
      titleEn: "Comparatives with short adjectives",
      level: 1,
      difficulty: "beginner",
      theory: `## So sánh hơn cơ bản

### 1. Quy tắc
Tính từ ngắn thêm **-er + than**: *tall - taller than*.

### 2. Công thức
| Tính từ | So sánh hơn | Mẫu câu |
| --- | --- | --- |
| tall | taller | He is **taller than** me. |
| big | bigger | My room is **bigger than** yours. |
| easy | easier | This test is **easier than** the last one. |

### 3. Khi nào dùng
- So sánh hai người hoặc hai vật.
- Nói về sự thay đổi rõ rệt.
- Đưa ra lựa chọn giữa hai thứ.

### 4. Câu mẫu
- *Summer is hotter than spring.* (Mùa hè nóng hơn mùa xuân.)
- *This bag is cheaper than that one.* (Cái túi này rẻ hơn cái kia.)
- *My new phone is faster than my old phone.* (Điện thoại mới của tôi nhanh hơn cái cũ.)

### 5. Lỗi thường gặp
- Sai: *She is more tall than me.* Đúng: *She is taller than me.*
- Sai: *This box is heavyer.* Đúng: *This box is heavier.*

### 6. So sánh nhanh
Tính từ một âm tiết thêm **-er**, tính từ dài từ ba âm tiết dùng **more**.`,
      theoryEn: `## Basic comparatives

### 1. Rule
Short adjectives add **-er + than**: tall becomes taller than.

### 2. Form
| Adjective | Comparative | Model |
| --- | --- | --- |
| tall | taller | He is **taller than** me. |
| big | bigger | My room is **bigger than** yours. |
| easy | easier | This test is **easier than** the last one. |

### 3. When to use
- To compare two people or two things.
- To describe a clear change.
- To choose between two options.

### 4. Model sentences
- Summer is hotter than spring.
- This bag is cheaper than that one.
- My new phone is faster than my old phone.

### 5. Common mistakes
- Wrong: She is more tall than me. Right: She is taller than me. Why: short adjectives take -er, not more.
- Wrong: This box is heavyer. Right: This box is heavier. Why: -y changes to -ier.

### 6. Contrast box
One-syllable adjectives add **-er**, while adjectives of three or more syllables take **more**.`,
      proTips: [
        "Tính từ kết thúc bằng một nguyên âm và một phụ âm thì gấp đôi phụ âm: big - bigger.",
        "Tính từ kết thúc bằng -y thì đổi thành -ier: happy - happier.",
        "Không dùng more cùng lúc với -er.",
      ],
      proTipsEn: [
        "Double the final consonant after a single vowel: big becomes bigger.",
        "Change final -y to -ier: happy becomes happier.",
        "Never use more together with an -er ending.",
      ],
      vocabulary: [
        { word: "cheap", ipa: "/tʃiːp/", meaning: "rẻ", meaningEn: "low in price", example: "This market is cheaper than the supermarket.", exampleEn: "This market is cheaper than the supermarket.", partOfSpeech: "adjective" },
        { word: "heavy", ipa: "/ˈhevi/", meaning: "nặng", meaningEn: "having a lot of weight", example: "My backpack is heavier than hers.", exampleEn: "My backpack is heavier than hers.", partOfSpeech: "adjective" },
        { word: "quiet", ipa: "/ˈkwaɪət/", meaning: "yên tĩnh", meaningEn: "with little noise", example: "The library is quieter than the canteen.", exampleEn: "The library is quieter than the canteen.", partOfSpeech: "adjective" },
        { word: "narrow", ipa: "/ˈnærəʊ/", meaning: "hẹp", meaningEn: "not wide", example: "This street is narrower than the main road.", exampleEn: "This street is narrower than the main road.", partOfSpeech: "adjective" },
      ],
      exercises: [
        {
          type: "fill-in-blank",
          instruction: "Viết dạng so sánh hơn của tính từ trong ngoặc.",
          instructionEn: "Write the comparative form of the adjective in brackets.",
          sentences: [
            { text: "Today is ___ (cold) than yesterday.", textEn: "Today is ___ (cold) than yesterday.", answer: "colder" },
            { text: "My exercise book is ___ (thin) than yours.", textEn: "My exercise book is ___ (thin) than yours.", answer: "thinner" },
            { text: "This lesson is ___ (easy) than the first one.", textEn: "This lesson is ___ (easy) than the first one.", answer: "easier" },
          ],
        },
        {
          type: "error-correction",
          instruction: "Sửa lỗi so sánh hơn.",
          instructionEn: "Correct the comparative mistake.",
          items: [
            { wrong: "My village is more small than this town.", correct: "My village is smaller than this town.", explanation: "Short adjectives take -er." },
            { wrong: "The blue shirt is more cheaper.", correct: "The blue shirt is cheaper.", explanation: "Never combine more with an -er ending." },
          ],
        },
        {
          type: "transformation",
          instruction: "Viết lại câu bằng dạng so sánh hơn.",
          instructionEn: "Rewrite each sentence with a comparative.",
          items: [
            { prompt: "My bag is not as light as your bag.", target: "My bag is heavier than your bag.", cue: "heavy" },
            { prompt: "This road is not as wide as that one.", target: "That road is wider than this one.", cue: "wide" },
          ],
        },
        {
          type: "matching",
          instruction: "Nối tính từ với dạng so sánh hơn.",
          instructionEn: "Match each adjective with its comparative form.",
          pairs: [
            { left: "hot", right: "hotter" },
            { left: "happy", right: "happier" },
            { left: "young", right: "younger" },
          ],
        },
      ],
      quiz: [
        { question: "My sister is ___ than my brother.", options: ["tall", "taller", "tallest", "more tall"], answer: 1, explanation: "Short adjectives add -er." },
        { question: "This chair is ___ than that one.", options: ["comfortabler", "more comfortable", "comfortable", "most comfortable"], answer: 1, explanation: "Long adjectives take more." },
        { question: "The weather in Hue is ___ than in Hanoi today.", options: ["wetter", "weter", "more wet", "wet"], answer: 0, explanation: "Double the consonant: wet becomes wetter." },
        { question: "Which comparative is correct?", options: ["busyer", "busier", "more busy", "busiest"], answer: 1, explanation: "Final -y becomes -ier." },
        { question: "My old bicycle was ___ than this one.", options: ["slow", "slower", "slowest", "more slower"], answer: 1, explanation: "Slower plus than compares two things." },
        { question: "Choose the correct sentence.", options: ["He is more strong than me.", "He is stronger than me.", "He is strongest than me.", "He is more stronger than me."], answer: 1, explanation: "Strong is short, so it takes -er." },
        { question: "This exercise is ___ than I expected.", options: ["hard", "harder", "hardest", "more hard"], answer: 1, explanation: "Comparatives need the -er form before than." },
        { question: "What word usually follows a comparative?", options: ["that", "than", "then", "as"], answer: 1, explanation: "Comparatives are followed by than." },
        { question: "My room is ___ than my sister's room.", options: ["bigger", "biger", "more big", "biggest"], answer: 0, explanation: "Big doubles the g: bigger." },
        { question: "Which pair is correct?", options: ["nice - nicer", "nice - more nice", "nice - nicest than", "nice - nicier"], answer: 0, explanation: "Nice adds -r to become nicer." },
      ],
    },
  ],
  "grammar-sentence-patterns": [
    {
      id: "sentence-patterns-svo-basics",
      title: "Câu đơn: chủ ngữ, động từ, tân ngữ",
      titleEn: "Simple sentences: subject, verb, object",
      level: 1,
      difficulty: "beginner",
      theory: `## Mẫu câu S + V + O

### 1. Quy tắc
Câu tiếng Anh cơ bản theo thứ tự **chủ ngữ + động từ + tân ngữ**.

### 2. Công thức
| Chủ ngữ | Động từ | Tân ngữ |
| --- | --- | --- |
| My mother | cooks | dinner |
| The students | read | English books |
| I | need | a new notebook |

### 3. Khi nào dùng
- Viết câu kể đơn giản.
- Trả lời câu hỏi ngắn.
- Miêu tả hành động hằng ngày.

### 4. Câu mẫu
- *My father drives a taxi.* (Bố tôi lái taxi.)
- *We learn new words every day.* (Chúng tôi học từ mới mỗi ngày.)
- *The teacher explains the lesson clearly.* (Giáo viên giảng bài rõ ràng.)

### 5. Lỗi thường gặp
- Sai: *Dinner cooks my mother.* Đúng: *My mother cooks dinner.*
- Sai: *I very like English.* Đúng: *I like English very much.*

### 6. So sánh nhanh
Trạng từ chỉ mức độ đứng sau tân ngữ, không đứng giữa chủ ngữ và động từ chính.`,
      theoryEn: `## The S + V + O pattern

### 1. Rule
A basic English sentence follows the order **subject + verb + object**.

### 2. Form
| Subject | Verb | Object |
| --- | --- | --- |
| My mother | cooks | dinner |
| The students | read | English books |
| I | need | a new notebook |

### 3. When to use
- To write simple statements.
- To answer short questions.
- To describe daily actions.

### 4. Model sentences
- My father drives a taxi.
- We learn new words every day.
- The teacher explains the lesson clearly.

### 5. Common mistakes
- Wrong: Dinner cooks my mother. Right: My mother cooks dinner. Why: the doer comes first.
- Wrong: I very like English. Right: I like English very much. Why: degree adverbs do not sit before the main verb.

### 6. Contrast box
Degree expressions come after the object, never between the subject and the main verb.`,
      proTips: [
        "Tìm người thực hiện hành động trước khi viết câu.",
        "Mỗi câu đơn chỉ cần một động từ chính.",
        "Đặt trạng ngữ thời gian ở cuối câu hoặc đầu câu.",
      ],
      proTipsEn: [
        "Identify who does the action before writing the sentence.",
        "One simple sentence needs only one main verb.",
        "Place time expressions at the end or the beginning of the sentence.",
      ],
      vocabulary: [
        { word: "subject", ipa: "/ˈsʌbdʒɪkt/", meaning: "chủ ngữ", meaningEn: "the doer of the action", example: "The subject of this sentence is my mother.", exampleEn: "The subject of this sentence is my mother.", partOfSpeech: "noun" },
        { word: "object", ipa: "/ˈɒbdʒɪkt/", meaning: "tân ngữ", meaningEn: "the receiver of the action", example: "Dinner is the object of the verb cooks.", exampleEn: "Dinner is the object of the verb cooks.", partOfSpeech: "noun" },
        { word: "explain", ipa: "/ɪkˈspleɪn/", meaning: "giải thích", meaningEn: "to make something clear", example: "The teacher explains grammar patiently.", exampleEn: "The teacher explains grammar patiently.", partOfSpeech: "verb" },
        { word: "notebook", ipa: "/ˈnəʊtbʊk/", meaning: "quyển vở", meaningEn: "a book for writing notes", example: "I need a new notebook for grammar.", exampleEn: "I need a new notebook for grammar.", partOfSpeech: "noun" },
      ],
      exercises: [
        {
          type: "fill-in-blank",
          instruction: "Điền tân ngữ hợp lý.",
          instructionEn: "Complete each sentence with a suitable object.",
          sentences: [
            { text: "My mother cooks ___ for the family every evening.", textEn: "My mother cooks ___ for the family every evening.", answer: "dinner" },
            { text: "The students read English ___ in class.", textEn: "The students read English ___ in class.", answer: "books" },
            { text: "I need a new ___ for my grammar notes.", textEn: "I need a new ___ for my grammar notes.", answer: "notebook" },
          ],
        },
        {
          type: "error-correction",
          instruction: "Sửa lại thứ tự từ.",
          instructionEn: "Correct the word order.",
          items: [
            { wrong: "Homework does my brother every night.", correct: "My brother does homework every night.", explanation: "The doer comes before the verb." },
            { wrong: "I very like grammar lessons.", correct: "I like grammar lessons very much.", explanation: "Very much follows the object." },
          ],
        },
        {
          type: "sentence-reorder",
          instruction: "Sắp xếp các từ thành câu đúng.",
          instructionEn: "Put the words in the correct order.",
          items: [
            { scrambled: ["drives", "My", "a", "father", "taxi"], correct: "My father drives a taxi." },
            { scrambled: ["new", "learn", "We", "words", "every", "day"], correct: "We learn new words every day." },
          ],
        },
        {
          type: "matching",
          instruction: "Nối chủ ngữ với phần còn lại của câu.",
          instructionEn: "Match each subject with the rest of the sentence.",
          pairs: [
            { left: "My sister", right: "plays badminton after school" },
            { left: "The children", right: "draw pictures in the garden" },
            { left: "Our teacher", right: "checks our exercises carefully" },
          ],
        },
      ],
      quiz: [
        { question: "Which sentence follows subject + verb + object?", options: ["Dinner cooks my mother.", "My mother cooks dinner.", "Cooks my mother dinner.", "My mother dinner cooks."], answer: 1, explanation: "The doer comes first, then the verb, then the object." },
        { question: "What is the subject in: The boys play football?", options: ["football", "play", "The boys", "the"], answer: 2, explanation: "The boys perform the action." },
        { question: "What is the object in: She writes letters?", options: ["She", "writes", "letters", "no object"], answer: 2, explanation: "Letters receives the action." },
        { question: "Choose the correct sentence.", options: ["I like very much this book.", "I like this book very much.", "I very much like this.", "Very much I like this book."], answer: 1, explanation: "Very much comes after the object in natural English." },
        { question: "How many main verbs does a simple sentence need?", options: ["one", "two", "three", "none"], answer: 0, explanation: "One simple sentence has one main verb." },
        { question: "Which sentence has no object?", options: ["She reads books.", "She sleeps early.", "She eats rice.", "She writes emails."], answer: 1, explanation: "Sleeps does not take an object." },
        { question: "Complete: The teacher ___ the lesson.", options: ["explain", "explains", "explaining", "to explain"], answer: 1, explanation: "A singular subject takes explains." },
        { question: "Where can a time expression go?", options: ["between subject and verb", "at the end of the sentence", "inside the object", "before the article only"], answer: 1, explanation: "Time expressions usually go at the end or the start." },
        { question: "Which order is correct?", options: ["My friend buys fruit at the market.", "Buys my friend fruit at the market.", "Fruit buys my friend at the market.", "At the market fruit my friend buys."], answer: 0, explanation: "Subject, verb, object, then place." },
        { question: "What does S + V + O stand for?", options: ["subject, verb, object", "sentence, verb, order", "subject, view, object", "simple, verb, order"], answer: 0, explanation: "It means subject, verb, object." },
      ],
    },
    {
      id: "sentence-patterns-there-is-are-basics",
      title: "There is và There are để nói về sự tồn tại",
      titleEn: "There is and There are for existence",
      level: 2,
      difficulty: "beginner",
      theory: `## There is / There are

### 1. Quy tắc
Dùng **There is** với danh từ số ít và danh từ không đếm được; **There are** với danh từ số nhiều.

### 2. Công thức
| Dạng | Mẫu câu |
| --- | --- |
| Số ít | **There is** a bank near my house. |
| Số nhiều | **There are** two markets in this street. |
| Phủ định | **There isn't** any milk in the fridge. |

### 3. Khi nào dùng
- Miêu tả những gì có trong một nơi.
- Giới thiệu thông tin mới.
- Nói về số lượng đồ vật.

### 4. Câu mẫu
- *There is a park behind the school.* (Có một công viên phía sau trường.)
- *There are many students in the hall.* (Có nhiều học sinh trong hội trường.)
- *There aren't any chairs here.* (Ở đây không có cái ghế nào.)

### 5. Lỗi thường gặp
- Sai: *There is many books on the shelf.* Đúng: *There are many books on the shelf.*
- Sai: *Have a cat in the garden.* Đúng: *There is a cat in the garden.*

### 6. So sánh nhanh
**There is** đi với một vật, **There are** đi với nhiều vật.`,
      theoryEn: `## There is / There are

### 1. Rule
Use **There is** with singular and uncountable nouns, and **There are** with plural nouns.

### 2. Form
| Type | Model |
| --- | --- |
| Singular | **There is** a bank near my house. |
| Plural | **There are** two markets in this street. |
| Negative | **There isn't** any milk in the fridge. |

### 3. When to use
- To describe what a place contains.
- To introduce new information.
- To talk about quantities of things.

### 4. Model sentences
- There is a park behind the school.
- There are many students in the hall.
- There aren't any chairs here.

### 5. Common mistakes
- Wrong: There is many books on the shelf. Right: There are many books on the shelf. Why: a plural noun needs are.
- Wrong: Have a cat in the garden. Right: There is a cat in the garden. Why: existence uses there is, not have.

### 6. Contrast box
**There is** points to one thing, while **There are** points to several things.`,
      proTips: [
        "Nhìn danh từ ngay sau there để chọn is hoặc are.",
        "Danh từ không đếm được luôn dùng there is: there is some water.",
        "Trong câu phủ định thường dùng any: there aren't any tickets.",
      ],
      proTipsEn: [
        "Look at the noun right after there to choose is or are.",
        "Uncountable nouns always take there is: there is some water.",
        "Negatives usually take any: there aren't any tickets.",
      ],
      vocabulary: [
        { word: "fridge", ipa: "/frɪdʒ/", meaning: "tủ lạnh", meaningEn: "a cold cupboard for food", example: "There is some milk in the fridge.", exampleEn: "There is some milk in the fridge.", partOfSpeech: "noun" },
        { word: "market", ipa: "/ˈmɑːkɪt/", meaning: "chợ", meaningEn: "a place where people buy and sell", example: "There are two markets near my street.", exampleEn: "There are two markets near my street.", partOfSpeech: "noun" },
        { word: "hall", ipa: "/hɔːl/", meaning: "hội trường", meaningEn: "a large room for meetings", example: "There are many chairs in the hall.", exampleEn: "There are many chairs in the hall.", partOfSpeech: "noun" },
        { word: "playground", ipa: "/ˈpleɪɡraʊnd/", meaning: "sân chơi", meaningEn: "an outdoor area for children", example: "There is a playground behind our school.", exampleEn: "There is a playground behind our school.", partOfSpeech: "noun" },
      ],
      exercises: [
        {
          type: "fill-in-blank",
          instruction: "Điền is hoặc are.",
          instructionEn: "Write is or are.",
          sentences: [
            { text: "There ___ three buses to the city centre.", textEn: "There ___ three buses to the city centre.", answer: "are" },
            { text: "There ___ a small shop next to my house.", textEn: "There ___ a small shop next to my house.", answer: "is" },
            { text: "There ___ some sugar in this cup.", textEn: "There ___ some sugar in this cup.", answer: "is" },
          ],
        },
        {
          type: "error-correction",
          instruction: "Sửa lỗi trong câu There is / There are.",
          instructionEn: "Correct the mistake in each there sentence.",
          items: [
            { wrong: "There is four windows in the classroom.", correct: "There are four windows in the classroom.", explanation: "A plural noun takes are." },
            { wrong: "There are a library near the station.", correct: "There is a library near the station.", explanation: "A singular noun takes is." },
          ],
        },
        {
          type: "transformation",
          instruction: "Viết lại câu bằng There is hoặc There are.",
          instructionEn: "Rewrite each sentence with There is or There are.",
          items: [
            { prompt: "Our town has two swimming pools.", target: "There are two swimming pools in our town.", cue: "There are" },
            { prompt: "My bag has one dictionary inside.", target: "There is one dictionary in my bag.", cue: "There is" },
          ],
        },
        {
          type: "matching",
          instruction: "Nối phần đầu với phần cuối của câu.",
          instructionEn: "Match the beginning with the correct ending.",
          pairs: [
            { left: "There is", right: "a post office on this corner" },
            { left: "There are", right: "five students in the reading room" },
            { left: "There isn't", right: "any bread left in the kitchen" },
          ],
        },
      ],
      quiz: [
        { question: "There ___ a bank opposite the hospital.", options: ["is", "are", "have", "has"], answer: 0, explanation: "A singular noun takes is." },
        { question: "There ___ many trees in this park.", options: ["is", "are", "has", "have"], answer: 1, explanation: "A plural noun takes are." },
        { question: "There ___ any milk in the fridge.", options: ["isn't", "aren't", "don't", "doesn't"], answer: 0, explanation: "Milk is uncountable, so it takes isn't." },
        { question: "Choose the correct sentence.", options: ["There are a cat on the roof.", "There is a cat on the roof.", "Have a cat on the roof.", "It has a cat on the roof."], answer: 1, explanation: "Existence uses there is with a singular noun." },
        { question: "___ there any tickets for the concert?", options: ["Is", "Are", "Do", "Does"], answer: 1, explanation: "Tickets is plural, so the question starts with are." },
        { question: "There ___ two problems with this exercise.", options: ["is", "are", "was", "has"], answer: 1, explanation: "Two problems is plural." },
        { question: "Which noun type takes there is?", options: ["plural countable", "uncountable", "always plural", "only questions"], answer: 1, explanation: "Uncountable nouns take there is." },
        { question: "There ___ a lot of noise in the street tonight.", options: ["are", "is", "have", "were"], answer: 1, explanation: "Noise is uncountable." },
        { question: "Complete the negative: There ___ any chairs here.", options: ["isn't", "aren't", "not are", "doesn't"], answer: 1, explanation: "Chairs is plural, so aren't is correct." },
        { question: "What does There are describe?", options: ["one thing", "several things", "past actions", "future plans"], answer: 1, explanation: "There are introduces more than one thing." },
      ],
    },
  ],
  "grammar-punctuation-boundaries": [
    {
      id: "punctuation-full-stop-comma-basics",
      title: "Dấu chấm và dấu phẩy cơ bản",
      titleEn: "Full stops and commas: the basics",
      level: 1,
      difficulty: "beginner",
      theory: `## Dấu chấm và dấu phẩy

### 1. Quy tắc
Kết thúc câu kể bằng **dấu chấm**; dùng **dấu phẩy** để tách các thành phần trong câu.

### 2. Công thức
| Dấu | Chức năng | Mẫu câu |
| --- | --- | --- |
| . | kết thúc câu | I study English every day. |
| , | liệt kê | I bought rice, eggs and milk. |
| , | sau trạng ngữ đầu câu | In the morning, we practise speaking. |

### 3. Khi nào dùng
- Kết thúc mỗi câu hoàn chỉnh.
- Liệt kê ba thứ trở lên.
- Ngăn cách trạng ngữ mở đầu với phần còn lại.

### 4. Câu mẫu
- *We finished the test. Then we went home.* (Chúng tôi làm xong bài kiểm tra. Sau đó chúng tôi về nhà.)
- *She speaks English, Chinese and Finnish.* (Cô ấy nói tiếng Anh, tiếng Trung và tiếng Phần Lan.)
- *After class, I always review my notes.* (Sau giờ học, tôi luôn xem lại ghi chú.)

### 5. Lỗi thường gặp
- Sai: *I like reading, my sister likes drawing.* Đúng: *I like reading. My sister likes drawing.*
- Sai: *After dinner we watch TV.* Đúng: *After dinner, we watch TV.*

### 6. So sánh nhanh
Dấu chấm tách **hai câu hoàn chỉnh**, dấu phẩy chỉ tách **các phần trong một câu**.`,
      theoryEn: `## Full stops and commas

### 1. Rule
End a statement with a **full stop**, and use a **comma** to separate parts inside a sentence.

### 2. Form
| Mark | Function | Model |
| --- | --- | --- |
| . | ends a sentence | I study English every day. |
| , | lists items | I bought rice, eggs and milk. |
| , | after an opening phrase | In the morning, we practise speaking. |

### 3. When to use
- To close every complete sentence.
- To list three or more items.
- To separate an opening phrase from the main clause.

### 4. Model sentences
- We finished the test. Then we went home.
- She speaks English, Chinese and Finnish.
- After class, I always review my notes.

### 5. Common mistakes
- Wrong: I like reading, my sister likes drawing. Right: I like reading. My sister likes drawing. Why: two complete sentences need a full stop.
- Wrong: After dinner we watch TV. Right: After dinner, we watch TV. Why: an opening phrase takes a comma.

### 6. Contrast box
A full stop separates **two complete sentences**, while a comma separates **parts of one sentence**.`,
      proTips: [
        "Đọc to câu của mình, chỗ nghỉ dài thường là dấu chấm.",
        "Không nối hai câu hoàn chỉnh bằng dấu phẩy.",
        "Viết hoa chữ đầu tiên sau dấu chấm.",
      ],
      proTipsEn: [
        "Read your sentence aloud; a long pause usually means a full stop.",
        "Never join two complete sentences with only a comma.",
        "Capitalise the first letter after a full stop.",
      ],
      vocabulary: [
        { word: "sentence", ipa: "/ˈsentəns/", meaning: "câu", meaningEn: "a complete group of words with a verb", example: "Every sentence needs a full stop.", exampleEn: "Every sentence needs a full stop.", partOfSpeech: "noun" },
        { word: "comma", ipa: "/ˈkɒmə/", meaning: "dấu phẩy", meaningEn: "the mark used to separate parts", example: "Put a comma between listed items.", exampleEn: "Put a comma between listed items.", partOfSpeech: "noun" },
        { word: "capital", ipa: "/ˈkæpɪtl/", meaning: "chữ in hoa", meaningEn: "a large letter form", example: "Start a sentence with a capital letter.", exampleEn: "Start a sentence with a capital letter.", partOfSpeech: "adjective" },
        { word: "pause", ipa: "/pɔːz/", meaning: "chỗ ngắt", meaningEn: "a short stop", example: "A comma marks a short pause.", exampleEn: "A comma marks a short pause.", partOfSpeech: "noun" },
      ],
      exercises: [
        {
          type: "fill-in-blank",
          instruction: "Điền dấu câu còn thiếu (viết . hoặc ,).",
          instructionEn: "Write the missing punctuation mark (. or ,).",
          sentences: [
            { text: "We study grammar in the morning___", textEn: "We study grammar in the morning___", answer: "." },
            { text: "After class___ we practise speaking together.", textEn: "After class___ we practise speaking together.", answer: "," },
            { text: "I need pens___ paper and a ruler.", textEn: "I need pens___ paper and a ruler.", answer: "," },
          ],
        },
        {
          type: "error-correction",
          instruction: "Sửa lỗi dấu câu.",
          instructionEn: "Correct the punctuation mistake.",
          items: [
            { wrong: "I finished my homework, then I went to bed.", correct: "I finished my homework. Then I went to bed.", explanation: "Two complete sentences need a full stop." },
            { wrong: "In the evening we review vocabulary.", correct: "In the evening, we review vocabulary.", explanation: "An opening phrase is followed by a comma." },
          ],
        },
        {
          type: "transformation",
          instruction: "Viết lại câu, tách thành hai câu hoàn chỉnh hoặc thêm dấu phẩy đúng chỗ.",
          instructionEn: "Rewrite each sentence, splitting it correctly or adding the missing comma.",
          items: [
            { prompt: "She reads every night and she also writes a diary in the evening.", target: "She reads every night. She also writes a diary.", cue: "two sentences" },
            { prompt: "We have maths and history on Monday.", target: "On Monday, we have maths and history.", cue: "opening phrase" },
          ],
        },
        {
          type: "matching",
          instruction: "Nối dấu câu với chức năng.",
          instructionEn: "Match each punctuation mark with its function.",
          pairs: [
            { left: "full stop", right: "ends a complete statement" },
            { left: "comma in a list", right: "separates three or more items" },
            { left: "comma after an opening phrase", right: "marks a short pause before the main clause" },
          ],
        },
      ],
      quiz: [
        { question: "Which sentence is punctuated correctly?", options: ["I like coffee, my brother likes tea.", "I like coffee. My brother likes tea.", "I like coffee my brother likes tea.", "I like coffee; my brother, likes tea."], answer: 1, explanation: "Two complete sentences need a full stop." },
        { question: "Choose the correct list.", options: ["We bought bread milk and eggs.", "We bought bread, milk and eggs.", "We bought, bread milk, eggs.", "We bought bread. milk. eggs."], answer: 1, explanation: "Commas separate listed items." },
        { question: "Where does a comma go in: After lunch we play football?", options: ["after After", "after lunch", "after we", "no comma needed"], answer: 1, explanation: "The opening phrase After lunch takes a comma." },
        { question: "What follows a full stop?", options: ["a small letter", "a capital letter", "a comma", "a question mark"], answer: 1, explanation: "A new sentence starts with a capital letter." },
        { question: "Which mark ends a statement?", options: ["comma", "full stop", "colon", "dash"], answer: 1, explanation: "Statements end with a full stop." },
        { question: "Which sentence needs a full stop instead of a comma?", options: ["I study hard, and I rest well.", "I study hard, I rest well.", "I study hard and rest well.", "I study hard every evening."], answer: 1, explanation: "Two complete clauses cannot be joined by a comma alone." },
        { question: "Choose the correct sentence.", options: ["In summer, we swim every weekend.", "In summer we, swim every weekend.", "In, summer we swim every weekend.", "In summer we swim, every weekend."], answer: 0, explanation: "The comma follows the opening time phrase." },
        { question: "What does a comma show?", options: ["a long stop", "a short pause", "a question", "a new paragraph"], answer: 1, explanation: "A comma marks a short pause." },
        { question: "Which list is correct?", options: ["She speaks English, Finnish and Swedish.", "She speaks English Finnish and Swedish.", "She speaks, English Finnish, Swedish.", "She speaks English. Finnish. Swedish."], answer: 0, explanation: "Commas separate the languages listed." },
        { question: "How many full stops does one complete statement need?", options: ["none", "one", "two", "three"], answer: 1, explanation: "One statement ends with one full stop." },
      ],
    },
  ],
  "grammar-prepositions-patterns": [
    {
      id: "prepositions-verb-phrases-beginner",
      title: "Cụm động từ với giới từ thường dùng",
      titleEn: "Common verb and preposition phrases",
      level: 2,
      difficulty: "beginner",
      theory: `## Động từ đi với giới từ

### 1. Quy tắc
Nhiều động từ luôn đi kèm một giới từ cố định: **listen to**, **wait for**, **look at**.

### 2. Công thức
| Động từ | Giới từ | Mẫu câu |
| --- | --- | --- |
| listen | to | I **listen to** music every evening. |
| wait | for | We **wait for** the bus here. |
| look | at | Please **look at** the board. |
| talk | about | They **talk about** their homework. |

### 3. Khi nào dùng
- Nói về hoạt động học tập hằng ngày.
- Mô tả việc chờ đợi và quan sát.
- Nói về chủ đề trò chuyện.

### 4. Câu mẫu
- *She listens to English podcasts.* (Cô ấy nghe podcast tiếng Anh.)
- *I am waiting for my friend.* (Tôi đang chờ bạn tôi.)
- *We talk about our weekend plans.* (Chúng tôi nói về kế hoạch cuối tuần.)

### 5. Lỗi thường gặp
- Sai: *I listen music.* Đúng: *I listen to music.*
- Sai: *He is waiting his sister.* Đúng: *He is waiting for his sister.*

### 6. So sánh nhanh
**look at** là quan sát, **look for** là tìm kiếm.`,
      theoryEn: `## Verbs with fixed prepositions

### 1. Rule
Many verbs always take a fixed preposition: **listen to**, **wait for**, **look at**.

### 2. Form
| Verb | Preposition | Model |
| --- | --- | --- |
| listen | to | I **listen to** music every evening. |
| wait | for | We **wait for** the bus here. |
| look | at | Please **look at** the board. |
| talk | about | They **talk about** their homework. |

### 3. When to use
- To describe daily study activities.
- To describe waiting and watching.
- To name the topic of a conversation.

### 4. Model sentences
- She listens to English podcasts.
- I am waiting for my friend.
- We talk about our weekend plans.

### 5. Common mistakes
- Wrong: I listen music. Right: I listen to music. Why: listen always takes to.
- Wrong: He is waiting his sister. Right: He is waiting for his sister. Why: wait always takes for.

### 6. Contrast box
**Look at** means to watch, while **look for** means to search.`,
      proTips: [
        "Học động từ cùng giới từ như một cụm duy nhất.",
        "Ghi nhớ theo cặp đối lập: look at - look for.",
        "Sau giới từ luôn là danh từ hoặc động từ thêm -ing.",
      ],
      proTipsEn: [
        "Learn the verb and its preposition as one chunk.",
        "Memorise contrasting pairs such as look at and look for.",
        "A noun or an -ing form always follows the preposition.",
      ],
      vocabulary: [
        { word: "podcast", ipa: "/ˈpɒdkɑːst/", meaning: "chương trình âm thanh trên mạng", meaningEn: "an audio programme you download", example: "I listen to a podcast on the bus.", exampleEn: "I listen to a podcast on the bus.", partOfSpeech: "noun" },
        { word: "depend", ipa: "/dɪˈpend/", meaning: "phụ thuộc", meaningEn: "to rely on something", example: "My plan depends on the weather.", exampleEn: "My plan depends on the weather.", partOfSpeech: "verb" },
        { word: "belong", ipa: "/bɪˈlɒŋ/", meaning: "thuộc về", meaningEn: "to be owned by", example: "This notebook belongs to my classmate.", exampleEn: "This notebook belongs to my classmate.", partOfSpeech: "verb" },
        { word: "apologise", ipa: "/əˈpɒlədʒaɪz/", meaning: "xin lỗi", meaningEn: "to say sorry", example: "He apologised for arriving late.", exampleEn: "He apologised for arriving late.", partOfSpeech: "verb" },
      ],
      exercises: [
        {
          type: "fill-in-blank",
          instruction: "Điền giới từ đúng.",
          instructionEn: "Write the correct preposition.",
          sentences: [
            { text: "Please listen ___ the instructions carefully.", textEn: "Please listen ___ the instructions carefully.", answer: "to" },
            { text: "We are waiting ___ the results of the test.", textEn: "We are waiting ___ the results of the test.", answer: "for" },
            { text: "This dictionary belongs ___ my teacher.", textEn: "This dictionary belongs ___ my teacher.", answer: "to" },
          ],
        },
        {
          type: "error-correction",
          instruction: "Sửa lỗi giới từ trong cụm động từ.",
          instructionEn: "Correct the preposition in each verb phrase.",
          items: [
            { wrong: "She apologised of her mistake.", correct: "She apologised for her mistake.", explanation: "Apologise takes for." },
            { wrong: "Our trip depends of the weather.", correct: "Our trip depends on the weather.", explanation: "Depend takes on." },
          ],
        },
        {
          type: "transformation",
          instruction: "Viết lại câu bằng cụm động từ được gợi ý.",
          instructionEn: "Rewrite each sentence using the verb phrase in the cue.",
          items: [
            { prompt: "I am searching for my keys everywhere.", target: "I am looking for my keys everywhere.", cue: "look for" },
            { prompt: "The class discussed climate change.", target: "The class talked about climate change.", cue: "talk about" },
          ],
        },
        {
          type: "matching",
          instruction: "Nối động từ với giới từ đúng.",
          instructionEn: "Match each verb with its preposition.",
          pairs: [
            { left: "listen", right: "to" },
            { left: "wait", right: "for" },
            { left: "depend", right: "on" },
          ],
        },
      ],
      quiz: [
        { question: "I always listen ___ the teacher's advice.", options: ["at", "to", "for", "on"], answer: 1, explanation: "Listen takes to." },
        { question: "We waited ___ the bus for twenty minutes.", options: ["to", "at", "for", "about"], answer: 2, explanation: "Wait takes for." },
        { question: "Please look ___ this photograph.", options: ["at", "for", "to", "in"], answer: 0, explanation: "Look at means watch." },
        { question: "She is looking ___ her lost umbrella.", options: ["at", "for", "to", "on"], answer: 1, explanation: "Look for means search." },
        { question: "Our plan depends ___ your answer.", options: ["of", "on", "in", "for"], answer: 1, explanation: "Depend takes on." },
        { question: "This bag belongs ___ my sister.", options: ["for", "with", "to", "at"], answer: 2, explanation: "Belong takes to." },
        { question: "He apologised ___ being late.", options: ["of", "for", "to", "about"], answer: 1, explanation: "Apologise for plus an -ing form." },
        { question: "We talked ___ the new project yesterday.", options: ["about", "at", "of", "in"], answer: 0, explanation: "Talk about names the topic." },
        { question: "Which phrase means search?", options: ["look at", "look for", "look to", "look in"], answer: 1, explanation: "Look for means to search." },
        { question: "What follows a preposition?", options: ["a base verb", "a noun or -ing form", "a full clause only", "nothing"], answer: 1, explanation: "A noun or an -ing form follows a preposition." },
      ],
    },
  ],
  "grammar-questions-tags": [
    {
      id: "questions-short-answers-beginner",
      title: "Câu hỏi Yes/No và câu trả lời ngắn",
      titleEn: "Yes/No questions and short answers",
      level: 1,
      difficulty: "beginner",
      theory: `## Câu hỏi Yes/No và trả lời ngắn

### 1. Quy tắc
Trả lời ngắn dùng lại **trợ động từ** trong câu hỏi: *Do you...? - Yes, I do.*

### 2. Công thức
| Câu hỏi | Trả lời ngắn |
| --- | --- |
| Do you study English? | Yes, I **do**. / No, I **don't**. |
| Is she a nurse? | Yes, she **is**. / No, she **isn't**. |
| Can they swim? | Yes, they **can**. / No, they **can't**. |

### 3. Khi nào dùng
- Trả lời nhanh trong hội thoại.
- Xác nhận thông tin.
- Trả lời câu hỏi của giáo viên trong lớp.

### 4. Câu mẫu
- *Do you like coffee? - Yes, I do.* (Bạn thích cà phê không? - Có.)
- *Is your brother at home? - No, he isn't.* (Anh bạn có ở nhà không? - Không.)
- *Can she drive? - Yes, she can.* (Cô ấy lái xe được không? - Được.)

### 5. Lỗi thường gặp
- Sai: *Do you like tea? - Yes, I like.* Đúng: *Yes, I do.*
- Sai: *Is he a student? - Yes, he does.* Đúng: *Yes, he is.*

### 6. So sánh nhanh
Câu hỏi bắt đầu bằng **do/does** trả lời bằng **do/does**; câu hỏi bắt đầu bằng **be** trả lời bằng **be**.`,
      theoryEn: `## Yes/No questions and short answers

### 1. Rule
A short answer repeats the **auxiliary verb** of the question: Do you...? Yes, I do.

### 2. Form
| Question | Short answer |
| --- | --- |
| Do you study English? | Yes, I **do**. / No, I **don't**. |
| Is she a nurse? | Yes, she **is**. / No, she **isn't**. |
| Can they swim? | Yes, they **can**. / No, they **can't**. |

### 3. When to use
- To answer quickly in conversation.
- To confirm information.
- To reply to classroom questions.

### 4. Model sentences
- Do you like coffee? Yes, I do.
- Is your brother at home? No, he isn't.
- Can she drive? Yes, she can.

### 5. Common mistakes
- Wrong: Do you like tea? Yes, I like. Right: Yes, I do. Why: the short answer repeats the auxiliary.
- Wrong: Is he a student? Yes, he does. Right: Yes, he is. Why: a be question takes a be answer.

### 6. Contrast box
Questions with **do/does** are answered with **do/does**, while questions with **be** are answered with **be**.`,
      proTips: [
        "Nghe từ đầu tiên của câu hỏi để chọn trợ động từ khi trả lời.",
        "Câu trả lời khẳng định không dùng dạng rút gọn: Yes, I am.",
        "Câu trả lời phủ định thường dùng rút gọn: No, I'm not.",
      ],
      proTipsEn: [
        "Listen to the first word of the question to choose the auxiliary in your answer.",
        "Positive short answers are not contracted: Yes, I am.",
        "Negative short answers are usually contracted: No, I'm not.",
      ],
      vocabulary: [
        { word: "answer", ipa: "/ˈɑːnsə/", meaning: "câu trả lời", meaningEn: "a reply to a question", example: "Give a short answer, please.", exampleEn: "Give a short answer, please.", partOfSpeech: "noun" },
        { word: "confirm", ipa: "/kənˈfɜːm/", meaning: "xác nhận", meaningEn: "to say that something is true", example: "Short answers confirm information quickly.", exampleEn: "Short answers confirm information quickly.", partOfSpeech: "verb" },
        { word: "auxiliary", ipa: "/ɔːɡˈzɪliəri/", meaning: "trợ động từ", meaningEn: "a helping verb such as do or be", example: "Repeat the auxiliary in your answer.", exampleEn: "Repeat the auxiliary in your answer.", partOfSpeech: "noun" },
        { word: "reply", ipa: "/rɪˈplaɪ/", meaning: "trả lời", meaningEn: "to answer someone", example: "She replied with two short words.", exampleEn: "She replied with two short words.", partOfSpeech: "verb" },
      ],
      exercises: [
        {
          type: "fill-in-blank",
          instruction: "Hoàn thành câu trả lời ngắn.",
          instructionEn: "Complete each short answer.",
          sentences: [
            { text: "Do you play badminton? Yes, I ___.", textEn: "Do you play badminton? Yes, I ___.", answer: "do" },
            { text: "Is your teacher Finnish? No, she ___.", textEn: "Is your teacher Finnish? No, she ___.", answer: "isn't" },
            { text: "Can your brother cook? Yes, he ___.", textEn: "Can your brother cook? Yes, he ___.", answer: "can" },
          ],
        },
        {
          type: "error-correction",
          instruction: "Sửa câu trả lời ngắn.",
          instructionEn: "Correct the short answer.",
          items: [
            { wrong: "Do you like maths? Yes, I like.", correct: "Do you like maths? Yes, I do.", explanation: "The answer repeats the auxiliary do." },
            { wrong: "Are they ready? Yes, they do.", correct: "Are they ready? Yes, they are.", explanation: "A be question takes a be answer." },
          ],
        },
        {
          type: "transformation",
          instruction: "Viết câu hỏi Yes/No cho câu đã cho.",
          instructionEn: "Write a Yes/No question for the sentence.",
          items: [
            { prompt: "She works in a hospital.", target: "Does she work in a hospital?", cue: "Does" },
            { prompt: "They are new students.", target: "Are they new students?", cue: "Are" },
          ],
        },
        {
          type: "matching",
          instruction: "Nối câu hỏi với câu trả lời ngắn đúng.",
          instructionEn: "Match each question with the correct short answer.",
          pairs: [
            { left: "Do you live near school?", right: "Yes, I do." },
            { left: "Is it cold today?", right: "No, it isn't." },
            { left: "Can he speak Swedish?", right: "Yes, he can." },
          ],
        },
      ],
      quiz: [
        { question: "Do you study Chinese? Yes, I ___.", options: ["am", "do", "does", "can"], answer: 1, explanation: "A do question takes do in the answer." },
        { question: "Is your sister a teacher? No, she ___.", options: ["doesn't", "isn't", "aren't", "don't"], answer: 1, explanation: "A be question takes isn't." },
        { question: "Can they join us? Yes, they ___.", options: ["do", "are", "can", "will"], answer: 2, explanation: "A can question takes can." },
        { question: "Does he work at night? No, he ___.", options: ["don't", "isn't", "doesn't", "can't"], answer: 2, explanation: "Does becomes doesn't in the answer." },
        { question: "Are you ready? Yes, I ___.", options: ["am", "do", "is", "are"], answer: 0, explanation: "The subject I takes am." },
        { question: "Which short answer is correct?", options: ["Yes, I like.", "Yes, I do like.", "Yes, I do.", "Yes, do I."], answer: 2, explanation: "Short answers use only subject plus auxiliary." },
        { question: "Do your parents speak English? Yes, they ___.", options: ["does", "do", "are", "is"], answer: 1, explanation: "A plural subject takes do." },
        { question: "Which answer matches: Is this your book?", options: ["Yes, it does.", "Yes, it is.", "Yes, it do.", "Yes, it can."], answer: 1, explanation: "A be question takes is." },
        { question: "Negative short answers usually use which form?", options: ["full form", "contracted form", "no auxiliary", "past form"], answer: 1, explanation: "Negatives are usually contracted: isn't, don't." },
        { question: "What does a short answer repeat?", options: ["the main verb", "the auxiliary verb", "the object", "the adverb"], answer: 1, explanation: "It repeats the auxiliary verb from the question." },
      ],
    },
  ],
  "grammar-modals": [
    {
      id: "modals-should-must-basic-advice",
      title: "Should và must để khuyên và nêu quy định",
      titleEn: "Should and must for advice and rules",
      level: 2,
      difficulty: "beginner",
      theory: `## Should và must

### 1. Quy tắc
Dùng **should + động từ nguyên mẫu** để khuyên, **must + động từ nguyên mẫu** để nêu quy định bắt buộc.

### 2. Công thức
| Dạng | Mẫu câu |
| --- | --- |
| Khuyên | You **should drink** more water. |
| Bắt buộc | Students **must wear** a uniform. |
| Phủ định | You **shouldn't stay** up late. |

### 3. Khi nào dùng
- Khuyên bạn bè và người thân.
- Nói về nội quy lớp học.
- Nhắc nhở việc quan trọng.

### 4. Câu mẫu
- *You should review your notes every evening.* (Bạn nên xem lại ghi chú mỗi buổi tối.)
- *We must arrive before eight o'clock.* (Chúng ta phải đến trước tám giờ.)
- *He shouldn't skip breakfast.* (Anh ấy không nên bỏ bữa sáng.)

### 5. Lỗi thường gặp
- Sai: *You should to rest.* Đúng: *You should rest.*
- Sai: *She musts finish the report.* Đúng: *She must finish the report.*

### 6. So sánh nhanh
**should** là lời khuyên nhẹ nhàng, **must** là yêu cầu bắt buộc mạnh hơn.`,
      theoryEn: `## Should and must

### 1. Rule
Use **should + base verb** to give advice and **must + base verb** to state a strong rule.

### 2. Form
| Type | Model |
| --- | --- |
| Advice | You **should drink** more water. |
| Obligation | Students **must wear** a uniform. |
| Negative | You **shouldn't stay** up late. |

### 3. When to use
- To advise friends and family.
- To state classroom rules.
- To remind someone about something important.

### 4. Model sentences
- You should review your notes every evening.
- We must arrive before eight o'clock.
- He shouldn't skip breakfast.

### 5. Common mistakes
- Wrong: You should to rest. Right: You should rest. Why: no to after should.
- Wrong: She musts finish the report. Right: She must finish the report. Why: must never takes an -s.

### 6. Contrast box
**Should** gives gentle advice, while **must** expresses a strong obligation.`,
      proTips: [
        "Should và must không bao giờ thêm s hay to.",
        "Dùng must cho nội quy, dùng should cho gợi ý.",
        "Phủ định của should là shouldn't, của must là mustn't.",
      ],
      proTipsEn: [
        "Should and must never take an -s or a following to.",
        "Use must for rules and should for suggestions.",
        "The negatives are shouldn't and mustn't.",
      ],
      vocabulary: [
        { word: "advice", ipa: "/ədˈvaɪs/", meaning: "lời khuyên", meaningEn: "an opinion about what to do", example: "Her advice helped me study better.", exampleEn: "Her advice helped me study better.", partOfSpeech: "noun" },
        { word: "uniform", ipa: "/ˈjuːnɪfɔːm/", meaning: "đồng phục", meaningEn: "special clothes for a school or job", example: "Students must wear a uniform on Monday.", exampleEn: "Students must wear a uniform on Monday.", partOfSpeech: "noun" },
        { word: "rule", ipa: "/ruːl/", meaning: "quy định", meaningEn: "an official instruction", example: "This rule protects everyone in the class.", exampleEn: "This rule protects everyone in the class.", partOfSpeech: "noun" },
        { word: "deadline", ipa: "/ˈdedlaɪn/", meaning: "hạn cuối", meaningEn: "the latest time to finish", example: "We must respect the deadline.", exampleEn: "We must respect the deadline.", partOfSpeech: "noun" },
      ],
      exercises: [
        {
          type: "fill-in-blank",
          instruction: "Điền should hoặc must.",
          instructionEn: "Write should or must.",
          sentences: [
            { text: "You ___ see a doctor if the pain continues.", textEn: "You ___ see a doctor if the pain continues.", answer: "should" },
            { text: "Every passenger ___ show a ticket before boarding.", textEn: "Every passenger ___ show a ticket before boarding.", answer: "must" },
            { text: "You ___ practise speaking a little every day.", textEn: "You ___ practise speaking a little every day.", answer: "should" },
          ],
        },
        {
          type: "error-correction",
          instruction: "Sửa lỗi khi dùng should và must.",
          instructionEn: "Correct the mistake with should and must.",
          items: [
            { wrong: "You should to sleep earlier tonight.", correct: "You should sleep earlier tonight.", explanation: "No to follows should." },
            { wrong: "He musts wear safety glasses.", correct: "He must wear safety glasses.", explanation: "Must never takes an -s." },
          ],
        },
        {
          type: "transformation",
          instruction: "Viết lại câu bằng should hoặc must.",
          instructionEn: "Rewrite each sentence with should or must.",
          items: [
            { prompt: "It is a good idea to bring a dictionary.", target: "You should bring a dictionary.", cue: "should" },
            { prompt: "It is compulsory to hand in the form today.", target: "You must hand in the form today.", cue: "must" },
          ],
        },
        {
          type: "matching",
          instruction: "Nối tình huống với lời khuyên hoặc quy định.",
          instructionEn: "Match each situation with suitable advice or a rule.",
          pairs: [
            { left: "I feel tired every morning.", right: "You should go to bed earlier." },
            { left: "The library rule is clear.", right: "Visitors must keep quiet." },
            { left: "My handwriting is unclear.", right: "You should write more slowly." },
          ],
        },
      ],
      quiz: [
        { question: "You ___ drink more water in hot weather.", options: ["should", "shoulds", "should to", "musts"], answer: 0, explanation: "Should plus base verb gives advice." },
        { question: "All drivers ___ wear a seatbelt.", options: ["should to", "must", "musts", "must to"], answer: 1, explanation: "A legal rule takes must." },
        { question: "He ___ eat so much sugar.", options: ["shouldn't", "shouldn't to", "not should", "musts not"], answer: 0, explanation: "Shouldn't gives negative advice." },
        { question: "Which sentence gives advice?", options: ["You must pay the fine today.", "You should rest for an hour.", "You must show your passport.", "You must stop at the red light."], answer: 1, explanation: "Should expresses advice." },
        { question: "Students ___ hand in the essay by Friday.", options: ["must", "musts", "should to", "must to"], answer: 0, explanation: "A firm deadline takes must." },
        { question: "What follows should?", options: ["base verb", "-ing form", "to plus verb", "past form"], answer: 0, explanation: "Should takes the base verb." },
        { question: "Which is the negative of must?", options: ["mustn't", "musn't", "not must", "doesn't must"], answer: 0, explanation: "The negative is mustn't." },
        { question: "You ___ worry about this small mistake.", options: ["shouldn't", "mustn't to", "shouldn't to", "not should"], answer: 0, explanation: "Shouldn't fits gentle reassurance." },
        { question: "Choose the correct sentence.", options: ["She should studies harder.", "She should study harder.", "She should to study harder.", "She shoulds study harder."], answer: 1, explanation: "Should plus base verb is correct." },
        { question: "Which modal is stronger?", options: ["should", "must", "they are equal", "neither"], answer: 1, explanation: "Must expresses stronger obligation than should." },
      ],
    },
  ],
};
