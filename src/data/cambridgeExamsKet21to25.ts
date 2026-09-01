/**
 * @file cambridgeExamsKet21to25.ts
 * @description Five Cambridge KET / A2 Key mock exams, tests 21 to 25.
 *              Themes: Part-time Jobs, City Transport, Free Time Online,
 *              Eating Out, School Friendships. Each paper has 20 Reading &
 *              Writing questions and 10 Listening questions with full scripts.
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

/* ================== KET 21 - Part-time Jobs ================== */
const k21pA =
  "Every Saturday I help in my uncle's flower shop from eight until twelve. My job is simple: I cut the stems, fill the buckets with fresh water and carry orders to the customers' cars. My uncle pays me a small amount and, more importantly, he teaches me how to talk to customers politely.";
const k21pB =
  "At first I was too shy to speak to anybody. After three months I can explain which flowers last longest and I remember what our regular customers usually buy. My mother says the job has changed me more than any school lesson, and I think she is right.";

const k21Rw: Tuple[] = [
  ["When does the writer work?", ["Friday evening", "Saturday morning", "Sunday afternoon", "Every day"], 1, "The writer works every Saturday from eight until twelve.", "Bạn ấy làm sáng thứ Bảy từ tám đến mười hai giờ.", k21pA],
  ["Where is the job?", ["In a bakery", "In a flower shop", "In a cafe", "In a market stall"], 1, "The job is in the uncle's flower shop.", "Công việc ở tiệm hoa của người chú.", k21pA],
  ["Which task is mentioned?", ["Cleaning windows", "Filling buckets with water", "Answering the phone", "Counting money"], 1, "The writer fills the buckets with fresh water.", "Bạn ấy đổ nước sạch vào xô.", k21pA],
  ["What does the uncle teach?", ["Flower names", "How to drive", "How to talk to customers politely", "How to use a computer"], 2, "He teaches how to talk to customers politely.", "Chú dạy cách nói chuyện lịch sự với khách.", k21pA],
  ["What does the writer say matters more than the money?", ["The free flowers", "The short hours", "What the uncle teaches", "The company of friends"], 2, "The writer says the teaching is more important.", "Bạn ấy nói điều chú dạy quan trọng hơn.", k21pA],
  ["How did the writer feel at first?", ["Bored", "Too shy to speak", "Angry", "Excited"], 1, "At first the writer was too shy to speak.", "Ban đầu bạn ấy quá nhút nhát để nói.", k21pB],
  ["How long has the writer worked there?", ["One month", "Two months", "Three months", "A year"], 2, "After three months things changed.", "Sau ba tháng mọi thứ thay đổi.", k21pB],
  ["What can the writer explain now?", ["Prices in other shops", "Which flowers last longest", "How to grow roses", "Where flowers come from"], 1, "The writer can explain which flowers last longest.", "Bạn ấy có thể giải thích loài hoa nào tươi lâu nhất.", k21pB],
  ["What does the mother think?", ["The job is tiring", "The job changed her child a lot", "The job is dangerous", "The job pays too little"], 1, "She says the job has changed the writer more than school lessons.", "Mẹ nói công việc thay đổi bạn ấy nhiều hơn cả bài học ở trường.", k21pB],
  ["Does the writer agree with the mother?", ["Yes", "No", "Only partly", "The text does not say"], 0, "The writer says 'I think she is right'.", "Bạn ấy nói 'tôi nghĩ mẹ đúng'.", k21pB],
  ["I earn money by ___ my neighbour's dog.", ["walk", "walking", "walked", "to walking"], 1, "After 'by' we use the -ing form.", "Sau 'by' dùng dạng -ing.", undefined],
  ["Money you get every month for work is a ___.", ["salary", "receipt", "ticket", "bill"], 0, "Regular payment for work is a salary.", "Tiền công hằng tháng gọi là lương.", undefined],
  ["She has worked here ___ March.", ["for", "since", "from", "during"], 1, "'Since' is used with a point in time.", "'Since' dùng với mốc thời gian.", undefined],
  ["My brother applied ___ a job at the cinema.", ["to", "at", "for", "on"], 2, "We apply for a job.", "Cụm đúng là 'apply for a job'.", undefined],
  ["A person who helps customers in a shop is a shop ___.", ["assistant", "attendant", "adviser", "agent"], 0, "The usual word is shop assistant.", "Từ thường dùng là shop assistant.", undefined],
  ["If I finish early, I ___ home before six.", ["get", "will get", "got", "getting"], 1, "First conditional uses 'will get'.", "Câu điều kiện loại 1 dùng 'will get'.", undefined],
  ["The interview ___ last Tuesday.", ["is", "was", "were", "been"], 1, "'Last Tuesday' with a singular subject needs 'was'.", "Quá khứ với chủ ngữ số ít dùng 'was'.", undefined],
  ["He is good ___ dealing with difficult customers.", ["in", "on", "at", "with"], 2, "We are good 'at' something.", "Cấu trúc là 'good at'.", undefined],
  ["Working weekends can be tiring, ___ the money helps.", ["but", "so", "because", "although"], 0, "'But' links the two contrasting ideas correctly.", "'But' nối hai ý trái ngược.", undefined],
  ["Please ___ on time on your first day.", ["arrive", "arrives", "arriving", "arrived"], 0, "After 'please' we use the base form.", "Sau 'please' dùng nguyên thể.", undefined],
];

