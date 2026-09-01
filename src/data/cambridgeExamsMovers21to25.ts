/**
 * @file cambridgeExamsMovers21to25.ts
 * @description Five Cambridge Movers (A1) mock exams, tests 21 to 25.
 *              Themes: Holidays & Travel, Jobs People Do, Health & The Body,
 *              Shopping & Money, Nature & Weather. Each paper has 15 Reading &
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

/* ================== MOVERS 21 - Holidays & Travel ================== */
const m21pA =
  "Last summer my family went to the mountains for five days. We travelled by train because the roads were busy. Our small hotel was near a river. Every morning we walked in the forest and looked for birds. On the last day it rained, so we played card games inside.";
const m21pB =
  "My cousin Mai went to the seaside with her school. They stayed in a big house with twelve other children. Mai learned to swim in the sea and she found a beautiful shell on the sand. She wants to go again next year.";

const m21Rw: Tuple[] = [
  ["How long was the holiday?", ["Three days", "Four days", "Five days", "A week"], 2, "The family went to the mountains for five days.", "Gia đình đi núi trong năm ngày.", m21pA],
  ["How did they travel?", ["By car", "By train", "By plane", "By bus"], 1, "They travelled by train because the roads were busy.", "Họ đi tàu vì đường đông xe.", m21pA],
  ["Where was the hotel?", ["Near a river", "In a city", "On a hill", "Next to a lake"], 0, "The small hotel was near a river.", "Khách sạn nhỏ nằm gần một con sông.", m21pA],
  ["What did they do every morning?", ["Swam", "Walked in the forest", "Went shopping", "Watched TV"], 1, "Every morning they walked in the forest.", "Mỗi sáng họ đi bộ trong rừng.", m21pA],
  ["Why did they play card games?", ["They were tired", "It rained", "The forest was closed", "It was too hot"], 1, "It rained on the last day, so they played inside.", "Ngày cuối trời mưa nên họ chơi trong nhà.", m21pA],
  ["Who did Mai go with?", ["Her family", "Her school", "Her cousins", "Her neighbours"], 1, "Mai went to the seaside with her school.", "Mai đi biển cùng trường.", m21pB],
  ["How many other children stayed with her?", ["Ten", "Eleven", "Twelve", "Twenty"], 2, "She stayed with twelve other children.", "Bạn ấy ở cùng mười hai bạn khác.", m21pB],
  ["What did Mai learn?", ["To cook", "To swim", "To sail", "To fish"], 1, "Mai learned to swim in the sea.", "Mai học bơi ở biển.", m21pB],
  ["What did she find?", ["A shell", "A coin", "A key", "A ring"], 0, "She found a beautiful shell on the sand.", "Bạn ấy tìm thấy một chiếc vỏ sò đẹp trên cát.", m21pB],
  ["How does Mai feel about the trip?", ["She did not enjoy it", "She wants to go again", "She was bored", "She was afraid"], 1, "She wants to go again next year, so she enjoyed it.", "Bạn ấy muốn đi lại năm sau, tức là rất thích.", m21pB],
  ["We buy a ___ before we get on the train.", ["ticket", "kitchen", "picture", "pocket"], 0, "You need a ticket to travel by train.", "Cần mua vé để đi tàu.", undefined],
  ["Last year we ___ to Hue by bus.", ["go", "goes", "went", "going"], 2, "'Last year' needs the past simple 'went'.", "'Last year' nên dùng quá khứ đơn 'went'.", undefined],
  ["We put our clothes in a ___ before a trip.", ["suitcase", "bookcase", "staircase", "pencil case"], 0, "Clothes for a trip go in a suitcase.", "Quần áo đi chơi được để trong va li.", undefined],
  ["The plane leaves ___ seven o'clock.", ["in", "on", "at", "of"], 2, "We use 'at' with clock times.", "Dùng 'at' với giờ đồng hồ.", undefined],
  ["A person who shows tourists a city is a ___.", ["guide", "guard", "driver", "waiter"], 0, "A guide shows tourists around.", "Hướng dẫn viên dẫn khách tham quan.", undefined],
];

