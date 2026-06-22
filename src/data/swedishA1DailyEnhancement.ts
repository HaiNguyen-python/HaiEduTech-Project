/**
 * @file swedishA1DailyEnhancement.ts
 * @description Lớp nâng cấp HƯỚNG DẪN MỚI HỌC cho 30 ngày A1 Thụy Điển.
 *              Mỗi ngày bổ sung 2 callout ngắn gọn:
 *                - whyVi/whyEn: "Vì sao điểm này quan trọng?" - giúp người mới
 *                  hiểu giá trị thực dụng trước khi học khô khan.
 *                - mnemonicVi/mnemonicEn: "Mẹo nhớ nhanh" - 1-2 câu hình ảnh,
 *                  ví dụ so sánh với tiếng Việt hoặc trò chơi chữ giúp ghi sâu.
 *              Đồng thời map mỗi tuần sang 1 ảnh minh hoạ watercolor.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import week1 from "@/assets/swedish-a1-week1.jpg";
import week2 from "@/assets/swedish-a1-week2.jpg";
import week3 from "@/assets/swedish-a1-week3.jpg";
import week4 from "@/assets/swedish-a1-week4.jpg";
import week5 from "@/assets/swedish-a1-week5.jpg";
import topicNumbers from "@/assets/swedish-topic-numbers.jpg";
import topicFamily from "@/assets/swedish-topic-family.jpg";
import topicShopping from "@/assets/swedish-topic-shopping.jpg";
import topicDirections from "@/assets/swedish-topic-directions.jpg";
import topicWeather from "@/assets/swedish-topic-weather.jpg";
import topicDoctor from "@/assets/swedish-topic-doctor.jpg";
import topicHome from "@/assets/swedish-topic-home.jpg";
import topicClothes from "@/assets/swedish-topic-clothes.jpg";
import topicTransport from "@/assets/swedish-topic-transport.jpg";
import topicWork from "@/assets/swedish-topic-work.jpg";
import topicHobbies from "@/assets/swedish-topic-hobbies.jpg";
import topicTime from "@/assets/swedish-topic-time.jpg";
import topicPhone from "@/assets/swedish-topic-phone.jpg";
import topicBankid from "@/assets/swedish-topic-bankid.jpg";
import topicFestival from "@/assets/swedish-topic-festival.jpg";

export const WEEK_HERO: Record<number, { src: string; captionVi: string; captionEn: string }> = {
  1: { src: week1, captionVi: "Tuần 1 - Chào hỏi & âm Bắc Âu", captionEn: "Week 1 - Greetings & Nordic sounds" },
  2: { src: week2, captionVi: "Tuần 2 - Fika, mua sắm & sinh hoạt", captionEn: "Week 2 - Fika, shopping & daily life" },
  3: { src: week3, captionVi: "Tuần 3 - Nhà cửa, sức khoẻ & cơ thể", captionEn: "Week 3 - Home, health & body" },
  4: { src: week4, captionVi: "Tuần 4 - Văn hoá Bắc Âu & giao tiếp", captionEn: "Week 4 - Nordic culture & comms" },
  5: { src: week5, captionVi: "Tuần 5 - Nước rút & tốt nghiệp A1", captionEn: "Week 5 - Final sprint & A1 grad" },
};

// Topical illustration per day - keeps every lesson visually distinct
export const DAY_TOPIC_IMAGE: Record<number, { src: string; captionVi: string; captionEn: string }> = {
  3:  { src: topicNumbers,    captionVi: "Số đếm & đồng hồ kiểu Bắc Âu", captionEn: "Numbers & Nordic clock" },
  6:  { src: topicFamily,     captionVi: "Cây gia đình Thuỵ Điển - mormor, farfar...", captionEn: "Swedish family tree - mormor, farfar..." },
  8:  { src: topicTime,       captionVi: "Bốn mùa & lịch Bắc Âu", captionEn: "Four seasons & Nordic calendar" },
  9:  { src: topicShopping,   captionVi: "Quán cà phê & gọi món lịch sự", captionEn: "Cafe & polite ordering" },
  10: { src: topicShopping,   captionVi: "Siêu thị ICA: thanh toán & kvitto", captionEn: "ICA supermarket: payment & kvitto" },
  12: { src: topicDirections, captionVi: "Hỏi đường ở Gamla Stan", captionEn: "Asking directions in Gamla Stan" },
  13: { src: topicWeather,    captionVi: "4 kiểu thời tiết Bắc Âu", captionEn: "4 Nordic weather moods" },
  15: { src: topicDoctor,     captionVi: "Phòng khám: 'Jag har ont i ___'", captionEn: "Clinic: 'Jag har ont i ___'" },
  16: { src: topicHome,       captionVi: "Căn hộ rum och kök (rok)", captionEn: "Rum och kök (rok) flat" },
  17: { src: topicClothes,    captionVi: "Cửa hàng quần áo Bắc Âu", captionEn: "Nordic clothes store" },
  18: { src: topicTransport,  captionVi: "Ga tàu SL Stockholm", captionEn: "Stockholm SL station" },
  19: { src: topicWork,       captionVi: "Nghề nghiệp & văn phòng Bắc Âu", captionEn: "Professions & Nordic office" },
  20: { src: topicHobbies,    captionVi: "Sở thích: trượt tuyết, đọc, vẽ", captionEn: "Hobbies: ski, read, paint" },
  21: { src: topicTime,       captionVi: "Giới từ thời gian theo mùa", captionEn: "Time prepositions by season" },
  22: { src: topicFestival,   captionVi: "Midsommar & Lucia - 2 lễ vàng", captionEn: "Midsommar & Lucia - 2 great fests" },
  23: { src: topicPhone,      captionVi: "Gọi điện công sở Bắc Âu", captionEn: "Nordic professional phone call" },
  27: { src: topicBankid,     captionVi: "BankID - chìa khoá số Bắc Âu", captionEn: "BankID - Nordic digital key" },
};

export interface DailyEnhancement {
  whyVi: string;
  whyEn: string;
  mnemonicVi: string;
  mnemonicEn: string;
}

export const SWEDISH_A1_DAILY_ENHANCEMENT: Record<number, DailyEnhancement> = {
  /* ===== TUẦN 1 ===== */
  1: {
    whyVi: "Sai phát âm 'sj' và 'tj' là lý do số 1 khiến người Việt nói tiếng Thụy Điển bị nghe nhầm. Sửa ngay từ ngày 1 sẽ tiết kiệm bạn nhiều tháng luyện lại.",
    whyEn: "Mispronouncing 'sj' and 'tj' is the #1 reason Vietnamese speakers get misheard. Fixing it on day 1 saves months of re-learning later.",
    mnemonicVi: "Mẹo 'sj' = giả vờ thổi tắt nến cách 30 cm. Mẹo 'tj' = nói 'chi' kiểu trẻ em nũng nịu.",
    mnemonicEn: "Trick: 'sj' = pretend to blow out a candle 30 cm away. 'tj' = a baby-cute 'chee'.",
  },
  2: {
    whyVi: "Một dạng 'är' cho mọi ngôi nghĩa là bạn KHÔNG cần học bảng chia 6 ngôi như tiếng Anh am/is/are. Học 1 lần xài cả đời.",
    whyEn: "One single 'är' for every person means NO 6-way conjugation table like English am/is/are. Learn once, use forever.",
    mnemonicVi: "Nhớ kiểu Việt: 'jag är' - 'jag' = tôi, 'är' đọc như 'eo' (tròn môi). 'Tôi-eo-bác sĩ' = Jag är läkare.",
    mnemonicEn: "Memory: 'är' sounds like 'air'. 'I-air-teacher' = Jag är lärare.",
  },
  3: {
    whyVi: "Số đếm là kỹ năng đầu tiên dùng mỗi ngày ở Bắc Âu: đọc giá, xem giờ tàu, xem số hẹn khám. Biết 0-100 đã đủ 90% tình huống A1.",
    whyEn: "Numbers are the first daily-use skill in Nordic life: prices, train times, doctor appointments. 0-100 covers 90% of A1 situations.",
    mnemonicVi: "Mẹo 7 = 'sju' đọc gần như 'hwhuu' (thổi hơi). Mẹo 20 = 'tjugo' đọc 'chu-go'. Cứ hét 2 số này 10 lần là nhớ mãi.",
    mnemonicEn: "Trick: 7 'sju' = breathy 'hwhuu'. 20 'tjugo' = 'choo-goh'. Yell each 10 times to lock them in.",
  },
  4: {
    whyVi: "En/ett quyết định cách bạn nói tính từ, mạo từ xác định và số nhiều. Học sai từ đầu sẽ sai cả tổ hợp câu sau này.",
    whyEn: "En/ett dictates adjectives, definite articles and plurals. Learning the wrong gender breaks all later sentences.",
    mnemonicVi: "Mẹo: ghi từ mới luôn kèm 'en/ett' và dạng số nhiều, ví dụ 'en bok, böcker'. Đừng học 'bok' đứng một mình.",
    mnemonicEn: "Trick: always note new nouns with 'en/ett' + plural, e.g. 'en bok, böcker'. Never learn 'bok' alone.",
  },
  5: {
    whyVi: "70% giao tiếp A1 là HỎI và TRẢ LỜI ngắn. Làm chủ 7 từ hỏi và quy tắc V2 = đi siêu thị, hỏi đường, đặt hẹn đều xong.",
    whyEn: "70% of A1 communication is short Q&A. Master the 7 question words and V2 rule and you can shop, ask directions, book.",
    mnemonicVi: "Mẹo phân biệt: 'Var' (vị trí TĨNH, có chữ R kết thúc giống 'where') vs 'Vart' (vị trí ĐỘNG, thêm T = đi To đâu).",
    mnemonicEn: "Tip: 'Var' (static, ends with R like 'whe-R-e') vs 'Vart' (movement, +T = going To where).",
  },
  6: {
    whyVi: "Từ gia đình + sở hữu là chủ đề xuất hiện trong CẢ NGHE, ĐỌC, NÓI và VIẾT của YKI A1. Vắng nó là mất điểm cả 4 kỹ năng.",
    whyEn: "Family + possessives appear in ALL 4 skills of YKI A1 (listen, read, speak, write). Skipping costs you points everywhere.",
    mnemonicVi: "Mẹo: mor (mẹ) + mor = mormor (bà ngoại). Far (bố) + far = farfar (ông nội). Ghép 2 lần = thế hệ trên 1 bậc.",
    mnemonicEn: "Trick: mor (mom) + mor = mormor (maternal grandma). far + far = farfar (paternal grandpa). Double = one generation up.",
  },
  7: {
    whyVi: "Hiện tại nhóm 1 (-ar) chiếm hơn 60% động từ Thụy Điển. Học xong là bạn nói được câu hiện tại về MỌI hoạt động hằng ngày.",
    whyEn: "Group-1 present (-ar) covers 60%+ of Swedish verbs. Once mastered, you can talk about ANY daily activity.",
    mnemonicVi: "Mẹo: nhóm 1 = 'thêm -r vào động từ nguyên thể'. Tala → talar. Bo → bor. Chỉ thêm -r là xong.",
    mnemonicEn: "Trick: group 1 = 'add -r to the infinitive'. Tala → talar. Bo → bor. Just +r, done.",
  },

  /* ===== TUẦN 2 ===== */
  8: {
    whyVi: "Hỏi giờ kiểu Thụy Điển NGƯỢC với người Việt: 'halv fyra' = 3h30 nghĩa là 'nửa giờ TỚI 4'. Hiểu sai là trễ hẹn cả tiếng.",
    whyEn: "Telling time in Swedish is BACKWARDS for English speakers: 'halv fyra' = 3:30 ('half TO 4'). Misunderstand and you're an hour late.",
    mnemonicVi: "Mẹo: nghe 'halv X' = ngay lập tức TRỪ 30 phút khỏi X. 'Halv åtta' = 7h30, không phải 8h30.",
    mnemonicEn: "Trick: hear 'halv X' = immediately subtract 30 from X. 'Halv åtta' = 7:30, not 8:30.",
  },
  9: {
    whyVi: "Biết gọi đồ ăn lịch sự là kỹ năng SỐNG ở Bắc Âu - mỗi ngày bạn vào quán cà phê, siêu thị, nhà ăn ít nhất 1 lần.",
    whyEn: "Polite ordering is a SURVIVAL skill in the Nordics - you'll enter a cafe, store or canteen at least daily.",
    mnemonicVi: "Mẹo: 'middag' = bữa TỐI (không phải 'midday/giữa trưa' như tiếng Anh). Người Bắc Âu ăn tối lúc 17-18h cùng cả nhà.",
    mnemonicEn: "Trick: 'middag' = DINNER (not 'midday' like English). Nordics eat dinner 5-6 pm together.",
  },
  10: {
    whyVi: "99% giao dịch ở SE/PL trả thẻ + đọc số kr trên màn hình. Sai 1 chữ số khi xác nhận 'tre eller fyrtio' là mất tiền.",
    whyEn: "99% of SE/FI payments are card + reading kr digits on screen. Confusing 'tre' (3) vs 'fyrtio' (40) costs money.",
    mnemonicVi: "Mẹo: nhớ luôn xin 'Kvitto, tack' (Hoá đơn nhé) - mặc định họ KHÔNG in. Cần khi đổi trả hoặc khai thuế.",
    mnemonicEn: "Trick: always ask 'Kvitto, tack!' - receipts aren't printed by default. Needed for returns or tax.",
  },
  11: {
    whyVi: "Không hiểu 'fika' là không hiểu văn hoá làm việc Bắc Âu. Sếp mời fika mà từ chối = mất cơ hội networking.",
    whyEn: "Not getting 'fika' means missing Nordic work culture. Decline a boss's fika invite = lose networking chance.",
    mnemonicVi: "Mẹo: fika không chỉ là cà phê, mà là 'tín hiệu xã giao'. 'Ska vi fika?' = 'Mình ngồi nói chuyện chút nhé?'",
    mnemonicEn: "Trick: fika is a social signal more than coffee. 'Ska vi fika?' = 'Wanna chat a bit?'",
  },
  12: {
    whyVi: "Hỏi đường là kỹ năng cứu cánh khi điện thoại hết pin hoặc GPS sai. Câu 'Ursäkta...' mở thoại lịch sự với mọi người Bắc Âu.",
    whyEn: "Asking directions saves you when battery dies or GPS misfires. 'Ursäkta...' politely opens any Nordic conversation.",
    mnemonicVi: "Mẹo: höger (phải) - chữ H giống chữ R lật ngược, gắn với tay 'phải'. Vänster (trái) - V như chữ V của 'Vietnam' (bên trái bản đồ).",
    mnemonicEn: "Trick: höger (right) - H mirrors R, ties to right hand. Vänster (left) - V like 'Vietnam' on the left of the map.",
  },
  13: {
    whyVi: "Người Bắc Âu nói chuyện THỜI TIẾT trung bình 4 lần/ngày. Không nắm 5 cụm cơ bản là không có gì để chitchat ở thang máy.",
    whyEn: "Nordics discuss weather ~4x daily. Without 5 basic phrases you have nothing to small-talk in the elevator.",
    mnemonicVi: "Mẹo: chữ 'det' đứng đầu câu thời tiết - cứ thuộc lòng 'Det är + tính từ'. VD: Det är kallt (lạnh).",
    mnemonicEn: "Trick: 'det' starts every weather sentence - memorize 'Det är + adjective'. Det är kallt.",
  },
  14: {
    whyVi: "So sánh hơn/nhất xuất hiện trong NGHE A1 (so sánh giá, so sánh giờ, so sánh thời tiết). Không biết = mất 20% điểm phần nghe.",
    whyEn: "Comparatives appear in A1 listening (comparing prices, times, weather). Missing them = lose 20% of listening points.",
    mnemonicVi: "Mẹo: thường thì +are (hơn), +ast (nhất). Bất quy tắc nhớ bộ ba 'bra/bättre/bäst' giống 'good/better/best' tiếng Anh.",
    mnemonicEn: "Trick: usually +are (more), +ast (most). Irregulars: 'bra/bättre/bäst' = good/better/best.",
  },

  /* ===== TUẦN 3 ===== */
  15: {
    whyVi: "Biết nói chỗ đau ở phòng khám là vấn đề SỨC KHOẺ, không phải ngôn ngữ. Bắc Âu hệ y tế tốt nhưng bs cần bạn diễn tả chính xác.",
    whyEn: "Naming where it hurts at the clinic is a HEALTH issue, not just language. Nordic healthcare is great but doctors need precise descriptions.",
    mnemonicVi: "Mẹo công thức: 'Jag har ont i ___' (Tôi đau ___). 'ont' đọc gần như 'unt'. Học công thức này là cứu mạng.",
    mnemonicEn: "Formula: 'Jag har ont i ___' (I have pain in ___). 'ont' sounds like 'unt'. Lifesaving formula.",
  },
  16: {
    whyVi: "Thuê nhà ở SE/PL phải dùng từ chính xác: 1 rok ≠ 1 phòng kiểu Việt Nam. Sai từ là chọn nhầm căn hộ giá đắt gấp đôi.",
    whyEn: "Renting in SE/FI requires exact vocab: 1 rok ≠ a Vietnamese 'room'. Wrong word = wrong (double-price) flat.",
    mnemonicVi: "Mẹo: 'rok' = rum och kök = phòng + bếp. '1 rok' = 1 phòng đa năng có bếp nhỏ. '2 rok' = thêm 1 phòng riêng.",
    mnemonicEn: "Trick: 'rok' = rum och kök = room + kitchen. '1 rok' = studio with kitchenette. '2 rok' = +1 separate room.",
  },
  17: {
    whyVi: "Mua quần áo là tình huống ĐẦU TIÊN du học sinh gặp khi tới SE/PL (vì khí hậu khác hẳn VN). Cần biết hỏi cỡ + thử.",
    whyEn: "Buying clothes is the FIRST scenario new arrivals face (climate shock from VN). You need size + try-on phrases.",
    mnemonicVi: "Mẹo: 3 dạng tính từ - en röd tröja (en), ett rött hus (+t cho ett), röda skor (+a cho số nhiều). Thuộc 1 ví dụ là suy ra hết.",
    mnemonicEn: "Trick: 3 adjective forms - en röd tröja, ett rött hus (+t), röda skor (+a plural). Memorize one example, derive the rest.",
  },
  18: {
    whyVi: "Trễ hoặc lên nhầm tàu = lỡ học/lỡ việc. Biết đọc bảng 'försenat' (trễ) và 'inställt' (huỷ) là kỹ năng SỐNG hằng ngày.",
    whyEn: "Late or wrong train = missed class/work. Reading 'försenat' (delayed) and 'inställt' (cancelled) is daily survival.",
    mnemonicVi: "Mẹo: 'försenat' có 'sen' giống 'sen sàng/chậm trễ' - hình dung tàu đến muộn. 'inställt' có 'in' = bị 'thu vào' = huỷ.",
    mnemonicEn: "Trick: 'försenat' has 'sen' = late. 'inställt' has 'in' = pulled in = cancelled.",
  },
  19: {
    whyVi: "Tự giới thiệu nghề bằng 'Jag är/jobbar som ___' là câu đầu tiên trong MỌI buổi networking, phỏng vấn, hội thảo ở Bắc Âu.",
    whyEn: "Self-introducing your job with 'Jag är/jobbar som ___' opens EVERY Nordic networking, interview, conference.",
    mnemonicVi: "Mẹo: 'Med vänliga hälsningar' (M.V.H) = 'Best regards' - viết tắt M.V.H ở cuối mọi email công sở, ai cũng dùng.",
    mnemonicEn: "Trick: 'Med vänliga hälsningar' = M.V.H. = 'Best regards'. Standard email signoff, everyone uses it.",
  },
  20: {
    whyVi: "Bày tỏ sở thích là cách KẾT BẠN nhanh nhất với người Bắc Âu vốn kín đáo. 'Jag gillar ___' mở ra mọi cuộc trò chuyện.",
    whyEn: "Sharing hobbies is the FASTEST way to befriend reserved Nordics. 'Jag gillar ___' opens any conversation.",
    mnemonicVi: "Mẹo: 'gilla' (thích) + danh từ. 'gilla att' (thích làm gì) + động từ nguyên thể. Phải có 'att' khi sau là động từ.",
    mnemonicEn: "Trick: 'gilla' + noun. 'gilla att' + verb (need 'att' before verbs).",
  },
  21: {
    whyVi: "Giới từ thời gian sai = nói sai TOÀN BỘ kế hoạch. 'På måndag' (vào t2) khác 'om en månad' (1 tháng nữa) khác 'i mars' (trong tháng 3).",
    whyEn: "Wrong time preposition = wrong plan entirely. 'På måndag' vs 'om en månad' vs 'i mars' = totally different times.",
    mnemonicVi: "Mẹo: PÅ = thứ/buổi/mùa (Point). I = tháng/năm/khoảng (Inside). OM = tương lai (Onwards). SEDAN = quá khứ (Since).",
    mnemonicEn: "Trick: PÅ = day/time-of-day/season (Point). I = month/year/duration (Inside). OM = future (Onwards). SEDAN = past.",
  },

  /* ===== TUẦN 4 ===== */
  22: {
    whyVi: "Văn hoá lễ hội là chìa khoá HOÀ NHẬP. Không biết midsommar = không có ai mời đi chơi. Hiểu allemansrätten = đi rừng thoải mái.",
    whyEn: "Festival culture is the key to INTEGRATING. No midsommar knowledge = no party invites. Understand allemansrätten = roam freely.",
    mnemonicVi: "Mẹo nhớ allemansrätten: 'all-man-right' = quyền của MỌI người. 2 quy tắc vàng: 'Inte störa, inte förstöra' (Không phá - Không quấy rầy).",
    mnemonicEn: "Trick: allemansrätten = 'all-man-right' = everyone's right. 2 golden rules: don't disturb, don't destroy.",
  },
  23: {
    whyVi: "Gọi điện ở SE/PL phải mở đầu khác Anh-Mỹ: KHÔNG nói 'hello?' mà nói 'Hej, det är ___ från ___'. Sai mở đầu = đối phương cúp máy.",
    whyEn: "Phone calls in SE/FI open differently: NOT 'hello?' but 'Hej, det är ___ från ___'. Wrong opener = they hang up.",
    mnemonicVi: "Mẹo công thức: HEJ + det är + TÊN + från + NƠI LÀM. Học thuộc 1 câu là gọi điện mọi tình huống.",
    mnemonicEn: "Formula: HEJ + det är + NAME + från + WORKPLACE. Memorize one line, use for any call.",
  },
  24: {
    whyVi: "Bắc Âu coi trọng SỨC KHOẺ TINH THẦN. Trả lời thật khi ai hỏi 'Hur mår du?' (không cần luôn nói 'bra') là dấu hiệu tin tưởng.",
    whyEn: "Nordics value MENTAL HEALTH. Answering honestly to 'Hur mår du?' (no need to always say 'bra') signals trust.",
    mnemonicVi: "Mẹo: mår (cảm thấy) chỉ dùng cho người. Tính từ cảm xúc đi với 'är'. 'Jag mår bra' (Khoẻ) vs 'Jag är glad' (Vui).",
    mnemonicEn: "Trick: 'mår' (feel) only for people. Emotion adjectives use 'är'. 'Jag mår bra' (well) vs 'Jag är glad' (happy).",
  },
  25: {
    whyVi: "Modal verbs (ska/vill/kan/måste) là CỐT LÕI để nói kế hoạch và lời mời. Không có chúng, bạn chỉ nói được câu hiện tại đơn.",
    whyEn: "Modal verbs are the CORE of expressing plans and invites. Without them, you're stuck in simple present only.",
    mnemonicVi: "Mẹo: modal + động từ NGUYÊN THỂ (KHÔNG 'att'). VD: Jag vill äta (✓), Jag vill ATT äta (✗). Khác hẳn 'Jag gillar att äta'.",
    mnemonicEn: "Trick: modal + BARE infinitive (NO 'att'). Jag vill äta (✓), Jag vill ATT äta (✗). Different from 'Jag gillar att äta'.",
  },
  26: {
    whyVi: "Quyền đổi/trả hàng ở Bắc Âu rất mạnh (14-30 ngày). Không dùng = mất tiền. 1 câu 'Jag vill lämna tillbaka' là lấy lại tiền ngay.",
    whyEn: "Return rights in the Nordics are strong (14-30 days). Not using them = lose money. One 'Jag vill lämna tillbaka' gets a refund.",
    mnemonicVi: "Mẹo: LUÔN giữ kvitto. 'Här är kvittot' đưa ra = nhân viên không cãi được. Không kvitto = chỉ đổi, không hoàn tiền.",
    mnemonicEn: "Trick: ALWAYS keep the kvitto (receipt). 'Här är kvittot' = no argument. Without it = exchange only, no refund.",
  },
  27: {
    whyVi: "Không có BankID/Mobiilivarmenne = không thuê được nhà, không mở được tài khoản, không ký được hợp đồng nào ở Bắc Âu. Phải có.",
    whyEn: "No BankID/Mobiilivarmenne = no flat, no bank account, no signed contract in the Nordics. Mandatory.",
    mnemonicVi: "Mẹo BẢO MẬT: mã 6 số gửi qua app KHÔNG BAO GIỜ đọc cho ai - kể cả khi gọi xưng là 'ngân hàng/police'. 99% là lừa đảo.",
    mnemonicEn: "SECURITY: never share 6-digit codes - even to callers claiming 'bank/police'. 99% it's a scam.",
  },
  28: {
    whyVi: "Phản thân (sig) khác hẳn tiếng Anh: 'tvätta sig' (tắm) không phải 'wash self'. Sai là người nghe hiểu khác hoàn toàn.",
    whyEn: "Reflexives (sig) differ from English: 'tvätta sig' (bathe) isn't literal 'wash self'. Mistakes change meaning entirely.",
    mnemonicVi: "Mẹo bảng nhanh: jag→mig, du→dig, han/hon/de→sig, vi→oss, ni→er. Chỉ sig cho ngôi 3 (he/she/they/it).",
    mnemonicEn: "Quick table: jag→mig, du→dig, han/hon/de→sig, vi→oss, ni→er. Only 'sig' for 3rd person.",
  },

  /* ===== TUẦN 5 ===== */
  29: {
    whyVi: "Mô phỏng đề thi YKI giúp bạn LÀM QUEN áp lực thời gian + format thực tế. Vào phòng thi không bị bỡ ngỡ = thêm 1-2 điểm.",
    whyEn: "Simulating YKI builds time pressure + format familiarity. Walking in unsurprised = +1-2 score points.",
    mnemonicVi: "Mẹo: phần Viết YKI A1 chỉ cần 40-60 từ ĐƠN GIẢN, đúng ngữ pháp cơ bản. Không cần câu phức - càng đơn giản càng ít lỗi.",
    mnemonicEn: "Tip: YKI A1 writing just needs 40-60 SIMPLE correct words. No complex sentences - simpler = fewer errors.",
  },
  30: {
    whyVi: "Có roadmap A2 rõ ràng giúp bạn không 'mất phương hướng' sau khi xong A1. 80% học viên bỏ ngang vì không biết bước tiếp.",
    whyEn: "A clear A2 roadmap prevents post-A1 drift. 80% of learners quit because they don't know the next step.",
    mnemonicVi: "Mẹo duy trì: nghe 'Radio Sweden Lätt' (đài chậm) 10 phút/ngày trên đường đi làm. Sau 30 ngày sẽ thấy bước nhảy A1→A2.",
    mnemonicEn: "Habit: listen to 'Radio Sweden Lätt' 10 min/day commuting. After 30 days you'll feel the A1→A2 jump.",
  },
};

export const getDailyEnhancement = (day: number): DailyEnhancement | undefined =>
  SWEDISH_A1_DAILY_ENHANCEMENT[day];
