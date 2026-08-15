/**
 * @file japaneseExpansion.ts
 * @description Extra N5 content for the Japanese hub: dakuten/yōon kana,
 * extra greetings, counters, more vocabulary topics, more kanji, more
 * dialogues and more grammar points. Merged into src/pages/Japanese.tsx.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

export interface JaPhrase { jp: string; romaji: string; vi: string; en: string }

/** Voiced kana (dakuten / handakuten) - hiragana */
export const HIRAGANA_DAKUTEN: Array<[string, string]> = [
  ["が","ga"],["ぎ","gi"],["ぐ","gu"],["げ","ge"],["ご","go"],
  ["ざ","za"],["じ","ji"],["ず","zu"],["ぜ","ze"],["ぞ","zo"],
  ["だ","da"],["ぢ","ji"],["づ","zu"],["で","de"],["ど","do"],
  ["ば","ba"],["び","bi"],["ぶ","bu"],["べ","be"],["ぼ","bo"],
  ["ぱ","pa"],["ぴ","pi"],["ぷ","pu"],["ぺ","pe"],["ぽ","po"],
];

/** Contracted kana (yōon) - hiragana */
export const HIRAGANA_YOON: Array<[string, string]> = [
  ["きゃ","kya"],["きゅ","kyu"],["きょ","kyo"],
  ["しゃ","sha"],["しゅ","shu"],["しょ","sho"],
  ["ちゃ","cha"],["ちゅ","chu"],["ちょ","cho"],
  ["にゃ","nya"],["にゅ","nyu"],["にょ","nyo"],
  ["ひゃ","hya"],["ひゅ","hyu"],["ひょ","hyo"],
  ["みゃ","mya"],["みゅ","myu"],["みょ","myo"],
  ["りゃ","rya"],["りゅ","ryu"],["りょ","ryo"],
  ["ぎゃ","gya"],["ぎゅ","gyu"],["ぎょ","gyo"],
  ["じゃ","ja"],["じゅ","ju"],["じょ","jo"],
  ["びゃ","bya"],["びゅ","byu"],["びょ","byo"],
  ["ぴゃ","pya"],["ぴゅ","pyu"],["ぴょ","pyo"],
];

/** Voiced kana - katakana + long vowel examples */
export const KATAKANA_DAKUTEN: Array<[string, string]> = [
  ["ガ","ga"],["ギ","gi"],["グ","gu"],["ゲ","ge"],["ゴ","go"],
  ["ザ","za"],["ジ","ji"],["ズ","zu"],["ゼ","ze"],["ゾ","zo"],
  ["ダ","da"],["ヂ","ji"],["ヅ","zu"],["デ","de"],["ド","do"],
  ["バ","ba"],["ビ","bi"],["ブ","bu"],["ベ","be"],["ボ","bo"],
  ["パ","pa"],["ピ","pi"],["プ","pu"],["ペ","pe"],["ポ","po"],
];

