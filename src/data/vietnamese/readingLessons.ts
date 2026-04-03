// Vietnamese reading comprehension lessons — 20 immersive lessons across 2 modules
// Each lesson: 300-500 word narrative, 10+ vocab, 5+ quiz, teacher insight
import type { VietnameseModule } from "./types";

export const readingModules: VietnameseModule[] = [
  {
    id: "vn-reading",
    title: "Đọc hiểu cơ bản",
    titleEn: "Basic Reading",
    icon: "📚",
    color: "from-blue-500 to-indigo-500",
    description: "Khám phá Việt Nam qua những bài đọc truyền cảm",
    descriptionEn: "Discover Vietnam through evocative reading passages",
    category: "reading",
    lessons: [
      {
        id: "vn-read-1",
        title: "Hà Nội – Một ngày ở thủ đô ngàn năm",
        titleEn: "Hanoi – A Day in the Thousand-Year Capital",
        level: "intermediate",
        teacherInsight: "Bạn có biết? Phố cổ Hà Nội nguyên gốc được quy hoạch theo 36 phường nghề chuyên biệt – mỗi con phố mang tên một nghề thủ công: Hàng Đào (vải nhuộm), Hàng Bạc (vàng bạc), Hàng Mã (giấy lễ).",
        teacherInsightEn: "Did you know? Hanoi's Old Quarter was originally designed around 36 specialized guilds – each street named after a craft: Hang Dao (silk dyeing), Hang Bac (silverwork), Hang Ma (ritual paper).",
        theory: `## Một ngày ở Hà Nội 🏛️

Sáng sớm, khi những tia nắng đầu tiên len lỏi qua tán sấu cổ thụ trên phố Phan Đình Phùng, Hà Nội thức dậy trong hương cốm Vòng thoảng nhẹ và tiếng rao hàng quen thuộc. Thủ đô ngàn năm văn hiến không đón chào du khách bằng sự phô trương, mà bằng những khoảnh khắc giản dị đầy mê hoặc.

Bước chân vào phố cổ, bạn sẽ lạc vào một mê cung của 36 phố phường, nơi mỗi con phố kể một câu chuyện riêng. Hàng Đào rực rỡ vải lụa, Hàng Bạc lấp lánh trang sức, Hàng Mã rợp trời đồ chơi Trung thu. Tiếng rao "Ai bánh cuốn nóng đây!" vang vọng trong con hẻm nhỏ, quyện với mùi phở bò nồng nàn từ những quán ăn gia truyền ba đời.

Buổi trưa, Hồ Gươm hiện ra như một bức tranh thủy mặc giữa lòng thành phố. Tháp Rùa đứng lặng lẽ giữa mặt nước phẳng lì xanh ngọc, gợi nhớ truyền thuyết vua Lê Lợi trả gươm thần cho rùa vàng. Đền Ngọc Sơn nối với bờ bằng cầu Thê Húc cong cong sơn đỏ son – "cầu đậu ánh sáng ban mai."

Chiều xuống, bạn hãy lang thang đến Văn Miếu – Quốc Tử Giám, trường đại học đầu tiên của Việt Nam, nơi 82 bia Tiến sĩ khắc trên lưng rùa đá kể chuyện hơn 700 năm khoa cử. Không gian ở đây trầm mặc và tĩnh lặng, khác hẳn sự nhộn nhịp ngoài phố.

Khi hoàng hôn buông xuống, hãy dừng chân bên hồ Tây, ngắm ánh nắng cuối ngày nhuộm vàng mặt nước mênh mông. Tiếng chuông chùa Trấn Quốc – ngôi chùa 1.500 tuổi – ngân vang trong gió, đưa tâm hồn trở về với sự thanh tịnh ngàn xưa.

Đêm Hà Nội, phố đi bộ quanh Hồ Gươm bừng sáng. Nghệ sĩ đường phố chơi guitar, trẻ em chạy nhảy, và những cặp đôi dạo bước dưới hàng cây lấp lánh đèn trang trí. Hà Nội không chỉ là một thành phố – mà là một bài thơ dài, mỗi khoảnh khắc là một vần thơ đẹp.`,
        theoryEn: `## A Day in Hanoi 🏛️

In the early morning, as the first sunrays thread through the ancient parasol trees on Phan Dinh Phung Street, Hanoi awakens to the delicate fragrance of green rice flakes and familiar street vendor calls. The thousand-year capital greets visitors not with grandeur, but with simple, enchanting moments.

Stepping into the Old Quarter, you enter a labyrinth of 36 guild streets, each telling its own story. Hang Dao blazes with silk fabrics, Hang Bac glitters with jewelry, Hang Ma overflows with Mid-Autumn toys. The cry "Fresh rice rolls here!" echoes through narrow alleys, mingling with the rich aroma of beef pho from three-generation family shops.

At noon, Hoan Kiem Lake appears like a watercolor painting in the heart of the city. Turtle Tower stands silently amid jade-green still waters, evoking the legend of King Le Loi returning his divine sword to the golden turtle. Ngoc Son Temple connects to shore via the crimson Huc Bridge – "the bridge where morning light rests."

In the afternoon, wander to the Temple of Literature – Vietnam's first university, where 82 doctoral steles carved on stone turtles tell over 700 years of scholarly tradition. The atmosphere here is contemplative and hushed, a world apart from the bustling streets.

As dusk falls, pause by West Lake to watch the last sunlight gild the vast water surface. The bell of Tran Quoc Pagoda – a 1,500-year-old temple – resonates in the wind, carrying the soul back to ancient serenity.

At night, the pedestrian streets around Hoan Kiem Lake light up. Street musicians play guitar, children run and play, and couples stroll beneath trees sparkling with decorative lights. Hanoi is not merely a city – it is a long poem, each moment a beautiful verse.`,
        vocabulary: [
          { word: "cổ thụ", meaning: "cây lâu năm, rất lớn", meaningEn: "ancient tree", example: "Hàng sấu cổ thụ trên phố Phan Đình Phùng.", exampleEn: "Ancient parasol trees on Phan Dinh Phung Street.", partOfSpeech: "noun" },
          { word: "văn hiến", meaning: "truyền thống văn hóa lâu đời", meaningEn: "cultural heritage / civilization", example: "Thủ đô ngàn năm văn hiến.", exampleEn: "The thousand-year capital of civilization.", partOfSpeech: "noun" },
          { word: "mê hoặc", meaning: "làm say đắm, cuốn hút", meaningEn: "enchanting / captivating", example: "Những khoảnh khắc đầy mê hoặc.", exampleEn: "Captivating moments.", partOfSpeech: "adjective" },
          { word: "gia truyền", meaning: "được truyền từ đời này sang đời khác", meaningEn: "family heritage / generational", example: "Quán phở gia truyền ba đời.", exampleEn: "A three-generation family pho shop.", partOfSpeech: "adjective" },
          { word: "thủy mặc", meaning: "tranh vẽ bằng mực tàu", meaningEn: "ink wash painting", example: "Hồ Gươm như một bức tranh thủy mặc.", exampleEn: "Hoan Kiem Lake like an ink wash painting.", partOfSpeech: "noun" },
          { word: "trầm mặc", meaning: "yên tĩnh, sâu lắng", meaningEn: "contemplative / solemn", example: "Không gian trầm mặc của Văn Miếu.", exampleEn: "The contemplative atmosphere of the Temple of Literature.", partOfSpeech: "adjective" },
          { word: "nhộn nhịp", meaning: "đông đúc, sôi động", meaningEn: "bustling / lively", example: "Sự nhộn nhịp ngoài phố.", exampleEn: "The bustling streets.", partOfSpeech: "adjective" },
          { word: "hoàng hôn", meaning: "lúc mặt trời lặn", meaningEn: "dusk / sunset", example: "Hoàng hôn buông xuống hồ Tây.", exampleEn: "Dusk falls over West Lake.", partOfSpeech: "noun" },
          { word: "thanh tịnh", meaning: "yên bình, trong sạch", meaningEn: "serene / peaceful", example: "Sự thanh tịnh ngàn xưa.", exampleEn: "Ancient serenity.", partOfSpeech: "adjective" },
          { word: "khoa cử", meaning: "hệ thống thi tuyển quan lại ngày xưa", meaningEn: "imperial examination system", example: "Hơn 700 năm khoa cử.", exampleEn: "Over 700 years of imperial examinations.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "Phố cổ Hà Nội có bao nhiêu phố phường?", questionEn: "How many guild streets in Hanoi's Old Quarter?", options: ["18 phố", "36 phố", "54 phố", "72 phố"], answer: 1, explanation: "Phố cổ có 36 phố phường, mỗi phố mang tên một nghề thủ công.", explanationEn: "The Old Quarter has 36 guild streets, each named after a craft." },
          { question: "Cầu Thê Húc có ý nghĩa gì?", questionEn: "What does 'The Huc Bridge' mean?", options: ["Cầu ánh trăng", "Cầu đậu ánh sáng ban mai", "Cầu rồng bay", "Cầu mây"], answer: 1, explanation: "'Thê Húc' nghĩa là 'nơi đậu ánh sáng ban mai.'", explanationEn: "'The Huc' means 'where morning light rests.'" },
          { question: "Văn Miếu – Quốc Tử Giám là gì?", questionEn: "What is the Temple of Literature?", options: ["Đền thờ vua", "Trường đại học đầu tiên", "Chùa cổ", "Bảo tàng"], answer: 1, explanation: "Đây là trường đại học đầu tiên của Việt Nam.", explanationEn: "Vietnam's first university." },
          { question: "Tìm từ đồng nghĩa với 'nhộn nhịp' trong bài:", questionEn: "Find a synonym for 'nhộn nhịp' in the text:", options: ["trầm mặc", "sầm uất", "thanh tịnh", "giản dị"], answer: 1, explanation: "'Sầm uất' và 'nhộn nhịp' đều có nghĩa là đông đúc, sôi động.", explanationEn: "'Sầm uất' and 'nhộn nhịp' both mean bustling." },
          { question: "Tác giả muốn truyền tải thông điệp gì qua bài viết?", questionEn: "What message does the author convey?", options: ["Hà Nội quá đông đúc", "Hà Nội đẹp ở những điều giản dị", "Hà Nội cần hiện đại hóa", "Hà Nội chỉ dành cho du khách"], answer: 1, explanation: "Bài viết nhấn mạnh vẻ đẹp giản dị, thơ mộng của Hà Nội qua từng khoảnh khắc.", explanationEn: "The text emphasizes Hanoi's simple, poetic beauty through each moment." },
          { question: "Chùa Trấn Quốc có tuổi đời bao nhiêu năm?", questionEn: "How old is Tran Quoc Pagoda?", options: ["500 năm", "1.000 năm", "1.500 năm", "2.000 năm"], answer: 2, explanation: "Chùa Trấn Quốc có lịch sử khoảng 1.500 năm.", explanationEn: "Tran Quoc Pagoda is about 1,500 years old." },
        ],
      },
      {
        id: "vn-read-2",
        title: "Sài Gòn – Hòn ngọc Viễn Đông",
        titleEn: "Saigon – Pearl of the Far East",
        level: "intermediate",
        teacherInsight: "Người Sài Gòn thường nói 'ăn gì cũng được' nhưng lại rất kỹ trong việc chọn quán. Nếu bạn hỏi 'Quán nào ngon?', họ sẽ dẫn bạn đến một xe đẩy vỉa hè – và đó thường là quán ngon nhất!",
        teacherInsightEn: "Saigon people often say 'anything is fine' but are very picky about choosing restaurants. If you ask 'Where's good food?', they'll lead you to a sidewalk cart – and it's usually the best!",
        theory: `## Sài Gòn – Thành phố không bao giờ ngủ 🌆

Nếu Hà Nội là bài thơ trầm lắng, thì Sài Gòn là bản nhạc rock sôi động không ngừng nghỉ. Thành phố mang tên Bác – hay với cái tên thân thương "Sài Gòn" mà người dân vẫn gọi – là trái tim kinh tế của cả nước, nơi mà nhịp sống không bao giờ chậm lại.

Buổi sáng ở Sài Gòn bắt đầu từ 5 giờ, khi những quán cà phê bệt vỉa hè đã bày sẵn ghế nhựa. Người Sài Gòn ngồi thấp, nhâm nhi ly cà phê sữa đá – thứ "nhiên liệu" không thể thiếu mỗi ngày. Cà phê ở đây không chỉ là thức uống, mà là một nghi thức: chờ từng giọt cà phê phin nhỏ xuống, ngắm dòng xe cộ tấp nập lướt qua.

Giữa trưa, Chợ Bến Thành trở thành một vũ trụ thu nhỏ của ẩm thực Việt. Hủ tiếu, cơm tấm, bánh tráng trộn, chè – tất cả chen chúc trong tiếng ồn ào náo nhiệt. Du khách phương Tây lóng ngóng cầm đũa lần đầu, trong khi bà bán hàng thoăn thoắt múc từng tô phở nóng bỏng tay với sự chính xác của một nghệ sĩ.

Chiều tà, đường Nguyễn Huệ – phố đi bộ trung tâm – biến thành sân khấu ngoài trời. Nhà thờ Đức Bà, Bưu điện Thành phố với kiến trúc Pháp cổ điển đứng sừng sững bên cạnh những tòa nhà chọc trời bằng kính hiện đại – một sự tương phản kỳ lạ mà hài hòa. Bitexco Tower – tòa tháp hình búp sen – vươn lên trời như biểu tượng của Sài Gòn đương đại.

Đêm xuống, Sài Gòn thực sự thức dậy. Bùi Viện – phố Tây ba lô – rộn ràng âm nhạc và ánh đèn neon. Những gánh hàng rong len lỏi giữa dòng người quốc tế: ốc luộc, xiên nướng, kem dừa. Nhưng nếu muốn tìm "linh hồn" Sài Gòn thật sự, hãy lạc vào một con hẻm nhỏ – nơi hàng xóm kê bàn ăn cơm chung, trẻ con chơi đùa, và bà cụ ngồi quạt nan kể chuyện xưa.

Sài Gòn là thành phố của những tương phản: truyền thống và hiện đại, ồn ào và thân tình, hối hả và lãng mạn. Dù bạn ở đây một ngày hay mười năm, Sài Gòn luôn có điều bất ngờ chờ đón.`,
        theoryEn: `## Saigon – The City That Never Sleeps 🌆

If Hanoi is a contemplative poem, then Saigon is an unstoppable rock anthem. The city officially named after Uncle Ho – or by its beloved name "Saigon" as locals still call it – is the economic heart of the nation, where the pace of life never slows.

Morning begins at 5 AM, when sidewalk cafés have already set out plastic chairs. Saigonese sit low, savoring iced milk coffee – the daily "fuel" no one can skip. Coffee here isn't just a drink but a ritual: waiting for each drip from the phin filter, watching the bustling traffic flow past.

At noon, Ben Thanh Market becomes a miniature universe of Vietnamese cuisine. Hu tieu, com tam, banh trang tron, che – everything crowds together amid lively noise. Western tourists fumble with chopsticks for the first time, while vendors deftly ladle steaming pho with the precision of artists.

In the afternoon, Nguyen Hue Street – the central pedestrian boulevard – transforms into an outdoor stage. Notre-Dame Cathedral and the Central Post Office with their classical French architecture stand proudly beside modern glass skyscrapers – a strange yet harmonious contrast. Bitexco Tower – shaped like a lotus bud – reaches skyward as a symbol of contemporary Saigon.

At night, Saigon truly awakens. Bui Vien – the backpacker street – buzzes with music and neon lights. Street food carts weave through international crowds: boiled snails, grilled skewers, coconut ice cream. But to find Saigon's true "soul," wander into a small alley – where neighbors share dinner tables, children play, and elderly women fan themselves while telling old stories.

Saigon is a city of contrasts: traditional and modern, noisy and intimate, hurried and romantic. Whether you stay one day or ten years, Saigon always has surprises waiting.`,
        vocabulary: [
          { word: "sầm uất", meaning: "đông đúc, nhộn nhịp", meaningEn: "bustling / thriving", example: "Khu trung tâm sầm uất nhất thành phố.", exampleEn: "The most bustling downtown area.", partOfSpeech: "adjective" },
          { word: "tấp nập", meaning: "đông đúc người và xe", meaningEn: "busy / crowded with traffic", example: "Dòng xe cộ tấp nập.", exampleEn: "Busy traffic flow.", partOfSpeech: "adjective" },
          { word: "nghi thức", meaning: "cách thức trang trọng", meaningEn: "ritual / ceremony", example: "Cà phê là một nghi thức buổi sáng.", exampleEn: "Coffee is a morning ritual.", partOfSpeech: "noun" },
          { word: "náo nhiệt", meaning: "sôi động, ồn ào vui vẻ", meaningEn: "lively / bustling", example: "Chợ Bến Thành náo nhiệt.", exampleEn: "Ben Thanh Market is lively.", partOfSpeech: "adjective" },
          { word: "tương phản", meaning: "sự khác biệt rõ rệt", meaningEn: "contrast", example: "Sự tương phản giữa cổ và hiện đại.", exampleEn: "The contrast between old and modern.", partOfSpeech: "noun" },
          { word: "sừng sững", meaning: "cao lớn, vững chãi", meaningEn: "towering / imposing", example: "Nhà thờ đứng sừng sững.", exampleEn: "The cathedral stands imposingly.", partOfSpeech: "adjective" },
          { word: "đương đại", meaning: "thuộc thời nay", meaningEn: "contemporary / modern", example: "Sài Gòn đương đại.", exampleEn: "Contemporary Saigon.", partOfSpeech: "adjective" },
          { word: "hàng rong", meaning: "người bán hàng di động", meaningEn: "street vendor / hawker", example: "Gánh hàng rong len lỏi.", exampleEn: "Street food carts weave through.", partOfSpeech: "noun" },
          { word: "hối hả", meaning: "gấp gáp, vội vàng", meaningEn: "hurried / rushed", example: "Nhịp sống hối hả.", exampleEn: "A hurried pace of life.", partOfSpeech: "adjective" },
          { word: "ẩm thực", meaning: "nghệ thuật nấu ăn", meaningEn: "cuisine / gastronomy", example: "Ẩm thực Sài Gòn đa dạng.", exampleEn: "Saigon cuisine is diverse.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "Tác giả so sánh Hà Nội và Sài Gòn như thế nào?", questionEn: "How does the author compare Hanoi and Saigon?", options: ["Thơ và nhạc rock", "Núi và biển", "Mưa và nắng", "Đêm và ngày"], answer: 0, explanation: "Hà Nội được ví như 'bài thơ trầm lắng', Sài Gòn là 'bản nhạc rock sôi động.'", explanationEn: "Hanoi is compared to a 'contemplative poem,' Saigon to a 'rock anthem.'" },
          { question: "Cà phê phin là gì?", questionEn: "What is phin coffee?", options: ["Cà phê pha máy", "Cà phê nhỏ giọt qua bộ lọc kim loại", "Cà phê hòa tan", "Cà phê pha bình"], answer: 1, explanation: "Cà phê phin là kiểu pha nhỏ giọt qua bộ lọc kim loại truyền thống.", explanationEn: "Phin coffee drips through a traditional metal filter." },
          { question: "Bitexco Tower có hình dáng gì?", questionEn: "What shape is Bitexco Tower?", options: ["Hình tròn", "Hình búp sen", "Hình vuông", "Hình ngôi sao"], answer: 1, explanation: "Bitexco Tower được thiết kế theo hình búp sen.", explanationEn: "Bitexco Tower is designed like a lotus bud." },
          { question: "Từ 'tương phản' trong bài có nghĩa gần nhất với:", questionEn: "The word 'tương phản' is closest in meaning to:", options: ["giống nhau", "khác biệt rõ rệt", "hòa hợp", "tẻ nhạt"], answer: 1, explanation: "'Tương phản' nghĩa là sự khác biệt rõ rệt giữa hai thứ.", explanationEn: "'Tương phản' means a clear difference between two things." },
          { question: "Để tìm 'linh hồn' Sài Gòn, tác giả khuyên đi đâu?", questionEn: "Where does the author suggest to find Saigon's 'soul'?", options: ["Phố đi bộ", "Tòa nhà cao tầng", "Con hẻm nhỏ", "Sân bay"], answer: 2, explanation: "Tác giả nói linh hồn Sài Gòn ở trong những con hẻm nhỏ.", explanationEn: "The author says Saigon's soul is in the small alleys." },
        ],
      },
      {
        id: "vn-read-3",
        title: "Huế – Kinh đô trầm mặc bên dòng Hương",
        titleEn: "Hue – The Contemplative Capital by the Perfume River",
        level: "intermediate",
        teacherInsight: "Huế nổi tiếng với giọng nói nhẹ nhàng và ngọt ngào nhất Việt Nam. Nếu bạn nghe người Huế nói 'Mô rứa hè?' – đó là 'Ở đâu vậy?' trong tiếng phổ thông!",
        teacherInsightEn: "Hue is famous for the softest, sweetest accent in Vietnam. If you hear a Hue person say 'Mô rứa hè?' – that's 'Where is it?' in standard Vietnamese!",
        theory: `## Huế – Kinh đô trầm mặc 🏯

Có một nơi ở Việt Nam mà thời gian dường như chảy chậm hơn. Đó là Huế – cố đô cuối cùng của các triều đại phong kiến, nơi sông Hương lặng lẽ ôm lấy thành phố bằng đôi tay dịu dàng.

Huế của buổi sáng là Đại Nội – quần thể hoàng cung rộng hơn 500 hecta mà nhà Nguyễn xây dựng từ năm 1802. Bước qua Ngọ Môn – cổng chính uy nghi với năm lối vào – bạn bước vào một thế giới khác. Điện Thái Hòa với mái ngói hoàng lưu ly phản chiếu ánh mặt trời, nơi các vị vua từng ngự triều giữa hàng trăm quan thần. Cửu Đỉnh – chín chiếc đỉnh đồng khắc hình sông núi, cây cỏ – đứng trang nghiêm như chín quyển bách khoa toàn thư bằng đồng.

Buổi trưa, rời Đại Nội, bạn sẽ tìm thấy Huế ở những quán cơm bình dân. Cơm hến – món ăn từ con hến nhỏ xíu trên sông Hương – mang hương vị đặc trưng không nơi nào có. Bún bò Huế cay nồng ớt sa tế, bánh bèo trắng ngần rắc tôm chấy vàng – ẩm thực Huế là sự kết hợp tinh tế giữa cay, mặn, ngọt, chua.

Chiều, đi dọc bờ nam sông Hương, các lăng tẩm hoàng gia ẩn mình trong rừng thông. Lăng Tự Đức – được xây khi vua còn sống – như một khu vườn thơ mộng với hồ sen, đình tạ. Lăng Khải Định lại hoàn toàn khác: pha trộn kiến trúc Đông-Tây với mosaic sặc sỡ từ sành sứ và thủy tinh vỡ.

Đêm Huế thuộc về sông Hương. Ngồi trên thuyền rồng, nghe ca Huế giữa dòng nước yên tĩnh – giọng ca não nùng kể về tình yêu dang dở, về quê hương xa cách – bạn sẽ hiểu vì sao Huế được gọi là "kinh đô của nỗi buồn đẹp."`,
        theoryEn: `## Hue – The Contemplative Capital 🏯

There is a place in Vietnam where time seems to flow slower. That is Hue – the last capital of feudal dynasties, where the Perfume River silently embraces the city with gentle arms.

Morning Hue is the Imperial Citadel – a royal palace complex spanning over 500 hectares built by the Nguyen Dynasty from 1802. Passing through the Ngo Mon Gate – a majestic entrance with five passages – you step into another world. Thai Hoa Palace with its imperial yellow glazed-tile roof reflects sunlight, where kings once held court before hundreds of mandarins. The Nine Dynastic Urns – nine bronze cauldrons engraved with mountains, rivers, and flora – stand solemnly like nine bronze encyclopedias.

At noon, leaving the Citadel, you'll find Hue in humble food stalls. Com hen – a dish of tiny clams from the Perfume River – carries a flavor found nowhere else. Bun bo Hue spicy with sate chili, banh beo white as snow sprinkled with golden dried shrimp – Hue cuisine is a delicate balance of spicy, salty, sweet, and sour.

In the afternoon, along the Perfume River's south bank, royal tombs hide among pine forests. Tu Duc's Tomb – built while the king was still alive – resembles a poetic garden with lotus ponds and pavilions. Khai Dinh's Tomb is completely different: blending East-West architecture with colorful mosaics from broken porcelain and glass.

Hue nights belong to the Perfume River. Sitting on a dragon boat, listening to Hue folk songs amid quiet waters – mournful voices telling of unfinished love and distant homelands – you'll understand why Hue is called "the capital of beautiful sadness."`,
        vocabulary: [
          { word: "quần thể", meaning: "tập hợp nhiều công trình", meaningEn: "complex / ensemble", example: "Quần thể di tích Huế.", exampleEn: "Hue heritage complex.", partOfSpeech: "noun" },
          { word: "uy nghi", meaning: "trang trọng, đồ sộ", meaningEn: "majestic / imposing", example: "Cổng Ngọ Môn uy nghi.", exampleEn: "The majestic Ngo Mon Gate.", partOfSpeech: "adjective" },
          { word: "hoàng lưu ly", meaning: "màu vàng dùng cho vua", meaningEn: "imperial yellow glaze", example: "Mái ngói hoàng lưu ly.", exampleEn: "Imperial yellow glazed tiles.", partOfSpeech: "noun" },
          { word: "ngự triều", meaning: "vua họp bàn việc nước", meaningEn: "hold court / preside over court", example: "Nơi vua ngự triều.", exampleEn: "Where the king held court.", partOfSpeech: "verb" },
          { word: "trang nghiêm", meaning: "nghiêm trang, trịnh trọng", meaningEn: "solemn / dignified", example: "Cửu Đỉnh đứng trang nghiêm.", exampleEn: "The Nine Urns stand solemnly.", partOfSpeech: "adjective" },
          { word: "tinh tế", meaning: "khéo léo, tỉ mỉ", meaningEn: "delicate / refined", example: "Ẩm thực Huế tinh tế.", exampleEn: "Hue cuisine is refined.", partOfSpeech: "adjective" },
          { word: "lăng tẩm", meaning: "nơi chôn vua và hoàng gia", meaningEn: "royal tomb / mausoleum", example: "Lăng tẩm ẩn trong rừng thông.", exampleEn: "Royal tombs hidden among pine forests.", partOfSpeech: "noun" },
          { word: "thơ mộng", meaning: "đẹp như trong mơ", meaningEn: "poetic / dreamy", example: "Khu vườn thơ mộng.", exampleEn: "A poetic garden.", partOfSpeech: "adjective" },
          { word: "não nùng", meaning: "buồn thấm thía", meaningEn: "mournful / plaintive", example: "Giọng ca não nùng.", exampleEn: "A mournful singing voice.", partOfSpeech: "adjective" },
          { word: "phong kiến", meaning: "chế độ vua quan cai trị", meaningEn: "feudal", example: "Triều đại phong kiến.", exampleEn: "Feudal dynasty.", partOfSpeech: "adjective" },
        ],
        quiz: [
          { question: "Đại Nội Huế rộng bao nhiêu?", questionEn: "How large is Hue's Imperial Citadel?", options: ["100 hecta", "300 hecta", "Hơn 500 hecta", "1000 hecta"], answer: 2, explanation: "Quần thể hoàng cung rộng hơn 500 hecta.", explanationEn: "The royal complex spans over 500 hectares." },
          { question: "Ngọ Môn có bao nhiêu lối vào?", questionEn: "How many passages does Ngo Mon Gate have?", options: ["3", "4", "5", "7"], answer: 2, explanation: "Ngọ Môn có năm lối vào.", explanationEn: "Ngo Mon has five passages." },
          { question: "Cơm hến là món ăn từ nguyên liệu nào?", questionEn: "What ingredient is com hen made from?", options: ["Tôm sông", "Con hến nhỏ", "Cá lóc", "Ốc bưu"], answer: 1, explanation: "Cơm hến làm từ con hến nhỏ trên sông Hương.", explanationEn: "Com hen uses tiny clams from the Perfume River." },
          { question: "Lăng Khải Định đặc biệt ở điểm nào?", questionEn: "What makes Khai Dinh's Tomb unique?", options: ["Rất nhỏ", "Pha trộn kiến trúc Đông-Tây", "Nằm dưới nước", "Không có mái"], answer: 1, explanation: "Lăng Khải Định pha trộn kiến trúc Đông-Tây với mosaic sặc sỡ.", explanationEn: "It blends East-West architecture with colorful mosaics." },
          { question: "Tại sao Huế được gọi là 'kinh đô của nỗi buồn đẹp'?", questionEn: "Why is Hue called 'the capital of beautiful sadness'?", options: ["Vì thời tiết xấu", "Vì vẻ đẹp trầm lắng, hoài cổ", "Vì kinh tế kém", "Vì ít người ở"], answer: 1, explanation: "Huế đẹp nhưng mang nét trầm mặc, hoài cổ đặc trưng.", explanationEn: "Hue is beautiful but carries a distinctive contemplative, nostalgic character." },
        ],
      },
      {
        id: "vn-read-4",
        title: "Đồng bằng sông Cửu Long – Miền Tây sông nước",
        titleEn: "Mekong Delta – The Waterworld of the South",
        level: "intermediate",
        teacherInsight: "Ở chợ nổi, người bán treo sản phẩm lên cây sào dài – gọi là 'cây bẹo'. Muốn biết thuyền bán gì, chỉ cần nhìn lên cây bẹo!",
        teacherInsightEn: "At floating markets, vendors hang their products on a tall pole called 'cây bẹo'. Want to know what a boat sells? Just look up at the pole!",
        theory: `## Miền Tây – Nơi cuộc sống trôi trên mặt nước 🌾

Miền Tây Nam Bộ – hay đồng bằng sông Cửu Long – là nơi dòng Mekong hùng vĩ chia thành chín nhánh trước khi đổ ra biển, tạo nên vùng châu thổ phì nhiêu nhất Đông Nam Á. Nơi đây, cuộc sống không diễn ra trên đất liền mà trôi nhẹ nhàng trên mặt nước.

Sáng sớm, khi sương mù còn phủ kín mặt sông, chợ nổi Cái Răng đã nhộn nhịp. Hàng trăm ghe thuyền chở đầy trái cây xếp thành hàng: dưa hấu đỏ tươi, chôm chôm lông xù, xoài vàng ươm. Tiếng gọi mời vang vọng trên sông, người mua kẻ bán trao đổi hàng hóa ngay trên xuồng. Không cần cân, không cần túi – chỉ cần lòng tin và tiếng cười sảng khoái.

Đi sâu vào các kênh rạch nhỏ, bạn sẽ gặp "vương quốc trái cây." Vườn nhãn, vườn sầu riêng, vườn bưởi trĩu quả hai bên bờ. Chủ vườn hái tặng bạn một quả dừa tươi, dùng dao phay phạt ngang ngọt lịm. Cảm giác uống nước dừa ngay dưới gốc dừa, nghe chim hót, ngắm cánh đồng lúa mênh mông – đó là "thiên đường bình dị" mà người miền Tây vẫn tự hào.

Buổi chiều, ngồi trên cầu khỉ – cây cầu tre bắc qua kênh chỉ bằng vài thanh tre và dây kẽm – đòi hỏi sự cân bằng và bản lĩnh. Trẻ em miền Tây chạy qua cầu khỉ như đi trên đường bằng, khiến du khách vừa thán phục vừa hoảng sợ.

Đêm miền Tây, mọi người quây quần bên bếp lửa, nướng cá lóc cuốn lá sen, uống rượu đế tự nấu, và hát đờn ca tài tử – loại hình nghệ thuật đã được UNESCO vinh danh. Giọng hát mộc mạc, chân thành như chính con người nơi đây: hiền hậu, chất phác, và luôn mở rộng vòng tay.`,
        theoryEn: `## The Mekong Delta – Where Life Flows on Water 🌾

The Mekong Delta – where the mighty Mekong divides into nine branches before meeting the sea – creates Southeast Asia's most fertile floodplain. Here, life doesn't happen on solid ground but drifts gently on water.

At dawn, while fog still blankets the river, Cai Rang Floating Market bustles. Hundreds of boats piled with fruit line up: bright red watermelons, fuzzy rambutans, golden mangoes. Calls echo across the river as buyers and sellers exchange goods right on their boats. No scales needed, no bags – just trust and hearty laughter.

Deeper into the narrow canals, you'll discover a "fruit kingdom." Longan orchards, durian gardens, and pomelo groves hang heavy with fruit on both banks. Orchard owners pick a fresh coconut for you, slicing it open with a swift machete stroke. Drinking coconut water right beneath the coconut tree, listening to birdsong, gazing at endless rice paddies – this is the "simple paradise" that Westerners proudly treasure.

In the afternoon, walking across a monkey bridge – a bamboo bridge spanning a canal using just a few bamboo poles and wire – demands balance and courage. Delta children run across as if on flat ground, leaving tourists both amazed and terrified.

At night, everyone gathers around a fire, grilling snakehead fish wrapped in lotus leaves, sipping homemade rice wine, and singing Don Ca Tai Tu – a folk art form honored by UNESCO. The singing is rustic and sincere, just like the people here: gentle, honest, and always welcoming.`,
        vocabulary: [
          { word: "châu thổ", meaning: "vùng đất bồi ở cửa sông", meaningEn: "delta / alluvial plain", example: "Châu thổ sông Cửu Long phì nhiêu.", exampleEn: "The Mekong Delta is fertile.", partOfSpeech: "noun" },
          { word: "phì nhiêu", meaning: "đất tốt, màu mỡ", meaningEn: "fertile / rich (soil)", example: "Vùng đất phì nhiêu nhất.", exampleEn: "The most fertile land.", partOfSpeech: "adjective" },
          { word: "ghe thuyền", meaning: "phương tiện đi lại trên sông", meaningEn: "boats / vessels", example: "Hàng trăm ghe thuyền trên sông.", exampleEn: "Hundreds of boats on the river.", partOfSpeech: "noun" },
          { word: "sảng khoái", meaning: "vui vẻ, thoải mái", meaningEn: "hearty / jovial", example: "Tiếng cười sảng khoái.", exampleEn: "Hearty laughter.", partOfSpeech: "adjective" },
          { word: "kênh rạch", meaning: "đường nước nhỏ", meaningEn: "canals / waterways", example: "Kênh rạch chằng chịt.", exampleEn: "A network of canals.", partOfSpeech: "noun" },
          { word: "trĩu quả", meaning: "có nhiều quả, cành nặng trĩu", meaningEn: "heavy with fruit", example: "Vườn bưởi trĩu quả.", exampleEn: "Pomelo trees heavy with fruit.", partOfSpeech: "adjective" },
          { word: "bình dị", meaning: "giản dị, không cầu kỳ", meaningEn: "simple / humble", example: "Thiên đường bình dị.", exampleEn: "A simple paradise.", partOfSpeech: "adjective" },
          { word: "cầu khỉ", meaning: "cầu tre nhỏ bắc qua kênh", meaningEn: "monkey bridge (bamboo bridge)", example: "Chạy qua cầu khỉ.", exampleEn: "Running across the monkey bridge.", partOfSpeech: "noun" },
          { word: "chất phác", meaning: "thật thà, không giả dối", meaningEn: "honest / genuine", example: "Con người chất phác.", exampleEn: "Honest, genuine people.", partOfSpeech: "adjective" },
          { word: "đờn ca tài tử", meaning: "nghệ thuật âm nhạc dân gian Nam Bộ", meaningEn: "Southern amateur music (UNESCO heritage)", example: "Đờn ca tài tử UNESCO.", exampleEn: "Don Ca Tai Tu – UNESCO heritage.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "Sông Mekong chia thành bao nhiêu nhánh?", questionEn: "How many branches does the Mekong split into?", options: ["5 nhánh", "7 nhánh", "9 nhánh", "12 nhánh"], answer: 2, explanation: "Sông Mekong chia thành chín nhánh, vì thế gọi là 'Cửu Long' (chín con rồng).", explanationEn: "The Mekong splits into nine branches, hence 'Cuu Long' (nine dragons)." },
          { question: "'Cây bẹo' ở chợ nổi dùng để làm gì?", questionEn: "What is 'cây bẹo' used for at floating markets?", options: ["Chèo thuyền", "Treo sản phẩm để quảng cáo", "Câu cá", "Trang trí"], answer: 1, explanation: "Cây bẹo là cây sào treo sản phẩm để người mua biết thuyền bán gì.", explanationEn: "Cây bẹo is a pole displaying products so buyers know what the boat sells." },
          { question: "Đờn ca tài tử có ý nghĩa gì?", questionEn: "What is Don Ca Tai Tu?", options: ["Nhạc cung đình", "Nghệ thuật âm nhạc dân gian Nam Bộ", "Nhạc pop", "Ca nhạc hiện đại"], answer: 1, explanation: "Đờn ca tài tử là nghệ thuật âm nhạc dân gian Nam Bộ, UNESCO vinh danh.", explanationEn: "Don Ca Tai Tu is a Southern folk music art, UNESCO-recognized." },
          { question: "Từ 'phì nhiêu' có nghĩa gần nhất với:", questionEn: "The word 'phì nhiêu' is closest to:", options: ["Khô cằn", "Màu mỡ", "Rộng lớn", "Bằng phẳng"], answer: 1, explanation: "'Phì nhiêu' nghĩa là đất tốt, màu mỡ.", explanationEn: "'Phì nhiêu' means fertile, rich soil." },
          { question: "Tại sao tác giả gọi miền Tây là 'thiên đường bình dị'?", questionEn: "Why does the author call the Delta a 'simple paradise'?", options: ["Vì có nhiều resort", "Vì cuộc sống giản dị, gần gũi thiên nhiên", "Vì giàu có", "Vì công nghệ cao"], answer: 1, explanation: "Miền Tây đẹp ở sự giản dị, gần gũi thiên nhiên và con người chân thật.", explanationEn: "The Delta is beautiful in its simplicity, closeness to nature, and genuine people." },
        ],
      },
      {
        id: "vn-read-5",
        title: "Vịnh Hạ Long – Kiệt tác của thiên nhiên",
        titleEn: "Ha Long Bay – Nature's Masterpiece",
        level: "beginner",
        teacherInsight: "Tên 'Hạ Long' nghĩa là 'rồng hạ xuống.' Truyền thuyết kể rằng rồng mẹ và đàn rồng con bay xuống phun ngọc trai thành hàng nghìn hòn đảo để bảo vệ ngư dân khỏi giặc ngoại xâm.",
        teacherInsightEn: "The name 'Ha Long' means 'descending dragon.' Legend says a mother dragon and her children flew down, spitting pearls that became thousands of islands to protect fishermen from invaders.",
        theory: `## Vịnh Hạ Long – Nơi rồng hạ xuống 🏞️

Nếu có một nơi trên trái đất mà thiên nhiên đã dành cả triệu năm để chạm khắc, thì đó chính là Vịnh Hạ Long. Nằm ở tỉnh Quảng Ninh, phía đông bắc Việt Nam, vịnh trải rộng 1.553 km² với gần 2.000 hòn đảo đá vôi lớn nhỏ – mỗi hòn đảo mang một hình dáng kỳ lạ mà trí tưởng tượng của con người khó lòng nghĩ ra.

Khi bình minh ló dạng, vịnh khoác lên mình tấm áo sương mù huyền ảo. Những đảo đá vôi nhô lên khỏi mặt nước xanh ngọc bích như những vị thần đang thiền định giữa biển. Đảo Đầu Người trông giống khuôn mặt khổng lồ quay ra biển, Hòn Gà Chọi giống hai con gà đang đối mặt, Đảo Ti Tốp – nơi phi hành gia Liên Xô Gherman Titov từng đặt chân – có bãi biển cát trắng mịn hình bán nguyệt.

Bên trong những hòn đảo, thiên nhiên giấu kín những hang động tuyệt đẹp. Hang Sửng Sốt – "Hang Ngạc Nhiên" – rộng hàng nghìn mét vuông với thạch nhũ lung linh như một cung điện dưới lòng đất. Hang Đầu Gỗ lưu giữ dấu ấn lịch sử: tương truyền đây là nơi Trần Hưng Đạo cất giấu cọc gỗ để đánh trận Bạch Đằng năm 1288.

Trên vịnh, cuộc sống ngư dân diễn ra bình yên giữa sóng nước. Làng chài Cửa Vạn – một trong những làng nổi cổ nhất thế giới – là nhà của hàng trăm gia đình sống trên thuyền qua nhiều thế hệ. Trẻ em ở đây học bơi trước khi biết đi, và đi học bằng thuyền nhỏ mỗi sáng.

Hoàng hôn trên Vịnh Hạ Long là khoảnh khắc đẹp đến nao lòng. Bầu trời chuyển từ cam sang tím, ánh nắng cuối ngày phủ vàng lên từng rặng đảo, và mặt nước phản chiếu tất cả như một tấm gương khổng lồ. Vịnh Hạ Long hai lần được UNESCO vinh danh là Di sản Thiên nhiên Thế giới (1994, 2000) và xứng đáng với danh hiệu ấy đến từng khoảnh khắc.`,
        theoryEn: `## Ha Long Bay – Where Dragons Descended 🏞️

If there is a place on Earth that nature spent millions of years sculpting, it is Ha Long Bay. Located in Quang Ninh Province, northeastern Vietnam, the bay spans 1,553 km² with nearly 2,000 limestone islands large and small – each taking a fantastical shape beyond human imagination.

At dawn, the bay dons a mystical cloak of mist. Limestone islands rise from jade-green waters like gods meditating amid the sea. Man's Head Island looks like a giant face gazing seaward, Fighting Cocks Island resembles two roosters facing off, and Ti Top Island – where Soviet cosmonaut Gherman Titov once set foot – has a crescent-shaped white sand beach.

Inside the islands, nature conceals stunning caves. Sung Sot Cave – "Surprise Cave" – spans thousands of square meters with stalactites shimmering like an underground palace. Dau Go Cave preserves historical marks: legend says Tran Hung Dao hid wooden stakes here for the Bach Dang battle of 1288.

On the bay, fishermen's lives unfold peacefully amid the waves. Cua Van Fishing Village – one of the world's oldest floating villages – is home to hundreds of families living on boats across generations. Children here learn to swim before they can walk and go to school by small boat each morning.

Sunset on Ha Long Bay is a heartbreakingly beautiful moment. The sky shifts from orange to purple, the last sunlight gilds each island ridge, and the water mirrors it all like a giant looking glass. Ha Long Bay was twice named a UNESCO World Natural Heritage Site (1994, 2000) and deserves that title with every passing moment.`,
        vocabulary: [
          { word: "đá vôi", meaning: "loại đá hình thành từ vỏ sinh vật biển", meaningEn: "limestone", example: "Hàng nghìn đảo đá vôi.", exampleEn: "Thousands of limestone islands.", partOfSpeech: "noun" },
          { word: "huyền ảo", meaning: "đẹp kỳ lạ như trong mơ", meaningEn: "mystical / ethereal", example: "Sương mù huyền ảo.", exampleEn: "Mystical mist.", partOfSpeech: "adjective" },
          { word: "ngọc bích", meaning: "đá quý màu xanh lá", meaningEn: "jade / emerald", example: "Nước biển xanh ngọc bích.", exampleEn: "Jade-green seawater.", partOfSpeech: "noun" },
          { word: "thạch nhũ", meaning: "đá hình thành trong hang động", meaningEn: "stalactite", example: "Thạch nhũ lung linh.", exampleEn: "Shimmering stalactites.", partOfSpeech: "noun" },
          { word: "ngư dân", meaning: "người đánh cá", meaningEn: "fisherman", example: "Cuộc sống ngư dân trên vịnh.", exampleEn: "Fishermen's life on the bay.", partOfSpeech: "noun" },
          { word: "làng chài", meaning: "nơi ngư dân sống", meaningEn: "fishing village", example: "Làng chài Cửa Vạn.", exampleEn: "Cua Van fishing village.", partOfSpeech: "noun" },
          { word: "nao lòng", meaning: "xúc động sâu sắc", meaningEn: "heart-stirring / deeply moving", example: "Đẹp đến nao lòng.", exampleEn: "Heart-stirringly beautiful.", partOfSpeech: "adjective" },
          { word: "bán nguyệt", meaning: "hình nửa vòng tròn", meaningEn: "crescent / half-moon", example: "Bãi biển hình bán nguyệt.", exampleEn: "A crescent-shaped beach.", partOfSpeech: "noun" },
          { word: "di sản", meaning: "tài sản quý được bảo tồn", meaningEn: "heritage", example: "Di sản Thiên nhiên Thế giới.", exampleEn: "World Natural Heritage.", partOfSpeech: "noun" },
          { word: "vinh danh", meaning: "tôn vinh, công nhận", meaningEn: "to honor / recognize", example: "UNESCO vinh danh Vịnh Hạ Long.", exampleEn: "UNESCO honored Ha Long Bay.", partOfSpeech: "verb" },
        ],
        quiz: [
          { question: "Vịnh Hạ Long có bao nhiêu hòn đảo?", questionEn: "How many islands does Ha Long Bay have?", options: ["~500", "~1.000", "~2.000", "~5.000"], answer: 2, explanation: "Vịnh có gần 2.000 hòn đảo đá vôi.", explanationEn: "Nearly 2,000 limestone islands." },
          { question: "Đảo Ti Tốp được đặt tên theo ai?", questionEn: "Who is Ti Top Island named after?", options: ["Một vị vua", "Phi hành gia Gherman Titov", "Một ngư dân", "Một nhà thơ"], answer: 1, explanation: "Đặt tên theo phi hành gia Liên Xô Gherman Titov.", explanationEn: "Named after Soviet cosmonaut Gherman Titov." },
          { question: "Hang Đầu Gỗ liên quan đến sự kiện lịch sử nào?", questionEn: "What historical event is Dau Go Cave linked to?", options: ["Trận Điện Biên Phủ", "Trận Bạch Đằng 1288", "Trận Đống Đa", "Trận Chi Lăng"], answer: 1, explanation: "Tương truyền Trần Hưng Đạo cất giấu cọc gỗ cho trận Bạch Đằng.", explanationEn: "Legend says wooden stakes for the Bach Dang battle were hidden here." },
          { question: "Từ 'huyền ảo' có nghĩa gần nhất với:", questionEn: "'Huyền ảo' is closest in meaning to:", options: ["Rõ ràng", "Kỳ bí, đẹp như mơ", "Bình thường", "Đáng sợ"], answer: 1, explanation: "'Huyền ảo' nghĩa là đẹp kỳ lạ, như trong giấc mơ.", explanationEn: "'Huyền ảo' means mystically beautiful, dreamlike." },
          { question: "Vịnh Hạ Long được UNESCO vinh danh mấy lần?", questionEn: "How many times was Ha Long Bay UNESCO-recognized?", options: ["1 lần", "2 lần", "3 lần", "4 lần"], answer: 1, explanation: "Hai lần: năm 1994 và 2000.", explanationEn: "Twice: 1994 and 2000." },
          { question: "Trẻ em làng chài Cửa Vạn đi học bằng gì?", questionEn: "How do Cua Van children go to school?", options: ["Xe đạp", "Đi bộ", "Thuyền nhỏ", "Xe buýt"], answer: 2, explanation: "Trẻ em đi học bằng thuyền nhỏ mỗi sáng.", explanationEn: "Children go to school by small boat each morning." },
        ],
      },
      {
        id: "vn-read-11",
        title: "Đà Nẵng – Thành phố của những cây cầu",
        titleEn: "Da Nang – City of Bridges",
        level: "intermediate",
        teacherInsight: "Cầu Rồng ở Đà Nẵng thực sự phun lửa và phun nước vào mỗi tối thứ Bảy và Chủ nhật lúc 21h. Đây là cây cầu duy nhất trên thế giới làm được điều đó!",
        teacherInsightEn: "Da Nang's Dragon Bridge actually breathes fire and sprays water every Saturday and Sunday night at 9 PM. It's the only bridge in the world that does this!",
        theory: `## Đà Nẵng – Nơi cầu kể chuyện 🌊

Đà Nẵng nằm giữa Việt Nam như một chiếc bản lề nối hai miền Nam Bắc. Nhưng điều làm nên linh hồn của thành phố không phải vị trí địa lý, mà là những cây cầu – những kiệt tác kiến trúc bắc qua sông Hàn, mỗi cây cầu mang một câu chuyện riêng.

Cầu Rồng – biểu tượng mới của Đà Nẵng – uốn lượn 666 mét qua sông Hàn. Mỗi tối cuối tuần, đầu rồng phun lửa và nước như một sinh vật thần thoại thức giấc. Hàng nghìn du khách đứng bên bờ, điện thoại giơ cao, ngắm nhìn không khí lễ hội bùng nổ.

Cầu Quay Sông Hàn – cây cầu đầu tiên do nhân dân Đà Nẵng đóng góp xây dựng – có thể quay 90 độ để tàu lớn qua lại. Đêm khuya, khi cầu xoay mình giữa dòng sông yên tĩnh, du khách chứng kiến một cảnh tượng hiếm có trên thế giới.

Nhưng Đà Nẵng không chỉ có cầu. Bãi biển Mỹ Khê – được Forbes bình chọn là một trong những bãi biển đẹp nhất hành tinh – trải dài cát trắng mịn, nước trong vắt. Bà Nà Hills trên đỉnh núi Chúa mang đến một "châu Âu thu nhỏ" với lâu đài Pháp, vườn hoa, và Cầu Vàng nổi tiếng toàn cầu – hai bàn tay đá khổng lồ nâng đỡ lối đi giữa mây trời.

Ẩm thực Đà Nẵng cũng đặc sắc không kém. Mì Quảng – sợi mì vàng to bản chan nước lèo ít, rắc đậu phộng – là linh hồn ẩm thực miền Trung. Bánh tráng cuốn thịt heo, bê thui Cầu Mống, hải sản tươi rói từ biển – mỗi món ăn là một lời mời gọi trở lại.

Đà Nẵng ngày nay không chỉ đáng sống mà còn đáng mơ ước. Từ một thành phố cảng yên tĩnh, Đà Nẵng đã vươn mình thành điểm đến du lịch quốc tế, nơi thiên nhiên và con người cùng viết nên một câu chuyện đẹp.`,
        theoryEn: `## Da Nang – Where Bridges Tell Stories 🌊

Da Nang sits in central Vietnam like a hinge connecting North and South. But what makes the city's soul isn't its geography – it's the bridges – architectural masterpieces spanning the Han River, each telling its own story.

Dragon Bridge – Da Nang's new symbol – curves 666 meters across the Han River. Every weekend evening, the dragon head breathes fire and water like a mythical creature awakening. Thousands of tourists stand on the banks, phones raised, watching the festive atmosphere explode.

Han River Swing Bridge – the first bridge built by Da Nang citizens' contributions – can rotate 90 degrees to let large ships pass. Late at night, when the bridge pivots amid the quiet river, visitors witness a rare global spectacle.

But Da Nang isn't just bridges. My Khe Beach – voted by Forbes as one of the planet's most beautiful beaches – stretches with fine white sand and crystal-clear water. Ba Na Hills on Chua Mountain offers a "miniature Europe" with French castles, flower gardens, and the globally famous Golden Bridge – two giant stone hands cradling a walkway among the clouds.

Da Nang's cuisine is equally distinctive. Mi Quang – wide yellow noodles with a small amount of broth, sprinkled with peanuts – is the culinary soul of Central Vietnam. Rice paper wrapping pork, Cau Mong grilled beef, fresh seafood straight from the sea – each dish is an invitation to return.

Today's Da Nang isn't just livable but dreamworthy. From a quiet port city, Da Nang has risen to become an international tourist destination where nature and people write a beautiful story together.`,
        vocabulary: [
          { word: "bản lề", meaning: "điểm nối, chỗ xoay", meaningEn: "hinge / pivot point", example: "Đà Nẵng là bản lề nối hai miền.", exampleEn: "Da Nang is the hinge connecting two regions.", partOfSpeech: "noun" },
          { word: "kiệt tác", meaning: "tác phẩm xuất sắc nhất", meaningEn: "masterpiece", example: "Kiệt tác kiến trúc.", exampleEn: "Architectural masterpiece.", partOfSpeech: "noun" },
          { word: "thần thoại", meaning: "truyện cổ về thần linh", meaningEn: "mythology / mythical", example: "Sinh vật thần thoại.", exampleEn: "Mythical creature.", partOfSpeech: "noun" },
          { word: "đóng góp", meaning: "góp phần, cho thêm", meaningEn: "to contribute", example: "Nhân dân đóng góp xây cầu.", exampleEn: "Citizens contributed to building the bridge.", partOfSpeech: "verb" },
          { word: "hành tinh", meaning: "trái đất, các thiên thể", meaningEn: "planet", example: "Bãi biển đẹp nhất hành tinh.", exampleEn: "The planet's most beautiful beach.", partOfSpeech: "noun" },
          { word: "lâu đài", meaning: "tòa nhà lớn của vua, quý tộc", meaningEn: "castle / palace", example: "Lâu đài Pháp trên Bà Nà.", exampleEn: "French castle on Ba Na.", partOfSpeech: "noun" },
          { word: "nâng đỡ", meaning: "giữ ở trên, hỗ trợ", meaningEn: "to support / cradle", example: "Hai bàn tay đá nâng đỡ lối đi.", exampleEn: "Two stone hands cradling the walkway.", partOfSpeech: "verb" },
          { word: "đặc sắc", meaning: "nổi bật, độc đáo", meaningEn: "distinctive / unique", example: "Ẩm thực đặc sắc.", exampleEn: "Distinctive cuisine.", partOfSpeech: "adjective" },
          { word: "vươn mình", meaning: "phát triển mạnh mẽ", meaningEn: "to rise / grow strongly", example: "Đà Nẵng đã vươn mình.", exampleEn: "Da Nang has risen.", partOfSpeech: "verb" },
          { word: "tươi rói", meaning: "rất tươi, mới hoàn toàn", meaningEn: "fresh / brand new", example: "Hải sản tươi rói.", exampleEn: "Fresh seafood.", partOfSpeech: "adjective" },
        ],
        quiz: [
          { question: "Cầu Rồng dài bao nhiêu mét?", questionEn: "How long is Dragon Bridge?", options: ["333m", "500m", "666m", "1000m"], answer: 2, explanation: "Cầu Rồng uốn lượn 666 mét qua sông Hàn.", explanationEn: "Dragon Bridge curves 666 meters across the Han River." },
          { question: "Cầu Quay Sông Hàn có đặc điểm gì?", questionEn: "What's special about Han River Swing Bridge?", options: ["Phun lửa", "Quay 90 độ", "Có đèn laser", "Bằng gỗ"], answer: 1, explanation: "Cầu có thể quay 90 độ để tàu lớn qua.", explanationEn: "It can rotate 90 degrees for ships to pass." },
          { question: "Cầu Vàng có hình dáng gì?", questionEn: "What does the Golden Bridge look like?", options: ["Hình rồng", "Hai bàn tay đá nâng lối đi", "Hình cầu vồng", "Hình tháp"], answer: 1, explanation: "Hai bàn tay đá khổng lồ nâng đỡ lối đi giữa mây.", explanationEn: "Giant stone hands cradling a walkway among clouds." },
          { question: "Mì Quảng có đặc điểm gì?", questionEn: "What's distinctive about Mi Quang?", options: ["Nước lèo nhiều", "Sợi mì vàng, nước lèo ít", "Ăn khô", "Sợi mì đen"], answer: 1, explanation: "Mì Quảng có sợi mì vàng to bản, chan nước lèo ít.", explanationEn: "Mi Quang has wide yellow noodles with a small amount of broth." },
          { question: "Tại sao tác giả nói Đà Nẵng 'đáng mơ ước'?", questionEn: "Why does the author call Da Nang 'dreamworthy'?", options: ["Vì rẻ", "Vì phát triển vượt bậc từ TP cảng thành điểm đến quốc tế", "Vì có nhiều cầu", "Vì thời tiết đẹp"], answer: 1, explanation: "Đà Nẵng vươn mình từ thành phố cảng yên tĩnh thành điểm đến du lịch quốc tế.", explanationEn: "Da Nang rose from a quiet port city to an international tourism destination." },
        ],
      },
      {
        id: "vn-read-12",
        title: "Hội An – Đêm phố cổ",
        titleEn: "Hoi An – A Night in the Ancient Town",
        level: "beginner",
        teacherInsight: "Mỗi ngày rằm (14 âm lịch), Hội An tắt hết đèn điện và chỉ dùng nến, đèn lồng. Nếu bạn đến đúng đêm rằm, hãy thả đèn hoa đăng trên sông – người Việt tin rằng điều ước sẽ thành hiện thực!",
        teacherInsightEn: "Every full moon (14th lunar day), Hoi An turns off all electric lights and uses only candles and lanterns. If you visit on a full moon night, release a floating lantern on the river – Vietnamese believe your wish will come true!",
        theory: `## Hội An – Khi phố cổ thức giấc 🏮

Hội An ban ngày là một cô gái dịu dàng mặc áo dài, nhưng khi màn đêm buông xuống, cô ấy khoác lên mình chiếc áo đèn lồng rực rỡ và biến thành nàng tiên trong truyện cổ tích.

Phố cổ Hội An – di sản thế giới UNESCO – là một trong những thương cảng cổ bảo tồn nguyên vẹn nhất Đông Nam Á. Từ thế kỷ 15 đến 19, nơi đây là điểm giao thương sầm uất giữa thương nhân Nhật Bản, Trung Hoa, Hà Lan, và Bồ Đào Nha. Chùa Cầu – cây cầu có mái che do thương nhân Nhật xây năm 1593 – vẫn đứng vững qua hơn 400 năm mưa nắng.

Bước vào những con đường nhỏ hẹp, bạn sẽ thấy những ngôi nhà cổ mái ngói âm dương rêu phong, tường vàng phai. Hàng trăm chiếc đèn lồng đủ sắc màu – đỏ, vàng, tím, xanh – treo lơ lửng khắp nơi, tạo nên một bầu trời rực rỡ ngay trên đầu. Ánh sáng lung linh phản chiếu trên mặt sông Hoài, nơi hàng trăm hoa đăng đang trôi theo dòng nước chậm rãi.

Tiệm may áo dài ở Hội An là huyền thoại. Chỉ trong 24 giờ, một thợ may có thể đo, cắt, và may hoàn chỉnh một chiếc áo dài hoàn hảo từ lụa Hội An. Du khách phương Tây ghé vào, chọn vải, và ngày hôm sau nhận lại một tác phẩm nghệ thuật mặc trên người.

Ẩm thực phố cổ cũng mê đắm không kém. Cao lầu – món mì chỉ có ở Hội An – sợi mì giòn dai nấu bằng nước giếng Bá Lễ, ăn kèm thịt xá xíu và rau sống. Hoành thánh chiên giòn vàng ươm, bánh mì Phượng – "tiệm bánh mì ngon nhất thế giới" theo Anthony Bourdain – và cơm gà phố Hội với cơm dẻo nghệ vàng.

Hội An không chỉ là một địa điểm du lịch. Đó là một giấc mơ nhuốm màu đèn lồng, nơi quá khứ và hiện tại hòa quyện, và mỗi góc phố đều kể một câu chuyện tình yêu với thời gian.`,
        theoryEn: `## Hoi An – When the Ancient Town Awakens 🏮

Hoi An by day is a gentle girl in an ao dai, but when night falls, she dons a dazzling lantern dress and transforms into a fairy from a folk tale.

Hoi An Ancient Town – a UNESCO World Heritage site – is one of Southeast Asia's best-preserved ancient trading ports. From the 15th to 19th centuries, it was a bustling trade hub between Japanese, Chinese, Dutch, and Portuguese merchants. The Japanese Covered Bridge – a roofed bridge built by Japanese traders in 1593 – still stands strong after over 400 years of weather.

Entering narrow lanes, you'll see ancient houses with yin-yang tiled roofs covered in moss, with faded yellow walls. Hundreds of lanterns in every color – red, yellow, purple, green – hang everywhere, creating a dazzling sky right overhead. The shimmering light reflects on the Hoai River, where hundreds of floating lanterns drift slowly along the current.

Hoi An's ao dai tailoring shops are legendary. In just 24 hours, a tailor can measure, cut, and complete a perfect ao dai from Hoi An silk. Western tourists drop in, choose fabric, and the next day receive a wearable work of art.

The ancient town's cuisine is equally enchanting. Cao Lau – noodles found only in Hoi An – with chewy strands cooked in Ba Le well water, served with char siu pork and fresh herbs. Crispy golden fried wontons, Phuong Banh Mi – "the best sandwich in the world" according to Anthony Bourdain – and Hoi An chicken rice with turmeric-yellow sticky rice.

Hoi An isn't just a tourist spot. It's a lantern-tinted dream where past and present blend, and every street corner tells a love story with time.`,
        vocabulary: [
          { word: "thương cảng", meaning: "cảng buôn bán", meaningEn: "trading port", example: "Hội An là thương cảng cổ.", exampleEn: "Hoi An was an ancient trading port.", partOfSpeech: "noun" },
          { word: "bảo tồn", meaning: "giữ gìn nguyên vẹn", meaningEn: "to preserve / conserve", example: "Phố cổ được bảo tồn tốt.", exampleEn: "The ancient town is well preserved.", partOfSpeech: "verb" },
          { word: "rêu phong", meaning: "phủ rêu do lâu ngày", meaningEn: "mossy / weathered", example: "Mái ngói rêu phong.", exampleEn: "Moss-covered tile roof.", partOfSpeech: "adjective" },
          { word: "hoa đăng", meaning: "đèn hoa thả trên nước", meaningEn: "floating flower lantern", example: "Thả hoa đăng trên sông.", exampleEn: "Releasing floating lanterns on the river.", partOfSpeech: "noun" },
          { word: "lung linh", meaning: "ánh sáng lấp lánh", meaningEn: "shimmering / sparkling", example: "Ánh sáng lung linh.", exampleEn: "Shimmering light.", partOfSpeech: "adjective" },
          { word: "huyền thoại", meaning: "nổi tiếng, truyền thuyết", meaningEn: "legendary", example: "Tiệm may huyền thoại.", exampleEn: "Legendary tailor shop.", partOfSpeech: "noun" },
          { word: "mê đắm", meaning: "say mê, cuốn hút mạnh", meaningEn: "enchanting / captivating", example: "Ẩm thực mê đắm.", exampleEn: "Enchanting cuisine.", partOfSpeech: "adjective" },
          { word: "hòa quyện", meaning: "trộn lẫn hài hòa", meaningEn: "to blend / intertwine", example: "Quá khứ và hiện tại hòa quyện.", exampleEn: "Past and present intertwine.", partOfSpeech: "verb" },
          { word: "giao thương", meaning: "trao đổi buôn bán", meaningEn: "trade / commerce", example: "Điểm giao thương quốc tế.", exampleEn: "International trading point.", partOfSpeech: "noun" },
          { word: "nguyên vẹn", meaning: "còn đầy đủ, không bị hư", meaningEn: "intact / complete", example: "Bảo tồn nguyên vẹn.", exampleEn: "Preserved intact.", partOfSpeech: "adjective" },
        ],
        quiz: [
          { question: "Chùa Cầu được xây năm nào?", questionEn: "When was the Japanese Covered Bridge built?", options: ["1493", "1593", "1693", "1793"], answer: 1, explanation: "Thương nhân Nhật xây năm 1593.", explanationEn: "Built by Japanese traders in 1593." },
          { question: "Cao Lầu dùng nước từ đâu?", questionEn: "What water is used for Cao Lau?", options: ["Nước sông", "Nước mưa", "Nước giếng Bá Lễ", "Nước máy"], answer: 2, explanation: "Cao Lầu nấu bằng nước giếng Bá Lễ.", explanationEn: "Cooked with Ba Le well water." },
          { question: "Ai gọi bánh mì Phượng là 'ngon nhất thế giới'?", questionEn: "Who called Phuong Banh Mi 'the best in the world'?", options: ["Gordon Ramsay", "Anthony Bourdain", "Jamie Oliver", "UNESCO"], answer: 1, explanation: "Đầu bếp nổi tiếng Anthony Bourdain.", explanationEn: "Celebrity chef Anthony Bourdain." },
          { question: "Từ 'lung linh' có nghĩa gần nhất với:", questionEn: "'Lung linh' is closest in meaning to:", options: ["Tối tăm", "Lấp lánh, rực rỡ", "Ồn ào", "Buồn bã"], answer: 1, explanation: "'Lung linh' nghĩa là ánh sáng lấp lánh, đẹp.", explanationEn: "'Lung linh' means sparkling, beautifully lit." },
          { question: "Đêm rằm ở Hội An có gì đặc biệt?", questionEn: "What's special about full moon nights in Hoi An?", options: ["Đóng cửa", "Tắt đèn điện, dùng đèn lồng và nến", "Bắn pháo hoa", "Diễu hành"], answer: 1, explanation: "Hội An tắt đèn điện, dùng nến và đèn lồng.", explanationEn: "Hoi An turns off electric lights, using candles and lanterns." },
        ],
      },
      {
        id: "vn-read-13",
        title: "Sapa – Giữa trời mây Tây Bắc",
        titleEn: "Sapa – Among the Clouds of the Northwest",
        level: "intermediate",
        teacherInsight: "Người H'Mông ở Sapa nhuộm vải bằng chàm tự nhiên. Quá trình nhuộm mất hàng tuần – nhúng, phơi, nhúng lại – cho đến khi vải đạt màu xanh đen đặc trưng. Đó là lý do họ được gọi là 'H'Mông Đen'!",
        teacherInsightEn: "Hmong people in Sapa dye fabric with natural indigo. The process takes weeks – dipping, drying, dipping again – until the fabric reaches its characteristic blue-black. That's why they're called 'Black Hmong'!",
        theory: `## Sapa – Vùng đất nơi mây chạm vào tay 🏔️

Ở độ cao 1.600 mét, Sapa là nơi bạn có thể chạm vào mây. Không phải ẩn dụ – mà là thật sự: buổi sáng, mây trắng bồng bềnh tràn qua cửa sổ phòng khách sạn, len vào tóc, phủ lên vai bạn như một chiếc khăn lụa mỏng.

Sapa nằm ở tỉnh Lào Cai, sát biên giới Trung Quốc, là nhà của nhiều dân tộc thiểu số: H'Mông, Dao Đỏ, Tày, Giáy. Mỗi dân tộc mang một sắc màu riêng – H'Mông trong trang phục chàm đen, Dao Đỏ nổi bật với khăn đỏ và bạc trắng, Tày trong bộ đồ nhuộm chàm xanh.

Ruộng bậc thang Sapa là một trong những cảnh quan đẹp nhất Đông Nam Á. Từ thung lũng Mường Hoa nhìn lên, những bậc thang lúa xếp chồng nhau như một chiếc cầu thang khổng lồ lên trời. Mùa lúa chín (tháng 9-10), cả thung lũng nhuộm vàng óng, tạo nên bức tranh mà không họa sĩ nào có thể vẽ được.

Đỉnh Fansipan – 3.143 mét – được gọi là "Nóc nhà Đông Dương." Trước đây, chinh phục Fansipan là hành trình gian khổ kéo dài 2-3 ngày. Ngày nay, cáp treo hiện đại đưa bạn lên đỉnh trong 15 phút, nhưng nhiều người vẫn chọn đường đi bộ để cảm nhận từng nhịp thở của núi rừng.

Chợ tình Sapa – họp vào tối thứ Bảy – là nơi thanh niên các dân tộc gặp gỡ, hát đối, thổi khèn, và tìm bạn đời. Tiếng khèn Mèo réo rắt giữa đêm sương, tiếng hát giao duyên vang vọng qua thung lũng – một truyền thống lãng mạn mà ít nơi nào trên thế giới còn giữ được.

Sapa mùa đông lạnh buốt, đôi khi có tuyết rơi – hiện tượng cực kỳ hiếm ở Việt Nam. Những đêm đông, người H'Mông ngồi quanh bếp lửa, uống rượu ngô ấm nồng, kể chuyện xưa cho con cháu nghe. Sapa là nơi Việt Nam gặp gỡ trời Âu, nơi truyền thống ôm ấp hiện đại.`,
        theoryEn: `## Sapa – The Land Where Clouds Touch Your Hands 🏔️

At 1,600 meters, Sapa is where you can touch the clouds. Not metaphorically – literally: in the morning, white clouds float through hotel room windows, slip into your hair, and drape over your shoulders like a thin silk scarf.

Sapa lies in Lao Cai Province, near the Chinese border, home to many ethnic minorities: Hmong, Red Dao, Tay, Giay. Each ethnicity brings its own colors – Hmong in indigo-black attire, Red Dao striking with red headdresses and silver jewelry, Tay in indigo-dyed blue.

Sapa's terraced rice fields are among Southeast Asia's most beautiful landscapes. Looking up from Muong Hoa Valley, the rice terraces stack upon each other like a giant stairway to heaven. During harvest season (September-October), the entire valley turns golden, creating a painting no artist could replicate.

Fansipan Peak – 3,143 meters – is called the "Roof of Indochina." Previously, conquering Fansipan was a grueling 2-3 day journey. Today, a modern cable car takes you to the summit in 15 minutes, but many still choose the hiking trail to feel every breath of the mountain forest.

The Sapa Love Market – held Saturday evenings – is where young people from different ethnicities meet, sing courtship songs, play the khen (Hmong panpipe), and seek partners. The khen's melody echoes through the misty night, courtship singing resonating across the valley – a romantic tradition few places in the world still preserve.

Sapa winters are bitterly cold, sometimes with snowfall – an extremely rare phenomenon in Vietnam. On winter nights, Hmong people sit around the fire, sipping warm corn wine, telling old stories to their children. Sapa is where Vietnam meets Europe, where tradition embraces modernity.`,
        vocabulary: [
          { word: "bồng bềnh", meaning: "bay lơ lửng, nhẹ nhàng", meaningEn: "floating / drifting", example: "Mây trắng bồng bềnh.", exampleEn: "White clouds floating.", partOfSpeech: "adjective" },
          { word: "dân tộc thiểu số", meaning: "nhóm dân tộc ít người", meaningEn: "ethnic minority", example: "54 dân tộc, 53 dân tộc thiểu số.", exampleEn: "54 ethnicities, 53 minorities.", partOfSpeech: "noun" },
          { word: "ruộng bậc thang", meaning: "ruộng xếp tầng trên sườn núi", meaningEn: "terraced rice field", example: "Ruộng bậc thang Sapa.", exampleEn: "Sapa terraced rice fields.", partOfSpeech: "noun" },
          { word: "thung lũng", meaning: "vùng đất thấp giữa các núi", meaningEn: "valley", example: "Thung lũng Mường Hoa.", exampleEn: "Muong Hoa Valley.", partOfSpeech: "noun" },
          { word: "chinh phục", meaning: "vượt qua, đạt được", meaningEn: "to conquer / overcome", example: "Chinh phục đỉnh Fansipan.", exampleEn: "Conquer Fansipan Peak.", partOfSpeech: "verb" },
          { word: "gian khổ", meaning: "vất vả, khó khăn", meaningEn: "arduous / grueling", example: "Hành trình gian khổ.", exampleEn: "A grueling journey.", partOfSpeech: "adjective" },
          { word: "khèn", meaning: "nhạc cụ truyền thống H'Mông", meaningEn: "khen (Hmong panpipe)", example: "Tiếng khèn réo rắt.", exampleEn: "The khen's melody echoes.", partOfSpeech: "noun" },
          { word: "giao duyên", meaning: "hát để tìm hiểu nhau", meaningEn: "courtship singing", example: "Hát giao duyên vang vọng.", exampleEn: "Courtship singing echoes.", partOfSpeech: "noun" },
          { word: "nồng nàn", meaning: "ấm áp, đậm đà", meaningEn: "warm / ardent", example: "Rượu ngô ấm nồng nàn.", exampleEn: "Warm, ardent corn wine.", partOfSpeech: "adjective" },
          { word: "cáp treo", meaning: "phương tiện di chuyển trên dây cáp", meaningEn: "cable car", example: "Cáp treo lên Fansipan.", exampleEn: "Cable car to Fansipan.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "Sapa ở độ cao bao nhiêu mét?", questionEn: "What is Sapa's altitude?", options: ["800m", "1.200m", "1.600m", "2.000m"], answer: 2, explanation: "Sapa ở độ cao 1.600 mét.", explanationEn: "Sapa is at 1,600 meters." },
          { question: "Fansipan cao bao nhiêu mét?", questionEn: "How tall is Fansipan?", options: ["2.143m", "3.143m", "4.143m", "1.143m"], answer: 1, explanation: "Fansipan cao 3.143 mét – Nóc nhà Đông Dương.", explanationEn: "Fansipan is 3,143 meters – the Roof of Indochina." },
          { question: "Chợ tình Sapa họp vào khi nào?", questionEn: "When is the Sapa Love Market held?", options: ["Sáng Chủ nhật", "Tối thứ Bảy", "Chiều thứ Sáu", "Trưa thứ Hai"], answer: 1, explanation: "Chợ tình họp vào tối thứ Bảy.", explanationEn: "The Love Market is held Saturday evenings." },
          { question: "Người Dao Đỏ nổi bật bởi điều gì?", questionEn: "What distinguishes the Red Dao people?", options: ["Áo đen", "Khăn đỏ và bạc trắng", "Mũ xanh", "Dây lưng vàng"], answer: 1, explanation: "Dao Đỏ nổi bật với khăn đỏ và đồ bạc.", explanationEn: "Red Dao stand out with red headdresses and silver jewelry." },
          { question: "Mùa lúa chín ở Sapa là tháng mấy?", questionEn: "When is harvest season in Sapa?", options: ["Tháng 3-4", "Tháng 6-7", "Tháng 9-10", "Tháng 12-1"], answer: 2, explanation: "Mùa lúa chín tháng 9-10, thung lũng vàng óng.", explanationEn: "Harvest is September-October, the valley turns golden." },
        ],
      },
      {
        id: "vn-read-14",
        title: "Phú Quốc – Đảo ngọc phương Nam",
        titleEn: "Phu Quoc – The Southern Pearl Island",
        level: "beginner",
        teacherInsight: "Nước mắm Phú Quốc được ủ trong thùng gỗ bời lời ít nhất 12 tháng. Nước mắm nhĩ – loại tinh khiết nhất – nhỏ giọt tự nhiên từ đáy thùng, được ví như 'vàng lỏng' của ẩm thực Việt.",
        teacherInsightEn: "Phu Quoc fish sauce is aged in wooden barrels for at least 12 months. 'Nuoc mam nhi' – the purest type – drips naturally from the barrel bottom and is called the 'liquid gold' of Vietnamese cuisine.",
        theory: `## Phú Quốc – Thiên đường biển đảo 🏝️

Phú Quốc – đảo lớn nhất Việt Nam – nằm ở vịnh Thái Lan thuộc tỉnh Kiên Giang, cách bờ đất liền chỉ 45 phút bay. Nhưng khoảng cách ấy đủ để tạo nên một thế giới hoàn toàn khác: nơi cát trắng mịn như bột, nước biển trong xanh đến tận đáy, và mặt trời lặn đẹp đến quên thở.

Buổi sáng ở Phú Quốc bắt đầu tại bãi Sao – bãi biển được xếp hạng đẹp nhất châu Á. Cát ở đây trắng mịn và mát lạnh dưới chân, nước biển nông và ấm, trong vắt nhìn thấy từng con cá nhỏ bơi lượn. Những hàng dừa nghiêng mình soi bóng xuống biển, tạo nên khung cảnh hoàn hảo cho bất kỳ bức ảnh nào.

Nếu biển là mặt trước của Phú Quốc, thì rừng nguyên sinh là mặt sau bí ẩn. Vườn Quốc gia Phú Quốc chiếm hơn 50% diện tích đảo, là nhà của hàng trăm loài động thực vật quý hiếm. Đi dưới tán rừng già, bạn sẽ gặp suối Tranh – dòng suối trong vắt chảy qua những tảng đá phủ rêu, tạo thành nhiều tầng thác nhỏ xinh.

Nhưng linh hồn của Phú Quốc nằm ở hai thứ: nước mắm và hồ tiêu. Nhà thùng nước mắm – nơi hàng nghìn lít nước mắm ủ trong thùng gỗ bời lời – tỏa ra mùi hương đặc trưng nồng nàn. Hồ tiêu Phú Quốc – cay nồng, thơm phức – được trồng trên đất đỏ bazan, xuất khẩu khắp thế giới như một thương hiệu quốc gia.

Hoàng hôn Phú Quốc là nghi lễ thiêng liêng. Mặt trời chìm dần vào biển, nhuộm bầu trời thành bảng màu cam, hồng, tím – và hàng trăm người đứng lặng ngắm, không ai nói gì, chỉ có tiếng sóng và gió.`,
        theoryEn: `## Phu Quoc – Island Paradise 🏝️

Phu Quoc – Vietnam's largest island – sits in the Gulf of Thailand in Kien Giang Province, just 45 minutes by plane from the mainland. But that distance creates an entirely different world: where sand is fine as powder, sea water is crystal clear to the bottom, and sunsets are breathtakingly beautiful.

Morning starts at Sao Beach – ranked among Asia's most beautiful beaches. The sand here is fine, white, and cool underfoot, the sea shallow and warm, so clear you can see tiny fish swimming. Coconut palms lean to cast reflections on the sea, creating a perfect frame for any photograph.

If the sea is Phu Quoc's front face, the virgin forest is its mysterious reverse. Phu Quoc National Park covers over 50% of the island, home to hundreds of rare plant and animal species. Walking under the old-growth canopy, you'll find Tranh Stream – a crystal-clear stream flowing over mossy rocks, forming multiple small cascading waterfalls.

But Phu Quoc's soul lies in two things: fish sauce and pepper. Fish sauce houses – where thousands of liters age in boi loi wooden barrels – emanate a strong, distinctive aroma. Phu Quoc pepper – intensely spicy and fragrant – grown on red basalt soil, is exported worldwide as a national brand.

Sunset on Phu Quoc is a sacred ceremony. The sun sinks slowly into the sea, painting the sky in shades of orange, pink, and purple – and hundreds of people stand silently watching, no one speaking, only the sound of waves and wind.`,
        vocabulary: [
          { word: "thiên đường", meaning: "nơi đẹp nhất, hoàn hảo", meaningEn: "paradise", example: "Thiên đường biển đảo.", exampleEn: "Island paradise.", partOfSpeech: "noun" },
          { word: "nguyên sinh", meaning: "chưa bị con người tác động", meaningEn: "virgin / pristine (forest)", example: "Rừng nguyên sinh.", exampleEn: "Virgin forest.", partOfSpeech: "adjective" },
          { word: "quý hiếm", meaning: "hiếm và có giá trị", meaningEn: "rare / precious", example: "Động vật quý hiếm.", exampleEn: "Rare animals.", partOfSpeech: "adjective" },
          { word: "rêu phong", meaning: "phủ rêu xanh", meaningEn: "mossy / moss-covered", example: "Đá phủ rêu.", exampleEn: "Moss-covered rocks.", partOfSpeech: "adjective" },
          { word: "nồng nàn", meaning: "mùi đậm, mạnh", meaningEn: "intense / pungent", example: "Mùi hương nồng nàn.", exampleEn: "Pungent aroma.", partOfSpeech: "adjective" },
          { word: "thương hiệu", meaning: "tên tuổi, nhãn hiệu", meaningEn: "brand", example: "Thương hiệu quốc gia.", exampleEn: "National brand.", partOfSpeech: "noun" },
          { word: "bazan", meaning: "loại đất đỏ từ núi lửa", meaningEn: "basalt (volcanic soil)", example: "Đất đỏ bazan.", exampleEn: "Red basalt soil.", partOfSpeech: "noun" },
          { word: "thiêng liêng", meaning: "trang trọng, linh thiêng", meaningEn: "sacred / solemn", example: "Nghi lễ thiêng liêng.", exampleEn: "A sacred ceremony.", partOfSpeech: "adjective" },
          { word: "trong vắt", meaning: "rất trong, không vẩn đục", meaningEn: "crystal clear", example: "Nước biển trong vắt.", exampleEn: "Crystal clear sea water.", partOfSpeech: "adjective" },
          { word: "tán rừng", meaning: "phần lá cây che phía trên", meaningEn: "forest canopy", example: "Đi dưới tán rừng già.", exampleEn: "Walking under the old-growth canopy.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "Phú Quốc thuộc tỉnh nào?", questionEn: "What province is Phu Quoc in?", options: ["Quảng Ninh", "Khánh Hòa", "Kiên Giang", "Bình Thuận"], answer: 2, explanation: "Phú Quốc thuộc tỉnh Kiên Giang.", explanationEn: "Phu Quoc is in Kien Giang Province." },
          { question: "Vườn Quốc gia Phú Quốc chiếm bao nhiêu % đảo?", questionEn: "What % of the island is the National Park?", options: ["20%", "30%", "Hơn 50%", "80%"], answer: 2, explanation: "Vườn Quốc gia chiếm hơn 50% diện tích.", explanationEn: "The National Park covers over 50%." },
          { question: "Nước mắm Phú Quốc ủ trong thùng gì?", questionEn: "What are Phu Quoc fish sauce barrels made of?", options: ["Thùng sắt", "Thùng nhựa", "Thùng gỗ bời lời", "Thùng gốm"], answer: 2, explanation: "Nước mắm ủ trong thùng gỗ bời lời.", explanationEn: "Fish sauce is aged in boi loi wooden barrels." },
          { question: "'Trong vắt' có nghĩa gần nhất với:", questionEn: "'Trong vắt' is closest in meaning to:", options: ["Đục ngầu", "Rất trong, không vẩn đục", "Màu xanh đậm", "Rất lạnh"], answer: 1, explanation: "'Trong vắt' nghĩa là rất trong suốt, không tí vẩn đục nào.", explanationEn: "'Trong vắt' means perfectly transparent." },
          { question: "Tại sao tác giả gọi hoàng hôn Phú Quốc là 'nghi lễ thiêng liêng'?", questionEn: "Why does the author call sunset a 'sacred ceremony'?", options: ["Vì có lễ hội", "Vì mọi người đứng lặng chiêm ngưỡng", "Vì có cầu nguyện", "Vì rất lạnh"], answer: 1, explanation: "Mọi người đứng lặng ngắm, không nói gì – như một nghi lễ.", explanationEn: "Everyone stands silently watching – like a ceremony." },
        ],
      },
      {
        id: "vn-read-15",
        title: "Đà Lạt – Thành phố ngàn hoa",
        titleEn: "Da Lat – City of a Thousand Flowers",
        level: "beginner",
        teacherInsight: "Đà Lạt là thành phố duy nhất ở Việt Nam không cần quạt hay điều hòa. Nhiệt độ trung bình chỉ 18-25°C quanh năm. Người Việt gọi Đà Lạt là nơi 'nghỉ dưỡng' hoàn hảo!",
        teacherInsightEn: "Da Lat is the only city in Vietnam that doesn't need fans or air conditioning. Average temperature is just 18-25°C year-round. Vietnamese call Da Lat the perfect 'retreat'!",
        theory: `## Đà Lạt – Nơi mùa xuân không bao giờ kết thúc 🌸

Ở Việt Nam, có một nơi mà mùa xuân kéo dài suốt 365 ngày. Đà Lạt – thành phố sương mù trên cao nguyên Lâm Đồng, ở độ cao 1.500 mét – là viên ngọc mà cả nước ganh tỵ.

Đà Lạt của buổi sáng bắt đầu bằng sương. Sương mù bao phủ hồ Xuân Hương như một tấm màn lụa, chỉ để lộ đỉnh những cây thông ba lá – loại cây đặc trưng không nơi nào có. Những đôi tình nhân dạo bước quanh hồ, tay trong tay, hơi thở nhẹ bay thành khói – Đà Lạt lãng mạn đến từng chi tiết nhỏ.

Hoa là linh hồn của Đà Lạt. Vườn hoa thành phố rực rỡ quanh năm: hoa hồng, hoa cẩm tú cầu, hoa dã quỳ, hoa mai anh đào. Đặc biệt, mỗi hai năm, Đà Lạt tổ chức Festival Hoa – lễ hội thu hút hàng triệu du khách, biến cả thành phố thành một khu vườn khổng lồ.

Kiến trúc Đà Lạt mang đậm dấu ấn Pháp. Nhà ga xe lửa Đà Lạt – được xây năm 1938 – là nhà ga cổ nhất Đông Dương với kiến trúc Art Deco. Nhà thờ Con Gà – với tháp chuông cao 47 mét đặt hình con gà – là biểu tượng của thành phố. Những biệt thự Pháp cổ nằm rải rác trên đồi thông, mỗi căn kể một câu chuyện từ thế kỷ trước.

Cà phê Đà Lạt không giống bất kỳ đâu. Trong không khí se lạnh, ngồi trong một quán cà phê giữa vườn hoa, nhâm nhi cà phê weasel (cà phê chồn) – loại cà phê đắt nhất thế giới do chồn hương ăn quả cà phê rồi "sản xuất" ra hạt đặc biệt – bạn sẽ hiểu vì sao Đà Lạt là "thiên đường của sự chậm rãi."

Đà Lạt không vội vã, không ồn ào, không chen chúc. Ở đây, thời gian dành cho hoa, cho tình yêu, và cho những khoảnh khắc bình yên mà cuộc sống thành thị đã lấy mất.`,
        theoryEn: `## Da Lat – Where Spring Never Ends 🌸

In Vietnam, there's a place where spring lasts 365 days. Da Lat – the misty city on the Lam Dong highland at 1,500 meters – is a gem the entire country envies.

Da Lat mornings begin with mist. Fog blankets Xuan Huong Lake like a silk curtain, revealing only the tips of three-needled pines – trees found nowhere else. Couples stroll around the lake, hand in hand, their gentle breaths becoming wisps of vapor – Da Lat is romantic down to every small detail.

Flowers are Da Lat's soul. The city's flower gardens bloom year-round: roses, hydrangeas, wild sunflowers, cherry blossoms. Every two years, Da Lat hosts the Flower Festival – attracting millions of visitors and turning the entire city into a giant garden.

Da Lat's architecture bears strong French influences. Da Lat Railway Station – built in 1938 – is Indochina's oldest station with Art Deco architecture. The Rooster Church – with a 47-meter bell tower topped by a rooster figure – is the city's symbol. Old French villas dot the pine hills, each telling a story from the previous century.

Da Lat coffee is like nowhere else. In the cool air, sitting in a café amid flower gardens, sipping weasel coffee (cà phê chồn) – the world's most expensive coffee produced when civet cats eat coffee cherries and "produce" special beans – you'll understand why Da Lat is the "paradise of slowness."

Da Lat doesn't rush, isn't noisy, doesn't crowd. Here, time is for flowers, for love, and for peaceful moments that urban life has stolen away.`,
        vocabulary: [
          { word: "cao nguyên", meaning: "vùng đất cao và bằng phẳng", meaningEn: "highland / plateau", example: "Cao nguyên Lâm Đồng.", exampleEn: "Lam Dong highland.", partOfSpeech: "noun" },
          { word: "ganh tỵ", meaning: "muốn có như người khác", meaningEn: "to envy", example: "Cả nước ganh tỵ Đà Lạt.", exampleEn: "The whole country envies Da Lat.", partOfSpeech: "verb" },
          { word: "lãng mạn", meaning: "đẹp, giàu tình cảm", meaningEn: "romantic", example: "Đà Lạt lãng mạn.", exampleEn: "Romantic Da Lat.", partOfSpeech: "adjective" },
          { word: "cẩm tú cầu", meaning: "loại hoa nhiều cánh hình cầu", meaningEn: "hydrangea", example: "Hoa cẩm tú cầu tím.", exampleEn: "Purple hydrangeas.", partOfSpeech: "noun" },
          { word: "biệt thự", meaning: "nhà lớn, đẹp, riêng biệt", meaningEn: "villa", example: "Biệt thự Pháp cổ.", exampleEn: "Old French villa.", partOfSpeech: "noun" },
          { word: "se lạnh", meaning: "hơi lạnh, mát lạnh dễ chịu", meaningEn: "crisp / pleasantly cool", example: "Không khí se lạnh.", exampleEn: "Crisp cool air.", partOfSpeech: "adjective" },
          { word: "chồn hương", meaning: "động vật ăn quả cà phê", meaningEn: "civet cat", example: "Chồn hương ăn cà phê.", exampleEn: "Civet cat eats coffee cherries.", partOfSpeech: "noun" },
          { word: "bình yên", meaning: "yên tĩnh, thanh thản", meaningEn: "peaceful / tranquil", example: "Khoảnh khắc bình yên.", exampleEn: "Peaceful moments.", partOfSpeech: "adjective" },
          { word: "thành thị", meaning: "khu vực đô thị", meaningEn: "urban / city", example: "Cuộc sống thành thị.", exampleEn: "Urban life.", partOfSpeech: "noun" },
          { word: "sương mù", meaning: "hơi nước bay lơ lửng gần mặt đất", meaningEn: "mist / fog", example: "Sương mù phủ hồ.", exampleEn: "Mist covers the lake.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "Đà Lạt ở độ cao bao nhiêu?", questionEn: "What is Da Lat's altitude?", options: ["500m", "1.000m", "1.500m", "2.000m"], answer: 2, explanation: "Đà Lạt ở độ cao 1.500 mét.", explanationEn: "Da Lat is at 1,500 meters." },
          { question: "Nhà ga Đà Lạt theo phong cách kiến trúc nào?", questionEn: "What architectural style is Da Lat station?", options: ["Gothic", "Art Deco", "Baroque", "Hiện đại"], answer: 1, explanation: "Nhà ga Đà Lạt theo phong cách Art Deco, xây năm 1938.", explanationEn: "Art Deco style, built in 1938." },
          { question: "Cà phê chồn đặc biệt vì sao?", questionEn: "Why is weasel coffee special?", options: ["Rẻ nhất", "Chồn hương ăn và tạo ra hạt đặc biệt", "Trồng trên núi lửa", "Pha bằng sữa dê"], answer: 1, explanation: "Chồn hương ăn quả cà phê rồi 'sản xuất' hạt đặc biệt.", explanationEn: "Civet cats eat coffee cherries and produce special beans." },
          { question: "Festival Hoa Đà Lạt tổ chức bao lâu một lần?", questionEn: "How often is the Flower Festival?", options: ["Hàng năm", "Mỗi 2 năm", "Mỗi 5 năm", "Mỗi 10 năm"], answer: 1, explanation: "Festival Hoa tổ chức mỗi 2 năm.", explanationEn: "The Flower Festival is held every 2 years." },
          { question: "Tại sao Đà Lạt được gọi là 'thiên đường của sự chậm rãi'?", questionEn: "Why is Da Lat called 'paradise of slowness'?", options: ["Vì không có xe hơi", "Vì nhịp sống yên bình, không vội vã", "Vì Internet chậm", "Vì ít người"], answer: 1, explanation: "Đà Lạt không vội vã, dành thời gian cho hoa, tình yêu và bình yên.", explanationEn: "Da Lat doesn't rush – time is for flowers, love, and peace." },
        ],
      },
    ],
  },
  {
    id: "vn-reading-advanced",
    title: "Đọc hiểu nâng cao",
    titleEn: "Advanced Reading",
    icon: "📰",
    color: "from-cyan-500 to-blue-500",
    description: "Văn học, xã hội, ẩm thực và cuộc sống hiện đại",
    descriptionEn: "Literature, society, cuisine and modern life",
    category: "reading",
    lessons: [
      {
        id: "vn-read-6",
        title: "Truyện Kiều – Kiệt tác văn học dân tộc",
        titleEn: "The Tale of Kieu – A National Literary Masterpiece",
        level: "advanced",
        teacherInsight: "Người Việt có truyền thống 'bói Kiều' – mở ngẫu nhiên một trang Truyện Kiều để xem vận mệnh. Mỗi câu thơ đều chứa đựng triết lý sâu sắc về cuộc đời!",
        teacherInsightEn: "Vietnamese have a tradition of 'Kieu fortune-telling' – randomly opening a page of the Tale of Kieu to read one's fate. Every verse contains deep life philosophy!",
        theory: `## Truyện Kiều – 3.254 câu thơ chạm đến linh hồn 📜

Nếu phải chọn một tác phẩm đại diện cho cả dân tộc Việt Nam, không ai do dự: đó là Truyện Kiều. Được đại thi hào Nguyễn Du (1765-1820) sáng tác bằng thể thơ lục bát – thể thơ đặc trưng nhất của Việt Nam – Truyện Kiều kể về cuộc đời đầy sóng gió của Thúy Kiều trong 3.254 câu thơ tuyệt mỹ.

Thúy Kiều – người con gái "sắc sảo mặn mà" – là hiện thân của tài và mệnh. Nàng giỏi đàn, giỏi thơ, giỏi họa, nhưng chính cái tài ấy lại là nguyên nhân đưa nàng vào vòng xoáy nghiệt ngã. Để cứu cha, Kiều bán mình chuộc cha, bắt đầu mười lăm năm lưu lạc khắp chốn lầu xanh, từ tay người này sang tay người khác.

Điều kỳ diệu là dù trải qua bao khổ đau, Kiều vẫn giữ được tâm hồn trong sáng. Nàng biết ơn, biết hy sinh, biết tha thứ. Câu thơ nổi tiếng nhất – "Trăm năm trong cõi người ta, chữ tài chữ mệnh khéo là ghét nhau" – đã trở thành triết lý sống của cả dân tộc: tài năng và số phận luôn mâu thuẫn nhau.

Nguyễn Du không chỉ kể chuyện – ông vẽ tranh bằng chữ. Mùa xuân: "Cỏ non xanh tận chân trời, cành lê trắng điểm một vài bông hoa." Nỗi buồn: "Buồn trông cửa bể chiều hôm, thuyền ai thấp thoáng cánh buồm xa xa." Mỗi câu thơ là một bức tranh, mỗi đoạn là một bản nhạc.

Truyện Kiều không chỉ là văn học – đó là tấm gương phản chiếu tâm hồn Việt: kiên cường trong đau khổ, nhân ái trong nghịch cảnh, và luôn tin vào cái đẹp dù cuộc đời đầy bất công.`,
        theoryEn: `## The Tale of Kieu – 3,254 Verses That Touch the Soul 📜

If one had to choose a single work to represent the Vietnamese nation, there would be no hesitation: The Tale of Kieu. Written by the great poet Nguyen Du (1765-1820) in luc bat verse – Vietnam's most characteristic poetic form – The Tale of Kieu tells the turbulent life of Thuy Kieu in 3,254 exquisite verses.

Thuy Kieu – a girl of "sharp intelligence and rich beauty" – embodies the conflict between talent and fate. She excels at music, poetry, and painting, but her very talent leads her into a cruel vortex. To save her father, Kieu sells herself, beginning fifteen years of wandering through pleasure houses, passed from one person to another.

The wonder is that despite all suffering, Kieu preserves her pure soul. She knows gratitude, sacrifice, and forgiveness. The most famous verse – "In a hundred years of human existence, talent and fate forever clash" – has become the nation's life philosophy: talent and destiny are always in conflict.

Nguyen Du doesn't just tell stories – he paints with words. Spring: "Fresh grass stretches green to the horizon, white pear branches spotted with a few blossoms." Sorrow: "Sadly gazing at the evening harbor, someone's boat flickering, sails distant." Each verse is a painting, each passage a musical piece.

The Tale of Kieu is not just literature – it is a mirror reflecting the Vietnamese soul: resilient in suffering, compassionate in adversity, and always believing in beauty despite life's injustices.`,
        vocabulary: [
          { word: "đại thi hào", meaning: "nhà thơ vĩ đại", meaningEn: "great poet", example: "Nguyễn Du là đại thi hào.", exampleEn: "Nguyen Du is the great poet.", partOfSpeech: "noun" },
          { word: "lục bát", meaning: "thể thơ 6-8 chữ", meaningEn: "six-eight verse form", example: "Truyện Kiều viết bằng thể lục bát.", exampleEn: "Tale of Kieu uses luc bat verse.", partOfSpeech: "noun" },
          { word: "tuyệt mỹ", meaning: "đẹp hoàn hảo", meaningEn: "exquisite / sublime", example: "3.254 câu thơ tuyệt mỹ.", exampleEn: "3,254 exquisite verses.", partOfSpeech: "adjective" },
          { word: "nghiệt ngã", meaning: "tàn nhẫn, khắc nghiệt", meaningEn: "cruel / ruthless", example: "Vòng xoáy nghiệt ngã.", exampleEn: "A cruel vortex.", partOfSpeech: "adjective" },
          { word: "lưu lạc", meaning: "lang thang, phiêu bạt", meaningEn: "to wander / drift", example: "Mười lăm năm lưu lạc.", exampleEn: "Fifteen years of wandering.", partOfSpeech: "verb" },
          { word: "mâu thuẫn", meaning: "xung đột, trái ngược", meaningEn: "conflict / contradiction", example: "Tài và mệnh mâu thuẫn.", exampleEn: "Talent and fate conflict.", partOfSpeech: "noun" },
          { word: "kiên cường", meaning: "mạnh mẽ, không khuất phục", meaningEn: "resilient / steadfast", example: "Kiên cường trong đau khổ.", exampleEn: "Resilient in suffering.", partOfSpeech: "adjective" },
          { word: "nghịch cảnh", meaning: "hoàn cảnh khó khăn", meaningEn: "adversity", example: "Nhân ái trong nghịch cảnh.", exampleEn: "Compassionate in adversity.", partOfSpeech: "noun" },
          { word: "triết lý", meaning: "quan điểm sâu sắc về cuộc đời", meaningEn: "philosophy", example: "Triết lý sống.", exampleEn: "Life philosophy.", partOfSpeech: "noun" },
          { word: "phản chiếu", meaning: "soi, cho thấy hình ảnh", meaningEn: "to reflect / mirror", example: "Phản chiếu tâm hồn Việt.", exampleEn: "Reflecting the Vietnamese soul.", partOfSpeech: "verb" },
        ],
        quiz: [
          { question: "Truyện Kiều có bao nhiêu câu thơ?", questionEn: "How many verses in Tale of Kieu?", options: ["1.000", "2.000", "3.254", "5.000"], answer: 2, explanation: "Truyện Kiều có 3.254 câu thơ lục bát.", explanationEn: "3,254 verses in luc bat form." },
          { question: "Thúy Kiều bán mình để làm gì?", questionEn: "Why did Kieu sell herself?", options: ["Mua nhà", "Cứu cha", "Đi học", "Trả nợ bạn"], answer: 1, explanation: "Kiều bán mình để chuộc cha.", explanationEn: "Kieu sold herself to save her father." },
          { question: "Câu thơ nổi tiếng nhất nói về điều gì?", questionEn: "What does the most famous verse discuss?", options: ["Tình yêu", "Tài năng và số phận mâu thuẫn", "Thiên nhiên", "Chiến tranh"], answer: 1, explanation: "'Chữ tài chữ mệnh khéo là ghét nhau' – tài và mệnh luôn xung đột.", explanationEn: "Talent and fate are always in conflict." },
          { question: "Nguyễn Du sinh năm nào?", questionEn: "When was Nguyen Du born?", options: ["1665", "1720", "1765", "1820"], answer: 2, explanation: "Nguyễn Du sinh năm 1765.", explanationEn: "Nguyen Du was born in 1765." },
          { question: "Tác giả nói Truyện Kiều phản chiếu điều gì?", questionEn: "What does the Tale of Kieu reflect?", options: ["Lịch sử Trung Quốc", "Tâm hồn Việt Nam", "Kinh tế", "Thời tiết"], answer: 1, explanation: "Truyện Kiều phản chiếu tâm hồn Việt: kiên cường, nhân ái.", explanationEn: "It reflects the Vietnamese soul: resilient, compassionate." },
        ],
      },
      {
        id: "vn-read-7",
        title: "Hệ thống giáo dục Việt Nam",
        titleEn: "The Vietnamese Education System",
        level: "advanced",
        teacherInsight: "Kỳ thi tốt nghiệp THPT quốc gia ở Việt Nam căng thẳng đến mức được gọi là 'mùa thi' – cả gia đình và hàng xóm đều giữ yên lặng, mẹ nấu chè đỗ đen 'lấy may' cho con.",
        teacherInsightEn: "The national high school graduation exam is so stressful it's called 'exam season' – entire families and neighbors stay quiet, and mothers cook black bean sweet soup for good luck.",
        theory: `## Giáo dục Việt Nam – Từ truyền thống đến hiện đại 🎓

Với tỷ lệ biết chữ trên 95%, Việt Nam là một trong những quốc gia đầu tư mạnh nhất vào giáo dục ở Đông Nam Á. Nhưng hệ thống giáo dục Việt Nam không chỉ là con số – nó là tấm gương phản chiếu một xã hội coi trọng học vấn hơn mọi thứ.

Hệ thống giáo dục Việt Nam gồm năm cấp: Mầm non (3-5 tuổi), Tiểu học (lớp 1-5), Trung học cơ sở (lớp 6-9), Trung học phổ thông (lớp 10-12), và Đại học (4-6 năm). Trẻ em Việt Nam bắt đầu đi học từ 6 tuổi và phải hoàn thành 12 năm giáo dục phổ thông.

Điểm đặc biệt nhất là áp lực thi cử. Kỳ thi chuyển cấp (lớp 9 lên 10) và kỳ thi tốt nghiệp THPT quốc gia là hai "cánh cổng" quyết định tương lai. Mỗi mùa thi, cả xã hội như "nín thở": phụ huynh đội nắng chờ con trước cổng trường, hàng xóm tắt nhạc to, và các quán cà phê trở thành phòng ôn thi bất đắc dĩ.

Học thêm – hay "đi học thêm" – là hiện tượng đặc trưng. Phần lớn học sinh Việt Nam học thêm ngoài giờ, từ lớp 1 đến lớp 12. Điều này vừa phản ánh sự cạnh tranh khốc liệt, vừa tạo ra nghịch lý: trẻ em giỏi kiến thức sách vở nhưng thiếu thời gian cho sáng tạo và vui chơi.

Giáo dục đại học Việt Nam đang thay đổi mạnh mẽ. Các trường đại học top như Đại học Quốc gia Hà Nội, Đại học Bách khoa TP.HCM đã vào bảng xếp hạng quốc tế. Sinh viên Việt Nam ngày càng chọn ngành công nghệ thông tin, trí tuệ nhân tạo, và quản trị kinh doanh.

Tương lai giáo dục Việt Nam nằm ở sự cân bằng: giữa truyền thống tôn sư trọng đạo và tinh thần đổi mới sáng tạo.`,
        theoryEn: `## Vietnamese Education – From Tradition to Modernity 🎓

With a literacy rate above 95%, Vietnam is one of Southeast Asia's strongest investors in education. But the Vietnamese education system isn't just numbers – it's a mirror reflecting a society that values learning above all else.

The system comprises five levels: Preschool (3-5), Primary (grades 1-5), Lower Secondary (6-9), Upper Secondary (10-12), and University (4-6 years). Vietnamese children start school at 6 and must complete 12 years of general education.

The most distinctive aspect is exam pressure. The transition exam (grade 9 to 10) and the national graduation exam are two "gates" determining futures. Each exam season, society seems to "hold its breath": parents wait under the sun outside school gates, neighbors turn off loud music, and cafés become involuntary study rooms.

Extra tutoring – or "đi học thêm" – is a defining phenomenon. Most students attend after-school classes from grade 1 through 12. This reflects fierce competition but creates a paradox: children excel in textbook knowledge but lack time for creativity and play.

Higher education is changing rapidly. Top universities like Vietnam National University Hanoi and Ho Chi Minh City University of Technology have entered international rankings. Students increasingly choose IT, AI, and business administration.

The future lies in balance: between the tradition of respecting teachers and the spirit of innovation.`,
        vocabulary: [
          { word: "biết chữ", meaning: "có khả năng đọc viết", meaningEn: "literate", example: "Tỷ lệ biết chữ trên 95%.", exampleEn: "Literacy rate above 95%.", partOfSpeech: "verb phrase" },
          { word: "học vấn", meaning: "trình độ hiểu biết", meaningEn: "education / learning level", example: "Coi trọng học vấn.", exampleEn: "Valuing education.", partOfSpeech: "noun" },
          { word: "áp lực", meaning: "sức ép, căng thẳng", meaningEn: "pressure / stress", example: "Áp lực thi cử.", exampleEn: "Exam pressure.", partOfSpeech: "noun" },
          { word: "chuyển cấp", meaning: "chuyển từ cấp học này sang cấp khác", meaningEn: "transition between school levels", example: "Kỳ thi chuyển cấp.", exampleEn: "Level transition exam.", partOfSpeech: "noun" },
          { word: "cạnh tranh", meaning: "tranh đua, ganh đua", meaningEn: "competition", example: "Cạnh tranh khốc liệt.", exampleEn: "Fierce competition.", partOfSpeech: "noun" },
          { word: "nghịch lý", meaning: "mâu thuẫn, trái ngược", meaningEn: "paradox", example: "Tạo ra nghịch lý.", exampleEn: "Creates a paradox.", partOfSpeech: "noun" },
          { word: "sáng tạo", meaning: "nghĩ ra cái mới", meaningEn: "creativity / innovation", example: "Thiếu thời gian cho sáng tạo.", exampleEn: "Lack time for creativity.", partOfSpeech: "noun" },
          { word: "trí tuệ nhân tạo", meaning: "AI – máy móc thông minh", meaningEn: "artificial intelligence (AI)", example: "Ngành trí tuệ nhân tạo.", exampleEn: "AI field.", partOfSpeech: "noun" },
          { word: "tôn sư trọng đạo", meaning: "kính thầy, coi trọng đạo lý", meaningEn: "respect teachers and moral values", example: "Truyền thống tôn sư trọng đạo.", exampleEn: "Tradition of respecting teachers.", partOfSpeech: "idiom" },
          { word: "bất đắc dĩ", meaning: "không mong muốn nhưng phải làm", meaningEn: "involuntary / reluctant", example: "Phòng ôn thi bất đắc dĩ.", exampleEn: "An involuntary study room.", partOfSpeech: "adjective" },
        ],
        quiz: [
          { question: "Tỷ lệ biết chữ ở Việt Nam là bao nhiêu?", questionEn: "What is Vietnam's literacy rate?", options: ["~75%", "~85%", "Trên 95%", "100%"], answer: 2, explanation: "Trên 95%.", explanationEn: "Above 95%." },
          { question: "Tiểu học kéo dài mấy năm?", questionEn: "How long is primary school?", options: ["3 năm", "4 năm", "5 năm", "6 năm"], answer: 2, explanation: "Tiểu học từ lớp 1 đến lớp 5 (5 năm).", explanationEn: "Primary school is grades 1-5 (5 years)." },
          { question: "'Tôn sư trọng đạo' có nghĩa gì?", questionEn: "What does 'tôn sư trọng đạo' mean?", options: ["Yêu thiên nhiên", "Kính thầy, coi trọng đạo lý", "Học giỏi toán", "Chăm chỉ làm việc"], answer: 1, explanation: "Kính trọng thầy cô và coi trọng đạo lý giáo dục.", explanationEn: "Respecting teachers and valuing educational ethics." },
          { question: "Hiện tượng 'học thêm' phản ánh điều gì?", questionEn: "What does 'extra tutoring' reflect?", options: ["Giáo viên dạy kém", "Cạnh tranh khốc liệt", "Trường thiếu lớp", "Học sinh lười"], answer: 1, explanation: "Phản ánh sự cạnh tranh khốc liệt trong giáo dục.", explanationEn: "Reflects fierce competition in education." },
          { question: "Nghịch lý trong giáo dục VN là gì?", questionEn: "What is the educational paradox?", options: ["Quá ít trường", "Giỏi sách vở nhưng thiếu sáng tạo", "Quá nhiều giáo viên", "Học phí quá rẻ"], answer: 1, explanation: "Trẻ giỏi kiến thức sách nhưng thiếu sáng tạo và thời gian chơi.", explanationEn: "Children excel in textbook knowledge but lack creativity time." },
        ],
      },
      {
        id: "vn-read-8",
        title: "Kinh tế Việt Nam – Câu chuyện Đổi Mới",
        titleEn: "Vietnam's Economy – The Doi Moi Story",
        level: "advanced",
        teacherInsight: "Trước Đổi Mới, mỗi gia đình phải dùng 'sổ gạo' – tem phiếu do nhà nước phát – để mua lương thực. Hết tem phiếu thì nhịn đói. Ngày nay, Việt Nam xuất khẩu gạo thứ 3 thế giới!",
        teacherInsightEn: "Before Doi Moi, every family needed 'rice books' – ration coupons from the state – to buy food. No coupons meant going hungry. Today, Vietnam is the world's 3rd largest rice exporter!",
        theory: `## Đổi Mới – Phép màu kinh tế Việt Nam 📈

Năm 1986, Việt Nam đứng trước bờ vực. Kinh tế kiệt quệ, lạm phát lên đến 800%, hàng triệu người thiếu ăn. Trong bối cảnh tuyệt vọng ấy, Đại hội Đảng lần thứ VI quyết định một bước đi táo bạo: Đổi Mới – chuyển từ kinh tế kế hoạch tập trung sang kinh tế thị trường định hướng xã hội chủ nghĩa.

Kết quả đến nhanh hơn bất kỳ ai tưởng tượng. GDP bình quân đầu người từ 100 USD (1986) tăng lên 4.100 USD (2023). Tỷ lệ nghèo giảm từ 58% xuống dưới 5%. Việt Nam trở thành "con hổ châu Á" mới với tốc độ tăng trưởng trung bình 6-7% mỗi năm.

Xuất khẩu là động lực chính. Từ một nước nhập khẩu gạo, Việt Nam vươn lên thành nước xuất khẩu gạo thứ 3 thế giới, cà phê thứ 2, hạt điều và hồ tiêu số 1. Samsung đặt nhà máy lớn nhất toàn cầu tại Bắc Ninh, biến Việt Nam thành công xưởng điện tử thế giới.

Nhưng không phải mọi thứ đều màu hồng. Bất bình đẳng giàu nghèo gia tăng, ô nhiễm môi trường đáng báo động, và nền kinh tế vẫn phụ thuộc nhiều vào đầu tư nước ngoài (FDI). Thách thức lớn nhất là "bẫy thu nhập trung bình" – liệu Việt Nam có thể thoát khỏi mức thu nhập trung bình để trở thành nước phát triển?

Câu trả lời đang được viết bởi thế hệ trẻ Việt Nam – những người startup công nghệ, những nông dân thông minh sử dụng drone, và những doanh nhân mang thương hiệu Việt ra thế giới. Đổi Mới không kết thúc năm 1986 – nó đang tiếp tục mỗi ngày.`,
        theoryEn: `## Doi Moi – Vietnam's Economic Miracle 📈

In 1986, Vietnam stood at the brink. The economy was devastated, inflation reached 800%, and millions went hungry. In that desperate context, the Sixth Party Congress made a bold move: Doi Moi – shifting from a centrally planned economy to a socialist-oriented market economy.

Results came faster than anyone imagined. Per capita GDP rose from $100 (1986) to $4,100 (2023). Poverty dropped from 58% to below 5%. Vietnam became a new "Asian tiger" with average growth of 6-7% annually.

Exports drive the engine. From a rice importer, Vietnam rose to become the world's 3rd largest rice exporter, 2nd in coffee, 1st in cashews and pepper. Samsung built its largest global factory in Bac Ninh, turning Vietnam into the world's electronics workshop.

But not everything is rosy. Wealth inequality is growing, environmental pollution is alarming, and the economy still depends heavily on foreign direct investment (FDI). The biggest challenge is the "middle-income trap" – can Vietnam escape middle-income status to become a developed nation?

The answer is being written by Vietnam's young generation – tech startup founders, smart farmers using drones, and entrepreneurs bringing Vietnamese brands to the world. Doi Moi didn't end in 1986 – it continues every day.`,
        vocabulary: [
          { word: "kiệt quệ", meaning: "hoàn toàn suy yếu", meaningEn: "devastated / exhausted", example: "Kinh tế kiệt quệ.", exampleEn: "Devastated economy.", partOfSpeech: "adjective" },
          { word: "lạm phát", meaning: "giá cả tăng liên tục", meaningEn: "inflation", example: "Lạm phát 800%.", exampleEn: "800% inflation.", partOfSpeech: "noun" },
          { word: "táo bạo", meaning: "dũng cảm, dám làm", meaningEn: "bold / audacious", example: "Bước đi táo bạo.", exampleEn: "A bold move.", partOfSpeech: "adjective" },
          { word: "tăng trưởng", meaning: "phát triển, lớn lên", meaningEn: "growth", example: "Tốc độ tăng trưởng 6-7%.", exampleEn: "6-7% growth rate.", partOfSpeech: "noun" },
          { word: "công xưởng", meaning: "nhà máy sản xuất", meaningEn: "factory / workshop", example: "Công xưởng điện tử thế giới.", exampleEn: "World's electronics workshop.", partOfSpeech: "noun" },
          { word: "bất bình đẳng", meaning: "không công bằng", meaningEn: "inequality", example: "Bất bình đẳng giàu nghèo.", exampleEn: "Rich-poor inequality.", partOfSpeech: "noun" },
          { word: "ô nhiễm", meaning: "bẩn, hại sức khỏe", meaningEn: "pollution", example: "Ô nhiễm môi trường.", exampleEn: "Environmental pollution.", partOfSpeech: "noun" },
          { word: "bẫy thu nhập trung bình", meaning: "nước mắc kẹt ở mức thu nhập trung bình", meaningEn: "middle-income trap", example: "Thoát khỏi bẫy thu nhập trung bình.", exampleEn: "Escape the middle-income trap.", partOfSpeech: "noun" },
          { word: "doanh nhân", meaning: "người kinh doanh", meaningEn: "entrepreneur", example: "Doanh nhân mang thương hiệu Việt ra thế giới.", exampleEn: "Entrepreneurs bringing Vietnamese brands globally.", partOfSpeech: "noun" },
          { word: "đầu tư nước ngoài", meaning: "vốn từ các nước khác", meaningEn: "foreign investment (FDI)", example: "Phụ thuộc đầu tư nước ngoài.", exampleEn: "Dependent on foreign investment.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "Đổi Mới bắt đầu năm nào?", questionEn: "When did Doi Moi begin?", options: ["1975", "1980", "1986", "1990"], answer: 2, explanation: "Đổi Mới bắt đầu năm 1986.", explanationEn: "Doi Moi began in 1986." },
          { question: "GDP đầu người VN năm 2023 khoảng bao nhiêu?", questionEn: "What was per capita GDP in 2023?", options: ["$1.000", "$ 2.500", "$4.100", "$10.000"], answer: 2, explanation: "GDP bình quân đầu người khoảng 4.100 USD.", explanationEn: "Per capita GDP was about $4,100." },
          { question: "Samsung đặt nhà máy lớn nhất ở đâu?", questionEn: "Where is Samsung's largest factory?", options: ["Hà Nội", "Bắc Ninh", "TP.HCM", "Đà Nẵng"], answer: 1, explanation: "Samsung đặt nhà máy lớn nhất tại Bắc Ninh.", explanationEn: "Samsung's largest factory is in Bac Ninh." },
          { question: "'Bẫy thu nhập trung bình' là gì?", questionEn: "What is the 'middle-income trap'?", options: ["Không đủ tiền tiêu", "Nước mắc kẹt không thể trở thành nước phát triển", "Thiếu ngân hàng", "Xuất khẩu giảm"], answer: 1, explanation: "Nước mắc kẹt ở mức thu nhập trung bình, không vươn lên được.", explanationEn: "A country stuck at middle-income, unable to advance." },
          { question: "Tỷ lệ nghèo ở VN giảm từ bao nhiêu?", questionEn: "How much did poverty decrease?", options: ["70% xuống 20%", "58% xuống dưới 5%", "40% xuống 10%", "80% xuống 30%"], answer: 1, explanation: "Từ 58% xuống dưới 5%.", explanationEn: "From 58% to below 5%." },
        ],
      },
      {
        id: "vn-read-9",
        title: "Phong tục cưới hỏi – Nghệ thuật kết nối",
        titleEn: "Vietnamese Wedding Customs – The Art of Connection",
        level: "intermediate",
        teacherInsight: "Số tráp (mâm quả) luôn là số lẻ: 5, 7, 9, 11 – vì người Việt tin số lẻ mang lại may mắn và sự phát triển. Nhà gái trả lại nửa mỗi tráp, tượng trưng cho sự chia sẻ giữa hai gia đình.",
        teacherInsightEn: "The number of trays is always odd: 5, 7, 9, 11 – because Vietnamese believe odd numbers bring luck and growth. The bride's family returns half of each tray, symbolizing sharing between families.",
        theory: `## Cưới hỏi Việt Nam – Khi hai gia đình thành một 💍

Đám cưới Việt Nam không chỉ là chuyện của hai người yêu nhau – đó là cuộc gặp gỡ trọng đại giữa hai gia đình, hai dòng họ, và đôi khi, hai vùng văn hóa. Phong tục cưới hỏi Việt Nam là một hành trình dài, phức tạp, nhưng đầy ý nghĩa.

Mọi thứ bắt đầu bằng Lễ Dạm Ngõ – buổi gặp mặt đầu tiên giữa hai gia đình. Nhà trai mang lễ vật nhỏ đến nhà gái, giới thiệu nhau, và "xin phép" được tìm hiểu. Đây là bước "đặt nền móng" cho mối quan hệ hai nhà.

Tiếp theo là Lễ Ăn Hỏi – phần quan trọng nhất. Đoàn nhà trai mặc vest chỉnh tề, bưng tráp đỏ xếp hàng nghiêm chỉnh. Tráp (mâm quả) chứa trầu cau, rượu, trà, bánh phu thê, hoa quả – mỗi thứ mang một ý nghĩa: trầu cau tượng trưng cho tình yêu bền chặt, bánh phu thê (bánh xu xê) tượng trưng cho sự hòa hợp vợ chồng.

Ngày cưới, cô dâu mặc áo dài đỏ – màu đỏ tượng trưng cho may mắn và hạnh phúc. Chú rể đến đón dâu, làm lễ gia tiên trước bàn thờ tổ tiên, xin phép ông bà cho đôi trẻ kết hôn. Khoảnh khắc cô dâu khóc khi rời nhà cha mẹ là khoảnh khắc xúc động nhất – dù biết rằng mình đang đi đến hạnh phúc.

Đám cưới ở nông thôn vẫn giữ nhiều nét truyền thống: dựng rạp, mời cả xóm, nấu cỗ tại nhà. Trong khi đám cưới thành thị hiện đại với nhà hàng, DJ, và photobox. Nhưng dù ở đâu, một điều không bao giờ thay đổi: tình yêu gia đình là nền tảng của mọi đám cưới Việt.`,
        theoryEn: `## Vietnamese Weddings – When Two Families Become One 💍

A Vietnamese wedding isn't just about two people in love – it's a momentous meeting between two families, two clans, and sometimes, two cultural regions. Vietnamese wedding customs are a long, complex journey, but one rich with meaning.

Everything begins with Le Dam Ngo – the first meeting between families. The groom's family brings small gifts to the bride's home, makes introductions, and "asks permission" to get to know each other. This is the "foundation-laying" step.

Next comes Le An Hoi – the most important part. The groom's party in neat suits carries red trays in orderly lines. Trays contain betel and areca, wine, tea, phu the cake, and fruit – each carrying meaning: betel and areca symbolize enduring love, phu the cake (xu xe cake) represents marital harmony.

On the wedding day, the bride wears a red ao dai – red symbolizing luck and happiness. The groom comes to receive the bride, performs the ancestor ceremony before the family altar, asking grandparents' blessing for the couple. The moment the bride cries leaving her parents' home is the most touching – even knowing she's walking toward happiness.

Rural weddings preserve many traditions: setting up tents, inviting the whole neighborhood, cooking banquets at home. Urban weddings are modern with restaurants, DJs, and photo booths. But wherever it happens, one thing never changes: family love is the foundation of every Vietnamese wedding.`,
        vocabulary: [
          { word: "trọng đại", meaning: "rất quan trọng", meaningEn: "momentous / significant", example: "Cuộc gặp gỡ trọng đại.", exampleEn: "A momentous meeting.", partOfSpeech: "adjective" },
          { word: "dòng họ", meaning: "gia đình mở rộng, cùng họ", meaningEn: "clan / extended family", example: "Hai dòng họ.", exampleEn: "Two clans.", partOfSpeech: "noun" },
          { word: "lễ vật", meaning: "quà biếu trong lễ", meaningEn: "ceremonial gifts", example: "Mang lễ vật đến.", exampleEn: "Bringing ceremonial gifts.", partOfSpeech: "noun" },
          { word: "tráp", meaning: "mâm quả đám hỏi", meaningEn: "ceremonial tray", example: "Bưng tráp đỏ.", exampleEn: "Carrying red trays.", partOfSpeech: "noun" },
          { word: "trầu cau", meaning: "lá trầu và quả cau", meaningEn: "betel leaf and areca nut", example: "Trầu cau tượng trưng tình yêu.", exampleEn: "Betel and areca symbolize love.", partOfSpeech: "noun" },
          { word: "tượng trưng", meaning: "đại diện, biểu thị", meaningEn: "to symbolize / represent", example: "Màu đỏ tượng trưng may mắn.", exampleEn: "Red symbolizes luck.", partOfSpeech: "verb" },
          { word: "gia tiên", meaning: "tổ tiên, ông bà", meaningEn: "ancestors", example: "Lễ gia tiên.", exampleEn: "Ancestor ceremony.", partOfSpeech: "noun" },
          { word: "bền chặt", meaning: "vững, không dễ tan vỡ", meaningEn: "enduring / strong", example: "Tình yêu bền chặt.", exampleEn: "Enduring love.", partOfSpeech: "adjective" },
          { word: "nền tảng", meaning: "cơ sở, gốc", meaningEn: "foundation / basis", example: "Nền tảng của hạnh phúc.", exampleEn: "The foundation of happiness.", partOfSpeech: "noun" },
          { word: "xúc động", meaning: "cảm động, lay động lòng", meaningEn: "touching / emotional", example: "Khoảnh khắc xúc động nhất.", exampleEn: "The most touching moment.", partOfSpeech: "adjective" },
        ],
        quiz: [
          { question: "Lễ Dạm Ngõ là gì?", questionEn: "What is Le Dam Ngo?", options: ["Đám cưới", "Buổi gặp mặt đầu tiên", "Lễ rước dâu", "Tiệc cưới"], answer: 1, explanation: "Buổi gặp mặt đầu tiên giữa hai gia đình.", explanationEn: "The first meeting between two families." },
          { question: "Số tráp thường là số gì?", questionEn: "What kind of number are the trays?", options: ["Số chẵn", "Số lẻ", "Số nguyên tố", "Bất kỳ"], answer: 1, explanation: "Số lẻ: 5, 7, 9, 11.", explanationEn: "Odd numbers: 5, 7, 9, 11." },
          { question: "Trầu cau tượng trưng cho điều gì?", questionEn: "What do betel and areca symbolize?", options: ["Giàu có", "Tình yêu bền chặt", "Sức khỏe", "May mắn"], answer: 1, explanation: "Trầu cau tượng trưng cho tình yêu bền chặt.", explanationEn: "They symbolize enduring love." },
          { question: "Cô dâu mặc áo dài màu gì?", questionEn: "What color ao dai does the bride wear?", options: ["Trắng", "Xanh", "Đỏ", "Vàng"], answer: 2, explanation: "Áo dài đỏ – tượng trưng may mắn và hạnh phúc.", explanationEn: "Red ao dai – symbolizing luck and happiness." },
          { question: "Khoảnh khắc xúc động nhất trong đám cưới là gì?", questionEn: "What's the most touching moment?", options: ["Cắt bánh", "Cô dâu khóc khi rời nhà", "Nhảy điệu đầu tiên", "Ném hoa"], answer: 1, explanation: "Cô dâu khóc khi rời nhà cha mẹ.", explanationEn: "The bride crying when leaving her parents' home." },
        ],
      },
      {
        id: "vn-read-10",
        title: "Cà phê Việt Nam – Văn hóa trong từng giọt",
        titleEn: "Vietnamese Coffee – Culture in Every Drop",
        level: "beginner",
        teacherInsight: "Cà phê trứng (egg coffee) được phát minh ở Hà Nội năm 1946 khi sữa tươi khan hiếm. Ông Nguyễn Văn Giảng thay sữa bằng lòng đỏ trứng đánh bông – và một huyền thoại ra đời!",
        teacherInsightEn: "Egg coffee was invented in Hanoi in 1946 when fresh milk was scarce. Mr. Nguyen Van Giang replaced milk with whipped egg yolk – and a legend was born!",
        theory: `## Cà phê Việt Nam – Không chỉ là thức uống ☕

Việt Nam là nước xuất khẩu cà phê lớn thứ 2 thế giới, chỉ sau Brazil. Nhưng với người Việt, cà phê không chỉ là hạt, là nước, là caffeine – cà phê là văn hóa, là lối sống, là cách kết nối con người.

Sáng sớm ở bất kỳ đâu tại Việt Nam, bạn sẽ thấy cảnh tượng quen thuộc: những chiếc ghế nhựa thấp bày trên vỉa hè, phin cà phê nhỏ giọt chậm rãi, và người ngồi uống – không vội vàng, không gấp gáp – chỉ đơn giản là thưởng thức.

Cà phê phin – linh hồn cà phê Việt – là nghệ thuật của sự chờ đợi. Đặt phin lên ly, cho nước nóng vào, và chờ. Từng giọt cà phê đen nhánh nhỏ xuống lớp sữa đặc trắng phía dưới, tạo thành hai tầng đẹp mắt. Khi khuấy đều, ly cà phê sữa đá trở thành "nhiên liệu" cho cả một ngày dài.

Nhưng cà phê Việt Nam không dừng ở đó. Cà phê trứng – phát minh tại Hà Nội – là sự kết hợp bất ngờ giữa cà phê đen và lòng đỏ trứng gà đánh bông với đường. Kết quả: một thứ kem mềm mịn, ngọt béo nằm trên lớp cà phê đắng, tạo nên hương vị không đâu trên thế giới có được.

Cà phê muối Huế – cà phê đen pha chút muối biển và kem béo – mang hương vị "mặn mà" đặc trưng. Cà phê dừa – cà phê trộn nước cốt dừa – là phát minh của giới trẻ Sài Gòn, đã lan tỏa khắp thế giới.

Quán cà phê ở Việt Nam cũng là một nghệ thuật. Từ quán vỉa hè 5.000đ một ly, đến quán view hồ Tây sang trọng, từ quán cà phê sách yên tĩnh đến quán cà phê nhạc sống sôi động – mỗi quán là một thế giới riêng, và mỗi ly cà phê là một câu chuyện.`,
        theoryEn: `## Vietnamese Coffee – More Than Just a Drink ☕

Vietnam is the world's 2nd largest coffee exporter, after Brazil. But for Vietnamese, coffee isn't just beans, water, or caffeine – coffee is culture, lifestyle, and a way of connecting people.

Early morning anywhere in Vietnam, you'll see a familiar scene: low plastic chairs set on sidewalks, a phin filter dripping slowly, and people sitting – unhurried, unrushed – simply savoring.

Phin coffee – the soul of Vietnamese coffee – is the art of waiting. Place the phin on the glass, pour in hot water, and wait. Each drop of jet-black coffee falls onto a layer of white condensed milk below, forming two beautiful layers. When stirred, the iced milk coffee becomes "fuel" for an entire long day.

But Vietnamese coffee doesn't stop there. Egg coffee – invented in Hanoi – is an unexpected fusion of black coffee and sugar-whipped egg yolk. The result: a soft, sweet cream sitting atop bitter coffee, creating a flavor found nowhere else in the world.

Hue salt coffee – black coffee with a touch of sea salt and cream – brings a distinctively "savory" taste. Coconut coffee – coffee mixed with coconut cream – is a Saigon youth invention that has spread worldwide.

Vietnamese cafés are also an art form. From 5,000 VND sidewalk stalls to elegant West Lake-view lounges, from quiet book cafés to lively live-music spots – each café is its own world, and each cup of coffee is a story.`,
        vocabulary: [
          { word: "xuất khẩu", meaning: "bán ra nước ngoài", meaningEn: "export", example: "Xuất khẩu cà phê thứ 2.", exampleEn: "2nd largest coffee export.", partOfSpeech: "noun/verb" },
          { word: "vỉa hè", meaning: "lề đường", meaningEn: "sidewalk / pavement", example: "Cà phê vỉa hè.", exampleEn: "Sidewalk coffee.", partOfSpeech: "noun" },
          { word: "phin", meaning: "bộ lọc cà phê truyền thống", meaningEn: "traditional coffee filter", example: "Phin cà phê nhỏ giọt.", exampleEn: "Coffee dripping through the phin.", partOfSpeech: "noun" },
          { word: "sữa đặc", meaning: "sữa cô đặc có đường", meaningEn: "condensed milk", example: "Lớp sữa đặc trắng.", exampleEn: "Layer of white condensed milk.", partOfSpeech: "noun" },
          { word: "đánh bông", meaning: "khuấy mạnh cho nổi bọt", meaningEn: "to whip / froth", example: "Trứng đánh bông.", exampleEn: "Whipped egg.", partOfSpeech: "verb" },
          { word: "mềm mịn", meaning: "mượt, không sần sùi", meaningEn: "smooth / silky", example: "Kem mềm mịn.", exampleEn: "Smooth cream.", partOfSpeech: "adjective" },
          { word: "lan tỏa", meaning: "phát triển rộng ra", meaningEn: "to spread / radiate", example: "Lan tỏa khắp thế giới.", exampleEn: "Spread worldwide.", partOfSpeech: "verb" },
          { word: "nước cốt dừa", meaning: "nước ép từ cơm dừa", meaningEn: "coconut cream / coconut milk", example: "Cà phê trộn nước cốt dừa.", exampleEn: "Coffee mixed with coconut cream.", partOfSpeech: "noun" },
          { word: "thưởng thức", meaning: "tận hưởng, cảm nhận", meaningEn: "to savor / enjoy", example: "Thưởng thức cà phê.", exampleEn: "Savor coffee.", partOfSpeech: "verb" },
          { word: "nhiên liệu", meaning: "chất cung cấp năng lượng", meaningEn: "fuel", example: "Nhiên liệu cho ngày dài.", exampleEn: "Fuel for a long day.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "Việt Nam xuất khẩu cà phê thứ mấy thế giới?", questionEn: "Vietnam's coffee export rank?", options: ["1", "2", "3", "5"], answer: 1, explanation: "Thứ 2, sau Brazil.", explanationEn: "2nd, after Brazil." },
          { question: "Cà phê trứng phát minh ở đâu?", questionEn: "Where was egg coffee invented?", options: ["Sài Gòn", "Hà Nội", "Huế", "Đà Lạt"], answer: 1, explanation: "Phát minh tại Hà Nội năm 1946.", explanationEn: "Invented in Hanoi in 1946." },
          { question: "Cà phê muối là đặc sản vùng nào?", questionEn: "Where is salt coffee from?", options: ["Hà Nội", "Sài Gòn", "Huế", "Đà Nẵng"], answer: 2, explanation: "Cà phê muối là đặc sản Huế.", explanationEn: "Salt coffee is a Hue specialty." },
          { question: "'Thưởng thức' có nghĩa gần nhất với:", questionEn: "'Thưởng thức' is closest to:", options: ["Uống vội", "Tận hưởng, cảm nhận", "Nấu ăn", "Bán hàng"], answer: 1, explanation: "'Thưởng thức' nghĩa là tận hưởng, cảm nhận chậm rãi.", explanationEn: "'Thưởng thức' means to savor and enjoy slowly." },
          { question: "Cà phê phin đặc biệt ở điểm nào?", questionEn: "What makes phin coffee special?", options: ["Pha nhanh", "Nghệ thuật chờ đợi, nhỏ giọt chậm", "Dùng máy pha", "Uống nóng"], answer: 1, explanation: "Phin cà phê nhỏ giọt chậm rãi – nghệ thuật của sự chờ đợi.", explanationEn: "The phin drips slowly – the art of waiting." },
        ],
      },
      {
        id: "vn-read-16",
        title: "Bánh mì – Di sản ẩm thực thế giới",
        titleEn: "Banh Mi – A World Culinary Heritage",
        level: "intermediate",
        teacherInsight: "Năm 2011, từ 'Banh Mi' được thêm vào từ điển Oxford. Đây là một trong số ít từ tiếng Việt được quốc tế hóa, cùng với 'pho' và 'ao dai'!",
        teacherInsightEn: "In 2011, 'Banh Mi' was added to the Oxford Dictionary. It's one of the few Vietnamese words to be internationalized, along with 'pho' and 'ao dai'!",
        theory: `## Bánh mì – Khi Đông gặp Tây trên một ổ bánh 🥖

Bánh mì Việt Nam là minh chứng hoàn hảo cho một sự thật: những điều tuyệt vời nhất thường sinh ra từ sự va chạm văn hóa. Khi người Pháp mang ổ baguette đến Việt Nam trong thời kỳ thuộc địa, không ai ngờ rằng nó sẽ trở thành một trong những món ăn đường phố nổi tiếng nhất hành tinh.

Baguette Pháp – dài, cứng, ruột đặc – khi "nhập cư" vào Việt Nam đã được người Việt "phiên dịch" lại hoàn toàn. Vỏ được làm từ bột mì pha bột gạo – tạo ra lớp vỏ mỏng hơn, giòn hơn, nhẹ hơn. Ruột xốp như mây, khác hẳn nguyên bản Pháp. Kích thước nhỏ gọn hơn, vừa tay cầm, vừa túi tiền.

Nhưng phép màu thực sự nằm ở bên trong. Pate gan – di sản Pháp. Chả lụa – đặc sản Việt. Dưa leo, rau mùi, đồ chua – sự tươi mát của nhiệt đới. Ớt, tương ớt – lửa cay phương Đông. Mỗi miếng cắn là một cuộc đối thoại giữa hai nền văn minh: béo ngậy của Pháp và thanh mát của Việt.

Xe bánh mì – cái xe đẩy nhỏ bé trên vỉa hè – là "nhà hàng" bình dân nhất thế giới. Chỉ với 15.000-25.000 đồng (chưa đầy 1 USD), bạn có một bữa ăn hoàn chỉnh. Người bán thoăn thoắt xẻ bánh, phết pate, xếp chả, rắc rau – mọi thao tác nhanh như một nghệ sĩ xiếc.

Năm 2020, Google Doodle vinh danh bánh mì Việt Nam. Năm 2011, từ "Banh Mi" được thêm vào từ điển Oxford. Từ Sài Gòn đến New York, từ Hà Nội đến London – bánh mì Việt Nam đã chinh phục thế giới, không phải bằng sự xa hoa mà bằng sự giản dị tuyệt đối.`,
        theoryEn: `## Banh Mi – When East Meets West on a Roll 🥖

Vietnamese banh mi is perfect proof of a truth: the greatest things often emerge from cultural collision. When the French brought the baguette to Vietnam during the colonial period, no one imagined it would become one of the planet's most famous street foods.

The French baguette – long, hard, dense – when "immigrating" to Vietnam was completely "translated" by Vietnamese. The crust uses wheat flour mixed with rice flour – creating a thinner, crispier, lighter shell. The interior is cloud-fluffy, completely different from the French original. The size is compact, fitting the hand and the budget.

But the real magic lies inside. Liver pâté – French heritage. Cha lua (Vietnamese ham) – Vietnamese specialty. Cucumber, cilantro, pickled vegetables – tropical freshness. Chili, chili sauce – Eastern fire. Each bite is a dialogue between two civilizations: French richness and Vietnamese freshness.

The banh mi cart – that small pushcart on the sidewalk – is the world's most humble "restaurant." For just 15,000-25,000 VND (under $1 USD), you get a complete meal. Vendors deftly slice bread, spread pâté, layer ham, sprinkle herbs – every motion swift as a circus artist.

In 2020, Google Doodle honored Vietnamese banh mi. In 2011, "Banh Mi" was added to the Oxford Dictionary. From Saigon to New York, Hanoi to London – Vietnamese banh mi has conquered the world, not with luxury but with absolute simplicity.`,
        vocabulary: [
          { word: "thuộc địa", meaning: "nước bị nước khác cai trị", meaningEn: "colony / colonial period", example: "Thời kỳ thuộc địa Pháp.", exampleEn: "The French colonial period.", partOfSpeech: "noun" },
          { word: "baguette", meaning: "bánh mì dài kiểu Pháp", meaningEn: "baguette (French bread)", example: "Baguette Pháp dài và cứng.", exampleEn: "French baguette is long and hard.", partOfSpeech: "noun" },
          { word: "xốp", meaning: "nhẹ, có nhiều lỗ nhỏ", meaningEn: "spongy / fluffy", example: "Ruột bánh xốp như mây.", exampleEn: "Interior fluffy as clouds.", partOfSpeech: "adjective" },
          { word: "pate", meaning: "nhân gan xay nhuyễn", meaningEn: "pâté (liver paste)", example: "Phết pate lên bánh.", exampleEn: "Spread pâté on bread.", partOfSpeech: "noun" },
          { word: "đồ chua", meaning: "rau củ ngâm giấm", meaningEn: "pickled vegetables", example: "Đồ chua cà rốt, củ cải.", exampleEn: "Pickled carrots and radish.", partOfSpeech: "noun" },
          { word: "thoăn thoắt", meaning: "rất nhanh và khéo", meaningEn: "deftly / swiftly", example: "Thoăn thoắt xẻ bánh.", exampleEn: "Deftly slicing bread.", partOfSpeech: "adverb" },
          { word: "chinh phục", meaning: "thắng, làm cho ngưỡng mộ", meaningEn: "to conquer / win over", example: "Chinh phục thế giới.", exampleEn: "Conquer the world.", partOfSpeech: "verb" },
          { word: "giản dị", meaning: "đơn giản, không cầu kỳ", meaningEn: "simple / humble", example: "Sự giản dị tuyệt đối.", exampleEn: "Absolute simplicity.", partOfSpeech: "adjective" },
          { word: "va chạm", meaning: "gặp nhau, xung đột", meaningEn: "collision / encounter", example: "Va chạm văn hóa.", exampleEn: "Cultural collision.", partOfSpeech: "noun" },
          { word: "vinh danh", meaning: "tôn vinh, ca ngợi", meaningEn: "to honor / celebrate", example: "Google vinh danh bánh mì.", exampleEn: "Google honored banh mi.", partOfSpeech: "verb" },
        ],
        quiz: [
          { question: "Vỏ bánh mì VN khác baguette Pháp ở điểm nào?", questionEn: "How is VN banh mi crust different from French baguette?", options: ["Dày hơn", "Mỏng hơn, giòn hơn, pha bột gạo", "Giống hệt", "Không có vỏ"], answer: 1, explanation: "Vỏ bánh mì VN mỏng hơn, giòn hơn do pha bột gạo.", explanationEn: "VN crust is thinner and crispier due to rice flour." },
          { question: "Một ổ bánh mì giá bao nhiêu?", questionEn: "How much does a banh mi cost?", options: ["50.000đ", "15.000-25.000đ", "100.000đ", "5.000đ"], answer: 1, explanation: "Khoảng 15.000-25.000 đồng (chưa đầy 1 USD).", explanationEn: "About 15,000-25,000 VND (under $1)." },
          { question: "Từ 'Banh Mi' xuất hiện trong từ điển nào?", questionEn: "Which dictionary added 'Banh Mi'?", options: ["Cambridge", "Oxford", "Merriam-Webster", "Larousse"], answer: 1, explanation: "Từ điển Oxford thêm 'Banh Mi' năm 2011.", explanationEn: "Oxford Dictionary added 'Banh Mi' in 2011." },
          { question: "'Thoăn thoắt' có nghĩa gần nhất với:", questionEn: "'Thoăn thoắt' is closest to:", options: ["Chậm chạp", "Rất nhanh và khéo", "Vụng về", "Lặng lẽ"], answer: 1, explanation: "'Thoăn thoắt' nghĩa là nhanh và khéo léo.", explanationEn: "'Thoăn thoắt' means swift and deft." },
          { question: "Tại sao tác giả nói bánh mì là 'cuộc đối thoại giữa hai nền văn minh'?", questionEn: "Why does the author call banh mi 'a dialogue between two civilizations'?", options: ["Vì có 2 lớp", "Vì kết hợp nguyên liệu Pháp và Việt", "Vì bán ở 2 nước", "Vì có 2 loại"], answer: 1, explanation: "Pate (Pháp) + chả lụa, rau (Việt) = đối thoại Đông-Tây.", explanationEn: "Pâté (French) + ham, herbs (Vietnamese) = East-West dialogue." },
        ],
      },
      {
        id: "vn-read-17",
        title: "Áo dài – Linh hồn trên tà lụa",
        titleEn: "Ao Dai – Soul on Silk",
        level: "intermediate",
        teacherInsight: "Áo dài hiện đại do họa sĩ Nguyễn Cát Tường thiết kế năm 1930, lấy cảm hứng từ thời trang Paris. Trước đó, áo dài có 5 thân và rất rộng!",
        teacherInsightEn: "The modern ao dai was designed by artist Nguyen Cat Tuong in 1930, inspired by Paris fashion. Before that, ao dai had 5 panels and was very loose!",
        theory: `## Áo dài – Không chỉ là trang phục 👗

Nếu mỗi quốc gia có một biểu tượng mặc trên người, thì Việt Nam chọn áo dài. Tà áo dài bay trong gió, mềm mại và thanh thoát, đã trở thành hình ảnh đẹp nhất đại diện cho phụ nữ Việt Nam trên toàn thế giới.

Áo dài có lịch sử hơn 300 năm, nhưng phiên bản hiện đại – ôm sát cơ thể, tà dài chấm gót – ra đời vào thập niên 1930 nhờ họa sĩ Nguyễn Cát Tường. Ông lấy cảm hứng từ thời trang Paris, kết hợp với nét truyền thống Việt Nam, tạo ra một kiệt tác thời trang vượt thời gian.

Vải áo dài rất quan trọng. Lụa tơ tằm – mỏng, mịn, có ánh – là chất liệu cao cấp nhất. Gấm – với hoa văn dệt nổi – dùng cho dịp trang trọng. Voan – nhẹ, bay bổng – tạo nên vẻ đẹp mộng mơ. Mỗi loại vải mang một tính cách: lụa sang trọng, gấm uy nghiêm, voan lãng mạn.

Màu sắc áo dài cũng chứa đựng ý nghĩa. Trắng – cho nữ sinh, tượng trưng cho sự trong trắng. Đỏ – cho cô dâu, tượng trưng may mắn. Vàng – cho hoàng gia, tượng trưng quyền lực. Xanh – cho ngày thường, tượng trưng hòa bình.

Áo dài không chỉ dành cho phụ nữ. Nam giới cũng mặc áo dài trong các dịp lễ, đặc biệt là đám cưới. Áo dài nam thường đơn giản hơn, màu tối, chất liệu dày dặn, kết hợp với khăn đóng trên đầu.

Ngày nay, áo dài xuất hiện trên sàn diễn thời trang quốc tế, trong phim Hollywood, và trên đường phố thế giới. Nhưng đẹp nhất vẫn là hình ảnh nữ sinh Việt Nam trong tà áo dài trắng, đạp xe qua những con đường rợp bóng cây – một bức tranh mà thời gian không thể phai.`,
        theoryEn: `## Ao Dai – More Than Just a Dress 👗

If every nation has a symbol worn on the body, Vietnam chooses the ao dai. The flowing ao dai panels in the wind, soft and graceful, have become the most beautiful image representing Vietnamese women worldwide.

The ao dai has over 300 years of history, but the modern version – body-hugging with ankle-length panels – was born in the 1930s thanks to artist Nguyen Cat Tuong. He drew inspiration from Paris fashion, combining it with Vietnamese tradition to create a timeless fashion masterpiece.

The fabric matters enormously. Silk – thin, smooth, lustrous – is the finest material. Brocade – with raised woven patterns – is for formal occasions. Chiffon – light, airy – creates a dreamy beauty. Each fabric carries a personality: silk is elegant, brocade is stately, chiffon is romantic.

Ao dai colors also carry meaning. White – for students, symbolizing purity. Red – for brides, symbolizing luck. Yellow – for royalty, symbolizing power. Blue – for daily wear, symbolizing peace.

The ao dai isn't only for women. Men also wear ao dai for ceremonies, especially weddings. Men's ao dai is typically simpler, in dark colors, with thicker fabric, paired with a headband.

Today, ao dai appears on international fashion runways, in Hollywood films, and on world streets. But the most beautiful image remains Vietnamese schoolgirls in white ao dai, cycling through tree-shaded streets – a picture that time cannot fade.`,
        vocabulary: [
          { word: "thanh thoát", meaning: "nhẹ nhàng, duyên dáng", meaningEn: "graceful / elegant", example: "Tà áo dài thanh thoát.", exampleEn: "Graceful ao dai panels.", partOfSpeech: "adjective" },
          { word: "tơ tằm", meaning: "sợi tơ do con tằm nhả", meaningEn: "silk (from silkworms)", example: "Lụa tơ tằm.", exampleEn: "Silk from silkworms.", partOfSpeech: "noun" },
          { word: "gấm", meaning: "vải dệt có hoa văn nổi", meaningEn: "brocade", example: "Áo dài gấm.", exampleEn: "Brocade ao dai.", partOfSpeech: "noun" },
          { word: "hoa văn", meaning: "họa tiết trang trí", meaningEn: "pattern / motif", example: "Hoa văn dệt nổi.", exampleEn: "Raised woven patterns.", partOfSpeech: "noun" },
          { word: "mộng mơ", meaning: "đẹp như trong giấc mơ", meaningEn: "dreamy", example: "Vẻ đẹp mộng mơ.", exampleEn: "Dreamy beauty.", partOfSpeech: "adjective" },
          { word: "trong trắng", meaning: "tinh khiết, thuần khiết", meaningEn: "pure / innocent", example: "Sự trong trắng của tuổi học trò.", exampleEn: "The purity of school age.", partOfSpeech: "adjective" },
          { word: "khăn đóng", meaning: "khăn nam giới đội trong lễ", meaningEn: "traditional male headband", example: "Khăn đóng trên đầu.", exampleEn: "Traditional headband.", partOfSpeech: "noun" },
          { word: "sàn diễn", meaning: "nơi biểu diễn thời trang", meaningEn: "runway / catwalk", example: "Sàn diễn thời trang quốc tế.", exampleEn: "International fashion runway.", partOfSpeech: "noun" },
          { word: "vượt thời gian", meaning: "không lỗi mốt, luôn đẹp", meaningEn: "timeless", example: "Kiệt tác vượt thời gian.", exampleEn: "A timeless masterpiece.", partOfSpeech: "adjective" },
          { word: "rợp bóng", meaning: "phủ kín bóng mát", meaningEn: "shaded / canopied", example: "Đường rợp bóng cây.", exampleEn: "Tree-shaded streets.", partOfSpeech: "adjective" },
        ],
        quiz: [
          { question: "Ai thiết kế áo dài hiện đại?", questionEn: "Who designed the modern ao dai?", options: ["Nguyễn Du", "Nguyễn Cát Tường", "Trịnh Công Sơn", "Tôn Thất Tùng"], answer: 1, explanation: "Họa sĩ Nguyễn Cát Tường, thập niên 1930.", explanationEn: "Artist Nguyen Cat Tuong, 1930s." },
          { question: "Áo dài trắng dành cho ai?", questionEn: "Who wears white ao dai?", options: ["Cô dâu", "Nữ sinh", "Hoàng hậu", "Bà ngoại"], answer: 1, explanation: "Áo dài trắng dành cho nữ sinh, tượng trưng trong trắng.", explanationEn: "White ao dai for students, symbolizing purity." },
          { question: "Chất liệu nào cao cấp nhất cho áo dài?", questionEn: "What's the finest ao dai fabric?", options: ["Cotton", "Lụa tơ tằm", "Polyester", "Len"], answer: 1, explanation: "Lụa tơ tằm là chất liệu cao cấp nhất.", explanationEn: "Silk from silkworms is the finest." },
          { question: "Từ 'thanh thoát' có nghĩa gần nhất với:", questionEn: "'Thanh thoát' is closest to:", options: ["Nặng nề", "Nhẹ nhàng, duyên dáng", "Ồn ào", "Chậm chạp"], answer: 1, explanation: "'Thanh thoát' nghĩa là nhẹ nhàng, duyên dáng.", explanationEn: "'Thanh thoát' means graceful and elegant." },
          { question: "Áo dài nam khác áo dài nữ như thế nào?", questionEn: "How does men's ao dai differ from women's?", options: ["Ngắn hơn", "Đơn giản hơn, màu tối, chất liệu dày", "Giống hệt", "Không có tà"], answer: 1, explanation: "Áo dài nam đơn giản, màu tối, chất liệu dày, kết hợp khăn đóng.", explanationEn: "Simpler, darker, thicker fabric, with a headband." },
        ],
      },
      {
        id: "vn-read-18",
        title: "Xe máy – Linh hồn giao thông Việt",
        titleEn: "Motorbikes – The Soul of Vietnamese Traffic",
        level: "intermediate",
        teacherInsight: "Có câu nói vui: 'Ở Việt Nam, nếu bạn không biết đi xe máy, bạn không biết đi.' Người Việt dùng xe máy cho mọi thứ: đi chợ, đón con, chở tủ lạnh, thậm chí chở... bò!",
        teacherInsightEn: "There's a joke: 'In Vietnam, if you can't ride a motorbike, you can't go anywhere.' Vietnamese use motorbikes for everything: shopping, picking up kids, carrying fridges, even transporting... cows!",
        theory: `## Xe máy – Nhịp đập của Việt Nam 🏍️

Với hơn 45 triệu chiếc xe máy – chiếm 90% phương tiện cá nhân – Việt Nam là một trong những quốc gia có tỷ lệ xe máy cao nhất thế giới. Nhưng xe máy ở đây không chỉ là phương tiện di chuyển. Nó là văn hóa, là lối sống, là nhịp đập của cả dân tộc.

Buổi sáng giờ cao điểm, nhìn từ trên cao, dòng xe máy Hà Nội và Sài Gòn như một dòng sông kim loại chảy không ngừng. Hàng triệu chiếc xe máy chen chúc trên đường, tạo nên một bức tranh mà du khách phương Tây gọi là "organized chaos" – hỗn loạn có tổ chức. Không ai va vào ai, mọi người lách qua nhau bằng "giác quan thứ sáu."

Xe máy ở Việt Nam là "người bạn đa năng." Chở hai, ba, thậm chí bốn người một lúc (dù luật chỉ cho phép hai). Chở hoa, chở cá, chở bàn ghế, chở kính cửa – bất cứ thứ gì cũng có thể nằm trên xe máy. Những bức ảnh "xe máy chở hàng" của Việt Nam đã trở thành hiện tượng viral trên mạng xã hội quốc tế.

Xe máy cũng là "nhà hàng di động." Gánh hàng rong – từ phở, bún bò, đến bánh mì – gắn vào phía sau xe máy, len lỏi vào từng con hẻm, phục vụ tận nhà. Âm thanh đặc trưng nhất Việt Nam không phải tiếng nhạc, mà là tiếng còi xe máy "bim bim" vang vọng khắp phố.

Nhưng xe máy cũng mang đến thách thức: ô nhiễm không khí, ùn tắc giao thông, và tai nạn. Các thành phố lớn đang xây dựng tàu điện ngầm và hạn chế xe máy vào nội đô. Câu hỏi đặt ra: khi xe máy biến mất, liệu "linh hồn đường phố Việt" có còn?`,
        theoryEn: `## Motorbikes – Vietnam's Heartbeat 🏍️

With over 45 million motorbikes – 90% of personal vehicles – Vietnam has one of the highest motorbike ratios worldwide. But motorbikes here aren't just transportation. They are culture, lifestyle, and the heartbeat of the nation.

During morning rush hour, viewed from above, Hanoi and Saigon's motorbike streams look like an unceasing river of metal. Millions of motorbikes jostle on roads, creating what Western tourists call "organized chaos." Nobody crashes into anyone; everyone slips past each other using a "sixth sense."

Vietnamese motorbikes are "multi-purpose friends." Carrying two, three, even four people at once (though the law allows only two). Carrying flowers, fish, furniture, window panes – anything can ride on a motorbike. Photos of Vietnamese "overloaded motorbikes" have gone viral on international social media.

Motorbikes are also "mobile restaurants." Street food – from pho to bun bo to banh mi – attached to the back of motorbikes, threading into every alley, serving door-to-door. Vietnam's most characteristic sound isn't music, but the "beep beep" of motorbike horns echoing through streets.

But motorbikes bring challenges too: air pollution, traffic jams, and accidents. Major cities are building metro systems and restricting motorbikes in city centers. The question arises: when motorbikes disappear, will Vietnam's "street soul" remain?`,
        vocabulary: [
          { word: "giờ cao điểm", meaning: "thời gian đông xe nhất", meaningEn: "rush hour / peak hour", example: "Giờ cao điểm buổi sáng.", exampleEn: "Morning rush hour.", partOfSpeech: "noun" },
          { word: "hỗn loạn", meaning: "lộn xộn, không trật tự", meaningEn: "chaos / disorder", example: "Hỗn loạn có tổ chức.", exampleEn: "Organized chaos.", partOfSpeech: "noun" },
          { word: "đa năng", meaning: "có nhiều công dụng", meaningEn: "multi-purpose / versatile", example: "Người bạn đa năng.", exampleEn: "A versatile friend.", partOfSpeech: "adjective" },
          { word: "viral", meaning: "lan truyền nhanh trên mạng", meaningEn: "viral (internet)", example: "Hiện tượng viral.", exampleEn: "A viral phenomenon.", partOfSpeech: "adjective" },
          { word: "di động", meaning: "có thể di chuyển", meaningEn: "mobile / portable", example: "Nhà hàng di động.", exampleEn: "Mobile restaurant.", partOfSpeech: "adjective" },
          { word: "len lỏi", meaning: "di chuyển qua chỗ hẹp", meaningEn: "to thread through / weave through", example: "Len lỏi qua con hẻm.", exampleEn: "Threading through alleys.", partOfSpeech: "verb" },
          { word: "ùn tắc", meaning: "kẹt xe, tắc đường", meaningEn: "traffic jam / congestion", example: "Ùn tắc giao thông.", exampleEn: "Traffic congestion.", partOfSpeech: "noun" },
          { word: "tàu điện ngầm", meaning: "tàu chạy dưới đất", meaningEn: "metro / subway", example: "Xây tàu điện ngầm.", exampleEn: "Building the metro.", partOfSpeech: "noun" },
          { word: "nội đô", meaning: "khu trung tâm thành phố", meaningEn: "city center / downtown", example: "Hạn chế xe máy vào nội đô.", exampleEn: "Restricting motorbikes in the city center.", partOfSpeech: "noun" },
          { word: "gánh hàng rong", meaning: "quang gánh bán hàng dạo", meaningEn: "street hawker's carrying pole", example: "Gánh hàng rong len lỏi.", exampleEn: "Hawker's pole threading through.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "Việt Nam có bao nhiêu xe máy?", questionEn: "How many motorbikes in Vietnam?", options: ["10 triệu", "25 triệu", "Hơn 45 triệu", "100 triệu"], answer: 2, explanation: "Hơn 45 triệu xe máy.", explanationEn: "Over 45 million motorbikes." },
          { question: "Du khách gọi giao thông VN là gì?", questionEn: "What do tourists call VN traffic?", options: ["Dangerous chaos", "Organized chaos", "Perfect order", "Slow movement"], answer: 1, explanation: "'Organized chaos' – hỗn loạn có tổ chức.", explanationEn: "'Organized chaos.'" },
          { question: "Âm thanh đặc trưng nhất VN là gì?", questionEn: "What's Vietnam's most characteristic sound?", options: ["Tiếng nhạc", "Tiếng còi xe máy", "Tiếng chim", "Tiếng mưa"], answer: 1, explanation: "Tiếng còi xe máy 'bim bim.'", explanationEn: "The 'beep beep' of motorbike horns." },
          { question: "'Len lỏi' có nghĩa gần nhất với:", questionEn: "'Len lỏi' is closest to:", options: ["Chạy nhanh", "Di chuyển qua chỗ hẹp", "Dừng lại", "Bay lên"], answer: 1, explanation: "'Len lỏi' là di chuyển khéo léo qua chỗ hẹp.", explanationEn: "'Len lỏi' means threading through narrow spaces." },
          { question: "Thách thức lớn nhất của xe máy là gì?", questionEn: "What's the biggest motorbike challenge?", options: ["Quá đắt", "Ô nhiễm, ùn tắc, tai nạn", "Quá nhanh", "Quá to"], answer: 1, explanation: "Ô nhiễm không khí, ùn tắc giao thông, và tai nạn.", explanationEn: "Air pollution, traffic jams, and accidents." },
        ],
      },
      {
        id: "vn-read-19",
        title: "Tết Nguyên Đán – Linh hồn của năm mới",
        titleEn: "Tet – The Soul of the New Year",
        level: "beginner",
        teacherInsight: "Trong đêm Giao thừa, người Việt có phong tục 'xông đất' – người đầu tiên bước vào nhà bạn sau giao thừa sẽ mang vận may cho cả năm. Vì thế, gia đình thường chọn trước người 'xông đất' thật kỹ!",
        teacherInsightEn: "On New Year's Eve, Vietnamese have the 'xông đất' custom – the first person to enter your home after midnight brings luck for the whole year. So families carefully pre-select their 'xông đất' person!",
        theory: `## Tết – Khi cả nước trở về nhà 🎊

Tết Nguyên Đán – hay đơn giản là "Tết" – không chỉ là ngày lễ lớn nhất Việt Nam. Đó là thời khắc thiêng liêng khi 100 triệu con người cùng hướng về một điều: gia đình.

Tuần trước Tết, cả Việt Nam chuyển mình. Chợ hoa bung nở khắp phố: cành đào hồng (miền Bắc) và cành mai vàng (miền Nam) – hai loại hoa biểu tượng của Tết. Siêu thị chật ních người mua sắm: bánh chưng, mứt, hạt dưa, nước ngọt. Đường phố trang hoàng đèn hoa rực rỡ.

Bánh chưng – linh hồn ẩm thực Tết – được gói bằng lá dong, nhân đỗ xanh và thịt lợn, nấu trong 10-12 giờ. Gia đình quây quần bên nồi bánh chưng đêm khuya, kể chuyện, uống trà, và chờ đợi – một trong những ký ức đẹp nhất của người Việt.

Đêm Giao thừa, cả nước "nín thở" đếm ngược. Khi đồng hồ điểm 12 giờ, pháo hoa bừng sáng bầu trời, tiếng reo hò vang vọng. Người ta ôm nhau, chúc Tết, và tin rằng những điều tốt đẹp đang đến.

Ngày Tết, trẻ em mặc quần áo mới, chúc ông bà "Sống lâu trăm tuổi," và nhận lì xì – phong bao đỏ đựng tiền. Người lớn thăm họ hàng, ăn cỗ, chơi bài. Kiêng kỵ ngày Tết rất nhiều: không quét nhà (quét mất tài lộc), không nói điều xui xẻo, không cho vay tiền.

Nhưng Tết đẹp nhất không phải pháo hoa hay lì xì. Tết đẹp nhất là khoảnh khắc cả gia đình ngồi bên nhau, ăn bữa cơm tất niên, nghe bà kể chuyện xưa, và cảm nhận rằng – dù cuộc sống bận rộn thế nào – gia đình vẫn là nơi quan trọng nhất.`,
        theoryEn: `## Tet – When the Whole Nation Goes Home 🎊

Tet Nguyen Dan – or simply "Tet" – isn't just Vietnam's biggest holiday. It's the sacred moment when 100 million people turn toward one thing: family.

The week before Tet, all of Vietnam transforms. Flower markets bloom everywhere: pink peach blossoms (North) and golden apricot blossoms (South) – Tet's two iconic flowers. Supermarkets are packed with shoppers: banh chung, candied fruits, watermelon seeds, soft drinks. Streets are decorated with dazzling lights and flowers.

Banh chung – Tet's culinary soul – is wrapped in dong leaves with green bean and pork filling, cooked for 10-12 hours. Families gather around the banh chung pot late at night, telling stories, drinking tea, and waiting – one of Vietnamese people's most beautiful memories.

On New Year's Eve, the whole nation "holds its breath" counting down. When the clock strikes 12, fireworks light up the sky, cheers echo everywhere. People hug, exchange wishes, and believe good things are coming.

During Tet, children wear new clothes, wish grandparents "Live to a hundred," and receive li xi – red envelopes with money. Adults visit relatives, feast, and play cards. Tet taboos are numerous: don't sweep (sweeps away fortune), don't speak of bad luck, don't lend money.

But Tet's greatest beauty isn't fireworks or li xi. It's the moment the whole family sits together, eating the year-end dinner, listening to grandmother's old stories, and feeling that – no matter how busy life gets – family is still the most important thing.`,
        vocabulary: [
          { word: "Giao thừa", meaning: "thời khắc chuyển giao năm cũ sang năm mới", meaningEn: "New Year's Eve (midnight transition)", example: "Đêm Giao thừa.", exampleEn: "New Year's Eve.", partOfSpeech: "noun" },
          { word: "đào", meaning: "cây hoa mùa xuân miền Bắc", meaningEn: "peach blossom", example: "Cành đào hồng.", exampleEn: "Pink peach branches.", partOfSpeech: "noun" },
          { word: "mai", meaning: "cây hoa mùa xuân miền Nam", meaningEn: "apricot blossom", example: "Cành mai vàng.", exampleEn: "Golden apricot branches.", partOfSpeech: "noun" },
          { word: "bánh chưng", meaning: "bánh gạo nếp gói lá dong", meaningEn: "square sticky rice cake", example: "Gói bánh chưng.", exampleEn: "Wrapping banh chung.", partOfSpeech: "noun" },
          { word: "lì xì", meaning: "tiền mừng tuổi trong phong bao đỏ", meaningEn: "lucky money / red envelope", example: "Nhận lì xì.", exampleEn: "Receiving lucky money.", partOfSpeech: "noun" },
          { word: "trang hoàng", meaning: "trang trí đẹp", meaningEn: "to decorate / adorn", example: "Trang hoàng đèn hoa.", exampleEn: "Decorated with lights and flowers.", partOfSpeech: "verb" },
          { word: "tất niên", meaning: "bữa cơm cuối năm", meaningEn: "year-end (dinner)", example: "Bữa cơm tất niên.", exampleEn: "Year-end dinner.", partOfSpeech: "noun" },
          { word: "tài lộc", meaning: "tiền bạc, may mắn", meaningEn: "fortune / prosperity", example: "Quét mất tài lộc.", exampleEn: "Sweeping away fortune.", partOfSpeech: "noun" },
          { word: "kiêng kỵ", meaning: "tránh không làm", meaningEn: "taboo / to avoid", example: "Kiêng kỵ ngày Tết.", exampleEn: "Tet taboos.", partOfSpeech: "noun/verb" },
          { word: "quây quần", meaning: "tụ họp quanh nhau", meaningEn: "to gather together", example: "Gia đình quây quần.", exampleEn: "Family gathering together.", partOfSpeech: "verb" },
        ],
        quiz: [
          { question: "Hoa đặc trưng Tết miền Bắc là gì?", questionEn: "What's the iconic Northern Tet flower?", options: ["Mai vàng", "Đào hồng", "Hoa hồng", "Hoa cúc"], answer: 1, explanation: "Cành đào hồng là biểu tượng Tết miền Bắc.", explanationEn: "Pink peach blossoms symbolize Northern Tet." },
          { question: "Bánh chưng nấu bao lâu?", questionEn: "How long is banh chung cooked?", options: ["2-3 giờ", "5-6 giờ", "10-12 giờ", "24 giờ"], answer: 2, explanation: "Bánh chưng nấu trong 10-12 giờ.", explanationEn: "Banh chung is cooked for 10-12 hours." },
          { question: "Kiêng gì ngày mùng 1 Tết?", questionEn: "What's taboo on Tet day 1?", options: ["Ăn cơm", "Quét nhà", "Mặc áo mới", "Chúc Tết"], answer: 1, explanation: "Không quét nhà vì sợ quét mất tài lộc.", explanationEn: "Don't sweep – it sweeps away fortune." },
          { question: "'Quây quần' có nghĩa gần nhất với:", questionEn: "'Quây quần' is closest to:", options: ["Đi xa", "Tụ họp quanh nhau", "Chia tay", "Ngủ say"], answer: 1, explanation: "'Quây quần' nghĩa là tụ họp quanh nhau ấm cúng.", explanationEn: "'Quây quần' means gathering together warmly." },
          { question: "Theo tác giả, Tết đẹp nhất ở điều gì?", questionEn: "According to the author, what's Tet's greatest beauty?", options: ["Pháo hoa", "Lì xì", "Gia đình ngồi bên nhau", "Đồ ăn ngon"], answer: 2, explanation: "Tết đẹp nhất là khoảnh khắc gia đình bên nhau.", explanationEn: "Tet's greatest beauty is family togetherness." },
        ],
      },
      {
        id: "vn-read-20",
        title: "Giới trẻ Việt Nam – Thế hệ kết nối",
        titleEn: "Vietnamese Youth – The Connected Generation",
        level: "advanced",
        teacherInsight: "Gen Z Việt Nam sáng tạo ra nhiều từ lóng thú vị: 'đu trend' (follow trends), 'flex' (khoe), 'chốt đơn' (make a decision), 'ủa' (expression of surprise). Đây là cách ngôn ngữ sống và phát triển!",
        teacherInsightEn: "Vietnamese Gen Z created fun slang: 'đu trend' (follow trends), 'flex' (show off), 'chốt đơn' (make a decision), 'ủa' (expression of surprise). This is how language lives and evolves!",
        theory: `## Giới trẻ Việt Nam – Thế hệ giữa hai thế giới 🧑‍💻

Với tuổi trung vị khoảng 31, Việt Nam là một trong những quốc gia "trẻ" nhất Đông Nam Á. Thế hệ Gen Z (sinh từ 1997 trở đi) đang định hình lại mọi thứ: từ cách làm việc, cách yêu, cách ăn, đến cách nhìn thế giới.

Gen Z Việt Nam lớn lên với Internet tốc độ cao, smartphone, và mạng xã hội. TikTok, Instagram, YouTube – đó là "ngôi trường thứ hai" của họ. Họ học nấu ăn từ TikTok, học tiếng Anh từ YouTube, học kinh doanh từ podcast. Thế hệ này không chờ ai dạy – họ tự học mọi thứ.

Nhưng đằng sau màn hình sáng, Gen Z Việt đối mặt với những áp lực khổng lồ. Áp lực học hành: phải đỗ đại học top, phải học thêm từ sáng đến tối. Áp lực so sánh: mạng xã hội liên tục trưng bày cuộc sống "hoàn hảo" của người khác. Áp lực kinh tế: giá nhà, giá đất tăng phi mã, khiến giấc mơ "mua nhà trước 30" trở nên xa vời.

Startup là từ khóa nóng. Giới trẻ Việt Nam không còn mơ về công việc nhà nước ổn định như thế hệ cha mẹ. Họ muốn tạo dựng doanh nghiệp riêng: từ quán cà phê specialty đến app công nghệ, từ thương hiệu thời trang bền vững đến kênh nội dung số triệu view.

Giữa truyền thống và hiện đại, Gen Z Việt đang tìm cách cân bằng. Họ vẫn thắp hương ngày rằm, nhưng đặt đồ cúng trên Shopee. Họ vẫn kính trọng ông bà, nhưng dám nói "con không đồng ý." Họ vẫn ăn Tết, nhưng cũng celebrate Christmas và Halloween.

Gen Z Việt Nam không phải là thế hệ "mất gốc." Họ là thế hệ "có gốc nhưng biết bay" – giữ chặt truyền thống trong khi vươn tới toàn cầu. Và đó là điều làm cho giới trẻ Việt Nam trở thành một trong những thế hệ thú vị nhất châu Á.`,
        theoryEn: `## Vietnamese Youth – The Generation Between Two Worlds 🧑‍💻

With a median age of about 31, Vietnam is one of Southeast Asia's "youngest" nations. Gen Z (born from 1997 onward) is reshaping everything: how they work, love, eat, and view the world.

Vietnamese Gen Z grew up with high-speed internet, smartphones, and social media. TikTok, Instagram, YouTube – these are their "second school." They learn cooking from TikTok, English from YouTube, business from podcasts. This generation doesn't wait to be taught – they self-learn everything.

But behind the bright screens, Vietnamese Gen Z faces enormous pressures. Academic pressure: must enter a top university, must attend tutoring from morning to night. Comparison pressure: social media constantly displays others' "perfect" lives. Economic pressure: housing prices skyrocketing, making the dream of "buying a home before 30" increasingly distant.

Startup is the hot keyword. Vietnamese youth no longer dream of stable government jobs like their parents. They want to build their own businesses: from specialty coffee shops to tech apps, sustainable fashion brands to million-view digital content channels.

Between tradition and modernity, Vietnamese Gen Z is finding balance. They still burn incense on full moon days, but order offerings on Shopee. They still respect grandparents, but dare to say "I disagree." They still celebrate Tet, but also celebrate Christmas and Halloween.

Vietnamese Gen Z isn't a "rootless" generation. They are the "rooted but flying" generation – holding tradition tight while reaching for the global. And that's what makes Vietnamese youth one of Asia's most fascinating generations.`,
        vocabulary: [
          { word: "tuổi trung vị", meaning: "tuổi ở giữa dân số", meaningEn: "median age", example: "Tuổi trung vị khoảng 31.", exampleEn: "Median age about 31.", partOfSpeech: "noun" },
          { word: "định hình", meaning: "tạo ra hình dáng, ảnh hưởng", meaningEn: "to shape / define", example: "Định hình lại mọi thứ.", exampleEn: "Reshaping everything.", partOfSpeech: "verb" },
          { word: "áp lực", meaning: "sức ép tinh thần", meaningEn: "pressure / stress", example: "Áp lực khổng lồ.", exampleEn: "Enormous pressure.", partOfSpeech: "noun" },
          { word: "phi mã", meaning: "tăng rất nhanh", meaningEn: "skyrocketing", example: "Giá nhà tăng phi mã.", exampleEn: "Housing prices skyrocketing.", partOfSpeech: "adjective" },
          { word: "xa vời", meaning: "rất xa, khó đạt", meaningEn: "distant / unattainable", example: "Giấc mơ xa vời.", exampleEn: "A distant dream.", partOfSpeech: "adjective" },
          { word: "bền vững", meaning: "lâu dài, không gây hại", meaningEn: "sustainable", example: "Thời trang bền vững.", exampleEn: "Sustainable fashion.", partOfSpeech: "adjective" },
          { word: "nội dung số", meaning: "nội dung trên Internet", meaningEn: "digital content", example: "Kênh nội dung số.", exampleEn: "Digital content channel.", partOfSpeech: "noun" },
          { word: "mất gốc", meaning: "quên đi nguồn gốc, truyền thống", meaningEn: "uprooted / losing roots", example: "Không phải thế hệ mất gốc.", exampleEn: "Not a rootless generation.", partOfSpeech: "adjective" },
          { word: "toàn cầu", meaning: "trên khắp thế giới", meaningEn: "global", example: "Vươn tới toàn cầu.", exampleEn: "Reaching for the global.", partOfSpeech: "adjective" },
          { word: "cân bằng", meaning: "giữ cho đều, không thiên lệch", meaningEn: "balance", example: "Cân bằng truyền thống và hiện đại.", exampleEn: "Balancing tradition and modernity.", partOfSpeech: "noun/verb" },
        ],
        quiz: [
          { question: "Tuổi trung vị dân số Việt Nam khoảng bao nhiêu?", questionEn: "What's Vietnam's median age?", options: ["~21", "~31", "~41", "~51"], answer: 1, explanation: "Tuổi trung vị khoảng 31.", explanationEn: "Median age about 31." },
          { question: "Gen Z Việt Nam học từ đâu nhiều nhất?", questionEn: "Where does Vietnamese Gen Z learn most?", options: ["Trường học", "Sách giáo khoa", "Mạng xã hội và Internet", "Gia sư"], answer: 2, explanation: "TikTok, YouTube, podcast là 'ngôi trường thứ hai.'", explanationEn: "TikTok, YouTube, podcasts are their 'second school.'" },
          { question: "Áp lực lớn nhất của Gen Z là gì?", questionEn: "What's Gen Z's biggest pressure?", options: ["Thời tiết", "Học hành, so sánh, kinh tế", "Thể thao", "Gia đình quá tốt"], answer: 1, explanation: "Áp lực học hành, so sánh trên MXH, và kinh tế.", explanationEn: "Academic, social comparison, and economic pressure." },
          { question: "Tác giả gọi Gen Z là 'thế hệ' gì?", questionEn: "What does the author call Gen Z?", options: ["Mất gốc", "Có gốc nhưng biết bay", "Truyền thống", "Hiện đại"], answer: 1, explanation: "'Có gốc nhưng biết bay' – giữ truyền thống, vươn toàn cầu.", explanationEn: "'Rooted but flying' – keeping tradition, reaching globally." },
          { question: "'Phi mã' có nghĩa gần nhất với:", questionEn: "'Phi mã' is closest to:", options: ["Chậm chạp", "Tăng rất nhanh", "Giảm dần", "Ổn định"], answer: 1, explanation: "'Phi mã' nghĩa là tăng rất nhanh, không kiểm soát.", explanationEn: "'Phi mã' means skyrocketing, out of control." },
        ],
      },
    ],
  },
];

// Module: Đọc hiểu nâng cao — Văn hóa đương đại
export const advancedReadingModule: VietnameseModule = {
  id: "vn-reading-adv",
  title: "Đọc hiểu nâng cao",
  titleEn: "Advanced Reading",
  icon: "📖",
  color: "from-indigo-500 to-violet-500",
  description: "Khám phá văn hóa Việt Nam qua bài đọc chuyên sâu",
  descriptionEn: "Explore Vietnamese culture through in-depth reading",
  category: "reading",
  lessons: [
    {
      id: "vn-read-adv-1",
      title: "Văn hóa Cà phê Việt Nam",
      titleEn: "Vietnamese Coffee Culture",
      level: "advanced",
      teacherInsight: "Việt Nam là nước xuất khẩu cà phê lớn thứ 2 thế giới, chỉ sau Brazil. Cà phê không chỉ là đồ uống mà là lối sống.",
      teacherInsightEn: "Vietnam is the world's second-largest coffee exporter after Brazil. Coffee is not just a drink but a lifestyle.",
      theory: `## Cà phê – Linh hồn buổi sáng Việt 🌅☕

Từ thuở Pháp thuộc mang hạt cà phê arabica lên Tây Nguyên, Việt Nam đã viết nên câu chuyện cà phê hoàn toàn riêng biệt. Không như espresso Ý hay pour-over Nhật, cà phê Việt được pha bằng **phin** – một chiếc lọc kim loại nhỏ xinh đặt trên cốc thủy tinh, nhẫn nại nhỏ từng giọt đen sánh xuống lớp sữa đặc trắng ngần bên dưới.

Buổi sáng ở bất kỳ thành phố nào, từ Hà Nội đến Sài Gòn, bạn sẽ thấy những quán cà phê vỉa hè với **ghế nhựa thấp** và những bàn kim loại bé xíu. Người Việt ngồi đó, chậm rãi nhấp từng ngụm **cà phê sữa đá**, đọc báo, lướt điện thoại, hoặc đơn giản là ngắm dòng người đi qua. Thời gian dường như chậm lại trong khoảnh khắc ấy.

**Cà phê trứng** (egg coffee), sáng tạo của Hà Nội từ thập niên 1940 khi sữa tươi khan hiếm, đã trở thành biểu tượng ẩm thực. Lòng đỏ trứng được đánh bông cùng sữa đặc tạo thành lớp kem mịn màng phủ trên cà phê đen nóng – vừa béo ngậy vừa đắng nhẹ, hòa quyện hoàn hảo.

Tây Nguyên – vùng đất đỏ bazan – là thủ phủ cà phê robusta với **Buôn Ma Thuột** là kinh đô. Mỗi mùa thu hoạch, những quả cà phê chín đỏ rực phủ kín sườn đồi, mang theo hương thơm nồng nàn lan tỏa khắp buôn làng. Lễ hội Cà phê Buôn Ma Thuột thu hút du khách từ khắp nơi trên thế giới.

Ngày nay, **cà phê specialty** (đặc sản) đang nổi lên mạnh mẽ. Các barista trẻ Việt Nam thắng giải quốc tế, mang hương vị Việt ra toàn cầu. Từ quán vỉa hè đến specialty shop, cà phê vẫn là sợi dây kết nối con người, là nơi bạn bè hẹn hò, đối tác bàn việc, và người xa xứ tìm về hương vị quê nhà.`,
      theoryEn: `## Coffee – The Soul of Vietnamese Mornings 🌅☕

Since the French colonial era brought arabica beans to the Central Highlands, Vietnam has written its own unique coffee story. Unlike Italian espresso or Japanese pour-over, Vietnamese coffee is brewed with a **phin** – a small metal drip filter placed on a glass, patiently dripping dark, rich drops onto a layer of white condensed milk below.

Every morning in any city, from Hanoi to Saigon, you'll find sidewalk cafés with **low plastic chairs** and tiny metal tables. Vietnamese people sit there, slowly sipping **iced milk coffee**, reading newspapers, scrolling phones, or simply watching passersby. Time seems to slow in those moments.

**Egg coffee**, a Hanoi invention from the 1940s when fresh milk was scarce, has become a culinary icon. Whipped egg yolk with condensed milk creates a smooth cream layer atop hot black coffee – rich yet subtly bitter, perfectly harmonized.

The Central Highlands – with its red basalt soil – is the robusta capital, with **Buôn Ma Thuột** as its crown jewel. Each harvest season, ripe red coffee cherries blanket the hillsides, spreading their intense aroma through villages.

Today, **specialty coffee** is rising strongly. Young Vietnamese baristas win international awards, bringing Vietnamese flavors to the world.`,
      vocabulary: [
        { word: "phin", meaning: "dụng cụ pha cà phê", meaningEn: "Vietnamese drip filter", example: "Cà phê phin truyền thống.", exampleEn: "Traditional phin coffee.", partOfSpeech: "noun" },
        { word: "sữa đặc", meaning: "sữa cô đặc ngọt", meaningEn: "condensed milk", example: "Cho thêm sữa đặc.", exampleEn: "Add more condensed milk.", partOfSpeech: "noun" },
        { word: "vỉa hè", meaning: "lề đường dành cho người đi bộ", meaningEn: "sidewalk", example: "Quán cà phê vỉa hè.", exampleEn: "Sidewalk café.", partOfSpeech: "noun" },
        { word: "nhấp", meaning: "uống từng ngụm nhỏ", meaningEn: "to sip", example: "Nhấp từng ngụm cà phê.", exampleEn: "Sipping each mouthful.", partOfSpeech: "verb" },
        { word: "béo ngậy", meaning: "mùi vị béo thơm", meaningEn: "creamy / rich", example: "Cà phê trứng béo ngậy.", exampleEn: "Egg coffee is rich and creamy.", partOfSpeech: "adjective" },
        { word: "robusta", meaning: "loại cà phê phổ biến ở VN", meaningEn: "robusta coffee variety", example: "Việt Nam trồng nhiều robusta.", exampleEn: "Vietnam grows a lot of robusta.", partOfSpeech: "noun" },
        { word: "thu hoạch", meaning: "hái, gặt sản phẩm", meaningEn: "harvest", example: "Mùa thu hoạch cà phê.", exampleEn: "Coffee harvest season.", partOfSpeech: "noun" },
        { word: "nồng nàn", meaning: "mạnh mẽ, đậm đà", meaningEn: "intense / passionate", example: "Hương thơm nồng nàn.", exampleEn: "Intense fragrance.", partOfSpeech: "adjective" },
        { word: "đặc sản", meaning: "sản phẩm đặc biệt", meaningEn: "specialty", example: "Cà phê đặc sản Việt Nam.", exampleEn: "Vietnamese specialty coffee.", partOfSpeech: "noun" },
        { word: "hương vị", meaning: "mùi và vị", meaningEn: "flavor", example: "Hương vị quê nhà.", exampleEn: "The flavor of home.", partOfSpeech: "noun" },
      ],
      quiz: [
        { question: "Cà phê phin là gì?", questionEn: "What is phin coffee?", options: ["Cà phê máy", "Cà phê pha lọc kim loại nhỏ giọt", "Cà phê hòa tan", "Cà phê espresso"], answer: 1, explanation: "Phin là dụng cụ lọc kim loại truyền thống Việt Nam.", explanationEn: "Phin is a traditional Vietnamese metal drip filter." },
        { question: "Cà phê trứng ra đời ở đâu?", questionEn: "Where was egg coffee invented?", options: ["Sài Gòn", "Hà Nội", "Đà Nẵng", "Huế"], answer: 1, explanation: "Cà phê trứng ra đời ở Hà Nội thập niên 1940.", explanationEn: "Egg coffee was invented in Hanoi in the 1940s." },
        { question: "Vùng nào là thủ phủ cà phê Việt Nam?", questionEn: "Which region is Vietnam's coffee capital?", options: ["Đồng bằng sông Hồng", "Tây Nguyên", "Miền Tây Nam Bộ", "Duyên hải miền Trung"], answer: 1, explanation: "Tây Nguyên, đặc biệt Buôn Ma Thuột.", explanationEn: "Central Highlands, especially Buôn Ma Thuột." },
        { question: "'Nồng nàn' có nghĩa gì?", questionEn: "What does 'nồng nàn' mean?", options: ["Nhạt nhẽo", "Mạnh mẽ, đậm đà", "Chua", "Ngọt"], answer: 1, explanation: "'Nồng nàn' = intense, passionate.", explanationEn: "'Nồng nàn' = intense." },
        { question: "Việt Nam xuất khẩu cà phê đứng thứ mấy?", questionEn: "Vietnam's coffee export ranking?", options: ["Thứ 1", "Thứ 2", "Thứ 5", "Thứ 10"], answer: 1, explanation: "Thứ 2 thế giới, sau Brazil.", explanationEn: "2nd in the world, after Brazil." },
      ],
    },
    {
      id: "vn-read-adv-2",
      title: "Áo Dài – Di sản thời trang",
      titleEn: "Áo Dài – Fashion Heritage",
      level: "advanced",
      teacherInsight: "Áo dài không chỉ là trang phục mà là biểu tượng văn hóa, được mặc trong lễ cưới, lễ tốt nghiệp, và ngày Tết.",
      teacherInsightEn: "Áo dài is not just clothing but a cultural symbol, worn at weddings, graduations, and Tết celebrations.",
      theory: `## Áo Dài – Dòng chảy ngàn năm 👗

Áo dài – hai tiếng ấy vang lên, và trước mắt ta hiện ra hình ảnh một tà áo thướt tha bay trong gió, ôm lấy đường cong duyên dáng của người phụ nữ Việt. Nhưng áo dài không phải lúc nào cũng có dáng hình như ngày nay.

**Thế kỷ 18**, dưới thời chúa Nguyễn Phúc Khoát, áo ngũ thân được quy định làm quốc phục để phân biệt với trang phục miền Bắc. Đó là tiền thân của áo dài hiện đại. Áo có năm thân (5 mảnh vải), cài cúc bên phải, kết hợp với quần rộng ống – giản dị mà trang nhã.

**Năm 1930**, họa sĩ **Cát Tường** (tên Pháp: Lemur) cách mạng hóa áo dài bằng cách giảm từ năm thân xuống hai thân, ôm sát cơ thể hơn, thêm vai raglan theo phong cách phương Tây. "Áo dài Le Mur" gây sốt Sài Gòn nhưng cũng vấp phải nhiều chỉ trích từ những người bảo thủ.

Thập niên **1960-70**, bà **Trần Lệ Xuân** (Madame Nhu) thiết kế áo dài cổ thuyền gây tranh cãi. Cùng lúc, các nữ sinh Sài Gòn mặc áo dài trắng tinh khôi đến trường – hình ảnh đã trở thành biểu tượng vĩnh cửu của tuổi thanh xuân Việt Nam.

Ngày nay, áo dài hiện đại có muôn vàn biến tấu: áo dài cách tân với vạt ngắn, áo dài nam với chất liệu linen, áo dài cưới thêu tay tinh xảo. Các nhà thiết kế như **Minh Hạnh**, **Sĩ Hoàng** mang áo dài lên sàn diễn quốc tế. Áo dài đang được xem xét để trở thành **di sản văn hóa phi vật thể** của nhân loại.`,
      theoryEn: `## Áo Dài – A Thousand-Year Flow 👗

Áo dài – those two words evoke the image of a flowing gown dancing in the wind. But the áo dài hasn't always looked as it does today.

In the **18th century**, Lord Nguyễn Phúc Khoát established the five-panel dress as national attire. In **1930**, artist **Cát Tường** revolutionized it with a two-panel, body-hugging Western-influenced design. The **1960s-70s** saw schoolgirls in pristine white áo dài become an eternal symbol of Vietnamese youth.

Today, modern áo dài comes in countless variations – from short-hemmed contemporary styles to hand-embroidered wedding gowns. Designers bring áo dài to international runways, and it is being considered for **UNESCO intangible heritage** status.`,
      vocabulary: [
        { word: "thướt tha", meaning: "mềm mại, duyên dáng", meaningEn: "graceful, flowing", example: "Tà áo thướt tha trong gió.", exampleEn: "The flowing hem in the wind.", partOfSpeech: "adjective" },
        { word: "quốc phục", meaning: "trang phục quốc gia", meaningEn: "national costume", example: "Áo dài là quốc phục Việt Nam.", exampleEn: "Áo dài is Vietnam's national costume.", partOfSpeech: "noun" },
        { word: "cách tân", meaning: "đổi mới, hiện đại hóa", meaningEn: "modernized / innovated", example: "Áo dài cách tân rất thời trang.", exampleEn: "Modernized áo dài is very fashionable.", partOfSpeech: "adjective" },
        { word: "tinh khôi", meaning: "trắng sạch, thuần khiết", meaningEn: "pristine, pure", example: "Áo dài trắng tinh khôi.", exampleEn: "Pristine white áo dài.", partOfSpeech: "adjective" },
        { word: "biến tấu", meaning: "thay đổi sáng tạo", meaningEn: "variation", example: "Nhiều biến tấu hiện đại.", exampleEn: "Many modern variations.", partOfSpeech: "noun" },
        { word: "thêu tay", meaning: "trang trí bằng kim chỉ", meaningEn: "hand-embroidered", example: "Áo dài thêu tay tinh xảo.", exampleEn: "Exquisitely hand-embroidered áo dài.", partOfSpeech: "noun" },
        { word: "sàn diễn", meaning: "sân khấu trình diễn thời trang", meaningEn: "runway / catwalk", example: "Áo dài trên sàn diễn quốc tế.", exampleEn: "Áo dài on international runways.", partOfSpeech: "noun" },
        { word: "di sản", meaning: "tài sản văn hóa", meaningEn: "heritage", example: "Di sản văn hóa phi vật thể.", exampleEn: "Intangible cultural heritage.", partOfSpeech: "noun" },
        { word: "duyên dáng", meaning: "đẹp một cách nhẹ nhàng", meaningEn: "graceful, charming", example: "Phụ nữ Việt Nam duyên dáng.", exampleEn: "Vietnamese women are graceful.", partOfSpeech: "adjective" },
        { word: "tiền thân", meaning: "hình thức ban đầu", meaningEn: "predecessor / prototype", example: "Áo ngũ thân là tiền thân của áo dài.", exampleEn: "The five-panel dress is the predecessor of áo dài.", partOfSpeech: "noun" },
      ],
      quiz: [
        { question: "Áo dài hiện đại bắt đầu từ ai?", questionEn: "Who started modern áo dài?", options: ["Trần Lệ Xuân", "Cát Tường", "Minh Hạnh", "Sĩ Hoàng"], answer: 1, explanation: "Họa sĩ Cát Tường năm 1930.", explanationEn: "Artist Cát Tường in 1930." },
        { question: "'Cách tân' nghĩa gì?", questionEn: "What does 'cách tân' mean?", options: ["Cổ điển", "Đổi mới, hiện đại hóa", "Phá hủy", "Sao chép"], answer: 1, explanation: "'Cách tân' = modernized.", explanationEn: "'Cách tân' = modernized." },
        { question: "Áo ngũ thân có bao nhiêu mảnh vải?", questionEn: "How many panels in áo ngũ thân?", options: ["3", "4", "5", "6"], answer: 2, explanation: "Ngũ = 5, năm mảnh vải.", explanationEn: "Ngũ = 5, five panels." },
        { question: "'Tinh khôi' dùng để miêu tả gì?", questionEn: "What does 'tinh khôi' describe?", options: ["Bẩn", "Trắng sạch, thuần khiết", "Đen", "Cũ"], answer: 1, explanation: "'Tinh khôi' = pristine, pure white.", explanationEn: "'Tinh khôi' = pristine." },
        { question: "Hình ảnh biểu tượng nhất của áo dài là gì?", questionEn: "Most iconic áo dài image?", options: ["Áo dài đỏ cưới", "Nữ sinh áo dài trắng", "Áo dài nam", "Áo dài cách tân"], answer: 1, explanation: "Nữ sinh áo dài trắng – biểu tượng tuổi thanh xuân.", explanationEn: "Schoolgirls in white áo dài – symbol of youth." },
      ],
    },
    {
      id: "vn-read-adv-3",
      title: "Tết Nguyên Đán – Hồn Việt",
      titleEn: "Tết – The Soul of Vietnam",
      level: "advanced",
      teacherInsight: "Tết là dịp quan trọng nhất trong năm. Dù ở đâu, người Việt luôn cố gắng về nhà đón Tết với gia đình.",
      teacherInsightEn: "Tết is the most important occasion of the year. Wherever they are, Vietnamese always try to return home for Tết.",
      theory: `## Tết Nguyên Đán – Khi hồn Việt thức giấc 🧧🌸

Mỗi năm, khi gió mùa đông bắc mang hơi lạnh cuối cùng tràn về, khi hoa đào Hà Nội bắt đầu hé nụ và hoa mai Sài Gòn nở vàng rực, cả đất nước Việt Nam chìm trong một nhịp thở chung: **Tết đang đến**.

**Tuần cuối năm** là cuộc chạy đua với thời gian. Chợ hoa Tết rực rỡ sắc màu, xe máy chở cành đào cành mai len lỏi giữa dòng người đông đúc. Các bà, các mẹ tất bật gói **bánh chưng** – chiếc bánh vuông gói bằng lá dong, nhân đậu xanh thịt lợn, luộc suốt 12 tiếng – biểu tượng của đất trời vuông tròn.

**Đêm giao thừa**, cả gia đình quây quần bên nhau. Tiếng pháo hoa nổ rền trên bầu trời. Khoảnh khắc kim đồng hồ điểm 12, mọi người chúc nhau: "Năm mới an khang thịnh vượng!", "Phát tài phát lộc!" Trẻ con háo hức nhận **lì xì** – phong bao đỏ đựng tiền mừng tuổi.

**Mùng Một Tết**, người ta kiêng quét nhà (sợ quét hết tài lộc), kiêng nói điều xui, kiêng cho vay mượn. Ai đến nhà đầu tiên gọi là **xông đất** – người xông đất hợp tuổi mang lại may mắn cả năm. Bữa cơm Tết đầy đủ: **thịt kho hột vịt**, **canh khổ qua nhồi thịt** (ăn cho hết khổ), **mứt Tết** đủ loại.

Ba ngày Tết, người Việt đi **chùa cầu an**, thăm họ hàng, bạn bè. Trẻ con mặc quần áo mới, chơi bầu cua tôm cá. Người lớn ngồi uống trà, ăn mứt, kể chuyện năm cũ và mơ ước năm mới.

Tết ngày nay có nhiều thay đổi – ít gói bánh chưng hơn, nhiều nhà đi du lịch, nhưng tinh thần Tết vẫn nguyên vẹn: **sum họp, biết ơn, và hy vọng**. Dù thế giới đổi thay, Tết vẫn là lúc người Việt trở về – về với gia đình, về với cội nguồn, về với chính mình.`,
      theoryEn: `## Tết – When the Vietnamese Soul Awakens 🧧🌸

Each year, when peach blossoms open in Hanoi and apricot flowers bloom golden in Saigon, all of Vietnam breathes as one: **Tết is coming**.

The **last week** is a race against time. Flower markets blaze with color. Families wrap **bánh chưng** – square sticky rice cakes with mung bean and pork, boiled for 12 hours.

On **New Year's Eve**, families gather together. Fireworks fill the sky. Children eagerly receive **lì xì** – red envelopes with lucky money. On **the first day**, traditions abound: no sweeping (sweeping away luck), the first visitor (**xông đất**) brings fortune.

Despite modern changes, Tết's spirit remains: **reunion, gratitude, and hope**.`,
      vocabulary: [
        { word: "giao thừa", meaning: "đêm cuối năm cũ", meaningEn: "New Year's Eve", example: "Đêm giao thừa rất vui.", exampleEn: "New Year's Eve is very joyful.", partOfSpeech: "noun" },
        { word: "bánh chưng", meaning: "bánh Tết hình vuông", meaningEn: "square sticky rice cake", example: "Gói bánh chưng ngày Tết.", exampleEn: "Wrapping bánh chưng for Tết.", partOfSpeech: "noun" },
        { word: "lì xì", meaning: "tiền mừng tuổi", meaningEn: "lucky money envelope", example: "Trẻ con nhận lì xì.", exampleEn: "Children receive lucky money.", partOfSpeech: "noun" },
        { word: "xông đất", meaning: "người đến nhà đầu tiên", meaningEn: "first visitor of the year", example: "Anh ấy xông đất cho nhà tôi.", exampleEn: "He was the first visitor to our home.", partOfSpeech: "verb" },
        { word: "sum họp", meaning: "đoàn tụ gia đình", meaningEn: "family reunion", example: "Tết là dịp sum họp.", exampleEn: "Tết is a time for reunion.", partOfSpeech: "noun" },
        { word: "an khang", meaning: "bình an, khỏe mạnh", meaningEn: "peace and health", example: "Chúc an khang thịnh vượng.", exampleEn: "Wishing peace and prosperity.", partOfSpeech: "adjective" },
        { word: "tài lộc", meaning: "tiền bạc, may mắn", meaningEn: "fortune, luck", example: "Cầu tài lộc năm mới.", exampleEn: "Praying for fortune in the new year.", partOfSpeech: "noun" },
        { word: "háo hức", meaning: "nóng lòng chờ đợi", meaningEn: "excited, eager", example: "Trẻ con háo hức đón Tết.", exampleEn: "Children are excited for Tết.", partOfSpeech: "adjective" },
        { word: "kiêng", meaning: "tránh không làm", meaningEn: "to abstain / taboo", example: "Kiêng quét nhà ngày Tết.", exampleEn: "Abstaining from sweeping on Tết.", partOfSpeech: "verb" },
        { word: "cội nguồn", meaning: "gốc gác, nguồn gốc", meaningEn: "roots, origin", example: "Trở về cội nguồn.", exampleEn: "Returning to one's roots.", partOfSpeech: "noun" },
      ],
      quiz: [
        { question: "'Xông đất' là gì?", questionEn: "What is 'xông đất'?", options: ["Dọn nhà", "Người đến nhà đầu tiên ngày Tết", "Nấu ăn", "Đi chùa"], answer: 1, explanation: "'Xông đất' = first visitor of the new year.", explanationEn: "'Xông đất' = first visitor." },
        { question: "Bánh chưng luộc bao lâu?", questionEn: "How long is bánh chưng boiled?", options: ["2 giờ", "6 giờ", "12 giờ", "24 giờ"], answer: 2, explanation: "Bánh chưng luộc khoảng 12 giờ.", explanationEn: "Bánh chưng is boiled about 12 hours." },
        { question: "'Lì xì' dùng để làm gì?", questionEn: "What is 'lì xì' used for?", options: ["Mua hoa", "Mừng tuổi trẻ con", "Trả nợ", "Mua bánh"], answer: 1, explanation: "'Lì xì' = lucky money for children.", explanationEn: "'Lì xì' = lucky money for children." },
        { question: "Ngày Tết kiêng gì?", questionEn: "What is taboo on Tết?", options: ["Ăn nhiều", "Quét nhà", "Mặc đẹp", "Chúc Tết"], answer: 1, explanation: "Kiêng quét nhà sợ quét đi tài lộc.", explanationEn: "Sweeping is taboo – it sweeps away luck." },
        { question: "'Cội nguồn' nghĩa gì?", questionEn: "What does 'cội nguồn' mean?", options: ["Tương lai", "Gốc gác, nguồn gốc", "Con đường", "Trường học"], answer: 1, explanation: "'Cội nguồn' = roots, origin.", explanationEn: "'Cội nguồn' = roots." },
      ],
    },
  ],
};

readingModules.push(advancedReadingModule);
