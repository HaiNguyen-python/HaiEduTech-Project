/**
 * @file cambridgeExamsFlyers16to20.ts
 * @description Five Cambridge Flyers (A2) mock exams, tests 16 to 20.
 *              Themes: Science Club, Space & Planets, City Life, Healthy
 *              Habits, Weather & Nature. Each paper has 15 Reading & Writing
 *              questions and 10 Listening questions with full scripts.
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

/* ================== FLYERS 16 - Science Club ================== */
const f16pA =
  "Our science club meets every Wednesday in the small laboratory behind the library. Last month we grew beans in three different pots. The pot near the window grew fastest because it got the most light. The pot inside the dark cupboard hardly grew at all, and its leaves turned pale yellow. Our teacher, Mr Owen, said we should write everything we noticed in a notebook, even the things that surprised us.";
const f16pB =
  "This term the club is building a small weather station for the school garden. It will measure rain, wind and temperature. Two students check the numbers each morning before lessons and put them on a chart outside the office. If the station works well, Mr Owen wants to share the results with a science website for schools.";

const f16Rw: Tuple[] = [
  ["Where does the science club meet?", ["In the library", "In a laboratory", "In the garden", "In the school hall"], 1, "The text says the club meets in the small laboratory behind the library.", "Bài đọc nói câu lạc bộ họp ở phòng thí nghiệm nhỏ phía sau thư viện.", f16pA],
  ["How many pots did the students use?", ["Two", "Three", "Four", "Five"], 1, "The text says they grew beans in three different pots.", "Bài đọc nói các bạn trồng đậu trong ba cái chậu khác nhau.", f16pA],
  ["Why did one pot grow fastest?", ["It had more water", "It had better soil", "It got the most light", "It was bigger"], 2, "The pot near the window grew fastest because it got the most light.", "Chậu gần cửa sổ mọc nhanh nhất vì nhận nhiều ánh sáng nhất.", f16pA],
  ["What happened to the plant in the cupboard?", ["It died at once", "Its leaves turned pale", "It grew very tall", "It made flowers"], 1, "Its leaves turned pale yellow and it hardly grew.", "Lá của nó chuyển sang vàng nhạt và gần như không lớn.", f16pA],
  ["What did Mr Owen ask the students to do?", ["Take photos", "Write notes in a notebook", "Draw the plants", "Water the plants twice"], 1, "He said they should write everything they noticed in a notebook.", "Ông nói các bạn nên ghi lại mọi điều quan sát được vào sổ.", f16pA],
  ["What is the club building this term?", ["A robot", "A weather station", "A garden pond", "A model rocket"], 1, "The club is building a small weather station.", "Kỳ này câu lạc bộ làm một trạm khí tượng nhỏ.", f16pB],
  ["Which of these does the station NOT measure?", ["Rain", "Wind", "Temperature", "Noise"], 3, "It measures rain, wind and temperature, but not noise.", "Trạm đo mưa, gió và nhiệt độ, không đo tiếng ồn.", f16pB],
  ["When do the students check the numbers?", ["Before lessons", "At lunchtime", "After school", "At the weekend"], 0, "Two students check the numbers each morning before lessons.", "Hai bạn kiểm tra số liệu mỗi sáng trước giờ học.", f16pB],
  ["What does Mr Owen hope to do with the results?", ["Print a book", "Share them with a website", "Send them to parents", "Keep them secret"], 1, "He wants to share the results with a science website for schools.", "Ông muốn chia sẻ kết quả với một trang web khoa học cho trường học.", f16pB],
  ["A place where scientists work is a ___.", ["laboratory", "library", "gallery", "stadium"], 0, "Scientists work in a laboratory.", "Các nhà khoa học làm việc trong phòng thí nghiệm.", undefined],
  ["We use a thermometer to measure ___.", ["speed", "weight", "temperature", "distance"], 2, "A thermometer measures temperature.", "Nhiệt kế dùng để đo nhiệt độ.", undefined],
  ["Plants need light, water and ___ to grow.", ["air", "sand", "paper", "glass"], 0, "Plants need air as well as light and water.", "Cây cần không khí cùng với ánh sáng và nước.", undefined],
  ["The experiment ___ two weeks ago.", ["begins", "began", "beginning", "will begin"], 1, "'Two weeks ago' needs the past simple 'began'.", "Có 'two weeks ago' nên dùng quá khứ đơn 'began'.", undefined],
  ["If you ___ the ice, it becomes water.", ["freeze", "heat", "hide", "drop"], 1, "Ice becomes water when you heat it.", "Đá trở thành nước khi bạn làm nóng nó.", undefined],
  ["Something that surprises you is ___.", ["boring", "usual", "unexpected", "silent"], 2, "A surprise is something unexpected.", "Điều gây ngạc nhiên là điều không ngờ tới.", undefined],
];

