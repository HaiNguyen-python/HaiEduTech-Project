/**
 * @file cambridgeExamsPet7to11.ts
 * @description Five complete Cambridge PET (Preliminary, B1) mock exams covering
 *              distinct themes: Environment & Climate, Media & Social Networks,
 *              Health & Lifestyle, Travel & Cultures, and City Life & Community.
 *              Each exam has 22 Reading & Writing questions (including two
 *              reading-text groups of 5 questions each) and 10 Listening questions.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { CambridgeMockExam, CambridgeMockQuestion } from "./cambridgeMockExamData";

type Tuple = [question: string, options: string[], correct: number, explanation: string, explanationVi: string, passage?: string];

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

/* ================ PET 7 - Environment & Climate ================ */
const p7PassageA =
  "Climate scientists have been warning for decades that human activity is changing the planet's weather patterns, but it is only in the last few years that most people have started to notice the effects in their own towns. Summers feel hotter, storms seem stronger, and many farmers say that the seasons no longer behave the way they used to. In response, some cities have begun planting thousands of trees along their streets, both to cool the air and to absorb carbon dioxide. Meanwhile, schools across the country are encouraging students to walk or cycle instead of travelling by car, and several supermarkets have removed unnecessary plastic packaging from their shelves. Nobody believes these small steps will solve the problem alone, but experts agree that they are an important part of a much bigger solution that will require governments, companies, and ordinary citizens to work together.";

const p7PassageB =
  "Dear Josh, I hope you're settling in well at your new school. I wanted to tell you about the environmental club I joined last month. We meet every Wednesday after lessons and spend an hour doing something practical, like clearing litter from the riverbank or building bird boxes for the park. Last week we visited a recycling centre and learned how glass and plastic are sorted before being turned into new products. Honestly, I never realised how much rubbish gets thrown away that could easily be reused. Our teacher has asked us to design a poster encouraging other students to reduce food waste at lunchtime, since apparently our canteen throws away nearly thirty kilograms of food every single day. If your school doesn't have a similar club, maybe you could start one? It has been one of the most rewarding things I've done this year. Write soon, Priya";

const p7Rw: Tuple[] = [
  ["What have most people only recently noticed?", ["new laws about pollution", "the effects of changing weather patterns", "a rise in food prices", "fewer farmers in the countryside"], 1, "The text says people have started to notice the effects of climate change in their own towns.", "Bài đọc nói mọi người mới bắt đầu nhận thấy ảnh hưởng của biến đổi khí hậu ở chính thị trấn của họ.", p7PassageA],
  ["Why are cities planting more trees?", ["to make streets look nicer only", "to cool the air and absorb carbon dioxide", "because farmers asked them to", "to replace car parks"], 1, "Trees are planted to cool the air and absorb carbon dioxide.", "Cây được trồng để làm mát không khí và hấp thụ khí carbon dioxide.", p7PassageA],
  ["What are schools encouraging students to do?", ["drive to school", "walk or cycle instead of using cars", "stop studying science", "buy more plastic bags"], 1, "Schools are encouraging students to walk or cycle instead of travelling by car.", "Các trường khuyến khích học sinh đi bộ hoặc đạp xe thay vì đi ô tô.", p7PassageA],
  ["What have some supermarkets done?", ["raised their prices", "removed unnecessary plastic packaging", "closed early every day", "stopped selling fruit"], 1, "Several supermarkets have removed unnecessary plastic packaging.", "Một số siêu thị đã loại bỏ bao bì nhựa không cần thiết.", p7PassageA],
  ["What do experts believe about these small steps?", ["they are pointless", "they are part of a bigger solution requiring cooperation", "only governments need to act", "they will solve the problem completely"], 1, "Experts agree the small steps are part of a bigger solution needing everyone's cooperation.", "Các chuyên gia đồng ý rằng những bước nhỏ này là một phần của giải pháp lớn hơn cần sự hợp tác.", p7PassageA],
  ["Why is Priya writing to Josh?", ["to invite him to a party", "to tell him about her environmental club", "to ask for homework help", "to complain about her school"], 1, "Priya is writing to tell Josh about the environmental club she joined.", "Priya viết thư để kể cho Josh nghe về câu lạc bộ môi trường mà cô ấy tham gia.", p7PassageB],
  ["What did the club do at the recycling centre?", ["planted trees", "learned how glass and plastic are sorted", "played sports", "cleaned the riverbank"], 1, "They visited the recycling centre and learned how glass and plastic are sorted.", "Họ đến thăm trung tâm tái chế và học cách phân loại thủy tinh và nhựa.", p7PassageB],
  ["How much food does the canteen waste daily, according to Priya?", ["ten kilograms", "twenty kilograms", "nearly thirty kilograms", "fifty kilograms"], 2, "The canteen throws away nearly thirty kilograms of food every day.", "Căng tin đổ bỏ gần ba mươi ki-lô-gam thức ăn mỗi ngày.", p7PassageB],
  ["What has the teacher asked the club to design?", ["a website", "a poster about reducing food waste", "a school uniform", "a new timetable"], 1, "The teacher asked them to design a poster encouraging students to reduce food waste.", "Giáo viên yêu cầu các em thiết kế một áp phích khuyến khích giảm lãng phí thức ăn.", p7PassageB],
  ["What does Priya suggest to Josh at the end?", ["that he join her club", "that he start a similar club at his school", "that he stop wasting food", "that he visit her town"], 1, "Priya suggests that Josh could start a similar club at his own school.", "Priya gợi ý rằng Josh có thể bắt đầu một câu lạc bộ tương tự ở trường của mình.", p7PassageB],
  ["If we ___ more trees, the air would be cleaner.", ["plant", "planted", "will plant", "had planted"], 1, "Second conditional: if + past simple, would + base verb.", "Câu điều kiện loại 2: if + quá khứ đơn, would + động từ nguyên mẫu.", ],
  ["Plastic bottles are ___ from recycled materials nowadays.", ["make", "made", "making", "makes"], 1, "Passive voice: are + past participle.", "Thể bị động: are + động từ phân từ hai (made).", ],
  ["The scientist said that the ice caps ___ melting rapidly.", ["are", "were", "is", "be"], 1, "Reported speech: present tense shifts to past (are -> were).", "Câu tường thuật: thì hiện tại chuyển thành quá khứ (are -> were).", ],
  ["We should reduce our carbon ___ by using less energy.", ["footprint", "handprint", "shadow", "trace"], 0, "'Carbon footprint' is the fixed collocation used for measuring emissions.", "'Carbon footprint' là cụm từ cố định dùng để chỉ lượng khí thải.", ],
  ["Global warming has ___ a serious effect on sea levels.", ["done", "made", "had", "took"], 2, "The fixed expression is 'to have an effect on something'.", "Cụm cố định là 'to have an effect on something'.", ],
  ["Closest meaning to 'sustainable': ", ["temporary", "able to continue without harming resources", "expensive", "old-fashioned"], 1, "'Sustainable' means able to continue without damaging the environment.", "'Sustainable' nghĩa là có thể duy trì mà không gây hại cho môi trường.", ],
  ["If the government ___ stricter laws years ago, pollution would be lower now.", ["introduces", "introduced", "had introduced", "introduce"], 2, "Third conditional: if + past perfect, would + have + past participle.", "Câu điều kiện loại 3: if + quá khứ hoàn thành, would + have + phân từ hai.", ],
  ["She asked me whether I ___ recycled the bottles.", ["have", "has", "had", "having"], 2, "Reported speech: present perfect shifts to past perfect.", "Câu tường thuật: hiện tại hoàn thành chuyển thành quá khứ hoàn thành.", ],
  ["Many species are ___ extinction because of habitat loss.", ["facing", "facing to", "faced by", "faces"], 0, "'Face' + noun means to be confronted with a problem.", "'Face' + danh từ nghĩa là đối mặt với một vấn đề.", ],
  ["The report was written ___ a team of climate researchers.", ["by", "from", "with", "for"], 0, "Passive voice agent is introduced with 'by'.", "Tác nhân trong câu bị động được giới thiệu bằng 'by'.", ],
  ["Renewable energy sources include solar power ___ wind turbines.", ["as well as", "instead of", "except", "apart"], 0, "'As well as' links two additional items.", "'As well as' dùng để nối thêm một hạng mục nữa.", ],
  ["The old factory was ___ down to build a solar farm.", ["torn", "tore", "tears", "tearing"], 0, "Passive: was + past participle (torn).", "Bị động: was + phân từ hai (torn).", ],
];

