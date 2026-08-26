/**
 * @file cambridgeExamsMovers16to20.ts
 * @description Five Cambridge Movers (A1) mock exams, tests 16 to 20.
 *              Themes: The Market, A Day at the Zoo, Jobs People Do, Holidays
 *              by the Sea, Hobbies & Free Time. Each paper has 15 Reading &
 *              Writing questions and 10 Listening questions with scripts.
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

/* ================== MOVERS 16 - The Market ================== */
const m16pA =
  "Last Saturday Mum and I went to the market near our house. We bought six oranges, a big watermelon and some carrots. The woman in the fruit shop gave me a free apple because I helped Mum carry the bags. The market closes at four o'clock, so we walked home before lunch.";
const m16pB =
  "There is a new shop at the market. It sells bread and cakes. The baker starts work at five o'clock in the morning, when it is still dark. His chocolate cake is famous and it is cheaper than the cake in the supermarket. On Sundays the shop is closed.";

const m16Rw: Tuple[] = [
  ["When did they go to the market?", ["Last Friday", "Last Saturday", "Last Sunday", "Yesterday"], 1, "The text begins 'Last Saturday Mum and I went to the market'.", "Bài đọc nói họ đi chợ vào thứ Bảy tuần trước.", m16pA],
  ["How many oranges did they buy?", ["Four", "Five", "Six", "Seven"], 2, "The text says they bought six oranges.", "Bài đọc nói họ mua sáu quả cam.", m16pA],
  ["Why did the woman give a free apple?", ["It was old", "It was her birthday", "The child helped Mum", "The apple was small"], 2, "The woman gave the apple because the child helped Mum carry the bags.", "Người bán cho quả táo vì bạn ấy giúp mẹ mang túi.", m16pA],
  ["What time does the market close?", ["Two o'clock", "Three o'clock", "Four o'clock", "Five o'clock"], 2, "The text says the market closes at four o'clock.", "Bài đọc nói chợ đóng cửa lúc bốn giờ.", m16pA],
  ["How did they go home?", ["By bus", "By car", "By bike", "They walked"], 3, "The text says they walked home before lunch.", "Bài đọc nói họ đi bộ về nhà.", m16pA],
  ["What does the new shop sell?", ["Fruit", "Bread and cakes", "Toys", "Clothes"], 1, "The new shop sells bread and cakes.", "Cửa hàng mới bán bánh mì và bánh ngọt.", m16pB],
  ["What time does the baker start work?", ["Four o'clock", "Five o'clock", "Six o'clock", "Seven o'clock"], 1, "The baker starts work at five o'clock in the morning.", "Người làm bánh bắt đầu làm việc lúc năm giờ sáng.", m16pB],
  ["The chocolate cake at the market is ___ the supermarket cake.", ["more expensive than", "cheaper than", "the same price as", "bigger than"], 1, "The text says his chocolate cake is cheaper than the supermarket cake.", "Bài đọc nói bánh sô cô la ở chợ rẻ hơn ở siêu thị.", m16pB],
  ["When is the shop closed?", ["On Saturdays", "On Sundays", "On Mondays", "Every evening"], 1, "The text says on Sundays the shop is closed.", "Bài đọc nói cửa hàng đóng cửa vào Chủ nhật.", m16pB],
  ["A person who sells fruit and vegetables works in a ___.", ["hospital", "market", "school", "farm"], 1, "Fruit and vegetables are sold at a market.", "Trái cây và rau được bán ở chợ.", undefined],
  ["We pay for things with ___.", ["money", "water", "paper", "bags"], 0, "We pay with money.", "Chúng ta trả tiền bằng tiền.", undefined],
  ["A watermelon is ___ than an orange.", ["smaller", "bigger", "thinner", "shorter"], 1, "A watermelon is much bigger than an orange.", "Quả dưa hấu to hơn quả cam nhiều.", undefined],
  ["Yesterday I ___ some milk at the shop.", ["buy", "buys", "bought", "buying"], 2, "'Yesterday' needs the past simple form 'bought'.", "Có 'yesterday' nên dùng quá khứ đơn 'bought'.", undefined],
  ["Which one is NOT a vegetable?", ["Carrot", "Potato", "Onion", "Cherry"], 3, "A cherry is a fruit, not a vegetable.", "Quả cherry là trái cây, không phải rau củ.", undefined],
  ["I need a bag to ___ my shopping.", ["carry", "drink", "read", "sing"], 0, "We carry shopping in a bag.", "Chúng ta dùng túi để mang đồ đã mua.", undefined],
];

