/**
 * @file cambridgeExamsMovers6to10.ts
 * @description Five Cambridge MOVERS mock exams (6-10), each with 15 Reading &
 *              Writing questions (including two reading-text groups) and 10
 *              Listening questions. Themes: 6 Jobs & People at Work, 7 Weekend
 *              & Free Time, 8 Town & Directions, 9 Food & Restaurants,
 *              10 Weather & Seasons. Grammar focus: present simple/continuous,
 *              past simple, comparatives, Movers wordlist vocabulary.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { CambridgeMockExam, CambridgeMockQuestion } from "./cambridgeMockExamData";

type Tuple = [question: string, options: string[], correct: number, explanation: string, explanationVi: string, passage?: string];

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

/* ===================== MOVERS 6 - Jobs & People at Work ===================== */
const m6PassageA = "My uncle Tom is a farmer. He gets up at six o'clock every morning and feeds the animals on his farm. He has cows, chickens and two big horses. In summer, Tom works in the fields all day, but in winter he cleans the barn and fixes the fences. Tom's wife, Anna, is a vet. She helps sick animals get better. Tomorrow they are going to a farmers' market to sell fresh eggs and vegetables.";
const m6PassageB = "Dear Grandma, Thank you for the postcard! I want to be a doctor when I grow up, like Dad. Yesterday my class visited a hospital and met a nurse called Mrs Lopez. She was kinder than my teacher! She showed us how doctors check your heart. My friend Kim wants to be a chef because she loves cooking. Next week we are going to visit a fire station too. Love, Mia";

const m6Rw: Tuple[] = [
  ["What time does Tom get up?", ["Five o'clock", "Six o'clock", "Seven o'clock", "Eight o'clock"], 1, "The passage says Tom gets up at six o'clock every morning.", "Đoạn văn nói Tom dậy lúc sáu giờ mỗi sáng.", m6PassageA],
  ["What does Tom do in winter?", ["He sells eggs", "He swims in the river", "He cleans the barn and fixes fences", "He goes to school"], 2, "In winter, Tom cleans the barn and fixes the fences.", "Vào mùa đông, Tom dọn chuồng và sửa hàng rào.", m6PassageA],
  ["What is Anna's job?", ["Teacher", "Vet", "Chef", "Pilot"], 1, "Anna is a vet who helps sick animals.", "Anna là bác sĩ thú y giúp các con vật ốm khỏe lại.", m6PassageA],
  ["Where are Tom and Anna going tomorrow?", ["To a hospital", "To a farmers' market", "To school", "To a fire station"], 1, "Tomorrow they are going to a farmers' market to sell food.", "Ngày mai họ đến chợ nông sản để bán trứng và rau.", m6PassageA],
  ["Which animals does Tom have?", ["Cows, chickens and horses", "Cats and dogs", "Fish and birds", "Sheep and pigs"], 0, "The text lists cows, chickens and two big horses.", "Đoạn văn liệt kê bò, gà và hai con ngựa lớn.", m6PassageA],
  ["Who did Mia's class meet at the hospital?", ["A doctor called Mr Lopez", "A nurse called Mrs Lopez", "A chef", "A firefighter"], 1, "Mia's class met a nurse called Mrs Lopez.", "Lớp của Mia đã gặp một y tá tên là Mrs Lopez.", m6PassageB],
  ["What does Mia want to be?", ["A nurse", "A chef", "A doctor", "A vet"], 2, "Mia wants to be a doctor like her dad.", "Mia muốn trở thành bác sĩ giống bố mình.", m6PassageB],
  ["Why does Kim want to be a chef?", ["She loves cooking", "She loves animals", "She loves reading", "She loves singing"], 0, "The letter says Kim loves cooking.", "Bức thư nói Kim yêu thích nấu ăn.", m6PassageB],
  ["Mrs Lopez was ___ than the teacher.", ["kind", "kinder", "kindest", "more kind"], 1, "The comparative form 'kinder than' compares two people.", "Dạng so sánh hơn 'kinder than' dùng để so sánh hai người.", m6PassageB],
  ["Where is Mia's class going next week?", ["A farm", "A fire station", "A market", "A zoo"], 1, "Next week they are going to visit a fire station.", "Tuần sau họ sẽ đi thăm trạm cứu hỏa.", m6PassageB],
  ["My father ___ in a big office in the city.", ["work", "works", "working", "worked yesterday"], 1, "Present simple third person singular: works.", "Thì hiện tại đơn ngôi thứ ba số ít: works.", ],
  ["Look! The builder ___ a new house right now.", ["build", "builds", "is building", "built"], 2, "'Right now' signals present continuous.", "'Right now' báo hiệu thì hiện tại tiếp diễn.", ],
  ["A person who teaches children is called a ___.", ["driver", "teacher", "singer", "farmer"], 1, "A teacher teaches children.", "Giáo viên là người dạy trẻ em.", ],
  ["Last year, my mum ___ as a nurse in a small clinic.", ["work", "works", "worked", "is working"], 2, "'Last year' needs the past simple: worked.", "'Last year' cần thì quá khứ đơn: worked.", ],
  ["A police officer's job is ___ than a librarian's job.", ["dangerous", "more dangerous", "most dangerous", "dangerously"], 1, "Longer adjectives use 'more' for comparatives.", "Tính từ dài dùng 'more' để tạo so sánh hơn.", ],
];

