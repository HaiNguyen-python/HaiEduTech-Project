// Conversational English curriculum data organized into 3 pillars
// Each lesson includes key situations, vocabulary/slang, and listening challenge prompts

export interface ConvVocabEntry {
  term: string;
  meaning: string; // Vietnamese
  meaningEn: string;
  type: "idiom" | "phrasal-verb" | "slang" | "expression";
  example: string;
  exampleVi: string;
}

export interface KeySituation {
  title: string;
  titleVi: string;
  description: string;
  descriptionVi: string;
  sampleDialogue: { speaker: string; line: string }[];
}

export interface ListeningChallenge {
  title: string;
  titleVi: string;
  transcript: string;
  questions: { q: string; qVi: string; options: string[]; answer: number }[];
}

export interface ConvLesson {
  id: string;
  title: string;
  titleVi: string;
  icon: string; // Lucide icon name
  description: string;
  descriptionVi: string;
  keySituations: KeySituation[];
  vocabulary: ConvVocabEntry[];
  listeningChallenge: ListeningChallenge;
  speakingTopics: string[]; // Topics for AI Roleplay
  badge: string;
  badgeVi: string;
}

export interface ConvPillar {
  id: string;
  title: string;
  titleVi: string;
  icon: string;
  color: string;
  description: string;
  descriptionVi: string;
  lessons: ConvLesson[];
}

