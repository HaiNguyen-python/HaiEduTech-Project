import { CambridgeLecture } from "./cambridgeLecturesData";

// ==================== STARTERS ====================

const startersAnimals: CambridgeLecture = {
  id: "starters-animals-body",
  title: "Animals & Body Parts 🐾",
  level: "starters",
  skill: "reading",
  description: "Learn animal names and body parts — match words to pictures!",
  examPattern: "In the Reading & Writing test, you match words to pictures and write short answers about animals and body parts.",
  stepByStep: [
    { icon: "👀", title: "Look at the Picture", detail: "Look carefully at each animal or body part picture." },
    { icon: "📖", title: "Read the Word", detail: "Read the word next to or below the picture." },
    { icon: "✅", title: "Match or Write", detail: "Draw a line to match, or write the correct word." },
  ],
  illustratedRules: [
    { rule: "Animal words: cat, dog, bird, fish, horse, monkey, snake, frog", example: "This is a cat. It has four legs.", icon: "🐱" },
    { rule: "Body parts: head, arm, leg, hand, foot, eye, ear, mouth", example: "I have two eyes and one mouth.", icon: "🦵" },
    { rule: "Use 'a' or 'an' before singular nouns", example: "a dog, an elephant, a bird, an ant", icon: "📝" },
  ],
  watchOut: [
    { mistake: "foot → foots", correction: "foot → feet (irregular plural)", tip: "Some body parts have special plurals!" },
    { mistake: "a elephant", correction: "an elephant", tip: "Use 'an' before vowel sounds (a, e, i, o, u)." },
    { mistake: "Confusing 'arm' and 'hand'", correction: "Arm = long part, Hand = end part with fingers", tip: "Your hand is at the end of your arm." },
  ],
  practiceSet: [
    { question: "Look at the picture of a cat. Write the word: C _ _", options: ["cat", "cut", "cot", "kit"], correctIndex: 0, explanation: "The animal with whiskers and a tail is a cat." },
    { question: "How many legs does a bird have?", options: ["4", "2", "6", "8"], correctIndex: 1, explanation: "Birds have 2 legs." },
    { question: "Which body part do you use to see?", options: ["ear", "mouth", "eye", "hand"], correctIndex: 2, explanation: "We use our eyes to see things." },
  ],
  vocabulary: [
    { word: "elephant", phonetic: "/ˈelɪfənt/", meaning: "con voi", exampleSentence: "The elephant is very big." },
    { word: "giraffe", phonetic: "/dʒɪˈrɑːf/", meaning: "hươu cao cổ", exampleSentence: "A giraffe has a long neck." },
    { word: "shoulder", phonetic: "/ˈʃəʊldə/", meaning: "vai", exampleSentence: "I carry my bag on my shoulder." },
    { word: "knee", phonetic: "/niː/", meaning: "đầu gối", exampleSentence: "I hurt my knee when I fell." },
    { word: "tail", phonetic: "/teɪl/", meaning: "đuôi", exampleSentence: "The dog wags its tail." },
  ],
  quiz: [
    { question: "Which animal has a trunk?", options: ["dog", "elephant", "cat", "fish"], correctIndex: 1, explanation: "Elephants have long trunks." },
    { question: "Where are your fingers?", options: ["On your foot", "On your hand", "On your head", "On your leg"], correctIndex: 1, explanation: "Fingers are on your hands." },
    { question: "'A ___ has eight legs.' Choose the correct animal.", options: ["bird", "cat", "spider", "fish"], correctIndex: 2, explanation: "Spiders have eight legs." },
  ],
  parentInfo: "This lesson teaches children to identify animals and body parts in English, building foundational vocabulary for the Cambridge Starters exam.",
  parentInfoVi: "Bài học này dạy trẻ nhận biết tên động vật và bộ phận cơ thể bằng tiếng Anh, xây dựng vốn từ nền tảng cho kỳ thi Cambridge Starters.",
};

const startersFamily: CambridgeLecture = {
  id: "starters-family-friends",
  title: "My Family & Friends 👨‍👩‍👧‍👦",
  level: "starters",
  skill: "speaking",
  description: "Talk about your family and describe people using simple adjectives!",
  examPattern: "In the Speaking test, the examiner asks you about your family. You describe people using adjectives like big, small, old, young.",
  stepByStep: [
    { icon: "👋", title: "Say Hello", detail: "Greet the examiner and say your name." },
    { icon: "👨‍👩‍👧", title: "Name Family Members", detail: "Say: 'This is my mum / dad / brother / sister.'" },
    { icon: "😊", title: "Describe Them", detail: "Use adjectives: 'My dad is tall. My sister is young.'" },
  ],
  illustratedRules: [
    { rule: "Family words: mum, dad, brother, sister, grandma, grandpa", example: "This is my mum. Her name is Lisa.", icon: "👩" },
    { rule: "Adjectives for people: tall, short, old, young, happy, sad", example: "My grandpa is old. My brother is young.", icon: "📏" },
    { rule: "Use 'have got' to describe: I have got brown hair.", example: "She has got blue eyes.", icon: "👁️" },
  ],
  watchOut: [
    { mistake: "My father have got...", correction: "My father has got...", tip: "He/She/It → has got. I/You/We/They → have got." },
    { mistake: "She is tall hair", correction: "She has got long hair / She is tall", tip: "Don't mix 'is' (adjective) with 'has got' (possession)." },
    { mistake: "Forgetting 'a' in descriptions", correction: "She is a happy girl", tip: "Use 'a/an' + adjective + noun." },
  ],
  practiceSet: [
    { question: "Complete: 'My mum ___ got brown eyes.'", options: ["have", "has", "is", "are"], correctIndex: 1, explanation: "She → has got." },
    { question: "Which word means 'anh/chị em trai'?", options: ["sister", "brother", "father", "cousin"], correctIndex: 1, explanation: "Brother = anh/em trai." },
    { question: "Choose the correct sentence:", options: ["He is long hair", "He has got long hair", "He have long hair", "He got long hair"], correctIndex: 1, explanation: "'Has got' describes what someone possesses." },
  ],
  vocabulary: [
    { word: "cousin", phonetic: "/ˈkʌzn/", meaning: "anh chị em họ", exampleSentence: "My cousin lives in London." },
    { word: "uncle", phonetic: "/ˈʌŋkl/", meaning: "chú/bác/cậu", exampleSentence: "My uncle is very funny." },
    { word: "aunt", phonetic: "/ɑːnt/", meaning: "cô/dì/mợ", exampleSentence: "My aunt has got curly hair." },
    { word: "friendly", phonetic: "/ˈfrendli/", meaning: "thân thiện", exampleSentence: "My sister is very friendly." },
    { word: "curly", phonetic: "/ˈkɜːli/", meaning: "xoăn", exampleSentence: "I have got curly hair." },
  ],
  quiz: [
    { question: "Who is your mother's mother?", options: ["aunt", "sister", "grandma", "cousin"], correctIndex: 2, explanation: "Your mother's mother is your grandma." },
    { question: "'My brother ___ short.' Choose the correct word.", options: ["have", "has", "is", "are"], correctIndex: 2, explanation: "He IS short — use 'is' with adjectives." },
    { question: "What does 'young' mean?", options: ["già", "trẻ", "cao", "thấp"], correctIndex: 1, explanation: "Young = trẻ, opposite of old." },
  ],
  parentInfo: "This lesson helps children talk about their family in English, practising simple descriptions that appear in the Cambridge Starters Speaking test.",
  parentInfoVi: "Bài này giúp trẻ nói về gia đình bằng tiếng Anh, luyện mô tả đơn giản xuất hiện trong phần thi Nói của Cambridge Starters.",
};

