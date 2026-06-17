/**
 * @file detailedVFFExpansionV9.ts
 * @description Đợt 9 mở rộng — 3 bài Vietnamese-for-Foreigners chuyên sâu
 * (chợ truyền thống, taxi/xe ôm, đi khám bác sĩ). Mỗi bài đầy đủ scenario,
 * dialogue 10 lượt, grammar points, cultural notes, practice.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { detailedVFFModules, type DetailedLesson, type DetailedModule } from "./detailedVietnameseData";

const wetMarketLesson: DetailedLesson = {
  id: "vff-market-wet",
  title: "Đi chợ truyền thống – Trả giá khéo léo",
  titleEn: "Wet Market – The Art of Bargaining",
  icon: "🥬",
  scenario: "Bạn đi chợ Bến Thành mua rau quả và muốn trả giá.",
  scenarioEn: "You visit Ben Thanh Market to buy vegetables and want to bargain politely.",
  dialogue: [
    { speaker: "You", speakerLabel: "Bạn", vi: "Cô ơi, rau muống bao nhiêu một bó?", en: "Excuse me ma'am, how much is a bunch of water spinach?", literal: "Auntie hey, water-spinach how-much one bunch?", keyWords: [{ word: "cô ơi", pronunciation: "kô oi", meaning: "Excuse me, aunt", tone: "ngang" }, { word: "bó", pronunciation: "bó", meaning: "bunch", tone: "sac" }] },
    { speaker: "Vendor", speakerLabel: "Người bán", vi: "Mười lăm nghìn một bó, em ơi.", en: "Fifteen thousand a bunch, dear.", literal: "Ten-five thousand one bunch, younger-one hey.", keyWords: [{ word: "nghìn", pronunciation: "ngìn", meaning: "thousand (VND)", tone: "huyen" }] },
    { speaker: "You", speakerLabel: "Bạn", vi: "Đắt quá cô ơi. Mười nghìn được không?", en: "Too expensive! Ten thousand okay?", literal: "Expensive too auntie hey. Ten thousand okay or-not?", keyWords: [{ word: "đắt", pronunciation: "đắt", meaning: "expensive", tone: "sac" }] },
    { speaker: "Vendor", speakerLabel: "Người bán", vi: "Không được đâu em. Mười ba nghìn nhé.", en: "Can't do that. Thirteen thousand, deal?", literal: "Not okay where younger-one. Ten-three thousand right." },
    { speaker: "You", speakerLabel: "Bạn", vi: "Vậy mười hai nghìn đi cô. Em mua ba bó luôn.", en: "Then twelve thousand. I'll take three bunches.", literal: "Then ten-two thousand go auntie. Younger-one buy three bunches always.", keyWords: [{ word: "luôn", pronunciation: "luôn", meaning: "right away / altogether", tone: "ngang" }] },
    { speaker: "Vendor", speakerLabel: "Người bán", vi: "Thôi được, mua nhiều cô bán rẻ. Em lấy thêm cà chua không?", en: "Alright, you buy a lot so I'll cut you a deal. Want tomatoes too?", literal: "Stop okay, buy many auntie sell cheap. Younger-one take more tomato or-not?" },
    { speaker: "You", speakerLabel: "Bạn", vi: "Cà chua bao nhiêu một cân ạ?", en: "How much per kilo of tomatoes?", literal: "Tomato how-much one kilo polite?", keyWords: [{ word: "cân", pronunciation: "kân", meaning: "kilogram (Northern)", tone: "ngang" }, { word: "ạ", pronunciation: "ạ", meaning: "polite particle", tone: "nang" }] },
    { speaker: "Vendor", speakerLabel: "Người bán", vi: "Hai mươi nghìn một cân. Tươi lắm em ơi!", en: "Twenty thousand per kilo. Very fresh!", literal: "Two-ten thousand one kilo. Fresh very younger-one hey!", keyWords: [{ word: "tươi", pronunciation: "tươi", meaning: "fresh", tone: "ngang" }] },
    { speaker: "You", speakerLabel: "Bạn", vi: "Cho em nửa cân. Tổng cộng bao nhiêu cô?", en: "Half a kilo please. How much total?", literal: "Give younger-one half kilo. Total how-much auntie?" },
    { speaker: "Vendor", speakerLabel: "Người bán", vi: "Ba bó rau với nửa cân cà chua, tổng bốn mươi sáu nghìn em nhé.", en: "Three bunches plus half kilo tomatoes — forty-six thousand total.", literal: "Three bunches vegetable with half kilo tomato, total four-ten six thousand younger-one right." },
  ],
  grammarPoints: [
    {
      pattern: "[Số] + [Đơn vị] + [Vật]",
      patternEn: "Number + Classifier + Noun",
      explanation: "Đơn vị (classifier) BẮT BUỘC giữa số và danh từ đếm được. Mỗi loại vật có classifier riêng.",
      explanationEn: "A classifier is REQUIRED between a number and a countable noun. Each object type has its own classifier.",
      examples: [
        { vi: "ba bó rau", en: "three bunches of vegetables", literal: "three bunch vegetable" },
        { vi: "hai cân cà chua", en: "two kilos of tomatoes", literal: "two kilo tomato" },
        { vi: "năm trái xoài", en: "five mangoes", literal: "five fruit mango" },
        { vi: "một chai nước", en: "one bottle of water", literal: "one bottle water" },
      ],
    },
    {
      pattern: "[Giá] được không? / Cho em [giá thấp hơn] đi.",
      patternEn: "Bargaining: '[Price] okay?' / 'Give me [lower price].'",
      explanation: "Cách trả giá lịch sự. Không bao giờ ép giá dưới 50% giá ban đầu – sẽ bị coi là vô lễ.",
      explanationEn: "Polite bargaining structures. NEVER push below 50% of the asking price — considered disrespectful.",
      examples: [
        { vi: "Mười nghìn được không?", en: "Ten thousand okay?", literal: "Ten thousand okay or-not?" },
        { vi: "Cho em ba mươi nghìn đi.", en: "Give it to me for thirty thousand.", literal: "Give younger-one three-ten thousand go." },
        { vi: "Bớt cho em chút được không?", en: "Could you give me a small discount?", literal: "Reduce for younger-one little okay or-not?" },
      ],
    },
  ],
  culturalNotes: [
    {
      title: "Quy tắc trả giá ở chợ Việt",
      titleEn: "The rules of bargaining in Vietnamese markets",
      content: "Trả giá là một phần văn hóa chợ truyền thống – KHÔNG phải xúc phạm. Quy tắc bất thành văn: giảm tối đa 20–30% giá ban đầu. Mua nhiều thì giảm thêm. Luôn giữ giọng VUI VẺ và TƯƠI CƯỜI; trả giá gay gắt sẽ bị coi là 'kẹt sỉ' (stingy).",
      contentEn: "Bargaining is part of traditional market culture — NOT offensive. Unwritten rule: aim for 20–30% off the asking price. Buy more, get more off. Always keep a CHEERFUL TONE and SMILE; aggressive bargaining is seen as 'kẹt sỉ' (stingy).",
    },
    {
      title: "Đơn vị đo: cân vs ký",
      titleEn: "Weight units: cân vs ký",
      content: "'Cân' (Bắc) và 'ký' (Nam) đều = 1 kilogram. Người miền Bắc nói 'một cân', miền Nam nói 'một ký'. Cả hai đều đúng – chỉ là vùng miền khác nhau.",
      contentEn: "'Cân' (North) and 'ký' (South) both = 1 kilogram. Northerners say 'một cân', Southerners say 'một ký'. Both correct — just regional dialect.",
    },
    {
      title: "Xưng hô ở chợ",
      titleEn: "Pronouns at the market",
      content: "Người bán hàng (40+ tuổi) thường gọi là 'cô' (nữ) hoặc 'chú' (nam). Trẻ hơn dùng 'chị/anh'. Đừng dùng 'bà/ông' nghe rất già – dễ làm họ phật ý.",
      contentEn: "Vendors aged 40+ are usually called 'cô' (female) or 'chú' (male). Younger vendors use 'chị/anh'. AVOID 'bà/ông' — sounds too old and may offend.",
    },
  ],
  practice: {
    type: "fill-blank",
    instruction: "Điền classifier (đơn vị) phù hợp vào chỗ trống.",
    instructionEn: "Fill in the correct classifier.",
    items: [
      { question: "ba ___ rau muống", questionEn: "three ___ of water spinach", answer: "bó", explanation: "Rau dùng classifier 'bó' (bunch).", explanationEn: "Vegetables use 'bó' (bunch)." },
      { question: "hai ___ cà chua (= 2 kg)", questionEn: "two ___ of tomatoes (= 2 kg)", answer: "cân / ký", explanation: "Cân (Bắc) hoặc Ký (Nam) – đều là kilogram.", explanationEn: "Cân (North) or Ký (South) – both mean kilogram." },
      { question: "năm ___ xoài", questionEn: "five ___ mangoes", answer: "trái / quả", explanation: "Trái (Nam) / Quả (Bắc) cho quả tròn.", explanationEn: "Trái (South) / Quả (North) for round fruit." },
      { question: "một ___ nước suối", questionEn: "one ___ of mineral water", answer: "chai", explanation: "'Chai' = bottle.", explanationEn: "'Chai' = bottle." },
    ],
  },
  toneHighlights: [
    { word: "cô", pronunciation: "kô", meaning: "aunt (vendor 40+, female)", tone: "ngang" },
    { word: "đắt", pronunciation: "đắt", meaning: "expensive", tone: "sac" },
    { word: "rẻ", pronunciation: "rẻ", meaning: "cheap", tone: "hoi" },
    { word: "nghìn", pronunciation: "ngìn", meaning: "thousand (VND)", tone: "huyen" },
  ],
};

const grabTaxiLesson: DetailedLesson = {
  id: "vff-transport-grab",
  title: "Đặt Grab & đi taxi an toàn",
  titleEn: "Booking Grab & Taking a Safe Taxi",
  icon: "🚖",
  scenario: "Bạn đặt Grab từ khách sạn đi sân bay Tân Sơn Nhất.",
  scenarioEn: "You book a Grab from your hotel to Tan Son Nhat Airport.",
  dialogue: [
    { speaker: "You", speakerLabel: "Bạn (gọi tài xế)", vi: "A lô, anh tài xế à? Em đặt Grab.", en: "Hello, are you the driver? I booked a Grab.", literal: "Hello, older-brother driver right? Younger-one book Grab.", keyWords: [{ word: "tài xế", pronunciation: "tài xế", meaning: "driver", tone: "huyen" }] },
    { speaker: "Driver", speakerLabel: "Tài xế", vi: "Vâng anh ơi, anh đang ở đâu vậy?", en: "Yes sir, where are you?", literal: "Yes older-brother hey, older-brother being at where right?" },
    { speaker: "You", speakerLabel: "Bạn", vi: "Em ở sảnh khách sạn Liberty, đường Pasteur. Anh đến đón em được không?", en: "I'm at the Liberty Hotel lobby on Pasteur Street. Can you pick me up?", literal: "Younger-one at lobby hotel Liberty, street Pasteur. Older-brother come pick younger-one okay or-not?", keyWords: [{ word: "sảnh", pronunciation: "sảnh", meaning: "lobby", tone: "hoi" }, { word: "đón", pronunciation: "đón", meaning: "to pick up", tone: "sac" }] },
    { speaker: "Driver", speakerLabel: "Tài xế", vi: "Dạ rõ. Em đến trong vòng năm phút. Anh ra trước cổng nhé.", en: "Got it. I'll be there in five minutes. Wait at the gate please.", literal: "Polite-yes clear. Younger-one arrive in circle five minute. Older-brother out front gate ok." },
    { speaker: "You", speakerLabel: "Bạn", vi: "Ok anh. Xe màu gì biển số bao nhiêu ạ?", en: "Okay. What color is the car, what's the license plate?", literal: "Ok older-brother. Car color what plate number how-much polite?", keyWords: [{ word: "biển số", pronunciation: "biển số", meaning: "license plate", tone: "hoi" }] },
    { speaker: "Driver", speakerLabel: "Tài xế", vi: "Xe Toyota Vios màu trắng, biển 51F – 678.90 anh ạ.", en: "White Toyota Vios, plate 51F – 678.90.", literal: "Car Toyota Vios color white, plate 51F-678.90 older-brother polite." },
    { speaker: "You", speakerLabel: "Bạn (lên xe)", vi: "Chào anh, em đặt đi sân bay Tân Sơn Nhất, ga quốc tế.", en: "Hi, I booked to Tan Son Nhat airport, international terminal.", literal: "Greet older-brother, younger-one book go airport Tan Son Nhat, station international.", keyWords: [{ word: "ga quốc tế", pronunciation: "ga kuốk tế", meaning: "international terminal", tone: "ngang" }] },
    { speaker: "Driver", speakerLabel: "Tài xế", vi: "Vâng. Hành lý anh có nặng không? Để em cốp xe phụ anh.", en: "Right. Is your luggage heavy? Let me help put it in the trunk.", literal: "Yes. Luggage older-brother have heavy or-not? Let younger-one trunk car help older-brother.", keyWords: [{ word: "hành lý", pronunciation: "hành lý", meaning: "luggage", tone: "huyen" }, { word: "cốp xe", pronunciation: "kốp xe", meaning: "trunk", tone: "sac" }] },
    { speaker: "You", speakerLabel: "Bạn", vi: "Cảm ơn anh. Đi qua đường Nam Kỳ Khởi Nghĩa cho nhanh nhé, đường Cách Mạng đang kẹt xe.", en: "Thanks. Take Nam Ky Khoi Nghia Street to save time, Cach Mang is jammed.", literal: "Feel-grace older-brother. Go through street Nam Ky Khoi Nghia for fast right, street Cach Mang being stuck car.", keyWords: [{ word: "kẹt xe", pronunciation: "kẹt xe", meaning: "traffic jam", tone: "nang" }] },
    { speaker: "Driver", speakerLabel: "Tài xế", vi: "Dạ vâng anh. Khoảng hai mươi lăm phút mình tới sân bay.", en: "Sure. About twenty-five minutes to the airport.", literal: "Polite-yes older-brother. About two-ten five minute we arrive airport." },
  ],
  grammarPoints: [
    {
      pattern: "Đi qua [đường] cho nhanh nhé / Đi đường nào nhanh hơn?",
      patternEn: "Route requests: 'Go via [street] to save time' / 'Which road is faster?'",
      explanation: "Trên Grab, bạn có thể đề nghị tuyến đường. Dùng 'cho nhanh', 'cho gần', 'tránh kẹt xe' để chỉ rõ mục đích.",
      explanationEn: "On Grab you may suggest the route. Use 'cho nhanh' (for speed), 'cho gần' (for distance), 'tránh kẹt xe' (avoid traffic).",
      examples: [
        { vi: "Đi đường nhỏ tránh kẹt xe nhé.", en: "Take the small road to avoid traffic.", literal: "Go road small avoid stuck car ok." },
        { vi: "Anh đi đường nào nhanh hơn ạ?", en: "Which route is faster?", literal: "Older-brother go road which fast more polite?" },
        { vi: "Cho em xuống ở ngã tư phía trước.", en: "Drop me at the intersection ahead.", literal: "Give younger-one down at intersection direction front." },
      ],
    },
    {
      pattern: "[Phương tiện] màu [màu], biển số [...]",
      patternEn: "Vehicle ID: '[Car] color [color], plate [...]'",
      explanation: "Cấu trúc chuẩn xác nhận xe. Biển số Việt Nam: 2 chữ số tỉnh + 1 chữ + 4–5 số (ví dụ 51F-67890 = TP.HCM).",
      explanationEn: "Standard structure for vehicle confirmation. Vietnamese plates: 2 province digits + 1 letter + 4–5 numbers (e.g. 51F-67890 = HCMC).",
      examples: [
        { vi: "Xe Honda màu đỏ, biển 29A1-23456.", en: "Red Honda, plate 29A1-23456.", literal: "Car Honda color red, plate 29A1-23456." },
        { vi: "Xe SH màu đen, biển bao nhiêu ạ?", en: "Black SH, what's the plate?", literal: "Car SH color black, plate how-much polite?" },
      ],
    },
  ],
  culturalNotes: [
    {
      title: "Grab vs Be vs Xanh SM",
      titleEn: "Grab vs Be vs Xanh SM",
      content: "Grab (Singapore) phổ biến nhất. Be (Việt) rẻ hơn 5–10%. Xanh SM (VinFast – xe điện) sạch và không mùi xăng. Tất cả đều có ứng dụng tiếng Anh và thanh toán bằng thẻ.",
      contentEn: "Grab (Singapore) is most popular. Be (Vietnamese) is 5–10% cheaper. Xanh SM (VinFast electric cars) is clean and odorless. All have English apps and card payment.",
    },
    {
      title: "An toàn khi đi xe ôm Grab",
      titleEn: "Safety on Grab motorbike",
      content: "Xe ôm Grab (motorbike) RẺ và NHANH hơn xe hơi 40% trong giờ cao điểm. Luôn yêu cầu MŨ BẢO HIỂM ('cho em xin mũ bảo hiểm'), đeo balo về phía trước. Phụ nữ có thể chọn 'GrabBike Lady' để có nữ tài xế.",
      contentEn: "Grab motorbike (xe ôm) is CHEAPER and 40% FASTER than cars in rush hour. ALWAYS ask for a HELMET ('cho em xin mũ bảo hiểm'), wear backpack on the front. Women can choose 'GrabBike Lady' for female drivers.",
    },
    {
      title: "Tip cho tài xế",
      titleEn: "Tipping the driver",
      content: "KHÔNG bắt buộc tip ở Việt Nam, nhưng làm tròn lên (ví dụ trả 100k thay vì 95k) được coi là lịch sự. Lưu ý: trên app Grab, bạn có thể đánh giá 5 sao + tip $1–2 sau chuyến đi.",
      contentEn: "Tipping is NOT required in Vietnam, but rounding up (e.g. pay 100k instead of 95k) is polite. On the Grab app, you can give 5 stars + tip $1–2 after the ride.",
    },
  ],
  practice: {
    type: "reorder",
    instruction: "Sắp xếp các từ thành câu yêu cầu tài xế.",
    instructionEn: "Reorder the words into a request to the driver.",
    items: [
      { question: "đến / Anh / em / đón / được / không?", questionEn: "Can you pick me up?", answer: "Anh đến đón em được không?", explanation: "Cấu trúc: CN + V + tân ngữ + được không?", explanationEn: "Structure: Subject + Verb + Object + được không?" },
      { question: "tránh / Đi / kẹt xe / đường nhỏ / nhé", questionEn: "Take the small road to avoid traffic.", answer: "Đi đường nhỏ tránh kẹt xe nhé.", explanation: "Lệnh + mục đích + 'nhé' (lịch sự).", explanationEn: "Command + purpose + 'nhé' (softening particle)." },
      { question: "Cho / xuống / em / ngã tư / ở / phía trước", questionEn: "Drop me at the intersection ahead.", answer: "Cho em xuống ở ngã tư phía trước.", explanation: "'Cho em xuống ở…' = drop me at…", explanationEn: "'Cho em xuống ở…' = drop me at…" },
    ],
  },
  toneHighlights: [
    { word: "tài xế", pronunciation: "tài xế", meaning: "driver", tone: "huyen" },
    { word: "đón", pronunciation: "đón", meaning: "to pick up", tone: "sac" },
    { word: "kẹt xe", pronunciation: "kẹt xe", meaning: "traffic jam", tone: "nang" },
    { word: "sảnh", pronunciation: "sảnh", meaning: "lobby", tone: "hoi" },
  ],
};

const doctorVisitLesson: DetailedLesson = {
  id: "vff-health-doctor",
  title: "Đi khám bệnh – Mô tả triệu chứng",
  titleEn: "Doctor Visit – Describing Symptoms",
  icon: "🩺",
  scenario: "Bạn bị sốt và đau họng, đến phòng khám quốc tế tại TP.HCM.",
  scenarioEn: "You have a fever and sore throat, visiting an international clinic in HCMC.",
  dialogue: [
    { speaker: "Reception", speakerLabel: "Lễ tân", vi: "Chào anh, anh có hẹn không ạ?", en: "Hello, do you have an appointment?", literal: "Greet older-brother, older-brother have appointment or-not polite?" },
    { speaker: "You", speakerLabel: "Bạn", vi: "Dạ em chưa đặt hẹn. Em bị sốt và đau họng. Em khám được không ạ?", en: "No appointment. I have fever and sore throat. Can I see a doctor?", literal: "Polite-yes younger-one not-yet book appointment. Younger-one suffer fever and pain throat. Younger-one examine okay or-not polite?", keyWords: [{ word: "bị sốt", pronunciation: "bị sốt", meaning: "to have a fever", tone: "nang" }, { word: "đau họng", pronunciation: "đau họng", meaning: "sore throat", tone: "ngang" }] },
    { speaker: "Reception", speakerLabel: "Lễ tân", vi: "Dạ được. Anh điền vào tờ khai này giúp em. Bác sĩ sẽ khám sau khoảng mười lăm phút.", en: "Sure. Please fill in this form. The doctor will see you in about fifteen minutes.", literal: "Polite-yes okay. Older-brother fill into sheet declare this help younger-one. Doctor will examine after about ten-five minute." },
    { speaker: "Doctor", speakerLabel: "Bác sĩ", vi: "Mời anh vào. Anh thấy không khỏe ở đâu?", en: "Please come in. Where do you feel unwell?", literal: "Invite older-brother in. Older-brother feel not well at where?" },
    { speaker: "You", speakerLabel: "Bạn", vi: "Em bị sốt từ hôm qua, khoảng ba mươi tám độ rưỡi. Em đau họng, ho khan và mệt mỏi.", en: "I've had a fever since yesterday, about 38.5°C. Sore throat, dry cough, and fatigue.", literal: "Younger-one suffer fever from yesterday, about three-ten eight degree half. Younger-one pain throat, cough dry and tired tired.", keyWords: [{ word: "độ", pronunciation: "độ", meaning: "degree (°C)", tone: "nang" }, { word: "ho khan", pronunciation: "ho khan", meaning: "dry cough", tone: "ngang" }, { word: "mệt mỏi", pronunciation: "mệt mỏi", meaning: "fatigue", tone: "nang" }] },
    { speaker: "Doctor", speakerLabel: "Bác sĩ", vi: "Anh có khó thở hoặc đau ngực không?", en: "Any shortness of breath or chest pain?", literal: "Older-brother have hard breathe or pain chest or-not?" },
    { speaker: "You", speakerLabel: "Bạn", vi: "Dạ không. Em chỉ thấy ớn lạnh và đau đầu thôi.", en: "No. Just chills and a headache.", literal: "Polite-yes not. Younger-one only feel chill cold and pain head only.", keyWords: [{ word: "ớn lạnh", pronunciation: "ớn lạnh", meaning: "chills", tone: "sac" }, { word: "đau đầu", pronunciation: "đau đầu", meaning: "headache", tone: "ngang" }] },
    { speaker: "Doctor", speakerLabel: "Bác sĩ", vi: "Để bác khám họng và nghe phổi nhé. Anh há miệng to giúp bác.", en: "Let me examine your throat and listen to your lungs. Open wide please.", literal: "Let doctor examine throat and listen lung right. Older-brother open mouth big help doctor.", keyWords: [{ word: "phổi", pronunciation: "phổi", meaning: "lungs", tone: "hoi" }] },
    { speaker: "Doctor", speakerLabel: "Bác sĩ", vi: "Anh bị viêm họng cấp, không phải Covid. Bác kê toa thuốc kháng sinh và hạ sốt. Uống đủ nước và nghỉ ngơi nhiều.", en: "You have acute pharyngitis, not Covid. I'll prescribe antibiotics and fever reducer. Drink plenty of water and rest.", literal: "Older-brother suffer inflame throat acute, not be Covid. Doctor prescribe medicine antibiotic and lower fever. Drink enough water and rest much.", keyWords: [{ word: "viêm họng", pronunciation: "viêm họng", meaning: "throat inflammation", tone: "ngang" }, { word: "kê toa", pronunciation: "kê toa", meaning: "to prescribe", tone: "ngang" }, { word: "kháng sinh", pronunciation: "kháng sinh", meaning: "antibiotics", tone: "sac" }] },
    { speaker: "You", speakerLabel: "Bạn", vi: "Dạ em hiểu. Bác sĩ ơi, em có cần uống thuốc bao lâu ạ? Và có kiêng ăn gì không?", en: "Got it. Doctor, how long do I take the medicine? Any food restrictions?", literal: "Polite-yes younger-one understand. Doctor hey, younger-one have need drink medicine how-long polite? And have abstain eat what or-not?", keyWords: [{ word: "kiêng", pronunciation: "kiêng", meaning: "to abstain from", tone: "ngang" }] },
  ],
  grammarPoints: [
    {
      pattern: "Em bị [bệnh / triệu chứng]",
      patternEn: "Symptom: 'I suffer from [illness/symptom]'",
      explanation: "'Bị' = suffer from (negative experience). KHÔNG dùng 'có' cho bệnh tật. Đúng: 'Em BỊ sốt'. Sai: 'Em CÓ sốt'.",
      explanationEn: "'Bị' = suffer from (negative experience). DO NOT use 'có' for illness. Correct: 'Em BỊ sốt'. Wrong: 'Em CÓ sốt'.",
      examples: [
        { vi: "Em bị đau bụng.", en: "I have stomachache.", literal: "Younger-one suffer pain belly." },
        { vi: "Em bị cảm lạnh.", en: "I caught a cold.", literal: "Younger-one suffer cold cold." },
        { vi: "Anh bị dị ứng hải sản.", en: "I'm allergic to seafood.", literal: "Older-brother suffer allergy seafood." },
      ],
    },
    {
      pattern: "Em đau [bộ phận]",
      patternEn: "Pain: 'I have pain in [body part]'",
      explanation: "'Đau' + bộ phận = bộ phận đó bị đau. Đây là cấu trúc đơn giản nhất – luôn dùng được.",
      explanationEn: "'Đau' + body part = that part hurts. The simplest universal pattern.",
      examples: [
        { vi: "Em đau họng.", en: "Sore throat.", literal: "Younger-one pain throat." },
        { vi: "Em đau đầu.", en: "Headache.", literal: "Younger-one pain head." },
        { vi: "Em đau lưng.", en: "Back pain.", literal: "Younger-one pain back." },
        { vi: "Em đau răng.", en: "Toothache.", literal: "Younger-one pain tooth." },
      ],
    },
  ],
  culturalNotes: [
    {
      title: "Phòng khám quốc tế vs Bệnh viện công",
      titleEn: "International clinic vs Public hospital",
      content: "Phòng khám quốc tế (FV Hospital, Vinmec, Family Medical Practice) đắt 5–10× nhưng có bác sĩ nói tiếng Anh và môi trường sạch. Bệnh viện công (Chợ Rẫy, Bạch Mai) RẺ nhưng đông và bác sĩ thường không nói tiếng Anh tốt.",
      contentEn: "International clinics (FV Hospital, Vinmec, Family Medical Practice) cost 5–10× more but have English-speaking doctors and clean facilities. Public hospitals (Chợ Rẫy, Bạch Mai) are CHEAP but crowded with limited English.",
    },
    {
      title: "Xưng hô với bác sĩ",
      titleEn: "Addressing the doctor",
      content: "Gọi bác sĩ là 'bác sĩ' (chính thức) hoặc 'bác' (thân mật, lịch sự). KHÔNG gọi tên riêng. Bác sĩ trẻ vẫn có thể tự xưng 'bác' để giữ vai trò chuyên môn.",
      contentEn: "Address doctors as 'bác sĩ' (formal) or 'bác' (warm but polite). NEVER use first names. Even young doctors may refer to themselves as 'bác' to maintain professional authority.",
    },
    {
      title: "Đơn thuốc & nhà thuốc",
      titleEn: "Prescriptions & pharmacies",
      content: "Đơn thuốc tiếng Việt thường viết bằng tên thương mại. Nhà thuốc Pharmacy (Pharmacity, Long Châu, An Khang) bán cả thuốc kê toa và không kê toa. Mang đơn thuốc + CMND/Passport khi mua kháng sinh.",
      contentEn: "Vietnamese prescriptions usually list brand names. Pharmacies (Pharmacity, Long Châu, An Khang) sell both Rx and OTC drugs. Bring prescription + ID/Passport for antibiotics.",
    },
  ],
  practice: {
    type: "match",
    instruction: "Ghép triệu chứng tiếng Việt với nghĩa tiếng Anh.",
    instructionEn: "Match the Vietnamese symptom to its English meaning.",
    items: [
      { question: "Em bị sốt", questionEn: "match", answer: "I have a fever", explanation: "'Sốt' = fever (luôn đi với 'bị').", explanationEn: "'Sốt' = fever (always with 'bị')." },
      { question: "Em ho khan", questionEn: "match", answer: "I have a dry cough", explanation: "'Ho khan' = dry cough (vs 'ho có đờm' = wet cough).", explanationEn: "'Ho khan' = dry cough (vs 'ho có đờm' = wet cough)." },
      { question: "Em bị dị ứng", questionEn: "match", answer: "I have an allergy", explanation: "'Dị ứng' = allergy. 'Dị ứng hải sản' = seafood allergy.", explanationEn: "'Dị ứng' = allergy. 'Dị ứng hải sản' = seafood allergy." },
      { question: "Em khó thở", questionEn: "match", answer: "I have trouble breathing", explanation: "'Khó thở' = hard to breathe. Cảnh báo nghiêm trọng – cần khám ngay.", explanationEn: "'Khó thở' = trouble breathing. SERIOUS warning sign — seek care immediately." },
    ],
  },
  toneHighlights: [
    { word: "bị sốt", pronunciation: "bị sốt", meaning: "to have a fever", tone: "nang" },
    { word: "ho khan", pronunciation: "ho khan", meaning: "dry cough", tone: "ngang" },
    { word: "kháng sinh", pronunciation: "kháng sinh", meaning: "antibiotic", tone: "sac" },
    { word: "phổi", pronunciation: "phổi", meaning: "lungs", tone: "hoi" },
  ],
};

/* ════════════════════════════════════════════════════════════════════════════
 * Inject vào module phù hợp. Tạo module mới "Survival in Vietnam" gom 3 bài.
 * ════════════════════════════════════════════════════════════════════════════ */
const survivalModule: DetailedModule = {
  id: "vff-survival-v9",
  title: "Sống sót ở Việt Nam – Tình huống thực tế",
  titleEn: "Survival in Vietnam – Real-life Scenarios",
  icon: "🧳",
  color: "from-amber-500 to-orange-600",
  description: "Ba tình huống bắt buộc: chợ truyền thống, Grab và phòng khám.",
  descriptionEn: "Three must-know scenarios: wet market, Grab rides and doctor visits.",
  lessons: [wetMarketLesson, grabTaxiLesson, doctorVisitLesson],
};

detailedVFFModules.push(survivalModule);

export const detailedVFFExpansionV9Count = survivalModule.lessons.length;
