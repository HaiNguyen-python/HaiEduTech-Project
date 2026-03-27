// Vietnamese vocabulary lessons — 40+ lessons across 4 modules (10+ per module)
import type { VietnameseModule } from "./types";

export const vocabularyModules: VietnameseModule[] = [
  {
    id: "vn-vocabulary",
    title: "Từ vựng cơ bản",
    titleEn: "Basic Vocabulary",
    icon: "📖",
    color: "from-yellow-500 to-red-500",
    description: "Từ vựng hàng ngày: ẩm thực, gia đình, mua sắm",
    descriptionEn: "Daily vocabulary: food, family, shopping",
    category: "vocabulary",
    lessons: [
      {
        id: "vn-vocab-food", title: "Ẩm thực Việt Nam", titleEn: "Vietnamese Cuisine", level: "beginner",
        theory: `## Ẩm thực Việt Nam 🍜\n\n- **Miền Bắc**: Phở, bún chả, chả cá\n- **Miền Trung**: Bún bò Huế, mì Quảng\n- **Miền Nam**: Cơm tấm, hủ tiếu, bánh mì`,
        theoryEn: `## Vietnamese Cuisine 🍜\n\nEach region has signature dishes.`,
        vocabulary: [
          { word: "phở", meaning: "soup bún truyền thống", meaningEn: "noodle soup", ipa: "fəː˧˩˧", example: "Cô ơi, cho con một tô phở bò tái chín, thêm hành nhé!", exampleEn: "Aunty, give me a beef phở with rare & well-done meat, extra onions please!", partOfSpeech: "noun" },
          { word: "bánh mì", meaning: "bánh mì ổ kiểu Việt", meaningEn: "Vietnamese baguette", ipa: "ɓaʲŋ˧˥ mi˧˩", example: "Cô ơi, cho con mua một ổ bánh mì thịt không hành.", exampleEn: "Aunty, let me buy a Banh Mi with meat, no onions.", partOfSpeech: "noun" },
          { word: "ngon", meaning: "có vị tốt", meaningEn: "delicious", ipa: "ŋɔn˧˧", example: "Trời ơi, bún bò Huế ở quán này ngon xuất sắc luôn!", exampleEn: "Oh my, the Hue noodles at this shop are absolutely amazing!", partOfSpeech: "adjective" },
          { word: "cay", meaning: "có vị ớt", meaningEn: "spicy", ipa: "kaj˧˧", example: "Em không ăn được cay, làm ơn bớt ớt giùm em.", exampleEn: "I can't eat spicy food, please reduce the chili for me.", partOfSpeech: "adjective" },
          { word: "ngọt", meaning: "có vị đường", meaningEn: "sweet", ipa: "ŋɔt˧˩˧", example: "Chè ở Huế ngọt vừa phải, không gắt như ở miền Nam.", exampleEn: "Desserts in Hue are moderately sweet, not as intense as in the South.", partOfSpeech: "adjective" },
        ],
        quiz: [
          { question: "'Phở' là món gì?", questionEn: "What is 'phở'?", options: ["Bánh", "Soup bún", "Xôi", "Cơm"], answer: 1, explanation: "Soup bún truyền thống.", explanationEn: "Traditional noodle soup." },
          { question: "'Ngon' nghĩa là?", questionEn: "What does 'ngon' mean?", options: ["Ugly", "Spicy", "Delicious", "Cold"], answer: 2, explanation: "'Ngon' = delicious.", explanationEn: "'Ngon' = delicious." },
        ],
      },
      {
        id: "vn-vocab-family", title: "Gia đình & Quan hệ", titleEn: "Family & Relationships", level: "beginner",
        theory: `## Gia đình Việt Nam 👨‍👩‍👧‍👦\n\nBố/Ba – Father | Mẹ/Má – Mother\nAnh – Older brother | Chị – Older sister | Em – Younger sibling\nÔng – Grandfather | Bà – Grandmother`,
        theoryEn: `## Vietnamese Family\n\nComplex address system based on age and relation.`,
        vocabulary: [
          { word: "bố", meaning: "cha", meaningEn: "father", example: "Bố tôi là bác sĩ.", exampleEn: "My father is a doctor.", partOfSpeech: "noun" },
          { word: "mẹ", meaning: "má", meaningEn: "mother", example: "Mẹ nấu ăn giỏi.", exampleEn: "Mom cooks well.", partOfSpeech: "noun" },
          { word: "gia đình", meaning: "tổ ấm", meaningEn: "family", example: "Gia đình tôi có 4 người.", exampleEn: "My family has 4 people.", partOfSpeech: "noun" },
          { word: "chú", meaning: "em trai của bố", meaningEn: "uncle (father's younger brother)", example: "Chú tôi ở Sài Gòn.", exampleEn: "My uncle lives in Saigon.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "'Ông nội' là ai?", questionEn: "Who is 'ông nội'?", options: ["Bố của mẹ", "Bố của bố", "Anh của bố", "Chú"], answer: 1, explanation: "Ông nội = bố của bố.", explanationEn: "Paternal grandfather." },
          { question: "'Chú' là ai trong gia đình?", questionEn: "Who is 'chú' in the family?", options: ["Anh trai bố", "Em trai bố", "Anh trai mẹ", "Bố"], answer: 1, explanation: "Chú = em trai của bố.", explanationEn: "Father's younger brother." },
        ],
      },
      {
        id: "vn-vocab-colors", title: "Màu sắc & Hình dáng", titleEn: "Colors & Shapes", level: "beginner",
        theory: `## Màu sắc\n\nđỏ (red), xanh lá (green), xanh dương (blue), vàng (yellow), trắng (white), đen (black)\n\n## Hình dáng:\ntròn (round), vuông (square), dài (long), nhỏ (small)`,
        theoryEn: `## Colors & Shapes\n\nBasic colors and shapes in Vietnamese.`,
        vocabulary: [
          { word: "đỏ", meaning: "màu đỏ", meaningEn: "red", example: "Hoa hồng đỏ.", exampleEn: "Red roses.", partOfSpeech: "adjective" },
          { word: "xanh", meaning: "màu xanh", meaningEn: "green / blue", example: "Trời xanh.", exampleEn: "Blue sky.", partOfSpeech: "adjective" },
          { word: "tròn", meaning: "hình tròn", meaningEn: "round", example: "Trái đất hình tròn.", exampleEn: "Earth is round.", partOfSpeech: "adjective" },
          { word: "vàng", meaning: "màu vàng", meaningEn: "yellow / gold", example: "Lá vàng rơi.", exampleEn: "Yellow leaves fall.", partOfSpeech: "adjective" },
        ],
        quiz: [
          { question: "'Xanh lá' là màu gì?", questionEn: "What color?", options: ["Blue", "Green", "Yellow", "Red"], answer: 1, explanation: "'Xanh lá' = green.", explanationEn: "'Xanh lá' = green." },
          { question: "'Vàng' là màu gì?", questionEn: "What color is 'vàng'?", options: ["Red", "Blue", "Yellow", "White"], answer: 2, explanation: "'Vàng' = yellow/gold.", explanationEn: "'Vàng' = yellow/gold." },
        ],
      },
      {
        id: "vn-vocab-body", title: "Cơ thể con người", titleEn: "Human Body", level: "beginner",
        theory: `## Các bộ phận cơ thể\n\nĐầu: đầu, tóc, mắt, mũi, miệng, tai\nThân: vai, ngực, bụng, lưng, tay, chân`,
        theoryEn: `## Body Parts\n\nHead, hair, eyes, nose, mouth, ears, shoulders, arms, legs.`,
        vocabulary: [
          { word: "mắt", meaning: "bộ phận để nhìn", meaningEn: "eyes", example: "Mắt cô ấy đẹp.", exampleEn: "Her eyes are beautiful.", partOfSpeech: "noun" },
          { word: "tay", meaning: "chi trên", meaningEn: "arm / hand", example: "Rửa tay trước khi ăn.", exampleEn: "Wash hands before eating.", partOfSpeech: "noun" },
          { word: "chân", meaning: "chi dưới", meaningEn: "leg / foot", example: "Đau chân quá!", exampleEn: "My feet hurt!", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "'Mũi' là gì?", questionEn: "What is 'mũi'?", options: ["Mouth", "Nose", "Eyes", "Ears"], answer: 1, explanation: "'Mũi' = nose.", explanationEn: "'Mũi' = nose." },
          { question: "'Tay' là bộ phận nào?", questionEn: "What body part is 'tay'?", options: ["Leg", "Head", "Arm/Hand", "Back"], answer: 2, explanation: "'Tay' = arm/hand.", explanationEn: "'Tay' = arm/hand." },
        ],
      },
      {
        id: "vn-vocab-numbers", title: "Số đếm & Thời gian", titleEn: "Numbers & Time", level: "beginner",
        theory: `## Số đếm\n\n1-một, 2-hai, 3-ba, 4-bốn, 5-năm, 6-sáu, 7-bảy, 8-tám, 9-chín, 10-mười\n\n## Thời gian:\ngiờ (hour), phút (minute), ngày (day), tuần (week), tháng (month), năm (year)`,
        theoryEn: `## Numbers & Time\n\nBasic numbers 1-10 and time vocabulary.`,
        vocabulary: [
          { word: "mười", meaning: "số 10", meaningEn: "ten", example: "Mười cái bút.", exampleEn: "Ten pens.", partOfSpeech: "number" },
          { word: "giờ", meaning: "đơn vị thời gian", meaningEn: "hour / o'clock", example: "Bây giờ là 3 giờ.", exampleEn: "It's 3 o'clock.", partOfSpeech: "noun" },
          { word: "ngày", meaning: "24 tiếng", meaningEn: "day", example: "Hôm nay ngày đẹp.", exampleEn: "Today is nice.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "'Hai mươi' là số mấy?", questionEn: "What number?", options: ["12", "20", "22", "200"], answer: 1, explanation: "Hai mươi = 20.", explanationEn: "Hai mươi = 20." },
          { question: "'Giờ' nghĩa là gì?", questionEn: "What does 'giờ' mean?", options: ["Day", "Week", "Hour/O'clock", "Month"], answer: 2, explanation: "'Giờ' = hour/o'clock.", explanationEn: "'Giờ' = hour/o'clock." },
        ],
      },
      // NEW lessons for basic vocabulary
      {
        id: "vn-vocab-greetings", title: "Chào hỏi & Giới thiệu", titleEn: "Greetings & Introductions", level: "beginner",
        theory: `## Chào hỏi\n\n- **Xin chào** – Hello (formal)\n- **Chào anh/chị/em** – Hello (with pronoun)\n- **Tên tôi là…** – My name is…\n- **Rất vui được gặp bạn** – Nice to meet you\n- **Bạn khỏe không?** – How are you?\n- **Tạm biệt** – Goodbye`,
        theoryEn: `## Greetings\n\nXin chào (Hello), Tên tôi là (My name is), Tạm biệt (Goodbye)`,
        vocabulary: [
          { word: "xin chào", meaning: "lời chào", meaningEn: "hello", example: "Xin chào các bạn!", exampleEn: "Hello everyone!", partOfSpeech: "phrase" },
          { word: "tạm biệt", meaning: "lời chia tay", meaningEn: "goodbye", example: "Tạm biệt, hẹn gặp lại.", exampleEn: "Goodbye, see you again.", partOfSpeech: "phrase" },
          { word: "tên", meaning: "danh xưng", meaningEn: "name", example: "Tên bạn là gì?", exampleEn: "What's your name?", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "'Rất vui được gặp bạn' nghĩa gì?", questionEn: "What does it mean?", options: ["Goodbye", "Nice to meet you", "How are you", "Thank you"], answer: 1, explanation: "Nice to meet you.", explanationEn: "Nice to meet you." },
          { question: "'Tạm biệt' nghĩa gì?", questionEn: "What does 'tạm biệt' mean?", options: ["Hello", "Thank you", "Goodbye", "Sorry"], answer: 2, explanation: "'Tạm biệt' = goodbye.", explanationEn: "'Tạm biệt' = goodbye." },
        ],
      },
      {
        id: "vn-vocab-directions", title: "Phương hướng & Vị trí", titleEn: "Directions & Locations", level: "beginner",
        theory: `## Phương hướng\n\n- **trái** – left | **phải** – right\n- **thẳng** – straight | **quẹo / rẽ** – turn\n- **gần** – near | **xa** – far\n- **phía trước** – in front | **phía sau** – behind\n- **Đông** – East | **Tây** – West | **Nam** – South | **Bắc** – North`,
        theoryEn: `## Directions\n\ntrái (left), phải (right), thẳng (straight), quẹo (turn), gần (near), xa (far)`,
        vocabulary: [
          { word: "trái", meaning: "bên trái", meaningEn: "left", example: "Quẹo trái.", exampleEn: "Turn left.", partOfSpeech: "noun" },
          { word: "phải", meaning: "bên phải", meaningEn: "right", example: "Rẽ phải ở ngã tư.", exampleEn: "Turn right at the intersection.", partOfSpeech: "noun" },
          { word: "gần", meaning: "khoảng cách ngắn", meaningEn: "near / close", example: "Trường gần nhà.", exampleEn: "School is near home.", partOfSpeech: "adjective" },
        ],
        quiz: [
          { question: "'Đi thẳng' nghĩa gì?", questionEn: "What does 'đi thẳng' mean?", options: ["Turn left", "Go straight", "Turn right", "Go back"], answer: 1, explanation: "Đi thẳng = go straight.", explanationEn: "Go straight." },
          { question: "'Gần' nghĩa là gì?", questionEn: "What does 'gần' mean?", options: ["Far", "Near", "Left", "Right"], answer: 1, explanation: "'Gần' = near/close.", explanationEn: "'Gần' = near/close." },
        ],
      },
      {
        id: "vn-vocab-house", title: "Nhà cửa & Đồ dùng", titleEn: "House & Furniture", level: "beginner",
        theory: `## Nhà cửa\n\n- **phòng khách** – living room | **phòng ngủ** – bedroom\n- **nhà bếp** – kitchen | **phòng tắm** – bathroom\n- **bàn** – table | **ghế** – chair | **giường** – bed\n- **tủ** – cabinet | **đèn** – lamp | **cửa** – door`,
        theoryEn: `## House & Furniture\n\nRooms and furniture vocabulary.`,
        vocabulary: [
          { word: "nhà bếp", meaning: "nơi nấu ăn", meaningEn: "kitchen", example: "Mẹ ở trong nhà bếp.", exampleEn: "Mom is in the kitchen.", partOfSpeech: "noun" },
          { word: "giường", meaning: "nơi ngủ", meaningEn: "bed", example: "Giường rất êm.", exampleEn: "The bed is very soft.", partOfSpeech: "noun" },
          { word: "cửa sổ", meaning: "lỗ trên tường", meaningEn: "window", example: "Mở cửa sổ ra.", exampleEn: "Open the window.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "'Phòng ngủ' là gì?", questionEn: "What is 'phòng ngủ'?", options: ["Kitchen", "Bedroom", "Bathroom", "Living room"], answer: 1, explanation: "Phòng ngủ = bedroom.", explanationEn: "Phòng ngủ = bedroom." },
          { question: "'Nhà bếp' dùng để làm gì?", questionEn: "What is 'nhà bếp' for?", options: ["Sleeping", "Cooking", "Bathing", "Studying"], answer: 1, explanation: "Nhà bếp = kitchen (nơi nấu ăn).", explanationEn: "Kitchen = place for cooking." },
        ],
      },
      {
        id: "vn-vocab-sports", title: "Thể thao & Giải trí", titleEn: "Sports & Entertainment", level: "beginner",
        theory: `## Thể thao\n\n- **bóng đá** – football/soccer | **bơi** – swimming\n- **chạy** – running | **đạp xe** – cycling\n- **cầu lông** – badminton | **bóng bàn** – table tennis\n\n## Giải trí:\n- **xem phim** – watch movies | **nghe nhạc** – listen to music\n- **đọc sách** – read books | **chơi game** – play games`,
        theoryEn: `## Sports & Entertainment\n\nbóng đá (soccer), bơi (swimming), chạy (running), xem phim (watch movies)`,
        vocabulary: [
          { word: "bóng đá", meaning: "môn thể thao đá bóng", meaningEn: "football / soccer", example: "VN yêu bóng đá.", exampleEn: "Vietnam loves soccer.", partOfSpeech: "noun" },
          { word: "bơi", meaning: "di chuyển trong nước", meaningEn: "to swim", example: "Tôi thích bơi.", exampleEn: "I like swimming.", partOfSpeech: "verb" },
          { word: "xem phim", meaning: "coi phim", meaningEn: "watch movies", example: "Tối nay xem phim.", exampleEn: "Watch a movie tonight.", partOfSpeech: "verb phrase" },
        ],
        quiz: [
          { question: "Môn thể thao phổ biến nhất VN?", questionEn: "Most popular sport in VN?", options: ["Bóng rổ", "Bóng đá", "Tennis", "Golf"], answer: 1, explanation: "Bóng đá rất phổ biến.", explanationEn: "Soccer is very popular." },
          { question: "'Bơi' nghĩa là gì?", questionEn: "What does 'bơi' mean?", options: ["Run", "Swim", "Jump", "Fly"], answer: 1, explanation: "'Bơi' = to swim.", explanationEn: "'Bơi' = to swim." },
        ],
      },
      {
        id: "vn-vocab-clothes-daily", title: "Quần áo hàng ngày", titleEn: "Daily Clothing", level: "beginner",
        theory: `## Quần áo hàng ngày\n\n- **áo sơ mi** – shirt | **áo phông / áo thun** – T-shirt\n- **quần dài** – pants | **quần short** – shorts\n- **váy** – skirt/dress | **áo khoác** – jacket\n- **tất / vớ** – socks | **giày** – shoes | **dép** – sandals`,
        theoryEn: `## Daily Clothing\n\nShirts, pants, dresses, shoes and accessories.`,
        vocabulary: [
          { word: "áo sơ mi", meaning: "áo có cổ, có nút", meaningEn: "shirt (dress shirt)", example: "Mặc áo sơ mi đi làm.", exampleEn: "Wear a shirt to work.", partOfSpeech: "noun" },
          { word: "quần dài", meaning: "quần phủ hết chân", meaningEn: "pants / trousers", example: "Mặc quần dài.", exampleEn: "Wear pants.", partOfSpeech: "noun" },
          { word: "giày", meaning: "giày bịt kín chân", meaningEn: "shoes", example: "Đôi giày mới.", exampleEn: "New shoes.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "'Áo thun' là gì?", questionEn: "What is 'áo thun'?", options: ["Jacket", "T-shirt", "Dress", "Hat"], answer: 1, explanation: "Áo thun = T-shirt.", explanationEn: "Áo thun = T-shirt." },
          { question: "'Giày' là gì?", questionEn: "What are 'giày'?", options: ["Sandals", "Socks", "Shoes", "Pants"], answer: 2, explanation: "'Giày' = shoes.", explanationEn: "'Giày' = shoes." },
        ],
      },
    ],
  },
  {
    id: "vn-vocab-daily",
    title: "Từ vựng đời sống",
    titleEn: "Daily Life Vocabulary",
    icon: "🏠",
    color: "from-green-500 to-lime-500",
    description: "Mua sắm, giao thông, trường học, bệnh viện",
    descriptionEn: "Shopping, transport, school, hospital",
    category: "vocabulary",
    lessons: [
      {
        id: "vn-vocab-shopping", title: "Mua sắm & Chợ", titleEn: "Shopping & Market", level: "beginner",
        theory: `## Mua sắm ở Việt Nam 🛒\n\nBao nhiêu tiền? (How much?)\nĐắt quá! Bớt được không? (Too expensive! Discount?)\nmua (buy), bán (sell), giá (price), mặc cả (bargain)`,
        theoryEn: `## Shopping in Vietnam\n\nKey phrases for market shopping.`,
        vocabulary: [
          { word: "mua", meaning: "trao tiền lấy hàng", meaningEn: "to buy", ipa: "muə˧˧", example: "Cô ơi, cho con mua một ổ bánh mì không hành.", exampleEn: "Aunty, let me buy a Banh Mi without onions.", partOfSpeech: "verb" },
          { word: "bán", meaning: "trao hàng lấy tiền", meaningEn: "to sell", ipa: "ɓan˧˥", example: "Chị ơi, chị bán loại vải này bao nhiêu một mét?", exampleEn: "Excuse me, how much do you sell this fabric per meter?", partOfSpeech: "verb" },
          { word: "giá", meaning: "số tiền phải trả", meaningEn: "price", ipa: "za˧˥", example: "Anh ơi, giá cái này bao nhiêu vậy? Đắt quá!", exampleEn: "Hey, how much is this? That's too expensive!", partOfSpeech: "noun" },
          { word: "mặc cả", meaning: "thương lượng giá", meaningEn: "to bargain", ipa: "mak˧˩ ka˧˩˧", literalMeaning: "Nghĩa đen: 'đặt giá ngược lại'", literalMeaningEn: "Literal: 'counter-price'", example: "Ở chợ Bến Thành, bạn nên mặc cả để có giá tốt nhất.", exampleEn: "At Ben Thanh market, you should bargain to get the best price.", partOfSpeech: "verb" },
          { word: "tiền lẻ", meaning: "tiền mệnh giá nhỏ", meaningEn: "small change", ipa: "tiən˧˩ lɛ˧˩˧", example: "Em không có tiền lẻ, trả bằng chuyển khoản được không?", exampleEn: "I don't have change, can I pay by bank transfer?", partOfSpeech: "noun" },
          { word: "đắt", meaning: "giá cao", meaningEn: "expensive", ipa: "ɗak˧˥", example: "Đắt quá! Bớt cho em đi chị, em mua nhiều mà.", exampleEn: "Too expensive! Give me a discount, I'm buying a lot!", partOfSpeech: "adjective" },
          { word: "rẻ", meaning: "giá thấp", meaningEn: "cheap", ipa: "ɹɛ˧˩˧", example: "Ở chợ đêm, đồ ăn vừa ngon vừa rẻ.", exampleEn: "At the night market, food is both delicious and cheap.", partOfSpeech: "adjective" },
        ],
        quiz: [
          { question: "'Bao nhiêu tiền?' hỏi gì?", questionEn: "What does it ask?", options: ["Time", "Price", "Place", "Quantity"], answer: 1, explanation: "Hỏi giá tiền.", explanationEn: "Asks price." },
          { question: "'Mặc cả' nghĩa là gì?", questionEn: "What does 'mặc cả' mean?", options: ["To buy", "To sell", "To bargain", "To pay"], answer: 2, explanation: "'Mặc cả' = thương lượng giá.", explanationEn: "'Mặc cả' = to bargain." },
        ],
      },
      {
        id: "vn-vocab-transport", title: "Giao thông", titleEn: "Transportation", level: "beginner",
        theory: `## Phương tiện\n\nxe máy (motorbike – most popular!), ô tô (car), xe buýt (bus), xe đạp (bicycle), tàu hỏa (train), máy bay (airplane)`,
        theoryEn: `## Transportation\n\nVehicles and travel vocabulary.`,
        vocabulary: [
          { word: "xe máy", meaning: "phương tiện 2 bánh", meaningEn: "motorbike", example: "Người Việt thường đi xe máy.", exampleEn: "Vietnamese ride motorbikes.", partOfSpeech: "noun" },
          { word: "máy bay", meaning: "phương tiện bay", meaningEn: "airplane", example: "Đi máy bay ra Hà Nội.", exampleEn: "Fly to Hanoi.", partOfSpeech: "noun" },
          { word: "đường", meaning: "nơi di chuyển", meaningEn: "road / street", example: "Đường phố Sài Gòn đông.", exampleEn: "Saigon streets are crowded.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "Phương tiện phổ biến nhất VN?", questionEn: "Most common transport?", options: ["Ô tô", "Xe máy", "Xe buýt", "Tàu"], answer: 1, explanation: "Xe máy phổ biến nhất.", explanationEn: "Motorbikes most common." },
          { question: "'Máy bay' là gì?", questionEn: "What is 'máy bay'?", options: ["Car", "Train", "Airplane", "Bus"], answer: 2, explanation: "'Máy bay' = airplane.", explanationEn: "'Máy bay' = airplane." },
        ],
      },
      {
        id: "vn-vocab-school", title: "Trường học", titleEn: "School & Education", level: "beginner",
        theory: `## Trường học\n\nhọc sinh (student), giáo viên (teacher), lớp (class), trường (school), bài tập (homework), thi (exam)`,
        theoryEn: `## School vocabulary.`,
        vocabulary: [
          { word: "học sinh", meaning: "người đi học", meaningEn: "student", example: "Học sinh đi học lúc 7.", exampleEn: "Students go to school at 7.", partOfSpeech: "noun" },
          { word: "bài tập", meaning: "việc nhà", meaningEn: "homework", example: "Làm bài tập xong chưa?", exampleEn: "Finished homework?", partOfSpeech: "noun" },
          { word: "thi", meaning: "kiểm tra", meaningEn: "exam", example: "Ngày mai thi toán.", exampleEn: "Math exam tomorrow.", partOfSpeech: "verb/noun" },
        ],
        quiz: [
          { question: "'Sinh viên' khác 'học sinh'?", questionEn: "Difference?", options: ["Giống nhau", "Sinh viên = đại học", "Học sinh = đại học", "Không có"], answer: 1, explanation: "Sinh viên = university student.", explanationEn: "Sinh viên = university." },
          { question: "'Bài tập' nghĩa là gì?", questionEn: "What does 'bài tập' mean?", options: ["Exam", "Homework", "Class", "Teacher"], answer: 1, explanation: "'Bài tập' = homework.", explanationEn: "'Bài tập' = homework." },
        ],
      },
      {
        id: "vn-vocab-weather", title: "Thời tiết & Mùa", titleEn: "Weather & Seasons", level: "beginner",
        theory: `## Thời tiết\n\nnắng (sunny), mưa (rainy), nóng (hot), lạnh (cold)\nBắc: 4 mùa | Nam: 2 mùa (mưa, khô)`,
        theoryEn: `## Weather & Seasons`,
        vocabulary: [
          { word: "mưa", meaning: "nước rơi từ trời", meaningEn: "rain", example: "Hôm nay trời mưa.", exampleEn: "It's raining today.", partOfSpeech: "noun/verb" },
          { word: "nóng", meaning: "nhiệt độ cao", meaningEn: "hot", example: "Sài Gòn rất nóng.", exampleEn: "Saigon is very hot.", partOfSpeech: "adjective" },
          { word: "lạnh", meaning: "nhiệt độ thấp", meaningEn: "cold", example: "Mùa đông lạnh.", exampleEn: "Winter is cold.", partOfSpeech: "adjective" },
        ],
        quiz: [
          { question: "Miền Nam có mấy mùa?", questionEn: "Seasons in South?", options: ["4", "3", "2", "1"], answer: 2, explanation: "2 mùa: mưa và khô.", explanationEn: "2 seasons." },
          { question: "'Nóng' nghĩa là gì?", questionEn: "What does 'nóng' mean?", options: ["Cold", "Hot", "Rainy", "Windy"], answer: 1, explanation: "'Nóng' = hot.", explanationEn: "'Nóng' = hot." },
        ],
      },
      {
        id: "vn-vocab-emotions", title: "Cảm xúc & Tính cách", titleEn: "Emotions & Personality", level: "intermediate",
        theory: `## Cảm xúc\n\nvui (happy), buồn (sad), giận (angry), sợ (scared)\n\n## Tính cách:\ntốt bụng (kind), thông minh (smart), chăm chỉ (hardworking)`,
        theoryEn: `## Emotions & Personality`,
        vocabulary: [
          { word: "vui", meaning: "cảm giác tích cực", meaningEn: "happy", example: "Tôi rất vui!", exampleEn: "I'm very happy!", partOfSpeech: "adjective" },
          { word: "buồn", meaning: "cảm giác tiêu cực", meaningEn: "sad", example: "Đừng buồn.", exampleEn: "Don't be sad.", partOfSpeech: "adjective" },
          { word: "thông minh", meaning: "trí tuệ cao", meaningEn: "smart", example: "Em bé thông minh.", exampleEn: "Smart child.", partOfSpeech: "adjective" },
        ],
        quiz: [
          { question: "'Xấu hổ' nghĩa gì?", questionEn: "What does it mean?", options: ["Angry", "Embarrassed", "Happy", "Scared"], answer: 1, explanation: "'Xấu hổ' = embarrassed.", explanationEn: "'Xấu hổ' = embarrassed." },
          { question: "'Vui' là cảm xúc gì?", questionEn: "What emotion is 'vui'?", options: ["Sad", "Angry", "Happy", "Scared"], answer: 2, explanation: "'Vui' = happy.", explanationEn: "'Vui' = happy." },
        ],
      },
      // NEW daily life lessons
      {
        id: "vn-vocab-restaurant", title: "Nhà hàng & Gọi món", titleEn: "Restaurant & Ordering", level: "beginner",
        theory: `## Nhà hàng\n\n- **Cho tôi xem thực đơn** – May I see the menu\n- **Tôi muốn gọi…** – I'd like to order…\n- **Tính tiền** – Check please\n- **thực đơn** – menu | **món khai vị** – appetizer\n- **món chính** – main course | **tráng miệng** – dessert`,
        theoryEn: `## Restaurant & Ordering\n\nMenu, ordering, and payment vocabulary.`,
        vocabulary: [
          { word: "thực đơn", meaning: "danh sách món ăn", meaningEn: "menu", example: "Cho tôi xem thực đơn.", exampleEn: "May I see the menu.", partOfSpeech: "noun" },
          { word: "gọi món", meaning: "đặt món ăn", meaningEn: "to order food", example: "Gọi món đi.", exampleEn: "Let's order.", partOfSpeech: "verb phrase" },
          { word: "tính tiền", meaning: "thanh toán", meaningEn: "to pay / check please", example: "Tính tiền giùm.", exampleEn: "Check please.", partOfSpeech: "verb phrase" },
        ],
        quiz: [
          { question: "'Tính tiền' nghĩa gì?", questionEn: "What does it mean?", options: ["Order food", "Check please", "Menu", "Tip"], answer: 1, explanation: "Tính tiền = pay the bill.", explanationEn: "Pay the bill." },
          { question: "'Thực đơn' là gì?", questionEn: "What is 'thực đơn'?", options: ["Bill", "Menu", "Dessert", "Appetizer"], answer: 1, explanation: "'Thực đơn' = menu.", explanationEn: "'Thực đơn' = menu." },
        ],
      },
      {
        id: "vn-vocab-hospital", title: "Bệnh viện & Khám bệnh", titleEn: "Hospital & Medical Visit", level: "intermediate",
        theory: `## Khám bệnh\n\n- **Tôi bị đau…** – I have pain in…\n- **bệnh viện** – hospital | **phòng khám** – clinic\n- **đau đầu** – headache | **sốt** – fever\n- **đơn thuốc** – prescription`,
        theoryEn: `## Medical Visit\n\nDescribing symptoms and visiting the doctor.`,
        vocabulary: [
          { word: "đau đầu", meaning: "nhức đầu", meaningEn: "headache", example: "Tôi bị đau đầu.", exampleEn: "I have a headache.", partOfSpeech: "noun" },
          { word: "đơn thuốc", meaning: "giấy kê thuốc", meaningEn: "prescription", example: "Bác sĩ cho đơn thuốc.", exampleEn: "Doctor gives prescription.", partOfSpeech: "noun" },
          { word: "khám bệnh", meaning: "đi gặp bác sĩ", meaningEn: "medical checkup", example: "Đi khám bệnh.", exampleEn: "Go for a checkup.", partOfSpeech: "verb phrase" },
        ],
        quiz: [
          { question: "'Phòng khám' là gì?", questionEn: "What is it?", options: ["Hospital", "Clinic", "Pharmacy", "Lab"], answer: 1, explanation: "Phòng khám = clinic.", explanationEn: "Clinic." },
          { question: "'Đơn thuốc' là gì?", questionEn: "What is 'đơn thuốc'?", options: ["Medicine", "Prescription", "Doctor", "Hospital"], answer: 1, explanation: "'Đơn thuốc' = prescription.", explanationEn: "'Đơn thuốc' = prescription." },
        ],
      },
      {
        id: "vn-vocab-bank", title: "Ngân hàng & Tài chính", titleEn: "Banking & Finance", level: "intermediate",
        theory: `## Ngân hàng\n\n- **tài khoản** – account | **rút tiền** – withdraw\n- **gửi tiền** – deposit | **chuyển khoản** – transfer\n- **thẻ tín dụng** – credit card | **tiết kiệm** – savings\n- **lãi suất** – interest rate`,
        theoryEn: `## Banking & Finance\n\nAccount, withdraw, deposit, transfer vocabulary.`,
        vocabulary: [
          { word: "rút tiền", meaning: "lấy tiền từ tài khoản", meaningEn: "to withdraw money", example: "Rút tiền ở ATM.", exampleEn: "Withdraw at ATM.", partOfSpeech: "verb phrase" },
          { word: "chuyển khoản", meaning: "gửi tiền điện tử", meaningEn: "bank transfer", example: "Chuyển khoản cho tôi.", exampleEn: "Transfer to me.", partOfSpeech: "verb phrase" },
          { word: "lãi suất", meaning: "phần trăm lãi", meaningEn: "interest rate", example: "Lãi suất 5%.", exampleEn: "5% interest rate.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "'Chuyển khoản' là gì?", questionEn: "What is it?", options: ["Cash", "Bank transfer", "Loan", "Savings"], answer: 1, explanation: "Chuyển khoản = bank transfer.", explanationEn: "Bank transfer." },
          { question: "'Rút tiền' nghĩa là gì?", questionEn: "What does 'rút tiền' mean?", options: ["Deposit", "Transfer", "Withdraw", "Save"], answer: 2, explanation: "'Rút tiền' = withdraw money.", explanationEn: "'Rút tiền' = withdraw money." },
        ],
      },
      {
        id: "vn-vocab-phone", title: "Điện thoại & Liên lạc", titleEn: "Phone & Communication", level: "beginner",
        theory: `## Liên lạc\n\n- **gọi điện** – make a call | **nhắn tin** – text message\n- **số điện thoại** – phone number\n- **email** – email | **mạng xã hội** – social media\n- **Zalo** – VN's most popular messaging app`,
        theoryEn: `## Phone & Communication\n\nCalling, texting, and social media vocabulary.`,
        vocabulary: [
          { word: "gọi điện", meaning: "gọi điện thoại", meaningEn: "to call", example: "Gọi điện cho mẹ.", exampleEn: "Call mom.", partOfSpeech: "verb phrase" },
          { word: "nhắn tin", meaning: "gửi tin nhắn", meaningEn: "to text", example: "Nhắn tin cho tôi.", exampleEn: "Text me.", partOfSpeech: "verb phrase" },
          { word: "mạng xã hội", meaning: "nền tảng kết nối", meaningEn: "social media", example: "Dùng mạng xã hội nhiều.", exampleEn: "Use social media a lot.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "App nhắn tin phổ biến nhất VN?", questionEn: "Most popular messaging app?", options: ["WhatsApp", "Zalo", "Line", "WeChat"], answer: 1, explanation: "Zalo phổ biến nhất.", explanationEn: "Zalo is most popular." },
          { question: "'Nhắn tin' nghĩa là gì?", questionEn: "What does 'nhắn tin' mean?", options: ["Call", "Text", "Email", "Video call"], answer: 1, explanation: "'Nhắn tin' = to text.", explanationEn: "'Nhắn tin' = to text." },
        ],
      },
      {
        id: "vn-vocab-post", title: "Bưu điện & Gửi hàng", titleEn: "Post Office & Shipping", level: "beginner",
        theory: `## Bưu điện\n\n- **gửi thư** – send a letter | **bưu kiện** – package\n- **tem** – stamp | **phong bì** – envelope\n- **địa chỉ** – address | **mã bưu điện** – zip code\n- **giao hàng** – delivery | **vận chuyển** – shipping`,
        theoryEn: `## Post Office & Shipping\n\nMail, packages, and delivery vocabulary.`,
        vocabulary: [
          { word: "gửi thư", meaning: "gửi thư từ", meaningEn: "send a letter", example: "Gửi thư cho bạn.", exampleEn: "Send a letter to friend.", partOfSpeech: "verb phrase" },
          { word: "bưu kiện", meaning: "gói hàng gửi qua bưu điện", meaningEn: "package / parcel", example: "Nhận bưu kiện.", exampleEn: "Receive a package.", partOfSpeech: "noun" },
          { word: "giao hàng", meaning: "đưa hàng đến nơi", meaningEn: "delivery", example: "Giao hàng tận nhà.", exampleEn: "Home delivery.", partOfSpeech: "verb phrase" },
        ],
        quiz: [
          { question: "'Bưu kiện' là gì?", questionEn: "What is it?", options: ["Letter", "Package", "Stamp", "Envelope"], answer: 1, explanation: "Bưu kiện = package.", explanationEn: "Package." },
          { question: "'Giao hàng' nghĩa là gì?", questionEn: "What does 'giao hàng' mean?", options: ["Send letter", "Delivery", "Post office", "Stamp"], answer: 1, explanation: "'Giao hàng' = delivery.", explanationEn: "'Giao hàng' = delivery." },
        ],
      },
    ],
  },
  {
    id: "vn-vocab-advanced",
    title: "Từ vựng nâng cao",
    titleEn: "Advanced Vocabulary",
    icon: "📚",
    color: "from-indigo-500 to-purple-500",
    description: "Công nghệ, y tế, kinh tế, pháp luật",
    descriptionEn: "Technology, health, economics, law",
    category: "vocabulary",
    lessons: [
      {
        id: "vn-vocab-tech", title: "Công nghệ & Internet", titleEn: "Technology & Internet", level: "intermediate",
        theory: `## Công nghệ\n\nđiện thoại (phone), máy tính (computer), mạng (internet), ứng dụng (app), trí tuệ nhân tạo (AI)`,
        theoryEn: `## Technology vocabulary.`,
        vocabulary: [
          { word: "điện thoại", meaning: "thiết bị liên lạc", meaningEn: "phone", example: "Điện thoại thông minh.", exampleEn: "Smartphone.", partOfSpeech: "noun" },
          { word: "máy tính", meaning: "thiết bị xử lý", meaningEn: "computer", example: "Dùng máy tính xách tay.", exampleEn: "Use a laptop.", partOfSpeech: "noun" },
          { word: "mật khẩu", meaning: "mã bảo mật", meaningEn: "password", example: "Đổi mật khẩu.", exampleEn: "Change password.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "'Trí tuệ nhân tạo' là gì?", questionEn: "What is it?", options: ["Cloud", "AI", "Database", "Software"], answer: 1, explanation: "AI.", explanationEn: "AI." },
          { question: "'Mật khẩu' nghĩa là gì?", questionEn: "What does 'mật khẩu' mean?", options: ["Username", "Password", "Email", "Account"], answer: 1, explanation: "'Mật khẩu' = password.", explanationEn: "'Mật khẩu' = password." },
        ],
      },
      {
        id: "vn-vocab-health", title: "Sức khỏe & Y tế", titleEn: "Health & Medicine", level: "intermediate",
        theory: `## Sức khỏe\n\nbệnh viện (hospital), bác sĩ (doctor), thuốc (medicine), bệnh (illness)`,
        theoryEn: `## Health vocabulary.`,
        vocabulary: [
          { word: "bác sĩ", meaning: "người chữa bệnh", meaningEn: "doctor", example: "Đi khám bác sĩ.", exampleEn: "See a doctor.", partOfSpeech: "noun" },
          { word: "thuốc", meaning: "chất chữa bệnh", meaningEn: "medicine", example: "Uống thuốc đúng giờ.", exampleEn: "Take medicine on time.", partOfSpeech: "noun" },
          { word: "đau", meaning: "cảm giác khó chịu", meaningEn: "pain", example: "Đau đầu quá!", exampleEn: "Headache!", partOfSpeech: "adjective" },
        ],
        quiz: [
          { question: "'Ốm' nghĩa gì?", questionEn: "What does 'ốm' mean?", options: ["Healthy", "Sick", "Fat", "Thin"], answer: 1, explanation: "'Ốm' = sick (North) / thin (South).", explanationEn: "'Ốm' = sick/thin." },
          { question: "'Thuốc' là gì?", questionEn: "What is 'thuốc'?", options: ["Doctor", "Hospital", "Medicine", "Pain"], answer: 2, explanation: "'Thuốc' = medicine.", explanationEn: "'Thuốc' = medicine." },
        ],
      },
      {
        id: "vn-vocab-work", title: "Nghề nghiệp & Công việc", titleEn: "Jobs & Careers", level: "intermediate",
        theory: `## Nghề nghiệp\n\nbác sĩ (doctor), giáo viên (teacher), kỹ sư (engineer), luật sư (lawyer), lập trình viên (programmer)`,
        theoryEn: `## Jobs vocabulary.`,
        vocabulary: [
          { word: "kỹ sư", meaning: "người làm kỹ thuật", meaningEn: "engineer", example: "Kỹ sư phần mềm.", exampleEn: "Software engineer.", partOfSpeech: "noun" },
          { word: "lương", meaning: "tiền công", meaningEn: "salary", example: "Lương tháng này cao.", exampleEn: "High salary this month.", partOfSpeech: "noun" },
          { word: "xin việc", meaning: "nộp đơn", meaningEn: "apply for job", example: "Đang xin việc.", exampleEn: "Applying for a job.", partOfSpeech: "verb phrase" },
        ],
        quiz: [
          { question: "'Lập trình viên' làm gì?", questionEn: "What do they do?", options: ["Teach", "Code", "Heal", "Write"], answer: 1, explanation: "Programmer = viết code.", explanationEn: "Programmer." },
          { question: "'Lương' nghĩa là gì?", questionEn: "What does 'lương' mean?", options: ["Job", "Salary", "Office", "Boss"], answer: 1, explanation: "'Lương' = salary.", explanationEn: "'Lương' = salary." },
        ],
      },
      {
        id: "vn-vocab-nature", title: "Thiên nhiên & Động vật", titleEn: "Nature & Animals", level: "beginner",
        theory: `## Thiên nhiên\n\nnúi (mountain), sông (river), biển (sea), rừng (forest)\n\n## Động vật:\nchó (dog), mèo (cat), trâu (buffalo), voi (elephant)`,
        theoryEn: `## Nature & Animals vocabulary.`,
        vocabulary: [
          { word: "biển", meaning: "vùng nước mặn lớn", meaningEn: "sea", example: "Đi biển mùa hè.", exampleEn: "Beach in summer.", partOfSpeech: "noun" },
          { word: "trâu", meaning: "gia súc lớn", meaningEn: "water buffalo", example: "Trâu là bạn nhà nông.", exampleEn: "Buffalo is farmer's friend.", partOfSpeech: "noun" },
          { word: "hoa", meaning: "bộ phận đẹp của cây", meaningEn: "flower", example: "Hoa sen là quốc hoa.", exampleEn: "Lotus is national flower.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "Quốc hoa VN?", questionEn: "National flower?", options: ["Hồng", "Sen", "Mai", "Đào"], answer: 1, explanation: "Hoa sen.", explanationEn: "Lotus." },
          { question: "'Trâu' là con gì?", questionEn: "What animal is 'trâu'?", options: ["Cow", "Water buffalo", "Horse", "Elephant"], answer: 1, explanation: "'Trâu' = water buffalo.", explanationEn: "'Trâu' = water buffalo." },
        ],
      },
      {
        id: "vn-vocab-travel", title: "Du lịch & Địa danh", titleEn: "Travel & Landmarks", level: "intermediate",
        theory: `## Du lịch\n\nHạ Long, Hội An, Phú Quốc, Sapa, Đà Lạt, Huế\nkhách sạn (hotel), vé (ticket), hướng dẫn viên (guide)`,
        theoryEn: `## Travel in Vietnam.`,
        vocabulary: [
          { word: "du lịch", meaning: "đi chơi xa", meaningEn: "travel", example: "Tôi thích du lịch.", exampleEn: "I like traveling.", partOfSpeech: "noun/verb" },
          { word: "khách sạn", meaning: "nơi ở tạm", meaningEn: "hotel", example: "Đặt khách sạn trước.", exampleEn: "Book hotel ahead.", partOfSpeech: "noun" },
          { word: "vé", meaning: "giấy cho phép", meaningEn: "ticket", example: "Mua vé máy bay.", exampleEn: "Buy airplane tickets.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "Vịnh Hạ Long thuộc tổ chức nào?", questionEn: "Recognized by?", options: ["ASEAN", "UNESCO", "WHO", "WTO"], answer: 1, explanation: "UNESCO.", explanationEn: "UNESCO heritage." },
          { question: "'Khách sạn' là gì?", questionEn: "What is 'khách sạn'?", options: ["Restaurant", "Hotel", "Airport", "Museum"], answer: 1, explanation: "'Khách sạn' = hotel.", explanationEn: "'Khách sạn' = hotel." },
        ],
      },
      // NEW advanced vocabulary lessons
      {
        id: "vn-vocab-law", title: "Pháp luật & Chính trị", titleEn: "Law & Politics", level: "advanced",
        theory: `## Pháp luật\n\n- **luật** – law | **hiến pháp** – constitution\n- **tòa án** – court | **luật sư** – lawyer\n- **bầu cử** – election | **quốc hội** – national assembly\n- **chính phủ** – government | **thủ tướng** – prime minister`,
        theoryEn: `## Law & Politics vocabulary.`,
        vocabulary: [
          { word: "luật", meaning: "quy tắc pháp lý", meaningEn: "law", example: "Tuân thủ pháp luật.", exampleEn: "Obey the law.", partOfSpeech: "noun" },
          { word: "hiến pháp", meaning: "luật cơ bản nhất", meaningEn: "constitution", example: "Hiến pháp 2013.", exampleEn: "2013 Constitution.", partOfSpeech: "noun" },
          { word: "chính phủ", meaning: "cơ quan quản lý nhà nước", meaningEn: "government", example: "Chính phủ ban hành chính sách.", exampleEn: "Government issues policies.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "'Quốc hội' là gì?", questionEn: "What is it?", options: ["Court", "National Assembly", "Government", "Army"], answer: 1, explanation: "Quốc hội = National Assembly.", explanationEn: "National Assembly." },
          { question: "'Hiến pháp' là gì?", questionEn: "What is 'hiến pháp'?", options: ["Law", "Constitution", "Court", "Election"], answer: 1, explanation: "'Hiến pháp' = constitution.", explanationEn: "'Hiến pháp' = constitution." },
        ],
      },
      {
        id: "vn-vocab-environment", title: "Môi trường & Sinh thái", titleEn: "Environment & Ecology", level: "advanced",
        theory: `## Môi trường\n\n- **ô nhiễm** – pollution | **biến đổi khí hậu** – climate change\n- **tái chế** – recycle | **năng lượng** – energy\n- **rừng** – forest | **tuyệt chủng** – extinction\n- **bền vững** – sustainable`,
        theoryEn: `## Environment & Ecology vocabulary.`,
        vocabulary: [
          { word: "ô nhiễm", meaning: "làm bẩn", meaningEn: "pollution", example: "Ô nhiễm không khí.", exampleEn: "Air pollution.", partOfSpeech: "noun" },
          { word: "tái chế", meaning: "xử lý để dùng lại", meaningEn: "to recycle", example: "Tái chế rác nhựa.", exampleEn: "Recycle plastic.", partOfSpeech: "verb" },
          { word: "bền vững", meaning: "lâu dài, ổn định", meaningEn: "sustainable", example: "Phát triển bền vững.", exampleEn: "Sustainable development.", partOfSpeech: "adjective" },
        ],
        quiz: [
          { question: "'Biến đổi khí hậu' là gì?", questionEn: "What is it?", options: ["Weather", "Climate change", "Season", "Temperature"], answer: 1, explanation: "Climate change.", explanationEn: "Climate change." },
          { question: "'Tái chế' nghĩa là gì?", questionEn: "What does 'tái chế' mean?", options: ["Reduce", "Recycle", "Reuse", "Refuse"], answer: 1, explanation: "'Tái chế' = recycle.", explanationEn: "'Tái chế' = recycle." },
        ],
      },
      {
        id: "vn-vocab-economics", title: "Kinh tế & Kinh doanh", titleEn: "Economics & Business", level: "advanced",
        theory: `## Kinh tế\n\n- **GDP** – tổng sản phẩm nội địa | **lạm phát** – inflation\n- **đầu tư** – invest | **cổ phiếu** – stock\n- **doanh nghiệp** – enterprise | **lợi nhuận** – profit\n- **xuất khẩu** – export | **nhập khẩu** – import`,
        theoryEn: `## Economics & Business vocabulary.`,
        vocabulary: [
          { word: "đầu tư", meaning: "bỏ vốn kinh doanh", meaningEn: "to invest", example: "Đầu tư vào bất động sản.", exampleEn: "Invest in real estate.", partOfSpeech: "verb" },
          { word: "lợi nhuận", meaning: "tiền lãi", meaningEn: "profit", example: "Lợi nhuận tăng 20%.", exampleEn: "Profit increased 20%.", partOfSpeech: "noun" },
          { word: "xuất khẩu", meaning: "bán ra nước ngoài", meaningEn: "export", example: "VN xuất khẩu gạo.", exampleEn: "VN exports rice.", partOfSpeech: "noun/verb" },
        ],
        quiz: [
          { question: "'Lạm phát' nghĩa gì?", questionEn: "What does it mean?", options: ["Profit", "Inflation", "Tax", "Debt"], answer: 1, explanation: "Lạm phát = inflation.", explanationEn: "Inflation." },
          { question: "'Xuất khẩu' là gì?", questionEn: "What is 'xuất khẩu'?", options: ["Import", "Export", "Invest", "Trade"], answer: 1, explanation: "'Xuất khẩu' = export.", explanationEn: "'Xuất khẩu' = export." },
        ],
      },
      {
        id: "vn-vocab-media", title: "Truyền thông & Báo chí", titleEn: "Media & Journalism", level: "intermediate",
        theory: `## Truyền thông\n\n- **báo** – newspaper | **tin tức** – news\n- **phóng viên** – reporter | **biên tập viên** – editor\n- **truyền hình** – television | **phát thanh** – radio\n- **quảng cáo** – advertisement`,
        theoryEn: `## Media & Journalism vocabulary.`,
        vocabulary: [
          { word: "tin tức", meaning: "thông tin mới", meaningEn: "news", example: "Xem tin tức buổi tối.", exampleEn: "Watch evening news.", partOfSpeech: "noun" },
          { word: "quảng cáo", meaning: "giới thiệu sản phẩm", meaningEn: "advertisement", example: "Quảng cáo trên TV.", exampleEn: "TV advertisement.", partOfSpeech: "noun" },
          { word: "phóng viên", meaning: "người đưa tin", meaningEn: "reporter", example: "Phóng viên phỏng vấn.", exampleEn: "Reporter interviews.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "'Truyền hình' là gì?", questionEn: "What is it?", options: ["Radio", "Television", "Newspaper", "Internet"], answer: 1, explanation: "Truyền hình = television.", explanationEn: "Television." },
          { question: "'Phóng viên' là ai?", questionEn: "Who is a 'phóng viên'?", options: ["Editor", "Reporter", "Singer", "Actor"], answer: 1, explanation: "'Phóng viên' = reporter.", explanationEn: "'Phóng viên' = reporter." },
        ],
      },
      {
        id: "vn-vocab-science", title: "Khoa học & Nghiên cứu", titleEn: "Science & Research", level: "advanced",
        theory: `## Khoa học\n\n- **nghiên cứu** – research | **thí nghiệm** – experiment\n- **phát minh** – invention | **khám phá** – discovery\n- **vật lý** – physics | **hóa học** – chemistry\n- **sinh học** – biology | **toán học** – mathematics`,
        theoryEn: `## Science & Research vocabulary.`,
        vocabulary: [
          { word: "nghiên cứu", meaning: "tìm hiểu sâu", meaningEn: "research", example: "Nghiên cứu khoa học.", exampleEn: "Scientific research.", partOfSpeech: "noun/verb" },
          { word: "phát minh", meaning: "tạo ra cái mới", meaningEn: "invention", example: "Phát minh quan trọng.", exampleEn: "Important invention.", partOfSpeech: "noun" },
          { word: "thí nghiệm", meaning: "kiểm tra bằng thực hành", meaningEn: "experiment", example: "Làm thí nghiệm.", exampleEn: "Do an experiment.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "'Sinh học' là gì?", questionEn: "What is it?", options: ["Physics", "Chemistry", "Biology", "Math"], answer: 2, explanation: "Sinh học = biology.", explanationEn: "Biology." },
          { question: "'Thí nghiệm' là gì?", questionEn: "What is 'thí nghiệm'?", options: ["Research", "Experiment", "Invention", "Discovery"], answer: 1, explanation: "'Thí nghiệm' = experiment.", explanationEn: "'Thí nghiệm' = experiment." },
        ],
      },
    ],
  },
  {
    id: "vn-vocab-culture",
    title: "Từ vựng văn hóa",
    titleEn: "Cultural Vocabulary",
    icon: "🎭",
    color: "from-rose-500 to-pink-500",
    description: "Lễ hội, trang phục, âm nhạc, tôn giáo",
    descriptionEn: "Festivals, clothing, music, religion",
    category: "vocabulary",
    lessons: [
      {
        id: "vn-vocab-festivals", title: "Lễ hội & Truyền thống", titleEn: "Festivals & Traditions", level: "intermediate",
        theory: `## Lễ hội\n\nTết Nguyên Đán (Lunar New Year), Tết Trung Thu (Mid-Autumn), Giỗ Tổ Hùng Vương\nLì xì (red envelope), bánh chưng, hoa mai/đào`,
        theoryEn: `## Vietnamese Festivals`,
        vocabulary: [
          { word: "Tết", meaning: "lễ hội đầu năm", meaningEn: "Lunar New Year", example: "Tết là lễ lớn nhất.", exampleEn: "Tet is biggest.", partOfSpeech: "noun" },
          { word: "lì xì", meaning: "phong bao đỏ", meaningEn: "red envelope", example: "Trẻ em thích lì xì.", exampleEn: "Kids love lucky money.", partOfSpeech: "noun" },
          { word: "bánh chưng", meaning: "bánh gạo vuông", meaningEn: "square rice cake", example: "Gói bánh chưng ngày Tết.", exampleEn: "Making banh chung for Tet.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "Lễ hội lớn nhất VN?", questionEn: "Biggest festival?", options: ["Trung Thu", "Tết Nguyên Đán", "Vu Lan", "Giỗ Tổ"], answer: 1, explanation: "Tết Nguyên Đán.", explanationEn: "Lunar New Year." },
          { question: "'Lì xì' là gì?", questionEn: "What is 'lì xì'?", options: ["Gift", "Red envelope", "Cake", "Flower"], answer: 1, explanation: "'Lì xì' = red envelope / lucky money.", explanationEn: "'Lì xì' = red envelope." },
        ],
      },
      {
        id: "vn-vocab-clothing", title: "Trang phục", titleEn: "Clothing & Fashion", level: "beginner",
        theory: `## Trang phục truyền thống\n\náo dài (traditional dress), nón lá (conical hat)`,
        theoryEn: `## Traditional clothing.`,
        vocabulary: [
          { word: "áo dài", meaning: "trang phục truyền thống", meaningEn: "Vietnamese traditional dress", example: "Áo dài rất đẹp.", exampleEn: "Ao dai is beautiful.", partOfSpeech: "noun" },
          { word: "nón lá", meaning: "nón hình chóp", meaningEn: "conical hat", example: "Nón lá là biểu tượng.", exampleEn: "Conical hat is a symbol.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "Trang phục truyền thống VN?", questionEn: "Traditional dress?", options: ["Kimono", "Áo dài", "Hanbok", "Sari"], answer: 1, explanation: "Áo dài.", explanationEn: "Áo dài." },
          { question: "'Nón lá' là gì?", questionEn: "What is 'nón lá'?", options: ["Helmet", "Conical hat", "Cap", "Scarf"], answer: 1, explanation: "'Nón lá' = conical hat.", explanationEn: "'Nón lá' = conical hat." },
        ],
      },
      {
        id: "vn-vocab-food-advanced", title: "Ẩm thực nâng cao", titleEn: "Advanced Cuisine", level: "advanced",
        theory: `## Ẩm thực chuyên sâu\n\nGia vị: nước mắm, ớt, sả, gừng\nCách chế biến: chiên, luộc, nướng, hấp, xào, kho`,
        theoryEn: `## Advanced Cuisine: spices and cooking methods.`,
        vocabulary: [
          { word: "nước mắm", meaning: "gia vị từ cá", meaningEn: "fish sauce", example: "Linh hồn ẩm thực VN.", exampleEn: "Soul of VN cuisine.", partOfSpeech: "noun" },
          { word: "xào", meaning: "chiên nhanh", meaningEn: "stir-fry", example: "Xào rau với tỏi.", exampleEn: "Stir-fry veggies.", partOfSpeech: "verb" },
          { word: "kho", meaning: "nấu lâu", meaningEn: "to braise", example: "Thịt kho tàu.", exampleEn: "Braised pork.", partOfSpeech: "verb" },
        ],
        quiz: [
          { question: "'Nước mắm' từ gì?", questionEn: "Made from?", options: ["Đậu", "Cá", "Thịt", "Rau"], answer: 1, explanation: "Cá lên men.", explanationEn: "Fermented fish." },
          { question: "'Xào' là cách chế biến gì?", questionEn: "What cooking method is 'xào'?", options: ["Boil", "Stir-fry", "Steam", "Grill"], answer: 1, explanation: "'Xào' = stir-fry.", explanationEn: "'Xào' = stir-fry." },
        ],
      },
      // NEW cultural vocabulary lessons
      {
        id: "vn-vocab-music", title: "Âm nhạc Việt Nam", titleEn: "Vietnamese Music", level: "intermediate",
        theory: `## Âm nhạc\n\n- **nhạc dân tộc** – folk music | **nhạc trẻ** – pop music\n- **đàn tranh** – zither | **đàn bầu** – monochord\n- **ca sĩ** – singer | **nhạc sĩ** – composer\n- **hát** – to sing | **bài hát** – song`,
        theoryEn: `## Vietnamese Music\n\nTraditional instruments and modern music.`,
        vocabulary: [
          { word: "đàn bầu", meaning: "nhạc cụ một dây", meaningEn: "monochord (unique VN instrument)", example: "Đàn bầu rất đặc biệt.", exampleEn: "Monochord is unique.", partOfSpeech: "noun" },
          { word: "ca sĩ", meaning: "người hát", meaningEn: "singer", example: "Ca sĩ nổi tiếng.", exampleEn: "Famous singer.", partOfSpeech: "noun" },
          { word: "bài hát", meaning: "tác phẩm âm nhạc", meaningEn: "song", example: "Bài hát hay quá!", exampleEn: "Great song!", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "'Đàn bầu' là nhạc cụ gì?", questionEn: "What instrument?", options: ["Drum", "Monochord", "Flute", "Guitar"], answer: 1, explanation: "Nhạc cụ một dây độc đáo.", explanationEn: "Unique one-string instrument." },
          { question: "'Ca sĩ' là ai?", questionEn: "Who is a 'ca sĩ'?", options: ["Dancer", "Singer", "Musician", "Actor"], answer: 1, explanation: "'Ca sĩ' = singer.", explanationEn: "'Ca sĩ' = singer." },
        ],
      },
      {
        id: "vn-vocab-religion", title: "Tôn giáo & Tín ngưỡng", titleEn: "Religion & Beliefs", level: "intermediate",
        theory: `## Tôn giáo ở Việt Nam\n\n- **Phật giáo** – Buddhism (lớn nhất)\n- **Thiên Chúa giáo** – Christianity\n- **Đạo Cao Đài** – Caodaism (VN origin)\n- **thờ cúng tổ tiên** – ancestor worship\n- **chùa** – pagoda | **nhà thờ** – church`,
        theoryEn: `## Religion in Vietnam\n\nBuddhism, Christianity, Caodaism, ancestor worship.`,
        vocabulary: [
          { word: "chùa", meaning: "nơi thờ Phật", meaningEn: "pagoda / temple", example: "Đi chùa ngày Rằm.", exampleEn: "Visit pagoda on full moon.", partOfSpeech: "noun" },
          { word: "thờ cúng", meaning: "lễ bái", meaningEn: "worship", example: "Thờ cúng tổ tiên.", exampleEn: "Ancestor worship.", partOfSpeech: "verb" },
          { word: "tín ngưỡng", meaning: "niềm tin tâm linh", meaningEn: "belief / faith", example: "Tín ngưỡng dân gian.", exampleEn: "Folk beliefs.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "Tôn giáo lớn nhất VN?", questionEn: "Largest religion?", options: ["Thiên Chúa", "Phật giáo", "Hồi giáo", "Hindu"], answer: 1, explanation: "Phật giáo.", explanationEn: "Buddhism." },
          { question: "'Chùa' là nơi nào?", questionEn: "What is a 'chùa'?", options: ["Church", "Pagoda", "Mosque", "School"], answer: 1, explanation: "'Chùa' = pagoda/temple.", explanationEn: "'Chùa' = pagoda." },
        ],
      },
      {
        id: "vn-vocab-art", title: "Nghệ thuật & Thủ công", titleEn: "Art & Handicrafts", level: "intermediate",
        theory: `## Nghệ thuật\n\n- **hội họa** – painting | **điêu khắc** – sculpture\n- **gốm sứ** – ceramics | **thêu** – embroidery\n- **tranh Đông Hồ** – Dong Ho folk painting\n- **múa rối nước** – water puppet`,
        theoryEn: `## Vietnamese Art & Handicrafts\n\nFolk paintings, ceramics, water puppetry.`,
        vocabulary: [
          { word: "múa rối nước", meaning: "nghệ thuật rối VN", meaningEn: "water puppetry", example: "Xem múa rối nước ở HN.", exampleEn: "Watch water puppets in Hanoi.", partOfSpeech: "noun" },
          { word: "gốm sứ", meaning: "đồ bằng đất nung", meaningEn: "ceramics / pottery", example: "Làng gốm Bát Tràng.", exampleEn: "Bat Trang ceramic village.", partOfSpeech: "noun" },
          { word: "thêu", meaning: "may trang trí", meaningEn: "embroidery", example: "Thêu tay rất đẹp.", exampleEn: "Hand embroidery is beautiful.", partOfSpeech: "verb/noun" },
        ],
        quiz: [
          { question: "'Múa rối nước' đặc trưng ở đâu?", questionEn: "Where is it from?", options: ["Huế", "Hà Nội", "Sài Gòn", "Đà Nẵng"], answer: 1, explanation: "Đặc trưng Hà Nội.", explanationEn: "Hanoi specialty." },
          { question: "'Gốm sứ' là gì?", questionEn: "What is 'gốm sứ'?", options: ["Painting", "Ceramics", "Embroidery", "Sculpture"], answer: 1, explanation: "'Gốm sứ' = ceramics/pottery.", explanationEn: "'Gốm sứ' = ceramics." },
        ],
      },
      {
        id: "vn-vocab-martial-arts", title: "Võ thuật & Trò chơi dân gian", titleEn: "Martial Arts & Folk Games", level: "intermediate",
        theory: `## Võ thuật VN\n\n- **Vovinam** – võ thuật Việt Nam\n- **võ Bình Định** – Binh Dinh martial arts\n\n## Trò chơi dân gian:\n- **kéo co** – tug of war | **nhảy dây** – jump rope\n- **đá cầu** – shuttlecock kicking | **ô ăn quan** – mancala\n- **bịt mắt bắt dê** – blind man's buff`,
        theoryEn: `## Martial Arts & Folk Games\n\nVovinam, Binh Dinh martial arts, and traditional folk games.`,
        vocabulary: [
          { word: "Vovinam", meaning: "võ thuật VN", meaningEn: "Vietnamese martial art", example: "Vovinam nổi tiếng thế giới.", exampleEn: "Vovinam is world-famous.", partOfSpeech: "noun" },
          { word: "kéo co", meaning: "trò chơi kéo dây", meaningEn: "tug of war", example: "Chơi kéo co ngày hội.", exampleEn: "Tug of war at festivals.", partOfSpeech: "noun" },
          { word: "đá cầu", meaning: "đá con cầu bằng chân", meaningEn: "shuttlecock kicking", example: "Đá cầu rất vui.", exampleEn: "Shuttlecock kicking is fun.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "Vovinam là gì?", questionEn: "What is Vovinam?", options: ["Dance", "Vietnamese martial art", "Game", "Sport"], answer: 1, explanation: "Võ thuật Việt Nam.", explanationEn: "Vietnamese martial art." },
          { question: "'Đá cầu' là trò chơi gì?", questionEn: "What game is 'đá cầu'?", options: ["Tug of war", "Shuttlecock kicking", "Jump rope", "Chess"], answer: 1, explanation: "'Đá cầu' = shuttlecock kicking.", explanationEn: "'Đá cầu' = shuttlecock kicking." },
        ],
      },
      {
        id: "vn-vocab-social", title: "Phong tục & Xã hội", titleEn: "Customs & Society", level: "intermediate",
        theory: `## Phong tục xã hội\n\n- **cưới hỏi** – wedding | **tang lễ** – funeral\n- **giỗ** – death anniversary | **lễ hội** – festival\n- **kính trọng người lớn** – respect elders\n- **mời cơm** – invite to meal | **biếu quà** – give gifts`,
        theoryEn: `## Social Customs\n\nWedding, funeral, death anniversary, respecting elders.`,
        vocabulary: [
          { word: "cưới hỏi", meaning: "lễ kết hôn", meaningEn: "wedding ceremony", example: "Đám cưới rất vui.", exampleEn: "Wedding is joyful.", partOfSpeech: "noun" },
          { word: "giỗ", meaning: "ngày tưởng nhớ người mất", meaningEn: "death anniversary", example: "Ngày giỗ ông.", exampleEn: "Grandfather's death anniversary.", partOfSpeech: "noun" },
          { word: "biếu", meaning: "tặng (kính trọng)", meaningEn: "to give (respectful)", example: "Biếu quà cho thầy.", exampleEn: "Give a gift to teacher.", partOfSpeech: "verb" },
        ],
        quiz: [
          { question: "'Giỗ' là gì?", questionEn: "What is 'giỗ'?", options: ["Birthday", "Death anniversary", "Wedding", "Festival"], answer: 1, explanation: "Ngày tưởng nhớ người mất.", explanationEn: "Death anniversary." },
          { question: "'Biếu' khác 'tặng' như thế nào?", questionEn: "How is 'biếu' different from 'tặng'?", options: ["Same meaning", "More respectful", "Less formal", "Only for children"], answer: 1, explanation: "'Biếu' mang tính kính trọng hơn.", explanationEn: "'Biếu' is more respectful than 'tặng'." },
        ],
      },
      {
        id: "vn-vocab-slang", title: "Tiếng lóng & Từ mới", titleEn: "Slang & New Words", level: "advanced",
        theory: `## Tiếng lóng VN\n\n- **chill** – thư giãn (borrowed from English)\n- **flexing / flex** – khoe khoang\n- **sốc** – shocked | **ghê** – amazing/scary\n- **ngầu** – cool | **đỉnh** – peak/awesome\n- **crush** – người thích | **ship** – ủng hộ cặp đôi\n- **ẩn dụ mới**: "cạn lời" = speechless, "toang" = ruined`,
        theoryEn: `## Vietnamese Slang & New Words\n\nModern slang influenced by English and internet culture.`,
        vocabulary: [
          { word: "đỉnh", meaning: "rất giỏi, tuyệt vời", meaningEn: "peak / awesome", example: "Bài hát này đỉnh!", exampleEn: "This song is awesome!", partOfSpeech: "adjective" },
          { word: "toang", meaning: "hỏng, thất bại", meaningEn: "ruined / failed", example: "Toang rồi!", exampleEn: "It's ruined!", partOfSpeech: "adjective" },
          { word: "cạn lời", meaning: "không biết nói gì", meaningEn: "speechless", example: "Cạn lời luôn.", exampleEn: "I'm speechless.", partOfSpeech: "phrase" },
        ],
        quiz: [
          { question: "'Toang' nghĩa gì?", questionEn: "What does 'toang' mean?", options: ["Great", "Ruined", "Happy", "Tired"], answer: 1, explanation: "Toang = hỏng, thất bại.", explanationEn: "Ruined / failed." },
          { question: "'Đỉnh' trong tiếng lóng nghĩa gì?", questionEn: "What does 'đỉnh' mean in slang?", options: ["Mountain top", "Awesome", "Boring", "Old"], answer: 1, explanation: "'Đỉnh' = awesome/peak.", explanationEn: "'Đỉnh' = awesome." },
        ],
      },
    ],
  },
];
