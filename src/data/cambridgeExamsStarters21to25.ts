/**
 * @file cambridgeExamsStarters21to25.ts
 * @description Five Cambridge Starters (Pre-A1) mock exams, tests 21 to 25.
 *              Themes: Toys & Games, Clothes, Pets & Farm Animals, My House,
 *              Colours & Numbers Party. Each paper has 15 Reading & Writing
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

/* ================== STARTERS 21 - Toys & Games ================== */
const s21pA =
  "This is my toy box. It is blue and very big. In the box there is a red car, a small plane and two balls. My teddy bear is not in the box. He sleeps on my bed with me.";
const s21pB =
  "On Sunday my friends come to my house. We play with my train. Anna likes the doll and Ben likes the kite. We play in the garden. After the games we drink milk and eat cake.";

const s21Rw: Tuple[] = [
  ["What colour is the box for the toys?", ["Red", "Blue", "Green", "Yellow"], 1, "The text says the toy box is blue and very big.", "Bài đọc nói hộp đồ chơi màu xanh dương và rất to.", s21pA],
  ["What is in the box?", ["A car, a plane and two balls", "A bike and a kite", "Books and pens", "A cat and a dog"], 0, "The box has a red car, a small plane and two balls.", "Trong hộp có ô tô đỏ, máy bay nhỏ và hai quả bóng.", s21pA],
  ["Where does the teddy bear sleep?", ["In the box", "On the bed", "Under the table", "At school"], 1, "The teddy bear sleeps on the bed, not in the box.", "Gấu bông ngủ trên giường chứ không ở trong hộp.", s21pA],
  ["Which toy in the box is red?", ["Red", "White", "Black", "Pink"], 0, "The text says there is a red car.", "Bài đọc nói có một chiếc ô tô màu đỏ.", s21pA],
  ["How many balls are in the toy box?", ["One", "Two", "Three", "Four"], 1, "The text says there are two balls.", "Bài đọc nói có hai quả bóng.", s21pA],
  ["When do the friends come?", ["On Monday", "On Friday", "On Saturday", "On Sunday"], 3, "The friends come on Sunday.", "Các bạn đến vào Chủ nhật.", s21pB],
  ["What does Anna like?", ["The train", "The doll", "The kite", "The ball"], 1, "The text says Anna likes the doll.", "Bài đọc nói Anna thích búp bê.", s21pB],
  ["What does Ben like?", ["The kite", "The doll", "The car", "The bear"], 0, "The text says Ben likes the kite.", "Bài đọc nói Ben thích con diều.", s21pB],
  ["Where do they play?", ["In the kitchen", "In the garden", "At school", "In the car"], 1, "They play in the garden.", "Các bạn chơi ngoài vườn.", s21pB],
  ["What do they eat after the games?", ["Rice", "Cake", "Fish", "Soup"], 1, "After the games they eat cake.", "Sau khi chơi các bạn ăn bánh.", s21pB],
  ["A ___ flies in the sky.", ["kite", "chair", "spoon", "sock"], 0, "A kite flies in the sky.", "Con diều bay trên trời.", undefined],
  ["We play football with a ___.", ["book", "ball", "bed", "box"], 1, "We play football with a ball.", "Chúng ta chơi bóng đá với quả bóng.", undefined],
  ["My bike has two ___.", ["wheels", "windows", "doors", "hands"], 0, "A bike has two wheels.", "Xe đạp có hai bánh.", undefined],
  ["I ___ with my toys every day.", ["play", "plays", "playing", "played tomorrow"], 0, "With 'I' the present simple is 'play'.", "Với 'I' thì hiện tại đơn là 'play'.", undefined],
  ["Which one is a toy?", ["A robot", "A carrot", "A window", "A shoe"], 0, "A robot is a toy.", "Rô-bốt là một món đồ chơi.", undefined],
];

