/**
 * @file cambridgeExamsFlyers6to10.ts
 * @description Five Cambridge Flyers (A2) mock exams, tests 6 to 10. Themes:
 *              6 - Space & Science; 7 - Sports & Competitions; 8 - Wild Animals
 *              & Habitats; 9 - Music, Art & Hobbies; 10 - Holidays & Adventure.
 *              Each exam has 18 Reading & Writing questions (including two
 *              reading-text groups of 5 questions) and 12 Listening questions.
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
/* FLYERS 6 - Space & Science                                    */
/* ============================================================= */
const p6a =
  "Last Saturday, our class visited the new Science Museum in town. We were very excited because we were going to see a real space rocket! While we were walking around the hall, our teacher told us about the planets. She said that Mars is called the Red Planet because of the colour of its soil. After that, we watched a film about astronauts who have lived on the International Space Station for many months. One astronaut has grown vegetables in space! At the end of the trip, everyone got a small model rocket to take home. It was the best school trip we have ever had.";
const p6b =
  "Dear Amy,\nGuess what? I have just joined the school Science Club! Every Wednesday afternoon we do experiments in the lab. Last week we made a small volcano with vinegar and baking soda, and it really erupted! Our teacher, Mr Patel, is also teaching us about the solar system. He says that Jupiter is the biggest planet and that it has more than seventy moons. Next month we are going to build a model of the sun and the eight planets for the school fair. I have never enjoyed science this much before. Why don't you join too? We meet in Room 5.\nLove, Tom";

const f6Rw: Tuple[] = [
  ["What did the class do at the museum?", ["They planted vegetables", "They saw a real space rocket", "They built a volcano", "They met an astronaut's family"], 1, "The text says they were going to see a real space rocket.", "Đoạn văn nói họ sắp được xem một tên lửa vũ trụ thật.", p6a],
  ["Why is Mars called the Red Planet?", ["Because it is close to the sun", "Because of the colour of its soil", "Because it has red moons", "Because astronauts painted it"], 1, "The teacher said Mars is red because of the colour of its soil.", "Cô giáo nói Sao Hỏa có màu đỏ vì màu của đất trên đó.", p6a],
  ["What has one astronaut done in space?", ["Painted a picture", "Grown vegetables", "Written a book", "Built a rocket"], 1, "The text says one astronaut has grown vegetables in space.", "Đoạn văn nói một phi hành gia đã trồng rau trong vũ trụ.", p6a],
  ["What did everyone get at the end of the trip?", ["A book about Mars", "A small model rocket", "A photo with an astronaut", "A science certificate"], 1, "Everyone got a small model rocket to take home.", "Mọi người được nhận một mô hình tên lửa nhỏ để mang về nhà.", p6a],
  ["How did the class feel about the trip?", ["Bored", "Frightened", "It was the best trip ever", "They wanted to leave early"], 2, "The writer says it was the best school trip they have ever had.", "Người viết nói đây là chuyến đi hay nhất mà họ từng có.", p6a],
  ["What has Tom joined?", ["A football team", "The school Science Club", "A cooking class", "A music band"], 1, "Tom says he has just joined the school Science Club.", "Tom nói cậu vừa tham gia Câu lạc bộ Khoa học của trường.", p6b],
  ["What did they make last week?", ["A rocket model", "A small volcano", "A telescope", "A robot"], 1, "They made a small volcano with vinegar and baking soda.", "Họ làm một ngọn núi lửa nhỏ bằng giấm và baking soda.", p6b],
  ["Who is teaching the Science Club?", ["Mr Patel", "Amy", "Tom's mother", "A famous astronaut"], 0, "The teacher of the club is Mr Patel.", "Giáo viên của câu lạc bộ là thầy Patel.", p6b],
  ["How many moons does Jupiter have, according to Mr Patel?", ["Ten", "More than seventy", "Exactly one hundred", "None"], 1, "Mr Patel says Jupiter has more than seventy moons.", "Thầy Patel nói Sao Mộc có hơn bảy mươi mặt trăng.", p6b],
  ["What are they going to build next month?", ["A real rocket", "A model of the sun and the planets", "A new school lab", "A weather station"], 1, "Next month they are going to build a model of the solar system.", "Tháng tới họ sẽ xây một mô hình mặt trời và các hành tinh.", p6b],
  ["The moon ___ around the Earth.", ["move", "moves", "moving", "is move"], 1, "Present simple, third person: moves.", "Thì hiện tại đơn, ngôi thứ ba số ít: moves.", undefined],
  ["Scientists have ___ found water on Mars.", ["recent", "recently", "recenter", "recentness"], 1, "An adverb is needed before the past participle 'found': recently.", "Cần trạng từ trước động từ quá khứ phân từ 'found': recently.", undefined],
  ["We ___ our project by the time the teacher arrived.", ["finished", "have finished", "had finished", "finish"], 2, "Past perfect is used for an action completed before another past action.", "Thì quá khứ hoàn thành dùng cho hành động xảy ra trước một hành động quá khứ khác.", undefined],
  ["A person who travels into space is called an ___.", ["scientist", "astronaut", "artist", "engineer only"], 1, "A person who travels into space is an astronaut.", "Người đi vào vũ trụ được gọi là phi hành gia (astronaut).", undefined],
  ["While the rocket ___ off, everyone was cheering.", ["take", "takes", "was taking", "took"], 2, "Past continuous describes an action in progress: was taking off.", "Thì quá khứ tiếp diễn diễn tả hành động đang diễn ra: was taking off.", undefined],
  ["She has ___ studied the stars for many years.", ["carefuly", "carefully", "care", "careful"], 1, "Adverb form modifying the verb 'studied': carefully.", "Dạng trạng từ bổ nghĩa cho động từ 'studied': carefully.", undefined],
  ["Which word means 'a machine that flies to space'?", ["rocket", "bicycle", "boat", "train"], 0, "A rocket is a machine that flies to space.", "Rocket là một cỗ máy bay vào vũ trụ.", undefined],
  ["By next year, scientists ___ a new telescope.", ["build", "will have built", "built", "are building"], 1, "Future perfect describes an action finished before a future point.", "Thì tương lai hoàn thành diễn tả hành động hoàn thành trước một mốc tương lai.", undefined],
];
const f6Ls: Tuple[] = [
  ["What is the boy's favourite planet?", ["Earth", "Mars", "Saturn", "Jupiter"], 2, "He says his favourite planet is Saturn because of its rings.", "Cậu bé nói hành tinh yêu thích là Sao Thổ vì có các vành đai.", "Listen: 'My favourite planet is Saturn because of its beautiful rings.'"],
  ["What time does the science show start?", ["3 o'clock", "half past three", "4 o'clock", "half past four"], 1, "The show starts at half past three.", "Buổi trình diễn khoa học bắt đầu lúc ba giờ rưỡi.", "Listen: 'The science show starts at half past three this afternoon.'"],
  ["What did the girl see through the telescope?", ["The moon", "A comet", "A star", "A planet"], 0, "She saw the moon through the telescope.", "Cô bé nhìn thấy mặt trăng qua kính thiên văn.", "Listen: 'Last night I looked through the telescope and saw the moon very clearly.'"],
  ["How many planets are in our solar system?", ["Seven", "Eight", "Nine", "Ten"], 1, "There are eight planets in our solar system.", "Có tám hành tinh trong hệ mặt trời của chúng ta.", "Listen: 'Remember, there are eight planets in our solar system, from Mercury to Neptune.'"],
  ["What is the astronaut doing now?", ["Eating dinner", "Fixing the space station", "Sleeping", "Reading a book"], 1, "The astronaut is fixing the space station right now.", "Phi hành gia đang sửa chữa trạm vũ trụ ngay lúc này.", "Listen: 'Right now, the astronaut is fixing a broken panel on the space station.'"],
  ["What colour is the new spacesuit?", ["White", "Orange", "Blue", "Silver"], 1, "The new spacesuit is orange.", "Bộ đồ vũ trụ mới có màu cam.", "Listen: 'Look, the new spacesuit is bright orange, not white like the old ones.'"],
  ["Why was the rocket launch delayed?", ["Bad weather", "A technical problem", "Not enough fuel", "The astronauts were late"], 1, "The launch was delayed because of a technical problem.", "Việc phóng tên lửa bị hoãn vì gặp sự cố kỹ thuật.", "Listen: 'The rocket launch was delayed because engineers found a technical problem.'"],
  ["Where did the scientist grow the plants?", ["In a greenhouse", "On the space station", "In her garden", "In a lab on Earth"], 1, "The plants were grown on the space station.", "Cây được trồng trên trạm vũ trụ.", "Listen: 'The scientist has grown small plants on the space station for the first time.'"],
  ["What has the boy just finished making?", ["A robot", "A model rocket", "A telescope", "A poster"], 1, "He has just finished making a model rocket.", "Cậu bé vừa hoàn thành làm một mô hình tên lửa.", "Listen: 'I have just finished making my model rocket for the science fair.'"],
  ["What did they learn about stars today?", ["They are cold", "They are made of gas", "They are small", "They don't move"], 1, "They learned that stars are made of gas.", "Hôm nay họ học rằng các ngôi sao được cấu tạo từ khí.", "Listen: 'Today we learned that stars are huge balls made of gas.'"],
  ["When is the next school trip to the planetarium?", ["Monday", "Wednesday", "Friday", "Saturday"], 2, "The next trip to the planetarium is on Friday.", "Chuyến đi tiếp theo đến cung thiên văn là vào thứ Sáu.", "Listen: 'Our next trip to the planetarium will be on Friday morning.'"],
  ["What must students bring to the space workshop?", ["A notebook", "Old batteries", "A camera", "Snacks"], 1, "Students must bring old batteries for the workshop.", "Học sinh phải mang theo pin cũ cho buổi hội thảo.", "Listen: 'Please remember to bring some old batteries to the space workshop tomorrow.'"],
];

