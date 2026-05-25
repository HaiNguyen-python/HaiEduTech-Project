/**
 * @file cambridgeLecturesExpansion9.ts
 * @description 15 additional Cambridge lectures (3 per level: Starters → PET).
 *              Fresh themes: weather & clothes, body & feelings, zoo animals;
 *              school subjects, jobs in town, transport choices;
 *              sports & rules, healthy life, school trip narration;
 *              KET email reply, shopping role-play, story with linkers;
 *              PET essay opinion, listening Part 3 monologue, speaking Part 4.
 * @author HaiEduTech
 */

import type { CambridgeLecture } from "./cambridgeLecturesData";

const mk = (
  l: Partial<CambridgeLecture> &
    Pick<
      CambridgeLecture,
      "id" | "title" | "titleVi" | "level" | "skill" | "icon" | "description" | "descriptionVi"
    >
): CambridgeLecture =>
  ({
    duration: "15 min",
    learningObjective: l.description!,
    learningObjectiveVi: l.descriptionVi!,
    examPattern: "Cambridge YLE / KET / PET task practice with picture and text prompts.",
    examPatternVi: "Luyện theo dạng Cambridge YLE / KET / PET với tranh và đoạn văn.",
    secretTip: "🔑 Read the question twice, underline keywords, then choose.",
    secretTipVi: "🔑 Đọc câu hỏi 2 lần, gạch chân từ khoá, rồi mới chọn đáp án.",
    welcomeMessage: "Hi superstar! Ready for today's mission? ✨",
    welcomeMessageVi: "Chào siêu sao! Sẵn sàng cho nhiệm vụ hôm nay chưa? ✨",
    stepByStep: [],
    illustratedRules: [],
    watchOut: [],
    practiceSet: [],
    vocabulary: [],
    quiz: [],
    parentInfo: "Short focused lesson aligned with Cambridge syllabus to build confidence.",
    parentInfoVi: "Bài học ngắn, đúng trọng tâm Cambridge giúp con tự tin hơn.",
    isNew: true,
    ...l,
  } as CambridgeLecture);

// ====================== STARTERS ======================
const startersWeatherClothes = mk({
  id: "cam-starters-weather-clothes",
  title: "Weather & Clothes",
  titleVi: "Thời tiết & Quần áo",
  level: "starters",
  skill: "vocabulary",
  icon: "🌦️",
  description: "Match weather words with the right clothes (sunny → hat, rainy → coat).",
  descriptionVi: "Nối từ thời tiết với quần áo phù hợp (nắng → mũ, mưa → áo khoác).",
  illustrationKey: "starters",
  stepByStep: [
    { step: 1, title: "Weather words", titleVi: "Từ thời tiết", detail: "sunny, rainy, cloudy, windy, snowy.", detailVi: "nắng, mưa, có mây, gió, tuyết." },
    { step: 2, title: "Clothes", titleVi: "Quần áo", detail: "hat, coat, boots, scarf, T-shirt.", detailVi: "mũ, áo khoác, ủng, khăn, áo phông." },
    { step: 3, title: "Match them", titleVi: "Ghép cặp", detail: "It's rainy. I wear a coat.", detailVi: "Trời mưa. Mình mặc áo khoác." },
  ],
  illustratedRules: [
    { icon: "☀️", rule: "Use 'It's + weather'.", ruleVi: "Dùng 'It's + thời tiết'.", example: "It's sunny today." },
    { icon: "🧥", rule: "Use 'I wear …'.", ruleVi: "Dùng 'I wear …'.", example: "I wear a coat." },
  ],
  watchOut: [
    { mistake: "It's sun.", mistakeVi: "It's sun.", tip: "Use the adjective: It's sunny.", tipVi: "Dùng tính từ: It's sunny." },
  ],
  vocabulary: [
    { word: "sunny", meaning: "with sun", meaningVi: "có nắng", example: "It's sunny." },
    { word: "rainy", meaning: "with rain", meaningVi: "có mưa", example: "It's rainy." },
    { word: "cloudy", meaning: "with clouds", meaningVi: "nhiều mây", example: "It's cloudy." },
    { word: "windy", meaning: "with wind", meaningVi: "có gió", example: "It's windy." },
    { word: "coat", meaning: "warm jacket", meaningVi: "áo khoác", example: "I wear a coat." },
    { word: "boots", meaning: "rain shoes", meaningVi: "ủng", example: "I wear boots." },
  ],
  quiz: [
    { question: "It's rainy. I wear ___.", options: ["a hat", "a coat", "shorts", "a T-shirt"], answer: 1, explanation: "Rain → coat." },
    { question: "It's ___ today.", options: ["sun", "sunny", "suns", "sunly"], answer: 1, explanation: "Use adjective sunny." },
    { question: "Snowy weather is ___.", options: ["hot", "cold", "warm", "wet only"], answer: 1, explanation: "Snow is cold." },
    { question: "Windy day → wear ___.", options: ["scarf", "swimsuit", "sandals", "umbrella only"], answer: 0, explanation: "Scarf for wind." },
  ],
});