/** Extra everyday greetings and polite expressions */
export const GREETINGS_EXTRA: JaPhrase[] = [
  { jp: "いただきます。", romaji: "Itadakimasu.", vi: "Xin mời (trước khi ăn).", en: "Thanks for the meal (before eating)." },
  { jp: "ごちそうさまでした。", romaji: "Gochisōsama deshita.", vi: "Cảm ơn vì bữa ăn.", en: "Thank you for the meal." },
  { jp: "おかえりなさい。", romaji: "Okaerinasai.", vi: "Mừng bạn về nhà.", en: "Welcome back." },
  { jp: "ただいま。", romaji: "Tadaima.", vi: "Tôi về rồi.", en: "I'm home." },
  { jp: "おつかれさまです。", romaji: "Otsukaresama desu.", vi: "Bạn vất vả rồi.", en: "Thanks for your hard work." },
  { jp: "しつれいします。", romaji: "Shitsurei shimasu.", vi: "Tôi xin phép.", en: "Excuse me (entering/leaving)." },
  { jp: "おねがいします。", romaji: "Onegaishimasu.", vi: "Làm ơn giúp tôi.", en: "Please (request)." },
  { jp: "どういたしまして。", romaji: "Dō itashimashite.", vi: "Không có gì.", en: "You're welcome." },
  { jp: "だいじょうぶです。", romaji: "Daijōbu desu.", vi: "Không sao đâu.", en: "It's fine / I'm okay." },
  { jp: "わかりました。", romaji: "Wakarimashita.", vi: "Tôi hiểu rồi.", en: "I understand." },
  { jp: "わかりません。", romaji: "Wakarimasen.", vi: "Tôi không hiểu.", en: "I don't understand." },
  { jp: "もういちど おねがいします。", romaji: "Mō ichido onegaishimasu.", vi: "Xin nhắc lại một lần nữa.", en: "One more time, please." },
  { jp: "ゆっくり はなしてください。", romaji: "Yukkuri hanashite kudasai.", vi: "Xin nói chậm lại.", en: "Please speak slowly." },
  { jp: "にほんごが すこし わかります。", romaji: "Nihongo ga sukoshi wakarimasu.", vi: "Tôi hiểu một chút tiếng Nhật.", en: "I understand a little Japanese." },
  { jp: "おなまえは なんですか。", romaji: "O-namae wa nan desu ka.", vi: "Bạn tên là gì?", en: "What is your name?" },
];

/** Counters - a core N5 topic that beginners always need */
export const COUNTERS: Array<{ title: string; note_vi: string; note_en: string; items: JaPhrase[] }> = [
  {
    title: "🧮 つ / 個 - Đếm đồ vật / Counting objects",
    note_vi: "Dùng ひとつ〜とお cho vật nhỏ chung chung; 個 (こ) cho vật tròn nhỏ.",
    note_en: "Use hitotsu-tō for generic small objects; 個 (ko) for small round things.",
    items: [
      { jp: "ひとつ", romaji: "hitotsu", vi: "một cái", en: "one item" },
      { jp: "ふたつ", romaji: "futatsu", vi: "hai cái", en: "two items" },
      { jp: "みっつ", romaji: "mittsu", vi: "ba cái", en: "three items" },
      { jp: "よっつ", romaji: "yottsu", vi: "bốn cái", en: "four items" },
      { jp: "いつつ", romaji: "itsutsu", vi: "năm cái", en: "five items" },
      { jp: "りんごを ふたつ ください。", romaji: "Ringo o futatsu kudasai.", vi: "Cho tôi hai quả táo.", en: "Two apples, please." },
    ],
  },
  {
    title: "👥 人 / 枚 / 本 - Người, vật mỏng, vật dài",
    note_vi: "人 (にん) đếm người, 枚 (まい) đếm vật mỏng, 本 (ほん) đếm vật dài.",
    note_en: "人 counts people, 枚 counts flat things, 本 counts long things.",
    items: [
      { jp: "ひとり", romaji: "hitori", vi: "một người", en: "one person" },
      { jp: "ふたり", romaji: "futari", vi: "hai người", en: "two people" },
      { jp: "さんにん", romaji: "san-nin", vi: "ba người", en: "three people" },
      { jp: "きっぷを さんまい ください。", romaji: "Kippu o san-mai kudasai.", vi: "Cho tôi ba chiếc vé.", en: "Three tickets, please." },
      { jp: "みずを いっぽん かいます。", romaji: "Mizu o ippon kaimasu.", vi: "Tôi mua một chai nước.", en: "I'll buy one bottle of water." },
    ],
  },
  {
    title: "🕰️ 時 / 分 / 円 - Giờ, phút, tiền",
    note_vi: "時 (じ) giờ, 分 (ふん/ぷん) phút, 円 (えん) yên Nhật.",
    note_en: "時 hour, 分 minute, 円 yen.",
    items: [
      { jp: "いちじはん", romaji: "ichi-ji han", vi: "1 giờ rưỡi", en: "half past one" },
      { jp: "じゅうごふん", romaji: "jūgo-fun", vi: "15 phút", en: "fifteen minutes" },
      { jp: "はちじ よんじゅうごふん", romaji: "hachi-ji yonjūgo-fun", vi: "8 giờ 45", en: "8:45" },
      { jp: "せんえんです。", romaji: "Sen-en desu.", vi: "1000 yên.", en: "It's 1000 yen." },
      { jp: "いくらですか。", romaji: "Ikura desu ka.", vi: "Bao nhiêu tiền?", en: "How much is it?" },
    ],
  },
];