const flyers6: CambridgeMockExam = {
  id: "cambridge-flyers-6",
  title: "Flyers Mock Test 6 - Space & Science",
  titleVi: "Đề thi thử Flyers 6 - Vũ trụ & Khoa học",
  level: "flyers",
  duration: 35,
  totalQuestions: 30,
  questions: build(f6Rw, f6Ls),
};

/* ============================================================= */
/* FLYERS 7 - Sports & Competitions                               */
/* ============================================================= */
const p7a =
  "Every year, our school holds a big sports day in June. This year, more than two hundred students took part in the races and games. I was running in the relay race with three friends from my class. We had been practising every morning before school for two weeks! When the whistle blew, my friend Leo ran the first part very fast. Then I took the baton and ran as quickly as I could. In the end, our team came second, just behind the winning team from Year 6. Everyone got a medal for taking part, and we were all very proud of our efforts.";
const p7b =
  "Notice: Town Swimming Competition\nAll children aged 8 to 12 are invited to join the Town Swimming Competition next Saturday. The event will start at 9 o'clock at the Riverside Pool. There will be races for freestyle, backstroke, and a fun relay for teams of four. Swimmers must arrive thirty minutes early to get their numbers. Parents are welcome to watch from the seats near the pool, but they cannot stand near the water. The top three swimmers in each race will win a trophy, and every swimmer will receive a certificate. Please bring your own towel and goggles.";

