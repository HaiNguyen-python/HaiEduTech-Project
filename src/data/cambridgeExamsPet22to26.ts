/**
 * @file cambridgeExamsPet22to26.ts
 * @description Five Cambridge PET / B1 Preliminary mock exams, tests 22 to 26.
 *              Themes: Volunteering, City or Countryside, Teenagers & Sleep,
 *              Second-hand Fashion, Cycling in the City. Each paper has 21
 *              Reading & Writing questions and 10 Listening questions.
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

/* ================== PET 22 - Volunteering ================== */
const p22pA =
  "Our town library was going to close its Saturday reading hour because no member of staff was free. Instead of complaining online, six of us offered to run it ourselves. We had imagined an easy hour of reading picture books; in reality we spent the first two Saturdays learning how to keep twenty small children interested for sixty minutes, which is a skill nobody had warned us about.";
const p22pB =
  "What surprised me most was how much the volunteers gained. One of my classmates, who normally avoids speaking in class, now stands in front of a room and does the voices for every character. The librarian says she has never seen him so confident. Volunteering is usually described as giving time away, but everybody I know who does it says they receive more than they give.";

const p22Rw: Tuple[] = [
  ["Why was the reading hour going to close?", ["Too few children", "No staff were free", "The room was needed", "Lack of money"], 1, "No member of staff was free to run it.", "Không có nhân viên nào rảnh để phụ trách.", p22pA],
  ["What did the students do?", ["Wrote to the newspaper", "Complained online", "Offered to run it", "Started a new club"], 2, "Six of them offered to run it themselves.", "Sáu bạn xung phong tự tổ chức.", p22pA],
  ["What had they expected?", ["Hard work", "An easy hour", "A paid job", "A large audience"], 1, "They had imagined an easy hour of reading.", "Các bạn tưởng đó là một giờ đọc sách nhẹ nhàng.", p22pA],
  ["What was the real challenge?", ["Choosing books", "Keeping children interested", "Finding a room", "Getting permission"], 1, "Keeping twenty small children interested for an hour.", "Giữ hai mươi em nhỏ chú ý suốt một tiếng.", p22pA],
  ["How long did they take to learn this?", ["One Saturday", "Two Saturdays", "A month", "A term"], 1, "They spent the first two Saturdays learning.", "Hai buổi thứ Bảy đầu tiên là để học cách làm.", p22pA],
  ["What surprised the writer most?", ["The children's behaviour", "How much volunteers gained", "The library rules", "The number of books"], 1, "How much the volunteers themselves gained.", "Điều bất ngờ là chính tình nguyện viên nhận được nhiều.", p22pB],
  ["What is the classmate normally like?", ["Loud", "Avoids speaking in class", "Often absent", "Very sporty"], 1, "He normally avoids speaking in class.", "Bạn ấy thường ngại phát biểu trong lớp.", p22pB],
  ["What does he do now?", ["Chooses the books", "Does the character voices", "Takes photographs", "Keeps the register"], 1, "He does the voices for every character.", "Bạn ấy lồng giọng cho từng nhân vật.", p22pB],
  ["What does the librarian say?", ["He is too loud", "She has never seen him so confident", "He should read more", "He needs help"], 1, "She has never seen him so confident.", "Cô thủ thư nói chưa từng thấy bạn ấy tự tin đến vậy.", p22pB],
  ["What is the writer's main point?", ["Volunteers give up a lot", "Volunteers receive more than they give", "Libraries need money", "Children read too little"], 1, "People who volunteer say they receive more than they give.", "Người làm tình nguyện nói họ nhận nhiều hơn cho đi.", p22pB],
  ["He volunteers at the shelter ___ he has free time.", ["whenever", "however", "wherever", "whatever"], 0, "'Whenever' means at any time that.", "'Whenever' nghĩa là bất cứ khi nào.", undefined],
  ["The project ___ by students, not by the council.", ["runs", "is run", "running", "has run"], 1, "The passive 'is run' is needed here.", "Cần dạng bị động 'is run'.", undefined],
  ["She is used to ___ in front of large groups.", ["speak", "speaking", "spoke", "speaks"], 1, "After 'used to' as an adjective phrase we use -ing.", "Sau 'be used to' dùng V-ing.", undefined],
  ["Volunteers must be ___ and arrive on time.", ["reliable", "readable", "reasonable price", "relative"], 0, "'Reliable' describes someone you can depend on.", "'Reliable' nghĩa là đáng tin cậy.", undefined],
  ["___ the rain, forty people came to help.", ["Although", "Despite", "However", "Because"], 1, "'Despite' comes before a noun phrase.", "'Despite' đứng trước cụm danh từ.", undefined],
  ["If more people helped, the work ___ much faster.", ["is", "will be", "would be", "was"], 2, "Second conditional uses 'would be'.", "Điều kiện loại 2 dùng 'would be'.", undefined],
  ["We raised money ___ buy new books.", ["for", "to", "so", "because"], 1, "'To' expresses purpose.", "'To' diễn tả mục đích.", undefined],
  ["The charity ___ helping homeless families.", ["specialises in", "specialises on", "specialises at", "specialises for"], 0, "The phrase is 'specialise in'.", "Cụm đúng là 'specialise in'.", undefined],
  ["Nobody ___ him to stay so long; he simply enjoyed it.", ["expected", "expects", "expecting", "has expect"], 0, "The past simple 'expected' fits the narrative.", "Quá khứ đơn 'expected' phù hợp.", undefined],
  ["Giving up two hours a week is a small ___ to make.", ["sacrifice", "sacred", "secret", "section"], 0, "Something you give up is a sacrifice.", "Điều mình từ bỏ gọi là sacrifice.", undefined],
  ["The scheme has been running ___ three years.", ["since", "for", "during", "from"], 1, "'For' is used with a period.", "'For' dùng với khoảng thời gian.", undefined],
];

