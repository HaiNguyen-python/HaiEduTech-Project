/**
 * @file cambridgeExamsStarters6to10.ts
 * @description 5 further Cambridge Starters mock exams. Themes: 6 - My Day & Time;
 *              7 - The House & Rooms; 8 - Body & Health; 9 - Clothes & Shopping;
 *              10 - Sports & Playground.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { CambridgeMockExam, CambridgeMockQuestion } from "./cambridgeMockExamData";

type Tuple = [question: string, options: string[], correct: number, explanation: string, explanationVi: string, passage?: string];

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

/* ===================== STARTERS 6 - My Day & Time ===================== */
const s6Passage1 =
  "I get up at seven o'clock. I eat breakfast with my mum and dad. Then I go to school by bus. School starts at eight thirty.";
const s6Passage2 =
  "In the evening, I do my homework. Then I play with my dog. I eat dinner at six o'clock. I go to bed at eight o'clock.";

const s6Rw: Tuple[] = [
  ["I get up at seven ___ the morning.", ["in", "on", "at", "for"], 0, "We say 'in the morning' for parts of the day.", "Ta nói 'in the morning' khi nói về buổi sáng."],
  ["What time do you eat breakfast?", ["with my mum and dad", "yes, I do", "no, thanks", "school"], 0, "The passage says she eats breakfast with mum and dad.", "Đoạn văn nói bạn ấy ăn sáng cùng bố mẹ."],
  ["How does the girl go to school?", ["by car", "by bus", "by bike", "on foot"], 1, "The text says she goes to school by bus.", "Bài đọc nói bạn ấy đi học bằng xe buýt.", s6Passage1],
  ["What time does breakfast happen?", ["before school", "after school", "at night", "on Sunday"], 0, "Breakfast comes before school starts.", "Bữa sáng diễn ra trước khi đến trường.", s6Passage1],
  ["Who does she eat breakfast with?", ["her friends", "her teacher", "her mum and dad", "her dog"], 2, "She eats breakfast with her mum and dad.", "Bạn ấy ăn sáng cùng bố và mẹ.", s6Passage1],
  ["What time does school start?", ["seven o'clock", "eight o'clock", "eight thirty", "nine o'clock"], 2, "School starts at eight thirty.", "Trường học bắt đầu lúc tám giờ ba mươi.", s6Passage1],
  ["What does she do first in the morning?", ["go to school", "get up", "eat dinner", "play"], 1, "She gets up first, at seven o'clock.", "Bạn ấy thức dậy trước tiên, lúc bảy giờ.", s6Passage1],
  ["What does she do after homework?", ["go to school", "eat breakfast", "play with her dog", "get up"], 2, "After homework she plays with her dog.", "Sau khi làm bài tập, bạn ấy chơi với chó.", s6Passage2],
  ["What time does she eat dinner?", ["five o'clock", "six o'clock", "seven o'clock", "eight o'clock"], 1, "Dinner is at six o'clock.", "Bữa tối lúc sáu giờ.", s6Passage2],
  ["What time does she go to bed?", ["six o'clock", "seven o'clock", "eight o'clock", "nine o'clock"], 2, "She goes to bed at eight o'clock.", "Bạn ấy đi ngủ lúc tám giờ.", s6Passage2],
  ["What does she do in the evening first?", ["play with her dog", "eat dinner", "do homework", "go to bed"], 2, "Homework comes first in the evening.", "Làm bài tập là việc đầu tiên vào buổi tối.", s6Passage2],
  ["Which day comes after Monday?", ["Sunday", "Tuesday", "Friday", "Saturday"], 1, "Tuesday comes right after Monday.", "Thứ Ba đến ngay sau thứ Hai."],
  ["What do we say when it is 12 o'clock in the day?", ["midnight", "morning", "midday", "evening"], 2, "12 o'clock in the day is midday.", "12 giờ ban ngày gọi là giữa trưa."],
  ["I wake up ___ the morning.", ["in", "at", "on", "of"], 0, "'In the morning' is the correct phrase.", "'In the morning' là cụm từ đúng."],
  ["Which is a day of the week?", ["Monday", "January", "Summer", "Six"], 0, "Monday is a day of the week.", "Thứ Hai là một ngày trong tuần."],
];
const s6Ls: Tuple[] = [
  ["What time does Tom get up?", ["six o'clock", "seven o'clock", "eight o'clock", "nine o'clock"], 1, "Tom gets up at seven o'clock.", "Tom thức dậy lúc bảy giờ.", "Listen: 'Every day Tom gets up at seven o'clock and eats breakfast.'"],
  ["When does Ann do her homework?", ["morning", "afternoon", "evening", "night"], 2, "Ann does homework in the evening.", "Ann làm bài tập vào buổi tối.", "Listen: 'Ann does her homework in the evening before dinner.'"],
  ["What day is it today?", ["Monday", "Tuesday", "Wednesday", "Thursday"], 0, "Today is Monday.", "Hôm nay là thứ Hai.", "Listen: 'Today is Monday, so we have music class.'"],
  ["What time does the film start?", ["four o'clock", "five o'clock", "six o'clock", "seven o'clock"], 2, "The film starts at six o'clock.", "Bộ phim bắt đầu lúc sáu giờ.", "Listen: 'The film starts at six o'clock this evening.'"],
  ["When does Lily go swimming?", ["Monday", "Wednesday", "Friday", "Sunday"], 2, "Lily goes swimming on Friday.", "Lily đi bơi vào thứ Sáu.", "Listen: 'Lily goes swimming every Friday after school.'"],
  ["What time is it now?", ["half past two", "half past three", "half past four", "half past five"], 1, "It is half past three now.", "Bây giờ là ba giờ rưỡi.", "Listen: 'Look at the clock. It is half past three now.'"],
  ["When does the family eat dinner?", ["five o'clock", "six o'clock", "seven o'clock", "eight o'clock"], 2, "They eat dinner at seven o'clock.", "Gia đình ăn tối lúc bảy giờ.", "Listen: 'We always eat dinner at seven o'clock together.'"],
  ["What does Sam do on Saturday morning?", ["plays football", "reads a book", "washes the car", "cleans his room"], 0, "Sam plays football on Saturday morning.", "Sam chơi bóng đá vào sáng thứ Bảy.", "Listen: 'On Saturday morning, Sam plays football with his friends.'"],
  ["What time does school finish?", ["two o'clock", "three o'clock", "four o'clock", "five o'clock"], 1, "School finishes at three o'clock.", "Trường học kết thúc lúc ba giờ.", "Listen: 'Our school finishes at three o'clock every day.'"],
  ["When is Grandma's birthday?", ["Monday", "Tuesday", "Wednesday", "Sunday"], 3, "Grandma's birthday is on Sunday.", "Sinh nhật của bà vào Chủ nhật.", "Listen: 'Grandma's birthday is on Sunday. We will make a cake.'"],
];