const f16Ls: Tuple[] = [
  ["What did the girl's group test?", ["Sound", "Magnets", "Colours", "Shadows"], 1, "Her group tested magnets.", "Nhóm của bạn ấy làm thí nghiệm với từ tính.", "Listen: 'Our group tested magnets to see which one was strongest.'"],
  ["How long did the experiment take?", ["Ten minutes", "Twenty minutes", "Half an hour", "One hour"], 2, "The experiment took half an hour.", "Thí nghiệm mất nửa tiếng.", "Listen: 'The whole experiment took half an hour from start to finish.'"],
  ["What went wrong in the lesson?", ["A glass broke", "The lights went off", "A pot fell over", "The water spilled"], 3, "The water spilled during the lesson.", "Nước bị đổ trong tiết học.", "Listen: 'Sorry, the water spilled all over my worksheet.'"],
  ["Who wrote the report?", ["Tom", "Emma", "Mr Owen", "The whole group"], 1, "Emma wrote the report.", "Emma là người viết báo cáo.", "Listen: 'Emma wrote the report while we cleaned the table.'"],
  ["Where will they put the weather chart?", ["Outside the office", "In the hall", "In the classroom", "On the website"], 0, "The chart goes outside the office.", "Bảng số liệu được treo bên ngoài phòng hành chính.", "Listen: 'The new chart will go on the wall outside the office.'"],
  ["What is the club's next topic?", ["Plants", "Electricity", "Space", "Animals"], 1, "The next topic is electricity.", "Chủ đề tiếp theo là điện.", "Listen: 'Next month our topic will be electricity and simple circuits.'"],
  ["How many students joined this term?", ["Six", "Eight", "Twelve", "Fourteen"], 2, "Twelve students joined this term.", "Kỳ này có mười hai bạn tham gia.", "Listen: 'Twelve new students joined the science club this term.'"],
  ["What must students wear in the laboratory?", ["Gloves", "Glasses", "Aprons", "Boots"], 1, "Students must wear safety glasses.", "Học sinh phải mang kính bảo hộ.", "Listen: 'Remember, everybody must wear safety glasses in here.'"],
  ["Why was the boy late?", ["He missed the bus", "He forgot his notebook", "He was helping a teacher", "He was ill"], 2, "He was late because he was helping a teacher.", "Cậu ấy đến muộn vì đang giúp một giáo viên.", "Listen: 'Sorry I am late. I was helping Miss Lee carry some boxes.'"],
  ["What will happen at the end of term?", ["A test", "A science show", "A trip", "A party"], 1, "There will be a science show at the end of term.", "Cuối kỳ sẽ có một buổi trình diễn khoa học.", "Listen: 'At the end of term we will have a science show for parents.'"],
];

const flyers16: CambridgeMockExam = {
  id: "cambridge-flyers-16",
  title: "Flyers Mock Test 16 - Science Club",
  titleVi: "Đề thi thử Flyers 16 - Câu lạc bộ Khoa học",
  level: "flyers",
  duration: 40,
  totalQuestions: 25,
  questions: build(f16Rw, f16Ls),
};

/* ================== FLYERS 17 - Space & Planets ================== */
const f17pA =
  "The Moon is much smaller than the Earth, but it looks big in the sky because it is close to us. It has no air and no water, so nothing grows there. During the day the surface becomes extremely hot, and at night it becomes colder than any place on Earth. Astronauts who walked there carried their own air in heavy suits.";
const f17pB =
  "Mars is often called the red planet because iron in its dust makes the ground look orange. A day on Mars is only forty minutes longer than a day on Earth, but a year is almost twice as long. Robots sent from Earth have found ice under the surface. Scientists believe water once flowed in wide rivers across the planet.";