const m16Ls: Tuple[] = [
  ["What did the girl buy first?", ["Bananas", "Bread", "Cheese", "Milk"], 1, "She says she bought bread first.", "Bạn ấy nói mua bánh mì trước.", "Listen: 'First I bought bread, and after that I looked at the fruit.'"],
  ["How much was the watermelon?", ["Two pounds", "Three pounds", "Four pounds", "Five pounds"], 1, "The speaker says the watermelon was three pounds.", "Người nói cho biết quả dưa hấu giá ba bảng.", "Listen: 'The big watermelon was only three pounds. That is cheap!'"],
  ["Who works in the cake shop?", ["The girl's mum", "Her uncle", "Her aunt", "Her cousin"], 2, "Her aunt works in the cake shop.", "Cô của bạn ấy làm ở tiệm bánh.", "Listen: 'My aunt works in the cake shop at the market.'"],
  ["What did the boy forget to buy?", ["Eggs", "Rice", "Sugar", "Butter"], 2, "He forgot to buy sugar.", "Cậu ấy quên mua đường.", "Listen: 'Oh no, I forgot the sugar. Mum needs it for the cake.'"],
  ["Where is the fish shop?", ["Next to the bakery", "Behind the school", "Near the door", "Opposite the bank"], 3, "The fish shop is opposite the bank.", "Cửa hàng cá đối diện ngân hàng.", "Listen: 'The fish shop is opposite the bank at the market.'"],
  ["What day is the market busiest?", ["Monday", "Wednesday", "Friday", "Saturday"], 3, "The market is busiest on Saturday.", "Chợ đông nhất vào thứ Bảy.", "Listen: 'The market is always busiest on Saturday morning.'"],
  ["What colour bag did Mum choose?", ["Brown", "Green", "Blue", "Black"], 1, "Mum chose the green bag.", "Mẹ chọn cái túi màu xanh lá.", "Listen: 'Mum chose the green bag because it is strong.'"],
  ["How many people were in the queue?", ["Three", "Five", "Seven", "Nine"], 1, "There were five people in the queue.", "Có năm người đứng xếp hàng.", "Listen: 'There were five people in the queue before us.'"],
  ["What will they cook with the carrots?", ["A cake", "Soup", "Bread", "Pizza"], 1, "They will make soup with the carrots.", "Họ sẽ nấu súp với cà rốt.", "Listen: 'We will make carrot soup for dinner tonight.'"],
  ["How did they get to the market?", ["By bus", "By taxi", "By bike", "On foot"], 0, "They went by bus.", "Họ đi chợ bằng xe buýt.", "Listen: 'We took the bus to the market because of the rain.'"],
];

const movers16: CambridgeMockExam = {
  id: "cambridge-movers-16",
  title: "Movers Mock Test 16 - The Market",
  titleVi: "Đề thi thử Movers 16 - Đi chợ",
  level: "movers",
  duration: 30,
  totalQuestions: 25,
  questions: build(m16Rw, m16Ls),
};

/* ================== MOVERS 17 - A Day at the Zoo ================== */
const m17pA =
  "On Tuesday our class went to the zoo by coach. We saw twelve monkeys, two elephants and a very long snake. The monkeys were noisy and they took our teacher's hat! After lunch it started to rain, so we watched the fish inside the aquarium.";
const m17pB =
  "The giraffe is the tallest animal in the zoo. It eats leaves from the top of the trees. Zoo keepers feed the giraffes twice a day, at nine in the morning and at three in the afternoon. Visitors can help feed them on Saturdays.";

