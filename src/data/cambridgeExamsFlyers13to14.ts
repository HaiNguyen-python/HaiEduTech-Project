/**
 * @file cambridgeExamsFlyers13to14.ts
 * @description Two Cambridge Flyers (A2) mock exams, tests 13 and 14.
 *              Themes: 13 - Museums & Inventions; 14 - Farms & Healthy Food.
 *              Each exam has 18 Reading & Writing questions (three reading
 *              groups of 6, based on Flyers-length passages) and 10
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
/* FLYERS 13 - Museums & Inventions                                */
/* ============================================================= */
const p13a =
  "Last Saturday, our class visited the Science Museum in the city centre. We saw old machines, robots and a huge model of a rocket. Our guide, Mr. Chen, told us how the first cars were built more than a hundred years ago. My favourite room had computers from the past. Some of them were as big as a small car! We also watched a short film about famous inventors. Before we left, everyone bought a postcard from the museum shop. It was a fantastic school trip, and I learned so much about how technology has changed over time.";
const p13b =
  "Long ago, people had no telephones, no televisions and no aeroplanes. Then clever inventors began to change the world. Alexander Graham Bell invented the telephone, so people could talk to each other from far away. The Wright brothers built the first aeroplane that could really fly. Later, engineers made computers smaller and faster every year. Today, many children use tablets and smartphones every day. These modern inventions began as small ideas in someone's notebook. Inventors often try many times before their idea finally works. That is why we should never give up when something is difficult.";
const p13c =
  "Amy wants to be an inventor when she grows up. Every weekend, she builds small models from cardboard, string and old boxes. Last month, she made a model bridge for her school project. Her teacher was very impressed and gave her a prize. Amy keeps a special notebook where she draws her new ideas. She writes the date next to every drawing. Her favourite idea so far is a robot that can water the plants in her garden. Amy's parents are proud of her, and they helped her buy some tools for her next project.";

