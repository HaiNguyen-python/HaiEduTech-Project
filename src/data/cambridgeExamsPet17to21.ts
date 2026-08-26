/**
 * @file cambridgeExamsPet17to21.ts
 * @description Five Cambridge PET / B1 Preliminary mock exams, tests 17 to 21.
 *              Themes: Learning Technology, Sport & Motivation, Food Culture,
 *              Environment at Home, Media & Attention. 15 Reading & Writing
 *              questions and 10 Listening questions per paper.
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

/* ================== PET 17 - Learning Technology ================== */
const p17pA =
  "When our school introduced tablets in every classroom, the head teacher predicted that marks would rise within a term. Two years later the results are more complicated. In subjects where teachers redesigned their lessons around the devices, students clearly benefited: they could check their own answers instantly and repeat exercises as often as they liked. In classes where the tablet simply replaced a textbook, nothing improved at all. The technology, it turned out, was never the deciding factor; the teaching was.";
const p17pB =
  "Students themselves report a second, less obvious problem. Because a tablet holds a dictionary, a translator and a video explanation, many learners stop trying to work out difficult passages on their own. One teacher now asks pupils to spend five minutes struggling with a text before they are allowed to look anything up, and she says the difference in what they remember a week later is striking.";

const p17Rw: Tuple[] = [
  ["What did the head teacher predict?", ["Costs would fall", "Marks would rise quickly", "Teachers would object", "Books would disappear"], 1, "The head teacher predicted marks would rise within a term.", "Hiệu trưởng dự đoán điểm sẽ tăng trong một học kỳ.", p17pA],
  ["In which classes did students benefit?", ["Where lessons were redesigned", "Where tablets replaced books", "In science only", "In every class"], 0, "Students benefited where teachers redesigned lessons around the devices.", "Học sinh tiến bộ ở lớp mà giáo viên thiết kế lại bài giảng quanh thiết bị.", p17pA],
  ["What advantage is mentioned?", ["Cheaper materials", "Instant self-checking", "Shorter lessons", "Less homework"], 1, "Students could check their own answers instantly.", "Học sinh có thể tự kiểm tra đáp án ngay.", p17pA],
  ["What was the deciding factor?", ["The devices", "The teaching", "The budget", "The timetable"], 1, "The text says the teaching, not the technology, decided results.", "Bài đọc nói việc giảng dạy mới là yếu tố quyết định.", p17pA],
  ["What does the writer suggest about tablets alone?", ["They are harmful", "They change nothing by themselves", "They are essential", "They save time"], 1, "Where the tablet simply replaced a textbook, nothing improved.", "Ở nơi máy tính bảng chỉ thay sách, không có gì cải thiện.", p17pA],
  ["What second problem do students report?", ["Eye strain", "They stop working things out alone", "Slow internet", "Heavy bags"], 1, "Many learners stop trying to work out difficult passages themselves.", "Nhiều bạn thôi tự suy nghĩ với đoạn văn khó.", p17pB],
  ["What does one teacher require?", ["No devices at all", "Five minutes of struggle first", "Written translations", "Group work only"], 1, "Pupils must spend five minutes struggling before looking anything up.", "Học sinh phải tự vật lộn năm phút trước khi tra cứu.", p17pB],
  ["What result does she notice?", ["Faster reading", "Better memory a week later", "Higher attendance", "Fewer questions"], 1, "The difference in what they remember a week later is striking.", "Khác biệt về khả năng nhớ sau một tuần rất rõ rệt.", p17pB],
  ["What is the writer's overall attitude?", ["Enthusiastic", "Balanced", "Hostile", "Indifferent"], 1, "The writer presents benefits and problems, so the tone is balanced.", "Người viết nêu cả lợi ích và vấn đề nên giọng văn cân bằng.", undefined],
  ["The results were 'more complicated' means they were ___.", ["worse", "not simple", "excellent", "unknown"], 1, "'More complicated' means the picture is not simple.", "'More complicated' nghĩa là tình hình không đơn giản.", undefined],
  ["Had the lessons been redesigned, results ___ improved.", ["will have", "would have", "have", "had"], 1, "Third conditional uses 'would have improved'.", "Câu điều kiện loại ba dùng 'would have improved'.", undefined],
  ["The school ___ tablets two years ago.", ["introduces", "introduced", "has introduced", "was introducing"], 1, "'Two years ago' takes the past simple.", "Có 'two years ago' nên dùng quá khứ đơn.", undefined],
  ["To 'look something up' means to ___ it.", ["find in a reference", "raise it", "ignore it", "explain it"], 0, "'Look up' means find information in a reference source.", "'Look up' nghĩa là tra thông tin trong tài liệu.", undefined],
  ["Something 'striking' is very ___.", ["small", "noticeable", "quiet", "usual"], 1, "'Striking' means very noticeable.", "'Striking' nghĩa là rất đáng chú ý.", undefined],
  ["Students should rely ___ their own thinking first.", ["on", "in", "at", "of"], 0, "The correct preposition is 'rely on'.", "Cụm đúng là 'rely on'.", undefined],
];

