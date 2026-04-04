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
  // ── a ──
  {
    letter: "a", uppercase: "A", name: "a", nameEn: "ah", ipa: "/aː/",
    exampleWord: "ăn", exampleMeaning: "ăn (ăn cơm)", exampleMeaningEn: "eat",
    strokeDescription: "Viết nét cong tròn từ phải sang trái, rồi kéo nét sổ thẳng bên phải",
    strokeDescriptionEn: "Draw a round curve from right to left, then a vertical stroke on the right",
    strokeCount: 2,
    strokePaths: [
      "M18,24 C8,24 4,30 4,38 C4,46 8,52 18,52 C28,52 32,46 32,38 C32,30 28,24 18,24",  // symmetrical oval
      "M32,24 L32,52"  // short stem on right
    ]
  },
  // ── ă ──
  {
    letter: "ă", uppercase: "Ă", name: "á", nameEn: "ah-breve", ipa: "/a/",
    exampleWord: "ăn", exampleMeaning: "ăn", exampleMeaningEn: "eat",
    strokeDescription: "Viết chữ 'a' rồi thêm dấu trăng (˘) phía trên",
    strokeDescriptionEn: "Write 'a' then add a breve (˘) mark on top",
    strokeCount: 3,
    strokePaths: [
      "M18,24 C8,24 4,30 4,38 C4,46 8,52 18,52 C28,52 32,46 32,38 C32,30 28,24 18,24",
      "M32,24 L32,52",
      "M12,14 Q20,22 28,14"  // breve ˘ — concave down arc
    ]
  },
  // ── â ──
  {
    letter: "â", uppercase: "Â", name: "ớ", nameEn: "ah-circumflex", ipa: "/ə/",
    exampleWord: "ân", exampleMeaning: "ân huệ", exampleMeaningEn: "grace",
    strokeDescription: "Viết chữ 'a' rồi thêm dấu mũ (^) phía trên",
    strokeDescriptionEn: "Write 'a' then add a circumflex (^) on top",
    strokeCount: 3,
    strokePaths: [
      "M18,24 C8,24 4,30 4,38 C4,46 8,52 18,52 C28,52 32,46 32,38 C32,30 28,24 18,24",
      "M32,24 L32,52",
      "M12,16 L20,6 L28,16"  // circumflex (larger)
    ]
  },
  // ── b ──
  {
    letter: "b", uppercase: "B", name: "bê", nameEn: "beh", ipa: "/ɓ/",
    exampleWord: "bàn", exampleMeaning: "cái bàn", exampleMeaningEn: "table",
    strokeDescription: "Kéo nét sổ thẳng từ trên xuống, rồi viết nét cong bụng bên phải phía dưới",
    strokeDescriptionEn: "Draw a vertical line down, then a belly curve on the lower right",
    strokeCount: 2,
    strokePaths: [
      "M12,8 L12,52",                                      // tall stem
      "M12,28 C22,28 30,30 30,38 C30,48 22,52 12,52"       // bump on lower right
    ]
  },
  // ── c ──
  {
    letter: "c", uppercase: "C", name: "xê", nameEn: "seh", ipa: "/k/",
    exampleWord: "cá", exampleMeaning: "con cá", exampleMeaningEn: "fish",
    strokeDescription: "Viết một nét cong mở hình chữ C",
    strokeDescriptionEn: "Draw an open C-shaped curve",
    strokeCount: 1,
    strokePaths: [
      "M30,26 C22,20 12,22 12,36 C12,50 22,52 30,48"  // open C curve
    ]
  },
  // ── d ──
  {
    letter: "d", uppercase: "D", name: "dê", nameEn: "zeh", ipa: "/z/ (Bắc), /j/ (Nam)",
    exampleWord: "dễ", exampleMeaning: "dễ dàng", exampleMeaningEn: "easy",
    strokeDescription: "Viết nét cong tròn, rồi kéo nét sổ cao lên trên bên phải",
    strokeDescriptionEn: "Write a round curve, then a tall vertical stroke on the right",
    strokeCount: 2,
    strokePaths: [
      "M18,24 C8,24 4,30 4,38 C4,46 8,52 18,52 C28,52 32,46 32,38 C32,30 28,24 18,24",  // symmetrical oval
      "M32,8 L32,52"  // tall stem (ascender)
    ]
  },
  // ── đ ──
  {
    letter: "đ", uppercase: "Đ", name: "đê", nameEn: "deh", ipa: "/ɗ/",
    exampleWord: "đi", exampleMeaning: "đi bộ", exampleMeaningEn: "walk/go",
    strokeDescription: "Viết chữ 'd' rồi thêm nét gạch ngang qua thân chữ",
    strokeDescriptionEn: "Write 'd' then add a horizontal stroke through the stem",
    strokeCount: 3,
    strokePaths: [
      "M18,24 C8,24 4,30 4,38 C4,46 8,52 18,52 C28,52 32,46 32,38 C32,30 28,24 18,24",
      "M32,8 L32,52",
      "M24,18 L40,18"  // horizontal bar through ascender (longer, repositioned)
    ]
  },
  // ── e ──
  {
    letter: "e", uppercase: "E", name: "e", nameEn: "eh", ipa: "/ɛ/",
    exampleWord: "em", exampleMeaning: "em bé", exampleMeaningEn: "baby/younger sibling",
    strokeDescription: "Viết nét ngang ở giữa, cong lên trên rồi vòng xuống mở ra",
    strokeDescriptionEn: "Draw a horizontal mid-stroke, curve up then around and open at bottom",
    strokeCount: 1,
    strokePaths: [
      "M8,38 L30,38 C30,28 20,24 14,24 C8,24 4,30 4,38 C4,48 10,52 20,52 C26,52 30,50 30,46"  // e: horizontal bar, loop up-left, belly down-right, open tail
    ]
  },
  // ── ê ──
  {
    letter: "ê", uppercase: "Ê", name: "ê", nameEn: "eh-circumflex", ipa: "/e/",
    exampleWord: "mê", exampleMeaning: "mê mẩn", exampleMeaningEn: "fascinated",
    strokeDescription: "Viết chữ 'e' rồi thêm dấu mũ (^) phía trên",
    strokeDescriptionEn: "Write 'e' then add a circumflex (^) on top",
    strokeCount: 2,
    strokePaths: [
      "M8,38 L30,38 C30,28 20,24 14,24 C8,24 4,30 4,38 C4,48 10,52 20,52 C26,52 30,50 30,46",
      "M12,18 L20,8 L28,18"  // circumflex ^
    ]
  },
  // ── g ──
  {
    letter: "g", uppercase: "G", name: "giê", nameEn: "zheh", ipa: "/ɣ/",
    exampleWord: "gà", exampleMeaning: "con gà", exampleMeaningEn: "chicken",
    strokeDescription: "Viết nét cong tròn nhỏ rồi kéo đuôi xuống dưới, lượn móc và đá lên",
    strokeDescriptionEn: "Write a small round curve then sweep the tail down, hook and kick up",
    strokeCount: 2,
    strokePaths: [
      "M22,24 C14,24 10,28 10,34 C10,42 14,46 22,46 C28,46 32,42 32,34 C32,28 28,24 22,24",  // smaller oval (narrower, shorter)
      "M32,34 L32,56 C32,64 14,64 14,56 L18,50"  // descender: down, hook left, kick up
    ]
  },
  // ── h ──
  {
    letter: "h", uppercase: "H", name: "hát", nameEn: "haht", ipa: "/h/",
    exampleWord: "hoa", exampleMeaning: "bông hoa", exampleMeaningEn: "flower",
    strokeDescription: "Kéo nét sổ thẳng dài từ trên, rồi viết nét cong arch bên phải",
    strokeDescriptionEn: "Draw a tall vertical line, then an arch curving right and down",
    strokeCount: 2,
    strokePaths: [
      "M12,8 L12,52",                                        // tall stem
      "M12,30 C12,24 28,24 28,35 L28,52"                    // arch + down stroke
    ]
  },
  // ── i ──
  {
    letter: "i", uppercase: "I", name: "i", nameEn: "ee", ipa: "/i/",
    exampleWord: "im", exampleMeaning: "im lặng", exampleMeaningEn: "quiet/silent",
    strokeDescription: "Viết nét sổ thẳng ngắn rồi chấm dấu chấm phía trên",
    strokeDescriptionEn: "Write a short vertical stroke then add a dot on top",
    strokeCount: 2,
    strokePaths: [
      "M20,24 L20,52",   // short stem
      "M18,16 L22,16"    // dot (wider for visibility)
    ]
  },
  // ── k ──
  {
    letter: "k", uppercase: "K", name: "ca", nameEn: "kah", ipa: "/k/",
    exampleWord: "kẹo", exampleMeaning: "kẹo ngọt", exampleMeaningEn: "candy",
    strokeDescription: "Kéo nét sổ thẳng dài, rồi viết 2 nét xiên gặp ở giữa thân chữ",
    strokeDescriptionEn: "Draw a tall vertical line, then two diagonal strokes meeting at the stem",
    strokeCount: 3,
    strokePaths: [
      "M12,8 L12,52",     // tall stem
      "M28,24 L12,38",    // upper diagonal (in)
      "M12,38 L28,52"     // lower diagonal (out)
    ]
  },
  // ── l ──
  {
    letter: "l", uppercase: "L", name: "e-lờ", nameEn: "el", ipa: "/l/",
    exampleWord: "lá", exampleMeaning: "lá cây", exampleMeaningEn: "leaf",
    strokeDescription: "Kéo một nét sổ thẳng dài từ trên xuống",
    strokeDescriptionEn: "Draw one tall vertical stroke from top to bottom",
    strokeCount: 1,
    strokePaths: [
      "M20,8 L20,52"  // single tall stroke
    ]
  },
  // ── m ──
  {
    letter: "m", uppercase: "M", name: "em-mờ", nameEn: "em", ipa: "/m/",
    exampleWord: "mẹ", exampleMeaning: "mẹ", exampleMeaningEn: "mother",
    strokeDescription: "Kéo nét sổ, rồi viết 2 nét cong arch liên tiếp bên phải",
    strokeDescriptionEn: "Draw a vertical stroke, then two consecutive arches to the right",
    strokeCount: 3,
    strokePaths: [
      "M5,24 L5,52",                           // left stem
      "M5,30 C5,22 18,22 18,32 L18,52",        // first arch
      "M18,30 C18,22 32,22 32,32 L32,52"       // second arch
    ]
  },
  // ── n ──
  {
    letter: "n", uppercase: "N", name: "en-nờ", nameEn: "en", ipa: "/n/",
    exampleWord: "nước", exampleMeaning: "nước uống", exampleMeaningEn: "water",
    strokeDescription: "Kéo nét sổ rồi viết 1 nét cong arch bên phải",
    strokeDescriptionEn: "Draw a vertical stroke then one arch curving right and down",
    strokeCount: 2,
    strokePaths: [
      "M12,24 L12,52",                          // left stem
      "M12,30 C12,22 28,22 28,32 L28,52"        // arch
    ]
  },
  // ── o ──
  {
    letter: "o", uppercase: "O", name: "o", nameEn: "oh", ipa: "/ɔ/",
    exampleWord: "ong", exampleMeaning: "con ong", exampleMeaningEn: "bee",
    strokeDescription: "Viết một vòng tròn (oval) khép kín",
    strokeDescriptionEn: "Draw a closed oval",
    strokeCount: 1,
    strokePaths: [
      "M20,24 C10,24 4,30 4,38 C4,46 10,52 20,52 C30,52 36,46 36,38 C36,30 30,24 20,24"  // symmetrical oval
    ]
  },
  // ── ô ──
  {
    letter: "ô", uppercase: "Ô", name: "ô", nameEn: "oh-circumflex", ipa: "/o/",
    exampleWord: "ông", exampleMeaning: "ông nội", exampleMeaningEn: "grandfather",
    strokeDescription: "Viết chữ 'o' rồi thêm dấu mũ (^) phía trên",
    strokeDescriptionEn: "Write 'o' then add a circumflex (^) on top",
    strokeCount: 2,
    strokePaths: [
      "M20,24 C10,24 4,30 4,38 C4,46 10,52 20,52 C30,52 36,46 36,38 C36,30 30,24 20,24",
      "M12,16 L20,6 L28,16"  // circumflex (larger)
    ]
  },
  // ── ơ ──
  {
    letter: "ơ", uppercase: "Ơ", name: "ơ", nameEn: "uh", ipa: "/əː/",
    exampleWord: "ơi", exampleMeaning: "ơi! (gọi)", exampleMeaningEn: "hey! (calling)",
    strokeDescription: "Viết chữ 'o' rồi thêm dấu móc nhỏ phía trên bên phải",
    strokeDescriptionEn: "Write 'o' then add a small horn mark on upper right",
    strokeCount: 2,
    strokePaths: [
      "M20,24 C10,24 4,30 4,38 C4,46 10,52 20,52 C30,52 36,46 36,38 C36,30 30,24 20,24",
      "M34,26 L36,18 L38,24"  // horn — small tick attached to top-right of oval
    ]
  },
  // ── p ──
  {
    letter: "p", uppercase: "P", name: "pê", nameEn: "peh", ipa: "/p/",
    exampleWord: "pin", exampleMeaning: "cục pin", exampleMeaningEn: "battery",
    strokeDescription: "Kéo nét sổ dài xuống dưới đường kẻ, rồi viết nét cong bụng bên phải phía trên",
    strokeDescriptionEn: "Draw a long stem down below baseline, then a bump on the upper right",
    strokeCount: 2,
    strokePaths: [
      "M12,24 L12,65",                                       // stem going below baseline
      "M12,24 C22,24 30,26 30,36 C30,48 22,50 12,50"        // bump on right
    ]
  },
  // ── q ──
  {
    letter: "q", uppercase: "Q", name: "cu/quy", nameEn: "koo", ipa: "/k/",
    exampleWord: "quả", exampleMeaning: "quả bóng", exampleMeaningEn: "ball/fruit",
    strokeDescription: "Viết nét cong tròn rồi kéo đuôi xuống dưới bên phải",
    strokeDescriptionEn: "Write a round curve then extend tail down on the right",
    strokeCount: 2,
    strokePaths: [
      "M28,35 C28,24 12,24 12,35 C12,48 28,48 28,35",  // oval body
      "M28,35 L28,65"                                     // descender tail
    ]
  },
  // ── r ──
  {
    letter: "r", uppercase: "R", name: "e-rờ", nameEn: "er", ipa: "/z/ (Bắc), /ɹ/ (Nam)",
    exampleWord: "rồng", exampleMeaning: "con rồng", exampleMeaningEn: "dragon",
    strokeDescription: "Kéo nét sổ ngắn rồi viết nét cong nhỏ lên bên phải (shoulder)",
    strokeDescriptionEn: "Draw a short vertical then a small shoulder curve to the right",
    strokeCount: 2,
    strokePaths: [
      "M14,24 L14,52",                        // stem
      "M14,28 C14,22 26,22 26,28"             // shoulder curve
    ]
  },
  // ── s ──
  {
    letter: "s", uppercase: "S", name: "ét-sì", nameEn: "es", ipa: "/s/ (Bắc), /ʂ/ (Nam)",
    exampleWord: "sách", exampleMeaning: "quyển sách", exampleMeaningEn: "book",
    strokeDescription: "Viết nét cong hình chữ S: cong phải phía trên, cong trái phía dưới",
    strokeDescriptionEn: "Write an S-curve: right curve on top, left curve on bottom",
    strokeCount: 1,
    strokePaths: [
      "M26,26 C26,22 14,20 14,30 C14,38 26,38 26,46 C26,54 14,54 14,50"  // S shape
    ]
  },
  // ── t ──
  {
    letter: "t", uppercase: "T", name: "tê", nameEn: "teh", ipa: "/t/",
    exampleWord: "tay", exampleMeaning: "bàn tay", exampleMeaningEn: "hand",
    strokeDescription: "Kéo nét sổ thẳng từ trên x-height, rồi gạch ngang qua phần trên",
    strokeDescriptionEn: "Draw a vertical stroke, then a horizontal cross near the top",
    strokeCount: 2,
    strokePaths: [
      "M20,14 L20,52 C20,54 24,54 26,52",  // stem with slight tail
      "M12,24 L28,24"                         // crossbar
    ]
  },
  // ── u ──
  {
    letter: "u", uppercase: "U", name: "u", nameEn: "oo", ipa: "/u/",
    exampleWord: "uống", exampleMeaning: "uống nước", exampleMeaningEn: "drink",
    strokeDescription: "Viết nét cong chữ U rồi kéo nét sổ thẳng bên phải",
    strokeDescriptionEn: "Write a U-curve then a vertical stroke on the right",
    strokeCount: 2,
    strokePaths: [
      "M10,24 L10,42 C10,52 30,52 30,42",  // wider U shape
      "M30,24 L30,52"                        // right stem
    ]
  },
  // ── ư ──
  {
    letter: "ư", uppercase: "Ư", name: "ư", nameEn: "uh-horn", ipa: "/ɨ/",
    exampleWord: "ước", exampleMeaning: "ước mơ", exampleMeaningEn: "dream/wish",
    strokeDescription: "Viết chữ 'u' rồi thêm dấu móc bên phải phía trên",
    strokeDescriptionEn: "Write 'u' then add a horn mark on upper right",
    strokeCount: 3,
    strokePaths: [
      "M10,24 L10,42 C10,52 30,52 30,42",
      "M30,24 L30,52",
      "M30,20 C32,12 38,14 36,22"  // horn mark — inside viewBox
    ]
  },
  // ── v ──
  {
    letter: "v", uppercase: "V", name: "vê", nameEn: "veh", ipa: "/v/",
    exampleWord: "vui", exampleMeaning: "vui vẻ", exampleMeaningEn: "happy",
    strokeDescription: "Viết 2 nét xiên: từ trên trái xuống giữa dưới, rồi từ giữa lên trên phải",
    strokeDescriptionEn: "Write 2 diagonal strokes forming a V shape",
    strokeCount: 2,
    strokePaths: [
      "M8,24 L20,52",   // left diagonal down
      "M20,52 L32,24"   // right diagonal up
    ]
  },
  // ── x ──
  {
    letter: "x", uppercase: "X", name: "ích-xì", nameEn: "eks", ipa: "/s/",
    exampleWord: "xanh", exampleMeaning: "màu xanh", exampleMeaningEn: "blue/green",
    strokeDescription: "Viết 2 nét xiên chéo nhau thành hình chữ X",
    strokeDescriptionEn: "Write 2 diagonal strokes crossing to form an X",
    strokeCount: 2,
    strokePaths: [
      "M10,24 L30,52",  // top-left to bottom-right
      "M30,24 L10,52"   // top-right to bottom-left
    ]
  },
  // ── y ──
  {
    letter: "y", uppercase: "Y", name: "i dài", nameEn: "ee-long", ipa: "/i/",
    exampleWord: "yêu", exampleMeaning: "yêu thương", exampleMeaningEn: "love",
    strokeDescription: "Viết 2 nét xiên gặp nhau ở giữa, rồi kéo đuôi xuống dưới baseline",
    strokeDescriptionEn: "Write 2 diagonals meeting in the middle, then extend tail below baseline",
    strokeCount: 2,
    strokePaths: [
      "M8,24 L20,42",                          // left diagonal down to center
      "M32,24 L20,42 L14,65 C12,70 8,68 10,62"  // right diagonal + descender curve
    ]
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
