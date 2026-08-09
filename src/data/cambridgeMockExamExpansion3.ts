/**
 * @file cambridgeMockExamExpansion3.ts
 * @description 5 further Cambridge mock exams (one per level) so every level has
 *              five complete papers. Themes: Starters - Colours & Numbers;
 *              Movers - Animals & Places; Flyers - School Projects & Technology;
 *              KET - Holidays & Free Time; PET - Work, Study & Society.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { CambridgeMockExam, CambridgeMockQuestion } from "./cambridgeMockExamData";

type Tuple = [question: string, options: string[], correct: number, explanation: string, passage?: string];

const build = (rw: Tuple[], listening: Tuple[]): CambridgeMockQuestion[] => [
  ...rw.map((t, i) => ({
    id: i + 1,
    section: "Reading & Writing" as const,
    question: t[0],
    options: t[1],
    correctAnswer: t[2],
    explanation: t[3],
    ...(t[4] ? { passage: t[4] } : {}),
  })),
  ...listening.map((t, i) => ({
    id: rw.length + i + 1,
    section: "Listening" as const,
    question: t[0],
    options: t[1],
    correctAnswer: t[2],
    explanation: t[3],
    ...(t[4] ? { passage: t[4] } : {}),
  })),
];

/* ===================== STARTERS 5 - Colours & Numbers ===================== */
const s5Rw: Tuple[] = [
  ["Ten and two make ___.", ["eleven", "twelve", "twenty", "two"], 1, "10 + 2 = 12 (twelve)."],
  ["An orange is ___.", ["blue", "orange", "black", "grey"], 1, "An orange is orange."],
  ["How many days are in a week?", ["five", "six", "seven", "eight"], 2, "A week has seven days."],
  ["Mix red and yellow. You get ___.", ["green", "orange", "purple", "blue"], 1, "Red + yellow = orange."],
  ["Count: 🍎🍎🍎🍎", ["three", "four", "five", "six"], 1, "There are four apples."],
  ["The number after nineteen is ___.", ["twelve", "twenty", "nine", "twenty-one"], 1, "19 + 1 = 20."],
  ["A zebra is black and ___.", ["white", "pink", "green", "brown"], 0, "Zebras are black and white."],
  ["Which is a colour?", ["chair", "purple", "seven", "table"], 1, "Purple is a colour."],
  ["I am ___ years old. (I have 6 candles)", ["four", "five", "six", "seven"], 2, "Six candles = six years old."],
  ["Five plus five is ___.", ["nine", "ten", "eleven", "fifteen"], 1, "5 + 5 = 10."],
  ["Lemons are ___.", ["yellow", "blue", "black", "pink"], 0, "Lemons are yellow."],
  ["Which number is the biggest?", ["8", "13", "11", "9"], 1, "13 is the biggest number here."],
  ["My shoes are ___. (they are the colour of the night)", ["white", "black", "yellow", "red"], 1, "The night is dark, so black."],
  ["Two hands have ___ fingers.", ["five", "eight", "ten", "twelve"], 2, "5 + 5 = 10 fingers."],
  ["Which one is not a number?", ["three", "eight", "brown", "twelve"], 2, "Brown is a colour, not a number."],
];
const s5Ls: Tuple[] = [
  ["What colour is the balloon?", ["red", "green", "blue", "pink"], 1, "The balloon is green.", "Listen: 'Look at my balloon! It is big and green.'"],
  ["How many cats are there?", ["two", "three", "four", "five"], 1, "There are three cats.", "Listen: 'I can see three cats on the wall.'"],
  ["What colour is her bike?", ["purple", "yellow", "black", "white"], 0, "Her bike is purple.", "Listen: 'My new bike is purple with white wheels.'"],
  ["How old is Ben?", ["five", "six", "seven", "eight"], 2, "Ben is seven.", "Listen: 'Ben is seven today. He has seven candles on his cake.'"],
  ["How many pencils are in the box?", ["six", "eight", "nine", "ten"], 1, "There are eight pencils.", "Listen: 'There are eight pencils in my box - four blue and four red.'"],
  ["What colour are the flowers?", ["pink", "orange", "blue", "brown"], 0, "The flowers are pink.", "Listen: 'Grandma has pink flowers in her garden.'"],
  ["How many children are playing?", ["four", "five", "six", "seven"], 2, "Six children are playing.", "Listen: 'Six children are playing football in the park.'"],
  ["What colour is the door?", ["red", "blue", "green", "grey"], 1, "The door is blue.", "Listen: 'Our school door is blue and very big.'"],
  ["How many fish does he have?", ["two", "three", "four", "five"], 3, "He has five fish.", "Listen: 'I have five fish - two orange and three white.'"],
  ["What colour is the bus?", ["yellow", "red", "green", "black"], 1, "The bus is red.", "Listen: 'The bus to school is red.'"],
];

