/**
 * @file cambridgeExamsPet14to15.ts
 * @description Two Cambridge B1 Preliminary for Schools (PET) mock exams, tests 14 and 15.
 *              Themes: 14 - Work experience & future careers; 15 - Music, festivals & culture.
 *              Each exam has 21 Reading & Writing questions (three reading
 *              groups of 7, based on B1-length passages) and 10
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
/* PET 14 - Work experience & future careers                        */
/* ============================================================= */
const p14a =
  "Last month, our school organised a work experience week for students in Year 10. I spent five days at a local veterinary clinic because I have always wanted to become a vet. On the first day, I felt nervous, but the staff were friendly and explained everything carefully. I learned how to hold small animals safely and how to clean the examination room between appointments. By the end of the week, I had watched two operations and helped weigh several puppies. The vet in charge told me that patience and a calm voice are just as important as medical knowledge. I returned to school with a much clearer idea of what studying to become a vet would involve.";
const p14b =
  "Choosing a future career can feel confusing when you are still at school, but there are several ways to make the decision easier. Firstly, think carefully about the subjects you enjoy and the tasks that make time pass quickly for you. Secondly, talk to adults who already work in fields that interest you, since they can describe the good and bad sides of a job that you might not read online. Thirdly, try to arrange some work experience, even if it only lasts a day, because seeing a workplace in person teaches you more than any website. Finally, remember that many people change careers several times during their lives, so an early choice does not have to be permanent.";
const p14c =
  "Daniel spent his work experience week at a radio station in his town. He arrived at eight o'clock every morning and helped the producers prepare the news programme. On Wednesday, he was allowed to read a short weather report live on air, which made him extremely nervous at first. The presenters taught him how to speak clearly and how to stay calm if he made a mistake. Daniel also learned to use recording equipment and simple editing software. By Friday, he had decided that he wanted to study journalism at university. His supervisor wrote a letter saying that Daniel had shown real enthusiasm and had asked excellent questions throughout the week.";

