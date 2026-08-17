/**
 * @file cambridgeExamsStarters15.ts
 * @description One Cambridge Starters (Pre-A1) mock exam, test 15.
 *              Theme: Toys & Playtime. 15 Reading & Writing questions (two
 *              short reading groups) and 10 Listening questions.
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

const pA =
  "This is my toy box. It is red and blue. I have a big teddy bear and a small ball. My teddy bear is brown. The ball is yellow. I play with my toys in my bedroom every day.";
const pB =
  "Sam and Lily are in the garden. Sam has a kite. The kite is green. Lily has a bike. Her bike is new. They are very happy today. Their dog Rex runs after the ball.";

const rw: Tuple[] = [
  ["What colour is the toy box?", ["Green and white", "Red and blue", "Yellow", "Brown"], 1, "The text says the toy box is red and blue.", "Bài đọc nói hộp đồ chơi màu đỏ và xanh.", pA],
  ["What colour is the teddy bear?", ["Brown", "Pink", "Black", "Blue"], 0, "The text says 'My teddy bear is brown'.", "Bài đọc nói con gấu bông màu nâu.", pA],
  ["What colour is the ball?", ["Red", "Yellow", "Green", "White"], 1, "The text says 'The ball is yellow'.", "Bài đọc nói quả bóng màu vàng.", pA],
  ["Is the ball big or small?", ["Big", "Small", "Very long", "Very tall"], 1, "The text says 'a small ball'.", "Bài đọc nói đó là quả bóng nhỏ.", pA],
  ["Where does the child play?", ["In the kitchen", "In the bedroom", "At school", "In the car"], 1, "The text says 'I play with my toys in my bedroom'.", "Bài đọc nói bạn ấy chơi trong phòng ngủ.", pA],
  ["Where are Sam and Lily?", ["In the garden", "In the bedroom", "At the shop", "On a bus"], 0, "The text says 'Sam and Lily are in the garden'.", "Bài đọc nói Sam và Lily ở trong vườn.", pB],
  ["What has Sam got?", ["A bike", "A kite", "A ball", "A doll"], 1, "The text says 'Sam has a kite'.", "Bài đọc nói Sam có một con diều.", pB],
  ["What colour is the kite?", ["Green", "Red", "Blue", "Orange"], 0, "The text says 'The kite is green'.", "Bài đọc nói con diều màu xanh lá.", pB],
  ["What has Lily got?", ["A kite", "A bike", "A car", "A book"], 1, "The text says 'Lily has a bike'.", "Bài đọc nói Lily có một chiếc xe đạp.", pB],
  ["What is the dog's name?", ["Rex", "Sam", "Lily", "Ben"], 0, "The text says 'Their dog Rex runs after the ball'.", "Bài đọc nói con chó tên là Rex.", pB],
  ["A doll is a ___.", ["food", "toy", "colour", "animal"], 1, "A doll is a kind of toy.", "Búp bê là một loại đồ chơi.", undefined],
  ["We fly a ___ in the wind.", ["kite", "bed", "cup", "shoe"], 0, "We fly a kite when it is windy.", "Chúng ta thả diều khi có gió.", undefined],
  ["How many wheels has a bike got?", ["One", "Two", "Three", "Four"], 1, "A bike has two wheels.", "Xe đạp có hai bánh.", undefined],
  ["Which one is NOT a toy?", ["Ball", "Teddy bear", "Train set", "Chair"], 3, "A chair is furniture, not a toy.", "Cái ghế là đồ nội thất, không phải đồ chơi.", undefined],
  ["I ___ with my friends after school.", ["play", "sleep", "cook", "wash"], 0, "We play with friends after school.", "Chúng ta chơi với bạn sau giờ học.", undefined],
];

const ls: Tuple[] = [
  ["What toy has the girl got?", ["A kite", "A doll", "A ball", "A bike"], 1, "She says she has a doll with a red dress.", "Bạn ấy nói mình có một con búp bê mặc váy đỏ.", "Listen: 'I have a doll. My doll has a red dress.'"],
  ["How many cars has the boy got?", ["Two", "Three", "Four", "Five"], 2, "The boy says he has four toy cars.", "Cậu bé nói mình có bốn chiếc xe ô tô đồ chơi.", "Listen: 'I have four toy cars. They are very fast.'"],
  ["Where is the teddy bear?", ["On the bed", "Under the chair", "In the box", "On the table"], 0, "The speaker says the teddy bear is on the bed.", "Người nói cho biết con gấu bông ở trên giường.", "Listen: 'My teddy bear is on the bed with my pillow.'"],
  ["What colour is the new ball?", ["Blue", "Orange", "White", "Purple"], 1, "The speaker says the new ball is orange.", "Người nói cho biết quả bóng mới màu cam.", "Listen: 'Look! My new ball is orange and very big.'"],
  ["Who is playing in the park?", ["Sam", "Lily", "Rex", "Mum"], 1, "The speaker says Lily is playing in the park.", "Người nói cho biết Lily đang chơi trong công viên.", "Listen: 'Lily is playing in the park with her friends.'"],
  ["What does the boy want for his birthday?", ["A bike", "A kite", "A dog", "A book"], 0, "He says he wants a bike for his birthday.", "Cậu ấy nói mình muốn một chiếc xe đạp cho sinh nhật.", "Listen: 'For my birthday I want a bike, please!'"],
  ["Where do they put the toys?", ["In the toy box", "Under the bed", "In the garden", "On the sofa"], 0, "They put the toys in the toy box.", "Họ cất đồ chơi vào hộp đồ chơi.", "Listen: 'Now we put all the toys in the toy box.'"],
  ["What is the dog doing?", ["Sleeping", "Running after the ball", "Eating", "Swimming"], 1, "The dog is running after the ball.", "Con chó đang chạy theo quả bóng.", "Listen: 'The dog is running after the ball in the garden.'"],
  ["How old is Lily?", ["Five", "Six", "Seven", "Eight"], 2, "Lily says she is seven.", "Lily nói mình bảy tuổi.", "Listen: 'Hello, I am Lily and I am seven years old.'"],
  ["What game do they play?", ["Football", "Hide and seek", "Chess", "Cards"], 1, "They play hide and seek.", "Họ chơi trò trốn tìm.", "Listen: 'Let's play hide and seek in the garden!'"],
];

const starters15: CambridgeMockExam = {
  id: "cambridge-starters-15",
  title: "Starters Mock Test 15 - Toys & Playtime",
  titleVi: "Đề thi thử Starters 15 - Đồ chơi & Giờ chơi",
  level: "starters",
  duration: 20,
  totalQuestions: 25,
  questions: build(rw, ls),
};

export const cambridgeExamsStarters15: CambridgeMockExam[] = [starters15];
