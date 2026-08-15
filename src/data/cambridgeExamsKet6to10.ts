/**
 * @file cambridgeExamsKet6to10.ts
 * @description 5 complete Cambridge KET (A2) mock exams numbered 6-10, each with
 *              Reading & Writing (20 questions, including two 5-question reading-text
 *              groups) and Listening (10 questions). Themes: 6 - Shopping & Money;
 *              7 - Health & Sport; 8 - Technology & Communication; 9 - Family & Celebrations;
 *              10 - Transport & Travel.
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

/* ===================== KET 6 - Shopping & Money ===================== */
const k6Passage1 = "Green Street Market\nEvery Saturday, from 8 a.m. to 2 p.m., you can visit Green Street Market. There are more than fifty stalls selling fresh fruit, vegetables, cheese, and homemade bread. Last month a new stall opened - it sells second-hand clothes and books at very low prices. If you arrive early, you can get the best fruit before it sells out. There is also a small cafe where you can buy a hot drink and a snack. Parking is free before 9 a.m., but after that you must pay two pounds. The market closes early if it rains heavily.";

const k6Passage2 = "From: Anna\nTo: Sophie\nSubject: New shoes\n\nHi Sophie,\nI went shopping yesterday and bought some new trainers. They were on sale, so I only paid twenty-five pounds instead of forty! The shop assistant was really helpful and let me try on three different pairs before I chose the blue ones. I also wanted to buy a jacket, but I didn't have enough money left, so I'll go back next week when I get paid. Do you want to come with me? We could also look for a birthday present for Dad. His birthday is next Sunday and I still have no idea what to buy him.\nSee you soon,\nAnna";

const k6Rw: Tuple[] = [
  ["What time does Green Street Market open?", ["6 a.m.", "8 a.m.", "9 a.m.", "2 p.m."], 1, "The text says the market runs from 8 a.m. to 2 p.m.", "Bài đọc nói chợ mở cửa từ 8 giờ sáng đến 2 giờ chiều.", k6Passage1],
  ["What does the new stall sell?", ["fresh fruit", "hot drinks", "second-hand clothes and books", "cheese"], 2, "The text says a new stall sells second-hand clothes and books.", "Bài đọc nói gian hàng mới bán quần áo và sách cũ.", k6Passage1],
  ["When is parking free?", ["all day", "before 9 a.m.", "after 9 a.m.", "only on Sundays"], 1, "Parking is free before 9 a.m. according to the text.", "Chỗ đậu xe miễn phí trước 9 giờ sáng theo bài đọc.", k6Passage1],
  ["Why should you arrive early at the market?", ["to pay less for parking", "to get the best fruit", "to meet the owner", "to avoid the rain"], 1, "The text says arriving early means you get the best fruit before it sells out.", "Bài đọc nói đến sớm để mua được trái cây ngon nhất trước khi hết hàng.", k6Passage1],
  ["What happens if it rains heavily?", ["the market gets bigger", "the cafe closes only", "the market closes early", "prices go up"], 2, "The text says the market closes early if it rains heavily.", "Bài đọc nói chợ đóng cửa sớm nếu trời mưa to.", k6Passage1],
  ["How much did Anna pay for her trainers?", ["forty pounds", "twenty-five pounds", "fifteen pounds", "thirty pounds"], 1, "Anna says she paid twenty-five pounds instead of forty.", "Anna nói cô đã trả hai mươi lăm bảng thay vì bốn mươi.", k6Passage2],
  ["How many pairs of trainers did Anna try on?", ["one", "two", "three", "four"], 2, "The email says the assistant let her try on three different pairs.", "Email nói nhân viên cho Anna thử ba đôi khác nhau.", k6Passage2],
  ["Why didn't Anna buy a jacket?", ["she didn't like any jacket", "she had no money left", "the shop was closed", "she forgot"], 1, "Anna says she didn't have enough money left for a jacket.", "Anna nói cô không còn đủ tiền để mua áo khoác.", k6Passage2],
  ["What does Anna want Sophie to help her find?", ["new trainers", "a birthday present for Dad", "a jacket for herself", "a cafe"], 1, "Anna asks Sophie to help look for a birthday present for Dad.", "Anna nhờ Sophie giúp tìm quà sinh nhật cho bố.", k6Passage2],
  ["When is Dad's birthday?", ["next Saturday", "next Sunday", "this Monday", "next month"], 1, "Anna says his birthday is next Sunday.", "Anna nói sinh nhật bố là chủ nhật tới.", k6Passage2],
  ["I'm looking ___ a cheap pair of jeans.", ["for", "at", "up", "on"], 0, "'Look for' means to search for something; correct phrasal verb.", "'Look for' nghĩa là tìm kiếm; đây là cụm động từ đúng.", undefined],
  ["Can you pay ___ cash or by card?", ["on", "in", "at", "with"], 1, "'Pay in cash' is the correct fixed expression.", "'Pay in cash' là cách diễn đạt cố định đúng.", undefined],
  ["This shirt doesn't fit. Can I try another one ___?", ["off", "on", "up", "in"], 1, "'Try on' means to put on clothes to see if they fit.", "'Try on' nghĩa là mặc thử quần áo xem có vừa không.", undefined],
  ["The shop ___ at nine o'clock every morning.", ["open", "opens", "opening", "opened"], 1, "Present simple with 'the shop' (he/she/it) needs -s: opens.", "Thì hiện tại đơn với chủ ngữ số ít cần thêm -s: opens.", undefined],
  ["How much money ___ you spend at the market?", ["did", "do", "does", "was"], 0, "Past simple question needs 'did' + base verb.", "Câu hỏi thì quá khứ đơn cần 'did' + động từ nguyên mẫu.", undefined],
  ["She wants to save up ___ a new bike.", ["for", "to", "on", "at"], 0, "'Save up for something' is the correct phrase.", "'Save up for something' là cụm từ đúng nghĩa để dành tiền mua gì.", undefined],
  ["A place where you buy bread is called a ___.", ["bank", "bakery", "butcher", "bookshop"], 1, "A bakery sells bread and cakes.", "Tiệm bánh (bakery) bán bánh mì và bánh ngọt.", undefined],
  ["If something is cheap, it means it doesn't cost ___ money.", ["much", "many", "little", "few"], 0, "'Much' is used with uncountable nouns like money.", "'Much' dùng với danh từ không đếm được như 'money'.", undefined],
  ["We ___ shopping every Saturday morning.", ["going", "goes", "go", "went"], 2, "Present simple habit with 'we' uses base form: go.", "Thói quen ở hiện tại đơn với 'we' dùng động từ nguyên mẫu: go.", undefined],
  ["I have already spent all my pocket money ___ sweets.", ["on", "in", "for", "at"], 0, "'Spend money on something' is the correct preposition.", "'Spend money on something' là giới từ đúng khi tiêu tiền vào việc gì.", undefined],
];