const p14Rw: Tuple[] = [
  ["Why did the writer choose the veterinary clinic?", ["Because it was close to school", "Because a friend recommended it", "Because she has always wanted to be a vet", "Because the clinic paid students"], 2, "The passage says 'I spent five days at a local veterinary clinic because I have always wanted to become a vet'.", "Đoạn văn nói người viết dành năm ngày ở phòng khám thú y vì luôn muốn trở thành bác sĩ thú y.", p14a],
  ["How did the writer feel on the first day?", ["Bored", "Nervous", "Angry", "Confident"], 1, "The passage says 'On the first day, I felt nervous, but the staff were friendly'.", "Đoạn văn nói 'On the first day, I felt nervous' (ngày đầu tiên, tôi cảm thấy lo lắng).", p14a],
  ["What did the writer learn to do?", ["Perform operations alone", "Hold small animals safely", "Drive an ambulance", "Write prescriptions"], 1, "The passage says she learned 'how to hold small animals safely'.", "Đoạn văn nói cô ấy học cách giữ động vật nhỏ một cách an toàn.", p14a],
  ["What did the writer help with by the end of the week?", ["Weighing puppies", "Teaching a class", "Driving a van", "Painting the clinic"], 0, "The passage says she 'helped weigh several puppies'.", "Đoạn văn nói cô ấy đã giúp cân vài chú chó con.", p14a],
  ["According to the vet, what is as important as medical knowledge?", ["Speed", "Patience and a calm voice", "Physical strength", "Good handwriting"], 1, "The vet said 'patience and a calm voice are just as important as medical knowledge'.", "Bác sĩ thú y nói sự kiên nhẫn và giọng nói bình tĩnh cũng quan trọng như kiến thức y khoa.", p14a],
  ["How did the writer feel after the work experience week?", ["Confused about her future", "Clearer about becoming a vet", "Uninterested in the job", "Disappointed with the clinic"], 1, "The passage says she 'returned to school with a much clearer idea of what studying to become a vet would involve'.", "Đoạn văn nói cô ấy trở lại trường với ý tưởng rõ ràng hơn về việc học để trở thành bác sĩ thú y.", p14a],
  ["What is the first piece of advice in passage B?", ["Ask your parents to decide", "Think about subjects you enjoy", "Choose the highest-paid job", "Copy a friend's choice"], 1, "The passage says 'think carefully about the subjects you enjoy and the tasks that make time pass quickly for you'.", "Đoạn văn nói hãy suy nghĩ về những môn học bạn thích và những công việc khiến thời gian trôi nhanh.", p14b],
  ["Why should students talk to adults who work in interesting fields?", ["They can offer a job immediately", "They can describe good and bad sides of a job", "They can give students money", "They always studied the same subject"], 1, "The passage says adults 'can describe the good and bad sides of a job that you might not read online'.", "Đoạn văn nói người lớn có thể mô tả mặt tốt và xấu của công việc mà bạn không đọc được trên mạng.", p14b],
  ["Why is work experience valuable, according to the passage?", ["It pays well", "Seeing a workplace teaches more than a website", "It replaces school completely", "It guarantees a future job"], 1, "The passage says 'seeing a workplace in person teaches you more than any website'.", "Đoạn văn nói tận mắt xem nơi làm việc dạy bạn nhiều hơn bất kỳ trang web nào.", p14b],
  ["What does the passage say about career choices made early in life?", ["They must never change", "They do not have to be permanent", "They are always wrong", "They should be kept secret"], 1, "The passage says 'an early choice does not have to be permanent'.", "Đoạn văn nói một lựa chọn sớm không nhất thiết phải là vĩnh viễn.", p14b],
  ["Where did Daniel spend his work experience week?", ["At a veterinary clinic", "At a radio station", "At a school", "At a hospital"], 1, "The passage says Daniel 'spent his work experience week at a radio station in his town'.", "Đoạn văn nói Daniel dành tuần thực tập tại một đài phát thanh.", p14c],
  ["What time did Daniel arrive every morning?", ["Seven o'clock", "Eight o'clock", "Nine o'clock", "Ten o'clock"], 1, "The passage says 'He arrived at eight o'clock every morning'.", "Đoạn văn nói cậu ấy đến lúc tám giờ mỗi sáng.", p14c],
  ["What happened on Wednesday?", ["Daniel edited a film", "Daniel read a weather report live", "Daniel interviewed a singer", "Daniel repaired equipment"], 1, "The passage says 'On Wednesday, he was allowed to read a short weather report live on air'.", "Đoạn văn nói vào thứ Tư, cậu ấy được phép đọc bản tin thời tiết trực tiếp.", p14c],
  ["What did the presenters teach Daniel?", ["How to cook", "How to speak clearly and stay calm", "How to drive", "How to paint"], 1, "The passage says the presenters 'taught him how to speak clearly and how to stay calm if he made a mistake'.", "Đoạn văn nói người dẫn chương trình dạy cậu ấy nói rõ ràng và giữ bình tĩnh.", p14c],
  ["What decision had Daniel made by Friday?", ["To become a vet", "To study journalism at university", "To leave school", "To become a producer immediately"], 1, "The passage says 'he had decided that he wanted to study journalism at university'.", "Đoạn văn nói cậu ấy đã quyết định muốn học báo chí ở đại học.", p14c],
  ["What did Daniel's supervisor write about him?", ["That he was often late", "That he showed real enthusiasm and asked excellent questions", "That he needed more training", "That he disliked the work"], 1, "The passage says the supervisor 'wrote a letter saying that Daniel had shown real enthusiasm and had asked excellent questions'.", "Đoạn văn nói người giám sát viết rằng Daniel đã thể hiện sự nhiệt tình thực sự và đặt những câu hỏi xuất sắc.", p14c],
    ["Which word best describes Daniel's feeling before reading the weather report?", ["Bored", "Nervous", "Angry", "Sleepy"], 1, "The passage says reading live on air 'made him extremely nervous at first'.", "Đoạn văn nói việc đọc trực tiếp khiến cậu ấy rất lo lắng lúc đầu.", p14c],
  ["What equipment did Daniel learn to use?", ["Recording equipment and editing software", "Medical instruments", "Farm machinery", "Musical instruments"], 0, "The passage says 'Daniel also learned to use recording equipment and simple editing software'.", "Đoạn văn nói Daniel cũng học cách sử dụng thiết bị ghi âm và phần mềm chỉnh sửa đơn giản.", p14c],
  ["According to passage B, why might online research not be enough?", ["It costs money", "It might not show the bad sides of a job", "It is illegal", "It takes too long"], 1, "The passage implies adults describe sides of a job 'you might not read online'.", "Đoạn văn ngụ ý người lớn mô tả những mặt của công việc mà bạn có thể không đọc được trên mạng.", p14b],
  ["What is the main purpose of passage B?", ["To describe a radio station", "To give advice about choosing a career", "To criticise schools", "To advertise a clinic"], 1, "The whole passage gives advice for making career decisions easier.", "Toàn bộ đoạn văn đưa ra lời khuyên để việc chọn nghề nghiệp dễ dàng hơn.", p14b],
  ["What is a common theme across all three passages?", ["Sports competitions", "Learning through work experience", "Cooking skills", "Foreign travel"], 1, "All three passages describe students learning through work experience placements.", "Cả ba đoạn văn đều mô tả học sinh học hỏi thông qua các đợt thực tập.", p14c],
];