const p22Ls: Tuple[] = [
  ["What does the girl volunteer for?", ["An animal shelter", "A library", "A hospital", "A food bank"], 0, "She volunteers at an animal shelter.", "Bạn ấy tình nguyện ở trạm cứu hộ động vật.", "Girl: 'Every Sunday I help at the animal shelter near my house.'"],
  ["How many hours a week does the boy give?", ["Two", "Three", "Four", "Five"], 1, "He gives three hours a week.", "Cậu ấy dành ba tiếng mỗi tuần.", "Boy: 'It is only three hours a week, but it makes a difference.'"],
  ["What skill did the woman learn?", ["Cooking", "First aid", "Driving", "Photography"], 1, "She learned first aid.", "Cô ấy học sơ cứu.", "Woman: 'The best thing I gained was a first aid certificate.'"],
  ["What is the main problem for the group?", ["Money", "Space", "Not enough volunteers", "Bad weather"], 2, "They do not have enough volunteers.", "Nhóm thiếu tình nguyện viên.", "Man: 'Our biggest problem is finding enough volunteers.'"],
  ["When is the training session?", ["Friday evening", "Saturday morning", "Saturday afternoon", "Sunday morning"], 1, "Training is Saturday morning.", "Buổi tập huấn sáng thứ Bảy.", "Woman: 'Training is on Saturday morning at ten.'"],
  ["What do the volunteers collect?", ["Clothes", "Books", "Food", "Toys"], 2, "They collect food.", "Nhóm thu gom thực phẩm.", "Man: 'On Wednesdays we collect food from three supermarkets.'"],
  ["What did the boy find hardest?", ["Early starts", "Saying no", "Speaking to strangers", "Carrying boxes"], 2, "He found speaking to strangers hardest.", "Cậu ấy thấy nói chuyện với người lạ là khó nhất.", "Boy: 'At first, speaking to strangers was really hard for me.'"],
  ["How old must volunteers be?", ["Fourteen", "Fifteen", "Sixteen", "Eighteen"], 2, "They must be sixteen.", "Tình nguyện viên phải đủ mười sáu tuổi.", "Woman: 'You have to be at least sixteen to join this project.'"],
  ["What will happen next month?", ["A fundraising walk", "A concert", "A market", "An exhibition"], 0, "There will be a fundraising walk.", "Tháng tới có buổi đi bộ gây quỹ.", "Man: 'Next month we are organising a fundraising walk.'"],
  ["What does the woman advise new volunteers?", ["Start small", "Work every day", "Bring friends", "Ask for money"], 0, "She advises starting small.", "Cô ấy khuyên bắt đầu từ việc nhỏ.", "Woman: 'Start small - one hour a week is enough at first.'"],
];

const pet22: CambridgeMockExam = {
  id: "cambridge-pet-22",
  title: "PET Mock Test 22 - Volunteering",
  titleVi: "Đề thi thử PET 22 - Hoạt động tình nguyện",
  level: "pet",
  duration: 45,
  totalQuestions: 31,
  questions: build(p22Rw, p22Ls),
};

/* ================== PET 23 - City or Countryside ================== */
const p23pA =
  "Three years ago my parents left the city and moved to a village forty kilometres away. Their reasons were mostly practical: the rent for a house with a garden was less than half of what we paid for a flat with no outside space. What nobody calculated was the time we would spend travelling, and my father now sits on a bus for two hours every working day.";
const p23pB =
  "For me the change has been positive, though not in the way I expected. I miss the cinema less than I feared, but I miss being able to meet a friend without planning it two days in advance. On the other hand, I sleep better, I know all our neighbours, and I have finally learned to grow something that people can actually eat.";

