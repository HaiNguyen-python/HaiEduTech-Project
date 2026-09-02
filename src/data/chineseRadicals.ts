/**
 * @file chineseRadicals.ts
 * @description 40 bộ thủ (radicals) thường gặp nhất - nghĩa, số nét, ví dụ.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

export interface RadicalExample {
  char: string;
  pinyin: string;
  meaningVi: string;
  meaningEn: string;
}

export interface Radical {
  glyph: string;
  /** Dạng đứng độc lập (nếu bộ thủ là biến thể) */
  standalone?: string;
  pinyin: string;
  nameVi: string;
  nameEn: string;
  strokes: number;
  hintVi: string;
  hintEn: string;
  examples: RadicalExample[];
}

export const radicalGroups: { id: string; titleVi: string; titleEn: string; radicals: Radical[] }[] = [
  {
    id: "people",
    titleVi: "Con người và cơ thể",
    titleEn: "People and the body",
    radicals: [
      {
        glyph: "亻", standalone: "人", pinyin: "rén", nameVi: "Bộ nhân đứng", nameEn: "Person (side form)", strokes: 2,
        hintVi: "Chữ có bộ này thường liên quan tới người hoặc hành động của người.",
        hintEn: "Characters with this radical usually involve people or human actions.",
        examples: [
          { char: "他", pinyin: "tā", meaningVi: "anh ấy", meaningEn: "he" },
          { char: "住", pinyin: "zhù", meaningVi: "ở, sống", meaningEn: "to live" },
        ],
      },
      {
        glyph: "口", pinyin: "kǒu", nameVi: "Bộ khẩu (miệng)", nameEn: "Mouth", strokes: 3,
        hintVi: "Liên quan tới miệng: nói, ăn, uống, gọi.",
        hintEn: "Related to the mouth: speaking, eating, drinking, calling.",
        examples: [
          { char: "吃", pinyin: "chī", meaningVi: "ăn", meaningEn: "to eat" },
          { char: "叫", pinyin: "jiào", meaningVi: "gọi", meaningEn: "to call" },
        ],
      },
      {
        glyph: "扌", standalone: "手", pinyin: "shǒu", nameVi: "Bộ thủ (tay)", nameEn: "Hand", strokes: 3,
        hintVi: "Hầu hết là động tác làm bằng tay.",
        hintEn: "Mostly actions done with the hands.",
        examples: [
          { char: "打", pinyin: "dǎ", meaningVi: "đánh, gọi (điện)", meaningEn: "to hit, to make (a call)" },
          { char: "拿", pinyin: "ná", meaningVi: "lấy, cầm", meaningEn: "to take, to hold" },
        ],
      },
      {
        glyph: "足", pinyin: "zú", nameVi: "Bộ túc (chân)", nameEn: "Foot", strokes: 7,
        hintVi: "Liên quan tới chân và di chuyển.",
        hintEn: "Related to feet and movement.",
        examples: [
          { char: "跑", pinyin: "pǎo", meaningVi: "chạy", meaningEn: "to run" },
          { char: "跳", pinyin: "tiào", meaningVi: "nhảy", meaningEn: "to jump" },
        ],
      },
      {
        glyph: "目", pinyin: "mù", nameVi: "Bộ mục (mắt)", nameEn: "Eye", strokes: 5,
        hintVi: "Liên quan tới mắt và việc nhìn.",
        hintEn: "Related to eyes and seeing.",
        examples: [
          { char: "看", pinyin: "kàn", meaningVi: "xem, nhìn", meaningEn: "to look" },
          { char: "眼", pinyin: "yǎn", meaningVi: "mắt", meaningEn: "eye" },
        ],
      },
      {
        glyph: "心", pinyin: "xīn", nameVi: "Bộ tâm (tim)", nameEn: "Heart", strokes: 4,
        hintVi: "Cảm xúc và suy nghĩ. Dạng bên trái viết là 忄.",
        hintEn: "Emotions and thoughts. The left-side form is 忄.",
        examples: [
          { char: "想", pinyin: "xiǎng", meaningVi: "nghĩ, muốn", meaningEn: "to think, to want" },
          { char: "忙", pinyin: "máng", meaningVi: "bận", meaningEn: "busy" },
        ],
      },
      {
        glyph: "月", pinyin: "yuè", nameVi: "Bộ nhục / nguyệt", nameEn: "Moon / flesh", strokes: 4,
        hintVi: "Khi chỉ bộ phận cơ thể thì gốc là 肉 (thịt), ngoài ra là mặt trăng và tháng.",
        hintEn: "For body parts it comes from 肉 (flesh); otherwise it means moon or month.",
        examples: [
          { char: "朋", pinyin: "péng", meaningVi: "bạn", meaningEn: "friend" },
          { char: "脸", pinyin: "liǎn", meaningVi: "mặt", meaningEn: "face" },
        ],
      },
      {
        glyph: "女", pinyin: "nǚ", nameVi: "Bộ nữ", nameEn: "Woman", strokes: 3,
        hintVi: "Liên quan tới người phụ nữ và quan hệ gia đình.",
        hintEn: "Related to women and family relations.",
        examples: [
          { char: "妈", pinyin: "mā", meaningVi: "mẹ", meaningEn: "mother" },
          { char: "好", pinyin: "hǎo", meaningVi: "tốt", meaningEn: "good" },
        ],
      },
      {
        glyph: "子", pinyin: "zǐ", nameVi: "Bộ tử (con)", nameEn: "Child", strokes: 3,
        hintVi: "Trẻ con, con cái, đôi khi là hậu tố danh từ.",
        hintEn: "Children, offspring, sometimes a noun suffix.",
        examples: [
          { char: "学", pinyin: "xué", meaningVi: "học", meaningEn: "to study" },
          { char: "孩", pinyin: "hái", meaningVi: "đứa trẻ", meaningEn: "child" },
        ],
      },
      {
        glyph: "力", pinyin: "lì", nameVi: "Bộ lực (sức)", nameEn: "Strength", strokes: 2,
        hintVi: "Sức mạnh, nỗ lực, lao động.",
        hintEn: "Power, effort, labour.",
        examples: [
          { char: "动", pinyin: "dòng", meaningVi: "động, chuyển động", meaningEn: "to move" },
          { char: "男", pinyin: "nán", meaningVi: "nam, đàn ông", meaningEn: "male" },
        ],
      },
    ],
  },
  {
    id: "nature",
    titleVi: "Thiên nhiên",
    titleEn: "Nature",
    radicals: [
      {
        glyph: "氵", standalone: "水", pinyin: "shuǐ", nameVi: "Bộ thuỷ (nước)", nameEn: "Water", strokes: 3,
        hintVi: "Ba nét chấm bên trái: chất lỏng, sông biển, tắm rửa.",
        hintEn: "Three dots on the left: liquids, rivers, washing.",
        examples: [
          { char: "河", pinyin: "hé", meaningVi: "sông", meaningEn: "river" },
          { char: "洗", pinyin: "xǐ", meaningVi: "rửa, giặt", meaningEn: "to wash" },
        ],
      },
      {
        glyph: "火", pinyin: "huǒ", nameVi: "Bộ hoả (lửa)", nameEn: "Fire", strokes: 4,
        hintVi: "Nấu nướng, nóng, cháy. Dạng dưới chân chữ viết là 灬.",
        hintEn: "Cooking, heat, burning. The bottom form is 灬.",
        examples: [
          { char: "烧", pinyin: "shāo", meaningVi: "đốt, nấu", meaningEn: "to burn, to cook" },
          { char: "热", pinyin: "rè", meaningVi: "nóng", meaningEn: "hot" },
        ],
      },
      {
        glyph: "木", pinyin: "mù", nameVi: "Bộ mộc (cây)", nameEn: "Tree, wood", strokes: 4,
        hintVi: "Cây cối và đồ làm bằng gỗ.",
        hintEn: "Trees and things made of wood.",
        examples: [
          { char: "树", pinyin: "shù", meaningVi: "cây", meaningEn: "tree" },
          { char: "桌", pinyin: "zhuō", meaningVi: "cái bàn", meaningEn: "table" },
        ],
      },
      {
        glyph: "日", pinyin: "rì", nameVi: "Bộ nhật (trời, ngày)", nameEn: "Sun, day", strokes: 4,
        hintVi: "Mặt trời, thời gian, ngày tháng.",
        hintEn: "The sun, time, days.",
        examples: [
          { char: "明", pinyin: "míng", meaningVi: "sáng", meaningEn: "bright" },
          { char: "时", pinyin: "shí", meaningVi: "thời gian", meaningEn: "time" },
        ],
      },
      {
        glyph: "土", pinyin: "tǔ", nameVi: "Bộ thổ (đất)", nameEn: "Earth, soil", strokes: 3,
        hintVi: "Đất, địa điểm, xây dựng.",
        hintEn: "Soil, places, building.",
        examples: [
          { char: "地", pinyin: "dì", meaningVi: "đất, nơi", meaningEn: "ground, place" },
          { char: "城", pinyin: "chéng", meaningVi: "thành phố", meaningEn: "city wall, city" },
        ],
      },
      {
        glyph: "山", pinyin: "shān", nameVi: "Bộ sơn (núi)", nameEn: "Mountain", strokes: 3,
        hintVi: "Núi và địa hình cao.",
        hintEn: "Mountains and high terrain.",
        examples: [
          { char: "岁", pinyin: "suì", meaningVi: "tuổi", meaningEn: "years of age" },
          { char: "岛", pinyin: "dǎo", meaningVi: "đảo", meaningEn: "island" },
        ],
      },
      {
        glyph: "艹", pinyin: "cǎo", nameVi: "Bộ thảo (cỏ)", nameEn: "Grass, plants", strokes: 3,
        hintVi: "Nằm trên đầu chữ: cây cỏ, hoa, rau, thuốc.",
        hintEn: "Sits on top: plants, flowers, vegetables, herbs.",
        examples: [
          { char: "菜", pinyin: "cài", meaningVi: "rau, món ăn", meaningEn: "vegetable, dish" },
          { char: "花", pinyin: "huā", meaningVi: "hoa", meaningEn: "flower" },
        ],
      },
      {
        glyph: "雨", pinyin: "yǔ", nameVi: "Bộ vũ (mưa)", nameEn: "Rain", strokes: 8,
        hintVi: "Thời tiết và hiện tượng trên trời.",
        hintEn: "Weather and sky phenomena.",
        examples: [
          { char: "雪", pinyin: "xuě", meaningVi: "tuyết", meaningEn: "snow" },
          { char: "雷", pinyin: "léi", meaningVi: "sấm", meaningEn: "thunder" },
        ],
      },
      {
        glyph: "石", pinyin: "shí", nameVi: "Bộ thạch (đá)", nameEn: "Stone", strokes: 5,
        hintVi: "Đá, khoáng vật, vật cứng.",
        hintEn: "Stone, minerals, hard things.",
        examples: [
          { char: "码", pinyin: "mǎ", meaningVi: "mã, số", meaningEn: "code, number" },
          { char: "硬", pinyin: "yìng", meaningVi: "cứng", meaningEn: "hard" },
        ],
      },
      {
        glyph: "鱼", pinyin: "yú", nameVi: "Bộ ngư (cá)", nameEn: "Fish", strokes: 8,
        hintVi: "Các loài cá và sinh vật dưới nước.",
        hintEn: "Fish and water creatures.",
        examples: [
          { char: "鲜", pinyin: "xiān", meaningVi: "tươi", meaningEn: "fresh" },
          { char: "鲁", pinyin: "lǔ", meaningVi: "Lỗ (tên đất)", meaningEn: "Lu (place name)" },
        ],
      },
    ],
  },
  {
    id: "life",
    titleVi: "Đời sống hằng ngày",
    titleEn: "Daily life",
    radicals: [
      {
        glyph: "讠", standalone: "言", pinyin: "yán", nameVi: "Bộ ngôn (lời nói)", nameEn: "Speech", strokes: 2,
        hintVi: "Nói, ngôn ngữ, trao đổi bằng lời.",
        hintEn: "Speaking, language, verbal exchange.",
        examples: [
          { char: "说", pinyin: "shuō", meaningVi: "nói", meaningEn: "to speak" },
          { char: "语", pinyin: "yǔ", meaningVi: "ngôn ngữ", meaningEn: "language" },
        ],
      },
      {
        glyph: "饣", standalone: "食", pinyin: "shí", nameVi: "Bộ thực (ăn)", nameEn: "Food", strokes: 3,
        hintVi: "Đồ ăn và việc ăn uống.",
        hintEn: "Food and eating.",
        examples: [
          { char: "饭", pinyin: "fàn", meaningVi: "cơm", meaningEn: "cooked rice, meal" },
          { char: "饿", pinyin: "è", meaningVi: "đói", meaningEn: "hungry" },
        ],
      },
      {
        glyph: "衤", standalone: "衣", pinyin: "yī", nameVi: "Bộ y (áo)", nameEn: "Clothing", strokes: 5,
        hintVi: "Quần áo và vải vóc.",
        hintEn: "Clothes and fabric.",
        examples: [
          { char: "衬", pinyin: "chèn", meaningVi: "áo lót, sơ mi", meaningEn: "shirt lining" },
          { char: "裤", pinyin: "kù", meaningVi: "quần", meaningEn: "trousers" },
        ],
      },
      {
        glyph: "钅", standalone: "金", pinyin: "jīn", nameVi: "Bộ kim (kim loại)", nameEn: "Metal", strokes: 5,
        hintVi: "Kim loại, tiền, dụng cụ.",
        hintEn: "Metals, money, tools.",
        examples: [
          { char: "钱", pinyin: "qián", meaningVi: "tiền", meaningEn: "money" },
          { char: "银", pinyin: "yín", meaningVi: "bạc", meaningEn: "silver" },
        ],
      },
      {
        glyph: "宀", pinyin: "mián", nameVi: "Bộ miên (mái nhà)", nameEn: "Roof", strokes: 3,
        hintVi: "Mái nhà che phía trên: nhà cửa, chỗ ở.",
        hintEn: "A roof on top: houses and dwellings.",
        examples: [
          { char: "家", pinyin: "jiā", meaningVi: "nhà, gia đình", meaningEn: "home, family" },
          { char: "客", pinyin: "kè", meaningVi: "khách", meaningEn: "guest" },
        ],
      },
      {
        glyph: "门", pinyin: "mén", nameVi: "Bộ môn (cửa)", nameEn: "Door", strokes: 3,
        hintVi: "Cửa, lối vào, ra vào.",
        hintEn: "Doors, gates, entrances.",
        examples: [
          { char: "问", pinyin: "wèn", meaningVi: "hỏi", meaningEn: "to ask" },
          { char: "间", pinyin: "jiān", meaningVi: "khoảng, phòng", meaningEn: "between, room" },
        ],
      },
      {
        glyph: "车", pinyin: "chē", nameVi: "Bộ xa (xe)", nameEn: "Vehicle", strokes: 4,
        hintVi: "Xe cộ và giao thông.",
        hintEn: "Vehicles and transport.",
        examples: [
          { char: "轻", pinyin: "qīng", meaningVi: "nhẹ", meaningEn: "light" },
          { char: "辆", pinyin: "liàng", meaningVi: "chiếc (xe)", meaningEn: "classifier for vehicles" },
        ],
      },
      {
        glyph: "纟", standalone: "糸", pinyin: "sī", nameVi: "Bộ mịch (tơ, sợi)", nameEn: "Silk, thread", strokes: 3,
        hintVi: "Sợi, dệt, màu sắc của vải.",
        hintEn: "Thread, weaving, fabric colours.",
        examples: [
          { char: "红", pinyin: "hóng", meaningVi: "đỏ", meaningEn: "red" },
          { char: "纸", pinyin: "zhǐ", meaningVi: "giấy", meaningEn: "paper" },
        ],
      },
      {
        glyph: "贝", pinyin: "bèi", nameVi: "Bộ bối (vỏ sò)", nameEn: "Shell, money", strokes: 4,
        hintVi: "Vỏ sò từng dùng làm tiền: chữ liên quan tới tiền bạc, mua bán.",
        hintEn: "Shells were early money: money and trade characters.",
        examples: [
          { char: "贵", pinyin: "guì", meaningVi: "đắt", meaningEn: "expensive" },
          { char: "费", pinyin: "fèi", meaningVi: "phí", meaningEn: "fee" },
        ],
      },
      {
        glyph: "米", pinyin: "mǐ", nameVi: "Bộ mễ (gạo)", nameEn: "Rice", strokes: 6,
        hintVi: "Gạo và các loại ngũ cốc, bột.",
        hintEn: "Rice, grains and flour.",
        examples: [
          { char: "粉", pinyin: "fěn", meaningVi: "bột, phở, bún", meaningEn: "powder, noodles" },
          { char: "糖", pinyin: "táng", meaningVi: "đường, kẹo", meaningEn: "sugar, sweets" },
        ],
      },
    ],
  },
  {
    id: "action",
    titleVi: "Hành động và trừu tượng",
    titleEn: "Actions and abstract ideas",
    radicals: [
      {
        glyph: "辶", pinyin: "chuò", nameVi: "Bộ sước (bước đi)", nameEn: "Walking, movement", strokes: 3,
        hintVi: "Di chuyển, đi lại, đường xa.",
        hintEn: "Moving, travelling, distance.",
        examples: [
          { char: "还", pinyin: "hái", meaningVi: "còn, vẫn", meaningEn: "still, yet" },
          { char: "远", pinyin: "yuǎn", meaningVi: "xa", meaningEn: "far" },
        ],
      },
      {
        glyph: "彳", pinyin: "chì", nameVi: "Bộ sách (bước chân trái)", nameEn: "Step, road", strokes: 3,
        hintVi: "Đi lại chậm, hành vi, con đường.",
        hintEn: "Walking, behaviour, roads.",
        examples: [
          { char: "很", pinyin: "hěn", meaningVi: "rất", meaningEn: "very" },
          { char: "行", pinyin: "xíng", meaningVi: "đi, được", meaningEn: "to walk, all right" },
        ],
      },
      {
        glyph: "亠", pinyin: "tóu", nameVi: "Bộ đầu (nắp)", nameEn: "Lid", strokes: 2,
        hintVi: "Nét ngang có chấm ở trên như cái nắp, thường ở đầu chữ.",
        hintEn: "A dot over a horizontal line, like a lid on top of the character.",
        examples: [
          { char: "京", pinyin: "jīng", meaningVi: "kinh (đô)", meaningEn: "capital" },
          { char: "亮", pinyin: "liàng", meaningVi: "sáng", meaningEn: "bright" },
        ],
      },
      {
        glyph: "刂", standalone: "刀", pinyin: "dāo", nameVi: "Bộ đao (dao)", nameEn: "Knife", strokes: 2,
        hintVi: "Cắt, chia, sắc nhọn. Thường đứng bên phải.",
        hintEn: "Cutting, dividing, sharpness. Usually on the right.",
        examples: [
          { char: "别", pinyin: "bié", meaningVi: "đừng, khác", meaningEn: "don't, other" },
          { char: "到", pinyin: "dào", meaningVi: "đến", meaningEn: "to arrive" },
        ],
      },
      {
        glyph: "见", pinyin: "jiàn", nameVi: "Bộ kiến (thấy)", nameEn: "To see", strokes: 4,
        hintVi: "Nhìn thấy, gặp gỡ, quan điểm.",
        hintEn: "Seeing, meeting, views.",
        examples: [
          { char: "现", pinyin: "xiàn", meaningVi: "hiện, bây giờ", meaningEn: "present, now" },
          { char: "视", pinyin: "shì", meaningVi: "nhìn, thị", meaningEn: "to view" },
        ],
      },
      {
        glyph: "攵", pinyin: "pū", nameVi: "Bộ phộc (đánh nhẹ)", nameEn: "Tap, action", strokes: 4,
        hintVi: "Hành động tác động lên vật khác, thường ở bên phải.",
        hintEn: "Acting upon something, usually on the right side.",
        examples: [
          { char: "教", pinyin: "jiāo", meaningVi: "dạy", meaningEn: "to teach" },
          { char: "放", pinyin: "fàng", meaningVi: "đặt, thả", meaningEn: "to put, to release" },
        ],
      },
      {
        glyph: "疒", pinyin: "chuáng", nameVi: "Bộ nạch (bệnh)", nameEn: "Sickness", strokes: 5,
        hintVi: "Bệnh tật và đau đớn.",
        hintEn: "Illness and pain.",
        examples: [
          { char: "病", pinyin: "bìng", meaningVi: "bệnh", meaningEn: "illness" },
          { char: "疼", pinyin: "téng", meaningVi: "đau", meaningEn: "to ache" },
        ],
      },
      {
        glyph: "阝", pinyin: "fù / yì", nameVi: "Bộ phụ / ấp", nameEn: "Mound / town", strokes: 2,
        hintVi: "Bên trái là gò đất (阜), bên phải là làng ấp (邑).",
        hintEn: "On the left it means mound (阜); on the right, town (邑).",
        examples: [
          { char: "院", pinyin: "yuàn", meaningVi: "sân, viện", meaningEn: "courtyard, institute" },
          { char: "都", pinyin: "dōu", meaningVi: "đều", meaningEn: "all" },
        ],
      },
      {
        glyph: "囗", pinyin: "wéi", nameVi: "Bộ vi (vòng vây)", nameEn: "Enclosure", strokes: 3,
        hintVi: "Khung vây quanh: bao bọc, khu vực. Nhớ quy tắc đóng khung sau cùng.",
        hintEn: "A frame around the character: enclosing, areas. Remember to close the box last.",
        examples: [
          { char: "国", pinyin: "guó", meaningVi: "nước, quốc gia", meaningEn: "country" },
          { char: "回", pinyin: "huí", meaningVi: "về, lượt", meaningEn: "to return, time" },
        ],
      },
      {
        glyph: "厂", pinyin: "chǎng", nameVi: "Bộ hán (sườn dốc)", nameEn: "Cliff, factory", strokes: 2,
        hintVi: "Mái che nghiêng bên trên và bên trái chữ.",
        hintEn: "A slanted cover over the top-left of the character.",
        examples: [
          { char: "厅", pinyin: "tīng", meaningVi: "phòng lớn, sảnh", meaningEn: "hall" },
          { char: "历", pinyin: "lì", meaningVi: "lịch, trải qua", meaningEn: "history, to experience" },
        ],
      },
    ],
  },
];