const p7Ls: Tuple[] = [
  ["What did the boy do at the weekend?", ["cleaned a beach", "planted trees in the park", "recycled bottles", "watched a documentary"], 1, "He says he planted trees in the park with his class.", "Cậu bé nói đã trồng cây trong công viên cùng lớp.", "Listen: 'At the weekend our class planted about fifty trees in the park near school.'"],
  ["Why is the woman worried?", ["her garden is too small", "the local river is very polluted", "she lost her bicycle", "there aren't enough shops"], 1, "She is worried because the local river is heavily polluted.", "Cô ấy lo lắng vì con sông gần nhà bị ô nhiễm nặng.", "Listen: 'I'm really worried about our local river - it's become so polluted this year.'"],
  ["What does the man suggest doing to save energy?", ["buying a new fridge", "turning off lights when leaving a room", "using more heating", "driving instead of walking"], 1, "He suggests turning off lights when you leave a room.", "Anh ấy đề nghị tắt đèn khi ra khỏi phòng.", "Listen: 'One easy thing everyone can do is turn off the lights whenever you leave a room.'"],
  ["What is the topic of the school assembly?", ["exam results", "reducing plastic waste", "a sports competition", "a new timetable"], 1, "The assembly is about reducing plastic waste in school.", "Buổi tập trung nói về việc giảm rác thải nhựa ở trường.", "Listen: 'This morning's assembly will focus on how we can reduce plastic waste in school.'"],
  ["What has the family decided to do?", ["buy an electric car", "stop recycling", "move to a bigger house", "sell their bicycles"], 0, "The family has decided to buy an electric car.", "Gia đình đã quyết định mua một chiếc ô tô điện.", "Listen: 'After a lot of discussion, we've finally decided to buy an electric car.'"],
  ["What does the speaker say about last summer?", ["it was cooler than usual", "it was the hottest on record", "it rained every day", "nothing unusual happened"], 1, "She says last summer was the hottest on record.", "Cô ấy nói mùa hè năm ngoái là mùa hè nóng nhất từng ghi nhận.", "Listen: 'Scientists confirmed that last summer was the hottest on record in this region.'"],
  ["What will the volunteers collect on Saturday?", ["old clothes", "litter from the beach", "money for charity", "books for the library"], 1, "The volunteers will collect litter from the beach on Saturday.", "Các tình nguyện viên sẽ nhặt rác trên bãi biển vào thứ Bảy.", "Listen: 'Our group of volunteers will meet at nine to collect litter from the beach on Saturday.'"],
  ["Why does the teacher want the students to walk to school?", ["it's faster than the bus", "it reduces air pollution", "the bus is too expensive", "there are no buses available"], 1, "Walking to school reduces air pollution from cars.", "Đi bộ đến trường giúp giảm ô nhiễm không khí từ ô tô.", "Listen: 'If more of you walked to school instead of coming by car, we could really cut air pollution.'"],
  ["What material is the new water bottle made from?", ["plastic", "recycled aluminium", "glass", "wood"], 1, "The new water bottle is made from recycled aluminium.", "Chai nước mới được làm từ nhôm tái chế.", "Listen: 'Our new water bottles are made entirely from recycled aluminium, not plastic.'"],
  ["What does the man ask the listeners to do?", ["sign a petition about climate change", "buy new curtains", "join a football team", "cancel a trip"], 0, "He asks listeners to sign a petition about climate change.", "Anh ấy yêu cầu người nghe ký vào bản kiến nghị về biến đổi khí hậu.", "Listen: 'Please take a moment today to sign our petition calling for stronger climate action.'"],
];

const pet7: CambridgeMockExam = {
  id: "cambridge-pet-7",
  title: "PET Mock Test 7 - Environment & Climate",
  titleVi: "Đề thi thử PET 7 - Môi trường & Khí hậu",
  level: "pet",
  duration: 50,
  totalQuestions: 32,
  questions: build(p7Rw, p7Ls),
};

/* ================ PET 8 - Media & Social Networks ================ */
const p8PassageA =
  "A recent survey of teenagers found that most of them check their phones more than eighty times a day, mainly to look at messages and social media apps. While many young people say these platforms help them stay connected with friends who live far away, researchers have noticed a worrying rise in anxiety linked to constant comparison with other people's lives online. Several schools have therefore introduced short workshops teaching students how to use social media more mindfully, including setting time limits and switching off notifications during homework. Interestingly, some students who took part in these workshops reported feeling calmer within just a few weeks, and a few even decided to delete certain apps completely. Experts stress that social media itself is not the enemy; the real challenge is learning how to use it in a balanced, healthy way rather than letting it control daily life.";

const p8PassageB =
  "Hi Tom, thanks for asking about my new job at the local radio station! It's honestly nothing like I expected. Most people imagine radio presenters just chat casually into a microphone, but there's so much preparation involved. Before every show, I have to research the news stories we'll discuss, write short scripts for the adverts, and check that all the music has the correct rights. Last Friday, a guest cancelled at the last minute, so I had to interview a local musician instead, with almost no notice! It was terrifying at first, but it turned out to be one of the best interviews we've had this month. My manager says that being able to react calmly when plans change is one of the most important skills in this industry. I still can't believe people are actually listening to me every morning. Let's catch up properly soon - Amy";