const p17Ls: Tuple[] = [
  ["What is the meeting about?", ["Exam dates", "New software", "School trips", "Uniform rules"], 1, "The meeting is about new software.", "Cuộc họp bàn về phần mềm mới.", "Listen: 'Today we are discussing the new learning software for September.'"],
  ["Who will be trained first?", ["Students", "Teachers", "Parents", "Administrators"], 1, "Teachers will be trained first.", "Giáo viên được tập huấn trước.", "Listen: 'Teachers will receive the training before any student uses it.'"],
  ["What worries the speaker most?", ["Cost", "Reliability of the network", "Screen time", "Storage"], 1, "The speaker worries about network reliability.", "Người nói lo nhất về độ ổn định của mạng.", "Listen: 'My main worry is whether the network can handle it.'"],
  ["How long is the trial period?", ["One month", "One term", "Six months", "One year"], 1, "The trial lasts one term.", "Giai đoạn thử nghiệm kéo dài một học kỳ.", "Listen: 'We will trial it for one term and then review.'"],
  ["What will happen to printed books?", ["Removed", "Kept for some subjects", "Sold", "Given away"], 1, "Printed books stay for some subjects.", "Sách in vẫn giữ cho một số môn.", "Listen: 'Printed books will stay in literature and maths for now.'"],
  ["What must students do at home?", ["Charge devices", "Print worksheets", "Buy software", "Nothing"], 0, "Students must charge their devices at home.", "Học sinh phải sạc thiết bị ở nhà.", "Listen: 'Devices must be charged at home; there are no chargers in class.'"],
  ["What feedback did last year's pilot give?", ["Mostly negative", "Mixed", "Very positive", "None"], 1, "The feedback was mixed.", "Phản hồi khá lẫn lộn.", "Listen: 'Feedback from last year's pilot was honestly quite mixed.'"],
  ["Who will monitor progress?", ["The head teacher", "A small committee", "Parents", "An outside company"], 1, "A small committee will monitor progress.", "Một tiểu ban nhỏ sẽ theo dõi tiến độ.", "Listen: 'A small committee will monitor progress each month.'"],
  ["When is the next meeting?", ["In two weeks", "In a month", "Next term", "In June"], 1, "The next meeting is in a month.", "Cuộc họp tới diễn ra sau một tháng.", "Listen: 'We will meet again in a month with the first figures.'"],
  ["What is the speaker's final advice?", ["Move quickly", "Do not rush", "Buy more devices", "Cancel the plan"], 1, "The advice is not to rush.", "Lời khuyên là đừng vội vàng.", "Listen: 'Whatever we do, let us not rush this.'"],
];

const pet17: CambridgeMockExam = {
  id: "cambridge-pet-17",
  title: "PET Mock Test 17 - Learning Technology",
  titleVi: "Đề thi thử PET 17 - Công nghệ trong học tập",
  level: "pet",
  duration: 90,
  totalQuestions: 25,
  questions: build(p17Rw, p17Ls),
};

/* ================== PET 18 - Sport & Motivation ================== */
const p18pA =
  "Most people who join a gym in January have stopped going by March. Sports psychologists say the reason is rarely laziness. Beginners tend to set targets that depend on results they cannot control, such as losing a fixed number of kilos by a fixed date. When progress is slower than expected, motivation collapses. Athletes, by contrast, are trained to set process goals: attend three sessions a week, sleep eight hours, record every workout. Results follow, but they are not the promise.";
const p18pB =
  "There is also a social factor. A study of amateur runners found that those who trained with at least one partner were almost twice as likely to still be running a year later. Interestingly, the partner did not need to be faster or more experienced. What mattered was simply that somebody noticed when you did not turn up.";