const m21Ls: Tuple[] = [
  ["Where did the boy go last weekend?", ["To the zoo", "To the mountains", "To the beach", "To the museum"], 2, "He went to the beach with his family.", "Cậu ấy đi biển cùng gia đình.", "Boy: 'Last weekend we drove to the beach and stayed two nights.'"],
  ["How did the girl travel?", ["By boat", "By plane", "By train", "By car"], 1, "She travelled by plane.", "Bạn ấy đi bằng máy bay.", "Girl: 'We took a plane because the city is very far.'"],
  ["What was the weather like?", ["Rainy", "Sunny", "Snowy", "Windy"], 1, "The weather was sunny all week.", "Trời nắng suốt tuần.", "Woman: 'We were lucky - it was sunny every single day.'"],
  ["What did they eat?", ["Fish", "Pizza", "Noodles", "Chicken"], 0, "They ate fresh fish.", "Họ ăn cá tươi.", "Man: 'Every evening we ate fresh fish from the market.'"],
  ["How many photos did the boy take?", ["Twenty", "Forty", "Fifty", "Sixty"], 2, "He took fifty photos.", "Cậu ấy chụp năm mươi tấm ảnh.", "Boy: 'I took about fifty photos with my mum's camera.'"],
  ["What did the girl forget?", ["Her hat", "Her towel", "Her camera", "Her shoes"], 1, "She forgot her towel.", "Bạn ấy quên mang khăn tắm.", "Girl: 'I packed everything but I forgot my towel!'"],
  ["Who stayed at home?", ["Grandma", "Dad", "The brother", "The dog"], 0, "Grandma stayed at home.", "Bà ở nhà.", "Woman: 'Grandma stayed at home because the trip was long.'"],
  ["What time did the bus leave?", ["At six", "At seven", "At eight", "At nine"], 1, "The bus left at seven.", "Xe buýt khởi hành lúc bảy giờ.", "Man: 'Our bus left the station at seven in the morning.'"],
  ["What did they buy?", ["A map", "A hat", "A postcard", "A book"], 2, "They bought a postcard.", "Họ mua một tấm bưu thiếp.", "Girl: 'I bought a postcard to send to my best friend.'"],
  ["How long was the journey?", ["Two hours", "Three hours", "Four hours", "Five hours"], 2, "The journey took four hours.", "Chuyến đi mất bốn tiếng.", "Boy: 'The journey took four hours, so I slept on the way.'"],
];

const movers21: CambridgeMockExam = {
  id: "cambridge-movers-21",
  title: "Movers Mock Test 21 - Holidays & Travel",
  titleVi: "Đề thi thử Movers 21 - Kỳ nghỉ & Du lịch",
  level: "movers",
  duration: 25,
  totalQuestions: 25,
  questions: build(m21Rw, m21Ls),
};

/* ================== MOVERS 22 - Jobs People Do ================== */
const m22pA =
  "My aunt is a nurse. She works at the hospital in our town. She starts work very early, at six o'clock, and she helps sick people all day. She wears a blue uniform. She says the best part of her job is when a child leaves the hospital smiling.";
const m22pB =
  "Mr Long is our school cook. He makes lunch for two hundred children every day. He arrives at seven and cuts vegetables for two hours. His favourite meal to cook is chicken with rice. On Fridays he makes a fruit salad for everybody.";

