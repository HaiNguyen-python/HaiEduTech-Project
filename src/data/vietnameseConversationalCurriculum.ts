// Conversational Vietnamese curriculum: 3 pillars mirroring the English and Chinese interactive curricula.

export interface VnDialogueLine { speaker: string; line: string; en: string }
export interface VnSituation { title: string; description: string; culturalNote?: string; dialogue: VnDialogueLine[] }
export interface VnVocab { vi: string; en: string; example: string; exampleEn: string }
export interface VnStructure { pattern: string; explanation: string; examples: { vi: string; en: string }[] }
export interface VnQuiz { q: string; options: string[]; answer: number }
export interface VnConvLesson {
  id: string; title: string; titleVi: string; icon: string; level: "A1" | "A2" | "B1" | "B2";
  description: string; situations: VnSituation[]; vocabulary: VnVocab[]; structures: VnStructure[]; quiz: VnQuiz[];
}
export interface VnConvPillar { id: string; title: string; titleVi: string; description: string; lessons: VnConvLesson[] }

export const vietnameseConversationalPillars: VnConvPillar[] = [
  {
    id: "daily-life", title: "Essential Daily Life", titleVi: "Đời sống hằng ngày",
    description: "Greetings, food, shopping and getting around in everyday Vietnam.",
    lessons: [
      {
        id: "vn-dl-01-greetings", title: "Greetings & Introductions", titleVi: "Chào hỏi & Giới thiệu", icon: "Hand", level: "A1",
        description: "Greet people with the right pronoun and introduce yourself.",
        situations: [
          {
            title: "Meeting Someone New", description: "Introducing yourself to a new neighbour.",
            culturalNote: "Vietnamese pronouns depend on age. Call an older man 'anh' and an older woman 'chị'; call yourself 'em'.",
            dialogue: [
              { speaker: "Lan", line: "Chào anh. Em tên là Lan.", en: "Hello. My name is Lan." },
              { speaker: "Minh", line: "Chào em. Anh là Minh. Rất vui được gặp em.", en: "Hello. I'm Minh. Nice to meet you." },
              { speaker: "Lan", line: "Anh là người ở đâu ạ?", en: "Where are you from?" },
              { speaker: "Minh", line: "Anh là người Hà Nội. Còn em?", en: "I'm from Hanoi. And you?" },
              { speaker: "Lan", line: "Em là người Huế ạ.", en: "I'm from Hue." },
            ],
          },
          {
            title: "Greeting an Elder", description: "Politely greeting your friend's grandmother.",
            culturalNote: "Adding 'ạ' at the end of a sentence shows respect to older people.",
            dialogue: [
              { speaker: "Nam", line: "Cháu chào bà ạ.", en: "Hello, grandma." },
              { speaker: "Bà", line: "Chào cháu. Cháu khỏe không?", en: "Hello. How are you?" },
              { speaker: "Nam", line: "Dạ, cháu khỏe ạ. Bà có khỏe không ạ?", en: "I'm well. Are you well?" },
              { speaker: "Bà", line: "Bà cũng khỏe. Cháu vào nhà uống nước đi.", en: "I'm fine too. Come in and have some water." },
            ],
          },
        ],
        vocabulary: [
          { vi: "xin chào", en: "hello", example: "Xin chào các bạn.", exampleEn: "Hello everyone." },
          { vi: "tên là", en: "to be named", example: "Tôi tên là Hải.", exampleEn: "My name is Hai." },
          { vi: "rất vui được gặp", en: "nice to meet", example: "Rất vui được gặp chị.", exampleEn: "Nice to meet you." },
          { vi: "người", en: "person / nationality", example: "Tôi là người Việt Nam.", exampleEn: "I am Vietnamese." },
          { vi: "khỏe", en: "healthy, well", example: "Dạo này bạn khỏe không?", exampleEn: "Are you well lately?" },
          { vi: "dạ", en: "polite 'yes'", example: "Dạ, em hiểu rồi ạ.", exampleEn: "Yes, I understand." },
        ],
        structures: [
          { pattern: "[Pronoun] + tên là + [name]", explanation: "Introduce your name.", examples: [{ vi: "Em tên là Mai.", en: "My name is Mai." }, { vi: "Anh ấy tên là Tuấn.", en: "His name is Tuan." }] },
          { pattern: "[Subject] + có + [adjective] + không?", explanation: "Yes/no question with an adjective.", examples: [{ vi: "Chị có mệt không?", en: "Are you tired?" }, { vi: "Món này có cay không?", en: "Is this dish spicy?" }] },
        ],
        quiz: [
          { q: "How do you address an older woman?", options: ["em", "chị", "cháu", "tôi"], answer: 1 },
          { q: "Which word adds politeness at the end of a sentence?", options: ["ạ", "không", "đi", "rồi"], answer: 0 },
          { q: "'Rất vui được gặp anh' means...", options: ["See you later", "Nice to meet you", "Thank you", "Goodbye"], answer: 1 },
          { q: "Complete: 'Tôi ___ Hải.'", options: ["có", "tên là", "ở", "đi"], answer: 1 },
        ],
      },
      {
        id: "vn-dl-02-food", title: "Food & Dining", titleVi: "Ăn uống", icon: "UtensilsCrossed", level: "A1",
        description: "Order food, ask for recommendations and pay the bill.",
        situations: [
          {
            title: "Ordering Phở", description: "Ordering at a noodle shop.",
            culturalNote: "Call the waiter with 'Em ơi!' when they look younger than you.",
            dialogue: [
              { speaker: "Khách", line: "Em ơi, cho anh một bát phở bò.", en: "Excuse me, one bowl of beef pho, please." },
              { speaker: "Phục vụ", line: "Dạ, anh ăn tái hay chín ạ?", en: "Rare or well-done beef?" },
              { speaker: "Khách", line: "Cho anh phở tái, không hành nhé.", en: "Rare beef, no onions please." },
              { speaker: "Phục vụ", line: "Anh uống gì ạ?", en: "What would you like to drink?" },
              { speaker: "Khách", line: "Một cốc trà đá.", en: "One iced tea." },
            ],
          },
          {
            title: "Paying the Bill", description: "Asking for the bill after the meal.",
            dialogue: [
              { speaker: "Khách", line: "Em ơi, tính tiền cho anh.", en: "Excuse me, the bill please." },
              { speaker: "Phục vụ", line: "Dạ, của anh năm mươi nghìn ạ.", en: "That's fifty thousand dong." },
              { speaker: "Khách", line: "Anh chuyển khoản được không?", en: "Can I pay by bank transfer?" },
              { speaker: "Phục vụ", line: "Dạ được, anh quét mã này nhé.", en: "Sure, please scan this code." },
            ],
          },
        ],
        vocabulary: [
          { vi: "cho tôi", en: "give me / I'd like", example: "Cho tôi một ly cà phê.", exampleEn: "I'd like a coffee." },
          { vi: "bát", en: "bowl", example: "Một bát cơm.", exampleEn: "A bowl of rice." },
          { vi: "tính tiền", en: "to pay the bill", example: "Tính tiền giúp tôi.", exampleEn: "The bill, please." },
          { vi: "cay", en: "spicy", example: "Tôi không ăn cay.", exampleEn: "I don't eat spicy food." },
          { vi: "ngon", en: "delicious", example: "Món này ngon quá!", exampleEn: "This dish is so good!" },
          { vi: "trà đá", en: "iced tea", example: "Trà đá rất rẻ.", exampleEn: "Iced tea is very cheap." },
        ],
        structures: [
          { pattern: "Cho + [me] + [quantity] + [item]", explanation: "Polite way to order.", examples: [{ vi: "Cho em hai bánh mì.", en: "Two banh mi, please." }, { vi: "Cho tôi xem thực đơn.", en: "Let me see the menu." }] },
          { pattern: "[A] + hay + [B]?", explanation: "Choice question: A or B?", examples: [{ vi: "Anh uống nóng hay đá?", en: "Hot or iced?" }, { vi: "Ăn ở đây hay mang về?", en: "Eat here or take away?" }] },
        ],
        quiz: [
          { q: "How do you call a young waiter?", options: ["Bà ơi", "Em ơi", "Ông ơi", "Cháu ơi"], answer: 1 },
          { q: "'Tính tiền' means...", options: ["Menu", "Bill please", "Spicy", "Take away"], answer: 1 },
          { q: "'Mang về' means...", options: ["Eat here", "Take away", "Delicious", "Drink"], answer: 1 },
          { q: "Which word means 'or' in questions?", options: ["và", "hay", "với", "cũng"], answer: 1 },
        ],
      },
      {
        id: "vn-dl-03-shopping", title: "Shopping & Bargaining", titleVi: "Mua sắm & Mặc cả", icon: "ShoppingBag", level: "A2",
        description: "Ask prices, bargain politely at the market.",
        situations: [
          {
            title: "At the Market", description: "Bargaining for a shirt.",
            culturalNote: "Friendly bargaining is normal at markets, but not in supermarkets or malls.",
            dialogue: [
              { speaker: "Khách", line: "Chị ơi, cái áo này bao nhiêu tiền?", en: "How much is this shirt?" },
              { speaker: "Người bán", line: "Hai trăm nghìn em ạ.", en: "Two hundred thousand." },
              { speaker: "Khách", line: "Đắt quá! Một trăm rưỡi được không chị?", en: "Too expensive! How about 150?" },
              { speaker: "Người bán", line: "Thôi, chị bán cho em một trăm tám.", en: "OK, 180 for you." },
              { speaker: "Khách", line: "Dạ, em lấy cái này.", en: "OK, I'll take it." },
            ],
          },
          {
            title: "Asking for a Size", description: "Trying on clothes.",
            dialogue: [
              { speaker: "Khách", line: "Có cỡ lớn hơn không chị?", en: "Do you have a bigger size?" },
              { speaker: "Người bán", line: "Có, em mặc thử đi.", en: "Yes, try it on." },
              { speaker: "Khách", line: "Có màu xanh không ạ?", en: "Do you have it in blue?" },
              { speaker: "Người bán", line: "Màu xanh hết rồi em.", en: "Blue is sold out." },
            ],
          },
        ],
        vocabulary: [
          { vi: "bao nhiêu tiền", en: "how much", example: "Quả này bao nhiêu tiền?", exampleEn: "How much is this fruit?" },
          { vi: "đắt", en: "expensive", example: "Ở đây hơi đắt.", exampleEn: "It's a bit expensive here." },
          { vi: "rẻ", en: "cheap", example: "Chợ này rẻ lắm.", exampleEn: "This market is very cheap." },
          { vi: "mặc thử", en: "to try on", example: "Tôi mặc thử được không?", exampleEn: "Can I try it on?" },
          { vi: "cỡ", en: "size", example: "Tôi mặc cỡ M.", exampleEn: "I wear size M." },
          { vi: "hết rồi", en: "sold out", example: "Bánh hết rồi.", exampleEn: "The cakes are sold out." },
        ],
        structures: [
          { pattern: "[Item] + bao nhiêu tiền?", explanation: "Ask the price.", examples: [{ vi: "Đôi giày này bao nhiêu tiền?", en: "How much are these shoes?" }] },
          { pattern: "[Adjective] + quá!", explanation: "Exclamation: so / too...", examples: [{ vi: "Đẹp quá!", en: "So beautiful!" }, { vi: "Nóng quá!", en: "Too hot!" }] },
        ],
        quiz: [
          { q: "'Đắt quá' means...", options: ["Too cheap", "Too expensive", "Very nice", "Sold out"], answer: 1 },
          { q: "'Một trăm rưỡi' is...", options: ["100", "105", "150", "1,500"], answer: 2 },
          { q: "Where is bargaining NOT normal?", options: ["Street market", "Supermarket", "Night market", "Street stall"], answer: 1 },
          { q: "'Mặc thử' means...", options: ["Buy", "Try on", "Return", "Pay"], answer: 1 },
        ],
      },
      {
        id: "vn-dl-04-directions", title: "Transport & Directions", titleVi: "Đi lại & Hỏi đường", icon: "MapPin", level: "A2",
        description: "Ask for directions and take a taxi or motorbike ride.",
        situations: [
          {
            title: "Asking for Directions", description: "Finding the post office.",
            dialogue: [
              { speaker: "Du khách", line: "Xin lỗi, bưu điện ở đâu ạ?", en: "Excuse me, where is the post office?" },
              { speaker: "Người dân", line: "Anh đi thẳng, đến ngã tư thì rẽ trái.", en: "Go straight, turn left at the crossroads." },
              { speaker: "Du khách", line: "Có xa không ạ?", en: "Is it far?" },
              { speaker: "Người dân", line: "Không xa lắm, đi bộ khoảng năm phút.", en: "Not very far, about five minutes on foot." },
            ],
          },
          {
            title: "Booking a Ride", description: "Talking to a ride-hailing driver.",
            culturalNote: "Xe ôm means motorbike taxi. Apps like Grab and Be are very common.",
            dialogue: [
              { speaker: "Tài xế", line: "Chị đi đâu ạ?", en: "Where are you going?" },
              { speaker: "Khách", line: "Anh cho em đến chợ Bến Thành.", en: "Take me to Ben Thanh market." },
              { speaker: "Tài xế", line: "Dạ, chị đội mũ bảo hiểm vào nhé.", en: "Please put on the helmet." },
              { speaker: "Khách", line: "Anh đi chậm một chút được không?", en: "Can you drive a bit slower?" },
            ],
          },
        ],
        vocabulary: [
          { vi: "ở đâu", en: "where", example: "Nhà vệ sinh ở đâu?", exampleEn: "Where is the toilet?" },
          { vi: "đi thẳng", en: "go straight", example: "Đi thẳng khoảng 100 mét.", exampleEn: "Go straight about 100 metres." },
          { vi: "rẽ trái / rẽ phải", en: "turn left / right", example: "Rẽ phải ở đèn đỏ.", exampleEn: "Turn right at the traffic light." },
          { vi: "ngã tư", en: "crossroads", example: "Dừng ở ngã tư.", exampleEn: "Stop at the crossroads." },
          { vi: "xa / gần", en: "far / near", example: "Khách sạn gần biển.", exampleEn: "The hotel is near the beach." },
          { vi: "mũ bảo hiểm", en: "helmet", example: "Đội mũ bảo hiểm nhé.", exampleEn: "Wear a helmet." },
        ],
        structures: [
          { pattern: "[Place] + ở đâu?", explanation: "Ask where something is.", examples: [{ vi: "Ga tàu ở đâu?", en: "Where is the train station?" }] },
          { pattern: "[Verb] + được không?", explanation: "Ask 'Can I / can you...?'", examples: [{ vi: "Dừng ở đây được không?", en: "Can you stop here?" }] },
        ],
        quiz: [
          { q: "'Rẽ trái' means...", options: ["Turn right", "Turn left", "Go straight", "Stop"], answer: 1 },
          { q: "'Xe ôm' is...", options: ["Bus", "Motorbike taxi", "Train", "Bicycle"], answer: 1 },
          { q: "'Có xa không?' asks...", options: ["Is it far?", "Is it cheap?", "Where is it?", "How long?"], answer: 0 },
          { q: "'Ngã tư' means...", options: ["Bridge", "Crossroads", "Market", "Street"], answer: 1 },
        ],
      },
    ],
  },
  {
    id: "business", title: "Business & Professional", titleVi: "Công việc & Chuyên nghiệp",
    description: "Meetings, phone calls, emails and interviews in Vietnamese workplaces.",
    lessons: [
      {
        id: "vn-bz-01-meetings", title: "Starting a Meeting", titleVi: "Bắt đầu cuộc họp", icon: "Presentation", level: "B1",
        description: "Open a meeting, set the agenda and give updates.",
        situations: [
          {
            title: "Opening the Meeting", description: "The manager opens the weekly meeting.",
            culturalNote: "Vietnamese meetings often begin by greeting the most senior person first.",
            dialogue: [
              { speaker: "Trưởng phòng", line: "Chào mọi người, chúng ta bắt đầu cuộc họp nhé.", en: "Hello everyone, let's start the meeting." },
              { speaker: "Trưởng phòng", line: "Hôm nay chúng ta bàn về kế hoạch quý ba.", en: "Today we will discuss the Q3 plan." },
              { speaker: "Nhân viên", line: "Dạ, em xin báo cáo tình hình của nhóm trước ạ.", en: "I'll report on my team's situation first." },
              { speaker: "Trưởng phòng", line: "Được, em trình bày đi.", en: "OK, please go ahead." },
            ],
          },
          {
            title: "Giving an Update", description: "Reporting progress.",
            dialogue: [
              { speaker: "Nhân viên", line: "Dự án đã hoàn thành khoảng tám mươi phần trăm.", en: "The project is about 80% complete." },
              { speaker: "Giám đốc", line: "Khi nào có thể bàn giao?", en: "When can it be delivered?" },
              { speaker: "Nhân viên", line: "Dự kiến cuối tháng này ạ.", en: "Expected at the end of this month." },
              { speaker: "Giám đốc", line: "Tốt. Có khó khăn gì cứ báo anh.", en: "Good. Let me know about any difficulties." },
            ],
          },
        ],
        vocabulary: [
          { vi: "cuộc họp", en: "meeting", example: "Cuộc họp bắt đầu lúc 9 giờ.", exampleEn: "The meeting starts at 9." },
          { vi: "báo cáo", en: "report", example: "Tôi sẽ gửi báo cáo hôm nay.", exampleEn: "I'll send the report today." },
          { vi: "kế hoạch", en: "plan", example: "Kế hoạch đã được duyệt.", exampleEn: "The plan was approved." },
          { vi: "dự án", en: "project", example: "Dự án này rất quan trọng.", exampleEn: "This project is very important." },
          { vi: "hoàn thành", en: "to complete", example: "Chúng tôi đã hoàn thành đúng hạn.", exampleEn: "We finished on time." },
          { vi: "dự kiến", en: "expected", example: "Dự kiến tuần sau có kết quả.", exampleEn: "Results are expected next week." },
        ],
        structures: [
          { pattern: "Chúng ta + [verb] + nhé", explanation: "Suggest a joint action: let's...", examples: [{ vi: "Chúng ta nghỉ giải lao nhé.", en: "Let's take a break." }] },
          { pattern: "[Subject] + đã + [verb]", explanation: "Past / completed action.", examples: [{ vi: "Tôi đã gửi email.", en: "I have sent the email." }] },
        ],
        quiz: [
          { q: "'Cuộc họp' means...", options: ["Report", "Meeting", "Project", "Office"], answer: 1 },
          { q: "'Đã' marks...", options: ["Future", "Completed action", "Question", "Negation"], answer: 1 },
          { q: "'Dự kiến' means...", options: ["Expected", "Finished", "Cancelled", "Approved"], answer: 0 },
          { q: "'Chúng ta bắt đầu nhé' means...", options: ["Let's stop", "Let's start", "We finished", "We're late"], answer: 1 },
        ],
      },
      {
        id: "vn-bz-02-phone", title: "Phone Calls", titleVi: "Gọi điện thoại công việc", icon: "Phone", level: "B1",
        description: "Answer, transfer and leave messages on the phone.",
        situations: [
          {
            title: "Calling a Company", description: "Asking to speak with someone.",
            dialogue: [
              { speaker: "Lễ tân", line: "Alô, công ty Hải Nam xin nghe.", en: "Hello, Hai Nam company speaking." },
              { speaker: "Khách", line: "Chào chị, cho tôi gặp anh Tuấn phòng kinh doanh.", en: "Hi, may I speak to Mr. Tuan in sales?" },
              { speaker: "Lễ tân", line: "Anh Tuấn đang họp. Anh có muốn để lại lời nhắn không ạ?", en: "He is in a meeting. Would you like to leave a message?" },
              { speaker: "Khách", line: "Nhờ chị bảo anh ấy gọi lại cho tôi.", en: "Please ask him to call me back." },
            ],
          },
          {
            title: "Scheduling a Call", description: "Arranging a time.",
            dialogue: [
              { speaker: "Tuấn", line: "Chiều mai anh có rảnh không?", en: "Are you free tomorrow afternoon?" },
              { speaker: "Khách", line: "Ba giờ chiều được không?", en: "Is 3 pm OK?" },
              { speaker: "Tuấn", line: "Được ạ. Tôi sẽ gửi lịch hẹn qua email.", en: "Yes. I'll send the invite by email." },
            ],
          },
        ],
        vocabulary: [
          { vi: "xin nghe", en: "speaking (on phone)", example: "Phòng nhân sự xin nghe.", exampleEn: "HR department speaking." },
          { vi: "lời nhắn", en: "message", example: "Tôi để lại lời nhắn.", exampleEn: "I'll leave a message." },
          { vi: "gọi lại", en: "call back", example: "Tôi sẽ gọi lại sau.", exampleEn: "I'll call back later." },
          { vi: "rảnh", en: "free (time)", example: "Tối nay bạn rảnh không?", exampleEn: "Are you free tonight?" },
          { vi: "lịch hẹn", en: "appointment", example: "Lịch hẹn lúc 10 giờ.", exampleEn: "The appointment is at 10." },
          { vi: "phòng kinh doanh", en: "sales department", example: "Tôi làm ở phòng kinh doanh.", exampleEn: "I work in sales." },
        ],
        structures: [
          { pattern: "Cho tôi gặp + [person]", explanation: "Ask to speak to someone.", examples: [{ vi: "Cho tôi gặp chị Hoa.", en: "May I speak to Ms. Hoa?" }] },
          { pattern: "Nhờ + [person] + [verb]", explanation: "Ask someone to do a favour.", examples: [{ vi: "Nhờ anh gửi file giúp tôi.", en: "Please send me the file." }] },
        ],
        quiz: [
          { q: "'Gọi lại' means...", options: ["Hang up", "Call back", "Answer", "Transfer"], answer: 1 },
          { q: "'Đang họp' means...", options: ["Is on leave", "Is in a meeting", "Is busy eating", "Is out"], answer: 1 },
          { q: "'Rảnh' means...", options: ["Busy", "Free", "Late", "Early"], answer: 1 },
          { q: "How do you answer a business call?", options: ["... xin nghe", "... tạm biệt", "... cảm ơn", "... xin lỗi"], answer: 0 },
        ],
      },
      {
        id: "vn-bz-03-interview", title: "Job Interview", titleVi: "Phỏng vấn xin việc", icon: "Briefcase", level: "B2",
        description: "Talk about experience, strengths and salary.",
        situations: [
          {
            title: "Introducing Your Experience", description: "Answering the first interview question.",
            dialogue: [
              { speaker: "Nhà tuyển dụng", line: "Bạn hãy giới thiệu về bản thân.", en: "Please introduce yourself." },
              { speaker: "Ứng viên", line: "Em có năm năm kinh nghiệm trong ngành marketing.", en: "I have five years of experience in marketing." },
              { speaker: "Nhà tuyển dụng", line: "Điểm mạnh của bạn là gì?", en: "What are your strengths?" },
              { speaker: "Ứng viên", line: "Em làm việc nhóm tốt và chịu được áp lực cao.", en: "I work well in teams and handle high pressure." },
            ],
          },
          {
            title: "Discussing Salary", description: "Negotiating politely.",
            culturalNote: "Salary is usually discussed near the end, in a modest and indirect way.",
            dialogue: [
              { speaker: "Nhà tuyển dụng", line: "Mức lương mong muốn của bạn là bao nhiêu?", en: "What is your expected salary?" },
              { speaker: "Ứng viên", line: "Em mong muốn khoảng hai mươi triệu một tháng ạ.", en: "I'm hoping for around 20 million a month." },
              { speaker: "Nhà tuyển dụng", line: "Chúng tôi sẽ cân nhắc và báo lại trong tuần này.", en: "We'll consider it and let you know this week." },
            ],
          },
        ],
        vocabulary: [
          { vi: "kinh nghiệm", en: "experience", example: "Tôi chưa có nhiều kinh nghiệm.", exampleEn: "I don't have much experience yet." },
          { vi: "điểm mạnh", en: "strength", example: "Điểm mạnh của tôi là kiên nhẫn.", exampleEn: "My strength is patience." },
          { vi: "áp lực", en: "pressure", example: "Công việc có nhiều áp lực.", exampleEn: "The job has a lot of pressure." },
          { vi: "mức lương", en: "salary level", example: "Mức lương rất cạnh tranh.", exampleEn: "The salary is very competitive." },
          { vi: "ứng viên", en: "candidate", example: "Có mười ứng viên.", exampleEn: "There are ten candidates." },
          { vi: "cân nhắc", en: "to consider", example: "Tôi sẽ cân nhắc đề nghị này.", exampleEn: "I'll consider this offer." },
        ],
        structures: [
          { pattern: "[Subject] + có + [number] + năm kinh nghiệm", explanation: "State your experience.", examples: [{ vi: "Chị ấy có mười năm kinh nghiệm.", en: "She has ten years of experience." }] },
          { pattern: "[Noun] + của + [owner] + là gì?", explanation: "Ask 'What is your...?'", examples: [{ vi: "Mục tiêu của bạn là gì?", en: "What is your goal?" }] },
        ],
        quiz: [
          { q: "'Kinh nghiệm' means...", options: ["Salary", "Experience", "Strength", "Candidate"], answer: 1 },
          { q: "'Hai mươi triệu' is...", options: ["2 million", "20 million", "200 million", "20 thousand"], answer: 1 },
          { q: "'Cân nhắc' means...", options: ["Reject", "Consider", "Sign", "Accept"], answer: 1 },
          { q: "'Điểm mạnh' means...", options: ["Weakness", "Strength", "Goal", "Skill"], answer: 1 },
        ],
      },
      {
        id: "vn-bz-04-negotiation", title: "Business Negotiation", titleVi: "Đàm phán kinh doanh", icon: "Handshake", level: "B2",
        description: "Discuss prices, deadlines and reach agreement.",
        situations: [
          {
            title: "Negotiating a Contract", description: "Discussing price with a supplier.",
            culturalNote: "Building trust (quan hệ) matters. A shared meal often comes before signing.",
            dialogue: [
              { speaker: "Bên mua", line: "Giá này hơi cao so với ngân sách của chúng tôi.", en: "This price is a bit high for our budget." },
              { speaker: "Bên bán", line: "Nếu anh đặt số lượng lớn, chúng tôi có thể giảm năm phần trăm.", en: "If you order in bulk, we can give a 5% discount." },
              { speaker: "Bên mua", line: "Còn thời gian giao hàng thì sao?", en: "And what about the delivery time?" },
              { speaker: "Bên bán", line: "Chúng tôi cam kết giao trong hai tuần.", en: "We commit to delivering within two weeks." },
              { speaker: "Bên mua", line: "Vậy chúng ta thống nhất như thế nhé.", en: "Then let's agree on that." },
            ],
          },
        ],
        vocabulary: [
          { vi: "ngân sách", en: "budget", example: "Ngân sách năm nay có hạn.", exampleEn: "This year's budget is limited." },
          { vi: "giảm giá", en: "discount", example: "Họ giảm giá mười phần trăm.", exampleEn: "They give a 10% discount." },
          { vi: "hợp đồng", en: "contract", example: "Hai bên đã ký hợp đồng.", exampleEn: "Both sides signed the contract." },
          { vi: "cam kết", en: "to commit", example: "Chúng tôi cam kết chất lượng.", exampleEn: "We commit to quality." },
          { vi: "thống nhất", en: "to agree", example: "Chúng ta đã thống nhất giá.", exampleEn: "We have agreed on the price." },
          { vi: "giao hàng", en: "delivery", example: "Giao hàng miễn phí.", exampleEn: "Free delivery." },
        ],
        structures: [
          { pattern: "Nếu + [condition], + [result]", explanation: "Conditional sentence.", examples: [{ vi: "Nếu trời mưa, chúng ta họp online.", en: "If it rains, we'll meet online." }] },
          { pattern: "Còn + [topic] + thì sao?", explanation: "Ask 'What about...?'", examples: [{ vi: "Còn chi phí vận chuyển thì sao?", en: "What about shipping costs?" }] },
        ],
        quiz: [
          { q: "'Ngân sách' means...", options: ["Contract", "Budget", "Invoice", "Profit"], answer: 1 },
          { q: "'Còn ... thì sao?' means...", options: ["What about...?", "Why...?", "When...?", "How much...?"], answer: 0 },
          { q: "'Hợp đồng' means...", options: ["Meeting", "Contract", "Partner", "Price"], answer: 1 },
          { q: "'Thống nhất' means...", options: ["Disagree", "Agree", "Delay", "Cancel"], answer: 1 },
        ],
      },
    ],
  },
  {
    id: "social", title: "Advanced Socializing", titleVi: "Giao tiếp xã hội",
    description: "Invitations, feelings, festivals and deeper conversations.",
    lessons: [
      {
        id: "vn-so-01-invitations", title: "Invitations & Plans", titleVi: "Mời & Hẹn gặp", icon: "CalendarHeart", level: "A2",
        description: "Invite friends, accept or decline politely.",
        situations: [
          {
            title: "Inviting a Friend", description: "Weekend coffee plans.",
            dialogue: [
              { speaker: "Hoa", line: "Cuối tuần này cậu có rảnh không?", en: "Are you free this weekend?" },
              { speaker: "Linh", line: "Có, sao thế?", en: "Yes, why?" },
              { speaker: "Hoa", line: "Mình đi uống cà phê ở Hồ Tây nhé.", en: "Let's get coffee at West Lake." },
              { speaker: "Linh", line: "Hay quá! Mấy giờ?", en: "Great! What time?" },
              { speaker: "Hoa", line: "Chín giờ sáng Chủ nhật nhé.", en: "Nine on Sunday morning." },
            ],
          },
          {
            title: "Declining Politely", description: "Saying no without offending.",
            culturalNote: "Vietnamese people often decline indirectly and suggest another time.",
            dialogue: [
              { speaker: "Nam", line: "Tối nay đi ăn lẩu với bọn mình không?", en: "Want to have hot pot with us tonight?" },
              { speaker: "Tú", line: "Tiếc quá, tối nay mình bận mất rồi.", en: "What a pity, I'm busy tonight." },
              { speaker: "Tú", line: "Hẹn cậu dịp khác nhé.", en: "Let's make it another time." },
            ],
          },
        ],
        vocabulary: [
          { vi: "cuối tuần", en: "weekend", example: "Cuối tuần tôi về quê.", exampleEn: "I go home at the weekend." },
          { vi: "mời", en: "to invite", example: "Tôi mời bạn ăn tối.", exampleEn: "I invite you to dinner." },
          { vi: "bận", en: "busy", example: "Hôm nay tôi rất bận.", exampleEn: "I'm very busy today." },
          { vi: "tiếc quá", en: "what a pity", example: "Tiếc quá, tôi không đi được.", exampleEn: "What a pity, I can't go." },
          { vi: "dịp khác", en: "another time", example: "Hẹn dịp khác nhé.", exampleEn: "See you another time." },
          { vi: "mấy giờ", en: "what time", example: "Mấy giờ phim bắt đầu?", exampleEn: "What time does the film start?" },
        ],
        structures: [
          { pattern: "Mình + [verb] + nhé", explanation: "Casual 'let's...'", examples: [{ vi: "Mình đi xem phim nhé.", en: "Let's watch a film." }] },
          { pattern: "[Subject] + bận + mất rồi", explanation: "Soft refusal: I'm already busy.", examples: [{ vi: "Hôm đó em bận mất rồi.", en: "I'm busy that day." }] },
        ],
        quiz: [
          { q: "'Tiếc quá' means...", options: ["Great!", "What a pity", "Thank you", "Sure"], answer: 1 },
          { q: "'Mấy giờ?' asks about...", options: ["Place", "Time", "Price", "Person"], answer: 1 },
          { q: "Vietnamese people often decline...", options: ["Very directly", "Indirectly", "By silence only", "In writing"], answer: 1 },
          { q: "'Cuối tuần' means...", options: ["Weekday", "Weekend", "Tonight", "Holiday"], answer: 1 },
        ],
      },
      {
        id: "vn-so-02-feelings", title: "Sharing Feelings", titleVi: "Chia sẻ cảm xúc", icon: "Heart", level: "B1",
        description: "Express emotions, comfort and encourage others.",
        situations: [
          {
            title: "Comforting a Friend", description: "A friend failed an exam.",
            dialogue: [
              { speaker: "Mai", line: "Sao trông cậu buồn thế?", en: "Why do you look so sad?" },
              { speaker: "Hùng", line: "Mình vừa trượt kỳ thi lái xe.", en: "I just failed my driving test." },
              { speaker: "Mai", line: "Đừng buồn nữa, lần sau cậu sẽ làm tốt hơn.", en: "Don't be sad, you'll do better next time." },
              { speaker: "Hùng", line: "Cảm ơn cậu đã động viên mình.", en: "Thanks for encouraging me." },
            ],
          },
          {
            title: "Sharing Good News", description: "Celebrating a promotion.",
            dialogue: [
              { speaker: "Thảo", line: "Mình được thăng chức rồi!", en: "I got promoted!" },
              { speaker: "Quân", line: "Thật à? Chúc mừng cậu nhé!", en: "Really? Congratulations!" },
              { speaker: "Thảo", line: "Mình vui lắm, cố gắng mãi mới được.", en: "I'm so happy, it took a lot of effort." },
            ],
          },
        ],
        vocabulary: [
          { vi: "buồn", en: "sad", example: "Tôi hơi buồn hôm nay.", exampleEn: "I'm a bit sad today." },
          { vi: "vui", en: "happy", example: "Gặp bạn tôi rất vui.", exampleEn: "I'm happy to see you." },
          { vi: "động viên", en: "to encourage", example: "Bố mẹ luôn động viên tôi.", exampleEn: "My parents always encourage me." },
          { vi: "chúc mừng", en: "congratulations", example: "Chúc mừng sinh nhật!", exampleEn: "Happy birthday!" },
          { vi: "cố gắng", en: "to try hard", example: "Hãy cố gắng lên!", exampleEn: "Keep trying!" },
          { vi: "lo lắng", en: "worried", example: "Đừng lo lắng quá.", exampleEn: "Don't worry too much." },
        ],
        structures: [
          { pattern: "Đừng + [verb/adj] + nữa", explanation: "Stop doing / feeling something.", examples: [{ vi: "Đừng khóc nữa.", en: "Stop crying." }] },
          { pattern: "[Subject] + vừa + [verb]", explanation: "Just did something.", examples: [{ vi: "Tôi vừa ăn xong.", en: "I just finished eating." }] },
        ],
        quiz: [
          { q: "'Chúc mừng' means...", options: ["Sorry", "Congratulations", "Goodbye", "Thanks"], answer: 1 },
          { q: "'Vừa' indicates...", options: ["Just happened", "Future", "Never", "Always"], answer: 0 },
          { q: "'Động viên' means...", options: ["Criticise", "Encourage", "Ignore", "Blame"], answer: 1 },
          { q: "'Đừng buồn nữa' means...", options: ["Be happy later", "Don't be sad anymore", "I'm sad", "Why sad?"], answer: 1 },
        ],
      },
      {
        id: "vn-so-03-tet", title: "Tết & Festivals", titleVi: "Tết & Lễ hội", icon: "Sparkles", level: "B1",
        description: "Exchange New Year wishes and talk about traditions.",
        situations: [
          {
            title: "New Year Wishes", description: "Visiting a family during Tết.",
            culturalNote: "Children receive lucky money (lì xì) in red envelopes after wishing elders a happy new year.",
            dialogue: [
              { speaker: "Khách", line: "Chúc mừng năm mới! Chúc bác sức khỏe dồi dào.", en: "Happy New Year! Wishing you great health." },
              { speaker: "Bác", line: "Cảm ơn cháu. Chúc cháu học giỏi, vạn sự như ý.", en: "Thank you. Wishing you good studies and all the best." },
              { speaker: "Bác", line: "Bác lì xì cho cháu lấy may nhé.", en: "Here's some lucky money for you." },
              { speaker: "Khách", line: "Dạ, cháu cảm ơn bác ạ.", en: "Thank you very much." },
            ],
          },
        ],
        vocabulary: [
          { vi: "năm mới", en: "new year", example: "Năm mới vui vẻ!", exampleEn: "Happy new year!" },
          { vi: "lì xì", en: "lucky money", example: "Trẻ em thích được lì xì.", exampleEn: "Children love lucky money." },
          { vi: "sức khỏe", en: "health", example: "Sức khỏe là quan trọng nhất.", exampleEn: "Health is the most important." },
          { vi: "vạn sự như ý", en: "may all go as you wish", example: "Chúc anh vạn sự như ý.", exampleEn: "May everything go as you wish." },
          { vi: "bánh chưng", en: "square sticky rice cake", example: "Nhà tôi gói bánh chưng.", exampleEn: "My family wraps banh chung." },
          { vi: "đi chúc Tết", en: "to visit for Tết wishes", example: "Mùng hai tôi đi chúc Tết.", exampleEn: "On day two I visit for Tết." },
        ],
        structures: [
          { pattern: "Chúc + [person] + [wish]", explanation: "Give a wish.", examples: [{ vi: "Chúc chị thành công.", en: "Wishing you success." }] },
        ],
        quiz: [
          { q: "'Lì xì' is...", options: ["Firework", "Lucky money", "Rice cake", "Flower"], answer: 1 },
          { q: "'Chúc mừng năm mới' means...", options: ["Happy birthday", "Happy New Year", "Merry Christmas", "Good luck"], answer: 1 },
          { q: "'Sức khỏe' means...", options: ["Wealth", "Health", "Luck", "Family"], answer: 1 },
          { q: "Which is a Tết food?", options: ["Phở", "Bánh chưng", "Bánh mì", "Chè"], answer: 1 },
        ],
      },
      {
        id: "vn-so-04-opinions", title: "Discussing Opinions", titleVi: "Trao đổi quan điểm", icon: "MessagesSquare", level: "B2",
        description: "Agree, disagree and give reasons in a discussion.",
        situations: [
          {
            title: "City or Countryside?", description: "Two friends debate where to live.",
            dialogue: [
              { speaker: "An", line: "Theo mình, sống ở thành phố có nhiều cơ hội hơn.", en: "In my opinion, city life offers more opportunities." },
              { speaker: "Bình", line: "Mình đồng ý một phần, nhưng ở quê không khí trong lành hơn.", en: "I partly agree, but the countryside has cleaner air." },
              { speaker: "An", line: "Đúng vậy, tuy nhiên ở quê khó tìm việc.", en: "True, however it's hard to find work there." },
              { speaker: "Bình", line: "Bây giờ làm việc từ xa cũng phổ biến rồi mà.", en: "Remote work is common now, though." },
            ],
          },
        ],
        vocabulary: [
          { vi: "theo tôi", en: "in my opinion", example: "Theo tôi, ý kiến này hay.", exampleEn: "In my opinion, this idea is good." },
          { vi: "đồng ý", en: "to agree", example: "Tôi hoàn toàn đồng ý.", exampleEn: "I totally agree." },
          { vi: "tuy nhiên", en: "however", example: "Tuy nhiên, vẫn còn vấn đề.", exampleEn: "However, there are still problems." },
          { vi: "cơ hội", en: "opportunity", example: "Đây là cơ hội tốt.", exampleEn: "This is a good opportunity." },
          { vi: "phổ biến", en: "popular, common", example: "Món này rất phổ biến.", exampleEn: "This dish is very common." },
          { vi: "làm việc từ xa", en: "remote work", example: "Tôi làm việc từ xa.", exampleEn: "I work remotely." },
        ],
        structures: [
          { pattern: "Theo + [person], + [opinion]", explanation: "State an opinion.", examples: [{ vi: "Theo chị, nên chọn cái nào?", en: "In your view, which should we choose?" }] },
          { pattern: "[Clause], tuy nhiên + [contrast]", explanation: "Contrast ideas.", examples: [{ vi: "Nhà đẹp, tuy nhiên hơi xa.", en: "The house is nice, however a bit far." }] },
        ],
        quiz: [
          { q: "'Theo tôi' means...", options: ["Follow me", "In my opinion", "After me", "With me"], answer: 1 },
          { q: "'Tuy nhiên' means...", options: ["Because", "However", "So", "And"], answer: 1 },
          { q: "'Đồng ý một phần' means...", options: ["Totally agree", "Partly agree", "Disagree", "No idea"], answer: 1 },
          { q: "'Cơ hội' means...", options: ["Problem", "Opportunity", "Salary", "Place"], answer: 1 },
        ],
      },
    ],
  },
];

export const allVietnameseConvLessons = vietnameseConversationalPillars.flatMap((p) => p.lessons);
export const getVietnameseConvLessonById = (id: string) => allVietnameseConvLessons.find((l) => l.id === id) ?? null;
export const getVietnamesePillarByLessonId = (id: string) => vietnameseConversationalPillars.find((p) => p.lessons.some((l) => l.id === id)) ?? null;
