/**
 * @file cambridgeSpeakingTasksGapFill.ts
 * @description Fills the two missing exam parts in the Cambridge Speaking bank:
 *   PET (B1 Preliminary) Part 1 Interview - the bank previously had none - and
 *   extra Flyers Part 2 Information exchange cards, which were under-represented.
 *   Formats follow the official examiner scripts for each level.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { CambridgeSpeakingTask } from "./cambridgeSpeakingTasks";

/** PET Part 1 - Interview: personal questions, short but developed answers. */
const petInterview: CambridgeSpeakingTask[] = [
  {
    id: "pe-i1", level: "pet", part: "Part 1 - Interview", topic: "Where you live",
    prompt: "Where do you live? Tell me something about your home town.",
    examiner: ["What do you like most about living there?", "Is it a good place for young people? Why?", "Would you like to live somewhere else one day?"],
    usefulLanguage: ["I live in ...", "It's about an hour from ...", "What I like most is ...", "One thing I'd change is ..."],
    sampleAnswer: "I live in Da Nang, a coastal city in central Vietnam. What I like most is the beach, because I can cycle there in ten minutes after school. It's quite a good place for young people, although we could do with more libraries and study spaces.",
    minSeconds: 45,
  },
  {
    id: "pe-i2", level: "pet", part: "Part 1 - Interview", topic: "School life",
    prompt: "Tell me about your studies. Which subject do you enjoy most and why?",
    examiner: ["Which subject do you find hardest?", "How much homework do you usually get?", "What do you plan to study in the future?"],
    usefulLanguage: ["I'm currently studying ...", "I enjoy it because ...", "I find it challenging when ...", "I'm hoping to ..."],
    sampleAnswer: "I'm in grade eleven and I enjoy physics most, mainly because we do experiments rather than just copying notes. Maths is harder for me, so I spend about an hour on it every evening. In the future I'd like to study engineering at university.",
    minSeconds: 45,
  },
  {
    id: "pe-i3", level: "pet", part: "Part 1 - Interview", topic: "Free time",
    prompt: "What do you usually do in your free time? Tell me about a hobby you enjoy.",
    examiner: ["How long have you been doing it?", "Do you prefer doing it alone or with friends?", "How often do you have free time during the week?"],
    usefulLanguage: ["In my free time I tend to ...", "I've been doing it for ... years.", "I'd rather ... than ...", "It helps me relax because ..."],
    sampleAnswer: "In my free time I usually play badminton with my cousin. I've been playing for about three years now, and I prefer playing with other people because it's more competitive. It helps me relax after a long day of studying.",
    minSeconds: 45,
  },
  {
    id: "pe-i4", level: "pet", part: "Part 1 - Interview", topic: "Family and friends",
    prompt: "Tell me about the people you spend most time with.",
    examiner: ["What do you usually do together?", "Who are you closest to in your family?", "Is it easy to make new friends at your school?"],
    usefulLanguage: ["I spend most of my time with ...", "We normally ...", "I'd say I'm closest to ...", "It depends on ..."],
    sampleAnswer: "I spend most of my time with my younger brother and two classmates. We normally study together at a cafe and then play football on Sunday. I'd say I'm closest to my mum, because she always listens when I'm stressed about exams.",
    minSeconds: 45,
  },
  {
    id: "pe-i5", level: "pet", part: "Part 1 - Interview", topic: "Daily routine",
    prompt: "Tell me about a typical weekday for you, from morning to evening.",
    examiner: ["What time do you usually get up?", "Is your routine different at the weekend?", "Would you like to change anything about your day?"],
    usefulLanguage: ["I normally get up at ...", "After that I ...", "By the evening I usually ...", "If I could, I'd ..."],
    sampleAnswer: "I normally get up at half past five and cycle to school before seven. After classes I have extra English lessons twice a week, and by the evening I'm usually revising until ten. If I could, I'd start school an hour later so I could sleep more.",
    minSeconds: 45,
  },
  {
    id: "pe-i6", level: "pet", part: "Part 1 - Interview", topic: "Food and meals",
    prompt: "Tell me about the food you eat at home. Do you help with the cooking?",
    examiner: ["What is your favourite meal of the day?", "Do you often eat out with your family?", "Have your eating habits changed recently?"],
    usefulLanguage: ["We usually have ...", "I sometimes help by ...", "I'm not particularly keen on ...", "These days I try to ..."],
    sampleAnswer: "We usually have rice with fish and vegetables, and my mum cooks most evenings. I help by washing the vegetables and setting the table. These days I try to eat less street food, mainly because I want to be fitter for football.",
    minSeconds: 45,
  },
  {
    id: "pe-i7", level: "pet", part: "Part 1 - Interview", topic: "Technology and the internet",
    prompt: "How do you use your phone or computer in a normal week?",
    examiner: ["Do you use technology for studying?", "How much screen time do you think is too much?", "Which app could you not live without?"],
    usefulLanguage: ["I mainly use it for ...", "It's really useful when ...", "On the other hand ...", "I try to limit myself to ..."],
    sampleAnswer: "I mainly use my phone for messaging friends and looking up vocabulary. It's really useful when I revise, because I can listen to podcasts on the bus. On the other hand, I try to limit myself to about an hour of social media a day.",
    minSeconds: 45,
  },
  {
    id: "pe-i8", level: "pet", part: "Part 1 - Interview", topic: "Holidays and travel",
    prompt: "Tell me about a holiday or trip you have been on recently.",
    examiner: ["Who did you travel with?", "Do you prefer city holidays or the countryside?", "Where would you like to travel next?"],
    usefulLanguage: ["Last summer I went to ...", "We travelled by ...", "What I enjoyed most was ...", "Next time I'd like to ..."],
    sampleAnswer: "Last summer I went to Hue with my family. We travelled by train, which took about three hours. What I enjoyed most was visiting the old citadel, because I'm interested in history. Next time I'd like to go somewhere cooler, like Sa Pa.",
    minSeconds: 45,
  },
  {
    id: "pe-i9", level: "pet", part: "Part 1 - Interview", topic: "Sport and exercise",
    prompt: "Do you do any sport or exercise? Tell me about it.",
    examiner: ["How often do you exercise?", "Do you prefer watching or playing sport?", "Is sport important at your school?"],
    usefulLanguage: ["I play ... twice a week.", "I'm not very good at ..., but ...", "I'd much rather ...", "It keeps me ..."],
    sampleAnswer: "I play volleyball twice a week with my class team. I'm not very good at serving, but I'm improving. I'd much rather play than watch, because sitting still bores me, and exercise keeps me focused when I study in the evening.",
    minSeconds: 45,
  },
  {
    id: "pe-i10", level: "pet", part: "Part 1 - Interview", topic: "Jobs and future plans",
    prompt: "What would you like to do after you finish school?",
    examiner: ["Why does that job interest you?", "What skills will you need?", "Would you like to work in another country?"],
    usefulLanguage: ["I'm planning to ...", "I'm interested in it because ...", "I'll need to improve my ...", "Ideally, I'd ..."],
    sampleAnswer: "I'm planning to study computer science, because I enjoy solving problems and building small apps. I'll need to improve my English and my maths first. Ideally, I'd work in Vietnam for a few years and then try an exchange programme abroad.",
    minSeconds: 45,
  },
  {
    id: "pe-i11", level: "pet", part: "Part 1 - Interview", topic: "Music and films",
    prompt: "Tell me about the kind of music or films you like.",
    examiner: ["When do you usually listen to music?", "Do you prefer watching films at home or at the cinema?", "Has your taste changed as you got older?"],
    usefulLanguage: ["I'm really into ...", "I listen to it while ...", "I'd say I prefer ... because ...", "I used to like ..., but now ..."],
    sampleAnswer: "I'm really into pop and some Vietnamese indie bands. I listen to music while I'm cycling to school or cleaning my room. I'd say I prefer watching films at home because it's cheaper, although the sound at the cinema is much better.",
    minSeconds: 45,
  },
  {
    id: "pe-i12", level: "pet", part: "Part 1 - Interview", topic: "Weather and seasons",
    prompt: "What is the weather usually like where you live? Which season do you prefer?",
    examiner: ["What do you do when the weather is bad?", "Does the weather change your plans much?", "Would you like to live somewhere colder?"],
    usefulLanguage: ["It tends to be ... in ...", "I prefer ... because ...", "When it rains I usually ...", "I don't think I could cope with ..."],
    sampleAnswer: "It tends to be hot and humid from May to August, and quite rainy in autumn. I prefer winter because it's cool enough to run outside. When it rains I usually stay in and read. I don't think I could cope with snow every day, though.",
    minSeconds: 45,
  },
];