const s21Ls: Tuple[] = [
  ["What toy does the girl want?", ["A doll", "A ball", "A bike", "A train"], 0, "She wants a doll for her birthday.", "Bạn ấy muốn một con búp bê cho sinh nhật.", "Girl: 'For my birthday I want a doll, please.'"],
  ["How many cars has the boy got?", ["Two", "Three", "Four", "Five"], 2, "He has got four cars.", "Cậu ấy có bốn chiếc ô tô.", "Boy: 'I have got four small cars in my bag.'"],
  ["What colour is the kite?", ["Green", "Yellow", "Purple", "Orange"], 1, "The kite is yellow.", "Con diều màu vàng.", "Boy: 'Look at my yellow kite! It is very high.'"],
  ["Where is the teddy bear?", ["Under the chair", "On the bed", "In the box", "Behind the door"], 0, "The bear is under the chair.", "Con gấu ở dưới ghế.", "Girl: 'My teddy bear is under the chair again.'"],
  ["Who plays with the train?", ["Sam", "Anna", "Dad", "Grandma"], 0, "Sam plays with the train.", "Sam chơi với đoàn tàu.", "Woman: 'Sam is playing with the train in his room.'"],
  ["What game do they play?", ["Hide and seek", "Football", "Chess", "Cards"], 0, "They play hide and seek.", "Các bạn chơi trốn tìm.", "Boy: 'Come on, let's play hide and seek in the garden!'"],
  ["When does the party start?", ["At two o'clock", "At three o'clock", "At four o'clock", "At five o'clock"], 1, "The party starts at three o'clock.", "Bữa tiệc bắt đầu lúc ba giờ.", "Woman: 'The party starts at three o'clock, so come early.'"],
  ["What is in the blue bag?", ["Books", "Toys", "Food", "Clothes"], 1, "There are toys in the blue bag.", "Trong túi xanh có đồ chơi.", "Man: 'All the toys are in the blue bag, not in the box.'"],
  ["Who has got a new bike?", ["Tom", "Lily", "Ben", "Kim"], 1, "Lily has got a new bike.", "Lily có xe đạp mới.", "Boy: 'Lily has got a new bike. It is red and very fast.'"],
  ["Where do the children play?", ["In the park", "In the kitchen", "At the shop", "On the bus"], 0, "The children play in the park.", "Các bạn nhỏ chơi trong công viên.", "Woman: 'The children are playing in the park with a ball.'"],
];

const starters21: CambridgeMockExam = {
  id: "cambridge-starters-21",
  title: "Starters Mock Test 21 - Toys & Games",
  titleVi: "Đề thi thử Starters 21 - Đồ chơi & Trò chơi",
  level: "starters",
  duration: 20,
  totalQuestions: 25,
  questions: build(s21Rw, s21Ls),
};

/* ================== STARTERS 22 - Clothes ================== */
const s22pA =
  "Today it is cold. I wear my green coat and a long scarf. My hat is grey and my boots are black. My sister wears a pink jacket. She does not like hats.";
const s22pB =
  "In summer we go to the beach. I wear shorts and a white T-shirt. My mother wears a blue dress and a big hat. We do not wear shoes on the sand. We swim in the sea.";

const s22Rw: Tuple[] = [
  ["What colour is the writer's coat?", ["Green", "Blue", "Brown", "Red"], 0, "The text says the coat is green.", "Bài đọc nói áo khoác màu xanh lá.", s22pA],
  ["What colour is the hat?", ["Black", "Grey", "Pink", "White"], 1, "The hat is grey.", "Chiếc mũ màu xám.", s22pA],
  ["What does the sister wear?", ["A pink jacket", "A green coat", "Black boots", "A scarf"], 0, "The sister wears a pink jacket.", "Em gái mặc áo khoác hồng.", s22pA],
  ["What does the sister not like?", ["Boots", "Hats", "Coats", "Scarves"], 1, "She does not like hats.", "Bạn ấy không thích mũ.", s22pA],
  ["Why does the writer need warm clothes?", ["It is hot", "It is cold", "It is sunny", "It is windy"], 1, "The first sentence says it is cold today.", "Câu đầu nói hôm nay trời lạnh.", s22pA],
  ["Where do they go in summer?", ["To the beach", "To school", "To the zoo", "To the shop"], 0, "In summer they go to the beach.", "Mùa hè họ đi biển.", s22pB],
  ["What does the boy wear?", ["A coat", "Shorts and a T-shirt", "Boots", "A dress"], 1, "He wears shorts and a white T-shirt.", "Cậu ấy mặc quần short và áo phông trắng.", s22pB],
  ["What colour is the mother's dress?", ["Blue", "Pink", "Green", "Yellow"], 0, "The mother wears a blue dress.", "Mẹ mặc váy màu xanh dương.", s22pB],
  ["What do they not wear on the sand?", ["Hats", "Shoes", "Shorts", "T-shirts"], 1, "They do not wear shoes on the sand.", "Họ không đi giày trên cát.", s22pB],
  ["Where do they swim?", ["In a pool", "In the sea", "In a lake", "In the river"], 1, "They swim in the sea.", "Họ bơi ở biển.", s22pB],
  ["We wear ___ on our feet.", ["gloves", "socks", "hats", "belts"], 1, "Socks go on our feet.", "Tất được đi ở chân.", undefined],
  ["When it rains I take my ___.", ["umbrella", "spoon", "pencil", "pillow"], 0, "An umbrella keeps the rain off.", "Cái dù giúp che mưa.", undefined],
  ["These trousers are ___ for me. I need a bigger size.", ["small", "smalls", "smaller than nothing", "the small"], 0, "The correct adjective is 'small'.", "Tính từ đúng là 'small'.", undefined],
  ["I ___ a jumper because it is cold.", ["wear", "wears", "wearing", "to wear"], 0, "With 'I' we use 'wear'.", "Với 'I' dùng 'wear'.", undefined],
  ["Which one is clothes?", ["A shirt", "A table", "A duck", "A cup"], 0, "A shirt is a piece of clothing.", "Áo sơ mi là quần áo.", undefined],
];

