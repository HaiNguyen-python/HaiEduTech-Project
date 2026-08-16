/**
 * @file cambridgeExamsFlyers11to12.ts
 * @description Two Cambridge Flyers (A2) mock exams, tests 11 to 12. Themes:
 *              11 - Weather & Seasons Around the World; 12 - Jobs & Helping
 *              in the Community. Each exam has 18 Reading & Writing
 *              questions (three reading-text groups of 6 questions) and 12
 *              Listening questions.
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
/* FLYERS 11 - Weather & Seasons Around the World                */
/* ============================================================= */
const p11a =
  "Last month, our class did a project about weather in different countries. We learned that in Norway, some places get so much snow in winter that children can ski to school! In Australia, however, December is a summer month, so children often go to the beach for their Christmas holidays. My favourite fact was about India, where a season called the monsoon brings very heavy rain from June to September. Farmers there wait for the monsoon because it helps their crops to grow. Our teacher said that the same season can feel completely different depending on where you live on Earth. I now want to visit a country with a totally different climate from mine.";
const p11b =
  "Dear Grandma,\nThank you for the lovely postcard from Canada! You said it was very cold and snowy there, but here in Vietnam it is still warm and sunny. This week, our science teacher taught us about the four seasons: spring, summer, autumn and winter. She explained that near the equator, the weather stays warm all year, but places far from the equator have big changes between seasons. In autumn here, it gets a little cooler and windier, which is perfect for flying kites with my friends. I hope you stay warm in the snow! Please send more photos of the ice and snowmen.\nLove, Mai";
const p11c =
  "Weather Report - Riverside Town\nToday will start cloudy with a light breeze from the west. By midday, the clouds should clear and the sun will come out, so it is a good day for outdoor sports. The temperature will reach twenty-two degrees in the afternoon, which is warmer than yesterday. However, forecasters warn that strong winds and heavy rain are expected tomorrow evening, so people should bring an umbrella if they go out after six o'clock. This weekend looks much sunnier, with clear skies on both Saturday and Sunday. It will be a great time for a picnic in the park.";