const k21Ls: Tuple[] = [
  ["What is the girl's weekend job?", ["Babysitting", "Waitressing", "Selling tickets", "Cleaning"], 0, "She babysits at the weekend.", "Cuối tuần bạn ấy trông trẻ.", "Girl: 'I babysit my neighbour's children on Sunday afternoons.'"],
  ["How much does the boy earn an hour?", ["Forty", "Fifty", "Sixty", "Seventy"], 1, "He earns fifty an hour.", "Cậu ấy kiếm năm mươi mỗi giờ.", "Boy: 'They pay me fifty an hour, which is fair for the work.'"],
  ["What time does the shift start?", ["At seven", "At eight", "At nine", "At ten"], 2, "The shift starts at nine.", "Ca làm bắt đầu lúc chín giờ.", "Man: 'Your shift starts at nine and ends at one.'"],
  ["What does the woman find difficult?", ["Standing all day", "Early mornings", "Rude customers", "The uniform"], 0, "She finds standing all day difficult.", "Cô ấy thấy đứng cả ngày là vất vả.", "Woman: 'The hardest part is standing on my feet all day.'"],
  ["Where did the boy see the advert?", ["Online", "In a newspaper", "In the shop window", "At school"], 2, "He saw it in the shop window.", "Cậu ấy thấy quảng cáo trên cửa kính tiệm.", "Boy: 'There was a card in the shop window asking for help.'"],
  ["What must workers wear?", ["A cap", "Black shoes", "A blue shirt", "Gloves"], 2, "They must wear a blue shirt.", "Nhân viên phải mặc áo xanh.", "Woman: 'Everyone wears the blue shirt with the shop's name.'"],
  ["How many days a week does she work?", ["One", "Two", "Three", "Four"], 1, "She works two days a week.", "Cô ấy làm hai ngày mỗi tuần.", "Girl: 'I work two days a week, Saturday and Sunday.'"],
  ["What is the boy saving for?", ["A laptop", "A holiday", "A guitar", "A course"], 3, "He is saving for a course.", "Cậu ấy tiết kiệm để học một khóa học.", "Boy: 'I am saving for an English course in the summer.'"],
  ["Who trained the new worker?", ["The manager", "Another student", "The owner", "Nobody"], 1, "Another student trained him.", "Một bạn sinh viên khác hướng dẫn.", "Man: 'Another student showed me what to do on day one.'"],
  ["What does the manager want tomorrow?", ["An earlier start", "A day off", "A meeting", "New uniforms"], 0, "The manager wants an earlier start.", "Quản lý muốn bắt đầu sớm hơn.", "Woman: 'Could you come half an hour earlier tomorrow?'"],
];

const ket21: CambridgeMockExam = {
  id: "cambridge-ket-21",
  title: "KET Mock Test 21 - Part-time Jobs",
  titleVi: "Đề thi thử KET 21 - Việc làm thêm",
  level: "ket",
  duration: 40,
  totalQuestions: 30,
  questions: build(k21Rw, k21Ls),
};

/* ================== KET 22 - City Transport ================== */
const k22pA =
  "The new bus card in our city costs less than paper tickets and works on every route. You put money on it online and touch it on a reader when you get on. Students under eighteen pay half price, but they must show a school card the first time they register.";
const k22pB =
  "Not everything is perfect. On rainy days the buses are late because the traffic is heavy, and the app that shows arrival times is sometimes wrong by ten minutes. Even so, most people I know prefer the bus to a motorbike now, mainly because parking in the centre has become so expensive.";

