/**
 * @file cambridgeExamsStarters13to14.ts
 * @description Two Cambridge Starters (Pre-A1) mock exams, tests 13 and 14.
 *              Themes: 13 - School Things & Classroom; 14 - Farm Animals & The Park.
 *              Each exam has 15 Reading & Writing questions (three reading
 *              groups of 5, based on very short simple passages) and 10
 *              Listening questions.
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
/* STARTERS 13 - School Things & Classroom                        */
/* ============================================================= */
const p13a =
  "This is my school bag. I have a red pencil case, a blue book and a green ruler. My pencil case has three pencils. I love my school bag.";
const p13b =
  "Look at our classroom! There is a big table and ten small chairs. The board is black. Miss Lin writes on the board with white chalk.";
const p13c =
  "Today I have a new rubber and a sharpener. My rubber is pink. My sharpener is orange. I keep them in my bag with my crayons.";

const s13Rw: Tuple[] = [
  ["What colour is the pencil case?", ["Blue", "Red", "Green", "Orange"], 1, "The passage says 'a red pencil case'.", "Đoạn văn nói 'a red pencil case' (hộp bút màu đỏ).", p13a],
  ["What colour is the book?", ["Blue", "Red", "Pink", "Black"], 0, "The passage says 'a blue book'.", "Đoạn văn nói 'a blue book' (một quyển sách màu xanh).", p13a],
  ["How many pencils are in the pencil case?", ["Two", "Three", "Four", "Five"], 1, "The passage says 'My pencil case has three pencils'.", "Đoạn văn nói 'My pencil case has three pencils' (hộp bút có ba cây bút chì).", p13a],
  ["What colour is the ruler?", ["Green", "Blue", "Red", "Yellow"], 0, "The passage says 'a green ruler'.", "Đoạn văn nói 'a green ruler' (thước kẻ màu xanh lá).", p13a],
  ["What is in the school bag?", ["A ball and a cup", "A pencil case, a book and a ruler", "A cat and a dog", "A plate and a spoon"], 1, "The school bag has a pencil case, a book and a ruler.", "Cặp sách có hộp bút, sách và thước kẻ.", p13a],
  ["How many chairs are in the classroom?", ["Ten", "Five", "Two", "Twenty"], 0, "The passage says 'ten small chairs'.", "Đoạn văn nói 'ten small chairs' (mười cái ghế nhỏ).", p13b],
  ["What colour is the board?", ["White", "Black", "Green", "Brown"], 1, "The passage says 'The board is black'.", "Đoạn văn nói 'The board is black' (bảng có màu đen).", p13b],
  ["Who writes on the board?", ["A student", "Miss Lin", "Dad", "A friend"], 1, "The passage says 'Miss Lin writes on the board'.", "Đoạn văn nói 'Miss Lin writes on the board' (cô Lin viết trên bảng).", p13b],
  ["What colour is the chalk?", ["Black", "Yellow", "White", "Red"], 2, "The passage says 'with white chalk'.", "Đoạn văn nói 'with white chalk' (bằng phấn trắng).", p13b],
  ["What is in the classroom?", ["A slide and a swing", "A big table and small chairs", "A car and a bike", "A bed and a lamp"], 1, "The classroom has a big table and ten small chairs.", "Lớp học có một cái bàn to và các ghế nhỏ.", p13b],
  ["What colour is the rubber?", ["Orange", "Pink", "Blue", "Green"], 1, "The passage says 'My rubber is pink'.", "Đoạn văn nói 'My rubber is pink' (cục tẩy màu hồng).", p13c],
  ["What colour is the sharpener?", ["Pink", "Black", "Orange", "White"], 2, "The passage says 'My sharpener is orange'.", "Đoạn văn nói 'My sharpener is orange' (gọt bút chì màu cam).", p13c],
  ["What new things does the writer have today?", ["A rubber and a sharpener", "A ruler and a pen", "A book and a bag", "A chair and a table"], 0, "The passage says 'I have a new rubber and a sharpener'.", "Đoạn văn nói 'I have a new rubber and a sharpener' (tôi có tẩy và gọt bút chì mới).", p13c],
  ["Where does the writer keep the rubber and sharpener?", ["On the table", "In the bag", "On the board", "In the box"], 1, "The passage says 'I keep them in my bag with my crayons'.", "Đoạn văn nói 'I keep them in my bag with my crayons' (tôi để chúng trong cặp cùng bút sáp).", p13c],
  ["What else is in the bag?", ["Crayons", "A ball", "A cup", "A hat"], 0, "The passage says 'in my bag with my crayons'.", "Đoạn văn nói 'in my bag with my crayons' (trong cặp cùng với bút sáp màu).", p13c],
];
const s13Ls: Tuple[] = [
  ["What is the boy holding?", ["A book", "A pencil", "A ruler", "A bag"], 0, "The boy is holding a book.", "Cậu bé đang cầm một quyển sách.", "Listen: 'Look, I am holding my new book.'"],
  ["What colour is the pencil case?", ["Red", "Blue", "Green", "Yellow"], 1, "The pencil case is blue.", "Hộp bút màu xanh dương.", "Listen: 'My pencil case is blue.'"],
  ["Where is the ruler?", ["On the desk", "In the bag", "Under the chair", "On the board"], 0, "The ruler is on the desk.", "Cái thước đang ở trên bàn.", "Listen: 'My ruler is on the desk.'"],
  ["How many crayons does the girl have?", ["Six", "Seven", "Eight", "Nine"], 2, "The girl has eight crayons.", "Cô bé có tám cây bút sáp màu.", "Listen: 'I have eight crayons in my box.'"],
  ["What does the teacher want the class to do?", ["Sing a song", "Open their books", "Go outside", "Draw a picture"], 1, "The teacher wants the class to open their books.", "Cô giáo muốn cả lớp mở sách ra.", "Listen: 'Children, please open your books now.'"],
  ["What is on the teacher's desk?", ["A rubber", "A cup", "A ball", "A bag"], 0, "There is a rubber on the teacher's desk.", "Có một cục tẩy trên bàn cô giáo.", "Listen: 'There is a rubber on the teacher's desk.'"],
  ["Where do the children sit?", ["On the floor", "On chairs", "On the table", "Outside"], 1, "The children sit on chairs.", "Các bạn nhỏ ngồi trên ghế.", "Listen: 'The children sit on their chairs in class.'"],
  ["What is under the desk?", ["A school bag", "A hat", "A shoe", "A book"], 0, "The school bag is under the desk.", "Chiếc cặp sách ở dưới bàn.", "Listen: 'My school bag is under the desk.'"],
  ["Who has the new sharpener?", ["Amy", "Ben", "Sam", "Miss Lin"], 0, "Amy has the new sharpener.", "Amy có cái gọt bút chì mới.", "Listen: 'Amy has a new orange sharpener.'"],
  ["What is the girl doing with the crayon?", ["Cutting paper", "Drawing a picture", "Writing a letter", "Reading a book"], 1, "The girl is drawing a picture with the crayon.", "Cô bé đang vẽ tranh bằng bút sáp màu.", "Listen: 'Look, I am drawing a picture with my crayon.'"],
];