const k6Ls: Tuple[] = [
  ["How much does the scarf cost?", ["£8", "£10", "£12", "£15"], 2, "The speaker says the scarf costs twelve pounds.", "Người nói nói khăn quàng giá mười hai bảng.", "Listen: 'This scarf is lovely and it costs twelve pounds.'"],
  ["What is Tom buying for his sister?", ["a book", "a bag", "a watch", "shoes"], 1, "Tom says he is buying a bag for his sister.", "Tom nói anh ấy mua một cái túi cho em gái.", "Listen: 'I want to buy a bag for my sister's birthday.'"],
  ["Where will they meet before shopping?", ["at the station", "at the cafe", "at school", "at the bank"], 1, "The speaker suggests meeting at the cafe first.", "Người nói đề nghị gặp nhau ở quán cà phê trước.", "Listen: 'Let's meet at the cafe before we go shopping.'"],
  ["What day is the shop closed?", ["Monday", "Wednesday", "Friday", "Sunday"], 3, "The announcement says the shop is closed on Sundays.", "Thông báo nói cửa hàng đóng cửa vào chủ nhật.", "Listen: 'Please note our shop is closed every Sunday.'"],
  ["How does the woman want to pay?", ["cash", "card", "cheque", "online"], 1, "The woman asks to pay by card.", "Người phụ nữ hỏi để trả bằng thẻ.", "Listen: 'Can I pay by card, please?'"],
  ["What size does the boy need?", ["small", "medium", "large", "extra large"], 2, "The boy says he needs a large size.", "Cậu bé nói mình cần cỡ lớn.", "Listen: 'I usually wear a large size for jumpers.'"],
  ["What is on sale today?", ["shoes", "coats", "hats", "gloves"], 0, "The announcement says shoes are on sale today.", "Thông báo nói giày đang giảm giá hôm nay.", "Listen: 'All shoes are twenty percent off today only.'"],
  ["How much change does the customer get?", ["£1", "£2", "£3", "£5"], 1, "The shop assistant says here is two pounds change.", "Nhân viên nói đây là hai bảng tiền thối lại.", "Listen: 'That's ten pounds, so here is two pounds change.'"],
  ["Why is the woman returning the jumper?", ["it's too small", "it's the wrong colour", "it's too expensive", "it has a hole"], 1, "The woman says it is the wrong colour.", "Người phụ nữ nói đó là màu không đúng.", "Listen: 'I'd like to return this jumper - it's the wrong colour.'"],
  ["What time does the market close?", ["1 p.m.", "2 p.m.", "3 p.m.", "4 p.m."], 1, "The announcement says the market closes at two o'clock.", "Thông báo nói chợ đóng cửa lúc hai giờ.", "Listen: 'The market closes at two o'clock today.'"],
];

const ket6: CambridgeMockExam = {
  id: "cambridge-ket-6",
  title: "KET Mock Test 6 - Shopping & Money",
  titleVi: "Đề thi thử KET 6 - Mua sắm & Tiền bạc",
  level: "ket",
  duration: 40,
  totalQuestions: 30,
  questions: build(k6Rw, k6Ls),
};

/* ===================== KET 7 - Health & Sport ===================== */
const k7Passage1 = "Riverside Sports Centre\nRiverside Sports Centre is open every day from 6 a.m. to 10 p.m. We offer swimming, tennis, basketball, and a gym with modern equipment. New members can join for free this month, but after that there is a monthly fee of fifteen pounds. Children under twelve must be with an adult in the swimming pool. On Wednesdays, there is a special class for beginners who want to learn how to swim. Please remember to bring your own towel because we do not provide them. The centre also has a small shop selling drinks and healthy snacks.";

const k7Passage2 = "From: Coach Miller\nTo: All football team members\nSubject: Training this week\n\nHello everyone,\nOur training session on Tuesday has been moved from 4 p.m. to 5 p.m. because the field is being used for another event. Please make sure you arrive fifteen minutes early to warm up properly - this helps prevent injuries. Remember to bring plenty of water, especially since the weather has been quite hot recently. If you feel unwell or have hurt yourself, please tell me before training starts so we can look after you. Our next match is on Saturday against Oakwood School, and I hope everyone can come and support the team.\nSee you at training,\nCoach Miller";