const p23Rw: Tuple[] = [
  ["When did the family move?", ["Last year", "Two years ago", "Three years ago", "Five years ago"], 2, "They moved three years ago.", "Gia đình chuyển đi ba năm trước.", p23pA],
  ["How far is the village?", ["Twenty kilometres", "Thirty kilometres", "Forty kilometres", "Sixty kilometres"], 2, "The village is forty kilometres away.", "Ngôi làng cách đó bốn mươi ki lô mét.", p23pA],
  ["What was the main reason for moving?", ["Better schools", "Cheaper housing with a garden", "Clean air", "Family nearby"], 1, "The rent for a house with a garden was much lower.", "Tiền thuê nhà có vườn rẻ hơn nhiều.", p23pA],
  ["What did nobody calculate?", ["The cost of food", "Travelling time", "The size of the garden", "The weather"], 1, "Nobody calculated the travelling time.", "Không ai tính đến thời gian đi lại.", p23pA],
  ["How long does the father travel daily?", ["One hour", "Ninety minutes", "Two hours", "Three hours"], 2, "He spends two hours on a bus each working day.", "Bố mất hai tiếng đi xe buýt mỗi ngày làm việc.", p23pA],
  ["How does the writer feel overall?", ["Negative", "Positive", "Indifferent", "Regretful"], 1, "The writer says the change has been positive.", "Bạn ấy nói thay đổi này là tích cực.", p23pB],
  ["What does the writer miss less than expected?", ["Friends", "The cinema", "Shops", "Noise"], 1, "The writer misses the cinema less than feared.", "Bạn ấy nhớ rạp phim ít hơn tưởng tượng.", p23pB],
  ["What does the writer miss most?", ["Spontaneous meetings with friends", "Fast internet", "Public transport", "Restaurants"], 0, "Meeting a friend without planning days ahead.", "Việc gặp bạn mà không cần hẹn trước.", p23pB],
  ["Which benefit is mentioned?", ["More money", "Better sleep", "Shorter journeys", "Bigger school"], 1, "The writer sleeps better now.", "Bạn ấy ngủ ngon hơn.", p23pB],
  ["What new skill has the writer learned?", ["Cooking", "Driving", "Growing food", "Repairing bikes"], 2, "The writer has learned to grow food.", "Bạn ấy học được cách trồng rau.", p23pB],
  ["Life in the countryside is generally ___ than in the city.", ["quiet", "quieter", "quietest", "more quiet"], 1, "'Than' requires the comparative 'quieter'.", "Có 'than' nên dùng 'quieter'.", undefined],
  ["The rent in the city keeps ___ every year.", ["rise", "rising", "risen", "to rising"], 1, "After 'keep' we use the -ing form.", "Sau 'keep' dùng V-ing.", undefined],
  ["We had to get used ___ the silence at night.", ["to", "at", "with", "for"], 0, "The phrase is 'get used to'.", "Cụm đúng là 'get used to'.", undefined],
  ["___ living far away, she is never late for work.", ["Despite", "Although", "However", "Because"], 0, "'Despite' comes before an -ing phrase.", "'Despite' đứng trước cụm V-ing.", undefined],
  ["The village has only one shop, ___ sells everything.", ["which", "who", "where", "what"], 0, "'Which' refers to a thing.", "'Which' chỉ vật.", undefined],
  ["If the train service improved, more families ___ here.", ["move", "will move", "would move", "moved"], 2, "Second conditional uses 'would move'.", "Điều kiện loại 2 dùng 'would move'.", undefined],
  ["Country roads are narrow, ___ drivers must go slowly.", ["so", "but", "although", "unless"], 0, "'So' introduces the result.", "'So' nêu kết quả.", undefined],
  ["He commutes to the city ___ bus.", ["with", "by", "on a", "in"], 1, "Means of transport uses 'by bus'.", "Phương tiện dùng 'by bus'.", undefined],
  ["The air here is far ___ polluted than in the centre.", ["little", "less", "least", "fewer"], 1, "'Than' requires 'less'.", "Có 'than' nên dùng 'less'.", undefined],
  ["Everything ___ delivered to the village twice a week.", ["is", "are", "be", "being"], 0, "'Everything' takes a singular verb.", "'Everything' dùng động từ số ít.", undefined],
  ["I would rather ___ in a small town than in a big city.", ["live", "living", "to live", "lived"], 0, "After 'would rather' we use the base form.", "Sau 'would rather' dùng nguyên thể.", undefined],
];

const p23Ls: Tuple[] = [
  ["Where does the woman live now?", ["In the centre", "In a suburb", "In a village", "On a farm"], 2, "She lives in a village.", "Cô ấy sống ở một ngôi làng.", "Woman: 'We moved to a village last spring and stayed.'"],
  ["What does the man miss about the city?", ["The shops", "The nightlife", "The libraries", "The hospitals"], 0, "He misses the shops.", "Anh ấy nhớ các cửa hàng.", "Man: 'What I really miss is having shops open late.'"],
  ["How long is her journey to work?", ["Thirty minutes", "Forty-five minutes", "One hour", "Ninety minutes"], 2, "Her journey takes one hour.", "Chuyến đi làm mất một tiếng.", "Woman: 'It takes me a full hour each way now.'"],
  ["What is cheaper in the village?", ["Food", "Housing", "Transport", "Internet"], 1, "Housing is cheaper.", "Nhà ở rẻ hơn.", "Man: 'Housing is much cheaper here, that is the main thing.'"],
  ["What does the boy like best?", ["The garden", "The quiet", "The neighbours", "The school"], 1, "He likes the quiet best.", "Cậu ấy thích nhất sự yên tĩnh.", "Boy: 'Honestly, the quiet at night is the best part.'"],
  ["What problem does the girl mention?", ["Few buses", "No school", "No shops", "Bad water"], 0, "There are few buses.", "Rất ít chuyến xe buýt.", "Girl: 'There are only four buses a day, which is difficult.'"],
  ["What will the council build?", ["A library", "A sports centre", "A health centre", "A school"], 2, "A health centre will be built.", "Hội đồng sẽ xây trung tâm y tế.", "Man: 'The council has agreed to build a small health centre.'"],
  ["What does the woman grow?", ["Tomatoes", "Herbs", "Beans", "Potatoes"], 1, "She grows herbs.", "Cô ấy trồng rau thơm.", "Woman: 'I only grow herbs - they are easy and useful.'"],
  ["How often does the family go to the city?", ["Weekly", "Twice a month", "Monthly", "Rarely"], 1, "They go twice a month.", "Gia đình đi thành phố hai lần mỗi tháng.", "Man: 'We drive into the city about twice a month.'"],
  ["What is the speakers' conclusion?", ["City life is better", "Village life suits them", "They will move back", "Both are the same"], 1, "They agree village life suits them.", "Họ đồng ý cuộc sống làng quê hợp với mình.", "Woman: 'On balance, this life suits us far better than the city did.'"],
];