/** Flyers Part 2 - Information exchange: the candidate asks the examiner questions. */
const flyersInfoExchange: CambridgeSpeakingTask[] = [
  {
    id: "fl-ie1", level: "flyers", part: "Part 2 - Information exchange", topic: "School life",
    prompt: "You want to know about the new school library. Ask me questions about the days, the time it opens and the books.",
    examiner: ["Which days is it open?", "What time does it open?", "How many books can you borrow?"],
    usefulLanguage: ["Which days ...?", "What time ...?", "How many ...?", "Can I ...?"],
    sampleAnswer: "Which days is the library open? What time does it open in the morning? How many books can I borrow? Can I read there after school?",
    minSeconds: 30,
  },
  {
    id: "fl-ie2", level: "flyers", part: "Part 2 - Information exchange", topic: "Sport and exercise",
    prompt: "You want to join the swimming class. Ask me about the day, the teacher, the price and the place.",
    examiner: ["Which day is the class?", "Who is the teacher?", "How much does it cost?"],
    usefulLanguage: ["Which day ...?", "Who ...?", "How much ...?", "Where ...?"],
    sampleAnswer: "Which day is the swimming class? Who is the teacher? How much does it cost each month? Where is the swimming pool?",
    minSeconds: 30,
  },
  {
    id: "fl-ie3", level: "flyers", part: "Part 2 - Information exchange", topic: "Holidays and travel",
    prompt: "You want to know about the class trip to the mountains. Ask me about the date, the bus, the food and the clothes.",
    examiner: ["When is the trip?", "What time does the bus leave?", "What should you bring?"],
    usefulLanguage: ["When ...?", "What time ...?", "What food ...?", "What clothes ...?"],
    sampleAnswer: "When is the class trip? What time does the bus leave school? What food do we need to bring? What clothes should I wear?",
    minSeconds: 30,
  },
  {
    id: "fl-ie4", level: "flyers", part: "Part 2 - Information exchange", topic: "Animals and pets",
    prompt: "You want to visit the animal park. Ask me about the tickets, the animals, the opening time and the cafe.",
    examiner: ["How much is a ticket for children?", "Which animals can you see?", "What time does it close?"],
    usefulLanguage: ["How much ...?", "Which animals ...?", "What time ...?", "Is there ...?"],
    sampleAnswer: "How much is a ticket for children? Which animals can we see there? What time does the park close? Is there a cafe inside?",
    minSeconds: 30,
  },
  {
    id: "fl-ie5", level: "flyers", part: "Part 2 - Information exchange", topic: "Music and films",
    prompt: "You want to go to the school concert. Ask me about the date, the place, the tickets and the songs.",
    examiner: ["What date is the concert?", "Where is it?", "How much are the tickets?"],
    usefulLanguage: ["What date ...?", "Where ...?", "How much ...?", "Who is ...?"],
    sampleAnswer: "What date is the school concert? Where is it going to be? How much are the tickets? Who is singing first?",
    minSeconds: 30,
  },
  {
    id: "fl-ie6", level: "flyers", part: "Part 2 - Information exchange", topic: "Food and meals",
    prompt: "You want to know about the new school cafe. Ask me about the food, the drinks, the prices and the time.",
    examiner: ["What food do they sell?", "How much is a sandwich?", "What time does it open?"],
    usefulLanguage: ["What food ...?", "What drinks ...?", "How much ...?", "What time ...?"],
    sampleAnswer: "What food do they sell in the cafe? What drinks can we buy? How much is a sandwich? What time does the cafe open?",
    minSeconds: 30,
  },
  {
    id: "fl-ie7", level: "flyers", part: "Part 2 - Information exchange", topic: "Hobbies and free time",
    prompt: "You want to join the photography club. Ask me about the day, the teacher, the camera and the club room.",
    examiner: ["Which day does the club meet?", "Do you need your own camera?", "Where do they meet?"],
    usefulLanguage: ["Which day ...?", "Do I need ...?", "Where ...?", "How long ...?"],
    sampleAnswer: "Which day does the photography club meet? Do I need my own camera? Where is the club room? How long is each lesson?",
    minSeconds: 30,
  },
  {
    id: "fl-ie8", level: "flyers", part: "Part 2 - Information exchange", topic: "Shops and shopping",
    prompt: "You want to know about the new sports shop. Ask me about the place, the opening day, the prices and the shoes.",
    examiner: ["Where is the shop?", "When does it open?", "Are the shoes expensive?"],
    usefulLanguage: ["Where ...?", "When ...?", "How much ...?", "Do they sell ...?"],
    sampleAnswer: "Where is the new sports shop? When does it open? How much are the running shoes? Do they sell football shirts too?",
    minSeconds: 30,
  },
  {
    id: "fl-ie9", level: "flyers", part: "Part 2 - Information exchange", topic: "My town",
    prompt: "You want to know about the new park in your town. Ask me about the place, the playground, the trees and the times.",
    examiner: ["Where is the new park?", "Is there a playground?", "What time does it close?"],
    usefulLanguage: ["Where ...?", "Is there ...?", "How many ...?", "What time ...?"],
    sampleAnswer: "Where is the new park? Is there a playground for children? How many trees are there? What time does the park close in the evening?",
    minSeconds: 30,
  },
  {
    id: "fl-ie10", level: "flyers", part: "Part 2 - Information exchange", topic: "Family and friends",
    prompt: "Your friend is having a birthday picnic. Ask me about the day, the place, the food and the games.",
    examiner: ["Which day is the picnic?", "Where is it?", "What food will there be?"],
    usefulLanguage: ["Which day ...?", "Where ...?", "What food ...?", "What games ...?"],
    sampleAnswer: "Which day is the birthday picnic? Where is it going to be? What food will there be? What games are we going to play?",
    minSeconds: 30,
  },
];

export const cambridgeSpeakingTasksGapFill: CambridgeSpeakingTask[] = [
  ...petInterview,
  ...flyersInfoExchange,
];
