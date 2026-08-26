/**
 * @file cambridgeExamsStarters16to20.ts
 * @description Five Cambridge Starters (Pre-A1) mock exams, tests 16 to 20.
 *              Themes: Food & Meals, Weather & Seasons, My Family, School
 *              Things, Sports & My Body. Each paper has 15 Reading & Writing
 *              questions (two short reading groups plus standalone items) and
 *              10 Listening questions with full scripts.
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

/* ================== STARTERS 16 - Food & Meals ================== */
const s16pA =
  "It is breakfast time. I eat bread and an egg. I drink milk. My sister eats rice. She drinks orange juice. Mum makes a big cake for us. The cake is on the white table.";
const s16pB =
  "We have lunch at school at twelve o'clock. Today we eat chicken and rice with beans. My friend Tom likes fish. After lunch we eat an apple or a banana. We do not eat sweets at school.";

const s16Rw: Tuple[] = [
  ["What does the boy eat for breakfast?", ["Rice and fish", "Bread and an egg", "Cake and sweets", "Chicken and beans"], 1, "The text says 'I eat bread and an egg' for breakfast.", "Bài đọc nói cậu bé ăn bánh mì và một quả trứng.", s16pA],
  ["What does the boy drink?", ["Water", "Tea", "Milk", "Juice"], 2, "The text says 'I drink milk' at breakfast time.", "Bài đọc nói cậu bé uống sữa.", s16pA],
  ["What does his sister eat?", ["Rice", "Bread", "Cake", "An egg"], 0, "The text says 'My sister eats rice' at breakfast.", "Bài đọc nói em gái ăn cơm.", s16pA],
  ["Who makes the cake?", ["Dad", "Mum", "The sister", "The teacher"], 1, "The text says 'Mum makes a big cake for us'.", "Bài đọc nói mẹ làm bánh cho họ.", s16pA],
  ["What colour is the table?", ["Brown", "Green", "White", "Blue"], 2, "The text says the cake is on the white table.", "Bài đọc nói bàn màu trắng.", s16pA],
  ["What time is lunch at school?", ["Ten o'clock", "Eleven o'clock", "Twelve o'clock", "One o'clock"], 2, "The text says they have lunch at twelve o'clock.", "Bài đọc nói họ ăn trưa lúc mười hai giờ.", s16pB],
  ["What do the children eat today?", ["Chicken and rice", "Bread and jam", "Soup and bread", "Eggs and cheese"], 0, "The text says today they eat chicken and rice with beans.", "Bài đọc nói hôm nay họ ăn gà với cơm và đậu.", s16pB],
  ["What does Tom like?", ["Beans", "Fish", "Cake", "Milk"], 1, "The text says 'My friend Tom likes fish'.", "Bài đọc nói bạn Tom thích cá.", s16pB],
  ["What do they eat after lunch?", ["Sweets", "Ice cream", "Fruit", "Chocolate"], 2, "They eat an apple or a banana, so they eat fruit.", "Họ ăn táo hoặc chuối, tức là ăn trái cây.", s16pB],
  ["Bananas are ___.", ["blue", "yellow", "black", "grey"], 1, "Bananas are yellow when they are ready to eat.", "Chuối có màu vàng khi chín.", undefined],
  ["We drink ___ .", ["a chair", "water", "a book", "a shoe"], 1, "Water is a drink; the other words are not food or drink.", "Nước là thức uống, các từ khác không phải.", undefined],
  ["Which one is a vegetable?", ["Apple", "Carrot", "Cake", "Milk"], 1, "A carrot is a vegetable; an apple is a fruit.", "Cà rốt là rau củ, còn táo là trái cây.", undefined],
  ["I am hungry. I want some ___.", ["soap", "food", "socks", "paper"], 1, "When you are hungry you want food to eat.", "Khi đói thì bạn muốn ăn thức ăn.", undefined],
  ["We eat soup with a ___.", ["fork", "spoon", "cup", "plate"], 1, "We use a spoon to eat soup.", "Chúng ta dùng thìa để ăn súp.", undefined],
  ["Ice cream is ___.", ["hot", "cold", "dry", "loud"], 1, "Ice cream is cold because it is frozen.", "Kem thì lạnh vì được làm đông.", undefined],
];

