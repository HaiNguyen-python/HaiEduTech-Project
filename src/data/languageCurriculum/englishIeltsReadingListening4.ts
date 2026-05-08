// IELTS Reading & Listening Expansion 4
// Adds longer IELTS-standard passages and more practice exercises.
import type { LanguageLesson } from "./types";

// ============================================================
// READING - 5 new practice lessons with long IELTS-style passages
// ============================================================

export const ieltsReadingExpansion4Lessons: LanguageLesson[] = [
  {
    id: "ielts-reading-20",
    title: "Reading Practice - The History of Coffee",
    titleEn: "Reading Practice - The History of Coffee",
    level: 3,
    difficulty: "intermediate",
    theory: `**Practice Passage 1 — The History of Coffee (≈320 words)**

Bài đọc dài chuẩn IELTS Academic Reading. Hãy đọc kỹ đoạn văn, sau đó trả lời các dạng câu hỏi: Fill in the blanks, True/False/Not Given và Multiple Choice.

**Chiến lược làm bài:**
1. Skim toàn bộ đoạn văn trong 2 phút để nắm ý chính.
2. Đọc câu hỏi, gạch chân keywords.
3. Scan đoạn văn để tìm paraphrase của keyword.
4. Trả lời theo đúng word limit.`,
    theoryEn: `**Practice Passage 1 — The History of Coffee (~320 words)**

A full-length IELTS Academic Reading passage. Read the passage carefully, then answer fill-in-the-blank, True/False/Not Given and Multiple Choice questions.

**Strategy:**
1. Skim the passage in 2 minutes for the main idea.
2. Read each question and underline keywords.
3. Scan the passage for paraphrases.
4. Respect the word limit.`,
    proTips: [
      "Đừng đọc từng chữ - skim trước rồi mới scan tìm đáp án",
      "Đáp án thường xuất hiện theo thứ tự câu hỏi trong đoạn văn",
      "T/F/NG: NG khi thông tin KHÔNG có trong bài, F khi bài nói ngược lại",
    ],
    proTipsEn: [
      "Never read word by word - skim first, then scan for answers",
      "Answers usually appear in the same order as the questions",
      "T/F/NG: NG = info not in passage; F = passage contradicts the statement",
    ],
    exercises: [
      {
        type: "fill-in-blank" as const,
        instruction: "Đọc đoạn văn rồi điền từ thích hợp (NO MORE THAN TWO WORDS).",
        instructionEn: `Read the passage and complete the sentences with NO MORE THAN TWO WORDS from the text.

Passage: Coffee, today one of the world's most widely traded commodities, has a remarkably contested origin. Most historians agree that coffee cultivation began in the highlands of Ethiopia, where, according to legend, a goat herder named Kaldi noticed his animals becoming unusually energetic after eating the red cherries of a certain wild shrub. By the 15th century, the beans were being roasted and brewed in the Sufi monasteries of Yemen, where the resulting drink helped monks stay awake during long evening prayers.

From Yemen, coffee travelled along trade routes to Mecca, Cairo and Istanbul, where the first true coffeehouses, known as "qahveh khaneh", opened in the early 1500s. These establishments quickly became hubs of intellectual exchange — patrons gathered to discuss politics, music and literature, earning the cafés the nickname "Schools of the Wise". European travellers carried the beverage westward in the 17th century, and by 1700 London alone had more than two thousand coffeehouses, each catering to merchants, scientists or artists.

Colonial expansion transformed coffee from a luxury into a global crop. The Dutch established plantations in Java, the French in the Caribbean and the Portuguese in Brazil, which by 1850 was producing nearly half of the world's supply. This dramatic expansion, however, came at considerable human cost: vast plantations relied heavily on enslaved labour, a legacy that continues to shape coffee-producing regions today.

In the 20th century, technological breakthroughs — instant coffee, vacuum packaging and, later, the espresso machine — turned coffee into a daily ritual for hundreds of millions of consumers. The recent rise of "third-wave" coffee culture has placed renewed emphasis on origin, sustainability and the craft of brewing, returning attention to the small farmers whose work first made this beverage possible.`,
        sentences: [
          { text: "Coffee cultivation is widely believed to have begun in the highlands of ___.", textEn: "Coffee cultivation is widely believed to have begun in the highlands of ___.", answer: "Ethiopia", hint: "country in East Africa" },
          { text: "In Yemen, coffee was first brewed by ___ monks for evening prayers.", textEn: "In Yemen, coffee was first brewed by ___ monks for evening prayers.", answer: "Sufi", hint: "Islamic mystical tradition" },
          { text: "The first coffeehouses were known as 'qahveh khaneh' or 'Schools of the ___'.", textEn: "The first coffeehouses were known as 'qahveh khaneh' or 'Schools of the ___'.", answer: "Wise", hint: "intellectual people" },
          { text: "By 1700, the city of ___ had more than 2,000 coffeehouses.", textEn: "By 1700, the city of ___ had more than 2,000 coffeehouses.", answer: "London", hint: "British capital" },
          { text: "By 1850, ___ produced nearly half of the world's coffee supply.", textEn: "By 1850, ___ produced nearly half of the world's coffee supply.", answer: "Brazil", hint: "South American country" },
          { text: "Colonial plantations relied heavily on ___ labour.", textEn: "Colonial plantations relied heavily on ___ labour.", answer: "enslaved", hint: "forced, unfree" },
          { text: "The modern movement focusing on origin and craft is called ___ coffee culture.", textEn: "The modern movement focusing on origin and craft is called ___ coffee culture.", answer: "third-wave", hint: "the current era" },
        ],
      },
    ],
    quiz: [
      { question: "According to the passage, who legendarily discovered coffee?", options: ["A Yemeni monk", "A Dutch trader", "A goat herder named Kaldi", "An Ethiopian king"], answer: 2, explanation: "The legend credits a goat herder named Kaldi who noticed his goats' energy after eating the cherries." },
      { question: "Why did Sufi monks drink coffee?", options: ["To celebrate festivals", "To stay awake during long evening prayers", "To trade with merchants", "To treat illnesses"], answer: 1, explanation: "The passage states monks used coffee to stay awake during evening prayers." },
      { question: "TRUE / FALSE / NOT GIVEN: London had over 3,000 coffeehouses by 1700.", options: ["TRUE", "FALSE", "NOT GIVEN"], answer: 1, explanation: "The passage says 'more than two thousand', so 3,000 is FALSE based on the figure given." },
      { question: "TRUE / FALSE / NOT GIVEN: Coffee was first introduced to Europe by Dutch traders.", options: ["TRUE", "FALSE", "NOT GIVEN"], answer: 2, explanation: "The passage doesn't specify who first brought coffee to Europe — only that 'European travellers' carried it westward. NOT GIVEN." },
      { question: "What does the passage suggest about colonial coffee expansion?", options: ["It improved working conditions", "It had serious human costs related to slavery", "It was peaceful and beneficial", "It was led by Brazilian farmers"], answer: 1, explanation: "The passage explicitly mentions reliance on enslaved labour and its lasting legacy." },
      { question: "Which technological development is NOT mentioned in the passage?", options: ["Instant coffee", "Vacuum packaging", "Espresso machines", "Cold brew systems"], answer: 3, explanation: "Cold brew systems are not mentioned — the others all are." },
    ],
  },
  {
    id: "ielts-reading-21",
    title: "Reading Practice - Urban Beekeeping",
    titleEn: "Reading Practice - Urban Beekeeping",
    level: 3,
    difficulty: "intermediate",
    theory: `**Practice Passage 2 — The Rise of Urban Beekeeping (≈300 words)**

Bài đọc khoa học/môi trường chuẩn IELTS. Tập trung phân biệt fact và opinion, cũng như nhận diện paraphrase.`,
    theoryEn: `**Practice Passage 2 — The Rise of Urban Beekeeping (~300 words)**

A science/environment passage in IELTS style. Focus on distinguishing fact from opinion and spotting paraphrases.`,
    proTips: [
      "Trong T/F/NG, mọi từ định lượng (always, never, only) đều cần kiểm tra kỹ",
      "Paraphrase thường thay đổi cấu trúc câu chứ không chỉ thay từ đồng nghĩa",
    ],
    proTipsEn: [
      "In T/F/NG, watch quantifiers like always, never, only - they often signal FALSE",
      "Paraphrases often restructure the sentence, not just swap synonyms",
    ],
    exercises: [
      {
        type: "fill-in-blank" as const,
        instruction: "Đọc đoạn văn rồi điền từ thích hợp (ONE WORD ONLY).",
        instructionEn: `Read the passage and complete the sentences with ONE WORD ONLY from the text.

Passage: Over the past two decades, beekeeping has quietly transformed from a rural occupation into an unlikely urban hobby. Cities from Paris to New York now host thousands of registered hives, perched on rooftops, balconies and even the tops of luxury hotels. The phenomenon is partly driven by alarm over the global decline of honeybee populations, which has been linked to pesticide use, habitat loss and the spread of parasitic mites.

Surprisingly, urban environments often suit bees better than the surrounding countryside. Cities offer a remarkable diversity of flowering plants — from park trees to garden flowers and even weeds growing through pavement cracks — providing nectar from early spring until late autumn. Crucially, urban areas typically lack the broad-spectrum agricultural pesticides that devastate rural colonies. Studies in London and Berlin have shown that city honey can contain pollen from more than two hundred different plant species, far more than honey produced on agricultural land.

The benefits of urban beekeeping extend beyond honey production. Bees pollinate fruit trees and vegetable gardens, supporting community food projects and improving local biodiversity. Several cities, including Toronto and Melbourne, now run educational programmes that teach schoolchildren about pollinators, hoping to nurture a new generation of conservation-minded citizens.

Critics, however, warn against unregulated growth. When too many hives are placed in a small area, managed honeybees may outcompete wild bees and other pollinators, potentially harming the very ecosystems they are intended to support. Experts therefore recommend a balanced approach: encouraging beekeeping where appropriate, while also protecting native pollinators through wildflower planting and the creation of pesticide-free green spaces.`,
        sentences: [
          { text: "Urban hives are often placed on the ___ of buildings.", textEn: "Urban hives are often placed on the ___ of buildings.", answer: "rooftops", hint: "top of a building" },
          { text: "Pesticide use, habitat loss and parasitic ___ are linked to bee decline.", textEn: "Pesticide use, habitat loss and parasitic ___ are linked to bee decline.", answer: "mites", hint: "tiny arachnids" },
          { text: "City honey may contain pollen from over 200 plant ___.", textEn: "City honey may contain pollen from over 200 plant ___.", answer: "species", hint: "biological types" },
          { text: "Bees support local ___ by pollinating fruit and vegetable gardens.", textEn: "Bees support local ___ by pollinating fruit and vegetable gardens.", answer: "biodiversity", hint: "variety of life" },
          { text: "Critics warn that managed bees may ___ wild pollinators.", textEn: "Critics warn that managed bees may ___ wild pollinators.", answer: "outcompete", hint: "win against in competition" },
          { text: "Experts recommend creating pesticide-free ___ spaces.", textEn: "Experts recommend creating pesticide-free ___ spaces.", answer: "green", hint: "natural, vegetated" },
        ],
      },
    ],
    quiz: [
      { question: "According to the passage, why are cities often good for bees?", options: ["They are warmer", "They have diverse flowering plants and few pesticides", "They are quieter than countryside", "They have fewer predators"], answer: 1, explanation: "The passage cites plant diversity and absence of broad-spectrum agricultural pesticides." },
      { question: "TRUE / FALSE / NOT GIVEN: Urban honey usually contains pollen from fewer plants than rural honey.", options: ["TRUE", "FALSE", "NOT GIVEN"], answer: 1, explanation: "The passage states city honey contains pollen from far MORE species — so FALSE." },
      { question: "Which city is mentioned as running educational programmes for children?", options: ["Paris", "London", "Toronto", "Berlin"], answer: 2, explanation: "Toronto and Melbourne are mentioned as cities with educational programmes." },
      { question: "TRUE / FALSE / NOT GIVEN: Urban beekeeping increases honey export profits.", options: ["TRUE", "FALSE", "NOT GIVEN"], answer: 2, explanation: "Export profits are not discussed in the passage." },
      { question: "What is the main concern of critics?", options: ["Honey quality", "Cost of beekeeping equipment", "Competition between managed and wild bees", "Risk of stings in cities"], answer: 2, explanation: "Critics worry that managed honeybees outcompete wild pollinators." },
    ],
  },
  {
    id: "ielts-reading-22",
    title: "Reading Practice - The Science of Sleep",
    titleEn: "Reading Practice - The Science of Sleep",
    level: 4,
    difficulty: "advanced",
    theory: `**Practice Passage 3 — The Science of Sleep (≈340 words)**

Bài đọc academic chuyên sâu về thần kinh học. Luyện kỹ năng đọc câu phức và xác định ý chính của từng đoạn.`,
    theoryEn: `**Practice Passage 3 — The Science of Sleep (~340 words)**

A dense academic passage on neuroscience. Practise parsing complex sentences and identifying paragraph main ideas.`,
    proTips: [
      "Câu chủ đề thường nằm ở đầu hoặc cuối đoạn",
      "Với matching headings, đọc câu đầu và câu cuối trước khi đọc giữa",
    ],
    proTipsEn: [
      "Topic sentences usually open or close a paragraph",
      "For matching headings, read the first and last sentence before the middle",
    ],
    exercises: [
      {
        type: "fill-in-blank" as const,
        instruction: "Đọc đoạn văn rồi hoàn thành câu tóm tắt.",
        instructionEn: `Read the passage and complete the summary sentences with words from the text.

Passage: For most of human history, sleep was treated as a passive state — simply the absence of waking activity. Modern neuroscience has overturned that view entirely. Far from shutting down, the brain at night is engaged in a complex sequence of operations that are essential to memory, immunity and emotional regulation.

A typical adult cycles through four to six sleep stages each night. The first three stages, collectively known as non-REM sleep, are characterised by progressively slower brain waves and a steep drop in body temperature and heart rate. During the deepest stage, sometimes called slow-wave sleep, the glymphatic system becomes highly active, flushing out metabolic waste products that accumulate during the day. Researchers believe this nightly cleansing may help protect the brain against neurodegenerative diseases such as Alzheimer's.

The fourth stage, REM (rapid eye movement) sleep, is dramatically different. Brain activity surges to near-waking levels, the eyes dart beneath closed lids, and most vivid dreams occur. Crucially, the body becomes temporarily paralysed, preventing sleepers from acting out their dreams. REM sleep appears to play a central role in consolidating emotional memories and creative problem-solving — a phenomenon often summarised by the advice to "sleep on it" before making a difficult decision.

Despite this growing understanding, modern lifestyles undermine sleep on a vast scale. Artificial lighting, late-night screen use and inconsistent schedules disrupt the circadian rhythm, the internal 24-hour clock that governs hormone release. Chronic sleep deprivation — defined as fewer than six hours per night over an extended period — has been associated with weakened immunity, weight gain and a substantially elevated risk of cardiovascular disease.

Public health experts increasingly argue that sleep deserves the same attention as diet and exercise, and several countries are now considering official sleep guidelines alongside long-standing nutritional recommendations.`,
        sentences: [
          { text: "Adults typically cycle through 4 to 6 sleep ___ per night.", textEn: "Adults typically cycle through 4 to 6 sleep ___ per night.", answer: "stages", hint: "phases" },
          { text: "The deepest stage is sometimes called ___ sleep.", textEn: "The deepest stage is sometimes called ___ sleep.", answer: "slow-wave", hint: "type of brain wave" },
          { text: "The ___ system flushes out brain waste during deep sleep.", textEn: "The ___ system flushes out brain waste during deep sleep.", answer: "glymphatic", hint: "brain cleansing system" },
          { text: "During REM sleep, the body becomes temporarily ___.", textEn: "During REM sleep, the body becomes temporarily ___.", answer: "paralysed", hint: "unable to move" },
          { text: "Modern lifestyles disrupt the ___ rhythm.", textEn: "Modern lifestyles disrupt the ___ rhythm.", answer: "circadian", hint: "24-hour internal clock" },
          { text: "Chronic sleep deprivation increases the risk of ___ disease.", textEn: "Chronic sleep deprivation increases the risk of ___ disease.", answer: "cardiovascular", hint: "heart-related" },
        ],
      },
    ],
    quiz: [
      { question: "How was sleep traditionally viewed?", options: ["As an active state of repair", "As a passive absence of waking activity", "As a spiritual journey", "As a luxury for the rich"], answer: 1, explanation: "The opening line says sleep was treated as a passive state." },
      { question: "What does the glymphatic system do during sleep?", options: ["Generates dreams", "Stores memories", "Flushes out metabolic waste", "Regulates body temperature"], answer: 2, explanation: "The passage states the glymphatic system flushes metabolic waste from the brain." },
      { question: "TRUE / FALSE / NOT GIVEN: REM sleep is associated with creative problem-solving.", options: ["TRUE", "FALSE", "NOT GIVEN"], answer: 0, explanation: "The passage explicitly links REM to consolidating memory and creative problem-solving." },
      { question: "TRUE / FALSE / NOT GIVEN: All countries now have official sleep guidelines.", options: ["TRUE", "FALSE", "NOT GIVEN"], answer: 1, explanation: "The passage says 'several countries are now CONSIDERING' guidelines — not that all have them. FALSE." },
      { question: "What is chronic sleep deprivation defined as?", options: ["Fewer than 8 hours per night", "Fewer than 6 hours per night over an extended period", "One sleepless night", "Sleeping irregularly"], answer: 1, explanation: "The passage gives the specific definition: fewer than six hours per night for an extended period." },
      { question: "What is the author's overall purpose?", options: ["To entertain readers with sleep stories", "To inform readers about modern understanding of sleep and its importance", "To sell sleep products", "To criticise scientists"], answer: 1, explanation: "The passage informs and gently advocates that sleep deserves attention like diet and exercise." },
    ],
  },
  {
    id: "ielts-reading-23",
    title: "Reading Practice - The Future of Solar Power",
    titleEn: "Reading Practice - The Future of Solar Power",
    level: 4,
    difficulty: "advanced",
    theory: `**Practice Passage 4 — The Future of Solar Power (≈330 words)**

Bài đọc về công nghệ và năng lượng tái tạo. Tập trung kỹ năng matching information và xử lý số liệu.`,
    theoryEn: `**Practice Passage 4 — The Future of Solar Power (~330 words)**

A passage on technology and renewable energy. Practise matching-information skills and handling numerical data.`,
    proTips: [
      "Số liệu và năm tháng thường là điểm mấu chốt - đọc 2 lần để chắc chắn",
      "Khi gặp tỉ lệ phần trăm, kiểm tra base (% của cái gì)",
    ],
    proTipsEn: [
      "Numbers and dates are often pivotal - read them twice",
      "With percentages, check the base — % of what?",
    ],
    exercises: [
      {
        type: "fill-in-blank" as const,
        instruction: "Đọc bài và điền từ/số (NO MORE THAN TWO WORDS AND/OR A NUMBER).",
        instructionEn: `Read the passage and complete the sentences with NO MORE THAN TWO WORDS AND/OR A NUMBER.

Passage: A decade ago, solar power was often dismissed as too expensive to compete with fossil fuels. Today, it is the cheapest source of new electricity in most parts of the world. Between 2010 and 2023, the cost of solar photovoltaic (PV) modules fell by approximately 90 per cent, driven by manufacturing improvements, economies of scale and aggressive government policy in countries such as Germany and China.

The technology itself has also evolved rapidly. Conventional silicon panels still dominate the market, but a new generation of perovskite cells promises higher efficiency at lower production cost. In laboratory tests, tandem perovskite-silicon cells have already exceeded 33 per cent efficiency, well above the practical limit of around 26 per cent for pure silicon. Commercial deployment is expected before 2030, although researchers must first solve persistent problems with long-term durability.

Solar is also moving beyond the rooftop. Large-scale "solar farms" now cover thousands of hectares in deserts from Morocco to Australia, while floating arrays — installed on reservoirs and irrigation canals — reduce evaporation and free up valuable land. Perhaps the most innovative deployment is agrivoltaics: the practice of growing shade-tolerant crops directly beneath elevated solar panels. Trials in France and Japan have shown that certain crops, including lettuce, berries and even some grape varieties, can thrive under partial shade while the panels generate clean electricity above.

Despite these advances, significant challenges remain. Solar generation is intermittent, requiring substantial investment in battery storage and grid upgrades. Mining the materials for panels — particularly silver and rare metals — raises environmental and ethical concerns. Recycling end-of-life panels, which can contain hazardous substances, is still in its infancy. Nevertheless, most analysts agree that solar will supply at least 30 per cent of global electricity by 2050, fundamentally reshaping the energy landscape.`,
        sentences: [
          { text: "Between 2010 and 2023, solar PV module costs fell by about ___ per cent.", textEn: "Between 2010 and 2023, solar PV module costs fell by about ___ per cent.", answer: "90", hint: "huge reduction" },
          { text: "Tandem perovskite-silicon cells have exceeded ___ per cent efficiency in labs.", textEn: "Tandem perovskite-silicon cells have exceeded ___ per cent efficiency in labs.", answer: "33", hint: "lab record" },
          { text: "Floating solar arrays help reduce ___ from reservoirs.", textEn: "Floating solar arrays help reduce ___ from reservoirs.", answer: "evaporation", hint: "water loss" },
          { text: "The practice of growing crops under solar panels is called ___.", textEn: "The practice of growing crops under solar panels is called ___.", answer: "agrivoltaics", hint: "agriculture + photovoltaics" },
          { text: "Solar is intermittent, so it requires investment in ___ storage.", textEn: "Solar is intermittent, so it requires investment in ___ storage.", answer: "battery", hint: "rechargeable cells" },
          { text: "Analysts predict solar will supply at least 30% of electricity by ___.", textEn: "Analysts predict solar will supply at least 30% of electricity by ___.", answer: "2050", hint: "mid-century" },
        ],
      },
    ],
    quiz: [
      { question: "Which factors helped reduce solar costs?", options: ["Reduced demand", "Manufacturing improvements, scale and government policy", "Higher oil prices alone", "Decreased silicon supply"], answer: 1, explanation: "The passage cites manufacturing, economies of scale and government policy." },
      { question: "TRUE / FALSE / NOT GIVEN: Perovskite cells are already widely sold commercially.", options: ["TRUE", "FALSE", "NOT GIVEN"], answer: 1, explanation: "Commercial deployment is 'expected before 2030', not yet widespread. FALSE." },
      { question: "What is one advantage of agrivoltaics?", options: ["Reduces panel cost", "Allows crops and electricity generation on the same land", "Eliminates the need for water", "Removes need for batteries"], answer: 1, explanation: "Agrivoltaics combines crop growing with solar generation on the same land." },
      { question: "TRUE / FALSE / NOT GIVEN: Australia has built solar farms covering thousands of hectares.", options: ["TRUE", "FALSE", "NOT GIVEN"], answer: 0, explanation: "The passage mentions large solar farms in deserts 'from Morocco to Australia'. TRUE." },
      { question: "Which is NOT mentioned as a challenge for solar?", options: ["Intermittency", "Mining concerns", "Recycling of panels", "Lack of sunlight"], answer: 3, explanation: "Lack of sunlight is not listed; the passage cites intermittency, mining and recycling." },
      { question: "TRUE / FALSE / NOT GIVEN: Solar panel recycling is a fully solved problem.", options: ["TRUE", "FALSE", "NOT GIVEN"], answer: 1, explanation: "The passage says recycling 'is still in its infancy' — not solved. FALSE." },
    ],
  },
  {
    id: "ielts-reading-24",
    title: "Reading Practice - The Mystery of Stonehenge",
    titleEn: "Reading Practice - The Mystery of Stonehenge",
    level: 3,
    difficulty: "intermediate",
    theory: `**Practice Passage 5 — The Mystery of Stonehenge (≈310 words)**

Bài đọc lịch sử/khảo cổ. Luyện dạng câu hỏi Yes/No/Not Given để phân biệt với T/F/NG.`,
    theoryEn: `**Practice Passage 5 — The Mystery of Stonehenge (~310 words)**

A history/archaeology passage. Practise Yes/No/Not Given to contrast with True/False/Not Given.`,
    proTips: [
      "Y/N/NG dùng cho ý kiến/quan điểm; T/F/NG dùng cho fact",
      "Khi câu hỏi nói 'researchers believe', tìm các verb như 'argue', 'suggest', 'claim' trong bài",
    ],
    proTipsEn: [
      "Y/N/NG = views/opinions; T/F/NG = facts",
      "When a question says 'researchers believe', look for verbs like argue, suggest, claim",
    ],
    exercises: [
      {
        type: "fill-in-blank" as const,
        instruction: "Đọc đoạn văn rồi điền từ thích hợp.",
        instructionEn: `Read the passage and complete the sentences with words from the text.

Passage: For more than four thousand years, the circle of giant stones on Salisbury Plain in southern England has stood as one of the world's most enduring puzzles. Stonehenge was built in several phases between roughly 3000 BC and 1500 BC, long before written records existed in Britain. As a result, every theory about its purpose must be reconstructed from physical evidence alone.

The most striking feature of the monument is its alignment. On the morning of the summer solstice, the sun rises directly over the so-called Heel Stone, sending a beam of light through the central archway. A similar but reversed alignment occurs at the winter solstice. This precision has convinced most archaeologists that Stonehenge served, at least in part, as a vast astronomical calendar — a place where Neolithic communities could mark the changing seasons and time their agricultural activities.

Other theories propose more spiritual roles. The discovery of nearly sixty cremation burials within and around the monument suggests that it functioned as a major burial ground, possibly for elite families. Some scholars argue that it was also a centre for healing: chemical analysis of skeletal remains shows that many of the people buried at Stonehenge had travelled hundreds of kilometres, perhaps in search of a cure.

Equally remarkable is the engineering achievement. The smaller "bluestones" were quarried in the Preseli Hills of Wales, more than 220 kilometres away, and transported across rivers and rough terrain without wheels or metal tools. The much larger sarsen stones, some weighing over 25 tonnes, were dragged from the Marlborough Downs, around 30 kilometres distant. Exactly how Neolithic builders moved them remains a subject of vigorous debate among modern engineers.`,
        sentences: [
          { text: "Stonehenge was built between roughly 3000 BC and ___ BC.", textEn: "Stonehenge was built between roughly 3000 BC and ___ BC.", answer: "1500", hint: "end date" },
          { text: "On the summer solstice, the sun rises over the ___ Stone.", textEn: "On the summer solstice, the sun rises over the ___ Stone.", answer: "Heel", hint: "named outlier stone" },
          { text: "About sixty ___ burials have been found at the site.", textEn: "About sixty ___ burials have been found at the site.", answer: "cremation", hint: "burned remains" },
          { text: "The smaller stones are called ___.", textEn: "The smaller stones are called ___.", answer: "bluestones", hint: "color in name" },
          { text: "The bluestones were quarried in the Preseli Hills of ___.", textEn: "The bluestones were quarried in the Preseli Hills of ___.", answer: "Wales", hint: "UK region" },
          { text: "The largest sarsen stones weigh over ___ tonnes.", textEn: "The largest sarsen stones weigh over ___ tonnes.", answer: "25", hint: "a number" },
        ],
      },
    ],
    quiz: [
      { question: "YES / NO / NOT GIVEN: Most archaeologists believe Stonehenge served as an astronomical calendar.", options: ["YES", "NO", "NOT GIVEN"], answer: 0, explanation: "The passage says 'this precision has convinced most archaeologists' it served as a calendar." },
      { question: "YES / NO / NOT GIVEN: Researchers have proven that Stonehenge was the most important religious site in Europe.", options: ["YES", "NO", "NOT GIVEN"], answer: 2, explanation: "No claim about being most important in Europe is made. NOT GIVEN." },
      { question: "Why might Stonehenge have been a centre for healing?", options: ["The stones contain medicinal minerals", "Skeletons show people travelled long distances, possibly for cures", "Ancient texts describe it as a hospital", "It is near a hot spring"], answer: 1, explanation: "Chemical analysis showed long-distance travel, suggesting healing pilgrimages." },
      { question: "How far were the bluestones transported?", options: ["30 km", "Over 220 km", "1000 km", "It is unknown"], answer: 1, explanation: "The bluestones travelled more than 220 km from the Preseli Hills." },
      { question: "TRUE / FALSE / NOT GIVEN: Neolithic builders used metal tools to move the stones.", options: ["TRUE", "FALSE", "NOT GIVEN"], answer: 1, explanation: "The passage explicitly says 'without wheels or metal tools'. FALSE." },
    ],
  },
];