const startersBodyFeelings = mk({
  id: "cam-starters-body-feelings",
  title: "My Body & Feelings",
  titleVi: "Cơ thể & Cảm xúc",
  level: "starters",
  skill: "speaking",
  icon: "😊",
  description: "Point and say body parts; tell how you feel (happy, sad, tired).",
  descriptionVi: "Chỉ và gọi tên bộ phận cơ thể; nói cảm xúc (vui, buồn, mệt).",
  illustrationKey: "starters",
  stepByStep: [
    { step: 1, title: "5 body parts", titleVi: "5 bộ phận", detail: "head, eyes, nose, hand, leg.", detailVi: "đầu, mắt, mũi, tay, chân." },
    { step: 2, title: "3 feelings", titleVi: "3 cảm xúc", detail: "happy, sad, tired.", detailVi: "vui, buồn, mệt." },
    { step: 3, title: "Make a sentence", titleVi: "Tạo câu", detail: "I am happy. My head hurts.", detailVi: "Tớ vui. Đầu tớ đau." },
  ],
  illustratedRules: [
    { icon: "🙂", rule: "Use 'I am + feeling'.", ruleVi: "Dùng 'I am + cảm xúc'.", example: "I am tired." },
    { icon: "👃", rule: "Use 'My + part + hurts'.", ruleVi: "Dùng 'My + bộ phận + hurts'.", example: "My nose hurts." },
  ],
  watchOut: [
    { mistake: "I happy.", mistakeVi: "I happy.", tip: "Need 'am': I am happy.", tipVi: "Phải có 'am': I am happy." },
  ],
  vocabulary: [
    { word: "head", meaning: "top of body", meaningVi: "đầu", example: "Touch your head." },
    { word: "eyes", meaning: "to see", meaningVi: "mắt", example: "I have two eyes." },
    { word: "happy", meaning: "feel good", meaningVi: "vui", example: "I am happy today." },
    { word: "sad", meaning: "feel bad", meaningVi: "buồn", example: "She is sad." },
    { word: "tired", meaning: "no energy", meaningVi: "mệt", example: "I am tired." },
    { word: "hurts", meaning: "feels pain", meaningVi: "đau", example: "My leg hurts." },
  ],
  quiz: [
    { question: "We see with our ___.", options: ["nose", "ears", "eyes", "hands"], answer: 2, explanation: "Eyes to see." },
    { question: "I'm ___ — I want to sleep.", options: ["happy", "tired", "tall", "fast"], answer: 1, explanation: "Sleep → tired." },
    { question: "Correct: ___ happy.", options: ["I", "I am", "Am I", "Me is"], answer: 1, explanation: "Use 'I am'." },
    { question: "Pick a body part.", options: ["red", "leg", "happy", "fast"], answer: 1, explanation: "Leg is a body part." },
  ],
});

const startersZooAnimals = mk({
  id: "cam-starters-zoo-animals",
  title: "A Day at the Zoo",
  titleVi: "Một ngày ở Sở thú",
  level: "starters",
  skill: "listening",
  icon: "🦁",
  description: "Listen for animal names and where they are (in/on/under).",
  descriptionVi: "Nghe tên con vật và vị trí (trong/trên/dưới).",
  illustrationKey: "starters",
  stepByStep: [
    { step: 1, title: "5 animals", titleVi: "5 con vật", detail: "lion, monkey, elephant, snake, bird.", detailVi: "sư tử, khỉ, voi, rắn, chim." },
    { step: 2, title: "Places", titleVi: "Vị trí", detail: "in, on, under, next to.", detailVi: "trong, trên, dưới, bên cạnh." },
    { step: 3, title: "Listen for both", titleVi: "Nghe cả hai", detail: "The monkey is in the tree.", detailVi: "Con khỉ ở trên cây." },
  ],
  illustratedRules: [
    { icon: "🐒", rule: "Animal + is + place.", ruleVi: "Con vật + is + vị trí.", example: "The lion is under the tree." },
  ],
  watchOut: [
    { mistake: "monkey in tree.", mistakeVi: "monkey in tree.", tip: "Add 'The' + 'is': The monkey is in the tree.", tipVi: "Thêm 'The' + 'is'." },
  ],
  vocabulary: [
    { word: "lion", meaning: "big cat", meaningVi: "sư tử", example: "The lion is big." },
    { word: "monkey", meaning: "climbs trees", meaningVi: "khỉ", example: "The monkey is funny." },
    { word: "elephant", meaning: "huge animal", meaningVi: "voi", example: "The elephant is grey." },
    { word: "snake", meaning: "long animal", meaningVi: "rắn", example: "The snake is long." },
    { word: "bird", meaning: "it flies", meaningVi: "chim", example: "The bird is in the tree." },
    { word: "under", meaning: "below", meaningVi: "dưới", example: "The cat is under the chair." },
  ],
  quiz: [
    { question: "Which animal can fly?", options: ["lion", "snake", "bird", "elephant"], answer: 2, explanation: "Birds fly." },
    { question: "The monkey is ___ the tree.", options: ["in", "under", "next", "is"], answer: 0, explanation: "Monkeys go in trees." },
    { question: "Big grey animal?", options: ["snake", "bird", "elephant", "monkey"], answer: 2, explanation: "Elephant is grey." },
    { question: "Opposite of 'on'?", options: ["under", "in", "next to", "is"], answer: 0, explanation: "Under is opposite." },
  ],
});