const f17Rw: Tuple[] = [
  ["Why does the Moon look big?", ["It is very large", "It is close to us", "It has bright lights", "It moves slowly"], 1, "It looks big because it is close to us.", "Mặt trăng trông to vì nó ở gần chúng ta.", f17pA],
  ["What is missing on the Moon?", ["Rocks", "Dust", "Air and water", "Light"], 2, "The Moon has no air and no water.", "Mặt trăng không có không khí và nước.", f17pA],
  ["What is the Moon like at night?", ["Very hot", "Warm", "Extremely cold", "Windy"], 2, "At night it becomes colder than any place on Earth.", "Ban đêm nó lạnh hơn bất kỳ nơi nào trên Trái đất.", f17pA],
  ["What did astronauts carry?", ["Food only", "Their own air", "Water from the Moon", "Light suits"], 1, "They carried their own air in heavy suits.", "Họ mang theo không khí của mình trong bộ đồ nặng.", f17pA],
  ["Nothing grows on the Moon because there is no ___.", ["water", "light", "space", "rock"], 0, "Without air and water nothing can grow there.", "Không có không khí và nước nên không gì mọc được.", f17pA],
  ["Why is Mars called the red planet?", ["It is very hot", "Iron in the dust looks orange", "It has red clouds", "The sun is red there"], 1, "Iron in its dust makes the ground look orange.", "Sắt trong bụi làm mặt đất trông màu cam.", f17pB],
  ["A day on Mars is ___ a day on Earth.", ["much shorter than", "a little longer than", "exactly the same as", "twice as long as"], 1, "A Martian day is only forty minutes longer.", "Một ngày trên sao Hỏa chỉ dài hơn bốn mươi phút.", f17pB],
  ["What have robots found on Mars?", ["Trees", "Ice", "Animals", "Air"], 1, "Robots have found ice under the surface.", "Các robot đã tìm thấy băng dưới bề mặt.", f17pB],
  ["What do scientists believe about Mars?", ["It has no dust", "Water once flowed there", "It is bigger than Earth", "It has two suns"], 1, "They believe water once flowed in wide rivers.", "Họ tin rằng nước từng chảy thành những dòng sông rộng.", f17pB],
  ["A person who travels into space is an ___.", ["engineer", "astronaut", "architect", "athlete"], 1, "An astronaut travels into space.", "Nhà du hành vũ trụ là người đi vào không gian.", undefined],
  ["The Earth ___ around the Sun.", ["move", "moves", "moving", "moved next year"], 1, "With 'the Earth' we use 'moves'.", "Với 'the Earth' thì dùng 'moves'.", undefined],
  ["We look at stars through a ___.", ["microscope", "telescope", "periscope", "stethoscope"], 1, "A telescope is used to look at distant stars.", "Kính viễn vọng dùng để quan sát các ngôi sao.", undefined],
  ["A vehicle that flies into space is a ___.", ["rocket", "tractor", "ferry", "coach"], 0, "A rocket flies into space.", "Tên lửa bay vào không gian.", undefined],
  ["Which planet is nearest the Sun?", ["Mercury", "Mars", "Jupiter", "Saturn"], 0, "Mercury is the planet nearest the Sun.", "Sao Thủy là hành tinh gần Mặt trời nhất.", undefined],
  ["If something is 'extremely hot', it is ___ hot.", ["a little", "quite", "very", "not"], 2, "'Extremely' means very much indeed.", "'Extremely' nghĩa là rất, cực kỳ.", undefined],
];

const f17Ls: Tuple[] = [
  ["What is the talk about today?", ["The Sun", "The Moon", "Comets", "Rockets"], 3, "Today's talk is about rockets.", "Buổi nói chuyện hôm nay về tên lửa.", "Listen: 'Today I will tell you how rockets leave the Earth.'"],
  ["How many planets will they study?", ["Four", "Six", "Eight", "Ten"], 2, "They will study eight planets.", "Các bạn sẽ học về tám hành tinh.", "Listen: 'In this project you will study all eight planets.'"],
  ["What does the boy want to be?", ["A pilot", "An astronaut", "A teacher", "An engineer"], 1, "He wants to be an astronaut.", "Cậu ấy muốn làm nhà du hành vũ trụ.", "Listen: 'When I grow up I really want to be an astronaut.'"],
  ["Where is the space museum?", ["In the city centre", "Near the airport", "Next to the park", "By the river"], 1, "The space museum is near the airport.", "Bảo tàng không gian ở gần sân bay.", "Listen: 'The space museum is near the airport, so we go by bus.'"],
  ["When is the school trip?", ["On Monday", "On Tuesday", "On Thursday", "On Friday"], 2, "The trip is on Thursday.", "Chuyến đi vào thứ Năm.", "Listen: 'Our trip to the space museum is on Thursday morning.'"],
  ["What must students bring?", ["A camera", "A packed lunch", "Money for tickets", "A notebook only"], 1, "Students must bring a packed lunch.", "Học sinh phải mang theo bữa trưa.", "Listen: 'Please bring a packed lunch because the cafe is closed.'"],
  ["How long is the film at the museum?", ["Ten minutes", "Twenty minutes", "Thirty minutes", "Fifty minutes"], 1, "The film lasts twenty minutes.", "Bộ phim dài hai mươi phút.", "Listen: 'There is a short film about Mars. It lasts twenty minutes.'"],
  ["What surprised the girl most?", ["The size of the rocket", "The moon rock", "The photos", "The models"], 1, "The moon rock surprised her most.", "Mẫu đá mặt trăng làm bạn ấy ngạc nhiên nhất.", "Listen: 'The thing that surprised me most was the real moon rock.'"],
  ["Why can we not live on the Moon?", ["It is too small", "There is no air", "It is too bright", "It is too far"], 1, "There is no air on the Moon.", "Trên mặt trăng không có không khí.", "Listen: 'We cannot live there because the Moon has no air at all.'"],
  ["What will the class do after the trip?", ["Write a report", "Make a model", "Draw a poster", "Give a talk"], 2, "They will draw a poster after the trip.", "Sau chuyến đi cả lớp sẽ vẽ áp phích.", "Listen: 'After the trip each group will draw a poster about a planet.'"],
];