const m22Rw: Tuple[] = [
  ["What is the aunt's job?", ["A teacher", "A nurse", "A doctor", "A driver"], 1, "The aunt is a nurse.", "Cô/dì làm y tá.", m22pA],
  ["Where does she work?", ["At a school", "At a hospital", "At a shop", "At a farm"], 1, "She works at the hospital in the town.", "Cô ấy làm ở bệnh viện trong thị trấn.", m22pA],
  ["What time does she start?", ["At five", "At six", "At seven", "At eight"], 1, "She starts work at six o'clock.", "Cô ấy bắt đầu làm lúc sáu giờ.", m22pA],
  ["What colour is her uniform?", ["White", "Green", "Blue", "Grey"], 2, "She wears a blue uniform.", "Cô ấy mặc đồng phục màu xanh dương.", m22pA],
  ["What does she like best about her job?", ["The money", "The uniform", "Happy children going home", "The early start"], 2, "She likes it when a child leaves smiling.", "Cô thích nhất khi một em bé xuất viện với nụ cười.", m22pA],
  ["What is Mr Long's job?", ["A cook", "A cleaner", "A driver", "A guard"], 0, "Mr Long is the school cook.", "Ông Long là đầu bếp của trường.", m22pB],
  ["How many children does he cook for?", ["One hundred", "Two hundred", "Three hundred", "Twenty"], 1, "He makes lunch for two hundred children.", "Ông nấu bữa trưa cho hai trăm học sinh.", m22pB],
  ["What does he do for two hours?", ["Wash plates", "Cut vegetables", "Cook rice", "Clean the floor"], 1, "He cuts vegetables for two hours.", "Ông cắt rau trong hai tiếng.", m22pB],
  ["What is his favourite meal to cook?", ["Fish soup", "Chicken with rice", "Noodles", "Beef and beans"], 1, "His favourite meal to cook is chicken with rice.", "Món ông thích nấu nhất là gà với cơm.", m22pB],
  ["What happens on Fridays?", ["He works late", "He makes fruit salad", "He stays at home", "He teaches cooking"], 1, "On Fridays he makes a fruit salad.", "Thứ Sáu ông làm món salad trái cây.", m22pB],
  ["A ___ takes people to hospital quickly.", ["ambulance driver", "farmer", "singer", "painter"], 0, "An ambulance driver takes patients to hospital.", "Tài xế xe cứu thương đưa bệnh nhân đến bệnh viện.", undefined],
  ["A person who mends broken cars is a ___.", ["mechanic", "musician", "manager", "model"], 0, "A mechanic repairs cars.", "Thợ máy sửa xe ô tô.", undefined],
  ["My father ___ in an office every day.", ["work", "works", "working", "worked tomorrow"], 1, "'My father' is singular, so we use 'works'.", "'My father' số ít nên dùng 'works'.", undefined],
  ["Firefighters help when there is a ___.", ["fire", "party", "test", "film"], 0, "Firefighters put out fires.", "Lính cứu hỏa dập lửa.", undefined],
  ["When I grow up I ___ to be a scientist.", ["want", "wants", "wanting", "wanted next year"], 0, "With 'I' the present simple is 'want'.", "Với 'I' thì hiện tại đơn là 'want'.", undefined],
];

const m22Ls: Tuple[] = [
  ["What does the girl's mother do?", ["She is a teacher", "She is a dentist", "She is a pilot", "She is a farmer"], 1, "Her mother is a dentist.", "Mẹ bạn ấy là nha sĩ.", "Girl: 'My mum is a dentist. She looks after people's teeth.'"],
  ["Where does the man work?", ["In a bank", "In a library", "In a shop", "In a garage"], 3, "He works in a garage.", "Ông ấy làm ở gara sửa xe.", "Man: 'I work in a garage and repair engines all day.'"],
  ["What time does the baker start?", ["At three", "At four", "At five", "At six"], 1, "The baker starts at four.", "Người thợ làm bánh bắt đầu lúc bốn giờ.", "Woman: 'The baker starts at four so the bread is ready early.'"],
  ["What does the boy want to be?", ["A pilot", "A vet", "A police officer", "A chef"], 1, "He wants to be a vet.", "Cậu ấy muốn làm bác sĩ thú y.", "Boy: 'I want to be a vet because I love animals.'"],
  ["Who works at night?", ["The nurse", "The teacher", "The postman", "The gardener"], 0, "The nurse works at night.", "Y tá làm việc ban đêm.", "Man: 'My sister is a nurse and she often works at night.'"],
  ["What does the postman carry?", ["Letters", "Bread", "Medicine", "Tools"], 0, "The postman carries letters.", "Người đưa thư mang thư từ.", "Woman: 'The postman carries letters to every house on our street.'"],
  ["How many people work in the shop?", ["Three", "Four", "Five", "Six"], 2, "Five people work in the shop.", "Có năm người làm trong cửa hàng.", "Man: 'There are five of us working in the shop today.'"],
  ["What does the girl's uncle grow?", ["Rice", "Coffee", "Tea", "Corn"], 1, "Her uncle grows coffee.", "Chú của bạn ấy trồng cà phê.", "Girl: 'My uncle is a farmer and he grows coffee.'"],
  ["Where does the pilot fly today?", ["To Hanoi", "To Tokyo", "To Paris", "To Sydney"], 2, "The pilot flies to Paris.", "Phi công bay đến Paris.", "Woman: 'Today the pilot is flying to Paris and back.'"],
  ["What does the teacher need?", ["Chalk", "A map", "New books", "A computer"], 2, "The teacher needs new books.", "Cô giáo cần sách mới.", "Man: 'Our teacher says she needs new books for the class.'"],
];

