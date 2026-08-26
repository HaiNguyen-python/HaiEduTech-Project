/**
 * @file cambridgeExamsKet16to20.ts
 * @description Five Cambridge KET / A2 Key mock exams, tests 16 to 20.
 *              Themes: Part-time Jobs, Travel Plans, Online Shopping,
 *              Music & Concerts, Volunteering. 15 Reading & Writing questions
 *              and 10 Listening questions per paper.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { CambridgeMockExam, CambridgeMockQuestion } from "./cambridgeMockExamData";

type Tuple = [
  question: string,
  options: string[],
  correct: number,
  explanation: string,
  explanationVi: string,
  passage?: string
];

const build = (rw: Tuple[], listening: Tuple[]): CambridgeMockQuestion[] => [
  ...rw.map((t, i) => ({
    id: i + 1,
    section: "Reading & Writing" as const,
    question: t[0],
    options: t[1],
    correctAnswer: t[2],
    explanation: t[3],
    explanationVi: t[4],
    ...(t[5] ? { passage: t[5] } : {}),
  })),
  ...listening.map((t, i) => ({
    id: rw.length + i + 1,
    section: "Listening" as const,
    question: t[0],
    options: t[1],
    correctAnswer: t[2],
    explanation: t[3],
    explanationVi: t[4],
    ...(t[5] ? { passage: t[5] } : {}),
  })),
];

/* ================== KET 16 - Part-time Jobs ================== */
const k16pA =
  "Every Saturday morning I work in a bakery near my house. I start at seven, which sounds early, but the shop is warm and the smell of bread wakes me up better than any alarm clock. My main job is to serve customers and put fresh loaves on the shelves. The owner, Mrs Patel, pays me for five hours and always lets me take home whatever has not been sold. The hardest part is remembering the prices, because they change when a new season begins.";
const k16pB =
  "My brother has a different kind of job. He walks three dogs for a neighbour who works long hours in a hospital. He earns less than I do, but he says he does not mind because he would go to the park anyway. Last month one of the dogs escaped and ran towards the road. Since then he uses two leads at the same time and never looks at his phone while he is walking.";

const k16Rw: Tuple[] = [
  ["What time does the writer start work?", ["Six", "Seven", "Eight", "Nine"], 1, "The writer starts at seven.", "Người viết bắt đầu làm lúc bảy giờ.", k16pA],
  ["What wakes the writer up?", ["An alarm clock", "The smell of bread", "The customers", "The radio"], 1, "The smell of bread wakes the writer better than an alarm clock.", "Mùi bánh mì đánh thức người viết hơn cả đồng hồ báo thức.", k16pA],
  ["What is one of the writer's tasks?", ["Baking bread", "Cleaning the ovens", "Putting loaves on shelves", "Counting money at night"], 2, "The writer serves customers and puts fresh loaves on the shelves.", "Người viết phục vụ khách và xếp bánh mì lên kệ.", k16pA],
  ["What does Mrs Patel let the writer take home?", ["Money in advance", "Unsold bread", "Free coffee", "New recipes"], 1, "She lets the writer take home whatever has not been sold.", "Bà cho người viết mang về những gì chưa bán hết.", k16pA],
  ["Why is remembering prices difficult?", ["There are too many staff", "Prices change each season", "The labels are missing", "Customers argue"], 1, "The prices change when a new season begins.", "Giá thay đổi khi bước sang mùa mới.", k16pA],
  ["What is the brother's job?", ["Delivering papers", "Walking dogs", "Washing cars", "Helping in a shop"], 1, "He walks three dogs for a neighbour.", "Cậu ấy dắt ba con chó đi dạo cho hàng xóm.", k16pB],
  ["Why does the brother not mind the low pay?", ["He gets free food", "He would go to the park anyway", "He works few hours", "He likes the neighbour"], 1, "He says he would go to the park anyway.", "Cậu nói dù sao cậu cũng ra công viên.", k16pB],
  ["What happened last month?", ["A dog escaped", "He lost a lead", "He was late", "He hurt his leg"], 0, "One of the dogs escaped and ran towards the road.", "Một con chó sổng ra và chạy về phía đường.", k16pB],
  ["What does he now avoid doing?", ["Walking fast", "Using two leads", "Looking at his phone", "Going to the park"], 2, "He never looks at his phone while walking now.", "Giờ cậu không nhìn điện thoại khi dắt chó.", k16pB],
  ["Money you receive for work is your ___.", ["fare", "fee", "wages", "bill"], 2, "Money paid for work is wages.", "Tiền nhận được từ công việc gọi là lương.", undefined],
  ["I have worked here ___ March.", ["for", "since", "during", "from"], 1, "'Since' is used with a point in time such as March.", "'Since' dùng với mốc thời gian như March.", undefined],
  ["A person who buys things in a shop is a ___.", ["client", "customer", "colleague", "manager"], 1, "In a shop the buyer is a customer.", "Người mua trong cửa hàng là khách hàng.", undefined],
  ["She ___ work early yesterday because she felt ill.", ["leave", "left", "leaves", "leaving"], 1, "'Yesterday' needs the past simple 'left'.", "Có 'yesterday' nên dùng quá khứ đơn 'left'.", undefined],
  ["If you apply for a job, you usually send a ___.", ["ticket", "receipt", "CV", "menu"], 2, "You send a CV when you apply for a job.", "Khi xin việc bạn gửi CV.", undefined],
  ["The shop is looking ___ a weekend assistant.", ["for", "at", "after", "into"], 0, "'Look for' means to search for someone.", "'Look for' nghĩa là tìm kiếm ai đó.", undefined],
];

