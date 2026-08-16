/**
 * @file cambridgeExamsMovers13to14.ts
 * @description Two Cambridge Movers (A1) mock exams, tests 13 to 14. Themes:
 *              13 - Hobbies & Free Time; 14 - Jobs & Places in Town.
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
/* MOVERS 13 - Hobbies & Free Time                                */
/* ============================================================= */
const p13a =
  "My name is Lily. In my free time, I love painting pictures of flowers and animals. On Tuesdays, I go to a dance club after school with my friend Rosa. On Saturdays, I play the piano for one hour. My brother Max likes collecting stamps from different countries. He has more than two hundred stamps in his blue album. We both enjoy reading comic books before we go to bed.";
const p13b =
  "Join the Sunshine Hobby Club!\nEvery Wednesday from 4 pm to 6 pm at the community hall.\nThis week, children can learn to make paper boats and origami birds. Bring your own scissors and coloured paper. Next month, we will start a chess group for beginners on Fridays. There is also a photography class where you can borrow a camera from the club. The club is free for all children aged six to twelve.";
const p13c =
  "Tom and his sister Ellie both like sport. Tom plays football every Sunday morning with his team, the Tigers. He wears a green shirt and white shorts. Ellie prefers swimming, and she goes to the pool three times a week. In winter, the whole family goes skating at the ice rink near their house. Their mum likes reading books in a cafe while they play sports outside.";

