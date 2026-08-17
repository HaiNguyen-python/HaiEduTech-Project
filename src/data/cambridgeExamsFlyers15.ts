/**
 * @file cambridgeExamsFlyers15.ts
 * @description One Cambridge Flyers (A2) mock exam, test 15.
 *              Theme: Space & Our Planet. 18 Reading & Writing questions
 *              (three reading groups of six) and 10 Listening questions.
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
  "Last Friday our class went to the planetarium with our teacher, Miss Green. Inside, the room was dark and the ceiling looked like the night sky. We learned that the Sun is a star and that eight planets travel around it. Jupiter is the biggest planet and Mercury is the closest one to the Sun. Miss Green told us that a day on Earth takes twenty-four hours because our planet turns around once. At the end, we watched a film about the first astronauts who walked on the Moon in 1969. I want to be an astronaut when I am older.";
const pB =
  "The Moon is much smaller than the Earth and it has no air and no water. Because there is no wind on the Moon, the footprints of the astronauts are still there today. The Moon does not make its own light; it looks bright because the Sun shines on it. It takes about four days to travel from the Earth to the Moon in a spaceship. Astronauts must wear special suits outside because the Moon is very hot in the day and very cold at night. They also carry oxygen so that they can breathe.";
const pC =
  "Our planet needs our help. Many families now put paper, glass and plastic in different bins so that these things can be used again. At Nam's school, the children have planted twenty young trees near the playground and they water them every week. They also switch off the lights when they leave a room and they ride their bikes instead of going by car. Last term the school won a green prize for saving the most water. Nam says that small actions become important when everybody does them together.";

const rw: Tuple[] = [
  ["Where did the class go last Friday?", ["To a museum", "To the planetarium", "To the cinema", "To a park"], 1, "The text says the class went to the planetarium with Miss Green.", "Bài đọc nói lớp đã đến nhà chiếu hình thiên văn cùng cô Green.", pA],
  ["How many planets travel around the Sun?", ["Six", "Seven", "Eight", "Nine"], 2, "The text says eight planets travel around the Sun.", "Bài đọc nói có tám hành tinh quay quanh Mặt Trời.", pA],
  ["Which planet is the biggest?", ["Mercury", "Earth", "Jupiter", "Mars"], 2, "The text says Jupiter is the biggest planet.", "Bài đọc nói Sao Mộc là hành tinh lớn nhất.", pA],
  ["Which planet is closest to the Sun?", ["Mercury", "Jupiter", "Earth", "Venus"], 0, "The text says Mercury is the closest planet to the Sun.", "Bài đọc nói Sao Thủy gần Mặt Trời nhất.", pA],
  ["Why does a day take twenty-four hours?", ["The Sun moves", "The Earth turns around once", "The Moon shines", "The stars move"], 1, "The text says a day takes 24 hours because our planet turns around once.", "Bài đọc nói một ngày dài 24 giờ vì Trái Đất tự quay một vòng.", pA],
  ["When did astronauts first walk on the Moon?", ["1959", "1969", "1979", "1989"], 1, "The text says the first astronauts walked on the Moon in 1969.", "Bài đọc nói các nhà du hành đầu tiên đi trên Mặt Trăng năm 1969.", pA],
  ["What is NOT on the Moon?", ["Rocks", "Air and water", "Dust", "Footprints"], 1, "The text says the Moon has no air and no water.", "Bài đọc nói Mặt Trăng không có không khí và nước.", pB],
  ["Why are the footprints still there?", ["There is no wind", "Nobody walks there", "It rains a lot", "They are painted"], 0, "The text says there is no wind on the Moon, so the footprints stay.", "Bài đọc nói trên Mặt Trăng không có gió nên dấu chân vẫn còn.", pB],
  ["Why does the Moon look bright?", ["It makes its own light", "The Sun shines on it", "It is full of stars", "It is white"], 1, "The text says the Moon looks bright because the Sun shines on it.", "Bài đọc nói Mặt Trăng sáng vì Mặt Trời chiếu vào nó.", pB],
  ["How long does the journey to the Moon take?", ["About four hours", "About four days", "About four weeks", "About four months"], 1, "The text says it takes about four days by spaceship.", "Bài đọc nói mất khoảng bốn ngày bằng tàu vũ trụ.", pB],
  ["Why must astronauts wear special suits?", ["To look nice", "Because of the very hot and very cold weather", "To run faster", "To carry rocks"], 1, "The text says the Moon is very hot in the day and very cold at night.", "Bài đọc nói Mặt Trăng rất nóng ban ngày và rất lạnh ban đêm.", pB],
  ["What do astronauts carry to breathe?", ["Water", "Oxygen", "Food", "Batteries"], 1, "The text says they carry oxygen so that they can breathe.", "Bài đọc nói họ mang theo oxy để có thể hít thở.", pB],
  ["What do many families put in different bins?", ["Paper, glass and plastic", "Only paper", "Food only", "Clothes"], 0, "The text says families put paper, glass and plastic in different bins.", "Bài đọc nói các gia đình bỏ giấy, thủy tinh và nhựa vào các thùng khác nhau.", pC],
  ["How many trees have the children planted?", ["Ten", "Fifteen", "Twenty", "Thirty"], 2, "The text says the children have planted twenty young trees.", "Bài đọc nói các bạn học sinh đã trồng hai mươi cây non.", pC],
  ["How often do the children water the trees?", ["Every day", "Every week", "Every month", "Never"], 1, "The text says they water them every week.", "Bài đọc nói các bạn tưới cây mỗi tuần.", pC],
  ["What do the children do when they leave a room?", ["Close the window", "Switch off the lights", "Open the door", "Turn on the fan"], 1, "The text says they switch off the lights when they leave a room.", "Bài đọc nói các bạn tắt đèn khi ra khỏi phòng.", pC],
  ["Why did the school win a green prize?", ["For saving the most water", "For the best garden", "For a science test", "For a sports day"], 0, "The text says the school won a green prize for saving the most water.", "Bài đọc nói trường thắng giải xanh vì tiết kiệm nước nhiều nhất.", pC],
  ["What does Nam think about small actions?", ["They are useless", "They become important when everybody does them", "They cost too much", "They are only for adults"], 1, "Nam says small actions become important when everybody does them together.", "Nam nói hành động nhỏ trở nên quan trọng khi mọi người cùng làm.", pC],
];

const ls: Tuple[] = [
  ["Which planet does the boy like best?", ["Mars", "Saturn", "Jupiter", "Venus"], 1, "He says Saturn is his favourite because of its rings.", "Cậu ấy nói Sao Thổ là hành tinh yêu thích vì có vành đai.", "Listen: 'Anna: Which planet do you like best? Ben: Saturn, because it has beautiful rings.'"],
  ["What time does the space film start?", ["Half past two", "Three o'clock", "Half past three", "Four o'clock"], 2, "The speaker says the film starts at half past three.", "Người nói cho biết bộ phim bắt đầu lúc ba giờ ba mươi.", "Listen: 'The space film starts at half past three in the big room.'"],
  ["What did the class see through the telescope?", ["The Moon", "A comet", "A rocket", "A cloud"], 0, "The class saw the Moon through the telescope.", "Lớp đã nhìn thấy Mặt Trăng qua kính viễn vọng.", "Listen: 'Through the telescope we could see the Moon very clearly.'"],
  ["How many students are in the space club?", ["Twelve", "Fourteen", "Sixteen", "Twenty"], 1, "The speaker says fourteen students are in the club.", "Người nói cho biết câu lạc bộ có mười bốn học sinh.", "Listen: 'There are fourteen students in our space club this year.'"],
  ["What does the girl want to be?", ["A pilot", "An astronaut", "A teacher", "A scientist"], 1, "She says she wants to be an astronaut.", "Bạn ấy nói mình muốn trở thành nhà du hành vũ trụ.", "Listen: 'When I finish school, I want to be an astronaut.'"],
  ["Where is the school recycling box?", ["Near the gate", "Next to the library", "In the playground", "In the kitchen"], 1, "The box is next to the library.", "Thùng tái chế nằm cạnh thư viện.", "Listen: 'Please put your paper in the recycling box next to the library.'"],
  ["What does the teacher ask them to bring?", ["A notebook", "Old newspapers", "A camera", "A snack"], 1, "The teacher asks them to bring old newspapers.", "Giáo viên yêu cầu các bạn mang báo cũ đến.", "Listen: 'For tomorrow's project, please bring some old newspapers.'"],
  ["How do the children usually come to school?", ["By car", "By bike", "By bus", "By train"], 1, "The speaker says they usually come by bike.", "Người nói cho biết các bạn thường đi xe đạp đến trường.", "Listen: 'Most of the children in my class come to school by bike.'"],
  ["What is the weather like on the day of the trip?", ["Rainy", "Cloudy", "Clear", "Snowy"], 2, "The speaker says the sky is clear.", "Người nói cho biết trời quang mây.", "Listen: 'The sky is clear today, so we will see many stars tonight.'"],
  ["What will they do after the film?", ["Draw the planets", "Go home", "Have a test", "Play football"], 0, "They will draw the planets after the film.", "Sau phim các bạn sẽ vẽ các hành tinh.", "Listen: 'After the film, we will draw the planets in our notebooks.'"],
];

const flyers15: CambridgeMockExam = {
  id: "cambridge-flyers-15",
  title: "Flyers Mock Test 15 - Space & Our Planet",
  titleVi: "Đề thi thử Flyers 15 - Không gian & Hành tinh của chúng ta",
  level: "flyers",
  duration: 30,
  totalQuestions: 28,
  questions: build(rw, ls),
};

export const cambridgeExamsFlyers15: CambridgeMockExam[] = [flyers15];