const f7Rw: Tuple[] = [
  ["How many students took part in sports day?", ["One hundred", "More than two hundred", "Fifty", "Twenty"], 1, "More than two hundred students took part.", "Hơn hai trăm học sinh đã tham gia.", p7a],
  ["What race was the writer in?", ["Long jump", "The relay race", "Swimming", "High jump"], 1, "The writer was running in the relay race.", "Người viết đã chạy trong cuộc thi tiếp sức.", p7a],
  ["How long had they been practising?", ["One day", "One week", "Two weeks", "One month"], 2, "They had been practising every morning for two weeks.", "Họ đã tập luyện mỗi sáng trong hai tuần.", p7a],
  ["Who ran the first part of the relay?", ["The writer", "Leo", "A Year 6 student", "The teacher"], 1, "Leo ran the first part of the relay race.", "Leo đã chạy đoạn đầu tiên của cuộc thi tiếp sức.", p7a],
  ["What position did the writer's team finish?", ["First", "Second", "Third", "Last"], 1, "Their team came second in the race.", "Đội của người viết về thứ hai.", p7a],
  ["When does the swimming competition start?", ["8 o'clock", "9 o'clock", "10 o'clock", "11 o'clock"], 1, "The competition starts at 9 o'clock.", "Cuộc thi bắt đầu lúc 9 giờ.", p7b],
  ["Where will the competition be held?", ["The school hall", "Riverside Pool", "Town Park", "The sports centre"], 1, "The event will be at Riverside Pool.", "Sự kiện sẽ diễn ra tại Hồ bơi Riverside.", p7b],
  ["How early must swimmers arrive?", ["Ten minutes", "Twenty minutes", "Thirty minutes", "One hour"], 2, "Swimmers must arrive thirty minutes early for their numbers.", "Vận động viên bơi phải đến sớm ba mươi phút để lấy số.", p7b],
  ["Where can parents watch from?", ["Near the water", "Seats near the pool", "The changing rooms", "They cannot watch"], 1, "Parents can watch from the seats near the pool.", "Phụ huynh có thể xem từ ghế ngồi gần hồ bơi.", p7b],
  ["What must every swimmer bring?", ["A trophy", "A towel and goggles", "A medal", "A swimming coach"], 1, "Swimmers must bring their own towel and goggles.", "Vận động viên phải tự mang khăn tắm và kính bơi.", p7b],
  ["Our team ___ the match last Saturday.", ["win", "wins", "won", "winning"], 2, "Past simple with a time marker 'last Saturday': won.", "Thì quá khứ đơn với mốc thời gian 'last Saturday': won.", undefined],
  ["She ran the race very ___.", ["quick", "quickly", "quickness", "quicker than"], 1, "An adverb modifies the verb 'ran': quickly.", "Trạng từ bổ nghĩa cho động từ 'ran': quickly.", undefined],
  ["They ___ practising football since morning.", ["are", "have been", "was", "did"], 1, "Present perfect continuous for an action continuing until now.", "Thì hiện tại hoàn thành tiếp diễn cho hành động kéo dài đến hiện tại.", undefined],
  ["While the players ___ , the rain started.", ["train", "trains", "were training", "had train"], 2, "Past continuous describes an interrupted action: were training.", "Quá khứ tiếp diễn diễn tả hành động bị gián đoạn: were training.", undefined],
  ["A person who wins a competition gets a ___.", ["ticket", "trophy", "recipe", "map"], 1, "A winner usually receives a trophy.", "Người chiến thắng thường nhận được cúp (trophy).", undefined],
  ["He plays tennis ___ than his brother.", ["good", "well", "better", "best"], 2, "Comparative adverb form: better.", "Dạng so sánh hơn của trạng từ: better.", undefined],
  ["Which word means 'a group of people playing together'?", ["team", "crowd", "audience", "referee"], 0, "A team is a group of people who play together.", "Team là một nhóm người cùng chơi với nhau.", undefined],
  ["By the end of the season, she ___ five matches.", ["won", "wins", "will have won", "winning"], 2, "Future perfect: an action completed before a future point.", "Thì tương lai hoàn thành: hành động hoàn tất trước một mốc tương lai.", undefined],
];
const f7Ls: Tuple[] = [
  ["What sport is the boy going to try?", ["Tennis", "Basketball", "Swimming", "Cricket"], 1, "The boy is going to try basketball this term.", "Cậu bé sẽ thử chơi bóng rổ trong học kỳ này.", "Listen: 'This term I'm going to try basketball for the first time.'"],
  ["What time does the football match start?", ["2 o'clock", "half past two", "3 o'clock", "half past three"], 2, "The match starts at 3 o'clock.", "Trận bóng đá bắt đầu lúc 3 giờ.", "Listen: 'Don't forget, the football match starts at three o'clock this afternoon.'"],
  ["Who won the race yesterday?", ["Sam", "Ella", "Ben", "Jack"], 1, "Ella won the race yesterday.", "Ella đã thắng cuộc đua ngày hôm qua.", "Listen: 'Ella was the fastest and won the race yesterday.'"],
  ["What did the coach say the team needs to practise?", ["Passing", "Running", "Shooting", "Jumping"], 2, "The coach said the team needs to practise shooting.", "Huấn luyện viên nói đội cần luyện tập cú sút.", "Listen: 'The coach said we really need to practise our shooting before the next game.'"],
  ["How many players are on the team?", ["Nine", "Ten", "Eleven", "Twelve"], 2, "There are eleven players on the team.", "Có mười một cầu thủ trong đội.", "Listen: 'Our football team has eleven players, just like a normal team.'"],
  ["Where is the competition being held?", ["School hall", "Sports centre", "Park", "Stadium"], 3, "The competition is being held at the stadium.", "Cuộc thi được tổ chức tại sân vận động.", "Listen: 'The big competition this year is being held at the new stadium.'"],
  ["What prize did she win?", ["A medal", "A trophy", "A certificate", "Money"], 1, "She won a trophy for coming first.", "Cô bé đã giành được một chiếc cúp vì về nhất.", "Listen: 'I can't believe it, I won a trophy for coming first in the race!'"],
  ["Why couldn't Tom play in the match?", ["He was ill", "He was late", "He forgot his kit", "He didn't want to"], 0, "Tom couldn't play because he was ill.", "Tom không thể chơi vì cậu bị ốm.", "Listen: 'Tom couldn't play in the match because he was ill with a cold.'"],
  ["What is the girl's favourite sport?", ["Running", "Cycling", "Swimming", "Gymnastics"], 2, "Her favourite sport is swimming.", "Môn thể thao yêu thích của cô bé là bơi lội.", "Listen: 'My favourite sport has always been swimming, since I was very young.'"],
  ["When will the school sports day take place?", ["This Friday", "Next Monday", "Next Friday", "Tomorrow"], 2, "Sports day will take place next Friday.", "Ngày hội thể thao sẽ diễn ra vào thứ Sáu tuần tới.", "Listen: 'Remember, our school sports day will take place next Friday.'"],
  ["What must players wear for the match?", ["Blue shirts", "Red shirts", "White shirts", "Green shirts"], 0, "Players must wear blue shirts for the match.", "Cầu thủ phải mặc áo màu xanh dương cho trận đấu.", "Listen: 'Everyone must wear their blue team shirts for tomorrow's match.'"],
  ["How did the team feel after losing?", ["Happy", "Disappointed", "Excited", "Bored"], 1, "The team felt disappointed after losing.", "Đội bóng cảm thấy thất vọng sau khi thua.", "Listen: 'After losing the final, the whole team felt very disappointed.'"],
];

