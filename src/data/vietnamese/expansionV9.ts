/**
 * @file expansionV9.ts
 * @description Đợt 9 mở rộng — 6 bài học chuyên sâu cho Reading / Grammar / Folklore.
 * Mutates the existing module arrays at load time (matches the .push() pattern used
 * by earlier expansions in this folder).
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { readingModules } from "./readingLessons";
import { grammarModules } from "./grammarLessons";
import { folkloreLanguageModules } from "./folkloreLessons";
import type { VietnameseLesson } from "./types";

/* ════════════════════════════════════════════════════════════════════════════
 * READING — 2 bài long-read (300–500 từ) về Việt Nam đương đại.
 * ════════════════════════════════════════════════════════════════════════════ */
const readingLessonsV9: VietnameseLesson[] = [
  {
    id: "vn-read-v9-1",
    title: "Sài Gòn về đêm – Thành phố không bao giờ ngủ",
    titleEn: "Saigon by Night – The City That Never Sleeps",
    level: "intermediate",
    teacherInsight:
      "Sài Gòn (TP. Hồ Chí Minh) là thành phố đông dân nhất Việt Nam với hơn 9 triệu cư dân chính thức và ước tính 13 triệu người sinh sống thực tế. Nhịp sống đêm sôi động phản ánh tinh thần năng động của vùng đất phía Nam.",
    teacherInsightEn:
      "Saigon (Ho Chi Minh City) is Vietnam's most populous city, with 9+ million registered residents and an estimated 13 million de facto inhabitants. Its vibrant nightlife mirrors the dynamic spirit of the South.",
    theory: `## Sài Gòn về đêm 🌃

Khi mặt trời lặn sau những tòa cao ốc ở quận 1, Sài Gòn không hề chìm vào giấc ngủ – mà ngược lại, thành phố như khoác lên mình một tấm áo mới rực rỡ và sôi động. Các con đường Nguyễn Huệ, Lê Lợi, Đồng Khởi bắt đầu lên đèn, ánh sáng vàng cam phản chiếu xuống mặt đường ướt mưa, tạo nên một bức tranh đô thị đầy cảm xúc.

Phố đi bộ Nguyễn Huệ – trái tim của Sài Gòn về đêm – là điểm hẹn của hàng nghìn người trẻ. Họ tụ tập chơi nhạc, nhảy hip-hop, trượt patin, hay đơn giản chỉ ngồi trò chuyện. Phía xa, tòa nhà Bitexco với hình dáng búp sen vươn cao 68 tầng, đỉnh tháp được thắp sáng rực rỡ như một ngọn hải đăng giữa lòng đô thị.

Rẽ vào phố Bùi Viện – "phố Tây" nổi tiếng – không gian thay đổi hoàn toàn. Tiếng nhạc EDM dồn dập từ các quán bar, ánh đèn neon nhiều màu nhảy múa, du khách quốc tế cụng ly bia tươi với người bản địa. Mùi bún bò Huế, ốc hấp sả, và bánh tráng nướng quyện vào nhau, tạo nên một mê cung hương vị khó quên.

Nhưng nét đặc trưng nhất của Sài Gòn về đêm có lẽ là các quán cà phê vỉa hè. Chỉ với một chiếc ghế nhựa thấp, một ly cà phê sữa đá, người Sài Gòn có thể ngồi tâm sự hàng giờ liền. Đây không chỉ là chuyện uống cà phê – mà là một nghi thức xã hội, một cách kết nối con người với con người giữa nhịp sống vội vã.

Khuya hơn, khi đã quá nửa đêm, các quán hủ tiếu, mì gõ, cháo lòng vẫn nườm nượp khách. Tiếng gõ tre "lốc cốc" của xe mì rong vang vọng trong từng con hẻm nhỏ. Người Sài Gòn nói: "Ăn khuya một tô hủ tiếu là biết Sài Gòn rồi đó." Bởi vì trong tô mì ấy chứa đựng tất cả – sự hào sảng, ấm áp, và tinh thần không bao giờ ngủ của một thành phố trẻ.`,
    theoryEn: `## Saigon by Night 🌃

As the sun sets behind District 1's skyscrapers, Saigon does not drift to sleep – instead, the city dons a vibrant new identity. Nguyen Hue, Le Loi, and Dong Khoi streets light up, amber glow reflecting off rain-slicked pavement to paint an emotional urban canvas.

Nguyen Hue pedestrian street – Saigon's nighttime heart – draws thousands of young people who gather to play music, dance hip-hop, roller-skate, or simply chat. In the distance, the Bitexco Tower, shaped like a lotus bud rising 68 stories high, glows like a lighthouse over downtown.

Turn onto Bui Vien Street – the famous "Backpacker Street" – and the atmosphere transforms completely. Pulsing EDM, neon lights, international travelers clinking glasses of fresh beer with locals. The aromas of bún bò Huế, lemongrass snails, and grilled rice paper blend into an unforgettable flavor maze.

Yet the most defining feature of Saigon's nights may be its sidewalk coffee shops. With just a low plastic stool and a glass of iced milk coffee, Saigonese can talk for hours. This is not merely about coffee – it is a social ritual, a way to connect people amid life's rush.

Past midnight, hủ tiếu noodle shops, "mì gõ" street carts, and rice porridge stalls remain packed. The "clack-clack" of bamboo strikers echoes through narrow alleys. Locals say: "Eat a late-night bowl of hủ tiếu and you know Saigon." For inside that bowl lies everything – generosity, warmth, and the unsleeping spirit of a young metropolis.`,
    vocabulary: [
      { word: "lên đèn", meaning: "thắp sáng vào lúc tối", meaningEn: "to light up (at dusk)", example: "Phố Nguyễn Huệ lên đèn lúc bảy giờ.", exampleEn: "Nguyen Hue Street lights up at seven.", partOfSpeech: "verb phrase" },
      { word: "phản chiếu", meaning: "ánh sáng dội lại bề mặt", meaningEn: "to reflect (light)", example: "Ánh đèn phản chiếu xuống mặt nước.", exampleEn: "The lights reflect on the water.", partOfSpeech: "verb" },
      { word: "tụ tập", meaning: "gặp gỡ đông người", meaningEn: "to gather, to congregate", example: "Giới trẻ tụ tập ở công viên.", exampleEn: "Young people gather at the park.", partOfSpeech: "verb" },
      { word: "hải đăng", meaning: "ngọn đèn dẫn đường trên biển", meaningEn: "lighthouse", example: "Tòa Bitexco như một ngọn hải đăng.", exampleEn: "Bitexco Tower is like a lighthouse.", partOfSpeech: "noun" },
      { word: "phố Tây", meaning: "khu phố nhiều du khách nước ngoài", meaningEn: "expat / backpacker street", example: "Bùi Viện là phố Tây nổi tiếng.", exampleEn: "Bui Vien is a famous backpacker street.", partOfSpeech: "noun phrase" },
      { word: "cụng ly", meaning: "chạm ly khi uống", meaningEn: "to clink glasses", example: "Họ cụng ly chúc mừng năm mới.", exampleEn: "They clink glasses for the new year.", partOfSpeech: "verb" },
      { word: "mê cung", meaning: "nơi ngoằn ngoèo khó tìm đường", meaningEn: "labyrinth, maze", example: "Phố cổ như một mê cung.", exampleEn: "The old quarter is like a maze.", partOfSpeech: "noun" },
      { word: "vỉa hè", meaning: "phần đường dành cho người đi bộ", meaningEn: "sidewalk, pavement", example: "Cà phê vỉa hè rất phổ biến.", exampleEn: "Sidewalk coffee is very popular.", partOfSpeech: "noun" },
      { word: "tâm sự", meaning: "kể chuyện riêng tư", meaningEn: "to share intimate feelings, to confide", example: "Hai người bạn tâm sự suốt đêm.", exampleEn: "The two friends talked through the night.", partOfSpeech: "verb" },
      { word: "nườm nượp", meaning: "đông và liên tục", meaningEn: "in a constant stream, packed", example: "Khách nườm nượp vào quán.", exampleEn: "Customers stream into the shop.", partOfSpeech: "adverb" },
      { word: "hào sảng", meaning: "rộng rãi, hào phóng", meaningEn: "generous, big-hearted", example: "Người Sài Gòn rất hào sảng.", exampleEn: "Saigonese are very big-hearted.", partOfSpeech: "adjective" },
      { word: "nhịp sống", meaning: "tốc độ và phong cách sinh hoạt", meaningEn: "pace / rhythm of life", example: "Nhịp sống Sài Gòn rất nhanh.", exampleEn: "Saigon's pace of life is very fast.", partOfSpeech: "noun phrase" },
    ],
    quiz: [
      { question: "Tòa nhà Bitexco có hình dáng gì?", questionEn: "What is Bitexco Tower shaped like?", options: ["Quả trứng", "Búp sen", "Ngọn núi", "Con thuyền"], answer: 1, explanation: "Bitexco có hình búp sen, biểu tượng của Việt Nam.", explanationEn: "Bitexco is shaped like a lotus bud, Vietnam's symbol." },
      { question: "Phố Bùi Viện còn gọi là gì?", questionEn: "What is Bui Vien also called?", options: ["Phố cổ", "Phố Tây", "Phố sách", "Phố hoa"], answer: 1, explanation: "Bùi Viện là 'phố Tây' – nơi tập trung du khách nước ngoài.", explanationEn: "Bui Vien is 'Backpacker Street' for foreign travelers." },
      { question: "'Nườm nượp' miêu tả điều gì?", questionEn: "What does 'nườm nượp' describe?", options: ["Rất ít người", "Đông và liên tục", "Yên tĩnh", "Buồn bã"], answer: 1, explanation: "'Nườm nượp' = đông đúc liên tục không ngớt.", explanationEn: "'Nườm nượp' = constantly packed/streaming." },
      { question: "Người Sài Gòn nổi tiếng với tính cách nào?", questionEn: "What trait are Saigonese famous for?", options: ["Khắt khe", "Hào sảng", "Im lặng", "Cẩn thận"], answer: 1, explanation: "'Hào sảng' = rộng rãi, hào phóng – đặc trưng người Sài Gòn.", explanationEn: "'Hào sảng' = big-hearted generosity, Saigon's trademark." },
      { question: "'Lên đèn' nghĩa là gì?", questionEn: "What does 'lên đèn' mean?", options: ["Tắt đèn", "Thắp sáng vào tối", "Sửa đèn", "Mua đèn"], answer: 1, explanation: "'Lên đèn' = bật đèn lúc trời tối (idiom).", explanationEn: "'Lên đèn' = to light up at dusk (idiom)." },
    ],
  },
  {
    id: "vn-read-v9-2",
    title: "Phở – Linh hồn ẩm thực Việt Nam",
    titleEn: "Phở – The Soul of Vietnamese Cuisine",
    level: "intermediate",
    teacherInsight:
      "Năm 2007, từ 'phở' chính thức được đưa vào Từ điển Oxford English Dictionary. Năm 2017, CNN xếp phở vào top 50 món ăn ngon nhất thế giới. Ngày 12 tháng 12 hàng năm được chọn là 'Ngày của Phở' tại Việt Nam.",
    teacherInsightEn:
      "In 2007, the word 'phở' officially entered the Oxford English Dictionary. In 2017, CNN ranked phở among the world's 50 best foods. December 12 each year is celebrated as 'Phở Day' in Vietnam.",
    theory: `## Phở – Linh hồn ẩm thực Việt 🍜

Nếu hỏi món ăn nào đại diện cho Việt Nam trên bản đồ ẩm thực thế giới, câu trả lời chắc chắn là **phở**. Một tô phở nóng hổi không chỉ là bữa sáng – mà là cả một câu chuyện lịch sử, văn hóa và nghệ thuật ẩm thực được kết tinh qua hàng trăm năm.

Phở ra đời vào đầu thế kỷ 20 tại miền Bắc Việt Nam, có lẽ tại tỉnh Nam Định hoặc Hà Nội. Theo nhiều nhà nghiên cứu, phở chịu ảnh hưởng từ món bún bò "pot-au-feu" của người Pháp (giải thích cho âm "phở" phát âm gần giống "feu") kết hợp với truyền thống sử dụng bánh phở mềm của người Việt và gia vị bò xào của người Hoa. Sự giao thoa văn hóa độc đáo này đã tạo nên một món ăn mang đậm bản sắc.

Linh hồn của một tô phở ngon nằm ở **nước dùng**. Người đầu bếp giỏi phải hầm xương bò trong 8–12 giờ với các gia vị thiên về ấm áp: hoa hồi, quế, gừng nướng, hành tím, thảo quả và đinh hương. Nước dùng phải trong, ngọt thanh, không quá béo, và đặc biệt không được có mùi tanh của xương. Mỗi gia đình, mỗi quán phở đều có công thức gia truyền riêng – và đó là lý do vì sao hai tô phở ở hai con phố cùng Hà Nội có thể có vị khác hẳn nhau.

Phở miền Bắc đặc trưng bởi sự **giản dị và tinh tế**: bánh phở trắng dày dặn, thịt bò tái hoặc chín thái mỏng, hành lá thái nhỏ, một chút tiêu. Không có rau sống, không có giá, không có tương đen tương đỏ. Người Hà Nội tin rằng phở phải "nguyên bản" mới giữ được vị thật.

Khi vào Sài Gòn, phở thay đổi để phù hợp khẩu vị phương Nam – ngọt hơn, đậm hơn, ăn kèm với cả một rổ rau thơm: húng quế, ngò gai, giá đỗ, chanh, ớt. Tương đen, tương đỏ luôn có sẵn trên bàn. Người Sài Gòn gọi đó là "phở Nam" – và họ tự hào không kém người Hà Nội.

Ngày nay, phở đã vượt biên giới quốc gia. Từ Paris, New York đến Sydney, Tokyo, đâu đâu cũng có quán phở Việt. Trong đại dịch COVID-19, hình ảnh người Việt khắp thế giới nấu tô phở nóng cho gia đình đã lan truyền – chứng minh rằng phở không chỉ là món ăn, mà là **sợi dây kết nối** giữa người Việt với cội nguồn quê hương.`,
    theoryEn: `## Phở – The Soul of Vietnamese Cuisine 🍜

If asked which dish represents Vietnam on the world's culinary map, the answer is undoubtedly **phở**. A steaming bowl is more than breakfast – it is a story of history, culture, and culinary artistry crystallized over centuries.

Phở emerged in the early 20th century in northern Vietnam, likely in Nam Định Province or Hanoi. Many scholars believe it was influenced by the French "pot-au-feu" beef stew (explaining the pronunciation closeness of "phở" to "feu") combined with Vietnamese soft rice noodles and Chinese stir-fried beef spices. This unique cultural crossroad created a deeply national dish.

The soul of a great bowl lies in the **broth**. A skilled cook must simmer beef bones for 8–12 hours with warming spices: star anise, cinnamon, charred ginger, shallot, black cardamom, and clove. The broth must be clear, gently sweet, not oily, and crucially free of any boney off-aroma. Each family and each shop guards their own recipe – which is why two bowls on two Hanoi streets can taste entirely different.

Northern phở is defined by **simplicity and refinement**: thick white noodles, thinly sliced rare or well-done beef, finely chopped scallions, a sprinkle of pepper. No fresh herbs, no bean sprouts, no hoisin or chili sauce. Hanoians believe phở must be "original" to keep its true flavor.

When phở traveled south to Saigon, it adapted to southern palates – sweeter, bolder, served with a basket of herbs: Thai basil, sawtooth coriander, bean sprouts, lime, chili. Hoisin and sriracha stand always on the table. Saigonese call it "Southern phở" – and they take no less pride than Hanoians.

Today, phở has crossed borders. From Paris and New York to Sydney and Tokyo, Vietnamese phở shops are everywhere. During the COVID-19 pandemic, images of Vietnamese around the world cooking phở for their families went viral – proving that phở is not just food, but a **thread connecting** Vietnamese people to their homeland.`,
    vocabulary: [
      { word: "kết tinh", meaning: "đọng lại tinh túy qua thời gian", meaningEn: "to crystallize, to refine over time", example: "Văn hóa kết tinh qua nhiều thế hệ.", exampleEn: "Culture crystallizes over many generations.", partOfSpeech: "verb" },
      { word: "giao thoa", meaning: "gặp gỡ và pha trộn", meaningEn: "to interweave, to crossroad", example: "Phở là sự giao thoa văn hóa.", exampleEn: "Phở is a cultural crossroads.", partOfSpeech: "verb" },
      { word: "bản sắc", meaning: "đặc trưng riêng biệt", meaningEn: "identity, distinctive character", example: "Áo dài là bản sắc dân tộc.", exampleEn: "Áo dài represents national identity.", partOfSpeech: "noun" },
      { word: "hầm", meaning: "nấu lâu với lửa nhỏ", meaningEn: "to simmer / slow-cook", example: "Hầm xương 12 giờ.", exampleEn: "Simmer the bones for 12 hours.", partOfSpeech: "verb" },
      { word: "ngọt thanh", meaning: "ngọt nhẹ, không gắt", meaningEn: "delicately sweet", example: "Nước dùng ngọt thanh.", exampleEn: "The broth is delicately sweet.", partOfSpeech: "adjective" },
      { word: "gia truyền", meaning: "truyền từ đời này sang đời khác trong gia đình", meaningEn: "family-inherited, passed-down", example: "Công thức gia truyền ba đời.", exampleEn: "A three-generation family recipe.", partOfSpeech: "adjective" },
      { word: "tinh tế", meaning: "tinh xảo, nhạy bén", meaningEn: "refined, delicate", example: "Văn hóa Huế rất tinh tế.", exampleEn: "Hue culture is very refined.", partOfSpeech: "adjective" },
      { word: "nguyên bản", meaning: "đúng như ban đầu", meaningEn: "original, authentic", example: "Phở nguyên bản không có rau.", exampleEn: "Original phở has no herbs.", partOfSpeech: "adjective" },
      { word: "khẩu vị", meaning: "sở thích về vị giác", meaningEn: "taste, palate preference", example: "Khẩu vị miền Nam thiên về ngọt.", exampleEn: "Southern taste tends toward sweetness.", partOfSpeech: "noun" },
      { word: "vượt biên giới", meaning: "ra khỏi quốc gia", meaningEn: "to cross borders, to go global", example: "Phở đã vượt biên giới.", exampleEn: "Phở has crossed borders.", partOfSpeech: "verb phrase" },
      { word: "lan truyền", meaning: "phát tán rộng rãi", meaningEn: "to spread, to go viral", example: "Video lan truyền trên mạng.", exampleEn: "The video went viral online.", partOfSpeech: "verb" },
      { word: "cội nguồn", meaning: "gốc rễ, nơi xuất xứ", meaningEn: "roots, origin", example: "Phở gợi nhớ cội nguồn.", exampleEn: "Phở evokes one's roots.", partOfSpeech: "noun" },
    ],
    quiz: [
      { question: "Phở được cho là ra đời ở đâu?", questionEn: "Where did phở originate?", options: ["Sài Gòn", "Huế", "Nam Định hoặc Hà Nội", "Đà Nẵng"], answer: 2, explanation: "Phở ra đời đầu thế kỷ 20 ở Nam Định hoặc Hà Nội.", explanationEn: "Phở emerged in early 20th century Nam Định or Hanoi." },
      { question: "Linh hồn của tô phở nằm ở đâu?", questionEn: "Where lies the soul of phở?", options: ["Bánh phở", "Nước dùng", "Thịt bò", "Rau thơm"], answer: 1, explanation: "Nước dùng (broth) là linh hồn của phở.", explanationEn: "The broth is the soul of phở." },
      { question: "Phở miền Bắc thường ăn kèm gì?", questionEn: "Northern phở is served with?", options: ["Rổ rau thơm lớn", "Hành lá và tiêu", "Tương đen tương đỏ", "Giá đỗ và húng quế"], answer: 1, explanation: "Phở Bắc giản dị: chỉ hành lá + tiêu, không rau sống.", explanationEn: "Northern phở is simple: just scallion + pepper, no fresh herbs." },
      { question: "Năm nào từ 'phở' vào Oxford Dictionary?", questionEn: "When did 'phở' enter the Oxford Dictionary?", options: ["2000", "2007", "2015", "2020"], answer: 1, explanation: "Năm 2007, từ 'phở' được Oxford English Dictionary đón nhận.", explanationEn: "In 2007, 'phở' entered the Oxford English Dictionary." },
      { question: "'Gia truyền' nghĩa là gì?", questionEn: "What does 'gia truyền' mean?", options: ["Tự sáng tạo", "Truyền từ đời này sang đời khác", "Học từ sách", "Nhập khẩu"], answer: 1, explanation: "'Gia truyền' = truyền trong gia đình qua nhiều đời.", explanationEn: "'Gia truyền' = passed down through family generations." },
    ],
  },
];