const p8Rw: Tuple[] = [
  ["How often do teenagers check their phones, according to the survey?", ["less than ten times a day", "about forty times a day", "more than eighty times a day", "only in the evening"], 2, "The survey found teenagers check their phones more than eighty times a day.", "Khảo sát cho thấy thanh thiếu niên kiểm tra điện thoại hơn tám mươi lần một ngày.", p8PassageA],
  ["What have researchers noticed?", ["teenagers reading more books", "a rise in anxiety linked to online comparison", "fewer people using phones", "improved sleeping habits"], 1, "Researchers noticed a rise in anxiety linked to constant comparison online.", "Các nhà nghiên cứu nhận thấy sự gia tăng lo âu do so sánh liên tục trên mạng.", p8PassageA],
  ["What have some schools introduced?", ["longer school days", "workshops on mindful social media use", "a ban on all phones forever", "extra homework"], 1, "Schools have introduced workshops teaching mindful social media use.", "Các trường đã tổ chức các buổi hội thảo dạy sử dụng mạng xã hội có ý thức.", p8PassageA],
  ["What happened after some students attended the workshops?", ["they felt calmer within weeks", "they became more anxious", "they stopped using phones completely", "nothing changed at all"], 0, "Some students reported feeling calmer within just a few weeks.", "Một số học sinh cho biết cảm thấy bình tĩnh hơn chỉ sau vài tuần.", p8PassageA],
  ["What is the real challenge, according to experts?", ["banning social media entirely", "using it in a balanced, healthy way", "spending more time online", "avoiding all friends"], 1, "Experts say the real challenge is using social media in a balanced way.", "Các chuyên gia nói thách thức thực sự là sử dụng mạng xã hội một cách cân bằng.", p8PassageA],
  ["What was different about Amy's job than she expected?", ["it pays less than expected", "there is far more preparation than she thought", "she never meets guests", "it requires no writing"], 1, "She found there was far more preparation involved than she expected.", "Cô nhận thấy có nhiều sự chuẩn bị hơn nhiều so với cô nghĩ.", p8PassageB],
  ["What does Amy do before every show?", ["sleep late", "research news and write scripts", "clean the studio", "interview her manager"], 1, "She researches news stories and writes short scripts before every show.", "Cô nghiên cứu tin tức và viết kịch bản ngắn trước mỗi chương trình.", p8PassageB],
  ["What happened last Friday?", ["a guest cancelled and she interviewed a musician instead", "the radio station closed", "she lost her script", "the show was cancelled"], 0, "A guest cancelled, so she interviewed a local musician instead.", "Một khách mời hủy nên cô phỏng vấn một nhạc sĩ địa phương thay thế.", p8PassageB],
  ["How did the unplanned interview turn out?", ["it was a disaster", "it was one of the best interviews that month", "nobody listened to it", "it had to be cancelled"], 1, "It turned out to be one of the best interviews they've had that month.", "Hóa ra đó là một trong những cuộc phỏng vấn hay nhất trong tháng.", p8PassageB],
  ["What skill does Amy's manager value most?", ["speaking loudly", "reacting calmly when plans change", "arriving early", "writing music"], 1, "Her manager says reacting calmly to changes is a key skill in the industry.", "Quản lý của cô nói phản ứng bình tĩnh khi kế hoạch thay đổi là kỹ năng quan trọng.", p8PassageB],
  ["The news was ___ by millions of people within an hour.", ["shared", "share", "sharing", "shares"], 0, "Passive voice: was + past participle.", "Thể bị động: was + phân từ hai.", ],
  ["If she ___ her phone at night, she would sleep better.", ["turns off", "turned off", "turn off", "had turn off"], 1, "Second conditional: if + past simple, would + base verb.", "Câu điều kiện loại 2: if + quá khứ đơn, would + động từ nguyên mẫu.", ],
  ["He told me that he ___ posting so often on social media.", ["stops", "stopped", "had stopped", "stopping"], 2, "Reported speech: present perfect shifts to past perfect.", "Câu tường thuật: hiện tại hoàn thành chuyển thành quá khứ hoàn thành.", ],
  ["Being famous online can put a lot of ___ on young people.", ["pressure", "power", "pretend", "promise"], 0, "'Put pressure on someone' is a fixed collocation.", "'Put pressure on someone' là cụm cố định.", ],
  ["Closest meaning to 'go viral':", ["become extremely popular online quickly", "become sick", "disappear completely", "be deleted"], 0, "'Go viral' means to spread very quickly and become popular online.", "'Go viral' nghĩa là lan truyền rất nhanh và trở nên phổ biến trên mạng.", ],
  ["The article was ___ written by an award-winning journalist.", ["actual", "actually", "act", "acting"], 1, "We need an adverb to modify the verb 'written'.", "Cần trạng từ để bổ nghĩa cho động từ 'written'.", ],
  ["If the app ___ collect so much data, people would trust it more.", ["doesn't", "didn't", "hadn't", "won't"], 1, "Second conditional: if + past simple, would + base verb.", "Câu điều kiện loại 2: if + quá khứ đơn, would + động từ nguyên mẫu.", ],
  ["She asked him if he ___ ever used that app before.", ["has", "had", "have", "having"], 1, "Reported speech shifts present perfect to past perfect.", "Câu tường thuật chuyển hiện tại hoàn thành thành quá khứ hoàn thành.", ],
  ["Many influencers are paid ___ promote products online.", ["for", "to", "on", "with"], 1, "'Paid to do something' is the correct infinitive structure.", "'Paid to do something' là cấu trúc động từ nguyên mẫu đúng.", ],
  ["The photo had been ___ before it was posted.", ["edit", "edited", "editing", "edits"], 1, "Passive voice past perfect: had been + past participle.", "Bị động ở thì quá khứ hoàn thành: had been + phân từ hai.", ],
  ["It's important to think ___ before sharing personal information.", ["twice", "two", "second", "twin"], 0, "'Think twice' is a fixed idiomatic expression.", "'Think twice' là cụm thành ngữ cố định.", ],
  ["The company was criticised ___ selling users' data.", ["of", "for", "on", "at"], 1, "'Criticise someone for something' is the correct preposition.", "'Criticise someone for something' là giới từ đúng.", ],
];

const p8Ls: Tuple[] = [
  ["What is the boy complaining about?", ["too much homework", "his phone battery dying quickly", "his friend not replying", "school starting early"], 2, "He is complaining that his friend hasn't replied to his messages.", "Cậu bé phàn nàn rằng bạn mình chưa trả lời tin nhắn.", "Listen: 'I've sent three messages and he still hasn't replied - it's a bit annoying.'"],
  ["What does the woman recommend?", ["deleting all social media", "taking regular breaks from screens", "buying a new phone", "watching more videos"], 1, "She recommends taking regular breaks from screens.", "Cô ấy khuyên nên nghỉ ngơi thường xuyên khỏi màn hình.", "Listen: 'Honestly, I think everyone should take regular breaks from their screens during the day.'"],
  ["What show is the man talking about?", ["a cooking programme", "a new podcast about technology", "a football match", "a music concert"], 1, "He is talking about a new podcast about technology.", "Anh ấy đang nói về một podcast mới về công nghệ.", "Listen: 'Have you heard the new podcast about technology? It's really informative.'"],
  ["Why was the online class cancelled?", ["the teacher was ill", "there was a problem with the internet connection", "the students forgot", "it finished early"], 1, "The class was cancelled because of an internet connection problem.", "Lớp học bị hủy vì sự cố kết nối internet.", "Listen: 'Unfortunately today's online class is cancelled because of a problem with the internet connection.'"],
  ["What does the girl say about her new followers?", ["she doesn't care about them", "she gained a thousand in one week", "she lost most of them", "she never checks the number"], 1, "She says she gained a thousand new followers in one week.", "Cô ấy nói đã có thêm một nghìn người theo dõi trong một tuần.", "Listen: 'I can't believe it - I gained a thousand new followers in just one week!'"],
  ["What advice does the presenter give about passwords?", ["use the same one everywhere", "change them regularly and keep them secret", "write them on paper", "share them with friends"], 1, "She advises changing passwords regularly and keeping them secret.", "Cô khuyên nên đổi mật khẩu thường xuyên và giữ bí mật.", "Listen: 'Remember to change your passwords regularly and never share them with anyone.'"],
  ["What is the main topic of the news report?", ["a new film release", "fake news spreading online", "a sports event", "a weather forecast"], 1, "The report is about fake news spreading online.", "Bản tin nói về tin giả lan truyền trên mạng.", "Listen: 'Tonight's report looks at how quickly fake news can spread across social media.'"],
  ["What has the school decided about phones?", ["they are now completely banned", "students may use them only at lunchtime", "students can use them anytime", "phones are required in class"], 1, "Students may only use phones at lunchtime.", "Học sinh chỉ được dùng điện thoại vào giờ ăn trưa.", "Listen: 'From next week, students will only be allowed to use their phones at lunchtime.'"],
  ["Why does the man like the new messaging app?", ["it is free", "it lets him make video calls easily", "it has more games", "it uses less battery"], 1, "He likes that it lets him make video calls easily.", "Anh ấy thích vì nó cho phép gọi video dễ dàng.", "Listen: 'What I really like about this app is how easy it is to make video calls with friends.'"],
  ["What does the speaker suggest doing before posting a comment?", ["posting immediately", "reading it twice and thinking about the effect", "asking a stranger", "deleting the app"], 1, "She suggests reading a comment twice and thinking about its effect before posting.", "Cô đề nghị đọc lại bình luận hai lần và nghĩ về tác động trước khi đăng.", "Listen: 'Before you post any comment, read it twice and think about how it might affect someone.'"],
];