const f11Rw: Tuple[] = [
  ["What can children do in some parts of Norway in winter?", ["Swim to school", "Ski to school", "Sail to school", "Fly to school"], 1, "The text says children can ski to school because of the heavy snow.", "Đoạn văn nói trẻ em có thể trượt tuyết đến trường vì tuyết rơi dày.", p11a],
  ["What season is December in Australia?", ["Winter", "Autumn", "Summer", "Spring"], 2, "The text says December is a summer month in Australia.", "Đoạn văn nói tháng Mười Hai là mùa hè ở Úc.", p11a],
  ["When does the monsoon bring rain to India?", ["From January to March", "From June to September", "Only in December", "All year round"], 1, "The monsoon brings heavy rain from June to September.", "Mùa mưa mang lại mưa lớn từ tháng Sáu đến tháng Chín.", p11a],
  ["Why do farmers in India wait for the monsoon?", ["It cools their houses", "It helps their crops grow", "It stops the wind", "It brings snow"], 1, "The monsoon rain helps the farmers' crops to grow.", "Mưa của mùa gió mùa giúp cây trồng của nông dân phát triển.", p11a],
  ["What did the teacher say about seasons?", ["They are the same everywhere", "They feel different depending on location", "They only happen in cold countries", "They never change"], 1, "The teacher said the same season can feel different depending on where you live.", "Cô giáo nói cùng một mùa có thể khác nhau tùy nơi bạn sống.", p11a],
  ["What does the writer want to do now?", ["Move to Norway", "Visit a country with a different climate", "Become a farmer", "Study monsoons only"], 1, "The writer says they now want to visit a country with a different climate.", "Người viết nói giờ đây muốn đến thăm một đất nước có khí hậu khác.", p11a],
  ["What was the weather like in Canada, according to Grandma's postcard?", ["Warm and sunny", "Cold and snowy", "Windy and dry", "Hot and humid"], 1, "Grandma said it was very cold and snowy in Canada.", "Bà nói ở Canada rất lạnh và có tuyết.", p11b],
  ["What is the weather like in Vietnam this week, according to Mai?", ["Cold and snowy", "Warm and sunny", "Rainy all day", "Very windy"], 1, "Mai says it is still warm and sunny in Vietnam.", "Mai nói ở Việt Nam vẫn còn ấm và nắng.", p11b],
  ["What did the science teacher explain about the equator?", ["It is always cold there", "The weather stays warm all year near it", "It never rains there", "It snows every winter there"], 1, "Near the equator, the weather stays warm all year.", "Gần đường xích đạo, thời tiết ấm quanh năm.", p11b],
  ["What does Mai like to do in autumn?", ["Swim in the river", "Fly kites with friends", "Build snowmen", "Go skiing"], 1, "Mai says autumn is perfect for flying kites with her friends.", "Mai nói mùa thu là thời điểm tuyệt vời để thả diều với bạn bè.", p11b],
  ["What does Mai ask her grandma to send?", ["More postcards", "More photos of the ice and snowmen", "A warm coat", "A map of Canada"], 1, "Mai asks her grandma to send more photos of the ice and snowmen.", "Mai xin bà gửi thêm ảnh chụp băng và người tuyết.", p11b],
  ["What is the sender's relationship to Mai?", ["Her teacher", "Her grandmother", "Her sister", "Her friend"], 1, "The letter is addressed to Grandma and signed by Mai.", "Bức thư được gửi cho bà và ký tên Mai.", p11b],
  ["What will happen by midday in Riverside Town?", ["It will rain heavily", "The clouds will clear and the sun will come out", "It will snow", "The wind will stop completely"], 1, "By midday, the clouds should clear and the sun will come out.", "Vào buổi trưa, mây sẽ tan và mặt trời sẽ xuất hiện.", p11c],
  ["What temperature will it reach in the afternoon?", ["Twelve degrees", "Eighteen degrees", "Twenty-two degrees", "Thirty degrees"], 2, "The temperature will reach twenty-two degrees in the afternoon.", "Nhiệt độ sẽ đạt hai mươi hai độ vào buổi chiều.", p11c],
  ["What is expected tomorrow evening?", ["Sunny skies", "Strong winds and heavy rain", "Light breeze only", "Snow"], 1, "Forecasters warn of strong winds and heavy rain tomorrow evening.", "Các nhà dự báo cảnh báo có gió mạnh và mưa lớn vào tối mai.", p11c],
  ["What should people bring if they go out after six o'clock tomorrow?", ["A hat", "An umbrella", "Sunglasses", "A scarf"], 1, "People should bring an umbrella if they go out after six o'clock.", "Mọi người nên mang theo ô nếu ra ngoài sau sáu giờ.", p11c],
  ["What will the weekend weather be like?", ["Cloudy and cold", "Sunny with clear skies", "Rainy and windy", "Snowy"], 1, "This weekend looks much sunnier, with clear skies on both days.", "Cuối tuần này sẽ nắng hơn nhiều, với bầu trời quang đãng cả hai ngày.", p11c],
  ["What activity does the report suggest for the weekend?", ["Skiing", "A picnic in the park", "Building a snowman", "Staying indoors"], 1, "It says the weekend will be a great time for a picnic in the park.", "Bản tin nói cuối tuần sẽ là thời điểm tuyệt vời để đi dã ngoại trong công viên.", p11c],
];
const f11Ls: Tuple[] = [
  ["What is the weather like today?", ["Sunny", "Rainy", "Snowy", "Foggy"], 1, "Today's weather is rainy.", "Thời tiết hôm nay có mưa.", "Listen: 'It's raining outside, so please take your umbrella today.'"],
  ["What season does the girl like best?", ["Spring", "Summer", "Autumn", "Winter"], 0, "The girl says spring is her favourite season.", "Cô bé nói mùa xuân là mùa cô thích nhất.", "Listen: 'My favourite season is spring, because the flowers start to bloom.'"],
  ["What will the temperature be tomorrow?", ["Ten degrees", "Fifteen degrees", "Twenty degrees", "Twenty-five degrees"], 2, "Tomorrow's temperature will be twenty degrees.", "Nhiệt độ ngày mai sẽ là hai mươi độ.", "Listen: 'Tomorrow it will be sunny with a temperature of twenty degrees.'"],
  ["What should the children wear because of the wind?", ["A swimsuit", "A warm jacket", "Sandals", "Shorts"], 1, "Because of the strong wind, they should wear a warm jacket.", "Vì gió mạnh nên các em nên mặc áo khoác ấm.", "Listen: 'It's very windy today, so wear your warm jacket to school.'"],
  ["Which country does the boy say gets a lot of snow?", ["Spain", "Norway", "Egypt", "Thailand"], 1, "The boy says Norway gets a lot of snow.", "Cậu bé nói Na Uy có rất nhiều tuyết.", "Listen: 'In Norway, it snows so much that we can go skiing near our house.'"],
  ["When does the rainy season start, according to the man?", ["In March", "In June", "In September", "In December"], 1, "The rainy season starts in June, according to the man.", "Người đàn ông nói mùa mưa bắt đầu vào tháng Sáu.", "Listen: 'Here, the rainy season usually starts in June and lasts a few months.'"],
  ["What does the weather forecaster say will happen this afternoon?", ["It will be foggy", "It will be cloudy with some sun", "It will snow", "It will be very hot"], 1, "The forecaster says it will be cloudy with some sun this afternoon.", "Người dự báo thời tiết nói chiều nay trời sẽ nhiều mây và có nắng.", "Listen: 'This afternoon will be cloudy with some sunny spells.'"],
  ["Why is the girl happy about the sunny weather?", ["She can go to school late", "She can have a picnic", "She can stay in bed", "She can watch TV"], 1, "She is happy because she can have a picnic in the sunny weather.", "Cô bé vui vì có thể đi dã ngoại khi trời nắng.", "Listen: 'It's so sunny today, we can finally have our picnic in the park!'"],
  ["What is unusual about the weather this week?", ["It is much colder than usual", "It is much hotter than usual", "It hasn't rained at all", "It has snowed in summer"], 1, "The weather this week is much hotter than usual.", "Thời tiết tuần này nóng hơn nhiều so với bình thường.", "Listen: 'This week has been much hotter than usual for this time of year.'"],
  ["What does the man suggest bringing on the trip?", ["A raincoat", "A fan", "Sunglasses and a hat", "Warm gloves"], 2, "He suggests bringing sunglasses and a hat because it will be sunny.", "Ông ấy gợi ý mang theo kính râm và mũ vì trời sẽ nắng.", "Listen: 'It's going to be sunny all day, so bring your sunglasses and a hat.'"],
  ["What season is it now in the story?", ["Summer", "Winter", "Autumn", "Spring"], 2, "It is autumn now in the story, with falling leaves.", "Bây giờ là mùa thu trong câu chuyện, lá đang rụng.", "Listen: 'It's autumn now, and the leaves are falling from the trees.'"],
  ["How does the weather change tonight, according to the report?", ["It gets warmer", "It gets much colder", "It stays the same", "It becomes foggy"], 1, "The report says the weather gets much colder tonight.", "Bản tin nói thời tiết sẽ lạnh hơn nhiều vào tối nay.", "Listen: 'Tonight, the temperature will drop quickly, so it will get much colder.'"],
];