const k22Rw: Tuple[] = [
  ["What is cheaper than paper tickets?", ["The new bus card", "A monthly pass", "A taxi", "A bicycle"], 0, "The new bus card costs less than paper tickets.", "Thẻ xe buýt mới rẻ hơn vé giấy.", k22pA],
  ["Where do you add money?", ["At the station only", "Online", "On the bus", "At a bank"], 1, "You put money on it online.", "Bạn nạp tiền trực tuyến.", k22pA],
  ["What do you do when you get on?", ["Show a ticket", "Touch the card on a reader", "Pay the driver", "Sign a list"], 1, "You touch the card on a reader.", "Bạn chạm thẻ vào máy đọc.", k22pA],
  ["How much do students under eighteen pay?", ["Nothing", "Half price", "Full price", "A fixed fee"], 1, "They pay half price.", "Học sinh dưới mười tám tuổi trả nửa giá.", k22pA],
  ["What must students show first?", ["A passport", "A school card", "A photo", "A letter"], 1, "They must show a school card when they register.", "Các bạn phải xuất trình thẻ học sinh khi đăng ký.", k22pA],
  ["Why are buses late on rainy days?", ["Fewer drivers", "Heavy traffic", "Longer routes", "Card problems"], 1, "The traffic is heavy on rainy days.", "Ngày mưa giao thông đông đúc.", k22pB],
  ["What problem does the app have?", ["It costs money", "Times can be wrong by ten minutes", "It needs a password", "It only shows one route"], 1, "The arrival times are sometimes wrong by ten minutes.", "Giờ đến đôi khi sai đến mười phút.", k22pB],
  ["What do most people the writer knows prefer?", ["Motorbikes", "The bus", "Walking", "Taxis"], 1, "Most prefer the bus now.", "Đa số giờ thích đi xe buýt.", k22pB],
  ["What is the main reason for that choice?", ["Speed", "Comfort", "Expensive parking", "Safety"], 2, "Parking in the centre has become expensive.", "Phí đỗ xe ở trung tâm đã rất đắt.", k22pB],
  ["What is the writer's overall opinion?", ["Very negative", "Mostly positive", "Completely neutral", "Uninterested"], 1, "The writer admits problems but supports the system.", "Bạn ấy nêu vấn đề nhưng vẫn ủng hộ hệ thống.", k22pB],
  ["We waited ___ the bus stop for twenty minutes.", ["in", "at", "on", "to"], 1, "We wait 'at' a bus stop.", "Chờ 'at' trạm xe buýt.", undefined],
  ["The train ___ at platform three in five minutes.", ["arrive", "arrives", "arriving", "arrived"], 1, "A timetable fact uses the present simple 'arrives'.", "Lịch trình dùng hiện tại đơn 'arrives'.", undefined],
  ["You must not ___ the road when the light is red.", ["cross", "crosses", "crossing", "crossed"], 0, "After 'must not' we use the base form.", "Sau 'must not' dùng nguyên thể.", undefined],
  ["A place where you leave your car is a car ___.", ["park", "field", "yard", "stop"], 0, "The usual word is car park.", "Từ đúng là car park.", undefined],
  ["How ___ does it take to get to the airport?", ["far", "long", "much", "many"], 1, "We ask about time with 'how long'.", "Hỏi thời gian dùng 'how long'.", undefined],
  ["The underground is ___ than the bus in rush hour.", ["fast", "faster", "fastest", "more fast"], 1, "'Than' needs the comparative 'faster'.", "Có 'than' nên dùng 'faster'.", undefined],
  ["Cyclists should wear a ___ for safety.", ["helmet", "hamlet", "helper", "handle"], 0, "A helmet protects the head.", "Mũ bảo hiểm bảo vệ đầu.", undefined],
  ["I missed the bus, ___ I walked home.", ["so", "but", "because", "although"], 0, "'So' shows the result.", "'So' chỉ kết quả.", undefined],
  ["The ticket machine is out of ___ again.", ["order", "line", "time", "place"], 0, "A broken machine is 'out of order'.", "Máy hỏng gọi là 'out of order'.", undefined],
  ["If the traffic ___ bad, we will take the train.", ["is", "will be", "was", "being"], 0, "After 'if' we use the present simple.", "Sau 'if' dùng hiện tại đơn.", undefined],
];

const k22Ls: Tuple[] = [
  ["Which bus does the woman need?", ["Number 8", "Number 12", "Number 18", "Number 21"], 2, "She needs bus number 18.", "Cô ấy cần xe buýt số 18.", "Woman: 'Excuse me, is number 18 the bus for the hospital?'"],
  ["How often does the bus run?", ["Every ten minutes", "Every fifteen minutes", "Every twenty minutes", "Every half hour"], 1, "It runs every fifteen minutes.", "Xe chạy mười lăm phút một chuyến.", "Man: 'It comes every fifteen minutes until eight in the evening.'"],
  ["Where does the boy get off?", ["At the market", "At the library", "At the station", "At the park"], 1, "He gets off at the library.", "Cậu ấy xuống ở thư viện.", "Boy: 'I get off at the library and walk from there.'"],
  ["How much is a single ticket?", ["Five", "Seven", "Ten", "Twelve"], 2, "A single ticket costs ten.", "Vé một chiều giá mười.", "Woman: 'A single is ten, a return is eighteen.'"],
  ["Why is the girl late?", ["She overslept", "The train was cancelled", "She lost her card", "The road was closed"], 1, "Her train was cancelled.", "Chuyến tàu của bạn ấy bị hủy.", "Girl: 'Sorry, my train was cancelled and I waited ages.'"],
  ["What does the man suggest?", ["Taking a taxi", "Walking", "Cycling", "Going tomorrow"], 2, "He suggests cycling.", "Anh ấy gợi ý đi xe đạp.", "Man: 'Why not cycle? It only takes fifteen minutes.'"],
  ["Which platform is the train on?", ["Two", "Three", "Four", "Five"], 3, "The train is on platform five.", "Tàu ở sân ga số năm.", "Woman: 'The Hanoi train leaves from platform five today.'"],
  ["What did the boy lose?", ["His bus card", "His bag", "His phone", "His keys"], 0, "He lost his bus card.", "Cậu ấy làm mất thẻ xe buýt.", "Boy: 'I lost my bus card, so I had to buy a paper ticket.'"],
  ["When will the new station open?", ["In March", "In June", "In September", "Next year"], 2, "It opens in September.", "Nhà ga mới mở vào tháng Chín.", "Man: 'They say the new station opens in September.'"],
  ["What is the main problem with the app?", ["It is slow", "The times are not exact", "It needs money", "It is in English only"], 1, "The arrival times are not exact.", "Giờ hiển thị không chính xác.", "Woman: 'The app is useful, but the arrival times are not exact.'"],
];