const pet23: CambridgeMockExam = {
  id: "cambridge-pet-23",
  title: "PET Mock Test 23 - City or Countryside",
  titleVi: "Đề thi thử PET 23 - Thành phố hay nông thôn",
  level: "pet",
  duration: 45,
  totalQuestions: 31,
  questions: build(p23Rw, p23Ls),
};

/* ================== PET 24 - Teenagers & Sleep ================== */
const p24pA =
  "A study of two thousand secondary students found that the average teenager sleeps six and a half hours on a school night, while the amount their bodies actually need is closer to nine. The researchers were careful to point out that this is not simply a question of discipline: during adolescence the internal clock shifts, so falling asleep before eleven is genuinely difficult for many young people.";
const p24pB =
  "Some schools have responded by starting lessons an hour later. Results from the first trials are encouraging: attendance improved and fewer students fell asleep in morning classes. Parents, however, complained that the later finish clashed with sports and part-time jobs, which shows that a change made for good scientific reasons can still create practical problems for families.";

const p24Rw: Tuple[] = [
  ["How many students took part?", ["One thousand", "Two thousand", "Three thousand", "Five hundred"], 1, "The study included two thousand students.", "Nghiên cứu có hai nghìn học sinh.", p24pA],
  ["How long does the average teenager sleep?", ["Five hours", "Six and a half hours", "Eight hours", "Nine hours"], 1, "The average is six and a half hours on a school night.", "Trung bình là sáu tiếng rưỡi vào đêm đi học.", p24pA],
  ["How much sleep do they need?", ["Seven hours", "Eight hours", "About nine hours", "Ten hours"], 2, "Their bodies need closer to nine hours.", "Cơ thể các em cần gần chín tiếng.", p24pA],
  ["What did the researchers stress?", ["Students are lazy", "It is not simply discipline", "Parents are to blame", "Phones are the only cause"], 1, "They said it is not simply a question of discipline.", "Họ nhấn mạnh đây không chỉ là chuyện kỷ luật.", p24pA],
  ["What happens during adolescence?", ["The internal clock shifts", "Sleep becomes deeper", "The body needs less rest", "Dreams increase"], 0, "The internal clock shifts later.", "Đồng hồ sinh học dịch chuyển muộn hơn.", p24pA],
  ["What have some schools done?", ["Shortened lessons", "Started an hour later", "Banned phones", "Added sports"], 1, "They start lessons an hour later.", "Một số trường bắt đầu học muộn hơn một tiếng.", p24pB],
  ["What improved in the trials?", ["Exam marks", "Attendance", "Homework quality", "Behaviour at lunch"], 1, "Attendance improved.", "Tỉ lệ đi học chuyên cần tăng.", p24pB],
  ["What else was observed?", ["Fewer students slept in class", "More clubs opened", "Teachers arrived earlier", "Fewer parents complained"], 0, "Fewer students fell asleep in morning classes.", "Ít học sinh ngủ gật trong giờ sáng hơn.", p24pB],
  ["Why did parents complain?", ["The lessons were harder", "The later finish clashed with jobs and sport", "Transport cost more", "Teachers were tired"], 1, "The later finish clashed with sports and part-time jobs.", "Tan học muộn xung đột với thể thao và việc làm thêm.", p24pB],
  ["What is the writer's conclusion?", ["Science should be ignored", "Good science can still cause practical problems", "Schools must start early", "Parents are always right"], 1, "A scientifically sound change can still create problems.", "Thay đổi đúng khoa học vẫn có thể gây khó khăn thực tế.", p24pB],
  ["I ___ to bed before midnight these days.", ["rarely get", "get rarely", "am rarely getting", "rarely getting"], 0, "Adverbs of frequency go before the main verb.", "Trạng từ tần suất đứng trước động từ chính.", undefined],
  ["Looking at a bright screen ___ it harder to fall asleep.", ["make", "makes", "making", "made soon"], 1, "The gerund subject takes a singular verb.", "Chủ ngữ danh động từ dùng động từ số ít.", undefined],
  ["She was so tired that she could ___ keep her eyes open.", ["hard", "hardly", "harder", "hardest"], 1, "'Hardly' means almost not.", "'Hardly' nghĩa là hầu như không.", undefined],
  ["If I ___ earlier, I would not feel so tired.", ["sleep", "slept", "will sleep", "have slept"], 1, "Second conditional uses the past simple after 'if'.", "Điều kiện loại 2 dùng quá khứ đơn sau 'if'.", undefined],
  ["Teenagers are often ___ of the effects of poor sleep.", ["unaware", "unable", "unhappy", "unfair"], 0, "'Unaware of' means not knowing about.", "'Unaware of' nghĩa là không nhận biết.", undefined],
  ["The study ___ out by a university in 2024.", ["carried", "was carried", "is carrying", "carries"], 1, "The passive 'was carried out' is needed.", "Cần dạng bị động 'was carried out'.", undefined],
  ["He goes to bed late, ___ he gets up early.", ["yet", "so", "because", "unless"], 0, "'Yet' shows the contrast.", "'Yet' thể hiện sự tương phản.", undefined],
  ["Doctors recommend ___ caffeine after four o'clock.", ["avoid", "avoiding", "to avoid", "avoided"], 1, "After 'recommend' we use the -ing form here.", "Sau 'recommend' dùng V-ing ở đây.", undefined],
  ["The later start had a positive ___ on attendance.", ["effect", "affect", "afford", "effort"], 0, "The noun is 'effect'.", "Danh từ đúng là 'effect'.", undefined],
  ["By the time the alarm rang, she ___ awake for an hour.", ["was", "has been", "had been", "will be"], 2, "The past perfect continuous 'had been' fits.", "Dùng quá khứ hoàn thành 'had been'.", undefined],
  ["Neither the students ___ the teachers liked the new timetable.", ["or", "nor", "and", "but"], 1, "'Neither ... nor' is the correct pair.", "Cặp đúng là 'neither ... nor'.", undefined],
];