const f13Rw: Tuple[] = [
  ["Where did the class go last Saturday?", ["To a zoo", "To the Science Museum", "To a park", "To a farm"], 1, "The passage says the class visited the Science Museum in the city centre.", "Đoạn văn nói lớp học đã đến thăm Bảo tàng Khoa học ở trung tâm thành phố.", p13a],
  ["Who was the guide?", ["Mr. Chen", "The teacher", "A student", "Amy"], 0, "The passage says 'Our guide, Mr. Chen, told us how the first cars were built'.", "Đoạn văn nói 'Our guide, Mr. Chen' (hướng dẫn viên của chúng tôi, thầy Chen).", p13a],
  ["What was in the writer's favourite room?", ["Old cars", "Computers from the past", "Robots only", "Rockets"], 1, "The passage says 'My favourite room had computers from the past'.", "Đoạn văn nói 'My favourite room had computers from the past' (phòng yêu thích của tôi có máy tính từ thời xưa).", p13a],
  ["What did the class watch?", ["A short film about inventors", "A cartoon", "A sports match", "A cooking show"], 0, "The passage says 'We also watched a short film about famous inventors'.", "Đoạn văn nói lớp đã xem một bộ phim ngắn về các nhà phát minh nổi tiếng.", p13a],
  ["What did everyone buy before leaving?", ["A toy robot", "A postcard", "A book", "A ticket"], 1, "The passage says 'everyone bought a postcard from the museum shop'.", "Đoạn văn nói mọi người đã mua một tấm bưu thiếp từ cửa hàng bảo tàng.", p13a],
  ["How did the writer feel about the trip?", ["Bored", "It was fantastic", "Scared", "Angry"], 1, "The passage says 'It was a fantastic school trip'.", "Đoạn văn nói 'It was a fantastic school trip' (đó là một chuyến đi học tuyệt vời).", p13a],
  ["Who invented the telephone?", ["The Wright brothers", "Alexander Graham Bell", "A museum guide", "Amy"], 1, "The passage says 'Alexander Graham Bell invented the telephone'.", "Đoạn văn nói 'Alexander Graham Bell invented the telephone' (Bell đã phát minh ra điện thoại).", p13b],
  ["What did the Wright brothers build?", ["A telephone", "The first aeroplane", "A computer", "A television"], 1, "The passage says 'The Wright brothers built the first aeroplane that could really fly'.", "Đoạn văn nói 'The Wright brothers built the first aeroplane' (anh em nhà Wright đã chế tạo máy bay đầu tiên).", p13b],
  ["What do many children use today?", ["Radios only", "Tablets and smartphones", "Old computers", "Telephones with wires"], 1, "The passage says 'many children use tablets and smartphones every day'.", "Đoạn văn nói nhiều trẻ em ngày nay dùng máy tính bảng và điện thoại thông minh.", p13b],
  ["Where did modern inventions begin?", ["In a factory", "As small ideas in a notebook", "In a museum", "On television"], 1, "The passage says 'These modern inventions began as small ideas in someone's notebook'.", "Đoạn văn nói những phát minh hiện đại bắt đầu từ những ý tưởng nhỏ trong một cuốn sổ tay.", p13b],
  ["What do inventors often do before an idea works?", ["Give up quickly", "Try many times", "Ask a friend to finish", "Sell the idea"], 1, "The passage says 'Inventors often try many times before their idea finally works'.", "Đoạn văn nói các nhà phát minh thường thử nhiều lần trước khi ý tưởng thành công.", p13b],
  ["What is the lesson at the end of the passage?", ["We should never give up", "We should stop trying", "Inventions are not useful", "Telephones are old"], 0, "The passage ends 'we should never give up when something is difficult'.", "Đoạn văn kết thúc bằng 'we should never give up' (chúng ta không nên bỏ cuộc).", p13b],
  ["What does Amy want to be?", ["A teacher", "An inventor", "A doctor", "A guide"], 1, "The passage says 'Amy wants to be an inventor when she grows up'.", "Đoạn văn nói Amy muốn trở thành nhà phát minh khi lớn lên.", p13c],
  ["What does Amy build every weekend?", ["Small models from cardboard", "Real cars", "Paintings", "Songs"], 0, "The passage says 'she builds small models from cardboard, string and old boxes'.", "Đoạn văn nói cô ấy làm những mô hình nhỏ từ bìa cứng, dây và hộp cũ.", p13c],
  ["What did Amy make last month?", ["A robot", "A model bridge", "A telephone", "A rocket"], 1, "The passage says 'Last month, she made a model bridge for her school project'.", "Đoạn văn nói tháng trước cô ấy đã làm một mô hình cây cầu.", p13c],
  ["What does Amy write next to her drawings?", ["Her name only", "The date", "A price", "A colour"], 1, "The passage says 'She writes the date next to every drawing'.", "Đoạn văn nói cô ấy viết ngày tháng bên cạnh mỗi bức vẽ.", p13c],
  ["What is Amy's favourite idea so far?", ["A flying car", "A robot that waters plants", "A talking phone", "A new bridge design"], 1, "The passage says 'Her favourite idea so far is a robot that can water the plants in her garden'.", "Đoạn văn nói ý tưởng yêu thích của cô ấy là một con robot có thể tưới cây trong vườn.", p13c],
  ["How do Amy's parents feel?", ["Angry", "Proud", "Worried", "Bored"], 1, "The passage says 'Amy's parents are proud of her'.", "Đoạn văn nói bố mẹ Amy rất tự hào về cô ấy.", p13c],
];
const f13Ls: Tuple[] = [
  ["Anna: What did you see at the museum? Ben: I saw a huge rocket model. What did the boy see at the museum?", ["A robot", "A rocket model", "A painting", "A car"], 1, "Ben says he saw a huge rocket model.", "Ben nói cậu ấy đã nhìn thấy một mô hình tên lửa lớn.", "Listen: 'Anna: What did you see at the museum? Ben: I saw a huge rocket model.'"],
  ["Anna: Who invented the telephone? Ben: Alexander Graham Bell did. Who invented the telephone?", ["Ben", "A teacher", "Alexander Graham Bell", "Anna"], 2, "Ben answers that Alexander Graham Bell invented the telephone.", "Ben trả lời rằng Alexander Graham Bell đã phát minh ra điện thoại.", "Listen: 'Anna: Who invented the telephone? Ben: Alexander Graham Bell did.'"],
  ["Anna: What are you building today? Ben: A model bridge from cardboard. What is Ben building?", ["A robot", "A model bridge", "A toy car", "A kite"], 1, "Ben says he is building a model bridge from cardboard.", "Ben nói cậu ấy đang làm một mô hình cây cầu từ bìa cứng.", "Listen: 'Anna: What are you building today? Ben: A model bridge from cardboard.'"],
  ["Anna: Where is the museum shop? Ben: It's next to the rocket room. Where is the museum shop?", ["Near the entrance", "Next to the rocket room", "Upstairs", "Outside the museum"], 1, "Ben says the shop is next to the rocket room.", "Ben nói cửa hàng nằm cạnh phòng tên lửa.", "Listen: 'Anna: Where is the museum shop? Ben: It's next to the rocket room.'"],
  ["Anna: How many old computers did you count? Ben: I counted five big ones. How many old computers did Ben count?", ["Three", "Four", "Five", "Six"], 2, "Ben says he counted five big old computers.", "Ben nói cậu ấy đếm được năm chiếc máy tính cũ lớn.", "Listen: 'Anna: How many old computers did you count? Ben: I counted five big ones.'"],
  ["Anna: What did the guide talk about? Ben: How the first cars were built. What did the guide talk about?", ["Aeroplanes", "How the first cars were built", "Robots", "Telephones"], 1, "Ben says the guide talked about how the first cars were built.", "Ben nói hướng dẫn viên đã nói về cách những chiếc xe hơi đầu tiên được chế tạo.", "Listen: 'Anna: What did the guide talk about? Ben: How the first cars were built.'"],
  ["Anna: What does Amy keep her ideas in? Ben: A special notebook. What does Amy keep her ideas in?", ["A folder", "A special notebook", "A computer", "A box"], 1, "Ben says Amy keeps her ideas in a special notebook.", "Ben nói Amy giữ ý tưởng trong một cuốn sổ đặc biệt.", "Listen: 'Anna: What does Amy keep her ideas in? Ben: A special notebook.'"],
  ["Anna: Who built the first aeroplane? Ben: The Wright brothers did. Who built the first aeroplane?", ["Alexander Graham Bell", "The Wright brothers", "Mr. Chen", "Amy"], 1, "Ben says the Wright brothers built the first aeroplane.", "Ben nói anh em nhà Wright đã chế tạo máy bay đầu tiên.", "Listen: 'Anna: Who built the first aeroplane? Ben: The Wright brothers did.'"],
  ["Anna: What prize did Amy get? Ben: A prize for her bridge project. What did Amy win a prize for?", ["A drawing", "Her bridge project", "A song", "A story"], 1, "Ben says Amy got a prize for her bridge project.", "Ben nói Amy được thưởng vì dự án cây cầu của mình.", "Listen: 'Anna: What prize did Amy get? Ben: A prize for her bridge project.'"],
  ["Anna: What tool did Amy's parents buy her? Ben: A small tool set for models. What did Amy's parents buy her?", ["A tablet", "A small tool set", "A telephone", "A rocket toy"], 1, "Ben says Amy's parents bought her a small tool set for models.", "Ben nói bố mẹ Amy đã mua cho cô ấy một bộ dụng cụ nhỏ để làm mô hình.", "Listen: 'Anna: What tool did Amy's parents buy her? Ben: A small tool set for models.'"],
];

