/**
 * @file cambridgeExamsKet13to14.ts
 * @description Two Cambridge Key / KET (A2) mock exams, tests 13 to 14. Themes:
 *              13 - Volunteering & Community; 14 - Technology in Daily Life.
 *              Each exam has 20 Reading & Writing questions (four reading-text
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
/* KET 13 - Volunteering & Community                             */
/* ============================================================= */
const p13a =
  "Last month, my class started a project to help older people in our town. Every Saturday morning, a group of six students visits a care home near the library. We chat with the residents, play card games, and sometimes sing songs together. One lady called Mrs. Hill told me she loves hearing about our school days because it reminds her of when she was young. Our teacher says that giving our time to others is just as important as giving money. At the end of each visit, the residents always thank us and ask when we will come back. I feel proud to be part of this project.";
const p13b =
  "Dear Sam,\nI joined a new volunteer group last week called Clean Streets. Every Sunday afternoon, about twenty of us meet at the park gate and walk around the neighbourhood picking up litter. We wear gloves and use special bags that the council gives us for free. Last weekend, we collected fifteen bags of rubbish in only two hours! It was hard work, but it felt good to make our streets look nicer. Some of my neighbours even came out to thank us. Would you like to join next Sunday? We always need more helpers, and it is a great way to meet new people.\nBest wishes, Tom";
const p13c =
  "Notice: Community Helpers Needed\nOur local food bank needs volunteers to help sort and pack food for families in need. You do not need any special skills, just a friendly attitude and two free hours a week. Volunteers must be at least fourteen years old, and younger helpers should come with a parent. We meet every Wednesday evening from 5 to 7 o'clock at the community hall on Church Road. Please wear comfortable shoes because you will be standing for most of the time. If you are interested, speak to Mrs. Ahmed at the front desk or call the number below.";
const p13d =
  "My name is Priya, and I have volunteered at the animal shelter for two years. Every weekend, I help feed the cats and dogs, clean their cages, and walk the dogs in the small garden behind the shelter. My favourite job is helping new families choose a pet that matches their lifestyle. Last week, a kind family adopted an old dog named Rusty who had been at the shelter for almost a year. Everyone was so happy to see him go to a new home. The shelter manager says volunteers like me make a real difference to the animals' lives, and that makes me want to keep helping every week.";

