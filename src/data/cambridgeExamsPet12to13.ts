/**
 * @file cambridgeExamsPet12to13.ts
 * @description Two Cambridge Preliminary / PET (B1) mock exams, tests 12 to 13.
 *              Themes: 12 - Science, Space & Future Technology; 13 - Culture,
 *              Festivals & Volunteering. Each exam has 21 Reading & Writing
 *              questions (including three reading-text groups of 7 questions)
 *              and 10 Listening questions.
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
/* PET 12 - Science, Space & Future Technology                    */
/* ============================================================= */
const p12a =
  "Astronomers have recently discovered a new type of planet, located far beyond our solar system, which they have called a 'sub-Neptune'. These planets are smaller than Neptune but much larger than Earth, and scientists believe they could hold clues about how planetary systems form. Using powerful space telescopes, researchers have been able to study the atmospheres of several sub-Neptunes and have found traces of water vapour in some of them. This discovery has excited scientists because it suggests that similar planets elsewhere in the universe might have conditions suitable for life. However, most experts agree that much more research is needed before any firm conclusions can be drawn. The next generation of space telescopes, due to be launched within the decade, should provide clearer images and more detailed data about these mysterious worlds.";
const p12b =
  "Robots are increasingly being used in hospitals to help doctors and nurses with their daily tasks. In some hospitals, small robots now deliver medicine and equipment between departments, moving carefully through corridors and avoiding people as they go. Other robots are being trained to assist with surgery, allowing surgeons to perform extremely precise operations with steadier hands than a human could manage alone. While many people worry that robots will eventually replace human workers, most experts believe robots will simply support medical staff rather than take their jobs completely. In fact, hospitals that already use robots report that nurses and doctors have more time to spend with patients because robots handle repetitive or physically demanding tasks. Researchers continue to develop new robots that can respond to voice commands and learn from experience, making them even more useful in the future.";
const p12c =
  "Renewable energy is playing an increasingly important role in how countries produce electricity. Solar panels and wind turbines, once considered expensive and unreliable, have become much cheaper and more efficient over the past two decades. Many governments now offer financial support to families and businesses that install solar panels on their roofs, hoping to encourage a faster shift away from fossil fuels such as coal and oil. Engineers are also developing better batteries that can store extra energy produced on sunny or windy days, so that it can be used later when the weather changes. Some scientists predict that within thirty years, most of the world's electricity could come from renewable sources. Despite this progress, challenges remain, including the high cost of new battery technology and the need to update old electricity networks so they can handle power from many different sources.";

