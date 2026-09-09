/**
 * @file expansion4.ts
 * @description Fourth content pack: N3 grammar points, real-situation
 *  dialogues and a larger bilingual practice bank.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

import type { JaDialoguePack } from "./expansion2";
import type { JaPhrase } from "./types";

export interface JaGrammarPack3 {
  title: string;
  explain: string;
  examples: JaPhrase[];
}
export interface JaQuizPack3 {
  q: string;
  options: string[];
  answer: number;
  explain_vi: string;
  explain_en: string;
}

export const GRAMMAR_EXTRA_3: JaGrammarPack3[] = [
  { title: "33. ～てから - Sau khi làm gì", explain: "Động từ thể て + から: làm việc A xong rồi mới làm việc B. Nhấn thứ tự thời gian rõ ràng.", examples: [
    { jp: "宿題をしてから、ゲームをします。", romaji: "Shukudai o shite kara, gēmu o shimasu.", vi: "Làm bài xong rồi tôi mới chơi game.", en: "I play games after finishing my homework." },
    { jp: "手を洗ってから、食べましょう。", romaji: "Te o aratte kara, tabemashō.", vi: "Rửa tay rồi hãy ăn nhé.", en: "Let's eat after washing our hands." },
  ]},
  { title: "34. ～ながら - Vừa làm A vừa làm B", explain: "Động từ bỏ ます + ながら. Hai việc xảy ra cùng lúc, việc chính đặt ở cuối câu.", examples: [
    { jp: "音楽を聞きながら、勉強します。", romaji: "Ongaku o kikinagara, benkyō shimasu.", vi: "Tôi vừa nghe nhạc vừa học.", en: "I study while listening to music." },
    { jp: "働きながら、大学に通っています。", romaji: "Hatarakinagara, daigaku ni kayotte imasu.", vi: "Tôi vừa làm việc vừa học đại học.", en: "I attend university while working." },
  ]},
  { title: "35. ～ようにする - Cố gắng duy trì việc gì", explain: "Động từ thể từ điển hoặc thể ない + ようにする: tự đặt ra thói quen, nỗ lực làm hoặc tránh làm.", examples: [
    { jp: "毎朝、走るようにしています。", romaji: "Maiasa, hashiru yō ni shite imasu.", vi: "Tôi cố gắng chạy bộ mỗi sáng.", en: "I make an effort to run every morning." },
    { jp: "夜遅く食べないようにします。", romaji: "Yoru osoku tabenai yō ni shimasu.", vi: "Tôi cố không ăn khuya.", en: "I try not to eat late at night." },
  ]},
  { title: "36. ～ようになる - Trở nên làm được việc gì", explain: "Diễn tả sự thay đổi theo thời gian: trước đây không được, giờ đã được.", examples: [
    { jp: "漢字が読めるようになりました。", romaji: "Kanji ga yomeru yō ni narimashita.", vi: "Tôi đã đọc được kanji.", en: "I have become able to read kanji." },
    { jp: "納豆が食べられるようになりました。", romaji: "Nattō ga taberareru yō ni narimashita.", vi: "Tôi đã ăn được natto.", en: "I have come to be able to eat nattō." },
  ]},
  { title: "37. ～ば～ - Điều kiện thể ば", explain: "Động từ nhóm 1 đổi う thành えば, nhóm 2 る thành れば, する thành すれば, 来る thành 来れば. Nhấn điều kiện cần.", examples: [
    { jp: "急げば、間に合います。", romaji: "Isogeba, ma ni aimasu.", vi: "Nếu nhanh thì sẽ kịp.", en: "If you hurry, you will make it." },
    { jp: "練習すれば、上手になります。", romaji: "Renshū sureba, jōzu ni narimasu.", vi: "Nếu luyện tập thì sẽ giỏi.", en: "If you practise, you will get good." },
  ]},
  { title: "38. ～のに - Mặc dù ... nhưng", explain: "Nối hai vế trái ngược, kèm cảm giác bất ngờ hoặc không hài lòng của người nói.", examples: [
    { jp: "たくさん勉強したのに、点が悪かったです。", romaji: "Takusan benkyō shita noni, ten ga warukatta desu.", vi: "Mặc dù học nhiều nhưng điểm lại thấp.", en: "Even though I studied a lot, my score was bad." },
    { jp: "夏なのに、寒いです。", romaji: "Natsu na noni, samui desu.", vi: "Đang là mùa hè mà lại lạnh.", en: "It is cold even though it is summer." },
  ]},
  { title: "39. ～はずです - Chắc hẳn là", explain: "Suy đoán có căn cứ rõ ràng. Thể thường + はずです; danh từ + のはずです.", examples: [
    { jp: "彼は今日来るはずです。", romaji: "Kare wa kyō kuru hazu desu.", vi: "Chắc hẳn hôm nay anh ấy sẽ đến.", en: "He is supposed to come today." },
    { jp: "店は八時まで開いているはずです。", romaji: "Mise wa hachi-ji made aite iru hazu desu.", vi: "Chắc hẳn cửa hàng mở đến 8 giờ.", en: "The shop should be open until eight." },
  ]},
  { title: "40. ～に違いない - Nhất định là", explain: "Mức suy đoán cao hơn はず, người nói gần như khẳng định.", examples: [
    { jp: "この字は先生が書いたに違いない。", romaji: "Kono ji wa sensei ga kaita ni chigainai.", vi: "Chữ này nhất định là thầy viết.", en: "This writing must be the teacher's." },
    { jp: "彼女は疲れているに違いない。", romaji: "Kanojo wa tsukarete iru ni chigainai.", vi: "Cô ấy nhất định đang mệt.", en: "She must be tired." },
  ]},
  { title: "41. ～わけではない - Không hẳn là", explain: "Phủ định một phần, tránh nói tuyệt đối. Rất hay dùng khi giải thích nhẹ nhàng.", examples: [
    { jp: "嫌いなわけではありません。", romaji: "Kirai na wake dewa arimasen.", vi: "Không hẳn là tôi không thích.", en: "It is not that I dislike it." },
    { jp: "全部覚えたわけではないです。", romaji: "Zenbu oboeta wake dewa nai desu.", vi: "Không hẳn là tôi đã nhớ hết.", en: "It is not that I memorised everything." },
  ]},
  { title: "42. ～ばかり - Vừa mới / chỉ toàn", explain: "Thể た + ばかり: vừa mới xong. Danh từ + ばかり: chỉ toàn một thứ.", examples: [
    { jp: "今、着いたばかりです。", romaji: "Ima, tsuita bakari desu.", vi: "Tôi vừa mới tới.", en: "I have just arrived." },
    { jp: "彼はゲームばかりしています。", romaji: "Kare wa gēmu bakari shite imasu.", vi: "Anh ấy chỉ toàn chơi game.", en: "He does nothing but play games." },
  ]},
  { title: "43. ～ものだ - Vốn dĩ, lẽ thường", explain: "Nói về lẽ thường, kinh nghiệm chung của con người hoặc hồi tưởng quá khứ.", examples: [
    { jp: "子どもはよく転ぶものです。", romaji: "Kodomo wa yoku korobu mono desu.", vi: "Trẻ con vốn dĩ hay bị ngã.", en: "Children naturally fall over a lot." },
    { jp: "昔はよくここで遊んだものです。", romaji: "Mukashi wa yoku koko de asonda mono desu.", vi: "Hồi xưa tôi hay chơi ở đây.", en: "I used to play here a lot long ago." },
  ]},
  { title: "44. ～ざるを得ない - Buộc phải", explain: "Văn viết, nghĩa không còn cách nào khác ngoài việc làm điều đó. Động từ thể ない bỏ ない + ざるを得ない; する thành せざるを得ない.", examples: [
    { jp: "台風なので、中止せざるを得ない。", romaji: "Taifū na node, chūshi sezaru o enai.", vi: "Vì bão nên buộc phải hủy.", en: "Because of the typhoon we have no choice but to cancel." },
    { jp: "値上げを認めざるを得ません。", romaji: "Neage o mitomezaru o emasen.", vi: "Buộc phải chấp nhận việc tăng giá.", en: "We have to accept the price rise." },
  ]},
  { title: "45. ～に応じて - Tuỳ theo, tương ứng với", explain: "Danh từ + に応じて: thay đổi linh hoạt theo tình hình, yêu cầu hay năng lực.", examples: [
    { jp: "レベルに応じてクラスを分けます。", romaji: "Reberu ni ōjite kurasu o wakemasu.", vi: "Chia lớp tuỳ theo trình độ.", en: "Classes are divided according to level." },
    { jp: "希望に応じて時間を変えられます。", romaji: "Kibō ni ōjite jikan o kaeraremasu.", vi: "Có thể đổi giờ tuỳ theo mong muốn.", en: "The time can be changed to suit your wishes." },
  ]},
  { title: "46. ～ていただけませんか - Kính ngữ khi nhờ vả", explain: "Cách nhờ lịch sự nhất trong ba mức: ～てください < ～てくれませんか < ～ていただけませんか.", examples: [
    { jp: "もう一度説明していただけませんか。", romaji: "Mō ichido setsumei shite itadakemasen ka.", vi: "Anh/chị giải thích lại giúp em được không?", en: "Could you kindly explain once more?" },
    { jp: "書類を送っていただけませんか。", romaji: "Shorui o okutte itadakemasen ka.", vi: "Anh/chị gửi giúp em tài liệu được không?", en: "Could you kindly send me the documents?" },
  ]},
  { title: "47. Kính ngữ お～になる / khiêm nhường お～する", explain: "Tôn kính hành động của người trên: お + động từ bỏ ます + になる. Hạ mình khi nói về mình: お + động từ bỏ ます + する.", examples: [
    { jp: "社長はもうお帰りになりました。", romaji: "Shachō wa mō okaeri ni narimashita.", vi: "Giám đốc đã về rồi.", en: "The president has already gone home." },
    { jp: "私がお持ちします。", romaji: "Watashi ga omochi shimasu.", vi: "Để em mang giúp ạ.", en: "Let me carry it for you." },
  ]},
  { title: "48. ～と言われている / ～そうです（伝聞） - Nghe nói, được cho là", explain: "Truyền đạt thông tin nghe được hoặc quan niệm chung; thể thường + そうです là nghe nói, khác với そう của vẻ ngoài.", examples: [
    { jp: "この温泉は体にいいと言われています。", romaji: "Kono onsen wa karada ni ii to iwarete imasu.", vi: "Suối nước nóng này được cho là tốt cho sức khoẻ.", en: "This hot spring is said to be good for the body." },
    { jp: "明日は雪が降るそうです。", romaji: "Ashita wa yuki ga furu sō desu.", vi: "Nghe nói mai có tuyết.", en: "I hear it will snow tomorrow." },
  ]},
];

export const DIALOGUES_EXTRA_3: JaDialoguePack[] = [
  { title: "🏪 Ở konbini / At the convenience store", scene: "Khách mua đồ và nhờ hâm nóng. / A customer buys food and asks to have it warmed.", lines: [
    { speaker: "店員", jp: "いらっしゃいませ。", romaji: "Irasshaimase.", vi: "Xin mời quý khách.", en: "Welcome." },
    { speaker: "客", jp: "このお弁当、温めてください。", romaji: "Kono obentō, atatamete kudasai.", vi: "Cho tôi hâm nóng hộp cơm này.", en: "Please warm this bento." },
    { speaker: "店員", jp: "はい。お箸はお付けしますか。", romaji: "Hai. Ohashi wa otsuke shimasu ka.", vi: "Vâng. Quý khách có cần đũa không?", en: "Certainly. Would you like chopsticks?" },
    { speaker: "客", jp: "はい、一つお願いします。", romaji: "Hai, hitotsu onegaishimasu.", vi: "Vâng, cho tôi một đôi.", en: "Yes, one pair please." },
    { speaker: "店員", jp: "袋は有料ですが、いかがですか。", romaji: "Fukuro wa yūryō desu ga, ikaga desu ka.", vi: "Túi có thu phí, quý khách có lấy không?", en: "Bags cost extra - would you like one?" },
    { speaker: "客", jp: "大丈夫です。カバンに入れます。", romaji: "Daijōbu desu. Kaban ni iremasu.", vi: "Không cần, tôi cho vào túi mình.", en: "No thanks, I will put it in my bag." },
    { speaker: "店員", jp: "合計六百八十円です。", romaji: "Gōkei roppyaku hachijū en desu.", vi: "Tổng cộng 680 yên.", en: "That comes to 680 yen." },
    { speaker: "客", jp: "カードで払います。", romaji: "Kādo de haraimasu.", vi: "Tôi trả bằng thẻ.", en: "I will pay by card." },
    { speaker: "店員", jp: "ありがとうございました。またお越しください。", romaji: "Arigatō gozaimashita. Mata okoshi kudasai.", vi: "Cảm ơn quý khách. Mong quý khách quay lại.", en: "Thank you. Please come again." },
  ]},
  { title: "🏥 Khám ở bệnh viện / At the clinic", scene: "Bệnh nhân bị sốt tới khám. / A patient with a fever sees the doctor.", lines: [
    { speaker: "受付", jp: "保険証をお願いします。", romaji: "Hokenshō o onegaishimasu.", vi: "Cho tôi xem thẻ bảo hiểm.", en: "Your insurance card, please." },
    { speaker: "患者", jp: "はい、これです。", romaji: "Hai, kore desu.", vi: "Vâng, đây ạ.", en: "Here it is." },
    { speaker: "医者", jp: "どうしましたか。", romaji: "Dō shimashita ka.", vi: "Bạn bị sao?", en: "What seems to be the problem?" },
    { speaker: "患者", jp: "昨日から熱があって、咳も出ます。", romaji: "Kinō kara netsu ga atte, seki mo demasu.", vi: "Từ hôm qua tôi bị sốt và ho.", en: "I have had a fever since yesterday and I am coughing." },
    { speaker: "医者", jp: "食欲はありますか。", romaji: "Shokuyoku wa arimasu ka.", vi: "Bạn có thấy thèm ăn không?", en: "Do you have an appetite?" },
    { speaker: "患者", jp: "あまりありません。頭も痛いです。", romaji: "Amari arimasen. Atama mo itai desu.", vi: "Không mấy. Tôi còn đau đầu.", en: "Not much. My head hurts too." },
    { speaker: "医者", jp: "風邪でしょう。三日分の薬を出します。", romaji: "Kaze deshō. Mikka-bun no kusuri o dashimasu.", vi: "Có lẽ là cảm. Tôi kê thuốc ba ngày.", en: "It is probably a cold. I will prescribe three days of medicine." },
    { speaker: "患者", jp: "お風呂に入ってもいいですか。", romaji: "Ofuro ni haitte mo ii desu ka.", vi: "Tôi tắm được không?", en: "May I take a bath?" },
    { speaker: "医者", jp: "熱が下がってからにしてください。", romaji: "Netsu ga sagatte kara ni shite kudasai.", vi: "Hãy đợi hạ sốt đã.", en: "Please wait until the fever goes down." },
  ]},
  { title: "🛂 Ở sân bay / At the airport", scene: "Làm thủ tục check-in và hỏi cửa ra máy bay. / Checking in and asking about the gate.", lines: [
    { speaker: "係員", jp: "パスポートをお見せください。", romaji: "Pasupōto o omise kudasai.", vi: "Xin cho xem hộ chiếu.", en: "Please show me your passport." },
    { speaker: "客", jp: "はい。窓側の席がいいです。", romaji: "Hai. Madogawa no seki ga ii desu.", vi: "Vâng. Tôi muốn ghế cạnh cửa sổ.", en: "Here you are. I would like a window seat." },
    { speaker: "係員", jp: "お荷物はいくつですか。", romaji: "Onimotsu wa ikutsu desu ka.", vi: "Quý khách có mấy kiện hành lý?", en: "How many bags do you have?" },
    { speaker: "客", jp: "預けるのは一つ、手荷物は一つです。", romaji: "Azukeru no wa hitotsu, tenimotsu wa hitotsu desu.", vi: "Gửi một kiện, mang tay một kiện.", en: "One to check in and one carry-on." },
    { speaker: "係員", jp: "重量が少し超えています。", romaji: "Jūryō ga sukoshi koete imasu.", vi: "Hành lý hơi quá cân.", en: "It is slightly over the weight limit." },
    { speaker: "客", jp: "では、本をカバンに移します。", romaji: "Dewa, hon o kaban ni utsushimasu.", vi: "Vậy tôi chuyển sách sang túi.", en: "Then I will move the books to my bag." },
    { speaker: "係員", jp: "搭乗口は二十三番です。", romaji: "Tōjōguchi wa nijūsan-ban desu.", vi: "Cửa ra máy bay số 23.", en: "Your boarding gate is number 23." },
    { speaker: "客", jp: "何時までに行けばいいですか。", romaji: "Nan-ji made ni ikeba ii desu ka.", vi: "Tôi phải tới đó trước mấy giờ?", en: "By what time should I be there?" },
    { speaker: "係員", jp: "九時二十分までにお願いします。", romaji: "Ku-ji nijuppun made ni onegaishimasu.", vi: "Xin có mặt trước 9 giờ 20.", en: "Please be there by 9:20." },
  ]},
  { title: "🧑‍🍳 Phỏng vấn baito / Part-time job interview", scene: "Sinh viên xin việc ở quán cà phê. / A student applies at a café.", lines: [
    { speaker: "店長", jp: "自己紹介をお願いします。", romaji: "Jiko shōkai o onegaishimasu.", vi: "Bạn hãy tự giới thiệu.", en: "Please introduce yourself." },
    { speaker: "学生", jp: "ベトナムから来たハイです。今、大学二年生です。", romaji: "Betonamu kara kita Hai desu. Ima, daigaku ni-nensei desu.", vi: "Em là Hải, đến từ Việt Nam, hiện là sinh viên năm hai.", en: "I am Hai from Vietnam, currently a second-year student." },
    { speaker: "店長", jp: "週に何日働けますか。", romaji: "Shū ni nan-nichi hatarakemasu ka.", vi: "Một tuần bạn làm được mấy ngày?", en: "How many days a week can you work?" },
    { speaker: "学生", jp: "平日は三日、週末も入れます。", romaji: "Heijitsu wa mikka, shūmatsu mo hairemasu.", vi: "Ngày thường ba ngày, cuối tuần em cũng làm được.", en: "Three weekdays, and I can work weekends too." },
    { speaker: "店長", jp: "接客の経験はありますか。", romaji: "Sekkyaku no keiken wa arimasu ka.", vi: "Bạn có kinh nghiệm phục vụ khách chưa?", en: "Do you have customer-service experience?" },
    { speaker: "学生", jp: "はい、コンビニで一年働きました。", romaji: "Hai, konbini de ichi-nen hatarakimashita.", vi: "Có, em làm ở konbini một năm.", en: "Yes, I worked at a convenience store for a year." },
    { speaker: "店長", jp: "敬語は大丈夫ですか。", romaji: "Keigo wa daijōbu desu ka.", vi: "Bạn dùng kính ngữ được chứ?", en: "Are you comfortable with polite language?" },
    { speaker: "学生", jp: "まだ勉強中ですが、頑張ります。", romaji: "Mada benkyōchū desu ga, ganbarimasu.", vi: "Em vẫn đang học nhưng em sẽ cố gắng.", en: "I am still learning, but I will do my best." },
    { speaker: "店長", jp: "では、来週から研修をお願いします。", romaji: "Dewa, raishū kara kenshū o onegaishimasu.", vi: "Vậy tuần sau bạn bắt đầu tập huấn nhé.", en: "Then please start training next week." },
  ]},
  { title: "🏠 Xem nhà cho thuê / Viewing a rental flat", scene: "Khách và nhân viên bất động sản. / A tenant and an agent.", lines: [
    { speaker: "客", jp: "駅から近い部屋を探しています。", romaji: "Eki kara chikai heya o sagashite imasu.", vi: "Tôi đang tìm phòng gần ga.", en: "I am looking for a flat near the station." },
    { speaker: "店員", jp: "ご予算はいくらぐらいですか。", romaji: "Goyosan wa ikura gurai desu ka.", vi: "Ngân sách của anh khoảng bao nhiêu?", en: "What is your budget?" },
    { speaker: "客", jp: "家賃は六万円までがいいです。", romaji: "Yachin wa roku-man en made ga ii desu.", vi: "Tiền thuê tối đa 60 nghìn yên.", en: "Up to sixty thousand yen." },
    { speaker: "店員", jp: "こちらは徒歩七分、六万五千円です。", romaji: "Kochira wa toho nana-fun, roku-man gosen en desu.", vi: "Căn này đi bộ 7 phút, 65 nghìn yên.", en: "This one is a seven-minute walk, 65,000 yen." },
    { speaker: "客", jp: "少し高いですね。敷金はいくらですか。", romaji: "Sukoshi takai desu ne. Shikikin wa ikura desu ka.", vi: "Hơi cao nhỉ. Tiền cọc bao nhiêu?", en: "A bit expensive. How much is the deposit?" },
    { speaker: "店員", jp: "家賃一か月分です。礼金はありません。", romaji: "Yachin ikkagetsu-bun desu. Reikin wa arimasen.", vi: "Bằng một tháng tiền nhà. Không có tiền lễ.", en: "One month's rent. There is no key money." },
    { speaker: "客", jp: "内見できますか。", romaji: "Naiken dekimasu ka.", vi: "Tôi xem phòng được không?", en: "Can I view the room?" },
    { speaker: "店員", jp: "はい、今日の午後なら空いています。", romaji: "Hai, kyō no gogo nara aite imasu.", vi: "Được, chiều nay đang trống.", en: "Yes, this afternoon is free." },
    { speaker: "客", jp: "では、三時にお願いします。", romaji: "Dewa, san-ji ni onegaishimasu.", vi: "Vậy 3 giờ nhé.", en: "Then three o'clock, please." },
  ]},
  { title: "📞 Gọi điện xin nghỉ / Phoning in absent", scene: "Nhân viên gọi cho cấp trên. / An employee calls the supervisor.", lines: [
    { speaker: "社員", jp: "おはようございます。営業部の田中です。", romaji: "Ohayō gozaimasu. Eigyōbu no Tanaka desu.", vi: "Chào buổi sáng. Tôi là Tanaka phòng kinh doanh.", en: "Good morning, this is Tanaka from sales." },
    { speaker: "上司", jp: "おはよう。どうしましたか。", romaji: "Ohayō. Dō shimashita ka.", vi: "Chào. Có việc gì không?", en: "Morning. What is the matter?" },
    { speaker: "社員", jp: "実は熱が三十八度あります。", romaji: "Jitsu wa netsu ga sanjūhachi-do arimasu.", vi: "Thật ra tôi đang sốt 38 độ.", en: "Actually I have a fever of 38 degrees." },
    { speaker: "上司", jp: "それは大変ですね。病院に行きましたか。", romaji: "Sore wa taihen desu ne. Byōin ni ikimashita ka.", vi: "Vậy thì mệt lắm. Đã đi bệnh viện chưa?", en: "That sounds rough. Have you seen a doctor?" },
    { speaker: "社員", jp: "これから行きます。今日は休ませていただけませんか。", romaji: "Kore kara ikimasu. Kyō wa yasumasete itadakemasen ka.", vi: "Tôi đi ngay bây giờ. Hôm nay cho tôi nghỉ được không?", en: "I am going now. Could I take the day off?" },
    { speaker: "上司", jp: "分かりました。ゆっくり休んでください。", romaji: "Wakarimashita. Yukkuri yasunde kudasai.", vi: "Tôi hiểu rồi. Hãy nghỉ ngơi cho tốt.", en: "Understood. Rest well." },
    { speaker: "社員", jp: "会議の資料はメールで送っておきます。", romaji: "Kaigi no shiryō wa mēru de okutte okimasu.", vi: "Tài liệu họp tôi sẽ gửi mail trước.", en: "I will send the meeting materials by email in advance." },
    { speaker: "上司", jp: "助かります。お大事に。", romaji: "Tasukarimasu. Odaiji ni.", vi: "Vậy thì tốt quá. Giữ sức khoẻ nhé.", en: "That helps. Take care." },
  ]},
  { title: "🏦 Mở tài khoản ngân hàng / Opening a bank account", scene: "Du học sinh mở tài khoản. / An international student opens an account.", lines: [
    { speaker: "客", jp: "口座を開きたいのですが。", romaji: "Kōza o hirakitai no desu ga.", vi: "Tôi muốn mở tài khoản.", en: "I would like to open an account." },
    { speaker: "行員", jp: "在留カードと印鑑はお持ちですか。", romaji: "Zairyū kādo to inkan wa omochi desu ka.", vi: "Anh có thẻ lưu trú và con dấu không?", en: "Do you have your residence card and seal?" },
    { speaker: "客", jp: "在留カードはありますが、印鑑はありません。", romaji: "Zairyū kādo wa arimasu ga, inkan wa arimasen.", vi: "Tôi có thẻ lưu trú nhưng không có con dấu.", en: "I have the card but not a seal." },
    { speaker: "行員", jp: "サインでも大丈夫です。", romaji: "Sain demo daijōbu desu.", vi: "Ký tên cũng được ạ.", en: "A signature is fine." },
    { speaker: "客", jp: "キャッシュカードはいつ届きますか。", romaji: "Kyasshu kādo wa itsu todokimasu ka.", vi: "Thẻ ATM khi nào tới?", en: "When will the cash card arrive?" },
    { speaker: "行員", jp: "一週間ほどで郵送されます。", romaji: "Isshūkan hodo de yūsō saremasu.", vi: "Khoảng một tuần sẽ gửi qua bưu điện.", en: "It will be posted in about a week." },
    { speaker: "客", jp: "海外への振り込みもできますか。", romaji: "Kaigai e no furikomi mo dekimasu ka.", vi: "Có chuyển tiền ra nước ngoài được không?", en: "Can I also transfer money abroad?" },
    { speaker: "行員", jp: "できますが、手数料がかかります。", romaji: "Dekimasu ga, tesūryō ga kakarimasu.", vi: "Được, nhưng có phí giao dịch.", en: "Yes, but there is a fee." },
  ]},
  { title: "🙇 Khiếu nại lịch sự / Making a polite complaint", scene: "Khách phản hồi về món ăn nguội. / A guest reports a cold dish.", lines: [
    { speaker: "客", jp: "すみません、少しよろしいですか。", romaji: "Sumimasen, sukoshi yoroshii desu ka.", vi: "Xin lỗi, cho tôi nói một chút được không?", en: "Excuse me, may I have a moment?" },
    { speaker: "店員", jp: "はい、どうかなさいましたか。", romaji: "Hai, dō ka nasaimashita ka.", vi: "Vâng, có chuyện gì ạ?", en: "Yes, is something wrong?" },
    { speaker: "客", jp: "このスープが冷めているようです。", romaji: "Kono sūpu ga samete iru yō desu.", vi: "Món canh này có vẻ đã nguội.", en: "This soup seems to have gone cold." },
    { speaker: "店員", jp: "大変申し訳ございません。すぐ作り直します。", romaji: "Taihen mōshiwake gozaimasen. Sugu tsukurinaoshimasu.", vi: "Chúng tôi rất xin lỗi. Sẽ làm lại ngay.", en: "We are very sorry. We will remake it at once." },
    { speaker: "客", jp: "お願いします。急いでいないので大丈夫です。", romaji: "Onegaishimasu. Isoide inai node daijōbu desu.", vi: "Cảm ơn. Tôi không gấp nên không sao.", en: "Thank you. I am not in a hurry." },
    { speaker: "店員", jp: "お待たせしました。こちらは新しいスープです。", romaji: "Omatase shimashita. Kochira wa atarashii sūpu desu.", vi: "Xin lỗi đã để anh đợi. Đây là canh mới.", en: "Thank you for waiting. Here is a fresh soup." },
    { speaker: "客", jp: "ありがとう。今度は温かいです。", romaji: "Arigatō. Kondo wa atatakai desu.", vi: "Cảm ơn. Lần này nóng rồi.", en: "Thanks. This one is warm." },
    { speaker: "店員", jp: "ご迷惑をおかけしました。", romaji: "Gomeiwaku o okake shimashita.", vi: "Xin lỗi đã làm anh bất tiện.", en: "We apologise for the trouble." },
  ]},
];

export const JA_QUIZ_EXTRA_3: JaQuizPack3[] = [
  // Meaning - N4/N3 vocabulary
  { q: "「締め切り」 nghĩa là gì? / What does shimekiri mean?", options: ["Hạn chót / deadline", "Cuộc họp / meeting", "Lương / salary", "Nghỉ phép / day off"], answer: 0, explain_vi: "締め切り = hạn chót.", explain_en: "締め切り means deadline." },
  { q: "「残業」 nghĩa là gì? / What does zangyō mean?", options: ["Đi công tác / business trip", "Làm thêm giờ / overtime", "Tan làm / leaving work", "Thực tập / internship"], answer: 1, explain_vi: "残業 = làm thêm giờ.", explain_en: "残業 means overtime work." },
  { q: "「家賃」 nghĩa là gì? / What does yachin mean?", options: ["Tiền điện / electricity bill", "Tiền cọc / deposit", "Tiền thuê nhà / rent", "Tiền lễ / key money"], answer: 2, explain_vi: "家賃 = tiền thuê nhà hằng tháng.", explain_en: "家賃 is the monthly rent." },
  { q: "「乗り換え」 nghĩa là gì? / What does norikae mean?", options: ["Mua vé / buying a ticket", "Xuống tàu / getting off", "Vé tháng / commuter pass", "Chuyển tàu / transfer"], answer: 3, explain_vi: "乗り換え = chuyển tàu, chuyển tuyến.", explain_en: "乗り換え means changing trains." },
  { q: "「保険証」 dùng khi nào? / When do you use hokenshō?", options: ["Khi đi khám bệnh / at the clinic", "Khi mua vé tàu / buying train tickets", "Khi thi JLPT / at the JLPT", "Khi thuê xe / renting a car"], answer: 0, explain_vi: "保険証 là thẻ bảo hiểm, xuất trình khi khám bệnh.", explain_en: "保険証 is the insurance card you show at a clinic." },
  { q: "「振り込み」 nghĩa là gì? / What does furikomi mean?", options: ["Rút tiền / withdrawal", "Chuyển khoản / bank transfer", "Đổi tiền / currency exchange", "Vay tiền / a loan"], answer: 1, explain_vi: "振り込み = chuyển khoản vào tài khoản.", explain_en: "振り込み is a bank transfer." },
  { q: "「梅雨」 chỉ điều gì? / What does tsuyu refer to?", options: ["Bão lớn / a typhoon", "Tuyết đầu mùa / first snow", "Mùa mưa / the rainy season", "Nắng nóng / a heatwave"], answer: 2, explain_vi: "梅雨 là mùa mưa khoảng tháng 6 ở Nhật.", explain_en: "梅雨 is Japan's rainy season around June." },
  { q: "「高齢化」 nói về vấn đề gì? / What issue does kōreika describe?", options: ["Ô nhiễm / pollution", "Thất nghiệp / unemployment", "Lạm phát / inflation", "Già hoá dân số / population ageing"], answer: 3, explain_vi: "高齢化 = dân số già hoá.", explain_en: "高齢化 means the ageing of the population." },
  { q: "「節約」 nghĩa là gì? / What does setsuyaku mean?", options: ["Tiết kiệm chi tiêu / economising", "Đầu tư / investing", "Vay nợ / borrowing", "Tăng giá / raising prices"], answer: 0, explain_vi: "節約 = tiết kiệm, cắt giảm chi tiêu.", explain_en: "節約 means to economise." },
  { q: "「面接」 diễn ra ở đâu? / Where does mensetsu happen?", options: ["Ở lễ hội / at a festival", "Khi xin việc / when applying for a job", "Ở bưu điện / at the post office", "Trên tàu / on a train"], answer: 1, explain_vi: "面接 = buổi phỏng vấn xin việc hoặc nhập học.", explain_en: "面接 is a job or admission interview." },
  { q: "「緊張」 miêu tả cảm giác gì? / What feeling is kinchō?", options: ["Vui vẻ / cheerful", "Buồn ngủ / sleepy", "Căng thẳng, lo lắng / nervous", "Nhàm chán / bored"], answer: 2, explain_vi: "緊張 = căng thẳng trước khi làm việc quan trọng.", explain_en: "緊張 is nervous tension." },
  { q: "「分別」 trong sinh hoạt Nhật nghĩa là gì? / What does bunbetsu mean in daily life?", options: ["Chia phòng / dividing rooms", "Chia tiền / splitting the bill", "Chia lớp / splitting classes", "Phân loại rác / sorting rubbish"], answer: 3, explain_vi: "分別 = phân loại rác theo quy định.", explain_en: "分別 is sorting rubbish by category." },

  // Particles and grammar function
  { q: "音楽を聞き（　）、勉強します。", options: ["ながら", "てから", "ばかり", "のに"], answer: 0, explain_vi: "ながら = vừa làm A vừa làm B, gắn sau động từ bỏ ます.", explain_en: "ながら attaches to the ます-stem for two simultaneous actions." },
  { q: "宿題をし（　）、遊びます。", options: ["ながら", "てから", "ように", "はず"], answer: 1, explain_vi: "してから = sau khi làm xong bài tập.", explain_en: "してから means after finishing the homework." },
  { q: "たくさん練習した（　）、負けました。", options: ["から", "ので", "のに", "ため"], answer: 2, explain_vi: "のに diễn tả sự trái ngược kèm cảm giác tiếc.", explain_en: "のに expresses an unexpected contrast." },
  { q: "彼は今日来る（　）です。", options: ["そう", "らしい", "みたい", "はず"], answer: 3, explain_vi: "はずです = suy đoán có căn cứ, chắc hẳn.", explain_en: "はずです is a well-grounded expectation." },
  { q: "急（　）ば、間に合います。", options: ["げ", "ぎ", "ご", "が"], answer: 0, explain_vi: "急ぐ thuộc nhóm 1: ぐ đổi thành げ + ば.", explain_en: "急ぐ is a group-1 verb: ぐ becomes げ before ば." },
  { q: "毎朝早く起きる（　）にしています。", options: ["こと", "よう", "ため", "もの"], answer: 1, explain_vi: "ようにしている = đang cố duy trì thói quen.", explain_en: "ようにしている means making an ongoing effort." },
  { q: "レベル（　）応じてクラスを分けます。", options: ["を", "が", "に", "で"], answer: 2, explain_vi: "に応じて là cụm cố định, luôn dùng trợ từ に.", explain_en: "に応じて is a fixed pattern taking に." },
  { q: "もう一度説明して（　）ませんか。", options: ["ください", "くれ", "あげ", "いただけ"], answer: 3, explain_vi: "していただけませんか là cách nhờ lịch sự nhất.", explain_en: "していただけませんか is the most polite request form." },
  { q: "今、駅に着いた（　）です。", options: ["ばかり", "だけ", "しか", "ほど"], answer: 0, explain_vi: "た + ばかり = vừa mới xảy ra.", explain_en: "た + ばかり means something just happened." },
  { q: "嫌いな（　）ではありません。", options: ["こと", "わけ", "はず", "つもり"], answer: 1, explain_vi: "わけではない = không hẳn là như vậy.", explain_en: "わけではない softens a denial." },
  { q: "社長はもうお帰り（　）なりました。", options: ["を", "が", "に", "で"], answer: 2, explain_vi: "お～になる là kính ngữ, dùng に.", explain_en: "お～になる is the honorific pattern with に." },
  { q: "明日は雪が降る（　）です。", options: ["ばかり", "わけ", "はず", "そう"], answer: 3, explain_vi: "降るそうです = nghe nói sẽ có tuyết (truyền đạt).", explain_en: "降るそうです reports hearsay." },

  // Kanji reading
  { q: "「働く」 đọc là gì? / How do you read 働く?", options: ["はたらく", "うごく", "つくる", "はしる"], answer: 0, explain_vi: "働く = hataraku, làm việc.", explain_en: "働く is read hataraku." },
  { q: "「覚える」 đọc là gì? / How do you read 覚える?", options: ["かんがえる", "おぼえる", "こたえる", "きこえる"], answer: 1, explain_vi: "覚える = oboeru, ghi nhớ.", explain_en: "覚える is read oboeru." },
  { q: "「経済」 đọc là gì? / How do you read 経済?", options: ["けいけん", "けいさん", "けいざい", "けいやく"], answer: 2, explain_vi: "経済 = keizai, kinh tế.", explain_en: "経済 is read keizai." },
  { q: "「環境」 đọc là gì? / How do you read 環境?", options: ["かんじょう", "かんそう", "かんこう", "かんきょう"], answer: 3, explain_vi: "環境 = kankyō, môi trường.", explain_en: "環境 is read kankyō." },
  { q: "「増える」 đọc là gì? / How do you read 増える?", options: ["ふえる", "へる", "かえる", "おえる"], answer: 0, explain_vi: "増える = fueru, tăng lên.", explain_en: "増える is read fueru." },
  { q: "「届く」 đọc là gì? / How do you read 届く?", options: ["つづく", "とどく", "はたらく", "うごく"], answer: 1, explain_vi: "届く = todoku, tới, đến tay.", explain_en: "届く is read todoku." },
  { q: "Kanji nào nghĩa là 'thuốc'? / Which kanji means medicine?", options: ["病", "熱", "薬", "痛"], answer: 2, explain_vi: "薬 = くすり, thuốc.", explain_en: "薬 (kusuri) means medicine." },
  { q: "Kanji nào nghĩa là 'quyết định'? / Which kanji means to decide?", options: ["選", "調", "続", "決"], answer: 3, explain_vi: "決める = kimeru, quyết định.", explain_en: "決 is used in 決める, to decide." },

  // Sentence order
  { q: "Sắp xếp: 会議 / から / 始まります / 十時 / は", options: ["会議は十時から始まります。", "十時は会議から始まります。", "会議から十時は始まります。", "始まります会議は十時から。"], answer: 0, explain_vi: "Chủ đề + thời gian + から + động từ.", explain_en: "Topic, then time with から, then the verb." },
  { q: "Sắp xếp: 薬 / 飲んで / を / ください", options: ["ください薬を飲んで。", "薬を飲んでください。", "飲んで薬をください。", "を薬飲んでください。"], answer: 1, explain_vi: "Tân ngữ + を + động từ thể て + ください.", explain_en: "Object + を + て-form + ください." },
  { q: "Sắp xếp: 雨 / 続いて / が / います", options: ["います雨が続いて。", "続いて雨がいます。", "雨が続いています。", "が雨続いています。"], answer: 2, explain_vi: "Chủ ngữ + が + động từ thể ています.", explain_en: "Subject + が + ている form." },
  { q: "Sắp xếp: 資料 / 送って / を / いただけませんか", options: ["送って資料をいただけませんか。", "を資料送っていただけませんか。", "いただけませんか資料を送って。", "資料を送っていただけませんか。"], answer: 3, explain_vi: "Tân ngữ + を + て + いただけませんか.", explain_en: "Object + を + て-form + いただけませんか." },

  // Situational choice
  { q: "Ở konbini muốn hâm nóng cơm hộp, bạn nói gì? / You want your bento warmed. What do you say?", options: ["温めてください。", "冷やしてください。", "包んでください。", "返してください。"], answer: 0, explain_vi: "温めてください = xin hâm nóng giúp.", explain_en: "温めてください asks them to warm it up." },
  { q: "Xin nghỉ làm một ngày, cách nói lịch sự nhất là? / The most polite way to ask for a day off?", options: ["休みます。", "休ませていただけませんか。", "休みたい。", "休むよ。"], answer: 1, explain_vi: "休ませていただけませんか = xin phép rất lịch sự.", explain_en: "休ませていただけませんか is a very polite request." },
  { q: "Món ăn bị nguội, cách nói nhẹ nhàng là? / Your dish is cold - the gentle way to say it?", options: ["冷たい!", "ひどいですね。", "冷めているようです。", "作り直せ。"], answer: 2, explain_vi: "ようです làm câu phàn nàn mềm hơn.", explain_en: "ようです softens the complaint." },
  { q: "Bạn muốn ghế cạnh cửa sổ trên máy bay? / You want a window seat?", options: ["通路側をお願いします。", "指定席は要りません。", "片道でお願いします。", "窓側の席をお願いします。"], answer: 3, explain_vi: "窓側 = phía cửa sổ; 通路側 = phía lối đi.", explain_en: "窓側 is window side, 通路側 is aisle side." },
  { q: "Nhân viên ngân hàng hỏi 印鑑, họ đang hỏi gì? / What is the clerk asking about with 印鑑?", options: ["Con dấu cá nhân / personal seal", "Hộ chiếu / passport", "Số dư / balance", "Danh thiếp / business card"], answer: 0, explain_vi: "印鑑 là con dấu cá nhân, thay chữ ký ở Nhật.", explain_en: "印鑑 is the personal seal used instead of a signature." },
  { q: "Ở nhà thuê, 光熱費 gồm những gì? / What does kōnetsuhi cover?", options: ["Tiền internet / internet", "Điện, ga, nước / electricity, gas, water", "Tiền cọc / the deposit", "Phí quản lý / management fee"], answer: 1, explain_vi: "光熱費 = chi phí điện, ga, nước.", explain_en: "光熱費 covers electricity, gas and water." },
  { q: "Tàu 各駅停車 khác 急行 thế nào? / How is 各駅停車 different from 急行?", options: ["Chạy ban đêm / runs at night", "Cần vé riêng / needs a special ticket", "Dừng ở mọi ga / stops at every station", "Chỉ có ghế đặt trước / reserved seats only"], answer: 2, explain_vi: "各駅停車 dừng mọi ga, 急行 chỉ dừng ga chính.", explain_en: "各駅停車 stops everywhere; 急行 skips minor stations." },
  { q: "Khi cấp trên nói 「お大事に」, ý là gì? / What does 「お大事に」 mean?", options: ["Làm nhanh lên / hurry up", "Cẩn thận tiền / mind your money", "Chúc mừng / congratulations", "Giữ sức khoẻ nhé / take care of yourself"], answer: 3, explain_vi: "お大事に dùng khi ai đó bị ốm.", explain_en: "お大事に is said to someone who is unwell." },
];