const m6Ls: Tuple[] = [
  ["What is Mr Brown's job?", ["Doctor", "Pilot", "Cook", "Farmer"], 1, "Mr Brown flies planes, so he is a pilot.", "Ông Brown lái máy bay nên ông ấy là phi công.", "Listen: 'Mr Brown flies big planes to other countries. He is a pilot.'"],
  ["What is the woman doing now?", ["Cooking dinner", "Cleaning the office", "Fixing a car", "Reading a book"], 0, "She is cooking dinner right now.", "Cô ấy đang nấu bữa tối ngay bây giờ.", "Listen: 'My sister is cooking dinner in the kitchen right now.'"],
  ["What did the man do yesterday?", ["He painted a wall", "He fixed a bike", "He cleaned windows", "He drove a bus"], 1, "Yesterday he fixed a bike for his neighbour.", "Hôm qua anh ấy đã sửa xe đạp cho hàng xóm.", "Listen: 'Yesterday, my dad fixed a bike for our neighbour.'"],
  ["Who works at the hospital?", ["Her aunt", "Her brother", "Her friend", "Her cousin"], 0, "Her aunt is a nurse who works at the hospital.", "Dì của cô ấy là y tá làm việc ở bệnh viện.", "Listen: 'My aunt is a nurse. She works at the big hospital in town.'"],
  ["What time does the baker start work?", ["Four o'clock", "Five o'clock", "Six o'clock", "Seven o'clock"], 1, "The baker starts work at five o'clock every morning.", "Người thợ làm bánh bắt đầu làm việc lúc năm giờ sáng.", "Listen: 'The baker starts work at five o'clock every morning to make fresh bread.'"],
  ["What job does Tim want when he grows up?", ["Vet", "Chef", "Singer", "Engineer"], 3, "Tim wants to be an engineer and build bridges.", "Tim muốn trở thành kỹ sư và xây cầu.", "Listen: 'When I grow up, I want to be an engineer and build big bridges.'"],
  ["Where does the farmer keep his chickens?", ["In a barn", "In the garden", "In a small house", "In a field"], 2, "The chickens live in a small house near the barn.", "Đàn gà sống trong một ngôi nhà nhỏ gần chuồng.", "Listen: 'The chickens live in a small house near the big barn.'"],
  ["What is the woman's new job?", ["Shop assistant", "Bus driver", "Teacher", "Dentist"], 2, "She just started working as a teacher at a new school.", "Cô ấy vừa bắt đầu làm giáo viên ở một trường mới.", "Listen: 'I just started working as a teacher at a new school this week.'"],
  ["Who fixed the computer?", ["The father", "The mother", "The son", "The daughter"], 0, "Her father fixed the computer last night.", "Bố của cô ấy đã sửa máy tính vào tối qua.", "Listen: 'My father fixed the computer last night after dinner.'"],
  ["What does the postman do every day?", ["Delivers letters", "Cleans streets", "Drives a taxi", "Sells fruit"], 0, "The postman delivers letters to every house on the street.", "Người đưa thư giao thư đến từng nhà trên phố.", "Listen: 'The postman delivers letters to every house on our street every day.'"],
];

const movers6: CambridgeMockExam = {
  id: "cambridge-movers-6",
  title: "Movers Mock Test 6 - Jobs & People at Work",
  titleVi: "Đề thi thử Movers 6 - Nghề nghiệp & Người lao động",
  level: "movers",
  duration: 30,
  totalQuestions: 25,
  questions: build(m6Rw, m6Ls),
};

/* ===================== MOVERS 7 - Weekend & Free Time ===================== */
const m7PassageA = "On Saturdays, my family always does something fun. Last Saturday we went to the swimming pool in the morning and had a picnic in the park in the afternoon. My little sister loves swimming more than football, but I like football better. In the evening we watched a film at home and ate popcorn. This weekend we are going to visit our grandparents and play board games with them.";
const m7PassageB = "Hi Sam, How was your weekend? Mine was great! On Saturday I rode my bike to the lake with my friends. We were faster than the other group because we practised all week. On Sunday I stayed at home and read a new book about space. It was more exciting than my last book. Next weekend, do you want to go skateboarding with me? Write back soon! Best, Jack";

