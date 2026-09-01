/**
 * @file cambridgeWritingTasks.ts
 * @description Productive writing tasks for Cambridge Test Prep, one bank per
 *              level in the official formats: word/sentence completion and picture
 *              sentences at Starters and Movers, notes and short stories at
 *              Flyers, a 25-35 word message at KET, and a 100 word email plus a
 *              story or essay choice at PET.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

import { cambridgeWritingTasksExpansion } from "./cambridgeWritingTasksExpansion";

export type CambridgeWritingLevel = "starters" | "movers" | "flyers" | "ket" | "pet";

export type CambridgeWritingKind =
  | "word-completion"
  | "sentence-completion"
  | "picture-sentences"
  | "note"
  | "story"
  | "email"
  | "essay";

export interface CambridgeWritingTask {
  id: string;
  level: CambridgeWritingLevel;
  kind: CambridgeWritingKind;
  /** Short label for the card, English and Vietnamese. */
  title: string;
  titleVi: string;
  /** What the student must write. */
  prompt: string;
  promptVi: string;
  /** Bullet points the answer must cover, as in the real paper. */
  bullets: string[];
  bulletsVi: string[];
  minWords: number;
  maxWords: number;
  /** Language the student can reuse. */
  usefulLanguage: string[];
  /** Model answer at the right level, revealed after the student submits. */
  sampleAnswer: string;
}

const T = (task: CambridgeWritingTask) => task;