const flyers13: CambridgeMockExam = {
  id: "cambridge-flyers-13",
  title: "Flyers Mock Test 13 - Museums & Inventions",
  titleVi: "Đề thi thử Flyers 13 - Bảo tàng & Phát minh",
  level: "flyers",
  duration: 30,
  totalQuestions: 28,
  questions: build(f13Rw, f13Ls),
};

/* ============================================================= */
/* FLYERS 14 - Farms & Healthy Food                                 */
/* ============================================================= */
const p14a =
  "Every summer, my family visits my grandparents' farm in the countryside. My grandfather grows carrots, tomatoes and potatoes in a big field. My grandmother keeps chickens and cows near the old red barn. In the morning, I help collect fresh eggs before breakfast. We drink fresh milk from the cows and eat vegetables straight from the garden. My grandmother says that fresh food from the farm is much healthier than food from a shop. In the evening, we sit outside and watch the sun go down over the fields. I always feel happy and relaxed after a week on the farm.";
const p14b =
  "Doctors say that children should eat five pieces of fruit and vegetables every day. Fruit and vegetables give our bodies important vitamins to stay strong and healthy. Apples, bananas and oranges are easy to carry to school for lunch. Carrots and peppers make a crunchy, colourful snack. Drinking water instead of sugary drinks also helps our bodies work well. Exercise is important too, so children should play outside or do sport every day. Sleeping enough hours at night helps the body grow and rest. If children eat well, drink water, exercise and sleep enough, they will feel strong and full of energy.";
