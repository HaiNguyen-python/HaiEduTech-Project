/**
 * @file swedishA1DailyExpansion.ts
 * @description Lớp mở rộng LÝ THUYẾT + BÀI TẬP cho 30 ngày A1 Thụy Điển.
 *              Mỗi ngày: theoryDeep (giảng sâu 5-7 ý), 3 bộ drill tương tác
 *              (fill-in-blank, dịch VI→SV, ghép cặp Sv-Vi). Phục vụ tự học
 *              chuyên sâu, hiển thị trong SwedishA1DailyPlan.tsx.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

export interface FillBlank {
  /** Câu Sv có ___ */
  sv: string;
  /** Từ điền đúng (có thể nhiều chấp nhận, ngăn bằng | ) */
  a: string;
  vi: string;
  en: string;
}

export interface TranslatePair {
  vi: string;
  en: string;
  sv: string;
}

export interface MatchPair {
  sv: string;
  vi: string;
}

export interface DailyExpansion {
  theoryTitleVi: string;
  theoryTitleEn: string;
  /** 5-7 ý giảng sâu, mỗi ý 1-2 câu. */
  theoryVi: string[];
  theoryEn: string[];
  fill?: FillBlank[];
  translate?: TranslatePair[];
  match?: MatchPair[];
}

const fb = (sv: string, a: string, vi: string, en: string): FillBlank => ({ sv, a, vi, en });
const tr = (vi: string, en: string, sv: string): TranslatePair => ({ vi, en, sv });
const mp = (sv: string, vi: string): MatchPair => ({ sv, vi });

