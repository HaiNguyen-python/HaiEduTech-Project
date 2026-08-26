/**
 * @file part1.ts
 * @description Content upgrade for tense, conditional, passive and reported
 *              speech lessons: fuller theory, pro tips and vocabulary.
 */
import type { GrammarUpgradeMap } from "./types";

export const GRAMMAR_UPGRADE_PART1: GrammarUpgradeMap = {
  "tenses-past": {
    theoryEn: `## Past Tenses - the three-layer past

### 1. Rule
English splits the past into three layers: a finished event (Past Simple), a background action in progress (Past Continuous), and an earlier event seen from a later past point (Past Perfect). Choosing the layer is what makes a story sound natural.

### 2. Form
- Past Simple: S + V2/V-ed (did not + V for negatives)
- Past Continuous: S + was/were + V-ing
- Past Perfect: S + had + V3/V-ed

### 3. When to use
- Past Simple: a completed action with a finished time - yesterday, in 2019, last night.
- Past Continuous: an action already running when something else happened, two parallel actions, or scene setting at the start of a story.
- Past Perfect: the earlier of two past actions, especially after before, after, by the time, when.

### 4. Model sentences
- I **finished** the report at nine o'clock.
- She **was reading** when I called.
- The train **had left** before we **reached** the station.
- While he **was cooking**, the lights **went out**.

### 5. Common mistakes
- Do not keep the past form after did: *He didn't went* is wrong; use *He didn't go*.
- Do not use Past Perfect for every past action. Use it only when the order matters.
- State verbs (know, believe, own, belong) avoid the continuous: *I was knowing him* is wrong.

### 6. Contrast box
| Sentence | Meaning |
|---|---|
| When I arrived, she **cooked** dinner. | She started cooking after I arrived. |
| When I arrived, she **was cooking** dinner. | Cooking was already in progress. |
| When I arrived, she **had cooked** dinner. | Dinner was ready before I arrived. |`,
    theory: `## Các thì quá khứ - ba tầng thời gian

### 1. Quy tắc
Tiếng Anh chia quá khứ thành ba tầng: hành động đã kết thúc (Past Simple), hành động đang diễn ra làm nền (Past Continuous), và hành động xảy ra trước một mốc quá khứ khác (Past Perfect). Chọn đúng tầng chính là điều làm câu chuyện nghe tự nhiên.

### 2. Công thức
- Past Simple: S + V2/V-ed (phủ định: did not + V)
- Past Continuous: S + was/were + V-ing
- Past Perfect: S + had + V3/V-ed

### 3. Khi nào dùng
- Past Simple: hành động đã xong với mốc thời gian đã kết thúc - yesterday, in 2019, last night.
- Past Continuous: hành động đang diễn ra thì việc khác xen vào, hai hành động song song, hoặc mở đầu câu chuyện.
- Past Perfect: hành động xảy ra trước, đi kèm before, after, by the time, when.

### 4. Câu mẫu
- I **finished** the report at nine o'clock.
- She **was reading** when I called.
- The train **had left** before we **reached** the station.
- While he **was cooking**, the lights **went out**.

### 5. Lỗi thường gặp
- Sau did không giữ dạng quá khứ: *He didn't went* sai, phải là *He didn't go*.
- Không dùng Past Perfect cho mọi hành động quá khứ, chỉ dùng khi cần nhấn thứ tự trước sau.
- Động từ trạng thái (know, believe, own, belong) không chia tiếp diễn.

### 6. Bảng đối chiếu
| Câu | Ý nghĩa |
|---|---|
| When I arrived, she **cooked** dinner. | Tôi đến rồi cô ấy mới nấu. |
| When I arrived, she **was cooking** dinner. | Cô ấy đang nấu dở. |
| When I arrived, she **had cooked** dinner. | Cô ấy nấu xong trước khi tôi đến. |`,
    proTipsEn: [
      "In a narrative, open with Past Continuous for the scene, then switch to Past Simple for each event.",
      "Use Past Perfect only once per pair of actions; after the order is clear, go back to Past Simple.",
      "Time markers decide the tense: at 8 pm (simple), while (continuous), by the time (perfect).",
      "Read your story aloud - if every sentence starts with 'I had', you are overusing Past Perfect.",
    ],
    proTips: [
      "Kể chuyện: mở đầu bằng Past Continuous để tả bối cảnh, rồi dùng Past Simple cho từng sự việc.",
      "Chỉ dùng Past Perfect một lần cho mỗi cặp hành động; khi thứ tự đã rõ thì quay lại Past Simple.",
      "Trạng từ thời gian quyết định thì: at 8 pm (simple), while (continuous), by the time (perfect).",
      "Đọc to đoạn văn - nếu câu nào cũng bắt đầu bằng 'I had' thì bạn đang lạm dụng Past Perfect.",
    ],
    vocabulary: [
      { word: "meanwhile", ipa: "/ˈmiːnwaɪl/", meaning: "trong lúc đó", meaningEn: "at the same time", example: "Meanwhile, the guests were waiting outside.", exampleEn: "Meanwhile, the guests were waiting outside.", partOfSpeech: "adverb" },
      { word: "by the time", ipa: "/baɪ ðə taɪm/", meaning: "vào lúc mà", meaningEn: "before the moment when", example: "By the time we arrived, the show had started.", exampleEn: "By the time we arrived, the show had started.", partOfSpeech: "phrase" },
      { word: "previously", ipa: "/ˈpriːviəsli/", meaning: "trước đó", meaningEn: "at an earlier time", example: "He had previously worked in Japan.", exampleEn: "He had previously worked in Japan.", partOfSpeech: "adverb" },
      { word: "suddenly", ipa: "/ˈsʌdənli/", meaning: "đột nhiên", meaningEn: "quickly and unexpectedly", example: "I was walking home when suddenly it rained.", exampleEn: "I was walking home when suddenly it rained.", partOfSpeech: "adverb" },
      { word: "interrupt", ipa: "/ˌɪntəˈrʌpt/", meaning: "cắt ngang", meaningEn: "to stop an action in progress", example: "A phone call interrupted the meeting.", exampleEn: "A phone call interrupted the meeting.", partOfSpeech: "verb" },
    ],
  },

  "tenses-future-perfect": {
    theoryEn: `## Future Perfect & Future Perfect Continuous

### 1. Rule
Both tenses look back from a point in the future. Future Perfect reports a **completed result** by that point; Future Perfect Continuous reports the **duration** of an activity still running up to it.

### 2. Form
- Future Perfect: S + will have + V3/V-ed
- Future Perfect Continuous: S + will have been + V-ing
- Negative: will not have (been) ...; Question: Will S have (been) ...?

### 3. When to use
- With a future deadline: by 2030, by then, by the end of the month, before you arrive.
- Future Perfect answers "what will be finished?"
- Future Perfect Continuous answers "how long will it have lasted?" and needs a duration phrase: for five years, since 2020.

### 4. Model sentences
- By June, I **will have submitted** my thesis.
- By next week, they **will have moved** into the new office.
- By 2027, she **will have been teaching** here for ten years.
- Don't call at eight - we **will still be having** dinner.

### 5. Common mistakes
- After by the time, use the present, not will: *By the time you **arrive**, I will have left.*
- State verbs stay simple: *I will have known him for years* (not will have been knowing).
- Without a duration, the continuous sounds odd: *I will have been finishing* is wrong.

### 6. Contrast box
| Sentence | Focus |
|---|---|
| By May, I **will have written** three reports. | Result, countable outcome |
| By May, I **will have been writing** for six months. | Duration of the process |`,
    theory: `## Future Perfect & Future Perfect Continuous

### 1. Quy tắc
Cả hai thì đều nhìn ngược lại từ một mốc trong tương lai. Future Perfect nói về **kết quả đã hoàn tất** trước mốc đó; Future Perfect Continuous nhấn **độ dài** của hành động kéo dài tới mốc đó.

### 2. Công thức
- Future Perfect: S + will have + V3/V-ed
- Future Perfect Continuous: S + will have been + V-ing
- Phủ định: will not have (been) ...; Nghi vấn: Will S have (been) ...?

### 3. Khi nào dùng
- Đi với mốc tương lai: by 2030, by then, by the end of the month, before you arrive.
- Future Perfect trả lời "cái gì sẽ xong?"
- Future Perfect Continuous trả lời "kéo dài bao lâu?" nên cần cụm chỉ khoảng thời gian: for five years, since 2020.

### 4. Câu mẫu
- By June, I **will have submitted** my thesis.
- By next week, they **will have moved** into the new office.
- By 2027, she **will have been teaching** here for ten years.
- Don't call at eight - we **will still be having** dinner.

### 5. Lỗi thường gặp
- Sau by the time dùng hiện tại, không dùng will: *By the time you **arrive**, I will have left.*
- Động từ trạng thái giữ dạng đơn: *I will have known him for years*.
- Thiếu cụm thời lượng thì thì tiếp diễn hoàn thành nghe sai.

### 6. Bảng đối chiếu
| Câu | Trọng tâm |
|---|---|
| By May, I **will have written** three reports. | Kết quả đếm được |
| By May, I **will have been writing** for six months. | Độ dài quá trình |`,
  },

  "conditionals-basic": {
    theoryEn: `## Conditionals Type 0, 1 and 2

### 1. Rule
A conditional has two halves: the **if-clause** (the condition) and the **main clause** (the result). Type 0 states a fact, Type 1 states a realistic future, Type 2 states an imagined present.

### 2. Form
- Type 0: If + present simple, present simple
- Type 1: If + present simple, will/can/may + V
- Type 2: If + past simple, would/could/might + V

### 3. When to use
- Type 0 for scientific facts, rules and instructions that are always true.
- Type 1 for plans, promises, warnings and real possibilities.
- Type 2 for advice, imagination and polite hypothetical suggestions.

### 4. Model sentences
- If you heat water to 100°C, it **boils**.
- If it **rains** tomorrow, we **will cancel** the trip.
- If I **were** you, I **would apply** for the scholarship.
- If she **had** more time, she **could join** the club.

### 5. Common mistakes
- Never put will in the if-clause of Type 1: *If it will rain* is wrong.
- Type 2 uses **were** for every subject in formal English: *If he were here...*
- Keep the comma only when the if-clause comes first.

### 6. Contrast box
| Type | Example | Reality |
|---|---|---|
| 0 | If ice melts, it becomes water. | Always true |
| 1 | If I study, I will pass. | Likely to happen |
| 2 | If I studied, I would pass. | Imagined, not real now |`,
    theory: `## Câu điều kiện loại 0, 1 và 2

### 1. Quy tắc
Câu điều kiện gồm hai vế: **mệnh đề if** (điều kiện) và **mệnh đề chính** (kết quả). Loại 0 nêu sự thật, loại 1 nêu khả năng thật trong tương lai, loại 2 nêu giả định trái hiện tại.

### 2. Công thức
- Loại 0: If + hiện tại đơn, hiện tại đơn
- Loại 1: If + hiện tại đơn, will/can/may + V
- Loại 2: If + quá khứ đơn, would/could/might + V

### 3. Khi nào dùng
- Loại 0: sự thật khoa học, nội quy, hướng dẫn luôn đúng.
- Loại 1: kế hoạch, lời hứa, cảnh báo, khả năng có thật.
- Loại 2: lời khuyên, tưởng tượng, đề nghị lịch sự.

### 4. Câu mẫu
- If you heat water to 100°C, it **boils**.
- If it **rains** tomorrow, we **will cancel** the trip.
- If I **were** you, I **would apply** for the scholarship.
- If she **had** more time, she **could join** the club.

### 5. Lỗi thường gặp
- Không đặt will trong mệnh đề if của loại 1.
- Loại 2 dùng **were** cho mọi chủ ngữ trong văn trang trọng.
- Chỉ dùng dấu phẩy khi mệnh đề if đứng trước.

### 6. Bảng đối chiếu
| Loại | Ví dụ | Mức thực tế |
|---|---|---|
| 0 | If ice melts, it becomes water. | Luôn đúng |
| 1 | If I study, I will pass. | Có thể xảy ra |
| 2 | If I studied, I would pass. | Giả định, không có thật |`,
    proTipsEn: [
      "Swap 'if' for 'unless' to mean 'if not', but never make the verb negative twice: Unless you hurry, you will miss it.",
      "In Type 1 you can replace will with a modal to change tone: might (uncertain), can (permission), must (obligation).",
      "'If I were you, I would...' is the safest advice pattern in IELTS Speaking Part 3.",
      "Mixing types is allowed when logic requires it, but check the time of each half first.",
    ],
    proTips: [
      "Có thể thay 'if' bằng 'unless' (nếu không), nhưng không phủ định hai lần: Unless you hurry, you will miss it.",
      "Ở loại 1, thay will bằng modal khác để đổi sắc thái: might (chưa chắc), can (cho phép), must (bắt buộc).",
      "'If I were you, I would...' là mẫu khuyên an toàn nhất trong IELTS Speaking Part 3.",
      "Được phép trộn các loại khi logic yêu cầu, nhưng phải xác định mốc thời gian của từng vế.",
    ],
    vocabulary: [
      { word: "unless", ipa: "/ənˈles/", meaning: "trừ khi", meaningEn: "except if", example: "Unless you book early, tickets sell out.", exampleEn: "Unless you book early, tickets sell out.", partOfSpeech: "conjunction" },
      { word: "provided that", ipa: "/prəˈvaɪdɪd ðæt/", meaning: "miễn là", meaningEn: "only if", example: "You may leave provided that you finish the task.", exampleEn: "You may leave provided that you finish the task.", partOfSpeech: "phrase" },
      { word: "outcome", ipa: "/ˈaʊtkʌm/", meaning: "kết quả", meaningEn: "the result of a situation", example: "The outcome depends on the weather.", exampleEn: "The outcome depends on the weather.", partOfSpeech: "noun" },
      { word: "likely", ipa: "/ˈlaɪkli/", meaning: "có khả năng", meaningEn: "probable", example: "It is likely that prices will rise.", exampleEn: "It is likely that prices will rise.", partOfSpeech: "adjective" },
    ],
  },

  "conditionals-advanced": {
    theoryEn: `## Conditionals Type 3 and Mixed

### 1. Rule
Type 3 imagines a different **past**, so it always expresses regret or criticism. Mixed conditionals appear when the condition and the result sit in different time zones.

### 2. Form
- Type 3: If + had + V3, would/could/might **have** + V3
- Mixed past → present: If + had + V3, would + V
- Mixed present → past: If + past simple, would have + V3

### 3. When to use
- Type 3 to look back at a missed chance: an exam, an interview, a decision.
- Past → present when an old action still shapes today.
- Present → past when a permanent personal quality explains a past event.

### 4. Model sentences
- If I **had known** about the deadline, I **would have applied**.
- If they **had left** earlier, they **would not have missed** the flight.
- If I **had saved** money last year, I **would be** debt-free now.
- If she **were** more careful, she **would not have broken** the vase.

### 5. Common mistakes
- Do not write *If I would have known*; the if-clause never takes would.
- Keep the full form in writing: would have, not would of.
- Check the time words: now, today signal a present result and therefore a mixed form.

### 6. Contrast box
| Pattern | Time of condition | Time of result |
|---|---|---|
| Type 3 | Past | Past |
| Mixed 1 | Past | Present |
| Mixed 2 | Present (always true) | Past |`,
    theory: `## Câu điều kiện loại 3 và hỗn hợp

### 1. Quy tắc
Loại 3 giả định một **quá khứ khác đi**, nên luôn mang sắc thái tiếc nuối hoặc phê phán. Câu hỗn hợp xuất hiện khi điều kiện và kết quả nằm ở hai mốc thời gian khác nhau.

### 2. Công thức
- Loại 3: If + had + V3, would/could/might **have** + V3
- Hỗn hợp quá khứ → hiện tại: If + had + V3, would + V
- Hỗn hợp hiện tại → quá khứ: If + quá khứ đơn, would have + V3

### 3. Khi nào dùng
- Loại 3 khi nhìn lại cơ hội đã bỏ lỡ.
- Quá khứ → hiện tại khi việc cũ vẫn ảnh hưởng tới hôm nay.
- Hiện tại → quá khứ khi một tính cách cố hữu giải thích sự việc đã qua.

### 4. Câu mẫu
- If I **had known** about the deadline, I **would have applied**.
- If they **had left** earlier, they **would not have missed** the flight.
- If I **had saved** money last year, I **would be** debt-free now.
- If she **were** more careful, she **would not have broken** the vase.

### 5. Lỗi thường gặp
- Không viết *If I would have known*; mệnh đề if không bao giờ có would.
- Viết đủ would have, không viết would of.
- Nhìn từ chỉ thời gian: now, today báo hiệu kết quả hiện tại nên phải dùng dạng hỗn hợp.

### 6. Bảng đối chiếu
| Dạng | Thời gian điều kiện | Thời gian kết quả |
|---|---|---|
| Loại 3 | Quá khứ | Quá khứ |
| Hỗn hợp 1 | Quá khứ | Hiện tại |
| Hỗn hợp 2 | Hiện tại (luôn đúng) | Quá khứ |`,
    proTipsEn: [
      "Regret sentences convert neatly: I didn't revise, so I failed → If I had revised, I would have passed.",
      "Use could have for ability and might have for possibility to sound less absolute than would have.",
      "In speech, 'would have' contracts to would've; write it in full in academic essays.",
      "Ask two questions before choosing: when did the condition happen, and when is the result felt?",
    ],
    proTips: [
      "Chuyển câu tiếc nuối rất gọn: I didn't revise, so I failed → If I had revised, I would have passed.",
      "Dùng could have (khả năng làm được) và might have (có thể) để bớt tuyệt đối hơn would have.",
      "Khi nói would have rút thành would've; trong bài viết học thuật phải viết đầy đủ.",
      "Trước khi chọn dạng, hỏi hai câu: điều kiện xảy ra khi nào, kết quả cảm nhận khi nào?",
    ],
    vocabulary: [
      { word: "regret", ipa: "/rɪˈɡret/", meaning: "hối tiếc", meaningEn: "to feel sorry about something", example: "I regret not taking that job.", exampleEn: "I regret not taking that job.", partOfSpeech: "verb" },
      { word: "hypothetical", ipa: "/ˌhaɪpəˈθetɪkl/", meaning: "giả định", meaningEn: "imagined, not real", example: "This is a hypothetical situation.", exampleEn: "This is a hypothetical situation.", partOfSpeech: "adjective" },
      { word: "missed opportunity", ipa: "/mɪst ˌɒpəˈtjuːnəti/", meaning: "cơ hội bị bỏ lỡ", meaningEn: "a chance that was not taken", example: "The scholarship was a missed opportunity.", exampleEn: "The scholarship was a missed opportunity.", partOfSpeech: "noun phrase" },
      { word: "consequence", ipa: "/ˈkɒnsɪkwəns/", meaning: "hệ quả", meaningEn: "a result of an action", example: "He is still facing the consequences today.", exampleEn: "He is still facing the consequences today.", partOfSpeech: "noun" },
    ],
  },

  "conditionals-wish": {
    theoryEn: `## Wish and If only

### 1. Rule
Wish and if only express a gap between reality and what the speaker wants. If only is the emotional, stronger version of wish. The verb after them shifts one step back in time.

### 2. Form
- Present regret: S + wish / if only + S + past simple (were for all persons)
- Past regret: S + wish / if only + S + had + V3
- Annoyance about behaviour: S + wish + S + would + V

### 3. When to use
- Present: complain about a current situation you cannot change.
- Past: express regret about a finished action.
- Would: criticise a habit that another person could change.

### 4. Model sentences
- I **wish** I **were** taller.
- If only she **lived** closer to the campus.
- I **wish** I **had booked** the ticket earlier.
- I **wish** my neighbours **would stop** playing loud music.

### 5. Common mistakes
- *I wish I would go* is wrong because you control yourself; say *I wish I could go*.
- Do not use will after wish.
- After wish, the past form does not mean past time; it marks unreality.

### 6. Contrast box
| Sentence | Real situation |
|---|---|
| I wish I **had** a car. | I do not have a car now. |
| I wish I **had had** a car. | I did not have one in the past. |
| I wish he **would** answer. | He keeps ignoring me. |`,
    theory: `## Wish và If only

### 1. Quy tắc
Wish và if only diễn tả khoảng cách giữa thực tế và điều người nói mong muốn. If only mạnh và giàu cảm xúc hơn wish. Động từ sau chúng lùi một bậc thời gian.

### 2. Công thức
- Tiếc hiện tại: S + wish / if only + S + quá khứ đơn (were cho mọi ngôi)
- Tiếc quá khứ: S + wish / if only + S + had + V3
- Khó chịu về thói quen: S + wish + S + would + V

### 3. Khi nào dùng
- Hiện tại: than phiền về tình huống không đổi được.
- Quá khứ: tiếc nuối việc đã xảy ra.
- Would: phê bình thói quen của người khác.

### 4. Câu mẫu
- I **wish** I **were** taller.
- If only she **lived** closer to the campus.
- I **wish** I **had booked** the ticket earlier.
- I **wish** my neighbours **would stop** playing loud music.

### 5. Lỗi thường gặp
- *I wish I would go* sai vì bạn tự quyết định được; nói *I wish I could go*.
- Không dùng will sau wish.
- Dạng quá khứ sau wish không chỉ thời gian quá khứ mà chỉ tính không có thật.

### 6. Bảng đối chiếu
| Câu | Thực tế |
|---|---|
| I wish I **had** a car. | Hiện giờ không có xe. |
| I wish I **had had** a car. | Trước đây không có xe. |
| I wish he **would** answer. | Anh ấy cứ phớt lờ. |`,
  },

  "conditionals-inverted": {
    theoryEn: `## Inverted Conditionals

### 1. Rule
In formal English the word if can be deleted. The auxiliary then moves in front of the subject, exactly as in a question. Only three auxiliaries allow this: should, were and had.

### 2. Form
- Type 1: Should + S + V ... , S + will/imperative
- Type 2: Were + S + (to) V ... , S + would + V
- Type 3: Had + S + V3 ... , S + would have + V3

### 3. When to use
- Academic writing, business letters, legal texts and formal speeches.
- To sound polite and slightly distant: *Should you require assistance, please contact us.*
- In IELTS Writing Task 2 as an occasional grammatical range booster.

### 4. Model sentences
- **Should you need** help, call me at any time.
- **Were I** the manager, I would restructure the team.
- **Had we known** the risks, we would have insured the shipment.
- **Were the policy to fail**, the government would face criticism.

### 5. Common mistakes
- Never contract the negative: write *Had it not been for*, not *Hadn't it been for*.
- Do not keep if and the inversion together: *If had I known* is wrong.
- Only should, were and had invert; *Do you need help, call me* is not valid.

### 6. Contrast box
| Standard | Inverted |
|---|---|
| If you should change your mind, ... | Should you change your mind, ... |
| If I were rich, ... | Were I rich, ... |
| If she had applied, ... | Had she applied, ... |`,
    theory: `## Câu điều kiện đảo ngữ

### 1. Quy tắc
Trong văn trang trọng có thể bỏ if. Trợ động từ chuyển lên trước chủ ngữ giống câu hỏi. Chỉ ba trợ động từ được phép: should, were và had.

### 2. Công thức
- Loại 1: Should + S + V ... , S + will/mệnh lệnh
- Loại 2: Were + S + (to) V ... , S + would + V
- Loại 3: Had + S + V3 ... , S + would have + V3

### 3. Khi nào dùng
- Văn học thuật, thư thương mại, văn bản pháp lý, diễn văn trang trọng.
- Để lịch sự, giữ khoảng cách: *Should you require assistance, please contact us.*
- Trong IELTS Writing Task 2 để tăng độ đa dạng ngữ pháp.

### 4. Câu mẫu
- **Should you need** help, call me at any time.
- **Were I** the manager, I would restructure the team.
- **Had we known** the risks, we would have insured the shipment.
- **Were the policy to fail**, the government would face criticism.

### 5. Lỗi thường gặp
- Không rút gọn phủ định: viết *Had it not been for*, không viết *Hadn't it been for*.
- Không giữ cả if lẫn đảo ngữ.
- Chỉ should, were, had mới đảo được.

### 6. Bảng đối chiếu
| Dạng thường | Đảo ngữ |
|---|---|
| If you should change your mind, ... | Should you change your mind, ... |
| If I were rich, ... | Were I rich, ... |
| If she had applied, ... | Had she applied, ... |`,
    proTipsEn: [
      "Use one inverted conditional per essay - more than that sounds artificial.",
      "'Were + S + to + V' makes a future hypothesis sound very formal: Were the plan to succeed...",
      "Inversion never changes meaning, only register, so decide by audience.",
      "Practise by rewriting your own Type 3 sentences: If I had... becomes Had I...",
    ],
    proTips: [
      "Mỗi bài viết chỉ nên dùng một câu đảo ngữ - nhiều hơn sẽ thiếu tự nhiên.",
      "'Were + S + to + V' tạo giả định tương lai rất trang trọng: Were the plan to succeed...",
      "Đảo ngữ không đổi nghĩa, chỉ đổi mức trang trọng, nên chọn theo đối tượng đọc.",
      "Luyện bằng cách viết lại câu loại 3 của chính mình: If I had... thành Had I...",
    ],
    vocabulary: [
      { word: "require", ipa: "/rɪˈkwaɪə(r)/", meaning: "cần, yêu cầu", meaningEn: "to need something", example: "Should you require further details, email us.", exampleEn: "Should you require further details, email us.", partOfSpeech: "verb" },
      { word: "assistance", ipa: "/əˈsɪstəns/", meaning: "sự hỗ trợ", meaningEn: "help", example: "Assistance is available at the front desk.", exampleEn: "Assistance is available at the front desk.", partOfSpeech: "noun" },
      { word: "formal register", ipa: "/ˈfɔːml ˈredʒɪstə(r)/", meaning: "văn phong trang trọng", meaningEn: "a polite, official style of language", example: "Inversion belongs to a formal register.", exampleEn: "Inversion belongs to a formal register.", partOfSpeech: "noun phrase" },
      { word: "restructure", ipa: "/ˌriːˈstrʌktʃə(r)/", meaning: "tái cơ cấu", meaningEn: "to organise something in a new way", example: "Were I in charge, I would restructure the department.", exampleEn: "Were I in charge, I would restructure the department.", partOfSpeech: "verb" },
    ],
  },

  "passive-advanced": {
    theoryEn: `## Advanced Passive and Causative

### 1. Rule
Advanced passives let a writer stay objective, move new information to the end of the sentence, or report an opinion without naming the source. The causative shows that the subject arranges an action instead of doing it.

### 2. Form
- Reporting passive: It + is said/believed/reported + that + clause
- Personal passive: S + is said/believed + to + V (to have + V3 for earlier time)
- Two objects: S + be + V3 + object, or Object + be + V3 + to/for + person
- Causative: have/get + object + V3; have + person + V, get + person + to + V

### 3. When to use
- Academic writing where the agent is unknown, obvious or irrelevant.
- News reports quoting unnamed sources.
- Everyday situations where a service is arranged for you.

### 4. Model sentences
- **It is believed that** the site dates from the Bronze Age.
- The minister **is said to have resigned** last night.
- I **was given** a second chance.
- We **had the roof repaired** before the storm.

### 5. Common mistakes
- Do not mix the two reporting patterns: *He is said that he is rich* is wrong.
- Causative order is fixed: have + object + past participle, not have + past participle + object.
- Get + person keeps to: *I got him to sign it*, but *I had him sign it*.

### 6. Contrast box
| Sentence | Meaning |
|---|---|
| I **repaired** my laptop. | I did the work. |
| I **had** my laptop **repaired**. | A technician did it for me. |
| My laptop **got** damaged. | Unplanned, negative event. |`,
    theory: `## Bị động nâng cao và thể sai khiến

### 1. Quy tắc
Bị động nâng cao giúp người viết giữ giọng khách quan, đẩy thông tin mới về cuối câu, hoặc thuật lại ý kiến mà không nêu nguồn. Thể sai khiến cho thấy chủ ngữ thuê/nhờ người khác làm.

### 2. Công thức
- Bị động tường thuật: It + is said/believed/reported + that + mệnh đề
- Bị động cá nhân: S + is said/believed + to + V (to have + V3 nếu việc xảy ra trước)
- Hai tân ngữ: S + be + V3 + tân ngữ, hoặc Tân ngữ + be + V3 + to/for + người
- Sai khiến: have/get + tân ngữ + V3; have + người + V, get + người + to + V

### 3. Khi nào dùng
- Văn học thuật khi chủ thể không rõ hoặc không quan trọng.
- Bản tin dẫn nguồn ẩn danh.
- Tình huống đời thường khi thuê dịch vụ.

### 4. Câu mẫu
- **It is believed that** the site dates from the Bronze Age.
- The minister **is said to have resigned** last night.
- I **was given** a second chance.
- We **had the roof repaired** before the storm.

### 5. Lỗi thường gặp
- Không trộn hai mẫu tường thuật: *He is said that he is rich* sai.
- Trật tự sai khiến cố định: have + tân ngữ + V3.
- Get + người phải có to: *I got him to sign it*, còn *I had him sign it*.

### 6. Bảng đối chiếu
| Câu | Nghĩa |
|---|---|
| I **repaired** my laptop. | Tôi tự sửa. |
| I **had** my laptop **repaired**. | Thợ sửa giúp tôi. |
| My laptop **got** damaged. | Sự cố ngoài ý muốn. |`,
    proTipsEn: [
      "Choose the personal passive (He is thought to be...) when the person is already the topic of the paragraph.",
      "For an earlier action, use to have + V3: She is believed to have left the country.",
      "In IELTS Writing, one reporting passive per body paragraph is enough to sound academic.",
      "Get-passives feel informal, so keep them for speaking: The window got broken.",
    ],
    proTips: [
      "Dùng bị động cá nhân (He is thought to be...) khi người đó đã là chủ đề của đoạn.",
      "Với việc xảy ra trước, dùng to have + V3: She is believed to have left the country.",
      "Trong IELTS Writing, mỗi đoạn thân bài một câu bị động tường thuật là đủ học thuật.",
      "Get-passive mang tính khẩu ngữ, nên để dành cho phần nói: The window got broken.",
    ],
    vocabulary: [
      { word: "allegedly", ipa: "/əˈledʒɪdli/", meaning: "theo cáo buộc", meaningEn: "according to what people say", example: "The company allegedly ignored the warning.", exampleEn: "The company allegedly ignored the warning.", partOfSpeech: "adverb" },
      { word: "be reported to", ipa: "/bi rɪˈpɔːtɪd tuː/", meaning: "được cho là", meaningEn: "people say that", example: "Sales are reported to have doubled.", exampleEn: "Sales are reported to have doubled.", partOfSpeech: "phrase" },
      { word: "renovate", ipa: "/ˈrenəveɪt/", meaning: "cải tạo", meaningEn: "to repair and improve a building", example: "We had the kitchen renovated.", exampleEn: "We had the kitchen renovated.", partOfSpeech: "verb" },
      { word: "objective", ipa: "/əbˈdʒektɪv/", meaning: "khách quan", meaningEn: "not influenced by personal feelings", example: "The passive keeps the tone objective.", exampleEn: "The passive keeps the tone objective.", partOfSpeech: "adjective" },
    ],
  },

  "passive-causative": {
    theoryEn: `## Causative Have and Get

### 1. Rule
The causative says that the subject **arranges** an action rather than performing it. English marks this with have or get plus a past participle, or with a person plus a verb.

### 2. Form
- Service done for you: S + have + object + V3
- Informal equivalent: S + get + object + V3
- Instruct a person: S + have + person + bare V
- Persuade a person: S + get + person + to + V
- Unpleasant experience: S + had + object + V3 (I had my wallet stolen.)

### 3. When to use
- Talking about services: haircuts, repairs, deliveries, printing, medical checks.
- Delegating work in an office.
- Reporting something bad that happened to you.

### 4. Model sentences
- I **had** my hair **cut** this morning.
- She **got** her laptop **fixed** for twenty euros.
- The manager **had** the intern **prepare** the slides.
- I finally **got** my brother **to help** me.

### 5. Common mistakes
- Do not use the base verb after have + object when the object is a thing: *I had my car repair* is wrong.
- Remember the to after get + person.
- Keep the tense on have or get, never on the participle: *I will have it delivered.*

### 6. Contrast box
| Pattern | Focus |
|---|---|
| have + thing + V3 | Neutral arrangement |
| get + thing + V3 | Informal, often effortful |
| have + person + V | Authority, instruction |
| get + person + to V | Persuasion |`,
    theory: `## Thể sai khiến với Have và Get

### 1. Quy tắc
Thể sai khiến cho biết chủ ngữ **nhờ, thuê hoặc sai** người khác làm thay vì tự làm. Tiếng Anh đánh dấu bằng have/get + V3, hoặc + người + động từ.

### 2. Công thức
- Nhờ dịch vụ: S + have + tân ngữ + V3
- Cách nói thân mật: S + get + tân ngữ + V3
- Sai bảo người: S + have + người + V nguyên mẫu
- Thuyết phục người: S + get + người + to + V
- Việc không may: S + had + tân ngữ + V3 (I had my wallet stolen.)

### 3. Khi nào dùng
- Nói về dịch vụ: cắt tóc, sửa chữa, giao hàng, in ấn, khám bệnh.
- Giao việc trong công ty.
- Kể lại chuyện rủi ro xảy đến với mình.

### 4. Câu mẫu
- I **had** my hair **cut** this morning.
- She **got** her laptop **fixed** for twenty euros.
- The manager **had** the intern **prepare** the slides.
- I finally **got** my brother **to help** me.

### 5. Lỗi thường gặp
- Với tân ngữ là vật, không dùng động từ nguyên mẫu: *I had my car repair* sai.
- Nhớ to sau get + người.
- Chia thì ở have/get, không chia ở phân từ: *I will have it delivered.*

### 6. Bảng đối chiếu
| Mẫu | Trọng tâm |
|---|---|
| have + vật + V3 | Sắp xếp trung tính |
| get + vật + V3 | Thân mật, có nỗ lực |
| have + người + V | Quyền hạn, chỉ thị |
| get + người + to V | Thuyết phục |`,
  },

  "passive-get-have": {
    theoryEn: `## Get-passive and Have/Get Something Done

### 1. Rule
The get-passive replaces be with get to describe a change that is sudden, unplanned or unwelcome. The causative have/get something done describes a service arranged by the subject.

### 2. Form
- Get-passive: S + get + V3 (He got promoted.)
- Causative: S + have/get + object + V3
- Negative and questions use do: Did he get fired? He didn't get paid.

### 3. When to use
- Get-passive in speech and informal writing, especially for accidents, punishment, promotion and relationships.
- Have/get something done whenever a professional does the job for you.
- Avoid the get-passive in academic essays; prefer be + V3 there.

### 4. Model sentences
- Two windows **got broken** during the storm.
- He **got promoted** after only a year.
- I **had** my documents **translated** last week.
- We should **get** the alarm **checked** before winter.

### 5. Common mistakes
- Do not use the get-passive with state verbs: *It gets known* is unnatural.
- Do not mix the two patterns: *I got repaired my bike* is wrong.
- In formal writing, replace got with was: *The proposal was rejected.*

### 6. Contrast box
| Sentence | Register / meaning |
|---|---|
| He **was fired**. | Neutral, formal |
| He **got fired**. | Informal, dramatic |
| He **had** his contract **cancelled**. | Someone else acted on his contract |`,
    theory: `## Bị động với Get và cấu trúc Have/Get Something Done

### 1. Quy tắc
Bị động với get thay be để tả một thay đổi đột ngột, ngoài dự tính hoặc không mong muốn. Cấu trúc have/get something done chỉ việc chủ ngữ nhờ người khác làm.

### 2. Công thức
- Bị động get: S + get + V3 (He got promoted.)
- Sai khiến: S + have/get + tân ngữ + V3
- Phủ định và nghi vấn dùng do: Did he get fired? He didn't get paid.

### 3. Khi nào dùng
- Bị động get trong văn nói, nhất là tai nạn, kỷ luật, thăng chức, chuyện tình cảm.
- Have/get something done khi thuê dịch vụ.
- Tránh bị động get trong bài luận học thuật, hãy dùng be + V3.

### 4. Câu mẫu
- Two windows **got broken** during the storm.
- He **got promoted** after only a year.
- I **had** my documents **translated** last week.
- We should **get** the alarm **checked** before winter.

### 5. Lỗi thường gặp
- Không dùng bị động get với động từ trạng thái.
- Không trộn hai mẫu: *I got repaired my bike* sai.
- Trong văn trang trọng, thay got bằng was.

### 6. Bảng đối chiếu
| Câu | Sắc thái |
|---|---|
| He **was fired**. | Trung tính, trang trọng |
| He **got fired**. | Thân mật, kịch tính |
| He **had** his contract **cancelled**. | Người khác tác động lên hợp đồng |`,
    proTipsEn: [
      "If you can add 'unexpectedly' to the sentence, the get-passive fits well.",
      "Service vocabulary pairs naturally with the causative: serviced, dry-cleaned, printed, delivered, installed.",
      "In IELTS Speaking Part 1 about daily life, one causative sentence sounds very natural.",
      "Convert for practice: A dentist checked my teeth → I had my teeth checked.",
    ],
    proTips: [
      "Nếu thêm được 'unexpectedly' vào câu thì bị động get rất hợp.",
      "Từ vựng dịch vụ đi rất tự nhiên với thể sai khiến: serviced, dry-cleaned, printed, delivered, installed.",
      "Trong IELTS Speaking Part 1 về đời sống, một câu sai khiến nghe rất tự nhiên.",
      "Luyện chuyển đổi: A dentist checked my teeth → I had my teeth checked.",
    ],
    vocabulary: [
      { word: "service (a car)", ipa: "/ˈsɜːvɪs/", meaning: "bảo dưỡng", meaningEn: "to check and repair a machine", example: "I had my car serviced in May.", exampleEn: "I had my car serviced in May.", partOfSpeech: "verb" },
      { word: "install", ipa: "/ɪnˈstɔːl/", meaning: "lắp đặt", meaningEn: "to put equipment in place", example: "We got a new router installed.", exampleEn: "We got a new router installed.", partOfSpeech: "verb" },
      { word: "promote", ipa: "/prəˈməʊt/", meaning: "thăng chức", meaningEn: "to give someone a higher position", example: "She got promoted last quarter.", exampleEn: "She got promoted last quarter.", partOfSpeech: "verb" },
      { word: "dry-clean", ipa: "/ˌdraɪ ˈkliːn/", meaning: "giặt khô", meaningEn: "to clean clothes with chemicals", example: "I need this suit dry-cleaned.", exampleEn: "I need this suit dry-cleaned.", partOfSpeech: "verb" },
    ],
  },

  "reported-commands": {
    theoryEn: `## Reported Commands, Requests and Advice

### 1. Rule
When we report an imperative we do not keep the original word order. Instead we choose a reporting verb that carries the speaker's intention and follow it with an object and a to-infinitive.

### 2. Form
- Command: S + told/ordered + object + (not) to + V
- Request: S + asked/begged + object + (not) to + V
- Advice: S + advised/warned/reminded + object + (not) to + V
- Suggestion: S + suggested + V-ing / that + S + (should) + V

### 3. When to use
- Reporting instructions from a teacher, boss, doctor or official notice.
- Summarising a conversation without quoting it word for word.
- Writing minutes, emails and academic summaries.

### 4. Model sentences
- "Sit down." → The teacher **told us to sit** down.
- "Don't run." → She **told him not to run**.
- "Please help me." → He **asked me to help** him.
- "Let's start early." → She **suggested starting** early.

### 5. Common mistakes
- Suggest never takes an object plus to-infinitive: *He suggested me to go* is wrong.
- Keep not before to, not after: *told him not to run*.
- Tell always needs a person; say does not: *She said to leave* / *She told me to leave*.

### 6. Contrast box
| Reporting verb | Pattern | Feeling |
|---|---|---|
| tell | tell sb to V | Neutral instruction |
| order | order sb to V | Strong authority |
| ask | ask sb to V | Polite request |
| advise | advise sb to V | Guidance |`,
    theory: `## Tường thuật câu mệnh lệnh, yêu cầu và lời khuyên

### 1. Quy tắc
Khi tường thuật câu mệnh lệnh, ta không giữ trật tự gốc mà chọn một động từ tường thuật thể hiện ý định người nói, theo sau là tân ngữ và động từ nguyên mẫu có to.

### 2. Công thức
- Mệnh lệnh: S + told/ordered + tân ngữ + (not) to + V
- Yêu cầu: S + asked/begged + tân ngữ + (not) to + V
- Lời khuyên: S + advised/warned/reminded + tân ngữ + (not) to + V
- Đề nghị: S + suggested + V-ing / that + S + (should) + V

### 3. Khi nào dùng
- Thuật lại chỉ dẫn của giáo viên, sếp, bác sĩ hoặc thông báo chính thức.
- Tóm tắt hội thoại mà không trích nguyên văn.
- Viết biên bản, email, tóm tắt học thuật.

### 4. Câu mẫu
- "Sit down." → The teacher **told us to sit** down.
- "Don't run." → She **told him not to run**.
- "Please help me." → He **asked me to help** him.
- "Let's start early." → She **suggested starting** early.

### 5. Lỗi thường gặp
- Suggest không đi với tân ngữ + to V: *He suggested me to go* sai.
- Đặt not trước to: *told him not to run*.
- Tell luôn cần người nghe, say thì không.

### 6. Bảng đối chiếu
| Động từ | Cấu trúc | Sắc thái |
|---|---|---|
| tell | tell sb to V | Chỉ dẫn trung tính |
| order | order sb to V | Mệnh lệnh mạnh |
| ask | ask sb to V | Yêu cầu lịch sự |
| advise | advise sb to V | Khuyên nhủ |`,
    proTipsEn: [
      "Pick the reporting verb first; the grammar pattern follows automatically.",
      "warn and remind add a nuance examiners like: He warned us not to swim there.",
      "For a written notice, prefer instruct or require: Visitors are required to sign in.",
      "Practise by turning classroom instructions into reported form every lesson.",
    ],
    proTips: [
      "Chọn động từ tường thuật trước, cấu trúc ngữ pháp sẽ theo sau.",
      "warn và remind tạo sắc thái mà giám khảo đánh giá cao: He warned us not to swim there.",
      "Với thông báo viết, ưu tiên instruct hoặc require: Visitors are required to sign in.",
      "Luyện bằng cách chuyển chỉ dẫn trong lớp sang câu tường thuật mỗi buổi học.",
    ],
    vocabulary: [
      { word: "urge", ipa: "/ɜːdʒ/", meaning: "thúc giục", meaningEn: "to strongly advise", example: "The doctor urged him to rest.", exampleEn: "The doctor urged him to rest.", partOfSpeech: "verb" },
      { word: "remind", ipa: "/rɪˈmaɪnd/", meaning: "nhắc nhở", meaningEn: "to help someone remember", example: "She reminded me to bring my ID.", exampleEn: "She reminded me to bring my ID.", partOfSpeech: "verb" },
      { word: "forbid", ipa: "/fəˈbɪd/", meaning: "cấm", meaningEn: "to order someone not to do something", example: "They forbade us to enter the lab.", exampleEn: "They forbade us to enter the lab.", partOfSpeech: "verb" },
      { word: "instruction", ipa: "/ɪnˈstrʌkʃn/", meaning: "chỉ dẫn", meaningEn: "an order about how to do something", example: "Follow the instructions carefully.", exampleEn: "Follow the instructions carefully.", partOfSpeech: "noun" },
    ],
  },

  "reported-questions": {
    theoryEn: `## Reported Questions

### 1. Rule
A reported question is no longer a question in form. It keeps statement word order, loses the question mark, and shifts tense back one step when the reporting verb is in the past.

### 2. Form
- Yes/No question: S + asked (+ object) + if/whether + S + V
- Wh- question: S + asked (+ object) + wh-word + S + V
- No do, does or did in the reported clause.

### 3. When to use
- Retelling an interview, a phone call or a survey.
- Writing academic summaries of research questions.
- Making a question sound softer and more polite in speech.

### 4. Model sentences
- "Do you like coffee?" → She asked **if I liked** coffee.
- "Where do you live?" → He asked **where I lived**.
- "Have you finished?" → They asked **whether I had finished**.
- "What time does the bank open?" → I asked **what time the bank opened**.

### 5. Common mistakes
- Do not keep question order: *He asked where did I live* is wrong.
- Only whether can go before or not and before a to-infinitive.
- If the fact is still true, the tense shift is optional: *She asked where I live*.

### 6. Contrast box
| Direct | Reported |
|---|---|
| "Are you ready?" | He asked if I was ready. |
| "Why did you leave?" | She asked why I had left. |
| "Who can help?" | They asked who could help. |`,
    theory: `## Câu hỏi tường thuật

### 1. Quy tắc
Câu hỏi tường thuật không còn hình thức câu hỏi. Nó giữ trật tự câu kể, bỏ dấu hỏi và lùi thì một bậc khi động từ tường thuật ở quá khứ.

### 2. Công thức
- Câu hỏi Yes/No: S + asked (+ tân ngữ) + if/whether + S + V
- Câu hỏi Wh-: S + asked (+ tân ngữ) + từ hỏi + S + V
- Không dùng do, does, did trong mệnh đề tường thuật.

### 3. Khi nào dùng
- Kể lại phỏng vấn, cuộc gọi, khảo sát.
- Viết tóm tắt câu hỏi nghiên cứu.
- Làm câu hỏi nghe nhẹ nhàng, lịch sự hơn.

### 4. Câu mẫu
- "Do you like coffee?" → She asked **if I liked** coffee.
- "Where do you live?" → He asked **where I lived**.
- "Have you finished?" → They asked **whether I had finished**.
- "What time does the bank open?" → I asked **what time the bank opened**.

### 5. Lỗi thường gặp
- Không giữ trật tự câu hỏi: *He asked where did I live* sai.
- Chỉ whether mới đứng trước or not và trước to + V.
- Nếu sự việc còn đúng, việc lùi thì là tùy chọn.

### 6. Bảng đối chiếu
| Trực tiếp | Tường thuật |
|---|---|
| "Are you ready?" | He asked if I was ready. |
| "Why did you leave?" | She asked why I had left. |
| "Who can help?" | They asked who could help. |`,
  },

  "reported-time-place-shift": {
    theoryEn: `## Time and Place Shifts in Reported Speech

### 1. Rule
When the moment of reporting is different from the moment of speaking, time and place words must move too. Tense back-shift alone is not enough for a natural report.

### 2. Form
| Direct | Reported |
|---|---|
| now | then / at that moment |
| today | that day |
| tonight | that night |
| tomorrow | the next day / the following day |
| yesterday | the day before / the previous day |
| next week | the following week |
| last week | the previous week |
| ago | before |
| here | there |
| this / these | that / those |

### 3. When to use
- Reporting later on a different day or in a different place.
- Formal writing: minutes, journalism, academic summaries.

### 4. Model sentences
- "I will call you tomorrow." → He said he would call me **the next day**.
- "I met her here two days ago." → She said she had met her **there two days before**.
- "I am busy tonight." → He said he was busy **that night**.

### 5. Common mistakes
- Do not shift when the situation has not changed: if you report on the same day, today stays today.
- Do not shift the tense of general truths: *He said that water boils at 100°C.*
- Modals must, might, could and should usually stay the same.

### 6. Contrast box
| Situation | Report |
|---|---|
| Same day, same place | She said she is coming here today. |
| Different day and place | She said she was coming there that day. |`,
    theory: `## Đổi từ chỉ thời gian và nơi chốn trong câu tường thuật

### 1. Quy tắc
Khi thời điểm tường thuật khác thời điểm nói, các từ chỉ thời gian và nơi chốn cũng phải đổi. Chỉ lùi thì thôi thì chưa đủ tự nhiên.

### 2. Bảng chuyển
| Trực tiếp | Tường thuật |
|---|---|
| now | then / at that moment |
| today | that day |
| tonight | that night |
| tomorrow | the next day / the following day |
| yesterday | the day before / the previous day |
| next week | the following week |
| last week | the previous week |
| ago | before |
| here | there |
| this / these | that / those |

### 3. Khi nào dùng
- Khi tường thuật vào ngày khác hoặc ở nơi khác.
- Văn bản trang trọng: biên bản, báo chí, tóm tắt học thuật.

### 4. Câu mẫu
- "I will call you tomorrow." → He said he would call me **the next day**.
- "I met her here two days ago." → She said she had met her **there two days before**.
- "I am busy tonight." → He said he was busy **that night**.

### 5. Lỗi thường gặp
- Không đổi khi hoàn cảnh chưa thay đổi: tường thuật ngay trong ngày thì today giữ nguyên.
- Không lùi thì với chân lý: *He said that water boils at 100°C.*
- Các modal must, might, could, should thường giữ nguyên.

### 6. Bảng đối chiếu
| Hoàn cảnh | Câu tường thuật |
|---|---|
| Cùng ngày, cùng nơi | She said she is coming here today. |
| Khác ngày, khác nơi | She said she was coming there that day. |`,
    proTipsEn: [
      "Ask 'where am I and what day is it now?' before deciding whether to shift.",
      "In news writing, the present tense is often kept for current facts: The minister says the plan is ready.",
      "this changing to that also applies to objects: 'I like this pen' → He said he liked that pen.",
      "Shift the time word and the tense together; changing only one sounds inconsistent.",
    ],
    proTips: [
      "Trước khi đổi, hãy tự hỏi: mình đang ở đâu và hôm nay là ngày nào?",
      "Trong văn báo chí, thì hiện tại thường được giữ cho sự việc còn giá trị: The minister says the plan is ready.",
      "this đổi thành that áp dụng cho cả đồ vật: 'I like this pen' → He said he liked that pen.",
      "Đổi từ chỉ thời gian và lùi thì phải đi cùng nhau, đổi một nửa sẽ thiếu nhất quán.",
    ],
    vocabulary: [
      { word: "the previous day", ipa: "/ðə ˈpriːviəs deɪ/", meaning: "ngày hôm trước", meaningEn: "the day before", example: "He said he had arrived the previous day.", exampleEn: "He said he had arrived the previous day.", partOfSpeech: "noun phrase" },
      { word: "the following week", ipa: "/ðə ˈfɒləʊɪŋ wiːk/", meaning: "tuần kế tiếp", meaningEn: "the week after that", example: "She promised to send it the following week.", exampleEn: "She promised to send it the following week.", partOfSpeech: "noun phrase" },
      { word: "at that moment", ipa: "/ət ðæt ˈməʊmənt/", meaning: "lúc đó", meaningEn: "then", example: "He was busy at that moment.", exampleEn: "He was busy at that moment.", partOfSpeech: "phrase" },
      { word: "back-shift", ipa: "/ˈbæk ʃɪft/", meaning: "lùi thì", meaningEn: "moving a tense one step into the past", example: "Back-shift is normal after a past reporting verb.", exampleEn: "Back-shift is normal after a past reporting verb.", partOfSpeech: "noun" },
    ],
  },
};