export const cambridgeWritingTasks: CambridgeWritingTask[] = [
  // ---------------------------------------------------------------- STARTERS
  T({
    id: "wr-starters-1", level: "starters", kind: "word-completion",
    title: "My family", titleVi: "Gia đình của em",
    prompt: "Write three sentences about your family. Say who they are and one thing they like.",
    promptVi: "Viết ba câu về gia đình em. Nói họ là ai và một điều họ thích.",
    bullets: ["Who is in your family", "What one person likes", "One colour or number"],
    bulletsVi: ["Gia đình em có ai", "Một người thích gì", "Một màu sắc hoặc con số"],
    minWords: 12, maxWords: 40,
    usefulLanguage: ["I have got ...", "My mother likes ...", "There are four people ..."],
    sampleAnswer: "I have got a big family. My mother likes red flowers. I have two brothers and one cat.",
  }),
  T({
    id: "wr-starters-2", level: "starters", kind: "picture-sentences",
    title: "In the park", titleVi: "Ở công viên",
    prompt: "Imagine a park with children, a dog and a red ball. Write three sentences about the picture.",
    promptVi: "Hãy tưởng tượng một công viên có các bạn nhỏ, một con chó và quả bóng đỏ. Viết ba câu về bức tranh.",
    bullets: ["What you can see", "What the children are doing", "One colour"],
    bulletsVi: ["Em thấy gì", "Các bạn nhỏ đang làm gì", "Một màu sắc"],
    minWords: 12, maxWords: 40,
    usefulLanguage: ["I can see ...", "The boy is playing ...", "It is a red ball."],
    sampleAnswer: "I can see a park with three children. The boy is playing with a dog. The ball is red and very big.",
  }),
  T({
    id: "wr-starters-3", level: "starters", kind: "sentence-completion",
    title: "My favourite food", titleVi: "Món ăn em thích",
    prompt: "Finish these ideas in full sentences: what you eat, when you eat it, who eats it with you.",
    promptVi: "Hoàn thành các ý sau thành câu đầy đủ: em ăn gì, ăn khi nào, ai ăn cùng em.",
    bullets: ["My favourite food is ...", "I eat it ...", "I eat it with ..."],
    bulletsVi: ["Món em thích là ...", "Em ăn món đó ...", "Em ăn cùng ..."],
    minWords: 12, maxWords: 40,
    usefulLanguage: ["My favourite food is ...", "in the morning", "with my sister"],
    sampleAnswer: "My favourite food is rice with chicken. I eat it in the evening. I eat it with my sister and my father.",
  }),
  T({
    id: "wr-starters-4", level: "starters", kind: "picture-sentences",
    title: "My classroom", titleVi: "Lớp học của em",
    prompt: "Write three sentences about your classroom. Say what is in it and what colour it is.",
    promptVi: "Viết ba câu về lớp học của em. Nói trong lớp có gì và màu gì.",
    bullets: ["Two things in the room", "One colour", "One thing you like"],
    bulletsVi: ["Hai đồ vật trong lớp", "Một màu sắc", "Một thứ em thích"],
    minWords: 12, maxWords: 40,
    usefulLanguage: ["There is / There are ...", "It is white.", "I like the ..."],
    sampleAnswer: "There are twenty chairs in my classroom. The board is white and very big. I like the books on the shelf.",
  }),
  T({
    id: "wr-starters-5", level: "starters", kind: "word-completion",
    title: "Animals I like", titleVi: "Những con vật em thích",
    prompt: "Write three sentences about an animal you like. Say its name, its colour and where it lives.",
    promptVi: "Viết ba câu về một con vật em thích. Nói tên, màu sắc và nơi nó sống.",
    bullets: ["The animal", "Its colour", "Where it lives"],
    bulletsVi: ["Con vật gì", "Màu gì", "Sống ở đâu"],
    minWords: 12, maxWords: 40,
    usefulLanguage: ["I like ...", "It is brown.", "It lives in a ..."],
    sampleAnswer: "I like dogs. My dog is brown and small. It lives in my house with my family.",
  }),
  T({
    id: "wr-starters-6", level: "starters", kind: "sentence-completion",
    title: "My day", titleVi: "Một ngày của em",
    prompt: "Write three sentences about your day: morning, school and evening.",
    promptVi: "Viết ba câu về một ngày của em: buổi sáng, ở trường và buổi tối.",
    bullets: ["In the morning I ...", "At school I ...", "In the evening I ..."],
    bulletsVi: ["Buổi sáng em ...", "Ở trường em ...", "Buổi tối em ..."],
    minWords: 12, maxWords: 40,
    usefulLanguage: ["In the morning ...", "At school ...", "In the evening ..."],
    sampleAnswer: "In the morning I eat bread and milk. At school I read and draw. In the evening I play with my brother.",
  }),

  // ------------------------------------------------------------------ MOVERS
  T({
    id: "wr-movers-1", level: "movers", kind: "picture-sentences",
    title: "A day at the beach", titleVi: "Một ngày ở bãi biển",
    prompt: "Write four sentences about a day at the beach. Use first, then and after that.",
    promptVi: "Viết bốn câu về một ngày ở bãi biển. Dùng first, then, after that.",
    bullets: ["Who went with you", "What you did first", "What you did after that", "How you felt"],
    bulletsVi: ["Ai đi cùng em", "Đầu tiên em làm gì", "Sau đó em làm gì", "Em thấy thế nào"],
    minWords: 25, maxWords: 60,
    usefulLanguage: ["First we ...", "Then I ...", "After that ...", "It was great fun."],
    sampleAnswer: "Last Sunday I went to the beach with my family. First we swam in the sea. Then we ate sandwiches under a big umbrella. After that we walked home, and I was happy but very tired.",
  }),
  T({
    id: "wr-movers-2", level: "movers", kind: "story",
    title: "The lost cat", titleVi: "Con mèo bị đi lạc",
    prompt: "Write a short story: a girl finds a lost cat in her garden. Say what happens and how it ends.",
    promptVi: "Viết một truyện ngắn: một bạn gái tìm thấy con mèo đi lạc trong sân. Kể chuyện gì xảy ra và kết thúc thế nào.",
    bullets: ["Where she found the cat", "What she did", "How the story ends"],
    bulletsVi: ["Bạn ấy tìm thấy mèo ở đâu", "Bạn ấy đã làm gì", "Truyện kết thúc thế nào"],
    minWords: 25, maxWords: 60,
    usefulLanguage: ["One morning ...", "She gave it some ...", "In the end ..."],
    sampleAnswer: "One morning Mai saw a small grey cat under a tree in her garden. It was hungry, so she gave it some fish and water. Then she made a poster for the street. In the end a boy came and took his cat home.",
  }),
  T({
    id: "wr-movers-3", level: "movers", kind: "note",
    title: "A note to a friend", titleVi: "Lời nhắn cho bạn",
    prompt: "Write a note to your friend Nam. Invite him to play football and tell him the day and the place.",
    promptVi: "Viết lời nhắn cho bạn Nam. Mời bạn ấy đi chơi bóng, nói rõ ngày và địa điểm.",
    bullets: ["Invite him", "Say the day and time", "Say where to meet"],
    bulletsVi: ["Mời bạn ấy", "Nói ngày và giờ", "Nói chỗ gặp"],
    minWords: 20, maxWords: 50,
    usefulLanguage: ["Do you want to ...?", "on Saturday at four o'clock", "Let's meet ..."],
    sampleAnswer: "Hi Nam, do you want to play football with me? We can play on Saturday at four o'clock. Let's meet at the school gate. Please bring your ball. See you soon, Minh",
  }),
  T({
    id: "wr-movers-4", level: "movers", kind: "sentence-completion",
    title: "My weekend", titleVi: "Cuối tuần của em",
    prompt: "Write four sentences about last weekend. Use the past simple.",
    promptVi: "Viết bốn câu về cuối tuần vừa rồi. Dùng thời quá khứ đơn.",
    bullets: ["Where you went", "Who was with you", "What you did", "What you liked best"],
    bulletsVi: ["Em đã đi đâu", "Ai đi cùng", "Em đã làm gì", "Em thích nhất điều gì"],
    minWords: 25, maxWords: 60,
    usefulLanguage: ["I went ...", "We saw ...", "The best part was ..."],
    sampleAnswer: "Last weekend I went to my grandmother's house with my mother. We cooked cakes in the kitchen. In the afternoon we watched a film about animals. The best part was the cake, because it was very sweet.",
  }),
  T({
    id: "wr-movers-5", level: "movers", kind: "picture-sentences",
    title: "Busy street", titleVi: "Phố đông người",
    prompt: "Describe a busy street: cars, shops and people. Write four sentences with the present continuous.",
    promptVi: "Miêu tả một con phố đông: xe cộ, cửa hàng và người. Viết bốn câu ở thời hiện tại tiếp diễn.",
    bullets: ["What you can see", "What two people are doing", "What the weather is like"],
    bulletsVi: ["Em thấy gì", "Hai người đang làm gì", "Thời tiết thế nào"],
    minWords: 25, maxWords: 60,
    usefulLanguage: ["There are many ...", "A woman is carrying ...", "It is sunny."],
    sampleAnswer: "There are many cars and buses in the street. A woman is carrying two big bags from the shop. Two boys are waiting near the bus stop. It is sunny, so everybody is wearing a hat.",
  }),
  T({
    id: "wr-movers-6", level: "movers", kind: "story",
    title: "A surprise at school", titleVi: "Điều bất ngờ ở trường",
    prompt: "Write a short story about a surprise at school. Say what the surprise was and what happened next.",
    promptVi: "Viết truyện ngắn về một điều bất ngờ ở trường. Nói bất ngờ đó là gì và sau đó thế nào.",
    bullets: ["When it happened", "What the surprise was", "How everybody felt"],
    bulletsVi: ["Chuyện xảy ra khi nào", "Bất ngờ là gì", "Mọi người cảm thấy thế nào"],
    minWords: 25, maxWords: 60,
    usefulLanguage: ["Last Friday ...", "Suddenly ...", "Everybody was ..."],
    sampleAnswer: "Last Friday our teacher came to class with a big box. Suddenly we heard a small noise inside it. The box had two baby rabbits for our science lesson. Everybody was very excited and we all took photos.",
  }),

  // ------------------------------------------------------------------ FLYERS
  T({
    id: "wr-flyers-1", level: "flyers", kind: "story",
    title: "The old key", titleVi: "Chiếc chìa khoá cũ",
    prompt: "Write a story of at least three sentences: a boy finds an old key in the garden.",
    promptVi: "Viết truyện ít nhất ba câu: một bạn trai tìm thấy chiếc chìa khoá cũ trong vườn.",
    bullets: ["Where he found the key", "What he opened with it", "How the story ended"],
    bulletsVi: ["Cậu ấy tìm thấy chìa khoá ở đâu", "Cậu ấy mở được gì", "Truyện kết thúc thế nào"],
    minWords: 35, maxWords: 80,
    usefulLanguage: ["While he was digging ...", "because", "At last ..."],
    sampleAnswer: "While Tom was digging in the garden, he found an old metal key under a stone. He tried it on the door of the small hut behind the trees, and it opened easily. Inside there were his grandfather's fishing rods and an old photo album. At last Tom understood why his grandfather always smiled when he talked about the river.",
  }),
  T({
    id: "wr-flyers-2", level: "flyers", kind: "note",
    title: "Note about a club", titleVi: "Lời nhắn về câu lạc bộ",
    prompt: "Write a note to your cousin about the new art club at school.",
    promptVi: "Viết lời nhắn cho anh/chị họ về câu lạc bộ vẽ mới ở trường.",
    bullets: ["When the club meets", "What you do there", "Why she should join"],
    bulletsVi: ["Câu lạc bộ họp khi nào", "Ở đó làm gì", "Vì sao nên tham gia"],
    minWords: 30, maxWords: 70,
    usefulLanguage: ["It meets every ...", "We usually ...", "You should come because ..."],
    sampleAnswer: "Hi Linh, there is a new art club at my school. It meets every Wednesday after lessons in room 12. We usually paint or make things from paper, and the teacher shows us one new idea each week. You should come because you draw better than anybody I know. Love, Mai",
  }),
  T({
    id: "wr-flyers-3", level: "flyers", kind: "sentence-completion",
    title: "My hobby", titleVi: "Sở thích của em",
    prompt: "Write about your hobby in at least four sentences. Give reasons with because.",
    promptVi: "Viết về sở thích của em, ít nhất bốn câu. Nêu lý do bằng because.",
    bullets: ["What the hobby is", "When you started", "Why you like it", "What you want to do next"],
    bulletsVi: ["Sở thích là gì", "Em bắt đầu khi nào", "Vì sao em thích", "Tiếp theo em muốn làm gì"],
    minWords: 35, maxWords: 80,
    usefulLanguage: ["I started ... two years ago", "because", "Next year I would like to ..."],
    sampleAnswer: "My hobby is playing badminton. I started two years ago because my neighbour asked me to play with him after school. I like it because I can run a lot and it is never boring. Next year I would like to join the school team and play in a real competition.",
  }),
  T({
    id: "wr-flyers-4", level: "flyers", kind: "story",
    title: "Three pictures", titleVi: "Ba bức tranh",
    prompt: "Picture 1: children on a bus. Picture 2: heavy rain. Picture 3: everybody laughing in a museum. Write the story.",
    promptVi: "Tranh 1: các bạn trên xe buýt. Tranh 2: mưa to. Tranh 3: mọi người cười trong bảo tàng. Hãy viết truyện.",
    bullets: ["Picture 1", "Picture 2", "Picture 3"],
    bulletsVi: ["Tranh 1", "Tranh 2", "Tranh 3"],
    minWords: 35, maxWords: 80,
    usefulLanguage: ["First ...", "Suddenly ...", "In the end ..."],
    sampleAnswer: "First our class got on the bus for the school trip and everybody was singing. Suddenly it started to rain so hard that we could not see the road. We had to change our plan and visit the museum instead. In the end we laughed a lot, because the rain gave us the best day of the year.",
  }),
  T({
    id: "wr-flyers-5", level: "flyers", kind: "note",
    title: "Sorry note", titleVi: "Lời nhắn xin lỗi",
    prompt: "You cannot go to your friend's party. Write a note to say sorry and suggest something else.",
    promptVi: "Em không thể đến dự tiệc của bạn. Viết lời nhắn xin lỗi và đề nghị làm việc khác.",
    bullets: ["Say sorry", "Explain why", "Suggest another day"],
    bulletsVi: ["Xin lỗi", "Giải thích lý do", "Đề nghị một ngày khác"],
    minWords: 30, maxWords: 70,
    usefulLanguage: ["I am sorry, but ...", "because", "Shall we ... instead?"],
    sampleAnswer: "Hi Hoa, I am really sorry, but I cannot come to your party on Sunday. My aunt is visiting us from Hue and my parents want me to stay at home. Shall we go to the cinema next Saturday instead? I will bring your present then. Sorry again, Nam",
  }),
  T({
    id: "wr-flyers-6", level: "flyers", kind: "story",
    title: "A useful mistake", titleVi: "Một lỗi nhỏ có ích",
    prompt: "Write a story about a small mistake that turned out well.",
    promptVi: "Viết truyện về một lỗi nhỏ nhưng kết quả lại tốt.",
    bullets: ["What the mistake was", "What happened next", "Why it was lucky"],
    bulletsVi: ["Lỗi đó là gì", "Sau đó thế nào", "Vì sao lại may mắn"],
    minWords: 35, maxWords: 80,
    usefulLanguage: ["By mistake I ...", "Luckily ...", "so"],
    sampleAnswer: "By mistake I took my sister's bag to school instead of mine. Her English book was inside, and it had a list of new words for the test. I read the list while I waited for the bus. Luckily the test used almost the same words, so my small mistake gave me my best mark of the term.",
  }),

  // --------------------------------------------------------------------- KET
  T({
    id: "wr-ket-1", level: "ket", kind: "email",
    title: "Email about a trip", titleVi: "Email về chuyến đi",
    prompt: "Your English friend Sam asks about your school trip. Write an email of 25-35 words.",
    promptVi: "Bạn Sam hỏi về chuyến đi của trường em. Viết email 25-35 từ.",
    bullets: ["Where you went", "Who you went with", "What you liked most"],
    bulletsVi: ["Em đã đi đâu", "Đi với ai", "Em thích nhất điều gì"],
    minWords: 25, maxWords: 40,
    usefulLanguage: ["Hi Sam,", "We went to ...", "The best part was ...", "Write soon,"],
    sampleAnswer: "Hi Sam, last week my class went to a farm near Da Lat with two teachers. We fed the cows and picked strawberries. The best part was the walk to the waterfall. Write soon, Linh",
  }),
  T({
    id: "wr-ket-2", level: "ket", kind: "note",
    title: "Note to your teacher", titleVi: "Lời nhắn cho giáo viên",
    prompt: "You will miss tomorrow's lesson. Write a note to your teacher, 25-35 words.",
    promptVi: "Mai em không đi học được. Viết lời nhắn cho giáo viên, 25-35 từ.",
    bullets: ["Say you cannot come", "Give the reason", "Ask about the homework"],
    bulletsVi: ["Nói em không đến được", "Nêu lý do", "Hỏi về bài tập"],
    minWords: 25, maxWords: 40,
    usefulLanguage: ["Dear Ms ...,", "I am afraid I cannot ...", "Could you tell me ...?"],
    sampleAnswer: "Dear Ms Hoa, I am afraid I cannot come to class tomorrow because I have a dentist appointment. Could you tell me which pages of the workbook we have to do? Thank you, Duc",
  }),
  T({
    id: "wr-ket-3", level: "ket", kind: "email",
    title: "Email about a new phone", titleVi: "Email về chiếc điện thoại mới",
    prompt: "Your friend wants to know about your new phone. Write an email of 25-35 words.",
    promptVi: "Bạn em muốn biết về điện thoại mới của em. Viết email 25-35 từ.",
    bullets: ["When you got it", "What you use it for", "One thing you do not like"],
    bulletsVi: ["Em có nó khi nào", "Em dùng để làm gì", "Một điều em không thích"],
    minWords: 25, maxWords: 40,
    usefulLanguage: ["I got it ...", "I mostly use it for ...", "The only problem is ..."],
    sampleAnswer: "Hi Alex, I got my new phone for my birthday last month. I mostly use it for photos and English podcasts on the bus. The only problem is the battery, which dies quickly. Bye, Trang",
  }),
  T({
    id: "wr-ket-4", level: "ket", kind: "email",
    title: "Invitation email", titleVi: "Email mời",
    prompt: "Invite your friend to a football match. Write an email of 25-35 words.",
    promptVi: "Mời bạn đi xem một trận bóng. Viết email 25-35 từ.",
    bullets: ["Invite your friend", "Say the day and time", "Say where to meet"],
    bulletsVi: ["Mời bạn", "Nói ngày và giờ", "Nói chỗ gặp"],
    minWords: 25, maxWords: 40,
    usefulLanguage: ["Would you like to ...?", "It starts at ...", "Shall we meet ...?"],
    sampleAnswer: "Hi Ben, would you like to watch the football match with me on Sunday? It starts at four o'clock at the city stadium. Shall we meet outside the north gate at half past three? Nam",
  }),
  T({
    id: "wr-ket-5", level: "ket", kind: "note",
    title: "Note about a lost bag", titleVi: "Lời nhắn về chiếc túi bị mất",
    prompt: "You left your bag at your friend's house. Write a note of 25-35 words.",
    promptVi: "Em để quên túi ở nhà bạn. Viết lời nhắn 25-35 từ.",
    bullets: ["Say what you left", "Describe it", "Ask your friend to bring it"],
    bulletsVi: ["Nói em để quên gì", "Miêu tả nó", "Nhờ bạn mang tới"],
    minWords: 25, maxWords: 40,
    usefulLanguage: ["I think I left ...", "It is a ...", "Could you bring it ...?"],
    sampleAnswer: "Hi Mai, I think I left my bag at your house yesterday. It is a small blue one with my maths book inside. Could you bring it to school on Monday morning? Thanks a lot, Huy",
  }),
  T({
    id: "wr-ket-6", level: "ket", kind: "email",
    title: "Email about a weekend job", titleVi: "Email về việc làm cuối tuần",
    prompt: "Tell your friend about your weekend job at a cafe. Write 25-35 words.",
    promptVi: "Kể cho bạn về công việc cuối tuần ở quán cà phê. Viết 25-35 từ.",
    bullets: ["What you do", "How you feel about it", "What you will buy with the money"],
    bulletsVi: ["Em làm gì", "Em thấy thế nào", "Em sẽ mua gì bằng số tiền đó"],
    minWords: 25, maxWords: 40,
    usefulLanguage: ["I work ...", "It is tiring, but ...", "I am saving for ..."],
    sampleAnswer: "Hi Kim, I work at a small cafe on Saturday mornings and I make coffee for customers. It is tiring, but the people are friendly. I am saving for a second-hand guitar. Talk soon, Phuc",
  }),

  // --------------------------------------------------------------------- PET
  T({
    id: "wr-pet-1", level: "pet", kind: "email",
    title: "Email: school trip choice", titleVi: "Email: chọn chuyến đi",
    prompt: "Your English teacher asks students to choose between a museum and a farm for the class trip. Write an email of about 100 words giving your choice and reasons.",
    promptVi: "Giáo viên yêu cầu học sinh chọn giữa bảo tàng và trang trại cho chuyến đi. Viết email khoảng 100 từ nêu lựa chọn và lý do.",
    bullets: ["Which trip you prefer", "Two reasons for your choice", "One practical suggestion"],
    bulletsVi: ["Em chọn chuyến nào", "Hai lý do", "Một đề xuất thực tế"],
    minWords: 85, maxWords: 130,
    usefulLanguage: ["I would definitely prefer ...", "The main reason is that ...", "It might also be worth ..."],
    sampleAnswer: "Dear Mr Clark, thank you for asking us about the class trip. I would definitely prefer the farm. The main reason is that we have already visited two museums this year, so the farm would be something new for most of us. Secondly, we are studying food production in science, and seeing a real farm would make those lessons much clearer. It might also be worth going in the morning, because the bus journey takes almost an hour and the animals are more active early in the day. I am happy to help collect the permission forms. Best wishes, Linh",
  }),
  T({
    id: "wr-pet-2", level: "pet", kind: "essay",
    title: "Essay: phones in class", titleVi: "Bài luận: điện thoại trong lớp",
    prompt: "Some schools allow phones in lessons, others ban them. Write an essay of about 100 words giving your opinion.",
    promptVi: "Một số trường cho dùng điện thoại trong giờ học, số khác cấm. Viết bài luận khoảng 100 từ nêu ý kiến của em.",
    bullets: ["Your opinion", "One argument for it", "One argument against it", "A conclusion"],
    bulletsVi: ["Ý kiến của em", "Một lý lẽ ủng hộ", "Một lý lẽ phản đối", "Kết luận"],
    minWords: 85, maxWords: 130,
    usefulLanguage: ["In my opinion ...", "On the one hand ...", "However ...", "To sum up ..."],
    sampleAnswer: "In my opinion phones should be allowed in lessons, but only with clear rules. On the one hand, a phone is a fast dictionary and a good way to check facts, which saves time in language and science classes. However, it is also the easiest way to lose your attention, and one student scrolling can distract the whole row. For that reason I think phones should stay on the desk face down and be used only when the teacher asks. To sum up, the problem is not the device itself but the habit, and habits can be taught.",
  }),
  T({
    id: "wr-pet-3", level: "pet", kind: "story",
    title: "Story: the message arrived late", titleVi: "Truyện: tin nhắn đến muộn",
    prompt: "Write a story of about 100 words that begins: \"The message arrived two hours too late.\"",
    promptVi: "Viết truyện khoảng 100 từ bắt đầu bằng: \"The message arrived two hours too late.\"",
    bullets: ["Use the first sentence exactly", "Include one problem", "Give a clear ending"],
    bulletsVi: ["Dùng đúng câu mở đầu", "Có một vấn đề", "Kết thúc rõ ràng"],
    minWords: 85, maxWords: 130,
    usefulLanguage: ["past continuous for the background", "as soon as", "In the end ..."],
    sampleAnswer: "The message arrived two hours too late. I was already standing outside the station with my suitcase when my phone finally showed Mai's words: the concert had been moved to Sunday. I was annoyed at first, because I had spent all my savings on the ticket and the bus. Then I noticed a small poster near the entrance about a free jazz evening in the park. As soon as I got there, I found half of my class sitting on the grass with a huge bag of snacks. In the end my wasted afternoon turned into the best evening of the holiday.",
  }),
  T({
    id: "wr-pet-4", level: "pet", kind: "email",
    title: "Email: reply to an invitation", titleVi: "Email: trả lời lời mời",
    prompt: "An English friend invites you to spend a week at their home. Write an email of about 100 words replying.",
    promptVi: "Một người bạn ở Anh mời em sang chơi một tuần. Viết email khoảng 100 từ để trả lời.",
    bullets: ["Accept the invitation", "Ask two questions about the visit", "Say what you would like to do there"],
    bulletsVi: ["Nhận lời mời", "Hỏi hai câu về chuyến đi", "Nói em muốn làm gì ở đó"],
    minWords: 85, maxWords: 130,
    usefulLanguage: ["Thanks so much for ...", "I would love to ...", "Could you tell me whether ...?"],
    sampleAnswer: "Hi Emma, thanks so much for inviting me to stay with your family in August. I would love to come, and my parents have already said yes. Could you tell me whether the weather is still cold in the evenings? I also need to know how far your house is from the airport, so I can book the right flight. While I am there, I would really like to visit the second-hand bookshops you told me about and try cooking a Vietnamese dinner for your family. Let me know if there is anything I should bring. See you soon, Duc",
  }),
  T({
    id: "wr-pet-5", level: "pet", kind: "essay",
    title: "Essay: is homework useful?", titleVi: "Bài luận: bài tập về nhà có ích không?",
    prompt: "\"Homework does more harm than good.\" Write an essay of about 100 words giving your view.",
    promptVi: "\"Bài tập về nhà gây hại nhiều hơn lợi.\" Viết bài luận khoảng 100 từ nêu quan điểm của em.",
    bullets: ["State your position", "Support it with one example", "Answer the other side", "Conclude"],
    bulletsVi: ["Nêu quan điểm", "Một ví dụ minh chứng", "Phản hồi ý kiến trái chiều", "Kết luận"],
    minWords: 85, maxWords: 130,
    usefulLanguage: ["I partly agree that ...", "For example ...", "Those who disagree argue ...", "Overall ..."],
    sampleAnswer: "I partly agree that homework can do harm, but only when there is too much of it. For example, last term I had three subjects with written tasks every evening, so I slept badly and remembered less in class. On the other hand, short practice at home is what turns a new grammar point into something automatic. Those who disagree argue that lessons alone are enough, yet almost nobody learns a language without repeating it. Overall, I believe the amount matters more than the idea: twenty focused minutes for each subject would help students far more than two hours of copying.",
  }),
  T({
    id: "wr-pet-6", level: "pet", kind: "story",
    title: "Story: the door was open", titleVi: "Truyện: cánh cửa mở sẵn",
    prompt: "Write a story of about 100 words that begins: \"When I got home, the door was already open.\"",
    promptVi: "Viết truyện khoảng 100 từ bắt đầu bằng: \"When I got home, the door was already open.\"",
    bullets: ["Use the first sentence exactly", "Build some tension", "Explain what really happened"],
    bulletsVi: ["Dùng đúng câu mở đầu", "Tạo kịch tính", "Giải thích chuyện thật sự"],
    minWords: 85, maxWords: 130,
    usefulLanguage: ["I was sure that ...", "It turned out that ...", "Finally ..."],
    sampleAnswer: "When I got home, the door was already open. I stood on the step for a moment, listening to a strange noise from the kitchen, and I was sure that somebody had broken in. My hands were shaking as I pushed the door with one finger. Then I heard a familiar cough and the sound of a chair. It turned out that my grandmother had arrived a day earlier than planned, and she was making soup for everybody. Finally I laughed, put my bag down and cut the vegetables for her, and we never told my parents how frightened I had been.",
  }),
  ...cambridgeWritingTasksExpansion,
];

export const cambridgeWritingTasksByLevel = (level: CambridgeWritingLevel): CambridgeWritingTask[] =>
  cambridgeWritingTasks.filter(task => task.level === level);
