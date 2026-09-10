/**
 * @file expansionV10.ts
 * @description Đợt 10 mở rộng - 5 bài ngữ pháp ứng dụng + 4 bộ từ vựng chủ đề mới.
 * Mutates the existing module arrays at load time (matches the .push() pattern used
 * by earlier expansions in this folder).
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { grammarModules } from "./grammarLessons";
import { vocabularyModules } from "./vocabularyLessons";
import type { VietnameseLesson } from "./types";

/* ════════════════════════════════════════════════════════════════════════════
 * GRAMMAR - 5 bài ngữ pháp ứng dụng (passive, conditional, connectives,
 * rhetorical questions, ellipsis).
 * ════════════════════════════════════════════════════════════════════════════ */
const grammarLessonsV10: VietnameseLesson[] = [
  {
    id: "vn-gram-v10-passive",
    title: "Câu bị động với 'được' và 'bị'",
    titleEn: "Passive Voice with 'được' and 'bị'",
    level: "intermediate",
    teacherInsight:
      "Tiếng Việt không có dạng bị động bằng cách biến đổi động từ như tiếng Anh. Thay vào đó, người Việt dùng 'được' cho việc tốt và 'bị' cho việc xấu. Chọn sai từ này khiến câu nghe rất lạ, ví dụ 'Tôi bị tặng quà' là sai hoàn toàn.",
    teacherInsightEn:
      "Vietnamese has no verb inflection for the passive. Instead it uses 'được' for favourable events and 'bị' for unfavourable ones. Picking the wrong marker sounds very odd: 'Tôi bị tặng quà' (I was afflicted with a gift) is simply wrong.",
    theory: `## Câu bị động trong tiếng Việt 🔁

Tiếng Anh đổi động từ (*is built*, *was broken*), còn tiếng Việt chỉ cần thêm một trong hai từ đứng trước động từ: **được** hoặc **bị**.

### 1. Công thức chung
> **Đối tượng + được / bị + (người thực hiện) + động từ**

- Ngôi nhà **được** xây năm 2020. (nhà là đối tượng, không cần nói ai xây)
- Tôi **được** thầy khen. (có người thực hiện: thầy)
- Xe tôi **bị** trộm lấy mất. (việc xấu, có người thực hiện: trộm)

### 2. Khác biệt cốt lõi: **được** vs **bị**
| Từ | Sắc thái | Ví dụ |
|---|---|---|
| được | tích cực, may mắn, có lợi | Cô ấy **được** tăng lương. |
| bị | tiêu cực, thiệt hại, ngoài ý muốn | Cô ấy **bị** trừ lương. |

Cùng một hành động nhưng đổi từ là đổi hẳn thái độ người nói:
- Tôi **được** chuyển sang phòng khác. (tôi thấy vui)
- Tôi **bị** chuyển sang phòng khác. (tôi thấy bất công)

### 3. 'được' còn nghĩa là "có thể / được phép"
- Tôi nói **được** tiếng Việt. = Tôi có khả năng nói.
- Ở đây **được** chụp ảnh không? = Có được phép không?

Vì vậy khi nghe 'được', hãy xem nó đứng ở đâu: **trước** động từ là bị động, **sau** động từ thường là khả năng hoặc kết quả.

### 4. Lỗi thường gặp của người học
1. Dùng 'bị' cho việc tốt: *Tôi bị thưởng* → đúng: Tôi **được** thưởng.
2. Thêm 'bởi' như tiếng Anh: *Bài được viết bởi tôi* nghe rất Tây; người Việt nói "Bài này tôi viết" hoặc "Bài này **do** tôi viết".
3. Lạm dụng bị động. Tiếng Việt thích câu chủ động: thay vì "Cửa được mở bởi anh ấy", người Việt nói "Anh ấy mở cửa".

### 5. Cấu trúc thay thế rất thông dụng: **do**
> **Đối tượng + do + người thực hiện + động từ**

- Bức tranh này **do** con gái tôi vẽ.
- Chương trình **do** nhà trường tổ chức.

'do' trung tính, dùng nhiều trong văn viết, báo chí và thông báo.`,
    theoryEn: `## The Vietnamese passive 🔁

English changes the verb (*is built*, *was broken*). Vietnamese only adds one word before the verb: **được** or **bị**.

### 1. Basic pattern
> **Object + được / bị + (agent) + verb**

- Ngôi nhà **được** xây năm 2020. (The house was built in 2020.)
- Tôi **được** thầy khen. (I was praised by the teacher.)
- Xe tôi **bị** trộm lấy mất. (My bike was stolen by a thief.)

### 2. The key contrast: **được** vs **bị**
| Word | Nuance | Example |
|---|---|---|
| được | positive, lucky, beneficial | Cô ấy **được** tăng lương. (She got a raise.) |
| bị | negative, harmful, unwanted | Cô ấy **bị** trừ lương. (Her pay was docked.) |

The same action changes meaning completely with the other marker:
- Tôi **được** chuyển sang phòng khác. (I'm happy about the move.)
- Tôi **bị** chuyển sang phòng khác. (I feel treated unfairly.)

### 3. 'được' also means "can / be allowed"
- Tôi nói **được** tiếng Việt. = I am able to speak Vietnamese.
- Ở đây **được** chụp ảnh không? = Is photography allowed here?

So check the position: **before** the verb it is passive; **after** the verb it usually marks ability or result.

### 4. Common learner mistakes
1. Using 'bị' for good news: *Tôi bị thưởng* → correct: Tôi **được** thưởng.
2. Copying English "by": *Bài được viết bởi tôi* sounds foreign. Vietnamese says "Bài này tôi viết" or "Bài này **do** tôi viết".
3. Overusing the passive. Vietnamese prefers active clauses: instead of "Cửa được mở bởi anh ấy", say "Anh ấy mở cửa".

### 5. A very common alternative: **do**
> **Object + do + agent + verb**

- Bức tranh này **do** con gái tôi vẽ. (This painting was done by my daughter.)
- Chương trình **do** nhà trường tổ chức. (The event is organised by the school.)

'do' is neutral and frequent in writing, news and announcements.`,
    vocabulary: [
      { word: "được", meaning: "dấu hiệu bị động tích cực", meaningEn: "positive passive marker", example: "Tôi được nhận học bổng.", exampleEn: "I was awarded a scholarship.", partOfSpeech: "particle" },
      { word: "bị", meaning: "dấu hiệu bị động tiêu cực", meaningEn: "negative passive marker", example: "Tôi bị mất ví.", exampleEn: "I lost my wallet.", partOfSpeech: "particle" },
      { word: "do", meaning: "bởi, do ai thực hiện", meaningEn: "by (agent), due to", example: "Bài hát do anh ấy sáng tác.", exampleEn: "The song was composed by him.", partOfSpeech: "preposition" },
      { word: "khen", meaning: "nói lời tốt về ai", meaningEn: "to praise", example: "Thầy khen bài của em.", exampleEn: "The teacher praised your work.", partOfSpeech: "verb" },
      { word: "phê bình", meaning: "chỉ ra lỗi, góp ý nghiêm khắc", meaningEn: "to criticise", example: "Em bị phê bình vì đi muộn.", exampleEn: "I was criticised for being late.", partOfSpeech: "verb" },
      { word: "tăng lương", meaning: "được trả nhiều tiền hơn", meaningEn: "to get a raise", example: "Chị ấy được tăng lương gấp đôi.", exampleEn: "She got double the raise.", partOfSpeech: "verb phrase" },
      { word: "trừ lương", meaning: "bị lấy bớt tiền lương", meaningEn: "to have pay docked", example: "Anh bị trừ lương vì nghỉ nhiều.", exampleEn: "He had his pay docked for absences.", partOfSpeech: "verb phrase" },
      { word: "tổ chức", meaning: "sắp xếp, thực hiện sự kiện", meaningEn: "to organise", example: "Lễ hội do thành phố tổ chức.", exampleEn: "The festival is organised by the city.", partOfSpeech: "verb" },
      { word: "xây dựng", meaning: "làm nên công trình", meaningEn: "to build, construct", example: "Cầu này được xây dựng năm 1998.", exampleEn: "This bridge was built in 1998.", partOfSpeech: "verb" },
      { word: "thiệt hại", meaning: "mất mát, tổn thất", meaningEn: "damage, loss", example: "Bão gây thiệt hại lớn.", exampleEn: "The storm caused heavy damage.", partOfSpeech: "noun" },
      { word: "sắc thái", meaning: "màu sắc ý nghĩa, thái độ", meaningEn: "nuance", example: "Hai từ khác nhau về sắc thái.", exampleEn: "The two words differ in nuance.", partOfSpeech: "noun" },
      { word: "chủ động", meaning: "câu có chủ ngữ thực hiện hành động", meaningEn: "active (voice)", example: "Tiếng Việt thích câu chủ động.", exampleEn: "Vietnamese prefers active clauses.", partOfSpeech: "adjective" },
    ],
    quiz: [
      { question: "Chọn câu đúng: 'Tôi ___ thưởng vì làm tốt.'", questionEn: "Choose the right marker: 'I ___ rewarded for good work.'", options: ["bị", "được", "do", "bởi"], answer: 1, explanation: "Được thưởng là việc tốt nên dùng 'được'.", explanationEn: "A reward is positive, so 'được' is required." },
      { question: "Câu nào nghe tự nhiên nhất?", questionEn: "Which sentence sounds most natural?", options: ["Bài này được viết bởi tôi.", "Bài này do tôi viết.", "Bài này bị tôi viết.", "Bài này được tôi bị viết."], answer: 1, explanation: "'do + người thực hiện' là cách nói tự nhiên của người Việt.", explanationEn: "'do + agent' is the natural Vietnamese construction." },
      { question: "'Tôi nói được tiếng Việt' nghĩa là gì?", questionEn: "What does 'Tôi nói được tiếng Việt' mean?", options: ["Tôi bị bắt nói tiếng Việt", "Tôi có thể nói tiếng Việt", "Tiếng Việt được tôi nói", "Tôi được phép im lặng"], answer: 1, explanation: "'được' đứng sau động từ chỉ khả năng, không phải bị động.", explanationEn: "'được' after the verb marks ability, not passive." },
      { question: "Chọn câu dùng 'bị' đúng.", questionEn: "Choose the correct use of 'bị'.", options: ["Em bị tặng hoa.", "Em bị khen trước lớp.", "Em bị mắng vì nói chuyện.", "Em bị nhận học bổng."], answer: 2, explanation: "Bị mắng là việc tiêu cực, phù hợp với 'bị'.", explanationEn: "Being scolded is negative, matching 'bị'." },
      { question: "Từ nào trung tính nhất khi nêu người thực hiện trong văn viết?", questionEn: "Which word is most neutral for the agent in writing?", options: ["bị", "được", "do", "cho"], answer: 2, explanation: "'do' trung tính, hay gặp trong thông báo và báo chí.", explanationEn: "'do' is neutral and common in notices and news." },
    ],
  },
  {
    id: "vn-gram-v10-conditional",
    title: "Câu điều kiện: nếu, giá như, hễ, miễn là",
    titleEn: "Conditionals: nếu, giá như, hễ, miễn là",
    level: "intermediate",
    teacherInsight:
      "Tiếng Việt không chia thời động từ nên toàn bộ 'loại 1, 2, 3' của tiếng Anh được thể hiện bằng từ nối và trạng từ thời gian. Nắm bốn cặp từ trong bài là bạn diễn đạt được gần như mọi điều kiện.",
    teacherInsightEn:
      "Vietnamese has no verb tenses, so all English conditional 'types' are conveyed by connectives and time words. Master the four pairs in this lesson and you can express nearly any condition.",
    theory: `## Câu điều kiện tiếng Việt 🌦️

### 1. **nếu ... thì ...** - điều kiện thông thường
> Nếu + điều kiện + thì + kết quả

- **Nếu** trời mưa **thì** tôi ở nhà.
- **Nếu** bạn rảnh **thì** gọi tôi nhé.

Có thể lược bỏ 'nếu' hoặc 'thì', nhưng giữ cả hai là chuẩn nhất trong văn viết. Biến thể lịch sự hơn: **nếu như**, **trong trường hợp**.

### 2. **giá như / giá mà** - điều không thật, tiếc nuối
> Giá như + sự việc trái thực tế (+ thì đã ...)

- **Giá như** tôi học tiếng Việt sớm hơn **thì** giờ đã nói giỏi.
- **Giá mà** hôm qua tôi không đi muộn.

Đây chính là "câu điều kiện loại 2 và 3" trong tiếng Anh. Dấu hiệu nhận biết: thường có **đã**, **rồi**, hoặc trạng từ chỉ quá khứ.

### 3. **hễ ... là ...** - điều kiện lặp lại, quy luật
> Hễ + sự việc + là + kết quả tất yếu

- **Hễ** trời trở lạnh **là** mẹ tôi nấu lẩu.
- **Hễ** nói tới bóng đá **là** anh ấy quên hết mọi thứ.

Sắc thái: "cứ mỗi lần ... thì luôn ...". Từ đồng nghĩa gần: **cứ ... là ...**.

### 4. **miễn là / chỉ cần** - điều kiện tối thiểu, đủ rồi
- Tôi đi đâu cũng được, **miễn là** có bạn.
- **Chỉ cần** bạn cố gắng **là** sẽ tiến bộ.

### 5. **dù / cho dù ... vẫn ...** - điều kiện nhượng bộ
- **Dù** mưa to, tôi **vẫn** đi học.
- **Cho dù** khó **đến đâu** tôi **cũng** không bỏ.

### 6. Bảng tổng hợp nhanh
| Cấu trúc | Sắc thái | Tiếng Anh gần nhất |
|---|---|---|
| nếu ... thì | điều kiện thật | if ... then |
| giá như | tiếc nuối, không thật | if only / I wish |
| hễ ... là | quy luật lặp lại | whenever |
| miễn là | điều kiện đủ | as long as |
| dù ... vẫn | nhượng bộ | even if ... still |`,
    theoryEn: `## Vietnamese conditionals 🌦️

### 1. **nếu ... thì ...** - ordinary condition
> nếu + condition + thì + result

- **Nếu** trời mưa **thì** tôi ở nhà. (If it rains, I stay home.)
- **Nếu** bạn rảnh **thì** gọi tôi nhé. (If you're free, call me.)

You may drop 'nếu' or 'thì', but keeping both is safest in writing. More formal variants: **nếu như**, **trong trường hợp** (in case).

### 2. **giá như / giá mà** - unreal, regretful
> giá như + counterfactual (+ thì đã ...)

- **Giá như** tôi học tiếng Việt sớm hơn **thì** giờ đã nói giỏi. (If only I had started earlier, I'd speak well now.)
- **Giá mà** hôm qua tôi không đi muộn. (If only I hadn't been late yesterday.)

This covers English conditional types 2 and 3. Look for **đã**, **rồi** or past time words.

### 3. **hễ ... là ...** - recurring condition, rule
> hễ + event + là + inevitable result

- **Hễ** trời trở lạnh **là** mẹ tôi nấu lẩu. (Whenever it turns cold, mom cooks hotpot.)
- **Hễ** nói tới bóng đá **là** anh ấy quên hết mọi thứ. (Mention football and he forgets everything.)

Nuance: "every time X, always Y". Close synonym: **cứ ... là ...**.

### 4. **miễn là / chỉ cần** - sufficient condition
- Tôi đi đâu cũng được, **miễn là** có bạn. (Anywhere is fine as long as you're there.)
- **Chỉ cần** bạn cố gắng **là** sẽ tiến bộ. (Just try and you'll improve.)

### 5. **dù / cho dù ... vẫn ...** - concessive
- **Dù** mưa to, tôi **vẫn** đi học. (Even in heavy rain I still go to class.)
- **Cho dù** khó **đến đâu** tôi **cũng** không bỏ. (No matter how hard, I won't quit.)

### 6. Quick reference
| Structure | Nuance | Closest English |
|---|---|---|
| nếu ... thì | real condition | if ... then |
| giá như | regret, unreal | if only / I wish |
| hễ ... là | recurring rule | whenever |
| miễn là | sufficient condition | as long as |
| dù ... vẫn | concession | even if ... still |`,
    vocabulary: [
      { word: "nếu", meaning: "từ mở đầu điều kiện", meaningEn: "if", example: "Nếu rảnh, bạn ghé nhà tôi.", exampleEn: "If you're free, drop by my place.", partOfSpeech: "conjunction" },
      { word: "thì", meaning: "từ nối dẫn tới kết quả", meaningEn: "then", example: "Nếu mưa thì hoãn nhé.", exampleEn: "If it rains, let's postpone.", partOfSpeech: "conjunction" },
      { word: "giá như", meaning: "tiếc rằng đã không...", meaningEn: "if only", example: "Giá như tôi biết trước.", exampleEn: "If only I had known.", partOfSpeech: "phrase" },
      { word: "hễ", meaning: "cứ mỗi khi", meaningEn: "whenever", example: "Hễ rảnh là anh đọc sách.", exampleEn: "Whenever he's free he reads.", partOfSpeech: "conjunction" },
      { word: "miễn là", meaning: "chỉ cần điều kiện này là đủ", meaningEn: "as long as", example: "Ăn gì cũng được, miễn là nóng.", exampleEn: "Anything is fine as long as it's hot.", partOfSpeech: "phrase" },
      { word: "chỉ cần", meaning: "cần bấy nhiêu là đủ", meaningEn: "just need to", example: "Chỉ cần luyện mỗi ngày 15 phút.", exampleEn: "You just need 15 minutes a day.", partOfSpeech: "phrase" },
      { word: "cho dù", meaning: "dù rằng, mặc dù", meaningEn: "even if", example: "Cho dù xa, tôi vẫn về.", exampleEn: "Even if it's far, I'll come home.", partOfSpeech: "conjunction" },
      { word: "vẫn", meaning: "không thay đổi dù có trở ngại", meaningEn: "still", example: "Trời mưa, tôi vẫn chạy bộ.", exampleEn: "It's raining but I still jog.", partOfSpeech: "adverb" },
      { word: "trở lạnh", meaning: "thời tiết chuyển sang lạnh", meaningEn: "to turn cold", example: "Hà Nội mới trở lạnh.", exampleEn: "Hanoi has just turned cold.", partOfSpeech: "verb phrase" },
      { word: "tiếc", meaning: "cảm thấy buồn vì điều đã qua", meaningEn: "to regret", example: "Tôi tiếc vì không đi.", exampleEn: "I regret not going.", partOfSpeech: "verb" },
      { word: "tất yếu", meaning: "chắc chắn xảy ra", meaningEn: "inevitable", example: "Đó là kết quả tất yếu.", exampleEn: "That is an inevitable result.", partOfSpeech: "adjective" },
      { word: "nhượng bộ", meaning: "chấp nhận một phần điều kiện", meaningEn: "concession", example: "Câu nhượng bộ dùng 'dù'.", exampleEn: "Concessive clauses use 'dù'.", partOfSpeech: "noun" },
    ],
    quiz: [
      { question: "Chọn từ đúng: '___ tôi giàu thì tôi đã mua nhà ở Đà Lạt.'", questionEn: "Choose: '___ I were rich, I would have bought a house in Da Lat.'", options: ["Hễ", "Giá như", "Miễn là", "Dù"], answer: 1, explanation: "Điều không thật, có tiếc nuối nên dùng 'giá như'.", explanationEn: "Unreal and regretful, so 'giá như' fits." },
      { question: "'Hễ trời mưa là đường ngập' diễn tả điều gì?", questionEn: "What does 'Hễ trời mưa là đường ngập' express?", options: ["Một lần duy nhất", "Quy luật lặp lại", "Điều không thật", "Sự nhượng bộ"], answer: 1, explanation: "'hễ ... là' chỉ việc luôn xảy ra mỗi lần có điều kiện.", explanationEn: "'hễ ... là' marks something that happens every time." },
      { question: "Câu nào dùng 'miễn là' đúng?", questionEn: "Which sentence uses 'miễn là' correctly?", options: ["Miễn là hôm qua tôi đến sớm.", "Tôi làm ca nào cũng được, miễn là được nghỉ chủ nhật.", "Miễn là trời mưa thì đã hoãn.", "Miễn là tôi vẫn đi học."], answer: 1, explanation: "'miễn là' nêu điều kiện tối thiểu để đồng ý.", explanationEn: "'miễn là' states the minimum condition for agreement." },
      { question: "Cặp từ nào diễn tả nhượng bộ?", questionEn: "Which pair expresses concession?", options: ["nếu ... thì", "dù ... vẫn", "hễ ... là", "chỉ cần ... là"], answer: 1, explanation: "'dù ... vẫn' nghĩa là dù có trở ngại, kết quả không đổi.", explanationEn: "'dù ... vẫn' means the result holds despite obstacles." },
      { question: "Vì sao tiếng Việt không cần chia thời trong câu điều kiện?", questionEn: "Why does Vietnamese need no tense in conditionals?", options: ["Vì không có động từ", "Vì dùng từ nối và trạng từ thời gian", "Vì luôn nói về hiện tại", "Vì bỏ chủ ngữ"], answer: 1, explanation: "Thời gian và tính thật/không thật thể hiện qua từ nối, 'đã', 'sẽ', 'giá như'.", explanationEn: "Time and reality are shown by connectives and words like 'đã', 'sẽ', 'giá như'." },
    ],
  },
  {
    id: "vn-gram-v10-connectives",
    title: "Liên từ nối ý: tuy nhiên, vì vậy, ngoài ra, thậm chí",
    titleEn: "Linking Ideas: tuy nhiên, vì vậy, ngoài ra, thậm chí",
    level: "intermediate",
    teacherInsight:
      "Điểm khác biệt lớn nhất giữa người học trình độ trung cấp và cao cấp không phải là từ vựng khó, mà là khả năng nối câu. Bài này cho bạn 'bộ keo dán' để bài nói và bài viết trôi chảy.",
    teacherInsightEn:
      "The biggest gap between intermediate and advanced learners is not rare vocabulary but cohesion. This lesson gives you the 'glue' that makes speech and writing flow.",
    theory: `## Liên từ nối ý 🔗

### 1. Nhóm đối lập
| Từ | Mức độ | Ví dụ |
|---|---|---|
| nhưng | nói hằng ngày | Trời mưa **nhưng** tôi vẫn đi. |
| tuy nhiên | văn viết, lịch sự | Giá tốt. **Tuy nhiên**, chất lượng chưa ổn. |
| trái lại / ngược lại | nêu điều đối nghịch | Anh ấy không giận; **ngược lại**, anh còn cảm ơn. |
| trong khi đó | so sánh hai bên | Miền Bắc có bốn mùa, **trong khi đó** miền Nam chỉ hai mùa. |

Lưu ý: **tuy ... nhưng ...** đi thành cặp trong một câu, còn **tuy nhiên** đứng đầu câu mới.

### 2. Nhóm nguyên nhân - kết quả
- **vì / bởi vì** + nguyên nhân: Tôi nghỉ **vì** bị cảm.
- **vì vậy / do đó / cho nên** + kết quả: Tôi bị cảm, **vì vậy** tôi nghỉ.
- **nhờ** + nguyên nhân tốt: **Nhờ** thầy giúp, em thi đậu.
- **tại** + nguyên nhân xấu (khẩu ngữ): **Tại** mưa nên hỏng buổi picnic.

### 3. Nhóm bổ sung
- **ngoài ra** (thêm ý mới): Món này ngon. **Ngoài ra**, giá rất hợp lý.
- **hơn nữa / thêm vào đó** (nhấn mạnh mạnh hơn): Phòng rộng, **hơn nữa** lại gần trung tâm.
- **không chỉ ... mà còn ...**: Cô ấy **không chỉ** hát hay **mà còn** đàn giỏi.

### 4. Nhóm nhấn mạnh và ví dụ
- **thậm chí**: Em ấy học rất chăm, **thậm chí** thức đến 2 giờ sáng.
- **chẳng hạn / ví dụ như**: Nhiều món cần nước mắm, **chẳng hạn** bún chả.
- **nói cách khác**: dùng để diễn đạt lại ý vừa nói.

### 5. Nhóm trình tự và kết luận
- Mở đầu: **trước hết**, **đầu tiên**
- Tiếp nối: **sau đó**, **tiếp theo**
- Kết luận: **tóm lại**, **nhìn chung**, **cuối cùng**

### 6. Áp dụng vào một đoạn hoàn chỉnh
> **Trước hết**, học tiếng Việt cần luyện tai. **Vì vậy**, mỗi ngày tôi nghe podcast 20 phút. **Ngoài ra**, tôi ghi lại từ mới vào sổ. **Tuy nhiên**, chỉ nghe thôi chưa đủ; **thậm chí** có người nghe hai năm vẫn không nói được. **Tóm lại**, phải kết hợp nghe và nói mới tiến bộ.

Chỉ với sáu từ nối, đoạn văn trên đã có mạch rõ ràng như người bản ngữ viết.`,
    theoryEn: `## Connectives that link ideas 🔗

### 1. Contrast
| Word | Register | Example |
|---|---|---|
| nhưng | everyday | Trời mưa **nhưng** tôi vẫn đi. (It rained but I still went.) |
| tuy nhiên | written, polite | Giá tốt. **Tuy nhiên**, chất lượng chưa ổn. (Good price. However, quality is weak.) |
| ngược lại | opposite fact | Anh ấy không giận; **ngược lại**, anh còn cảm ơn. (He wasn't angry; on the contrary, he thanked me.) |
| trong khi đó | comparing two sides | Miền Bắc có bốn mùa, **trong khi đó** miền Nam chỉ hai mùa. (The North has four seasons, whereas the South has two.) |

Note: **tuy ... nhưng ...** works as a pair inside one sentence; **tuy nhiên** starts a new sentence.

### 2. Cause and result
- **vì / bởi vì** + cause: Tôi nghỉ **vì** bị cảm. (I stayed off because I had a cold.)
- **vì vậy / do đó / cho nên** + result: Tôi bị cảm, **vì vậy** tôi nghỉ.
- **nhờ** + favourable cause: **Nhờ** thầy giúp, em thi đậu. (Thanks to my teacher, I passed.)
- **tại** + unfavourable cause (colloquial): **Tại** mưa nên hỏng buổi picnic.

### 3. Addition
- **ngoài ra** (a further point): Món này ngon. **Ngoài ra**, giá rất hợp lý.
- **hơn nữa / thêm vào đó** (stronger emphasis): Phòng rộng, **hơn nữa** lại gần trung tâm.
- **không chỉ ... mà còn ...** (not only ... but also): Cô ấy **không chỉ** hát hay **mà còn** đàn giỏi.

### 4. Emphasis and examples
- **thậm chí** (even): Em ấy học rất chăm, **thậm chí** thức đến 2 giờ sáng.
- **chẳng hạn / ví dụ như** (for instance): Nhiều món cần nước mắm, **chẳng hạn** bún chả.
- **nói cách khác** (in other words): restates the previous idea.

### 5. Sequence and conclusion
- Opening: **trước hết**, **đầu tiên**
- Continuing: **sau đó**, **tiếp theo**
- Concluding: **tóm lại**, **nhìn chung**, **cuối cùng**

### 6. A full paragraph in action
> **Trước hết** (first), learning Vietnamese needs ear training. **Vì vậy** (therefore) I listen to a podcast 20 minutes daily. **Ngoài ra** (besides), I note new words. **Tuy nhiên** (however), listening alone is not enough; **thậm chí** (even) some people listen for two years and still cannot speak. **Tóm lại** (in short), you must combine listening and speaking to improve.

Six connectives already give the paragraph a native-like flow.`,
    vocabulary: [
      { word: "tuy nhiên", meaning: "nhưng (văn viết, lịch sự)", meaningEn: "however", example: "Tuy nhiên, tôi không đồng ý.", exampleEn: "However, I disagree.", partOfSpeech: "conjunction" },
      { word: "vì vậy", meaning: "do đó, cho nên", meaningEn: "therefore", example: "Trời mưa, vì vậy chúng tôi ở nhà.", exampleEn: "It rained, therefore we stayed home.", partOfSpeech: "conjunction" },
      { word: "ngoài ra", meaning: "thêm vào đó", meaningEn: "besides, in addition", example: "Ngoài ra, phòng còn có ban công.", exampleEn: "In addition, the room has a balcony.", partOfSpeech: "conjunction" },
      { word: "hơn nữa", meaning: "nhấn mạnh ý bổ sung", meaningEn: "moreover", example: "Hơn nữa, giá lại rẻ.", exampleEn: "Moreover, it is cheap.", partOfSpeech: "conjunction" },
      { word: "thậm chí", meaning: "đến mức, ngay cả", meaningEn: "even", example: "Anh ấy thậm chí không chào tôi.", exampleEn: "He didn't even greet me.", partOfSpeech: "adverb" },
      { word: "ngược lại", meaning: "trái lại", meaningEn: "on the contrary", example: "Ngược lại, tôi thấy vui.", exampleEn: "On the contrary, I feel happy.", partOfSpeech: "adverb" },
      { word: "trong khi đó", meaning: "so sánh hai sự việc cùng lúc", meaningEn: "whereas, meanwhile", example: "Trong khi đó, miền Nam vẫn nắng.", exampleEn: "Meanwhile, the South is still sunny.", partOfSpeech: "phrase" },
      { word: "nhờ", meaning: "do nguyên nhân tốt", meaningEn: "thanks to", example: "Nhờ bạn nhắc, tôi mới nhớ.", exampleEn: "Thanks to your reminder, I remembered.", partOfSpeech: "preposition" },
      { word: "chẳng hạn", meaning: "ví dụ như", meaningEn: "for instance", example: "Chẳng hạn phở, bún, mì.", exampleEn: "For instance pho, bun, noodles.", partOfSpeech: "phrase" },
      { word: "tóm lại", meaning: "nói gọn, kết luận", meaningEn: "in short", example: "Tóm lại, cần luyện mỗi ngày.", exampleEn: "In short, practise daily.", partOfSpeech: "phrase" },
      { word: "nói cách khác", meaning: "diễn đạt lại ý", meaningEn: "in other words", example: "Nói cách khác, bạn nên nghỉ.", exampleEn: "In other words, you should rest.", partOfSpeech: "phrase" },
      { word: "mạch văn", meaning: "sự liền ý trong bài", meaningEn: "cohesion, flow", example: "Từ nối giúp mạch văn rõ hơn.", exampleEn: "Connectives improve cohesion.", partOfSpeech: "noun" },
    ],
    quiz: [
      { question: "Từ nào lịch sự nhất để thay 'nhưng' trong email công việc?", questionEn: "Which is most formal to replace 'nhưng' in a work email?", options: ["nhưng mà", "tuy nhiên", "thế mà", "vậy mà"], answer: 1, explanation: "'tuy nhiên' phù hợp văn viết và ngữ cảnh trang trọng.", explanationEn: "'tuy nhiên' fits written and formal contexts." },
      { question: "Chọn câu đúng với 'vì vậy'.", questionEn: "Choose the correct use of 'vì vậy'.", options: ["Vì vậy trời mưa nên tôi nghỉ.", "Tôi bị cảm, vì vậy tôi nghỉ học.", "Tôi nghỉ học vì vậy bị cảm.", "Vì vậy tôi bị cảm vì nghỉ học."], answer: 1, explanation: "'vì vậy' đứng trước kết quả, sau nguyên nhân.", explanationEn: "'vì vậy' introduces the result after the cause." },
      { question: "'Không chỉ ... mà còn ...' dùng để làm gì?", questionEn: "What is 'không chỉ ... mà còn ...' used for?", options: ["Nêu đối lập", "Bổ sung và nhấn mạnh", "Kết luận", "Nêu điều kiện"], answer: 1, explanation: "Cấu trúc này thêm ý thứ hai và nhấn mạnh nó.", explanationEn: "It adds a second point and emphasises it." },
      { question: "Từ nào dùng để nêu ví dụ?", questionEn: "Which word introduces an example?", options: ["chẳng hạn", "tuy nhiên", "vì vậy", "ngược lại"], answer: 0, explanation: "'chẳng hạn' = ví dụ như.", explanationEn: "'chẳng hạn' means for instance." },
      { question: "Câu 'Anh ấy thậm chí quên tên vợ' nhấn mạnh điều gì?", questionEn: "What does 'Anh ấy thậm chí quên tên vợ' emphasise?", options: ["Mức độ bất ngờ, cực đoan", "Nguyên nhân", "Điều kiện", "Sự so sánh"], answer: 0, explanation: "'thậm chí' nhấn mạnh mức độ đáng ngạc nhiên.", explanationEn: "'thậm chí' stresses a surprising extreme." },
    ],
  },
  {
    id: "vn-gram-v10-rhetorical",
    title: "Câu hỏi tu từ và tiểu từ cuối câu",
    titleEn: "Rhetorical Questions and Final Particles",
    level: "advanced",
    teacherInsight:
      "Người Việt hỏi rất nhiều nhưng không phải lúc nào cũng cần câu trả lời. Hiểu câu hỏi tu từ và các tiểu từ 'à, ư, nhỉ, nhé, chứ, cơ' giúp bạn nghe ra thái độ thật của người nói.",
    teacherInsightEn:
      "Vietnamese speakers ask many questions that are not requests for information. Understanding rhetorical questions and the particles 'à, ư, nhỉ, nhé, chứ, cơ' lets you hear the speaker's real attitude.",
    theory: `## Câu hỏi tu từ và tiểu từ cuối câu ❓

### 1. Câu hỏi tu từ là gì?
Là câu có hình thức hỏi nhưng mục đích là **khẳng định, phủ định, phàn nàn hoặc thuyết phục**, không chờ trả lời.

- Ai mà chẳng muốn hạnh phúc? = Ai cũng muốn hạnh phúc.
- Làm sao tôi biết được? = Tôi không thể biết.
- Chẳng lẽ mình bỏ cuộc sao? = Không nên bỏ cuộc.

### 2. Các khuôn mẫu thường gặp
| Khuôn | Ý thật | Ví dụ |
|---|---|---|
| Ai mà chẳng ...? | mọi người đều ... | Ai mà chẳng thích được khen? |
| Làm sao ... được? | không thể | Làm sao đi kịp được? |
| Chẳng lẽ ... sao? | không nên, khó tin | Chẳng lẽ anh quên rồi sao? |
| Sao lại ...? | phản đối nhẹ | Sao lại nói thế? |
| ... có gì đâu? | không đáng kể | Việc này có gì đâu! |

### 3. Tiểu từ cuối câu - "gia vị" của tiếng Việt
- **à**: xác nhận điều mình vừa đoán → Anh là giáo viên **à**?
- **ư**: ngạc nhiên, hơi trang trọng hoặc văn chương → Thật **ư**?
- **hả**: thân mật, có thể hơi suồng sã → Đi luôn **hả**?
- **nhỉ**: rủ người nghe đồng ý → Hôm nay đẹp trời **nhỉ**?
- **nhé**: đề nghị nhẹ nhàng, hẹn → Mai gặp **nhé**!
- **chứ**: khẳng định mạnh → Tôi đi **chứ**! / Ngon **chứ**?
- **cơ**: nhấn mạnh mong muốn, hơi nũng nịu → Em muốn cái kia **cơ**!
- **thôi**: giới hạn, chỉ vậy → Một ly **thôi**.
- **mà**: nhắc lại điều đối phương nên biết → Tôi đã nói rồi **mà**.

### 4. Cùng một câu, đổi tiểu từ là đổi thái độ
- Anh không đi. (trung tính)
- Anh không đi **à**? (tôi vừa nhận ra)
- Anh không đi **hả**? (thân mật, có thể hơi ngạc nhiên)
- Anh không đi **chứ**? (tôi tin là anh không đi)
- Anh không đi **sao**? (tôi thấy tiếc, hơi trách)

### 5. Lời khuyên khi dùng
1. Với người lớn tuổi hoặc trong công việc, ưu tiên **ạ, nhé, chứ**; tránh **hả**.
2. Không dùng quá nhiều tiểu từ trong một câu; một từ là đủ.
3. Câu hỏi tu từ dùng khéo thì rất tự nhiên, nhưng dùng với người lạ có thể nghe như trách móc.`,
    theoryEn: `## Rhetorical questions and final particles ❓

### 1. What is a rhetorical question?
A question in form, but its purpose is to **assert, deny, complain or persuade** - no answer expected.

- Ai mà chẳng muốn hạnh phúc? (Who doesn't want happiness?) = Everyone does.
- Làm sao tôi biết được? (How could I know?) = I cannot know.
- Chẳng lẽ mình bỏ cuộc sao? (Surely we won't quit?) = We shouldn't quit.

### 2. Common templates
| Template | Real meaning | Example |
|---|---|---|
| Ai mà chẳng ...? | everyone does | Ai mà chẳng thích được khen? |
| Làm sao ... được? | impossible | Làm sao đi kịp được? |
| Chẳng lẽ ... sao? | shouldn't / hard to believe | Chẳng lẽ anh quên rồi sao? |
| Sao lại ...? | mild objection | Sao lại nói thế? |
| ... có gì đâu? | it's nothing | Việc này có gì đâu! |

### 3. Final particles - the seasoning of Vietnamese
- **à**: confirming a guess → Anh là giáo viên **à**? (So you're a teacher?)
- **ư**: surprise, literary or formal → Thật **ư**? (Really?)
- **hả**: casual, can sound blunt → Đi luôn **hả**? (Leaving right now?)
- **nhỉ**: inviting agreement → Hôm nay đẹp trời **nhỉ**? (Lovely weather, isn't it?)
- **nhé**: soft suggestion or appointment → Mai gặp **nhé**! (See you tomorrow!)
- **chứ**: strong affirmation → Tôi đi **chứ**! (Of course I'm going!)
- **cơ**: emphasising a wish, slightly pouty → Em muốn cái kia **cơ**! (I want that one!)
- **thôi**: limiting → Một ly **thôi**. (Just one glass.)
- **mà**: reminding → Tôi đã nói rồi **mà**. (I already told you.)

### 4. One sentence, different particles, different attitude
- Anh không đi. (neutral: You're not going.)
- Anh không đi **à**? (Oh, you're not going?)
- Anh không đi **hả**? (casual surprise)
- Anh không đi **chứ**? (I assume you're not going, right?)
- Anh không đi **sao**? (regret or mild reproach)

### 5. Practical advice
1. With elders or at work prefer **ạ, nhé, chứ**; avoid **hả**.
2. One particle per sentence is enough.
3. Rhetorical questions sound native when used well, but with strangers they can come across as reproachful.`,
    vocabulary: [
      { word: "câu hỏi tu từ", meaning: "câu hỏi không cần trả lời", meaningEn: "rhetorical question", example: "Đó là câu hỏi tu từ.", exampleEn: "That is a rhetorical question.", partOfSpeech: "noun" },
      { word: "tiểu từ", meaning: "từ nhỏ cuối câu chỉ thái độ", meaningEn: "final particle", example: "Tiểu từ 'nhé' rất thân thiện.", exampleEn: "The particle 'nhé' is friendly.", partOfSpeech: "noun" },
      { word: "nhỉ", meaning: "rủ người nghe đồng ý", meaningEn: "isn't it?", example: "Trời mát nhỉ?", exampleEn: "It's cool, isn't it?", partOfSpeech: "particle" },
      { word: "nhé", meaning: "đề nghị nhẹ nhàng", meaningEn: "okay? / shall we", example: "Đi ăn nhé!", exampleEn: "Let's go eat, okay?", partOfSpeech: "particle" },
      { word: "chứ", meaning: "khẳng định mạnh", meaningEn: "of course, right?", example: "Ngon chứ?", exampleEn: "Tasty, right?", partOfSpeech: "particle" },
      { word: "hả", meaning: "hỏi thân mật", meaningEn: "huh? (casual)", example: "Về rồi hả?", exampleEn: "You're back, huh?", partOfSpeech: "particle" },
      { word: "cơ", meaning: "nhấn mạnh mong muốn", meaningEn: "emphatic wish particle", example: "Em muốn màu đỏ cơ.", exampleEn: "I want the red one!", partOfSpeech: "particle" },
      { word: "chẳng lẽ", meaning: "lẽ nào, khó tin là", meaningEn: "surely not", example: "Chẳng lẽ quên rồi?", exampleEn: "Surely you didn't forget?", partOfSpeech: "phrase" },
      { word: "phàn nàn", meaning: "nói ra điều không hài lòng", meaningEn: "to complain", example: "Anh ấy hay phàn nàn.", exampleEn: "He complains often.", partOfSpeech: "verb" },
      { word: "trách móc", meaning: "nói lời buộc lỗi", meaningEn: "to reproach", example: "Câu đó nghe như trách móc.", exampleEn: "That sounds reproachful.", partOfSpeech: "verb" },
      { word: "suồng sã", meaning: "quá thân mật, thiếu lịch sự", meaningEn: "overly familiar", example: "Nói vậy hơi suồng sã.", exampleEn: "That sounds too familiar.", partOfSpeech: "adjective" },
      { word: "thái độ", meaning: "cách nghĩ, cách tỏ ra", meaningEn: "attitude", example: "Tiểu từ thể hiện thái độ.", exampleEn: "Particles reveal attitude.", partOfSpeech: "noun" },
    ],
    quiz: [
      { question: "'Ai mà chẳng muốn nghỉ ngơi?' thực chất nghĩa là gì?", questionEn: "What does 'Ai mà chẳng muốn nghỉ ngơi?' actually mean?", options: ["Không ai muốn nghỉ", "Mọi người đều muốn nghỉ", "Tôi hỏi ai muốn nghỉ", "Tôi không biết ai muốn nghỉ"], answer: 1, explanation: "Câu hỏi tu từ dạng 'ai mà chẳng' mang nghĩa khẳng định toàn bộ.", explanationEn: "'ai mà chẳng' asserts that everyone does." },
      { question: "Tiểu từ nào phù hợp khi rủ đồng nghiệp đi ăn?", questionEn: "Which particle suits inviting a colleague to lunch?", options: ["hả", "nhé", "cơ", "ư"], answer: 1, explanation: "'nhé' nhẹ nhàng, thân thiện và lịch sự.", explanationEn: "'nhé' is gentle, friendly and polite." },
      { question: "'Anh không đi chứ?' thể hiện điều gì?", questionEn: "What does 'Anh không đi chứ?' express?", options: ["Người nói tin rằng anh không đi", "Người nói không biết gì", "Người nói tức giận", "Người nói ra lệnh"], answer: 0, explanation: "'chứ' xác nhận điều người nói đã tin là đúng.", explanationEn: "'chứ' confirms what the speaker already believes." },
      { question: "Tiểu từ nào nên tránh khi nói với người lớn tuổi?", questionEn: "Which particle should be avoided with elders?", options: ["ạ", "nhé", "hả", "chứ"], answer: 2, explanation: "'hả' quá thân mật, dễ bị coi là thiếu lễ phép.", explanationEn: "'hả' is too casual and can seem impolite." },
      { question: "'Làm sao tôi biết được?' mang nghĩa gì?", questionEn: "What does 'Làm sao tôi biết được?' mean?", options: ["Tôi biết rõ", "Tôi không thể biết", "Hãy nói cho tôi", "Tôi sẽ tìm hiểu"], answer: 1, explanation: "Khuôn 'làm sao ... được' mang nghĩa phủ định khả năng.", explanationEn: "The 'làm sao ... được' frame denies possibility." },
    ],
  },
  {
    id: "vn-gram-v10-ellipsis",
    title: "Rút gọn câu và lược chủ ngữ trong hội thoại",
    titleEn: "Ellipsis: Dropping Subjects in Conversation",
    level: "advanced",
    teacherInsight:
      "Người học thường nói đủ chủ ngữ - vị ngữ nên nghe rất giống sách. Người Việt lược bỏ rất nhiều. Biết lược đúng chỗ là bước cuối để nói tự nhiên.",
    teacherInsightEn:
      "Learners tend to keep every subject and verb, which sounds textbook-like. Native speakers omit a lot. Knowing what to drop is the final step towards natural speech.",
    theory: `## Rút gọn câu trong hội thoại ✂️

### 1. Lược chủ ngữ khi đã rõ trong ngữ cảnh
- A: Chị ăn cơm chưa? - B: **Ăn rồi.** (không cần "Tôi ăn rồi")
- A: Đi đâu đấy? - B: **Ra chợ.**

Nguyên tắc: nếu người nghe biết chắc chủ ngữ, người Việt bỏ chủ ngữ. Giữ lại chủ ngữ khi muốn **nhấn mạnh** hoặc **so sánh**: "**Tôi** thì đi, còn **anh ấy** ở lại."

### 2. Lược động từ và chỉ giữ trọng tâm
- A: Em uống cà phê hay trà? - B: **Cà phê.**
- A: Bao nhiêu tiền? - B: **Năm mươi nghìn.**

### 3. Trả lời ngắn kiểu Việt
| Câu hỏi | Trả lời ngắn tự nhiên |
|---|---|
| Có ... không? | **Có** / **Không** |
| ... phải không? | **Phải** / **Không phải** |
| ... rồi chưa? | **Rồi** / **Chưa** |
| ... được không? | **Được** / **Không được** |

Người học hay trả lời "Vâng" cho mọi câu hỏi; thực tế phải khớp với từ trong câu hỏi.

### 4. Lược trong câu mệnh lệnh và đề nghị
- (Anh) Cho tôi xin thêm nước. → **Cho thêm nước nhé.**
- (Chúng ta) Đi thôi! → **Đi thôi!**

### 5. Rút gọn bằng cách bỏ từ nối
- "Nếu trời mưa thì tôi ở nhà." → "**Trời mưa, tôi ở nhà.**"
- "Vì mệt nên tôi nghỉ." → "**Mệt quá, nghỉ thôi.**"

Trong tin nhắn và nói nhanh, người Việt bỏ luôn từ nối và dựa vào ngữ cảnh.

### 6. Khi nào KHÔNG nên lược
1. Văn bản hành chính, email công việc: cần đủ thành phần và có **ạ**, **kính gửi**.
2. Khi có nhiều người trong câu chuyện, lược chủ ngữ dễ gây hiểu nhầm.
3. Với người mới gặp, câu quá ngắn có thể nghe cộc lốc; thêm **ạ**, **nhé** để mềm lại: "Chưa **ạ**."

### 7. Luyện tập tự nhiên
Hãy nghe một hội thoại tiếng Việt và đếm xem có bao nhiêu câu bắt đầu bằng "Tôi". Bạn sẽ ngạc nhiên: rất ít. Đó là lý do câu của bạn nghe dài hơn người bản ngữ.`,
    theoryEn: `## Ellipsis in conversation ✂️

### 1. Dropping the subject when context is clear
- A: Chị ăn cơm chưa? (Have you eaten?) - B: **Ăn rồi.** (Already have.) No need for "Tôi ăn rồi".
- A: Đi đâu đấy? (Where are you off to?) - B: **Ra chợ.** (To the market.)

Rule: if the listener knows the subject, Vietnamese drops it. Keep the subject to **emphasise** or **contrast**: "**Tôi** thì đi, còn **anh ấy** ở lại." (I'm going, while he stays.)

### 2. Dropping the verb, keeping the focus
- A: Em uống cà phê hay trà? - B: **Cà phê.**
- A: Bao nhiêu tiền? - B: **Năm mươi nghìn.**

### 3. Vietnamese-style short answers
| Question type | Natural short answer |
|---|---|
| Có ... không? | **Có** / **Không** |
| ... phải không? | **Phải** / **Không phải** |
| ... rồi chưa? | **Rồi** / **Chưa** |
| ... được không? | **Được** / **Không được** |

Learners often answer "Vâng" to everything; the answer should echo the question word.

### 4. Ellipsis in requests and commands
- (Anh) Cho tôi xin thêm nước. → **Cho thêm nước nhé.**
- (Chúng ta) Đi thôi! → **Đi thôi!**

### 5. Dropping connectives
- "Nếu trời mưa thì tôi ở nhà." → "**Trời mưa, tôi ở nhà.**"
- "Vì mệt nên tôi nghỉ." → "**Mệt quá, nghỉ thôi.**"

In texting and fast speech, connectives disappear and context carries the meaning.

### 6. When NOT to drop
1. Official documents and work email need full clauses plus **ạ** and formal openings.
2. With several people in the story, dropping subjects invites confusion.
3. With strangers very short answers can sound curt; soften with **ạ** or **nhé**: "Chưa **ạ**."

### 7. A natural practice task
Listen to any Vietnamese dialogue and count how many sentences begin with "Tôi". Very few. That is exactly why learner sentences sound longer than native ones.`,
    vocabulary: [
      { word: "rút gọn", meaning: "làm cho ngắn lại", meaningEn: "to shorten, reduce", example: "Câu này có thể rút gọn.", exampleEn: "This sentence can be shortened.", partOfSpeech: "verb" },
      { word: "lược bỏ", meaning: "bỏ đi thành phần không cần", meaningEn: "to omit", example: "Người Việt lược bỏ chủ ngữ.", exampleEn: "Vietnamese speakers omit the subject.", partOfSpeech: "verb" },
      { word: "chủ ngữ", meaning: "người hoặc vật thực hiện hành động", meaningEn: "subject", example: "Chủ ngữ ở đây là 'tôi'.", exampleEn: "The subject here is 'tôi'.", partOfSpeech: "noun" },
      { word: "ngữ cảnh", meaning: "hoàn cảnh của câu nói", meaningEn: "context", example: "Ngữ cảnh giúp hiểu câu ngắn.", exampleEn: "Context makes short sentences clear.", partOfSpeech: "noun" },
      { word: "cộc lốc", meaning: "quá ngắn, thiếu lịch sự", meaningEn: "curt, blunt", example: "Trả lời cộc lốc dễ mất thiện cảm.", exampleEn: "Curt answers can offend.", partOfSpeech: "adjective" },
      { word: "nhấn mạnh", meaning: "làm nổi bật ý", meaningEn: "to emphasise", example: "Giữ chủ ngữ để nhấn mạnh.", exampleEn: "Keep the subject to emphasise.", partOfSpeech: "verb" },
      { word: "so sánh", meaning: "đặt hai bên cạnh nhau", meaningEn: "to compare", example: "Câu này dùng để so sánh.", exampleEn: "This clause makes a comparison.", partOfSpeech: "verb" },
      { word: "hội thoại", meaning: "cuộc nói chuyện", meaningEn: "dialogue", example: "Nghe hội thoại mỗi ngày.", exampleEn: "Listen to dialogues daily.", partOfSpeech: "noun" },
      { word: "mệnh lệnh", meaning: "câu yêu cầu làm việc gì", meaningEn: "command", example: "Câu mệnh lệnh thường lược chủ ngữ.", exampleEn: "Commands usually drop the subject.", partOfSpeech: "noun" },
      { word: "thành phần", meaning: "bộ phận của câu", meaningEn: "sentence element", example: "Câu đủ thành phần nghe trang trọng.", exampleEn: "Full sentences sound formal.", partOfSpeech: "noun" },
      { word: "hành chính", meaning: "liên quan giấy tờ, cơ quan", meaningEn: "administrative", example: "Văn bản hành chính rất trang trọng.", exampleEn: "Administrative texts are formal.", partOfSpeech: "adjective" },
      { word: "tự nhiên", meaning: "giống người bản ngữ", meaningEn: "natural", example: "Nói ngắn hơn nghe tự nhiên hơn.", exampleEn: "Shorter speech sounds more natural.", partOfSpeech: "adjective" },
    ],
    quiz: [
      { question: "A: 'Chị ăn cơm chưa?' Câu trả lời tự nhiên nhất là?", questionEn: "A: 'Have you eaten?' The most natural answer is:", options: ["Vâng, tôi có ăn cơm.", "Rồi.", "Đúng vậy.", "Tôi ăn cơm rồi đấy chứ."], answer: 1, explanation: "Câu hỏi 'chưa' được trả lời bằng 'rồi' hoặc 'chưa'.", explanationEn: "A 'chưa' question is answered with 'rồi' or 'chưa'." },
      { question: "Khi nào nên giữ đầy đủ chủ ngữ?", questionEn: "When should you keep the full subject?", options: ["Khi nhấn mạnh hoặc so sánh", "Khi nói nhanh", "Khi nhắn tin", "Khi trả lời ngắn"], answer: 0, explanation: "Giữ chủ ngữ để nhấn mạnh hoặc phân biệt hai người.", explanationEn: "Keep the subject to emphasise or contrast people." },
      { question: "Câu 'Có wifi không?' nên trả lời thế nào?", questionEn: "How should you answer 'Có wifi không?'", options: ["Vâng", "Phải", "Có", "Rồi"], answer: 2, explanation: "Câu hỏi 'có ... không' trả lời bằng 'có' hoặc 'không'.", explanationEn: "A 'có ... không' question takes 'có' or 'không'." },
      { question: "Cách nào làm câu ngắn nghe lịch sự hơn?", questionEn: "How do you make a short answer more polite?", options: ["Nói to hơn", "Thêm 'ạ' hoặc 'nhé'", "Bỏ hết tiểu từ", "Dùng 'hả'"], answer: 1, explanation: "Thêm 'ạ' hoặc 'nhé' làm mềm câu ngắn.", explanationEn: "Adding 'ạ' or 'nhé' softens short answers." },
      { question: "Trường hợp nào KHÔNG nên rút gọn?", questionEn: "Where should you NOT use ellipsis?", options: ["Nhắn tin bạn bè", "Email công việc", "Nói chuyện trong nhà", "Trả lời câu hỏi ở chợ"], answer: 1, explanation: "Email công việc cần câu đủ thành phần và trang trọng.", explanationEn: "Work email needs full, formal sentences." },
    ],
  },
];