const m7Rw: Tuple[] = [
  ["What did the family do on Saturday morning?", ["Went to the swimming pool", "Played board games", "Watched a film", "Visited grandparents"], 0, "Last Saturday morning they went to the swimming pool.", "Sáng thứ Bảy vừa rồi cả nhà đi bơi.", m7PassageA],
  ["Where did they have a picnic?", ["At school", "In the park", "At the beach", "At home"], 1, "They had a picnic in the park in the afternoon.", "Họ đã ăn dã ngoại ở công viên vào buổi chiều.", m7PassageA],
  ["What does the little sister like more than football?", ["Reading", "Swimming", "Painting", "Singing"], 1, "The sister loves swimming more than football.", "Em gái thích bơi hơn là bóng đá.", m7PassageA],
  ["What are they going to do this weekend?", ["Go swimming", "Visit grandparents and play board games", "Watch a film", "Go to school"], 1, "This weekend they will visit grandparents and play board games.", "Cuối tuần này họ sẽ thăm ông bà và chơi cờ.", m7PassageA],
  ["What did they eat while watching a film?", ["Popcorn", "Ice cream", "Cake", "Fruit"], 0, "They watched a film and ate popcorn.", "Họ xem phim và ăn bắp rang bơ.", m7PassageA],
  ["How did Jack get to the lake?", ["By bus", "By bike", "By car", "On foot"], 1, "Jack rode his bike to the lake with his friends.", "Jack đã đạp xe đến hồ cùng bạn bè.", m7PassageB],
  ["Why were they faster than the other group?", ["They had new bikes", "They practised all week", "They were older", "They took a shortcut"], 1, "They practised all week, so they were faster.", "Họ đã tập luyện cả tuần nên nhanh hơn.", m7PassageB],
  ["What did Jack do on Sunday?", ["Went skateboarding", "Read a book about space", "Rode his bike again", "Visited Sam"], 1, "On Sunday, Jack stayed home and read a book about space.", "Chủ nhật, Jack ở nhà và đọc sách về vũ trụ.", m7PassageB],
  ["The new book was ___ than his last book.", ["exciting", "more exciting", "excitingly", "most exciting"], 1, "Comparative form: more exciting than.", "Dạng so sánh hơn: more exciting than.", m7PassageB],
  ["What does Jack want to do next weekend?", ["Go swimming", "Go skateboarding", "Read another book", "Visit his grandparents"], 1, "Jack asks Sam to go skateboarding with him.", "Jack rủ Sam đi trượt ván cùng.", m7PassageB],
  ["I usually ___ my bike on Sundays.", ["ride", "rides", "rode", "riding"], 0, "Present simple for habits: I ride.", "Thì hiện tại đơn cho thói quen: I ride.", ],
  ["Look! The children ___ in the garden now.", ["play", "plays", "are playing", "played"], 2, "'Now' signals present continuous.", "'Now' báo hiệu thì hiện tại tiếp diễn.", ],
  ["Last weekend, we ___ a great film at the cinema.", ["watch", "watched", "watches", "are watching"], 1, "'Last weekend' needs past simple: watched.", "'Last weekend' cần thì quá khứ đơn: watched.", ],
  ["Skating is ___ than walking.", ["fast", "faster", "fastest", "more fast"], 1, "Comparative form for short adjectives: faster.", "Dạng so sánh hơn cho tính từ ngắn: faster.", ],
  ["A game with a board and pieces is called a ___.", ["puzzle", "board game", "video game", "sport"], 1, "This describes a board game.", "Đây là mô tả trò chơi cờ (board game).", ],
];

const m7Ls: Tuple[] = [
  ["What is Lily doing this afternoon?", ["Playing tennis", "Reading a book", "Riding her bike", "Watching TV"], 2, "Lily is riding her bike in the park this afternoon.", "Lily đang đạp xe trong công viên chiều nay.", "Listen: 'This afternoon, Lily is riding her bike in the park.'"],
  ["What did Tom do last weekend?", ["Went camping", "Went fishing", "Went shopping", "Went skating"], 1, "Last weekend Tom went fishing with his uncle.", "Cuối tuần trước Tom đi câu cá với chú.", "Listen: 'Last weekend, Tom went fishing with his uncle by the river.'"],
  ["Which sport does Anna like best?", ["Football", "Swimming", "Tennis", "Basketball"], 2, "Anna likes tennis best of all the sports.", "Anna thích quần vợt nhất trong các môn thể thao.", "Listen: 'Anna plays lots of sports, but she likes tennis best.'"],
  ["What are they going to do on Sunday?", ["Have a picnic", "Go to the cinema", "Visit a museum", "Play video games"], 0, "On Sunday they are going to have a picnic by the lake.", "Chủ nhật họ sẽ đi dã ngoại bên hồ.", "Listen: 'On Sunday, we are going to have a picnic by the lake.'"],
  ["How often does Ben go swimming?", ["Once a week", "Twice a week", "Every day", "Once a month"], 1, "Ben goes swimming twice a week after school.", "Ben đi bơi hai lần một tuần sau giờ học.", "Listen: 'Ben goes swimming twice a week after school.'"],
  ["What is the boy building now?", ["A sandcastle", "A tower of blocks", "A model plane", "A kite"], 1, "He is building a tower of blocks right now.", "Cậu bé đang xây một tháp khối gỗ ngay lúc này.", "Listen: 'Look, he is building a tall tower of blocks right now.'"],
  ["Where did the girls go on Friday evening?", ["To a party", "To the cinema", "To a concert", "To a café"], 1, "On Friday evening they went to the cinema.", "Tối thứ Sáu họ đã đi xem phim.", "Listen: 'On Friday evening, the girls went to the cinema to see a new film.'"],
  ["What does Kate prefer, painting or dancing?", ["Painting", "Dancing", "Both the same", "Neither"], 1, "Kate says dancing is more fun than painting.", "Kate nói khiêu vũ vui hơn vẽ tranh.", "Listen: 'Kate thinks dancing is more fun than painting.'"],
  ["What time does the football match start?", ["Two o'clock", "Three o'clock", "Four o'clock", "Five o'clock"], 2, "The match starts at four o'clock this afternoon.", "Trận đấu bắt đầu lúc bốn giờ chiều nay.", "Listen: 'The football match starts at four o'clock this afternoon.'"],
  ["What is Grandpa teaching the children?", ["Chess", "Cooking", "Painting", "Singing"], 0, "Grandpa is teaching them how to play chess.", "Ông đang dạy các cháu chơi cờ vua.", "Listen: 'Grandpa is teaching us how to play chess this weekend.'"],
];

