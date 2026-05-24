/**
 * @file cambridgeLecturesExpansion8.ts
 * @description 10 additional Cambridge lectures (2 per level: Starters → PET).
 *              Fresh themes: shapes, toys, jobs, food market, hobbies, daily routine,
 *              shopping, travel plans, environment, technology opinion.
 * @author HaiEduTech
 */

import type { CambridgeLecture } from "./cambridgeLecturesData";

const mk = (l: Partial<CambridgeLecture> & Pick<CambridgeLecture, "id" | "title" | "titleVi" | "level" | "skill" | "icon" | "description" | "descriptionVi">): CambridgeLecture => ({
  duration: "15 min",
  learningObjective: l.description!,
  learningObjectiveVi: l.descriptionVi!,
  examPattern: "Cambridge YLE / KET / PET task practice with picture and text prompts.",
  examPatternVi: "Luyện theo dạng Cambridge YLE / KET / PET với tranh và đoạn văn.",
  secretTip: "🔑 Read the question twice, underline keywords, then choose.",
  secretTipVi: "🔑 Đọc câu hỏi 2 lần, gạch chân từ khoá, rồi mới chọn đáp án.",
  welcomeMessage: "Hi friend! Let's learn something new today! ✨",
  welcomeMessageVi: "Chào bạn! Hôm nay mình cùng học điều mới nhé! ✨",
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

// STARTERS
const startersShapesColors = mk({
  id: "cam-starters-shapes-sizes",
  title: "Shapes & Sizes",
  titleVi: "Hình dạng & Kích cỡ",
  level: "starters",
  skill: "vocabulary",
  icon: "🔷",
  description: "Name circle, square, triangle, star and use 'big/small'.",
  descriptionVi: "Gọi tên hình tròn, vuông, tam giác, ngôi sao và dùng 'big/small'.",
  illustrationKey: "starters",
  stepByStep: [
    { step: 1, title: "4 shapes", titleVi: "4 hình", detail: "circle, square, triangle, star.", detailVi: "tròn, vuông, tam giác, ngôi sao." },
    { step: 2, title: "Add size", titleVi: "Thêm kích cỡ", detail: "a big circle, a small star.", detailVi: "hình tròn lớn, ngôi sao nhỏ." },
    { step: 3, title: "Add color", titleVi: "Thêm màu", detail: "a red triangle, a blue square.", detailVi: "tam giác đỏ, vuông xanh." },
  ],
  illustratedRules: [
    { icon: "🔵", rule: "Order: size + color + shape.", ruleVi: "Thứ tự: kích cỡ + màu + hình.", example: "a big red circle" },
    { icon: "⭐", rule: "Use 'a' before each item.", ruleVi: "Dùng 'a' trước mỗi vật.", example: "a yellow star" },
  ],
  watchOut: [
    { mistake: "red big circle", mistakeVi: "red big circle", tip: "Size first: big red circle.", tipVi: "Kích cỡ trước: big red circle." },
  ],
  vocabulary: [
    { word: "circle", meaning: "round shape", meaningVi: "hình tròn", example: "The sun is a circle." },
    { word: "square", meaning: "4 equal sides", meaningVi: "hình vuông", example: "A window is a square." },
    { word: "triangle", meaning: "3 sides", meaningVi: "tam giác", example: "A pizza slice is a triangle." },
    { word: "star", meaning: "5-point shape", meaningVi: "ngôi sao", example: "I draw a star." },
    { word: "big", meaning: "large", meaningVi: "to", example: "A big dog." },
    { word: "small", meaning: "little", meaningVi: "nhỏ", example: "A small cat." },
  ],
  quiz: [
    { question: "Correct order?", options: ["red big star", "big red star", "star big red", "red star big"], answer: 1, explanation: "Size + color + shape." },
    { question: "How many sides has a triangle?", options: ["2", "3", "4", "5"], answer: 1, explanation: "Three sides." },
    { question: "Opposite of 'big'?", options: ["large", "small", "tall", "long"], answer: 1, explanation: "Small is opposite." },
    { question: "Shape of the sun?", options: ["square", "triangle", "circle", "star"], answer: 2, explanation: "It is round." },
  ],
});

const startersToysPlay = mk({
  id: "cam-starters-toys-play",
  title: "My Toys & Play Time",
  titleVi: "Đồ chơi & Giờ chơi",
  level: "starters",
  skill: "speaking",
  icon: "🧸",
  description: "Talk about your favourite toy using 'My favourite toy is…'.",
  descriptionVi: "Nói về đồ chơi yêu thích bằng 'My favourite toy is…'.",
  illustrationKey: "starters",
  stepByStep: [
    { step: 1, title: "Toy words", titleVi: "Từ về đồ chơi", detail: "ball, doll, kite, car, robot, teddy.", detailVi: "bóng, búp bê, diều, ô tô, robot, gấu bông." },
    { step: 2, title: "Say favourite", titleVi: "Nói yêu thích", detail: "My favourite toy is my teddy.", detailVi: "Đồ chơi yêu thích của em là gấu bông." },
    { step: 3, title: "Verbs", titleVi: "Động từ", detail: "play with, throw, catch, ride.", detailVi: "chơi với, ném, bắt, cưỡi." },
  ],
  vocabulary: [
    { word: "ball", meaning: "round toy", meaningVi: "quả bóng", example: "I kick the ball." },
    { word: "doll", meaning: "toy person", meaningVi: "búp bê", example: "Anna loves her doll." },
    { word: "kite", meaning: "flying toy", meaningVi: "con diều", example: "We fly a kite." },
    { word: "robot", meaning: "machine toy", meaningVi: "rô bốt", example: "My robot walks." },
    { word: "teddy", meaning: "soft bear", meaningVi: "gấu bông", example: "I hug my teddy." },
  ],
  quiz: [
    { question: "We _ the ball.", options: ["fly", "kick", "read", "drink"], answer: 1, explanation: "We kick a ball." },
    { question: "We fly a _.", options: ["doll", "kite", "car", "robot"], answer: 1, explanation: "Kites fly." },
    { question: "Favourite means…", options: ["bad", "most liked", "old", "small"], answer: 1, explanation: "Most liked." },
  ],
});

// MOVERS
const moversJobs = mk({
  id: "cam-movers-jobs-people",
  title: "Jobs & Working People",
  titleVi: "Nghề nghiệp & Người đi làm",
  level: "movers",
  skill: "vocabulary",
  icon: "👩‍⚕️",
  description: "Name 10 jobs and describe what they do: 'A doctor helps sick people.'",
  descriptionVi: "Gọi tên 10 nghề và mô tả công việc: 'Bác sĩ chăm sóc người bệnh.'",
  illustrationKey: "movers",
  stepByStep: [
    { step: 1, title: "Jobs", titleVi: "Nghề", detail: "doctor, nurse, teacher, farmer, cook, driver, pilot, vet, dentist, builder.", detailVi: "bác sĩ, y tá, giáo viên, nông dân, đầu bếp, tài xế, phi công, bác sĩ thú y, nha sĩ, thợ xây." },
    { step: 2, title: "Sentence", titleVi: "Mẫu câu", detail: "A ___ + verb + object. A cook makes food.", detailVi: "A ___ + động từ + tân ngữ. A cook makes food." },
  ],
  vocabulary: [
    { word: "doctor", meaning: "helps sick people", meaningVi: "bác sĩ", example: "A doctor works in a hospital." },
    { word: "farmer", meaning: "grows food", meaningVi: "nông dân", example: "A farmer has cows." },
    { word: "pilot", meaning: "flies planes", meaningVi: "phi công", example: "A pilot flies a plane." },
    { word: "vet", meaning: "animal doctor", meaningVi: "bác sĩ thú y", example: "The vet helps my dog." },
    { word: "builder", meaning: "makes houses", meaningVi: "thợ xây", example: "A builder builds a wall." },
    { word: "dentist", meaning: "fixes teeth", meaningVi: "nha sĩ", example: "A dentist looks at my teeth." },
  ],
  quiz: [
    { question: "Who flies a plane?", options: ["driver", "pilot", "vet", "cook"], answer: 1, explanation: "A pilot flies." },
    { question: "An animal doctor is a…", options: ["nurse", "vet", "farmer", "builder"], answer: 1, explanation: "Vet treats animals." },
    { question: "A cook _ food.", options: ["makes", "flies", "reads", "drives"], answer: 0, explanation: "Cooks make food." },
    { question: "A farmer _ vegetables.", options: ["grows", "drives", "teaches", "paints"], answer: 0, explanation: "Farmers grow food." },
  ],
});

const moversDailyRoutine = mk({
  id: "cam-movers-daily-routine",
  title: "My Daily Routine",
  titleVi: "Lịch sinh hoạt hàng ngày",
  level: "movers",
  skill: "speaking",
  icon: "⏰",
  description: "Talk about your day using Present Simple + time phrases.",
  descriptionVi: "Nói về một ngày của em bằng Hiện tại đơn + cụm thời gian.",
  illustrationKey: "movers",
  stepByStep: [
    { step: 1, title: "Time phrases", titleVi: "Cụm thời gian", detail: "at 7 o'clock, in the morning, after school.", detailVi: "lúc 7 giờ, vào buổi sáng, sau giờ học." },
    { step: 2, title: "Verbs", titleVi: "Động từ", detail: "get up, have breakfast, go to school, do homework, go to bed.", detailVi: "thức dậy, ăn sáng, đi học, làm bài, đi ngủ." },
    { step: 3, title: "Order", titleVi: "Trình tự", detail: "First / Then / After that / Finally.", detailVi: "Đầu tiên / Sau đó / Tiếp theo / Cuối cùng." },
  ],
  vocabulary: [
    { word: "get up", meaning: "leave bed", meaningVi: "thức dậy", example: "I get up at 6." },
    { word: "breakfast", meaning: "morning meal", meaningVi: "bữa sáng", example: "I eat eggs for breakfast." },
    { word: "homework", meaning: "school task", meaningVi: "bài tập về nhà", example: "I do my homework." },
    { word: "always", meaning: "every time", meaningVi: "luôn luôn", example: "I always brush my teeth." },
    { word: "usually", meaning: "most times", meaningVi: "thường thường", example: "I usually walk to school." },
  ],
  quiz: [
    { question: "I _ up at 7 o'clock.", options: ["get", "go", "do", "have"], answer: 0, explanation: "get up = thức dậy." },
    { question: "Order word for FIRST action?", options: ["Finally", "First", "Then", "After"], answer: 1, explanation: "First = đầu tiên." },
    { question: "I _ breakfast at 7:30.", options: ["have", "make", "go", "play"], answer: 0, explanation: "have breakfast." },
  ],
});

// FLYERS
const flyersHobbies = mk({
  id: "cam-flyers-hobbies",
  title: "Hobbies & Free Time",
  titleVi: "Sở thích & Thời gian rảnh",
  level: "flyers",
  skill: "reading-writing",
  icon: "🎨",
  description: "Use gerunds (V-ing) to talk about hobbies: 'I love painting.'",
  descriptionVi: "Dùng V-ing để nói về sở thích: 'I love painting.'",
  illustrationKey: "flyers",
  stepByStep: [
    { step: 1, title: "Hobby verbs", titleVi: "Động từ sở thích", detail: "paint, swim, dance, read, collect, bake.", detailVi: "vẽ, bơi, nhảy, đọc, sưu tầm, làm bánh." },
    { step: 2, title: "love / like / hate + V-ing", titleVi: "love / like / hate + V-ing", detail: "I love painting. She hates running.", detailVi: "Tôi yêu vẽ. Cô ấy ghét chạy." },
  ],
  vocabulary: [
    { word: "hobby", meaning: "fun activity", meaningVi: "sở thích", example: "My hobby is reading." },
    { word: "collect", meaning: "gather things", meaningVi: "sưu tầm", example: "I collect stamps." },
    { word: "painting", meaning: "making pictures", meaningVi: "vẽ tranh", example: "I enjoy painting." },
    { word: "baking", meaning: "making cakes", meaningVi: "làm bánh", example: "She loves baking cookies." },
    { word: "dancing", meaning: "moving to music", meaningVi: "nhảy múa", example: "We go dancing on Saturday." },
  ],
  quiz: [
    { question: "I love _ books.", options: ["read", "reading", "reads", "to reading"], answer: 1, explanation: "love + V-ing." },
    { question: "Hobby means…", options: ["work", "fun activity", "test", "school"], answer: 1, explanation: "A hobby is fun." },
    { question: "She hates _ early.", options: ["get up", "getting up", "gets up", "got up"], answer: 1, explanation: "hate + V-ing." },
  ],
});

const flyersComparatives = mk({
  id: "cam-flyers-comparatives",
  title: "Comparing Things: -er than",
  titleVi: "So sánh hơn: -er than",
  level: "flyers",
  skill: "reading-writing",
  icon: "📏",
  description: "Build comparative adjectives correctly (bigger, happier, more beautiful).",
  descriptionVi: "Tạo tính từ so sánh đúng (bigger, happier, more beautiful).",
  illustrationKey: "flyers",
  stepByStep: [
    { step: 1, title: "Short adj +er", titleVi: "Tính từ ngắn +er", detail: "tall → taller, big → bigger.", detailVi: "tall → taller, big → bigger." },
    { step: 2, title: "Long adj more+", titleVi: "Tính từ dài more+", detail: "beautiful → more beautiful.", detailVi: "beautiful → more beautiful." },
    { step: 3, title: "Irregulars", titleVi: "Bất quy tắc", detail: "good→better, bad→worse, far→further.", detailVi: "good→better, bad→worse, far→further." },
  ],
  vocabulary: [
    { word: "taller", meaning: "more tall", meaningVi: "cao hơn", example: "Tom is taller than me." },
    { word: "happier", meaning: "more happy", meaningVi: "vui hơn", example: "She is happier today." },
    { word: "better", meaning: "more good", meaningVi: "tốt hơn", example: "This pen is better." },
    { word: "worse", meaning: "more bad", meaningVi: "tệ hơn", example: "Today is worse than yesterday." },
  ],
  quiz: [
    { question: "Comparative of 'big'?", options: ["biger", "bigger", "more big", "biggest"], answer: 1, explanation: "Double g + er." },
    { question: "Comparative of 'good'?", options: ["gooder", "more good", "better", "best"], answer: 2, explanation: "Irregular: better." },
    { question: "He is _ than his brother.", options: ["tall", "taller", "more tall", "tallest"], answer: 1, explanation: "Comparative + than." },
    { question: "Comparative of 'beautiful'?", options: ["beautifuler", "more beautiful", "beautifuller", "beautifullest"], answer: 1, explanation: "Long adj → more + adj." },
  ],
});

// KET
const ketShopping = mk({
  id: "cam-ket-shopping-money",
  title: "Shopping & Money",
  titleVi: "Mua sắm & Tiền",
  level: "ket",
  skill: "speaking",
  icon: "🛍️",
  description: "Buy items politely: 'How much is/are…?' and 'I'll take it.'",
  descriptionVi: "Mua hàng lịch sự: 'How much is/are…?' và 'I'll take it.'",
  illustrationKey: "ket",
  stepByStep: [
    { step: 1, title: "Ask price", titleVi: "Hỏi giá", detail: "How much is this shirt? How much are these shoes?", detailVi: "Cái áo này bao nhiêu? Đôi giày này bao nhiêu?" },
    { step: 2, title: "Bargain politely", titleVi: "Mặc cả lịch sự", detail: "Could you give me a discount?", detailVi: "Bạn giảm giá được không?" },
    { step: 3, title: "Pay", titleVi: "Thanh toán", detail: "I'll pay by card / in cash.", detailVi: "Tôi thanh toán thẻ / tiền mặt." },
  ],
  vocabulary: [
    { word: "discount", meaning: "lower price", meaningVi: "giảm giá", example: "10% discount today." },
    { word: "receipt", meaning: "proof of payment", meaningVi: "hoá đơn", example: "Here is your receipt." },
    { word: "cash", meaning: "paper money", meaningVi: "tiền mặt", example: "I'll pay in cash." },
    { word: "size", meaning: "how big", meaningVi: "cỡ", example: "What size are you?" },
    { word: "fits", meaning: "right size", meaningVi: "vừa vặn", example: "This shirt fits me." },
  ],
  quiz: [
    { question: "How _ is this hat?", options: ["many", "much", "old", "long"], answer: 1, explanation: "Singular price → much." },
    { question: "Pay with card or…?", options: ["cash", "food", "soap", "key"], answer: 0, explanation: "Cash = tiền mặt." },
    { question: "A lower price is a…", options: ["receipt", "discount", "size", "queue"], answer: 1, explanation: "Discount = giảm giá." },
  ],
});

const ketTravelPlans = mk({
  id: "cam-ket-travel-plans",
  title: "Travel Plans with 'going to'",
  titleVi: "Kế hoạch du lịch với 'going to'",
  level: "ket",
  skill: "reading-writing",
  icon: "✈️",
  description: "Write about future travel plans using be + going to + V.",
  descriptionVi: "Viết về kế hoạch du lịch với be + going to + V.",
  illustrationKey: "ket",
  stepByStep: [
    { step: 1, title: "Form", titleVi: "Cấu trúc", detail: "S + am/is/are + going to + V.", detailVi: "S + am/is/are + going to + V." },
    { step: 2, title: "Time markers", titleVi: "Mốc thời gian", detail: "next week, this summer, tomorrow.", detailVi: "tuần sau, mùa hè này, ngày mai." },
    { step: 3, title: "5-sentence plan", titleVi: "Đoạn 5 câu", detail: "Where + When + Who + Activity + Feeling.", detailVi: "Đâu + Khi nào + Với ai + Hoạt động + Cảm xúc." },
  ],
  vocabulary: [
    { word: "abroad", meaning: "another country", meaningVi: "nước ngoài", example: "We are going abroad." },
    { word: "passport", meaning: "travel ID", meaningVi: "hộ chiếu", example: "Bring your passport." },
    { word: "luggage", meaning: "bags", meaningVi: "hành lý", example: "My luggage is heavy." },
    { word: "tour", meaning: "guided trip", meaningVi: "chuyến tham quan", example: "We took a city tour." },
    { word: "souvenir", meaning: "memory gift", meaningVi: "quà lưu niệm", example: "I bought a souvenir." },
  ],
  quiz: [
    { question: "We _ going to fly.", options: ["am", "is", "are", "be"], answer: 2, explanation: "we → are." },
    { question: "Document for abroad travel?", options: ["receipt", "passport", "ticket book", "menu"], answer: 1, explanation: "Passport." },
    { question: "A memory gift is a…", options: ["luggage", "souvenir", "tour", "queue"], answer: 1, explanation: "Souvenir." },
    { question: "She _ going to visit Paris.", options: ["are", "am", "is", "be"], answer: 2, explanation: "she → is." },
  ],
});

// PET
const petEnvironment = mk({
  id: "cam-pet-environment",
  title: "Protecting the Environment",
  titleVi: "Bảo vệ môi trường",
  level: "pet",
  skill: "reading-writing",
  icon: "🌍",
  description: "Discuss eco-actions; write a B1 article using cause/effect linkers.",
  descriptionVi: "Bàn về hành động bảo vệ môi trường; viết bài B1 với liên từ nguyên nhân/kết quả.",
  illustrationKey: "pet",
  stepByStep: [
    { step: 1, title: "Vocab pillar", titleVi: "Trụ từ vựng", detail: "pollution, recycle, plastic, climate change.", detailVi: "ô nhiễm, tái chế, nhựa, biến đổi khí hậu." },
    { step: 2, title: "Linkers", titleVi: "Liên từ", detail: "because, as a result, therefore, so that.", detailVi: "bởi vì, kết quả là, do đó, để mà." },
    { step: 3, title: "Article body", titleVi: "Thân bài", detail: "Problem → Cause → Solution (≈100 words).", detailVi: "Vấn đề → Nguyên nhân → Giải pháp (≈100 từ)." },
  ],
  vocabulary: [
    { word: "pollution", meaning: "dirty air/water", meaningVi: "ô nhiễm", example: "Air pollution is rising." },
    { word: "recycle", meaning: "use again", meaningVi: "tái chế", example: "We recycle bottles." },
    { word: "reduce", meaning: "use less", meaningVi: "giảm bớt", example: "Reduce plastic bags." },
    { word: "climate", meaning: "weather pattern", meaningVi: "khí hậu", example: "Climate change is real." },
    { word: "renewable", meaning: "can be reused", meaningVi: "tái tạo được", example: "Solar is renewable." },
  ],
  quiz: [
    { question: "Best linker for result?", options: ["because", "as a result", "but", "or"], answer: 1, explanation: "As a result shows effect." },
    { question: "Opposite of 'increase'?", options: ["reduce", "recycle", "renew", "reuse"], answer: 0, explanation: "Reduce = giảm." },
    { question: "Solar power is…", options: ["polluting", "renewable", "limited", "rare"], answer: 1, explanation: "Solar is renewable." },
    { question: "Body paragraph order?", options: ["Solution-Problem-Cause", "Problem-Cause-Solution", "Cause-Solution-Problem", "Random"], answer: 1, explanation: "Logical PCS order." },
  ],
});

const petTechnologyOpinion = mk({
  id: "cam-pet-technology-opinion",
  title: "Technology: For or Against?",
  titleVi: "Công nghệ: Ủng hộ hay Phản đối?",
  level: "pet",
  skill: "speaking",
  icon: "📱",
  description: "Express opinions about tech using B1 functional language.",
  descriptionVi: "Nêu quan điểm về công nghệ bằng ngôn ngữ chức năng B1.",
  illustrationKey: "pet",
  stepByStep: [
    { step: 1, title: "Opinion phrases", titleVi: "Cụm nêu ý kiến", detail: "In my opinion, I believe, From my perspective.", detailVi: "Theo tôi, tôi tin rằng, theo góc nhìn của tôi." },
    { step: 2, title: "Pros & Cons", titleVi: "Lợi & Hại", detail: "On the one hand… On the other hand…", detailVi: "Một mặt… mặt khác…" },
    { step: 3, title: "Conclude", titleVi: "Kết luận", detail: "Overall, I think… because…", detailVi: "Nhìn chung, tôi nghĩ… bởi vì…" },
  ],
  vocabulary: [
    { word: "device", meaning: "electronic tool", meaningVi: "thiết bị", example: "My device is fast." },
    { word: "addicted", meaning: "cannot stop", meaningVi: "nghiện", example: "Kids get addicted to games." },
    { word: "convenient", meaning: "easy to use", meaningVi: "tiện lợi", example: "Online learning is convenient." },
    { word: "screen time", meaning: "time on devices", meaningVi: "thời gian dùng màn hình", example: "Limit screen time." },
    { word: "balance", meaning: "even mix", meaningVi: "cân bằng", example: "Find balance between study and play." },
  ],
  quiz: [
    { question: "Best opinion opener?", options: ["Maybe okay", "In my opinion", "It is", "Done"], answer: 1, explanation: "Standard B1 opener." },
    { question: "Contrast linker?", options: ["Also", "On the other hand", "Because", "So"], answer: 1, explanation: "Shows opposite side." },
    { question: "Best conclusion starter?", options: ["Firstly", "Overall", "Hello", "Because"], answer: 1, explanation: "Overall summarises." },
    { question: "Word for 'easy to use'?", options: ["addicted", "convenient", "balance", "device"], answer: 1, explanation: "Convenient." },
  ],
});

export const cambridgeLecturesExpansion8: CambridgeLecture[] = [
  startersShapesColors,
  startersToysPlay,
  moversJobs,
  moversDailyRoutine,
  flyersHobbies,
  flyersComparatives,
  ketShopping,
  ketTravelPlans,
  petEnvironment,
  petTechnologyOpinion,
];
