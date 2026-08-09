/**
 * @file cambridgeMockExamExpansion2.ts
 * @description 5 additional Cambridge YLE / KET / PET mock exams (one per level),
 *              written to match real Cambridge paper shape: a Reading & Writing
 *              half and a Listening half, with a short explanation on every item.
 *              Themes: Starters - Family & Home; Movers - Food & Shopping;
 *              Flyers - Sports & Health; KET - City Life & Transport;
 *              PET - Media & Environment.
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

/* ========================= STARTERS 4 - Family & Home ========================= */
const starters4Rw: Tuple[] = [
  ["My mother's mother is my ___.", ["aunt", "grandmother", "sister", "cousin"], 1, "Your mother's mother is your grandmother."],
  ["We cook food in the ___.", ["bedroom", "kitchen", "garden", "bathroom"], 1, "We cook in the kitchen."],
  ["I sleep in my ___.", ["bed", "chair", "table", "door"], 0, "We sleep in a bed."],
  ["My father's son is my ___.", ["brother", "uncle", "father", "friend"], 0, "Your father's son is your brother."],
  ["Which one is in the bathroom?", ["sofa", "bath", "fridge", "bed"], 1, "A bath is in the bathroom."],
  ["We watch TV in the ___ room.", ["living", "washing", "cooking", "sleeping"], 0, "We watch TV in the living room."],
  ["___ is your name? - My name is Ben.", ["Who", "What", "Where", "When"], 1, "We ask 'What is your name?'"],
  ["Milk is in the ___.", ["fridge", "window", "door", "lamp"], 0, "We keep milk cold in the fridge."],
  ["I have two ___. They are twins.", ["sister", "sisters", "sisteres", "sisters'"], 1, "Two + plural noun: sisters."],
  ["The cat is ___ the sofa. (picture: cat on top)", ["in", "on", "under", "behind"], 1, "'On' means on top of something."],
  ["We open the ___ to go outside.", ["door", "floor", "wall", "roof"], 0, "We go outside through the door."],
  ["My family ___ dinner at six.", ["eat", "eats", "eating", "to eat"], 1, "'Family' takes the -s form: eats."],
  ["Which room has a bed?", ["kitchen", "bedroom", "garden", "garage"], 1, "A bed is in the bedroom."],
  ["This is ___ house. It is small.", ["my", "me", "I", "mine house"], 0, "Before a noun we use 'my'."],
  ["We wash our hands in the ___.", ["sink", "bed", "sofa", "clock"], 0, "We wash hands in a sink."],
];
const starters4Ls: Tuple[] = [
  ["How many people are in the family?", ["3", "4", "5", "6"], 1, "Mum, dad, the speaker and one brother = four.", "Listen: 'In my family there is my mum, my dad, my brother and me.'"],
  ["Where is grandma?", ["in the garden", "in the kitchen", "in the car", "at school"], 0, "Grandma is in the garden with flowers.", "Listen: 'Grandma is in the garden. She is looking at her flowers.'"],
  ["What colour is the door?", ["red", "blue", "green", "white"], 2, "The speaker says the door is green.", "Listen: 'Our house is white and our door is green.'"],
  ["What is dad doing?", ["cooking", "sleeping", "reading", "driving"], 0, "Dad is making soup, so he is cooking.", "Listen: 'Dad is in the kitchen. He is making soup for lunch.'"],
  ["Where is the dog?", ["on the bed", "under the table", "in the box", "on the chair"], 1, "The dog is under the table.", "Listen: 'My dog sleeps under the table every afternoon.'"],
  ["How old is the sister?", ["five", "six", "seven", "eight"], 2, "The sister is seven.", "Listen: 'My sister is seven years old. Her birthday is in May.'"],
  ["What is on the wall?", ["a clock", "a bed", "a bath", "a car"], 0, "A big clock is on the wall.", "Listen: 'There is a big clock on the wall in our living room.'"],
  ["What does mum drink?", ["milk", "water", "tea", "juice"], 2, "Mum drinks tea in the morning.", "Listen: 'Mum drinks tea every morning before work.'"],
  ["How many bedrooms are there?", ["one", "two", "three", "four"], 2, "The house has three bedrooms.", "Listen: 'Our house has three bedrooms and one bathroom.'"],
  ["Who is Tom?", ["her brother", "her cousin", "her dad", "her friend"], 1, "Tom is her cousin.", "Listen: 'Tom is my cousin. He lives near my house.'"],
];

