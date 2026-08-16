/**
 * @file cambridgeExamsKet11to12.ts
 * @description Two Cambridge Key / KET (A2) mock exams, tests 11 to 12. Themes:
 *              11 - Shopping & Money; 12 - Sport, Health & Free Time.
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
/* KET 11 - Shopping & Money                                     */
/* ============================================================= */
const p11a =
  "Last weekend, my mum and I went to the new shopping centre in town. It has more than eighty shops, a cinema, and a big food court on the top floor. We wanted to buy a birthday present for my little brother, so we looked in three different toy shops. In the end, we chose a football because he loves playing sport with his friends. The shop assistant was very helpful and even wrapped the present for free. After shopping, we had lunch at a small cafe near the entrance. My mum said the prices there were cheaper than in the shops near our house, so we plan to go back next month.";
const p11b =
  "Dear Grace,\nThank you for your birthday card and the money you sent me. I have decided to save half of it in my piggy bank and spend the rest on a new pair of trainers. My old ones are too small now! I saw some nice blue trainers in a shop near the market, but they cost thirty pounds, which is a bit expensive for me. My dad said if I do extra jobs at home this month, he will give me a little more pocket money. Then I will have enough to buy them. I will send you a photo when I get my new trainers.\nLove, Ben";
const p11c =
  "Notice: Weekend Market Sale\nCome to the Green Street Market this Saturday and Sunday for our biggest sale of the year! Many stalls are selling clothes, shoes, fruit, and vegetables at lower prices. The market opens at 8 o'clock in the morning and closes at 4 o'clock in the afternoon. If you spend more than ten pounds at any stall, you will get a free reusable shopping bag. Children under twelve can also join a free painting workshop near the main gate between 10 and 11 o'clock. Please remember to bring cash, because most small stalls do not accept cards.";
const p11d =
  "My name is Lucy, and I have started my own small business selling handmade bracelets. Every Sunday, I sell them at a table outside my school with my friend Mia. We buy the beads and string from a craft shop, and then we make the bracelets at home in the evenings. Each bracelet costs two pounds, but if a customer buys three, we give them a small discount. Last month, we saved enough money to buy new colours of beads. Our teacher says we are learning about business, saving, and working together, and I think she is right!";