const k16Ls: Tuple[] = [
  ["How many hours will the girl work?", ["Three", "Four", "Five", "Six"], 1, "She will work four hours.", "Bạn ấy sẽ làm bốn tiếng.", "Listen: 'The shift is four hours, from ten until two.'"],
  ["What does the job involve?", ["Cooking", "Serving tables", "Cleaning windows", "Answering calls"], 1, "The job involves serving tables.", "Công việc là phục vụ bàn.", "Listen: 'You would be serving tables and clearing them afterwards.'"],
  ["When is the interview?", ["Monday", "Wednesday", "Thursday", "Saturday"], 2, "The interview is on Thursday.", "Buổi phỏng vấn vào thứ Năm.", "Listen: 'Can you come for an interview on Thursday at four?'"],
  ["What must the applicant bring?", ["A photo", "Two references", "A uniform", "A passport"], 1, "The applicant must bring two references.", "Ứng viên phải mang hai thư giới thiệu.", "Listen: 'Please bring two references from previous employers.'"],
  ["How much does the job pay per hour?", ["Eight pounds", "Nine pounds", "Ten pounds", "Twelve pounds"], 2, "The job pays ten pounds an hour.", "Công việc trả mười bảng mỗi giờ.", "Listen: 'We pay ten pounds an hour, plus a meal on long shifts.'"],
  ["Why did the boy leave his last job?", ["Bad pay", "Too far away", "Exams", "He disliked it"], 2, "He left because of exams.", "Cậu ấy nghỉ vì kỳ thi.", "Listen: 'I left in June because I had to study for my exams.'"],
  ["What is the manager's name?", ["Mr Dean", "Mrs Doyle", "Miss Drew", "Mr Doran"], 1, "The manager is Mrs Doyle.", "Quản lý là bà Doyle.", "Listen: 'Ask for Mrs Doyle when you arrive at reception.'"],
  ["Which day is the busiest?", ["Friday", "Saturday", "Sunday", "Monday"], 1, "Saturday is the busiest day.", "Thứ Bảy là ngày đông nhất.", "Listen: 'Saturday is by far our busiest day of the week.'"],
  ["What will the girl get after three months?", ["A pay rise", "More hours", "A day off", "A bonus"], 0, "She will get a pay rise after three months.", "Sau ba tháng bạn ấy được tăng lương.", "Listen: 'After three months everyone gets a small pay rise.'"],
  ["Where should he send the form?", ["By post", "By email", "In person", "By phone"], 1, "He should send the form by email.", "Cậu ấy nên gửi đơn qua email.", "Listen: 'Just email the form back to us before Friday.'"],
];

const ket16: CambridgeMockExam = {
  id: "cambridge-ket-16",
  title: "KET Mock Test 16 - Part-time Jobs",
  titleVi: "Đề thi thử KET 16 - Việc làm bán thời gian",
  level: "ket",
  duration: 60,
  totalQuestions: 25,
  questions: build(k16Rw, k16Ls),
};

/* ================== KET 17 - Travel Plans ================== */
const k17pA =
  "We booked our holiday in January, six months before we travelled, because tickets are far cheaper then. Our plan was simple: three nights in the mountains and four by the lake. My father insisted on taking the train instead of flying, and although the journey lasted eleven hours, we saw villages and forests that we would have missed from a plane. My sister slept most of the way and complained that she had seen nothing at all.";