const startersNumbers: CambridgeLecture = {
  id: "starters-numbers-counting",
  title: "Numbers & Counting to 20 🔢",
  level: "starters",
  skill: "listening",
  description: "Listen and write numbers — count from 1 to 20!",
  examPattern: "In the Listening test, you hear numbers and write them down. You also match quantities to pictures.",
  stepByStep: [
    { icon: "👂", title: "Listen Carefully", detail: "The speaker says a number. Listen and repeat it in your head." },
    { icon: "✏️", title: "Write the Number", detail: "Write the number you hear: as a digit (7) or a word (seven)." },
    { icon: "🔢", title: "Count Objects", detail: "Count objects in pictures and write how many." },
  ],
  illustratedRules: [
    { rule: "1-10: one, two, three, four, five, six, seven, eight, nine, ten", example: "I have five pencils.", icon: "✋" },
    { rule: "11-20: eleven, twelve, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, nineteen, twenty", example: "There are thirteen students.", icon: "🔟" },
    { rule: "How many...? → answer with a number", example: "How many cats? → Three cats.", icon: "❓" },
  ],
  watchOut: [
    { mistake: "Confusing thirteen (13) and thirty (30)", correction: "thir-TEEN = 13, THIR-ty = 30", tip: "Listen to the stress: -teen at the end vs -ty at the end." },
    { mistake: "Spelling 'eight' wrong", correction: "e-i-g-h-t (not 'eit' or 'ate')", tip: "Eight has a silent 'gh'." },
    { mistake: "Confusing 'fifteen' and 'fifty'", correction: "fif-TEEN = 15, FIF-ty = 50", tip: "Same trick: -teen = small number, -ty = big number." },
  ],
  practiceSet: [
    { question: "How do you spell the number 12?", options: ["twelf", "twelve", "twelv", "twellve"], correctIndex: 1, explanation: "12 = twelve (with 've' at the end)." },
    { question: "Listen: 'I have ___ apples.' (You hear 'seventeen'). Write the number.", options: ["7", "70", "17", "16"], correctIndex: 2, explanation: "Seventeen = 17." },
    { question: "How many fingers do you have on both hands?", options: ["eight", "ten", "twelve", "five"], correctIndex: 1, explanation: "We have 10 fingers on both hands." },
  ],
  vocabulary: [
    { word: "eleven", phonetic: "/ɪˈlevn/", meaning: "mười một", exampleSentence: "There are eleven players in a football team." },
    { word: "fourteen", phonetic: "/ˌfɔːˈtiːn/", meaning: "mười bốn", exampleSentence: "I am fourteen years old." },
    { word: "twenty", phonetic: "/ˈtwenti/", meaning: "hai mươi", exampleSentence: "There are twenty chairs in the classroom." },
    { word: "count", phonetic: "/kaʊnt/", meaning: "đếm", exampleSentence: "Can you count to twenty?" },
    { word: "number", phonetic: "/ˈnʌmbə/", meaning: "số", exampleSentence: "What number is this?" },
  ],
  quiz: [
    { question: "Which number comes after twelve?", options: ["eleven", "fourteen", "thirteen", "twenty"], correctIndex: 2, explanation: "12 → 13: twelve → thirteen." },
    { question: "How do you write '19' in words?", options: ["ninteen", "nineteen", "nineten", "ninteen"], correctIndex: 1, explanation: "19 = nineteen." },
    { question: "'How many books?' → 'There are ___.' (picture shows 16 books)", options: ["six", "sixty", "sixteen", "six teen"], correctIndex: 2, explanation: "16 = sixteen (one word)." },
  ],
  parentInfo: "This lesson teaches children to recognise and write numbers 1-20 in English, a key skill for the Cambridge Starters Listening test.",
  parentInfoVi: "Bài này dạy trẻ nhận biết và viết số 1-20 bằng tiếng Anh, kỹ năng quan trọng cho phần thi Nghe Cambridge Starters.",
};

// ==================== MOVERS ====================

const moversWeather: CambridgeLecture = {
  id: "movers-weather-seasons",
  title: "Weather & Seasons 🌦️",
  level: "movers",
  skill: "vocabulary",
  description: "Learn weather words, seasons, and how to talk about the weather!",
  examPattern: "Weather vocabulary appears in Listening and Speaking tests. You may need to describe weather in pictures or answer 'What's the weather like?'",
  stepByStep: [
    { icon: "🌤️", title: "Learn Weather Words", detail: "sunny, cloudy, rainy, windy, snowy, hot, cold, warm" },
    { icon: "🍂", title: "Know the Seasons", detail: "spring, summer, autumn (fall), winter" },
    { icon: "💬", title: "Answer Questions", detail: "What's the weather like? → It's sunny and hot." },
  ],
  illustratedRules: [
    { rule: "Weather question: 'What's the weather like today?'", example: "It's cloudy and cold today.", icon: "☁️" },
    { rule: "Seasons + weather: Spring → warm, Summer → hot, Autumn → cool, Winter → cold", example: "In winter, it's cold and snowy.", icon: "❄️" },
    { rule: "Wear clothes for weather: coat, umbrella, sunglasses, boots", example: "It's raining. Take your umbrella!", icon: "🧥" },
  ],
  watchOut: [
    { mistake: "It's rain", correction: "It's rainy / It's raining", tip: "'Rain' is a noun/verb. Use 'rainy' as adjective or 'raining' as verb." },
    { mistake: "In the summer", correction: "In summer (British) / In the summer (American)", tip: "Both are correct, but Cambridge prefers 'in summer'." },
    { mistake: "It's very sunny and very cold (contradicting)", correction: "Choose matching descriptions", tip: "Make sure weather descriptions go together logically." },
  ],
  practiceSet: [
    { question: "What's the weather like? (picture: rain + clouds)", options: ["It's sunny", "It's rainy and cloudy", "It's snowy", "It's hot"], correctIndex: 1, explanation: "Rain + clouds = rainy and cloudy." },
    { question: "In which season do leaves fall from trees?", options: ["spring", "summer", "autumn", "winter"], correctIndex: 2, explanation: "Leaves fall in autumn." },
    { question: "It's very cold and white outside. It's ___.", options: ["raining", "sunny", "snowing", "windy"], correctIndex: 2, explanation: "Cold + white = snowing." },
  ],
  vocabulary: [
    { word: "cloudy", phonetic: "/ˈklaʊdi/", meaning: "nhiều mây", exampleSentence: "It's cloudy today. I can't see the sun." },
    { word: "windy", phonetic: "/ˈwɪndi/", meaning: "có gió", exampleSentence: "It's very windy. Hold your hat!" },
    { word: "spring", phonetic: "/sprɪŋ/", meaning: "mùa xuân", exampleSentence: "Flowers grow in spring." },
    { word: "umbrella", phonetic: "/ʌmˈbrelə/", meaning: "cái ô/dù", exampleSentence: "Don't forget your umbrella!" },
    { word: "temperature", phonetic: "/ˈtemprɪtʃə/", meaning: "nhiệt độ", exampleSentence: "The temperature is 30 degrees." },
  ],
  quiz: [
    { question: "Which season is the hottest?", options: ["winter", "autumn", "spring", "summer"], correctIndex: 3, explanation: "Summer is the hottest season." },
    { question: "'It's ___.' (picture: strong wind, trees bending)", options: ["sunny", "rainy", "windy", "snowy"], correctIndex: 2, explanation: "Trees bending = windy." },
    { question: "What do you wear when it rains?", options: ["sunglasses", "a raincoat", "shorts", "sandals"], correctIndex: 1, explanation: "We wear raincoats to stay dry in the rain." },
  ],
  parentInfo: "This lesson covers weather vocabulary and seasons, which frequently appear in Cambridge Movers Listening and Speaking tests.",
  parentInfoVi: "Bài này dạy từ vựng thời tiết và mùa, thường xuất hiện trong phần thi Nghe và Nói Cambridge Movers.",
};