const k11Rw: Tuple[] = [
  ["How many shops does the new shopping centre have?", ["Fifty", "More than eighty", "One hundred", "Twenty"], 1, "The text says the centre has more than eighty shops.", "Đoạn văn nói trung tâm này có hơn tám mươi cửa hàng.", p11a],
  ["What did they buy for the little brother?", ["A book", "A football", "A toy car", "A bicycle"], 1, "They chose a football because he loves playing sport.", "Họ chọn một quả bóng đá vì em trai thích chơi thể thao.", p11a],
  ["What did the shop assistant do for free?", ["Delivered the present", "Wrapped the present", "Gave a discount", "Gave a bag"], 1, "The shop assistant wrapped the present for free.", "Nhân viên cửa hàng đã gói quà miễn phí.", p11a],
  ["Where did they have lunch?", ["At home", "In a toy shop", "At a small cafe near the entrance", "In the food court"], 2, "They had lunch at a small cafe near the entrance.", "Họ ăn trưa tại một quán cà phê nhỏ gần lối vào.", p11a],
  ["Why do they plan to go back next month?", ["The toys are better there", "The prices at the cafe were cheaper", "The cinema is free", "It is closer to home"], 1, "Mum said the prices there were cheaper than shops near home.", "Mẹ nói giá ở đó rẻ hơn các cửa hàng gần nhà.", p11a],
  ["What did Ben decide to do with half of his money?", ["Spend it on sweets", "Save it in his piggy bank", "Give it to Grace", "Buy a card"], 1, "Ben decided to save half of the money in his piggy bank.", "Ben quyết định để dành một nửa số tiền vào lợn đất tiết kiệm.", p11b],
  ["Why does Ben want new trainers?", ["He lost the old ones", "His old ones are too small", "They are on sale", "His friend has the same pair"], 1, "Ben says his old trainers are too small now.", "Ben nói giày cũ của cậu đã quá chật.", p11b],
  ["How much do the blue trainers cost?", ["Ten pounds", "Twenty pounds", "Thirty pounds", "Forty pounds"], 2, "The blue trainers cost thirty pounds.", "Đôi giày thể thao màu xanh có giá ba mươi bảng.", p11b],
  ["What will Ben's dad do if he does extra jobs?", ["Buy the trainers himself", "Give him a little more pocket money", "Take him shopping", "Return the card"], 1, "His dad will give him a little more pocket money.", "Bố cậu sẽ cho cậu thêm một ít tiền tiêu vặt.", p11b],
  ["What will Ben send Grace?", ["A letter", "A photo when he gets his new trainers", "Some money", "A birthday card"], 1, "Ben says he will send a photo when he gets his new trainers.", "Ben nói sẽ gửi ảnh khi cậu có đôi giày mới.", p11b],
  ["What time does the Green Street Market open?", ["7 o'clock", "8 o'clock", "9 o'clock", "10 o'clock"], 1, "The market opens at 8 o'clock in the morning.", "Chợ mở cửa lúc 8 giờ sáng.", p11c],
  ["What do you get if you spend more than ten pounds?", ["A free lunch", "A free reusable shopping bag", "A free painting", "A discount card"], 1, "Spending more than ten pounds gives you a free reusable shopping bag.", "Chi tiêu hơn mười bảng sẽ được tặng một túi mua sắm tái sử dụng miễn phí.", p11c],
  ["What can children under twelve do near the main gate?", ["Join a free painting workshop", "Ride a bicycle", "Watch a film", "Buy fruit"], 0, "Children under twelve can join a free painting workshop near the main gate.", "Trẻ em dưới mười hai tuổi có thể tham gia lớp vẽ miễn phí gần cổng chính.", p11c],
  ["What should shoppers remember to bring?", ["A shopping bag", "Cash", "A camera", "A map"], 1, "Shoppers should bring cash because small stalls do not accept cards.", "Người mua hàng nên mang tiền mặt vì các gian hàng nhỏ không nhận thẻ.", p11c],
  ["When does the market close?", ["2 o'clock", "3 o'clock", "4 o'clock", "5 o'clock"], 2, "The market closes at 4 o'clock in the afternoon.", "Chợ đóng cửa lúc 4 giờ chiều.", p11c],
  ["What does Lucy sell every Sunday?", ["Cakes", "Handmade bracelets", "Old toys", "Books"], 1, "Lucy sells handmade bracelets every Sunday.", "Lucy bán vòng tay tự làm vào mỗi Chủ nhật.", p11d],
  ["Where do Lucy and Mia buy their materials?", ["A supermarket", "A craft shop", "An online store", "A market stall"], 1, "They buy the beads and string from a craft shop.", "Họ mua hạt cườm và dây từ một cửa hàng đồ thủ công.", p11d],
  ["How much does each bracelet cost?", ["One pound", "Two pounds", "Three pounds", "Five pounds"], 1, "Each bracelet costs two pounds.", "Mỗi chiếc vòng tay có giá hai bảng.", p11d],
  ["What happens if a customer buys three bracelets?", ["They get a free gift", "They get a small discount", "They get a free bag", "Nothing changes"], 1, "Customers who buy three bracelets get a small discount.", "Khách hàng mua ba chiếc vòng tay sẽ được giảm giá nhẹ.", p11d],
  ["What does the teacher say the girls are learning?", ["Cooking and cleaning", "Business, saving, and working together", "Reading and writing", "Painting and drawing"], 1, "The teacher says they are learning about business, saving, and working together.", "Cô giáo nói các em đang học về kinh doanh, tiết kiệm và làm việc cùng nhau.", p11d],
];
const k11Ls: Tuple[] = [
  ["How much does the scarf cost?", ["Five pounds", "Eight pounds", "Ten pounds", "Twelve pounds"], 2, "The woman says the scarf costs ten pounds.", "Người phụ nữ nói chiếc khăn có giá mười bảng.", "Listen: 'Excuse me, how much is this scarf?' 'It's ten pounds, madam.'"],
  ["What is the boy buying for his sister?", ["A book", "A hat", "A bag", "A watch"], 1, "The boy is buying a hat for his sister.", "Cậu bé đang mua một chiếc mũ cho chị gái.", "Listen: 'I'd like to buy this hat as a gift for my sister.'"],
  ["Which floor is the shoe shop on?", ["Ground floor", "First floor", "Second floor", "Third floor"], 2, "The shoe shop is on the second floor.", "Cửa hàng giày ở tầng hai.", "Listen: 'The shoe shop is on the second floor, next to the cafe.'"],
  ["What time does the shop close today?", ["5 o'clock", "6 o'clock", "7 o'clock", "8 o'clock"], 2, "The shop closes at 7 o'clock today.", "Cửa hàng đóng cửa lúc 7 giờ hôm nay.", "Listen: 'We close at seven o'clock today because it's Friday.'"],
  ["How much money does the girl have in total?", ["Five pounds", "Fifteen pounds", "Twenty pounds", "Twenty-five pounds"], 1, "The girl says she has fifteen pounds in total.", "Cô bé nói cô có tất cả mười lăm bảng.", "Listen: 'I have fifteen pounds altogether, so I can buy the T-shirt.'"],
  ["What discount is offered on jackets this week?", ["Ten percent", "Twenty percent", "Thirty percent", "Fifty percent"], 1, "Jackets have a twenty percent discount this week.", "Áo khoác được giảm giá hai mươi phần trăm tuần này.", "Listen: 'All jackets are twenty percent off this week only.'"],
  ["Why does the man want a receipt?", ["To return the item later", "To get a discount", "To win a prize", "To pay less tax"], 0, "He wants the receipt in case he needs to return the item later.", "Ông muốn hóa đơn để có thể trả lại hàng sau này.", "Listen: 'Can I have a receipt, please? I might return this later.'"],
  ["Which payment method does the shop not accept?", ["Cash", "Credit card", "Cheque", "Coins"], 2, "The shop does not accept cheques.", "Cửa hàng không chấp nhận séc.", "Listen: 'Sorry, we don't accept cheques, only cash or card.'"],
  ["What does the woman want to exchange?", ["A dress that is too big", "A hat that is too small", "A bag with a broken strap", "Shoes that are the wrong colour"], 0, "She wants to exchange a dress that is too big for her.", "Bà muốn đổi một chiếc váy quá rộng.", "Listen: 'This dress is too big for me. Can I exchange it for a smaller size?'"],
  ["How much pocket money does the boy get every week?", ["Two pounds", "Four pounds", "Six pounds", "Eight pounds"], 1, "The boy gets four pounds of pocket money every week.", "Cậu bé được nhận bốn bảng tiền tiêu vặt mỗi tuần.", "Listen: 'My parents give me four pounds of pocket money every week.'"],
];