const m17Rw: Tuple[] = [
  ["How did the class travel to the zoo?", ["By train", "By coach", "By car", "They walked"], 1, "The text says the class went to the zoo by coach.", "Bài đọc nói cả lớp đi sở thú bằng xe khách.", m17pA],
  ["How many monkeys did they see?", ["Two", "Ten", "Twelve", "Twenty"], 2, "The text says they saw twelve monkeys.", "Bài đọc nói họ thấy mười hai con khỉ.", m17pA],
  ["What did the monkeys take?", ["A bag", "The teacher's hat", "Some bananas", "A camera"], 1, "The monkeys took the teacher's hat.", "Mấy con khỉ lấy chiếc mũ của cô giáo.", m17pA],
  ["What was the weather like after lunch?", ["Sunny", "Windy", "Rainy", "Snowy"], 2, "It started to rain after lunch.", "Sau bữa trưa thì trời bắt đầu mưa.", m17pA],
  ["Where did they go when it rained?", ["Home", "To the aquarium", "To the shop", "To the bus"], 1, "They watched the fish inside the aquarium.", "Họ vào bể cá để xem cá.", m17pA],
  ["Which animal is the tallest?", ["The elephant", "The giraffe", "The snake", "The monkey"], 1, "The text says the giraffe is the tallest animal in the zoo.", "Bài đọc nói hươu cao cổ là con vật cao nhất.", m17pB],
  ["What do giraffes eat?", ["Meat", "Fish", "Leaves", "Bread"], 2, "Giraffes eat leaves from the top of the trees.", "Hươu cao cổ ăn lá trên ngọn cây.", m17pB],
  ["How often do keepers feed the giraffes?", ["Once a day", "Twice a day", "Three times a day", "Every hour"], 1, "The keepers feed them twice a day.", "Người trông thú cho ăn hai lần mỗi ngày.", m17pB],
  ["When can visitors help feed the giraffes?", ["On Mondays", "On Wednesdays", "On Fridays", "On Saturdays"], 3, "Visitors can help feed them on Saturdays.", "Khách có thể giúp cho ăn vào thứ Bảy.", m17pB],
  ["An animal that lives in water is a ___.", ["dolphin", "camel", "lion", "horse"], 0, "A dolphin lives in water.", "Cá heo sống trong nước.", undefined],
  ["Yesterday we ___ to the zoo.", ["go", "went", "goes", "going"], 1, "The past simple of 'go' is 'went'.", "Quá khứ đơn của 'go' là 'went'.", undefined],
  ["An elephant is ___ than a monkey.", ["smaller", "heavier", "shorter", "thinner"], 1, "An elephant is much heavier than a monkey.", "Con voi nặng hơn con khỉ nhiều.", undefined],
  ["Which animal has no legs?", ["Snake", "Zebra", "Tiger", "Bear"], 0, "A snake has no legs.", "Con rắn không có chân.", undefined],
  ["A person who looks after zoo animals is a ___.", ["driver", "keeper", "waiter", "pilot"], 1, "A zoo keeper looks after the animals.", "Người trông thú ở sở thú gọi là keeper.", undefined],
  ["The lion was very ___, so we did not go close.", ["quiet", "kind", "dangerous", "tidy"], 2, "You do not go close to a dangerous animal.", "Bạn không lại gần con vật nguy hiểm.", undefined],
];

const m17Ls: Tuple[] = [
  ["Which animal did the boy like best?", ["The penguins", "The lions", "The bears", "The snakes"], 0, "He liked the penguins best.", "Cậu ấy thích chim cánh cụt nhất.", "Listen: 'I liked the penguins best because they were so funny.'"],
  ["What time did the class arrive?", ["Nine o'clock", "Half past nine", "Ten o'clock", "Half past ten"], 1, "They arrived at half past nine.", "Cả lớp đến lúc chín giờ ba mươi.", "Listen: 'Our coach arrived at the zoo at half past nine.'"],
  ["How many elephants were there?", ["One", "Two", "Three", "Four"], 2, "There were three elephants.", "Có ba con voi.", "Listen: 'In the big field there were three elephants.'"],
  ["What did the girl buy at the zoo shop?", ["A book", "A toy tiger", "A postcard", "An ice cream"], 1, "She bought a toy tiger.", "Bạn ấy mua một con hổ bông.", "Listen: 'At the zoo shop I bought a toy tiger for my brother.'"],
  ["Where did the class have lunch?", ["On the coach", "In the cafe", "Near the lake", "In the classroom"], 2, "They had lunch near the lake.", "Cả lớp ăn trưa gần cái hồ.", "Listen: 'We had our sandwiches on the grass near the lake.'"],
  ["What was the problem with the parrot?", ["It was ill", "It was too loud", "It flew away", "It was asleep"], 1, "The parrot was too loud.", "Con vẹt kêu quá ồn.", "Listen: 'The parrot was so loud that we could not hear the guide.'"],
  ["Who lost a camera?", ["Tom", "Anna", "The teacher", "The guide"], 1, "Anna lost her camera.", "Anna bị mất máy ảnh.", "Listen: 'Anna lost her camera, but we found it near the monkeys.'"],
  ["What will the class do next week?", ["Go to the zoo again", "Write about the trip", "Visit a farm", "Watch a film"], 1, "Next week they will write about the trip.", "Tuần tới cả lớp sẽ viết về chuyến đi.", "Listen: 'Next week you will write a story about our zoo trip.'"],
  ["How long was the snake?", ["One metre", "Two metres", "Three metres", "Four metres"], 2, "The snake was three metres long.", "Con rắn dài ba mét.", "Listen: 'The guide said the snake was three metres long.'"],
  ["Why could they not see the tigers?", ["They were sleeping", "It was too dark", "The cage was closed", "They were eating"], 0, "The tigers were sleeping.", "Mấy con hổ đang ngủ.", "Listen: 'We could not see the tigers well because they were sleeping.'"],
];