const starters6: CambridgeMockExam = {
  id: "cambridge-starters-6",
  title: "Starters Mock Test 6 - My Day & Time",
  titleVi: "Đề thi thử Starters 6 - Một ngày của tôi & Thời gian",
  level: "starters",
  duration: 20,
  totalQuestions: 25,
  questions: build(s6Rw, s6Ls),
};

/* ===================== STARTERS 7 - The House & Rooms ===================== */
const s7Passage1 =
  "This is my house. It has a kitchen, a living room and two bedrooms. My bedroom is small but I like it. There is a garden too.";
const s7Passage2 =
  "In the kitchen there is a table and four chairs. We eat food in the kitchen. There is a fridge and a big window with flowers.";

const s7Rw: Tuple[] = [
  ["We cook food in the ___.", ["bedroom", "kitchen", "bathroom", "garden"], 1, "We cook food in the kitchen.", "Chúng ta nấu ăn trong bếp."],
  ["We sleep in the ___.", ["bathroom", "kitchen", "bedroom", "garage"], 2, "We sleep in the bedroom.", "Chúng ta ngủ trong phòng ngủ."],
  ["How many bedrooms does the house have?", ["one", "two", "three", "four"], 1, "The house has two bedrooms.", "Ngôi nhà có hai phòng ngủ.", s7Passage1],
  ["What rooms does the house have?", ["only bedrooms", "kitchen, living room and bedrooms", "only a garden", "a shop"], 1, "It has a kitchen, living room and bedrooms.", "Nhà có bếp, phòng khách và phòng ngủ.", s7Passage1],
  ["Is the bedroom big or small?", ["big", "small", "very big", "we don't know"], 1, "The bedroom is small.", "Phòng ngủ nhỏ.", s7Passage1],
  ["What is outside the house?", ["a garden", "a shop", "a school", "a river"], 0, "There is a garden.", "Có một khu vườn.", s7Passage1],
  ["How does the girl feel about her bedroom?", ["she doesn't like it", "she likes it", "she is scared", "she is bored"], 1, "She says 'I like it'.", "Bạn ấy nói mình thích căn phòng đó.", s7Passage1],
  ["What is in the kitchen?", ["a bed", "a table and four chairs", "a sofa", "a car"], 1, "There is a table and four chairs.", "Có một cái bàn và bốn cái ghế.", s7Passage2],
  ["Where do they eat food?", ["in the bedroom", "in the garden", "in the kitchen", "in the bathroom"], 2, "They eat food in the kitchen.", "Họ ăn trong bếp.", s7Passage2],
  ["What is near the window?", ["flowers", "a car", "a bed", "a dog"], 0, "There is a big window with flowers.", "Có cửa sổ lớn với hoa.", s7Passage2],
  ["What keeps food cold in the kitchen?", ["a table", "a chair", "a fridge", "a window"], 2, "There is a fridge in the kitchen.", "Có tủ lạnh trong bếp.", s7Passage2],
  ["We wash our hands in the ___.", ["kitchen", "bathroom", "garden", "bedroom"], 1, "We wash hands in the bathroom.", "Chúng ta rửa tay trong phòng tắm."],
  ["We watch TV in the ___.", ["bathroom", "living room", "garage", "garden"], 1, "We watch TV in the living room.", "Chúng ta xem TV trong phòng khách."],
  ["Which is furniture?", ["chair", "flower", "dog", "rain"], 0, "A chair is furniture.", "Ghế là đồ nội thất."],
  ["Flowers grow in the ___.", ["garden", "fridge", "bathroom", "bedroom"], 0, "Flowers grow in the garden.", "Hoa mọc trong vườn."],
];
const s7Ls: Tuple[] = [
  ["Where is the cat sleeping?", ["on the bed", "in the kitchen", "in the garden", "on the sofa"], 0, "The cat is sleeping on the bed.", "Con mèo đang ngủ trên giường.", "Listen: 'Look, the cat is sleeping on the bed in my room.'"],
  ["How many chairs are in the kitchen?", ["two", "three", "four", "five"], 2, "There are four chairs.", "Có bốn cái ghế.", "Listen: 'We have four chairs and one table in the kitchen.'"],
  ["Where is Dad?", ["in the garden", "in the kitchen", "in the bathroom", "in the bedroom"], 0, "Dad is in the garden.", "Bố đang ở trong vườn.", "Listen: 'Dad is in the garden. He is planting flowers.'"],
  ["What colour is the bedroom door?", ["blue", "green", "yellow", "white"], 1, "The bedroom door is green.", "Cửa phòng ngủ màu xanh lá.", "Listen: 'My bedroom door is green and my sister's is blue.'"],
  ["Where is the television?", ["kitchen", "living room", "bathroom", "garden"], 1, "The television is in the living room.", "Tivi ở trong phòng khách.", "Listen: 'We watch cartoons on the television in the living room.'"],
  ["How many windows does the kitchen have?", ["one", "two", "three", "four"], 1, "The kitchen has two windows.", "Bếp có hai cửa sổ.", "Listen: 'Our kitchen has two big windows and lots of light.'"],
  ["What is under the table?", ["a dog", "a cat", "a ball", "a book"], 0, "A dog is under the table.", "Con chó ở dưới bàn.", "Listen: 'Careful! There is a dog sleeping under the table.'"],
  ["Where does Grandma sleep?", ["upstairs", "downstairs", "in the garden", "in the kitchen"], 1, "Grandma sleeps downstairs.", "Bà ngủ ở tầng dưới.", "Listen: 'Grandma's bedroom is downstairs, next to the kitchen.'"],
  ["What is in the garden?", ["a tree", "a bed", "a fridge", "a chair only"], 0, "There is a big tree in the garden.", "Có một cây to trong vườn.", "Listen: 'There is a big tree in our garden. I like to sit under it.'"],
  ["Which room is the smallest?", ["kitchen", "bathroom", "living room", "garden"], 1, "The bathroom is the smallest room.", "Phòng tắm là phòng nhỏ nhất.", "Listen: 'Our bathroom is very small, smaller than the kitchen.'"],
];

