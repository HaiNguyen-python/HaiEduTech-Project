/**
 * @file cambridgeLecturesExpansion10.ts
 * @description 15 additional Cambridge lectures (3 per level: Starters → PET).
 *              Themes: colors & shapes, toys & games, food & drinks;
 *              house & rooms, daily routine, hobbies & free time;
 *              nature & environment, technology at home, world cultures;
 *              KET signs & notices, KET short message reading, KET listening multi-match;
 *              PET reading gapped text, PET writing story, PET listening Part 1 short answers.
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
    secretTip: "🔑 Underline keywords first, then choose carefully.",
    secretTipVi: "🔑 Gạch chân từ khoá trước, rồi chọn đáp án cẩn thận.",
    welcomeMessage: "Hello explorer! Let's unlock a brand-new lesson today! 🚀",
    welcomeMessageVi: "Chào nhà thám hiểm! Cùng mở khoá bài học mới nhé! 🚀",
    stepByStep: [],
    illustratedRules: [],
    watchOut: [],
    practiceSet: [],
    vocabulary: [],
    quiz: [],
    parentInfo: "Compact lesson with vocabulary, rules and quiz aligned with Cambridge YLE/KET/PET.",
    parentInfoVi: "Bài học gọn gàng có từ vựng, quy tắc và quiz bám sát Cambridge YLE/KET/PET.",
    isNew: true,
    ...l,
  } as CambridgeLecture);

// ====================== STARTERS ======================
const startersColorsShapes = mk({
  id: "cam-starters-colors-shapes",
  title: "Colors & Shapes",
  titleVi: "Màu sắc & Hình khối",
  level: "starters",
  skill: "vocabulary",
  icon: "🎨",
  description: "Name basic colors and shapes; say 'a red circle', 'a blue square'.",
  descriptionVi: "Gọi tên màu và hình cơ bản; nói 'a red circle', 'a blue square'.",
  illustrationKey: "starters",
  stepByStep: [
    { step: 1, title: "Colors", titleVi: "Màu sắc", detail: "red, blue, green, yellow, pink, black, white.", detailVi: "đỏ, xanh dương, xanh lá, vàng, hồng, đen, trắng." },
    { step: 2, title: "Shapes", titleVi: "Hình khối", detail: "circle, square, triangle, star, heart.", detailVi: "hình tròn, vuông, tam giác, ngôi sao, trái tim." },
    { step: 3, title: "Combine", titleVi: "Kết hợp", detail: "color + shape: 'a yellow star'.", detailVi: "màu + hình: 'a yellow star'." },
  ],
  illustratedRules: [
    { icon: "🔵", rule: "Color goes BEFORE the noun.", ruleVi: "Màu đứng TRƯỚC danh từ.", example: "a blue circle (NOT a circle blue)." },
    { icon: "⭐", rule: "Use 'a' before singular shapes.", ruleVi: "Dùng 'a' trước hình số ít.", example: "a star, a heart." },
  ],
  watchOut: [
    { mistake: "a circle red", mistakeVi: "a circle red", tip: "Say a red circle.", tipVi: "Nói a red circle." },
  ],
  vocabulary: [
    { word: "circle", meaning: "round shape", meaningVi: "hình tròn", example: "A circle is round." },
    { word: "square", meaning: "4 equal sides", meaningVi: "hình vuông", example: "A box is a square." },
    { word: "triangle", meaning: "3 sides", meaningVi: "tam giác", example: "A triangle has 3 sides." },
    { word: "star", meaning: "star shape", meaningVi: "ngôi sao", example: "I see a star." },
    { word: "heart", meaning: "heart shape", meaningVi: "trái tim", example: "I love hearts." },
    { word: "pink", meaning: "light red", meaningVi: "hồng", example: "I like pink." },
  ],
  quiz: [
    { question: "Which is correct?", options: ["a circle blue", "a blue circle", "blue a circle", "circle blue a"], answer: 1, explanation: "Color before noun." },
    { question: "A shape with 3 sides is a ___.", options: ["circle", "square", "triangle", "star"], answer: 2, explanation: "3 sides = triangle." },
    { question: "The sun is ___.", options: ["green", "yellow", "pink", "black"], answer: 1, explanation: "The sun looks yellow." },
    { question: "❤️ is a ___.", options: ["star", "heart", "circle", "square"], answer: 1, explanation: "Heart shape." },
  ],
});

const startersToysGames = mk({
  id: "cam-starters-toys-games",
  title: "Toys & Games",
  titleVi: "Đồ chơi & Trò chơi",
  level: "starters",
  skill: "speaking",
  icon: "🧸",
  description: "Talk about favourite toys and games: 'I have a doll', 'I like trains'.",
  descriptionVi: "Nói về đồ chơi và trò chơi yêu thích: 'I have a doll', 'I like trains'.",
  illustrationKey: "starters",
  stepByStep: [
    { step: 1, title: "Toy words", titleVi: "Từ đồ chơi", detail: "doll, ball, kite, train, robot, teddy bear.", detailVi: "búp bê, bóng, diều, tàu, robot, gấu bông." },
    { step: 2, title: "Verbs", titleVi: "Động từ", detail: "have, play, like.", detailVi: "có, chơi, thích." },
    { step: 3, title: "Make a sentence", titleVi: "Đặt câu", detail: "'I have a kite. I like it.'", detailVi: "'I have a kite. I like it.'" },
  ],
  illustratedRules: [
    { icon: "🎈", rule: "Use 'have' for possession.", ruleVi: "Dùng 'have' để chỉ sở hữu.", example: "I have a ball." },
    { icon: "🎮", rule: "Use 'play with' + toy.", ruleVi: "Dùng 'play with' + đồ chơi.", example: "I play with my robot." },
  ],
  watchOut: [
    { mistake: "I play robot.", mistakeVi: "I play robot.", tip: "Say I play with my robot.", tipVi: "Nói I play with my robot." },
  ],
  vocabulary: [
    { word: "doll", meaning: "toy person", meaningVi: "búp bê", example: "My doll is pretty." },
    { word: "kite", meaning: "flies in wind", meaningVi: "diều", example: "I fly a kite." },
    { word: "train", meaning: "toy train", meaningVi: "tàu hoả đồ chơi", example: "The train is fast." },
    { word: "robot", meaning: "toy robot", meaningVi: "robot", example: "My robot can walk." },
    { word: "teddy bear", meaning: "soft bear toy", meaningVi: "gấu bông", example: "I hug my teddy bear." },
    { word: "play", meaning: "have fun with", meaningVi: "chơi", example: "I play with friends." },
  ],
  quiz: [
    { question: "I ___ a doll.", options: ["am", "have", "do", "go"], answer: 1, explanation: "have for possession." },
    { question: "I play ___ my robot.", options: ["on", "with", "to", "from"], answer: 1, explanation: "play with + toy." },
    { question: "A ___ flies in the sky.", options: ["doll", "kite", "ball", "train"], answer: 1, explanation: "Kite flies." },
    { question: "Soft bear toy is a ___.", options: ["robot", "teddy bear", "kite", "doll"], answer: 1, explanation: "Teddy bear." },
  ],
});

const startersFoodDrinks = mk({
  id: "cam-starters-food-drinks",
  title: "Food & Drinks I Like",
  titleVi: "Đồ ăn & Thức uống mình thích",
  level: "starters",
  skill: "reading-writing",
  icon: "🍎",
  description: "Use 'I like / I don't like' with food and drinks.",
  descriptionVi: "Dùng 'I like / I don't like' với đồ ăn và thức uống.",
  illustrationKey: "starters",
  stepByStep: [
    { step: 1, title: "Food", titleVi: "Đồ ăn", detail: "rice, bread, apple, banana, cake, fish.", detailVi: "cơm, bánh mì, táo, chuối, bánh, cá." },
    { step: 2, title: "Drinks", titleVi: "Thức uống", detail: "water, milk, juice, tea.", detailVi: "nước, sữa, nước ép, trà." },
    { step: 3, title: "Like / don't like", titleVi: "Thích / không thích", detail: "'I like milk. I don't like tea.'", detailVi: "'I like milk. I don't like tea.'" },
  ],
  illustratedRules: [
    { icon: "🥛", rule: "Use don't with I/you/we/they.", ruleVi: "Dùng don't với I/you/we/they.", example: "I don't like fish." },
    { icon: "🍰", rule: "Food + I like ___.", ruleVi: "Đồ ăn + I like ___.", example: "I like cake." },
  ],
  watchOut: [
    { mistake: "I no like cake.", mistakeVi: "I no like cake.", tip: "Use don't: I don't like cake.", tipVi: "Dùng don't: I don't like cake." },
  ],
  vocabulary: [
    { word: "rice", meaning: "food from a plant", meaningVi: "cơm", example: "I eat rice." },
    { word: "bread", meaning: "baked food", meaningVi: "bánh mì", example: "I like bread." },
    { word: "milk", meaning: "white drink", meaningVi: "sữa", example: "I drink milk." },
    { word: "juice", meaning: "fruit drink", meaningVi: "nước ép", example: "Orange juice is sweet." },
    { word: "cake", meaning: "sweet dessert", meaningVi: "bánh ngọt", example: "Birthday cake!" },
    { word: "tea", meaning: "hot leaf drink", meaningVi: "trà", example: "Mum drinks tea." },
  ],
  quiz: [
    { question: "I ___ like fish.", options: ["no", "not", "don't", "doesn't"], answer: 2, explanation: "I + don't." },
    { question: "Orange ___ is a drink.", options: ["cake", "juice", "rice", "bread"], answer: 1, explanation: "Juice." },
    { question: "Birthday ___ is sweet.", options: ["fish", "rice", "cake", "tea"], answer: 2, explanation: "Cake." },
    { question: "White drink from cows:", options: ["water", "milk", "juice", "tea"], answer: 1, explanation: "Milk." },
  ],
});

// ====================== MOVERS ======================
const moversHouseRooms = mk({
  id: "cam-movers-house-rooms",
  title: "My House & Rooms",
  titleVi: "Nhà & các phòng của mình",
  level: "movers",
  skill: "vocabulary",
  icon: "🏠",
  description: "Describe rooms and what is in them using 'there is / there are'.",
  descriptionVi: "Mô tả phòng và đồ vật bên trong dùng 'there is / there are'.",
  illustrationKey: "movers",
  stepByStep: [
    { step: 1, title: "Rooms", titleVi: "Các phòng", detail: "kitchen, bedroom, bathroom, living room, garden.", detailVi: "bếp, phòng ngủ, phòng tắm, phòng khách, vườn." },
    { step: 2, title: "Furniture", titleVi: "Đồ nội thất", detail: "sofa, table, bed, fridge, cupboard.", detailVi: "ghế dài, bàn, giường, tủ lạnh, tủ." },
    { step: 3, title: "Use there is/are", titleVi: "Dùng there is/are", detail: "There is a sofa. There are two beds.", detailVi: "There is a sofa. There are two beds." },
  ],
  illustratedRules: [
    { icon: "🛋️", rule: "Singular → there is.", ruleVi: "Số ít → there is.", example: "There is a TV." },
    { icon: "🛏️", rule: "Plural → there are.", ruleVi: "Số nhiều → there are.", example: "There are 3 chairs." },
  ],
  watchOut: [
    { mistake: "There are a chair.", mistakeVi: "There are a chair.", tip: "Singular: There is a chair.", tipVi: "Số ít: There is a chair." },
  ],
  vocabulary: [
    { word: "kitchen", meaning: "room to cook", meaningVi: "bếp", example: "Mum cooks in the kitchen." },
    { word: "bedroom", meaning: "room to sleep", meaningVi: "phòng ngủ", example: "My bedroom is small." },
    { word: "bathroom", meaning: "room to wash", meaningVi: "phòng tắm", example: "The bathroom is upstairs." },
    { word: "living room", meaning: "room to relax", meaningVi: "phòng khách", example: "We watch TV in the living room." },
    { word: "fridge", meaning: "cold food box", meaningVi: "tủ lạnh", example: "Milk is in the fridge." },
    { word: "cupboard", meaning: "storage", meaningVi: "tủ chứa", example: "Cups are in the cupboard." },
  ],
  quiz: [
    { question: "We cook food in the ___.", options: ["bedroom", "kitchen", "bathroom", "garden"], answer: 1, explanation: "Kitchen." },
    { question: "There ___ two beds.", options: ["is", "are", "be", "am"], answer: 1, explanation: "Plural → are." },
    { question: "Milk is in the ___.", options: ["fridge", "sofa", "table", "bed"], answer: 0, explanation: "Fridge keeps food cold." },
    { question: "There ___ a sofa.", options: ["is", "are", "have", "has"], answer: 0, explanation: "Singular → is." },
  ],
});

const moversDailyRoutine = mk({
  id: "cam-movers-daily-routine",
  title: "My Daily Routine",
  titleVi: "Lịch sinh hoạt hằng ngày",
  level: "movers",
  skill: "reading-writing",
  icon: "⏰",
  description: "Talk about daily actions with time expressions (at 7 am, in the morning).",
  descriptionVi: "Nói về hoạt động hằng ngày kèm thời gian (at 7 am, in the morning).",
  illustrationKey: "movers",
  stepByStep: [
    { step: 1, title: "Verbs", titleVi: "Động từ", detail: "wake up, brush teeth, eat, go to school, study, sleep.", detailVi: "thức dậy, đánh răng, ăn, đi học, học, ngủ." },
    { step: 2, title: "Time", titleVi: "Thời gian", detail: "at 7 am / in the morning / in the evening.", detailVi: "lúc 7h sáng / buổi sáng / buổi tối." },
    { step: 3, title: "Order", titleVi: "Thứ tự", detail: "First, then, after that, finally.", detailVi: "Đầu tiên, sau đó, sau đó nữa, cuối cùng." },
  ],
  illustratedRules: [
    { icon: "🕖", rule: "Use 'at + clock time'.", ruleVi: "Dùng 'at + giờ'.", example: "at 7 o'clock" },
    { icon: "🌅", rule: "Use 'in + part of the day'.", ruleVi: "Dùng 'in + buổi trong ngày'.", example: "in the morning" },
  ],
  watchOut: [
    { mistake: "I wake up in 7 am.", mistakeVi: "I wake up in 7 am.", tip: "Use 'at 7 am'.", tipVi: "Dùng 'at 7 am'." },
  ],
  vocabulary: [
    { word: "wake up", meaning: "stop sleeping", meaningVi: "thức dậy", example: "I wake up at 6." },
    { word: "brush", meaning: "clean with a brush", meaningVi: "đánh / chải", example: "Brush your teeth." },
    { word: "routine", meaning: "regular activity", meaningVi: "thói quen hằng ngày", example: "My routine is simple." },
    { word: "then", meaning: "after that", meaningVi: "sau đó", example: "Then I eat breakfast." },
    { word: "finally", meaning: "at the end", meaningVi: "cuối cùng", example: "Finally, I sleep." },
    { word: "evening", meaning: "after 6 pm", meaningVi: "buổi tối", example: "In the evening I read." },
  ],
  quiz: [
    { question: "I wake up ___ 6 am.", options: ["in", "on", "at", "to"], answer: 2, explanation: "at + clock time." },
    { question: "I study ___ the evening.", options: ["in", "on", "at", "by"], answer: 0, explanation: "in + part of day." },
    { question: "First wash, ___ eat.", options: ["finally", "then", "before", "now"], answer: 1, explanation: "then = sequence." },
    { question: "Clean your teeth → ___ your teeth.", options: ["wash", "brush", "open", "cut"], answer: 1, explanation: "Brush teeth." },
  ],
});

const moversHobbies = mk({
  id: "cam-movers-hobbies-freetime",
  title: "Hobbies & Free Time",
  titleVi: "Sở thích & Thời gian rảnh",
  level: "movers",
  skill: "speaking",
  icon: "🎨",
  description: "Ask and answer about hobbies using 'Do you like …?' and frequency adverbs.",
  descriptionVi: "Hỏi-đáp về sở thích bằng 'Do you like …?' và trạng từ tần suất.",
  illustrationKey: "movers",
  stepByStep: [
    { step: 1, title: "Hobby words", titleVi: "Từ sở thích", detail: "reading, painting, swimming, dancing, cooking.", detailVi: "đọc, vẽ, bơi, nhảy, nấu ăn." },
    { step: 2, title: "Frequency", titleVi: "Tần suất", detail: "always, usually, often, sometimes, never.", detailVi: "luôn luôn, thường, thường xuyên, đôi khi, không bao giờ." },
    { step: 3, title: "Ask & answer", titleVi: "Hỏi & đáp", detail: "Do you like painting? Yes, I sometimes paint.", detailVi: "Do you like painting? Yes, I sometimes paint." },
  ],
  illustratedRules: [
    { icon: "🎨", rule: "Hobby = verb + -ing.", ruleVi: "Sở thích = động từ + -ing.", example: "I love swimming." },
    { icon: "🔁", rule: "Frequency adverb before main verb.", ruleVi: "Trạng từ tần suất đứng trước động từ chính.", example: "I often read." },
  ],
  watchOut: [
    { mistake: "I read often.", mistakeVi: "I read often.", tip: "Adverb before verb: I often read.", tipVi: "Trạng từ trước động từ: I often read." },
  ],
  vocabulary: [
    { word: "hobby", meaning: "fun free-time activity", meaningVi: "sở thích", example: "Painting is my hobby." },
    { word: "swimming", meaning: "moving in water", meaningVi: "bơi lội", example: "I love swimming." },
    { word: "dancing", meaning: "moving to music", meaningVi: "nhảy múa", example: "She is dancing." },
    { word: "always", meaning: "100% time", meaningVi: "luôn luôn", example: "I always read at night." },
    { word: "sometimes", meaning: "now and then", meaningVi: "đôi khi", example: "Sometimes I cook." },
    { word: "never", meaning: "0% time", meaningVi: "không bao giờ", example: "I never sing." },
  ],
  quiz: [
    { question: "Choose the correct hobby form:", options: ["I like swim.", "I like swimming.", "I like to swim it.", "I like swims."], answer: 1, explanation: "verb + -ing." },
    { question: "Frequency adverb position:", options: ["I read always.", "I always read.", "Always I read.", "Read I always."], answer: 1, explanation: "Before main verb." },
    { question: "100% of the time =", options: ["sometimes", "never", "always", "rarely"], answer: 2, explanation: "always." },
    { question: "Question form:", options: ["You like dancing?", "Do you like dancing?", "Like you dancing?", "Are you dancing like?"], answer: 1, explanation: "Do + you + verb." },
  ],
});

// ====================== FLYERS ======================
const flyersNatureEnv = mk({
  id: "cam-flyers-nature-environment",
  title: "Nature & Environment",
  titleVi: "Thiên nhiên & Môi trường",
  level: "flyers",
  skill: "reading-writing",
  icon: "🌳",
  description: "Read short texts about nature; learn how to protect the environment.",
  descriptionVi: "Đọc văn bản ngắn về thiên nhiên; học cách bảo vệ môi trường.",
  illustrationKey: "flyers",
  stepByStep: [
    { step: 1, title: "Read", titleVi: "Đọc", detail: "Scan for key nouns (forest, river, plastic).", detailVi: "Lướt tìm danh từ chính (forest, river, plastic)." },
    { step: 2, title: "Verbs of action", titleVi: "Động từ hành động", detail: "recycle, reuse, save, protect.", detailVi: "tái chế, tái sử dụng, tiết kiệm, bảo vệ." },
    { step: 3, title: "Write a tip", titleVi: "Viết một lời khuyên", detail: "We should recycle paper.", detailVi: "We should recycle paper." },
  ],
  illustratedRules: [
    { icon: "♻️", rule: "Use 'should + verb' for advice.", ruleVi: "Dùng 'should + verb' để khuyên.", example: "We should save water." },
    { icon: "🌍", rule: "Countable plural: 'animals are' / uncountable: 'water is'.", ruleVi: "Số nhiều: 'animals are' / không đếm: 'water is'.", example: "Animals are important." },
  ],
  watchOut: [
    { mistake: "We should to recycle.", mistakeVi: "We should to recycle.", tip: "After should → bare verb: should recycle.", tipVi: "Sau should → động từ nguyên: should recycle." },
  ],
  vocabulary: [
    { word: "recycle", meaning: "use again", meaningVi: "tái chế", example: "Recycle paper." },
    { word: "pollution", meaning: "dirty air/water", meaningVi: "ô nhiễm", example: "Stop pollution!" },
    { word: "protect", meaning: "keep safe", meaningVi: "bảo vệ", example: "Protect the forest." },
    { word: "plastic", meaning: "man-made material", meaningVi: "nhựa", example: "Avoid plastic bags." },
    { word: "save", meaning: "use less", meaningVi: "tiết kiệm", example: "Save water." },
    { word: "forest", meaning: "many trees", meaningVi: "rừng", example: "Forests give us air." },
  ],
  quiz: [
    { question: "We should ___ water.", options: ["save", "saved", "saving", "saves"], answer: 0, explanation: "should + bare verb." },
    { question: "Use less ___ bags.", options: ["wood", "plastic", "paper", "metal"], answer: 1, explanation: "Plastic bags pollute." },
    { question: "'Recycle' means…", options: ["throw away", "use again", "buy new", "burn"], answer: 1, explanation: "Recycle = reuse." },
    { question: "Animals ___ important.", options: ["is", "are", "be", "was"], answer: 1, explanation: "Plural noun → are." },
  ],
});

const flyersTechHome = mk({
  id: "cam-flyers-technology-home",
  title: "Technology at Home",
  titleVi: "Công nghệ trong nhà",
  level: "flyers",
  skill: "listening",
  icon: "💻",
  description: "Understand short conversations about devices: phone, tablet, computer, TV.",
  descriptionVi: "Hiểu hội thoại ngắn về thiết bị: điện thoại, máy tính bảng, máy tính, TV.",
  illustrationKey: "flyers",
  stepByStep: [
    { step: 1, title: "Devices", titleVi: "Thiết bị", detail: "phone, tablet, laptop, headphones, charger.", detailVi: "điện thoại, máy tính bảng, laptop, tai nghe, sạc." },
    { step: 2, title: "Actions", titleVi: "Hành động", detail: "turn on/off, charge, download, type, click.", detailVi: "bật/tắt, sạc, tải về, gõ, nhấp chuột." },
    { step: 3, title: "Listen", titleVi: "Nghe", detail: "Catch key noun + verb pair.", detailVi: "Bắt cặp danh từ + động từ chính." },
  ],
  illustratedRules: [
    { icon: "🔌", rule: "Phrasal verbs: turn on, turn off.", ruleVi: "Cụm động từ: turn on, turn off.", example: "Turn off the TV." },
    { icon: "🎧", rule: "'a pair of' headphones.", ruleVi: "'a pair of' headphones.", example: "a pair of headphones" },
  ],
  watchOut: [
    { mistake: "Open the TV.", mistakeVi: "Open the TV.", tip: "Say turn on the TV.", tipVi: "Nói turn on the TV." },
  ],
  vocabulary: [
    { word: "tablet", meaning: "small flat computer", meaningVi: "máy tính bảng", example: "I read on a tablet." },
    { word: "charge", meaning: "fill battery", meaningVi: "sạc", example: "Charge the phone." },
    { word: "headphones", meaning: "ear speakers", meaningVi: "tai nghe", example: "Wear headphones." },
    { word: "download", meaning: "get from internet", meaningVi: "tải về", example: "Download the app." },
    { word: "screen", meaning: "display", meaningVi: "màn hình", example: "The screen is big." },
    { word: "click", meaning: "press mouse", meaningVi: "nhấp chuột", example: "Click the button." },
  ],
  quiz: [
    { question: "Make the TV start: ___ it.", options: ["open", "turn on", "close", "click"], answer: 1, explanation: "Turn on for devices." },
    { question: "Battery is empty → ___ it.", options: ["save", "charge", "click", "type"], answer: 1, explanation: "Charge the battery." },
    { question: "Choose the device:", options: ["spoon", "tablet", "shoe", "hat"], answer: 1, explanation: "Tablet is a device." },
    { question: "'A pair of ___'.", options: ["screen", "headphones", "charger", "phone"], answer: 1, explanation: "Pair of headphones." },
  ],
});

const flyersCultures = mk({
  id: "cam-flyers-world-cultures",
  title: "World Cultures",
  titleVi: "Văn hoá thế giới",
  level: "flyers",
  skill: "reading-writing",
  icon: "🌏",
  description: "Compare festivals and food from different countries using comparatives.",
  descriptionVi: "So sánh lễ hội và món ăn các nước dùng cấu trúc so sánh.",
  illustrationKey: "flyers",
  stepByStep: [
    { step: 1, title: "Words", titleVi: "Từ vựng", detail: "festival, costume, traditional, country, capital.", detailVi: "lễ hội, trang phục, truyền thống, quốc gia, thủ đô." },
    { step: 2, title: "Comparatives", titleVi: "So sánh hơn", detail: "bigger, smaller, more colourful.", detailVi: "lớn hơn, nhỏ hơn, sặc sỡ hơn." },
    { step: 3, title: "Sentence", titleVi: "Đặt câu", detail: "Tet is more colourful than Halloween.", detailVi: "Tet is more colourful than Halloween." },
  ],
  illustratedRules: [
    { icon: "🎏", rule: "Short adj + -er. Long adj → more + adj.", ruleVi: "Tính từ ngắn + -er. Tính từ dài → more + adj.", example: "smaller / more interesting" },
    { icon: "🏯", rule: "Use 'than' for comparison.", ruleVi: "Dùng 'than' để so sánh.", example: "A is bigger than B." },
  ],
  watchOut: [
    { mistake: "more bigger", mistakeVi: "more bigger", tip: "Use ONLY -er or ONLY more, not both.", tipVi: "Chỉ dùng -er HOẶC more, không dùng cả hai." },
  ],
  vocabulary: [
    { word: "festival", meaning: "special celebration", meaningVi: "lễ hội", example: "Tet is a festival." },
    { word: "costume", meaning: "special clothes", meaningVi: "trang phục", example: "Halloween costume." },
    { word: "traditional", meaning: "old custom", meaningVi: "truyền thống", example: "Traditional food." },
    { word: "capital", meaning: "main city", meaningVi: "thủ đô", example: "Hanoi is the capital." },
    { word: "colourful", meaning: "many colors", meaningVi: "sặc sỡ", example: "A colourful parade." },
    { word: "compare", meaning: "look at differences", meaningVi: "so sánh", example: "Let's compare them." },
  ],
  quiz: [
    { question: "Comparative of 'big':", options: ["biger", "bigger", "more big", "biggest"], answer: 1, explanation: "Short adj → double + er." },
    { question: "Choose correct: 'Tet is ___ than Christmas.'", options: ["colourful", "more colourful", "more colourfuler", "colourfuler"], answer: 1, explanation: "Long adj → more + adj." },
    { question: "Capital of Vietnam:", options: ["HCM City", "Hanoi", "Hue", "Da Nang"], answer: 1, explanation: "Hanoi." },
    { question: "Special clothes for festival:", options: ["uniform", "costume", "pyjama", "raincoat"], answer: 1, explanation: "Costume." },
  ],
});

// ====================== KET ======================
const ketSignsNotices = mk({
  id: "cam-ket-signs-notices",
  title: "KET Reading - Signs & Notices",
  titleVi: "KET Đọc - Biển báo & Thông báo",
  level: "ket",
  skill: "reading-writing",
  icon: "🚦",
  description: "Decode short public signs by matching purpose and audience.",
  descriptionVi: "Giải mã biển báo công cộng ngắn bằng cách xác định mục đích và đối tượng.",
  illustrationKey: "ket",
  stepByStep: [
    { step: 1, title: "Spot the place", titleVi: "Xác định nơi", detail: "shop, station, school, hotel.", detailVi: "cửa hàng, ga, trường, khách sạn." },
    { step: 2, title: "Find verb", titleVi: "Tìm động từ", detail: "must, do not, please, only.", detailVi: "phải, không được, vui lòng, chỉ." },
    { step: 3, title: "Match meaning", titleVi: "Khớp nghĩa", detail: "Sign → 1 short sentence meaning.", detailVi: "Biển báo → 1 câu nghĩa ngắn." },
  ],
  illustratedRules: [
    { icon: "🚫", rule: "'No + V-ing' = forbidden.", ruleVi: "'No + V-ing' = cấm.", example: "No smoking." },
    { icon: "🅿️", rule: "'Only' restricts who/what.", ruleVi: "'Only' giới hạn ai/cái gì.", example: "Staff only." },
  ],
  watchOut: [
    { mistake: "Choose the option with the same words.", mistakeVi: "Chọn đáp án có từ giống biển báo.", tip: "Paraphrase wins - match meaning, not words.", tipVi: "Diễn đạt lại mới đúng - khớp nghĩa, không khớp từ." },
  ],
  vocabulary: [
    { word: "notice", meaning: "public message", meaningVi: "thông báo", example: "Read this notice." },
    { word: "entrance", meaning: "way in", meaningVi: "lối vào", example: "Use the side entrance." },
    { word: "exit", meaning: "way out", meaningVi: "lối ra", example: "Emergency exit." },
    { word: "forbidden", meaning: "not allowed", meaningVi: "bị cấm", example: "Smoking is forbidden." },
    { word: "available", meaning: "can be used", meaningVi: "có sẵn", example: "Free wifi available." },
    { word: "discount", meaning: "lower price", meaningVi: "giảm giá", example: "20% discount today." },
  ],
  quiz: [
    { question: "'Staff only.' means…", options: ["Anyone can enter.", "Only workers can enter.", "Closed for repair.", "Visitors welcome."], answer: 1, explanation: "Staff = workers only." },
    { question: "'No food or drink' means…", options: ["Eating is allowed.", "Drinking allowed.", "Don't eat or drink here.", "Free food here."], answer: 2, explanation: "Both are forbidden." },
    { question: "'20% off today' means…", options: ["Closed today.", "Discount today.", "20 items only.", "Sale tomorrow."], answer: 1, explanation: "Discount." },
    { question: "'Emergency exit' is the…", options: ["way in", "way out for danger", "office", "toilet"], answer: 1, explanation: "Exit for emergency." },
  ],
});

const ketShortMessage = mk({
  id: "cam-ket-short-message",
  title: "KET - Reading Short Messages",
  titleVi: "KET - Đọc tin nhắn ngắn",
  level: "ket",
  skill: "reading-writing",
  icon: "💬",
  description: "Identify the writer's purpose: invite, remind, ask, apologise.",
  descriptionVi: "Xác định mục đích người viết: mời, nhắc, hỏi, xin lỗi.",
  illustrationKey: "ket",
  stepByStep: [
    { step: 1, title: "Spot the verb", titleVi: "Bắt động từ", detail: "Would you like…? Don't forget…", detailVi: "Would you like…? Don't forget…" },
    { step: 2, title: "Identify purpose", titleVi: "Xác định mục đích", detail: "invite / remind / apologise / ask.", detailVi: "mời / nhắc / xin lỗi / hỏi." },
    { step: 3, title: "Match a paraphrase", titleVi: "Khớp diễn đạt lại", detail: "Choose the option that paraphrases the function.", detailVi: "Chọn đáp án diễn đạt lại chức năng câu." },
  ],
  illustratedRules: [
    { icon: "✉️", rule: "Would you like = invite.", ruleVi: "Would you like = mời.", example: "Would you like to come?" },
    { icon: "🙏", rule: "Sorry / I'm afraid = apologise.", ruleVi: "Sorry / I'm afraid = xin lỗi.", example: "Sorry I'm late." },
  ],
  watchOut: [
    { mistake: "Pick option with same noun.", mistakeVi: "Chọn đáp án trùng danh từ.", tip: "Focus on function verb instead.", tipVi: "Tập trung vào động từ chức năng." },
  ],
  vocabulary: [
    { word: "invite", meaning: "ask to come", meaningVi: "mời", example: "I invite you to my party." },
    { word: "remind", meaning: "help remember", meaningVi: "nhắc", example: "Remind me, please." },
    { word: "apologise", meaning: "say sorry", meaningVi: "xin lỗi", example: "I apologise for the delay." },
    { word: "suggest", meaning: "offer idea", meaningVi: "đề xuất", example: "I suggest a film." },
    { word: "confirm", meaning: "say it's true", meaningVi: "xác nhận", example: "Please confirm your seat." },
    { word: "postpone", meaning: "move to later", meaningVi: "hoãn", example: "We postpone the trip." },
  ],
  quiz: [
    { question: "'Would you like to join me for lunch?' →", options: ["a complaint", "an invitation", "an apology", "a warning"], answer: 1, explanation: "Would you like = invite." },
    { question: "'Don't forget the meeting!' →", options: ["reminder", "invitation", "apology", "thanks"], answer: 0, explanation: "Don't forget = remind." },
    { question: "'Sorry, I can't come.' →", options: ["confirm", "invite", "apologise", "agree"], answer: 2, explanation: "Sorry = apologise." },
    { question: "'Can you tell me the time?' →", options: ["ask", "order", "thank", "warn"], answer: 0, explanation: "Can you tell me = ask." },
  ],
});

const ketListeningMultiMatch = mk({
  id: "cam-ket-listening-multi-match",
  title: "KET Listening - Multi-match",
  titleVi: "KET Nghe - Nối thông tin",
  level: "ket",
  skill: "listening",
  icon: "🎧",
  description: "Match speakers to topics or items using keyword anchors.",
  descriptionVi: "Nối người nói với chủ đề/đồ vật dựa vào từ khoá neo.",
  illustrationKey: "ket",
  stepByStep: [
    { step: 1, title: "Pre-read options", titleVi: "Đọc đáp án trước", detail: "Underline a keyword per option.", detailVi: "Gạch một từ khoá cho từng đáp án." },
    { step: 2, title: "Listen for synonyms", titleVi: "Nghe đồng nghĩa", detail: "Speakers paraphrase, not repeat.", detailVi: "Người nói diễn đạt lại, không lặp y nguyên." },
    { step: 3, title: "Cross out used", titleVi: "Gạch đã dùng", detail: "Each option used once.", detailVi: "Mỗi đáp án dùng một lần." },
  ],
  illustratedRules: [
    { icon: "🔑", rule: "Listen for SYNONYMS, not exact words.", ruleVi: "Nghe TỪ ĐỒNG NGHĨA, không nghe từ y nguyên.", example: "'cheap' ↔ 'good value'." },
    { icon: "✏️", rule: "Cross out used options.", ruleVi: "Gạch các đáp án đã dùng.", example: "Avoid repeating answers." },
  ],
  watchOut: [
    { mistake: "Pick first option you hear.", mistakeVi: "Chọn ngay đáp án nghe được đầu tiên.", tip: "Wait for the speaker to finish.", tipVi: "Chờ người nói hết câu rồi chọn." },
  ],
  vocabulary: [
    { word: "match", meaning: "pair together", meaningVi: "ghép cặp", example: "Match the speaker to the topic." },
    { word: "synonym", meaning: "same meaning", meaningVi: "từ đồng nghĩa", example: "Big and large are synonyms." },
    { word: "paraphrase", meaning: "say differently", meaningVi: "diễn đạt lại", example: "Paraphrase the sentence." },
    { word: "anchor", meaning: "key clue", meaningVi: "neo từ khoá", example: "Use an anchor word." },
    { word: "distractor", meaning: "wrong but tempting", meaningVi: "đáp án gây nhiễu", example: "Watch the distractor." },
    { word: "category", meaning: "group", meaningVi: "nhóm", example: "Each category once." },
  ],
  quiz: [
    { question: "Best strategy first:", options: ["Listen blind", "Pre-read options", "Write everything", "Guess fast"], answer: 1, explanation: "Pre-read options." },
    { question: "Speakers usually use…", options: ["exact words", "synonyms", "numbers", "songs"], answer: 1, explanation: "Synonyms / paraphrase." },
    { question: "Each option is used…", options: ["never", "once", "twice", "3 times"], answer: 1, explanation: "Once." },
    { question: "When you've matched, ___ the option.", options: ["repeat", "circle and reuse", "cross out", "ignore"], answer: 2, explanation: "Cross out used options." },
  ],
});

// ====================== PET ======================
const petReadingGapped = mk({
  id: "cam-pet-reading-gapped-text",
  title: "PET Reading - Gapped Text",
  titleVi: "PET Đọc - Điền đoạn vào chỗ trống",
  level: "pet",
  skill: "reading-writing",
  icon: "🧩",
  description: "Choose the missing sentence to keep cohesion using reference and linkers.",
  descriptionVi: "Chọn câu còn thiếu để giữ mạch văn dựa vào từ tham chiếu và liên kết.",
  illustrationKey: "pet",
  stepByStep: [
    { step: 1, title: "Read full text", titleVi: "Đọc toàn văn", detail: "Get the main idea first.", detailVi: "Nắm ý chính trước." },
    { step: 2, title: "Check references", titleVi: "Kiểm tra từ thay thế", detail: "this, it, they, such, instead.", detailVi: "this, it, they, such, instead." },
    { step: 3, title: "Test the fit", titleVi: "Thử dán vào", detail: "Re-read before and after gap.", detailVi: "Đọc lại trước và sau chỗ trống." },
  ],
  illustratedRules: [
    { icon: "🔗", rule: "Reference words point backward.", ruleVi: "Từ tham chiếu trỏ về phía trước.", example: "'This' refers to previous noun." },
    { icon: "➡️", rule: "Linkers signal logic: however, therefore.", ruleVi: "Từ nối báo hiệu logic: however, therefore.", example: "However = contrast." },
  ],
  watchOut: [
    { mistake: "Choose options just for shared words.", mistakeVi: "Chọn đáp án chỉ vì trùng từ.", tip: "Match the logic, not the keyword.", tipVi: "Khớp logic, không khớp từ khoá." },
  ],
  vocabulary: [
    { word: "cohesion", meaning: "ideas connect", meaningVi: "tính liên kết", example: "Good cohesion = smooth text." },
    { word: "reference", meaning: "back-pointing word", meaningVi: "từ tham chiếu", example: "'It' is a reference." },
    { word: "linker", meaning: "connecting word", meaningVi: "từ nối", example: "However is a linker." },
    { word: "paragraph", meaning: "block of text", meaningVi: "đoạn văn", example: "Open new paragraph." },
    { word: "topic sentence", meaning: "main idea sentence", meaningVi: "câu chủ đề", example: "Topic sentence first." },
    { word: "summary", meaning: "short main idea", meaningVi: "tóm tắt", example: "Write a summary." },
  ],
  quiz: [
    { question: "Reference 'this' usually points…", options: ["forward", "backward", "nowhere", "to the title"], answer: 1, explanation: "Backward to previous noun." },
    { question: "Linker for contrast:", options: ["because", "therefore", "however", "and"], answer: 2, explanation: "However = contrast." },
    { question: "First step in gapped text:", options: ["read full text", "guess gaps", "translate", "skip to last"], answer: 0, explanation: "Read full text for gist." },
    { question: "Best test before locking answer:", options: ["coin flip", "re-read around gap", "ask friend", "count words"], answer: 1, explanation: "Re-read around the gap." },
  ],
});

const petWritingStory = mk({
  id: "cam-pet-writing-story",
  title: "PET Writing - Short Story",
  titleVi: "PET Viết - Truyện ngắn",
  level: "pet",
  skill: "reading-writing",
  icon: "📖",
  description: "Plan and write a 100-word story with past tenses and varied linkers.",
  descriptionVi: "Lên ý và viết truyện ngắn ~100 từ với thì quá khứ và từ nối đa dạng.",
  illustrationKey: "pet",
  stepByStep: [
    { step: 1, title: "Plan 3 beats", titleVi: "Lên 3 nhịp truyện", detail: "Setting → Problem → Resolution.", detailVi: "Bối cảnh → Vấn đề → Giải quyết." },
    { step: 2, title: "Mix tenses", titleVi: "Pha trộn thì", detail: "Past simple + past continuous + past perfect (1×).", detailVi: "Quá khứ đơn + tiếp diễn + hoàn thành (1 lần)." },
    { step: 3, title: "Linkers", titleVi: "Từ nối", detail: "suddenly, then, after that, in the end.", detailVi: "suddenly, then, after that, in the end." },
  ],
  illustratedRules: [
    { icon: "🕰️", rule: "Background = past continuous; main event = past simple.", ruleVi: "Bối cảnh = quá khứ tiếp diễn; sự kiện chính = quá khứ đơn.", example: "I was walking when I saw…" },
    { icon: "✨", rule: "Use ONE strong adjective per sentence.", ruleVi: "Mỗi câu nên có MỘT tính từ mạnh.", example: "a sudden noise" },
  ],
  watchOut: [
    { mistake: "Mix present and past randomly.", mistakeVi: "Trộn hiện tại và quá khứ lung tung.", tip: "Stay consistent in past.", tipVi: "Giữ nhất quán ở quá khứ." },
  ],
  vocabulary: [
    { word: "plot", meaning: "story line", meaningVi: "cốt truyện", example: "A simple plot." },
    { word: "setting", meaning: "place + time", meaningVi: "bối cảnh", example: "Set in 1990 Hanoi." },
    { word: "character", meaning: "person in story", meaningVi: "nhân vật", example: "Main character." },
    { word: "suddenly", meaning: "very quickly", meaningVi: "đột nhiên", example: "Suddenly it rained." },
    { word: "finally", meaning: "at the end", meaningVi: "cuối cùng", example: "Finally, she smiled." },
    { word: "amazing", meaning: "very surprising", meaningVi: "tuyệt vời", example: "An amazing trip." },
  ],
  quiz: [
    { question: "Background tense:", options: ["present simple", "past simple", "past continuous", "future"], answer: 2, explanation: "Past continuous for background." },
    { question: "Story shock word:", options: ["finally", "suddenly", "always", "usually"], answer: 1, explanation: "Suddenly = unexpected." },
    { question: "Main event tense:", options: ["past simple", "present simple", "present continuous", "future"], answer: 0, explanation: "Past simple for events." },
    { question: "Story structure:", options: ["A → A → A", "Setting → Problem → Resolution", "Random", "End → Middle → Start"], answer: 1, explanation: "3-beat structure." },
  ],
});

const petListeningPart1 = mk({
  id: "cam-pet-listening-part1-short",
  title: "PET Listening Part 1 - Pictures",
  titleVi: "PET Nghe Phần 1 - Hình ảnh",
  level: "pet",
  skill: "listening",
  icon: "🖼️",
  description: "Pick the right picture by tracking the speaker's final decision.",
  descriptionVi: "Chọn đúng tranh bằng cách theo dõi quyết định cuối của người nói.",
  illustrationKey: "pet",
  stepByStep: [
    { step: 1, title: "Pre-look", titleVi: "Xem tranh trước", detail: "Note differences between pictures.", detailVi: "Ghi nhớ điểm khác nhau giữa các tranh." },
    { step: 2, title: "Listen twice", titleVi: "Nghe 2 lần", detail: "1st = gist, 2nd = final choice.", detailVi: "Lần 1 = ý chính, lần 2 = quyết định cuối." },
    { step: 3, title: "Trap-aware", titleVi: "Tránh bẫy", detail: "Speaker may mention all options.", detailVi: "Người nói có thể nhắc cả 3 tranh." },
  ],
  illustratedRules: [
    { icon: "🎯", rule: "Final answer = speaker's last decision.", ruleVi: "Đáp án cuối = quyết định cuối cùng.", example: "'Actually, I'll take the blue one.'" },
    { icon: "⚠️", rule: "Words for change: but, actually, instead.", ruleVi: "Từ báo đổi ý: but, actually, instead.", example: "But I changed my mind." },
  ],
  watchOut: [
    { mistake: "Lock answer at first option heard.", mistakeVi: "Chốt đáp án ngay khi nghe lựa chọn đầu.", tip: "Wait for 'actually/but/instead' twists.", tipVi: "Chờ chữ đảo: actually/but/instead." },
  ],
  vocabulary: [
    { word: "actually", meaning: "in fact, after thought", meaningVi: "thật ra", example: "Actually, no." },
    { word: "instead", meaning: "in place of", meaningVi: "thay vào đó", example: "Tea instead of coffee." },
    { word: "decide", meaning: "make a choice", meaningVi: "quyết định", example: "I decided to go." },
    { word: "change mind", meaning: "decide differently", meaningVi: "đổi ý", example: "I changed my mind." },
    { word: "prefer", meaning: "like better", meaningVi: "thích hơn", example: "I prefer tea." },
    { word: "option", meaning: "a choice", meaningVi: "lựa chọn", example: "Three options." },
  ],
  quiz: [
    { question: "Final answer means…", options: ["first idea mentioned", "loudest option", "last decision spoken", "longest sentence"], answer: 2, explanation: "Last decision spoken." },
    { question: "Twist word example:", options: ["and", "actually", "with", "then"], answer: 1, explanation: "Actually = change of mind." },
    { question: "Best pre-listen step:", options: ["close eyes", "compare pictures", "write story", "guess"], answer: 1, explanation: "Compare picture differences." },
    { question: "Number of times you hear PET Part 1:", options: ["once", "twice", "3 times", "4 times"], answer: 1, explanation: "Always twice." },
  ],
});

// === EXPORT (15 lectures, 3 per level) ===
export const cambridgeLecturesExpansion10: CambridgeLecture[] = [
  startersColorsShapes,
  startersToysGames,
  startersFoodDrinks,
  moversHouseRooms,
  moversDailyRoutine,
  moversHobbies,
  flyersNatureEnv,
  flyersTechHome,
  flyersCultures,
  ketSignsNotices,
  ketShortMessage,
  ketListeningMultiMatch,
  petReadingGapped,
  petWritingStory,
  petListeningPart1,
];
