/**
 * @file chinesePronunciation.ts
 * @description Chinese (Mandarin) pinyin pronunciation curriculum - initials, finals,
 * tones, tone changes and the sound pairs Vietnamese learners confuse most.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

export interface SoundItem {
  /** Pinyin unit, e.g. "b", "zh", "ang" */
  sound: string;
  /** Rough Vietnamese-friendly description of how to say it */
  howVi: string;
  howEn: string;
  /** Example word */
  hanzi: string;
  pinyin: string;
  meaningVi: string;
  meaningEn: string;
}

export interface SoundGroup {
  titleVi: string;
  titleEn: string;
  noteVi?: string;
  noteEn?: string;
  items: SoundItem[];
}

export interface PronQuiz {
  /** Optional Chinese text to play as listening audio */
  audio?: string;
  promptVi: string;
  promptEn: string;
  options: string[];
  /** English labels when options are descriptive text rather than pinyin */
  optionsEn?: string[];
  answer: number;
  explainVi: string;
  explainEn: string;
}

export interface PronLesson {
  id: string;
  emoji: string;
  titleVi: string;
  titleEn: string;
  summaryVi: string;
  summaryEn: string;
  /** Long-read theory paragraphs (bilingual) */
  theoryVi: string[];
  theoryEn: string[];
  groups: SoundGroup[];
  tipVi: string;
  tipEn: string;
  quiz: PronQuiz[];
}

const s = (
  sound: string, howVi: string, howEn: string,
  hanzi: string, pinyin: string, meaningVi: string, meaningEn: string,
): SoundItem => ({ sound, howVi, howEn, hanzi, pinyin, meaningVi, meaningEn });

