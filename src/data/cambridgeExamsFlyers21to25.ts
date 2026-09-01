/**
 * @file cambridgeExamsFlyers21to25.ts
 * @description Five Cambridge Flyers (A2) mock exams, tests 21 to 25.
 *              Themes: Space & Science, Sports Day, Computers at Home, Food
 *              Around the World, Helping the Planet. Each paper has 18 Reading &
 *              Writing questions and 10 Listening questions with full scripts.
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

/* ================== FLYERS 21 - Space & Science ================== */
const f21pA =
  "Last Friday our science club visited a planetarium. Inside, the ceiling became a night sky full of stars. The guide showed us how people used the stars to find their way at sea long before maps and machines existed. My favourite part was a short film about the first people who walked on the Moon in 1969.";
const f21pB =
  "After the film we did a simple experiment. We put a torch behind a ball to see how the Moon gets its light. The guide explained that the Moon does not make light of its own; it only reflects light from the Sun. Now I understand why the Moon looks different every week.";

const f21Rw: Tuple[] = [
  ["Where did the club go?", ["To a museum", "To a planetarium", "To a laboratory", "To a library"], 1, "The science club visited a planetarium.", "Câu lạc bộ khoa học đến nhà chiếu hình vũ trụ.", f21pA],
  ["What happened to the ceiling?", ["It opened", "It became a night sky", "It turned white", "It moved"], 1, "The ceiling became a night sky full of stars.", "Trần nhà biến thành bầu trời đêm đầy sao.", f21pA],
  ["What did sailors use the stars for?", ["To tell the time", "To find their way", "To catch fish", "To make maps of land"], 1, "People used the stars to find their way at sea.", "Người ta dùng sao để định hướng trên biển.", f21pA],
  ["What was the writer's favourite part?", ["The stars", "The guide's talk", "A film about the Moon landing", "The experiment"], 2, "The favourite part was the film about the first Moon walk.", "Phần thích nhất là phim về lần đầu đặt chân lên Mặt Trăng.", f21pA],
  ["When did people first walk on the Moon?", ["1959", "1969", "1979", "1989"], 1, "The text says 1969.", "Bài đọc nói năm 1969.", f21pA],
  ["What did they use in the experiment?", ["A torch and a ball", "Water and salt", "A magnet", "A telescope"], 0, "They put a torch behind a ball.", "Các bạn đặt đèn pin phía sau quả bóng.", f21pB],
  ["What does the Moon do with light?", ["It makes its own", "It reflects the Sun's light", "It blocks light", "It stores light"], 1, "The Moon reflects light from the Sun.", "Mặt Trăng phản chiếu ánh sáng Mặt Trời.", f21pB],
  ["What did the writer finally understand?", ["Why the Moon changes shape", "Why stars are hot", "How rockets fly", "Why the sky is blue"], 0, "Now the writer understands why the Moon looks different each week.", "Bạn ấy hiểu vì sao Mặt Trăng trông khác nhau mỗi tuần.", f21pB],
  ["The Earth ___ around the Sun.", ["move", "moves", "moving", "moved next year"], 1, "'The Earth' is singular, so we use 'moves'.", "'The Earth' số ít nên dùng 'moves'.", undefined],
  ["A person who studies stars is an ___.", ["astronaut", "astronomer", "architect", "athlete"], 1, "An astronomer studies stars.", "Nhà thiên văn nghiên cứu các vì sao.", undefined],
  ["We look at planets through a ___.", ["telescope", "microscope", "periscope", "stethoscope"], 0, "A telescope shows distant objects.", "Kính viễn vọng nhìn vật thể ở xa.", undefined],
  ["Rockets carry astronauts into ___.", ["space", "spice", "spare", "spade"], 0, "Rockets go into space.", "Tên lửa bay vào không gian.", undefined],
  ["The Sun is a ___, not a planet.", ["star", "moon", "comet", "cloud"], 0, "The Sun is a star.", "Mặt Trời là một ngôi sao.", undefined],
  ["Scientists write down what they see in a ___.", ["report", "recipe", "poem", "poster"], 0, "Observations go into a report.", "Quan sát được ghi vào báo cáo.", undefined],
  ["Water ___ into steam when it is very hot.", ["turn", "turns", "turning", "to turn"], 1, "'Water' is singular here, so 'turns' is correct.", "'Water' số ít nên dùng 'turns'.", undefined],
  ["Which planet is closest to the Sun?", ["Mercury", "Mars", "Jupiter", "Saturn"], 0, "Mercury is the closest planet to the Sun.", "Sao Thủy gần Mặt Trời nhất.", undefined],
  ["We must wear glasses to protect our ___ in the laboratory.", ["eyes", "ears", "elbows", "ankles"], 0, "Safety glasses protect our eyes.", "Kính bảo hộ bảo vệ mắt.", undefined],
  ["An experiment that fails can still ___ us something.", ["teach", "teaches", "teaching", "taught soon"], 0, "After 'can' we use the base form 'teach'.", "Sau 'can' dùng động từ nguyên thể 'teach'.", undefined],
];

