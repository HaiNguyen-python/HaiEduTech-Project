/**
 * @file swedishLessonDetails.ts
 * @description Beginner-friendly deep-dive content for each Swedish lesson.
 *              Maps lesson id (defined in SwedishTierView.tsx) → step-by-step
 *              explanation, common pitfalls and mini practice prompts.
 *              All copy is written in plain Vietnamese (target audience: người
 *              mới học hoàn toàn) with optional English mirror.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

export interface LessonDetail {
  /** 3–5 câu giới thiệu cực dễ hiểu cho người mới. */
  introVi: string;
  introEn: string;
  /** Các bước học nhỏ, đi từ cơ bản đến nâng cao. */
  stepsVi: string[];
  stepsEn: string[];
  /** Lỗi thường gặp & cách tránh. */
  pitfallsVi: string[];
  pitfallsEn: string[];
  /** Mini bài tập tự luyện ngay sau bài học. */
  practiceVi: string[];
  practiceEn: string[];
}

export const LESSON_DETAILS: Record<string, LessonDetail> = {
  /* ============================ A1 ============================ */
  "a1-pron": {
    introVi:
      "Tiếng Thụy Điển có vài âm khó nghe nhưng chỉ cần thuộc 3 quy tắc là bạn đọc đúng 80% từ vựng. Bài học này dạy bạn 'mở miệng' đúng cho 3 nhóm âm quan trọng: sj-, tj- và nguyên âm dài/ngắn. Hãy nghe mỗi từ ít nhất 3 lần trước khi tự đọc theo.",
    introEn:
      "Swedish has a few tricky sounds, but mastering 3 rules already cracks 80% of words. This lesson teaches the mouth shape for sj-, tj- and long/short vowels. Listen to each word at least 3 times before repeating.",
    stepsVi: [
      "Bước 1 · Nghe & bắt chước: bấm 🔊 nghe từ 'sju' (bảy) — môi tròn, thổi nhẹ như tiếng 'huýt'.",
      "Bước 2 · So sánh cặp: 'sju' (bảy) vs 'tjugo' (hai mươi). Cùng là phụ âm gió, nhưng 'tj-' lưỡi sát răng hơn.",
      "Bước 3 · Nguyên âm dài: chữ cái đứng một mình thường đọc DÀI ('vit' = 'viiit'). Có 2 phụ âm sau → đọc NGẮN ('vitt').",
      "Bước 4 · Trọng âm: từ 2 âm tiết thường nhấn ÂM ĐẦU ('hej-då', 'tå-get'). Đọc nhấn rõ giúp giám khảo nghe ra số đếm.",
      "Bước 5 · Tự thu âm 5 từ và so sánh với mẫu — lặp lại đến khi giống 80%.",
    ],
    stepsEn: [
      "Step 1 · Listen & imitate: hit 🔊 on 'sju' (seven) — round lips, whistle-like air.",
      "Step 2 · Compare pairs: 'sju' (7) vs 'tjugo' (20). Both are fricatives, but 'tj-' has tongue closer to teeth.",
      "Step 3 · Long vowel: a lone consonant after a vowel = LONG ('vit' ≈ 'veeet'). Doubled consonant = SHORT ('vitt').",
      "Step 4 · Stress: 2-syllable words usually stress the FIRST syllable ('hej-då', 'tå-get').",
      "Step 5 · Record yourself saying 5 words and compare to the model audio — repeat until 80% match.",
    ],
    pitfallsVi: [
      "❌ Đọc 'sju' thành 'su' kiểu Anh — sẽ nhầm với 'so' (vậy thì).",
      "❌ Quên trọng âm đầu của từ 2 âm tiết → nghe như tiếng nước khác.",
      "❌ Nhầm 'vit' (trắng) và 'vitt' (trắng dạng ett) — sai en/ett là rớt điểm ngữ pháp A1.",
    ],
    pitfallsEn: [
      "❌ Reading 'sju' like English 'su' — will be mistaken for 'so'.",
      "❌ Forgetting first-syllable stress on 2-syllable words → sounds non-Swedish.",
      "❌ Mixing 'vit' (white, en) and 'vitt' (white, ett) — gender mistakes lose A1 grammar points.",
    ],
    practiceVi: [
      "🎯 Đọc to: 'sju sjuksköterskor' (7 y tá nữ) 5 lần trong 30 giây.",
      "🎯 Phân loại 10 từ vựng đã học theo nguyên âm dài/ngắn.",
      "🎯 Ghi âm 3 câu giới thiệu bản thân — nghe lại và đánh dấu chỗ trọng âm sai.",
    ],
    practiceEn: [
      "🎯 Read aloud 'sju sjuksköterskor' 5 times in 30 s.",
      "🎯 Sort 10 learned words into long vs short vowel buckets.",
      "🎯 Record 3 self-intro sentences and mark wrong stresses on playback.",
    ],
  },

  "a1-self": {
    introVi:
      "Đây là bài đầu tiên ai cũng cần thuộc lòng vì YKI Tala A1 luôn bắt đầu bằng câu 'Hãy giới thiệu bản thân'. Bạn sẽ học 3 mẫu câu lõi: tên, tuổi, nghề nghiệp. Chỉ cần ráp các 'viên gạch' này lại là có 30 giây nói tự tin.",
    introEn:
      "Everyone needs this first lesson by heart — YKI Tala A1 always opens with 'introduce yourself'. You'll learn 3 core sentence frames: name, age, job. Stacking these bricks gives 30 s of confident speech.",
    stepsVi: [
      "Bước 1 · Mẫu tên: 'Jag heter ___.' (Tôi tên là ___).",
      "Bước 2 · Mẫu tuổi: 'Jag är ___ år.' (Tôi ___ tuổi). Lưu ý: không có 'gammal' khi nói nhanh.",
      "Bước 3 · Mẫu nghề: 'Jag jobbar som ___.' (Tôi làm ___). Nếu là sinh viên: 'Jag studerar ___.'",
      "Bước 4 · Mẫu gia đình: 'Min mamma/pappa heter ___. Vi har ___ barn.'",
      "Bước 5 · Ghép 4 câu trên thành một đoạn 25–30 giây và đọc thành tiếng 5 lần.",
    ],
    stepsEn: [
      "Step 1 · Name template: 'Jag heter ___.'",
      "Step 2 · Age template: 'Jag är ___ år.' (drop 'gammal' for speed).",
      "Step 3 · Job template: 'Jag jobbar som ___.' / 'Jag studerar ___.'",
      "Step 4 · Family template: 'Min mamma/pappa heter ___. Vi har ___ barn.'",
      "Step 5 · Stack the 4 templates into a 25–30 s monologue, read aloud 5×.",
    ],
    pitfallsVi: [
      "❌ Quên 'är' (là) — câu 'Jag 28 år' sai ngữ pháp dù người Thuỵ Điển vẫn hiểu.",
      "❌ Dịch word-for-word từ tiếng Việt 'Tôi 28 tuổi rồi' → đừng thêm 'redan' không cần thiết.",
      "❌ Dùng 'min' thay 'mitt' cho danh từ ett (mitt namn, không phải 'min namn').",
    ],
    pitfallsEn: [
      "❌ Dropping 'är' — 'Jag 28 år' is ungrammatical even if understood.",
      "❌ Word-for-word translation 'Tôi 28 tuổi rồi' adding unnecessary 'redan'.",
      "❌ Using 'min' instead of 'mitt' for ett-nouns ('mitt namn', not 'min namn').",
    ],
    practiceVi: [
      "🎯 Viết đoạn giới thiệu 5 câu rồi tự đọc trước gương 3 lần.",
      "🎯 Bịt mắt và tự nói liên tục 30 giây không nhìn giấy.",
      "🎯 Thay tên/tuổi/nghề bằng người thân — tập biến thể.",
    ],
    practiceEn: [
      "🎯 Write a 5-sentence self-intro and recite it in front of a mirror 3×.",
      "🎯 Speak for 30 s without notes.",
      "🎯 Swap name/age/job with a family member to practise variations.",
    ],
  },

  "a1-num": {
    introVi:
      "Số đếm và đồng hồ là 'điểm dễ ăn' của Hörförståelse A1 — đề thi hầu như luôn có 1 thông báo giờ tàu/xe. Cốt lõi là thuộc 1–20, sau đó công thức 'mươi + đơn vị'. Đặc biệt nhớ: 'halv nio' = 8:30, KHÔNG phải 9:30.",
    introEn:
      "Numbers and clock time are easy points in A1 listening — there's almost always a train/bus time announcement. Memorise 1–20, then combine 'tens + units'. Crucial: 'halv nio' = 8:30, NOT 9:30.",
    stepsVi: [
      "Bước 1 · Thuộc 1–12: en, två, tre, fyra, fem, sex, sju, åtta, nio, tio, elva, tolv.",
      "Bước 2 · 13–19 = đơn vị + 'ton' (tretton, fjorton…).",
      "Bước 3 · 20–90 = đơn vị + 'tio' (tjugo, trettio, fyrtio…).",
      "Bước 4 · Giờ: 'Klockan är ___' + giờ chẵn. 'kvart över X' = X:15. 'halv X' = X-1 giờ 30 phút.",
      "Bước 5 · Ngày: 'idag är det måndag den 5 maj'. Học thuộc 7 thứ + 12 tháng.",
    ],
    stepsEn: [
      "Step 1 · Memorise 1–12.",
      "Step 2 · 13–19 = unit + 'ton'.",
      "Step 3 · 20–90 = unit + 'tio'.",
      "Step 4 · Time: 'Klockan är ___'. 'kvart över X' = X:15. 'halv X' = (X-1):30.",
      "Step 5 · Date: 'idag är det måndag den 5 maj'. Memorise 7 days + 12 months.",
    ],
    pitfallsVi: [
      "❌ 'halv nio' KHÔNG phải 9:30 mà là 8:30 — sai 1 lần là rớt câu Hörförståelse.",
      "❌ Quên rằng 17:00 = 'sjutton' (17), không phải 'fem på eftermiddagen'.",
      "❌ Nhầm 'sju' (7) và 'sjö' (hồ) khi nghe nhanh.",
    ],
    pitfallsEn: [
      "❌ 'halv nio' is 8:30, not 9:30 — one slip costs a listening point.",
      "❌ Forgetting 17:00 = 'sjutton' in announcements, not 'fem på eftermiddagen'.",
      "❌ Confusing 'sju' (7) with 'sjö' (lake) at speed.",
    ],
    practiceVi: [
      "🎯 Viết 10 thời điểm bất kỳ rồi nói bằng tiếng Thuỵ Điển không nhìn giấy.",
      "🎯 Nghe tin Yle 1 phút, đếm xem có bao nhiêu con số xuất hiện.",
      "🎯 Tự đọc 5 ngày tháng theo định dạng 'den X månad'.",
    ],
    practiceEn: [
      "🎯 Pick 10 random clock times and say them in Swedish without notes.",
      "🎯 Listen to a 1-minute Yle clip and count the numbers spoken.",
      "🎯 Say 5 dates aloud in the 'den X månad' format.",
    ],
  },

  "a1-greetings": {
    introVi:
      "Người Thuỵ Điển chào hỏi ngắn gọn nhưng có 'nhịp'. Hej → Hur mår du? → Bra, tack. Och du? — học thuộc 3 nhịp này là bạn vượt qua giây mở đầu của Tala A1.",
    introEn:
      "Swedes greet briefly but with a rhythm. Hej → Hur mår du? → Bra, tack. Och du? — master these 3 beats and you nail the Tala A1 opening.",
    stepsVi: [
      "Bước 1 · Hej / Hejdå — chào và tạm biệt cơ bản, dùng được mọi tình huống.",
      "Bước 2 · 'Hur mår du?' — câu hỏi thăm. Trả lời an toàn: 'Bra, tack. Och du?'",
      "Bước 3 · Ursäkta — luôn dùng trước khi hỏi đường/lỗi nhỏ.",
      "Bước 4 · Varsågod — đưa đồ cho ai đó (≈ 'Đây ạ').",
      "Bước 5 · Tập phản xạ: bạn nói 'Hej' → đối tác đáp lại trong 1 giây.",
    ],
    stepsEn: [
      "Step 1 · Hej / Hejdå — universal hello/bye.",
      "Step 2 · 'Hur mår du?' — safe answer: 'Bra, tack. Och du?'",
      "Step 3 · 'Ursäkta' — always precede a question or apology.",
      "Step 4 · 'Varsågod' — when handing something over.",
      "Step 5 · Build reflex: say 'Hej', expect a reply within 1 second.",
    ],
    pitfallsVi: [
      "❌ Dùng 'Hallå' (a-lô) trong giao tiếp đời thường — chỉ dùng cho điện thoại.",
      "❌ Trả lời 'Hur mår du?' quá dài — phản xạ chỉ cần 1 câu.",
      "❌ Quên đáp 'Och du?' — sẽ bị coi là không lịch sự.",
    ],
    pitfallsEn: [
      "❌ Using 'Hallå' (≈ hello on phone) for face-to-face chat.",
      "❌ Over-answering 'Hur mår du?' — keep it to one sentence.",
      "❌ Forgetting 'Och du?' — sounds impolite.",
    ],
    practiceVi: [
      "🎯 Chào người thân bằng tiếng Thuỵ Điển 5 lần trong ngày.",
      "🎯 Tự đóng vai cả 2 phía: bạn hỏi 'Hur mår du?' và tự trả lời.",
      "🎯 Quay video 15 giây mô phỏng cảnh gặp giám khảo YKI.",
    ],
    practiceEn: [
      "🎯 Greet a family member in Swedish 5× a day.",
      "🎯 Role-play both sides of 'Hur mår du?' alone.",
      "🎯 Record a 15 s video simulating meeting the YKI examiner.",
    ],
  },

  "a1-shopping": {
    introVi:
      "Mua sắm là tình huống dễ nhất để 'thực chiến' tiếng Thuỵ Điển. Bạn chỉ cần 3 câu: hỏi giá, lấy hàng, trả tiền. Học mẫu cố định trước, sau đó thay danh từ.",
    introEn:
      "Shopping is the easiest real-world practice. You only need 3 sentences: ask the price, take the item, pay. Learn the fixed frame first, then swap the noun.",
    stepsVi: [
      "Bước 1 · Hỏi giá: 'Hur mycket kostar ___?' Thay ___ bằng tên đồ.",
      "Bước 2 · Đặt hàng: 'Jag tar ___, tack.' (Cho tôi ___, cảm ơn).",
      "Bước 3 · Trả tiền: 'Kan jag betala med kort/kontant?'.",
      "Bước 4 · Yêu cầu hoá đơn: 'Kan jag få kvitto, tack?'",
      "Bước 5 · Đóng cảnh chào: 'Tack! Hejdå!'",
    ],
    stepsEn: [
      "Step 1 · Ask the price: 'Hur mycket kostar ___?'",
      "Step 2 · Order: 'Jag tar ___, tack.'",
      "Step 3 · Pay: 'Kan jag betala med kort/kontant?'",
      "Step 4 · Receipt: 'Kan jag få kvitto, tack?'",
      "Step 5 · Close: 'Tack! Hejdå!'",
    ],
    pitfallsVi: [
      "❌ Quên 'tack' cuối câu — nghe cộc lốc.",
      "❌ Nói số tiền sai (sju vs sex) — tập kỹ phần số trước.",
      "❌ Dùng 'snälla' kiểu Anh 'please' — không tự nhiên trong Thuỵ Điển.",
    ],
    pitfallsEn: [
      "❌ Forgetting 'tack' — sounds blunt.",
      "❌ Saying the wrong number (sju vs sex) — drill numbers first.",
      "❌ Overusing 'snälla' like English 'please' — unnatural in Sweden.",
    ],
    practiceVi: [
      "🎯 Đóng vai khách + nhân viên: mua 3 món, trả thẻ.",
      "🎯 Viết 5 đoạn hội thoại ngắn theo mẫu trên.",
      "🎯 Nghe podcast 'SVT Lättläst' phần mua sắm — bắt 3 câu chốt.",
    ],
    practiceEn: [
      "🎯 Role-play customer + staff: 3 items, card payment.",
      "🎯 Write 5 mini dialogues using the frames.",
      "🎯 Listen to 'SVT Lättläst' shopping segment — catch 3 key sentences.",
    ],
  },

  "a1-directions": {
    introVi:
      "Hỏi đường ở Phần Lan/Thuỵ Điển khá chuẩn: chỉ cần biết phải/trái/thẳng và số xe buýt. Người bản xứ trả lời ngắn, vì vậy hãy luyện NGHE từ chỉ đường hơn là nói.",
    introEn:
      "Asking directions in Sweden/Finland is straightforward: just left/right/straight + bus number. Locals reply briefly, so train your EAR for direction words first.",
    stepsVi: [
      "Bước 1 · Câu mở: 'Ursäkta, hur kommer jag till ___?'",
      "Bước 2 · Hiểu hướng: höger (phải), vänster (trái), rakt fram (thẳng).",
      "Bước 3 · Phương tiện: 'Ta buss/spårvagn nummer ___.'",
      "Bước 4 · Mua vé: 'En enkel/tur och retur biljett till ___, tack.'",
      "Bước 5 · Hỏi xác nhận: 'Är det här rätt buss till ___?'",
    ],
    stepsEn: [
      "Step 1 · Opener: 'Ursäkta, hur kommer jag till ___?'",
      "Step 2 · Understand directions: höger / vänster / rakt fram.",
      "Step 3 · Transport: 'Ta buss/spårvagn nummer ___.'",
      "Step 4 · Buy ticket: 'En enkel/tur och retur biljett till ___, tack.'",
      "Step 5 · Confirm: 'Är det här rätt buss till ___?'",
    ],
    pitfallsVi: [
      "❌ Nhầm 'höger' (phải) với 'höger' kiểu Đức — phát âm Thuỵ Điển có 'h' nhẹ.",
      "❌ Quên 'nästa station' khi nghe HSL — sẽ xuống nhầm trạm.",
      "❌ Dùng 'metro' — Thuỵ Điển nói 'tunnelbana'.",
    ],
    pitfallsEn: [
      "❌ Mispronouncing 'höger' German-style.",
      "❌ Missing 'nästa station' on HSL — wrong stop!",
      "❌ Saying 'metro' instead of 'tunnelbana'.",
    ],
    practiceVi: [
      "🎯 Mở Google Maps Helsinki, tự mô tả đường đi 3 địa điểm.",
      "🎯 Nghe podcast HSL 1 phút — chép chính tả 5 tên trạm.",
      "🎯 Vẽ bản đồ đơn giản và hướng dẫn bạn bè bằng tiếng Thuỵ Điển.",
    ],
    practiceEn: [
      "🎯 Open Google Maps Helsinki, describe route to 3 places.",
      "🎯 Dictate 5 station names from an HSL audio clip.",
      "🎯 Draw a simple map and guide a friend in Swedish.",
    ],
  },

  "a1-weather": {
    introVi:
      "YKI A1 hầu như luôn có câu 'Hur är vädret idag?'. Học 3 mẫu mô tả + 8 tính từ thời tiết là đủ. Đừng cố nói cầu kỳ, ngắn gọn nhưng đúng.",
    introEn:
      "YKI A1 almost always asks 'Hur är vädret idag?'. Three frames + 8 weather adjectives are enough. Don't try fancy — keep it short and correct.",
    stepsVi: [
      "Bước 1 · Mẫu cơ bản: 'Det är ___ idag.' (Hôm nay trời ___).",
      "Bước 2 · Động từ thời tiết: 'Det regnar/snöar/blåser.' (Trời mưa/tuyết/gió).",
      "Bước 3 · Nhiệt độ: 'Det är 5 grader' / 'minus 10 grader'.",
      "Bước 4 · Mùa: 'På vintern är det kallt och mörkt.'",
      "Bước 5 · Ghép thành 3 câu kể về thời tiết tuần này.",
    ],
    stepsEn: [
      "Step 1 · Frame: 'Det är ___ idag.'",
      "Step 2 · Weather verbs: 'Det regnar/snöar/blåser.'",
      "Step 3 · Temperature: 'Det är 5 grader' / 'minus 10 grader'.",
      "Step 4 · Seasons: 'På vintern är det kallt och mörkt.'",
      "Step 5 · Build 3 sentences about this week's weather.",
    ],
    pitfallsVi: [
      "❌ Quên 'Det' — câu 'Är kallt' sai ngữ pháp.",
      "❌ Dùng 'cold' tiếng Anh thay 'kallt'.",
      "❌ Nhầm 'varm' (ấm) với 'het' (nóng bỏng) — 'het' thường chỉ đồ ăn.",
    ],
    pitfallsEn: [
      "❌ Dropping 'Det' — 'Är kallt' is ungrammatical.",
      "❌ Code-switching to English 'cold'.",
      "❌ Mixing 'varm' (warm) with 'het' (scorching, usually food).",
    ],
    practiceVi: [
      "🎯 Ghi nhật ký thời tiết 7 ngày, mỗi ngày 1 câu Thuỵ Điển.",
      "🎯 Mở app SMHI và đọc dự báo tuần bằng tiếng Thuỵ Điển.",
      "🎯 Tự đóng vai phát thanh viên dự báo 30 giây.",
    ],
    practiceEn: [
      "🎯 Keep a 7-day weather diary, 1 Swedish sentence each.",
      "🎯 Open SMHI app and read the weekly forecast aloud in Swedish.",
      "🎯 Role-play a 30 s weather presenter.",
    ],
  },

  /* ============================ A2 ============================ */
  "a2-v2": {
    introVi:
      "Đây là luật ngữ pháp QUAN TRỌNG NHẤT của tiếng Thuỵ Điển: ĐỘNG TỪ luôn đứng ở vị trí THỨ HAI trong câu khẳng định. Nếu bạn đặt trạng từ (Idag, På sommaren…) lên đầu thì chủ ngữ phải nhảy ra SAU động từ. Sai luật V2 là YKI A2 trừ điểm rất nặng.",
    introEn:
      "Swedish's #1 grammar rule: the VERB always sits in SECOND position in a main clause. If you front an adverbial (Idag, På sommaren…), the subject must jump AFTER the verb. Breaking V2 is the heaviest A2 deduction.",
    stepsVi: [
      "Bước 1 · Câu chuẩn S-V-O: 'Jag dricker kaffe varje morgon.'",
      "Bước 2 · Đưa trạng từ lên đầu: 'Varje morgon dricker jag kaffe.' — chú ý 'jag' nhảy ra sau 'dricker'.",
      "Bước 3 · Câu hỏi cũng V2: 'Vad gör du nu?' — từ để hỏi đứng đầu, động từ thứ hai.",
      "Bước 4 · Mệnh đề phụ thì NGƯỢC LẠI: 'Jag vet att han ALLTID dricker kaffe' (att-clause: trạng từ trước động từ).",
      "Bước 5 · Tự viết 10 câu, mỗi câu bắt đầu bằng 1 trạng từ khác nhau (Idag, Igår, På sommaren…).",
    ],
    stepsEn: [
      "Step 1 · Standard SVO: 'Jag dricker kaffe varje morgon.'",
      "Step 2 · Front an adverb: 'Varje morgon dricker jag kaffe.' — note 'jag' moves after 'dricker'.",
      "Step 3 · Questions are V2 too: 'Vad gör du nu?'",
      "Step 4 · Subordinate clauses REVERSE: 'Jag vet att han ALLTID dricker kaffe.'",
      "Step 5 · Write 10 sentences each starting with a different adverbial.",
    ],
    pitfallsVi: [
      "❌ 'Idag jag dricker kaffe' — SAI. Phải là 'Idag dricker jag kaffe'.",
      "❌ Quên đảo ngữ sau trạng từ chỉ thời gian/nơi chốn.",
      "❌ Áp luật V2 vào mệnh đề 'att…' (mệnh đề phụ không đảo).",
    ],
    pitfallsEn: [
      "❌ 'Idag jag dricker kaffe' — WRONG. Should be 'Idag dricker jag kaffe'.",
      "❌ Forgetting inversion after time/place adverbials.",
      "❌ Applying V2 inside 'att…' clauses (subordinate ≠ inverted).",
    ],
    practiceVi: [
      "🎯 Viết lại 5 câu của bạn, mỗi câu di chuyển trạng từ lên đầu.",
      "🎯 Tô đỏ ĐỘNG TỪ trong 10 câu báo Yle để kiểm tra V2.",
      "🎯 Đọc to với nhịp: '_ DỘNG _ chủ ngữ _ phần còn lại'.",
    ],
    practiceEn: [
      "🎯 Rewrite 5 of your sentences fronting the adverb.",
      "🎯 Highlight the VERB in 10 Yle sentences to check V2.",
      "🎯 Read aloud with rhythm: '_ VERB _ subject _ rest'.",
    ],
  },

  "a2-enett": {
    introVi:
      "En/Ett quyết định 'giới' của danh từ — gần giống le/la trong tiếng Pháp. Khoảng 75% danh từ là 'en', 25% là 'ett'. Không có quy tắc tuyệt đối, nhưng có MẸO giúp đoán đúng 80%. Sai en/ett kéo theo sai luôn tính từ → cố thuộc CÙNG mạo từ khi học từ mới.",
    introEn:
      "En/Ett sets a noun's gender — similar to French le/la. About 75% are 'en', 25% 'ett'. No absolute rule but a few tricks get you to ~80%. Wrong gender drags down the adjective too — always learn nouns WITH their article.",
    stepsVi: [
      "Bước 1 · Mẹo 1: người/động vật → thường 'en' (en man, en hund).",
      "Bước 2 · Mẹo 2: từ kết thúc -a → thường 'en' (en flicka). Kết thúc phụ âm + ngắn → thường 'ett' (ett hus, ett bord).",
      "Bước 3 · Luôn ghi từ mới kèm en/ett: viết 'en bil' chứ đừng viết 'bil'.",
      "Bước 4 · Hình thức xác định: 'en bil → bilen' (cái xe), 'ett hus → huset'.",
      "Bước 5 · Tính từ đi kèm phải khớp: 'en stor bil', 'ett stort hus' (thêm -t cho ett).",
    ],
    stepsEn: [
      "Step 1 · Tip 1: people/animals → usually 'en'.",
      "Step 2 · Tip 2: ends in -a → usually 'en'. Short consonant ending → often 'ett'.",
      "Step 3 · Always learn nouns WITH their article ('en bil', not just 'bil').",
      "Step 4 · Definite form: 'en bil → bilen', 'ett hus → huset'.",
      "Step 5 · Adjectives must agree: 'en stor bil', 'ett stort hus'.",
    ],
    pitfallsVi: [
      "❌ Nói 'en hus' — sai, là 'ett hus'.",
      "❌ Quên thêm -t cho tính từ khi đi với ett.",
      "❌ Học từ vựng không kèm mạo từ → sau này sửa rất khó.",
    ],
    pitfallsEn: [
      "❌ 'en hus' — wrong, it's 'ett hus'.",
      "❌ Forgetting -t on the adjective for ett-nouns.",
      "❌ Learning vocab without the article — painful to fix later.",
    ],
    practiceVi: [
      "🎯 Phân loại 30 danh từ đã học thành 2 cột en/ett.",
      "🎯 Viết 10 câu mô tả phòng bạn: 'I rummet finns ___'.",
      "🎯 Đố flashcard: lật từ → nói nhanh en/ett trong 2 giây.",
    ],
    practiceEn: [
      "🎯 Sort 30 known nouns into en/ett columns.",
      "🎯 Write 10 sentences describing your room: 'I rummet finns ___'.",
      "🎯 Flashcard drill: name en/ett within 2 seconds.",
    ],
  },

  "a2-tense": {
    introVi:
      "Tiếng Thuỵ Điển có 4 thì chính nhưng A2 chỉ cần 3: HIỆN TẠI, QUÁ KHỨ ĐƠN (preteritum), HIỆN TẠI HOÀN THÀNH (perfekt). Tin vui: phần lớn động từ tuân theo quy tắc thêm đuôi.",
    introEn:
      "Swedish has 4 main tenses but A2 needs only 3: present, simple past (preteritum), present perfect (perfekt). Good news: most verbs follow regular endings.",
    stepsVi: [
      "Bước 1 · Hiện tại = nguyên mẫu bỏ -a + r: 'jag pratar' (tôi nói).",
      "Bước 2 · Quá khứ đơn nhóm 1: gốc + -ade: 'pratade'.",
      "Bước 3 · Hiện tại hoàn thành: 'har' + supinum: 'har pratat'.",
      "Bước 4 · Học 5 động từ bất quy tắc lõi: gå-gick-gått, se-såg-sett, äta-åt-ätit, dricka-drack-druckit, vara-var-varit.",
      "Bước 5 · Viết nhật ký 5 ngày trộn cả 3 thì.",
    ],
    stepsEn: [
      "Step 1 · Present = infinitive minus -a plus -r: 'jag pratar'.",
      "Step 2 · Past (group 1): stem + -ade: 'pratade'.",
      "Step 3 · Perfect: 'har' + supine: 'har pratat'.",
      "Step 4 · Memorise 5 irregular verbs: gå-gick-gått, se-såg-sett, äta-åt-ätit, dricka-drack-druckit, vara-var-varit.",
      "Step 5 · Write a 5-day diary mixing all 3 tenses.",
    ],
    pitfallsVi: [
      "❌ Dùng 'har' + preteritum ('har pratade') — SAI, phải là supinum 'pratat'.",
      "❌ Nhầm 'var' (đã là) và 'är' (là).",
      "❌ Quên đuôi -r ở hiện tại ('jag prata' sai, phải 'pratar').",
    ],
    pitfallsEn: [
      "❌ 'har pratade' is WRONG — must be supine 'har pratat'.",
      "❌ Confusing 'var' (was) with 'är' (is).",
      "❌ Dropping -r in present ('jag prata' is wrong).",
    ],
    practiceVi: [
      "🎯 Chia 15 động từ qua 3 thì trong bảng.",
      "🎯 Kể lại ngày hôm qua bằng quá khứ đơn (5 câu).",
      "🎯 Nói 3 việc 'Tôi đã từng làm' bằng perfekt.",
    ],
    practiceEn: [
      "🎯 Conjugate 15 verbs across 3 tenses in a table.",
      "🎯 Retell yesterday in past simple (5 sentences).",
      "🎯 Say 3 'I have ever done' sentences in perfekt.",
    ],
  },

  "a2-email": {
    introVi:
      "Skriva A2 thường yêu cầu viết EMAIL 60–90 từ. Có 1 KHUNG cố định 4 phần: chào → lý do → đề nghị → kết. Học khung này thì ai cũng đạt điểm trung bình trở lên.",
    introEn:
      "Skriva A2 typically asks for a 60–90 word EMAIL. There's a fixed 4-part frame: greeting → reason → request → closing. Master the frame and you'll pass.",
    stepsVi: [
      "Bước 1 · Chào: 'Hej ___,'",
      "Bước 2 · Lý do: 'Jag skriver för att ___.'",
      "Bước 3 · Đề nghị: 'Skulle det vara möjligt att ___?'",
      "Bước 4 · Cảm ơn & kết: 'Tack på förhand. Med vänliga hälsningar, [Tên]'",
      "Bước 5 · Đếm từ: cố giữ 60–90 từ, tránh viết quá dài.",
    ],
    stepsEn: [
      "Step 1 · Greeting: 'Hej ___,'",
      "Step 2 · Reason: 'Jag skriver för att ___.'",
      "Step 3 · Request: 'Skulle det vara möjligt att ___?'",
      "Step 4 · Closing: 'Tack på förhand. Med vänliga hälsningar, [Name]'",
      "Step 5 · Stay 60–90 words.",
    ],
    pitfallsVi: [
      "❌ Quên ký tên cuối email — bị trừ điểm cấu trúc.",
      "❌ Dùng 'Dear Sir/Madam' kiểu Anh — không tự nhiên trong email Thuỵ Điển.",
      "❌ Viết quá ngắn (<50 từ) hoặc quá dài (>120 từ).",
    ],
    pitfallsEn: [
      "❌ Forgetting to sign — structure penalty.",
      "❌ Using English 'Dear Sir/Madam' — unnatural in Swedish.",
      "❌ Writing <50 or >120 words.",
    ],
    practiceVi: [
      "🎯 Viết 3 email mẫu: xin nghỉ, đặt lịch hẹn, hỏi giá khoá học.",
      "🎯 Đếm từ và chỉnh sửa để khớp 60–90.",
      "🎯 Đổi email với bạn học để chấm chéo.",
    ],
    practiceEn: [
      "🎯 Write 3 sample emails: leave request, appointment, course price.",
      "🎯 Adjust to 60–90 words.",
      "🎯 Swap with a peer for cross-grading.",
    ],
  },

  "a2-modal": {
    introVi:
      "Modal verbs là 'gia vị' khiến câu của bạn nghe lịch sự và linh hoạt. Nắm 5 modals chính: kan, vill, ska, måste, borde. Sau modal LUÔN dùng động từ NGUYÊN MẪU (không thêm -r, -de).",
    introEn:
      "Modals add politeness and flexibility. Master 5: kan, vill, ska, måste, borde. After a modal, always use the INFINITIVE (no -r, -de).",
    stepsVi: [
      "Bước 1 · kan (có thể): 'Jag kan tala svenska.'",
      "Bước 2 · vill (muốn): 'Jag vill resa till Sverige.'",
      "Bước 3 · ska (sẽ/định): 'Vi ska träffas imorgon.'",
      "Bước 4 · måste (phải): 'Du måste komma i tid.'",
      "Bước 5 · borde (nên): 'Du borde sova mer.'",
    ],
    stepsEn: [
      "Step 1 · kan (can): 'Jag kan tala svenska.'",
      "Step 2 · vill (want): 'Jag vill resa till Sverige.'",
      "Step 3 · ska (will/plan): 'Vi ska träffas imorgon.'",
      "Step 4 · måste (must): 'Du måste komma i tid.'",
      "Step 5 · borde (should): 'Du borde sova mer.'",
    ],
    pitfallsVi: [
      "❌ 'Jag kan talar' — SAI, phải 'Jag kan tala'.",
      "❌ Nhầm 'vill' (muốn) với 'ska' (sẽ).",
      "❌ Dùng 'måste' quá mạnh khi chỉ cần 'borde'.",
    ],
    pitfallsEn: [
      "❌ 'Jag kan talar' — WRONG, use 'tala'.",
      "❌ Confusing 'vill' (want) with 'ska' (will/plan).",
      "❌ Over-using 'måste' when 'borde' suffices.",
    ],
    practiceVi: [
      "🎯 Viết 5 câu cho mỗi modal.",
      "🎯 Chuyển 5 câu chỉ thị từ 'måste' → 'borde' nghe nhẹ hơn.",
      "🎯 Đóng vai sếp giao việc bằng 'ska' và 'måste'.",
    ],
    practiceEn: [
      "🎯 5 sentences per modal.",
      "🎯 Soften 5 'måste' commands into 'borde'.",
      "🎯 Role-play a boss assigning tasks with 'ska'/'måste'.",
    ],
  },

  /* ============================ B1 ============================ */
  "b1-sub": {
    introVi:
      "Quy tắc BIFF (BIsats = Före, Finit verb) là 'chìa khoá vàng' của B1: trong mệnh đề PHỤ, trạng từ phủ định (inte, alltid, aldrig) đứng TRƯỚC động từ. Đây là điểm khác biệt rõ nhất giữa A2 và B1.",
    introEn:
      "The BIFF rule (BIsats = Before, Finite verb) is the B1 game-changer: in a SUBORDINATE clause, negation/adverbs (inte, alltid, aldrig) sit BEFORE the verb. This single rule separates A2 from B1.",
    stepsVi: [
      "Bước 1 · Mệnh đề chính: 'Han kommer INTE idag.' (inte sau động từ).",
      "Bước 2 · Mệnh đề phụ với 'att': 'Jag vet att han INTE kommer idag.' (inte TRƯỚC kommer).",
      "Bước 3 · Mệnh đề phụ với 'eftersom': 'Jag stannar hemma eftersom jag ALDRIG mår bra.'",
      "Bước 4 · Tự đặt 5 câu phức với att/eftersom/om/när — kiểm tra vị trí 'inte'.",
      "Bước 5 · Đọc 1 đoạn báo Hbl, gạch dưới mệnh đề phụ và xác nhận BIFF.",
    ],
    stepsEn: [
      "Step 1 · Main clause: 'Han kommer INTE idag.' (inte after verb).",
      "Step 2 · 'att'-clause: 'Jag vet att han INTE kommer idag.' (inte BEFORE verb).",
      "Step 3 · 'eftersom'-clause: 'Jag stannar hemma eftersom jag ALDRIG mår bra.'",
      "Step 4 · Write 5 complex sentences with att/eftersom/om/när — verify 'inte' placement.",
      "Step 5 · Highlight subordinate clauses in a Hbl paragraph and confirm BIFF.",
    ],
    pitfallsVi: [
      "❌ 'Jag vet att han kommer inte' — SAI vị trí inte.",
      "❌ Quên áp BIFF cho 'eftersom', 'när', 'om', 'eftersom som'.",
      "❌ Đảo ngữ V2 trong mệnh đề phụ (V2 chỉ cho mệnh đề chính).",
    ],
    pitfallsEn: [
      "❌ 'Jag vet att han kommer inte' — wrong placement.",
      "❌ Forgetting BIFF for eftersom/när/om.",
      "❌ Applying V2 inversion inside subordinate clauses.",
    ],
    practiceVi: [
      "🎯 Viết 10 câu phức bắt đầu bằng 'Jag tror att…'.",
      "🎯 Sửa 5 câu sai BIFF của bạn bè.",
      "🎯 Nói liền 30 giây giải thích lý do dùng eftersom + BIFF.",
    ],
    practiceEn: [
      "🎯 Write 10 complex sentences starting 'Jag tror att…'.",
      "🎯 Correct 5 BIFF errors in peers' writing.",
      "🎯 Speak 30 s explaining a reason using eftersom + BIFF.",
    ],
  },

  "b1-inv": {
    introVi:
      "Liên từ logic giúp đoạn văn B1 'mượt' và đạt điểm cohesion cao. 5 từ vàng: eftersom (vì), trots att (mặc dù), å ena sidan / å andra sidan (một mặt / mặt khác), sammanfattningsvis (tóm lại).",
    introEn:
      "Logical connectors give your B1 paragraph the cohesion points. Five gold ones: eftersom, trots att, å ena sidan / å andra sidan, sammanfattningsvis.",
    stepsVi: [
      "Bước 1 · Nguyên nhân: 'eftersom + mệnh đề phụ' → BIFF áp dụng.",
      "Bước 2 · Nhượng bộ: 'trots att + mệnh đề phụ'.",
      "Bước 3 · So sánh 2 mặt: 'Å ena sidan ___, å andra sidan ___.'",
      "Bước 4 · Tóm lại: 'Sammanfattningsvis tycker jag att ___.'",
      "Bước 5 · Viết một essay 120 từ dùng đủ 5 liên từ.",
    ],
    stepsEn: [
      "Step 1 · Cause: 'eftersom + sub clause' → apply BIFF.",
      "Step 2 · Concession: 'trots att + sub clause'.",
      "Step 3 · Two sides: 'Å ena sidan ___, å andra sidan ___.'",
      "Step 4 · Summary: 'Sammanfattningsvis tycker jag att ___.'",
      "Step 5 · Write a 120-word essay using all 5 connectors.",
    ],
    pitfallsVi: [
      "❌ Dùng 'eftersom' đầu câu mà quên BIFF.",
      "❌ Lặp 'och' quá nhiều — đoạn văn nghe nông.",
      "❌ Không kết bằng 'sammanfattningsvis' → mất điểm bố cục.",
    ],
    pitfallsEn: [
      "❌ Sentence-initial 'eftersom' without BIFF.",
      "❌ Overusing 'och' — paragraph sounds shallow.",
      "❌ No 'sammanfattningsvis' wrap-up — structure loss.",
    ],
    practiceVi: [
      "🎯 Viết 5 cặp câu Å ena sidan / å andra sidan.",
      "🎯 Nối 6 câu đơn thành 3 câu phức bằng eftersom/trots att.",
      "🎯 Tóm tắt 1 bài báo bằng 3 câu, bắt buộc có 'sammanfattningsvis'.",
    ],
    practiceEn: [
      "🎯 Write 5 Å ena sidan / å andra sidan pairs.",
      "🎯 Merge 6 simple sentences into 3 complex with eftersom/trots att.",
      "🎯 Summarise an article in 3 sentences, must include 'sammanfattningsvis'.",
    ],
  },

  /* ===== A1 deep-dives bổ sung (Đợt 1: 9 bài) ===== */

  "a1-restaurant": {
    introVi:
      "Văn hoá 'fika' (cà phê + bánh ngọt) là phản xạ giao tiếp số 1 ở Thuỵ Điển. Bài này dạy bạn 4 câu ráp lại đủ cho mọi quán: chào, gọi món, hỏi giá, trả tiền. Học thuộc lòng theo nhịp ngắn để dùng được trong YKI Tala A1.",
    introEn:
      "'Fika' (coffee + pastry) is the #1 social reflex in Sweden. This lesson gives you 4 stacked sentences that cover any café: greet, order, ask price, pay. Memorise them in short beats for YKI Tala A1.",
    stepsVi: [
      "Bước 1 · Chào: 'Hej!' + mỉm cười. Đừng nói 'Hello' kiểu Anh.",
      "Bước 2 · Gọi: 'Jag tar en kanelbulle och en kaffe, tack.' (Cho mình bánh quế + cà phê).",
      "Bước 3 · Tuỳ chọn: 'Kan jag få ___ utan is/socker?' (không đá / không đường).",
      "Bước 4 · Hỏi giá / hoá đơn: 'Hur mycket?' hoặc 'Notan, tack.'",
      "Bước 5 · Trả tiền: 'Med kort, tack.' (bằng thẻ) — Bắc Âu hầu như cashless.",
    ],
    stepsEn: [
      "Step 1 · Greet: 'Hej!' + smile. Don't use English 'Hello'.",
      "Step 2 · Order: 'Jag tar en kanelbulle och en kaffe, tack.'",
      "Step 3 · Optional: 'Kan jag få ___ utan is/socker?' (no ice / sugar).",
      "Step 4 · Ask price / bill: 'Hur mycket?' or 'Notan, tack.'",
      "Step 5 · Pay: 'Med kort, tack.' — Nordics are nearly cashless.",
    ],
    pitfallsVi: [
      "❌ Nói 'Jag vill ha…' nghe hơi mệnh lệnh — dùng 'Jag tar…' hoặc 'Kan jag få…' lịch sự hơn.",
      "❌ Hỏi 'check please' kiểu Mỹ — ở Thuỵ Điển là 'Notan, tack.'",
      "❌ Tip 10–20% kiểu Mỹ — không bắt buộc, chỉ làm tròn nếu thích.",
    ],
    pitfallsEn: [
      "❌ 'Jag vill ha…' sounds bossy — prefer 'Jag tar…' or 'Kan jag få…'.",
      "❌ American-style 'check please' — in Sweden it's 'Notan, tack.'",
      "❌ 10–20% tipping is not expected; just round up if you wish.",
    ],
    practiceVi: [
      "🎯 Đóng vai: bạn vào quán, gọi 2 món, hỏi giá, trả thẻ — nói liền trong 30 giây.",
      "🎯 Thay 'kanelbulle' bằng 5 món fika khác (semla, kladdkaka, chokladboll, prinsesstårta, smörgås).",
      "🎯 Ghi âm 3 lần và so sánh ngữ điệu cuối câu phải đi xuống ở 'tack'.",
    ],
    practiceEn: [
      "🎯 Role-play: enter a café, order 2 items, ask the price, pay by card — all in 30 s.",
      "🎯 Swap 'kanelbulle' for 5 other fika items (semla, kladdkaka, chokladboll, prinsesstårta, smörgås).",
      "🎯 Record 3 times; ending intonation must fall on 'tack'.",
    ],
  },

  "a1-weather-seasons": {
    introVi:
      "Dự báo thời tiết là nội dung Hörförståelse A1 gần như chắc chắn xuất hiện. Bài này cho bạn khung 3 ô để bắt thông tin (nhiệt độ – mưa/tuyết – gió) và mẫu câu mô tả 4 mùa Bắc Âu — đủ cho Tala lẫn Skriva.",
    introEn:
      "Weather forecasts almost always appear in A1 listening. This lesson gives a 3-slot template (temperature – precipitation – wind) plus model sentences for the four Nordic seasons — usable in Tala and Skriva.",
    stepsVi: [
      "Bước 1 · Khung nghe: ghi 3 số liệu (grader / regn-snö / blåst). Cứ điền vào 3 ô — không cần dịch hết.",
      "Bước 2 · Mẫu mô tả: 'Det är + tính từ' (Det är kallt / varmt / soligt).",
      "Bước 3 · Động từ thời tiết: regnar, snöar, blåser — đứng độc lập với 'det' giả ('Det regnar.').",
      "Bước 4 · Nhiệt độ: 'Temperaturen är fem grader / minus två grader.'",
      "Bước 5 · 4 mùa: vinter, vår, sommar, höst → ráp 'På vintern + câu mô tả'.",
    ],
    stepsEn: [
      "Step 1 · Listening grid: capture 3 facts (degrees / rain-snow / wind). Slot-fill, don't translate fully.",
      "Step 2 · Description template: 'Det är + adjective'.",
      "Step 3 · Weather verbs: regnar, snöar, blåser — used with dummy 'det' ('Det regnar.').",
      "Step 4 · Temperature: 'Temperaturen är fem grader / minus två grader.'",
      "Step 5 · 4 seasons: vinter, vår, sommar, höst → stack 'På vintern + description'.",
    ],
    pitfallsVi: [
      "❌ Quên 'det' giả: 'Regnar idag' SAI — phải 'Det regnar idag.'",
      "❌ Dịch 'lạnh 5 độ' thành 'kallt fem grader' — đúng là 'fem grader kallt' hoặc 'fem minusgrader'.",
      "❌ Lẫn 'höst' (mùa thu) với 'host' (cơn ho) — phát âm 'ö' rất khác.",
    ],
    pitfallsEn: [
      "❌ Dropping dummy 'det': 'Regnar idag' is WRONG — say 'Det regnar idag.'",
      "❌ Translating 'cold 5°': it's 'fem grader kallt' or 'fem minusgrader'.",
      "❌ Mixing 'höst' (autumn) with 'host' (cough) — the 'ö' is very different.",
    ],
    practiceVi: [
      "🎯 Nghe 1 phút dự báo SVT/Yle và điền 3 ô: nhiệt độ, mưa/tuyết, gió.",
      "🎯 Viết 4 câu, mỗi câu cho một mùa, dùng 'På + mùan'.",
      "🎯 Quay video 30 giây làm 'MC dự báo' bằng tiếng Thuỵ Điển.",
    ],
    practiceEn: [
      "🎯 Listen to 1 min SVT/Yle forecast, fill 3 slots: temp, precip, wind.",
      "🎯 Write 4 sentences, one per season, using 'På + season'.",
      "🎯 Film a 30 s weather-anchor clip in Swedish.",
    ],
  },

  "a1-nature-allemansrätten": {
    introVi:
      "Allemansrätten — 'quyền tự do tiếp cận thiên nhiên' — là chủ đề văn hoá kinh điển trong YKI và phỏng vấn nhập cư. Hiểu đúng giúp bạn vừa ghi điểm Tala/Skriva, vừa tránh phạm luật khi đi rừng (ví dụ: không được cắm trại quá 2 ngày một chỗ).",
    introEn:
      "Allemansrätten — 'the right of public access' — is a classic culture topic in YKI and immigration interviews. Mastering it scores points in Tala/Skriva and keeps you out of legal trouble (e.g. you can't camp >2 nights in one spot).",
    stepsVi: [
      "Bước 1 · Định nghĩa 2 câu: 'Allemansrätten betyder att alla får vandra, plocka bär och svamp i naturen. Men man måste respektera djuren och inte störa markägaren.'",
      "Bước 2 · 3 ĐƯỢC: vandra (đi bộ), plocka bär/svamp (hái dâu/nấm), bada i sjön (tắm hồ).",
      "Bước 3 · 3 KHÔNG ĐƯỢC: bryta grenar (bẻ cành), jaga (săn), elda i torrt väder (đốt lửa khi khô hạn).",
      "Bước 4 · Từ vựng địa hình: skog (rừng), sjö (hồ), fjäll (vùng núi cao), kust (bờ biển).",
      "Bước 5 · Câu mẫu Tala: 'Jag älskar Allemansrätten eftersom jag kan vandra fritt på helgerna.'",
    ],
    stepsEn: [
      "Step 1 · 2-sentence definition: 'Allemansrätten lets everyone hike, pick berries and mushrooms in nature. But you must respect animals and not disturb landowners.'",
      "Step 2 · 3 ALLOWED: hike, pick berries/mushrooms, swim in lakes.",
      "Step 3 · 3 FORBIDDEN: break branches, hunt, light a fire in dry weather.",
      "Step 4 · Terrain vocab: skog, sjö, fjäll, kust.",
      "Step 5 · Tala model: 'Jag älskar Allemansrätten eftersom jag kan vandra fritt på helgerna.'",
    ],
    pitfallsVi: [
      "❌ Nói 'Tôi có thể làm BẤT CỨ điều gì trong rừng' — sai, có giới hạn (không đốt lửa, không quấy động vật).",
      "❌ Lẫn 'fjäll' (núi cao Bắc Âu) với 'berg' (núi nói chung).",
      "❌ Quên rằng Allemansrätten KHÔNG áp dụng trong vườn nhà người khác — đó là 'tomt' (đất tư).",
    ],
    pitfallsEn: [
      "❌ Claiming you can do ANYTHING in nature — wrong, restrictions apply (no fires, no animal disturbance).",
      "❌ Confusing 'fjäll' (Nordic high mountain) with 'berg' (mountain in general).",
      "❌ Forgetting Allemansrätten does NOT apply in private 'tomt' (yards).",
    ],
    practiceVi: [
      "🎯 Học thuộc lòng định nghĩa 2 câu và đọc to 5 lần.",
      "🎯 Tự liệt kê 3 ĐƯỢC, 3 KHÔNG bằng tiếng Thuỵ Điển, không nhìn sách.",
      "🎯 Viết một đoạn 60 từ kể về một chuyến đi rừng cuối tuần dùng tối thiểu 5 từ địa hình.",
    ],
    practiceEn: [
      "🎯 Memorise the 2-sentence definition and say it aloud 5×.",
      "🎯 List 3 allowed and 3 forbidden actions in Swedish, no notes.",
      "🎯 Write a 60-word piece on a weekend forest trip using ≥5 terrain words.",
    ],
  },

  "a1-shopping-ica": {
    introVi:
      "ICA và Lidl là 2 chuỗi siêu thị bạn sẽ vào hằng tuần. Bài này dạy 3 phản xạ A1: hỏi 'ở đâu', hỏi giá, chốt đơn. Nắm vững 'erbjudande' (giảm giá) còn giúp bạn tiết kiệm 20–30% chi phí ăn uống — kiến thức sống còn cho du học sinh.",
    introEn:
      "ICA and Lidl are the two supermarkets you'll visit weekly. This lesson gives 3 A1 reflexes: ask 'where', ask price, close the deal. Reading 'erbjudande' (offer) tags saves 20–30% on groceries — a survival skill.",
    stepsVi: [
      "Bước 1 · Hỏi vị trí: 'Ursäkta, var hittar jag ___?' (Xin lỗi, tôi tìm ___ ở đâu?).",
      "Bước 2 · Hỏi giá: 'Hur mycket kostar ___?' — đáp lại bằng 'Det kostar X kronor.'",
      "Bước 3 · Đọc nhãn: 'Erbjudande' = ưu đãi, '2 för X' = mua 2 với giá X, 'pris/kg' = giá / kg.",
      "Bước 4 · Chốt đơn: 'Jag tar ___, tack.' + 'Kan jag betala med kort?'",
      "Bước 5 · Túi: 'En påse, tack' (xin một túi) — phải trả thêm ~3 kr.",
    ],
    stepsEn: [
      "Step 1 · Ask location: 'Ursäkta, var hittar jag ___?'",
      "Step 2 · Ask price: 'Hur mycket kostar ___?' — reply 'Det kostar X kronor.'",
      "Step 3 · Read tags: 'Erbjudande' = offer, '2 för X' = 2 for X, 'pris/kg' = price per kg.",
      "Step 4 · Close: 'Jag tar ___, tack.' + 'Kan jag betala med kort?'",
      "Step 5 · Bag: 'En påse, tack' — costs ~3 kr extra.",
    ],
    pitfallsVi: [
      "❌ Mong nhân viên nói tiếng Anh — ở thành phố nhỏ thường KHÔNG. Học sẵn 3 câu cốt lõi.",
      "❌ Tưởng 'pant' là phụ phí — đó là tiền cọc chai, có thể đổi lại tại máy 'panta'.",
      "❌ Quên cân rau củ tự phục vụ — tem mã vạch dán tại quầy cân, không có sẽ bị trả lại.",
    ],
    pitfallsEn: [
      "❌ Expecting staff to speak English — often NOT in small towns. Memorise the 3 core lines.",
      "❌ Thinking 'pant' is a surcharge — it's a bottle deposit refundable at the 'panta' machine.",
      "❌ Forgetting to weigh self-serve produce — the barcode sticker is printed at the scale, otherwise the cashier sends you back.",
    ],
    practiceVi: [
      "🎯 Lên danh sách 10 món mua hàng tuần, viết tiếng Thuỵ Điển có kèm en/ett.",
      "🎯 Đóng vai khách-thu ngân với bạn học — đổi vai sau 1 phút.",
      "🎯 Vào trang web ICA, đọc 5 nhãn 'Erbjudande' và dịch ra tiếng Việt.",
    ],
    practiceEn: [
      "🎯 List 10 weekly grocery items in Swedish with en/ett.",
      "🎯 Role-play customer↔cashier with a partner, switch after 1 min.",
      "🎯 Browse the ICA website, translate 5 'Erbjudande' tags into your L1.",
    ],
  },

  "a1-housing": {
    introVi:
      "Tìm nhà thuê (lägenhet) là việc đầu tiên khi đến Thuỵ Điển. Bài này dạy 6 từ then chốt trên Blocket/Bostadsdirekt và 4 mẫu câu hỏi chủ nhà. Không hiểu 'andrahand', 'hyresvärd', 'hyra inkl. el' bạn dễ ký nhầm hợp đồng.",
    introEn:
      "Finding a flat (lägenhet) is your first task in Sweden. This lesson teaches 6 keywords on Blocket/Bostadsdirekt and 4 sentences to message the landlord. Without understanding 'andrahand', 'hyresvärd', 'hyra inkl. el' you risk a bad contract.",
    stepsVi: [
      "Bước 1 · 6 từ phải thuộc: lägenhet (căn hộ), rum (phòng), kök (bếp), hyra (tiền thuê), hyresvärd (chủ nhà), kontrakt (hợp đồng).",
      "Bước 2 · 'andrahand' = thuê lại (legal nếu chủ chính cho phép). '1:a hand' = thuê trực tiếp chủ sở hữu.",
      "Bước 3 · Tin tuyển khách thường ghi: '2 rok, 55 kvm, 8500 kr/mån inkl. el'. Đọc được = tiết kiệm thời gian.",
      "Bước 4 · Mẫu câu nhắn: 'Hej! Är lägenheten fortfarande ledig?' (Căn hộ còn trống không ạ?).",
      "Bước 5 · Mẫu câu xem nhà: 'Kan jag komma och titta på lägenheten på lördag?' (Tôi tới xem thứ Bảy được không?).",
    ],
    stepsEn: [
      "Step 1 · 6 must-know words: lägenhet, rum, kök, hyra, hyresvärd, kontrakt.",
      "Step 2 · 'andrahand' = sublet (legal if main tenant has permission). '1:a hand' = direct from owner.",
      "Step 3 · Ads read like: '2 rok, 55 kvm, 8500 kr/mån inkl. el'. Decoding saves hours.",
      "Step 4 · DM template: 'Hej! Är lägenheten fortfarande ledig?'",
      "Step 5 · Viewing template: 'Kan jag komma och titta på lägenheten på lördag?'",
    ],
    pitfallsVi: [
      "❌ Chuyển tiền trước khi ký kontrakt — bẫy lừa đảo phổ biến trên Blocket.",
      "❌ Lẫn 'rum' (phòng tính riêng kể cả phòng khách) với 'sovrum' (phòng ngủ): '2 rok' = 1 phòng ngủ + 1 phòng khách.",
      "❌ Bỏ qua 'el ej inkl.' — bạn sẽ phải trả thêm 500–1000 kr/tháng tiền điện.",
    ],
    pitfallsEn: [
      "❌ Transferring money before signing the kontrakt — classic Blocket scam.",
      "❌ Mixing 'rum' (any room incl. living room) with 'sovrum' (bedroom): '2 rok' = 1 bed + 1 living.",
      "❌ Missing 'el ej inkl.' — you'll pay 500–1000 kr/month extra for electricity.",
    ],
    practiceVi: [
      "🎯 Vào Blocket.se → 'Bostad', đọc 5 tin và liệt kê hyra + kvm + inkl./ej.",
      "🎯 Viết 1 tin nhắn 4 câu hỏi chủ nhà, gửi cho bạn học sửa.",
      "🎯 Học thuộc 6 từ trên qua flashcard trong 3 phút.",
    ],
    practiceEn: [
      "🎯 Open Blocket.se → 'Bostad', read 5 ads and note hyra + sqm + inclusion.",
      "🎯 Write a 4-question landlord DM, peer-review it.",
      "🎯 Drill the 6 key words on flashcards in 3 minutes.",
    ],
  },

  "a1-doctor": {
    introVi:
      "1177 (vårdguiden) là số gọi y tế mặc định ở Thuỵ Điển. Bài này dạy 5 câu mô tả triệu chứng và 3 câu hỏi lễ tân (reception). Biết nói 'jag har ont i ___' (tôi đau ở ___) đủ để vượt qua mọi tình huống bệnh nhẹ.",
    introEn:
      "1177 (vårdguiden) is Sweden's default medical hotline. This lesson teaches 5 symptom sentences and 3 reception questions. Mastering 'jag har ont i ___' (I have pain in ___) covers most light illnesses.",
    stepsVi: [
      "Bước 1 · Câu lõi: 'Jag har ont i ___' (huvudet/magen/halsen/ryggen = đầu/bụng/họng/lưng).",
      "Bước 2 · Sốt/ho: 'Jag har feber och hostar.' Buồn nôn: 'Jag mår illa.'",
      "Bước 3 · Hỏi đặt lịch: 'Jag skulle vilja boka en tid med en läkare.'",
      "Bước 4 · Hỏi thuốc: 'Vilken medicin rekommenderar du?' (Anh/chị khuyên dùng thuốc gì?).",
      "Bước 5 · Số khẩn cấp: 112 (cấp cứu), 1177 (tư vấn y tế thường).",
    ],
    stepsEn: [
      "Step 1 · Core: 'Jag har ont i ___' (huvudet/magen/halsen/ryggen).",
      "Step 2 · Fever/cough: 'Jag har feber och hostar.' Nausea: 'Jag mår illa.'",
      "Step 3 · Book: 'Jag skulle vilja boka en tid med en läkare.'",
      "Step 4 · Ask medicine: 'Vilken medicin rekommenderar du?'",
      "Step 5 · Emergency numbers: 112 (emergency), 1177 (medical advice).",
    ],
    pitfallsVi: [
      "❌ Gọi 112 cho bệnh nhẹ — chỉ dùng khi nguy hiểm tính mạng, tai nạn, cháy nổ.",
      "❌ Nói 'Jag är sjuk' rồi dừng — bác sĩ cần CHỖ ĐAU, không chỉ trạng thái chung.",
      "❌ Dùng paracetamol > 4g/ngày tự mua tại Apotek — nguy hiểm gan, luôn hỏi dược sĩ.",
    ],
    pitfallsEn: [
      "❌ Calling 112 for minor issues — reserve it for life-threatening events, accidents, fires.",
      "❌ Stopping at 'Jag är sjuk' — the doctor needs the SITE of pain, not just the state.",
      "❌ Self-dosing >4 g paracetamol/day from Apotek — liver risk; always ask a pharmacist.",
    ],
    practiceVi: [
      "🎯 Học thuộc 5 bộ phận: huvudet, magen, halsen, ryggen, tanden — gõ vào người để nhớ.",
      "🎯 Đóng vai bệnh nhân-lễ tân: 3 lần đổi triệu chứng khác nhau.",
      "🎯 Ghi âm 30 giây mô tả triệu chứng cảm cúm tưởng tượng, có ngày-tháng-mức độ sốt.",
    ],
    practiceEn: [
      "🎯 Memorise 5 body parts and tap them on yourself for muscle memory.",
      "🎯 Role-play patient↔reception with 3 different symptoms.",
      "🎯 Record 30 s describing a fake flu with date, fever level and symptoms.",
    ],
  },

  "a1-work": {
    introVi:
      "Phỏng vấn xin việc bằng tiếng Thuỵ Điển ở mức A1 thực ra chỉ xoay quanh 4 chủ đề: bản thân, học vấn, kinh nghiệm, lý do ứng tuyển. Bài này cho bạn 4 câu khung dễ nhớ + 6 nghề phổ biến mà người Việt thường làm thời gian đầu.",
    introEn:
      "A1-level job interviews in Swedish basically revolve around 4 themes: self, education, experience, motivation. This lesson gives 4 framework sentences plus 6 common starter jobs for Vietnamese newcomers.",
    stepsVi: [
      "Bước 1 · Mở đầu: 'Hej, jag heter ___ och jag kommer från Vietnam.'",
      "Bước 2 · Học vấn: 'Jag har en kandidatexamen i ___.' (cử nhân) / 'Jag studerar SFI nu.'",
      "Bước 3 · Kinh nghiệm: 'Jag har jobbat som ___ i ___ år.'",
      "Bước 4 · Động cơ: 'Jag söker det här jobbet eftersom ___.'",
      "Bước 5 · Đóng: 'Tack för intervjun! Jag ser fram emot ert svar.' (Cảm ơn buổi phỏng vấn, mong sớm hồi âm.)",
    ],
    stepsEn: [
      "Step 1 · Opener: 'Hej, jag heter ___ och jag kommer från Vietnam.'",
      "Step 2 · Education: 'Jag har en kandidatexamen i ___.' / 'Jag studerar SFI nu.'",
      "Step 3 · Experience: 'Jag har jobbat som ___ i ___ år.'",
      "Step 4 · Motivation: 'Jag söker det här jobbet eftersom ___.'",
      "Step 5 · Close: 'Tack för intervjun! Jag ser fram emot ert svar.'",
    ],
    pitfallsVi: [
      "❌ Dùng 'jag vill ha jobbet' (tôi muốn cái job đó) — nghe trẻ con. Dùng 'jag söker' (tôi ứng tuyển).",
      "❌ Khoe lương kỳ vọng quá sớm — văn hoá Bắc Âu chỉ bàn lương ở vòng cuối.",
      "❌ Bắt tay quá lỏng — sếp Thuỵ Điển coi bắt tay chắc + nhìn mắt là thái độ chuyên nghiệp.",
    ],
    pitfallsEn: [
      "❌ Saying 'jag vill ha jobbet' (I want the job) sounds childish — use 'jag söker'.",
      "❌ Bringing up salary too early — Nordic culture discusses pay only in the final round.",
      "❌ Limp handshake — Swedish managers value firm grip + eye contact as professional.",
    ],
    practiceVi: [
      "🎯 Viết CV 1 trang theo mẫu Arbetsförmedlingen.",
      "🎯 Tự phỏng vấn 4 câu khung trước gương, lặp 3 lần.",
      "🎯 Học 6 nghề thường gặp: städare, undersköterska, restaurangbiträde, butiksbiträde, lagerarbetare, IT-tekniker.",
    ],
    practiceEn: [
      "🎯 Draft a 1-page CV using the Arbetsförmedlingen template.",
      "🎯 Self-interview the 4-frame template in front of a mirror, 3×.",
      "🎯 Learn 6 starter jobs: städare, undersköterska, restaurangbiträde, butiksbiträde, lagerarbetare, IT-tekniker.",
    ],
  },

  "a1-hobbies": {
    introVi:
      "Câu hỏi 'Vad gör du på fritiden?' (Cuối tuần bạn làm gì?) xuất hiện trong 90% buổi small-talk Thuỵ Điển. Bài này dạy bạn 5 mẫu câu sở thích + 3 cách hỏi ngược — để cuộc trò chuyện kéo dài tự nhiên thay vì 'tắt máy' sau 10 giây.",
    introEn:
      "'Vad gör du på fritiden?' (What do you do in your free time?) appears in 90% of Swedish small talk. This lesson teaches 5 hobby templates + 3 reverse-questions to keep the dialogue alive instead of dying in 10 seconds.",
    stepsVi: [
      "Bước 1 · Sở thích chung: 'På fritiden gillar jag att ___.' (vandra/laga mat/läsa böcker = đi bộ/nấu ăn/đọc sách).",
      "Bước 2 · Thể thao: 'Jag spelar ___ varje vecka.' (fotboll/badminton). Tập gym: 'Jag tränar på gym.'",
      "Bước 3 · Văn hoá: 'Jag tycker om att se på film / lyssna på musik.'",
      "Bước 4 · Hỏi ngược: 'Vad gör DU på fritiden då?' — nhấn 'DU' để chuyển turn nói.",
      "Bước 5 · Bày tỏ thái độ: 'Det är riktigt kul!' (Vui lắm!) / 'Det är avkopplande.' (Thư giãn).",
    ],
    stepsEn: [
      "Step 1 · General: 'På fritiden gillar jag att ___.' (vandra/laga mat/läsa böcker).",
      "Step 2 · Sport: 'Jag spelar ___ varje vecka.' Gym: 'Jag tränar på gym.'",
      "Step 3 · Culture: 'Jag tycker om att se på film / lyssna på musik.'",
      "Step 4 · Reverse: 'Vad gör DU på fritiden då?' — stress 'DU' to hand back the turn.",
      "Step 5 · Attitude: 'Det är riktigt kul!' / 'Det är avkopplande.'",
    ],
    pitfallsVi: [
      "❌ Trả lời quá ngắn ('Inget' = 'không gì') — bị coi là khép kín.",
      "❌ Quên 'att' sau 'gillar': 'jag gillar laga mat' SAI, phải 'jag gillar att laga mat'.",
      "❌ Dùng 'spela' cho mọi môn — 'spela' chỉ dùng cho thể thao có bóng/nhạc cụ/game. Đi bộ là 'gå/vandra', bơi là 'simma'.",
    ],
    pitfallsEn: [
      "❌ Replying just 'Inget' (nothing) — comes off as closed-off.",
      "❌ Forgetting 'att' after 'gillar': 'jag gillar laga mat' is WRONG; use 'jag gillar att laga mat'.",
      "❌ Using 'spela' for everything — 'spela' fits ball sports/instruments/games. Hike = 'vandra', swim = 'simma'.",
    ],
    practiceVi: [
      "🎯 Liệt kê 5 sở thích thật + 3 sở thích mơ ước bằng tiếng Thuỵ Điển.",
      "🎯 Quay video 1 phút trả lời 'Vad gör du på fritiden?' và đặt câu hỏi ngược.",
      "🎯 Cặp đôi: A hỏi → B trả lời 30 giây → B hỏi lại → A trả lời. Lặp 5 vòng.",
    ],
    practiceEn: [
      "🎯 List 5 real and 3 dream hobbies in Swedish.",
      "🎯 Film a 1 min answer to 'Vad gör du på fritiden?' and add a reverse question.",
      "🎯 Pair drill: A asks → B 30 s → B reverses → A 30 s. Loop 5×.",
    ],
  },

  "a1-fika": {
    introVi:
      "Fika không chỉ là 'uống cà phê' — đó là nghi thức văn hoá kết nối đồng nghiệp và gia đình. Hiểu fika giúp bạn hoà nhập nhanh tại nơi làm việc và ghi điểm Tala A1 ở câu hỏi 'Berätta om svensk kultur'.",
    introEn:
      "Fika isn't just 'coffee' — it's a cultural ritual that bonds colleagues and family. Understanding fika fast-tracks workplace integration and scores points in Tala A1 when asked 'Tell me about Swedish culture'.",
    stepsVi: [
      "Bước 1 · Định nghĩa: 'Fika är en svensk kafferast med bullar och småprat.' (cà phê + bánh + tán gẫu).",
      "Bước 2 · Thời điểm: thường 9:30 và 14:30 ở văn phòng — tham gia đủ là dấu hiệu hoà nhập.",
      "Bước 3 · Món kinh điển: kanelbulle (bánh quế), kladdkaka (chocolate gooey), chokladboll (bi sô cô la dừa), prinsesstårta (bánh công chúa xanh lá).",
      "Bước 4 · Mẫu lời mời: 'Ska vi fika?' (Đi fika không?) / 'Vill du följa med på fika?'",
      "Bước 5 · Mẫu trả lời: 'Gärna!' (Rất sẵn lòng!) hoặc 'Tyvärr, jag har möte.' (Tiếc quá, tôi có họp.)",
    ],
    stepsEn: [
      "Step 1 · Definition: 'Fika är en svensk kafferast med bullar och småprat.'",
      "Step 2 · Timing: usually 9:30 and 14:30 at the office — joining = integration signal.",
      "Step 3 · Classic treats: kanelbulle, kladdkaka, chokladboll, prinsesstårta.",
      "Step 4 · Invite: 'Ska vi fika?' / 'Vill du följa med på fika?'",
      "Step 5 · Reply: 'Gärna!' or 'Tyvärr, jag har möte.'",
    ],
    pitfallsVi: [
      "❌ Bỏ fika nhiều lần vì 'bận' — bị đánh giá lạnh lùng, khó được sếp giao việc lớn.",
      "❌ Mang đồ ăn riêng + làm việc trong giờ fika — phá vỡ tinh thần chung.",
      "❌ Dùng 'coffee break' bằng tiếng Anh — đồng nghiệp sẽ tinh tế nhắc bạn dùng 'fika'.",
    ],
    pitfallsEn: [
      "❌ Skipping fika 'because busy' — read as cold; managers hesitate to delegate big tasks.",
      "❌ Bringing your own food and working during fika — breaks the collective spirit.",
      "❌ Saying 'coffee break' in English — colleagues will gently nudge you to say 'fika'.",
    ],
    practiceVi: [
      "🎯 Học thuộc định nghĩa 1 câu và đọc to 5 lần.",
      "🎯 Mời 1 đồng nghiệp/bạn thật đi fika bằng tiếng Thuỵ Điển trong tuần này.",
      "🎯 Viết 60 từ kể lại buổi fika đáng nhớ nhất, dùng ít nhất 2 món bánh.",
    ],
    practiceEn: [
      "🎯 Memorise the 1-sentence definition and recite 5×.",
      "🎯 Invite a real colleague/friend to fika in Swedish this week.",
      "🎯 Write 60 words about a memorable fika using ≥2 pastry names.",
    ],
  },

  /* ============ A1 DEEP-DIVE EXPANSION (8 bài chuyên sâu) ============ */
  "a1-alphabet": {
    introVi:
      "Bảng chữ cái Thụy Điển có 29 chữ — 26 chữ giống tiếng Anh cộng thêm å (oa), ä (ae), ö (uh). Biết đọc tên từng chữ giúp bạn đánh vần tên, mã bưu điện, mã số bảo hiểm xã hội khi đăng ký BankID hoặc gọi 1177. Bài này có 4 bước, 10 phút là thuộc.",
    introEn:
      "Swedish has 29 letters — the 26 English ones plus å (oh), ä (ae), ö (uh). Knowing them lets you spell your name, postcode and social security number when signing up for BankID or calling 1177. 4 steps, 10 minutes.",
    stepsVi: [
      "Bước 1 · Đọc bảng A-Z theo nhạc 'ABC-song' phiên bản Bắc Âu — bấm 🔊 mỗi chữ.",
      "Bước 2 · Tập trung 3 chữ riêng: Å = 'oa', Ä = 'ae' (mở miệng), Ö = 'uh' (môi tròn).",
      "Bước 3 · Đánh vần tên thật của bạn: ví dụ H-A-I = 'hå - ah - ee'.",
      "Bước 4 · Đọc số: 0 = 'noll', và mã bưu điện 5 chữ số kiểu '1-2-3 cách 4-5'.",
      "Bước 5 · Tự thu âm đánh vần tên + địa chỉ rồi nghe lại.",
    ],
    stepsEn: [
      "Step 1 · Sing the Nordic ABC song — tap 🔊 on each letter.",
      "Step 2 · Drill the 3 extras: Å = 'oh', Ä = 'ae', Ö = 'uh' (rounded lips).",
      "Step 3 · Spell your real name aloud, e.g. H-A-I = 'hoh-ah-ee'.",
      "Step 4 · Read numbers: 0 = 'noll'; postcodes use '1-2-3 then 4-5'.",
      "Step 5 · Record yourself spelling name + address and listen back.",
    ],
    pitfallsVi: [
      "❌ Đọc Å như chữ A của tiếng Anh — sẽ nhầm 'år' (năm) với 'ar' (vô nghĩa).",
      "❌ Phát âm Ö như O — 'öl' (bia) sẽ thành 'ol' (chai).",
      "❌ Đọc W và V giống nhau khi đánh vần — phải nói rõ 'dubbel-V' cho W.",
    ],
    pitfallsEn: [
      "❌ Reading Å like English A — 'år' (year) becomes 'ar' (gibberish).",
      "❌ Pronouncing Ö like O — 'öl' (beer) turns into 'ol' (bottle).",
      "❌ Mixing W and V — say 'dubbel-V' for W when spelling.",
    ],
    practiceVi: [
      "🎯 Đánh vần 10 tên người Thụy Điển: Björn, Åke, Märta, Östen, Anders…",
      "🎯 Đọc to mã bưu điện nhà bạn 3 lần liền.",
      "🎯 Mở Google Maps Stockholm và đánh vần tên 5 con phố ngẫu nhiên.",
    ],
    practiceEn: [
      "🎯 Spell 10 Swedish names: Björn, Åke, Märta, Östen, Anders…",
      "🎯 Read your postcode aloud 3× in a row.",
      "🎯 Open Google Maps Stockholm and spell 5 random street names.",
    ],
  },

  "a1-pronouns": {
    introVi:
      "Tin vui đầu tiên khi học tiếng Thụy Điển: động từ KHÔNG chia theo ngôi. Học 1 lần 'är' (là) và 'har' (có) là dùng cho mọi đại từ. Bài này cho bạn đủ 'gạch' để ghép câu cơ bản: Jag är trött. Hon har en katt. Vi är hemma.",
    introEn:
      "First good news in Swedish: verbs don't conjugate by person. Learn 'är' (am/is/are) and 'har' (have/has) once — they work for every pronoun. This lesson gives you the bricks to build basic sentences: Jag är trött. Hon har en katt. Vi är hemma.",
    stepsVi: [
      "Bước 1 · Thuộc 9 đại từ chủ ngữ: jag, du, han, hon, den, det, vi, ni, de.",
      "Bước 2 · Học chia 'vara' (là): jag är, du är, han/hon är, vi är, ni är, de är — TOÀN BỘ là 'är'.",
      "Bước 3 · Học chia 'ha' (có): tất cả đều là 'har'. (jag har, du har, vi har…)",
      "Bước 4 · Đại từ tân ngữ: mig, dig, honom, henne, oss, er, dem. (Ví dụ: Hon ser mig = Cô ấy thấy tôi.)",
      "Bước 5 · Đại từ sở hữu: min/mitt/mina (của tôi); din/ditt/dina (của bạn); hans, hennes, vår, er, deras.",
    ],
    stepsEn: [
      "Step 1 · Memorise 9 subject pronouns: jag, du, han, hon, den, det, vi, ni, de.",
      "Step 2 · Conjugate 'vara' (be): every form is 'är'.",
      "Step 3 · Conjugate 'ha' (have): every form is 'har'.",
      "Step 4 · Object pronouns: mig, dig, honom, henne, oss, er, dem.",
      "Step 5 · Possessives: min/mitt/mina, din/ditt/dina, hans, hennes, vår, er, deras.",
    ],
    pitfallsVi: [
      "❌ Cố thêm '-s' vào 'är' / 'har' kiểu tiếng Anh ('She ärs') — sai ngữ pháp ngay.",
      "❌ Dùng 'den' cho người — phải là 'han' hoặc 'hon'.",
      "❌ Quên 3 dạng min/mitt/mina theo en/ett/số nhiều: min bil, mitt hus, mina barn.",
    ],
    pitfallsEn: [
      "❌ Adding '-s' to 'är' / 'har' like English ('She ärs') — instantly wrong.",
      "❌ Using 'den' for people — must be 'han' or 'hon'.",
      "❌ Forgetting min/mitt/mina agree with en/ett/plural: min bil, mitt hus, mina barn.",
    ],
    practiceVi: [
      "🎯 Viết 9 câu, mỗi câu 1 đại từ + 'är' + tính từ (Jag är glad / Du är snäll …).",
      "🎯 Đổi 5 câu tiếng Anh 'I have / She has / They have' sang tiếng Thụy Điển.",
      "🎯 Mô tả gia đình bằng min/mitt/mina, ít nhất 5 danh từ.",
    ],
    practiceEn: [
      "🎯 Write 9 sentences, each pronoun + 'är' + adjective.",
      "🎯 Translate 5 'I have / She has / They have' English sentences into Swedish.",
      "🎯 Describe family using min/mitt/mina with at least 5 nouns.",
    ],
  },

  "a1-en-ett": {
    introVi:
      "Tiếng Thụy Điển có 2 'giống' danh từ: en (~75%) và ett (~25%). Khác tiếng Anh, mạo từ xác định KHÔNG đứng trước mà gắn vào đuôi: en bil → bilen, ett hus → huset. Học từ mới luôn kèm en/ett — đó là quy tắc số 1.",
    introEn:
      "Swedish has 2 noun genders: en (~75%) and ett (~25%). Unlike English, the definite article is a SUFFIX: en bil → bilen, ett hus → huset. Rule #1: always learn nouns with en/ett.",
    stepsVi: [
      "Bước 1 · Ghi từ mới như 'en bil', 'ett hus' — không bao giờ ghi mình từ trần.",
      "Bước 2 · Dạng xác định: en + danh từ → đuôi -en/-n; ett + danh từ → đuôi -et/-t.",
      "Bước 3 · Số nhiều cũng phụ thuộc en/ett: en bil → bilar, ett hus → hus (giữ nguyên), en katt → katter.",
      "Bước 4 · Tính từ ĐỔI THEO en/ett: en röd bil, ett rött hus, två röda bilar.",
      "Bước 5 · Khi không chắc — đoán 'en' (xác suất 75%). Học 30 từ ett phổ biến để giảm sai.",
    ],
    stepsEn: [
      "Step 1 · Note new words as 'en bil', 'ett hus' — never bare.",
      "Step 2 · Definite: en + noun → suffix -en/-n; ett + noun → suffix -et/-t.",
      "Step 3 · Plural depends on gender too: en bil → bilar, ett hus → hus, en katt → katter.",
      "Step 4 · Adjectives agree: en röd bil, ett rött hus, två röda bilar.",
      "Step 5 · When in doubt, guess 'en' (75% odds). Memorise the top 30 ett-nouns.",
    ],
    pitfallsVi: [
      "❌ Nói 'den bil' / 'det hus' kiểu Anh — phải là 'bilen' / 'huset'.",
      "❌ Quên đổi tính từ: 'en rött bil' (sai), phải là 'en röd bil'.",
      "❌ Áp dụng en cho danh từ ett trừu tượng (problem, jobb, kontor) — đây đều là ETT.",
    ],
    pitfallsEn: [
      "❌ Saying 'den bil' / 'det hus' like English — must be 'bilen' / 'huset'.",
      "❌ Forgetting adjective agreement: 'en rött bil' is wrong; use 'en röd bil'.",
      "❌ Treating abstract nouns (problem, jobb, kontor) as en — they're ETT.",
    ],
    practiceVi: [
      "🎯 Phân loại 20 từ mới thành 2 cột en/ett.",
      "🎯 Đổi mỗi danh từ trong câu dưới sang dạng xác định: Jag har en bok. → Boken är ny.",
      "🎯 Viết 5 câu dùng tính từ 'stor / liten' đúng với en/ett/số nhiều.",
    ],
    practiceEn: [
      "🎯 Sort 20 new words into en vs ett columns.",
      "🎯 Convert nouns to definite form: Jag har en bok → Boken är ny.",
      "🎯 Write 5 sentences using 'stor/liten' correctly for en/ett/plural.",
    ],
  },

  "a1-questions": {
    introVi:
      "Hai loại câu hỏi cơ bản: yes/no (chỉ cần đảo động từ ra đầu) và Wh- (dùng 7 từ hỏi). Bài này dạy bạn 7 từ hỏi 'vàng' và mẫu đảo trật tự — phản xạ vô cùng quan trọng cho Tala A1.",
    introEn:
      "Two question types: yes/no (invert the verb) and Wh- (use 7 question words). This lesson teaches the 7 golden Wh-words and the inversion pattern — vital reflexes for Tala A1.",
    stepsVi: [
      "Bước 1 · Yes/No: lấy câu khẳng định 'Du talar engelska.' đảo thành 'Talar du engelska?'",
      "Bước 2 · Wh-: Vad (cái gì), Vem (ai), Var (ở đâu), När (khi nào), Varför (tại sao), Hur (thế nào), Vilken (cái nào).",
      "Bước 3 · Thứ tự câu Wh-: [Wh-] + [Verb] + [Subject] + … (Vad heter du? Var bor du?)",
      "Bước 4 · 'Vilken/vilket/vilka' đổi theo en/ett/số nhiều: Vilken bok? Vilket hus? Vilka barn?",
      "Bước 5 · Phân biệt 'var' (ở đâu - đứng yên) và 'vart' (đi đâu - chuyển động).",
    ],
    stepsEn: [
      "Step 1 · Yes/No: invert 'Du talar engelska.' → 'Talar du engelska?'",
      "Step 2 · Wh-: Vad, Vem, Var, När, Varför, Hur, Vilken.",
      "Step 3 · Order: [Wh-] + [Verb] + [Subject] + …",
      "Step 4 · 'Vilken/vilket/vilka' matches en/ett/plural.",
      "Step 5 · 'Var' (where, static) vs 'vart' (where to, motion).",
    ],
    pitfallsVi: [
      "❌ Giữ trật tự tiếng Anh 'Where you live?' thay vì 'Var bor du?' — đảo verb là bắt buộc.",
      "❌ Hỏi 'Vart bor du?' (sai — phải 'Var bor du?' vì 'bor' là đứng yên).",
      "❌ Quên dùng 'vilket' với danh từ ett — 'Vilken hus?' phải là 'Vilket hus?'",
    ],
    pitfallsEn: [
      "❌ Keeping English order 'Where you live?' instead of 'Var bor du?'",
      "❌ Asking 'Vart bor du?' — must be 'Var bor du?' (bor = static).",
      "❌ Forgetting 'vilket' before ett-nouns: 'Vilket hus?'",
    ],
    practiceVi: [
      "🎯 Đổi 5 câu khẳng định thành câu hỏi yes/no.",
      "🎯 Viết 7 câu hỏi, mỗi câu dùng 1 từ Wh- khác nhau.",
      "🎯 Đóng vai phóng viên — phỏng vấn bạn cùng học 10 câu Wh-.",
    ],
    practiceEn: [
      "🎯 Turn 5 statements into yes/no questions.",
      "🎯 Write 7 Wh-questions, one per Wh-word.",
      "🎯 Role-play reporter — interview a partner with 10 Wh-questions.",
    ],
  },

  "a1-colors-clothes": {
    introVi:
      "Màu sắc và quần áo là từ vựng 'tay phải' khi mô tả người trong bài Skriva A1 và mua sắm IKEA/H&M. Bài này cung cấp 12 màu, 15 món quần áo và quy tắc tính từ thay đổi theo en/ett/số nhiều.",
    introEn:
      "Colours and clothing are your 'right-hand' vocabulary for describing people in Skriva A1 and shopping at IKEA/H&M. 12 colours, 15 clothing items, plus adjective agreement.",
    stepsVi: [
      "Bước 1 · 12 màu: röd, blå, gul, grön, svart, vit, grå, brun, rosa, lila, orange, beige.",
      "Bước 2 · Quy tắc đổi đuôi: en röd bil · ett rött hus · två röda bilar. Ngoại lệ: 'blå' giữ nguyên ở ett (blått), số nhiều 'blåa'.",
      "Bước 3 · Quần áo trên: tröja (len), skjorta (sơ mi), t-shirt, jacka, kappa.",
      "Bước 4 · Quần áo dưới: byxor (luôn số nhiều), jeans, kjol, shorts.",
      "Bước 5 · Phụ kiện mùa đông: mössa (mũ len), vantar (găng), halsduk (khăn), stövlar (ủng).",
    ],
    stepsEn: [
      "Step 1 · 12 colours: röd, blå, gul, grön, svart, vit, grå, brun, rosa, lila, orange, beige.",
      "Step 2 · Endings: en röd bil · ett rött hus · två röda bilar. Exception: 'blå' → blått, blåa.",
      "Step 3 · Tops: tröja, skjorta, t-shirt, jacka, kappa.",
      "Step 4 · Bottoms: byxor (always plural), jeans, kjol, shorts.",
      "Step 5 · Winter accessories: mössa, vantar, halsduk, stövlar.",
    ],
    pitfallsVi: [
      "❌ Nói 'en byxa' — phải 'ett par byxor' hoặc đơn giản 'byxor'.",
      "❌ Quên đổi đuôi tính từ: 'ett röd hus' sai, phải 'ett rött hus'.",
      "❌ Dùng 'rosa' và 'lila' với đuôi -tt/-a — đây là tính từ KHÔNG đổi.",
    ],
    pitfallsEn: [
      "❌ Saying 'en byxa' — must be 'ett par byxor' or just 'byxor'.",
      "❌ Forgetting agreement: 'ett röd hus' should be 'ett rött hus'.",
      "❌ Inflecting 'rosa' and 'lila' — they're invariable.",
    ],
    practiceVi: [
      "🎯 Mô tả 5 bức ảnh người, mỗi ảnh 2 câu (màu + món).",
      "🎯 Vào trang HM.com Sverige, dịch 10 sản phẩm sang tiếng Việt.",
      "🎯 Đóng vai khách H&M — hỏi nhân viên 5 câu 'Har ni denna i [màu]?'",
    ],
    practiceEn: [
      "🎯 Describe 5 photos of people, 2 sentences each (colour + item).",
      "🎯 Open HM.com Sverige and translate 10 products.",
      "🎯 Role-play 5 'Har ni denna i [colour]?' lines at H&M.",
    ],
  },

  "a1-transport-tickets": {
    introVi:
      "Đi tàu, buýt, metro là kỹ năng sống còn ở Stockholm/Göteborg/Malmö. Bài này giúp bạn đọc bảng giờ, mua vé SJ/SL/Skånetrafiken bằng tiếng Thụy Điển và hiểu thông báo trễ tàu 'försenad' để không lỡ chuyến.",
    introEn:
      "Public transport is survival in Stockholm/Gothenburg/Malmö. You'll read timetables, buy SJ/SL/Skånetrafiken tickets in Swedish, and understand 'försenad' delay announcements.",
    stepsVi: [
      "Bước 1 · 4 phương tiện chính: tåg (tàu hỏa), buss, spårvagn (tram), tunnelbana (metro Stockholm).",
      "Bước 2 · Loại vé: enkelbiljett (1 chiều), tur och retur (khứ hồi), månadskort (tháng), reskassa (ví đi lại).",
      "Bước 3 · Mua vé: 'En enkelbiljett till [thành phố], tack.' / 'Hur mycket kostar månadskortet?'",
      "Bước 4 · Đọc bảng giờ: avgår 14:35 (khởi hành), anländer 16:20 (đến), spår 4 (đường ray 4).",
      "Bước 5 · Thông báo: 'Tåget är 10 minuter försenat' (trễ 10 phút) / 'inställt' (huỷ).",
    ],
    stepsEn: [
      "Step 1 · 4 transport types: tåg, buss, spårvagn, tunnelbana.",
      "Step 2 · Ticket kinds: enkelbiljett, tur och retur, månadskort, reskassa.",
      "Step 3 · Buying: 'En enkelbiljett till [city], tack.' / 'Hur mycket kostar månadskortet?'",
      "Step 4 · Timetables: avgår 14:35 (departs), anländer 16:20 (arrives), spår 4 (platform 4).",
      "Step 5 · Announcements: 'Tåget är 10 minuter försenat' / 'inställt' (cancelled).",
    ],
    pitfallsVi: [
      "❌ Đến thẳng tàu mà chưa mua vé — kiểm vé phạt 1500 SEK.",
      "❌ Nhầm 'spår' (ray) với 'station' (ga).",
      "❌ Hiểu 'halv tre' = 14:30 (chứ không phải 15:30) → trễ tàu ngay.",
    ],
    pitfallsEn: [
      "❌ Boarding without a ticket — fines are 1500 SEK.",
      "❌ Confusing 'spår' (platform) with 'station'.",
      "❌ Thinking 'halv tre' = 15:30 (it's 14:30) → missed train.",
    ],
    practiceVi: [
      "🎯 Mở app SL hoặc SJ, đặt thử 1 vé giả lập từ Stockholm → Uppsala bằng giao diện tiếng Thụy Điển.",
      "🎯 Nghe 3 thông báo loa ga (YouTube 'SJ ombordannonsering') và bắt 3 thông tin (giờ, ga, spår).",
      "🎯 Viết hội thoại 6 lượt giữa khách và nhân viên bán vé.",
    ],
    practiceEn: [
      "🎯 Open SL or SJ app, book a mock ticket Stockholm → Uppsala in Swedish.",
      "🎯 Listen to 3 station announcements on YouTube ('SJ ombordannonsering') and catch time/station/platform.",
      "🎯 Write a 6-turn dialogue between passenger and ticket clerk.",
    ],
  },

  "a1-body-health": {
    introVi:
      "Khi bị ốm ở Thụy Điển, bạn gọi 1177 hoặc đặt lịch vårdcentral. Bài học này cho bạn 20 bộ phận cơ thể, công thức 'Jag har ont i ___' và 5 triệu chứng phổ biến — đủ để mô tả tình trạng sức khoẻ trong 90 giây.",
    introEn:
      "When ill in Sweden, you call 1177 or book a vårdcentral. This lesson gives 20 body parts, the frame 'Jag har ont i ___' and 5 common symptoms — enough to describe your health in 90 seconds.",
    stepsVi: [
      "Bước 1 · Học 10 bộ phận trên: huvud (đầu), hår, öga/ögon, öron, näsa, mun, tand/tänder, hals, axel, arm.",
      "Bước 2 · Học 10 bộ phận dưới: mage, rygg, hand, finger, ben, knä, fot, tå, hjärta, hud.",
      "Bước 3 · Công thức đau: Jag har ont i [dạng xác định]. Ví dụ: Jag har ont i huvudet / magen / halsen.",
      "Bước 4 · 5 triệu chứng vàng: feber (sốt), hosta (ho), snuva (sổ mũi), illamående (buồn nôn), trött (mệt).",
      "Bước 5 · Đặt lịch: 'Jag vill boka en tid hos läkaren.' / 'Det är akut.' (cấp cứu).",
    ],
    stepsEn: [
      "Step 1 · Upper body: huvud, hår, öga/ögon, öron, näsa, mun, tand/tänder, hals, axel, arm.",
      "Step 2 · Lower body: mage, rygg, hand, finger, ben, knä, fot, tå, hjärta, hud.",
      "Step 3 · Pain frame: Jag har ont i [definite form]. e.g. Jag har ont i huvudet.",
      "Step 4 · 5 golden symptoms: feber, hosta, snuva, illamående, trött.",
      "Step 5 · Booking: 'Jag vill boka en tid hos läkaren.' / 'Det är akut.'",
    ],
    pitfallsVi: [
      "❌ Quên 'i' trong 'Jag har ont [i] huvudet' — không có 'i' là sai ngữ pháp.",
      "❌ Dùng dạng không xác định: 'Jag har ont i huvud' sai, phải 'huvudet'.",
      "❌ Gọi 112 cho mọi việc — chỉ 112 khi nguy hiểm tính mạng; tư vấn y tế gọi 1177.",
    ],
    pitfallsEn: [
      "❌ Dropping 'i' in 'Jag har ont [i] huvudet'.",
      "❌ Using indefinite: 'Jag har ont i huvud' — must be 'huvudet'.",
      "❌ Dialling 112 for everything — 112 is life-threatening; medical advice is 1177.",
    ],
    practiceVi: [
      "🎯 Chỉ vào 10 bộ phận trên gương và đọc tên bằng tiếng Thụy Điển.",
      "🎯 Viết hội thoại 8 lượt giữa bạn và bác sĩ — mô tả 3 triệu chứng.",
      "🎯 Ghi âm 60 giây 'Tôi không khoẻ vì ___' bằng tiếng Thụy Điển.",
    ],
    practiceEn: [
      "🎯 Point at 10 body parts in the mirror and name them.",
      "🎯 Write an 8-turn doctor–patient dialogue with 3 symptoms.",
      "🎯 Record 60 s of 'I'm unwell because ___' in Swedish.",
    ],
  },

  "a1-daily-routine": {
    introVi:
      "Mô tả 1 ngày bình thường là bài bắt buộc của Skriva A1 ('En vanlig dag'). Bạn chỉ cần 10 động từ + 4 trạng từ tần suất (alltid, ofta, ibland, aldrig) là viết được đoạn văn 100 từ. Bài này dạy đúng khung mẫu để bạn copy-paste với bất kỳ chủ đề tương tự.",
    introEn:
      "Describing a typical day is required for Skriva A1 ('En vanlig dag'). Just 10 verbs + 4 frequency adverbs is enough to write a 100-word essay. This lesson gives the exact frame to reuse.",
    stepsVi: [
      "Bước 1 · Buổi sáng: Jag vaknar kl. 6. Jag stiger upp och äter frukost. Jag dricker kaffe.",
      "Bước 2 · Đi làm/học: Jag åker buss till jobbet/skolan. Jag jobbar/studerar från 8 till 16.",
      "Bước 3 · Buổi chiều: Jag äter lunch klockan 12. På eftermiddagen har jag möten.",
      "Bước 4 · Buổi tối: Jag lagar mat, tittar på TV och läser en bok. Jag går och lägger mig klockan 23.",
      "Bước 5 · Trạng từ tần suất đứng SAU động từ: Jag tränar OFTA. Jag dansar ALDRIG.",
    ],
    stepsEn: [
      "Step 1 · Morning: Jag vaknar kl. 6. Jag stiger upp och äter frukost. Jag dricker kaffe.",
      "Step 2 · Commute: Jag åker buss till jobbet/skolan. Jag jobbar/studerar 8–16.",
      "Step 3 · Afternoon: Jag äter lunch klockan 12. På eftermiddagen har jag möten.",
      "Step 4 · Evening: Jag lagar mat, tittar på TV och läser en bok. Jag går och lägger mig klockan 23.",
      "Step 5 · Frequency adverbs go AFTER the verb: Jag tränar OFTA. Jag dansar ALDRIG.",
    ],
    pitfallsVi: [
      "❌ Đặt trạng từ ofta/aldrig trước động từ kiểu tiếng Anh: 'Jag ofta tränar' sai → 'Jag tränar ofta'.",
      "❌ Quên giới từ 'klockan' khi nói giờ — 'Jag vaknar 6' nghe lủng củng.",
      "❌ Dùng 'jag äter middag' không có 'klockan'/'på kvällen' khiến người nghe không biết khi nào.",
    ],
    pitfallsEn: [
      "❌ Putting ofta/aldrig before the verb English-style: 'Jag ofta tränar' is wrong.",
      "❌ Omitting 'klockan' for clock times: 'Jag vaknar 6' sounds choppy.",
      "❌ 'Jag äter middag' without a time word leaves the listener guessing.",
    ],
    practiceVi: [
      "🎯 Viết đoạn 100 từ 'En vanlig måndag' theo khung 5 bước.",
      "🎯 Đọc to đoạn văn 3 lần, bấm giờ — mục tiêu dưới 90 giây.",
      "🎯 Hoán đổi 'jag' thành 'min mamma' và đổi toàn bộ động từ — quan sát: không gì đổi cả (vì verb không chia)!",
    ],
    practiceEn: [
      "🎯 Write 100 words on 'En vanlig måndag' using the 5-step frame.",
      "🎯 Read it aloud 3× under 90 s.",
      "🎯 Swap 'jag' for 'min mamma' — notice verbs don't change!",
    ],
  },
};
