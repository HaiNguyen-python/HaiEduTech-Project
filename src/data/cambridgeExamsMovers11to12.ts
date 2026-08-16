/**
 * @file cambridgeExamsMovers11to12.ts
 * @description Two Cambridge Movers (A1) mock exams, tests 11 to 12. Themes:
 *              11 - Farm & Countryside; 12 - Birthday Party & Presents.
 *              Each exam has 15 Reading & Writing questions (three reading-text
 *              groups of 5 questions) and 10 Listening questions.
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

/* ============================================================= */
/* MOVERS 11 - Farm & Countryside                                 */
/* ============================================================= */
const p11a =
  "My name is Ben. Last weekend, my family went to my uncle's farm in the countryside. There were many animals there: cows, sheep, and a big brown horse. I fed the chickens with my little sister. In the afternoon, we picked red apples from a tall tree. My uncle drove us around the farm in his old truck. I liked the farm very much and I want to go again next summer.";
const p11b =
  "Come to Green Valley Farm!\nOpen every day from 9 am to 5 pm.\nYou can see cows, goats, and ducks. You can also ride a pony for two dollars. There is a small shop where you can buy fresh milk and eggs. On Saturdays, children can help feed the baby lambs at 10 am. Please wear old shoes because the ground can be muddy. Bring a hat if it is sunny. We hope to see you soon!";