const movers22: CambridgeMockExam = {
  id: "cambridge-movers-22",
  title: "Movers Mock Test 22 - Jobs People Do",
  titleVi: "Đề thi thử Movers 22 - Nghề nghiệp",
  level: "movers",
  duration: 25,
  totalQuestions: 25,
  questions: build(m22Rw, m22Ls),
};

/* ================== MOVERS 23 - Health & The Body ================== */
const m23pA =
  "Yesterday Nam did not go to school. He had a headache and a sore throat, so his mother took him to the doctor. The doctor listened to his chest and said Nam had a cold. He must drink a lot of water and sleep. Today Nam feels much better.";
const m23pB =
  "Our teacher tells us three rules for a healthy body. First, eat fruit and vegetables every day. Second, run or play outside for one hour. Third, sleep nine hours at night. She says children who sleep well remember more in class.";

const m23Rw: Tuple[] = [
  ["Why did Nam stay at home?", ["He was lazy", "He was ill", "It was a holiday", "The school was closed"], 1, "He had a headache and a sore throat.", "Cậu ấy bị đau đầu và đau họng.", m23pA],
  ["Who took Nam to the doctor?", ["His father", "His mother", "His teacher", "His sister"], 1, "His mother took him to the doctor.", "Mẹ đưa cậu ấy đi khám.", m23pA],
  ["What did the doctor do?", ["Listened to his chest", "Looked at his foot", "Gave him a plaster", "Cut his hair"], 0, "The doctor listened to his chest.", "Bác sĩ nghe ngực cậu ấy.", m23pA],
  ["What did the doctor say Nam had?", ["A broken arm", "A cold", "Toothache", "Earache"], 1, "The doctor said Nam had a cold.", "Bác sĩ nói Nam bị cảm.", m23pA],
  ["How does Nam feel today?", ["Worse", "The same", "Much better", "Very tired"], 2, "Today Nam feels much better.", "Hôm nay Nam thấy khỏe hơn nhiều.", m23pA],
  ["How many rules does the teacher give?", ["Two", "Three", "Four", "Five"], 1, "She gives three rules.", "Cô giáo đưa ra ba quy tắc.", m23pB],
  ["What is the first rule?", ["Sleep more", "Eat fruit and vegetables", "Drink milk", "Run fast"], 1, "The first rule is to eat fruit and vegetables.", "Quy tắc đầu là ăn trái cây và rau.", m23pB],
  ["How long should children play outside?", ["Half an hour", "One hour", "Two hours", "Three hours"], 1, "They should run or play outside for one hour.", "Nên chơi ngoài trời một tiếng.", m23pB],
  ["How many hours of sleep are best?", ["Seven", "Eight", "Nine", "Ten"], 2, "The teacher says nine hours.", "Cô giáo nói chín tiếng.", m23pB],
  ["What happens to children who sleep well?", ["They grow taller", "They remember more", "They eat less", "They run faster"], 1, "They remember more in class.", "Các bạn nhớ bài tốt hơn.", m23pB],
  ["We see with our ___.", ["eyes", "ears", "knees", "fingers"], 0, "We see with our eyes.", "Chúng ta nhìn bằng mắt.", undefined],
  ["My tooth hurts. I must go to the ___.", ["dentist", "farmer", "pilot", "artist"], 0, "A dentist looks after teeth.", "Nha sĩ chăm sóc răng.", undefined],
  ["She ___ got a temperature, so she is in bed.", ["have", "has", "having", "is have"], 1, "'She' takes 'has'.", "Với 'she' dùng 'has'.", undefined],
  ["We wash our hands ___ we eat.", ["before", "behind", "under", "between"], 0, "We wash our hands before eating.", "Chúng ta rửa tay trước khi ăn.", undefined],
  ["Which one is good for you?", ["Fresh fruit", "Lots of sweets", "Fizzy drinks", "Cakes every meal"], 0, "Fresh fruit is healthy food.", "Trái cây tươi là thức ăn lành mạnh.", undefined],
];

