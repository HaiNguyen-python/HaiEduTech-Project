/**
 * @file cambridgeKidsVocabKetExpansion.ts
 * @description Large KET (A2 Key) vocabulary expansion for the Cambridge YLE bank.
 */
import type { CambridgeKidsLevel, CambridgeKidsWord } from "./cambridgeKidsVocab";

type W = Required<Pick<CambridgeKidsWord, "word" | "vi" | "emoji" | "level" | "example" | "exampleVi">>;
const k = (word: string, vi: string, emoji: string, example: string, exampleVi: string): W =>
  ({ word, vi, emoji, level: "KET" as CambridgeKidsLevel, example, exampleVi });

export const CAMBRIDGE_KIDS_WORDS_KET_EXPANSION: W[] = [
  // Travel & Transport
  k("passport", "hộ chiếu", "🛂", "Don't forget your passport.", "Đừng quên hộ chiếu của bạn."),
  k("luggage", "hành lý", "🧳", "My luggage is very heavy.", "Hành lý của tôi rất nặng."),
  k("departure", "khởi hành", "🛫", "The departure is at 9am.", "Giờ khởi hành là 9 giờ sáng."),
  k("arrival", "đến nơi", "🛬", "Check the arrival time.", "Kiểm tra giờ đến nơi."),
  k("platform", "sân ga", "🚉", "The train leaves from platform 3.", "Tàu rời sân ga số 3."),
  k("schedule", "lịch trình", "📅", "Check the bus schedule.", "Kiểm tra lịch xe buýt."),
  k("traffic", "giao thông", "🚦", "There is a lot of traffic today.", "Hôm nay giao thông rất đông."),
  k("journey", "chuyến đi", "🗺️", "Have a safe journey!", "Chúc bạn chuyến đi an toàn!"),
  k("tourist", "du khách", "📸", "Many tourists visit Hanoi.", "Nhiều du khách đến thăm Hà Nội."),
  k("destination", "điểm đến", "📍", "Paris is a popular destination.", "Paris là điểm đến phổ biến."),

  // Shopping & Money
  k("receipt", "biên lai", "🧾", "Please keep your receipt.", "Vui lòng giữ biên lai."),
  k("discount", "giảm giá", "🏷️", "There's a 20% discount today.", "Hôm nay giảm giá 20%."),
  k("expensive", "đắt", "💸", "This watch is too expensive.", "Chiếc đồng hồ này quá đắt."),
  k("cheap", "rẻ", "💰", "The market is cheap.", "Chợ này rẻ."),
  k("customer", "khách hàng", "🛍️", "The customer is always right.", "Khách hàng luôn đúng."),
  k("currency", "tiền tệ", "💱", "What currency do they use?", "Họ dùng tiền tệ gì?"),
  k("refund", "hoàn tiền", "↩️", "Can I get a refund?", "Tôi có thể được hoàn tiền không?"),
  k("payment", "thanh toán", "💳", "Cash payment only.", "Chỉ thanh toán tiền mặt."),
  k("bargain", "món hời", "🤝", "This jacket is a real bargain.", "Chiếc áo này thật là món hời."),
  k("budget", "ngân sách", "📊", "Stay within your budget.", "Hãy chi tiêu trong ngân sách."),

  // Work & Study
  k("appointment", "cuộc hẹn", "📅", "I have a doctor appointment.", "Tôi có cuộc hẹn với bác sĩ."),
  k("meeting", "cuộc họp", "💼", "The meeting starts at 10.", "Cuộc họp bắt đầu lúc 10 giờ."),
  k("colleague", "đồng nghiệp", "👥", "She is my colleague.", "Cô ấy là đồng nghiệp của tôi."),
  k("interview", "phỏng vấn", "🎤", "I have a job interview tomorrow.", "Mai tôi có phỏng vấn xin việc."),
  k("career", "sự nghiệp", "📈", "She has a successful career.", "Cô ấy có sự nghiệp thành công."),
  k("salary", "lương", "💵", "He earns a good salary.", "Anh ấy có lương tốt."),
  k("uniform", "đồng phục", "👕", "Students wear a uniform.", "Học sinh mặc đồng phục."),
  k("homework", "bài tập về nhà", "📝", "Finish your homework first.", "Làm bài tập về nhà trước đã."),
  k("certificate", "chứng chỉ", "📜", "I got my English certificate.", "Tôi đã có chứng chỉ tiếng Anh."),
  k("project", "dự án", "📁", "We finished the project on time.", "Chúng tôi hoàn thành dự án đúng hạn."),

  // Communication
  k("message", "tin nhắn", "💬", "I sent her a message.", "Tôi đã gửi cho cô ấy tin nhắn."),
  k("conversation", "cuộc trò chuyện", "🗣️", "We had a long conversation.", "Chúng tôi đã có cuộc trò chuyện dài."),
  k("announce", "thông báo", "📢", "They will announce the winner.", "Họ sẽ thông báo người thắng."),
  k("explain", "giải thích", "💡", "Can you explain this word?", "Bạn có thể giải thích từ này không?"),
  k("discuss", "thảo luận", "💭", "Let's discuss the plan.", "Hãy thảo luận về kế hoạch."),
  k("suggest", "đề nghị", "👉", "I suggest going early.", "Tôi đề nghị đi sớm."),
  k("recommend", "giới thiệu", "👍", "I recommend this book.", "Tôi giới thiệu cuốn sách này."),
  k("complain", "phàn nàn", "😤", "Don't complain so much.", "Đừng phàn nàn nhiều thế."),
  k("apologise", "xin lỗi", "🙇", "I want to apologise for being late.", "Tôi muốn xin lỗi vì đến muộn."),
  k("invite", "mời", "✉️", "I will invite all my friends.", "Tôi sẽ mời tất cả bạn bè."),

  // Daily life & Home
  k("furniture", "đồ nội thất", "🛋️", "We bought new furniture.", "Chúng tôi đã mua đồ nội thất mới."),
  k("cushion", "đệm", "🛏️", "Put a cushion on the chair.", "Đặt một chiếc đệm lên ghế."),
  k("curtain", "rèm cửa", "🪟", "Please close the curtain.", "Vui lòng đóng rèm cửa."),
  k("balcony", "ban công", "🏡", "We have flowers on the balcony.", "Chúng tôi trồng hoa trên ban công."),
  k("ceiling", "trần nhà", "🏠", "The ceiling is very high.", "Trần nhà rất cao."),
  k("electricity", "điện", "⚡", "There is no electricity.", "Không có điện."),
  k("rubbish", "rác", "🗑️", "Take out the rubbish.", "Đem rác đi đổ."),
  k("repair", "sửa chữa", "🔧", "I need to repair my bike.", "Tôi cần sửa xe đạp."),
  k("equipment", "thiết bị", "🛠️", "We have new sports equipment.", "Chúng tôi có thiết bị thể thao mới."),
  k("instrument", "nhạc cụ", "🎻", "The violin is my favourite instrument.", "Violin là nhạc cụ yêu thích của tôi."),

  // Free time & Hobbies
  k("hobby", "sở thích", "🎨", "Reading is my hobby.", "Đọc sách là sở thích của tôi."),
  k("activity", "hoạt động", "🏃", "Swimming is a fun activity.", "Bơi là hoạt động vui."),
  k("competition", "cuộc thi", "🏆", "She won the competition.", "Cô ấy đã thắng cuộc thi."),
  k("audience", "khán giả", "👏", "The audience clapped loudly.", "Khán giả vỗ tay lớn."),
  k("performance", "buổi biểu diễn", "🎭", "The performance was amazing.", "Buổi biểu diễn rất tuyệt vời."),
  k("celebrate", "ăn mừng", "🎉", "We celebrate Tet at home.", "Chúng tôi ăn mừng Tết ở nhà."),
  k("festival", "lễ hội", "🎊", "The music festival is in July.", "Lễ hội âm nhạc vào tháng 7."),
  k("hiking", "đi bộ đường dài", "🥾", "We went hiking last weekend.", "Cuối tuần trước chúng tôi đi hiking."),
  k("camping", "cắm trại", "⛺", "Camping is so much fun.", "Cắm trại rất vui."),
  k("photograph", "bức ảnh", "📷", "I took a photograph of the lake.", "Tôi đã chụp ảnh hồ."),

  // Feelings & Personality
  k("nervous", "lo lắng", "😰", "I feel nervous before exams.", "Tôi cảm thấy lo lắng trước kỳ thi."),
  k("confident", "tự tin", "💪", "She is confident on stage.", "Cô ấy tự tin trên sân khấu."),
  k("polite", "lịch sự", "🙇", "Always be polite to others.", "Hãy luôn lịch sự với người khác."),
  k("patient", "kiên nhẫn", "🧘", "Be patient and try again.", "Hãy kiên nhẫn và thử lại."),
  k("generous", "hào phóng", "🎁", "My uncle is very generous.", "Chú tôi rất hào phóng."),
  k("honest", "trung thực", "🤝", "Honest people are trusted.", "Người trung thực được tin tưởng."),
  k("lazy", "lười biếng", "😴", "Don't be lazy in the morning.", "Đừng lười biếng vào buổi sáng."),
  k("serious", "nghiêm túc", "🤔", "He is serious about studying.", "Anh ấy nghiêm túc trong việc học."),
  k("cheerful", "vui vẻ", "😄", "She is always cheerful.", "Cô ấy luôn vui vẻ."),
  k("worried", "lo lắng", "😟", "Mom is worried about me.", "Mẹ lo lắng cho tôi."),

  // Health & Body
  k("medicine", "thuốc", "💊", "Take this medicine twice a day.", "Uống thuốc này hai lần một ngày."),
  k("temperature", "nhiệt độ", "🌡️", "Check your temperature.", "Kiểm tra nhiệt độ của bạn."),
  k("headache", "đau đầu", "🤕", "I have a bad headache.", "Tôi bị đau đầu nặng."),
  k("toothache", "đau răng", "🦷", "Sugar can cause toothache.", "Đường có thể gây đau răng."),
  k("exercise", "tập thể dục", "🏋️", "Exercise every day for health.", "Tập thể dục mỗi ngày cho sức khỏe."),
  k("dentist", "nha sĩ", "🦷", "Visit the dentist twice a year.", "Đi khám nha sĩ hai lần một năm."),
  k("vegetable", "rau", "🥦", "Eat more vegetables.", "Ăn nhiều rau hơn."),
  k("ingredient", "nguyên liệu", "🥕", "Sugar is the main ingredient.", "Đường là nguyên liệu chính."),
  k("vitamin", "vitamin", "🍊", "Oranges have vitamin C.", "Cam có vitamin C."),
  k("relax", "thư giãn", "🧘‍♀️", "Music helps me relax.", "Âm nhạc giúp tôi thư giãn."),

  // Technology & Media
  k("website", "trang web", "🌐", "Visit our school website.", "Hãy ghé trang web của trường."),
  k("download", "tải xuống", "⬇️", "Download the app for free.", "Tải ứng dụng miễn phí."),
  k("upload", "tải lên", "⬆️", "Upload your photos here.", "Tải ảnh của bạn lên đây."),
  k("password", "mật khẩu", "🔒", "Don't share your password.", "Đừng chia sẻ mật khẩu."),
  k("battery", "pin", "🔋", "My phone battery is low.", "Pin điện thoại tôi yếu."),
  k("screen", "màn hình", "📱", "Clean your screen daily.", "Lau màn hình hàng ngày."),
  k("software", "phần mềm", "💻", "Update the software now.", "Cập nhật phần mềm ngay."),
  k("channel", "kênh", "📺", "What channel is the news on?", "Tin tức ở kênh nào?"),
  k("broadcast", "phát sóng", "📡", "The match was broadcast live.", "Trận đấu được phát sóng trực tiếp."),
  k("article", "bài báo", "📰", "I read an interesting article.", "Tôi đã đọc một bài báo thú vị."),
];