const p18Rw: Tuple[] = [
  ["When do most January members stop going?", ["February", "By March", "In summer", "After a year"], 1, "Most have stopped going by March.", "Phần lớn đã bỏ tập trước tháng Ba.", p18pA],
  ["What do psychologists say is rarely the reason?", ["Laziness", "Cost", "Injury", "Time"], 0, "They say the reason is rarely laziness.", "Họ nói lý do hiếm khi là lười biếng.", p18pA],
  ["What is wrong with beginners' targets?", ["They are too small", "They depend on uncontrollable results", "They are too vague", "They change weekly"], 1, "Targets depend on results they cannot control.", "Mục tiêu phụ thuộc vào kết quả họ không kiểm soát được.", p18pA],
  ["What is a 'process goal'?", ["A final result", "An action you can repeat", "A competition", "A reward"], 1, "Process goals are actions such as attending three sessions a week.", "Mục tiêu quá trình là hành động như tập ba buổi mỗi tuần.", p18pA],
  ["According to the text, results ___.", ["never come", "follow but are not promised", "come first", "are guaranteed"], 1, "Results follow, but they are not the promise.", "Kết quả sẽ đến nhưng không phải là lời hứa.", p18pA],
  ["What did the runner study find?", ["Solo runners improve faster", "Partners double the chance of continuing", "Clubs are essential", "Speed matters most"], 1, "Runners with a partner were almost twice as likely to continue.", "Người chạy có bạn đồng hành có khả năng duy trì gần gấp đôi.", p18pB],
  ["What did NOT matter about the partner?", ["Being reliable", "Being faster", "Noticing absence", "Being present"], 1, "The partner did not need to be faster.", "Bạn tập không cần phải chạy nhanh hơn.", p18pB],
  ["What mattered most?", ["Somebody noticed absence", "Shared equipment", "Same age", "Same route"], 0, "What mattered was that somebody noticed when you did not turn up.", "Điều quan trọng là có người nhận ra khi bạn vắng mặt.", p18pB],
  ["The writer's main message is that motivation depends on ___.", ["natural talent", "habits and company", "expensive equipment", "strict diets"], 1, "The text stresses process habits and training partners.", "Bài đọc nhấn mạnh thói quen và bạn tập.", undefined],
  ["'Motivation collapses' means it ___.", ["grows", "disappears suddenly", "stays", "returns"], 1, "'Collapses' means falls away suddenly.", "'Collapses' nghĩa là sụp đổ đột ngột.", undefined],
  ["If he ___ with a friend, he would train more often.", ["run", "ran", "runs", "has run"], 1, "Second conditional uses the past form 'ran'.", "Câu điều kiện loại hai dùng 'ran'.", undefined],
  ["She has been training ___ six months.", ["since", "for", "during", "from"], 1, "'For' is used with a length of time.", "'For' dùng với khoảng thời gian.", undefined],
  ["To 'turn up' means to ___.", ["arrive", "leave", "refuse", "increase"], 0, "'Turn up' means to arrive.", "'Turn up' nghĩa là xuất hiện, đến.", undefined],
  ["An 'amateur' athlete is one who is ___.", ["professional", "not paid", "very young", "injured"], 1, "An amateur is not paid for the sport.", "Vận động viên nghiệp dư không được trả lương.", undefined],
  ["Keeping a record of workouts helps you ___ progress.", ["track", "trick", "trade", "treat"], 0, "'Track progress' means follow it over time.", "'Track progress' nghĩa là theo dõi tiến bộ.", undefined],
];

const p18Ls: Tuple[] = [
  ["What sport does the speaker coach?", ["Swimming", "Athletics", "Rowing", "Tennis"], 2, "The speaker coaches rowing.", "Người nói huấn luyện môn chèo thuyền.", "Listen: 'I have coached the rowing team here for nine years.'"],
  ["What does he say beginners overestimate?", ["Their strength", "How fast they will improve", "Training costs", "Their free time"], 1, "Beginners overestimate how fast they will improve.", "Người mới thường đánh giá quá cao tốc độ tiến bộ.", "Listen: 'Beginners always overestimate how fast they will improve.'"],
  ["How many sessions a week does he recommend?", ["Two", "Three", "Four", "Six"], 1, "He recommends three sessions.", "Ông khuyên tập ba buổi.", "Listen: 'Three sessions a week is enough for the first year.'"],
  ["What does he say about rest days?", ["Unnecessary", "As important as training", "Only for the injured", "One a month"], 1, "Rest days are as important as training.", "Ngày nghỉ quan trọng như buổi tập.", "Listen: 'Rest days are just as important as the training itself.'"],
  ["What mistake does he see most often?", ["Poor technique", "Training too hard too soon", "Wrong food", "Late arrival"], 1, "Training too hard too soon is the commonest mistake.", "Lỗi phổ biến nhất là tập quá nặng quá sớm.", "Listen: 'The commonest mistake is training too hard too soon.'"],
  ["What does the club provide?", ["Kit", "Transport", "Coaching only", "Meals"], 1, "The club provides transport.", "Câu lạc bộ lo phương tiện đi lại.", "Listen: 'The club provides transport to away competitions.'"],
  ["When is the beginners' course?", ["Weekday evenings", "Saturday mornings", "Sunday afternoons", "Friday nights"], 1, "The course runs Saturday mornings.", "Khóa cho người mới vào sáng thứ Bảy.", "Listen: 'The beginners' course runs on Saturday mornings.'"],
  ["What must members bring?", ["A water bottle", "Their own boat", "A medical form", "A photo"], 2, "Members must bring a medical form.", "Thành viên phải nộp giấy khám sức khỏe.", "Listen: 'Everyone must hand in a medical form before the first session.'"],
  ["How much is the yearly fee?", ["Sixty", "Eighty", "A hundred", "A hundred and twenty"], 3, "The fee is a hundred and twenty.", "Phí năm là một trăm hai mươi.", "Listen: 'Membership is a hundred and twenty pounds for the year.'"],
  ["What is his final piece of advice?", ["Compete early", "Be patient", "Buy good shoes", "Train alone"], 1, "His advice is to be patient.", "Lời khuyên của ông là hãy kiên nhẫn.", "Listen: 'If I say one thing, it is this: be patient.'"],
];