// ====================== MOVERS ======================
const moversSchoolSubjects = mk({
  id: "cam-movers-school-subjects",
  title: "My School Timetable",
  titleVi: "Thời khoá biểu của tôi",
  level: "movers",
  skill: "reading-writing",
  icon: "📅",
  description: "Read a timetable and answer 'What lesson is on Monday morning?'.",
  descriptionVi: "Đọc thời khoá biểu và trả lời 'Thứ Hai có môn gì?'.",
  illustrationKey: "movers",
  stepByStep: [
    { step: 1, title: "Days of week", titleVi: "Các ngày", detail: "Mon–Fri.", detailVi: "Thứ 2 → 6." },
    { step: 2, title: "Subjects", titleVi: "Môn học", detail: "Maths, English, Art, PE, Science.", detailVi: "Toán, Anh, Mỹ thuật, Thể dục, Khoa học." },
    { step: 3, title: "Find the cell", titleVi: "Tìm ô đúng", detail: "Look at day + time.", detailVi: "Nhìn cả cột ngày và giờ." },
  ],
  illustratedRules: [
    { icon: "🗓️", rule: "'on' + day, 'at' + time.", ruleVi: "'on' + ngày, 'at' + giờ.", example: "Maths is on Monday at 8 a.m." },
  ],
  watchOut: [
    { mistake: "in Monday", mistakeVi: "in Monday", tip: "Use 'on Monday'.", tipVi: "Dùng 'on Monday'." },
  ],
  vocabulary: [
    { word: "timetable", meaning: "schedule", meaningVi: "thời khoá biểu", example: "Look at the timetable." },
    { word: "subject", meaning: "school topic", meaningVi: "môn học", example: "My favourite subject is Art." },
    { word: "Maths", meaning: "numbers", meaningVi: "Toán", example: "Maths is at 9." },
    { word: "PE", meaning: "sports lesson", meaningVi: "Thể dục", example: "PE is fun." },
    { word: "Science", meaning: "study nature", meaningVi: "Khoa học", example: "Science is hard." },
    { word: "Art", meaning: "drawing", meaningVi: "Mỹ thuật", example: "I love Art." },
  ],
  quiz: [
    { question: "We use ___ + Monday.", options: ["in", "at", "on", "to"], answer: 2, explanation: "'on' + day." },
    { question: "Drawing pictures = ___.", options: ["Maths", "Art", "Science", "PE"], answer: 1, explanation: "Art is drawing." },
    { question: "Running and games = ___.", options: ["Maths", "Art", "PE", "English"], answer: 2, explanation: "PE = sport." },
    { question: "Numbers lesson = ___.", options: ["Science", "Art", "Maths", "PE"], answer: 2, explanation: "Maths." },
  ],
});

const moversJobsTown = mk({
  id: "cam-movers-jobs-town",
  title: "Jobs in My Town",
  titleVi: "Nghề nghiệp trong thị trấn",
  level: "movers",
  skill: "vocabulary",
  icon: "👨‍🍳",
  description: "Match a job with its place (chef → restaurant, nurse → hospital).",
  descriptionVi: "Nối nghề với nơi làm việc (đầu bếp → nhà hàng, y tá → bệnh viện).",
  illustrationKey: "movers",
  stepByStep: [
    { step: 1, title: "6 jobs", titleVi: "6 nghề", detail: "doctor, nurse, chef, driver, teacher, farmer.", detailVi: "bác sĩ, y tá, đầu bếp, tài xế, giáo viên, nông dân." },
    { step: 2, title: "6 places", titleVi: "6 nơi", detail: "hospital, restaurant, bus, school, farm.", detailVi: "bệnh viện, nhà hàng, xe buýt, trường, nông trại." },
    { step: 3, title: "Make a sentence", titleVi: "Tạo câu", detail: "A chef works in a restaurant.", detailVi: "Đầu bếp làm trong nhà hàng." },
  ],
  illustratedRules: [
    { icon: "🏥", rule: "Subject + works in/at + place.", ruleVi: "Chủ ngữ + works in/at + nơi.", example: "A nurse works in a hospital." },
  ],
  watchOut: [
    { mistake: "A chef works on a restaurant.", mistakeVi: "A chef works on a restaurant.", tip: "Use 'in' for buildings.", tipVi: "Dùng 'in' với toà nhà." },
  ],
  vocabulary: [
    { word: "doctor", meaning: "helps sick people", meaningVi: "bác sĩ", example: "The doctor is kind." },
    { word: "nurse", meaning: "helps doctor", meaningVi: "y tá", example: "The nurse smiles." },
    { word: "chef", meaning: "cooks food", meaningVi: "đầu bếp", example: "The chef cooks pasta." },
    { word: "driver", meaning: "drives a car/bus", meaningVi: "tài xế", example: "The driver is fast." },
    { word: "farmer", meaning: "grows food", meaningVi: "nông dân", example: "The farmer has cows." },
    { word: "hospital", meaning: "place for sick people", meaningVi: "bệnh viện", example: "She works in a hospital." },
  ],
  quiz: [
    { question: "A chef works in a ___.", options: ["school", "hospital", "restaurant", "farm"], answer: 2, explanation: "Chef cooks in a restaurant." },
    { question: "Who teaches children?", options: ["nurse", "teacher", "driver", "farmer"], answer: 1, explanation: "Teacher." },
    { question: "Farmer works on a ___.", options: ["bus", "farm", "ship", "shop"], answer: 1, explanation: "Farm." },
    { question: "Choose the correct preposition: 'works ___ a hospital'.", options: ["on", "at", "in", "to"], answer: 2, explanation: "Use 'in' for buildings." },
  ],
});

const moversTransport = mk({
  id: "cam-movers-transport-choices",
  title: "How Do You Go to School?",
  titleVi: "Bạn đi học bằng gì?",
  level: "movers",
  skill: "speaking",
  icon: "🚌",
  description: "Talk about transport using 'by + transport' and frequency adverbs.",
  descriptionVi: "Nói về phương tiện với 'by + phương tiện' và trạng từ tần suất.",
  illustrationKey: "movers",
  stepByStep: [
    { step: 1, title: "Transport", titleVi: "Phương tiện", detail: "bus, bike, car, train, foot.", detailVi: "buýt, xe đạp, ô tô, tàu, đi bộ." },
    { step: 2, title: "How often", titleVi: "Tần suất", detail: "always, usually, sometimes, never.", detailVi: "luôn luôn, thường, thỉnh thoảng, không bao giờ." },
    { step: 3, title: "Put together", titleVi: "Ghép lại", detail: "I usually go to school by bus.", detailVi: "Tớ thường đi học bằng buýt." },
  ],
  illustratedRules: [
    { icon: "🚲", rule: "'by + transport' (no 'a').", ruleVi: "'by + phương tiện' (không 'a').", example: "by bus, by car" },
    { icon: "🚶", rule: "'on foot' (not by foot).", ruleVi: "'on foot' (không phải by foot).", example: "I go to school on foot." },
  ],
  watchOut: [
    { mistake: "I go by a bus.", mistakeVi: "I go by a bus.", tip: "Drop 'a': by bus.", tipVi: "Bỏ 'a': by bus." },
  ],
  vocabulary: [
    { word: "transport", meaning: "way to travel", meaningVi: "phương tiện", example: "Bus is my transport." },
    { word: "bus", meaning: "big vehicle", meaningVi: "xe buýt", example: "I go by bus." },
    { word: "bike", meaning: "bicycle", meaningVi: "xe đạp", example: "She rides a bike." },
    { word: "train", meaning: "runs on tracks", meaningVi: "tàu hoả", example: "The train is fast." },
    { word: "always", meaning: "every time", meaningVi: "luôn luôn", example: "I always walk." },
    { word: "never", meaning: "not any time", meaningVi: "không bao giờ", example: "I never drive." },
  ],
  quiz: [
    { question: "I go to school ___ foot.", options: ["by", "on", "in", "at"], answer: 1, explanation: "Use 'on foot'." },
    { question: "Frequency adverb?", options: ["bus", "car", "always", "school"], answer: 2, explanation: "Always = frequency." },
    { question: "Correct: 'by ___ bus'.", options: ["the", "a", "an", "(nothing)"], answer: 3, explanation: "No article after 'by'." },
    { question: "Fastest transport?", options: ["foot", "bike", "train", "bus"], answer: 2, explanation: "Train is fastest here." },
  ],
});