const flyers11: CambridgeMockExam = {
  id: "cambridge-flyers-11",
  title: "Flyers Mock Test 11 - Weather & Seasons Around the World",
  titleVi: "Đề thi thử Flyers 11 - Thời tiết & Các mùa trên thế giới",
  level: "flyers",
  duration: 30,
  totalQuestions: 30,
  questions: build(f11Rw, f11Ls),
};

/* ============================================================= */
/* FLYERS 12 - Jobs & Helping in the Community                    */
/* ============================================================= */
const p12a =
  "On Career Day at our school, many parents came to talk about their jobs. Mr Lee, who is a firefighter, told us how he helps people escape from burning buildings and rescues cats stuck in trees. He said firefighters must be brave and work well as a team. Next, a nurse called Ms Tran explained that she takes care of sick children in hospital and helps them feel less scared. She said kindness is the most important skill in her job. My favourite talk was from a chef who cooks meals for hundreds of people at a big restaurant every day. I learned that every job helps our community in a different way.";
const p12b =
  "Dear Diary,\nToday I helped my neighbour, Mr Davis, clean his garden because he hurt his leg last week and cannot bend down easily. My mum said helping neighbours is a wonderful way to be part of a community. After that, my brother and I collected old clothes and toys for a charity shop near our house. The shop gives the money to families who need help paying for food and school things. In the evening, our whole street had a small party to say thank you to the postman, who has delivered our letters for twenty years. It was a busy but happy day of helping others.";