const pet8: CambridgeMockExam = {
  id: "cambridge-pet-8",
  title: "PET Mock Test 8 - Media & Social Networks",
  titleVi: "Đề thi thử PET 8 - Truyền thông & Mạng xã hội",
  level: "pet",
  duration: 50,
  totalQuestions: 32,
  questions: build(p8Rw, p8Ls),
};

/* ================ PET 9 - Health & Lifestyle ================ */
const p9PassageA =
  "Doctors have long recommended that adults get at least seven hours of sleep each night, yet a growing number of studies show that many teenagers are getting far less than that because of homework, part-time jobs, and late-night phone use. Sleep specialists warn that this lack of rest can affect concentration, mood, and even long-term health, since the body repairs itself mostly during deep sleep. To tackle the problem, some schools have started later, allowing students an extra hour in bed before lessons begin. Early results suggest that students at these schools are more alert in morning classes and report feeling less stressed overall. Nutritionists add that diet also plays an important role: eating regular, balanced meals rather than skipping breakfast can significantly improve energy levels throughout the day. Taken together, these small changes could make a real difference to how young people feel, think, and perform at school.";

const p9PassageB =
  "Dear Aunt Rosa, I wanted to share some good news - I've finally taken up running, just like you suggested last year! At first I could barely manage ten minutes without stopping, but I've been following a simple training plan and now I can run for almost forty minutes without a break. What surprised me most is how much better I sleep afterwards, and I have far more energy during the day, even though I'm exercising. My doctor said that regular exercise can also improve mood, which I definitely believe now, since I feel much calmer than before exams. Next month a few friends and I are planning to enter a local five-kilometre race to raise money for the children's hospital. I never imagined I would enjoy exercise this much! Thank you for encouraging me to try it. Lots of love, Elena";

const p9Rw: Tuple[] = [
  ["How much sleep do doctors recommend for adults?", ["five hours", "six hours", "at least seven hours", "ten hours"], 2, "Doctors recommend at least seven hours of sleep each night.", "Bác sĩ khuyên nên ngủ ít nhất bảy tiếng mỗi đêm.", p9PassageA],
  ["Why are many teenagers not getting enough sleep?", ["they sleep too much already", "homework, jobs, and late-night phone use", "schools start too late", "they have too little homework"], 1, "Homework, part-time jobs, and late-night phone use reduce their sleep.", "Bài tập, công việc bán thời gian và dùng điện thoại khuya làm giảm giấc ngủ.", p9PassageA],
  ["What happens to the body during deep sleep?", ["it stops growing", "it repairs itself", "it becomes weaker", "it stores more fat"], 1, "The body repairs itself mostly during deep sleep.", "Cơ thể phần lớn tự phục hồi trong giấc ngủ sâu.", p9PassageA],
  ["What have some schools done to help?", ["cancelled homework", "started lessons later", "removed breakfast breaks", "shortened the school week"], 1, "Some schools have started later to give students more sleep.", "Một số trường bắt đầu học muộn hơn để học sinh ngủ nhiều hơn.", p9PassageA],
  ["What do nutritionists say about breakfast?", ["it should be skipped", "eating regular meals improves energy", "only fruit should be eaten", "it has no effect on energy"], 1, "Nutritionists say eating regular, balanced meals improves energy levels.", "Các chuyên gia dinh dưỡng nói ăn uống đều đặn, cân bằng giúp tăng năng lượng.", p9PassageA],
  ["What activity did Elena take up?", ["swimming", "running", "cycling", "yoga"], 1, "Elena took up running, as her aunt had suggested.", "Elena bắt đầu chạy bộ, như lời khuyên của dì cô.", p9PassageB],
  ["How long could Elena run at first?", ["barely ten minutes", "twenty minutes", "thirty minutes", "forty minutes"], 0, "At first she could barely manage ten minutes without stopping.", "Ban đầu cô chỉ chạy được khoảng mười phút mà không nghỉ.", p9PassageB],
  ["What surprised Elena most about running?", ["how tired she felt", "how much better she sleeps and how much more energy she has", "how expensive shoes are", "how boring it is"], 1, "She was surprised by how much better she sleeps and her extra energy.", "Cô ngạc nhiên vì ngủ ngon hơn và có nhiều năng lượng hơn.", p9PassageB],
  ["What did Elena's doctor say about exercise?", ["it has no benefits", "it can improve mood", "it is dangerous for students", "it only helps athletes"], 1, "The doctor said regular exercise can also improve mood.", "Bác sĩ nói tập thể dục đều đặn cũng có thể cải thiện tâm trạng.", p9PassageB],
  ["What are Elena and her friends planning to do next month?", ["go on holiday", "enter a five-kilometre race for charity", "stop exercising", "start a new diet"], 1, "They are planning to enter a local five-kilometre charity race.", "Họ dự định tham gia cuộc chạy năm ki-lô-mét gây quỹ từ thiện.", p9PassageB],
  ["If people ate more vegetables, they ___ healthier.", ["will be", "would be", "are", "were"], 1, "Second conditional: if + past simple, would + base verb.", "Câu điều kiện loại 2: if + quá khứ đơn, would + động từ nguyên mẫu.", ],
  ["The patient ___ examined by the doctor this morning.", ["was", "is being", "were", "has"], 0, "Passive voice: was + past participle (examined).", "Bị động: was + phân từ hai (examined).", ],
  ["He said that he ___ feeling much better since he started jogging.", ["is", "was", "has been", "had been"], 3, "Reported speech: present perfect continuous shifts to past perfect continuous.", "Câu tường thuật: hiện tại hoàn thành tiếp diễn chuyển thành quá khứ hoàn thành tiếp diễn.", ],
  ["Eating too much sugar can lead ___ health problems.", ["to", "for", "with", "at"], 0, "'Lead to' is the correct fixed phrase.", "'Lead to' là cụm cố định đúng.", ],
  ["Closest meaning to 'exhausted':", ["extremely tired", "slightly hungry", "very happy", "quite bored"], 0, "'Exhausted' means extremely tired.", "'Exhausted' nghĩa là rất mệt.", ],
  ["If she ___ more water, she wouldn't get headaches so often.", ["drinks", "drank", "had drunk", "drink"], 1, "Second conditional: if + past simple, would + base verb.", "Câu điều kiện loại 2: if + quá khứ đơn, would + động từ nguyên mẫu.", ],
  ["The nurse asked me ___ I had eaten breakfast.", ["that", "if", "what", "so"], 1, "Reported yes/no questions use 'if' or 'whether'.", "Câu hỏi tường thuật dạng có/không dùng 'if' hoặc 'whether'.", ],
  ["A balanced diet is ___ for maintaining good health.", ["essential", "essentially", "essence", "essentials"], 0, "We need the adjective form to describe the noun phrase.", "Cần dạng tính từ để miêu tả danh từ.", ],
  ["Vitamins are ___ found in fresh fruit and vegetables.", ["commonly", "common", "commoner", "commonness"], 0, "An adverb is needed to modify the passive verb 'found'.", "Cần trạng từ để bổ nghĩa cho động từ bị động 'found'.", ],
  ["The gym membership was ___ up by her parents as a birthday gift.", ["set", "sets", "setting", "sat"], 0, "'Set up' means to arrange or organise something.", "'Set up' nghĩa là sắp xếp hoặc tổ chức điều gì đó.", ],
  ["He gave ___ smoking after reading about its effects.", ["up", "off", "in", "out"], 0, "'Give up' means to stop doing something.", "'Give up' nghĩa là ngừng làm điều gì đó.", ],
  ["Regular exercise helps to ___ stress levels.", ["reduce", "rise", "raise", "increase"], 0, "'Reduce stress levels' is the correct collocation here.", "'Reduce stress levels' là cụm từ đúng ở đây.", ],
];