const f21Ls: Tuple[] = [
  ["What is the project about?", ["Volcanoes", "The solar system", "Dinosaurs", "Weather"], 1, "The project is about the solar system.", "Bài dự án nói về hệ Mặt Trời.", "Girl: 'Our science project this month is about the solar system.'"],
  ["How many planets will they draw?", ["Six", "Seven", "Eight", "Nine"], 2, "They will draw eight planets.", "Các bạn sẽ vẽ tám hành tinh.", "Boy: 'We need to draw all eight planets on the poster.'"],
  ["When is the science fair?", ["On Monday", "On Wednesday", "On Friday", "On Saturday"], 2, "The science fair is on Friday.", "Hội chợ khoa học vào thứ Sáu.", "Man: 'Remember, the science fair is on Friday afternoon.'"],
  ["What does the girl need to bring?", ["A torch", "A magnet", "A ruler", "A battery"], 3, "She needs a battery.", "Bạn ấy cần mang pin.", "Girl: 'I still need a battery for my model.'"],
  ["Which planet is red?", ["Venus", "Mars", "Neptune", "Saturn"], 1, "Mars is the red planet.", "Sao Hỏa là hành tinh đỏ.", "Woman: 'Mars looks red because of the iron in its dust.'"],
  ["Who helps with the experiment?", ["The teacher", "The father", "An older sister", "A classmate"], 2, "His older sister helps.", "Chị gái giúp cậu ấy.", "Boy: 'My older sister helped me with the experiment at home.'"],
  ["How long does the film last?", ["Fifteen minutes", "Twenty minutes", "Half an hour", "One hour"], 2, "The film lasts half an hour.", "Bộ phim dài nửa tiếng.", "Woman: 'The space film lasts half an hour.'"],
  ["What did the class see at night?", ["A comet", "A rainbow", "A shooting star", "A rocket"], 2, "They saw a shooting star.", "Các bạn thấy một ngôi sao băng.", "Girl: 'We stayed outside and saw a shooting star!'"],
  ["What is the boy's job in the group?", ["Drawing", "Writing the notes", "Speaking", "Filming"], 1, "He writes the notes.", "Cậu ấy ghi chép.", "Boy: 'In our group I write the notes and Nam speaks.'"],
  ["Where will they put the poster?", ["In the hall", "In the library", "Outside the office", "In the classroom"], 0, "The poster will go in the hall.", "Tấm áp phích sẽ đặt ở sảnh.", "Man: 'Put your finished poster in the hall, please.'"],
];

const flyers21: CambridgeMockExam = {
  id: "cambridge-flyers-21",
  title: "Flyers Mock Test 21 - Space & Science",
  titleVi: "Đề thi thử Flyers 21 - Vũ trụ & Khoa học",
  level: "flyers",
  duration: 30,
  totalQuestions: 28,
  questions: build(f21Rw, f21Ls),
};

/* ================== FLYERS 22 - Sports Day ================== */
const f22pA =
  "Our school sports day started at eight in the morning because the afternoon is too hot. There were four teams and each team wore a different colour. I was in the yellow team with my best friend. We practised the relay race for three weeks before the day.";
const f22pB =
  "My team did not win the relay, but I came second in the long jump. The best moment was the teachers' race at the end: our maths teacher fell over and everybody laughed, including him. The head teacher said sports day is not about winning but about trying together.";

