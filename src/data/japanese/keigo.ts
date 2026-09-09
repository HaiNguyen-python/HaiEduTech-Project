/**
 * @file keigo.ts
 * @description Keigo bank: polite / humble / honorable equivalents plus situational
 *  phrases for school, part-time work and business settings.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

export interface JaKeigoRow {
  id: string;
  plain: string;
  polite: string;
  sonkei: string; // honorific, about the other person
  kenjo: string; // humble, about yourself
  romaji: string;
  vi: string;
  en: string;
  note_vi: string;
  note_en: string;
}

export interface JaKeigoPhrase {
  id: string;
  scene_vi: string;
  scene_en: string;
  jp: string;
  romaji: string;
  vi: string;
  en: string;
  when_vi: string;
  when_en: string;
}

export const JA_KEIGO_ROWS: JaKeigoRow[] = [
  { id: "kg-01", plain: "する", polite: "します", sonkei: "なさる", kenjo: "いたす", romaji: "suru / nasaru / itasu", vi: "làm", en: "to do", note_vi: "いたします rất hay dùng khi tự giới thiệu công việc.", note_en: "いたします is very common when describing your own actions." },
  { id: "kg-02", plain: "行く", polite: "行きます", sonkei: "いらっしゃる", kenjo: "参る", romaji: "iku / irassharu / mairu", vi: "đi", en: "to go", note_vi: "いらっしゃる dùng cho cả đi, đến và có mặt.", note_en: "いらっしゃる covers going, coming and being present." },
  { id: "kg-03", plain: "来る", polite: "来ます", sonkei: "いらっしゃる", kenjo: "参る", romaji: "kuru / irassharu / mairu", vi: "đến", en: "to come", note_vi: "Khi khách đến, nói よくいらっしゃいました.", note_en: "Greet an arriving guest with よくいらっしゃいました." },
  { id: "kg-04", plain: "いる", polite: "います", sonkei: "いらっしゃる", kenjo: "おる", romaji: "iru / irassharu / oru", vi: "có, ở", en: "to be present", note_vi: "Trên điện thoại: ただいま席におりません.", note_en: "On the phone: ただいま席におりません (he is away from his desk)." },
  { id: "kg-05", plain: "言う", polite: "言います", sonkei: "おっしゃる", kenjo: "申す", romaji: "iu / ossharu / mōsu", vi: "nói", en: "to say", note_vi: "Tự giới thiệu: ハイと申します.", note_en: "Introduce yourself with ハイと申します." },
  { id: "kg-06", plain: "見る", polite: "見ます", sonkei: "ご覧になる", kenjo: "拝見する", romaji: "miru / goran ni naru / haiken suru", vi: "xem", en: "to look at", note_vi: "拝見しました dùng khi đã đọc email, tài liệu.", note_en: "Use 拝見しました after reading an email or document." },
  { id: "kg-07", plain: "食べる", polite: "食べます", sonkei: "召し上がる", kenjo: "いただく", romaji: "taberu / meshiagaru / itadaku", vi: "ăn", en: "to eat", note_vi: "Mời khách: どうぞ召し上がってください.", note_en: "Invite a guest with どうぞ召し上がってください." },
  { id: "kg-08", plain: "聞く", polite: "聞きます", sonkei: "お聞きになる", kenjo: "伺う", romaji: "kiku / o-kiki ni naru / ukagau", vi: "hỏi, nghe", en: "to ask, to hear", note_vi: "伺ってもよろしいでしょうか là cách hỏi lịch sự nhất.", note_en: "伺ってもよろしいでしょうか is the most polite way to ask." },
  { id: "kg-09", plain: "知る", polite: "知っています", sonkei: "ご存じです", kenjo: "存じております", romaji: "shiru / gozonji desu / zonjite orimasu", vi: "biết", en: "to know", note_vi: "Phủ định lịch sự: 存じません.", note_en: "The polite negative is 存じません." },
  { id: "kg-10", plain: "会う", polite: "会います", sonkei: "お会いになる", kenjo: "お目にかかる", romaji: "au / o-ai ni naru / o-me ni kakaru", vi: "gặp", en: "to meet", note_vi: "Lần đầu gặp: お目にかかれてうれしいです.", note_en: "At a first meeting: お目にかかれてうれしいです." },
  { id: "kg-11", plain: "もらう", polite: "もらいます", sonkei: "お受け取りになる", kenjo: "頂戴する", romaji: "morau / o-uketori ni naru / chōdai suru", vi: "nhận", en: "to receive", note_vi: "いただく cũng dùng rất phổ biến.", note_en: "いただく is also extremely common." },
  { id: "kg-12", plain: "あげる", polite: "あげます", sonkei: "くださる", kenjo: "差し上げる", romaji: "ageru / kudasaru / sashiageru", vi: "cho, tặng", en: "to give", note_vi: "くださる dùng khi cấp trên cho mình.", note_en: "くださる is used when a superior gives you something." },
  { id: "kg-13", plain: "思う", polite: "思います", sonkei: "お思いになる", kenjo: "存じる", romaji: "omou / o-omoi ni naru / zonjiru", vi: "nghĩ", en: "to think", note_vi: "Trong email: ～と存じます nghe rất trang trọng.", note_en: "In email, ～と存じます sounds very formal." },
  { id: "kg-14", plain: "待つ", polite: "待ちます", sonkei: "お待ちになる", kenjo: "お待ちする", romaji: "matsu / o-machi ni naru / o-machi suru", vi: "đợi", en: "to wait", note_vi: "少々お待ちください là câu cửa miệng khi phục vụ.", note_en: "少々お待ちください is the standard service phrase." },
  { id: "kg-15", plain: "帰る", polite: "帰ります", sonkei: "お帰りになる", kenjo: "失礼する", romaji: "kaeru / o-kaeri ni naru / shitsurei suru", vi: "về", en: "to go home", note_vi: "Khi ra khỏi công ty: お先に失礼します.", note_en: "When leaving work: お先に失礼します." },
  { id: "kg-16", plain: "する（依頼）", polite: "してください", sonkei: "ご～ください", kenjo: "お～いたします", romaji: "shite kudasai / go-... kudasai / o-... itashimasu", vi: "nhờ vả, đề nghị", en: "requests and offers", note_vi: "Công thức: お＋động từ ます＋いたします.", note_en: "Pattern: お + verb stem + いたします." },
];

export const JA_KEIGO_PHRASES: JaKeigoPhrase[] = [
  { id: "kp-01", scene_vi: "Ở trường", scene_en: "At school", jp: "先生、質問してもよろしいでしょうか。", romaji: "Sensei, shitsumon shite mo yoroshii deshō ka.", vi: "Thưa thầy, em có thể hỏi một câu không?", en: "May I ask a question, teacher?", when_vi: "Khi muốn hỏi giữa giờ học.", when_en: "When you want to ask during class." },
  { id: "kp-02", scene_vi: "Ở trường", scene_en: "At school", jp: "課題の締め切りを伺ってもよろしいですか。", romaji: "Kadai no shimekiri o ukagatte mo yoroshii desu ka.", vi: "Em xin hỏi hạn nộp bài tập là khi nào?", en: "May I ask when the assignment is due?", when_vi: "Khi cần xác nhận hạn nộp.", when_en: "When confirming a deadline." },
  { id: "kp-03", scene_vi: "Ở trường", scene_en: "At school", jp: "資料を拝見しました。ありがとうございます。", romaji: "Shiryō o haiken shimashita. Arigatō gozaimasu.", vi: "Em đã xem tài liệu. Em xin cảm ơn.", en: "I have read the materials. Thank you.", when_vi: "Trả lời email của giáo viên.", when_en: "Replying to a teacher's email." },
  { id: "kp-04", scene_vi: "Việc làm thêm", scene_en: "Part-time job", jp: "いらっしゃいませ。少々お待ちください。", romaji: "Irasshaimase. Shōshō o-machi kudasai.", vi: "Xin chào quý khách. Xin đợi một chút.", en: "Welcome. Please wait a moment.", when_vi: "Khi khách vừa vào cửa hàng.", when_en: "When a customer walks in." },
  { id: "kp-05", scene_vi: "Việc làm thêm", scene_en: "Part-time job", jp: "こちらでよろしいでしょうか。", romaji: "Kochira de yoroshii deshō ka.", vi: "Cái này có ổn với quý khách không?", en: "Would this be all right for you?", when_vi: "Khi xác nhận đơn hàng.", when_en: "When confirming an order." },
  { id: "kp-06", scene_vi: "Việc làm thêm", scene_en: "Part-time job", jp: "申し訳ございません。ただいま在庫がございません。", romaji: "Mōshiwake gozaimasen. Tadaima zaiko ga gozaimasen.", vi: "Tôi rất xin lỗi. Hiện tại chúng tôi hết hàng.", en: "I am very sorry. We are out of stock at the moment.", when_vi: "Khi phải từ chối khách.", when_en: "When you must decline a customer request." },
  { id: "kp-07", scene_vi: "Việc làm thêm", scene_en: "Part-time job", jp: "本日はお休みをいただきたく、ご連絡いたしました。", romaji: "Honjitsu wa o-yasumi o itadakitaku, go-renraku itashimashita.", vi: "Tôi liên lạc vì hôm nay muốn xin nghỉ.", en: "I am contacting you because I would like to take today off.", when_vi: "Khi xin nghỉ ca làm.", when_en: "When requesting a day off from a shift." },
  { id: "kp-08", scene_vi: "Công ty", scene_en: "Business", jp: "ハイと申します。どうぞよろしくお願いいたします。", romaji: "Hai to mōshimasu. Dōzo yoroshiku onegai itashimasu.", vi: "Tôi tên là Hải. Rất mong được giúp đỡ.", en: "My name is Hai. I look forward to working with you.", when_vi: "Tự giới thiệu buổi đầu.", when_en: "Introducing yourself for the first time." },
  { id: "kp-09", scene_vi: "Công ty", scene_en: "Business", jp: "恐れ入りますが、もう一度お願いできますでしょうか。", romaji: "Osoreirimasu ga, mō ichido onegai dekimasu deshō ka.", vi: "Xin thất lễ, anh/chị có thể nhắc lại giúp tôi không?", en: "Excuse me, could you please repeat that?", when_vi: "Khi chưa nghe rõ.", when_en: "When you did not catch something." },
  { id: "kp-10", scene_vi: "Công ty", scene_en: "Business", jp: "承知いたしました。すぐに対応いたします。", romaji: "Shōchi itashimashita. Sugu ni taiō itashimasu.", vi: "Tôi đã hiểu. Tôi sẽ xử lý ngay.", en: "Understood. I will take care of it right away.", when_vi: "Khi nhận chỉ thị từ cấp trên.", when_en: "When accepting an instruction from a superior." },
  { id: "kp-11", scene_vi: "Công ty", scene_en: "Business", jp: "お忙しいところ恐縮ですが、ご確認をお願いいたします。", romaji: "O-isogashii tokoro kyōshuku desu ga, go-kakunin o onegai itashimasu.", vi: "Xin lỗi vì làm mất thời gian, mong anh/chị kiểm tra giúp.", en: "Sorry to trouble you while you are busy, but please check this.", when_vi: "Trong email nhờ xác nhận.", when_en: "In an email asking for a review." },
  { id: "kp-12", scene_vi: "Công ty", scene_en: "Business", jp: "お先に失礼いたします。", romaji: "O-saki ni shitsurei itashimasu.", vi: "Tôi xin phép về trước.", en: "Please excuse me for leaving first.", when_vi: "Khi tan làm trước đồng nghiệp.", when_en: "When you leave the office before colleagues." },
];