const p9Ls: Tuple[] = [
  ["What is the man's problem?", ["he can't sleep well", "he has a broken leg", "he lost his gym bag", "he forgot his appointment"], 0, "He says he has been having trouble sleeping recently.", "Anh ấy nói gần đây bị khó ngủ.", "Listen: 'I've been having real trouble sleeping recently - I lie awake for hours.'"],
  ["What does the doctor recommend?", ["taking more medicine", "cutting down on caffeine in the evening", "sleeping less", "exercising less"], 1, "The doctor recommends cutting down on caffeine in the evening.", "Bác sĩ khuyên nên giảm caffeine vào buổi tối.", "Listen: 'I'd suggest cutting down on caffeine in the evening - that could really help.'"],
  ["Why is the woman changing her diet?", ["to save money", "to have more energy", "because she is ill", "her doctor forced her"], 1, "She wants to have more energy through a healthier diet.", "Cô ấy muốn có nhiều năng lượng hơn thông qua chế độ ăn lành mạnh.", "Listen: 'I've decided to change my diet because I just want to have more energy every day.'"],
  ["What sport does the boy want to try?", ["basketball", "swimming", "tennis", "cycling"], 1, "He wants to try swimming this summer.", "Cậu ấy muốn thử bơi lội vào mùa hè này.", "Listen: 'This summer I really want to try swimming - I've never learned properly.'"],
  ["What time does the gym open on Sundays?", ["seven", "eight", "nine", "ten"], 2, "The gym opens at nine on Sundays.", "Phòng gym mở cửa lúc chín giờ vào Chủ nhật.", "Listen: 'Just to remind everyone, on Sundays the gym opens a bit later, at nine.'"],
  ["Why did the speaker start yoga?", ["to lose weight", "to reduce stress before exams", "her friend forced her", "for a school project"], 1, "She started yoga to reduce stress before her exams.", "Cô bắt đầu tập yoga để giảm căng thẳng trước kỳ thi.", "Listen: 'I started yoga last month mainly to reduce my stress before exams, and it really works.'"],
  ["What food does the nutritionist recommend for breakfast?", ["cake", "porridge with fruit", "crisps", "nothing at all"], 1, "She recommends porridge with fruit for a healthy breakfast.", "Cô khuyên nên ăn cháo yến mạch với trái cây vào bữa sáng.", "Listen: 'A great breakfast choice is porridge with some fresh fruit on top.'"],
  ["Why was the football match cancelled?", ["bad weather", "an injured player", "lack of players", "the pitch was closed"], 0, "The match was cancelled because of bad weather.", "Trận đấu bị hủy vì thời tiết xấu.", "Listen: 'I'm afraid this afternoon's match has been cancelled because of the bad weather.'"],
  ["What does the speaker say about walking?", ["it's boring", "it's an easy way to stay active", "it takes too much time", "it's bad for your knees"], 1, "She says walking is an easy and accessible way to stay active.", "Cô nói đi bộ là cách dễ dàng để duy trì vận động.", "Listen: 'Walking is one of the easiest ways to stay active - you don't even need special equipment.'"],
  ["What is the man planning to do this evening?", ["go to bed early", "cook a healthy meal", "watch television all night", "go to a party"], 1, "He is planning to cook a healthy meal this evening.", "Anh ấy dự định nấu một bữa ăn lành mạnh vào tối nay.", "Listen: 'Tonight I'm planning to cook a really healthy meal with lots of vegetables.'"],
];

const pet9: CambridgeMockExam = {
  id: "cambridge-pet-9",
  title: "PET Mock Test 9 - Health & Lifestyle",
  titleVi: "Đề thi thử PET 9 - Sức khỏe & Lối sống",
  level: "pet",
  duration: 50,
  totalQuestions: 32,
  questions: build(p9Rw, p9Ls),
};

/* ================ PET 10 - Travel & Cultures ================ */
const p10PassageA =
  "Travelling abroad used to be something only wealthy families could afford, but budget airlines and cheaper accommodation have made it possible for many more people to explore other countries. This has brought clear benefits: travellers often say that experiencing a different culture firsthand helps them understand the world in a way that books and videos simply cannot. However, some experts worry that certain popular destinations are suffering from what is now called overtourism, where enormous numbers of visitors damage historic sites, push up local prices, and disturb the daily lives of residents. A number of cities have started limiting the number of tourists allowed to visit certain areas each day, while others charge a small tourist tax that is used to protect local heritage. Responsible travellers, meanwhile, are increasingly choosing quieter destinations and trying to learn a little of the local language before they arrive, which is often warmly appreciated by the people they meet.";

const p10PassageB =
  "Hi Marco, I finally arrived in Kyoto after that incredibly long flight, and I already have so much to tell you! Yesterday I visited an old temple that was built more than eight hundred years ago, and I was amazed by how peaceful it felt despite being surrounded by such a busy city. In the evening, my host family taught me how to make traditional dumplings, which was much harder than it looked on television. They explained that in their culture, sharing a meal together is seen as one of the most important ways of showing respect and friendship. Tomorrow we're taking a train to the mountains to see a small village where almost nobody speaks English, so I've been practising a few useful phrases every night before bed. Honestly, I was nervous about coming here alone, but everyone has been so welcoming that I already feel completely at home. I'll send photos soon! Speak soon, Elena";

