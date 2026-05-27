/**
 * @file cambridgeKidsVocabExpansion16.ts
 * @description Expansion 16 — fills thin thematic categories per level so
 * Vocabulary Practice has enough variety. All entries audited unique vs the
 * existing deduped master set.
 */
import type { CambridgeKidsLevel, CambridgeKidsWord } from "./cambridgeKidsVocab";

type W = Required<Pick<CambridgeKidsWord, "word" | "vi" | "emoji" | "level" | "example" | "exampleVi">>;
const mk = (
  word: string, vi: string, emoji: string, level: CambridgeKidsLevel,
  example: string, exampleVi: string
): W => ({ word, vi, emoji, level, example, exampleVi });

export const CAMBRIDGE_KIDS_WORDS_EXPANSION_16: W[] = [
  // ===== STARTERS — Technology =====
  mk("laptop", "máy tính xách tay", "💻", "Starters", "My dad works on a laptop.", "Bố em làm việc trên máy tính xách tay."),
  mk("desktop", "máy tính để bàn", "🖥️", "Starters", "The desktop is on the table.", "Máy tính để bàn ở trên bàn."),
  mk("charger", "cục sạc", "🔌", "Starters", "I need a charger for my phone.", "Em cần cục sạc cho điện thoại."),
  mk("headset", "tai nghe", "🎧", "Starters", "I wear a headset to play games.", "Em đeo tai nghe để chơi game."),
  mk("usb", "USB", "🔌", "Starters", "Plug the USB into the laptop.", "Cắm USB vào máy tính."),
  mk("app", "ứng dụng", "📱", "Starters", "I like this game app.", "Em thích ứng dụng trò chơi này."),
  mk("remote", "điều khiển từ xa", "📺", "Starters", "Pass me the remote, please.", "Đưa em cái điều khiển nhé."),

  // ===== MOVERS — Time, Numbers, Colors & Shapes =====
  mk("minute", "phút", "⏱️", "Movers", "Wait one minute, please.", "Đợi một phút nhé."),
  mk("hour", "giờ", "⏰", "Movers", "We study for one hour.", "Chúng em học một tiếng."),
  mk("second", "giây", "⏳", "Movers", "I can run fast for ten seconds.", "Em có thể chạy nhanh trong mười giây."),
  mk("week", "tuần", "📅", "Movers", "There are seven days in a week.", "Một tuần có bảy ngày."),
  mk("month", "tháng", "🗓️", "Movers", "My birthday is next month.", "Sinh nhật em vào tháng sau."),
  mk("weekend", "cuối tuần", "🎉", "Movers", "I play with friends on the weekend.", "Cuối tuần em chơi với bạn."),
  mk("weekday", "ngày trong tuần", "📆", "Movers", "I go to school on weekdays.", "Em đi học vào các ngày trong tuần."),
  mk("rectangle", "hình chữ nhật", "▭", "Movers", "A door is a rectangle.", "Cánh cửa là hình chữ nhật."),
  mk("oval", "hình bầu dục", "🥚", "Movers", "An egg is oval.", "Quả trứng có hình bầu dục."),
  mk("purple", "màu tím", "🟣", "Movers", "Grapes can be purple.", "Nho có thể có màu tím."),
  mk("grey", "màu xám", "🌫️", "Movers", "Elephants are grey.", "Voi có màu xám."),
  mk("gold", "màu vàng kim", "🥇", "Movers", "The trophy is gold.", "Cái cúp màu vàng kim."),
  mk("silver", "màu bạc", "🥈", "Movers", "My ring is silver.", "Nhẫn của em màu bạc."),
  mk("dozen", "tá (12 cái)", "🥚", "Movers", "Mum buys a dozen eggs.", "Mẹ mua một tá trứng."),

  // ===== MOVERS — Technology =====
  mk("selfie", "ảnh tự chụp", "🤳", "Movers", "Let's take a selfie together.", "Cùng chụp một tấm selfie nào."),
  mk("podcast", "podcast", "🎙️", "Movers", "I listen to a kids podcast.", "Em nghe podcast cho thiếu nhi."),
  mk("download", "tải xuống", "⬇️", "Movers", "I download a new song.", "Em tải xuống một bài hát mới."),
  mk("upload", "tải lên", "⬆️", "Movers", "She uploads her drawings.", "Cô ấy tải tranh vẽ lên mạng."),
  mk("screenshot", "ảnh chụp màn hình", "🖼️", "Movers", "I take a screenshot of the game.", "Em chụp màn hình trò chơi."),
  mk("wifi", "wifi", "📶", "Movers", "The wifi is fast at home.", "Wifi ở nhà rất nhanh."),
  mk("bluetooth", "bluetooth", "🔵", "Movers", "Connect the speaker by bluetooth.", "Kết nối loa qua bluetooth."),

  // ===== MOVERS — Actions =====
  mk("climb", "leo trèo", "🧗", "Movers", "Monkeys can climb tall trees.", "Khỉ có thể leo cây cao."),
  mk("throw", "ném", "🤾", "Movers", "Throw the ball to me!", "Ném bóng cho mình nào!"),
  mk("catch", "bắt", "🥎", "Movers", "Can you catch this ball?", "Bạn có bắt được quả bóng này không?"),
  mk("push", "đẩy", "🛒", "Movers", "Push the door to open it.", "Đẩy cửa để mở ra."),
  mk("pull", "kéo", "🪢", "Movers", "Pull the rope hard.", "Kéo sợi dây thật mạnh."),
  mk("build", "xây dựng", "🧱", "Movers", "We build a sandcastle.", "Chúng em xây lâu đài cát."),
  mk("break", "làm vỡ", "💔", "Movers", "Don't break the glass!", "Đừng làm vỡ cốc nhé!"),
  mk("carry", "mang vác", "🧳", "Movers", "I carry my bag to school.", "Em mang cặp đến trường."),

  // ===== FLYERS — Home & Clothes =====
  mk("hoodie", "áo hoodie", "🧥", "Flyers", "My hoodie keeps me warm.", "Áo hoodie giữ ấm cho em."),
  mk("slipper", "dép đi trong nhà", "🥿", "Flyers", "I wear slippers at home.", "Em đi dép trong nhà."),
  mk("raincoat", "áo mưa", "🧥", "Flyers", "Wear a raincoat when it rains.", "Mặc áo mưa khi trời mưa."),
  mk("drawer", "ngăn kéo", "🗄️", "Flyers", "My socks are in the drawer.", "Tất của em ở trong ngăn kéo."),
  mk("lampshade", "chao đèn", "💡", "Flyers", "The lampshade is yellow.", "Chao đèn màu vàng."),
  mk("bookshelf", "kệ sách", "📚", "Flyers", "Books fill the bookshelf.", "Kệ sách đầy sách."),
  mk("helmet", "mũ bảo hiểm", "⛑️", "Flyers", "Wear a helmet on your bike.", "Đội mũ bảo hiểm khi đi xe đạp."),
  mk("beanie", "mũ len", "🧢", "Flyers", "My beanie is warm in winter.", "Mũ len ấm vào mùa đông."),

  // ===== FLYERS — School & Stationery =====
  mk("marker", "bút dạ", "🖊️", "Flyers", "Use a marker on the board.", "Dùng bút dạ trên bảng."),
  mk("folder", "bìa hồ sơ", "📁", "Flyers", "Put your papers in the folder.", "Cất giấy vào bìa hồ sơ."),
  mk("textbook", "sách giáo khoa", "📕", "Flyers", "Open your English textbook.", "Mở sách giáo khoa Tiếng Anh."),
  mk("locker", "tủ khoá", "🗄️", "Flyers", "My books are in the locker.", "Sách của em ở trong tủ."),
  mk("stapler", "cái dập ghim", "📎", "Flyers", "Use the stapler on the papers.", "Dùng cái dập ghim cho giấy."),
  mk("highlighter", "bút dạ quang", "🖍️", "Flyers", "I use a yellow highlighter.", "Em dùng bút dạ quang vàng."),

  // ===== FLYERS — Animals =====
  mk("hippopotamus", "hà mã", "🦛", "Flyers", "A hippopotamus loves water.", "Hà mã rất thích nước."),
  mk("platypus", "thú mỏ vịt", "🦦", "Flyers", "The platypus has a duck bill.", "Thú mỏ vịt có cái mỏ giống vịt."),
  mk("peacock", "công", "🦚", "Flyers", "The peacock has beautiful feathers.", "Công có bộ lông tuyệt đẹp."),
  mk("antelope", "linh dương", "🦌", "Flyers", "An antelope runs very fast.", "Linh dương chạy rất nhanh."),
  mk("otter", "rái cá", "🦦", "Flyers", "The otter plays in the river.", "Rái cá chơi dưới sông."),
  mk("walrus", "hải mã", "🦭", "Flyers", "A walrus has two big tusks.", "Hải mã có hai chiếc ngà to."),
  mk("raven", "quạ đen", "🐦‍⬛", "Flyers", "The raven is a clever bird.", "Quạ đen là loài chim thông minh."),
  mk("pelican", "bồ nông", "🪶", "Flyers", "The pelican catches fish in its beak.", "Bồ nông bắt cá bằng mỏ."),
  mk("sloth", "con lười", "🦥", "Flyers", "The sloth moves very slowly.", "Con lười di chuyển rất chậm."),

  // ===== FLYERS — Time, Numbers, Colors & Shapes =====
  mk("hexagon", "hình lục giác", "⬡", "Flyers", "A honeycomb has hexagons.", "Tổ ong có hình lục giác."),
  mk("pentagon", "hình ngũ giác", "⬠", "Flyers", "A pentagon has five sides.", "Hình ngũ giác có năm cạnh."),
  mk("twilight", "hoàng hôn", "🌆", "Flyers", "The sky is pink at twilight.", "Bầu trời màu hồng lúc hoàng hôn."),
  mk("crimson", "màu đỏ thẫm", "🩸", "Flyers", "The rose is crimson.", "Bông hồng có màu đỏ thẫm."),
  mk("turquoise", "màu xanh ngọc", "🟦", "Flyers", "The sea looks turquoise today.", "Hôm nay biển có màu xanh ngọc."),
  mk("magenta", "màu hồng cánh sen", "🟪", "Flyers", "Her dress is magenta.", "Váy cô ấy màu hồng cánh sen."),

  // ===== FLYERS — Food & Drink =====
  mk("croissant", "bánh sừng bò", "🥐", "Flyers", "I eat a croissant for breakfast.", "Em ăn bánh sừng bò vào bữa sáng."),
  mk("syrup", "siro", "🍯", "Flyers", "Pancakes taste great with syrup.", "Bánh pancake ngon với siro."),
  mk("smoothie", "sinh tố", "🥤", "Flyers", "I love a strawberry smoothie.", "Em thích sinh tố dâu."),
  mk("brownie", "bánh brownie", "🍫", "Flyers", "The brownie is warm and sweet.", "Bánh brownie ấm và ngọt."),
  mk("donut", "bánh donut", "🍩", "Flyers", "A pink donut for me, please!", "Cho em một cái donut hồng nhé!"),
  mk("cupcake", "bánh cupcake", "🧁", "Flyers", "We bake cupcakes for the party.", "Chúng em làm cupcake cho tiệc."),
  mk("oatmeal", "yến mạch", "🥣", "Flyers", "I have oatmeal in the morning.", "Em ăn yến mạch vào buổi sáng."),
  mk("marshmallow", "kẹo dẻo", "🍡", "Flyers", "We roast marshmallows by the fire.", "Chúng em nướng kẹo dẻo bên lửa."),

  // ===== FLYERS — Sports, Hobbies & Music =====
  mk("drums", "trống", "🥁", "Flyers", "He plays the drums in the band.", "Anh ấy chơi trống trong ban nhạc."),
  mk("trumpet", "kèn trumpet", "🎺", "Flyers", "The trumpet sounds loud and bright.", "Tiếng kèn trumpet to và sáng."),
  mk("surfing", "lướt sóng", "🏄", "Flyers", "Surfing is fun in summer.", "Lướt sóng vui vào mùa hè."),
  mk("photography", "nhiếp ảnh", "📸", "Flyers", "Photography is my hobby.", "Nhiếp ảnh là sở thích của em."),
  mk("knitting", "đan len", "🧶", "Flyers", "Grandma is knitting a scarf.", "Bà đang đan một chiếc khăn."),
  mk("karate", "karate", "🥋", "Flyers", "I learn karate on Saturdays.", "Em học karate vào thứ Bảy."),
  mk("judo", "judo", "🥋", "Flyers", "Judo teaches me to be calm.", "Judo dạy em sự bình tĩnh."),
  mk("badminton", "cầu lông", "🏸", "Flyers", "We play badminton in the park.", "Chúng em chơi cầu lông trong công viên."),
  mk("rugby", "bóng bầu dục", "🏉", "Flyers", "Rugby is a tough sport.", "Bóng bầu dục là môn thể thao mạnh."),

  // ===== KET — Food & Drink =====
  mk("appetizer", "món khai vị", "🥗", "KET", "We share an appetizer before dinner.", "Chúng tôi chia sẻ món khai vị trước bữa tối."),
  mk("beverage", "đồ uống", "🥤", "KET", "Choose a hot beverage on the menu.", "Chọn một đồ uống nóng trên thực đơn."),
  mk("seasoning", "gia vị", "🧂", "KET", "Add a little seasoning to the soup.", "Thêm một chút gia vị vào canh."),
  mk("cuisine", "ẩm thực", "🍜", "KET", "I love Vietnamese cuisine.", "Tôi yêu ẩm thực Việt Nam."),
  mk("vegetarian", "người ăn chay", "🥦", "KET", "My sister is a vegetarian.", "Chị tôi ăn chay."),
  mk("organic", "hữu cơ", "🌱", "KET", "Organic vegetables are healthier.", "Rau hữu cơ tốt cho sức khỏe hơn."),
  mk("leftovers", "thức ăn thừa", "🍱", "KET", "We save the leftovers for lunch.", "Chúng tôi giữ thức ăn thừa cho bữa trưa."),
  mk("takeaway", "đồ ăn mang đi", "🥡", "KET", "Let's order takeaway tonight.", "Tối nay gọi đồ ăn mang đi nhé."),

  // ===== KET — Sports, Hobbies & Music =====
  mk("championship", "giải vô địch", "🏆", "KET", "She won the swimming championship.", "Cô ấy thắng giải vô địch bơi."),
  mk("opponent", "đối thủ", "🤺", "KET", "He shook hands with his opponent.", "Anh ấy bắt tay với đối thủ."),
  mk("marathon", "marathon", "🏃", "KET", "He runs a marathon every year.", "Anh ấy chạy marathon mỗi năm."),
  mk("tactic", "chiến thuật", "♟️", "KET", "The coach explained a new tactic.", "Huấn luyện viên giải thích chiến thuật mới."),
  mk("victory", "chiến thắng", "🥇", "KET", "We celebrated the team's victory.", "Chúng tôi ăn mừng chiến thắng của đội."),
  mk("rivalry", "sự đối đầu", "⚔️", "KET", "There is a friendly rivalry between the teams.", "Có sự đối đầu thân thiện giữa hai đội."),
  mk("spectator", "khán giả", "👀", "KET", "Spectators cheer for their team.", "Khán giả cổ vũ cho đội nhà."),

  // ===== KET — Nature & Weather =====
  mk("humidity", "độ ẩm", "💦", "KET", "The humidity is high in summer.", "Độ ẩm cao vào mùa hè."),
  mk("hailstorm", "bão mưa đá", "🌨️", "KET", "A hailstorm broke many windows.", "Một trận bão mưa đá làm vỡ nhiều cửa sổ."),
  mk("dew", "sương", "💧", "KET", "Dew sparkles on the grass.", "Sương lấp lánh trên cỏ."),
  mk("mist", "sương mù mỏng", "🌫️", "KET", "The valley is full of mist.", "Thung lũng phủ đầy sương mù."),
  mk("drizzle", "mưa phùn", "🌦️", "KET", "It is just a light drizzle.", "Chỉ là một cơn mưa phùn nhẹ."),

  // ===== KET — School & Stationery =====
  mk("semester", "học kỳ", "🎓", "KET", "Final exams are at the end of the semester.", "Thi cuối kỳ là vào cuối học kỳ."),
  mk("syllabus", "đề cương", "📋", "KET", "The teacher gave us the syllabus.", "Giáo viên đưa cho chúng tôi đề cương."),
  mk("faculty", "khoa", "🏫", "KET", "She joined the science faculty.", "Cô ấy vào khoa khoa học."),
  mk("scholarship", "học bổng", "🎖️", "KET", "He won a scholarship to study abroad.", "Anh ấy giành học bổng du học."),
  mk("tuition", "học phí", "💵", "KET", "Tuition fees are due next month.", "Học phí phải nộp vào tháng sau."),
  mk("lecture", "bài giảng", "🎤", "KET", "The lecture lasts one hour.", "Bài giảng kéo dài một giờ."),

  // ===== KET — Home & Clothes =====
  mk("attic", "gác mái", "🏠", "KET", "Old toys are kept in the attic.", "Đồ chơi cũ được cất trên gác mái."),
  mk("hallway", "hành lang", "🚪", "KET", "Hang your coat in the hallway.", "Treo áo khoác ở hành lang."),
  mk("fireplace", "lò sưởi", "🔥", "KET", "We sit by the fireplace in winter.", "Chúng tôi ngồi bên lò sưởi vào mùa đông."),
  mk("sleeve", "tay áo", "👕", "KET", "Roll up your sleeves to wash dishes.", "Xắn tay áo lên để rửa bát."),
  mk("gown", "áo choàng dài", "👗", "KET", "She wore a beautiful gown.", "Cô ấy mặc áo choàng dài đẹp."),
  mk("tuxedo", "áo tuxedo", "🤵", "KET", "He looked smart in his tuxedo.", "Anh ấy lịch lãm trong bộ tuxedo."),
  mk("doormat", "tấm thảm chùi chân", "🚪", "KET", "Wipe your shoes on the doormat.", "Lau giày trên thảm chùi chân."),

  // ===== KET — Places, Transport & Travel =====
  mk("terminal", "nhà ga (sân bay)", "🛫", "KET", "Our flight leaves from terminal 2.", "Chuyến bay của chúng tôi rời nhà ga 2."),
  mk("runway", "đường băng", "🛬", "KET", "The plane lands on the runway.", "Máy bay hạ cánh trên đường băng."),
  mk("lodge", "nhà nghỉ", "🏕️", "KET", "We stayed in a mountain lodge.", "Chúng tôi ở trong nhà nghỉ trên núi."),
  mk("expedition", "cuộc thám hiểm", "🧭", "KET", "They planned an expedition to the jungle.", "Họ lên kế hoạch thám hiểm vào rừng."),
  mk("itinerary", "lịch trình", "🗺️", "KET", "Check the trip itinerary again.", "Kiểm tra lại lịch trình chuyến đi."),
  mk("embassy", "đại sứ quán", "🏛️", "KET", "Apply for a visa at the embassy.", "Xin thị thực tại đại sứ quán."),
  mk("plaza", "quảng trường", "🏙️", "KET", "We met at the central plaza.", "Chúng tôi gặp ở quảng trường trung tâm."),

  // ===== KET — Time, Numbers, Colors & Shapes =====
  mk("era", "kỷ nguyên", "🕰️", "KET", "We live in a digital era.", "Chúng ta sống trong kỷ nguyên số."),
  mk("eternity", "vĩnh hằng", "♾️", "KET", "Waiting felt like an eternity.", "Đợi chờ tưởng chừng như vĩnh hằng."),
  mk("duration", "thời lượng", "⏱️", "KET", "The film duration is two hours.", "Thời lượng phim là hai tiếng."),
  mk("interval", "khoảng nghỉ", "⏸️", "KET", "There is a short interval after Act 1.", "Có khoảng nghỉ ngắn sau hồi 1."),
  mk("fortnight", "hai tuần", "📅", "KET", "I will visit in a fortnight.", "Tôi sẽ đến trong hai tuần nữa."),
  mk("decimal", "số thập phân", "🔢", "KET", "Move the decimal point one place.", "Dời dấu thập phân một chữ số."),
  mk("fraction", "phân số", "½", "KET", "Half is a simple fraction.", "Một nửa là một phân số đơn giản."),
  mk("quarter", "một phần tư", "¼", "KET", "Cut the pizza into quarters.", "Cắt pizza thành bốn phần."),

  // ===== PET — Time, Numbers, Colors & Shapes =====
  mk("milestone", "cột mốc", "🎯", "PET", "Graduation is a major milestone.", "Tốt nghiệp là cột mốc quan trọng."),
  mk("sequence", "chuỗi", "🔢", "PET", "Follow the sequence of steps.", "Làm theo chuỗi các bước."),
  mk("chronological", "theo trình tự thời gian", "📜", "PET", "List the events in chronological order.", "Liệt kê sự kiện theo trình tự thời gian."),
  mk("epoch", "thời đại", "🏺", "PET", "The discovery began a new epoch.", "Phát hiện này mở ra một thời đại mới."),
  mk("span", "khoảng (thời gian)", "📏", "PET", "Over a span of ten years she grew.", "Trong khoảng mười năm, cô ấy đã trưởng thành."),
  mk("simultaneous", "đồng thời", "⚡", "PET", "We had simultaneous meetings online.", "Chúng tôi có nhiều cuộc họp đồng thời trên mạng."),
  mk("periodic", "theo chu kỳ", "🔄", "PET", "She makes periodic visits to her family.", "Cô ấy về thăm gia đình theo chu kỳ."),

  // ===== PET — Body, Health & Feelings =====
  mk("depression", "trầm cảm", "😞", "PET", "He sought help for his depression.", "Anh ấy tìm sự giúp đỡ cho chứng trầm cảm."),
  mk("wellbeing", "sự an lành", "🌿", "PET", "Sleep is vital for wellbeing.", "Giấc ngủ rất quan trọng cho sự an lành."),
  mk("resilience", "sự kiên cường", "💪", "PET", "Resilience helps us face hard times.", "Sự kiên cường giúp ta đối mặt khó khăn."),
  mk("fatigue", "mệt mỏi", "😴", "PET", "Long hours cause fatigue.", "Làm việc lâu gây mệt mỏi."),
  mk("posture", "tư thế", "🧍", "PET", "Good posture protects your back.", "Tư thế tốt bảo vệ lưng của bạn."),
  mk("immunity", "miễn dịch", "🛡️", "PET", "Vaccines build our immunity.", "Vắc-xin xây dựng hệ miễn dịch."),
  mk("recovery", "sự hồi phục", "🩹", "PET", "Recovery from the flu takes time.", "Hồi phục sau cúm cần thời gian."),
  mk("empathy", "sự đồng cảm", "🤗", "PET", "Empathy helps you understand others.", "Đồng cảm giúp bạn hiểu người khác."),
  mk("gratitude", "lòng biết ơn", "🙏", "PET", "Show gratitude to your teachers.", "Hãy biết ơn thầy cô."),
  mk("optimism", "sự lạc quan", "🌞", "PET", "Optimism gives us hope.", "Lạc quan mang lại hy vọng."),
  mk("pessimism", "sự bi quan", "🌧️", "PET", "Try to avoid pessimism.", "Hãy tránh sự bi quan."),
  mk("mindfulness", "chánh niệm", "🧘", "PET", "Mindfulness reduces stress.", "Chánh niệm giúp giảm căng thẳng."),
  mk("compassion", "lòng trắc ẩn", "💗", "PET", "Treat animals with compassion.", "Hãy đối xử với động vật bằng lòng trắc ẩn."),
];