const s16Ls: Tuple[] = [
  ["What does the girl want to drink?", ["Milk", "Water", "Juice", "Tea"], 2, "She asks for orange juice, please.", "Bạn ấy xin nước cam.", "Listen: 'Can I have some orange juice, please?'"],
  ["How many eggs are there?", ["Two", "Three", "Four", "Five"], 1, "The speaker says there are three eggs.", "Người nói cho biết có ba quả trứng.", "Listen: 'Look in the box. There are three eggs.'"],
  ["What is Mum cooking?", ["Fish", "Rice", "Soup", "Cake"], 2, "Mum is cooking soup for dinner.", "Mẹ đang nấu súp cho bữa tối.", "Listen: 'Mum is cooking soup for dinner tonight.'"],
  ["Where is the bread?", ["On the table", "In the bag", "Under the chair", "In the car"], 1, "The speaker says the bread is in the bag.", "Người nói cho biết bánh mì ở trong túi.", "Listen: 'The bread is in the bag on the floor.'"],
  ["What fruit does the boy like best?", ["Apples", "Bananas", "Grapes", "Oranges"], 3, "He says oranges are his favourite fruit.", "Cậu bé nói cam là trái cây yêu thích.", "Listen: 'I like fruit. Oranges are my favourite.'"],
  ["What colour is the cup?", ["Red", "Green", "Blue", "Pink"], 0, "The speaker says the cup is red.", "Người nói cho biết cái cốc màu đỏ.", "Listen: 'Give me the red cup, please, not the blue one.'"],
  ["Who is in the kitchen?", ["Mum", "Dad", "Grandma", "The dog"], 1, "Dad is in the kitchen making lunch.", "Bố đang ở trong bếp làm bữa trưa.", "Listen: 'Dad is in the kitchen. He is making lunch.'"],
  ["What does the girl eat at school?", ["A sandwich", "A cake", "An egg", "Some fish"], 0, "She eats a sandwich at school every day.", "Bạn ấy ăn bánh sandwich ở trường mỗi ngày.", "Listen: 'Every day I eat a sandwich at school.'"],
  ["How many apples does the boy want?", ["One", "Two", "Three", "Six"], 1, "He asks for two apples.", "Cậu bé xin hai quả táo.", "Listen: 'Can I have two apples for my lunch box?'"],
  ["What is on the plate?", ["Rice", "Chicken", "Cheese", "Bananas"], 2, "The speaker says there is cheese on the plate.", "Người nói cho biết trên đĩa có phô mai.", "Listen: 'There is cheese on the plate for you.'"],
];

const starters16: CambridgeMockExam = {
  id: "cambridge-starters-16",
  title: "Starters Mock Test 16 - Food & Meals",
  titleVi: "Đề thi thử Starters 16 - Đồ ăn & Bữa ăn",
  level: "starters",
  duration: 20,
  totalQuestions: 25,
  questions: build(s16Rw, s16Ls),
};

/* ================== STARTERS 17 - Weather & Seasons ================== */
const s17pA =
  "Today it is sunny and hot. The sky is blue. I wear my hat and my green shorts. My dog Ben sits under the big tree. We drink cold water in the garden.";
const s17pB =
  "In winter it is cold here. Sometimes we see snow on the street. I wear a red coat, a hat and gloves. My brother has black boots. We make a big snowman with my friends.";