const k13Rw: Tuple[] = [
  ["What does the class do every Saturday morning?", ["Clean the library", "Visit a care home", "Play football", "Sell cakes"], 1, "The passage says a group of students visits a care home near the library every Saturday morning.", "Đoạn văn nói một nhóm học sinh đến thăm viện dưỡng lão gần thư viện mỗi sáng thứ Bảy.", p13a],
  ["What do the students do with the residents?", ["Cook meals", "Chat and play card games", "Clean the rooms", "Watch television"], 1, "The passage says they chat with the residents, play card games, and sometimes sing songs.", "Đoạn văn nói họ trò chuyện với người cao tuổi, chơi bài và đôi khi hát cùng nhau.", p13a],
  ["Why does Mrs. Hill enjoy the visits?", ["It reminds her of her school days", "She gets free food", "She wins the card games", "She likes the noise"], 0, "The passage says hearing about school days reminds her of when she was young.", "Đoạn văn nói nghe về ngày đi học nhắc bà nhớ lại thời trẻ của mình.", p13a],
  ["What does the teacher say about giving time?", ["It is a waste of time", "It is as important as giving money", "It is only for adults", "It is not necessary"], 1, "The teacher says giving time to others is just as important as giving money.", "Cô giáo nói dành thời gian giúp người khác cũng quan trọng như việc cho tiền.", p13a],
  ["How does the writer feel about the project?", ["Bored", "Proud", "Nervous", "Angry"], 1, "The passage ends 'I feel proud to be part of this project'.", "Đoạn văn kết thúc bằng 'tôi cảm thấy tự hào khi là một phần của dự án này'.", p13a],
  ["When does Tom's group meet to pick up litter?", ["Saturday morning", "Sunday afternoon", "Friday evening", "Monday morning"], 1, "Tom says they meet every Sunday afternoon at the park gate.", "Tom nói họ gặp nhau vào chiều Chủ nhật ở cổng công viên.", p13b],
  ["What does the council give the volunteers?", ["Money", "Gloves and special bags", "Free lunch", "T-shirts"], 1, "The letter says they wear gloves and use special bags that the council gives them for free.", "Bức thư nói họ đeo găng tay và dùng túi đặc biệt do hội đồng cung cấp miễn phí.", p13b],
  ["How many bags of rubbish did they collect last weekend?", ["Five", "Ten", "Fifteen", "Twenty"], 2, "Tom says they collected fifteen bags of rubbish in only two hours.", "Tom nói họ đã thu gom được mười lăm túi rác chỉ trong hai giờ.", p13b],
  ["What does Tom ask Sam to do?", ["Lend him money", "Join next Sunday", "Visit the care home", "Buy new gloves"], 1, "Tom asks 'Would you like to join next Sunday?'.", "Tom hỏi 'Bạn có muốn tham gia vào Chủ nhật tới không?'.", p13b],
  ["What is a good way to meet new people, according to Tom?", ["Watching television", "Joining the volunteer group", "Staying at home", "Reading books"], 1, "Tom says it is a great way to meet new people.", "Tom nói đây là một cách tuyệt vời để gặp gỡ những người mới.", p13b],
  ["What does the food bank need help with?", ["Cooking dinners", "Sorting and packing food", "Driving vehicles", "Cleaning cars"], 1, "The notice says the food bank needs volunteers to help sort and pack food.", "Thông báo nói ngân hàng thực phẩm cần tình nguyện viên giúp phân loại và đóng gói thức ăn.", p13c],
  ["What is the minimum age for volunteers without a parent?", ["Ten", "Twelve", "Fourteen", "Sixteen"], 2, "The notice says volunteers must be at least fourteen years old.", "Thông báo nói tình nguyện viên phải ít nhất mười bốn tuổi.", p13c],
  ["When do they meet every week?", ["Monday morning", "Wednesday evening", "Friday afternoon", "Sunday morning"], 1, "The notice says they meet every Wednesday evening from 5 to 7 o'clock.", "Thông báo nói họ gặp nhau mỗi tối thứ Tư từ 5 đến 7 giờ.", p13c],
  ["What should volunteers wear?", ["Formal clothes", "Comfortable shoes", "A uniform", "A hat"], 1, "The notice says to wear comfortable shoes because you will be standing.", "Thông báo nói nên mang giày thoải mái vì sẽ phải đứng nhiều.", p13c],
  ["Who should interested people speak to?", ["Mrs. Ahmed", "Mrs. Hill", "Tom", "Priya"], 0, "The notice says to speak to Mrs. Ahmed at the front desk.", "Thông báo nói hãy nói chuyện với bà Ahmed ở bàn lễ tân.", p13c],
  ["How long has Priya volunteered at the animal shelter?", ["One year", "Two years", "Three years", "Five years"], 1, "The passage says Priya has volunteered at the shelter for two years.", "Đoạn văn nói Priya đã tình nguyện tại trại động vật hai năm.", p13d],
  ["What does Priya do every weekend?", ["Wash cars", "Feed and clean for the animals", "Sell tickets", "Teach classes"], 1, "The passage says she helps feed the cats and dogs and clean their cages.", "Đoạn văn nói cô ấy giúp cho mèo chó ăn và dọn dẹp chuồng.", p13d],
  ["What is Priya's favourite job?", ["Cleaning cages", "Helping families choose a pet", "Walking dogs", "Answering the phone"], 1, "The passage says her favourite job is helping new families choose a pet.", "Đoạn văn nói công việc yêu thích của cô là giúp các gia đình chọn thú cưng phù hợp.", p13d],
  ["What happened to Rusty the dog?", ["He got sick", "He was adopted by a family", "He ran away", "He won a prize"], 1, "The passage says a kind family adopted an old dog named Rusty.", "Đoạn văn nói một gia đình tốt bụng đã nhận nuôi chú chó già tên Rusty.", p13d],
  ["What does the shelter manager say about volunteers?", ["They cause problems", "They make a real difference", "They are not needed", "They should leave"], 1, "The manager says volunteers like Priya make a real difference to the animals' lives.", "Người quản lý nói tình nguyện viên như Priya tạo ra sự khác biệt thật sự cho cuộc sống của các con vật.", p13d],
];
const k13Ls: Tuple[] = [
  ["What time does the litter-picking group meet?", ["Nine o'clock", "Two o'clock", "Four o'clock", "Six o'clock"], 1, "The speaker says the group meets at two o'clock.", "Người nói cho biết nhóm gặp nhau lúc hai giờ.", "Listen: 'Remember, our litter-picking group meets at two o'clock by the park gate.'"],
  ["Where should new volunteers go first?", ["The library", "The community hall", "The school office", "The park"], 1, "The speaker says new volunteers should go to the community hall.", "Người nói cho biết tình nguyện viên mới nên đến hội trường cộng đồng.", "Listen: 'New volunteers, please go straight to the community hall to sign in.'"],
  ["What should volunteers bring to the food bank?", ["Their own gloves", "Warm clothes", "A packed lunch", "Nothing special"], 3, "The speaker says volunteers don't need to bring anything special.", "Người nói cho biết tình nguyện viên không cần mang gì đặc biệt.", "Listen: 'Don't worry about bringing anything special, we provide everything you need.'"],
  ["How many dogs need walking today?", ["Two", "Four", "Six", "Eight"], 2, "The speaker says six dogs need walking today.", "Người nói cho biết có sáu con chó cần được dắt đi dạo hôm nay.", "Listen: 'We have six dogs who need a walk this afternoon, can you help?'"],
  ["Why is the woman thanking the volunteers?", ["For cleaning her house", "For helping at the care home", "For fixing her car", "For cooking dinner"], 1, "The woman thanks the volunteers for helping at the care home.", "Người phụ nữ cảm ơn các tình nguyện viên vì đã giúp đỡ tại viện dưỡng lão.", "Listen: 'Thank you so much for helping at the care home every week, it means a lot.'"],
  ["What did the volunteers collect last Sunday?", ["Old clothes", "Bags of litter", "Books", "Toys"], 1, "The speaker says they collected bags of litter last Sunday.", "Người nói cho biết họ đã thu gom các túi rác vào Chủ nhật tuần trước.", "Listen: 'Last Sunday we collected so many bags of litter from the park.'"],
  ["What age must volunteers be at the food bank?", ["Ten", "Twelve", "Fourteen", "Sixteen"], 2, "The speaker says volunteers must be fourteen or older.", "Người nói cho biết tình nguyện viên phải từ mười bốn tuổi trở lên.", "Listen: 'You need to be fourteen or older to volunteer here without a parent.'"],
  ["What is Priya doing this weekend?", ["Visiting family", "Helping at the animal shelter", "Going shopping", "Studying for a test"], 1, "Priya says she is helping at the animal shelter this weekend.", "Priya nói cô ấy sẽ giúp đỡ tại trại động vật vào cuối tuần này.", "Listen: 'This weekend I'm helping at the animal shelter again, as usual.'"],
  ["Who was adopted last week?", ["A cat named Milo", "A dog named Rusty", "A rabbit", "A bird"], 1, "The speaker says a dog named Rusty was adopted last week.", "Người nói cho biết một chú chó tên Rusty đã được nhận nuôi tuần trước.", "Listen: 'Great news, Rusty the dog was adopted by a lovely family last week.'"],
  ["What does the teacher say volunteering teaches students?", ["Nothing useful", "Kindness and teamwork", "How to cook", "How to drive"], 1, "The teacher says volunteering teaches kindness and teamwork.", "Giáo viên nói làm tình nguyện dạy cho học sinh lòng tốt và tinh thần làm việc nhóm.", "Listen: 'Volunteering teaches you kindness and teamwork, both very important skills.'"],
];