const s22Ls: Tuple[] = [
  ["What is the girl wearing?", ["A red skirt", "A blue skirt", "Green shorts", "A black dress"], 1, "She is wearing a blue skirt.", "Bạn ấy mặc váy màu xanh dương.", "Girl: 'Today I am wearing my blue skirt and white shoes.'"],
  ["What does the boy need?", ["A coat", "A hat", "Gloves", "Boots"], 2, "He needs gloves because his hands are cold.", "Cậu ấy cần găng tay vì tay lạnh.", "Boy: 'My hands are cold. I need my gloves.'"],
  ["How many T-shirts are in the bag?", ["Two", "Three", "Four", "Six"], 1, "There are three T-shirts.", "Có ba chiếc áo phông.", "Woman: 'Put three T-shirts in the bag for the trip.'"],
  ["Where are the shoes?", ["By the door", "Under the bed", "In the car", "On the chair"], 0, "The shoes are by the door.", "Đôi giày ở cạnh cửa.", "Man: 'Your shoes are by the door, next to mine.'"],
  ["What colour is the new jacket?", ["Orange", "Purple", "Grey", "Yellow"], 0, "The new jacket is orange.", "Áo khoác mới màu cam.", "Girl: 'Look! My new jacket is orange.'"],
  ["What is the weather like?", ["Hot", "Rainy", "Snowy", "Windy"], 1, "It is rainy, so they take a coat.", "Trời mưa nên phải mang áo mưa.", "Woman: 'It is raining. Take your rain coat with you.'"],
  ["Who has got a big hat?", ["Grandma", "Dad", "The teacher", "The baby"], 0, "Grandma has got a big hat.", "Bà có chiếc mũ to.", "Boy: 'Grandma has got a big hat for the sun.'"],
  ["What does the girl want to buy?", ["Socks", "A scarf", "Shoes", "A belt"], 1, "She wants to buy a scarf.", "Bạn ấy muốn mua khăn quàng.", "Girl: 'I want to buy a warm scarf for winter.'"],
  ["What is on the bed?", ["A skirt", "A jumper", "A towel", "A book"], 1, "A jumper is on the bed.", "Chiếc áo len ở trên giường.", "Man: 'Your green jumper is on the bed.'"],
  ["When do they go shopping?", ["On Monday", "On Wednesday", "On Saturday", "On Sunday"], 2, "They go shopping on Saturday.", "Họ đi mua sắm vào thứ Bảy.", "Woman: 'We go shopping for clothes on Saturday morning.'"],
];

const starters22: CambridgeMockExam = {
  id: "cambridge-starters-22",
  title: "Starters Mock Test 22 - Clothes",
  titleVi: "Đề thi thử Starters 22 - Quần áo",
  level: "starters",
  duration: 20,
  totalQuestions: 25,
  questions: build(s22Rw, s22Ls),
};

/* ================== STARTERS 23 - Pets & Farm Animals ================== */
const s23pA =
  "I have got a small pet. It is a rabbit. Its name is Snow because it is white. Snow eats carrots and green leaves. It lives in a box in the garden. I give it water every morning.";
const s23pB =
  "My uncle has a farm. There are ten cows and six sheep. The horse is brown and very big. In the morning the birds sing. I like the baby goats best because they run and jump.";