const k17pB =
  "The hotel by the lake was not luxurious, but it had everything we needed. Breakfast finished at nine, which was too early for my sister, so she often ate bread and fruit in the room. Bicycles were free for guests, and we cycled around the whole lake in a single afternoon. On the last evening the owner cooked fish that he had caught that morning, and even my sister admitted that the trip had been worth it.";

const k17Rw: Tuple[] = [
  ["Why did the family book in January?", ["The weather is better", "Tickets are cheaper", "The hotel was new", "School was closed"], 1, "They booked early because tickets are far cheaper then.", "Họ đặt sớm vì lúc đó vé rẻ hơn nhiều.", k17pA],
  ["How long did they stay by the lake?", ["Two nights", "Three nights", "Four nights", "Seven nights"], 2, "They spent four nights by the lake.", "Họ ở bên hồ bốn đêm.", k17pA],
  ["Who wanted to travel by train?", ["The writer", "The father", "The sister", "The mother"], 1, "The father insisted on taking the train.", "Người bố nhất định đi tàu.", k17pA],
  ["How long was the train journey?", ["Six hours", "Nine hours", "Eleven hours", "Thirteen hours"], 2, "The journey lasted eleven hours.", "Chuyến đi kéo dài mười một tiếng.", k17pA],
  ["Why did the sister complain?", ["The seats were hard", "She slept and saw nothing", "The train was late", "She felt sick"], 1, "She slept most of the way and saw nothing.", "Bạn ấy ngủ gần hết đường nên chẳng thấy gì.", k17pA],
  ["What was the hotel like?", ["Luxurious", "Simple but adequate", "Very noisy", "Too expensive"], 1, "It was not luxurious but had everything they needed.", "Khách sạn không sang trọng nhưng có đủ thứ cần thiết.", k17pB],
  ["Why did the sister eat in her room?", ["She was ill", "Breakfast ended too early", "She disliked the food", "The room was nicer"], 1, "Breakfast finished at nine, too early for her.", "Bữa sáng kết thúc lúc chín giờ, quá sớm với bạn ấy.", k17pB],
  ["What was free for guests?", ["Boat trips", "Bicycles", "Dinner", "Fishing rods"], 1, "Bicycles were free for guests.", "Xe đạp miễn phí cho khách.", k17pB],
  ["What did the owner cook on the last evening?", ["Chicken", "Fish", "Pasta", "Soup"], 1, "He cooked fish he had caught that morning.", "Ông nấu cá mà ông bắt được sáng đó.", k17pB],
  ["A place where you sleep on holiday is ___.", ["accommodation", "arrangement", "attraction", "adventure"], 0, "Accommodation is where you stay.", "Accommodation là nơi lưu trú.", undefined],
  ["We ___ our tickets last week.", ["book", "booked", "booking", "will book"], 1, "'Last week' needs the past simple 'booked'.", "Có 'last week' nên dùng 'booked'.", undefined],
  ["The plane ___ at half past six tomorrow.", ["leaves", "left", "leaving", "has left"], 0, "Timetables use the present simple 'leaves'.", "Lịch trình dùng thì hiện tại đơn 'leaves'.", undefined],
  ["You show your ___ at the airport.", ["receipt", "passport", "postcard", "poster"], 1, "You show your passport at the airport.", "Ở sân bay bạn xuất trình hộ chiếu.", undefined],
  ["The bags you take on holiday are your ___.", ["luggage", "furniture", "equipment", "package"], 0, "Luggage means your travel bags.", "Luggage là hành lý.", undefined],
  ["If a hotel is fully ___, there are no free rooms.", ["booked", "closed", "opened", "paid"], 0, "'Fully booked' means no rooms are available.", "'Fully booked' nghĩa là hết phòng.", undefined],
];