// ====================== FLYERS ======================
const flyersSportsRules = mk({
  id: "cam-flyers-sports-rules",
  title: "Sports & Their Rules",
  titleVi: "Thể thao & Luật chơi",
  level: "flyers",
  skill: "reading-writing",
  icon: "⚽",
  description: "Read short rules and answer 'Which sport is it?'.",
  descriptionVi: "Đọc luật ngắn và trả lời 'Đây là môn thể thao gì?'.",
  illustrationKey: "flyers",
  stepByStep: [
    { step: 1, title: "Skim clue words", titleVi: "Lướt từ khoá", detail: "ball, net, racket, team.", detailVi: "bóng, lưới, vợt, đội." },
    { step: 2, title: "Count players", titleVi: "Đếm cầu thủ", detail: "11 → football, 5 → basketball.", detailVi: "11 → bóng đá, 5 → bóng rổ." },
    { step: 3, title: "Choose the answer", titleVi: "Chọn đáp án", detail: "Match clues to one sport.", detailVi: "Ghép manh mối vào một môn." },
  ],
  illustratedRules: [
    { icon: "🏸", rule: "Equipment is the biggest clue.", ruleVi: "Dụng cụ là gợi ý lớn nhất.", example: "Racket + net → tennis/badminton." },
  ],
  watchOut: [
    { mistake: "Pick first sport you see.", mistakeVi: "Chọn ngay môn đầu tiên thấy.", tip: "Check ALL clues first.", tipVi: "Kiểm tra HẾT manh mối rồi mới chọn." },
  ],
  vocabulary: [
    { word: "team", meaning: "group of players", meaningVi: "đội", example: "Football has two teams." },
    { word: "racket", meaning: "for hitting a ball", meaningVi: "vợt", example: "A tennis racket." },
    { word: "net", meaning: "divides the court", meaningVi: "lưới", example: "The net is in the middle." },
    { word: "score", meaning: "win points", meaningVi: "ghi điểm", example: "She scored a goal." },
    { word: "referee", meaning: "decides rules", meaningVi: "trọng tài", example: "The referee blew the whistle." },
    { word: "court", meaning: "place to play", meaningVi: "sân", example: "A tennis court." },
  ],
  quiz: [
    { question: "11 players + goal = ?", options: ["tennis", "football", "swimming", "chess"], answer: 1, explanation: "Football." },
    { question: "Racket + small ball over net = ?", options: ["basketball", "tennis", "golf", "rugby"], answer: 1, explanation: "Tennis." },
    { question: "5 players + hoop = ?", options: ["football", "tennis", "basketball", "volleyball"], answer: 2, explanation: "Basketball." },
    { question: "Who controls the match?", options: ["coach", "fan", "referee", "captain"], answer: 2, explanation: "Referee." },
  ],
});

const flyersHealthyLife = mk({
  id: "cam-flyers-healthy-life",
  title: "Healthy Habits",
  titleVi: "Thói quen lành mạnh",
  level: "flyers",
  skill: "vocabulary",
  icon: "🥗",
  description: "Use 'should / shouldn't' to give health advice.",
  descriptionVi: "Dùng 'should / shouldn't' để khuyên về sức khoẻ.",
  illustrationKey: "flyers",
  stepByStep: [
    { step: 1, title: "Identify habit", titleVi: "Nhận diện thói quen", detail: "good or bad?", detailVi: "tốt hay xấu?" },
    { step: 2, title: "Pick modal", titleVi: "Chọn modal", detail: "good → should, bad → shouldn't.", detailVi: "tốt → should, xấu → shouldn't." },
    { step: 3, title: "Make sentence", titleVi: "Viết câu", detail: "You should drink water.", detailVi: "Bạn nên uống nước." },
  ],
  illustratedRules: [
    { icon: "💧", rule: "should + base verb.", ruleVi: "should + động từ nguyên mẫu.", example: "You should sleep early." },
    { icon: "🍬", rule: "shouldn't = should not.", ruleVi: "shouldn't = should not.", example: "You shouldn't eat too much sugar." },
  ],
  watchOut: [
    { mistake: "You should to sleep.", mistakeVi: "You should to sleep.", tip: "No 'to' after should.", tipVi: "Sau 'should' không có 'to'." },
  ],
  vocabulary: [
    { word: "healthy", meaning: "good for body", meaningVi: "lành mạnh", example: "Salad is healthy." },
    { word: "exercise", meaning: "do sport", meaningVi: "tập thể dục", example: "I exercise daily." },
    { word: "vegetables", meaning: "plants we eat", meaningVi: "rau", example: "Eat more vegetables." },
    { word: "sugar", meaning: "sweet powder", meaningVi: "đường", example: "Too much sugar is bad." },
    { word: "sleep", meaning: "rest at night", meaningVi: "ngủ", example: "Sleep 8 hours." },
    { word: "advice", meaning: "useful idea", meaningVi: "lời khuyên", example: "Good advice." },
  ],
  quiz: [
    { question: "You ___ drink water.", options: ["should", "shouldn't", "don't", "doesn't"], answer: 0, explanation: "Good habit → should." },
    { question: "You ___ eat lots of sweets.", options: ["should", "shouldn't", "must", "can"], answer: 1, explanation: "Bad habit." },
    { question: "Correct form: 'should ___ early'.", options: ["to sleep", "sleeping", "sleep", "slept"], answer: 2, explanation: "Base verb." },
    { question: "Healthy food?", options: ["chips", "soda", "vegetables", "cake"], answer: 2, explanation: "Vegetables." },
  ],
});