const starters4: CambridgeMockExam = {
  id: "cambridge-starters-4",
  title: "Starters Mock Test 4 - Family & Home",
  titleVi: "Đề thi thử Starters 4 - Gia đình & Ngôi nhà",
  level: "starters",
  duration: 20,
  totalQuestions: 25,
  questions: build(starters4Rw, starters4Ls),
};

/* ========================= MOVERS 4 - Food & Shopping ========================= */
const movers4Rw: Tuple[] = [
  ["How much ___ do you need?", ["apples", "sugar", "eggs", "biscuits"], 1, "'How much' goes with uncountable nouns like sugar."],
  ["There aren't ___ oranges left.", ["some", "any", "much", "a"], 1, "In negatives we use 'any' with plural nouns."],
  ["A place that sells bread:", ["bakery", "library", "cinema", "hospital"], 0, "A bakery sells bread and cakes."],
  ["I'd like ___ bottle of water, please.", ["a", "an", "some", "any"], 0, "'Bottle' begins with a consonant sound: a bottle."],
  ["This shirt is ___ than that one.", ["cheap", "cheaper", "cheapest", "more cheap"], 1, "Comparative of a short adjective: cheaper."],
  ["We pay at the ___.", ["checkout", "kitchen", "garden", "bus stop"], 0, "You pay at the checkout in a shop."],
  ["Choose the vegetable:", ["banana", "carrot", "cake", "cheese"], 1, "A carrot is a vegetable."],
  ["Would you like ___ juice?", ["any", "some", "many", "a"], 1, "In offers we use 'some'."],
  ["The market is ___ the supermarket.", ["cheaper than", "cheap than", "more cheap", "cheapest"], 0, "Comparative + than."],
  ["A person who sells things:", ["driver", "shop assistant", "nurse", "teacher"], 1, "A shop assistant helps customers in a shop."],
  ["I have ___ money for a snack.", ["a few", "a little", "many", "few of"], 1, "Money is uncountable: a little money."],
  ["Milk, cheese and yoghurt are ___ products.", ["meat", "dairy", "fruit", "bakery"], 1, "They all come from milk: dairy products."],
  ["How ___ are these shoes? - £20.", ["many", "much", "long", "old"], 1, "We ask price with 'How much'."],
  ["There ___ some rice in the bowl.", ["is", "are", "were", "have"], 0, "Rice is uncountable: there is."],
  ["Choose the correct order:", ["a big red bag", "a red big bag", "big a red bag", "red a big bag"], 0, "Adjective order: size before colour."],
];
const movers4Ls: Tuple[] = [
  ["What does the girl buy?", ["bread and milk", "bread and eggs", "milk and eggs", "cake and milk"], 1, "She buys bread and eggs.", "Listen: 'I need to buy bread and eggs for breakfast.'"],
  ["How much is the T-shirt?", ["£7", "£9", "£11", "£15"], 1, "The T-shirt costs nine pounds.", "Listen: 'That T-shirt is nine pounds and the cap is five pounds.'"],
  ["What time does the market close?", ["4 pm", "5 pm", "6 pm", "7 pm"], 2, "The market closes at six.", "Listen: 'The market opens at eight and closes at six.'"],
  ["What fruit does he not like?", ["apples", "grapes", "bananas", "pears"], 2, "He does not like bananas.", "Listen: 'I love apples and grapes, but I don't like bananas.'"],
  ["Where is the shop?", ["next to the bank", "behind the school", "opposite the park", "near the station"], 2, "It is opposite the park.", "Listen: 'The new shop is opposite the park, next to the café.'"],
  ["How many bottles does she buy?", ["two", "three", "four", "five"], 1, "She buys three bottles.", "Listen: 'Can I have three bottles of orange juice, please?'"],
  ["What is for dinner?", ["pizza", "soup", "rice and chicken", "sandwiches"], 2, "Dinner is rice and chicken.", "Listen: 'Tonight we're having rice and chicken for dinner.'"],
  ["Why doesn't he buy the jacket?", ["wrong colour", "too expensive", "too small", "closed shop"], 1, "It costs too much money.", "Listen: 'I really like this jacket, but forty pounds is too expensive for me.'"],
  ["What does the boy drink at breakfast?", ["tea", "milk", "water", "juice"], 3, "He drinks apple juice.", "Listen: 'Every morning I have toast and a glass of apple juice.'"],
  ["Which day is the market open?", ["Monday", "Wednesday", "Saturday", "Sunday"], 2, "The market is open on Saturday.", "Listen: 'The farmers' market is only open on Saturday morning.'"],
];