const movers7: CambridgeMockExam = {
  id: "cambridge-movers-7",
  title: "Movers Mock Test 7 - Weekend & Free Time",
  titleVi: "Đề thi thử Movers 7 - Cuối tuần & Thời gian rảnh",
  level: "movers",
  duration: 30,
  totalQuestions: 25,
  questions: build(m7Rw, m7Ls),
};

/* ===================== MOVERS 8 - Town & Directions ===================== */
const m8PassageA = "Our town is small but very pretty. There is a big park in the middle with a fountain and lots of flowers. Next to the park there is a library and a supermarket. The bus station is bigger than the train station, so more people take the bus. Yesterday I walked from my house to the bookshop, past the bakery and turned left at the bank. It only took ten minutes.";
const m8PassageB = "Excuse me, can you tell me the way to the museum? Go straight along this road, then turn right at the traffic lights. Walk past the post office and the museum is on your left, next to the cinema. It is closer than the swimming pool, so you can walk there in five minutes. There is also a café outside the museum where you can have a drink after your visit.";

const m8Rw: Tuple[] = [
  ["What is in the middle of the town?", ["A supermarket", "A big park", "A bus station", "A school"], 1, "There is a big park with a fountain in the middle.", "Có một công viên lớn với đài phun nước ở giữa thị trấn.", m8PassageA],
  ["What is next to the park?", ["A cinema", "A library and a supermarket", "A bookshop", "A bakery"], 1, "Next to the park there is a library and a supermarket.", "Cạnh công viên có thư viện và siêu thị.", m8PassageA],
  ["Which is bigger, the bus station or the train station?", ["The bus station", "The train station", "They are the same", "Neither"], 0, "The bus station is bigger than the train station.", "Bến xe buýt lớn hơn ga tàu.", m8PassageA],
  ["Where did the writer turn left?", ["At the bakery", "At the bank", "At the library", "At the park"], 1, "The writer turned left at the bank.", "Người viết đã rẽ trái ở ngân hàng.", m8PassageA],
  ["How long did the walk take?", ["Five minutes", "Ten minutes", "Fifteen minutes", "Twenty minutes"], 1, "The walk to the bookshop took ten minutes.", "Đi bộ đến hiệu sách mất mười phút.", m8PassageA],
  ["Where should you turn right?", ["At the museum", "At the traffic lights", "At the post office", "At the cinema"], 1, "You should turn right at the traffic lights.", "Bạn nên rẽ phải ở đèn giao thông.", m8PassageB],
  ["What is next to the museum?", ["A café", "A cinema", "A bank", "A school"], 1, "The museum is next to the cinema.", "Bảo tàng nằm cạnh rạp chiếu phim.", m8PassageB],
  ["The museum is ___ than the swimming pool.", ["far", "closer", "farthest", "close as"], 1, "Comparative: closer than.", "Dạng so sánh hơn: closer than.", m8PassageB],
  ["Where can you have a drink after the museum?", ["At the post office", "At a café outside the museum", "At the cinema", "At the traffic lights"], 1, "There is a café outside the museum for a drink.", "Có một quán cà phê bên ngoài bảo tàng để uống nước.", m8PassageB],
  ["What do you pass before reaching the museum?", ["The bank", "The post office", "The park", "The library"], 1, "You walk past the post office before the museum.", "Bạn đi qua bưu điện trước khi đến bảo tàng.", m8PassageB],
  ["Turn left ___ the corner to find the shop.", ["at", "on", "in", "for"], 0, "'At the corner' is the correct preposition.", "'At the corner' là giới từ đúng.", ],
  ["Look! The bus ___ towards the station now.", ["go", "goes", "is going", "went"], 2, "'Now' signals present continuous.", "'Now' báo hiệu thì hiện tại tiếp diễn.", ],
  ["Yesterday, we ___ to the new shopping centre.", ["go", "goes", "went", "are going"], 2, "'Yesterday' needs past simple: went.", "'Yesterday' cần thì quá khứ đơn: went.", ],
  ["This street is ___ than that one.", ["narrow", "narrower", "narrowest", "more narrow"], 1, "Comparative form: narrower than.", "Dạng so sánh hơn: narrower than.", ],
  ["A place where you borrow books is a ___.", ["bakery", "library", "bank", "station"], 1, "A library is where you borrow books.", "Thư viện là nơi bạn mượn sách.", ],
];