const starters5: CambridgeMockExam = {
  id: "cambridge-starters-5",
  title: "Starters Mock Test 5 - Colours & Numbers",
  titleVi: "Đề thi thử Starters 5 - Màu sắc & Số đếm",
  level: "starters",
  duration: 20,
  totalQuestions: 25,
  questions: build(s5Rw, s5Ls),
};

/* ===================== MOVERS 5 - Animals & Places ===================== */
const m5Rw: Tuple[] = [
  ["Elephants are ___ than horses.", ["big", "bigger", "biggest", "more big"], 1, "Comparative: bigger than."],
  ["A camel lives in the ___.", ["desert", "sea", "forest ice", "river"], 0, "Camels live in deserts."],
  ["Penguins can swim but they ___ fly.", ["can", "can't", "don't can", "aren't"], 1, "Penguins cannot fly: can't."],
  ["We saw dolphins ___ our boat trip.", ["during", "while", "when the", "since"], 0, "'During' + a noun (our boat trip)."],
  ["A place with many trees:", ["forest", "island", "beach", "cave"], 0, "A forest is full of trees."],
  ["Which animal is a reptile?", ["crocodile", "rabbit", "eagle", "whale"], 0, "A crocodile is a reptile."],
  ["Bears sleep ___ the winter.", ["at", "on", "in", "for the"], 2, "'In' + season: in the winter."],
  ["We keep animals safely in a ___.", ["zoo", "kitchen", "bus", "library"], 0, "A zoo keeps animals."],
  ["The kangaroo ___ very high.", ["jump", "jumps", "jumping", "is jump"], 1, "Third person singular: jumps."],
  ["Which lives in the ocean?", ["shark", "sheep", "spider", "squirrel"], 0, "A shark lives in the ocean."],
  ["Look! The monkeys ___ bananas now.", ["eat", "eats", "are eating", "ate"], 2, "'Now' needs the present continuous."],
  ["A baby cat is a ___.", ["puppy", "kitten", "calf", "chick"], 1, "A baby cat is a kitten."],
  ["Mountains are ___ than hills.", ["high", "higher", "highest", "more high"], 1, "Comparative: higher than."],
  ["Choose the wild animal:", ["cow", "tiger", "sheep", "hen"], 1, "A tiger is a wild animal."],
  ["Birds build ___ in trees.", ["nests", "caves", "holes only", "shells"], 0, "Birds build nests."],
];
const m5Ls: Tuple[] = [
  ["Which animal did they see first?", ["giraffes", "lions", "monkeys", "bears"], 1, "They saw the lions first.", "Listen: 'At the zoo we saw the lions first, then the giraffes.'"],
  ["Where does the elephant live?", ["Africa", "Europe", "Antarctica", "Australia"], 0, "The elephant comes from Africa.", "Listen: 'This elephant came from Africa five years ago.'"],
  ["How many baby ducks are there?", ["four", "five", "six", "seven"], 2, "There are six ducklings.", "Listen: 'Look at the six baby ducks following their mother.'"],
  ["What does the parrot say?", ["hello", "goodbye", "thank you", "nothing"], 0, "The parrot says hello.", "Listen: 'Our parrot can say hello when visitors arrive.'"],
  ["When is the penguin show?", ["11 am", "1 pm", "2 pm", "4 pm"], 2, "The show is at two o'clock.", "Listen: 'The penguin show starts at two o'clock this afternoon.'"],
  ["Where did they have lunch?", ["near the lake", "in the car", "at home", "by the gate"], 0, "They ate near the lake.", "Listen: 'We had our sandwiches near the lake in the middle of the park.'"],
  ["Which animal is her favourite?", ["dolphin", "tiger", "snake", "owl"], 0, "Dolphins are her favourite.", "Listen: 'My favourite animals are dolphins because they are so clever.'"],
  ["How tall is the giraffe?", ["3 metres", "4 metres", "5 metres", "6 metres"], 2, "The giraffe is five metres tall.", "Listen: 'This giraffe is nearly five metres tall.'"],
  ["What must visitors not do?", ["feed the animals", "take photos", "walk slowly", "ask questions"], 0, "Visitors must not feed the animals.", "Listen: 'Please remember: visitors must not feed the animals.'"],
  ["Where is the snake house?", ["next to the café", "behind the lake", "near the gate", "under the bridge"], 0, "It is next to the café.", "Listen: 'The snake house is next to the café at the end of the path.'"],
];