const ket22: CambridgeMockExam = {
  id: "cambridge-ket-22",
  title: "KET Mock Test 22 - City Transport",
  titleVi: "Đề thi thử KET 22 - Giao thông thành phố",
  level: "ket",
  duration: 40,
  totalQuestions: 30,
  questions: build(k22Rw, k22Ls),
};

/* ================== KET 23 - Free Time Online ================== */
const k23pA =
  "I joined an online chess club six months ago. We meet every Wednesday evening in a video call and play three games with a clock. The members live in four different countries, so somebody is always eating breakfast while somebody else is going to bed.";
const k23pB =
  "The club has one strict rule: after every game you must say one thing your opponent did well. It sounds strange, but it stops arguments and it makes you look at the board from the other player's side. My own play improved much faster after I started doing this.";

const k23Rw: Tuple[] = [
  ["When did the writer join the club?", ["Last week", "Three months ago", "Six months ago", "A year ago"], 2, "The writer joined six months ago.", "Bạn ấy tham gia sáu tháng trước.", k23pA],
  ["When does the club meet?", ["Monday", "Wednesday", "Friday", "Sunday"], 1, "They meet every Wednesday evening.", "Câu lạc bộ họp tối thứ Tư.", k23pA],
  ["How many games do they play?", ["Two", "Three", "Four", "Five"], 1, "They play three games with a clock.", "Các thành viên chơi ba ván có đồng hồ.", k23pA],
  ["How many countries do the members live in?", ["Two", "Three", "Four", "Six"], 2, "The members live in four countries.", "Các thành viên sống ở bốn nước.", k23pA],
  ["Why is the time difference mentioned?", ["Games start late", "Members are in different time zones", "The app is slow", "The club is closed"], 1, "It shows members are in different time zones.", "Điều đó cho thấy họ ở các múi giờ khác nhau.", k23pA],
  ["What is the strict rule?", ["Play fast", "Praise your opponent afterwards", "Never talk", "Win two games"], 1, "You must say one thing your opponent did well.", "Bạn phải khen một điều đối thủ làm tốt.", k23pB],
  ["What does the rule prevent?", ["Cheating", "Arguments", "Late arrivals", "Long games"], 1, "It stops arguments.", "Quy tắc ngăn cãi vã.", k23pB],
  ["What else does the rule do?", ["Makes games shorter", "Helps you see the other player's view", "Teaches new openings", "Gives extra points"], 1, "It makes you look at the board from the other side.", "Nó giúp bạn nhìn bàn cờ từ phía đối thủ.", k23pB],
  ["What happened to the writer's play?", ["It got worse", "It stayed the same", "It improved faster", "It became slower"], 2, "The writer's play improved much faster.", "Trình độ của bạn ấy tiến bộ nhanh hơn.", k23pB],
  ["What is the writer's attitude to the rule?", ["Positive", "Negative", "Confused", "Bored"], 0, "The writer supports the rule and its results.", "Bạn ấy ủng hộ quy tắc này.", k23pB],
  ["I spend two hours a week ___ videos about art.", ["watch", "watching", "watched", "to watching"], 1, "After 'spend time' we use the -ing form.", "Sau 'spend time' dùng dạng -ing.", undefined],
  ["My favourite podcast ___ every Monday.", ["come out", "comes out", "coming out", "came out soon"], 1, "The subject is singular, so 'comes out'.", "Chủ ngữ số ít nên dùng 'comes out'.", undefined],
  ["Please turn ___ the volume; it is too loud.", ["down", "up", "off it", "into"], 0, "'Turn down' means make quieter.", "'Turn down' nghĩa là vặn nhỏ.", undefined],
  ["She is interested ___ learning Korean online.", ["on", "at", "in", "for"], 2, "The phrase is 'interested in'.", "Cụm đúng là 'interested in'.", undefined],
  ["We have known each other ___ two years.", ["since", "for", "from", "during"], 1, "'For' is used with a period of time.", "'For' dùng với khoảng thời gian.", undefined],
  ["He never posts photos ___ he does not like social media.", ["so", "but", "because", "although"], 2, "'Because' gives the reason.", "'Because' nêu lý do.", undefined],
  ["This game is ___ boring than the last one.", ["little", "less", "least", "fewer"], 1, "'Than' needs the comparative 'less'.", "Có 'than' nên dùng 'less'.", undefined],
  ["My brother is really ___ at online quizzes.", ["good", "well", "best", "better than"], 0, "'Good at' is the correct phrase here.", "Cụm đúng ở đây là 'good at'.", undefined],
  ["If you play all night, you ___ tired at school.", ["are", "will be", "were", "being"], 1, "First conditional uses 'will be'.", "Điều kiện loại 1 dùng 'will be'.", undefined],
  ["I usually take a ___ from the screen every hour.", ["break", "brake", "brick", "block"], 0, "A rest is a 'break'.", "Nghỉ ngơi gọi là 'break'.", undefined],
];

