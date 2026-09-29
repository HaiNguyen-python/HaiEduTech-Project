// Extra depth for every Vietnamese interactive lesson: one more situation, more vocabulary, one more structure, more quiz items.
import type { VnSituation, VnVocab, VnStructure, VnQuiz } from "./vietnameseConversationalCurriculum";

type Supp = { situation: VnSituation; vocabulary: VnVocab[]; structure: VnStructure; quiz: VnQuiz[] };
const d = (speaker: string, line: string, en: string) => ({ speaker, line, en });
const v = (vi: string, en: string, example: string, exampleEn: string) => ({ vi, en, example, exampleEn });

export const vietnameseLessonSupplements: Record<string, Supp> = {
  "vn-dl-01-greetings": {
    situation: { title: "Saying Goodbye", description: "Ending a conversation politely.", culturalNote: "'Hẹn gặp lại' is friendly; to elders add 'ạ' and use 'cháu xin phép'.", dialogue: [
      d("Lan", "Muộn rồi, em xin phép về trước ạ.", "It's late, may I leave first."), d("Minh", "Ừ, em về cẩn thận nhé.", "OK, get home safely."), d("Lan", "Dạ, hẹn gặp lại anh.", "See you again."), d("Minh", "Tạm biệt em.", "Goodbye.") ] },
    vocabulary: [v("tạm biệt", "goodbye", "Tạm biệt cả nhà.", "Goodbye everyone."), v("hẹn gặp lại", "see you again", "Hẹn gặp lại vào thứ Hai.", "See you on Monday."), v("xin phép", "to ask permission", "Em xin phép vào lớp.", "May I come in?"), v("cẩn thận", "carefully", "Đi cẩn thận nhé.", "Take care.")],
    structure: { pattern: "[Subject] + xin phép + [verb]", explanation: "Politely ask to do something.", examples: [{ vi: "Cháu xin phép đi trước.", en: "Excuse me, I'll go first." }] },
    quiz: [{ q: "'Hẹn gặp lại' means...", options: ["Hello", "See you again", "Sorry", "Thanks"], answer: 1 }, { q: "'Xin phép' is used to...", options: ["Ask permission", "Complain", "Order food", "Count"], answer: 0 }],
  },
  "vn-dl-02-food": {
    situation: { title: "Street Food Stall", description: "Buying bánh mì on the street.", dialogue: [
      d("Khách", "Cô ơi, bán cho cháu một ổ bánh mì thịt.", "One pork banh mi, please."), d("Người bán", "Có ăn rau thơm không cháu?", "Do you want herbs?"), d("Khách", "Có ạ, cho cháu thêm ớt.", "Yes, and extra chili."), d("Người bán", "Hai lăm nghìn nhé.", "Twenty-five thousand.") ] },
    vocabulary: [v("rau thơm", "herbs", "Phở ăn với rau thơm.", "Pho is eaten with herbs."), v("thêm", "extra, more", "Cho tôi thêm đá.", "More ice, please."), v("mang về", "take away", "Cho em mang về.", "To take away, please."), v("no", "full", "Tôi no rồi.", "I'm full.")],
    structure: { pattern: "Cho + [me] + thêm + [item]", explanation: "Ask for more of something.", examples: [{ vi: "Cho anh thêm bát cơm.", en: "Another bowl of rice, please." }] },
    quiz: [{ q: "'Thêm' means...", options: ["Less", "More / extra", "No", "Hot"], answer: 1 }, { q: "'Tôi no rồi' means...", options: ["I'm hungry", "I'm full", "No thanks", "It's cold"], answer: 1 }],
  },
  "vn-dl-03-shopping": {
    situation: { title: "At the Supermarket", description: "Asking where products are.", dialogue: [
      d("Khách", "Anh ơi, sữa để ở đâu ạ?", "Where is the milk?"), d("Nhân viên", "Ở quầy số ba, bên trái.", "Aisle three, on the left."), d("Khách", "Ở đây có khuyến mãi không?", "Are there any promotions?"), d("Nhân viên", "Có, mua hai tặng một chị ạ.", "Yes, buy two get one free.") ] },
    vocabulary: [v("khuyến mãi", "promotion", "Hôm nay có khuyến mãi lớn.", "There's a big sale today."), v("quầy", "counter, aisle", "Thanh toán ở quầy này.", "Pay at this counter."), v("giảm giá", "discount", "Áo này giảm giá 20%.", "This shirt is 20% off."), v("tặng", "to give free", "Mua một tặng một.", "Buy one get one free.")],
    structure: { pattern: "[Item] + để ở đâu?", explanation: "Ask where something is kept.", examples: [{ vi: "Nước mắm để ở đâu?", en: "Where is the fish sauce?" }] },
    quiz: [{ q: "'Giảm giá' means...", options: ["Price rise", "Discount", "Receipt", "Size"], answer: 1 }, { q: "'Mua hai tặng một' means...", options: ["Buy two get one free", "Two for one price", "Half price", "Sold out"], answer: 0 }],
  },
  "vn-dl-04-directions": {
    situation: { title: "Booking a Grab", description: "Confirming a ride-hailing pickup.", culturalNote: "Grab and Be are widely used; drivers often call to confirm your location.", dialogue: [
      d("Tài xế", "Alo, chị đang đứng ở đâu ạ?", "Hello, where are you standing?"), d("Khách", "Em đứng trước cửa khách sạn Hòa Bình.", "In front of Hoa Binh hotel."), d("Tài xế", "Dạ, hai phút nữa anh tới.", "I'll be there in two minutes."), d("Khách", "Vâng, em mặc áo đỏ nhé.", "OK, I'm wearing red.") ] },
    vocabulary: [v("đứng", "to stand", "Tôi đứng ở cổng.", "I'm standing at the gate."), v("trước", "in front of", "Trước nhà có cây.", "There's a tree in front of the house."), v("tới", "to arrive", "Xe tới rồi.", "The car has arrived."), v("ngã tư", "intersection", "Rẽ phải ở ngã tư.", "Turn right at the intersection.")],
    structure: { pattern: "[Number] + phút nữa", explanation: "In X minutes from now.", examples: [{ vi: "Mười phút nữa tàu chạy.", en: "The train leaves in ten minutes." }] },
    quiz: [{ q: "'Hai phút nữa' means...", options: ["Two minutes ago", "In two minutes", "Every two minutes", "Two hours"], answer: 1 }, { q: "'Ngã tư' means...", options: ["Bridge", "Intersection", "Station", "Street"], answer: 1 }],
  },
  "vn-dl-05-family": {
    situation: { title: "Talking About Relatives", description: "Explaining extended family.", dialogue: [
      d("Tom", "Người này là ai vậy?", "Who is this?"), d("Hoa", "Đây là chú mình, em trai của bố.", "My uncle, dad's younger brother."), d("Tom", "Chú bạn đã lập gia đình chưa?", "Is he married?"), d("Hoa", "Rồi, chú có hai con nhỏ.", "Yes, he has two young children.") ] },
    vocabulary: [v("chú", "uncle (father's younger brother)", "Chú tôi sống ở Đà Lạt.", "My uncle lives in Da Lat."), v("cô", "aunt (father's sister)", "Cô tôi là kỹ sư.", "My aunt is an engineer."), v("lập gia đình", "to get married", "Chị ấy lập gia đình rồi.", "She is married."), v("con", "child", "Anh có mấy con?", "How many children do you have?")],
    structure: { pattern: "[Subject] + đã + [verb] + chưa? / Rồi. / Chưa.", explanation: "Answer yes (rồi) or not yet (chưa).", examples: [{ vi: "Em ăn cơm chưa? - Rồi ạ.", en: "Have you eaten? - Yes." }] },
    quiz: [{ q: "'Chú' is your father's...", options: ["Older brother", "Younger brother", "Sister", "Father"], answer: 1 }, { q: "'Lập gia đình' means...", options: ["Build a house", "Get married", "Have a party", "Move"], answer: 1 }],
  },
  "vn-dl-06-time": {
    situation: { title: "Making an Appointment", description: "Agreeing on a day and time.", dialogue: [
      d("Mai", "Thứ mấy chúng ta gặp nhau?", "Which day shall we meet?"), d("Lan", "Thứ Bảy được không?", "Is Saturday OK?"), d("Mai", "Được, khoảng mấy giờ?", "Sure, around what time?"), d("Lan", "Chín giờ sáng ở quán cà phê cũ nhé.", "9 a.m. at the usual café.") ] },
    vocabulary: [v("thứ mấy", "which day", "Hôm nay thứ mấy?", "What day is it today?"), v("khoảng", "about, around", "Khoảng năm giờ.", "Around five o'clock."), v("buổi chiều", "afternoon", "Buổi chiều tôi rảnh.", "I'm free in the afternoon."), v("sớm", "early", "Hôm nay tôi về sớm.", "I'm going home early today.")],
    structure: { pattern: "[Time] + sáng / chiều / tối", explanation: "Specify part of the day.", examples: [{ vi: "Tám giờ tối.", en: "8 p.m." }] },
    quiz: [{ q: "'Thứ mấy?' asks about...", options: ["The hour", "The day of the week", "The month", "The year"], answer: 1 }, { q: "'Khoảng' means...", options: ["Exactly", "Around", "Late", "Never"], answer: 1 }],
  },
  "vn-dl-07-health": {
    situation: { title: "Calling in Sick", description: "Telling your manager you're ill.", dialogue: [
      d("Nhân viên", "Chị ơi, hôm nay em bị ốm, xin nghỉ một ngày ạ.", "I'm sick today and need a day off."), d("Quản lý", "Em có sao không? Đi khám chưa?", "Are you OK? Seen a doctor?"), d("Nhân viên", "Em đi khám rồi, bác sĩ bảo nghỉ ngơi.", "Yes, the doctor said to rest."), d("Quản lý", "Ừ, em nghỉ đi, mau khỏe nhé.", "OK, rest and get well soon.") ] },
    vocabulary: [v("ốm", "sick", "Con tôi bị ốm.", "My child is sick."), v("nghỉ", "to take time off", "Tôi xin nghỉ phép.", "I'm requesting leave."), v("nghỉ ngơi", "to rest", "Bạn cần nghỉ ngơi.", "You need to rest."), v("đi khám", "see a doctor", "Nên đi khám sớm.", "You should see a doctor soon.")],
    structure: { pattern: "[Person] + bảo + [message]", explanation: "Report what someone told you.", examples: [{ vi: "Mẹ bảo tôi về sớm.", en: "Mum told me to come home early." }] },
    quiz: [{ q: "'Xin nghỉ' means...", options: ["Ask for leave", "Go to work", "Buy medicine", "Call a friend"], answer: 0 }, { q: "'Bác sĩ bảo...' means...", options: ["The doctor said...", "The doctor asked...", "The doctor is...", "The doctor left"], answer: 0 }],
  },
  "vn-dl-08-housing": {
    situation: { title: "Reporting a Problem", description: "Telling the landlord something is broken.", dialogue: [
      d("Người thuê", "Cô ơi, điều hòa phòng cháu bị hỏng rồi.", "The air conditioner in my room is broken."), d("Chủ nhà", "Hỏng từ bao giờ vậy cháu?", "Since when?"), d("Người thuê", "Từ tối qua ạ, nó không chạy nữa.", "Since last night, it stopped working."), d("Chủ nhà", "Chiều nay cô gọi thợ đến sửa.", "I'll call a repairman this afternoon.") ] },
    vocabulary: [v("hỏng", "broken", "Máy giặt hỏng rồi.", "The washing machine is broken."), v("sửa", "to repair", "Anh sửa giúp tôi nhé.", "Please fix it for me."), v("thợ", "repairman, worker", "Thợ điện sắp đến.", "The electrician is coming."), v("từ bao giờ", "since when", "Anh ở đây từ bao giờ?", "Since when have you been here?")],
    structure: { pattern: "không + [verb] + nữa", explanation: "No longer does something.", examples: [{ vi: "Tôi không hút thuốc nữa.", en: "I don't smoke anymore." }] },
    quiz: [{ q: "'Hỏng' means...", options: ["New", "Broken", "Clean", "Expensive"], answer: 1 }, { q: "'Không chạy nữa' means...", options: ["Runs fast", "No longer works", "Not yet started", "Works well"], answer: 1 }],
  },
  "vn-bz-01-meetings": {
    situation: { title: "Wrapping Up", description: "Closing a meeting with action points.", dialogue: [
      d("Chủ trì", "Trước khi kết thúc, tôi xin tóm tắt lại.", "Before we finish, let me summarise."), d("Chủ trì", "Anh Nam gửi báo cáo trước thứ Năm.", "Nam sends the report by Thursday."), d("Nam", "Vâng, tôi ghi nhận.", "Noted."), d("Chủ trì", "Cảm ơn mọi người, cuộc họp kết thúc.", "Thanks everyone, the meeting is over.") ] },
    vocabulary: [v("tóm tắt", "to summarise", "Hãy tóm tắt ý chính.", "Summarise the main points."), v("kết thúc", "to end", "Chương trình đã kết thúc.", "The programme has ended."), v("ghi nhận", "to note, acknowledge", "Chúng tôi ghi nhận ý kiến.", "We note your feedback."), v("biên bản", "minutes", "Ai viết biên bản họp?", "Who is writing the minutes?")],
    structure: { pattern: "Trước khi + [verb], ...", explanation: "Before doing something.", examples: [{ vi: "Trước khi họp, đọc tài liệu.", en: "Read the documents before the meeting." }] },
    quiz: [{ q: "'Tóm tắt' means...", options: ["To summarise", "To start", "To vote", "To cancel"], answer: 0 }, { q: "'Biên bản họp' means...", options: ["Agenda", "Meeting minutes", "Room", "Invitation"], answer: 1 }],
  },
  "vn-bz-02-phone": {
    situation: { title: "Leaving a Message", description: "The person you need is out.", dialogue: [
      d("Lễ tân", "Anh Tùng đang đi công tác ạ.", "Tung is on a business trip."), d("Người gọi", "Chị nhắn giúp anh ấy gọi lại cho tôi được không?", "Could you ask him to call me back?"), d("Lễ tân", "Dạ, anh cho em xin tên và số điện thoại.", "May I have your name and number?"), d("Người gọi", "Tôi là Việt, số 0912 345 678.", "I'm Viet, 0912 345 678.") ] },
    vocabulary: [v("nhắn", "to leave a message", "Tôi nhắn tin cho bạn.", "I'll text you."), v("gọi lại", "to call back", "Lát nữa tôi gọi lại.", "I'll call back later."), v("công tác", "business trip", "Sếp đi công tác Nhật.", "The boss is on a trip to Japan."), v("máy bận", "line busy", "Số này đang máy bận.", "This line is busy.")],
    structure: { pattern: "[Subject] + nhắn giúp + [person] + [message]", explanation: "Ask someone to pass on a message.", examples: [{ vi: "Em nhắn giúp chị ấy là tôi đến muộn.", en: "Please tell her I'll be late." }] },
    quiz: [{ q: "'Gọi lại' means...", options: ["Hang up", "Call back", "Busy", "Text"], answer: 1 }, { q: "'Đi công tác' means...", options: ["On holiday", "On a business trip", "At lunch", "Sick"], answer: 1 }],
  },
  "vn-bz-03-interview": {
    situation: { title: "Strengths & Weaknesses", description: "Answering a common interview question.", culturalNote: "Show modesty: mention a weakness and how you are improving it.", dialogue: [
      d("Nhà tuyển dụng", "Điểm mạnh và điểm yếu của em là gì?", "What are your strengths and weaknesses?"), d("Ứng viên", "Điểm mạnh của em là chăm chỉ và làm việc nhóm tốt.", "I'm hard-working and a good team player."), d("Ứng viên", "Điểm yếu là đôi khi em quá cầu toàn, nhưng em đang cải thiện.", "Sometimes I'm a perfectionist, but I'm improving."), d("Nhà tuyển dụng", "Mức lương mong muốn của em là bao nhiêu?", "What is your expected salary?"), d("Ứng viên", "Em mong muốn khoảng mười lăm triệu một tháng.", "Around fifteen million per month.") ] },
    vocabulary: [v("điểm mạnh", "strength", "Điểm mạnh của anh là gì?", "What is your strength?"), v("điểm yếu", "weakness", "Ai cũng có điểm yếu.", "Everyone has weaknesses."), v("chăm chỉ", "hard-working", "Cô ấy rất chăm chỉ.", "She is very hard-working."), v("cải thiện", "to improve", "Tôi đang cải thiện tiếng Anh.", "I'm improving my English."), v("mức lương", "salary level", "Mức lương khởi điểm là bao nhiêu?", "What's the starting salary?")],
    structure: { pattern: "Điểm mạnh / yếu của + [person] + là + [quality]", explanation: "Describe strengths and weaknesses.", examples: [{ vi: "Điểm yếu của tôi là hay lo lắng.", en: "My weakness is that I worry a lot." }] },
    quiz: [{ q: "'Điểm mạnh' means...", options: ["Weakness", "Strength", "Salary", "Goal"], answer: 1 }, { q: "'Mức lương mong muốn' means...", options: ["Expected salary", "Job title", "Bonus", "Contract"], answer: 0 }, { q: "'Cầu toàn' describes a...", options: ["Lazy person", "Perfectionist", "Leader", "Beginner"], answer: 1 }],
  },
  "vn-bz-04-negotiation": {
    situation: { title: "Closing the Deal", description: "Agreeing on final terms.", dialogue: [
      d("Bên mua", "Nếu chúng tôi đặt một nghìn sản phẩm, anh giảm bao nhiêu?", "If we order 1,000 units, what discount?"), d("Bên bán", "Chúng tôi có thể giảm tám phần trăm.", "We can offer 8%."), d("Bên mua", "Mười phần trăm thì chúng tôi ký ngay.", "At 10% we'll sign right away."), d("Bên bán", "Được, thỏa thuận như vậy nhé.", "Deal, agreed.") ] },
    vocabulary: [v("thỏa thuận", "agreement", "Hai bên đạt được thỏa thuận.", "Both sides reached an agreement."), v("ký", "to sign", "Hãy ký vào đây.", "Please sign here."), v("sản phẩm", "product", "Sản phẩm này bán chạy.", "This product sells well."), v("điều khoản", "terms", "Đọc kỹ điều khoản.", "Read the terms carefully.")],
    structure: { pattern: "Nếu + [condition], (thì) + [result]", explanation: "Conditional sentence.", examples: [{ vi: "Nếu giá tốt thì chúng tôi mua.", en: "If the price is good, we'll buy." }] },
    quiz: [{ q: "'Nếu ... thì ...' means...", options: ["Because ... so", "If ... then", "Although ... but", "Not only ... but"], answer: 1 }, { q: "'Ký hợp đồng' means...", options: ["Read a contract", "Sign a contract", "Cancel a contract", "Write an email"], answer: 1 }],
  },
  "vn-bz-05-email": {
    situation: { title: "Formal Email Openings", description: "Discussing how to start an email.", dialogue: [
      d("Thực tập sinh", "Anh ơi, email cho đối tác nên mở đầu thế nào ạ?", "How should I start an email to a partner?"), d("Trưởng phòng", "Em viết 'Kính gửi anh/chị' rồi giới thiệu bản thân.", "Write 'Dear Sir/Madam' then introduce yourself."), d("Thực tập sinh", "Còn kết thư thì sao ạ?", "And how to end it?"), d("Trưởng phòng", "Viết 'Trân trọng' và ký tên.", "Write 'Best regards' and sign.") ] },
    vocabulary: [v("kính gửi", "dear (formal)", "Kính gửi Ban Giám đốc.", "Dear Board of Directors."), v("trân trọng", "best regards", "Trân trọng, Nguyễn Hải.", "Best regards, Nguyen Hai."), v("đối tác", "partner", "Đối tác đến từ Hàn Quốc.", "The partner is from Korea."), v("xác nhận", "to confirm", "Xin xác nhận lịch họp.", "Please confirm the meeting.")],
    structure: { pattern: "Kính gửi + [recipient], ... Trân trọng.", explanation: "Formal email frame.", examples: [{ vi: "Kính gửi chị Lan, ...", en: "Dear Ms Lan, ..." }] },
    quiz: [{ q: "'Trân trọng' closes an email as...", options: ["Hi", "Best regards", "Urgent", "Thanks a lot"], answer: 1 }, { q: "'Đối tác' means...", options: ["Competitor", "Partner", "Customer", "Boss"], answer: 1 }],
  },
  "vn-bz-06-presentation": {
    situation: { title: "Explaining a Trend", description: "Describing changes in data.", dialogue: [
      d("Người trình bày", "Từ tháng một đến tháng sáu, số khách hàng tăng mạnh.", "From January to June, customers rose sharply."), d("Người trình bày", "Sau đó con số giảm nhẹ do mùa mưa.", "Then it fell slightly due to the rainy season."), d("Người trình bày", "Nhìn chung, kết quả vượt mục tiêu năm phần trăm.", "Overall, results beat the target by 5%.") ] },
    vocabulary: [v("tăng mạnh", "rise sharply", "Giá nhà tăng mạnh.", "House prices rose sharply."), v("giảm nhẹ", "fall slightly", "Nhiệt độ giảm nhẹ.", "Temperatures fell slightly."), v("nhìn chung", "overall", "Nhìn chung, dự án thành công.", "Overall, the project succeeded."), v("mục tiêu", "target", "Chúng ta đạt mục tiêu.", "We reached the target.")],
    structure: { pattern: "Từ + [time A] + đến + [time B], ...", explanation: "Describe a period.", examples: [{ vi: "Từ 2020 đến 2025, doanh thu gấp đôi.", en: "From 2020 to 2025, revenue doubled." }] },
    quiz: [{ q: "'Giảm nhẹ' means...", options: ["Rise sharply", "Fall slightly", "Stay the same", "Double"], answer: 1 }, { q: "'Nhìn chung' means...", options: ["Overall", "Firstly", "However", "Finally"], answer: 0 }],
  },
  "vn-bz-07-customer": {
    situation: { title: "Refund Request", description: "A customer asks for money back.", dialogue: [
      d("Khách hàng", "Tôi muốn được hoàn tiền.", "I would like a refund."), d("Nhân viên", "Dạ, chị vui lòng chờ em kiểm tra một chút.", "Please wait while I check."), d("Nhân viên", "Tiền sẽ được hoàn vào tài khoản trong ba ngày làm việc.", "The money will be refunded within three working days."), d("Khách hàng", "Cảm ơn em đã hỗ trợ.", "Thanks for your help.") ] },
    vocabulary: [v("hoàn tiền", "refund", "Cửa hàng không hoàn tiền.", "The shop doesn't give refunds."), v("kiểm tra", "to check", "Kiểm tra lại giúp tôi.", "Please check again."), v("tài khoản", "account", "Chuyển vào tài khoản này.", "Transfer to this account."), v("hỗ trợ", "to support", "Chúng tôi luôn sẵn sàng hỗ trợ.", "We are always ready to help.")],
    structure: { pattern: "[Thing] + sẽ được + [verb]", explanation: "Passive future (will be done).", examples: [{ vi: "Hàng sẽ được giao hôm nay.", en: "The goods will be delivered today." }] },
    quiz: [{ q: "'Hoàn tiền' means...", options: ["Pay more", "Refund", "Discount", "Deposit"], answer: 1 }, { q: "'Sẽ được giao' means...", options: ["Was delivered", "Will be delivered", "Is not delivered", "Deliver now"], answer: 1 }],
  },
  "vn-bz-08-teamwork": {
    situation: { title: "Giving Feedback", description: "A lead gives constructive feedback.", culturalNote: "Start with praise before suggestions to protect face (giữ thể diện).", dialogue: [
      d("Trưởng nhóm", "Bản thiết kế của em rất sáng tạo.", "Your design is very creative."), d("Trưởng nhóm", "Tuy nhiên, màu sắc hơi nhiều, em thử đơn giản hơn nhé.", "However, there are too many colours; try simpler."), d("Hùng", "Vâng, cảm ơn anh góp ý. Em sẽ sửa lại.", "Thanks for the feedback. I'll revise it.") ] },
    vocabulary: [v("góp ý", "to give feedback", "Cảm ơn chị đã góp ý.", "Thanks for your feedback."), v("sáng tạo", "creative", "Ý tưởng rất sáng tạo.", "A very creative idea."), v("đơn giản", "simple", "Hãy làm đơn giản thôi.", "Keep it simple."), v("sửa lại", "to revise", "Tôi sẽ sửa lại báo cáo.", "I'll revise the report.")],
    structure: { pattern: "[Subject] + thử + [verb] + xem", explanation: "Suggest trying something.", examples: [{ vi: "Em thử làm cách khác xem.", en: "Try doing it another way." }] },
    quiz: [{ q: "'Góp ý' means...", options: ["Complain", "Give feedback", "Agree", "Resign"], answer: 1 }, { q: "Good Vietnamese feedback starts with...", options: ["Criticism", "Praise", "Silence", "Jokes"], answer: 1 }],
  },
  "vn-so-01-invitations": {
    situation: { title: "Declining Politely", description: "Saying no without offending.", dialogue: [
      d("Hà", "Tối mai đi ăn lẩu với bọn mình nhé!", "Come for hotpot with us tomorrow night!"), d("Linh", "Tiếc quá, tối mai mình bận mất rồi.", "What a pity, I'm busy tomorrow night."), d("Linh", "Để lần sau nhé, mình mời.", "Next time, my treat."), d("Hà", "Ok, hẹn lần sau.", "OK, next time.") ] },
    vocabulary: [v("tiếc quá", "what a pity", "Tiếc quá, hết vé rồi.", "What a pity, tickets are sold out."), v("bận", "busy", "Dạo này tôi bận lắm.", "I'm very busy lately."), v("lần sau", "next time", "Lần sau tôi sẽ đến.", "I'll come next time."), v("mời", "to treat, invite", "Hôm nay tôi mời.", "Today it's my treat.")],
    structure: { pattern: "Để + [time] + nhé", explanation: "Postpone softly.", examples: [{ vi: "Để tuần sau nhé.", en: "Let's leave it till next week." }] },
    quiz: [{ q: "'Tiếc quá' means...", options: ["Great!", "What a pity", "Sure", "Hurry"], answer: 1 }, { q: "'Hôm nay tôi mời' means...", options: ["Today I invite/treat", "Today I'm busy", "Today I'm late", "Today I cook"], answer: 0 }],
  },
  "vn-so-02-feelings": {
    situation: { title: "Encouraging a Friend", description: "Supporting someone who failed an exam.", dialogue: [
      d("Nam", "Mình trượt kỳ thi rồi, buồn quá.", "I failed the exam, I'm so sad."), d("Mai", "Đừng buồn, cậu đã cố gắng hết sức rồi.", "Don't be sad, you tried your best."), d("Mai", "Lần sau chắc chắn cậu sẽ làm tốt hơn.", "Next time you'll definitely do better."), d("Nam", "Cảm ơn cậu đã động viên.", "Thanks for encouraging me.") ] },
    vocabulary: [v("trượt", "to fail (an exam)", "Anh ấy trượt bằng lái.", "He failed the driving test."), v("cố gắng", "to try hard", "Hãy cố gắng lên!", "Keep trying!"), v("động viên", "to encourage", "Bố mẹ luôn động viên tôi.", "My parents always encourage me."), v("chắc chắn", "certainly", "Chắc chắn bạn sẽ thành công.", "You will certainly succeed.")],
    structure: { pattern: "Đừng + [verb/adj]", explanation: "Don't (advice).", examples: [{ vi: "Đừng lo lắng.", en: "Don't worry." }] },
    quiz: [{ q: "'Đừng buồn' means...", options: ["Be happy", "Don't be sad", "Very sad", "Why sad?"], answer: 1 }, { q: "'Động viên' means...", options: ["To encourage", "To blame", "To forget", "To win"], answer: 0 }],
  },
  "vn-so-03-tet": {
    situation: { title: "Lucky Money", description: "Giving lì xì to children.", culturalNote: "Red envelopes (lì xì) are given with wishes; receive them with both hands.", dialogue: [
      d("Bé Na", "Cháu chúc chú năm mới an khang thịnh vượng ạ.", "I wish you peace and prosperity."), d("Chú", "Giỏi quá! Chú lì xì cháu này.", "Well done! Here's your lucky money."), d("Bé Na", "Cháu cảm ơn chú ạ.", "Thank you."), d("Chú", "Chúc cháu học giỏi, chăm ngoan.", "Study well and be good.") ] },
    vocabulary: [v("lì xì", "lucky money", "Trẻ em thích nhận lì xì.", "Kids love lucky money."), v("an khang", "peace and health", "Chúc gia đình an khang.", "Wishing your family peace."), v("thịnh vượng", "prosperity", "Năm mới thịnh vượng.", "A prosperous new year."), v("chúc Tết", "to give Tết wishes", "Chúng tôi đi chúc Tết họ hàng.", "We visit relatives to give Tết wishes.")],
    structure: { pattern: "Chúc + [person] + năm mới + [wish]", explanation: "New Year wishes.", examples: [{ vi: "Chúc bà năm mới sống lâu.", en: "Wishing grandma a long life this year." }] },
    quiz: [{ q: "'Lì xì' is...", options: ["A dish", "Lucky money", "Fireworks", "A flower"], answer: 1 }, { q: "How should you receive lì xì?", options: ["One hand", "Both hands", "Without looking", "Refuse it"], answer: 1 }],
  },
  "vn-so-04-opinions": {
    situation: { title: "Disagreeing Politely", description: "Debating social media use.", dialogue: [
      d("An", "Mạng xã hội làm giới trẻ lười đọc sách.", "Social media makes young people read less."), d("Bình", "Mình không hoàn toàn đồng ý. Nhiều bạn đọc sách điện tử.", "I don't fully agree. Many read e-books."), d("An", "Bạn nói có lý, nhưng thời gian đọc vẫn giảm.", "Fair point, but reading time still drops."), d("Bình", "Có lẽ vấn đề là cách sử dụng, không phải công nghệ.", "Perhaps the issue is usage, not technology.") ] },
    vocabulary: [v("không hoàn toàn", "not entirely", "Tôi không hoàn toàn chắc.", "I'm not entirely sure."), v("có lý", "reasonable", "Anh nói rất có lý.", "What you say makes sense."), v("có lẽ", "perhaps", "Có lẽ trời sẽ mưa.", "Perhaps it will rain."), v("vấn đề", "issue, problem", "Vấn đề này phức tạp.", "This issue is complex.")],
    structure: { pattern: "[A], không phải [B]", explanation: "Contrast: A, not B.", examples: [{ vi: "Đó là lỗi hệ thống, không phải lỗi của bạn.", en: "It's a system error, not your fault." }] },
    quiz: [{ q: "'Bạn nói có lý' means...", options: ["You're wrong", "That makes sense", "Say again", "I disagree"], answer: 1 }, { q: "'Có lẽ' means...", options: ["Certainly", "Perhaps", "Never", "Because"], answer: 1 }],
  },
  "vn-so-05-hobbies": {
    situation: { title: "Joining a Club", description: "Signing up for a running club.", dialogue: [
      d("Khoa", "Câu lạc bộ chạy bộ tập vào lúc nào?", "When does the running club train?"), d("Trưởng CLB", "Sáng thứ Ba và thứ Năm, sáu giờ ở hồ Tây.", "Tuesday and Thursday at 6 a.m. at West Lake."), d("Khoa", "Người mới bắt đầu có tham gia được không?", "Can beginners join?"), d("Trưởng CLB", "Được chứ, ai cũng được chào đón.", "Of course, everyone is welcome.") ] },
    vocabulary: [v("câu lạc bộ", "club", "Tôi tham gia câu lạc bộ sách.", "I joined a book club."), v("tham gia", "to join", "Mời bạn tham gia.", "You're welcome to join."), v("người mới bắt đầu", "beginner", "Lớp dành cho người mới bắt đầu.", "The class is for beginners."), v("chạy bộ", "jogging", "Chạy bộ tốt cho sức khỏe.", "Jogging is good for health.")],
    structure: { pattern: "Ai cũng + [verb/adj]", explanation: "Everyone...", examples: [{ vi: "Ai cũng thích món này.", en: "Everyone likes this dish." }] },
    quiz: [{ q: "'Tham gia' means...", options: ["To join", "To quit", "To watch", "To win"], answer: 0 }, { q: "'Ai cũng được chào đón' means...", options: ["Nobody allowed", "Everyone is welcome", "Members only", "Beginners only"], answer: 1 }],
  },
  "vn-so-06-travel": {
    situation: { title: "Travel Mishap", description: "Telling a story about a problem on a trip.", dialogue: [
      d("Tuấn", "Hôm đó mình bị lỡ chuyến bay.", "That day I missed my flight."), d("Thảo", "Trời ơi, sao vậy?", "Oh no, why?"), d("Tuấn", "Vì tắc đường nên mình đến sân bay muộn.", "Because of traffic jams I arrived late."), d("Tuấn", "May mà hãng cho đổi sang chuyến sau.", "Luckily the airline moved me to the next flight.") ] },
    vocabulary: [v("lỡ", "to miss", "Tôi lỡ xe buýt.", "I missed the bus."), v("tắc đường", "traffic jam", "Giờ này hay tắc đường.", "There are often jams at this hour."), v("sân bay", "airport", "Sân bay Nội Bài rất lớn.", "Noi Bai airport is big."), v("may mà", "luckily", "May mà trời không mưa.", "Luckily it didn't rain.")],
    structure: { pattern: "Vì + [cause] + nên + [result]", explanation: "Because ... so ...", examples: [{ vi: "Vì mưa nên chúng tôi ở nhà.", en: "Because it rained, we stayed home." }] },
    quiz: [{ q: "'Vì ... nên ...' means...", options: ["If ... then", "Because ... so", "Although ... but", "Both ... and"], answer: 1 }, { q: "'Lỡ chuyến bay' means...", options: ["Catch a flight", "Miss a flight", "Book a flight", "Cancel a flight"], answer: 1 }],
  },
  "vn-so-07-condolence": {
    situation: { title: "A Birthday Party", description: "Wishing a friend happy birthday.", dialogue: [
      d("Bạn bè", "Chúc mừng sinh nhật Hà! Chúc cậu tuổi mới thật nhiều niềm vui.", "Happy birthday Ha! Lots of joy this year."), d("Hà", "Cảm ơn mọi người nhiều nhé!", "Thanks everyone!"), d("Bạn bè", "Thổi nến và ước đi!", "Blow the candles and make a wish!"), d("Hà", "Mình ước năm nay đi du lịch châu Âu.", "I wish to travel to Europe this year.") ] },
    vocabulary: [v("sinh nhật", "birthday", "Sinh nhật tôi vào tháng năm.", "My birthday is in May."), v("tuổi mới", "new age / year of life", "Chúc em tuổi mới vui vẻ.", "Happy new year of life."), v("niềm vui", "joy", "Con cái là niềm vui.", "Children are a joy."), v("ước", "to wish", "Tôi ước được bay.", "I wish I could fly.")],
    structure: { pattern: "Chúc + [person] + thật nhiều + [noun]", explanation: "Wish someone lots of something.", examples: [{ vi: "Chúc chị thật nhiều sức khỏe.", en: "Wishing you lots of health." }] },
    quiz: [{ q: "'Chúc mừng sinh nhật' means...", options: ["Happy New Year", "Happy birthday", "Congratulations on your wedding", "Get well"], answer: 1 }, { q: "'Ước' means...", options: ["To wish", "To wait", "To eat", "To sing"], answer: 0 }],
  },
  "vn-so-08-news": {
    situation: { title: "Technology News", description: "Discussing AI in daily life.", dialogue: [
      d("Phong", "Bạn đọc tin về trí tuệ nhân tạo hôm nay chưa?", "Did you read today's AI news?"), d("Nga", "Rồi, nhiều công ty đang ứng dụng AI vào dịch vụ khách hàng.", "Yes, many firms are applying AI to customer service."), d("Phong", "Mình lo là nhiều người sẽ mất việc.", "I worry many people will lose jobs."), d("Nga", "Nhưng AI cũng tạo ra nhiều ngành nghề mới.", "But AI also creates new professions.") ] },
    vocabulary: [v("trí tuệ nhân tạo", "artificial intelligence", "Trí tuệ nhân tạo phát triển nhanh.", "AI is developing fast."), v("ứng dụng", "to apply", "Ứng dụng công nghệ vào giáo dục.", "Apply technology to education."), v("mất việc", "to lose a job", "Anh ấy vừa mất việc.", "He just lost his job."), v("tạo ra", "to create", "Dự án tạo ra nhiều việc làm.", "The project creates many jobs.")],
    structure: { pattern: "[Subject] + lo là + [clause]", explanation: "Express worry that...", examples: [{ vi: "Tôi lo là trời sẽ mưa.", en: "I'm worried it will rain." }] },
    quiz: [{ q: "'Trí tuệ nhân tạo' means...", options: ["Internet", "Artificial intelligence", "Robot arm", "Smartphone"], answer: 1 }, { q: "'Mất việc' means...", options: ["Find a job", "Lose a job", "Change jobs", "Retire"], answer: 1 }],
  },
};