const p14Ls: Tuple[] = [
  ["Woman: Where did you do your work experience? Man: At a veterinary clinic, actually. Where did the man do his work experience?", ["At a school", "At a veterinary clinic", "At a radio station", "At a shop"], 1, "The man says he did his work experience at a veterinary clinic.", "Người đàn ông nói anh ấy thực tập tại một phòng khám thú y.", "Listen: 'Woman: Where did you do your work experience? Man: At a veterinary clinic, actually.'"],
  ["Woman: How did you feel on your first day? Man: Quite nervous, to be honest. How did the man feel on his first day?", ["Confident", "Nervous", "Bored", "Angry"], 1, "The man says he felt quite nervous on his first day.", "Người đàn ông nói anh ấy khá lo lắng vào ngày đầu tiên.", "Listen: 'Woman: How did you feel on your first day? Man: Quite nervous, to be honest.'"],
  ["Woman: What did you learn to do there? Man: I learned how to weigh puppies safely. What did the man learn to do?", ["Drive a van", "Weigh puppies safely", "Cook food", "Fix computers"], 1, "The man says he learned how to weigh puppies safely.", "Người đàn ông nói anh ấy học cách cân chó con an toàn.", "Listen: 'Woman: What did you learn to do there? Man: I learned how to weigh puppies safely.'"],
  ["Woman: What time did Daniel arrive at the radio station? Man: Eight o'clock every morning. What time did Daniel arrive?", ["Seven o'clock", "Eight o'clock", "Nine o'clock", "Ten o'clock"], 1, "The man says Daniel arrived at eight o'clock every morning.", "Người đàn ông nói Daniel đến lúc tám giờ mỗi sáng.", "Listen: 'Woman: What time did Daniel arrive at the radio station? Man: Eight o'clock every morning.'"],
  ["Woman: What did Daniel read on Wednesday? Man: A short weather report, live on air. What did Daniel read?", ["The news headlines", "A weather report", "A sports report", "A film review"], 1, "The man says Daniel read a short weather report live on air.", "Người đàn ông nói Daniel đọc một bản tin thời tiết ngắn trực tiếp.", "Listen: 'Woman: What did Daniel read on Wednesday? Man: A short weather report, live on air.'"],
  ["Woman: What does Daniel want to study now? Man: Journalism, at university. What does Daniel want to study?", ["Medicine", "Journalism", "Engineering", "Art"], 1, "The man says Daniel wants to study journalism at university.", "Người đàn ông nói Daniel muốn học báo chí ở đại học.", "Listen: 'Woman: What does Daniel want to study now? Man: Journalism, at university.'"],
  ["Woman: What advice would you give about choosing a career? Man: Talk to people already working in that field. What advice does the man give?", ["Choose the best-paid job", "Talk to people working in that field", "Ask your parents to decide", "Never change your mind"], 1, "The man advises talking to people already working in that field.", "Người đàn ông khuyên nên nói chuyện với người đang làm trong lĩnh vực đó.", "Listen: 'Woman: What advice would you give about choosing a career? Man: Talk to people already working in that field.'"],
  ["Woman: Why is work experience useful? Man: Because you see the real workplace, not just read about it. Why is work experience useful, according to the man?", ["It pays a salary", "You see the real workplace", "It is easier than school", "It lasts a long time"], 1, "The man says work experience lets you see the real workplace instead of just reading about it.", "Người đàn ông nói thực tập cho phép bạn thấy nơi làm việc thực tế thay vì chỉ đọc về nó.", "Listen: 'Woman: Why is work experience useful? Man: Because you see the real workplace, not just read about it.'"],
  ["Woman: What did the vet say was important? Man: Patience and a calm voice. What did the vet say was important?", ["Speed and strength", "Patience and a calm voice", "Good handwriting", "Loud speaking"], 1, "The man reports that the vet said patience and a calm voice are important.", "Người đàn ông nói bác sĩ thú y nói rằng sự kiên nhẫn và giọng nói bình tĩnh rất quan trọng.", "Listen: 'Woman: What did the vet say was important? Man: Patience and a calm voice.'"],
  ["Woman: What did Daniel's supervisor write in the letter? Man: That he showed real enthusiasm. What did the supervisor write about Daniel?", ["That he was often late", "That he showed real enthusiasm", "That he needed more training", "That he disliked the job"], 1, "The man says the supervisor wrote that Daniel showed real enthusiasm.", "Người đàn ông nói người giám sát viết rằng Daniel đã thể hiện sự nhiệt tình thực sự.", "Listen: 'Woman: What did Daniel's supervisor write in the letter? Man: That he showed real enthusiasm.'"],
];