const flyers7: CambridgeMockExam = {
  id: "cambridge-flyers-7",
  title: "Flyers Mock Test 7 - Sports & Competitions",
  titleVi: "Đề thi thử Flyers 7 - Thể thao & Thi đấu",
  level: "flyers",
  duration: 35,
  totalQuestions: 30,
  questions: build(f7Rw, f7Ls),
};

/* ============================================================= */
/* FLYERS 8 - Wild Animals & Habitats                             */
/* ============================================================= */
const p8a =
  "Last month, our family went on a trip to a national park to see wild animals in their natural habitat. Early in the morning, we saw a family of elephants drinking water near a river. Our guide explained that elephants can drink up to two hundred litres of water every day. Later, we were extremely lucky because we saw a leopard resting in a tree. Our guide said that leopards often sleep in trees to stay safe from other animals. In the afternoon, we watched a group of monkeys playing near our jeep. By the end of the day, we had seen more than fifteen different kinds of animals.";
const p8b =
  "Fact File: The Arctic Fox\nThe Arctic fox lives in the cold, icy areas of the Arctic. It has thick white fur in winter, which helps it hide in the snow. In summer, its fur changes to brown or grey to match the rocks and grass. Arctic foxes have been surviving in temperatures as low as minus fifty degrees for thousands of years. They usually hunt small animals like birds and mice, but they also eat berries when food is hard to find. Scientists have been studying Arctic foxes for many years because they want to understand how these clever animals survive such an extreme habitat.";