const pet18: CambridgeMockExam = {
  id: "cambridge-pet-18",
  title: "PET Mock Test 18 - Sport & Motivation",
  titleVi: "Đề thi thử PET 18 - Thể thao & Động lực",
  level: "pet",
  duration: 90,
  totalQuestions: 25,
  questions: build(p18Rw, p18Ls),
};

/* ================== PET 19 - Food Culture ================== */
const p19pA =
  "Street food is often described as the honest food of a city. Unlike restaurants, a street stall cannot hide behind decoration or service; if the dish is not good, the queue disappears the same week. In many countries the best-known stalls have sold the same single dish for decades, and the cook has no interest in adding anything else to the menu. Visitors sometimes find this narrow choice disappointing, but regular customers regard it as proof of quality.";
const p19pB =
  "Recently, several cities have introduced stricter hygiene rules for street traders. Most people agree that safety standards were necessary, yet the cost of new equipment has pushed some older cooks out of business. Their recipes, learned from parents and never written down, disappear with them. A few universities have started recording these dishes on video, arguing that a recipe is as much part of a city's history as a building is.";

const p19Rw: Tuple[] = [
  ["Why is street food called 'honest'?", ["It is cheap", "Poor dishes lose customers fast", "Cooks are friendly", "It is traditional"], 1, "If the dish is not good, the queue disappears the same week.", "Nếu món không ngon thì hàng người xếp hàng biến mất ngay tuần đó.", p19pA],
  ["What do famous stalls often do?", ["Change menus weekly", "Sell one dish for decades", "Open branches", "Serve tourists only"], 1, "They have sold the same single dish for decades.", "Họ bán cùng một món suốt nhiều thập kỷ.", p19pA],
  ["How do visitors sometimes react?", ["They are impressed", "They find the choice disappointing", "They complain about prices", "They avoid stalls"], 1, "Visitors sometimes find the narrow choice disappointing.", "Khách du lịch đôi khi thấy ít lựa chọn là đáng thất vọng.", p19pA],
  ["How do regulars see the narrow menu?", ["A weakness", "Proof of quality", "A tradition only", "A problem of cost"], 1, "Regular customers regard it as proof of quality.", "Khách quen coi đó là bằng chứng của chất lượng.", p19pA],
  ["What can a street stall NOT rely on?", ["Good ingredients", "Decoration and service", "Loyal customers", "Location"], 1, "A stall cannot hide behind decoration or service.", "Quầy hàng không thể núp sau trang trí hay dịch vụ.", p19pA],
  ["What have several cities introduced?", ["Free licences", "Stricter hygiene rules", "New markets", "Tax cuts"], 1, "They have introduced stricter hygiene rules.", "Nhiều thành phố áp dụng quy định vệ sinh chặt hơn.", p19pB],
  ["What effect have the rules had?", ["More stalls opened", "Some older cooks closed", "Prices fell", "Food got worse"], 1, "The cost of new equipment pushed some cooks out of business.", "Chi phí thiết bị mới khiến một số đầu bếp phải nghỉ.", p19pB],
  ["Why are the recipes lost?", ["They were never written down", "They were sold", "They were banned", "Nobody liked them"], 0, "The recipes were learned from parents and never written down.", "Công thức truyền miệng từ cha mẹ và chưa từng được ghi lại.", p19pB],
  ["What are some universities doing?", ["Opening restaurants", "Recording dishes on video", "Training cooks", "Paying rent"], 1, "They are recording these dishes on video.", "Họ đang quay video ghi lại các món ăn này.", p19pB],
  ["The writer compares a recipe to a ___.", ["building", "painting", "book", "song"], 0, "The text says a recipe is as much part of history as a building.", "Bài đọc nói công thức cũng là phần lịch sử như một tòa nhà.", p19pB],
  ["Rules about cleanliness in food are ___ rules.", ["hygiene", "harvest", "heritage", "hospital"], 0, "Hygiene rules concern cleanliness.", "Quy định vệ sinh liên quan đến sự sạch sẽ.", undefined],
  ["The stall ___ here since 1970.", ["is", "was", "has been", "had been"], 2, "'Since 1970' needs the present perfect 'has been'.", "Có 'since 1970' nên dùng hiện tại hoàn thành.", undefined],
  ["A list of dishes in a restaurant is a ___.", ["menu", "manual", "receipt", "record"], 0, "The list of dishes is the menu.", "Danh sách món ăn là thực đơn.", undefined],
  ["This soup is ___ than the one we tried yesterday.", ["tasty", "tastier", "tastiest", "most tasty"], 1, "With 'than' we use the comparative 'tastier'.", "Có 'than' nên dùng 'tastier'.", undefined],
  ["'Out of business' means a shop has ___.", ["expanded", "closed", "moved", "reopened"], 1, "'Out of business' means it has closed.", "'Out of business' nghĩa là đã đóng cửa.", undefined],
];