const m13Rw: Tuple[] = [
  ["What does Lily love doing in her free time?", ["Painting pictures", "Playing football", "Cooking dinner", "Riding a bike"], 0, "The text says Lily loves painting pictures of flowers and animals.", "Đoạn văn nói Lily thích vẽ tranh hoa và động vật.", p13a],
  ["Who does Lily go to dance club with?", ["Her brother Max", "Her friend Rosa", "Her teacher", "Her mum"], 1, "Lily goes to a dance club after school with her friend Rosa.", "Lily đi câu lạc bộ khiêu vũ cùng bạn Rosa.", p13a],
  ["How long does Lily play the piano on Saturdays?", ["Thirty minutes", "One hour", "Two hours", "All day"], 1, "The text says she plays the piano for one hour on Saturdays.", "Đoạn văn nói cô ấy chơi piano một tiếng vào thứ Bảy.", p13a],
  ["What does Max collect?", ["Stickers", "Stamps", "Coins", "Toy cars"], 1, "Max likes collecting stamps from different countries.", "Max thích sưu tầm tem từ nhiều nước khác nhau.", p13a],
  ["What do Lily and Max both enjoy before bed?", ["Watching TV", "Reading comic books", "Drawing pictures", "Listening to music"], 1, "They both enjoy reading comic books before they go to bed.", "Cả hai đều thích đọc truyện tranh trước khi đi ngủ.", p13a],
  ["When does the Sunshine Hobby Club meet?", ["Every Monday", "Every Wednesday", "Every Friday", "Every Sunday"], 1, "The club meets every Wednesday from 4 pm to 6 pm.", "Câu lạc bộ họp mỗi thứ Tư từ 4 đến 6 giờ chiều.", p13b],
  ["What should children bring this week?", ["A camera", "Scissors and coloured paper", "A chess set", "A football"], 1, "Children should bring their own scissors and coloured paper for making paper boats and origami.", "Trẻ em nên mang kéo và giấy màu để làm thuyền giấy và origami.", p13b],
  ["When will the chess group start?", ["This week", "Next month", "Next year", "Tomorrow"], 1, "Next month, the club will start a chess group for beginners.", "Tháng sau, câu lạc bộ sẽ bắt đầu nhóm cờ vua cho người mới bắt đầu.", p13b],
  ["What can you borrow for the photography class?", ["A bicycle", "A camera", "A book", "A paintbrush"], 1, "There is a photography class where you can borrow a camera from the club.", "Có lớp nhiếp ảnh nơi bạn có thể mượn máy ảnh của câu lạc bộ.", p13b],
  ["Who can join the club for free?", ["Only teenagers", "Children aged six to twelve", "Adults only", "Only club members' parents"], 1, "The club is free for all children aged six to twelve.", "Câu lạc bộ miễn phí cho trẻ em từ sáu đến mười hai tuổi.", p13b],
  ["What team does Tom play football for?", ["The Lions", "The Tigers", "The Bears", "The Eagles"], 1, "Tom plays football with his team, the Tigers.", "Tom chơi bóng đá cho đội của mình, đội Tigers.", p13c],
  ["What does Ellie prefer doing?", ["Football", "Swimming", "Skating", "Chess"], 1, "Ellie prefers swimming, and she goes to the pool three times a week.", "Ellie thích bơi lội và đến hồ bơi ba lần một tuần.", p13c],
  ["How many times a week does Ellie go swimming?", ["Once", "Twice", "Three times", "Every day"], 2, "Ellie goes to the pool three times a week.", "Ellie đến hồ bơi ba lần một tuần.", p13c],
  ["What does the family do together in winter?", ["Go skiing", "Go skating", "Go swimming", "Play football"], 1, "In winter, the whole family goes skating at the ice rink near their house.", "Vào mùa đông, cả gia đình đi trượt băng ở sân băng gần nhà.", p13c],
  ["What does their mum like doing while they play sports?", ["Reading books in a cafe", "Playing football too", "Watching TV at home", "Sleeping"], 0, "Their mum likes reading books in a cafe while they play sports outside.", "Mẹ họ thích đọc sách trong quán cà phê trong khi họ chơi thể thao bên ngoài.", p13c],
];
const m13Ls: Tuple[] = [
  ["What is Anna's favourite hobby?", ["Drawing", "Dancing", "Singing", "Skating"], 1, "Anna's favourite hobby is dancing.", "Sở thích của Anna là khiêu vũ.", "Listen: 'My favourite hobby is dancing. I go to class every week.'"],
  ["What does Ben collect?", ["Stamps", "Toy cars", "Postcards", "Shells"], 2, "Ben says he collects postcards from other countries.", "Ben nói cậu sưu tầm bưu thiếp từ các nước khác.", "Listen: 'I collect postcards from other countries. I have fifty now.'"],
  ["When does Kate play the guitar?", ["In the morning", "After school", "At night", "At weekends only"], 1, "Kate practises the guitar after school.", "Kate luyện đàn guitar sau giờ học.", "Listen: 'I practise the guitar after school every day.'"],
  ["What sport does Sam play on Saturdays?", ["Tennis", "Basketball", "Football", "Swimming"], 0, "Sam plays tennis on Saturdays.", "Sam chơi quần vợt vào thứ Bảy.", "Listen: 'On Saturdays, I play tennis with my dad.'"],
  ["What is Mia making for her hobby club?", ["A paper boat", "A robot", "A sandwich", "A drawing"], 0, "Mia is making a paper boat at the hobby club.", "Mia đang làm một chiếc thuyền giấy tại câu lạc bộ sở thích.", "Listen: 'Anna: What are you making? Mia: I am making a paper boat.'"],
  ["How often does Leo go swimming?", ["Once a week", "Twice a week", "Every day", "Never"], 1, "Leo goes swimming twice a week.", "Leo đi bơi hai lần một tuần.", "Listen: 'I go swimming twice a week, on Monday and Friday.'"],
  ["What game does the boy want to learn?", ["Chess", "Checkers", "Cards", "Darts"], 0, "The boy wants to learn to play chess.", "Cậu bé muốn học chơi cờ vua.", "Listen: 'Ben: I want to learn chess. Can you teach me?'"],
  ["What did Ellie borrow from the club?", ["A camera", "A bike", "A book", "A guitar"], 0, "Ellie borrowed a camera from the club for the photography class.", "Ellie đã mượn máy ảnh của câu lạc bộ cho lớp nhiếp ảnh.", "Listen: 'I borrowed a camera from the club for the photography class.'"],
  ["What time does the dance class start?", ["3 pm", "4 pm", "5 pm", "6 pm"], 1, "The dance class starts at 4 pm.", "Lớp khiêu vũ bắt đầu lúc 4 giờ chiều.", "Listen: 'Our dance class starts at four o'clock in the afternoon.'"],
  ["What does Tom like reading?", ["Comic books", "Newspapers", "Science books", "Poems"], 0, "Tom likes reading comic books.", "Tom thích đọc truyện tranh.", "Listen: 'Tom: I love reading comic books before bed.'"],
];