const k17Ls: Tuple[] = [
  ["Where are they going this summer?", ["Spain", "Italy", "Greece", "Portugal"], 2, "They are going to Greece.", "Họ sẽ đi Hy Lạp.", "Listen: 'This summer we have decided on Greece instead of Italy.'"],
  ["How will they travel?", ["By plane", "By train", "By coach", "By car"], 3, "They will travel by car.", "Họ sẽ đi bằng ô tô.", "Listen: 'We are driving there, so we can stop wherever we want.'"],
  ["How long is the holiday?", ["Five days", "One week", "Ten days", "Two weeks"], 2, "The holiday lasts ten days.", "Kỳ nghỉ kéo dài mười ngày.", "Listen: 'We will be away for ten days in total.'"],
  ["What has the girl forgotten?", ["Her camera", "Her charger", "Her map", "Her hat"], 1, "She has forgotten her charger.", "Bạn ấy quên bộ sạc.", "Listen: 'I packed everything except my charger, of course.'"],
  ["What time does the ferry leave?", ["Seven", "Half past seven", "Eight", "Half past eight"], 3, "The ferry leaves at half past eight.", "Phà rời bến lúc tám giờ rưỡi.", "Listen: 'The ferry leaves at eight thirty, so we must be early.'"],
  ["Where will they stay first?", ["A hotel", "A campsite", "An apartment", "With family"], 2, "They will stay in an apartment first.", "Đầu tiên họ ở căn hộ.", "Listen: 'For the first four nights we have an apartment near the beach.'"],
  ["What is the weather expected to be?", ["Rainy", "Very hot", "Cool", "Windy"], 1, "It is expected to be very hot.", "Dự báo trời sẽ rất nóng.", "Listen: 'Apparently it will be very hot, over thirty degrees.'"],
  ["What does the boy want to do there?", ["Diving", "Sailing", "Climbing", "Cycling"], 0, "He wants to go diving.", "Cậu ấy muốn đi lặn.", "Listen: 'What I really want to try is diving.'"],
  ["How much did the flights cost?", ["Ninety euros", "A hundred and ten", "A hundred and forty", "Two hundred"], 1, "The flights cost a hundred and ten euros.", "Vé máy bay giá một trăm mười euro.", "Listen: 'In the end the flights were a hundred and ten euros each.'"],
  ["What must they do before leaving?", ["Print tickets", "Buy insurance", "Order money", "Book a taxi"], 3, "They must book a taxi.", "Họ phải đặt taxi.", "Listen: 'Don't forget to book a taxi for the morning.'"],
];

const ket17: CambridgeMockExam = {
  id: "cambridge-ket-17",
  title: "KET Mock Test 17 - Travel Plans",
  titleVi: "Đề thi thử KET 17 - Kế hoạch du lịch",
  level: "ket",
  duration: 60,
  totalQuestions: 25,
  questions: build(k17Rw, k17Ls),
};

/* ================== KET 18 - Online Shopping ================== */
const k18pA =
  "I bought my first pair of running shoes online last spring. The website showed clear photographs and promised delivery within two days, so I ordered a size larger than usual because reviews warned that the brand was small. The parcel arrived on time, but the shoes were still tight. Returning them was easier than I expected: I printed a label, left the box at a local shop and the money appeared in my account a week later.";
const k18pB =
  "My mother refuses to shop online for food. She says she wants to choose her own vegetables and that photographs never show whether fruit is fresh. She does, however, order books, because a bookshop cannot keep every title she wants. Last month she waited eleven days for a book about gardening, and by the time it arrived she had already borrowed the same title from the library.";

const k18Rw: Tuple[] = [
  ["Why did the writer order a larger size?", ["The shop had no small sizes", "Reviews warned the brand was small", "The photos looked big", "A friend advised it"], 1, "Reviews warned that the brand was small.", "Các đánh giá cảnh báo hãng này chạy nhỏ size.", k18pA],
  ["When did the parcel arrive?", ["Late", "On time", "After a week", "The same day"], 1, "The parcel arrived on time.", "Gói hàng đến đúng hẹn.", k18pA],
  ["What was the problem with the shoes?", ["Wrong colour", "Still tight", "Damaged", "Too heavy"], 1, "The shoes were still tight.", "Đôi giày vẫn chật.", k18pA],
  ["How did the writer return them?", ["Posted them abroad", "Left the box at a local shop", "Took them to the factory", "Gave them away"], 1, "The writer left the box at a local shop.", "Người viết để hộp giày ở một cửa hàng gần nhà.", k18pA],
  ["When did the money come back?", ["Two days later", "Four days later", "A week later", "A month later"], 2, "The money appeared a week later.", "Tiền được hoàn lại sau một tuần.", k18pA],
  ["Why will the mother not buy food online?", ["It is expensive", "She wants to choose it herself", "Delivery is slow", "The website is hard"], 1, "She wants to choose her own vegetables.", "Bà muốn tự chọn rau.", k18pB],
  ["What does she order online?", ["Clothes", "Books", "Furniture", "Medicine"], 1, "She orders books online.", "Bà đặt sách trên mạng.", k18pB],
  ["Why does she buy books online?", ["They are cheaper", "Shops lack every title", "Delivery is fast", "She dislikes shops"], 1, "A bookshop cannot keep every title she wants.", "Hiệu sách không có đủ mọi đầu sách bà cần.", k18pB],
  ["What happened with the gardening book?", ["It never arrived", "It was the wrong book", "She had already borrowed it", "It was damaged"], 2, "She had already borrowed the same title from the library.", "Bà đã mượn đúng cuốn đó ở thư viện rồi.", k18pB],
  ["The paper that proves you paid is a ___.", ["receipt", "recipe", "reception", "record"], 0, "A receipt proves payment.", "Hóa đơn chứng minh bạn đã trả tiền.", undefined],
  ["I ___ the parcel yesterday morning.", ["receive", "received", "receiving", "will receive"], 1, "'Yesterday' needs the past simple 'received'.", "Có 'yesterday' nên dùng 'received'.", undefined],
  ["If clothes do not fit, you can ___ them.", ["return", "refuse", "remove", "repeat"], 0, "You return items that do not fit.", "Bạn trả lại món đồ không vừa.", undefined],
  ["This shirt is ___ than the one online.", ["cheap", "cheaper", "cheapest", "more cheap"], 1, "With 'than' we use the comparative 'cheaper'.", "Có 'than' thì dùng so sánh hơn 'cheaper'.", undefined],
  ["Extra money charged for sending goods is the ___ cost.", ["delivery", "discount", "deposit", "design"], 0, "Delivery cost is charged for sending goods.", "Phí giao hàng được tính khi gửi hàng.", undefined],
  ["Customers write ___ to say what they think of a product.", ["reviews", "rules", "receipts", "reminders"], 0, "Reviews give customers' opinions.", "Đánh giá thể hiện ý kiến của khách hàng.", undefined],
];