const movers17: CambridgeMockExam = {
  id: "cambridge-movers-17",
  title: "Movers Mock Test 17 - A Day at the Zoo",
  titleVi: "Đề thi thử Movers 17 - Một ngày ở sở thú",
  level: "movers",
  duration: 30,
  totalQuestions: 25,
  questions: build(m17Rw, m17Ls),
};

/* ================== MOVERS 18 - Jobs People Do ================== */
const m18pA =
  "My uncle is a farmer. He gets up at half past four and works outside all day with his cows and sheep. In summer he is very busy, but in winter he has more free time. He says the best part of his job is being near animals every day.";
const m18pB =
  "Mrs Green is a nurse at the town hospital. She works three nights every week and helps children who are ill. She wears a blue uniform and always carries a small torch in her pocket. When she was a girl, she wanted to be a pilot.";

const m18Rw: Tuple[] = [
  ["What is the uncle's job?", ["A driver", "A farmer", "A doctor", "A teacher"], 1, "The text says 'My uncle is a farmer'.", "Bài đọc nói chú của bạn ấy là nông dân.", m18pA],
  ["What time does he get up?", ["Four o'clock", "Half past four", "Five o'clock", "Half past five"], 1, "The text says he gets up at half past four.", "Bài đọc nói chú thức dậy lúc bốn giờ ba mươi.", m18pA],
  ["Which animals does he work with?", ["Horses and pigs", "Cows and sheep", "Chickens and ducks", "Goats and dogs"], 1, "He works with his cows and sheep.", "Chú làm việc với bò và cừu.", m18pA],
  ["When does he have more free time?", ["In summer", "In spring", "In winter", "At weekends"], 2, "The text says in winter he has more free time.", "Bài đọc nói mùa đông chú có nhiều thời gian rảnh hơn.", m18pA],
  ["What does he like best about his job?", ["The money", "Being near animals", "Working inside", "Long holidays"], 1, "The best part is being near animals every day.", "Điều chú thích nhất là được gần các con vật.", m18pA],
  ["Where does Mrs Green work?", ["In a school", "In a hospital", "In a shop", "On a farm"], 1, "Mrs Green is a nurse at the town hospital.", "Bà Green làm điều dưỡng ở bệnh viện thành phố.", m18pB],
  ["How many nights a week does she work?", ["Two", "Three", "Four", "Five"], 1, "She works three nights every week.", "Bà làm ba đêm mỗi tuần.", m18pB],
  ["What colour is her uniform?", ["White", "Green", "Blue", "Grey"], 2, "The text says she wears a blue uniform.", "Bài đọc nói bà mặc đồng phục màu xanh dương.", m18pB],
  ["What did she want to be as a girl?", ["A nurse", "A pilot", "A teacher", "A farmer"], 1, "When she was a girl she wanted to be a pilot.", "Khi còn nhỏ bà muốn làm phi công.", m18pB],
  ["A person who flies a plane is a ___.", ["driver", "pilot", "sailor", "guard"], 1, "A pilot flies a plane.", "Phi công là người điều khiển máy bay.", undefined],
  ["A ___ helps us when our tooth hurts.", ["dentist", "waiter", "singer", "farmer"], 0, "A dentist looks after our teeth.", "Nha sĩ chăm sóc răng cho chúng ta.", undefined],
  ["My sister works in a restaurant. She is a ___.", ["nurse", "waitress", "cleaner", "police officer"], 1, "A waitress serves food in a restaurant.", "Phục vụ bàn làm việc trong nhà hàng.", undefined],
  ["My dad ___ in an office every day.", ["work", "works", "working", "worked yesterday only"], 1, "With 'my dad' and 'every day' we use 'works'.", "Với 'my dad' và 'every day' thì dùng 'works'.", undefined],
  ["A person who cuts hair works in a ___.", ["bank", "garage", "hairdresser's", "library"], 2, "A hairdresser cuts hair at a hairdresser's.", "Người cắt tóc làm ở tiệm làm đầu.", undefined],
  ["A nurse carries a torch so she can ___ in the dark.", ["sleep", "see", "sing", "swim"], 1, "A torch helps you see in the dark.", "Cái đèn pin giúp bạn nhìn thấy trong tối.", undefined],
];