/** Extra vocabulary topics */
export const VOCAB_EXTRA: Array<{ topic: string; items: JaPhrase[] }> = [
  { topic: "🧑‍💼 Nghề nghiệp / Jobs", items: [
    { jp: "せんせい", romaji: "sensei", vi: "giáo viên", en: "teacher" },
    { jp: "がくせい", romaji: "gakusei", vi: "học sinh, sinh viên", en: "student" },
    { jp: "いしゃ", romaji: "isha", vi: "bác sĩ", en: "doctor" },
    { jp: "かんごし", romaji: "kangoshi", vi: "y tá", en: "nurse" },
    { jp: "かいしゃいん", romaji: "kaishain", vi: "nhân viên công ty", en: "office worker" },
    { jp: "エンジニア", romaji: "enjinia", vi: "kỹ sư", en: "engineer" },
    { jp: "てんいん", romaji: "ten'in", vi: "nhân viên bán hàng", en: "shop staff" },
    { jp: "うんてんしゅ", romaji: "untenshu", vi: "tài xế", en: "driver" },
  ]},
  { topic: "🚃 Giao thông / Transport", items: [
    { jp: "でんしゃ", romaji: "densha", vi: "tàu điện", en: "train" },
    { jp: "ちかてつ", romaji: "chikatetsu", vi: "tàu điện ngầm", en: "subway" },
    { jp: "バス", romaji: "basu", vi: "xe buýt", en: "bus" },
    { jp: "じてんしゃ", romaji: "jitensha", vi: "xe đạp", en: "bicycle" },
    { jp: "くるま", romaji: "kuruma", vi: "ô tô", en: "car" },
    { jp: "ひこうき", romaji: "hikōki", vi: "máy bay", en: "airplane" },
    { jp: "きっぷ", romaji: "kippu", vi: "vé", en: "ticket" },
    { jp: "のりば", romaji: "noriba", vi: "bến, chỗ lên xe", en: "boarding point" },
  ]},
  { topic: "🏥 Sức khỏe / Health", items: [
    { jp: "あたま", romaji: "atama", vi: "đầu", en: "head" },
    { jp: "おなか", romaji: "onaka", vi: "bụng", en: "stomach" },
    { jp: "のど", romaji: "nodo", vi: "họng", en: "throat" },
    { jp: "ねつ", romaji: "netsu", vi: "sốt", en: "fever" },
    { jp: "かぜ", romaji: "kaze", vi: "cảm lạnh", en: "a cold" },
    { jp: "くすり", romaji: "kusuri", vi: "thuốc", en: "medicine" },
    { jp: "いたいです。", romaji: "Itai desu.", vi: "Đau quá.", en: "It hurts." },
    { jp: "びょうきです。", romaji: "Byōki desu.", vi: "Tôi bị ốm.", en: "I'm sick." },
  ]},
  { topic: "🏫 Ở lớp học / In the classroom", items: [
    { jp: "きょうしつ", romaji: "kyōshitsu", vi: "lớp học", en: "classroom" },
    { jp: "こくばん", romaji: "kokuban", vi: "bảng đen", en: "blackboard" },
    { jp: "ノート", romaji: "nōto", vi: "vở", en: "notebook" },
    { jp: "えんぴつ", romaji: "enpitsu", vi: "bút chì", en: "pencil" },
    { jp: "しゅくだい", romaji: "shukudai", vi: "bài tập về nhà", en: "homework" },
    { jp: "テスト", romaji: "tesuto", vi: "bài kiểm tra", en: "test" },
    { jp: "しつもん", romaji: "shitsumon", vi: "câu hỏi", en: "question" },
    { jp: "こたえ", romaji: "kotae", vi: "câu trả lời", en: "answer" },
  ]},
  { topic: "🛍️ Mua sắm / Shopping", items: [
    { jp: "みせ", romaji: "mise", vi: "cửa hàng", en: "shop" },
    { jp: "スーパー", romaji: "sūpā", vi: "siêu thị", en: "supermarket" },
    { jp: "コンビニ", romaji: "konbini", vi: "cửa hàng tiện lợi", en: "convenience store" },
    { jp: "おかね", romaji: "okane", vi: "tiền", en: "money" },
    { jp: "やすい", romaji: "yasui", vi: "rẻ", en: "cheap" },
    { jp: "たかい", romaji: "takai", vi: "đắt", en: "expensive" },
    { jp: "これを ください。", romaji: "Kore o kudasai.", vi: "Cho tôi cái này.", en: "This one, please." },
    { jp: "カードで はらえますか。", romaji: "Kādo de haraemasu ka.", vi: "Tôi trả bằng thẻ được không?", en: "Can I pay by card?" },
  ]},
  { topic: "🎌 Sở thích & Văn hóa / Hobbies & culture", items: [
    { jp: "しゅみ", romaji: "shumi", vi: "sở thích", en: "hobby" },
    { jp: "おんがく", romaji: "ongaku", vi: "âm nhạc", en: "music" },
    { jp: "えいが", romaji: "eiga", vi: "phim", en: "movie" },
    { jp: "りょこう", romaji: "ryokō", vi: "du lịch", en: "travel" },
    { jp: "まんが", romaji: "manga", vi: "truyện tranh", en: "manga" },
    { jp: "アニメ", romaji: "anime", vi: "phim hoạt hình Nhật", en: "anime" },
    { jp: "まつり", romaji: "matsuri", vi: "lễ hội", en: "festival" },
    { jp: "おんせん", romaji: "onsen", vi: "suối nước nóng", en: "hot spring" },
  ]},
];