const ket13: CambridgeMockExam = {
  id: "cambridge-ket-13",
  title: "KET Mock Test 13 - Volunteering & Community",
  titleVi: "Đề thi thử KET 13 - Tình nguyện & Cộng đồng",
  level: "ket",
  duration: 40,
  totalQuestions: 30,
  questions: build(k13Rw, k13Ls),
};

/* ============================================================= */
/* KET 14 - Technology in Daily Life                             */
/* ============================================================= */
const p14a =
  "Most students in my school now use tablets in class instead of paper textbooks. Our teachers say tablets make lessons more interesting because we can watch videos, play learning games, and check our answers straight away. Last week, our science teacher used a tablet app to show us how the human heart works, with a moving picture of it beating. Some students still prefer writing with a pen because they say it helps them remember information better. My school also has a rule that we cannot use tablets during break time, only during lessons. I think tablets are useful, but I still enjoy reading real books at home.";
const p14b =
  "Dear Uncle Jack,\nThank you for the smartwatch you gave me for my birthday! I have been wearing it every day since I got it. It counts my steps, tells me the time, and even reminds me to drink water during the day. Yesterday, it told me I had walked more than eight thousand steps just from walking to school and back. My favourite feature is the alarm, because it wakes me up with a gentle vibration instead of a loud noise. My little sister wants one too, but Mum says she is too young for a smartwatch right now. Thanks again for such a great present!\nLove, Jamie";
