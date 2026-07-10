/**
 * @file swedishA1DailyDeep.ts
 * @description Nội dung CHUYÊN SÂU cho 30 ngày A1 Thụy Điển: 4 lớp bổ sung
 *              cho mỗi ngày - (1) Mẫu câu khung (sentence patterns) để tự ghép
 *              câu, (2) Đoạn nghe ngắn 3-5 câu kèm câu hỏi hiểu, (3) Bài viết
 *              có đáp án mẫu, (4) Tự kiểm tra 4 câu Q-A. Dùng kèm
 *              swedishA1DailyExtras.ts và SwedishA1DailyPlan.tsx.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

export interface Pattern {
  /** Khung câu Thụy Điển có chỗ trống ___ */
  frame: string;
  /** Diễn giải tiếng Việt / tiếng Anh */
  vi: string;
  en: string;
  /** 2-3 ví dụ điền sẵn (sv = câu hoàn chỉnh) */
  examples: { sv: string; vi: string; en: string }[];
}

export interface ListeningPassage {
  /** Đoạn nghe 3-5 câu (Svenska) - phát bằng SwedishAudioButton */
  sv: string;
  vi: string;
  en: string;
  /** 2 câu hỏi hiểu + đáp án */
  questions: { q: string; a: string }[];
}

export interface WritingTask {
  promptVi: string;
  promptEn: string;
  /** Đáp án mẫu (60-90 từ) */
  sampleSv: string;
  sampleVi: string;
  sampleEn: string;
}

export interface SelfCheckQA {
  q: string;
  a: string;
}

export interface DailyDeep {
  patterns?: Pattern[];
  listening?: ListeningPassage;
  writing?: WritingTask;
  selfCheck?: SelfCheckQA[];
}

const p = (frame: string, vi: string, en: string, examples: Pattern["examples"]): Pattern => ({ frame, vi, en, examples });
const qa = (q: string, a: string): SelfCheckQA => ({ q, a });

