/**
 * @file part3.ts
 * @description Content upgrade for advanced structure lessons: abstract
 *              articles, quantifiers, inversion, subjunctive, cleft and
 *              participle clauses.
 */
import type { GrammarUpgradeMap } from "./types";

export const GRAMMAR_UPGRADE_PART3: GrammarUpgradeMap = {
  "grammar-articles-abstract": {
    theoryEn: `## Articles with Abstract and Special Nouns

### 1. Rule
Abstract nouns name ideas rather than objects, so they normally appear with no article when the meaning is general. As soon as the idea is limited by a phrase or a clause, the becomes necessary; when it is presented as one particular kind, a/an appears.

### 2. Form
- General idea: zero article - **Education** matters.
- Specific idea: the + noun + of/that-phrase - **The education** she received was excellent.
- One type of the idea: a/an + adjective + noun - **an excellent education**, **a deep love** of music.
- Uncountables (advice, information, news, equipment, furniture, luggage, research): no a/an, no plural. Use a piece of, an item of, two pieces of.

### 3. When to use
- Essay introductions that state a general theme.
- Body paragraphs that narrow the theme to a case or country.
- Reports that quantify uncountable nouns.

### 4. Model sentences
- **Freedom** of speech is protected by law.
- **The freedom** enjoyed by journalists there is limited.
- She has **a remarkable talent** for languages.
- I need **a piece of advice**, not three pages of information.

### 5. Common mistakes
- *An advice*, *informations*, *researches* and *equipments* are all wrong.
- Do not add the to a general concept: *The happiness is important* should be *Happiness is important*.
- Countries: no the for Vietnam or Japan, but the United States, the Philippines, the Netherlands.

### 6. Contrast box
| Sentence | Meaning |
|---|---|
| **Life** is short. | Life in general |
| **The life** of a nurse is demanding. | One specific life |
| She lived **a quiet life**. | One kind of life |`,
    theory: `## Mạo từ với danh từ trừu tượng và trường hợp đặc biệt

### 1. Quy tắc
Danh từ trừu tượng chỉ khái niệm nên thường không có mạo từ khi mang nghĩa chung. Khi khái niệm bị giới hạn bởi cụm bổ nghĩa thì phải dùng the; khi nói về một dạng cụ thể của khái niệm thì dùng a/an.

### 2. Công thức
- Nghĩa chung: không mạo từ - **Education** matters.
- Nghĩa cụ thể: the + danh từ + cụm of/that - **The education** she received was excellent.
- Một dạng của khái niệm: a/an + tính từ + danh từ - **an excellent education**.
- Danh từ không đếm được (advice, information, news, equipment, furniture, luggage, research): không a/an, không số nhiều. Dùng a piece of, an item of.

### 3. Khi nào dùng
- Mở bài nêu chủ đề chung.
- Thân bài thu hẹp về một trường hợp cụ thể.
- Báo cáo cần định lượng danh từ không đếm được.

### 4. Câu mẫu
- **Freedom** of speech is protected by law.
- **The freedom** enjoyed by journalists there is limited.
- She has **a remarkable talent** for languages.
- I need **a piece of advice**, not three pages of information.

### 5. Lỗi thường gặp
- *An advice*, *informations*, *researches*, *equipments* đều sai.
- Không thêm the vào khái niệm chung.
- Tên nước: không the với Vietnam, Japan; nhưng the United States, the Philippines, the Netherlands.

### 6. Bảng đối chiếu
| Câu | Nghĩa |
|---|---|
| **Life** is short. | Cuộc sống nói chung |
| **The life** of a nurse is demanding. | Một cuộc đời cụ thể |
| She lived **a quiet life**. | Một kiểu sống |`,
  },

  "grammar-quantifiers": {
    theoryEn: `## Quantifiers: much, many, few, little, no, none

### 1. Rule
Quantifiers say how much or how many. The first decision is whether the noun is countable or uncountable; the second is whether your message is positive or negative.

### 2. Form
- Countable plural: many, a few, few, several, a number of, plenty of
- Uncountable: much, a little, little, a great deal of, an amount of
- Both: some, any, no, a lot of, lots of, most, all, enough

### 3. When to use
- much and many are most natural in questions and negatives; use a lot of in positive statements.
- a few / a little are positive: there is some.
- few / little are negative: there is almost none.
- no goes before a noun; none stands alone or with of.

### 4. Model sentences
- **Few** students passed, so the test was rewritten.
- **A few** students passed, which pleased the teacher.
- There is **little hope** of a refund.
- **None of the books** on that shelf are mine.

### 5. Common mistakes
- *There are much people* is wrong; use many or a lot of.
- Do not use no and not together: *There aren't no seats* is wrong.
- After none of + plural noun both singular and plural verbs are accepted, but stay consistent.

### 6. Contrast box
| Quantifier | Feeling | Example |
|---|---|---|
| a few | positive, some | I have a few ideas. |
| few | negative, almost none | Few people came. |
| a little | positive, some | We have a little time. |
| little | negative, almost none | We have little time. |`,
    theory: `## Lượng từ: much, many, few, little, no, none

### 1. Quy tắc
Lượng từ cho biết bao nhiêu. Trước hết xác định danh từ đếm được hay không đếm được; sau đó xác định thông điệp mang sắc thái tích cực hay tiêu cực.

### 2. Công thức
- Đếm được số nhiều: many, a few, few, several, a number of, plenty of
- Không đếm được: much, a little, little, a great deal of, an amount of
- Cả hai: some, any, no, a lot of, most, all, enough

### 3. Khi nào dùng
- much và many tự nhiên nhất trong câu hỏi và phủ định; câu khẳng định dùng a lot of.
- a few / a little mang nghĩa tích cực: có một ít.
- few / little mang nghĩa tiêu cực: gần như không có.
- no đứng trước danh từ; none đứng một mình hoặc với of.

### 4. Câu mẫu
- **Few** students passed, so the test was rewritten.
- **A few** students passed, which pleased the teacher.
- There is **little hope** of a refund.
- **None of the books** on that shelf are mine.

### 5. Lỗi thường gặp
- *There are much people* sai, phải dùng many hoặc a lot of.
- Không dùng no cùng not trong một câu.
- Sau none of + danh từ số nhiều, động từ số ít hoặc số nhiều đều được, nhưng phải nhất quán.

### 6. Bảng đối chiếu
| Lượng từ | Sắc thái | Ví dụ |
|---|---|---|
| a few | tích cực, có một ít | I have a few ideas. |
| few | tiêu cực, gần như không | Few people came. |
| a little | tích cực | We have a little time. |
| little | tiêu cực | We have little time. |`,
  },

  "inversion-conditionals": {
    theoryEn: `## Inversion in Conditionals

### 1. Rule
Formal English can delete if and move should, were or had to the front of the clause. The meaning stays identical; only the register rises.

### 2. Form
- Type 1: Should + S + V, (then) imperative or will-clause
- Type 2: Were + S + adjective/noun, S + would + V; Were + S + to + V for a future hypothesis
- Type 3: Had + S + V3, S + would have + V3
- Negative stays full: Were it not for ..., Had it not been for ...

### 3. When to use
- Cover letters, academic essays, contracts and official notices.
- To open a paragraph in a more sophisticated way.

### 4. Model sentences
- **Should you need** further information, please contact our office.
- **Were I** in your position, I would resign.
- **Had I known** about the traffic, I would have left earlier.
- **Had it not been for** the scholarship, she would not have studied abroad.

### 5. Common mistakes
- Do not contract: *Hadn't I known* is wrong.
- Do not keep if: *If had I known* is wrong.
- Only should, were and had can invert in conditionals.

### 6. Contrast box
| With if | Inverted |
|---|---|
| If you should have any questions | Should you have any questions |
| If I were you | Were I you |
| If we had booked earlier | Had we booked earlier |`,
    theory: `## Đảo ngữ trong câu điều kiện

### 1. Quy tắc
Văn trang trọng có thể bỏ if và đưa should, were hoặc had lên đầu mệnh đề. Nghĩa giữ nguyên, chỉ mức trang trọng tăng lên.

### 2. Công thức
- Loại 1: Should + S + V, mệnh lệnh hoặc mệnh đề will
- Loại 2: Were + S + tính từ/danh từ, S + would + V; Were + S + to + V cho giả định tương lai
- Loại 3: Had + S + V3, S + would have + V3
- Phủ định giữ nguyên dạng đầy đủ: Were it not for ..., Had it not been for ...

### 3. Khi nào dùng
- Thư xin việc, bài luận học thuật, hợp đồng, thông báo chính thức.
- Mở đoạn theo cách tinh tế hơn.

### 4. Câu mẫu
- **Should you need** further information, please contact our office.
- **Were I** in your position, I would resign.
- **Had I known** about the traffic, I would have left earlier.
- **Had it not been for** the scholarship, she would not have studied abroad.

### 5. Lỗi thường gặp
- Không rút gọn phủ định.
- Không giữ lại if.
- Chỉ should, were, had mới đảo được trong câu điều kiện.

### 6. Bảng đối chiếu
| Có if | Đảo ngữ |
|---|---|
| If you should have any questions | Should you have any questions |
| If I were you | Were I you |
| If we had booked earlier | Had we booked earlier |`,
  },

  "subjunctive-that-clauses": {
    theoryEn: `## Subjunctive in that-clauses

### 1. Rule
After verbs and adjectives of suggestion, demand or necessity, the verb inside the that-clause stays in the **base form** for every subject, with no -s and no auxiliary.

### 2. Form
- Verb pattern: S + suggest/recommend/propose/insist/demand/request/require/urge/advise + that + S + **base verb**
- Adjective pattern: It is + essential/necessary/important/vital/crucial/imperative + that + S + **base verb**
- Negative: that + S + **not** + base verb
- Passive: that + S + **be** + V3

### 3. When to use
- Formal reports, policies and academic recommendations.
- British English often prefers should + V; American English keeps the bare subjunctive.

### 4. Model sentences
- The doctor recommended that he **stop** smoking.
- It is essential that she **be** on time.
- They demanded that the policy **be reviewed**.
- We suggest that he **not attend** the meeting.

### 5. Common mistakes
- Do not add -s: *recommended that he stops* is not the subjunctive.
- Do not insert to: *demanded that he to leave* is wrong.
- Suggest never takes an object plus infinitive: *suggested me to go* is wrong.

### 6. Contrast box
| Style | Example |
|---|---|
| Subjunctive (formal, American) | I insist that he apologise. |
| should + V (British) | I insist that he should apologise. |
| Indicative (reporting a fact) | He insists that he apologises every time. |`,
    theory: `## Thức giả định trong mệnh đề that

### 1. Quy tắc
Sau các động từ và tính từ chỉ đề nghị, yêu cầu hoặc sự cần thiết, động từ trong mệnh đề that giữ **dạng nguyên mẫu** với mọi chủ ngữ, không thêm -s và không có trợ động từ.

### 2. Công thức
- Với động từ: S + suggest/recommend/propose/insist/demand/request/require/urge/advise + that + S + **V nguyên mẫu**
- Với tính từ: It is + essential/necessary/important/vital/crucial/imperative + that + S + **V nguyên mẫu**
- Phủ định: that + S + **not** + V nguyên mẫu
- Bị động: that + S + **be** + V3

### 3. Khi nào dùng
- Báo cáo trang trọng, chính sách, khuyến nghị học thuật.
- Anh Anh thường dùng should + V; Anh Mỹ giữ dạng giả định trần.

### 4. Câu mẫu
- The doctor recommended that he **stop** smoking.
- It is essential that she **be** on time.
- They demanded that the policy **be reviewed**.
- We suggest that he **not attend** the meeting.

### 5. Lỗi thường gặp
- Không thêm -s.
- Không thêm to.
- Suggest không đi với tân ngữ + to V.

### 6. Bảng đối chiếu
| Phong cách | Ví dụ |
|---|---|
| Giả định (Anh Mỹ, trang trọng) | I insist that he apologise. |
| should + V (Anh Anh) | I insist that he should apologise. |
| Trần thuật (nêu sự thật) | He insists that he apologises every time. |`,
  },

  "subjunctive-wish-if-only": {
    theoryEn: `## Wish and If only - unreal wishes

### 1. Rule
Wish and if only describe a situation the speaker wants to be different. The verb after them moves one tense back to signal unreality, not past time.

### 2. Form
- Unreal present: S + wish / if only + S + past simple (were for all persons)
- Regret about the past: S + wish / if only + S + had + V3
- Complaint about behaviour: S + wish + S + would + V
- Ability: S + wish + S + could + V

### 3. When to use
- Speaking about dissatisfaction politely.
- Writing reflective paragraphs about lessons learned.
- IELTS Speaking Part 3 when discussing changes you would like.

### 4. Model sentences
- I wish I **knew** the answer.
- If only we **had booked** the earlier flight.
- I wish it **would stop** raining.
- She wishes she **could speak** three languages.

### 5. Common mistakes
- *I wish I would go* is wrong; you cannot request yourself, so use could.
- Do not use will after wish.
- If only is stronger and often stands alone as a full exclamation.

### 6. Contrast box
| Sentence | Reality |
|---|---|
| I wish I **were** in Da Nang. | I am not there now. |
| I wish I **had been** in Da Nang. | I was not there then. |
| I wish he **would** listen. | He keeps interrupting. |`,
    theory: `## Wish và If only - ước không có thật

### 1. Quy tắc
Wish và if only mô tả tình huống mà người nói muốn khác đi. Động từ theo sau lùi một bậc thì để đánh dấu tính không có thật, không phải chỉ thời gian quá khứ.

### 2. Công thức
- Không có thật ở hiện tại: S + wish / if only + S + quá khứ đơn (were cho mọi ngôi)
- Tiếc nuối quá khứ: S + wish / if only + S + had + V3
- Phàn nàn thói quen: S + wish + S + would + V
- Khả năng: S + wish + S + could + V

### 3. Khi nào dùng
- Nói về sự chưa hài lòng một cách lịch sự.
- Viết đoạn suy ngẫm về bài học rút ra.
- IELTS Speaking Part 3 khi bàn về thay đổi mong muốn.

### 4. Câu mẫu
- I wish I **knew** the answer.
- If only we **had booked** the earlier flight.
- I wish it **would stop** raining.
- She wishes she **could speak** three languages.

### 5. Lỗi thường gặp
- *I wish I would go* sai, hãy dùng could.
- Không dùng will sau wish.
- If only mạnh hơn và thường đứng riêng thành câu cảm thán.

### 6. Bảng đối chiếu
| Câu | Thực tế |
|---|---|
| I wish I **were** in Da Nang. | Hiện không ở đó. |
| I wish I **had been** in Da Nang. | Khi đó không ở đó. |
| I wish he **would** listen. | Anh ấy cứ ngắt lời. |`,
  },

  "cleft-it-was": {
    theoryEn: `## Cleft Sentences - splitting for emphasis

### 1. Rule
A cleft sentence divides one message into two clauses so that a single element is placed in the spotlight. English has three main types: it-clefts, what-clefts and all-clefts.

### 2. Form
- It-cleft: It + be + emphasised element + that/who + rest
- What-cleft: What + S + V + be + emphasised element
- All-cleft: All + S + V + be + emphasised element
- The verb be agrees with the emphasised element, not with what.

### 3. When to use
- Correcting a misunderstanding: *It was Nam who called, not Minh.*
- Introducing your main argument in an essay.
- Building suspense or contrast in speaking.

### 4. Model sentences
- **It was John who** gave Mary the book.
- **It was the book that** John gave Mary.
- **What I need** is a quiet room.
- **All I want** is a clear deadline.

### 5. Common mistakes
- Use who or that for people, never which.
- What-clefts emphasise things and actions, not people: use The person who ... instead.
- Keep tense agreement: It **was** in 2019 that we met.

### 6. Contrast box
| Plain sentence | Cleft version | Emphasis |
|---|---|---|
| Nam broke the vase. | It was Nam who broke the vase. | The person |
| Nam broke the vase. | It was the vase that Nam broke. | The object |
| I want more time. | What I want is more time. | The need |`,
    theory: `## Câu chẻ - tách câu để nhấn mạnh

### 1. Quy tắc
Câu chẻ tách một thông điệp thành hai mệnh đề để đưa một thành phần lên vị trí nhấn mạnh. Tiếng Anh có ba dạng chính: it-cleft, what-cleft và all-cleft.

### 2. Công thức
- It-cleft: It + be + thành phần nhấn mạnh + that/who + phần còn lại
- What-cleft: What + S + V + be + thành phần nhấn mạnh
- All-cleft: All + S + V + be + thành phần nhấn mạnh
- Động từ be hợp với thành phần nhấn mạnh, không hợp với what.

### 3. Khi nào dùng
- Đính chính hiểu lầm: *It was Nam who called, not Minh.*
- Nêu luận điểm chính trong bài luận.
- Tạo tương phản, gây chú ý khi nói.

### 4. Câu mẫu
- **It was John who** gave Mary the book.
- **It was the book that** John gave Mary.
- **What I need** is a quiet room.
- **All I want** is a clear deadline.

### 5. Lỗi thường gặp
- Với người dùng who hoặc that, không dùng which.
- What-cleft nhấn mạnh vật và hành động, không nhấn người.
- Giữ nhất quán về thì: It **was** in 2019 that we met.

### 6. Bảng đối chiếu
| Câu thường | Câu chẻ | Nhấn mạnh |
|---|---|---|
| Nam broke the vase. | It was Nam who broke the vase. | Người |
| Nam broke the vase. | It was the vase that Nam broke. | Vật |
| I want more time. | What I want is more time. | Nhu cầu |`,
  },

  "participle-reduced-clauses": {
    theoryEn: `## Participle Clauses

### 1. Rule
A participle clause replaces a full clause when both clauses share the same subject. It shortens the sentence and shows time, reason, result or manner.

### 2. Form
- Present participle (active, same time or reason): V-ing
- Past participle (passive): V3
- Perfect participle (earlier action): Having + V3
- Negative: Not + participle; Not having + V3

### 3. When to use
- Academic writing where economy matters.
- Narrative writing to link two actions smoothly.
- Report writing after conjunctions such as after, before, while, when.

### 4. Model sentences
- **Walking home**, he met an old friend.
- **Written by Orwell**, the novel is still popular.
- **Having finished** dinner, they watched a film.
- **Not knowing** the rules, she asked the referee.

### 5. Common mistakes
- The dangling participle is the biggest danger: *Walking down the street, the rain started* wrongly says the rain was walking. Write *Walking down the street, I felt the rain.*
- Do not use a participle clause when the subjects differ; keep the full clause instead.
- Use having + V3 only when the order of events really matters.

### 6. Contrast box
| Full clause | Participle clause |
|---|---|
| Because he was tired, he left early. | Being tired, he left early. |
| After she had sent the email, she logged off. | Having sent the email, she logged off. |
| The report which was published in May | The report published in May |`,
    theory: `## Mệnh đề phân từ

### 1. Quy tắc
Mệnh đề phân từ thay cho một mệnh đề đầy đủ khi hai mệnh đề cùng chủ ngữ. Nó rút ngắn câu và diễn tả thời gian, nguyên nhân, kết quả hoặc cách thức.

### 2. Công thức
- Phân từ hiện tại (chủ động, cùng lúc hoặc nêu lý do): V-ing
- Phân từ quá khứ (bị động): V3
- Phân từ hoàn thành (việc xảy ra trước): Having + V3
- Phủ định: Not + phân từ; Not having + V3

### 3. Khi nào dùng
- Văn học thuật cần ngắn gọn.
- Văn kể để nối hai hành động mượt mà.
- Báo cáo, sau các liên từ after, before, while, when.

### 4. Câu mẫu
- **Walking home**, he met an old friend.
- **Written by Orwell**, the novel is still popular.
- **Having finished** dinner, they watched a film.
- **Not knowing** the rules, she asked the referee.

### 5. Lỗi thường gặp
- Lỗi phân từ treo: *Walking down the street, the rain started* nghĩa là mưa đang đi bộ. Phải viết *Walking down the street, I felt the rain.*
- Khi hai mệnh đề khác chủ ngữ thì giữ nguyên mệnh đề đầy đủ.
- Chỉ dùng having + V3 khi thứ tự sự việc thực sự quan trọng.

### 6. Bảng đối chiếu
| Mệnh đề đầy đủ | Mệnh đề phân từ |
|---|---|
| Because he was tired, he left early. | Being tired, he left early. |
| After she had sent the email, she logged off. | Having sent the email, she logged off. |
| The report which was published in May | The report published in May |`,
  },

  "phrasal-verbs-themes": {
    theoryEn: `## Phrasal Verbs by Theme

### 1. Rule
Phrasal verbs are learned fastest in topic groups, because IELTS Speaking questions also come in topics. Learn five to eight per theme and reuse them in your answers.

### 2. Form
- Verb + particle, sometimes verb + particle + preposition (put up with, look forward to).
- Separable verbs allow the object in the middle; a pronoun object must go there: switch **it** off.
- Inseparable verbs keep the particle glued to the verb: get over an illness.

### 3. Theme banks
**Study**: catch up on, go over, brush up on, drop out, hand in, look up
**Work**: take on staff, carry out a task, set up a company, lay someone off, put off a meeting
**Relationships**: get on with, fall out with, make up, look up to, split up
**Health and daily life**: cut down on, work out, come down with, get over, doze off
**Travel**: check in, set off, drop by, see someone off, get around

### 4. Model sentences
- I am trying to **cut down on** screen time before bed.
- We **set off** at dawn to avoid the traffic.
- She **looks up to** her older sister.
- I need to **brush up on** my presentation skills.

### 5. Common mistakes
- Do not translate literally from Vietnamese; learn the whole chunk.
- Keep register in mind: use conduct rather than carry out in very formal writing.
- Check separability before placing an object.

### 6. Contrast box
| Phrasal verb | Meaning | Formal equivalent |
|---|---|---|
| put off | delay | postpone |
| bring up | mention | raise |
| look into | investigate | examine |
| turn down | reject | decline |`,
    theory: `## Cụm động từ theo chủ đề

### 1. Quy tắc
Học cụm động từ theo nhóm chủ đề là nhanh nhất, vì câu hỏi IELTS Speaking cũng chia theo chủ đề. Mỗi chủ đề học 5-8 cụm và tái sử dụng trong câu trả lời.

### 2. Công thức
- Động từ + tiểu từ, đôi khi động từ + tiểu từ + giới từ (put up with, look forward to).
- Cụm tách được cho phép tân ngữ ở giữa; tân ngữ là đại từ thì bắt buộc ở giữa: switch **it** off.
- Cụm không tách được giữ nguyên: get over an illness.

### 3. Ngân hàng theo chủ đề
**Học tập**: catch up on, go over, brush up on, drop out, hand in, look up
**Công việc**: take on staff, carry out a task, set up a company, lay someone off, put off a meeting
**Quan hệ**: get on with, fall out with, make up, look up to, split up
**Sức khỏe, đời sống**: cut down on, work out, come down with, get over, doze off
**Du lịch**: check in, set off, drop by, see someone off, get around

### 4. Câu mẫu
- I am trying to **cut down on** screen time before bed.
- We **set off** at dawn to avoid the traffic.
- She **looks up to** her older sister.
- I need to **brush up on** my presentation skills.

### 5. Lỗi thường gặp
- Không dịch từng chữ từ tiếng Việt; học nguyên cụm.
- Chú ý mức trang trọng: văn rất trang trọng dùng conduct thay carry out.
- Kiểm tra cụm có tách được không trước khi đặt tân ngữ.

### 6. Bảng đối chiếu
| Cụm động từ | Nghĩa | Từ trang trọng |
|---|---|---|
| put off | trì hoãn | postpone |
| bring up | nhắc đến | raise |
| look into | điều tra | examine |
| turn down | từ chối | decline |`,
  },

  "question-forms": {
    theoryEn: `## Question Forms

### 1. Rule
English questions are built by inversion: an auxiliary moves in front of the subject. The only exceptions are subject questions and embedded questions.

### 2. Form
- Yes/No: Auxiliary + S + V? (Do you work here?)
- Wh-: Wh-word + auxiliary + S + V? (Where does she live?)
- Subject question, no inversion: Who called you? What happened?
- Indirect: Could you tell me + wh-word + S + V? (no do/does/did)
- Negative question: Don't you like it?

### 3. When to use
- Direct questions in everyday conversation and interviews.
- Indirect questions with strangers or in service situations for politeness.
- Negative questions to show surprise or seek agreement.

### 4. Model sentences
- **Did you send** the file yesterday?
- **How long have you been** studying English?
- **Who wrote** this report?
- **Could you tell me where the library is?**

### 5. Common mistakes
- Do not invert in an indirect question: *Could you tell me where does he live* is wrong.
- Do not add do to a subject question: *Who did call you?* is wrong unless you are emphasising.
- Keep the auxiliary and main verb in the right order after wh-words.

### 6. Contrast box
| Direct | Indirect |
|---|---|
| Where is the station? | Do you know where the station is? |
| Did she call? | I wonder whether she called. |
| What time does it start? | Could you tell me what time it starts? |`,
    theory: `## Các dạng câu hỏi

### 1. Quy tắc
Câu hỏi tiếng Anh được tạo bằng đảo ngữ: trợ động từ chuyển lên trước chủ ngữ. Ngoại lệ duy nhất là câu hỏi về chủ ngữ và câu hỏi gián tiếp.

### 2. Công thức
- Yes/No: Trợ động từ + S + V?
- Wh-: Từ hỏi + trợ động từ + S + V?
- Hỏi về chủ ngữ, không đảo: Who called you? What happened?
- Gián tiếp: Could you tell me + từ hỏi + S + V? (không do/does/did)
- Câu hỏi phủ định: Don't you like it?

### 3. Khi nào dùng
- Câu hỏi trực tiếp trong hội thoại, phỏng vấn.
- Câu hỏi gián tiếp khi hỏi người lạ hoặc trong dịch vụ để lịch sự.
- Câu hỏi phủ định để thể hiện ngạc nhiên hoặc tìm sự đồng tình.

### 4. Câu mẫu
- **Did you send** the file yesterday?
- **How long have you been** studying English?
- **Who wrote** this report?
- **Could you tell me where the library is?**

### 5. Lỗi thường gặp
- Không đảo ngữ trong câu hỏi gián tiếp.
- Không thêm do vào câu hỏi về chủ ngữ.
- Giữ đúng trật tự trợ động từ và động từ chính sau từ hỏi.

### 6. Bảng đối chiếu
| Trực tiếp | Gián tiếp |
|---|---|
| Where is the station? | Do you know where the station is? |
| Did she call? | I wonder whether she called. |
| What time does it start? | Could you tell me what time it starts? |`,
  },

  "tag-questions": {
    theoryEn: `## Tag Questions

### 1. Rule
A tag question is a short question added to a statement to check information or invite agreement. The golden rule is opposite polarity: a positive statement takes a negative tag and vice versa.

### 2. Form
- Statement + auxiliary (+ n't) + subject pronoun?
- If the statement has no auxiliary, use do/does/did.
- The tag repeats the tense of the statement.

### 3. When to use
- Confirming what you believe to be true.
- Softening a statement in conversation.
- Making polite requests: Open the window, will you?

### 4. Model sentences
- You are tired, **aren't you**?
- She doesn't smoke, **does she**?
- They have finished, **haven't they**?
- Let's start, **shall we**?

### 5. Special cases
- I am right, **aren't I**? (not amn't I)
- Imperative: Close the door, **will you / won't you**?
- Nobody, everyone, someone take **they**: Nobody called, **did they**?
- Nothing, everything take **it**: Nothing happened, **did it**?
- There is a problem, **isn't there**?

### 6. Intonation and contrast
| Intonation | Meaning |
|---|---|
| Falling tone | You expect agreement; it is not a real question. |
| Rising tone | You are genuinely unsure and want an answer. |`,
    theory: `## Câu hỏi đuôi

### 1. Quy tắc
Câu hỏi đuôi là câu hỏi ngắn thêm sau câu kể để xác nhận thông tin hoặc tìm sự đồng tình. Nguyên tắc vàng là trái dấu: câu khẳng định đi với đuôi phủ định và ngược lại.

### 2. Công thức
- Câu kể + trợ động từ (+ n't) + đại từ chủ ngữ?
- Nếu câu không có trợ động từ thì dùng do/does/did.
- Đuôi giữ đúng thì của câu kể.

### 3. Khi nào dùng
- Xác nhận điều mình tin là đúng.
- Làm câu nói nhẹ nhàng hơn khi trò chuyện.
- Đề nghị lịch sự: Open the window, will you?

### 4. Câu mẫu
- You are tired, **aren't you**?
- She doesn't smoke, **does she**?
- They have finished, **haven't they**?
- Let's start, **shall we**?

### 5. Trường hợp đặc biệt
- I am right, **aren't I**? (không dùng amn't I)
- Câu mệnh lệnh: Close the door, **will you / won't you**?
- Nobody, everyone, someone dùng **they**.
- Nothing, everything dùng **it**.
- There is a problem, **isn't there**?

### 6. Ngữ điệu và đối chiếu
| Ngữ điệu | Ý nghĩa |
|---|---|
| Xuống giọng | Mong người nghe đồng tình, không phải hỏi thật. |
| Lên giọng | Thực sự chưa chắc, muốn có câu trả lời. |`,
  },
};