/** Extra core N5 kanji */
export const KANJI_EXTRA: Array<{ kanji: string; on: string; kun: string; meaning_vi: string; meaning_en: string; example: string }> = [
  { kanji: "本", on: "ホン", kun: "もと", meaning_vi: "sách, gốc", meaning_en: "book, origin", example: "日本 (Nihon - Nhật Bản)" },
  { kanji: "行", on: "コウ", kun: "いく", meaning_vi: "đi", meaning_en: "to go", example: "行きます (ikimasu - đi)" },
  { kanji: "食", on: "ショク", kun: "たべる", meaning_vi: "ăn", meaning_en: "to eat", example: "食べます (tabemasu - ăn)" },
  { kanji: "飲", on: "イン", kun: "のむ", meaning_vi: "uống", meaning_en: "to drink", example: "飲みます (nomimasu - uống)" },
  { kanji: "見", on: "ケン", kun: "みる", meaning_vi: "nhìn, xem", meaning_en: "to see", example: "見ます (mimasu - xem)" },
  { kanji: "聞", on: "ブン", kun: "きく", meaning_vi: "nghe, hỏi", meaning_en: "to listen, ask", example: "聞きます (kikimasu - nghe)" },
  { kanji: "時", on: "ジ", kun: "とき", meaning_vi: "giờ, thời gian", meaning_en: "hour, time", example: "何時 (nanji - mấy giờ)" },
  { kanji: "間", on: "カン", kun: "あいだ", meaning_vi: "khoảng, giữa", meaning_en: "interval, between", example: "時間 (jikan - thời gian)" },
  { kanji: "上", on: "ジョウ", kun: "うえ", meaning_vi: "trên", meaning_en: "above", example: "机の上 (tsukue no ue - trên bàn)" },
  { kanji: "下", on: "カ / ゲ", kun: "した", meaning_vi: "dưới", meaning_en: "below", example: "下さい (kudasai - xin cho)" },
  { kanji: "中", on: "チュウ", kun: "なか", meaning_vi: "trong, giữa", meaning_en: "inside, middle", example: "中国 (Chūgoku - Trung Quốc)" },
  { kanji: "国", on: "コク", kun: "くに", meaning_vi: "quốc gia", meaning_en: "country", example: "外国 (gaikoku - nước ngoài)" },
  { kanji: "先", on: "セン", kun: "さき", meaning_vi: "trước", meaning_en: "previous, ahead", example: "先生 (sensei - giáo viên)" },
  { kanji: "話", on: "ワ", kun: "はなす", meaning_vi: "nói chuyện", meaning_en: "to speak", example: "電話 (denwa - điện thoại)" },
  { kanji: "友", on: "ユウ", kun: "とも", meaning_vi: "bạn", meaning_en: "friend", example: "友だち (tomodachi - bạn bè)" },
  { kanji: "円", on: "エン", kun: "まるい", meaning_vi: "yên, tròn", meaning_en: "yen, round", example: "千円 (sen-en - 1000 yên)" },
  { kanji: "車", on: "シャ", kun: "くるま", meaning_vi: "xe", meaning_en: "car, vehicle", example: "電車 (densha - tàu điện)" },
  { kanji: "電", on: "デン", kun: "-", meaning_vi: "điện", meaning_en: "electricity", example: "電気 (denki - điện, đèn)" },
];