const flyers17: CambridgeMockExam = {
  id: "cambridge-flyers-17",
  title: "Flyers Mock Test 17 - Space & Planets",
  titleVi: "Đề thi thử Flyers 17 - Không gian & Hành tinh",
  level: "flyers",
  duration: 40,
  totalQuestions: 25,
  questions: build(f17Rw, f17Ls),
};

/* ================== FLYERS 18 - City Life ================== */
const f18pA =
  "My cousin Leo lives in a flat on the ninth floor of a tall building in the city centre. From his window you can see the railway station, a park and hundreds of small roofs. He never needs a car because the underground station is two minutes away. The only thing he dislikes is the noise of traffic early in the morning.";
const f18pB =
  "Our town has just opened a new library beside the old market square. Anyone can borrow up to eight books at a time, and there is a quiet room upstairs for homework. On the ground floor there are computers, but you must book them in advance because they are always busy after school.";

const f18Rw: Tuple[] = [
  ["Where does Leo live?", ["In a house", "In a flat", "On a farm", "In a hotel"], 1, "Leo lives in a flat on the ninth floor.", "Leo sống trong một căn hộ ở tầng chín.", f18pA],
  ["What can you see from his window?", ["The sea", "The railway station", "A forest", "The airport"], 1, "From his window you can see the railway station.", "Từ cửa sổ có thể thấy nhà ga xe lửa.", f18pA],
  ["Why does Leo not need a car?", ["He cannot drive", "The underground is very near", "He works at home", "The roads are closed"], 1, "The underground station is two minutes away.", "Ga tàu điện ngầm chỉ cách hai phút.", f18pA],
  ["What does Leo dislike?", ["The lifts", "The neighbours", "The traffic noise", "The tall building"], 2, "He dislikes the noise of traffic early in the morning.", "Cậu ấy không thích tiếng ồn xe cộ vào sáng sớm.", f18pA],
  ["Which floor is his flat on?", ["The seventh", "The eighth", "The ninth", "The tenth"], 2, "The text says the ninth floor.", "Bài đọc nói tầng chín.", f18pA],
  ["Where is the new library?", ["Beside the market square", "Next to the station", "In the park", "Near the school"], 0, "It is beside the old market square.", "Nó nằm cạnh khu chợ cũ.", f18pB],
  ["How many books can you borrow?", ["Four", "Six", "Eight", "Ten"], 2, "You can borrow up to eight books at a time.", "Bạn có thể mượn tối đa tám quyển sách.", f18pB],
  ["What is upstairs in the library?", ["A cafe", "A quiet room", "A cinema", "An office"], 1, "There is a quiet room upstairs for homework.", "Trên gác có phòng yên tĩnh để làm bài.", f18pB],
  ["Why must you book a computer?", ["They cost money", "They are always busy", "They are new", "There is only one"], 1, "You must book because they are always busy after school.", "Phải đặt trước vì máy tính luôn kín chỗ sau giờ học.", f18pB],
  ["A train that runs under a city is called the ___.", ["underground", "motorway", "harbour", "pavement"], 0, "The underground is a train system beneath a city.", "Tàu điện ngầm là hệ thống tàu chạy dưới thành phố.", undefined],
  ["We walk on the ___, not on the road.", ["bridge", "pavement", "roof", "tunnel"], 1, "People walk on the pavement.", "Người đi bộ đi trên vỉa hè.", undefined],
  ["The city is much ___ than my village.", ["noisy", "noisier", "noisiest", "more noisy"], 1, "For a comparison with 'than' we use 'noisier'.", "So sánh với 'than' thì dùng 'noisier'.", undefined],
  ["You can borrow books from a ___.", ["library", "bookshop", "museum", "gallery"], 0, "You borrow books from a library.", "Bạn mượn sách ở thư viện.", undefined],
  ["A place where you catch a train is a ___.", ["stop", "station", "port", "gate"], 1, "Trains leave from a station.", "Tàu khởi hành từ nhà ga.", undefined],
  ["If a room is quiet, people must not ___.", ["read", "shout", "sit", "study"], 1, "In a quiet room you must not shout.", "Trong phòng yên tĩnh thì không được hét.", undefined],
];

