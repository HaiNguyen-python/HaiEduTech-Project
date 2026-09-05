/**
 * @file expansion2.ts
 * @description Second content pack for the Japanese course: extra topical
 *  vocabulary, kanji cards, everyday dialogues, N4 grammar points and a larger
 *  practice bank. Every entry is written bilingually (Vietnamese + English) and
 *  avoids duplicating the first expansion pack.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

import type { JaPhrase } from "./types";

export interface JaVocabPack { topic: string; items: JaPhrase[] }
export interface JaKanjiCard {
  kanji: string; on: string; kun: string;
  meaning_vi: string; meaning_en: string; example: string;
}
export interface JaDialoguePack {
  title: string; scene: string;
  lines: Array<{ speaker: string; jp: string; romaji: string; vi: string; en: string }>;
}
export interface JaGrammarPack { title: string; explain: string; examples: JaPhrase[] }
export interface JaQuizPack {
  q: string; options: string[]; answer: number; explain_vi: string; explain_en: string;
}

/** ---------- Vocabulary: 8 new topics ---------- */
export const VOCAB_EXTRA_2: JaVocabPack[] = [
  { topic: "📅 Thời gian & lịch / Time & calendar", items: [
    { jp: "今日（きょう）", romaji: "kyō", vi: "hôm nay", en: "today" },
    { jp: "明日（あした）", romaji: "ashita", vi: "ngày mai", en: "tomorrow" },
    { jp: "昨日（きのう）", romaji: "kinō", vi: "hôm qua", en: "yesterday" },
    { jp: "来週（らいしゅう）", romaji: "raishū", vi: "tuần sau", en: "next week" },
    { jp: "先月（せんげつ）", romaji: "sengetsu", vi: "tháng trước", en: "last month" },
    { jp: "週末（しゅうまつ）", romaji: "shūmatsu", vi: "cuối tuần", en: "weekend" },
    { jp: "午前（ごぜん）", romaji: "gozen", vi: "buổi sáng (AM)", en: "a.m." },
    { jp: "午後（ごご）", romaji: "gogo", vi: "buổi chiều (PM)", en: "p.m." },
    { jp: "半（はん）", romaji: "han", vi: "rưỡi (30 phút)", en: "half past" },
    { jp: "誕生日（たんじょうび）", romaji: "tanjōbi", vi: "sinh nhật", en: "birthday" },
  ]},
  { topic: "🧭 Phương hướng & vị trí / Directions & position", items: [
    { jp: "近く（ちかく）", romaji: "chikaku", vi: "gần đây", en: "nearby" },
    { jp: "遠く（とおく）", romaji: "tōku", vi: "xa", en: "far" },
    { jp: "隣（となり）", romaji: "tonari", vi: "bên cạnh", en: "next to" },
    { jp: "向かい（むかい）", romaji: "mukai", vi: "đối diện", en: "across from" },
    { jp: "角（かど）", romaji: "kado", vi: "góc phố", en: "corner" },
    { jp: "信号（しんごう）", romaji: "shingō", vi: "đèn giao thông", en: "traffic light" },
    { jp: "交差点（こうさてん）", romaji: "kōsaten", vi: "giao lộ", en: "intersection" },
    { jp: "まっすぐ", romaji: "massugu", vi: "đi thẳng", en: "straight ahead" },
    { jp: "曲がる（まがる）", romaji: "magaru", vi: "rẽ, quay", en: "to turn" },
    { jp: "渡る（わたる）", romaji: "wataru", vi: "băng qua", en: "to cross" },
  ]},
  { topic: "🏃 Thể thao & vận động / Sports & exercise", items: [
    { jp: "運動（うんどう）", romaji: "undō", vi: "vận động, thể dục", en: "exercise" },
    { jp: "野球（やきゅう）", romaji: "yakyū", vi: "bóng chày", en: "baseball" },
    { jp: "水泳（すいえい）", romaji: "suiei", vi: "môn bơi", en: "swimming" },
    { jp: "散歩（さんぽ）", romaji: "sanpo", vi: "đi bộ dạo", en: "a walk" },
    { jp: "試合（しあい）", romaji: "shiai", vi: "trận đấu", en: "match, game" },
    { jp: "選手（せんしゅ）", romaji: "senshu", vi: "tuyển thủ", en: "athlete" },
    { jp: "練習（れんしゅう）", romaji: "renshū", vi: "luyện tập", en: "practice" },
    { jp: "勝つ（かつ）", romaji: "katsu", vi: "thắng", en: "to win" },
    { jp: "負ける（まける）", romaji: "makeru", vi: "thua", en: "to lose" },
    { jp: "疲れる（つかれる）", romaji: "tsukareru", vi: "mệt, kiệt sức", en: "to get tired" },
  ]},
  { topic: "💻 Công nghệ & internet / Technology & internet", items: [
    { jp: "画面（がめん）", romaji: "gamen", vi: "màn hình", en: "screen" },
    { jp: "電池（でんち）", romaji: "denchi", vi: "pin", en: "battery" },
    { jp: "写真（しゃしん）", romaji: "shashin", vi: "ảnh", en: "photo" },
    { jp: "動画（どうが）", romaji: "dōga", vi: "video", en: "video" },
    { jp: "検索する（けんさくする）", romaji: "kensaku suru", vi: "tìm kiếm", en: "to search" },
    { jp: "送る（おくる）", romaji: "okuru", vi: "gửi", en: "to send" },
    { jp: "登録する（とうろくする）", romaji: "tōroku suru", vi: "đăng ký", en: "to register" },
    { jp: "使い方（つかいかた）", romaji: "tsukaikata", vi: "cách dùng", en: "how to use" },
    { jp: "無料（むりょう）", romaji: "muryō", vi: "miễn phí", en: "free of charge" },
    { jp: "便利（べんり）", romaji: "benri", vi: "tiện lợi", en: "convenient" },
  ]},
  { topic: "🍱 Ở nhà hàng / At a restaurant", items: [
    { jp: "注文（ちゅうもん）", romaji: "chūmon", vi: "gọi món", en: "order" },
    { jp: "メニュー", romaji: "menyū", vi: "thực đơn", en: "menu" },
    { jp: "定食（ていしょく）", romaji: "teishoku", vi: "cơm phần", en: "set meal" },
    { jp: "お勧め（おすすめ）", romaji: "osusume", vi: "món gợi ý", en: "recommendation" },
    { jp: "会計（かいけい）", romaji: "kaikei", vi: "thanh toán", en: "the bill" },
    { jp: "別々（べつべつ）", romaji: "betsubetsu", vi: "trả riêng", en: "separately" },
    { jp: "おかわり", romaji: "okawari", vi: "thêm một phần", en: "a refill" },
    { jp: "禁煙（きんえん）", romaji: "kin'en", vi: "cấm thuốc lá", en: "no smoking" },
    { jp: "席（せき）", romaji: "seki", vi: "chỗ ngồi", en: "seat" },
    { jp: "満席（まんせき）", romaji: "manseki", vi: "hết chỗ", en: "fully booked" },
  ]},
  { topic: "🏙️ Thành phố & tiện ích / City & services", items: [
    { jp: "市役所（しやくしょ）", romaji: "shiyakusho", vi: "toà thị chính", en: "city hall" },
    { jp: "図書館（としょかん）", romaji: "toshokan", vi: "thư viện", en: "library" },
    { jp: "公園（こうえん）", romaji: "kōen", vi: "công viên", en: "park" },
    { jp: "美術館（びじゅつかん）", romaji: "bijutsukan", vi: "bảo tàng mỹ thuật", en: "art museum" },
    { jp: "交番（こうばん）", romaji: "kōban", vi: "trạm cảnh sát", en: "police box" },
    { jp: "薬局（やっきょく）", romaji: "yakkyoku", vi: "hiệu thuốc", en: "pharmacy" },
    { jp: "美容院（びよういん）", romaji: "biyōin", vi: "tiệm làm đầu", en: "hair salon" },
    { jp: "駐車場（ちゅうしゃじょう）", romaji: "chūshajō", vi: "bãi đỗ xe", en: "parking lot" },
    { jp: "受付（うけつけ）", romaji: "uketsuke", vi: "quầy tiếp tân", en: "reception" },
    { jp: "案内（あんない）", romaji: "annai", vi: "hướng dẫn, chỉ dẫn", en: "guidance" },
  ]},
  { topic: "👗 Quần áo & ngoại hình / Clothes & appearance", items: [
    { jp: "服（ふく）", romaji: "fuku", vi: "quần áo", en: "clothes" },
    { jp: "上着（うわぎ）", romaji: "uwagi", vi: "áo khoác", en: "jacket" },
    { jp: "靴（くつ）", romaji: "kutsu", vi: "giày", en: "shoes" },
    { jp: "帽子（ぼうし）", romaji: "bōshi", vi: "mũ", en: "hat" },
    { jp: "眼鏡（めがね）", romaji: "megane", vi: "kính", en: "glasses" },
    { jp: "色（いろ）", romaji: "iro", vi: "màu sắc", en: "colour" },
    { jp: "サイズ", romaji: "saizu", vi: "cỡ, kích thước", en: "size" },
    { jp: "着る（きる）", romaji: "kiru", vi: "mặc (áo)", en: "to wear" },
    { jp: "履く（はく）", romaji: "haku", vi: "mặc (quần, giày)", en: "to put on (shoes)" },
    { jp: "似合う（にあう）", romaji: "niau", vi: "phù hợp, trông hợp", en: "to suit someone" },
  ]},
  { topic: "🗓️ Kế hoạch & học tập / Plans & study habits", items: [
    { jp: "予定（よてい）", romaji: "yotei", vi: "kế hoạch", en: "plan, schedule" },
    { jp: "目標（もくひょう）", romaji: "mokuhyō", vi: "mục tiêu", en: "goal" },
    { jp: "復習（ふくしゅう）", romaji: "fukushū", vi: "ôn lại", en: "review" },
    { jp: "予習（よしゅう）", romaji: "yoshū", vi: "học trước bài", en: "prepare a lesson" },
    { jp: "発音（はつおん）", romaji: "hatsuon", vi: "phát âm", en: "pronunciation" },
    { jp: "会話（かいわ）", romaji: "kaiwa", vi: "hội thoại", en: "conversation" },
    { jp: "作文（さくぶん）", romaji: "sakubun", vi: "bài viết", en: "composition" },
    { jp: "間違い（まちがい）", romaji: "machigai", vi: "lỗi sai", en: "mistake" },
    { jp: "続ける（つづける）", romaji: "tsuzukeru", vi: "tiếp tục", en: "to continue" },
    { jp: "合格する（ごうかくする）", romaji: "gōkaku suru", vi: "đỗ, đạt kỳ thi", en: "to pass an exam" },
  ]},
];

