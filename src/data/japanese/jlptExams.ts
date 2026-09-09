/**
 * @file jlptExams.ts
 * @description JLPT-style mock exams (N5, N4, N3) with vocabulary, kanji,
 *  grammar and reading sections. Bilingual explanations for every question.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

export interface JaExamQ {
  section: "vocab" | "kanji" | "grammar" | "reading";
  q: string;
  passage?: string;
  options: string[];
  answer: number;
  explain_vi: string;
  explain_en: string;
}

export interface JaMockExam {
  id: string;
  title_vi: string;
  title_en: string;
  level: "N5" | "N4" | "N3";
  minutes: number;
  questions: JaExamQ[];
}

const N5_READING_1 = `わたしは まいあさ ろくじに おきます。あさごはんを たべてから、じてんしゃで がっこうへ いきます。がっこうは いえから にじゅっぷんぐらいです。じゅぎょうは はちじ はんに はじまります。すいようびは ごご じゅぎょうが ありません。だから、すいようびは としょかんで にほんごを べんきょうします。`;

const N4_READING_1 = `先月、東京から大阪へ引っ越しました。新しい部屋は駅から歩いて七分で、家賃は前より少し高いですが、スーパーもコンビニも近いのでとても便利です。会社までは電車で三十分かかります。朝の電車はとても混んでいるので、いつも三十分早く家を出るようにしています。休みの日は近くの公園を散歩したり、友だちと料理を作ったりしています。`;

const N3_READING_1 = `日本では高齢化が進み、働く人の数が減っていると言われている。そのため、多くの会社が外国人の採用を増やしている。しかし、言葉や習慣の違いから、働き始めてすぐに辞めてしまう人も少なくない。ある調査によると、続けられた人の多くは、入社前に日本語だけでなく、会社の中の人間関係やあいさつの習慣についても学んでいたそうだ。技術だけを準備するのではなく、生活の面も準備しておくことが大切だと言えるだろう。`;

export const JA_MOCK_EXAMS: JaMockExam[] = [
  {
    id: "jlpt-n5-1", level: "N5", minutes: 25,
    title_vi: "Đề thử N5 - Số 1", title_en: "N5 mock test 1",
    questions: [
      { section: "vocab", q: "「まいあさ」 nghĩa là gì? / What does maiasa mean?", options: ["Mỗi sáng / every morning", "Mỗi tối / every evening", "Cuối tuần / weekend", "Buổi trưa / noon"], answer: 0, explain_vi: "毎朝 = mỗi buổi sáng.", explain_en: "毎朝 means every morning." },
      { section: "vocab", q: "「やすい」 nghĩa là gì? / What does yasui mean?", options: ["Đắt / expensive", "Rẻ / cheap", "Mới / new", "Xa / far"], answer: 1, explain_vi: "安い = rẻ.", explain_en: "安い means cheap." },
      { section: "kanji", q: "「水」 đọc là gì? / How do you read 水?", options: ["ひ", "き", "みず", "つち"], answer: 2, explain_vi: "水 = mizu, nước.", explain_en: "水 is read mizu." },
      { section: "kanji", q: "Kanji nào nghĩa là 'người'? / Which kanji means person?", options: ["日", "山", "口", "人"], answer: 3, explain_vi: "人 = ひと, người.", explain_en: "人 means person." },
      { section: "grammar", q: "つくえ（　）うえに ほんが あります。", options: ["の", "を", "が", "へ"], answer: 0, explain_vi: "Danh từ + の + vị trí.", explain_en: "Noun + の + position word." },
      { section: "grammar", q: "わたしは まいにち コーヒー（　）のみます。", options: ["が", "を", "に", "で"], answer: 1, explain_vi: "を đánh dấu tân ngữ trực tiếp.", explain_en: "を marks the direct object." },
      { section: "grammar", q: "きのう えいがを（　）。", options: ["みます", "みましょう", "みました", "みたい"], answer: 2, explain_vi: "きのう cần quá khứ ました.", explain_en: "きのう requires the past ました." },
      { section: "grammar", q: "この みずは（　）ないです。", options: ["おいしい", "おいしいで", "おいしいの", "おいしく"], answer: 3, explain_vi: "Tính từ い bỏ い + くない.", explain_en: "い-adjectives drop い and add くない." },
      { section: "reading", passage: N5_READING_1, q: "Người viết đi học bằng gì? / How does the writer go to school?", options: ["Xe đạp / by bicycle", "Tàu điện / by train", "Xe buýt / by bus", "Đi bộ / on foot"], answer: 0, explain_vi: "じてんしゃで = bằng xe đạp.", explain_en: "じてんしゃで means by bicycle." },
      { section: "reading", passage: N5_READING_1, q: "Giờ bắt đầu lớp học? / When do classes start?", options: ["6 giờ / 6:00", "8 giờ 30 / 8:30", "7 giờ 30 / 7:30", "9 giờ / 9:00"], answer: 1, explain_vi: "はちじはん = 8 giờ 30.", explain_en: "はちじはん is 8:30." },
      { section: "reading", passage: N5_READING_1, q: "Thứ Tư người viết làm gì? / What does the writer do on Wednesday?", options: ["Về nhà sớm / goes home early", "Đi làm thêm / works part-time", "Học tiếng Nhật ở thư viện / studies Japanese in the library", "Chơi thể thao / plays sports"], answer: 2, explain_vi: "すいようびは としょかんで べんきょうします.", explain_en: "On Wednesday they study in the library." },
      { section: "reading", passage: N5_READING_1, q: "Từ nhà đến trường mất bao lâu? / How long is the trip to school?", options: ["10 phút / 10 minutes", "30 phút / 30 minutes", "1 tiếng / an hour", "Khoảng 20 phút / about 20 minutes"], answer: 3, explain_vi: "にじゅっぷんぐらい = khoảng 20 phút.", explain_en: "にじゅっぷんぐらい is about 20 minutes." },
    ],
  },
  {
    id: "jlpt-n5-2", level: "N5", minutes: 25,
    title_vi: "Đề thử N5 - Số 2", title_en: "N5 mock test 2",
    questions: [
      { section: "vocab", q: "「えき」 nghĩa là gì? / What does eki mean?", options: ["Nhà ga / station", "Bưu điện / post office", "Bệnh viện / hospital", "Cửa hàng / shop"], answer: 0, explain_vi: "駅 = nhà ga.", explain_en: "駅 means station." },
      { section: "vocab", q: "「いそがしい」 nghĩa là gì? / What does isogashii mean?", options: ["Rảnh / free", "Bận / busy", "Vui / happy", "Mệt / tired"], answer: 1, explain_vi: "忙しい = bận rộn.", explain_en: "忙しい means busy." },
      { section: "kanji", q: "「先生」 đọc là gì? / How do you read 先生?", options: ["せんぱい", "がくせい", "せんせい", "しゅじん"], answer: 2, explain_vi: "先生 = sensei.", explain_en: "先生 is read sensei." },
      { section: "kanji", q: "Kanji nào nghĩa là 'đi'? / Which kanji means to go?", options: ["来", "見", "食", "行"], answer: 3, explain_vi: "行く = いく, đi.", explain_en: "行 is used in 行く, to go." },
      { section: "grammar", q: "としょかん（　）ほんを よみます。", options: ["で", "を", "が", "へ"], answer: 0, explain_vi: "で chỉ nơi diễn ra hành động.", explain_en: "で marks the place of an action." },
      { section: "grammar", q: "ともだち（　）でんわを かけます。", options: ["を", "に", "が", "の"], answer: 1, explain_vi: "に chỉ đối tượng nhận hành động.", explain_en: "に marks the recipient." },
      { section: "grammar", q: "この へやは（　）です。", options: ["しずかな", "しずかで", "しずか", "しずかに"], answer: 2, explain_vi: "Tính từ な đứng cuối câu bỏ な.", explain_en: "な-adjectives drop な at the end of a sentence." },
      { section: "grammar", q: "あした いっしょに（　）か。", options: ["いきました", "いきます", "いって", "いきませんか"], answer: 3, explain_vi: "ませんか dùng để mời rủ.", explain_en: "ませんか is used to invite someone." },
      { section: "reading", passage: N5_READING_1, q: "Người viết thức dậy lúc mấy giờ? / What time does the writer get up?", options: ["6 giờ / 6:00", "7 giờ / 7:00", "5 giờ / 5:00", "8 giờ / 8:00"], answer: 0, explain_vi: "ろくじに おきます = 6 giờ.", explain_en: "They get up at six." },
      { section: "reading", passage: N5_READING_1, q: "Việc nào làm trước khi đi học? / What comes before leaving for school?", options: ["Tắm / a bath", "Ăn sáng / breakfast", "Dọn phòng / tidying up", "Đọc báo / reading the paper"], answer: 1, explain_vi: "あさごはんを たべてから = sau khi ăn sáng.", explain_en: "They eat breakfast first." },
      { section: "reading", passage: N5_READING_1, q: "Câu nào đúng? / Which statement is true?", options: ["Trường rất xa / school is very far", "Người viết đi tàu / the writer takes the train", "Thứ Tư không có lớp buổi chiều / there are no Wednesday afternoon classes", "Người viết học ở nhà / the writer studies at home"], answer: 2, explain_vi: "すいようびは ごご じゅぎょうが ありません.", explain_en: "There are no Wednesday afternoon classes." },
      { section: "reading", passage: N5_READING_1, q: "Bài viết nói về điều gì? / What is the passage about?", options: ["Một chuyến du lịch / a trip", "Một bữa tiệc / a party", "Việc mua xe / buying a bike", "Sinh hoạt hằng ngày / a daily routine"], answer: 3, explain_vi: "Bài kể lại lịch sinh hoạt mỗi ngày.", explain_en: "It describes the writer's daily routine." },
    ],
  },
  {
    id: "jlpt-n4-1", level: "N4", minutes: 30,
    title_vi: "Đề thử N4 - Số 1", title_en: "N4 mock test 1",
    questions: [
      { section: "vocab", q: "「便利」 nghĩa là gì? / What does benri mean?", options: ["Tiện lợi / convenient", "Bất tiện / inconvenient", "Nguy hiểm / dangerous", "Ồn ào / noisy"], answer: 0, explain_vi: "便利 = tiện lợi.", explain_en: "便利 means convenient." },
      { section: "vocab", q: "「引っ越し」 nghĩa là gì? / What does hikkoshi mean?", options: ["Du lịch / travel", "Chuyển nhà / moving house", "Thi cử / an exam", "Nghỉ phép / leave"], answer: 1, explain_vi: "引っ越し = chuyển nhà.", explain_en: "引っ越し means moving house." },
      { section: "kanji", q: "「散歩」 đọc là gì? / How do you read 散歩?", options: ["さんぼう", "さんほ", "さんぽ", "ちらぽ"], answer: 2, explain_vi: "散歩 = sanpo, đi bộ dạo.", explain_en: "散歩 is read sanpo." },
      { section: "kanji", q: "Kanji nào nghĩa là 'đợi'? / Which kanji means to wait?", options: ["持", "使", "休", "待"], answer: 3, explain_vi: "待つ = まつ, đợi.", explain_en: "待 is used in 待つ, to wait." },
      { section: "grammar", q: "ごはんを たべ（　）、はを みがきます。", options: ["てから", "ながら", "たら", "ので"], answer: 0, explain_vi: "てから = sau khi làm xong.", explain_en: "てから means after finishing." },
      { section: "grammar", q: "テレビを 見（　）、ごはんを 食べます。", options: ["てから", "ながら", "ばかり", "ため"], answer: 1, explain_vi: "ながら = vừa làm A vừa làm B.", explain_en: "ながら links two simultaneous actions." },
      { section: "grammar", q: "毎日 走る（　）に しています。", options: ["こと", "ため", "よう", "もの"], answer: 2, explain_vi: "ようにしています = cố duy trì thói quen.", explain_en: "ようにしています describes an ongoing effort." },
      { section: "grammar", q: "この漢字が 読める（　）に なりました。", options: ["こと", "ため", "もの", "よう"], answer: 3, explain_vi: "ようになりました = đã trở nên làm được.", explain_en: "ようになりました marks a change in ability." },
      { section: "reading", passage: N4_READING_1, q: "Nhà mới cách ga bao lâu? / How far is the new flat from the station?", options: ["Đi bộ 7 phút / a seven-minute walk", "Đi bộ 15 phút / 15 minutes", "Đi tàu 7 phút / 7 minutes by train", "Đi xe đạp 10 phút / 10 minutes by bike"], answer: 0, explain_vi: "駅から歩いて七分.", explain_en: "It is a seven-minute walk." },
      { section: "reading", passage: N4_READING_1, q: "Vì sao người viết ra khỏi nhà sớm? / Why does the writer leave early?", options: ["Vì công ty xa / the office is far", "Vì tàu buổi sáng rất đông / the morning train is packed", "Vì hay ngủ muộn / they wake up late", "Vì phải mua đồ / they need to shop"], answer: 1, explain_vi: "朝の電車はとても混んでいる.", explain_en: "The morning train is very crowded." },
      { section: "reading", passage: N4_READING_1, q: "Ngày nghỉ người viết làm gì? / What does the writer do on days off?", options: ["Làm thêm giờ / works overtime", "Học tiếng Nhật / studies Japanese", "Đi bộ công viên và nấu ăn với bạn / walks in the park and cooks with friends", "Về quê / visits home"], answer: 2, explain_vi: "散歩したり、料理を作ったり.", explain_en: "They walk and cook with friends." },
      { section: "reading", passage: N4_READING_1, q: "Tiền thuê nhà mới thế nào? / What about the new rent?", options: ["Rẻ hơn nhiều / much cheaper", "Bằng như cũ / the same", "Không nói tới / not mentioned", "Hơi cao hơn trước / a little higher than before"], answer: 3, explain_vi: "前より少し高い.", explain_en: "It is a little higher than before." },
    ],
  },
  {
    id: "jlpt-n4-2", level: "N4", minutes: 30,
    title_vi: "Đề thử N4 - Số 2", title_en: "N4 mock test 2",
    questions: [
      { section: "vocab", q: "「予約」 nghĩa là gì? / What does yoyaku mean?", options: ["Đặt trước / reservation", "Hủy / cancellation", "Giảm giá / discount", "Trả lại / return"], answer: 0, explain_vi: "予約 = đặt chỗ trước.", explain_en: "予約 means reservation." },
      { section: "vocab", q: "「そうだん」 nghĩa là gì? / What does sōdan mean?", options: ["Giải thích / explanation", "Trao đổi, xin ý kiến / consultation", "Thông báo / announcement", "Khiếu nại / complaint"], answer: 1, explain_vi: "相談 = trao đổi, xin ý kiến.", explain_en: "相談 means to consult." },
      { section: "kanji", q: "「試験」 đọc là gì? / How do you read 試験?", options: ["しっけん", "しげん", "しけん", "じけん"], answer: 2, explain_vi: "試験 = shiken, kỳ thi.", explain_en: "試験 is read shiken." },
      { section: "kanji", q: "Kanji nào nghĩa là 'dạy'? / Which kanji means to teach?", options: ["習", "覚", "忘", "教"], answer: 3, explain_vi: "教える = おしえる, dạy.", explain_en: "教 is used in 教える, to teach." },
      { section: "grammar", q: "ここで 写真を（　）ください。", options: ["撮らないで", "撮って", "撮る", "撮った"], answer: 0, explain_vi: "ないでください = xin đừng làm.", explain_en: "ないでください means please do not." },
      { section: "grammar", q: "早く 寝た（　）が いいですよ。", options: ["こと", "ほう", "とき", "まえ"], answer: 1, explain_vi: "たほうがいい = nên làm gì.", explain_en: "たほうがいい gives advice." },
      { section: "grammar", q: "雨が 降る（　）、試合は 中止です。", options: ["ので", "から", "なら", "のに"], answer: 2, explain_vi: "なら nêu điều kiện giả định.", explain_en: "なら sets a hypothetical condition." },
      { section: "grammar", q: "たくさん 勉強した（　）、点が 悪かったです。", options: ["ので", "から", "なら", "のに"], answer: 3, explain_vi: "のに = mặc dù ... nhưng, kèm cảm giác tiếc.", explain_en: "のに expresses an unexpected contrast." },
      { section: "reading", passage: N4_READING_1, q: "Người viết chuyển từ đâu tới đâu? / Where did the writer move from and to?", options: ["Tokyo tới Osaka / Tokyo to Osaka", "Osaka tới Tokyo / Osaka to Tokyo", "Kyoto tới Osaka / Kyoto to Osaka", "Tokyo tới Kyoto / Tokyo to Kyoto"], answer: 0, explain_vi: "東京から大阪へ引っ越しました.", explain_en: "From Tokyo to Osaka." },
      { section: "reading", passage: N4_READING_1, q: "Tới công ty mất bao lâu? / How long is the commute?", options: ["7 phút / 7 minutes", "30 phút bằng tàu / 30 minutes by train", "1 tiếng / an hour", "15 phút / 15 minutes"], answer: 1, explain_vi: "電車で三十分かかります.", explain_en: "Thirty minutes by train." },
      { section: "reading", passage: N4_READING_1, q: "Vì sao nói khu mới tiện lợi? / Why is the new area convenient?", options: ["Vì gần công ty / it is near the office", "Vì rẻ / it is cheap", "Vì có siêu thị và konbini gần / a supermarket and convenience store are close", "Vì yên tĩnh / it is quiet"], answer: 2, explain_vi: "スーパーもコンビニも近い.", explain_en: "Both a supermarket and a convenience store are nearby." },
      { section: "reading", passage: N4_READING_1, q: "Thái độ của người viết về nhà mới? / How does the writer feel about the flat?", options: ["Thất vọng / disappointed", "Không rõ / unclear", "Muốn chuyển tiếp / wants to move again", "Nhìn chung hài lòng / broadly satisfied"], answer: 3, explain_vi: "Giọng văn tích cực: とても便利です.", explain_en: "The tone is positive: とても便利です." },
    ],
  },
  {
    id: "jlpt-n3-1", level: "N3", minutes: 35,
    title_vi: "Đề thử N3 - Số 1", title_en: "N3 mock test 1",
    questions: [
      { section: "vocab", q: "「採用」 nghĩa là gì? / What does saiyō mean?", options: ["Tuyển dụng / hiring", "Nghỉ việc / resignation", "Đào tạo / training", "Thăng chức / promotion"], answer: 0, explain_vi: "採用 = tuyển dụng, nhận vào làm.", explain_en: "採用 means hiring." },
      { section: "vocab", q: "「習慣」 nghĩa là gì? / What does shūkan mean?", options: ["Kỹ năng / skill", "Tập quán, thói quen / custom, habit", "Quy định / rule", "Kinh nghiệm / experience"], answer: 1, explain_vi: "習慣 = tập quán, thói quen.", explain_en: "習慣 means custom or habit." },
      { section: "kanji", q: "「人間関係」 đọc là gì? / How do you read 人間関係?", options: ["にんげんかんれい", "じんかんかんけい", "にんげんかんけい", "ひとまかんけい"], answer: 2, explain_vi: "人間関係 = ningen kankei, quan hệ giữa người với người.", explain_en: "人間関係 is read ningen kankei." },
      { section: "kanji", q: "Kanji nào nghĩa là 'giảm'? / Which kanji means to decrease?", options: ["増", "続", "配", "減"], answer: 3, explain_vi: "減る = へる, giảm.", explain_en: "減 is used in 減る, to decrease." },
      { section: "grammar", q: "台風なので、中止（　）を得ない。", options: ["せざる", "しざる", "するざる", "されざる"], answer: 0, explain_vi: "する đổi thành せざるを得ない.", explain_en: "する becomes せざるを得ない." },
      { section: "grammar", q: "レベル（　）応じて教材を変えます。", options: ["を", "に", "が", "で"], answer: 1, explain_vi: "に応じて là cụm cố định.", explain_en: "に応じて is a fixed pattern." },
      { section: "grammar", q: "全部覚えた（　）ではありません。", options: ["はず", "つもり", "わけ", "こと"], answer: 2, explain_vi: "わけではない = không hẳn là.", explain_en: "わけではない softens a denial." },
      { section: "grammar", q: "彼は疲れている（　）ない。", options: ["わけが", "ものが", "ことが", "に違い"], answer: 3, explain_vi: "に違いない = nhất định là.", explain_en: "に違いない expresses strong certainty." },
      { section: "reading", passage: N3_READING_1, q: "Vì sao nhiều công ty tăng tuyển người nước ngoài? / Why are companies hiring more foreign staff?", options: ["Vì số người lao động giảm / the working population is shrinking", "Vì lương thấp hơn / wages are lower", "Vì họ nói nhiều ngoại ngữ / they speak more languages", "Vì chính phủ yêu cầu / the government requires it"], answer: 0, explain_vi: "高齢化 làm số người làm việc giảm.", explain_en: "Ageing has reduced the number of workers." },
      { section: "reading", passage: N3_READING_1, q: "Vì sao có người bỏ việc sớm? / Why do some people quit early?", options: ["Vì lương thấp / low pay", "Vì khác biệt ngôn ngữ và tập quán / language and custom differences", "Vì giờ làm dài / long hours", "Vì nhà xa / long commute"], answer: 1, explain_vi: "言葉や習慣の違いから.", explain_en: "Because of language and custom differences." },
      { section: "reading", passage: N3_READING_1, q: "Người trụ lại được thường đã chuẩn bị gì? / What did those who stayed prepare?", options: ["Chỉ tiếng Nhật / only Japanese", "Chỉ kỹ thuật / only technical skills", "Cả quan hệ và nghi thức trong công ty / workplace relations and greeting customs too", "Bằng cấp cao / higher degrees"], answer: 2, explain_vi: "Học cả 人間関係 và あいさつの習慣.", explain_en: "They also learned workplace relations and greeting customs." },
      { section: "reading", passage: N3_READING_1, q: "Kết luận của bài là gì? / What is the conclusion?", options: ["Chỉ cần giỏi tiếng Nhật / Japanese alone is enough", "Nên làm việc ở nước mình / work at home instead", "Công ty phải trả lương cao / firms must pay more", "Phải chuẩn bị cả mặt sinh hoạt / life skills must be prepared too"], answer: 3, explain_vi: "生活の面も準備しておくことが大切.", explain_en: "Preparing for daily life matters too." },
    ],
  },
  {
    id: "jlpt-n3-2", level: "N3", minutes: 35,
    title_vi: "Đề thử N3 - Số 2", title_en: "N3 mock test 2",
    questions: [
      { section: "vocab", q: "「対策」 nghĩa là gì? / What does taisaku mean?", options: ["Biện pháp đối phó / countermeasure", "Kết quả / result", "Nguyên nhân / cause", "Mục tiêu / target"], answer: 0, explain_vi: "対策 = biện pháp đối phó.", explain_en: "対策 means countermeasure." },
      { section: "vocab", q: "「物価」 nghĩa là gì? / What does bukka mean?", options: ["Giá trị bản thân / self-worth", "Giá cả hàng hoá / commodity prices", "Chất lượng / quality", "Số lượng / quantity"], answer: 1, explain_vi: "物価 = mức giá hàng hoá chung.", explain_en: "物価 means the general price level." },
      { section: "kanji", q: "「経済」 và 「経験」 khác chữ nào? / Which kanji differs between 経済 and 経験?", options: ["経", "済 và 験", "済", "験"], answer: 1, explain_vi: "Chữ 経 giống nhau, khác ở 済 và 験.", explain_en: "経 is shared; 済 and 験 differ." },
      { section: "kanji", q: "「認める」 đọc là gì? / How do you read 認める?", options: ["きめる", "とめる", "はじめる", "みとめる"], answer: 3, explain_vi: "認める = mitomeru, thừa nhận.", explain_en: "認める is read mitomeru." },
      { section: "grammar", q: "彼は今日来る（　）です。", options: ["はず", "ばかり", "わけ", "つもりない"], answer: 0, explain_vi: "はずです = suy đoán có căn cứ.", explain_en: "はずです is a grounded expectation." },
      { section: "grammar", q: "今、駅に着いた（　）です。", options: ["ほど", "ばかり", "だけ", "しか"], answer: 1, explain_vi: "た + ばかり = vừa mới.", explain_en: "た + ばかり means just now." },
      { section: "grammar", q: "子どもはよく転ぶ（　）です。", options: ["わけ", "はず", "もの", "つもり"], answer: 2, explain_vi: "ものだ nói lẽ thường.", explain_en: "ものだ states a general truth." },
      { section: "grammar", q: "もう一度 説明して（　）ませんか。", options: ["ください", "くれ", "あげ", "いただけ"], answer: 3, explain_vi: "いただけませんか là mức nhờ lịch sự nhất.", explain_en: "いただけませんか is the most polite request." },
      { section: "reading", passage: N3_READING_1, q: "Câu nào phù hợp với bài? / Which fits the passage?", options: ["Người nước ngoài dễ trụ lại nếu chuẩn bị kỹ / foreigners stay longer when well prepared", "Không công ty nào tuyển người nước ngoài / no company hires foreigners", "Tiếng Nhật không quan trọng / Japanese does not matter", "Số người lao động đang tăng / the workforce is growing"], answer: 0, explain_vi: "Bài nhấn vào việc chuẩn bị trước khi vào công ty.", explain_en: "The passage stresses preparation before joining." },
      { section: "reading", passage: N3_READING_1, q: "「少なくない」 trong bài nghĩa là gì? / What does 少なくない mean here?", options: ["Rất ít / very few", "Không ít, khá nhiều / quite a few", "Không có ai / nobody", "Đúng một nửa / exactly half"], answer: 1, explain_vi: "少なくない = không ít, tức khá nhiều.", explain_en: "少なくない means quite a few." },
      { section: "reading", passage: N3_READING_1, q: "「と言われている」 thể hiện điều gì? / What does と言われている show?", options: ["Ý kiến riêng người viết / the writer's own opinion", "Một mệnh lệnh / an order", "Điều người ta nói chung / what is generally said", "Một dự đoán chắc chắn / a certain prediction"], answer: 2, explain_vi: "と言われている truyền đạt quan niệm chung.", explain_en: "と言われている reports what is generally said." },
      { section: "reading", passage: N3_READING_1, q: "Bài dựa vào đâu để nói về người trụ lại? / What supports the claim about those who stayed?", options: ["Kinh nghiệm người viết / the writer's experience", "Tin trên báo / a newspaper story", "Lời của giám đốc / a manager's words", "Một khảo sát / a survey"], answer: 3, explain_vi: "ある調査によると = theo một khảo sát.", explain_en: "ある調査によると means according to a survey." },
    ],
  },
];

const N5_READING_3 = `わたしの へやは ちいさいですが、あかるいです。まどの ちかくに つくえと いすが あります。つくえの うえに パソコンと ほんが あります。ベッドは まどの まえに あります。まいばん ねるまえに にほんごの ことばを じゅっこ おぼえます。どようびは そうじを して、へやの はなに みずを やります。`;

const N4_READING_3 = `わたしは 二年前から 日本語を 習っています。はじめは 漢字が 覚えられなくて、やめようと 思ったこともありました。でも、先生に 「毎日 少しずつ 続けたほうがいいですよ」と 言われて、朝 十分だけ 練習するようにしました。今では 新聞の やさしい 記事なら 読めるように なりました。来年は N3を 受けてみるつもりです。`;

const N3_READING_3 = `最近、家で 働く人が 増えている。通勤の 時間が なくなるので、家族と 過ごす 時間が 長くなったという 声も 多い。一方で、仕事と 生活の 区別が つきにくく、夜も つい パソコンを 開いてしまう人もいるらしい。ある会社では、決まった 時間に なると 社内の システムが 使えなくなる 仕組みを 作った。働き方を 変えるには、個人の 努力だけでなく、会社の 工夫も 必要だろう。`;

const EXTRA_EXAMS: JaMockExam[] = [
  {
    id: "jlpt-n5-3", level: "N5", minutes: 25,
    title_vi: "Đề thử N5 - Số 3", title_en: "N5 mock test 3",
    questions: [
      { section: "vocab", q: "「あかるい」 nghĩa là gì? / What does akarui mean?", options: ["Sáng / bright", "Tối / dark", "Rộng / spacious", "Ồn / noisy"], answer: 0, explain_vi: "明るい = sáng.", explain_en: "明るい means bright." },
      { section: "vocab", q: "「そうじ」 nghĩa là gì? / What does souji mean?", options: ["Giặt / laundry", "Dọn dẹp / cleaning", "Nấu ăn / cooking", "Mua sắm / shopping"], answer: 1, explain_vi: "そうじ = dọn dẹp.", explain_en: "そうじ means cleaning." },
      { section: "kanji", q: "「花」 đọc là gì? / How do you read 花?", options: ["やま", "かわ", "はな", "そら"], answer: 2, explain_vi: "花 = はな, hoa.", explain_en: "花 is read はな, flower." },
      { section: "kanji", q: "Kanji nào nghĩa là 'nghe'? / Which kanji means to listen?", options: ["読", "書", "話", "聞"], answer: 3, explain_vi: "聞く = きく, nghe.", explain_en: "聞 is used in 聞く, to listen." },
      { section: "grammar", q: "つくえの うえに ほんが（　）。", options: ["あります", "います", "です", "しました"], answer: 0, explain_vi: "Vật vô tri dùng あります.", explain_en: "Inanimate things take あります." },
      { section: "grammar", q: "ねる（　）に はを みがきます。", options: ["あと", "まえ", "とき", "ころ"], answer: 1, explain_vi: "Vる + まえに = trước khi làm gì.", explain_en: "Dictionary form + まえに means before doing." },
      { section: "grammar", q: "きょうしつで しゃしんを とっては（　）。", options: ["いいです", "ください", "いけません", "たいです"], answer: 2, explain_vi: "ては いけません = không được làm.", explain_en: "てはいけません means must not." },
      { section: "grammar", q: "この へやは ちいさいですが、（　）です。", options: ["きれいく", "きれいだ", "きれいの", "きれい"], answer: 3, explain_vi: "Tính từ な đứng trước です giữ nguyên.", explain_en: "な-adjectives stay plain before です." },
      { section: "reading", passage: N5_READING_3, q: "Trên bàn có gì? / What is on the desk?", options: ["Máy tính và sách / a computer and books", "Hoa / flowers", "Giường / a bed", "Ghế / a chair"], answer: 0, explain_vi: "つくえの うえに パソコンと ほん.", explain_en: "A computer and books are on the desk." },
      { section: "reading", passage: N5_READING_3, q: "Giường đặt ở đâu? / Where is the bed?", options: ["Cạnh cửa / by the door", "Trước cửa sổ / in front of the window", "Trên bàn / on the desk", "Trong tủ / in the closet"], answer: 1, explain_vi: "ベッドは まどの まえ.", explain_en: "The bed is in front of the window." },
      { section: "reading", passage: N5_READING_3, q: "Mỗi tối người viết làm gì? / What does the writer do every night?", options: ["Dọn phòng / cleans the room", "Tưới hoa / waters flowers", "Học 10 từ tiếng Nhật / learns ten Japanese words", "Xem tivi / watches TV"], answer: 2, explain_vi: "ねるまえに ことばを じゅっこ おぼえます.", explain_en: "They memorise ten words before bed." },
      { section: "reading", passage: N5_READING_3, q: "Thứ Bảy người viết làm gì? / What happens on Saturday?", options: ["Đi học / goes to school", "Đi làm / works", "Gặp bạn / meets friends", "Dọn phòng và tưới hoa / cleans and waters the flowers"], answer: 3, explain_vi: "どようびは そうじを して、はなに みずを やります.", explain_en: "On Saturday they clean and water the flowers." },
    ],
  },
  {
    id: "jlpt-n4-3", level: "N4", minutes: 30,
    title_vi: "Đề thử N4 - Số 3", title_en: "N4 mock test 3",
    questions: [
      { section: "vocab", q: "「習う」 nghĩa là gì? / What does narau mean?", options: ["Học (từ ai) / to learn from someone", "Dạy / to teach", "Nhớ / to remember", "Quên / to forget"], answer: 0, explain_vi: "習う = học từ người khác.", explain_en: "習う means to learn from someone." },
      { section: "vocab", q: "「記事」 nghĩa là gì? / What does kiji mean?", options: ["Tạp chí / magazine", "Bài báo / article", "Quảng cáo / advert", "Thông báo / notice"], answer: 1, explain_vi: "記事 = bài báo.", explain_en: "記事 means article." },
      { section: "kanji", q: "「練習」 đọc là gì? / How do you read 練習?", options: ["れんしゅ", "れんしゅうう", "れんしゅう", "れんしょう"], answer: 2, explain_vi: "練習 = れんしゅう.", explain_en: "練習 is read renshuu." },
      { section: "kanji", q: "Kanji nào nghĩa là 'nhận, thi (kỳ thi)'? / Which kanji is used for taking an exam?", options: ["買", "売", "作", "受"], answer: 3, explain_vi: "受ける = うける, dự thi.", explain_en: "受 is used in 受ける, to take an exam." },
      { section: "grammar", q: "毎日 少しずつ 続けた（　）が いいです。", options: ["ほう", "こと", "もの", "ため"], answer: 0, explain_vi: "たほうがいい = nên làm.", explain_en: "たほうがいい means had better." },
      { section: "grammar", q: "朝 十分だけ 練習する（　）に しています。", options: ["こと", "よう", "そう", "とき"], answer: 1, explain_vi: "ようにしている = cố gắng duy trì thói quen.", explain_en: "ようにしている shows an ongoing effort." },
      { section: "grammar", q: "やさしい 記事なら（　）ように なりました。", options: ["読み", "読んで", "読める", "読もう"], answer: 2, explain_vi: "Thể khả năng + ようになる = đã trở nên có thể.", explain_en: "Potential form + ようになる means came to be able to." },
      { section: "grammar", q: "来年 N3を 受けて（　）つもりです。", options: ["みた", "みて", "みない", "みる"], answer: 3, explain_vi: "てみるつもり = dự định thử.", explain_en: "てみるつもり means intend to try." },
      { section: "reading", passage: N4_READING_3, q: "Người viết học tiếng Nhật bao lâu? / How long has the writer studied Japanese?", options: ["Hai năm / two years", "Hai tháng / two months", "Năm năm / five years", "Một năm / one year"], answer: 0, explain_vi: "二年前から.", explain_en: "Since two years ago." },
      { section: "reading", passage: N4_READING_3, q: "Lúc đầu điều gì khiến người viết muốn bỏ? / What made the writer want to quit?", options: ["Phát âm / pronunciation", "Không nhớ được kanji / could not memorise kanji", "Học phí / tuition fees", "Bạn học / classmates"], answer: 1, explain_vi: "漢字が 覚えられなくて.", explain_en: "They could not memorise kanji." },
      { section: "reading", passage: N4_READING_3, q: "Cô giáo khuyên gì? / What did the teacher advise?", options: ["Học nhiều vào cuối tuần / study a lot at weekends", "Đổi sách / change books", "Mỗi ngày học một ít / keep going a little each day", "Nghỉ một thời gian / take a break"], answer: 2, explain_vi: "毎日 少しずつ 続けたほうがいい.", explain_en: "Keep going a little every day." },
      { section: "reading", passage: N4_READING_3, q: "Kế hoạch năm sau? / What is the plan for next year?", options: ["Sang Nhật / go to Japan", "Đi làm / start working", "Học thêm kanji / study more kanji", "Thi N3 / take the N3 exam"], answer: 3, explain_vi: "来年は N3を 受けてみるつもり.", explain_en: "They intend to try the N3." },
    ],
  },
  {
    id: "jlpt-n3-3", level: "N3", minutes: 35,
    title_vi: "Đề thử N3 - Số 3", title_en: "N3 mock test 3",
    questions: [
      { section: "vocab", q: "「通勤」 nghĩa là gì? / What does tsuukin mean?", options: ["Đi làm / commuting to work", "Đi học / commuting to school", "Đi công tác / business trip", "Đi du lịch / travelling"], answer: 0, explain_vi: "通勤 = đi lại tới nơi làm việc.", explain_en: "通勤 means commuting to work." },
      { section: "vocab", q: "「区別」 nghĩa là gì? / What does kubetsu mean?", options: ["Kết hợp / combination", "Sự phân biệt / distinction", "Thứ tự / order", "Quy tắc / rule"], answer: 1, explain_vi: "区別 = sự phân biệt, tách bạch.", explain_en: "区別 means distinction." },
      { section: "kanji", q: "「工夫」 đọc là gì? / How do you read 工夫?", options: ["こうふ", "くうふ", "くふう", "こうふう"], answer: 2, explain_vi: "工夫 = くふう, sự tìm cách cải thiện.", explain_en: "工夫 is read kufuu." },
      { section: "kanji", q: "Kanji nào nghĩa là 'tăng lên'? / Which kanji means to increase?", options: ["減", "変", "続", "増"], answer: 3, explain_vi: "増える = ふえる, tăng lên.", explain_en: "増 is used in 増える, to increase." },
      { section: "grammar", q: "家で 働く人が 増えている（　）だ。", options: ["そう", "よう", "らしい", "はず"], answer: 0, explain_vi: "そうだ truyền đạt thông tin nghe được.", explain_en: "そうだ reports hearsay." },
      { section: "grammar", q: "仕事と 生活の 区別が つき（　）。", options: ["やすい", "にくい", "がちだ", "そうだ"], answer: 1, explain_vi: "にくい = khó làm được điều gì.", explain_en: "にくい means hard to do." },
      { section: "grammar", q: "決まった 時間に なると システムが 使え（　）なる。", options: ["ないで", "なくて", "なく", "ずに"], answer: 2, explain_vi: "使えなくなる = trở nên không dùng được.", explain_en: "使えなくなる means becomes unusable." },
      { section: "grammar", q: "個人の 努力（　）、会社の 工夫も 必要だ。", options: ["だけで", "からで", "ようで", "だけでなく"], answer: 3, explain_vi: "だけでなく = không chỉ ... mà còn.", explain_en: "だけでなく means not only." },
      { section: "reading", passage: N3_READING_3, q: "Lợi ích được nêu của làm việc tại nhà? / What benefit is mentioned?", options: ["Nhiều thời gian cho gia đình / more time with family", "Lương cao hơn / higher pay", "Ít họp hơn / fewer meetings", "Nhà rộng hơn / a bigger home"], answer: 0, explain_vi: "家族と 過ごす 時間が 長くなった.", explain_en: "More time spent with family." },
      { section: "reading", passage: N3_READING_3, q: "Vấn đề được nêu là gì? / What problem is mentioned?", options: ["Internet chậm / slow internet", "Khó tách bạch việc và đời sống / work and life blur together", "Đồng nghiệp ít nói / quiet colleagues", "Chi phí điện / electricity costs"], answer: 1, explain_vi: "区別が つきにくい.", explain_en: "The line between work and life blurs." },
      { section: "reading", passage: N3_READING_3, q: "Công ty trong bài đã làm gì? / What did one company do?", options: ["Giảm giờ họp / cut meeting time", "Thuê thêm người / hired more staff", "Khoá hệ thống sau giờ quy định / locks the system after set hours", "Cho nghỉ thứ Sáu / gave Fridays off"], answer: 2, explain_vi: "決まった 時間に システムが 使えなくなる.", explain_en: "The system becomes unusable after a set time." },
      { section: "reading", passage: N3_READING_3, q: "Kết luận của bài? / What is the conclusion?", options: ["Nên về công ty làm / return to the office", "Nên làm ít giờ hơn / work fewer hours", "Cá nhân phải tự cố gắng / individuals must try harder", "Cần cả nỗ lực cá nhân và cách làm của công ty / both personal effort and company measures are needed"], answer: 3, explain_vi: "個人の 努力だけでなく、会社の 工夫も 必要.", explain_en: "Both personal effort and company measures are needed." },
    ],
  },
];

JA_MOCK_EXAMS.push(...EXTRA_EXAMS);

/** Keep the list grouped N5 -> N4 -> N3 so learners climb in order. */
const LEVEL_ORDER: Record<JaMockExam["level"], number> = { N5: 0, N4: 1, N3: 2 };
JA_MOCK_EXAMS.sort((a, b) => LEVEL_ORDER[a.level] - LEVEL_ORDER[b.level] || a.id.localeCompare(b.id));
