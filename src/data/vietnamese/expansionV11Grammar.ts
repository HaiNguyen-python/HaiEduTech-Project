/**
 * @file expansionV11Grammar.ts
 * @description Giai đoạn 2 (phần 1) - 10 bài ngữ pháp nâng cao và giao tiếp.
 * Push vào vn-gram-adv-comm và vn-adv-grammar, không thay đổi bài cũ.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { grammarModules } from "./grammarLessons";
import { vietnameseLessonsExpansionModules } from "./lessonsExpansion";
import type { VietnameseLesson, VietnameseQuizQuestion, VietnameseVocabEntry } from "./types";

const v = (
  word: string,
  meaning: string,
  meaningEn: string,
  example: string,
  exampleEn: string,
  partOfSpeech?: string,
): VietnameseVocabEntry => ({ word, meaning, meaningEn, example, exampleEn, partOfSpeech });

const q = (
  question: string,
  questionEn: string,
  options: string[],
  answer: number,
  explanation: string,
  explanationEn: string,
): VietnameseQuizQuestion => ({ question, questionEn, options, answer, explanation, explanationEn });

const communicationLessons: VietnameseLesson[] = [
  {
    id: "vn-v11-gram-compound",
    title: "Câu ghép nhiều tầng trong văn viết",
    titleEn: "Multi-layer Compound Sentences in Writing",
    level: "advanced",
    teacherInsight:
      "Người học hay nối nhiều mệnh đề bằng dấu phẩy và chữ 'và' cho tới khi câu mất kiểm soát. Bí quyết là mỗi câu chỉ giữ một quan hệ logic chính, các ý phụ tách thành câu riêng.",
    teacherInsightEn:
      "Learners often chain clauses with commas and 'và' until the sentence loses control. The trick is to keep one main logical relation per sentence and split the rest.",
    theory: `## Câu ghép nhiều tầng

Câu ghép nhiều tầng là câu có từ ba mệnh đề trở lên, mỗi mệnh đề giữ một quan hệ logic riêng.

### 1. Ba quan hệ logic thường dùng
| Quan hệ | Cặp từ nối | Ví dụ |
|---|---|---|
| Nguyên nhân - kết quả | vì... nên... | **Vì** giá vé tăng **nên** lượng khách giảm. |
| Tương phản | tuy... nhưng... | **Tuy** trời mưa **nhưng** lớp vẫn đông. |
| Điều kiện | nếu... thì... | **Nếu** đăng ký sớm **thì** bạn được giảm giá. |

### 2. Xếp tầng đúng cách
> Vì dịch vụ được cải thiện nên khách quay lại nhiều hơn, tuy chi phí vận hành vẫn cao.

Mệnh đề 1 - 2 là nguyên nhân kết quả, mệnh đề 3 bổ sung sự tương phản. Đây là giới hạn hợp lý cho một câu.

### 3. Ba lỗi cần tránh
1. Dùng nửa cặp từ nối: "Vì trời mưa, tôi ở nhà" nên viết "Vì trời mưa nên tôi ở nhà".
2. Đổi chủ ngữ giữa các mệnh đề mà không nhắc lại, khiến người đọc hiểu sai ai làm gì.
3. Nối quá bốn mệnh đề trong một câu. Hãy tách câu.

### 4. Mẹo tự kiểm tra
Đọc to câu lên. Nếu phải lấy hơi hai lần mới hết câu thì nên tách.`,
    theoryEn: `## Multi-layer compound sentences

A multi-layer compound sentence carries three or more clauses, each with its own logical relation.

Three frequent relations: cause and result (vì... nên...), contrast (tuy... nhưng...), condition (nếu... thì...).

Keep at most one added layer per sentence, always complete both halves of a connective pair, restate the subject when it changes, and split anything longer than four clauses. Read the sentence aloud: if you need two breaths, split it.`,
    proTips: [
      "Một câu, một quan hệ logic chính.",
      "Luôn viết đủ cặp từ nối: vì... nên..., tuy... nhưng..., nếu... thì...",
      "Đổi chủ ngữ thì phải nhắc lại chủ ngữ.",
    ],
    proTipsEn: [
      "One main logical relation per sentence.",
      "Always complete connective pairs.",
      "Restate the subject whenever it changes.",
    ],
    vocabulary: [
      v("mệnh đề chính", "phần câu mang ý trung tâm", "main clause", "Mệnh đề chính đứng sau 'nên'.", "The main clause follows 'nên'.", "danh từ"),
      v("mệnh đề phụ", "phần câu bổ sung cho ý chính", "subordinate clause", "Mệnh đề phụ giải thích nguyên nhân.", "The subordinate clause explains the cause.", "danh từ"),
      v("liên kết", "sự nối các ý với nhau", "cohesion", "Từ nối tạo liên kết cho đoạn văn.", "Connectives create cohesion in a paragraph.", "danh từ"),
      v("tầng nghĩa", "lớp ý nghĩa trong câu", "layer of meaning", "Câu ghép nhiều tầng nghĩa cần đọc chậm.", "Sentences with many layers need slow reading.", "danh từ"),
      v("nhượng bộ", "chấp nhận một phần ý trái chiều", "concession", "'Mặc dù' mở đầu ý nhượng bộ.", "'Mặc dù' opens a concession.", "danh từ"),
      v("song song", "hai ý ngang hàng nhau", "parallel", "Hai mệnh đề song song nên có cấu trúc giống nhau.", "Parallel clauses should share the same structure.", "tính từ"),
      v("rườm rà", "dài dòng, nhiều từ không cần", "wordy", "Câu rườm rà làm người đọc mệt.", "Wordy sentences tire the reader.", "tính từ"),
      v("súc tích", "ngắn mà đủ ý", "concise", "Văn bản hành chính cần súc tích.", "Administrative texts must be concise.", "tính từ"),
      v("tách câu", "chia một câu dài thành nhiều câu", "to split a sentence", "Nên tách câu khi có quá bốn mệnh đề.", "Split the sentence when it exceeds four clauses.", "động từ"),
      v("mạch lạc", "các ý theo nhau hợp lý", "coherent", "Đoạn văn mạch lạc dễ theo dõi.", "A coherent paragraph is easy to follow.", "tính từ"),
    ],
    quiz: [
      q("Câu nào viết đúng cặp từ nối?", "Which sentence completes the connective pair correctly?", ["Vì trời mưa nên chúng tôi hoãn buổi họp.", "Vì trời mưa, chúng tôi hoãn buổi họp mà.", "Tuy trời mưa và chúng tôi vẫn đi.", "Nếu trời mưa, nhưng chúng tôi ở nhà."], 0, "Cặp 'vì... nên...' được dùng đầy đủ và đúng vị trí.", "The pair 'vì... nên...' is complete and correctly placed."),
      q("Cặp từ nào biểu thị nhượng bộ?", "Which pair expresses concession?", ["Mặc dù... nhưng...", "Vì... nên...", "Nếu... thì...", "Không chỉ... mà còn..."], 0, "'Mặc dù... nhưng...' nêu ý chấp nhận một phần rồi chuyển ý trái chiều.", "'Mặc dù... nhưng...' concedes a point then contrasts."),
      q("Khi nào nên tách một câu ghép?", "When should a compound sentence be split?", ["Khi có quá bốn mệnh đề hoặc nhiều quan hệ logic chồng nhau", "Khi có hai mệnh đề", "Khi có dấu phẩy", "Khi có từ 'và'"], 0, "Quá bốn mệnh đề hoặc nhiều quan hệ logic chồng nhau sẽ khó theo dõi.", "More than four clauses or stacked relations become hard to follow."),
      q("Lỗi nào khiến người đọc hiểu sai ai làm gì?", "Which error confuses who does what?", ["Đổi chủ ngữ mà không nhắc lại", "Dùng dấu phẩy", "Dùng từ 'nên'", "Viết câu ngắn"], 0, "Khi đổi chủ ngữ mà lược đi, người đọc dễ gán sai hành động.", "Dropping a changed subject makes readers misassign the action."),
      q("Hai mệnh đề song song nên được viết thế nào?", "How should parallel clauses be written?", ["Cùng cấu trúc ngữ pháp", "Một dài một ngắn", "Một câu hỏi một câu kể", "Không cần liên quan"], 0, "Cấu trúc song song giúp câu cân đối và dễ hiểu.", "Parallel structure keeps the sentence balanced and clear."),
    ],
  },
  {
    id: "vn-v11-gram-euphemism",
    title: "Nói giảm nói tránh trong tiếng Việt",
    titleEn: "Softening and Euphemism in Vietnamese",
    level: "advanced",
    teacherInsight:
      "Trong tiếng Việt, nói thẳng điều tiêu cực dễ bị coi là thiếu tế nhị. Người bản ngữ dùng cả một hệ thống từ đệm như 'e rằng', 'hơi', 'chưa được' để giữ hòa khí.",
    teacherInsightEn:
      "Blunt negatives sound tactless in Vietnamese. Native speakers rely on softeners such as 'e rằng', 'hơi' and 'chưa được' to keep harmony.",
    theory: `## Nói giảm nói tránh

Người Việt ít nói thẳng điều tiêu cực. Có ba cách làm mềm câu.

### 1. Thay từ mạnh bằng từ nhẹ
| Nói thẳng | Nói giảm |
|---|---|
| sai | **chưa đúng** |
| dở | **chưa được ngon** |
| chết | **mất**, **qua đời** |
| đắt | **hơi cao** |

### 2. Thêm từ đệm
- **Hơi**: Báo cáo này **hơi** dài.
- **Có lẽ / e rằng**: **E rằng** tiến độ không kịp.
- **Chưa**: Kế hoạch **chưa** thuyết phục. (mở đường cho sửa chữa)

### 3. Chuyển câu phủ định thành câu hỏi
> Thay vì "Anh làm sai rồi", hãy nói "Mình xem lại phần này một chút nhé?"

### 4. Khi nào không nên nói giảm
Trong an toàn lao động, y tế, hợp đồng và quy định pháp lý, cần nói chính xác. Nói giảm ở đó gây nguy hiểm hoặc tranh chấp.`,
    theoryEn: `## Softening and euphemism

Vietnamese rarely states negatives bluntly. Three techniques: replace a strong word with a mild one (sai to chưa đúng, chết to mất), add softeners (hơi, có lẽ, e rằng, chưa), and turn a negative statement into a question.

Do not soften in safety, medical, contractual or legal contexts, where precision matters.`,
    proTips: [
      "'Chưa' mềm hơn 'không' vì hàm ý còn có thể thay đổi.",
      "Thêm 'nhé', 'ạ' cuối câu để giảm áp lực cho người nghe.",
      "Không nói giảm khi bàn về an toàn hoặc điều khoản hợp đồng.",
    ],
    proTipsEn: [
      "'Chưa' is softer than 'không' because it implies change is possible.",
      "Sentence-final 'nhé' and 'ạ' reduce pressure on the listener.",
      "Never soften safety issues or contract terms.",
    ],
    vocabulary: [
      v("nói giảm", "nói nhẹ đi so với thực tế", "to understate", "Người Việt hay nói giảm khi phê bình.", "Vietnamese often understate when criticising.", "động từ"),
      v("tế nhị", "khéo, giữ được lòng người khác", "tactful", "Cách góp ý rất tế nhị.", "The feedback was very tactful.", "tính từ"),
      v("từ đệm", "từ thêm vào để làm mềm câu", "softener", "'Hơi' là một từ đệm phổ biến.", "'Hơi' is a common softener.", "danh từ"),
      v("qua đời", "mất, chết", "to pass away", "Ông cụ đã qua đời năm ngoái.", "The old man passed away last year.", "động từ"),
      v("e rằng", "sợ rằng, lo rằng", "I am afraid that", "E rằng chúng ta cần thêm thời gian.", "I am afraid we need more time.", "cụm từ"),
      v("thẳng thắn", "nói trực tiếp, không vòng vo", "straightforward", "Có lúc cần thẳng thắn hơn.", "Sometimes being straightforward is necessary.", "tính từ"),
      v("hòa khí", "không khí hòa thuận", "harmony", "Cách nói này giữ được hòa khí.", "This phrasing preserves harmony.", "danh từ"),
      v("góp ý", "đưa ý kiến để người khác sửa", "to give feedback", "Tôi xin góp ý một chút.", "May I give a little feedback.", "động từ"),
      v("châm chước", "bỏ qua phần nào lỗi nhỏ", "to make allowance", "Xin châm chước cho lần đầu.", "Please make allowance for a first attempt.", "động từ"),
      v("cân nhắc", "suy xét trước khi quyết", "to consider carefully", "Anh cân nhắc lại phương án này nhé.", "Please consider this option again.", "động từ"),
    ],
    quiz: [
      q("Cách nói nào nhẹ nhất khi báo cáo chưa tốt?", "Which phrasing is gentlest for a weak report?", ["Báo cáo này chưa thuyết phục lắm.", "Báo cáo này dở.", "Báo cáo này sai bét.", "Báo cáo vô dụng."], 0, "'Chưa... lắm' vừa nêu vấn đề vừa mở đường sửa chữa.", "'Chưa... lắm' names the problem while leaving room to improve."),
      q("Vì sao 'chưa' mềm hơn 'không'?", "Why is 'chưa' softer than 'không'?", ["Vì hàm ý điều đó còn có thể thay đổi", "Vì ngắn hơn", "Vì dùng trong quá khứ", "Vì chỉ dùng cho người lớn"], 0, "'Chưa' mang nghĩa hiện tại chưa đạt nhưng sau có thể đạt.", "'Chưa' means not yet, implying future possibility."),
      q("Trường hợp nào KHÔNG nên nói giảm?", "When should you NOT soften?", ["Hướng dẫn an toàn lao động", "Nhận xét bài viết", "Góp ý cách trình bày", "Từ chối lời mời"], 0, "An toàn lao động cần thông tin chính xác, nói giảm gây nguy hiểm.", "Workplace safety needs exact information; softening is dangerous."),
      q("'E rằng chúng ta không kịp' thể hiện thái độ gì?", "What attitude does 'E rằng chúng ta không kịp' show?", ["Lo ngại nhưng lịch sự", "Tức giận", "Vui vẻ", "Ra lệnh"], 0, "'E rằng' nêu lo ngại một cách lịch sự, tránh quy trách nhiệm.", "'E rằng' voices concern politely without assigning blame."),
      q("Cách biến câu phê bình thành câu hỏi có tác dụng gì?", "Why turn criticism into a question?", ["Giảm áp lực và mời người kia cùng sửa", "Làm câu dài hơn", "Tránh phải nói thật", "Thể hiện quyền lực"], 0, "Câu hỏi mời hợp tác, người nghe ít cảm thấy bị chỉ trích.", "A question invites cooperation and feels less accusatory."),
    ],
  },
  {
    id: "vn-v11-gram-formal",
    title: "Ngôn ngữ trang trọng và kính ngữ",
    titleEn: "Formal Register and Honorifics",
    level: "advanced",
    theory: `## Ngôn ngữ trang trọng

### 1. Chọn đại từ đúng vai
| Tình huống | Tự gọi mình | Gọi người nghe |
|---|---|---|
| Với cấp trên, người lớn tuổi | em, cháu, tôi | anh, chị, cô, thầy, ông, bà |
| Văn bản hành chính | tôi, chúng tôi | Quý ông, Quý bà, Quý cơ quan |
| Trước tập thể | chúng tôi | Quý vị, các anh chị |

### 2. Từ trang trọng thay từ thường ngày
- xin phép thay cho muốn
- kính mời thay cho mời
- trân trọng thông báo thay cho nói cho biết
- vui lòng thay cho làm ơn

### 3. Kết thúc thư trang trọng
> Trân trọng cảm ơn và kính chúc Quý Anh/Chị sức khỏe.
> Trân trọng,

### 4. Lỗi thường gặp
- Dùng "bạn" với người lớn tuổi hoặc cấp trên.
- Trộn "ạ", "nhé" vào văn bản hành chính.
- Dùng "Quý vị" khi chỉ nói với một người thân quen.`,
    theoryEn: `## Formal register

Choose pronouns by role: em/cháu/tôi for yourself, anh/chị/cô/thầy/ông/bà for the listener, Quý vị or Quý cơ quan in official writing.

Swap everyday words for formal ones: xin phép for muốn, kính mời for mời, trân trọng thông báo for nói cho biết, vui lòng for làm ơn. Close letters with Trân trọng.

Avoid 'bạn' for seniors, avoid casual particles in official text, and avoid 'Quý vị' for a single familiar person.`,
    proTips: [
      "Không dùng 'bạn' với người lớn tuổi hoặc cấp trên.",
      "Văn bản hành chính không dùng 'nhé', 'ạ', 'ha'.",
      "Kết thư bằng 'Trân trọng,' rồi mới đến tên.",
    ],
    proTipsEn: [
      "Never use 'bạn' for seniors or superiors.",
      "Official text drops casual particles.",
      "End letters with 'Trân trọng,' then your name.",
    ],
    vocabulary: [
      v("kính ngữ", "từ ngữ thể hiện sự kính trọng", "honorific", "Tiếng Việt dùng kính ngữ qua đại từ.", "Vietnamese marks honorifics through pronouns.", "danh từ"),
      v("trân trọng", "một cách tôn kính", "respectfully", "Trân trọng kính mời Quý vị tham dự.", "We respectfully invite you to attend.", "trạng từ"),
      v("kính mời", "mời một cách trang trọng", "to cordially invite", "Kính mời thầy phát biểu.", "We cordially invite you to speak, sir.", "động từ"),
      v("vui lòng", "cách nói trang trọng của 'làm ơn'", "kindly", "Vui lòng gửi hồ sơ trước ngày 10.", "Kindly send the file before the 10th.", "trạng từ"),
      v("xin phép", "hỏi ý trước khi làm", "to ask permission", "Em xin phép trình bày.", "May I present, please.", "động từ"),
      v("cấp trên", "người có chức vụ cao hơn", "superior", "Báo cáo cần gửi cấp trên.", "The report must go to the superior.", "danh từ"),
      v("Quý vị", "cách gọi trang trọng nhiều người", "ladies and gentlemen", "Kính chào Quý vị.", "Greetings, ladies and gentlemen.", "đại từ"),
      v("hành chính", "thuộc quản lý, giấy tờ nhà nước", "administrative", "Văn bản hành chính có mẫu riêng.", "Administrative documents follow set templates.", "tính từ"),
      v("lịch thiệp", "có phép tắc, dễ chịu", "courteous", "Cách nói lịch thiệp tạo thiện cảm.", "Courteous speech creates goodwill.", "tính từ"),
      v("đơn xin", "văn bản đề nghị điều gì", "application letter", "Em viết đơn xin nghỉ phép.", "I wrote a leave application.", "danh từ"),
    ],
    quiz: [
      q("Cách gọi nào phù hợp khi viết cho một cơ quan?", "Which address suits a letter to an institution?", ["Kính gửi Quý cơ quan", "Gửi các bạn", "Chào cả nhà", "Này cơ quan"], 0, "'Kính gửi Quý cơ quan' là cách mở đầu trang trọng chuẩn.", "'Kính gửi Quý cơ quan' is the standard formal opening."),
      q("Từ nào trang trọng hơn 'làm ơn'?", "Which is more formal than 'làm ơn'?", ["vui lòng", "nhé", "đi", "luôn"], 0, "'Vui lòng' là dạng trang trọng, dùng trong văn bản và thông báo.", "'Vui lòng' is the formal equivalent used in documents."),
      q("Lỗi nào phổ biến trong thư trang trọng?", "Which mistake is common in formal letters?", ["Dùng 'nhé' cuối câu", "Dùng 'Trân trọng'", "Dùng 'Kính gửi'", "Dùng 'vui lòng'"], 0, "'Nhé' là khẩu ngữ, không dùng trong thư trang trọng.", "'Nhé' is colloquial and does not belong in formal letters."),
      q("Khi nói với thầy giáo, nên tự gọi mình là gì?", "Speaking to a teacher, how should you refer to yourself?", ["em", "bạn", "mày", "nó"], 0, "Học sinh tự gọi 'em' khi nói với thầy cô.", "Students call themselves 'em' when addressing teachers."),
      q("Kết thư trang trọng nên viết thế nào?", "How should a formal letter close?", ["Trân trọng,", "Bye nha,", "Hẹn gặp lại nhé,", "Thế thôi,"], 0, "'Trân trọng,' là cách kết thư trang trọng chuẩn mực.", "'Trân trọng,' is the standard formal sign-off."),
    ],
  },
  {
    id: "vn-v11-gram-email",
    title: "Viết email và đơn từ bằng tiếng Việt",
    titleEn: "Writing Vietnamese Emails and Applications",
    level: "advanced",
    theory: `## Email và đơn từ

### 1. Bố cục email công việc
1. **Tiêu đề**: nêu đúng việc, ví dụ "Đề nghị gia hạn hợp đồng số 12/2026".
2. **Lời chào**: Kính gửi anh Minh / Kính gửi Quý công ty.
3. **Mục đích**: Tôi viết thư này để đề nghị...
4. **Nội dung**: mỗi ý một đoạn ngắn, có mốc thời gian và số liệu.
5. **Đề nghị cụ thể**: Mong anh phản hồi trước 17h ngày 20/9.
6. **Kết**: Trân trọng cảm ơn. / Trân trọng,

### 2. Bố cục đơn từ
> CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
> Độc lập - Tự do - Hạnh phúc
> **ĐƠN XIN NGHỈ PHÉP**
> Kính gửi: Ban Giám hiệu Trường...
> Tên tôi là... Lý do... Thời gian... Tôi xin cam đoan...

### 3. Ba nguyên tắc vàng
- Mỗi email một việc.
- Câu ngắn, mỗi đoạn tối đa ba câu.
- Đề nghị phải có mốc thời gian rõ ràng.`,
    theoryEn: `## Emails and applications

A work email has six parts: a precise subject line, a formal greeting, a purpose sentence, short body paragraphs with dates and figures, a specific request with a deadline, and a formal close.

A Vietnamese application letter adds the national heading, a capitalised title, the recipient line, your details, the reason, the period requested and a commitment sentence.

Three rules: one topic per email, short sentences with at most three per paragraph, and every request carries a deadline.`,
    proTips: [
      "Tiêu đề email nên có số hợp đồng hoặc mã lớp để dễ tìm lại.",
      "Đính kèm phải nhắc trong thân thư: 'Tôi gửi kèm...'",
      "Đơn từ luôn có câu cam đoan ở cuối.",
    ],
    proTipsEn: [
      "Include a contract or class code in the subject line.",
      "Mention every attachment in the body.",
      "Application letters always end with a commitment sentence.",
    ],
    vocabulary: [
      v("tiêu đề thư", "dòng nêu nội dung email", "subject line", "Tiêu đề thư cần ngắn và cụ thể.", "The subject line must be short and specific.", "danh từ"),
      v("kính gửi", "cách mở đầu thư trang trọng", "Dear (formal)", "Kính gửi Ban Giám hiệu.", "Dear Board of Directors.", "cụm từ"),
      v("gửi kèm", "đính kèm tài liệu", "to attach", "Tôi gửi kèm bảng điểm.", "I attach the transcript.", "động từ"),
      v("phản hồi", "trả lời lại", "to respond", "Mong anh phản hồi trước thứ Sáu.", "Please respond before Friday.", "động từ"),
      v("đề nghị", "nêu yêu cầu", "to request", "Tôi đề nghị gia hạn thêm một tuần.", "I request a one-week extension.", "động từ"),
      v("cam đoan", "khẳng định chịu trách nhiệm", "to affirm", "Tôi xin cam đoan nội dung trên là đúng.", "I affirm the above is true.", "động từ"),
      v("gia hạn", "kéo dài thời hạn", "to extend a deadline", "Công ty đồng ý gia hạn hợp đồng.", "The company agreed to extend the contract.", "động từ"),
      v("hồ sơ", "bộ giấy tờ", "dossier, file", "Hồ sơ gồm ba giấy tờ.", "The file contains three documents.", "danh từ"),
      v("thời hạn", "mốc cuối phải hoàn thành", "deadline", "Thời hạn nộp là ngày 30.", "The deadline is the 30th.", "danh từ"),
      v("xác nhận", "khẳng định đã nhận hoặc đúng", "to confirm", "Vui lòng xác nhận đã nhận thư.", "Please confirm receipt.", "động từ"),
    ],
    quiz: [
      q("Tiêu đề email nào tốt nhất?", "Which subject line is best?", ["Đề nghị gia hạn hợp đồng số 12/2026", "Hỏi chút", "Việc quan trọng", "Xin chào"], 0, "Tiêu đề nêu đúng việc và có mã hợp đồng nên dễ tìm và xử lý.", "It names the exact matter with a reference number."),
      q("Câu nêu mục đích nên đặt ở đâu?", "Where should the purpose sentence go?", ["Ngay sau lời chào", "Ở dòng cuối", "Trong tiêu đề", "Trong phần đính kèm"], 0, "Nêu mục đích ngay sau lời chào giúp người đọc hiểu việc trong vài giây.", "Stating the purpose right after the greeting orients the reader instantly."),
      q("Đơn từ Việt Nam thường kết bằng câu nào?", "How do Vietnamese applications usually end?", ["Tôi xin cam đoan nội dung trên là đúng.", "Thế nhé.", "Cảm ơn nhiều lắm.", "Hẹn gặp lại."], 0, "Câu cam đoan là phần bắt buộc trong đơn từ.", "The affirmation sentence is a required part."),
      q("Một email nên chứa bao nhiêu việc chính?", "How many main topics should one email carry?", ["Một", "Ba", "Năm", "Càng nhiều càng tốt"], 0, "Mỗi email một việc giúp theo dõi và trả lời dễ hơn.", "One topic per email keeps tracking and replies simple."),
      q("Khi đính kèm tài liệu, cần làm gì?", "What must you do when attaching a file?", ["Nhắc tên tài liệu trong thân thư", "Không cần nói gì", "Chỉ ghi trong tiêu đề", "Gửi thư riêng"], 0, "Nhắc tên tài liệu giúp người nhận kiểm tra đủ hay thiếu.", "Naming the file lets the recipient check completeness."),
    ],
  },
  {
    id: "vn-v11-gram-idiom-speech",
    title: "Dùng thành ngữ trong hội thoại tự nhiên",
    titleEn: "Using Idioms in Natural Conversation",
    level: "advanced",
    theory: `## Thành ngữ trong hội thoại

### 1. Ba nhóm thành ngữ hay dùng
| Nhóm | Ví dụ | Nghĩa |
|---|---|---|
| Nhận xét công việc | chạy nước rút | dốc sức giai đoạn cuối |
| Nhận xét con người | ăn cơm nhà vác tù và hàng tổng | lo việc người khác quá mức |
| Nhận xét tình huống | trống đánh xuôi kèn thổi ngược | không ăn khớp nhau |

### 2. Cách chèn thành ngữ mượt
> Tuần này cả nhóm phải **chạy nước rút** cho kịp hạn.

Đặt thành ngữ ở vị trí động từ hoặc bổ ngữ, không tách rời giữa câu.

### 3. Ba lỗi làm câu nghe sai
1. Dịch từng chữ từ tiếng Anh, ví dụ nói "mưa mèo và chó".
2. Dùng thành ngữ nặng để trêu người mới gặp.
3. Nhồi hai ba thành ngữ vào một câu.

### 4. Mức độ phù hợp
Hội thoại thân mật dùng thoải mái. Họp công việc dùng vừa phải. Văn bản hợp đồng thì không dùng.`,
    theoryEn: `## Idioms in conversation

Three handy groups: commenting on work (chạy nước rút), on people (ăn cơm nhà vác tù và hàng tổng), on situations (trống đánh xuôi kèn thổi ngược).

Place an idiom in the verb or complement slot without splitting it. Avoid literal translations from English, avoid harsh idioms with strangers, and never stack several idioms in one sentence.

Use freely in casual talk, sparingly in meetings, never in contracts.`,
    vocabulary: [
      v("chạy nước rút", "dốc sức trong giai đoạn cuối", "to sprint to the finish", "Cả nhóm đang chạy nước rút.", "The whole team is sprinting to the finish.", "thành ngữ"),
      v("trống đánh xuôi kèn thổi ngược", "làm không ăn khớp nhau", "to work at cross purposes", "Hai phòng trống đánh xuôi kèn thổi ngược.", "The two departments work at cross purposes.", "thành ngữ"),
      v("nước đổ lá khoai", "khuyên mà không có tác dụng", "like water off a taro leaf", "Nói mãi mà như nước đổ lá khoai.", "All the advice ran off like water off a taro leaf.", "thành ngữ"),
      v("một vốn bốn lời", "lợi nhuận rất cao", "a fourfold return", "Việc này không phải một vốn bốn lời.", "This is no fourfold return.", "thành ngữ"),
      v("được đằng chân lân đằng đầu", "được nhượng bộ rồi đòi thêm", "to push one's luck", "Đừng được đằng chân lân đằng đầu.", "Do not push your luck.", "thành ngữ"),
      v("ba chân bốn cẳng", "rất gấp gáp", "in great haste", "Anh ấy ba chân bốn cẳng chạy tới.", "He came running in great haste.", "thành ngữ"),
      v("nói có đầu có cuối", "trình bày đầy đủ, rõ ràng", "to tell the whole story clearly", "Em nói có đầu có cuối cho rõ.", "Tell the whole story clearly.", "thành ngữ"),
      v("thuận buồm xuôi gió", "mọi việc suôn sẻ", "smooth sailing", "Chúc anh thuận buồm xuôi gió.", "Wishing you smooth sailing.", "thành ngữ"),
      v("giữ lời", "làm đúng điều đã hứa", "to keep one's word", "Anh ấy luôn giữ lời.", "He always keeps his word.", "động từ"),
      v("lỡ lời", "nói ra điều không nên nói", "to misspeak", "Tôi lỡ lời, xin anh bỏ qua.", "I misspoke, please forgive me.", "động từ"),
    ],
    quiz: [
      q("'Trống đánh xuôi kèn thổi ngược' miêu tả điều gì?", "What does 'trống đánh xuôi kèn thổi ngược' describe?", ["Hai bên làm không ăn khớp", "Một buổi hòa nhạc", "Công việc suôn sẻ", "Người rất giỏi"], 0, "Thành ngữ chỉ tình trạng hai bên hành động ngược nhau, không ăn khớp.", "The idiom describes two sides pulling in opposite directions."),
      q("Khi nào KHÔNG nên dùng thành ngữ?", "When should idioms be avoided?", ["Trong hợp đồng và văn bản pháp lý", "Khi nói với bạn", "Khi kể chuyện", "Khi động viên đồng nghiệp"], 0, "Hợp đồng cần nghĩa chính xác, thành ngữ dễ gây tranh chấp.", "Contracts need exact meaning; idioms invite disputes."),
      q("Câu nào dùng thành ngữ tự nhiên?", "Which sentence uses the idiom naturally?", ["Tuần này cả nhóm chạy nước rút cho kịp hạn.", "Tuần này nhóm chạy nước rút của kịp hạn hơn.", "Nhóm nước rút chạy tuần này.", "Chạy nhóm nước rút hạn kịp."], 0, "Thành ngữ đặt nguyên khối ở vị trí động từ, câu vẫn đúng ngữ pháp.", "The idiom stays intact in the verb slot and the grammar holds."),
      q("'Được đằng chân lân đằng đầu' nói về ai?", "Whom does 'được đằng chân lân đằng đầu' describe?", ["Người được nhượng bộ rồi đòi thêm", "Người đi bộ nhiều", "Người rất kiên trì", "Người hay giúp đỡ"], 0, "Thành ngữ phê phán người được nhường một chút liền đòi hỏi thêm.", "It criticises someone who, once given an inch, demands a mile."),
      q("Lỗi nào khiến câu có thành ngữ nghe kỳ?", "Which error makes an idiomatic sentence sound odd?", ["Nhồi hai ba thành ngữ vào một câu", "Dùng một thành ngữ đúng ngữ cảnh", "Giải thích thêm sau thành ngữ", "Dùng thành ngữ khi nói với bạn"], 0, "Nhiều thành ngữ trong một câu làm ý bị rối và nghe cường điệu.", "Stacked idioms muddle the idea and sound overblown."),
    ],
  },
];

const advancedGrammarLessons: VietnameseLesson[] = [
  {
    id: "vn-v11-gram-reported",
    title: "Câu tường thuật và cách dẫn lời",
    titleEn: "Reported Speech and Quoting",
    level: "advanced",
    theory: `## Dẫn lời trong tiếng Việt

Tiếng Việt không đổi thì động từ khi tường thuật, chỉ đổi đại từ và từ chỉ thời gian, nơi chốn.

### 1. Dẫn trực tiếp
> Minh nói: "Mai tôi đi Hà Nội."

### 2. Dẫn gián tiếp
> Minh nói **rằng** hôm sau **anh ấy** đi Hà Nội.

| Lời gốc | Khi tường thuật |
|---|---|
| tôi | anh ấy, chị ấy |
| mai | hôm sau |
| ở đây | ở đó |
| bây giờ | lúc đó |

### 3. Động từ dẫn thể hiện thái độ
- **nói rằng**: trung tính
- **cho biết**: trang trọng, dùng trong báo chí
- **khẳng định**: chắc chắn
- **thừa nhận**: nhận điều bất lợi
- **cho rằng**: chỉ là quan điểm

### 4. Lỗi thường gặp
Giữ nguyên "tôi" trong câu gián tiếp làm người đọc tưởng người viết tự nói.`,
    theoryEn: `## Reporting speech

Vietnamese verbs do not shift tense in reported speech. Only pronouns and time or place words change: tôi becomes anh ấy, mai becomes hôm sau, ở đây becomes ở đó.

Reporting verbs signal attitude: nói rằng (neutral), cho biết (formal, journalistic), khẳng định (assertive), thừa nhận (conceding), cho rằng (opinion only).

The usual error is leaving 'tôi' unchanged, which makes the writer seem to be speaking.`,
    vocabulary: [
      v("tường thuật", "kể lại lời người khác", "to report", "Bài báo tường thuật lời của bộ trưởng.", "The article reported the minister's words.", "động từ"),
      v("dẫn lời", "nhắc lại lời của ai", "to quote", "Phóng viên dẫn lời người dân.", "The reporter quoted residents.", "động từ"),
      v("trực tiếp", "nguyên văn, có dấu ngoặc kép", "direct", "Dẫn trực tiếp cần đúng nguyên văn.", "Direct quoting must be verbatim.", "tính từ"),
      v("gián tiếp", "kể lại bằng lời mình", "indirect", "Câu gián tiếp dùng từ 'rằng'.", "Indirect speech uses 'rằng'.", "tính từ"),
      v("cho biết", "nói ra thông tin, cách trang trọng", "to state", "Đại diện công ty cho biết dự án đã xong.", "The company representative stated the project was done.", "động từ"),
      v("khẳng định", "nói chắc chắn", "to affirm", "Ông khẳng định số liệu là chính xác.", "He affirmed the figures were accurate.", "động từ"),
      v("thừa nhận", "nhận điều không có lợi cho mình", "to admit", "Công ty thừa nhận đã chậm tiến độ.", "The company admitted the delay.", "động từ"),
      v("cho rằng", "nêu quan điểm cá nhân", "to hold the view", "Nhiều người cho rằng cần thêm thời gian.", "Many hold the view that more time is needed.", "động từ"),
      v("nguyên văn", "đúng từng chữ", "verbatim", "Xin dẫn nguyên văn câu nói.", "Please quote it verbatim.", "danh từ"),
      v("lược bớt", "bỏ đi phần không cần", "to abridge", "Câu dẫn được lược bớt nhưng giữ ý.", "The quote was abridged but kept its meaning.", "động từ"),
    ],
    quiz: [
      q("Chuyển 'Mai tôi đi Huế' sang gián tiếp thế nào?", "How do you report 'Mai tôi đi Huế'?", ["Anh ấy nói rằng hôm sau anh ấy đi Huế.", "Anh ấy nói rằng mai tôi đi Huế.", "Anh ấy nói mai tôi sẽ đi Huế nhé.", "Anh ấy nói rằng tôi đi Huế mai."], 0, "Cần đổi 'tôi' thành 'anh ấy' và 'mai' thành 'hôm sau'.", "'Tôi' becomes 'anh ấy' and 'mai' becomes 'hôm sau'."),
      q("Động từ nào phù hợp nhất cho báo chí trang trọng?", "Which verb suits formal journalism?", ["cho biết", "bảo", "kể", "hét"], 0, "'Cho biết' trung tính và trang trọng, rất phổ biến trên báo.", "'Cho biết' is neutral and formal, standard in the press."),
      q("'Thừa nhận' hàm ý gì?", "What does 'thừa nhận' imply?", ["Nhận một điều bất lợi cho mình", "Phủ nhận hoàn toàn", "Khen ngợi", "Hỏi lại"], 0, "'Thừa nhận' là nhận điều không có lợi cho bản thân.", "'Thừa nhận' means conceding something unfavourable."),
      q("Tiếng Việt có đổi thì động từ khi tường thuật không?", "Does Vietnamese shift verb tense in reported speech?", ["Không, chỉ đổi đại từ và từ chỉ thời gian", "Có, giống tiếng Anh", "Chỉ đổi khi dùng 'rằng'", "Chỉ đổi trong văn viết"], 0, "Tiếng Việt không biến đổi động từ, chỉ đổi đại từ và trạng từ thời gian, nơi chốn.", "Vietnamese verbs never inflect; only pronouns and time or place words change."),
      q("Lỗi nào khiến câu tường thuật gây hiểu sai?", "Which error causes misreading in reported speech?", ["Giữ nguyên 'tôi' của lời gốc", "Dùng 'rằng'", "Đổi 'mai' thành 'hôm sau'", "Dùng 'cho biết'"], 0, "Giữ 'tôi' làm người đọc tưởng chính người viết đang nói.", "Keeping 'tôi' makes readers think the writer is speaking."),
    ],
  },
  {
    id: "vn-v11-gram-classifier",
    title: "Loại từ và cách đếm chính xác",
    titleEn: "Classifiers and Precise Counting",
    level: "intermediate",
    theory: `## Loại từ trong tiếng Việt

Muốn đếm, tiếng Việt cần loại từ giữa số và danh từ: **ba con mèo**, không nói "ba mèo".

### 1. Bảng loại từ thường dùng
| Loại từ | Dùng cho | Ví dụ |
|---|---|---|
| con | động vật, một số đồ chuyển động | ba **con** cá, hai **con** dao |
| cái | đồ vật vô tri | một **cái** bàn |
| chiếc | đồ vật đơn lẻ, xe cộ | hai **chiếc** xe |
| quyển / cuốn | sách vở | bốn **quyển** sách |
| tờ | giấy, báo | năm **tờ** giấy |
| bức | tranh, ảnh, thư | một **bức** tranh |
| ngôi | nhà, chùa, sao | hai **ngôi** nhà |
| người | người, cách trung tính | ba **người** khách |

### 2. Cái và chiếc khác nhau ra sao
Cái là loại từ chung, chiếc nhấn vào từng đơn vị riêng lẻ. "Một chiếc giày" gợi ý còn thiếu chiếc kia.

### 3. Khi nào bỏ loại từ
Khi đếm đơn vị đo lường: hai lít nước, ba ki lô gạo, năm ngày.

### 4. Lỗi thường gặp
Dùng "cái" cho người là bất lịch sự, hãy dùng "người" hoặc "vị".`,
    theoryEn: `## Vietnamese classifiers

Counting needs a classifier between the number and the noun: ba con mèo, never 'ba mèo'.

Core set: con (animals), cái (inanimate things), chiếc (single items, vehicles), quyển or cuốn (books), tờ (sheets), bức (pictures, letters), ngôi (houses, temples, stars), người (people).

'Cái' is the general classifier; 'chiếc' highlights one unit of a pair. Drop classifiers with measure units (hai lít nước). Never use 'cái' for people; use 'người' or 'vị'.`,
    vocabulary: [
      v("loại từ", "từ đứng giữa số và danh từ", "classifier", "Tiếng Việt cần loại từ khi đếm.", "Vietnamese needs a classifier when counting.", "danh từ"),
      v("chiếc", "loại từ cho đồ vật đơn lẻ", "classifier for single items", "Tôi mua hai chiếc áo.", "I bought two shirts.", "loại từ"),
      v("quyển", "loại từ cho sách vở", "classifier for books", "Trên bàn có ba quyển sách.", "There are three books on the desk.", "loại từ"),
      v("bức", "loại từ cho tranh, thư", "classifier for pictures and letters", "Đây là bức thư của bà.", "This is grandmother's letter.", "loại từ"),
      v("ngôi", "loại từ cho nhà, chùa, sao", "classifier for houses and temples", "Làng có hai ngôi chùa cổ.", "The village has two ancient pagodas.", "loại từ"),
      v("tấm", "loại từ cho vật mỏng dẹt", "classifier for flat items", "Cho tôi một tấm vé.", "One ticket, please.", "loại từ"),
      v("đơn vị đo", "cách đo lường như lít, mét", "measure unit", "Đơn vị đo không cần loại từ.", "Measure units take no classifier.", "danh từ"),
      v("vị", "loại từ trang trọng cho người", "honorific classifier for people", "Xin mời hai vị khách vào.", "Please invite the two guests in.", "loại từ"),
      v("cặp", "hai vật đi liền nhau", "pair", "Một cặp bánh chưng.", "A pair of sticky rice cakes.", "danh từ"),
      v("bộ", "nhiều phần hợp thành một", "set", "Một bộ bàn ghế.", "A set of table and chairs.", "danh từ"),
    ],
    quiz: [
      q("Chọn cách đếm đúng.", "Choose the correct counting phrase.", ["ba con mèo", "ba mèo", "ba cái mèo con", "mèo ba con cái"], 0, "Động vật dùng loại từ 'con'.", "Animals take the classifier 'con'."),
      q("Loại từ nào dùng cho sách?", "Which classifier is used for books?", ["quyển", "tờ", "ngôi", "con"], 0, "Sách dùng 'quyển' hoặc 'cuốn'.", "Books take 'quyển' or 'cuốn'."),
      q("Cụm nào KHÔNG cần loại từ?", "Which phrase needs NO classifier?", ["hai lít nước", "hai xe đạp", "ba nhà", "bốn sách"], 0, "Đơn vị đo lường như lít, mét, ki lô không cần loại từ.", "Measure units such as litre, metre and kilo take no classifier."),
      q("Vì sao không nên nói 'cái người kia'?", "Why avoid 'cái người kia'?", ["Vì 'cái' dùng cho người là bất lịch sự", "Vì 'cái' chỉ dùng số nhiều", "Vì thiếu số đếm", "Vì sai chính tả"], 0, "Dùng 'cái' cho người mang sắc thái coi nhẹ, nên dùng 'người' hoặc 'vị'.", "Using 'cái' for people is belittling; use 'người' or 'vị'."),
      q("'Một chiếc giày' gợi ý điều gì?", "What does 'một chiếc giày' suggest?", ["Chỉ một trong đôi giày", "Một đôi giày mới", "Nhiều giày", "Giày rất đẹp"], 0, "'Chiếc' nhấn vào một đơn vị riêng lẻ nên gợi ý còn thiếu chiếc kia.", "'Chiếc' isolates one unit, implying the other is missing."),
    ],
  },
  {
    id: "vn-v11-gram-particles",
    title: "Tiểu từ tình thái: nhé, nhỉ, à, ạ, cơ",
    titleEn: "Sentence-final Particles: nhé, nhỉ, à, ạ, cơ",
    level: "intermediate",
    theory: `## Tiểu từ tình thái

Cùng một câu, đổi tiểu từ cuối là đổi cả thái độ.

| Tiểu từ | Sắc thái | Ví dụ |
|---|---|---|
| **nhé** | rủ rê, nhắc nhẹ | Mai gặp nhau **nhé**. |
| **nhỉ** | tìm sự đồng tình | Hôm nay lạnh **nhỉ**? |
| **à** | hỏi xác nhận, ngạc nhiên | Anh về rồi **à**? |
| **ạ** | lễ phép với người lớn | Cháu chào bà **ạ**. |
| **cơ** | nhấn ý muốn, hơi nũng nịu | Em muốn cái kia **cơ**. |
| **thôi** | giới hạn, kết thúc | Thế **thôi**. |
| **đấy** | nhắc chú ý | Cẩn thận **đấy**. |

### 1. Nguyên tắc quan trọng nhất
Với người lớn tuổi hoặc cấp trên, thêm **ạ** để giữ lễ phép. Câu thiếu "ạ" nghe khô và dễ bị coi là vô phép.

### 2. Không dùng trong văn bản
Tiểu từ là khẩu ngữ. Văn bản hành chính, báo cáo và hợp đồng không dùng.`,
    theoryEn: `## Sentence-final particles

The same sentence changes attitude with a different particle: nhé (inviting), nhỉ (seeking agreement), à (confirming or surprised), ạ (polite to elders), cơ (insisting, slightly coaxing), thôi (limiting), đấy (alerting).

Add 'ạ' with elders and superiors; omitting it sounds curt. Particles are spoken language and never appear in official documents.`,
    vocabulary: [
      v("tiểu từ", "từ nhỏ cuối câu thể hiện thái độ", "sentence-final particle", "Tiểu từ đổi thì thái độ cũng đổi.", "Change the particle and the attitude changes.", "danh từ"),
      v("tình thái", "thái độ của người nói", "modality", "Tiểu từ tình thái rất quan trọng khi nói.", "Modal particles matter greatly in speech.", "danh từ"),
      v("lễ phép", "biết kính trọng người lớn", "polite, well-mannered", "Nói có 'ạ' nghe lễ phép hơn.", "Adding 'ạ' sounds more polite.", "tính từ"),
      v("thân mật", "gần gũi, không khách sáo", "familiar, intimate", "'Nhé' dùng trong lời nói thân mật.", "'Nhé' belongs to familiar speech.", "tính từ"),
      v("đồng tình", "cùng ý kiến", "to agree", "'Nhỉ' mời người nghe đồng tình.", "'Nhỉ' invites the listener to agree.", "động từ"),
      v("khẩu ngữ", "lời nói hằng ngày", "colloquial language", "Tiểu từ thuộc khẩu ngữ.", "Particles belong to colloquial language.", "danh từ"),
      v("nũng nịu", "giọng dễ thương đòi hỏi", "coaxing, cutesy", "'Cơ' làm câu nghe nũng nịu.", "'Cơ' gives a coaxing tone.", "tính từ"),
      v("nhắc nhở", "lưu ý ai điều gì", "to remind", "'Đấy' dùng để nhắc nhở.", "'Đấy' serves to remind.", "động từ"),
      v("khô khan", "thiếu tình cảm", "curt, dry", "Câu không có tiểu từ nghe khô khan.", "A sentence without particles sounds curt.", "tính từ"),
      v("ngữ điệu", "cách lên xuống giọng", "intonation", "Ngữ điệu và tiểu từ đi cùng nhau.", "Intonation and particles work together.", "danh từ"),
    ],
    quiz: [
      q("Tiểu từ nào thể hiện lễ phép với người lớn?", "Which particle shows politeness to elders?", ["ạ", "cơ", "nhỉ", "đấy"], 0, "'Ạ' là tiểu từ lễ phép chuẩn mực.", "'Ạ' is the standard polite particle."),
      q("'Hôm nay lạnh nhỉ?' nhằm mục đích gì?", "What is the purpose of 'Hôm nay lạnh nhỉ?'", ["Tìm sự đồng tình của người nghe", "Ra lệnh", "Xin phép", "Từ chối"], 0, "'Nhỉ' mời người nghe cùng đồng tình với nhận xét.", "'Nhỉ' invites the listener to share the observation."),
      q("Câu nào phù hợp để rủ bạn?", "Which sentence suits inviting a friend?", ["Mai đi ăn phở nhé.", "Mai đi ăn phở ạ.", "Mai đi ăn phở đấy.", "Mai đi ăn phở cơ."], 0, "'Nhé' dùng để rủ rê, đề nghị nhẹ nhàng.", "'Nhé' softly invites or proposes."),
      q("Tiểu từ có nên dùng trong báo cáo công việc không?", "Should particles appear in a work report?", ["Không, vì đó là khẩu ngữ", "Có, để thân mật hơn", "Có, nếu viết cho cấp trên", "Chỉ dùng 'cơ'"], 0, "Báo cáo là văn bản, cần văn phong trung tính, không dùng tiểu từ.", "Reports need a neutral written register without particles."),
      q("'Cẩn thận đấy' mang sắc thái gì?", "What nuance does 'Cẩn thận đấy' carry?", ["Nhắc chú ý, cảnh báo nhẹ", "Khen ngợi", "Mời mọc", "Xin lỗi"], 0, "'Đấy' nhắc người nghe chú ý tới điều vừa nói.", "'Đấy' alerts the listener to what was just said."),
    ],
  },
  {
    id: "vn-v11-gram-comparison",
    title: "So sánh và mức độ trong tiếng Việt",
    titleEn: "Comparison and Degree in Vietnamese",
    level: "intermediate",
    theory: `## So sánh và mức độ

### 1. Bốn cấu trúc so sánh
| Kiểu | Cấu trúc | Ví dụ |
|---|---|---|
| Hơn | A + tính từ + **hơn** + B | Hà Nội lạnh **hơn** Sài Gòn. |
| Bằng | A + tính từ + **bằng / như** + B | Em cao **bằng** anh. |
| Kém | A + **không** + tính từ + **bằng** + B | Phòng này **không** rộng **bằng** phòng kia. |
| Nhất | A + tính từ + **nhất** | Đây là món ngon **nhất**. |

### 2. Thang mức độ
hơi < khá < rất < quá < cực kỳ

- **hơi** mặn: nhẹ, thường mang ý phàn nàn nhẹ
- **rất** ngon: mạnh, trung tính
- **quá** ngon: cảm thán, có thể là khen hoặc phàn nàn tùy ngữ điệu

### 3. Vị trí của 'lắm' và 'quá'
- **lắm** đứng sau tính từ: Ngon **lắm**!
- **quá** đứng trước hoặc sau: **Quá** ngon! / Ngon **quá**!

### 4. Lỗi thường gặp
Nói "rất hơn" hoặc "hơn nhất" là sai. Một câu chỉ chọn một cấu trúc so sánh.`,
    theoryEn: `## Comparison and degree

Four structures: hơn (more), bằng or như (equal), không... bằng (less), and nhất (most).

Degree scale: hơi (slightly) < khá (fairly) < rất (very) < quá (too, exclamatory) < cực kỳ (extremely). 'Lắm' follows the adjective; 'quá' may precede or follow.

Never combine markers as in 'rất hơn' or 'hơn nhất'.`,
    vocabulary: [
      v("so sánh", "đặt hai thứ cạnh nhau để xét", "to compare", "Bài tập yêu cầu so sánh hai vùng.", "The exercise asks you to compare two regions.", "động từ"),
      v("mức độ", "độ mạnh yếu của tính chất", "degree", "Từ chỉ mức độ đứng trước tính từ.", "Degree words precede the adjective.", "danh từ"),
      v("hơn", "nhiều hơn về mức độ", "more than", "Trà này đậm hơn trà kia.", "This tea is stronger than that one.", "trạng từ"),
      v("bằng", "ngang nhau", "as much as", "Em học giỏi bằng anh.", "You study as well as he does.", "trạng từ"),
      v("nhất", "cao nhất trong nhóm", "most", "Đây là bài khó nhất.", "This is the hardest exercise.", "trạng từ"),
      v("khá", "ở mức tương đối cao", "fairly", "Bài này khá dài.", "This text is fairly long.", "trạng từ"),
      v("cực kỳ", "ở mức rất cao", "extremely", "Món này cực kỳ cay.", "This dish is extremely spicy.", "trạng từ"),
      v("vượt trội", "tốt hơn rõ rệt", "outstanding", "Kết quả năm nay vượt trội.", "This year's results are outstanding.", "tính từ"),
      v("tương đương", "ngang mức nhau", "equivalent", "Hai phương án tương đương về chi phí.", "The two options are equivalent in cost.", "tính từ"),
      v("chênh lệch", "khoảng khác nhau", "gap, difference", "Chênh lệch giữa hai vùng rất lớn.", "The gap between the two regions is large.", "danh từ"),
    ],
    quiz: [
      q("Câu nào đúng ngữ pháp?", "Which sentence is grammatical?", ["Hà Nội lạnh hơn Sài Gòn.", "Hà Nội rất hơn lạnh Sài Gòn.", "Hà Nội lạnh hơn nhất Sài Gòn.", "Hà Nội hơn lạnh Sài Gòn."], 0, "Cấu trúc đúng là 'A + tính từ + hơn + B'.", "The correct pattern is 'A + adjective + hơn + B'."),
      q("Cách nào diễn tả 'kém hơn'?", "How do you express 'less than'?", ["không rộng bằng", "rộng hơn", "rộng nhất", "rất rộng"], 0, "'Không + tính từ + bằng' diễn tả mức kém hơn.", "'Không + adjective + bằng' expresses a lower degree."),
      q("Xếp mức độ nào đúng từ nhẹ đến mạnh?", "Which ordering runs weak to strong?", ["hơi - khá - rất - cực kỳ", "rất - hơi - khá - cực kỳ", "cực kỳ - rất - hơi - khá", "khá - cực kỳ - hơi - rất"], 0, "Thang mức độ thông dụng là hơi, khá, rất, cực kỳ.", "The common scale is hơi, khá, rất, cực kỳ."),
      q("'Lắm' đứng ở đâu trong câu?", "Where does 'lắm' go?", ["Sau tính từ", "Trước tính từ", "Đầu câu", "Trước chủ ngữ"], 0, "'Lắm' luôn đứng sau tính từ: ngon lắm, đẹp lắm.", "'Lắm' always follows the adjective."),
      q("'Món này quá mặn' có thể mang nghĩa gì?", "What can 'Món này quá mặn' mean?", ["Phàn nàn vì mặn vượt mức chịu được", "Khen rất ngon", "Nhận xét trung tính", "Hỏi cách nấu"], 0, "'Quá' vượt ngưỡng chấp nhận nên thường mang ý phàn nàn.", "'Quá' exceeds the acceptable threshold, so it usually complains."),
    ],
  },
  {
    id: "vn-v11-gram-time-markers",
    title: "Diễn tả thời gian: đã, đang, sẽ, vừa, sắp",
    titleEn: "Expressing Time: đã, đang, sẽ, vừa, sắp",
    level: "intermediate",
    theory: `## Diễn tả thời gian

Tiếng Việt không chia động từ. Thời gian nằm ở các từ chỉ thời và trạng ngữ.

| Từ | Ý nghĩa | Ví dụ |
|---|---|---|
| **đã** | việc đã xảy ra | Tôi **đã** gửi báo cáo. |
| **đang** | đang diễn ra | Họ **đang** họp. |
| **sẽ** | tương lai | Tôi **sẽ** trả lời sáng mai. |
| **vừa / mới** | vừa xảy ra rất gần | Anh ấy **vừa** về. |
| **sắp** | gần xảy ra | Trời **sắp** mưa. |
| **từng** | đã có kinh nghiệm | Tôi **từng** sống ở Huế. |
| **chưa** | còn chưa xảy ra | Tôi **chưa** ăn. |

### 1. Khi nào có thể bỏ từ chỉ thời
Nếu đã có trạng ngữ thời gian rõ ràng thì thường bỏ: "Hôm qua tôi gặp anh ấy" tự nhiên hơn "Hôm qua tôi đã gặp anh ấy".

### 2. Khác biệt 'chưa' và 'không'
- Tôi **chưa** ăn: sẽ ăn sau.
- Tôi **không** ăn: quyết định không ăn.

### 3. Lỗi thường gặp
Nhồi cả trạng ngữ và từ chỉ thời trong mọi câu làm văn nghe nặng.`,
    theoryEn: `## Expressing time

Vietnamese never inflects verbs. Time comes from markers and adverbs: đã (completed), đang (in progress), sẽ (future), vừa or mới (just now), sắp (about to), từng (once, experienced), chưa (not yet).

When a clear time adverb is present, the marker is usually dropped: 'Hôm qua tôi gặp anh ấy' sounds better than adding 'đã'.

'Chưa' means not yet, leaving the door open; 'không' is a settled negative.`,
    vocabulary: [
      v("từ chỉ thời", "từ cho biết thời điểm của hành động", "time marker", "'Đã' là từ chỉ thời quá khứ.", "'Đã' is a past time marker.", "danh từ"),
      v("trạng ngữ thời gian", "cụm nêu thời điểm", "time adverbial", "'Hôm qua' là trạng ngữ thời gian.", "'Hôm qua' is a time adverbial.", "danh từ"),
      v("vừa mới", "xảy ra rất gần đây", "just now", "Tôi vừa mới đến.", "I have just arrived.", "trạng từ"),
      v("sắp", "gần xảy ra", "about to", "Buổi học sắp bắt đầu.", "The class is about to begin.", "trạng từ"),
      v("từng", "đã có trải nghiệm trước đây", "once, used to", "Chị từng làm ở đó ba năm.", "She once worked there for three years.", "trạng từ"),
      v("liên tục", "không ngắt quãng", "continuously", "Trời mưa liên tục ba ngày.", "It rained continuously for three days.", "trạng từ"),
      v("thường xuyên", "hay xảy ra, đều đặn", "regularly", "Anh ấy thường xuyên đi công tác.", "He travels for work regularly.", "trạng từ"),
      v("đột ngột", "xảy ra bất ngờ", "suddenly", "Điện đột ngột mất.", "The power suddenly went out.", "trạng từ"),
      v("kịp", "đúng trước thời hạn", "in time", "Chúng ta làm kịp hạn.", "We finished in time.", "tính từ"),
      v("trước đó", "thời điểm sớm hơn", "beforehand", "Trước đó anh ấy đã gọi tôi.", "He had called me beforehand.", "trạng từ"),
    ],
    quiz: [
      q("'Tôi chưa ăn' khác 'Tôi không ăn' thế nào?", "How does 'Tôi chưa ăn' differ from 'Tôi không ăn'?", ["'Chưa' hàm ý sẽ ăn sau, 'không' là quyết định không ăn", "Hai câu giống nhau", "'Chưa' mạnh hơn", "'Không' nói về quá khứ"], 0, "'Chưa' để mở khả năng sẽ xảy ra; 'không' phủ định dứt khoát.", "'Chưa' keeps the possibility open; 'không' is a settled refusal."),
      q("Từ nào diễn tả hành động sắp xảy ra?", "Which marker means about to happen?", ["sắp", "đã", "từng", "vừa"], 0, "'Sắp' báo hiệu việc gần xảy ra.", "'Sắp' signals an imminent event."),
      q("Câu nào tự nhiên hơn?", "Which sounds more natural?", ["Hôm qua tôi gặp anh ấy.", "Hôm qua tôi đã đang gặp anh ấy.", "Hôm qua tôi sẽ gặp anh ấy.", "Hôm qua tôi vừa sắp gặp anh ấy."], 0, "Đã có trạng ngữ 'hôm qua' nên không cần thêm từ chỉ thời.", "With 'hôm qua' present, no marker is needed."),
      q("'Tôi từng sống ở Huế' hàm ý gì?", "What does 'Tôi từng sống ở Huế' imply?", ["Trước đây có sống, nay không còn", "Đang sống ở Huế", "Sẽ sống ở Huế", "Chưa bao giờ ở Huế"], 0, "'Từng' nói về trải nghiệm trong quá khứ, hiện không còn.", "'Từng' refers to a past experience no longer true."),
      q("Tiếng Việt thể hiện thời gian chủ yếu bằng cách nào?", "How does Vietnamese mainly mark time?", ["Dùng từ chỉ thời và trạng ngữ", "Biến đổi động từ", "Đổi thứ tự từ", "Thay đại từ"], 0, "Động từ không biến đổi, thời gian nằm ở từ chỉ thời và trạng ngữ.", "Verbs never change; time lives in markers and adverbials."),
    ],
  },
];

const commModule = grammarModules.find((mod) => mod.id === "vn-gram-adv-comm");
if (commModule) commModule.lessons.push(...communicationLessons);

const advModule = vietnameseLessonsExpansionModules.find((mod) => mod.id === "vn-adv-grammar");
if (advModule) advModule.lessons.push(...advancedGrammarLessons);