const p19Ls: Tuple[] = [
  ["What is the woman researching?", ["Restaurants", "Market traders", "Farm food", "Cooking schools"], 1, "She researches market traders.", "Cô ấy nghiên cứu về những người bán hàng ở chợ.", "Listen: 'My research is about market traders and their recipes.'"],
  ["How many stalls has she visited?", ["Twelve", "Twenty", "Thirty", "Forty"], 2, "She has visited thirty stalls.", "Cô đã đến ba mươi quầy hàng.", "Listen: 'So far I have visited thirty stalls across the city.'"],
  ["What surprised her most?", ["The prices", "How little is written down", "The hours", "The queues"], 1, "She was surprised how little is written down.", "Cô ngạc nhiên vì rất ít thứ được ghi chép lại.", "Listen: 'What surprised me is how little of this is written down.'"],
  ["What does she record?", ["Photos only", "Video and notes", "Audio only", "Receipts"], 1, "She records video and notes.", "Cô ghi hình và ghi chép.", "Listen: 'I film each dish and take detailed notes at the same time.'"],
  ["What problem do traders mention?", ["Rent", "Equipment costs", "Weather", "Staff"], 1, "Traders mention equipment costs.", "Người bán nói về chi phí thiết bị.", "Listen: 'Almost everyone mentions the cost of the new equipment.'"],
  ["Who funds the project?", ["The city", "A university", "A newspaper", "A company"], 1, "A university funds the project.", "Một trường đại học tài trợ dự án.", "Listen: 'The university funds the project for three years.'"],
  ["When will the results be published?", ["This year", "Next spring", "Next autumn", "In two years"], 2, "Results will be published next autumn.", "Kết quả sẽ công bố vào mùa thu năm sau.", "Listen: 'We plan to publish the results next autumn.'"],
  ["What form will the results take?", ["A book", "A website", "A film", "An exhibition"], 1, "The results will be a website.", "Kết quả sẽ ở dạng trang web.", "Listen: 'Everything will go on a free public website.'"],
  ["What does she hope traders will gain?", ["Money", "Recognition", "Training", "Space"], 1, "She hopes they gain recognition.", "Cô hy vọng họ được ghi nhận.", "Listen: 'I hope the traders get the recognition they deserve.'"],
  ["What does she advise visitors to do?", ["Book ahead", "Follow the queues", "Ask for menus", "Eat early"], 1, "She advises following the queues.", "Cô khuyên hãy đi theo hàng người xếp hàng.", "Listen: 'My tip for visitors is simple: follow the queues.'"],
];

const pet19: CambridgeMockExam = {
  id: "cambridge-pet-19",
  title: "PET Mock Test 19 - Food Culture",
  titleVi: "Đề thi thử PET 19 - Văn hóa ẩm thực",
  level: "pet",
  duration: 90,
  totalQuestions: 25,
  questions: build(p19Rw, p19Ls),
};

/* ================== PET 20 - Environment at Home ================== */
const p20pA =
  "Households are frequently told to save the planet by recycling, yet researchers point out that recycling is the least effective of the three familiar actions. Reducing what we buy comes first, reusing second, and only then recycling, which still requires transport, water and energy. The order matters because a family that recycles carefully while buying twice as much as before has almost certainly increased its impact rather than reduced it.";
const p20pB =
  "Energy at home follows a similar pattern. Switching off a light saves a small amount; insulating a roof saves a great deal every winter for twenty years. Yet surveys show people consistently overestimate the value of small daily actions and underestimate the value of one-off improvements, partly because the small actions are visible and the improvements are hidden above the ceiling.";