const f22Rw: Tuple[] = [
  ["Why did sports day start early?", ["The buses came early", "The afternoon is too hot", "The field was busy", "The teachers asked"], 1, "It started at eight because the afternoon is too hot.", "Bắt đầu lúc tám giờ vì buổi chiều quá nóng.", f22pA],
  ["How many teams were there?", ["Two", "Three", "Four", "Five"], 2, "There were four teams.", "Có bốn đội.", f22pA],
  ["What was different about each team?", ["Their colour", "Their age", "Their class", "Their sport"], 0, "Each team wore a different colour.", "Mỗi đội mặc một màu khác nhau.", f22pA],
  ["Which team was the writer in?", ["Red", "Blue", "Yellow", "Green"], 2, "The writer was in the yellow team.", "Bạn ấy ở đội vàng.", f22pA],
  ["How long did they practise?", ["One week", "Two weeks", "Three weeks", "A month"], 2, "They practised for three weeks.", "Các bạn luyện tập ba tuần.", f22pA],
  ["What did the writer win?", ["First in the relay", "Second in the long jump", "First in running", "Nothing"], 1, "The writer came second in the long jump.", "Bạn ấy về nhì môn nhảy xa.", f22pB],
  ["What was the best moment?", ["The relay", "The prize", "The teachers' race", "The lunch"], 2, "The best moment was the teachers' race.", "Khoảnh khắc vui nhất là cuộc đua của các thầy cô.", f22pB],
  ["How did the maths teacher react?", ["He was angry", "He laughed too", "He left", "He complained"], 1, "Everybody laughed, including him.", "Mọi người cười, kể cả thầy ấy.", f22pB],
  ["What did the head teacher say?", ["Winning matters most", "Trying together matters most", "Practice is boring", "Sports day is too long"], 1, "Sports day is about trying together, not winning.", "Ngày hội thể thao là cùng nhau cố gắng, không phải thắng thua.", f22pB],
  ["A person who wins first place gets a gold ___.", ["medal", "meddle", "model", "muddle"], 0, "The winner gets a gold medal.", "Người thắng nhận huy chương vàng.", undefined],
  ["He runs ___ than anyone in our class.", ["fast", "faster", "fastest", "more fast"], 1, "'Than' needs the comparative 'faster'.", "Có 'than' nên dùng 'faster'.", undefined],
  ["We play basketball on a ___.", ["court", "pool", "track", "pitch"], 0, "Basketball is played on a court.", "Bóng rổ chơi trên sân court.", undefined],
  ["The person who watches the rules in a match is the ___.", ["referee", "reporter", "reader", "runner"], 0, "The referee controls the rules.", "Trọng tài điều khiển luật thi đấu.", undefined],
  ["Before sport we should ___ up.", ["warm", "warmer", "warmly", "warmed"], 0, "The phrase is 'warm up'.", "Cụm từ đúng là 'warm up'.", undefined],
  ["Our team ___ the match last Saturday.", ["win", "wins", "won", "winning"], 2, "'Last Saturday' needs the past simple 'won'.", "'Last Saturday' dùng quá khứ 'won'.", undefined],
  ["Swimmers train in a ___.", ["pool", "field", "court", "gym"], 0, "Swimmers train in a pool.", "Vận động viên bơi tập ở hồ bơi.", undefined],
  ["I was tired ___ I finished the race.", ["but", "so", "because", "or"], 0, "'But' shows the contrast between tired and finishing.", "'But' thể hiện sự tương phản.", undefined],
  ["The score at the end was a ___: two - two.", ["draw", "drop", "drive", "drum"], 0, "An equal score is a draw.", "Tỉ số hòa gọi là draw.", undefined],
];

const f22Ls: Tuple[] = [
  ["What sport does the girl do on Tuesdays?", ["Badminton", "Volleyball", "Judo", "Dance"], 0, "She plays badminton on Tuesdays.", "Bạn ấy chơi cầu lông vào thứ Ba.", "Girl: 'I have badminton practice every Tuesday after school.'"],
  ["Who won the running race?", ["Minh", "Hoa", "Kien", "Lan"], 1, "Hoa won the race.", "Hoa thắng cuộc đua.", "Boy: 'Hoa won the two hundred metres by three seconds.'"],
  ["What time does the match start?", ["At two", "At half past two", "At three", "At half past three"], 3, "It starts at half past three.", "Trận đấu bắt đầu lúc ba giờ rưỡi.", "Man: 'The match kicks off at half past three.'"],
  ["What does the boy need for training?", ["New trainers", "A racket", "A helmet", "Gloves"], 0, "He needs new trainers.", "Cậu ấy cần giày thể thao mới.", "Boy: 'My old trainers are too small. I need new ones.'"],
  ["Where is the sports hall?", ["Behind the library", "Next to the canteen", "Near the gate", "Under the office"], 1, "The sports hall is next to the canteen.", "Nhà thi đấu nằm cạnh nhà ăn.", "Woman: 'The sports hall is next to the canteen.'"],
  ["How many players are in the team?", ["Nine", "Ten", "Eleven", "Twelve"], 2, "There are eleven players.", "Đội có mười một cầu thủ.", "Man: 'A football team has eleven players on the pitch.'"],
  ["What did the girl hurt?", ["Her wrist", "Her ankle", "Her knee", "Her shoulder"], 1, "She hurt her ankle.", "Bạn ấy đau mắt cá chân.", "Girl: 'I hurt my ankle when I landed after the jump.'"],
  ["What is the prize?", ["A cup", "A book", "A T-shirt", "A ticket"], 0, "The prize is a cup.", "Phần thưởng là một chiếc cúp.", "Woman: 'The winning class gets the silver cup.'"],
  ["Who is the new coach?", ["Mr Hung", "Mrs Mai", "Mr Tuan", "Miss Linh"], 2, "Mr Tuan is the new coach.", "Thầy Tuấn là huấn luyện viên mới.", "Boy: 'Mr Tuan is our new basketball coach this term.'"],
  ["What will they do if it rains?", ["Cancel the day", "Play indoors", "Wait an hour", "Go home"], 1, "They will play indoors.", "Nếu mưa các bạn sẽ chơi trong nhà.", "Man: 'If it rains, we will move all the games indoors.'"],
];

