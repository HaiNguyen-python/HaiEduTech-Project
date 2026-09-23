/**
 * @file vffReadingExpansion.ts
 * @description Mở rộng 15 bài đọc cho VFF Reading Lab (A1/A2/B1), giữ nguyên id cũ.
 */
import type { ReadingPassage } from "./vffReadingBank";

export const vffReadingExpansion: ReadingPassage[] = [
  {
    id: "r-a1-11",
    level: "A1",
    title: "Thời khoá biểu lớp tiếng Việt",
    titleEn: "Vietnamese class timetable",
    wordCount: 42,
    passage:
      "LỚP TIẾNG VIỆT A1\nThứ hai: 18:00 - 19:30 (Nghe nói)\nThứ tư: 18:00 - 19:30 (Đọc viết)\nThứ bảy: 9:00 - 11:00 (Luyện tập)\nGiáo viên: cô Lan\nPhòng: 204\nHọc phí: 1.200.000đ một tháng.",
    translation:
      "VIETNAMESE CLASS A1\nMonday: 18:00 - 19:30 (Listening and speaking)\nWednesday: 18:00 - 19:30 (Reading and writing)\nSaturday: 9:00 - 11:00 (Practice)\nTeacher: Ms Lan\nRoom: 204\nTuition: 1,200,000 VND per month.",
    glossary: [
      { word: "thời khoá biểu", en: "timetable" },
      { word: "nghe nói", en: "listening and speaking" },
      { word: "giáo viên", en: "teacher" },
      { word: "học phí", en: "tuition fee" },
    ],
    questions: [
      { q: "Which day has the longest class?", options: ["Monday", "Wednesday", "Saturday"], answer: 2 },
      { q: "Who is the teacher?", options: ["Ms Lan", "Mr Nam", "Ms Hoa"], answer: 0 },
      { q: "Monthly tuition?", options: ["1,200,000 VND", "2,100,000 VND", "120,000 VND"], answer: 0 },
    ],
  },
  {
    id: "r-a1-12",
    level: "A1",
    title: "Danh sách đi chợ",
    titleEn: "Shopping list",
    wordCount: 38,
    passage:
      "ĐI CHỢ SÁNG NAY\n1 kg gạo\n2 kg rau cải\nnửa kg thịt lợn\n10 quả trứng\n1 chai nước mắm\nTổng: khoảng 250.000đ.\nChợ mở từ 5 giờ sáng đến 11 giờ trưa.",
    translation:
      "MARKET THIS MORNING\n1 kg rice\n2 kg greens\nhalf a kg of pork\n10 eggs\n1 bottle of fish sauce\nTotal: about 250,000 VND.\nThe market opens from 5 am to 11 am.",
    glossary: [
      { word: "gạo", en: "uncooked rice" },
      { word: "rau cải", en: "leafy greens" },
      { word: "nửa kg", en: "half a kilo" },
      { word: "nước mắm", en: "fish sauce" },
    ],
    questions: [
      { q: "How many eggs?", options: ["2", "10", "12"], answer: 1 },
      { q: "Market closes at?", options: ["11 am", "1 pm", "5 pm"], answer: 0 },
      { q: "Total cost?", options: ["about 250,000 VND", "about 25,000 VND", "about 2,500,000 VND"], answer: 0 },
    ],
  },
  {
    id: "r-a1-13",
    level: "A1",
    title: "Bảng chỉ dẫn toà nhà",
    titleEn: "Building directory",
    wordCount: 40,
    passage:
      "TOÀ NHÀ SEN VÀNG\nTầng 1: Lễ tân, nhà thuốc\nTầng 2: Quán cà phê\nTầng 3: Phòng tập gym\nTầng 4: Văn phòng cho thuê\nThang máy bên phải.\nKhông hút thuốc trong toà nhà.",
    translation:
      "SEN VANG BUILDING\nFloor 1: Reception, pharmacy\nFloor 2: Cafe\nFloor 3: Gym\nFloor 4: Offices for rent\nThe lift is on the right.\nNo smoking inside the building.",
    glossary: [
      { word: "lễ tân", en: "reception" },
      { word: "nhà thuốc", en: "pharmacy" },
      { word: "thang máy", en: "lift, elevator" },
      { word: "hút thuốc", en: "to smoke" },
    ],
    questions: [
      { q: "Where is the gym?", options: ["Floor 2", "Floor 3", "Floor 4"], answer: 1 },
      { q: "What is forbidden?", options: ["Smoking", "Photos", "Pets"], answer: 0 },
      { q: "Pharmacy is on?", options: ["Floor 1", "Floor 2", "Floor 4"], answer: 0 },
    ],
  },
  {
    id: "r-a1-14",
    level: "A1",
    title: "Tin nhắn hẹn gặp",
    titleEn: "A message to meet up",
    wordCount: 45,
    passage:
      "Chào Anna!\nChiều mai mình đi ăn bánh xèo nhé. Quán ở đường Lê Lợi, gần bưu điện. Mình gặp nhau lúc 6 giờ chiều. Bạn đi xe buýt số 8 là tới. Nếu mưa thì mình hẹn hôm khác.\nMinh",
    translation:
      "Hi Anna!\nTomorrow afternoon let's go eat banh xeo. The place is on Le Loi street, near the post office. Let's meet at 6 pm. You can take bus number 8 to get there. If it rains we will meet another day.\nMinh",
    glossary: [
      { word: "bánh xèo", en: "Vietnamese sizzling pancake" },
      { word: "bưu điện", en: "post office" },
      { word: "xe buýt", en: "bus" },
      { word: "hẹn hôm khác", en: "meet another day" },
    ],
    questions: [
      { q: "Meeting time?", options: ["6 am", "6 pm", "8 pm"], answer: 1 },
      { q: "Which bus?", options: ["Number 6", "Number 8", "Number 18"], answer: 1 },
      { q: "What cancels the plan?", options: ["Rain", "Work", "Traffic"], answer: 0 },
    ],
  },
  {
    id: "r-a1-15",
    level: "A1",
    title: "Nội quy phòng trọ",
    titleEn: "Rental house rules",
    wordCount: 44,
    passage:
      "NỘI QUY\n1. Giữ yên lặng sau 22 giờ.\n2. Đổ rác đúng giờ: 18:00 - 19:00.\n3. Tiền điện 3.500đ một số.\n4. Khoá cửa khi ra ngoài.\n5. Không nuôi chó mèo.\nCảm ơn bạn!",
    translation:
      "HOUSE RULES\n1. Keep quiet after 10 pm.\n2. Take out rubbish on time: 18:00 - 19:00.\n3. Electricity costs 3,500 VND per unit.\n4. Lock the door when going out.\n5. No dogs or cats.\nThank you!",
    glossary: [
      { word: "nội quy", en: "rules" },
      { word: "giữ yên lặng", en: "keep quiet" },
      { word: "đổ rác", en: "take out the rubbish" },
      { word: "tiền điện", en: "electricity bill" },
    ],
    questions: [
      { q: "Quiet hours start at?", options: ["9 pm", "10 pm", "11 pm"], answer: 1 },
      { q: "Electricity price per unit?", options: ["350 VND", "3,500 VND", "35,000 VND"], answer: 1 },
      { q: "Are pets allowed?", options: ["Yes", "No", "Only cats"], answer: 1 },
    ],
  },
  {
    id: "r-a2-11",
    level: "A2",
    title: "Thư mời sinh nhật",
    titleEn: "Birthday invitation",
    wordCount: 78,
    passage:
      "Gửi các bạn,\nThứ bảy tuần này mình tổ chức sinh nhật ở nhà mình, số 25 ngõ 12 phố Hàng Bông. Tiệc bắt đầu lúc 7 giờ tối, có lẩu và hát karaoke. Các bạn không cần mang quà, chỉ cần mang theo tâm trạng vui vẻ. Nhà mình khó tìm nên khi tới gần thì gọi mình nhé. Ai không uống rượu thì mình có trà và nước trái cây.\nHẹn gặp lại!\nHương",
    translation:
      "Dear friends,\nThis Saturday I am having a birthday party at my home, number 25, lane 12, Hang Bong street. The party starts at 7 pm with hotpot and karaoke. You do not need to bring gifts, just bring a cheerful mood. My house is hard to find so call me when you are close. For those who do not drink alcohol I have tea and fruit juice.\nSee you!\nHuong",
    glossary: [
      { word: "tổ chức", en: "to organise, to hold" },
      { word: "ngõ", en: "lane, alley" },
      { word: "lẩu", en: "hotpot" },
      { word: "tâm trạng", en: "mood" },
      { word: "nước trái cây", en: "fruit juice" },
    ],
    questions: [
      { q: "When does the party start?", options: ["5 pm", "7 pm", "9 pm"], answer: 1 },
      { q: "What should guests bring?", options: ["Gifts", "Food", "A cheerful mood"], answer: 2 },
      { q: "Why should guests call Huong?", options: ["The house is hard to find", "To order food", "To book karaoke"], answer: 0 },
    ],
  },
  {
    id: "r-a2-12",
    level: "A2",
    title: "Hướng dẫn mở tài khoản ngân hàng",
    titleEn: "How to open a bank account",
    wordCount: 82,
    passage:
      "Để mở tài khoản tại ngân hàng Việt Nam, người nước ngoài cần hộ chiếu còn hiệu lực và thị thực hoặc thẻ tạm trú. Bạn lấy số thứ tự ở quầy lễ tân, điền mẫu đơn và ký tên. Nhân viên sẽ chụp ảnh hộ chiếu và hỏi địa chỉ ở Việt Nam. Sau khoảng hai mươi phút bạn nhận được số tài khoản; thẻ ATM được gửi về nhà sau ba đến năm ngày làm việc.",
    translation:
      "To open an account at a Vietnamese bank, foreigners need a valid passport and a visa or temporary residence card. You take a queue number at the reception desk, fill in the form and sign it. Staff will photograph your passport and ask for your address in Vietnam. After about twenty minutes you receive an account number; the ATM card is sent to your home after three to five working days.",
    glossary: [
      { word: "hộ chiếu", en: "passport" },
      { word: "còn hiệu lực", en: "still valid" },
      { word: "thẻ tạm trú", en: "temporary residence card" },
      { word: "số thứ tự", en: "queue number" },
      { word: "ngày làm việc", en: "working day" },
    ],
    questions: [
      { q: "Which document is required?", options: ["A valid passport", "A driving licence", "A student card"], answer: 0 },
      { q: "How long to get the account number?", options: ["About 20 minutes", "One day", "Three days"], answer: 0 },
      { q: "How does the ATM card arrive?", options: ["Sent to your home", "Picked up at the bank", "By email"], answer: 0 },
    ],
  },
  {
    id: "r-a2-13",
    level: "A2",
    title: "Đi khám ở bệnh viện",
    titleEn: "Going to the hospital",
    wordCount: 80,
    passage:
      "Sáng nay tôi bị đau bụng nên đến bệnh viện quận. Tôi đăng ký khám ở tầng một và trả phí khám là 150.000 đồng. Bác sĩ hỏi tôi ăn gì tối qua và ấn vào bụng để kiểm tra. Bác sĩ nói tôi bị ngộ độc thực phẩm nhẹ, cần uống nhiều nước và ăn cháo trong hai ngày. Tôi lấy thuốc ở nhà thuốc bệnh viện và hẹn tái khám nếu không đỡ.",
    translation:
      "This morning I had a stomach ache so I went to the district hospital. I registered on the first floor and paid a 150,000 VND consultation fee. The doctor asked what I ate last night and pressed on my stomach to check. The doctor said I had mild food poisoning, needed to drink a lot of water and eat rice porridge for two days. I got medicine at the hospital pharmacy and agreed to return if I did not get better.",
    glossary: [
      { word: "đau bụng", en: "stomach ache" },
      { word: "đăng ký khám", en: "register for a consultation" },
      { word: "ngộ độc thực phẩm", en: "food poisoning" },
      { word: "cháo", en: "rice porridge" },
      { word: "tái khám", en: "follow-up visit" },
    ],
    questions: [
      { q: "The consultation fee was?", options: ["15,000 VND", "150,000 VND", "500,000 VND"], answer: 1 },
      { q: "The diagnosis was?", options: ["Mild food poisoning", "Flu", "A broken bone"], answer: 0 },
      { q: "What should the patient eat?", options: ["Rice porridge", "Grilled meat", "Ice cream"], answer: 0 },
    ],
  },
  {
    id: "r-a2-14",
    level: "A2",
    title: "Tin tức: xe buýt điện ở Hà Nội",
    titleEn: "News: electric buses in Hanoi",
    wordCount: 85,
    passage:
      "Từ tháng này, Hà Nội mở thêm ba tuyến xe buýt điện chạy qua khu vực trung tâm. Xe không có khói, chạy êm và có wifi miễn phí. Giá vé vẫn là 7.000 đồng một lượt, học sinh và sinh viên được giảm một nửa. Thành phố hy vọng người dân sẽ bớt đi xe máy để giảm ô nhiễm không khí. Nhiều hành khách nói xe mới sạch hơn, nhưng vào giờ cao điểm vẫn rất đông.",
    translation:
      "From this month, Hanoi is opening three more electric bus routes through the central area. The buses have no smoke, run quietly and offer free wifi. The ticket price is still 7,000 VND per trip, and pupils and students get half off. The city hopes residents will ride motorbikes less in order to reduce air pollution. Many passengers say the new buses are cleaner, but at rush hour they are still very crowded.",
    glossary: [
      { word: "tuyến xe buýt", en: "bus route" },
      { word: "giá vé", en: "ticket price" },
      { word: "ô nhiễm không khí", en: "air pollution" },
      { word: "giờ cao điểm", en: "rush hour" },
      { word: "hành khách", en: "passenger" },
    ],
    questions: [
      { q: "How many new routes?", options: ["Two", "Three", "Seven"], answer: 1 },
      { q: "Students pay?", options: ["Full price", "Half price", "Nothing"], answer: 1 },
      { q: "What is the city's goal?", options: ["Reduce air pollution", "Raise ticket prices", "Close old routes"], answer: 0 },
    ],
  },
  {
    id: "r-a2-15",
    level: "A2",
    title: "Nhật ký học tiếng Việt",
    titleEn: "A Vietnamese learning diary",
    wordCount: 79,
    passage:
      "Tuần này tôi học được ba mươi từ mới và tập nói với bác bán cà phê gần nhà. Bác nói chậm lại để tôi hiểu, rồi sửa dấu giúp tôi. Khó nhất với tôi là dấu hỏi và dấu ngã, vì tiếng của tôi không có thanh điệu. Tôi ghi âm giọng mình mỗi tối rồi nghe lại. Sau một tháng, tôi đã gọi món và mặc cả ở chợ mà không cần dùng tiếng Anh.",
    translation:
      "This week I learned thirty new words and practised speaking with the coffee seller near my house. He spoke more slowly so I could understand, then corrected my tones for me. The hardest things for me are the hoi and nga tones, because my language has no tones. I record my voice every evening and listen back. After one month I could order food and bargain at the market without using English.",
    glossary: [
      { word: "từ mới", en: "new word" },
      { word: "nói chậm lại", en: "to speak more slowly" },
      { word: "thanh điệu", en: "tone" },
      { word: "ghi âm", en: "to record audio" },
      { word: "mặc cả", en: "to bargain" },
    ],
    questions: [
      { q: "How many new words this week?", options: ["Thirteen", "Thirty", "Three"], answer: 1 },
      { q: "Which tones are hardest?", options: ["Hoi and nga", "Sac and huyen", "Nang only"], answer: 0 },
      { q: "What does the writer do each evening?", options: ["Record their voice", "Write an essay", "Watch films"], answer: 0 },
    ],
  },
  {
    id: "r-b1-11",
    level: "B1",
    title: "Làm việc từ xa ở Việt Nam",
    titleEn: "Remote work in Vietnam",
    wordCount: 118,
    passage:
      "Vài năm gần đây, Việt Nam trở thành điểm đến quen thuộc của những người làm việc từ xa. Chi phí sinh hoạt hợp lý, internet nhanh và mạng lưới quán cà phê rộng khắp giúp họ dễ dàng duy trì công việc với khách hàng ở châu Âu hay Bắc Mỹ. Tuy nhiên, khác biệt múi giờ khiến nhiều người phải họp muộn, và thủ tục thị thực vẫn là trở ngại lớn nhất. Một số người chọn Đà Nẵng vì gần biển và ít tắc đường, trong khi những người cần gặp đối tác thường xuyên thì ở lại Thành phố Hồ Chí Minh. Điều họ đánh giá cao nhất không chỉ là giá cả, mà là sự thân thiện của người dân địa phương.",
    translation:
      "In recent years Vietnam has become a familiar destination for remote workers. Reasonable living costs, fast internet and a dense network of cafes make it easy for them to keep working with clients in Europe or North America. However, time-zone differences force many to take late meetings, and visa procedures remain the biggest obstacle. Some choose Da Nang because it is near the sea with less traffic, while those who need to meet partners often stay in Ho Chi Minh City. What they value most is not only the price but the friendliness of local people.",
    glossary: [
      { word: "làm việc từ xa", en: "remote work" },
      { word: "chi phí sinh hoạt", en: "cost of living" },
      { word: "múi giờ", en: "time zone" },
      { word: "thủ tục thị thực", en: "visa procedures" },
      { word: "trở ngại", en: "obstacle" },
    ],
    questions: [
      { q: "The biggest obstacle is?", options: ["Visa procedures", "Slow internet", "Expensive housing"], answer: 0 },
      { q: "Why do some choose Da Nang?", options: ["Near the sea, less traffic", "Cheaper visas", "More clients"], answer: 0 },
      { q: "What do remote workers value most?", options: ["Only low prices", "Local friendliness", "Air quality"], answer: 1 },
    ],
  },
  {
    id: "r-b1-12",
    level: "B1",
    title: "Chợ nổi và đời sống miền Tây",
    titleEn: "Floating markets and life in the Mekong Delta",
    wordCount: 120,
    passage:
      "Ở miền Tây Nam Bộ, sông ngòi không chỉ là đường đi mà còn là nơi mua bán. Từ bốn giờ sáng, hàng trăm chiếc thuyền chở dứa, xoài, khoai và bún đã tụ lại giữa dòng. Người bán treo hàng mẫu lên một cây tre cao để khách nhìn từ xa, thay cho biển hiệu. Ngày nay, khi đường bộ và siêu thị phát triển, nhiều chợ nổi thu hẹp lại và phần lớn khách là du khách. Một số gia đình vẫn giữ nghề vì đó là ký ức của cha mẹ họ, nhưng con cái họ thường lên thành phố làm việc. Câu hỏi đặt ra là làm sao giữ được nét văn hoá này mà không biến nó thành sân khấu cho khách du lịch.",
    translation:
      "In the Mekong Delta, rivers are not only roads but also marketplaces. From four in the morning, hundreds of boats carrying pineapples, mangoes, sweet potatoes and noodles gather in midstream. Sellers hang a sample of their goods on a tall bamboo pole so buyers can see from afar, instead of a signboard. Today, as roads and supermarkets develop, many floating markets are shrinking and most customers are tourists. Some families keep the trade because it is their parents' memory, but their children usually move to the city for work. The question is how to preserve this culture without turning it into a stage for tourists.",
    glossary: [
      { word: "sông ngòi", en: "rivers and canals" },
      { word: "hàng mẫu", en: "sample goods" },
      { word: "biển hiệu", en: "signboard" },
      { word: "thu hẹp", en: "to shrink" },
      { word: "ký ức", en: "memory" },
    ],
    questions: [
      { q: "How do sellers advertise?", options: ["Hanging samples on a bamboo pole", "Loudspeakers", "Printed signs"], answer: 0 },
      { q: "Why are markets shrinking?", options: ["Roads and supermarkets develop", "Rivers dried up", "Prices rose"], answer: 0 },
      { q: "The writer's concern is?", options: ["Preserving culture without staging it", "Raising ticket prices", "Building more boats"], answer: 0 },
    ],
  },
  {
    id: "r-b1-13",
    level: "B1",
    title: "Áp lực thi cử của học sinh Việt Nam",
    titleEn: "Exam pressure on Vietnamese students",
    wordCount: 116,
    passage:
      "Mỗi tháng sáu, hàng triệu học sinh lớp mười hai bước vào kỳ thi quyết định việc vào đại học. Nhiều em học thêm đến mười giờ đêm, cuối tuần cũng không nghỉ. Phụ huynh tin rằng một trường tốt sẽ mở ra công việc ổn định, nên sẵn sàng chi phần lớn thu nhập cho việc học của con. Các chuyên gia giáo dục cảnh báo rằng áp lực kéo dài dễ dẫn tới mất ngủ và lo âu. Gần đây, một số trường bắt đầu có phòng tư vấn tâm lý và dạy kỹ năng quản lý thời gian. Thay đổi diễn ra chậm, nhưng ít nhất câu chuyện sức khoẻ tinh thần đã được nói tới trong lớp học.",
    translation:
      "Every June, millions of twelfth-grade students enter the exam that decides university admission. Many study in extra classes until ten at night and do not rest at weekends either. Parents believe a good school will open the way to a stable job, so they are ready to spend most of their income on their child's education. Education experts warn that prolonged pressure easily leads to insomnia and anxiety. Recently some schools have begun to offer counselling rooms and to teach time-management skills. Change is slow, but at least mental health is now discussed in the classroom.",
    glossary: [
      { word: "kỳ thi", en: "examination" },
      { word: "học thêm", en: "extra tuition classes" },
      { word: "thu nhập", en: "income" },
      { word: "lo âu", en: "anxiety" },
      { word: "sức khoẻ tinh thần", en: "mental health" },
    ],
    questions: [
      { q: "The exam takes place in?", options: ["June", "September", "January"], answer: 0 },
      { q: "Experts warn about?", options: ["Insomnia and anxiety", "Rising tuition", "Teacher shortages"], answer: 0 },
      { q: "A recent change in some schools?", options: ["Counselling rooms", "Longer holidays", "Fewer subjects"], answer: 0 },
    ],
  },
  {
    id: "r-b1-14",
    level: "B1",
    title: "Cà phê Việt Nam ra thế giới",
    titleEn: "Vietnamese coffee goes global",
    wordCount: 117,
    passage:
      "Việt Nam là một trong những nước xuất khẩu cà phê lớn nhất thế giới, chủ yếu là giống robusta trồng ở Tây Nguyên. Trong nhiều năm, phần lớn hạt cà phê được bán thô với giá thấp, rồi rang và đóng gói ở nước ngoài. Gần đây, một số hợp tác xã đầu tư vào chế biến ướt, phơi nhà kính và kiểm soát chất lượng để bán cà phê đặc sản. Họ cũng học cách kể câu chuyện của người trồng, điều mà khách hàng châu Âu quan tâm. Giá bán cao hơn giúp nông dân có thêm thu nhập, nhưng cần vốn và kiến thức kỹ thuật, nên không phải hộ nào cũng làm được ngay.",
    translation:
      "Vietnam is one of the world's largest coffee exporters, mainly robusta grown in the Central Highlands. For many years most beans were sold raw at low prices, then roasted and packaged abroad. Recently some cooperatives have invested in wet processing, greenhouse drying and quality control in order to sell specialty coffee. They are also learning to tell the growers' story, something European customers care about. Higher prices give farmers extra income, but this requires capital and technical knowledge, so not every household can do it straight away.",
    glossary: [
      { word: "xuất khẩu", en: "to export" },
      { word: "bán thô", en: "to sell raw, unprocessed" },
      { word: "hợp tác xã", en: "cooperative" },
      { word: "chế biến", en: "processing" },
      { word: "vốn", en: "capital, funds" },
    ],
    questions: [
      { q: "Vietnam mainly grows?", options: ["Robusta", "Arabica only", "Liberica"], answer: 0 },
      { q: "What did cooperatives invest in?", options: ["Wet processing and quality control", "Advertising on TV", "New farmland"], answer: 0 },
      { q: "What limits the change?", options: ["Capital and technical knowledge", "Lack of land", "Weak demand"], answer: 0 },
    ],
  },
  {
    id: "r-b1-15",
    level: "B1",
    title: "Phỏng vấn: bạn trẻ chọn nghề",
    titleEn: "Interview: a young person chooses a career",
    wordCount: 119,
    passage:
      "Phóng viên: Vì sao bạn bỏ công việc ở ngân hàng để làm đầu bếp?\nThảo: Mình làm ngân hàng bốn năm, lương tốt nhưng mỗi sáng đều thấy nặng nề. Mình thích nấu ăn từ nhỏ, nên quyết định đi học nghề một năm.\nPhóng viên: Gia đình phản ứng thế nào?\nThảo: Ban đầu bố mẹ lo mình mất ổn định. Sau khi thấy mình mở quán nhỏ và có khách quen, bố mẹ dần ủng hộ.\nPhóng viên: Bạn khuyên gì các bạn đang do dự?\nThảo: Đừng nghỉ việc ngay. Hãy thử nghề mới vào buổi tối và cuối tuần trong sáu tháng, rồi hãy quyết định bằng con số, không chỉ bằng cảm xúc.",
    translation:
      "Reporter: Why did you leave your bank job to become a chef?\nThao: I worked in banking for four years, the salary was good but every morning felt heavy. I have loved cooking since childhood, so I decided to train for a year.\nReporter: How did your family react?\nThao: At first my parents worried I would lose stability. After seeing me open a small eatery with regular customers, they gradually supported me.\nReporter: What do you advise those who hesitate?\nThao: Do not quit immediately. Try the new job in the evenings and at weekends for six months, then decide with numbers, not only with feelings.",
    glossary: [
      { word: "đầu bếp", en: "chef" },
      { word: "nặng nề", en: "heavy, burdensome" },
      { word: "học nghề", en: "vocational training" },
      { word: "khách quen", en: "regular customer" },
      { word: "do dự", en: "to hesitate" },
    ],
    questions: [
      { q: "How long did Thao work in banking?", options: ["One year", "Four years", "Six years"], answer: 1 },
      { q: "What changed her parents' mind?", options: ["A small eatery with regulars", "A higher salary", "A TV show"], answer: 0 },
      { q: "Her advice is to?", options: ["Quit at once", "Test the new job for six months", "Ask parents to decide"], answer: 1 },
    ],
  },
];