export const chinesePronunciationLessons: PronLesson[] = [
  // ------------------------------------------------------------- 1. Overview
  {
    id: "pinyin-basics",
    emoji: "🧩",
    titleVi: "Pinyin là gì - cấu trúc âm tiết",
    titleEn: "What is Pinyin - syllable structure",
    summaryVi: "Hiểu 3 thành phần của mọi âm tiết tiếng Trung: thanh mẫu, vận mẫu, thanh điệu.",
    summaryEn: "Understand the 3 parts of every Mandarin syllable: initial, final, tone.",
    theoryVi: [
      "Pinyin là hệ thống dùng chữ Latin để ghi cách đọc của chữ Hán. Pinyin không phải chữ viết chính thức của tiếng Trung, nhưng là công cụ bắt buộc để đọc đúng và để gõ chữ Hán trên máy tính, điện thoại.",
      "Mỗi âm tiết tiếng Trung gồm tối đa 3 phần: thanh mẫu (phụ âm đầu) + vận mẫu (phần nguyên âm và âm cuối) + thanh điệu (dấu ghi cao độ). Ví dụ: hǎo = h (thanh mẫu) + ao (vận mẫu) + thanh 3.",
      "Khác với tiếng Việt, tiếng Trung phổ thông chỉ có 4 thanh và 1 thanh nhẹ, không có các dấu ngã, dấu nặng. Bù lại, tiếng Trung có nhóm âm cuốn lưỡi zh ch sh r mà tiếng Việt không có, và đây là điểm người Việt cần luyện nhiều nhất.",
      "Một âm tiết có thể không có thanh mẫu (ài, ān, ér) nhưng bắt buộc phải có vận mẫu và thanh điệu. Vì vậy khi học từ mới, hãy luôn ghi nhớ đủ cả 3 phần, không chỉ ghi nhớ chữ Hán.",
    ],
    theoryEn: [
      "Pinyin is the Latin-alphabet system used to write the sound of Chinese characters. It is not the official script, but it is essential for reading correctly and for typing Chinese on a keyboard.",
      "Every Mandarin syllable has up to 3 parts: initial (starting consonant) + final (vowel plus ending) + tone. For example hǎo = h (initial) + ao (final) + tone 3.",
      "Unlike Vietnamese, standard Mandarin has only 4 tones plus a neutral tone. In exchange, it has the retroflex group zh ch sh r that Vietnamese does not have, and that is the hardest part for Vietnamese learners.",
      "A syllable can have no initial (ài, ān, ér) but it must have a final and a tone. So when you learn a new word, always store all 3 parts, not only the character.",
    ],
    groups: [
      {
        titleVi: "Ba phần của âm tiết",
        titleEn: "The three parts of a syllable",
        items: [
          s("h + ao + 3", "Thanh mẫu h, vận mẫu ao, thanh 3", "Initial h, final ao, tone 3", "好", "hǎo", "Tốt", "Good"),
          s("m + a + 1", "Thanh mẫu m, vận mẫu a, thanh 1", "Initial m, final a, tone 1", "妈", "mā", "Mẹ", "Mother"),
          s("zh + ong + 1", "Thanh mẫu zh, vận mẫu ong, thanh 1", "Initial zh, final ong, tone 1", "中", "zhōng", "Giữa, Trung", "Middle"),
          s("(không) + ai + 4", "Không có thanh mẫu, chỉ vận mẫu ai", "No initial, only the final ai", "爱", "ài", "Yêu", "Love"),
          s("x + ue + 2", "Thanh mẫu x, vận mẫu üe viết là ue", "Initial x, final üe written ue", "学", "xué", "Học", "Study"),
        ],
      },
    ],
    tipVi: "Mẹo vàng của thầy Hải: khi ghi từ mới vào sổ, hãy viết theo mẫu chữ Hán - pinyin có dấu - nghĩa. Thiếu dấu thanh là học sai ngay từ đầu.",
    tipEn: "Teacher Hai's tip: note new words as character - toned pinyin - meaning. Dropping the tone mark means learning it wrong from day one.",
    quiz: [
      { promptVi: "Âm tiết hǎo có thanh mẫu là gì?", promptEn: "What is the initial in hǎo?", options: ["h", "ao", "a", "none"], answer: 0, explainVi: "h là thanh mẫu, ao là vận mẫu.", explainEn: "h is the initial, ao is the final." },
      { promptVi: "Vận mẫu của zhōng là gì?", promptEn: "What is the final in zhōng?", options: ["zh", "ong", "o", "ng"], answer: 1, explainVi: "zh là thanh mẫu, ong là vận mẫu.", explainEn: "zh is the initial and ong is the final." },
      { promptVi: "Âm tiết nào KHÔNG có thanh mẫu?", promptEn: "Which syllable has NO initial?", options: ["mā", "ài", "hǎo", "xué"], answer: 1, explainVi: "ài chỉ gồm vận mẫu ai và thanh 4.", explainEn: "ài is just the final ai with tone 4." },
      { promptVi: "Tiếng phổ thông có bao nhiêu thanh điệu chính?", promptEn: "How many main tones does Mandarin have?", options: ["3", "4", "5", "6"], answer: 1, explainVi: "4 thanh chính, thêm thanh nhẹ không tính là thanh chính.", explainEn: "Four main tones, plus a neutral tone." },
      { promptVi: "Pinyin dùng để làm gì?", promptEn: "What is pinyin used for?", options: ["Thay chữ Hán trong văn bản", "Ghi cách đọc và gõ chữ Hán", "Chỉ dùng cho trẻ em", "Ghi nghĩa của từ"], optionsEn: ["Replacing characters in texts", "Recording pronunciation and typing characters", "Only for children", "Recording word meaning"], answer: 1, explainVi: "Pinyin ghi âm đọc và dùng để gõ chữ Hán.", explainEn: "Pinyin records pronunciation and is used for typing." },
      { promptVi: "Phần nào bắt buộc phải có trong mọi âm tiết?", promptEn: "Which part is compulsory in every syllable?", options: ["Initial / Thanh mẫu", "Final / Vận mẫu", "Ending -ng", "Retroflex"], optionsEn: ["Initial", "Final", "Ending -ng", "Retroflex"], answer: 1, explainVi: "Vận mẫu và thanh điệu là bắt buộc.", explainEn: "The final and the tone are compulsory." },
      { audio: "学", promptVi: "Nghe và chọn pinyin đúng", promptEn: "Listen and choose the right pinyin", options: ["xué", "shuō", "jué", "qiē"], answer: 0, explainVi: "学 xué nghĩa là học.", explainEn: "学 xué means to study." },
      { audio: "中", promptVi: "Nghe và chọn pinyin đúng", promptEn: "Listen and choose the right pinyin", options: ["zōng", "zhōng", "chōng", "jōng"], answer: 1, explainVi: "中 zhōng có âm cuốn lưỡi zh.", explainEn: "中 zhōng uses the retroflex zh." },
      { promptVi: "Nhóm âm nào tiếng Việt không có?", promptEn: "Which sound group does Vietnamese lack?", options: ["b p m f", "d t n l", "zh ch sh r", "g k h"], answer: 2, explainVi: "Nhóm cuốn lưỡi zh ch sh r là mới với người Việt.", explainEn: "The retroflex group zh ch sh r is new for Vietnamese speakers." },
      { promptVi: "üe trong xué được viết thành gì?", promptEn: "How is üe written in xué?", options: ["ue", "ve", "ie", "uo"], answer: 0, explainVi: "Sau j q x, ü viết thành u nên üe thành ue.", explainEn: "After j q x, ü is written u, so üe becomes ue." },
    ],
  },

  // ------------------------------------------------------------- 2. Initials
  {
    id: "initials",
    emoji: "🔤",
    titleVi: "21 thanh mẫu (phụ âm đầu)",
    titleEn: "The 21 initials",
    summaryVi: "Học theo 6 nhóm khẩu hình, kèm mẹo so sánh với tiếng Việt.",
    summaryEn: "Learn them in 6 articulation groups with Vietnamese comparisons.",
    theoryVi: [
      "Tiếng phổ thông có 21 thanh mẫu. Điều quan trọng nhất không phải học thuộc danh sách mà là học theo cặp bật hơi - không bật hơi: b/p, d/t, g/k, j/q, zh/ch, z/c. Trong mỗi cặp, âm thứ hai có luồng hơi mạnh bật ra.",
      "Cách kiểm tra tại nhà: đặt một tờ giấy mỏng trước miệng. Khi đọc p, t, k, q, ch, c tờ giấy phải rung mạnh; khi đọc b, d, g, j, zh, z tờ giấy gần như không động.",
      "Nhóm cuốn lưỡi zh ch sh r yêu cầu đầu lưỡi cong lên phía vòm miệng, còn nhóm z c s thì đầu lưỡi nằm sát chân răng trên. Người Việt thường đọc zh thành z và sh thành s, dẫn tới 是 shì và 四 sì nghe giống nhau.",
      "Nhóm j q x là âm mặt lưỡi, môi kéo ngang như đang cười, lưỡi áp vào vòm cứng. Đừng đọc j thành d và x thành s vì đây là lỗi rất dễ nhận ra.",
    ],
    theoryEn: [
      "Mandarin has 21 initials. The key is not memorising a list but learning the aspirated versus unaspirated pairs: b/p, d/t, g/k, j/q, zh/ch, z/c. In each pair the second sound sends out a strong puff of air.",
      "Home test: hold a thin sheet of paper in front of your mouth. Saying p, t, k, q, ch, c should move the paper clearly; b, d, g, j, zh, z should barely move it.",
      "The retroflex group zh ch sh r needs the tongue tip curled towards the roof of the mouth, while z c s keep the tongue tip near the upper teeth. Vietnamese learners often merge zh into z and sh into s, so 是 shì and 四 sì start to sound the same.",
      "The j q x group is palatal: lips spread as in a smile, tongue pressed against the hard palate. Do not turn j into d or x into s - these are very audible mistakes.",
    ],
    groups: [
      {
        titleVi: "Nhóm môi: b p m f",
        titleEn: "Labials: b p m f",
        noteVi: "p bật hơi mạnh, b không bật hơi.",
        noteEn: "p is aspirated, b is not.",
        items: [
          s("b", "Như b tiếng Việt, không bật hơi", "Like Vietnamese b, no air puff", "爸", "bà", "Bố", "Father"),
          s("p", "Như b nhưng bật hơi mạnh", "Like b with a strong puff", "怕", "pà", "Sợ", "Afraid"),
          s("m", "Như m tiếng Việt", "Like Vietnamese m", "妈", "mā", "Mẹ", "Mother"),
          s("f", "Như ph tiếng Việt", "Like English f", "饭", "fàn", "Cơm", "Rice, meal"),
        ],
      },
      {
        titleVi: "Nhóm đầu lưỡi: d t n l",
        titleEn: "Alveolars: d t n l",
        noteVi: "t bật hơi, d không. Chú ý phân biệt n và l.",
        noteEn: "t is aspirated, d is not. Watch the n/l contrast.",
        items: [
          s("d", "Như đ tiếng Việt", "Like Vietnamese đ", "大", "dà", "Lớn", "Big"),
          s("t", "Như t bật hơi mạnh", "Aspirated t", "他", "tā", "Anh ấy", "He"),
          s("n", "Như n tiếng Việt", "Like Vietnamese n", "你", "nǐ", "Bạn", "You"),
          s("l", "Như l tiếng Việt", "Like Vietnamese l", "来", "lái", "Đến", "Come"),
        ],
      },
      {
        titleVi: "Nhóm gốc lưỡi: g k h",
        titleEn: "Velars: g k h",
        noteVi: "k bật hơi mạnh, h ma sát ở gốc lưỡi.",
        noteEn: "k is aspirated, h is a back fricative.",
        items: [
          s("g", "Như c tiếng Việt, không bật hơi", "Like Vietnamese c, unaspirated", "哥", "gē", "Anh trai", "Elder brother"),
          s("k", "Như kh nhưng dứt khoát, bật hơi", "Aspirated k", "看", "kàn", "Xem, nhìn", "Look, watch"),
          s("h", "Như h tiếng Việt nhưng sâu hơn", "Like h but deeper in the throat", "喝", "hē", "Uống", "Drink"),
        ],
      },
      {
        titleVi: "Nhóm mặt lưỡi: j q x",
        titleEn: "Palatals: j q x",
        noteVi: "Môi kéo ngang, luôn đi với i hoặc ü.",
        noteEn: "Lips spread, always followed by i or ü.",
        items: [
          s("j", "Gần ch tiếng Việt nhưng nhẹ, môi ngang", "Soft, close to English j in jeep", "家", "jiā", "Nhà", "Home"),
          s("q", "Như j nhưng bật hơi mạnh", "Like j with a strong puff", "去", "qù", "Đi", "Go"),
          s("x", "Gần x tiếng Việt, hơi thoát mảnh", "Thin, hissing sh sound", "谢", "xiè", "Cảm ơn", "Thank"),
        ],
      },
      {
        titleVi: "Nhóm cuốn lưỡi: zh ch sh r",
        titleEn: "Retroflex: zh ch sh r",
        noteVi: "Đầu lưỡi cong lên vòm miệng, nhóm khó nhất với người Việt.",
        noteEn: "Curl the tongue tip up - the hardest group for Vietnamese learners.",
        items: [
          s("zh", "Cuốn lưỡi, không bật hơi", "Retroflex, unaspirated", "中", "zhōng", "Trung, giữa", "Middle"),
          s("ch", "Cuốn lưỡi, bật hơi mạnh", "Retroflex, aspirated", "吃", "chī", "Ăn", "Eat"),
          s("sh", "Cuốn lưỡi, ma sát như s nhưng dày", "Retroflex sh", "是", "shì", "Là", "To be"),
          s("r", "Cuốn lưỡi, rung nhẹ, gần r tiếng Anh", "Retroflex r, close to English r", "人", "rén", "Người", "Person"),
        ],
      },
      {
        titleVi: "Nhóm chân răng: z c s",
        titleEn: "Dentals: z c s",
        noteVi: "Đầu lưỡi sát chân răng trên, không cuốn lưỡi.",
        noteEn: "Tongue tip at the upper teeth, no curling.",
        items: [
          s("z", "Như d + z, không bật hơi", "Like ds in kids, unaspirated", "字", "zì", "Chữ", "Character"),
          s("c", "Như z nhưng bật hơi mạnh", "Like ts with a puff", "菜", "cài", "Món ăn", "Dish, vegetable"),
          s("s", "Như x tiếng Việt, gọn", "Like s in see", "四", "sì", "Bốn", "Four"),
        ],
      },
    ],
    tipVi: "Mẹo vàng của thầy Hải: luyện cặp đôi chứ đừng luyện lẻ. Đọc to 8 lần: bà - pà, dà - tà, gē - kē, jiā - qiā, zhī - chī, zì - cì.",
    tipEn: "Teacher Hai's tip: drill in pairs, never alone. Say aloud 8 times: bà - pà, dà - tà, gē - kē, jiā - qiā, zhī - chī, zì - cì.",
    quiz: [
      { promptVi: "Âm nào bật hơi?", promptEn: "Which sound is aspirated?", options: ["b", "d", "p", "g"], answer: 2, explainVi: "p bật hơi, b không bật hơi.", explainEn: "p is aspirated; b is not." },
      { promptVi: "Nhóm nào là âm cuốn lưỡi?", promptEn: "Which group is retroflex?", options: ["z c s", "zh ch sh r", "j q x", "b p m f"], answer: 1, explainVi: "zh ch sh r cần cuốn đầu lưỡi lên.", explainEn: "zh ch sh r need a curled tongue tip." },
      { audio: "是", promptVi: "Nghe và chọn pinyin đúng", promptEn: "Listen and choose the right pinyin", options: ["sì", "shì", "zhì", "cì"], answer: 1, explainVi: "是 shì dùng âm cuốn lưỡi sh.", explainEn: "是 shì uses retroflex sh." },
      { audio: "四", promptVi: "Nghe và chọn pinyin đúng", promptEn: "Listen and choose the right pinyin", options: ["shì", "sì", "xì", "zì"], answer: 1, explainVi: "四 sì dùng s chân răng, không cuốn lưỡi.", explainEn: "四 sì uses dental s, no curl." },
      { promptVi: "j q x luôn đi kèm với vận mẫu nào?", promptEn: "j q x are always followed by which vowels?", options: ["a hoặc o", "i hoặc ü", "u hoặc e", "er"], optionsEn: ["a or o", "i or ü", "u or e", "er"], answer: 1, explainVi: "j q x chỉ kết hợp với i và ü.", explainEn: "j q x only combine with i and ü." },
      { promptVi: "吃 chī khác 知 zhī ở điểm nào?", promptEn: "How does chī differ from zhī?", options: ["Thanh điệu", "Bật hơi", "Final / Vận mẫu", "Không khác gì"], optionsEn: ["The tone", "Aspiration", "Final", "No difference at all"], answer: 1, explainVi: "ch bật hơi, zh không bật hơi.", explainEn: "ch is aspirated, zh is not." },
      { promptVi: "Âm h tiếng Trung phát ra ở đâu?", promptEn: "Where is Mandarin h produced?", options: ["Môi", "Gốc lưỡi, sâu trong họng", "Chân răng", "Mũi"], optionsEn: ["Lips", "Back of the tongue, deep in the throat", "Dental (teeth ridge)", "Nose"], answer: 1, explainVi: "h là âm ma sát ở gốc lưỡi.", explainEn: "h is a velar fricative." },
      { promptVi: "Cặp nào KHÔNG phải cặp bật hơi - không bật hơi?", promptEn: "Which pair is NOT an aspiration pair?", options: ["b/p", "d/t", "m/f", "z/c"], answer: 2, explainVi: "m và f không tạo thành cặp bật hơi.", explainEn: "m and f are not an aspiration pair." },
      { audio: "人", promptVi: "Nghe và chọn pinyin đúng", promptEn: "Listen and choose the right pinyin", options: ["lén", "rén", "zén", "nén"], answer: 1, explainVi: "人 rén dùng r cuốn lưỡi.", explainEn: "人 rén uses retroflex r." },
      { promptVi: "Tiếng phổ thông có bao nhiêu thanh mẫu?", promptEn: "How many initials does Mandarin have?", options: ["18", "21", "23", "26"], answer: 1, explainVi: "Có 21 thanh mẫu.", explainEn: "There are 21 initials." },
      { promptVi: "Cách kiểm tra bật hơi tại nhà?", promptEn: "How can you test aspiration at home?", options: ["Soi gương", "Đặt tờ giấy trước miệng", "Bịt tai", "Nói thật to"], optionsEn: ["Look in a mirror", "Hold paper in front of your mouth", "Cover your ears", "Speaking very loudly"], answer: 1, explainVi: "Tờ giấy rung mạnh nghĩa là có bật hơi.", explainEn: "Strong paper movement means aspiration." },
    ],
  },

  // ------------------------------------------------------------- 3. Finals
  {
    id: "finals",
    emoji: "🎵",
    titleVi: "Vận mẫu: nguyên âm đơn, kép và âm mũi",
    titleEn: "Finals: simple, compound and nasal",
    summaryVi: "6 nguyên âm đơn, các nguyên âm kép và các vận mẫu có âm cuối -n, -ng.",
    summaryEn: "Six simple vowels, the compound vowels and the -n / -ng nasal finals.",
    theoryVi: [
      "Tiếng phổ thông có 6 nguyên âm đơn: a o e i u ü. Trong đó ü là âm hoàn toàn mới với người Việt: môi tròn như đọc u nhưng lưỡi ở vị trí đọc i.",
      "Nguyên âm kép đọc trượt liên tục từ âm trước sang âm sau, không tách rời: ai, ei, ao, ou, ia, ie, ua, uo, üe, iao, iou, uai, uei.",
      "Vận mẫu âm mũi chia hai họ: kết thúc bằng -n (an, en, in, un, ün) đầu lưỡi chạm chân răng, và kết thúc bằng -ng (ang, eng, ing, ong) gốc lưỡi nâng lên, hơi đi qua mũi. Đây là điểm người Việt hay nhầm vì tiếng Việt cũng có -n và -ng nhưng phân bố khác.",
      "Quy tắc viết cần nhớ: ü viết thành u sau j q x y (ju, qu, xu, yu); iou viết là iu, uei viết là ui, uen viết là un. Cách viết ngắn nhưng cách đọc vẫn đầy đủ.",
    ],
    theoryEn: [
      "Mandarin has 6 simple vowels: a o e i u ü. Of these, ü is brand new for Vietnamese learners: round the lips as for u but keep the tongue in the i position.",
      "Compound vowels glide smoothly from one sound to the next without a break: ai, ei, ao, ou, ia, ie, ua, uo, üe, iao, iou, uai, uei.",
      "Nasal finals form two families: those ending in -n (an, en, in, un, ün) touch the tongue tip to the teeth ridge, while those ending in -ng (ang, eng, ing, ong) raise the back of the tongue and send air through the nose.",
      "Spelling rules to remember: ü is written u after j q x y (ju, qu, xu, yu); iou is written iu, uei is written ui, uen is written un. The spelling is short but the pronunciation stays full.",
    ],
    groups: [
      {
        titleVi: "Nguyên âm đơn",
        titleEn: "Simple vowels",
        items: [
          s("a", "Mở miệng rộng như a tiếng Việt", "Open wide as in father", "八", "bā", "Tám", "Eight"),
          s("o", "Môi tròn, như o tiếng Việt", "Rounded o", "我", "wǒ", "Tôi", "I, me"),
          s("e", "Gần ơ tiếng Việt, không phải e", "Close to Vietnamese ơ, not e", "个", "gè", "Cái", "Item"),
          s("i", "Như i tiếng Việt, môi kéo ngang", "Like ee, lips spread", "一", "yī", "Một", "One"),
          s("u", "Môi tròn nhỏ, như u tiếng Việt", "Rounded oo", "五", "wǔ", "Năm", "Five"),
          s("ü", "Môi tròn như u, lưỡi như i", "Lips as u, tongue as i", "女", "nǚ", "Nữ, con gái", "Female"),
        ],
      },
      {
        titleVi: "Nguyên âm kép",
        titleEn: "Compound vowels",
        items: [
          s("ai", "Trượt từ a sang i", "Glide a to i", "爱", "ài", "Yêu", "Love"),
          s("ei", "Trượt từ ê sang i", "Glide e to i", "北", "běi", "Bắc", "North"),
          s("ao", "Trượt từ a sang o", "Glide a to o", "好", "hǎo", "Tốt", "Good"),
          s("ou", "Trượt từ ô sang u", "Glide o to u", "都", "dōu", "Đều", "All"),
          s("ie", "Trượt từ i sang ê", "Glide i to e", "谢", "xiè", "Cảm ơn", "Thank"),
          s("uo", "Trượt từ u sang o", "Glide u to o", "说", "shuō", "Nói", "Speak"),
          s("üe", "Trượt từ ü sang ê", "Glide ü to e", "学", "xué", "Học", "Study"),
          s("iao", "Ba âm i-a-o liền mạch", "i-a-o in one glide", "小", "xiǎo", "Nhỏ", "Small"),
        ],
      },
      {
        titleVi: "Vận mẫu âm mũi -n",
        titleEn: "Nasal finals with -n",
        noteVi: "Đầu lưỡi chạm chân răng trên khi kết thúc.",
        noteEn: "End with the tongue tip on the teeth ridge.",
        items: [
          s("an", "a rồi đóng bằng n", "a then close with n", "看", "kàn", "Xem", "Look"),
          s("en", "ơ rồi đóng bằng n", "e then close with n", "很", "hěn", "Rất", "Very"),
          s("in", "i rồi đóng bằng n", "i then close with n", "今", "jīn", "Nay", "Present, now"),
          s("un", "u-ơ-n, viết ngắn là un", "u-e-n written un", "问", "wèn", "Hỏi", "Ask"),
          s("ün", "ü rồi đóng bằng n", "ü then close with n", "军", "jūn", "Quân", "Army"),
        ],
      },
      {
        titleVi: "Vận mẫu âm mũi -ng",
        titleEn: "Nasal finals with -ng",
        noteVi: "Gốc lưỡi nâng lên, hơi đi qua mũi, kéo dài hơn -n.",
        noteEn: "Raise the tongue back, air through the nose, longer than -n.",
        items: [
          s("ang", "a rồi đóng bằng ng", "a then close with ng", "忙", "máng", "Bận", "Busy"),
          s("eng", "ơ rồi đóng bằng ng", "e then close with ng", "冷", "lěng", "Lạnh", "Cold"),
          s("ing", "i rồi đóng bằng ng", "i then close with ng", "请", "qǐng", "Mời, xin", "Please"),
          s("ong", "ô rồi đóng bằng ng", "o then close with ng", "红", "hóng", "Đỏ", "Red"),
          s("iang", "i-a-ng liền mạch", "i-a-ng in one glide", "想", "xiǎng", "Muốn, nghĩ", "Want, think"),
        ],
      },
    ],
    tipVi: "Mẹo vàng của thầy Hải: luyện ü bằng cách đọc i rồi từ từ tròn môi mà không đổi vị trí lưỡi. Sau đó đọc cặp nǔ - nǚ, lǔ - lǜ để nghe rõ khác biệt.",
    tipEn: "Teacher Hai's tip: to master ü, say i and slowly round your lips without moving the tongue. Then drill nǔ - nǚ and lǔ - lǜ.",
    quiz: [
      { promptVi: "Tiếng phổ thông có bao nhiêu nguyên âm đơn?", promptEn: "How many simple vowels does Mandarin have?", options: ["5", "6", "7", "8"], answer: 1, explainVi: "a o e i u ü - tổng cộng 6.", explainEn: "a o e i u ü - six in total." },
      { promptVi: "Âm ü được đọc thế nào?", promptEn: "How is ü pronounced?", options: ["Như u tiếng Việt", "Môi tròn như u, lưỡi như i", "Như i tiếng Việt", "Như ơ"], optionsEn: ["Like Vietnamese u", "Lips as u, tongue as i", "Like Vietnamese i", "Like Vietnamese ơ"], answer: 1, explainVi: "Môi tròn của u kết hợp vị trí lưỡi của i.", explainEn: "Rounded lips of u with the tongue of i." },
      { promptVi: "uei được viết ngắn thành gì?", promptEn: "How is uei written in short?", options: ["ui", "ue", "wi", "uy"], answer: 0, explainVi: "uei viết thành ui, ví dụ huì.", explainEn: "uei is written ui, e.g. huì." },
      { promptVi: "iou được viết ngắn thành gì?", promptEn: "How is iou written in short?", options: ["io", "iu", "yo", "ou"], answer: 1, explainVi: "iou viết thành iu, ví dụ liù.", explainEn: "iou is written iu, e.g. liù." },
      { audio: "红", promptVi: "Nghe và chọn vận mẫu đúng", promptEn: "Listen and choose the right final", options: ["-en", "-ong", "-an", "-ang"], answer: 1, explainVi: "红 hóng có vận mẫu ong.", explainEn: "红 hóng has the final ong." },
      { audio: "很", promptVi: "Nghe và chọn vận mẫu đúng", promptEn: "Listen and choose the right final", options: ["-en", "-eng", "-an", "-in"], answer: 0, explainVi: "很 hěn kết thúc bằng -n.", explainEn: "很 hěn ends with -n." },
      { promptVi: "Chữ e trong 个 gè gần âm nào của tiếng Việt?", promptEn: "The e in gè is closest to which Vietnamese sound?", options: ["e", "ơ", "a", "i"], answer: 1, explainVi: "e tiếng Trung gần ơ hơn là e.", explainEn: "Mandarin e is closer to ơ than to e." },
      { promptVi: "Sau j q x, ü được viết thành gì?", promptEn: "After j q x, ü is written as?", options: ["v", "u", "yu", "iu"], answer: 1, explainVi: "ju, qu, xu vẫn đọc là jü, qü, xü.", explainEn: "ju, qu, xu are still read jü, qü, xü." },
      { audio: "忙", promptVi: "Nghe và chọn pinyin đúng", promptEn: "Listen and choose the right pinyin", options: ["mán", "máng", "mèng", "màn"], answer: 1, explainVi: "忙 máng kết thúc bằng -ng.", explainEn: "忙 máng ends with -ng." },
      { promptVi: "Nguyên âm kép cần đọc thế nào?", promptEn: "How should compound vowels be read?", options: ["Tách rời từng âm", "Trượt liền mạch", "Chỉ đọc âm đầu", "Chỉ đọc âm cuối"], optionsEn: ["Separate each sound", "Glide smoothly", "Only say the first sound", "Only say the last sound"], answer: 1, explainVi: "Phải trượt liên tục, không ngắt.", explainEn: "Glide continuously without a break." },
    ],
  },

  // ------------------------------------------------------------- 4. Tones
  {
    id: "tones",
    emoji: "📈",
    titleVi: "Bốn thanh điệu và thanh nhẹ",
    titleEn: "The four tones and the neutral tone",
    summaryVi: "Đường cao độ của từng thanh, cặp mā má mǎ mà và cách đọc thanh nhẹ.",
    summaryEn: "Pitch contour of each tone, the mā má mǎ mà set, and the neutral tone.",
    theoryVi: [
      "Thanh 1 (ā) cao và bằng, giữ đều như tiếng máy đo nhịp tim. Thanh 2 (á) đi lên như đang hỏi lại Hả? Thanh 3 (ǎ) xuống rồi lên, thấp nhất trong 4 thanh. Thanh 4 (à) đổ xuống dứt khoát như ra lệnh.",
      "Thanh điệu làm đổi hoàn toàn nghĩa của từ. Ví dụ kinh điển: mā 妈 mẹ, má 麻 gai dầu, mǎ 马 ngựa, mà 骂 mắng. Đọc sai thanh không phải sai nhỏ mà là nói sang từ khác.",
      "Thanh nhẹ không có dấu, đọc ngắn và yếu, thường xuất hiện ở trợ từ và âm tiết lặp: 妈妈 māma, 吗 ma, 的 de, 了 le. Thanh nhẹ luôn phụ thuộc vào cao độ của âm tiết đứng trước.",
      "Cách ghi dấu: dấu đặt trên nguyên âm chính. Ưu tiên a, sau đó o, e, rồi i, u, ü. Nếu có iu thì dấu đặt trên u (liù), nếu có ui thì dấu đặt trên i (huì).",
    ],
    theoryEn: [
      "Tone 1 (ā) is high and flat, held steady like a heart monitor. Tone 2 (á) rises like a surprised 'Huh?'. Tone 3 (ǎ) dips down then rises and is the lowest of the four. Tone 4 (à) falls sharply like a command.",
      "Tones change meaning completely. The classic set: mā 妈 mother, má 麻 hemp, mǎ 马 horse, mà 骂 to scold. A wrong tone is not a small slip - it is a different word.",
      "The neutral tone carries no mark and is short and weak, usually on particles and repeated syllables: 妈妈 māma, 吗 ma, 的 de, 了 le. Its pitch depends on the syllable before it.",
      "Tone-mark placement: put the mark on the main vowel, priority a, then o, e, then i, u, ü. With iu the mark goes on u (liù); with ui it goes on i (huì).",
    ],
    groups: [
      {
        titleVi: "Bộ mā má mǎ mà",
        titleEn: "The mā má mǎ mà set",
        noteVi: "Nghe lần lượt 4 thanh trên cùng một âm tiết.",
        noteEn: "Listen to all four tones on the same syllable.",
        items: [
          s("Thanh 1 ā", "Cao, bằng, giữ đều", "High and level", "妈", "mā", "Mẹ", "Mother"),
          s("Thanh 2 á", "Đi lên từ trung sang cao", "Rising from mid to high", "麻", "má", "Gai dầu, tê", "Hemp, numb"),
          s("Thanh 3 ǎ", "Xuống thấp rồi lên", "Dips then rises", "马", "mǎ", "Ngựa", "Horse"),
          s("Thanh 4 à", "Đổ xuống dứt khoát", "Sharp fall", "骂", "mà", "Mắng", "Scold"),
        ],
      },
      {
        titleVi: "Cặp từ dễ nhầm vì thanh",
        titleEn: "Word pairs confused by tone",
        items: [
          s("mǎi / mài", "Thanh 3 và thanh 4", "Tone 3 vs tone 4", "买 / 卖", "mǎi / mài", "Mua / Bán", "Buy / Sell"),
          s("shuǐ / shuì", "Thanh 3 và thanh 4", "Tone 3 vs tone 4", "水 / 睡", "shuǐ / shuì", "Nước / Ngủ", "Water / Sleep"),
          s("wèn / wén", "Thanh 4 và thanh 2", "Tone 4 vs tone 2", "问 / 文", "wèn / wén", "Hỏi / Văn", "Ask / Text"),
          s("shí / shì", "Thanh 2 và thanh 4", "Tone 2 vs tone 4", "十 / 是", "shí / shì", "Mười / Là", "Ten / To be"),
        ],
      },
      {
        titleVi: "Thanh nhẹ",
        titleEn: "Neutral tone",
        noteVi: "Đọc ngắn, nhẹ, không nhấn.",
        noteEn: "Short, weak, unstressed.",
        items: [
          s("ma", "Trợ từ nghi vấn, đọc rất nhẹ", "Question particle, very light", "吗", "ma", "Trợ từ hỏi", "Question particle"),
          s("de", "Trợ từ sở hữu", "Possessive particle", "的", "de", "Của", "Of"),
          s("le", "Trợ từ hoàn thành", "Completion particle", "了", "le", "Rồi", "Already"),
          s("māma", "Âm tiết 2 đọc nhẹ", "Second syllable is light", "妈妈", "māma", "Mẹ", "Mum"),
        ],
      },
    ],
    tipVi: "Mẹo vàng của thầy Hải: dùng bàn tay vẽ đường thanh trong không khí khi đọc. Thanh 3 phải kéo dài hơn bạn nghĩ, đừng biến nó thành thanh 4.",
    tipEn: "Teacher Hai's tip: trace the pitch contour with your hand while speaking. Tone 3 lasts longer than you expect - do not turn it into tone 4.",
    quiz: [
      { promptVi: "Thanh nào cao và bằng?", promptEn: "Which tone is high and level?", options: ["Tone 1 / Thanh 1", "Tone 2 / Thanh 2", "Tone 3 / Thanh 3", "Tone 4 / Thanh 4"], optionsEn: ["Tone 1", "Tone 2", "Tone 3", "Tone 4"], answer: 0, explainVi: "Thanh 1 giữ cao độ đều.", explainEn: "Tone 1 stays level and high." },
      { promptVi: "Thanh nào xuống rồi lên?", promptEn: "Which tone dips then rises?", options: ["Tone 1 / Thanh 1", "Tone 2 / Thanh 2", "Tone 3 / Thanh 3", "Tone 4 / Thanh 4"], optionsEn: ["Tone 1", "Tone 2", "Tone 3", "Tone 4"], answer: 2, explainVi: "Thanh 3 có đường cong xuống rồi lên.", explainEn: "Tone 3 falls then rises." },
      { audio: "马", promptVi: "Nghe và chọn thanh điệu", promptEn: "Listen and choose the tone", options: ["Tone 1 / Thanh 1", "Tone 2 / Thanh 2", "Tone 3 / Thanh 3", "Tone 4 / Thanh 4"], optionsEn: ["Tone 1", "Tone 2", "Tone 3", "Tone 4"], answer: 2, explainVi: "马 mǎ là thanh 3.", explainEn: "马 mǎ is tone 3." },
      { audio: "骂", promptVi: "Nghe và chọn thanh điệu", promptEn: "Listen and choose the tone", options: ["Tone 1 / Thanh 1", "Tone 2 / Thanh 2", "Tone 3 / Thanh 3", "Tone 4 / Thanh 4"], optionsEn: ["Tone 1", "Tone 2", "Tone 3", "Tone 4"], answer: 3, explainVi: "骂 mà là thanh 4, đổ xuống.", explainEn: "骂 mà is tone 4, falling." },
      { promptVi: "买 mǎi nghĩa là gì?", promptEn: "What does 买 mǎi mean?", options: ["Bán", "Mua", "Ngủ", "Hỏi"], optionsEn: ["Sell", "Buy", "Sleep", "Ask"], answer: 1, explainVi: "mǎi là mua, mài là bán.", explainEn: "mǎi is buy, mài is sell." },
      { promptVi: "Với vận mẫu iu, dấu thanh đặt ở đâu?", promptEn: "In iu, where does the tone mark go?", options: ["Trên i", "Trên u", "Trên cả hai", "Không ghi dấu"], optionsEn: ["On the i", "On the u", "On both", "No mark at all"], answer: 1, explainVi: "iu ghi dấu trên u: liù.", explainEn: "iu takes the mark on u: liù." },
      { promptVi: "Với vận mẫu ui, dấu thanh đặt ở đâu?", promptEn: "In ui, where does the tone mark go?", options: ["Trên u", "Trên i", "Trên cả hai", "Không ghi dấu"], optionsEn: ["On the u", "On the i", "On both", "No mark at all"], answer: 1, explainVi: "ui ghi dấu trên i: huì.", explainEn: "ui takes the mark on i: huì." },
      { promptVi: "Âm tiết thứ hai của 妈妈 đọc thế nào?", promptEn: "How is the second syllable of 妈妈 read?", options: ["Tone 1 / Thanh 1", "Tone 4 / Thanh 4", "Neutral / Thanh nhẹ", "Tone 2 / Thanh 2"], optionsEn: ["Tone 1", "Tone 4", "Neutral tone", "Tone 2"], answer: 2, explainVi: "māma - âm tiết 2 là thanh nhẹ.", explainEn: "māma - the second syllable is neutral." },
      { audio: "十", promptVi: "Nghe và chọn pinyin đúng", promptEn: "Listen and choose the right pinyin", options: ["shì", "shí", "shǐ", "shī"], answer: 1, explainVi: "十 shí là mười, thanh 2.", explainEn: "十 shí means ten, tone 2." },
      { promptVi: "Nguyên âm nào được ưu tiên ghi dấu nhất?", promptEn: "Which vowel has top priority for the tone mark?", options: ["a", "o", "i", "u"], answer: 0, explainVi: "Thứ tự ưu tiên: a > o > e > i, u, ü.", explainEn: "Priority: a > o > e > i, u, ü." },
    ],
  },

  // ------------------------------------------------------------- 5. Tone change
  {
    id: "tone-change",
    emoji: "🔁",
    titleVi: "Biến điệu: 不, 一, hai thanh 3 liền nhau",
    titleEn: "Tone changes: 不, 一, and two tone-3 syllables",
    summaryVi: "Các quy tắc đổi thanh khi nói nhanh mà sách vở vẫn ghi thanh gốc.",
    summaryEn: "The tone-sandhi rules used in speech even though books print the original tone.",
    theoryVi: [
      "Quy tắc hai thanh 3: khi hai âm tiết thanh 3 đứng liền nhau, âm tiết đầu đọc thành thanh 2. 你好 viết nǐ hǎo nhưng đọc ní hǎo. 很好 hěn hǎo đọc hén hǎo.",
      "Quy tắc 不 bù: bình thường là thanh 4, nhưng khi đứng trước một âm tiết thanh 4 thì đổi thành thanh 2. 不是 đọc bú shì, 不去 đọc bú qù, còn 不好 vẫn là bù hǎo.",
      "Quy tắc 一 yī: đứng riêng hoặc đếm số thì là thanh 1; trước thanh 1, 2, 3 đổi thành thanh 4 (yì tiān, yì nián, yì bǎ); trước thanh 4 đổi thành thanh 2 (yí gè, yí cì).",
      "Ngoài ra, khi ba âm tiết thanh 3 liền nhau, cách chia nhóm phụ thuộc nghĩa: 我很好 thường đọc wó hén hǎo. Đây là điểm nghe rất rõ ở người bản xứ và giúp bạn nói tự nhiên hơn.",
    ],
    theoryEn: [
      "Two tone-3 rule: when two tone-3 syllables meet, the first becomes tone 2. 你好 is written nǐ hǎo but said ní hǎo. 很好 hěn hǎo is said hén hǎo.",
      "The 不 bù rule: normally tone 4, but before another tone-4 syllable it becomes tone 2. 不是 is bú shì, 不去 is bú qù, while 不好 stays bù hǎo.",
      "The 一 yī rule: tone 1 alone or when counting; tone 4 before tones 1, 2, 3 (yì tiān, yì nián, yì bǎ); tone 2 before tone 4 (yí gè, yí cì).",
      "With three tone-3 syllables in a row, grouping follows meaning: 我很好 is usually said wó hén hǎo. Native speakers do this consistently and copying it makes you sound far more natural.",
    ],
    groups: [
      {
        titleVi: "Hai thanh 3 liền nhau",
        titleEn: "Two tone-3 syllables",
        items: [
          s("nǐ hǎo → ní hǎo", "Âm đầu đổi sang thanh 2", "First syllable becomes tone 2", "你好", "nǐ hǎo", "Xin chào", "Hello"),
          s("hěn hǎo → hén hǎo", "Âm đầu đổi sang thanh 2", "First becomes tone 2", "很好", "hěn hǎo", "Rất tốt", "Very good"),
          s("shuǐ guǒ → shuí guǒ", "Âm đầu đổi sang thanh 2", "First becomes tone 2", "水果", "shuǐ guǒ", "Trái cây", "Fruit"),
        ],
      },
      {
        titleVi: "Biến điệu của 不",
        titleEn: "Tone change of 不",
        items: [
          s("bù + thanh 4 → bú", "不是 đọc bú shì", "不是 is said bú shì", "不是", "bú shì", "Không phải", "Is not"),
          s("bù + thanh 4 → bú", "不去 đọc bú qù", "不去 is said bú qù", "不去", "bú qù", "Không đi", "Not go"),
          s("bù giữ thanh 4", "不好 vẫn là bù hǎo", "不好 stays bù hǎo", "不好", "bù hǎo", "Không tốt", "Not good"),
        ],
      },
      {
        titleVi: "Biến điệu của 一",
        titleEn: "Tone change of 一",
        items: [
          s("yī + thanh 4 → yí", "一个 đọc yí gè", "一个 is said yí gè", "一个", "yí gè", "Một cái", "One item"),
          s("yī + thanh 1 → yì", "一天 đọc yì tiān", "一天 is said yì tiān", "一天", "yì tiān", "Một ngày", "One day"),
          s("yī + thanh 2 → yì", "一年 đọc yì nián", "一年 is said yì nián", "一年", "yì nián", "Một năm", "One year"),
          s("yī giữ thanh 1", "Khi đếm: yī, èr, sān", "When counting: yī, èr, sān", "一", "yī", "Một", "One"),
        ],
      },
    ],
    tipVi: "Mẹo vàng của thầy Hải: học biến điệu theo cụm cố định, đừng học theo quy tắc khô. Nhớ nguyên cụm ní hǎo, bú shì, yí gè là bạn đã dùng đúng 80% trường hợp.",
    tipEn: "Teacher Hai's tip: learn sandhi as fixed chunks, not dry rules. Memorise ní hǎo, bú shì, yí gè and you already cover 80 percent of cases.",
    quiz: [
      { promptVi: "你好 được đọc thực tế thành gì?", promptEn: "How is 你好 actually said?", options: ["nǐ hǎo", "ní hǎo", "nì hǎo", "nī hǎo"], answer: 1, explainVi: "Hai thanh 3 liền nhau, âm đầu đổi sang thanh 2.", explainEn: "Two tone 3 in a row, the first becomes tone 2." },
      { promptVi: "不是 đọc thế nào?", promptEn: "How is 不是 said?", options: ["bù shì", "bú shì", "bǔ shì", "bū shì"], answer: 1, explainVi: "不 trước thanh 4 đổi thành thanh 2.", explainEn: "不 before tone 4 becomes tone 2." },
      { promptVi: "不好 đọc thế nào?", promptEn: "How is 不好 said?", options: ["bú hǎo", "bù hǎo", "bǔ hǎo", "bū hǎo"], answer: 1, explainVi: "好 là thanh 3 nên 不 giữ thanh 4.", explainEn: "好 is tone 3, so 不 keeps tone 4." },
      { promptVi: "一个 đọc thế nào?", promptEn: "How is 一个 said?", options: ["yī gè", "yí gè", "yì gè", "yǐ gè"], answer: 1, explainVi: "一 trước thanh 4 đổi thành thanh 2.", explainEn: "一 before tone 4 becomes tone 2." },
      { promptVi: "一天 đọc thế nào?", promptEn: "How is 一天 said?", options: ["yī tiān", "yí tiān", "yì tiān", "yǐ tiān"], answer: 2, explainVi: "一 trước thanh 1 đổi thành thanh 4.", explainEn: "一 before tone 1 becomes tone 4." },
      { promptVi: "很好 khi nói nhanh nghe thành gì?", promptEn: "How does 很好 sound in fast speech?", options: ["hěn hǎo", "hén hǎo", "hèn hǎo", "hēn hǎo"], answer: 1, explainVi: "hěn đổi sang thanh 2.", explainEn: "hěn shifts to tone 2." },
      { audio: "水果", promptVi: "Nghe cụm này và chọn cách đọc thực tế", promptEn: "Listen and choose the real pronunciation", options: ["shuǐ guǒ", "shuí guǒ", "shuì guǒ", "shuī guǒ"], answer: 1, explainVi: "Âm đầu đổi sang thanh 2.", explainEn: "The first syllable shifts to tone 2." },
      { promptVi: "Khi đếm số, 一 đọc thanh mấy?", promptEn: "When counting, which tone is 一?", options: ["Tone 1 / Thanh 1", "Tone 2 / Thanh 2", "Tone 3 / Thanh 3", "Tone 4 / Thanh 4"], optionsEn: ["Tone 1", "Tone 2", "Tone 3", "Tone 4"], answer: 0, explainVi: "Đếm yī, èr, sān thì 一 là thanh 1.", explainEn: "Counting yī, èr, sān keeps tone 1." },
      { promptVi: "一次 đọc thế nào?", promptEn: "How is 一次 said?", options: ["yī cì", "yí cì", "yì cì", "yǐ cì"], answer: 1, explainVi: "次 là thanh 4 nên 一 đổi thành thanh 2.", explainEn: "次 is tone 4, so 一 becomes tone 2." },
      { promptVi: "Sách vở ghi thanh nào?", promptEn: "Which tone do textbooks print?", options: ["Thanh sau biến điệu", "Thanh gốc", "Không ghi thanh", "Tùy sách"], optionsEn: ["The tone after sandhi", "The original tone", "No tone at all", "Depends on the book"], answer: 1, explainVi: "Sách ghi thanh gốc, người nói tự biến điệu.", explainEn: "Books print the original tone; speakers apply sandhi." },
    ],
  },

  // ------------------------------------------------------------- 6. Vietnamese traps
  {
    id: "vietnamese-traps",
    emoji: "⚠️",
    titleVi: "Cặp âm người Việt hay sai",
    titleEn: "Sound pairs Vietnamese learners get wrong",
    summaryVi: "zh-z, ch-c, sh-s, j-z, x-s, n-l, ü-u và -n so với -ng.",
    summaryEn: "zh-z, ch-c, sh-s, j-z, x-s, n-l, ü-u and -n versus -ng.",
    theoryVi: [
      "Lỗi số một là mất phân biệt cuốn lưỡi. Người Việt thường đọc zh thành z, ch thành c, sh thành s. Kết quả là 是 shì (là) và 四 sì (bốn) nghe giống nhau, câu 我是四十 trở nên khó hiểu.",
      "Lỗi thứ hai là nhầm j với z và x với s. j q x là âm mặt lưỡi, môi kéo ngang; z c s là âm chân răng. Đọc 谢谢 xièxie thành siè sie là dấu hiệu rõ nhất của người mới học.",
      "Lỗi thứ ba là ü đọc thành u. 女 nǚ (nữ) đọc thành nǔ sẽ không ai hiểu. Hãy luôn kiểm tra bằng cặp lǜ 绿 (xanh) và lù 路 (đường).",
      "Lỗi thứ tư là âm cuối -n và -ng. Trong tiếng Trung, -n đóng bằng đầu lưỡi và ngắn; -ng để hơi qua mũi và dài hơn. Cặp cần luyện: chén 陈 và chéng 成, xīn 新 và xīng 星.",
    ],
    theoryEn: [
      "Mistake one is losing the retroflex contrast. Vietnamese learners turn zh into z, ch into c, sh into s. Then 是 shì (to be) and 四 sì (four) sound identical and 我是四十 becomes confusing.",
      "Mistake two is mixing j with z and x with s. j q x are palatal with spread lips; z c s are dental. Saying 谢谢 xièxie as siè sie is the clearest beginner marker.",
      "Mistake three is reading ü as u. 女 nǚ said as nǔ will not be understood. Always self-check with lǜ 绿 (green) versus lù 路 (road).",
      "Mistake four is the -n versus -ng ending. In Mandarin, -n closes with the tongue tip and stays short; -ng sends air through the nose and lasts longer. Drill chén 陈 versus chéng 成, xīn 新 versus xīng 星.",
    ],
    groups: [
      {
        titleVi: "Cuốn lưỡi so với chân răng",
        titleEn: "Retroflex versus dental",
        items: [
          s("zh / z", "是 shì so với 四 sì", "是 shì versus 四 sì", "知 / 资", "zhī / zī", "Biết / Vốn", "Know / Capital"),
          s("ch / c", "吃 chī so với 词 cí", "吃 chī versus 词 cí", "吃 / 词", "chī / cí", "Ăn / Từ", "Eat / Word"),
          s("sh / s", "山 shān so với 三 sān", "山 shān versus 三 sān", "山 / 三", "shān / sān", "Núi / Ba", "Mountain / Three"),
        ],
      },
      {
        titleVi: "Mặt lưỡi so với chân răng",
        titleEn: "Palatal versus dental",
        items: [
          s("j / z", "鸡 jī so với 资 zī", "鸡 jī versus 资 zī", "鸡 / 资", "jī / zī", "Gà / Vốn", "Chicken / Capital"),
          s("x / s", "西 xī so với 思 sī", "西 xī versus 思 sī", "西 / 思", "xī / sī", "Tây / Nghĩ", "West / Think"),
          s("q / c", "七 qī so với 词 cí", "七 qī versus 词 cí", "七 / 词", "qī / cí", "Bảy / Từ", "Seven / Word"),
        ],
      },
      {
        titleVi: "n so với l, ü so với u",
        titleEn: "n versus l, ü versus u",
        items: [
          s("n / l", "你 nǐ so với 里 lǐ", "你 nǐ versus 里 lǐ", "你 / 里", "nǐ / lǐ", "Bạn / Trong", "You / Inside"),
          s("ü / u", "绿 lǜ so với 路 lù", "绿 lǜ versus 路 lù", "绿 / 路", "lǜ / lù", "Xanh / Đường", "Green / Road"),
          s("nü / nu", "女 nǚ so với 努 nǔ", "女 nǚ versus 努 nǔ", "女 / 努", "nǚ / nǔ", "Nữ / Nỗ lực", "Female / Strive"),
        ],
      },
      {
        titleVi: "Âm cuối -n so với -ng",
        titleEn: "Ending -n versus -ng",
        items: [
          s("-n / -ng", "新 xīn so với 星 xīng", "新 xīn versus 星 xīng", "新 / 星", "xīn / xīng", "Mới / Sao", "New / Star"),
          s("-n / -ng", "陈 chén so với 成 chéng", "陈 chén versus 成 chéng", "陈 / 成", "chén / chéng", "Trần / Thành", "Chen / Become"),
          s("-n / -ng", "半 bàn so với 棒 bàng", "半 bàn versus 棒 bàng", "半 / 棒", "bàn / bàng", "Nửa / Tuyệt", "Half / Great"),
        ],
      },
    ],
    tipVi: "Mẹo vàng của thầy Hải: mỗi ngày dành 3 phút đọc to 6 cặp: shì-sì, chī-cí, zhī-zī, xī-sī, lǜ-lù, xīn-xīng. Ghi âm lại và nghe lại, tai bạn sẽ tiến bộ trước miệng.",
    tipEn: "Teacher Hai's tip: spend 3 minutes daily on 6 pairs: shì-sì, chī-cí, zhī-zī, xī-sī, lǜ-lù, xīn-xīng. Record and replay - your ear improves before your mouth.",
    quiz: [
      { audio: "山", promptVi: "Nghe và chọn pinyin đúng", promptEn: "Listen and choose the right pinyin", options: ["sān", "shān", "zhān", "cān"], answer: 1, explainVi: "山 shān dùng sh cuốn lưỡi.", explainEn: "山 shān uses retroflex sh." },
      { audio: "三", promptVi: "Nghe và chọn pinyin đúng", promptEn: "Listen and choose the right pinyin", options: ["shān", "sān", "cān", "zān"], answer: 1, explainVi: "三 sān dùng s chân răng.", explainEn: "三 sān uses dental s." },
      { promptVi: "绿 lǜ khác 路 lù ở điểm nào?", promptEn: "How does 绿 lǜ differ from 路 lù?", options: ["Thanh điệu", "Nguyên âm ü so với u", "Initial / Thanh mẫu", "Không khác"], optionsEn: ["The tone", "The vowel ü versus u", "Initial", "No difference"], answer: 1, explainVi: "ü có môi tròn nhưng lưỡi ở vị trí i.", explainEn: "ü has rounded lips with the tongue of i." },
      { promptVi: "谢谢 đọc đúng là gì?", promptEn: "What is the correct reading of 谢谢?", options: ["siè sie", "xièxie", "shièshie", "ziè zie"], answer: 1, explainVi: "x là âm mặt lưỡi, không phải s.", explainEn: "x is palatal, not s." },
      { audio: "新", promptVi: "Nghe và chọn âm cuối", promptEn: "Listen and choose the ending", options: ["-n", "-ng", "-m", "None"], answer: 0, explainVi: "新 xīn kết thúc bằng -n.", explainEn: "新 xīn ends with -n." },
      { audio: "星", promptVi: "Nghe và chọn âm cuối", promptEn: "Listen and choose the ending", options: ["-n", "-ng", "-m", "None"], answer: 1, explainVi: "星 xīng kết thúc bằng -ng.", explainEn: "星 xīng ends with -ng." },
      { promptVi: "Lỗi phổ biến nhất của người Việt khi học phát âm tiếng Trung?", promptEn: "The most common Vietnamese pronunciation mistake?", options: ["Đọc sai thanh 1", "Mất phân biệt cuốn lưỡi", "Đọc quá to", "Đọc quá chậm"], optionsEn: ["Getting tone 1 wrong", "Losing the retroflex contrast", "Speaking too loudly", "Speaking too slowly"], answer: 1, explainVi: "Nhầm zh-z, ch-c, sh-s là lỗi số một.", explainEn: "Merging zh-z, ch-c, sh-s is mistake number one." },
      { promptVi: "j và z khác nhau thế nào?", promptEn: "How do j and z differ?", options: ["j mặt lưỡi, z chân răng", "j chân răng, z mặt lưỡi", "Cả hai cuốn lưỡi", "Không khác"], optionsEn: ["j palatal, z dental", "j dental, z palatal", "Both are retroflex", "No difference"], answer: 0, explainVi: "j là âm mặt lưỡi, z là âm chân răng.", explainEn: "j is palatal, z is dental." },
      { promptVi: "Cách tự kiểm tra phát âm hiệu quả nhất?", promptEn: "Best way to self-check pronunciation?", options: ["Đọc thầm", "Ghi âm rồi nghe lại", "Chỉ đọc pinyin", "Nghe nhạc"], optionsEn: ["Read silently", "Record then replay yourself", "Only read pinyin", "Listening to music"], answer: 1, explainVi: "Ghi âm giúp bạn nghe được lỗi của chính mình.", explainEn: "Recording lets you hear your own errors." },
      { promptVi: "半 bàn và 棒 bàng khác nhau ở đâu?", promptEn: "How do 半 bàn and 棒 bàng differ?", options: ["Thanh điệu", "Initial / Thanh mẫu", "Âm cuối -n và -ng", "Không khác"], optionsEn: ["The tone", "Initial", "The -n versus -ng ending", "No difference"], answer: 2, explainVi: "Chỉ khác âm cuối -n so với -ng.", explainEn: "Only the -n versus -ng ending differs." },
    ],
  },
];

export const PRONUNCIATION_LESSON_COUNT = chinesePronunciationLessons.length;