const p12Rw: Tuple[] = [
  ["What have astronomers recently discovered?", ["A new star", "A new type of planet", "A new galaxy", "A new moon"], 1, "The text says astronomers have discovered a new type of planet called a sub-Neptune.", "Đoạn văn nói các nhà thiên văn học đã phát hiện một loại hành tinh mới gọi là sub-Neptune.", p12a],
  ["How do sub-Neptunes compare in size to Earth and Neptune?", ["Smaller than Earth", "Larger than Neptune", "Smaller than Neptune but larger than Earth", "The same size as Neptune"], 2, "Sub-Neptunes are described as smaller than Neptune but much larger than Earth.", "Sub-Neptune được mô tả là nhỏ hơn Sao Hải Vương nhưng lớn hơn nhiều so với Trái Đất.", p12a],
  ["What have researchers found in the atmospheres of some sub-Neptunes?", ["Oxygen", "Traces of water vapour", "Solid ice", "Carbon dioxide only"], 1, "Researchers have found traces of water vapour in the atmospheres of some sub-Neptunes.", "Các nhà nghiên cứu đã tìm thấy dấu vết của hơi nước trong khí quyển của một số sub-Neptune.", p12a],
  ["Why has this discovery excited scientists?", ["It proves aliens exist", "It suggests some planets could have conditions for life", "It means Earth is unique", "It confirms life on Mars"], 1, "The discovery suggests similar planets might have conditions suitable for life.", "Phát hiện này cho thấy các hành tinh tương tự có thể có điều kiện phù hợp cho sự sống.", p12a],
  ["What do most experts agree about the discovery?", ["It is completely proven", "More research is needed", "It is not important", "It should be ignored"], 1, "Most experts agree that much more research is needed before firm conclusions can be drawn.", "Hầu hết các chuyên gia đồng ý rằng cần nghiên cứu thêm nhiều trước khi đưa ra kết luận chắc chắn.", p12a],
  ["What is expected to happen within the decade?", ["Humans will land on a sub-Neptune", "New space telescopes will be launched", "All research will stop", "Earth will find another sun"], 1, "The next generation of space telescopes is due to be launched within the decade.", "Thế hệ kính viễn vọng không gian tiếp theo sẽ được phóng trong vòng mười năm tới.", p12a],
  ["What will the new telescopes provide?", ["Clearer images and more detailed data", "Faster travel to other planets", "Cheaper electricity", "New types of robots"], 0, "The new telescopes should provide clearer images and more detailed data.", "Các kính viễn vọng mới sẽ cung cấp hình ảnh rõ nét hơn và dữ liệu chi tiết hơn.", p12a],
  ["What task do small robots perform in some hospitals?", ["Cooking meals", "Delivering medicine and equipment", "Cleaning windows", "Answering phones"], 1, "Small robots deliver medicine and equipment between departments.", "Các robot nhỏ vận chuyển thuốc và thiết bị giữa các khoa.", p12b],
  ["How do the delivery robots move through hospitals?", ["Quickly and carelessly", "Carefully, avoiding people", "Only at night", "With a nurse pushing them"], 1, "The robots move carefully through corridors and avoid people as they go.", "Các robot di chuyển cẩn thận qua các hành lang và tránh người.", p12b],
  ["Why are robots used to assist with surgery?", ["They are cheaper than doctors", "They allow extremely precise operations", "They can talk to patients", "They replace anaesthetics"], 1, "Robots allow surgeons to perform extremely precise operations with steadier hands.", "Robot giúp bác sĩ phẫu thuật thực hiện các ca mổ cực kỳ chính xác với đôi tay ổn định hơn.", p12b],
  ["What do most experts believe about robots and jobs?", ["Robots will replace all workers", "Robots will support staff, not replace them", "Robots are dangerous", "Robots cannot be trusted in hospitals"], 1, "Most experts believe robots will support medical staff rather than replace them completely.", "Hầu hết chuyên gia tin rằng robot sẽ hỗ trợ nhân viên y tế chứ không thay thế hoàn toàn.", p12b],
  ["Why do nurses have more time for patients in hospitals using robots?", ["Robots handle repetitive or demanding tasks", "There are fewer patients", "Robots do the paperwork only", "Hospitals hire fewer nurses"], 0, "Robots handle repetitive or physically demanding tasks, giving nurses more time for patients.", "Robot đảm nhận các công việc lặp đi lặp lại hoặc nặng nhọc, giúp y tá có nhiều thời gian hơn cho bệnh nhân.", p12b],
  ["What are researchers developing for future hospital robots?", ["Robots that respond to voice commands and learn", "Robots that only clean floors", "Robots that replace doctors entirely", "Robots that cannot be repaired"], 0, "Researchers are developing robots that can respond to voice commands and learn from experience.", "Các nhà nghiên cứu đang phát triển robot có thể phản hồi lệnh thoại và học hỏi từ kinh nghiệm.", p12b],
  ["What has happened to solar panels and wind turbines over the past two decades?", ["They have become more expensive", "They have become cheaper and more efficient", "They have disappeared from use", "They have stopped working properly"], 1, "Solar panels and wind turbines have become much cheaper and more efficient over the past two decades.", "Tấm pin mặt trời và tuabin gió đã trở nên rẻ hơn và hiệu quả hơn trong hai thập kỷ qua.", p12c],
  ["Why do many governments offer financial support for solar panels?", ["To increase taxes", "To encourage a shift away from fossil fuels", "To reduce the number of homes", "To support coal companies"], 1, "Governments offer support hoping to encourage a faster shift away from fossil fuels.", "Các chính phủ hỗ trợ tài chính nhằm khuyến khích chuyển đổi nhanh hơn khỏi nhiên liệu hóa thạch.", p12c],
  ["What are engineers developing to store extra energy?", ["Bigger solar panels", "Better batteries", "New types of coal", "Larger wind turbines only"], 1, "Engineers are developing better batteries that can store extra energy for later use.", "Các kỹ sư đang phát triển pin tốt hơn để lưu trữ năng lượng dư thừa cho sau này.", p12c],
  ["What do some scientists predict about the future?", ["Fossil fuels will return", "Most electricity could come from renewable sources within thirty years", "Renewable energy will disappear", "Batteries will become useless"], 1, "Some scientists predict most electricity could come from renewable sources within thirty years.", "Một số nhà khoa học dự đoán rằng phần lớn điện năng có thể đến từ nguồn tái tạo trong vòng ba mươi năm.", p12c],
  ["What is one challenge mentioned regarding renewable energy?", ["Lack of sunlight", "The high cost of new battery technology", "Too many wind turbines", "No government interest"], 1, "One challenge mentioned is the high cost of new battery technology.", "Một thách thức được đề cập là chi phí cao của công nghệ pin mới.", p12c],
  ["What else needs to be updated according to the text?", ["School curriculums", "Old electricity networks", "Hospital equipment", "Space telescopes"], 1, "Old electricity networks need to be updated to handle power from different sources.", "Mạng lưới điện cũ cần được nâng cấp để xử lý điện từ nhiều nguồn khác nhau.", p12c],
  ["Scientists ___ studying the effects of climate change for decades.", ["study", "have been", "are", "was"], 1, "Present perfect continuous shows an action continuing over time: have been.", "Hiện tại hoàn thành tiếp diễn diễn tả hành động kéo dài qua thời gian: have been.", undefined],
  ["If we ___ more renewable energy, pollution would decrease.", ["use", "used", "will use", "using"], 1, "Second conditional uses past simple in the if-clause: used.", "Câu điều kiện loại 2 dùng thì quá khứ đơn ở mệnh đề if: used.", undefined],
  ["The new satellite, ___ was launched last month, is already sending data.", ["who", "which", "whose", "when"], 1, "'Which' is used to refer to a thing (the satellite) in a non-defining clause.", "'Which' dùng để chỉ vật (vệ tinh) trong mệnh đề quan hệ không xác định.", undefined],
];