const starters7: CambridgeMockExam = {
  id: "cambridge-starters-7",
  title: "Starters Mock Test 7 - The House & Rooms",
  titleVi: "Đề thi thử Starters 7 - Ngôi nhà & Các phòng",
  level: "starters",
  duration: 20,
  totalQuestions: 25,
  questions: build(s7Rw, s7Ls),
};

/* ===================== STARTERS 8 - Body & Health ===================== */
const s8Passage1 =
  "I have two eyes, one nose and one mouth. I have two ears too. I use my eyes to see and my ears to hear things.";
const s8Passage2 =
  "Today I feel sick. My head hurts and my tummy hurts too. Mum gives me some water. I stay in bed and I don't go to school.";

const s8Rw: Tuple[] = [
  ["We see with our ___.", ["ears", "eyes", "nose", "mouth"], 1, "We see with our eyes.", "Chúng ta nhìn bằng mắt."],
  ["We hear with our ___.", ["eyes", "ears", "hands", "feet"], 1, "We hear with our ears.", "Chúng ta nghe bằng tai."],
  ["How many eyes does the child have?", ["one", "two", "three", "four"], 1, "The child has two eyes.", "Bạn nhỏ có hai mắt.", s8Passage1],
  ["What does the child use to hear?", ["eyes", "nose", "mouth", "ears"], 3, "The child hears with his ears.", "Bạn nhỏ nghe bằng tai.", s8Passage1],
  ["How many noses does the child have?", ["one", "two", "three", "none"], 0, "The child has one nose.", "Bạn nhỏ có một mũi.", s8Passage1],
  ["What is the child using for seeing?", ["ears", "eyes", "mouth", "nose"], 1, "Eyes are used for seeing.", "Mắt dùng để nhìn.", s8Passage1],
  ["How does the child feel today?", ["happy", "sick", "hungry", "cold"], 1, "The child feels sick today.", "Hôm nay bạn nhỏ cảm thấy ốm.", s8Passage2],
  ["What hurts?", ["arm and leg", "head and tummy", "ear and nose", "hand and foot"], 1, "The head and tummy hurt.", "Đầu và bụng đau.", s8Passage2],
  ["What does mum give the child?", ["some water", "some food", "a toy", "a book"], 0, "Mum gives some water.", "Mẹ cho một ít nước.", s8Passage2],
  ["Does the child go to school?", ["yes", "no", "sometimes", "we don't know"], 1, "The child does not go to school.", "Bạn nhỏ không đi học.", s8Passage2],
  ["Where does the child stay?", ["in bed", "in the garden", "at school", "in the kitchen"], 0, "The child stays in bed.", "Bạn nhỏ ở trên giường.", s8Passage2],
  ["We smell with our ___.", ["eyes", "nose", "ears", "hands"], 1, "We smell with our nose.", "Chúng ta ngửi bằng mũi."],
  ["When you are ill, you should see a ___.", ["teacher", "doctor", "driver", "cook"], 1, "A doctor helps sick people.", "Bác sĩ giúp người bị bệnh."],
  ["We walk with our ___.", ["hands", "eyes", "legs", "ears"], 2, "We walk with our legs.", "Chúng ta đi bộ bằng chân."],
  ["Which is part of the body?", ["arm", "chair", "table", "book"], 0, "An arm is part of the body.", "Cánh tay là một bộ phận cơ thể."],
];
const s8Ls: Tuple[] = [
  ["What hurts Ben today?", ["his leg", "his arm", "his head", "his hand"], 2, "Ben's head hurts.", "Đầu của Ben bị đau.", "Listen: 'Ben feels bad today. His head hurts a lot.'"],
  ["Where is the doctor's room?", ["upstairs", "downstairs", "in the garden", "next door"], 0, "The doctor's room is upstairs.", "Phòng khám ở tầng trên.", "Listen: 'Please go upstairs, the doctor's room is on the first floor.'"],
  ["What does Mia wash before dinner?", ["her face", "her hands", "her feet", "her hair"], 1, "Mia washes her hands.", "Mia rửa tay.", "Listen: 'Wash your hands, Mia, dinner is ready.'"],
  ["How many fingers does she show?", ["three", "four", "five", "six"], 2, "She shows five fingers.", "Bạn ấy giơ năm ngón tay.", "Listen: 'Look, I can count to five with my fingers.'"],
  ["What is wrong with Tom?", ["his tummy hurts", "his ear hurts", "his eye hurts", "his tooth hurts"], 0, "Tom's tummy hurts.", "Bụng Tom bị đau.", "Listen: 'Tom is not happy. His tummy hurts after lunch.'"],
  ["What colour are her eyes?", ["blue", "brown", "green", "grey"], 1, "Her eyes are brown.", "Mắt bạn ấy màu nâu.", "Listen: 'My little sister has brown eyes like our dad.'"],
  ["What does the nurse give the boy?", ["medicine", "a toy", "a book", "some food"], 0, "The nurse gives him medicine.", "Y tá cho cậu bé thuốc.", "Listen: 'The nurse gives the boy some medicine for his cold.'"],
  ["Why is Lucy staying home?", ["she is sick", "it is a holiday", "she is tired", "it is raining"], 0, "Lucy is staying home because she is sick.", "Lucy ở nhà vì bị ốm.", "Listen: 'Lucy can't come to school today. She is sick with a cold.'"],
  ["What part of the body did he hurt?", ["his foot", "his hand", "his ear", "his nose"], 0, "He hurt his foot.", "Cậu bé bị đau chân.", "Listen: 'He fell down and hurt his foot while playing football.'"],
  ["What must you do before eating?", ["wash your hands", "close your eyes", "run fast", "watch TV"], 0, "You must wash your hands before eating.", "Bạn phải rửa tay trước khi ăn.", "Listen: 'Remember, children, always wash your hands before eating.'"],
];

