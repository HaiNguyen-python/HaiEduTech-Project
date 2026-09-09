/**
 * @file counters.ts
 * @description Japanese counter bank: 16 counters with readings 1-10 and usage notes.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

export interface JaCounter {
  id: string;
  counter: string;
  romaji: string;
  use_vi: string;
  use_en: string;
  readings: string[]; // 1..10
  note_vi: string;
  note_en: string;
  example_jp: string;
  example_romaji: string;
  example_vi: string;
  example_en: string;
}

export const JA_COUNTERS: JaCounter[] = [
  {
    id: "ct-tsu", counter: "つ", romaji: "-tsu", use_vi: "đồ vật chung, không có lượng từ riêng", use_en: "general objects with no special counter",
    readings: ["ひとつ", "ふたつ", "みっつ", "よっつ", "いつつ", "むっつ", "ななつ", "やっつ", "ここのつ", "とお"],
    note_vi: "Chỉ dùng đến 10, từ 11 trở lên dùng số thường.", note_en: "Only used up to ten; from eleven use plain numbers.",
    example_jp: "りんごを三つください。", example_romaji: "Ringo o mittsu kudasai.", example_vi: "Cho tôi ba quả táo.", example_en: "Three apples, please.",
  },
  {
    id: "ct-nin", counter: "人", romaji: "-nin", use_vi: "người", use_en: "people",
    readings: ["ひとり", "ふたり", "さんにん", "よにん", "ごにん", "ろくにん", "しちにん", "はちにん", "きゅうにん", "じゅうにん"],
    note_vi: "1 và 2 đọc đặc biệt, 4 đọc よにん chứ không phải しにん.", note_en: "One and two are irregular; four is よにん, never しにん.",
    example_jp: "家族は四人です。", example_romaji: "Kazoku wa yonin desu.", example_vi: "Gia đình tôi có bốn người.", example_en: "There are four people in my family.",
  },
  {
    id: "ct-mai", counter: "枚", romaji: "-mai", use_vi: "vật mỏng, phẳng (giấy, vé, áo)", use_en: "thin flat things (paper, tickets, shirts)",
    readings: ["いちまい", "にまい", "さんまい", "よんまい", "ごまい", "ろくまい", "ななまい", "はちまい", "きゅうまい", "じゅうまい"],
    note_vi: "Dùng cho tem, ảnh, đĩa CD.", note_en: "Also for stamps, photos and CDs.",
    example_jp: "切符を二枚買いました。", example_romaji: "Kippu o nimai kaimashita.", example_vi: "Tôi đã mua hai vé.", example_en: "I bought two tickets.",
  },
  {
    id: "ct-hon", counter: "本", romaji: "-hon", use_vi: "vật dài, thuôn (bút, chai, dù)", use_en: "long thin things (pens, bottles, umbrellas)",
    readings: ["いっぽん", "にほん", "さんぼん", "よんほん", "ごほん", "ろっぽん", "ななほん", "はっぽん", "きゅうほん", "じゅっぽん"],
    note_vi: "1, 6, 8, 10 chuyển sang ぽん; 3 chuyển sang ぼん.", note_en: "One, six, eight and ten become ぽん; three becomes ぼん.",
    example_jp: "水を三本お願いします。", example_romaji: "Mizu o sanbon onegai shimasu.", example_vi: "Cho tôi ba chai nước.", example_en: "Three bottles of water, please.",
  },
  {
    id: "ct-satsu", counter: "冊", romaji: "-satsu", use_vi: "sách, vở", use_en: "books and notebooks",
    readings: ["いっさつ", "にさつ", "さんさつ", "よんさつ", "ごさつ", "ろくさつ", "ななさつ", "はっさつ", "きゅうさつ", "じゅっさつ"],
    note_vi: "1, 8, 10 gấp âm thành っさつ.", note_en: "One, eight and ten double the consonant.",
    example_jp: "図書館で本を五冊借りました。", example_romaji: "Toshokan de hon o gosatsu karimashita.", example_vi: "Tôi mượn năm quyển sách ở thư viện.", example_en: "I borrowed five books at the library.",
  },
  {
    id: "ct-ko", counter: "個", romaji: "-ko", use_vi: "vật nhỏ, tròn", use_en: "small round items",
    readings: ["いっこ", "にこ", "さんこ", "よんこ", "ごこ", "ろっこ", "ななこ", "はっこ", "きゅうこ", "じゅっこ"],
    note_vi: "Dùng nhiều trong siêu thị, ví dụ trứng, bánh.", note_en: "Common in shops for eggs, buns and similar items.",
    example_jp: "たまごを六個ください。", example_romaji: "Tamago o rokko kudasai.", example_vi: "Cho tôi sáu quả trứng.", example_en: "Six eggs, please.",
  },
  {
    id: "ct-hai", counter: "杯", romaji: "-hai", use_vi: "cốc, chén, bát", use_en: "cupfuls and bowlfuls",
    readings: ["いっぱい", "にはい", "さんばい", "よんはい", "ごはい", "ろっぱい", "ななはい", "はっぱい", "きゅうはい", "じゅっぱい"],
    note_vi: "Biến âm giống 本.", note_en: "Sound changes mirror 本.",
    example_jp: "コーヒーを一杯飲みました。", example_romaji: "Kōhī o ippai nomimashita.", example_vi: "Tôi đã uống một cốc cà phê.", example_en: "I drank a cup of coffee.",
  },
  {
    id: "ct-dai", counter: "台", romaji: "-dai", use_vi: "máy móc, xe cộ", use_en: "machines and vehicles",
    readings: ["いちだい", "にだい", "さんだい", "よんだい", "ごだい", "ろくだい", "ななだい", "はちだい", "きゅうだい", "じゅうだい"],
    note_vi: "Không biến âm, rất dễ dùng.", note_en: "No sound changes, so it is easy to use.",
    example_jp: "教室にパソコンが十台あります。", example_romaji: "Kyōshitsu ni pasokon ga jūdai arimasu.", example_vi: "Trong lớp có mười máy tính.", example_en: "There are ten computers in the classroom.",
  },
  {
    id: "ct-hiki", counter: "匹", romaji: "-hiki", use_vi: "động vật nhỏ", use_en: "small animals",
    readings: ["いっぴき", "にひき", "さんびき", "よんひき", "ごひき", "ろっぴき", "ななひき", "はっぴき", "きゅうひき", "じゅっぴき"],
    note_vi: "Động vật lớn như bò, ngựa dùng 頭 (とう).", note_en: "Large animals such as cows and horses use 頭 (tō).",
    example_jp: "猫が三匹います。", example_romaji: "Neko ga sanbiki imasu.", example_vi: "Có ba con mèo.", example_en: "There are three cats.",
  },
  {
    id: "ct-kai-floor", counter: "階", romaji: "-kai", use_vi: "tầng nhà", use_en: "floors of a building",
    readings: ["いっかい", "にかい", "さんがい", "よんかい", "ごかい", "ろっかい", "ななかい", "はっかい", "きゅうかい", "じゅっかい"],
    note_vi: "Tầng 3 đọc さんがい.", note_en: "The third floor is read さんがい.",
    example_jp: "事務室は三階です。", example_romaji: "Jimushitsu wa sangai desu.", example_vi: "Văn phòng ở tầng ba.", example_en: "The office is on the third floor.",
  },
  {
    id: "ct-kai-times", counter: "回", romaji: "-kai", use_vi: "số lần", use_en: "number of times",
    readings: ["いっかい", "にかい", "さんかい", "よんかい", "ごかい", "ろっかい", "ななかい", "はっかい", "きゅうかい", "じゅっかい"],
    note_vi: "Kết hợp với 週に, 月に để nói tần suất.", note_en: "Combine with 週に or 月に to express frequency.",
    example_jp: "週に二回日本語を勉強します。", example_romaji: "Shū ni nikai nihongo o benkyō shimasu.", example_vi: "Tôi học tiếng Nhật hai lần mỗi tuần.", example_en: "I study Japanese twice a week.",
  },
  {
    id: "ct-ji", counter: "時", romaji: "-ji", use_vi: "giờ (thời điểm)", use_en: "o'clock",
    readings: ["いちじ", "にじ", "さんじ", "よじ", "ごじ", "ろくじ", "しちじ", "はちじ", "くじ", "じゅうじ"],
    note_vi: "4 giờ là よじ, 7 giờ là しちじ, 9 giờ là くじ.", note_en: "Four is よじ, seven is しちじ and nine is くじ.",
    example_jp: "授業は九時に始まります。", example_romaji: "Jugyō wa kuji ni hajimarimasu.", example_vi: "Lớp học bắt đầu lúc chín giờ.", example_en: "Class starts at nine o'clock.",
  },
  {
    id: "ct-fun", counter: "分", romaji: "-fun", use_vi: "phút", use_en: "minutes",
    readings: ["いっぷん", "にふん", "さんぷん", "よんぷん", "ごふん", "ろっぷん", "ななふん", "はっぷん", "きゅうふん", "じゅっぷん"],
    note_vi: "1, 3, 4, 6, 8, 10 đọc ぷん.", note_en: "One, three, four, six, eight and ten use ぷん.",
    example_jp: "駅まで十分かかります。", example_romaji: "Eki made juppun kakarimasu.", example_vi: "Đến nhà ga mất mười phút.", example_en: "It takes ten minutes to the station.",
  },
  {
    id: "ct-nen", counter: "年", romaji: "-nen", use_vi: "năm", use_en: "years",
    readings: ["いちねん", "にねん", "さんねん", "よねん", "ごねん", "ろくねん", "しちねん", "はちねん", "きゅうねん", "じゅうねん"],
    note_vi: "4 năm là よねん.", note_en: "Four years is よねん.",
    example_jp: "日本語を二年勉強しています。", example_romaji: "Nihongo o ninen benkyō shite imasu.", example_vi: "Tôi học tiếng Nhật được hai năm.", example_en: "I have been studying Japanese for two years.",
  },
  {
    id: "ct-ban", counter: "番", romaji: "-ban", use_vi: "số thứ tự, thứ hạng", use_en: "ordinal numbers and rankings",
    readings: ["いちばん", "にばん", "さんばん", "よんばん", "ごばん", "ろくばん", "ななばん", "はちばん", "きゅうばん", "じゅうばん"],
    note_vi: "一番 còn nghĩa là nhất, hơn cả.", note_en: "一番 also means most or best.",
    example_jp: "三番のホームで待ってください。", example_romaji: "Sanban no hōmu de matte kudasai.", example_vi: "Xin hãy đợi ở ke số ba.", example_en: "Please wait on platform three.",
  },
  {
    id: "ct-tsuki", counter: "か月", romaji: "-kagetsu", use_vi: "số tháng (khoảng thời gian)", use_en: "number of months",
    readings: ["いっかげつ", "にかげつ", "さんかげつ", "よんかげつ", "ごかげつ", "ろっかげつ", "ななかげつ", "はっかげつ", "きゅうかげつ", "じゅっかげつ"],
    note_vi: "Khác với 月 chỉ tên tháng (一月 = tháng Một).", note_en: "Different from 月 for month names (一月 = January).",
    example_jp: "六か月後に試験を受けます。", example_romaji: "Rokkagetsu go ni shiken o ukemasu.", example_vi: "Sáu tháng nữa tôi sẽ thi.", example_en: "I will take the exam in six months.",
  },
];
