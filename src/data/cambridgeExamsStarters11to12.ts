/**
 * @file cambridgeExamsStarters11to12.ts
 * @description Two Cambridge Starters (Pre-A1) mock exams, tests 11 and 12.
 *              Themes: 11 - Toys & Playground; 12 - Clothes & Weather.
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
/* STARTERS 11 - Toys & Playground                                */
/* ============================================================= */
const p11a =
  "This is my toy box. I have a red ball, a blue car and a big teddy bear. My teddy bear is soft. I play with my ball in the garden.";
const p11b =
  "Look at the playground! There is a slide and a swing. Tom is on the slide. Kate is on the swing. They are happy. They like the playground.";
const p11c =
  "I have a new doll. She has a pink dress and yellow hair. I have a small kite too. On Sunday, I fly my kite in the park with my dad.";

const s11Rw: Tuple[] = [
  ["What colour is the ball?", ["Blue", "Red", "Green", "Yellow"], 1, "The passage says 'a red ball'.", "Đoạn văn nói 'a red ball' (một quả bóng màu đỏ).", p11a],
  ["What colour is the car?", ["Blue", "Red", "Pink", "Black"], 0, "The passage says 'a blue car'.", "Đoạn văn nói 'a blue car' (một chiếc xe màu xanh).", p11a],
  ["Is the teddy bear soft or hard?", ["Hard", "Soft", "Cold", "Big only"], 1, "The passage says 'My teddy bear is soft'.", "Đoạn văn nói 'My teddy bear is soft' (gấu bông của tôi mềm).", p11a],
  ["Where does the child play with the ball?", ["In the house", "In the garden", "In the school", "In the shop"], 1, "The passage says 'I play with my ball in the garden'.", "Đoạn văn nói 'I play with my ball in the garden' (tôi chơi bóng ở vườn).", p11a],
  ["What is in the toy box?", ["A book and a pen", "A ball, a car and a bear", "A cat and a dog", "A cup and a plate"], 1, "The toy box has a ball, a car and a teddy bear.", "Hộp đồ chơi có quả bóng, xe hơi và gấu bông.", p11a],
  ["Who is on the slide?", ["Kate", "Tom", "Dad", "Mum"], 1, "The passage says 'Tom is on the slide'.", "Đoạn văn nói 'Tom is on the slide' (Tom đang ở trên cầu trượt).", p11b],
  ["Who is on the swing?", ["Tom", "Kate", "The teacher", "Nobody"], 1, "The passage says 'Kate is on the swing'.", "Đoạn văn nói 'Kate is on the swing' (Kate đang ở trên xích đu).", p11b],
  ["How do Tom and Kate feel?", ["Sad", "Tired", "Happy", "Cold"], 2, "The passage says 'They are happy'.", "Đoạn văn nói 'They are happy' (họ rất vui).", p11b],
  ["What two things are in the playground?", ["A slide and a swing", "A car and a bike", "A book and a ball", "A table and a chair"], 0, "The playground has a slide and a swing.", "Sân chơi có cầu trượt và xích đu.", p11b],
  ["Do Tom and Kate like the playground?", ["No, they don't", "Yes, they do", "They are not there", "They are asleep"], 1, "The passage says 'They like the playground'.", "Đoạn văn nói 'They like the playground' (họ thích sân chơi).", p11b],
  ["What colour is the doll's dress?", ["Yellow", "Pink", "Blue", "Green"], 1, "The passage says 'She has a pink dress'.", "Đoạn văn nói 'She has a pink dress' (búp bê có váy màu hồng).", p11c],
  ["What colour is the doll's hair?", ["Black", "Brown", "Yellow", "Red"], 2, "The passage says 'yellow hair'.", "Đoạn văn nói 'yellow hair' (tóc màu vàng).", p11c],
  ["What small toy does the child have too?", ["A kite", "A drum", "A robot", "A puzzle"], 0, "The passage says 'I have a small kite too'.", "Đoạn văn nói 'I have a small kite too' (tôi cũng có một cái diều nhỏ).", p11c],
  ["When does the child fly the kite?", ["On Monday", "On Saturday", "On Sunday", "On Friday"], 2, "The passage says 'On Sunday, I fly my kite'.", "Đoạn văn nói 'On Sunday, I fly my kite' (vào Chủ nhật, tôi thả diều).", p11c],
  ["Who does the child fly the kite with?", ["Mum", "Dad", "Kate", "Tom"], 1, "The passage says 'I fly my kite in the park with my dad'.", "Đoạn văn nói 'I fly my kite in the park with my dad' (tôi thả diều ở công viên với bố).", p11c],
];
const s11Ls: Tuple[] = [
  ["What is the boy holding?", ["A ball", "A book", "A cup", "A bag"], 0, "The boy is holding a ball.", "Cậu bé đang cầm một quả bóng.", "Listen: 'Look, I have a ball in my hand.'"],
  ["What colour is the swing?", ["Green", "Red", "Blue", "Yellow"], 2, "The swing is blue.", "Cái xích đu màu xanh dương.", "Listen: 'The swing in the park is blue.'"],
  ["Where is the teddy bear?", ["On the bed", "On the chair", "In the box", "On the table"], 0, "The teddy bear is on the bed.", "Con gấu bông đang ở trên giường.", "Listen: 'My teddy bear is on the bed.'"],
  ["How many balloons does the girl have?", ["Two", "Three", "Four", "Five"], 1, "The girl has three balloons.", "Cô bé có ba quả bóng bay.", "Listen: 'I have three balloons, red, blue and green.'"],
  ["What does the boy want to play?", ["Football", "A kite game", "Hide and seek", "A puzzle"], 2, "The boy wants to play hide and seek.", "Cậu bé muốn chơi trốn tìm.", "Listen: 'Let's play hide and seek in the garden.'"],
  ["What is on the slide?", ["A cat", "A doll", "A ball", "A bag"], 1, "There is a doll on the slide.", "Có một con búp bê ở trên cầu trượt.", "Listen: 'There is a doll on the slide.'"],
  ["Where do the children play?", ["At home", "At the playground", "At the shop", "At school only"], 1, "The children play at the playground.", "Các bạn nhỏ chơi ở sân chơi.", "Listen: 'We play at the playground every afternoon.'"],
  ["What toy is under the table?", ["A car", "A drum", "A kite", "A robot"], 0, "The toy car is under the table.", "Chiếc xe đồ chơi ở dưới bàn.", "Listen: 'The toy car is under the table.'"],
  ["Who has the new bike?", ["Sam", "Ben", "Amy", "Dad"], 0, "Sam has the new bike.", "Sam có chiếc xe đạp mới.", "Listen: 'Sam has a new red bike.'"],
  ["What is the girl doing with the kite?", ["Drawing it", "Flying it", "Painting it", "Selling it"], 1, "The girl is flying the kite.", "Cô bé đang thả diều.", "Listen: 'Look, the girl is flying her kite in the park.'"],
];