const moversRoutines: CambridgeLecture = {
  id: "movers-daily-routines",
  title: "Daily Routines & Time ⏰",
  level: "movers",
  skill: "listening",
  description: "Learn to tell the time and describe your daily activities!",
  examPattern: "In Listening, you may hear times and match them to activities. In Speaking, you describe your daily routine.",
  stepByStep: [
    { icon: "⏰", title: "Tell the Time", detail: "o'clock, half past, quarter past, quarter to" },
    { icon: "📋", title: "Learn Routine Words", detail: "wake up, have breakfast, go to school, do homework, go to bed" },
    { icon: "🗣️", title: "Describe Your Day", detail: "I wake up at seven o'clock. I go to school at eight." },
  ],
  illustratedRules: [
    { rule: "Time patterns: 7:00 = seven o'clock, 7:30 = half past seven", example: "I have lunch at half past twelve.", icon: "🕐" },
    { rule: "Daily routine verbs: wake up, get dressed, brush teeth, eat, go, play, sleep", example: "I brush my teeth every morning.", icon: "🪥" },
    { rule: "Use 'at' with times: at 3 o'clock, at half past 6", example: "School starts at quarter past eight.", icon: "📍" },
  ],
  watchOut: [
    { mistake: "I wake up in 7 o'clock", correction: "I wake up at 7 o'clock", tip: "Always use 'at' with specific times." },
    { mistake: "I go to school on morning", correction: "I go to school in the morning", tip: "Use 'in the morning/afternoon/evening' but 'at night'." },
    { mistake: "half past to seven", correction: "half past seven", tip: "'Half past' already means 30 minutes after — no 'to' needed." },
  ],
  practiceSet: [
    { question: "What time is it? (clock shows 3:30)", options: ["three o'clock", "half past three", "quarter past three", "quarter to three"], correctIndex: 1, explanation: "3:30 = half past three." },
    { question: "Complete: 'I ___ breakfast at 7 o'clock.'", options: ["has", "have", "having", "had"], correctIndex: 1, explanation: "I have breakfast (present simple)." },
    { question: "What do you do before going to bed?", options: ["wake up", "go to school", "brush my teeth", "have lunch"], correctIndex: 2, explanation: "We brush our teeth before bed." },
  ],
  vocabulary: [
    { word: "quarter past", phonetic: "/ˈkwɔːtə pɑːst/", meaning: "giờ 15 phút", exampleSentence: "It's quarter past nine." },
    { word: "quarter to", phonetic: "/ˈkwɔːtə tuː/", meaning: "giờ kém 15", exampleSentence: "It's quarter to ten (9:45)." },
    { word: "breakfast", phonetic: "/ˈbrekfəst/", meaning: "bữa sáng", exampleSentence: "I have eggs for breakfast." },
    { word: "homework", phonetic: "/ˈhəʊmwɜːk/", meaning: "bài tập về nhà", exampleSentence: "I do my homework after school." },
    { word: "midnight", phonetic: "/ˈmɪdnaɪt/", meaning: "nửa đêm", exampleSentence: "I never stay up until midnight." },
  ],
  quiz: [
    { question: "9:15 in English is:", options: ["nine fifteen", "quarter past nine", "quarter to nine", "half past nine"], correctIndex: 1, explanation: "9:15 = quarter past nine." },
    { question: "Which activity do you do first in the morning?", options: ["go to bed", "have dinner", "wake up", "do homework"], correctIndex: 2, explanation: "Waking up is the first thing in the morning." },
    { question: "'I go to school ___ the morning.'", options: ["at", "on", "in", "to"], correctIndex: 2, explanation: "In the morning/afternoon/evening." },
  ],
  parentInfo: "This lesson teaches children to tell time and describe daily routines, skills tested in Cambridge Movers Listening and Speaking.",
  parentInfoVi: "Bài này dạy trẻ xem giờ và mô tả hoạt động hàng ngày, kỹ năng được kiểm tra trong phần Nghe và Nói Cambridge Movers.",
};

const moversAdjectives: CambridgeLecture = {
  id: "movers-adjective-comparatives",
  title: "Adjective Adventure — Comparatives 📏",
  level: "movers",
  skill: "reading",
  description: "Learn to compare things: bigger, smaller, faster, slower!",
  examPattern: "Reading & Writing tests include sentences comparing things. You need to understand and use comparative adjectives.",
  stepByStep: [
    { icon: "📏", title: "Basic Rule", detail: "Short adjectives: add -er → tall → taller, small → smaller" },
    { icon: "✨", title: "Spelling Changes", detail: "big → bigger (double consonant), happy → happier (y → ier)" },
    { icon: "🔄", title: "Use 'than'", detail: "A cat is smaller than a horse." },
  ],
  illustratedRules: [
    { rule: "Short adjectives (1 syllable): add -er", example: "fast → faster, old → older, tall → taller", icon: "➕" },
    { rule: "Adjectives ending in -y: change y to -ier", example: "happy → happier, easy → easier, funny → funnier", icon: "🔄" },
    { rule: "Always use 'than' to compare two things", example: "Dogs are friendlier than cats.", icon: "⚖️" },
  ],
  watchOut: [
    { mistake: "more tall", correction: "taller", tip: "Short adjectives don't use 'more' — just add -er." },
    { mistake: "biger", correction: "bigger", tip: "Double the final consonant: big → bigger, hot → hotter." },
    { mistake: "good → gooder", correction: "good → better", tip: "'Good → better' is irregular. Memorise it!" },
  ],
  practiceSet: [
    { question: "An elephant is ___ than a mouse.", options: ["big", "bigger", "more big", "biggest"], correctIndex: 1, explanation: "Comparing two things → bigger (comparative)." },
    { question: "Which is the comparative of 'happy'?", options: ["happyer", "more happy", "happier", "most happy"], correctIndex: 2, explanation: "Happy → happier (y changes to ier)." },
    { question: "Complete: 'Summer is ___ than winter.'", options: ["hot", "hoter", "hotter", "more hot"], correctIndex: 2, explanation: "Hot → hotter (double the 't')." },
  ],
  vocabulary: [
    { word: "taller", phonetic: "/ˈtɔːlə/", meaning: "cao hơn", exampleSentence: "My dad is taller than my mum." },
    { word: "faster", phonetic: "/ˈfɑːstə/", meaning: "nhanh hơn", exampleSentence: "A cheetah is faster than a lion." },
    { word: "better", phonetic: "/ˈbetə/", meaning: "tốt hơn", exampleSentence: "This book is better than that one." },
    { word: "worse", phonetic: "/wɜːs/", meaning: "tệ hơn", exampleSentence: "The weather today is worse than yesterday." },
    { word: "easier", phonetic: "/ˈiːziə/", meaning: "dễ hơn", exampleSentence: "Maths is easier than science for me." },
  ],
  quiz: [
    { question: "What is the comparative of 'strong'?", options: ["more strong", "stronger", "strongest", "strengther"], correctIndex: 1, explanation: "Strong → stronger (add -er)." },
    { question: "'Bad' → '___' (comparative)", options: ["badder", "more bad", "worse", "bader"], correctIndex: 2, explanation: "Bad → worse (irregular)." },
    { question: "A snail is ___ than a rabbit.", options: ["slower", "more slow", "slowest", "slow"], correctIndex: 0, explanation: "Slow → slower. A snail is slower than a rabbit." },
  ],
  parentInfo: "This lesson teaches comparative adjectives, a key grammar point in Cambridge Movers Reading & Writing tests.",
  parentInfoVi: "Bài này dạy tính từ so sánh hơn, điểm ngữ pháp quan trọng trong phần Đọc & Viết Cambridge Movers.",
};