const s17Rw: Tuple[] = [
  ["What is the weather like today?", ["Rainy", "Sunny and hot", "Cold", "Windy"], 1, "The text says today it is sunny and hot.", "Bài đọc nói hôm nay trời nắng và nóng.", s17pA],
  ["What colour is the sky?", ["Grey", "Blue", "Black", "Pink"], 1, "The text says the sky is blue.", "Bài đọc nói bầu trời màu xanh.", s17pA],
  ["What does the girl wear?", ["A coat", "A hat and shorts", "Boots", "Gloves"], 1, "She wears her hat and her green shorts.", "Bạn ấy mặc mũ và quần đùi màu xanh.", s17pA],
  ["Where does the dog sit?", ["In the house", "Under the tree", "On the bed", "In the car"], 1, "The dog Ben sits under the big tree.", "Con chó Ben ngồi dưới cây to.", s17pA],
  ["What do they drink?", ["Hot tea", "Cold water", "Milk", "Juice"], 1, "They drink cold water in the garden.", "Họ uống nước lạnh trong vườn.", s17pA],
  ["What is the weather like in winter?", ["Hot", "Cold", "Sunny", "Dry"], 1, "The text says in winter it is cold here.", "Bài đọc nói mùa đông ở đây trời lạnh.", s17pB],
  ["What colour is the coat?", ["Red", "Blue", "Green", "White"], 0, "The text says 'I wear a red coat'.", "Bài đọc nói bạn ấy mặc áo khoác màu đỏ.", s17pB],
  ["What has the brother got?", ["A hat", "Gloves", "Black boots", "A kite"], 2, "The text says his brother has black boots.", "Bài đọc nói em trai có đôi bốt màu đen.", s17pB],
  ["What do the children make?", ["A cake", "A snowman", "A house", "A boat"], 1, "They make a big snowman with their friends.", "Các bạn ấy làm một người tuyết to.", s17pB],
  ["When it rains, I take my ___.", ["kite", "umbrella", "ball", "book"], 1, "We take an umbrella when it rains.", "Khi mưa thì chúng ta mang theo cái dù.", undefined],
  ["The sun is ___.", ["cold", "hot", "wet", "small"], 1, "The sun is hot and gives us light.", "Mặt trời thì nóng và cho chúng ta ánh sáng.", undefined],
  ["Snow is ___.", ["white", "green", "brown", "orange"], 0, "Snow is white and cold.", "Tuyết có màu trắng và lạnh.", undefined],
  ["In summer we go to the ___.", ["snow", "beach", "school", "fire"], 1, "In hot summer weather many people go to the beach.", "Vào mùa hè nóng, nhiều người đi biển.", undefined],
  ["Which one is a season?", ["Monday", "Autumn", "Blue", "Nine"], 1, "Autumn is a season; Monday is a day.", "Mùa thu là một mùa, còn thứ Hai là ngày.", undefined],
  ["It is windy. My kite can ___.", ["fly", "eat", "sleep", "swim"], 0, "A kite flies when the wind is strong.", "Cái diều bay lên khi có gió mạnh.", undefined],
];

const s17Ls: Tuple[] = [
  ["What is the weather like?", ["Sunny", "Rainy", "Snowy", "Windy"], 1, "The speaker says it is raining now.", "Người nói cho biết bây giờ đang mưa.", "Listen: 'It is raining now. Take your umbrella!'"],
  ["What does the girl wear today?", ["A coat", "Shorts", "Boots", "Gloves"], 0, "She wears her warm coat because it is cold.", "Bạn ấy mặc áo khoác ấm vì trời lạnh.", "Listen: 'It is cold, so I wear my warm coat.'"],
  ["Where are the children playing?", ["In the park", "At school", "In the snow", "On the beach"], 2, "They are playing in the snow.", "Các bạn ấy đang chơi trong tuyết.", "Listen: 'The children are playing in the snow today.'"],
  ["What season does the boy like?", ["Winter", "Spring", "Summer", "Autumn"], 2, "He says summer is his favourite season.", "Cậu bé nói mùa hè là mùa yêu thích.", "Listen: 'My favourite season is summer. I can swim!'"],
  ["What colour is the umbrella?", ["Red", "Yellow", "Green", "Black"], 1, "The speaker says the umbrella is yellow.", "Người nói cho biết cái dù màu vàng.", "Listen: 'Look at my yellow umbrella. It is new!'"],
  ["How many clouds can the girl see?", ["Two", "Three", "Four", "Five"], 0, "She can see two big clouds.", "Bạn ấy thấy hai đám mây to.", "Listen: 'I can see two big clouds in the sky.'"],
  ["What is under the tree?", ["A dog", "A cat", "A bike", "A ball"], 1, "The speaker says the cat is under the tree.", "Người nói cho biết con mèo ở dưới cây.", "Listen: 'The cat is under the tree. It is hot today.'"],
  ["What does the family do on a hot day?", ["Swim", "Ski", "Sleep", "Read"], 0, "On a hot day the family goes swimming.", "Vào ngày nóng, cả nhà đi bơi.", "Listen: 'On hot days my family goes swimming in the lake.'"],
  ["What is the boy's hat like?", ["Big and blue", "Small and red", "Long and green", "New and black"], 0, "He says his hat is big and blue.", "Cậu ấy nói mũ của mình to và màu xanh.", "Listen: 'My hat is big and blue. I like it a lot.'"],
  ["When do they make a snowman?", ["In summer", "In spring", "In winter", "In autumn"], 2, "They make a snowman in winter.", "Họ làm người tuyết vào mùa đông.", "Listen: 'In winter we always make a snowman.'"],
];