const pet14: CambridgeMockExam = {
  id: "cambridge-pet-14",
  title: "PET Mock Test 14 - Work Experience & Future Careers",
  titleVi: "Đề thi thử PET 14 - Kinh nghiệm làm việc & Nghề nghiệp tương lai",
  level: "pet",
  duration: 45,
  totalQuestions: 31,
  questions: build(p14Rw, p14Ls),
};

/* ============================================================= */
/* PET 15 - Music, festivals & culture                               */
/* ============================================================= */
const p15a =
  "Every July, thousands of young people travel to the coast for the Riverside Music Festival, which lasts three days and features more than fifty bands. This year, tickets sold out within two hours of going on sale online, so many fans were disappointed. Organisers have promised to increase the number of tickets next year and to add a second stage for smaller, local bands. Visitors camp in tents near the festival site, and there are food stalls selling dishes from all over the world. Despite the crowds and occasional rain, most people say the atmosphere is friendly and unforgettable. Several famous musicians have said that performing at Riverside feels different from any other festival because the audience is so enthusiastic.";
const p15b =
  "Learning a musical instrument brings benefits that go far beyond simply being able to play a tune. Scientists have found that children who practise an instrument regularly often develop better concentration and memory than those who do not. Playing music also teaches patience, since progress usually happens slowly and requires daily practice. In addition, joining a school orchestra or band helps students make new friends and work as part of a team. Some experts believe that these skills can even help students perform better in subjects such as mathematics. Although lessons and instruments can be expensive, many schools now lend instruments to students so that cost is not always a barrier.";
const p15c =
  "Sophie plays the violin in her school orchestra, and last month the group travelled to another country to perform at an international music festival. The trip lasted five days, and the students stayed with local families instead of in a hotel. Sophie was nervous about speaking a different language, but her host family were extremely welcoming and patient. During the festival, orchestras from six different countries performed traditional music from their own cultures. Sophie's favourite moment was a joint concert where all the young musicians played one piece together. She returned home with new friends from three continents and a deeper appreciation of how music can connect people from very different backgrounds.";