/* ════════════════════════════════════════════════════════════════════════════
 * GRAMMAR — 2 bài chuyên sâu: từ Hán Việt & dấu câu tiếng Việt.
 * ════════════════════════════════════════════════════════════════════════════ */
const grammarLessonsV9: VietnameseLesson[] = [
  {
    id: "vn-gram-v9-1",
    title: "Từ Hán Việt – Lớp vỏ trang trọng của tiếng Việt",
    titleEn: "Sino-Vietnamese Words – The Formal Layer of Vietnamese",
    level: "intermediate",
    teacherInsight:
      "Khoảng 60–70% từ vựng tiếng Việt có nguồn gốc Hán Việt, đặc biệt trong các văn bản học thuật, pháp lý và truyền thông. Hiểu cơ chế Hán Việt giúp người học mở rộng vốn từ theo cấp số nhân.",
    teacherInsightEn:
      "An estimated 60–70% of Vietnamese vocabulary has Sino-Vietnamese (Hán Việt) origins, especially in academic, legal, and media texts. Understanding the Hán Việt system unlocks vocabulary exponentially.",
    theory: `## Từ Hán Việt 📜

**Từ Hán Việt** là những từ tiếng Việt có nguồn gốc từ chữ Hán nhưng được người Việt đọc theo âm Việt cổ. Đây là **lớp từ vựng trang trọng**, mang sắc thái học thuật, lịch sự, cổ kính – khác hẳn với từ thuần Việt vốn dân dã, mộc mạc.

### 1. Đối lập từ thuần Việt vs Hán Việt

| Thuần Việt | Hán Việt | Nghĩa |
|------------|----------|-------|
| nước | thủy | water |
| lửa | hỏa | fire |
| đất | địa | land |
| trời | thiên | sky |
| người | nhân | person |
| nhà | gia / ốc | house |
| vợ chồng | phu thê | husband and wife |
| chết | tử / qua đời | to die |

→ **Quy tắc vàng:** Hán Việt dùng cho hoàn cảnh trang trọng (báo chí, văn bản, lễ tang), thuần Việt dùng trong giao tiếp hàng ngày. Dùng sai sẽ tạo cảm giác "lai căng" hoặc khô khan.

### 2. Cấu trúc kết hợp ngược

Trong Hán Việt, **tính từ thường đứng TRƯỚC danh từ** (ngược với tiếng Việt thuần):

- Hán Việt: **đại** học (great + study) → "trường đại học"
- Thuần Việt: trường **lớn** (school + big)

Các ví dụ phổ biến:
- *hồng nhan* (red + face = beautiful woman)
- *thiên tài* (sky + talent = genius)
- *quốc gia* (country + house = nation)
- *bạch mã* (white + horse = white horse, knight)

### 3. Sắc thái biểu cảm

| Hoàn cảnh | Nên dùng |
|-----------|----------|
| Tin tức, báo cáo | *phụ nữ, nam giới, học sinh, giáo viên, tử vong, hôn nhân* |
| Giao tiếp thân mật | *đàn bà, đàn ông, học trò, thầy cô, chết, lấy vợ/chồng* |
| Văn cảnh trang nghiêm (đám tang) | *qua đời, từ trần, tạ thế* (KHÔNG dùng "chết") |
| Hợp đồng pháp lý | *đương sự, bên thứ ba, vô hiệu, hiệu lực* |

**Mẹo của thầy Hải:** Khi viết email công việc, dùng "kính gửi" thay "gửi", "trân trọng" thay "chào", "phối hợp" thay "làm chung". Một câu có 2–3 từ Hán Việt đúng chỗ sẽ nâng cấp ngay phong cách của bạn.`,
    theoryEn: `## Sino-Vietnamese Words 📜

**Hán Việt** words are Vietnamese vocabulary borrowed from Classical Chinese, but pronounced using archaic Vietnamese readings. They form a **formal vocabulary layer** carrying academic, polite, and classical nuances – very different from native (thuần Việt) words, which are everyday and rustic.

### 1. Native vs Sino-Vietnamese pairs
Examples: nước/thủy (water), lửa/hỏa (fire), người/nhân (person), chết/tử (to die).

→ **Rule of thumb:** Sino-Vietnamese for formal contexts (news, legal documents, funerals); native for daily conversation. Misuse sounds either pretentious or cold.

### 2. Reverse word order
Sino-Vietnamese typically follows the **adjective + noun** Chinese order, opposite to native Vietnamese:
- *đại học* (great study = university)
- *hồng nhan* (red face = beautiful woman)
- *quốc gia* (country house = nation)

### 3. Register hierarchy
- **News:** phụ nữ, học sinh, tử vong, hôn nhân
- **Casual chat:** đàn bà, học trò, chết, lấy vợ
- **Funeral context:** ONLY qua đời, từ trần, tạ thế (never "chết")
- **Legal contracts:** đương sự, vô hiệu, hiệu lực

Pro tip: In work emails, swap "gửi" → "kính gửi", "chào" → "trân trọng", "làm chung" → "phối hợp" to instantly upgrade your register.`,
    vocabulary: [
      { word: "Hán Việt", meaning: "từ gốc Hán đọc theo âm Việt", meaningEn: "Sino-Vietnamese (Han-Viet)", example: "Từ Hán Việt chiếm 60% tiếng Việt.", exampleEn: "Sino-Vietnamese forms 60% of Vietnamese.", partOfSpeech: "noun" },
      { word: "thuần Việt", meaning: "từ gốc Việt bản địa", meaningEn: "native Vietnamese", example: "'Nước' là từ thuần Việt.", exampleEn: "'Nước' is a native Vietnamese word.", partOfSpeech: "adjective" },
      { word: "trang trọng", meaning: "long trọng, lịch sự", meaningEn: "formal, dignified", example: "Lễ cưới trang trọng.", exampleEn: "A formal wedding ceremony.", partOfSpeech: "adjective" },
      { word: "sắc thái", meaning: "ý nghĩa tinh tế kèm theo", meaningEn: "nuance, shade of meaning", example: "Mỗi từ có sắc thái riêng.", exampleEn: "Each word carries its own nuance.", partOfSpeech: "noun" },
      { word: "phụ nữ", meaning: "(Hán Việt) đàn bà", meaningEn: "woman (formal)", example: "Ngày Phụ Nữ Việt Nam 20/10.", exampleEn: "Vietnam Women's Day October 20.", partOfSpeech: "noun" },
      { word: "tử vong", meaning: "(Hán Việt) chết", meaningEn: "death (formal/medical)", example: "Tỷ lệ tử vong giảm.", exampleEn: "The mortality rate is decreasing.", partOfSpeech: "noun" },
      { word: "qua đời", meaning: "chết (lịch sự, trang nghiêm)", meaningEn: "to pass away (respectful)", example: "Ông cụ đã qua đời hôm qua.", exampleEn: "The old man passed away yesterday.", partOfSpeech: "verb" },
      { word: "kính gửi", meaning: "gửi (trang trọng, đầu thư)", meaningEn: "respectfully sent to (formal)", example: "Kính gửi Ban Giám đốc.", exampleEn: "Respectfully to the Board of Directors.", partOfSpeech: "phrase" },
      { word: "trân trọng", meaning: "kính trọng sâu sắc", meaningEn: "respectfully (formal closing)", example: "Trân trọng cảm ơn quý vị.", exampleEn: "Respectfully thanking everyone.", partOfSpeech: "adverb" },
      { word: "phối hợp", meaning: "(Hán Việt) cùng làm việc", meaningEn: "to cooperate, collaborate", example: "Phối hợp với bộ phận khác.", exampleEn: "Coordinate with another department.", partOfSpeech: "verb" },
      { word: "đại học", meaning: "trường học cao cấp nhất", meaningEn: "university (great + study)", example: "Tôi học đại học Bách khoa.", exampleEn: "I study at Bach Khoa University.", partOfSpeech: "noun" },
      { word: "quốc gia", meaning: "đất nước", meaningEn: "nation (country + house)", example: "Bảo vệ quốc gia.", exampleEn: "To protect the nation.", partOfSpeech: "noun" },
    ],
    quiz: [
      { question: "Khoảng bao nhiêu % từ vựng tiếng Việt là Hán Việt?", questionEn: "What % of Vietnamese vocabulary is Sino-Vietnamese?", options: ["10–20%", "30–40%", "60–70%", "90%"], answer: 2, explanation: "Khoảng 60–70%, đặc biệt cao trong văn bản học thuật.", explanationEn: "About 60–70%, especially high in academic texts." },
      { question: "'Thủy' (Hán Việt) tương đương từ thuần Việt nào?", questionEn: "'Thủy' (Sino-Viet) = which native word?", options: ["lửa", "đất", "nước", "trời"], answer: 2, explanation: "Thủy = nước (water).", explanationEn: "Thủy = water." },
      { question: "Trong đám tang KHÔNG nên dùng từ nào?", questionEn: "At a funeral, AVOID which word?", options: ["qua đời", "từ trần", "chết", "tạ thế"], answer: 2, explanation: "'Chết' quá thô; nên dùng qua đời/từ trần/tạ thế.", explanationEn: "'Chết' is too blunt; use qua đời/từ trần/tạ thế." },
      { question: "Trật tự từ Hán Việt như thế nào?", questionEn: "Sino-Vietnamese word order?", options: ["DT + TT", "TT + DT", "Không có quy luật", "Tự do"], answer: 1, explanation: "Hán Việt: tính từ TRƯỚC danh từ (đại học, hồng nhan).", explanationEn: "Sino-Viet: adjective BEFORE noun (đại học, hồng nhan)." },
      { question: "Mở đầu email công việc nên dùng?", questionEn: "Best formal email opening?", options: ["Chào bạn", "Hi ơi", "Kính gửi", "Gửi nha"], answer: 2, explanation: "'Kính gửi' là chuẩn mực email công vụ.", explanationEn: "'Kính gửi' is the official email standard." },
    ],
  },
  {
    id: "vn-gram-v9-2",
    title: "Dấu câu tiếng Việt – Nghệ thuật ngắt nhịp",
    titleEn: "Vietnamese Punctuation – The Art of Pacing",
    level: "intermediate",
    teacherInsight:
      "Tiếng Việt vay mượn hệ thống dấu câu của phương Tây nhưng có những quy ước riêng biệt – đặc biệt với dấu phẩy, dấu ba chấm và dấu hai chấm. Sai dấu câu có thể làm câu mất nghĩa hoàn toàn.",
    teacherInsightEn:
      "Vietnamese borrowed Western punctuation but developed unique conventions – especially for the comma, ellipsis, and colon. Wrong punctuation can change a sentence's meaning entirely.",
    theory: `## Dấu câu tiếng Việt ✒️

Dấu câu không chỉ là quy tắc kỹ thuật – mà là **âm nhạc của câu văn**. Người Việt nói: "Đặt dấu sai một li, ý nghĩa đi một dặm."

### 1. Dấu phẩy (,) – linh hoạt nhất

**Dùng đúng:**
- Ngắt các thành phần đồng cấp: *Tôi mua táo, lê, cam và chuối.*
- Tách trạng ngữ đầu câu: *Hôm qua, tôi đi học.*
- Tách mệnh đề: *Vì trời mưa, chúng tôi ở nhà.*
- Trước "nhưng", "và" khi nối hai mệnh đề độc lập dài.

**Sai phổ biến:** Không bao giờ đặt dấu phẩy giữa **chủ ngữ và vị ngữ**:
- ❌ *Nam, đi học.* | ✅ *Nam đi học.*

### 2. Dấu chấm (.) – tạo nhịp

Kết thúc câu trần thuật. **Luôn cách 1 khoảng trắng** trước từ tiếp theo. Không có khoảng trắng TRƯỚC dấu chấm.
- ❌ *Tôi đi học .* | ✅ *Tôi đi học.*

### 3. Dấu hỏi (?) và dấu chấm than (!)

- *Bạn khỏe không?* (câu hỏi)
- *Đẹp quá!* (cảm thán)

⚠️ Tiếng Việt **không có dấu chấm hỏi ngược** đầu câu như tiếng Tây Ban Nha.

### 4. Dấu hai chấm (:) – mở rộng

Báo hiệu sẽ có liệt kê, trích dẫn, hoặc giải thích:
- *Có ba miền: Bắc, Trung, Nam.*
- *Cô ấy nói: "Tôi yêu Việt Nam."*

### 5. Dấu chấm phẩy (;) – ít dùng

Chia hai mệnh đề độc lập có liên hệ chặt chẽ. Trong văn bản hiện đại, người Việt thường thay bằng dấu chấm. Vẫn hữu dụng trong văn chính luận, học thuật.

### 6. Dấu ba chấm (…) – đặc biệt Việt Nam

Người Việt dùng dấu ba chấm RẤT nhiều để biểu thị:
- Ý chưa hết: *Tôi đang nghĩ…*
- Im lặng/ngập ngừng: *À… ừ… để tôi xem.*
- Bỏ lửng (lịch sự): *Nếu bạn muốn… thì tôi cũng được.*

→ Đây là nét đặc trưng tinh tế của văn phong tiếng Việt – dùng quá nhiều sẽ thành rườm rà, nhưng dùng đúng tạo sắc thái cảm xúc rất sâu.

### 7. Dấu ngoặc kép ("…") – có hai loại

- **Chữ thẳng:** "..." (chuẩn quốc tế, dùng trên máy tính)
- **Chữ cong/dấu góc:** «…» hoặc 「…」 (dùng trong văn bản sách báo cao cấp)

**Mẹo của thầy Hải:** Khi viết tin nhắn hoặc bài đăng mạng xã hội, ĐỪNG kết thúc câu bằng dấu chấm – nó nghe quá gay gắt và lạnh lùng với người trẻ Việt. Thay bằng dấu chấm than, biểu tượng cảm xúc, hoặc bỏ luôn dấu cuối.`,
    theoryEn: `## Vietnamese Punctuation ✒️

Punctuation is the **music of writing**. A Vietnamese saying: "Wrong punctuation by an inch, meaning by a mile."

### Key rules:
1. **Comma (,)** — separates list items, opening adverbs, clauses. NEVER between subject and verb.
2. **Period (.)** — ends declarative sentences. One space AFTER, none before.
3. **Question (?) / Exclamation (!)** — Vietnamese has NO inverted opening marks (unlike Spanish).
4. **Colon (:)** — signals lists, quotes, explanations.
5. **Semicolon (;)** — rare; usually replaced by period in modern writing.
6. **Ellipsis (…)** — heavily used in Vietnamese for unfinished thoughts, hesitation, polite trailing off. Distinctive feature of Vietnamese style.
7. **Quotation marks** — standard "..." for digital text; «…» or 「…」 in fine publishing.

Pro tip: In texts and social media, do NOT end a sentence with a period — young Vietnamese read it as cold and aggressive. Use exclamation marks, emojis, or omit the final punctuation.`,
    vocabulary: [
      { word: "dấu câu", meaning: "ký hiệu ngắt câu", meaningEn: "punctuation", example: "Sử dụng dấu câu chính xác.", exampleEn: "Use punctuation accurately.", partOfSpeech: "noun" },
      { word: "dấu phẩy", meaning: "ký hiệu ',' ngắn", meaningEn: "comma", example: "Đặt dấu phẩy sau trạng ngữ.", exampleEn: "Place a comma after an adverbial.", partOfSpeech: "noun" },
      { word: "dấu chấm", meaning: "ký hiệu '.' kết câu", meaningEn: "period, full stop", example: "Câu kết bằng dấu chấm.", exampleEn: "The sentence ends with a period.", partOfSpeech: "noun" },
      { word: "dấu hỏi", meaning: "'?' câu hỏi", meaningEn: "question mark", example: "Cuối câu hỏi dùng dấu hỏi.", exampleEn: "End questions with '?'.", partOfSpeech: "noun" },
      { word: "dấu chấm than", meaning: "'!' câu cảm thán", meaningEn: "exclamation mark", example: "Đẹp quá! cần dấu chấm than.", exampleEn: "'Đẹp quá!' needs an exclamation mark.", partOfSpeech: "noun" },
      { word: "dấu hai chấm", meaning: "':' báo trước nội dung", meaningEn: "colon", example: "Có ba miền: Bắc, Trung, Nam.", exampleEn: "Three regions: North, Central, South.", partOfSpeech: "noun" },
      { word: "dấu ba chấm", meaning: "'…' bỏ lửng", meaningEn: "ellipsis", example: "Tôi đang nghĩ…", exampleEn: "I'm thinking…", partOfSpeech: "noun" },
      { word: "trạng ngữ", meaning: "thành phần chỉ thời gian/nơi chốn", meaningEn: "adverbial phrase", example: "Hôm qua là trạng ngữ.", exampleEn: "'Hôm qua' is an adverbial.", partOfSpeech: "noun" },
      { word: "mệnh đề", meaning: "cụm có chủ-vị", meaningEn: "clause", example: "Câu phức có hai mệnh đề.", exampleEn: "A complex sentence has two clauses.", partOfSpeech: "noun" },
      { word: "ngắt nhịp", meaning: "tạo khoảng nghỉ", meaningEn: "to pace, to pause", example: "Dấu câu giúp ngắt nhịp.", exampleEn: "Punctuation creates pacing.", partOfSpeech: "verb" },
      { word: "rườm rà", meaning: "dài dòng không cần thiết", meaningEn: "verbose, cluttered", example: "Văn rườm rà khó hiểu.", exampleEn: "Verbose writing is hard to read.", partOfSpeech: "adjective" },
      { word: "ngập ngừng", meaning: "do dự, chần chừ", meaningEn: "hesitant", example: "Anh ấy nói ngập ngừng.", exampleEn: "He spoke hesitantly.", partOfSpeech: "adverb" },
    ],
    quiz: [
      { question: "Câu nào ĐÚNG dấu câu?", questionEn: "Which sentence has correct punctuation?", options: ["Nam, đi học.", "Nam đi học .", "Nam đi học.", "Nam đi học,"], answer: 2, explanation: "Không phẩy giữa CN-VN, không khoảng trắng trước dấu chấm.", explanationEn: "No comma between subject-verb, no space before period." },
      { question: "Tiếng Việt có dấu chấm hỏi ngược đầu câu không?", questionEn: "Does Vietnamese use opening inverted '?'?", options: ["Có, như tiếng Tây Ban Nha", "Không", "Chỉ trong văn cổ", "Tùy ý"], answer: 1, explanation: "Tiếng Việt KHÔNG có dấu hỏi ngược đầu câu.", explanationEn: "Vietnamese has NO opening inverted question mark." },
      { question: "Dấu nào báo hiệu liệt kê hoặc trích dẫn?", questionEn: "Which mark signals a list or quote?", options: ["dấu phẩy", "dấu hai chấm", "dấu chấm phẩy", "dấu ba chấm"], answer: 1, explanation: "Dấu hai chấm (:) báo trước liệt kê hoặc trích dẫn.", explanationEn: "Colon (:) signals a list or quotation." },
      { question: "Khi nhắn tin với người trẻ Việt, nên?", questionEn: "When texting young Vietnamese, you should?", options: ["Luôn kết thúc bằng dấu chấm", "Tránh dấu chấm vì nghe lạnh", "Dùng nhiều dấu chấm phẩy", "Không dùng dấu nào"], answer: 1, explanation: "Dấu chấm cuối câu nghe gay gắt; dùng '!' hoặc emoji.", explanationEn: "Period at sentence end sounds cold; use '!' or emoji." },
      { question: "Dấu ba chấm (…) thường biểu thị gì?", questionEn: "What does the ellipsis (…) often express?", options: ["Sự rõ ràng dứt khoát", "Ngập ngừng, bỏ lửng", "Mệnh lệnh", "Câu hỏi"], answer: 1, explanation: "Dấu ba chấm dùng cho ngập ngừng, ý chưa hết, bỏ lửng lịch sự.", explanationEn: "Ellipsis is for hesitation, unfinished thoughts, polite trailing off." },
    ],
  },
];