const s23Rw: Tuple[] = [
  ["What pet has the child got?", ["A cat", "A rabbit", "A dog", "A bird"], 1, "The pet is a rabbit.", "Con vật nuôi là một chú thỏ.", s23pA],
  ["Why is the pet called Snow?", ["It is cold", "It is white", "It is fast", "It is small"], 1, "Its name is Snow because it is white.", "Nó tên Snow vì nó màu trắng.", s23pA],
  ["What does Snow eat?", ["Fish", "Meat", "Carrots and leaves", "Bread"], 2, "Snow eats carrots and green leaves.", "Snow ăn cà rốt và lá xanh.", s23pA],
  ["Where does Snow live?", ["In the house", "In a box in the garden", "In a tree", "At school"], 1, "Snow lives in a box in the garden.", "Snow sống trong một cái hộp ngoài vườn.", s23pA],
  ["When does the child give water?", ["Every morning", "Every night", "On Sunday", "Never"], 0, "The child gives water every morning.", "Bạn nhỏ cho uống nước mỗi sáng.", s23pA],
  ["How many cows are there?", ["Six", "Eight", "Ten", "Twelve"], 2, "There are ten cows.", "Có mười con bò.", s23pB],
  ["How many sheep are there?", ["Four", "Five", "Six", "Seven"], 2, "There are six sheep.", "Có sáu con cừu.", s23pB],
  ["What colour is the horse?", ["Black", "Brown", "White", "Grey"], 1, "The horse is brown.", "Con ngựa màu nâu.", s23pB],
  ["What do the birds do in the morning?", ["Sleep", "Sing", "Swim", "Eat grass"], 1, "In the morning the birds sing.", "Buổi sáng những chú chim hót.", s23pB],
  ["Which animals does the child like best?", ["The cows", "The sheep", "The baby goats", "The horse"], 2, "The child likes the baby goats best.", "Bạn nhỏ thích những chú dê con nhất.", s23pB],
  ["A ___ says 'miaow'.", ["cat", "cow", "duck", "frog"], 0, "A cat says 'miaow'.", "Con mèo kêu 'meo meo'.", undefined],
  ["Fish live in ___.", ["trees", "water", "beds", "cars"], 1, "Fish live in water.", "Cá sống dưới nước.", undefined],
  ["A baby dog is a ___.", ["puppy", "kitten", "lamb", "chick"], 0, "A baby dog is a puppy.", "Chó con gọi là puppy.", undefined],
  ["My cat ___ milk every day.", ["drink", "drinks", "drinking", "to drink"], 1, "'My cat' is singular, so we use 'drinks'.", "'My cat' số ít nên dùng 'drinks'.", undefined],
  ["Which of these animals has wings?", ["A bird", "A pig", "A fish", "A cow"], 0, "A bird can fly.", "Con chim có thể bay.", undefined],
];

const s23Ls: Tuple[] = [
  ["What pet has the boy got?", ["A dog", "A cat", "A fish", "A bird"], 2, "He has got a fish.", "Cậu ấy nuôi một con cá.", "Boy: 'I have got a small fish. Its name is Bubble.'"],
  ["How many kittens are there?", ["Two", "Three", "Four", "Five"], 1, "There are three kittens.", "Có ba chú mèo con.", "Woman: 'Our cat has got three little kittens.'"],
  ["What colour is the dog?", ["Black", "White", "Brown", "Grey"], 0, "The dog is black.", "Con chó màu đen.", "Girl: 'My dog is black with one white foot.'"],
  ["Where is the rabbit?", ["Under the tree", "In the box", "On the chair", "In the kitchen"], 0, "The rabbit is under the tree.", "Chú thỏ ở dưới gốc cây.", "Boy: 'Look, the rabbit is under the tree!'"],
  ["What does the horse eat?", ["Meat", "Grass", "Bread", "Rice"], 1, "The horse eats grass.", "Con ngựa ăn cỏ.", "Man: 'The horse is eating grass in the field.'"],
  ["Who feeds the birds?", ["Grandpa", "Mum", "The teacher", "Tom"], 0, "Grandpa feeds the birds.", "Ông cho chim ăn.", "Girl: 'Grandpa gives the birds bread every morning.'"],
  ["What animal is noisy at night?", ["A frog", "A cow", "A sheep", "A duck"], 0, "The frog is noisy at night.", "Con ếch kêu ồn vào ban đêm.", "Boy: 'The frogs are very noisy at night near the water.'"],
  ["How many ducks are on the water?", ["Five", "Seven", "Eight", "Nine"], 1, "There are seven ducks.", "Có bảy con vịt.", "Woman: 'Count the ducks. There are seven on the water.'"],
  ["What is the pet's name?", ["Coco", "Milo", "Snow", "Bella"], 2, "The pet's name is Snow.", "Con vật nuôi tên là Snow.", "Girl: 'My white rabbit is called Snow.'"],
  ["Where do the cows sleep?", ["In the house", "In the field", "In a big shed", "Under a tree"], 2, "The cows sleep in a big shed.", "Đàn bò ngủ trong chuồng lớn.", "Man: 'At night the cows sleep in the big shed.'"],
];