const starters11: CambridgeMockExam = {
  id: "cambridge-starters-11",
  title: "Starters Mock Test 11 - Toys & Playground",
  titleVi: "Đề thi thử Starters 11 - Đồ chơi & Sân chơi",
  level: "starters",
  duration: 20,
  totalQuestions: 25,
  questions: build(s11Rw, s11Ls),
};

/* ============================================================= */
/* STARTERS 12 - Clothes & Weather                                 */
/* ============================================================= */
const p12a =
  "Today is cold and windy. I wear my warm coat, my hat and my gloves. My scarf is red. I like winter days.";
const p12b =
  "It is sunny today. Mum wears a yellow dress. I wear my blue shorts and my white T-shirt. We go to the park in the sun.";
const p12c =
  "It is raining now. Dad has a big umbrella. I wear my green boots and my raincoat. We walk to school in the rain.";

const s12Rw: Tuple[] = [
  ["What is the weather like today?", ["Hot and sunny", "Cold and windy", "Rainy and warm", "Snowy"], 1, "The passage says 'Today is cold and windy'.", "Đoạn văn nói 'Today is cold and windy' (hôm nay trời lạnh và có gió).", p12a],
  ["What colour is the scarf?", ["Blue", "Green", "Red", "Yellow"], 2, "The passage says 'My scarf is red'.", "Đoạn văn nói 'My scarf is red' (khăn quàng của tôi màu đỏ).", p12a],
  ["What three things does the writer wear?", ["A coat, a hat and gloves", "A dress and shoes", "Shorts and a T-shirt", "Boots and a raincoat"], 0, "The writer wears a coat, a hat and gloves.", "Người viết mặc áo khoác, đội mũ và đeo găng tay.", p12a],
  ["Does the writer like winter days?", ["No", "Yes", "Sometimes", "Not mentioned"], 1, "The passage says 'I like winter days'.", "Đoạn văn nói 'I like winter days' (tôi thích những ngày mùa đông).", p12a],
  ["Why does the writer wear a warm coat?", ["Because it is hot", "Because it is cold", "Because it is raining", "Because it is a party"], 1, "The writer wears a warm coat because it is cold and windy.", "Người viết mặc áo khoác ấm vì trời lạnh và có gió.", p12a],
  ["What colour is Mum's dress?", ["Yellow", "Pink", "Blue", "White"], 0, "The passage says 'Mum wears a yellow dress'.", "Đoạn văn nói 'Mum wears a yellow dress' (mẹ mặc váy màu vàng).", p12b],
  ["What does the writer wear on a sunny day?", ["A coat and boots", "Blue shorts and a white T-shirt", "A raincoat", "A scarf and gloves"], 1, "The writer wears blue shorts and a white T-shirt.", "Người viết mặc quần soóc xanh và áo phông trắng.", p12b],
  ["What is the weather like in this passage?", ["Sunny", "Rainy", "Snowy", "Windy"], 0, "The passage says 'It is sunny today'.", "Đoạn văn nói 'It is sunny today' (hôm nay trời nắng).", p12b],
  ["Where do they go in the sun?", ["To school", "To the park", "To the shop", "To the beach"], 1, "The passage says 'We go to the park in the sun'.", "Đoạn văn nói 'We go to the park in the sun' (chúng tôi đi công viên khi trời nắng).", p12b],
  ["What colour is the writer's T-shirt?", ["Blue", "Yellow", "White", "Green"], 2, "The passage says 'my white T-shirt'.", "Đoạn văn nói 'my white T-shirt' (áo phông trắng của tôi).", p12b],
  ["What is the weather like now?", ["Sunny", "Snowy", "Raining", "Windy only"], 2, "The passage says 'It is raining now'.", "Đoạn văn nói 'It is raining now' (trời đang mưa).", p12c],
  ["What does Dad have?", ["A hat", "A big umbrella", "A scarf", "A kite"], 1, "The passage says 'Dad has a big umbrella'.", "Đoạn văn nói 'Dad has a big umbrella' (bố có một cái ô to).", p12c],
  ["What colour are the writer's boots?", ["Red", "Green", "Yellow", "Black"], 1, "The passage says 'I wear my green boots'.", "Đoạn văn nói 'I wear my green boots' (tôi đi ủng màu xanh lá).", p12c],
  ["What does the writer wear with the boots?", ["A raincoat", "A dress", "Shorts", "A hat only"], 0, "The writer wears a raincoat with the boots.", "Người viết mặc áo mưa cùng với ủng.", p12c],
  ["How do they get to school in the rain?", ["By bus", "By car", "They walk", "By bike"], 2, "The passage says 'We walk to school in the rain'.", "Đoạn văn nói 'We walk to school in the rain' (chúng tôi đi bộ đến trường trong mưa).", p12c],
];
const s12Ls: Tuple[] = [
  ["What is the girl wearing on her head?", ["A hat", "A scarf", "Glasses", "Nothing"], 0, "The girl is wearing a hat.", "Cô bé đang đội một chiếc mũ.", "Listen: 'I am wearing a hat because it is cold.'"],
  ["What can you see outside now?", ["Sun", "Snow", "Rain", "Clouds"], 1, "The speaker says it is snowy outside.", "Người nói nói bên ngoài đang có tuyết.", "Listen: 'Look outside, it is snowy today!'"],
  ["What colour are the boy's shoes?", ["Black", "White", "Brown", "Red"], 3, "The boy's shoes are red.", "Giày của cậu bé màu đỏ.", "Listen: 'My new shoes are red.'"],
  ["What does the girl wear when it rains?", ["A sun hat", "A raincoat", "Shorts", "A swimsuit"], 1, "The girl wears a raincoat when it rains.", "Cô bé mặc áo mưa khi trời mưa.", "Listen: 'When it rains, I wear my yellow raincoat.'"],
  ["What is Dad putting on?", ["His coat", "His hat", "His gloves", "His scarf"], 0, "Dad is putting on his coat.", "Bố đang mặc áo khoác vào.", "Listen: 'Dad is putting on his warm coat now.'"],
  ["Is it hot or cold today?", ["Hot", "Cold", "Warm", "Not mentioned"], 1, "It is cold today.", "Hôm nay trời lạnh.", "Listen: 'Brr, it is very cold today.'"],
  ["What colour is the umbrella?", ["Blue", "Pink", "Green", "Black"], 2, "The umbrella is green.", "Cái ô màu xanh lá.", "Listen: 'I have a green umbrella for the rain.'"],
  ["What does the boy wear to the party?", ["Shorts", "A nice shirt", "Pyjamas", "A raincoat"], 1, "The boy wears a nice shirt to the party.", "Cậu bé mặc một chiếc áo sơ mi đẹp đến bữa tiệc.", "Listen: 'I am wearing a nice shirt for the party.'"],
  ["What is the weather like at the beach?", ["Cold", "Rainy", "Sunny", "Snowy"], 2, "The weather at the beach is sunny.", "Thời tiết ở bãi biển là nắng.", "Listen: 'At the beach today, it is sunny and warm.'"],
  ["What is the girl carrying because of the rain?", ["A bag", "An umbrella", "A book", "A ball"], 1, "The girl is carrying an umbrella because of the rain.", "Cô bé mang theo một cái ô vì trời mưa.", "Listen: 'I am carrying my umbrella because it might rain.'"],
];

const starters12: CambridgeMockExam = {
  id: "cambridge-starters-12",
  title: "Starters Mock Test 12 - Clothes & Weather",
  titleVi: "Đề thi thử Starters 12 - Quần áo & Thời tiết",
  level: "starters",
  duration: 20,
  totalQuestions: 25,
  questions: build(s12Rw, s12Ls),
};

export const cambridgeExamsStarters11to12: CambridgeMockExam[] = [starters11, starters12];