const m11Rw: Tuple[] = [
  ["Where did Ben's family go last weekend?", ["To the beach", "To his uncle's farm", "To the city", "To the zoo"], 1, "The text says the family went to his uncle's farm in the countryside.", "Đoạn văn nói gia đình Ben đã đến trang trại của chú ở vùng nông thôn.", p11a],
  ["Who did Ben feed the chickens with?", ["His mother", "His uncle", "His little sister", "His teacher"], 2, "Ben fed the chickens with his little sister.", "Ben cho gà ăn cùng với em gái nhỏ của mình.", p11a],
  ["What fruit did they pick?", ["Bananas", "Red apples", "Oranges", "Grapes"], 1, "In the afternoon, they picked red apples from a tall tree.", "Buổi chiều, họ hái táo đỏ từ một cây cao.", p11a],
  ["What did the uncle drive them in?", ["A car", "A bus", "An old truck", "A boat"], 2, "The uncle drove them around the farm in his old truck.", "Người chú lái xe tải cũ đưa họ đi quanh trang trại.", p11a],
  ["When does Ben want to go to the farm again?", ["Next weekend", "Next winter", "Next summer", "Tomorrow"], 2, "Ben says he wants to go again next summer.", "Ben nói cậu muốn đến trang trại lần nữa vào mùa hè tới.", p11a],
  ["What time does Green Valley Farm open?", ["8 am", "9 am", "10 am", "5 pm"], 1, "The farm is open every day from 9 am.", "Trang trại mở cửa mỗi ngày từ 9 giờ sáng.", p11b],
  ["How much does a pony ride cost?", ["One dollar", "Two dollars", "Five dollars", "It is free"], 1, "You can ride a pony for two dollars.", "Bạn có thể cưỡi ngựa pony với giá hai đô la.", p11b],
  ["What can you buy in the shop?", ["Toys and books", "Fresh milk and eggs", "Clothes", "Tickets"], 1, "There is a small shop where you can buy fresh milk and eggs.", "Có một cửa hàng nhỏ bán sữa và trứng tươi.", p11b],
  ["When can children feed the baby lambs?", ["Every morning", "On Saturdays at 10 am", "On Sundays at noon", "Never"], 1, "On Saturdays, children can help feed the baby lambs at 10 am.", "Vào thứ Bảy, trẻ em có thể giúp cho cừu con ăn lúc 10 giờ.", p11b],
  ["Why should visitors wear old shoes?", ["Because it is cold", "Because the ground can be muddy", "Because they will swim", "Because shoes are for sale"], 1, "Visitors should wear old shoes because the ground can be muddy.", "Khách nên mang giày cũ vì mặt đất có thể lầy lội.", p11b],
  ["The cow ___ grass in the field.", ["eat", "eats", "eating", "ate yesterday"], 1, "Present simple, third person singular: eats.", "Thì hiện tại đơn, ngôi thứ ba số ít: eats.", undefined],
  ["Look! The sheep ___ near the river now.", ["walk", "walks", "is walking", "walked"], 2, "Present continuous for an action happening now: is walking.", "Hiện tại tiếp diễn cho hành động đang xảy ra: is walking.", undefined],
  ["There ___ many hens on the farm.", ["is", "are", "am", "be"], 1, "Plural subject 'many hens' needs 'are'.", "Chủ ngữ số nhiều 'many hens' cần dùng 'are'.", undefined],
  ["A baby sheep is called a ___.", ["kitten", "lamb", "puppy", "chick"], 1, "A baby sheep is called a lamb.", "Cừu con được gọi là 'lamb'.", undefined],
  ["We ___ to the farm last Sunday.", ["go", "goes", "went", "going"], 2, "Past simple with 'last Sunday': went.", "Quá khứ đơn với 'last Sunday': went.", undefined],
];
const m11Ls: Tuple[] = [
  ["What animal is the boy feeding?", ["A duck", "A horse", "A chicken", "A goat"], 2, "He is feeding the chicken in the yard.", "Cậu bé đang cho gà ăn trong sân.", "Listen: 'Look, I am feeding the chicken some corn.'"],
  ["What colour is the farmer's truck?", ["Red", "Green", "Blue", "White"], 1, "The farmer's truck is green.", "Xe tải của người nông dân màu xanh lá.", "Listen: 'My father's truck is green and it is very old.'"],
  ["How many cows are in the field?", ["Three", "Six", "Nine", "Twelve"], 1, "There are six cows in the field.", "Có sáu con bò ở trong cánh đồng.", "Listen: 'Can you count them? There are six cows in the field.'"],
  ["What is the girl carrying?", ["A basket of eggs", "A bag of apples", "A box of toys", "A bucket of water"], 0, "She is carrying a basket of eggs.", "Cô bé đang mang một giỏ trứng.", "Listen: 'I have a basket of eggs from the hen house.'"],
  ["Where is the horse sleeping?", ["In the barn", "In the field", "By the gate", "Under the tree"], 0, "The horse is sleeping in the barn.", "Con ngựa đang ngủ trong chuồng.", "Listen: 'The horse is tired, so it is sleeping in the barn.'"],
  ["What time do the farm workers start?", ["6 o'clock", "7 o'clock", "8 o'clock", "9 o'clock"], 1, "The farm workers start at 7 o'clock.", "Những người làm việc ở trang trại bắt đầu lúc 7 giờ.", "Listen: 'Every day, the farm workers start at seven o'clock.'"],
  ["What did the family have for lunch on the farm?", ["Pizza", "Fresh bread and cheese", "Fish and chips", "Rice"], 1, "They had fresh bread and cheese for lunch.", "Gia đình họ ăn trưa với bánh mì và phô mai tươi.", "Listen: 'For lunch, we had fresh bread and cheese from the farm shop.'"],
  ["Which animal makes the loudest noise?", ["The duck", "The sheep", "The rooster", "The cat"], 2, "The rooster makes the loudest noise.", "Con gà trống gây ra tiếng ồn lớn nhất.", "Listen: 'The rooster is so loud, it wakes everyone up!'"],
  ["What is growing next to the barn?", ["Flowers", "Corn", "Trees", "Grapes"], 1, "Corn is growing next to the barn.", "Ngô đang mọc bên cạnh chuồng trại.", "Listen: 'Look at the tall corn growing next to the barn.'"],
  ["How does the boy get to the farm?", ["By bus", "By bike", "By car", "On foot"], 2, "He gets to the farm by car.", "Cậu bé đến trang trại bằng ô tô.", "Listen: 'We are going to the farm by car this morning.'"],
];