const starters17: CambridgeMockExam = {
  id: "cambridge-starters-17",
  title: "Starters Mock Test 17 - Weather & Seasons",
  titleVi: "Đề thi thử Starters 17 - Thời tiết & Các mùa",
  level: "starters",
  duration: 20,
  totalQuestions: 25,
  questions: build(s17Rw, s17Ls),
};

/* ================== STARTERS 18 - My Family ================== */
const s18pA =
  "This is my family. My dad is tall and he has short hair. My mum has long hair. I have one brother. He is six. We have a big cat. Her name is Mimi and she is grey.";
const s18pB =
  "On Sunday my family is at home. Grandma reads a book on the sofa. Grandpa is in the garden with the flowers. My sister plays the piano. I help mum wash the blue car.";

const s18Rw: Tuple[] = [
  ["What is the dad like?", ["Short", "Tall", "Small", "Old"], 1, "The text says 'My dad is tall'.", "Bài đọc nói bố cao.", s18pA],
  ["Who has long hair?", ["Dad", "Mum", "The brother", "The cat"], 1, "The text says 'My mum has long hair'.", "Bài đọc nói mẹ có tóc dài.", s18pA],
  ["How old is the brother?", ["Four", "Five", "Six", "Seven"], 2, "The text says the brother is six.", "Bài đọc nói em trai sáu tuổi.", s18pA],
  ["What is the cat's name?", ["Mimi", "Ben", "Rex", "Lily"], 0, "The cat's name is Mimi.", "Con mèo tên là Mimi.", s18pA],
  ["What colour is the cat?", ["Black", "White", "Grey", "Brown"], 2, "The text says the cat is grey.", "Bài đọc nói con mèo màu xám.", s18pA],
  ["What day is it in the second text?", ["Monday", "Friday", "Saturday", "Sunday"], 3, "The text says 'On Sunday my family is at home'.", "Bài đọc nói vào Chủ nhật cả nhà ở nhà.", s18pB],
  ["Where is Grandma?", ["On the sofa", "In the garden", "In the car", "At school"], 0, "Grandma reads a book on the sofa.", "Bà đọc sách trên ghế sofa.", s18pB],
  ["What does Grandpa do?", ["He cooks", "He is in the garden", "He sleeps", "He drives"], 1, "Grandpa is in the garden with the flowers.", "Ông ở trong vườn với những bông hoa.", s18pB],
  ["What does the sister play?", ["Football", "The piano", "The guitar", "A game"], 1, "The text says his sister plays the piano.", "Bài đọc nói em gái chơi đàn piano.", s18pB],
  ["My mother's mother is my ___.", ["aunt", "grandma", "sister", "cousin"], 1, "Your mother's mother is your grandmother.", "Mẹ của mẹ bạn là bà của bạn.", undefined],
  ["My dad's son is my ___.", ["brother", "uncle", "father", "friend"], 0, "Your dad's son is your brother.", "Con trai của bố bạn là anh hoặc em trai bạn.", undefined],
  ["We sleep in the ___.", ["kitchen", "bedroom", "garden", "shop"], 1, "We sleep in the bedroom.", "Chúng ta ngủ trong phòng ngủ.", undefined],
  ["Baby sister is very ___.", ["small", "tall", "long", "old"], 0, "A baby is very small.", "Em bé thì rất nhỏ.", undefined],
  ["Which word is a person?", ["Table", "Uncle", "Apple", "Bus"], 1, "An uncle is a person in your family.", "Chú hoặc bác là một người trong gia đình.", undefined],
  ["We wash the car with ___.", ["sand", "water", "milk", "paper"], 1, "We wash a car with water.", "Chúng ta rửa xe bằng nước.", undefined],
];