// ==================== FLYERS ====================

const flyersPastTense: CambridgeLecture = {
  id: "flyers-past-tense-stories",
  title: "Past Tense Stories 📖",
  level: "flyers",
  skill: "reading",
  description: "Read stories with past tense verbs — regular and irregular!",
  examPattern: "Reading & Writing tests include stories in the past tense. You need to choose the correct past tense form.",
  stepByStep: [
    { icon: "📘", title: "Regular Past Tense", detail: "Add -ed: walked, played, watched, cleaned" },
    { icon: "⚡", title: "Irregular Past Tense", detail: "Memorise: go → went, eat → ate, see → saw, have → had" },
    { icon: "📝", title: "Read and Choose", detail: "Read the story and pick the correct past tense verb." },
  ],
  illustratedRules: [
    { rule: "Regular verbs: add -ed", example: "play → played, watch → watched, clean → cleaned", icon: "✏️" },
    { rule: "Verbs ending in -e: just add -d", example: "like → liked, live → lived, dance → danced", icon: "💃" },
    { rule: "Common irregular verbs: go→went, see→saw, eat→ate, have→had, make→made", example: "Yesterday I went to the park and saw a bird.", icon: "⚡" },
  ],
  watchOut: [
    { mistake: "I goed to school", correction: "I went to school", tip: "'Go' is irregular: go → went." },
    { mistake: "She eated pizza", correction: "She ate pizza", tip: "'Eat' is irregular: eat → ate." },
    { mistake: "We plaied football", correction: "We played football", tip: "Play ends in a vowel + y, so just add -ed (not -ied)." },
  ],
  practiceSet: [
    { question: "Yesterday, I ___ to the shops. (go)", options: ["goed", "gone", "went", "goes"], correctIndex: 2, explanation: "Go → went (irregular past tense)." },
    { question: "She ___ a beautiful painting. (make)", options: ["maked", "made", "making", "makes"], correctIndex: 1, explanation: "Make → made (irregular)." },
    { question: "We ___ TV after dinner. (watch)", options: ["watched", "watchd", "watches", "watching"], correctIndex: 0, explanation: "Watch → watched (regular: add -ed)." },
  ],
  vocabulary: [
    { word: "went", phonetic: "/went/", meaning: "đã đi", exampleSentence: "We went to the beach last summer." },
    { word: "saw", phonetic: "/sɔː/", meaning: "đã thấy", exampleSentence: "I saw a rainbow yesterday." },
    { word: "ate", phonetic: "/eɪt/", meaning: "đã ăn", exampleSentence: "She ate pasta for lunch." },
    { word: "bought", phonetic: "/bɔːt/", meaning: "đã mua", exampleSentence: "He bought a new book." },
    { word: "thought", phonetic: "/θɔːt/", meaning: "đã nghĩ", exampleSentence: "I thought the film was great." },
  ],
  quiz: [
    { question: "What is the past of 'swim'?", options: ["swimmed", "swam", "swum", "swimming"], correctIndex: 1, explanation: "Swim → swam (past simple)." },
    { question: "'We ___ a great time at the party.' (have)", options: ["haved", "has", "had", "having"], correctIndex: 2, explanation: "Have → had." },
    { question: "'She ___ a letter to her friend.' (write)", options: ["writed", "wrote", "written", "writing"], correctIndex: 1, explanation: "Write → wrote (irregular)." },
  ],
  parentInfo: "This lesson covers past simple tense with both regular and irregular verbs, essential for the Cambridge Flyers Reading & Writing test.",
  parentInfoVi: "Bài này dạy thì quá khứ đơn với động từ có quy tắc và bất quy tắc, cần thiết cho phần thi Đọc & Viết Cambridge Flyers.",
};

const flyersDirections: CambridgeLecture = {
  id: "flyers-giving-directions",
  title: "Giving Directions 🗺️",
  level: "flyers",
  skill: "speaking",
  description: "Learn to give and follow directions using a map!",
  examPattern: "In Speaking and Listening tests, you may describe routes on a map or follow spoken directions.",
  stepByStep: [
    { icon: "🚶", title: "Start Position", detail: "Say where you are: 'You are at the school.'" },
    { icon: "➡️", title: "Give Steps", detail: "Go straight, turn left, turn right, go past the..." },
    { icon: "🏁", title: "Reach Destination", detail: "It's on your left / right / next to the park." },
  ],
  illustratedRules: [
    { rule: "Direction words: left, right, straight on, past, between, next to, opposite", example: "Go straight on and turn left at the library.", icon: "🧭" },
    { rule: "Prepositions of place: on the corner, opposite the shop, between the bank and the café", example: "The hospital is opposite the park.", icon: "📍" },
    { rule: "Ordinal directions: Take the first/second/third turning on the left/right", example: "Take the second turning on the right.", icon: "🔢" },
  ],
  watchOut: [
    { mistake: "Go to left", correction: "Turn left / Go left", tip: "Don't use 'to' with left/right directions." },
    { mistake: "It's in the corner", correction: "It's on the corner", tip: "Use 'on the corner' for locations on a street corner." },
    { mistake: "Go straight and after turn right", correction: "Go straight and then turn right", tip: "Use 'then' to connect direction steps." },
  ],
  practiceSet: [
    { question: "Complete: '___ straight on and ___ left at the library.'", options: ["Go / turn", "Walk / go", "Turn / go", "Go / going"], correctIndex: 0, explanation: "Go straight on and turn left." },
    { question: "The cinema is ___ the bank and the restaurant.", options: ["next", "between", "opposite", "behind"], correctIndex: 1, explanation: "Between = ở giữa hai nơi." },
    { question: "'Take the first turning on the ___.' (you need to go right)", options: ["straight", "left", "right", "past"], correctIndex: 2, explanation: "Take the first turning on the right." },
  ],
  vocabulary: [
    { word: "opposite", phonetic: "/ˈɒpəzɪt/", meaning: "đối diện", exampleSentence: "The park is opposite the school." },
    { word: "crossroads", phonetic: "/ˈkrɒsrəʊdz/", meaning: "ngã tư", exampleSentence: "Turn right at the crossroads." },
    { word: "straight on", phonetic: "/streɪt ɒn/", meaning: "đi thẳng", exampleSentence: "Go straight on for 100 metres." },
    { word: "roundabout", phonetic: "/ˈraʊndəbaʊt/", meaning: "bùng binh", exampleSentence: "Go around the roundabout and take the second exit." },
    { word: "junction", phonetic: "/ˈdʒʌŋkʃn/", meaning: "giao lộ", exampleSentence: "Turn left at the junction." },
  ],
  quiz: [
    { question: "What does 'opposite' mean?", options: ["bên cạnh", "đối diện", "phía sau", "ở giữa"], correctIndex: 1, explanation: "Opposite = đối diện." },
    { question: "'Go ___ on and the shop is on your left.'", options: ["turn", "past", "straight", "between"], correctIndex: 2, explanation: "Go straight on." },
    { question: "The post office is ___ the bakery.", options: ["next to", "between to", "in to", "go to"], correctIndex: 0, explanation: "Next to = bên cạnh." },
  ],
  parentInfo: "This lesson teaches direction-giving vocabulary, tested in Cambridge Flyers Speaking and Listening sections.",
  parentInfoVi: "Bài này dạy từ vựng chỉ đường, được kiểm tra trong phần Nói và Nghe Cambridge Flyers.",
};