const m8Ls: Tuple[] = [
  ["Where is the bookshop?", ["Next to the bank", "Opposite the park", "Behind the school", "Near the station"], 1, "The bookshop is opposite the park.", "Hiệu sách đối diện với công viên.", "Listen: 'The new bookshop is opposite the park, near the fountain.'"],
  ["How does Lucy usually go to school?", ["By bus", "By bike", "On foot", "By car"], 2, "Lucy usually walks to school every day.", "Lucy thường đi bộ đến trường mỗi ngày.", "Listen: 'Lucy usually walks to school because it is not far.'"],
  ["Where did the family go yesterday?", ["To the museum", "To the supermarket", "To the cinema", "To the zoo"], 1, "Yesterday the family went to the supermarket.", "Hôm qua cả nhà đã đi siêu thị.", "Listen: 'Yesterday, my family went to the supermarket to buy food.'"],
  ["Which building is taller, the school or the town hall?", ["The school", "The town hall", "Same height", "Neither"], 1, "The town hall is taller than the school.", "Tòa thị chính cao hơn trường học.", "Listen: 'The town hall is much taller than the school next to it.'"],
  ["Where should the man turn left?", ["At the bakery", "At the bridge", "At the church", "At the market"], 2, "He should turn left at the church.", "Anh ấy nên rẽ trái ở nhà thờ.", "Listen: 'Go straight, then turn left at the church to find the hotel.'"],
  ["What is happening outside the cinema now?", ["People are queuing", "The cinema is closed", "A film is starting", "It is raining"], 0, "People are queuing outside the cinema right now.", "Mọi người đang xếp hàng bên ngoài rạp chiếu phim.", "Listen: 'Look, lots of people are queuing outside the cinema right now.'"],
  ["Where is the nearest bus stop?", ["Near the school", "Near the bridge", "Near the market", "Near the library"], 3, "The nearest bus stop is near the library.", "Trạm xe buýt gần nhất ở gần thư viện.", "Listen: 'The nearest bus stop is just near the library on Main Street.'"],
  ["What did they build last year in the town?", ["A new bridge", "A new park", "A new school", "A new market"], 1, "Last year the town built a new park.", "Năm ngoái thị trấn đã xây một công viên mới.", "Listen: 'Last year, our town built a lovely new park by the river.'"],
  ["How far is the train station from here?", ["One kilometre", "Two kilometres", "Three kilometres", "Four kilometres"], 1, "The train station is two kilometres away.", "Ga tàu cách đây hai ki-lô-mét.", "Listen: 'The train station is about two kilometres from here.'"],
  ["Which shop is between the bakery and the bank?", ["The toy shop", "The shoe shop", "The bookshop", "The flower shop"], 0, "The toy shop is between the bakery and the bank.", "Cửa hàng đồ chơi nằm giữa tiệm bánh và ngân hàng.", "Listen: 'The toy shop is right between the bakery and the bank.'"],
];

const movers8: CambridgeMockExam = {
  id: "cambridge-movers-8",
  title: "Movers Mock Test 8 - Town & Directions",
  titleVi: "Đề thi thử Movers 8 - Thị trấn & Chỉ đường",
  level: "movers",
  duration: 30,
  totalQuestions: 25,
  questions: build(m8Rw, m8Ls),
};

/* ===================== MOVERS 9 - Food & Restaurants ===================== */
const m9PassageA = "Last Friday, my family went to a new restaurant near our house. My dad ordered chicken with rice, and my mum chose fish with vegetables. I wanted pizza, but the waiter said it was more expensive than pasta, so I chose pasta instead. My little brother always eats ice cream for dessert, and this time he chose chocolate ice cream. The food was delicious, and we are going to visit the restaurant again next month.";
const m9PassageB = "Dear Ellie, Yesterday I helped my grandmother make a cake for my cousin's birthday. We mixed flour, sugar, eggs and butter together. Grandma's cake is always sweeter than the ones from the shop. While the cake was baking, we made some lemonade too. At the party, everyone is going to eat cake and drink lemonade. I can't wait! Love, Sophie";

