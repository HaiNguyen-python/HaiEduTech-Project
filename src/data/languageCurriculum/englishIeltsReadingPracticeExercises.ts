// Extra IELTS Reading practice exercises - short passages + category-specific questions
// Merged into existing reading lessons in englishIelts.ts so each lesson has hands-on practice.
import type { Exercise } from "./types";

export const ieltsReadingPracticeExercises: Record<string, Exercise[]> = {
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
      instructionEn: `Match a heading (i–iv) to each paragraph A–D.\nHeadings:\n  i. The cost of going green\n  ii. A historic shift in power generation\n  iii. Storage – the missing piece\n  iv. Public attitudes turning positive\n\nSee the passage in the Vietnamese instruction above.`,
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
      instruction: `Hoàn thành đoạn tóm tắt bằng từ trong word list:\n[ artificial · sleep · efficiency · attention · screens ]\n\nPassage: "Recent neuroscience research suggests that exposure to bright screens late at night suppresses melatonin, the hormone that regulates our sleep cycle. Participants who used phones for an hour before bed took, on average, 30 minutes longer to fall asleep and reported reduced attention the following day. Researchers warn that long-term disruption may also lower work efficiency."\n\nSummary: Late-night use of (1)___ blocks the production of melatonin, delaying (2)___ by about half an hour. The next day, users showed reduced (3)___ and, over time, declining (4)___ at work.`,
      instructionEn: `Complete the summary with words from the list:\n[ artificial · sleep · efficiency · attention · screens ]\n\nPassage: "Recent neuroscience research suggests that exposure to bright screens late at night suppresses melatonin, the hormone that regulates our sleep cycle. Participants who used phones for an hour before bed took, on average, 30 minutes longer to fall asleep and reported reduced attention the following day. Researchers warn that long-term disruption may also lower work efficiency."`,
      sentences: [
        { text: "(1) ___", textEn: "(1) ___", answer: "screens", hint: "noun plural" },
        { text: "(2) ___", textEn: "(2) ___", answer: "sleep", hint: "noun" },
        { text: "(3) ___", textEn: "(3) ___", answer: "attention", hint: "noun" },
        { text: "(4) ___", textEn: "(4) ___", answer: "efficiency", hint: "noun" },
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
      instructionEn: `Match the information to paragraphs A–D (paragraphs may be reused).`,
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
      instructionEn: `The passage expresses the AUTHOR'S OPINION. Decide YES / NO / NOT GIVEN.`,
      sentences: [
        { text: "The author believes university degrees are becoming less valuable. → ___", textEn: "Author thinks degrees losing value. → ___", answer: "YES" },
        { text: "The author thinks employers no longer care about skills. → ___", textEn: "Employers don't value skills. → ___", answer: "NO", hint: "Tác giả nói NGƯỢC lại" },
        { text: "All universities have already integrated real-world projects. → ___", textEn: "All universities did integrate. → ___", answer: "NO", hint: "Tác giả nói cần phải làm – chứ chưa làm" },
        { text: "The author has personally worked in a tech firm. → ___", textEn: "Author worked in tech. → ___", answer: "NOT GIVEN" },
        { text: "Universities should change their teaching methods. → ___", textEn: "Universities should change. → ___", answer: "YES" },
      ],
    },
  ],
};
