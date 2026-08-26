/**
 * @file part4.ts
 * @description Content upgrade for linking words, word order, confusing pairs,
 *              noun clauses and question/modal lessons.
 */
import type { GrammarUpgradeMap } from "./types";

export const GRAMMAR_UPGRADE_PART4: GrammarUpgradeMap = {
  "linking-words-overview": {
    theoryEn: `## Linking Words by Function

### 1. Rule
Linking words signal the relationship between ideas. Choose them by **function** first, then check the grammar they require: some join two clauses, some start a new sentence, and some are followed by a noun.

### 2. Form by grammar type
- Conjunctions joining two clauses: and, but, so, because, although, while, whereas
- Adverbials starting a sentence: However, Therefore, Moreover, Nevertheless, Consequently (+ comma)
- Prepositions followed by a noun or V-ing: despite, in spite of, due to, because of, thanks to

### 3. Function banks
- **Addition**: in addition, furthermore, moreover, besides
- **Contrast**: however, nevertheless, on the other hand, whereas, although, despite
- **Cause**: because, since, as, due to, owing to
- **Result**: therefore, thus, hence, consequently, as a result
- **Purpose**: in order to, so as to, so that
- **Sequence**: firstly, subsequently, meanwhile, finally
- **Example**: for instance, such as, namely
- **Summary**: in conclusion, to sum up, overall

### 4. Model sentences
- **Although** the cost is high, demand keeps rising.
- The cost is high; **however**, demand keeps rising.
- **Despite the high cost**, demand keeps rising.
- Prices rose sharply; **as a result**, sales fell.

### 5. Common mistakes
- Despite and because of take a noun, not a clause: *Despite it was cold* is wrong.
- However is not a conjunction: use a full stop or semicolon before it.
- Do not stack two contrast markers: *Although ... but ...* is wrong.

### 6. Contrast box
| Meaning | + clause | + noun/V-ing |
|---|---|---|
| Contrast | although, though | despite, in spite of |
| Cause | because, since | because of, due to |`,
    theory: `## Từ nối theo chức năng

### 1. Quy tắc
Từ nối cho biết quan hệ giữa các ý. Trước hết chọn theo **chức năng**, sau đó kiểm tra ngữ pháp: có loại nối hai mệnh đề, có loại mở đầu câu mới, có loại đi với danh từ.

### 2. Phân loại theo ngữ pháp
- Liên từ nối hai mệnh đề: and, but, so, because, although, while, whereas
- Trạng từ mở đầu câu: However, Therefore, Moreover, Nevertheless, Consequently (+ dấu phẩy)
- Giới từ đi với danh từ hoặc V-ing: despite, in spite of, due to, because of, thanks to

### 3. Nhóm theo chức năng
- **Bổ sung**: in addition, furthermore, moreover, besides
- **Tương phản**: however, nevertheless, on the other hand, whereas, although, despite
- **Nguyên nhân**: because, since, as, due to, owing to
- **Kết quả**: therefore, thus, hence, consequently, as a result
- **Mục đích**: in order to, so as to, so that
- **Trình tự**: firstly, subsequently, meanwhile, finally
- **Ví dụ**: for instance, such as, namely
- **Tóm lược**: in conclusion, to sum up, overall

### 4. Câu mẫu
- **Although** the cost is high, demand keeps rising.
- The cost is high; **however**, demand keeps rising.
- **Despite the high cost**, demand keeps rising.
- Prices rose sharply; **as a result**, sales fell.

### 5. Lỗi thường gặp
- Despite và because of đi với danh từ, không đi với mệnh đề.
- However không phải liên từ: trước nó cần dấu chấm hoặc chấm phẩy.
- Không dùng hai từ tương phản cùng lúc: *Although ... but ...* sai.

### 6. Bảng đối chiếu
| Ý nghĩa | + mệnh đề | + danh từ/V-ing |
|---|---|---|
| Tương phản | although, though | despite, in spite of |
| Nguyên nhân | because, since | because of, due to |`,
  },

  "adverb-position": {
    theoryEn: `## Adverb Position

### 1. Rule
English places adverbs in three zones: front, middle and end. The zone depends on the type of adverb, and putting an adverb between a verb and its object is not allowed.

### 2. Form
- End position order: **Manner - Place - Time** (MPT)
- Mid position: before the main verb, after be, between auxiliary and main verb
- Front position: connectors and time markers, usually followed by a comma

### 3. When to use
- Manner, place and time details at the end of a descriptive sentence.
- Frequency adverbs (always, often, rarely, never) in mid position.
- Degree adverbs (very, quite, really, extremely) directly before an adjective or adverb.
- Comment adverbs (fortunately, obviously) at the front with a comma.

### 4. Model sentences
- She sang **beautifully at the concert last night**.
- He **always arrives** early, but he **is always** the last to leave.
- I have **never** seen such a crowd.
- **Fortunately**, the flight was not cancelled.

### 5. Common mistakes
- Do not split verb and object: *I speak fluently English* should be *I speak English fluently*.
- Never sits before the main verb, not after it.
- Very cannot modify a plain verb: *I very like it* is wrong; say *I really like it*.

### 6. Contrast box
| Position | Example | Effect |
|---|---|---|
| Front | Slowly, he opened the door. | Dramatic |
| Mid | He slowly opened the door. | Neutral |
| End | He opened the door slowly. | Most common |`,
    theory: `## Vị trí trạng từ

### 1. Quy tắc
Tiếng Anh đặt trạng từ ở ba vị trí: đầu câu, giữa câu và cuối câu. Vị trí phụ thuộc loại trạng từ, và không được chen trạng từ giữa động từ với tân ngữ.

### 2. Công thức
- Trật tự cuối câu: **Cách thức - Nơi chốn - Thời gian** (MPT)
- Giữa câu: trước động từ chính, sau be, giữa trợ động từ và động từ chính
- Đầu câu: từ nối và mốc thời gian, thường kèm dấu phẩy

### 3. Khi nào dùng
- Chi tiết cách thức, nơi chốn, thời gian đặt cuối câu miêu tả.
- Trạng từ tần suất (always, often, rarely, never) đặt giữa câu.
- Trạng từ mức độ (very, quite, really) đặt ngay trước tính từ hoặc trạng từ.
- Trạng từ bình luận (fortunately, obviously) đặt đầu câu kèm dấu phẩy.

### 4. Câu mẫu
- She sang **beautifully at the concert last night**.
- He **always arrives** early, but he **is always** the last to leave.
- I have **never** seen such a crowd.
- **Fortunately**, the flight was not cancelled.

### 5. Lỗi thường gặp
- Không tách động từ và tân ngữ: viết *I speak English fluently*.
- Never đứng trước động từ chính.
- Very không bổ nghĩa cho động từ thường: nói *I really like it*.

### 6. Bảng đối chiếu
| Vị trí | Ví dụ | Hiệu quả |
|---|---|---|
| Đầu câu | Slowly, he opened the door. | Kịch tính |
| Giữa câu | He slowly opened the door. | Trung tính |
| Cuối câu | He opened the door slowly. | Phổ biến nhất |`,
  },

  "adjective-order": {
    theoryEn: `## Adjective Order - OSASCOMP

### 1. Rule
When several adjectives modify one noun, English follows a fixed sequence. Native speakers rarely think about it, but breaking the order sounds immediately wrong.

### 2. Form
**O**pinion - **S**ize - **A**ge - **S**hape - **C**olour - **O**rigin - **M**aterial - **P**urpose - Noun

- Opinion: lovely, boring, useful
- Size: large, tiny, tall
- Age: new, ancient, ten-year-old
- Shape: round, square, slim
- Colour: black, dark green
- Origin: Vietnamese, Italian
- Material: wooden, plastic, cotton
- Purpose: jewellery (box), running (shoes)

### 3. When to use
- Descriptive writing, product descriptions and IELTS Speaking Part 2.
- Two or three adjectives are natural; four or more sound artificial.

### 4. Model sentences
- a **lovely little old round black wooden jewellery** box
- a **beautiful new red Italian sports** car
- an **expensive Japanese cotton** shirt
- a **charming small French** cafe

### 5. Common mistakes
- Do not put colour before size: *a black big bag* is wrong.
- No comma between adjectives from different categories: *a big red bus*, not *a big, red bus*.
- Use a comma only between two opinion adjectives: *a cheap, unreliable service*.

### 6. Contrast box
| Correct | Wrong |
|---|---|
| a small round wooden table | a wooden round small table |
| two young Vietnamese engineers | two Vietnamese young engineers |
| a comfortable old leather chair | an old comfortable leather chair |`,
    theory: `## Trật tự tính từ - OSASCOMP

### 1. Quy tắc
Khi nhiều tính từ cùng bổ nghĩa cho một danh từ, tiếng Anh theo một trật tự cố định. Người bản ngữ ít khi nghĩ tới nó, nhưng sai trật tự thì nghe rất lạ.

### 2. Công thức
**O**pinion - **S**ize - **A**ge - **S**hape - **C**olour - **O**rigin - **M**aterial - **P**urpose - Danh từ

- Ý kiến: lovely, boring, useful
- Kích thước: large, tiny, tall
- Tuổi: new, ancient, ten-year-old
- Hình dáng: round, square, slim
- Màu: black, dark green
- Xuất xứ: Vietnamese, Italian
- Chất liệu: wooden, plastic, cotton
- Mục đích: jewellery (box), running (shoes)

### 3. Khi nào dùng
- Văn miêu tả, mô tả sản phẩm, IELTS Speaking Part 2.
- Hai đến ba tính từ là tự nhiên; từ bốn trở lên nghe gượng.

### 4. Câu mẫu
- a **lovely little old round black wooden jewellery** box
- a **beautiful new red Italian sports** car
- an **expensive Japanese cotton** shirt
- a **charming small French** cafe

### 5. Lỗi thường gặp
- Không đặt màu trước kích thước.
- Không dùng dấu phẩy giữa các tính từ khác nhóm.
- Chỉ dùng dấu phẩy giữa hai tính từ cùng nhóm ý kiến.

### 6. Bảng đối chiếu
| Đúng | Sai |
|---|---|
| a small round wooden table | a wooden round small table |
| two young Vietnamese engineers | two Vietnamese young engineers |
| a comfortable old leather chair | an old comfortable leather chair |`,
  },

  "confusing-pairs-1": {
    theoryEn: `## Confusing Pairs - Set 1

### 1. say vs tell
- **say** + (to somebody) + words: *She said (to me) that she was busy.*
- **tell** + somebody + words: *She told me that she was busy.*
- Fixed phrases: tell the truth, tell a story, tell the time; say hello, say sorry.
- Wrong: *He said me*, *He told that*.

### 2. make vs do
- **make** = create or produce a result: make a cake, a decision, a mistake, money, progress, noise.
- **do** = perform an activity or duty: do homework, do the washing-up, do business, do research, do someone a favour.

### 3. fewer vs less
- **fewer** + countable plural: fewer cars, fewer students.
- **less** + uncountable: less traffic, less time.
- Academic writing keeps this distinction strictly.

### 4. much vs many vs a lot of
- **many** + countable plural, **much** + uncountable.
- In positive statements prefer **a lot of** or **plenty of**; keep much and many for questions and negatives.

### 5. Model sentences
- She **told** the class a story and **said** it was true.
- I need to **make** a decision before I **do** the research.
- **Fewer** applicants means **less** paperwork.

### 6. Contrast box
| Wrong | Right |
|---|---|
| He said me the news. | He told me the news. |
| I did a mistake. | I made a mistake. |
| Less students came. | Fewer students came. |`,
    theory: `## Các cặp dễ nhầm - Nhóm 1

### 1. say và tell
- **say** + (to ai) + nội dung: *She said (to me) that she was busy.*
- **tell** + ai + nội dung: *She told me that she was busy.*
- Cụm cố định: tell the truth, tell a story, tell the time; say hello, say sorry.
- Sai: *He said me*, *He told that*.

### 2. make và do
- **make** = tạo ra, cho ra kết quả: make a cake, a decision, a mistake, money, progress, noise.
- **do** = thực hiện hoạt động, nhiệm vụ: do homework, do the washing-up, do business, do research.

### 3. fewer và less
- **fewer** + danh từ đếm được số nhiều.
- **less** + danh từ không đếm được.
- Văn học thuật giữ nghiêm phân biệt này.

### 4. much, many và a lot of
- **many** + đếm được số nhiều, **much** + không đếm được.
- Câu khẳng định nên dùng **a lot of**; much và many hợp với câu hỏi và phủ định.

### 5. Câu mẫu
- She **told** the class a story and **said** it was true.
- I need to **make** a decision before I **do** the research.
- **Fewer** applicants means **less** paperwork.

### 6. Bảng đối chiếu
| Sai | Đúng |
|---|---|
| He said me the news. | He told me the news. |
| I did a mistake. | I made a mistake. |
| Less students came. | Fewer students came. |`,
  },

  "confusing-pairs-2": {
    theoryEn: `## Confusing Pairs - Set 2

### 1. since vs for
- **since** + a point in time: since 2010, since Monday, since I graduated.
- **for** + a length of time: for nine years, for two weeks.
- Both usually appear with the present perfect.

### 2. during vs while
- **during** + noun: during the meeting, during the summer.
- **while** + clause: while I was studying, while she waited.

### 3. used to vs be used to vs get used to
- **used to + V** = a past habit that has stopped: I used to smoke.
- **be used to + V-ing/noun** = be accustomed: I am used to getting up early.
- **get used to + V-ing** = become accustomed: He is getting used to the climate.

### 4. lie vs lay
- **lie / lay / lain** = rest, no object: I lie down for ten minutes.
- **lay / laid / laid** = put something down, needs an object: Please lay the book on the table.

### 5. its vs it's
- **its** = possessive: The company raised its prices.
- **it's** = it is or it has: It's been a long week.

### 6. Contrast box
| Wrong | Right |
|---|---|
| I have lived here since five years. | I have lived here for five years. |
| During I was cooking | While I was cooking |
| I am used to get up early. | I am used to getting up early. |`,
    theory: `## Các cặp dễ nhầm - Nhóm 2

### 1. since và for
- **since** + mốc thời gian: since 2010, since Monday.
- **for** + khoảng thời gian: for nine years, for two weeks.
- Cả hai thường đi với thì hiện tại hoàn thành.

### 2. during và while
- **during** + danh từ: during the meeting.
- **while** + mệnh đề: while I was studying.

### 3. used to, be used to và get used to
- **used to + V** = thói quen xưa nay không còn.
- **be used to + V-ing/danh từ** = đã quen với.
- **get used to + V-ing** = đang dần quen.

### 4. lie và lay
- **lie / lay / lain** = nằm, không có tân ngữ.
- **lay / laid / laid** = đặt vật gì xuống, cần tân ngữ.

### 5. its và it's
- **its** = sở hữu: The company raised its prices.
- **it's** = it is hoặc it has.

### 6. Bảng đối chiếu
| Sai | Đúng |
|---|---|
| I have lived here since five years. | I have lived here for five years. |
| During I was cooking | While I was cooking |
| I am used to get up early. | I am used to getting up early. |`,
  },

  "noun-clauses-overview": {
    theoryEn: `## Noun Clauses - functions and types

### 1. Rule
A noun clause does the job of a noun: it can be the subject, the object, a complement, or the object of a preposition. Inside the clause, the word order is always that of a statement.

### 2. Form
- that-clause: that + S + V
- wh-clause: what/where/why/how + S + V
- whether/if-clause: whether/if + S + V
- Extraposition: It + be + adjective + that-clause

### 3. When to use
- Reporting opinions and research findings.
- Making a claim the topic of the sentence.
- Introducing indirect questions politely.

### 4. Model sentences
- I know **that he is honest**.
- **That she resigned** surprised everyone.
- It surprised everyone **that she resigned**.
- I don't know **what he wants**.
- We discussed **whether to postpone the trip**.

### 5. Common mistakes
- Never use question word order: *I don't know what does he want* is wrong.
- After a preposition only whether is possible: *We talked about whether to go.*
- Before or not and before a to-infinitive, use whether, not if.
- That can be dropped in informal object clauses but not when the clause is the subject.

### 6. Contrast box
| Function | Example |
|---|---|
| Subject | What she said was surprising. |
| Object | I believe that he will win. |
| Complement | The problem is that we are late. |
| After preposition | It depends on whether they agree. |`,
    theory: `## Mệnh đề danh ngữ - chức năng và các loại

### 1. Quy tắc
Mệnh đề danh ngữ đóng vai trò của danh từ: làm chủ ngữ, tân ngữ, bổ ngữ hoặc tân ngữ của giới từ. Bên trong mệnh đề luôn dùng trật tự câu kể.

### 2. Công thức
- Mệnh đề that: that + S + V
- Mệnh đề wh-: what/where/why/how + S + V
- Mệnh đề whether/if: whether/if + S + V
- Dạng đảo chủ ngữ giả: It + be + tính từ + mệnh đề that

### 3. Khi nào dùng
- Thuật lại ý kiến và kết quả nghiên cứu.
- Đưa một nhận định thành chủ đề của câu.
- Đặt câu hỏi gián tiếp một cách lịch sự.

### 4. Câu mẫu
- I know **that he is honest**.
- **That she resigned** surprised everyone.
- It surprised everyone **that she resigned**.
- I don't know **what he wants**.
- We discussed **whether to postpone the trip**.

### 5. Lỗi thường gặp
- Không dùng trật tự câu hỏi bên trong mệnh đề.
- Sau giới từ chỉ dùng whether.
- Trước or not và trước to + V dùng whether, không dùng if.
- That có thể lược trong mệnh đề tân ngữ thân mật, nhưng không lược khi làm chủ ngữ.

### 6. Bảng đối chiếu
| Chức năng | Ví dụ |
|---|---|
| Chủ ngữ | What she said was surprising. |
| Tân ngữ | I believe that he will win. |
| Bổ ngữ | The problem is that we are late. |
| Sau giới từ | It depends on whether they agree. |`,
  },

  "question-tag": {
    theoryEn: `## Tag Questions - full guide

### 1. Rule
A tag question turns a statement into a check. The tag repeats the auxiliary of the statement, reverses its polarity, and uses a subject pronoun.

### 2. Form
- Positive statement, negative tag: You are ready, **aren't you**?
- Negative statement, positive tag: You don't drive, **do you**?
- No auxiliary in the statement, use do/does/did: She works here, **doesn't she**?

### 3. Special cases
- I am late, **aren't I**?
- Let's leave, **shall we**?
- Open the window, **will you**?
- Nobody phoned, **did they**?
- Nothing changed, **did it**?
- There is a mistake, **isn't there**?
- Negative words such as never, hardly, seldom count as negatives: He never calls, **does he**?

### 4. Model sentences
- They have moved house, **haven't they**?
- You couldn't help me, **could you**?
- She will join us, **won't she**?

### 5. Common mistakes
- Do not repeat the main verb: *You like tea, like you?* is wrong.
- Match the subject pronoun: *Your brother works here, doesn't your brother?* is wrong.
- Use aren't I, never amn't I.

### 6. Contrast box
| Intonation | Function |
|---|---|
| Falling | Seeking agreement, small talk |
| Rising | A genuine question |`,
    theory: `## Câu hỏi đuôi - hướng dẫn đầy đủ

### 1. Quy tắc
Câu hỏi đuôi biến câu kể thành câu xác nhận. Phần đuôi lặp lại trợ động từ của câu kể, đảo dấu và dùng đại từ chủ ngữ.

### 2. Công thức
- Câu khẳng định, đuôi phủ định: You are ready, **aren't you**?
- Câu phủ định, đuôi khẳng định: You don't drive, **do you**?
- Không có trợ động từ thì dùng do/does/did.

### 3. Trường hợp đặc biệt
- I am late, **aren't I**?
- Let's leave, **shall we**?
- Open the window, **will you**?
- Nobody phoned, **did they**?
- Nothing changed, **did it**?
- There is a mistake, **isn't there**?
- Các từ never, hardly, seldom được tính là phủ định.

### 4. Câu mẫu
- They have moved house, **haven't they**?
- You couldn't help me, **could you**?
- She will join us, **won't she**?

### 5. Lỗi thường gặp
- Không lặp lại động từ chính ở phần đuôi.
- Phải dùng đại từ thay cho chủ ngữ.
- Dùng aren't I, không dùng amn't I.

### 6. Bảng đối chiếu
| Ngữ điệu | Chức năng |
|---|---|
| Xuống giọng | Tìm sự đồng tình, xã giao |
| Lên giọng | Hỏi thật sự |`,
    proTipsEn: [
      "Find the auxiliary first: is, are, have, will, can. If there is none, the tag uses do, does or did.",
      "Words like never, rarely and hardly already make the statement negative, so the tag is positive.",
      "In friendly small talk, use a falling tone so it sounds like a comment, not an interrogation.",
      "Practise with your own daily sentences: You live near here, don't you?",
    ],
    proTips: [
      "Tìm trợ động từ trước: is, are, have, will, can. Nếu không có thì đuôi dùng do/does/did.",
      "Các từ never, rarely, hardly đã mang nghĩa phủ định nên đuôi phải khẳng định.",
      "Khi trò chuyện thân thiện, hạ giọng để nghe như một nhận xét chứ không phải tra hỏi.",
      "Luyện bằng chính câu hằng ngày của bạn: You live near here, don't you?",
    ],
    vocabulary: [
      { word: "confirm", ipa: "/kənˈfɜːm/", meaning: "xác nhận", meaningEn: "to check that something is true", example: "Tag questions confirm information.", exampleEn: "Tag questions confirm information.", partOfSpeech: "verb" },
      { word: "polarity", ipa: "/pəˈlærəti/", meaning: "tính khẳng định/phủ định", meaningEn: "whether a clause is positive or negative", example: "The tag reverses the polarity.", exampleEn: "The tag reverses the polarity.", partOfSpeech: "noun" },
      { word: "intonation", ipa: "/ˌɪntəˈneɪʃn/", meaning: "ngữ điệu", meaningEn: "the rise and fall of the voice", example: "Rising intonation makes it a real question.", exampleEn: "Rising intonation makes it a real question.", partOfSpeech: "noun" },
      { word: "small talk", ipa: "/ˈsmɔːl tɔːk/", meaning: "chuyện xã giao", meaningEn: "polite conversation about unimportant things", example: "Tag questions are common in small talk.", exampleEn: "Tag questions are common in small talk.", partOfSpeech: "noun phrase" },
    ],
  },

  "question-indirect": {
    theoryEn: `## Indirect Questions

### 1. Rule
An indirect question wraps a question inside a polite introducer. After the introducer the clause becomes a statement: no inversion, no do/does/did.

### 2. Form
- Introducer + wh-word + S + V
- Introducer + if/whether + S + V
- Common introducers: Could you tell me ...? Do you know ...? I wonder ... Would you mind telling me ...?
- Use a question mark only if the introducer itself is a question.

### 3. When to use
- Asking strangers for directions or information.
- Customer service, interviews and formal emails.
- Softening a question that might feel intrusive.

### 4. Model sentences
- Where is the bank? → Could you tell me **where the bank is**?
- Did he call? → I wonder **if he called**.
- What time does it open? → Do you know **what time it opens**?
- How much is it? → Would you mind telling me **how much it is**?

### 5. Common mistakes
- Do not keep inversion: *Could you tell me where is the bank?* is wrong.
- Do not keep do/does/did: *Do you know what does he want?* is wrong.
- Statements such as *I wonder ...* end with a full stop, not a question mark.

### 6. Contrast box
| Direct | Indirect | Register |
|---|---|---|
| Where is he? | Do you know where he is? | Polite |
| Is she coming? | I wonder whether she is coming. | Reflective |
| What did you pay? | May I ask what you paid? | Very polite |`,
    theory: `## Câu hỏi gián tiếp

### 1. Quy tắc
Câu hỏi gián tiếp lồng câu hỏi vào một mệnh đề dẫn lịch sự. Sau phần dẫn, mệnh đề trở thành câu kể: không đảo ngữ, không do/does/did.

### 2. Công thức
- Phần dẫn + từ hỏi + S + V
- Phần dẫn + if/whether + S + V
- Phần dẫn thường gặp: Could you tell me ...? Do you know ...? I wonder ... Would you mind telling me ...?
- Chỉ dùng dấu hỏi khi phần dẫn là câu hỏi.

### 3. Khi nào dùng
- Hỏi đường, hỏi thông tin từ người lạ.
- Chăm sóc khách hàng, phỏng vấn, email trang trọng.
- Làm nhẹ một câu hỏi có thể gây khó xử.

### 4. Câu mẫu
- Where is the bank? → Could you tell me **where the bank is**?
- Did he call? → I wonder **if he called**.
- What time does it open? → Do you know **what time it opens**?
- How much is it? → Would you mind telling me **how much it is**?

### 5. Lỗi thường gặp
- Không giữ đảo ngữ.
- Không giữ do/does/did.
- Câu dẫn dạng khẳng định như *I wonder ...* kết thúc bằng dấu chấm.

### 6. Bảng đối chiếu
| Trực tiếp | Gián tiếp | Sắc thái |
|---|---|---|
| Where is he? | Do you know where he is? | Lịch sự |
| Is she coming? | I wonder whether she is coming. | Suy tư |
| What did you pay? | May I ask what you paid? | Rất lịch sự |`,
    proTipsEn: [
      "Say the direct question in your head, then delete the inversion before you speak.",
      "Whether sounds more formal than if in writing.",
      "Add please or I was wondering to raise politeness even further.",
      "Indirect questions are ideal for the IELTS Speaking warm-up when you ask the examiner to repeat.",
    ],
    proTips: [
      "Nghĩ câu hỏi trực tiếp trong đầu rồi bỏ phần đảo ngữ trước khi nói.",
      "Trong văn viết, whether trang trọng hơn if.",
      "Thêm please hoặc I was wondering để lịch sự hơn nữa.",
      "Câu hỏi gián tiếp rất hợp khi bạn muốn giám khảo IELTS nhắc lại câu hỏi.",
    ],
    vocabulary: [
      { word: "wonder", ipa: "/ˈwʌndə(r)/", meaning: "tự hỏi", meaningEn: "to want to know something", example: "I wonder whether the shop is open.", exampleEn: "I wonder whether the shop is open.", partOfSpeech: "verb" },
      { word: "polite", ipa: "/pəˈlaɪt/", meaning: "lịch sự", meaningEn: "showing good manners", example: "Indirect questions sound more polite.", exampleEn: "Indirect questions sound more polite.", partOfSpeech: "adjective" },
      { word: "inversion", ipa: "/ɪnˈvɜːʃn/", meaning: "đảo ngữ", meaningEn: "putting the auxiliary before the subject", example: "Indirect questions avoid inversion.", exampleEn: "Indirect questions avoid inversion.", partOfSpeech: "noun" },
      { word: "enquire", ipa: "/ɪnˈkwaɪə(r)/", meaning: "hỏi thông tin", meaningEn: "to ask for information", example: "I am writing to enquire about the course.", exampleEn: "I am writing to enquire about the course.", partOfSpeech: "verb" },
    ],
  },

  "modals-ability-permission": {
    theoryEn: `## Ability, Permission and Degrees of Certainty

### 1. Rule
Can, could, may and might cover three related jobs: describing what someone is able to do, asking for or granting permission, and estimating how likely something is.

### 2. Form
- Ability now: can + V; ability in the past: could + V; one specific past success: was/were able to + V
- Permission: can (informal), could (polite), may (formal)
- Possibility: may, might, could + V; for the past: may/might/could have + V3

### 3. When to use
- Can and could in everyday speech.
- May in signs, rules and formal requests.
- Might when you want to sound cautious in academic writing.

### 4. Model sentences
- I **can** swim, but I **couldn't** swim until I was twelve.
- After three attempts, she **was able to** open the door.
- **May** I use your phone?
- The results **might have been** affected by the weather.

### 5. Certainty scale
| Modal | Approximate certainty |
|---|---|
| will | 100% |
| must | 95%, logical conclusion |
| should | 90%, expectation |
| may | about 50% |
| might / could | 30-40% |
| can't | 0%, impossible |

### 6. Common mistakes
- Do not use could for one completed past achievement; use was able to.
- Mustn't (prohibition) is not the negative of must (deduction); that is can't: *He can't be at home.*
- Never add to after these modals.`,
    theory: `## Khả năng, sự cho phép và mức độ chắc chắn

### 1. Quy tắc
Can, could, may và might đảm nhiệm ba việc liên quan: mô tả khả năng, xin hoặc cho phép, và ước lượng mức độ chắc chắn.

### 2. Công thức
- Khả năng hiện tại: can + V; khả năng quá khứ: could + V; thành công cụ thể trong quá khứ: was/were able to + V
- Cho phép: can (thân mật), could (lịch sự), may (trang trọng)
- Khả năng xảy ra: may, might, could + V; ở quá khứ: may/might/could have + V3

### 3. Khi nào dùng
- Can và could trong giao tiếp hằng ngày.
- May trong biển báo, nội quy, lời đề nghị trang trọng.
- Might khi muốn thận trọng trong văn học thuật.

### 4. Câu mẫu
- I **can** swim, but I **couldn't** swim until I was twelve.
- After three attempts, she **was able to** open the door.
- **May** I use your phone?
- The results **might have been** affected by the weather.

### 5. Thang độ chắc chắn
| Modal | Mức chắc chắn |
|---|---|
| will | 100% |
| must | 95%, suy luận chắc chắn |
| should | 90%, kỳ vọng |
| may | khoảng 50% |
| might / could | 30-40% |
| can't | 0%, không thể |

### 6. Lỗi thường gặp
- Không dùng could cho một thành công cụ thể trong quá khứ, hãy dùng was able to.
- Mustn't (cấm) không phải phủ định của must (suy luận); phủ định đó là can't.
- Không thêm to sau các modal này.`,
    proTipsEn: [
      "For a single past success use was able to or managed to; keep could for general past ability.",
      "In academic writing, may and might soften claims and protect you from overstating results.",
      "Must and can't are opposites when you are guessing: He must be tired / He can't be tired.",
      "Could you ...? is the safest polite request in almost every situation.",
    ],
    proTips: [
      "Thành công cụ thể trong quá khứ dùng was able to hoặc managed to; could dành cho khả năng chung.",
      "Trong văn học thuật, may và might giúp nhận định mềm hơn, tránh khẳng định quá mức.",
      "Khi suy đoán, must và can't là hai cực đối lập: He must be tired / He can't be tired.",
      "Could you ...? là cách đề nghị lịch sự an toàn nhất trong hầu hết tình huống.",
    ],
    vocabulary: [
      { word: "permission", ipa: "/pəˈmɪʃn/", meaning: "sự cho phép", meaningEn: "the right to do something", example: "May I have permission to leave early?", exampleEn: "May I have permission to leave early?", partOfSpeech: "noun" },
      { word: "be able to", ipa: "/bi ˈeɪbl tuː/", meaning: "có thể làm được", meaningEn: "to have the ability to do", example: "She was able to finish on time.", exampleEn: "She was able to finish on time.", partOfSpeech: "phrase" },
      { word: "deduction", ipa: "/dɪˈdʌkʃn/", meaning: "suy luận", meaningEn: "a conclusion based on evidence", example: "Must expresses a confident deduction.", exampleEn: "Must expresses a confident deduction.", partOfSpeech: "noun" },
      { word: "likelihood", ipa: "/ˈlaɪklihʊd/", meaning: "khả năng xảy ra", meaningEn: "how probable something is", example: "Might shows a low likelihood.", exampleEn: "Might shows a low likelihood.", partOfSpeech: "noun" },
    ],
  },
};
