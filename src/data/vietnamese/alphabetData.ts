// Vietnamese Alphabet Data — 29 letters + 6 tones

export interface AlphabetLetter {
  letter: string;
  uppercase: string;
  name: string;
  nameEn: string;
  ipa: string;
  exampleWord: string;
  exampleMeaning: string;
  exampleMeaningEn: string;
  strokeDescription: string;
  strokeDescriptionEn: string;
  strokeCount: number;
  // SVG path data for stroke animation
  strokePaths: string[];
}

export interface ToneMark {
  name: string;
  nameEn: string;
  mark: string;
  example: string;
  exampleMeaning: string;
  exampleMeaningEn: string;
  description: string;
  descriptionEn: string;
  pitchDirection: "flat" | "rising" | "falling" | "dipping" | "rising-broken" | "falling-heavy";
}

export const vietnameseAlphabet: AlphabetLetter[] = [
  {
    letter: "a", uppercase: "A", name: "a", nameEn: "ah", ipa: "/aː/",
    exampleWord: "ăn", exampleMeaning: "ăn (ăn cơm)", exampleMeaningEn: "eat",
    strokeDescription: "Viết nét cong tròn từ phải sang trái, rồi kéo nét sổ thẳng bên phải",
    strokeDescriptionEn: "Draw a round curve from right to left, then a vertical stroke on the right",
    strokeCount: 2,
    strokePaths: ["M30,40 C30,20 10,20 10,40 C10,55 30,55 30,40", "M30,20 L30,55"]
  },
  {
    letter: "ă", uppercase: "Ă", name: "á", nameEn: "ah-breve", ipa: "/a/",
    exampleWord: "ăn", exampleMeaning: "ăn", exampleMeaningEn: "eat",
    strokeDescription: "Viết chữ 'a' rồi thêm dấu trăng (˘) phía trên",
    strokeDescriptionEn: "Write 'a' then add a breve (˘) mark on top",
    strokeCount: 3,
    strokePaths: ["M30,40 C30,20 10,20 10,40 C10,55 30,55 30,40", "M30,20 L30,55", "M12,12 Q20,6 28,12"]
  },
  {
    letter: "â", uppercase: "Â", name: "ớ", nameEn: "ah-circumflex", ipa: "/ə/",
    exampleWord: "ân", exampleMeaning: "ân huệ", exampleMeaningEn: "grace",
    strokeDescription: "Viết chữ 'a' rồi thêm dấu mũ (^) phía trên",
    strokeDescriptionEn: "Write 'a' then add a circumflex (^) on top",
    strokeCount: 3,
    strokePaths: ["M30,40 C30,20 10,20 10,40 C10,55 30,55 30,40", "M30,20 L30,55", "M14,12 L20,5 L26,12"]
  },
  {
    letter: "b", uppercase: "B", name: "bê", nameEn: "beh", ipa: "/ɓ/",
    exampleWord: "bàn", exampleMeaning: "cái bàn", exampleMeaningEn: "table",
    strokeDescription: "Kéo nét sổ thẳng từ trên xuống, rồi viết nét cong bụng bên phải",
    strokeDescriptionEn: "Draw a vertical line down, then a belly curve on the right",
    strokeCount: 2,
    strokePaths: ["M10,5 L10,55", "M10,35 C10,55 30,55 30,40 C30,25 10,25 10,35"]
  },
  {
    letter: "c", uppercase: "C", name: "xê", nameEn: "seh", ipa: "/k/",
    exampleWord: "cá", exampleMeaning: "con cá", exampleMeaningEn: "fish",
    strokeDescription: "Viết một nét cong mở từ trên bên phải, vòng xuống và sang trái",
    strokeDescriptionEn: "Draw an open curve from top right, down and to the left",
    strokeCount: 1,
    strokePaths: ["M30,25 C25,18 10,18 10,38 C10,55 25,55 30,48"]
  },
  {
    letter: "d", uppercase: "D", name: "dê", nameEn: "zeh", ipa: "/z/ (Bắc), /j/ (Nam)",
    exampleWord: "dễ", exampleMeaning: "dễ dàng", exampleMeaningEn: "easy",
    strokeDescription: "Viết nét cong tròn như chữ 'a', rồi kéo nét sổ cao lên trên",
    strokeDescriptionEn: "Write a round curve like 'a', then extend the vertical stroke upward",
    strokeCount: 2,
    strokePaths: ["M30,40 C30,25 10,25 10,40 C10,55 30,55 30,40", "M30,5 L30,55"]
  },
  {
    letter: "đ", uppercase: "Đ", name: "đê", nameEn: "deh", ipa: "/ɗ/",
    exampleWord: "đi", exampleMeaning: "đi bộ", exampleMeaningEn: "walk/go",
    strokeDescription: "Viết chữ 'd' rồi thêm nét gạch ngang qua thân chữ",
    strokeDescriptionEn: "Write 'd' then add a horizontal stroke through the stem",
    strokeCount: 3,
    strokePaths: ["M30,40 C30,25 10,25 10,40 C10,55 30,55 30,40", "M30,5 L30,55", "M25,18 L35,18"]
  },
  {
    letter: "e", uppercase: "E", name: "e", nameEn: "eh", ipa: "/ɛ/",
    exampleWord: "em", exampleMeaning: "em bé", exampleMeaningEn: "baby/younger sibling",
    strokeDescription: "Viết nét ngang ngắn ở giữa, rồi vòng cong lên trên và xuống dưới",
    strokeDescriptionEn: "Draw a short horizontal stroke in the middle, then curve up and down",
    strokeCount: 1,
    strokePaths: ["M10,38 L30,38 C30,25 10,25 10,38 C10,55 30,55 30,48"]
  },
  {
    letter: "ê", uppercase: "Ê", name: "ê", nameEn: "eh-circumflex", ipa: "/e/",
    exampleWord: "mê", exampleMeaning: "mê mẩn", exampleMeaningEn: "fascinated",
    strokeDescription: "Viết chữ 'e' rồi thêm dấu mũ (^) phía trên",
    strokeDescriptionEn: "Write 'e' then add a circumflex (^) on top",
    strokeCount: 2,
    strokePaths: ["M10,38 L30,38 C30,25 10,25 10,38 C10,55 30,55 30,48", "M14,18 L20,11 L26,18"]
  },
  {
    letter: "g", uppercase: "G", name: "giê", nameEn: "zheh", ipa: "/ɣ/",
    exampleWord: "gà", exampleMeaning: "con gà", exampleMeaningEn: "chicken",
    strokeDescription: "Viết nét cong tròn rồi kéo đuôi xuống dưới đường kẻ",
    strokeDescriptionEn: "Write a round curve then extend the tail below the baseline",
    strokeCount: 2,
    strokePaths: ["M30,40 C30,25 10,25 10,40 C10,55 30,55 30,40", "M30,40 L30,65 C30,72 15,72 15,65"]
  },
  {
    letter: "h", uppercase: "H", name: "hát", nameEn: "haht", ipa: "/h/",
    exampleWord: "hoa", exampleMeaning: "bông hoa", exampleMeaningEn: "flower",
    strokeDescription: "Kéo nét sổ thẳng từ trên xuống, rồi viết nét cong nhỏ bên phải",
    strokeDescriptionEn: "Draw a vertical line down, then a small arch on the right",
    strokeCount: 2,
    strokePaths: ["M10,5 L10,55", "M10,35 C10,25 30,25 30,40 L30,55"]
  },
  {
    letter: "i", uppercase: "I", name: "i", nameEn: "ee", ipa: "/i/",
    exampleWord: "im", exampleMeaning: "im lặng", exampleMeaningEn: "quiet/silent",
    strokeDescription: "Viết nét sổ thẳng ngắn rồi chấm một dấu chấm phía trên",
    strokeDescriptionEn: "Write a short vertical stroke then dot on top",
    strokeCount: 2,
    strokePaths: ["M20,25 L20,55", "M20,15 L20,17"]
  },
  {
    letter: "k", uppercase: "K", name: "ca", nameEn: "kah", ipa: "/k/",
    exampleWord: "kẹo", exampleMeaning: "kẹo ngọt", exampleMeaningEn: "candy",
    strokeDescription: "Kéo nét sổ thẳng, rồi viết 2 nét xiên (vào trong và ra ngoài)",
    strokeDescriptionEn: "Draw a vertical line, then two diagonal strokes (in and out)",
    strokeCount: 3,
    strokePaths: ["M10,5 L10,55", "M30,25 L10,40", "M10,40 L30,55"]
  },
  {
    letter: "l", uppercase: "L", name: "e-lờ", nameEn: "el", ipa: "/l/",
    exampleWord: "lá", exampleMeaning: "lá cây", exampleMeaningEn: "leaf",
    strokeDescription: "Kéo một nét sổ thẳng dài từ trên xuống",
    strokeDescriptionEn: "Draw one long vertical stroke from top to bottom",
    strokeCount: 1,
    strokePaths: ["M20,5 L20,55"]
  },
  {
    letter: "m", uppercase: "M", name: "em-mờ", nameEn: "em", ipa: "/m/",
    exampleWord: "mẹ", exampleMeaning: "mẹ", exampleMeaningEn: "mother",
    strokeDescription: "Kéo nét sổ, rồi viết 2 nét cong liên tiếp bên phải",
    strokeDescriptionEn: "Draw a vertical stroke, then two consecutive arches",
    strokeCount: 3,
    strokePaths: ["M5,25 L5,55", "M5,35 C5,25 18,25 18,40 L18,55", "M18,35 C18,25 32,25 32,40 L32,55"]
  },
  {
    letter: "n", uppercase: "N", name: "en-nờ", nameEn: "en", ipa: "/n/",
    exampleWord: "nước", exampleMeaning: "nước uống", exampleMeaningEn: "water",
    strokeDescription: "Kéo nét sổ rồi viết 1 nét cong bên phải",
    strokeDescriptionEn: "Draw a vertical stroke then one arch on the right",
    strokeCount: 2,
    strokePaths: ["M10,25 L10,55", "M10,35 C10,25 30,25 30,40 L30,55"]
  },
  {
    letter: "o", uppercase: "O", name: "o", nameEn: "oh", ipa: "/ɔ/",
    exampleWord: "ong", exampleMeaning: "con ong", exampleMeaningEn: "bee",
    strokeDescription: "Viết một vòng tròn khép kín",
    strokeDescriptionEn: "Draw a closed circle",
    strokeCount: 1,
    strokePaths: ["M30,38 C30,20 10,20 10,38 C10,55 30,55 30,38"]
  },
  {
    letter: "ô", uppercase: "Ô", name: "ô", nameEn: "oh-circumflex", ipa: "/o/",
    exampleWord: "ông", exampleMeaning: "ông nội", exampleMeaningEn: "grandfather",
    strokeDescription: "Viết chữ 'o' rồi thêm dấu mũ (^) phía trên",
    strokeDescriptionEn: "Write 'o' then add a circumflex on top",
    strokeCount: 2,
    strokePaths: ["M30,38 C30,20 10,20 10,38 C10,55 30,55 30,38", "M14,12 L20,5 L26,12"]
  },
  {
    letter: "ơ", uppercase: "Ơ", name: "ơ", nameEn: "uh", ipa: "/əː/",
    exampleWord: "ơi", exampleMeaning: "ơi! (gọi)", exampleMeaningEn: "hey! (calling)",
    strokeDescription: "Viết chữ 'o' rồi thêm dấu móc (˛) phía trên bên phải",
    strokeDescriptionEn: "Write 'o' then add a horn mark on upper right",
    strokeCount: 2,
    strokePaths: ["M30,38 C30,20 10,20 10,38 C10,55 30,55 30,38", "M30,25 C33,20 36,22 34,28"]
  },
  {
    letter: "p", uppercase: "P", name: "pê", nameEn: "peh", ipa: "/p/",
    exampleWord: "pin", exampleMeaning: "cục pin", exampleMeaningEn: "battery",
    strokeDescription: "Kéo nét sổ dài xuống dưới đường kẻ, rồi viết nét cong bụng bên phải phía trên",
    strokeDescriptionEn: "Draw a long vertical below baseline, then a belly curve on upper right",
    strokeCount: 2,
    strokePaths: ["M10,25 L10,65", "M10,25 C10,25 30,25 30,38 C30,48 10,48 10,38"]
  },
  {
    letter: "q", uppercase: "Q", name: "cu/quy", nameEn: "koo", ipa: "/k/",
    exampleWord: "quả", exampleMeaning: "quả bóng", exampleMeaningEn: "ball/fruit",
    strokeDescription: "Viết nét cong tròn rồi kéo đuôi xuống bên phải",
    strokeDescriptionEn: "Write a round curve then extend tail down on the right",
    strokeCount: 2,
    strokePaths: ["M30,40 C30,25 10,25 10,40 C10,55 30,55 30,40", "M30,40 L30,65"]
  },
  {
    letter: "r", uppercase: "R", name: "e-rờ", nameEn: "er", ipa: "/z/ (Bắc), /ɹ/ (Nam)",
    exampleWord: "rồng", exampleMeaning: "con rồng", exampleMeaningEn: "dragon",
    strokeDescription: "Kéo nét sổ ngắn rồi viết nét cong nhỏ phía trên bên phải",
    strokeDescriptionEn: "Draw a short vertical then a small curve on upper right",
    strokeCount: 2,
    strokePaths: ["M12,25 L12,55", "M12,30 C12,22 25,22 25,30"]
  },
  {
    letter: "s", uppercase: "S", name: "ét-sì", nameEn: "es", ipa: "/s/ (Bắc), /ʂ/ (Nam)",
    exampleWord: "sách", exampleMeaning: "quyển sách", exampleMeaningEn: "book",
    strokeDescription: "Viết nét cong chữ S: cong phải phía trên, cong trái phía dưới",
    strokeDescriptionEn: "Write an S-curve: right curve on top, left curve on bottom",
    strokeCount: 1,
    strokePaths: ["M28,28 C28,20 12,20 12,32 C12,42 28,42 28,50 C28,58 12,58 12,52"]
  },
  {
    letter: "t", uppercase: "T", name: "tê", nameEn: "teh", ipa: "/t/",
    exampleWord: "tay", exampleMeaning: "bàn tay", exampleMeaningEn: "hand",
    strokeDescription: "Kéo nét sổ thẳng rồi gạch ngang qua phía trên",
    strokeDescriptionEn: "Draw a vertical stroke then a horizontal cross near the top",
    strokeCount: 2,
    strokePaths: ["M20,10 L20,55", "M10,25 L30,25"]
  },
  {
    letter: "u", uppercase: "U", name: "u", nameEn: "oo", ipa: "/u/",
    exampleWord: "uống", exampleMeaning: "uống nước", exampleMeaningEn: "drink",
    strokeDescription: "Viết nét cong chữ U rồi kéo nét sổ thẳng bên phải",
    strokeDescriptionEn: "Write a U-curve then a vertical stroke on the right",
    strokeCount: 2,
    strokePaths: ["M10,25 L10,45 C10,55 30,55 30,45", "M30,25 L30,55"]
  },
  {
    letter: "ư", uppercase: "Ư", name: "ư", nameEn: "uh-horn", ipa: "/ɨ/",
    exampleWord: "ước", exampleMeaning: "ước mơ", exampleMeaningEn: "dream/wish",
    strokeDescription: "Viết chữ 'u' rồi thêm dấu móc bên phải phía trên",
    strokeDescriptionEn: "Write 'u' then add a horn mark on upper right",
    strokeCount: 3,
    strokePaths: ["M10,25 L10,45 C10,55 30,55 30,45", "M30,25 L30,55", "M30,20 C33,15 36,17 34,23"]
  },
  {
    letter: "v", uppercase: "V", name: "vê", nameEn: "veh", ipa: "/v/",
    exampleWord: "vui", exampleMeaning: "vui vẻ", exampleMeaningEn: "happy",
    strokeDescription: "Viết 2 nét xiên: từ trên trái xuống giữa, rồi từ giữa lên trên phải",
    strokeDescriptionEn: "Write 2 diagonal strokes: top-left to center, center to top-right",
    strokeCount: 2,
    strokePaths: ["M8,25 L20,55", "M20,55 L32,25"]
  },
  {
    letter: "x", uppercase: "X", name: "ích-xì", nameEn: "eks", ipa: "/s/",
    exampleWord: "xanh", exampleMeaning: "màu xanh", exampleMeaningEn: "blue/green",
    strokeDescription: "Viết 2 nét xiên chéo nhau thành hình chữ X",
    strokeDescriptionEn: "Write 2 diagonal strokes crossing to form an X",
    strokeCount: 2,
    strokePaths: ["M10,25 L30,55", "M30,25 L10,55"]
  },
  {
    letter: "y", uppercase: "Y", name: "i dài", nameEn: "ee-long", ipa: "/i/",
    exampleWord: "yêu", exampleMeaning: "yêu thương", exampleMeaningEn: "love",
    strokeDescription: "Viết 2 nét xiên gặp nhau ở giữa, rồi kéo đuôi xuống dưới",
    strokeDescriptionEn: "Write 2 diagonals meeting in the middle, then tail down",
    strokeCount: 2,
    strokePaths: ["M10,25 L20,42", "M30,25 L20,42 L20,65"]
  },
];

