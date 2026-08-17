/**
 * @file cambridgeExamsKet15.ts
 * @description One Cambridge Key (KET, A2) mock exam, test 15.
 *              Theme: Sport & Healthy Habits. 20 Reading & Writing questions
 *              (three reading groups) and 10 Listening questions.
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
  "Hi Marta, Thanks for your email. You asked about my new sports club, so here is my news. I joined the swimming club at the leisure centre three weeks ago. We train on Tuesday and Thursday evenings from six until seven thirty. Our coach, Elena, is very patient and she has already taught me a better way to breathe. At first I was slower than everybody else, but now I can swim four hundred metres without stopping. The club costs fifteen euros a month, which is cheaper than the gym near my house. Next month there is a small competition and Elena thinks I should enter the fifty-metre race. I am a bit nervous, but I will try. Write soon and tell me about your basketball team. Love, Sofia";
const pB =
  "Doctors say that young people need about one hour of exercise every day, but many teenagers get much less. Walking or cycling to school is an easy way to move more, and it costs nothing. Sleep matters too: most students between twelve and sixteen need at least eight hours a night, yet plenty of them stay online until midnight. Food is the third part of the picture. A breakfast with fruit and bread gives energy for the whole morning, while sugary drinks give a short burst of energy and then leave you tired. Small changes are best because they are easier to keep.";
const pC =
  "GREENFIELD SPORTS CENTRE - NOTICE. The swimming pool will be closed from Monday 4 to Wednesday 6 May while the water is cleaned. During these three days, members can use the gym and the tennis courts free of charge. The Saturday morning children's class will move to the sports hall at the same time. Please bring indoor shoes. Lockers must be emptied before Sunday evening; anything left inside will be taken to reception. We are sorry for the trouble and we thank you for your patience.";

const rw: Tuple[] = [
  ["When did Sofia join the club?", ["Last week", "Three weeks ago", "Last month", "Yesterday"], 1, "The email says she joined the swimming club three weeks ago.", "Email nói cô ấy tham gia câu lạc bộ bơi cách đây ba tuần.", pA],
  ["How often does the club train?", ["Once a week", "Twice a week", "Three times a week", "Every day"], 1, "They train on Tuesday and Thursday, so twice a week.", "Họ tập vào thứ Ba và thứ Năm, tức hai lần mỗi tuần.", pA],
  ["What time does training finish?", ["Six o'clock", "Seven o'clock", "Seven thirty", "Eight o'clock"], 2, "The email says they train from six until seven thirty.", "Email nói họ tập từ sáu giờ đến bảy giờ ba mươi.", pA],
  ["What has the coach taught Sofia?", ["A better way to breathe", "How to dive", "How to swim faster only", "How to keep score"], 0, "The email says Elena taught her a better way to breathe.", "Email nói Elena đã dạy cô ấy cách hít thở tốt hơn.", pA],
  ["How far can Sofia swim now?", ["Two hundred metres", "Three hundred metres", "Four hundred metres", "Five hundred metres"], 2, "The email says she can now swim four hundred metres without stopping.", "Email nói giờ cô ấy có thể bơi bốn trăm mét không nghỉ.", pA],
  ["What does Sofia say about the price?", ["It is cheaper than the gym", "It is very expensive", "It is free", "It is the same as the gym"], 0, "The email says fifteen euros a month is cheaper than the gym.", "Email nói mười lăm euro mỗi tháng rẻ hơn phòng gym.", pA],
  ["How does Sofia feel about the competition?", ["Angry", "A bit nervous", "Bored", "Completely sure"], 1, "The email says 'I am a bit nervous, but I will try'.", "Email nói cô ấy hơi lo nhưng vẫn sẽ thử.", pA],
  ["How much exercise do doctors recommend?", ["Thirty minutes a week", "About one hour a day", "Two hours a day", "Only at weekends"], 1, "The article says young people need about one hour of exercise every day.", "Bài viết nói người trẻ cần khoảng một giờ vận động mỗi ngày.", pB],
  ["Why is cycling to school a good idea?", ["It is fast only", "It costs nothing and adds exercise", "It is safer than walking", "Teachers ask for it"], 1, "The article says it is an easy way to move more and costs nothing.", "Bài viết nói đó là cách dễ để vận động thêm và không tốn tiền.", pB],
  ["How much sleep do students of twelve to sixteen need?", ["Six hours", "Seven hours", "At least eight hours", "Ten hours"], 2, "The article says they need at least eight hours a night.", "Bài viết nói các bạn cần ngủ ít nhất tám tiếng mỗi đêm.", pB],
  ["What problem does the article mention about evenings?", ["Students study too much", "Students stay online until midnight", "Students go to bed at nine", "Students watch sport"], 1, "The article says plenty of them stay online until midnight.", "Bài viết nói nhiều bạn thức online đến nửa đêm.", pB],
  ["What does a breakfast with fruit and bread give?", ["Energy for the whole morning", "A short burst of energy", "Nothing useful", "Better eyesight"], 0, "The article says it gives energy for the whole morning.", "Bài viết nói nó cung cấp năng lượng cho cả buổi sáng.", pB],
  ["Why are small changes best?", ["They are cheap", "They are easier to keep", "Doctors like them", "They work in one day"], 1, "The article says small changes are easier to keep.", "Bài viết nói thay đổi nhỏ dễ duy trì hơn.", pB],
  ["Why will the pool close?", ["For a competition", "The water is being cleaned", "For a new roof", "There are no staff"], 1, "The notice says the pool closes while the water is cleaned.", "Thông báo nói bể đóng cửa để làm sạch nước.", pC],
  ["How long will the pool be closed?", ["Two days", "Three days", "Four days", "One week"], 1, "The notice says Monday 4 to Wednesday 6 May, so three days.", "Thông báo nói từ thứ Hai ngày 4 đến thứ Tư ngày 6 tháng Năm, tức ba ngày.", pC],
  ["What can members use free of charge?", ["The gym and tennis courts", "The cafe", "The pool", "The car park"], 0, "The notice says members can use the gym and the tennis courts free of charge.", "Thông báo nói thành viên được dùng phòng gym và sân tennis miễn phí.", pC],
  ["Where will the children's class take place?", ["In the pool", "In the sports hall", "Outside", "At a school"], 1, "The notice says the class will move to the sports hall.", "Thông báo nói lớp học sẽ chuyển sang nhà thể thao.", pC],
  ["What must people bring to the class?", ["A towel", "Indoor shoes", "A racket", "A swimming hat"], 1, "The notice says 'Please bring indoor shoes'.", "Thông báo nói hãy mang giày dùng trong nhà.", pC],
  ["When must lockers be emptied?", ["Before Sunday evening", "On Monday", "Before Friday", "After the class"], 0, "The notice says lockers must be emptied before Sunday evening.", "Thông báo nói tủ đồ phải được dọn trước tối Chủ nhật.", pC],
  ["What happens to things left in lockers?", ["They are thrown away", "They are taken to reception", "They stay there", "They are sold"], 1, "The notice says anything left inside will be taken to reception.", "Thông báo nói đồ để lại sẽ được đưa xuống quầy tiếp tân.", pC],
];

const ls: Tuple[] = [
  ["Which sport does the man do on Sundays?", ["Football", "Running", "Tennis", "Swimming"], 1, "He says he goes running on Sunday mornings.", "Anh ấy nói mình đi chạy vào sáng Chủ nhật.", "Listen: 'Woman: Do you play football? Man: No, I go running every Sunday morning.'"],
  ["How much does the monthly ticket cost?", ["Twelve euros", "Fifteen euros", "Twenty euros", "Twenty-five euros"], 2, "The receptionist says the monthly ticket is twenty euros.", "Nhân viên nói vé tháng giá hai mươi euro.", "Listen: 'The monthly ticket costs twenty euros and it includes the gym.'"],
  ["What time does the class start?", ["Five thirty", "Six o'clock", "Six thirty", "Seven o'clock"], 0, "The class starts at five thirty.", "Lớp học bắt đầu lúc năm giờ ba mươi.", "Listen: 'Your first class starts at five thirty, so please arrive a little earlier.'"],
  ["What did the woman forget?", ["Her towel", "Her shoes", "Her water bottle", "Her card"], 3, "She says she forgot her membership card.", "Cô ấy nói mình quên thẻ thành viên.", "Listen: 'I am sorry, I forgot my membership card at home again.'"],
  ["Where is the changing room?", ["On the first floor", "Next to the pool", "Behind the gym", "Near the entrance"], 1, "The changing room is next to the pool.", "Phòng thay đồ nằm cạnh bể bơi.", "Listen: 'The changing rooms are next to the pool, on your right.'"],
  ["Why can't the man play tennis today?", ["He is ill", "His arm hurts", "The courts are full", "It is raining"], 2, "He says all the courts are full.", "Anh ấy nói tất cả sân đều đã có người.", "Listen: 'I cannot play today because all the tennis courts are full.'"],
  ["What does the coach ask the students to do first?", ["Warm up", "Swim fast", "Take a test", "Rest"], 0, "The coach asks them to warm up first.", "Huấn luyện viên yêu cầu khởi động trước.", "Listen: 'Before we start, everybody must warm up for ten minutes.'"],
  ["How many people signed up for the race?", ["Eighteen", "Twenty-eight", "Thirty", "Forty"], 1, "The speaker says twenty-eight people signed up.", "Người nói cho biết hai mươi tám người đã đăng ký.", "Listen: 'So far twenty-eight people have signed up for Saturday's race.'"],
  ["What does the woman usually drink after training?", ["Water", "Coffee", "Cola", "Juice"], 0, "She says she always drinks water after training.", "Cô ấy nói luôn uống nước sau khi tập.", "Listen: 'After training I always drink water, never fizzy drinks.'"],
  ["What will they do next weekend?", ["Watch a match", "Go cycling", "Have a picnic", "Take an exam"], 1, "They plan to go cycling next weekend.", "Họ dự định đi đạp xe vào cuối tuần tới.", "Listen: 'Next weekend we are going cycling along the river path.'"],
];

const ket15: CambridgeMockExam = {
  id: "cambridge-ket-15",
  title: "KET Mock Test 15 - Sport & Healthy Habits",
  titleVi: "Đề thi thử KET 15 - Thể thao & Thói quen lành mạnh",
  level: "ket",
  duration: 40,
  totalQuestions: 30,
  questions: build(rw, ls),
};

export const cambridgeExamsKet15: CambridgeMockExam[] = [ket15];