/* ════════════════════════════════════════════════════════════════════════════
 * FOLKLORE — 2 bài tục ngữ / ca dao thường gặp trong văn nói hàng ngày.
 * ════════════════════════════════════════════════════════════════════════════ */
const folkloreLessonsV9: VietnameseLesson[] = [
  {
    id: "vn-folk-v9-1",
    title: "Tục ngữ về tình bạn & lòng người",
    titleEn: "Proverbs on Friendship & Human Nature",
    level: "intermediate",
    teacherInsight:
      "Tục ngữ tình bạn được người Việt dùng cực kỳ phổ biến trong giao tiếp hàng ngày – từ chuyện vui đến lời khuyên nghiêm túc. Nắm 5 câu tục ngữ này, bạn sẽ hiểu được 80% các cuộc trò chuyện về quan hệ.",
    teacherInsightEn:
      "Friendship proverbs are heavily used in daily Vietnamese conversation – from jokes to serious advice. Master these 5 proverbs and you'll understand 80% of conversations about relationships.",
    theory: `## Tục ngữ về tình bạn 🤝

### 1. **"Ăn cây nào, rào cây ấy"**
- **Nghĩa đen:** Ai ăn quả cây nào thì phải bảo vệ cây đó.
- **Nghĩa bóng:** Hưởng lợi từ ai/nơi nào thì phải trung thành với nơi đó.
- **Dùng khi:** Khuyên người đang hưởng lương từ một công ty không nên nói xấu công ty đó.

### 2. **"Gần mực thì đen, gần đèn thì sáng"**
- **Nghĩa đen:** Gần mực thì lấm, gần đèn thì được chiếu sáng.
- **Nghĩa bóng:** Môi trường và bạn bè ảnh hưởng đến tính cách.
- **Dùng khi:** Cha mẹ khuyên con chọn bạn tốt mà chơi.

### 3. **"Học thầy không tày học bạn"**
- **Nghĩa đen:** Học từ thầy không bằng học từ bạn.
- **Nghĩa bóng:** Bạn bè đồng trang lứa có thể dạy ta những điều thầy không dạy được. ⚠️ KHÔNG có nghĩa coi thường thầy.
- **Dùng khi:** Nhấn mạnh tầm quan trọng của học nhóm.

### 4. **"Chọn bạn mà chơi, chọn nơi mà ở"**
- **Nghĩa bóng:** Phải cẩn thận khi chọn bạn và chọn nơi sinh sống.
- **Dùng khi:** Cha mẹ khuyên con khi đi học xa nhà.

### 5. **"Lòng người khó dò"**
- **Nghĩa đen:** Tấm lòng con người khó đo lường.
- **Nghĩa bóng:** Đừng vội đánh giá ai – con người có thể giấu cảm xúc và ý đồ.
- **Dùng khi:** Nhắc nhở phải thận trọng trong quan hệ.

### Mẹo dùng tục ngữ
- Đừng dùng quá NHIỀU trong một câu – sẽ thành sáo rỗng.
- Khi dùng, nên có **giọng điệu hơi chậm rãi và nhấn từ** – như đang trích dẫn người xưa.
- Người trẻ Việt hiện đại vẫn dùng tục ngữ, nhưng thường pha trộn với cách nói hiện đại để bớt nặng nề.`,
    theoryEn: `## Friendship Proverbs 🤝

Five high-frequency Vietnamese proverbs about friendship and human nature:

1. **"Ăn cây nào, rào cây ấy"** — Loyalty to the source of one's benefit. Used to warn employees against badmouthing their employer.
2. **"Gần mực thì đen, gần đèn thì sáng"** — Environment shapes character. Parents use it to encourage children to choose good friends.
3. **"Học thầy không tày học bạn"** — Peers can teach what teachers cannot. NOT disrespect to teachers — celebrates group learning.
4. **"Chọn bạn mà chơi, chọn nơi mà ở"** — Choose friends and dwelling carefully. Used when young people leave home.
5. **"Lòng người khó dò"** — Human hearts are hard to read. Reminds caution in relationships.

Pro tip: Don't overload one sentence with proverbs (sounds clichéd). Speak slightly slower with emphasis, like quoting the ancients. Modern young Vietnamese still use them but mix in casual language.`,
    vocabulary: [
      { word: "tục ngữ", meaning: "câu nói dân gian ngắn gọn", meaningEn: "proverb, saying", example: "Tục ngữ ngắn gọn mà sâu sắc.", exampleEn: "Proverbs are short yet profound.", partOfSpeech: "noun" },
      { word: "rào", meaning: "bảo vệ, dựng hàng rào", meaningEn: "to fence, to protect", example: "Rào vườn rau.", exampleEn: "Fence the vegetable garden.", partOfSpeech: "verb" },
      { word: "mực", meaning: "chất lỏng đen để viết", meaningEn: "ink", example: "Gần mực thì đen.", exampleEn: "Near ink, you'll get dark.", partOfSpeech: "noun" },
      { word: "đèn", meaning: "vật phát sáng", meaningEn: "lamp, light", example: "Gần đèn thì sáng.", exampleEn: "Near light, you'll shine.", partOfSpeech: "noun" },
      { word: "trang lứa", meaning: "cùng độ tuổi", meaningEn: "of the same age group, peer", example: "Bạn đồng trang lứa.", exampleEn: "Peers of the same age.", partOfSpeech: "noun" },
      { word: "dò", meaning: "đo lường, tìm hiểu", meaningEn: "to gauge, to probe", example: "Lòng người khó dò.", exampleEn: "Human hearts are hard to gauge.", partOfSpeech: "verb" },
      { word: "ý đồ", meaning: "dụng ý sâu xa", meaningEn: "hidden intention, motive", example: "Anh ấy có ý đồ riêng.", exampleEn: "He has a hidden motive.", partOfSpeech: "noun" },
      { word: "sáo rỗng", meaning: "nói nhiều mà rỗng tuếch", meaningEn: "clichéd, hollow", example: "Lời hứa sáo rỗng.", exampleEn: "A hollow promise.", partOfSpeech: "adjective" },
      { word: "trích dẫn", meaning: "dẫn lại lời người khác", meaningEn: "to quote, to cite", example: "Trích dẫn ca dao.", exampleEn: "Quote folk verse.", partOfSpeech: "verb" },
      { word: "thận trọng", meaning: "cẩn thận, kỹ lưỡng", meaningEn: "cautious, careful", example: "Phải thận trọng kết bạn.", exampleEn: "Be cautious in making friends.", partOfSpeech: "adjective" },
    ],
    quiz: [
      { question: "'Ăn cây nào, rào cây ấy' khuyên điều gì?", questionEn: "What does 'Ăn cây nào, rào cây ấy' teach?", options: ["Ăn nhiều loại quả", "Trung thành với nơi mình hưởng lợi", "Trồng cây", "Ăn ít"], answer: 1, explanation: "Khuyên trung thành với nguồn lợi của mình.", explanationEn: "Teaches loyalty to one's source of benefit." },
      { question: "'Gần mực thì đen' nói về điều gì?", questionEn: "What is 'Gần mực thì đen' about?", options: ["Mực để viết", "Môi trường ảnh hưởng tính cách", "Cách viết chữ", "Đêm tối"], answer: 1, explanation: "Môi trường và bạn bè ảnh hưởng đến con người.", explanationEn: "Environment and friends shape character." },
      { question: "'Học thầy không tày học bạn' KHÔNG có nghĩa là?", questionEn: "'Học thầy không tày học bạn' does NOT mean?", options: ["Học từ bạn rất quý", "Coi thường thầy cô", "Học nhóm hiệu quả", "Bạn đôi khi dạy hay hơn"], answer: 1, explanation: "KHÔNG có nghĩa coi thường thầy – chỉ tôn vinh học nhóm.", explanationEn: "Does NOT belittle teachers – celebrates peer learning." },
      { question: "'Lòng người khó dò' khuyên ta?", questionEn: "'Lòng người khó dò' advises us to?", options: ["Tin tưởng mọi người", "Thận trọng trong quan hệ", "Sống cô đơn", "Hỏi nhiều câu"], answer: 1, explanation: "Khuyên thận trọng vì khó đoán lòng người.", explanationEn: "Advises caution since hearts are hard to read." },
      { question: "Khi dùng tục ngữ, nên?", questionEn: "When using proverbs, you should?", options: ["Dùng càng nhiều càng tốt", "Nhấn từ, nói chậm rãi", "Hét to lên", "Nói nhanh"], answer: 1, explanation: "Nói chậm rãi và nhấn từ – như trích người xưa.", explanationEn: "Speak slowly with emphasis – like quoting the ancients." },
    ],
  },
  {
    id: "vn-folk-v9-2",
    title: "Ca dao về quê hương & nỗi nhớ",
    titleEn: "Folk Verses on Homeland & Longing",
    level: "intermediate",
    teacherInsight:
      "Ca dao quê hương là dòng chảy cảm xúc của người Việt qua hàng nghìn năm. Đặc biệt với cộng đồng Việt kiều xa quê, những vần ca dao này là sợi dây nối với cội nguồn.",
    teacherInsightEn:
      "Folk verse about homeland is the emotional current of Vietnamese for thousands of years. Especially for overseas Vietnamese, these verses are threads to their roots.",
    theory: `## Ca dao Quê hương 🌾

### 1. **"Anh đi anh nhớ quê nhà,**
### **Nhớ canh rau muống, nhớ cà dầm tương."**

- **Bối cảnh:** Lời người đi xa nhớ về bữa cơm quê đạm bạc.
- **Sắc thái:** Bình dị, nhưng đầy xúc động – nỗi nhớ qua món ăn dân dã.
- **Cấu trúc:** Thể lục bát (6-8) – nhịp 2/2/2 cho câu 6, nhịp 2/2/4 cho câu 8.

### 2. **"Quê hương nếu ai không nhớ,**
### **Sẽ không lớn nổi thành người."**

- **Tác giả:** Đỗ Trung Quân (thơ hiện đại, đã trở thành "ca dao mới").
- **Sắc thái:** Khẳng định mạnh mẽ về tình yêu quê hương.
- **Dùng khi:** Bài phát biểu, khai mạc sự kiện văn hóa.

### 3. **"Chiều chiều ra đứng ngõ sau,**
### **Trông về quê mẹ ruột đau chín chiều."**

- **Bối cảnh:** Lời người con gái lấy chồng xa nhớ mẹ.
- **Sắc thái:** Bi thương, da diết. "Chín chiều" = chín bề, ý chỉ nỗi đau ở mọi mặt.
- **Mẹo phân tích:** Từ "chiều chiều" lặp lại tạo nhịp buồn man mác.

### 4. **"Bầu ơi thương lấy bí cùng,**
### **Tuy rằng khác giống nhưng chung một giàn."**

- **Nghĩa bóng:** Người Việt dù khác hoàn cảnh nhưng cùng "một giàn" – một dân tộc, nên phải thương nhau.
- **Dùng khi:** Kêu gọi đoàn kết dân tộc, cứu trợ thiên tai.

### 5. **"Ta về ta tắm ao ta,**
### **Dù trong dù đục ao nhà vẫn hơn."**

- **Nghĩa bóng:** Quê hương dù nghèo, dù xấu cũng vẫn quý nhất.
- **Dùng khi:** Người Việt kiều quyết định về nước; lời khuyên giữ gìn truyền thống.

### Mẹo đọc ca dao
- **Thể lục bát** (6-8) là thể thơ thuần Việt – đọc với nhịp **2/2/2** (câu 6) và **2/2/2/2** hoặc **2/2/4** (câu 8).
- Khi đọc, **kéo dài âm cuối câu lục** và **xuống giọng nhẹ cuối câu bát**.
- Ca dao thường có **vần lưng**: chữ thứ 6 câu 6 vần với chữ thứ 6 câu 8.`,
    theoryEn: `## Folk Verses on Homeland 🌾

Five iconic Vietnamese folk verses on homeland and longing:

1. **"Anh đi anh nhớ quê nhà, / Nhớ canh rau muống, nhớ cà dầm tương."** — A traveler remembers home through humble dishes (water spinach soup, pickled eggplant).
2. **"Quê hương nếu ai không nhớ, / Sẽ không lớn nổi thành người."** — Modern verse (Đỗ Trung Quân) that became proverbial: those who forget homeland cannot mature as humans.
3. **"Chiều chiều ra đứng ngõ sau, / Trông về quê mẹ ruột đau chín chiều."** — A married-away daughter aches for her mother. "Chín chiều" = pain on all sides.
4. **"Bầu ơi thương lấy bí cùng, / Tuy rằng khác giống nhưng chung một giàn."** — Gourds and squashes: different species but one trellis. Vietnamese should love one another despite differences. Used in disaster-relief calls.
5. **"Ta về ta tắm ao ta, / Dù trong dù đục ao nhà vẫn hơn."** — Bathe in your own pond, clear or murky — homeland is still best.

Reading tip: lục bát (6-8) verse — read 2/2/2 in the 6-syllable line, 2/2/2/2 or 2/2/4 in the 8-syllable line. Stretch the last syllable of the 6-line, soften the last of the 8-line.`,
    vocabulary: [
      { word: "ca dao", meaning: "thơ dân gian truyền miệng", meaningEn: "folk verse", example: "Ca dao Việt Nam rất phong phú.", exampleEn: "Vietnamese folk verse is very rich.", partOfSpeech: "noun" },
      { word: "lục bát", meaning: "thể thơ 6-8 chữ", meaningEn: "lục bát (6-8) meter", example: "Truyện Kiều viết bằng lục bát.", exampleEn: "The Tale of Kiều is written in lục bát.", partOfSpeech: "noun" },
      { word: "rau muống", meaning: "loại rau xanh phổ biến", meaningEn: "water spinach", example: "Canh rau muống đậm vị quê.", exampleEn: "Water spinach soup tastes of home.", partOfSpeech: "noun" },
      { word: "cà dầm tương", meaning: "cà muối ngâm tương", meaningEn: "soy-pickled eggplant", example: "Cà dầm tương ăn với cơm.", exampleEn: "Soy-pickled eggplant eaten with rice.", partOfSpeech: "noun" },
      { word: "đạm bạc", meaning: "giản dị, ít món", meaningEn: "simple, frugal (food)", example: "Bữa cơm đạm bạc.", exampleEn: "A frugal meal.", partOfSpeech: "adjective" },
      { word: "ngõ sau", meaning: "lối nhỏ phía sau nhà", meaningEn: "back alley", example: "Đứng ở ngõ sau.", exampleEn: "Standing in the back alley.", partOfSpeech: "noun" },
      { word: "ruột đau", meaning: "đau lòng sâu sắc", meaningEn: "heartache (lit. gut-pain)", example: "Ruột đau chín chiều.", exampleEn: "Heartache on all sides.", partOfSpeech: "verb phrase" },
      { word: "đoàn kết", meaning: "gắn bó cùng nhau", meaningEn: "unity, solidarity", example: "Đoàn kết là sức mạnh.", exampleEn: "Unity is strength.", partOfSpeech: "noun/verb" },
      { word: "giàn", meaning: "khung tre/gỗ đỡ cây leo", meaningEn: "trellis", example: "Bầu bí cùng một giàn.", exampleEn: "Gourds and squashes share one trellis.", partOfSpeech: "noun" },
      { word: "kiều bào", meaning: "người Việt sống ở nước ngoài", meaningEn: "overseas Vietnamese", example: "Kiều bào về nước ăn Tết.", exampleEn: "Overseas Vietnamese return home for Tết.", partOfSpeech: "noun" },
      { word: "cội nguồn", meaning: "gốc rễ tổ tiên", meaningEn: "ancestral roots", example: "Nhớ về cội nguồn.", exampleEn: "Remember one's roots.", partOfSpeech: "noun" },
      { word: "vần lưng", meaning: "vần giữa câu", meaningEn: "middle rhyme (internal)", example: "Lục bát có vần lưng đặc trưng.", exampleEn: "Lục bát has distinctive internal rhyme.", partOfSpeech: "noun" },
    ],
    quiz: [
      { question: "Thể thơ chính của ca dao Việt là gì?", questionEn: "Main verse form of Vietnamese folk poetry?", options: ["Thất ngôn", "Lục bát", "Tự do", "Tứ tuyệt"], answer: 1, explanation: "Lục bát (6-8) là thể thuần Việt phổ biến nhất.", explanationEn: "Lục bát (6-8) is the most common native form." },
      { question: "'Ruột đau chín chiều' nghĩa là gì?", questionEn: "What does 'ruột đau chín chiều' mean?", options: ["Đau bụng 9 buổi chiều", "Đau lòng mọi mặt", "Đói bụng", "Mệt mỏi"], answer: 1, explanation: "'Chín chiều' = chín bề = mọi mặt; ý chỉ nỗi đau toàn diện.", explanationEn: "'Chín chiều' = on all sides; total heartache." },
      { question: "'Bầu ơi thương lấy bí cùng' kêu gọi điều gì?", questionEn: "What does 'Bầu ơi…' call for?", options: ["Trồng bầu bí", "Đoàn kết dân tộc", "Ăn rau", "Học làm vườn"], answer: 1, explanation: "Kêu gọi người Việt thương yêu, đoàn kết.", explanationEn: "Calls for Vietnamese unity and mutual love." },
      { question: "'Ao nhà' trong câu 'tắm ao ta' tượng trưng cho?", questionEn: "What does 'ao nhà' symbolize?", options: ["Hồ bơi", "Quê hương", "Sông", "Biển"], answer: 1, explanation: "'Ao nhà' = quê hương; dù xấu vẫn quý nhất.", explanationEn: "'Ao nhà' = homeland; still dearest despite flaws." },
      { question: "Bài thơ 'Quê hương nếu ai không nhớ…' của ai?", questionEn: "Who wrote 'Quê hương nếu ai không nhớ…'?", options: ["Khuyết danh", "Đỗ Trung Quân", "Xuân Diệu", "Nguyễn Du"], answer: 1, explanation: "Đỗ Trung Quân – thơ hiện đại đã trở thành 'ca dao mới'.", explanationEn: "Đỗ Trung Quân – modern poem that became proverbial." },
    ],
  },
];

/* ════════════════════════════════════════════════════════════════════════════
 * Mutate target modules (matches existing .push pattern in this folder).
 * ════════════════════════════════════════════════════════════════════════════ */
if (readingModules[0]) readingModules[0].lessons.push(...readingLessonsV9);
if (grammarModules[0]) grammarModules[0].lessons.push(...grammarLessonsV9);
if (folkloreLanguageModules[0]) folkloreLanguageModules[0].lessons.push(...folkloreLessonsV9);

export const vietnameseExpansionV9Counts = {
  reading: readingLessonsV9.length,
  grammar: grammarLessonsV9.length,
  folklore: folkloreLessonsV9.length,
};