const flyers22: CambridgeMockExam = {
  id: "cambridge-flyers-22",
  title: "Flyers Mock Test 22 - Sports Day",
  titleVi: "Đề thi thử Flyers 22 - Ngày hội thể thao",
  level: "flyers",
  duration: 30,
  totalQuestions: 28,
  questions: build(f22Rw, f22Ls),
};

/* ================== FLYERS 23 - Computers at Home ================== */
const f23pA =
  "My family has one computer in the living room, not in the bedrooms. My parents chose that place so we can all see what everybody is doing. I use it for homework and for a coding club on Saturday. My little brother is only allowed thirty minutes of games a day.";
const f23pB =
  "Last month our teacher taught us three rules for using the internet safely: never give your address to strangers, always tell an adult if a message makes you uncomfortable, and check facts on two different websites before you believe them. The last rule surprised me most, because I used to believe everything I read.";

const f23Rw: Tuple[] = [
  ["Where is the computer?", ["In a bedroom", "In the living room", "In the kitchen", "In the garage"], 1, "The computer is in the living room.", "Máy tính đặt ở phòng khách.", f23pA],
  ["Why did the parents choose that place?", ["It is quiet", "Everyone can see the screen", "It is cool", "There is more space"], 1, "So everybody can see what others are doing.", "Để mọi người đều thấy người khác đang làm gì.", f23pA],
  ["What does the writer use the computer for?", ["Films only", "Homework and coding club", "Shopping", "Music"], 1, "For homework and a coding club.", "Để làm bài tập và học lập trình.", f23pA],
  ["When is the coding club?", ["On Friday", "On Saturday", "On Sunday", "Every day"], 1, "The coding club is on Saturday.", "Câu lạc bộ lập trình vào thứ Bảy.", f23pA],
  ["How long can the brother play games?", ["Fifteen minutes", "Thirty minutes", "One hour", "Two hours"], 1, "He is allowed thirty minutes a day.", "Em trai được chơi ba mươi phút mỗi ngày.", f23pA],
  ["How many internet rules did the teacher give?", ["Two", "Three", "Four", "Five"], 1, "The teacher gave three rules.", "Cô giáo đưa ra ba quy tắc.", f23pB],
  ["What should you never give strangers?", ["Your favourite colour", "Your address", "Your school subject", "Your age in years"], 1, "You should never give your address.", "Không bao giờ cho người lạ địa chỉ.", f23pB],
  ["What should you do about an uncomfortable message?", ["Delete it quietly", "Tell an adult", "Answer it", "Share it"], 1, "Always tell an adult.", "Hãy nói với người lớn.", f23pB],
  ["Why check two websites?", ["To read faster", "To be sure a fact is true", "To find pictures", "To save time"], 1, "Checking twice helps you know if a fact is true.", "Kiểm tra hai nguồn giúp biết thông tin có đúng không.", f23pB],
  ["Which rule surprised the writer?", ["The first", "The second", "The third", "None of them"], 2, "The last rule about checking facts surprised the writer most.", "Quy tắc cuối về kiểm chứng làm bạn ấy bất ngờ nhất.", f23pB],
  ["We type words with a ___.", ["keyboard", "cupboard", "blackboard", "surfboard"], 0, "You type with a keyboard.", "Bạn gõ chữ bằng bàn phím.", undefined],
  ["A secret word that protects your account is a ___.", ["password", "postcard", "passport", "postbox"], 0, "A password protects an account.", "Mật khẩu bảo vệ tài khoản.", undefined],
  ["I ___ my homework on the computer yesterday.", ["do", "does", "did", "doing"], 2, "'Yesterday' needs the past simple 'did'.", "'Yesterday' dùng quá khứ 'did'.", undefined],
  ["Please ___ your work before you close the file.", ["save", "saves", "saving", "saved"], 0, "After 'please' we use the base form 'save'.", "Sau 'please' dùng động từ nguyên thể.", undefined],
  ["You should ___ too much time in front of a screen.", ["not spend", "not spending", "no spend", "not to spend"], 0, "After 'should' we use 'not spend'.", "Sau 'should' dùng 'not spend'.", undefined],
  ["An email that you did not ask for is ___ mail.", ["junk", "jump", "just", "juice"], 0, "Unwanted email is junk mail.", "Thư rác gọi là junk mail.", undefined],
  ["We use a ___ to look for information online.", ["search engine", "sewing machine", "washing machine", "coffee machine"], 0, "A search engine finds information.", "Công cụ tìm kiếm giúp tìm thông tin.", undefined],
  ["My laptop is ___ than the old computer.", ["quick", "quicker", "quickest", "more quick"], 1, "'Than' needs the comparative 'quicker'.", "Có 'than' nên dùng 'quicker'.", undefined],
];