const starters8: CambridgeMockExam = {
  id: "cambridge-starters-8",
  title: "Starters Mock Test 8 - Body & Health",
  titleVi: "Đề thi thử Starters 8 - Cơ thể & Sức khỏe",
  level: "starters",
  duration: 20,
  totalQuestions: 25,
  questions: build(s8Rw, s8Ls),
};

/* ===================== STARTERS 9 - Clothes & Shopping ===================== */
const s9Passage1 =
  "Today I wear a red T-shirt and blue trousers. I have black shoes too. It is cold, so I wear a yellow coat and a hat.";
const s9Passage2 =
  "Mum and I go to the shop. We buy a new dress for me. It is green with white flowers. It costs ten pounds. I love it!";

const s9Rw: Tuple[] = [
  ["I wear shoes on my ___.", ["hands", "feet", "head", "ears"], 1, "We wear shoes on our feet.", "Chúng ta đi giày ở chân."],
  ["I wear a hat on my ___.", ["feet", "hands", "head", "back"], 2, "We wear a hat on our head.", "Chúng ta đội mũ trên đầu."],
  ["What colour is the T-shirt?", ["blue", "red", "yellow", "black"], 1, "The T-shirt is red.", "Áo phông màu đỏ.", s9Passage1],
  ["What colour are the trousers?", ["red", "blue", "black", "yellow"], 1, "The trousers are blue.", "Quần màu xanh dương.", s9Passage1],
  ["Why does the child wear a coat?", ["it is hot", "it is cold", "it is raining", "it is a party"], 1, "It is cold, so the child wears a coat.", "Trời lạnh nên bạn nhỏ mặc áo khoác.", s9Passage1],
  ["What colour are the shoes?", ["white", "black", "green", "brown"], 1, "The shoes are black.", "Giày màu đen.", s9Passage1],
  ["What does the child wear on the head?", ["a hat", "a scarf", "shoes", "gloves"], 0, "The child wears a hat.", "Bạn nhỏ đội mũ.", s9Passage1],
  ["Where do mum and the child go?", ["to school", "to the shop", "to the park", "to the beach"], 1, "They go to the shop.", "Họ đi đến cửa hàng.", s9Passage2],
  ["What do they buy?", ["a coat", "shoes", "a dress", "a hat"], 2, "They buy a new dress.", "Họ mua một chiếc váy mới.", s9Passage2],
  ["What colour is the dress?", ["red", "green with white flowers", "blue", "black"], 1, "The dress is green with white flowers.", "Váy màu xanh lá với hoa trắng.", s9Passage2],
  ["How much does the dress cost?", ["five pounds", "eight pounds", "ten pounds", "twenty pounds"], 2, "It costs ten pounds.", "Nó có giá mười bảng.", s9Passage2],
  ["We wear gloves on our ___.", ["feet", "hands", "head", "ears"], 1, "Gloves go on our hands.", "Găng tay đeo ở tay."],
  ["I pay money at the ___.", ["playground", "till", "garden", "bedroom"], 1, "We pay money at the till.", "Chúng ta trả tiền ở quầy thu ngân."],
  ["Which is clothing?", ["skirt", "apple", "chair", "cloud"], 0, "A skirt is clothing.", "Váy là một loại quần áo."],
  ["In winter I wear a warm ___.", ["swimsuit", "coat", "T-shirt", "shorts"], 1, "We wear a warm coat in winter.", "Mùa đông chúng ta mặc áo khoác ấm."],
];
const s9Ls: Tuple[] = [
  ["What is Kim wearing today?", ["a red dress", "a blue skirt", "a yellow coat", "black trousers"], 0, "Kim is wearing a red dress.", "Kim mặc váy đỏ.", "Listen: 'Kim looks lovely today in her new red dress.'"],
  ["How much do the shoes cost?", ["£5", "£10", "£15", "£20"], 2, "The shoes cost fifteen pounds.", "Đôi giày giá mười lăm bảng.", "Listen: 'These shoes cost fifteen pounds. They are on sale.'"],
  ["What is Dad buying?", ["a shirt", "a hat", "socks", "a scarf"], 0, "Dad is buying a shirt.", "Bố đang mua áo sơ mi.", "Listen: 'Dad wants to buy a new white shirt for work.'"],
  ["What colour is Amy's new coat?", ["pink", "purple", "orange", "brown"], 1, "Amy's new coat is purple.", "Áo khoác mới của Amy màu tím.", "Listen: 'I love my new purple coat. It is warm too.'"],
  ["Where are they going shopping?", ["the market", "the supermarket", "the shopping centre", "the shoe shop"], 2, "They are going to the shopping centre.", "Họ đi mua sắm ở trung tâm thương mại.", "Listen: 'Let's go to the shopping centre this afternoon.'"],
  ["What size does the boy need?", ["small", "medium", "large", "extra large"], 1, "He needs a medium size.", "Cậu bé cần cỡ vừa.", "Listen: 'I think you need a medium size, not a small one.'"],
  ["What is in the bag?", ["a jumper", "a hat", "gloves", "socks"], 0, "There is a jumper in the bag.", "Trong túi có một cái áo len.", "Listen: 'Look what I bought - a lovely warm jumper, it is in this bag.'"],
  ["What colour socks does she want?", ["white", "grey", "green", "yellow"], 2, "She wants green socks.", "Bạn ấy muốn tất màu xanh lá.", "Listen: 'I would like the green socks, please, not the white ones.'"],
  ["Why do they need an umbrella?", ["it is sunny", "it is raining", "it is snowing", "it is windy"], 1, "It is raining, so they need an umbrella.", "Trời đang mưa nên họ cần ô.", "Listen: 'Take an umbrella, it is raining outside.'"],
  ["What is the girl trying on?", ["a skirt", "shoes", "a hat", "a coat"], 0, "The girl is trying on a skirt.", "Bạn gái đang thử một chiếc váy.", "Listen: 'She is trying on a new skirt in the shop.'"],
];