const flyersSchoolTrip = mk({
  id: "cam-flyers-school-trip",
  title: "Our School Trip Story",
  titleVi: "Kể chuyện chuyến đi thực tế",
  level: "flyers",
  skill: "speaking",
  icon: "🚌",
  description: "Tell a 6-sentence story in past simple about a school trip.",
  descriptionVi: "Kể câu chuyện 6 câu ở quá khứ đơn về chuyến đi.",
  illustrationKey: "flyers",
  stepByStep: [
    { step: 1, title: "When + where", titleVi: "Khi nào + ở đâu", detail: "Last Monday, we went to a museum.", detailVi: "Thứ Hai tuần trước, chúng tớ đến bảo tàng." },
    { step: 2, title: "Who + what", titleVi: "Ai + làm gì", detail: "We saw old robots.", detailVi: "Chúng tớ thấy robot cổ." },
    { step: 3, title: "How you felt", titleVi: "Cảm xúc", detail: "I was excited.", detailVi: "Tớ thấy hào hứng." },
  ],
  illustratedRules: [
    { icon: "⏰", rule: "Past simple: -ed or irregular.", ruleVi: "Quá khứ đơn: -ed hoặc bất quy tắc.", example: "went, saw, ate, had." },
  ],
  watchOut: [
    { mistake: "Yesterday I go.", mistakeVi: "Yesterday I go.", tip: "Use past: I went.", tipVi: "Dùng quá khứ: I went." },
  ],
  vocabulary: [
    { word: "trip", meaning: "short journey", meaningVi: "chuyến đi", example: "A school trip." },
    { word: "museum", meaning: "place with old things", meaningVi: "bảo tàng", example: "We visited a museum." },
    { word: "exciting", meaning: "very interesting", meaningVi: "hào hứng", example: "It was exciting." },
    { word: "delicious", meaning: "tastes great", meaningVi: "ngon", example: "Lunch was delicious." },
    { word: "remember", meaning: "keep in mind", meaningVi: "nhớ", example: "I remember the trip." },
    { word: "guide", meaning: "person who explains", meaningVi: "hướng dẫn viên", example: "The guide was kind." },
  ],
  quiz: [
    { question: "Past of 'go'?", options: ["goed", "went", "going", "gone"], answer: 1, explanation: "Irregular: went." },
    { question: "Past of 'see'?", options: ["seed", "saw", "seen", "sees"], answer: 1, explanation: "Saw." },
    { question: "Past of 'eat'?", options: ["eated", "eat", "ate", "eaten"], answer: 2, explanation: "Ate." },
    { question: "Best opener for a story?", options: ["So…", "Last week,", "Anyway,", "OK,"], answer: 1, explanation: "Time phrase." },
  ],
});

// ====================== KET (A2) ======================
const ketEmailReply = mk({
  id: "cam-ket-email-reply",
  title: "KET Writing Part 6 — Reply Email",
  titleVi: "KET Viết Phần 6 — Trả lời Email",
  level: "ket",
  skill: "reading-writing",
  icon: "✉️",
  description: "Write a 25-word reply answering all 3 questions in the email.",
  descriptionVi: "Viết email trả lời 25 từ, đáp đủ 3 câu hỏi trong đề.",
  illustrationKey: "ket",
  stepByStep: [
    { step: 1, title: "Find 3 questions", titleVi: "Tìm 3 câu hỏi", detail: "Underline what to answer.", detailVi: "Gạch chân điều cần trả lời." },
    { step: 2, title: "Plan 3 answers", titleVi: "Lên ý cho 3 ý", detail: "1 short sentence each.", detailVi: "Mỗi ý 1 câu ngắn." },
    { step: 3, title: "Add greeting + sign-off", titleVi: "Thêm chào + ký tên", detail: "'Hi …,' / 'See you,'.", detailVi: "'Chào …,' / 'Hẹn gặp,'." },
  ],
  illustratedRules: [
    { icon: "📨", rule: "Answer ALL 3 points = full marks.", ruleVi: "Đáp ĐỦ 3 ý = điểm tối đa.", example: "Yes, on Sunday, at 9 a.m." },
    { icon: "✍️", rule: "Keep 25+ words.", ruleVi: "Tối thiểu 25 từ.", example: "Count quickly at the end." },
  ],
  watchOut: [
    { mistake: "Answer only 2 questions.", mistakeVi: "Chỉ trả lời 2 câu.", tip: "Always tick off 3 points.", tipVi: "Luôn đánh dấu đủ 3 ý." },
    { mistake: "No greeting/sign-off.", mistakeVi: "Thiếu chào hỏi/ký tên.", tip: "Lose marks for register.", tipVi: "Mất điểm văn phong." },
  ],
  vocabulary: [
    { word: "reply", meaning: "answer email", meaningVi: "trả lời", example: "Please reply soon." },
    { word: "meet up", meaning: "see friends", meaningVi: "gặp nhau", example: "Let's meet up." },
    { word: "weekend", meaning: "Sat & Sun", meaningVi: "cuối tuần", example: "At the weekend." },
    { word: "suggest", meaning: "give idea", meaningVi: "đề xuất", example: "I suggest pizza." },
    { word: "free", meaning: "not busy", meaningVi: "rảnh", example: "I'm free on Sunday." },
    { word: "looking forward to", meaning: "excited about", meaningVi: "mong chờ", example: "Looking forward to it!" },
  ],
  quiz: [
    { question: "Minimum word count?", options: ["10", "15", "20", "25"], answer: 3, explanation: "KET = 25 words." },
    { question: "How many questions to answer?", options: ["1", "2", "3", "All in email"], answer: 2, explanation: "Exactly 3 points." },
    { question: "Best greeting?", options: ["Dear Sir", "To whom…", "Hi Anna,", "Hello there!"], answer: 2, explanation: "Informal Hi." },
    { question: "Best sign-off for friend?", options: ["Yours faithfully", "See you,", "Regards,", "Sincerely,"], answer: 1, explanation: "Informal." },
  ],
});