const p24Ls: Tuple[] = [
  ["What time does the girl usually fall asleep?", ["Ten", "Eleven", "Midnight", "One"], 2, "She usually falls asleep at midnight.", "Bạn ấy thường ngủ lúc nửa đêm.", "Girl: 'I rarely fall asleep before midnight, even when I try.'"],
  ["What keeps the boy awake?", ["Noise", "His phone", "Coffee", "Worry about exams"], 3, "Worry about exams keeps him awake.", "Lo lắng về kỳ thi khiến cậu ấy mất ngủ.", "Boy: 'It is mostly worrying about exams that keeps me awake.'"],
  ["What did the school change?", ["Lesson length", "Start time", "Homework rules", "Break times"], 1, "The school changed the start time.", "Trường thay đổi giờ vào học.", "Man: 'From September the school day starts at nine, not eight.'"],
  ["What improved first?", ["Marks", "Attendance", "Behaviour", "Sports results"], 1, "Attendance improved first.", "Tỉ lệ chuyên cần cải thiện trước tiên.", "Woman: 'The first clear result was better attendance.'"],
  ["What do parents worry about?", ["Costs", "Collecting younger children", "Homework", "Uniforms"], 1, "They worry about collecting younger children.", "Phụ huynh lo việc đón con nhỏ.", "Man: 'Many parents worry about collecting younger children on time.'"],
  ["What does the doctor recommend?", ["No screens before bed", "More exercise", "Later dinner", "Longer naps"], 0, "She recommends no screens before bed.", "Bác sĩ khuyên không dùng màn hình trước khi ngủ.", "Woman: 'Try to keep screens out of the bedroom before sleep.'"],
  ["How many hours does the boy sleep at weekends?", ["Seven", "Eight", "Nine", "Ten"], 3, "He sleeps ten hours at weekends.", "Cuối tuần cậu ấy ngủ mười tiếng.", "Boy: 'At weekends I sleep about ten hours to catch up.'"],
  ["What is the girl going to try?", ["Reading before bed", "Drinking milk", "A new alarm", "Sleeping earlier at weekends"], 0, "She will try reading before bed.", "Bạn ấy sẽ thử đọc sách trước khi ngủ.", "Girl: 'I am going to read a paper book instead of scrolling.'"],
  ["What did the survey measure?", ["Sleep hours and marks", "Diet", "Screen brands", "Travel time"], 0, "It measured sleep hours and marks.", "Khảo sát đo giờ ngủ và điểm số.", "Man: 'The survey compared sleep hours with exam marks.'"],
  ["What is the speakers' final advice?", ["Keep a regular routine", "Sleep in class", "Study at night", "Ignore the research"], 0, "They advise keeping a regular routine.", "Họ khuyên duy trì thói quen đều đặn.", "Woman: 'The simplest advice is a regular routine, even at weekends.'"],
];

const pet24: CambridgeMockExam = {
  id: "cambridge-pet-24",
  title: "PET Mock Test 24 - Teenagers & Sleep",
  titleVi: "Đề thi thử PET 24 - Thanh thiếu niên & Giấc ngủ",
  level: "pet",
  duration: 45,
  totalQuestions: 31,
  questions: build(p24Rw, p24Ls),
};

/* ================== PET 25 - Second-hand Fashion ================== */
const p25pA =
  "The second-hand clothes market in our neighbourhood opens on the first Sunday of every month. Ten years ago its customers were mainly people who had no choice; today the queue outside contains students, office workers and even a few local designers looking for unusual fabric. The change happened partly because prices in ordinary shops rose, and partly because buying used clothes stopped being something people felt they had to hide.";
const p25pB =
  "There is a risk in this new popularity. Sellers have noticed the demand and prices at some stalls are now close to those of new items, which pushes away exactly the customers the market was originally for. One organiser told me she keeps a low-price section at the back for that reason, and she checks it every week to make sure it has not quietly disappeared.";