const movers5: CambridgeMockExam = {
  id: "cambridge-movers-5",
  title: "Movers Mock Test 5 - Animals & Places",
  titleVi: "Đề thi thử Movers 5 - Động vật & Địa điểm",
  level: "movers",
  duration: 30,
  totalQuestions: 25,
  questions: build(m5Rw, m5Ls),
};

/* ================ FLYERS 5 - School Projects & Technology ================ */
const f5Rw: Tuple[] = [
  ["We ___ our science project yesterday.", ["finish", "finished", "finishing", "have finish"], 1, "'Yesterday' + past simple: finished."],
  ["This tablet is ___ than my old one.", ["light", "lighter", "lightest", "more light"], 1, "Comparative: lighter than."],
  ["I ___ my homework on the computer every evening.", ["do", "does", "am doing", "did"], 0, "'Every evening' = present simple: do."],
  ["Remember to ___ your work before you close it.", ["save", "safe", "saving", "saved"], 0, "After 'to' we use the base verb: save."],
  ["A machine that prints paper copies:", ["printer", "keyboard", "screen", "mouse"], 0, "A printer makes paper copies."],
  ["She has ___ finished her presentation.", ["yet", "just", "still", "ever"], 1, "'Just' = a very short time ago."],
  ["We use a ___ to search for information.", ["search engine", "photo album", "notebook only", "ruler"], 0, "A search engine finds information online."],
  ["If my laptop ___, I will use the school computer.", ["breaks", "will break", "broke", "breaking"], 0, "First conditional: present simple after 'if'."],
  ["The class was cancelled ___ the teacher was ill.", ["so", "because", "but", "although"], 1, "'Because' gives the reason."],
  ["Our group ___ the poster together last week.", ["make", "makes", "made", "making"], 2, "Past simple: made."],
  ["A short talk with slides:", ["presentation", "invitation", "translation", "celebration"], 0, "A presentation uses slides."],
  ["He is good ___ making videos.", ["in", "at", "on", "for"], 1, "'Good at' + V-ing."],
  ["Choose the polite request:", ["Give me the mouse.", "Could you pass me the mouse, please?", "Mouse now.", "You must give mouse."], 1, "'Could you ... please?' is polite."],
  ["We must not ___ other people's work.", ["copy", "copying", "copied", "to copying"], 0, "After 'must not' we use the base verb."],
  ["The project ___ by three students.", ["did", "was done", "done", "is doing"], 1, "Passive past simple: was done."],
];
const f5Ls: Tuple[] = [
  ["What is the project about?", ["space", "recycling", "sport", "music"], 1, "The project is about recycling.", "Listen: 'Our group project is about recycling plastic in our school.'"],
  ["When must the project be handed in?", ["Monday", "Wednesday", "Friday", "next month"], 2, "It is due on Friday.", "Listen: 'Don't forget your projects must be handed in on Friday morning.'"],
  ["How many slides does she have?", ["six", "eight", "ten", "twelve"], 2, "She has ten slides.", "Listen: 'My presentation has ten slides and lasts five minutes.'"],
  ["How long is the presentation?", ["3 minutes", "5 minutes", "8 minutes", "10 minutes"], 1, "It lasts five minutes.", "Listen: 'My presentation has ten slides and lasts five minutes.'"],
  ["What problem did the boy have?", ["lost the file", "broke the screen", "forgot the class", "no internet"], 3, "He had no internet at home.", "Listen: 'I couldn't finish my research because the internet at home stopped working.'"],
  ["What does the teacher suggest?", ["work alone", "work in pairs", "start again", "write by hand"], 1, "The teacher suggests working in pairs.", "Listen: 'For this task I'd like you to work in pairs and share your ideas.'"],
  ["Where is the computer room?", ["first floor", "second floor", "ground floor", "basement"], 1, "It is on the second floor.", "Listen: 'The computer room is on the second floor, opposite the library.'"],
  ["What does the girl need to borrow?", ["a camera", "a charger", "a book", "a pencil"], 1, "She needs to borrow a charger.", "Listen: 'Could I borrow your charger? My laptop battery is almost empty.'"],
  ["Why does he like the app?", ["it is free", "it is fast", "it saves time on notes", "it has games"], 2, "It helps him organise notes quickly.", "Listen: 'This app is great - it organises all my class notes and saves me loads of time.'"],
  ["How many students are in the group?", ["two", "three", "four", "five"], 2, "There are four students.", "Listen: 'There are four of us in the group: me, Ana, Luis and Kim.'"],
];