const ketShoppingRolePlay = mk({
  id: "cam-ket-shopping-roleplay",
  title: "KET Speaking — Shopping Role Play",
  titleVi: "KET Nói — Đóng vai mua sắm",
  level: "ket",
  skill: "speaking",
  icon: "🛍️",
  description: "Ask price, size, colour in a shop and pay politely.",
  descriptionVi: "Hỏi giá, size, màu trong cửa hàng và thanh toán lịch sự.",
  illustrationKey: "ket",
  stepByStep: [
    { step: 1, title: "Greet shop assistant", titleVi: "Chào nhân viên", detail: "Hi! Can you help me?", detailVi: "Chào! Bạn giúp tớ được không?" },
    { step: 2, title: "Ask 3 things", titleVi: "Hỏi 3 thứ", detail: "price, size, colour.", detailVi: "giá, size, màu." },
    { step: 3, title: "Pay + thank", titleVi: "Trả tiền + cảm ơn", detail: "I'll take it. Thanks!", detailVi: "Tôi lấy cái này. Cảm ơn!" },
  ],
  illustratedRules: [
    { icon: "💷", rule: "How much + is/are…?", ruleVi: "How much + is/are…?", example: "How much is this T-shirt?" },
    { icon: "📏", rule: "Have you got + size?", ruleVi: "Have you got + size?", example: "Have you got it in medium?" },
  ],
  watchOut: [
    { mistake: "How much cost this?", mistakeVi: "How much cost this?", tip: "How much is this?", tipVi: "How much is this?" },
    { mistake: "I want it.", mistakeVi: "I want it.", tip: "Polite: I'd like it / I'll take it.", tipVi: "Lịch sự: I'd like it / I'll take it." },
  ],
  vocabulary: [
    { word: "size", meaning: "S/M/L", meaningVi: "kích cỡ", example: "What size?" },
    { word: "try on", meaning: "test clothes", meaningVi: "thử đồ", example: "Can I try it on?" },
    { word: "fits", meaning: "right size", meaningVi: "vừa", example: "It fits perfectly." },
    { word: "discount", meaning: "lower price", meaningVi: "giảm giá", example: "Any discount?" },
    { word: "receipt", meaning: "proof of buying", meaningVi: "hoá đơn", example: "Can I have the receipt?" },
    { word: "cash", meaning: "money in hand", meaningVi: "tiền mặt", example: "I'll pay cash." },
  ],
  quiz: [
    { question: "Polite buy phrase?", options: ["Give me!", "I'll take it, please.", "I want now.", "Bring it."], answer: 1, explanation: "Polite request." },
    { question: "Ask price:", options: ["What is price?", "How cost?", "How much is it?", "Price how?"], answer: 2, explanation: "Correct grammar." },
    { question: "Ask different size:", options: ["Have you got medium?", "Got medium?", "Medium have?", "Need medium."], answer: 0, explanation: "Full polite question." },
    { question: "Word for proof of buying?", options: ["bill only", "receipt", "menu", "ticket only"], answer: 1, explanation: "Receipt." },
  ],
});

const ketStoryLinkers = mk({
  id: "cam-ket-story-linkers",
  title: "KET Story Linkers: and / but / because / so",
  titleVi: "Liên từ kể chuyện KET: and / but / because / so",
  level: "ket",
  skill: "reading-writing",
  icon: "🔗",
  description: "Join 2 short sentences with the correct linker for higher band.",
  descriptionVi: "Nối 2 câu ngắn bằng liên từ đúng để nâng band.",
  illustrationKey: "ket",
  stepByStep: [
    { step: 1, title: "Find relationship", titleVi: "Xác định quan hệ", detail: "Add? Contrast? Reason? Result?", detailVi: "Thêm? Tương phản? Lý do? Kết quả?" },
    { step: 2, title: "Pick the linker", titleVi: "Chọn liên từ", detail: "and / but / because / so.", detailVi: "and / but / because / so." },
    { step: 3, title: "Join smoothly", titleVi: "Nối mượt", detail: "Use comma if needed.", detailVi: "Có thể cần dấu phẩy." },
  ],
  illustratedRules: [
    { icon: "➕", rule: "and = add info.", ruleVi: "and = thêm.", example: "I like tea and coffee." },
    { icon: "❌", rule: "but = contrast.", ruleVi: "but = trái ngược.", example: "It's hot but I'm cold." },
    { icon: "❓", rule: "because = reason.", ruleVi: "because = lý do.", example: "I'm tired because I ran." },
    { icon: "✅", rule: "so = result.", ruleVi: "so = kết quả.", example: "It rained, so I stayed home." },
  ],
  watchOut: [
    { mistake: "I was tired so because…", mistakeVi: "Dùng cả 'so' và 'because' cùng lúc.", tip: "Pick ONE linker.", tipVi: "Chỉ chọn 1 liên từ." },
  ],
  vocabulary: [
    { word: "linker", meaning: "joining word", meaningVi: "liên từ", example: "Use linkers in writing." },
    { word: "reason", meaning: "why", meaningVi: "lý do", example: "Give a reason." },
    { word: "result", meaning: "what happens after", meaningVi: "kết quả", example: "Show the result." },
    { word: "contrast", meaning: "opposite idea", meaningVi: "tương phản", example: "But shows contrast." },
    { word: "add", meaning: "put more", meaningVi: "thêm", example: "Add an example." },
    { word: "smooth", meaning: "easy to read", meaningVi: "trôi chảy", example: "Make it smooth." },
  ],
  quiz: [
    { question: "I was tired ___ I went to bed.", options: ["but", "because", "so", "and"], answer: 2, explanation: "Result → so." },
    { question: "He likes pizza ___ pasta.", options: ["but", "because", "so", "and"], answer: 3, explanation: "Add → and." },
    { question: "It's cheap ___ very nice.", options: ["but", "because", "so", "and"], answer: 0, explanation: "Cheap & nice = contrast surprise → but." },
    { question: "I stayed home ___ it rained.", options: ["but", "because", "so", "and"], answer: 1, explanation: "Reason → because." },
  ],
});