const p12c =
  "Volunteers Needed - Riverside Community Centre\nWe are looking for friendly volunteers to help at our weekend activities. Volunteers can choose to help in the library, read stories to young children, or serve food at our free lunch programme for elderly people. No experience is needed, but volunteers must be at least twelve years old and enjoy working with others. Training will be given on the first Saturday of every month at ten o'clock. Anyone who volunteers for more than twenty hours will receive a certificate of thanks from the centre. Please speak to Mrs Green in the main office if you would like to join us.";

const f12Rw: Tuple[] = [
  ["What does Mr Lee do as a firefighter?", ["He cooks meals", "He rescues people and cats from danger", "He teaches at school", "He drives a bus"], 1, "Mr Lee helps people escape from burning buildings and rescues cats stuck in trees.", "Thầy Lee giúp người thoát khỏi tòa nhà cháy và cứu mèo bị mắc kẹt trên cây.", p12a],
  ["What must firefighters be, according to Mr Lee?", ["Rich", "Brave and good at teamwork", "Tall", "Quiet"], 1, "He said firefighters must be brave and work well as a team.", "Ông nói lính cứu hỏa phải dũng cảm và làm việc nhóm tốt.", p12a],
  ["What does Ms Tran do?", ["She fixes cars", "She takes care of sick children in hospital", "She cooks for restaurants", "She teaches maths"], 1, "Ms Tran takes care of sick children in hospital.", "Cô Tran chăm sóc trẻ em bị bệnh trong bệnh viện.", p12a],
  ["What does Ms Tran say is the most important skill?", ["Speed", "Kindness", "Strength", "Money"], 1, "She said kindness is the most important skill in her job.", "Cô nói lòng tốt là kỹ năng quan trọng nhất trong công việc của cô.", p12a],
  ["What is the writer's favourite talk about?", ["A firefighter", "A nurse", "A chef", "A teacher"], 2, "The writer's favourite talk was from a chef.", "Bài nói chuyện yêu thích của người viết là của một đầu bếp.", p12a],
  ["What did the writer learn about jobs?", ["Only some jobs help people", "Every job helps the community differently", "Jobs are not important", "Only doctors help others"], 1, "The writer learned that every job helps the community in a different way.", "Người viết học được rằng mỗi công việc giúp cộng đồng theo cách khác nhau.", p12a],
  ["Why did the writer help Mr Davis?", ["He was on holiday", "He hurt his leg", "He asked for money", "He was moving house"], 1, "Mr Davis hurt his leg last week and cannot bend down easily.", "Ông Davis bị đau chân tuần trước và không thể cúi người dễ dàng.", p12b],
  ["What did the writer and their brother collect?", ["Old books", "Old clothes and toys", "Old furniture", "Old bicycles"], 1, "They collected old clothes and toys for a charity shop.", "Họ thu gom quần áo và đồ chơi cũ cho một cửa hàng từ thiện.", p12b],
  ["What does the charity shop do with the money?", ["Keeps it for repairs", "Gives it to families who need help", "Sends it to another country", "Uses it for advertising"], 1, "The shop gives the money to families who need help paying for food and school things.", "Cửa hàng đưa tiền cho các gia đình cần giúp đỡ để mua đồ ăn và dụng cụ học tập.", p12b],
  ["Who did the street have a party for?", ["The postman", "The mayor", "A teacher", "A firefighter"], 0, "The street had a party to thank the postman.", "Cả con phố tổ chức tiệc để cảm ơn người đưa thư.", p12b],
  ["How long has the postman delivered letters on their street?", ["Five years", "Ten years", "Twenty years", "Thirty years"], 2, "The postman has delivered letters for twenty years.", "Người đưa thư đã giao thư trong hai mươi năm.", p12b],
  ["What does the writer's mum say about helping neighbours?", ["It is a waste of time", "It is a wonderful way to be part of a community", "It is only for adults", "It is not necessary"], 1, "Mum says helping neighbours is a wonderful way to be part of a community.", "Mẹ nói giúp đỡ hàng xóm là cách tuyệt vời để trở thành một phần của cộng đồng.", p12b],
  ["What activities can volunteers choose from at the centre?", ["Only library work", "Library, storytelling, or serving food", "Cleaning the streets", "Teaching swimming"], 1, "Volunteers can help in the library, read stories, or serve food at the lunch programme.", "Tình nguyện viên có thể giúp thư viện, đọc truyện, hoặc phục vụ ăn trưa.", p12c],
  ["What age must volunteers be at least?", ["Ten", "Twelve", "Fourteen", "Sixteen"], 1, "Volunteers must be at least twelve years old.", "Tình nguyện viên phải ít nhất mười hai tuổi.", p12c],
  ["When is training given?", ["Every Monday", "The first Saturday of every month", "Only in summer", "Every day at noon"], 1, "Training will be given on the first Saturday of every month at ten o'clock.", "Việc đào tạo được tổ chức vào thứ Bảy đầu tiên mỗi tháng lúc mười giờ.", p12c],
  ["What do volunteers receive after twenty hours of work?", ["Money", "A certificate of thanks", "A free lunch every day", "A key to the centre"], 1, "Anyone who volunteers for more than twenty hours will receive a certificate of thanks.", "Bất kỳ ai tình nguyện hơn hai mươi giờ sẽ nhận được giấy chứng nhận cảm ơn.", p12c],
  ["Who should volunteers speak to if they want to join?", ["Mr Lee", "Mrs Green", "Ms Tran", "Mr Davis"], 1, "Volunteers should speak to Mrs Green in the main office.", "Tình nguyện viên nên gặp cô Green tại văn phòng chính.", p12c],
  ["Who does the free lunch programme serve?", ["Young children only", "Elderly people", "Firefighters", "Teachers"], 1, "The free lunch programme serves elderly people.", "Chương trình ăn trưa miễn phí phục vụ người cao tuổi.", p12c],
];
const f12Ls: Tuple[] = [
  ["What job does the man want when he grows up?", ["A doctor", "A pilot", "A teacher", "A farmer"], 1, "The man wants to be a pilot when he grows up.", "Người đàn ông muốn trở thành phi công khi lớn lên.", "Listen: 'When I grow up, I really want to be a pilot and fly planes.'"],
  ["Who helped the old man cross the street?", ["A police officer", "A young girl", "A bus driver", "A teacher"], 1, "A young girl helped the old man cross the street.", "Một cô bé đã giúp ông cụ băng qua đường.", "Listen: 'A kind young girl helped the old man cross the busy street safely.'"],
  ["What does the woman do at the hospital?", ["She is a doctor", "She is a cleaner", "She is a cook", "She is a driver"], 0, "The woman is a doctor at the hospital.", "Người phụ nữ là bác sĩ tại bệnh viện.", "Listen: 'I work as a doctor at the city hospital, helping sick patients.'"],
  ["What time does the volunteer meeting start?", ["9 o'clock", "half past nine", "10 o'clock", "half past ten"], 2, "The volunteer meeting starts at 10 o'clock.", "Buổi họp tình nguyện viên bắt đầu lúc 10 giờ.", "Listen: 'Don't forget, our volunteer meeting starts at ten o'clock sharp.'"],
  ["What did the boy do to help his community?", ["Planted trees in the park", "Painted a fence", "Washed cars", "Fed animals"], 0, "The boy planted trees in the park to help his community.", "Cậu bé đã trồng cây trong công viên để giúp cộng đồng.", "Listen: 'Last weekend, I planted trees in the park with some other students.'"],
  ["Who fixes broken pipes in people's houses?", ["A plumber", "An engineer", "A teacher", "A librarian"], 0, "A plumber fixes broken pipes in houses.", "Thợ sửa ống nước sửa các đường ống bị hỏng trong nhà.", "Listen: 'When our pipe broke, we called a plumber to fix it quickly.'"],
  ["Why is the woman thankful to the postman?", ["He is always on time", "He gave her flowers", "He fixed her car", "He cooked her dinner"], 0, "The woman is thankful because the postman is always on time.", "Người phụ nữ biết ơn vì người đưa thư luôn đúng giờ.", "Listen: 'I'm always thankful that our postman delivers the mail right on time.'"],
  ["What does the girl collect for the charity sale?", ["Old shoes", "Old books", "Old toys", "Old hats"], 1, "The girl collects old books for the charity sale.", "Cô bé thu gom sách cũ cho buổi bán hàng từ thiện.", "Listen: 'I'm collecting old books to sell at the school charity sale.'"],
  ["How many volunteers came to the community centre today?", ["Five", "Ten", "Fifteen", "Twenty"], 2, "Fifteen volunteers came to the community centre today.", "Mười lăm tình nguyện viên đã đến trung tâm cộng đồng hôm nay.", "Listen: 'We were happy to see fifteen volunteers come to help us today.'"],
  ["What does the man say a good teacher needs?", ["Patience", "A car", "A big office", "Free time only"], 0, "The man says a good teacher needs patience.", "Người đàn ông nói một giáo viên giỏi cần sự kiên nhẫn.", "Listen: 'To be a good teacher, you really need a lot of patience.'"],
  ["What is the girl going to do this Saturday?", ["Go shopping", "Help at the animal shelter", "Watch a film", "Visit her cousin"], 1, "The girl is going to help at the animal shelter on Saturday.", "Cô bé sẽ giúp đỡ tại trại cứu hộ động vật vào thứ Bảy.", "Listen: 'This Saturday, I'm going to help at the animal shelter near my house.'"],
  ["Who does the community centre thank with a certificate?", ["Only staff members", "Volunteers who work more than twenty hours", "Only children", "Nobody"], 1, "The community centre thanks volunteers who work more than twenty hours with a certificate.", "Trung tâm cộng đồng cảm ơn tình nguyện viên làm hơn hai mươi giờ bằng giấy chứng nhận.", "Listen: 'Volunteers who give more than twenty hours will get a special certificate.'"],
];

const flyers12: CambridgeMockExam = {
  id: "cambridge-flyers-12",
  title: "Flyers Mock Test 12 - Jobs & Helping in the Community",
  titleVi: "Đề thi thử Flyers 12 - Nghề nghiệp & Giúp đỡ cộng đồng",
  level: "flyers",
  duration: 30,
  totalQuestions: 30,
  questions: build(f12Rw, f12Ls),
};

export const cambridgeExamsFlyers11to12: CambridgeMockExam[] = [flyers11, flyers12];