const k7Rw: Tuple[] = [
  ["What time does Riverside Sports Centre open?", ["5 a.m.", "6 a.m.", "7 a.m.", "10 a.m."], 1, "The text says it opens at 6 a.m.", "Bài đọc nói trung tâm mở cửa lúc 6 giờ sáng.", k7Passage1],
  ["How much is the monthly fee after the free month?", ["five pounds", "ten pounds", "fifteen pounds", "twenty pounds"], 2, "The text says the monthly fee is fifteen pounds.", "Bài đọc nói phí hàng tháng là mười lăm bảng.", k7Passage1],
  ["What must children under twelve do in the pool?", ["swim alone", "be with an adult", "wear a helmet", "pay extra"], 1, "The text says children under twelve must be with an adult.", "Bài đọc nói trẻ dưới mười hai tuổi phải có người lớn đi cùng.", k7Passage1],
  ["What class happens on Wednesdays?", ["tennis for adults", "a beginners' swimming class", "a basketball match", "a gym tour"], 1, "The text mentions a special beginners' swimming class on Wednesdays.", "Bài đọc nói có lớp bơi cho người mới bắt đầu vào thứ Tư.", k7Passage1],
  ["What should visitors bring themselves?", ["a towel", "a swimsuit", "shoes", "a ball"], 0, "The text says the centre does not provide towels.", "Bài đọc nói trung tâm không cung cấp khăn tắm.", k7Passage1],
  ["Why was Tuesday's training moved to 5 p.m.?", ["the coach was ill", "the field is used for another event", "it was raining", "the team asked for it"], 1, "The email says the field is being used for another event.", "Email nói sân đang được sử dụng cho sự kiện khác.", k7Passage2],
  ["How early should players arrive?", ["five minutes", "ten minutes", "fifteen minutes", "thirty minutes"], 2, "The email says to arrive fifteen minutes early to warm up.", "Email nói nên đến sớm mười lăm phút để khởi động.", k7Passage2],
  ["Why should players bring plenty of water?", ["training is long", "the weather has been hot", "the field is far", "there is no shop"], 1, "The coach says the weather has been quite hot recently.", "Huấn luyện viên nói thời tiết gần đây khá nóng.", k7Passage2],
  ["What should players do if they feel unwell?", ["stay at home silently", "tell the coach before training", "keep training anyway", "call a doctor"], 1, "The coach asks players to tell him before training starts.", "Huấn luyện viên yêu cầu báo trước khi buổi tập bắt đầu.", k7Passage2],
  ["Who is the team playing on Saturday?", ["Riverside School", "Oakwood School", "Green Valley School", "Hilltop School"], 1, "The email says the next match is against Oakwood School.", "Email nói trận đấu tiếp theo là với trường Oakwood.", k7Passage2],
  ["You should warm up before you ___ exercise.", ["do", "does", "doing", "did"], 0, "Base verb after 'you' in present simple: do.", "Động từ nguyên mẫu sau 'you' ở thì hiện tại đơn: do.", undefined],
  ["He gave ___ playing tennis because of his injury.", ["up", "on", "off", "in"], 0, "'Give up' means to stop doing something.", "'Give up' nghĩa là từ bỏ, ngừng làm việc gì đó.", undefined],
  ["I feel sick, so I need to lie ___ for a while.", ["down", "up", "on", "off"], 0, "'Lie down' means to rest in a lying position.", "'Lie down' nghĩa là nằm nghỉ ngơi.", undefined],
  ["She is good ___ swimming.", ["in", "at", "on", "for"], 1, "'Good at' is the correct preposition for skills.", "'Good at' là giới từ đúng khi nói về kỹ năng.", undefined],
  ["We ___ football every weekend since last year.", ["play", "played", "have played", "playing"], 2, "Present perfect for an action continuing since a point in the past.", "Thì hiện tại hoàn thành dùng cho hành động tiếp diễn từ quá khứ.", undefined],
  ["If you eat too much sugar, you might feel ___.", ["healthy", "unwell", "strong", "fit"], 1, "Eating too much sugar can make you feel unwell.", "Ăn quá nhiều đường có thể khiến bạn cảm thấy khó chịu (unwell).", undefined],
  ["The doctor told me to rest ___ two days.", ["for", "since", "during", "at"], 0, "'For' is used with a period of time.", "'For' dùng với khoảng thời gian.", undefined],
  ["He hurt his leg ___ he was playing basketball.", ["during", "while", "for", "since"], 1, "'While' + subject + verb describes an action happening at the same time.", "'While' + chủ ngữ + động từ diễn tả hành động xảy ra đồng thời.", undefined],
  ["Drinking water helps you ___ hydrated.", ["stay", "stays", "stayed", "staying"], 0, "'Helps you' is followed by a base verb: stay.", "'Helps you' theo sau bởi động từ nguyên mẫu: stay.", undefined],
  ["A place where doctors work is called a ___.", ["gym", "hospital", "pool", "stadium"], 1, "A hospital is where doctors work and treat patients.", "Bệnh viện (hospital) là nơi bác sĩ làm việc và chữa bệnh.", undefined],
];

const k7Ls: Tuple[] = [
  ["What sport does the boy like best?", ["football", "swimming", "tennis", "basketball"], 1, "The boy says swimming is his favourite sport.", "Cậu bé nói bơi lội là môn thể thao yêu thích của mình.", "Listen: 'My favourite sport is swimming - I go every Saturday.'"],
  ["What time does the gym class start?", ["6 p.m.", "7 p.m.", "8 p.m.", "9 p.m."], 1, "The speaker says the class starts at seven o'clock.", "Người nói nói lớp học bắt đầu lúc bảy giờ.", "Listen: 'The gym class starts at seven o'clock this evening.'"],
  ["Why is the girl going to the doctor?", ["a cold", "a headache", "a broken arm", "toothache"], 2, "The girl says she has a broken arm from playing sport.", "Cô gái nói cô bị gãy tay khi chơi thể thao.", "Listen: 'I fell over and now I have a broken arm.'"],
  ["What should the patient take twice a day?", ["water", "medicine", "vitamins", "tea"], 1, "The doctor tells the patient to take medicine twice a day.", "Bác sĩ dặn bệnh nhân uống thuốc hai lần một ngày.", "Listen: 'Please take this medicine twice a day after meals.'"],
  ["How often does Sam go running?", ["once a week", "twice a week", "every day", "never"], 1, "Sam says he goes running twice a week.", "Sam nói anh ấy chạy bộ hai lần một tuần.", "Listen: 'I go running twice a week, usually on Mondays and Fridays.'"],
  ["What is wrong with the boy?", ["he has a fever", "he has a sore throat", "he has a cough", "he has a stomach ache"], 3, "The boy says his stomach hurts.", "Cậu bé nói bụng mình bị đau.", "Listen: 'I feel bad because my stomach really hurts.'"],
  ["What time is the football match?", ["2 p.m.", "3 p.m.", "4 p.m.", "5 p.m."], 2, "The announcement says the match starts at four o'clock.", "Thông báo nói trận đấu bắt đầu lúc bốn giờ.", "Listen: 'The football match will start at four o'clock this afternoon.'"],
  ["What does the coach ask the players to bring?", ["a ball", "water bottles", "shoes", "towels"], 1, "The coach asks players to bring their own water bottles.", "Huấn luyện viên yêu cầu cầu thủ mang theo bình nước riêng.", "Listen: 'Everyone must bring their own water bottle to training.'"],
  ["How long did the girl exercise for?", ["twenty minutes", "thirty minutes", "forty minutes", "one hour"], 1, "The girl says she exercised for thirty minutes.", "Cô gái nói cô đã tập thể dục ba mươi phút.", "Listen: 'I exercised for thirty minutes this morning before school.'"],
  ["What advice does the nurse give?", ["eat more sugar", "drink more water", "sleep less", "run faster"], 1, "The nurse advises drinking more water every day.", "Y tá khuyên nên uống nhiều nước hơn mỗi ngày.", "Listen: 'You should drink more water every day to stay healthy.'"],
];