const k18Ls: Tuple[] = [
  ["What did the woman order?", ["A lamp", "A jacket", "A phone case", "A chair"], 1, "She ordered a jacket.", "Cô ấy đặt một chiếc áo khoác.", "Listen: 'I ordered a jacket but they sent the wrong size.'"],
  ["What is wrong with the item?", ["Wrong colour", "Wrong size", "It is broken", "It is missing"], 1, "The size is wrong.", "Sai kích cỡ.", "Listen: 'I asked for medium and they sent extra large.'"],
  ["How long does the refund take?", ["Three days", "Five days", "Seven days", "Ten days"], 2, "The refund takes seven days.", "Việc hoàn tiền mất bảy ngày.", "Listen: 'Refunds normally reach your account within seven days.'"],
  ["What is the order number?", ["4412", "4421", "4142", "4124"], 0, "The order number is 4412.", "Mã đơn hàng là 4412.", "Listen: 'My order number is four four one two.'"],
  ["What will the company send?", ["A voucher", "A new item", "A free gift", "A letter"], 1, "The company will send a new item.", "Công ty sẽ gửi món hàng mới.", "Listen: 'We will post the correct size to you today.'"],
  ["When will it arrive?", ["Tomorrow", "Wednesday", "Friday", "Next week"], 2, "It will arrive on Friday.", "Hàng sẽ đến vào thứ Sáu.", "Listen: 'It should reach you by Friday at the latest.'"],
  ["What must she keep?", ["The packaging", "The receipt", "The label", "The email"], 0, "She must keep the packaging.", "Cô ấy phải giữ lại bao bì.", "Listen: 'Please keep the original packaging for the return.'"],
  ["How much was the jacket?", ["Thirty pounds", "Forty pounds", "Forty-five", "Fifty"], 2, "The jacket cost forty-five pounds.", "Áo khoác giá bốn mươi lăm bảng.", "Listen: 'The jacket was forty-five pounds including delivery.'"],
  ["Why does the man prefer shops?", ["Cheaper", "He can try things on", "Faster", "Friendlier staff"], 1, "He prefers shops because he can try things on.", "Anh ấy thích cửa hàng vì có thể thử đồ.", "Listen: 'I still prefer shops because I can try things on.'"],
  ["What does the woman promise to do?", ["Call again", "Write a review", "Visit the shop", "Cancel the order"], 1, "She promises to write a review.", "Cô ấy hứa sẽ viết đánh giá.", "Listen: 'You have been helpful, so I will write a good review.'"],
];

const ket18: CambridgeMockExam = {
  id: "cambridge-ket-18",
  title: "KET Mock Test 18 - Online Shopping",
  titleVi: "Đề thi thử KET 18 - Mua sắm trực tuyến",
  level: "ket",
  duration: 60,
  totalQuestions: 25,
  questions: build(k18Rw, k18Ls),
};

/* ================== KET 19 - Music & Concerts ================== */
const k19pA =
  "I started learning the guitar at eleven, mainly because my best friend had one and I did not want to be left out. For two years I practised badly and made little progress. Everything changed when a new teacher told me to play slowly and to listen instead of hurrying. Within six months I could play pieces that had seemed impossible, and I finally understood that speed comes last, not first.";