const m18Ls: Tuple[] = [
  ["What does the girl want to be?", ["A vet", "A teacher", "A pilot", "A cook"], 0, "She wants to be a vet.", "Bạn ấy muốn làm bác sĩ thú y.", "Listen: 'I love animals, so I want to be a vet one day.'"],
  ["Where does the boy's mum work?", ["In a bank", "In a school", "In a hospital", "In a shop"], 1, "His mum works in a school.", "Mẹ cậu ấy làm việc ở trường học.", "Listen: 'My mum works in a school. She teaches music.'"],
  ["What time does the shop open?", ["Seven o'clock", "Eight o'clock", "Nine o'clock", "Ten o'clock"], 2, "The shop opens at nine o'clock.", "Cửa hàng mở lúc chín giờ.", "Listen: 'Our shop opens at nine o'clock every morning.'"],
  ["Which job is the hardest, the speaker says?", ["Farmer", "Driver", "Doctor", "Cleaner"], 0, "The speaker says being a farmer is the hardest job.", "Người nói cho rằng làm nông dân là việc khó nhất.", "Listen: 'I think the hardest job is farmer. They work all day.'"],
  ["How does the driver get to work?", ["By bus", "By bike", "By train", "On foot"], 1, "The driver goes to work by bike.", "Người lái xe đi làm bằng xe đạp.", "Listen: 'Funny, but the bus driver goes to work by bike.'"],
  ["What does the man carry in his bag?", ["Letters", "Books", "Tools", "Food"], 2, "He carries tools in his bag.", "Ông ấy mang dụng cụ trong túi.", "Listen: 'He carries his tools in a big black bag.'"],
  ["Who works at night?", ["The nurse", "The teacher", "The farmer", "The waiter"], 0, "The nurse works at night.", "Người điều dưỡng làm việc ban đêm.", "Listen: 'My aunt is a nurse and she often works at night.'"],
  ["How many people work in the cafe?", ["Two", "Four", "Six", "Eight"], 1, "Four people work in the cafe.", "Có bốn người làm ở quán cà phê.", "Listen: 'There are four people working in our small cafe.'"],
  ["What did the boy's grandpa do?", ["He was a sailor", "He was a farmer", "He was a doctor", "He was a driver"], 0, "His grandpa was a sailor.", "Ông của cậu ấy từng là thủy thủ.", "Listen: 'My grandpa was a sailor. He sailed to many countries.'"],
  ["What does the girl do after school?", ["She helps in the shop", "She plays tennis", "She reads", "She cooks"], 0, "She helps in the shop after school.", "Sau giờ học bạn ấy giúp việc ở cửa hàng.", "Listen: 'After school I help my parents in their shop.'"],
];

const movers18: CambridgeMockExam = {
  id: "cambridge-movers-18",
  title: "Movers Mock Test 18 - Jobs People Do",
  titleVi: "Đề thi thử Movers 18 - Các nghề nghiệp",
  level: "movers",
  duration: 30,
  totalQuestions: 25,
  questions: build(m18Rw, m18Ls),
};

/* ================== MOVERS 19 - Holidays by the Sea ================== */
const m19pA =
  "Last July my family stayed in a small hotel next to the beach. Every morning we swam in the sea before breakfast. My brother built a huge sandcastle with a bridge. On the last day we found a starfish in a rock pool and put it back in the water.";
const m19pB =
  "The island of Sunny Bay has three beaches. The biggest one has boats you can ride for two pounds. Visitors must not swim after seven in the evening because the water gets cold and dark. There is a small cafe that sells hot fish and chips.";