const movers4: CambridgeMockExam = {
  id: "cambridge-movers-4",
  title: "Movers Mock Test 4 - Food & Shopping",
  titleVi: "Đề thi thử Movers 4 - Đồ ăn & Mua sắm",
  level: "movers",
  duration: 30,
  totalQuestions: 25,
  questions: build(movers4Rw, movers4Ls),
};

/* ========================= FLYERS 4 - Sports & Health ========================= */
const flyers4Rw: Tuple[] = [
  ["He has played tennis ___ five years.", ["since", "for", "from", "during"], 1, "'For' + a length of time (five years)."],
  ["You should ___ water when you run.", ["to drink", "drink", "drinking", "drank"], 1, "After 'should' we use the bare infinitive."],
  ["She is the ___ swimmer in the club.", ["fast", "faster", "fastest", "most fast"], 2, "Superlative of a short adjective: fastest."],
  ["If you eat too much sugar, you ___ ill.", ["feel", "will feel", "felt", "would feel"], 1, "First conditional: if + present, will + verb."],
  ["A doctor works in a ___.", ["hospital", "stadium", "library", "factory"], 0, "Doctors work in hospitals."],
  ["I've ___ finished my training.", ["yet", "already", "still", "ever"], 1, "'Already' shows something happened earlier than expected."],
  ["He hurt his ___ playing football.", ["knee", "spoon", "shelf", "roof"], 0, "A knee is part of the leg."],
  ["Choose the healthy habit:", ["sleeping 4 hours", "eating vegetables", "skipping breakfast", "sitting all day"], 1, "Eating vegetables is healthy."],
  ["The match ___ at 7 pm yesterday.", ["start", "starts", "started", "starting"], 2, "'Yesterday' needs the past simple: started."],
  ["You need a racket to play ___.", ["badminton", "swimming", "cycling", "running"], 0, "Badminton is played with a racket."],
  ["I'm tired ___ I'll go to bed early.", ["but", "so", "because", "although"], 1, "'So' introduces a result."],
  ["She trains ___ than her brother.", ["hard", "harder", "hardest", "more hard"], 1, "Comparative of 'hard' is 'harder'."],
  ["A person who trains a team:", ["coach", "guest", "patient", "chef"], 0, "A coach trains a team."],
  ["Have you ___ been to a stadium?", ["ever", "never", "yet", "already"], 0, "In present perfect questions we use 'ever'."],
  ["We must warm up ___ we start.", ["before", "after", "while", "until"], 0, "Warming up happens before exercise."],
];
const flyers4Ls: Tuple[] = [
  ["Which sport does Emma do?", ["swimming", "gymnastics", "football", "tennis"], 1, "Emma does gymnastics.", "Listen: 'Emma goes to gymnastics club every Tuesday after school.'"],
  ["How long does he cycle?", ["20 minutes", "30 minutes", "45 minutes", "1 hour"], 2, "He cycles for forty-five minutes.", "Listen: 'I cycle to the park and back - it takes about forty-five minutes.'"],
  ["Why can't Jack play today?", ["he is ill", "no ball", "raining", "too late"], 0, "Jack has a cold and stays at home.", "Listen: 'Jack can't play today. He has a bad cold and is staying at home.'"],
  ["What did the doctor say?", ["run more", "rest for a week", "eat less", "swim daily"], 1, "The doctor told him to rest for a week.", "Listen: 'The doctor told me to rest my ankle for a week before training again.'"],
  ["When is the swimming lesson?", ["Monday 4 pm", "Tuesday 5 pm", "Thursday 4 pm", "Friday 5 pm"], 2, "The lesson is Thursday at four.", "Listen: 'Don't forget - your swimming lesson is on Thursday at four o'clock.'"],
  ["What does she eat before a match?", ["chocolate", "pasta", "chips", "ice cream"], 1, "She eats pasta for energy.", "Listen: 'Before a match I always eat pasta because it gives me lots of energy.'"],
  ["How many players are in the team?", ["nine", "ten", "eleven", "twelve"], 2, "There are eleven players.", "Listen: 'Our football team has eleven players and three substitutes.'"],
  ["Where is the new sports centre?", ["near the school", "next to the river", "behind the museum", "in the city centre"], 1, "It is next to the river.", "Listen: 'The new sports centre was built next to the river last year.'"],
  ["What time does the race start?", ["8:30", "9:00", "9:30", "10:00"], 2, "The race starts at half past nine.", "Listen: 'Runners must arrive at nine; the race starts at half past nine.'"],
  ["What is the boy's problem?", ["headache", "sore throat", "broken arm", "toothache"], 0, "He has a headache from too much screen time.", "Listen: 'I've got a headache. I think I looked at my screen for too long.'"],
];