const k23Ls: Tuple[] = [
  ["What does the girl do online?", ["Learns guitar", "Sells clothes", "Writes a blog", "Plays chess"], 0, "She learns guitar online.", "Bạn ấy học ghi ta trực tuyến.", "Girl: 'I learn guitar from a teacher online every Thursday.'"],
  ["How long is the boy allowed online?", ["One hour", "Ninety minutes", "Two hours", "Three hours"], 2, "He is allowed two hours.", "Cậu ấy được dùng hai tiếng.", "Boy: 'My parents let me have two hours after homework.'"],
  ["What is the club's rule?", ["No cameras", "Praise your opponent", "Speak English only", "Arrive early"], 1, "You must praise your opponent.", "Phải khen ngợi đối thủ.", "Man: 'After every game, say one thing your opponent did well.'"],
  ["Where does the girl watch films?", ["On her phone", "On a laptop", "On the TV", "At the cinema"], 1, "She watches on a laptop.", "Bạn ấy xem trên máy tính xách tay.", "Girl: 'I watch films on my laptop in the evening.'"],
  ["What does the boy dislike online?", ["Adverts", "Long videos", "Slow websites", "Comments"], 0, "He dislikes adverts.", "Cậu ấy ghét quảng cáo.", "Boy: 'The adverts every five minutes really annoy me.'"],
  ["When is the next online meeting?", ["Tuesday", "Wednesday", "Thursday", "Friday"], 1, "The meeting is on Wednesday.", "Buổi gặp trực tuyến vào thứ Tư.", "Woman: 'Our next online meeting is Wednesday at seven.'"],
  ["How many members are in the group?", ["Eight", "Ten", "Twelve", "Fifteen"], 2, "There are twelve members.", "Nhóm có mười hai thành viên.", "Man: 'We now have twelve members from four countries.'"],
  ["What did the girl learn to make?", ["A website", "A video", "A poster", "A podcast"], 3, "She learned to make a podcast.", "Bạn ấy học làm podcast.", "Girl: 'Last month I learned how to record a podcast.'"],
  ["What problem did the boy have?", ["A weak connection", "A broken screen", "No headphones", "A lost password"], 0, "He had a weak connection.", "Cậu ấy bị mạng yếu.", "Boy: 'My connection was so weak that the call kept stopping.'"],
  ["What advice does the woman give?", ["Take regular breaks", "Play more", "Change the app", "Use a bigger screen"], 0, "She advises taking regular breaks.", "Cô ấy khuyên nên nghỉ giải lao thường xuyên.", "Woman: 'Take a break from the screen at least every hour.'"],
];

const ket23: CambridgeMockExam = {
  id: "cambridge-ket-23",
  title: "KET Mock Test 23 - Free Time Online",
  titleVi: "Đề thi thử KET 23 - Giải trí trực tuyến",
  level: "ket",
  duration: 40,
  totalQuestions: 30,
  questions: build(k23Rw, k23Ls),
};

/* ================== KET 24 - Eating Out ================== */
const k24pA =
  "There is a small restaurant near the river that only has eight tables. You cannot book by phone; you write your name on a board outside and wait. The menu changes every day and is written by hand, because the cook buys whatever looks best at the market that morning.";
const k24pB =
  "My family goes there for special occasions. The food is not expensive, but you need patience: on Friday evening we once waited fifty minutes. The owner brings free tea to everyone who is waiting, and nobody seems to mind. I think the waiting is part of the experience.";

