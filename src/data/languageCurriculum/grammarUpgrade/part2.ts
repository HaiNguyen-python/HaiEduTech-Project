/**
 * @file part2.ts
 * @description Content upgrade for relative clauses, articles, modals,
 *              gerunds/infinitives and comparison lessons.
 */
import type { GrammarUpgradeMap } from "./types";

export const GRAMMAR_UPGRADE_PART2: GrammarUpgradeMap = {
  "relative-nondefining": {
    theoryEn: `## Non-defining Relative Clauses

### 1. Rule
A non-defining relative clause adds extra, non-essential information about a noun that is already identified. Because the information is extra, it is separated by commas and can be deleted without damaging the main message.

### 2. Form
- , who + clause (people)
- , which + clause (things, or a whole idea)
- , whose + noun (possession)
- , where / when + clause (place, time)
- The pronoun can never be omitted and **that** is not allowed.

### 3. When to use
- After a proper noun or a noun that is already unique: my mother, Hanoi, this laptop.
- In academic writing to add a definition, date or statistic without a new sentence.
- After a whole clause, using which: *He passed the exam, which surprised everyone.*

### 4. Model sentences
- My sister, **who lives in Paris**, is a chef.
- This book, **which I bought yesterday**, is excellent.
- Da Nang, **where I grew up**, has changed a lot.
- Our teacher, **whose lessons are famous**, retires this year.

### 5. Common mistakes
- Never use that in a non-defining clause.
- Never drop the commas; without them the meaning changes.
- Do not omit the relative pronoun even when it is the object.

### 6. Contrast box
| Type | Example | Meaning |
|---|---|---|
| Defining | My brother **who lives in Hue** is a doctor. | I have several brothers. |
| Non-defining | My brother, **who lives in Hue**, is a doctor. | I have only one brother. |`,
    theory: `## Mệnh đề quan hệ không xác định

### 1. Quy tắc
Mệnh đề quan hệ không xác định bổ sung thông tin thêm cho một danh từ đã rõ. Vì là thông tin phụ nên được tách bằng dấu phẩy và có thể bỏ đi mà câu vẫn đủ nghĩa.

### 2. Công thức
- , who + mệnh đề (người)
- , which + mệnh đề (vật hoặc cả ý trước đó)
- , whose + danh từ (sở hữu)
- , where / when + mệnh đề (nơi chốn, thời gian)
- Không được lược đại từ quan hệ và không dùng **that**.

### 3. Khi nào dùng
- Sau danh từ riêng hoặc danh từ đã xác định duy nhất.
- Trong văn học thuật để thêm định nghĩa, mốc thời gian, số liệu.
- Sau cả mệnh đề, dùng which: *He passed the exam, which surprised everyone.*

### 4. Câu mẫu
- My sister, **who lives in Paris**, is a chef.
- This book, **which I bought yesterday**, is excellent.
- Da Nang, **where I grew up**, has changed a lot.
- Our teacher, **whose lessons are famous**, retires this year.

### 5. Lỗi thường gặp
- Không dùng that trong mệnh đề không xác định.
- Không bỏ dấu phẩy vì sẽ đổi nghĩa.
- Không lược đại từ quan hệ dù nó là tân ngữ.

### 6. Bảng đối chiếu
| Loại | Ví dụ | Nghĩa |
|---|---|---|
| Xác định | My brother **who lives in Hue** is a doctor. | Tôi có nhiều anh em. |
| Không xác định | My brother, **who lives in Hue**, is a doctor. | Tôi chỉ có một anh trai. |`,
    proTipsEn: [
      "Read the sentence without the clause: if it still makes sense, use commas.",
      "Use ', which' to comment on a whole idea - a high-scoring move in IELTS Writing.",
      "In speech, pause slightly where the commas are; that pause is the spoken comma.",
      "Non-defining clauses fit best after names, job titles and unique places.",
    ],
    proTips: [
      "Thử bỏ mệnh đề: nếu câu vẫn đủ nghĩa thì dùng dấu phẩy.",
      "Dùng ', which' để bình luận cả ý phía trước - điểm cộng trong IELTS Writing.",
      "Khi nói, ngắt nhẹ đúng chỗ dấu phẩy.",
      "Mệnh đề không xác định hợp nhất sau tên riêng, chức danh và địa danh duy nhất.",
    ],
    vocabulary: [
      { word: "additional", ipa: "/əˈdɪʃənl/", meaning: "bổ sung", meaningEn: "extra", example: "The clause gives additional information.", exampleEn: "The clause gives additional information.", partOfSpeech: "adjective" },
      { word: "identify", ipa: "/aɪˈdentɪfaɪ/", meaning: "xác định", meaningEn: "to show exactly who or what", example: "A defining clause identifies the noun.", exampleEn: "A defining clause identifies the noun.", partOfSpeech: "verb" },
      { word: "whose", ipa: "/huːz/", meaning: "của người/vật mà", meaningEn: "showing possession", example: "The author, whose book won a prize, spoke first.", exampleEn: "The author, whose book won a prize, spoke first.", partOfSpeech: "pronoun" },
      { word: "comment on", ipa: "/ˈkɒment ɒn/", meaning: "nhận xét về", meaningEn: "to give an opinion about", example: "Use which to comment on the whole idea.", exampleEn: "Use which to comment on the whole idea.", partOfSpeech: "phrasal verb" },
    ],
  },

  "relative-reduced": {
    theoryEn: `## Reduced Relative Clauses

### 1. Rule
A relative clause can be shortened when the relative pronoun is the **subject** of that clause. Reduction removes the pronoun and the auxiliary, leaving a participle or an infinitive phrase.

### 2. Form
- Active: who/which + V → V-ing (people **who wait** → people **waiting**)
- Passive: who/which + be + V3 → V3 (a book **which was written** → a book **written**)
- Infinitive: after the first, the last, the only, the next, superlatives → to + V

### 3. When to use
- To make academic sentences shorter and denser.
- In captions, headlines and reports.
- When two clauses share the same subject and repeating it sounds heavy.

### 4. Model sentences
- The man **standing** near the door is our guide.
- Letters **sent** after Friday will arrive late.
- She was the first candidate **to answer** correctly.
- Students **living** on campus pay a lower fee.

### 5. Common mistakes
- Do not reduce when the pronoun is the object: *The book I read* cannot become *The book reading*.
- Keep the participle next to its noun to avoid ambiguity.
- Do not reduce non-defining clauses in the same way in formal exams unless the meaning stays clear.

### 6. Contrast box
| Full clause | Reduced |
|---|---|
| The girl who is singing | The girl singing |
| The car which was stolen | The car stolen |
| The last person who left | The last person to leave |`,
    theory: `## Rút gọn mệnh đề quan hệ

### 1. Quy tắc
Mệnh đề quan hệ chỉ rút gọn được khi đại từ quan hệ đóng vai **chủ ngữ**. Khi rút, ta bỏ đại từ và trợ động từ, chỉ giữ phân từ hoặc cụm to + V.

### 2. Công thức
- Chủ động: who/which + V → V-ing
- Bị động: who/which + be + V3 → V3
- Nguyên mẫu: sau the first, the last, the only, the next, so sánh nhất → to + V

### 3. Khi nào dùng
- Làm câu học thuật ngắn gọn, súc tích hơn.
- Trong chú thích ảnh, tiêu đề, báo cáo.
- Khi hai mệnh đề cùng chủ ngữ, lặp lại sẽ nặng nề.

### 4. Câu mẫu
- The man **standing** near the door is our guide.
- Letters **sent** after Friday will arrive late.
- She was the first candidate **to answer** correctly.
- Students **living** on campus pay a lower fee.

### 5. Lỗi thường gặp
- Không rút khi đại từ là tân ngữ.
- Đặt phân từ ngay sau danh từ để tránh mơ hồ.
- Trong bài thi, chỉ rút khi nghĩa vẫn rõ ràng.

### 6. Bảng đối chiếu
| Đầy đủ | Rút gọn |
|---|---|
| The girl who is singing | The girl singing |
| The car which was stolen | The car stolen |
| The last person who left | The last person to leave |`,
    proTipsEn: [
      "Check the subject first: if you can replace the pronoun with he/she/it and the verb follows, reduction is safe.",
      "Reduced clauses save words in IELTS Writing where the word limit matters.",
      "Passive reductions are very common in academic English: data collected, methods described.",
      "Read aloud after reducing - if the sentence sounds ambiguous, keep the full clause.",
    ],
    proTips: [
      "Kiểm tra chủ ngữ trước: nếu thay đại từ bằng he/she/it rồi tới động từ thì rút được.",
      "Rút gọn giúp tiết kiệm chữ trong IELTS Writing.",
      "Rút gọn bị động rất phổ biến trong văn học thuật: data collected, methods described.",
      "Đọc lại sau khi rút - nếu nghe mơ hồ thì giữ nguyên mệnh đề đầy đủ.",
    ],
    vocabulary: [
      { word: "participle", ipa: "/ˈpɑːtɪsɪpl/", meaning: "phân từ", meaningEn: "the -ing or -ed form of a verb", example: "The present participle ends in -ing.", exampleEn: "The present participle ends in -ing.", partOfSpeech: "noun" },
      { word: "concise", ipa: "/kənˈsaɪs/", meaning: "súc tích", meaningEn: "short and clear", example: "Reduced clauses make writing concise.", exampleEn: "Reduced clauses make writing concise.", partOfSpeech: "adjective" },
      { word: "ambiguous", ipa: "/æmˈbɪɡjuəs/", meaning: "mơ hồ", meaningEn: "having more than one meaning", example: "A misplaced participle sounds ambiguous.", exampleEn: "A misplaced participle sounds ambiguous.", partOfSpeech: "adjective" },
      { word: "candidate", ipa: "/ˈkændɪdət/", meaning: "ứng viên", meaningEn: "a person applying for something", example: "The first candidate to arrive was interviewed.", exampleEn: "The first candidate to arrive was interviewed.", partOfSpeech: "noun" },
    ],
  },

  "relative-prepositions": {
    theoryEn: `## Relative Clauses with Prepositions

### 1. Rule
When the relative pronoun is the object of a preposition, English offers two positions for that preposition: at the end of the clause (neutral or informal) or directly before the pronoun (formal).

### 2. Form
- Informal: noun + who/that/(zero) + S + V + preposition
- Formal: noun + preposition + whom/which + S + V
- Possession: noun + preposition + whose + noun

### 3. When to use
- End position in speech, emails and IELTS Speaking.
- Front position in academic essays, reports and legal writing.
- Front position is compulsory in fixed phrases such as *the extent to which*.

### 4. Model sentences
- The man **who I spoke to** is our new tutor.
- The man **to whom I spoke** is our new tutor.
- This is the framework **on which the study is based**.
- The company **for which she works** is expanding.

### 5. Common mistakes
- Never place that after a preposition: *the person to that I spoke* is wrong.
- Never use who after a preposition; use whom.
- You cannot omit the pronoun when the preposition comes first.

### 6. Contrast box
| Register | Example |
|---|---|
| Informal | The topic **that** we talked **about** was tricky. |
| Neutral | The topic **we talked about** was tricky. |
| Formal | The topic **about which** we talked was tricky. |`,
    theory: `## Mệnh đề quan hệ có giới từ

### 1. Quy tắc
Khi đại từ quan hệ làm tân ngữ của giới từ, giới từ có thể đứng cuối mệnh đề (trung tính/thân mật) hoặc đứng ngay trước đại từ (trang trọng).

### 2. Công thức
- Thân mật: danh từ + who/that/(lược) + S + V + giới từ
- Trang trọng: danh từ + giới từ + whom/which + S + V
- Sở hữu: danh từ + giới từ + whose + danh từ

### 3. Khi nào dùng
- Giới từ cuối câu trong văn nói, email, IELTS Speaking.
- Giới từ đầu trong bài luận học thuật, báo cáo, văn bản pháp lý.
- Bắt buộc đứng đầu trong cụm cố định như *the extent to which*.

### 4. Câu mẫu
- The man **who I spoke to** is our new tutor.
- The man **to whom I spoke** is our new tutor.
- This is the framework **on which the study is based**.
- The company **for which she works** is expanding.

### 5. Lỗi thường gặp
- Không đặt that sau giới từ.
- Không dùng who sau giới từ, phải dùng whom.
- Không lược đại từ khi giới từ đứng trước.

### 6. Bảng đối chiếu
| Mức trang trọng | Ví dụ |
|---|---|
| Thân mật | The topic **that** we talked **about** was tricky. |
| Trung tính | The topic **we talked about** was tricky. |
| Trang trọng | The topic **about which** we talked was tricky. |`,
  },

  "relative-quantifiers": {
    theoryEn: `## Quantifiers with Relative Pronouns

### 1. Rule
A quantifier plus of whom / of which lets you combine two sentences and describe part of a group inside a single, formal sentence. This structure belongs to non-defining clauses only.

### 2. Form
- quantifier + of + whom (people)
- quantifier + of + which (things)
- Common quantifiers: all, both, many, most, some, few, several, none, each, either, neither, half, a number of, the majority of, and numbers.

### 3. When to use
- Academic writing that reports survey results or group data.
- Formal reports summarising a team, a sample or a collection.
- IELTS Writing Task 1 when describing parts of a total.

### 4. Model sentences
- I teach 30 students, **most of whom** are working adults.
- He gave me five books, **two of which** I have already read.
- The survey covered 200 families, **none of whom** owned a car.
- She has two brothers, **both of whom** live abroad.

### 5. Common mistakes
- Do not write *most of them are* after a comma; that creates a run-on sentence.
- Use whom, not who, after of.
- Do not use this pattern in a defining clause.

### 6. Contrast box
| Two sentences | Combined |
|---|---|
| We hired ten staff. Half of them are engineers. | We hired ten staff, half of whom are engineers. |
| I read three papers. One of them was outdated. | I read three papers, one of which was outdated. |`,
    theory: `## Lượng từ kết hợp đại từ quan hệ

### 1. Quy tắc
Lượng từ + of whom / of which giúp gộp hai câu và mô tả một phần của nhóm trong một câu trang trọng. Cấu trúc này chỉ dùng cho mệnh đề không xác định.

### 2. Công thức
- lượng từ + of + whom (người)
- lượng từ + of + which (vật)
- Lượng từ hay gặp: all, both, many, most, some, few, several, none, each, either, neither, half, a number of, the majority of và các số đếm.

### 3. Khi nào dùng
- Văn học thuật trình bày kết quả khảo sát, số liệu nhóm.
- Báo cáo trang trọng tóm tắt một nhóm hay mẫu.
- IELTS Writing Task 1 khi mô tả các phần của tổng thể.

### 4. Câu mẫu
- I teach 30 students, **most of whom** are working adults.
- He gave me five books, **two of which** I have already read.
- The survey covered 200 families, **none of whom** owned a car.
- She has two brothers, **both of whom** live abroad.

### 5. Lỗi thường gặp
- Không viết *most of them are* sau dấu phẩy vì tạo câu dính.
- Sau of dùng whom chứ không dùng who.
- Không dùng mẫu này trong mệnh đề xác định.

### 6. Bảng đối chiếu
| Hai câu | Câu gộp |
|---|---|
| We hired ten staff. Half of them are engineers. | We hired ten staff, half of whom are engineers. |
| I read three papers. One of them was outdated. | I read three papers, one of which was outdated. |`,
    proTipsEn: [
      "This pattern instantly raises the grammar band in IELTS Writing Task 1 group descriptions.",
      "Keep the verb agreeing with the quantifier: none of whom was / were are both accepted, most of whom are.",
      "Use of which after a number to avoid repeating the noun: three of which, 20% of which.",
      "Do not overuse it; one such sentence per paragraph is enough.",
    ],
    proTips: [
      "Mẫu này nâng ngay điểm ngữ pháp khi mô tả nhóm trong IELTS Writing Task 1.",
      "Chia động từ theo lượng từ: most of whom are, none of whom was/were đều chấp nhận được.",
      "Dùng of which sau số đếm để khỏi lặp danh từ: three of which, 20% of which.",
      "Không lạm dụng, mỗi đoạn một câu là đủ.",
    ],
    vocabulary: [
      { word: "the majority of", ipa: "/ðə məˈdʒɒrəti əv/", meaning: "phần lớn", meaningEn: "most of", example: "The majority of whom were beginners.", exampleEn: "The majority of whom were beginners.", partOfSpeech: "phrase" },
      { word: "respondent", ipa: "/rɪˈspɒndənt/", meaning: "người trả lời khảo sát", meaningEn: "a person who answers a survey", example: "We asked 50 respondents, half of whom were students.", exampleEn: "We asked 50 respondents, half of whom were students.", partOfSpeech: "noun" },
      { word: "none", ipa: "/nʌn/", meaning: "không ai, không cái nào", meaningEn: "not one", example: "None of whom agreed with the plan.", exampleEn: "None of whom agreed with the plan.", partOfSpeech: "pronoun" },
      { word: "combine", ipa: "/kəmˈbaɪn/", meaning: "kết hợp", meaningEn: "to join together", example: "This structure combines two sentences neatly.", exampleEn: "This structure combines two sentences neatly.", partOfSpeech: "verb" },
    ],
  },

  "articles-usage": {
    theoryEn: `## Articles: A, An and The

### 1. Rule
Articles tell the listener whether a noun is new or already known. **A/an** introduces one unidentified member of a class; **the** points to something both speaker and listener can identify.

### 2. Form
- a + consonant **sound**: a book, a university, a European city
- an + vowel **sound**: an apple, an hour, an MBA
- the + singular, plural or uncountable nouns

### 3. When to use
Use **the** when:
1. The noun was mentioned before: I saw a dog. **The** dog was huge.
2. It is unique: the sun, the government, the Internet.
3. A superlative or ordinal follows: the best, the first.
4. A phrase makes it specific: the book **on the desk**.
5. With rivers, oceans, mountain ranges, plural countries: the Mekong, the Alps, the Netherlands.

### 4. Model sentences
- She works as **an** engineer at **a** startup in Hanoi.
- **The** startup she joined last year has doubled in size.
- **The** first lecture of **the** semester is on Monday.

### 5. Common mistakes
- Choose the article by sound, not spelling: **a** university, **an** honest man.
- Do not use a/an with uncountable nouns: *an advice* is wrong; say *a piece of advice*.
- Do not add the before general plurals: *The cats are cute* means specific cats only.

### 6. Contrast box
| Sentence | Meaning |
|---|---|
| I need **a** laptop. | Any laptop. |
| I need **the** laptop. | A specific one we both know. |
| Laptops are expensive. | Laptops in general. |`,
    theory: `## Mạo từ A, An và The

### 1. Quy tắc
Mạo từ cho người nghe biết danh từ là mới hay đã xác định. **A/an** giới thiệu một cá thể chưa xác định; **the** chỉ thứ mà cả người nói và người nghe đều nhận ra.

### 2. Công thức
- a + **âm** phụ âm: a book, a university, a European city
- an + **âm** nguyên âm: an apple, an hour, an MBA
- the + danh từ số ít, số nhiều hoặc không đếm được

### 3. Khi nào dùng the
1. Danh từ đã nhắc trước đó.
2. Vật duy nhất: the sun, the government, the Internet.
3. Có so sánh nhất hoặc số thứ tự: the best, the first.
4. Có cụm bổ nghĩa xác định: the book **on the desk**.
5. Sông, đại dương, dãy núi, tên nước số nhiều: the Mekong, the Alps, the Netherlands.

### 4. Câu mẫu
- She works as **an** engineer at **a** startup in Hanoi.
- **The** startup she joined last year has doubled in size.
- **The** first lecture of **the** semester is on Monday.

### 5. Lỗi thường gặp
- Chọn mạo từ theo âm, không theo chữ viết: **a** university, **an** honest man.
- Không dùng a/an với danh từ không đếm được: nói *a piece of advice*.
- Không thêm the trước danh từ số nhiều mang nghĩa chung.

### 6. Bảng đối chiếu
| Câu | Nghĩa |
|---|---|
| I need **a** laptop. | Một cái bất kỳ. |
| I need **the** laptop. | Cái cụ thể cả hai đều biết. |
| Laptops are expensive. | Máy tính xách tay nói chung. |`,
    proTipsEn: [
      "Ask one question: can my listener point to it? If yes, use the.",
      "First mention takes a/an, every later mention takes the.",
      "Job titles after be take a/an: She is a nurse.",
      "Learn article-heavy chunks as fixed phrases: in the morning, at night, by the way, on the whole.",
    ],
    proTips: [
      "Chỉ cần hỏi: người nghe có chỉ ra được vật đó không? Nếu có thì dùng the.",
      "Lần nhắc đầu dùng a/an, các lần sau dùng the.",
      "Nghề nghiệp sau be dùng a/an: She is a nurse.",
      "Học nguyên cụm cố định: in the morning, at night, by the way, on the whole.",
    ],
    vocabulary: [
      { word: "unique", ipa: "/juˈniːk/", meaning: "duy nhất", meaningEn: "being the only one", example: "The sun is unique, so it takes 'the'.", exampleEn: "The sun is unique, so it takes 'the'.", partOfSpeech: "adjective" },
      { word: "countable noun", ipa: "/ˈkaʊntəbl naʊn/", meaning: "danh từ đếm được", meaningEn: "a noun with a plural form", example: "Book is a countable noun.", exampleEn: "Book is a countable noun.", partOfSpeech: "noun phrase" },
      { word: "specify", ipa: "/ˈspesɪfaɪ/", meaning: "xác định rõ", meaningEn: "to state exactly", example: "The article specifies which one you mean.", exampleEn: "The article specifies which one you mean.", partOfSpeech: "verb" },
      { word: "generalisation", ipa: "/ˌdʒenrəlaɪˈzeɪʃn/", meaning: "sự khái quát", meaningEn: "a statement about a whole group", example: "Plural nouns without articles express generalisation.", exampleEn: "Plural nouns without articles express generalisation.", partOfSpeech: "noun" },
    ],
  },

  "articles-zero": {
    theoryEn: `## Zero Article and Special Cases

### 1. Rule
The zero article means no article at all. English uses it when a noun refers to a whole class, an abstract idea, or belongs to a fixed expression.

### 2. Form
No article before:
- plural nouns in a general sense: Dogs are loyal.
- uncountable nouns in a general sense: Water is essential.
- proper nouns: Vietnam, John, Google
- meals, subjects, sports, languages: breakfast, physics, football, English
- transport with by: by bus, by plane, by train

### 3. When to use
- Making general statements in essays and reports.
- Talking about institutions as functions: go to school, be in hospital, at university.
- Using time phrases: at night, at home, at work, in bed.

### 4. Model sentences
- **Education** should be free for everyone.
- We travel to work **by metro**.
- He plays **football** every Sunday and studies **economics** at university.
- She is in **hospital** this week.

### 5. Common mistakes
- Do not add the to general plurals: *The children learn faster* limits the meaning to particular children.
- Instruments take the: play **the** piano.
- The + adjective means a group: the rich, the elderly.
- Single mountains and lakes take no article: Mount Everest, Lake Baikal, but the Alps, the Pacific.

### 6. Contrast box
| Sentence | Meaning |
|---|---|
| He went to **school**. | As a student, to study. |
| He went to **the school**. | To the building, maybe as a visitor. |
| She is in **prison**. | She is a prisoner. |
| She is in **the prison**. | She is inside the building. |`,
    theory: `## Mạo từ zero và các trường hợp đặc biệt

### 1. Quy tắc
Mạo từ zero nghĩa là không dùng mạo từ. Tiếng Anh dùng nó khi danh từ chỉ cả một loại, một khái niệm trừu tượng, hoặc nằm trong cụm cố định.

### 2. Công thức
Không dùng mạo từ trước:
- danh từ số nhiều mang nghĩa chung: Dogs are loyal.
- danh từ không đếm được nghĩa chung: Water is essential.
- danh từ riêng: Vietnam, John, Google
- bữa ăn, môn học, môn thể thao, ngôn ngữ
- phương tiện với by: by bus, by plane, by train

### 3. Khi nào dùng
- Khi phát biểu khái quát trong bài luận, báo cáo.
- Khi nói về thiết chế theo chức năng: go to school, be in hospital.
- Trong cụm thời gian: at night, at home, at work, in bed.

### 4. Câu mẫu
- **Education** should be free for everyone.
- We travel to work **by metro**.
- He plays **football** every Sunday and studies **economics** at university.
- She is in **hospital** this week.

### 5. Lỗi thường gặp
- Không thêm the vào danh từ số nhiều nghĩa chung.
- Nhạc cụ dùng the: play **the** piano.
- The + tính từ chỉ nhóm người: the rich, the elderly.
- Núi và hồ đơn lẻ không dùng mạo từ: Mount Everest, Lake Baikal; nhưng the Alps, the Pacific.

### 6. Bảng đối chiếu
| Câu | Nghĩa |
|---|---|
| He went to **school**. | Đi học với tư cách học sinh. |
| He went to **the school**. | Đến tòa nhà trường, có thể là khách. |
| She is in **prison**. | Đang thụ án. |
| She is in **the prison**. | Đang ở trong tòa nhà nhà tù. |`,
  },

  "articles-phrasal-verbs": {
    theoryEn: `## Phrasal Verbs and Dependent Prepositions

### 1. Rule
A phrasal verb is a verb plus a particle whose combined meaning is often idiomatic. A dependent preposition is the fixed preposition that a particular verb, adjective or noun always takes.

### 2. Form
- Intransitive: break down, grow up (no object)
- Separable: turn **the light** off / turn off **the light**; with a pronoun the object must sit in the middle: turn **it** off.
- Inseparable: look after the children (never *look the children after*)
- Dependent preposition: interested **in**, afraid **of**, good **at**, depend **on**, apologise **for**, succeed **in**

### 3. When to use
- Phrasal verbs make speaking sound natural and are rewarded in IELTS Speaking.
- Formal writing often prefers the single-word equivalent: postpone rather than put off.

### 4. Model sentences
- She **looks after** her grandmother every weekend.
- Please **turn off** the projector before you leave.
- I had to **put off** the meeting because the client **pulled out**.
- He apologised **for** the delay and insisted **on** paying.

### 5. Common mistakes
- Never separate an inseparable verb.
- A pronoun object always goes before the particle: pick **me** up.
- Do not guess prepositions; learn verb + preposition as one chunk.

### 6. Contrast box
| Informal phrasal verb | Formal single verb |
|---|---|
| put off | postpone |
| find out | discover |
| bring up | raise |
| carry out | conduct |`,
    theory: `## Cụm động từ và giới từ đi kèm

### 1. Quy tắc
Cụm động từ gồm động từ và tiểu từ, nghĩa thường mang tính thành ngữ. Giới từ đi kèm là giới từ cố định mà một động từ, tính từ hay danh từ luôn dùng.

### 2. Công thức
- Nội động: break down, grow up (không tân ngữ)
- Tách được: turn **the light** off / turn off **the light**; nếu tân ngữ là đại từ phải đặt giữa: turn **it** off.
- Không tách: look after the children.
- Giới từ đi kèm: interested **in**, afraid **of**, good **at**, depend **on**, apologise **for**, succeed **in**

### 3. Khi nào dùng
- Cụm động từ giúp phần nói tự nhiên, được đánh giá cao trong IELTS Speaking.
- Văn trang trọng thường chọn động từ đơn tương đương: postpone thay cho put off.

### 4. Câu mẫu
- She **looks after** her grandmother every weekend.
- Please **turn off** the projector before you leave.
- I had to **put off** the meeting because the client **pulled out**.
- He apologised **for** the delay and insisted **on** paying.

### 5. Lỗi thường gặp
- Không tách cụm động từ không tách được.
- Đại từ tân ngữ luôn đứng trước tiểu từ: pick **me** up.
- Không đoán giới từ; học động từ và giới từ như một khối.

### 6. Bảng đối chiếu
| Cụm động từ thân mật | Động từ trang trọng |
|---|---|
| put off | postpone |
| find out | discover |
| bring up | raise |
| carry out | conduct |`,
  },

  "modals-basic": {
    theoryEn: `## Basic Modal Verbs

### 1. Rule
Modal verbs add the speaker's attitude - ability, permission, obligation, advice or probability - to the main verb. They never change form and are always followed by a bare infinitive.

### 2. Form
- Positive: S + modal + V
- Negative: S + modal + not + V (can't, mustn't, shouldn't)
- Question: Modal + S + V?
- No -s, no -ed, no -ing, and never two modals together.

### 3. When to use
| Modal | Function | Example |
|---|---|---|
| can | ability, informal permission | I can swim. |
| could | past ability, polite request | Could you repeat that? |
| may | formal permission, possibility | May I come in? |
| might | weaker possibility | It might rain later. |
| must | strong obligation from the speaker | You must wear a helmet. |
| have to | external obligation, a rule | I have to clock in at eight. |
| should | advice, expectation | You should revise tonight. |

### 4. Model sentences
- Students **may** borrow four books at a time.
- You **mustn't** use your phone during the test.
- We **don't have to** attend; it is optional.

### 5. Common mistakes
- mustn't means prohibition, don't have to means no obligation - they are not the same.
- Do not add to: *I must to go* is wrong.
- Use was able to, not could, for a single past success: *I was able to fix it.*

### 6. Contrast box
| Sentence | Meaning |
|---|---|
| You **must** finish it. | The speaker requires it. |
| You **have to** finish it. | A rule requires it. |
| You **should** finish it. | It is a good idea. |`,
    theory: `## Động từ khuyết thiếu cơ bản

### 1. Quy tắc
Động từ khuyết thiếu thêm thái độ của người nói - khả năng, sự cho phép, bắt buộc, lời khuyên, mức chắc chắn - vào động từ chính. Chúng không chia và luôn đi với động từ nguyên mẫu không to.

### 2. Công thức
- Khẳng định: S + modal + V
- Phủ định: S + modal + not + V
- Nghi vấn: Modal + S + V?
- Không thêm -s, -ed, -ing và không dùng hai modal liền nhau.

### 3. Khi nào dùng
| Modal | Chức năng | Ví dụ |
|---|---|---|
| can | khả năng, cho phép thân mật | I can swim. |
| could | khả năng quá khứ, đề nghị lịch sự | Could you repeat that? |
| may | cho phép trang trọng, khả năng | May I come in? |
| might | khả năng thấp hơn | It might rain later. |
| must | bắt buộc từ người nói | You must wear a helmet. |
| have to | bắt buộc do quy định | I have to clock in at eight. |
| should | lời khuyên | You should revise tonight. |

### 4. Câu mẫu
- Students **may** borrow four books at a time.
- You **mustn't** use your phone during the test.
- We **don't have to** attend; it is optional.

### 5. Lỗi thường gặp
- mustn't là cấm, don't have to là không bắt buộc - hai nghĩa khác nhau.
- Không thêm to: *I must to go* sai.
- Thành công một lần trong quá khứ dùng was able to, không dùng could.

### 6. Bảng đối chiếu
| Câu | Nghĩa |
|---|---|
| You **must** finish it. | Người nói yêu cầu. |
| You **have to** finish it. | Quy định yêu cầu. |
| You **should** finish it. | Nên làm. |`,
  },

  "gerunds-basic": {
    theoryEn: `## Gerunds and Infinitives - the basics

### 1. Rule
A gerund (V-ing) works like a noun; an infinitive (to + V) usually expresses purpose, intention or a future step. Which one you use depends on the word in front of it.

### 2. Form
- Gerund after certain verbs: enjoy, finish, avoid, mind, suggest, keep, practise, consider, deny, imagine.
- Gerund after every preposition: good **at solving**, interested **in learning**, instead **of waiting**.
- Gerund as subject: **Swimming** keeps you fit.
- Infinitive after certain verbs: want, need, decide, hope, plan, promise, agree, refuse, offer, manage.
- Infinitive after adjectives and to show purpose: happy **to help**, I study **to pass**.

### 3. When to use
- Gerund for activities, habits and general ideas.
- Infinitive for goals, plans and single intentions.

### 4. Model sentences
- I **enjoy cycling** to work.
- She **decided to change** her major.
- He is thinking **about applying** for a scholarship.
- **Practising** every day is the fastest way **to improve**.

### 5. Common mistakes
- After a preposition always use V-ing: *interested in to learn* is wrong.
- Avoid, mind and suggest never take the infinitive.
- Look out for to as a preposition: look forward **to hearing**, be used **to living**.

### 6. Contrast box
| Verb | + V-ing | + to V |
|---|---|---|
| stop | stop **smoking** (quit) | stop **to smoke** (pause in order to) |
| remember | remember **locking** (memory of the past) | remember **to lock** (a duty ahead) |
| try | try **restarting** (experiment) | try **to restart** (make an effort) |`,
    theory: `## Danh động từ và động từ nguyên mẫu - phần cơ bản

### 1. Quy tắc
Danh động từ (V-ing) hoạt động như danh từ; động từ nguyên mẫu (to + V) thường chỉ mục đích, dự định hoặc bước tiếp theo. Việc chọn dạng nào phụ thuộc vào từ đứng trước.

### 2. Công thức
- V-ing sau các động từ: enjoy, finish, avoid, mind, suggest, keep, practise, consider, deny, imagine.
- V-ing sau mọi giới từ: good **at solving**, interested **in learning**.
- V-ing làm chủ ngữ: **Swimming** keeps you fit.
- to V sau các động từ: want, need, decide, hope, plan, promise, agree, refuse, offer, manage.
- to V sau tính từ và chỉ mục đích: happy **to help**, I study **to pass**.

### 3. Khi nào dùng
- V-ing cho hoạt động, thói quen, ý niệm chung.
- to V cho mục tiêu, kế hoạch, dự định cụ thể.

### 4. Câu mẫu
- I **enjoy cycling** to work.
- She **decided to change** her major.
- He is thinking **about applying** for a scholarship.
- **Practising** every day is the fastest way **to improve**.

### 5. Lỗi thường gặp
- Sau giới từ luôn dùng V-ing.
- Avoid, mind, suggest không đi với to V.
- Cẩn thận khi to là giới từ: look forward **to hearing**, be used **to living**.

### 6. Bảng đối chiếu
| Động từ | + V-ing | + to V |
|---|---|---|
| stop | stop **smoking** (bỏ hẳn) | stop **to smoke** (dừng lại để hút) |
| remember | remember **locking** (nhớ việc đã làm) | remember **to lock** (nhớ phải làm) |
| try | try **restarting** (thử cách khác) | try **to restart** (cố gắng) |`,
  },

  "gerunds-advanced": {
    theoryEn: `## Advanced Gerunds and Infinitives

### 1. Rule
At advanced level the choice between V-ing and to + V can change meaning, and several verbs take an object before the second verb. Passive and perfect forms add extra precision.

### 2. Form
- Meaning-changing verbs: stop, remember, forget, regret, try, go on, mean.
- V + object + to V: want, ask, tell, advise, allow, encourage, expect, persuade.
- V + object + bare V: make, let, have; also see/hear + object + V or V-ing.
- Passive infinitive: to be + V3; perfect gerund: having + V3.

### 3. When to use
- Meaning pairs when you need precision in writing.
- Causative patterns when someone else performs the action.
- Perfect forms when one action clearly happened before another.

### 4. Model sentences
- He **regrets telling** her the truth, but he **regrets to inform** you that the post is closed.
- The manager **made us stay** late, then **let us leave** early on Friday.
- She expects **to be promoted** next year.
- **Having finished** the draft, he sent it to his tutor.

### 5. Common mistakes
- After make and let, do not add to in the active voice; the passive does: *We were made **to** stay.*
- Advise, allow and permit take V-ing without an object but to V with one: allow **smoking** / allow him **to smoke**.
- Do not confuse be used to + V-ing (accustomed) with used to + V (past habit).

### 6. Contrast box
| Verb | + V-ing | + to V |
|---|---|---|
| go on | continue the same thing | move to a new thing |
| mean | involve, result in | intend |
| regret | be sorry about the past | be sorry to announce now |`,
    theory: `## Danh động từ và nguyên mẫu nâng cao

### 1. Quy tắc
Ở trình độ nâng cao, việc chọn V-ing hay to + V có thể đổi nghĩa, và nhiều động từ cần tân ngữ trước động từ thứ hai. Dạng bị động và hoàn thành giúp diễn đạt chính xác hơn.

### 2. Công thức
- Động từ đổi nghĩa: stop, remember, forget, regret, try, go on, mean.
- V + tân ngữ + to V: want, ask, tell, advise, allow, encourage, expect, persuade.
- V + tân ngữ + V nguyên mẫu: make, let, have; see/hear + tân ngữ + V hoặc V-ing.
- Nguyên mẫu bị động: to be + V3; danh động từ hoàn thành: having + V3.

### 3. Khi nào dùng
- Cặp đổi nghĩa khi cần chính xác trong bài viết.
- Cấu trúc sai khiến khi người khác thực hiện hành động.
- Dạng hoàn thành khi một việc rõ ràng xảy ra trước.

### 4. Câu mẫu
- He **regrets telling** her the truth, but he **regrets to inform** you that the post is closed.
- The manager **made us stay** late, then **let us leave** early on Friday.
- She expects **to be promoted** next year.
- **Having finished** the draft, he sent it to his tutor.

### 5. Lỗi thường gặp
- Sau make và let ở thể chủ động không thêm to; thể bị động thì có: *We were made **to** stay.*
- Advise, allow, permit đi với V-ing khi không có tân ngữ, đi với to V khi có tân ngữ.
- Phân biệt be used to + V-ing (đã quen) với used to + V (thói quen xưa).

### 6. Bảng đối chiếu
| Động từ | + V-ing | + to V |
|---|---|---|
| go on | tiếp tục việc cũ | chuyển sang việc mới |
| mean | kéo theo, dẫn đến | có ý định |
| regret | tiếc việc đã qua | rất tiếc phải thông báo |`,
  },

  "comparisons-basic": {
    theoryEn: `## Comparatives and Superlatives

### 1. Rule
Comparatives compare two things; superlatives rank one item against a whole group. The form depends on the number of syllables in the adjective.

### 2. Form
- One syllable: adj + -er / the adj + -est (tall → taller → the tallest)
- One syllable ending consonant-vowel-consonant: double the last letter (big → bigger)
- Two syllables ending in -y: change y to i (happy → happier → the happiest)
- Two or more syllables: more / the most + adj (expensive → more expensive → the most expensive)
- Equality: as + adj + as; inequality: not as/so + adj + as
- Irregular: good → better → best; bad → worse → worst; far → further → furthest; little → less → least

### 3. When to use
- Comparing prices, sizes, results and opinions.
- Describing charts in IELTS Writing Task 1.
- Making polite, softened comparisons in speech.

### 4. Model sentences
- Hanoi is **cheaper than** Singapore.
- This is **the most useful** app I have downloaded.
- My score is **not as high as** I hoped.
- The second option is **far better** for beginners.

### 5. Common mistakes
- Never combine both forms: *more taller* is wrong.
- Use than for comparatives, the for superlatives.
- Add in or of for the group: the best **in** the class, the best **of** the three.

### 6. Contrast box
| Structure | Example |
|---|---|
| as ... as | She is as fast as her brother. |
| not as ... as | She is not as fast as her brother. |
| comparative + than | She is faster than her brother. |
| the + superlative | She is the fastest in the team. |`,
    theory: `## So sánh hơn và so sánh nhất

### 1. Quy tắc
So sánh hơn dùng cho hai đối tượng; so sánh nhất xếp hạng một đối tượng trong cả nhóm. Hình thức phụ thuộc số âm tiết của tính từ.

### 2. Công thức
- Một âm tiết: adj + -er / the adj + -est (tall → taller → the tallest)
- Một âm tiết dạng phụ âm - nguyên âm - phụ âm: gấp đôi phụ âm cuối (big → bigger)
- Hai âm tiết tận cùng -y: đổi y thành i (happy → happier)
- Từ hai âm tiết trở lên: more / the most + adj
- Bằng nhau: as + adj + as; không bằng: not as/so + adj + as
- Bất quy tắc: good → better → best; bad → worse → worst; far → further → furthest

### 3. Khi nào dùng
- So sánh giá cả, kích thước, kết quả, quan điểm.
- Mô tả biểu đồ trong IELTS Writing Task 1.
- Nói giảm nhẹ khi so sánh trong giao tiếp.

### 4. Câu mẫu
- Hanoi is **cheaper than** Singapore.
- This is **the most useful** app I have downloaded.
- My score is **not as high as** I hoped.
- The second option is **far better** for beginners.

### 5. Lỗi thường gặp
- Không dùng hai dạng cùng lúc: *more taller* sai.
- So sánh hơn đi với than, so sánh nhất đi với the.
- Thêm in hoặc of để nêu phạm vi: the best **in** the class, the best **of** the three.

### 6. Bảng đối chiếu
| Cấu trúc | Ví dụ |
|---|---|
| as ... as | She is as fast as her brother. |
| not as ... as | She is not as fast as her brother. |
| so sánh hơn + than | She is faster than her brother. |
| the + so sánh nhất | She is the fastest in the team. |`,
  },

  "comparisons-double": {
    theoryEn: `## Double and Multiple Comparisons

### 1. Rule
These structures express proportion (one change causes another), multiplication (how many times bigger), and preference between two options.

### 2. Form
- Double comparative: The + comparative + clause, the + comparative + clause
- Progressive change: comparative + and + comparative (bigger and bigger, more and more popular)
- Multiples: twice / three times / half as + adj + as; twice the size of
- Similarity: the same as, similar to, different from
- Preference: prefer A to B; would rather + V than + V; prefer + to V + rather than + V

### 3. When to use
- Describing trends and cause-effect relationships in essays.
- Comparing quantities in Writing Task 1.
- Expressing choices politely in Speaking.

### 4. Model sentences
- **The more** you practise, **the more confident** you become.
- Housing is becoming **more and more expensive**.
- The new campus is **twice as large as** the old one.
- I **would rather study** online **than commute** every day.

### 5. Common mistakes
- Keep the in both halves of a double comparative.
- After would rather use the bare infinitive: *I would rather to stay* is wrong.
- Prefer takes to, not than: prefer tea **to** coffee.
- Different **from** is standard in academic writing.

### 6. Contrast box
| Structure | Example |
|---|---|
| the + comp, the + comp | The earlier you book, the cheaper it is. |
| times as ... as | It costs three times as much as before. |
| would rather ... than | I would rather walk than wait. |`,
    theory: `## So sánh kép và so sánh bội

### 1. Quy tắc
Các cấu trúc này diễn tả quan hệ tỉ lệ (thay đổi này kéo theo thay đổi kia), số lần gấp bội, và sự ưu tiên giữa hai lựa chọn.

### 2. Công thức
- So sánh kép: The + so sánh hơn + mệnh đề, the + so sánh hơn + mệnh đề
- Thay đổi tăng dần: so sánh hơn + and + so sánh hơn
- Gấp bội: twice / three times / half as + adj + as; twice the size of
- Tương đồng: the same as, similar to, different from
- Ưu tiên: prefer A to B; would rather + V than + V

### 3. Khi nào dùng
- Mô tả xu hướng và quan hệ nhân quả trong bài luận.
- So sánh số liệu trong Writing Task 1.
- Diễn đạt lựa chọn lịch sự khi nói.

### 4. Câu mẫu
- **The more** you practise, **the more confident** you become.
- Housing is becoming **more and more expensive**.
- The new campus is **twice as large as** the old one.
- I **would rather study** online **than commute** every day.

### 5. Lỗi thường gặp
- Giữ the ở cả hai vế của so sánh kép.
- Sau would rather dùng động từ nguyên mẫu không to.
- Prefer đi với to, không đi với than.
- Trong văn học thuật dùng different **from**.

### 6. Bảng đối chiếu
| Cấu trúc | Ví dụ |
|---|---|
| the + comp, the + comp | The earlier you book, the cheaper it is. |
| times as ... as | It costs three times as much as before. |
| would rather ... than | I would rather walk than wait. |`,
  },

  "inversions": {
    theoryEn: `## Inversion Patterns

### 1. Rule
Inversion puts the auxiliary before the subject to add emphasis or formality. It is triggered by a negative or restrictive expression placed at the front of the sentence.

### 2. Form
- Negative adverbials: Never, Rarely, Seldom, Little, Not only, No sooner, Hardly, Under no circumstances + auxiliary + S + V
- Only + time/place phrase: Only then / Only after / Only by + auxiliary + S + V
- So / Such + that: So difficult **was** the task that we gave up.
- Conditional inversion: Had I known, Were she here, Should he call

### 3. When to use
- Formal essays, speeches and literary writing.
- To make one dramatic point stand out.
- To vary sentence openings for a higher grammar score.

### 4. Model sentences
- **Never have I seen** such a detailed report.
- **Not only did she pass**, but she also won a prize.
- **No sooner had we arrived than** the rain started.
- **Only after the meeting did I understand** the decision.

### 5. Common mistakes
- Do not invert twice: *Never have I not seen* is wrong.
- Remember the fixed pairs: no sooner ... than, hardly ... when, not only ... but also.
- Use do, does or did if there is no other auxiliary: Rarely **does** he complain.

### 6. Contrast box
| Normal | Inverted |
|---|---|
| I have never seen it. | Never have I seen it. |
| She rarely arrives late. | Rarely does she arrive late. |
| We had hardly sat down when it began. | Hardly had we sat down when it began. |`,
    theory: `## Các mẫu đảo ngữ

### 1. Quy tắc
Đảo ngữ đưa trợ động từ lên trước chủ ngữ để nhấn mạnh hoặc tăng độ trang trọng. Nó được kích hoạt bởi một cụm phủ định hoặc hạn định đặt ở đầu câu.

### 2. Công thức
- Trạng ngữ phủ định: Never, Rarely, Seldom, Little, Not only, No sooner, Hardly, Under no circumstances + trợ động từ + S + V
- Only + cụm thời gian/nơi chốn: Only then / Only after / Only by + trợ động từ + S + V
- So / Such + that: So difficult **was** the task that we gave up.
- Đảo ngữ điều kiện: Had I known, Were she here, Should he call

### 3. Khi nào dùng
- Bài luận trang trọng, diễn văn, văn chương.
- Khi muốn nhấn mạnh một ý gây ấn tượng.
- Khi cần đa dạng cách mở câu để tăng điểm ngữ pháp.

### 4. Câu mẫu
- **Never have I seen** such a detailed report.
- **Not only did she pass**, but she also won a prize.
- **No sooner had we arrived than** the rain started.
- **Only after the meeting did I understand** the decision.

### 5. Lỗi thường gặp
- Không đảo hai lần trong một câu.
- Nhớ các cặp cố định: no sooner ... than, hardly ... when, not only ... but also.
- Nếu không có trợ động từ, dùng do/does/did: Rarely **does** he complain.

### 6. Bảng đối chiếu
| Câu thường | Đảo ngữ |
|---|---|
| I have never seen it. | Never have I seen it. |
| She rarely arrives late. | Rarely does she arrive late. |
| We had hardly sat down when it began. | Hardly had we sat down when it began. |`,
  },
};