const m23Ls: Tuple[] = [
  ["What is wrong with the girl?", ["A headache", "Toothache", "Earache", "A cough"], 3, "She has a cough.", "Bạn ấy bị ho.", "Girl: 'I have got a bad cough, so I cannot sing today.'"],
  ["What must the boy drink?", ["Coffee", "Warm water", "Cold juice", "Milk shake"], 1, "He must drink warm water.", "Cậu ấy phải uống nước ấm.", "Woman: 'Drink warm water, please, not cold juice.'"],
  ["Which part of the body hurts?", ["The leg", "The arm", "The back", "The hand"], 0, "His leg hurts.", "Chân cậu ấy bị đau.", "Boy: 'I fell off my bike and now my leg hurts.'"],
  ["When is the doctor's appointment?", ["At two", "At three", "At four", "At five"], 1, "The appointment is at three.", "Cuộc hẹn lúc ba giờ.", "Man: 'Your appointment with the doctor is at three o'clock.'"],
  ["How long must the girl rest?", ["One day", "Two days", "Three days", "A week"], 1, "She must rest for two days.", "Bạn ấy phải nghỉ hai ngày.", "Woman: 'Stay at home and rest for two days.'"],
  ["What sport does the boy do?", ["Swimming", "Running", "Cycling", "Tennis"], 0, "He goes swimming.", "Cậu ấy đi bơi.", "Boy: 'I go swimming twice a week to stay strong.'"],
  ["What did the girl eat for breakfast?", ["Cake", "Fruit and yoghurt", "Chips", "Nothing"], 1, "She ate fruit and yoghurt.", "Bạn ấy ăn trái cây và sữa chua.", "Girl: 'For breakfast I had fruit with yoghurt.'"],
  ["Who has a temperature?", ["Tom", "Lan", "The baby", "Grandpa"], 2, "The baby has a temperature.", "Em bé bị sốt.", "Woman: 'The baby has a temperature, so we are staying in.'"],
  ["What should you do before bed?", ["Watch TV", "Brush your teeth", "Eat sweets", "Run outside"], 1, "You should brush your teeth.", "Bạn nên đánh răng.", "Man: 'Always brush your teeth before you go to bed.'"],
  ["How many glasses of water does the teacher want?", ["Four", "Five", "Six", "Eight"], 3, "She wants eight glasses a day.", "Cô giáo khuyên tám ly mỗi ngày.", "Woman: 'Try to drink eight glasses of water every day.'"],
];

const movers23: CambridgeMockExam = {
  id: "cambridge-movers-23",
  title: "Movers Mock Test 23 - Health & The Body",
  titleVi: "Đề thi thử Movers 23 - Sức khỏe & Cơ thể",
  level: "movers",
  duration: 25,
  totalQuestions: 25,
  questions: build(m23Rw, m23Ls),
};

/* ================== MOVERS 24 - Shopping & Money ================== */
const m24pA =
  "On Saturday morning Linh and her father go to the market. They buy fish, rice and a bag of oranges. The oranges cost thirty thousand dong. Linh carries the lightest bag. Before they go home her father buys her a small bunch of yellow flowers.";
const m24pB =
  "There is a new bookshop near our school. It opens at nine and closes at eight. Books for children are on the second floor. Last week I saved my pocket money and bought a book about volcanoes. It cost more than I expected, so now I must save again.";