const flyers4: CambridgeMockExam = {
  id: "cambridge-flyers-4",
  title: "Flyers Mock Test 4 - Sports & Health",
  titleVi: "Đề thi thử Flyers 4 - Thể thao & Sức khỏe",
  level: "flyers",
  duration: 35,
  totalQuestions: 25,
  questions: build(flyers4Rw, flyers4Ls),
};

/* ========================= KET 4 - City Life & Transport ========================= */
const ket4Rw: Tuple[] = [
  ["The train ___ at 9:15 every morning.", ["leave", "leaves", "leaving", "is leave"], 1, "Timetables use the present simple: leaves."],
  ["Excuse me, ___ is the nearest bus stop?", ["what", "where", "when", "who"], 1, "We ask about place with 'where'."],
  ["You ___ smoke on the underground.", ["mustn't", "don't have to", "should", "needn't"], 0, "'Mustn't' expresses a rule that forbids something."],
  ["I'm going to the airport ___ taxi.", ["on", "by", "with", "in a"], 1, "Transport with 'by': by taxi."],
  ["Read the notice: 'Platform 4 - all trains to Oxford delayed 20 minutes.' What is the problem?", ["Trains cancelled", "Trains are late", "Platform closed", "No tickets"], 1, "'Delayed' means the trains are late.", "Notice at the station: PLATFORM 4 - ALL TRAINS TO OXFORD DELAYED 20 MINUTES."],
  ["A ticket for going and coming back:", ["single", "return", "season", "standing"], 1, "A return ticket covers both journeys."],
  ["If the bus ___ late, we'll walk.", ["is", "will be", "was", "be"], 0, "First conditional: present simple after 'if'."],
  ["The museum is ___ the library and the bank.", ["between", "among", "along", "across"], 0, "'Between' is used for two places."],
  ["How long ___ the flight take?", ["do", "does", "is", "has"], 1, "Present simple question with 'it': does."],
  ["Cycling is ___ way to travel in the city.", ["a quick", "the quickest", "quicker", "quickly"], 1, "Superlative after 'the': the quickest way."],
  ["Read: 'Tickets must be bought before boarding.' What must passengers do?", ["Pay the driver", "Buy tickets first", "Show ID", "Book online only"], 1, "Tickets must be bought before you get on.", "Sign on the bus door: TICKETS MUST BE BOUGHT BEFORE BOARDING."],
  ["Traffic in the city is ___ than in the village.", ["bad", "worse", "worst", "more bad"], 1, "Irregular comparative: worse."],
  ["Choose the correct question:", ["How much cost the ticket?", "How much does the ticket cost?", "How much the ticket costs?", "How much is cost ticket?"], 1, "Auxiliary 'does' + base verb in questions."],
  ["We arrived ___ the station at 6.", ["to", "at", "in", "on"], 1, "We arrive at a station (a point)."],
  ["A place where you wait for a plane:", ["platform", "departure lounge", "harbour", "pavement"], 1, "Passengers wait in the departure lounge."],
];
const ket4Ls: Tuple[] = [
  ["How does the woman travel to work?", ["car", "bus", "underground", "bike"], 2, "She takes the underground.", "Listen: 'I used to drive, but now I take the underground - it's faster in rush hour.'"],
  ["How much is a day ticket?", ["£4.50", "£5.50", "£6.50", "£7.50"], 1, "A day ticket costs £5.50.", "Listen: 'A single is two pounds twenty, but a day ticket is only five pounds fifty.'"],
  ["Why is the road closed?", ["an accident", "building work", "a parade", "flooding"], 1, "There is building work on the road.", "Listen: 'High Street is closed this week because of building work near the bridge.'"],
  ["Which platform is the Manchester train?", ["2", "5", "7", "9"], 2, "The train leaves from platform seven.", "Listen: 'The 10:40 service to Manchester will depart from platform seven.'"],
  ["What time does the last bus leave?", ["10:30", "11:00", "11:30", "midnight"], 2, "The last bus is at half past eleven.", "Listen: 'Remember the last bus home leaves at half past eleven.'"],
  ["Where does the man want to go?", ["the museum", "the hospital", "the market", "the stadium"], 0, "He asks the way to the museum.", "Listen: 'Excuse me, could you tell me the way to the city museum, please?'"],
  ["How long is the journey?", ["25 minutes", "40 minutes", "an hour", "90 minutes"], 1, "The journey takes forty minutes.", "Listen: 'The airport bus takes about forty minutes at this time of day.'"],
  ["What does the speaker suggest?", ["walking", "taking a taxi", "cycling", "waiting"], 2, "She suggests cycling because of the traffic.", "Listen: 'The traffic is terrible today - why don't we cycle instead?'"],
  ["What is wrong with the ticket machine?", ["out of order", "no change", "too slow", "wrong prices"], 0, "The machine is out of order.", "Listen: 'Sorry, the ticket machine is out of order. Please buy your ticket on board.'"],
  ["Where will they meet?", ["outside the station", "in the café", "at the bus stop", "at home"], 1, "They will meet in the station café.", "Listen: 'Let's meet in the café inside the station at quarter to six.'"],
];