export const conversationalPillars: ConvPillar[] = [
  // ═══════════════════════════════════════════
  // PILLAR 1: LIFE SKILLS (Daily Life)
  // ═══════════════════════════════════════════
  {
    id: "life-skills",
    title: "Life Skills",
    titleVi: "Kỹ năng Đời sống",
    icon: "Coffee",
    color: "from-emerald-500 to-teal-500",
    description: "Survival English for real-world daily situations",
    descriptionVi: "Tiếng Anh sinh tồn cho các tình huống hàng ngày",
    lessons: [
      {
        id: "ls-01-shopping",
        title: "Shopping & Bargaining",
        titleVi: "Mua sắm & Trả giá",
        icon: "ShoppingBag",
        description: "Navigate stores, compare prices, return items",
        descriptionVi: "Tự tin mua sắm, so sánh giá và đổi trả hàng",
        badge: "Shopping Pro",
        badgeVi: "Bậc thầy Mua sắm",
        keySituations: [
          {
            title: "At the Shopping Mall",
            titleVi: "Tại Trung tâm Thương mại",
            description: "Asking for sizes, colors, and discounts",
            descriptionVi: "Hỏi về kích cỡ, màu sắc và giảm giá",
            sampleDialogue: [
              { speaker: "You", line: "Excuse me, do you have this in a medium?" },
              { speaker: "Staff", line: "Let me check. We have it in blue and black." },
              { speaker: "You", line: "Is there any discount if I buy two?" },
              { speaker: "Staff", line: "Yes, you get 15% off the second item." },
            ],
          },
          {
            title: "Returning an Item",
            titleVi: "Đổi trả hàng",
            description: "Handling returns and exchanges politely",
            descriptionVi: "Xử lý đổi trả hàng một cách lịch sự",
            sampleDialogue: [
              { speaker: "You", line: "Hi, I'd like to return this jacket. It doesn't fit." },
              { speaker: "Staff", line: "Do you have the receipt?" },
              { speaker: "You", line: "Yes, here it is. Can I exchange it for a larger size?" },
              { speaker: "Staff", line: "Of course. Let me find one for you." },
            ],
          },
        ],
        vocabulary: [
          { term: "window shopping", meaning: "đi xem hàng (không mua)", meaningEn: "looking at items without buying", type: "expression", example: "Let's go window shopping this weekend.", exampleVi: "Cuối tuần mình đi dạo xem hàng nhé." },
          { term: "a steal", meaning: "món hời", meaningEn: "a great bargain", type: "slang", example: "This bag was a steal at only $10!", exampleVi: "Cái túi này chỉ $10, hời quá!" },
          { term: "try on", meaning: "thử (quần áo)", meaningEn: "to put on clothing to test fit", type: "phrasal-verb", example: "Can I try on these shoes?", exampleVi: "Cho tôi thử đôi giày này được không?" },
          { term: "rip someone off", meaning: "chặt chém, bán đắt", meaningEn: "to overcharge someone", type: "phrasal-verb", example: "That shop ripped me off — $50 for a t-shirt!", exampleVi: "Cửa hàng đó chặt chém tôi — $50 cho một cái áo thun!" },
          { term: "bang for your buck", meaning: "đáng đồng tiền bát gạo", meaningEn: "value for money", type: "idiom", example: "This phone gives great bang for your buck.", exampleVi: "Cái điện thoại này rất đáng đồng tiền." },
        ],
        listeningChallenge: {
          title: "At the Checkout Counter",
          titleVi: "Tại quầy thanh toán",
          transcript: "Staff: That'll be $45.99. Would you like a bag? Customer: Yes, please. Can I pay by card? Staff: Sure, tap or insert. Would you like the receipt emailed? Customer: Email is fine, thanks.",
          questions: [
            { q: "How much is the total?", qVi: "Tổng tiền là bao nhiêu?", options: ["$45.99", "$49.95", "$54.99", "$40.59"], answer: 0 },
            { q: "How does the customer want to receive the receipt?", qVi: "Khách hàng muốn nhận hóa đơn bằng cách nào?", options: ["Printed", "By email", "No receipt", "By text"], answer: 1 },
          ],
        },
        speakingTopics: ["Describe your favorite shopping experience", "Role-play: You want to return a defective item", "Negotiate a price at a local market"],
      },
      {
        id: "ls-02-dining",
        title: "Dining Out",
        titleVi: "Đi ăn ngoài",
        icon: "UtensilsCrossed",
        description: "Order food, handle dietary needs, split bills",
        descriptionVi: "Gọi món, xử lý nhu cầu ăn kiêng, chia hóa đơn",
        badge: "Dining Master",
        badgeVi: "Bậc thầy Ẩm thực",
        keySituations: [
          {
            title: "Ordering at a Restaurant",
            titleVi: "Gọi món tại Nhà hàng",
            description: "Reading menus, asking for recommendations",
            descriptionVi: "Đọc thực đơn, hỏi gợi ý món ăn",
            sampleDialogue: [
              { speaker: "Waiter", line: "Are you ready to order?" },
              { speaker: "You", line: "What do you recommend?" },
              { speaker: "Waiter", line: "The grilled salmon is our best seller." },
              { speaker: "You", line: "I'll have that, please. And a glass of water." },
            ],
          },
        ],
        vocabulary: [
          { term: "on the house", meaning: "miễn phí (nhà hàng mời)", meaningEn: "free of charge", type: "idiom", example: "The dessert is on the house tonight!", exampleVi: "Tối nay tráng miệng miễn phí nhé!" },
          { term: "grab a bite", meaning: "ăn nhanh cái gì đó", meaningEn: "eat something quickly", type: "idiom", example: "Want to grab a bite before the movie?", exampleVi: "Muốn ăn gì nhanh trước khi xem phim không?" },
          { term: "doggy bag", meaning: "hộp mang phần ăn thừa về", meaningEn: "container for leftover food", type: "expression", example: "Can I get a doggy bag for the rest?", exampleVi: "Cho tôi hộp mang phần còn lại về được không?" },
          { term: "split the bill", meaning: "chia hóa đơn", meaningEn: "divide payment equally", type: "expression", example: "Should we split the bill?", exampleVi: "Mình chia hóa đơn nhé?" },
        ],
        listeningChallenge: {
          title: "Making a Reservation",
          titleVi: "Đặt bàn nhà hàng",
          transcript: "Host: Good evening, how can I help? Caller: I'd like a table for four on Friday at 7pm. Host: Let me check... We have a spot at 7:30. Caller: That works. Under the name Johnson, please.",
          questions: [
            { q: "How many people is the reservation for?", qVi: "Đặt bàn cho bao nhiêu người?", options: ["2", "3", "4", "5"], answer: 2 },
            { q: "What time was available?", qVi: "Giờ nào còn trống?", options: ["7:00", "7:15", "7:30", "8:00"], answer: 2 },
          ],
        },
        speakingTopics: ["Describe your favorite restaurant", "Role-play: Complain politely about cold food", "Explain Vietnamese cuisine to a foreigner"],
      },
      {
        id: "ls-03-directions",
        title: "Asking for Directions",
        titleVi: "Hỏi đường",
        icon: "MapPin",
        description: "Navigate cities, use public transport, read maps",
        descriptionVi: "Di chuyển trong thành phố, dùng phương tiện công cộng",
        badge: "Navigator",
        badgeVi: "Hoa tiêu",
        keySituations: [
          {
            title: "Lost in the City",
            titleVi: "Lạc đường trong Thành phố",
            description: "Asking strangers for directions politely",
            descriptionVi: "Hỏi đường người lạ một cách lịch sự",
            sampleDialogue: [
              { speaker: "You", line: "Excuse me, could you tell me how to get to the museum?" },
              { speaker: "Local", line: "Sure! Go straight for two blocks, then turn left." },
              { speaker: "You", line: "Is it within walking distance?" },
              { speaker: "Local", line: "About 10 minutes on foot, or take the bus — stop is right there." },
            ],
          },
        ],
        vocabulary: [
          { term: "around the corner", meaning: "quanh góc (rất gần)", meaningEn: "very close by", type: "idiom", example: "The pharmacy is just around the corner.", exampleVi: "Nhà thuốc ngay quanh góc thôi." },
          { term: "take the scenic route", meaning: "đi đường dài ngắm cảnh", meaningEn: "go the longer, prettier way", type: "idiom", example: "Let's take the scenic route along the river.", exampleVi: "Mình đi đường dọc sông ngắm cảnh đi." },
          { term: "get around", meaning: "di chuyển", meaningEn: "move from place to place", type: "phrasal-verb", example: "It's easy to get around by subway here.", exampleVi: "Đi tàu điện ngầm ở đây rất dễ di chuyển." },
        ],
        listeningChallenge: {
          title: "At the Train Station",
          titleVi: "Tại ga tàu",
          transcript: "Announcement: The 3:15 train to Oxford is now boarding on Platform 4. Please have your tickets ready. The next train to London departs at 3:45 from Platform 2.",
          questions: [
            { q: "Which platform is the Oxford train on?", qVi: "Tàu đi Oxford ở sân ga nào?", options: ["Platform 1", "Platform 2", "Platform 3", "Platform 4"], answer: 3 },
            { q: "When does the London train depart?", qVi: "Tàu đi London khởi hành lúc mấy giờ?", options: ["3:00", "3:15", "3:30", "3:45"], answer: 3 },
          ],
        },
        speakingTopics: ["Give directions from your home to the nearest supermarket", "Describe your daily commute", "Role-play: Ask a bus driver which stop to get off"],
      },
      {
        id: "ls-04-socializing",
        title: "Making Friends & Small Talk",
        titleVi: "Kết bạn & Trò chuyện xã giao",
        icon: "Users",
        description: "Break the ice, keep conversations going, be likeable",
        descriptionVi: "Phá băng, duy trì cuộc trò chuyện, tạo thiện cảm",
        badge: "Social Butterfly",
        badgeVi: "Bướm Xã giao",
        keySituations: [
          {
            title: "At a Party",
            titleVi: "Tại bữa tiệc",
            description: "Starting and maintaining casual conversations",
            descriptionVi: "Bắt đầu và duy trì cuộc trò chuyện thoải mái",
            sampleDialogue: [
              { speaker: "You", line: "Hi! I don't think we've met. I'm Linh." },
              { speaker: "New Friend", line: "Hey Linh! I'm Jake. How do you know the host?" },
              { speaker: "You", line: "We're colleagues. What about you?" },
              { speaker: "New Friend", line: "Old college friends. So, what do you do?" },
            ],
          },
        ],
        vocabulary: [
          { term: "break the ice", meaning: "phá băng, bắt đầu cuộc trò chuyện", meaningEn: "start a conversation in a social situation", type: "idiom", example: "A joke is a great way to break the ice.", exampleVi: "Một câu đùa là cách tuyệt vời để phá băng." },
          { term: "hit it off", meaning: "hợp nhau ngay từ đầu", meaningEn: "get along well immediately", type: "idiom", example: "We hit it off at the party last night.", exampleVi: "Chúng mình hợp nhau ngay ở buổi tiệc tối qua." },
          { term: "catch up", meaning: "gặp lại để nói chuyện", meaningEn: "meet to share news after time apart", type: "phrasal-verb", example: "Let's catch up over coffee sometime.", exampleVi: "Hẹn gặp uống cà phê nói chuyện nhé." },
          { term: "hang out", meaning: "đi chơi, dành thời gian cùng nhau", meaningEn: "spend time together casually", type: "phrasal-verb", example: "Want to hang out this weekend?", exampleVi: "Cuối tuần muốn đi chơi không?" },
        ],
        listeningChallenge: {
          title: "Meeting a New Neighbor",
          titleVi: "Gặp hàng xóm mới",
          transcript: "A: Hi there! Are you the new neighbor? B: Yes, I just moved in last week. I'm Sarah. A: Welcome! I'm Tom from next door. If you need anything, just knock. B: That's so kind, thanks! Do you know any good restaurants nearby?",
          questions: [
            { q: "When did Sarah move in?", qVi: "Sarah chuyển đến khi nào?", options: ["Yesterday", "Last month", "Last week", "Two weeks ago"], answer: 2 },
          ],
        },
        speakingTopics: ["Introduce yourself to a new coworker", "Make small talk about the weather and hobbies", "Role-play: Meeting someone at a coffee shop"],
      },
      {
        id: "ls-05-health",
        title: "Health & Fitness",
        titleVi: "Sức khỏe & Thể dục",
        icon: "Heart",
        description: "Doctor visits, describing symptoms, gym conversations",
        descriptionVi: "Khám bác sĩ, mô tả triệu chứng, trò chuyện tại phòng gym",
        badge: "Wellness Guru",
        badgeVi: "Chuyên gia Sức khỏe",
        keySituations: [
          {
            title: "At the Doctor's Office",
            titleVi: "Tại Phòng khám",
            description: "Describing symptoms and understanding prescriptions",
            descriptionVi: "Mô tả triệu chứng và hiểu đơn thuốc",
            sampleDialogue: [
              { speaker: "Doctor", line: "What seems to be the problem?" },
              { speaker: "You", line: "I've had a sore throat and a headache for three days." },
              { speaker: "Doctor", line: "Any fever?" },
              { speaker: "You", line: "A slight one, around 37.5 degrees." },
            ],
          },
        ],
        vocabulary: [
          { term: "under the weather", meaning: "ốm nhẹ, không khỏe", meaningEn: "feeling slightly ill", type: "idiom", example: "I'm feeling under the weather today.", exampleVi: "Hôm nay tôi hơi ốm." },
          { term: "work out", meaning: "tập thể dục", meaningEn: "to exercise", type: "phrasal-verb", example: "I work out three times a week.", exampleVi: "Tôi tập thể dục ba lần một tuần." },
          { term: "pull a muscle", meaning: "bị căng cơ", meaningEn: "strain a muscle", type: "expression", example: "I pulled a muscle during yoga.", exampleVi: "Tôi bị căng cơ khi tập yoga." },
        ],
        listeningChallenge: {
          title: "Pharmacy Visit",
          titleVi: "Đến nhà thuốc",
          transcript: "Pharmacist: How can I help? Customer: I need something for a cold. Pharmacist: I recommend this — take two tablets every 6 hours with food. Customer: Any side effects? Pharmacist: It may cause drowsiness.",
          questions: [
            { q: "How often should the medication be taken?", qVi: "Thuốc uống cách bao lâu?", options: ["Every 4 hours", "Every 6 hours", "Twice a day", "Once a day"], answer: 1 },
          ],
        },
        speakingTopics: ["Describe your fitness routine", "Role-play: Call to book a doctor appointment", "Explain healthy eating habits"],
      },
      {
        id: "ls-06-digital-life",
        title: "Digital Life & Social Media",
        titleVi: "Đời sống Số & Mạng xã hội",
        icon: "Smartphone",
        description: "Online communication, tech talk, digital etiquette",
        descriptionVi: "Giao tiếp online, nói về công nghệ, phép lịch sự số",
        badge: "Digital Native",
        badgeVi: "Công dân Số",
        keySituations: [
          {
            title: "Tech Support Call",
            titleVi: "Gọi Hỗ trợ Kỹ thuật",
            description: "Explaining tech problems over the phone",
            descriptionVi: "Giải thích vấn đề công nghệ qua điện thoại",
            sampleDialogue: [
              { speaker: "Support", line: "Thank you for calling. What's the issue?" },
              { speaker: "You", line: "My internet has been really slow since yesterday." },
              { speaker: "Support", line: "Have you tried restarting your router?" },
              { speaker: "You", line: "Yes, I did, but it didn't help." },
            ],
          },
        ],
        vocabulary: [
          { term: "go viral", meaning: "lan truyền nhanh chóng", meaningEn: "spread rapidly on social media", type: "slang", example: "That video went viral overnight!", exampleVi: "Video đó viral chỉ sau một đêm!" },
          { term: "scroll through", meaning: "lướt (mạng xã hội)", meaningEn: "browse content quickly", type: "phrasal-verb", example: "I spent an hour scrolling through Instagram.", exampleVi: "Tôi lướt Instagram cả tiếng đồng hồ." },
          { term: "catfish", meaning: "giả mạo danh tính online", meaningEn: "fake identity online", type: "slang", example: "She realized she was being catfished.", exampleVi: "Cô ấy nhận ra mình bị lừa bởi tài khoản giả." },
        ],
        listeningChallenge: {
          title: "Setting Up a New Phone",
          titleVi: "Cài đặt Điện thoại mới",
          transcript: "Agent: First, insert your SIM card. Then power on the device. You'll be prompted to connect to Wi-Fi. After that, sign in with your Google or Apple account to restore your data.",
          questions: [
            { q: "What's the first step?", qVi: "Bước đầu tiên là gì?", options: ["Connect Wi-Fi", "Sign in", "Insert SIM card", "Restore data"], answer: 2 },
          ],
        },
        speakingTopics: ["Discuss pros and cons of social media", "Role-play: Explain a tech problem to support", "Describe your favorite app and why"],
      },
      {
        id: "ls-07-travel",
        title: "Travel & Tourism",
        titleVi: "Du lịch & Tham quan",
        icon: "Plane",
        description: "Airports, hotels, sightseeing, travel emergencies",
        descriptionVi: "Sân bay, khách sạn, tham quan, tình huống khẩn cấp khi du lịch",
        badge: "Globe Trotter",
        badgeVi: "Lữ khách Toàn cầu",
        keySituations: [
          {
            title: "At the Airport Check-in Counter",
            titleVi: "Tại quầy Check-in Sân bay",
            description: "Checking in, handling baggage, boarding",
            descriptionVi: "Làm thủ tục, xử lý hành lý, lên máy bay",
            sampleDialogue: [
              { speaker: "Agent", line: "Passport and booking confirmation, please." },
              { speaker: "You", line: "Here you go. Can I get a window seat?" },
              { speaker: "Agent", line: "Sure. Any checked baggage?" },
              { speaker: "You", line: "Just one suitcase, please." },
            ],
          },
        ],
        vocabulary: [
          { term: "jet lag", meaning: "lệch múi giờ", meaningEn: "tiredness from time zone change", type: "expression", example: "I'm still dealing with jet lag.", exampleVi: "Tôi vẫn đang bị lệch múi giờ." },
          { term: "off the beaten path", meaning: "nơi ít người biết đến", meaningEn: "a less popular destination", type: "idiom", example: "We found a café off the beaten path.", exampleVi: "Chúng tôi tìm được một quán cà phê ít người biết." },
          { term: "check in / check out", meaning: "nhận phòng / trả phòng", meaningEn: "register/leave a hotel", type: "phrasal-verb", example: "Check-out is at 11 AM.", exampleVi: "Trả phòng lúc 11 giờ sáng." },
        ],
        listeningChallenge: {
          title: "Hotel Check-in",
          titleVi: "Nhận phòng Khách sạn",
          transcript: "Receptionist: Welcome! Do you have a reservation? Guest: Yes, under the name Nguyen. Receptionist: I see it — a double room for 3 nights. Breakfast is from 7 to 9 AM. Guest: Is there a pool? Receptionist: Yes, on the 5th floor. Open till 10 PM.",
          questions: [
            { q: "How many nights is the reservation?", qVi: "Đặt phòng mấy đêm?", options: ["1", "2", "3", "4"], answer: 2 },
            { q: "Where is the pool?", qVi: "Hồ bơi ở đâu?", options: ["3rd floor", "4th floor", "5th floor", "Rooftop"], answer: 2 },
          ],
        },
        speakingTopics: ["Describe your dream vacation", "Role-play: Complain about a noisy hotel room", "Give a travel recommendation for Vietnam"],
      },
      {
        id: "ls-08-emergency",
        title: "Emergencies & Safety",
        titleVi: "Tình huống Khẩn cấp & An toàn",
        icon: "AlertTriangle",
        description: "Emergency calls, accidents, asking for urgent help",
        descriptionVi: "Gọi cấp cứu, tai nạn, xin giúp đỡ khẩn cấp",
        badge: "Safety First",
        badgeVi: "An toàn Trước tiên",
        keySituations: [
          {
            title: "Calling Emergency Services",
            titleVi: "Gọi Dịch vụ Cấp cứu",
            description: "Reporting an emergency clearly and calmly",
            descriptionVi: "Báo cáo tình huống khẩn cấp rõ ràng và bình tĩnh",
            sampleDialogue: [
              { speaker: "Operator", line: "911, what's your emergency?" },
              { speaker: "You", line: "There's been a car accident on Main Street." },
              { speaker: "Operator", line: "Is anyone injured?" },
              { speaker: "You", line: "Yes, one person is hurt. Please send an ambulance." },
            ],
          },
        ],
        vocabulary: [
          { term: "call for help", meaning: "kêu cứu", meaningEn: "request emergency assistance", type: "expression", example: "Someone call for help!", exampleVi: "Ai đó gọi cứu trợ đi!" },
          { term: "first aid", meaning: "sơ cứu", meaningEn: "initial medical treatment", type: "expression", example: "Does anyone know first aid?", exampleVi: "Có ai biết sơ cứu không?" },
        ],
        listeningChallenge: {
          title: "Fire Safety Announcement",
          titleVi: "Thông báo An toàn Cháy nổ",
          transcript: "Attention please: This is a fire drill. Please proceed to the nearest exit calmly. Do not use the elevators. Assembly point is the parking lot.",
          questions: [
            { q: "What should people NOT use?", qVi: "Không được sử dụng gì?", options: ["Stairs", "Exits", "Elevators", "Fire extinguisher"], answer: 2 },
          ],
        },
        speakingTopics: ["Describe an emergency you witnessed", "Role-play: Report a lost passport at the embassy", "Explain basic first aid steps"],
      },
      {
        id: "ls-09-housing",
        title: "Renting & Housing",
        titleVi: "Thuê nhà & Nhà ở",
        icon: "Home",
        description: "Apartment hunting, talking to landlords, home maintenance",
        descriptionVi: "Tìm nhà, nói chuyện với chủ nhà, bảo trì nhà cửa",
        badge: "Home Sweet Home",
        badgeVi: "Tổ ấm",
        keySituations: [
          {
            title: "Viewing an Apartment",
            titleVi: "Xem nhà",
            description: "Asking questions during a property viewing",
            descriptionVi: "Hỏi các câu hỏi khi đi xem nhà",
            sampleDialogue: [
              { speaker: "You", line: "How much is the rent per month?" },
              { speaker: "Landlord", line: "$1,200 including utilities." },
              { speaker: "You", line: "Is there a deposit?" },
              { speaker: "Landlord", line: "Yes, two months' rent upfront." },
            ],
          },
        ],
        vocabulary: [
          { term: "move in / move out", meaning: "dọn vào / dọn ra", meaningEn: "start/stop living somewhere", type: "phrasal-verb", example: "We moved in last Saturday.", exampleVi: "Chúng tôi dọn vào thứ Bảy tuần rước." },
          { term: "settle in", meaning: "ổn định", meaningEn: "become comfortable in a new place", type: "phrasal-verb", example: "It took a month to settle in.", exampleVi: "Mất một tháng để ổn định." },
        ],
        listeningChallenge: {
          title: "Landlord's Rules",
          titleVi: "Nội quy của Chủ nhà",
          transcript: "Landlord: No pets allowed. Rent is due on the 1st of every month. Quiet hours are from 10 PM to 7 AM. Any maintenance issues, text me first.",
          questions: [
            { q: "When is rent due?", qVi: "Tiền thuê đến hạn khi nào?", options: ["15th", "Last day", "1st", "5th"], answer: 2 },
          ],
        },
        speakingTopics: ["Describe your ideal apartment", "Role-play: Negotiate lower rent with a landlord", "Compare renting vs buying a home"],
      },
      {
        id: "ls-10-banking",
        title: "Banking & Money",
        titleVi: "Ngân hàng & Tiền bạc",
        icon: "Banknote",
        description: "Opening accounts, exchanging money, handling transactions",
        descriptionVi: "Mở tài khoản, đổi tiền, xử lý giao dịch",
        badge: "Money Smart",
        badgeVi: "Thông minh Tài chính",
        keySituations: [
          {
            title: "At the Bank",
            titleVi: "Tại Ngân hàng",
            description: "Opening an account and asking about services",
            descriptionVi: "Mở tài khoản và hỏi về các dịch vụ",
            sampleDialogue: [
              { speaker: "Teller", line: "How can I help you today?" },
              { speaker: "You", line: "I'd like to open a savings account." },
              { speaker: "Teller", line: "Sure. I'll need your ID and proof of address." },
            ],
          },
        ],
        vocabulary: [
          { term: "break the bank", meaning: "tốn rất nhiều tiền", meaningEn: "cost too much money", type: "idiom", example: "This vacation won't break the bank.", exampleVi: "Chuyến du lịch này không tốn nhiều tiền đâu." },
          { term: "save up", meaning: "tiết kiệm tiền cho mục đích nào đó", meaningEn: "accumulate money for a purpose", type: "phrasal-verb", example: "I'm saving up for a new laptop.", exampleVi: "Tôi đang tiết kiệm để mua laptop mới." },
        ],
        listeningChallenge: {
          title: "Currency Exchange",
          titleVi: "Đổi ngoại tệ",
          transcript: "Clerk: Today's rate is 1 USD to 24,500 VND. How much would you like to exchange? Customer: $200, please. Clerk: That'll be 4,900,000 VND. There's a 1% service fee.",
          questions: [
            { q: "What is the exchange rate?", qVi: "Tỷ giá bao nhiêu?", options: ["24,000 VND", "24,500 VND", "25,000 VND", "23,500 VND"], answer: 1 },
          ],
        },
        speakingTopics: ["Discuss tips for saving money", "Role-play: Report a lost credit card", "Explain the concept of budgeting"],
      },
    ],
  },

  // ═══════════════════════════════════════════
  // PILLAR 2: PROFESSIONAL ENGLISH (Work)
  // ═══════════════════════════════════════════
  {
    id: "professional",
    title: "Professional English",
    titleVi: "Tiếng Anh Chuyên nghiệp",
    icon: "Briefcase",
    color: "from-blue-500 to-indigo-500",
    description: "Master English for the workplace and career growth",
    descriptionVi: "Làm chủ tiếng Anh nơi công sở và phát triển sự nghiệp",
    lessons: [
      {
        id: "pro-01-interviews",
        title: "Job Interviews",
        titleVi: "Phỏng vấn Xin việc",
        icon: "UserCheck",
        description: "Answer common questions confidently and professionally",
        descriptionVi: "Trả lời câu hỏi phỏng vấn tự tin và chuyên nghiệp",
        badge: "Interview Ready",
        badgeVi: "Sẵn sàng Phỏng vấn",
        keySituations: [
          {
            title: "The Classic Interview",
            titleVi: "Buổi Phỏng vấn Kinh điển",
            description: "Answering 'Tell me about yourself' and behavioral questions",
            descriptionVi: "Trả lời 'Hãy giới thiệu bản thân' và câu hỏi hành vi",
            sampleDialogue: [
              { speaker: "Interviewer", line: "Tell me about yourself." },
              { speaker: "You", line: "I'm a marketing professional with 3 years of experience in digital campaigns. I specialize in social media strategy and data analytics." },
              { speaker: "Interviewer", line: "What's your greatest strength?" },
              { speaker: "You", line: "I'm highly adaptable — I thrive in fast-changing environments." },
            ],
          },
        ],
        vocabulary: [
          { term: "land a job", meaning: "kiếm được việc", meaningEn: "successfully get a job", type: "idiom", example: "She landed a job at Google!", exampleVi: "Cô ấy kiếm được việc ở Google!" },
          { term: "bring to the table", meaning: "đóng góp, mang lại giá trị", meaningEn: "contribute skills or value", type: "idiom", example: "What can you bring to the table?", exampleVi: "Bạn có thể đóng góp gì?" },
          { term: "follow up", meaning: "theo dõi, liên hệ lại", meaningEn: "contact again after initial meeting", type: "phrasal-verb", example: "I'll follow up with an email tomorrow.", exampleVi: "Tôi sẽ gửi email liên hệ lại ngày mai." },
          { term: "go-getter", meaning: "người năng động, chủ động", meaningEn: "an ambitious and energetic person", type: "expression", example: "We need a real go-getter for this role.", exampleVi: "Chúng tôi cần người năng động cho vị trí này." },
        ],
        listeningChallenge: {
          title: "HR Interview",
          titleVi: "Phỏng vấn HR",
          transcript: "HR: Why did you leave your previous job? Candidate: I was looking for more growth opportunities. My previous role was rewarding, but I felt I'd reached a plateau. HR: What salary range are you expecting? Candidate: Based on my research, I'd expect between $50,000 and $60,000.",
          questions: [
            { q: "Why did the candidate leave?", qVi: "Tại sao ứng viên nghỉ việc cũ?", options: ["Low salary", "Bad boss", "Wanted growth", "Relocated"], answer: 2 },
          ],
        },
        speakingTopics: ["Practice answering 'Tell me about yourself'", "Role-play: Negotiate a salary", "Describe your dream job"],
      },
      {
        id: "pro-02-networking",
        title: "Professional Networking",
        titleVi: "Xây dựng Mối quan hệ Chuyên nghiệp",
        icon: "Network",
        description: "Build connections at events, conferences, and LinkedIn",
        descriptionVi: "Xây dựng kết nối tại sự kiện, hội thảo và LinkedIn",
        badge: "Connector",
        badgeVi: "Người Kết nối",
        keySituations: [
          {
            title: "At a Business Conference",
            titleVi: "Tại Hội thảo Doanh nghiệp",
            description: "Introducing yourself and exchanging contacts",
            descriptionVi: "Giới thiệu bản thân và trao đổi thông tin liên lạc",
            sampleDialogue: [
              { speaker: "You", line: "Hi, I really enjoyed your presentation on AI in marketing." },
              { speaker: "Speaker", line: "Thank you! What's your background?" },
              { speaker: "You", line: "I'm in digital marketing at a startup. Would love to connect on LinkedIn." },
              { speaker: "Speaker", line: "Absolutely! Here's my card." },
            ],
          },
        ],
        vocabulary: [
          { term: "touch base", meaning: "liên lạc lại", meaningEn: "reconnect or check in briefly", type: "idiom", example: "Let's touch base next week.", exampleVi: "Tuần sau mình liên lạc lại nhé." },
          { term: "pick someone's brain", meaning: "hỏi ý kiến/kiến thức ai đó", meaningEn: "ask for advice or knowledge", type: "idiom", example: "Can I pick your brain about digital marketing?", exampleVi: "Cho mình hỏi ý kiến về marketing số được không?" },
        ],
        listeningChallenge: {
          title: "Elevator Pitch",
          titleVi: "Bài giới thiệu 30 giây",
          transcript: "Hi, I'm David. I run a small EdTech company that helps Vietnamese students learn English through AI-powered conversations. We've helped over 5,000 students improve their speaking skills. I'd love to explore partnership opportunities.",
          questions: [
            { q: "What industry is David in?", qVi: "David hoạt động trong lĩnh vực nào?", options: ["Finance", "Healthcare", "EdTech", "Real estate"], answer: 2 },
          ],
        },
        speakingTopics: ["Deliver your own 30-second elevator pitch", "Role-play: Meet a potential business partner", "Discuss how to build a professional network"],
      },
      {
        id: "pro-03-meetings",
        title: "Conducting Meetings",
        titleVi: "Điều hành Cuộc họp",
        icon: "Presentation",
        description: "Lead meetings, set agendas, take action items",
        descriptionVi: "Dẫn dắt cuộc họp, lập chương trình, ghi nhận hành động",
        badge: "Meeting Leader",
        badgeVi: "Người Dẫn dắt",
        keySituations: [
          {
            title: "Team Stand-up Meeting",
            titleVi: "Cuộc họp Nhóm nhanh",
            description: "Giving updates and discussing blockers",
            descriptionVi: "Cập nhật tiến độ và thảo luận vướng mắc",
            sampleDialogue: [
              { speaker: "Manager", line: "Let's start with updates. Sarah, what did you accomplish this week?" },
              { speaker: "Sarah", line: "I finished the Q3 report and sent it for review." },
              { speaker: "Manager", line: "Great. Any blockers?" },
              { speaker: "Sarah", line: "I'm waiting on data from the finance team." },
            ],
          },
        ],
        vocabulary: [
          { term: "table a discussion", meaning: "hoãn thảo luận", meaningEn: "postpone discussion to later", type: "expression", example: "Let's table this for next week.", exampleVi: "Để vấn đề này sang tuần sau bàn tiếp." },
          { term: "take the floor", meaning: "lên phát biểu", meaningEn: "start speaking in a meeting", type: "idiom", example: "David, please take the floor.", exampleVi: "David, mời anh phát biểu." },
          { term: "wrap up", meaning: "kết thúc", meaningEn: "bring to a conclusion", type: "phrasal-verb", example: "Let's wrap up in five minutes.", exampleVi: "Năm phút nữa mình kết thúc nhé." },
        ],
        listeningChallenge: {
          title: "Meeting Agenda Review",
          titleVi: "Xem lại Chương trình Cuộc họp",
          transcript: "Chair: Today's agenda has three items. First, Q3 results. Second, the new product launch timeline. Third, budget allocation for marketing. Let's aim to finish by 11 AM.",
          questions: [
            { q: "How many agenda items are there?", qVi: "Có bao nhiêu mục trong chương trình?", options: ["2", "3", "4", "5"], answer: 1 },
          ],
        },
        speakingTopics: ["Practice opening a meeting professionally", "Role-play: Present a project update to your team", "Discuss strategies for effective meetings"],
      },
      {
        id: "pro-04-presentations",
        title: "Giving Presentations",
        titleVi: "Thuyết trình",
        icon: "MonitorPlay",
        description: "Structure talks, use visual aids, handle Q&A",
        descriptionVi: "Cấu trúc bài nói, dùng hình ảnh minh họa, trả lời Q&A",
        badge: "Presenter Pro",
        badgeVi: "Chuyên gia Thuyết trình",
        keySituations: [
          {
            title: "Opening a Presentation",
            titleVi: "Mở đầu Bài Thuyết trình",
            description: "Hooking your audience from the first sentence",
            descriptionVi: "Thu hút khán giả từ câu đầu tiên",
            sampleDialogue: [
              { speaker: "You", line: "Good morning, everyone. Today I'm going to talk about three trends shaping our industry in 2025." },
              { speaker: "You", line: "By the end of this presentation, you'll have actionable strategies you can implement right away." },
              { speaker: "You", line: "Let me start with a quick question — how many of you have used AI at work this year?" },
            ],
          },
        ],
        vocabulary: [
          { term: "cut to the chase", meaning: "đi thẳng vào vấn đề", meaningEn: "get to the point directly", type: "idiom", example: "Let me cut to the chase — here are the results.", exampleVi: "Để tôi đi thẳng vào vấn đề — đây là kết quả." },
          { term: "run through", meaning: "trình bày tóm tắt", meaningEn: "go over quickly", type: "phrasal-verb", example: "Let me run through the key points.", exampleVi: "Để tôi trình bày qua các điểm chính." },
        ],
        listeningChallenge: {
          title: "Presentation Conclusion",
          titleVi: "Kết thúc Bài Thuyết trình",
          transcript: "To sum up, our revenue grew 15% this quarter. Key drivers were the Asian market expansion and our new product line. I recommend we increase our marketing budget by 10% for Q4. Any questions?",
          questions: [
            { q: "How much did revenue grow?", qVi: "Doanh thu tăng bao nhiêu?", options: ["10%", "12%", "15%", "20%"], answer: 2 },
          ],
        },
        speakingTopics: ["Practice a 2-minute presentation on any topic", "Role-play: Handle a tough question from the audience", "Describe the key elements of a great presentation"],
      },
      {
        id: "pro-05-emails",
        title: "Professional Emails",
        titleVi: "Email Chuyên nghiệp",
        icon: "Mail",
        description: "Write clear, polite emails for any business situation",
        descriptionVi: "Viết email rõ ràng, lịch sự cho mọi tình huống công việc",
        badge: "Email Expert",
        badgeVi: "Chuyên gia Email",
        keySituations: [
          {
            title: "Following Up After a Meeting",
            titleVi: "Email Theo dõi sau Cuộc họp",
            description: "Writing concise follow-up emails",
            descriptionVi: "Viết email theo dõi ngắn gọn",
            sampleDialogue: [
              { speaker: "Subject", line: "Follow-up: Q3 Strategy Meeting — Action Items" },
              { speaker: "Body", line: "Hi Team, Thank you for a productive meeting. Please find below the action items we agreed on. Deadline for all items is October 15th." },
            ],
          },
        ],
        vocabulary: [
          { term: "as per our conversation", meaning: "như đã trao đổi", meaningEn: "as we discussed", type: "expression", example: "As per our conversation, I've attached the report.", exampleVi: "Như đã trao đổi, tôi đính kèm báo cáo." },
          { term: "loop someone in", meaning: "thêm ai đó vào cuộc trao đổi", meaningEn: "include someone in communication", type: "phrasal-verb", example: "Please loop in the marketing team.", exampleVi: "Vui lòng thêm đội marketing vào email." },
        ],
        listeningChallenge: {
          title: "Voicemail Message",
          titleVi: "Tin nhắn thoại",
          transcript: "Hi, this is Lisa from Acme Corp. I'm calling about the proposal you sent. I'd like to schedule a call on Thursday at 2 PM to discuss the details. Please confirm by email. Thanks.",
          questions: [
            { q: "When does Lisa want to schedule the call?", qVi: "Lisa muốn hẹn gọi khi nào?", options: ["Monday 3 PM", "Wednesday 1 PM", "Thursday 2 PM", "Friday 10 AM"], answer: 2 },
          ],
        },
        speakingTopics: ["Dictate a professional email out loud", "Role-play: Apologize for missing a deadline via email", "Discuss email etiquette differences across cultures"],
      },
      {
        id: "pro-06-conflict",
        title: "Conflict Resolution",
        titleVi: "Giải quyết Xung đột",
        icon: "Scale",
        description: "Handle disagreements diplomatically at work",
        descriptionVi: "Xử lý bất đồng một cách ngoại giao trong công việc",
        badge: "Peacemaker",
        badgeVi: "Người Hòa giải",
        keySituations: [
          {
            title: "Disagreeing with a Colleague",
            titleVi: "Không đồng ý với Đồng nghiệp",
            description: "Express different opinions professionally",
            descriptionVi: "Bày tỏ ý kiến khác biệt một cách chuyên nghiệp",
            sampleDialogue: [
              { speaker: "Colleague", line: "I think we should launch next month." },
              { speaker: "You", line: "I see your point, but I have some concerns about the timeline." },
              { speaker: "Colleague", line: "What concerns?" },
              { speaker: "You", line: "The QA team needs at least two more weeks of testing. Could we aim for mid-month instead?" },
            ],
          },
        ],
        vocabulary: [
          { term: "see eye to eye", meaning: "đồng ý, cùng quan điểm", meaningEn: "agree with someone", type: "idiom", example: "We don't always see eye to eye on strategy.", exampleVi: "Chúng tôi không phải lúc nào cũng đồng ý về chiến lược." },
          { term: "sort out", meaning: "giải quyết", meaningEn: "resolve a problem", type: "phrasal-verb", example: "Let's sort this out before it escalates.", exampleVi: "Hãy giải quyết trước khi vấn đề leo thang." },
          { term: "meet someone halfway", meaning: "nhượng bộ, thỏa hiệp", meaningEn: "compromise", type: "idiom", example: "Can we meet halfway on the deadline?", exampleVi: "Mình có thể thỏa hiệp về thời hạn không?" },
        ],
        listeningChallenge: {
          title: "Mediation Session",
          titleVi: "Buổi Hòa giải",
          transcript: "Mediator: Let's hear both sides. Tom, you feel the workload is unfair? Tom: Yes, I'm handling 70% of the project. Mediator: Lisa, what's your perspective? Lisa: I've been focusing on client meetings, which aren't visible in the task list.",
          questions: [
            { q: "What percentage of work does Tom say he handles?", qVi: "Tom nói anh ấy xử lý bao nhiêu phần trăm công việc?", options: ["50%", "60%", "70%", "80%"], answer: 2 },
          ],
        },
        speakingTopics: ["Describe a workplace conflict you resolved", "Role-play: Mediate between two arguing team members", "Discuss strategies for diplomatic communication"],
      },
      {
        id: "pro-07-negotiation",
        title: "Negotiation Skills",
        titleVi: "Kỹ năng Đàm phán",
        icon: "Handshake",
        description: "Negotiate deals, contracts, and terms confidently",
        descriptionVi: "Đàm phán thỏa thuận, hợp đồng và điều khoản tự tin",
        badge: "Deal Maker",
        badgeVi: "Nhà Đàm phán",
        keySituations: [
          {
            title: "Negotiating a Contract",
            titleVi: "Đàm phán Hợp đồng",
            description: "Discussing terms and reaching agreement",
            descriptionVi: "Thảo luận điều khoản và đạt thỏa thuận",
            sampleDialogue: [
              { speaker: "Client", line: "We'd like a 20% discount on the yearly plan." },
              { speaker: "You", line: "I understand. We can offer 10% for a 2-year commitment." },
              { speaker: "Client", line: "How about 15% for 18 months?" },
              { speaker: "You", line: "Let me check with my team and get back to you by tomorrow." },
            ],
          },
        ],
        vocabulary: [
          { term: "sweeten the deal", meaning: "thêm ưu đãi để hấp dẫn hơn", meaningEn: "add incentives to make an offer more attractive", type: "idiom", example: "We can sweeten the deal with free support.", exampleVi: "Chúng tôi có thể thêm hỗ trợ miễn phí để hấp dẫn hơn." },
          { term: "bottom line", meaning: "giới hạn cuối cùng, điểm mấu chốt", meaningEn: "the final, most important point", type: "expression", example: "What's your bottom line on pricing?", exampleVi: "Giá thấp nhất bạn có thể chấp nhận là bao nhiêu?" },
        ],
        listeningChallenge: {
          title: "Supplier Negotiation",
          titleVi: "Đàm phán với Nhà cung cấp",
          transcript: "Buyer: We need faster delivery — 5 days instead of 10. Supplier: That's possible but will cost 8% more. Buyer: We can accept 5% extra for orders over 1,000 units. Supplier: Deal.",
          questions: [
            { q: "What delivery time does the buyer want?", qVi: "Người mua muốn giao hàng trong bao lâu?", options: ["3 days", "5 days", "7 days", "10 days"], answer: 1 },
          ],
        },
        speakingTopics: ["Practice negotiating a better price", "Role-play: Discuss contract terms with a client", "Describe a successful negotiation experience"],
      },
      {
        id: "pro-08-remote-work",
        title: "Remote Work Communication",
        titleVi: "Giao tiếp Làm việc Từ xa",
        icon: "Laptop",
        description: "Video calls, async communication, digital collaboration",
        descriptionVi: "Họp video, giao tiếp bất đồng bộ, cộng tác số",
        badge: "Remote Pro",
        badgeVi: "Chuyên gia WFH",
        keySituations: [
          {
            title: "Starting a Video Call",
            titleVi: "Bắt đầu Cuộc gọi Video",
            description: "Professional video call etiquette",
            descriptionVi: "Phép lịch sự trong cuộc gọi video chuyên nghiệp",
            sampleDialogue: [
              { speaker: "You", line: "Can everyone hear me? Let me share my screen." },
              { speaker: "Colleague", line: "You're on mute, Tom." },
              { speaker: "Tom", line: "Oops, sorry about that! Can you see my screen now?" },
              { speaker: "You", line: "Yes, we can. Go ahead." },
            ],
          },
        ],
        vocabulary: [
          { term: "you're on mute", meaning: "bạn đang tắt mic", meaningEn: "your microphone is off", type: "expression", example: "Tom, you're on mute again!", exampleVi: "Tom, bạn lại tắt mic rồi!" },
          { term: "drop off the call", meaning: "rời cuộc gọi", meaningEn: "leave a video/phone call", type: "expression", example: "I need to drop off at 3 PM.", exampleVi: "Tôi cần rời cuộc gọi lúc 3 giờ." },
        ],
        listeningChallenge: {
          title: "Stand-up Meeting on Zoom",
          titleVi: "Họp nhanh trên Zoom",
          transcript: "Manager: Quick updates — Sarah finished the mockups. Tom is blocked by the API issue. Lisa, can you help Tom today? Lisa: Sure, I'll pair program with him this afternoon.",
          questions: [
            { q: "Who is blocked?", qVi: "Ai bị vướng mắc?", options: ["Sarah", "Lisa", "Tom", "Manager"], answer: 2 },
          ],
        },
        speakingTopics: ["Discuss pros and cons of remote work", "Role-play: Lead a virtual team meeting", "Describe your ideal work-from-home setup"],
      },
      {
        id: "pro-09-customer-service",
        title: "Customer Service",
        titleVi: "Dịch vụ Khách hàng",
        icon: "Headset",
        description: "Handle complaints, resolve issues, maintain professionalism",
        descriptionVi: "Xử lý khiếu nại, giải quyết vấn đề, duy trì chuyên nghiệp",
        badge: "Service Star",
        badgeVi: "Ngôi sao Dịch vụ",
        keySituations: [
          {
            title: "Handling a Complaint",
            titleVi: "Xử lý Khiếu nại",
            description: "Calming upset customers and finding solutions",
            descriptionVi: "Trấn an khách hàng và tìm giải pháp",
            sampleDialogue: [
              { speaker: "Customer", line: "I've been waiting 30 minutes for my order!" },
              { speaker: "You", line: "I sincerely apologize for the wait. Let me check on your order right away." },
              { speaker: "Customer", line: "This is unacceptable." },
              { speaker: "You", line: "I completely understand your frustration. As an apology, I'd like to offer a 20% discount." },
            ],
          },
        ],
        vocabulary: [
          { term: "bear with me", meaning: "vui lòng chờ tôi một chút", meaningEn: "please be patient", type: "expression", example: "Bear with me while I look this up.", exampleVi: "Vui lòng chờ tôi tra cứu." },
          { term: "go the extra mile", meaning: "làm nhiều hơn mong đợi", meaningEn: "do more than expected", type: "idiom", example: "We always go the extra mile for our customers.", exampleVi: "Chúng tôi luôn làm nhiều hơn mong đợi cho khách hàng." },
        ],
        listeningChallenge: {
          title: "Customer Feedback Call",
          titleVi: "Cuộc gọi Phản hồi Khách hàng",
          transcript: "Agent: Thank you for your feedback. We'll process your refund within 5 business days. You'll receive a confirmation email shortly. Is there anything else I can help with?",
          questions: [
            { q: "How long will the refund take?", qVi: "Hoàn tiền mất bao lâu?", options: ["2 days", "3 days", "5 business days", "7 days"], answer: 2 },
          ],
        },
        speakingTopics: ["Role-play: Handle an angry customer calmly", "Describe what makes excellent customer service", "Practice polite phrases for difficult situations"],
      },
      {
        id: "pro-10-leadership",
        title: "Leadership & Motivation",
        titleVi: "Lãnh đạo & Tạo động lực",
        icon: "Crown",
        description: "Inspire teams, give feedback, manage performance",
        descriptionVi: "Truyền cảm hứng cho đội nhóm, đưa phản hồi, quản lý hiệu suất",
        badge: "Leader",
        badgeVi: "Nhà Lãnh đạo",
        keySituations: [
          {
            title: "Giving Constructive Feedback",
            titleVi: "Đưa Phản hồi Xây dựng",
            description: "Using the feedback sandwich technique",
            descriptionVi: "Sử dụng kỹ thuật phản hồi sandwich",
            sampleDialogue: [
              { speaker: "You", line: "Sarah, your report was well-researched and very thorough." },
              { speaker: "You", line: "One area to improve — the executive summary could be more concise." },
              { speaker: "You", line: "Overall, great work. Keep pushing the quality higher!" },
            ],
          },
        ],
        vocabulary: [
          { term: "step up", meaning: "đứng lên chịu trách nhiệm", meaningEn: "take responsibility or leadership", type: "phrasal-verb", example: "It's time to step up and lead.", exampleVi: "Đã đến lúc đứng lên và dẫn dắt." },
          { term: "the ball is in your court", meaning: "đến lượt bạn quyết định", meaningEn: "it's your turn to act", type: "idiom", example: "I've given you the resources — the ball is in your court.", exampleVi: "Tôi đã cung cấp nguồn lực — giờ đến lượt bạn." },
        ],
        listeningChallenge: {
          title: "Team Motivation Speech",
          titleVi: "Bài phát biểu Tạo động lực cho Đội nhóm",
          transcript: "Team, I know this quarter has been tough. But look at what we've achieved — we exceeded our target by 12%. Each of you contributed to this success. Next quarter, let's aim even higher. I believe in every one of you.",
          questions: [
            { q: "By how much did the team exceed the target?", qVi: "Đội vượt mục tiêu bao nhiêu?", options: ["5%", "8%", "10%", "12%"], answer: 3 },
          ],
        },
        speakingTopics: ["Give a motivational speech to your team", "Role-play: Coach an underperforming employee", "Discuss qualities of a great leader"],
      },
    ],
  },

  // ═══════════════════════════════════════════
  // PILLAR 3: ACADEMIC & GLOBAL (Education)
  // ═══════════════════════════════════════════
  {
    id: "academic",
    title: "Academic & Global",
    titleVi: "Học thuật & Toàn cầu",
    icon: "GraduationCap",
    color: "from-violet-500 to-purple-500",
    description: "English for academic success and global awareness",
    descriptionVi: "Tiếng Anh cho thành công học thuật và nhận thức toàn cầu",
    lessons: [
      {
        id: "acad-01-debates",
        title: "Critical Thinking & Debates",
        titleVi: "Tư duy Phản biện & Tranh luận",
        icon: "Lightbulb",
        description: "Form arguments, rebut, and persuade in English",
        descriptionVi: "Xây dựng luận điểm, phản bác và thuyết phục bằng tiếng Anh",
        badge: "Debater",
        badgeVi: "Nhà Tranh luận",
        keySituations: [
          {
            title: "In a Debate",
            titleVi: "Trong cuộc Tranh luận",
            description: "Presenting arguments and counterarguments",
            descriptionVi: "Trình bày luận điểm và phản biện",
            sampleDialogue: [
              { speaker: "Moderator", line: "Should social media be banned for children under 16?" },
              { speaker: "For", line: "Children are highly vulnerable to cyberbullying and misinformation." },
              { speaker: "Against", line: "A blanket ban is unrealistic. We need digital literacy education instead." },
              { speaker: "For", line: "While education helps, the addictive design of these platforms is the core issue." },
            ],
          },
        ],
        vocabulary: [
          { term: "devil's advocate", meaning: "người phản biện (để thử luận điểm)", meaningEn: "someone who argues the opposite position", type: "idiom", example: "Let me play devil's advocate here.", exampleVi: "Để tôi phản biện thử nhé." },
          { term: "on the other hand", meaning: "mặt khác", meaningEn: "conversely, alternatively", type: "expression", example: "On the other hand, this could reduce creativity.", exampleVi: "Mặt khác, điều này có thể giảm sự sáng tạo." },
          { term: "stand your ground", meaning: "giữ vững lập trường", meaningEn: "maintain your position firmly", type: "idiom", example: "She stood her ground despite the criticism.", exampleVi: "Cô ấy giữ vững lập trường dù bị chỉ trích." },
        ],
        listeningChallenge: {
          title: "Panel Discussion",
          titleVi: "Thảo luận Nhóm",
          transcript: "Panelist: The data clearly shows that remote learning outcomes are 15% lower than in-person. However, access to education has improved by 40% in rural areas. We need a hybrid model that maximizes both access and quality.",
          questions: [
            { q: "By how much did education access improve in rural areas?", qVi: "Tiếp cận giáo dục ở nông thôn tăng bao nhiêu?", options: ["15%", "25%", "30%", "40%"], answer: 3 },
          ],
        },
        speakingTopics: ["Debate: Is technology making us less social?", "Express your opinion on climate change policies", "Role-play: Moderate a classroom debate"],
      },
      {
        id: "acad-02-opinions",
        title: "Expressing Opinions",
        titleVi: "Bày tỏ Quan điểm",
        icon: "MessageSquare",
        description: "Share views on culture, society, and the environment",
        descriptionVi: "Chia sẻ quan điểm về văn hóa, xã hội và môi trường",
        badge: "Voice of Reason",
        badgeVi: "Tiếng nói Lý trí",
        keySituations: [
          {
            title: "Discussing Current Events",
            titleVi: "Thảo luận Thời sự",
            description: "Sharing opinions politely in diverse groups",
            descriptionVi: "Chia sẻ ý kiến lịch sự trong nhóm đa dạng",
            sampleDialogue: [
              { speaker: "Friend", line: "What do you think about the new environmental regulations?" },
              { speaker: "You", line: "I think they're a step in the right direction, but enforcement is key." },
              { speaker: "Friend", line: "Some people say it hurts businesses." },
              { speaker: "You", line: "That's a valid concern. However, long-term sustainability should outweigh short-term costs." },
            ],
          },
        ],
        vocabulary: [
          { term: "food for thought", meaning: "điều đáng suy nghĩ", meaningEn: "something worth thinking about", type: "idiom", example: "That documentary gave me food for thought.", exampleVi: "Bộ phim tài liệu đó cho tôi nhiều điều suy nghĩ." },
          { term: "take something with a grain of salt", meaning: "nghe nhưng đừng tin hoàn toàn", meaningEn: "be skeptical about something", type: "idiom", example: "Take online reviews with a grain of salt.", exampleVi: "Đọc đánh giá online nhưng đừng tin hoàn toàn." },
        ],
        listeningChallenge: {
          title: "TED Talk Excerpt",
          titleVi: "Trích đoạn TED Talk",
          transcript: "Speaker: I believe the greatest challenge of our generation isn't climate change or AI — it's our inability to have productive conversations with people we disagree with. If we can't talk, we can't solve anything.",
          questions: [
            { q: "What does the speaker consider the greatest challenge?", qVi: "Diễn giả cho rằng thách thức lớn nhất là gì?", options: ["Climate change", "AI risks", "Inability to have productive conversations", "Poverty"], answer: 2 },
          ],
        },
        speakingTopics: ["Share your opinion on social media's impact on youth", "Discuss environmental issues in Vietnam", "Express your views on work-life balance"],
      },
      {
        id: "acad-03-study-abroad",
        title: "Studying Abroad Essentials",
        titleVi: "Thiết yếu Du học",
        icon: "Globe",
        description: "Applications, campus life, academic English",
        descriptionVi: "Hồ sơ, cuộc sống đại học, tiếng Anh học thuật",
        badge: "World Scholar",
        badgeVi: "Học giả Toàn cầu",
        keySituations: [
          {
            title: "University Orientation",
            titleVi: "Định hướng Đại học",
            description: "Navigating campus and meeting advisors",
            descriptionVi: "Tìm hiểu khuôn viên trường và gặp cố vấn",
            sampleDialogue: [
              { speaker: "Advisor", line: "Welcome! Let's go over your course schedule." },
              { speaker: "You", line: "I'm interested in taking an elective in Data Science." },
              { speaker: "Advisor", line: "Great choice. You'll need to complete the prerequisite first." },
              { speaker: "You", line: "When is the deadline for course registration?" },
            ],
          },
        ],
        vocabulary: [
          { term: "hit the books", meaning: "học chăm chỉ", meaningEn: "study hard", type: "idiom", example: "Time to hit the books — finals are next week.", exampleVi: "Đến lúc học chăm rồi — tuần sau thi cuối kỳ." },
          { term: "drop a class", meaning: "bỏ một môn học", meaningEn: "withdraw from a course", type: "expression", example: "I had to drop a class because it was too advanced.", exampleVi: "Tôi phải bỏ một môn vì nó quá nâng cao." },
          { term: "pull an all-nighter", meaning: "thức trắng đêm (để học)", meaningEn: "stay up all night studying", type: "idiom", example: "I pulled an all-nighter before the exam.", exampleVi: "Tôi thức trắng đêm trước kỳ thi." },
        ],
        listeningChallenge: {
          title: "Student Services Announcement",
          titleVi: "Thông báo Dịch vụ Sinh viên",
          transcript: "Attention students: The writing center offers free tutoring Monday through Friday, 9 AM to 5 PM. Drop-ins are welcome, but appointments are recommended. Visit room 302 in the library building.",
          questions: [
            { q: "Where is the writing center?", qVi: "Trung tâm viết ở đâu?", options: ["Student center", "Library room 302", "Science building", "Online only"], answer: 1 },
          ],
        },
        speakingTopics: ["Describe your study abroad plans", "Role-play: Ask a professor for an extension", "Discuss differences between Vietnamese and Western education"],
      },
      {
        id: "acad-04-culture",
        title: "Cross-Cultural Communication",
        titleVi: "Giao tiếp Xuyên Văn hóa",
        icon: "Earth",
        description: "Navigate cultural differences with respect and curiosity",
        descriptionVi: "Điều hướng khác biệt văn hóa với sự tôn trọng và tò mò",
        badge: "Culture Bridge",
        badgeVi: "Cầu nối Văn hóa",
        keySituations: [
          {
            title: "Cultural Misunderstanding",
            titleVi: "Hiểu lầm Văn hóa",
            description: "Handling and learning from cultural differences",
            descriptionVi: "Xử lý và học hỏi từ khác biệt văn hóa",
            sampleDialogue: [
              { speaker: "Colleague", line: "Why didn't you make eye contact during the meeting?" },
              { speaker: "You", line: "In my culture, avoiding direct eye contact with seniors is a sign of respect." },
              { speaker: "Colleague", line: "Oh, I didn't know that! In American culture, it shows confidence." },
              { speaker: "You", line: "Interesting! I'm learning to adapt, but it's good to share these differences." },
            ],
          },
        ],
        vocabulary: [
          { term: "culture shock", meaning: "sốc văn hóa", meaningEn: "disorientation when experiencing a new culture", type: "expression", example: "I experienced culture shock when I first moved to Japan.", exampleVi: "Tôi bị sốc văn hóa khi mới đến Nhật." },
          { term: "when in Rome, do as the Romans do", meaning: "nhập gia tùy tục", meaningEn: "adapt to local customs", type: "idiom", example: "I started bowing — when in Rome, right?", exampleVi: "Tôi bắt đầu cúi chào — nhập gia tùy tục mà." },
        ],
        listeningChallenge: {
          title: "International Student Forum",
          titleVi: "Diễn đàn Sinh viên Quốc tế",
          transcript: "Host: What surprised you most about studying in the UK? Student: The directness. In my country, we're more indirect. But I've learned that here, being direct is simply efficient — not rude. It's about understanding the intent.",
          questions: [
            { q: "What surprised the student?", qVi: "Điều gì làm sinh viên ngạc nhiên?", options: ["The food", "The weather", "The directness", "The schedule"], answer: 2 },
          ],
        },
        speakingTopics: ["Discuss a cultural difference that surprised you", "Role-play: Explain Vietnamese customs to a foreigner", "Compare greeting customs across countries"],
      },
      {
        id: "acad-05-environment",
        title: "Environmental Issues",
        titleVi: "Vấn đề Môi trường",
        icon: "Leaf",
        description: "Discuss climate, sustainability, and green living",
        descriptionVi: "Thảo luận về khí hậu, bền vững và lối sống xanh",
        badge: "Eco Advocate",
        badgeVi: "Người Ủng hộ Môi trường",
        keySituations: [
          {
            title: "Sustainability Discussion",
            titleVi: "Thảo luận Bền vững",
            description: "Talking about environmental solutions",
            descriptionVi: "Nói về các giải pháp môi trường",
            sampleDialogue: [
              { speaker: "Friend", line: "Do you think individuals can make a difference for the environment?" },
              { speaker: "You", line: "Absolutely. Small actions add up — reducing plastic, using public transport." },
              { speaker: "Friend", line: "But isn't it mostly the big corporations?" },
              { speaker: "You", line: "True, but consumer demand drives corporate behavior. We have more power than we think." },
            ],
          },
        ],
        vocabulary: [
          { term: "carbon footprint", meaning: "dấu chân carbon", meaningEn: "total CO2 emissions caused by a person", type: "expression", example: "How can we reduce our carbon footprint?", exampleVi: "Làm sao giảm dấu chân carbon?" },
          { term: "go green", meaning: "sống xanh, thân thiện môi trường", meaningEn: "become environmentally friendly", type: "expression", example: "Our company decided to go green this year.", exampleVi: "Công ty chúng tôi quyết định sống xanh năm nay." },
        ],
        listeningChallenge: {
          title: "Environmental News Report",
          titleVi: "Bản tin Môi trường",
          transcript: "Reporter: A new study shows that plastic waste in the ocean has increased by 30% since 2020. Scientists urge governments to ban single-use plastics and invest in biodegradable alternatives.",
          questions: [
            { q: "How much has ocean plastic increased since 2020?", qVi: "Rác nhựa đại dương tăng bao nhiêu từ 2020?", options: ["10%", "20%", "30%", "50%"], answer: 2 },
          ],
        },
        speakingTopics: ["Discuss environmental problems in your city", "Debate: Should plastic bags be completely banned?", "Describe what you do to help the environment"],
      },
    ],
  },
];

// Flatten all lessons for quick lookup
export const allConversationalLessons = conversationalPillars.flatMap(p =>
  p.lessons.map(l => ({ ...l, pillarId: p.id }))
);

// Get a lesson by ID
export const getConvLessonById = (id: string) =>
  allConversationalLessons.find(l => l.id === id);

// Get pillar by lesson ID
export const getPillarByLessonId = (lessonId: string) =>
  conversationalPillars.find(p => p.lessons.some(l => l.id === lessonId));