const m24Rw: Tuple[] = [
  ["When do Linh and her father go to the market?", ["Friday evening", "Saturday morning", "Sunday morning", "Monday"], 1, "They go on Saturday morning.", "Họ đi chợ sáng thứ Bảy.", m24pA],
  ["What do they buy?", ["Fish, rice and oranges", "Bread and milk", "Meat and eggs", "Only fruit"], 0, "They buy fish, rice and a bag of oranges.", "Họ mua cá, gạo và một túi cam.", m24pA],
  ["How much do the oranges cost?", ["Twenty thousand", "Thirty thousand", "Forty thousand", "Fifty thousand"], 1, "The oranges cost thirty thousand dong.", "Túi cam giá ba mươi nghìn đồng.", m24pA],
  ["Which bag does Linh carry?", ["The heaviest", "The lightest", "All of them", "None"], 1, "Linh carries the lightest bag.", "Linh xách túi nhẹ nhất.", m24pA],
  ["What does her father buy at the end?", ["A cake", "Yellow flowers", "A toy", "A book"], 1, "He buys her a small bunch of yellow flowers.", "Bố mua cho bạn ấy một bó hoa vàng nhỏ.", m24pA],
  ["What time does the bookshop open?", ["At eight", "At nine", "At ten", "At eleven"], 1, "It opens at nine.", "Cửa hàng mở lúc chín giờ.", m24pB],
  ["Where are the children's books?", ["Ground floor", "First floor", "Second floor", "Third floor"], 2, "They are on the second floor.", "Sách thiếu nhi ở tầng hai.", m24pB],
  ["How did the writer pay for the book?", ["With pocket money", "With a card", "A gift from mum", "It was free"], 0, "The writer saved pocket money.", "Bạn ấy dành dụm tiền tiêu vặt.", m24pB],
  ["What is the book about?", ["Animals", "Volcanoes", "Space", "Football"], 1, "The book is about volcanoes.", "Cuốn sách nói về núi lửa.", m24pB],
  ["Why must the writer save again?", ["The book was expensive", "The shop closed", "The book was lost", "It was a present"], 0, "The book cost more than expected.", "Cuốn sách đắt hơn dự tính.", m24pB],
  ["We pay for things with ___.", ["money", "water", "paper clips", "leaves"], 0, "We pay with money.", "Chúng ta trả bằng tiền.", undefined],
  ["How ___ is this pencil case?", ["many", "much", "long", "old"], 1, "We ask about price with 'how much'.", "Hỏi giá dùng 'how much'.", undefined],
  ["The shop assistant gave me my ___ after I paid.", ["change", "chance", "choice", "chair"], 0, "Money you get back is your change.", "Tiền thối lại gọi là 'change'.", undefined],
  ["This shirt is ___ than that one.", ["cheap", "cheaper", "cheapest", "more cheap"], 1, "'Than' needs the comparative 'cheaper'.", "Có 'than' nên dùng 'cheaper'.", undefined],
  ["Where do you buy medicine?", ["At a chemist's", "At a bakery", "At a bank", "At a garage"], 0, "You buy medicine at a chemist's.", "Bạn mua thuốc ở hiệu thuốc.", undefined],
];

