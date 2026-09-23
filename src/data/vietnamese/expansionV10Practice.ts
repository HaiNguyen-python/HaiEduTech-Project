/**
 * @file expansionV10Practice.ts
 * @description Đợt 10 mở rộng cho nhóm "Luyện tập & Tương tác": 5 bài học mỗi ngày (61-65)
 * và 4 chủ đề sổ tay giao tiếp thực tế. Song ngữ Việt - Anh.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { DailyMicroLesson } from "./dailyVietnameseData";
import type { PhrasebookCategory } from "./phrasebookData";

/* ── Tiếng Việt mỗi ngày: ngày 61-65 ────────────────────────────────────── */
export const dailyMicroLessonsV10: DailyMicroLesson[] = [
  { day: 61, theme: "Hẹn gặp lại", themeEn: "Making Plans", word: { vi: "hẹn", en: "to make an appointment" }, phrase: { vi: "Mai gặp nhé!", en: "See you tomorrow!" }, sentence: { vi: "Mình hẹn nhau ở quán cà phê lúc bảy giờ nhé.", en: "Let's meet at the coffee shop at seven." }, challenge: "Hẹn gặp một người bạn bằng tiếng Việt.", challengeEn: "Set up a meeting with a friend in Vietnamese." },
  { day: 62, theme: "Nhờ giúp đỡ", themeEn: "Asking for Help", word: { vi: "giúp", en: "to help" }, phrase: { vi: "Bạn giúp mình một việc được không?", en: "Could you help me with something?" }, sentence: { vi: "Bạn giúp mình dịch câu này sang tiếng Việt được không?", en: "Could you help me translate this sentence into Vietnamese?" }, challenge: "Nhờ ai đó giúp một việc nhỏ bằng tiếng Việt.", challengeEn: "Ask someone for a small favour in Vietnamese." },
  { day: 63, theme: "Từ chối lịch sự", themeEn: "Declining Politely", word: { vi: "tiếc", en: "to regret" }, phrase: { vi: "Tiếc quá, lần sau nhé!", en: "What a shame, next time!" }, sentence: { vi: "Tiếc quá, tối nay mình có hẹn rồi, hôm khác nhé.", en: "What a shame, I already have plans tonight - another time." }, challenge: "Tập từ chối một lời mời mà vẫn giữ không khí vui vẻ.", challengeEn: "Practise turning down an invitation while keeping things warm." },
  { day: 64, theme: "Kể lại một ngày", themeEn: "Recounting Your Day", word: { vi: "sau đó", en: "after that" }, phrase: { vi: "Đầu tiên... sau đó... cuối cùng...", en: "First... then... finally..." }, sentence: { vi: "Đầu tiên mình đi chợ, sau đó nấu ăn, cuối cùng đi bộ ở công viên.", en: "First I went to the market, then cooked, and finally walked in the park." }, challenge: "Kể lại ngày hôm nay bằng ba câu có từ nối.", challengeEn: "Recount today in three sentences using connectors." },
  { day: 65, theme: "Nói về tương lai", themeEn: "Talking About the Future", word: { vi: "sẽ", en: "will" }, phrase: { vi: "Mình dự định...", en: "I plan to..." }, sentence: { vi: "Sang năm mình sẽ về Việt Nam và học thêm tiếng Việt.", en: "Next year I will return to Vietnam and study more Vietnamese." }, challenge: "Viết ba mục tiêu tiếng Việt cho ba tháng tới.", challengeEn: "Write three Vietnamese goals for the next three months." },
];