const f18Ls: Tuple[] = [
  ["How does the girl travel to school?", ["By bus", "By underground", "By bike", "On foot"], 1, "She travels by underground.", "Bạn ấy đi học bằng tàu điện ngầm.", "Listen: 'I take the underground to school. It is quicker than the bus.'"],
  ["What is opposite the cinema?", ["A bank", "A cafe", "A hotel", "A market"], 3, "There is a market opposite the cinema.", "Đối diện rạp chiếu phim là khu chợ.", "Listen: 'The market is right opposite the cinema.'"],
  ["What time does the shopping centre close?", ["Seven", "Eight", "Nine", "Ten"], 2, "It closes at nine o'clock.", "Trung tâm mua sắm đóng cửa lúc chín giờ.", "Listen: 'The shopping centre closes at nine every evening.'"],
  ["Why is the road closed?", ["An accident", "Building work", "A parade", "Bad weather"], 1, "The road is closed because of building work.", "Đường bị chặn vì công trình xây dựng.", "Listen: 'The main road is closed because of building work.'"],
  ["Where did the boy leave his bag?", ["On the bus", "At the station", "In the library", "In the park"], 2, "He left his bag in the library.", "Cậu ấy để quên túi trong thư viện.", "Listen: 'Oh no, I left my bag in the library, on the second floor.'"],
  ["How much is a child's ticket?", ["One pound", "Two pounds", "Three pounds", "Four pounds"], 1, "A child's ticket costs two pounds.", "Vé trẻ em giá hai bảng.", "Listen: 'A child's ticket is two pounds, and adults pay four.'"],
  ["What is new in the park?", ["A pond", "A cafe", "A skate area", "A bridge"], 2, "There is a new skate area in the park.", "Trong công viên có khu trượt ván mới.", "Listen: 'They have built a new skate area in the park.'"],
  ["Who lives on the top floor?", ["The girl", "Her cousin", "Her teacher", "Her friend"], 1, "Her cousin lives on the top floor.", "Anh họ bạn ấy sống ở tầng trên cùng.", "Listen: 'My cousin lives on the top floor with a great view.'"],
  ["What does the boy dislike about the city?", ["The buildings", "The crowds", "The shops", "The parks"], 1, "He dislikes the crowds.", "Cậu ấy không thích cảnh đông người.", "Listen: 'I like the city, but I hate the crowds at rush hour.'"],
  ["Where will they meet on Saturday?", ["At the library", "At the station", "At the market", "At the cinema"], 1, "They will meet at the station.", "Họ sẽ gặp nhau ở nhà ga.", "Listen: 'Let's meet at the station at ten on Saturday.'"],
];

const flyers18: CambridgeMockExam = {
  id: "cambridge-flyers-18",
  title: "Flyers Mock Test 18 - City Life",
  titleVi: "Đề thi thử Flyers 18 - Cuộc sống thành phố",
  level: "flyers",
  duration: 40,
  totalQuestions: 25,
  questions: build(f18Rw, f18Ls),
};

/* ================== FLYERS 19 - Healthy Habits ================== */
const f19pA =
  "Doctors say children need about ten hours of sleep every night. When we sleep, the body repairs itself and the brain stores everything we learned during the day. Students who go to bed late often find it harder to remember new words. Screens are a problem too, because bright light before bedtime makes the brain think it is still daytime.";
const f19pB =
  "Our school has changed its lunch menu. There is now fresh fruit every day, and sugary drinks have disappeared from the machines. Pupils can also join a walking group that goes twice round the sports field before afternoon lessons. Since these changes, teachers say the classes after lunch are calmer.";