const ket11: CambridgeMockExam = {
  id: "cambridge-ket-11",
  title: "KET Mock Test 11 - Shopping & Money",
  titleVi: "Đề thi thử KET 11 - Mua sắm & Tiền bạc",
  level: "ket",
  duration: 40,
  totalQuestions: 30,
  questions: build(k11Rw, k11Ls),
};

/* ============================================================= */
/* KET 12 - Sport, Health & Free Time                             */
/* ============================================================= */
const p12a =
  "Every Tuesday and Thursday, I go to the sports centre near my house to play badminton with my friend Dan. We started playing two years ago, and now we are both much better than before. The sports centre also has a swimming pool, a gym, and a small cafe where players can relax after their games. Last week, we joined a small competition for young players. There were sixteen players in total, and we won our first two matches! In the final, we lost to a very strong pair from another school, but we still felt proud because it was our first competition. Our coach said we should keep practising for next year.";
const p12b =
  "Dear Diary,\nToday I felt really tired at school because I did not sleep well last night. My doctor says that children my age need at least nine hours of sleep every night, but I only slept for six hours because I was reading a book. Tomorrow I am going to go to bed earlier so I have more energy for my football match on Saturday. I also need to drink more water during the day, because my teacher told us that drinking enough water helps us think more clearly in class. I am going to try to be healthier this month.";
const p12c =
  "Notice: Free Time Activities This Half Term\nOur school is offering some new after-school clubs this half term. On Mondays, there is a running club that meets on the school field at 4 o'clock. On Wednesdays, students can join a dance class in the main hall, which is free for all year groups. On Fridays, there is a table tennis club in the small gym, but students must bring their own bat. All clubs finish by 5 o'clock so that students can catch the late bus home. Please sign up at the office before Friday if you want to join any of these clubs.";
const p12d =
  "My name is Oliver, and I love cycling. Every Saturday morning, my dad and I ride our bikes along the river path near our town. It usually takes about one hour to reach the old bridge and come back home. Cycling helps me stay fit, and I also enjoy the fresh air and quiet countryside. Last month, we cycled to a small village nine kilometres away and had a picnic by a lake. My dad says that regular exercise is good for both the body and the mind, and I agree with him completely. Next year, I hope to cycle in a longer race with other children from my area.";