const starters13: CambridgeMockExam = {
  id: "cambridge-starters-13",
  title: "Starters Mock Test 13 - School Things & Classroom",
  titleVi: "Đề thi thử Starters 13 - Đồ dùng học tập & Lớp học",
  level: "starters",
  duration: 20,
  totalQuestions: 25,
  questions: build(s13Rw, s13Ls),
};

/* ============================================================= */
/* STARTERS 14 - Farm Animals & The Park                          */
/* ============================================================= */
const p14a =
  "This is my grandpa's farm. There are five cows and two horses. The cows are brown and white. The horses are black. I like the farm.";
const p14b =
  "Look at the ducks! There are six ducks on the pond. They are white and yellow. Near the pond, there are three sheep. They are eating grass.";
const p14c =
  "Today we go to the park. There is a big pond with a duck in it. My sister feeds the duck with bread. Then we sit on the grass and eat our lunch.";

const s14Rw: Tuple[] = [
  ["How many cows are on the farm?", ["Four", "Five", "Six", "Seven"], 1, "The passage says 'There are five cows'.", "Đoạn văn nói 'There are five cows' (có năm con bò).", p14a],
  ["How many horses are on the farm?", ["One", "Two", "Three", "Four"], 1, "The passage says 'two horses'.", "Đoạn văn nói 'two horses' (hai con ngựa).", p14a],
  ["What colour are the cows?", ["Black", "Brown and white", "Grey", "Pink"], 1, "The passage says 'The cows are brown and white'.", "Đoạn văn nói 'The cows are brown and white' (những con bò màu nâu và trắng).", p14a],
  ["What colour are the horses?", ["White", "Brown", "Black", "Yellow"], 2, "The passage says 'The horses are black'.", "Đoạn văn nói 'The horses are black' (những con ngựa màu đen).", p14a],
  ["Whose farm is it?", ["Mum's farm", "Grandpa's farm", "The teacher's farm", "A friend's farm"], 1, "The passage says 'This is my grandpa's farm'.", "Đoạn văn nói 'This is my grandpa's farm' (đây là trang trại của ông).", p14a],
  ["How many ducks are on the pond?", ["Five", "Six", "Seven", "Eight"], 1, "The passage says 'There are six ducks on the pond'.", "Đoạn văn nói 'There are six ducks on the pond' (có sáu con vịt trên ao).", p14b],
  ["What colour are the ducks?", ["Brown", "White and yellow", "Black", "Grey"], 1, "The passage says 'They are white and yellow'.", "Đoạn văn nói 'They are white and yellow' (chúng màu trắng và vàng).", p14b],
  ["How many sheep are near the pond?", ["Two", "Three", "Four", "Five"], 1, "The passage says 'three sheep'.", "Đoạn văn nói 'three sheep' (ba con cừu).", p14b],
  ["What are the sheep doing?", ["Sleeping", "Eating grass", "Swimming", "Running"], 1, "The passage says 'They are eating grass'.", "Đoạn văn nói 'They are eating grass' (chúng đang ăn cỏ).", p14b],
  ["Where are the ducks?", ["On the farm", "On the pond", "In the house", "On the grass"], 1, "The passage says 'There are six ducks on the pond'.", "Đoạn văn nói 'There are six ducks on the pond' (có sáu con vịt trên ao).", p14b],
  ["Where do they go today?", ["To the farm", "To the park", "To school", "To the shop"], 1, "The passage says 'Today we go to the park'.", "Đoạn văn nói 'Today we go to the park' (hôm nay chúng tôi đi công viên).", p14c],
  ["What is in the pond?", ["A fish", "A duck", "A cow", "A sheep"], 1, "The passage says 'a big pond with a duck in it'.", "Đoạn văn nói 'a big pond with a duck in it' (một cái ao to có một con vịt).", p14c],
  ["Who feeds the duck?", ["My sister", "My grandpa", "My mum", "My friend"], 0, "The passage says 'My sister feeds the duck'.", "Đoạn văn nói 'My sister feeds the duck' (chị tôi cho vịt ăn).", p14c],
  ["What does the sister feed the duck with?", ["Rice", "Bread", "Grass", "Fruit"], 1, "The passage says 'feeds the duck with bread'.", "Đoạn văn nói 'feeds the duck with bread' (cho vịt ăn bánh mì).", p14c],
  ["Where do they sit and eat lunch?", ["On the grass", "On chairs", "In the car", "On the sand"], 0, "The passage says 'we sit on the grass and eat our lunch'.", "Đoạn văn nói 'we sit on the grass and eat our lunch' (chúng tôi ngồi trên cỏ ăn trưa).", p14c],
];
const s14Ls: Tuple[] = [
  ["What animal is in the field?", ["A cow", "A cat", "A dog", "A bird"], 0, "There is a cow in the field.", "Có một con bò ở trên cánh đồng.", "Listen: 'Look, there is a cow in the field.'"],
  ["What colour is the horse?", ["Black", "White", "Brown", "Grey"], 2, "The horse is brown.", "Con ngựa màu nâu.", "Listen: 'My horse is brown and very fast.'"],
  ["How many sheep can you see?", ["Two", "Three", "Four", "Five"], 1, "There are three sheep.", "Có ba con cừu.", "Listen: 'I can see three sheep near the fence.'"],
  ["Where is the duck swimming?", ["In the pond", "In the sea", "In the bath", "In the river"], 0, "The duck is swimming in the pond.", "Con vịt đang bơi trong ao.", "Listen: 'The duck is swimming in the pond.'"],
  ["What is the girl feeding the ducks?", ["Rice", "Bread", "Grass", "Apples"], 1, "The girl is feeding the ducks bread.", "Cô bé đang cho vịt ăn bánh mì.", "Listen: 'I am feeding the ducks with bread.'"],
  ["What is on the grass in the park?", ["A ball", "A blanket", "A bike", "A kite"], 1, "There is a blanket on the grass.", "Có một tấm chăn trên cỏ.", "Listen: 'We put a blanket on the grass for our lunch.'"],
  ["Where are the children playing?", ["At the farm", "At the park", "At school", "At home"], 1, "The children are playing at the park.", "Các bạn nhỏ đang chơi ở công viên.", "Listen: 'The children are playing happily at the park.'"],
  ["What animal is eating grass?", ["A sheep", "A duck", "A cat", "A fish"], 0, "The sheep is eating grass.", "Con cừu đang ăn cỏ.", "Listen: 'The sheep is eating grass near the pond.'"],
  ["Who has a picnic in the park?", ["Sam and his family", "The teacher", "Only Ben", "Nobody"], 0, "Sam and his family have a picnic in the park.", "Sam và gia đình đi dã ngoại ở công viên.", "Listen: 'Sam and his family have a picnic in the park today.'"],
  ["What does the boy see near the pond?", ["A horse", "A duck", "A cow", "A cat"], 1, "The boy sees a duck near the pond.", "Cậu bé nhìn thấy một con vịt gần ao.", "Listen: 'Look, I can see a duck near the pond!'"],
];

const starters14: CambridgeMockExam = {
  id: "cambridge-starters-14",
  title: "Starters Mock Test 14 - Farm Animals & The Park",
  titleVi: "Đề thi thử Starters 14 - Động vật nông trại & Công viên",
  level: "starters",
  duration: 20,
  totalQuestions: 25,
  questions: build(s14Rw, s14Ls),
};

export const cambridgeExamsStarters13to14: CambridgeMockExam[] = [starters13, starters14];