const f8Rw: Tuple[] = [
  ["What did the family see near the river?", ["Lions", "Elephants", "Leopards", "Monkeys"], 1, "They saw a family of elephants drinking water.", "Họ nhìn thấy một gia đình voi đang uống nước.", p8a],
  ["How much water can an elephant drink each day?", ["Fifty litres", "One hundred litres", "Two hundred litres", "Five hundred litres"], 2, "The guide said elephants can drink up to two hundred litres a day.", "Hướng dẫn viên nói voi có thể uống tới hai trăm lít nước mỗi ngày.", p8a],
  ["Where was the leopard resting?", ["On a rock", "In a tree", "Near the river", "Inside the jeep"], 1, "The leopard was resting in a tree.", "Con báo đang nghỉ ngơi trên cây.", p8a],
  ["Why do leopards sleep in trees?", ["To find food", "To stay safe", "To see the river", "To sleep in the sun"], 1, "Leopards sleep in trees to stay safe from other animals.", "Báo ngủ trên cây để giữ an toàn khỏi các động vật khác.", p8a],
  ["How many kinds of animals did they see by the end of the day?", ["Five", "Ten", "More than fifteen", "Twenty"], 2, "They had seen more than fifteen different kinds of animals.", "Họ đã thấy hơn mười lăm loại động vật khác nhau.", p8a],
  ["What colour is the Arctic fox's fur in winter?", ["Brown", "Grey", "White", "Black"], 2, "In winter the Arctic fox has thick white fur.", "Vào mùa đông, cáo Bắc Cực có bộ lông trắng dày.", p8b],
  ["Why does the fur change colour in summer?", ["To stay warm", "To match the rocks and grass", "To attract other foxes", "To keep clean"], 1, "The fur changes to match the rocks and grass in summer.", "Bộ lông đổi màu để phù hợp với đá và cỏ vào mùa hè.", p8b],
  ["What temperature can Arctic foxes survive?", ["Minus ten degrees", "Zero degrees", "Minus fifty degrees", "Ten degrees"], 2, "Arctic foxes can survive temperatures as low as minus fifty degrees.", "Cáo Bắc Cực có thể sống sót ở nhiệt độ thấp tới âm năm mươi độ.", p8b],
  ["What do Arctic foxes eat when food is scarce?", ["Fish", "Berries", "Leaves", "Ice"], 1, "They eat berries when food is hard to find.", "Chúng ăn quả mọng khi khó tìm thức ăn.", p8b],
  ["Why do scientists study Arctic foxes?", ["To catch them", "To understand how they survive", "To sell their fur", "To feed them"], 1, "Scientists study them to understand how they survive an extreme habitat.", "Các nhà khoa học nghiên cứu để hiểu cách chúng sống sót ở môi trường khắc nghiệt.", p8b],
  ["Tigers ___ in the forest at night.", ["hunt", "hunts", "hunting", "hunted often"], 0, "Present simple for general facts about animals: hunt.", "Hiện tại đơn cho sự thật chung về động vật: hunt.", undefined],
  ["The bird flew ___ over the nest.", ["gentle", "gently", "gentleness", "gentler"], 1, "Adverb modifying the verb 'flew': gently.", "Trạng từ bổ nghĩa cho động từ 'flew': gently.", undefined],
  ["We ___ never seen a real panda before this trip.", ["have", "has", "had", "having"], 0, "Present perfect for an experience up to now: have never seen.", "Hiện tại hoàn thành cho trải nghiệm tính đến hiện tại: have never seen.", undefined],
  ["While the lions ___ , the cubs were playing nearby.", ["sleep", "sleeps", "were sleeping", "had sleep"], 2, "Past continuous for a background action: were sleeping.", "Quá khứ tiếp diễn cho hành động nền: were sleeping.", undefined],
  ["A place where wild animals live naturally is called a ___.", ["habitat", "cage", "farm", "garden"], 0, "The natural home of an animal is its habitat.", "Nơi ở tự nhiên của động vật được gọi là habitat.", undefined],
  ["The cheetah runs ___ than any other land animal.", ["fast", "faster", "fastest", "more fast"], 1, "Comparative adverb: faster than.", "Trạng từ so sánh hơn: faster than.", undefined],
  ["Which animal is known for changing its fur colour?", ["Arctic fox", "Elephant", "Giraffe", "Crocodile"], 0, "The Arctic fox changes its fur colour with the seasons.", "Cáo Bắc Cực đổi màu lông theo mùa.", undefined],
  ["By next year, the park ___ its new tiger enclosure.", ["opens", "opened", "will have opened", "opening"], 2, "Future perfect: completed before a future time.", "Tương lai hoàn thành: hoàn tất trước một thời điểm tương lai.", undefined],
];
const f8Ls: Tuple[] = [
  ["What animal did the children see first at the safari park?", ["Zebra", "Lion", "Giraffe", "Rhino"], 2, "They saw the giraffe first at the safari park.", "Họ nhìn thấy hươu cao cổ đầu tiên tại công viên safari.", "Listen: 'The first animal we saw at the safari park was a very tall giraffe.'"],
  ["Where do polar bears live?", ["The desert", "The rainforest", "The Arctic", "The mountains"], 2, "Polar bears live in the Arctic.", "Gấu Bắc Cực sống ở vùng Bắc Cực.", "Listen: 'Polar bears live in the Arctic, where it is icy and cold all year.'"],
  ["What time does the bird show start?", ["10 o'clock", "11 o'clock", "12 o'clock", "1 o'clock"], 1, "The bird show starts at 11 o'clock.", "Chương trình chim bắt đầu lúc 11 giờ.", "Listen: 'Don't miss the bird show, it starts at eleven o'clock sharp.'"],
  ["How many baby tigers were born last week?", ["One", "Two", "Three", "Four"], 2, "Three baby tigers were born last week.", "Ba con hổ con đã được sinh ra tuần trước.", "Listen: 'We are excited to say three baby tigers were born last week at the zoo.'"],
  ["What is the elephant doing now?", ["Sleeping", "Eating leaves", "Swimming", "Running"], 1, "The elephant is eating leaves right now.", "Con voi đang ăn lá cây ngay bây giờ.", "Listen: 'Look over there, the elephant is eating leaves from the tall tree.'"],
  ["Why must visitors stay in the jeep?", ["It is raining", "For safety near wild animals", "The path is broken", "To save time"], 1, "Visitors must stay in the jeep for safety near wild animals.", "Du khách phải ở trong xe jeep để an toàn gần động vật hoang dã.", "Listen: 'For your safety, please stay inside the jeep while we are near the wild animals.'"],
  ["What do meerkats mainly eat?", ["Fruit", "Insects", "Fish", "Grass"], 1, "Meerkats mainly eat insects.", "Meerkat chủ yếu ăn côn trùng.", "Listen: 'Meerkats spend most of the day digging for insects to eat.'"],
  ["How long has the zoo had the new panda?", ["One week", "One month", "Six months", "One year"], 2, "The zoo has had the new panda for six months.", "Sở thú đã có con gấu trúc mới được sáu tháng.", "Listen: 'The zoo has had our new panda for six months now, and she is very happy here.'"],
  ["What colour are the flamingos' legs?", ["White", "Pink", "Black", "Grey"], 1, "The flamingos' legs are pink.", "Chân của chim hồng hạc có màu hồng.", "Listen: 'Have you noticed the flamingos? Their long legs are bright pink.'"],
  ["Where are the snakes kept?", ["Near the entrance", "In the reptile house", "Next to the lake", "Behind the café"], 1, "The snakes are kept in the reptile house.", "Rắn được nuôi trong nhà bò sát.", "Listen: 'All the snakes are kept safely in the reptile house near the main gate.'"],
  ["What should visitors not do near the fence?", ["Take photos", "Feed the animals", "Sit down", "Talk loudly"], 1, "Visitors should not feed the animals near the fence.", "Du khách không nên cho động vật ăn gần hàng rào.", "Listen: 'Please remember, visitors must not feed the animals near the fence.'"],
  ["What is the guide's favourite wild animal?", ["Wolf", "Owl", "Fox", "Bear"], 2, "The guide's favourite wild animal is the fox.", "Động vật hoang dã yêu thích của hướng dẫn viên là cáo.", "Listen: 'If you ask me, my favourite wild animal has always been the clever fox.'"],
];

const flyers8: CambridgeMockExam = {
  id: "cambridge-flyers-8",
  title: "Flyers Mock Test 8 - Wild Animals & Habitats",
  titleVi: "Đề thi thử Flyers 8 - Động vật hoang dã & Môi trường sống",
  level: "flyers",
  duration: 35,
  totalQuestions: 30,
  questions: build(f8Rw, f8Ls),
};

/* ============================================================= */
/* FLYERS 9 - Music, Art & Hobbies                                */
/* ============================================================= */
const p9a =
  "My sister Rosie has been learning the violin for three years. Every evening after dinner, she practises for half an hour in her bedroom. Last weekend, she took part in a music competition at the town hall, where more than fifty children played different instruments. While she was waiting for her turn, she felt very nervous, but as soon as she started playing, she forgot about being scared. She played a piece she had been practising for two months. In the end, the judges gave her a silver medal for her performance. Our parents were extremely proud, and Rosie has already started learning a new, harder piece for next year's competition.";
const p9b =
  "Art Club Newsletter\nThis term, the Art Club has been working on a big project: painting a mural on the wall outside the school library. Every Tuesday, students meet after lessons to design and paint different parts of the picture. So far, they have painted a colourful garden with birds and butterflies. Ms Chen, the art teacher, says the mural will be finished by the end of the month. Students who join the club have also been learning how to draw with pastels and how to mix paint colours. Next term, the club plans to hold an exhibition so parents can see all the artwork the children have created this year.";