const ket4: CambridgeMockExam = {
  id: "cambridge-ket-4",
  title: "KET Mock Test 4 - City Life & Transport",
  titleVi: "Đề thi thử KET 4 - Cuộc sống đô thị & Giao thông",
  level: "ket",
  duration: 40,
  totalQuestions: 25,
  questions: build(ket4Rw, ket4Ls),
};

/* ========================= PET 5 - Media & Environment ========================= */
const pet5Passage =
  "Every year, people around the world throw away more than fifty million tonnes of electronic waste - old phones, laptops and televisions. Only about a fifth of it is recycled properly. The rest is burned or buried, releasing chemicals that damage soil and water. Some cities now run repair cafés, where volunteers help people fix broken devices instead of replacing them. Researchers say the simplest solution is also the cheapest: keeping a phone for four years rather than two halves its environmental cost.";

const pet5Rw: Tuple[] = [
  ["How much electronic waste is thrown away each year?", ["five million tonnes", "fifteen million tonnes", "over fifty million tonnes", "a fifth of a million tonnes"], 2, "The text says more than fifty million tonnes.", pet5Passage],
  ["What proportion of e-waste is recycled properly?", ["about a half", "about a fifth", "about a third", "almost none"], 1, "'Only about a fifth of it is recycled properly.'", pet5Passage],
  ["What happens to waste that is not recycled?", ["It is sold abroad", "It is burned or buried", "It is stored in shops", "It is repaired"], 1, "The rest is burned or buried.", pet5Passage],
  ["What do repair cafés do?", ["sell new devices", "help people fix devices", "collect money", "teach coding"], 1, "Volunteers help people fix broken devices.", pet5Passage],
  ["According to researchers, keeping a phone for four years ___.", ["doubles its cost", "halves its environmental cost", "makes no difference", "increases waste"], 1, "It halves the environmental cost.", pet5Passage],
  ["The writer's main purpose is to ___.", ["advertise phones", "explain a problem and a simple solution", "describe a country", "complain about volunteers"], 1, "The text presents the e-waste problem and simple solutions."],
  ["Social media ___ the way we read news.", ["has changed", "have changed", "changing", "change"], 0, "'Social media' is treated as singular here: has changed."],
  ["The programme was so boring that I ___ off.", ["turned it", "it turned", "turned", "turn it"], 0, "Phrasal verb with a pronoun object: turned it off."],
  ["If people recycled more, less plastic ___ in the sea.", ["ends", "will end", "would end", "ended"], 2, "Second conditional: would + verb."],
  ["The report, ___ was published in May, shocked readers.", ["who", "which", "what", "whose"], 1, "'Which' refers to a thing in a non-defining clause."],
  ["Journalists must check their ___ before publishing.", ["sources", "sauces", "resources only", "sourcing"], 0, "A source is where information comes from."],
  ["Choose the closest meaning: 'The article was misleading.'", ["clearly true", "giving a false impression", "very short", "well researched"], 1, "Misleading = making people believe something untrue."],
  ["Plastic bags ___ in many countries now.", ["ban", "are banned", "banning", "have ban"], 1, "Passive present simple: are banned."],
  ["We should cut ___ on single-use packaging.", ["down", "up", "off", "in"], 0, "'Cut down on' means reduce."],
  ["Despite ___ tired, she finished the documentary.", ["be", "being", "she was", "to be"], 1, "After 'despite' we use a gerund: being."],
];
const pet5Ls: Tuple[] = [
  ["What is the podcast about?", ["cooking", "climate solutions", "football", "history"], 1, "The podcast discusses climate solutions.", "Listen: 'This week's podcast looks at three cities that cut their carbon emissions by a quarter.'"],
  ["By how much did the cities cut emissions?", ["a tenth", "a fifth", "a quarter", "a half"], 2, "They cut emissions by a quarter.", "Listen: 'This week's podcast looks at three cities that cut their carbon emissions by a quarter.'"],
  ["Why did the speaker stop buying newspapers?", ["too expensive", "reads news online", "no time", "poor quality"], 1, "He reads the news online instead.", "Listen: 'I stopped buying newspapers years ago - I read everything online now.'"],
  ["What does the speaker recommend?", ["buying new devices", "repairing old devices", "throwing devices away", "renting devices"], 1, "She recommends repairing what you already own.", "Listen: 'Before you buy a new laptop, try repairing the one you already own.'"],
  ["How many people joined the beach clean-up?", ["80", "120", "200", "350"], 2, "Two hundred volunteers joined.", "Listen: 'Two hundred volunteers came to Saturday's beach clean-up and collected forty bags of rubbish.'"],
  ["How much rubbish was collected?", ["20 bags", "30 bags", "40 bags", "60 bags"], 2, "They collected forty bags.", "Listen: 'Two hundred volunteers came to Saturday's beach clean-up and collected forty bags of rubbish.'"],
  ["What is the man's opinion of the documentary?", ["too long but useful", "boring", "inaccurate", "perfect"], 0, "He says it was long but worth watching.", "Listen: 'The documentary was far too long, but the section on ocean plastic made it worth watching.'"],
  ["What will the council do next month?", ["close the recycling centre", "start food-waste collection", "raise bus fares", "build a car park"], 1, "Food-waste collection begins next month.", "Listen: 'From next month the council will collect food waste from every household once a week.'"],
  ["How often will food waste be collected?", ["daily", "twice a week", "weekly", "monthly"], 2, "Once a week.", "Listen: 'From next month the council will collect food waste from every household once a week.'"],
  ["What does the speaker warn about online news?", ["it is slow", "headlines can mislead", "it costs money", "it is always short"], 1, "She warns that headlines can be misleading.", "Listen: 'Be careful with online news - a dramatic headline often says more than the article itself.'"],
];

const pet5: CambridgeMockExam = {
  id: "cambridge-pet-5",
  title: "PET Mock Test 5 - Media & Environment",
  titleVi: "Đề thi thử PET 5 - Truyền thông & Môi trường",
  level: "pet",
  duration: 50,
  totalQuestions: 25,
  questions: build(pet5Rw, pet5Ls),
};

export const cambridgeMockExamExpansion2: CambridgeMockExam[] = [
  starters4,
  movers4,
  flyers4,
  ket4,
  pet5,
];
