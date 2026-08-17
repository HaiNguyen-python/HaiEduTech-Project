/**
 * @file cambridgeExamsPet16.ts
 * @description One Cambridge Preliminary (PET, B1) mock exam, test 16.
 *              Theme: Volunteering & City Transport. 21 Reading & Writing
 *              questions (three reading groups of seven) and 10 Listening
 *              questions.
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
  "When Daniel finished school last summer, he decided to spend six months as a volunteer before starting university. He chose a small organisation that runs after-school reading groups for children who have recently moved to the city. At first he assumed that the hardest part would be the teaching itself, but he soon realised that the real challenge was earning the children's trust. Several of them had changed school three times in two years and were reluctant to speak in front of others. Daniel therefore began every session with a short game rather than a book, and within a month attendance had risen from nine children to sixteen. He now says the experience taught him more about listening than any lesson at school ever did, and he intends to keep volunteering one evening a week while he studies.";
const pB =
  "Cities across Europe are rethinking the way people move around. In several capitals, wide roads that were built for cars in the 1960s have been narrowed to make space for cycle lanes and trees. Supporters argue that this reduces both air pollution and noise, and that local shops benefit because people who walk or cycle stop more often. Critics reply that deliveries become slower and that families living outside the centre still depend on their cars. Most planners now accept that no single measure works alone: cheaper public transport, safe cycle routes and reliable evening services have to arrive together, otherwise drivers simply have no realistic alternative.";
const pC =
  "Community garden - information for new members. Our garden is open every day from eight in the morning until sunset. New members are asked to attend one introduction session, which takes place on the first Saturday of each month at ten o'clock and lasts about ninety minutes. You will be shown where the tools are kept and how to book a plot. Each plot costs eighteen euros a year, and this includes water. Please note that we cannot store personal tools in the shed and that dogs must be kept on a lead. If you cannot look after your plot for more than three weeks, tell a committee member so that somebody else can water your plants.";

const rw: Tuple[] = [
  ["Why did Daniel choose to volunteer?", ["He could not find a job", "He wanted a break before university", "His school required it", "He wanted to move city"], 1, "The text says he decided to spend six months as a volunteer before starting university.", "Bài đọc nói anh quyết định làm tình nguyện sáu tháng trước khi vào đại học.", pA],
  ["Who attends the reading groups?", ["University students", "Children new to the city", "Teachers", "Parents"], 1, "The organisation runs reading groups for children who have recently moved to the city.", "Tổ chức này mở nhóm đọc cho trẻ mới chuyển đến thành phố.", pA],
  ["What did Daniel expect to be difficult?", ["The teaching itself", "The travelling", "The paperwork", "The timetable"], 0, "The text says he assumed the hardest part would be the teaching itself.", "Bài đọc nói anh nghĩ phần khó nhất là việc dạy học.", pA],
  ["What turned out to be the real challenge?", ["Finding books", "Earning the children's trust", "Keeping the room quiet", "Working with parents"], 1, "The text says the real challenge was earning the children's trust.", "Bài đọc nói thử thách thật sự là giành được niềm tin của các em.", pA],
  ["Why were some children unwilling to speak?", ["They spoke no English", "They had changed school several times", "They were older", "They disliked reading"], 1, "The text says several had changed school three times in two years.", "Bài đọc nói nhiều em đã đổi trường ba lần trong hai năm.", pA],
  ["How did Daniel start each session?", ["With a book", "With a short game", "With a test", "With a song"], 1, "The text says he began every session with a short game rather than a book.", "Bài đọc nói anh mở đầu mỗi buổi bằng một trò chơi ngắn thay vì sách.", pA],
  ["What does Daniel plan to do at university?", ["Stop volunteering", "Volunteer one evening a week", "Study teaching", "Move abroad"], 1, "The text says he intends to keep volunteering one evening a week while he studies.", "Bài đọc nói anh dự định tiếp tục làm tình nguyện một buổi tối mỗi tuần.", pA],
  ["What has happened to some wide roads?", ["They have been widened", "They have been narrowed for cycle lanes and trees", "They have been closed completely", "They have been rebuilt for buses only"], 1, "The text says wide roads have been narrowed to make space for cycle lanes and trees.", "Bài đọc nói các con đường rộng đã bị thu hẹp để làm chỗ cho làn xe đạp và cây xanh.", pB],
  ["When were those roads originally built for cars?", ["In the 1930s", "In the 1960s", "In the 1980s", "In the 2000s"], 1, "The text says they were built for cars in the 1960s.", "Bài đọc nói chúng được xây cho xe hơi vào những năm 1960.", pB],
  ["What benefit do supporters mention?", ["Faster deliveries", "Less pollution and noise", "Cheaper parking", "More car space"], 1, "Supporters argue it reduces both air pollution and noise.", "Người ủng hộ cho rằng cách này giảm ô nhiễm không khí và tiếng ồn.", pB],
  ["Why do local shops benefit?", ["Rents are lower", "Walkers and cyclists stop more often", "Deliveries are free", "Taxes are reduced"], 1, "The text says people who walk or cycle stop more often.", "Bài đọc nói người đi bộ và đạp xe dừng lại mua sắm thường xuyên hơn.", pB],
  ["What do critics say?", ["Deliveries become slower", "Cycling is unhealthy", "Trees are expensive", "Buses are too fast"], 0, "Critics reply that deliveries become slower.", "Người phản đối nói việc giao hàng trở nên chậm hơn.", pB],
  ["Who still depends on cars?", ["City-centre residents", "Families living outside the centre", "Shop owners", "Cyclists"], 1, "The text says families living outside the centre still depend on their cars.", "Bài đọc nói các gia đình sống ngoài trung tâm vẫn phụ thuộc vào xe hơi.", pB],
  ["What do most planners now accept?", ["One measure is enough", "Several measures must arrive together", "Cars should be banned", "Nothing can change"], 1, "The text says no single measure works alone and the measures have to arrive together.", "Bài đọc nói không biện pháp nào hiệu quả một mình, chúng phải đi cùng nhau.", pB],
  ["When is the garden open?", ["Only at weekends", "Every day from eight until sunset", "From ten until four", "Only in summer"], 1, "The information says the garden is open every day from eight until sunset.", "Thông tin nói khu vườn mở mỗi ngày từ tám giờ đến khi trời tối.", pC],
  ["When do introduction sessions take place?", ["Every Saturday", "The first Saturday of each month", "The last Sunday of the month", "Twice a month"], 1, "They take place on the first Saturday of each month at ten o'clock.", "Buổi giới thiệu diễn ra vào thứ Bảy đầu tiên mỗi tháng lúc mười giờ.", pC],
  ["How long does the session last?", ["Thirty minutes", "One hour", "About ninety minutes", "Three hours"], 2, "The text says it lasts about ninety minutes.", "Bài đọc nói buổi này kéo dài khoảng chín mươi phút.", pC],
  ["What is included in the plot fee?", ["Water", "Tools", "Seeds", "Insurance"], 0, "The text says the eighteen euros a year includes water.", "Bài đọc nói phí mười tám euro mỗi năm bao gồm tiền nước.", pC],
  ["What can members NOT do?", ["Book a plot", "Store personal tools in the shed", "Bring a dog on a lead", "Visit in the morning"], 1, "The text says personal tools cannot be stored in the shed.", "Bài đọc nói không được để dụng cụ cá nhân trong nhà kho.", pC],
  ["What rule applies to dogs?", ["They are not allowed", "They must be kept on a lead", "They can run free", "Only small dogs are allowed"], 1, "The text says dogs must be kept on a lead.", "Bài đọc nói phải giữ chó bằng dây dắt.", pC],
  ["What should members do if they cannot look after a plot for three weeks?", ["Nothing", "Tell a committee member", "Give up the plot", "Pay a fine"], 1, "The text says to tell a committee member so somebody else can water the plants.", "Bài đọc nói hãy báo cho một thành viên ban điều hành để người khác tưới cây.", pC],
];

const ls: Tuple[] = [
  ["Why is the woman phoning the centre?", ["To book a plot", "To ask about volunteering hours", "To complain", "To cancel a class"], 1, "She asks how many hours volunteers are expected to give each week.", "Cô ấy hỏi tình nguyện viên cần đóng góp bao nhiêu giờ mỗi tuần.", "Listen: 'Woman: Hello, I saw your advert. Could you tell me how many hours volunteers usually give each week? Man: Most people help for about three hours.'"],
  ["What time does the last bus leave?", ["Ten fifteen", "Ten forty", "Eleven o'clock", "Eleven twenty"], 1, "The announcement says the last bus leaves at ten forty.", "Thông báo nói xe buýt cuối cùng khởi hành lúc mười giờ bốn mươi.", "Listen: 'Please note that the last bus to the station leaves at ten forty this evening.'"],
  ["How will the man travel to the meeting?", ["By car", "By bike", "By tram", "On foot"], 2, "He says the tram is quicker at that time of day.", "Anh ấy nói tàu điện nhanh hơn vào giờ đó.", "Listen: 'I will take the tram - at that time of day it is much quicker than driving.'"],
  ["What does the speaker say about the cycle lane?", ["It is finished", "It will open in June", "It has been cancelled", "It is only for adults"], 1, "The speaker says the lane will open in June.", "Người nói cho biết làn xe đạp sẽ mở vào tháng Sáu.", "Listen: 'The new cycle lane along the river will open in June, a month later than planned.'"],
  ["How much is a monthly transport pass?", ["Thirty euros", "Thirty-five euros", "Forty euros", "Forty-five euros"], 1, "The pass costs thirty-five euros a month.", "Vé tháng có giá ba mươi lăm euro.", "Listen: 'A monthly pass costs thirty-five euros and covers buses and trams.'"],
  ["What problem does the woman mention?", ["The buses are dirty", "There are no evening services", "The tickets are lost", "The drivers are rude"], 1, "She complains that there are no services after nine in her area.", "Cô ấy phàn nàn rằng khu của cô không có chuyến sau chín giờ.", "Listen: 'In my area there are simply no services after nine, so I have to drive.'"],
  ["What is the volunteer training day about?", ["First aid", "Working with children", "Gardening", "Fundraising"], 1, "The training day focuses on working with children.", "Ngày tập huấn tập trung vào việc làm việc với trẻ em.", "Listen: 'Saturday's training day is about working with children, so please read the handbook first.'"],
  ["Where should new volunteers meet?", ["At the library", "At reception", "In the garden", "At the bus stop"], 1, "New volunteers should meet at reception.", "Tình nguyện viên mới gặp nhau ở quầy tiếp tân.", "Listen: 'All new volunteers should meet at reception at nine fifteen.'"],
  ["What does the man offer to do?", ["Drive the group", "Bring drinks", "Book the room", "Write the report"], 3, "He offers to write the report after the meeting.", "Anh ấy đề nghị viết báo cáo sau buổi họp.", "Listen: 'If it helps, I can write the report after the meeting and send it round.'"],
  ["When is the next community meeting?", ["Tuesday", "Wednesday", "Thursday", "Friday"], 2, "The speaker says the next meeting is on Thursday.", "Người nói cho biết buổi họp tiếp theo vào thứ Năm.", "Listen: 'Our next community meeting is on Thursday at seven in the main hall.'"],
];

const pet16: CambridgeMockExam = {
  id: "cambridge-pet-16",
  title: "PET Mock Test 16 - Volunteering & City Transport",
  titleVi: "Đề thi thử PET 16 - Tình nguyện & Giao thông đô thị",
  level: "pet",
  duration: 45,
  totalQuestions: 31,
  questions: build(rw, ls),
};

export const cambridgeExamsPet16: CambridgeMockExam[] = [pet16];