const starters23: CambridgeMockExam = {
  id: "cambridge-starters-23",
  title: "Starters Mock Test 23 - Pets & Farm Animals",
  titleVi: "Đề thi thử Starters 23 - Thú cưng & Vật nuôi",
  level: "starters",
  duration: 20,
  totalQuestions: 25,
  questions: build(s23Rw, s23Ls),
};

/* ================== STARTERS 24 - My House ================== */
const s24pA =
  "My house is small but nice. There are four rooms. My bedroom is blue and there are two beds in it. The kitchen is next to the living room. We eat dinner at the big brown table.";
const s24pB =
  "Behind our house there is a little garden. There are five trees and many flowers. My father grows tomatoes. On sunny days we sit under the tree and read books there.";

const s24Rw: Tuple[] = [
  ["How many rooms are there?", ["Three", "Four", "Five", "Six"], 1, "The text says there are four rooms.", "Bài đọc nói có bốn phòng.", s24pA],
  ["What colour is the bedroom?", ["Green", "Blue", "White", "Pink"], 1, "The bedroom is blue.", "Phòng ngủ màu xanh dương.", s24pA],
  ["How many beds are in the bedroom?", ["One", "Two", "Three", "Four"], 1, "There are two beds.", "Có hai chiếc giường.", s24pA],
  ["Where is the kitchen?", ["Next to the living room", "Upstairs", "In the garden", "Behind the school"], 0, "The kitchen is next to the living room.", "Bếp nằm cạnh phòng khách.", s24pA],
  ["What is the dinner table like?", ["Big and brown", "Small and white", "Round and black", "New and red"], 0, "They eat dinner at the big brown table.", "Họ ăn tối ở chiếc bàn gỗ to màu nâu.", s24pA],
  ["Where is the garden?", ["In front of the house", "Behind the house", "Next to the school", "On the roof"], 1, "The garden is behind the house.", "Khu vườn ở phía sau nhà.", s24pB],
  ["How many trees are there?", ["Three", "Four", "Five", "Ten"], 2, "There are five trees.", "Có năm cái cây.", s24pB],
  ["What does the father grow?", ["Rice", "Tomatoes", "Apples", "Carrots"], 1, "The father grows tomatoes.", "Bố trồng cà chua.", s24pB],
  ["What do they do under the tree?", ["Cook", "Read books", "Sleep", "Wash the car"], 1, "They sit under the tree and read books.", "Họ ngồi dưới gốc cây và đọc sách.", s24pB],
  ["When do they sit in the garden?", ["On rainy days", "On sunny days", "At midnight", "In winter only"], 1, "They sit outside on sunny days.", "Họ ngồi ngoài vườn vào những ngày nắng.", s24pB],
  ["Mum makes dinner in the ___.", ["kitchen", "bathroom", "bedroom", "garage"], 0, "We cook in the kitchen.", "Chúng ta nấu ăn trong bếp.", undefined],
  ["After the garden, I wash my hands in the ___.", ["bathroom", "garden", "car", "shop"], 0, "We wash our hands in the bathroom.", "Chúng ta rửa tay trong phòng tắm.", undefined],
  ["The cat is ___ the sofa.", ["on", "of", "at", "to"], 0, "We use 'on' for a surface like a sofa.", "Dùng 'on' với bề mặt như ghế sofa.", undefined],
  ["There ___ two windows in my room.", ["is", "are", "am", "be"], 1, "'Two windows' is plural, so we use 'are'.", "'Two windows' số nhiều nên dùng 'are'.", undefined],
  ["We sleep in a ___.", ["bed", "bath", "bowl", "bus"], 0, "We sleep in a bed.", "Chúng ta ngủ trên giường.", undefined],
];