const ket7: CambridgeMockExam = {
  id: "cambridge-ket-7",
  title: "KET Mock Test 7 - Health & Sport",
  titleVi: "Đề thi thử KET 7 - Sức khỏe & Thể thao",
  level: "ket",
  duration: 40,
  totalQuestions: 30,
  questions: build(k7Rw, k7Ls),
};

/* ===================== KET 8 - Technology & Communication ===================== */
const k8Passage1 = "The School Computer Club\nEvery Thursday after school, students can join the Computer Club in Room 12. The club teaches basic coding, how to make websites, and safe ways to use the internet. Last year, the club members created a website for the school library, and many students now use it to find books. New laptops arrived last month, so there are enough for everyone to use one each. The club is free, but you must sign up with Mr Patel before Wednesday. If you have your own laptop, you can bring it, but it is not necessary. The club finishes at half past four.";

const k8Passage2 = "From: Emma\nTo: Grandma\nSubject: My new phone\n\nDear Grandma,\nThank you so much for the phone you gave me for my birthday! I have already learned how to send messages and take photos with it. Mum showed me how to video call so we can talk to each other every Sunday evening. I also downloaded an app to help me practise my maths, which is really useful before tests. I promise I will not spend too much time on it and I will always finish my homework first. I can't wait to show you all the photos I've taken of our garden.\nLots of love,\nEmma";

const k8Rw: Tuple[] = [
  ["When does the Computer Club meet?", ["Monday", "Wednesday", "Thursday", "Friday"], 2, "The text says the club meets every Thursday after school.", "Bài đọc nói câu lạc bộ họp mỗi thứ Năm sau giờ học.", k8Passage1],
  ["What did club members create last year?", ["a game", "a website for the library", "an app", "a video"], 1, "The text says they created a website for the school library.", "Bài đọc nói họ tạo một trang web cho thư viện trường.", k8Passage1],
  ["Why did new laptops arrive?", ["to sell them", "so there are enough for everyone", "to replace old chairs", "for the teachers only"], 1, "The text says new laptops arrived so there are enough for everyone to use one each.", "Bài đọc nói laptop mới đến để đủ cho mỗi người dùng một cái.", k8Passage1],
  ["What must students do before joining?", ["pay a fee", "bring their own laptop", "sign up with Mr Patel", "ask their teacher"], 2, "The text says students must sign up with Mr Patel before Wednesday.", "Bài đọc nói học sinh phải đăng ký với thầy Patel trước thứ Tư.", k8Passage1],
  ["What time does the club finish?", ["4 o'clock", "half past four", "5 o'clock", "half past five"], 1, "The text says the club finishes at half past four.", "Bài đọc nói câu lạc bộ kết thúc lúc bốn rưỡi.", k8Passage1],
  ["What did Emma receive for her birthday?", ["a laptop", "a phone", "a camera", "a tablet"], 1, "Emma thanks her grandma for the phone she gave her for her birthday.", "Emma cảm ơn bà đã tặng điện thoại nhân dịp sinh nhật.", k8Passage2],
  ["What has Emma already learned to do?", ["code a website", "send messages and take photos", "play video games", "write emails"], 1, "Emma says she has already learned to send messages and take photos.", "Emma nói cô đã học được cách gửi tin nhắn và chụp ảnh.", k8Passage2],
  ["When do Emma and her Grandma talk by video call?", ["every morning", "every Sunday evening", "every Friday", "every day"], 1, "Emma says they video call every Sunday evening.", "Emma nói họ gọi video mỗi tối chủ nhật.", k8Passage2],
  ["Why did Emma download an app?", ["to play games", "to practise her maths", "to talk to friends", "to take photos"], 1, "Emma says the app helps her practise maths before tests.", "Emma nói ứng dụng giúp cô luyện toán trước khi thi.", k8Passage2],
  ["What does Emma promise to do first?", ["watch videos", "finish her homework", "call her friends", "clean her room"], 1, "Emma promises she will always finish her homework first.", "Emma hứa sẽ luôn hoàn thành bài tập trước.", k8Passage2],
  ["Please turn ___ your phone before the film starts.", ["off", "up", "on", "out"], 0, "'Turn off' means to switch a device off.", "'Turn off' nghĩa là tắt thiết bị.", undefined],
  ["I need to charge ___ my laptop battery.", ["up", "on", "off", "in"], 0, "'Charge up' means to fill a battery with power.", "'Charge up' nghĩa là sạc pin.", undefined],
  ["She is interested ___ learning to code.", ["on", "in", "at", "for"], 1, "'Interested in' is the correct preposition.", "'Interested in' là giới từ đúng.", undefined],
  ["By next year, computers ___ even smaller.", ["will be", "are", "were", "have been"], 0, "Future prediction uses 'will be'.", "Dự đoán trong tương lai dùng 'will be'.", undefined],
  ["He ___ his phone yesterday, so he can't call anyone.", ["loses", "lost", "has lost", "was losing"], 1, "Past simple 'yesterday' needs the simple past: lost.", "Trạng từ 'yesterday' cần thì quá khứ đơn: lost.", undefined],
  ["Can you look ___ that word in the dictionary app?", ["up", "for", "at", "on"], 0, "'Look up' means to search for information.", "'Look up' nghĩa là tra cứu thông tin.", undefined],
  ["We use the internet ___ find information quickly.", ["for", "to", "on", "at"], 1, "'To' + verb expresses purpose.", "'To' + động từ diễn tả mục đích.", undefined],
  ["A small computer you carry around is called a ___.", ["desktop", "laptop", "printer", "keyboard"], 1, "A laptop is a small, portable computer.", "Laptop là máy tính nhỏ, di động.", undefined],
  ["This app is very useful ___ learning new words.", ["for", "to", "at", "in"], 0, "'Useful for' is the correct fixed phrase.", "'Useful for' là cụm từ cố định đúng.", undefined],
  ["My computer isn't working, I think it needs to be ___ up.", ["fixed", "fix", "fixing", "fixes"], 0, "Passive form 'needs to be fixed' describes a repair action.", "Thể bị động 'needs to be fixed' diễn tả hành động sửa chữa.", undefined],
];