const f23Ls: Tuple[] = [
  ["What does the girl use the tablet for?", ["Games", "Reading books", "Drawing", "Videos"], 2, "She uses it for drawing.", "Bạn ấy dùng để vẽ.", "Girl: 'I mostly use the tablet for drawing pictures.'"],
  ["How long can the boy use the computer?", ["Half an hour", "One hour", "Two hours", "Three hours"], 1, "He can use it for one hour.", "Cậu ấy được dùng một tiếng.", "Man: 'You can use the computer for one hour after homework.'"],
  ["What is broken?", ["The mouse", "The screen", "The keyboard", "The printer"], 3, "The printer is broken.", "Máy in bị hỏng.", "Woman: 'The printer is broken, so email me the file instead.'"],
  ["What is the password for?", ["The wifi", "A game", "An email", "A tablet"], 0, "The password is for the wifi.", "Mật khẩu là của wifi.", "Boy: 'What is the new wifi password, Dad?'"],
  ["Which day is the coding club?", ["Tuesday", "Wednesday", "Thursday", "Saturday"], 3, "The coding club is on Saturday.", "Câu lạc bộ lập trình vào thứ Bảy.", "Woman: 'Coding club meets on Saturday morning at nine.'"],
  ["What did the class make?", ["A website", "A game", "A robot", "A video"], 1, "They made a game.", "Cả lớp làm một trò chơi.", "Girl: 'In the club we made a simple game with two levels.'"],
  ["Who helps the boy with typing?", ["His mother", "His brother", "His teacher", "His friend"], 2, "His teacher helps him.", "Thầy cô giúp cậu ấy.", "Boy: 'My teacher is helping me type faster.'"],
  ["Where must they not use phones?", ["In the canteen", "In the classroom", "In the garden", "On the bus"], 1, "Phones are not allowed in the classroom.", "Không được dùng điện thoại trong lớp.", "Man: 'Phones stay in your bag inside the classroom.'"],
  ["What did the girl forget?", ["Her password", "Her file", "Her charger", "Her headphones"], 2, "She forgot her charger.", "Bạn ấy quên bộ sạc.", "Girl: 'My battery is low and I forgot my charger.'"],
  ["What will they learn next week?", ["Making a video", "Typing", "Safe searching", "Drawing"], 2, "They will learn safe searching.", "Tuần tới các bạn học tìm kiếm an toàn.", "Woman: 'Next week we will learn how to search safely.'"],
];

const flyers23: CambridgeMockExam = {
  id: "cambridge-flyers-23",
  title: "Flyers Mock Test 23 - Computers at Home",
  titleVi: "Đề thi thử Flyers 23 - Máy tính ở nhà",
  level: "flyers",
  duration: 30,
  totalQuestions: 28,
  questions: build(f23Rw, f23Ls),
};

/* ================== FLYERS 24 - Food Around the World ================== */
const f24pA =
  "Every March our school holds an international food day. Each class chooses a country and cooks one simple dish. Last year my class chose Japan and we made rice balls. This year we are cooking a Mexican tomato soup because two students in our class have family there.";
const f24pB =
  "The rule is that every dish must be safe for everybody, so we write the ingredients on a card next to the plate. Some students cannot eat nuts or milk, and a card takes only a minute to write. Last year a parent said this small idea was the best part of the whole day.";