const movers11: CambridgeMockExam = {
  id: "cambridge-movers-11",
  title: "Movers Mock Test 11 - Farm & Countryside",
  titleVi: "Đề thi thử Movers 11 - Trang trại & Nông thôn",
  level: "movers",
  duration: 25,
  totalQuestions: 25,
  questions: build(m11Rw, m11Ls),
};

/* ============================================================= */
/* MOVERS 12 - Birthday Party & Presents                          */
/* ============================================================= */
const p12a =
  "Today is Lily's birthday. She is eight years old. Her mother made a big chocolate cake with eight candles. Lily invited ten friends to her party. They played fun games in the garden and sang the birthday song. Lily opened her presents after the cake. She got a new bike from her parents and a doll from her best friend. Lily said it was the happiest day of the year.";
const p12b =
  "Invitation\nPlease come to Max's birthday party!\nWhen: Saturday at 3 pm\nWhere: 12 Park Street\nThere will be games, music, and a big cake. Please bring a small present if you can. Wear comfortable clothes because we will play outside. The party will finish at 6 pm. Please tell Max's mother by Wednesday if you can come. We can't wait to see you there!";

const m12Rw: Tuple[] = [
  ["How old is Lily today?", ["Six", "Seven", "Eight", "Nine"], 2, "The text says Lily is eight years old today.", "Đoạn văn nói hôm nay Lily tám tuổi.", p12a],
  ["What kind of cake did Lily's mother make?", ["Vanilla cake", "Chocolate cake", "Fruit cake", "Cheese cake"], 1, "Her mother made a big chocolate cake.", "Mẹ của Lily làm một chiếc bánh sô-cô-la lớn.", p12a],
  ["How many friends did Lily invite?", ["Five", "Eight", "Ten", "Twelve"], 2, "Lily invited ten friends to her party.", "Lily mời mười người bạn đến dự tiệc.", p12a],
  ["What did Lily get from her parents?", ["A doll", "A new bike", "A book", "A game"], 1, "Lily got a new bike from her parents.", "Lily nhận được một chiếc xe đạp mới từ bố mẹ.", p12a],
  ["How did Lily feel about her birthday?", ["Sad", "Bored", "It was the happiest day of the year", "Tired"], 2, "Lily said it was the happiest day of the year.", "Lily nói đó là ngày hạnh phúc nhất trong năm.", p12a],
  ["What time does Max's party start?", ["1 pm", "2 pm", "3 pm", "4 pm"], 2, "The invitation says the party starts at 3 pm.", "Thiệp mời ghi bữa tiệc bắt đầu lúc 3 giờ chiều.", p12b],
  ["Where is Max's party?", ["10 Park Street", "12 Park Street", "20 Park Street", "12 Green Street"], 1, "The party is at 12 Park Street.", "Bữa tiệc được tổ chức tại số 12 phố Park.", p12b],
  ["What should guests bring?", ["Food", "A small present", "Music", "Chairs"], 1, "Guests should bring a small present if they can.", "Khách nên mang theo một món quà nhỏ nếu có thể.", p12b],
  ["Why should guests wear comfortable clothes?", ["Because they will swim", "Because they will play outside", "Because it is cold", "Because they will sleep"], 1, "They should wear comfortable clothes because they will play outside.", "Họ nên mặc quần áo thoải mái vì sẽ chơi ở ngoài trời.", p12b],
  ["When does the party finish?", ["5 pm", "6 pm", "7 pm", "8 pm"], 1, "The party will finish at 6 pm.", "Bữa tiệc sẽ kết thúc lúc 6 giờ chiều.", p12b],
  ["We ___ a big cake for the party tomorrow.", ["make", "makes", "are going to make", "made"], 2, "'Going to' is used for a future plan.", "'Going to' được dùng để nói về kế hoạch tương lai.", undefined],
  ["Look, the children ___ games in the garden!", ["play", "plays", "are playing", "played"], 2, "Present continuous for an action happening now: are playing.", "Hiện tại tiếp diễn cho hành động đang diễn ra: are playing.", undefined],
  ["She ___ ten candles on the cake.", ["put", "puts", "putting", "is put"], 0, "Past simple, irregular verb 'put' stays the same in the past.", "Quá khứ đơn, động từ bất quy tắc 'put' giữ nguyên dạng.", undefined],
  ["This present is ___ than that one.", ["big", "bigger", "biggest", "more big"], 1, "Comparative adjective form: bigger.", "Dạng tính từ so sánh hơn: bigger.", undefined],
  ["Happy birthday! I hope you ___ a lovely day.", ["have", "has", "having", "had"], 0, "Simple present used in a birthday wish: have.", "Hiện tại đơn được dùng trong lời chúc sinh nhật: have.", undefined],
];
const m12Ls: Tuple[] = [
  ["How many candles are on the cake?", ["Five", "Seven", "Nine", "Ten"], 2, "There are nine candles on the cake.", "Có chín cây nến trên bánh.", "Listen: 'Count the candles - there are nine on the cake!'"],
  ["What present did the boy get?", ["A ball", "A robot", "A puzzle", "A kite"], 1, "The boy got a robot for his birthday.", "Cậu bé nhận được một con robot làm quà sinh nhật.", "Listen: 'My favourite present this year is my new robot.'"],
  ["What colour are the balloons?", ["Yellow", "Pink", "Purple", "Green"], 2, "The balloons are purple.", "Những quả bóng bay có màu tím.", "Listen: 'Look at all the purple balloons on the ceiling!'"],
  ["What game are the children playing?", ["Hide and seek", "Musical chairs", "Tag", "Football"], 1, "The children are playing musical chairs.", "Các bạn nhỏ đang chơi trò ghế nhạc.", "Listen: 'Everyone, let's play musical chairs now!'"],
  ["What time will the guests arrive?", ["2 o'clock", "3 o'clock", "4 o'clock", "5 o'clock"], 1, "The guests will arrive at 3 o'clock.", "Khách mời sẽ đến lúc 3 giờ.", "Listen: 'The guests are coming at three o'clock this afternoon.'"],
  ["What flavour is the ice cream?", ["Chocolate", "Strawberry", "Vanilla", "Mango"], 1, "The ice cream is strawberry flavour.", "Kem có vị dâu tây.", "Listen: 'We are having strawberry ice cream at the party.'"],
  ["Who is going to sing the birthday song first?", ["The mother", "The father", "The birthday girl", "The best friend"], 3, "The best friend is going to sing first.", "Người bạn thân sẽ hát bài hát sinh nhật đầu tiên.", "Listen: 'Her best friend wants to sing the birthday song first.'"],
  ["What did the family hang on the wall?", ["Photos", "Balloons and a banner", "Flags", "Lights only"], 1, "They hung balloons and a banner on the wall.", "Gia đình treo bóng bay và băng rôn trên tường.", "Listen: 'We put up balloons and a birthday banner on the wall.'"],
  ["Where will the party games take place?", ["In the kitchen", "In the garden", "In the bedroom", "At school"], 1, "The party games will take place in the garden.", "Các trò chơi trong tiệc sẽ diễn ra ở khu vườn.", "Listen: 'All the games will be outside in the garden.'"],
  ["What must guests do before Wednesday?", ["Buy a present", "Tell Max's mother if they can come", "Send a card", "Learn a song"], 1, "Guests must tell Max's mother by Wednesday if they can come.", "Khách phải báo cho mẹ của Max trước thứ Tư nếu họ có thể đến.", "Listen: 'Please let Max's mother know by Wednesday if you are coming.'"],
];

const movers12: CambridgeMockExam = {
  id: "cambridge-movers-12",
  title: "Movers Mock Test 12 - Birthday Party & Presents",
  titleVi: "Đề thi thử Movers 12 - Tiệc sinh nhật & Quà tặng",
  level: "movers",
  duration: 25,
  totalQuestions: 25,
  questions: build(m12Rw, m12Ls),
};

export const cambridgeExamsMovers11to12: CambridgeMockExam[] = [movers11, movers12];
