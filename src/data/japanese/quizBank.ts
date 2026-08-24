/**
 * @file quizBank.ts
 * @description Extra Japanese N5 - N4 quiz questions (meaning, particles,
 *  sentence order, kanji). Correct answers are spread across all four
 *  positions so the quiz never leans on one option letter.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

export interface JaQuizExtraItem {
  q: string;
  options: string[];
  answer: number;
  explain_vi: string;
  explain_en: string;
}

export const JA_QUIZ_EXTRA: JaQuizExtraItem[] = [
  // --- Meaning ---
  { q: "「たべもの」 nghĩa là gì? / What does tabemono mean?", options: ["Đồ ăn / food", "Đồ uống / drink", "Quần áo / clothes", "Nhà cửa / house"], answer: 0, explain_vi: "食べ物 = đồ ăn.", explain_en: "食べ物 means food." },
  { q: "「がっこう」 là gì? / What is gakkou?", options: ["Bệnh viện / hospital", "Công ty / company", "Trường học / school", "Ga tàu / station"], answer: 2, explain_vi: "学校 = trường học.", explain_en: "学校 means school." },
  { q: "「あたらしい」 nghĩa là? / What does atarashii mean?", options: ["Cũ / old", "Đắt / expensive", "Rẻ / cheap", "Mới / new"], answer: 3, explain_vi: "新しい = mới, trái nghĩa với 古い.", explain_en: "新しい means new, opposite of 古い." },
  { q: "「いしゃ」 là nghề gì? / What job is isha?", options: ["Bác sĩ / doctor", "Giáo viên / teacher", "Đầu bếp / cook", "Tài xế / driver"], answer: 0, explain_vi: "医者 = bác sĩ.", explain_en: "医者 means doctor." },
  { q: "「さむい」 dùng để nói về gì? / What does samui describe?", options: ["Ngon / tasty", "Lạnh / cold", "Nóng / hot", "Vui / happy"], answer: 1, explain_vi: "寒い = lạnh (thời tiết).", explain_en: "寒い describes cold weather." },
  { q: "「えき」 là gì? / What is eki?", options: ["Sân bay / airport", "Bến xe buýt / bus stop", "Ga tàu / train station", "Cửa hàng / shop"], answer: 2, explain_vi: "駅 = ga tàu.", explain_en: "駅 means train station." },
  { q: "「いそがしい」 nghĩa là? / What does isogashii mean?", options: ["Rảnh / free", "Buồn / sad", "Yên tĩnh / quiet", "Bận / busy"], answer: 3, explain_vi: "忙しい = bận rộn.", explain_en: "忙しい means busy." },
  { q: "「やすみ」 nghĩa là? / What does yasumi mean?", options: ["Ngày nghỉ / day off", "Công việc / work", "Bài tập / homework", "Buổi họp / meeting"], answer: 0, explain_vi: "休み = kỳ nghỉ, ngày nghỉ.", explain_en: "休み means rest or day off." },
  { q: "「おいしい」 dùng khi nào? / When do you use oishii?", options: ["Khi trời mưa / when it rains", "Khi món ăn ngon / when food tastes good", "Khi mệt / when tired", "Khi muộn / when late"], answer: 1, explain_vi: "おいしい = ngon.", explain_en: "おいしい means delicious." },
  { q: "「ともだち」 là gì? / What is tomodachi?", options: ["Anh trai / older brother", "Thầy cô / teacher", "Bạn bè / friend", "Đồng nghiệp / colleague"], answer: 2, explain_vi: "友達 = bạn bè.", explain_en: "友達 means friend." },

  // --- Particles ---
  { q: "「わたし___がくせいです」 điền trợ từ nào? / Which particle?", options: ["は", "を", "に", "で"], answer: 0, explain_vi: "は đánh dấu chủ đề của câu.", explain_en: "は marks the topic of the sentence." },
  { q: "「バス___いきます」 điền gì? / Which particle for 'by bus'?", options: ["に", "で", "を", "が"], answer: 1, explain_vi: "で chỉ phương tiện: バスで = bằng xe buýt.", explain_en: "で marks the means: by bus." },
  { q: "「がっこう___いきます」 chỉ đích đến? / Marking destination?", options: ["を", "で", "へ", "も"], answer: 2, explain_vi: "へ (hoặc に) chỉ hướng, đích đến.", explain_en: "へ (or に) marks direction or destination." },
  { q: "「なに___たべますか」 điền gì? / Which particle?", options: ["は", "で", "に", "を"], answer: 3, explain_vi: "を đứng sau tân ngữ: 何を食べますか.", explain_en: "を follows the object: nani o tabemasu ka." },
  { q: "「七時___おきます」 chỉ thời điểm? / Marking a point in time?", options: ["に", "で", "を", "へ"], answer: 0, explain_vi: "に dùng với thời điểm cụ thể.", explain_en: "に is used with a specific time." },
  { q: "「ペン___あります」 chỉ sự tồn tại? / Marking existence?", options: ["を", "が", "へ", "の"], answer: 1, explain_vi: "が đứng trước あります/います.", explain_en: "が comes before あります/います." },
  { q: "「わたし___ほん」 chỉ sở hữu? / Marking possession?", options: ["に", "で", "の", "が"], answer: 2, explain_vi: "の nối hai danh từ, chỉ sở hữu.", explain_en: "の links nouns and shows possession." },
  { q: "「東京___大阪まで」 chỉ điểm bắt đầu? / Marking the starting point?", options: ["まで", "に", "で", "から"], answer: 3, explain_vi: "から = từ, まで = đến.", explain_en: "から means from, まで means until." },
  { q: "「コーヒー___おちゃ、どちらがいいですか」", options: ["と", "を", "に", "は"], answer: 0, explain_vi: "と nối hai danh từ ngang hàng (và).", explain_en: "と links two nouns (and)." },
  { q: "「あした ともだち___あいます」", options: ["を", "に", "で", "へ"], answer: 1, explain_vi: "会う đi với に: 友達に会います.", explain_en: "会う takes に: to meet someone." },

  // --- Grammar forms ---
  { q: "Dạng phủ định của 「たべます」? / Negative of tabemasu?", options: ["たべました", "たべたい", "たべません", "たべて"], answer: 2, explain_vi: "ます -> ません để phủ định lịch sự.", explain_en: "ます becomes ません for polite negative." },
  { q: "Dạng quá khứ của 「いきます」? / Past of ikimasu?", options: ["いきません", "いきたい", "いって", "いきました"], answer: 3, explain_vi: "ます -> ました cho quá khứ lịch sự.", explain_en: "ます becomes ました for polite past." },
  { q: "「~てください」 dùng để làm gì? / What is ~te kudasai for?", options: ["Nhờ, yêu cầu lịch sự / polite request", "Kể quá khứ / past story", "So sánh / comparison", "Phủ định / negation"], answer: 0, explain_vi: "Thể て + ください = xin hãy làm gì.", explain_en: "te-form + kudasai makes a polite request." },
  { q: "「~ています」 diễn tả gì? / What does ~te imasu express?", options: ["Dự đoán / guess", "Hành động đang diễn ra / ongoing action", "Câu hỏi / question", "Mệnh lệnh / order"], answer: 1, explain_vi: "て + います = đang làm.", explain_en: "te-form + imasu shows an ongoing action." },
  { q: "「のみたいです」 nghĩa là? / What does nomitai desu mean?", options: ["Đã uống / drank", "Không uống / do not drink", "Muốn uống / want to drink", "Đang uống / drinking"], answer: 2, explain_vi: "Bỏ ます + たい = muốn làm.", explain_en: "Drop ます and add たい to say 'want to'." },
  { q: "「~てもいいですか」 dùng khi nào? / When to use ~te mo ii desu ka?", options: ["Khi từ chối / refusing", "Khi khen / praising", "Khi cảm ơn / thanking", "Khi xin phép / asking permission"], answer: 3, explain_vi: "Xin phép: Tôi làm ... có được không?", explain_en: "It asks for permission: may I ...?" },
  { q: "「~なければなりません」 nghĩa là? / Meaning?", options: ["Phải làm / must do", "Không cần làm / need not", "Muốn làm / want to do", "Đã làm / did"], answer: 0, explain_vi: "Diễn tả nghĩa vụ, bắt buộc (N4).", explain_en: "It expresses obligation (N4)." },
  { q: "「~たことがあります」 nghĩa là? / Meaning?", options: ["Sẽ làm / will do", "Từng làm bao giờ / have done before", "Đang làm / doing now", "Không làm / do not do"], answer: 1, explain_vi: "Kinh nghiệm đã từng làm.", explain_en: "It states past experience." },
  { q: "Dạng khả năng của 「はなします」? / Potential form?", options: ["はなしました", "はなしたい", "はなせます", "はなしません"], answer: 2, explain_vi: "話せます = có thể nói (N4).", explain_en: "話せます means 'can speak' (N4)." },
  { q: "「~ほうがいいです」 dùng để? / Used for?", options: ["Xin lỗi / apologise", "Từ chối / refuse", "Đếm / count", "Khuyên nên làm / give advice"], answer: 3, explain_vi: "Nên làm gì thì tốt hơn.", explain_en: "It advises what is better to do." },

  // --- Sentence order ---
  { q: "Sắp xếp: わたし / は / パン / を / たべます", options: ["わたしはパンをたべます", "パンをわたしはたべます", "たべますわたしはパンを", "わたしをパンはたべます"], answer: 0, explain_vi: "Trật tự: Chủ đề - tân ngữ - động từ.", explain_en: "Order: topic - object - verb." },
  { q: "Sắp xếp: あした / ともだち / と / えいが / を / みます", options: ["えいがをあしたともだちとみます", "あしたともだちとえいがをみます", "ともだちとみますあしたえいがを", "みますあしたともだちとえいがを"], answer: 1, explain_vi: "Thời gian đứng đầu, động từ cuối câu.", explain_en: "Time comes first, the verb comes last." },
  { q: "Sắp xếp: この / ほん / は / とても / おもしろい / です", options: ["とてもこのほんはおもしろいです", "ほんはこのとてもおもしろいです", "このほんはとてもおもしろいです", "おもしろいですこのほんはとても"], answer: 2, explain_vi: "とても bổ nghĩa cho tính từ ngay trước nó.", explain_en: "とても modifies the adjective right after it." },
  { q: "Sắp xếp: にほんご / が / すこし / わかります", options: ["わかりますにほんごがすこし", "すこしわかりますにほんごが", "にほんごわかりますがすこし", "にほんごがすこしわかります"], answer: 3, explain_vi: "が đứng ngay sau danh từ đối tượng.", explain_en: "が follows the noun it marks." },

  // --- Kanji ---
  { q: "Kanji 「山」 đọc là gì? / How is 山 read?", options: ["やま (yama)", "かわ (kawa)", "うみ (umi)", "そら (sora)"], answer: 0, explain_vi: "山 = núi, âm Kun やま.", explain_en: "山 means mountain, kun reading yama." },
  { q: "「先生」 đọc thế nào? / How to read 先生?", options: ["がくせい", "せんせい", "しゃちょう", "かいしゃ"], answer: 1, explain_vi: "先生 = sensei, thầy cô.", explain_en: "先生 is sensei, teacher." },
  { q: "Kanji nào nghĩa là 'nước'? / Which kanji means water?", options: ["火", "木", "水", "金"], answer: 2, explain_vi: "水 = nước, đọc みず.", explain_en: "水 means water, read mizu." },
  { q: "「日本」 đọc là? / How to read 日本?", options: ["にちほん", "ひもと", "にっぽんじん", "にほん"], answer: 3, explain_vi: "日本 = Nihon, Nhật Bản.", explain_en: "日本 is Nihon, Japan." },
  { q: "Kanji 「食」 liên quan đến? / 食 relates to?", options: ["Ăn / eating", "Đi / going", "Xem / seeing", "Nghe / hearing"], answer: 0, explain_vi: "食べる = ăn.", explain_en: "食べる means to eat." },
  { q: "「時間」 nghĩa là? / What does 時間 mean?", options: ["Tiền / money", "Thời gian / time", "Nơi chốn / place", "Người / person"], answer: 1, explain_vi: "時間 = jikan, thời gian.", explain_en: "時間 is jikan, time." },
  { q: "Kanji 「学」 xuất hiện trong từ nào? / 学 appears in?", options: ["電車", "会社", "学生", "病院"], answer: 2, explain_vi: "学生 = gakusei, học sinh.", explain_en: "学生 is gakusei, student." },
  { q: "「大きい」 nghĩa là? / What does 大きい mean?", options: ["Nhỏ / small", "Xa / far", "Gần / near", "To lớn / big"], answer: 3, explain_vi: "大きい = to, lớn.", explain_en: "大きい means big." },

  // --- Counters and numbers ---
  { q: "Đếm ba quyển sách? / Counting three books?", options: ["さんさつ", "さんまい", "さんぼん", "さんにん"], answer: 0, explain_vi: "冊 dùng cho sách vở.", explain_en: "冊 counts books." },
  { q: "Đếm hai tờ giấy? / Counting two sheets of paper?", options: ["にほん", "にまい", "にさつ", "にだい"], answer: 1, explain_vi: "枚 dùng cho vật mỏng, phẳng.", explain_en: "枚 counts thin flat things." },
  { q: "Đếm một chiếc xe? / Counting one car?", options: ["いっぽん", "いちまい", "いちだい", "ひとり"], answer: 2, explain_vi: "台 dùng cho máy móc, xe cộ.", explain_en: "台 counts machines and vehicles." },
  { q: "「九時」 đọc là? / How to read 九時?", options: ["きゅうじ", "くじかん", "ここのじ", "くじ"], answer: 3, explain_vi: "九時 đọc là くじ (9 giờ).", explain_en: "九時 is read kuji (nine o'clock)." },
  { q: "「ようび」 nghĩa là? / What is youbi?", options: ["Thứ trong tuần / day of the week", "Tháng / month", "Năm / year", "Giờ / hour"], answer: 0, explain_vi: "曜日 = thứ, ví dụ 月曜日.", explain_en: "曜日 means day of the week, e.g. Monday." },
];
