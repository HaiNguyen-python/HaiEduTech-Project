/**
 * @file vffListeningExpansion.ts
 * @description Mở rộng 13 bài nghe cho VFF Listening Lab (A1/A2/B1), id mới không trùng.
 */
import type { ListeningExercise } from "./vffListeningBank";

export const vffListeningExpansion: ListeningExercise[] = [
  {
    id: "l-a1-11",
    level: "A1",
    title: "Mua nước ở cửa hàng tiện lợi",
    titleEn: "Buying a drink at a convenience store",
    scenario: "A foreigner buys water and asks for a bag.",
    lines: [
      { speaker: "Khách", vi: "Chị ơi, nước suối bao nhiêu tiền?", en: "Excuse me, how much is bottled water?" },
      { speaker: "Nhân viên", vi: "Mười nghìn một chai ạ.", en: "Ten thousand dong a bottle." },
      { speaker: "Khách", vi: "Cho tôi hai chai.", en: "Give me two bottles." },
      { speaker: "Nhân viên", vi: "Hai mươi nghìn. Anh cần túi không?", en: "Twenty thousand. Do you need a bag?" },
      { speaker: "Khách", vi: "Không cần, cảm ơn chị.", en: "No need, thank you." },
    ],
    gapFill: [
      { sentence: "Nước suối ___ nghìn một chai.", answer: "mười", hint: "số 10" },
      { sentence: "Cho tôi ___ chai.", answer: "hai", hint: "số 2" },
    ],
    comprehension: [
      { q: "Price per bottle?", options: ["10,000 VND", "20,000 VND", "12,000 VND"], answer: 0 },
      { q: "Does he take a bag?", options: ["Yes", "No", "He buys one"], answer: 1 },
    ],
  },
  {
    id: "l-a1-12",
    level: "A1",
    title: "Gọi món ở quán phở",
    titleEn: "Ordering at a pho shop",
    scenario: "Ordering pho without coriander.",
    lines: [
      { speaker: "Chủ quán", vi: "Em ăn gì?", en: "What would you like to eat?" },
      { speaker: "Khách", vi: "Cho tôi một bát phở bò.", en: "One bowl of beef pho, please." },
      { speaker: "Chủ quán", vi: "Em ăn hành không?", en: "Do you eat spring onion?" },
      { speaker: "Khách", vi: "Không hành, không rau mùi ạ.", en: "No spring onion, no coriander." },
      { speaker: "Chủ quán", vi: "Được, đợi năm phút nhé.", en: "Alright, wait five minutes." },
    ],
    gapFill: [
      { sentence: "Cho tôi một ___ phở bò.", answer: "bát", hint: "đơn vị đếm" },
      { sentence: "Đợi ___ phút nhé.", answer: "năm", hint: "số 5" },
    ],
    comprehension: [
      { q: "What does the guest refuse?", options: ["Spring onion and coriander", "Beef", "Noodles"], answer: 0 },
      { q: "Waiting time?", options: ["Five minutes", "Ten minutes", "Two minutes"], answer: 0 },
    ],
  },
  {
    id: "l-a1-13",
    level: "A1",
    title: "Hỏi đường tới bưu điện",
    titleEn: "Asking the way to the post office",
    scenario: "A pedestrian asks for directions.",
    lines: [
      { speaker: "Khách", vi: "Xin lỗi, bưu điện ở đâu ạ?", en: "Excuse me, where is the post office?" },
      { speaker: "Người dân", vi: "Anh đi thẳng, rồi rẽ phải.", en: "Go straight, then turn right." },
      { speaker: "Khách", vi: "Có xa không ạ?", en: "Is it far?" },
      { speaker: "Người dân", vi: "Khoảng ba trăm mét.", en: "About three hundred metres." },
      { speaker: "Khách", vi: "Cảm ơn anh nhiều.", en: "Thank you very much." },
    ],
    gapFill: [
      { sentence: "Anh đi thẳng rồi rẽ ___.", answer: "phải", hint: "trái hay phải?" },
      { sentence: "Khoảng ___ trăm mét.", answer: "ba", hint: "số 3" },
    ],
    comprehension: [
      { q: "Which direction?", options: ["Turn left", "Turn right", "Go back"], answer: 1 },
      { q: "How far?", options: ["30 m", "300 m", "3 km"], answer: 1 },
    ],
  },
  {
    id: "l-a1-14",
    level: "A1",
    title: "Gọi xe ôm công nghệ",
    titleEn: "Calling a ride-hailing motorbike",
    scenario: "The driver calls to confirm the pickup point.",
    lines: [
      { speaker: "Tài xế", vi: "Em đang ở đâu ạ?", en: "Where are you now?" },
      { speaker: "Khách", vi: "Tôi ở trước cổng trường.", en: "I'm in front of the school gate." },
      { speaker: "Tài xế", vi: "Em mặc áo màu gì?", en: "What colour shirt are you wearing?" },
      { speaker: "Khách", vi: "Áo xanh, có đeo ba lô.", en: "A blue shirt, with a backpack." },
      { speaker: "Tài xế", vi: "Anh tới sau hai phút.", en: "I'll be there in two minutes." },
    ],
    gapFill: [
      { sentence: "Tôi ở trước ___ trường.", answer: "cổng", hint: "cửa lớn của trường" },
      { sentence: "Anh tới sau ___ phút.", answer: "hai", hint: "số 2" },
    ],
    comprehension: [
      { q: "Where is the passenger?", options: ["School gate", "Market", "Hospital"], answer: 0 },
      { q: "Shirt colour?", options: ["Blue", "Red", "White"], answer: 0 },
    ],
  },
  {
    id: "l-a1-15",
    level: "A1",
    title: "Nhận hàng chuyển phát",
    titleEn: "Receiving a delivery",
    scenario: "A courier delivers a parcel with cash on delivery.",
    lines: [
      { speaker: "Shipper", vi: "Chào chị, có đơn hàng ạ.", en: "Hello, there is a parcel for you." },
      { speaker: "Khách", vi: "Bao nhiêu tiền ạ?", en: "How much is it?" },
      { speaker: "Shipper", vi: "Một trăm năm mươi nghìn.", en: "One hundred and fifty thousand." },
      { speaker: "Khách", vi: "Tôi chuyển khoản được không?", en: "Can I transfer by bank?" },
      { speaker: "Shipper", vi: "Được ạ, em có mã QR.", en: "Yes, I have a QR code." },
    ],
    gapFill: [
      { sentence: "Một trăm ___ mươi nghìn.", answer: "năm", hint: "số 5" },
      { sentence: "Tôi ___ khoản được không?", answer: "chuyển", hint: "chuyển tiền qua ngân hàng" },
    ],
    comprehension: [
      { q: "Parcel price?", options: ["150,000 VND", "115,000 VND", "50,000 VND"], answer: 0 },
      { q: "How will she pay?", options: ["Bank transfer", "Cash only", "Card machine"], answer: 0 },
    ],
  },
  {
    id: "l-a2-11",
    level: "A2",
    title: "Đặt phòng khách sạn qua điện thoại",
    titleEn: "Booking a hotel room by phone",
    scenario: "A guest books two nights and asks about breakfast.",
    lines: [
      { speaker: "Lễ tân", vi: "Khách sạn Sen Vàng xin nghe.", en: "Sen Vang Hotel, how can I help?" },
      { speaker: "Khách", vi: "Tôi muốn đặt một phòng đôi hai đêm, từ thứ sáu.", en: "I'd like a double room for two nights, from Friday." },
      { speaker: "Lễ tân", vi: "Phòng đôi tám trăm nghìn một đêm, đã gồm bữa sáng.", en: "A double room is eight hundred thousand a night, breakfast included." },
      { speaker: "Khách", vi: "Có chỗ để xe máy không ạ?", en: "Is there motorbike parking?" },
      { speaker: "Lễ tân", vi: "Có, miễn phí ở tầng hầm. Anh cho tôi số điện thoại nhé.", en: "Yes, free in the basement. May I have your phone number?" },
    ],
    gapFill: [
      { sentence: "Tôi muốn đặt một phòng ___ hai đêm.", answer: "đôi", hint: "phòng cho hai người" },
      { sentence: "Giá đã gồm ___ sáng.", answer: "bữa", hint: "bữa ăn buổi sáng" },
    ],
    comprehension: [
      { q: "Room price per night?", options: ["800,000 VND", "80,000 VND", "1,800,000 VND"], answer: 0 },
      { q: "Parking is?", options: ["Free in the basement", "Paid on the street", "Not available"], answer: 0 },
    ],
  },
  {
    id: "l-a2-12",
    level: "A2",
    title: "Ở hiệu thuốc",
    titleEn: "At the pharmacy",
    scenario: "Buying medicine for a sore throat.",
    lines: [
      { speaker: "Khách", vi: "Tôi bị đau họng và ho ba ngày rồi.", en: "I've had a sore throat and cough for three days." },
      { speaker: "Dược sĩ", vi: "Anh có sốt không?", en: "Do you have a fever?" },
      { speaker: "Khách", vi: "Hôm qua sốt nhẹ, hôm nay hết rồi.", en: "A mild fever yesterday, it's gone today." },
      { speaker: "Dược sĩ", vi: "Anh uống thuốc này ngày hai lần, sau khi ăn.", en: "Take this medicine twice a day, after meals." },
      { speaker: "Khách", vi: "Nếu ba ngày không đỡ thì sao ạ?", en: "What if it doesn't improve in three days?" },
      { speaker: "Dược sĩ", vi: "Thì anh nên đi khám bác sĩ.", en: "Then you should see a doctor." },
    ],
    gapFill: [
      { sentence: "Uống thuốc ngày ___ lần.", answer: "hai", hint: "số 2" },
      { sentence: "Uống ___ khi ăn.", answer: "sau", hint: "trước hay sau?" },
    ],
    comprehension: [
      { q: "How long has he been ill?", options: ["Three days", "One week", "Two days"], answer: 0 },
      { q: "When to take the medicine?", options: ["After meals", "Before meals", "At bedtime only"], answer: 0 },
    ],
  },
  {
    id: "l-a2-13",
    level: "A2",
    title: "Xem nhà cho thuê",
    titleEn: "Viewing a rental house",
    scenario: "Negotiating rent and deposit.",
    lines: [
      { speaker: "Chủ nhà", vi: "Phòng này hai mươi mét vuông, có ban công.", en: "This room is twenty square metres with a balcony." },
      { speaker: "Khách", vi: "Giá thuê bao nhiêu một tháng ạ?", en: "How much is the rent per month?" },
      { speaker: "Chủ nhà", vi: "Năm triệu, chưa tính điện nước.", en: "Five million, not including electricity and water." },
      { speaker: "Khách", vi: "Tiền cọc mấy tháng?", en: "How many months' deposit?" },
      { speaker: "Chủ nhà", vi: "Cọc một tháng, hợp đồng sáu tháng.", en: "One month's deposit, a six-month contract." },
      { speaker: "Khách", vi: "Tôi suy nghĩ rồi trả lời chị mai nhé.", en: "I'll think about it and answer you tomorrow." },
    ],
    gapFill: [
      { sentence: "Giá thuê ___ triệu một tháng.", answer: "năm", hint: "số 5" },
      { sentence: "Tiền ___ một tháng.", answer: "cọc", hint: "tiền đặt trước" },
    ],
    comprehension: [
      { q: "Does the rent include utilities?", options: ["No", "Yes", "Only water"], answer: 0 },
      { q: "Contract length?", options: ["Six months", "One year", "Three months"], answer: 0 },
    ],
  },
  {
    id: "l-a2-14",
    level: "A2",
    title: "Hẹn gặp đồng nghiệp",
    titleEn: "Arranging a meeting with a colleague",
    scenario: "Rescheduling a work meeting.",
    lines: [
      { speaker: "Lan", vi: "Chiều nay ba giờ mình họp nhé?", en: "Shall we meet at three this afternoon?" },
      { speaker: "Nam", vi: "Ba giờ mình có lớp, bốn giờ được không?", en: "At three I have a class, is four okay?" },
      { speaker: "Lan", vi: "Được. Mình họp online hay ở văn phòng?", en: "Fine. Shall we meet online or at the office?" },
      { speaker: "Nam", vi: "Online đi, mình gửi link trước mười lăm phút.", en: "Online, I'll send the link fifteen minutes before." },
      { speaker: "Lan", vi: "Ok, mình chuẩn bị báo cáo tháng.", en: "Okay, I'll prepare the monthly report." },
    ],
    gapFill: [
      { sentence: "Cuối cùng hai người họp lúc ___ giờ.", answer: "bốn", hint: "số 4" },
      { sentence: "Gửi link trước ___ lăm phút.", answer: "mười", hint: "15 phút" },
    ],
    comprehension: [
      { q: "Final meeting time?", options: ["3 pm", "4 pm", "5 pm"], answer: 1 },
      { q: "Meeting format?", options: ["Online", "At the office", "By phone"], answer: 0 },
    ],
  },
  {
    id: "l-a2-15",
    level: "A2",
    title: "Sự cố ở sân bay",
    titleEn: "A problem at the airport",
    scenario: "A delayed flight and a missing suitcase.",
    lines: [
      { speaker: "Khách", vi: "Chuyến bay của tôi bị hoãn bao lâu ạ?", en: "How long is my flight delayed?" },
      { speaker: "Nhân viên", vi: "Hoãn hai tiếng, khởi hành lúc mười giờ.", en: "Delayed two hours, departing at ten." },
      { speaker: "Khách", vi: "Tôi có một vali chưa thấy ở băng chuyền.", en: "I have a suitcase that hasn't appeared on the belt." },
      { speaker: "Nhân viên", vi: "Anh cho tôi xem thẻ hành lý.", en: "Please show me your baggage tag." },
      { speaker: "Khách", vi: "Đây ạ. Vali màu đen, có dây đỏ.", en: "Here it is. A black suitcase with a red strap." },
      { speaker: "Nhân viên", vi: "Chúng tôi sẽ gọi cho anh trong hôm nay.", en: "We will call you today." },
    ],
    gapFill: [
      { sentence: "Chuyến bay hoãn ___ tiếng.", answer: "hai", hint: "số 2" },
      { sentence: "Vali màu đen, có dây ___.", answer: "đỏ", hint: "màu" },
    ],
    comprehension: [
      { q: "New departure time?", options: ["Ten o'clock", "Eight o'clock", "Twelve o'clock"], answer: 0 },
      { q: "What is missing?", options: ["A suitcase", "A passport", "A ticket"], answer: 0 },
    ],
  },
  {
    id: "l-b1-11",
    level: "B1",
    title: "Phỏng vấn xin việc",
    titleEn: "A job interview",
    scenario: "A candidate answers questions about experience and salary.",
    lines: [
      { speaker: "Nhà tuyển dụng", vi: "Anh giới thiệu ngắn về kinh nghiệm của mình nhé.", en: "Please introduce your experience briefly." },
      { speaker: "Ứng viên", vi: "Tôi có ba năm làm marketing cho một công ty du lịch, phụ trách nội dung và quảng cáo.", en: "I have three years in marketing for a travel company, in charge of content and advertising." },
      { speaker: "Nhà tuyển dụng", vi: "Vì sao anh muốn chuyển sang công ty chúng tôi?", en: "Why do you want to move to our company?" },
      { speaker: "Ứng viên", vi: "Tôi muốn làm việc với thị trường nước ngoài và học thêm về dữ liệu.", en: "I want to work with foreign markets and learn more about data." },
      { speaker: "Nhà tuyển dụng", vi: "Mức lương anh mong muốn là bao nhiêu?", en: "What salary do you expect?" },
      { speaker: "Ứng viên", vi: "Tôi đề xuất từ mười tám đến hai mươi triệu, tuỳ phúc lợi.", en: "I propose eighteen to twenty million, depending on benefits." },
    ],
    gapFill: [
      { sentence: "Tôi có ___ năm làm marketing.", answer: "ba", hint: "số 3" },
      { sentence: "Mức lương từ mười tám đến ___ mươi triệu.", answer: "hai", hint: "20 triệu" },
    ],
    comprehension: [
      { q: "His field is?", options: ["Marketing", "Accounting", "Engineering"], answer: 0 },
      { q: "Why does he want to move?", options: ["Foreign markets and data skills", "Shorter hours", "Closer to home"], answer: 0 },
    ],
  },
  {
    id: "l-b1-12",
    level: "B1",
    title: "Khiếu nại hoá đơn",
    titleEn: "Complaining about a bill",
    scenario: "A customer disputes an extra charge at a restaurant.",
    lines: [
      { speaker: "Khách", vi: "Chị kiểm tra lại hoá đơn giúp tôi, tôi không gọi món tráng miệng.", en: "Please check my bill again, I did not order dessert." },
      { speaker: "Quản lý", vi: "Anh đợi tôi xem lại phiếu gọi món.", en: "Please wait while I check the order slip." },
      { speaker: "Khách", vi: "Ngoài ra phí phục vụ mười phần trăm có ghi ở đâu không?", en: "Besides, is the ten percent service charge stated anywhere?" },
      { speaker: "Quản lý", vi: "Có ghi ở cuối thực đơn, nhưng chữ hơi nhỏ.", en: "It is stated at the end of the menu, but the print is small." },
      { speaker: "Khách", vi: "Tôi đồng ý trả phí phục vụ, nhưng xin bỏ món tráng miệng.", en: "I agree to pay the service charge, but please remove the dessert." },
      { speaker: "Quản lý", vi: "Tôi đã sửa hoá đơn và xin lỗi anh vì sai sót.", en: "I have corrected the bill and apologise for the mistake." },
    ],
    gapFill: [
      { sentence: "Tôi không gọi món ___ miệng.", answer: "tráng", hint: "món ăn cuối bữa" },
      { sentence: "Phí ___ mười phần trăm.", answer: "phục vụ", hint: "service charge" },
    ],
    comprehension: [
      { q: "What was wrongly charged?", options: ["A dessert", "A drink", "Parking"], answer: 0 },
      { q: "Where is the service charge stated?", options: ["End of the menu", "On the door", "Nowhere"], answer: 0 },
    ],
  },
  {
    id: "l-b1-13",
    level: "B1",
    title: "Thảo luận kế hoạch du lịch",
    titleEn: "Discussing a travel plan",
    scenario: "Two friends compare Da Lat and Da Nang for a short holiday.",
    lines: [
      { speaker: "Huy", vi: "Nghỉ lễ mình đi Đà Lạt hay Đà Nẵng?", en: "For the holiday should we go to Da Lat or Da Nang?" },
      { speaker: "Mai", vi: "Đà Lạt mát nhưng dịp lễ đông và giá phòng tăng gấp đôi.", en: "Da Lat is cool but crowded on holidays and room prices double." },
      { speaker: "Huy", vi: "Đà Nẵng thì có biển, lại dễ đi từ sân bay.", en: "Da Nang has the beach and is easy to reach from the airport." },
      { speaker: "Mai", vi: "Nếu đi Đà Nẵng, mình nên đặt vé sớm để rẻ hơn.", en: "If we go to Da Nang, we should book tickets early to get them cheaper." },
      { speaker: "Huy", vi: "Vậy mình chốt Đà Nẵng, ba ngày hai đêm nhé.", en: "So let's settle on Da Nang, three days and two nights." },
      { speaker: "Mai", vi: "Đồng ý. Mình lo vé, bạn tìm khách sạn gần biển.", en: "Agreed. I'll handle tickets, you find a hotel near the beach." },
    ],
    gapFill: [
      { sentence: "Dịp lễ giá phòng Đà Lạt tăng ___ đôi.", answer: "gấp", hint: "gấp 2 lần" },
      { sentence: "Chuyến đi ___ ngày hai đêm.", answer: "ba", hint: "số 3" },
    ],
    comprehension: [
      { q: "Final destination?", options: ["Da Nang", "Da Lat", "Hue"], answer: 0 },
      { q: "Who books the tickets?", options: ["Mai", "Huy", "A travel agent"], answer: 0 },
    ],
  },
];