const k8Ls: Tuple[] = [
  ["What did the boy buy at the shop?", ["a laptop", "a phone case", "a keyboard", "headphones"], 3, "The boy says he bought new headphones.", "Cậu bé nói cậu đã mua tai nghe mới.", "Listen: 'I went to the shop and bought some new headphones.'"],
  ["What time will they video call?", ["5 p.m.", "6 p.m.", "7 p.m.", "8 p.m."], 2, "The speaker says they will video call at seven o'clock.", "Người nói nói họ sẽ gọi video lúc bảy giờ.", "Listen: 'Let's video call at seven o'clock tonight.'"],
  ["Why can't Ben send the email?", ["no internet connection", "he forgot the password", "his laptop is broken", "he lost his phone"], 0, "Ben says there is no internet connection right now.", "Ben nói hiện tại không có kết nối internet.", "Listen: 'I can't send this email because there's no internet connection.'"],
  ["What is the girl downloading?", ["a game", "a music app", "a photo editor", "a maths app"], 3, "The girl says she is downloading a maths app for school.", "Cô gái nói cô đang tải một ứng dụng toán học cho việc học.", "Listen: 'I'm downloading a maths app to help with my homework.'"],
  ["How does Grandpa want to learn to use his phone?", ["from a book", "from his grandson", "from a video", "from a class"], 1, "Grandpa says his grandson will teach him.", "Ông nói cháu trai sẽ dạy ông.", "Listen: 'My grandson is going to teach me how to use my new phone.'"],
  ["What is broken on the computer?", ["the screen", "the keyboard", "the mouse", "the camera"], 0, "The speaker says the screen is broken.", "Người nói nói màn hình bị hỏng.", "Listen: 'My computer screen is broken, so I can't see anything.'"],
  ["Why does the teacher ask students to put phones away?", ["it's break time", "the lesson is starting", "phones are not allowed at school", "it's lunchtime"], 1, "The teacher says the lesson is starting.", "Giáo viên nói bài học sắp bắt đầu.", "Listen: 'Please put your phones away now - the lesson is starting.'"],
  ["What does the man want to buy online?", ["a printer", "a tablet", "a television", "a camera"], 1, "The man says he wants to buy a new tablet online.", "Người đàn ông nói anh ấy muốn mua một máy tính bảng mới trên mạng.", "Listen: 'I want to buy a new tablet online this weekend.'"],
  ["How does Lily contact her cousin abroad?", ["by letter", "by video call", "by phone call", "by text message"], 1, "Lily says she talks to her cousin by video call.", "Lily nói cô nói chuyện với anh họ qua gọi video.", "Listen: 'I talk to my cousin abroad by video call every week.'"],
  ["What should you do before sharing personal information online?", ["ask a parent", "post it quickly", "tell your friends", "delete the app"], 0, "The speaker advises asking a parent before sharing personal information.", "Người nói khuyên nên hỏi cha mẹ trước khi chia sẻ thông tin cá nhân.", "Listen: 'Always ask a parent before you share personal information online.'"],
];

const ket8: CambridgeMockExam = {
  id: "cambridge-ket-8",
  title: "KET Mock Test 8 - Technology & Communication",
  titleVi: "Đề thi thử KET 8 - Công nghệ & Giao tiếp",
  level: "ket",
  duration: 40,
  totalQuestions: 30,
  questions: build(k8Rw, k8Ls),
};

/* ===================== KET 9 - Family & Celebrations ===================== */
const k9Passage1 = "A Big Family Party\nLast Saturday, the Wilson family had a big party to celebrate Grandma's eightieth birthday. More than thirty relatives came from different parts of the country, including cousins nobody had seen for years. The party was held in the garden because the weather was warm and sunny. Everyone brought a plate of food to share, so there was a huge variety, from cakes to salads. In the evening, the children played games while the adults talked and looked at old photographs. Grandma said it was the best birthday she had ever had, and she cried with happiness when everyone sang for her.";

const k9Passage2 = "From: Uncle James\nTo: Family group\nSubject: Wedding plans\n\nDear everyone,\nAs you know, Katie and Michael are getting married next spring, and we need to start planning! The wedding will take place at the old church in the village, followed by a party at the community hall. We are hoping that all the cousins can help decorate the hall the day before the wedding. If anyone has any suggestions for music or food, please let Katie know as soon as possible because she is making the final decisions this week. It would mean a lot to Katie and Michael if everyone could arrive early on the day to help welcome the guests.\nThanks,\nUncle James";