const flyersCompoundNouns: CambridgeLecture = {
  id: "flyers-compound-nouns",
  title: "Compound Nouns & Word Building 🧩",
  level: "flyers",
  skill: "vocabulary",
  description: "Build new words by combining two words: bedroom, football, sunglasses!",
  examPattern: "Vocabulary knowledge of compound nouns appears in Reading & Writing tests where you fill gaps or match definitions.",
  stepByStep: [
    { icon: "🔗", title: "Combine Two Words", detail: "bed + room = bedroom, foot + ball = football" },
    { icon: "🔍", title: "Understand the Meaning", detail: "The second word is the main word. A bedroom is a type of room." },
    { icon: "📝", title: "Use in Sentences", detail: "I play football in the playground after school." },
  ],
  illustratedRules: [
    { rule: "Compound noun = word 1 + word 2 (usually written as one word or two words)", example: "sun + glasses = sunglasses, tooth + brush = toothbrush", icon: "🔗" },
    { rule: "The second word tells you WHAT it is", example: "A bookshelf is a type of shelf. A classroom is a type of room.", icon: "📚" },
    { rule: "Some compounds use a hyphen: ice-cream, T-shirt", example: "I bought a new T-shirt and an ice-cream.", icon: "➖" },
  ],
  watchOut: [
    { mistake: "foot ball (two separate words)", correction: "football (one word)", tip: "Most sport compounds are one word: football, basketball, volleyball." },
    { mistake: "Not knowing if it's one word or two", correction: "Check a dictionary if unsure", tip: "Common ones: toothpaste, bedroom, homework, playground, birthday." },
    { mistake: "Confusing meaning: 'a greenhouse' ≠ 'a green house'", correction: "greenhouse = nhà kính, green house = ngôi nhà màu xanh", tip: "Stress matters: GREENhouse vs green HOUSE." },
  ],
  practiceSet: [
    { question: "bed + room = ?", options: ["bedrum", "bedroom", "bed room", "bedrome"], correctIndex: 1, explanation: "Bedroom is written as one word." },
    { question: "What is a 'bookshelf'?", options: ["A book about shelves", "A shelf for books", "A type of book", "A shelf made of books"], correctIndex: 1, explanation: "A bookshelf is a shelf where you keep books." },
    { question: "tooth + ___ = toothbrush", options: ["paste", "brush", "pick", "ache"], correctIndex: 1, explanation: "Tooth + brush = toothbrush." },
  ],
  vocabulary: [
    { word: "playground", phonetic: "/ˈpleɪɡraʊnd/", meaning: "sân chơi", exampleSentence: "The children run in the playground." },
    { word: "toothpaste", phonetic: "/ˈtuːθpeɪst/", meaning: "kem đánh răng", exampleSentence: "I need more toothpaste." },
    { word: "sunflower", phonetic: "/ˈsʌnflaʊə/", meaning: "hoa hướng dương", exampleSentence: "Sunflowers are very tall and yellow." },
    { word: "raincoat", phonetic: "/ˈreɪnkəʊt/", meaning: "áo mưa", exampleSentence: "Wear your raincoat — it's going to rain!" },
    { word: "birthday", phonetic: "/ˈbɜːθdeɪ/", meaning: "sinh nhật", exampleSentence: "Happy birthday! How old are you?" },
  ],
  quiz: [
    { question: "Which is a compound noun?", options: ["beautiful", "football", "quickly", "running"], correctIndex: 1, explanation: "Football = foot + ball (compound noun)." },
    { question: "sun + ___ = sunglasses", options: ["shine", "flower", "glasses", "light"], correctIndex: 2, explanation: "Sun + glasses = sunglasses." },
    { question: "A 'waterfall' is:", options: ["water that falls", "a ball of water", "a wall of water", "falling in water"], correctIndex: 0, explanation: "Waterfall = water that falls from a high place." },
  ],
  parentInfo: "This lesson teaches compound nouns, helping children build vocabulary for Cambridge Flyers Reading & Writing tests.",
  parentInfoVi: "Bài này dạy danh từ ghép, giúp trẻ mở rộng vốn từ cho phần Đọc & Viết Cambridge Flyers.",
};

// ==================== KET ====================

const ketShopping: CambridgeLecture = {
  id: "ket-shopping-money",
  title: "Shopping & Money 🛍️",
  level: "ket",
  skill: "speaking",
  description: "Role-play buying items, asking prices, and making decisions!",
  examPattern: "In KET Speaking Part 2, you role-play a real-life situation like shopping. You ask questions and give information.",
  stepByStep: [
    { icon: "🏪", title: "Start the Conversation", detail: "Customer: 'Excuse me, how much is this?' / Shop assistant: 'It's £5.99.'" },
    { icon: "💰", title: "Ask About Price & Size", detail: "'Have you got this in a smaller size?' / 'Is there a discount?'" },
    { icon: "💳", title: "Make a Decision", detail: "'I'll take it.' / 'That's too expensive.' / 'Can I pay by card?'" },
  ],
  illustratedRules: [
    { rule: "Asking price: 'How much is/are...?' 'What's the price of...?'", example: "How much are these shoes?", icon: "💰" },
    { rule: "Sizes: small (S), medium (M), large (L), extra large (XL)", example: "Have you got this T-shirt in medium?", icon: "📏" },
    { rule: "Paying: cash, card, contactless, exact change", example: "Can I pay by card, please?", icon: "💳" },
  ],
  watchOut: [
    { mistake: "How much is these shoes?", correction: "How much are these shoes?", tip: "These shoes = plural → use 'are'." },
    { mistake: "I take it", correction: "I'll take it", tip: "Use 'I'll' (= I will) for decisions made at the moment." },
    { mistake: "It costs five pounds and ninety-nine", correction: "It costs five pounds ninety-nine / five ninety-nine", tip: "Don't add 'and' between pounds and pence." },
  ],
  practiceSet: [
    { question: "'How much ___ this bag?'", options: ["is", "are", "does", "do"], correctIndex: 0, explanation: "This bag = singular → How much is." },
    { question: "You want to buy a shirt. What do you say?", options: ["Give me this shirt", "I'll take this shirt, please", "This shirt is mine", "I want you to give me this"], correctIndex: 1, explanation: "'I'll take this, please' is polite and natural." },
    { question: "'Have you got this in a ___ size? This one is too big.'", options: ["bigger", "smaller", "longest", "more big"], correctIndex: 1, explanation: "Too big → need smaller." },
  ],
  vocabulary: [
    { word: "discount", phonetic: "/ˈdɪskaʊnt/", meaning: "giảm giá", exampleSentence: "Is there a discount on this jacket?" },
    { word: "receipt", phonetic: "/rɪˈsiːt/", meaning: "hóa đơn", exampleSentence: "Can I have a receipt, please?" },
    { word: "bargain", phonetic: "/ˈbɑːɡɪn/", meaning: "món hời", exampleSentence: "This coat was a real bargain — only £10!" },
    { word: "exchange", phonetic: "/ɪksˈtʃeɪndʒ/", meaning: "đổi hàng", exampleSentence: "Can I exchange this for a different colour?" },
    { word: "refund", phonetic: "/ˈriːfʌnd/", meaning: "hoàn tiền", exampleSentence: "I'd like a refund, please. This doesn't work." },
  ],
  quiz: [
    { question: "What does 'receipt' mean?", options: ["hóa đơn", "giảm giá", "tiền thối", "thẻ tín dụng"], correctIndex: 0, explanation: "Receipt = hóa đơn." },
    { question: "'That's too ___. Have you got something cheaper?'", options: ["cheap", "expensive", "small", "big"], correctIndex: 1, explanation: "Too expensive → asking for something cheaper." },
    { question: "How do you politely ask for the bill?", options: ["Give me money!", "The bill!", "Could I have the bill, please?", "I want bill"], correctIndex: 2, explanation: "'Could I have... please?' is polite." },
  ],
  parentInfo: "This lesson practises shopping conversations for the KET Speaking test, building confidence in real-life English interactions.",
  parentInfoVi: "Bài này luyện hội thoại mua sắm cho phần thi Nói KET, xây dựng tự tin giao tiếp tiếng Anh thực tế.",
};