const s18Ls: Tuple[] = [
  ["How many brothers has the girl got?", ["One", "Two", "Three", "Four"], 1, "She says she has two brothers.", "Bạn ấy nói mình có hai anh trai.", "Listen: 'I have two brothers and no sisters.'"],
  ["Where is Mum now?", ["At home", "At the shop", "In the park", "At school"], 1, "Mum is at the shop.", "Mẹ đang ở cửa hàng.", "Listen: 'Mum is at the shop. She buys some bread.'"],
  ["What is Dad doing?", ["Reading", "Cooking", "Sleeping", "Driving"], 3, "Dad is driving the car.", "Bố đang lái xe.", "Listen: 'Dad is driving the car to Grandma's house.'"],
  ["How old is Grandpa?", ["Sixty", "Seventy", "Eighty", "Ninety"], 2, "Grandpa is eighty years old.", "Ông tám mươi tuổi.", "Listen: 'My grandpa is eighty years old today.'"],
  ["Who has a new bike?", ["The boy", "His sister", "His mum", "His cousin"], 1, "His sister has a new bike.", "Em gái cậu ấy có xe đạp mới.", "Listen: 'My sister has a new bike. It is purple.'"],
  ["What colour is Mum's dress?", ["Green", "Red", "White", "Yellow"], 0, "Mum's dress is green.", "Váy của mẹ màu xanh lá.", "Listen: 'Mum is wearing her green dress today.'"],
  ["Where does the family eat dinner?", ["In the kitchen", "In the garden", "In the car", "At school"], 1, "They eat dinner in the garden.", "Cả nhà ăn tối trong vườn.", "Listen: 'Tonight we eat dinner in the garden.'"],
  ["What is the baby's name?", ["Tom", "Anna", "Ben", "Sue"], 1, "The baby's name is Anna.", "Em bé tên là Anna.", "Listen: 'Our baby is very small. Her name is Anna.'"],
  ["What does Grandma give the children?", ["Cake", "Books", "Toys", "Shoes"], 0, "Grandma gives them cake.", "Bà cho các bạn ấy bánh.", "Listen: 'Grandma gives us cake every Sunday.'"],
  ["Who is in the photo?", ["All the family", "Only Dad", "Only the cat", "Two friends"], 0, "The speaker says all the family is in the photo.", "Người nói cho biết cả gia đình ở trong ảnh.", "Listen: 'In this photo you can see all my family.'"],
];

const starters18: CambridgeMockExam = {
  id: "cambridge-starters-18",
  title: "Starters Mock Test 18 - My Family",
  titleVi: "Đề thi thử Starters 18 - Gia đình của em",
  level: "starters",
  duration: 20,
  totalQuestions: 25,
  questions: build(s18Rw, s18Ls),
};

/* ================== STARTERS 19 - School Things ================== */
const s19pA =
  "My school bag is orange. In my bag I have four books, two pencils and a red pen. My ruler is long. I do not have a rubber today. My bag is very heavy.";
const s19pB =
  "Our classroom is big. There are twelve chairs and six tables. The board is white. My teacher, Miss Kate, has a blue box with pencils in it. We sing a song every morning.";

