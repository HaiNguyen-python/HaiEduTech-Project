/**
 * @file pteData.ts
 * @description PTE Academic question bank, mock tests, and academic vocabulary.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

// ===== Type definitions =====
export interface PteReadAloud {
  id: string;
  text: string;
  topic: string;
  difficulty: "easy" | "medium" | "hard";
  prepSeconds: number;
  recordSeconds: number;
}

export interface PteRepeatSentence {
  id: string;
  text: string;
  recordSeconds: number;
}

export interface PteEssayPrompt {
  id: string;
  prompt: string;
  minWords: number;
  maxWords: number;
  timeMinutes: number;
  modelOutline?: string;
}

export interface PteSummarizeText {
  id: string;
  passage: string;
  minWords: number;
  maxWords: number;
  timeMinutes: number;
  keyPoints: string[];
}

export interface PteFillBlank {
  id: string;
  passage: string; // tokens use {{n}} placeholder where n is index 1-based
  options: string[]; // pool, includes distractors
  answers: string[]; // ordered correct answers
}

export interface PteReorderItem {
  id: string;
  paragraphs: string[]; // shown shuffled
  correctOrder: number[]; // indices into paragraphs in correct order
  topic: string;
}

export interface PteDictation {
  id: string;
  audioText: string; // text to be spoken via TTS
  difficulty: "easy" | "medium" | "hard";
}

export interface PteSummarizeSpoken {
  id: string;
  audioText: string; // narrated via TTS
  minWords: number;
  maxWords: number;
  keyPoints: string[];
}

export interface PteVocabWord {
  word: string;
  partOfSpeech: string;
  meaning: string;
  example: string;
}

// ===== Read Aloud bank (10 items) =====
export const READ_ALOUD_BANK: PteReadAloud[] = [
  { id: "ra-1", topic: "Climate", difficulty: "medium", prepSeconds: 35, recordSeconds: 40,
    text: "Climate change is reshaping ecosystems across every continent. Rising temperatures alter migration patterns, melt polar ice, and intensify extreme weather events that disrupt agriculture and coastal communities." },
  { id: "ra-2", topic: "Education", difficulty: "easy", prepSeconds: 35, recordSeconds: 40,
    text: "Universities increasingly rely on hybrid learning models that blend face-to-face instruction with digital platforms, allowing students to access lectures, submit assignments, and collaborate from anywhere in the world." },
  { id: "ra-3", topic: "Technology", difficulty: "medium", prepSeconds: 35, recordSeconds: 40,
    text: "Artificial intelligence is now embedded in everyday devices, from smartphones that anticipate user behaviour to home assistants that respond to natural language commands and learn personal preferences over time." },
  { id: "ra-4", topic: "Health", difficulty: "hard", prepSeconds: 40, recordSeconds: 40,
    text: "Public health authorities emphasise that vaccination remains one of the most cost-effective interventions, preventing millions of deaths each year and reducing the long-term burden on healthcare systems worldwide." },
  { id: "ra-5", topic: "Economy", difficulty: "medium", prepSeconds: 35, recordSeconds: 40,
    text: "Global supply chains have become deeply interconnected, meaning that a disruption in one region can ripple across industries, raising prices and forcing companies to rethink their sourcing strategies." },
  { id: "ra-6", topic: "Science", difficulty: "hard", prepSeconds: 40, recordSeconds: 45,
    text: "Quantum computing promises to solve problems that are currently intractable for classical machines, including molecular simulation, cryptographic analysis, and the optimisation of complex logistical networks." },
  { id: "ra-7", topic: "Environment", difficulty: "easy", prepSeconds: 30, recordSeconds: 40,
    text: "Renewable energy sources such as solar and wind power are expanding rapidly, helping countries reduce greenhouse gas emissions while creating new jobs in installation, maintenance, and research." },
  { id: "ra-8", topic: "Society", difficulty: "medium", prepSeconds: 35, recordSeconds: 40,
    text: "Urbanisation continues at a remarkable pace, with more than half of the global population now living in cities and placing growing demands on transport, housing, and public services." },
  { id: "ra-9", topic: "Culture", difficulty: "easy", prepSeconds: 30, recordSeconds: 40,
    text: "Museums play a vital role in preserving cultural heritage, offering immersive exhibitions that connect visitors with art, history, and scientific discovery across centuries and continents." },
  { id: "ra-10", topic: "Business", difficulty: "medium", prepSeconds: 35, recordSeconds: 40,
    text: "Sustainable business practices are no longer optional, as consumers, investors, and regulators increasingly demand transparency about environmental impact and ethical sourcing throughout the value chain." },
];

// ===== Repeat Sentence bank (8 items) =====
export const REPEAT_SENTENCE_BANK: PteRepeatSentence[] = [
  { id: "rs-1", text: "The library will be closed during the renovation period next month.", recordSeconds: 15 },
  { id: "rs-2", text: "Please submit your research proposal before the end of the semester.", recordSeconds: 15 },
  { id: "rs-3", text: "Sustainable agriculture requires careful management of soil and water resources.", recordSeconds: 15 },
  { id: "rs-4", text: "The conference will focus on advances in renewable energy technologies.", recordSeconds: 15 },
  { id: "rs-5", text: "Online learning has transformed access to higher education worldwide.", recordSeconds: 15 },
  { id: "rs-6", text: "Economic indicators suggest a moderate recovery in the coming year.", recordSeconds: 15 },
  { id: "rs-7", text: "Effective communication skills are essential for career advancement.", recordSeconds: 15 },
  { id: "rs-8", text: "Historians often debate the long-term consequences of industrial revolutions.", recordSeconds: 15 },
];

// ===== Essay prompts (8 items) =====
export const ESSAY_BANK: PteEssayPrompt[] = [
  { id: "es-1", minWords: 200, maxWords: 300, timeMinutes: 20,
    prompt: "Some people believe that universities should focus only on providing academic skills, while others think they should also prepare students for their future careers. Discuss both views and give your own opinion.",
    modelOutline: "Intro → View 1 (academic) → View 2 (career) → Your opinion → Conclusion" },
  { id: "es-2", minWords: 200, maxWords: 300, timeMinutes: 20,
    prompt: "Many people argue that governments should invest more in renewable energy rather than fossil fuels. To what extent do you agree or disagree?",
    modelOutline: "Intro + position → Reason 1 (climate) → Reason 2 (economy) → Counter + rebuttal → Conclusion" },
  { id: "es-3", minWords: 200, maxWords: 300, timeMinutes: 20,
    prompt: "The growth of online shopping is changing the role of traditional retail stores. What are the advantages and disadvantages of this trend?",
    modelOutline: "Intro → Advantages (convenience, variety) → Disadvantages (jobs, community) → Conclusion" },
  { id: "es-4", minWords: 200, maxWords: 300, timeMinutes: 20,
    prompt: "Some experts argue that working from home increases productivity, while others believe it harms collaboration. Discuss both views and share your opinion.",
    modelOutline: "Intro → Productivity view → Collaboration view → Your opinion → Conclusion" },
  { id: "es-5", minWords: 200, maxWords: 300, timeMinutes: 20,
    prompt: "International tourism has become one of the largest industries in the world. Do the benefits outweigh the drawbacks?",
    modelOutline: "Intro + position → Benefits → Drawbacks → Conclusion" },
  { id: "es-6", minWords: 200, maxWords: 300, timeMinutes: 20,
    prompt: "Social media has changed the way people interact with one another. To what extent has this been positive or negative?",
    modelOutline: "Intro → Positives → Negatives → Final view → Conclusion" },
  { id: "es-7", minWords: 200, maxWords: 300, timeMinutes: 20,
    prompt: "Some people think that creativity cannot be taught, while others believe schools can train it. Discuss both perspectives and give your own opinion.",
    modelOutline: "Intro → View 1 → View 2 → Your opinion → Conclusion" },
  { id: "es-8", minWords: 200, maxWords: 300, timeMinutes: 20,
    prompt: "The use of artificial intelligence in healthcare is rapidly increasing. What are the benefits and risks of this development?",
    modelOutline: "Intro → Benefits (diagnosis, efficiency) → Risks (bias, privacy) → Conclusion" },
];

// ===== Summarize Written Text (6 items) =====
export const SUMMARIZE_TEXT_BANK: PteSummarizeText[] = [
  { id: "sw-1", minWords: 5, maxWords: 75, timeMinutes: 10,
    passage: "Coral reefs are among the most biologically diverse ecosystems on Earth, supporting nearly a quarter of all marine species. However, rising sea temperatures, ocean acidification, and pollution have caused widespread bleaching events. Without urgent action to reduce carbon emissions and protect marine habitats, scientists warn that more than half of the world's reefs could disappear within a few decades, devastating coastal communities that depend on them.",
    keyPoints: ["coral reefs biodiversity", "threats: warming, acidification, pollution", "risk of disappearance", "impact on communities"] },
  { id: "sw-2", minWords: 5, maxWords: 75, timeMinutes: 10,
    passage: "The development of electric vehicles has accelerated dramatically in the past decade, driven by improvements in battery technology, government incentives, and growing consumer awareness of environmental issues. Although challenges remain, including charging infrastructure and the sourcing of rare minerals, most major manufacturers have committed to electrifying their fleets, signalling a fundamental shift in the global automotive industry.",
    keyPoints: ["EV growth", "drivers: batteries, incentives, awareness", "challenges: infrastructure, minerals", "industry transformation"] },
  { id: "sw-3", minWords: 5, maxWords: 75, timeMinutes: 10,
    passage: "Sleep researchers have established that adolescents require nine hours of sleep per night for optimal cognitive function, yet most receive far less due to early school start times, screen exposure, and academic pressure. Chronic sleep deprivation is linked to lower academic performance, mood disorders, and weakened immune response, prompting calls for later school timings.",
    keyPoints: ["adolescents need 9 hours", "causes of deprivation", "consequences: academics, mood, health", "policy proposal"] },
  { id: "sw-4", minWords: 5, maxWords: 75, timeMinutes: 10,
    passage: "Open-source software has transformed the technology industry by enabling collaborative development across borders. Communities of volunteer programmers maintain critical infrastructure used by governments and corporations alike. While the model fosters innovation, it also raises questions about long-term funding, security audits, and recognition for unpaid contributors.",
    keyPoints: ["open-source impact", "global collaboration", "benefits: innovation", "challenges: funding, security, recognition"] },
  { id: "sw-5", minWords: 5, maxWords: 75, timeMinutes: 10,
    passage: "Microplastics have been detected in oceans, soil, and even human blood, raising serious public health concerns. They originate from the breakdown of larger plastics, synthetic textiles, and personal care products. Although their long-term effects on living organisms remain under study, governments are introducing regulations to limit single-use plastics.",
    keyPoints: ["microplastic pervasiveness", "sources", "uncertain health effects", "regulatory response"] },
  { id: "sw-6", minWords: 5, maxWords: 75, timeMinutes: 10,
    passage: "Urban green spaces deliver measurable benefits, from cooling neighbourhoods and improving air quality to reducing stress among residents. Despite these advantages, many growing cities continue to prioritise concrete development. Urban planners now advocate for embedding parks, rooftop gardens, and tree-lined streets into long-term city planning.",
    keyPoints: ["green space benefits", "neglect in urbanisation", "planner advocacy", "integration into design"] },
];

// ===== Fill in the Blanks (8 items) =====
export const FILL_BLANK_BANK: PteFillBlank[] = [
  { id: "fb-1",
    passage: "Modern cities face significant challenges in managing {{1}} growth while maintaining the quality of {{2}} services for all residents.",
    options: ["population", "infrastructure", "public", "private", "rapid", "urban"],
    answers: ["population", "public"] },
  { id: "fb-2",
    passage: "The {{1}} of new technologies often {{2}} traditional industries, forcing companies to innovate or risk obsolescence.",
    options: ["adoption", "rejection", "disrupts", "supports", "ignores", "delays"],
    answers: ["adoption", "disrupts"] },
  { id: "fb-3",
    passage: "Researchers have {{1}} that regular physical exercise {{2}} cognitive function in older adults significantly.",
    options: ["demonstrated", "denied", "improves", "reduces", "ignored", "suspended"],
    answers: ["demonstrated", "improves"] },
  { id: "fb-4",
    passage: "Sustainable agriculture {{1}} natural resources while still producing enough food to {{2}} a growing population.",
    options: ["preserves", "depletes", "feed", "starve", "disregards", "exhausts"],
    answers: ["preserves", "feed"] },
  { id: "fb-5",
    passage: "Effective leadership requires the ability to {{1}} a clear vision and {{2}} team members toward shared goals.",
    options: ["communicate", "hide", "motivate", "discourage", "abandon", "ignore"],
    answers: ["communicate", "motivate"] },
  { id: "fb-6",
    passage: "The {{1}} of renewable energy depends on continued investment in research, infrastructure, and public {{2}}.",
    options: ["expansion", "decline", "support", "rejection", "elimination", "termination"],
    answers: ["expansion", "support"] },
  { id: "fb-7",
    passage: "Globalisation has {{1}} cultural exchange, but it has also {{2}} concerns about the loss of local traditions.",
    options: ["accelerated", "blocked", "raised", "lowered", "stopped", "reduced"],
    answers: ["accelerated", "raised"] },
  { id: "fb-8",
    passage: "Universities are increasingly being asked to {{1}} graduates with practical skills that {{2}} employability.",
    options: ["equip", "deprive", "enhance", "diminish", "withhold", "weaken"],
    answers: ["equip", "enhance"] },
];

// ===== Reorder Paragraphs (6 items) =====
export const REORDER_BANK: PteReorderItem[] = [
  { id: "ro-1", topic: "Climate Action", correctOrder: [0, 1, 2, 3],
    paragraphs: [
      "Climate change is one of the defining challenges of our era.",
      "Scientists have documented rising sea levels, prolonged droughts, and stronger storms.",
      "Governments and organisations have responded with policies aimed at reducing emissions.",
      "However, success will ultimately depend on coordinated global action and individual responsibility.",
    ] },
  { id: "ro-2", topic: "Remote Work", correctOrder: [0, 1, 2, 3],
    paragraphs: [
      "Remote work was once considered a niche arrangement available only to a few professionals.",
      "The pandemic forced organisations to adopt flexible practices on a global scale.",
      "Productivity studies have produced mixed results depending on the industry and culture.",
      "Today, hybrid models that combine office and home work are emerging as the new standard.",
    ] },
  { id: "ro-3", topic: "Reading Habits", correctOrder: [0, 1, 2],
    paragraphs: [
      "Daily reading is associated with strong long-term cognitive benefits.",
      "Studies show that even brief sessions can improve vocabulary and focus.",
      "Educators encourage parents to introduce books at an early age to nurture lifelong learning.",
    ] },
  { id: "ro-4", topic: "Smart Cities", correctOrder: [0, 1, 2, 3],
    paragraphs: [
      "Smart cities use sensors and data to make urban services more efficient.",
      "Transport systems can adjust traffic lights in real time based on actual demand.",
      "Energy consumption can be optimised by linking buildings to a central control hub.",
      "However, concerns about privacy and data ownership remain unresolved.",
    ] },
  { id: "ro-5", topic: "Healthy Diet", correctOrder: [0, 1, 2],
    paragraphs: [
      "A balanced diet should include vegetables, fruits, whole grains, and lean protein.",
      "Excessive consumption of processed foods has been linked to chronic illness.",
      "Nutritionists recommend cooking at home as a practical step toward better health.",
    ] },
  { id: "ro-6", topic: "Online Privacy", correctOrder: [0, 1, 2, 3],
    paragraphs: [
      "Online services collect vast amounts of personal data through everyday interactions.",
      "Most users accept lengthy terms without understanding how their data will be used.",
      "Recent regulations require companies to clearly disclose their data practices.",
      "Yet meaningful protection still depends on informed user choices.",
    ] },
];

// ===== Dictation (10 items) =====
export const DICTATION_BANK: PteDictation[] = [
  { id: "dc-1", difficulty: "easy", audioText: "The lecture will be held in the main auditorium tomorrow." },
  { id: "dc-2", difficulty: "easy", audioText: "Please remember to submit your assignment before midnight." },
  { id: "dc-3", difficulty: "medium", audioText: "Researchers have discovered new species in the depths of the ocean." },
  { id: "dc-4", difficulty: "medium", audioText: "Renewable energy plays a crucial role in reducing carbon emissions." },
  { id: "dc-5", difficulty: "hard", audioText: "Interdisciplinary collaboration often leads to unexpected scientific breakthroughs." },
  { id: "dc-6", difficulty: "medium", audioText: "Effective time management is essential for academic success at university." },
  { id: "dc-7", difficulty: "hard", audioText: "Cognitive psychology investigates how people perceive, remember, and reason." },
  { id: "dc-8", difficulty: "easy", audioText: "The professor encouraged students to ask questions during the seminar." },
  { id: "dc-9", difficulty: "medium", audioText: "International students contribute to the cultural diversity of the campus." },
  { id: "dc-10", difficulty: "hard", audioText: "Economic forecasts indicate a steady recovery in global manufacturing." },
];

// ===== Summarize Spoken Text (6 items) =====
export const SUMMARIZE_SPOKEN_BANK: PteSummarizeSpoken[] = [
  { id: "ss-1", minWords: 50, maxWords: 70,
    audioText: "Today I would like to talk about the benefits of bilingual education. Research has consistently shown that students learning in two languages develop stronger problem solving skills, greater cognitive flexibility, and improved memory. Bilingual programs also nurture cultural awareness and prepare graduates for an increasingly globalised job market.",
    keyPoints: ["bilingual education benefits", "cognitive gains", "cultural awareness", "career advantage"] },
  { id: "ss-2", minWords: 50, maxWords: 70,
    audioText: "The history of the printing press marks a turning point in human civilisation. Before its invention, books were copied by hand and remained extremely rare. Once printing became widespread, knowledge could be reproduced rapidly, fuelling the Renaissance, the scientific revolution, and the spread of literacy across Europe.",
    keyPoints: ["printing press impact", "before vs after", "knowledge spread", "literacy & revolution"] },
  { id: "ss-3", minWords: 50, maxWords: 70,
    audioText: "Modern agriculture faces a difficult balance between productivity and environmental sustainability. Intensive farming techniques have boosted yields, yet they also contribute to soil degradation and water pollution. Practices such as crop rotation, precision irrigation, and organic fertilisation are being adopted to reconcile food security with ecological health.",
    keyPoints: ["agricultural balance", "intensive farming impact", "sustainable practices", "food security"] },
  { id: "ss-4", minWords: 50, maxWords: 70,
    audioText: "Sleep is essential for memory consolidation. During deep sleep, the brain reorganises information acquired during the day, transferring short term memories into long term storage. Studies show that students who sleep well after studying perform significantly better on tests than those who pull all night sessions.",
    keyPoints: ["sleep & memory", "consolidation process", "study performance", "all-nighters harmful"] },
  { id: "ss-5", minWords: 50, maxWords: 70,
    audioText: "Volunteering offers benefits that extend well beyond the immediate community service. Volunteers often report improved mental wellbeing, expanded social networks, and stronger leadership skills. Employers also value volunteer experience as evidence of initiative, empathy, and the ability to work with diverse teams.",
    keyPoints: ["volunteering benefits", "personal wellbeing", "social skills", "career value"] },
  { id: "ss-6", minWords: 50, maxWords: 70,
    audioText: "The exploration of Mars represents one of the boldest scientific endeavours of our generation. Robotic rovers are gathering evidence about ancient water, atmospheric conditions, and the potential for past life. Lessons learned from these missions will shape the long term goal of sending astronauts to the red planet.",
    keyPoints: ["Mars exploration", "robotic rovers", "evidence of water and life", "future missions"] },
];

// ===== Mock Test Composition =====
// Each mock test pulls a sequence of items across categories to simulate a real session.
export interface PteMockTest {
  id: string;
  title: string;
  description: string;
  readAloudIds: string[];
  repeatSentenceIds: string[];
  essayIds: string[];
  summarizeTextIds: string[];
  fillBlankIds: string[];
  reorderIds: string[];
  dictationIds: string[];
  summarizeSpokenIds: string[];
}

export const MOCK_TESTS: PteMockTest[] = [
  { id: "mt-1", title: "Mock Test 1 — Foundation", description: "Mixed difficulty, suitable for first attempt.",
    readAloudIds: ["ra-1", "ra-2"], repeatSentenceIds: ["rs-1", "rs-2"], essayIds: ["es-1"], summarizeTextIds: ["sw-1"],
    fillBlankIds: ["fb-1", "fb-2"], reorderIds: ["ro-1"], dictationIds: ["dc-1", "dc-2"], summarizeSpokenIds: ["ss-1"] },
  { id: "mt-2", title: "Mock Test 2 — Academic Focus", description: "Heavy on academic vocabulary and synthesis.",
    readAloudIds: ["ra-3", "ra-4"], repeatSentenceIds: ["rs-3", "rs-4"], essayIds: ["es-2"], summarizeTextIds: ["sw-2"],
    fillBlankIds: ["fb-3", "fb-4"], reorderIds: ["ro-2"], dictationIds: ["dc-3", "dc-4"], summarizeSpokenIds: ["ss-2"] },
  { id: "mt-3", title: "Mock Test 3 — Advanced Trends 2026", description: "Predictive set based on 2026 high-frequency questions.",
    readAloudIds: ["ra-5", "ra-6"], repeatSentenceIds: ["rs-5", "rs-6"], essayIds: ["es-3"], summarizeTextIds: ["sw-3"],
    fillBlankIds: ["fb-5", "fb-6"], reorderIds: ["ro-3"], dictationIds: ["dc-5", "dc-6"], summarizeSpokenIds: ["ss-3"] },
];

// ===== Repeated / Predictive 2026 Question IDs =====
export const REPEATED_2026_IDS = {
  readAloud: ["ra-3", "ra-6", "ra-7"],
  repeatSentence: ["rs-3", "rs-5"],
  essay: ["es-2", "es-6", "es-8"],
  dictation: ["dc-5", "dc-7", "dc-10"],
};

// ===== 150 Academic Vocabulary Words (PTE high-frequency) =====
export const PTE_VOCAB_BANK: PteVocabWord[] = [
  { word: "abstract", partOfSpeech: "adjective", meaning: "existing in thought rather than physical form", example: "Mathematics deals with abstract concepts." },
  { word: "accommodate", partOfSpeech: "verb", meaning: "provide lodging or sufficient space for", example: "The hall can accommodate up to 500 people." },
  { word: "accumulate", partOfSpeech: "verb", meaning: "gather together over time", example: "Snow accumulated on the rooftops overnight." },
  { word: "acquire", partOfSpeech: "verb", meaning: "buy or obtain something", example: "She acquired several rare books at the auction." },
  { word: "adequate", partOfSpeech: "adjective", meaning: "satisfactory or acceptable", example: "Make sure you have adequate food and water." },
  { word: "adjacent", partOfSpeech: "adjective", meaning: "next to or adjoining", example: "The library is adjacent to the cafeteria." },
  { word: "advocate", partOfSpeech: "verb", meaning: "publicly recommend or support", example: "He advocates a healthy lifestyle." },
  { word: "aggregate", partOfSpeech: "noun", meaning: "a whole formed by combining elements", example: "The aggregate of donations was over a million." },
  { word: "albeit", partOfSpeech: "conjunction", meaning: "although", example: "She accepted the job, albeit reluctantly." },
  { word: "allocate", partOfSpeech: "verb", meaning: "distribute resources", example: "Funds were allocated to research projects." },
  { word: "ambiguous", partOfSpeech: "adjective", meaning: "open to more than one interpretation", example: "The policy is ambiguous and confusing." },
  { word: "analogous", partOfSpeech: "adjective", meaning: "comparable in certain respects", example: "The brain is analogous to a complex computer." },
  { word: "anticipate", partOfSpeech: "verb", meaning: "expect or predict", example: "We anticipate strong demand for the product." },
  { word: "apparent", partOfSpeech: "adjective", meaning: "clearly visible or understood", example: "It became apparent that he was unwell." },
  { word: "appraise", partOfSpeech: "verb", meaning: "assess the quality of", example: "Experts appraised the painting at $1 million." },
  { word: "arbitrary", partOfSpeech: "adjective", meaning: "based on random choice", example: "The decision seemed arbitrary." },
  { word: "articulate", partOfSpeech: "verb", meaning: "express clearly", example: "She articulated her ideas with confidence." },
  { word: "ascertain", partOfSpeech: "verb", meaning: "find out for certain", example: "Ascertain the facts before deciding." },
  { word: "assemble", partOfSpeech: "verb", meaning: "put together or gather", example: "The team assembled in the meeting room." },
  { word: "assert", partOfSpeech: "verb", meaning: "state firmly", example: "She asserted her right to speak." },
  { word: "assess", partOfSpeech: "verb", meaning: "evaluate", example: "Teachers assess student progress regularly." },
  { word: "attain", partOfSpeech: "verb", meaning: "succeed in achieving", example: "He attained a high level of fluency." },
  { word: "attribute", partOfSpeech: "verb", meaning: "regard as caused by", example: "She attributes her success to hard work." },
  { word: "augment", partOfSpeech: "verb", meaning: "make greater by adding", example: "He augmented his salary with freelance work." },
  { word: "autonomy", partOfSpeech: "noun", meaning: "self-government or freedom", example: "Teachers value classroom autonomy." },
  { word: "bias", partOfSpeech: "noun", meaning: "prejudice in favour or against", example: "The study controlled for bias." },
  { word: "categorise", partOfSpeech: "verb", meaning: "place into categories", example: "Books are categorised by subject." },
  { word: "cease", partOfSpeech: "verb", meaning: "come to an end", example: "Operations will cease at midnight." },
  { word: "cite", partOfSpeech: "verb", meaning: "quote as evidence", example: "She cited several studies in her paper." },
  { word: "coherent", partOfSpeech: "adjective", meaning: "logical and consistent", example: "Write a coherent argument." },
  { word: "coincide", partOfSpeech: "verb", meaning: "occur at the same time", example: "Our holidays coincided this year." },
  { word: "collaborate", partOfSpeech: "verb", meaning: "work jointly", example: "Researchers collaborate across countries." },
  { word: "commence", partOfSpeech: "verb", meaning: "begin", example: "The ceremony will commence at noon." },
  { word: "compatible", partOfSpeech: "adjective", meaning: "able to exist together", example: "These devices are compatible." },
  { word: "compile", partOfSpeech: "verb", meaning: "produce by assembling", example: "He compiled a list of references." },
  { word: "comprehensive", partOfSpeech: "adjective", meaning: "complete and including all", example: "A comprehensive review was carried out." },
  { word: "comprise", partOfSpeech: "verb", meaning: "consist of", example: "The book comprises ten chapters." },
  { word: "conceive", partOfSpeech: "verb", meaning: "form a plan or idea", example: "The project was conceived in 2010." },
  { word: "concur", partOfSpeech: "verb", meaning: "agree", example: "The committee concurred with the report." },
  { word: "consequence", partOfSpeech: "noun", meaning: "a result or effect", example: "The consequences were severe." },
  { word: "consolidate", partOfSpeech: "verb", meaning: "make stronger or more solid", example: "We consolidated our gains." },
  { word: "constrain", partOfSpeech: "verb", meaning: "limit", example: "Resources constrain growth." },
  { word: "construe", partOfSpeech: "verb", meaning: "interpret in a particular way", example: "Her silence was construed as agreement." },
  { word: "contemplate", partOfSpeech: "verb", meaning: "think about deeply", example: "She contemplated her options." },
  { word: "controversy", partOfSpeech: "noun", meaning: "prolonged disagreement", example: "The decision sparked controversy." },
  { word: "convey", partOfSpeech: "verb", meaning: "communicate", example: "Words can hardly convey her gratitude." },
  { word: "credible", partOfSpeech: "adjective", meaning: "able to be believed", example: "The witness was credible." },
  { word: "criterion", partOfSpeech: "noun", meaning: "a principle for judgement", example: "Honesty is a key criterion." },
  { word: "crucial", partOfSpeech: "adjective", meaning: "decisive or critical", example: "Timing is crucial." },
  { word: "cultivate", partOfSpeech: "verb", meaning: "nurture or grow", example: "He cultivated strong relationships." },
  { word: "deduce", partOfSpeech: "verb", meaning: "arrive at by reasoning", example: "We deduced the answer." },
  { word: "deficient", partOfSpeech: "adjective", meaning: "not having enough", example: "The diet was deficient in iron." },
  { word: "delineate", partOfSpeech: "verb", meaning: "describe precisely", example: "The contract delineates each duty." },
  { word: "denote", partOfSpeech: "verb", meaning: "indicate or stand for", example: "Red lines denote highways." },
  { word: "deploy", partOfSpeech: "verb", meaning: "put into use", example: "Engineers deploy new systems weekly." },
  { word: "derive", partOfSpeech: "verb", meaning: "obtain from a source", example: "The word derives from Latin." },
  { word: "deteriorate", partOfSpeech: "verb", meaning: "become worse", example: "Conditions began to deteriorate." },
  { word: "deviate", partOfSpeech: "verb", meaning: "depart from a course", example: "Do not deviate from the plan." },
  { word: "differentiate", partOfSpeech: "verb", meaning: "distinguish", example: "Brands differentiate themselves through service." },
  { word: "diminish", partOfSpeech: "verb", meaning: "make less", example: "Her enthusiasm did not diminish." },
  { word: "discern", partOfSpeech: "verb", meaning: "perceive clearly", example: "She could discern subtle changes." },
  { word: "disseminate", partOfSpeech: "verb", meaning: "spread widely", example: "Findings were disseminated online." },
  { word: "diverge", partOfSpeech: "verb", meaning: "move apart", example: "Our paths diverged after college." },
  { word: "dynamic", partOfSpeech: "adjective", meaning: "characterised by activity", example: "A dynamic team produces results." },
  { word: "elaborate", partOfSpeech: "verb", meaning: "explain in detail", example: "Could you elaborate on that point?" },
  { word: "elicit", partOfSpeech: "verb", meaning: "draw out a response", example: "The teacher elicited answers from students." },
  { word: "emerge", partOfSpeech: "verb", meaning: "come into view", example: "New evidence has emerged." },
  { word: "empirical", partOfSpeech: "adjective", meaning: "based on observation", example: "The theory has empirical support." },
  { word: "enhance", partOfSpeech: "verb", meaning: "intensify or improve", example: "Lighting can enhance the room." },
  { word: "enumerate", partOfSpeech: "verb", meaning: "mention one by one", example: "She enumerated her objections." },
  { word: "equivalent", partOfSpeech: "adjective", meaning: "equal in value", example: "One mile is equivalent to 1.6 km." },
  { word: "establish", partOfSpeech: "verb", meaning: "set up on a firm basis", example: "We established a routine." },
  { word: "evident", partOfSpeech: "adjective", meaning: "clearly seen", example: "Her talent is evident." },
  { word: "exemplify", partOfSpeech: "verb", meaning: "be a typical example of", example: "His work exemplifies dedication." },
  { word: "exhaustive", partOfSpeech: "adjective", meaning: "examining all aspects", example: "An exhaustive study was conducted." },
  { word: "exploit", partOfSpeech: "verb", meaning: "make full use of", example: "We must exploit every opportunity." },
  { word: "extrapolate", partOfSpeech: "verb", meaning: "extend conclusions", example: "We can extrapolate from past trends." },
  { word: "facilitate", partOfSpeech: "verb", meaning: "make easier", example: "Apps facilitate communication." },
  { word: "feasible", partOfSpeech: "adjective", meaning: "possible to do", example: "Is the plan feasible?" },
  { word: "formulate", partOfSpeech: "verb", meaning: "create methodically", example: "He formulated a hypothesis." },
  { word: "fundamental", partOfSpeech: "adjective", meaning: "forming a base", example: "Trust is fundamental." },
  { word: "generate", partOfSpeech: "verb", meaning: "produce", example: "Solar panels generate electricity." },
  { word: "hierarchy", partOfSpeech: "noun", meaning: "ranked system", example: "The corporate hierarchy is flat." },
  { word: "hypothesis", partOfSpeech: "noun", meaning: "proposed explanation", example: "Test the hypothesis carefully." },
  { word: "illustrate", partOfSpeech: "verb", meaning: "explain by examples", example: "The chart illustrates growth." },
  { word: "imply", partOfSpeech: "verb", meaning: "suggest indirectly", example: "His tone implied disapproval." },
  { word: "incentive", partOfSpeech: "noun", meaning: "motivating factor", example: "Bonuses are an incentive." },
  { word: "incorporate", partOfSpeech: "verb", meaning: "include as part of", example: "We incorporated feedback." },
  { word: "indicate", partOfSpeech: "verb", meaning: "point out", example: "The data indicates a trend." },
  { word: "infer", partOfSpeech: "verb", meaning: "deduce from evidence", example: "Readers can infer the mood." },
  { word: "initiate", partOfSpeech: "verb", meaning: "begin", example: "The school initiated reforms." },
  { word: "innovative", partOfSpeech: "adjective", meaning: "introducing new ideas", example: "An innovative design." },
  { word: "intrinsic", partOfSpeech: "adjective", meaning: "belonging naturally", example: "Honesty is intrinsic to her." },
  { word: "investigate", partOfSpeech: "verb", meaning: "examine systematically", example: "Police investigate the case." },
  { word: "justify", partOfSpeech: "verb", meaning: "give reasons for", example: "Justify your conclusions." },
  { word: "legitimate", partOfSpeech: "adjective", meaning: "lawful or valid", example: "A legitimate concern." },
  { word: "manifest", partOfSpeech: "verb", meaning: "show clearly", example: "Symptoms manifested overnight." },
  { word: "mediate", partOfSpeech: "verb", meaning: "intervene to resolve", example: "He mediated the dispute." },
  { word: "merit", partOfSpeech: "noun", meaning: "worth or excellence", example: "The plan has merit." },
  { word: "mitigate", partOfSpeech: "verb", meaning: "make less severe", example: "We mitigate risk." },
  { word: "negligible", partOfSpeech: "adjective", meaning: "so small as to be irrelevant", example: "The cost is negligible." },
  { word: "notion", partOfSpeech: "noun", meaning: "concept", example: "The notion intrigued her." },
  { word: "objective", partOfSpeech: "noun", meaning: "goal", example: "Set clear objectives." },
  { word: "obscure", partOfSpeech: "adjective", meaning: "not clearly known", example: "An obscure poet." },
  { word: "obsolete", partOfSpeech: "adjective", meaning: "out of date", example: "VHS tapes are obsolete." },
  { word: "occur", partOfSpeech: "verb", meaning: "happen", example: "Earthquakes occur often here." },
  { word: "optimal", partOfSpeech: "adjective", meaning: "most favourable", example: "Optimal conditions for growth." },
  { word: "outweigh", partOfSpeech: "verb", meaning: "exceed in importance", example: "Benefits outweigh costs." },
  { word: "paradigm", partOfSpeech: "noun", meaning: "typical example or model", example: "A new educational paradigm." },
  { word: "perceive", partOfSpeech: "verb", meaning: "become aware of", example: "We perceive the world through senses." },
  { word: "persistent", partOfSpeech: "adjective", meaning: "continuing firmly", example: "A persistent cough." },
  { word: "phenomenon", partOfSpeech: "noun", meaning: "observable event", example: "A natural phenomenon." },
  { word: "potential", partOfSpeech: "noun", meaning: "latent qualities", example: "She has great potential." },
  { word: "precede", partOfSpeech: "verb", meaning: "come before", example: "A storm preceded the calm." },
  { word: "predominant", partOfSpeech: "adjective", meaning: "most numerous", example: "The predominant view." },
  { word: "premise", partOfSpeech: "noun", meaning: "basis for argument", example: "Start from the premise." },
  { word: "presume", partOfSpeech: "verb", meaning: "suppose to be true", example: "I presume you agree." },
  { word: "prevalent", partOfSpeech: "adjective", meaning: "widespread", example: "Smoking is prevalent here." },
  { word: "prior", partOfSpeech: "adjective", meaning: "earlier in time", example: "Prior experience required." },
  { word: "proficient", partOfSpeech: "adjective", meaning: "competent", example: "Proficient in Spanish." },
  { word: "profound", partOfSpeech: "adjective", meaning: "very great", example: "A profound impact." },
  { word: "prohibit", partOfSpeech: "verb", meaning: "formally forbid", example: "Smoking is prohibited." },
  { word: "prominent", partOfSpeech: "adjective", meaning: "important or famous", example: "A prominent scientist." },
  { word: "propagate", partOfSpeech: "verb", meaning: "spread", example: "Plants propagate by seeds." },
  { word: "pursue", partOfSpeech: "verb", meaning: "follow in order to catch", example: "Pursue your dreams." },
  { word: "quantify", partOfSpeech: "verb", meaning: "express as a number", example: "Quantify the loss." },
  { word: "rationale", partOfSpeech: "noun", meaning: "reasoning behind", example: "Explain the rationale." },
  { word: "reciprocal", partOfSpeech: "adjective", meaning: "mutual", example: "A reciprocal agreement." },
  { word: "refute", partOfSpeech: "verb", meaning: "prove wrong", example: "She refuted the claim." },
  { word: "regulate", partOfSpeech: "verb", meaning: "control", example: "Laws regulate trade." },
  { word: "reinforce", partOfSpeech: "verb", meaning: "strengthen", example: "Reinforce learning daily." },
  { word: "release", partOfSpeech: "verb", meaning: "set free", example: "The film was released last week." },
  { word: "reluctant", partOfSpeech: "adjective", meaning: "unwilling", example: "He was reluctant to leave." },
  { word: "render", partOfSpeech: "verb", meaning: "cause to be", example: "The accident rendered him speechless." },
  { word: "resolve", partOfSpeech: "verb", meaning: "settle a matter", example: "Resolve the dispute." },
  { word: "retain", partOfSpeech: "verb", meaning: "continue to have", example: "Retain customer loyalty." },
  { word: "reveal", partOfSpeech: "verb", meaning: "make known", example: "Studies reveal new patterns." },
  { word: "scrutinise", partOfSpeech: "verb", meaning: "examine closely", example: "We scrutinise every detail." },
  { word: "significant", partOfSpeech: "adjective", meaning: "sufficiently great", example: "A significant difference." },
  { word: "simulate", partOfSpeech: "verb", meaning: "imitate", example: "Simulate flight conditions." },
  { word: "speculate", partOfSpeech: "verb", meaning: "form theories", example: "Analysts speculate freely." },
  { word: "subsequent", partOfSpeech: "adjective", meaning: "coming after", example: "Subsequent events confirmed it." },
  { word: "substantial", partOfSpeech: "adjective", meaning: "considerable in size", example: "A substantial sum." },
  { word: "sufficient", partOfSpeech: "adjective", meaning: "enough", example: "Sufficient evidence exists." },
  { word: "suspend", partOfSpeech: "verb", meaning: "halt temporarily", example: "Service was suspended." },
  { word: "synthesise", partOfSpeech: "verb", meaning: "combine into a whole", example: "Synthesise the data." },
  { word: "tangible", partOfSpeech: "adjective", meaning: "perceptible by touch", example: "Tangible benefits." },
  { word: "transcend", partOfSpeech: "verb", meaning: "go beyond limits", example: "Music transcends borders." },
  { word: "transform", partOfSpeech: "verb", meaning: "change form", example: "Technology transforms work." },
  { word: "underlying", partOfSpeech: "adjective", meaning: "lying beneath the surface", example: "Underlying issues remain." },
  { word: "undertake", partOfSpeech: "verb", meaning: "commit to do", example: "Undertake research." },
  { word: "uniform", partOfSpeech: "adjective", meaning: "consistent", example: "Uniform standards apply." },
  { word: "validate", partOfSpeech: "verb", meaning: "confirm validity", example: "Validate the results." },
  { word: "viable", partOfSpeech: "adjective", meaning: "capable of working", example: "A viable solution." },
  { word: "warrant", partOfSpeech: "verb", meaning: "justify", example: "The case warrants action." },
];