const p20Rw: Tuple[] = [
  ["Which action is least effective?", ["Reducing", "Reusing", "Recycling", "Repairing"], 2, "Researchers say recycling is the least effective of the three.", "Các nhà nghiên cứu nói tái chế kém hiệu quả nhất trong ba việc.", p20pA],
  ["What comes first?", ["Reducing what we buy", "Reusing", "Recycling", "Donating"], 0, "Reducing what we buy comes first.", "Giảm mua sắm là ưu tiên đầu.", p20pA],
  ["What does recycling still require?", ["Nothing", "Transport, water and energy", "New laws", "More space"], 1, "Recycling requires transport, water and energy.", "Tái chế vẫn cần vận chuyển, nước và năng lượng.", p20pA],
  ["What happens if a family buys twice as much?", ["Impact falls", "Impact probably rises", "Nothing changes", "Recycling fails"], 1, "It has almost certainly increased its impact.", "Gần như chắc chắn tác động đã tăng lên.", p20pA],
  ["Why does the order matter?", ["It is a legal rule", "Careful recycling cannot cancel extra buying", "Councils require it", "It saves money"], 1, "Recycling cannot offset buying twice as much.", "Tái chế không bù được việc mua gấp đôi.", p20pA],
  ["Which saves more energy?", ["Switching off a light", "Insulating a roof", "Closing a door", "Using a fan"], 1, "Insulating a roof saves a great deal every winter.", "Cách nhiệt mái nhà tiết kiệm rất nhiều mỗi mùa đông.", p20pB],
  ["How long do roof savings last?", ["One winter", "Five years", "Ten years", "Twenty years"], 3, "The text says twenty years.", "Bài đọc nói hai mươi năm.", p20pB],
  ["What do people overestimate?", ["One-off improvements", "Small daily actions", "Costs", "Government help"], 1, "People overestimate small daily actions.", "Mọi người đánh giá quá cao các hành động nhỏ hằng ngày.", p20pB],
  ["Why do they do this?", ["Small actions are visible", "Improvements are cheap", "Adverts say so", "Schools teach it"], 0, "Small actions are visible; improvements are hidden.", "Hành động nhỏ thì thấy được, còn cải tạo thì bị che khuất.", p20pB],
  ["The writer's purpose is to ___.", ["criticise recycling entirely", "correct common priorities", "sell insulation", "praise households"], 1, "The writer corrects how people rank environmental actions.", "Người viết chỉnh lại thứ tự ưu tiên của mọi người.", undefined],
  ["Material that keeps heat inside is ___.", ["insulation", "installation", "inspection", "instruction"], 0, "Insulation keeps heat in.", "Vật liệu cách nhiệt giữ nhiệt bên trong.", undefined],
  ["If we ___ less, we would waste less.", ["buy", "bought", "buying", "have bought"], 1, "Second conditional uses the past form 'bought'.", "Câu điều kiện loại hai dùng 'bought'.", undefined],
  ["A 'one-off' action happens ___.", ["daily", "once", "weekly", "never"], 1, "'One-off' means happening a single time.", "'One-off' nghĩa là chỉ diễn ra một lần.", undefined],
  ["Water and energy are natural ___.", ["resources", "reasons", "results", "reports"], 0, "Water and energy are natural resources.", "Nước và năng lượng là tài nguyên thiên nhiên.", undefined],
  ["The council collects rubbish that can be ___.", ["recycled", "recorded", "reduced", "returned"], 0, "Rubbish that can be processed again is recycled.", "Rác có thể xử lý lại được gọi là tái chế.", undefined],
];