const p10Rw: Tuple[] = [
  ["What has made travel more affordable for more people?", ["higher salaries", "budget airlines and cheaper accommodation", "government grants", "shorter working hours"], 1, "Budget airlines and cheaper accommodation have made travel more affordable.", "Các hãng hàng không giá rẻ và chỗ ở rẻ hơn đã làm du lịch phải chăng hơn.", p10PassageA],
  ["What do travellers say about experiencing other cultures?", ["it is a waste of time", "it helps them understand the world better than books can", "it is too expensive", "it is always disappointing"], 1, "Travellers say experiencing a culture firsthand helps them understand the world better than books.", "Du khách nói trải nghiệm văn hóa trực tiếp giúp hiểu thế giới tốt hơn sách vở.", p10PassageA],
  ["What is 'overtourism'?", ["too few tourists visiting", "huge numbers of tourists damaging places and disturbing residents", "tourists spending too little money", "airlines being too expensive"], 1, "Overtourism is when huge numbers of visitors damage sites and disturb local life.", "Overtourism là khi lượng du khách quá đông làm hư hại di tích và ảnh hưởng cư dân.", p10PassageA],
  ["What have some cities done to manage tourism?", ["closed completely to visitors", "limited visitor numbers or introduced a tourist tax", "banned all hotels", "stopped all flights"], 1, "Some cities limit tourist numbers or charge a tourist tax.", "Một số thành phố giới hạn số lượng du khách hoặc thu thuế du lịch.", p10PassageA],
  ["What do responsible travellers increasingly do?", ["visit only famous cities", "choose quieter destinations and learn local phrases", "avoid learning languages", "travel in huge groups"], 1, "Responsible travellers choose quieter places and learn some local language.", "Du khách có trách nhiệm chọn nơi yên tĩnh hơn và học vài câu tiếng địa phương.", p10PassageA],
  ["How old is the temple Elena visited?", ["fifty years old", "two hundred years old", "more than eight hundred years old", "one thousand years old"], 2, "The temple was built more than eight hundred years ago.", "Ngôi đền được xây dựng hơn tám trăm năm trước.", p10PassageB],
  ["What did Elena's host family teach her?", ["how to speak Japanese fluently", "how to make traditional dumplings", "how to paint", "how to play music"], 1, "They taught her how to make traditional dumplings.", "Họ dạy cô cách làm bánh bao truyền thống.", p10PassageB],
  ["What is important in the host family's culture?", ["eating alone", "sharing a meal together", "avoiding guests", "eating very quickly"], 1, "Sharing a meal together is seen as important for showing respect and friendship.", "Cùng chia sẻ bữa ăn được coi là cách quan trọng thể hiện sự tôn trọng và tình bạn.", p10PassageB],
  ["What is Elena planning to do tomorrow?", ["fly home", "take a train to a mountain village", "visit another temple", "go shopping"], 1, "Tomorrow she is taking a train to the mountains to see a small village.", "Ngày mai cô sẽ đi tàu lên núi để thăm một ngôi làng nhỏ.", p10PassageB],
  ["How does Elena feel about her trip so far?", ["nervous and unhappy", "welcomed and at home", "bored", "confused"], 1, "She feels completely at home because everyone has been so welcoming.", "Cô cảm thấy hoàn toàn thoải mái vì mọi người rất thân thiện.", p10PassageB],
  ["If we ___ earlier, we would have caught the train.", ["leave", "left", "had left", "leaving"], 2, "Third conditional: if + past perfect, would + have + past participle.", "Câu điều kiện loại 3: if + quá khứ hoàn thành, would + have + phân từ hai.", ],
  ["The museum ___ visited by thousands of tourists every year.", ["is", "are", "was being", "be"], 0, "Passive voice present simple: is + past participle.", "Bị động thì hiện tại đơn: is + phân từ hai.", ],
  ["She told me that she ___ never been to Japan before.", ["has", "had", "have", "having"], 1, "Reported speech: present perfect shifts to past perfect.", "Câu tường thuật: hiện tại hoàn thành chuyển thành quá khứ hoàn thành.", ],
  ["It's important to respect local ___ when travelling abroad.", ["customs", "custom", "customary", "customise"], 0, "'Customs' means traditional practices, correct noun form here.", "'Customs' nghĩa là phong tục, đúng dạng danh từ ở đây.", ],
  ["Closest meaning to 'off the beaten track':", ["very famous", "not visited by many tourists", "extremely expensive", "dangerous"], 1, "'Off the beaten track' means a place not often visited by tourists.", "'Off the beaten track' nghĩa là nơi ít du khách ghé thăm.", ],
  ["If she ___ the local language, she would communicate more easily.", ["learns", "learned", "had learned", "learn"], 1, "Second conditional: if + past simple, would + base verb.", "Câu điều kiện loại 2: if + quá khứ đơn, would + động từ nguyên mẫu.", ],
  ["He asked the guide ___ the tour would start.", ["that", "when", "what", "which"], 1, "Reported wh-question keeps the question word 'when'.", "Câu hỏi tường thuật với từ để hỏi giữ nguyên 'when' (khi nào).", ],
  ["Passengers are asked to check ___ two hours before departure.", ["in", "on", "up", "over"], 0, "'Check in' is the correct phrasal verb for airports.", "'Check in' là cụm động từ đúng dùng ở sân bay.", ],
  ["The ancient ruins were ___ discovered by a farmer in 1920.", ["accident", "accidentally", "accidental", "accidents"], 1, "An adverb is needed to modify the passive verb 'discovered'.", "Cần trạng từ để bổ nghĩa cho động từ bị động 'discovered'.", ],
  ["Many travellers try to immerse themselves ___ the local culture.", ["in", "on", "at", "with"], 0, "'Immerse oneself in' is the correct fixed phrase.", "'Immerse oneself in' là cụm cố định đúng.", ],
  ["The flight was ___ delayed because of bad weather.", ["heavy", "heavily", "heaviness", "heavier"], 1, "An adverb is needed to modify the passive verb 'delayed'.", "Cần trạng từ để bổ nghĩa cho động từ bị động 'delayed'.", ],
];

