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
              { speaker: "You", line: "Great, I'll take the blue one in medium and the black in large." },
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
              { speaker: "You", line: "Thank you. Also, is this eligible for a refund if the larger size doesn't work?" },
              { speaker: "Staff", line: "Yes, you have 30 days for a full refund." },
            ],
          },
          {
            title: "Online Shopping Delivery Issue",
            titleVi: "Vấn đề Giao hàng Online",
            description: "Contacting customer service about a missing package",
            descriptionVi: "Liên hệ dịch vụ khách hàng về kiện hàng bị mất",
            sampleDialogue: [
              { speaker: "You", line: "Hi, my order was supposed to arrive yesterday but it hasn't." },
              { speaker: "Agent", line: "I'm sorry about that. Can I have your order number?" },
              { speaker: "You", line: "Sure, it's ORD-78542." },
              { speaker: "Agent", line: "It looks like it's delayed due to weather. It should arrive by tomorrow." },
              { speaker: "You", line: "Can I get a tracking update sent to my email?" },
            ],
          },
        ],
        vocabulary: [
          { term: "window shopping", meaning: "đi xem hàng (không mua)", meaningEn: "looking at items without buying", type: "expression", example: "Let's go window shopping this weekend.", exampleVi: "Cuối tuần mình đi dạo xem hàng nhé." },
          { term: "a steal", meaning: "món hời", meaningEn: "a great bargain", type: "slang", example: "This bag was a steal at only $10!", exampleVi: "Cái túi này chỉ $10, hời quá!" },
          { term: "try on", meaning: "thử (quần áo)", meaningEn: "to put on clothing to test fit", type: "phrasal-verb", example: "Can I try on these shoes?", exampleVi: "Cho tôi thử đôi giày này được không?" },
          { term: "rip someone off", meaning: "chặt chém, bán đắt", meaningEn: "to overcharge someone", type: "phrasal-verb", example: "That shop ripped me off — $50 for a t-shirt!", exampleVi: "Cửa hàng đó chặt chém tôi — $50 cho một cái áo thun!" },
          { term: "bang for your buck", meaning: "đáng đồng tiền bát gạo", meaningEn: "value for money", type: "idiom", example: "This phone gives great bang for your buck.", exampleVi: "Cái điện thoại này rất đáng đồng tiền." },
          { term: "shop around", meaning: "so sánh giá nhiều nơi", meaningEn: "compare prices at different stores", type: "phrasal-verb", example: "You should shop around before buying a laptop.", exampleVi: "Bạn nên so sánh giá nhiều nơi trước khi mua laptop." },
          { term: "splurge on", meaning: "vung tiền cho", meaningEn: "spend a lot of money on something", type: "phrasal-verb", example: "I splurged on a designer handbag.", exampleVi: "Tôi vung tiền mua túi hàng hiệu." },
        ],
        listeningChallenge: {
          title: "At the Checkout Counter",
          titleVi: "Tại quầy thanh toán",
          transcript: "Staff: That'll be $45.99. Would you like a bag? Customer: Yes, please. Can I pay by card? Staff: Sure, tap or insert. Would you like the receipt emailed? Customer: Email is fine, thanks. Staff: Great, I've also applied your loyalty discount — you saved $5 today.",
          questions: [
            { q: "How much is the total?", qVi: "Tổng tiền là bao nhiêu?", options: ["$45.99", "$49.95", "$54.99", "$40.59"], answer: 0 },
            { q: "How does the customer want to receive the receipt?", qVi: "Khách hàng muốn nhận hóa đơn bằng cách nào?", options: ["Printed", "By email", "No receipt", "By text"], answer: 1 },
            { q: "How much did the customer save with the loyalty discount?", qVi: "Khách tiết kiệm được bao nhiêu với thẻ thành viên?", options: ["$3", "$5", "$10", "$15"], answer: 1 },
          ],
        },
        speakingTopics: ["Describe your favorite shopping experience", "Role-play: You want to return a defective item", "Negotiate a price at a local market", "Compare online vs in-store shopping"],
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
              { speaker: "Waiter", line: "Would you like any sides with that?" },
              { speaker: "You", line: "A garden salad, please." },
            ],
          },
          {
            title: "Handling Dietary Restrictions",
            titleVi: "Xử lý Yêu cầu Ăn kiêng",
            description: "Communicating allergies and dietary needs",
            descriptionVi: "Truyền đạt dị ứng và nhu cầu ăn kiêng",
            sampleDialogue: [
              { speaker: "You", line: "I'm allergic to peanuts. Does this dish contain any nuts?" },
              { speaker: "Waiter", line: "Let me check with the chef. One moment, please." },
              { speaker: "Waiter", line: "The chef confirmed it's nut-free. However, the dessert does contain almonds." },
              { speaker: "You", line: "Good to know, I'll skip dessert then. Thank you for checking!" },
            ],
          },
          {
            title: "Splitting the Bill",
            titleVi: "Chia Hóa đơn",
            description: "Different ways to handle payment with friends",
            descriptionVi: "Các cách xử lý thanh toán khi đi ăn với bạn bè",
            sampleDialogue: [
              { speaker: "You", line: "Should we split the bill evenly or pay for what we ordered?" },
              { speaker: "Friend", line: "Let's pay for what we ordered. I only had a salad." },
              { speaker: "You", line: "Fair enough. Excuse me, could we get separate checks?" },
              { speaker: "Waiter", line: "Of course. I'll split it for you." },
            ],
          },
        ],
        vocabulary: [
          { term: "on the house", meaning: "miễn phí (nhà hàng mời)", meaningEn: "free of charge", type: "idiom", example: "The dessert is on the house tonight!", exampleVi: "Tối nay tráng miệng miễn phí nhé!" },
          { term: "grab a bite", meaning: "ăn nhanh cái gì đó", meaningEn: "eat something quickly", type: "idiom", example: "Want to grab a bite before the movie?", exampleVi: "Muốn ăn gì nhanh trước khi xem phim không?" },
          { term: "doggy bag", meaning: "hộp mang phần ăn thừa về", meaningEn: "container for leftover food", type: "expression", example: "Can I get a doggy bag for the rest?", exampleVi: "Cho tôi hộp mang phần còn lại về được không?" },
          { term: "split the bill", meaning: "chia hóa đơn", meaningEn: "divide payment equally", type: "expression", example: "Should we split the bill?", exampleVi: "Mình chia hóa đơn nhé?" },
          { term: "have a sweet tooth", meaning: "thích ăn ngọt", meaningEn: "enjoy sweet foods", type: "idiom", example: "I have a real sweet tooth — I can't resist chocolate cake.", exampleVi: "Tôi rất thích ăn ngọt — không cưỡng nổi bánh chocolate." },
          { term: "dig in", meaning: "bắt đầu ăn", meaningEn: "start eating enthusiastically", type: "phrasal-verb", example: "The food is here — dig in!", exampleVi: "Đồ ăn lên rồi — ăn thôi!" },
        ],
        listeningChallenge: {
          title: "Making a Reservation",
          titleVi: "Đặt bàn nhà hàng",
          transcript: "Host: Good evening, how can I help? Caller: I'd like a table for four on Friday at 7pm. Host: Let me check... We have a spot at 7:30. Caller: That works. Under the name Johnson, please. Host: Do any guests have dietary restrictions? Caller: One person is vegetarian. Host: Noted, we have several vegetarian options. See you Friday!",
          questions: [
            { q: "How many people is the reservation for?", qVi: "Đặt bàn cho bao nhiêu người?", options: ["2", "3", "4", "5"], answer: 2 },
            { q: "What time was available?", qVi: "Giờ nào còn trống?", options: ["7:00", "7:15", "7:30", "8:00"], answer: 2 },
            { q: "What dietary restriction was mentioned?", qVi: "Chế độ ăn kiêng nào được đề cập?", options: ["Gluten-free", "Vegan", "Vegetarian", "Halal"], answer: 2 },
          ],
        },
        speakingTopics: ["Describe your favorite restaurant", "Role-play: Complain politely about cold food", "Explain Vietnamese cuisine to a foreigner", "Discuss food delivery apps"],
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
          {
            title: "Using Ride-Sharing Apps",
            titleVi: "Sử dụng Ứng dụng Gọi xe",
            description: "Communicating with drivers and handling issues",
            descriptionVi: "Giao tiếp với tài xế và xử lý sự cố",
            sampleDialogue: [
              { speaker: "You", line: "Hi, I'm your rider. I'm at the main entrance of the mall." },
              { speaker: "Driver", line: "I see a few entrances. Which one? Near the fountain?" },
              { speaker: "You", line: "Yes, that's the one. I'm wearing a red jacket." },
              { speaker: "Driver", line: "Got it, I'll be there in 2 minutes." },
            ],
          },
        ],
        vocabulary: [
          { term: "around the corner", meaning: "quanh góc (rất gần)", meaningEn: "very close by", type: "idiom", example: "The pharmacy is just around the corner.", exampleVi: "Nhà thuốc ngay quanh góc thôi." },
          { term: "take the scenic route", meaning: "đi đường dài ngắm cảnh", meaningEn: "go the longer, prettier way", type: "idiom", example: "Let's take the scenic route along the river.", exampleVi: "Mình đi đường dọc sông ngắm cảnh đi." },
          { term: "get around", meaning: "di chuyển", meaningEn: "move from place to place", type: "phrasal-verb", example: "It's easy to get around by subway here.", exampleVi: "Đi tàu điện ngầm ở đây rất dễ di chuyển." },
          { term: "drop off", meaning: "thả xuống (xe)", meaningEn: "let someone out of a vehicle", type: "phrasal-verb", example: "Can you drop me off at the station?", exampleVi: "Bạn thả tôi ở ga tàu được không?" },
        ],
        listeningChallenge: {
          title: "At the Train Station",
          titleVi: "Tại ga tàu",
          transcript: "Announcement: The 3:15 train to Oxford is now boarding on Platform 4. Please have your tickets ready. The next train to London departs at 3:45 from Platform 2. Passengers are reminded to mind the gap when boarding.",
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
              { speaker: "You", line: "I'm in digital marketing. How about you?" },
              { speaker: "New Friend", line: "I'm a freelance photographer. Want to see some of my work?" },
            ],
          },
          {
            title: "Keeping a Conversation Going",
            titleVi: "Duy trì Cuộc trò chuyện",
            description: "Avoiding awkward silences with follow-up questions",
            descriptionVi: "Tránh im lặng lúng túng bằng câu hỏi tiếp nối",
            sampleDialogue: [
              { speaker: "You", line: "That's really interesting! How did you get into photography?" },
              { speaker: "Friend", line: "I started during a trip to Japan and got hooked." },
              { speaker: "You", line: "Japan! I've always wanted to go. What was the highlight for you?" },
              { speaker: "Friend", line: "Definitely Kyoto — the temples are magical." },
            ],
          },
        ],
        vocabulary: [
          { term: "break the ice", meaning: "phá băng, bắt đầu cuộc trò chuyện", meaningEn: "start a conversation in a social situation", type: "idiom", example: "A joke is a great way to break the ice.", exampleVi: "Một câu đùa là cách tuyệt vời để phá băng." },
          { term: "hit it off", meaning: "hợp nhau ngay từ đầu", meaningEn: "get along well immediately", type: "idiom", example: "We hit it off at the party last night.", exampleVi: "Chúng mình hợp nhau ngay ở buổi tiệc tối qua." },
          { term: "catch up", meaning: "gặp lại để nói chuyện", meaningEn: "meet to share news after time apart", type: "phrasal-verb", example: "Let's catch up over coffee sometime.", exampleVi: "Hẹn gặp uống cà phê nói chuyện nhé." },
          { term: "hang out", meaning: "đi chơi, dành thời gian cùng nhau", meaningEn: "spend time together casually", type: "phrasal-verb", example: "Want to hang out this weekend?", exampleVi: "Cuối tuần muốn đi chơi không?" },
          { term: "vibe with", meaning: "cảm thấy hợp, hòa hợp", meaningEn: "feel comfortable or in tune with", type: "slang", example: "I really vibe with the people here.", exampleVi: "Tôi rất hợp với mọi người ở đây." },
        ],
        listeningChallenge: {
          title: "Meeting a New Neighbor",
          titleVi: "Gặp hàng xóm mới",
          transcript: "A: Hi there! Are you the new neighbor? B: Yes, I just moved in last week. I'm Sarah. A: Welcome! I'm Tom from next door. If you need anything, just knock. B: That's so kind, thanks! Do you know any good restaurants nearby? A: There's an amazing Thai place two blocks down. I'll text you the name.",
          questions: [
            { q: "When did Sarah move in?", qVi: "Sarah chuyển đến khi nào?", options: ["Yesterday", "Last month", "Last week", "Two weeks ago"], answer: 2 },
            { q: "What type of restaurant does Tom recommend?", qVi: "Tom gợi ý nhà hàng gì?", options: ["Italian", "Chinese", "Thai", "Mexican"], answer: 2 },
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
              { speaker: "Doctor", line: "I'll prescribe some antibiotics. Take them twice a day after meals." },
            ],
          },
          {
            title: "At the Gym",
            titleVi: "Tại Phòng Gym",
            description: "Asking for help with equipment and routines",
            descriptionVi: "Hỏi về cách dùng thiết bị và bài tập",
            sampleDialogue: [
              { speaker: "You", line: "Excuse me, could you show me how to use this machine?" },
              { speaker: "Trainer", line: "Sure! Sit here, grab the handles, and push forward slowly." },
              { speaker: "You", line: "How many sets should I do as a beginner?" },
              { speaker: "Trainer", line: "Start with 3 sets of 10 reps. Don't go too heavy at first." },
            ],
          },
        ],
        vocabulary: [
          { term: "under the weather", meaning: "ốm nhẹ, không khỏe", meaningEn: "feeling slightly ill", type: "idiom", example: "I'm feeling under the weather today.", exampleVi: "Hôm nay tôi hơi ốm." },
          { term: "work out", meaning: "tập thể dục", meaningEn: "to exercise", type: "phrasal-verb", example: "I work out three times a week.", exampleVi: "Tôi tập thể dục ba lần một tuần." },
          { term: "pull a muscle", meaning: "bị căng cơ", meaningEn: "strain a muscle", type: "expression", example: "I pulled a muscle during yoga.", exampleVi: "Tôi bị căng cơ khi tập yoga." },
          { term: "burn out", meaning: "kiệt sức", meaningEn: "become exhausted from overwork", type: "phrasal-verb", example: "I'm starting to burn out from working too much.", exampleVi: "Tôi bắt đầu kiệt sức vì làm việc quá nhiều." },
          { term: "in good shape", meaning: "khỏe mạnh, cân đối", meaningEn: "physically fit", type: "expression", example: "She's in really good shape — she runs every morning.", exampleVi: "Cô ấy rất khỏe — chạy bộ mỗi sáng." },
        ],
        listeningChallenge: {
          title: "Pharmacy Visit",
          titleVi: "Đến nhà thuốc",
          transcript: "Pharmacist: How can I help? Customer: I need something for a cold. Pharmacist: I recommend this — take two tablets every 6 hours with food. Customer: Any side effects? Pharmacist: It may cause drowsiness, so avoid driving after taking it. Customer: And how long should I take it? Pharmacist: For 5 days, then see a doctor if symptoms persist.",
          questions: [
            { q: "How often should the medication be taken?", qVi: "Thuốc uống cách bao lâu?", options: ["Every 4 hours", "Every 6 hours", "Twice a day", "Once a day"], answer: 1 },
            { q: "What side effect was mentioned?", qVi: "Tác dụng phụ được đề cập là gì?", options: ["Nausea", "Drowsiness", "Headache", "Dizziness"], answer: 1 },
          ],
        },
        speakingTopics: ["Describe your fitness routine", "Role-play: Call to book a doctor appointment", "Explain healthy eating habits", "Discuss mental health awareness"],
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
              { speaker: "Support", line: "Let me run a diagnostic test on your line. Please hold." },
            ],
          },
          {
            title: "Online Privacy Discussion",
            titleVi: "Thảo luận Quyền Riêng tư Online",
            description: "Discussing data privacy with friends",
            descriptionVi: "Thảo luận về quyền riêng tư dữ liệu với bạn bè",
            sampleDialogue: [
              { speaker: "Friend", line: "Did you see that article about social media tracking?" },
              { speaker: "You", line: "Yeah, it's scary how much data they collect." },
              { speaker: "Friend", line: "I've started using a VPN. Have you tried one?" },
              { speaker: "You", line: "Not yet, but I should. I've at least turned off location sharing." },
            ],
          },
        ],
        vocabulary: [
          { term: "go viral", meaning: "lan truyền nhanh chóng", meaningEn: "spread rapidly on social media", type: "slang", example: "That video went viral overnight!", exampleVi: "Video đó viral chỉ sau một đêm!" },
          { term: "scroll through", meaning: "lướt (mạng xã hội)", meaningEn: "browse content quickly", type: "phrasal-verb", example: "I spent an hour scrolling through Instagram.", exampleVi: "Tôi lướt Instagram cả tiếng đồng hồ." },
          { term: "catfish", meaning: "giả mạo danh tính online", meaningEn: "fake identity online", type: "slang", example: "She realized she was being catfished.", exampleVi: "Cô ấy nhận ra mình bị lừa bởi tài khoản giả." },
          { term: "ghost someone", meaning: "bỏ bê, không trả lời ai đó", meaningEn: "stop responding to someone suddenly", type: "slang", example: "He ghosted me after three dates.", exampleVi: "Anh ấy bỏ bê tôi sau ba buổi hẹn." },
          { term: "doom scrolling", meaning: "lướt tin xấu không dừng được", meaningEn: "endlessly scrolling through negative news", type: "slang", example: "I need to stop doom scrolling before bed.", exampleVi: "Tôi cần ngừng lướt tin xấu trước khi ngủ." },
        ],
        listeningChallenge: {
          title: "Setting Up a New Phone",
          titleVi: "Cài đặt Điện thoại mới",
          transcript: "Agent: First, insert your SIM card. Then power on the device. You'll be prompted to connect to Wi-Fi. After that, sign in with your Google or Apple account to restore your data. If you need to transfer from an old phone, use the migration tool during setup.",
          questions: [
            { q: "What's the first step?", qVi: "Bước đầu tiên là gì?", options: ["Connect Wi-Fi", "Sign in", "Insert SIM card", "Restore data"], answer: 2 },
            { q: "What tool helps transfer data from an old phone?", qVi: "Công cụ nào giúp chuyển dữ liệu từ điện thoại cũ?", options: ["Bluetooth", "USB cable", "Migration tool", "Cloud backup"], answer: 2 },
          ],
        },
        speakingTopics: ["Discuss pros and cons of social media", "Role-play: Explain a tech problem to support", "Describe your favorite app and why", "Talk about digital detox"],
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
              { speaker: "Agent", line: "Your gate is B12. Boarding starts at 2:30." },
            ],
          },
          {
            title: "At the Hotel Reception",
            titleVi: "Tại Quầy Lễ tân Khách sạn",
            description: "Checking in and requesting amenities",
            descriptionVi: "Nhận phòng và yêu cầu tiện nghi",
            sampleDialogue: [
              { speaker: "You", line: "Hi, I have a reservation under Nguyen." },
              { speaker: "Receptionist", line: "Welcome! I see a deluxe room for 3 nights." },
              { speaker: "You", line: "Could I get extra towels and a late checkout?" },
              { speaker: "Receptionist", line: "Towels will be sent up. Late checkout is available until 1 PM for $20." },
            ],
          },
        ],
        vocabulary: [
          { term: "jet lag", meaning: "lệch múi giờ", meaningEn: "tiredness from time zone change", type: "expression", example: "I'm still dealing with jet lag.", exampleVi: "Tôi vẫn đang bị lệch múi giờ." },
          { term: "off the beaten path", meaning: "nơi ít người biết đến", meaningEn: "a less popular destination", type: "idiom", example: "We found a café off the beaten path.", exampleVi: "Chúng tôi tìm được một quán cà phê ít người biết." },
          { term: "check in / check out", meaning: "nhận phòng / trả phòng", meaningEn: "register/leave a hotel", type: "phrasal-verb", example: "Check-out is at 11 AM.", exampleVi: "Trả phòng lúc 11 giờ sáng." },
          { term: "travel light", meaning: "đi du lịch nhẹ nhàng (ít hành lý)", meaningEn: "carry minimal luggage", type: "expression", example: "I prefer to travel light — just a backpack.", exampleVi: "Tôi thích đi nhẹ — chỉ một balo." },
          { term: "layover", meaning: "quá cảnh", meaningEn: "a stop between flights", type: "expression", example: "We have a 4-hour layover in Singapore.", exampleVi: "Chúng tôi quá cảnh 4 tiếng ở Singapore." },
        ],
        listeningChallenge: {
          title: "Hotel Check-in",
          titleVi: "Nhận phòng Khách sạn",
          transcript: "Receptionist: Welcome! Do you have a reservation? Guest: Yes, under the name Nguyen. Receptionist: I see it — a double room for 3 nights. Breakfast is from 7 to 9 AM. Guest: Is there a pool? Receptionist: Yes, on the 5th floor. Open till 10 PM. The gym is on the same floor.",
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
              { speaker: "Operator", line: "Stay on the line. Help is on the way." },
            ],
          },
          {
            title: "Reporting a Theft",
            titleVi: "Báo cáo Mất cắp",
            description: "Speaking to police about a stolen item",
            descriptionVi: "Nói chuyện với cảnh sát về vật bị đánh cắp",
            sampleDialogue: [
              { speaker: "You", line: "Excuse me, I'd like to report a theft." },
              { speaker: "Officer", line: "What happened?" },
              { speaker: "You", line: "Someone stole my wallet on the subway about an hour ago." },
              { speaker: "Officer", line: "Can you describe what was in it?" },
              { speaker: "You", line: "My ID, two credit cards, and about $50 in cash." },
            ],
          },
        ],
        vocabulary: [
          { term: "call for help", meaning: "kêu cứu", meaningEn: "request emergency assistance", type: "expression", example: "Someone call for help!", exampleVi: "Ai đó gọi cứu trợ đi!" },
          { term: "first aid", meaning: "sơ cứu", meaningEn: "initial medical treatment", type: "expression", example: "Does anyone know first aid?", exampleVi: "Có ai biết sơ cứu không?" },
          { term: "stay calm", meaning: "giữ bình tĩnh", meaningEn: "remain composed in a crisis", type: "expression", example: "Stay calm and call 911.", exampleVi: "Giữ bình tĩnh và gọi 911." },
          { term: "watch out", meaning: "cẩn thận", meaningEn: "be careful, warning", type: "phrasal-verb", example: "Watch out! There's a car coming!", exampleVi: "Cẩn thận! Có xe đang tới!" },
        ],
        listeningChallenge: {
          title: "Fire Safety Announcement",
          titleVi: "Thông báo An toàn Cháy nổ",
          transcript: "Attention please: This is a fire drill. Please proceed to the nearest exit calmly. Do not use the elevators. Assembly point is the parking lot on the east side. Do not re-enter the building until the all-clear signal is given.",
          questions: [
            { q: "What should people NOT use?", qVi: "Không được sử dụng gì?", options: ["Stairs", "Exits", "Elevators", "Fire extinguisher"], answer: 2 },
            { q: "Where is the assembly point?", qVi: "Điểm tập trung ở đâu?", options: ["Front lobby", "Parking lot", "Rooftop", "Basement"], answer: 1 },
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
              { speaker: "You", line: "What about parking? Is there a garage?" },
              { speaker: "Landlord", line: "There's one spot included. Additional spots are $50/month." },
            ],
          },
          {
            title: "Reporting a Maintenance Issue",
            titleVi: "Báo cáo Sự cố Bảo trì",
            description: "Contacting landlord about repairs",
            descriptionVi: "Liên hệ chủ nhà về sửa chữa",
            sampleDialogue: [
              { speaker: "You", line: "Hi, the heater in my apartment isn't working." },
              { speaker: "Landlord", line: "Since when?" },
              { speaker: "You", line: "Since yesterday evening. It's getting really cold." },
              { speaker: "Landlord", line: "I'll send a technician tomorrow morning. Is 9 AM okay?" },
            ],
          },
        ],
        vocabulary: [
          { term: "move in / move out", meaning: "dọn vào / dọn ra", meaningEn: "start/stop living somewhere", type: "phrasal-verb", example: "We moved in last Saturday.", exampleVi: "Chúng tôi dọn vào thứ Bảy tuần rước." },
          { term: "settle in", meaning: "ổn định", meaningEn: "become comfortable in a new place", type: "phrasal-verb", example: "It took a month to settle in.", exampleVi: "Mất một tháng để ổn định." },
          { term: "fixer-upper", meaning: "nhà cần sửa chữa", meaningEn: "a property needing renovation", type: "expression", example: "It's a fixer-upper but the location is great.", exampleVi: "Nhà cần sửa nhưng vị trí rất tốt." },
          { term: "housewarming", meaning: "tiệc tân gia", meaningEn: "party to celebrate moving into a new home", type: "expression", example: "We're having a housewarming this Saturday!", exampleVi: "Thứ Bảy này chúng tôi tổ chức tiệc tân gia!" },
        ],
        listeningChallenge: {
          title: "Landlord's Rules",
          titleVi: "Nội quy của Chủ nhà",
          transcript: "Landlord: No pets allowed. Rent is due on the 1st of every month. Quiet hours are from 10 PM to 7 AM. Any maintenance issues, text me first. Also, please sort your recycling — bins are in the basement.",
          questions: [
            { q: "When is rent due?", qVi: "Tiền thuê đến hạn khi nào?", options: ["15th", "Last day", "1st", "5th"], answer: 2 },
            { q: "Where are the recycling bins?", qVi: "Thùng tái chế ở đâu?", options: ["Kitchen", "Garage", "Basement", "Front yard"], answer: 2 },
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
              { speaker: "You", line: "Here they are. What's the interest rate?" },
              { speaker: "Teller", line: "Currently 2.5% per year for our standard savings." },
            ],
          },
          {
            title: "Using an ATM Abroad",
            titleVi: "Dùng ATM ở Nước ngoài",
            description: "Handling foreign ATM issues and fees",
            descriptionVi: "Xử lý vấn đề ATM và phí ở nước ngoài",
            sampleDialogue: [
              { speaker: "You", line: "Excuse me, this ATM swallowed my card." },
              { speaker: "Guard", line: "You'll need to speak with the bank staff inside." },
              { speaker: "You", line: "Is there a fee for foreign cards here?" },
              { speaker: "Staff", line: "Yes, there's a $3 transaction fee for international cards." },
            ],
          },
        ],
        vocabulary: [
          { term: "break the bank", meaning: "tốn rất nhiều tiền", meaningEn: "cost too much money", type: "idiom", example: "This vacation won't break the bank.", exampleVi: "Chuyến du lịch này không tốn nhiều tiền đâu." },
          { term: "save up", meaning: "tiết kiệm tiền cho mục đích nào đó", meaningEn: "accumulate money for a purpose", type: "phrasal-verb", example: "I'm saving up for a new laptop.", exampleVi: "Tôi đang tiết kiệm để mua laptop mới." },
          { term: "pay off", meaning: "trả hết nợ", meaningEn: "finish paying a debt", type: "phrasal-verb", example: "I finally paid off my student loan.", exampleVi: "Cuối cùng tôi trả hết nợ sinh viên." },
          { term: "live paycheck to paycheck", meaning: "sống từ tháng này sang tháng khác", meaningEn: "spend all income with nothing saved", type: "idiom", example: "Many people live paycheck to paycheck.", exampleVi: "Nhiều người sống từ lương tháng này sang tháng khác." },
        ],
        listeningChallenge: {
          title: "Currency Exchange",
          titleVi: "Đổi ngoại tệ",
          transcript: "Clerk: Today's rate is 1 USD to 24,500 VND. How much would you like to exchange? Customer: $200, please. Clerk: That'll be 4,900,000 VND. There's a 1% service fee. Customer: So the total fee is about $2? Clerk: Correct.",
          questions: [
            { q: "What is the exchange rate?", qVi: "Tỷ giá bao nhiêu?", options: ["24,000 VND", "24,500 VND", "25,000 VND", "23,500 VND"], answer: 1 },
            { q: "What is the service fee?", qVi: "Phí dịch vụ là bao nhiêu?", options: ["0.5%", "1%", "2%", "1.5%"], answer: 1 },
          ],
        },
        speakingTopics: ["Discuss tips for saving money", "Role-play: Report a lost credit card", "Explain the concept of budgeting"],
      },
      // NEW LESSONS for Life Skills
      {
        id: "ls-11-cooking",
        title: "Cooking & Recipes",
        titleVi: "Nấu ăn & Công thức",
        icon: "ChefHat",
        description: "Follow recipes, discuss cooking techniques, share food tips",
        descriptionVi: "Theo công thức, thảo luận kỹ thuật nấu ăn, chia sẻ mẹo",
        badge: "Home Chef",
        badgeVi: "Đầu bếp Gia đình",
        keySituations: [
          {
            title: "Following a Recipe Together",
            titleVi: "Cùng nấu theo Công thức",
            description: "Cooking with a friend and discussing steps",
            descriptionVi: "Nấu ăn với bạn và thảo luận các bước",
            sampleDialogue: [
              { speaker: "You", line: "Okay, the recipe says to dice the onions first." },
              { speaker: "Friend", line: "How small should I cut them?" },
              { speaker: "You", line: "About half an inch. Then we sauté them until golden." },
              { speaker: "Friend", line: "Should I add the garlic at the same time?" },
              { speaker: "You", line: "No, add garlic last — it burns easily." },
            ],
          },
          {
            title: "At a Cooking Class",
            titleVi: "Tại Lớp Học Nấu ăn",
            description: "Asking the instructor for help",
            descriptionVi: "Hỏi giảng viên để được hướng dẫn",
            sampleDialogue: [
              { speaker: "Instructor", line: "Now fold the dough gently. Don't overwork it." },
              { speaker: "You", line: "Like this? Is it supposed to be this sticky?" },
              { speaker: "Instructor", line: "Add a little more flour. Perfect — now let it rest for 20 minutes." },
            ],
          },
        ],
        vocabulary: [
          { term: "from scratch", meaning: "từ đầu, tự làm hoàn toàn", meaningEn: "made entirely at home, not pre-made", type: "expression", example: "I made this pasta from scratch!", exampleVi: "Tôi tự làm mì Ý từ đầu!" },
          { term: "a pinch of", meaning: "một nhúm", meaningEn: "a very small amount", type: "expression", example: "Add a pinch of salt.", exampleVi: "Thêm một nhúm muối." },
          { term: "simmer", meaning: "ninh nhỏ lửa", meaningEn: "cook gently just below boiling", type: "expression", example: "Let the sauce simmer for 20 minutes.", exampleVi: "Để nước sốt ninh nhỏ lửa 20 phút." },
          { term: "whip up", meaning: "nấu nhanh một món", meaningEn: "prepare food quickly", type: "phrasal-verb", example: "I can whip up a salad in 5 minutes.", exampleVi: "Tôi có thể làm nhanh một đĩa salad trong 5 phút." },
          { term: "comfort food", meaning: "món ăn gợi nhớ, ấm áp", meaningEn: "food that provides emotional comfort", type: "expression", example: "Phở is my ultimate comfort food.", exampleVi: "Phở là món ăn ấm áp nhất của tôi." },
        ],
        listeningChallenge: {
          title: "Cooking Show Instructions",
          titleVi: "Hướng dẫn Chương trình Nấu ăn",
          transcript: "Chef: Today we're making a classic risotto. First, heat the olive oil in a large pan. Add the arborio rice and stir for two minutes. Then gradually add warm chicken broth, one ladle at a time. Stir constantly — the whole process takes about 18 minutes. Finish with butter and parmesan.",
          questions: [
            { q: "What type of rice is used?", qVi: "Dùng loại gạo gì?", options: ["Basmati", "Jasmine", "Arborio", "Brown rice"], answer: 2 },
            { q: "How long does the process take?", qVi: "Quá trình mất bao lâu?", options: ["10 minutes", "15 minutes", "18 minutes", "25 minutes"], answer: 2 },
          ],
        },
        speakingTopics: ["Describe your favorite dish to cook", "Role-play: Order ingredients at a specialty store", "Explain a Vietnamese recipe to a foreigner", "Discuss food trends like plant-based diets"],
      },
      {
        id: "ls-12-pets",
        title: "Pets & Animals",
        titleVi: "Thú cưng & Động vật",
        icon: "Dog",
        description: "Vet visits, pet care conversations, animal discussions",
        descriptionVi: "Đi bác sĩ thú y, chăm sóc thú cưng, thảo luận về động vật",
        badge: "Animal Lover",
        badgeVi: "Người yêu Động vật",
        keySituations: [
          {
            title: "At the Veterinarian",
            titleVi: "Tại Bác sĩ Thú y",
            description: "Explaining your pet's symptoms",
            descriptionVi: "Giải thích triệu chứng của thú cưng",
            sampleDialogue: [
              { speaker: "Vet", line: "What brings you in today?" },
              { speaker: "You", line: "My dog hasn't been eating for two days and seems lethargic." },
              { speaker: "Vet", line: "Has he vomited at all?" },
              { speaker: "You", line: "Once yesterday. He also drank less water than usual." },
              { speaker: "Vet", line: "Let me run some blood tests. It could be a stomach infection." },
            ],
          },
          {
            title: "At the Pet Store",
            titleVi: "Tại Cửa hàng Thú cưng",
            description: "Asking for advice on pet supplies",
            descriptionVi: "Hỏi tư vấn về đồ dùng cho thú cưng",
            sampleDialogue: [
              { speaker: "You", line: "I just adopted a kitten. What food do you recommend?" },
              { speaker: "Staff", line: "For kittens, I suggest this brand — it's high in protein." },
              { speaker: "You", line: "How often should I feed her?" },
              { speaker: "Staff", line: "Three times a day until she's 6 months old, then twice." },
            ],
          },
        ],
        vocabulary: [
          { term: "puppy love", meaning: "tình yêu non nớt", meaningEn: "innocent, youthful love", type: "idiom", example: "Their relationship is just puppy love.", exampleVi: "Mối quan hệ của họ chỉ là tình yêu non nớt." },
          { term: "let the cat out of the bag", meaning: "lộ bí mật", meaningEn: "reveal a secret accidentally", type: "idiom", example: "She let the cat out of the bag about the surprise party.", exampleVi: "Cô ấy lỡ lộ bí mật về tiệc bất ngờ." },
          { term: "top dog", meaning: "người quyền lực nhất", meaningEn: "the most important person", type: "slang", example: "He's the top dog in the company.", exampleVi: "Anh ấy là người quyền lực nhất công ty." },
          { term: "put down", meaning: "cho an tử (thú cưng)", meaningEn: "euthanize a sick animal", type: "phrasal-verb", example: "It was heartbreaking to put down our old dog.", exampleVi: "Thật đau lòng khi phải cho chú chó già an tử." },
        ],
        listeningChallenge: {
          title: "Pet Adoption Event",
          titleVi: "Sự kiện Nhận nuôi Thú cưng",
          transcript: "Volunteer: We have 15 dogs and 8 cats available today. All animals are vaccinated and spayed or neutered. The adoption fee is $75, which covers medical costs. We also provide a starter kit with food and toys. Applications take about 24 hours to process.",
          questions: [
            { q: "How much is the adoption fee?", qVi: "Phí nhận nuôi là bao nhiêu?", options: ["$50", "$75", "$100", "$125"], answer: 1 },
            { q: "How long does the application process take?", qVi: "Đơn xin nhận nuôi mất bao lâu?", options: ["Same day", "24 hours", "3 days", "1 week"], answer: 1 },
          ],
        },
        speakingTopics: ["Describe your pet or dream pet", "Role-play: Adopt a pet from a shelter", "Discuss whether exotic animals should be pets", "Talk about animal rescue organizations"],
      },
      {
        id: "ls-13-entertainment",
        title: "Entertainment & Hobbies",
        titleVi: "Giải trí & Sở thích",
        icon: "Gamepad2",
        description: "Movies, music, sports, gaming, and leisure activities",
        descriptionVi: "Phim ảnh, âm nhạc, thể thao, game và hoạt động giải trí",
        badge: "Fun Expert",
        badgeVi: "Chuyên gia Giải trí",
        keySituations: [
          {
            title: "Discussing a Movie",
            titleVi: "Thảo luận về Bộ phim",
            description: "Sharing opinions about a movie without spoilers",
            descriptionVi: "Chia sẻ ý kiến về phim mà không spoil",
            sampleDialogue: [
              { speaker: "Friend", line: "Have you seen the new Marvel movie?" },
              { speaker: "You", line: "Yes! I loved the plot twist at the end." },
              { speaker: "Friend", line: "No spoilers! I'm watching it tonight." },
              { speaker: "You", line: "Don't worry, I won't ruin it. But definitely stay after the credits." },
            ],
          },
          {
            title: "Joining a Sports Team",
            titleVi: "Gia nhập Đội Thể thao",
            description: "Signing up for a recreational sports league",
            descriptionVi: "Đăng ký tham gia giải thể thao phong trào",
            sampleDialogue: [
              { speaker: "You", line: "Hi, I'm interested in joining the weekend soccer league." },
              { speaker: "Organizer", line: "Great! We have a beginner and intermediate level. Which suits you?" },
              { speaker: "You", line: "Probably beginner. I haven't played in years." },
              { speaker: "Organizer", line: "No worries! Practice is every Saturday at 9 AM." },
            ],
          },
        ],
        vocabulary: [
          { term: "binge-watch", meaning: "cày phim liên tục", meaningEn: "watch many episodes in one sitting", type: "slang", example: "I binge-watched the entire season in one day.", exampleVi: "Tôi cày hết cả mùa phim trong một ngày." },
          { term: "page-turner", meaning: "sách hấp dẫn không đặt xuống được", meaningEn: "an exciting book", type: "expression", example: "That novel is a real page-turner.", exampleVi: "Cuốn tiểu thuyết đó hấp dẫn không đặt xuống được." },
          { term: "jam out", meaning: "nghe nhạc sôi động, chơi nhạc", meaningEn: "listen to or play music energetically", type: "slang", example: "We jammed out to rock music all night.", exampleVi: "Chúng tôi nghe nhạc rock cả đêm." },
          { term: "on a roll", meaning: "đang thắng liên tục, đang hưng phấn", meaningEn: "experiencing a series of successes", type: "idiom", example: "Our team is on a roll — 5 wins in a row!", exampleVi: "Đội mình đang thắng liên tục — 5 trận liền!" },
        ],
        listeningChallenge: {
          title: "Concert Ticket Purchase",
          titleVi: "Mua vé Buổi hòa nhạc",
          transcript: "Agent: The concert is on March 15th at the Arena. General admission tickets are $45 and VIP seats are $120. VIP includes a meet-and-greet with the band. Doors open at 6 PM, and the show starts at 7:30. Please note that no professional cameras are allowed.",
          questions: [
            { q: "How much are VIP tickets?", qVi: "Vé VIP giá bao nhiêu?", options: ["$45", "$90", "$120", "$150"], answer: 2 },
            { q: "What time does the show start?", qVi: "Show bắt đầu lúc mấy giờ?", options: ["6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM"], answer: 3 },
          ],
        },
        speakingTopics: ["Describe your favorite hobby", "Role-play: Invite a friend to a concert", "Discuss the best movies you've seen this year", "Compare gaming vs outdoor activities"],
      },
      {
        id: "ls-14-weather-seasons",
        title: "Weather & Seasons",
        titleVi: "Thời tiết & Mùa",
        icon: "CloudSun",
        description: "Talk about weather, plan activities around seasons",
        descriptionVi: "Nói về thời tiết, lên kế hoạch theo mùa",
        badge: "Weather Watcher",
        badgeVi: "Nhà Dự báo",
        keySituations: [
          {
            title: "Planning Around Weather",
            titleVi: "Lên kế hoạch theo Thời tiết",
            description: "Making plans based on the weather forecast",
            descriptionVi: "Lên kế hoạch dựa theo dự báo thời tiết",
            sampleDialogue: [
              { speaker: "Friend", line: "Should we have the barbecue on Saturday?" },
              { speaker: "You", line: "I checked the forecast — it says 70% chance of rain." },
              { speaker: "Friend", line: "That's too risky. What about Sunday?" },
              { speaker: "You", line: "Sunday looks perfect — sunny and 25 degrees." },
              { speaker: "Friend", line: "Let's do Sunday then. I'll bring the grill." },
            ],
          },
          {
            title: "Small Talk About Weather",
            titleVi: "Trò chuyện Xã giao về Thời tiết",
            description: "Using weather as a conversation starter",
            descriptionVi: "Dùng thời tiết để mở đầu cuộc trò chuyện",
            sampleDialogue: [
              { speaker: "Colleague", line: "Can you believe this heat? It's 38 degrees!" },
              { speaker: "You", line: "I know, right? I could barely walk to the office." },
              { speaker: "Colleague", line: "They say it'll cool down by Thursday." },
              { speaker: "You", line: "I hope so. I miss sweater weather!" },
            ],
          },
        ],
        vocabulary: [
          { term: "under the weather", meaning: "không khỏe", meaningEn: "feeling ill", type: "idiom", example: "I'm feeling a bit under the weather today.", exampleVi: "Hôm nay tôi hơi không khỏe." },
          { term: "rain or shine", meaning: "dù thời tiết thế nào", meaningEn: "regardless of weather conditions", type: "idiom", example: "The festival will happen rain or shine.", exampleVi: "Lễ hội sẽ diễn ra dù trời mưa hay nắng." },
          { term: "sweater weather", meaning: "thời tiết mát mẻ để mặc áo len", meaningEn: "cool enough for a sweater", type: "slang", example: "Fall is finally here — sweater weather!", exampleVi: "Cuối cùng cũng đến mùa thu — thời tiết mặc áo len!" },
          { term: "heatwave", meaning: "đợt nóng kéo dài", meaningEn: "prolonged period of extreme heat", type: "expression", example: "We're in the middle of a heatwave.", exampleVi: "Chúng ta đang ở giữa đợt nóng." },
        ],
        listeningChallenge: {
          title: "Weather Forecast",
          titleVi: "Dự báo Thời tiết",
          transcript: "Good morning! Today will be partly cloudy with a high of 28 degrees Celsius. Expect afternoon showers around 3 PM, clearing up by evening. Tomorrow will be sunny with temperatures reaching 32 degrees. UV index is high, so don't forget your sunscreen. The weekend looks dry and pleasant.",
          questions: [
            { q: "What is today's high temperature?", qVi: "Nhiệt độ cao nhất hôm nay?", options: ["25°C", "28°C", "30°C", "32°C"], answer: 1 },
            { q: "When are afternoon showers expected?", qVi: "Mưa chiều dự kiến lúc mấy giờ?", options: ["1 PM", "2 PM", "3 PM", "4 PM"], answer: 2 },
          ],
        },
        speakingTopics: ["Describe your favorite season and why", "Compare weather in Vietnam and other countries", "Role-play: Suggest indoor activities on a rainy day"],
      },
      {
        id: "ls-15-celebrations",
        title: "Celebrations & Holidays",
        titleVi: "Lễ hội & Ngày lễ",
        icon: "PartyPopper",
        description: "Birthday parties, cultural celebrations, holiday greetings",
        descriptionVi: "Tiệc sinh nhật, lễ hội văn hóa, lời chúc ngày lễ",
        badge: "Party Planner",
        badgeVi: "Người Tổ chức Tiệc",
        keySituations: [
          {
            title: "Planning a Birthday Party",
            titleVi: "Lên kế hoạch Tiệc Sinh nhật",
            description: "Organizing a surprise party for a friend",
            descriptionVi: "Tổ chức tiệc bất ngờ cho bạn",
            sampleDialogue: [
              { speaker: "You", line: "Let's throw a surprise party for Mai's birthday!" },
              { speaker: "Friend", line: "Great idea! When and where?" },
              { speaker: "You", line: "Saturday at my place. Can you handle the cake?" },
              { speaker: "Friend", line: "Sure! Chocolate or vanilla?" },
              { speaker: "You", line: "She loves chocolate. And make sure she doesn't suspect anything!" },
            ],
          },
          {
            title: "Explaining Vietnamese Holidays",
            titleVi: "Giải thích Ngày lễ Việt Nam",
            description: "Telling a foreign friend about Tet and other celebrations",
            descriptionVi: "Kể cho bạn nước ngoài về Tết và các lễ hội khác",
            sampleDialogue: [
              { speaker: "Friend", line: "What's Tet? I keep seeing decorations everywhere." },
              { speaker: "You", line: "Tet is Vietnamese New Year — it's the biggest holiday here." },
              { speaker: "Friend", line: "What do people usually do?" },
              { speaker: "You", line: "Families gather, eat traditional food, and give lucky money in red envelopes." },
              { speaker: "Friend", line: "That sounds amazing! Can I join your family celebration?" },
              { speaker: "You", line: "Of course! You'll love the food." },
            ],
          },
        ],
        vocabulary: [
          { term: "throw a party", meaning: "tổ chức tiệc", meaningEn: "organize a party", type: "expression", example: "Let's throw a party this weekend!", exampleVi: "Cuối tuần mình tổ chức tiệc nhé!" },
          { term: "ring in the new year", meaning: "đón năm mới", meaningEn: "celebrate the start of a new year", type: "idiom", example: "We rang in the new year with fireworks.", exampleVi: "Chúng tôi đón năm mới với pháo hoa." },
          { term: "RSVP", meaning: "phản hồi mời", meaningEn: "respond to an invitation", type: "expression", example: "Please RSVP by Friday.", exampleVi: "Vui lòng phản hồi trước thứ Sáu." },
          { term: "the life of the party", meaning: "linh hồn của bữa tiệc", meaningEn: "the most entertaining person at a party", type: "idiom", example: "Jake is always the life of the party.", exampleVi: "Jake luôn là linh hồn của bữa tiệc." },
        ],
        listeningChallenge: {
          title: "Wedding Invitation",
          titleVi: "Thiệp Mời Đám cưới",
          transcript: "Sarah: You're invited to our wedding on June 15th at the Grand Hotel. The ceremony starts at 4 PM, followed by dinner and dancing. Dress code is semi-formal. Please RSVP by May 30th. We'd also appreciate it if guests could contribute to our honeymoon fund instead of traditional gifts.",
          questions: [
            { q: "When is the wedding?", qVi: "Đám cưới ngày nào?", options: ["June 10th", "June 15th", "July 15th", "May 30th"], answer: 1 },
            { q: "What does the couple prefer instead of gifts?", qVi: "Cặp đôi muốn gì thay vì quà?", options: ["Gift cards", "Cash", "Honeymoon fund", "Charity donation"], answer: 2 },
          ],
        },
        speakingTopics: ["Describe your favorite holiday tradition", "Role-play: Plan a surprise party with a friend", "Compare celebrations across different cultures", "Explain Tet to a foreigner"],
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
              { speaker: "Interviewer", line: "Can you give me an example?" },
              { speaker: "You", line: "When our team shifted to remote work, I redesigned our workflow and increased productivity by 20%." },
            ],
          },
          {
            title: "Behavioral Questions",
            titleVi: "Câu hỏi Hành vi (STAR Method)",
            description: "Using the STAR method to answer behavioral questions",
            descriptionVi: "Dùng phương pháp STAR để trả lời câu hỏi hành vi",
            sampleDialogue: [
              { speaker: "Interviewer", line: "Tell me about a time you handled a conflict at work." },
              { speaker: "You", line: "Sure. At my previous job, two team members disagreed on a project direction." },
              { speaker: "You", line: "I organized a meeting where each person presented their case, then we found a compromise." },
              { speaker: "You", line: "The result was a stronger project and the team learned to collaborate better." },
            ],
          },
        ],
        vocabulary: [
          { term: "land a job", meaning: "kiếm được việc", meaningEn: "successfully get a job", type: "idiom", example: "She landed a job at Google!", exampleVi: "Cô ấy kiếm được việc ở Google!" },
          { term: "bring to the table", meaning: "đóng góp, mang lại giá trị", meaningEn: "contribute skills or value", type: "idiom", example: "What can you bring to the table?", exampleVi: "Bạn có thể đóng góp gì?" },
          { term: "follow up", meaning: "theo dõi, liên hệ lại", meaningEn: "contact again after initial meeting", type: "phrasal-verb", example: "I'll follow up with an email tomorrow.", exampleVi: "Tôi sẽ gửi email liên hệ lại ngày mai." },
          { term: "go-getter", meaning: "người năng động, chủ động", meaningEn: "an ambitious and energetic person", type: "expression", example: "We need a real go-getter for this role.", exampleVi: "Chúng tôi cần người năng động cho vị trí này." },
          { term: "nail the interview", meaning: "phỏng vấn xuất sắc", meaningEn: "perform excellently in an interview", type: "slang", example: "She totally nailed the interview.", exampleVi: "Cô ấy phỏng vấn xuất sắc." },
        ],
        listeningChallenge: {
          title: "HR Interview",
          titleVi: "Phỏng vấn HR",
          transcript: "HR: Why did you leave your previous job? Candidate: I was looking for more growth opportunities. My previous role was rewarding, but I felt I'd reached a plateau. HR: What salary range are you expecting? Candidate: Based on my research, I'd expect between $50,000 and $60,000. HR: We can definitely work within that range.",
          questions: [
            { q: "Why did the candidate leave?", qVi: "Tại sao ứng viên nghỉ việc cũ?", options: ["Low salary", "Bad boss", "Wanted growth", "Relocated"], answer: 2 },
            { q: "What salary range does the candidate expect?", qVi: "Ứng viên mong đợi mức lương nào?", options: ["$40-50K", "$50-60K", "$60-70K", "$45-55K"], answer: 1 },
          ],
        },
        speakingTopics: ["Practice answering 'Tell me about yourself'", "Role-play: Negotiate a salary", "Describe your dream job", "Use STAR method for a behavioral question"],
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
          {
            title: "LinkedIn Conversation",
            titleVi: "Trò chuyện trên LinkedIn",
            description: "Writing professional messages on LinkedIn",
            descriptionVi: "Viết tin nhắn chuyên nghiệp trên LinkedIn",
            sampleDialogue: [
              { speaker: "Message", line: "Hi Sarah, I really enjoyed your article on data-driven marketing. I'm working on a similar project and would love to exchange ideas." },
              { speaker: "Reply", line: "Thanks for reaching out! I'd be happy to chat. Are you free for a virtual coffee next week?" },
              { speaker: "Message", line: "That would be great! How about Tuesday at 3 PM?" },
            ],
          },
        ],
        vocabulary: [
          { term: "touch base", meaning: "liên lạc lại", meaningEn: "reconnect or check in briefly", type: "idiom", example: "Let's touch base next week.", exampleVi: "Tuần sau mình liên lạc lại nhé." },
          { term: "pick someone's brain", meaning: "hỏi ý kiến/kiến thức ai đó", meaningEn: "ask for advice or knowledge", type: "idiom", example: "Can I pick your brain about digital marketing?", exampleVi: "Cho mình hỏi ý kiến về marketing số được không?" },
          { term: "put in a good word", meaning: "giới thiệu tốt cho ai đó", meaningEn: "recommend someone favorably", type: "idiom", example: "Could you put in a good word for me with the hiring manager?", exampleVi: "Bạn có thể giới thiệu tốt cho tôi với quản lý tuyển dụng không?" },
          { term: "warm introduction", meaning: "giới thiệu qua người quen", meaningEn: "introduction through a mutual contact", type: "expression", example: "A warm introduction is always better than a cold email.", exampleVi: "Giới thiệu qua người quen luôn tốt hơn email lạ." },
        ],
        listeningChallenge: {
          title: "Elevator Pitch",
          titleVi: "Bài giới thiệu 30 giây",
          transcript: "Hi, I'm David. I run a small EdTech company that helps Vietnamese students learn English through AI-powered conversations. We've helped over 5,000 students improve their speaking skills. I'd love to explore partnership opportunities. Can I send you our company profile?",
          questions: [
            { q: "What industry is David in?", qVi: "David hoạt động trong lĩnh vực nào?", options: ["Finance", "Healthcare", "EdTech", "Real estate"], answer: 2 },
            { q: "How many students has the company helped?", qVi: "Công ty đã giúp bao nhiêu học sinh?", options: ["1,000", "3,000", "5,000", "10,000"], answer: 2 },
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
              { speaker: "Manager", line: "I'll follow up with finance today. Tom, your turn." },
            ],
          },
          {
            title: "Cross-Department Meeting",
            titleVi: "Họp Liên phòng ban",
            description: "Coordinating between different teams",
            descriptionVi: "Phối hợp giữa các phòng ban khác nhau",
            sampleDialogue: [
              { speaker: "You", line: "Thanks for joining. The purpose of today's meeting is to align on the product launch timeline." },
              { speaker: "Marketing", line: "We need the final assets by March 20th." },
              { speaker: "Engineering", line: "That's tight. Can we push to March 25th?" },
              { speaker: "You", line: "Let's compromise — March 22nd. Does that work for everyone?" },
            ],
          },
        ],
        vocabulary: [
          { term: "table a discussion", meaning: "hoãn thảo luận", meaningEn: "postpone discussion to later", type: "expression", example: "Let's table this for next week.", exampleVi: "Để vấn đề này sang tuần sau bàn tiếp." },
          { term: "take the floor", meaning: "lên phát biểu", meaningEn: "start speaking in a meeting", type: "idiom", example: "David, please take the floor.", exampleVi: "David, mời anh phát biểu." },
          { term: "wrap up", meaning: "kết thúc", meaningEn: "bring to a conclusion", type: "phrasal-verb", example: "Let's wrap up in five minutes.", exampleVi: "Năm phút nữa mình kết thúc nhé." },
          { term: "circle back", meaning: "quay lại vấn đề sau", meaningEn: "return to a topic later", type: "phrasal-verb", example: "Let's circle back to this after lunch.", exampleVi: "Sau bữa trưa mình quay lại vấn đề này." },
          { term: "action item", meaning: "hành động cần thực hiện", meaningEn: "task assigned during a meeting", type: "expression", example: "Your action item is to send the updated report by Friday.", exampleVi: "Việc cần làm của bạn là gửi báo cáo cập nhật trước thứ Sáu." },
        ],
        listeningChallenge: {
          title: "Meeting Agenda Review",
          titleVi: "Xem lại Chương trình Cuộc họp",
          transcript: "Manager: Today's agenda has three items: budget review, project timeline, and team assignments. Let's keep each topic to 10 minutes. I want us out of here by 3:30. Let's start with the budget — Tom, can you share your screen? Tom: Sure, pulling it up now.",
          questions: [
            { q: "How many agenda items are there?", qVi: "Có bao nhiêu mục trong chương trình?", options: ["2", "3", "4", "5"], answer: 1 },
            { q: "When does the manager want to finish?", qVi: "Quản lý muốn kết thúc lúc mấy giờ?", options: ["3:00", "3:15", "3:30", "4:00"], answer: 2 },
          ],
        },
        speakingTopics: ["Lead a mock team meeting", "Role-play: Handle a disagreement in a meeting", "Describe the most productive meeting you've attended"],
      },
      {
        id: "pro-04-presentations",
        title: "Giving Presentations",
        titleVi: "Thuyết trình",
        icon: "BarChart3",
        description: "Present ideas, handle Q&A, use visuals effectively",
        descriptionVi: "Trình bày ý tưởng, xử lý hỏi đáp, dùng hình ảnh hiệu quả",
        badge: "Presentation Pro",
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
          {
            title: "Handling Q&A",
            titleVi: "Xử lý Hỏi & Đáp",
            description: "Answering tough questions confidently",
            descriptionVi: "Trả lời câu hỏi khó tự tin",
            sampleDialogue: [
              { speaker: "Audience", line: "How did you arrive at the 15% growth figure?" },
              { speaker: "You", line: "Great question. The 15% comes from our year-over-year comparison." },
              { speaker: "Audience", line: "Does that account for seasonal variations?" },
              { speaker: "You", line: "Yes, we used adjusted figures. I can share the full data after the session." },
            ],
          },
        ],
        vocabulary: [
          { term: "cut to the chase", meaning: "đi thẳng vào vấn đề", meaningEn: "get to the point directly", type: "idiom", example: "Let me cut to the chase — here are the results.", exampleVi: "Để tôi đi thẳng vào vấn đề — đây là kết quả." },
          { term: "run through", meaning: "trình bày tóm tắt", meaningEn: "go over quickly", type: "phrasal-verb", example: "Let me run through the key points.", exampleVi: "Để tôi trình bày qua các điểm chính." },
          { term: "break it down", meaning: "phân tích chi tiết", meaningEn: "explain in simpler parts", type: "phrasal-verb", example: "Let me break it down for you.", exampleVi: "Để tôi phân tích chi tiết cho bạn." },
          { term: "take away", meaning: "điểm cần nhớ", meaningEn: "key point to remember", type: "expression", example: "The main takeaway from today is this chart.", exampleVi: "Điểm chính cần nhớ hôm nay là biểu đồ này." },
        ],
        listeningChallenge: {
          title: "Presentation Conclusion",
          titleVi: "Kết thúc Bài Thuyết trình",
          transcript: "To sum up, our revenue grew 15% this quarter. Key drivers were the Asian market expansion and our new product line. I recommend we increase our marketing budget by 10% for Q4. Any questions? Remember, the full report will be shared via email by end of day.",
          questions: [
            { q: "How much did revenue grow?", qVi: "Doanh thu tăng bao nhiêu?", options: ["10%", "12%", "15%", "20%"], answer: 2 },
            { q: "What marketing budget increase is recommended?", qVi: "Đề xuất tăng ngân sách marketing bao nhiêu?", options: ["5%", "8%", "10%", "15%"], answer: 2 },
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
              { speaker: "Body", line: "1. Sarah: Update the marketing deck. 2. Tom: Run the financial projections. 3. Lisa: Schedule client demos." },
            ],
          },
          {
            title: "Requesting Information",
            titleVi: "Yêu cầu Thông tin",
            description: "Writing polite requests via email",
            descriptionVi: "Viết email yêu cầu lịch sự",
            sampleDialogue: [
              { speaker: "Subject", line: "Request for Q4 Budget Information" },
              { speaker: "Body", line: "Dear Mr. Johnson, I hope this email finds you well. I'm reaching out to request the updated Q4 budget allocation for our department." },
              { speaker: "Body", line: "Could you kindly share this by end of week? Please let me know if you need any clarification." },
            ],
          },
        ],
        vocabulary: [
          { term: "as per our conversation", meaning: "như đã trao đổi", meaningEn: "as we discussed", type: "expression", example: "As per our conversation, I've attached the report.", exampleVi: "Như đã trao đổi, tôi đính kèm báo cáo." },
          { term: "loop someone in", meaning: "thêm ai đó vào cuộc trao đổi", meaningEn: "include someone in communication", type: "phrasal-verb", example: "Please loop in the marketing team.", exampleVi: "Vui lòng thêm đội marketing vào email." },
          { term: "touch base", meaning: "liên lạc ngắn", meaningEn: "make brief contact", type: "idiom", example: "Just wanted to touch base on the project status.", exampleVi: "Chỉ muốn liên lạc nhanh về tình trạng dự án." },
          { term: "heads up", meaning: "thông báo trước", meaningEn: "advance notice or warning", type: "slang", example: "Just a heads up — the meeting is moved to 3 PM.", exampleVi: "Thông báo trước — cuộc họp chuyển sang 3 giờ chiều." },
        ],
        listeningChallenge: {
          title: "Voicemail Message",
          titleVi: "Tin nhắn thoại",
          transcript: "Hi, this is Lisa from Acme Corp. I'm calling about the proposal you sent last Tuesday. I'd like to schedule a call on Thursday at 2 PM to discuss the details. We're particularly interested in the pricing section. Please confirm by email. Thanks.",
          questions: [
            { q: "When does Lisa want to schedule the call?", qVi: "Lisa muốn hẹn gọi khi nào?", options: ["Monday 3 PM", "Wednesday 1 PM", "Thursday 2 PM", "Friday 10 AM"], answer: 2 },
            { q: "Which section is Lisa most interested in?", qVi: "Lisa quan tâm nhất phần nào?", options: ["Timeline", "Team", "Pricing", "Scope"], answer: 2 },
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
              { speaker: "Colleague", line: "That's fair. Let me talk to the product team." },
            ],
          },
          {
            title: "Giving Critical Feedback",
            titleVi: "Đưa Phản hồi Có tính Phê bình",
            description: "Providing constructive criticism without offending",
            descriptionVi: "Đưa phê bình xây dựng mà không gây phật lòng",
            sampleDialogue: [
              { speaker: "You", line: "Tom, I noticed the client report had some inconsistencies in the data." },
              { speaker: "Tom", line: "Really? Which parts?" },
              { speaker: "You", line: "The Q2 numbers don't match the dashboard. Maybe we should double-check the source." },
              { speaker: "Tom", line: "Good catch. I'll fix it before the deadline." },
            ],
          },
        ],
        vocabulary: [
          { term: "see eye to eye", meaning: "đồng ý, cùng quan điểm", meaningEn: "agree with someone", type: "idiom", example: "We don't always see eye to eye on strategy.", exampleVi: "Chúng tôi không phải lúc nào cũng đồng ý về chiến lược." },
          { term: "sort out", meaning: "giải quyết", meaningEn: "resolve a problem", type: "phrasal-verb", example: "Let's sort this out before it escalates.", exampleVi: "Hãy giải quyết trước khi vấn đề leo thang." },
          { term: "meet someone halfway", meaning: "nhượng bộ, thỏa hiệp", meaningEn: "compromise", type: "idiom", example: "Can we meet halfway on the deadline?", exampleVi: "Mình có thể thỏa hiệp về thời hạn không?" },
          { term: "clear the air", meaning: "giải tỏa hiểu lầm", meaningEn: "resolve tension or misunderstanding", type: "idiom", example: "Let's have a chat to clear the air.", exampleVi: "Hãy nói chuyện để giải tỏa hiểu lầm." },
        ],
        listeningChallenge: {
          title: "Mediation Session",
          titleVi: "Buổi Hòa giải",
          transcript: "Mediator: Let's hear both sides. Tom, you feel the workload is unfair? Tom: Yes, I'm handling 70% of the project while Lisa handles 30%. Mediator: Lisa, what's your perspective? Lisa: I've been focusing on client meetings, which aren't visible in the task list. They take significant time and energy.",
          questions: [
            { q: "What percentage of work does Tom say he handles?", qVi: "Tom nói anh ấy xử lý bao nhiêu phần trăm công việc?", options: ["50%", "60%", "70%", "80%"], answer: 2 },
            { q: "What has Lisa been focusing on?", qVi: "Lisa tập trung vào việc gì?", options: ["Reports", "Client meetings", "Coding", "Design"], answer: 1 },
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
          {
            title: "Salary Negotiation",
            titleVi: "Đàm phán Lương",
            description: "Negotiating compensation package",
            descriptionVi: "Đàm phán gói lương thưởng",
            sampleDialogue: [
              { speaker: "HR", line: "We'd like to offer you the position at $55,000." },
              { speaker: "You", line: "Thank you for the offer. Based on my experience and market research, I was expecting closer to $65,000." },
              { speaker: "HR", line: "We might be able to go to $60,000 with additional PTO." },
              { speaker: "You", line: "That sounds reasonable. Could I also discuss the signing bonus?" },
            ],
          },
        ],
        vocabulary: [
          { term: "sweeten the deal", meaning: "thêm ưu đãi để hấp dẫn hơn", meaningEn: "add incentives to make an offer more attractive", type: "idiom", example: "We can sweeten the deal with free support.", exampleVi: "Chúng tôi có thể thêm hỗ trợ miễn phí để hấp dẫn hơn." },
          { term: "bottom line", meaning: "giới hạn cuối cùng, điểm mấu chốt", meaningEn: "the final, most important point", type: "expression", example: "What's your bottom line on pricing?", exampleVi: "Giá thấp nhất bạn có thể chấp nhận là bao nhiêu?" },
          { term: "win-win", meaning: "đôi bên cùng có lợi", meaningEn: "beneficial for both parties", type: "expression", example: "Let's find a win-win solution.", exampleVi: "Hãy tìm giải pháp đôi bên cùng có lợi." },
          { term: "ballpark figure", meaning: "con số ước tính", meaningEn: "rough estimate", type: "expression", example: "Can you give me a ballpark figure?", exampleVi: "Bạn có thể cho tôi con số ước tính không?" },
        ],
        listeningChallenge: {
          title: "Supplier Negotiation",
          titleVi: "Đàm phán với Nhà cung cấp",
          transcript: "Buyer: We need faster delivery — 5 days instead of 10. Supplier: That's possible but will cost 8% more. Buyer: We can accept 5% extra for orders over 1,000 units. Supplier: Deal. We'll also throw in free packaging for the first order.",
          questions: [
            { q: "What delivery time does the buyer want?", qVi: "Người mua muốn giao hàng trong bao lâu?", options: ["3 days", "5 days", "7 days", "10 days"], answer: 1 },
            { q: "What extra bonus does the supplier offer?", qVi: "Nhà cung cấp thêm ưu đãi gì?", options: ["Free shipping", "Free packaging", "Extra discount", "Free samples"], answer: 1 },
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
          {
            title: "Async Communication",
            titleVi: "Giao tiếp Bất đồng bộ",
            description: "Writing clear Slack/Teams messages across time zones",
            descriptionVi: "Viết tin nhắn Slack/Teams rõ ràng qua múi giờ",
            sampleDialogue: [
              { speaker: "You", line: "Hey team, I'm signing off for the day (it's 6 PM my time). Here's my status update:" },
              { speaker: "You", line: "✅ Completed the wireframes. ⏳ Waiting for copy from Sarah. 🚫 Blocked on API access." },
              { speaker: "You", line: "Sarah, no rush — just drop the copy in the doc when you can. I'll pick it up tomorrow morning." },
            ],
          },
        ],
        vocabulary: [
          { term: "you're on mute", meaning: "bạn đang tắt mic", meaningEn: "your microphone is off", type: "expression", example: "Tom, you're on mute again!", exampleVi: "Tom, bạn lại tắt mic rồi!" },
          { term: "drop off the call", meaning: "rời cuộc gọi", meaningEn: "leave a video/phone call", type: "expression", example: "I need to drop off at 3 PM.", exampleVi: "Tôi cần rời cuộc gọi lúc 3 giờ." },
          { term: "async", meaning: "bất đồng bộ", meaningEn: "communication not in real-time", type: "slang", example: "Let's handle this async — no need for a meeting.", exampleVi: "Mình xử lý bất đồng bộ đi — không cần họp." },
          { term: "deep work", meaning: "làm việc tập trung sâu", meaningEn: "focused, uninterrupted work", type: "expression", example: "I block mornings for deep work.", exampleVi: "Tôi dành buổi sáng để làm việc tập trung sâu." },
        ],
        listeningChallenge: {
          title: "Stand-up Meeting on Zoom",
          titleVi: "Họp nhanh trên Zoom",
          transcript: "Manager: Quick updates — Sarah finished the mockups. Tom is blocked by the API issue. Lisa, can you help Tom today? Lisa: Sure, I'll pair program with him this afternoon. Manager: Perfect. Also, Friday is our team retrospective at 4 PM. Please come prepared with feedback.",
          questions: [
            { q: "Who is blocked?", qVi: "Ai bị vướng mắc?", options: ["Sarah", "Lisa", "Tom", "Manager"], answer: 2 },
            { q: "What happens on Friday?", qVi: "Thứ Sáu có gì?", options: ["Team lunch", "Demo day", "Retrospective", "Planning"], answer: 2 },
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
              { speaker: "You", line: "I completely understand your frustration. As an apology, I'd like to offer a 20% discount on your next order." },
              { speaker: "Customer", line: "Well, that helps. Thank you." },
            ],
          },
          {
            title: "Upselling a Product",
            titleVi: "Bán thêm Sản phẩm",
            description: "Suggesting upgrades or additional products naturally",
            descriptionVi: "Gợi ý nâng cấp hoặc sản phẩm thêm tự nhiên",
            sampleDialogue: [
              { speaker: "You", line: "Since you're buying the laptop, would you like our protection plan? It covers accidental damage for 2 years." },
              { speaker: "Customer", line: "How much does it cost?" },
              { speaker: "You", line: "Only $79 — a fraction of the repair cost. It also includes free tech support." },
              { speaker: "Customer", line: "That sounds like a good deal. I'll take it." },
            ],
          },
        ],
        vocabulary: [
          { term: "bear with me", meaning: "vui lòng chờ tôi một chút", meaningEn: "please be patient", type: "expression", example: "Bear with me while I look this up.", exampleVi: "Vui lòng chờ tôi tra cứu." },
          { term: "go the extra mile", meaning: "làm nhiều hơn mong đợi", meaningEn: "do more than expected", type: "idiom", example: "We always go the extra mile for our customers.", exampleVi: "Chúng tôi luôn làm nhiều hơn mong đợi cho khách hàng." },
          { term: "get back to you", meaning: "liên lạc lại sau", meaningEn: "respond later with information", type: "phrasal-verb", example: "Let me look into this and get back to you.", exampleVi: "Để tôi kiểm tra và liên lạc lại với bạn." },
          { term: "make it right", meaning: "sửa sai, bù đắp", meaningEn: "correct a mistake or fix a problem", type: "expression", example: "We'll make it right — here's a refund and a free replacement.", exampleVi: "Chúng tôi sẽ bù đắp — đây là hoàn tiền và sản phẩm thay thế miễn phí." },
        ],
        listeningChallenge: {
          title: "Customer Feedback Call",
          titleVi: "Cuộc gọi Phản hồi Khách hàng",
          transcript: "Agent: Thank you for your feedback. We'll process your refund within 5 business days. You'll receive a confirmation email shortly. As a gesture of apology, we've also added a $10 credit to your account. Is there anything else I can help with?",
          questions: [
            { q: "How long will the refund take?", qVi: "Hoàn tiền mất bao lâu?", options: ["2 days", "3 days", "5 business days", "7 days"], answer: 2 },
            { q: "What additional compensation was offered?", qVi: "Bồi thường thêm là gì?", options: ["Free product", "$10 credit", "Discount code", "Free shipping"], answer: 1 },
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
              { speaker: "You", line: "One area to improve — the executive summary could be more concise. Focus on the top 3 findings." },
              { speaker: "You", line: "Overall, great work. Keep pushing the quality higher!" },
              { speaker: "Sarah", line: "Thank you — I'll tighten up the summary." },
            ],
          },
          {
            title: "Motivating a Struggling Team Member",
            titleVi: "Tạo Động lực cho Nhân viên Gặp khó khăn",
            description: "Supporting team members through challenges",
            descriptionVi: "Hỗ trợ thành viên đội nhóm vượt qua thử thách",
            sampleDialogue: [
              { speaker: "You", line: "Hey Tom, I noticed you've seemed a bit stressed lately. Everything okay?" },
              { speaker: "Tom", line: "Honestly, I'm overwhelmed with the project deadlines." },
              { speaker: "You", line: "Let's look at your tasks together and prioritize. We can redistribute some work." },
              { speaker: "Tom", line: "That would really help. Thank you for understanding." },
            ],
          },
        ],
        vocabulary: [
          { term: "step up", meaning: "đứng lên chịu trách nhiệm", meaningEn: "take responsibility or leadership", type: "phrasal-verb", example: "It's time to step up and lead.", exampleVi: "Đã đến lúc đứng lên và dẫn dắt." },
          { term: "the ball is in your court", meaning: "đến lượt bạn quyết định", meaningEn: "it's your turn to act", type: "idiom", example: "I've given you the resources — the ball is in your court.", exampleVi: "Tôi đã cung cấp nguồn lực — giờ đến lượt bạn." },
          { term: "lead by example", meaning: "nêu gương bằng hành động", meaningEn: "demonstrate through personal behavior", type: "expression", example: "Great leaders lead by example.", exampleVi: "Nhà lãnh đạo giỏi nêu gương bằng hành động." },
          { term: "empower", meaning: "trao quyền", meaningEn: "give authority or confidence to act", type: "expression", example: "We need to empower our team to make decisions.", exampleVi: "Chúng ta cần trao quyền cho đội nhóm để ra quyết định." },
        ],
        listeningChallenge: {
          title: "Team Motivation Speech",
          titleVi: "Bài phát biểu Tạo động lực cho Đội nhóm",
          transcript: "Team, I know this quarter has been tough. But look at what we've achieved — we exceeded our target by 12%. Each of you contributed to this success. Next quarter, let's aim even higher. I believe in every one of you. Let's celebrate tonight — dinner is on the company!",
          questions: [
            { q: "By how much did the team exceed the target?", qVi: "Đội vượt mục tiêu bao nhiêu?", options: ["5%", "8%", "10%", "12%"], answer: 3 },
            { q: "How will the team celebrate?", qVi: "Đội sẽ ăn mừng thế nào?", options: ["Bonus", "Day off", "Company dinner", "Party"], answer: 2 },
          ],
        },
        speakingTopics: ["Give a motivational speech to your team", "Role-play: Coach an underperforming employee", "Discuss qualities of a great leader"],
      },
      // NEW Professional lessons
      {
        id: "pro-11-onboarding",
        title: "Starting a New Job",
        titleVi: "Bắt đầu Công việc Mới",
        icon: "UserPlus",
        description: "First day, onboarding, building relationships with new colleagues",
        descriptionVi: "Ngày đầu đi làm, hội nhập, xây dựng quan hệ với đồng nghiệp mới",
        badge: "New Starter",
        badgeVi: "Người mới Bắt đầu",
        keySituations: [
          {
            title: "First Day at Work",
            titleVi: "Ngày đầu Đi làm",
            description: "Introducing yourself and learning the office",
            descriptionVi: "Giới thiệu bản thân và tìm hiểu văn phòng",
            sampleDialogue: [
              { speaker: "HR", line: "Welcome to the team! Let me show you around the office." },
              { speaker: "You", line: "Thank you! I'm really excited to be here." },
              { speaker: "HR", line: "This is the marketing floor. Your desk is by the window." },
              { speaker: "You", line: "Great! Who should I reach out to if I have questions about the project?" },
              { speaker: "HR", line: "Your buddy is Tom — he'll help you during your first week." },
            ],
          },
          {
            title: "Meeting Your Team",
            titleVi: "Gặp Đội nhóm",
            description: "Getting to know your new colleagues",
            descriptionVi: "Làm quen với đồng nghiệp mới",
            sampleDialogue: [
              { speaker: "You", line: "Hi everyone, I'm Linh. I just joined the product team as a UX designer." },
              { speaker: "Colleague", line: "Welcome, Linh! I'm Sarah. We'll be working on the same project." },
              { speaker: "You", line: "Nice to meet you! What's the team workflow like here?" },
              { speaker: "Colleague", line: "We do two-week sprints with daily standups at 9:30." },
            ],
          },
        ],
        vocabulary: [
          { term: "hit the ground running", meaning: "bắt đầu làm việc ngay và hiệu quả", meaningEn: "start working effectively right away", type: "idiom", example: "She hit the ground running on her first day.", exampleVi: "Cô ấy bắt đầu làm việc hiệu quả ngay ngày đầu." },
          { term: "learn the ropes", meaning: "học hỏi quy trình, cách làm việc", meaningEn: "learn how things work", type: "idiom", example: "It took me a month to learn the ropes.", exampleVi: "Mất một tháng để tôi nắm được quy trình." },
          { term: "onboarding", meaning: "quá trình hội nhập công ty", meaningEn: "process of integrating a new employee", type: "expression", example: "Our onboarding program lasts two weeks.", exampleVi: "Chương trình hội nhập kéo dài hai tuần." },
          { term: "buddy system", meaning: "hệ thống bạn kèm", meaningEn: "pairing new employees with experienced ones", type: "expression", example: "The buddy system helped me adjust quickly.", exampleVi: "Hệ thống bạn kèm giúp tôi thích nghi nhanh." },
        ],
        listeningChallenge: {
          title: "Office Tour",
          titleVi: "Tham quan Văn phòng",
          transcript: "HR: The kitchen is on this floor — help yourself to coffee and snacks. The meeting rooms are on the 3rd floor, bookable through the app. Quiet rooms for calls are on the 2nd floor. Parking is in the basement — use your badge to access. Lunch break is from 12 to 1 PM, but it's flexible.",
          questions: [
            { q: "Where are the meeting rooms?", qVi: "Phòng họp ở đâu?", options: ["1st floor", "2nd floor", "3rd floor", "4th floor"], answer: 2 },
            { q: "How do you access parking?", qVi: "Dùng gì để vào bãi đậu xe?", options: ["Key", "Badge", "Code", "Ticket"], answer: 1 },
          ],
        },
        speakingTopics: ["Describe your first day at a job", "Role-play: Introduce yourself to a new team", "Discuss tips for succeeding in a new role"],
      },
      {
        id: "pro-12-freelancing",
        title: "Freelancing & Side Hustles",
        titleVi: "Làm Freelance & Nghề tay trái",
        icon: "Rocket",
        description: "Find clients, set rates, manage freelance projects",
        descriptionVi: "Tìm khách hàng, đặt giá, quản lý dự án freelance",
        badge: "Freelancer",
        badgeVi: "Người Tự do",
        keySituations: [
          {
            title: "Pitching to a Client",
            titleVi: "Chào hàng Khách hàng",
            description: "Presenting your services to a potential client",
            descriptionVi: "Giới thiệu dịch vụ cho khách hàng tiềm năng",
            sampleDialogue: [
              { speaker: "Client", line: "We need a website redesign. What's your process?" },
              { speaker: "You", line: "I start with a discovery call to understand your brand, then create wireframes and iterate with your feedback." },
              { speaker: "Client", line: "Timeline?" },
              { speaker: "You", line: "Typically 4-6 weeks. I deliver in milestones so you can review progress." },
              { speaker: "Client", line: "And your rate?" },
              { speaker: "You", line: "My project rate starts at $3,000 for a standard website. I can send a detailed proposal." },
            ],
          },
          {
            title: "Setting Boundaries with Clients",
            titleVi: "Đặt Ranh giới với Khách hàng",
            description: "Managing scope creep and late payments",
            descriptionVi: "Quản lý yêu cầu phát sinh và thanh toán trễ",
            sampleDialogue: [
              { speaker: "Client", line: "Can you also add a blog section? Same price?" },
              { speaker: "You", line: "I'd love to! That would be outside the original scope, so I'd add it as a separate item — around $500." },
              { speaker: "Client", line: "Fair enough. Let's include it." },
            ],
          },
        ],
        vocabulary: [
          { term: "scope creep", meaning: "yêu cầu phát sinh ngoài phạm vi", meaningEn: "gradual expansion of project requirements", type: "expression", example: "We need to avoid scope creep on this project.", exampleVi: "Chúng ta cần tránh yêu cầu phát sinh ngoài phạm vi." },
          { term: "hustle", meaning: "làm việc chăm chỉ, xoay xở", meaningEn: "work hard and energetically", type: "slang", example: "She's always hustling — 3 clients and a full-time job.", exampleVi: "Cô ấy luôn xoay xở — 3 khách hàng cùng một công việc toàn thời gian." },
          { term: "retainer", meaning: "hợp đồng duy trì hàng tháng", meaningEn: "ongoing monthly agreement", type: "expression", example: "They hired me on a monthly retainer.", exampleVi: "Họ thuê tôi theo hợp đồng duy trì hàng tháng." },
          { term: "deliverable", meaning: "sản phẩm bàn giao", meaningEn: "completed work product", type: "expression", example: "The final deliverable is a complete brand guide.", exampleVi: "Sản phẩm bàn giao cuối cùng là bộ nhận diện thương hiệu hoàn chỉnh." },
        ],
        listeningChallenge: {
          title: "Freelance Platform Review",
          titleVi: "Đánh giá Nền tảng Freelance",
          transcript: "Reviewer: Upwork is great for long-term clients, while Fiverr works better for quick gigs. Both charge around 20% for new clients, dropping to 10% after $500 in revenue with the same client. I recommend building direct relationships to avoid fees. Don't forget to collect testimonials!",
          questions: [
            { q: "What's the initial fee percentage?", qVi: "Phần trăm phí ban đầu?", options: ["10%", "15%", "20%", "25%"], answer: 2 },
            { q: "When does the fee drop to 10%?", qVi: "Khi nào phí giảm còn 10%?", options: ["After 30 days", "After $500 revenue", "After 5 projects", "After 1 year"], answer: 1 },
          ],
        },
        speakingTopics: ["Describe your freelance services or dream side hustle", "Role-play: Negotiate rates with a client", "Discuss work-life balance as a freelancer"],
      },
      {
        id: "pro-13-workplace-culture",
        title: "Workplace Culture & Etiquette",
        titleVi: "Văn hóa & Phép lịch sự Nơi công sở",
        icon: "Building",
        description: "Office norms, professional etiquette, workplace do's and don'ts",
        descriptionVi: "Quy tắc văn phòng, phép lịch sự chuyên nghiệp, nên và không nên",
        badge: "Culture Pro",
        badgeVi: "Chuyên gia Văn hóa",
        keySituations: [
          {
            title: "Office Small Talk",
            titleVi: "Trò chuyện Xã giao ở Văn phòng",
            description: "Appropriate casual conversation topics at work",
            descriptionVi: "Chủ đề trò chuyện phù hợp ở nơi làm việc",
            sampleDialogue: [
              { speaker: "Colleague", line: "Hey, did you do anything fun this weekend?" },
              { speaker: "You", line: "Yeah, I went hiking with friends. The weather was perfect!" },
              { speaker: "Colleague", line: "Nice! I've been meaning to try that trail near the lake." },
              { speaker: "You", line: "You should! I'll send you the directions." },
            ],
          },
          {
            title: "Handling Workplace Gossip",
            titleVi: "Xử lý Tin đồn Nơi công sở",
            description: "Staying professional when gossip arises",
            descriptionVi: "Giữ chuyên nghiệp khi có tin đồn",
            sampleDialogue: [
              { speaker: "Colleague", line: "Did you hear that Tom might get fired?" },
              { speaker: "You", line: "I think it's best not to speculate. We don't know the full story." },
              { speaker: "Colleague", line: "You're right. I just heard it from someone." },
              { speaker: "You", line: "Let's focus on our own work. If there's news, management will tell us." },
            ],
          },
        ],
        vocabulary: [
          { term: "water cooler talk", meaning: "trò chuyện phiếm ở văn phòng", meaningEn: "casual office conversation", type: "expression", example: "The water cooler talk today was about the new office policy.", exampleVi: "Trò chuyện phiếm ở văn phòng hôm nay về chính sách mới." },
          { term: "corporate ladder", meaning: "bậc thang sự nghiệp", meaningEn: "hierarchy of positions in a company", type: "expression", example: "She climbed the corporate ladder quickly.", exampleVi: "Cô ấy leo bậc thang sự nghiệp rất nhanh." },
          { term: "dress code", meaning: "quy định trang phục", meaningEn: "rules about appropriate clothing", type: "expression", example: "Our office has a business casual dress code.", exampleVi: "Văn phòng chúng tôi quy định trang phục công sở lịch sự." },
          { term: "brown-noser", meaning: "người nịnh bợ", meaningEn: "someone who flatters superiors", type: "slang", example: "Nobody likes a brown-noser.", exampleVi: "Không ai thích kẻ nịnh bợ." },
        ],
        listeningChallenge: {
          title: "HR Orientation",
          titleVi: "Buổi Định hướng HR",
          transcript: "HR: Welcome to our company culture overview. We value transparency, collaboration, and work-life balance. Flex hours start at 8 or 9 AM — your choice. We have monthly team outings and quarterly town halls. Our open-door policy means you can approach any manager with concerns.",
          questions: [
            { q: "What values does the company emphasize?", qVi: "Công ty đề cao giá trị nào?", options: ["Speed and competition", "Transparency and collaboration", "Profit and growth", "Independence"], answer: 1 },
            { q: "How often are town halls held?", qVi: "Town hall diễn ra bao lâu một lần?", options: ["Weekly", "Monthly", "Quarterly", "Annually"], answer: 2 },
          ],
        },
        speakingTopics: ["Compare workplace culture in Vietnam and Western countries", "Role-play: Navigate an awkward office situation", "Discuss what makes a positive work environment"],
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
              { speaker: "Against", line: "Banning won't stop access — they'll find workarounds. Regulation and education work better." },
            ],
          },
          {
            title: "Academic Discussion",
            titleVi: "Thảo luận Học thuật",
            description: "Engaging in a university-style seminar discussion",
            descriptionVi: "Tham gia thảo luận kiểu seminar đại học",
            sampleDialogue: [
              { speaker: "Professor", line: "What's the main argument in this week's reading?" },
              { speaker: "You", line: "The author argues that economic inequality is primarily structural, not individual." },
              { speaker: "Classmate", line: "I partially agree, but personal choices still play a role." },
              { speaker: "You", line: "True, but when the system limits options, individual choice is constrained." },
            ],
          },
        ],
        vocabulary: [
          { term: "devil's advocate", meaning: "người phản biện cố ý", meaningEn: "someone who argues an opposing view for debate", type: "idiom", example: "Let me play devil's advocate here.", exampleVi: "Để tôi đóng vai phản biện ở đây." },
          { term: "hold water", meaning: "có cơ sở, thuyết phục", meaningEn: "be logically valid", type: "idiom", example: "That argument doesn't hold water.", exampleVi: "Luận điểm đó không có cơ sở." },
          { term: "on the other hand", meaning: "mặt khác", meaningEn: "presenting a contrasting viewpoint", type: "expression", example: "On the other hand, technology creates new jobs.", exampleVi: "Mặt khác, công nghệ tạo ra việc làm mới." },
          { term: "draw the line", meaning: "đặt giới hạn", meaningEn: "set a boundary", type: "idiom", example: "We need to draw the line somewhere.", exampleVi: "Chúng ta cần đặt giới hạn ở đâu đó." },
          { term: "strawman argument", meaning: "ngụy biện bù nhìn", meaningEn: "misrepresenting someone's argument to attack it", type: "expression", example: "That's a strawman — I never said we should ban all technology.", exampleVi: "Đó là ngụy biện — tôi chưa bao giờ nói cấm toàn bộ công nghệ." },
        ],
        listeningChallenge: {
          title: "Debate Introduction",
          titleVi: "Mở đầu Cuộc Tranh luận",
          transcript: "Moderator: Welcome to today's debate. The motion is: 'AI will replace 50% of jobs within 20 years.' Each team has 5 minutes for opening statements, followed by 3 rounds of rebuttals. The for team argues first. Team members, please keep your responses focused and evidence-based. Audience, you'll vote at the end.",
          questions: [
            { q: "How long are opening statements?", qVi: "Phần mở đầu dài bao lâu?", options: ["3 minutes", "5 minutes", "7 minutes", "10 minutes"], answer: 1 },
            { q: "How many rounds of rebuttals?", qVi: "Có bao nhiêu vòng phản biện?", options: ["2", "3", "4", "5"], answer: 1 },
          ],
        },
        speakingTopics: ["Debate: Should university education be free?", "Practice presenting both sides of an argument", "Discuss the ethics of AI in decision-making", "Play devil's advocate on a popular opinion"],
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
          {
            title: "Politely Disagreeing",
            titleVi: "Không đồng ý Lịch sự",
            description: "Expressing disagreement without being rude",
            descriptionVi: "Bày tỏ bất đồng mà không khiếm nhã",
            sampleDialogue: [
              { speaker: "Person", line: "I think working from home is lazy." },
              { speaker: "You", line: "I respectfully disagree. Studies show remote workers are often more productive." },
              { speaker: "Person", line: "But what about collaboration?" },
              { speaker: "You", line: "That's a fair point. I think a hybrid model addresses both sides." },
            ],
          },
        ],
        vocabulary: [
          { term: "food for thought", meaning: "điều đáng suy nghĩ", meaningEn: "something worth thinking about", type: "idiom", example: "That documentary gave me food for thought.", exampleVi: "Bộ phim tài liệu đó cho tôi nhiều điều suy nghĩ." },
          { term: "take something with a grain of salt", meaning: "nghe nhưng đừng tin hoàn toàn", meaningEn: "be skeptical about something", type: "idiom", example: "Take online reviews with a grain of salt.", exampleVi: "Đọc đánh giá online nhưng đừng tin hoàn toàn." },
          { term: "in my humble opinion", meaning: "theo ý kiến khiêm tốn của tôi", meaningEn: "a polite way to share your view", type: "expression", example: "In my humble opinion, we need more green spaces.", exampleVi: "Theo ý kiến khiêm tốn của tôi, chúng ta cần thêm không gian xanh." },
          { term: "agree to disagree", meaning: "chấp nhận bất đồng", meaningEn: "accept that you won't reach agreement", type: "idiom", example: "Let's agree to disagree on this one.", exampleVi: "Hãy chấp nhận rằng mình bất đồng ở vấn đề này." },
        ],
        listeningChallenge: {
          title: "TED Talk Excerpt",
          titleVi: "Trích đoạn TED Talk",
          transcript: "Speaker: I believe the greatest challenge of our generation isn't climate change or AI — it's our inability to have productive conversations with people we disagree with. If we can't talk, we can't solve anything. We need to rebuild the art of civil discourse — listening to understand, not to respond.",
          questions: [
            { q: "What does the speaker consider the greatest challenge?", qVi: "Diễn giả cho rằng thách thức lớn nhất là gì?", options: ["Climate change", "AI risks", "Inability to have productive conversations", "Poverty"], answer: 2 },
            { q: "What does the speaker want to rebuild?", qVi: "Diễn giả muốn xây dựng lại điều gì?", options: ["Education system", "Civil discourse", "Technology", "Government"], answer: 1 },
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
              { speaker: "Advisor", line: "Registration closes on September 1st. I recommend signing up early — popular classes fill fast." },
            ],
          },
          {
            title: "Finding Accommodation",
            titleVi: "Tìm Chỗ ở",
            description: "Arranging student housing abroad",
            descriptionVi: "Sắp xếp nhà ở sinh viên ở nước ngoài",
            sampleDialogue: [
              { speaker: "You", line: "I'm looking for a shared apartment near campus. What are my options?" },
              { speaker: "Housing Office", line: "We have shared rooms starting at $600/month including utilities." },
              { speaker: "You", line: "Is there a meal plan included?" },
              { speaker: "Housing Office", line: "Not for off-campus housing, but the campus cafeteria offers plans starting at $200/month." },
            ],
          },
        ],
        vocabulary: [
          { term: "hit the books", meaning: "học chăm chỉ", meaningEn: "study hard", type: "idiom", example: "Time to hit the books — finals are next week.", exampleVi: "Đến lúc học chăm rồi — tuần sau thi cuối kỳ." },
          { term: "drop a class", meaning: "bỏ một môn học", meaningEn: "withdraw from a course", type: "expression", example: "I had to drop a class because it was too advanced.", exampleVi: "Tôi phải bỏ một môn vì nó quá nâng cao." },
          { term: "pull an all-nighter", meaning: "thức trắng đêm (để học)", meaningEn: "stay up all night studying", type: "idiom", example: "I pulled an all-nighter before the exam.", exampleVi: "Tôi thức trắng đêm trước kỳ thi." },
          { term: "cram", meaning: "học nhồi nhét trước thi", meaningEn: "study intensively before an exam", type: "slang", example: "I need to cram for tomorrow's test.", exampleVi: "Tôi cần nhồi nhét kiến thức cho bài thi ngày mai." },
          { term: "GPA", meaning: "điểm trung bình", meaningEn: "grade point average", type: "expression", example: "My GPA this semester is 3.8.", exampleVi: "Điểm trung bình học kỳ này của tôi là 3.8." },
        ],
        listeningChallenge: {
          title: "Student Services Announcement",
          titleVi: "Thông báo Dịch vụ Sinh viên",
          transcript: "Attention students: The writing center offers free tutoring Monday through Friday, 9 AM to 5 PM. Drop-ins are welcome, but appointments are recommended. Visit room 302 in the library building. The career center is also open for resume reviews — walk-ins every Wednesday afternoon.",
          questions: [
            { q: "Where is the writing center?", qVi: "Trung tâm viết ở đâu?", options: ["Student center", "Library room 302", "Science building", "Online only"], answer: 1 },
            { q: "When can you get a resume review without appointment?", qVi: "Khi nào có thể xem xét CV không cần hẹn?", options: ["Monday", "Tuesday", "Wednesday afternoon", "Friday"], answer: 2 },
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
          {
            title: "Navigating Social Norms",
            titleVi: "Điều hướng Chuẩn mực Xã hội",
            description: "Understanding different social expectations",
            descriptionVi: "Hiểu các kỳ vọng xã hội khác nhau",
            sampleDialogue: [
              { speaker: "Host", line: "Please, make yourself at home. Would you like to take off your shoes?" },
              { speaker: "You", line: "Oh, should I? In Vietnam, we always take off shoes before entering." },
              { speaker: "Host", line: "Here it varies — some families do, some don't. Feel free either way." },
              { speaker: "You", line: "I'll take them off. Old habits die hard!" },
            ],
          },
        ],
        vocabulary: [
          { term: "culture shock", meaning: "sốc văn hóa", meaningEn: "disorientation when experiencing a new culture", type: "expression", example: "I experienced culture shock when I first moved to Japan.", exampleVi: "Tôi bị sốc văn hóa khi mới đến Nhật." },
          { term: "when in Rome, do as the Romans do", meaning: "nhập gia tùy tục", meaningEn: "adapt to local customs", type: "idiom", example: "I started bowing — when in Rome, right?", exampleVi: "Tôi bắt đầu cúi chào — nhập gia tùy tục mà." },
          { term: "lost in translation", meaning: "bị hiểu sai do ngôn ngữ/văn hóa", meaningEn: "meaning changed due to language/culture differences", type: "expression", example: "My joke was lost in translation.", exampleVi: "Câu đùa của tôi bị hiểu sai do ngôn ngữ." },
          { term: "melting pot", meaning: "nơi hòa trộn văn hóa", meaningEn: "a place where many cultures mix", type: "idiom", example: "New York is a real melting pot.", exampleVi: "New York là nơi hòa trộn văn hóa thực sự." },
        ],
        listeningChallenge: {
          title: "International Student Forum",
          titleVi: "Diễn đàn Sinh viên Quốc tế",
          transcript: "Host: What surprised you most about studying in the UK? Student: The directness. In my country, we're more indirect. But I've learned that here, being direct is simply efficient — not rude. It's about understanding the intent behind the words, not just the words themselves.",
          questions: [
            { q: "What surprised the student?", qVi: "Điều gì làm sinh viên ngạc nhiên?", options: ["The food", "The weather", "The directness", "The schedule"], answer: 2 },
            { q: "How does the student now view directness?", qVi: "Sinh viên giờ nhìn nhận sự thẳng thắn thế nào?", options: ["Still rude", "Efficient", "Unnecessary", "Confusing"], answer: 1 },
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
          {
            title: "Environmental Volunteering",
            titleVi: "Tình nguyện Môi trường",
            description: "Joining a beach cleanup or tree planting event",
            descriptionVi: "Tham gia dọn bãi biển hoặc trồng cây",
            sampleDialogue: [
              { speaker: "Organizer", line: "Welcome to our beach cleanup! Please grab gloves and a bag." },
              { speaker: "You", line: "How long does the cleanup usually take?" },
              { speaker: "Organizer", line: "About 3 hours. We've collected 500 kg of trash in past events." },
              { speaker: "You", line: "That's impressive! It's shocking how much plastic ends up on beaches." },
            ],
          },
        ],
        vocabulary: [
          { term: "carbon footprint", meaning: "dấu chân carbon", meaningEn: "total CO2 emissions caused by a person", type: "expression", example: "How can we reduce our carbon footprint?", exampleVi: "Làm sao giảm dấu chân carbon?" },
          { term: "go green", meaning: "sống xanh, thân thiện môi trường", meaningEn: "become environmentally friendly", type: "expression", example: "Our company decided to go green this year.", exampleVi: "Công ty chúng tôi quyết định sống xanh năm nay." },
          { term: "single-use", meaning: "dùng một lần", meaningEn: "designed to be used only once", type: "expression", example: "We should ban single-use plastic bags.", exampleVi: "Chúng ta nên cấm túi nhựa dùng một lần." },
          { term: "sustainable", meaning: "bền vững", meaningEn: "able to be maintained long-term without depleting resources", type: "expression", example: "We need more sustainable farming practices.", exampleVi: "Chúng ta cần thêm các phương pháp canh tác bền vững." },
          { term: "greenwashing", meaning: "tẩy xanh (quảng cáo sai về thân thiện môi trường)", meaningEn: "misleading claims about being eco-friendly", type: "expression", example: "Many companies are guilty of greenwashing.", exampleVi: "Nhiều công ty bị cáo buộc tẩy xanh." },
        ],
        listeningChallenge: {
          title: "Environmental News Report",
          titleVi: "Bản tin Môi trường",
          transcript: "Reporter: A new study shows that plastic waste in the ocean has increased by 30% since 2020. Scientists urge governments to ban single-use plastics and invest in biodegradable alternatives. Meanwhile, renewable energy now accounts for 40% of global electricity production, up from 28% five years ago.",
          questions: [
            { q: "How much has ocean plastic increased since 2020?", qVi: "Rác nhựa đại dương tăng bao nhiêu từ 2020?", options: ["10%", "20%", "30%", "50%"], answer: 2 },
            { q: "What percentage of electricity comes from renewables?", qVi: "Bao nhiêu phần trăm điện từ năng lượng tái tạo?", options: ["28%", "35%", "40%", "50%"], answer: 2 },
          ],
        },
        speakingTopics: ["Discuss environmental problems in your city", "Debate: Should plastic bags be completely banned?", "Describe what you do to help the environment"],
      },
      // NEW Academic lessons
      {
        id: "acad-06-technology",
        title: "Technology & Society",
        titleVi: "Công nghệ & Xã hội",
        icon: "Cpu",
        description: "Discuss AI, automation, digital ethics, and the future of work",
        descriptionVi: "Thảo luận về AI, tự động hóa, đạo đức số và tương lai công việc",
        badge: "Tech Thinker",
        badgeVi: "Nhà Tư duy Công nghệ",
        keySituations: [
          {
            title: "AI Ethics Discussion",
            titleVi: "Thảo luận Đạo đức AI",
            description: "Debating the ethical implications of AI",
            descriptionVi: "Tranh luận về tác động đạo đức của AI",
            sampleDialogue: [
              { speaker: "Professor", line: "Should AI be allowed to make hiring decisions?" },
              { speaker: "Student A", line: "AI can reduce human bias, but it can also amplify existing biases in data." },
              { speaker: "You", line: "I think AI should assist, not replace, human judgment. The final decision should always be human." },
              { speaker: "Student B", line: "But what about consistency? Humans are inconsistent. AI is the same every time." },
              { speaker: "You", line: "Consistency isn't always fairness. Context matters, and AI often misses context." },
            ],
          },
          {
            title: "Future of Work Panel",
            titleVi: "Hội thảo Tương lai Công việc",
            description: "Discussing how automation will change careers",
            descriptionVi: "Thảo luận cách tự động hóa thay đổi nghề nghiệp",
            sampleDialogue: [
              { speaker: "Panelist", line: "Automation will eliminate jobs, but it will also create new ones." },
              { speaker: "You", line: "The key question is: will the new jobs be accessible to everyone, or only to the tech-savvy?" },
              { speaker: "Panelist", line: "That's why we need to invest in reskilling programs now." },
              { speaker: "You", line: "Agreed. Lifelong learning needs to become the norm, not the exception." },
            ],
          },
        ],
        vocabulary: [
          { term: "disruptive technology", meaning: "công nghệ đột phá", meaningEn: "innovation that significantly changes industries", type: "expression", example: "Electric vehicles are a disruptive technology.", exampleVi: "Xe điện là công nghệ đột phá." },
          { term: "digital divide", meaning: "khoảng cách số", meaningEn: "gap between those with and without technology access", type: "expression", example: "The digital divide affects rural communities.", exampleVi: "Khoảng cách số ảnh hưởng đến cộng đồng nông thôn." },
          { term: "cutting-edge", meaning: "tiên tiến nhất", meaningEn: "at the forefront of innovation", type: "expression", example: "They're using cutting-edge AI technology.", exampleVi: "Họ đang dùng công nghệ AI tiên tiến nhất." },
          { term: "early adopter", meaning: "người sử dụng sớm", meaningEn: "person who uses new technology first", type: "expression", example: "I'm an early adopter — I always buy the latest gadgets.", exampleVi: "Tôi là người sử dụng sớm — luôn mua đồ công nghệ mới nhất." },
        ],
        listeningChallenge: {
          title: "Tech Conference Keynote",
          titleVi: "Bài phát biểu Hội nghị Công nghệ",
          transcript: "Speaker: By 2030, we estimate that 85 million jobs will be displaced by automation. But 97 million new roles will emerge — in AI training, data analysis, digital marketing, and green energy. The net gain is positive, but only if we prepare through education and policy. Governments and businesses must collaborate on reskilling initiatives. The future belongs to the adaptable.",
          questions: [
            { q: "How many jobs will be displaced by 2030?", qVi: "Bao nhiêu việc làm sẽ bị thay thế đến 2030?", options: ["50 million", "65 million", "85 million", "97 million"], answer: 2 },
            { q: "How many new roles will emerge?", qVi: "Bao nhiêu vị trí mới sẽ xuất hiện?", options: ["50 million", "75 million", "85 million", "97 million"], answer: 3 },
          ],
        },
        speakingTopics: ["Discuss whether AI will replace teachers", "Debate: Is social media more harmful or helpful?", "Describe a technology that changed your life", "Discuss the ethics of facial recognition"],
      },
      {
        id: "acad-07-academic-writing",
        title: "Academic Writing & Presentations",
        titleVi: "Viết & Thuyết trình Học thuật",
        icon: "FileText",
        description: "Write essays, give academic presentations, cite sources",
        descriptionVi: "Viết bài luận, thuyết trình học thuật, trích dẫn nguồn",
        badge: "Scholar Writer",
        badgeVi: "Nhà Viết Học thuật",
        keySituations: [
          {
            title: "Discussing Your Research",
            titleVi: "Thảo luận về Nghiên cứu",
            description: "Presenting your thesis to a professor",
            descriptionVi: "Trình bày luận văn với giáo sư",
            sampleDialogue: [
              { speaker: "Professor", line: "What's your thesis statement?" },
              { speaker: "You", line: "I argue that bilingual education improves cognitive flexibility in children aged 5-10." },
              { speaker: "Professor", line: "Interesting. What methodology are you using?" },
              { speaker: "You", line: "A mixed-methods approach — quantitative test scores plus qualitative interviews with teachers." },
              { speaker: "Professor", line: "Strong approach. Make sure your sample size is large enough for statistical significance." },
            ],
          },
          {
            title: "Peer Review Session",
            titleVi: "Buổi Đánh giá Đồng nghiệp",
            description: "Giving and receiving academic feedback",
            descriptionVi: "Đưa và nhận phản hồi học thuật",
            sampleDialogue: [
              { speaker: "Peer", line: "Your introduction is strong, but the transition to your second argument feels abrupt." },
              { speaker: "You", line: "I see what you mean. I'll add a linking paragraph." },
              { speaker: "Peer", line: "Also, the data in Table 2 doesn't match your conclusion on page 8." },
              { speaker: "You", line: "Good catch! I must have used the older dataset. I'll update it." },
            ],
          },
        ],
        vocabulary: [
          { term: "thesis statement", meaning: "luận điểm chính", meaningEn: "main argument of an essay or paper", type: "expression", example: "Your thesis statement should be clear and specific.", exampleVi: "Luận điểm chính cần rõ ràng và cụ thể." },
          { term: "peer review", meaning: "đánh giá đồng nghiệp", meaningEn: "evaluation by people of similar standing", type: "expression", example: "This paper went through rigorous peer review.", exampleVi: "Bài báo này đã qua đánh giá đồng nghiệp nghiêm ngặt." },
          { term: "cite a source", meaning: "trích dẫn nguồn", meaningEn: "reference where information came from", type: "expression", example: "Always cite your sources to avoid plagiarism.", exampleVi: "Luôn trích dẫn nguồn để tránh đạo văn." },
          { term: "plagiarism", meaning: "đạo văn", meaningEn: "using someone's work without credit", type: "expression", example: "Plagiarism is taken very seriously in universities.", exampleVi: "Đạo văn bị xử lý rất nghiêm ở đại học." },
        ],
        listeningChallenge: {
          title: "Academic Conference Presentation",
          titleVi: "Bài thuyết trình Hội nghị Học thuật",
          transcript: "Presenter: Our study surveyed 500 university students across 5 countries. Key findings: 72% of students prefer blended learning over fully online or fully in-person classes. Students who used AI study tools scored 15% higher on average. However, 60% expressed concerns about data privacy. We recommend universities adopt a balanced approach.",
          questions: [
            { q: "How many students were surveyed?", qVi: "Bao nhiêu sinh viên được khảo sát?", options: ["200", "300", "500", "1000"], answer: 2 },
            { q: "What percentage prefer blended learning?", qVi: "Bao nhiêu phần trăm thích học kết hợp?", options: ["52%", "62%", "72%", "82%"], answer: 2 },
          ],
        },
        speakingTopics: ["Practice presenting research findings", "Role-play: Defend your thesis to a panel", "Discuss the importance of academic integrity"],
      },
      {
        id: "acad-08-global-issues",
        title: "Global Issues & Current Affairs",
        titleVi: "Vấn đề Toàn cầu & Thời sự",
        icon: "Newspaper",
        description: "Discuss world events, politics, economics, and social issues",
        descriptionVi: "Thảo luận sự kiện thế giới, chính trị, kinh tế và xã hội",
        badge: "Global Citizen",
        badgeVi: "Công dân Toàn cầu",
        keySituations: [
          {
            title: "Discussing World News",
            titleVi: "Thảo luận Tin tức Thế giới",
            description: "Sharing and analyzing global events",
            descriptionVi: "Chia sẻ và phân tích sự kiện toàn cầu",
            sampleDialogue: [
              { speaker: "Friend", line: "Did you see the news about the global food shortage?" },
              { speaker: "You", line: "Yes, it's alarming. Climate change is severely affecting crop yields in many regions." },
              { speaker: "Friend", line: "What can be done about it?" },
              { speaker: "You", line: "I think we need a combination of sustainable agriculture, reduced food waste, and international cooperation." },
              { speaker: "Friend", line: "It's such a complex issue. Every solution creates new challenges." },
            ],
          },
          {
            title: "Model United Nations",
            titleVi: "Mô phỏng Liên Hợp Quốc",
            description: "Representing a country's position on a global issue",
            descriptionVi: "Đại diện lập trường của một quốc gia về vấn đề toàn cầu",
            sampleDialogue: [
              { speaker: "You (as Vietnam)", line: "Vietnam strongly supports the resolution on ocean conservation. As a coastal nation, we've seen firsthand the impact of marine pollution." },
              { speaker: "Delegate", line: "What specific measures is Vietnam taking?" },
              { speaker: "You", line: "We've implemented a ban on single-use plastics in major cities and invested in mangrove restoration along our coastline." },
            ],
          },
        ],
        vocabulary: [
          { term: "humanitarian crisis", meaning: "khủng hoảng nhân đạo", meaningEn: "emergency threatening lives and well-being", type: "expression", example: "The earthquake triggered a humanitarian crisis.", exampleVi: "Trận động đất gây ra khủng hoảng nhân đạo." },
          { term: "geopolitics", meaning: "địa chính trị", meaningEn: "politics influenced by geography", type: "expression", example: "Geopolitics is shaping trade relationships.", exampleVi: "Địa chính trị đang định hình quan hệ thương mại." },
          { term: "grassroots movement", meaning: "phong trào từ cơ sở", meaningEn: "movement driven by ordinary people", type: "expression", example: "The environmental campaign started as a grassroots movement.", exampleVi: "Chiến dịch môi trường bắt đầu từ phong trào cơ sở." },
          { term: "the elephant in the room", meaning: "vấn đề rõ ràng nhưng không ai muốn nói", meaningEn: "obvious problem no one wants to discuss", type: "idiom", example: "Climate change is the elephant in the room at every economic summit.", exampleVi: "Biến đổi khí hậu là vấn đề rõ ràng nhưng không ai muốn nói ở mọi hội nghị kinh tế." },
        ],
        listeningChallenge: {
          title: "News Podcast Excerpt",
          titleVi: "Trích đoạn Podcast Tin tức",
          transcript: "Host: Today we're discussing the global refugee crisis. According to the UN, there are now over 110 million forcibly displaced people worldwide — the highest number on record. The main drivers are conflict, violence, and climate change. Guest: What's often overlooked is that 76% of refugees are hosted by developing countries, not wealthy nations.",
          questions: [
            { q: "How many displaced people are there worldwide?", qVi: "Có bao nhiêu người bị buộc phải di dời trên thế giới?", options: ["50 million", "80 million", "110 million", "150 million"], answer: 2 },
            { q: "What percentage of refugees are hosted by developing countries?", qVi: "Bao nhiêu phần trăm người tị nạn được các nước đang phát triển tiếp nhận?", options: ["50%", "62%", "76%", "85%"], answer: 2 },
          ],
        },
        speakingTopics: ["Discuss a global issue you care about", "Role-play: Represent your country at a UN meeting", "Debate: Is globalization more helpful or harmful?", "Discuss the impact of climate change on Southeast Asia"],
      },
      {
        id: "acad-09-media-literacy",
        title: "Media Literacy & Fake News",
        titleVi: "Hiểu biết Truyền thông & Tin giả",
        icon: "Shield",
        description: "Identify misinformation, evaluate sources, think critically about media",
        descriptionVi: "Nhận diện tin sai, đánh giá nguồn, tư duy phản biện về truyền thông",
        badge: "Media Savvy",
        badgeVi: "Thông minh Truyền thông",
        keySituations: [
          {
            title: "Fact-Checking a News Article",
            titleVi: "Kiểm tra Sự thật Bài báo",
            description: "Analyzing whether a news story is reliable",
            descriptionVi: "Phân tích liệu bài báo có đáng tin cậy",
            sampleDialogue: [
              { speaker: "Friend", line: "Look at this article — it says coffee cures cancer!" },
              { speaker: "You", line: "Let me check the source. It's from a blog, not a medical journal." },
              { speaker: "Friend", line: "But it says 'scientists found'..." },
              { speaker: "You", line: "The phrase 'scientists found' is vague. Reliable articles cite specific studies and researchers." },
              { speaker: "You", line: "Always check: Who wrote it? Where was it published? Is there a peer-reviewed study?" },
            ],
          },
          {
            title: "Discussing Media Bias",
            titleVi: "Thảo luận Thiên kiến Truyền thông",
            description: "Understanding how media outlets frame stories differently",
            descriptionVi: "Hiểu cách các hãng truyền thông đưa tin khác nhau",
            sampleDialogue: [
              { speaker: "Classmate", line: "Why do different news channels report the same event so differently?" },
              { speaker: "You", line: "It's called media bias. Each outlet has its perspective and target audience." },
              { speaker: "Classmate", line: "So how do we get the truth?" },
              { speaker: "You", line: "Read multiple sources, check facts, and focus on what's backed by evidence." },
            ],
          },
        ],
        vocabulary: [
          { term: "fake news", meaning: "tin giả", meaningEn: "deliberately false information", type: "expression", example: "We need to learn how to spot fake news.", exampleVi: "Chúng ta cần học cách nhận ra tin giả." },
          { term: "confirmation bias", meaning: "thiên kiến xác nhận", meaningEn: "tendency to believe what confirms existing beliefs", type: "expression", example: "Confirmation bias makes us share articles without reading them.", exampleVi: "Thiên kiến xác nhận khiến chúng ta chia sẻ bài viết mà không đọc." },
          { term: "clickbait", meaning: "tiêu đề câu view", meaningEn: "sensational headline designed to get clicks", type: "slang", example: "That headline is pure clickbait.", exampleVi: "Tiêu đề đó hoàn toàn là câu view." },
          { term: "echo chamber", meaning: "buồng vọng (chỉ nghe ý kiến giống mình)", meaningEn: "environment where only similar views are shared", type: "expression", example: "Social media creates echo chambers.", exampleVi: "Mạng xã hội tạo ra buồng vọng." },
        ],
        listeningChallenge: {
          title: "Media Literacy Workshop",
          titleVi: "Hội thảo Hiểu biết Truyền thông",
          transcript: "Instructor: Here are 5 red flags for fake news. First, check the URL — fake sites often mimic real ones with slight changes. Second, look for an author and publication date. Third, verify with other sources. Fourth, watch for emotional language designed to trigger reactions. Fifth, check if the image is actually from the story — reverse image search is your friend.",
          questions: [
            { q: "How many red flags are mentioned?", qVi: "Có bao nhiêu dấu hiệu cảnh báo?", options: ["3", "4", "5", "6"], answer: 2 },
            { q: "What tool is recommended for checking images?", qVi: "Công cụ nào được gợi ý để kiểm tra hình ảnh?", options: ["Photo editor", "Reverse image search", "AI detector", "Screenshot tool"], answer: 1 },
          ],
        },
        speakingTopics: ["Discuss how to identify fake news", "Debate: Should social media platforms be responsible for misinformation?", "Describe a time you encountered fake news", "Role-play: Teach a friend how to fact-check"],
      },
      {
        id: "acad-10-personal-development",
        title: "Personal Development & Goals",
        titleVi: "Phát triển Bản thân & Mục tiêu",
        icon: "Target",
        description: "Set goals, build habits, discuss self-improvement strategies",
        descriptionVi: "Đặt mục tiêu, xây dựng thói quen, thảo luận chiến lược tự hoàn thiện",
        badge: "Growth Mindset",
        badgeVi: "Tư duy Phát triển",
        keySituations: [
          {
            title: "Setting New Year Goals",
            titleVi: "Đặt Mục tiêu Năm mới",
            description: "Discussing and planning personal goals",
            descriptionVi: "Thảo luận và lên kế hoạch mục tiêu cá nhân",
            sampleDialogue: [
              { speaker: "Friend", line: "Have you set your goals for this year?" },
              { speaker: "You", line: "Yes! I want to improve my English to C1 level and read 24 books." },
              { speaker: "Friend", line: "That's ambitious! How will you track progress?" },
              { speaker: "You", line: "I'm using the SMART goal framework — each goal is specific, measurable, and has a deadline." },
              { speaker: "Friend", line: "Smart approach! I should do the same." },
            ],
          },
          {
            title: "Discussing Failure & Resilience",
            titleVi: "Thảo luận Thất bại & Sức bền",
            description: "Talking about setbacks and bouncing back",
            descriptionVi: "Nói về khó khăn và cách vượt qua",
            sampleDialogue: [
              { speaker: "Mentor", line: "What did you learn from that failed project?" },
              { speaker: "You", line: "I learned that I was trying to do everything myself instead of delegating." },
              { speaker: "Mentor", line: "That's a valuable lesson. Failure is just data for improvement." },
              { speaker: "You", line: "Exactly. Now I prioritize teamwork and communication from the start." },
            ],
          },
        ],
        vocabulary: [
          { term: "growth mindset", meaning: "tư duy phát triển", meaningEn: "belief that abilities can be developed", type: "expression", example: "A growth mindset helps you embrace challenges.", exampleVi: "Tư duy phát triển giúp bạn đón nhận thử thách." },
          { term: "bounce back", meaning: "phục hồi, vượt qua", meaningEn: "recover from a setback", type: "phrasal-verb", example: "She bounced back after losing her job.", exampleVi: "Cô ấy phục hồi sau khi mất việc." },
          { term: "comfort zone", meaning: "vùng an toàn", meaningEn: "situation where you feel comfortable but don't grow", type: "expression", example: "Growth happens outside your comfort zone.", exampleVi: "Sự phát triển xảy ra ngoài vùng an toàn." },
          { term: "level up", meaning: "nâng cấp bản thân", meaningEn: "improve to the next level", type: "slang", example: "It's time to level up my skills.", exampleVi: "Đã đến lúc nâng cấp kỹ năng." },
          { term: "game changer", meaning: "thay đổi cuộc chơi", meaningEn: "something that completely changes the situation", type: "expression", example: "Learning English was a game changer for my career.", exampleVi: "Học tiếng Anh là yếu tố thay đổi cuộc chơi cho sự nghiệp tôi." },
        ],
        listeningChallenge: {
          title: "Motivational Podcast",
          titleVi: "Podcast Tạo động lực",
          transcript: "Host: Today's guest went from a $0 bank account to building a $2 million business in 5 years. Guest: The secret isn't talent — it's consistency. I committed to working on my business for just 2 hours every day before my regular job. After 6 months, I had my first paying customer. After 2 years, I quit my day job. The key was showing up every single day, even when I didn't feel like it.",
          questions: [
            { q: "How long did it take to build the business?", qVi: "Mất bao lâu để xây dựng doanh nghiệp?", options: ["2 years", "3 years", "5 years", "10 years"], answer: 2 },
            { q: "How many hours a day did the guest commit initially?", qVi: "Khách mời dành bao nhiêu giờ mỗi ngày ban đầu?", options: ["1 hour", "2 hours", "3 hours", "4 hours"], answer: 1 },
          ],
        },
        speakingTopics: ["Describe your biggest personal goal", "Discuss a failure that taught you something valuable", "Role-play: Coach a friend through a difficult time", "Talk about a book or podcast that changed your perspective"],
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