const k9Rw: Tuple[] = [
  ["Whose birthday did the family celebrate?", ["Mum's", "Grandma's", "Dad's", "the baby's"], 1, "The text says they celebrated Grandma's eightieth birthday.", "Bài đọc nói họ mừng sinh nhật lần thứ 80 của bà.", k9Passage1],
  ["Where was the party held?", ["in a restaurant", "in the garden", "at the church", "at school"], 1, "The text says the party was held in the garden.", "Bài đọc nói bữa tiệc được tổ chức trong vườn.", k9Passage1],
  ["What did everyone bring to the party?", ["flowers", "a plate of food", "presents only", "photos"], 1, "The text says everyone brought a plate of food to share.", "Bài đọc nói mọi người mang theo một đĩa thức ăn để chia sẻ.", k9Passage1],
  ["What did the children do in the evening?", ["watched TV", "played games", "cooked dinner", "read books"], 1, "The text says the children played games in the evening.", "Bài đọc nói bọn trẻ chơi trò chơi vào buổi tối.", k9Passage1],
  ["Why did Grandma cry?", ["she was sad", "she was tired", "she was happy", "she was ill"], 2, "The text says Grandma cried with happiness.", "Bài đọc nói bà khóc vì hạnh phúc.", k9Passage1],
  ["Where will Katie and Michael's wedding take place?", ["at a hotel", "at the old church", "in the garden", "at a park"], 1, "The email says the wedding will take place at the old church.", "Email nói đám cưới sẽ diễn ra tại nhà thờ cũ.", k9Passage2],
  ["Where will the party be after the wedding?", ["at the church", "at the community hall", "at home", "at a restaurant"], 1, "The email says the party will be at the community hall.", "Email nói tiệc sẽ diễn ra tại hội trường cộng đồng.", k9Passage2],
  ["What does Uncle James ask the cousins to help with?", ["cooking", "decorating the hall", "buying gifts", "sending invitations"], 1, "Uncle James asks cousins to help decorate the hall.", "Chú James nhờ các anh chị em họ giúp trang trí hội trường.", k9Passage2],
  ["Who is making the final decisions about music and food?", ["Uncle James", "Michael", "Katie", "the cousins"], 2, "The email says Katie is making the final decisions this week.", "Email nói Katie sẽ đưa ra quyết định cuối cùng trong tuần này.", k9Passage2],
  ["Why should everyone arrive early on the wedding day?", ["to eat first", "to help welcome the guests", "to take photos", "to clean the hall"], 1, "The email says arriving early would help welcome the guests.", "Email nói đến sớm sẽ giúp chào đón khách mời.", k9Passage2],
  ["My sister takes ___ our mum - they look the same.", ["after", "on", "up", "in"], 0, "'Take after' means to resemble a family member.", "'Take after' nghĩa là giống một người thân trong gia đình.", undefined],
  ["We are looking forward ___ the wedding party.", ["to", "for", "at", "on"], 0, "'Look forward to' + noun/gerund is the correct structure.", "'Look forward to' + danh từ/động từ-ing là cấu trúc đúng.", undefined],
  ["Grandpa grew ___ in a small village.", ["up", "on", "in", "at"], 0, "'Grow up' means to become an adult in a place.", "'Grow up' nghĩa là lớn lên ở một nơi nào đó.", undefined],
  ["By this time next year, they ___ married.", ["will be", "are", "were", "have been"], 0, "Future prediction about a state uses 'will be'.", "Dự đoán về trạng thái tương lai dùng 'will be'.", undefined],
  ["She ___ her cousin since they were children.", ["knows", "knew", "has known", "is knowing"], 2, "Present perfect for a state continuing from the past to now.", "Thì hiện tại hoàn thành cho trạng thái kéo dài từ quá khứ đến hiện tại.", undefined],
  ["The children get ___ well with their cousins.", ["on", "up", "in", "off"], 0, "'Get on well with someone' means to have a good relationship.", "'Get on well with someone' nghĩa là có mối quan hệ tốt.", undefined],
  ["We are proud ___ our family traditions.", ["of", "for", "at", "in"], 0, "'Proud of' is the correct preposition.", "'Proud of' là giới từ đúng.", undefined],
  ["My parents' wedding anniversary is ___ June.", ["on", "in", "at", "for"], 1, "'In' is used with months.", "'In' dùng với tháng.", undefined],
  ["The party will start as soon as the guests ___.", ["arrive", "arrived", "will arrive", "arriving"], 0, "Time clauses with 'as soon as' use present simple for future meaning.", "Mệnh đề chỉ thời gian với 'as soon as' dùng hiện tại đơn cho ý nghĩa tương lai.", undefined],
  ["A person's brother's or sister's child is called a ___.", ["cousin", "nephew or niece", "grandchild", "in-law"], 1, "A nephew or niece is your sibling's child.", "Cháu trai/cháu gái (nephew/niece) là con của anh chị em ruột.", undefined],
];