export const SWEDISH_A1_DAILY_DEEP: Record<number, DailyDeep> = {
  /* ============================ TUẦN 1 ============================ */
  1: {
    patterns: [
      p("Hej, jag heter ___.", "Chào, tôi tên là ___.", "Hi, my name is ___.", [
        { sv: "Hej, jag heter Linh.", ipa: "/hɛj, jaɡ heːtɛr lɪnh./", vi: "Chào, tôi tên Linh.", en: "Hi, I'm Linh." },
        { sv: "Hej, jag heter Anna.", ipa: "/hɛj, jaɡ heːtɛr anɑː./", vi: "Chào, tôi tên Anna.", en: "Hi, I'm Anna." },
      ]),
      p("Tack så ___ !", "Cảm ơn rất ___ !", "Thanks ___!", [
        { sv: "Tack så mycket!", ipa: "/takk sɔ mʏkɕɛt!/", vi: "Cảm ơn rất nhiều!", en: "Thanks a lot!" },
        { sv: "Tack så jättemycket!", ipa: "/takk sɔ jɛteːmʏkɕɛt!/", vi: "Cảm ơn vô cùng!", en: "Thanks a million!" },
      ]),
    ],
    listening: {
      sv: "Hej! Jag heter Erik. Jag bor i Stockholm. Trevligt att träffas!",
      vi: "Chào! Tôi tên Erik. Tôi sống ở Stockholm. Rất vui được gặp.",
      en: "Hi! I'm Erik. I live in Stockholm. Nice to meet you!",
      questions: [
        { q: "Người nói tên gì? / What's the speaker's name?", a: "Erik" },
        { q: "Anh ấy sống ở đâu? / Where does he live?", a: "Stockholm" },
      ],
    },
    writing: {
      promptVi: "Viết 3 câu tự giới thiệu (tên, lời chào, lời cảm ơn).",
      promptEn: "Write 3 self-intro sentences (name, greeting, thanks).",
      sampleSv: "Hej! Jag heter Linh. Trevligt att träffas. Tack så mycket!",
      sampleVi: "Chào! Tôi tên Linh. Rất vui được gặp. Cảm ơn rất nhiều!",
      sampleEn: "Hi! I'm Linh. Nice to meet you. Thank you very much!",
    },
    selfCheck: [
      qa("Bảng chữ cái Thụy Điển có bao nhiêu chữ? / How many letters?", "29 (thêm å, ä, ö)"),
      qa("'sju' đọc gần với âm nào? / 'sju' sounds closest to?", "Âm 'hwh' từ cổ họng, không phải 'su'."),
      qa("1 phụ âm sau nguyên âm → âm dài hay ngắn? / 1 consonant after vowel → long or short?", "DÀI (mat = maaat)"),
      qa("'de' (họ) đọc thế nào trong giao tiếp? / How is 'de' pronounced?", "dom"),
    ],
  },
  2: {
    patterns: [
      p("Hej, hur mår ___?", "Chào, ___ khoẻ không?", "Hi, how is ___?", [
        { sv: "Hej, hur mår du?", ipa: "/hɛj, hɵr mɔr dʉː?/", vi: "Chào, bạn khoẻ không?", en: "Hi, how are you?" },
        { sv: "Hej, hur mår han?", ipa: "/hɛj, hɵr mɔr han?/", vi: "Anh ấy khoẻ không?", en: "How is he?" },
      ]),
      p("Det är ___ , tack.", "___ , cảm ơn.", "It's ___, thanks.", [
        { sv: "Det är bra, tack.", ipa: "/dɛt ɛr bra, takk./", vi: "Khoẻ, cảm ơn.", en: "I'm good, thanks." },
        { sv: "Det är så där, tack.", ipa: "/dɛt ɛr sɔ dɛr, takk./", vi: "Tàm tạm thôi, cảm ơn.", en: "So-so, thanks." },
      ]),
    ],
    listening: {
      sv: "God morgon, Anna! Hur mår du idag? Jag mår bra, tack. Ha en fin dag!",
      vi: "Chào buổi sáng Anna! Hôm nay bạn khoẻ không? Mình khoẻ, cảm ơn. Chúc ngày tốt lành!",
      en: "Good morning, Anna! How are you today? I'm fine, thanks. Have a nice day!",
      questions: [
        { q: "Đây là buổi nào trong ngày? / What time of day?", a: "Buổi sáng (god morgon)" },
        { q: "Câu chúc cuối là gì? / What's the closing wish?", a: "Ha en fin dag (chúc ngày tốt lành)" },
      ],
    },
    writing: {
      promptVi: "Viết hội thoại 4 lượt: chào → hỏi khoẻ → trả lời → tạm biệt.",
      promptEn: "Write a 4-turn dialog: greet → ask → reply → bye.",
      sampleSv: "- Hej! Hur mår du?\n- Bra, tack. Och du?\n- Också bra. Vi ses!\n- Hej då!",
      sampleVi: "- Chào! Bạn khoẻ không?\n- Khoẻ, cảm ơn. Còn bạn?\n- Cũng khoẻ. Hẹn gặp lại!\n- Tạm biệt!",
      sampleEn: "- Hi! How are you?\n- Good, thanks. And you?\n- Also good. See you!\n- Bye!",
    },
    selfCheck: [
      qa("Cách chào buổi sáng? / Morning greeting?", "god morgon"),
      qa("Cảm ơn rất nhiều (mạnh hơn 'tack')? / Stronger 'thanks'?", "tack så mycket / tusen tack"),
      qa("'Vi ses' nghĩa là gì? / Meaning of 'vi ses'?", "Hẹn gặp lại / See you"),
      qa("'Hej då' khác 'hej' chỗ nào? / Difference?", "'hej' = chào, 'hej då' = tạm biệt"),
    ],
  },
  3: {
    patterns: [
      p("Jag heter ___ och jag är ___ år.", "Tôi tên ___ và ___ tuổi.", "I'm ___ and I'm ___ years old.", [
        { sv: "Jag heter Mai och jag är tjugofem år.", ipa: "/jaɡ heːtɛr mɑːiː ɔɕ jaɡ ɛr ɕʉːɡuːfɛm ɔr./", vi: "Tôi tên Mai và 25 tuổi.", en: "I'm Mai and 25 years old." },
      ]),
      p("Jag kommer från ___ .", "Tôi đến từ ___ .", "I come from ___.", [
        { sv: "Jag kommer från Vietnam.", ipa: "/jaɡ kɔmɛr frɔn viːɛtnam./", vi: "Tôi đến từ Việt Nam.", en: "I come from Vietnam." },
        { sv: "Jag kommer från Hanoi.", ipa: "/jaɡ kɔmɛr frɔn hɑːnuːiː./", vi: "Tôi đến từ Hà Nội.", en: "I come from Hanoi." },
      ]),
    ],
    listening: {
      sv: "Jag heter Olof. Jag är trettio år. Jag kommer från Göteborg och jobbar som lärare.",
      vi: "Tôi tên Olof. 30 tuổi. Đến từ Göteborg, làm giáo viên.",
      en: "I'm Olof. 30 years old. From Göteborg, work as a teacher.",
      questions: [
        { q: "Olof bao nhiêu tuổi? / How old?", a: "30 (trettio)" },
        { q: "Olof làm nghề gì? / Job?", a: "Lärare (giáo viên)" },
      ],
    },
    writing: {
      promptVi: "Viết đoạn 4 câu giới thiệu bản thân (tên, tuổi, quê quán, nghề).",
      promptEn: "Write a 4-sentence self-intro (name, age, origin, job).",
      sampleSv: "Jag heter Linh. Jag är tjugoåtta år. Jag kommer från Vietnam. Jag jobbar som ingenjör.",
      sampleVi: "Tôi tên Linh. 28 tuổi. Đến từ Việt Nam. Tôi là kỹ sư.",
      sampleEn: "I'm Linh. 28 years old. From Vietnam. I work as an engineer.",
    },
    selfCheck: [
      qa("'Jag heter' nghĩa là? / Meaning?", "Tôi tên là / My name is"),
      qa("Hỏi tuổi: ___? / Asking age?", "Hur gammal är du?"),
      qa("'kommer från' = ?", "đến từ / come from"),
      qa("Nghề giáo viên (sv)?", "lärare"),
    ],
  },
  4: {
    patterns: [
      p("Det är ___ .", "Đây là ___ .", "It is ___.", [
        { sv: "Det är en bok.", ipa: "/dɛt ɛr ɛn bɔk./", vi: "Đây là 1 cuốn sách.", en: "It's a book." },
        { sv: "Det är ett bord.", ipa: "/dɛt ɛr ɛt bɔɖ./", vi: "Đây là 1 cái bàn.", en: "It's a table." },
      ]),
      p("___ är ___ .", "___ thì ___ .", "___ is ___.", [
        { sv: "Bilen är röd.", ipa: "/biːlɛn ɛr rœd./", vi: "Cái xe màu đỏ.", en: "The car is red." },
        { sv: "Huset är stort.", ipa: "/hʉːsɛt ɛr stɔʈ./", vi: "Ngôi nhà to.", en: "The house is big." },
      ]),
    ],
    listening: {
      sv: "Det här är ett hus. Huset är stort och vitt. Där bor min familj.",
      vi: "Đây là ngôi nhà. Nhà to và trắng. Gia đình tôi sống ở đó.",
      en: "This is a house. The house is big and white. My family lives there.",
      questions: [
        { q: "Ngôi nhà có màu gì? / Color?", a: "Vitt (trắng)" },
        { q: "Ai sống ở đó? / Who lives there?", a: "Min familj (gia đình tôi)" },
      ],
    },
    writing: {
      promptVi: "Viết 4 câu tả 1 vật quanh bạn dùng en/ett + tính từ.",
      promptEn: "Write 4 sentences describing an object using en/ett + adjectives.",
      sampleSv: "Det är en kopp. Koppen är blå. Den är liten men fin. Jag dricker kaffe ur den.",
      sampleVi: "Đây là 1 cái cốc. Cốc màu xanh. Nó nhỏ nhưng đẹp. Tôi uống cà phê bằng nó.",
      sampleEn: "It's a cup. The cup is blue. It's small but nice. I drink coffee from it.",
    },
    selfCheck: [
      qa("'en bil' khác 'ett hus' chỗ nào? / Difference?", "Giống ngữ pháp - 'en' (chung) vs 'ett' (trung)."),
      qa("Đại từ 'cái này'? / This?", "det här / den här"),
      qa("Số nhiều 'bilar' nghĩa là? / Plural?", "Những chiếc xe / cars"),
      qa("'stor' (lớn) - dạng trung? / Neuter form?", "stort"),
    ],
  },
  5: {
    patterns: [
      p("Jag har ___ .", "Tôi có ___ .", "I have ___.", [
        { sv: "Jag har en katt.", ipa: "/jaɡ har ɛn kat./", vi: "Tôi có 1 con mèo.", en: "I have a cat." },
        { sv: "Jag har två syskon.", ipa: "/jaɡ har tvɔ sʏskɔn./", vi: "Tôi có 2 anh chị em.", en: "I have 2 siblings." },
      ]),
      p("Min ___ heter ___ .", "___ của tôi tên ___ .", "My ___ is named ___.", [
        { sv: "Min mamma heter Hoa.", ipa: "/mɪn mama heːtɛr huːɑː./", vi: "Mẹ tôi tên Hoa.", en: "My mom is Hoa." },
        { sv: "Min bror heter Nam.", ipa: "/mɪn brɔr heːtɛr nam./", vi: "Anh tôi tên Nam.", en: "My brother is Nam." },
      ]),
    ],
    listening: {
      sv: "Jag har en stor familj. Min pappa heter Karl och min mamma heter Eva. Jag har två bröder.",
      vi: "Tôi có 1 gia đình lớn. Bố tên Karl, mẹ tên Eva. Tôi có 2 anh em trai.",
      en: "I have a big family. Dad's Karl, mom's Eva. I have 2 brothers.",
      questions: [
        { q: "Có bao nhiêu anh em? / How many brothers?", a: "Hai (två)" },
        { q: "Mẹ tên gì? / Mom's name?", a: "Eva" },
      ],
    },
    writing: {
      promptVi: "Viết 5 câu về gia đình bạn (bố, mẹ, anh/chị/em, tên, tuổi).",
      promptEn: "Write 5 sentences about your family.",
      sampleSv: "Min familj är liten. Min pappa heter Tuan, han är femtio år. Min mamma heter Hoa. Jag har en lillasyster. Hon heter Mai och är tjugo år.",
      sampleVi: "Gia đình tôi nhỏ. Bố tôi tên Tuan, 50 tuổi. Mẹ tôi tên Hoa. Tôi có 1 em gái. Em tên Mai, 20 tuổi.",
      sampleEn: "My family is small. Dad's Tuan, 50. Mom's Hoa. I have a little sister Mai, 20.",
    },
    selfCheck: [
      qa("'Jag har' = ?", "Tôi có / I have"),
      qa("Sở hữu 'của tôi' (chung)? / Possessive 'my'?", "min (en-word), mitt (ett-word), mina (số nhiều)"),
      qa("Em trai (sv)?", "lillebror / lillbror"),
      qa("Vợ (sv)?", "fru"),
    ],
  },
  6: {
    patterns: [
      p("Klockan är ___ .", "Bây giờ là ___ giờ.", "It's ___ o'clock.", [
        { sv: "Klockan är sju.", ipa: "/klɔkkan ɛr ɧʉː./", vi: "Bây giờ 7 giờ.", en: "It's 7." },
        { sv: "Klockan är halv åtta.", ipa: "/klɔkkan ɛr halv ɔtɑː./", vi: "Bây giờ 7 rưỡi.", en: "It's half past 7." },
      ]),
      p("Idag är det ___ .", "Hôm nay là ___ .", "Today is ___.", [
        { sv: "Idag är det måndag.", ipa: "/iːdaɡ ɛr dɛt mɔndaɡ./", vi: "Hôm nay thứ Hai.", en: "Today is Monday." },
      ]),
    ],
    listening: {
      sv: "Klockan är åtta på morgonen. Idag är det tisdag. Jag ska jobba.",
      vi: "8 giờ sáng. Hôm nay thứ Ba. Tôi sẽ đi làm.",
      en: "It's 8 am. Today is Tuesday. I'll go to work.",
      questions: [
        { q: "Mấy giờ? / What time?", a: "8 giờ (klockan åtta)" },
        { q: "Thứ mấy? / What day?", a: "Thứ Ba (tisdag)" },
      ],
    },
    writing: {
      promptVi: "Viết 4 câu mô tả lịch 1 ngày của bạn (giờ + hoạt động).",
      promptEn: "Write 4 sentences about your day (time + activity).",
      sampleSv: "Klockan sju vaknar jag. Halv åtta äter jag frukost. Klockan nio jobbar jag. På kvällen läser jag en bok.",
      sampleVi: "7 giờ tôi dậy. 7h30 ăn sáng. 9 giờ tôi làm việc. Buổi tối đọc sách.",
      sampleEn: "I wake at 7. Eat at 7:30. Work at 9. Read in the evening.",
    },
    selfCheck: [
      qa("Thứ Hai (sv)?", "måndag"),
      qa("Tháng Một (sv)?", "januari"),
      qa("'halv åtta' = mấy giờ?", "7h30 (Thụy Điển nói 'nửa đến 8')"),
      qa("Mùa hè (sv)?", "sommar"),
    ],
  },
  7: {
    patterns: [
      p("Är du ___ ?", "Bạn có ___ không?", "Are you ___?", [
        { sv: "Är du svensk?", ipa: "/ɛr dɵ svɛnsk?/", vi: "Bạn là người Thụy Điển à?", en: "Are you Swedish?" },
      ]),
      p("Ja, jag är ___ . / Nej, jag är inte ___ .", "Có / Không.", "Yes / No.", [
        { sv: "Ja, jag är student.", ipa: "/ja, jaɡ ɛr stʉːdɛnt./", vi: "Có, tôi là sinh viên.", en: "Yes, I'm a student." },
        { sv: "Nej, jag är inte lärare.", ipa: "/nɛj, jaɡ ɛr ɪntɛ lɛːrɑːreː./", vi: "Không, tôi không phải giáo viên.", en: "No, I'm not a teacher." },
      ]),
    ],
    listening: {
      sv: "Är du svensk? Nej, jag är vietnames. Jag bor i Sverige sedan två år.",
      vi: "Bạn là người Thụy Điển à? Không, người Việt. Tôi sống ở Thụy Điển 2 năm rồi.",
      en: "Are you Swedish? No, Vietnamese. Lived in Sweden for 2 years.",
      questions: [
        { q: "Người này quốc tịch gì? / Nationality?", a: "Vietnames (Việt Nam)" },
        { q: "Đã sống bao lâu? / How long?", a: "2 năm" },
      ],
    },
    writing: {
      promptVi: "Viết 3 câu hỏi Y/N + đáp án mẫu.",
      promptEn: "Write 3 yes/no questions + sample answers.",
      sampleSv: "Är du student? Ja, det är jag. - Talar du svenska? Lite. - Bor du i Stockholm? Nej, jag bor i Göteborg.",
      sampleVi: "Bạn là sinh viên? Có. - Bạn nói tiếng Thụy Điển? Một chút. - Sống ở Stockholm? Không, ở Göteborg.",
      sampleEn: "Are you a student? Yes. - Do you speak Swedish? A little. - Live in Stockholm? No, Göteborg.",
    },
    selfCheck: [
      qa("Đảo trật tự để tạo câu hỏi Y/N? / Inversion?", "Động từ ra trước chủ ngữ: 'Är du ...?'"),
      qa("Phủ định = ?", "inte (đứng sau động từ)"),
      qa("'Talar du engelska?' nghĩa?", "Bạn nói tiếng Anh không?"),
      qa("Đáp ngắn 'có' khi được hỏi 'Är du ...?'", "Ja, det är jag."),
    ],
  },
  /* ============================ TUẦN 2 ============================ */
  8: {
    patterns: [
      p("Vad kostar ___ ?", "___ giá bao nhiêu?", "How much is ___?", [
        { sv: "Vad kostar mjölken?", ipa: "/vad kɔstar mjœlɕɛn?/", vi: "Sữa bao nhiêu tiền?", en: "How much is the milk?" },
      ]),
      p("Det kostar ___ kronor.", "Giá ___ vương miện.", "It costs ___ kronor.", [
        { sv: "Det kostar tjugofem kronor.", ipa: "/dɛt kɔstar ɕʉːɡuːfɛm kruːnɔr./", vi: "25 kr.", en: "25 kr." },
      ]),
    ],
    listening: {
      sv: "Hej! Vad kostar äpplena? De kostar femton kronor per kilo. Jag tar två kilo, tack.",
      vi: "Chào! Táo bao nhiêu? 15kr/kg. Tôi lấy 2 kg.",
      en: "Hi! How much are apples? 15 kr/kg. I'll take 2 kg.",
      questions: [
        { q: "Giá táo? / Apple price?", a: "15 kr/kg" },
        { q: "Mua mấy kg? / How many kg?", a: "2 kg" },
      ],
    },
    writing: {
      promptVi: "Viết hội thoại mua 3 món ở siêu thị + tổng tiền.",
      promptEn: "Write a dialog buying 3 items + total.",
      sampleSv: "- Hej! Jag vill ha bröd, mjölk och ost. - Det blir femtio kronor. - Här är pengarna, tack.",
      sampleVi: "- Chào! Tôi muốn bánh mì, sữa, phô mai. - 50 kr. - Đây tiền, cảm ơn.",
      sampleEn: "- Hi! I want bread, milk, cheese. - 50 kr. - Here's the money.",
    },
    selfCheck: [
      qa("'kostar' = ?", "có giá / costs"),
      qa("Tiền Thụy Điển?", "kronor (SEK)"),
      qa("Số 100 (sv)?", "hundra"),
      qa("'kassa' = ?", "Quầy thu ngân"),
    ],
  },
  9: {
    patterns: [
      p("Jag vill ha ___ , tack.", "Cho tôi ___ , cảm ơn.", "I'd like ___, please.", [
        { sv: "Jag vill ha en kaffe, tack.", ipa: "/jaɡ vɪl hɑː ɛn kafɛ, takk./", vi: "Cho tôi 1 cà phê.", en: "A coffee, please." },
        { sv: "Jag vill ha en kanelbulle.", ipa: "/jaɡ vɪl hɑː ɛn kɑːnɛlbɵleː./", vi: "Cho 1 bánh quế.", en: "A cinnamon bun." },
      ]),
      p("Får jag ___ ?", "Tôi có thể ___ được không?", "May I ___?", [
        { sv: "Får jag betala?", ipa: "/fɔr jaɡ beːtɑːlɑː?/", vi: "Cho tôi thanh toán?", en: "May I pay?" },
      ]),
    ],
    listening: {
      sv: "På caféet beställer Linh en kaffe och en kanelbulle. Det kostar fyrtio kronor. Hon betalar med kort.",
      vi: "Ở quán Linh gọi 1 cà phê + 1 bánh quế. 40 kr. Trả bằng thẻ.",
      en: "At café Linh orders coffee + bun. 40 kr. Pays by card.",
      questions: [
        { q: "Tổng tiền? / Total?", a: "40 kr" },
        { q: "Trả thế nào? / Payment?", a: "Bằng thẻ (med kort)" },
      ],
    },
    writing: {
      promptVi: "Viết hội thoại gọi đồ ở quán fika (3-4 lượt).",
      promptEn: "Write a fika ordering dialog (3-4 turns).",
      sampleSv: "- Hej! Vad får det vara? - En kaffe och en kanelbulle, tack. - Något mer? - Nej tack, det är allt.",
      sampleVi: "- Chào! Anh dùng gì? - 1 cà phê + 1 bánh quế. - Còn gì nữa? - Hết rồi, cảm ơn.",
      sampleEn: "- Hi! What can I get? - Coffee + bun. - Anything else? - No thanks.",
    },
    selfCheck: [
      qa("Fika nghĩa là gì?", "Nghỉ giải lao cà phê + bánh, văn hoá Thụy Điển"),
      qa("'kanelbulle' = ?", "Bánh quế Thụy Điển"),
      qa("Thanh toán thẻ?", "betala med kort"),
      qa("'något mer?' = ?", "Còn gì nữa không?"),
    ],
  },
  10: {
    patterns: [
      p("Var ligger ___ ?", "___ ở đâu?", "Where is ___?", [
        { sv: "Var ligger tunnelbanan?", ipa: "/var lɪɡɛr tɵnɛlbɑːnan?/", vi: "Tàu điện ở đâu?", en: "Where's the metro?" },
      ]),
      p("Gå ___ och sväng ___ .", "Đi ___ rồi rẽ ___ .", "Go ___ then turn ___.", [
        { sv: "Gå rakt fram och sväng höger.", ipa: "/ɡɔ rakt fram ɔɕ svɛŋ høːjɛr./", vi: "Đi thẳng rồi rẽ phải.", en: "Go straight then right." },
      ]),
    ],
    listening: {
      sv: "Ursäkta, var ligger Centralstationen? Gå rakt fram två kvarter och sväng vänster. Tack så mycket!",
      vi: "Xin lỗi, ga trung tâm ở đâu? Đi thẳng 2 dãy nhà rồi rẽ trái. Cảm ơn nhiều!",
      en: "Excuse me, where's Central Station? Straight 2 blocks then left. Thanks!",
      questions: [
        { q: "Đi mấy dãy nhà? / How many blocks?", a: "2 (två kvarter)" },
        { q: "Rẽ hướng nào? / Direction?", a: "Trái (vänster)" },
      ],
    },
    writing: {
      promptVi: "Viết 3 câu chỉ đường từ nhà bạn ra siêu thị gần nhất.",
      promptEn: "Write 3 sentences directing to nearest supermarket.",
      sampleSv: "Gå ut från huset och sväng höger. Gå rakt fram hundra meter. ICA ligger på vänster sida.",
      sampleVi: "Ra khỏi nhà, rẽ phải. Đi thẳng 100m. ICA bên trái.",
      sampleEn: "Exit, turn right. Go straight 100m. ICA is on the left.",
    },
    selfCheck: [
      qa("Trái / phải (sv)?", "vänster / höger"),
      qa("'rakt fram' = ?", "Đi thẳng"),
      qa("Tàu điện ngầm (sv)?", "tunnelbana"),
      qa("'ursäkta' = ?", "Xin lỗi (làm phiền)"),
    ],
  },
  11: {
    patterns: [
      p("Jag äter ___ till ___ .", "Tôi ăn ___ vào ___ .", "I eat ___ for ___.", [
        { sv: "Jag äter gröt till frukost.", ipa: "/jaɡ ɛːtɛr ɡrœt tɪl frʉːkɔst./", vi: "Tôi ăn cháo yến mạch buổi sáng.", en: "Oats for breakfast." },
      ]),
      p("Jag dricker ___ .", "Tôi uống ___ .", "I drink ___.", [
        { sv: "Jag dricker te varje morgon.", ipa: "/jaɡ drɪkɕɛr tɛ varjɛ mɔrɡɔn./", vi: "Tôi uống trà mỗi sáng.", en: "Tea every morning." },
      ]),
    ],
    listening: {
      sv: "Till frukost äter jag bröd med ost. Sedan dricker jag kaffe. På lunchen äter jag sallad och kyckling.",
      vi: "Sáng tôi ăn bánh mì + phô mai. Sau đó uống cà phê. Trưa ăn salad + gà.",
      en: "Breakfast: bread with cheese. Then coffee. Lunch: salad + chicken.",
      questions: [
        { q: "Bữa sáng ăn gì? / Breakfast?", a: "Bánh mì + phô mai" },
        { q: "Bữa trưa? / Lunch?", a: "Salad + gà (kyckling)" },
      ],
    },
    writing: {
      promptVi: "Viết 4 câu kể bữa ăn cả ngày của bạn.",
      promptEn: "Write 4 sentences about your meals today.",
      sampleSv: "Till frukost äter jag bröd. På lunchen äter jag ris med fisk. Klockan tre dricker jag te. Till middag lagar jag soppa.",
      sampleVi: "Sáng tôi ăn bánh mì. Trưa ăn cơm cá. 3 giờ uống trà. Tối nấu súp.",
      sampleEn: "Breakfast bread. Lunch rice + fish. 3pm tea. Dinner soup.",
    },
    selfCheck: [
      qa("Ăn (động từ)?", "äta"),
      qa("Uống (động từ)?", "dricka"),
      qa("Bữa sáng / trưa / tối (sv)?", "frukost / lunch / middag"),
      qa("Phô mai (sv)?", "ost"),
    ],
  },
  12: {
    patterns: [
      p("Den / Det är ___ .", "Nó là ___ (màu / size).", "It is ___.", [
        { sv: "Tröjan är blå.", ipa: "/trøːjan ɛr bloː./", vi: "Áo màu xanh.", en: "The sweater is blue." },
        { sv: "Huset är stort.", ipa: "/hʉːsɛt ɛr stɔʈ./", vi: "Nhà to.", en: "The house is big." },
      ]),
      p("Jag har en ___ ___ .", "Tôi có 1 cái ___ ___ .", "I have a ___ ___.", [
        { sv: "Jag har en röd jacka.", ipa: "/jaɡ har ɛn rœd jakkɑː./", vi: "Tôi có 1 áo khoác đỏ.", en: "I have a red jacket." },
      ]),
    ],
    listening: {
      sv: "Min nya tröja är blå. Skorna är svarta. Jag har också en grön mössa.",
      vi: "Áo mới màu xanh. Giày đen. Tôi còn có mũ xanh lá.",
      en: "New sweater is blue. Shoes black. Also a green hat.",
      questions: [
        { q: "Màu của giày? / Shoes color?", a: "Đen (svarta)" },
        { q: "Mũ màu gì? / Hat?", a: "Xanh lá (grön)" },
      ],
    },
    writing: {
      promptVi: "Viết 4 câu tả trang phục bạn đang mặc (màu sắc).",
      promptEn: "Write 4 sentences about what you're wearing.",
      sampleSv: "Idag har jag en vit skjorta. Mina byxor är blå. Mina skor är bruna. Jag har också en svart väska.",
      sampleVi: "Hôm nay tôi mặc áo trắng. Quần xanh. Giày nâu. Tôi cũng có 1 cái túi đen.",
      sampleEn: "Today: white shirt, blue pants, brown shoes, black bag.",
    },
    selfCheck: [
      qa("Đỏ / xanh dương / xanh lá (sv)?", "röd / blå / grön"),
      qa("'tröja' = ?", "Áo len / áo nỉ"),
      qa("Tính từ trung (ett-word) thêm gì?", "Thêm -t: stor → stort"),
      qa("Số nhiều tính từ?", "Thêm -a: stora"),
    ],
  },
  13: {
    patterns: [
      p("Vilket väder är det idag?", "Hôm nay thời tiết thế nào?", "What's the weather?", [
        { sv: "Det är soligt idag.", ipa: "/dɛt ɛr suːlɪɡt iːdaɡ./", vi: "Hôm nay nắng.", en: "Sunny today." },
      ]),
      p("Det ___ .", "Trời ___ .", "It is ___.", [
        { sv: "Det regnar.", ipa: "/dɛt rɛŋnar./", vi: "Trời mưa.", en: "It rains." },
        { sv: "Det snöar.", ipa: "/dɛt snøːar./", vi: "Trời tuyết.", en: "It snows." },
      ]),
    ],
    listening: {
      sv: "Idag är det kallt och det snöar. Temperaturen är minus fem grader. Glöm inte mössan!",
      vi: "Hôm nay lạnh và có tuyết. Nhiệt độ -5 độ. Đừng quên mũ!",
      en: "Cold and snowing. -5°C. Don't forget your hat!",
      questions: [
        { q: "Nhiệt độ? / Temperature?", a: "-5 (minus fem grader)" },
        { q: "Trời thế nào? / Weather?", a: "Tuyết (snöar)" },
      ],
    },
    writing: {
      promptVi: "Viết 4 câu mô tả thời tiết 4 mùa ở Thụy Điển.",
      promptEn: "Write 4 sentences about Sweden's 4 seasons.",
      sampleSv: "På våren regnar det ofta. På sommaren är det varmt och soligt. På hösten blåser det. På vintern snöar det mycket.",
      sampleVi: "Mùa xuân hay mưa. Hè nóng và nắng. Thu có gió. Đông tuyết nhiều.",
      sampleEn: "Spring rains. Summer warm/sunny. Autumn windy. Winter snowy.",
    },
    selfCheck: [
      qa("Nắng / mưa / tuyết (sv)?", "soligt / regnar / snöar"),
      qa("Mùa đông (sv)?", "vinter"),
      qa("'kallt' / 'varmt' = ?", "lạnh / ấm"),
      qa("Nhiệt độ âm 5 độ?", "minus fem grader"),
    ],
  },
  14: {
    patterns: [
      p("Sammanfatta vad du lärt: jag kan ___ .", "Tổng kết: tôi đã biết ___ .", "I learned to ___.", [
        { sv: "Jag kan presentera mig själv.", ipa: "/jaɡ kan preːsɛnteːra mɪɡ ɧɛlv./", vi: "Tôi tự giới thiệu được.", en: "Self-intro." },
      ]),
    ],
    listening: {
      sv: "Den här veckan har jag lärt mig att hälsa, beställa kaffe, fråga vägen och prata om vädret. Bra jobbat!",
      vi: "Tuần này tôi học chào hỏi, gọi cà phê, hỏi đường, thời tiết. Tốt!",
      en: "This week: greet, order coffee, ask directions, weather. Good job!",
      questions: [
        { q: "Học mấy chủ đề chính? / How many topics?", a: "4 (chào, cà phê, đường, thời tiết)" },
        { q: "Câu khen? / Praise?", a: "Bra jobbat!" },
      ],
    },
    writing: {
      promptVi: "Viết 5 câu tự kể lại tuần 1-2 đã học và 1 mục tiêu tuần 3.",
      promptEn: "Write 5 sentences recapping weeks 1-2 + 1 goal.",
      sampleSv: "Vecka ett lärde jag mig hälsningar. Vecka två kunde jag handla mat. Jag kan beställa kaffe nu. Jag kan fråga vägen. Nästa vecka vill jag lära mig om kroppen.",
      sampleVi: "Tuần 1 học chào. Tuần 2 đi chợ. Giờ tôi gọi cà phê được. Hỏi đường được. Tuần sau muốn học về cơ thể.",
      sampleEn: "Week 1 greetings. Week 2 shopping. Now I order coffee. Ask directions. Next week: body.",
    },
    selfCheck: [
      qa("'jag kan' = ?", "Tôi có thể / I can"),
      qa("'lärt mig' = ?", "Đã học / learned"),
      qa("Số 1-10 (sv)?", "ett-två-tre-fyra-fem-sex-sju-åtta-nio-tio"),
      qa("Đếm ngày trong tuần?", "7 (sju)"),
    ],
  },
  /* ============================ TUẦN 3 ============================ */
  15: {
    patterns: [
      p("Jag har ont i ___ .", "Tôi đau ___ .", "I have pain in ___.", [
        { sv: "Jag har ont i huvudet.", ipa: "/jaɡ har ɔnt ɪ hʉːvʉːdɛt./", vi: "Tôi đau đầu.", en: "Headache." },
        { sv: "Jag har ont i magen.", ipa: "/jaɡ har ɔnt ɪ mɑːjɛn./", vi: "Tôi đau bụng.", en: "Stomachache." },
      ]),
      p("Min ___ värker.", "___ của tôi nhức.", "My ___ aches.", [
        { sv: "Min rygg värker.", ipa: "/mɪn rʏɡ vɛrɕɛr./", vi: "Lưng tôi nhức.", en: "Back aches." },
      ]),
    ],
    listening: {
      sv: "Doktorn, jag har ont i halsen och feber. Jag har hostat i tre dagar. Kan du hjälpa mig?",
      vi: "Bác sĩ, tôi đau họng và sốt. Ho 3 ngày rồi. Giúp tôi được không?",
      en: "Doctor, sore throat + fever. Coughing for 3 days. Can you help?",
      questions: [
        { q: "Triệu chứng? / Symptoms?", a: "Đau họng + sốt + ho" },
        { q: "Bao lâu? / How long?", a: "3 ngày (tre dagar)" },
      ],
    },
    writing: {
      promptVi: "Viết 4 câu mô tả tình trạng sức khoẻ khi đi khám.",
      promptEn: "Write 4 sentences describing a clinic visit.",
      sampleSv: "Hej doktor. Jag mår inte bra. Jag har ont i magen och feber. Jag behöver hjälp.",
      sampleVi: "Chào bác sĩ. Tôi không khoẻ. Đau bụng + sốt. Tôi cần giúp.",
      sampleEn: "Hi doctor. Not feeling well. Stomachache + fever. Need help.",
    },
    selfCheck: [
      qa("Đầu / bụng / lưng (sv)?", "huvud / mage / rygg"),
      qa("'feber' = ?", "Sốt"),
      qa("Bác sĩ (sv)?", "läkare / doktor"),
      qa("'Jag mår inte bra' = ?", "Tôi không khoẻ"),
    ],
  },
  16: {
    patterns: [
      p("Mitt hem har ___ .", "Nhà tôi có ___ .", "My home has ___.", [
        { sv: "Mitt hem har två rum.", ipa: "/mɪt hɛm har tvɔ rɵm./", vi: "Nhà tôi 2 phòng.", en: "2 rooms." },
      ]),
      p("I ___ finns det ___ .", "Trong ___ có ___ .", "In ___ there is ___.", [
        { sv: "I köket finns det ett bord.", ipa: "/ɪ ɕøːɕɛt fɪns dɛt ɛt bɔɖ./", vi: "Bếp có 1 cái bàn.", en: "Kitchen has a table." },
      ]),
    ],
    listening: {
      sv: "Min lägenhet är liten men mysig. Det finns ett sovrum, ett kök och ett badrum. Jag har en stor balkong.",
      vi: "Căn hộ nhỏ nhưng ấm cúng. 1 phòng ngủ, bếp, phòng tắm. Có ban công lớn.",
      en: "Small but cozy. 1 bedroom, kitchen, bath. Big balcony.",
      questions: [
        { q: "Bao nhiêu phòng ngủ? / Bedrooms?", a: "1 (ett sovrum)" },
        { q: "Có ban công không? / Balcony?", a: "Có, lớn (stor balkong)" },
      ],
    },
    writing: {
      promptVi: "Viết 5 câu mô tả nhà bạn (phòng, đồ đạc, màu sắc).",
      promptEn: "Write 5 sentences about your home.",
      sampleSv: "Mitt hus är litet. Det har två sovrum och ett kök. Köket är vitt. I vardagsrummet finns en soffa. Jag älskar mitt hem.",
      sampleVi: "Nhà tôi nhỏ. 2 phòng ngủ + bếp. Bếp trắng. Phòng khách có sofa. Tôi yêu nhà mình.",
      sampleEn: "Small house. 2 bedrooms + kitchen. White kitchen. Living room has sofa. Love my home.",
    },
    selfCheck: [
      qa("Bếp / phòng tắm / phòng khách (sv)?", "kök / badrum / vardagsrum"),
      qa("'sovrum' = ?", "Phòng ngủ"),
      qa("'finns det' = ?", "Có (there is/are)"),
      qa("'mysig' = ?", "Ấm cúng (rất Thụy Điển!)"),
    ],
  },
  17: {
    patterns: [
      p("Jag jobbar som ___ .", "Tôi làm ___ .", "I work as ___.", [
        { sv: "Jag jobbar som lärare.", ipa: "/jaɡ jɔbar sɔm lɛːrɑːreː./", vi: "Tôi là giáo viên.", en: "I'm a teacher." },
      ]),
      p("Jag jobbar på ___ .", "Tôi làm ở ___ .", "I work at ___.", [
        { sv: "Jag jobbar på sjukhus.", ipa: "/jaɡ jɔbar pɔ ɧɵkhɵs./", vi: "Làm ở bệnh viện.", en: "At a hospital." },
      ]),
    ],
    listening: {
      sv: "Jag jobbar som ingenjör på ett tech-företag. Jag börjar klockan nio och slutar fem. Det är ett bra jobb.",
      vi: "Tôi làm kỹ sư ở 1 công ty công nghệ. Bắt đầu 9 giờ, kết thúc 5 giờ. Công việc tốt.",
      en: "Engineer at a tech company. 9-5. Good job.",
      questions: [
        { q: "Nghề gì? / Job?", a: "Kỹ sư (ingenjör)" },
        { q: "Giờ làm? / Hours?", a: "9-5" },
      ],
    },
    writing: {
      promptVi: "Viết 5 câu về công việc của bạn (nghề, nơi, giờ, đồng nghiệp, cảm nhận).",
      promptEn: "Write 5 sentences about your job.",
      sampleSv: "Jag jobbar som lärare på en skola. Jag börjar klockan åtta. Mina kollegor är trevliga. Jag älskar att lära ut. Jobbet är roligt men tröttsamt.",
      sampleVi: "Tôi là giáo viên ở 1 trường. Bắt đầu 8h. Đồng nghiệp tốt. Tôi yêu việc dạy. Vui nhưng mệt.",
      sampleEn: "Teacher at a school. Start 8. Nice colleagues. Love teaching. Fun but tiring.",
    },
    selfCheck: [
      qa("'jobbar' = ?", "Làm việc / work"),
      qa("Giáo viên / bác sĩ / kỹ sư (sv)?", "lärare / läkare / ingenjör"),
      qa("Đồng nghiệp (sv)?", "kollega"),
      qa("'företag' = ?", "Công ty"),
    ],
  },
  18: {
    patterns: [
      p("På fritiden ___ jag ___ .", "Rảnh rỗi tôi ___ .", "In free time I ___.", [
        { sv: "På fritiden läser jag böcker.", ipa: "/pɔ friːtiːdɛn lɛːsɛr jaɡ bœkɕɛr./", vi: "Rảnh tôi đọc sách.", en: "Read books." },
      ]),
      p("Jag tycker om att ___ .", "Tôi thích ___ .", "I like to ___.", [
        { sv: "Jag tycker om att simma.", ipa: "/jaɡ tʏkɕɛr ɔm at sɪmɑː./", vi: "Tôi thích bơi.", en: "Like swimming." },
      ]),
    ],
    listening: {
      sv: "På helgen tycker jag om att vandra i skogen. Jag spelar också gitarr och lyssnar på musik. Det är mysigt.",
      vi: "Cuối tuần tôi thích đi rừng. Tôi cũng chơi guitar và nghe nhạc. Rất thư giãn.",
      en: "Weekends: hiking, guitar, music. Very cozy.",
      questions: [
        { q: "3 sở thích? / 3 hobbies?", a: "Vandra, spela gitarr, lyssna på musik" },
        { q: "'mysigt' = ?", a: "Ấm cúng/thư giãn" },
      ],
    },
    writing: {
      promptVi: "Viết 5 câu về sở thích rảnh rỗi của bạn.",
      promptEn: "Write 5 sentences about your hobbies.",
      sampleSv: "På fritiden läser jag romaner. Jag tycker om att laga mat. På helgen springer jag i parken. Ibland ser jag film. Jag älskar musik.",
      sampleVi: "Rảnh tôi đọc tiểu thuyết. Thích nấu ăn. Cuối tuần chạy bộ trong công viên. Đôi khi xem phim. Yêu âm nhạc.",
      sampleEn: "Read novels. Like cooking. Weekend running. Sometimes movies. Love music.",
    },
    selfCheck: [
      qa("'fritid' = ?", "Thời gian rảnh"),
      qa("'tycker om' = ?", "Thích / like"),
      qa("Bơi / chạy (động từ)?", "simma / springa"),
      qa("Rừng (sv)?", "skog"),
    ],
  },
  19: {
    patterns: [
      p("Jag ska ___ ikväll.", "Tối nay tôi sẽ ___ .", "I will ___ tonight.", [
        { sv: "Jag ska träffa en vän ikväll.", ipa: "/jaɡ ska trɛfɑː ɛn vɛn ɪkvɛl./", vi: "Tối tôi sẽ gặp bạn.", en: "Meet a friend tonight." },
      ]),
      p("Vill du ___ ?", "Bạn muốn ___ không?", "Want to ___?", [
        { sv: "Vill du gå på bio?", ipa: "/vɪl dɵ ɡɔ pɔ biːuː?/", vi: "Đi xem phim không?", en: "Wanna go to cinema?" },
      ]),
    ],
    listening: {
      sv: "Hej Anna! Vill du gå på bio ikväll? Ja, gärna! Vi ses klockan sju vid stationen. Perfekt!",
      vi: "Chào Anna! Đi xem phim không? Có chứ! 7 giờ ở ga. Hoàn hảo!",
      en: "Hi Anna! Cinema tonight? Yes! 7 at station. Perfect!",
      questions: [
        { q: "Đi đâu? / Where?", a: "Bio (rạp phim)" },
        { q: "Mấy giờ? / What time?", a: "7 giờ" },
      ],
    },
    writing: {
      promptVi: "Viết tin nhắn hẹn bạn đi chơi cuối tuần.",
      promptEn: "Write a text inviting a friend out.",
      sampleSv: "Hej Erik! Vill du gå på fika på lördag? Vi kan träffas på Espresso House klockan tre. Hör av dig!",
      sampleVi: "Chào Erik! Thứ 7 đi fika không? Gặp ở Espresso House 3h. Trả lời nhé!",
      sampleEn: "Hi Erik! Fika Saturday? Espresso House 3pm. Let me know!",
    },
    selfCheck: [
      qa("'ska' = ?", "Sẽ / will (tương lai gần)"),
      qa("'Vill du' = ?", "Bạn muốn ... không?"),
      qa("Đáp lời mời tích cực?", "Ja, gärna! (Có, rất sẵn lòng!)"),
      qa("'bio' = ?", "Rạp chiếu phim"),
    ],
  },
  20: {
    patterns: [
      p("Idag är det ___ .", "Hôm nay là ___ .", "Today is ___.", [
        { sv: "Idag är det midsommar.", ipa: "/iːdaɡ ɛr dɛt mɪdsɔmar./", vi: "Hôm nay là Hạ chí.", en: "Midsummer." },
      ]),
      p("Vi firar ___ med ___ .", "Chúng ta đón ___ với ___ .", "We celebrate ___ with ___.", [
        { sv: "Vi firar jul med familjen.", ipa: "/vɪ fiːrar jɵl mɛd fɑːmɪljɛn./", vi: "Chúng tôi đón Noel với gia đình.", en: "Christmas with family." },
      ]),
    ],
    listening: {
      sv: "Midsommar är den största festen i Sverige. Vi dansar runt midsommarstången, äter sill och dricker snaps.",
      vi: "Midsommar là lễ lớn nhất Thụy Điển. Múa quanh cây Midsommar, ăn cá trích, uống snaps.",
      en: "Midsummer is Sweden's biggest fest. Dance around pole, eat herring, drink snaps.",
      questions: [
        { q: "Lễ gì? / What festival?", a: "Midsommar (Hạ chí)" },
        { q: "Món ăn truyền thống? / Traditional food?", a: "Sill (cá trích)" },
      ],
    },
    writing: {
      promptVi: "Viết 5 câu mô tả 1 lễ Việt Nam cho bạn Thụy Điển.",
      promptEn: "Write 5 sentences describing a VN festival.",
      sampleSv: "Tet är Vietnams största fest. Vi firar nyår enligt månkalendern. Vi äter banh chung och röda kuvert ges till barnen. Familjen samlas. Det är magiskt.",
      sampleVi: "Tết là lễ lớn nhất Việt Nam. Chúng tôi đón năm mới âm lịch. Ăn bánh chưng, lì xì cho trẻ. Cả nhà sum họp. Rất thiêng liêng.",
      sampleEn: "Tet is VN's biggest fest. Lunar new year. Eat banh chung, red envelopes. Family gathers. Magical.",
    },
    selfCheck: [
      qa("Lễ lớn nhất Thụy Điển?", "Midsommar (Hạ chí, ngày dài nhất năm)"),
      qa("'fira' = ?", "Đón / celebrate"),
      qa("Noel (sv)?", "jul"),
      qa("'sill' = ?", "Cá trích muối"),
    ],
  },
  21: {
    patterns: [
      p("Förra veckan ___ jag ___ .", "Tuần trước tôi ___ .", "Last week I ___.", [
        { sv: "Förra veckan åkte jag till Malmö.", ipa: "/fœra vɛkkan ɔktɛ jaɡ tɪl malmøː./", vi: "Tuần trước tôi đi Malmö.", en: "Went to Malmö." },
      ]),
    ],
    listening: {
      sv: "I helgen träffade jag mina vänner. Vi åt middag och såg en film. Det var jätteroligt.",
      vi: "Cuối tuần tôi gặp bạn. Cùng ăn tối và xem phim. Rất vui.",
      en: "Met friends. Dinner + movie. Super fun.",
      questions: [
        { q: "Làm gì? / What did they do?", a: "Ăn tối + xem phim" },
        { q: "'jätteroligt' = ?", a: "Rất vui (jätte- = rất)" },
      ],
    },
    writing: {
      promptVi: "Viết 5 câu kể cuối tuần vừa qua (quá khứ đơn).",
      promptEn: "Write 5 past-tense sentences about last weekend.",
      sampleSv: "I lördags vaknade jag sent. Jag åt frukost klockan elva. Sedan gick jag till parken. På kvällen lagade jag pasta. Det var en bra dag.",
      sampleVi: "Thứ 7 tôi dậy muộn. 11h ăn sáng. Sau đó đi công viên. Tối nấu pasta. Ngày tuyệt vời.",
      sampleEn: "Sat: woke late. Breakfast 11. Walked park. Cooked pasta. Great day.",
    },
    selfCheck: [
      qa("Quá khứ của 'äter'?", "åt"),
      qa("Quá khứ của 'går'?", "gick"),
      qa("Tuần trước (sv)?", "förra veckan"),
      qa("'jätte-' tiếp đầu ngữ?", "Rất / super"),
    ],
  },
  /* ============================ TUẦN 4 ============================ */
  22: {
    patterns: [
      p("Vad heter du? / Var bor du? / Vad jobbar du med?", "Hỏi đời tư cơ bản.", "Basic small-talk Qs.", [
        { sv: "Hej, vad heter du?", ipa: "/hɛj, vad heːtɛr dʉː?/", vi: "Chào, bạn tên gì?", en: "Hi, your name?" },
      ]),
    ],
    listening: {
      sv: "Hej, jag heter Sara. Var kommer du ifrån? Jag är från Hanoi. Åh, vad spännande! Hur länge har du bott här?",
      vi: "Chào, Sara. Bạn từ đâu? Hà Nội. Ồ, thú vị! Sống ở đây bao lâu?",
      en: "Hi, Sara. Where from? Hanoi. Cool! How long here?",
      questions: [
        { q: "Hỏi gì? / Question?", a: "Quê quán + thời gian sống" },
        { q: "'spännande' = ?", a: "Thú vị / exciting" },
      ],
    },
    writing: {
      promptVi: "Viết hội thoại làm quen 6 lượt ở 1 buổi tiệc.",
      promptEn: "Write a 6-turn party intro dialog.",
      sampleSv: "- Hej! Jag heter Linh. - Hej Linh, jag är Maria. - Var kommer du ifrån? - Från Vietnam. Och du? - Jag är från Spanien. - Vad roligt!",
      sampleVi: "- Chào! Linh đây. - Chào Linh, Maria. - Bạn từ đâu? - VN. Còn bạn? - Tây Ban Nha. - Vui quá!",
      sampleEn: "- Hi! Linh. - Maria. - Where from? - Vietnam. You? - Spain. - Cool!",
    },
    selfCheck: [
      qa("'Var kommer du ifrån?' = ?", "Bạn từ đâu đến?"),
      qa("'spännande' = ?", "Thú vị"),
      qa("Đáp 'vui quá' (sv)?", "Vad roligt!"),
      qa("'Hur länge' = ?", "Bao lâu"),
    ],
  },
  23: {
    patterns: [
      p("Hej, det är ___ . Kan jag prata med ___ ?", "Chào, ___ đây. Cho gặp ___ ?", "Hi, ___ speaking. May I talk to ___?", [
        { sv: "Hej, det är Linh. Kan jag prata med Anna?", ipa: "/hɛj, dɛt ɛr lɪnh. kan jaɡ prɑːta mɛd anɑː?/", vi: "Linh đây, cho gặp Anna?", en: "Linh speaking, may I talk to Anna?" },
      ]),
    ],
    listening: {
      sv: "Hej, jag ringer från tandläkarmottagningen. Du har en tid imorgon klockan tre. Stämmer det?",
      vi: "Chào, tôi gọi từ phòng nha. Bạn có hẹn mai 3 giờ. Đúng không?",
      en: "Hi, dentist office calling. Appointment tomorrow 3pm. Correct?",
      questions: [
        { q: "Gọi từ đâu? / Calling from?", a: "Tandläkarmottagning (phòng nha)" },
        { q: "Giờ hẹn? / Appointment?", a: "Mai 3 giờ" },
      ],
    },
    writing: {
      promptVi: "Viết hội thoại điện thoại đặt lịch khám bệnh (5 lượt).",
      promptEn: "Write a phone dialog booking a clinic visit.",
      sampleSv: "- Vårdcentralen, hej. - Hej, jag vill boka en tid. - När passar det? - Imorgon eftermiddag. - Klockan två funkar. Tack!",
      sampleVi: "- Phòng khám xin nghe. - Tôi muốn đặt lịch. - Khi nào tiện? - Mai chiều. - 2 giờ được. Cảm ơn!",
      sampleEn: "- Clinic hi. - Want to book. - When? - Tomorrow afternoon. - 2pm works. Thanks!",
    },
    selfCheck: [
      qa("'Det är ___' khi gọi điện?", "___ đang nói / ___ speaking"),
      qa("'boka en tid' = ?", "Đặt lịch hẹn"),
      qa("'imorgon' = ?", "Ngày mai"),
      qa("'stämmer det?' = ?", "Đúng không?"),
    ],
  },
  24: {
    patterns: [
      p("Vad är det här på svenska?", "Cái này tiếng Thụy Điển là gì?", "What's this in Swedish?", [
        { sv: "Vad är det här på svenska?", ipa: "/vad ɛr dɛt hɛr pɔ svɛnskɑː?/", vi: "Cái này tiếng Thụy Điển?", en: "What's this in Swedish?" },
      ]),
      p("Kan du säga det igen, tack?", "Bạn nhắc lại được không?", "Can you say it again?", [
        { sv: "Kan du säga det igen, tack?", ipa: "/kan dɵ sɛːɡa dɛt iːjɛn, takk?/", vi: "Nhắc lại đi.", en: "Say again please." },
      ]),
    ],
    listening: {
      sv: "Ursäkta, jag förstår inte. Kan du prata lite långsammare? Tack så mycket.",
      vi: "Xin lỗi, tôi không hiểu. Nói chậm hơn được không? Cảm ơn.",
      en: "Sorry, don't understand. Can you speak slower? Thanks.",
      questions: [
        { q: "Yêu cầu gì? / Request?", a: "Nói chậm hơn (lite långsammare)" },
        { q: "Câu xin lỗi? / Sorry?", a: "Ursäkta" },
      ],
    },
    writing: {
      promptVi: "Viết 4 câu cứu hộ khi không hiểu (hỏi lại, nhắc lại, đánh vần).",
      promptEn: "Write 4 rescue phrases for not understanding.",
      sampleSv: "Förlåt, jag förstår inte. Kan du säga det igen? Hur stavas det? Vad betyder ordet 'kanske'?",
      sampleVi: "Xin lỗi, tôi không hiểu. Nhắc lại nhé? Đánh vần thế nào? 'kanske' nghĩa là gì?",
      sampleEn: "Sorry, don't get it. Say again? Spell it? What does 'kanske' mean?",
    },
    selfCheck: [
      qa("'Jag förstår inte' = ?", "Tôi không hiểu"),
      qa("'Hur stavas det?' = ?", "Đánh vần thế nào?"),
      qa("'långsammare' = ?", "Chậm hơn"),
      qa("'Vad betyder X?' = ?", "X nghĩa là gì?"),
    ],
  },
  25: {
    patterns: [
      p("Jag bokade ___ för ___ .", "Tôi đặt ___ cho ___ .", "I booked ___ for ___.", [
        { sv: "Jag bokade ett rum för två nätter.", ipa: "/jaɡ buːkɑːdeː ɛt rɵm fœr tvɔ nɛtɛr./", vi: "Tôi đặt 1 phòng 2 đêm.", en: "Room for 2 nights." },
      ]),
    ],
    listening: {
      sv: "God dag! Jag har bokat ett rum i namnet Linh. Här är ditt nyckelkort. Frukost serveras klockan sju.",
      vi: "Chào! Tôi đặt phòng tên Linh. Đây thẻ chìa khoá. Sáng 7 giờ ăn sáng.",
      en: "Hi! Booked under Linh. Key card. Breakfast 7am.",
      questions: [
        { q: "Đặt tên ai? / Under whose name?", a: "Linh" },
        { q: "Giờ ăn sáng? / Breakfast?", a: "7 giờ" },
      ],
    },
    writing: {
      promptVi: "Viết hội thoại check-in khách sạn (5 lượt).",
      promptEn: "Write a hotel check-in dialog.",
      sampleSv: "- God dag, jag har en bokning. - I vilket namn? - Linh Nguyen, tre nätter. - Här är ditt rum, nummer tolv. - Tack så mycket.",
      sampleVi: "- Chào, tôi đặt phòng rồi. - Tên ai? - Linh Nguyen, 3 đêm. - Phòng 12 đây. - Cảm ơn.",
      sampleEn: "- Hi, have a booking. - Name? - Linh Nguyen, 3 nights. - Room 12. - Thanks.",
    },
    selfCheck: [
      qa("Khách sạn (sv)?", "hotell"),
      qa("Đêm (sv)?", "natt (số nhiều: nätter)"),
      qa("'bokning' = ?", "Đặt chỗ / booking"),
      qa("'nyckel' = ?", "Chìa khoá"),
    ],
  },
  26: {
    patterns: [
      p("Tåget till ___ avgår klockan ___ .", "Tàu đi ___ khởi hành lúc ___ .", "Train to ___ leaves at ___.", [
        { sv: "Tåget till Malmö avgår klockan tio.", ipa: "/toːjɛt tɪl malmøː avɡɔr klɔkkan tiːuː./", vi: "Tàu Malmö 10 giờ chạy.", en: "Malmö train at 10." },
      ]),
    ],
    listening: {
      sv: "Tåget till Göteborg avgår från spår tre klockan nio och femton. Resan tar tre timmar.",
      vi: "Tàu Göteborg đường 3, 9h15. Hành trình 3 tiếng.",
      en: "Göteborg train, track 3, 9:15. 3-hour trip.",
      questions: [
        { q: "Đường mấy? / Track?", a: "3 (spår tre)" },
        { q: "Đi bao lâu? / How long?", a: "3 tiếng (tre timmar)" },
      ],
    },
    writing: {
      promptVi: "Viết hội thoại mua vé tàu (4 lượt).",
      promptEn: "Write a ticket-buying dialog.",
      sampleSv: "- Hej! En biljett till Uppsala, tack. - Enkel eller tur och retur? - Tur och retur. - Det blir tvåhundra kronor.",
      sampleVi: "- Chào! 1 vé Uppsala. - Một chiều hay khứ hồi? - Khứ hồi. - 200 kr.",
      sampleEn: "- Hi! Ticket to Uppsala. - One-way or return? - Return. - 200 kr.",
    },
    selfCheck: [
      qa("Vé khứ hồi (sv)?", "tur och retur"),
      qa("'spår' = ?", "Đường tàu / track"),
      qa("'avgår' = ?", "Khởi hành"),
      qa("Tàu / xe bus (sv)?", "tåg / buss"),
    ],
  },
  27: {
    patterns: [
      p("Det är förbjudet att ___ .", "Cấm ___ .", "Forbidden to ___.", [
        { sv: "Det är förbjudet att röka.", ipa: "/dɛt ɛr fœrbjʉːdɛt at røːkɑː./", vi: "Cấm hút thuốc.", en: "No smoking." },
      ]),
      p("Du ska ___ .", "Bạn cần ___ .", "You must ___.", [
        { sv: "Du ska sopsortera.", ipa: "/dɵ ska sɔpsɔʈeːrɑː./", vi: "Bạn cần phân loại rác.", en: "You must sort waste." },
      ]),
    ],
    listening: {
      sv: "I Sverige sopsorterar vi noggrant. Glas, papper, plast och metall i olika tunnor. Mat-avfall i bruna påsen.",
      vi: "Ở Thụy Điển phân loại rác kỹ. Kính/giấy/nhựa/kim loại thùng riêng. Rác hữu cơ vào túi nâu.",
      en: "We sort waste carefully. Glass/paper/plastic/metal separate. Food waste in brown bag.",
      questions: [
        { q: "Mấy loại rác? / Categories?", a: "5+ (glass, papper, plast, metall, mat)" },
        { q: "Rác hữu cơ? / Food waste?", a: "Bruna påsen (túi nâu)" },
      ],
    },
    writing: {
      promptVi: "Viết 5 quy tắc sống ở Thụy Điển bạn cần nhớ.",
      promptEn: "Write 5 rules for living in Sweden.",
      sampleSv: "Man ska komma i tid. Man ska sopsortera. Det är förbjudet att röka inne. Man tar av sig skorna. Man väntar tyst i kö.",
      sampleVi: "Phải đúng giờ. Phân loại rác. Cấm hút thuốc trong nhà. Cởi giày khi vào nhà. Xếp hàng im lặng.",
      sampleEn: "Be on time. Sort waste. No indoor smoking. Take off shoes. Queue quietly.",
    },
    selfCheck: [
      qa("'sopsortera' = ?", "Phân loại rác"),
      qa("'förbjudet' = ?", "Bị cấm"),
      qa("Đúng giờ (tính từ sv)?", "punktlig"),
      qa("Phong tục Thụy Điển khi vào nhà?", "Cởi giày (ta av skorna)"),
    ],
  },
  28: {
    patterns: [
      p("Får jag ___ ?", "Tôi có thể ___ không?", "May I ___?", [
        { sv: "Får jag sitta här?", ipa: "/fɔr jaɡ sɪta hɛr?/", vi: "Tôi ngồi đây được không?", en: "May I sit?" },
      ]),
      p("Skulle du kunna ___ ?", "Bạn có thể ___ giúp không?", "Could you ___?", [
        { sv: "Skulle du kunna hjälpa mig?", ipa: "/skɵlɛ dɵ kɵna hjɛlpa mɪɡ?/", vi: "Giúp tôi được không?", en: "Could you help?" },
      ]),
    ],
    listening: {
      sv: "Ursäkta, skulle du kunna hjälpa mig att hitta tunnelbanan? Självklart, den ligger åt vänster.",
      vi: "Xin lỗi, giúp tôi tìm tàu điện ngầm được không? Tất nhiên, bên trái.",
      en: "Excuse me, could you help find metro? Sure, on left.",
      questions: [
        { q: "Tìm gì? / Looking for?", a: "Tunnelbana (tàu điện ngầm)" },
        { q: "Đáp tích cực? / Positive reply?", a: "Självklart (tất nhiên)" },
      ],
    },
    writing: {
      promptVi: "Viết 5 câu lịch sự dùng hằng ngày.",
      promptEn: "Write 5 polite daily phrases.",
      sampleSv: "Får jag fråga något? Skulle du kunna upprepa? Tack för hjälpen. Ingen orsak. Förlåt om jag stör.",
      sampleVi: "Tôi hỏi 1 câu được không? Nhắc lại giúp? Cảm ơn đã giúp. Không có chi. Xin lỗi nếu làm phiền.",
      sampleEn: "May I ask? Could you repeat? Thanks. No problem. Sorry if disturbing.",
    },
    selfCheck: [
      qa("Lịch sự nhất 'Could you ...?'", "Skulle du kunna ...?"),
      qa("'Ingen orsak' = ?", "Không có chi"),
      qa("'tack för hjälpen' = ?", "Cảm ơn đã giúp"),
      qa("'självklart' = ?", "Tất nhiên"),
    ],
  },
  /* ============================ TUẦN 5 ============================ */
  29: {
    patterns: [
      p("Imorgon ska jag ___ .", "Mai tôi sẽ ___ .", "Tomorrow I will ___.", [
        { sv: "Imorgon ska jag göra YKI-provet.", ipa: "/iːmɔrɡɔn ska jaɡ jøːrɑː yːɕɪpruːvɛt./", vi: "Mai tôi thi YKI.", en: "Tomorrow YKI test." },
      ]),
    ],
    listening: {
      sv: "YKI-provet har fyra delar: läsa, lyssna, skriva och tala. Glöm inte ID-kortet och en penna.",
      vi: "Đề YKI có 4 phần: đọc, nghe, viết, nói. Đừng quên CMND và bút.",
      en: "YKI has 4 parts: read, listen, write, speak. Bring ID + pen.",
      questions: [
        { q: "4 kỹ năng? / 4 skills?", a: "läsa, lyssna, skriva, tala" },
        { q: "Cần mang gì? / Bring?", a: "ID-kort + penna" },
      ],
    },
    writing: {
      promptVi: "Viết 5 câu mô tả ngày thi YKI của bạn (kế hoạch).",
      promptEn: "Write 5 sentences planning your YKI day.",
      sampleSv: "Imorgon klockan åtta åker jag till provcentret. Jag tar med mig ID-kortet. Först är det läsförståelse. Sedan lyssning. Jag är lite nervös men förberedd.",
      sampleVi: "Mai 8h tôi đi trung tâm thi. Mang theo CMND. Đầu tiên phần đọc. Sau đó nghe. Hơi hồi hộp nhưng đã sẵn sàng.",
      sampleEn: "Tomorrow 8am go to center. Bring ID. Reading first. Then listening. Nervous but ready.",
    },
    selfCheck: [
      qa("4 kỹ năng tiếng (sv)?", "läsa, lyssna, skriva, tala"),
      qa("'prov' = ?", "Bài thi / test"),
      qa("'nervös' = ?", "Hồi hộp"),
      qa("'förberedd' = ?", "Đã chuẩn bị / prepared"),
    ],
  },
  30: {
    patterns: [
      p("Jag har lärt mig ___ .", "Tôi đã học được ___ .", "I learned ___.", [
        { sv: "Jag har lärt mig hälsa, fika och resa.", ipa: "/jaɡ har lɛʈ mɪɡ hɛlsa, fiːkɑː ɔɕ reːsɑː./", vi: "Tôi học chào hỏi, fika và đi lại.", en: "Learned greetings, fika, travel." },
      ]),
      p("Nästa mål: ___ .", "Mục tiêu tiếp: ___ .", "Next goal: ___.", [
        { sv: "Nästa mål: A2-nivå.", ipa: "/nɛsta mɔl: a2niːvoː./", vi: "Mục tiêu: trình A2.", en: "Next: A2." },
      ]),
    ],
    listening: {
      sv: "Grattis! Du har klarat A1. Du kan presentera dig, beställa mat, fråga vägen och prata om vardagen. Fortsätt så!",
      vi: "Chúc mừng! Bạn đã qua A1. Có thể tự giới thiệu, gọi đồ, hỏi đường, nói về sinh hoạt. Tiếp tục nào!",
      en: "Congrats! You passed A1. Self-intro, order, directions, daily talk. Keep going!",
      questions: [
        { q: "Đã làm được gì? / What can do?", a: "Tự giới thiệu, gọi đồ, hỏi đường, vardag" },
        { q: "Câu cổ vũ? / Encouragement?", a: "Fortsätt så! (Tiếp tục nào!)" },
      ],
    },
    writing: {
      promptVi: "Viết 6 câu tổng kết 30 ngày + cam kết tiếp tục lên A2.",
      promptEn: "Write 6 sentences recapping 30 days + A2 commitment.",
      sampleSv: "Det här har varit en magisk resa. På 30 dagar lärde jag mig svenska från noll. Nu kan jag hälsa, handla och resa. Jag förstår också svensk kultur som fika och lagom. Tack, lärare Hai! Nästa stopp: A2-nivå.",
      sampleVi: "Hành trình tuyệt vời. 30 ngày học từ con số 0. Giờ tôi chào, mua sắm, đi lại được. Hiểu cả văn hoá fika và lagom. Cảm ơn thầy Hải! Mục tiêu tiếp: A2.",
      sampleEn: "Magical journey. 30 days from zero. Can greet, shop, travel. Understand fika, lagom. Thanks Mr. Hai! Next: A2.",
    },
    selfCheck: [
      qa("'Grattis!' = ?", "Chúc mừng!"),
      qa("'klarat' = ?", "Đã qua / passed"),
      qa("'Fortsätt så!' = ?", "Tiếp tục như vậy!"),
      qa("Tiếp theo cấp gì sau A1?", "A2 (sơ trung)"),
    ],
  },
};

/** Helper an toàn: trả về object rỗng nếu chưa có dữ liệu sâu cho ngày đó. */
export const getDailyDeep = (day: number): DailyDeep => SWEDISH_A1_DAILY_DEEP[day] ?? {};