const m9Rw: Tuple[] = [
  ["What did dad order at the restaurant?", ["Fish with vegetables", "Chicken with rice", "Pizza", "Pasta"], 1, "Dad ordered chicken with rice.", "Bố đã gọi món gà với cơm.", m9PassageA],
  ["Why did the writer choose pasta instead of pizza?", ["Pizza was not tasty", "Pizza was more expensive", "Pasta was faster", "Pizza was finished"], 1, "The waiter said pizza was more expensive than pasta.", "Người phục vụ nói pizza đắt hơn mì pasta.", m9PassageA],
  ["What does the little brother always eat for dessert?", ["Cake", "Fruit", "Ice cream", "Biscuits"], 2, "The little brother always eats ice cream for dessert.", "Em trai luôn ăn kem tráng miệng.", m9PassageA],
  ["What flavour of ice cream did he choose this time?", ["Vanilla", "Strawberry", "Chocolate", "Mango"], 2, "This time he chose chocolate ice cream.", "Lần này em ấy chọn kem sô-cô-la.", m9PassageA],
  ["When are they going to the restaurant again?", ["Next week", "Next month", "Tomorrow", "Next year"], 1, "They are going to visit the restaurant again next month.", "Họ sẽ ghé nhà hàng lần nữa vào tháng sau.", m9PassageA],
  ["What did Sophie help her grandmother make?", ["A pizza", "A cake", "Some soup", "Some bread"], 1, "Sophie helped make a cake for her cousin's birthday.", "Sophie đã giúp làm bánh cho sinh nhật anh họ.", m9PassageB],
  ["Which ingredients did they mix?", ["Flour, sugar, eggs and butter", "Milk and rice", "Fruit and cream", "Cheese and bread"], 0, "They mixed flour, sugar, eggs and butter together.", "Họ trộn bột mì, đường, trứng và bơ với nhau.", m9PassageB],
  ["Grandma's cake is ___ than shop cakes.", ["sweet", "sweeter", "sweetest", "more sweet"], 1, "Comparative form: sweeter than.", "Dạng so sánh hơn: sweeter than.", m9PassageB],
  ["What did they make while the cake was baking?", ["Juice", "Lemonade", "Tea", "Coffee"], 1, "While the cake baked, they made lemonade too.", "Trong lúc bánh nướng, họ cũng làm nước chanh.", m9PassageB],
  ["What are people going to do at the party?", ["Eat cake and drink lemonade", "Play games", "Sing songs", "Watch a film"], 0, "At the party, everyone is going to eat cake and drink lemonade.", "Tại bữa tiệc, mọi người sẽ ăn bánh và uống nước chanh.", m9PassageB],
  ["I usually ___ breakfast at seven o'clock.", ["eat", "eats", "ate", "eating"], 0, "Present simple habit: I eat.", "Thói quen ở thì hiện tại đơn: I eat.", ],
  ["Look! Mum ___ a cake in the kitchen right now.", ["bake", "bakes", "is baking", "baked"], 2, "'Right now' shows present continuous.", "'Right now' cho thấy thì hiện tại tiếp diễn.", ],
  ["Last night, we ___ noodles for dinner.", ["cook", "cooks", "cooked", "are cooking"], 2, "'Last night' needs past simple: cooked.", "'Last night' cần thì quá khứ đơn: cooked.", ],
  ["This soup is ___ than the other one.", ["hot", "hotter", "hottest", "more hot"], 1, "Comparative: hotter than.", "So sánh hơn: hotter than.", ],
  ["A place where you buy bread is called a ___.", ["bakery", "bank", "library", "station"], 0, "A bakery sells bread.", "Tiệm bánh (bakery) bán bánh mì.", ],
];