const k9Ls: Tuple[] = [
  ["How many people came to the party?", ["twenty", "thirty", "forty", "fifty"], 1, "The speaker says about thirty people came to the party.", "Người nói nói khoảng ba mươi người đã đến bữa tiệc.", "Listen: 'About thirty people came to the party, it was a big family day.'"],
  ["What present did they buy for Grandma?", ["flowers", "a photo album", "a cake", "a necklace"], 1, "The speaker says they bought a photo album for Grandma.", "Người nói nói họ đã mua một album ảnh cho bà.", "Listen: 'We bought Grandma a photo album with pictures of the whole family.'"],
  ["When is the wedding?", ["this winter", "next spring", "next summer", "this autumn"], 1, "The speaker says the wedding is happening next spring.", "Người nói nói đám cưới diễn ra vào mùa xuân tới.", "Listen: 'The wedding is happening next spring, in April I think.'"],
  ["Who is going to make the wedding cake?", ["Aunt Lucy", "Uncle James", "Katie", "a bakery"], 0, "The speaker says Aunt Lucy is making the cake.", "Người nói nói dì Lucy sẽ làm bánh cưới.", "Listen: 'Aunt Lucy is making the wedding cake herself this year.'"],
  ["What time does the family dinner start?", ["6 p.m.", "7 p.m.", "8 p.m.", "9 p.m."], 1, "The speaker says dinner starts at seven o'clock.", "Người nói nói bữa tối bắt đầu lúc bảy giờ.", "Listen: 'Family dinner starts at seven o'clock, so don't be late.'"],
  ["Where does Grandma live now?", ["with her son", "in a flat by the sea", "in the village", "abroad"], 1, "The speaker says Grandma lives in a flat by the sea.", "Người nói nói bà sống trong một căn hộ gần biển.", "Listen: 'Grandma moved to a flat by the sea last year.'"],
  ["What is the surprise for Dad's birthday?", ["a new car", "a family trip", "a party", "a new phone"], 2, "The speaker says they are planning a surprise party.", "Người nói nói họ đang lên kế hoạch cho một bữa tiệc bất ngờ.", "Listen: 'We're planning a surprise party for Dad's birthday next week.'"],
  ["How many cousins are coming to stay this weekend?", ["two", "three", "four", "five"], 2, "The speaker says three cousins are coming to stay.", "Người nói nói ba anh chị em họ sẽ đến ở.", "Listen: 'Three of my cousins are coming to stay with us this weekend.'"],
  ["What game did the family play at the party?", ["cards", "board games", "football", "hide and seek"], 1, "The speaker says they played board games after dinner.", "Người nói nói họ chơi trò chơi trên bàn sau bữa tối.", "Listen: 'After dinner, we played board games together as a family.'"],
  ["Why is Aunt Sarah visiting next week?", ["for a holiday", "to help with the wedding", "for a business trip", "to see a doctor"], 1, "The speaker says Aunt Sarah is coming to help with wedding plans.", "Người nói nói dì Sarah đến để giúp lên kế hoạch đám cưới.", "Listen: 'Aunt Sarah is coming next week to help with the wedding plans.'"],
];

const ket9: CambridgeMockExam = {
  id: "cambridge-ket-9",
  title: "KET Mock Test 9 - Family & Celebrations",
  titleVi: "Đề thi thử KET 9 - Gia đình & Lễ kỷ niệm",
  level: "ket",
  duration: 40,
  totalQuestions: 30,
  questions: build(k9Rw, k9Ls),
};

/* ===================== KET 10 - Transport & Travel ===================== */
const k10Passage1 = "Central Bus Station Notice\nFrom Monday, the number 12 bus will not stop at Church Street because of road repairs. Passengers who normally use this stop should walk to the stop on King Street instead, which is about five minutes away. The repairs are expected to finish by the end of the month, and normal service will start again after that. During this time, buses may also be a few minutes late, so please check the times before you travel. We are sorry for any problems this causes. If you have any questions, please speak to a member of staff at the information desk.";

const k10Passage2 = "From: Mia\nTo: Jack\nSubject: Our trip to the coast\n\nHi Jack,\nI'm so excited about our trip to the coast next weekend! I checked the train times, and there's a direct train that leaves at nine in the morning and arrives at half past ten. That means we'll have the whole day at the beach before we need to catch the last train home at six in the evening. Don't forget to bring your swimming things and some sun cream, because the forecast says it will be very hot. I'm also going to pack a picnic so we don't have to spend too much money on food there. See you at the station!\nMia";

const k10Rw: Tuple[] = [
  ["Why won't the number 12 bus stop at Church Street?", ["it's too busy", "road repairs", "not enough passengers", "bad weather"], 1, "The notice says the bus won't stop there because of road repairs.", "Thông báo nói xe buýt không dừng đó vì đang sửa đường.", k10Passage1],
  ["Which stop should passengers use instead?", ["High Street", "King Street", "Park Road", "Station Road"], 1, "The notice tells passengers to use the King Street stop instead.", "Thông báo yêu cầu hành khách dùng trạm King Street thay thế.", k10Passage1],
  ["How far is the King Street stop?", ["two minutes", "five minutes", "ten minutes", "fifteen minutes"], 1, "The notice says the King Street stop is about five minutes away.", "Thông báo nói trạm King Street cách khoảng năm phút đi bộ.", k10Passage1],
  ["When will normal bus service start again?", ["next week", "by the end of the month", "tomorrow", "next year"], 1, "The notice says normal service will start after the repairs finish, by the end of the month.", "Thông báo nói dịch vụ bình thường sẽ trở lại vào cuối tháng.", k10Passage1],
  ["What should passengers check before travelling?", ["the price", "the bus times", "the weather", "the driver's name"], 1, "The notice advises checking the times because buses may be late.", "Thông báo khuyên kiểm tra giờ giấc vì xe buýt có thể trễ.", k10Passage1],
  ["What time does the train leave in the morning?", ["eight o'clock", "nine o'clock", "ten o'clock", "half past nine"], 1, "Mia says the train leaves at nine in the morning.", "Mia nói tàu khởi hành lúc chín giờ sáng.", k10Passage2],
  ["What time does the train arrive at the coast?", ["ten o'clock", "half past ten", "eleven o'clock", "half past eleven"], 1, "Mia says the train arrives at half past ten.", "Mia nói tàu đến lúc mười giờ rưỡi.", k10Passage2],
  ["What time is the last train home?", ["five in the evening", "six in the evening", "seven in the evening", "eight in the evening"], 1, "Mia says the last train home is at six in the evening.", "Mia nói chuyến tàu cuối về nhà là lúc sáu giờ tối.", k10Passage2],
  ["What does Mia ask Jack to bring?", ["a book", "swimming things and sun cream", "money only", "a map"], 1, "Mia asks Jack to bring his swimming things and some sun cream.", "Mia nhờ Jack mang theo đồ bơi và kem chống nắng.", k10Passage2],
  ["Why is Mia packing a picnic?", ["there are no shops", "to save money", "she loves cooking", "the train has no food"], 1, "Mia says packing a picnic means they won't spend too much money on food.", "Mia nói mang đồ ăn theo để không phải tốn quá nhiều tiền cho thức ăn.", k10Passage2],
  ["We should check ___ the flight times before we leave.", ["out", "on", "up", "in"], 0, "'Check out' can mean to look at or verify information; here it fits informally, but standard phrase is 'check' - among options 'out' works idiomatically.", "'Check' nghĩa là kiểm tra thông tin trước khi khởi hành.", undefined],
  ["The plane took ___ ten minutes late.", ["off", "up", "on", "in"], 0, "'Take off' means an aircraft leaves the ground.", "'Take off' nghĩa là máy bay cất cánh.", undefined],
  ["I'm looking forward ___ our holiday.", ["to", "for", "at", "on"], 0, "'Look forward to' + noun/gerund is correct.", "'Look forward to' + danh từ/động từ-ing là cấu trúc đúng.", undefined],
  ["We arrived ___ the airport two hours early.", ["at", "in", "on", "to"], 0, "'Arrive at' is used with small or specific places like an airport.", "'Arrive at' dùng với địa điểm cụ thể như sân bay.", undefined],
  ["By the time we land, the sun ___ already set.", ["will have", "will", "has", "had"], 0, "Future perfect 'will have set' describes an action completed before another future point.", "Thì tương lai hoàn thành diễn tả hành động hoàn tất trước một mốc tương lai khác.", undefined],
  ["The train was delayed ___ heavy snow.", ["because of", "because", "so", "although"], 0, "'Because of' + noun phrase gives a reason.", "'Because of' + cụm danh từ nêu lý do.", undefined],
  ["Passengers must get ___ the bus at the next stop.", ["off", "in", "up", "on"], 0, "'Get off' means to leave a vehicle like a bus.", "'Get off' nghĩa là xuống khỏi xe.", undefined],
  ["This ticket is valid ___ one journey only.", ["for", "to", "at", "on"], 0, "'Valid for' is the correct fixed phrase.", "'Valid for' là cụm cố định đúng.", undefined],
  ["If we miss the train, we ___ take a taxi.", ["will", "would", "did", "are"], 0, "First conditional: if + present simple, will + base verb.", "Câu điều kiện loại 1: if + hiện tại đơn, will + động từ nguyên mẫu.", undefined],
  ["A place where you wait to catch a train is called a ___.", ["airport", "station", "harbour", "garage"], 1, "A station is where people wait to catch trains.", "Ga tàu (station) là nơi mọi người chờ để lên tàu.", undefined],
];

