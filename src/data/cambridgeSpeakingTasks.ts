// Cambridge Speaking Practice task bank (Starters -> PET)
// Each task mirrors a real Cambridge speaking part format.
import { cambridgeSpeakingTasksExpansion } from "./cambridgeSpeakingTasksExpansion";
import { cambridgeSpeakingTasksExpansion2 } from "./cambridgeSpeakingTasksExpansion2";
import { cambridgeSpeakingTasksExpansion3 } from "./cambridgeSpeakingTasksExpansion3";
import { cambridgeSpeakingTasksExpansion4 } from "./cambridgeSpeakingTasksExpansion4";
import { cambridgeSpeakingTasksExpansion5 } from "./cambridgeSpeakingTasksExpansion5";
import { cambridgeSpeakingTasksExpansion6 } from "./cambridgeSpeakingTasksExpansion6";
import { cambridgeSpeakingTasksExpansion7 } from "./cambridgeSpeakingTasksExpansion7";

export type CambridgeSpeakLevel = "starters" | "movers" | "flyers" | "ket" | "pet";


export interface CambridgeSpeakingTask {
  id: string;
  level: CambridgeSpeakLevel;
  part: string;          // e.g. "Part 1 - Scene card"
  topic: string;
  prompt: string;        // What the examiner says
  promptVi?: string;     // Legacy Vietnamese support (no longer shown on screen)
  examiner: string[];    // Follow-up questions the examiner may ask
  usefulLanguage: string[];
  sampleAnswer: string;
  minSeconds: number;    // Suggested speaking time
}

export const CAMBRIDGE_SPEAK_LEVELS: { key: CambridgeSpeakLevel; label: string; emoji: string; color: string; blurb: string; blurbVi: string }[] = [
  { key: "starters", label: "Starters (Pre-A1)", emoji: "🎨", color: "#FF6B9D", blurb: "Point, name and answer short questions.", blurbVi: "Chỉ tranh, gọi tên và trả lời câu hỏi ngắn." },
  { key: "movers", label: "Movers (A1)", emoji: "🚀", color: "#FF9F1C", blurb: "Spot differences and tell a short picture story.", blurbVi: "Tìm điểm khác và kể chuyện theo tranh." },
  { key: "flyers", label: "Flyers (A2)", emoji: "🦅", color: "#6BCB77", blurb: "Find the odd one out and talk about yourself.", blurbVi: "Tìm từ khác loại và nói về bản thân." },
  { key: "ket", label: "KET / A2 Key", emoji: "📝", color: "#4D96FF", blurb: "Personal questions and a photo-based discussion.", blurbVi: "Câu hỏi cá nhân và thảo luận theo ảnh." },
  { key: "pet", label: "PET / B1 Preliminary", emoji: "🏆", color: "#C780FA", blurb: "Long turn, collaborative task and discussion.", blurbVi: "Nói dài, thảo luận và trao đổi ý kiến." },
];