const f19Rw: Tuple[] = [
  ["How much sleep do children need?", ["About six hours", "About eight hours", "About ten hours", "About twelve hours"], 2, "Doctors say children need about ten hours of sleep.", "Bác sĩ nói trẻ em cần khoảng mười tiếng ngủ.", f19pA],
  ["What does the brain do during sleep?", ["It rests only", "It stores what we learned", "It grows bigger", "It stops working"], 1, "The brain stores everything we learned during the day.", "Bộ não lưu giữ những gì ta học trong ngày.", f19pA],
  ["What problem do late sleepers have?", ["They eat too much", "They remember words less easily", "They talk too fast", "They grow slowly"], 1, "They often find it harder to remember new words.", "Các bạn ngủ muộn thường khó nhớ từ mới hơn.", f19pA],
  ["Why are screens a problem at bedtime?", ["They are noisy", "The light tricks the brain", "They are heavy", "They cost money"], 1, "Bright light makes the brain think it is still daytime.", "Ánh sáng mạnh làm não nghĩ vẫn còn là ban ngày.", f19pA],
  ["The body ___ itself while we sleep.", ["repairs", "empties", "cools", "hides"], 0, "The text says the body repairs itself.", "Bài đọc nói cơ thể tự phục hồi.", f19pA],
  ["What is now on the menu every day?", ["Cake", "Fresh fruit", "Chips", "Fizzy drinks"], 1, "There is now fresh fruit every day.", "Bây giờ mỗi ngày đều có trái cây tươi.", f19pB],
  ["What has disappeared from the machines?", ["Water", "Sugary drinks", "Sandwiches", "Fruit"], 1, "Sugary drinks have disappeared from the machines.", "Nước ngọt nhiều đường đã bị bỏ khỏi máy bán hàng.", f19pB],
  ["What does the walking group do?", ["Runs in the park", "Walks twice round the field", "Plays football", "Cycles to school"], 1, "The group goes twice round the sports field.", "Nhóm đi bộ hai vòng quanh sân thể thao.", f19pB],
  ["What do teachers say about afternoon classes?", ["They are noisier", "They are calmer", "They are shorter", "They are harder"], 1, "Teachers say the classes after lunch are calmer.", "Giáo viên nói các tiết sau trưa yên hơn.", f19pB],
  ["Too much sugar is bad for your ___.", ["teeth", "hair", "shoes", "voice"], 0, "Too much sugar damages your teeth.", "Quá nhiều đường gây hại cho răng.", undefined],
  ["You should ___ your hands before you eat.", ["wash", "wave", "watch", "wear"], 0, "We wash our hands before eating.", "Chúng ta rửa tay trước khi ăn.", undefined],
  ["He ___ to bed late last night.", ["go", "goes", "went", "going"], 2, "'Last night' needs the past simple 'went'.", "Có 'last night' nên dùng 'went'.", undefined],
  ["Exercise makes your ___ stronger.", ["muscles", "clothes", "books", "chairs"], 0, "Exercise makes your muscles stronger.", "Tập thể dục làm cơ bắp mạnh hơn.", undefined],
  ["A doctor who helps with teeth is a ___.", ["nurse", "dentist", "chemist", "vet"], 1, "A dentist takes care of teeth.", "Nha sĩ chăm sóc răng.", undefined],
  ["If you feel ill, you should ___.", ["run fast", "rest", "shout", "skip meals"], 1, "When you feel ill you should rest.", "Khi thấy không khỏe thì bạn nên nghỉ ngơi.", undefined],
];

const f19Ls: Tuple[] = [
  ["What time does the girl go to bed?", ["Eight o'clock", "Half past eight", "Nine o'clock", "Half past nine"], 2, "She goes to bed at nine o'clock.", "Bạn ấy đi ngủ lúc chín giờ.", "Listen: 'On school days I always go to bed at nine o'clock.'"],
  ["What sport does the boy do twice a week?", ["Swimming", "Basketball", "Judo", "Cycling"], 2, "He does judo twice a week.", "Cậu ấy học judo hai lần mỗi tuần.", "Listen: 'I do judo twice a week at the sports centre.'"],
  ["What does the nurse tell the class to drink?", ["Juice", "Water", "Milk", "Tea"], 1, "The nurse tells them to drink water.", "Điều dưỡng khuyên các bạn uống nước.", "Listen: 'Remember to drink water during the day, not sweet drinks.'"],
  ["What is wrong with the boy?", ["Toothache", "Headache", "Sore throat", "Stomach ache"], 3, "He has a stomach ache.", "Cậu ấy bị đau bụng.", "Listen: 'I have a stomach ache. I think I ate too fast.'"],
  ["How long is the walking group?", ["Ten minutes", "Fifteen minutes", "Twenty minutes", "Half an hour"], 1, "The walking group lasts fifteen minutes.", "Nhóm đi bộ kéo dài mười lăm phút.", "Listen: 'The walk takes about fifteen minutes before lessons.'"],
  ["Which fruit is on the menu today?", ["Apples", "Pears", "Grapes", "Melon"], 3, "Today's fruit is melon.", "Trái cây hôm nay là dưa.", "Listen: 'Today's fruit at lunch is melon, and tomorrow it's pears.'"],
  ["What has the girl stopped doing?", ["Eating breakfast", "Using screens at night", "Playing sport", "Walking to school"], 1, "She has stopped using screens at night.", "Bạn ấy đã bỏ dùng thiết bị vào buổi tối.", "Listen: 'I stopped using screens after eight and now I sleep better.'"],
  ["Where is the school nurse's room?", ["Next to the hall", "By the office", "Upstairs", "Near the gym"], 1, "The nurse's room is by the office.", "Phòng y tế nằm cạnh phòng hành chính.", "Listen: 'The nurse's room is just by the office, on the left.'"],
  ["What does the teacher want pupils to write?", ["A sleep diary", "A food list", "A story", "A letter"], 0, "The teacher wants a sleep diary.", "Giáo viên muốn các bạn viết sổ theo dõi giấc ngủ.", "Listen: 'This week please keep a sleep diary for seven nights.'"],
  ["What is the prize for the healthiest class?", ["A trip", "New sports balls", "Free fruit", "A party"], 1, "The prize is new sports balls.", "Giải thưởng là những quả bóng thể thao mới.", "Listen: 'The healthiest class will win new sports balls.'"],
];

