/**
 * @file cambridgeExamsMovers15.ts
 * @description One Cambridge Movers (A1) mock exam, test 15.
 *              Theme: Weather & Seasons. 15 Reading & Writing questions
 *              (two reading groups) and 10 Listening questions.
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
  "In my town the weather changes a lot. In summer it is hot and sunny, so we go swimming in the lake. In autumn the leaves turn yellow and brown, and the wind is strong. In winter it often snows and we wear thick coats, hats and gloves. My favourite season is spring because the flowers come out and the birds sing in the morning. Last spring my sister and I planted a small tree in our garden.";
const pB =
  "Yesterday it rained all morning, so Tom and his brother stayed at home. They played a board game and made hot chocolate in the kitchen. In the afternoon the sun came out, so they put on their boots and went to the park. The grass was wet, but the sky was clear and there was a beautiful rainbow. They took a photo of it and sent it to their grandmother. She said it was the best photo of the week.";

const rw: Tuple[] = [
  ["What do they do in summer?", ["Go swimming in the lake", "Wear thick coats", "Plant a tree", "Play in the snow"], 0, "The text says in summer it is hot and sunny, so they go swimming in the lake.", "Bài đọc nói vào mùa hè trời nóng nên họ đi bơi ở hồ.", pA],
  ["What happens to the leaves in autumn?", ["They turn green", "They turn yellow and brown", "They fall in summer", "Nothing changes"], 1, "The text says the leaves turn yellow and brown in autumn.", "Bài đọc nói lá cây chuyển sang màu vàng và nâu vào mùa thu.", pA],
  ["What is the weather like in autumn?", ["Very hot", "Windy", "Snowy", "Foggy every day"], 1, "The text says 'the wind is strong' in autumn.", "Bài đọc nói gió mạnh vào mùa thu.", pA],
  ["What do they wear in winter?", ["Shorts and sandals", "Coats, hats and gloves", "Swimming clothes", "Only a shirt"], 1, "The text says they wear thick coats, hats and gloves in winter.", "Bài đọc nói họ mặc áo khoác dày, mũ và găng tay vào mùa đông.", pA],
  ["Why is spring the writer's favourite season?", ["It snows", "Flowers come out and birds sing", "It is very hot", "School is closed"], 1, "The text says spring is best because the flowers come out and the birds sing.", "Bài đọc nói mùa xuân đẹp nhất vì hoa nở và chim hát.", pA],
  ["What did the writer plant last spring?", ["A flower", "A small tree", "Some grass", "A bush"], 1, "The text says they planted a small tree in the garden.", "Bài đọc nói họ đã trồng một cây nhỏ trong vườn.", pA],
  ["Why did Tom stay at home in the morning?", ["He was ill", "It rained", "It was too hot", "He had homework"], 1, "The text says it rained all morning, so they stayed at home.", "Bài đọc nói trời mưa cả buổi sáng nên họ ở nhà.", pB],
  ["What did the brothers make?", ["Hot chocolate", "A cake", "Soup", "Ice cream"], 0, "The text says they made hot chocolate in the kitchen.", "Bài đọc nói họ đã làm sô cô la nóng trong nhà bếp.", pB],
  ["Where did they go in the afternoon?", ["To school", "To the park", "To the lake", "To a shop"], 1, "The text says they went to the park in the afternoon.", "Bài đọc nói buổi chiều họ đã đến công viên.", pB],
  ["What did they see in the sky?", ["Snow", "A rainbow", "A plane", "Dark clouds"], 1, "The text says 'there was a beautiful rainbow'.", "Bài đọc nói có một chiếc cầu vồng rất đẹp.", pB],
  ["Who did they send the photo to?", ["Their teacher", "Their grandmother", "Their cousin", "Their friend"], 1, "The text says they sent the photo to their grandmother.", "Bài đọc nói họ đã gửi ảnh cho bà của mình.", pB],
  ["It is raining, so take your ___.", ["umbrella", "sunglasses", "swimsuit", "fan"], 0, "We take an umbrella when it rains.", "Chúng ta mang dù khi trời mưa.", undefined],
  ["Which season comes after winter?", ["Autumn", "Spring", "Summer", "August"], 1, "Spring comes after winter.", "Mùa xuân đến sau mùa đông.", undefined],
  ["When it is very cold, water becomes ___.", ["ice", "steam", "sand", "smoke"], 0, "Water becomes ice when it is very cold.", "Nước biến thành băng khi trời rất lạnh.", undefined],
  ["Yesterday the wind ___ very strong.", ["is", "was", "are", "be"], 1, "'Yesterday' needs the past form 'was'.", "'Yesterday' cần thì quá khứ nên dùng 'was'.", undefined],
];

const ls: Tuple[] = [
  ["What is the weather like today?", ["Rainy", "Sunny and warm", "Snowy", "Very windy"], 1, "The speaker says it is sunny and warm today.", "Người nói cho biết hôm nay trời nắng và ấm.", "Listen: 'It is sunny and warm today, so we can eat outside.'"],
  ["What must Kim take to school?", ["A hat", "An umbrella", "A ball", "Sunglasses"], 1, "Mum tells Kim to take an umbrella because of the rain.", "Mẹ nhắc Kim mang dù vì trời mưa.", "Listen: 'Kim, take your umbrella. It is going to rain later.'"],
  ["What season is it in the story?", ["Spring", "Summer", "Autumn", "Winter"], 3, "The speaker talks about snow and a snowman, so it is winter.", "Người nói kể về tuyết và người tuyết nên đó là mùa đông.", "Listen: 'There is a lot of snow, so we are making a big snowman.'"],
  ["How many days did it rain?", ["Two", "Three", "Four", "Five"], 1, "The speaker says it rained for three days.", "Người nói cho biết trời mưa suốt ba ngày.", "Listen: 'It rained for three days, but now the sky is clear.'"],
  ["Where are they going at the weekend?", ["To the beach", "To the mountains", "To the zoo", "To the cinema"], 0, "They are going to the beach because it will be hot.", "Họ sẽ đi biển vì trời sẽ nóng.", "Listen: 'It will be hot at the weekend, so we are going to the beach.'"],
  ["What does the girl wear when it is cold?", ["Sandals", "A scarf and gloves", "A swimsuit", "A cap only"], 1, "She wears a scarf and gloves when it is cold.", "Bạn ấy đeo khăn và găng tay khi trời lạnh.", "Listen: 'When it is cold I wear my scarf and my warm gloves.'"],
  ["What did they see after the rain?", ["A rainbow", "Stars", "The moon", "Snow"], 0, "They saw a rainbow after the rain.", "Họ đã thấy cầu vồng sau cơn mưa.", "Listen: 'After the rain we saw a big rainbow above the trees.'"],
  ["Why can't they play football?", ["It is too windy", "The ground is wet", "They have no ball", "It is dark"], 1, "The speaker says the ground is too wet.", "Người nói cho biết sân quá ướt.", "Listen: 'We cannot play football because the ground is too wet.'"],
  ["What is the temperature today?", ["10 degrees", "15 degrees", "20 degrees", "30 degrees"], 3, "The speaker says it is thirty degrees.", "Người nói cho biết nhiệt độ là ba mươi độ.", "Listen: 'Today it is thirty degrees. That is very hot for our town.'"],
  ["What is Grandma's favourite season?", ["Spring", "Summer", "Autumn", "Winter"], 2, "Grandma likes autumn best because of the colours.", "Bà thích mùa thu nhất vì màu sắc của lá.", "Listen: 'Grandma likes autumn best because the leaves have lovely colours.'"],
];

const movers15: CambridgeMockExam = {
  id: "cambridge-movers-15",
  title: "Movers Mock Test 15 - Weather & Seasons",
  titleVi: "Đề thi thử Movers 15 - Thời tiết & Các mùa",
  level: "movers",
  duration: 25,
  totalQuestions: 25,
  questions: build(rw, ls),
};

export const cambridgeExamsMovers15: CambridgeMockExam[] = [movers15];