const k24Rw: Tuple[] = [
  ["How many tables does the restaurant have?", ["Six", "Eight", "Ten", "Twelve"], 1, "The restaurant has eight tables.", "Nhà hàng có tám bàn.", k24pA],
  ["How do you get a table?", ["Book by phone", "Write your name on a board", "Book online", "Ask the cook"], 1, "You write your name on a board outside.", "Bạn ghi tên lên bảng bên ngoài.", k24pA],
  ["How often does the menu change?", ["Every week", "Every day", "Every month", "Never"], 1, "The menu changes every day.", "Thực đơn thay đổi mỗi ngày.", k24pA],
  ["Why is the menu handwritten?", ["It is cheaper", "The cook buys the best market food each morning", "There is no printer", "It looks nice"], 1, "The cook buys whatever looks best at the market.", "Đầu bếp mua nguyên liệu tươi ngon nhất ở chợ.", k24pA],
  ["Where is the restaurant?", ["Near the river", "In the market", "Next to a school", "In a hotel"], 0, "It is near the river.", "Nhà hàng nằm gần sông.", k24pA],
  ["When does the family go there?", ["Every week", "For special occasions", "Only at lunchtime", "Never at weekends"], 1, "They go for special occasions.", "Gia đình đến vào dịp đặc biệt.", k24pB],
  ["What is the food like?", ["Very expensive", "Not expensive", "Free", "Only for tourists"], 1, "The food is not expensive.", "Đồ ăn không đắt.", k24pB],
  ["How long did they wait once?", ["Twenty minutes", "Thirty minutes", "Fifty minutes", "An hour and a half"], 2, "They once waited fifty minutes.", "Có lần họ chờ năm mươi phút.", k24pB],
  ["What does the owner give people who wait?", ["Free tea", "A discount", "Bread", "A ticket"], 0, "The owner brings free tea.", "Chủ quán mang trà miễn phí.", k24pB],
  ["What does the writer think about the waiting?", ["It ruins the meal", "It is part of the experience", "It is unfair", "It should be shorter"], 1, "The writer thinks waiting is part of the experience.", "Bạn ấy cho rằng chờ đợi là một phần trải nghiệm.", k24pB],
  ["Could I have the ___, please? We would like to pay.", ["bill", "build", "ball", "belt"], 0, "You ask for the bill to pay.", "Bạn xin hóa đơn để thanh toán.", undefined],
  ["We ___ a table for four at eight o'clock.", ["booked", "book yesterday", "booking", "books last night"], 0, "The past simple 'booked' fits.", "Quá khứ đơn 'booked' phù hợp.", undefined],
  ["There isn't ___ salt in this soup.", ["many", "much", "a lot", "few"], 1, "'Salt' is uncountable, so we use 'much'.", "'Salt' không đếm được nên dùng 'much'.", undefined],
  ["The person who serves food is a ___.", ["waiter", "worker", "walker", "washer"], 0, "A waiter serves food.", "Người phục vụ gọi là waiter.", undefined],
  ["I would like my steak ___ well done.", ["cook", "cooked", "cooking", "to cooking"], 1, "The past participle 'cooked' is correct.", "Dùng phân từ 'cooked'.", undefined],
  ["This restaurant is famous ___ its fresh fish.", ["of", "by", "for", "with"], 2, "The phrase is 'famous for'.", "Cụm đúng là 'famous for'.", undefined],
  ["Shall we eat ___ tonight?", ["out", "off", "over", "away with"], 0, "'Eat out' means eat in a restaurant.", "'Eat out' là ăn ở nhà hàng.", undefined],
  ["The starter comes ___ the main course.", ["after", "before", "during", "between"], 1, "A starter comes before the main course.", "Món khai vị đến trước món chính.", undefined],
  ["This is ___ meal I have eaten this year.", ["good", "better", "the best", "best of"], 2, "Superlatives use 'the best'.", "So sánh nhất dùng 'the best'.", undefined],
  ["If you order now, the food ___ ready in ten minutes.", ["is", "will be", "was", "would be"], 1, "First conditional uses 'will be'.", "Điều kiện loại 1 dùng 'will be'.", undefined],
];