const s24Ls: Tuple[] = [
  ["Where is the girl's book?", ["On the sofa", "Under the bed", "In the kitchen", "On the desk"], 3, "Her book is on the desk.", "Cuốn sách của bạn ấy ở trên bàn học.", "Girl: 'My book is on the desk in my bedroom.'"],
  ["How many chairs are in the kitchen?", ["Two", "Four", "Five", "Six"], 1, "There are four chairs.", "Có bốn chiếc ghế.", "Woman: 'We have four chairs around the kitchen table.'"],
  ["What colour is the door?", ["Green", "Red", "Blue", "Yellow"], 0, "The door is green.", "Cánh cửa màu xanh lá.", "Boy: 'Our front door is green, not blue.'"],
  ["Where is the cat sleeping?", ["On the bed", "Under the table", "On the sofa", "In the box"], 2, "The cat sleeps on the sofa.", "Con mèo ngủ trên ghế sofa.", "Man: 'The cat is sleeping on the sofa again.'"],
  ["What is in the living room?", ["A TV", "A bath", "A cooker", "A bike"], 0, "There is a TV in the living room.", "Trong phòng khách có một chiếc tivi.", "Girl: 'There is a big TV in our living room.'"],
  ["Who is in the garden?", ["Mum", "Dad", "Grandma", "The baby"], 1, "Dad is in the garden.", "Bố đang ở ngoài vườn.", "Woman: 'Dad is in the garden with the flowers.'"],
  ["What is the boy doing?", ["Cooking", "Cleaning his room", "Watching TV", "Sleeping"], 1, "The boy is cleaning his room.", "Cậu bé đang dọn phòng.", "Boy: 'I am cleaning my room before lunch.'"],
  ["Where are the keys?", ["On the table", "In the bag", "By the door", "In the car"], 1, "The keys are in the bag.", "Chìa khóa ở trong túi xách.", "Man: 'The keys are in my bag, not on the table.'"],
  ["How many windows are there?", ["Two", "Three", "Four", "Five"], 2, "There are four windows.", "Có bốn cửa sổ.", "Girl: 'My room has four windows, so it is very bright.'"],
  ["What is under the stairs?", ["Shoes", "Books", "A bike", "A cat"], 2, "There is a bike under the stairs.", "Dưới cầu thang có một chiếc xe đạp.", "Boy: 'We keep my bike under the stairs.'"],
];

const starters24: CambridgeMockExam = {
  id: "cambridge-starters-24",
  title: "Starters Mock Test 24 - My House",
  titleVi: "Đề thi thử Starters 24 - Ngôi nhà của em",
  level: "starters",
  duration: 20,
  totalQuestions: 25,
  questions: build(s24Rw, s24Ls),
};

/* ================== STARTERS 25 - Colours & Numbers Party ================== */
const s25pA =
  "Today is my birthday party. I am eight years old. There are eight candles on the cake. The cake is white with red strawberries. My friends give me a green box with a book in it.";
const s25pB =
  "We play games at the party. First we sing a song. Then we play with balloons. There are twelve balloons: six blue, four yellow and two pink. Everybody gets a small toy at the end.";