const m24Ls: Tuple[] = [
  ["What does the woman buy?", ["Bread", "Cheese", "Apples", "Milk"], 2, "She buys apples.", "Cô ấy mua táo.", "Woman: 'Can I have a kilo of apples, please?'"],
  ["How much is the T-shirt?", ["Fifty", "Sixty", "Seventy", "Eighty"], 1, "The T-shirt costs sixty.", "Áo phông giá sáu mươi.", "Man: 'This T-shirt is sixty, and the blue one is eighty.'"],
  ["Where is the supermarket?", ["Next to the park", "Behind the school", "Opposite the bank", "Near the station"], 2, "It is opposite the bank.", "Siêu thị đối diện ngân hàng.", "Girl: 'The supermarket is opposite the bank.'"],
  ["What did the boy forget to buy?", ["Sugar", "Salt", "Rice", "Eggs"], 3, "He forgot the eggs.", "Cậu ấy quên mua trứng.", "Boy: 'Oh no, I forgot the eggs again!'"],
  ["How much money has the girl got?", ["Ten", "Fifteen", "Twenty", "Twenty-five"], 2, "She has twenty.", "Bạn ấy có hai mươi.", "Girl: 'I have got twenty in my purse.'"],
  ["What time does the market close?", ["At four", "At five", "At six", "At seven"], 2, "The market closes at six.", "Chợ đóng cửa lúc sáu giờ.", "Man: 'The market closes at six, so we must hurry.'"],
  ["What is on the shopping list?", ["Fruit and bread", "Toys", "Books", "Clothes"], 0, "Fruit and bread are on the list.", "Danh sách gồm trái cây và bánh mì.", "Woman: 'On the list we have fruit and bread.'"],
  ["Who pays for the ice cream?", ["The boy", "The girl", "Dad", "Grandma"], 3, "Grandma pays for the ice cream.", "Bà trả tiền kem.", "Boy: 'Grandma paid for our ice cream. Thank you, Grandma!'"],
  ["Which floor sells shoes?", ["The first", "The second", "The third", "The ground floor"], 2, "Shoes are on the third floor.", "Giày dép ở tầng ba.", "Woman: 'Shoes are on the third floor, next to the sports things.'"],
  ["What does the girl save money for?", ["A bike", "A phone", "A camera", "A guitar"], 0, "She is saving for a bike.", "Bạn ấy tiết kiệm để mua xe đạp.", "Girl: 'I am saving all my money for a new bike.'"],
];

const movers24: CambridgeMockExam = {
  id: "cambridge-movers-24",
  title: "Movers Mock Test 24 - Shopping & Money",
  titleVi: "Đề thi thử Movers 24 - Mua sắm & Tiền bạc",
  level: "movers",
  duration: 25,
  totalQuestions: 25,
  questions: build(m24Rw, m24Ls),
};

/* ================== MOVERS 25 - Nature & Weather ================== */
const m25pA =
  "In our village the weather changes a lot. In spring there is warm rain and the rice fields turn bright green. Summer is very hot, so people work early and rest at noon. In autumn the wind is strong and in winter we wear thick jackets in the morning.";
const m25pB =
  "Behind the village there is a small forest. Many kinds of birds live there and in April we can see butterflies everywhere. Last month our class planted twenty young trees near the path. Our teacher says the trees will give shade in ten years.";

const m25Rw: Tuple[] = [
  ["What is the weather like in spring?", ["Cold and dry", "Warm with rain", "Snowy", "Very windy"], 1, "In spring there is warm rain.", "Mùa xuân có mưa ấm.", m25pA],
  ["What colour are the rice fields in spring?", ["Yellow", "Brown", "Bright green", "Grey"], 2, "The fields turn bright green.", "Những cánh đồng lúa xanh mướt.", m25pA],
  ["Why do people work early in summer?", ["It is very hot at noon", "It rains", "The market opens early", "School starts early"], 0, "Summer is very hot, so they rest at noon.", "Mùa hè rất nóng nên họ nghỉ buổi trưa.", m25pA],
  ["What is autumn like?", ["Wet", "Windy", "Snowy", "Hot"], 1, "In autumn the wind is strong.", "Mùa thu gió mạnh.", m25pA],
  ["What do people wear in winter?", ["Shorts", "Thick jackets", "Sandals", "Swimsuits"], 1, "They wear thick jackets in the morning.", "Buổi sáng họ mặc áo khoác dày.", m25pA],
  ["What is behind the village?", ["A lake", "A small forest", "A city", "A factory"], 1, "There is a small forest behind the village.", "Phía sau làng có một khu rừng nhỏ.", m25pB],
  ["What can you see in April?", ["Snow", "Butterflies", "Ice", "Storms"], 1, "In April there are butterflies everywhere.", "Tháng Tư có bươm bướm khắp nơi.", m25pB],
  ["How many trees did the class plant?", ["Ten", "Fifteen", "Twenty", "Thirty"], 2, "They planted twenty young trees.", "Lớp trồng hai mươi cây non.", m25pB],
  ["Where did they plant the trees?", ["Near the path", "In the school yard", "By the river", "On the hill"], 0, "They planted them near the path.", "Các bạn trồng cây gần lối đi.", m25pB],
  ["What will the trees give in ten years?", ["Fruit", "Shade", "Flowers", "Wood"], 1, "The teacher says they will give shade.", "Cô giáo nói cây sẽ cho bóng mát.", m25pB],
  ["When it is very cold, water becomes ___.", ["ice", "steam", "sand", "smoke"], 0, "Cold water becomes ice.", "Nước lạnh biến thành băng.", undefined],
  ["We use an umbrella when it ___.", ["rains", "rain", "raining", "rained tomorrow"], 0, "'It' takes 'rains' in the present simple.", "Với 'it' dùng 'rains'.", undefined],
  ["A very big storm with a lot of wind is a ___.", ["typhoon", "rainbow", "sunset", "cloud"], 0, "A typhoon is a big storm.", "Bão lớn gọi là typhoon.", undefined],
  ["Bees and butterflies visit ___.", ["flowers", "buses", "shoes", "walls"], 0, "Bees and butterflies visit flowers.", "Ong và bướm đến với hoa.", undefined],
  ["Yesterday the sun ___ all afternoon.", ["shine", "shines", "shone", "shining"], 2, "'Yesterday' needs the past simple 'shone'.", "'Yesterday' nên dùng quá khứ 'shone'.", undefined],
];