const s19Rw: Tuple[] = [
  ["What colour is the school bag?", ["Orange", "Green", "Black", "Pink"], 0, "The text says 'My school bag is orange'.", "Bài đọc nói cặp sách màu cam.", s19pA],
  ["How many books are in the bag?", ["Two", "Three", "Four", "Five"], 2, "The text says there are four books.", "Bài đọc nói có bốn quyển sách.", s19pA],
  ["What colour is the pen?", ["Blue", "Red", "Black", "Green"], 1, "The text says 'a red pen'.", "Bài đọc nói cái bút màu đỏ.", s19pA],
  ["What is the ruler like?", ["Short", "Long", "Small", "Round"], 1, "The text says 'My ruler is long'.", "Bài đọc nói cái thước dài.", s19pA],
  ["What does the child NOT have today?", ["A pen", "A ruler", "A rubber", "A book"], 2, "The text says 'I do not have a rubber today'.", "Bài đọc nói hôm nay bạn ấy không có cục gôm.", s19pA],
  ["How many chairs are in the classroom?", ["Six", "Ten", "Twelve", "Twenty"], 2, "The text says there are twelve chairs.", "Bài đọc nói có mười hai cái ghế.", s19pB],
  ["How many tables are there?", ["Four", "Five", "Six", "Seven"], 2, "The text says there are six tables.", "Bài đọc nói có sáu cái bàn.", s19pB],
  ["What colour is the board?", ["Black", "White", "Green", "Brown"], 1, "The text says the board is white.", "Bài đọc nói cái bảng màu trắng.", s19pB],
  ["What do the children do every morning?", ["Sing a song", "Play football", "Watch TV", "Eat cake"], 0, "The text says they sing a song every morning.", "Bài đọc nói mỗi sáng các bạn hát một bài.", s19pB],
  ["We write with a ___.", ["spoon", "pencil", "cup", "hat"], 1, "We write with a pencil or a pen.", "Chúng ta viết bằng bút chì hoặc bút mực.", undefined],
  ["We read a ___.", ["book", "shoe", "door", "cake"], 0, "We read a book.", "Chúng ta đọc sách.", undefined],
  ["Which one is in a classroom?", ["A board", "A bath", "A bed", "A boat"], 0, "A board is in a classroom.", "Cái bảng có trong lớp học.", undefined],
  ["My teacher's name is ___ Kate.", ["Miss", "Cat", "Red", "Ten"], 0, "We say Miss before a teacher's name.", "Chúng ta nói Miss trước tên của cô giáo.", undefined],
  ["We put our books in a ___.", ["bag", "cup", "sock", "spoon"], 0, "We put books in a bag.", "Chúng ta cất sách vào cặp.", undefined],
  ["Ten plus five is ___.", ["twelve", "fifteen", "sixteen", "twenty"], 1, "10 + 5 = 15 (fifteen).", "10 cộng 5 bằng 15.", undefined],
];