const p12Ls: Tuple[] = [
  ["What subject is the man most interested in studying at university?", ["History", "Astrophysics", "Literature", "Economics"], 1, "He says he wants to study astrophysics at university.", "Anh ấy nói muốn học vật lý thiên văn ở đại học.", "Listen: 'I've always loved the stars, so I've decided to study astrophysics at university.'"],
  ["When will the science exhibition open to the public?", ["Monday", "Wednesday", "Friday", "Sunday"], 2, "The exhibition opens to the public on Friday.", "Triển lãm khoa học mở cửa cho công chúng vào thứ Sáu.", "Listen: 'The exhibition will open to the public this Friday morning.'"],
  ["What does the speaker say about self-driving cars?", ["They are already common everywhere", "They are still being tested", "They have been banned", "They no longer exist"], 1, "The speaker says self-driving cars are still being tested.", "Người nói cho biết xe tự lái vẫn đang trong giai đoạn thử nghiệm.", "Listen: 'Self-driving cars are still being tested on public roads in several countries.'"],
  ["Why is the woman excited about her new phone?", ["It is cheaper", "It has a longer battery life", "It is smaller", "It has no camera"], 1, "She is excited because the phone has a much longer battery life.", "Cô ấy phấn khích vì điện thoại mới có thời lượng pin lâu hơn nhiều.", "Listen: 'I love my new phone, especially because the battery lasts so much longer now.'"],
  ["What will the students do in tomorrow's lab session?", ["Watch a video", "Conduct an experiment with light", "Write an essay", "Take a test"], 1, "Tomorrow's lab session involves conducting an experiment with light.", "Buổi thực hành ngày mai sẽ tiến hành một thí nghiệm về ánh sáng.", "Listen: 'Tomorrow in the lab, we'll be conducting an experiment about how light travels.'"],
  ["What problem did the engineer mention with the robot?", ["It was too slow", "It stopped responding to commands", "It was too expensive", "It broke completely"], 1, "The engineer said the robot stopped responding to voice commands.", "Kỹ sư nói robot đã ngừng phản hồi các lệnh thoại.", "Listen: 'The main issue was that the robot suddenly stopped responding to voice commands.'"],
  ["According to the speaker, what percentage of electricity could be renewable by 2050?", ["Twenty percent", "Fifty percent", "Over eighty percent", "Ten percent"], 2, "The speaker says over eighty percent of electricity could be renewable by 2050.", "Người nói cho biết hơn tám mươi phần trăm điện năng có thể là tái tạo vào năm 2050.", "Listen: 'Experts predict that over eighty percent of our electricity could come from renewable sources by 2050.'"],
  ["What does the man say he wants to invent one day?", ["A faster train", "A device to clean ocean plastic", "A new type of phone", "A robot teacher"], 1, "He says he wants to invent a device to clean plastic from the ocean.", "Anh ấy nói muốn phát minh một thiết bị để làm sạch nhựa trong đại dương.", "Listen: 'One day, I really want to invent a device that can clean plastic out of the ocean.'"],
  ["Why was the space mission postponed?", ["Bad weather conditions", "Lack of funding", "A shortage of astronauts", "A public holiday"], 0, "The mission was postponed because of bad weather conditions.", "Sứ mệnh không gian bị hoãn vì điều kiện thời tiết xấu.", "Listen: 'Unfortunately, the space mission has been postponed due to bad weather conditions.'"],
  ["What does the teacher ask the students to bring for the science fair?", ["A laptop", "Their project materials", "A calculator", "A textbook"], 1, "The teacher asks students to bring their project materials for the science fair.", "Giáo viên yêu cầu học sinh mang theo vật liệu dự án cho hội chợ khoa học.", "Listen: 'Don't forget to bring all your project materials for the science fair on Monday.'"],
];