const flyers19: CambridgeMockExam = {
  id: "cambridge-flyers-19",
  title: "Flyers Mock Test 19 - Healthy Habits",
  titleVi: "Đề thi thử Flyers 19 - Thói quen lành mạnh",
  level: "flyers",
  duration: 40,
  totalQuestions: 25,
  questions: build(f19Rw, f19Ls),
};

/* ================== FLYERS 20 - Weather & Nature ================== */
const f20pA =
  "Rain begins high above our heads. The sun warms lakes and seas until water rises into the air as invisible gas. Up there the air is cold, so the gas turns into tiny drops that gather into clouds. When the drops become too heavy, they fall back to the ground. This journey never stops, and scientists call it the water cycle.";
const f20pB =
  "Forests are important for weather as well as for animals. Trees hold water in their roots and slowly give it back to the air, which helps clouds to form. When a large forest is cut down, the land around it often becomes drier. Planting new trees can help, but a young tree needs many years before it does the same work as an old one.";

const f20Rw: Tuple[] = [
  ["What makes water rise into the air?", ["Wind", "The sun", "Rain", "Clouds"], 1, "The sun warms lakes and seas until water rises.", "Mặt trời làm nóng hồ và biển khiến nước bốc lên.", f20pA],
  ["What happens to the gas in cold air?", ["It disappears", "It turns into tiny drops", "It becomes ice at once", "It gets warmer"], 1, "The gas turns into tiny drops that gather into clouds.", "Khí biến thành những giọt nhỏ tụ thành mây.", f20pA],
  ["Why do drops fall to the ground?", ["The wind pushes them", "They become too heavy", "The sun stops shining", "Clouds break"], 1, "They fall when the drops become too heavy.", "Chúng rơi khi các giọt nước trở nên quá nặng.", f20pA],
  ["What do scientists call this journey?", ["The rain road", "The water cycle", "The cloud line", "The sun path"], 1, "Scientists call it the water cycle.", "Các nhà khoa học gọi đó là vòng tuần hoàn nước.", f20pA],
  ["The gas in the air is ___.", ["invisible", "green", "heavy", "loud"], 0, "The text says water rises as invisible gas.", "Bài đọc nói nước bốc lên dưới dạng khí không nhìn thấy.", f20pA],
  ["Where do trees hold water?", ["In their leaves", "In their roots", "In their flowers", "In their fruit"], 1, "Trees hold water in their roots.", "Cây giữ nước trong rễ.", f20pB],
  ["What helps clouds to form?", ["Water given back to the air", "Dry soil", "Strong wind", "Cold nights"], 0, "Trees give water back to the air, which helps clouds form.", "Cây trả nước vào không khí, giúp mây hình thành.", f20pB],
  ["What often happens when a forest is cut down?", ["The land gets wetter", "The land gets drier", "More rivers appear", "Nothing changes"], 1, "The land around it often becomes drier.", "Vùng đất quanh đó thường trở nên khô hơn.", f20pB],
  ["Why is planting trees not a quick answer?", ["Trees are expensive", "Young trees need many years", "There is no space", "Animals eat them"], 1, "A young tree needs many years to do the same work.", "Cây non cần nhiều năm để làm được việc như cây già.", f20pB],
  ["A long time without rain is called a ___.", ["flood", "drought", "storm", "shower"], 1, "A long dry period is a drought.", "Thời gian dài không mưa gọi là hạn hán.", undefined],
  ["Water that falls as ice balls is called ___.", ["hail", "fog", "dew", "frost"], 0, "Ice balls falling from clouds are hail.", "Những viên băng rơi từ mây gọi là mưa đá.", undefined],
  ["It ___ heavily when we left the house.", ["rain", "rains", "was raining", "rained tomorrow"], 2, "For an action in progress in the past we use 'was raining'.", "Hành động đang diễn ra trong quá khứ dùng 'was raining'.", undefined],
  ["A very strong wind with rain is a ___.", ["storm", "breeze", "cloud", "rainbow"], 0, "A storm has strong wind and rain.", "Bão có gió mạnh kèm mưa.", undefined],
  ["We see a rainbow when there is sun and ___.", ["snow", "rain", "wind", "fog"], 1, "A rainbow appears with sun and rain together.", "Cầu vồng xuất hiện khi có cả nắng và mưa.", undefined],
  ["If soil is dry, plants need more ___.", ["water", "light", "wind", "space"], 0, "Dry soil means plants need more water.", "Đất khô nghĩa là cây cần nhiều nước hơn.", undefined],
];