const s19Ls: Tuple[] = [
  ["What does the girl need?", ["A pen", "A ruler", "A rubber", "A book"], 2, "She asks for a rubber.", "Bạn ấy xin một cục gôm.", "Listen: 'Can I have a rubber, please? My pencil is fine.'"],
  ["How many pencils has the boy got?", ["Three", "Four", "Five", "Six"], 0, "He says he has three pencils.", "Cậu ấy nói mình có ba cây bút chì.", "Listen: 'I have three pencils in my school bag.'"],
  ["Where is the teacher?", ["In the classroom", "In the garden", "At home", "On the bus"], 0, "The teacher is in the classroom.", "Cô giáo ở trong lớp học.", "Listen: 'Miss Kate is in the classroom with the children.'"],
  ["What colour is the new book?", ["Red", "Green", "Blue", "Yellow"], 1, "The new book is green.", "Quyển sách mới màu xanh lá.", "Listen: 'My new book is green with a big star on it.'"],
  ["What is on the table?", ["A bag", "A ball", "A box", "A bike"], 2, "There is a box on the table.", "Trên bàn có một cái hộp.", "Listen: 'There is a box of pencils on the table.'"],
  ["What lesson do they have now?", ["Music", "Maths", "Art", "Sport"], 1, "They have a maths lesson now.", "Bây giờ các bạn học môn toán.", "Listen: 'Now we have our maths lesson. Open your books.'"],
  ["How does the boy go to school?", ["By bus", "By car", "By bike", "He walks"], 3, "He walks to school.", "Cậu ấy đi bộ đến trường.", "Listen: 'I walk to school with my sister every day.'"],
  ["What time does school start?", ["Seven o'clock", "Eight o'clock", "Nine o'clock", "Ten o'clock"], 1, "School starts at eight o'clock.", "Trường học bắt đầu lúc tám giờ.", "Listen: 'Our school starts at eight o'clock in the morning.'"],
  ["Who has the ball?", ["Tom", "Anna", "The teacher", "Nobody"], 1, "Anna has the ball.", "Anna đang giữ quả bóng.", "Listen: 'Anna has the ball. Let's play in the playground.'"],
  ["What does the girl draw?", ["A house", "A cat", "A tree", "A car"], 2, "She draws a big tree.", "Bạn ấy vẽ một cái cây to.", "Listen: 'In my art lesson I draw a big tree.'"],
];

const starters19: CambridgeMockExam = {
  id: "cambridge-starters-19",
  title: "Starters Mock Test 19 - School Things",
  titleVi: "Đề thi thử Starters 19 - Đồ dùng học tập",
  level: "starters",
  duration: 20,
  totalQuestions: 25,
  questions: build(s19Rw, s19Ls),
};

/* ================== STARTERS 20 - Sports & My Body ================== */
const s20pA =
  "I like sport. On Monday I play football with my friends. On Friday I swim in the pool. My favourite ball is white and black. I run fast but my friend Sam runs faster.";
const s20pB =
  "Look at this funny monster. It has three eyes and one big nose. Its arms are long and its legs are short. It has purple hair. It has two feet and ten toes. It can jump very high.";

const s20Rw: Tuple[] = [
  ["What does the child do on Monday?", ["Swim", "Play football", "Run", "Ride a bike"], 1, "The text says on Monday the child plays football.", "Bài đọc nói thứ Hai bạn ấy chơi bóng đá.", s20pA],
  ["When does the child swim?", ["On Monday", "On Friday", "On Sunday", "Every day"], 1, "The text says 'On Friday I swim in the pool'.", "Bài đọc nói thứ Sáu bạn ấy đi bơi.", s20pA],
  ["What colour is the favourite ball?", ["Red and blue", "White and black", "Green", "Yellow"], 1, "The text says the ball is white and black.", "Bài đọc nói quả bóng màu trắng và đen.", s20pA],
  ["Who runs faster?", ["The child", "Sam", "The teacher", "Nobody"], 1, "The text says Sam runs faster.", "Bài đọc nói Sam chạy nhanh hơn.", s20pA],
  ["Where does the child swim?", ["In the sea", "In the pool", "In the river", "In the lake"], 1, "The text says 'I swim in the pool'.", "Bài đọc nói bạn ấy bơi ở hồ bơi.", s20pA],
  ["How many eyes has the monster got?", ["One", "Two", "Three", "Four"], 2, "The text says the monster has three eyes.", "Bài đọc nói con quái vật có ba con mắt.", s20pB],
  ["What are the monster's arms like?", ["Short", "Long", "Small", "Fat"], 1, "The text says its arms are long.", "Bài đọc nói tay của nó dài.", s20pB],
  ["What colour is the monster's hair?", ["Green", "Purple", "Orange", "Grey"], 1, "The text says it has purple hair.", "Bài đọc nói nó có mái tóc màu tím.", s20pB],
  ["How many toes has the monster got?", ["Five", "Eight", "Ten", "Twelve"], 2, "The text says it has ten toes.", "Bài đọc nói nó có mười ngón chân.", s20pB],
  ["We hear with our ___.", ["eyes", "ears", "nose", "hands"], 1, "We hear with our ears.", "Chúng ta nghe bằng tai.", undefined],
  ["We see with our ___.", ["eyes", "feet", "mouth", "arms"], 0, "We see with our eyes.", "Chúng ta nhìn bằng mắt.", undefined],
  ["In football we kick the ball with our ___.", ["hands", "head", "feet", "ears"], 2, "In football players kick the ball with their feet.", "Trong bóng đá, người ta sút bóng bằng chân.", undefined],
  ["I am tired. I want to ___.", ["run", "sit down", "jump", "shout"], 1, "When you are tired you want to sit down and rest.", "Khi mệt thì bạn muốn ngồi xuống nghỉ.", undefined],
  ["Which one is a sport?", ["Tennis", "Table", "Toast", "Tree"], 0, "Tennis is a sport.", "Quần vợt là một môn thể thao.", undefined],
  ["We swim in the ___.", ["bed", "water", "car", "box"], 1, "We swim in water.", "Chúng ta bơi trong nước.", undefined],
];