/* ════════════════════════════════════════════════════════════════════════════
 * VOCABULARY - 4 bộ từ vựng chủ đề mới.
 * ════════════════════════════════════════════════════════════════════════════ */
const vocabularyLessonsV10: VietnameseLesson[] = [
  {
    id: "vn-vocab-v10-job",
    title: "Công việc & Phỏng vấn xin việc",
    titleEn: "Work & Job Interviews",
    level: "intermediate",
    teacherInsight:
      "Trong phỏng vấn tiếng Việt, người tuyển dụng đánh giá cả cách bạn xưng hô. Hãy dùng 'em' hoặc 'tôi' với nhà tuyển dụng lớn tuổi hơn, và luôn kết câu bằng 'ạ' khi trả lời người phỏng vấn.",
    teacherInsightEn:
      "In a Vietnamese interview, recruiters also judge how you address them. Use 'em' or 'tôi' with an older interviewer and end answers with 'ạ'.",
    theory: `## Công việc và phỏng vấn 💼

### 1. Từ vựng lõi về công việc
- **công việc** (job), **nghề** (occupation), **vị trí** (position), **hợp đồng** (contract)
- **lương** (salary), **thưởng** (bonus), **phúc lợi** (benefits), **bảo hiểm** (insurance)
- **thử việc** (probation), **chính thức** (permanent), **thăng chức** (promotion)

### 2. Bộ câu hỏi phỏng vấn thường gặp
| Câu hỏi | Ý người tuyển dụng muốn biết |
|---|---|
| Bạn giới thiệu về bản thân đi. | khả năng trình bày ngắn gọn |
| Điểm mạnh, điểm yếu của bạn là gì? | sự tự nhận thức |
| Vì sao bạn muốn làm ở công ty chúng tôi? | mức độ tìm hiểu công ty |
| Mức lương mong muốn của bạn là bao nhiêu? | kỳ vọng có hợp ngân sách |
| Bạn có câu hỏi nào cho chúng tôi không? | sự chủ động |

### 3. Mẫu trả lời chuẩn mực
> "Dạ, em tên là Minh, tốt nghiệp ngành kế toán, có hai năm kinh nghiệm làm sổ sách. Em thấy vị trí này phù hợp với kinh nghiệm của em ạ."

Cấu trúc dễ nhớ: **tên - học vấn - kinh nghiệm - lý do phù hợp**.

### 4. Nói về mức lương một cách lịch sự
- "Dạ, em mong muốn mức từ 15 đến 18 triệu, nhưng em sẵn sàng thương lượng ạ."
- Tránh nói "Bao nhiêu cũng được" vì nghe thiếu tự tin.

### 5. Văn hóa nơi làm việc Việt Nam
1. Gọi đồng nghiệp bằng **anh/chị + tên** dù chỉ hơn vài tuổi.
2. Bữa trưa cùng phòng và tiệc cuối năm (**tất niên**) là dịp quan trọng để hòa nhập.
3. Xin nghỉ phép nên báo trước và nói rõ lý do; nhắn "Em xin phép nghỉ nửa ngày ạ".`,
    theoryEn: `## Work and job interviews 💼

### 1. Core work vocabulary
- **công việc** (job), **nghề** (occupation), **vị trí** (position), **hợp đồng** (contract)
- **lương** (salary), **thưởng** (bonus), **phúc lợi** (benefits), **bảo hiểm** (insurance)
- **thử việc** (probation), **chính thức** (permanent), **thăng chức** (promotion)

### 2. Frequent interview questions
| Question | What the recruiter checks |
|---|---|
| Bạn giới thiệu về bản thân đi. | ability to present concisely |
| Điểm mạnh, điểm yếu của bạn là gì? | self-awareness |
| Vì sao bạn muốn làm ở công ty chúng tôi? | company research |
| Mức lương mong muốn của bạn là bao nhiêu? | budget fit |
| Bạn có câu hỏi nào cho chúng tôi không? | initiative |

### 3. A model answer
> "Dạ, em tên là Minh, tốt nghiệp ngành kế toán, có hai năm kinh nghiệm làm sổ sách. Em thấy vị trí này phù hợp với kinh nghiệm của em ạ."
> (My name is Minh, I graduated in accounting with two years of bookkeeping experience. I believe this position matches my background.)

Easy frame: **name - education - experience - why you fit**.

### 4. Talking about salary politely
- "Dạ, em mong muốn mức từ 15 đến 18 triệu, nhưng em sẵn sàng thương lượng ạ." (I'd like 15-18 million VND, but I'm open to negotiation.)
- Avoid "Bao nhiêu cũng được" (anything is fine) - it sounds unconfident.

### 5. Vietnamese workplace culture
1. Address colleagues as **anh/chị + first name**, even a few years older.
2. Team lunches and the year-end party (**tất niên**) matter for fitting in.
3. Ask for leave in advance with a clear reason: "Em xin phép nghỉ nửa ngày ạ."`,
    vocabulary: [
      { word: "hồ sơ xin việc", meaning: "bộ giấy tờ ứng tuyển", meaningEn: "job application file", example: "Em đã gửi hồ sơ xin việc qua email.", exampleEn: "I sent my application by email.", partOfSpeech: "noun" },
      { word: "sơ yếu lý lịch", meaning: "bản tóm tắt thông tin cá nhân", meaningEn: "CV, resume", example: "Sơ yếu lý lịch nên gọn một trang.", exampleEn: "A CV should fit one page.", partOfSpeech: "noun" },
      { word: "phỏng vấn", meaning: "gặp và trả lời câu hỏi tuyển dụng", meaningEn: "interview", example: "Mai em có buổi phỏng vấn.", exampleEn: "I have an interview tomorrow.", partOfSpeech: "noun/verb" },
      { word: "nhà tuyển dụng", meaning: "người hoặc công ty tuyển người", meaningEn: "recruiter, employer", example: "Nhà tuyển dụng hỏi về kinh nghiệm.", exampleEn: "The recruiter asked about experience.", partOfSpeech: "noun" },
      { word: "kinh nghiệm", meaning: "điều đã làm và học được", meaningEn: "experience", example: "Tôi có ba năm kinh nghiệm.", exampleEn: "I have three years of experience.", partOfSpeech: "noun" },
      { word: "thử việc", meaning: "thời gian làm thử trước khi chính thức", meaningEn: "probation", example: "Thử việc hai tháng.", exampleEn: "A two-month probation.", partOfSpeech: "noun" },
      { word: "lương gộp", meaning: "lương trước khi trừ thuế", meaningEn: "gross salary", example: "Lương gộp 20 triệu.", exampleEn: "Gross salary of 20 million.", partOfSpeech: "noun" },
      { word: "phúc lợi", meaning: "quyền lợi ngoài lương", meaningEn: "benefits", example: "Công ty có phúc lợi tốt.", exampleEn: "The company offers good benefits.", partOfSpeech: "noun" },
      { word: "thương lượng", meaning: "trao đổi để đạt thỏa thuận", meaningEn: "to negotiate", example: "Em có thể thương lượng lương.", exampleEn: "I can negotiate the salary.", partOfSpeech: "verb" },
      { word: "thăng chức", meaning: "lên vị trí cao hơn", meaningEn: "to be promoted", example: "Chị ấy vừa được thăng chức.", exampleEn: "She was just promoted.", partOfSpeech: "verb" },
      { word: "đồng nghiệp", meaning: "người làm cùng công ty", meaningEn: "colleague", example: "Đồng nghiệp của tôi rất thân thiện.", exampleEn: "My colleagues are friendly.", partOfSpeech: "noun" },
      { word: "nghỉ phép", meaning: "xin nghỉ có phép", meaningEn: "to take leave", example: "Tôi xin nghỉ phép ba ngày.", exampleEn: "I'm taking three days of leave.", partOfSpeech: "verb phrase" },
    ],
    quiz: [
      { question: "'Sơ yếu lý lịch' tương đương từ nào trong tiếng Anh?", questionEn: "'Sơ yếu lý lịch' corresponds to which English word?", options: ["Contract", "CV / resume", "Payslip", "Reference letter"], answer: 1, explanation: "Đây là bản tóm tắt thông tin cá nhân và kinh nghiệm.", explanationEn: "It is a summary of personal details and experience." },
      { question: "Câu nào trả lời về lương nghe tự tin và lịch sự?", questionEn: "Which salary answer sounds confident and polite?", options: ["Bao nhiêu cũng được ạ.", "Em muốn thật nhiều tiền.", "Dạ, em mong mức 15-18 triệu và sẵn sàng thương lượng ạ.", "Anh trả bao nhiêu thì trả."], answer: 2, explanation: "Nêu khoảng cụ thể và tỏ ra linh hoạt là cách chuyên nghiệp.", explanationEn: "Giving a range and staying flexible is professional." },
      { question: "'Thử việc' nghĩa là gì?", questionEn: "What does 'thử việc' mean?", options: ["Thất nghiệp", "Giai đoạn làm thử trước khi ký chính thức", "Làm thêm giờ", "Nghỉ không lương"], answer: 1, explanation: "Thử việc là thời gian đánh giá trước khi thành nhân viên chính thức.", explanationEn: "Probation is the trial period before permanent hire." },
      { question: "Nên gọi đồng nghiệp hơn mình 3 tuổi thế nào?", questionEn: "How should you address a colleague three years older?", options: ["mày", "bạn ơi", "anh/chị + tên", "ông/bà"], answer: 2, explanation: "Anh/chị + tên là cách gọi chuẩn ở công sở Việt Nam.", explanationEn: "'Anh/chị + name' is the workplace norm in Vietnam." },
      { question: "'Phúc lợi' bao gồm điều gì?", questionEn: "What do 'phúc lợi' include?", options: ["Chỉ lương cơ bản", "Quyền lợi ngoài lương như bảo hiểm, du lịch", "Tiền phạt", "Giờ làm việc"], answer: 1, explanation: "Phúc lợi là các quyền lợi thêm ngoài lương.", explanationEn: "Benefits are perks beyond base salary." },
    ],
  },
  {
    id: "vn-vocab-v10-health",
    title: "Sức khỏe & Y tế: Từ triệu chứng tới nhà thuốc",
    titleEn: "Health & Medical: From Symptoms to the Pharmacy",
    level: "intermediate",
    teacherInsight:
      "Ở Việt Nam, nhà thuốc là nơi đầu tiên nhiều người tới khi bị bệnh nhẹ. Biết mô tả triệu chứng bằng ba câu ngắn giúp bạn mua đúng thuốc mà không cần phiên dịch.",
    teacherInsightEn:
      "In Vietnam the pharmacy is the first stop for minor illness. Being able to describe symptoms in three short sentences lets you buy the right medicine without an interpreter.",
    theory: `## Sức khỏe và y tế 🏥

### 1. Nói về triệu chứng - công thức "Tôi bị ..."
> **Tôi bị + tên triệu chứng (+ bao lâu rồi)**

- Tôi **bị** đau đầu **hai ngày rồi**.
- Tôi **bị** sốt và ho.
- Tôi **bị** đau bụng từ sáng.

Ghi chú quan trọng: bệnh và triệu chứng luôn đi với **bị** vì đó là điều không mong muốn.

### 2. Bản đồ triệu chứng thông dụng
| Tiếng Việt | Nghĩa |
|---|---|
| đau đầu / đau bụng / đau họng | headache / stomach ache / sore throat |
| sốt, sốt cao | fever, high fever |
| ho khan, ho có đờm | dry cough, productive cough |
| chóng mặt, buồn nôn | dizzy, nauseous |
| dị ứng, phát ban | allergy, rash |

### 3. Ở nhà thuốc
- "Chị cho em thuốc hạ sốt ạ."
- "Thuốc này uống mấy lần một ngày?" - "Ngày ba lần, sau khi ăn."
- "Thuốc này có gây buồn ngủ không?"

### 4. Ở phòng khám hoặc bệnh viện
1. **Đăng ký khám** ở quầy tiếp nhận, lấy **số thứ tự**.
2. **Khám** với bác sĩ: mô tả triệu chứng.
3. Có thể được chỉ định **xét nghiệm máu**, **siêu âm**, **chụp X-quang**.
4. Nhận **đơn thuốc** và ra nhà thuốc mua.

Câu cần biết: "Em có bảo hiểm y tế ạ." và "Bao lâu thì có kết quả ạ?"

### 5. Phòng bệnh và lời khuyên hằng ngày
- "Uống nhiều nước, nghỉ ngơi đầy đủ."
- "Ăn chín uống sôi" - lời khuyên kinh điển để tránh đau bụng khi du lịch.
- Số cấp cứu tại Việt Nam: **115**.`,
    theoryEn: `## Health and medical care 🏥

### 1. Describing symptoms - the "Tôi bị ..." pattern
> **Tôi bị + symptom (+ duration)**

- Tôi **bị** đau đầu **hai ngày rồi**. (I've had a headache for two days.)
- Tôi **bị** sốt và ho. (I have a fever and a cough.)
- Tôi **bị** đau bụng từ sáng. (My stomach has hurt since morning.)

Key note: illnesses and symptoms always take **bị**, since they are unwanted.

### 2. Symptom map
| Vietnamese | Meaning |
|---|---|
| đau đầu / đau bụng / đau họng | headache / stomach ache / sore throat |
| sốt, sốt cao | fever, high fever |
| ho khan, ho có đờm | dry cough, productive cough |
| chóng mặt, buồn nôn | dizzy, nauseous |
| dị ứng, phát ban | allergy, rash |

### 3. At the pharmacy
- "Chị cho em thuốc hạ sốt ạ." (Could I have fever medicine?)
- "Thuốc này uống mấy lần một ngày?" - "Ngày ba lần, sau khi ăn." (Three times a day, after meals.)
- "Thuốc này có gây buồn ngủ không?" (Does it cause drowsiness?)

### 4. At a clinic or hospital
1. **Đăng ký khám** at reception and take a **số thứ tự** (queue number).
2. **Khám** with the doctor: describe your symptoms.
3. You may be sent for **xét nghiệm máu** (blood test), **siêu âm** (ultrasound) or **chụp X-quang** (X-ray).
4. Collect the **đơn thuốc** (prescription) and buy medicine at the pharmacy.

Useful lines: "Em có bảo hiểm y tế ạ." (I have health insurance.) and "Bao lâu thì có kết quả ạ?" (When will results be ready?)

### 5. Prevention and everyday advice
- "Uống nhiều nước, nghỉ ngơi đầy đủ." (Drink plenty of water and rest.)
- "Ăn chín uống sôi" (eat cooked food, drink boiled water) - the classic advice against travel stomach trouble.
- Emergency number in Vietnam: **115**.`,
    vocabulary: [
      { word: "triệu chứng", meaning: "dấu hiệu của bệnh", meaningEn: "symptom", example: "Triệu chứng của tôi là ho và sốt.", exampleEn: "My symptoms are cough and fever.", partOfSpeech: "noun" },
      { word: "đau họng", meaning: "cổ họng đau rát", meaningEn: "sore throat", example: "Tôi bị đau họng từ hôm qua.", exampleEn: "I've had a sore throat since yesterday.", partOfSpeech: "verb phrase" },
      { word: "sốt cao", meaning: "nhiệt độ cơ thể rất cao", meaningEn: "high fever", example: "Cháu bị sốt cao 39 độ.", exampleEn: "The child has a 39-degree fever.", partOfSpeech: "noun phrase" },
      { word: "chóng mặt", meaning: "cảm giác quay quay", meaningEn: "dizzy", example: "Tôi hơi chóng mặt.", exampleEn: "I feel a bit dizzy.", partOfSpeech: "adjective" },
      { word: "buồn nôn", meaning: "muốn nôn", meaningEn: "nauseous", example: "Em buồn nôn sau khi ăn.", exampleEn: "I feel nauseous after eating.", partOfSpeech: "adjective" },
      { word: "thuốc hạ sốt", meaning: "thuốc làm giảm sốt", meaningEn: "fever medicine", example: "Cho em thuốc hạ sốt ạ.", exampleEn: "Could I have fever medicine?", partOfSpeech: "noun" },
      { word: "đơn thuốc", meaning: "giấy bác sĩ ghi thuốc", meaningEn: "prescription", example: "Bác sĩ viết đơn thuốc cho tôi.", exampleEn: "The doctor wrote me a prescription.", partOfSpeech: "noun" },
      { word: "xét nghiệm máu", meaning: "kiểm tra mẫu máu", meaningEn: "blood test", example: "Tôi cần xét nghiệm máu.", exampleEn: "I need a blood test.", partOfSpeech: "noun phrase" },
      { word: "bảo hiểm y tế", meaning: "bảo hiểm chi trả khám bệnh", meaningEn: "health insurance", example: "Em có bảo hiểm y tế ạ.", exampleEn: "I have health insurance.", partOfSpeech: "noun" },
      { word: "cấp cứu", meaning: "chữa trị khẩn cấp", meaningEn: "emergency care", example: "Gọi cấp cứu 115 ngay.", exampleEn: "Call 115 for an ambulance now.", partOfSpeech: "noun/verb" },
      { word: "dị ứng", meaning: "phản ứng xấu với chất gì", meaningEn: "allergy", example: "Tôi bị dị ứng hải sản.", exampleEn: "I'm allergic to seafood.", partOfSpeech: "noun/verb" },
      { word: "hồi phục", meaning: "khỏe lại sau bệnh", meaningEn: "to recover", example: "Anh ấy đang hồi phục tốt.", exampleEn: "He is recovering well.", partOfSpeech: "verb" },
    ],
    quiz: [
      { question: "Cách nói đúng khi bạn đau đầu hai ngày?", questionEn: "How do you say you've had a headache for two days?", options: ["Tôi được đau đầu hai ngày.", "Tôi bị đau đầu hai ngày rồi.", "Tôi có đau đầu hai ngày sẽ.", "Đau đầu tôi hai ngày được."], answer: 1, explanation: "Bệnh dùng 'bị', thêm 'rồi' để chỉ khoảng thời gian đã qua.", explanationEn: "Illness takes 'bị', and 'rồi' marks elapsed time." },
      { question: "'Đơn thuốc' là gì?", questionEn: "What is 'đơn thuốc'?", options: ["Hóa đơn tiền khám", "Giấy bác sĩ ghi thuốc cần mua", "Thẻ bảo hiểm", "Số thứ tự khám"], answer: 1, explanation: "Đơn thuốc là prescription.", explanationEn: "'Đơn thuốc' is a prescription." },
      { question: "Số điện thoại cấp cứu ở Việt Nam là?", questionEn: "What is the emergency number in Vietnam?", options: ["113", "114", "115", "911"], answer: 2, explanation: "115 là cấp cứu y tế; 113 là công an, 114 là cứu hỏa.", explanationEn: "115 is medical emergency; 113 police, 114 fire." },
      { question: "Câu nào hỏi cách dùng thuốc?", questionEn: "Which sentence asks about dosage?", options: ["Thuốc này bao nhiêu tiền?", "Thuốc này uống mấy lần một ngày?", "Thuốc này của ai?", "Thuốc này ở đâu?"], answer: 1, explanation: "Câu hỏi số lần uống trong ngày chính là hỏi liều dùng.", explanationEn: "Asking times per day is asking the dosage." },
      { question: "'Ăn chín uống sôi' khuyên điều gì?", questionEn: "What does 'ăn chín uống sôi' advise?", options: ["Ăn nhiều rau", "Ăn thức ăn nấu chín, uống nước đun sôi", "Ăn ít đường", "Ăn đúng giờ"], answer: 1, explanation: "Đây là lời khuyên tránh bệnh đường tiêu hóa.", explanationEn: "It is advice to avoid digestive illness." },
    ],
  },
  {
    id: "vn-vocab-v10-money",
    title: "Tiền bạc, Mua sắm & Trả giá",
    titleEn: "Money, Shopping & Bargaining",
    level: "beginner",
    teacherInsight:
      "Người Việt hay nói tắt số tiền: 'hai chục' là 20 nghìn, 'năm trăm' có thể là 500 nghìn, 'một củ' hoặc 'một triệu' là 1.000.000. Nghe quen cách nói tắt này bạn sẽ mua sắm nhanh hơn nhiều.",
    teacherInsightEn:
      "Vietnamese shorten prices: 'hai chục' means 20 thousand, 'năm trăm' can mean 500 thousand, and 'một củ' means one million. Recognising these shortcuts speeds up any shopping trip.",
    theory: `## Tiền bạc và mua sắm 💰

### 1. Đọc số tiền như người Việt
| Cách viết | Cách nói thường ngày | Giá trị |
|---|---|---|
| 10.000đ | mười nghìn / mười ngàn | 10 nghìn |
| 20.000đ | hai chục | 20 nghìn |
| 150.000đ | một trăm rưỡi | 150 nghìn |
| 500.000đ | năm trăm | 500 nghìn |
| 1.000.000đ | một triệu / một củ | 1 triệu |

Miền Bắc nói **nghìn**, miền Nam nói **ngàn**; cả hai đều đúng.

### 2. Câu hỏi giá và mặc cả
- "Cái này bao nhiêu ạ?"
- "Đắt quá! Bớt chút được không chị?"
- "Hai cái thì bao nhiêu?"
- "Em lấy hai cái, chị tính rẻ cho em nhé."

Quy tắc mặc cả ở chợ: chào giá của bạn nên khoảng **60-70%** giá người bán đưa ra, và luôn giữ nụ cười. Ở siêu thị, cửa hàng có niêm yết giá thì **không mặc cả**.

### 3. Thanh toán
- "Em trả tiền mặt ạ." / "Ở đây quẹt thẻ được không?"
- "Cho em chuyển khoản nhé." - chuyển khoản qua ứng dụng ngân hàng rất phổ biến.
- "Cho em xin hóa đơn ạ."
- "Chị có tiền lẻ không? Em không có tiền thối."

### 4. Ngân hàng cơ bản
- **mở tài khoản** (open an account), **rút tiền** (withdraw), **nạp tiền** (top up)
- **số dư** (balance), **phí** (fee), **lãi suất** (interest rate)
- "Máy ATM này không nhận thẻ của em."

### 5. Nói về chi tiêu
- "Tháng này tôi tiêu hơi nhiều."
- "Tôi đang tiết kiệm để đi du lịch."
- "Món này đáng giá tiền." / "Món này không đáng."`,
    theoryEn: `## Money and shopping 💰

### 1. Reading prices like a local
| Written | Everyday speech | Value |
|---|---|---|
| 10.000đ | mười nghìn / mười ngàn | 10 thousand |
| 20.000đ | hai chục | 20 thousand |
| 150.000đ | một trăm rưỡi | 150 thousand |
| 500.000đ | năm trăm | 500 thousand |
| 1.000.000đ | một triệu / một củ | 1 million |

The North says **nghìn**, the South says **ngàn**; both are correct.

### 2. Asking prices and bargaining
- "Cái này bao nhiêu ạ?" (How much is this?)
- "Đắt quá! Bớt chút được không chị?" (Too expensive! Can you come down a bit?)
- "Hai cái thì bao nhiêu?" (How much for two?)
- "Em lấy hai cái, chị tính rẻ cho em nhé." (I'll take two, give me a better price.)

Market rule of thumb: counter-offer around **60-70%** of the asking price, and always keep smiling. In supermarkets and shops with fixed price tags, do **not** bargain.

### 3. Paying
- "Em trả tiền mặt ạ." (I'll pay cash.) / "Ở đây quẹt thẻ được không?" (Can I pay by card?)
- "Cho em chuyển khoản nhé." (Let me do a bank transfer.) App transfers are extremely common.
- "Cho em xin hóa đơn ạ." (May I have the receipt?)
- "Chị có tiền lẻ không? Em không có tiền thối." (Any small change? I have none to give back.)

### 4. Basic banking
- **mở tài khoản** (open an account), **rút tiền** (withdraw), **nạp tiền** (top up)
- **số dư** (balance), **phí** (fee), **lãi suất** (interest rate)
- "Máy ATM này không nhận thẻ của em." (This ATM doesn't accept my card.)

### 5. Talking about spending
- "Tháng này tôi tiêu hơi nhiều." (I spent a bit much this month.)
- "Tôi đang tiết kiệm để đi du lịch." (I'm saving for a trip.)
- "Món này đáng giá tiền." (This is worth the money.) / "Món này không đáng." (Not worth it.)`,
    vocabulary: [
      { word: "bao nhiêu", meaning: "hỏi số lượng, giá cả", meaningEn: "how much", example: "Cái này bao nhiêu ạ?", exampleEn: "How much is this?", partOfSpeech: "phrase" },
      { word: "đắt", meaning: "giá cao", meaningEn: "expensive", example: "Áo này đắt quá.", exampleEn: "This shirt is too expensive.", partOfSpeech: "adjective" },
      { word: "rẻ", meaning: "giá thấp", meaningEn: "cheap", example: "Chợ này bán rẻ hơn.", exampleEn: "This market is cheaper.", partOfSpeech: "adjective" },
      { word: "bớt giá", meaning: "giảm giá xuống", meaningEn: "to lower the price", example: "Chị bớt giá cho em nhé.", exampleEn: "Please lower the price for me.", partOfSpeech: "verb phrase" },
      { word: "tiền mặt", meaning: "tiền giấy, tiền xu", meaningEn: "cash", example: "Em trả bằng tiền mặt.", exampleEn: "I'll pay in cash.", partOfSpeech: "noun" },
      { word: "quẹt thẻ", meaning: "thanh toán bằng thẻ", meaningEn: "to pay by card", example: "Ở đây quẹt thẻ được không?", exampleEn: "Can I pay by card here?", partOfSpeech: "verb phrase" },
      { word: "chuyển khoản", meaning: "gửi tiền qua ngân hàng", meaningEn: "bank transfer", example: "Cho em chuyển khoản nhé.", exampleEn: "Let me transfer the money.", partOfSpeech: "verb" },
      { word: "hóa đơn", meaning: "giấy ghi tiền đã trả", meaningEn: "receipt, invoice", example: "Cho em xin hóa đơn ạ.", exampleEn: "May I have the receipt?", partOfSpeech: "noun" },
      { word: "tiền thối", meaning: "tiền trả lại (miền Nam)", meaningEn: "change (South)", example: "Chị thối lại em 20 nghìn.", exampleEn: "You owe me 20 thousand in change.", partOfSpeech: "noun" },
      { word: "tiết kiệm", meaning: "giữ tiền lại, không tiêu nhiều", meaningEn: "to save money", example: "Tôi tiết kiệm mỗi tháng.", exampleEn: "I save every month.", partOfSpeech: "verb" },
      { word: "số dư", meaning: "tiền còn lại trong tài khoản", meaningEn: "balance", example: "Số dư của tôi còn ít.", exampleEn: "My balance is low.", partOfSpeech: "noun" },
      { word: "đáng giá", meaning: "xứng với số tiền", meaningEn: "worth the money", example: "Bữa ăn này rất đáng giá.", exampleEn: "This meal is well worth it.", partOfSpeech: "adjective" },
    ],
    quiz: [
      { question: "'Hai chục' trong chợ thường nghĩa là bao nhiêu?", questionEn: "In a market, 'hai chục' usually means:", options: ["2.000đ", "20.000đ", "200.000đ", "2.000.000đ"], answer: 1, explanation: "'Chục' ở đây là chục nghìn, nên hai chục = 20.000đ.", explanationEn: "'Chục' here means ten thousand, so 20,000 VND." },
      { question: "Ở đâu KHÔNG nên mặc cả?", questionEn: "Where should you NOT bargain?", options: ["Chợ truyền thống", "Siêu thị có niêm yết giá", "Hàng rong", "Chợ đêm"], answer: 1, explanation: "Nơi niêm yết giá cố định thì không mặc cả.", explanationEn: "Fixed-price shops are not bargaining places." },
      { question: "Câu nào dùng để xin hóa đơn?", questionEn: "Which sentence asks for a receipt?", options: ["Cho em xin hóa đơn ạ.", "Cho em thêm nước ạ.", "Cho em bớt giá ạ.", "Cho em chuyển khoản ạ."], answer: 0, explanation: "Hóa đơn = receipt/invoice.", explanationEn: "'Hóa đơn' is the receipt." },
      { question: "'Tiền thối' nghĩa là gì?", questionEn: "What does 'tiền thối' mean?", options: ["Tiền cũ, hỏng", "Tiền trả lại sau khi mua", "Tiền tiết kiệm", "Tiền phí"], answer: 1, explanation: "Tiền thối (miền Nam) = tiền trả lại, miền Bắc nói 'tiền trả lại'.", explanationEn: "'Tiền thối' (South) is change; the North says 'tiền trả lại'." },
      { question: "Mức chào giá hợp lý khi mặc cả ở chợ là?", questionEn: "A reasonable counter-offer at a market is:", options: ["10% giá bán", "60-70% giá bán", "100% giá bán", "150% giá bán"], answer: 1, explanation: "Khoảng 60-70% là mức lịch sự và thường được chấp nhận.", explanationEn: "Around 60-70% is polite and often accepted." },
    ],
  },
  {
    id: "vn-vocab-v10-environment",
    title: "Môi trường, Thời tiết & Thiên nhiên",
    titleEn: "Environment, Weather & Nature",
    level: "intermediate",
    teacherInsight:
      "Thời tiết là chủ đề mở đầu hội thoại an toàn nhất ở Việt Nam. Ngoài ra, biết từ về bão, ngập lụt và ô nhiễm giúp bạn hiểu tin tức và các thông báo quan trọng.",
    teacherInsightEn:
      "Weather is the safest small-talk topic in Vietnam. Words for storms, flooding and pollution also help you follow the news and important announcements.",
    theory: `## Môi trường, thời tiết và thiên nhiên 🌦️

### 1. Thời tiết hằng ngày
- **nắng** (sunny), **mưa** (rainy), **mát** (cool), **lạnh** (cold), **nóng bức** (sweltering), **hanh khô** (dry)
- "Hôm nay trời **nắng gắt** quá." / "Trời **mưa rào** rồi."
- **ẩm** (humid) là từ rất cần ở Việt Nam: "Mùa này **nồm ẩm**, quần áo lâu khô."

### 2. Mùa ở hai miền
| Miền Bắc | Miền Nam |
|---|---|
| Bốn mùa: xuân, hạ, thu, đông | Hai mùa: mùa khô, mùa mưa |
| Mùa đông có thể xuống 8-10 độ | Quanh năm 25-35 độ |
| Mùa nồm tháng 2-4 rất ẩm | Mưa chiều tháng 5-11 |

### 3. Thời tiết cực đoan và tin tức
- **bão** (typhoon), **áp thấp nhiệt đới** (tropical depression)
- **ngập lụt** (flooding), **sạt lở** (landslide), **triều cường** (high tide flooding)
- "Bão số 5 **đổ bộ** vào miền Trung." - từ **đổ bộ** rất hay gặp trên bản tin.
- "Người dân được **sơ tán** khỏi vùng nguy hiểm."

### 4. Môi trường và ô nhiễm
- **ô nhiễm không khí** (air pollution), **bụi mịn** (fine dust, PM2.5)
- **rác thải** (waste), **phân loại rác** (waste sorting), **túi ni lông** (plastic bag)
- **tái chế** (recycle), **năng lượng tái tạo** (renewable energy)
- Câu hữu ích khi mua đồ: "Em không cần túi ni lông ạ, em có túi rồi."

### 5. Thiên nhiên Việt Nam
Việt Nam có hơn 3.200 km bờ biển, những dãy núi đá vôi ở Hạ Long và Ninh Bình, cao nguyên Đà Lạt mát mẻ, và vùng đồng bằng sông Cửu Long trù phú. Nhiều nơi đã được UNESCO công nhận là **di sản thiên nhiên thế giới**.

### 6. Nói về việc bảo vệ môi trường
- "Tôi đi xe đạp để giảm khí thải."
- "Nhà tôi phân loại rác và dùng bình nước cá nhân."
- "Chúng ta nên tiết kiệm điện và nước."`,
    theoryEn: `## Environment, weather and nature 🌦️

### 1. Everyday weather
- **nắng** (sunny), **mưa** (rainy), **mát** (cool), **lạnh** (cold), **nóng bức** (sweltering), **hanh khô** (dry)
- "Hôm nay trời **nắng gắt** quá." (The sun is harsh today.) / "Trời **mưa rào** rồi." (A downpour has started.)
- **ẩm** (humid) is essential in Vietnam: "Mùa này **nồm ẩm**, quần áo lâu khô." (It's damp season, laundry takes ages.)

### 2. Seasons in the two regions
| North | South |
|---|---|
| Four seasons: spring, summer, autumn, winter | Two seasons: dry and rainy |
| Winter can drop to 8-10°C | 25-35°C all year |
| Very damp 'nồm' season, Feb-Apr | Afternoon rain, May-Nov |

### 3. Extreme weather and the news
- **bão** (typhoon), **áp thấp nhiệt đới** (tropical depression)
- **ngập lụt** (flooding), **sạt lở** (landslide), **triều cường** (tidal flooding)
- "Bão số 5 **đổ bộ** vào miền Trung." (Storm No. 5 makes landfall in the Central region.) **Đổ bộ** appears constantly in bulletins.
- "Người dân được **sơ tán** khỏi vùng nguy hiểm." (Residents were evacuated from danger zones.)

### 4. Environment and pollution
- **ô nhiễm không khí** (air pollution), **bụi mịn** (fine dust, PM2.5)
- **rác thải** (waste), **phân loại rác** (waste sorting), **túi ni lông** (plastic bag)
- **tái chế** (recycle), **năng lượng tái tạo** (renewable energy)
- Handy while shopping: "Em không cần túi ni lông ạ, em có túi rồi." (No plastic bag, thanks, I have my own.)

### 5. Vietnam's nature
Vietnam has over 3,200 km of coastline, limestone karsts in Ha Long and Ninh Binh, the cool Da Lat highlands and the fertile Mekong Delta. Several sites are UNESCO **di sản thiên nhiên thế giới** (world natural heritage).

### 6. Talking about protecting the environment
- "Tôi đi xe đạp để giảm khí thải." (I cycle to cut emissions.)
- "Nhà tôi phân loại rác và dùng bình nước cá nhân." (We sort waste and use reusable bottles.)
- "Chúng ta nên tiết kiệm điện và nước." (We should save electricity and water.)`,
    vocabulary: [
      { word: "nắng gắt", meaning: "nắng rất mạnh", meaningEn: "harsh sunshine", example: "Trưa nay nắng gắt lắm.", exampleEn: "The midday sun is harsh.", partOfSpeech: "adjective" },
      { word: "mưa rào", meaning: "mưa to trong thời gian ngắn", meaningEn: "downpour", example: "Chiều nay có mưa rào.", exampleEn: "There'll be a downpour this afternoon.", partOfSpeech: "noun" },
      { word: "nồm ẩm", meaning: "trời ẩm ướt đặc trưng miền Bắc", meaningEn: "damp northern weather", example: "Mùa nồm ẩm rất khó chịu.", exampleEn: "The damp season is unpleasant.", partOfSpeech: "adjective" },
      { word: "bão", meaning: "gió mạnh kèm mưa lớn", meaningEn: "typhoon, storm", example: "Bão sắp vào miền Trung.", exampleEn: "A typhoon is approaching the Central region.", partOfSpeech: "noun" },
      { word: "đổ bộ", meaning: "bão vào đất liền", meaningEn: "to make landfall", example: "Bão đổ bộ lúc nửa đêm.", exampleEn: "The storm made landfall at midnight.", partOfSpeech: "verb" },
      { word: "ngập lụt", meaning: "nước dâng cao gây ngập", meaningEn: "flooding", example: "Đường phố bị ngập lụt.", exampleEn: "The streets are flooded.", partOfSpeech: "noun/verb" },
      { word: "sơ tán", meaning: "chuyển người đi nơi an toàn", meaningEn: "to evacuate", example: "Dân được sơ tán trước bão.", exampleEn: "Residents were evacuated before the storm.", partOfSpeech: "verb" },
      { word: "ô nhiễm", meaning: "bị làm bẩn, độc hại", meaningEn: "pollution, polluted", example: "Không khí hôm nay ô nhiễm.", exampleEn: "The air is polluted today.", partOfSpeech: "noun/adjective" },
      { word: "bụi mịn", meaning: "hạt bụi rất nhỏ trong không khí", meaningEn: "fine dust (PM2.5)", example: "Chỉ số bụi mịn rất cao.", exampleEn: "The fine dust index is very high.", partOfSpeech: "noun" },
      { word: "phân loại rác", meaning: "chia rác theo loại", meaningEn: "waste sorting", example: "Nhà tôi phân loại rác hằng ngày.", exampleEn: "We sort waste every day.", partOfSpeech: "verb phrase" },
      { word: "tái chế", meaning: "dùng lại vật liệu cũ", meaningEn: "to recycle", example: "Chai nhựa có thể tái chế.", exampleEn: "Plastic bottles can be recycled.", partOfSpeech: "verb" },
      { word: "khí thải", meaning: "khí độc thải ra", meaningEn: "emissions", example: "Xe máy tạo nhiều khí thải.", exampleEn: "Motorbikes create many emissions.", partOfSpeech: "noun" },
    ],
    quiz: [
      { question: "Miền Nam Việt Nam có mấy mùa?", questionEn: "How many seasons does southern Vietnam have?", options: ["Hai: mùa khô và mùa mưa", "Bốn mùa rõ rệt", "Ba mùa", "Không có mùa"], answer: 0, explanation: "Miền Nam chỉ có mùa khô và mùa mưa.", explanationEn: "The South has only a dry and a rainy season." },
      { question: "'Bão đổ bộ' nghĩa là gì?", questionEn: "What does 'bão đổ bộ' mean?", options: ["Bão tan", "Bão vào đất liền", "Bão đổi hướng", "Bão yếu đi"], answer: 1, explanation: "Đổ bộ = vào đất liền (make landfall).", explanationEn: "'Đổ bộ' means to make landfall." },
      { question: "'Bụi mịn' liên quan đến điều gì?", questionEn: "'Bụi mịn' relates to what?", options: ["Ô nhiễm không khí", "Ngập lụt", "Sạt lở đất", "Thiếu nước"], answer: 0, explanation: "Bụi mịn (PM2.5) là chỉ số ô nhiễm không khí.", explanationEn: "Fine dust (PM2.5) is an air-pollution measure." },
      { question: "Câu nào từ chối túi ni lông một cách lịch sự?", questionEn: "Which politely declines a plastic bag?", options: ["Em không cần túi ni lông ạ, em có túi rồi.", "Cho em thêm túi ni lông.", "Túi ni lông đâu rồi?", "Em thích túi ni lông."], answer: 0, explanation: "Nói rõ mình đã có túi là cách từ chối lịch sự.", explanationEn: "Stating you already have a bag politely declines." },
      { question: "'Nồm ẩm' xuất hiện ở đâu và khi nào?", questionEn: "Where and when does 'nồm ẩm' occur?", options: ["Miền Nam, mùa khô", "Miền Bắc, khoảng tháng 2-4", "Cao nguyên, tháng 12", "Ven biển, tháng 8"], answer: 1, explanation: "Nồm ẩm là hiện tượng ẩm ướt ở miền Bắc đầu năm.", explanationEn: "'Nồm ẩm' is early-year dampness in the North." },
    ],
  },
];

/* ════════════════════════════════════════════════════════════════════════════
 * Mutate target modules (matches existing .push pattern in this folder).
 * ════════════════════════════════════════════════════════════════════════════ */
const practicalGrammar = grammarModules.find(m => m.id === "vn-grammar-practical") ?? grammarModules[0];
if (practicalGrammar) practicalGrammar.lessons.push(...grammarLessonsV10);

const dailyVocab = vocabularyModules.find(m => m.id === "vn-vocab-daily") ?? vocabularyModules[0];
if (dailyVocab) dailyVocab.lessons.push(...vocabularyLessonsV10);

export const vietnameseExpansionV10Counts = {
  grammar: grammarLessonsV10.length,
  vocabulary: vocabularyLessonsV10.length,
};