const p10Ls: Tuple[] = [
  ["Where is the woman planning to go on holiday?", ["Spain", "Portugal", "Italy", "Greece"], 2, "She says she is planning a trip to Italy next summer.", "Cô ấy nói đang lên kế hoạch đi Ý vào mùa hè tới.", "Listen: 'I'm really excited - I'm planning a trip to Italy next summer with my sister.'"],
  ["What does the man recommend for the trip?", ["taking a lot of cash", "learning a few phrases in the local language", "avoiding local food", "flying business class"], 1, "He recommends learning a few phrases in the local language.", "Anh ấy khuyên nên học một vài câu bằng tiếng địa phương.", "Listen: 'Honestly, I'd learn a few basic phrases in the language - locals really appreciate it.'"],
  ["What time does the train to the coast leave?", ["8:15", "8:50", "9:15", "9:50"], 2, "The train to the coast leaves at 9:15.", "Chuyến tàu ra biển khởi hành lúc 9:15.", "Listen: 'The next train to the coast leaves at nine fifteen from platform four.'"],
  ["Why was the tour guide's talk interesting?", ["it was very short", "she explained the history of the old town", "it was about food only", "nobody attended"], 1, "She explained the history of the old town in detail.", "Cô ấy giải thích chi tiết lịch sử của phố cổ.", "Listen: 'Our guide gave a fascinating talk about the history of the old town.'"],
  ["What problem did the traveller have at the airport?", ["missed flight", "lost luggage", "no passport", "cancelled hotel"], 1, "Her luggage was lost at the airport.", "Hành lý của cô bị thất lạc ở sân bay.", "Listen: 'When I arrived, I discovered my luggage had been lost somewhere along the way.'"],
  ["What did the couple enjoy most about their trip?", ["the hotel", "trying local food", "the weather", "shopping"], 1, "They enjoyed trying the local food the most.", "Họ thích nhất là được thử món ăn địa phương.", "Listen: 'What we loved most was trying all the different local dishes wherever we went.'"],
  ["What does the speaker say about the festival?", ["it happens every day", "it takes place once a year in spring", "it was cancelled this year", "it is only for children"], 1, "The festival takes place once a year, in spring.", "Lễ hội diễn ra một lần mỗi năm vào mùa xuân.", "Listen: 'This wonderful festival takes place just once a year, always in the spring.'"],
  ["Why is the man staying with a local family?", ["hotels were fully booked", "he wants to learn about the culture directly", "it was cheaper by mistake", "his friend suggested it randomly"], 1, "He wants to learn about the culture directly by staying with a family.", "Anh ấy muốn tìm hiểu văn hóa trực tiếp bằng cách ở cùng một gia đình.", "Listen: 'I chose to stay with a local family because I really want to learn about the culture directly.'"],
  ["What does the tour operator warn about?", ["bad weather only", "pickpockets in crowded areas", "closed museums", "expensive taxis"], 1, "The operator warns about pickpockets in crowded tourist areas.", "Người điều hành tour cảnh báo về móc túi ở khu vực đông đúc.", "Listen: 'Please be careful of pickpockets, especially in crowded tourist areas.'"],
  ["What is the woman looking forward to most?", ["the flight", "visiting her grandparents' home village", "shopping in the city", "the hotel pool"], 1, "She is most looking forward to visiting her grandparents' home village.", "Cô mong chờ nhất là đến thăm ngôi làng quê của ông bà mình.", "Listen: 'What I'm most looking forward to is finally visiting my grandparents' home village.'"],
];

const pet10: CambridgeMockExam = {
  id: "cambridge-pet-10",
  title: "PET Mock Test 10 - Travel & Cultures",
  titleVi: "Đề thi thử PET 10 - Du lịch & Văn hóa",
  level: "pet",
  duration: 50,
  totalQuestions: 32,
  questions: build(p10Rw, p10Ls),
};

/* ================ PET 11 - City Life & Community ================ */
const p11PassageA =
  "Over the past decade, many cities have redesigned their centres to make them friendlier for pedestrians and cyclists rather than cars. Streets that were once filled with traffic have been turned into open squares with benches, trees, and small markets, and residents say the change has made these areas feel much safer and more sociable. Local businesses were initially worried that fewer cars would mean fewer customers, but studies later showed that pedestrian-friendly streets often attract more shoppers, since people are more likely to stop and browse when they are not worried about traffic. Community groups have also organised weekend events, such as free concerts and craft markets, which bring neighbours together who might otherwise never meet. Of course, not everyone has been happy with the changes, particularly delivery drivers who complain about longer routes, but most city planners argue that the long-term benefits for public health and community life far outweigh these inconveniences.";

const p11PassageB =
  "Dear Mr. Alvarez, I am writing on behalf of the residents of Maple Street to raise a concern about the proposed new car park that the council plans to build behind our houses. While we understand that parking is limited in this part of the city, we are worried that the construction will remove the small community garden that many families, including elderly residents, use every week. This garden has become an important meeting place, especially since the closure of the community centre last year. We would like to suggest an alternative: converting the currently unused land near the old railway station into parking instead, which would leave our garden untouched. Several neighbours have already collected over two hundred signatures supporting this idea, and we would be very grateful if the council could consider it before making a final decision. We would welcome the opportunity to discuss this further at your convenience. Yours sincerely, Grace Whitfield";