const p15Rw: Tuple[] = [
  ["How long does the Riverside Music Festival last?", ["One day", "Two days", "Three days", "A week"], 2, "The passage says the festival 'lasts three days'.", "Đoạn văn nói lễ hội kéo dài ba ngày.", p15a],
  ["What happened when tickets went on sale?", ["They sold out within two hours", "Nobody bought them", "The price dropped", "The festival was cancelled"], 0, "The passage says 'tickets sold out within two hours of going on sale online'.", "Đoạn văn nói vé bán hết trong vòng hai giờ sau khi được bán trực tuyến.", p15a],
  ["What have the organisers promised for next year?", ["To cancel the festival", "To increase tickets and add a second stage", "To move the festival indoors", "To stop selling food"], 1, "The passage says organisers 'promised to increase the number of tickets next year and to add a second stage'.", "Đoạn văn nói ban tổ chức hứa sẽ tăng số lượng vé và thêm một sân khấu thứ hai.", p15a],
  ["Where do visitors usually stay?", ["In hotels", "In tents near the site", "At home", "On boats"], 1, "The passage says 'Visitors camp in tents near the festival site'.", "Đoạn văn nói khách tham quan cắm trại trong lều gần khu vực lễ hội.", p15a],
  ["How do most people describe the atmosphere?", ["Boring", "Friendly and unforgettable", "Dangerous", "Quiet"], 1, "The passage says 'most people say the atmosphere is friendly and unforgettable'.", "Đoạn văn nói hầu hết mọi người nói bầu không khí thân thiện và khó quên.", p15a],
  ["Why do some musicians say Riverside feels different?", ["The stage is bigger", "The audience is so enthusiastic", "The food is free", "The tickets are cheap"], 1, "The passage says musicians feel 'performing at Riverside feels different... because the audience is so enthusiastic'.", "Đoạn văn nói các nhạc sĩ cảm thấy khác biệt vì khán giả rất nhiệt tình.", p15a],
  ["What can children who play an instrument develop, according to scientists?", ["Better concentration and memory", "Faster running speed", "Better eyesight", "Louder voices"], 0, "The passage says children 'often develop better concentration and memory than those who do not'.", "Đoạn văn nói trẻ em thường phát triển khả năng tập trung và trí nhớ tốt hơn.", p15b],
  ["What does playing music teach, according to the passage?", ["Patience", "Impatience", "Laziness", "Selfishness"], 0, "The passage says 'Playing music also teaches patience'.", "Đoạn văn nói chơi nhạc cũng dạy tính kiên nhẫn.", p15b],
  ["What can joining an orchestra or band help students do?", ["Avoid other students", "Make new friends and work as a team", "Skip school", "Stop studying other subjects"], 1, "The passage says joining an orchestra 'helps students make new friends and work as part of a team'.", "Đoạn văn nói việc tham gia dàn nhạc giúp học sinh kết bạn mới và làm việc nhóm.", p15b],
  ["What do some schools do about the cost of instruments?", ["They ban instruments", "They lend instruments to students", "They charge more money", "They stop music lessons"], 1, "The passage says 'many schools now lend instruments to students so that cost is not always a barrier'.", "Đoạn văn nói nhiều trường hiện cho học sinh mượn nhạc cụ để chi phí không luôn là rào cản.", p15b],
  ["What instrument does Sophie play?", ["The piano", "The violin", "The guitar", "The flute"], 1, "The passage says 'Sophie plays the violin in her school orchestra'.", "Đoạn văn nói Sophie chơi violin trong dàn nhạc trường.", p15c],
  ["Where did the students stay during the trip?", ["In a hotel", "With local families", "In a school building", "In tents"], 1, "The passage says 'the students stayed with local families instead of in a hotel'.", "Đoạn văn nói các học sinh ở cùng gia đình bản xứ thay vì ở khách sạn.", p15c],
  ["What was Sophie nervous about?", ["Playing the wrong notes", "Speaking a different language", "Losing her violin", "Missing the flight"], 1, "The passage says 'Sophie was nervous about speaking a different language'.", "Đoạn văn nói Sophie lo lắng về việc phải nói một ngôn ngữ khác.", p15c],
  ["How many countries' orchestras performed at the festival?", ["Three", "Four", "Five", "Six"], 3, "The passage says 'orchestras from six different countries performed traditional music'.", "Đoạn văn nói dàn nhạc từ sáu quốc gia khác nhau đã biểu diễn.", p15c],
  ["What was Sophie's favourite moment?", ["The bus journey", "A joint concert where everyone played together", "Eating local food", "Sightseeing"], 1, "The passage says 'Sophie's favourite moment was a joint concert where all the young musicians played one piece together'.", "Đoạn văn nói khoảnh khắc yêu thích của Sophie là buổi hòa nhạc chung nơi mọi nhạc công trẻ cùng chơi một bản nhạc.", p15c],
  ["What did Sophie gain from the trip, besides new friends?", ["A new violin", "A deeper appreciation of how music connects people", "A prize for best musician", "A place at university"], 1, "The passage says she returned with 'a deeper appreciation of how music can connect people from very different backgrounds'.", "Đoạn văn nói cô ấy trở về với sự trân trọng sâu sắc hơn về cách âm nhạc kết nối con người.", p15c],
  ["What is the main topic of passage A?", ["A cooking competition", "A music festival", "A sports event", "A school exam"], 1, "Passage A describes the Riverside Music Festival in detail.", "Đoạn văn A mô tả chi tiết về Lễ hội âm nhạc Riverside.", p15a],
  ["According to passage B, what might help students in subjects like mathematics?", ["Watching television", "Skills learned from playing music", "Eating more vegetables", "Sleeping late"], 1, "The passage says 'these skills can even help students perform better in subjects such as mathematics'.", "Đoạn văn nói những kỹ năng này thậm chí có thể giúp học sinh học tốt hơn ở các môn như toán học.", p15b],
  ["What is a shared theme across all three passages?", ["The importance of music and culture", "The history of sports", "The dangers of travelling", "The cost of food"], 0, "All three passages relate to music, festivals, and cultural experiences.", "Cả ba đoạn văn đều liên quan đến âm nhạc, lễ hội và trải nghiệm văn hóa.", p15c],
  ["Why were many fans disappointed this year at Riverside?", ["The festival was cancelled", "Tickets sold out very quickly", "The weather was too hot", "The bands cancelled"], 1, "The passage says tickets sold out within two hours, disappointing many fans.", "Đoạn văn nói vé bán hết trong hai giờ khiến nhiều người hâm mộ thất vọng.", p15a],
  ["What is the general purpose of passage B?", ["To sell musical instruments", "To explain the benefits of learning an instrument", "To criticise school orchestras", "To describe a festival"], 1, "The whole passage explains benefits of learning to play a musical instrument.", "Toàn bộ đoạn văn giải thích lợi ích của việc học chơi một nhạc cụ.", p15b],
];