const f9Rw: Tuple[] = [
  ["How long has Rosie been learning the violin?", ["One year", "Two years", "Three years", "Four years"], 2, "Rosie has been learning the violin for three years.", "Rosie đã học violin được ba năm.", p9a],
  ["Where did the music competition take place?", ["Her school", "The town hall", "A concert hall", "Her house"], 1, "The competition took place at the town hall.", "Cuộc thi diễn ra tại tòa thị chính.", p9a],
  ["How did Rosie feel while waiting for her turn?", ["Excited", "Nervous", "Bored", "Angry"], 1, "She felt very nervous while waiting for her turn.", "Cô bé cảm thấy rất lo lắng khi chờ đến lượt.", p9a],
  ["How long had Rosie been practising her piece?", ["One week", "Two weeks", "One month", "Two months"], 3, "She had been practising the piece for two months.", "Cô bé đã luyện tập bản nhạc đó trong hai tháng.", p9a],
  ["What medal did Rosie win?", ["Gold", "Silver", "Bronze", "None"], 1, "The judges gave Rosie a silver medal.", "Giám khảo đã trao cho Rosie huy chương bạc.", p9a],
  ["What is the Art Club painting?", ["A classroom wall", "A mural outside the library", "A poster", "A book cover"], 1, "The Art Club is painting a mural outside the school library.", "Câu lạc bộ Nghệ thuật đang vẽ tranh tường bên ngoài thư viện trường.", p9b],
  ["When do students meet for the club?", ["Mondays", "Tuesdays", "Fridays", "Weekends"], 1, "Students meet every Tuesday after lessons.", "Học sinh gặp nhau vào mỗi thứ Ba sau giờ học.", p9b],
  ["What have they painted so far?", ["A city street", "A colourful garden with birds and butterflies", "A space scene", "A football match"], 1, "So far they have painted a colourful garden with birds and butterflies.", "Đến nay họ đã vẽ một khu vườn đầy màu sắc với chim và bướm.", p9b],
  ["What have students also been learning to do?", ["Play instruments", "Draw with pastels and mix paint", "Write poems", "Build models"], 1, "They have been learning to draw with pastels and mix paint colours.", "Họ cũng đang học vẽ bằng bút pastel và pha màu sơn.", p9b],
  ["What does the club plan to do next term?", ["Close down", "Hold an exhibition", "Paint a new mural", "Go on a trip"], 1, "Next term the club plans to hold an exhibition.", "Học kỳ tới câu lạc bộ dự định tổ chức một buổi triển lãm.", p9b],
  ["She sings ___ than anyone in her class.", ["beautiful", "beautifully", "more beautiful", "beauty"], 1, "Comparative adverb form is needed: more beautifully (irregular here as 'beautifully' works with 'than anyone').", "Cần dạng trạng từ so sánh: beautifully phù hợp trong ngữ cảnh này.", undefined],
  ["He ___ painting pictures since he was five.", ["enjoys", "enjoy", "has enjoyed", "enjoyed"], 2, "Present perfect for an action continuing from the past to now.", "Hiện tại hoàn thành cho hành động kéo dài từ quá khứ đến hiện tại.", undefined],
  ["While she ___ the piano, her brother was drawing.", ["play", "plays", "was playing", "had played"], 2, "Past continuous for two actions happening at the same time.", "Quá khứ tiếp diễn cho hai hành động xảy ra cùng lúc.", undefined],
  ["A person who paints pictures is called an ___.", ["author", "artist", "actor", "architect"], 1, "A person who paints is an artist.", "Người vẽ tranh được gọi là artist.", undefined],
  ["We ___ finished the mural by Friday.", ["have", "will have", "had", "are"], 1, "Future perfect for an action completed before a future time.", "Tương lai hoàn thành cho hành động hoàn tất trước một thời điểm tương lai.", undefined],
  ["Please hold your instrument ___.", ["careful", "carefully", "care", "carefulness"], 1, "Adverb needed to modify the verb 'hold': carefully.", "Cần trạng từ để bổ nghĩa cho động từ 'hold': carefully.", undefined],
  ["Which hobby involves mixing colours on paper?", ["Painting", "Singing", "Dancing", "Reading"], 0, "Painting involves mixing colours on paper.", "Vẽ tranh liên quan đến việc pha màu trên giấy.", undefined],
  ["They ___ practising the song all afternoon yesterday.", ["are", "were", "have been", "will be"], 1, "Past continuous for an ongoing action in the past: were practising.", "Quá khứ tiếp diễn cho hành động đang diễn ra trong quá khứ: were practising.", undefined],
];
const f9Ls: Tuple[] = [
  ["What instrument is the boy learning?", ["Guitar", "Piano", "Drums", "Flute"], 1, "He is learning to play the piano.", "Cậu bé đang học chơi piano.", "Listen: 'I started learning the piano last year and I really enjoy it.'"],
  ["What time is the music concert?", ["6 o'clock", "half past six", "7 o'clock", "half past seven"], 2, "The concert starts at 7 o'clock.", "Buổi hòa nhạc bắt đầu lúc 7 giờ.", "Listen: 'Please remember the school concert starts at seven o'clock this evening.'"],
  ["What is the girl drawing?", ["A mountain", "A garden", "A house", "A boat"], 1, "She is drawing a garden.", "Cô bé đang vẽ một khu vườn.", "Listen: 'For my art project, I am drawing a beautiful garden full of flowers.'"],
  ["How many students joined the choir this year?", ["Ten", "Twenty", "Thirty", "Forty"], 2, "Thirty students joined the choir this year.", "Ba mươi học sinh đã tham gia đội hợp xướng năm nay.", "Listen: 'This year, thirty students joined our school choir, which is a record number.'"],
  ["What did the artist use to paint the mural?", ["Pencils", "Pastels", "Paint and brushes", "Crayons"], 2, "The artist used paint and brushes for the mural.", "Họa sĩ đã dùng sơn và cọ để vẽ tranh tường.", "Listen: 'To paint the big mural, the artist used paint and brushes, not pastels.'"],
  ["Why was the boy late for his music lesson?", ["He lost his violin", "The bus was late", "He forgot the time", "He was ill"], 1, "He was late because the bus was late.", "Cậu bé đến trễ vì xe buýt đến muộn.", "Listen: 'Sorry I'm late for the lesson, the bus was late this morning.'"],
  ["What hobby does the girl enjoy most?", ["Dancing", "Painting", "Singing", "Photography"], 2, "Her favourite hobby is singing.", "Sở thích yêu thích nhất của cô bé là ca hát.", "Listen: 'Out of all my hobbies, singing is definitely my favourite.'"],
  ["What has the club been doing this term?", ["Making pottery", "Painting a mural", "Writing songs", "Filming a video"], 1, "The club has been painting a mural this term.", "Câu lạc bộ đã vẽ tranh tường trong học kỳ này.", "Listen: 'This term, our art club has been busy painting a big mural on the school wall.'"],
  ["When is the art exhibition?", ["This weekend", "Next month", "Next week", "Tomorrow"], 1, "The exhibition will be held next month.", "Buổi triển lãm sẽ được tổ chức vào tháng tới.", "Listen: 'We are excited to announce the art exhibition will be held next month.'"],
  ["What did the teacher say about the drawing?", ["It was too small", "It was very creative", "It needed more colour", "It was late"], 1, "The teacher said the drawing was very creative.", "Giáo viên nói bức vẽ rất sáng tạo.", "Listen: 'The teacher said my drawing was very creative and full of good ideas.'"],
  ["What instrument does the orchestra need more players for?", ["Violin", "Cello", "Trumpet", "Drums"], 1, "The orchestra needs more cello players.", "Dàn nhạc cần thêm người chơi cello.", "Listen: 'Our school orchestra really needs more students to play the cello this year.'"],
  ["What prize did the young artist win?", ["A book", "A medal", "A trophy", "A paint set"], 3, "The young artist won a new paint set as a prize.", "Họa sĩ nhí đã giành được một bộ màu vẽ mới làm giải thưởng.", "Listen: 'As a prize for the best painting, she won a wonderful new paint set.'"],
];