export const vietnameseTones: ToneMark[] = [
  {
    name: "Thanh ngang (không dấu)", nameEn: "Level tone (no mark)",
    mark: "—", example: "ma", exampleMeaning: "ma (hồn ma)", exampleMeaningEn: "ghost",
    description: "Giọng bằng phẳng, cao vừa, giữ đều từ đầu đến cuối",
    descriptionEn: "Flat, mid-level pitch, held steady from start to end",
    pitchDirection: "flat"
  },
  {
    name: "Thanh sắc (´)", nameEn: "Rising tone (´)",
    mark: "´", example: "má", exampleMeaning: "má (mẹ)", exampleMeaningEn: "mother/cheek",
    description: "Giọng đi lên từ giữa lên cao, ngắn và dứt khoát",
    descriptionEn: "Voice rises from mid to high, short and decisive",
    pitchDirection: "rising"
  },
  {
    name: "Thanh huyền (`)", nameEn: "Falling tone (`)",
    mark: "`", example: "mà", exampleMeaning: "mà (liên từ)", exampleMeaningEn: "but/that",
    description: "Giọng đi xuống từ giữa xuống thấp, kéo dài nhẹ",
    descriptionEn: "Voice falls from mid to low, slightly prolonged",
    pitchDirection: "falling"
  },
  {
    name: "Thanh hỏi (ˀ)", nameEn: "Dipping-rising tone (ˀ)",
    mark: "ˀ", example: "mả", exampleMeaning: "mả (mộ)", exampleMeaningEn: "grave/tomb",
    description: "Giọng đi xuống rồi quay lên, tạo hình chữ V",
    descriptionEn: "Voice dips down then rises back up, forming a V-shape",
    pitchDirection: "dipping"
  },
  {
    name: "Thanh ngã (~)", nameEn: "Rising-broken tone (~)",
    mark: "~", example: "mã", exampleMeaning: "mã (ngựa, mã số)", exampleMeaningEn: "horse/code",
    description: "Giọng lên cao, ngắt giữa chừng (glottal stop) rồi lên tiếp",
    descriptionEn: "Voice rises, breaks mid-way (glottal stop), then rises again",
    pitchDirection: "rising-broken"
  },
  {
    name: "Thanh nặng (.)", nameEn: "Heavy-falling tone (.)",
    mark: ".", example: "mạ", exampleMeaning: "mạ (cây lúa non)", exampleMeaningEn: "rice seedling",
    description: "Giọng rơi xuống thấp, ngắn và nặng, kết thúc đột ngột",
    descriptionEn: "Voice drops low, short and heavy, ends abruptly",
    pitchDirection: "falling-heavy"
  },
];