const p15Ls: Tuple[] = [
  ["Man: How long does the Riverside Festival last? Woman: Three days, with more than fifty bands. How long does the festival last?", ["One day", "Two days", "Three days", "A week"], 2, "The woman says the festival lasts three days.", "Người phụ nữ nói lễ hội kéo dài ba ngày.", "Listen: 'Man: How long does the Riverside Festival last? Woman: Three days, with more than fifty bands.'"],
  ["Man: What happened to the tickets this year? Woman: They sold out within two hours. What happened to the tickets?", ["They were never sold", "They sold out within two hours", "The price increased", "They were free"], 1, "The woman says tickets sold out within two hours.", "Người phụ nữ nói vé bán hết trong vòng hai giờ.", "Listen: 'Man: What happened to the tickets this year? Woman: They sold out within two hours.'"],
  ["Man: Where do visitors usually sleep at the festival? Woman: In tents, near the site. Where do visitors usually sleep?", ["In hotels", "In tents", "At home", "On buses"], 1, "The woman says visitors sleep in tents near the site.", "Người phụ nữ nói khách thường ngủ trong lều gần khu vực.", "Listen: 'Man: Where do visitors usually sleep at the festival? Woman: In tents, near the site.'"],
  ["Man: What instrument does Sophie play? Woman: The violin, in the school orchestra. What instrument does Sophie play?", ["The piano", "The violin", "The flute", "The guitar"], 1, "The woman says Sophie plays the violin in the school orchestra.", "Người phụ nữ nói Sophie chơi violin trong dàn nhạc trường.", "Listen: 'Man: What instrument does Sophie play? Woman: The violin, in the school orchestra.'"],
  ["Man: Where did the students stay during the trip? Woman: With local families, not in a hotel. Where did the students stay?", ["In a hotel", "With local families", "In a school", "In tents"], 1, "The woman says the students stayed with local families, not in a hotel.", "Người phụ nữ nói các học sinh ở cùng gia đình bản xứ, không phải khách sạn.", "Listen: 'Man: Where did the students stay during the trip? Woman: With local families, not in a hotel.'"],
  ["Man: How many countries performed at the festival? Woman: Orchestras from six countries took part. How many countries' orchestras performed?", ["Three", "Four", "Five", "Six"], 3, "The woman says orchestras from six countries took part.", "Người phụ nữ nói dàn nhạc từ sáu quốc gia đã tham gia.", "Listen: 'Man: How many countries performed at the festival? Woman: Orchestras from six countries took part.'"],
  ["Man: What can playing an instrument improve, according to research? Woman: Concentration and memory. What can playing an instrument improve?", ["Eyesight", "Concentration and memory", "Running speed", "Handwriting"], 1, "The woman says playing an instrument can improve concentration and memory.", "Người phụ nữ nói chơi nhạc cụ có thể cải thiện sự tập trung và trí nhớ.", "Listen: 'Man: What can playing an instrument improve, according to research? Woman: Concentration and memory.'"],
  ["Man: What do many schools now do about instruments? Woman: They lend them to students. What do many schools now do?", ["Sell instruments cheaply", "Lend instruments to students", "Stop music classes", "Charge extra fees"], 1, "The woman says schools now lend instruments to students.", "Người phụ nữ nói các trường hiện cho học sinh mượn nhạc cụ.", "Listen: 'Man: What do many schools now do about instruments? Woman: They lend them to students.'"],
  ["Man: What was Sophie's favourite moment at the festival? Woman: A joint concert with all the young musicians. What was Sophie's favourite moment?", ["The bus journey", "A joint concert", "The opening speech", "The closing ceremony"], 1, "The woman says Sophie's favourite moment was a joint concert with all the young musicians.", "Người phụ nữ nói khoảnh khắc yêu thích của Sophie là buổi hòa nhạc chung.", "Listen: 'Man: What was Sophie's favourite moment at the festival? Woman: A joint concert with all the young musicians.'"],
  ["Man: What have organisers promised for next year's festival? Woman: More tickets and a second stage. What have organisers promised?", ["Lower prices only", "More tickets and a second stage", "A shorter festival", "No camping"], 1, "The woman says organisers promised more tickets and a second stage.", "Người phụ nữ nói ban tổ chức hứa sẽ có nhiều vé hơn và thêm một sân khấu.", "Listen: 'Man: What have organisers promised for next year's festival? Woman: More tickets and a second stage.'"],
];

const pet15: CambridgeMockExam = {
  id: "cambridge-pet-15",
  title: "PET Mock Test 15 - Music, Festivals & Culture",
  titleVi: "Đề thi thử PET 15 - Âm nhạc, Lễ hội & Văn hóa",
  level: "pet",
  duration: 45,
  totalQuestions: 31,
  questions: build(p15Rw, p15Ls),
};

export const cambridgeExamsPet14to15: CambridgeMockExam[] = [pet14, pet15];