const ketPresentPerfect: CambridgeLecture = {
  id: "ket-present-perfect-past",
  title: "Present Perfect vs Past Simple ⏳",
  level: "ket",
  skill: "reading",
  description: "Learn when to use 'have done' vs 'did' — a key grammar difference!",
  examPattern: "KET Reading & Writing tests include gap-fill exercises where you choose between present perfect and past simple.",
  stepByStep: [
    { icon: "✅", title: "Present Perfect", detail: "have/has + past participle: 'I have visited Paris.' (experience, no specific time)" },
    { icon: "📅", title: "Past Simple", detail: "verb-ed or irregular: 'I visited Paris last year.' (specific time)" },
    { icon: "🔑", title: "Key Difference", detail: "Present perfect = experience/result NOW. Past simple = finished time in the past." },
  ],
  illustratedRules: [
    { rule: "Present Perfect: have/has + V3 — for experiences, recent actions, unfinished time", example: "I have been to London. (experience, no specific time)", icon: "🌐" },
    { rule: "Past Simple: V2 — for finished actions at a specific past time", example: "I went to London last summer. (specific time: last summer)", icon: "📅" },
    { rule: "Signal words: ever, never, already, yet, just → Present Perfect. Yesterday, last week, ago → Past Simple", example: "Have you ever eaten sushi? / I ate sushi yesterday.", icon: "🔑" },
  ],
  watchOut: [
    { mistake: "I have visited Paris last year", correction: "I visited Paris last year", tip: "'Last year' = specific time → use past simple." },
    { mistake: "Did you ever been to Japan?", correction: "Have you ever been to Japan?", tip: "'Ever' = present perfect → Have you ever...?" },
    { mistake: "I've went there", correction: "I've gone/been there", tip: "After have/has, use the PAST PARTICIPLE (V3), not V2." },
  ],
  practiceSet: [
    { question: "'I ___ never ___ Chinese food.' (eat)", options: ["have / eaten", "did / eat", "have / ate", "was / eating"], correctIndex: 0, explanation: "'Never' signals present perfect: have eaten." },
    { question: "'She ___ to the cinema last Friday.'", options: ["has gone", "went", "has went", "goes"], correctIndex: 1, explanation: "'Last Friday' = specific time → past simple: went." },
    { question: "'___ you ever ___ a horse?' (ride)", options: ["Did / ride", "Have / ridden", "Has / rode", "Do / ride"], correctIndex: 1, explanation: "'Ever' → present perfect: Have you ever ridden?" },
  ],
  vocabulary: [
    { word: "already", phonetic: "/ɔːlˈredi/", meaning: "đã rồi", exampleSentence: "I've already finished my homework." },
    { word: "yet", phonetic: "/jet/", meaning: "chưa", exampleSentence: "I haven't eaten lunch yet." },
    { word: "just", phonetic: "/dʒʌst/", meaning: "vừa mới", exampleSentence: "She has just arrived." },
    { word: "recently", phonetic: "/ˈriːsntli/", meaning: "gần đây", exampleSentence: "I've recently started learning guitar." },
    { word: "ago", phonetic: "/əˈɡəʊ/", meaning: "trước đây", exampleSentence: "I moved here two years ago." },
  ],
  quiz: [
    { question: "'I ___ that movie three times.' (see)", options: ["saw", "have seen", "have saw", "seen"], correctIndex: 1, explanation: "No specific time mentioned → present perfect: have seen." },
    { question: "'They ___ married in 2019.'", options: ["have got", "got", "have gotten", "get"], correctIndex: 1, explanation: "'In 2019' = specific time → past simple: got." },
    { question: "Which signal word goes with present perfect?", options: ["yesterday", "last week", "already", "two days ago"], correctIndex: 2, explanation: "'Already' → present perfect." },
  ],
  parentInfo: "This lesson explains the difference between present perfect and past simple, a crucial grammar point for the KET exam.",
  parentInfoVi: "Bài này giải thích sự khác biệt giữa hiện tại hoàn thành và quá khứ đơn, điểm ngữ pháp quan trọng cho kỳ thi KET.",
};

const ketInformalLetter: CambridgeLecture = {
  id: "ket-informal-letter",
  title: "Informal Letter Writing ✉️",
  level: "ket",
  skill: "writing",
  description: "Write a friendly letter to a pen friend — 100 words!",
  examPattern: "In KET Writing Part 7, you write a short message or letter (25-35 words) and in Part 9 you write about 25 words in a guided writing task.",
  stepByStep: [
    { icon: "👋", title: "Greeting", detail: "Start with: Dear [name], / Hi [name]," },
    { icon: "📝", title: "Main Content", detail: "Answer the questions given in the task. Use 2-3 short paragraphs." },
    { icon: "👏", title: "Closing", detail: "End with: Write soon! / See you! + Your name" },
  ],
  illustratedRules: [
    { rule: "Informal greeting: Hi/Dear + first name + comma", example: "Dear Alex, / Hi Tom,", icon: "👋" },
    { rule: "Use contractions and friendly language", example: "I'm having a great time! / It's really fun here.", icon: "😊" },
    { rule: "Informal closing: See you soon! / Write back! / Take care! + Your name", example: "Write back soon!\nLove, Sarah", icon: "✍️" },
  ],
  watchOut: [
    { mistake: "Dear Sir/Madam (too formal)", correction: "Dear Tom, / Hi Anna,", tip: "This is an INFORMAL letter — use first names." },
    { mistake: "Yours faithfully (too formal)", correction: "See you soon! / Love, / Bye!", tip: "Use casual closings for friends." },
    { mistake: "Writing too much or too little", correction: "Keep it around 25-35 words for Part 7", tip: "Read the word count requirement carefully." },
  ],
  practiceSet: [
    { question: "Which is a good start for an informal letter?", options: ["Dear Sir,", "To Whom It May Concern,", "Hi Emma,", "Dear Madam,"], correctIndex: 2, explanation: "'Hi Emma,' is friendly and informal." },
    { question: "Which closing is informal?", options: ["Yours sincerely,", "Yours faithfully,", "See you soon!", "Best regards,"], correctIndex: 2, explanation: "'See you soon!' is casual and friendly." },
    { question: "In an informal letter, should you use contractions?", options: ["No, never", "Yes, it sounds natural", "Only sometimes", "Only in the greeting"], correctIndex: 1, explanation: "Contractions like I'm, don't, it's make letters sound natural and friendly." },
  ],
  vocabulary: [
    { word: "pen friend", phonetic: "/pen frend/", meaning: "bạn qua thư", exampleSentence: "I have a pen friend in Australia." },
    { word: "regards", phonetic: "/rɪˈɡɑːdz/", meaning: "lời chào (kết thư)", exampleSentence: "Best regards, Tom." },
    { word: "miss", phonetic: "/mɪs/", meaning: "nhớ", exampleSentence: "I miss you! Write soon." },
    { word: "can't wait", phonetic: "/kɑːnt weɪt/", meaning: "nóng lòng", exampleSentence: "I can't wait to see you!" },
    { word: "guess what", phonetic: "/ɡes wɒt/", meaning: "bạn biết gì không", exampleSentence: "Guess what! I got a new puppy!" },
  ],
  quiz: [
    { question: "How should you start an informal letter?", options: ["Dear Sir,", "Hi + name,", "To the Manager,", "Dear Madam,"], correctIndex: 1, explanation: "Informal = Hi + first name." },
    { question: "Which sentence is too formal for an informal letter?", options: ["I'm having fun!", "It was great to hear from you!", "I am writing to inform you...", "Miss you loads!"], correctIndex: 2, explanation: "'I am writing to inform you' is formal business language." },
    { question: "What does 'Write back soon!' mean?", options: ["Viết ngược!", "Viết sớm nhé!", "Trả lời thư sớm nhé!", "Đừng viết!"], correctIndex: 2, explanation: "Write back = reply to my letter." },
  ],
  parentInfo: "This lesson teaches informal letter writing, a key skill for the KET Writing test. Children learn friendly greetings, contractions, and casual closings.",
  parentInfoVi: "Bài này dạy cách viết thư thân mật, kỹ năng quan trọng cho phần Viết KET. Trẻ học cách chào hỏi, dùng viết tắt và kết thúc thư.",
};