const m19Rw: Tuple[] = [
  ["When did the family go on holiday?", ["Last June", "Last July", "Last August", "Last winter"], 1, "The text says 'Last July my family stayed in a small hotel'.", "Bài đọc nói tháng Bảy năm ngoái cả nhà đi nghỉ.", m19pA],
  ["Where was the hotel?", ["In the mountains", "Next to the beach", "In a big city", "Near a farm"], 1, "The hotel was next to the beach.", "Khách sạn nằm ngay cạnh bãi biển.", m19pA],
  ["What did they do before breakfast?", ["Read books", "Swam in the sea", "Played tennis", "Walked to town"], 1, "Every morning they swam in the sea before breakfast.", "Mỗi sáng họ đi bơi trước khi ăn sáng.", m19pA],
  ["What did the brother build?", ["A boat", "A sandcastle", "A tent", "A kite"], 1, "His brother built a huge sandcastle with a bridge.", "Em trai xây một lâu đài cát to có cả cây cầu.", m19pA],
  ["What did they do with the starfish?", ["Took it home", "Gave it to a friend", "Put it back in the water", "Left it on the sand"], 2, "They put the starfish back in the water.", "Họ trả con sao biển về lại nước.", m19pA],
  ["How many beaches are on the island?", ["Two", "Three", "Four", "Five"], 1, "The island of Sunny Bay has three beaches.", "Đảo Sunny Bay có ba bãi biển.", m19pB],
  ["How much is a boat ride?", ["One pound", "Two pounds", "Three pounds", "Four pounds"], 1, "A boat ride costs two pounds.", "Đi thuyền có giá hai bảng.", m19pB],
  ["Why must visitors not swim after seven?", ["The beach closes", "The water is cold and dark", "There are no lifeguards", "It is too busy"], 1, "The water gets cold and dark after seven.", "Sau bảy giờ nước lạnh và tối.", m19pB],
  ["What does the cafe sell?", ["Ice cream", "Fish and chips", "Pizza", "Fruit"], 1, "The small cafe sells hot fish and chips.", "Quán nhỏ bán cá và khoai tây chiên nóng.", m19pB],
  ["We use a ___ to dry ourselves after swimming.", ["towel", "spoon", "brush", "hat"], 0, "We dry ourselves with a towel.", "Chúng ta lau khô người bằng khăn.", undefined],
  ["Last summer we ___ to the beach every day.", ["go", "went", "gone", "going"], 1, "'Last summer' needs the past simple 'went'.", "Có 'last summer' nên dùng 'went'.", undefined],
  ["The sea is ___ than the swimming pool.", ["deep", "deeper", "deepest", "more deep"], 1, "For a comparison with 'than' we use 'deeper'.", "So sánh với 'than' thì dùng 'deeper'.", undefined],
  ["A place where boats stop is a ___.", ["harbour", "garage", "station", "library"], 0, "Boats stop in a harbour.", "Thuyền bè đậu ở cảng.", undefined],
  ["We wear ___ to protect our eyes from the sun.", ["gloves", "sunglasses", "boots", "scarves"], 1, "Sunglasses protect our eyes from bright sun.", "Kính râm bảo vệ mắt khỏi ánh nắng.", undefined],
  ["The sand was so hot that we ___ our shoes.", ["removed", "kept on", "washed", "lost"], 1, "If sand is hot, you keep your shoes on to protect your feet.", "Nếu cát nóng thì bạn giữ giày để bảo vệ chân.", undefined],
];