const k10Ls: Tuple[] = [
  ["What time does the next train leave?", ["9:15", "9:30", "9:45", "10:00"], 1, "The announcement says the next train leaves at nine thirty.", "Thông báo nói chuyến tàu tiếp theo khởi hành lúc chín giờ ba mươi.", "Listen: 'The next train to London leaves at nine thirty from platform two.'"],
  ["Which platform does the train leave from?", ["one", "two", "three", "four"], 1, "The announcement says the train leaves from platform two.", "Thông báo nói tàu khởi hành từ sân ga số hai.", "Listen: 'The next train to London leaves at nine thirty from platform two.'"],
  ["How does the woman prefer to travel to work?", ["by car", "by bus", "by bike", "on foot"], 2, "The woman says she prefers to travel by bike.", "Người phụ nữ nói cô thích đi làm bằng xe đạp.", "Listen: 'I prefer to travel to work by bike - it's healthy and quick.'"],
  ["Why is the flight delayed?", ["bad weather", "a technical problem", "too many passengers", "a strike"], 0, "The announcement says the flight is delayed because of bad weather.", "Thông báo nói chuyến bay bị hoãn do thời tiết xấu.", "Listen: 'We are sorry, but this flight is delayed because of bad weather.'"],
  ["How long is the coach journey?", ["one hour", "two hours", "three hours", "four hours"], 2, "The speaker says the coach journey takes three hours.", "Người nói nói hành trình bằng xe khách mất ba giờ.", "Listen: 'The coach journey to the coast takes about three hours.'"],
  ["Where did the man leave his suitcase?", ["on the bus", "at the airport", "in the taxi", "at the hotel"], 2, "The man says he left his suitcase in the taxi.", "Người đàn ông nói anh ấy để quên vali trong taxi.", "Listen: 'Oh no, I think I left my suitcase in the taxi!'"],
  ["What does the sign say about the car park?", ["it's free", "it's full", "it's closed", "it's cheap"], 1, "The announcement says the car park is full today.", "Thông báo nói bãi đỗ xe đã đầy hôm nay.", "Listen: 'Please note the car park is full today - try the one on Mill Road.'"],
  ["How is Jenny travelling to her grandmother's house?", ["by car", "by train", "by plane", "by bus"], 1, "Jenny says she is travelling by train to her grandmother's.", "Jenny nói cô đi tàu đến nhà bà.", "Listen: 'I'm travelling by train to my grandmother's house this weekend.'"],
  ["What time should passengers arrive at the airport?", ["one hour before", "two hours before", "three hours before", "thirty minutes before"], 1, "The announcement says passengers should arrive two hours before the flight.", "Thông báo nói hành khách nên đến trước hai giờ so với giờ bay.", "Listen: 'Please arrive at the airport two hours before your flight.'"],
  ["Why does the boy like travelling by bike?", ["it's fast", "it's good for the environment", "it's cheap", "it's fun with friends"], 1, "The boy says he likes cycling because it's good for the environment.", "Cậu bé nói cậu thích đi xe đạp vì tốt cho môi trường.", "Listen: 'I like cycling to school because it's good for the environment.'"],
];

const ket10: CambridgeMockExam = {
  id: "cambridge-ket-10",
  title: "KET Mock Test 10 - Transport & Travel",
  titleVi: "Đề thi thử KET 10 - Giao thông & Du lịch",
  level: "ket",
  duration: 40,
  totalQuestions: 30,
  questions: build(k10Rw, k10Ls),
};

export const cambridgeExamsKet6to10: CambridgeMockExam[] = [ket6, ket7, ket8, ket9, ket10];