const s25Rw: Tuple[] = [
  ["How old is the child today?", ["Six", "Seven", "Eight", "Nine"], 2, "The child is eight years old.", "Bạn nhỏ tròn tám tuổi.", s25pA],
  ["How many candles does the cake have?", ["Six", "Seven", "Eight", "Ten"], 2, "There are eight candles, one for each year.", "Có tám cây nến, mỗi cây một tuổi.", s25pA],
  ["What colour is the cake?", ["Brown", "White", "Yellow", "Pink"], 1, "The cake is white with red strawberries.", "Bánh màu trắng với dâu đỏ.", s25pA],
  ["What is on the cake?", ["Strawberries", "Bananas", "Chocolate", "Nuts"], 0, "There are red strawberries on the cake.", "Trên bánh có dâu tây đỏ.", s25pA],
  ["What is in the green box?", ["A toy car", "A book", "Sweets", "A ball"], 1, "There is a book in the green box.", "Trong hộp xanh có một cuốn sách.", s25pA],
  ["What do they do first?", ["Play with balloons", "Sing a song", "Eat the cake", "Open presents"], 1, "First they sing a song.", "Đầu tiên các bạn hát một bài.", s25pB],
  ["How many balloons are there?", ["Ten", "Eleven", "Twelve", "Fourteen"], 2, "There are twelve balloons in total.", "Tổng cộng có mười hai quả bóng bay.", s25pB],
  ["How many blue balloons are there?", ["Four", "Five", "Six", "Two"], 2, "There are six blue balloons.", "Có sáu quả bóng màu xanh dương.", s25pB],
  ["How many pink balloons are there?", ["One", "Two", "Three", "Four"], 1, "There are two pink balloons.", "Có hai quả bóng màu hồng.", s25pB],
  ["What does everybody get at the end?", ["A cake", "A small toy", "A balloon", "A hat"], 1, "Everybody gets a small toy at the end.", "Cuối buổi ai cũng được một món đồ chơi nhỏ.", s25pB],
  ["Six and four are ___.", ["eight", "nine", "ten", "eleven"], 2, "Six plus four is ten.", "Sáu cộng bốn bằng mười.", undefined],
  ["In my picture the sun is ___.", ["yellow", "black", "purple", "grey"], 0, "The sun is yellow.", "Mặt trời màu vàng.", undefined],
  ["I have got ___ apple in my bag.", ["a", "an", "the two", "some a"], 1, "'Apple' starts with a vowel sound, so we use 'an'.", "'Apple' bắt đầu bằng nguyên âm nên dùng 'an'.", undefined],
  ["Twenty minus ten is ___.", ["five", "ten", "fifteen", "twenty"], 1, "Twenty minus ten is ten.", "Hai mươi trừ mười bằng mười.", undefined],
  ["Grass is usually ___.", ["green", "blue", "pink", "orange"], 0, "Grass is green.", "Cỏ có màu xanh lá.", undefined],
];

const s25Ls: Tuple[] = [
  ["How old is the girl?", ["Five", "Six", "Seven", "Eight"], 2, "She is seven years old.", "Bạn ấy bảy tuổi.", "Girl: 'I am seven years old today!'"],
  ["How many friends come to the party?", ["Six", "Eight", "Nine", "Ten"], 3, "Ten friends come to the party.", "Có mười người bạn đến dự tiệc.", "Woman: 'Ten friends are coming to the party.'"],
  ["What colour is the balloon?", ["Red", "Blue", "Green", "Purple"], 3, "The balloon is purple.", "Quả bóng bay màu tím.", "Boy: 'My balloon is purple. It is my favourite colour.'"],
  ["What is the girl's favourite number?", ["Three", "Five", "Seven", "Nine"], 1, "Her favourite number is five.", "Con số bạn ấy thích là năm.", "Girl: 'My favourite number is five.'"],
  ["What time does the party finish?", ["At four", "At five", "At six", "At seven"], 1, "The party finishes at five.", "Bữa tiệc kết thúc lúc năm giờ.", "Man: 'The party finishes at five o'clock.'"],
  ["What food is on the table?", ["Pizza", "Rice", "Soup", "Fish"], 0, "There is pizza on the table.", "Trên bàn có pizza.", "Woman: 'There is pizza and juice on the table.'"],
  ["How many candles does the boy blow out?", ["Six", "Seven", "Eight", "Nine"], 0, "He blows out six candles.", "Cậu ấy thổi sáu cây nến.", "Boy: 'One, two, three, four, five, six candles. All gone!'"],
  ["What colour is the present?", ["Gold", "Silver", "Green", "White"], 0, "The present is gold.", "Món quà màu vàng kim.", "Girl: 'The big present has gold paper.'"],
  ["Who sings the song?", ["Only Mum", "All the children", "The teacher", "Grandpa"], 1, "All the children sing.", "Tất cả các bạn cùng hát.", "Woman: 'All the children are singing Happy Birthday.'"],
  ["What does the boy get?", ["A book", "A ball", "A kite", "A robot"], 3, "He gets a robot.", "Cậu ấy nhận được một con rô-bốt.", "Boy: 'Wow, a robot! Thank you very much!'"],
];

const starters25: CambridgeMockExam = {
  id: "cambridge-starters-25",
  title: "Starters Mock Test 25 - Colours & Numbers Party",
  titleVi: "Đề thi thử Starters 25 - Màu sắc & Con số",
  level: "starters",
  duration: 20,
  totalQuestions: 25,
  questions: build(s25Rw, s25Ls),
};

export const cambridgeExamsStarters21to25: CambridgeMockExam[] = [
  starters21,
  starters22,
  starters23,
  starters24,
  starters25,
];