const f24Rw: Tuple[] = [
  ["When is the food day?", ["Every January", "Every March", "Every June", "Every October"], 1, "The school holds it every March.", "Trường tổ chức vào tháng Ba hằng năm.", f24pA],
  ["What does each class do?", ["Choose a country and cook a dish", "Bring shop food", "Sing a song", "Write a menu"], 0, "Each class chooses a country and cooks one dish.", "Mỗi lớp chọn một nước và nấu một món.", f24pA],
  ["What did the class make last year?", ["Noodles", "Rice balls", "Pancakes", "Bread"], 1, "Last year they made Japanese rice balls.", "Năm ngoái lớp làm cơm nắm Nhật Bản.", f24pA],
  ["What are they cooking this year?", ["Japanese rice balls", "Mexican tomato soup", "Italian pizza", "Indian curry"], 1, "This year it is a Mexican tomato soup.", "Năm nay là món súp cà chua Mexico.", f24pA],
  ["Why did they choose Mexico?", ["It is easy", "Two students have family there", "The teacher asked", "It is cheap"], 1, "Two students in the class have family there.", "Hai bạn trong lớp có gia đình ở đó.", f24pA],
  ["What must every dish be?", ["Hot", "Safe for everybody", "Cheap", "Sweet"], 1, "Every dish must be safe for everybody.", "Mỗi món phải an toàn cho tất cả mọi người.", f24pB],
  ["What do they write on a card?", ["The price", "The ingredients", "The cook's name", "The country"], 1, "They write the ingredients on the card.", "Các bạn ghi nguyên liệu lên tấm thẻ.", f24pB],
  ["Why are the cards important?", ["Some students cannot eat nuts or milk", "They look nice", "Teachers ask for them", "They save money"], 0, "Some students cannot eat nuts or milk.", "Một số bạn không ăn được hạt hoặc sữa.", f24pB],
  ["How long does writing a card take?", ["A minute", "Ten minutes", "Half an hour", "An hour"], 0, "A card takes only a minute to write.", "Viết một tấm thẻ chỉ mất một phút.", f24pB],
  ["What did a parent say?", ["The food was cold", "The cards were the best idea", "The day was too long", "Cooking is difficult"], 1, "A parent said the card idea was the best part.", "Một phụ huynh nói ý tưởng tấm thẻ là hay nhất.", f24pB],
  ["We boil water in a ___.", ["kettle", "cattle", "candle", "castle"], 0, "A kettle boils water.", "Ấm đun nước dùng để đun nước.", undefined],
  ["Rice is usually ___ before we eat it.", ["cooked", "cooks", "cooking", "cook"], 0, "The passive form is 'is cooked'.", "Dạng bị động là 'is cooked'.", undefined],
  ["There isn't ___ sugar in this cake.", ["many", "much", "lots", "a few"], 1, "'Sugar' is uncountable, so we use 'much'.", "'Sugar' không đếm được nên dùng 'much'.", undefined],
  ["A meal you eat in the middle of the day is ___.", ["breakfast", "lunch", "dinner", "supper"], 1, "The midday meal is lunch.", "Bữa giữa ngày là bữa trưa.", undefined],
  ["Lemons taste ___.", ["sour", "sweet", "salty", "spicy"], 0, "Lemons taste sour.", "Chanh có vị chua.", undefined],
  ["We ___ the vegetables before cooking them.", ["wash", "washes", "washing", "to wash"], 0, "With 'we' the present simple is 'wash'.", "Với 'we' dùng 'wash'.", undefined],
  ["A person who cooks in a restaurant is a ___.", ["chef", "chief", "chess", "chest"], 0, "A chef cooks in a restaurant.", "Đầu bếp nấu ăn trong nhà hàng.", undefined],
  ["This soup is ___ delicious dish in the menu.", ["a most", "the most", "most of", "more"], 1, "Superlatives use 'the most'.", "So sánh nhất dùng 'the most'.", undefined],
];