const k19pB =
  "Our town holds a free music festival every July in the park. Local bands play on a small stage from midday until dark, and anyone can bring a blanket and sit on the grass. Last year it rained heavily and organisers moved the concerts into the sports hall, which was crowded but surprisingly good, because the sound was much clearer indoors than outside.";

const k19Rw: Tuple[] = [
  ["Why did the writer start the guitar?", ["A teacher suggested it", "A friend had one", "It was cheap", "For school"], 1, "The writer started because a best friend had one.", "Người viết bắt đầu vì bạn thân có đàn.", k19pA],
  ["How did the first two years go?", ["Very well", "Slowly, with little progress", "He gave up", "He won a prize"], 1, "He practised badly and made little progress.", "Cậu tập không tốt và tiến bộ rất ít.", k19pA],
  ["What advice did the new teacher give?", ["Practise longer", "Play slowly and listen", "Change instrument", "Join a band"], 1, "The teacher said to play slowly and listen.", "Thầy bảo hãy chơi chậm và lắng nghe.", k19pA],
  ["How long before he improved?", ["Two months", "Four months", "Six months", "A year"], 2, "Within six months he could play difficult pieces.", "Trong sáu tháng cậu chơi được những bản khó.", k19pA],
  ["What did he learn about speed?", ["It comes last", "It comes first", "It is unimportant", "It cannot improve"], 0, "He understood that speed comes last, not first.", "Cậu hiểu rằng tốc độ đến sau cùng, không phải đầu tiên.", k19pA],
  ["When is the festival held?", ["June", "July", "August", "September"], 1, "It is held every July.", "Lễ hội diễn ra vào tháng Bảy.", k19pB],
  ["How much does it cost?", ["Nothing", "Five pounds", "Ten pounds", "It depends"], 0, "It is a free music festival.", "Đây là lễ hội âm nhạc miễn phí.", k19pB],
  ["Why was the concert moved last year?", ["Too many people", "Heavy rain", "A broken stage", "Noise complaints"], 1, "It rained heavily so they moved indoors.", "Trời mưa to nên họ chuyển vào trong nhà.", k19pB],
  ["Why was the indoor concert good?", ["More space", "Clearer sound", "Cheaper tickets", "Better bands"], 1, "The sound was much clearer indoors.", "Âm thanh trong nhà rõ hơn nhiều.", k19pB],
  ["A group of musicians is a ___.", ["band", "team", "crew", "class"], 0, "Musicians who play together form a band.", "Nhóm nhạc công chơi cùng nhau gọi là ban nhạc.", undefined],
  ["She has played the piano ___ she was six.", ["for", "since", "during", "until"], 1, "'Since' is used with a starting point.", "'Since' dùng với mốc bắt đầu.", undefined],
  ["The people who watch a concert are the ___.", ["audience", "actors", "authors", "assistants"], 0, "The audience watches a performance.", "Khán giả là người xem buổi biểu diễn.", undefined],
  ["We must buy tickets ___ the concert sells out.", ["so", "before", "although", "unless"], 1, "'Before' shows the action must happen first.", "'Before' cho thấy việc phải làm trước.", undefined],
  ["A person who writes songs is a ___.", ["composer", "conductor", "customer", "collector"], 0, "A composer writes music.", "Nhà soạn nhạc là người viết nhạc.", undefined],
  ["If a concert is 'sold out', there are ___ tickets left.", ["many", "some", "no", "cheap"], 2, "'Sold out' means no tickets remain.", "'Sold out' nghĩa là không còn vé.", undefined],
];