// ==================== PET ====================

const petReportedSpeech: CambridgeLecture = {
  id: "pet-reported-speech",
  title: "Reported Speech 🗣️→📝",
  level: "pet",
  skill: "reading",
  description: "Transform direct speech to reported speech: 'She said that...'",
  examPattern: "PET Reading Part 1 includes sentence transformations. Reported speech is a common grammar point tested.",
  stepByStep: [
    { icon: "🗣️", title: "Direct Speech", detail: "'I am happy,' she said." },
    { icon: "🔄", title: "Change the Tense", detail: "Present → Past: am → was, like → liked, will → would" },
    { icon: "📝", title: "Write Reported Speech", detail: "She said (that) she was happy." },
  ],
  illustratedRules: [
    { rule: "Tense shift: Present Simple → Past Simple", example: "'I like pizza.' → He said he liked pizza.", icon: "⏪" },
    { rule: "Tense shift: Present Continuous → Past Continuous", example: "'I am reading.' → She said she was reading.", icon: "📖" },
    { rule: "Pronoun changes: I→he/she, my→his/her, we→they", example: "'I love my dog.' → She said she loved her dog.", icon: "🔄" },
  ],
  watchOut: [
    { mistake: "She said that she is happy", correction: "She said that she was happy", tip: "Shift present to past: is → was." },
    { mistake: "He said me that...", correction: "He said (that) / He told me (that)...", tip: "Say + that (no person). Tell + person + that." },
    { mistake: "Forgetting to change pronouns", correction: "'I will go' → He said he would go", tip: "Always change pronouns: I→he/she, we→they." },
  ],
  practiceSet: [
    { question: "'I am tired,' she said. → She said ___.", options: ["she is tired", "she was tired", "I was tired", "she were tired"], correctIndex: 1, explanation: "am → was, I → she." },
    { question: "'We will come tomorrow,' they said. → They said ___.", options: ["they will come tomorrow", "they would come the next day", "we would come tomorrow", "they would come tomorrow"], correctIndex: 1, explanation: "will → would, tomorrow → the next day." },
    { question: "'I don't like fish,' he said. → He said ___.", options: ["he doesn't like fish", "he didn't like fish", "I didn't like fish", "he don't like fish"], correctIndex: 1, explanation: "don't like → didn't like, I → he." },
  ],
  vocabulary: [
    { word: "reported", phonetic: "/rɪˈpɔːtɪd/", meaning: "được tường thuật", exampleSentence: "She reported the news to her boss." },
    { word: "claimed", phonetic: "/kleɪmd/", meaning: "tuyên bố", exampleSentence: "He claimed that he was innocent." },
    { word: "mentioned", phonetic: "/ˈmenʃnd/", meaning: "đề cập", exampleSentence: "She mentioned that she was leaving early." },
    { word: "admitted", phonetic: "/ədˈmɪtɪd/", meaning: "thừa nhận", exampleSentence: "He admitted that he had made a mistake." },
    { word: "promised", phonetic: "/ˈprɒmɪst/", meaning: "hứa", exampleSentence: "She promised that she would help." },
  ],
  quiz: [
    { question: "'I can swim,' she said. → She said she ___ swim.", options: ["can", "could", "would", "should"], correctIndex: 1, explanation: "can → could in reported speech." },
    { question: "Which verb means 'to say something is true'?", options: ["deny", "claim", "refuse", "forget"], correctIndex: 1, explanation: "Claim = tuyên bố rằng điều gì đó đúng." },
    { question: "'I have finished,' he said. → He said he ___.", options: ["has finished", "had finished", "have finished", "finished"], correctIndex: 1, explanation: "have finished → had finished." },
  ],
  parentInfo: "This lesson teaches reported speech transformations, a key grammar skill for the PET Reading & Writing test.",
  parentInfoVi: "Bài này dạy cách chuyển đổi câu trực tiếp sang gián tiếp, kỹ năng ngữ pháp quan trọng cho phần thi Đọc & Viết PET.",
};