const f24Ls: Tuple[] = [
  ["What country will the girl's class cook from?", ["Korea", "Italy", "India", "Thailand"], 1, "Her class chose Italy.", "Lớp bạn ấy chọn nước Ý.", "Girl: 'Our class chose Italy, so we are making pasta.'"],
  ["What ingredient is missing?", ["Salt", "Eggs", "Cheese", "Flour"], 2, "The cheese is missing.", "Thiếu phô mai.", "Boy: 'We have everything except the cheese.'"],
  ["What time do they start cooking?", ["At eight", "At nine", "At ten", "At eleven"], 1, "They start at nine.", "Các bạn bắt đầu nấu lúc chín giờ.", "Woman: 'We start cooking at nine in the school kitchen.'"],
  ["Who cannot eat nuts?", ["Mai", "Tuan", "Sara", "Ben"], 2, "Sara cannot eat nuts.", "Sara không ăn được hạt.", "Man: 'Remember Sara cannot eat nuts, so label the plates.'"],
  ["What drink will they serve?", ["Tea", "Lemon water", "Milk", "Coffee"], 1, "They will serve lemon water.", "Các bạn sẽ phục vụ nước chanh.", "Girl: 'We will serve cold lemon water with the food.'"],
  ["How many plates do they need?", ["Twenty", "Twenty-five", "Thirty", "Forty"], 2, "They need thirty plates.", "Cần ba mươi cái đĩa.", "Woman: 'Bring thirty plates - one for each student.'"],
  ["What is the boy's favourite food?", ["Noodles", "Pizza", "Fried rice", "Soup"], 0, "His favourite is noodles.", "Món cậu ấy thích nhất là mì.", "Boy: 'My favourite food is noodles with beef.'"],
  ["Where will they eat?", ["In the classroom", "In the hall", "In the garden", "In the canteen"], 2, "They will eat in the garden.", "Các bạn sẽ ăn ngoài vườn.", "Man: 'If the weather is fine, we will eat in the garden.'"],
  ["What did the class make last year?", ["Sandwiches", "Rice balls", "Cakes", "Salad"], 1, "Last year they made rice balls.", "Năm ngoái lớp làm cơm nắm.", "Girl: 'Last year we made rice balls from Japan.'"],
  ["What should students bring?", ["A spoon", "A recipe card", "A hat", "A bowl"], 1, "They should bring a recipe card.", "Các bạn nên mang tấm thẻ công thức.", "Woman: 'Everyone must bring a recipe card with the ingredients.'"],
];

const flyers24: CambridgeMockExam = {
  id: "cambridge-flyers-24",
  title: "Flyers Mock Test 24 - Food Around the World",
  titleVi: "Đề thi thử Flyers 24 - Ẩm thực thế giới",
  level: "flyers",
  duration: 30,
  totalQuestions: 28,
  questions: build(f24Rw, f24Ls),
};

/* ================== FLYERS 25 - Helping the Planet ================== */
const f25pA =
  "Our class started a plastic-free week. On Monday we counted the plastic bottles in the bin: forty-two in one day. By Friday there were only six, because most students brought a metal bottle from home. Our teacher put the numbers on a chart outside the classroom so other classes could see them.";
const f25pB =
  "We also learned that recycling is only the third best choice. The first is to refuse things we do not need, and the second is to use something again. A cloth bag used one hundred times is far better than one hundred plastic bags, even though it costs more at the beginning.";

const f25Rw: Tuple[] = [
  ["What did the class start?", ["A garden club", "A plastic-free week", "A reading week", "A running club"], 1, "They started a plastic-free week.", "Lớp bắt đầu tuần lễ không nhựa.", f25pA],
  ["How many bottles were in the bin on Monday?", ["Twenty-two", "Thirty-two", "Forty-two", "Fifty-two"], 2, "There were forty-two bottles on Monday.", "Thứ Hai có bốn mươi hai chai.", f25pA],
  ["How many were there on Friday?", ["Two", "Four", "Six", "Ten"], 2, "By Friday there were only six.", "Đến thứ Sáu chỉ còn sáu chai.", f25pA],
  ["Why did the number fall?", ["Students brought metal bottles", "The bin was moved", "School finished early", "Nobody drank water"], 0, "Most students brought a metal bottle from home.", "Đa số các bạn mang bình kim loại từ nhà.", f25pA],
  ["Where did the teacher put the chart?", ["In the office", "Outside the classroom", "In the library", "At the gate"], 1, "The chart went outside the classroom.", "Biểu đồ được dán ngoài lớp học.", f25pA],
  ["Which choice is best according to the text?", ["Recycling", "Reusing", "Refusing", "Burning"], 2, "The first and best choice is to refuse things we do not need.", "Lựa chọn tốt nhất là từ chối thứ không cần.", f25pB],
  ["What is the second best choice?", ["Recycling", "Using something again", "Buying more", "Throwing away"], 1, "The second is to use something again.", "Thứ hai là tái sử dụng.", f25pB],
  ["How many times must a cloth bag be used to be better?", ["Ten", "Fifty", "One hundred", "One thousand"], 2, "The text mentions one hundred times.", "Bài đọc nhắc đến một trăm lần.", f25pB],
  ["What is the disadvantage of a cloth bag?", ["It is heavy", "It costs more at first", "It breaks quickly", "It is small"], 1, "It costs more at the beginning.", "Ban đầu nó đắt hơn.", f25pB],
  ["We put paper and glass in different ___.", ["bins", "beans", "bones", "banks"], 0, "Recycling goes into different bins.", "Rác tái chế được bỏ vào các thùng khác nhau.", undefined],
  ["Turning off lights ___ energy.", ["save", "saves", "saving", "saved tomorrow"], 1, "The subject is singular, so we use 'saves'.", "Chủ ngữ số ít nên dùng 'saves'.", undefined],
  ["Trees give us clean ___.", ["air", "oil", "plastic", "metal"], 0, "Trees clean the air.", "Cây xanh làm sạch không khí.", undefined],
  ["We should not ___ water when we brush our teeth.", ["waste", "waist", "wait", "wear"], 0, "The verb is 'waste'.", "Động từ đúng là 'waste'.", undefined],
  ["If everybody helps, the beach ___ cleaner.", ["become", "becomes", "will become", "became"], 2, "A future result after 'if' uses 'will become'.", "Kết quả tương lai sau 'if' dùng 'will become'.", undefined],
  ["Riding a bike causes less ___ than driving.", ["pollution", "population", "position", "portion"], 0, "Bikes cause less pollution.", "Xe đạp gây ít ô nhiễm hơn.", undefined],
  ["Old glass bottles can be ___ into new ones.", ["melted", "melting", "melt", "melts"], 0, "The passive form needs 'melted'.", "Dạng bị động cần 'melted'.", undefined],
  ["Our class collected rubbish ___ Saturday morning.", ["in", "at", "on", "of"], 2, "We use 'on' with days.", "Dùng 'on' với các ngày.", undefined],
  ["Solar panels use light from the ___.", ["Sun", "Moon", "stars", "lamp"], 0, "Solar panels use sunlight.", "Tấm pin mặt trời dùng ánh nắng.", undefined],
];