const m9Ls: Tuple[] = [
  ["What did the family have for lunch?", ["Soup and bread", "Rice and chicken", "Fish and chips", "Pasta and salad"], 1, "They had rice and chicken for lunch.", "Họ ăn cơm và gà cho bữa trưa.", "Listen: 'For lunch today, we had rice and chicken with vegetables.'"],
  ["What is the chef cooking now?", ["Soup", "Pizza", "A cake", "Pasta"], 3, "The chef is cooking pasta right now.", "Đầu bếp đang nấu mì pasta ngay bây giờ.", "Listen: 'Look, the chef is cooking pasta in the big kitchen right now.'"],
  ["What did Ben order at the café yesterday?", ["A sandwich", "A burger", "Some soup", "Fried rice"], 0, "Yesterday Ben ordered a sandwich at the café.", "Hôm qua Ben đã gọi bánh sandwich ở quán cà phê.", "Listen: 'Yesterday, Ben ordered a cheese sandwich at the new café.'"],
  ["Which fruit does she like best?", ["Apples", "Bananas", "Strawberries", "Oranges"], 2, "She likes strawberries best of all the fruit.", "Cô ấy thích dâu tây nhất trong các loại trái cây.", "Listen: 'I like lots of fruit, but strawberries are my favourite.'"],
  ["What time does the restaurant open?", ["Eleven o'clock", "Twelve o'clock", "One o'clock", "Two o'clock"], 1, "The restaurant opens at twelve o'clock every day.", "Nhà hàng mở cửa lúc mười hai giờ mỗi ngày.", "Listen: 'Our restaurant opens at twelve o'clock every day for lunch.'"],
  ["Whose cake is bigger, Amy's or Jack's?", ["Amy's", "Jack's", "The same size", "Neither"], 1, "Jack's cake is bigger than Amy's cake.", "Bánh của Jack lớn hơn bánh của Amy.", "Listen: 'Jack's birthday cake is much bigger than Amy's cake.'"],
  ["What is Dad making for dinner tonight?", ["Curry", "Soup", "Pizza", "Salad"], 2, "Dad is going to make pizza for dinner tonight.", "Bố sẽ làm pizza cho bữa tối nay.", "Listen: 'Tonight, Dad is going to make homemade pizza for dinner.'"],
  ["What did they drink with breakfast?", ["Milk", "Juice", "Water", "Tea"], 1, "They drank orange juice with breakfast.", "Họ uống nước cam cùng bữa sáng.", "Listen: 'This morning, we drank fresh orange juice with our breakfast.'"],
  ["Who baked the biscuits?", ["Grandma", "Mum", "Sister", "Aunt"], 0, "Grandma baked the biscuits yesterday afternoon.", "Bà đã nướng bánh quy vào chiều hôm qua.", "Listen: 'Grandma baked some lovely biscuits yesterday afternoon.'"],
  ["What is the special dish today?", ["Fish soup", "Vegetable soup", "Chicken soup", "Tomato soup"], 2, "Today's special dish is chicken soup.", "Món đặc biệt hôm nay là súp gà.", "Listen: 'Today's special dish in the restaurant is delicious chicken soup.'"],
];

const movers9: CambridgeMockExam = {
  id: "cambridge-movers-9",
  title: "Movers Mock Test 9 - Food & Restaurants",
  titleVi: "Đề thi thử Movers 9 - Đồ ăn & Nhà hàng",
  level: "movers",
  duration: 30,
  totalQuestions: 25,
  questions: build(m9Rw, m9Ls),
};

/* ===================== MOVERS 10 - Weather & Seasons ===================== */
const m10PassageA = "Yesterday it rained all day, so we stayed inside and played games. Today the sun is shining and it is warmer than yesterday, so we are going to the park. My favourite season is summer because the weather is hotter and I can swim in the lake. My sister likes winter better because she loves making snowmen. In autumn, the leaves fall from the trees and it becomes windy and cool.";
const m10PassageB = "Dear diary, This spring has been very wet. Last week it rained every single day, but today it is finally sunny. The flowers in our garden are growing quickly because of all the rain. Mum says spring weather is more changeable than summer weather. Tomorrow we are going to plant new flowers if it doesn't rain. I hope the sun stays out all week!";

const m10Rw: Tuple[] = [
  ["What happened yesterday?", ["It snowed", "It rained all day", "It was sunny", "It was windy"], 1, "Yesterday it rained all day.", "Hôm qua trời mưa cả ngày.", m10PassageA],
  ["What is the weather like today compared to yesterday?", ["Colder", "The same", "Warmer", "Wetter"], 2, "Today is warmer than yesterday.", "Hôm nay ấm hơn hôm qua.", m10PassageA],
  ["Why does the writer like summer best?", ["It is cooler", "The weather is hotter and they can swim", "It snows", "The leaves fall"], 1, "Summer is hotter, and they can swim in the lake.", "Mùa hè nóng hơn và có thể bơi ở hồ.", m10PassageA],
  ["What does the sister love doing in winter?", ["Swimming", "Making snowmen", "Reading books", "Riding bikes"], 1, "The sister loves making snowmen in winter.", "Em gái thích làm người tuyết vào mùa đông.", m10PassageA],
  ["What happens to the leaves in autumn?", ["They grow bigger", "They turn pink", "They fall from the trees", "They stay green"], 2, "In autumn, the leaves fall from the trees.", "Vào mùa thu, lá rụng khỏi cây.", m10PassageA],
  ["How has this spring been?", ["Very dry", "Very wet", "Very hot", "Very cold"], 1, "This spring has been very wet.", "Mùa xuân này rất ẩm ướt.", m10PassageB],
  ["What is the weather like today in the diary?", ["Rainy", "Sunny", "Snowy", "Foggy"], 1, "Today it is finally sunny.", "Hôm nay cuối cùng cũng có nắng.", m10PassageB],
  ["Why are the flowers growing quickly?", ["Because of the sun", "Because of all the rain", "Because of the wind", "Because of the snow"], 1, "The flowers are growing quickly because of all the rain.", "Hoa lớn nhanh vì mưa nhiều.", m10PassageB],
  ["Spring weather is ___ than summer weather.", ["changeable", "more changeable", "changeably", "changed"], 1, "Comparative form: more changeable than.", "Dạng so sánh hơn: more changeable than.", m10PassageB],
  ["What are they going to do tomorrow if it doesn't rain?", ["Go swimming", "Plant new flowers", "Build a snowman", "Fly a kite"], 1, "Tomorrow they are going to plant new flowers.", "Ngày mai họ sẽ trồng hoa mới.", m10PassageB],
  ["It usually ___ a lot in April.", ["rain", "rains", "rained", "raining"], 1, "Present simple third person: rains.", "Thì hiện tại đơn ngôi thứ ba: rains.", ],
  ["Look outside! It ___ heavily right now.", ["snow", "snows", "is snowing", "snowed"], 2, "'Right now' signals present continuous.", "'Right now' báo hiệu thì hiện tại tiếp diễn.", ],
  ["Last winter, it ___ a lot in our town.", ["snow", "snows", "snowed", "is snowing"], 2, "'Last winter' needs past simple: snowed.", "'Last winter' cần thì quá khứ đơn: snowed.", ],
  ["Today is ___ than yesterday.", ["windy", "windier", "windiest", "more windy"], 1, "Comparative: windier than.", "So sánh hơn: windier than.", ],
  ["The season after summer is ___.", ["spring", "autumn", "winter", "monsoon"], 1, "Autumn comes after summer.", "Mùa thu đến sau mùa hè.", ],
];