const p20Ls: Tuple[] = [
  ["What is the talk about?", ["Water bills", "Home energy", "City transport", "Food waste"], 1, "The talk is about home energy.", "Buổi nói chuyện về năng lượng trong nhà.", "Listen: 'Tonight I want to talk about energy use in the home.'"],
  ["Which room uses most energy?", ["Bedroom", "Kitchen", "Bathroom", "Living room"], 1, "The kitchen uses most energy.", "Nhà bếp dùng nhiều năng lượng nhất.", "Listen: 'In most homes the kitchen uses the most energy by far.'"],
  ["What free service does the council offer?", ["New windows", "An energy check", "Cheap bulbs", "Repairs"], 1, "The council offers a free energy check.", "Hội đồng cung cấp buổi kiểm tra năng lượng miễn phí.", "Listen: 'The council offers a free energy check for any household.'"],
  ["How much can insulation save a year?", ["Fifty", "A hundred", "Two hundred", "Three hundred"], 2, "Insulation can save two hundred a year.", "Cách nhiệt tiết kiệm hai trăm mỗi năm.", "Listen: 'Good roof insulation saves around two hundred pounds a year.'"],
  ["What does the speaker call a myth?", ["Turning off lights helps a lot", "Windows lose heat", "Doors matter", "Heating is costly"], 0, "He calls it a myth that turning off lights helps a lot.", "Ông gọi việc tắt đèn giúp nhiều là một lầm tưởng.", "Listen: 'It is a myth that switching off lights makes a big difference.'"],
  ["What should you check first?", ["The roof", "The boiler", "The windows", "The floor"], 0, "You should check the roof first.", "Nên kiểm tra mái nhà trước.", "Listen: 'Always start with the roof; heat rises.'"],
  ["Who can get a grant?", ["Everyone", "Low-income households", "Homeowners only", "New buildings"], 1, "Low-income households can get a grant.", "Hộ thu nhập thấp có thể nhận trợ cấp.", "Listen: 'Grants are available for low-income households.'"],
  ["When does the scheme end?", ["In March", "In June", "In September", "In December"], 0, "The scheme ends in March.", "Chương trình kết thúc vào tháng Ba.", "Listen: 'Please apply soon because the scheme ends in March.'"],
  ["What does he say about smart meters?", ["Useless", "Useful only if you act", "Expensive", "Compulsory"], 1, "They are useful only if you act on the data.", "Chúng chỉ hữu ích nếu bạn hành động theo dữ liệu.", "Listen: 'A smart meter helps only if you act on what it shows.'"],
  ["What can people collect after the talk?", ["A booklet", "A meter", "A form", "A voucher"], 0, "People can collect a booklet.", "Mọi người có thể lấy một cuốn sách nhỏ.", "Listen: 'Do take a booklet from the table on your way out.'"],
];

const pet20: CambridgeMockExam = {
  id: "cambridge-pet-20",
  title: "PET Mock Test 20 - Environment at Home",
  titleVi: "Đề thi thử PET 20 - Môi trường trong gia đình",
  level: "pet",
  duration: 90,
  totalQuestions: 25,
  questions: build(p20Rw, p20Ls),
};

/* ================== PET 21 - Media & Attention ================== */
const p21pA =
  "Reading a long article on a screen is measurably harder than reading the same text on paper. Eye-tracking studies show that readers on screens jump around the page, return to earlier lines and skip whole paragraphs. Interestingly, the difference almost disappears when the screen text is printed in a single narrow column with generous space between the lines, which suggests the problem lies in design rather than in the technology itself.";
const p21pB =
  "Attention is also shaped by expectation. When students were told that an article would be followed by a discussion, they remembered far more than a group told only to read it. Teachers can use this cheaply: announcing the task before the reading, not after, changes how the reading is done. Some researchers now argue that the most valuable skill schools can teach is not finding information but deciding what deserves attention at all.";

const p21Rw: Tuple[] = [
  ["What do eye-tracking studies show?", ["Screen readers jump around", "Screen readers are faster", "Paper is harder", "No difference exists"], 0, "Readers on screens jump around and skip paragraphs.", "Người đọc trên màn hình hay nhảy loạn và bỏ qua đoạn.", p21pA],
  ["When does the difference nearly disappear?", ["With larger screens", "With a narrow column and line spacing", "With bright light", "With shorter texts"], 1, "It disappears with a single narrow column and generous line spacing.", "Khác biệt biến mất khi văn bản một cột hẹp và giãn dòng rộng.", p21pA],
  ["Where does the writer say the problem lies?", ["In the technology", "In the design", "In the readers", "In the subject"], 1, "The problem lies in design rather than technology.", "Vấn đề nằm ở thiết kế chứ không phải công nghệ.", p21pA],
  ["What do screen readers often do?", ["Read aloud", "Skip whole paragraphs", "Take notes", "Read twice"], 1, "They skip whole paragraphs.", "Họ bỏ qua cả đoạn văn.", p21pA],
  ["'Measurably harder' means the difference can be ___.", ["ignored", "measured", "imagined", "avoided"], 1, "'Measurably' means it can be measured.", "'Measurably' nghĩa là có thể đo được.", p21pA],
  ["Which students remembered more?", ["Those told about a discussion", "Those reading twice", "Those reading on paper", "Those working alone"], 0, "Those told an article would be followed by discussion remembered more.", "Nhóm được báo sẽ thảo luận nhớ nhiều hơn.", p21pB],
  ["What should teachers do?", ["Announce the task first", "Announce the task after", "Avoid tasks", "Shorten readings"], 0, "Announcing the task before the reading changes how it is done.", "Nêu nhiệm vụ trước khi đọc sẽ thay đổi cách đọc.", p21pB],
  ["Why is this method attractive?", ["It costs nothing", "It needs software", "It saves time", "It is compulsory"], 0, "The text says teachers can use this cheaply.", "Bài đọc nói giáo viên có thể áp dụng rất rẻ.", p21pB],
  ["What do some researchers now argue?", ["Finding information matters most", "Deciding what deserves attention matters most", "Reading is unnecessary", "Screens should be banned"], 1, "They argue the key skill is deciding what deserves attention.", "Họ cho rằng kỹ năng quan trọng nhất là quyết định điều gì đáng chú ý.", p21pB],
  ["The two texts together suggest attention depends on ___.", ["luck", "design and expectation", "age", "speed"], 1, "Text A points to design, text B to expectation.", "Đoạn A nói về thiết kế, đoạn B nói về kỳ vọng.", undefined],
  ["Space between lines of text is called line ___.", ["spacing", "spelling", "shading", "sizing"], 0, "The gap between lines is line spacing.", "Khoảng cách giữa các dòng là giãn dòng.", undefined],
  ["The article ___ by thousands of people last week.", ["read", "was read", "reads", "reading"], 1, "The passive past is 'was read'.", "Bị động quá khứ là 'was read'.", undefined],
  ["'Generous space' here means ___ space.", ["plenty of", "very little", "no", "equal"], 0, "'Generous' means plenty.", "'Generous' nghĩa là rộng rãi, nhiều.", undefined],
  ["Students paid ___ to the second article.", ["attention", "attempt", "attitude", "audience"], 0, "The collocation is 'pay attention'.", "Cụm đúng là 'pay attention'.", undefined],
  ["Something 'valuable' is very ___.", ["useful", "cheap", "heavy", "rare only"], 0, "'Valuable' means useful or worth much.", "'Valuable' nghĩa là hữu ích, có giá trị.", undefined],
];