const f20Ls: Tuple[] = [
  ["What is the weather forecast for tomorrow?", ["Sunny", "Cloudy with showers", "Snowy", "Very windy"], 1, "Tomorrow will be cloudy with showers.", "Mai trời nhiều mây và có mưa rào.", "Listen: 'Tomorrow will be cloudy with a few showers in the afternoon.'"],
  ["Which trip has been cancelled?", ["The forest walk", "The beach trip", "The museum visit", "The farm visit"], 0, "The forest walk has been cancelled.", "Chuyến đi bộ trong rừng đã bị hủy.", "Listen: 'Because of the storm the forest walk is cancelled.'"],
  ["How many trees did the class plant?", ["Ten", "Fifteen", "Twenty", "Thirty"], 2, "The class planted twenty trees.", "Cả lớp trồng hai mươi cây.", "Listen: 'Last term our class planted twenty young trees.'"],
  ["What did the girl see in the garden?", ["A hedgehog", "A squirrel", "A fox", "An owl"], 1, "She saw a squirrel.", "Bạn ấy thấy một con sóc.", "Listen: 'This morning I saw a squirrel in our garden again.'"],
  ["What is the project about?", ["Rivers", "Birds", "Rocks", "Insects"], 3, "The project is about insects.", "Dự án nói về các loài côn trùng.", "Listen: 'Our new project is about insects in the school garden.'"],
  ["Where will they keep the rain gauge?", ["By the gate", "On the roof", "In the garden", "Near the door"], 2, "The rain gauge goes in the garden.", "Ống đo mưa được đặt trong vườn.", "Listen: 'We will put the rain gauge in the middle of the garden.'"],
  ["How much rain fell last week?", ["Five millimetres", "Ten millimetres", "Fifteen millimetres", "Twenty millimetres"], 3, "Twenty millimetres of rain fell.", "Tuần trước mưa hai mươi milimet.", "Listen: 'Last week we measured twenty millimetres of rain.'"],
  ["Why must they not pick the flowers?", ["They smell bad", "Insects need them", "They are expensive", "They are dirty"], 1, "Insects need the flowers.", "Các loài côn trùng cần những bông hoa đó.", "Listen: 'Please do not pick the flowers because insects need them.'"],
  ["What will the weather be like at the weekend?", ["Cold", "Warm", "Wet", "Foggy"], 1, "The weekend will be warm.", "Cuối tuần trời sẽ ấm.", "Listen: 'Good news: the weekend should be warm and dry.'"],
  ["What does the teacher want in the report?", ["Photos", "Numbers and drawings", "A poem", "A map only"], 1, "The teacher wants numbers and drawings.", "Giáo viên muốn có số liệu và hình vẽ.", "Listen: 'In your report include your numbers and some drawings.'"],
];

const flyers20: CambridgeMockExam = {
  id: "cambridge-flyers-20",
  title: "Flyers Mock Test 20 - Weather & Nature",
  titleVi: "Đề thi thử Flyers 20 - Thời tiết & Thiên nhiên",
  level: "flyers",
  duration: 40,
  totalQuestions: 25,
  questions: build(f20Rw, f20Ls),
};

export const cambridgeExamsFlyers16to20: CambridgeMockExam[] = [
  flyers16,
  flyers17,
  flyers18,
  flyers19,
  flyers20,
];