const flyers5: CambridgeMockExam = {
  id: "cambridge-flyers-5",
  title: "Flyers Mock Test 5 - School Projects & Technology",
  titleVi: "Đề thi thử Flyers 5 - Dự án học tập & Công nghệ",
  level: "flyers",
  duration: 35,
  totalQuestions: 25,
  questions: build(f5Rw, f5Ls),
};

/* ================== KET 5 - Holidays & Free Time ================== */
const k5Rw: Tuple[] = [
  ["We're looking forward ___ our holiday.", ["to", "for", "at", "on"], 0, "'Look forward to' + noun / V-ing."],
  ["I ___ to Spain three times.", ["went", "have been", "am going", "was"], 1, "Experience up to now: present perfect."],
  ["Read: 'Rooms must be left by 11 am.' What must guests do?", ["arrive at 11", "leave the room before 11", "pay at 11", "clean the room"], 1, "Guests must check out before 11 am.", "Notice in a hotel: ROOMS MUST BE LEFT BY 11 AM ON THE DAY OF DEPARTURE."],
  ["It was ___ hot that we stayed inside.", ["such", "so", "too much", "very that"], 1, "'So + adjective + that'."],
  ["Would you like ___ swimming this afternoon?", ["go", "to go", "going", "went"], 1, "'Would you like to' + base verb."],
  ["A place to stay that is cheaper than a hotel:", ["hostel", "airport", "station", "museum"], 0, "A hostel is cheaper accommodation."],
  ["We stayed in a hotel ___ the beach.", ["near", "nearly", "next", "close"], 0, "'Near the beach' is correct."],
  ["I ___ my camera at home, so I have no photos.", ["forgot", "left", "lost it", "missed"], 1, "'Leave something somewhere' = not take it with you."],
  ["Read: 'Guided tours every hour from 10 am to 4 pm.' How often are tours?", ["twice a day", "every hour", "every two hours", "only at 10"], 1, "Tours run every hour.", "Sign at a castle: GUIDED TOURS EVERY HOUR FROM 10 AM TO 4 PM."],
  ["This is the ___ holiday I have ever had.", ["good", "better", "best", "most good"], 2, "Superlative: the best."],
  ["We must book the tickets ___ they sell out.", ["before", "after", "while", "since"], 0, "You book before tickets sell out."],
  ["What ___ you do last weekend?", ["did", "do", "does", "were"], 0, "Past simple question: did + base verb."],
  ["I'd rather ___ at home tonight.", ["stay", "to stay", "staying", "stayed"], 0, "'Would rather' + base verb."],
  ["The flight ___ two hours late.", ["arrive", "arrived", "arriving", "is arrive"], 1, "Past simple: arrived."],
  ["A trip that lasts one day only:", ["day trip", "long weekend", "season", "tour guide"], 0, "A day trip lasts a single day."],
];
const k5Ls: Tuple[] = [
  ["Where did the woman go on holiday?", ["Italy", "Greece", "Portugal", "Turkey"], 1, "She went to Greece.", "Listen: 'Last summer we spent two weeks in Greece, mostly on the islands.'"],
  ["How long was the holiday?", ["one week", "ten days", "two weeks", "a month"], 2, "It was two weeks.", "Listen: 'Last summer we spent two weeks in Greece, mostly on the islands.'"],
  ["What is the weather like tomorrow?", ["sunny", "rainy", "windy", "snowy"], 1, "Rain is expected tomorrow.", "Listen: 'Take an umbrella - they say it will rain all day tomorrow.'"],
  ["What does the man do at weekends?", ["fishing", "climbing", "painting", "running"], 1, "He goes climbing.", "Listen: 'At weekends I usually go climbing with friends in the hills.'"],
  ["How much is the museum ticket for students?", ["£3", "£4", "£5", "£8"], 1, "Students pay four pounds.", "Listen: 'Adults pay eight pounds and students only four.'"],
  ["What time does the tour start?", ["9:30", "10:00", "10:30", "11:00"], 2, "The tour starts at half past ten.", "Listen: 'Our guided tour begins at half past ten by the main gate.'"],
  ["Why didn't they swim?", ["water too cold", "pool closed", "no towels", "too busy"], 0, "The water was too cold.", "Listen: 'We wanted to swim, but the water was far too cold that morning.'"],
  ["What did she buy as a present?", ["a book", "a scarf", "a mug", "a postcard"], 1, "She bought a scarf.", "Listen: 'I bought my sister a beautiful blue scarf from the market.'"],
  ["Where are they meeting?", ["at the hotel", "at the station", "at the beach", "at the café"], 1, "They meet at the station.", "Listen: 'Let's meet at the station at eight so we don't miss the coach.'"],
  ["What is included in the price?", ["breakfast", "all meals", "flights", "nothing"], 0, "Breakfast is included.", "Listen: 'The price of the room includes breakfast but not dinner.'"],
];