// ====================== PET (B1) ======================
const petEssayOpinion = mk({
  id: "cam-pet-essay-opinion",
  title: "PET Writing Part 2 — Opinion Essay",
  titleVi: "PET Viết Phần 2 — Bài luận quan điểm",
  level: "pet",
  skill: "reading-writing",
  icon: "🖊️",
  description: "Plan a 100-word essay with clear opinion, 2 reasons + examples.",
  descriptionVi: "Lập dàn 100 từ với quan điểm rõ, 2 lý do + ví dụ.",
  illustrationKey: "pet",
  stepByStep: [
    { step: 1, title: "State opinion", titleVi: "Nêu quan điểm", detail: "I strongly believe that…", detailVi: "Tôi tin chắc rằng…" },
    { step: 2, title: "Reason 1 + example", titleVi: "Lý do 1 + ví dụ", detail: "Firstly,… For example,…", detailVi: "Đầu tiên,… Ví dụ,…" },
    { step: 3, title: "Reason 2 + example", titleVi: "Lý do 2 + ví dụ", detail: "Secondly,… In addition,…", detailVi: "Thứ hai,… Thêm vào đó,…" },
    { step: 4, title: "Conclusion", titleVi: "Kết luận", detail: "To sum up,… Therefore,…", detailVi: "Tóm lại,… Vì vậy,…" },
  ],
  illustratedRules: [
    { icon: "💡", rule: "1 idea per paragraph.", ruleVi: "Mỗi đoạn 1 ý.", example: "Don't mix reasons." },
    { icon: "🔗", rule: "Use linkers: firstly, secondly, however, therefore.", ruleVi: "Dùng liên từ: firstly, secondly, however, therefore.", example: "Helps coherence band." },
  ],
  watchOut: [
    { mistake: "Skip the conclusion.", mistakeVi: "Bỏ kết luận.", tip: "Always close with 'To sum up,…'.", tipVi: "Luôn kết bằng 'To sum up,…'." },
    { mistake: "Use 'I think' five times.", mistakeVi: "Lặp 'I think' nhiều lần.", tip: "Vary: I believe / In my view / It seems to me.", tipVi: "Đổi: I believe / In my view / It seems to me." },
  ],
  vocabulary: [
    { word: "opinion", meaning: "what you think", meaningVi: "quan điểm", example: "Give your opinion." },
    { word: "argue", meaning: "support an idea", meaningVi: "lập luận", example: "She argues for change." },
    { word: "moreover", meaning: "in addition", meaningVi: "hơn nữa", example: "Moreover, it's free." },
    { word: "however", meaning: "but", meaningVi: "tuy nhiên", example: "However, costs rise." },
    { word: "therefore", meaning: "so", meaningVi: "do đó", example: "Therefore, we should act." },
    { word: "convince", meaning: "make believe", meaningVi: "thuyết phục", example: "It convinced me." },
  ],
  quiz: [
    { question: "Target length?", options: ["50", "70", "100", "200"], answer: 2, explanation: "PET essay = ~100 words." },
    { question: "Best opening?", options: ["I think yes.", "In my view, schools should…", "Idk really.", "Anyway,"], answer: 1, explanation: "Formal opinion." },
    { question: "Linker for contrast?", options: ["Moreover", "However", "Therefore", "Firstly"], answer: 1, explanation: "However." },
    { question: "Best conclusion starter?", options: ["So basically,", "To sum up,", "BTW,", "Anyway,"], answer: 1, explanation: "Formal close." },
  ],
});