/** ---------- Kanji: 24 new characters ---------- */
export const KANJI_EXTRA_2: JaKanjiCard[] = [
  { kanji: "立", on: "リツ", kun: "た(つ)", meaning_vi: "đứng", meaning_en: "to stand", example: "立ってください。 (Tatte kudasai.) - Xin hãy đứng lên. / Please stand up." },
  { kanji: "休", on: "キュウ", kun: "やす(む)", meaning_vi: "nghỉ", meaning_en: "rest", example: "日曜日は休みます。 (Nichiyōbi wa yasumimasu.) - Chủ nhật tôi nghỉ. / I rest on Sunday." },
  { kanji: "使", on: "シ", kun: "つか(う)", meaning_vi: "dùng, sử dụng", meaning_en: "to use", example: "パソコンを使います。 (Pasokon o tsukaimasu.) - Tôi dùng máy tính. / I use a computer." },
  { kanji: "待", on: "タイ", kun: "ま(つ)", meaning_vi: "đợi", meaning_en: "to wait", example: "駅で待ちます。 (Eki de machimasu.) - Tôi đợi ở ga. / I wait at the station." },
  { kanji: "持", on: "ジ", kun: "も(つ)", meaning_vi: "mang, cầm", meaning_en: "to hold, carry", example: "傘を持っています。 (Kasa o motte imasu.) - Tôi đang mang dù. / I have an umbrella." },
  { kanji: "思", on: "シ", kun: "おも(う)", meaning_vi: "nghĩ", meaning_en: "to think", example: "いいと思います。 (Ii to omoimasu.) - Tôi nghĩ là tốt. / I think it is good." },
  { kanji: "知", on: "チ", kun: "し(る)", meaning_vi: "biết", meaning_en: "to know", example: "その店を知っています。 (Sono mise o shitte imasu.) - Tôi biết cửa hàng đó. / I know that shop." },
  { kanji: "作", on: "サク", kun: "つく(る)", meaning_vi: "làm, tạo ra", meaning_en: "to make", example: "料理を作ります。 (Ryōri o tsukurimasu.) - Tôi nấu ăn. / I cook a meal." },
  { kanji: "開", on: "カイ", kun: "あ(ける)", meaning_vi: "mở", meaning_en: "to open", example: "窓を開けます。 (Mado o akemasu.) - Tôi mở cửa sổ. / I open the window." },
  { kanji: "閉", on: "ヘイ", kun: "し(める)", meaning_vi: "đóng", meaning_en: "to close", example: "ドアを閉めてください。 (Doa o shimete kudasai.) - Xin hãy đóng cửa. / Please close the door." },
  { kanji: "始", on: "シ", kun: "はじ(める)", meaning_vi: "bắt đầu", meaning_en: "to begin", example: "授業が始まります。 (Jugyō ga hajimarimasu.) - Giờ học bắt đầu. / The class begins." },
  { kanji: "終", on: "シュウ", kun: "お(わる)", meaning_vi: "kết thúc", meaning_en: "to end", example: "仕事が終わりました。 (Shigoto ga owarimashita.) - Công việc đã xong. / Work has finished." },
  { kanji: "送", on: "ソウ", kun: "おく(る)", meaning_vi: "gửi, đưa đi", meaning_en: "to send", example: "メールを送ります。 (Mēru o okurimasu.) - Tôi gửi email. / I send an email." },
  { kanji: "借", on: "シャク", kun: "か(りる)", meaning_vi: "mượn", meaning_en: "to borrow", example: "本を借りました。 (Hon o karimashita.) - Tôi đã mượn sách. / I borrowed a book." },
  { kanji: "歩", on: "ホ", kun: "ある(く)", meaning_vi: "đi bộ", meaning_en: "to walk", example: "公園を歩きます。 (Kōen o arukimasu.) - Tôi đi bộ trong công viên. / I walk in the park." },
  { kanji: "走", on: "ソウ", kun: "はし(る)", meaning_vi: "chạy", meaning_en: "to run", example: "毎朝走ります。 (Maiasa hashirimasu.) - Sáng nào tôi cũng chạy. / I run every morning." },
  { kanji: "飯", on: "ハン", kun: "めし", meaning_vi: "cơm, bữa ăn", meaning_en: "cooked rice, meal", example: "ご飯を食べます。 (Gohan o tabemasu.) - Tôi ăn cơm. / I eat a meal." },
  { kanji: "茶", on: "チャ", kun: "-", meaning_vi: "trà", meaning_en: "tea", example: "お茶を飲みます。 (Ocha o nomimasu.) - Tôi uống trà. / I drink tea." },
  { kanji: "魚", on: "ギョ", kun: "さかな", meaning_vi: "cá", meaning_en: "fish", example: "魚が好きです。 (Sakana ga suki desu.) - Tôi thích cá. / I like fish." },
  { kanji: "肉", on: "ニク", kun: "-", meaning_vi: "thịt", meaning_en: "meat", example: "肉を買います。 (Niku o kaimasu.) - Tôi mua thịt. / I buy meat." },
  { kanji: "菜", on: "サイ", kun: "な", meaning_vi: "rau", meaning_en: "vegetable", example: "野菜は体にいいです。 (Yasai wa karada ni ii desu.) - Rau tốt cho cơ thể. / Vegetables are good for you." },
  { kanji: "味", on: "ミ", kun: "あじ", meaning_vi: "vị", meaning_en: "taste", example: "味はどうですか。 (Aji wa dō desu ka.) - Vị thế nào? / How does it taste?" },
  { kanji: "洗", on: "セン", kun: "あら(う)", meaning_vi: "rửa, giặt", meaning_en: "to wash", example: "手を洗います。 (Te o araimasu.) - Tôi rửa tay. / I wash my hands." },
  { kanji: "教", on: "キョウ", kun: "おし(える)", meaning_vi: "dạy", meaning_en: "to teach", example: "日本語を教えます。 (Nihongo o oshiemasu.) - Tôi dạy tiếng Nhật. / I teach Japanese." },
];