/** Extra dialogues covering more N5 situations */
export const DIALOGUES_EXTRA: Array<{ title: string; scene: string; lines: Array<{ speaker: string; jp: string; romaji: string; vi: string; en: string }> }> = [
  {
    title: "🏪 Ở konbini / At the convenience store",
    scene: "Mua đồ và thanh toán tại cửa hàng tiện lợi.",
    lines: [
      { speaker: "店員", jp: "いらっしゃいませ。", romaji: "Irasshaimase.", vi: "Xin mời quý khách.", en: "Welcome." },
      { speaker: "客", jp: "これを ふたつ ください。", romaji: "Kore o futatsu kudasai.", vi: "Cho tôi hai cái này.", en: "Two of these, please." },
      { speaker: "店員", jp: "ぜんぶで 480えんです。", romaji: "Zenbu de yonhyaku-hachijū-en desu.", vi: "Tổng cộng 480 yên.", en: "That's 480 yen in total." },
      { speaker: "客", jp: "カードで はらえますか。", romaji: "Kādo de haraemasu ka.", vi: "Tôi trả bằng thẻ được không?", en: "Can I pay by card?" },
      { speaker: "店員", jp: "はい、だいじょうぶです。", romaji: "Hai, daijōbu desu.", vi: "Vâng, được ạ.", en: "Yes, that's fine." },
    ],
  },
  {
    title: "🏥 Ở phòng khám / At the clinic",
    scene: "Nói về triệu chứng với bác sĩ.",
    lines: [
      { speaker: "医者", jp: "きょうは どうしましたか。", romaji: "Kyō wa dō shimashita ka.", vi: "Hôm nay bạn bị sao?", en: "What's the matter today?" },
      { speaker: "客", jp: "あたまが いたいです。ねつも あります。", romaji: "Atama ga itai desu. Netsu mo arimasu.", vi: "Tôi đau đầu và có sốt.", en: "I have a headache and a fever." },
      { speaker: "医者", jp: "かぜですね。くすりを だします。", romaji: "Kaze desu ne. Kusuri o dashimasu.", vi: "Bạn bị cảm rồi. Tôi kê thuốc nhé.", en: "It's a cold. I'll prescribe medicine." },
      { speaker: "客", jp: "ありがとうございます。", romaji: "Arigatō gozaimasu.", vi: "Cảm ơn bác sĩ.", en: "Thank you." },
      { speaker: "医者", jp: "おだいじに。", romaji: "Odaiji ni.", vi: "Bạn giữ gìn sức khỏe nhé.", en: "Take care." },
    ],
  },
  {
    title: "📞 Gọi điện cho bạn / Calling a friend",
    scene: "Hẹn gặp nhau cuối tuần.",
    lines: [
      { speaker: "A", jp: "もしもし、ハイです。いま だいじょうぶですか。", romaji: "Moshi moshi, Hai desu. Ima daijōbu desu ka.", vi: "Alô, Hải đây. Bây giờ bạn tiện nói chuyện không?", en: "Hello, this is Hai. Is now a good time?" },
      { speaker: "B", jp: "はい、だいじょうぶです。", romaji: "Hai, daijōbu desu.", vi: "Vâng, không sao.", en: "Yes, it's fine." },
      { speaker: "A", jp: "どようびに えいがを みませんか。", romaji: "Doyōbi ni eiga o mimasen ka.", vi: "Thứ Bảy đi xem phim nhé?", en: "Shall we watch a movie on Saturday?" },
      { speaker: "B", jp: "いいですね。なんじに あいましょうか。", romaji: "Ii desu ne. Nan-ji ni aimashō ka.", vi: "Hay đấy. Mấy giờ gặp nhau?", en: "Sounds good. What time shall we meet?" },
      { speaker: "A", jp: "ろくじに えきで あいましょう。", romaji: "Roku-ji ni eki de aimashō.", vi: "Sáu giờ gặp ở ga nhé.", en: "Let's meet at the station at six." },
    ],
  },
  {
    title: "🏠 Thuê nhà / Looking at an apartment",
    scene: "Hỏi thông tin về căn hộ.",
    lines: [
      { speaker: "客", jp: "この へやは いくらですか。", romaji: "Kono heya wa ikura desu ka.", vi: "Căn phòng này bao nhiêu tiền?", en: "How much is this room?" },
      { speaker: "店員", jp: "いっかげつ 六まんえんです。", romaji: "Ikkagetsu roku-man-en desu.", vi: "60.000 yên một tháng.", en: "Sixty thousand yen per month." },
      { speaker: "客", jp: "えきから ちかいですか。", romaji: "Eki kara chikai desu ka.", vi: "Có gần ga không ạ?", en: "Is it close to the station?" },
      { speaker: "店員", jp: "あるいて 10ぷんです。しずかな ところですよ。", romaji: "Aruite juppun desu. Shizuka na tokoro desu yo.", vi: "Đi bộ 10 phút. Khu này yên tĩnh lắm.", en: "Ten minutes on foot. It's a quiet area." },
      { speaker: "客", jp: "みても いいですか。", romaji: "Mite mo ii desu ka.", vi: "Tôi xem được không?", en: "May I take a look?" },
    ],
  },
  {
    title: "💼 Ở công ty / At the office",
    scene: "Chào hỏi và xin phép về sớm.",
    lines: [
      { speaker: "A", jp: "おはようございます。きょうも よろしく おねがいします。", romaji: "Ohayō gozaimasu. Kyō mo yoroshiku onegaishimasu.", vi: "Chào buổi sáng. Hôm nay lại nhờ anh giúp đỡ.", en: "Good morning. Looking forward to working with you today." },
      { speaker: "B", jp: "おはようございます。かいぎは 十時からです。", romaji: "Ohayō gozaimasu. Kaigi wa jū-ji kara desu.", vi: "Chào buổi sáng. Cuộc họp bắt đầu lúc 10 giờ.", en: "Good morning. The meeting starts at ten." },
      { speaker: "A", jp: "すみません、きょうは 五時に かえっても いいですか。", romaji: "Sumimasen, kyō wa go-ji ni kaette mo ii desu ka.", vi: "Xin lỗi, hôm nay tôi về lúc 5 giờ được không?", en: "Excuse me, may I leave at five today?" },
      { speaker: "B", jp: "はい、だいじょうぶです。", romaji: "Hai, daijōbu desu.", vi: "Vâng, được thôi.", en: "Yes, that's fine." },
      { speaker: "A", jp: "ありがとうございます。おさきに しつれいします。", romaji: "Arigatō gozaimasu. Osaki ni shitsurei shimasu.", vi: "Cảm ơn anh. Tôi xin phép về trước.", en: "Thank you. Excuse me for leaving first." },
    ],
  },
];