export const allRadicals: Radical[] = radicalGroups.flatMap((g) => g.radicals);

export interface RadicalQuizItem {
  glyph: string;
  promptVi: string;
  promptEn: string;
  options: string[];
  optionsEn: string[];
  answer: number;
  explainVi: string;
  explainEn: string;
}

export const radicalQuizzes: RadicalQuizItem[] = [
  {
    glyph: "氵",
    promptVi: "Bộ 氵 gợi ý nghĩa gì?",
    promptEn: "What meaning does the radical 氵 hint at?",
    options: ["Nước", "Lửa", "Tay", "Cửa"],
    optionsEn: ["Water", "Fire", "Hand", "Door"],
    answer: 0,
    explainVi: "氵 là dạng bên trái của 水 (nước): 河, 洗, 海.",
    explainEn: "氵 is the left-side form of 水 (water): 河, 洗, 海.",
  },
  {
    glyph: "讠",
    promptVi: "Chữ 说 có bộ 讠, vậy 说 liên quan tới điều gì?",
    promptEn: "说 contains 讠, so what is it related to?",
    options: ["Lời nói", "Ăn uống", "Kim loại", "Cây cối"],
    optionsEn: ["Speech", "Eating", "Metal", "Trees"],
    answer: 0,
    explainVi: "讠 từ 言 (lời nói), nên 说 nghĩa là nói.",
    explainEn: "讠 comes from 言 (speech), so 说 means to speak.",
  },
  {
    glyph: "扌",
    promptVi: "Bộ 扌 trong 打 cho biết đây là loại hành động nào?",
    promptEn: "The 扌 radical in 打 tells you it is what kind of action?",
    options: ["Làm bằng tay", "Làm bằng chân", "Nói ra miệng", "Liên quan tới tiền"],
    optionsEn: ["Done with the hand", "Done with the foot", "Done with the mouth", "Related to money"],
    answer: 0,
    explainVi: "扌 là dạng bên trái của 手 (tay).",
    explainEn: "扌 is the left-side form of 手 (hand).",
  },
  {
    glyph: "宀",
    promptVi: "Bộ 宀 nằm ở đâu trong chữ và nghĩa là gì?",
    promptEn: "Where does 宀 sit and what does it mean?",
    options: ["Trên đầu chữ, nghĩa mái nhà", "Bên phải, nghĩa dao", "Dưới chân, nghĩa lửa", "Bao quanh, nghĩa vòng vây"],
    optionsEn: ["On top, meaning roof", "On the right, meaning knife", "At the bottom, meaning fire", "Around, meaning enclosure"],
    answer: 0,
    explainVi: "宀 là mái nhà: 家, 客, room-related characters.",
    explainEn: "宀 is a roof: 家, 客 and other dwelling characters.",
  },
  {
    glyph: "贝",
    promptVi: "Vì sao 贵 và 费 đều có bộ 贝?",
    promptEn: "Why do 贵 and 费 both contain 贝?",
    options: ["Vỏ sò từng dùng làm tiền", "Vì đều là tên riêng", "Vì đều liên quan tới biển", "Vì đều là động từ"],
    optionsEn: ["Shells were used as early money", "They are all proper nouns", "They all relate to the sea", "They are all verbs"],
    answer: 0,
    explainVi: "贝 (vỏ sò) là tiền cổ, nên chữ chỉ tiền bạc dùng bộ này.",
    explainEn: "贝 (shell) was ancient currency, so money words use it.",
  },
  {
    glyph: "囗",
    promptVi: "Khi viết 国, nét nào viết sau cùng?",
    promptEn: "When writing 国, which stroke comes last?",
    options: ["Nét ngang đóng khung dưới", "Nét ngang trên", "Phần bên trong", "Nét sổ bên phải"],
    optionsEn: ["The bottom horizontal that closes the box", "The top horizontal", "The inside part", "The right vertical"],
    answer: 0,
    explainVi: "Quy tắc: vào nhà rồi mới đóng cửa - khung đóng lại sau cùng.",
    explainEn: "Rule: enter the room, then close the door - the box closes last.",
  },
  {
    glyph: "忄",
    promptVi: "Bộ 忄 trong 忙 là dạng bên trái của bộ nào?",
    promptEn: "The 忄 radical in 忙 is the left-side form of which radical?",
    options: ["心 (tim)", "水 (nước)", "手 (tay)", "火 (lửa)"],
    optionsEn: ["心 (heart)", "水 (water)", "手 (hand)", "火 (fire)"],
    answer: 0,
    explainVi: "忄 từ 心, nên chữ mang bộ này thường nói về cảm xúc.",
    explainEn: "忄 comes from 心, so these characters usually describe feelings.",
  },
  {
    glyph: "疒",
    promptVi: "Chữ 病 và 疼 cùng bộ 疒, nhóm nghĩa là gì?",
    promptEn: "病 and 疼 share the radical 疒 - what is the meaning group?",
    options: ["Bệnh và đau", "Ăn uống", "Đi lại", "Học tập"],
    optionsEn: ["Illness and pain", "Eating", "Travelling", "Studying"],
    answer: 0,
    explainVi: "疒 là bộ bệnh, gặp trong hầu hết chữ chỉ bệnh tật.",
    explainEn: "疒 is the sickness radical, found in most illness words.",
  },
];