const f25Ls: Tuple[] = [
  ["What is the class collecting?", ["Bottle tops", "Old books", "Cans", "Batteries"], 0, "They are collecting bottle tops.", "Lớp đang thu gom nắp chai.", "Woman: 'Please bring plastic bottle tops for our art project.'"],
  ["Where will they plant trees?", ["Near the gate", "Behind the hall", "By the river", "In the park"], 2, "They will plant trees by the river.", "Các bạn sẽ trồng cây bên bờ sông.", "Man: 'On Sunday we plant young trees by the river.'"],
  ["How does the girl get to school now?", ["By bus", "By bike", "On foot", "By car"], 1, "She cycles to school now.", "Bây giờ bạn ấy đi xe đạp.", "Girl: 'I stopped coming by car; now I cycle to school.'"],
  ["What did the boy bring?", ["A metal bottle", "A plastic cup", "A paper bag", "A lunch box"], 0, "He brought a metal bottle.", "Cậu ấy mang bình kim loại.", "Boy: 'I brought my metal bottle so I do not buy water.'"],
  ["How many bags of rubbish did they fill?", ["Three", "Five", "Seven", "Nine"], 1, "They filled five bags.", "Các bạn thu được năm túi rác.", "Woman: 'Together we filled five big bags of rubbish.'"],
  ["What time does the clean-up start?", ["At seven", "At eight", "At nine", "At ten"], 0, "It starts at seven.", "Buổi dọn dẹp bắt đầu lúc bảy giờ.", "Man: 'Meet at the beach at seven, before it gets hot.'"],
  ["What is made from the old paper?", ["Notebooks", "Boxes", "Bags", "Cards"], 3, "They make cards from old paper.", "Giấy cũ được làm thành thiệp.", "Girl: 'We turn the old paper into cards for the school fair.'"],
  ["Who spoke to the class?", ["A scientist", "A farmer", "A journalist", "A doctor"], 0, "A scientist spoke to them.", "Một nhà khoa học nói chuyện với lớp.", "Boy: 'A scientist came and talked about clean water.'"],
  ["What must students switch off?", ["Fans", "Lights", "Computers", "Air conditioners"], 1, "They must switch off the lights.", "Các bạn phải tắt đèn.", "Woman: 'Always switch off the lights when you leave the room.'"],
  ["What is the next project?", ["A garden", "A poster", "A video", "A song"], 0, "The next project is a school garden.", "Dự án tiếp theo là khu vườn của trường.", "Man: 'Our next project is a small vegetable garden.'"],
];

const flyers25: CambridgeMockExam = {
  id: "cambridge-flyers-25",
  title: "Flyers Mock Test 25 - Helping the Planet",
  titleVi: "Đề thi thử Flyers 25 - Bảo vệ hành tinh",
  level: "flyers",
  duration: 30,
  totalQuestions: 28,
  questions: build(f25Rw, f25Ls),
};

export const cambridgeExamsFlyers21to25: CambridgeMockExam[] = [
  flyers21,
  flyers22,
  flyers23,
  flyers24,
  flyers25,
];