const m19Ls: Tuple[] = [
  ["Where did the girl go last summer?", ["To the mountains", "To the seaside", "To her grandma's", "To a city"], 1, "She went to the seaside.", "Bạn ấy đi biển.", "Listen: 'Last summer we went to the seaside for two weeks.'"],
  ["How long was the journey?", ["Two hours", "Three hours", "Four hours", "Five hours"], 2, "The journey was four hours.", "Chuyến đi mất bốn tiếng.", "Listen: 'The journey by car was four hours. It was long!'"],
  ["What did the boy see in the water?", ["A dolphin", "A shark", "A turtle", "A whale"], 0, "He saw a dolphin.", "Cậu ấy thấy một con cá heo.", "Listen: 'From the boat I saw a dolphin. It jumped twice!'"],
  ["What was the weather like on the last day?", ["Sunny", "Cloudy", "Rainy", "Windy"], 3, "On the last day it was windy.", "Ngày cuối trời nhiều gió.", "Listen: 'On our last day it was very windy, so we flew a kite.'"],
  ["What did they eat at the beach cafe?", ["Pizza", "Ice cream", "Fish", "Chicken"], 1, "They ate ice cream.", "Họ ăn kem.", "Listen: 'At the beach cafe we all had a big ice cream.'"],
  ["Who could not swim?", ["The boy", "His sister", "His mum", "His dad"], 1, "His sister could not swim.", "Em gái cậu ấy không biết bơi.", "Listen: 'My little sister could not swim, so she played in the sand.'"],
  ["What did the girl collect?", ["Shells", "Stones", "Leaves", "Postcards"], 0, "She collected shells.", "Bạn ấy nhặt vỏ ốc.", "Listen: 'I collected twelve beautiful shells on the beach.'"],
  ["Where did the family stay?", ["In a hotel", "In a tent", "In a flat", "On a boat"], 1, "They stayed in a tent.", "Cả nhà ở trong lều.", "Listen: 'We did not stay in a hotel. We slept in a tent.'"],
  ["What time did they get up on holiday?", ["Six o'clock", "Seven o'clock", "Eight o'clock", "Nine o'clock"], 2, "They got up at eight o'clock.", "Họ thức dậy lúc tám giờ.", "Listen: 'On holiday we got up at eight o'clock, not six.'"],
  ["What does the boy want to do next year?", ["Go to the same beach", "Go to the mountains", "Stay at home", "Visit a city"], 0, "He wants to go to the same beach again.", "Cậu ấy muốn quay lại bãi biển đó.", "Listen: 'Next year I want to go to the same beach again.'"],
];

const movers19: CambridgeMockExam = {
  id: "cambridge-movers-19",
  title: "Movers Mock Test 19 - Holidays by the Sea",
  titleVi: "Đề thi thử Movers 19 - Kỳ nghỉ ở biển",
  level: "movers",
  duration: 30,
  totalQuestions: 25,
  questions: build(m19Rw, m19Ls),
};

/* ================== MOVERS 20 - Hobbies & Free Time ================== */
const m20pA =
  "My hobby is drawing. I have a big blue book full of pictures of animals and buildings. I draw for about an hour after my homework. My art teacher put my picture of a dragon on the classroom wall last week and I felt very proud.";
const m20pB =
  "The school music club meets on Thursday afternoon in Room 12. Children can learn the guitar, the drums or the violin. The club is free, but you must bring your own book of songs. Last year the club played a concert for parents in the school hall.";

const m20Rw: Tuple[] = [
  ["What is the child's hobby?", ["Reading", "Drawing", "Singing", "Swimming"], 1, "The text says 'My hobby is drawing'.", "Bài đọc nói sở thích của bạn ấy là vẽ.", m20pA],
  ["What colour is the book of pictures?", ["Red", "Green", "Blue", "Black"], 2, "The text says it is a big blue book.", "Bài đọc nói đó là quyển sổ to màu xanh dương.", m20pA],
  ["When does the child draw?", ["Before school", "After homework", "At lunchtime", "At the weekend only"], 1, "The child draws after homework.", "Bạn ấy vẽ sau khi làm xong bài tập.", m20pA],
  ["What did the teacher put on the wall?", ["A photo", "A dragon picture", "A poster", "A map"], 1, "The teacher put the picture of a dragon on the wall.", "Cô giáo dán bức vẽ con rồng lên tường.", m20pA],
  ["How did the child feel?", ["Sad", "Tired", "Proud", "Angry"], 2, "The child felt very proud.", "Bạn ấy cảm thấy rất tự hào.", m20pA],
  ["When does the music club meet?", ["Monday", "Tuesday", "Thursday", "Friday"], 2, "The club meets on Thursday afternoon.", "Câu lạc bộ họp chiều thứ Năm.", m20pB],
  ["Which instrument can you NOT learn there?", ["The guitar", "The drums", "The violin", "The piano"], 3, "The text lists guitar, drums and violin, but not the piano.", "Bài đọc nêu guitar, trống và violin, không có piano.", m20pB],
  ["How much does the club cost?", ["Nothing", "One pound", "Two pounds", "Five pounds"], 0, "The text says the club is free.", "Bài đọc nói câu lạc bộ miễn phí.", m20pB],
  ["What must children bring?", ["A drum", "Their own song book", "Money", "A friend"], 1, "You must bring your own book of songs.", "Bạn phải mang theo quyển sách bài hát của mình.", m20pB],
  ["A person who collects stamps has a ___.", ["problem", "hobby", "job", "lesson"], 1, "Collecting stamps is a hobby.", "Sưu tập tem là một sở thích.", undefined],
  ["I ___ playing chess with my grandpa.", ["enjoy", "enjoys", "enjoying", "enjoyed tomorrow"], 0, "With 'I' we use 'enjoy'.", "Với 'I' thì dùng 'enjoy'.", undefined],
  ["We play football on a ___.", ["court", "pitch", "pool", "track"], 1, "Football is played on a pitch.", "Bóng đá được chơi trên sân cỏ.", undefined],
  ["Which one is a musical instrument?", ["Violin", "Racket", "Camera", "Board"], 0, "A violin is a musical instrument.", "Đàn violin là một nhạc cụ.", undefined],
  ["He is good ___ playing tennis.", ["in", "at", "on", "of"], 1, "We say 'good at' doing something.", "Chúng ta nói 'good at' khi giỏi việc gì.", undefined],
  ["The concert was in the school ___.", ["hall", "kitchen", "garden shed", "bus"], 0, "Concerts take place in the school hall.", "Buổi biểu diễn diễn ra ở hội trường của trường.", undefined],
];

