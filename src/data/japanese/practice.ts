/**
 * @file practice.ts
 * @description Listening comprehension items and kana dictation items for the
 *  Japanese course. Every entry is bilingual (Vietnamese + English).
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

export interface JaListeningItem {
  id: string;
  level: "N5" | "N4" | "N3";
  /** Text spoken aloud (never shown before the learner answers). */
  audio: string;
  romaji: string;
  question_vi: string;
  question_en: string;
  options: string[];
  answer: number;
  explain_vi: string;
  explain_en: string;
}

export interface JaDictationItem {
  id: string;
  level: "N5" | "N4" | "N3";
  /** Spoken form; learners type it back in kana or romaji. */
  audio: string;
  kana: string;
  romaji: string;
  vi: string;
  en: string;
}

export const JA_LISTENING: JaListeningItem[] = [
  { id: "ls-01", level: "N5", audio: "いま、さんじはんです。", romaji: "Ima, san-ji han desu.", question_vi: "Bây giờ là mấy giờ?", question_en: "What time is it now?", options: ["3 giờ 30 / 3:30", "3 giờ 13 / 3:13", "4 giờ 30 / 4:30", "2 giờ 30 / 2:30"], answer: 0, explain_vi: "さんじはん = 3 giờ rưỡi.", explain_en: "さんじはん means half past three." },
  { id: "ls-02", level: "N5", audio: "わたしのかばんはつくえのしたにあります。", romaji: "Watashi no kaban wa tsukue no shita ni arimasu.", question_vi: "Cái cặp ở đâu?", question_en: "Where is the bag?", options: ["Trên bàn / on the desk", "Dưới bàn / under the desk", "Cạnh bàn / beside the desk", "Trong tủ / in the cupboard"], answer: 1, explain_vi: "下 = phía dưới.", explain_en: "下 means under." },
  { id: "ls-03", level: "N5", audio: "きょうはあめですから、かさをもっていきます。", romaji: "Kyō wa ame desu kara, kasa o motte ikimasu.", question_vi: "Vì sao người nói mang dù?", question_en: "Why is the speaker taking an umbrella?", options: ["Vì có tuyết / because of snow", "Vì trời nắng / because it is sunny", "Vì trời mưa / because it is raining", "Vì có bão / because of a typhoon"], answer: 2, explain_vi: "あめですから = vì trời mưa.", explain_en: "あめですから means because it is raining." },
  { id: "ls-04", level: "N5", audio: "すみません、このでんしゃはとうきょうへいきますか。", romaji: "Sumimasen, kono densha wa Tōkyō e ikimasu ka.", question_vi: "Người nói đang làm gì?", question_en: "What is the speaker doing?", options: ["Mua vé / buying a ticket", "Đặt khách sạn / booking a hotel", "Gọi món / ordering food", "Hỏi tàu có đi Tokyo không / asking if the train goes to Tokyo"], answer: 3, explain_vi: "～へいきますか = hỏi tàu có đi tới đó không.", explain_en: "～へいきますか asks whether it goes there." },
  { id: "ls-05", level: "N4", audio: "しゅくだいをしてから、ともだちとえいがをみました。", romaji: "Shukudai o shite kara, tomodachi to eiga o mimashita.", question_vi: "Việc nào xảy ra trước?", question_en: "Which happened first?", options: ["Làm bài tập / the homework", "Xem phim / the film", "Cả hai cùng lúc / both at once", "Không rõ / unclear"], answer: 0, explain_vi: "してから = làm xong bài tập trước.", explain_en: "してから marks the homework as first." },
  { id: "ls-06", level: "N4", audio: "でんしゃがおくれているので、かいぎにまにあいません。", romaji: "Densha ga okurete iru node, kaigi ni ma ni aimasen.", question_vi: "Chuyện gì đang xảy ra?", question_en: "What is happening?", options: ["Cuộc họp bị hủy / the meeting is cancelled", "Tàu trễ nên sẽ tới muộn / the train is late so they will miss the meeting", "Họ đã tới sớm / they arrived early", "Họ đi bằng taxi / they are taking a taxi"], answer: 1, explain_vi: "おくれている + まにあいません = trễ và không kịp.", explain_en: "The train is delayed so they will not make it." },
  { id: "ls-07", level: "N4", audio: "このへやはやちんがろくまんえんで、えきからとほごふんです。", romaji: "Kono heya wa yachin ga roku-man en de, eki kara toho go-fun desu.", question_vi: "Đi bộ từ ga mất bao lâu?", question_en: "How long is the walk from the station?", options: ["6 phút / 6 minutes", "10 phút / 10 minutes", "5 phút / 5 minutes", "15 phút / 15 minutes"], answer: 2, explain_vi: "とほごふん = đi bộ 5 phút.", explain_en: "とほごふん is a five-minute walk." },
  { id: "ls-08", level: "N4", audio: "あしたはあめがふるそうですから、うんどうかいはちゅうしかもしれません。", romaji: "Ashita wa ame ga furu sō desu kara, undōkai wa chūshi kamo shiremasen.", question_vi: "Vì sao hội thao có thể bị hủy?", question_en: "Why might the sports day be cancelled?", options: ["Vì thiếu người / not enough people", "Vì sân đang sửa / the field is being repaired", "Vì nghỉ lễ / it is a holiday", "Vì nghe nói sẽ mưa / because it is said to rain"], answer: 3, explain_vi: "ふるそうです = nghe nói sẽ mưa.", explain_en: "ふるそうです reports that rain is expected." },
  { id: "ls-09", level: "N4", audio: "ねつがあるので、きょうはやすませていただけませんか。", romaji: "Netsu ga aru node, kyō wa yasumasete itadakemasen ka.", question_vi: "Người nói xin điều gì?", question_en: "What is the speaker asking for?", options: ["Xin nghỉ hôm nay / a day off today", "Xin về sớm / to leave early", "Xin đổi ca / a shift swap", "Xin tăng lương / a pay rise"], answer: 0, explain_vi: "やすませていただけませんか = xin phép nghỉ.", explain_en: "It is a polite request for a day off." },
  { id: "ls-10", level: "N3", audio: "こうざをひらくには、ざいりゅうカードとでんわばんごうがひつようです。", romaji: "Kōza o hiraku ni wa, zairyū kādo to denwa bangō ga hitsuyō desu.", question_vi: "Cần gì để mở tài khoản?", question_en: "What is needed to open an account?", options: ["Chỉ hộ chiếu / passport only", "Thẻ lưu trú và số điện thoại / residence card and phone number", "Con dấu và ảnh / seal and photo", "Hợp đồng thuê nhà / rental contract"], answer: 1, explain_vi: "ざいりゅうカード và でんわばんごう được nêu rõ.", explain_en: "The residence card and a phone number are named." },
  { id: "ls-11", level: "N3", audio: "ことしはぶっかがあがったので、せつやくするひとがふえています。", romaji: "Kotoshi wa bukka ga agatta node, setsuyaku suru hito ga fuete imasu.", question_vi: "Nội dung chính là gì?", question_en: "What is the main point?", options: ["Lương tăng / salaries rose", "Dân số giảm / the population fell", "Giá tăng nên nhiều người tiết kiệm hơn / prices rose so more people economise", "Thuế giảm / taxes were cut"], answer: 2, explain_vi: "ぶっかがあがった + せつやく = giá tăng nên tiết kiệm.", explain_en: "Prices rose, so more people are economising." },
  { id: "ls-12", level: "N3", audio: "このおんせんはからだにいいといわれていますが、ながくはいらないほうがいいです。", romaji: "Kono onsen wa karada ni ii to iwarete imasu ga, nagaku hairanai hō ga ii desu.", question_vi: "Lời khuyên là gì?", question_en: "What is the advice?", options: ["Không nên tắm / do not bathe at all", "Nên tắm mỗi ngày / bathe every day", "Nên tắm buổi sáng / bathe in the morning", "Không nên ngâm quá lâu / do not soak too long"], answer: 3, explain_vi: "ながくはいらないほうがいい = không nên ngâm lâu.", explain_en: "It advises against soaking for a long time." },
  { id: "ls-13", level: "N3", audio: "しゃちょうはもうおかえりになりましたので、あしたごれんらくします。", romaji: "Shachō wa mō okaeri ni narimashita node, ashita go-renraku shimasu.", question_vi: "Sẽ liên lạc khi nào?", question_en: "When will they make contact?", options: ["Ngày mai / tomorrow", "Hôm nay / today", "Tuần sau / next week", "Ngay lập tức / right away"], answer: 0, explain_vi: "あした = ngày mai.", explain_en: "あした means tomorrow." },
  { id: "ls-14", level: "N3", audio: "ごみはもえるごみともえないごみにぶんべつしてから、あさはちじまでにだしてください。", romaji: "Gomi wa moeru gomi to moenai gomi ni bunbetsu shite kara, asa hachi-ji made ni dashite kudasai.", question_vi: "Yêu cầu là gì?", question_en: "What is being asked?", options: ["Bỏ rác vào buổi tối / take rubbish out at night", "Phân loại rác rồi bỏ trước 8 giờ sáng / sort the rubbish and put it out before 8 a.m.", "Đốt rác tại nhà / burn rubbish at home", "Mang rác tới trạm / carry rubbish to a station"], answer: 1, explain_vi: "ぶんべつしてから ... はちじまでに = phân loại rồi bỏ trước 8 giờ.", explain_en: "Sort it, then put it out by eight." },
  { id: "ls-15", level: "N3", audio: "だいがくいんにすすむか、しゅうしょくするか、まだきめていません。", romaji: "Daigakuin ni susumu ka, shūshoku suru ka, mada kimete imasen.", question_vi: "Người nói đang do dự điều gì?", question_en: "What is the speaker undecided about?", options: ["Chuyển nhà hay không / whether to move", "Đi du lịch hay không / whether to travel", "Học cao học hay đi làm / graduate school or a job", "Mua xe hay không / whether to buy a car"], answer: 2, explain_vi: "だいがくいん hay しゅうしょく = học tiếp hay đi làm.", explain_en: "Graduate school versus getting a job." },
  { id: "ls-16", level: "N3", audio: "たいふうがちかづいていますので、あしたのじゅぎょうはちゅうしせざるをえません。", romaji: "Taifū ga chikazuite imasu node, ashita no jugyō wa chūshi sezaru o emasen.", question_vi: "Buổi học mai thế nào?", question_en: "What happens to tomorrow's class?", options: ["Học online / it moves online", "Học sớm hơn / it starts earlier", "Vẫn học bình thường / it goes ahead", "Buộc phải hủy / it must be cancelled"], answer: 3, explain_vi: "ちゅうしせざるをえません = buộc phải hủy.", explain_en: "せざるを得ません means they have no choice but to cancel." },
];