/** ---------- Dialogues: 6 new everyday scenes ---------- */
export const DIALOGUES_EXTRA_2: JaDialoguePack[] = [
  { title: "🍱 Gọi món ở nhà hàng / Ordering at a restaurant", scene: "Khách và nhân viên phục vụ. / A guest and a waiter.", lines: [
    { speaker: "店員", jp: "いらっしゃいませ。何名様ですか。", romaji: "Irasshaimase. Nan-mei-sama desu ka.", vi: "Xin mời vào. Quý khách mấy người ạ?", en: "Welcome. How many people?" },
    { speaker: "客", jp: "二人です。禁煙席をお願いします。", romaji: "Futari desu. Kin'en-seki o onegaishimasu.", vi: "Hai người. Cho tôi chỗ không khói thuốc.", en: "Two, please. A non-smoking table." },
    { speaker: "店員", jp: "こちらへどうぞ。ご注文は?", romaji: "Kochira e dōzo. Go-chūmon wa?", vi: "Mời đi lối này. Quý khách gọi gì ạ?", en: "This way please. What would you like?" },
    { speaker: "客", jp: "お勧めは何ですか。", romaji: "Osusume wa nan desu ka.", vi: "Món nào được gợi ý ạ?", en: "What do you recommend?" },
    { speaker: "店員", jp: "魚の定食が人気です。", romaji: "Sakana no teishoku ga ninki desu.", vi: "Cơm phần cá rất được yêu thích.", en: "The fish set meal is popular." },
    { speaker: "客", jp: "じゃあ、それを二つください。", romaji: "Jā, sore o futatsu kudasai.", vi: "Vậy cho tôi hai phần đó.", en: "Then two of those, please." },
    { speaker: "店員", jp: "かしこまりました。少しお待ちください。", romaji: "Kashikomarimashita. Sukoshi omachi kudasai.", vi: "Vâng ạ. Xin đợi một chút.", en: "Certainly. Please wait a moment." },
  ]},
  { title: "🧭 Hỏi đường / Asking for directions", scene: "Trên phố, hỏi người đi đường. / On the street.", lines: [
    { speaker: "旅行者", jp: "すみません、図書館はどこですか。", romaji: "Sumimasen, toshokan wa doko desu ka.", vi: "Xin lỗi, thư viện ở đâu ạ?", en: "Excuse me, where is the library?" },
    { speaker: "町の人", jp: "この道をまっすぐ行ってください。", romaji: "Kono michi o massugu itte kudasai.", vi: "Hãy đi thẳng con đường này.", en: "Go straight along this street." },
    { speaker: "旅行者", jp: "信号を渡りますか。", romaji: "Shingō o watarimasu ka.", vi: "Tôi có phải băng qua đèn giao thông không?", en: "Do I cross at the traffic light?" },
    { speaker: "町の人", jp: "はい。渡ってから右に曲がります。", romaji: "Hai. Watatte kara migi ni magarimasu.", vi: "Vâng. Sau khi băng qua thì rẽ phải.", en: "Yes. After crossing, turn right." },
    { speaker: "旅行者", jp: "ここから遠いですか。", romaji: "Koko kara tōi desu ka.", vi: "Từ đây có xa không ạ?", en: "Is it far from here?" },
    { speaker: "町の人", jp: "いいえ、歩いて五分ぐらいです。", romaji: "Iie, aruite go-fun gurai desu.", vi: "Không, đi bộ khoảng 5 phút.", en: "No, about five minutes on foot." },
    { speaker: "旅行者", jp: "ありがとうございます。助かりました。", romaji: "Arigatō gozaimasu. Tasukarimashita.", vi: "Cảm ơn ạ. Anh giúp tôi nhiều lắm.", en: "Thank you. That helped a lot." },
  ]},
  { title: "🎒 Ngày đầu ở lớp / First day in class", scene: "Học sinh mới tự giới thiệu. / A new student introduces himself.", lines: [
    { speaker: "先生", jp: "皆さん、新しい学生です。", romaji: "Minasan, atarashii gakusei desu.", vi: "Các em, đây là bạn học mới.", en: "Everyone, this is a new student." },
    { speaker: "ハイ", jp: "はじめまして。ベトナムから来たハイです。", romaji: "Hajimemashite. Betonamu kara kita Hai desu.", vi: "Rất vui được gặp. Tôi là Hải, đến từ Việt Nam.", en: "Nice to meet you. I am Hai, from Vietnam." },
    { speaker: "先生", jp: "日本語を何年勉強しましたか。", romaji: "Nihongo o nan-nen benkyō shimashita ka.", vi: "Em học tiếng Nhật mấy năm rồi?", en: "How many years have you studied Japanese?" },
    { speaker: "ハイ", jp: "一年です。まだ下手ですが、頑張ります。", romaji: "Ichi-nen desu. Mada heta desu ga, ganbarimasu.", vi: "Một năm ạ. Em còn kém nhưng em sẽ cố gắng.", en: "One year. I am still weak, but I will work hard." },
    { speaker: "学生", jp: "わからない時は聞いてくださいね。", romaji: "Wakaranai toki wa kiite kudasai ne.", vi: "Khi nào không hiểu thì cứ hỏi nhé.", en: "Ask us whenever you do not understand." },
    { speaker: "ハイ", jp: "はい、よろしくお願いします。", romaji: "Hai, yoroshiku onegaishimasu.", vi: "Vâng, mong mọi người giúp đỡ.", en: "Yes, pleased to meet you all." },
  ]},
  { title: "🏨 Nhận phòng khách sạn / Checking into a hotel", scene: "Quầy tiếp tân khách sạn. / At the hotel reception.", lines: [
    { speaker: "客", jp: "予約したグエンです。チェックインお願いします。", romaji: "Yoyaku shita Nguen desu. Chekkuin onegaishimasu.", vi: "Tôi là Nguyễn, đã đặt phòng. Cho tôi nhận phòng.", en: "I am Nguyen, I have a booking. Check-in, please." },
    { speaker: "受付", jp: "お名前を確認します。二泊ですね。", romaji: "O-namae o kakunin shimasu. Ni-haku desu ne.", vi: "Tôi kiểm tra tên ạ. Quý khách ở hai đêm phải không?", en: "Let me check your name. Two nights, correct?" },
    { speaker: "客", jp: "はい。朝ご飯は何時からですか。", romaji: "Hai. Asagohan wa nan-ji kara desu ka.", vi: "Vâng. Bữa sáng từ mấy giờ ạ?", en: "Yes. What time does breakfast start?" },
    { speaker: "受付", jp: "七時から九時半までです。", romaji: "Shichi-ji kara ku-ji han made desu.", vi: "Từ 7 giờ đến 9 giờ 30.", en: "From seven to nine thirty." },
    { speaker: "客", jp: "部屋でインターネットは使えますか。", romaji: "Heya de intānetto wa tsukaemasu ka.", vi: "Trong phòng dùng được internet không?", en: "Can I use the internet in the room?" },
    { speaker: "受付", jp: "はい、無料です。こちらが鍵です。", romaji: "Hai, muryō desu. Kochira ga kagi desu.", vi: "Vâng, miễn phí ạ. Đây là chìa khoá.", en: "Yes, it is free. Here is your key." },
  ]},
  { title: "📮 Ở bưu điện / At the post office", scene: "Gửi bưu kiện về nhà. / Sending a parcel home.", lines: [
    { speaker: "客", jp: "この小包をベトナムに送りたいです。", romaji: "Kono kozutsumi o Betonamu ni okuritai desu.", vi: "Tôi muốn gửi bưu kiện này về Việt Nam.", en: "I would like to send this parcel to Vietnam." },
    { speaker: "局員", jp: "船便と航空便、どちらにしますか。", romaji: "Funabin to kōkūbin, dochira ni shimasu ka.", vi: "Anh chọn gửi tàu biển hay máy bay?", en: "Sea mail or air mail?" },
    { speaker: "客", jp: "航空便でお願いします。いくらですか。", romaji: "Kōkūbin de onegaishimasu. Ikura desu ka.", vi: "Cho tôi gửi máy bay. Bao nhiêu tiền ạ?", en: "Air mail, please. How much is it?" },
    { speaker: "局員", jp: "三千二百円です。中身は何ですか。", romaji: "San-zen ni-hyaku en desu. Nakami wa nan desu ka.", vi: "3.200 yên ạ. Bên trong là gì?", en: "It is 3,200 yen. What is inside?" },
    { speaker: "客", jp: "本とお菓子です。", romaji: "Hon to okashi desu.", vi: "Sách và bánh ạ.", en: "Books and snacks." },
    { speaker: "局員", jp: "この書類に住所を記入してください。", romaji: "Kono shorui ni jūsho o kinyū shite kudasai.", vi: "Xin điền địa chỉ vào tờ khai này.", en: "Please write the address on this form." },
  ]},
  { title: "🎉 Rủ bạn đi chơi cuối tuần / Weekend plans with a friend", scene: "Hai người bạn nhắn nhau. / Two friends chatting.", lines: [
    { speaker: "ゆき", jp: "週末、何か予定がありますか。", romaji: "Shūmatsu, nanika yotei ga arimasu ka.", vi: "Cuối tuần bạn có kế hoạch gì chưa?", en: "Do you have plans this weekend?" },
    { speaker: "ハイ", jp: "土曜日はアルバイトですが、日曜日は暇です。", romaji: "Doyōbi wa arubaito desu ga, nichiyōbi wa hima desu.", vi: "Thứ bảy tôi làm thêm, nhưng chủ nhật thì rảnh.", en: "I work Saturday, but Sunday I am free." },
    { speaker: "ゆき", jp: "じゃあ、美術館に行きませんか。", romaji: "Jā, bijutsukan ni ikimasen ka.", vi: "Vậy đi bảo tàng mỹ thuật nhé?", en: "Then shall we go to the art museum?" },
    { speaker: "ハイ", jp: "いいですね。何時に会いましょうか。", romaji: "Ii desu ne. Nan-ji ni aimashō ka.", vi: "Hay đó. Mấy giờ gặp nhau nhỉ?", en: "Sounds good. What time shall we meet?" },
    { speaker: "ゆき", jp: "十時に駅の前で待っています。", romaji: "Jū-ji ni eki no mae de matte imasu.", vi: "10 giờ tôi đợi trước ga.", en: "I will wait in front of the station at ten." },
    { speaker: "ハイ", jp: "わかりました。遅れないようにします。", romaji: "Wakarimashita. Okurenai yō ni shimasu.", vi: "Tôi hiểu rồi. Tôi sẽ cố không đến muộn.", en: "Understood. I will try not to be late." },
  ]},
];