const p14c =
  "Last week, our school had a Healthy Food Day. Every class brought fruit and vegetables to share at lunchtime. Miss Parker's class made a huge fruit salad with strawberries, grapes and melon. Mr. Kim's class prepared vegetable soup with carrots, potatoes and peas. There was also a competition to guess how many different vegetables were in a big basket. The winner got a special certificate and a small prize. At the end of the day, a nurse talked to us about why fresh food helps us grow strong. Everyone agreed that Healthy Food Day was one of the best days of the term.";

const f14Rw: Tuple[] = [
  ["Where does the writer's family go every summer?", ["To the seaside", "To grandparents' farm", "To a big city", "To another country"], 1, "The passage says the family visits my grandparents' farm in the countryside.", "Đoạn văn nói gia đình đến thăm trang trại của ông bà ở vùng nông thôn.", p14a],
  ["What does grandfather grow in the field?", ["Flowers", "Carrots, tomatoes and potatoes", "Trees", "Rice only"], 1, "The passage says grandfather grows carrots, tomatoes and potatoes.", "Đoạn văn nói ông trồng cà rốt, cà chua và khoai tây.", p14a],
  ["What does the writer help collect in the morning?", ["Milk bottles", "Fresh eggs", "Vegetables only", "Wood"], 1, "The passage says 'I help collect fresh eggs before breakfast'.", "Đoạn văn nói 'I help collect fresh eggs before breakfast' (tôi giúp thu nhặt trứng tươi trước bữa sáng).", p14a],
  ["What does the family drink from the cows?", ["Juice", "Fresh milk", "Tea", "Soup"], 1, "The passage says 'We drink fresh milk from the cows'.", "Đoạn văn nói 'We drink fresh milk from the cows' (chúng tôi uống sữa tươi từ bò).", p14a],
  ["What does grandmother say about farm food?", ["It is too expensive", "It is healthier than shop food", "It tastes bad", "It is difficult to grow"], 1, "The passage says farm food is 'much healthier than food from a shop'.", "Đoạn văn nói thức ăn từ trang trại 'lành mạnh hơn nhiều so với thức ăn mua ở cửa hàng'.", p14a],
  ["How does the writer feel after a week on the farm?", ["Tired and sad", "Happy and relaxed", "Bored", "Worried"], 1, "The passage says 'I always feel happy and relaxed after a week on the farm'.", "Đoạn văn nói người viết luôn cảm thấy vui vẻ và thư giãn sau một tuần ở trang trại.", p14a],
  ["How many pieces of fruit and vegetables should children eat every day?", ["Three", "Four", "Five", "Ten"], 2, "The passage says children should eat five pieces of fruit and vegetables every day.", "Đoạn văn nói trẻ em nên ăn năm phần trái cây và rau củ mỗi ngày.", p14b],
  ["What do fruit and vegetables give our bodies?", ["Sugar only", "Important vitamins", "Extra weight", "Nothing useful"], 1, "The passage says fruit and vegetables give our bodies important vitamins.", "Đoạn văn nói trái cây và rau củ cung cấp cho cơ thể những vitamin quan trọng.", p14b),
];