export const cambridgeSpeakingTasks: CambridgeSpeakingTask[] = [
  // ---------- STARTERS ----------
  {
    id: "st-1", level: "starters", part: "Part 1 - Scene card", topic: "My toys",
    prompt: "Look at your toys. Tell me about them. What colour is your favourite toy?",
    promptVi: "Nhìn vào đồ chơi của em. Kể cho thầy nghe. Đồ chơi em thích màu gì?",
    examiner: ["What is it?", "What colour is it?", "Do you like it?"],
    usefulLanguage: ["It's a ...", "It's red / blue / yellow.", "I like my ...", "Yes, I do. / No, I don't."],
    sampleAnswer: "It's a teddy bear. It's brown and small. I like my teddy bear. I sleep with it.",
    minSeconds: 15,
  },
  {
    id: "st-2", level: "starters", part: "Part 2 - Object cards", topic: "Animals",
    prompt: "Look at the animals. Which animal do you like? Tell me about it.",
    promptVi: "Nhìn các con vật. Em thích con nào? Kể về nó nhé.",
    examiner: ["Is it big or small?", "What colour is it?", "Where does it live?"],
    usefulLanguage: ["I like the ...", "It's big / small.", "It lives in the ...", "It can run / fly / swim."],
    sampleAnswer: "I like the elephant. It is very big and grey. It lives in the zoo. It can walk slowly.",
    minSeconds: 15,
  },
  {
    id: "st-3", level: "starters", part: "Part 3 - Personal questions", topic: "My family",
    prompt: "Tell me about your family. Who is in your family?",
    promptVi: "Kể về gia đình em. Gia đình em có ai?",
    examiner: ["How many people are in your family?", "What is your mum's name?", "Do you have a brother or a sister?"],
    usefulLanguage: ["There are four people.", "This is my mum / dad.", "I have one sister.", "Her name is ..."],
    sampleAnswer: "There are four people in my family: my mum, my dad, my sister and me. My sister is six. I love my family.",
    minSeconds: 15,
  },
  {
    id: "st-4", level: "starters", part: "Part 2 - Object cards", topic: "Food I like",
    prompt: "Look at the food. What food do you like? What food don't you like?",
    promptVi: "Nhìn các món ăn. Em thích món nào? Em không thích món nào?",
    examiner: ["Do you like apples?", "What do you eat for breakfast?", "Do you drink milk?"],
    usefulLanguage: ["I like ...", "I don't like ...", "For breakfast I eat ...", "It's yummy!"],
    sampleAnswer: "I like rice and chicken. I don't like fish. For breakfast I eat bread and I drink milk.",
    minSeconds: 15,
  },
  {
    id: "st-5", level: "starters", part: "Part 3 - Personal questions", topic: "My school day",
    prompt: "Tell me about your school. What do you do at school?",
    promptVi: "Kể về trường của em. Ở trường em làm gì?",
    examiner: ["Where is your school?", "Who is your friend?", "What do you play?"],
    usefulLanguage: ["I go to school at ...", "My friend is ...", "We play ...", "I like my teacher."],
    sampleAnswer: "My school is near my house. My friend is Minh. We play football. I like my teacher.",
    minSeconds: 15,
  },

  // ---------- MOVERS ----------
  {
    id: "mv-1", level: "movers", part: "Part 1 - Find the differences", topic: "Two park pictures",
    prompt: "I have a picture of a park and you have a picture of a park too. My picture has three children. Tell me about your picture.",
    promptVi: "Thầy có tranh công viên, em cũng có. Tranh của thầy có ba bạn nhỏ. Hãy nói về tranh của em.",
    examiner: ["What are the children doing?", "How many trees are there?", "What is the weather like?"],
    usefulLanguage: ["In my picture there are ...", "The boy is riding a bike.", "It's sunny.", "There are two trees."],
    sampleAnswer: "In my picture there are two children. A boy is riding a bike and a girl is running. There are four trees and it is sunny.",
    minSeconds: 20,
  },
  {
    id: "mv-2", level: "movers", part: "Part 2 - Picture story", topic: "A day at the beach",
    prompt: "These pictures show a story about a family at the beach. Look at the pictures first, then tell the story.",
    promptVi: "Các bức tranh kể chuyện gia đình đi biển. Nhìn tranh rồi kể lại câu chuyện.",
    examiner: ["What happens first?", "Then what happens?", "How does the story end?"],
    usefulLanguage: ["First, ...", "Then, ...", "After that, ...", "Finally, ...", "They are happy."],
    sampleAnswer: "First, the family go to the beach. Then the children swim in the sea. After that, they eat ice cream. Finally, they go home and they are very happy.",
    minSeconds: 25,
  },
  {
    id: "mv-3", level: "movers", part: "Part 3 - Odd one out", topic: "Clothes",
    prompt: "Look at these four things: a T-shirt, a jacket, a skirt and a banana. Which one is different? Why?",
    promptVi: "Nhìn bốn thứ: áo phông, áo khoác, váy và quả chuối. Cái nào khác? Vì sao?",
    examiner: ["Why is it different?", "What do you wear in summer?", "What is your favourite jacket like?"],
    usefulLanguage: ["The banana is different because ...", "The others are clothes.", "In summer I wear ..."],
    sampleAnswer: "The banana is different because you can eat it. The others are clothes, so you wear them. In summer I wear a T-shirt and shorts.",
    minSeconds: 20,
  },
  {
    id: "mv-4", level: "movers", part: "Part 4 - Personal questions", topic: "My weekend",
    prompt: "Now tell me about your weekend. What do you do on Saturday and Sunday?",
    promptVi: "Kể về cuối tuần của em. Thứ Bảy và Chủ Nhật em làm gì?",
    examiner: ["Who do you play with?", "Do you watch TV?", "What did you do last Sunday?"],
    usefulLanguage: ["On Saturday I ...", "I usually ...", "Last Sunday I went to ...", "It was fun."],
    sampleAnswer: "On Saturday I play badminton with my dad. On Sunday I usually read books. Last Sunday I went to the zoo and it was fun.",
    minSeconds: 20,
  },
  {
    id: "mv-5", level: "movers", part: "Part 2 - Picture story", topic: "The lost cat",
    prompt: "These pictures show a story about a girl and her lost cat. Tell me the story.",
    promptVi: "Tranh kể chuyện một bạn gái và chú mèo bị lạc. Hãy kể lại.",
    examiner: ["Where is the cat?", "Who helps the girl?", "Is the girl happy at the end?"],
    usefulLanguage: ["First, ...", "The cat is in the tree.", "A man helps her.", "At the end, ..."],
    sampleAnswer: "First, the girl can't find her cat. Then she sees it in a big tree. A man helps her and takes the cat down. At the end the girl is very happy.",
    minSeconds: 25,
  },

  // ---------- FLYERS ----------
  {
    id: "fl-1", level: "flyers", part: "Part 1 - Find the differences", topic: "Two kitchen pictures",
    prompt: "Look at these two kitchens. They look the same, but some things are different. Tell me the differences you can see.",
    promptVi: "Nhìn hai gian bếp. Chúng giống nhau nhưng có vài điểm khác. Hãy nói các điểm khác.",
    examiner: ["What else is different?", "Where is the cat?", "How many cups are there?"],
    usefulLanguage: ["In my picture ... but in your picture ...", "There is / There are ...", "on the table / under the chair"],
    sampleAnswer: "In my picture the cat is under the table, but in your picture it is on the chair. My kitchen has three cups and yours has two.",
    minSeconds: 25,
  },
  {
    id: "fl-2", level: "flyers", part: "Part 2 - Information exchange", topic: "A birthday party",
    prompt: "You want to know about Lan's birthday party. Ask me questions about the day, the place and the food.",
    promptVi: "Em muốn biết về tiệc sinh nhật của Lan. Hãy hỏi về ngày, địa điểm và món ăn.",
    examiner: ["Ask about the time.", "Ask about the presents.", "Now I ask you: how do you celebrate your birthday?"],
    usefulLanguage: ["When is the party?", "Where is it?", "What food is there?", "On my birthday I usually ..."],
    sampleAnswer: "When is the party? Where is it? What food is there? On my birthday I usually invite my friends and we eat a big chocolate cake.",
    minSeconds: 25,
  },
  {
    id: "fl-3", level: "flyers", part: "Part 3 - Picture story", topic: "The camping trip",
    prompt: "These five pictures show a camping trip that went wrong. Tell the story in your own words.",
    promptVi: "Năm bức tranh kể về chuyến cắm trại gặp sự cố. Hãy kể lại bằng lời của em.",
    examiner: ["What is the problem?", "How do they solve it?", "How do they feel at the end?"],
    usefulLanguage: ["One day, ...", "Suddenly, ...", "Luckily, ...", "In the end, ..."],
    sampleAnswer: "One day two friends go camping in the forest. They put up their tent near a river. Suddenly it starts to rain and the tent falls down. Luckily, a farmer lets them stay in his house. In the end they are dry and they laugh about it.",
    minSeconds: 30,
  },
  {
    id: "fl-4", level: "flyers", part: "Part 4 - Personal questions", topic: "Free time and hobbies",
    prompt: "Tell me about the things you like doing after school and why you enjoy them.",
    promptVi: "Kể về những việc em thích làm sau giờ học và vì sao em thích.",
    examiner: ["How often do you do it?", "Who do you do it with?", "What new hobby would you like to try?"],
    usefulLanguage: ["I really enjoy ...", "twice a week", "because it's relaxing / exciting", "I'd like to try ..."],
    sampleAnswer: "After school I really enjoy swimming because it is relaxing. I go twice a week with my cousin. I'd also like to try playing the guitar next year.",
    minSeconds: 25,
  },
  {
    id: "fl-5", level: "flyers", part: "Part 3 - Odd one out", topic: "Places in town",
    prompt: "Look at these places: a library, a hospital, a supermarket and a swimming pool. Which one is different and why?",
    promptVi: "Nhìn các địa điểm: thư viện, bệnh viện, siêu thị, bể bơi. Nơi nào khác? Vì sao?",
    examiner: ["Why did you choose that one?", "Which place do you visit most?", "What do you do there?"],
    usefulLanguage: ["I think ... is different because ...", "The other places are ...", "I go there to ..."],
    sampleAnswer: "I think the hospital is different because you only go there when you are ill. The other places are fun. I visit the library most and I go there to borrow story books.",
    minSeconds: 25,
  },

  // ---------- KET (A2 Key) ----------
  {
    id: "ke-1", level: "ket", part: "Part 1 - Personal information", topic: "About me",
    prompt: "What's your name? Where do you live? Tell me something about your daily routine.",
    promptVi: "Em tên gì? Em sống ở đâu? Hãy nói về thói quen hằng ngày.",
    examiner: ["What time do you get up?", "How do you go to school?", "What do you do in the evening?"],
    usefulLanguage: ["My name is ... and I live in ...", "I usually get up at ...", "I go to school by ...", "In the evening I ..."],
    sampleAnswer: "My name is Mai and I live in Hanoi with my family. I usually get up at half past six and I go to school by bike. In the evening I do my homework and then I watch a film with my brother.",
    minSeconds: 30,
  },
  {
    id: "ke-2", level: "ket", part: "Part 2 - Photo discussion", topic: "People shopping",
    prompt: "Here is a photo of people shopping at a market. Please tell me what you can see in the photograph.",
    promptVi: "Đây là ảnh mọi người đi chợ. Hãy mô tả những gì em thấy trong ảnh.",
    examiner: ["Do you like shopping?", "Where do you usually buy your clothes?", "Is it better to shop online or in shops?"],
    usefulLanguage: ["In the photo I can see ...", "In the background there is ...", "They look happy.", "I prefer ... because ..."],
    sampleAnswer: "In the photo I can see a busy market with lots of fruit and vegetables. A woman is buying oranges and the seller is smiling. In the background there are colourful umbrellas. I like shopping at markets because the food is fresh and cheap.",
    minSeconds: 35,
  },
  {
    id: "ke-3", level: "ket", part: "Part 2 - Photo discussion", topic: "Sport and exercise",
    prompt: "Look at this photo of people playing sport. Describe the photo and then tell me about the sports you do.",
    promptVi: "Nhìn ảnh mọi người chơi thể thao. Mô tả ảnh rồi nói về môn thể thao em chơi.",
    examiner: ["How often do you exercise?", "Is sport important for students?", "Which sport would you like to learn?"],
    usefulLanguage: ["The people are ...ing", "I play ... twice a week.", "It keeps me healthy.", "I'd like to learn ..."],
    sampleAnswer: "In the photo some teenagers are playing basketball outside. They are wearing sports clothes and they look tired but happy. I play football twice a week after school because it keeps me healthy and I meet my friends.",
    minSeconds: 35,
  },
  {
    id: "ke-4", level: "ket", part: "Part 1 - Personal information", topic: "Food and cooking",
    prompt: "Tell me about the food you eat. What is your favourite meal and who cooks it?",
    promptVi: "Nói về đồ ăn của em. Món em thích nhất là gì và ai nấu?",
    examiner: ["Do you help in the kitchen?", "Do you often eat in restaurants?", "What food don't you like?"],
    usefulLanguage: ["My favourite meal is ...", "My mother cooks it ...", "I sometimes help by ...", "I don't really like ... because ..."],
    sampleAnswer: "My favourite meal is pho. My grandmother cooks it every Sunday morning and it smells wonderful. I sometimes help her by washing the herbs. I don't really like fast food because it is too salty.",
    minSeconds: 30,
  },
  {
    id: "ke-5", level: "ket", part: "Part 2 - Photo discussion", topic: "A family celebration",
    prompt: "Here is a photo of a family celebration. Describe what is happening and talk about a celebration you enjoy.",
    promptVi: "Đây là ảnh một buổi sum họp gia đình. Mô tả ảnh và nói về dịp lễ em thích.",
    examiner: ["Who do you celebrate with?", "What food do you eat?", "Why do you enjoy it?"],
    usefulLanguage: ["There are ... people around the table.", "They are celebrating ...", "We always ...", "The best part is ..."],
    sampleAnswer: "In the photo there are about eight people around a big table and they are celebrating a birthday. A girl is blowing out the candles. My favourite celebration is Tet because we visit our grandparents, eat banh chung and get lucky money.",
    minSeconds: 35,
  },

  // ---------- PET (B1 Preliminary) ----------
  {
    id: "pe-1", level: "pet", part: "Part 2 - Long turn", topic: "People travelling",
    prompt: "Here is your photograph. It shows people travelling. Please tell me what you can see in the photograph. You have about one minute.",
    promptVi: "Đây là ảnh của em, về những người đang di chuyển. Hãy mô tả trong khoảng một phút.",
    examiner: ["How do you usually travel?", "What are the problems with public transport?", "Would you like to travel abroad?"],
    usefulLanguage: ["In the foreground / background ...", "It looks as if ...", "They seem to be ...ing", "On the left / right ..."],
    sampleAnswer: "The photograph shows a crowded train station in the early morning. In the foreground a young woman is checking her phone while she waits, and she seems to be in a hurry. In the background several passengers are getting onto a blue train. It looks as if it is a normal working day, because most people are wearing office clothes and carrying bags.",
    minSeconds: 45,
  },
  {
    id: "pe-2", level: "pet", part: "Part 3 - Collaborative task", topic: "Planning a school trip",
    prompt: "Your class is planning a one-day school trip. Talk together about the different places you could visit and decide which one is best.",
    promptVi: "Lớp em lên kế hoạch cho chuyến đi một ngày. Hãy bàn về các nơi có thể đến và chọn nơi tốt nhất.",
    examiner: ["What about the museum?", "Would that be expensive?", "So which place do you both prefer?"],
    usefulLanguage: ["How about ...?", "That's a good idea, but ...", "I'd rather ... because ...", "Shall we agree on ...?"],
    sampleAnswer: "How about going to the science museum? It's cheap and we would learn a lot. That's a good idea, but the beach might be more relaxing after the exams. I'd rather choose the museum because the weather is unpredictable. Shall we agree on the museum then?",
    minSeconds: 45,
  },
  {
    id: "pe-3", level: "pet", part: "Part 4 - Discussion", topic: "Technology and study",
    prompt: "Do you think students learn better with technology than with books? Give reasons for your opinion.",
    promptVi: "Em nghĩ học sinh học tốt hơn với công nghệ hay với sách? Nêu lý do.",
    examiner: ["Are there any disadvantages?", "How do you use your phone for studying?", "Should schools ban phones?"],
    usefulLanguage: ["In my opinion ...", "One advantage is that ...", "On the other hand ...", "Overall, I'd say ..."],
    sampleAnswer: "In my opinion technology helps a lot because we can watch videos and practise online at our own speed. One advantage is that apps correct our mistakes immediately. On the other hand, phones can be distracting, so schools should set clear rules. Overall, I'd say we need both books and technology.",
    minSeconds: 45,
  },
  {
    id: "pe-4", level: "pet", part: "Part 2 - Long turn", topic: "People working outdoors",
    prompt: "Here is your photograph. It shows people working outdoors. Describe the photograph for about one minute.",
    promptVi: "Ảnh của em về những người làm việc ngoài trời. Hãy mô tả khoảng một phút.",
    examiner: ["Would you like a job outdoors?", "What are the difficulties of that job?", "Is outdoor work well paid in your country?"],
    usefulLanguage: ["The picture was probably taken in ...", "They're wearing ... because ...", "It must be quite hard work.", "Judging by ..."],
    sampleAnswer: "The picture was probably taken on a farm in the middle of summer. Three workers are picking vegetables and putting them into large baskets. They're wearing hats and long sleeves because the sun is very strong. It must be quite hard work, but they look used to it.",
    minSeconds: 45,
  },
  {
    id: "pe-5", level: "pet", part: "Part 3 - Collaborative task", topic: "Helping the environment at school",
    prompt: "Your school wants to become greener. Talk together about the different ideas and decide which two would work best.",
    promptVi: "Trường muốn thân thiện với môi trường hơn. Hãy bàn các ý tưởng và chọn hai ý tốt nhất.",
    examiner: ["What about recycling bins?", "Would students actually do that?", "Which two ideas do you choose?"],
    usefulLanguage: ["Another possibility is ...", "I'm not sure that would work because ...", "The main benefit is ...", "Let's go for ... and ..."],
    sampleAnswer: "Another possibility is putting recycling bins in every classroom, which is cheap and easy. I'm not sure solar panels would work because they cost too much. The main benefit of a school garden is that students learn while they help the environment. Let's go for the bins and the garden.",
    minSeconds: 45,
  },
  {
    id: "pe-6", level: "pet", part: "Part 4 - Discussion", topic: "Free time and screen time",
    prompt: "Some people say young people spend too much free time on screens. What do you think?",
    promptVi: "Có ý kiến cho rằng giới trẻ dành quá nhiều thời gian rảnh cho màn hình. Em nghĩ sao?",
    examiner: ["How much screen time do you have?", "What other hobbies do you have?", "How can families reduce screen time?"],
    usefulLanguage: ["It depends on ...", "Personally, I ...", "That said, ...", "A good solution would be ..."],
    sampleAnswer: "It depends on what you do on the screen. Personally, I use my tablet for online lessons and drawing, which I think is useful. That said, I know friends who scroll for hours and then sleep badly. A good solution would be agreeing on screen-free evenings twice a week.",
    minSeconds: 45,
  },
];

// Full bank = core tasks + expansion (10+ tasks per level).
export const allCambridgeSpeakingTasks: CambridgeSpeakingTask[] = [
  ...cambridgeSpeakingTasks,
  ...cambridgeSpeakingTasksExpansion,
  ...cambridgeSpeakingTasksExpansion2,
  ...cambridgeSpeakingTasksExpansion3,
  ...cambridgeSpeakingTasksExpansion4,
  ...cambridgeSpeakingTasksExpansion5,
  ...cambridgeSpeakingTasksExpansion6,
  ...cambridgeSpeakingTasksExpansion7,
];

const LEVEL_ORDER: CambridgeSpeakLevel[] = ["starters", "movers", "flyers", "ket", "pet"];

export const tasksByLevel = (level: CambridgeSpeakLevel) =>
  allCambridgeSpeakingTasks
    .filter((t) => t.level === level)
    .sort((a, b) => LEVEL_ORDER.indexOf(a.level) - LEVEL_ORDER.indexOf(b.level));