const p25Rw: Tuple[] = [
  ["When does the market open?", ["Every Sunday", "First Sunday of the month", "Every Saturday", "Twice a month"], 1, "It opens on the first Sunday of every month.", "Chợ mở vào Chủ nhật đầu tiên hằng tháng.", p25pA],
  ["Who shopped there ten years ago?", ["Students", "Designers", "People with no choice", "Tourists"], 2, "Customers were mainly people who had no choice.", "Khách chủ yếu là người không có lựa chọn khác.", p25pA],
  ["Who queues there now?", ["Only students", "Students, office workers and designers", "Only designers", "Only families"], 1, "The queue includes all three groups.", "Hàng người xếp gồm cả ba nhóm.", p25pA],
  ["What do designers look for?", ["Cheap shoes", "Unusual fabric", "Old shops", "Free items"], 1, "They look for unusual fabric.", "Các nhà thiết kế tìm vải lạ.", p25pA],
  ["What is one reason for the change?", ["Prices in ordinary shops rose", "The market moved", "New advertising", "Better parking"], 0, "Prices in ordinary shops rose.", "Giá ở cửa hàng thường tăng lên.", p25pA],
  ["What attitude has changed?", ["People hide buying used clothes", "People no longer feel ashamed", "People dislike markets", "People prefer online shops"], 1, "Buying used clothes stopped being something to hide.", "Mua đồ cũ không còn là điều phải giấu.", p25pA],
  ["What risk does the writer identify?", ["Fewer sellers", "Rising prices at stalls", "Poor quality", "Bad weather"], 1, "Prices at some stalls are close to new items.", "Giá ở vài quầy gần bằng đồ mới.", p25pB],
  ["Who is pushed away by this?", ["Designers", "Tourists", "The original customers", "Sellers"], 2, "It pushes away the customers the market was for.", "Điều đó đẩy đi chính nhóm khách ban đầu.", p25pB],
  ["What does one organiser do?", ["Closes stalls", "Keeps a low-price section", "Raises rents", "Limits sellers"], 1, "She keeps a low-price section at the back.", "Cô ấy giữ khu giá rẻ ở phía sau.", p25pB],
  ["How often does she check it?", ["Every day", "Every week", "Every month", "Twice a year"], 1, "She checks it every week.", "Cô kiểm tra mỗi tuần.", p25pB],
  ["These jeans are ___ good condition.", ["at", "in", "on", "with"], 1, "The phrase is 'in good condition'.", "Cụm đúng là 'in good condition'.", undefined],
  ["The jacket ___ by my grandmother in the 1980s.", ["bought", "was bought", "is buying", "buys"], 1, "The passive 'was bought' is needed.", "Cần bị động 'was bought'.", undefined],
  ["I would rather buy one good coat ___ five cheap ones.", ["that", "than", "then", "as"], 1, "'Would rather ... than' is the correct pair.", "Cấu trúc đúng là 'would rather ... than'.", undefined],
  ["Fast fashion produces an enormous ___ of waste.", ["amount", "number", "many", "few"], 0, "'Amount' is used with uncountable nouns.", "'Amount' dùng với danh từ không đếm được.", undefined],
  ["This shirt needs ___ before I can wear it.", ["mend", "mending", "to mending", "mended it"], 1, "'Need + -ing' has a passive meaning here.", "'Need + V-ing' mang nghĩa bị động.", undefined],
  ["___ the market is crowded, it is worth visiting.", ["Although", "Despite", "However", "Because"], 0, "'Although' introduces a clause.", "'Although' đứng trước mệnh đề.", undefined],
  ["She has been collecting vintage dresses ___ she was fifteen.", ["for", "since", "during", "from"], 1, "'Since' is used with a point in time.", "'Since' dùng với mốc thời gian.", undefined],
  ["The trousers were too long, so I had them ___.", ["shorten", "shortened", "shortening", "to shorten"], 1, "'Have something done' uses the past participle.", "Cấu trúc 'have something done' dùng phân từ.", undefined],
  ["Most stalls only accept ___, not cards.", ["cash", "cache", "case", "cost"], 0, "The word is 'cash'.", "Từ đúng là 'cash'.", undefined],
  ["The more people repair clothes, the ___ waste there is.", ["little", "less", "least", "fewer"], 1, "'Waste' is uncountable, so 'less' is correct.", "'Waste' không đếm được nên dùng 'less'.", undefined],
  ["Not only ___ it cheaper, but it is also better for the planet.", ["is", "it is", "was it being", "does"], 0, "After 'not only' at the start we invert: 'is it'.", "Sau 'not only' đầu câu phải đảo ngữ.", undefined],
];