const k19Ls: Tuple[] = [
  ["What instrument does the girl play?", ["Violin", "Flute", "Drums", "Piano"], 1, "She plays the flute.", "Bạn ấy chơi sáo.", "Listen: 'I have played the flute in the orchestra for three years.'"],
  ["When is the next rehearsal?", ["Monday", "Tuesday", "Thursday", "Sunday"], 2, "The next rehearsal is on Thursday.", "Buổi tập tiếp theo vào thứ Năm.", "Listen: 'Our next rehearsal is Thursday at half past five.'"],
  ["Where will the concert take place?", ["School hall", "Church", "Theatre", "Park"], 2, "The concert is at the theatre.", "Buổi hòa nhạc diễn ra ở nhà hát.", "Listen: 'This year the concert will be at the town theatre.'"],
  ["How much are student tickets?", ["Three pounds", "Five pounds", "Six pounds", "Eight pounds"], 1, "Student tickets cost five pounds.", "Vé sinh viên giá năm bảng.", "Listen: 'Students pay five pounds, adults pay nine.'"],
  ["What does the boy need to buy?", ["New strings", "A music stand", "A case", "Sheet music"], 0, "He needs new strings.", "Cậu ấy cần dây đàn mới.", "Listen: 'I have to buy new strings before Saturday.'"],
  ["Who is the soloist?", ["Anna", "Ben", "Clara", "Daniel"], 2, "Clara is the soloist.", "Clara là người độc tấu.", "Listen: 'Clara will play the solo in the second piece.'"],
  ["How long is the concert?", ["One hour", "Ninety minutes", "Two hours", "Three hours"], 1, "The concert lasts ninety minutes.", "Buổi hòa nhạc kéo dài chín mươi phút.", "Listen: 'With the interval it lasts about ninety minutes.'"],
  ["What must performers wear?", ["Black clothes", "School uniform", "White shirts", "Anything"], 0, "Performers must wear black clothes.", "Người biểu diễn phải mặc đồ đen.", "Listen: 'Everyone in the orchestra wears black, please.'"],
  ["Why is one piece being changed?", ["Too difficult", "Too long", "Nobody likes it", "Missing music"], 0, "The piece is too difficult.", "Bản nhạc đó quá khó.", "Listen: 'We are changing the last piece; it is too difficult for now.'"],
  ["What will happen after the concert?", ["A party", "A recording", "Photos", "A meeting"], 2, "There will be photos afterwards.", "Sau đó sẽ chụp ảnh.", "Listen: 'Stay behind afterwards because we are taking photos.'"],
];

const ket19: CambridgeMockExam = {
  id: "cambridge-ket-19",
  title: "KET Mock Test 19 - Music & Concerts",
  titleVi: "Đề thi thử KET 19 - Âm nhạc & Hòa nhạc",
  level: "ket",
  duration: 60,
  totalQuestions: 25,
  questions: build(k19Rw, k19Ls),
};

/* ================== KET 20 - Volunteering ================== */
const k20pA =
  "Last autumn our class spent two Saturdays helping at an animal shelter outside town. We expected to play with puppies, but most of our time went on cleaning, carrying food and washing blankets. By the second week we understood that the boring work is exactly what the shelter cannot manage alone. Three families who visited while we were there decided to adopt a cat, and the manager said our cleaning had made the rooms look welcoming.";
const k20pB =
  "Volunteering is not only useful for other people. Studies show that students who help regularly become more confident when they speak to adults, and many discover interests they had never considered. Our teacher warned us, however, that promising too much is worse than promising little: a volunteer who stops coming after two weeks creates more work than one who never started.";

const k20Rw: Tuple[] = [
  ["Where did the class volunteer?", ["A hospital", "An animal shelter", "A library", "A park"], 1, "They helped at an animal shelter outside town.", "Các bạn giúp ở trại cứu hộ động vật ngoài thị trấn.", k20pA],
  ["What had the students expected?", ["Cleaning", "Playing with puppies", "Office work", "Painting"], 1, "They expected to play with puppies.", "Các bạn tưởng sẽ được chơi với chó con.", k20pA],
  ["What did they actually do most?", ["Cleaning and carrying", "Training dogs", "Answering phones", "Taking photos"], 0, "Most time went on cleaning, carrying food and washing.", "Phần lớn thời gian là dọn dẹp, khuân thức ăn và giặt chăn.", k20pA],
  ["What did they realise in week two?", ["The work was easy", "Boring work is what the shelter needs", "Animals dislike visitors", "They should stop"], 1, "The boring work is what the shelter cannot manage alone.", "Việc nhàm chán chính là điều trại không tự làm xuể.", k20pA],
  ["How many families adopted a cat?", ["Two", "Three", "Four", "Five"], 1, "Three families decided to adopt a cat.", "Ba gia đình quyết định nhận nuôi mèo.", k20pA],
  ["What do studies show about volunteers?", ["They earn more", "They become more confident", "They study less", "They travel more"], 1, "Students who help become more confident with adults.", "Học sinh giúp đỡ thường tự tin hơn khi nói chuyện với người lớn.", k20pB],
  ["What do many volunteers discover?", ["New interests", "New languages", "Better marks", "Cheaper travel"], 0, "Many discover interests they had never considered.", "Nhiều bạn khám phá ra sở thích chưa từng nghĩ tới.", k20pB],
  ["What did the teacher warn about?", ["Working too hard", "Promising too much", "Arriving early", "Asking questions"], 1, "The teacher warned that promising too much is worse.", "Giáo viên cảnh báo hứa quá nhiều thì tệ hơn.", k20pB],
  ["Why is an unreliable volunteer a problem?", ["They cost money", "They create more work", "They are noisy", "They take space"], 1, "Someone who stops coming creates more work.", "Người bỏ dở tạo thêm việc cho người khác.", k20pB],
  ["A person who works without pay is a ___.", ["volunteer", "visitor", "vendor", "veteran"], 0, "A volunteer works without pay.", "Tình nguyện viên làm việc không lương.", undefined],
  ["They ___ at the shelter every Saturday.", ["helps", "help", "helping", "to help"], 1, "With 'they' we use the base form 'help'.", "Với 'they' thì dùng 'help'.", undefined],
  ["To take an animal into your home is to ___ it.", ["adopt", "adapt", "admit", "advise"], 0, "You adopt an animal.", "Bạn nhận nuôi một con vật.", undefined],
  ["The shelter ___ money to buy food.", ["raises", "rises", "raise", "risen"], 0, "'Raise money' means to collect money.", "'Raise money' nghĩa là quyên góp tiền.", undefined],
  ["Someone you can trust to come is ___.", ["reliable", "relative", "related", "relaxed"], 0, "A reliable person can be trusted.", "Người đáng tin cậy là 'reliable'.", undefined],
  ["We should ___ our free time to help others.", ["spend", "pass", "waste", "lose"], 0, "We 'spend' time doing something.", "Chúng ta 'spend' thời gian làm việc gì đó.", undefined],
];