const k24Ls: Tuple[] = [
  ["What does the man order?", ["Chicken", "Fish", "Beef", "Vegetable curry"], 3, "He orders the vegetable curry.", "Anh ấy gọi món cà ri rau củ.", "Man: 'I will have the vegetable curry, please, with rice.'"],
  ["How many people is the table for?", ["Two", "Three", "Four", "Five"], 2, "The table is for four.", "Bàn cho bốn người.", "Woman: 'A table for four at seven, under the name Mai.'"],
  ["What time does the restaurant close?", ["At nine", "At ten", "At half past ten", "At eleven"], 2, "It closes at half past ten.", "Nhà hàng đóng cửa lúc mười giờ rưỡi.", "Man: 'The kitchen closes at half past ten.'"],
  ["What is the problem with the order?", ["It is cold", "It is the wrong dish", "It is late", "It is too spicy"], 1, "They brought the wrong dish.", "Nhà hàng mang nhầm món.", "Woman: 'Excuse me, I ordered soup, not salad.'"],
  ["What does the girl not eat?", ["Beef", "Eggs", "Prawns", "Rice"], 2, "She does not eat prawns.", "Bạn ấy không ăn tôm.", "Girl: 'I am allergic to prawns, so please no seafood.'"],
  ["How much is the set lunch?", ["Sixty", "Seventy", "Eighty", "Ninety"], 2, "The set lunch is eighty.", "Suất trưa giá tám mươi.", "Man: 'The set lunch is eighty and includes a drink.'"],
  ["Where do they want to sit?", ["Inside", "By the window", "On the balcony", "Near the door"], 1, "They want to sit by the window.", "Họ muốn ngồi cạnh cửa sổ.", "Woman: 'Could we sit by the window, please?'"],
  ["What is free today?", ["Dessert", "Tea", "Bread", "Delivery"], 1, "Tea is free while you wait.", "Trà miễn phí trong lúc chờ.", "Man: 'The tea is free while you wait for your table.'"],
  ["How will they pay?", ["In cash", "By card", "By phone app", "Separately"], 1, "They will pay by card.", "Họ sẽ thanh toán bằng thẻ.", "Woman: 'Can we pay by card, please?'"],
  ["What does the boy recommend?", ["The soup", "The noodles", "The dessert", "The salad"], 2, "He recommends the dessert.", "Cậu ấy giới thiệu món tráng miệng.", "Boy: 'You must try the mango dessert - it is the best thing here.'"],
];

const ket24: CambridgeMockExam = {
  id: "cambridge-ket-24",
  title: "KET Mock Test 24 - Eating Out",
  titleVi: "Đề thi thử KET 24 - Ăn ngoài",
  level: "ket",
  duration: 40,
  totalQuestions: 30,
  questions: build(k24Rw, k24Ls),
};

/* ================== KET 25 - School Friendships ================== */
const k25pA =
  "When Tuan arrived at our school in October he did not know anybody. Our teacher asked me to sit next to him for two weeks. At first we hardly spoke, but then we discovered that we both collect old coins, and after that the conversation never stopped.";
const k25pB =
  "Making friends is easier when you share an activity, not just a classroom. Our school now has a lunchtime club for new students where they play board games with older ones. The idea came from a student, not a teacher, and this year almost thirty people joined it.";

const k25Rw: Tuple[] = [
  ["When did Tuan arrive?", ["In August", "In September", "In October", "In November"], 2, "Tuan arrived in October.", "Tuấn đến trường vào tháng Mười.", k25pA],
  ["What did the teacher ask?", ["To help with homework", "To sit next to him", "To show him the town", "To phone him"], 1, "The teacher asked the writer to sit next to him.", "Cô giáo nhờ bạn ấy ngồi cạnh Tuấn.", k25pA],
  ["How long was that arrangement?", ["One week", "Two weeks", "One month", "All year"], 1, "It was for two weeks.", "Việc đó kéo dài hai tuần.", k25pA],
  ["What did they discover?", ["They live near each other", "They both collect old coins", "They like the same sport", "They have the same birthday"], 1, "They both collect old coins.", "Cả hai đều sưu tầm tiền xu cổ.", k25pA],
  ["What happened after that?", ["They stopped talking", "They talked all the time", "They changed seats", "They joined a team"], 1, "After that the conversation never stopped.", "Sau đó hai bạn nói chuyện không ngừng.", k25pA],
  ["What makes friendship easier?", ["Sitting together", "Sharing an activity", "Being the same age", "Living nearby"], 1, "Sharing an activity makes it easier.", "Cùng tham gia hoạt động giúp kết bạn dễ hơn.", k25pB],
  ["At what point in the day does the new club meet?", ["Before school", "At lunchtime", "After school", "At the weekend"], 1, "It is a lunchtime club for new students.", "Đó là câu lạc bộ vào giờ ăn trưa.", k25pB],
  ["What do they do there?", ["Play board games", "Study maths", "Play football", "Sing"], 0, "New students play board games with older ones.", "Học sinh mới chơi cờ bàn với các anh chị.", k25pB],
  ["Who had the idea?", ["A teacher", "A student", "A parent", "The head teacher"], 1, "The idea came from a student.", "Ý tưởng đến từ một học sinh.", k25pB],
  ["How many people joined this year?", ["About twenty", "About thirty", "About forty", "About fifty"], 1, "Almost thirty people joined.", "Gần ba mươi bạn tham gia.", k25pB],
  ["We have been friends ___ primary school.", ["for", "since", "from", "during"], 1, "'Since' is used with a starting point.", "'Since' dùng với mốc bắt đầu.", undefined],
  ["He apologised ___ being late.", ["of", "for", "about to", "with"], 1, "The phrase is 'apologise for'.", "Cụm đúng là 'apologise for'.", undefined],
  ["She is the girl ___ helped me on my first day.", ["who", "which", "where", "what"], 0, "'Who' refers to a person.", "'Who' chỉ người.", undefined],
  ["They ___ each other for years before they met again.", ["do not see", "did not see", "have not seen", "had not seen"], 3, "The past perfect fits an earlier past action.", "Quá khứ hoàn thành phù hợp với hành động trước đó.", undefined],
  ["A person you know but who is not a close friend is an ___.", ["acquaintance", "accountant", "assistant", "audience"], 0, "That person is an acquaintance.", "Người quen gọi là acquaintance.", undefined],
  ["We fell ___ last week but we are friends again now.", ["out", "off", "over", "down"], 0, "'Fall out' means have an argument.", "'Fall out' nghĩa là cãi nhau.", undefined],
  ["Being kind is more important ___ being popular.", ["as", "than", "that", "then"], 1, "Comparatives use 'than'.", "So sánh hơn dùng 'than'.", undefined],
  ["I always ___ my friends when they need help.", ["support", "supports", "supporting", "supported soon"], 0, "With 'I' we use 'support'.", "Với 'I' dùng 'support'.", undefined],
  ["If somebody is unkind, you should ___ a teacher.", ["tell", "say", "speak", "talk"], 0, "We 'tell' a person.", "Dùng 'tell' với người nghe.", undefined],
  ["She invited me ___ her birthday party.", ["at", "in", "to", "for"], 2, "We invite somebody 'to' a party.", "Mời ai 'to' bữa tiệc.", undefined],
];