/* ── Sổ tay giao tiếp: 4 chủ đề mới ─────────────────────────────────────── */
export const phrasebookExpansionV10: PhrasebookCategory[] = [
  {
    id: "hospital-visit",
    emoji: "🏥",
    title: "Ở bệnh viện & phòng khám",
    titleEn: "Hospital & Clinic",
    description: "Cụm từ mô tả triệu chứng, hỏi thuốc và làm thủ tục khám.",
    descriptionEn: "Phrases for describing symptoms, asking about medicine and handling admission.",
    phrases: [
      { vi: "Tôi muốn đăng ký khám ạ.", en: "I'd like to register for a check-up.", pronunciation: "toy muon dang ky kham a" },
      { vi: "Tôi bị đau ở đây.", en: "It hurts here.", pronunciation: "toy bi dau o day", note: "Chỉ tay vào vị trí đau / point to the spot" },
      { vi: "Tôi bị sốt và ho hai ngày rồi.", en: "I've had a fever and cough for two days." },
      { vi: "Tôi bị dị ứng thuốc kháng sinh.", en: "I'm allergic to antibiotics." },
      { vi: "Thuốc này uống mấy lần một ngày?", en: "How many times a day do I take this?" },
      { vi: "Uống trước hay sau khi ăn ạ?", en: "Before or after meals?" },
      { vi: "Tôi có cần tái khám không?", en: "Do I need a follow-up visit?" },
      { vi: "Tôi có bảo hiểm y tế.", en: "I have health insurance." },
      { vi: "Cho tôi hoá đơn để đòi bảo hiểm nhé.", en: "Please give me a receipt for my insurance claim." },
      { vi: "Bệnh viện có bác sĩ nói tiếng Anh không?", en: "Does the hospital have an English-speaking doctor?" },
    ],
  },
  {
    id: "bank-admin",
    emoji: "🏦",
    title: "Ngân hàng & thủ tục",
    titleEn: "Bank & Paperwork",
    description: "Mở thẻ, chuyển tiền, đổi tiền và xử lý giấy tờ hành chính.",
    descriptionEn: "Opening an account, transfers, currency exchange and admin paperwork.",
    phrases: [
      { vi: "Tôi muốn mở tài khoản ạ.", en: "I'd like to open an account." },
      { vi: "Cần giấy tờ gì ạ?", en: "What documents do I need?" },
      { vi: "Tôi có hộ chiếu và thẻ tạm trú.", en: "I have my passport and residence card." },
      { vi: "Tôi muốn chuyển tiền ra nước ngoài.", en: "I'd like to make an international transfer." },
      { vi: "Phí chuyển tiền là bao nhiêu?", en: "What is the transfer fee?" },
      { vi: "Tỷ giá hôm nay thế nào ạ?", en: "What's today's exchange rate?" },
      { vi: "Thẻ của tôi bị khoá rồi.", en: "My card has been blocked." },
      { vi: "Tôi muốn đăng ký ngân hàng số.", en: "I'd like to register for online banking." },
      { vi: "Cho tôi xin sao kê ba tháng gần nhất.", en: "Please give me a statement for the last three months." },
      { vi: "Tôi cần bản dịch công chứng.", en: "I need a notarised translation." },
    ],
  },
  {
    id: "renting-home",
    emoji: "🔑",
    title: "Thuê nhà & sửa chữa",
    titleEn: "Renting & Repairs",
    description: "Xem phòng, thương lượng hợp đồng và báo sự cố trong nhà.",
    descriptionEn: "Viewing rooms, negotiating the contract and reporting problems.",
    phrases: [
      { vi: "Phòng này giá bao nhiêu một tháng ạ?", en: "How much is this room per month?" },
      { vi: "Giá đã bao gồm điện nước chưa?", en: "Does the price include utilities?" },
      { vi: "Tôi phải đặt cọc mấy tháng?", en: "How many months' deposit is required?" },
      { vi: "Hợp đồng thuê tối thiểu bao lâu?", en: "What's the minimum lease term?" },
      { vi: "Có được nấu ăn trong phòng không?", en: "Am I allowed to cook in the room?" },
      { vi: "Mấy giờ thì khoá cổng ạ?", en: "What time is the gate locked?" },
      { vi: "Máy nước nóng bị hỏng rồi.", en: "The water heater is broken." },
      { vi: "Điều hoà không lạnh, anh cho người đến sửa giúp em nhé.", en: "The air-conditioner isn't cooling - could you send someone to fix it?" },
      { vi: "Tháng này tiền điện cao bất thường.", en: "This month's electricity bill is unusually high." },
      { vi: "Tôi muốn gia hạn hợp đồng thêm sáu tháng.", en: "I'd like to extend the contract by six months." },
    ],
  },
  {
    id: "travel-trouble",
    emoji: "🧳",
    title: "Sự cố khi đi lại",
    titleEn: "Travel Disruptions",
    description: "Trễ chuyến, mất hành lý, đổi vé và tìm trợ giúp khi đi đường.",
    descriptionEn: "Delays, lost luggage, changing tickets and getting help on the road.",
    phrases: [
      { vi: "Chuyến bay của tôi bị hoãn.", en: "My flight is delayed." },
      { vi: "Tôi bị nhỡ chuyến xe, đổi vé được không ạ?", en: "I missed my bus - can I change the ticket?" },
      { vi: "Hành lý của tôi chưa ra.", en: "My luggage hasn't come out." },
      { vi: "Tôi mất hộ chiếu, tôi phải làm gì ạ?", en: "I lost my passport - what should I do?" },
      { vi: "Cho tôi xin số điện thoại hỗ trợ.", en: "Could I have the support hotline number?" },
      { vi: "Xe bị hỏng giữa đường.", en: "The vehicle broke down on the way." },
      { vi: "Gần đây có chỗ sửa xe không ạ?", en: "Is there a repair shop nearby?" },
      { vi: "Tôi cần đến bệnh viện gần nhất.", en: "I need to get to the nearest hospital." },
      { vi: "Đường này đang tắc, đi đường khác giúp em nhé.", en: "This road is jammed - please take another route." },
      { vi: "Tôi muốn hoàn vé.", en: "I'd like a refund on my ticket." },
    ],
  },
];