const cambridgePet12: CambridgeMockExam = {
  id: "cambridge-pet-12",
  title: "PET Mock Test 12 - Science, Space & Future Technology",
  titleVi: "Đề thi thử PET 12 - Khoa học, Vũ trụ & Công nghệ tương lai",
  level: "pet",
  duration: 45,
  totalQuestions: 31,
  questions: build(p12Rw, p12Ls),
};

/* ============================================================= */
/* PET 13 - Culture, Festivals & Volunteering                     */
/* ============================================================= */
const p13a =
  "Every autumn, the small town of Ashbridge holds a traditional harvest festival that attracts visitors from all over the region. The festival began over a hundred years ago as a simple celebration among local farmers, who gathered to thank the community for helping with the harvest. Today, the event has grown into a three-day celebration with live music, craft stalls, and traditional food such as freshly baked bread and homemade jam. One of the most popular activities is the pumpkin-carving competition, in which both children and adults compete for the best design. Local historians say the festival has helped keep old farming traditions alive, even as the town has become more modern. Many young people who grew up attending the festival now return each year with their own families, keeping the tradition going for future generations.";
const p13b =
  "Volunteering abroad has become increasingly popular among young people who want to gain experience while helping communities in need. Organisations now offer programmes ranging from teaching English in rural schools to helping build houses for families affected by natural disasters. While many volunteers describe the experience as life-changing, experts warn that people should research organisations carefully before signing up, since not all programmes are equally beneficial to local communities. Some critics argue that short-term volunteering can sometimes do more harm than good if projects are not properly planned or if volunteers lack the necessary skills. Despite these concerns, many long-term volunteers report forming lasting friendships and gaining a much deeper understanding of different cultures. Most experts agree that the key to a successful volunteering trip is choosing a well-organised programme that truly benefits the local community.";