const ket5: CambridgeMockExam = {
  id: "cambridge-ket-5",
  title: "KET Mock Test 5 - Holidays & Free Time",
  titleVi: "Đề thi thử KET 5 - Du lịch & Thời gian rảnh",
  level: "ket",
  duration: 40,
  totalQuestions: 25,
  questions: build(k5Rw, k5Ls),
};

/* ================ PET 6 - Work, Study & Society ================ */
const p6Passage =
  "When Mara left school she had no idea what to study, so she took a year out and worked in a small bookshop. At first she thought the job was simply a way to earn money, but she soon discovered how much she enjoyed helping customers find exactly the right book. Her manager encouraged her to organise a monthly reading evening, and within six months more than forty people were attending. That experience, Mara says, taught her more about communication than any classroom had. She eventually applied to study publishing, and she still runs a reading group today.";

const p6Rw: Tuple[] = [
  ["Why did Mara take a year out?", ["to earn money for travel", "she was unsure what to study", "her family asked her to", "she failed her exams"], 1, "She had no idea what to study.", p6Passage],
  ["How did her opinion of the job change?", ["it became boring", "she realised she enjoyed helping people", "she wanted more money", "she found it too hard"], 1, "She discovered she enjoyed helping customers.", p6Passage],
  ["Who suggested the reading evening?", ["a customer", "her manager", "her teacher", "her sister"], 1, "Her manager encouraged her.", p6Passage],
  ["How many people attended after six months?", ["about twenty", "about thirty", "more than forty", "over a hundred"], 2, "More than forty people were attending.", p6Passage],
  ["What did the experience teach her?", ["how to sell", "about communication", "about accounting", "how to write"], 1, "It taught her about communication.", p6Passage],
  ["What is the best title for the text?", ["A year that changed a career", "How to open a bookshop", "The history of publishing", "Why exams matter"], 0, "The text is about how a gap year shaped her career."],
  ["I'm interested ___ studying economics.", ["on", "in", "for", "of"], 1, "'Interested in' + V-ing."],
  ["She's used to ___ early for work.", ["get up", "getting up", "got up", "gets up"], 1, "'Be used to' + V-ing."],
  ["If I ___ harder last term, I would have passed.", ["study", "studied", "had studied", "have studied"], 2, "Third conditional: had + past participle."],
  ["He asked me ___ I had finished the report.", ["that", "if", "what", "which"], 1, "Reported yes/no question uses 'if'."],
  ["Closest meaning: 'The deadline was extended.'", ["cancelled", "moved later", "moved earlier", "ignored"], 1, "To extend a deadline is to give more time."],
  ["Applicants ___ send a CV and a cover letter.", ["should", "should to", "shoulds", "are should"], 0, "'Should' + base verb."],
  ["The meeting was put ___ until Friday.", ["off", "on", "up", "away"], 0, "'Put off' means postpone."],
  ["Volunteering looks good ___ a CV.", ["at", "on", "in", "for"], 1, "We write things on a CV."],
  ["Although she was nervous, she ___ the interview well.", ["handled", "handling", "handle", "has handle"], 0, "Past simple: handled."],
];
const p6Ls: Tuple[] = [
  ["What job is the woman applying for?", ["teacher", "designer", "nurse", "engineer"], 1, "She is applying to be a graphic designer.", "Listen: 'I've applied for a graphic designer position at a studio in Bristol.'"],
  ["When is the interview?", ["Monday", "Tuesday", "Thursday", "Friday"], 2, "The interview is on Thursday.", "Listen: 'They emailed this morning - my interview is on Thursday at two.'"],
  ["What advice does the speaker give?", ["arrive early", "wear a suit", "bring examples of work", "learn the salary"], 2, "He advises bringing examples of work.", "Listen: 'Whatever you do, take a folder with examples of your best work.'"],
  ["How long is the training course?", ["two weeks", "one month", "three months", "six months"], 2, "The course lasts three months.", "Listen: 'New staff complete a three-month training course before starting full-time.'"],
  ["What does the student want to study?", ["law", "medicine", "publishing", "architecture"], 2, "She wants to study publishing.", "Listen: 'After my gap year I'd really like to study publishing at university.'"],
  ["Why is the man taking evening classes?", ["to change career", "to meet friends", "his boss told him", "for a certificate only"], 0, "He wants to change career.", "Listen: 'I'm taking evening classes in accounting because I want to change career next year.'"],
  ["How many people applied for the job?", ["twelve", "forty", "sixty", "over a hundred"], 3, "Over a hundred people applied.", "Listen: 'More than a hundred people applied, so I was lucky to get an interview.'"],
  ["What will the volunteers do on Saturday?", ["paint a school", "clean a park", "cook meals", "teach children"], 0, "They will paint a local school.", "Listen: 'On Saturday our group of volunteers will help paint the local primary school.'"],
  ["What does the speaker like about the company?", ["free lunches", "flexible hours", "big office", "short holidays"], 1, "She likes the flexible working hours.", "Listen: 'The best thing about this company is the flexible hours - I can start at seven or ten.'"],
  ["What should listeners do next?", ["send an email", "phone the office", "visit the website", "wait for a letter"], 2, "They should visit the website for details.", "Listen: 'For full details of all our courses, please visit our website.'"],
];

const pet6: CambridgeMockExam = {
  id: "cambridge-pet-6",
  title: "PET Mock Test 6 - Work, Study & Society",
  titleVi: "Đề thi thử PET 6 - Công việc, Học tập & Xã hội",
  level: "pet",
  duration: 50,
  totalQuestions: 25,
  questions: build(p6Rw, p6Ls),
};

export const cambridgeMockExamExpansion3: CambridgeMockExam[] = [
  starters5,
  movers5,
  flyers5,
  ket5,
  pet6,
];