const m10Ls: Tuple[] = [
  ["What is the weather like today?", ["Sunny", "Rainy", "Snowy", "Windy"], 0, "Today the weather is sunny and warm.", "Hôm nay trời nắng và ấm áp.", "Listen: 'Today the weather is sunny and warm, perfect for a picnic.'"],
  ["What season does Anna like best?", ["Spring", "Summer", "Autumn", "Winter"], 3, "Anna likes winter best because of the snow.", "Anna thích mùa đông nhất vì có tuyết.", "Listen: 'Anna likes winter best because she loves playing in the snow.'"],
  ["What did they do because it rained yesterday?", ["Stayed inside", "Went swimming", "Went to the park", "Rode bikes"], 0, "Because it rained, they stayed inside all day.", "Vì trời mưa nên họ ở trong nhà cả ngày.", "Listen: 'It rained yesterday, so we stayed inside and read books.'"],
  ["Which month is colder, January or July?", ["January", "July", "They are the same", "Neither"], 0, "January is colder than July.", "Tháng Một lạnh hơn tháng Bảy.", "Listen: 'January is much colder than July in our country.'"],
  ["What is happening outside right now?", ["It is snowing", "It is raining", "It is sunny", "It is windy"], 1, "It is raining outside right now.", "Bên ngoài đang mưa ngay bây giờ.", "Listen: 'Look outside, it is raining very hard right now.'"],
  ["What did they build last winter?", ["A sandcastle", "A snowman", "A kite", "A tent"], 1, "Last winter they built a big snowman.", "Mùa đông trước họ đã đắp một người tuyết lớn.", "Listen: 'Last winter, we built a big snowman in the garden.'"],
  ["What should you bring if it is windy?", ["An umbrella", "A jacket", "Sunglasses", "A hat"], 1, "You should bring a jacket if it is windy.", "Bạn nên mang áo khoác nếu trời có gió.", "Listen: 'If it is windy today, remember to bring a warm jacket.'"],
  ["Which season has the most rain here?", ["Spring", "Summer", "Autumn", "Winter"], 0, "Spring has the most rain in this area.", "Mùa xuân có nhiều mưa nhất ở khu vực này.", "Listen: 'In this area, spring has the most rain of all the seasons.'"],
  ["What are the children doing now?", ["Flying a kite", "Building a snowman", "Swimming", "Reading"], 0, "The children are flying a kite in the wind.", "Bọn trẻ đang thả diều trong gió.", "Listen: 'The children are flying a colourful kite in the strong wind.'"],
  ["What is tomorrow's weather forecast?", ["Sunny and hot", "Cold and cloudy", "Rainy and windy", "Snowy and cold"], 2, "Tomorrow will be rainy and windy according to the forecast.", "Dự báo ngày mai sẽ có mưa và gió.", "Listen: 'The forecast says tomorrow will be rainy and windy.'"],
];

const movers10: CambridgeMockExam = {
  id: "cambridge-movers-10",
  title: "Movers Mock Test 10 - Weather & Seasons",
  titleVi: "Đề thi thử Movers 10 - Thời tiết & Mùa",
  level: "movers",
  duration: 30,
  totalQuestions: 25,
  questions: build(m10Rw, m10Ls),
};

export const cambridgeExamsMovers6to10: CambridgeMockExam[] = [
  movers6,
  movers7,
  movers8,
  movers9,
  movers10,
];