const k20Ls: Tuple[] = [
  ["What kind of help does the centre need?", ["Cooking", "Gardening", "Teaching", "Driving"], 1, "The centre needs help with gardening.", "Trung tâm cần giúp làm vườn.", "Listen: 'At the moment we mainly need help in the garden.'"],
  ["How often should volunteers come?", ["Daily", "Once a week", "Twice a month", "Once a month"], 1, "Volunteers should come once a week.", "Tình nguyện viên nên đến mỗi tuần một lần.", "Listen: 'We ask people to come once a week if possible.'"],
  ["What age must volunteers be?", ["Over 14", "Over 16", "Over 18", "Any age"], 1, "Volunteers must be over sixteen.", "Tình nguyện viên phải trên mười sáu tuổi.", "Listen: 'You must be over sixteen to work here on your own.'"],
  ["What is provided free?", ["Transport", "Lunch", "Uniform", "Gloves"], 3, "Gloves are provided free.", "Găng tay được phát miễn phí.", "Listen: 'We provide gloves, but bring your own boots.'"],
  ["When is the training session?", ["Saturday morning", "Saturday afternoon", "Sunday morning", "Sunday afternoon"], 0, "The training is on Saturday morning.", "Buổi tập huấn vào sáng thứ Bảy.", "Listen: 'The training session is on Saturday morning at ten.'"],
  ["Who should they contact?", ["Mr Hall", "Mrs Hill", "Miss Hart", "Mr Hunt"], 2, "They should contact Miss Hart.", "Nên liên hệ cô Hart.", "Listen: 'Speak to Miss Hart, she organises the volunteers.'"],
  ["What did the boy enjoy most?", ["Meeting people", "Being outside", "Learning skills", "Free food"], 0, "He enjoyed meeting people most.", "Cậu ấy thích nhất là gặp gỡ mọi người.", "Listen: 'The best part for me was meeting so many people.'"],
  ["How long is each session?", ["Two hours", "Three hours", "Four hours", "Five hours"], 1, "Each session lasts three hours.", "Mỗi buổi kéo dài ba tiếng.", "Listen: 'Each session is three hours, with a short break.'"],
  ["What should volunteers not do?", ["Ask questions", "Feed the animals", "Take photos of visitors", "Clean the rooms"], 2, "They must not take photos of visitors.", "Không được chụp ảnh khách đến thăm.", "Listen: 'Please never take photos of visitors without asking.'"],
  ["What happens at the end of the year?", ["A certificate", "A payment", "A trip", "A test"], 0, "Volunteers receive a certificate.", "Tình nguyện viên nhận giấy chứng nhận.", "Listen: 'At the end of the year we give everyone a certificate.'"],
];

const ket20: CambridgeMockExam = {
  id: "cambridge-ket-20",
  title: "KET Mock Test 20 - Volunteering",
  titleVi: "Đề thi thử KET 20 - Hoạt động tình nguyện",
  level: "ket",
  duration: 60,
  totalQuestions: 25,
  questions: build(k20Rw, k20Ls),
};

export const cambridgeExamsKet16to20: CambridgeMockExam[] = [
  ket16,
  ket17,
  ket18,
  ket19,
  ket20,
];