const movers13: CambridgeMockExam = {
  id: "cambridge-movers-13",
  title: "Movers Mock Test 13 - Hobbies & Free Time",
  titleVi: "Đề thi thử Movers 13 - Sở thích & Thời gian rảnh",
  level: "movers",
  duration: 25,
  totalQuestions: 25,
  questions: build(m13Rw, m13Ls),
};

/* ============================================================= */
/* MOVERS 14 - Jobs & Places in Town                              */
/* ============================================================= */
const p14a =
  "My dad is a doctor. He works at the big hospital in the town centre, near the library. He wears a white coat and helps sick people every day. My mum is a teacher at my school. She teaches maths to children in Grade 4. My aunt is a firefighter. She works at the fire station next to the police station. All three of them start work early in the morning and finish in the evening.";
const p14b =
  "Welcome to Riverside Town!\nOur town has many useful places. The supermarket is open from 8 am to 9 pm, and it sells fruit, bread, and milk. The post office is next to the bank, and it closes at 5 pm. If you feel sick, the clinic is behind the park, open every day. There is also a nice bakery on Green Street where you can buy fresh bread and cakes every morning.";
const p14c =
  "Jack wants to be a chef when he grows up. He likes cooking pasta and cakes with his grandmother at weekends. His sister Amy wants to be a vet because she loves animals, especially dogs and rabbits. Their friend Leo wants to be a pilot so he can fly to different countries. Their teacher says it is good to have a dream job and to work hard at school.";