const s20Ls: Tuple[] = [
  ["What sport does the boy like?", ["Football", "Tennis", "Basketball", "Swimming"], 1, "He says he likes tennis best.", "Cậu ấy nói mình thích quần vợt nhất.", "Listen: 'I like tennis best. I play with my dad.'"],
  ["Where is the girl's ball?", ["In the box", "Under the bed", "In the garden", "At school"], 1, "Her ball is under the bed.", "Quả bóng của bạn ấy ở dưới giường.", "Listen: 'My ball is under the bed with my shoes.'"],
  ["How many children play in the park?", ["Four", "Five", "Six", "Seven"], 2, "Six children play in the park.", "Có sáu bạn chơi trong công viên.", "Listen: 'Six children play football in the park today.'"],
  ["What colour are the boy's trainers?", ["White", "Blue", "Black", "Red"], 3, "His trainers are red.", "Đôi giày thể thao của cậu ấy màu đỏ.", "Listen: 'Look at my red trainers. They are for running.'"],
  ["What can the girl do very well?", ["Swim", "Jump", "Run", "Ride"], 0, "She can swim very well.", "Bạn ấy bơi rất giỏi.", "Listen: 'I can swim very well. I go to the pool on Fridays.'"],
  ["Which part of the body hurts?", ["A leg", "An arm", "The head", "A foot"], 1, "The speaker says his arm hurts.", "Người nói cho biết cánh tay bị đau.", "Listen: 'Oh no, my arm hurts. I cannot play now.'"],
  ["When is the swimming lesson?", ["On Monday", "On Wednesday", "On Friday", "On Sunday"], 1, "The swimming lesson is on Wednesday.", "Buổi học bơi vào thứ Tư.", "Listen: 'Our swimming lesson is on Wednesday morning.'"],
  ["What does the boy take to the park?", ["A kite", "A bike", "A ball", "A book"], 2, "He takes a ball to the park.", "Cậu ấy mang quả bóng ra công viên.", "Listen: 'I take my new ball to the park with me.'"],
  ["Who wins the game?", ["Tom", "Anna", "Sam", "Nobody"], 2, "Sam wins the game.", "Sam thắng ván đấu.", "Listen: 'Sam is the winner. He plays very well today.'"],
  ["How high can the girl jump?", ["Not very high", "Very high", "One metre", "She cannot jump"], 1, "She says she can jump very high.", "Bạn ấy nói mình nhảy rất cao.", "Listen: 'Watch me! I can jump very high.'"],
];

const starters20: CambridgeMockExam = {
  id: "cambridge-starters-20",
  title: "Starters Mock Test 20 - Sports & My Body",
  titleVi: "Đề thi thử Starters 20 - Thể thao & Cơ thể",
  level: "starters",
  duration: 20,
  totalQuestions: 25,
  questions: build(s20Rw, s20Ls),
};

export const cambridgeExamsStarters16to20: CambridgeMockExam[] = [
  starters16,
  starters17,
  starters18,
  starters19,
  starters20,
];
