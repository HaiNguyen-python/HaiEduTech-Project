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
};