const starters9: CambridgeMockExam = {
  id: "cambridge-starters-9",
  title: "Starters Mock Test 9 - Clothes & Shopping",
  titleVi: "Đề thi thử Starters 9 - Quần áo & Mua sắm",
  level: "starters",
  duration: 20,
  totalQuestions: 25,
  questions: build(s9Rw, s9Ls),
};

/* ===================== STARTERS 10 - Sports & Playground ===================== */
const s10Passage1 =
  "At the playground I like the slide and the swing. I play with my friends. We run and jump. It is a lot of fun every day.";
const s10Passage2 =
  "On Saturday I play football with my dad. I kick the ball and run fast. After the game we drink water and eat an apple.";

const s10Rw: Tuple[] = [
  ["I kick a ___ when I play football.", ["ball", "book", "hat", "chair"], 0, "We kick a ball in football.", "Chúng ta đá bóng khi chơi bóng đá."],
  ["I go up and down on the ___.", ["swing", "book", "table", "bus"], 0, "A swing goes up and down.", "Xích đu đưa lên xuống."],
  ["What two things does the child like at the playground?", ["the slide and the swing", "the ball and the bat", "the bike and the car", "the book and the pen"], 0, "The child likes the slide and the swing.", "Bạn nhỏ thích cầu trượt và xích đu.", s10Passage1],
  ["Who does the child play with?", ["teachers", "friends", "the dog", "no one"], 1, "The child plays with friends.", "Bạn nhỏ chơi với bạn bè.", s10Passage1],
  ["What do the children do at the playground?", ["read and write", "run and jump", "sleep", "cook"], 1, "They run and jump.", "Họ chạy và nhảy.", s10Passage1],
  ["How does the child feel at the playground?", ["bored", "happy - lots of fun", "sad", "tired"], 1, "The child has a lot of fun.", "Bạn nhỏ cảm thấy rất vui.", s10Passage1],
  ["When does the child play football?", ["Monday", "Saturday", "Sunday morning", "Friday"], 1, "The child plays football on Saturday.", "Bạn nhỏ chơi bóng đá vào thứ Bảy.", s10Passage2],
  ["Who does the child play football with?", ["mum", "dad", "sister", "teacher"], 1, "The child plays with dad.", "Bạn nhỏ chơi cùng bố.", s10Passage2],
  ["What does the child do with the ball?", ["throws it", "kicks it", "catches it", "hides it"], 1, "The child kicks the ball.", "Bạn nhỏ đá quả bóng.", s10Passage2],
  ["What do they do after the game?", ["go home", "drink water and eat an apple", "watch TV", "sleep"], 1, "They drink water and eat an apple.", "Họ uống nước và ăn một quả táo.", s10Passage2],
  ["Where do they play football?", ["we don't know exactly", "in the kitchen", "in the bedroom", "on the bus"], 0, "The passage does not say the exact place.", "Bài đọc không nói rõ nơi chơi.", s10Passage2],
  ["We use a bat and a ball to play ___.", ["cricket", "chess", "reading", "singing"], 0, "Cricket uses a bat and ball.", "Cricket dùng gậy và bóng."],
  ["I go down the ___ at the playground.", ["slide", "sofa", "table", "fridge"], 0, "We go down the slide.", "Chúng ta trượt xuống cầu trượt."],
  ["Which is a sport?", ["swimming", "sleeping", "reading", "eating"], 0, "Swimming is a sport.", "Bơi lội là một môn thể thao."],
  ["After running, I feel ___.", ["thirsty", "cold", "sleepy", "bored"], 0, "After running you often feel thirsty.", "Sau khi chạy, ta thường thấy khát nước."],
];
const s10Ls: Tuple[] = [
  ["What is Jack playing?", ["football", "basketball", "tennis", "cricket"], 0, "Jack is playing football.", "Jack đang chơi bóng đá.", "Listen: 'Jack is in the park playing football with his friends.'"],
  ["Where are the children playing?", ["at school", "at the playground", "at home", "at the shop"], 1, "The children are playing at the playground.", "Bọn trẻ đang chơi ở sân chơi.", "Listen: 'The children are having fun at the playground after school.'"],
  ["What is Mia's favourite thing at the playground?", ["the swing", "the slide", "the sandpit", "the see-saw"], 1, "Mia's favourite is the slide.", "Trò yêu thích của Mia là cầu trượt.", "Listen: 'My favourite thing at the playground is the big slide.'"],
  ["How many children are playing tag?", ["three", "four", "five", "six"], 2, "Five children are playing tag.", "Có năm bạn nhỏ đang chơi trò đuổi bắt.", "Listen: 'Five children are playing tag near the trees.'"],
  ["What does the boy drink after running?", ["milk", "water", "juice", "tea"], 1, "He drinks water after running.", "Cậu bé uống nước sau khi chạy.", "Listen: 'After running, I always drink some water.'"],
  ["Which sport does she like best?", ["swimming", "football", "tennis", "running"], 0, "She likes swimming best.", "Bạn ấy thích bơi lội nhất.", "Listen: 'My favourite sport is swimming. I go every Saturday.'"],
  ["What time does the football match start?", ["3 o'clock", "4 o'clock", "5 o'clock", "6 o'clock"], 1, "The match starts at four o'clock.", "Trận đấu bắt đầu lúc bốn giờ.", "Listen: 'The football match starts at four o'clock today.'"],
  ["What does the coach give the winners?", ["a cup", "a book", "a hat", "money"], 0, "The coach gives the winners a cup.", "Huấn luyện viên trao cúp cho đội thắng.", "Listen: 'The coach gives a shiny cup to the winning team.'"],
  ["Where is the new playground?", ["near the school", "near the shop", "near the beach", "near the river"], 0, "The new playground is near the school.", "Sân chơi mới ở gần trường học.", "Listen: 'There is a new playground near the school with a big slide.'"],
  ["What must children do before playing?", ["put on their shoes", "eat lunch", "wash the ball", "read a book"], 0, "Children must put on their shoes.", "Trẻ em phải mang giày trước khi chơi.", "Listen: 'Remember to put on your shoes before you go and play.'"],
];

const starters10: CambridgeMockExam = {
  id: "cambridge-starters-10",
  title: "Starters Mock Test 10 - Sports & Playground",
  titleVi: "Đề thi thử Starters 10 - Thể thao & Sân chơi",
  level: "starters",
  duration: 20,
  totalQuestions: 25,
  questions: build(s10Rw, s10Ls),
};

export const cambridgeExamsStarters6to10: CambridgeMockExam[] = [
  starters6,
  starters7,
  starters8,
  starters9,
  starters10,
];
