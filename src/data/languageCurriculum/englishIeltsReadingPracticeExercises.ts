// Extra IELTS Reading practice exercises - short passages + category-specific questions
// Merged into existing reading lessons in englishIelts.ts so each lesson has hands-on practice.
import type { InteractiveExercise } from "./types";

export const ieltsReadingPracticeExercises: Record<string, InteractiveExercise[]> = {
  // ===== Skimming & Scanning =====
  "ielts-reading-1": [
    {
      type: "fill-in-blank",
      instruction: `Đọc nhanh đoạn văn sau (skim & scan) rồi trả lời:\n\nPassage: "The Amazon rainforest, often called 'the lungs of the planet', covers approximately 5.5 million square kilometres across nine South American countries. It produces around 20% of the world's oxygen and is home to an estimated 400 billion individual trees representing 16,000 species. Despite its importance, deforestation has destroyed roughly 17% of the forest in the past 50 years, mainly due to cattle ranching and soybean farming."`,
      instructionEn: `Skim & scan the passage and answer:\n\nPassage: "The Amazon rainforest, often called 'the lungs of the planet', covers approximately 5.5 million square kilometres across nine South American countries. It produces around 20% of the world's oxygen and is home to an estimated 400 billion individual trees representing 16,000 species. Despite its importance, deforestation has destroyed roughly 17% of the forest in the past 50 years, mainly due to cattle ranching and soybean farming."`,
      sentences: [
        { text: "Diện tích rừng Amazon: ___ triệu km².", textEn: "Amazon area: ___ million km².", answer: "5.5", hint: "scan a number" },
        { text: "Số quốc gia có rừng Amazon: ___.", textEn: "Number of countries: ___.", answer: "nine", hint: "scan – number" },
        { text: "Phần trăm oxy thế giới rừng tạo ra: ___%.", textEn: "Oxygen produced: ___%.", answer: "20", hint: "scan a %" },
        { text: "Phần trăm rừng đã bị phá huỷ trong 50 năm qua: ___%.", textEn: "Deforested in 50 years: ___%.", answer: "17", hint: "scan a %" },
        { text: "Nguyên nhân chính của phá rừng: cattle ranching và ___ farming.", textEn: "Main cause: cattle ranching and ___ farming.", answer: "soybean", hint: "noun" },
      ],
    },
  ],

  // ===== True / False / Not Given =====
  "ielts-reading-2": [
    {
      type: "fill-in-blank",
      instruction: `Dựa vào đoạn văn, xác định TRUE / FALSE / NOT GIVEN:\n\nPassage: "Honeybees communicate the location of food sources through a complex 'waggle dance', first decoded by Austrian biologist Karl von Frisch in 1945. The dance's angle indicates the direction of the food relative to the sun, while its duration signals the distance. A single hive can house up to 60,000 bees, all of which descend from one queen."`,
      instructionEn: `Decide TRUE / FALSE / NOT GIVEN based on the passage:\n\nPassage: "Honeybees communicate the location of food sources through a complex 'waggle dance', first decoded by Austrian biologist Karl von Frisch in 1945. The dance's angle indicates the direction of the food relative to the sun, while its duration signals the distance. A single hive can house up to 60,000 bees, all of which descend from one queen."`,
      sentences: [
        { text: "Karl von Frisch decoded the waggle dance in 1945. → ___", textEn: "Karl von Frisch decoded the dance in 1945. → ___", answer: "TRUE" },
        { text: "The duration of the dance shows the direction of the food. → ___", textEn: "Dance duration shows direction. → ___", answer: "FALSE", hint: "Direction = angle, distance = duration" },
        { text: "A hive contains a maximum of 60,000 bees. → ___", textEn: "A hive holds up to 60,000 bees. → ___", answer: "TRUE" },
        { text: "Karl von Frisch won a Nobel Prize for his discovery. → ___", textEn: "He won a Nobel Prize. → ___", answer: "NOT GIVEN", hint: "Passage không nhắc giải thưởng" },
        { text: "All bees in a hive share the same queen. → ___", textEn: "All bees descend from one queen. → ___", answer: "TRUE" },
      ],
    },
  ],

  // ===== Matching Headings =====
  "ielts-reading-3": [
    {
      type: "fill-in-blank",
      instruction: `Chọn heading phù hợp cho mỗi đoạn (A–D). Headings:\n  i. The cost of going green\n  ii. A historic shift in power generation\n  iii. Storage – the missing piece\n  iv. Public attitudes turning positive\n\nPassage:\nA. In 2023, renewable energy overtook coal as the world's largest source of electricity for the first time in over a century, marking a turning point in the global energy transition.\nB. Surveys conducted across 30 nations now show that more than 70% of citizens support a faster move away from fossil fuels, even when it means short-term price increases.\nC. Yet wind and solar remain intermittent. Without affordable, large-scale batteries, grids still depend on gas plants to fill the gaps when the sun sets or the wind drops.\nD. Building such storage at scale is expensive: a recent IEA report estimates the world needs to invest over USD 800 billion in batteries by 2030 to keep pace with renewable growth.`,
      instructionEn: `Match a heading (i–iv) to each paragraph A–D.\nHeadings:\n  i. The cost of going green\n  ii. A historic shift in power generation\n  iii. Storage – the missing piece\n  iv. Public attitudes turning positive\n\nSee the passage in the Vietnamese instruction above.\n\nPassage:\nA. In 2023, renewable energy overtook coal as the world's largest source of electricity for the first time in over a century, marking a turning point in the global energy transition.\nB. Surveys conducted across 30 nations now show that more than 70% of citizens support a faster move away from fossil fuels, even when it means short-term price increases.\nC. Yet wind and solar remain intermittent. Without affordable, large-scale batteries, grids still depend on gas plants to fill the gaps when the sun sets or the wind drops.\nD. Building such storage at scale is expensive: a recent IEA report estimates the world needs to invest over USD 800 billion in batteries by 2030 to keep pace with renewable growth.`,
      sentences: [
        { text: "Paragraph A → heading ___", textEn: "Paragraph A → ___", answer: "ii", hint: "renewables overtook coal" },
        { text: "Paragraph B → heading ___", textEn: "Paragraph B → ___", answer: "iv", hint: "70% support" },
        { text: "Paragraph C → heading ___", textEn: "Paragraph C → ___", answer: "iii", hint: "storage gap" },
        { text: "Paragraph D → heading ___", textEn: "Paragraph D → ___", answer: "i", hint: "USD 800 billion" },
      ],
    },
  ],

  // ===== Sentence Completion =====
  "ielts-reading-4": [
    {
      type: "fill-in-blank",
      instruction: `Hoàn thành câu KHÔNG QUÁ HAI TỪ lấy nguyên văn từ passage:\n\nPassage: "The Great Barrier Reef, stretching over 2,300 kilometres along the coast of Queensland, is the largest living structure on Earth. It supports more than 1,500 species of fish and around 400 types of coral. Rising sea temperatures, however, have triggered four mass bleaching events since 2016, weakening the reef's resilience and threatening tourism revenue, which currently exceeds AUD 6 billion annually."`,
      instructionEn: `Complete each sentence with NO MORE THAN TWO WORDS from the passage:\n\nPassage: "The Great Barrier Reef, stretching over 2,300 kilometres along the coast of Queensland, is the largest living structure on Earth. It supports more than 1,500 species of fish and around 400 types of coral. Rising sea temperatures, however, have triggered four mass bleaching events since 2016, weakening the reef's resilience and threatening tourism revenue, which currently exceeds AUD 6 billion annually."`,
      sentences: [
        { text: "The reef stretches more than 2,300 ___ along Queensland's coast.", textEn: "The reef stretches over 2,300 ___.", answer: "kilometres", hint: "đơn vị đo dài" },
        { text: "It is the largest living ___ on Earth.", textEn: "Largest living ___ on Earth.", answer: "structure", hint: "noun" },
        { text: "Around 400 types of ___ live in the reef.", textEn: "Around 400 types of ___.", answer: "coral", hint: "noun" },
        { text: "Since 2016 there have been four mass ___ events.", textEn: "Four mass ___ events.", answer: "bleaching", hint: "tẩy trắng" },
        { text: "Tourism brings in more than AUD ___ each year.", textEn: "Tourism revenue exceeds AUD ___.", answer: "6 billion", hint: "two words" },
      ],
    },
  ],

  // ===== Summary Completion =====
  "ielts-reading-5": [
    {
      type: "fill-in-blank",
      instruction: `Hoàn thành đoạn tóm tắt bằng từ trong word list:\n[ artificial · sleep · efficiency · attention · screens ]\n\nPassage: "Recent neuroscience research suggests that exposure to bright screens late at night suppresses melatonin, the hormone that regulates our sleep cycle. Participants who used phones for an hour before bed took, on average, 30 minutes longer to fall asleep and reported reduced attention the following day. Researchers warn that long-term disruption may also lower work efficiency."`,
      instructionEn: `Complete the summary with words from the list:\n[ artificial · sleep · efficiency · attention · screens ]\n\nPassage: "Recent neuroscience research suggests that exposure to bright screens late at night suppresses melatonin, the hormone that regulates our sleep cycle. Participants who used phones for an hour before bed took, on average, 30 minutes longer to fall asleep and reported reduced attention the following day. Researchers warn that long-term disruption may also lower work efficiency."`,
      sentences: [
        { text: "Late-night use of ___ blocks the production of melatonin.", textEn: "Late-night use of ___ blocks the production of melatonin.", answer: "screens", hint: "noun plural – devices with bright displays" },
        { text: "Bright screens delay ___ by about half an hour.", textEn: "Bright screens delay ___ by about half an hour.", answer: "sleep", hint: "noun – what melatonin regulates" },
        { text: "The next day, users showed reduced ___.", textEn: "The next day, users showed reduced ___.", answer: "attention", hint: "noun – ability to focus" },
        { text: "Over time, work ___ also declines.", textEn: "Over time, work ___ also declines.", answer: "efficiency", hint: "noun – productivity" },
      ],
    },
  ],

  // ===== Multiple Choice =====
  "ielts-reading-6": [
    {
      type: "fill-in-blank",
      instruction: `Đọc passage và chọn đáp án đúng (A/B/C/D) - viết chữ cái vào ô trống:\n\nPassage: "Electric cars are often praised as a clean alternative to petrol vehicles. While it is true that they emit no exhaust gases, the environmental benefit depends largely on how the electricity that charges them is generated. In countries where coal still dominates the grid, the lifetime CO₂ footprint of an electric car can be only 20–30% lower than a modern petrol equivalent. In nations powered mostly by hydro or nuclear, the same vehicle can be up to 70% cleaner."\n\nQ1. The writer's main point is that:\n  A. electric cars are always cleaner\n  B. electric cars produce no emissions\n  C. the cleanliness of EVs depends on the electricity source\n  D. petrol cars are now equally clean\n\nQ2. In a coal-powered country, an EV is roughly:\n  A. 70% cleaner than petrol\n  B. 20–30% cleaner than petrol\n  C. equally polluting\n  D. dirtier than petrol\n\nQ3. Which word best describes the writer's tone?\n  A. enthusiastic\n  B. neutral and balanced\n  C. dismissive\n  D. sarcastic`,
      instructionEn: `Read and pick A/B/C/D for each question (write the letter):\n\nPassage: "Electric cars are often praised as a clean alternative to petrol vehicles. While it is true that they emit no exhaust gases, the environmental benefit depends largely on how the electricity that charges them is generated. In countries where coal still dominates the grid, the lifetime CO₂ footprint of an electric car can be only 20–30% lower than a modern petrol equivalent. In nations powered mostly by hydro or nuclear, the same vehicle can be up to 70% cleaner."`,
      sentences: [
        { text: "Q1 → ___", textEn: "Q1 → ___", answer: "C", hint: "main idea" },
        { text: "Q2 → ___", textEn: "Q2 → ___", answer: "B" },
        { text: "Q3 → ___", textEn: "Q3 → ___", answer: "B", hint: "không phán xét" },
      ],
    },
  ],

  // ===== Matching Information =====
  "ielts-reading-7": [
    {
      type: "fill-in-blank",
      instruction: `Tìm đoạn (A, B, C hoặc D) chứa thông tin sau. Mỗi đoạn có thể được dùng nhiều lần.\n\nPassage:\nA. Coffee was first cultivated in Ethiopia, where legend says a 9th-century goatherd noticed his goats becoming energetic after eating red berries from a particular shrub.\nB. From Ethiopia, coffee crossed the Red Sea to Yemen, where Sufi monks brewed it to stay alert during long night prayers in the 15th century.\nC. By the 17th century, coffeehouses had spread to London and Paris, becoming hubs for political debate and earning the nickname 'penny universities'.\nD. Today, Brazil produces nearly one-third of the world's coffee, although Vietnam has become the largest grower of robusta beans, used mainly for instant coffee.`,
      instructionEn: `Match the information to paragraphs A–D (paragraphs may be reused).\n\nPassage:\nA. Coffee was first cultivated in Ethiopia, where legend says a 9th-century goatherd noticed his goats becoming energetic after eating red berries from a particular shrub.\nB. From Ethiopia, coffee crossed the Red Sea to Yemen, where Sufi monks brewed it to stay alert during long night prayers in the 15th century.\nC. By the 17th century, coffeehouses had spread to London and Paris, becoming hubs for political debate and earning the nickname 'penny universities'.\nD. Today, Brazil produces nearly one-third of the world's coffee, although Vietnam has become the largest grower of robusta beans, used mainly for instant coffee.`,
      sentences: [
        { text: "A reference to a religious use of coffee → ___", textEn: "Religious use of coffee → ___", answer: "B" },
        { text: "A modern statistic about production → ___", textEn: "Modern production stat → ___", answer: "D" },
        { text: "An origin story involving animals → ___", textEn: "Origin involving animals → ___", answer: "A" },
        { text: "A nickname given to early coffeehouses → ___", textEn: "Nickname for coffeehouses → ___", answer: "C" },
        { text: "A reference to a country known for robusta beans → ___", textEn: "Country known for robusta → ___", answer: "D" },
      ],
    },
  ],

  // ===== Yes / No / Not Given =====
  "ielts-reading-8": [
    {
      type: "fill-in-blank",
      instruction: `Đoạn văn sau thể hiện QUAN ĐIỂM của tác giả. Xác định YES / NO / NOT GIVEN.\n\nPassage: "In my view, university degrees are increasingly losing their value in the modern job market. Employers now prioritise practical skills and demonstrated portfolios over formal qualifications, and a number of leading tech firms have famously dropped degree requirements for engineering roles. Universities, I would argue, must adapt by integrating real-world projects rather than continuing to rely on traditional lectures."`,
      instructionEn: `The passage expresses the AUTHOR'S OPINION. Decide YES / NO / NOT GIVEN.\n\nPassage: "In my view, university degrees are increasingly losing their value in the modern job market. Employers now prioritise practical skills and demonstrated portfolios over formal qualifications, and a number of leading tech firms have famously dropped degree requirements for engineering roles. Universities, I would argue, must adapt by integrating real-world projects rather than continuing to rely on traditional lectures."`,
      sentences: [
        { text: "The author believes university degrees are becoming less valuable. → ___", textEn: "Author thinks degrees losing value. → ___", answer: "YES" },
        { text: "The author thinks employers no longer care about skills. → ___", textEn: "Employers don't value skills. → ___", answer: "NO", hint: "Tác giả nói NGƯỢC lại" },
        { text: "All universities have already integrated real-world projects. → ___", textEn: "All universities did integrate. → ___", answer: "NO", hint: "Tác giả nói cần phải làm – chứ chưa làm" },
        { text: "The author has personally worked in a tech firm. → ___", textEn: "Author worked in tech. → ___", answer: "NOT GIVEN" },
        { text: "Universities should change their teaching methods. → ___", textEn: "Universities should change. → ___", answer: "YES" },
      ],
    },
  ],

  // ===== Diagram & Flow-chart Completion =====
  "ielts-reading-9": [
    {
      type: "fill-in-blank",
      instruction: `Hoàn thành flow-chart sau bằng từ trong passage (NO MORE THAN TWO WORDS).\n\nPassage: "The water cycle begins when the sun heats the surface of oceans and lakes, causing water to evaporate into water vapour. As this vapour rises, it cools and condenses around tiny particles of dust, forming clouds. When the droplets become too heavy, they fall as precipitation – rain, snow, or hail. The water then flows over land as runoff, eventually returning to rivers and oceans."\n\nFlow-chart:\nSun heats water → (1) ___ → vapour rises and (2) ___ → forms clouds → falls as (3) ___ → runs over land as (4) ___ → returns to rivers and oceans.`,
      instructionEn: `Complete the flow-chart with NO MORE THAN TWO WORDS from the passage.\n\nPassage: "The water cycle begins when the sun heats the surface of oceans and lakes, causing water to evaporate into water vapour. As this vapour rises, it cools and condenses around tiny particles of dust, forming clouds. When the droplets become too heavy, they fall as precipitation – rain, snow, or hail. The water then flows over land as runoff, eventually returning to rivers and oceans."\n\nFlow-chart:\nSun heats water → (1) ___ → vapour rises and (2) ___ → forms clouds → falls as (3) ___ → runs over land as (4) ___ → returns to rivers and oceans.`,
      sentences: [
        { text: "(1) ___", textEn: "(1) ___", answer: "evaporation", hint: "noun, see 'evaporate'" },
        { text: "(2) ___", textEn: "(2) ___", answer: "condenses", hint: "verb" },
        { text: "(3) ___", textEn: "(3) ___", answer: "precipitation", hint: "noun" },
        { text: "(4) ___", textEn: "(4) ___", answer: "runoff", hint: "noun" },
      ],
    },
  ],

  // ===== Short-answer Questions =====
  "ielts-reading-10": [
    {
      type: "fill-in-blank",
      instruction: `Trả lời ngắn gọn (NO MORE THAN THREE WORDS) dựa trên passage.\n\nPassage: "The Sahara Desert spans roughly 9.2 million square kilometres, making it the world's largest hot desert. Daytime temperatures often reach 50°C, while at night they can drop below freezing. Despite its harsh conditions, more than 2.5 million people live in the Sahara, mainly nomadic herders who move with their camels in search of water and grazing land."`,
      instructionEn: `Answer in NO MORE THAN THREE WORDS from the passage.\n\nPassage: "The Sahara Desert spans roughly 9.2 million square kilometres, making it the world's largest hot desert. Daytime temperatures often reach 50°C, while at night they can drop below freezing. Despite its harsh conditions, more than 2.5 million people live in the Sahara, mainly nomadic herders who move with their camels in search of water and grazing land."`,
      sentences: [
        { text: "How big is the Sahara? → ___ square kilometres.", textEn: "Size of Sahara? → ___ km².", answer: "9.2 million", hint: "two words" },
        { text: "What is the highest daytime temperature mentioned? → ___", textEn: "Max daytime temp? → ___", answer: "50°C" },
        { text: "How many people live there? → more than ___", textEn: "Population? → more than ___", answer: "2.5 million" },
        { text: "What animal do the herders travel with? → ___", textEn: "Animal travelled with? → ___", answer: "camels" },
      ],
    },
  ],

  // ===== Table Completion =====
  "ielts-reading-11": [
    {
      type: "fill-in-blank",
      instruction: `Hoàn thành bảng bằng từ trong passage (NO MORE THAN TWO WORDS).\n\nPassage: "Three planets are commonly studied in school astronomy. Mercury, the smallest, has a diameter of about 4,880 km and no moons. Venus, similar in size to Earth, is the hottest planet with an average surface temperature of 465°C. Mars, often called the Red Planet, has two small moons named Phobos and Deimos and a day length almost identical to Earth's at 24.6 hours."\n\nTable:\nMercury – Diameter: (1) ___ km – Moons: (2) ___\nVenus – Surface temp: (3) ___ – Notable feature: hottest planet\nMars – Number of moons: (4) ___ – Day length: (5) ___ hours`,
      instructionEn: `Complete the table with NO MORE THAN TWO WORDS from the passage.\n\nPassage: "Three planets are commonly studied in school astronomy. Mercury, the smallest, has a diameter of about 4,880 km and no moons. Venus, similar in size to Earth, is the hottest planet with an average surface temperature of 465°C. Mars, often called the Red Planet, has two small moons named Phobos and Deimos and a day length almost identical to Earth's at 24.6 hours."\n\nTable:\nMercury – Diameter: (1) ___ km – Moons: (2) ___\nVenus – Surface temp: (3) ___ – Notable feature: hottest planet\nMars – Number of moons: (4) ___ – Day length: (5) ___ hours`,
      sentences: [
        { text: "(1) ___", textEn: "(1) ___", answer: "4,880" },
        { text: "(2) ___", textEn: "(2) ___", answer: "no moons", hint: "two words" },
        { text: "(3) ___", textEn: "(3) ___", answer: "465°C" },
        { text: "(4) ___", textEn: "(4) ___", answer: "two" },
        { text: "(5) ___", textEn: "(5) ___", answer: "24.6" },
      ],
    },
  ],

  // ===== List Selection =====
  "ielts-reading-12": [
    {
      type: "fill-in-blank",
      instruction: `Chọn 3 lợi ích của làm việc từ xa được đề cập trong passage. Viết các chữ cái A–F.\n\nOptions:\nA. Higher salary\nB. Saving commuting time\nC. Better work-life balance\nD. More face-to-face networking\nE. Reduced office costs for employers\nF. Quicker promotion\n\nPassage: "A 2024 survey of 12,000 European workers found that the most valued advantages of remote work were the elimination of long commutes and improved work-life balance. Employers, meanwhile, reported significantly lower office expenses, although they noted that team networking suffered slightly. Salary changes and promotion speed showed no clear pattern."`,
      instructionEn: `Pick the 3 benefits mentioned. Write three letters from A–F.\n\nPassage: "A 2024 survey of 12,000 European workers found that the most valued advantages of remote work were the elimination of long commutes and improved work-life balance. Employers, meanwhile, reported significantly lower office expenses, although they noted that team networking suffered slightly. Salary changes and promotion speed showed no clear pattern."`,
      sentences: [
        { text: "Benefit 1 → ___", textEn: "Benefit 1 → ___", answer: "B" },
        { text: "Benefit 2 → ___", textEn: "Benefit 2 → ___", answer: "C" },
        { text: "Benefit 3 → ___", textEn: "Benefit 3 → ___", answer: "E" },
      ],
    },
  ],

  // ===== Inference & Author's Purpose =====
  "ielts-reading-13": [
    {
      type: "fill-in-blank",
      instruction: `Đọc đoạn văn và suy luận. Chọn đáp án A/B/C/D.\n\nPassage: "It is high time that consumers stopped accepting fast fashion at face value. Behind every five-dollar T-shirt lies a chain of underpaid garment workers, polluted rivers, and mountains of textile waste. The industry's defenders point to falling prices and rising choice, but these supposed gains come at a cost we are only beginning to understand."\n\nQ1. The author's main purpose is to:\n  A. describe the history of fashion\n  B. persuade readers to question fast fashion\n  C. promote a specific clothing brand\n  D. compare prices in the fashion industry\n\nQ2. The phrase 'at face value' implies that consumers should:\n  A. trust the industry blindly\n  B. look beyond the obvious benefits\n  C. focus only on price\n  D. ignore environmental issues\n\nQ3. The author's tone is best described as:\n  A. critical\n  B. cheerful\n  C. neutral\n  D. uncertain`,
      instructionEn: `Read and infer. Pick A/B/C/D.\n\nPassage: "It is high time that consumers stopped accepting fast fashion at face value. Behind every five-dollar T-shirt lies a chain of underpaid garment workers, polluted rivers, and mountains of textile waste. The industry's defenders point to falling prices and rising choice, but these supposed gains come at a cost we are only beginning to understand."\n\nQ1. The author's main purpose is to:\n  A. describe the history of fashion\n  B. persuade readers to question fast fashion\n  C. promote a specific clothing brand\n  D. compare prices in the fashion industry\n\nQ2. The phrase 'at face value' implies that consumers should:\n  A. trust the industry blindly\n  B. look beyond the obvious benefits\n  C. focus only on price\n  D. ignore environmental issues\n\nQ3. The author's tone is best described as:\n  A. critical\n  B. cheerful\n  C. neutral\n  D. uncertain`,
      sentences: [
        { text: "Q1 → ___", textEn: "Q1 → ___", answer: "B" },
        { text: "Q2 → ___", textEn: "Q2 → ___", answer: "B" },
        { text: "Q3 → ___", textEn: "Q3 → ___", answer: "A" },
      ],
    },
  ],

  // ===== Multiple Choice - Author's Purpose =====
  "ielts-reading-14": [
    {
      type: "fill-in-blank",
      instruction: `Chọn đáp án đúng (A/B/C/D).\n\nPassage: "While many people assume that drinking eight glasses of water a day is essential, this widely repeated rule has surprisingly little scientific basis. Most adults can meet their hydration needs through a combination of drinks – tea, coffee, juice – and the moisture in food. The real signal to drink, researchers suggest, is simply thirst."\n\nQ1. The writer's purpose is to:\n  A. encourage drinking more water\n  B. challenge a popular belief about water intake\n  C. recommend specific drinks\n  D. warn about the dangers of dehydration\n\nQ2. According to the passage, hydration can come from:\n  A. only plain water\n  B. only juice and tea\n  C. various drinks and food\n  D. supplements\n\nQ3. What does the writer suggest is a reliable signal to drink?\n  A. The clock\n  B. A doctor\n  C. Thirst\n  D. The colour of urine`,
      instructionEn: `Pick A/B/C/D.\n\nPassage: "While many people assume that drinking eight glasses of water a day is essential, this widely repeated rule has surprisingly little scientific basis. Most adults can meet their hydration needs through a combination of drinks – tea, coffee, juice – and the moisture in food. The real signal to drink, researchers suggest, is simply thirst."\n\nQ1. The writer's purpose is to:\n  A. encourage drinking more water\n  B. challenge a popular belief about water intake\n  C. recommend specific drinks\n  D. warn about the dangers of dehydration\n\nQ2. According to the passage, hydration can come from:\n  A. only plain water\n  B. only juice and tea\n  C. various drinks and food\n  D. supplements\n\nQ3. What does the writer suggest is a reliable signal to drink?\n  A. The clock\n  B. A doctor\n  C. Thirst\n  D. The colour of urine`,
      sentences: [
        { text: "Q1 → ___", textEn: "Q1 → ___", answer: "B" },
        { text: "Q2 → ___", textEn: "Q2 → ___", answer: "C" },
        { text: "Q3 → ___", textEn: "Q3 → ___", answer: "C" },
      ],
    },
  ],

  // ===== Paragraph Information Matching =====
  "ielts-reading-15": [
    {
      type: "fill-in-blank",
      instruction: `Tìm đoạn (A–D) chứa thông tin sau. Đoạn có thể được dùng nhiều lần.\n\nPassage:\nA. The first practical electric light bulb was patented by Thomas Edison in 1879, though earlier inventors had built short-lived versions.\nB. Within twenty years, electric streetlights had replaced gas lamps in major American and European cities, reshaping urban nightlife.\nC. By the 1920s, ordinary households began wiring up to the grid, though rural areas in many countries waited decades longer for connection.\nD. Today, around 770 million people – mostly in sub-Saharan Africa – still live without reliable access to electricity.`,
      instructionEn: `Match the information to paragraphs A–D.\n\nPassage:\nA. The first practical electric light bulb was patented by Thomas Edison in 1879, though earlier inventors had built short-lived versions.\nB. Within twenty years, electric streetlights had replaced gas lamps in major American and European cities, reshaping urban nightlife.\nC. By the 1920s, ordinary households began wiring up to the grid, though rural areas in many countries waited decades longer for connection.\nD. Today, around 770 million people – mostly in sub-Saharan Africa – still live without reliable access to electricity.`,
      sentences: [
        { text: "A modern statistic about energy poverty → ___", textEn: "Modern energy stat → ___", answer: "D" },
        { text: "A reference to delays in rural electrification → ___", textEn: "Rural delays → ___", answer: "C" },
        { text: "Mention of an inventor and a year → ___", textEn: "Inventor + year → ___", answer: "A" },
        { text: "A description of how cities changed at night → ___", textEn: "City nights changed → ___", answer: "B" },
      ],
    },
  ],

  // ===== Yes/No/Not Given - Advanced =====
  "ielts-reading-16": [
    {
      type: "fill-in-blank",
      instruction: `Xác định YES / NO / NOT GIVEN cho mỗi nhận định về QUAN ĐIỂM của tác giả.\n\nPassage: "Critics often blame video games for rising rates of teenage aggression, yet the evidence is far weaker than headlines suggest. Several long-term studies have failed to show any direct causal link, and countries with the highest gaming rates do not show the highest violence rates. In my view, parents would do better to focus on sleep, social isolation and excessive screen time than on the games themselves."`,
      instructionEn: `Decide YES / NO / NOT GIVEN.\n\nPassage: "Critics often blame video games for rising rates of teenage aggression, yet the evidence is far weaker than headlines suggest. Several long-term studies have failed to show any direct causal link, and countries with the highest gaming rates do not show the highest violence rates. In my view, parents would do better to focus on sleep, social isolation and excessive screen time than on the games themselves."`,
      sentences: [
        { text: "The author believes the evidence linking games to aggression is weak. → ___", textEn: "Evidence weak. → ___", answer: "YES" },
        { text: "The author thinks all video games are completely harmless. → ___", textEn: "All games harmless. → ___", answer: "NOT GIVEN", hint: "Tác giả không nói cực đoan như vậy" },
        { text: "Countries with the most gamers have the most violence. → ___", textEn: "Most gamers = most violence. → ___", answer: "NO" },
        { text: "Parents should worry more about sleep than about the games. → ___", textEn: "Sleep more important. → ___", answer: "YES" },
        { text: "The author has children of his/her own. → ___", textEn: "Author has children. → ___", answer: "NOT GIVEN" },
      ],
    },
  ],

  // ===== Short Answer Questions (advanced) =====
  "ielts-reading-17": [
    {
      type: "fill-in-blank",
      instruction: `Trả lời NO MORE THAN TWO WORDS từ passage.\n\nPassage: "The Olympic Games were revived in their modern form in 1896, when 241 athletes from 14 countries competed in Athens. The first Winter Olympics took place 28 years later in Chamonix, France. Today, the event hosts over 11,000 athletes from more than 200 nations and is broadcast to a global audience exceeding 3 billion viewers."`,
      instructionEn: `Answer in NO MORE THAN TWO WORDS.\n\nPassage: "The Olympic Games were revived in their modern form in 1896, when 241 athletes from 14 countries competed in Athens. The first Winter Olympics took place 28 years later in Chamonix, France. Today, the event hosts over 11,000 athletes from more than 200 nations and is broadcast to a global audience exceeding 3 billion viewers."`,
      sentences: [
        { text: "In what year were the modern Olympics revived? → ___", textEn: "Year revived → ___", answer: "1896" },
        { text: "Where were the first Winter Olympics held? → ___", textEn: "First Winter Olympics → ___", answer: "Chamonix" },
        { text: "How many athletes attend today? → over ___", textEn: "Athletes today → ___", answer: "11,000" },
        { text: "How many TV viewers globally? → over ___ billion.", textEn: "TV viewers → ___ billion", answer: "3" },
      ],
    },
  ],

  // ===== Skimming & Scanning - Speed Reading =====
  "ielts-reading-18": [
    {
      type: "fill-in-blank",
      instruction: `Đọc nhanh (skim 60 giây – scan keyword) rồi trả lời.\n\nPassage: "Tokyo, Japan's capital, is home to roughly 14 million people in the city proper and over 37 million in the wider metropolitan area, making it the most populous urban region in the world. Founded as the small fishing village of Edo, it became the political centre of Japan in 1603 and was renamed Tokyo, meaning 'Eastern Capital', in 1868. The city is famous today for its efficient subway system, which carries more than 8 million passengers each day."`,
      instructionEn: `Skim then scan. Answer.\n\nPassage: "Tokyo, Japan's capital, is home to roughly 14 million people in the city proper and over 37 million in the wider metropolitan area, making it the most populous urban region in the world. Founded as the small fishing village of Edo, it became the political centre of Japan in 1603 and was renamed Tokyo, meaning 'Eastern Capital', in 1868. The city is famous today for its efficient subway system, which carries more than 8 million passengers each day."`,
      sentences: [
        { text: "Population of Tokyo metropolitan area: over ___ million.", textEn: "Metro pop: ___ million", answer: "37" },
        { text: "Year Edo became Japan's political centre: ___.", textEn: "Year political centre: ___", answer: "1603" },
        { text: "Year Edo was renamed Tokyo: ___.", textEn: "Renamed: ___", answer: "1868" },
        { text: "'Tokyo' means '___ Capital'.", textEn: "Meaning: ___ Capital", answer: "Eastern" },
        { text: "Daily subway passengers: over ___ million.", textEn: "Subway: ___ million/day", answer: "8" },
      ],
    },
  ],

  // ===== Classification Questions =====
  "ielts-reading-19": [
    {
      type: "fill-in-blank",
      instruction: `Phân loại mỗi tuyên bố theo:\n  A. Cá heo (Dolphins)\n  B. Cá voi (Whales)\n  C. Cả hai (Both)\n\nPassage: "Dolphins and whales are both marine mammals belonging to the order Cetacea. Dolphins are generally smaller, rarely exceeding four metres in length, and live mainly in coastal waters in groups called pods. Whales, by contrast, can grow up to 30 metres long and many species undertake long migrations across oceans. Both groups breathe air through blowholes and communicate using complex sounds, but only whales are known for the deep, structured 'songs' produced by males during mating season."`,
      instructionEn: `Classify each statement as A (Dolphins) / B (Whales) / C (Both).\n\nPassage: "Dolphins and whales are both marine mammals belonging to the order Cetacea. Dolphins are generally smaller, rarely exceeding four metres in length, and live mainly in coastal waters in groups called pods. Whales, by contrast, can grow up to 30 metres long and many species undertake long migrations across oceans. Both groups breathe air through blowholes and communicate using complex sounds, but only whales are known for the deep, structured 'songs' produced by males during mating season."`,
      sentences: [
        { text: "Belong to the order Cetacea → ___", textEn: "Cetacea → ___", answer: "C" },
        { text: "Can grow up to 30 metres long → ___", textEn: "30 m long → ___", answer: "B" },
        { text: "Live in coastal waters in pods → ___", textEn: "Pods, coastal → ___", answer: "A" },
        { text: "Breathe through blowholes → ___", textEn: "Blowholes → ___", answer: "C" },
        { text: "Males sing structured songs during mating → ___", textEn: "Sing songs → ___", answer: "B" },
      ],
    },
  ],
};

