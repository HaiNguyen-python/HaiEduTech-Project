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
      { audio: "中", promptVi: "Nghe và chọn pinyin đúng", promptEn: "Listen and choose the right pinyin", options: ["zōng", "zhōng", "chóng", "cōng"], answer: 1, explainVi: "中 zhōng có âm cuốn lưỡi zh.", explainEn: "中 zhōng uses the retroflex zh." },
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
      { audio: "人", promptVi: "Nghe và chọn pinyin đúng", promptEn: "Listen and choose the right pinyin", options: ["lín", "rén", "zhēn", "nín"], answer: 1, explainVi: "人 rén dùng r cuốn lưỡi.", explainEn: "人 rén uses retroflex r." },
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
          s("un", "u-ơ-n đọc liền, viết là un sau phụ âm (kùn); khi không có thanh mẫu viết là wen (wèn)", "u-e-n said quickly; spelled un after a consonant (kùn), spelled wen with no initial (wèn)", "困", "kùn", "Buồn ngủ, khốn", "Sleepy, stuck"),
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

  // ------------------------------------------------------------- 7. Spelling rules
  {
    id: "spelling-rules",
    emoji: "✍️",
    titleVi: "Quy tắc viết pinyin (ü, iu, ui, un, y, w)",
    titleEn: "Pinyin spelling rules (ü, iu, ui, un, y, w)",
    summaryVi: "Vì sao ju không đọc là chu, và tại sao xiu thật ra là xiou.",
    summaryEn: "Why ju is not 'joo', and why xiu is really xiou.",
    theoryVi: [
      "Pinyin có một số quy ước viết tắt. Nếu không biết, bạn sẽ đọc sai dù nhìn đúng chữ. Quan trọng nhất là quy tắc về ü.",
      "Sau j, q, x, y thì ü luôn được viết thành u: ju = jü, qu = qü, xu = xü, yu = yü. Vì j q x y không bao giờ đi với âm u thật, nên không sợ nhầm. Ngược lại, sau n và l thì phải giữ dấu hai chấm để phân biệt: nu (nữ nô) khác nü (nữ), lu (đường) khác lü (xanh lục).",
      "Ba vận mẫu bị viết rút gọn: iou viết là iu (jiǔ đọc gần jiou), uei viết là ui (huì đọc gần huei), uen viết là un (kùn đọc gần kuen). Khi đọc, hãy phục hồi nguyên âm giữa, đừng đọc trơ như iu, ui, un của tiếng Việt.",
      "Khi một vận mẫu bắt đầu bằng i, u, ü mà đứng đầu âm tiết (không có thanh mẫu), pinyin đổi cách viết: i thành y (i + ao = yao), u thành w (u + ang = wang), ü thành yu (ü + an = yuan). Đây chỉ là cách viết, âm không đổi.",
      "Dấu thanh luôn đặt trên nguyên âm chính: thứ tự ưu tiên a > o > e > i > u > ü. Riêng iu và ui thì dấu đặt trên nguyên âm sau: jiǔ, huì. Khi hai âm tiết nối nhau dễ đọc nhầm, dùng dấu tách: nǚ'ér (con gái), Xī'ān (Tây An).",
    ],
    theoryEn: [
      "Pinyin uses a few written shortcuts. If you do not know them you will read the syllable wrongly even when you spell it right. The ü rule matters most.",
      "After j, q, x and y, ü is always written u: ju = jü, qu = qü, xu = xü, yu = yü. Those initials never combine with a true u, so there is no ambiguity. After n and l, however, the umlaut must stay: nu differs from nü, lu (road) differs from lü (green).",
      "Three finals are written short: iou is written iu (jiǔ sounds like jiou), uei is written ui (huì sounds like huei), uen is written un (kùn sounds like kuen). When speaking, restore that middle vowel.",
      "When a final starting with i, u or ü opens a syllable with no initial, the spelling changes: i becomes y (i + ao = yao), u becomes w (u + ang = wang), ü becomes yu (ü + an = yuan). Only the spelling changes, not the sound.",
      "The tone mark sits on the main vowel, priority a > o > e > i > u > ü. In iu and ui it goes on the second vowel: jiǔ, huì. When two syllables could blur together, use an apostrophe: nǚ'ér (daughter), Xī'ān.",
    ],
    groups: [
      {
        titleVi: "ü sau j q x y viết thành u",
        titleEn: "ü written as u after j q x y",
        noteVi: "Đọc tròn môi như ü, không đọc thành u.",
        noteEn: "Round your lips as for ü - never as a plain u.",
        items: [
          s("ju", "Đọc là jü, môi tròn", "Read as jü with rounded lips", "居", "jū", "Ở, cư trú", "To reside"),
          s("qu", "Đọc là qü", "Read as qü", "去", "qù", "Đi", "To go"),
          s("xu", "Đọc là xü", "Read as xü", "需", "xū", "Cần", "To need"),
          s("yu", "Đọc là ü, y chỉ là chữ đệm", "Read as ü, the y is only a spelling helper", "鱼", "yú", "Con cá", "Fish"),
          s("juan", "Đọc là jüan, không phải juan", "Read jüan, not juan", "捐", "juān", "Quyên góp", "To donate"),
        ],
      },
      {
        titleVi: "n và l phải giữ dấu ü",
        titleEn: "n and l keep the ü",
        items: [
          s("nü", "Môi tròn, khác hẳn nu", "Rounded lips, clearly different from nu", "女", "nǚ", "Nữ, con gái", "Female"),
          s("nu", "Âm u bình thường", "A plain u sound", "努", "nǔ", "Nỗ lực", "To strive"),
          s("lü", "Môi tròn như ü", "Rounded ü", "绿", "lǜ", "Màu xanh lục", "Green"),
          s("lu", "Âm u bình thường", "A plain u", "路", "lù", "Con đường", "Road"),
        ],
      },
      {
        titleVi: "Vận mẫu viết rút gọn",
        titleEn: "Shortened finals",
        noteVi: "Phục hồi nguyên âm giữa khi đọc.",
        noteEn: "Restore the middle vowel when you speak.",
        items: [
          s("iu = iou", "Đọc gần i-ou, dấu trên u", "Sounds like i-ou, tone mark on the u", "九", "jiǔ", "Số chín", "Nine"),
          s("ui = uei", "Đọc gần u-ei, dấu trên i", "Sounds like u-ei, tone mark on the i", "会", "huì", "Biết, sẽ", "Can, will"),
          s("un = uen", "Đọc gần u-en", "Sounds like u-en", "困", "kùn", "Buồn ngủ, khốn khó", "Sleepy, stuck"),
          s("iong", "Đọc là i + ong", "Read as i + ong", "熊", "xióng", "Con gấu", "Bear"),
        ],
      },
      {
        titleVi: "Đứng đầu âm tiết: y, w, yu",
        titleEn: "Syllable-initial y, w, yu",
        items: [
          s("y-", "i + ao viết là yao", "i + ao is written yao", "要", "yào", "Muốn", "To want"),
          s("w-", "u + ang viết là wang", "u + ang is written wang", "王", "wáng", "Vua, họ Vương", "King"),
          s("yu-", "ü + an viết là yuan", "ü + an is written yuan", "元", "yuán", "Đồng (tiền)", "Yuan"),
          s("yi", "i đứng riêng viết là yi", "A lone i is written yi", "一", "yī", "Số một", "One"),
          s("wu", "u đứng riêng viết là wu", "A lone u is written wu", "五", "wǔ", "Số năm", "Five"),
        ],
      },
    ],
    tipVi: "Mẹo vàng của thầy Hải: gặp ju qu xu yu, hãy tự nhắc trong đầu \"u này là ü\". Chỉ một phản xạ nhỏ đó giúp bạn tránh 90% lỗi đọc sai nhóm này.",
    tipEn: "Teacher Hai's tip: whenever you see ju, qu, xu or yu, remind yourself \"that u is ü\". This single reflex removes about 90% of the mistakes in this group.",
    quiz: [
      { promptVi: "ju thực chất đọc là gì?", promptEn: "How is ju actually pronounced?", options: ["jü", "ju", "zhu", "jiu"], answer: 0, explainVi: "Sau j q x y, ü viết thành u nên ju = jü.", explainEn: "After j q x y, ü is written u, so ju = jü." },
      { promptVi: "Cặp nào KHÔNG được bỏ dấu hai chấm của ü?", promptEn: "Which initials must keep the umlaut on ü?", options: ["j và q", "x và y", "n và l", "z và c"], answer: 2, explainVi: "nü khác nu, lü khác lu nên phải giữ dấu.", explainEn: "nü differs from nu and lü from lu, so the umlaut stays." },
      { promptVi: "iu là cách viết rút gọn của vận mẫu nào?", promptEn: "iu is the short spelling of which final?", options: ["iou", "iao", "ien", "uei"], answer: 0, explainVi: "iou viết là iu, ví dụ jiǔ.", explainEn: "iou is written iu, as in jiǔ." },
      { promptVi: "ui là cách viết rút gọn của vận mẫu nào?", promptEn: "ui is the short spelling of which final?", options: ["uai", "uei", "uen", "iou"], answer: 1, explainVi: "uei viết là ui, ví dụ huì.", explainEn: "uei is written ui, as in huì." },
      { promptVi: "un trong kùn thật ra là?", promptEn: "The un in kùn really is?", options: ["uen", "uan", "ün", "uon"], answer: 0, explainVi: "uen viết là un sau thanh mẫu.", explainEn: "uen is written un after an initial." },
      { promptVi: "Vận mẫu ü + an đứng đầu âm tiết viết thành?", promptEn: "How is ü + an written at the start of a syllable?", options: ["üan", "yuan", "wan", "ian"], answer: 1, explainVi: "ü đầu âm tiết viết là yu nên thành yuan.", explainEn: "A syllable-initial ü is written yu, giving yuan." },
      { promptVi: "Dấu thanh của jiu đặt ở đâu?", promptEn: "Where does the tone mark go in jiu?", options: ["Trên i", "Trên u", "Trên cả hai", "Không cần dấu"], optionsEn: ["On the i", "On the u", "On both", "No mark needed"], answer: 1, explainVi: "Với iu, dấu đặt trên nguyên âm sau: jiǔ.", explainEn: "In iu the mark goes on the second vowel: jiǔ." },
      { audio: "绿", promptVi: "Nghe và chọn pinyin đúng", promptEn: "Listen and choose the right pinyin", options: ["lù", "lǜ", "nǜ", "rù"], answer: 1, explainVi: "绿 lǜ nghĩa là màu xanh lục, môi tròn.", explainEn: "绿 lǜ means green, with rounded lips." },
      { audio: "去", promptVi: "Nghe và chọn pinyin đúng", promptEn: "Listen and choose the right pinyin", options: ["qù", "chù", "cù", "jù"], answer: 0, explainVi: "去 qù đọc là qü.", explainEn: "去 qù is pronounced qü." },
      { promptVi: "Vì sao viết nǚ'ér có dấu tách?", promptEn: "Why does nǚ'ér take an apostrophe?", options: ["Cho đẹp", "Để tách rõ hai âm tiết", "Vì là từ mượn", "Vì có thanh 2"], optionsEn: ["For looks", "To separate the two syllables clearly", "Because it is a loanword", "Because of tone 2"], answer: 1, explainVi: "Dấu tách giúp không đọc dính thành một âm tiết.", explainEn: "The apostrophe stops the two syllables blurring into one." },
      { promptVi: "u trong nu (努) và u trong ju (居) khác nhau thế nào?", promptEn: "How do the u in nu (努) and in ju (居) differ?", options: ["Giống nhau", "nu là u thật, ju là ü", "ju là u thật, nu là ü", "Chỉ khác thanh điệu"], optionsEn: ["They are the same", "nu has a true u, ju has ü", "ju has a true u, nu has ü", "Only the tone differs"], answer: 1, explainVi: "Sau j luôn là ü, còn sau n là u thật.", explainEn: "After j it is always ü, after n it is a true u." },
    ],
  },

  // ------------------------------------------------------------- 8. Neutral tone & erhua
  {
    id: "neutral-erhua",
    emoji: "🎈",
    titleVi: "Thanh nhẹ và âm uốn lưỡi -r (erhua)",
    titleEn: "Neutral tone and erhua (-r)",
    summaryVi: "Đọc nhẹ đúng chỗ và biết khi nào thêm -r kiểu Bắc Kinh.",
    summaryEn: "Where to go light, and when to add the Beijing -r.",
    theoryVi: [
      "Thanh nhẹ (轻声 qīngshēng) không có dấu, đọc ngắn, nhẹ và thấp hơn âm liền trước. Đây không phải thanh thứ 5 mà là cách đọc yếu của một âm tiết đã mất thanh gốc.",
      "Những chỗ luôn đọc thanh nhẹ: âm tiết thứ hai của từ láy thân mật (妈妈 māma, 爸爸 bàba, 谢谢 xièxie), các trợ từ 的 de, 了 le, 吗 ma, 呢 ne, 吧 ba, và hậu tố 子 zi, 头 tou trong 桌子 zhuōzi, 石头 shítou.",
      "Thanh nhẹ đổi nghĩa: 东西 dōngxi là đồ vật, còn dōngxī là phương đông và phương tây. 大意 dàyi là bất cẩn, dàyì là ý chính. Vì vậy đọc nhẹ hay không nhẹ là chuyện ngữ nghĩa, không phải thói quen.",
      "Erhua (儿化) là thêm hậu tố 儿 -r vào cuối âm tiết, phổ biến ở Bắc Kinh và giọng miền Bắc: 这儿 zhèr (ở đây), 那儿 nàr (ở đó), 一点儿 yìdiǎnr (một chút), 玩儿 wánr (chơi). Khi thêm -r, âm cuối -n hoặc -i thường bị hòa vào và lưỡi cuốn nhẹ lên.",
      "Không nên lạm dụng erhua. Trong bài thi HSK, phát thanh viên vẫn dùng vài từ erhua rất thường gặp, nhưng khi bạn nói, chỉ cần dùng đúng những từ quen thuộc như 这儿, 那儿, 一点儿, 一会儿. Giọng miền Nam Trung Quốc và Đài Loan gần như không dùng erhua.",
    ],
    theoryEn: [
      "The neutral tone (轻声 qīngshēng) has no mark. It is short, light and lower than the syllable before it. It is not a fifth tone but the weak reading of a syllable that has lost its original tone.",
      "Places that are always neutral: the second syllable of affectionate reduplications (妈妈 māma, 爸爸 bàba, 谢谢 xièxie), the particles 的 de, 了 le, 吗 ma, 呢 ne, 吧 ba, and the suffixes 子 zi and 头 tou in 桌子 zhuōzi, 石头 shítou.",
      "The neutral tone can change meaning: 东西 dōngxi means 'thing', while dōngxī means east and west. 大意 dàyi means careless, dàyì means the main idea. So going light is a matter of meaning, not habit.",
      "Erhua (儿化) attaches the suffix 儿 -r to the end of a syllable. It is typical of Beijing and northern speech: 这儿 zhèr (here), 那儿 nàr (there), 一点儿 yìdiǎnr (a little), 玩儿 wánr (to play). With -r, an -n or -i ending usually merges away and the tongue curls up slightly.",
      "Do not overuse erhua. HSK recordings keep a handful of very common erhua words, but in your own speech a few familiar items such as 这儿, 那儿, 一点儿, 一会儿 are enough. Southern Mandarin and Taiwan speech barely use erhua at all.",
    ],
    groups: [
      {
        titleVi: "Từ láy thân mật đọc nhẹ",
        titleEn: "Affectionate reduplications go light",
        items: [
          s("māma", "Âm sau đọc ngắn và nhẹ", "The second syllable is short and light", "妈妈", "māma", "Mẹ", "Mum"),
          s("bàba", "Thanh 4 rồi buông nhẹ", "Tone 4 then release lightly", "爸爸", "bàba", "Bố", "Dad"),
          s("gēge", "Không đọc thành gēgē", "Do not say gēgē", "哥哥", "gēge", "Anh trai", "Elder brother"),
          s("xièxie", "Âm sau nhẹ, không nhấn", "The second syllable is unstressed", "谢谢", "xièxie", "Cảm ơn", "Thank you"),
        ],
      },
      {
        titleVi: "Trợ từ và hậu tố",
        titleEn: "Particles and suffixes",
        items: [
          s("de", "Trợ từ sở hữu, luôn nhẹ", "Possessive particle, always light", "我的", "wǒ de", "Của tôi", "Mine"),
          s("le", "Trợ từ hoàn thành, luôn nhẹ", "Aspect particle, always light", "吃了", "chī le", "Đã ăn", "Have eaten"),
          s("ma", "Trợ từ câu hỏi, nhẹ và ngắn", "Question particle, light and short", "好吗", "hǎo ma", "Được không?", "Is that OK?"),
          s("zi", "Hậu tố danh từ, đọc nhẹ", "Noun suffix, read light", "桌子", "zhuōzi", "Cái bàn", "Table"),
          s("tou", "Hậu tố danh từ, đọc nhẹ", "Noun suffix, read light", "石头", "shítou", "Hòn đá", "Stone"),
        ],
      },
      {
        titleVi: "Nhẹ hay không nhẹ đổi nghĩa",
        titleEn: "Light or not changes the meaning",
        noteVi: "So sánh từng cặp để thấy rõ.",
        noteEn: "Compare each pair carefully.",
        items: [
          s("dōngxi", "Đọc nhẹ: đồ vật", "Light: a thing, an object", "东西", "dōngxi", "Đồ, thứ", "Thing"),
          s("dōngxī", "Đủ thanh: đông và tây", "Full tones: east and west", "东西", "dōngxī", "Đông tây", "East and west"),
          s("dàyi", "Đọc nhẹ: bất cẩn", "Light: careless", "大意", "dàyi", "Bất cẩn", "Careless"),
          s("dàyì", "Đủ thanh: ý chính", "Full tone: the main idea", "大意", "dàyì", "Ý chính", "Main idea"),
        ],
      },
      {
        titleVi: "Erhua thường gặp",
        titleEn: "Common erhua words",
        noteVi: "Cuốn nhẹ đầu lưỡi lên khi kết thúc âm tiết.",
        noteEn: "Curl the tongue tip up slightly as the syllable ends.",
        items: [
          s("zhèr", "这里 nói gọn thành 这儿", "这里 said as 这儿", "这儿", "zhèr", "Ở đây", "Here"),
          s("nàr", "那里 nói gọn thành 那儿", "那里 said as 那儿", "那儿", "nàr", "Ở đó", "There"),
          s("yìdiǎnr", "Âm -n hòa vào -r", "The -n merges into the -r", "一点儿", "yìdiǎnr", "Một chút", "A little"),
          s("yíhuìr", "Nghĩa là một lát nữa", "Means 'in a moment'", "一会儿", "yíhuìr", "Một lát", "A moment"),
          s("wánr", "Chơi, giải trí", "To play, to hang out", "玩儿", "wánr", "Chơi", "To play"),
        ],
      },
    ],
    tipVi: "Mẹo vàng của thầy Hải: đọc thanh nhẹ như thả tay khỏi phím đàn - ngắn, nhẹ, không cố tạo cao độ. Còn erhua thì chỉ học đúng 5 từ quen nhất trước khi mở rộng.",
    tipEn: "Teacher Hai's tip: read a neutral tone like lifting your finger off a piano key - short, light, no target pitch. For erhua, master the five most common words before adding more.",
    quiz: [
      { promptVi: "Thanh nhẹ được ghi bằng dấu gì?", promptEn: "Which mark shows a neutral tone?", options: ["Dấu ngang", "Dấu sắc", "Không có dấu", "Dấu chấm"], optionsEn: ["A macron", "An acute mark", "No mark at all", "A dot"], answer: 2, explainVi: "Thanh nhẹ không có dấu thanh.", explainEn: "The neutral tone carries no tone mark." },
      { promptVi: "谢谢 đọc đúng là?", promptEn: "How is 谢谢 correctly read?", options: ["xièxiè", "xièxie", "xiéxie", "xiēxiè"], answer: 1, explainVi: "Âm tiết thứ hai đọc thanh nhẹ: xièxie.", explainEn: "The second syllable is neutral: xièxie." },
      { promptVi: "东西 nghĩa là đồ vật khi đọc thế nào?", promptEn: "When does 东西 mean 'thing'?", options: ["dōngxī", "dōngxi", "dòngxī", "dōngxí"], answer: 1, explainVi: "Đọc nhẹ âm sau: dōngxi là đồ vật.", explainEn: "With a neutral second syllable, dōngxi means 'thing'." },
      { promptVi: "Trợ từ nào KHÔNG đọc thanh nhẹ?", promptEn: "Which of these is NOT read neutral?", options: ["的 de", "了 le", "吗 ma", "很 hěn"], answer: 3, explainVi: "很 hěn là phó từ, giữ thanh 3.", explainEn: "很 hěn is an adverb and keeps tone 3." },
      { promptVi: "Erhua là hiện tượng gì?", promptEn: "What is erhua?", options: ["Thêm hậu tố 儿 -r vào cuối âm tiết", "Đổi thanh 3 thành thanh 2", "Bỏ thanh điệu", "Đọc to hơn"], optionsEn: ["Adding the suffix 儿 -r to a syllable", "Changing tone 3 to tone 2", "Dropping the tone", "Speaking louder"], answer: 0, explainVi: "Erhua là thêm -r và cuốn nhẹ lưỡi.", explainEn: "Erhua adds -r with a light tongue curl." },
      { promptVi: "Giọng vùng nào dùng erhua nhiều nhất?", promptEn: "Which accent uses erhua the most?", options: ["Bắc Kinh và miền Bắc", "Quảng Đông", "Đài Loan", "Thượng Hải"], optionsEn: ["Beijing and the north", "Guangdong", "Taiwan", "Shanghai"], answer: 0, explainVi: "Erhua là đặc trưng giọng Bắc Kinh.", explainEn: "Erhua is typical of Beijing speech." },
      { audio: "一点儿", promptVi: "Nghe và chọn pinyin đúng", promptEn: "Listen and choose the right pinyin", options: ["yìdiǎn", "yìdiǎnr", "yídiǎnr", "yīdiǎn"], answer: 1, explainVi: "一点儿 yìdiǎnr có âm -r cuối.", explainEn: "一点儿 yìdiǎnr ends with -r." },
      { audio: "妈妈", promptVi: "Nghe và chọn cách đọc đúng", promptEn: "Listen and choose the correct reading", options: ["māmā", "māma", "mámā", "mǎma"], answer: 1, explainVi: "Âm tiết sau đọc thanh nhẹ.", explainEn: "The second syllable is neutral." },
      { promptVi: "Thanh nhẹ nghe thế nào so với âm trước?", promptEn: "How does a neutral tone sound next to the syllable before it?", options: ["Dài và cao hơn", "Ngắn, nhẹ và thấp hơn", "Nhấn mạnh hơn", "Giống hệt"], optionsEn: ["Longer and higher", "Shorter, lighter and lower", "More stressed", "Exactly the same"], answer: 1, explainVi: "Ngắn, nhẹ, thường thấp hơn âm liền trước.", explainEn: "Shorter, lighter, usually lower than the previous syllable." },
      { promptVi: "这儿 và 这里 khác nhau ở đâu?", promptEn: "How do 这儿 and 这里 differ?", options: ["Khác nghĩa hoàn toàn", "Cùng nghĩa, 这儿 là cách nói kiểu Bắc", "这儿 sai ngữ pháp", "这里 chỉ dùng khi viết thơ"], optionsEn: ["Completely different meanings", "Same meaning, 这儿 is the northern style", "这儿 is ungrammatical", "这里 is only for poetry"], answer: 1, explainVi: "Cùng nghĩa 'ở đây', 这儿 phổ biến ở miền Bắc.", explainEn: "Both mean 'here'; 这儿 is common in the north." },
      { promptVi: "桌子 đọc đúng là?", promptEn: "How is 桌子 correctly read?", options: ["zhuōzǐ", "zhuōzi", "zhuózi", "zhuōzī"], answer: 1, explainVi: "Hậu tố 子 đọc thanh nhẹ zi.", explainEn: "The suffix 子 is read neutral as zi." },
    ],
  },

  // ------------------------------------------------------------- 9. Rhythm
  {
    id: "rhythm-flow",
    emoji: "🎵",
    titleVi: "Nhịp điệu, trọng âm và ngữ điệu câu",
    titleEn: "Rhythm, stress and sentence intonation",
    summaryVi: "Từ đọc đúng từng chữ đến nói cả câu nghe tự nhiên.",
    summaryEn: "From correct single syllables to natural full sentences.",
    theoryVi: [
      "Đọc đúng từng âm tiết chưa đủ. Người nghe cảm nhận bạn nói tự nhiên hay không nhờ nhịp điệu: chỗ nào nhấn, chỗ nào nhẹ, chỗ nào ngắt hơi.",
      "Trong từ hai âm tiết, âm tiết sau thường dài và rõ hơn một chút: 学生 xuéshēng, 中国 Zhōngguó, 老师 lǎoshī. Nếu âm tiết sau là thanh nhẹ thì ngược lại, âm tiết trước mới là chỗ nhấn: 学生 với 生 nhẹ trong khẩu ngữ, 桌子 zhuōzi, 朋友 péngyou.",
      "Ngắt hơi theo cụm nghĩa, không ngắt theo từng chữ. Câu 我 昨天 去 图书馆 看书 nên ngắt thành 我昨天 / 去图书馆 / 看书. Đọc rời từng chữ là dấu hiệu rõ nhất của người mới học.",
      "Ngữ điệu câu nằm trên nền thanh điệu, không thay thế thanh điệu. Câu hỏi với 吗 chỉ hơi nâng cuối câu, còn thanh của từng chữ vẫn giữ nguyên. Đây là điểm khác lớn với tiếng Anh, nơi cả câu có thể lên giọng mạnh.",
      "Từ có thanh 4 liên tiếp thường được đọc nhẹ bớt ở âm đầu để đỡ nặng: 大会 dàhuì, 电视 diànshì. Ngược lại, khi nhấn mạnh một từ trong câu, hãy kéo dài âm tiết đó thay vì đổi thanh của nó.",
    ],
    theoryEn: [
      "Correct single syllables are not enough. Listeners judge naturalness from rhythm: what is stressed, what is light, and where you pause.",
      "In a two-syllable word the second syllable is usually slightly longer and clearer: 学生 xuéshēng, 中国 Zhōngguó, 老师 lǎoshī. When the second syllable is neutral, the stress moves to the first: 桌子 zhuōzi, 朋友 péngyou.",
      "Pause by meaning groups, not by single characters. 我昨天去图书馆看书 should break as 我昨天 / 去图书馆 / 看书. Reading character by character is the clearest beginner giveaway.",
      "Sentence intonation sits on top of the tones - it does not replace them. A 吗 question only lifts slightly at the very end while each syllable keeps its own tone. This differs sharply from English, where a whole sentence can rise strongly.",
      "Words with two tone-4 syllables are usually softened on the first one so they do not sound heavy: 大会 dàhuì, 电视 diànshì. To emphasise a word in a sentence, lengthen it rather than changing its tone.",
    ],
    groups: [
      {
        titleVi: "Trọng âm trong từ hai âm tiết",
        titleEn: "Stress in two-syllable words",
        items: [
          s("xuéshēng", "Âm sau rõ và hơi dài hơn", "The second syllable is clearer and slightly longer", "学生", "xuéshēng", "Học sinh", "Student"),
          s("Zhōngguó", "Nhấn nhẹ ở âm sau", "Light stress on the second syllable", "中国", "Zhōngguó", "Trung Quốc", "China"),
          s("péngyou", "Âm sau nhẹ nên nhấn âm trước", "The second syllable is neutral, so stress the first", "朋友", "péngyou", "Bạn bè", "Friend"),
          s("zhuōzi", "Nhấn âm trước, 子 đọc nhẹ", "Stress the first, 子 goes light", "桌子", "zhuōzi", "Cái bàn", "Table"),
        ],
      },
      {
        titleVi: "Ngắt theo cụm nghĩa",
        titleEn: "Pausing by meaning groups",
        noteVi: "Nghe cả cụm, đừng ngắt từng chữ.",
        noteEn: "Listen to whole chunks; do not chop each character.",
        items: [
          s("我昨天 / 去图书馆", "Chủ ngữ + thời gian, rồi cụm động từ", "Subject plus time, then the verb phrase", "我昨天去图书馆", "wǒ zuótiān qù túshūguǎn", "Hôm qua tôi đến thư viện", "I went to the library yesterday"),
          s("你有 / 时间吗", "Ngắt trước tân ngữ dài", "Pause before a longer object", "你有时间吗", "nǐ yǒu shíjiān ma", "Bạn có thời gian không?", "Do you have time?"),
          s("这个菜 / 很好吃", "Chủ ngữ rồi vị ngữ", "Subject, then predicate", "这个菜很好吃", "zhège cài hěn hǎochī", "Món này rất ngon", "This dish is delicious"),
        ],
      },
      {
        titleVi: "Ngữ điệu câu hỏi và câu kể",
        titleEn: "Question versus statement intonation",
        items: [
          s("Câu kể", "Giữ thanh, kết câu hạ nhẹ", "Keep the tones, let the end fall slightly", "他是老师", "tā shì lǎoshī", "Anh ấy là giáo viên", "He is a teacher"),
          s("Câu hỏi 吗", "Chỉ nâng nhẹ ở 吗 cuối câu", "Only a light rise on the final 吗", "他是老师吗", "tā shì lǎoshī ma", "Anh ấy là giáo viên à?", "Is he a teacher?"),
          s("Câu hỏi từ hỏi", "Không cần nâng giọng, đã có 谁", "No rise needed, 谁 already asks", "他是谁", "tā shì shéi", "Anh ấy là ai?", "Who is he?"),
          s("Nhấn mạnh", "Kéo dài từ cần nhấn, không đổi thanh", "Lengthen the key word, do not change its tone", "我很喜欢", "wǒ hěn xǐhuan", "Tôi rất thích", "I really like it"),
        ],
      },
    ],
    tipVi: "Mẹo vàng của thầy Hải: luyện theo kỹ thuật shadowing - nghe một câu, nói đuổi ngay sau người bản xứ, bắt chước cả chỗ ngắt và chỗ nhấn. Ba phút mỗi ngày hiệu quả hơn đọc to danh sách từ.",
    tipEn: "Teacher Hai's tip: use shadowing - hear one sentence and speak right behind the native speaker, copying pauses and stress too. Three minutes a day beats reading word lists aloud.",
    quiz: [
      { promptVi: "Trong từ 学生, âm tiết nào rõ và hơi dài hơn khi đọc chuẩn?", promptEn: "In 学生, which syllable is clearer and slightly longer?", options: ["学", "生", "Cả hai bằng nhau", "Không âm nào"], optionsEn: ["学", "生", "Both equally", "Neither"], answer: 1, explainVi: "Từ hai âm tiết thường rõ hơn ở âm sau.", explainEn: "In two-syllable words the second syllable is usually clearer." },
      { promptVi: "Với 桌子, chỗ nhấn nằm ở đâu?", promptEn: "Where is the stress in 桌子?", options: ["Âm tiết đầu", "Âm tiết sau", "Không có", "Cả hai"], optionsEn: ["The first syllable", "The second syllable", "Nowhere", "Both"], answer: 0, explainVi: "子 đọc thanh nhẹ nên nhấn ở âm đầu.", explainEn: "子 is neutral, so the stress falls on the first syllable." },
      { promptVi: "Cách ngắt nào tự nhiên nhất?", promptEn: "Which pausing is most natural?", options: ["我 / 昨 / 天 / 去 / 图 / 书 / 馆", "我昨天 / 去图书馆 / 看书", "我昨天去图书馆看书 không ngắt", "我昨 / 天去图 / 书馆"], optionsEn: ["Character by character", "我昨天 / 去图书馆 / 看书", "No pause at all", "Random mid-word breaks"], answer: 1, explainVi: "Ngắt theo cụm nghĩa là tự nhiên nhất.", explainEn: "Pausing by meaning groups sounds most natural." },
      { promptVi: "Câu hỏi có 吗 thì ngữ điệu thế nào?", promptEn: "What intonation does a 吗 question take?", options: ["Nâng mạnh cả câu", "Chỉ nâng nhẹ ở cuối câu", "Hạ giọng mạnh", "Đổi thanh của từng chữ"], optionsEn: ["A strong rise across the whole sentence", "Only a light rise at the very end", "A strong fall", "Changing every syllable's tone"], answer: 1, explainVi: "Ngữ điệu chỉ nâng nhẹ ở cuối, thanh điệu giữ nguyên.", explainEn: "Only a light final rise; the tones stay the same." },
      { promptVi: "Ngữ điệu câu có thay thế thanh điệu không?", promptEn: "Does sentence intonation replace the tones?", options: ["Có, khi nói nhanh", "Không, ngữ điệu nằm trên nền thanh điệu", "Chỉ với câu hỏi", "Chỉ với câu cảm thán"], optionsEn: ["Yes, when speaking fast", "No, intonation sits on top of the tones", "Only in questions", "Only in exclamations"], answer: 1, explainVi: "Thanh điệu luôn giữ, ngữ điệu thêm lên trên.", explainEn: "Tones are always kept; intonation is layered on top." },
      { promptVi: "Muốn nhấn mạnh một từ trong câu, nên làm gì?", promptEn: "How should you emphasise a word in a sentence?", options: ["Đổi sang thanh 4", "Kéo dài và đọc rõ từ đó", "Bỏ thanh điệu", "Đọc thật to cả câu"], optionsEn: ["Switch it to tone 4", "Lengthen it and say it clearly", "Drop its tone", "Shout the whole sentence"], answer: 1, explainVi: "Kéo dài và làm rõ, không đổi thanh.", explainEn: "Lengthen and clarify it without changing the tone." },
      { audio: "他是老师吗", promptVi: "Nghe và cho biết đây là câu gì", promptEn: "Listen: what kind of sentence is this?", options: ["Câu kể", "Câu hỏi", "Câu cầu khiến", "Câu cảm thán"], optionsEn: ["A statement", "A question", "A command", "An exclamation"], answer: 1, explainVi: "Có 吗 cuối câu nên là câu hỏi.", explainEn: "The final 吗 makes it a question." },
      { audio: "这个菜很好吃", promptVi: "Nghe và chọn chỗ ngắt hợp lý", promptEn: "Listen and choose a sensible pause point", options: ["这个 / 菜很好吃", "这个菜 / 很好吃", "这 / 个菜很 / 好吃", "Không ngắt ở đâu"], optionsEn: ["这个 / 菜很好吃", "这个菜 / 很好吃", "Random mid-word breaks", "No pause anywhere"], answer: 1, explainVi: "Ngắt giữa chủ ngữ và vị ngữ.", explainEn: "Pause between subject and predicate." },
      { promptVi: "Vì sao 电视 thường đọc nhẹ bớt ở âm đầu?", promptEn: "Why is the first syllable of 电视 softened?", options: ["Vì là từ mượn", "Vì hai thanh 4 liền nhau nghe nặng", "Vì có thanh nhẹ", "Vì đó là danh từ"], optionsEn: ["It is a loanword", "Two tone-4 syllables in a row sound heavy", "It contains a neutral tone", "Because it is a noun"], answer: 1, explainVi: "Hai thanh 4 liền nhau được làm nhẹ âm đầu.", explainEn: "Two consecutive tone-4 syllables get a softer first one." },
      { promptVi: "Kỹ thuật shadowing là gì?", promptEn: "What is shadowing?", options: ["Đọc thầm trong đầu", "Nói đuổi ngay sau người bản xứ", "Dịch từng chữ", "Nghe nhạc không lời"], optionsEn: ["Reading silently", "Speaking right behind a native speaker", "Translating word by word", "Listening to instrumental music"], answer: 1, explainVi: "Nghe rồi nói đuổi, bắt chước cả nhịp và chỗ nhấn.", explainEn: "Listen and speak right behind, copying rhythm and stress." },
    ],
  },
];

export const PRONUNCIATION_LESSON_COUNT = chinesePronunciationLessons.length;