const p25Ls: Tuple[] = [
  ["What did the girl buy?", ["A coat", "A dress", "Boots", "A bag"], 1, "She bought a dress.", "Bạn ấy mua một chiếc váy.", "Girl: 'I found a dress for the price of two coffees.'"],
  ["How much did the boy's jacket cost?", ["Fifty", "Eighty", "A hundred", "A hundred and twenty"], 1, "The jacket cost eighty.", "Chiếc áo khoác giá tám mươi.", "Boy: 'The jacket was eighty, which is nothing for that quality.'"],
  ["What does the woman dislike about the market?", ["The crowds", "The prices", "The hours", "The location"], 0, "She dislikes the crowds.", "Cô ấy không thích cảnh đông đúc.", "Woman: 'The only problem is how crowded it gets by ten.'"],
  ["What time is best to arrive?", ["Seven", "Eight", "Nine", "Ten"], 1, "Eight is the best time.", "Tám giờ là lúc tốt nhất.", "Man: 'Come at eight - the best pieces go quickly.'"],
  ["What does the man repair?", ["Shoes", "Zips", "Bags", "Watches"], 1, "He repairs zips.", "Anh ấy sửa khóa kéo.", "Man: 'I have a stall where I repair zips while you wait.'"],
  ["What will the market add next month?", ["A cafe", "A repair workshop", "A children's area", "More parking"], 1, "A repair workshop will be added.", "Tháng tới có thêm xưởng sửa đồ.", "Woman: 'Next month we are adding a free repair workshop.'"],
  ["Why does the girl prefer second-hand?", ["It is unique", "It is faster", "It is closer", "It is warmer"], 0, "She likes that the clothes are unique.", "Bạn ấy thích vì quần áo độc đáo.", "Girl: 'Nobody else at school has the same clothes as me.'"],
  ["What does the organiser protect?", ["The low-price section", "The car park", "The entrance", "The stage"], 0, "She protects the low-price section.", "Cô ấy giữ khu giá rẻ.", "Woman: 'I make sure the low-price section never disappears.'"],
  ["How many stalls are there?", ["Thirty", "Forty", "Fifty", "Sixty"], 2, "There are fifty stalls.", "Có năm mươi quầy hàng.", "Man: 'We have fifty stalls this month, ten more than last year.'"],
  ["What is the speakers' advice?", ["Check the quality carefully", "Buy everything early", "Only buy new", "Bargain hard"], 0, "They advise checking quality carefully.", "Họ khuyên kiểm tra kỹ chất lượng.", "Woman: 'Always check seams and zips carefully before you pay.'"],
];

const pet25: CambridgeMockExam = {
  id: "cambridge-pet-25",
  title: "PET Mock Test 25 - Second-hand Fashion",
  titleVi: "Đề thi thử PET 25 - Thời trang đồ cũ",
  level: "pet",
  duration: 45,
  totalQuestions: 31,
  questions: build(p25Rw, p25Ls),
};

/* ================== PET 26 - Cycling in the City ================== */
const p26pA =
  "When the council announced a protected cycle lane along the main road, the reaction was louder than anyone expected. Shop owners argued that removing parking spaces would ruin their business, while cycling groups pointed to cities where the opposite had happened. Eighteen months after the lane opened, the council published counts showing that the number of cyclists had tripled and that spending in the same street had risen slightly.";
const p26pB =
  "The figures did not convince everybody. Some shopkeepers say the extra spending came from a new office building at the end of the street rather than from cyclists, and that argument cannot be completely disproved with the data the council collected. What is not disputed, however, is that the road is now considerably safer: serious injuries fell by two thirds in the same period, and even the strongest critics of the scheme have not tried to attribute that improvement to the office building. For most residents the safety figures have settled the argument."; 

const p26Rw: Tuple[] = [
  ["What did the council announce?", ["A new bus route", "A protected cycle lane", "A pedestrian street", "A car park"], 1, "The council announced a protected cycle lane.", "Hội đồng công bố làn xe đạp có rào chắn.", p26pA],
  ["What did shop owners fear?", ["More traffic", "Losing parking would ruin business", "Higher rents", "Noise"], 1, "They argued that removing parking would ruin business.", "Họ lo mất chỗ đỗ xe sẽ ảnh hưởng kinh doanh.", p26pA],
  ["What did cycling groups mention?", ["Cheaper bikes", "Other cities where the opposite happened", "New laws", "Weather data"], 1, "They pointed to cities where the opposite happened.", "Họ dẫn ra các thành phố có kết quả ngược lại.", p26pA],
  ["How long after opening were counts published?", ["Six months", "One year", "Eighteen months", "Two years"], 2, "The counts came eighteen months later.", "Số liệu công bố sau mười tám tháng.", p26pA],
  ["What happened to cyclist numbers?", ["They doubled", "They tripled", "They fell", "They stayed the same"], 1, "The number of cyclists tripled.", "Số người đi xe đạp tăng gấp ba.", p26pA],
  ["What happened to spending in the street?", ["It fell sharply", "It rose slightly", "It doubled", "It did not change"], 1, "Spending rose slightly.", "Chi tiêu tăng nhẹ.", p26pA],
  ["What do some shopkeepers claim?", ["The data is invented", "A new office building caused the rise", "Cyclists spend most", "The lane is too narrow"], 1, "They say the rise came from a new office building.", "Họ cho rằng mức tăng đến từ tòa văn phòng mới.", p26pB],
  ["What does the writer say about that claim?", ["It is clearly false", "It cannot be completely disproved", "It is proven", "It is irrelevant"], 1, "The writer admits it cannot be completely disproved.", "Tác giả thừa nhận không thể bác bỏ hoàn toàn.", p26pB],
  ["What is not disputed?", ["Shop profits", "Road safety", "Bike prices", "Air quality"], 1, "Everyone accepts the road is safer.", "Ai cũng đồng ý con đường an toàn hơn.", p26pB],
  ["By how much did serious injuries fall?", ["One third", "One half", "Two thirds", "Three quarters"], 2, "They fell by two thirds.", "Số ca chấn thương nặng giảm hai phần ba.", p26pB],
  ["What is the writer's overall tone?", ["Angry", "Balanced", "Enthusiastic", "Uninterested"], 1, "The writer presents both sides fairly.", "Tác giả trình bày cân bằng cả hai phía.", p26pB],
  ["Cyclists ___ wear helmets in this city.", ["are advised to", "are advised", "advise to", "advising"], 0, "The passive with an infinitive is 'are advised to'.", "Cấu trúc bị động là 'are advised to'.", undefined],
  ["The lane ___ built last summer.", ["is", "was", "has", "have been"], 1, "'Last summer' needs 'was built'.", "'Last summer' dùng 'was built'.", undefined],
  ["___ more people cycled, the air would be cleaner.", ["Unless", "If", "Despite", "However"], 1, "Second conditional starts with 'if'.", "Điều kiện loại 2 bắt đầu bằng 'if'.", undefined],
  ["The number of accidents has fallen ___ two thirds.", ["by", "of", "in", "at"], 0, "We express a change 'by' an amount.", "Diễn tả mức thay đổi dùng 'by'.", undefined],
  ["It is worth ___ a helmet even for short trips.", ["wear", "wearing", "to wear", "worn"], 1, "'Worth' is followed by the -ing form.", "Sau 'worth' dùng V-ing.", undefined],
  ["Cycling is ___ far the cheapest way to travel here.", ["by", "at", "in", "for"], 0, "The phrase is 'by far'.", "Cụm đúng là 'by far'.", undefined],
  ["My bike ___ stolen while I was in the library.", ["got", "get", "getting", "gets"], 0, "The past 'got stolen' fits the time reference.", "Quá khứ 'got stolen' phù hợp.", undefined],
  ["Neither the drivers ___ the cyclists were satisfied.", ["or", "nor", "and", "but"], 1, "'Neither ... nor' is correct.", "Cặp đúng là 'neither ... nor'.", undefined],
  ["He cycles to work, ___ saves him a lot of money.", ["which", "who", "what", "that it"], 0, "'Which' refers to the whole clause.", "'Which' thay cho cả mệnh đề.", undefined],
  ["The council promised ___ more racks near the station.", ["install", "to install", "installing", "installed"], 1, "After 'promise' we use the to-infinitive.", "Sau 'promise' dùng to-infinitive.", undefined],
];