const k25Ls: Tuple[] = [
  ["How did the girl meet her best friend?", ["In class", "At a club", "On the bus", "At a party"], 1, "They met at a club.", "Hai bạn gặp nhau ở câu lạc bộ.", "Girl: 'We met at the art club, not in class.'"],
  ["What day does the club meet?", ["Monday", "Tuesday", "Thursday", "Friday"], 2, "The club meets on Thursday.", "Câu lạc bộ họp thứ Năm.", "Man: 'The board game club meets every Thursday lunchtime.'"],
  ["Why was the boy upset?", ["He lost a game", "His friend forgot his birthday", "He got a low mark", "He missed the bus"], 1, "His friend forgot his birthday.", "Bạn của cậu ấy quên sinh nhật.", "Boy: 'My best friend forgot my birthday completely.'"],
  ["What does the teacher suggest?", ["Talking to each other", "Changing seats", "Writing a letter", "Waiting a week"], 0, "She suggests talking to each other.", "Cô khuyên hai bạn nói chuyện với nhau.", "Woman: 'Talk to each other calmly - that always works best.'"],
  ["How many new students joined this term?", ["Two", "Three", "Four", "Six"], 2, "Four new students joined.", "Có bốn học sinh mới.", "Man: 'We welcomed four new students this term.'"],
  ["What does the girl help with?", ["Homework", "Showing new students around", "Cleaning", "Music"], 1, "She shows new students around.", "Bạn ấy dẫn học sinh mới đi tham quan trường.", "Girl: 'My job is to show new students around the school.'"],
  ["Where do they usually meet at break?", ["The library", "The canteen", "The yard", "The sports hall"], 0, "They meet in the library.", "Các bạn gặp nhau ở thư viện.", "Boy: 'We usually meet in the library at break.'"],
  ["What is the group planning?", ["A trip", "A party", "A concert", "A match"], 1, "They are planning a party.", "Nhóm đang lên kế hoạch tổ chức tiệc.", "Girl: 'We are planning a small party for the end of term.'"],
  ["What did the boy give his friend?", ["A book", "A photo", "A game", "A card"], 3, "He gave a card.", "Cậu ấy tặng một tấm thiệp.", "Boy: 'I made a card for her to say sorry.'"],
  ["What does the woman say about arguments?", ["They are normal", "They never happen", "They end friendships", "They are always serious"], 0, "She says arguments are normal.", "Cô ấy nói cãi vã là chuyện bình thường.", "Woman: 'Arguments are normal; what matters is how you fix them.'"],
];

const ket25: CambridgeMockExam = {
  id: "cambridge-ket-25",
  title: "KET Mock Test 25 - School Friendships",
  titleVi: "Đề thi thử KET 25 - Tình bạn ở trường",
  level: "ket",
  duration: 40,
  totalQuestions: 30,
  questions: build(k25Rw, k25Ls),
};

export const cambridgeExamsKet21to25: CambridgeMockExam[] = [
  ket21,
  ket22,
  ket23,
  ket24,
  ket25,
];