const petPhotoDescription: CambridgeLecture = {
  id: "pet-photo-description",
  title: "Photo Description 📸",
  level: "pet",
  skill: "speaking",
  description: "Describe and compare photos — give your opinion like a pro!",
  examPattern: "In PET Speaking Part 3, you describe a photo for about 1 minute. In Part 4, you discuss related questions with the examiner.",
  stepByStep: [
    { icon: "👀", title: "Describe What You See", detail: "'In this photo, I can see... There is/are...'" },
    { icon: "🤔", title: "Speculate", detail: "'It looks like... They might be... I think they're...'" },
    { icon: "💬", title: "Give Your Opinion", detail: "'I think... because... In my opinion...'" },
  ],
  illustratedRules: [
    { rule: "Start with general description: 'In this photo, I can see...'", example: "In this photo, I can see a family having a picnic in a park.", icon: "🖼️" },
    { rule: "Use speculating language: 'It looks like...', 'They seem to be...', 'It might be...'", example: "They seem to be enjoying themselves. It might be a weekend.", icon: "🔍" },
    { rule: "Give opinions: 'I think...', 'In my opinion...', 'I believe...'", example: "I think outdoor activities are important for families.", icon: "💭" },
  ],
  watchOut: [
    { mistake: "Just listing: 'There is a man. There is a tree. There is a dog.'", correction: "Connect ideas: 'There is a man walking his dog near a big tree.'", tip: "Use prepositions and actions to make descriptions flow." },
    { mistake: "Being too short: 'It's a park.'", correction: "Expand: 'It's a beautiful green park with lots of trees and flowers.'", tip: "Add adjectives and details to fill 1 minute." },
    { mistake: "Saying 'I don't know' about speculation", correction: "Use 'maybe', 'perhaps', 'It could be...'", tip: "You don't need to be sure — just speculate!" },
  ],
  practiceSet: [
    { question: "How should you start describing a photo?", options: ["I don't know what this is", "In this photo, I can see...", "This photo is nice", "Look at this"], correctIndex: 1, explanation: "'In this photo, I can see...' is the standard opening." },
    { question: "Which phrase shows speculation?", options: ["I know that...", "It's definitely...", "They might be...", "I'm sure that..."], correctIndex: 2, explanation: "'Might be' shows you're guessing, not stating a fact." },
    { question: "How can you make a short description longer?", options: ["Say 'I don't know' more", "Add adjectives and details", "Speak very slowly", "Repeat the same sentence"], correctIndex: 1, explanation: "Adding adjectives and details enriches descriptions." },
  ],
  vocabulary: [
    { word: "background", phonetic: "/ˈbækɡraʊnd/", meaning: "phía sau/nền", exampleSentence: "In the background, I can see mountains." },
    { word: "foreground", phonetic: "/ˈfɔːɡraʊnd/", meaning: "phía trước", exampleSentence: "In the foreground, there are two children playing." },
    { word: "apparently", phonetic: "/əˈpærəntli/", meaning: "có vẻ như", exampleSentence: "They're apparently having a great time." },
    { word: "whereas", phonetic: "/weərˈæz/", meaning: "trong khi", exampleSentence: "The first photo shows a city, whereas the second shows the countryside." },
    { word: "depict", phonetic: "/dɪˈpɪkt/", meaning: "mô tả/thể hiện", exampleSentence: "This photo depicts a busy street market." },
  ],
  quiz: [
    { question: "What does 'in the background' mean?", options: ["phía trước", "phía sau", "ở giữa", "bên cạnh"], correctIndex: 1, explanation: "Background = phần phía sau trong ảnh." },
    { question: "Which is a good speculation phrase?", options: ["I'm 100% sure", "It must definitely be", "It could be that...", "I know for certain"], correctIndex: 2, explanation: "'It could be' expresses possibility, not certainty." },
    { question: "'Whereas' is used to:", options: ["agree", "compare/contrast", "conclude", "summarise"], correctIndex: 1, explanation: "'Whereas' introduces a contrast between two things." },
  ],
  parentInfo: "This lesson trains photo description skills for PET Speaking Parts 3 and 4, including speculation and opinion-giving.",
  parentInfoVi: "Bài này luyện kỹ năng mô tả ảnh cho phần Nói PET Phần 3 và 4, bao gồm suy đoán và đưa ý kiến.",
};

const petSentenceTransformation: CambridgeLecture = {
  id: "pet-sentence-transformation",
  title: "Sentence Transformation 🔄",
  level: "pet",
  skill: "writing",
  description: "Rewrite sentences using a key word — keep the same meaning!",
  examPattern: "PET Reading & Writing Part 1 gives you a sentence and a key word. You rewrite the sentence using that word (1-3 words).",
  stepByStep: [
    { icon: "📖", title: "Read Both Sentences", detail: "Read the original sentence and the incomplete one." },
    { icon: "🔑", title: "Use the Key Word", detail: "The key word MUST be in your answer. Don't change it." },
    { icon: "✅", title: "Check the Meaning", detail: "Both sentences must mean the same thing." },
  ],
  illustratedRules: [
    { rule: "Active ↔ Passive transformation", example: "They built this house in 1990. → This house was built in 1990.", icon: "🔄" },
    { rule: "Comparative ↔ Superlative / as...as transformation", example: "No one is taller than Tom. → Tom is the tallest.", icon: "📏" },
    { rule: "Synonym substitution with grammar change", example: "I started learning English 5 years ago. → I have been learning English for 5 years.", icon: "⏳" },
  ],
  watchOut: [
    { mistake: "Changing the key word", correction: "Keep the key word exactly as given", tip: "You can add words before/after the key word, but never change it." },
    { mistake: "Changing the meaning", correction: "Both sentences must mean the same", tip: "Read both sentences aloud to check they match in meaning." },
    { mistake: "Using too many words", correction: "Use only 1-3 words including the key word", tip: "Contractions (don't, isn't) count as TWO words." },
  ],
  practiceSet: [
    { question: "'This is the most interesting book I've ever read.' (SUCH) → I have never read ___.", options: ["such interesting book", "such an interesting book", "so interesting book", "such a interesting book"], correctIndex: 1, explanation: "'Such an interesting book' keeps the meaning." },
    { question: "'It's not necessary to book in advance.' (HAVE) → You ___ book in advance.", options: ["don't have to", "haven't to", "don't have", "mustn't"], correctIndex: 0, explanation: "'Not necessary' = don't have to." },
    { question: "'The last time I saw her was in June.' (SINCE) → I ___ her since June.", options: ["didn't see", "haven't seen", "don't see", "hadn't seen"], correctIndex: 1, explanation: "'Since' + present perfect: haven't seen." },
  ],
  vocabulary: [
    { word: "rephrase", phonetic: "/riːˈfreɪz/", meaning: "diễn đạt lại", exampleSentence: "Can you rephrase that in simpler words?" },
    { word: "equivalent", phonetic: "/ɪˈkwɪvələnt/", meaning: "tương đương", exampleSentence: "Find the equivalent expression." },
    { word: "contraction", phonetic: "/kənˈtrækʃn/", meaning: "dạng viết tắt", exampleSentence: "Don't is a contraction of do not." },
    { word: "transformation", phonetic: "/ˌtrænsfəˈmeɪʃn/", meaning: "sự chuyển đổi", exampleSentence: "Sentence transformation is an important skill." },
    { word: "preserve", phonetic: "/prɪˈzɜːv/", meaning: "giữ nguyên", exampleSentence: "Preserve the original meaning of the sentence." },
  ],
  quiz: [
    { question: "'She is too young to drive.' (ENOUGH) → She is not ___.", options: ["old enough to drive", "enough old to drive", "young enough to drive", "old enough drive"], correctIndex: 0, explanation: "Too young = not old enough." },
    { question: "In PET transformations, contractions count as:", options: ["one word", "two words", "half a word", "not allowed"], correctIndex: 1, explanation: "Don't = do + not = 2 words in PET." },
    { question: "'I prefer tea to coffee.' (RATHER) → I would ___.", options: ["rather drink tea than coffee", "rather tea than coffee", "rather to drink tea", "rather prefer tea"], correctIndex: 0, explanation: "Prefer → would rather + verb." },
  ],
  parentInfo: "This lesson practises sentence transformation, a core skill in PET Reading & Writing Part 1. Students learn to rewrite sentences while preserving meaning.",
  parentInfoVi: "Bài này luyện chuyển đổi câu, kỹ năng cốt lõi trong phần Đọc & Viết PET Phần 1. Học sinh học cách viết lại câu giữ nguyên nghĩa.",
};

// === Export all expansion lectures ===
export const cambridgeLecturesExpansion: CambridgeLecture[] = [
  startersAnimals,
  startersFamily,
  startersNumbers,
  moversWeather,
  moversRoutines,
  moversAdjectives,
  flyersPastTense,
  flyersDirections,
  flyersCompoundNouns,
  ketShopping,
  ketPresentPerfect,
  ketInformalLetter,
  petReportedSpeech,
  petPhotoDescription,
  petSentenceTransformation,
];