const flyers9: CambridgeMockExam = {
  id: "cambridge-flyers-9",
  title: "Flyers Mock Test 9 - Music, Art & Hobbies",
  titleVi: "Đề thi thử Flyers 9 - Âm nhạc, Nghệ thuật & Sở thích",
  level: "flyers",
  duration: 35,
  totalQuestions: 30,
  questions: build(f9Rw, f9Ls),
};

/* ============================================================= */
/* FLYERS 10 - Holidays & Adventure                                */
/* ============================================================= */
const p10a =
  "Last summer, my family went camping in the mountains for the first time. We had been planning the trip for months, and we were all very excited. On the first night, while we were sitting around the campfire, we heard an owl hooting nearby. The next morning, we walked along a river and saw a family of deer drinking water. In the afternoon, we tried kayaking on a small lake, which was much harder than it looked! By the end of the holiday, we had walked more than thirty kilometres and taken hundreds of photographs. It was the most exciting adventure we have ever had together.";
const p10b =
  "Postcard from Grandma\nDear Lily,\nGreetings from the seaside! I have been staying at a lovely hotel near the beach for three days now. Yesterday, I went on a boat trip to a small island, where I saw dolphins swimming near the boat! This morning, I walked along the beach and collected some beautiful shells for you. The weather has been sunny every day, so I have been swimming in the sea each afternoon. Tomorrow, I am going to visit an old castle nearby. I will bring you a special present when I come home next week. I hope you and your brother are being good for your parents!\nLove, Grandma";