const k12Rw: Tuple[] = [
  ["How often does the writer play badminton?", ["Once a week", "Every Tuesday and Thursday", "Every day", "Only at weekends"], 1, "The writer plays badminton every Tuesday and Thursday.", "Người viết chơi cầu lông vào mỗi thứ Ba và thứ Năm.", p12a],
  ["What else does the sports centre have?", ["Only a gym", "A swimming pool, a gym, and a cafe", "A cinema", "A football pitch"], 1, "The sports centre also has a swimming pool, a gym, and a cafe.", "Trung tâm thể thao còn có hồ bơi, phòng tập gym và quán cà phê.", p12a],
  ["How many players were in the competition?", ["Eight", "Ten", "Sixteen", "Twenty"], 2, "There were sixteen players in the competition.", "Có mười sáu vận động viên tham gia cuộc thi.", p12a],
  ["How did the writer and Dan do in the final?", ["They won", "They lost", "The match was cancelled", "They did not play in the final"], 1, "They lost the final to a very strong pair.", "Họ đã thua trận chung kết trước một cặp rất mạnh.", p12a],
  ["What did the coach say?", ["They should stop playing", "They should keep practising for next year", "They should join a different sport", "They played badly"], 1, "The coach said they should keep practising for next year.", "Huấn luyện viên nói họ nên tiếp tục luyện tập cho năm sau.", p12a],
  ["Why did the writer feel tired at school?", ["She was ill", "She did not sleep well", "She ran a race", "She skipped breakfast"], 1, "She felt tired because she did not sleep well last night.", "Cô cảm thấy mệt vì đêm qua ngủ không ngon.", p12b],
  ["How many hours of sleep does the doctor recommend?", ["Six hours", "Seven hours", "At least nine hours", "Twelve hours"], 2, "The doctor says children her age need at least nine hours of sleep.", "Bác sĩ nói trẻ em ở độ tuổi của cô cần ngủ ít nhất chín giờ.", p12b],
  ["Why did she only sleep six hours?", ["She was doing homework", "She was reading a book", "She watched television", "She was playing games"], 1, "She only slept six hours because she was reading a book.", "Cô chỉ ngủ sáu giờ vì đang đọc sách.", p12b],
  ["What does the writer plan to do on Saturday?", ["Go swimming", "Play a football match", "Visit her doctor", "Go to bed early only"], 1, "She has a football match on Saturday.", "Cô có một trận đấu bóng đá vào thứ Bảy.", p12b],
  ["What did her teacher say about water?", ["It makes you sleepy", "It helps us think more clearly", "It is bad before sport", "It has no effect on the body"], 1, "The teacher said drinking enough water helps us think more clearly.", "Cô giáo nói uống đủ nước giúp chúng ta suy nghĩ rõ ràng hơn.", p12b],
  ["What time does the running club meet?", ["3 o'clock", "4 o'clock", "5 o'clock", "6 o'clock"], 1, "The running club meets at 4 o'clock.", "Câu lạc bộ chạy bộ gặp nhau lúc 4 giờ.", p12c],
  ["Which club is free for all year groups?", ["Running club", "Dance class", "Table tennis club", "None of them"], 1, "The dance class is free for all year groups.", "Lớp học nhảy miễn phí cho tất cả các khối lớp.", p12c],
  ["What must students bring to the table tennis club?", ["A racket bag", "Their own bat", "A ball", "A drink"], 1, "Students must bring their own bat to the table tennis club.", "Học sinh phải tự mang vợt đến câu lạc bộ bóng bàn.", p12c],
  ["What time do all clubs finish?", ["4 o'clock", "4:30", "5 o'clock", "5:30"], 2, "All clubs finish by 5 o'clock.", "Tất cả các câu lạc bộ kết thúc trước 5 giờ.", p12c],
  ["Where should students sign up to join a club?", ["Online", "At the office", "With the coach", "In the school hall"], 1, "Students should sign up at the office before Friday.", "Học sinh nên đăng ký tại văn phòng trước thứ Sáu.", p12c],
  ["When does Oliver go cycling with his dad?", ["Every evening", "Every Saturday morning", "Every Sunday afternoon", "Once a month"], 1, "Oliver goes cycling with his dad every Saturday morning.", "Oliver đi xe đạp với bố vào mỗi sáng thứ Bảy.", p12d],
  ["How long does the ride to the old bridge usually take?", ["Thirty minutes", "About one hour", "Two hours", "Three hours"], 1, "The ride usually takes about one hour.", "Chuyến đi thường mất khoảng một giờ.", p12d],
  ["How far away is the village they cycled to last month?", ["Three kilometres", "Six kilometres", "Nine kilometres", "Twelve kilometres"], 2, "The village is nine kilometres away.", "Ngôi làng cách đó chín ki-lô-mét.", p12d],
  ["What did they do at the village?", ["Visited a museum", "Had a picnic by a lake", "Watched a race", "Bought bicycles"], 1, "They had a picnic by a lake in the village.", "Họ đã ăn picnic bên hồ ở ngôi làng.", p12d],
  ["What does Oliver hope to do next year?", ["Stop cycling", "Cycle in a longer race", "Buy a new bike", "Move to the village"], 1, "Oliver hopes to cycle in a longer race with other children.", "Oliver hy vọng sẽ tham gia một cuộc đua đạp xe dài hơn với các bạn khác.", p12d],
];
const k12Ls: Tuple[] = [
  ["What sport does the boy want to try this year?", ["Tennis", "Basketball", "Swimming", "Cycling"], 2, "The boy says he wants to try swimming this year.", "Cậu bé nói cậu muốn thử bơi lội trong năm nay.", "Listen: 'This year I really want to try swimming lessons.'"],
  ["How many times a week does the girl go to the gym?", ["Once", "Twice", "Three times", "Four times"], 1, "The girl goes to the gym twice a week.", "Cô bé đi tập gym hai lần một tuần.", "Listen: 'I go to the gym twice a week, on Mondays and Fridays.'"],
  ["What is the doctor's advice about breakfast?", ["Skip it sometimes", "Never skip it", "Eat only fruit", "Eat it very late"], 1, "The doctor advises never skipping breakfast.", "Bác sĩ khuyên không bao giờ nên bỏ bữa sáng.", "Listen: 'Doctor's advice: never skip breakfast, it gives you energy for the day.'"],
  ["What time does the football match start?", ["2 o'clock", "3 o'clock", "4 o'clock", "5 o'clock"], 1, "The football match starts at 3 o'clock.", "Trận đấu bóng đá bắt đầu lúc 3 giờ.", "Listen: 'Don't forget, the football match starts at three o'clock sharp.'"],
  ["Why is the boy going to bed early tonight?", ["He is ill", "He has a race tomorrow", "He is bored", "His parents told him to"], 1, "He is going to bed early because he has a race tomorrow.", "Cậu bé đi ngủ sớm vì ngày mai có một cuộc đua.", "Listen: 'I'm going to bed early tonight because I have a race tomorrow morning.'"],
  ["What does the coach recommend drinking after exercise?", ["Juice", "Water", "Milk", "Soda"], 1, "The coach recommends drinking water after exercise.", "Huấn luyện viên khuyên nên uống nước sau khi tập luyện.", "Listen: 'After exercise, always drink plenty of water to stay healthy.'"],
  ["Which club has been cancelled today?", ["Running club", "Dance club", "Table tennis club", "Chess club"], 2, "The table tennis club has been cancelled today.", "Câu lạc bộ bóng bàn hôm nay bị hủy.", "Listen: 'Sorry, the table tennis club is cancelled today because the gym is closed.'"],
  ["How does the girl usually travel to school?", ["By bus", "By bike", "On foot", "By car"], 1, "She usually travels to school by bike.", "Cô bé thường đi học bằng xe đạp.", "Listen: 'I usually cycle to school, it only takes about ten minutes.'"],
  ["What injury does the boy have?", ["A broken arm", "A hurt knee", "A sore throat", "A headache"], 1, "The boy has hurt his knee.", "Cậu bé bị đau đầu gối.", "Listen: 'I hurt my knee playing football yesterday, so I can't run today.'"],
  ["What does the woman suggest doing every day for good health?", ["Watching television", "Going for a short walk", "Sleeping all day", "Eating sweets"], 1, "She suggests going for a short walk every day.", "Cô ấy đề nghị nên đi bộ ngắn mỗi ngày để có sức khỏe tốt.", "Listen: 'For good health, try going for a short walk every single day.'"],
];

const ket12: CambridgeMockExam = {
  id: "cambridge-ket-12",
  title: "KET Mock Test 12 - Sport, Health & Free Time",
  titleVi: "Đề thi thử KET 12 - Thể thao, Sức khỏe & Thời gian rảnh",
  level: "ket",
  duration: 40,
  totalQuestions: 30,
  questions: build(k12Rw, k12Ls),
};

export const cambridgeExamsKet11to12: CambridgeMockExam[] = [ket11, ket12];