// ============================================================
// LISTENING - 4 new dictation-style practice lessons
// ============================================================

export const ieltsListeningExpansion4Lessons: LanguageLesson[] = [
  {
    id: "ielts-listening-18",
    title: "Listening Practice - Section 1 Booking Conversation",
    titleEn: "Listening Practice - Section 1 Booking Conversation",
    level: 2,
    difficulty: "beginner",
    theory: `**Listening Practice — Section 1 (Booking a Tour)**

Mô phỏng đoạn hội thoại Section 1 IELTS: một khách hàng gọi đến trung tâm du lịch để đặt tour. Bạn sẽ luyện chính tả các thông tin chuẩn IELTS: tên, địa chỉ, số điện thoại, ngày, giờ và giá tiền.

Sử dụng nút 🐢 để nghe chậm khi mới bắt đầu, sau đó tăng dần lên tốc độ thường.`,
    theoryEn: `**Listening Practice — Section 1 (Booking a Tour)**

Simulates an IELTS Section 1 conversation: a customer calling a tour centre. You will practise transcribing typical IELTS information: names, addresses, phone numbers, dates, times and prices.

Use 🐢 for slow audio first, then move to normal speed.`,
    proTips: [
      "Số 0 trong tiếng Anh-Anh thường đọc là 'oh'",
      "Address thường đọc theo thứ tự: số nhà → tên đường → mã bưu điện",
      "Giá luôn có đơn vị tiền tệ - chú ý nghe 'pounds', 'dollars', 'euros'",
    ],
    proTipsEn: [
      "The digit 0 in British English is often pronounced 'oh'",
      "Addresses follow the order: house number → street → postcode",
      "Prices always have a currency unit — listen for pounds, dollars, euros",
    ],
    exercises: [
      {
        type: "dictation" as const,
        instruction: "Nghe và viết lại từng câu chính xác (chú ý chính tả tên riêng và số).",
        instructionEn: "Listen and transcribe each sentence accurately (watch spelling of proper nouns and numbers).",
        sentences: [
          { text: "My full name is Jennifer Whitman, that is W-H-I-T-M-A-N.", hint: "Section 1 name spelling" },
          { text: "The address is 47 Maple Street, postcode SW9 4PQ.", hint: "house number, street, postcode" },
          { text: "My contact number is double seven five, two one three, eight oh four.", hint: "phone number with double" },
          { text: "I would like to book the city tour for the fifteenth of October.", hint: "ordinal date" },
          { text: "The total cost is forty-six pounds and fifty pence per person.", hint: "price with currency" },
          { text: "We will meet outside the main entrance at quarter past nine in the morning.", hint: "time + location" },
        ],
      },
    ],
    quiz: [
      { question: "How is the digit 0 commonly pronounced in British phone numbers?", options: ["zero", "oh", "nil", "null"], answer: 1, explanation: "British speakers commonly say 'oh' for 0 in phone numbers." },
      { question: "'Quarter past nine' means:", options: ["8:45", "9:15", "9:30", "9:45"], answer: 1, explanation: "Quarter past = 15 minutes after = 9:15." },
      { question: "If the speaker says 'double four', you should write:", options: ["4", "44", "8", "24"], answer: 1, explanation: "'Double four' = 44 (two fours)." },
      { question: "A typical UK postcode looks like:", options: ["12345", "SW9 4PQ", "ABC-123", "9-4-5-6"], answer: 1, explanation: "UK postcodes mix letters and numbers, e.g. SW9 4PQ." },
    ],
  },
  {
    id: "ielts-listening-19",
    title: "Listening Practice - Section 2 Tour Guide Monologue",
    titleEn: "Listening Practice - Section 2 Tour Guide Monologue",
    level: 3,
    difficulty: "intermediate",
    theory: `**Listening Practice — Section 2 (Welcome Speech at a Museum)**

Section 2 thường là monologue về một địa điểm hoặc sự kiện. Bài tập này luyện chính tả các câu giới thiệu chuẩn của một hướng dẫn viên bảo tàng — bao gồm thông tin về tầng, lối thoát hiểm, lịch trình và các quy định.`,
    theoryEn: `**Listening Practice — Section 2 (Museum Welcome Speech)**

Section 2 is usually a monologue about a place or event. This exercise transcribes the welcome speech of a museum tour guide — covering floors, emergency exits, timing and rules.`,
    proTips: [
      "Section 2 đoạn nào cũng có 'signposting words' (firstly, next, finally)",
      "Thường có map/plan đi kèm - chú ý từ chỉ phương hướng",
    ],
    proTipsEn: [
      "Section 2 always uses signposting words (firstly, next, finally)",
      "Maps often accompany this section — watch directional vocabulary",
    ],
    exercises: [
      {
        type: "dictation" as const,
        instruction: "Nghe và viết lại từng câu của hướng dẫn viên.",
        instructionEn: "Listen and transcribe each sentence from the guide.",
        sentences: [
          { text: "Welcome to the National Maritime Museum, my name is Daniel and I will be your guide today.", hint: "introduction" },
          { text: "The tour will last approximately ninety minutes and we will visit four main galleries.", hint: "duration + number" },
          { text: "Please note that the emergency exits are located at the rear of each room.", hint: "safety info" },
          { text: "Photography is permitted, but the use of flash is strictly forbidden in the painting gallery.", hint: "rule" },
          { text: "We will stop for a short refreshment break in the courtyard at around eleven thirty.", hint: "schedule" },
          { text: "If you become separated from the group, please return to the information desk near the main entrance.", hint: "instructions" },
        ],
      },
    ],
    quiz: [
      { question: "What is a typical purpose of Section 2?", options: ["Academic lecture", "A monologue about a place or event", "Tutorial discussion", "Job interview"], answer: 1, explanation: "Section 2 is a monologue, often about a place, facility or event." },
      { question: "'Approximately ninety minutes' means:", options: ["Exactly 90 minutes", "About 90 minutes", "Less than 60 minutes", "Two hours"], answer: 1, explanation: "Approximately = roughly/about." },
      { question: "What are 'signposting words'?", options: ["Words written on signs", "Words that guide listeners through structure (firstly, next)", "Long technical words", "Difficult vocabulary"], answer: 1, explanation: "Signposting words help listeners follow the structure of a talk." },
      { question: "If photography is 'strictly forbidden', it is:", options: ["Encouraged", "Allowed sometimes", "Completely not allowed", "Free of charge"], answer: 2, explanation: "Strictly forbidden = absolutely not allowed." },
    ],
  },
  {
    id: "ielts-listening-20",
    title: "Listening Practice - Section 3 Academic Discussion",
    titleEn: "Listening Practice - Section 3 Academic Discussion",
    level: 4,
    difficulty: "advanced",
    theory: `**Listening Practice — Section 3 (Tutor and Student Discussion)**

Section 3 là cuộc thảo luận học thuật giữa 2-4 người, thường là tutor và sinh viên về bài tập, dự án hoặc nghiên cứu. Đây là phần khó vì nhiều giọng nói và đổi ý liên tục.`,
    theoryEn: `**Listening Practice — Section 3 (Tutor and Student Discussion)**

Section 3 is an academic discussion between 2-4 people, often a tutor and students about an assignment, project or research. It is difficult because of multiple voices and frequent changes of opinion.`,
    proTips: [
      "Chú ý cụm từ thay đổi ý: 'actually', 'on second thoughts', 'but in fact'",
      "Khi tutor đưa ra suggestion, sinh viên thường accept hoặc reject ngay sau đó",
    ],
    proTipsEn: [
      "Watch opinion-change phrases: actually, on second thoughts, but in fact",
      "When the tutor suggests something, the student usually accepts/rejects immediately after",
    ],
    exercises: [
      {
        type: "dictation" as const,
        instruction: "Nghe và viết lại các câu trong cuộc thảo luận học thuật.",
        instructionEn: "Listen and transcribe sentences from the academic discussion.",
        sentences: [
          { text: "I think we should focus our research on the impact of social media on adolescents.", hint: "research focus" },
          { text: "Actually, on second thoughts, narrowing it to teenage girls might give us better data.", hint: "change of opinion" },
          { text: "We could analyse responses from at least two hundred participants over a six-month period.", hint: "methodology" },
          { text: "However, gathering ethical approval may take longer than we initially expected.", hint: "concern" },
          { text: "Have you considered using a mixed-methods approach with both surveys and interviews?", hint: "tutor question" },
          { text: "That is an excellent suggestion, although it will significantly increase our workload.", hint: "qualified agreement" },
        ],
      },
    ],
    quiz: [
      { question: "How many speakers are typically in Section 3?", options: ["1", "2 to 4", "More than 10", "Always exactly 2"], answer: 1, explanation: "Section 3 features 2-4 speakers in academic discussion." },
      { question: "'On second thoughts' signals that the speaker is:", options: ["Completely sure", "Changing their opinion", "Asking a question", "Disagreeing strongly"], answer: 1, explanation: "'On second thoughts' = reconsidering / changing one's view." },
      { question: "A 'mixed-methods approach' uses:", options: ["Only quantitative data", "Both qualitative and quantitative methods", "Only literature review", "No methodology"], answer: 1, explanation: "Mixed-methods combines qualitative (interviews) and quantitative (surveys) data." },
      { question: "'Qualified agreement' means:", options: ["Agreement with conditions or reservations", "Total disagreement", "Silence", "Agreement after qualifying for a job"], answer: 0, explanation: "Qualified agreement = yes, but with reservations or conditions." },
    ],
  },
  {
    id: "ielts-listening-21",
    title: "Listening Practice - Section 4 University Lecture",
    titleEn: "Listening Practice - Section 4 University Lecture",
    level: 4,
    difficulty: "advanced",
    theory: `**Listening Practice — Section 4 (Lecture on Renewable Energy)**

Section 4 là một bài giảng đại học dài 5-7 phút không có ngắt quãng. Bạn cần luyện kỹ năng note-taking, theo dõi cấu trúc bài giảng và bắt được các cụm chuyên ngành.`,
    theoryEn: `**Listening Practice — Section 4 (Lecture on Renewable Energy)**

Section 4 is a 5-7 minute uninterrupted university lecture. Practise note-taking, following lecture structure and catching subject-specific phrases.`,
    proTips: [
      "Section 4 không có pause giữa chừng - phải đọc trước tất cả câu hỏi",
      "Lecture thường có structure: introduction → 2-3 main points → conclusion",
    ],
    proTipsEn: [
      "Section 4 has no mid-section pause — read all questions in advance",
      "Lectures usually follow: introduction → 2-3 main points → conclusion",
    ],
    exercises: [
      {
        type: "dictation" as const,
        instruction: "Nghe và viết lại các câu trong bài giảng đại học.",
        instructionEn: "Listen and transcribe sentences from the university lecture.",
        sentences: [
          { text: "Today's lecture will examine three main forms of renewable energy and their economic implications.", hint: "lecture introduction" },
          { text: "Wind power has expanded by approximately fifteen per cent annually over the past decade.", hint: "statistic" },
          { text: "However, the intermittent nature of solar and wind generation creates significant grid integration challenges.", hint: "problem" },
          { text: "Recent advances in lithium-ion battery technology have substantially reduced the cost of energy storage.", hint: "technology" },
          { text: "Geothermal energy, while highly reliable, is geographically limited to regions with volcanic activity.", hint: "limitation" },
          { text: "In conclusion, a diversified energy portfolio appears to offer the most sustainable long-term solution.", hint: "lecture conclusion" },
        ],
      },
    ],
    quiz: [
      { question: "Section 4 is:", options: ["A short conversation", "An uninterrupted academic lecture", "An interview", "A debate"], answer: 1, explanation: "Section 4 is an extended monologue lecture without breaks." },
      { question: "Why is note-taking essential in Section 4?", options: ["Because there are no pauses to re-read questions", "Because it's optional", "Because it's a writing task", "It isn't important"], answer: 0, explanation: "No mid-pause means you must capture key information as you listen." },
      { question: "'Approximately fifteen per cent annually' means:", options: ["Exactly 15% per year", "About 15% each year", "15% in total", "1.5% per year"], answer: 1, explanation: "Approximately = about; annually = each year." },
      { question: "'Geographically limited' means:", options: ["Limited to certain locations", "Limited in size", "Limited in time", "Cheap to install"], answer: 0, explanation: "Geographically limited = restricted to specific regions/places." },
      { question: "What does the conclusion suggest?", options: ["Only solar is the future", "A mix of energy sources is most sustainable", "Renewables are too expensive", "Geothermal is best worldwide"], answer: 1, explanation: "The lecturer concludes a 'diversified energy portfolio' is most sustainable." },
    ],
  },
];