export const SWEDISH_A1_DAILY_EXPANSION: Record<number, DailyExpansion> = {
  /* ==================== TUẦN 1 ==================== */
  1: {
    theoryTitleVi: "Phát âm Thụy Điển - 3 nguyên tắc vàng",
    theoryTitleEn: "Swedish pronunciation - 3 golden rules",
    theoryVi: [
      "Quy tắc 1: nguyên âm + 1 phụ âm = ÂM DÀI (vi-i-saa). Ví dụ: vi (chúng tôi), du, ja.",
      "Quy tắc 2: nguyên âm + 2 phụ âm = ÂM NGẮN. Ví dụ: vill, dock, kall.",
      "Quy tắc 3: 'sj', 'skj', 'stj', 'sk' trước e/i/y/ä/ö đọc thành /ɧ/ - thổi hơi mạnh, giống 'huýt sáo'.",
      "'tj', 'kj', 'k' trước e/i/y/ä/ö đọc /ɕ/ - giống 'sh' nhẹ kiểu Trung Quốc 'xi'.",
      "Trọng âm Thụy Điển có 2 cao độ (accent 1 & accent 2): 'anden' (con vịt) khác 'anden' (linh hồn).",
      "Mẹo luyện: ghi âm chính bạn, so với native, lặp 10 lần mỗi cụm sj-/tj- trước khi sang bài 2.",
    ],
    theoryEn: [
      "Rule 1: vowel + 1 consonant = LONG vowel. Ex: vi, du, ja.",
      "Rule 2: vowel + 2 consonants = SHORT vowel. Ex: vill, dock, kall.",
      "Rule 3: sj/skj/stj/sk-before-e/i/y/ä/ö = /ɧ/, a strong airy 'hwh'.",
      "tj/kj/k-before-e/i/y/ä/ö = /ɕ/, like a soft 'sh'.",
      "Swedish uses 2 pitch accents: 'anden' (duck) vs 'anden' (spirit).",
      "Tip: record yourself, compare to native, repeat sj-/tj- pairs 10x before moving on.",
    ],
    fill: [
      fb("___ heter du?", "Vad", "Bạn tên gì?", "What's your name?"),
      fb("Jag ___ Linh.", "heter", "Tôi tên Linh.", "I'm Linh."),
      fb("Tack ___ mycket!", "så", "Cảm ơn rất nhiều!", "Thanks a lot!"),
      fb("Hon är ___ år.", "tjugo", "Cô ấy 20 tuổi.", "She is 20."),
      fb("Han är en ___ .", "sjuksköterska", "Anh ấy là y tá.", "He's a nurse."),
    ],
    translate: [
      tr("Chào, tôi tên Nam.", "Hi, I'm Nam.", "Hej, jag heter Nam."),
      tr("Rất vui được gặp.", "Nice to meet you.", "Trevligt att träffas."),
      tr("Cảm ơn nhiều.", "Thank you very much.", "Tack så mycket."),
      tr("Tạm biệt!", "Goodbye!", "Hej då!"),
    ],
    match: [
      mp("sju", "bảy (7)"),
      mp("tjugo", "hai mươi (20)"),
      mp("sjuksköterska", "y tá"),
      mp("hej då", "tạm biệt"),
      mp("trevligt", "vui/dễ chịu"),
      mp("vi", "chúng tôi"),
    ],
  },

  2: {
    theoryTitleVi: "Đại từ nhân xưng + động từ 'vara' (là)",
    theoryTitleEn: "Personal pronouns + verb 'vara' (to be)",
    theoryVi: [
      "Đại từ: jag (tôi), du (bạn), han (anh), hon (cô), den/det (nó), vi (chúng tôi), ni (các bạn), de (họ - đọc là 'dom').",
      "Động từ 'vara' KHÔNG chia theo ngôi: jag är, du är, han är, vi är, de är - chỉ 1 dạng 'är' duy nhất.",
      "Quá khứ 'var', hiện tại hoàn thành 'har varit'. Tương tự tiếng Anh nhưng không đổi I am/he is.",
      "Câu giới thiệu nghề: Jag är + nghề (không 'a/an' như tiếng Anh). VD: Jag är lärare (Tôi là giáo viên).",
      "Phủ định đặt 'inte' SAU động từ: Jag är inte trött (Tôi không mệt). Không dùng 'do/does'.",
      "Câu hỏi y/n: đảo động từ lên trước. Är du svensk? (Bạn là người Thụy Điển?).",
    ],
    theoryEn: [
      "Pronouns: jag, du, han, hon, den/det, vi, ni, de (said 'dom').",
      "Verb 'vara' has only ONE present form 'är' for every person.",
      "Past: var; perfect: har varit. No I am/he is variation.",
      "Profession sentence: Jag är + job (no a/an). Jag är lärare.",
      "Negate by putting 'inte' AFTER the verb: Jag är inte trött.",
      "Yes/no question: invert verb-subject. Är du svensk?",
    ],
    fill: [
      fb("Jag ___ från Vietnam.", "är", "Tôi đến từ Việt Nam.", "I'm from Vietnam."),
      fb("___ är du?", "Vem", "Bạn là ai?", "Who are you?"),
      fb("Hon är ___ student.", "en", "Cô ấy là sinh viên.", "She's a student."),
      fb("Vi är ___ trötta.", "inte", "Chúng tôi không mệt.", "We aren't tired."),
      fb("___ ni svenskar?", "Är", "Các bạn là người TĐ?", "Are you Swedes?"),
    ],
    translate: [
      tr("Anh ấy là bác sĩ.", "He is a doctor.", "Han är läkare."),
      tr("Tôi không phải người Thụy Điển.", "I'm not Swedish.", "Jag är inte svensk."),
      tr("Họ là sinh viên.", "They are students.", "De är studenter."),
      tr("Bạn có khoẻ không?", "Are you well?", "Mår du bra?"),
    ],
    match: [
      mp("jag", "tôi"),
      mp("du", "bạn"),
      mp("vi", "chúng tôi"),
      mp("de", "họ"),
      mp("är", "là (hiện tại)"),
      mp("var", "đã là (quá khứ)"),
    ],
  },

  3: {
    theoryTitleVi: "Số đếm 0-100 + tuổi tác",
    theoryTitleEn: "Numbers 0-100 + age",
    theoryVi: [
      "0-12 phải học thuộc: noll, ett, två, tre, fyra, fem, sex, sju, åtta, nio, tio, elva, tolv.",
      "13-19: ghép số + 'ton' (trừ vài bất quy tắc): tretton, fjorton, femton, sexton, sjutton, arton, nitton.",
      "Hàng chục: tjugo (20), trettio, fyrtio, femtio, sextio, sjuttio, åttio, nittio, hundra.",
      "Ghép số: 21 = tjugoett, 35 = trettiofem, 99 = nittionio - viết LIỀN, không có 'and'.",
      "Hỏi tuổi: 'Hur gammal är du?' - trả lời 'Jag är ___ år (gammal)'. Từ 'gammal' thường bỏ.",
      "Năm sinh: 1995 = nittonhundranittiofem. 2026 = tjugohundratjugosex (hoặc tvåtusentjugosex).",
    ],
    theoryEn: [
      "Memorize 0-12: noll-tolv.",
      "13-19 ends in '-ton'.",
      "Tens: tjugo, trettio, fyrtio, femtio, sextio, sjuttio, åttio, nittio, hundra.",
      "Combine: 21 = tjugoett, written as one word.",
      "Ask age: Hur gammal är du? Jag är __ år.",
      "Birth year: 1995 = nittonhundranittiofem.",
    ],
    fill: [
      fb("Hur ___ är du?", "gammal", "Bạn bao nhiêu tuổi?", "How old are you?"),
      fb("Jag är ___ år.", "tjugofem", "Tôi 25 tuổi.", "I'm 25."),
      fb("Min mamma är ___ .", "femtio", "Mẹ tôi 50.", "Mom is 50."),
      fb("Klassen har ___ elever.", "tjugo", "Lớp có 20 hs.", "Class has 20."),
      fb("Boken kostar ___ kronor.", "hundra", "Sách giá 100 kr.", "Book costs 100 kr."),
    ],
    translate: [
      tr("Tôi 30 tuổi.", "I'm 30.", "Jag är trettio år."),
      tr("Anh ấy 17.", "He is 17.", "Han är sjutton."),
      tr("Nhà tôi có 4 người.", "My family has 4 people.", "Min familj har fyra personer."),
      tr("Giá 99 kronor.", "It costs 99 kronor.", "Det kostar nittionio kronor."),
    ],
    match: [
      mp("ett", "1"), mp("tre", "3"), mp("sju", "7"),
      mp("tio", "10"), mp("tjugo", "20"), mp("hundra", "100"),
    ],
  },

  4: {
    theoryTitleVi: "Mạo từ en/ett - 'số phận' của mỗi danh từ",
    theoryTitleEn: "Articles en/ett - every noun's destiny",
    theoryVi: [
      "Tiếng TĐ chia danh từ làm 2 giống: en-words (~75%) và ett-words (~25%). Phải học kèm mạo từ ngay từ đầu.",
      "Không có quy tắc đoán 100%. Mẹo: hầu hết người, nghề, động vật là EN; vật vô tri ngắn 1 âm tiết thường là ETT.",
      "Mạo từ XÁC ĐỊNH ghép vào CUỐI từ: en bok → boken; ett hus → huset. Khác hẳn tiếng Anh 'the'.",
      "Số nhiều: en-words thường +or/-ar/-er (flickor, pojkar, bilar). Ett-words 1 âm tiết KHÔNG đổi (hus → hus).",
      "Tính từ phải hợp với mạo từ: en stor bil / ett stort hus / stora bilar (thêm -t cho ett, -a cho số nhiều).",
      "Học từ mới phải nhớ ngay: en/ett + dạng số nhiều, ví dụ 'en bok, böcker'.",
    ],
    theoryEn: [
      "Swedish nouns are en-words (~75%) or ett-words (~25%). Learn the article with each noun.",
      "No 100% rule. Heuristic: people, jobs, animals = EN; short inanimate = ETT.",
      "Definite article attaches to the END: en bok → boken; ett hus → huset.",
      "Plurals: en-words add -or/-ar/-er. Mono-syllable ett-words don't change.",
      "Adjectives agree: en stor bil / ett stort hus / stora bilar.",
      "Memorize each new noun WITH article + plural.",
    ],
    fill: [
      fb("Jag har ___ bok.", "en", "Tôi có 1 quyển sách.", "I have a book."),
      fb("Det är ___ hus.", "ett", "Đây là 1 ngôi nhà.", "It's a house."),
      fb("Boken är ___ (stor).", "stor", "Quyển sách to.", "The book is big."),
      fb("Huset är ___ (stor).", "stort", "Ngôi nhà to.", "The house is big."),
      fb("Två ___ (bok).", "böcker", "Hai quyển sách.", "Two books."),
    ],
    translate: [
      tr("Một con mèo.", "A cat.", "En katt."),
      tr("Con mèo dễ thương.", "The cat is cute.", "Katten är söt."),
      tr("Một ngôi nhà nhỏ.", "A small house.", "Ett litet hus."),
      tr("Những ngôi nhà to.", "Big houses.", "Stora hus."),
    ],
    match: [
      mp("en bok", "1 quyển sách"),
      mp("boken", "quyển sách (xác định)"),
      mp("ett hus", "1 ngôi nhà"),
      mp("huset", "ngôi nhà (xác định)"),
      mp("böcker", "những quyển sách"),
      mp("stora", "to (số nhiều)"),
    ],
  },

  5: {
    theoryTitleVi: "Câu hỏi cơ bản - 6 'W' tiếng Thụy Điển",
    theoryTitleEn: "Basic questions - the 6 Swedish 'W'",
    theoryVi: [
      "Vad? (gì), Vem? (ai), Var? (ở đâu), Vart? (đi đâu), När? (khi nào), Varför? (tại sao), Hur? (thế nào).",
      "Phân biệt Var (vị trí tĩnh) vs Vart (chuyển động): 'Var bor du?' (bạn ở đâu?) vs 'Vart åker du?' (bạn đi đâu?).",
      "Câu hỏi y/n: đảo động từ. Bor du i Helsingfors? - Ja, det gör jag. / Nej, det gör jag inte.",
      "Câu hỏi với 'vilken/vilket/vilka' (cái nào): hợp với en/ett/số nhiều. Vilken bok? / Vilket hus? / Vilka böcker?",
      "Đáp 'có/không' đầy đủ: Ja, jag ___ / Nej, jag är inte ___. Đáp ngắn trong giao tiếp: Mm. / Nej då.",
      "Mẹo: từ hỏi luôn đứng ĐẦU, động từ ngay sau (V2 rule).",
    ],
    theoryEn: [
      "Vad, Vem, Var, Vart, När, Varför, Hur.",
      "Var = static location; Vart = movement.",
      "Y/N questions: invert verb. Bor du i Helsingfors?",
      "Vilken/vilket/vilka agree with en/ett/plural.",
      "Full yes: Ja, jag är ___. Full no: Nej, jag är inte ___.",
      "Question word always FIRST, then verb (V2).",
    ],
    fill: [
      fb("___ bor du?", "Var", "Bạn sống ở đâu?", "Where do you live?"),
      fb("___ åker du?", "Vart", "Bạn đi đâu?", "Where are you going?"),
      fb("___ kommer du?", "När", "Khi nào bạn đến?", "When do you come?"),
      fb("___ mår du?", "Hur", "Bạn khoẻ không?", "How are you?"),
      fb("___ bok läser du?", "Vilken", "Bạn đọc cuốn nào?", "Which book?"),
    ],
    translate: [
      tr("Bạn là ai?", "Who are you?", "Vem är du?"),
      tr("Tại sao bạn buồn?", "Why are you sad?", "Varför är du ledsen?"),
      tr("Bạn đi đâu?", "Where are you going?", "Vart går du?"),
      tr("Khi nào về?", "When are you home?", "När är du hemma?"),
    ],
    match: [
      mp("Vad", "Gì"), mp("Vem", "Ai"),
      mp("Var", "Ở đâu"), mp("Vart", "Đi đâu"),
      mp("När", "Khi nào"), mp("Varför", "Tại sao"),
    ],
  },

  6: {
    theoryTitleVi: "Gia đình + tính từ sở hữu",
    theoryTitleEn: "Family + possessive adjectives",
    theoryVi: [
      "Sở hữu: min (của tôi), din, hans, hennes, vår, er, deras. Min/din/sin/vår/er hợp với en/ett/số nhiều.",
      "min/mitt/mina: min mamma (en), mitt barn (ett), mina föräldrar (số nhiều).",
      "hans/hennes/deras KHÔNG đổi: hans pappa, hennes pappa, deras pappa.",
      "'Sin/sitt/sina' = phản thân (của chính chủ ngữ): Hon älskar sin mamma (= mẹ cô ấy). Hon älskar hennes mamma (= mẹ người khác).",
      "Từ gia đình: mamma/mor, pappa/far, bror, syster, son, dotter, mormor (bà ngoại), farfar (ông nội).",
      "Đại gia đình ghép kiểu Bắc Âu chính xác: morbror (cậu), farbror (chú), moster (dì), faster (cô).",
    ],
    theoryEn: [
      "Possessives: min/din/sin/vår/er/hans/hennes/deras.",
      "min/mitt/mina agree with en/ett/plural.",
      "hans/hennes/deras never change.",
      "sin/sitt/sina = reflexive (subject's own).",
      "Family: mamma, pappa, bror, syster, mormor (maternal grandma), farfar (paternal grandpa).",
      "Compound: morbror (uncle, mother's side), faster (aunt, father's side).",
    ],
    fill: [
      fb("___ mamma heter Anna.", "Min", "Mẹ tôi tên Anna.", "My mom is Anna."),
      fb("___ barn är fem år.", "Mitt", "Con tôi 5 tuổi.", "My child is 5."),
      fb("___ föräldrar bor i Vasa.", "Mina", "Bố mẹ tôi ở Vasa.", "My parents live in Vasa."),
      fb("Hon älskar ___ bror.", "sin", "Cô yêu anh trai mình.", "She loves her brother."),
      fb("___ pappa är lärare.", "Hennes", "Bố cô ấy là gv.", "Her dad is a teacher."),
    ],
    translate: [
      tr("Đây là chị tôi.", "This is my sister.", "Det här är min syster."),
      tr("Em trai bạn bao nhiêu?", "How old is your bro?", "Hur gammal är din bror?"),
      tr("Bà ngoại tôi 70.", "My grandma is 70.", "Min mormor är sjuttio."),
      tr("Họ có 3 con.", "They have 3 kids.", "De har tre barn."),
    ],
    match: [
      mp("mamma", "mẹ"), mp("pappa", "bố"),
      mp("bror", "anh/em trai"), mp("syster", "chị/em gái"),
      mp("mormor", "bà ngoại"), mp("farfar", "ông nội"),
    ],
  },

  7: {
    theoryTitleVi: "Ôn tuần 1 + động từ hiện tại nhóm 1",
    theoryTitleEn: "Week 1 review + present tense group 1",
    theoryVi: [
      "Động từ TĐ chia THEO THÌ, không theo ngôi. Hiện tại nhóm 1 phổ biến nhất: thân + -ar.",
      "Mẫu: tala → talar (nói), arbeta → arbetar, bo → bor, prata → pratar, älska → älskar.",
      "Vô định (infinitiv) thường tận cùng -a: att tala, att arbeta. 'Att' = 'to' (tiếng Anh).",
      "Hỏi 'làm gì?': Vad gör du? - 'göra' (làm) bất quy tắc → gör.",
      "Phủ định: Jag talar inte svenska. Quá khứ nhóm 1: thân + -ade (talade, arbetade).",
      "Ôn lại: 5 mẫu chào, 3 quy tắc phát âm, đại từ, số 0-100, en/ett, từ hỏi - chạy lại 1 vòng trước khi sang tuần 2.",
    ],
    theoryEn: [
      "Verbs conjugate by tense, not person. Group 1 present: stem + -ar.",
      "Pattern: tala→talar, arbeta→arbetar, prata→pratar.",
      "Infinitive ends in -a, preceded by 'att'.",
      "What do you do? Vad gör du? göra is irregular.",
      "Negative: Jag talar inte svenska. Past group 1: stem + -ade.",
      "Recap week 1: greetings, pronunciation, pronouns, 0-100, en/ett, question words.",
    ],
    fill: [
      fb("Jag ___ svenska.", "talar", "Tôi nói tiếng TĐ.", "I speak Swedish."),
      fb("Hon ___ i Helsingfors.", "bor", "Cô ấy ở Helsinki.", "She lives in Helsinki."),
      fb("Vi ___ på kontor.", "arbetar", "Chúng tôi làm văn phòng.", "We work at office."),
      fb("Vad ___ du?", "gör", "Bạn đang làm gì?", "What are you doing?"),
      fb("Han ___ inte engelska.", "talar", "Anh ấy ko nói TA.", "He doesn't speak English."),
    ],
    translate: [
      tr("Tôi học tiếng Thụy Điển.", "I study Swedish.", "Jag studerar svenska."),
      tr("Cô ấy yêu cà phê.", "She loves coffee.", "Hon älskar kaffe."),
      tr("Chúng tôi chơi bóng.", "We play football.", "Vi spelar fotboll."),
      tr("Họ làm gì?", "What do they do?", "Vad gör de?"),
    ],
    match: [
      mp("tala", "nói"), mp("bo", "sống/ở"),
      mp("arbeta", "làm việc"), mp("älska", "yêu"),
      mp("spela", "chơi"), mp("göra", "làm"),
    ],
  },

  /* ==================== TUẦN 2 ==================== */
  8: {
    theoryTitleVi: "Thời gian + chia ngày trong tuần",
    theoryTitleEn: "Time + days of week",
    theoryVi: [
      "Hỏi giờ: 'Vad är klockan?' - 'Klockan är ___'. Người TĐ dùng 24h trong văn bản, 12h khi nói.",
      "Giờ chẵn: 'klockan tre' (3 giờ). Giờ 30 phút: 'halv fyra' = '3h30' (nửa giờ TỚI 4!).",
      "15 phút: 'kvart över tre' (3h15), 'kvart i fyra' (3h45). Phút khác: 'tio över tre' (3h10).",
      "Thứ trong tuần: måndag, tisdag, onsdag, torsdag, fredag, lördag, söndag. Viết thường, KHÔNG hoa.",
      "Tháng: januari, februari, mars, april, maj, juni, juli, augusti, september, oktober, november, december.",
      "Ngày tháng năm: '15 mars 2026' đọc 'femtonde mars tjugohundratjugosex'.",
    ],
    theoryEn: [
      "Time: Vad är klockan? / Klockan är ___.",
      "Half hour: 'halv fyra' = 3:30 (half TO 4!).",
      "Quarters: kvart över / kvart i.",
      "Days: måndag-söndag, lowercase.",
      "Months: januari-december.",
      "Date: 15 mars 2026 = femtonde mars tjugohundratjugosex.",
    ],
    fill: [
      fb("Vad är ___?", "klockan", "Mấy giờ rồi?", "What time is it?"),
      fb("Klockan är ___ tre.", "halv", "3h30.", "Half past 2 (i.e., 2:30, but Swedish says half to 3)."),
      fb("Idag är det ___.", "fredag", "Hôm nay thứ 6.", "Today is Friday."),
      fb("I ___ är det söndag.", "morgon", "Mai là CN.", "Tomorrow is Sun."),
      fb("Vi ses på ___.", "måndag", "Hẹn t2 nhé.", "See you Mon."),
    ],
    translate: [
      tr("Bây giờ 9 giờ.", "It's 9 o'clock.", "Klockan är nio."),
      tr("Hẹn 8h sáng.", "Meet at 8 am.", "Vi ses klockan åtta."),
      tr("Hôm nay thứ 3.", "Today is Tuesday.", "Idag är det tisdag."),
      tr("Tháng 6 trời nóng.", "June is hot.", "I juni är det varmt."),
    ],
    match: [
      mp("måndag", "thứ 2"), mp("tisdag", "thứ 3"),
      mp("onsdag", "thứ 4"), mp("torsdag", "thứ 5"),
      mp("idag", "hôm nay"), mp("imorgon", "ngày mai"),
    ],
  },

  9: {
    theoryTitleVi: "Đồ ăn + động từ 'äta/dricka/vilja'",
    theoryTitleEn: "Food + verbs eat/drink/want",
    theoryVi: [
      "Äta (ăn) bất quy tắc: jag äter, åt (đã ăn), har ätit. Dricka: dricker, drack, har druckit.",
      "Vilja (muốn): jag vill + động từ nguyên thể. Vill du ha kaffe? = Bạn muốn cà phê không?",
      "'Ha' = 'có/lấy'. Đặt món: Jag vill ha en kaffe, tack. ('tack' = please/cảm ơn).",
      "Từ ăn sáng/trưa/tối: frukost, lunch, middag (lưu ý middag = bữa tối, không phải 'midday'!).",
      "Cấu trúc thực đơn: en kaffe (cà phê), en kanelbulle (bánh quế), en smörgås (sandwich), en sallad (rau trộn).",
      "Lịch sự khi gọi món: 'Skulle jag kunna få ___' (Liệu tôi có thể có ___) - trang trọng hơn 'Jag vill ha'.",
    ],
    theoryEn: [
      "äta: äter/åt/har ätit. dricka: dricker/drack/druckit.",
      "vilja + bare infinitive: Jag vill ha kaffe.",
      "'ha' = have/take. Order: Jag vill ha en kaffe, tack.",
      "Meals: frukost (breakfast), lunch, middag (DINNER!).",
      "Menu items: kaffe, kanelbulle, smörgås, sallad.",
      "Polite: Skulle jag kunna få ___ (Could I have ___).",
    ],
    fill: [
      fb("Jag ___ en kaffe, tack.", "vill ha", "Cho tôi 1 cà phê.", "I'd like a coffee."),
      fb("Vad ___ du till frukost?", "äter", "Bạn ăn sáng gì?", "What's for breakfast?"),
      fb("Hon ___ te varje morgon.", "dricker", "Cô uống trà mỗi sáng.", "She drinks tea daily."),
      fb("Vi ska äta ___ kl. 18.", "middag", "Bữa tối 6h.", "Dinner at 6."),
      fb("___ jag kunna få menyn?", "Skulle", "Cho xin menu?", "Could I have menu?"),
    ],
    translate: [
      tr("Cho 2 bánh quế nhé.", "Two cinnamon buns please.", "Två kanelbullar, tack."),
      tr("Tôi đói rồi.", "I'm hungry.", "Jag är hungrig."),
      tr("Anh ấy thích cá.", "He likes fish.", "Han gillar fisk."),
      tr("Không cay nhé.", "Not spicy please.", "Inte starkt, tack."),
    ],
    match: [
      mp("frukost", "bữa sáng"), mp("lunch", "bữa trưa"),
      mp("middag", "bữa tối"), mp("kaffe", "cà phê"),
      mp("smörgås", "bánh kẹp"), mp("kanelbulle", "bánh quế"),
    ],
  },

  10: {
    theoryTitleVi: "Đi siêu thị + tiền tệ + thẻ ngân hàng",
    theoryTitleEn: "Supermarket + currency + bank card",
    theoryVi: [
      "Tiền: krona (số nhiều kronor), viết tắt 'kr' hoặc 'SEK'. 1 euro ≈ 11 kr (2026).",
      "Hỏi giá: 'Vad kostar det?' / 'Hur mycket kostar ___?'. Trả lời: 'Det kostar 49 kr.'",
      "Siêu thị TĐ phổ biến: ICA, Coop, Lidl, Willys. Phần Lan: K-Market, S-Market, Lidl.",
      "Thanh toán: 'Jag betalar med kort' (trả thẻ). 'Kontaktlöst' = không tiếp xúc. Nhập PIN: 'mata in PIN-kod'.",
      "Mã quan trọng: 'kassa' (quầy), 'rea' (giảm giá), 'utgångsdatum' (HSD), 'ekologisk' (hữu cơ).",
      "Câu hữu ích cuối: 'Kvitto, tack' (Cho hoá đơn) - mặc định ở TĐ không in hoá đơn nếu không hỏi.",
    ],
    theoryEn: [
      "Currency: krona/kronor (kr). ~11 kr per EUR.",
      "Ask price: Vad kostar det? Det kostar 49 kr.",
      "Stores: ICA, Coop, Lidl, K-Market, S-Market.",
      "Pay: Jag betalar med kort. Kontaktlöst. Mata in PIN.",
      "Key signs: kassa, rea, utgångsdatum, ekologisk.",
      "Always ask: Kvitto, tack! (Receipt please).",
    ],
    fill: [
      fb("Vad ___ den här?", "kostar", "Cái này giá bao nhiêu?", "How much is this?"),
      fb("Den kostar femtio ___.", "kronor", "Giá 50 kr.", "It's 50 kr."),
      fb("Jag betalar med ___.", "kort", "Tôi trả thẻ.", "I pay by card."),
      fb("___ , tack.", "Kvitto", "Cho xin hoá đơn.", "Receipt please."),
      fb("Var är ___?", "kassan", "Quầy thanh toán đâu?", "Where's the till?"),
    ],
    translate: [
      tr("Tổng cộng bao nhiêu?", "Total?", "Hur mycket totalt?"),
      tr("Có giảm giá không?", "Any discount?", "Finns det rea?"),
      tr("Hết hạn ngày nào?", "Expiry date?", "Vilket utgångsdatum?"),
      tr("Cho túi nhé.", "Bag please.", "En påse, tack."),
    ],
    match: [
      mp("kassa", "quầy thanh toán"),
      mp("kvitto", "hoá đơn"),
      mp("rea", "giảm giá"),
      mp("påse", "túi"),
      mp("kort", "thẻ"),
      mp("kontant", "tiền mặt"),
    ],
  },

  11: {
    theoryTitleVi: "Fika - văn hoá cà phê Bắc Âu",
    theoryTitleEn: "Fika - Nordic coffee culture",
    theoryVi: [
      "'Fika' vừa là danh từ vừa động từ: 1 lần ngồi cà phê + bánh ngọt, 15-30 phút, cùng đồng nghiệp/bạn.",
      "Nghi thức: KHÔNG bàn việc gấp, KHÔNG ăn vội. Mỗi văn phòng Bắc Âu có 'fika-paus' (giải lao) lúc 10h & 14h.",
      "Bánh kèm cà phê: kanelbulle (quế), kardemummabulle (bạch đậu khấu), prinsesstårta (bánh nàng tiên xanh), semla (bánh kem mùa Pask).",
      "Mời fika: 'Ska vi fika?' = Đi cà phê chung không? Hoặc 'Vill du ha kaffe?'.",
      "Trả tiền: thường mỗi người trả phần của mình ('vi delar' = chia đôi). Sếp mời thì sếp trả.",
      "Quy tắc 'lagom' (vừa đủ): không uống quá to, không bánh quá ngọt, không nói to. Tinh thần Nordic.",
    ],
    theoryEn: [
      "Fika is both noun and verb: 15-30 min coffee + pastry social break.",
      "Etiquette: no rushing, no urgent biz. Offices have fika at 10am and 2pm.",
      "Pastries: kanelbulle, kardemummabulle, prinsesstårta, semla (Easter).",
      "Invite: Ska vi fika? / Vill du ha kaffe?",
      "Pay: split ('vi delar'). Boss pays if boss invites.",
      "'Lagom' = just enough. No loud, no excess.",
    ],
    fill: [
      fb("Ska vi ___?", "fika", "Đi cà phê không?", "Shall we fika?"),
      fb("Jag tar en ___ .", "kanelbulle", "Tôi lấy bánh quế.", "I'll take a cinnamon bun."),
      fb("Vi ___ notan.", "delar", "Chia đôi tiền nhé.", "We split the bill."),
      fb("Det är ___ kaffe.", "lagom", "Cà phê vừa.", "Coffee is just right."),
      fb("Fika-___ kl. 10.", "paus", "Giải lao fika 10h.", "Fika break at 10."),
    ],
    translate: [
      tr("Mình đi fika nhé?", "Shall we fika?", "Ska vi fika?"),
      tr("1 cà phê đen.", "One black coffee.", "En svart kaffe."),
      tr("Bánh ngon quá.", "Pastry's great.", "Bullen är jättegod."),
      tr("Ai trả?", "Who pays?", "Vem betalar?"),
    ],
    match: [
      mp("fika", "giải lao cà phê"),
      mp("kanelbulle", "bánh quế"),
      mp("kaffe", "cà phê"),
      mp("lagom", "vừa đủ"),
      mp("delar", "chia"),
      mp("paus", "giải lao"),
    ],
  },

  12: {
    theoryTitleVi: "Hỏi đường + giới từ chỉ vị trí",
    theoryTitleEn: "Asking directions + location prepositions",
    theoryVi: [
      "Hỏi đường: 'Ursäkta, var ligger ___?' (Xin lỗi, ___ ở đâu?) / 'Hur kommer jag till ___?'",
      "Giới từ: på (trên/tại), i (trong), vid (gần), framför (trước), bakom (sau), bredvid (cạnh), mellan (giữa), över (qua).",
      "Hướng: höger (phải), vänster (trái), rakt fram (thẳng), nästa gata (phố tiếp).",
      "Câu hỏi đầy đủ: 'Var ligger biblioteket?' - 'Det ligger på Storgatan, bredvid kyrkan.'",
      "Phương tiện: med buss/tåg/bil/cykel. 'Jag åker buss till jobbet' (Tôi đi bus đi làm).",
      "Khoảng cách: 'Det är ___ minuter härifrån' (___ phút từ đây). 'Det är inte långt' (Không xa).",
    ],
    theoryEn: [
      "Ask: Ursäkta, var ligger ___? / Hur kommer jag till ___?",
      "Prepositions: på, i, vid, framför, bakom, bredvid, mellan, över.",
      "Directions: höger, vänster, rakt fram, nästa gata.",
      "Answer: Det ligger på Storgatan, bredvid kyrkan.",
      "Transport: med buss/tåg/bil/cykel. Jag åker buss till jobbet.",
      "Distance: Det är ___ minuter härifrån. Det är inte långt.",
    ],
    fill: [
      fb("___ , var ligger stationen?", "Ursäkta", "Xin lỗi, ga ở đâu?", "Excuse me, where's station?"),
      fb("Gå ___ fram.", "rakt", "Đi thẳng.", "Go straight."),
      fb("Sväng till ___.", "höger", "Rẽ phải.", "Turn right."),
      fb("Det ligger ___ kyrkan.", "bredvid", "Cạnh nhà thờ.", "Next to church."),
      fb("Jag åker ___ jobbet.", "till", "Tôi đến nơi làm.", "I go to work."),
    ],
    translate: [
      tr("Bưu điện ở đâu?", "Where's post office?", "Var ligger posten?"),
      tr("Đi bộ 5 phút.", "5 min walk.", "Fem minuter att gå."),
      tr("Rẽ trái rồi đi thẳng.", "Left then straight.", "Sväng vänster och gå rakt fram."),
      tr("Tôi bị lạc.", "I'm lost.", "Jag är vilse."),
    ],
    match: [
      mp("höger", "phải"), mp("vänster", "trái"),
      mp("rakt fram", "thẳng"), mp("bredvid", "cạnh"),
      mp("framför", "trước"), mp("bakom", "sau"),
    ],
  },

  13: {
    theoryTitleVi: "Thời tiết + 4 mùa Bắc Âu",
    theoryTitleEn: "Weather + 4 Nordic seasons",
    theoryVi: [
      "Hỏi: 'Hur är vädret idag?' - 'Det är ___' (Trời ___). Dùng 'det' giả định, không 'det är + nó'.",
      "Tính từ: soligt (nắng), molnigt (nhiều mây), regnigt (mưa), snöigt (tuyết), blåsigt (gió), kallt (lạnh), varmt (ấm).",
      "Nhiệt độ: 'Det är minus 10 grader' (-10°C) - mùa đông Phần Lan đến -25°C. 'Det är plus 25 grader' (+25°C).",
      "4 mùa: vår (xuân), sommar (hè), höst (thu), vinter (đông). Trước mùa thường dùng 'på': 'på sommaren' = vào mùa hè.",
      "Hiện tượng Bắc Âu: norrsken (cực quang), midnattssol (mặt trời lúc nửa đêm), polarnatt (đêm vùng cực).",
      "Mẹo nói chuyện phiếm: TĐ + PL bàn thời tiết NHIỀU. Câu vạn năng: 'Vilket väder!' (Thời tiết gì đây!).",
    ],
    theoryEn: [
      "Ask: Hur är vädret idag? Det är ___ (use dummy 'det').",
      "Adjectives: soligt, molnigt, regnigt, snöigt, blåsigt, kallt, varmt.",
      "Temperature: Det är minus 10 grader / plus 25 grader.",
      "Seasons: vår, sommar, höst, vinter. På sommaren = in summer.",
      "Nordic phenomena: norrsken, midnattssol, polarnatt.",
      "Small talk: Vilket väder!",
    ],
    fill: [
      fb("___ är vädret idag?", "Hur", "Thời tiết hôm nay?", "How's weather today?"),
      fb("Det är ___ ute.", "kallt", "Bên ngoài lạnh.", "It's cold."),
      fb("Det ___ idag.", "regnar", "Trời mưa.", "It rains."),
      fb("På ___ är det varmt.", "sommaren", "Mùa hè ấm.", "In summer it's warm."),
      fb("Det är minus tio ___ .", "grader", "-10 độ.", "Minus 10."),
    ],
    translate: [
      tr("Hôm nay nắng đẹp.", "Sunny today.", "Det är soligt idag."),
      tr("Mùa đông tuyết rơi.", "Snows in winter.", "Det snöar på vintern."),
      tr("Trời gió mạnh.", "It's windy.", "Det blåser mycket."),
      tr("Tôi yêu mùa thu.", "I love autumn.", "Jag älskar hösten."),
    ],
    match: [
      mp("vår", "xuân"), mp("sommar", "hè"),
      mp("höst", "thu"), mp("vinter", "đông"),
      mp("soligt", "nắng"), mp("snöigt", "tuyết"),
    ],
  },

  14: {
    theoryTitleVi: "Ôn tuần 2 + so sánh tính từ",
    theoryTitleEn: "Week 2 review + adjective comparison",
    theoryVi: [
      "So sánh hơn: thêm -are. Stor → större (lớn hơn). Snabb → snabbare (nhanh hơn).",
      "So sánh nhất: thêm -ast. Stor → störst, snabb → snabbast.",
      "Bất quy tắc: bra (tốt) → bättre → bäst. Dålig → sämre → sämst. Gammal → äldre → äldst.",
      "So sánh ngang: 'lika ___ som' (cũng ___ như). VD: Han är lika lång som jag (anh ấy cao bằng tôi).",
      "Hơn cái gì: 'större än' (lớn hơn). VD: Helsingfors är större än Vasa.",
      "Ôn tuần 2: chia tuần, thời gian, fika, mua sắm, hỏi đường, thời tiết - chạy lại 5 mẫu câu mỗi chủ đề.",
    ],
    theoryEn: [
      "Comparative: +are. Stor → större.",
      "Superlative: +ast. Stor → störst.",
      "Irregular: bra/bättre/bäst, dålig/sämre/sämst, gammal/äldre/äldst.",
      "Equal: lika ___ som. Han är lika lång som jag.",
      "Than: större än. Helsingfors är större än Vasa.",
      "Recap week 2.",
    ],
    fill: [
      fb("Han är ___ än jag.", "längre", "Anh ấy cao hơn tôi.", "He's taller."),
      fb("Det är ___ idag.", "kallare", "Hôm nay lạnh hơn.", "Colder today."),
      fb("Hon talar ___ svenska.", "bättre", "Cô ấy nói TĐ tốt hơn.", "Speaks Swedish better."),
      fb("Stockholm är ___ stad.", "störst", "Lớn nhất.", "Biggest city."),
      fb("Jag är ___ lång som du.", "lika", "Cao bằng bạn.", "As tall as you."),
    ],
    translate: [
      tr("Cà phê này ngon hơn.", "This coffee is better.", "Det här kaffet är bättre."),
      tr("Hôm qua lạnh nhất.", "Yesterday was coldest.", "Igår var det kallast."),
      tr("Bài này dễ hơn.", "This lesson is easier.", "Den här lektionen är lättare."),
      tr("Bạn nhanh bằng tôi.", "You're as fast as me.", "Du är lika snabb som jag."),
    ],
    match: [
      mp("bra", "tốt"), mp("bättre", "tốt hơn"), mp("bäst", "tốt nhất"),
      mp("stor", "to"), mp("större", "to hơn"), mp("störst", "to nhất"),
    ],
  },

  /* ==================== TUẦN 3 ==================== */
  15: {
    theoryTitleVi: "Cơ thể + sức khoẻ + đi khám",
    theoryTitleEn: "Body + health + doctor visit",
    theoryVi: [
      "Bộ phận: huvud (đầu), öga/ögon (mắt), öra/öron (tai), mun (miệng), näsa (mũi), arm, ben, fot/fötter, hand/händer.",
      "Đau: 'Jag har ont i ___' (Tôi đau ___). VD: Jag har ont i huvudet (đau đầu).",
      "Triệu chứng: feber (sốt), hosta (ho), snuva (sổ mũi), trött (mệt), illamående (buồn nôn).",
      "Đặt hẹn: 'Jag vill boka en tid hos läkaren' (Tôi muốn đặt khám). Số khẩn cấp PL+SE: 112.",
      "'Hälsocentral' (PL: terveysasema, trạm y tế công). 'Apotek' (nhà thuốc). 'Akutmottagning' (cấp cứu).",
      "Câu vạn năng tại quầy: 'Jag mår inte bra' (Tôi không khoẻ). 'Det gör ont här' (đau chỗ này).",
    ],
    theoryEn: [
      "Body: huvud, öga/ögon, öra/öron, mun, näsa, arm, ben, fot/fötter, hand/händer.",
      "Pain: Jag har ont i ___. Jag har ont i huvudet.",
      "Symptoms: feber, hosta, snuva, trött, illamående.",
      "Book: Jag vill boka en tid hos läkaren. Emergency: 112.",
      "Places: hälsocentral, apotek, akutmottagning.",
      "Universal: Jag mår inte bra. Det gör ont här.",
    ],
    fill: [
      fb("Jag har ont i ___ .", "huvudet", "Đau đầu.", "Headache."),
      fb("Jag har ___ .", "feber", "Tôi bị sốt.", "I have fever."),
      fb("Jag vill boka en tid hos ___.", "läkaren", "Đặt hẹn bs.", "Book with doctor."),
      fb("Var är ___?", "apoteket", "Nhà thuốc đâu?", "Where's pharmacy?"),
      fb("Det gör ___ här.", "ont", "Đau chỗ này.", "Hurts here."),
    ],
    translate: [
      tr("Tôi đau bụng.", "Stomach ache.", "Jag har ont i magen."),
      tr("Tôi cần thuốc.", "I need medicine.", "Jag behöver medicin."),
      tr("Ho 3 ngày rồi.", "Coughing 3 days.", "Jag har hostat i tre dagar."),
      tr("Gọi cứu thương!", "Call ambulance!", "Ring ambulansen!"),
    ],
    match: [
      mp("huvud", "đầu"), mp("mage", "bụng"),
      mp("feber", "sốt"), mp("hosta", "ho"),
      mp("läkare", "bác sĩ"), mp("apotek", "nhà thuốc"),
    ],
  },

  16: {
    theoryTitleVi: "Nhà ở + đồ đạc + giới từ trong nhà",
    theoryTitleEn: "Home + furniture + indoor prepositions",
    theoryVi: [
      "Phòng: kök (bếp), vardagsrum (phòng khách), sovrum (phòng ngủ), badrum (tắm), hall (sảnh).",
      "Đồ: bord (bàn), stol (ghế), säng (giường), soffa, tv, lampa, kylskåp (tủ lạnh), spis (bếp nấu).",
      "Giới từ trong/ngoài: i (trong), på (trên), under (dưới), över (phía trên), bredvid (cạnh).",
      "Câu hỏi: 'Var är boken?' - 'Den är på bordet' (Trên bàn) / 'i kylskåpet' (trong tủ lạnh).",
      "Loại nhà: lägenhet (căn hộ), hus/villa (nhà riêng), radhus (nhà liền kề), studentbostad (KTX SV).",
      "Thuê: 'Jag hyr en lägenhet på 50 kvadratmeter' (Thuê căn 50 m²). 1 rok = 1 phòng + bếp.",
    ],
    theoryEn: [
      "Rooms: kök, vardagsrum, sovrum, badrum, hall.",
      "Furniture: bord, stol, säng, soffa, tv, lampa, kylskåp, spis.",
      "Prepositions: i, på, under, över, bredvid.",
      "Where? Var är boken? Den är på bordet / i kylskåpet.",
      "Housing: lägenhet, hus/villa, radhus, studentbostad.",
      "Rent: Jag hyr en lägenhet på 50 kvm. 1 rok.",
    ],
    fill: [
      fb("Jag bor i en ___ .", "lägenhet", "Tôi ở căn hộ.", "I live in a flat."),
      fb("Mjölken är i ___ .", "kylskåpet", "Sữa trong tủ lạnh.", "Milk in fridge."),
      fb("Boken ligger ___ bordet.", "på", "Sách trên bàn.", "Book on table."),
      fb("Vi äter i ___ .", "köket", "Ăn trong bếp.", "Eat in kitchen."),
      fb("Sängen står i ___ .", "sovrummet", "Giường trong p. ngủ.", "Bed in bedroom."),
    ],
    translate: [
      tr("Nhà tôi 3 phòng.", "3-room apartment.", "Tre rum och kök."),
      tr("Tủ lạnh trống.", "Fridge is empty.", "Kylskåpet är tomt."),
      tr("Phòng khách rộng.", "Living room is big.", "Vardagsrummet är stort."),
      tr("Tôi tìm phòng thuê.", "Looking for rental.", "Jag söker en lägenhet."),
    ],
    match: [
      mp("kök", "bếp"), mp("sovrum", "phòng ngủ"),
      mp("badrum", "phòng tắm"), mp("bord", "bàn"),
      mp("säng", "giường"), mp("kylskåp", "tủ lạnh"),
    ],
  },

  17: {
    theoryTitleVi: "Quần áo + màu sắc + 'klä på sig'",
    theoryTitleEn: "Clothes + colours + 'klä på sig'",
    theoryVi: [
      "Đồ: tröja (áo len), skjorta (sơ mi), byxor (quần), kjol (váy), klänning (đầm), strumpor (vớ), skor (giày), jacka (áo khoác).",
      "Màu: röd (đỏ), blå (xanh dương), gul (vàng), grön (lá), svart (đen), vit (trắng), grå (xám), brun (nâu), rosa (hồng).",
      "Hợp với en/ett: en röd tröja, ett rött hus, röda skor. Quy tắc -t (ett), -a (số nhiều).",
      "Mặc/cởi: 'klä på sig' (mặc vào), 'klä av sig' (cởi ra) - phản thân với 'sig'.",
      "Mua: 'Vilken storlek?' (Cỡ nào?) - S/M/L hoặc 38, 40, 42. 'Får jag prova?' (Cho thử nhé?).",
      "Khen: 'Den klär dig!' (Hợp với bạn đó!). 'Den är snygg' (đẹp/sành điệu).",
    ],
    theoryEn: [
      "Clothes: tröja, skjorta, byxor, kjol, klänning, strumpor, skor, jacka.",
      "Colours: röd, blå, gul, grön, svart, vit, grå, brun, rosa.",
      "Agreement: en röd tröja, ett rött hus, röda skor.",
      "Dress/undress: klä på sig / klä av sig (reflexive).",
      "Buy: Vilken storlek? Får jag prova?",
      "Compliment: Den klär dig! Den är snygg.",
    ],
    fill: [
      fb("Hon har en ___ jacka.", "röd", "Áo khoác đỏ.", "Red jacket."),
      fb("Det är ett ___ hus.", "rött", "Nhà đỏ.", "Red house."),
      fb("Jag har ___ skor.", "röda", "Giày đỏ.", "Red shoes."),
      fb("Vilken ___ vill du ha?", "storlek", "Cỡ nào?", "Which size?"),
      fb("Får jag ___ den?", "prova", "Cho thử nhé?", "May I try?"),
    ],
    translate: [
      tr("Áo này hợp bạn.", "Suits you.", "Den klär dig."),
      tr("Quần đen size M.", "Black trousers M.", "Svarta byxor i storlek M."),
      tr("Tôi cần áo khoác ấm.", "Need warm jacket.", "Jag behöver en varm jacka."),
      tr("Giày này đắt quá.", "Shoes too pricey.", "Skorna är för dyra."),
    ],
    match: [
      mp("röd", "đỏ"), mp("blå", "xanh dương"),
      mp("svart", "đen"), mp("vit", "trắng"),
      mp("jacka", "áo khoác"), mp("skor", "giày"),
    ],
  },

  18: {
    theoryTitleVi: "Đi tàu/bus + mua vé HSL",
    theoryTitleEn: "Train/bus + HSL tickets",
    theoryVi: [
      "PT công cộng: tåg (tàu), buss, spårvagn (xe điện), metro/tunnelbana, färja (phà). PL có HSL app.",
      "Vé: 'enkelbiljett' (1 chiều), 'returbiljett' (khứ hồi), 'månadskort' (vé tháng), 'studentrabatt' (giảm SV).",
      "Câu hỏi: 'När går nästa tåg till ___?' (Tàu kế đi ___ lúc nào?). 'Vilken plattform?' (Sân ga nào?).",
      "Mua: 'En enkelbiljett till Vasa, tack' / 'Två returbiljetter till Helsingfors'.",
      "Trạm dừng: 'Nästa hållplats är ___' (Trạm tới là ___). Nút bấm: 'Stannar nästa' (Sẽ dừng).",
      "Trễ/huỷ: 'försenat' (trễ), 'inställt' (huỷ), 'spår' (đường ray). Theo dõi qua VR / Matkahuolto / SJ.",
    ],
    theoryEn: [
      "Transport: tåg, buss, spårvagn, metro, färja. HSL app in Finland.",
      "Tickets: enkelbiljett, returbiljett, månadskort, studentrabatt.",
      "Q: När går nästa tåg till ___? Vilken plattform?",
      "Buy: En enkelbiljett till Vasa, tack.",
      "Stops: Nästa hållplats är ___. Stannar nästa.",
      "Disruptions: försenat, inställt. Apps: VR, SJ, Matkahuolto.",
    ],
    fill: [
      fb("En ___ till Åbo, tack.", "enkelbiljett", "1 chiều Turku.", "One way to Turku."),
      fb("När går ___ tåg?", "nästa", "Tàu kế lúc nào?", "Next train when?"),
      fb("Vilken ___ ?", "plattform", "Sân ga nào?", "Which platform?"),
      fb("Tåget är ___ .", "försenat", "Tàu trễ.", "Train delayed."),
      fb("Stannar ___ , tack.", "nästa", "Cho dừng trạm tới.", "Stop next, please."),
    ],
    translate: [
      tr("2 vé khứ hồi.", "Two returns.", "Två returbiljetter."),
      tr("Giá vé tháng?", "Monthly card price?", "Vad kostar månadskortet?"),
      tr("Bị huỷ chuyến.", "It's cancelled.", "Det är inställt."),
      tr("Sinh viên có giảm?", "Student discount?", "Finns studentrabatt?"),
    ],
    match: [
      mp("tåg", "tàu hoả"), mp("buss", "xe buýt"),
      mp("spårvagn", "xe điện"), mp("metro", "tàu điện ngầm"),
      mp("hållplats", "trạm dừng"), mp("biljett", "vé"),
    ],
  },

  19: {
    theoryTitleVi: "Công việc + nghề nghiệp + email cơ bản",
    theoryTitleEn: "Work + jobs + basic email",
    theoryVi: [
      "Nghề: lärare (gv), läkare (bs), sjuksköterska (y tá), ingenjör, kock, säljare, programmerare, student.",
      "Hỏi: 'Vad jobbar du med?' / 'Vad har du för yrke?'. Trả lời: 'Jag jobbar som ___' hoặc 'Jag är ___'.",
      "Nơi làm: 'Jag arbetar på ___' (tôi làm ở ___). 'kontor' (vp), 'sjukhus' (bv), 'skola' (trường).",
      "Email mở: 'Hej + tên,'. Đóng: 'Med vänliga hälsningar, [Tên]' (= Best regards). Trang trọng: 'Bästa ___'.",
      "Cụm email: 'Tack på förhand' (Cảm ơn trước), 'Hör av dig' (Báo lại), 'Vänligen' (Vui lòng).",
      "Văn hoá VP TĐ: gọi sếp bằng TÊN (không ngài/bà). Họp đúng giờ. Ngắt giải lao fika.",
    ],
    theoryEn: [
      "Jobs: lärare, läkare, sjuksköterska, ingenjör, kock, säljare, programmerare, student.",
      "Ask: Vad jobbar du med? Answer: Jag jobbar som ___ / Jag är ___.",
      "Workplace: Jag arbetar på kontor / sjukhus / skola.",
      "Email: Hej + name; Med vänliga hälsningar (best regards); Bästa (formal).",
      "Email phrases: Tack på förhand, Hör av dig, Vänligen.",
      "Office culture: first-name basis, punctual, fika breaks.",
    ],
    fill: [
      fb("Vad ___ du med?", "jobbar", "Bạn làm nghề gì?", "What's your job?"),
      fb("Jag jobbar ___ lärare.", "som", "Tôi làm gv.", "I work as teacher."),
      fb("Jag arbetar ___ kontor.", "på", "Tôi làm văn phòng.", "Office worker."),
      fb("Med vänliga ___ .", "hälsningar", "Trân trọng.", "Best regards."),
      fb("Tack på ___.", "förhand", "Cảm ơn trước.", "Thanks in advance."),
    ],
    translate: [
      tr("Tôi là kỹ sư phần mềm.", "Software engineer.", "Jag är mjukvaruingenjör."),
      tr("Em làm ở bệnh viện.", "I work at hospital.", "Jag arbetar på sjukhuset."),
      tr("Bạn thích việc không?", "Like your job?", "Trivs du på jobbet?"),
      tr("Hẹn họp 9h sáng.", "Meeting 9am.", "Möte klockan nio."),
    ],
    match: [
      mp("lärare", "giáo viên"), mp("läkare", "bác sĩ"),
      mp("ingenjör", "kỹ sư"), mp("kock", "đầu bếp"),
      mp("kontor", "văn phòng"), mp("möte", "cuộc họp"),
    ],
  },

  20: {
    theoryTitleVi: "Sở thích + động từ tâm trạng (gilla/tycka)",
    theoryTitleEn: "Hobbies + opinion verbs (gilla/tycka)",
    theoryVi: [
      "'Gilla' (thích) + danh từ HOẶC + att + động từ. VD: Jag gillar musik. Jag gillar att läsa.",
      "'Tycka om' = 'gilla' (thân mật hơn). 'Tycker om' + danh từ/att+v. 'Älska' = yêu (mạnh hơn).",
      "Không thích: 'Jag tycker inte om ___' / 'Jag gillar inte ___'. 'Hata' = ghét.",
      "Hỏi ý kiến: 'Vad tycker du om ___?' (Bạn nghĩ gì về ___?). Trả lời: 'Det är jättebra/dåligt'.",
      "Sở thích: läsa böcker (đọc sách), spela fotboll, sjunga (hát), måla (vẽ), resa (đi du lịch), laga mat (nấu ăn).",
      "Tần suất: alltid (luôn), ofta (thường), ibland (thỉnh thoảng), sällan (hiếm), aldrig (không bao giờ).",
    ],
    theoryEn: [
      "'Gilla' + noun OR + att + verb. Jag gillar musik / att läsa.",
      "'Tycka om' = gilla (informal). 'Älska' = love (stronger).",
      "Negation: Jag tycker inte om ___. Hata = hate.",
      "Opinion: Vad tycker du om ___? Det är jättebra/dåligt.",
      "Hobbies: läsa, spela fotboll, sjunga, måla, resa, laga mat.",
      "Frequency: alltid, ofta, ibland, sällan, aldrig.",
    ],
    fill: [
      fb("Jag ___ kaffe.", "gillar", "Tôi thích cà phê.", "I like coffee."),
      fb("Jag gillar ___ läsa.", "att", "Tôi thích đọc.", "Like to read."),
      fb("Vad ___ du om filmen?", "tycker", "Phim sao?", "What do you think?"),
      fb("Jag ___ pizza!", "älskar", "Tôi yêu pizza.", "I love pizza."),
      fb("Jag åker ___ till havet.", "ofta", "Hay đi biển.", "Often go to sea."),
    ],
    translate: [
      tr("Tôi thích trượt tuyết.", "I like skiing.", "Jag gillar att åka skidor."),
      tr("Em không thích ồn ào.", "I don't like noise.", "Jag tycker inte om ljud."),
      tr("Bạn nghĩ sao về Vasa?", "What about Vasa?", "Vad tycker du om Vasa?"),
      tr("Thỉnh thoảng tôi nấu ăn.", "Sometimes I cook.", "Ibland lagar jag mat."),
    ],
    match: [
      mp("gilla", "thích"), mp("älska", "yêu"),
      mp("hata", "ghét"), mp("alltid", "luôn"),
      mp("ofta", "thường"), mp("aldrig", "không bao giờ"),
    ],
  },

  21: {
    theoryTitleVi: "Ôn tuần 3 + tổng hợp giới từ thời gian",
    theoryTitleEn: "Week 3 review + time prepositions",
    theoryVi: [
      "'På' + thứ/buổi/mùa: på måndag, på morgonen, på sommaren.",
      "'I' + tháng/năm/khoảng: i mars, i år, i en timme (trong 1 giờ).",
      "'Om' + tương lai gần: om en vecka (1 tuần nữa), om en månad.",
      "'Sedan' + quá khứ: för en vecka sedan (1 tuần trước).",
      "'Kl.' (klockan) cho giờ: kl. 14:30. 'Mellan' (giữa) + 2 mốc: mellan 9 och 11.",
      "Ôn tuần 3: cơ thể, sức khoẻ, nhà ở, đồ đạc, quần áo, đi tàu, công việc, sở thích.",
    ],
    theoryEn: [
      "På + day/time/season: på måndag, på morgonen, på sommaren.",
      "I + month/year/duration: i mars, i år, i en timme.",
      "Om + near future: om en vecka.",
      "Sedan + past: för en vecka sedan.",
      "Kl. (klockan) for time. Mellan + 2 marks.",
      "Recap week 3.",
    ],
    fill: [
      fb("Vi ses ___ måndag.", "på", "Hẹn t2.", "See you Mon."),
      fb("Jag åker hem ___ juni.", "i", "Về tháng 6.", "Home in June."),
      fb("Jag är klar ___ en timme.", "om", "Xong sau 1h.", "Done in 1h."),
      fb("För en vecka ___ .", "sedan", "1 tuần trước.", "A week ago."),
      fb("___ klockan tre.", "Kl.", "Lúc 3h.", "At 3."),
    ],
    translate: [
      tr("Vào mùa đông tôi trượt tuyết.", "Ski in winter.", "På vintern åker jag skidor."),
      tr("Tháng tới tôi đi PL.", "Next month I go FI.", "Nästa månad åker jag till Finland."),
      tr("2 ngày trước.", "2 days ago.", "För två dagar sedan."),
      tr("Giữa 9 và 11.", "Between 9 and 11.", "Mellan nio och elva."),
    ],
    match: [
      mp("på", "vào (thứ/mùa)"),
      mp("i", "trong (tháng/năm)"),
      mp("om", "sau (tương lai)"),
      mp("sedan", "trước đây"),
      mp("kl.", "lúc (giờ)"),
      mp("mellan", "giữa"),
    ],
  },

  /* ==================== TUẦN 4 ==================== */
  22: {
    theoryTitleVi: "Lễ hội Bắc Âu + allemansrätten",
    theoryTitleEn: "Nordic festivals + allemansrätten",
    theoryVi: [
      "Allemansrätten = quyền tự do đi lại trong tự nhiên: được hái nấm/quả, cắm trại 1 đêm, miễn không phá.",
      "3 nguyên tắc: 'Không phá - Không quấy rầy' (Inte störa, inte förstöra).",
      "Midsommar (Trung hạ, t6): dựng cột midsommarstång, nhảy quanh, ăn sill+potatis+jordgubbar.",
      "Lucia (13/12): rước nến trắng đầu, hát 'Sankta Lucia', ăn lussebullar (bánh saffron).",
      "Jul (Giáng sinh 24/12): julbord (bàn tiệc), julklappar (quà), Jultomten (ông già Noel).",
      "Vappu (1/5, PL): SV lễ lao động + sinh viên. Đội mũ trắng, uống sima, ăn munk + tippaleipä.",
    ],
    theoryEn: [
      "Allemansrätten = right of public access: pick berries/mushrooms, camp 1 night.",
      "Rules: Inte störa, inte förstöra (don't disturb, don't destroy).",
      "Midsommar (June): maypole dance, herring+potatoes+strawberries.",
      "Lucia (Dec 13): candle procession, lussebullar.",
      "Jul (Dec 24): julbord, julklappar, Jultomten.",
      "Vappu (May 1, FI): white caps, sima, munk + tippaleipä.",
    ],
    fill: [
      fb("Vi firar ___ i juni.", "midsommar", "Mừng Trung hạ t6.", "Celebrate Midsummer."),
      fb("___ är 13 december.", "Lucia", "Lucia là 13/12.", "Lucia is Dec 13."),
      fb("Vi äter ___ på jul.", "julbord", "Ăn tiệc Noel.", "Christmas table."),
      fb("Jag plockar ___ i skogen.", "bär", "Hái quả trong rừng.", "Pick berries."),
      fb("Inte störa, inte ___.", "förstöra", "Ko phá hoại.", "Don't destroy."),
    ],
    translate: [
      tr("Tôi yêu cực quang.", "Love northern lights.", "Jag älskar norrsken."),
      tr("Bạn ăn gì dịp Noel?", "Christmas food?", "Vad äter du på jul?"),
      tr("Rừng đẹp tuyệt.", "Forest is beautiful.", "Skogen är fantastisk."),
      tr("Cắm trại 1 đêm được.", "Camp 1 night OK.", "Det är okej att tälta en natt."),
    ],
    match: [
      mp("midsommar", "Trung hạ"), mp("lucia", "lễ Lucia"),
      mp("jul", "Giáng sinh"), mp("vappu", "1/5 PL"),
      mp("allemansrätten", "quyền tự do thiên nhiên"),
      mp("julbord", "bàn tiệc Noel"),
    ],
  },

  23: {
    theoryTitleVi: "Điện thoại + đặt lịch hẹn (lịch sự)",
    theoryTitleEn: "Phone + booking (polite)",
    theoryVi: [
      "Mở máy: 'Hej, det är ___ från ___' (Chào, ___ từ ___). KHÔNG nói 'hello' kiểu Anh-Mỹ.",
      "Lý do: 'Jag ringer för att boka ___' (Tôi gọi để đặt ___) / 'Jag undrar om ___' (Tôi muốn biết ___).",
      "Lịch sự: 'Skulle jag kunna ___?' (Tôi có thể ___ không?). 'Vänligen' = vui lòng.",
      "Đặt hẹn bs: 'Jag vill boka en tid hos läkaren, tack'. 'Vilken tid passar?' (Giờ nào tiện?).",
      "Trả lời: 'Det passar bra' (tốt) / 'Det passar inte' (không tiện). 'Vi ses då' (Hẹn vậy nhé).",
      "Kết thúc: 'Tack så mycket. Ha en bra dag. Hej då!'",
    ],
    theoryEn: [
      "Open: Hej, det är ___ från ___. Don't say 'hello' Anglo-style.",
      "Reason: Jag ringer för att boka ___ / Jag undrar om ___.",
      "Polite: Skulle jag kunna ___? Vänligen.",
      "Doctor: Jag vill boka en tid hos läkaren. Vilken tid passar?",
      "Confirm: Det passar bra / inte. Vi ses då.",
      "Close: Tack så mycket. Ha en bra dag. Hej då!",
    ],
    fill: [
      fb("___ , det är Linh.", "Hej", "Chào, Linh đây.", "Hi, it's Linh."),
      fb("Jag ___ för att boka.", "ringer", "Tôi gọi để đặt.", "I'm calling to book."),
      fb("Vilken tid ___?", "passar", "Giờ nào tiện?", "Which time works?"),
      fb("Det passar ___.", "bra", "Tốt.", "Sounds good."),
      fb("Ha en bra ___.", "dag", "Chúc ngày tốt.", "Have a good day."),
    ],
    translate: [
      tr("Tôi muốn nói với bs Lin.", "Speak to Dr Lin.", "Jag vill tala med doktor Lin."),
      tr("Có thể đổi giờ không?", "Reschedule?", "Kan vi byta tid?"),
      tr("Mai 10h được không?", "Tomorrow 10?", "Imorgon klockan tio?"),
      tr("Cảm ơn, hẹn gặp.", "Thanks, see you.", "Tack, vi ses."),
    ],
    match: [
      mp("ringer", "gọi"),
      mp("boka", "đặt"),
      mp("passar", "tiện"),
      mp("undrar", "thắc mắc"),
      mp("vänligen", "vui lòng"),
      mp("hej då", "tạm biệt"),
    ],
  },

  24: {
    theoryTitleVi: "Cảm xúc + 'må' (cảm thấy)",
    theoryTitleEn: "Emotions + 'må' (to feel)",
    theoryVi: [
      "Hỏi: 'Hur mår du?' - 'Jag mår bra/dåligt/sådär' (khoẻ/dở/tàm tạm). 'mår' = cảm thấy/sức khoẻ.",
      "Tính từ cảm xúc: glad (vui), ledsen (buồn), arg (giận), trött (mệt), orolig (lo), stressad (stress), nöjd (hài lòng).",
      "Cường độ: jätte- (rất), lite (chút), ganska (khá), inte alls (không hề). VD: jätteglad, lite trött.",
      "Lý do: 'Jag är ledsen för att ___' (Tôi buồn vì ___). 'Jag är glad över ___' (vui vì ___).",
      "An ủi: 'Det blir bra' (Sẽ ổn thôi). 'Jag förstår' (Tôi hiểu). 'Det är okej att gråta' (Khóc cũng ổn).",
      "Sức khoẻ tinh thần PL/SE rất được coi trọng. Hotline khẩn cấp: Mieli (PL) 09 2525 0111.",
    ],
    theoryEn: [
      "Ask: Hur mår du? Jag mår bra/dåligt/sådär. 'mår' = feel.",
      "Emotions: glad, ledsen, arg, trött, orolig, stressad, nöjd.",
      "Intensity: jätte- (very), lite, ganska, inte alls.",
      "Cause: Jag är ledsen för att ___. Jag är glad över ___.",
      "Comfort: Det blir bra. Jag förstår. Det är okej att gråta.",
      "Mental health is respected. FI hotline Mieli 09 2525 0111.",
    ],
    fill: [
      fb("Hur ___ du?", "mår", "Bạn khoẻ không?", "How are you?"),
      fb("Jag är ___ idag.", "glad", "Tôi vui hôm nay.", "I'm happy today."),
      fb("Hon är ___ trött.", "jätte", "Cô ấy rất mệt.", "Very tired."),
      fb("Det blir ___ .", "bra", "Sẽ ổn thôi.", "Will be fine."),
      fb("Jag är orolig ___ provet.", "för", "Lo về bài kt.", "Worried about test."),
    ],
    translate: [
      tr("Hôm nay tôi buồn.", "Sad today.", "Jag är ledsen idag."),
      tr("Cảm ơn đã hỏi.", "Thanks for asking.", "Tack för att du frågar."),
      tr("Đừng lo lắng.", "Don't worry.", "Var inte orolig."),
      tr("Tôi cần nghỉ.", "I need a break.", "Jag behöver en paus."),
    ],
    match: [
      mp("glad", "vui"), mp("ledsen", "buồn"),
      mp("arg", "giận"), mp("trött", "mệt"),
      mp("orolig", "lo"), mp("nöjd", "hài lòng"),
    ],
  },

  25: {
    theoryTitleVi: "Lên kế hoạch + động từ khiếm khuyết (ska/vill/kan/måste)",
    theoryTitleEn: "Plans + modal verbs (ska/vill/kan/måste)",
    theoryVi: [
      "Modal đi với động từ NGUYÊN THỂ (không 'att'): Jag ska gå hem. Jag kan simma.",
      "'ska' = sẽ (kế hoạch). 'kommer att' = sẽ (dự đoán). 'vill' = muốn. 'kan' = có thể. 'måste' = phải. 'får' = được phép.",
      "Phủ định: 'Jag kan inte komma' (Tôi không thể đến). 'inte' đứng SAU động từ.",
      "Câu hỏi: 'Kan du hjälpa mig?' (Bạn giúp được không?). 'Ska vi gå?' (Đi không?).",
      "'borde' = nên (lời khuyên). 'Du borde sova mer' (Bạn nên ngủ hơn).",
      "Lịch tuần: 'På måndag ska jag jobba. På tisdag måste jag plugga.' Lập lịch song ngữ để luyện.",
    ],
    theoryEn: [
      "Modals + bare infinitive (no 'att'): Jag ska gå hem.",
      "ska = will (plan). kommer att = will (predict). vill = want. kan = can. måste = must. får = may.",
      "Negate: Jag kan inte komma. 'inte' AFTER verb.",
      "Q: Kan du hjälpa mig? Ska vi gå?",
      "'borde' = should. Du borde sova mer.",
      "Weekly plan: På måndag ska jag jobba.",
    ],
    fill: [
      fb("Jag ___ gå hem nu.", "ska", "Tôi sẽ về.", "Going home."),
      fb("Hon ___ simma bra.", "kan", "Cô bơi giỏi.", "Can swim well."),
      fb("Vi ___ jobba imorgon.", "måste", "Phải làm mai.", "Must work."),
      fb("Du ___ sova mer.", "borde", "Bạn nên ngủ thêm.", "Should sleep more."),
      fb("___ vi gå på bio?", "Ska", "Đi xem phim ko?", "Shall we go cinema?"),
    ],
    translate: [
      tr("Tôi muốn học thêm.", "Want to study more.", "Jag vill studera mer."),
      tr("Có thể giúp tôi không?", "Can you help?", "Kan du hjälpa mig?"),
      tr("Mai phải dậy sớm.", "Wake up early.", "Imorgon måste jag gå upp tidigt."),
      tr("Chúng ta nên đi.", "We should go.", "Vi borde gå."),
    ],
    match: [
      mp("ska", "sẽ"), mp("vill", "muốn"),
      mp("kan", "có thể"), mp("måste", "phải"),
      mp("får", "được phép"), mp("borde", "nên"),
    ],
  },

  26: {
    theoryTitleVi: "Mua sắm nâng cao + đổi/trả hàng",
    theoryTitleEn: "Advanced shopping + returns",
    theoryVi: [
      "Mở thoại bán hàng: 'Hej, kan jag hjälpa dig?' / 'Hej, jag tittar bara' (Tôi chỉ ngó).",
      "Hỏi: 'Har ni ___ i annan storlek/färg?' (Có cỡ/màu khác không?). 'Finns det fler?' (Còn không?).",
      "Đổi/trả: 'Jag vill byta/lämna tillbaka den här' + 'Här är kvittot' (Đây là hoá đơn).",
      "Lý do: 'Den passar inte' (không vừa) / 'Den är trasig' (hỏng) / 'Fel storlek' (sai cỡ).",
      "Quyền lợi: SE/PL cho phép đổi 14-30 ngày, hoàn tiền nếu lỗi NSX. 'Reklamation' = khiếu nại.",
      "Giảm giá Black Friday/Mellandagsrea (giữa Noel-năm mới) - tới 70%.",
    ],
    theoryEn: [
      "Open: Hej, kan jag hjälpa dig? / Jag tittar bara.",
      "Q: Har ni ___ i annan storlek/färg? Finns det fler?",
      "Return: Jag vill byta/lämna tillbaka den här. Här är kvittot.",
      "Reason: Den passar inte / är trasig / fel storlek.",
      "Rights: 14-30 days exchange. Reklamation = complaint.",
      "Sales: Black Friday, Mellandagsrea (post-Christmas) up to 70%.",
    ],
    fill: [
      fb("Jag ___ bara, tack.", "tittar", "Chỉ ngó thôi.", "Just looking."),
      fb("Har ni i annan ___ ?", "färg", "Có màu khác?", "Other colour?"),
      fb("Jag vill ___ tillbaka den.", "lämna", "Tôi muốn trả.", "Want to return."),
      fb("Den ___ inte.", "passar", "Không vừa.", "Doesn't fit."),
      fb("Här är ___ .", "kvittot", "Hoá đơn đây.", "Here's receipt."),
    ],
    translate: [
      tr("Còn cỡ M không?", "M still in stock?", "Finns det i storlek M?"),
      tr("Đổi giúp size lớn hơn.", "Larger size please.", "En större storlek, tack."),
      tr("Tôi muốn hoàn tiền.", "Want refund.", "Jag vill ha pengarna tillbaka."),
      tr("Hàng bị hỏng.", "Item is broken.", "Varan är trasig."),
    ],
    match: [
      mp("byta", "đổi"), mp("lämna tillbaka", "trả"),
      mp("kvitto", "hoá đơn"), mp("storlek", "cỡ"),
      mp("färg", "màu"), mp("rea", "giảm giá"),
    ],
  },

  27: {
    theoryTitleVi: "Internet + ngân hàng + BankID/Mobiilivarmenne",
    theoryTitleEn: "Internet + banking + BankID/Mobiilivarmenne",
    theoryVi: [
      "Đăng ký dịch vụ ở SE/PL bắt buộc có ID số: BankID (SE) hoặc Mobiilivarmenne / verkkopankki (PL).",
      "Mở tài khoản: 'Jag vill öppna ett konto' + giấy tờ: pass, uppehållstillstånd (giấy cư trú), personnummer.",
      "Chuyển tiền: 'Jag vill överföra pengar till ___'. App phổ biến: Swish (SE - tức thì), MobilePay (PL).",
      "Internet: bredband (băng rộng), wifi/wi-fi, lösenord (mật khẩu). Nhà cung cấp: Telia, Elisa, DNA.",
      "Mã code 6 chữ số gửi qua app khi đăng nhập - KHÔNG bao giờ đọc cho ai. Cảnh báo lừa đảo phổ biến.",
      "Ngân hàng lớn: SEB, Nordea, OP, Handelsbanken. Hợp đồng số thay chữ ký giấy.",
    ],
    theoryEn: [
      "Digital ID required: BankID (SE) or Mobiilivarmenne / verkkopankki (FI).",
      "Open account: Jag vill öppna ett konto + pass, residence permit, personnummer.",
      "Transfer: Jag vill överföra pengar till ___. Apps: Swish (SE), MobilePay (FI).",
      "Internet: bredband, wifi, lösenord. Providers: Telia, Elisa, DNA.",
      "6-digit codes - NEVER share. Common scam target.",
      "Big banks: SEB, Nordea, OP, Handelsbanken.",
    ],
    fill: [
      fb("Jag vill öppna ett ___ .", "konto", "Mở tài khoản.", "Open account."),
      fb("Vad är ditt ___ ?", "lösenord", "Mật khẩu?", "Password?"),
      fb("Jag betalar med ___ .", "Swish", "Trả bằng Swish.", "Pay with Swish."),
      fb("Ange din ___ .", "PIN-kod", "Nhập PIN.", "Enter PIN."),
      fb("Logga in med ___ .", "BankID", "Đăng nhập BankID.", "Login w BankID."),
    ],
    translate: [
      tr("Tôi cần wifi ở nhà.", "Need home wifi.", "Jag behöver wifi hemma."),
      tr("Quên mật khẩu rồi.", "Forgot password.", "Jag har glömt lösenordet."),
      tr("Chuyển 50 kr nhé.", "Send 50 kr.", "Skicka femtio kronor."),
      tr("Đây là lừa đảo!", "It's a scam!", "Det är bedrägeri!"),
    ],
    match: [
      mp("konto", "tài khoản"), mp("lösenord", "mật khẩu"),
      mp("BankID", "ID số SE"),
      mp("Swish", "ứng dụng trả tiền SE"),
      mp("bredband", "băng thông rộng"),
      mp("bedrägeri", "lừa đảo"),
    ],
  },

  28: {
    theoryTitleVi: "Ôn tuần 4 + động từ phản thân (sig)",
    theoryTitleEn: "Week 4 review + reflexive verbs (sig)",
    theoryVi: [
      "Phản thân: chủ ngữ tự làm cho chính mình. Đại từ phản thân: mig, dig, sig, oss, er, sig.",
      "Động từ phổ biến: tvätta sig (tắm/rửa), klä på sig (mặc), känna sig (cảm thấy), gifta sig (cưới).",
      "VD: 'Jag tvättar mig' (Tôi tắm). 'Han känner sig trött' (Anh ấy thấy mệt).",
      "Khác tiếng Anh: 'lära sig' = học (cho mình). 'Jag lär mig svenska' (Tôi học TĐ).",
      "Câu hỏi: 'Hur känner du dig?' (Bạn thấy thế nào?). Trả lời: 'Jag känner mig bra'.",
      "Ôn tuần 4: lễ hội, gọi điện, cảm xúc, kế hoạch, mua sắm, ngân hàng - lặp 5 câu mỗi chủ đề.",
    ],
    theoryEn: [
      "Reflexive: subject does action to self. Pronouns: mig, dig, sig, oss, er, sig.",
      "Common: tvätta sig, klä på sig, känna sig, gifta sig.",
      "Jag tvättar mig. Han känner sig trött.",
      "Differs from English: lära sig = learn. Jag lär mig svenska.",
      "Q: Hur känner du dig? A: Jag känner mig bra.",
      "Week 4 recap.",
    ],
    fill: [
      fb("Jag tvättar ___ .", "mig", "Tôi tắm.", "I wash."),
      fb("Hon känner ___ trött.", "sig", "Cô thấy mệt.", "Feels tired."),
      fb("Vi lär ___ svenska.", "oss", "Học TĐ.", "Learn Swedish."),
      fb("Klä på ___ , barnen!", "er", "Mặc đồ vào, các con!", "Get dressed, kids!"),
      fb("Hur känner du ___ ?", "dig", "Cảm thấy sao?", "How feel?"),
    ],
    translate: [
      tr("Tôi đang học TĐ.", "I'm learning Swedish.", "Jag lär mig svenska."),
      tr("Hôm nay tôi thấy vui.", "Feel happy today.", "Jag känner mig glad idag."),
      tr("Cô ấy chuẩn bị đồ.", "She gets ready.", "Hon klär på sig."),
      tr("Chúng tôi giới thiệu nhau.", "We introduce ourselves.", "Vi presenterar oss."),
    ],
    match: [
      mp("mig", "tôi (phản thân)"),
      mp("dig", "bạn (phản thân)"),
      mp("sig", "chính mình"),
      mp("tvätta sig", "tắm"),
      mp("känna sig", "cảm thấy"),
      mp("lära sig", "học"),
    ],
  },

  /* ==================== TUẦN 5 ==================== */
  29: {
    theoryTitleVi: "Tổng hợp mini-test 50 câu mô phỏng YKI A1",
    theoryTitleEn: "Mini-test 50 questions - YKI A1 simulation",
    theoryVi: [
      "Cấu trúc YKI A1 (TĐ): nghe 20 phút, đọc 20 phút, viết 15 phút, nói 10 phút.",
      "Nghe: chọn đáp án A/B/C, nội dung sinh hoạt (siêu thị, hỏi đường, bưu điện).",
      "Đọc: text 50-100 từ + 5 câu hỏi T/F hoặc chọn ý.",
      "Viết: 2 nhiệm vụ - tin nhắn ngắn (40-60 từ) + điền form (tên/tuổi/địa chỉ).",
      "Nói: tự giới thiệu 1 phút + hỏi đáp 3 câu (mua sắm, hỏi đường, gọi điện).",
      "Mẹo: bình tĩnh, dùng câu ngắn, đừng sửa quá nhiều, miễn người chấm hiểu là OK.",
    ],
    theoryEn: [
      "YKI A1 (Swedish): listening 20min, reading 20min, writing 15min, speaking 10min.",
      "Listen: A/B/C, daily life (supermarket, directions, post office).",
      "Read: 50-100 word text + 5 T/F or pick-idea questions.",
      "Write: 2 tasks - short message (40-60 words) + form fill.",
      "Speak: 1-min self-intro + 3 Q&A (shopping, directions, phone).",
      "Tip: stay calm, short sentences, examiner just needs to understand.",
    ],
    fill: [
      fb("YKI A1 har ___ delar.", "fyra", "YKI A1 có 4 phần.", "YKI A1 has 4 parts."),
      fb("Skrivuppgift: 40-60 ___ .", "ord", "Bài viết 40-60 từ.", "Writing 40-60 words."),
      fb("Tala om dig själv i en ___ .", "minut", "Tự gthieu 1 phút.", "Self-intro 1 min."),
      fb("Lyssna och ___ .", "svara", "Nghe và trả lời.", "Listen and answer."),
      fb("Var ___ , du klarar det.", "lugn", "Bình tĩnh, sẽ qua.", "Stay calm."),
    ],
    translate: [
      tr("Cảm ơn cô đã giúp.", "Thanks for help.", "Tack för hjälpen."),
      tr("Cho tôi nhắc lại?", "Repeat please?", "Kan du upprepa?"),
      tr("Tôi không hiểu.", "Don't understand.", "Jag förstår inte."),
      tr("Vui được phỏng vấn.", "Glad to be interviewed.", "Trevligt att bli intervjuad."),
    ],
    match: [
      mp("lyssna", "nghe"), mp("läsa", "đọc"),
      mp("skriva", "viết"), mp("tala", "nói"),
      mp("svara", "trả lời"), mp("fråga", "hỏi"),
    ],
  },

  30: {
    theoryTitleVi: "Tổng kết 30 ngày + roadmap A2",
    theoryTitleEn: "30-day recap + A2 roadmap",
    theoryVi: [
      "Bạn đã học: 7 nhóm chủ đề chính (giới thiệu, gia đình, mua sắm, hỏi đường, sức khoẻ, văn hoá, công việc).",
      "Ngữ pháp đã chắc: en/ett, hiện tại nhóm 1, modals, so sánh, phản thân, giới từ thời gian.",
      "Từ vựng đỉnh: ~500 từ A1, đủ giao tiếp sinh hoạt và YKI Cấp 1.",
      "A2 roadmap: thời quá khứ (preteritum nhóm 2-4), hiện tại hoàn thành (perfekt), bisats (mệnh đề phụ), inversion.",
      "Mục tiêu A2 trong 30 ngày tới: 1000 từ, viết email 100 từ, hiểu radio Sveriges Radio P4 chậm.",
      "Tài nguyên: SVT Nyheter Lätt, 8Sidor.se, Radio Sweden Lätt - tất cả miễn phí. Tiếp tục HaiEduTech tab YKI A2.",
    ],
    theoryEn: [
      "You covered 7 themes (intro, family, shopping, directions, health, culture, work).",
      "Grammar solid: en/ett, present group 1, modals, comparison, reflexive, time prepositions.",
      "Vocab peak: ~500 A1 words, enough for daily + YKI L1.",
      "A2 roadmap: preteritum group 2-4, perfekt, bisats, inversion.",
      "30-day A2 goal: 1000 words, 100-word email, understand slow SR P4 radio.",
      "Resources: SVT Nyheter Lätt, 8Sidor.se, Radio Sweden Lätt. Continue HaiEduTech YKI A2 tab.",
    ],
    fill: [
      fb("Jag har lärt mig ___ ord.", "femhundra", "Học 500 từ.", "Learned 500 words."),
      fb("Nästa nivå är ___ .", "A2", "Cấp tới A2.", "Next is A2."),
      fb("Jag ska läsa ___ .", "8sidor", "Đọc 8sidor.", "Read 8sidor."),
      fb("Min ___ är YKI A2.", "mål", "Mục tiêu A2.", "Goal A2."),
      fb("Fortsätt ___ !", "så", "Tiếp tục thế!", "Keep at it!"),
    ],
    translate: [
      tr("Cảm ơn thầy Hải!", "Thanks teacher!", "Tack, lärare Hai!"),
      tr("Tôi yêu tiếng Thụy Điển.", "Love Swedish.", "Jag älskar svenska."),
      tr("Mai bắt đầu A2!", "Tomorrow A2!", "Imorgon börjar jag A2!"),
      tr("Hành trình mới bắt đầu.", "Journey just begins.", "Resan har just börjat."),
    ],
    match: [
      mp("mål", "mục tiêu"),
      mp("nivå", "cấp"),
      mp("fortsätta", "tiếp tục"),
      mp("nästa", "tiếp theo"),
      mp("klara", "qua/đạt"),
      mp("resa", "hành trình"),
    ],
  },
};

export const getDailyExpansion = (day: number): DailyExpansion | undefined =>
  SWEDISH_A1_DAILY_EXPANSION[day];