/** ---------- Grammar: 12 new N4 points ---------- */
export const GRAMMAR_EXTRA_2: JaGrammarPack[] = [
  { title: "21. ~ないでください - Xin đừng làm gì", explain: "Thể ない của động từ + でください để yêu cầu người khác không làm điều gì, lịch sự nhưng rõ ràng.", examples: [
    { jp: "ここで写真を撮らないでください。", romaji: "Koko de shashin o toranaide kudasai.", vi: "Xin đừng chụp ảnh ở đây.", en: "Please do not take photos here." },
    { jp: "心配しないでください。", romaji: "Shinpai shinaide kudasai.", vi: "Xin đừng lo lắng.", en: "Please do not worry." },
  ]},
  { title: "22. ~たほうがいいです - Nên làm gì", explain: "Động từ thể た + ほうがいいです để khuyên nên làm. Phủ định: thể ない + ほうがいいです (không nên).", examples: [
    { jp: "早く寝たほうがいいですよ。", romaji: "Hayaku neta hō ga ii desu yo.", vi: "Bạn nên đi ngủ sớm.", en: "You should go to bed early." },
    { jp: "コーヒーを飲まないほうがいいです。", romaji: "Kōhī o nomanai hō ga ii desu.", vi: "Bạn không nên uống cà phê.", en: "You had better not drink coffee." },
  ]},
  { title: "23. ~つもりです - Dự định làm gì", explain: "Động từ thể từ điển + つもりです diễn tả ý định đã cân nhắc của người nói.", examples: [
    { jp: "来年、日本へ留学するつもりです。", romaji: "Rainen, Nihon e ryūgaku suru tsumori desu.", vi: "Năm sau tôi dự định đi du học Nhật.", en: "I plan to study in Japan next year." },
    { jp: "今日は残業しないつもりです。", romaji: "Kyō wa zangyō shinai tsumori desu.", vi: "Hôm nay tôi không định làm thêm giờ.", en: "I do not intend to work overtime today." },
  ]},
  { title: "24. Thể khả năng - Có thể làm được", explain: "Nhóm 1 đổi -u thành -eru (話す -> 話せる), nhóm 2 thêm られる (食べる -> 食べられる), する -> できる, 来る -> 来られる. Tân ngữ thường đổi を thành が.", examples: [
    { jp: "日本語が少し話せます。", romaji: "Nihongo ga sukoshi hanasemasu.", vi: "Tôi nói được tiếng Nhật một chút.", en: "I can speak a little Japanese." },
    { jp: "辛い物が食べられません。", romaji: "Karai mono ga taberaremasen.", vi: "Tôi không ăn được đồ cay.", en: "I cannot eat spicy food." },
  ]},
  { title: "25. ~と思います - Tôi nghĩ rằng", explain: "Câu ở thể thường + と思います để nêu ý kiến. Không dùng です trước と思います.", examples: [
    { jp: "この本は面白いと思います。", romaji: "Kono hon wa omoshiroi to omoimasu.", vi: "Tôi nghĩ quyển sách này thú vị.", en: "I think this book is interesting." },
    { jp: "彼は来ないと思います。", romaji: "Kare wa konai to omoimasu.", vi: "Tôi nghĩ anh ấy sẽ không đến.", en: "I do not think he will come." },
  ]},
  { title: "26. ~かもしれません / ~でしょう - Có lẽ, chắc là", explain: "かもしれません chỉ khả năng thấp (có thể); でしょう chỉ dự đoán khá chắc chắn.", examples: [
    { jp: "明日は雨かもしれません。", romaji: "Ashita wa ame kamoshiremasen.", vi: "Có thể mai sẽ mưa.", en: "It might rain tomorrow." },
    { jp: "彼はもう着いたでしょう。", romaji: "Kare wa mō tsuita deshō.", vi: "Chắc anh ấy đã đến rồi.", en: "He has probably arrived already." },
  ]},
  { title: "27. ~ながら - Vừa làm A vừa làm B", explain: "Bỏ ます của động từ phụ + ながら. Hai hành động cùng lúc, hành động chính đứng sau.", examples: [
    { jp: "音楽を聞きながら勉強します。", romaji: "Ongaku o kikinagara benkyō shimasu.", vi: "Tôi vừa nghe nhạc vừa học.", en: "I study while listening to music." },
    { jp: "歩きながら電話しないでください。", romaji: "Arukinagara denwa shinaide kudasai.", vi: "Xin đừng vừa đi vừa gọi điện.", en: "Please do not phone while walking." },
  ]},
  { title: "28. ~まえに / ~あとで - Trước khi, sau khi", explain: "Thể từ điển + まえに (trước khi); thể た + あとで (sau khi). Với danh từ dùng の: 食事のまえに.", examples: [
    { jp: "寝る前に歯を磨きます。", romaji: "Neru mae ni ha o migakimasu.", vi: "Trước khi ngủ tôi đánh răng.", en: "I brush my teeth before sleeping." },
    { jp: "授業が終わったあとで買い物します。", romaji: "Jugyō ga owatta ato de kaimono shimasu.", vi: "Sau khi tan học tôi đi mua sắm.", en: "I shop after class ends." },
  ]},
  { title: "29. ~とき - Khi, lúc", explain: "Danh từ + の + とき, tính từ / động từ ở thể thường + とき. Thời của động từ trước とき cho biết hành động xảy ra trước hay đang xảy ra.", examples: [
    { jp: "子供のとき、よく川で泳ぎました。", romaji: "Kodomo no toki, yoku kawa de oyogimashita.", vi: "Hồi nhỏ tôi thường bơi ở sông.", en: "When I was a child I often swam in the river." },
    { jp: "日本へ行くとき、地図を買います。", romaji: "Nihon e iku toki, chizu o kaimasu.", vi: "Khi đi Nhật tôi sẽ mua bản đồ.", en: "I will buy a map when I go to Japan." },
  ]},
  { title: "30. ~すぎる - Quá mức", explain: "Bỏ ます của động từ hoặc bỏ い / な của tính từ + すぎる, mang nghĩa tiêu cực là quá mức.", examples: [
    { jp: "昨日、食べすぎました。", romaji: "Kinō, tabesugimashita.", vi: "Hôm qua tôi ăn quá nhiều.", en: "I ate too much yesterday." },
    { jp: "この靴は小さすぎます。", romaji: "Kono kutsu wa chiisasugimasu.", vi: "Đôi giày này quá nhỏ.", en: "These shoes are too small." },
  ]},
  { title: "31. ~はじめる / ~つづける / ~おわる - Bắt đầu, tiếp tục, xong", explain: "Bỏ ます của động từ chính rồi ghép はじめる, つづける hoặc おわる để nói giai đoạn của hành động.", examples: [
    { jp: "去年、日本語を習いはじめました。", romaji: "Kyonen, Nihongo o naraihajimemashita.", vi: "Năm ngoái tôi bắt đầu học tiếng Nhật.", en: "I started learning Japanese last year." },
    { jp: "毎日、練習をつづけています。", romaji: "Mainichi, renshū o tsuzukete imasu.", vi: "Ngày nào tôi cũng luyện tập tiếp.", en: "I keep practising every day." },
  ]},
  { title: "32. ~てあげる / ~てくれる / ~てもらう - Làm giúp ai", explain: "てあげる: mình làm cho người khác; てくれる: người khác làm cho mình; てもらう: mình nhận được việc ai làm giúp.", examples: [
    { jp: "友達に写真を送ってあげました。", romaji: "Tomodachi ni shashin o okutte agemashita.", vi: "Tôi đã gửi ảnh giúp bạn.", en: "I sent the photo for my friend." },
    { jp: "先生が漢字を教えてくれました。", romaji: "Sensei ga kanji o oshiete kuremashita.", vi: "Thầy đã dạy kanji cho tôi.", en: "The teacher taught me kanji." },
  ]},
];