/** Extra grammar points (continuing the numbering from the page) */
export const GRAMMAR_EXTRA: Array<{ title: string; explain: string; examples: JaPhrase[] }> = [
  {
    title: "13. ~ています - Đang làm / trạng thái",
    explain: "Thể て + います diễn tả hành động đang diễn ra hoặc trạng thái duy trì. Phủ định: ~ていません.",
    examples: [
      { jp: "いま ごはんを たべています。", romaji: "Ima gohan o tabete imasu.", vi: "Bây giờ tôi đang ăn cơm.", en: "I'm eating now." },
      { jp: "とうきょうに すんでいます。", romaji: "Tōkyō ni sunde imasu.", vi: "Tôi đang sống ở Tokyo.", en: "I live in Tokyo." },
    ],
  },
  {
    title: "14. ~ましょう / ~ませんか - Rủ rê, đề nghị",
    explain: "~ましょう nghĩa 'hãy cùng...'; ~ませんか lịch sự hơn, nghĩa 'bạn có muốn... không?'.",
    examples: [
      { jp: "いっしょに いきましょう。", romaji: "Issho ni ikimashō.", vi: "Chúng ta cùng đi nhé.", en: "Let's go together." },
      { jp: "コーヒーを のみませんか。", romaji: "Kōhī o nomimasen ka.", vi: "Bạn uống cà phê không?", en: "Would you like to drink coffee?" },
    ],
  },
  {
    title: "15. ~てもいいです / ~てはいけません - Cho phép & cấm",
    explain: "Thể て + もいいです = được phép; thể て + はいけません = không được phép.",
    examples: [
      { jp: "ここで しゃしんを とっても いいですか。", romaji: "Koko de shashin o totte mo ii desu ka.", vi: "Tôi chụp ảnh ở đây được không?", en: "May I take photos here?" },
      { jp: "ここで たばこを すっては いけません。", romaji: "Koko de tabako o sutte wa ikemasen.", vi: "Không được hút thuốc ở đây.", en: "You must not smoke here." },
    ],
  },
  {
    title: "16. ~があります / ~がいます - Có (vật / người)", 
    explain: "あります dùng cho vật vô tri, います dùng cho người và động vật.",
    examples: [
      { jp: "つくえの うえに ほんが あります。", romaji: "Tsukue no ue ni hon ga arimasu.", vi: "Trên bàn có quyển sách.", en: "There is a book on the desk." },
      { jp: "きょうしつに がくせいが います。", romaji: "Kyōshitsu ni gakusei ga imasu.", vi: "Trong lớp có học sinh.", en: "There are students in the classroom." },
    ],
  },
  {
    title: "17. から / まで - Từ ... đến ...",
    explain: "から chỉ điểm bắt đầu (thời gian, nơi chốn); まで chỉ điểm kết thúc.",
    examples: [
      { jp: "くじから ごじまで はたらきます。", romaji: "Ku-ji kara go-ji made hatarakimasu.", vi: "Tôi làm việc từ 9 giờ đến 5 giờ.", en: "I work from nine to five." },
      { jp: "うちから えきまで あるきます。", romaji: "Uchi kara eki made arukimasu.", vi: "Tôi đi bộ từ nhà đến ga.", en: "I walk from home to the station." },
    ],
  },
  {
    title: "18. ~より / いちばん - So sánh",
    explain: "A は B より + tính từ = A ... hơn B. いちばん = nhất.",
    examples: [
      { jp: "でんしゃは バスより はやいです。", romaji: "Densha wa basu yori hayai desu.", vi: "Tàu điện nhanh hơn xe buýt.", en: "The train is faster than the bus." },
      { jp: "すしが いちばん すきです。", romaji: "Sushi ga ichiban suki desu.", vi: "Tôi thích sushi nhất.", en: "I like sushi the most." },
    ],
  },
  {
    title: "19. ~たことがあります - Đã từng làm",
    explain: "Thể た + ことがあります diễn tả kinh nghiệm đã từng trải qua.",
    examples: [
      { jp: "にほんへ いったことが あります。", romaji: "Nihon e itta koto ga arimasu.", vi: "Tôi đã từng đến Nhật.", en: "I have been to Japan." },
      { jp: "すしを たべたことが ありません。", romaji: "Sushi o tabeta koto ga arimasen.", vi: "Tôi chưa từng ăn sushi.", en: "I have never eaten sushi." },
    ],
  },
  {
    title: "20. ~ので / ~から - Vì, bởi vì",
    explain: "から nêu lý do trực tiếp; ので mềm và lịch sự hơn, hay dùng khi xin phép.",
    examples: [
      { jp: "あついから、まどを あけます。", romaji: "Atsui kara, mado o akemasu.", vi: "Vì nóng nên tôi mở cửa sổ.", en: "It's hot, so I'll open the window." },
      { jp: "びょうきなので、やすみます。", romaji: "Byōki na node, yasumimasu.", vi: "Vì bị ốm nên tôi nghỉ.", en: "I'm sick, so I'll take a rest." },
    ],
  },
];