const f10Rw: Tuple[] = [
  ["Where did the family go camping?", ["By the sea", "In the mountains", "In the city", "On a farm"], 1, "The family went camping in the mountains.", "Gia đình đã đi cắm trại trên núi.", p10a],
  ["What did they hear on the first night?", ["A dog barking", "An owl hooting", "A river flowing", "Music playing"], 1, "They heard an owl hooting nearby.", "Họ nghe thấy tiếng cú kêu gần đó.", p10a],
  ["What did they see near the river?", ["Deer drinking water", "Fish jumping", "Birds nesting", "Bears fishing"], 0, "They saw a family of deer drinking water near the river.", "Họ thấy một gia đình hươu đang uống nước gần sông.", p10a],
  ["What was harder than it looked?", ["Walking", "Photography", "Kayaking", "Cooking"], 2, "Kayaking was much harder than it looked.", "Chèo thuyền kayak khó hơn nhiều so với vẻ ngoài của nó.", p10a],
  ["How far had they walked by the end of the holiday?", ["Ten kilometres", "Twenty kilometres", "More than thirty kilometres", "Fifty kilometres"], 2, "They had walked more than thirty kilometres.", "Họ đã đi bộ hơn ba mươi ki-lô-mét.", p10a],
  ["How long has Grandma been staying at the hotel?", ["One day", "Two days", "Three days", "A week"], 2, "Grandma has been staying at the hotel for three days.", "Bà đã ở khách sạn được ba ngày.", p10b],
  ["What did Grandma see on the boat trip?", ["Whales", "Dolphins", "Sharks", "Seals"], 1, "She saw dolphins swimming near the boat.", "Bà đã thấy cá heo bơi gần thuyền.", p10b],
  ["What did Grandma collect on the beach?", ["Stones", "Shells", "Sand", "Flowers"], 1, "She collected some beautiful shells.", "Bà đã nhặt một số vỏ sò đẹp.", p10b],
  ["What is Grandma going to visit tomorrow?", ["A museum", "A castle", "A zoo", "A market"], 1, "Tomorrow she is going to visit an old castle.", "Ngày mai bà sẽ đi thăm một lâu đài cổ.", p10b],
  ["When will Grandma come home?", ["Tomorrow", "Next week", "Next month", "Today"], 1, "Grandma will come home next week.", "Bà sẽ về nhà vào tuần tới.", p10b],
  ["We ___ our bags before the taxi arrived.", ["packed", "have packed", "had packed", "pack"], 2, "Past perfect for an action completed before another past action.", "Quá khứ hoàn thành cho hành động hoàn tất trước một hành động quá khứ khác.", undefined],
  ["She travels ___ than her brother.", ["far", "further", "furthest", "more far"], 1, "Comparative form: further.", "Dạng so sánh hơn: further.", undefined],
  ["While we ___ on the beach, it started to rain.", ["relax", "relaxes", "were relaxing", "had relax"], 2, "Past continuous describes an interrupted background action.", "Quá khứ tiếp diễn diễn tả hành động nền bị gián đoạn.", undefined],
  ["They have ___ visited that island before.", ["never", "ever always", "not never", "no"], 0, "Adverb 'never' with present perfect for an experience that hasn't happened.", "Trạng từ 'never' với hiện tại hoàn thành cho trải nghiệm chưa từng xảy ra.", undefined],
  ["A place where people stay during a holiday is a ___.", ["hotel", "hospital", "school", "office"], 0, "A hotel is where people stay on holiday.", "Khách sạn là nơi mọi người ở lại khi đi nghỉ.", undefined],
  ["He climbed the hill very ___.", ["slow", "slowly", "slowness", "slower"], 1, "Adverb modifying the verb 'climbed': slowly.", "Trạng từ bổ nghĩa cho động từ 'climbed': slowly.", undefined],
  ["Which word means 'an exciting journey or experience'?", ["adventure", "habit", "routine", "chore"], 0, "An adventure is an exciting journey or experience.", "Adventure nghĩa là một cuộc hành trình hoặc trải nghiệm thú vị.", undefined],
  ["By the time we arrive, they ___ the tents.", ["set up", "will have set up", "set", "setting up"], 1, "Future perfect: completed before a future arrival time.", "Tương lai hoàn thành: hoàn tất trước thời điểm đến trong tương lai.", undefined],
];
const f10Ls: Tuple[] = [
  ["Where is the family going for their holiday?", ["The mountains", "The seaside", "The countryside", "A big city"], 1, "The family is going to the seaside for their holiday.", "Gia đình sẽ đi biển trong kỳ nghỉ của họ.", "Listen: 'This year, we are going to the seaside for our summer holiday.'"],
  ["What time does the plane leave?", ["8 o'clock", "half past eight", "9 o'clock", "half past nine"], 2, "The plane leaves at 9 o'clock.", "Máy bay khởi hành lúc 9 giờ.", "Listen: 'Don't forget, our plane leaves at nine o'clock tomorrow morning.'"],
  ["What did they see on the boat trip?", ["Whales", "Dolphins", "Turtles", "Sharks"], 1, "They saw dolphins on the boat trip.", "Họ đã thấy cá heo trong chuyến đi thuyền.", "Listen: 'During the boat trip, we were lucky enough to see dolphins swimming beside us.'"],
  ["How many days will they stay at the campsite?", ["Three", "Four", "Five", "Six"], 2, "They will stay at the campsite for five days.", "Họ sẽ ở tại khu cắm trại năm ngày.", "Listen: 'We have booked the campsite for five days this time.'"],
  ["What is the weather like today?", ["Rainy", "Sunny", "Snowy", "Windy"], 1, "The weather today is sunny.", "Thời tiết hôm nay nắng.", "Listen: 'It's a beautiful sunny day, perfect for the beach.'"],
  ["Why was the trip to the castle cancelled?", ["Bad weather", "Not enough time", "The castle was closed", "The bus broke down"], 2, "The trip was cancelled because the castle was closed.", "Chuyến đi bị hủy vì lâu đài đóng cửa.", "Listen: 'Sadly, our trip to the castle is cancelled today because the castle is closed.'"],
  ["What did the children collect on the beach?", ["Stones", "Shells", "Sand toys", "Leaves"], 1, "The children collected shells on the beach.", "Bọn trẻ đã nhặt vỏ sò trên bãi biển.", "Listen: 'The children spent the whole morning collecting shells along the beach.'"],
  ["Where will they have a picnic?", ["By the lake", "In the forest", "On the mountain", "At the campsite"], 0, "They will have a picnic by the lake.", "Họ sẽ có buổi picnic bên hồ.", "Listen: 'This afternoon we are going to have a picnic by the lake.'"],
  ["How long has the family been travelling?", ["One day", "Two days", "One week", "Two weeks"], 2, "The family has been travelling for one week.", "Gia đình đã đi du lịch được một tuần.", "Listen: 'We have been travelling around the country for one week now, and it's amazing.'"],
  ["What must campers do before leaving the site?", ["Pay a fee", "Clean up the tents", "Sign a form", "Return their keys"], 1, "Campers must clean up the tents before leaving.", "Người cắm trại phải dọn dẹp lều trước khi rời đi.", "Listen: 'Before you leave the campsite, please make sure to clean up your tents.'"],
  ["What did Grandma bring back from her trip?", ["A hat", "Shells", "A book", "Postcards"], 1, "Grandma brought back shells from her trip.", "Bà đã mang về những vỏ sò từ chuyến đi của mình.", "Listen: 'Grandma brought back some lovely shells for us from her holiday.'"],
  ["What activity will they do tomorrow morning?", ["Swimming", "Hiking", "Fishing", "Kayaking"], 3, "Tomorrow morning they will go kayaking.", "Sáng mai họ sẽ đi chèo thuyền kayak.", "Listen: 'Tomorrow morning, we are all going kayaking on the lake, it should be fun!'"],
];

const flyers10: CambridgeMockExam = {
  id: "cambridge-flyers-10",
  title: "Flyers Mock Test 10 - Holidays & Adventure",
  titleVi: "Đề thi thử Flyers 10 - Kỳ nghỉ & Phiêu lưu",
  level: "flyers",
  duration: 35,
  totalQuestions: 30,
  questions: build(f10Rw, f10Ls),
};

export const cambridgeExamsFlyers6to10: CambridgeMockExam[] = [
  flyers6,
  flyers7,
  flyers8,
  flyers9,
  flyers10,
];