const petListeningMonologue = mk({
  id: "cam-pet-listening-monologue",
  title: "PET Listening Part 3 — Monologue Notes",
  titleVi: "PET Nghe Phần 3 — Ghi chú đoạn độc thoại",
  level: "pet",
  skill: "listening",
  icon: "🎧",
  description: "Fill gaps in notes from a 3-minute monologue (numbers, names, dates).",
  descriptionVi: "Điền chỗ trống trong ghi chú từ đoạn nói 3 phút (số, tên, ngày).",
  illustrationKey: "pet",
  stepByStep: [
    { step: 1, title: "Read gaps first", titleVi: "Đọc chỗ trống trước", detail: "Predict word type.", detailVi: "Đoán loại từ cần điền." },
    { step: 2, title: "Listen for paraphrase", titleVi: "Nghe diễn đạt khác", detail: "'started' → 'began'.", detailVi: "'started' → 'began'." },
    { step: 3, title: "Check spelling", titleVi: "Kiểm tra chính tả", detail: "Names are spelled out.", detailVi: "Tên thường được đánh vần." },
  ],
  illustratedRules: [
    { icon: "🔢", rule: "Numbers: write digits if asked.", ruleVi: "Số: viết bằng chữ số nếu yêu cầu.", example: "1995, 7 p.m." },
    { icon: "📅", rule: "Date order: day → month.", ruleVi: "Thứ tự ngày: ngày → tháng.", example: "12 May" },
  ],
  watchOut: [
    { mistake: "Wait for word #1 only.", mistakeVi: "Chỉ đợi từ #1.", tip: "Read ALL gaps before audio.", tipVi: "Đọc HẾT chỗ trống trước khi audio chạy." },
    { mistake: "Misspelled name = 0.", mistakeVi: "Sai chính tả tên = 0.", tip: "Listen to letter-by-letter spelling.", tipVi: "Nghe từng chữ cái khi đánh vần." },
  ],
  vocabulary: [
    { word: "monologue", meaning: "one speaker", meaningVi: "đoạn độc thoại", example: "A short monologue." },
    { word: "notes", meaning: "short writing", meaningVi: "ghi chú", example: "Take notes." },
    { word: "spelled out", meaning: "letter by letter", meaningVi: "đánh vần", example: "She spelled it out." },
    { word: "paraphrase", meaning: "same idea, new words", meaningVi: "diễn đạt lại", example: "Paraphrase the line." },
    { word: "schedule", meaning: "time plan", meaningVi: "lịch trình", example: "The tour schedule." },
    { word: "entrance", meaning: "way in", meaningVi: "lối vào", example: "Main entrance." },
  ],
  quiz: [
    { question: "Read gaps ___ audio.", options: ["after", "during", "before", "never"], answer: 2, explanation: "Before listening." },
    { question: "If asked for a number, write ___.", options: ["word", "digits", "either", "skip"], answer: 1, explanation: "Use digits if instructions say so." },
    { question: "Misspelled name =", options: ["half mark", "full mark", "zero mark", "depends"], answer: 2, explanation: "Zero." },
    { question: "'Began' is a ___ of 'started'.", options: ["antonym", "paraphrase", "synonym only", "translation"], answer: 1, explanation: "Paraphrase / synonym." },
  ],
});

const petSpeakingPart4 = mk({
  id: "cam-pet-speaking-part4",
  title: "PET Speaking Part 4 — Discussion",
  titleVi: "PET Nói Phần 4 — Thảo luận",
  level: "pet",
  skill: "speaking",
  icon: "🗣️",
  description: "Discuss a topic with examiner; give opinion, reason, example, ask back.",
  descriptionVi: "Thảo luận với giám khảo; nêu quan điểm, lý do, ví dụ và hỏi lại.",
  illustrationKey: "pet",
  stepByStep: [
    { step: 1, title: "Take 2 seconds", titleVi: "Dừng 2 giây", detail: "Plan: opinion + reason.", detailVi: "Lên ý: quan điểm + lý do." },
    { step: 2, title: "Use ORE", titleVi: "Dùng ORE", detail: "Opinion → Reason → Example.", detailVi: "Quan điểm → Lý do → Ví dụ." },
    { step: 3, title: "Invite partner", titleVi: "Mời bạn nói", detail: "What about you?", detailVi: "Còn bạn thì sao?" },
  ],
  illustratedRules: [
    { icon: "💭", rule: "Avoid 'yes/no' only answers.", ruleVi: "Không trả lời cộc lốc yes/no.", example: "Yes, because…" },
    { icon: "🤝", rule: "Show agreement: 'I agree, and also…'.", ruleVi: "Thể hiện đồng tình: 'I agree, and also…'.", example: "Boost interaction band." },
  ],
  watchOut: [
    { mistake: "Talk over the partner.", mistakeVi: "Nói chèn lên bạn.", tip: "Wait, then add 'I'd like to add…'.", tipVi: "Chờ, rồi thêm 'I'd like to add…'." },
    { mistake: "Repeat the question.", mistakeVi: "Lặp lại câu hỏi.", tip: "Paraphrase: 'Personally, I feel…'.", tipVi: "Diễn đạt lại: 'Personally, I feel…'." },
  ],
  vocabulary: [
    { word: "discussion", meaning: "talk about a topic", meaningVi: "thảo luận", example: "A short discussion." },
    { word: "agree", meaning: "same opinion", meaningVi: "đồng ý", example: "I totally agree." },
    { word: "disagree", meaning: "different opinion", meaningVi: "không đồng ý", example: "I disagree because…" },
    { word: "fluent", meaning: "smooth speaking", meaningVi: "trôi chảy", example: "She is fluent in English." },
    { word: "filler", meaning: "well/you know", meaningVi: "từ chêm", example: "Avoid too many fillers." },
    { word: "rephrase", meaning: "say differently", meaningVi: "diễn đạt lại", example: "Let me rephrase that." },
  ],
  quiz: [
    { question: "ORE means…", options: ["Open-Repeat-End", "Opinion-Reason-Example", "Order-Rest-Edit", "Open-Read-Explain"], answer: 1, explanation: "Opinion → Reason → Example." },
    { question: "Best way to disagree politely?", options: ["You're wrong.", "I see your point, but…", "No way.", "Nope."], answer: 1, explanation: "Soft disagreement." },
    { question: "Invite partner to speak:", options: ["Stop.", "Listen!", "What about you?", "Quiet."], answer: 2, explanation: "Polite invite." },
    { question: "Repeating the question wastes…", options: ["paper", "time", "ideas", "examiner"], answer: 1, explanation: "Time. Paraphrase instead." },
  ],
});

// === EXPORT (15 lectures, 3 per level) ===
export const cambridgeLecturesExpansion9: CambridgeLecture[] = [
  startersWeatherClothes,
  startersBodyFeelings,
  startersZooAnimals,
  moversSchoolSubjects,
  moversJobsTown,
  moversTransport,
  flyersSportsRules,
  flyersHealthyLife,
  flyersSchoolTrip,
  ketEmailReply,
  ketShoppingRolePlay,
  ketStoryLinkers,
  petEssayOpinion,
  petListeningMonologue,
  petSpeakingPart4,
];