/** Short self-check quiz to consolidate each tab */
export const JA_QUIZ: Array<{ q: string; options: string[]; answer: number; explain_vi: string; explain_en: string }> = [
  { q: "「ありがとうございます」nghĩa là gì? / What does it mean?", options: ["Xin lỗi / Sorry", "Cảm ơn / Thank you", "Tạm biệt / Goodbye", "Xin chào / Hello"], answer: 1, explain_vi: "ありがとうございます là lời cảm ơn lịch sự.", explain_en: "Arigatō gozaimasu is a polite thank you." },
  { q: "Trợ từ nào đánh dấu tân ngữ trực tiếp? / Which particle marks the direct object?", options: ["は", "を", "に", "で"], answer: 1, explain_vi: "を (đọc 'o') đứng sau tân ngữ trực tiếp.", explain_en: "を (read 'o') follows the direct object." },
  { q: "「みず」 là gì? / What is mizu?", options: ["Lửa / fire", "Nước / water", "Núi / mountain", "Sách / book"], answer: 1, explain_vi: "みず = nước, kanji 水.", explain_en: "みず means water, kanji 水." },
  { q: "Cách nói 'Tôi muốn ăn'? / How to say 'I want to eat'?", options: ["たべます", "たべたいです", "たべてください", "たべません"], answer: 1, explain_vi: "Bỏ ます rồi thêm たいです để nói mong muốn.", explain_en: "Drop ます and add たいです to express desire." },
  { q: "Đếm hai người trong tiếng Nhật? / Counting two people?", options: ["ふたつ", "ふたり", "にまい", "にほん"], answer: 1, explain_vi: "人 dùng cho người: ひとり, ふたり, さんにん.", explain_en: "人 counts people: hitori, futari, san-nin." },
  { q: "「いくらですか」 dùng khi nào? / When do you use it?", options: ["Hỏi giờ / asking time", "Hỏi giá / asking price", "Hỏi đường / asking direction", "Hỏi tên / asking name"], answer: 1, explain_vi: "いくら = bao nhiêu tiền.", explain_en: "Ikura asks about price." },
  { q: "Câu nào nghĩa 'Trên bàn có sách'?", options: ["つくえの うえに ほんが あります。", "ほんは つくえです。", "つくえを よみます。", "ほんが いきます。"], answer: 0, explain_vi: "あります dùng cho vật vô tri.", explain_en: "あります is used for inanimate objects." },
  { q: "Kanji 「人」 đọc kun là gì? / Kun reading of 人?", options: ["ひと", "やま", "みず", "つき"], answer: 0, explain_vi: "人 kun đọc ひと, on đọc ジン/ニン.", explain_en: "人 is hito (kun), jin/nin (on)." },
];
