/**
 * VFF Listening Lab bank - dialogues with transcript, translation, gap-fill.
 */
export interface ListeningExercise {
  id: string;
  level: "A1" | "A2" | "B1";
  title: string;
  titleEn: string;
  scenario: string;
  lines: { speaker: string; vi: string; en: string }[];
  gapFill: { sentence: string; answer: string; hint: string }[];
  comprehension: { q: string; options: string[]; answer: number }[];
}

export const vffListeningBank: ListeningExercise[] = [
  {
    id: "l-a1-01",
    level: "A1",
    title: "Chào hỏi ở lễ tân",
    titleEn: "Reception greeting",
    scenario: "Foreigner checks in at hotel reception.",
    lines: [
      { speaker: "Reception", vi: "Xin chào! Anh cần gì ạ?", en: "Hello! How can I help you?" },
      { speaker: "Guest", vi: "Tôi đã đặt phòng tên là John.", en: "I booked a room under John." },
      { speaker: "Reception", vi: "Vâng, phòng 305, tầng 3.", en: "Yes, room 305, 3rd floor." },
      { speaker: "Guest", vi: "Cảm ơn. Mấy giờ có bữa sáng?", en: "Thank you. When is breakfast?" },
      { speaker: "Reception", vi: "Từ 6 giờ đến 10 giờ sáng ạ.", en: "From 6 to 10 am." },
    ],
    gapFill: [
      { sentence: "Tôi đã đặt phòng tên là ___.", answer: "John", hint: "Guest's name" },
      { sentence: "Phòng 305, tầng ___.", answer: "3", hint: "floor number" },
    ],
    comprehension: [
      { q: "Room number?", options: ["305", "503", "350"], answer: 0 },
      { q: "Breakfast until?", options: ["9 am", "10 am", "11 am"], answer: 1 },
    ],
  },
  {
    id: "l-a2-01",
    level: "A2",
    title: "Đặt bàn nhà hàng",
    titleEn: "Restaurant reservation",
    scenario: "Guest calls to book a table.",
    lines: [
      { speaker: "Restaurant", vi: "Nhà hàng Sen xin nghe.", en: "Sen Restaurant, hello." },
      { speaker: "Guest", vi: "Cho tôi đặt bàn cho 4 người tối nay.", en: "I want to book a table for 4 tonight." },
      { speaker: "Restaurant", vi: "Mấy giờ ạ?", en: "What time?" },
      { speaker: "Guest", vi: "7 giờ rưỡi. Cho bàn gần cửa sổ được không?", en: "7:30. Near the window if possible?" },
      { speaker: "Restaurant", vi: "Dạ được. Tên anh ạ?", en: "Sure. Your name?" },
      { speaker: "Guest", vi: "Tên Michael, số điện thoại 0912...", en: "Michael, phone 0912..." },
    ],
    gapFill: [
      { sentence: "Đặt bàn cho ___ người tối nay.", answer: "4", hint: "number of guests" },
      { sentence: "Giờ đặt: ___ rưỡi.", answer: "7", hint: "hour" },
    ],
    comprehension: [
      { q: "How many guests?", options: ["3", "4", "7"], answer: 1 },
      { q: "Requested seat?", options: ["Terrace", "Near window", "Private room"], answer: 1 },
    ],
  },
  {
    id: "l-a2-02",
    level: "A2",
    title: "Chỉ đường đến bảo tàng",
    titleEn: "Directions to museum",
    scenario: "Tourist asks a local.",
    lines: [
      { speaker: "Tourist", vi: "Cho hỏi bảo tàng Chứng tích ở đâu?", en: "Where is the War Remnants Museum?" },
      { speaker: "Local", vi: "Đi thẳng đường này khoảng 300 mét.", en: "Go straight about 300m." },
      { speaker: "Local", vi: "Tới ngã tư thứ hai rẽ phải.", en: "At the 2nd intersection turn right." },
      { speaker: "Tourist", vi: "Xa không ạ?", en: "Is it far?" },
      { speaker: "Local", vi: "Đi bộ khoảng 10 phút.", en: "About 10-minute walk." },
    ],
    gapFill: [
      { sentence: "Đi thẳng khoảng ___ mét.", answer: "300", hint: "meters" },
      { sentence: "Ngã tư thứ hai rẽ ___.", answer: "phải", hint: "left or right" },
    ],
    comprehension: [
      { q: "Walking time?", options: ["5 min", "10 min", "20 min"], answer: 1 },
      { q: "Which intersection to turn?", options: ["1st", "2nd", "3rd"], answer: 1 },
    ],
  },
  {
    id: "l-a2-03",
    level: "A2",
    title: "Đi Grab đến sân bay",
    titleEn: "Grab to airport",
    scenario: "Passenger and Grab driver.",
    lines: [
      { speaker: "Driver", vi: "Anh đi Tân Sơn Nhất phải không?", en: "Going to Tan Son Nhat, right?" },
      { speaker: "You", vi: "Đúng rồi. Bao lâu tới nơi?", en: "Correct. How long to arrive?" },
      { speaker: "Driver", vi: "Khoảng 30 phút, nếu không kẹt xe.", en: "About 30 min if no traffic." },
      { speaker: "You", vi: "Cho tôi dừng ở ga quốc tế nhé.", en: "Drop me at international terminal." },
      { speaker: "Driver", vi: "Dạ, ga T2. Đến rồi anh nhé.", en: "Sure, T2. Here we are." },
    ],
    gapFill: [
      { sentence: "Bao lâu tới ___?", answer: "nơi", hint: "destination" },
      { sentence: "Dừng ở ga ___.", answer: "quốc tế", hint: "international" },
    ],
    comprehension: [
      { q: "Estimated time?", options: ["20 min", "30 min", "45 min"], answer: 1 },
      { q: "Which terminal?", options: ["Domestic", "International", "Cargo"], answer: 1 },
    ],
  },
  {
    id: "l-b1-01",
    level: "B1",
    title: "Phỏng vấn xin việc ngắn",
    titleEn: "Short job interview",
    scenario: "Interview at a startup.",
    lines: [
      { speaker: "HR", vi: "Anh có kinh nghiệm gì trong lĩnh vực marketing?", en: "What marketing experience do you have?" },
      { speaker: "You", vi: "Tôi đã làm marketing 3 năm ở Singapore.", en: "I did marketing for 3 years in Singapore." },
      { speaker: "HR", vi: "Tại sao anh chọn Việt Nam?", en: "Why did you choose Vietnam?" },
      { speaker: "You", vi: "Vì thị trường đang phát triển nhanh và tôi thích văn hóa nơi đây.", en: "Because the market is growing fast and I love the culture." },
      { speaker: "HR", vi: "Anh có thể bắt đầu khi nào?", en: "When can you start?" },
      { speaker: "You", vi: "Đầu tháng sau ạ.", en: "Beginning of next month." },
    ],
    gapFill: [
      { sentence: "Tôi đã làm marketing ___ năm ở Singapore.", answer: "3", hint: "years" },
      { sentence: "Bắt đầu ___ tháng sau.", answer: "đầu", hint: "beginning" },
    ],
    comprehension: [
      { q: "Years of experience?", options: ["2", "3", "5"], answer: 1 },
      { q: "Start date?", options: ["Immediately", "Beginning of next month", "Next year"], answer: 1 },
    ],
  },
  {
    id: "l-b1-02",
    level: "B1",
    title: "Thuê căn hộ",
    titleEn: "Renting an apartment",
    scenario: "Foreigner tours an apartment.",
    lines: [
      { speaker: "Landlord", vi: "Căn hộ này 60 mét vuông, 2 phòng ngủ.", en: "This is 60m², 2 bedrooms." },
      { speaker: "You", vi: "Giá thuê một tháng bao nhiêu?", en: "Monthly rent?" },
      { speaker: "Landlord", vi: "15 triệu, chưa gồm điện nước.", en: "15 million, excluding utilities." },
      { speaker: "You", vi: "Có được nuôi mèo không ạ?", en: "Are cats allowed?" },
      { speaker: "Landlord", vi: "Được, nhưng đặt cọc thêm 2 triệu.", en: "Yes, but extra 2 million deposit." },
      { speaker: "You", vi: "Tôi cần suy nghĩ thêm, mai trả lời được không?", en: "I need to think, can I reply tomorrow?" },
    ],
    gapFill: [
      { sentence: "Căn hộ ___ mét vuông.", answer: "60", hint: "area" },
      { sentence: "Giá thuê ___ triệu.", answer: "15", hint: "million VND" },
    ],
    comprehension: [
      { q: "Apartment size?", options: ["50m²", "60m²", "80m²"], answer: 1 },
      { q: "Pet policy?", options: ["No pets", "Cats OK with extra deposit", "All pets free"], answer: 1 },
    ],
  },
  {
    id: "l-b1-03",
    level: "B1",
    title: "Đặt lịch khám bác sĩ",
    titleEn: "Booking a doctor's appointment",
    scenario: "Phone call to clinic.",
    lines: [
      { speaker: "Clinic", vi: "Phòng khám Vinmec xin nghe.", en: "Vinmec Clinic hello." },
      { speaker: "You", vi: "Tôi muốn đặt lịch khám tổng quát.", en: "I want to book a general check-up." },
      { speaker: "Clinic", vi: "Anh có bảo hiểm không?", en: "Do you have insurance?" },
      { speaker: "You", vi: "Có, bảo hiểm quốc tế Bupa.", en: "Yes, international Bupa." },
      { speaker: "Clinic", vi: "Mai 9 giờ sáng được không anh?", en: "Tomorrow 9am OK?" },
      { speaker: "You", vi: "Dạ được. Cảm ơn chị.", en: "Yes. Thank you." },
    ],
    gapFill: [
      { sentence: "Đặt lịch khám ___ quát.", answer: "tổng", hint: "general" },
      { sentence: "Mai ___ giờ sáng.", answer: "9", hint: "hour" },
    ],
    comprehension: [
      { q: "Type of appointment?", options: ["Dental", "General check-up", "Emergency"], answer: 1 },
      { q: "Time slot?", options: ["8am", "9am", "10am"], answer: 1 },
    ],
  },
  {
    id: "l-b1-04",
    level: "B1",
    title: "Mở tài khoản ngân hàng",
    titleEn: "Opening a bank account",
    scenario: "At a Vietcombank branch.",
    lines: [
      { speaker: "Teller", vi: "Anh cần mở loại tài khoản nào?", en: "What kind of account?" },
      { speaker: "You", vi: "Tài khoản tiết kiệm bằng đô la Mỹ.", en: "USD savings account." },
      { speaker: "Teller", vi: "Cho tôi xin hộ chiếu và thẻ cư trú.", en: "Passport and residence card please." },
      { speaker: "You", vi: "Đây ạ. Lãi suất bao nhiêu %?", en: "Here. What's the interest rate?" },
      { speaker: "Teller", vi: "1,2% một năm cho USD.", en: "1.2% per year for USD." },
      { speaker: "You", vi: "Có phí duy trì tài khoản không?", en: "Any maintenance fee?" },
      { speaker: "Teller", vi: "Miễn phí nếu duy trì trên 500 đô.", en: "Free if balance is over 500 USD." },
    ],
    gapFill: [
      { sentence: "Tài khoản ___ bằng đô la.", answer: "tiết kiệm", hint: "savings" },
      { sentence: "Lãi suất ___ % một năm.", answer: "1,2", hint: "rate" },
    ],
    comprehension: [
      { q: "Currency?", options: ["VND", "USD", "EUR"], answer: 1 },
      { q: "Fee waived if balance is above?", options: ["100 USD", "500 USD", "1000 USD"], answer: 1 },
    ],
  },
];