const p11Rw: Tuple[] = [
  ["What have many cities done to their centres?", ["built more roads for cars", "redesigned them for pedestrians and cyclists", "closed them completely", "turned them into car parks"], 1, "Cities have redesigned centres to be friendlier for pedestrians and cyclists.", "Các thành phố đã thiết kế lại trung tâm để thân thiện hơn với người đi bộ và xe đạp.", p11PassageA],
  ["What were local businesses initially worried about?", ["higher taxes", "fewer cars meaning fewer customers", "noise from concerts", "losing staff"], 1, "Businesses worried that fewer cars would mean fewer customers.", "Các doanh nghiệp lo ngại ít ô tô hơn sẽ dẫn đến ít khách hàng hơn.", p11PassageA],
  ["What did studies later show?", ["shops closed down", "pedestrian-friendly streets attract more shoppers", "traffic increased", "prices fell sharply"], 1, "Studies showed pedestrian-friendly streets often attract more shoppers.", "Các nghiên cứu cho thấy phố đi bộ thường thu hút nhiều người mua sắm hơn.", p11PassageA],
  ["What have community groups organised?", ["traffic surveys", "weekend concerts and craft markets", "new bus routes", "car repair workshops"], 1, "Community groups have organised weekend concerts and craft markets.", "Các nhóm cộng đồng đã tổ chức các buổi hòa nhạc và chợ thủ công cuối tuần.", p11PassageA],
  ["Who has complained about the changes?", ["shoppers", "delivery drivers", "cyclists", "children"], 1, "Delivery drivers complain about longer routes because of the changes.", "Tài xế giao hàng phàn nàn về tuyến đường dài hơn do những thay đổi này.", p11PassageA],
  ["Why is Grace writing to the council?", ["to complain about noise", "to raise concerns about a proposed car park", "to ask for a new school", "to request more buses"], 1, "She is writing to raise concerns about the proposed new car park.", "Cô viết thư để bày tỏ lo ngại về bãi đỗ xe mới được đề xuất.", p11PassageB],
  ["What would the new car park remove?", ["a bus stop", "the community garden", "a school building", "a library"], 1, "The new car park would remove the small community garden.", "Bãi đỗ xe mới sẽ xóa bỏ khu vườn cộng đồng nhỏ.", p11PassageB],
  ["Why has the garden become more important recently?", ["it is newly built", "the community centre closed last year", "it won an award", "more tourists visit it"], 1, "The garden became more important since the community centre closed last year.", "Khu vườn trở nên quan trọng hơn kể từ khi trung tâm cộng đồng đóng cửa năm ngoái.", p11PassageB],
  ["What alternative does Grace suggest?", ["cancelling the car park entirely", "using unused land near the old railway station", "building underground parking", "reducing the number of cars in the city"], 1, "She suggests using the unused land near the old railway station instead.", "Cô đề xuất sử dụng khu đất bỏ hoang gần ga xe lửa cũ thay thế.", p11PassageB],
  ["How many signatures have neighbours collected?", ["fifty", "one hundred", "over two hundred", "one thousand"], 2, "Neighbours have collected over two hundred signatures.", "Hàng xóm đã thu thập được hơn hai trăm chữ ký.", p11PassageB],
  ["If the council ___ the garden, residents would be very upset.", ["removes", "removed", "had removed", "remove"], 1, "Second conditional: if + past simple, would + base verb.", "Câu điều kiện loại 2: if + quá khứ đơn, would + động từ nguyên mẫu.", ],
  ["The new park ___ opened by the mayor last week.", ["was", "is", "were", "be"], 0, "Passive voice past simple: was + past participle.", "Bị động thì quá khứ đơn: was + phân từ hai.", ],
  ["She said that the meeting ___ postponed until next Tuesday.", ["is", "was", "has been", "had been"], 3, "Reported speech: present perfect shifts to past perfect.", "Câu tường thuật: hiện tại hoàn thành chuyển thành quá khứ hoàn thành.", ],
  ["The council needs to take ___ action to fix the roads.", ["immediate", "immediately", "immediateness", "immediacy"], 0, "We need the adjective form to describe the noun 'action'.", "Cần dạng tính từ để miêu tả danh từ 'action'.", ],
  ["Closest meaning to 'neighbourhood':", ["a single house", "the area around where someone lives", "a type of shop", "a government office"], 1, "'Neighbourhood' means the area surrounding where someone lives.", "'Neighbourhood' nghĩa là khu vực xung quanh nơi ai đó sinh sống.", ],
  ["If more parks ___ built, cities would be greener.", ["are", "were", "had been", "be"], 1, "Second conditional: if + past simple, would + base verb.", "Câu điều kiện loại 2: if + quá khứ đơn, would + động từ nguyên mẫu.", ],
  ["He asked what time the community meeting ___.", ["starts", "started", "start", "starting"], 1, "Reported wh-question: present simple shifts to past simple.", "Câu hỏi tường thuật: hiện tại đơn chuyển thành quá khứ đơn.", ],
  ["The residents decided to speak ___ against the new plan.", ["out", "up", "off", "away"], 0, "'Speak out' means to express opinions publicly and firmly.", "'Speak out' nghĩa là bày tỏ ý kiến công khai và mạnh mẽ.", ],
  ["The old library was ___ turned into a community centre.", ["recent", "recently", "recentness", "recents"], 1, "An adverb is needed to modify the passive verb 'turned'.", "Cần trạng từ để bổ nghĩa cho động từ bị động 'turned'.", ],
  ["Local charities rely heavily ___ volunteers.", ["on", "in", "at", "for"], 0, "'Rely on' is the correct fixed prepositional phrase.", "'Rely on' là cụm giới từ cố định đúng.", ],
  ["The petition was signed ___ hundreds of residents.", ["by", "from", "with", "of"], 0, "Passive voice agent introduced with 'by'.", "Tác nhân trong câu bị động được giới thiệu bằng 'by'.", ],
];

const p11Ls: Tuple[] = [
  ["What is the man complaining about?", ["noisy neighbours", "a lack of parking spaces", "high rent", "slow buses"], 1, "He is complaining about the lack of parking spaces near his flat.", "Anh ấy phàn nàn về việc thiếu chỗ đỗ xe gần căn hộ của mình.", "Listen: 'It's so frustrating - there's never anywhere to park near my flat these days.'"],
  ["What is being built in the town centre?", ["a new hospital", "a community library", "a shopping mall", "a train station"], 1, "A new community library is being built in the town centre.", "Một thư viện cộng đồng mới đang được xây dựng ở trung tâm thị trấn.", "Listen: 'Work has started on a brand new community library right in the town centre.'"],
  ["Why is the woman attending the council meeting?", ["to complain about taxes", "to support a new cycle path", "to apply for a job", "to sell her house"], 1, "She is attending to support the proposal for a new cycle path.", "Cô tham dự để ủng hộ đề xuất xây đường xe đạp mới.", "Listen: 'I'm going to the council meeting tonight to support the plan for a new cycle path.'"],
  ["What time does the farmers' market start on Saturdays?", ["seven", "eight", "nine", "ten"], 2, "The farmers' market starts at nine on Saturdays.", "Chợ nông sản bắt đầu lúc chín giờ vào thứ Bảy.", "Listen: 'Don't forget, the farmers' market starts at nine every Saturday morning.'"],
  ["What problem does the resident mention?", ["broken streetlights", "too much rubbish left on the street", "loud music at night", "slow internet"], 1, "She mentions rubbish being left on the street as a problem.", "Cô nhắc đến vấn đề rác bị vứt bừa trên phố.", "Listen: 'One big issue in our street is that people keep leaving rubbish outside instead of using the bins.'"],
  ["What are neighbours organising for next weekend?", ["a street party", "a football match", "a cinema trip", "a swimming competition"], 0, "Neighbours are organising a street party for next weekend.", "Hàng xóm đang tổ chức một buổi tiệc đường phố vào cuối tuần tới.", "Listen: 'Everyone on our street is getting together to organise a street party next weekend.'"],
  ["Why was the old cinema closed?", ["not enough customers", "it caught fire", "the owner retired without selling it", "it was replaced by a car park"], 0, "The cinema closed because there weren't enough customers.", "Rạp chiếu phim đóng cửa vì không đủ khách hàng.", "Listen: 'Sadly, the old cinema had to close because there just weren't enough customers anymore.'"],
  ["What does the speaker say the new bus route will do?", ["cost more money", "connect two neighbourhoods that were isolated", "replace all trains", "only run at night"], 1, "The new bus route will connect two previously isolated neighbourhoods.", "Tuyến xe buýt mới sẽ kết nối hai khu dân cư từng bị cô lập.", "Listen: 'This new bus route will finally connect two neighbourhoods that have always been quite isolated.'"],
  ["What does the volunteer group plan to do in the park?", ["build a car park", "plant flowers and clean paths", "remove all the benches", "close it to the public"], 1, "The volunteer group plans to plant flowers and clean the paths.", "Nhóm tình nguyện dự định trồng hoa và dọn dẹp lối đi.", "Listen: 'This weekend our volunteer group will be planting flowers and cleaning up the paths in the park.'"],
  ["What does the mayor promise in her speech?", ["lower taxes", "more affordable housing", "fewer public services", "closing the town hall"], 1, "The mayor promises more affordable housing for residents.", "Thị trưởng hứa sẽ có thêm nhà ở với giá phải chăng cho cư dân.", "Listen: 'In my speech tonight, I want to promise more affordable housing for everyone in this town.'"],
];

const pet11: CambridgeMockExam = {
  id: "cambridge-pet-11",
  title: "PET Mock Test 11 - City Life & Community",
  titleVi: "Đề thi thử PET 11 - Cuộc sống đô thị & Cộng đồng",
  level: "pet",
  duration: 50,
  totalQuestions: 32,
  questions: build(p11Rw, p11Ls),
};

export const cambridgeExamsPet7to11: CambridgeMockExam[] = [
  pet7,
  pet8,
  pet9,
  pet10,
  pet11,
];