const m20Ls: Tuple[] = [
  ["What is the boy's favourite hobby?", ["Fishing", "Cooking", "Photography", "Chess"], 2, "He says photography is his favourite hobby.", "Cậu ấy nói nhiếp ảnh là sở thích yêu thích.", "Listen: 'My favourite hobby is photography. I take photos of birds.'"],
  ["How often does the girl practise the piano?", ["Every day", "Twice a week", "Once a week", "At weekends"], 1, "She practises twice a week.", "Bạn ấy tập hai lần mỗi tuần.", "Listen: 'I practise the piano twice a week after school.'"],
  ["Where is the chess club?", ["In the hall", "In the library", "In Room 12", "In the gym"], 1, "The chess club is in the library.", "Câu lạc bộ cờ ở thư viện.", "Listen: 'The chess club meets in the library at lunchtime.'"],
  ["What did the boy get for his birthday?", ["A camera", "A guitar", "A bike", "A game"], 1, "He got a guitar.", "Cậu ấy được tặng cây đàn guitar.", "Listen: 'For my birthday I got a guitar from my parents.'"],
  ["How many children are in the dance club?", ["Ten", "Fifteen", "Twenty", "Thirty"], 2, "There are twenty children in the dance club.", "Câu lạc bộ nhảy có hai mươi bạn.", "Listen: 'Twenty children come to the dance club every week.'"],
  ["Which day is the swimming club?", ["Monday", "Tuesday", "Wednesday", "Friday"], 3, "The swimming club is on Friday.", "Câu lạc bộ bơi vào thứ Sáu.", "Listen: 'Don't forget the swimming club on Friday afternoon.'"],
  ["What does the girl read most?", ["Comics", "Stories about animals", "Newspapers", "Poems"], 1, "She reads stories about animals most.", "Bạn ấy đọc nhiều truyện về động vật nhất.", "Listen: 'I read a lot, but I like stories about animals best.'"],
  ["What is the problem with the club today?", ["The teacher is ill", "The room is closed", "It is raining", "There is no music"], 0, "The teacher is ill, so the club cannot happen.", "Cô giáo bị ốm nên câu lạc bộ không họp.", "Listen: 'Sorry, the club is not on today because the teacher is ill.'"],
  ["What will they do at the concert?", ["Sing and play", "Dance", "Act a play", "Show photos"], 0, "They will sing and play at the concert.", "Các bạn sẽ hát và chơi nhạc ở buổi diễn.", "Listen: 'At the concert we will sing and play our new songs.'"],
  ["How long does the club last?", ["Half an hour", "One hour", "Two hours", "Three hours"], 1, "The club lasts one hour.", "Câu lạc bộ diễn ra một tiếng.", "Listen: 'The club starts at four and finishes at five.'"],
];

const movers20: CambridgeMockExam = {
  id: "cambridge-movers-20",
  title: "Movers Mock Test 20 - Hobbies & Free Time",
  titleVi: "Đề thi thử Movers 20 - Sở thích & Thời gian rảnh",
  level: "movers",
  duration: 30,
  totalQuestions: 25,
  questions: build(m20Rw, m20Ls),
};

export const cambridgeExamsMovers16to20: CambridgeMockExam[] = [
  movers16,
  movers17,
  movers18,
  movers19,
  movers20,
];