const p14c =
  "Notice: New Computer Room Rules\nOur school library has a new computer room with fifteen new computers for students to use. Students may use the computers for homework and school projects between 8 and 9 in the morning, and again after school until 5 o'clock. Games and social media websites are not allowed during these times. If a computer breaks or does not work properly, please tell the librarian immediately instead of trying to fix it yourself. Students must also remember to log out when they finish, so the next person can use the computer safely. Please read these rules carefully before using the room.";
const p14d =
  "My name is Leo, and I am learning to build my own website this year. Every Tuesday after school, I go to a coding club where a teacher named Ms. Rivera shows us how to write simple computer code. At first, I found it difficult to understand, but now I can make a webpage with pictures, colours, and even a small game. Last month, our club had a competition, and my website about space won second prize. Ms. Rivera says that learning to code is an important skill for the future because so many jobs now need people who understand technology. I hope to keep learning and one day build an app of my own.";

const k14Rw: Tuple[] = [
  ["What do students in the writer's school use instead of textbooks?", ["Notebooks", "Tablets", "Newspapers", "Whiteboards"], 1, "The passage says students use tablets in class instead of paper textbooks.", "Đoạn văn nói học sinh dùng máy tính bảng thay cho sách giáo khoa giấy.", p14a],
  ["Why do teachers say tablets make lessons interesting?", ["They are cheaper", "Students can watch videos and play learning games", "They are lighter than books", "They never break"], 1, "Teachers say tablets let students watch videos, play learning games, and check answers.", "Giáo viên nói máy tính bảng cho phép học sinh xem video, chơi trò chơi học tập.", p14a],
  ["What did the science teacher show with a tablet app?", ["A map of the world", "How the human heart works", "A history film", "A maths game"], 1, "The passage says the teacher used an app to show how the human heart works.", "Đoạn văn nói giáo viên đã dùng ứng dụng để chỉ cách trái tim con người hoạt động.", p14a],
  ["Why do some students still prefer writing with a pen?", ["It is faster", "It helps them remember information", "Pens are cheaper", "Tablets are too heavy"], 1, "Some students say writing with a pen helps them remember information better.", "Một số học sinh nói viết bằng bút giúp họ nhớ thông tin tốt hơn.", p14a],
  ["When are tablets not allowed at school?", ["During lessons", "During break time", "In the morning", "Never allowed"], 1, "The passage says tablets cannot be used during break time.", "Đoạn văn nói không được dùng máy tính bảng trong giờ ra chơi.", p14a],
  ["What does Jamie's smartwatch count?", ["Calories", "Steps", "Money", "Books read"], 1, "Jamie says the smartwatch counts his steps.", "Jamie nói đồng hồ thông minh đếm số bước chân của cậu ấy.", p14b],
  ["How many steps did Jamie walk yesterday?", ["Five thousand", "More than eight thousand", "Ten thousand", "Two thousand"], 1, "Jamie says the watch told him he had walked more than eight thousand steps.", "Jamie nói đồng hồ báo cậu đã đi hơn tám nghìn bước.", p14b],
  ["What is Jamie's favourite feature of the smartwatch?", ["The steps counter", "The alarm", "The clock", "The water reminder"], 1, "Jamie says his favourite feature is the alarm.", "Jamie nói tính năng yêu thích của cậu là báo thức.", p14b],
  ["Why can't Jamie's sister have a smartwatch yet?", ["They are too expensive", "Mum says she is too young", "There are none left in shops", "She does not like watches"], 1, "Jamie says Mum thinks his sister is too young for a smartwatch right now.", "Jamie nói mẹ nghĩ em gái còn quá nhỏ để dùng đồng hồ thông minh.", p14b],
  ["Who gave Jamie the smartwatch?", ["His mum", "Uncle Jack", "His teacher", "His sister"], 1, "The letter is addressed to Uncle Jack, thanking him for the gift.", "Bức thư gửi cho chú Jack để cảm ơn món quà.", p14b],
  ["How many new computers are in the computer room?", ["Ten", "Twelve", "Fifteen", "Twenty"], 2, "The notice says there are fifteen new computers.", "Thông báo nói có mười lăm máy tính mới.", p14c],
  ["What are students not allowed to do on the computers?", ["Homework", "Games and social media", "School projects", "Reading"], 1, "The notice says games and social media websites are not allowed.", "Thông báo nói không được chơi game và vào mạng xã hội.", p14c],
  ["What should students do if a computer breaks?", ["Try to fix it themselves", "Tell the librarian immediately", "Ignore it", "Turn it off and leave"], 1, "The notice says to tell the librarian immediately if a computer breaks.", "Thông báo nói hãy báo ngay cho thủ thư nếu máy tính bị hỏng.", p14c],
  ["What must students remember when they finish using a computer?", ["Turn off the lights", "Log out", "Close the door", "Take their bag"], 1, "The notice says students must remember to log out when they finish.", "Thông báo nói học sinh phải nhớ đăng xuất khi dùng xong.", p14c],
  ["When can students use the computer room after school?", ["Until 4 o'clock", "Until 5 o'clock", "Until 6 o'clock", "Until 7 o'clock"], 1, "The notice says students can use the room after school until 5 o'clock.", "Thông báo nói học sinh có thể dùng phòng máy tính đến 5 giờ chiều.", p14c],
  ["What is Leo learning to build?", ["A robot", "A website", "A tablet app store", "A video game console"], 1, "The passage says Leo is learning to build his own website.", "Đoạn văn nói Leo đang học cách xây dựng trang web của riêng mình.", p14d],
  ["Who teaches the coding club?", ["Mr. Chen", "Ms. Rivera", "Mrs. Ahmed", "Mrs. Hill"], 1, "The passage says a teacher named Ms. Rivera shows them how to write code.", "Đoạn văn nói cô giáo tên Ms. Rivera dạy họ viết mã.", p14d],
  ["What prize did Leo's website win?", ["First prize", "Second prize", "Third prize", "No prize"], 1, "The passage says Leo's website about space won second prize.", "Đoạn văn nói trang web về vũ trụ của Leo đã giành giải nhì.", p14d],
  ["Why does Ms. Rivera say coding is important?", ["It is easy", "Many future jobs need it", "It is fun only", "Schools require it"], 1, "Ms. Rivera says coding is important because many jobs need people who understand technology.", "Cô Rivera nói lập trình quan trọng vì nhiều công việc cần người hiểu công nghệ.", p14d],
  ["What does Leo hope to do one day?", ["Stop coding", "Build his own app", "Become a teacher", "Sell computers"], 1, "The passage says Leo hopes to one day build an app of his own.", "Đoạn văn nói Leo hy vọng một ngày sẽ tự xây dựng một ứng dụng của riêng mình.", p14d],
];
const k14Ls: Tuple[] = [
  ["What does the boy use his tablet for at school?", ["Playing games only", "Watching lesson videos", "Sleeping", "Drawing pictures"], 1, "The boy says he uses his tablet to watch lesson videos.", "Cậu bé nói cậu dùng máy tính bảng để xem video bài học.", "Listen: 'I mostly use my tablet at school to watch the lesson videos our teacher shares.'"],
  ["What time does the computer room open in the morning?", ["7 o'clock", "8 o'clock", "9 o'clock", "10 o'clock"], 1, "The speaker says the computer room opens at 8 o'clock.", "Người nói cho biết phòng máy tính mở cửa lúc 8 giờ.", "Listen: 'The computer room opens at eight o'clock every morning for homework.'"],
  ["What did Jamie's smartwatch remind him to do?", ["Eat lunch", "Drink water", "Do homework", "Go to bed"], 1, "Jamie's watch reminds him to drink water.", "Đồng hồ của Jamie nhắc cậu uống nước.", "Listen: 'My watch keeps reminding me to drink water every hour, it's really helpful.'"],
  ["Who won second prize in the coding competition?", ["Ms. Rivera", "Leo", "Jamie", "Priya"], 1, "The speaker says Leo won second prize.", "Người nói cho biết Leo đã giành giải nhì.", "Listen: 'Congratulations to Leo, who won second prize for his amazing space website.'"],
  ["What should students do before leaving the computer room?", ["Turn off the lights", "Log out of the computer", "Close the window", "Lock the door"], 1, "The speaker says students must log out before leaving.", "Người nói cho biết học sinh phải đăng xuất trước khi rời đi.", "Listen: 'Before you leave, please remember to log out of your computer.'"],
  ["How many computers are in the new room?", ["Ten", "Twelve", "Fifteen", "Twenty"], 2, "The speaker says there are fifteen computers in the new room.", "Người nói cho biết có mười lăm máy tính trong phòng mới.", "Listen: 'Our new computer room has fifteen brand new computers for everyone to use.'"],
  ["Why does the teacher like using tablets in class?", ["They are quiet", "Lessons become more interesting", "They are free", "They are small"], 1, "The teacher says tablets make lessons more interesting.", "Giáo viên nói máy tính bảng làm bài học thú vị hơn.", "Listen: 'I love using tablets because they make my lessons much more interesting for students.'"],
  ["What day does Leo go to the coding club?", ["Monday", "Tuesday", "Wednesday", "Friday"], 1, "Leo goes to the coding club every Tuesday after school.", "Leo tham gia câu lạc bộ lập trình vào thứ Ba hàng tuần.", "Listen: 'Every Tuesday after school, I go straight to the coding club with Ms. Rivera.'"],
  ["What does Ms. Rivera say about coding skills?", ["They are useless", "They are important for future jobs", "Only adults need them", "They are too hard to learn"], 1, "Ms. Rivera says coding is an important skill for the future.", "Cô Rivera nói lập trình là một kỹ năng quan trọng cho tương lai.", "Listen: 'Ms. Rivera always tells us coding is such an important skill for our future jobs.'"],
  ["What does the boy want to build one day?", ["A robot", "His own app", "A tablet", "A smartwatch"], 1, "The boy says he hopes to build an app of his own one day.", "Cậu bé nói cậu hy vọng một ngày sẽ tự xây dựng một ứng dụng.", "Listen: 'One day, I really hope to build my very own app, just like the big companies.'"],
];

const ket14: CambridgeMockExam = {
  id: "cambridge-ket-14",
  title: "KET Mock Test 14 - Technology in Daily Life",
  titleVi: "Đề thi thử KET 14 - Công nghệ trong đời sống hàng ngày",
  level: "ket",
  duration: 40,
  totalQuestions: 30,
  questions: build(k14Rw, k14Ls),
};

export const cambridgeExamsKet13to14: CambridgeMockExam[] = [ket13, ket14];