const p13c =
  "Museums around the world are changing the way they present art and history to attract younger visitors. Instead of simply displaying objects behind glass, many museums now use interactive screens, virtual reality, and even smartphone apps to let visitors explore exhibits in new ways. At one museum in Paris, visitors can use a special app to see how a ruined ancient building would have looked thousands of years ago. Museum directors say these changes are necessary because young people today expect more engaging and interactive experiences than previous generations did. Some traditional visitors have complained that technology takes away from the quiet, thoughtful atmosphere museums used to have. However, most museums report that visitor numbers, especially among teenagers and young adults, have increased significantly since introducing these new features, suggesting that the changes are working well overall.";

const p13Rw: Tuple[] = [
  ["How long ago did the Ashbridge harvest festival begin?", ["Ten years ago", "Fifty years ago", "Over a hundred years ago", "Last year"], 2, "The festival began over a hundred years ago.", "Lễ hội bắt đầu cách đây hơn một trăm năm.", p13a],
  ["Why did local farmers originally hold the festival?", ["To sell their farms", "To thank the community for helping with the harvest", "To compete for prizes", "To attract tourists"], 1, "Farmers gathered to thank the community for helping with the harvest.", "Nông dân tụ họp để cảm ơn cộng đồng đã giúp đỡ trong mùa thu hoạch.", p13a],
  ["How long does the festival now last?", ["One day", "Two days", "Three days", "A whole week"], 2, "The event has grown into a three-day celebration.", "Sự kiện đã phát triển thành lễ hội kéo dài ba ngày.", p13a],
  ["What food is traditionally served at the festival?", ["Pizza and pasta", "Freshly baked bread and homemade jam", "Ice cream only", "Fried chicken"], 1, "Traditional food includes freshly baked bread and homemade jam.", "Thức ăn truyền thống bao gồm bánh mì mới nướng và mứt tự làm.", p13a],
  ["Who can take part in the pumpkin-carving competition?", ["Only children", "Only farmers", "Both children and adults", "Only tourists"], 2, "Both children and adults compete in the pumpkin-carving competition.", "Cả trẻ em và người lớn đều tham gia cuộc thi khắc bí ngô.", p13a],
  ["According to local historians, what has the festival helped to do?", ["Modernise the town", "Keep old farming traditions alive", "Reduce tourism", "End local farming"], 1, "Historians say the festival has helped keep old farming traditions alive.", "Các nhà sử học nói lễ hội đã giúp gìn giữ truyền thống nông nghiệp cũ.", p13a],
  ["What do many young people who grew up attending the festival do now?", ["They avoid the festival", "They return each year with their families", "They moved away permanently", "They organise a different event"], 1, "They now return each year with their own families.", "Họ giờ đây trở lại mỗi năm cùng với gia đình riêng của mình.", p13a],
  ["Why has volunteering abroad become popular among young people?", ["They want to earn money", "They want experience while helping communities", "They want a free holiday", "They dislike their home country"], 1, "Young people want to gain experience while helping communities in need.", "Người trẻ muốn có kinh nghiệm trong khi giúp đỡ các cộng đồng đang cần.", p13b],
  ["What do experts warn volunteers should do before signing up?", ["Pay extra fees", "Research organisations carefully", "Bring lots of money", "Learn a new language first"], 1, "Experts warn people should research organisations carefully before signing up.", "Chuyên gia khuyên mọi người nên tìm hiểu kỹ về các tổ chức trước khi đăng ký.", p13b],
  ["What do some critics say about short-term volunteering?", ["It always helps communities", "It can sometimes do more harm than good", "It is always well planned", "It is too expensive"], 1, "Critics argue short-term volunteering can sometimes do more harm than good.", "Những người chỉ trích cho rằng tình nguyện ngắn hạn đôi khi có thể gây hại nhiều hơn lợi.", p13b],
  ["What do many long-term volunteers report gaining?", ["Only money", "Lasting friendships and cultural understanding", "A university degree", "A new job immediately"], 1, "Long-term volunteers report forming lasting friendships and gaining cultural understanding.", "Tình nguyện viên dài hạn thường có được tình bạn lâu dài và hiểu biết văn hóa sâu sắc hơn.", p13b],
  ["What do most experts agree is the key to a successful volunteering trip?", ["Choosing the cheapest programme", "Choosing a well-organised programme that benefits the community", "Travelling alone", "Staying only a few days"], 1, "Experts agree the key is choosing a well-organised programme that truly benefits the community.", "Chuyên gia đồng ý rằng chìa khóa là chọn một chương trình được tổ chức tốt và thực sự có lợi cho cộng đồng.", p13b],
  ["How are museums changing to attract younger visitors?", ["By closing early", "By using interactive screens and virtual reality", "By removing all exhibits", "By charging higher prices"], 1, "Museums now use interactive screens, virtual reality, and smartphone apps.", "Bảo tàng hiện sử dụng màn hình tương tác, thực tế ảo và ứng dụng điện thoại.", p13c],
  ["What can visitors do with the special app at the Paris museum?", ["Buy tickets faster", "See how a ruined building looked thousands of years ago", "Order food", "Book a guided tour only"], 1, "Visitors can use the app to see how a ruined ancient building would have looked long ago.", "Du khách có thể dùng ứng dụng để xem tòa nhà cổ đổ nát trông như thế nào hàng ngàn năm trước.", p13c],
  ["Why do museum directors say these changes are necessary?", ["Young people expect more engaging experiences", "Old exhibits are being removed", "Museums are losing money", "Governments require it"], 0, "Directors say young people today expect more engaging and interactive experiences.", "Giám đốc bảo tàng nói rằng giới trẻ ngày nay mong đợi trải nghiệm hấp dẫn và tương tác hơn.", p13c],
  ["What have some traditional visitors complained about?", ["High ticket prices", "Technology taking away the quiet atmosphere", "Too few exhibits", "Long queues"], 1, "Traditional visitors complain that technology takes away the quiet, thoughtful atmosphere.", "Du khách truyền thống phàn nàn rằng công nghệ làm mất đi bầu không khí yên tĩnh, trầm lắng.", p13c],
  ["What has happened to visitor numbers since the new features were introduced?", ["They have decreased", "They have stayed the same", "They have increased significantly", "They have disappeared"], 2, "Visitor numbers, especially among teenagers and young adults, have increased significantly.", "Số lượng khách tham quan, đặc biệt là thanh thiếu niên, đã tăng đáng kể.", p13c],
  ["What does the overall trend suggest about the museum changes?", ["They are failing", "They are working well overall", "They should be reversed", "They only help older visitors"], 1, "The increase in visitor numbers suggests the changes are working well overall.", "Sự gia tăng số lượng khách cho thấy những thay đổi đang có hiệu quả tốt nhìn chung.", p13c],
  ["By the time the festival ends, thousands of visitors ___ the town.", ["visit", "will have visited", "visited", "are visiting"], 1, "Future perfect describes an action completed before a future point.", "Thì tương lai hoàn thành diễn tả hành động hoàn thành trước một mốc tương lai.", undefined],
  ["The volunteer, ___ had never travelled abroad before, felt nervous at first.", ["who", "which", "whose", "whom"], 0, "'Who' refers to a person (the volunteer) as the subject of the relative clause.", "'Who' dùng để chỉ người (tình nguyện viên) làm chủ ngữ trong mệnh đề quan hệ.", undefined],
  ["Many local traditions ___ passed down through generations.", ["is", "are", "has been", "was"], 1, "Plural subject 'traditions' requires the plural verb form 'are'.", "Chủ ngữ số nhiều 'traditions' cần dạng động từ số nhiều 'are'.", undefined],
];