const m25Ls: Tuple[] = [
  ["What is the weather like today?", ["Cloudy", "Sunny", "Rainy", "Snowy"], 0, "It is cloudy today.", "Hôm nay trời nhiều mây.", "Woman: 'It is cloudy today but the rain has stopped.'"],
  ["What animal did the boy see?", ["A snake", "A squirrel", "A monkey", "A deer"], 1, "He saw a squirrel.", "Cậu ấy thấy một chú sóc.", "Boy: 'In the forest I saw a squirrel with a nut.'"],
  ["How many trees are in the school garden?", ["Six", "Eight", "Ten", "Twelve"], 2, "There are ten trees.", "Có mười cái cây.", "Girl: 'We counted ten trees in the school garden.'"],
  ["When does the class go to the park?", ["On Tuesday", "On Wednesday", "On Thursday", "On Friday"], 2, "They go on Thursday.", "Lớp đi vào thứ Năm.", "Man: 'Our nature walk in the park is on Thursday.'"],
  ["What did the children collect?", ["Leaves", "Stones", "Shells", "Feathers"], 0, "They collected leaves.", "Các bạn nhặt lá cây.", "Woman: 'The children collected different leaves for the project.'"],
  ["Where is the bird's nest?", ["On the roof", "In the tall tree", "Under the bridge", "In a box"], 1, "The nest is in the tall tree.", "Tổ chim ở trên cây cao.", "Boy: 'There is a nest in the tall tree by the gate.'"],
  ["What is the temperature?", ["Twenty", "Twenty-five", "Thirty", "Thirty-five"], 2, "It is thirty degrees.", "Nhiệt độ là ba mươi độ.", "Man: 'It is thirty degrees, so drink plenty of water.'"],
  ["What do they do when it rains?", ["Stay inside", "Play football", "Go swimming", "Walk home"], 0, "They stay inside when it rains.", "Trời mưa thì các bạn ở trong nhà.", "Woman: 'When it rains we stay inside and read.'"],
  ["What colour is the sky in the evening?", ["Grey", "Orange", "Black", "Green"], 1, "The evening sky is orange.", "Bầu trời buổi chiều màu cam.", "Girl: 'In the evening the sky turns orange over the hills.'"],
  ["What will the class do next week?", ["Plant flowers", "Clean the beach", "Visit a farm", "Make a map"], 1, "They will clean the beach.", "Tuần tới lớp sẽ dọn bãi biển.", "Man: 'Next week our class is going to clean the beach.'"],
];

const movers25: CambridgeMockExam = {
  id: "cambridge-movers-25",
  title: "Movers Mock Test 25 - Nature & Weather",
  titleVi: "Đề thi thử Movers 25 - Thiên nhiên & Thời tiết",
  level: "movers",
  duration: 25,
  totalQuestions: 25,
  questions: build(m25Rw, m25Ls),
};

export const cambridgeExamsMovers21to25: CambridgeMockExam[] = [
  movers21,
  movers22,
  movers23,
  movers24,
  movers25,
];