const m14Rw: Tuple[] = [
  ["What is the writer's dad's job?", ["A teacher", "A doctor", "A firefighter", "A chef"], 1, "The text says the writer's dad is a doctor.", "Đoạn văn nói bố của người viết là bác sĩ.", p14a],
  ["Where does the dad work?", ["At the school", "At the fire station", "At the hospital", "At the bank"], 2, "The dad works at the big hospital in the town centre.", "Bố làm việc tại bệnh viện lớn ở trung tâm thị trấn.", p14a],
  ["What does the mum teach?", ["English", "Maths", "Art", "Science"], 1, "The mum is a teacher who teaches maths to children in Grade 4.", "Mẹ là giáo viên dạy toán cho học sinh lớp 4.", p14a],
  ["What is the aunt's job?", ["A doctor", "A teacher", "A firefighter", "A shop assistant"], 2, "The aunt is a firefighter who works at the fire station.", "Cô là lính cứu hỏa, làm việc tại trạm cứu hỏa.", p14a],
  ["Where is the fire station?", ["Next to the library", "Next to the police station", "Next to the school", "Next to the hospital"], 1, "The fire station is next to the police station.", "Trạm cứu hỏa nằm cạnh đồn cảnh sát.", p14a],
  ["What time does the supermarket open?", ["7 am", "8 am", "9 am", "10 am"], 1, "The supermarket is open from 8 am to 9 pm.", "Siêu thị mở cửa từ 8 giờ sáng đến 9 giờ tối.", p14b],
  ["What is next to the post office?", ["The bank", "The clinic", "The bakery", "The park"], 0, "The post office is next to the bank.", "Bưu điện nằm cạnh ngân hàng.", p14b],
  ["Where is the clinic located?", ["Next to the bank", "Behind the park", "On Green Street", "In front of the school"], 1, "The clinic is behind the park.", "Phòng khám nằm phía sau công viên.", p14b],
  ["What street is the bakery on?", ["Green Street", "Park Road", "Main Street", "River Road"], 0, "The bakery is on Green Street.", "Tiệm bánh nằm trên phố Green Street.", p14b],
  ["What can you buy at the bakery?", ["Fruit and milk", "Fresh bread and cakes", "Books", "Medicine"], 1, "The bakery sells fresh bread and cakes every morning.", "Tiệm bánh bán bánh mì và bánh ngọt tươi mỗi sáng.", p14b],
  ["What job does Jack want in the future?", ["A vet", "A pilot", "A chef", "A teacher"], 2, "Jack wants to be a chef when he grows up.", "Jack muốn trở thành đầu bếp khi lớn lên.", p14c],
  ["Who does Jack cook with?", ["His mum", "His grandmother", "His teacher", "His sister"], 1, "Jack likes cooking with his grandmother at weekends.", "Jack thích nấu ăn cùng bà vào cuối tuần.", p14c],
  ["Why does Amy want to be a vet?", ["She likes cooking", "She loves animals", "She likes flying", "She likes maths"], 1, "Amy wants to be a vet because she loves animals, especially dogs and rabbits.", "Amy muốn làm bác sĩ thú y vì cô yêu động vật, đặc biệt là chó và thỏ.", p14c],
  ["What job does Leo want?", ["A chef", "A vet", "A pilot", "A doctor"], 2, "Leo wants to be a pilot so he can fly to different countries.", "Leo muốn làm phi công để có thể bay đến nhiều nước khác nhau.", p14c],
  ["What does the teacher say is good?", ["Playing all day", "Having a dream job and working hard", "Watching TV", "Sleeping late"], 1, "The teacher says it is good to have a dream job and to work hard at school.", "Cô giáo nói rằng có một ước mơ nghề nghiệp và chăm chỉ học tập là điều tốt.", p14c],
];
const m14Ls: Tuple[] = [
  ["What job does the woman have?", ["A nurse", "A teacher", "A cook", "A driver"], 1, "The woman says she is a teacher.", "Người phụ nữ nói cô ấy là giáo viên.", "Listen: 'I am a teacher. I work at a primary school.'"],
  ["Where is the new bookshop?", ["Next to the bank", "Behind the supermarket", "On Green Street", "Near the hospital"], 0, "The new bookshop is next to the bank.", "Hiệu sách mới nằm cạnh ngân hàng.", "Listen: 'There is a new bookshop next to the bank.'"],
  ["What time does the library close?", ["5 pm", "6 pm", "7 pm", "8 pm"], 2, "The library closes at 7 pm.", "Thư viện đóng cửa lúc 7 giờ tối.", "Listen: 'The library closes at seven o'clock every evening.'"],
  ["What does the man buy at the bakery?", ["Milk", "Bread", "Medicine", "Stamps"], 1, "The man buys bread at the bakery.", "Người đàn ông mua bánh mì ở tiệm bánh.", "Listen: 'I am going to the bakery to buy some fresh bread.'"],
  ["What job does Ben's uncle have?", ["A firefighter", "A pilot", "A vet", "A chef"], 0, "Ben's uncle is a firefighter.", "Chú của Ben là lính cứu hỏa.", "Listen: 'Ben: My uncle is a firefighter. He works at the fire station.'"],
  ["Where does the boy want to go to buy fruit?", ["The market", "The bank", "The clinic", "The school"], 0, "The boy wants to go to the market to buy fruit.", "Cậu bé muốn đến chợ để mua trái cây.", "Listen: 'I want to go to the market to buy some fruit.'"],
  ["What does Amy want to be when she grows up?", ["A vet", "A pilot", "A teacher", "A cook"], 0, "Amy wants to be a vet when she grows up.", "Amy muốn trở thành bác sĩ thú y khi lớn lên.", "Listen: 'Amy: I want to be a vet because I love animals.'"],
  ["Where is the police station?", ["Near the park", "Next to the fire station", "Behind the library", "On Green Street"], 1, "The police station is next to the fire station.", "Đồn cảnh sát nằm cạnh trạm cứu hỏa.", "Listen: 'The police station is next to the fire station.'"],
  ["What is the girl's mother's job?", ["A doctor", "A shop assistant", "A pilot", "A vet"], 1, "The girl's mother works as a shop assistant.", "Mẹ của cô bé làm nhân viên bán hàng.", "Listen: 'My mum works as a shop assistant in the supermarket.'"],
  ["What time does the clinic open?", ["7 am", "8 am", "9 am", "10 am"], 1, "The clinic opens at 8 am.", "Phòng khám mở cửa lúc 8 giờ sáng.", "Listen: 'The clinic opens at eight o'clock every morning.'"],
];

const movers14: CambridgeMockExam = {
  id: "cambridge-movers-14",
  title: "Movers Mock Test 14 - Jobs & Places in Town",
  titleVi: "Đề thi thử Movers 14 - Nghề nghiệp & Địa điểm trong thị trấn",
  level: "movers",
  duration: 25,
  totalQuestions: 25,
  questions: build(m14Rw, m14Ls),
};

export const cambridgeExamsMovers13to14: CambridgeMockExam[] = [movers13, movers14];