const p21Ls: Tuple[] = [
  ["What is the podcast about?", ["Writing", "Reading habits", "Printing", "Advertising"], 1, "The podcast is about reading habits.", "Podcast nói về thói quen đọc.", "Listen: 'This week we look at how our reading habits are changing.'"],
  ["How many people took part in the study?", ["Two hundred", "Four hundred", "Six hundred", "A thousand"], 1, "Four hundred people took part.", "Bốn trăm người tham gia.", "Listen: 'Four hundred volunteers took part over six weeks.'"],
  ["What did the researchers measure?", ["Speed and recall", "Speed only", "Recall only", "Eye colour"], 0, "They measured reading speed and recall.", "Họ đo tốc độ đọc và khả năng nhớ.", "Listen: 'We measured both reading speed and how much they recalled.'"],
  ["Which group did best?", ["Paper readers", "Screen readers", "Both equally", "Neither"], 0, "Paper readers did best.", "Nhóm đọc giấy làm tốt nhất.", "Listen: 'On recall, the paper group came out ahead.'"],
  ["What made screen reading better?", ["Bigger font", "Narrow columns", "Dark mode", "Louder rooms"], 1, "Narrow columns improved screen reading.", "Cột hẹp giúp đọc trên màn hình tốt hơn.", "Listen: 'Narrow columns closed most of the gap.'"],
  ["What did participants underestimate?", ["How often they stopped", "How fast they read", "Text length", "Their tiredness"], 0, "They underestimated how often they stopped.", "Họ đánh giá thấp số lần mình dừng lại.", "Listen: 'Most had no idea how often they stopped and restarted.'"],
  ["What advice is given to students?", ["Read at night", "Read one text at a time", "Read aloud", "Read faster"], 1, "The advice is to read one text at a time.", "Lời khuyên là đọc từng văn bản một.", "Listen: 'Read one text at a time, with nothing else open.'"],
  ["What will next week's episode cover?", ["Podcasts", "Note-taking", "Libraries", "Exams"], 1, "Next week's episode covers note-taking.", "Tập tới nói về việc ghi chú.", "Listen: 'Next week we turn to note-taking.'"],
  ["Where can listeners find the study?", ["A website", "A magazine", "A library", "A newspaper"], 0, "The study is on a website.", "Nghiên cứu có trên một trang web.", "Listen: 'The full study is on our website, free to download.'"],
  ["What is the presenter's conclusion?", ["Screens are bad", "Design and habits matter", "Paper will return", "Nothing is proven"], 1, "The conclusion is that design and habits matter.", "Kết luận là thiết kế và thói quen mới quan trọng.", "Listen: 'It is not screens versus paper; it is design and habits.'"],
];

const pet21: CambridgeMockExam = {
  id: "cambridge-pet-21",
  title: "PET Mock Test 21 - Media & Attention",
  titleVi: "Đề thi thử PET 21 - Truyền thông & Sự tập trung",
  level: "pet",
  duration: 90,
  totalQuestions: 25,
  questions: build(p21Rw, p21Ls),
};

export const cambridgeExamsPet17to21: CambridgeMockExam[] = [
  pet17,
  pet18,
  pet19,
  pet20,
  pet21,
];