const p26Ls: Tuple[] = [
  ["How does the woman travel to work?", ["By bus", "By bike", "By car", "On foot"], 1, "She cycles to work.", "Cô ấy đi làm bằng xe đạp.", "Woman: 'I have cycled to work every day since March.'"],
  ["How long does her journey take?", ["Ten minutes", "Fifteen minutes", "Twenty minutes", "Half an hour"], 2, "It takes twenty minutes.", "Chuyến đi mất hai mươi phút.", "Woman: 'It is twenty minutes door to door, faster than the bus.'"],
  ["What worries the man most?", ["The cost", "Busy junctions", "The weather", "Theft"], 1, "He worries about busy junctions.", "Anh ấy lo các nút giao đông đúc.", "Man: 'The junctions are what worry me, not the traffic in general.'"],
  ["What did the council build?", ["A bridge", "A cycle lane", "A car park", "A tunnel"], 1, "They built a cycle lane.", "Hội đồng xây làn xe đạp.", "Woman: 'They finally built a proper protected cycle lane.'"],
  ["What has happened to accidents?", ["They rose", "They stayed the same", "They fell", "No data"], 2, "Accidents have fallen.", "Số vụ tai nạn giảm.", "Man: 'The figures show accidents have fallen sharply.'"],
  ["What does the shop owner say?", ["Business improved", "Business is worse", "Nothing changed", "He moved shop"], 0, "He says business improved.", "Ông chủ tiệm nói việc buôn bán tốt hơn.", "Man: 'Honestly, more people stop and come in now.'"],
  ["What equipment does the girl need?", ["Lights", "A lock", "A helmet", "Gloves"], 0, "She needs lights.", "Bạn ấy cần đèn xe.", "Girl: 'I need front and back lights before the evenings get dark.'"],
  ["Where can you park a bike free?", ["At the station", "At the mall", "In the square", "Outside the library"], 3, "Free parking is outside the library.", "Chỗ để xe miễn phí ở ngoài thư viện.", "Woman: 'There are free racks outside the library.'"],
  ["What will the city do next?", ["Add bike hire", "Close a road", "Raise fines", "Build a car park"], 0, "The city will add a bike hire scheme.", "Thành phố sẽ triển khai dịch vụ cho thuê xe đạp.", "Man: 'A public bike hire scheme starts in the spring.'"],
  ["What is the speakers' conclusion?", ["The lane was a mistake", "The lane has worked well", "More studies are needed", "Cars should return"], 1, "They agree the lane has worked well.", "Họ đồng ý làn xe đạp hiệu quả.", "Woman: 'On the whole, the lane has clearly worked.'"],
];

const pet26: CambridgeMockExam = {
  id: "cambridge-pet-26",
  title: "PET Mock Test 26 - Cycling in the City",
  titleVi: "Đề thi thử PET 26 - Đi xe đạp trong thành phố",
  level: "pet",
  duration: 45,
  totalQuestions: 31,
  questions: build(p26Rw, p26Ls),
};

export const cambridgeExamsPet22to26: CambridgeMockExam[] = [
  pet22,
  pet23,
  pet24,
  pet25,
  pet26,
];