export const JA_DICTATION: JaDictationItem[] = [
  { id: "dc-01", level: "N5", audio: "おはようございます", kana: "おはようございます", romaji: "ohayou gozaimasu", vi: "Chào buổi sáng.", en: "Good morning." },
  { id: "dc-02", level: "N5", audio: "ありがとうございます", kana: "ありがとうございます", romaji: "arigatou gozaimasu", vi: "Cảm ơn.", en: "Thank you." },
  { id: "dc-03", level: "N5", audio: "がっこう", kana: "がっこう", romaji: "gakkou", vi: "trường học", en: "school" },
  { id: "dc-04", level: "N5", audio: "せんせい", kana: "せんせい", romaji: "sensei", vi: "giáo viên", en: "teacher" },
  { id: "dc-05", level: "N5", audio: "きっぷ", kana: "きっぷ", romaji: "kippu", vi: "vé", en: "ticket" },
  { id: "dc-06", level: "N5", audio: "でんわ", kana: "でんわ", romaji: "denwa", vi: "điện thoại", en: "telephone" },
  { id: "dc-07", level: "N5", audio: "しんぶん", kana: "しんぶん", romaji: "shinbun", vi: "báo", en: "newspaper" },
  { id: "dc-08", level: "N5", audio: "たべもの", kana: "たべもの", romaji: "tabemono", vi: "đồ ăn", en: "food" },
  { id: "dc-09", level: "N5", audio: "あたらしいかばん", kana: "あたらしいかばん", romaji: "atarashii kaban", vi: "cái cặp mới", en: "a new bag" },
  { id: "dc-10", level: "N5", audio: "きょうはあついです", kana: "きょうはあついです", romaji: "kyou wa atsui desu", vi: "Hôm nay nóng.", en: "It is hot today." },
  { id: "dc-11", level: "N4", audio: "しゅっちょう", kana: "しゅっちょう", romaji: "shucchou", vi: "công tác", en: "business trip" },
  { id: "dc-12", level: "N4", audio: "よやく", kana: "よやく", romaji: "yoyaku", vi: "đặt trước", en: "reservation" },
  { id: "dc-13", level: "N4", audio: "びょういん", kana: "びょういん", romaji: "byouin", vi: "bệnh viện", en: "hospital" },
  { id: "dc-14", level: "N4", audio: "ざんぎょう", kana: "ざんぎょう", romaji: "zangyou", vi: "làm thêm giờ", en: "overtime" },
  { id: "dc-15", level: "N4", audio: "のりかえ", kana: "のりかえ", romaji: "norikae", vi: "chuyển tàu", en: "transfer" },
  { id: "dc-16", level: "N4", audio: "てつづき", kana: "てつづき", romaji: "tetsuzuki", vi: "thủ tục", en: "procedure" },
  { id: "dc-17", level: "N4", audio: "しめきりはあしたです", kana: "しめきりはあしたです", romaji: "shimekiri wa ashita desu", vi: "Hạn chót là ngày mai.", en: "The deadline is tomorrow." },
  { id: "dc-18", level: "N4", audio: "くすりをのんでください", kana: "くすりをのんでください", romaji: "kusuri o nonde kudasai", vi: "Hãy uống thuốc.", en: "Please take the medicine." },
  { id: "dc-19", level: "N4", audio: "でんきをけしてください", kana: "でんきをけしてください", romaji: "denki o keshite kudasai", vi: "Hãy tắt đèn.", en: "Please turn off the light." },
  { id: "dc-20", level: "N4", audio: "あめがふりそうです", kana: "あめがふりそうです", romaji: "ame ga furisou desu", vi: "Trời như sắp mưa.", en: "It looks like rain." },
  { id: "dc-21", level: "N3", audio: "かんきょう", kana: "かんきょう", romaji: "kankyou", vi: "môi trường", en: "environment" },
  { id: "dc-22", level: "N3", audio: "けいざい", kana: "けいざい", romaji: "keizai", vi: "kinh tế", en: "economy" },
  { id: "dc-23", level: "N3", audio: "しょうひぜい", kana: "しょうひぜい", romaji: "shouhizei", vi: "thuế tiêu dùng", en: "consumption tax" },
  { id: "dc-24", level: "N3", audio: "ぶんべつ", kana: "ぶんべつ", romaji: "bunbetsu", vi: "phân loại rác", en: "waste sorting" },
  { id: "dc-25", level: "N3", audio: "せきにんかん", kana: "せきにんかん", romaji: "sekininkan", vi: "tinh thần trách nhiệm", en: "sense of responsibility" },
  { id: "dc-26", level: "N3", audio: "ひなんばしょ", kana: "ひなんばしょ", romaji: "hinanbasho", vi: "nơi sơ tán", en: "evacuation site" },
  { id: "dc-27", level: "N3", audio: "じんこうがふえています", kana: "じんこうがふえています", romaji: "jinkou ga fuete imasu", vi: "Dân số đang tăng.", en: "The population is increasing." },
  { id: "dc-28", level: "N3", audio: "しりょうをおくっていただけませんか", kana: "しりょうをおくっていただけませんか", romaji: "shiryou o okutte itadakemasen ka", vi: "Anh gửi giúp tôi tài liệu được không?", en: "Could you kindly send me the documents?" },
  { id: "dc-29", level: "N3", audio: "たいふうのためにちゅうしします", kana: "たいふうのためにちゅうしします", romaji: "taifuu no tame ni chuushi shimasu", vi: "Hủy vì bão.", en: "It is cancelled because of the typhoon." },
  { id: "dc-30", level: "N3", audio: "けんきゅうをつづけたいです", kana: "けんきゅうをつづけたいです", romaji: "kenkyuu o tsuzuketai desu", vi: "Tôi muốn tiếp tục nghiên cứu.", en: "I want to continue my research." },
];