/** ---------- Practice bank: 50 new questions ---------- */
export const JA_QUIZ_EXTRA_2: JaQuizPack[] = [
  // Meaning
  { q: "「週末」 nghĩa là gì? / What does shūmatsu mean?", options: ["Cuối tuần / weekend", "Ngày lễ / holiday", "Buổi trưa / noon", "Tháng sau / next month"], answer: 0, explain_vi: "週末 = cuối tuần.", explain_en: "週末 means weekend." },
  { q: "「予定」 nghĩa là gì? / What does yotei mean?", options: ["Bài tập / homework", "Kế hoạch / plan", "Món quà / gift", "Kỷ niệm / memory"], answer: 1, explain_vi: "予定 = kế hoạch, dự định.", explain_en: "予定 means plan or schedule." },
  { q: "「便利」 nghĩa là gì? / What does benri mean?", options: ["Bất tiện / inconvenient", "Đắt / expensive", "Tiện lợi / convenient", "Nguy hiểm / dangerous"], answer: 2, explain_vi: "便利 = tiện lợi.", explain_en: "便利 means convenient." },
  { q: "「無料」 nghĩa là gì? / What does muryō mean?", options: ["Bắt buộc / required", "Có phí / paid", "Giới hạn / limited", "Miễn phí / free"], answer: 3, explain_vi: "無料 = miễn phí.", explain_en: "無料 means free of charge." },
  { q: "「注文」 dùng ở đâu nhiều nhất? / Where is chūmon used most?", options: ["Nhà hàng, khi gọi món / restaurant order", "Bệnh viện / hospital", "Trường học / school", "Sân bay / airport"], answer: 0, explain_vi: "注文 = gọi món, đặt hàng.", explain_en: "注文 means to order food or goods." },
  { q: "「似合う」 nghĩa là gì? / What does niau mean?", options: ["Nhớ / to remember", "Trông hợp, phù hợp / to suit", "Bán / to sell", "Rơi / to drop"], answer: 1, explain_vi: "似合う = trông hợp với ai.", explain_en: "似合う means to suit someone." },
  { q: "「復習」 nghĩa là gì? / What does fukushū mean?", options: ["Học trước bài / preview", "Thi thử / mock test", "Ôn lại bài / review", "Nghỉ học / skip class"], answer: 2, explain_vi: "復習 = ôn lại; 予習 = học trước.", explain_en: "復習 is review; 予習 is preview." },
  { q: "「疲れる」 nghĩa là gì? / What does tsukareru mean?", options: ["Vui / happy", "Đói / hungry", "Buồn ngủ / sleepy", "Mệt / to get tired"], answer: 3, explain_vi: "疲れる = mệt, kiệt sức.", explain_en: "疲れる means to get tired." },
  { q: "「別々」 dùng khi nào? / When do you say betsubetsu?", options: ["Khi muốn trả tiền riêng / paying separately", "Khi khen món ăn / praising food", "Khi xin thêm cơm / asking a refill", "Khi đặt chỗ / booking a seat"], answer: 0, explain_vi: "別々でお願いします = xin tính riêng.", explain_en: "It means 'separate bills, please'." },
  { q: "「案内」 nghĩa là gì? / What does annai mean?", options: ["Vé / ticket", "Hướng dẫn, chỉ dẫn / guidance", "Địa chỉ / address", "Hoá đơn / receipt"], answer: 1, explain_vi: "案内 = hướng dẫn, dẫn đường.", explain_en: "案内 means guidance." },
  { q: "「合格する」 nghĩa là gì? / What does gōkaku suru mean?", options: ["Trượt kỳ thi / to fail", "Nộp bài / to submit", "Đỗ kỳ thi / to pass", "Ôn bài / to revise"], answer: 2, explain_vi: "合格する = đỗ, đạt kỳ thi.", explain_en: "合格する means to pass an exam." },
  { q: "「間違い」 nghĩa là gì? / What does machigai mean?", options: ["Câu trả lời / answer", "Câu hỏi / question", "Điểm số / score", "Lỗi sai / mistake"], answer: 3, explain_vi: "間違い = lỗi, chỗ sai.", explain_en: "間違い means mistake." },

  // Particles
  { q: "「駅の前___待っています」 điền trợ từ nào? / Which particle?", options: ["で", "を", "が", "も"], answer: 0, explain_vi: "で chỉ nơi diễn ra hành động chờ.", explain_en: "で marks where the waiting happens." },
  { q: "「日本語___話せます」 điền gì? / Which particle with the potential form?", options: ["を", "が", "に", "へ"], answer: 1, explain_vi: "Thể khả năng thường dùng が thay を.", explain_en: "The potential form usually takes が instead of を." },
  { q: "「七時___九時半まで」 điền gì? / Which particle?", options: ["に", "で", "から", "の"], answer: 2, explain_vi: "から ... まで = từ ... đến ...", explain_en: "から ... まで means from ... to ..." },
  { q: "「先生___漢字を教えてくれました」", options: ["を", "で", "へ", "が"], answer: 3, explain_vi: "Người làm giúp mình đứng với が (hoặc は).", explain_en: "The person doing the favour takes が." },
  { q: "「公園___歩きます」 điền gì? / Which particle for walking through a place?", options: ["を", "に", "は", "も"], answer: 0, explain_vi: "Động từ di chuyển qua một không gian dùng を: 公園を歩く.", explain_en: "Motion through a space takes を." },
  { q: "「友達___写真を送りました」", options: ["を", "に", "で", "が"], answer: 1, explain_vi: "Người nhận đứng với に.", explain_en: "The receiver is marked with に." },
  { q: "「これはハイさん___カメラです」", options: ["に", "を", "の", "へ"], answer: 2, explain_vi: "の chỉ sở hữu.", explain_en: "の shows possession." },
  { q: "「土曜日はアルバイトです___、日曜日は暇です」", options: ["から", "ので", "とき", "が"], answer: 3, explain_vi: "が nối hai ý trái ngược (nhưng).", explain_en: "が links two contrasting ideas (but)." },

  // Grammar forms
  { q: "Thể khả năng của 「食べる」? / Potential form of taberu?", options: ["食べられる", "食べたい", "食べている", "食べた"], answer: 0, explain_vi: "Nhóm 2: bỏ る + られる.", explain_en: "Group 2: drop る and add られる." },
  { q: "Thể khả năng của 「する」? / Potential form of suru?", options: ["します", "できる", "して", "した"], answer: 1, explain_vi: "する -> できる (bất quy tắc).", explain_en: "する becomes できる (irregular)." },
  { q: "「行かないでください」 nghĩa là? / Meaning?", options: ["Xin hãy đi / please go", "Tôi muốn đi / I want to go", "Xin đừng đi / please do not go", "Tôi đã đi / I went"], answer: 2, explain_vi: "Thể ない + でください = xin đừng.", explain_en: "nai-form + de kudasai means 'please do not'." },
  { q: "「早く寝たほうがいいです」 diễn tả gì? / What does it express?", options: ["Cấm đoán / prohibition", "Xin phép / permission", "Kể chuyện quá khứ / a past story", "Lời khuyên / advice"], answer: 3, explain_vi: "~たほうがいい = nên làm gì.", explain_en: "~ta hō ga ii gives advice." },
  { q: "「留学するつもりです」 nghĩa là? / Meaning?", options: ["Tôi dự định du học / I plan to study abroad", "Tôi đã du học / I studied abroad", "Tôi không thể du học / I cannot study abroad", "Tôi thích du học / I like studying abroad"], answer: 0, explain_vi: "つもりです = dự định.", explain_en: "つもりです expresses intention." },
  { q: "Câu nào đúng? / Which sentence is correct?", options: ["この本は面白いですと思います。", "この本は面白いと思います。", "この本は面白いと思いますです。", "この本は面白いだと思います。"], answer: 1, explain_vi: "Trước と思います dùng thể thường, không có です.", explain_en: "Use the plain form before と思います, without です." },
  { q: "「明日は雨かもしれません」 mức độ chắc chắn? / How certain is it?", options: ["Chắc chắn 100% / certain", "Chỉ là khả năng / just a possibility", "Đã xảy ra / already happened", "Bắt buộc / obligation"], answer: 1, explain_vi: "かもしれません = có thể, khả năng thấp.", explain_en: "かもしれません shows a mere possibility." },
  { q: "「音楽を聞き___勉強します」 điền gì? / Fill in the blank?", options: ["ながら", "あとで", "まえに", "とき"], answer: 0, explain_vi: "~ながら = vừa ... vừa ...", explain_en: "~ながら means 'while doing'." },
  { q: "「寝る___歯を磨きます」 (trước khi ngủ) / before sleeping", options: ["あとで", "前に", "とき", "から"], answer: 1, explain_vi: "Thể từ điển + 前に = trước khi.", explain_en: "Dictionary form + 前に means 'before'." },
  { q: "「授業が終わった___買い物します」 (sau khi tan học)", options: ["前に", "ながら", "あとで", "ように"], answer: 2, explain_vi: "Thể た + あとで = sau khi.", explain_en: "ta-form + あとで means 'after'." },
  { q: "「食べすぎました」 nghĩa là? / Meaning?", options: ["Đã không ăn / did not eat", "Muốn ăn / want to eat", "Đang ăn / am eating", "Đã ăn quá nhiều / ate too much"], answer: 3, explain_vi: "~すぎる = quá mức.", explain_en: "~すぎる means 'too much'." },
  { q: "「日本語を習いはじめました」 nghĩa là? / Meaning?", options: ["Tôi đã bắt đầu học tiếng Nhật / I started learning Japanese", "Tôi đã học xong / I finished learning", "Tôi muốn học / I want to learn", "Tôi không học nữa / I stopped"], answer: 0, explain_vi: "~はじめる = bắt đầu làm.", explain_en: "~はじめる means to start doing." },
  { q: "「先生が教えてくれました」 ai làm việc đó? / Who did the action?", options: ["Tôi / I did", "Thầy làm cho tôi / the teacher did it for me", "Không ai / nobody", "Bạn tôi / my friend"], answer: 1, explain_vi: "~てくれる: người khác làm cho mình.", explain_en: "~てくれる: someone does it for me." },
  { q: "「子供のとき」 nghĩa là? / Meaning?", options: ["Cho trẻ con / for children", "Hồi còn nhỏ / when I was a child", "Cùng trẻ con / with children", "Trẻ con của tôi / my child"], answer: 1, explain_vi: "Danh từ + の + とき = khi còn ...", explain_en: "Noun + の + とき means 'when I was ...'." },
  { q: "Chọn câu khuyên KHÔNG nên làm. / Choose the 'had better not' sentence.", options: ["飲んだほうがいいです。", "飲みたいです。", "飲まないほうがいいです。", "飲んでもいいです。"], answer: 2, explain_vi: "Thể ない + ほうがいい = không nên.", explain_en: "nai-form + ほうがいい means 'had better not'." },
  { q: "「乗り換え」 xảy ra ở đâu? / Where does norikae happen?", options: ["Ở ga tàu, khi đổi tuyến / at a station when changing lines", "Ở nhà hàng / in a restaurant", "Ở lớp học / in a classroom", "Ở bệnh viện / at a hospital"], answer: 0, explain_vi: "乗り換え = việc đổi tàu, đổi tuyến.", explain_en: "乗り換え means transferring trains." },

  // Kanji
  { q: "Chữ 「休」 đọc kun là gì? / Kun reading of 休?", options: ["やす(む)", "はし(る)", "つか(う)", "おく(る)"], answer: 0, explain_vi: "休む = nghỉ.", explain_en: "休む means to rest." },
  { q: "Chữ nào nghĩa là 'đợi'? / Which kanji means 'to wait'?", options: ["持", "待", "使", "作"], answer: 1, explain_vi: "待つ = đợi. 持つ = cầm, mang.", explain_en: "待つ is to wait; 持つ is to hold." },
  { q: "「開」 và 「閉」 là cặp nghĩa gì? / What pair are 開 and 閉?", options: ["Đi và về / go and return", "Mua và bán / buy and sell", "Mở và đóng / open and close", "Sớm và muộn / early and late"], answer: 2, explain_vi: "開ける = mở, 閉める = đóng.", explain_en: "開ける is open, 閉める is close." },
  { q: "Chữ nào nghĩa là 'rửa'? / Which kanji means 'to wash'?", options: ["送", "借", "歩", "洗"], answer: 3, explain_vi: "洗う = rửa, giặt.", explain_en: "洗う means to wash." },
  { q: "「魚」 đọc kun là gì? / Kun reading of 魚?", options: ["さかな", "にく", "やさい", "あじ"], answer: 0, explain_vi: "魚（さかな）= cá.", explain_en: "魚 (sakana) means fish." },
  { q: "「教える」 nghĩa là gì? / What does oshieru mean?", options: ["Học / to learn", "Dạy / to teach", "Nhớ / to remember", "Quên / to forget"], answer: 1, explain_vi: "教える = dạy; 習う = học.", explain_en: "教える is to teach; 習う is to learn." },
  { q: "Chữ nào nghĩa là 'mượn'? / Which kanji means 'to borrow'?", options: ["始", "終", "借", "知"], answer: 2, explain_vi: "借りる = mượn.", explain_en: "借りる means to borrow." },
  { q: "「走る」 và 「歩く」 khác nhau thế nào? / Difference between hashiru and aruku?", options: ["Cùng nghĩa / the same", "Đứng và ngồi / stand and sit", "Bơi và chạy / swim and run", "Chạy và đi bộ / run and walk"], answer: 3, explain_vi: "走る = chạy; 歩く = đi bộ.", explain_en: "走る is run; 歩く is walk." },

  // Listening-style comprehension
  { q: "「十時に駅の前で待っています」 nghĩa là? / Meaning?", options: ["Tôi đợi trước ga lúc 10 giờ / I will wait in front of the station at ten", "Tôi đi ga lúc 10 giờ / I go to the station at ten", "Ga mở lúc 10 giờ / the station opens at ten", "Tôi rời ga lúc 10 giờ / I leave the station at ten"], answer: 0, explain_vi: "待っています = đang / sẽ đợi.", explain_en: "待っています means 'I will be waiting'." },
  { q: "Nhân viên nói 「少しお待ちください」, bạn nên làm gì? / What should you do?", options: ["Đi ra ngoài / leave", "Đợi một chút / wait a moment", "Trả tiền / pay", "Gọi lại / call again"], answer: 1, explain_vi: "Đây là lời mời đợi lịch sự.", explain_en: "It is a polite request to wait." },
  { q: "「お勧めは何ですか」 bạn đang hỏi gì? / What are you asking?", options: ["Giá bao nhiêu / the price", "Ở đâu / the place", "Món nào được gợi ý / the recommendation", "Mấy giờ / the time"], answer: 2, explain_vi: "お勧め = món / thứ được gợi ý.", explain_en: "お勧め means recommendation." },
  { q: "Nghe 「航空便でお願いします」 nghĩa là? / Meaning?", options: ["Gửi tàu biển / by sea mail", "Gửi trong nước / domestic", "Nhận tại quầy / pick up", "Gửi bằng máy bay / by air mail"], answer: 3, explain_vi: "航空便 = gửi đường hàng không.", explain_en: "航空便 is air mail." },
  { q: "「遅れないようにします」 người nói hứa gì? / What is promised?", options: ["Sẽ cố không đến muộn / will try not to be late", "Sẽ đến muộn / will be late", "Sẽ không đến / will not come", "Sẽ gọi điện / will call"], answer: 0, explain_vi: "~ないようにします = cố gắng không làm gì.", explain_en: "~nai yō ni shimasu means 'I will try not to'." },
  { q: "「部屋でインターネットは使えますか」 câu hỏi này về gì? / What is asked?", options: ["Giá phòng / room price", "Có dùng được internet không / whether internet can be used", "Bữa sáng / breakfast", "Số phòng / room number"], answer: 1, explain_vi: "使えます là thể khả năng của 使う.", explain_en: "使えます is the potential form of 使う." },
  { q: "「二泊です」 nghĩa là? / Meaning?", options: ["Hai người / two people", "Hai phòng / two rooms", "Hai đêm / two nights", "Hai giờ / two hours"], answer: 2, explain_vi: "泊 là đơn vị đếm số đêm lưu trú.", explain_en: "泊 counts nights of a stay." },
  { q: "「歩いて五分ぐらいです」 nghĩa là? / Meaning?", options: ["Đi tàu 5 phút / five minutes by train", "Chờ 5 phút / wait five minutes", "Cách 5 km / five kilometres away", "Khoảng 5 phút đi bộ / about five minutes on foot"], answer: 3, explain_vi: "歩いて = bằng cách đi bộ; ぐらい = khoảng.", explain_en: "歩いて means on foot; ぐらい means about." },
];