const p13Ls: Tuple[] = [
  ["What activity does the woman say she enjoyed most at the festival?", ["The music", "The pumpkin-carving competition", "The food stalls", "The fireworks"], 1, "She says the pumpkin-carving competition was her favourite part.", "Cô ấy nói cuộc thi khắc bí ngô là phần cô thích nhất.", "Listen: 'My favourite part of the whole festival was definitely the pumpkin-carving competition.'"],
  ["When does the volunteering programme abroad begin?", ["In spring", "In summer", "In autumn", "In winter"], 1, "The programme begins in summer.", "Chương trình tình nguyện bắt đầu vào mùa hè.", "Listen: 'The volunteering programme in Kenya begins this summer, in July.'"],
  ["What skill does the man say volunteers need most?", ["Cooking", "Patience", "Driving", "Painting"], 1, "He says patience is the most important skill for volunteers.", "Anh ấy nói kiên nhẫn là kỹ năng quan trọng nhất đối với tình nguyện viên.", "Listen: 'Honestly, the most important skill any volunteer needs is patience.'"],
  ["Where is the new interactive exhibit located?", ["The main hall", "The basement", "The garden", "The gift shop"], 0, "The new exhibit is located in the main hall.", "Triển lãm tương tác mới được đặt tại sảnh chính.", "Listen: 'You'll find the new interactive exhibit right in the main hall of the museum.'"],
  ["Why is the woman unable to attend the cultural festival?", ["She is working", "She is travelling", "She is ill", "She has no ticket"], 0, "She cannot attend because she has to work that weekend.", "Cô ấy không thể tham dự vì phải làm việc vào cuối tuần đó.", "Listen: 'Unfortunately, I can't come to the festival because I'm working that whole weekend.'"],
  ["What does the man suggest bringing to the outdoor festival?", ["An umbrella", "A tent", "Sunscreen and a hat", "A musical instrument"], 2, "He suggests bringing sunscreen and a hat for the outdoor festival.", "Anh ấy đề nghị mang kem chống nắng và mũ đến lễ hội ngoài trời.", "Listen: 'Since it's outdoors, I'd definitely bring sunscreen and a hat.'"],
  ["How long did the woman volunteer at the school overseas?", ["Two weeks", "One month", "Six months", "One year"], 2, "She volunteered at the school for six months.", "Cô ấy đã làm tình nguyện viên tại trường học nước ngoài trong sáu tháng.", "Listen: 'I spent six months volunteering at a small school overseas, and it changed my life.'"],
  ["What does the guide say tourists should not do inside the museum?", ["Take photos", "Use flash photography", "Talk quietly", "Ask questions"], 1, "The guide says tourists should not use flash photography inside the museum.", "Hướng dẫn viên nói khách du lịch không nên chụp ảnh dùng đèn flash bên trong bảo tàng.", "Listen: 'Please remember, you can take photos, but flash photography is not allowed inside.'"],
  ["What time does the cultural parade start on Saturday?", ["9 a.m.", "11 a.m.", "1 p.m.", "3 p.m."], 1, "The cultural parade starts at 11 a.m. on Saturday.", "Cuộc diễu hành văn hóa bắt đầu lúc 11 giờ sáng thứ Bảy.", "Listen: 'The cultural parade will start at eleven o'clock on Saturday morning.'"],
  ["Why does the speaker recommend the local charity organisation?", ["It is the cheapest option", "It has a strong reputation for helping communities well", "It only accepts experienced volunteers", "It offers paid positions"], 1, "The speaker recommends it because it has a strong reputation for genuinely helping communities.", "Người nói khuyên vì tổ chức này có uy tín tốt trong việc thực sự giúp đỡ cộng đồng.", "Listen: 'I'd really recommend that charity, it has a strong reputation for genuinely helping local communities.'"],
];

const cambridgePet13: CambridgeMockExam = {
  id: "cambridge-pet-13",
  title: "PET Mock Test 13 - Culture, Festivals & Volunteering",
  titleVi: "Đề thi thử PET 13 - Văn hóa, Lễ hội & Hoạt động tình nguyện",
  level: "pet",
  duration: 45,
  totalQuestions: 31,
  questions: build(p13Rw, p13Ls),
};

export const cambridgeExamsPet12to13: CambridgeMockExam[] = [cambridgePet12, cambridgePet13];
