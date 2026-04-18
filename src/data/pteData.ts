/**
 * @file pteData.ts
 * @description PTE Academic question bank, mock tests, and academic vocabulary.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

// ===== Shared tag types =====
export type PteTargetBand = "50" | "65" | "79+";
export type PteCategory = "daily" | "mock" | "prediction";
export type PteAccent = "US" | "UK" | "AU";

export interface PteTags {
  targetBand?: PteTargetBand;
  realExam2026?: boolean;
  category?: PteCategory;
  accent?: PteAccent; // mostly for listening / repeat-sentence
}

// ===== Type definitions =====
export interface PteReadAloud extends PteTags {
  id: string;
  text: string;
  topic: string;
  difficulty: "easy" | "medium" | "hard";
  prepSeconds: number;
  recordSeconds: number;
}

export interface PteRepeatSentence extends PteTags {
  id: string;
  text: string;
  recordSeconds: number;
}

export interface PteEssayPrompt extends PteTags {
  id: string;
  prompt: string;
  minWords: number;
  maxWords: number;
  timeMinutes: number;
  modelOutline?: string;
  modelAnswer?: string;
}

export interface PteSummarizeText extends PteTags {
  id: string;
  passage: string;
  minWords: number;
  maxWords: number;
  timeMinutes: number;
  keyPoints: string[];
}

export interface PteFillBlank extends PteTags {
  id: string;
  passage: string; // tokens use {{n}} placeholder where n is index 1-based
  options: string[]; // pool, includes distractors
  answers: string[]; // ordered correct answers
}

export interface PteReorderItem extends PteTags {
  id: string;
  paragraphs: string[]; // shown shuffled
  correctOrder: number[]; // indices into paragraphs in correct order
  topic: string;
}

export interface PteDictation extends PteTags {
  id: string;
  audioText: string; // text to be spoken via TTS
  difficulty: "easy" | "medium" | "hard";
}

export interface PteSummarizeSpoken extends PteTags {
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

// Describe Image — 25s prep + 40s record. Keyword-based content scoring.
export interface PteDescribeImage extends PteTags {
  id: string;
  imageUrl?: string;       // imported asset URL (optional — fallback to emojiVisual)
  emojiVisual?: string;    // fallback emoji/SVG-style ASCII visual when no image
  title: string;          // short label of the visual (e.g., "Bar chart: Renewable energy")
  chartType: "bar" | "pie" | "line" | "process" | "map" | "table";
  prepSeconds: number;    // PTE standard: 25
  recordSeconds: number;  // PTE standard: 40
  keywords: string[];     // expected vocabulary for content coverage
  modelAnswer: string;    // band-90 sample answer
}

// Retell Lecture — 10s prep + 40s record after listening.
export interface PteRetellLecture extends PteTags {
  id: string;
  topic: string;
  lectureText: string;    // narrated via TTS (~60-90s spoken)
  prepSeconds: number;    // PTE standard: 10
  recordSeconds: number;  // PTE standard: 40
  keywords: string[];     // key concepts to mention
  modelAnswer: string;    // band-90 sample retell
}

// Multiple Choice (single + multi answer) — Reading
export interface PteMcq extends PteTags {
  id: string;
  passage: string;
  question: string;
  options: string[];
  correctIndices: number[]; // length 1 = single, >1 = multiple
  topic: string;
}

// Highlight Incorrect Words — Listening
// Audio is the correct version; transcript shows altered words students must click.
export interface PteHighlightIncorrect extends PteTags {
  id: string;
  audioText: string;          // what the student hears (correct)
  displayText: string;        // what they see (with some words altered)
  incorrectIndices: number[]; // word indices in displayText (split on whitespace) that differ from audioText
  topic: string;
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

// ===== Describe Image bank (4 items) — PTE 25s prep + 40s record =====
import describeImg1 from "@/assets/pte/describe-image-1.jpg";
import describeImg2 from "@/assets/pte/describe-image-2.jpg";
import describeImg3 from "@/assets/pte/describe-image-3.jpg";
import describeImg4 from "@/assets/pte/describe-image-4.jpg";

export const DESCRIBE_IMAGE_BANK: PteDescribeImage[] = [
  {
    id: "di-1",
    imageUrl: describeImg1,
    title: "Bar chart: Global renewable energy capacity (2015–2025)",
    chartType: "bar",
    prepSeconds: 25,
    recordSeconds: 40,
    keywords: ["bar chart", "renewable energy", "increase", "solar", "wind", "2015", "2025", "growth", "capacity", "trend"],
    modelAnswer:
      "The bar chart illustrates global renewable energy capacity from 2015 to 2025. Overall, capacity has shown a steady upward trend across the decade. Solar and wind sources lead the expansion, while hydro remains relatively stable. The most striking feature is the sharp increase between 2020 and 2025, suggesting accelerating investment. In conclusion, renewable energy capacity has grown significantly over this ten-year period.",
  },
  {
    id: "di-2",
    imageUrl: describeImg2,
    title: "Pie chart: World population distribution by continent",
    chartType: "pie",
    prepSeconds: 25,
    recordSeconds: 40,
    keywords: ["pie chart", "population", "distribution", "Asia", "Africa", "Europe", "largest", "smallest", "proportion", "continent"],
    modelAnswer:
      "The pie chart presents the distribution of the world's population by continent. Asia clearly accounts for the largest proportion, followed by Africa, while Europe and the Americas hold smaller shares. Oceania represents the smallest segment. Overall, the data highlights a heavy concentration of population in Asia and Africa, which together make up the majority of the world's inhabitants.",
  },
  {
    id: "di-3",
    imageUrl: describeImg3,
    title: "Line graph: Global internet users (2000–2025)",
    chartType: "line",
    prepSeconds: 25,
    recordSeconds: 40,
    keywords: ["line graph", "internet users", "increase", "rise", "2000", "2025", "billion", "growth", "trend", "steady"],
    modelAnswer:
      "The line graph shows the number of internet users worldwide from 2000 to 2025. Overall, the figure rose dramatically across the period. Starting from a relatively low base, the number climbed steadily through the 2010s before reaching its peak in the most recent years. The upward trend reflects rapid digital adoption, with internet access now reaching a substantial portion of the global population.",
  },
  {
    id: "di-4",
    imageUrl: describeImg4,
    title: "Process diagram: The water cycle",
    chartType: "process",
    prepSeconds: 25,
    recordSeconds: 40,
    keywords: ["water cycle", "evaporation", "condensation", "precipitation", "ocean", "clouds", "rivers", "process", "stages", "natural"],
    modelAnswer:
      "The diagram illustrates the natural water cycle, a continuous process consisting of four main stages. Initially, water evaporates from the ocean surface due to the sun's heat. Next, the vapour rises and condenses into clouds. Subsequently, precipitation falls as rain over land, gathering into rivers. Finally, the rivers carry the water back to the ocean, completing the cycle.",
  },
];

// ===== Retell Lecture bank (4 items) — PTE 10s prep + 40s record =====
export const RETELL_LECTURE_BANK: PteRetellLecture[] = [
  {
    id: "rl-1",
    topic: "Climate Change Adaptation",
    prepSeconds: 10,
    recordSeconds: 40,
    lectureText:
      "Today we will look at climate change adaptation. Unlike mitigation, which aims to reduce emissions, adaptation focuses on adjusting to climate impacts that are already occurring. Coastal cities are building sea walls and restoring mangrove forests to protect against rising sea levels. Farmers are switching to drought-resistant crops, while urban planners are creating green roofs to lower city temperatures. Successful adaptation requires long-term planning, scientific data, and strong community involvement.",
    keywords: ["climate change", "adaptation", "mitigation", "sea walls", "mangrove", "drought-resistant", "green roofs", "planning", "community"],
    modelAnswer:
      "The lecture discussed climate change adaptation, which differs from mitigation by focusing on adjusting to existing impacts. Examples include sea walls, mangrove restoration, drought-resistant crops, and green roofs. The speaker emphasised that effective adaptation depends on long-term planning, scientific evidence, and community participation.",
  },
  {
    id: "rl-2",
    topic: "Cognitive Benefits of Bilingualism",
    prepSeconds: 10,
    recordSeconds: 40,
    lectureText:
      "Research over the past two decades has consistently shown that bilingual individuals enjoy several cognitive advantages. Speaking two languages strengthens executive function, particularly the ability to switch between tasks and ignore distractions. Bilinguals also tend to perform better on memory tests and may experience a delay in the onset of dementia by as much as four years. These benefits arise because managing two languages constantly exercises the brain.",
    keywords: ["bilingualism", "cognitive", "executive function", "memory", "dementia", "brain", "task switching", "advantages"],
    modelAnswer:
      "The lecture explained the cognitive benefits of bilingualism. Speaking two languages improves executive function, task switching, and memory. Studies also suggest bilinguals may experience dementia onset up to four years later. These advantages occur because managing two languages constantly exercises the brain.",
  },
  {
    id: "rl-3",
    topic: "The Industrial Revolution",
    prepSeconds: 10,
    recordSeconds: 40,
    lectureText:
      "The Industrial Revolution, which began in Britain in the late eighteenth century, transformed economies and societies on a global scale. The introduction of the steam engine, mechanised textile production, and railways dramatically increased output and reduced transport costs. Cities expanded rapidly as workers moved from farms to factories. While living standards eventually rose, the early decades brought difficult working conditions, child labour, and significant environmental pollution.",
    keywords: ["Industrial Revolution", "Britain", "steam engine", "textile", "railways", "factories", "urbanisation", "working conditions", "pollution"],
    modelAnswer:
      "The lecture covered the Industrial Revolution, which began in Britain in the late 1700s. Innovations such as the steam engine, mechanised textiles, and railways boosted production and lowered transport costs. Workers moved from farms to factories, leading to rapid urbanisation. Although living standards eventually improved, the early period featured harsh conditions, child labour, and pollution.",
  },
  {
    id: "rl-4",
    topic: "Microplastics in the Environment",
    prepSeconds: 10,
    recordSeconds: 40,
    lectureText:
      "Microplastics are tiny plastic fragments smaller than five millimetres that have spread throughout the environment. They originate from the breakdown of larger plastics, synthetic clothing fibres, and personal care products such as exfoliating scrubs. Scientists have detected microplastics in oceans, drinking water, and even human blood. Although their long-term health effects are still being studied, governments are responding with bans on single-use plastics and microbeads in cosmetics.",
    keywords: ["microplastics", "fragments", "synthetic", "fibres", "oceans", "drinking water", "human blood", "single-use", "regulations"],
    modelAnswer:
      "The lecture described microplastics — plastic fragments under five millimetres found throughout the environment. They come from broken-down plastics, synthetic clothing fibres, and personal care products. Microplastics have been detected in oceans, drinking water, and human blood. Governments are now banning single-use plastics and cosmetic microbeads while research on health effects continues.",
  },
];


// ===========================================================
// MASSIVE EXPANSION (Auto-generated batch — 2026 content drop)
// All comments in English. Existing items above remain untouched.
// ===========================================================

// ===== Read Aloud expansion (25 new items: ra-11 .. ra-35) =====
export const READ_ALOUD_EXPANSION: PteReadAloud[] = [
  { id: "ra-11", topic: "Science", difficulty: "hard", prepSeconds: 35, recordSeconds: 40, targetBand: "79+", realExam2026: true, category: "mock", text: "Photosynthesis converts sunlight into chemical energy stored in plant tissues. Through a complex sequence of reactions in the chloroplasts, plants absorb carbon dioxide and water, releasing oxygen as a vital by-product that sustains most life on Earth." },
  { id: "ra-12", topic: "Science", difficulty: "medium", prepSeconds: 35, recordSeconds: 40, targetBand: "65", category: "daily", text: "Vaccines train the immune system to recognise harmful pathogens before infection occurs. By introducing a weakened or inactive component of a virus, the body learns to mount a rapid response, protecting individuals and reducing community transmission." },
  { id: "ra-13", topic: "Science", difficulty: "hard", prepSeconds: 35, recordSeconds: 40, targetBand: "79+", realExam2026: true, category: "prediction", text: "The discovery of CRISPR gene-editing technology has revolutionised molecular biology. Researchers can now precisely modify DNA sequences, opening unprecedented possibilities for treating genetic disorders, improving crop resilience, and understanding the fundamental mechanisms of cellular life." },
  { id: "ra-14", topic: "Science", difficulty: "medium", prepSeconds: 35, recordSeconds: 40, targetBand: "65", category: "daily", text: "Marine biologists have documented an alarming decline in coral cover across tropical oceans. Warmer waters trigger bleaching events that disrupt symbiotic relationships between coral polyps and the algae they depend on for food and colour." },
  { id: "ra-15", topic: "Science", difficulty: "easy", prepSeconds: 35, recordSeconds: 40, targetBand: "50", category: "daily", text: "Astronomers use powerful telescopes to study distant galaxies and stars. By analysing the light that travels billions of years to reach Earth, scientists can learn about the origin and structure of the universe." },
  { id: "ra-16", topic: "Science", difficulty: "hard", prepSeconds: 35, recordSeconds: 40, targetBand: "79+", realExam2026: true, category: "mock", text: "Neuroscientists have mapped the activity of millions of neurons during decision-making tasks. Their findings suggest that even seemingly rational choices are influenced by subconscious networks, shaping behaviour long before individuals are consciously aware." },
  { id: "ra-17", topic: "History", difficulty: "medium", prepSeconds: 35, recordSeconds: 40, targetBand: "65", category: "daily", text: "The Silk Road connected Europe and Asia for over a thousand years, enabling the exchange of goods, ideas, and technologies. Merchants carried silk, spices, and precious metals, while travellers spread religion, science, and artistic traditions." },
  { id: "ra-18", topic: "History", difficulty: "hard", prepSeconds: 35, recordSeconds: 40, targetBand: "79+", realExam2026: true, category: "prediction", text: "The Renaissance marked a profound shift in European thought, blending classical learning with new scientific inquiry. Patrons funded artists, philosophers, and inventors, producing breakthroughs in painting, anatomy, astronomy, and political theory that still shape modern culture." },
  { id: "ra-19", topic: "History", difficulty: "easy", prepSeconds: 35, recordSeconds: 40, targetBand: "50", category: "daily", text: "Ancient Egyptian society was organised around the Nile River. Annual floods deposited rich soil that supported agriculture, allowing communities to grow into cities ruled by powerful pharaohs." },
  { id: "ra-20", topic: "History", difficulty: "medium", prepSeconds: 35, recordSeconds: 40, targetBand: "65", category: "mock", text: "The Industrial Revolution began in eighteenth-century Britain and spread rapidly across the globe. Steam engines, mechanised factories, and improved transport networks transformed economies, urban landscapes, and the daily lives of millions of workers." },
  { id: "ra-21", topic: "History", difficulty: "hard", prepSeconds: 35, recordSeconds: 40, targetBand: "79+", realExam2026: true, category: "prediction", text: "World War One reshaped political boundaries across Europe and the Middle East. Empires that had endured for centuries collapsed, new nations emerged, and the conflict left deep social and economic scars that influenced policies throughout the twentieth century." },
  { id: "ra-22", topic: "History", difficulty: "medium", prepSeconds: 35, recordSeconds: 40, targetBand: "65", category: "daily", text: "Archaeological excavations at ancient sites continue to reveal previously unknown civilisations. Each artefact provides clues about diet, religion, trade routes, and the social hierarchies of communities that flourished thousands of years ago." },
  { id: "ra-23", topic: "Economy", difficulty: "medium", prepSeconds: 35, recordSeconds: 40, targetBand: "65", realExam2026: true, category: "daily", text: "Global supply chains rely on the efficient movement of raw materials, manufactured components, and finished products. Disruptions caused by natural disasters, geopolitical tensions, or pandemics can quickly raise costs and create shortages worldwide." },
  { id: "ra-24", topic: "Economy", difficulty: "hard", prepSeconds: 35, recordSeconds: 40, targetBand: "79+", category: "mock", text: "Central banks influence economic activity by adjusting interest rates and managing money supply. Lower rates typically encourage borrowing and investment, while higher rates aim to control inflation by reducing consumer spending." },
  { id: "ra-25", topic: "Economy", difficulty: "easy", prepSeconds: 35, recordSeconds: 40, targetBand: "50", category: "daily", text: "Small businesses play an important role in local economies. They create jobs, support community life, and often introduce innovative products that larger companies later adopt." },
  { id: "ra-26", topic: "Economy", difficulty: "hard", prepSeconds: 35, recordSeconds: 40, targetBand: "79+", realExam2026: true, category: "prediction", text: "Cryptocurrencies have emerged as a controversial alternative to traditional banking systems. While supporters highlight decentralisation and transparency, critics warn about volatility, energy consumption, and the use of digital currencies in illicit transactions." },
  { id: "ra-27", topic: "Economy", difficulty: "medium", prepSeconds: 35, recordSeconds: 40, targetBand: "65", category: "mock", text: "Foreign direct investment can accelerate development in emerging economies by funding infrastructure, transferring technology, and creating skilled employment. Governments often compete to attract investors through tax incentives and regulatory reforms." },
  { id: "ra-28", topic: "Economy", difficulty: "hard", prepSeconds: 35, recordSeconds: 40, targetBand: "79+", realExam2026: true, category: "prediction", text: "Income inequality has widened in many developed countries despite overall economic growth. Economists debate whether globalisation, automation, or shifts in tax policy bear primary responsibility for the gap." },
  { id: "ra-29", topic: "Education", difficulty: "easy", prepSeconds: 35, recordSeconds: 40, targetBand: "50", category: "daily", text: "Modern classrooms increasingly integrate technology to enrich learning. Interactive whiteboards, tablets, and educational software allow teachers to present material in engaging, multi-sensory ways that suit different learning styles." },
  { id: "ra-30", topic: "Education", difficulty: "medium", prepSeconds: 35, recordSeconds: 40, targetBand: "65", realExam2026: true, category: "daily", text: "Lifelong learning has become essential in a rapidly changing job market. Adults pursue short courses, online certifications, and professional workshops to acquire new skills and remain competitive throughout their careers." },
  { id: "ra-31", topic: "Education", difficulty: "hard", prepSeconds: 35, recordSeconds: 40, targetBand: "79+", category: "mock", text: "Inclusive education ensures that students of all abilities learn together in supportive environments. Teachers adapt instruction, materials, and assessments so that each child can participate meaningfully and reach their full potential." },
  { id: "ra-32", topic: "Education", difficulty: "medium", prepSeconds: 35, recordSeconds: 40, targetBand: "65", realExam2026: true, category: "prediction", text: "Critical thinking is widely regarded as one of the most valuable academic skills. By questioning assumptions, evaluating evidence, and weighing alternative viewpoints, students learn to reason independently in any discipline." },
  { id: "ra-33", topic: "Education", difficulty: "hard", prepSeconds: 35, recordSeconds: 40, targetBand: "79+", category: "mock", text: "International student mobility has expanded dramatically over the past two decades. Universities in English-speaking countries host millions of learners who contribute cultural diversity, research collaboration, and significant economic activity." },
  { id: "ra-34", topic: "Education", difficulty: "easy", prepSeconds: 35, recordSeconds: 40, targetBand: "50", category: "daily", text: "Reading aloud to young children supports vocabulary development and emotional bonding. Even brief daily sessions can foster a lifelong love of books and improve later academic performance." },
  { id: "ra-35", topic: "Education", difficulty: "hard", prepSeconds: 35, recordSeconds: 40, targetBand: "79+", realExam2026: true, category: "prediction", text: "Massive open online courses, often called MOOCs, have democratised access to higher learning. Students from any country can now follow lectures from leading universities, earning certificates that increasingly carry weight with employers." }
];

// ===== Repeat Sentence expansion (50 new items: rs-9 .. rs-58) =====
export const REPEAT_SENTENCE_EXPANSION: PteRepeatSentence[] = [
  { id: "rs-9", text: "The professor will share his slides after the lecture finishes.", recordSeconds: 15, targetBand: "50", category: "daily", accent: "US" },
  { id: "rs-10", text: "New research suggests that meditation can improve concentration over time.", recordSeconds: 15, targetBand: "65", realExam2026: true, category: "daily", accent: "UK" },
  { id: "rs-11", text: "Coastal communities are vulnerable to flooding during severe storms.", recordSeconds: 15, targetBand: "65", realExam2026: true, category: "prediction", accent: "AU" },
  { id: "rs-12", text: "Universities provide scholarships to students from disadvantaged backgrounds.", recordSeconds: 15, targetBand: "65", category: "daily", accent: "UK" },
  { id: "rs-13", text: "The committee approved the budget proposal with minor amendments.", recordSeconds: 15, targetBand: "65", category: "mock", accent: "US" },
  { id: "rs-14", text: "Renewable technologies have become more affordable in recent years.", recordSeconds: 15, targetBand: "65", realExam2026: true, category: "daily", accent: "AU" },
  { id: "rs-15", text: "Cultural festivals attract thousands of visitors to the city centre.", recordSeconds: 15, targetBand: "50", category: "daily", accent: "UK" },
  { id: "rs-16", text: "The library extends its opening hours during the examination period.", recordSeconds: 15, targetBand: "50", category: "daily", accent: "US" },
  { id: "rs-17", text: "Modern architecture often blends traditional materials with innovative designs.", recordSeconds: 15, targetBand: "65", category: "mock", accent: "AU" },
  { id: "rs-18", text: "Historians study primary sources to understand events of the past.", recordSeconds: 15, targetBand: "65", category: "daily", accent: "UK" },
  { id: "rs-19", text: "Sustainable transport is essential for reducing urban air pollution.", recordSeconds: 15, targetBand: "65", realExam2026: true, category: "prediction", accent: "US" },
  { id: "rs-20", text: "The student council organised a debate on climate policy yesterday.", recordSeconds: 15, targetBand: "65", category: "daily", accent: "AU" },
  { id: "rs-21", text: "Online platforms enable researchers to collaborate across different time zones.", recordSeconds: 15, targetBand: "79+", realExam2026: true, category: "mock", accent: "UK" },
  { id: "rs-22", text: "Companies are increasingly adopting flexible working arrangements after the pandemic.", recordSeconds: 15, targetBand: "65", realExam2026: true, category: "prediction", accent: "US" },
  { id: "rs-23", text: "Scientists examine ice cores to reconstruct ancient climate conditions.", recordSeconds: 15, targetBand: "79+", realExam2026: true, category: "mock", accent: "UK" },
  { id: "rs-24", text: "Volunteers contribute thousands of hours to community service annually.", recordSeconds: 15, targetBand: "50", category: "daily", accent: "US" },
  { id: "rs-25", text: "Lecturers encourage students to develop independent research skills.", recordSeconds: 15, targetBand: "65", category: "daily", accent: "AU" },
  { id: "rs-26", text: "Clean water access remains a major challenge in many developing regions.", recordSeconds: 15, targetBand: "65", realExam2026: true, category: "prediction", accent: "UK" },
  { id: "rs-27", text: "Economic policies often have unintended consequences for vulnerable groups.", recordSeconds: 15, targetBand: "79+", category: "mock", accent: "US" },
  { id: "rs-28", text: "The exhibition features paintings borrowed from several international museums.", recordSeconds: 15, targetBand: "65", category: "daily", accent: "AU" },
  { id: "rs-29", text: "Digital literacy is now considered a core skill for modern employment.", recordSeconds: 15, targetBand: "65", realExam2026: true, category: "prediction", accent: "UK" },
  { id: "rs-30", text: "The deadline for conference submissions has been extended by two weeks.", recordSeconds: 15, targetBand: "50", category: "daily", accent: "US" },
  { id: "rs-31", text: "Public transport upgrades will reduce commuting times in the suburbs.", recordSeconds: 15, targetBand: "65", category: "daily", accent: "AU" },
  { id: "rs-32", text: "Environmental scientists monitor air quality using a network of sensors.", recordSeconds: 15, targetBand: "79+", realExam2026: true, category: "mock", accent: "UK" },
  { id: "rs-33", text: "Effective teamwork depends on clear communication and mutual respect.", recordSeconds: 15, targetBand: "65", category: "daily", accent: "US" },
  { id: "rs-34", text: "Researchers presented their findings at the annual scientific conference.", recordSeconds: 15, targetBand: "65", category: "daily", accent: "UK" },
  { id: "rs-35", text: "Many coastal cities are investing in flood defence systems.", recordSeconds: 15, targetBand: "65", realExam2026: true, category: "prediction", accent: "AU" },
  { id: "rs-36", text: "Education policies should reflect the diverse needs of student populations.", recordSeconds: 15, targetBand: "79+", category: "mock", accent: "UK" },
  { id: "rs-37", text: "Recent studies highlight the importance of sleep for memory formation.", recordSeconds: 15, targetBand: "65", realExam2026: true, category: "prediction", accent: "US" },
  { id: "rs-38", text: "The journal publishes articles on health, education, and social policy.", recordSeconds: 15, targetBand: "65", category: "daily", accent: "AU" },
  { id: "rs-39", text: "Modern museums use interactive technology to engage younger visitors.", recordSeconds: 15, targetBand: "65", category: "daily", accent: "UK" },
  { id: "rs-40", text: "The agricultural sector faces growing pressure to reduce water consumption.", recordSeconds: 15, targetBand: "79+", realExam2026: true, category: "mock", accent: "US" },
  { id: "rs-41", text: "Public lectures are open to all members of the university community.", recordSeconds: 15, targetBand: "50", category: "daily", accent: "AU" },
  { id: "rs-42", text: "Industrial waste management requires careful regulation and enforcement.", recordSeconds: 15, targetBand: "79+", category: "mock", accent: "UK" },
  { id: "rs-43", text: "Career counsellors help students explore opportunities beyond the classroom.", recordSeconds: 15, targetBand: "65", category: "daily", accent: "US" },
  { id: "rs-44", text: "Several international agreements aim to protect endangered species.", recordSeconds: 15, targetBand: "65", realExam2026: true, category: "prediction", accent: "UK" },
  { id: "rs-45", text: "Distance learning has become an integral part of higher education.", recordSeconds: 15, targetBand: "65", realExam2026: true, category: "daily", accent: "AU" },
  { id: "rs-46", text: "Traditional crafts are being preserved through community workshops.", recordSeconds: 15, targetBand: "50", category: "daily", accent: "UK" },
  { id: "rs-47", text: "Government grants support innovation in small and medium enterprises.", recordSeconds: 15, targetBand: "65", category: "mock", accent: "US" },
  { id: "rs-48", text: "Marine biologists study coral reefs to monitor ocean health.", recordSeconds: 15, targetBand: "79+", realExam2026: true, category: "mock", accent: "AU" },
  { id: "rs-49", text: "The seminar will discuss the future of artificial intelligence in medicine.", recordSeconds: 15, targetBand: "79+", realExam2026: true, category: "prediction", accent: "UK" },
  { id: "rs-50", text: "Linguists examine how languages evolve over centuries of contact.", recordSeconds: 15, targetBand: "79+", category: "mock", accent: "US" },
  { id: "rs-51", text: "Online forums allow patients to share their experiences with others.", recordSeconds: 15, targetBand: "65", category: "daily", accent: "AU" },
  { id: "rs-52", text: "Renewable energy projects create employment in rural communities.", recordSeconds: 15, targetBand: "65", realExam2026: true, category: "prediction", accent: "UK" },
  { id: "rs-53", text: "Photographers documented the construction of the new museum building.", recordSeconds: 15, targetBand: "50", category: "daily", accent: "US" },
  { id: "rs-54", text: "The economic recovery has been uneven across different industries.", recordSeconds: 15, targetBand: "79+", realExam2026: true, category: "mock", accent: "UK" },
  { id: "rs-55", text: "Innovative teaching methods can transform student engagement levels.", recordSeconds: 15, targetBand: "65", category: "daily", accent: "AU" },
  { id: "rs-56", text: "The campus radio station broadcasts interviews with visiting scholars.", recordSeconds: 15, targetBand: "50", category: "daily", accent: "US" },
  { id: "rs-57", text: "Modern psychology emphasises the role of environment in shaping behaviour.", recordSeconds: 15, targetBand: "79+", category: "mock", accent: "UK" },
  { id: "rs-58", text: "The conference proceedings will be published in an open-access journal.", recordSeconds: 15, targetBand: "65", realExam2026: true, category: "daily", accent: "AU" }
];

// ===== Essay expansion (10 new items: es-9 .. es-18) =====
export const ESSAY_EXPANSION: PteEssayPrompt[] = [
  { id: "es-9", minWords: 200, maxWords: 300, timeMinutes: 20, targetBand: "79+", realExam2026: true, category: "prediction",
    prompt: "Climate change is increasingly affecting daily life. Some governments respond with strict environmental regulations, while others prioritise economic growth. Discuss both views and give your own opinion.",
    modelOutline: "Intro → Regulation view → Growth view → Your opinion → Conclusion",
    modelAnswer: "Climate change has become one of the defining challenges of the twenty-first century. While some governments respond with strict environmental regulations such as carbon taxes and emission caps, others continue to prioritise economic growth, fearing that aggressive policies may harm competitiveness. This essay will examine both perspectives before arguing that long-term sustainability and economic prosperity are mutually reinforcing.\n\nProponents of strict regulation argue that without binding rules, market forces alone will not deliver meaningful reductions in greenhouse gases. Stringent standards on industry, transport, and construction can rapidly accelerate the transition to clean technologies, as seen in the European Union's emissions trading scheme.\n\nOn the other hand, supporters of growth-first policies maintain that wealth generated by industry funds the very innovations needed to solve environmental problems. They warn that excessive regulation could push manufacturing to less regulated economies, achieving nothing globally while damaging domestic jobs.\n\nIn my opinion, these views are not incompatible. Well-designed regulation can guide investment toward green industries, creating high-skilled employment while cutting emissions. Countries such as Denmark and South Korea demonstrate that ambitious climate policy can coexist with strong economic performance.\n\nIn conclusion, although the debate often presents environmental protection and economic growth as opposing goals, the evidence suggests they can be aligned through smart policy and sustained investment in green technology." },
  { id: "es-10", minWords: 200, maxWords: 300, timeMinutes: 20, targetBand: "79+", realExam2026: true, category: "prediction",
    prompt: "Artificial intelligence is rapidly transforming many industries. Some believe it will eliminate millions of jobs, while others argue it will create new opportunities. Discuss both views and share your own opinion.",
    modelOutline: "Intro → Job loss view → Opportunity view → Your view → Conclusion",
    modelAnswer: "The rapid rise of artificial intelligence is fuelling intense debate about its impact on employment. While critics warn that automation will eliminate millions of routine jobs, optimists believe AI will generate entirely new categories of work. This essay considers both arguments and concludes that proactive education policy is the deciding factor.\n\nThose who fear large-scale displacement point to evidence in manufacturing, customer service, and transport. Algorithms now perform tasks that once required human judgement, from invoice processing to medical imaging analysis. Without intervention, large numbers of workers may struggle to retrain in time.\n\nOn the other hand, history suggests that technological revolutions ultimately create more jobs than they destroy. Demand is already rising for AI ethicists, prompt engineers, and data analysts. New industries built around AI tools will likely require human creativity, empathy, and domain expertise.\n\nIn my view, both outcomes are possible, depending on how societies prepare. Countries that invest in lifelong learning, technical training, and social safety nets will manage the transition successfully, while those that ignore reskilling may face widening inequality.\n\nIn conclusion, AI is neither purely a threat nor purely a benefit; the outcome depends on policy decisions made today regarding education, regulation, and worker support." },
  { id: "es-11", minWords: 200, maxWords: 300, timeMinutes: 20, targetBand: "65", realExam2026: true, category: "prediction",
    prompt: "Online learning has expanded rapidly in recent years. Some argue that it offers unprecedented access to education, while others believe it cannot replace traditional classrooms. Discuss both views and give your own opinion.",
    modelOutline: "Intro → Access view → Classroom view → Opinion → Conclusion",
    modelAnswer: "Online learning has grown into a major global industry, accelerated by the pandemic and supported by widespread internet access. Supporters celebrate it as a democratising force, while sceptics argue that it cannot match the depth of traditional classroom education. This essay examines both views and argues for a balanced hybrid model.\n\nAdvocates emphasise that online platforms allow learners in remote areas to access world-class lectures, recorded materials, and global mentors. Flexibility in timing also helps working adults and parents pursue qualifications that would otherwise be impossible.\n\nHowever, opponents highlight the importance of face-to-face interaction. In-person discussion, body language, and spontaneous questioning create deeper engagement, while laboratory and clinical practice cannot easily be replicated online. Self-discipline issues also limit completion rates for purely digital programmes.\n\nIn my view, the best approach combines both. Hybrid learning leverages the scale of online resources while preserving the social and practical benefits of traditional classrooms.\n\nIn conclusion, although online learning offers remarkable accessibility, it should complement rather than replace classroom instruction, especially for younger students and skill-based subjects." },
  { id: "es-12", minWords: 200, maxWords: 300, timeMinutes: 20, targetBand: "79+", category: "mock",
    prompt: "Many people believe that governments should invest heavily in space exploration, while others argue that funds should be spent on solving problems on Earth. Discuss both views and give your opinion.",
    modelOutline: "Intro → Space view → Earth view → Opinion → Conclusion",
    modelAnswer: "Space exploration captures the human imagination, yet it remains an expensive endeavour. Some believe governments should invest heavily in missions to the Moon and Mars, while others argue that public funds are better spent on pressing terrestrial issues. This essay discusses both views before concluding that balanced investment is the most rational approach.\n\nSupporters of space programmes argue that exploration drives technological innovation. Satellite communication, weather forecasting, and advances in medicine all originated from space research. Furthermore, understanding other planets may eventually be essential for the long-term survival of humanity.\n\nCritics counter that millions of people still lack clean water, healthcare, and quality education. They believe that diverting billions to distant planets is morally questionable when so many basic needs remain unmet on Earth.\n\nIn my view, the choice need not be binary. Modest, sustained investment in space science can generate broad benefits while leaving the bulk of public spending available for social priorities such as health, education, and climate adaptation.\n\nIn conclusion, although space exploration is valuable, governments must continue to prioritise the wellbeing of their citizens, treating space as a complement rather than a substitute for development on Earth." },
  { id: "es-13", minWords: 200, maxWords: 300, timeMinutes: 20, targetBand: "65", category: "mock",
    prompt: "Some people believe that the best way to learn a new language is to live in a country where it is spoken, while others argue that classroom study is more effective. Discuss both views and give your opinion.",
    modelOutline: "Intro → Immersion view → Classroom view → Opinion → Conclusion",
    modelAnswer: "Language learning is increasingly important in a globalised world. Some learners argue that immersion in a country where the target language is spoken is the most effective approach, while others believe that structured classroom study delivers better results. This essay considers both views and concludes that a combination is ideal.\n\nImmersion offers constant exposure, authentic interaction, and cultural insight that no textbook can fully replicate. Daily life forces learners to use the language for real purposes, often accelerating fluency.\n\nClassroom learning, however, provides systematic grammar instruction, expert feedback, and structured progression. Without this foundation, immersion learners may develop fluent but inaccurate speech that is difficult to correct later.\n\nIn my opinion, the ideal path begins with classroom study to establish strong fundamentals, followed by immersion to develop confidence, fluency, and cultural understanding.\n\nIn conclusion, both methods have unique strengths, and combining them produces the most balanced and durable language proficiency." },
  { id: "es-14", minWords: 200, maxWords: 300, timeMinutes: 20, targetBand: "65", category: "daily",
    prompt: "In some countries, an increasing number of young people choose to live alone before marriage. What are the causes of this trend and what are its possible effects?",
    modelOutline: "Intro → Causes → Effects → Conclusion",
    modelAnswer: "Across many developed nations, more young adults are choosing to live alone before marriage. This essay examines the main causes of this trend and explores its potential consequences for individuals and society.\n\nSeveral factors drive the rise in solo living. Economic independence allows graduates to afford their own apartments, while changing social attitudes have removed much of the stigma once attached to single life. Career mobility also encourages relocating for work without the constraints of cohabitation.\n\nThe effects of this trend are mixed. On one hand, living alone fosters self-reliance, personal growth, and financial responsibility. On the other, it can contribute to feelings of isolation and place upward pressure on housing demand, raising rents in major cities.\n\nIn conclusion, solo living among young adults reflects broader shifts in economy, culture, and personal values. Policymakers should respond by ensuring affordable housing and supporting community spaces that combat loneliness." },
  { id: "es-15", minWords: 200, maxWords: 300, timeMinutes: 20, targetBand: "79+", category: "mock",
    prompt: "Some people argue that technology has made human life more comfortable but less meaningful. To what extent do you agree or disagree?",
    modelOutline: "Intro + position → Argument 1 → Argument 2 → Counter → Conclusion",
    modelAnswer: "It is widely claimed that modern technology, while offering unprecedented comfort, has stripped daily life of meaning. I largely agree with this perspective, although I believe technology itself is neutral and the issue lies in how individuals use it.\n\nFirstly, the convenience offered by smartphones, food delivery, and streaming services often replaces activities that previously required effort and social interaction. Cooking with family or visiting friends has been substituted by passive consumption, eroding emotional bonds and personal achievement.\n\nSecondly, constant connectivity blurs the line between work and rest. Notifications fragment attention, making it difficult to engage deeply in any one activity, whether reading, conversing, or simply being present with loved ones.\n\nHowever, technology also enables meaningful experiences when used purposefully. Online communities support people with rare conditions, video calls reunite distant relatives, and digital tools empower creators worldwide.\n\nIn conclusion, while modern conveniences can erode meaning when used passively, the same technologies can enrich life when used with intention. The responsibility lies with individuals and educators to cultivate mindful habits." },
  { id: "es-16", minWords: 200, maxWords: 300, timeMinutes: 20, targetBand: "65", realExam2026: true, category: "mock",
    prompt: "Some governments have introduced taxes on sugary drinks to reduce obesity rates. Do you think this is an effective policy?",
    modelOutline: "Intro + position → Reason 1 → Reason 2 → Counter → Conclusion",
    modelAnswer: "In recent years, several governments have introduced taxes on sugary drinks in an effort to reduce obesity rates. I believe this policy can be effective, although it should form part of a broader strategy.\n\nFirstly, evidence from countries such as Mexico and the United Kingdom shows that sugar taxes reduce consumption of sweetened beverages, particularly among low-income households where obesity rates are often highest. Many manufacturers have also reformulated products to lower sugar content and avoid the tax.\n\nSecondly, revenue raised can be reinvested in public health campaigns, school nutrition programmes, and sports facilities, multiplying the policy's positive impact.\n\nHowever, critics argue that sugar taxes alone cannot solve a complex problem. Obesity is influenced by lifestyle, education, food advertising, and access to fresh produce. Without complementary measures, the impact may be modest.\n\nIn conclusion, taxing sugary drinks is a useful tool that can drive meaningful behavioural change, but it works best when combined with broader public health interventions." },
  { id: "es-17", minWords: 200, maxWords: 300, timeMinutes: 20, targetBand: "65", realExam2026: true, category: "daily",
    prompt: "Many cities are encouraging residents to use public transport instead of private cars. What are the benefits and challenges of this approach?",
    modelOutline: "Intro → Benefits → Challenges → Conclusion",
    modelAnswer: "To combat congestion and pollution, many cities are urging residents to switch from private cars to public transport. This essay outlines the main benefits and challenges of such a policy.\n\nThe benefits are substantial. Public transport reduces traffic congestion, lowers emissions, and decreases the demand for parking, which frees urban space for housing and green areas. Buses and trains are also more energy-efficient per passenger and improve air quality across the city.\n\nHowever, important challenges remain. Existing networks in many cities are insufficient or unreliable, discouraging would-be users. Initial infrastructure investment is high, and changing long-standing habits requires cultural shifts as well as financial incentives.\n\nIn conclusion, while public transport offers clear environmental and social advantages, governments must invest in capacity, reliability, and affordability to convince residents to leave their cars at home." },
  { id: "es-18", minWords: 200, maxWords: 300, timeMinutes: 20, targetBand: "79+", realExam2026: true, category: "prediction",
    prompt: "Some experts believe that children should learn coding from primary school, while others argue that traditional skills should remain the priority. Discuss both views and give your own opinion.",
    modelOutline: "Intro → Coding view → Traditional view → Opinion → Conclusion",
    modelAnswer: "As digital technology becomes ubiquitous, debate has intensified about whether coding should be taught from primary school. While some experts argue this will prepare children for future careers, others believe traditional skills should remain the priority. This essay weighs both views and concludes that integration is the best approach.\n\nProponents of early coding emphasise that programming develops logical thinking, problem-solving, and creativity. Familiarity with technology from a young age also reduces digital divides and prepares students for a labour market where computational literacy is highly valued.\n\nOn the other hand, defenders of traditional curricula remind us that reading, writing, mathematics, and social skills form the foundation of all later learning. Excessive screen time at a young age may undermine attention and interpersonal development.\n\nIn my opinion, coding should not replace traditional subjects but be carefully integrated alongside them. Short, age-appropriate sessions can introduce computational thinking without compromising core literacy and numeracy.\n\nIn conclusion, the best preparation for a digital future combines strong fundamentals with early exposure to technology, teaching children both timeless skills and modern tools." }
];

// ===== Summarize Written Text expansion (10 new items: sw-7 .. sw-16) =====
export const SUMMARIZE_TEXT_EXPANSION: PteSummarizeText[] = [
  { id: "sw-7", minWords: 5, maxWords: 75, timeMinutes: 10, targetBand: "79+", realExam2026: true, category: "prediction",
    passage: "Quantum computers harness the principles of superposition and entanglement to perform calculations far beyond the reach of classical machines. Researchers believe these systems could one day simulate complex molecules, accelerate drug discovery, and break current cryptographic standards. However, large-scale quantum computers remain extraordinarily difficult to build because qubits are sensitive to noise and require near-absolute-zero operating environments.",
    keyPoints: ["quantum computing principles", "potential applications", "difficulty of construction", "environmental requirements"] },
  { id: "sw-8", minWords: 5, maxWords: 75, timeMinutes: 10, targetBand: "79+", category: "mock",
    passage: "Indigenous knowledge systems have managed local ecosystems for thousands of years through detailed observation, oral tradition, and adaptive practice. Recent research highlights how integrating this knowledge with modern conservation science improves outcomes for forests, fisheries, and wildlife corridors. Yet the contributions of indigenous communities are still under-recognised in global environmental policy frameworks.",
    keyPoints: ["indigenous knowledge", "management practices", "integration with science", "under-recognition"] },
  { id: "sw-9", minWords: 5, maxWords: 75, timeMinutes: 10, targetBand: "65", realExam2026: true, category: "daily",
    passage: "The shift to remote work has produced both opportunities and challenges for global companies. Employees gain flexibility and reduced commuting time, while organisations can recruit talent from anywhere in the world. On the other hand, building team cohesion, training new hires, and protecting mental health become more difficult in fully distributed environments.",
    keyPoints: ["remote work growth", "employee benefits", "global talent", "social and management challenges"] },
  { id: "sw-10", minWords: 5, maxWords: 75, timeMinutes: 10, targetBand: "65", realExam2026: true, category: "prediction",
    passage: "Wetlands provide essential ecosystem services such as flood control, water filtration, and carbon storage. They also support an extraordinary diversity of plants and animals. Despite these benefits, wetlands continue to be drained for agriculture and urban development, with global losses exceeding eighty percent over the past three centuries.",
    keyPoints: ["wetland services", "biodiversity", "ongoing destruction", "scale of loss"] },
  { id: "sw-11", minWords: 5, maxWords: 75, timeMinutes: 10, targetBand: "65", category: "daily",
    passage: "The Mediterranean diet, rich in vegetables, olive oil, fish, and whole grains, has been linked to reduced rates of heart disease, diabetes, and cognitive decline. Researchers attribute these benefits to its emphasis on minimally processed foods and healthy fats. Adoption of the diet is now encouraged in many public health programmes worldwide.",
    keyPoints: ["Mediterranean diet", "food components", "health benefits", "public health endorsement"] },
  { id: "sw-12", minWords: 5, maxWords: 75, timeMinutes: 10, targetBand: "79+", realExam2026: true, category: "mock",
    passage: "Citizen science projects allow members of the public to contribute observations to scientific research, from monitoring bird populations to tracking light pollution. By multiplying data collection efforts, these programmes generate datasets that no single laboratory could afford. They also strengthen public engagement with science and inform local conservation decisions.",
    keyPoints: ["citizen science definition", "examples", "data scale benefit", "public engagement"] },
  { id: "sw-13", minWords: 5, maxWords: 75, timeMinutes: 10, targetBand: "79+", realExam2026: true, category: "prediction",
    passage: "Artificial intelligence systems trained on biased data can reproduce and amplify discrimination in hiring, lending, and policing. Researchers are developing fairness audits, transparency standards, and improved training datasets to mitigate these risks. However, technical solutions alone cannot address the deeper social inequalities reflected in the data.",
    keyPoints: ["AI bias problem", "examples of harm", "mitigation methods", "need for social action"] },
  { id: "sw-14", minWords: 5, maxWords: 75, timeMinutes: 10, targetBand: "79+", category: "mock",
    passage: "Coral reef restoration projects use techniques such as coral gardening, larval reseeding, and the introduction of heat-resistant strains. Early results in the Caribbean and Pacific show that small-scale recovery is possible. Yet large-scale survival ultimately depends on global emission reductions to limit ocean warming and acidification.",
    keyPoints: ["restoration techniques", "early successes", "dependence on emissions", "global scale"] },
  { id: "sw-15", minWords: 5, maxWords: 75, timeMinutes: 10, targetBand: "65", realExam2026: true, category: "prediction",
    passage: "Sleep researchers now recognise that adolescents' biological clocks shift later during puberty, conflicting with early school start times. Chronic sleep loss has been linked to lower academic performance, mood disorders, and weaker immune function. A growing number of school districts are experimenting with later start times to align with this circadian shift.",
    keyPoints: ["adolescent biology", "early school conflict", "health effects", "policy response"] },
  { id: "sw-16", minWords: 5, maxWords: 75, timeMinutes: 10, targetBand: "65", category: "daily",
    passage: "Hydropower remains the largest source of renewable electricity worldwide, providing reliable baseload power and storage capacity. New dam projects, however, raise serious concerns about ecosystem disruption, displacement of communities, and changes to downstream water flow. Modern designs aim to balance energy needs with environmental and social safeguards.",
    keyPoints: ["hydropower scale", "benefits", "environmental and social risks", "modern design balance"] }
];

// ===== Fill in the Blanks expansion (25 new items: fb-9 .. fb-33) =====
export const FILL_BLANK_EXPANSION: PteFillBlank[] = [
  { id: "fb-9", targetBand: "65", category: "daily",
    passage: "The university has {{1}} significant funding to expand its science {{2}} over the coming decade.",
    options: ["allocated", "wasted", "facilities", "obstacles", "retrieved", "decisions"],
    answers: ["allocated", "facilities"] },
  { id: "fb-10", targetBand: "65", category: "mock",
    passage: "Researchers {{1}} that the new vaccine could {{2}} the spread of infection in tropical regions.",
    options: ["confirmed", "denied", "reduce", "worsen", "ignored", "blocked"],
    answers: ["confirmed", "reduce"] },
  { id: "fb-11", targetBand: "79+", realExam2026: true, category: "mock",
    passage: "The economy is showing signs of {{1}}, although inflation remains a {{2}} concern for analysts.",
    options: ["recovery", "collapse", "major", "minor", "blame", "gain"],
    answers: ["recovery", "major"] },
  { id: "fb-12", targetBand: "79+", realExam2026: true, category: "prediction",
    passage: "Effective policymaking depends on {{1}} data and a willingness to {{2}} long-held assumptions.",
    options: ["reliable", "faulty", "challenge", "accept", "random", "inflate"],
    answers: ["reliable", "challenge"] },
  { id: "fb-13", targetBand: "65", category: "daily",
    passage: "Cultural exchange programmes {{1}} mutual understanding and {{2}} stereotypes between communities.",
    options: ["foster", "prevent", "reduce", "reinforce", "cancel", "limit"],
    answers: ["foster", "reduce"] },
  { id: "fb-14", targetBand: "79+", realExam2026: true, category: "mock",
    passage: "New technology often {{1}} unexpected social {{2}} that policymakers struggle to anticipate.",
    options: ["produces", "prevents", "challenges", "solutions", "ignores", "cancels"],
    answers: ["produces", "challenges"] },
  { id: "fb-15", targetBand: "65", realExam2026: true, category: "prediction",
    passage: "Marine biologists are {{1}} the impact of plastic waste on coral {{2}} across the Pacific.",
    options: ["investigating", "ignoring", "reefs", "plains", "blocking", "solving"],
    answers: ["investigating", "reefs"] },
  { id: "fb-16", targetBand: "50", category: "daily",
    passage: "Authorities urged residents to {{1}} water during the drought and to {{2}} unnecessary irrigation.",
    options: ["conserve", "waste", "avoid", "increase", "postpone", "extend"],
    answers: ["conserve", "avoid"] },
  { id: "fb-17", targetBand: "65", category: "daily",
    passage: "The film {{1}} mixed reviews despite the strong {{2}} of its lead actor.",
    options: ["received", "rejected", "performance", "absence", "cancelled", "obstacle"],
    answers: ["received", "performance"] },
  { id: "fb-18", targetBand: "79+", realExam2026: true, category: "mock",
    passage: "Educators {{1}} that critical thinking should be {{2}} into every subject.",
    options: ["argue", "deny", "integrated", "removed", "ignore", "blocked"],
    answers: ["argue", "integrated"] },
  { id: "fb-19", targetBand: "65", category: "daily",
    passage: "Trains were {{1}} due to severe weather, leaving thousands of passengers {{2}} alternative transport.",
    options: ["delayed", "accelerated", "seeking", "avoiding", "prevented", "stopping"],
    answers: ["delayed", "seeking"] },
  { id: "fb-20", targetBand: "79+", category: "mock",
    passage: "Most species can {{1}} to gradual environmental change, but rapid shifts often {{2}} entire ecosystems.",
    options: ["adapt", "resist", "disrupt", "support", "abandon", "stabilise"],
    answers: ["adapt", "disrupt"] },
  { id: "fb-21", targetBand: "65", realExam2026: true, category: "prediction",
    passage: "The lecturer {{1}} the importance of citing reliable sources to {{2}} academic credibility.",
    options: ["emphasised", "ignored", "maintain", "damage", "skipped", "question"],
    answers: ["emphasised", "maintain"] },
  { id: "fb-22", targetBand: "50", category: "daily",
    passage: "Volunteers {{1}} to the disaster relief effort by distributing food and {{2}} temporary shelters.",
    options: ["contributed", "refused", "building", "destroying", "avoiding", "forgetting"],
    answers: ["contributed", "building"] },
  { id: "fb-23", targetBand: "65", realExam2026: true, category: "daily",
    passage: "The committee will {{1}} the proposals next week and {{2}} a final decision by Friday.",
    options: ["review", "reject", "announce", "postpone", "cancel", "ignore"],
    answers: ["review", "announce"] },
  { id: "fb-24", targetBand: "65", realExam2026: true, category: "prediction",
    passage: "Recent studies {{1}} a strong link between exercise and improved {{2}} health.",
    options: ["reveal", "disprove", "mental", "financial", "ignore", "reduce"],
    answers: ["reveal", "mental"] },
  { id: "fb-25", targetBand: "79+", realExam2026: true, category: "mock",
    passage: "New regulations aim to {{1}} pollution from factories and {{2}} the use of clean energy.",
    options: ["limit", "encourage", "promote", "prevent", "ignore", "raise"],
    answers: ["limit", "promote"] },
  { id: "fb-26", targetBand: "65", category: "daily",
    passage: "Tourism has {{1}} the local economy, but it has also {{2}} environmental concerns.",
    options: ["boosted", "damaged", "raised", "lowered", "ignored", "cancelled"],
    answers: ["boosted", "raised"] },
  { id: "fb-27", targetBand: "65", category: "mock",
    passage: "Researchers will {{1}} the data carefully before {{2}} their findings to the public.",
    options: ["analyse", "invent", "releasing", "hiding", "ignoring", "blocking"],
    answers: ["analyse", "releasing"] },
  { id: "fb-28", targetBand: "79+", realExam2026: true, category: "prediction",
    passage: "Universities are encouraged to {{1}} more diverse perspectives and to {{2}} inclusive learning environments.",
    options: ["welcome", "reject", "cultivate", "destroy", "ignore", "cancel"],
    answers: ["welcome", "cultivate"] },
  { id: "fb-29", targetBand: "79+", category: "mock",
    passage: "Healthcare workers {{1}} long hours during the pandemic, often {{2}} their own wellbeing.",
    options: ["endured", "avoided", "sacrificing", "protecting", "ignoring", "gaining"],
    answers: ["endured", "sacrificing"] },
  { id: "fb-30", targetBand: "65", realExam2026: true, category: "daily",
    passage: "The conference will {{1}} experts from many countries to {{2}} solutions to climate change.",
    options: ["gather", "exclude", "propose", "reject", "cancel", "ignore"],
    answers: ["gather", "propose"] },
  { id: "fb-31", targetBand: "50", category: "daily",
    passage: "Students should {{1}} their assignments early to {{2}} unnecessary stress before deadlines.",
    options: ["complete", "delay", "avoid", "cause", "ignore", "invite"],
    answers: ["complete", "avoid"] },
  { id: "fb-32", targetBand: "65", realExam2026: true, category: "prediction",
    passage: "Innovative technologies are helping cities {{1}} traffic congestion and {{2}} air quality.",
    options: ["reduce", "worsen", "improve", "damage", "ignore", "cancel"],
    answers: ["reduce", "improve"] },
  { id: "fb-33", targetBand: "79+", category: "mock",
    passage: "The journal {{1}} only articles that have undergone rigorous peer {{2}}.",
    options: ["publishes", "rejects", "review", "support", "ignores", "invents"],
    answers: ["publishes", "review"] }
];

// ===== Reorder Paragraphs expansion (15 new items: ro-7 .. ro-21) =====
export const REORDER_EXPANSION: PteReorderItem[] = [
  { id: "ro-7", topic: "Solar Energy", correctOrder: [0, 1, 2, 3], targetBand: "65", realExam2026: true, category: "daily",
    paragraphs: ["Solar power has emerged as one of the fastest-growing energy sources globally.", "Falling panel costs have made installations accessible to households and small businesses.", "Governments now offer incentives that further accelerate adoption rates.", "However, intermittent generation still requires reliable storage solutions for nighttime use."] },
  { id: "ro-8", topic: "AI Education", correctOrder: [0, 1, 2, 3], targetBand: "79+", realExam2026: true, category: "mock",
    paragraphs: ["Universities are integrating artificial intelligence tools into classroom instruction.", "Adaptive software identifies each student's strengths and weaknesses in real time.", "Teachers can then tailor exercises to address specific learning gaps efficiently.", "Critics warn, however, that excessive automation may erode personal mentorship traditions."] },
  { id: "ro-9", topic: "Healthy Habits", correctOrder: [0, 1, 2], targetBand: "50", category: "daily",
    paragraphs: ["Doctors recommend at least thirty minutes of moderate exercise each day.", "Regular activity strengthens the cardiovascular system and supports mental wellbeing.", "Combined with balanced nutrition, exercise significantly reduces the risk of chronic disease."] },
  { id: "ro-10", topic: "Migration", correctOrder: [0, 1, 2, 3], targetBand: "79+", category: "mock",
    paragraphs: ["Human migration has shaped cultures and economies throughout recorded history.", "Modern globalisation has further accelerated movement across borders.", "Migrants frequently bring skills that fill labour shortages in receiving nations.", "Yet integration policies remain a contested issue in many host societies."] },
  { id: "ro-11", topic: "Mindfulness", correctOrder: [0, 1, 2], targetBand: "65", category: "daily",
    paragraphs: ["Mindfulness practice has gained popularity as a tool for stress reduction.", "Short daily sessions of focused breathing can lower cortisol levels measurably.", "Many companies now offer mindfulness training as part of employee wellness programmes."] },
  { id: "ro-12", topic: "Plastic Pollution", correctOrder: [0, 1, 2, 3], targetBand: "65", realExam2026: true, category: "prediction",
    paragraphs: ["Plastic waste accumulates in oceans at an alarming rate each year.", "Marine life ingests microplastic fragments, harming entire food chains.", "International agreements now seek to reduce single-use plastic production.", "Yet meaningful progress depends on consumer behaviour and corporate responsibility."] },
  { id: "ro-13", topic: "Vaccination", correctOrder: [0, 1, 2], targetBand: "65", realExam2026: true, category: "daily",
    paragraphs: ["Vaccination has eliminated several deadly diseases over the past century.", "Immunisation programmes protect both individuals and entire communities.", "Continued investment is essential to maintain coverage in low-income regions."] },
  { id: "ro-14", topic: "Public Libraries", correctOrder: [0, 1, 2, 3], targetBand: "65", category: "daily",
    paragraphs: ["Public libraries have evolved far beyond their traditional role as book repositories.", "Many now offer digital resources, study spaces, and free internet access.", "Community programmes include language classes, job training, and children's storytelling.", "As a result, libraries remain vital civic institutions in the digital age."] },
  { id: "ro-15", topic: "Renewable Hydrogen", correctOrder: [0, 1, 2, 3], targetBand: "79+", realExam2026: true, category: "prediction",
    paragraphs: ["Green hydrogen is produced by splitting water with electricity from renewable sources.", "It can be stored, transported, and used as a clean fuel for heavy industry.", "Major economies have launched billion-dollar hydrogen strategies to decarbonise transport.", "However, current production costs remain a barrier to widespread adoption."] },
  { id: "ro-16", topic: "Mental Health", correctOrder: [0, 1, 2], targetBand: "65", realExam2026: true, category: "daily",
    paragraphs: ["Mental health awareness has increased substantially in recent years.", "Workplaces are introducing support programmes for employees experiencing stress.", "Open conversations help reduce stigma and encourage early intervention."] },
  { id: "ro-17", topic: "Urban Cycling", correctOrder: [0, 1, 2, 3], targetBand: "65", realExam2026: true, category: "prediction",
    paragraphs: ["Many cities are expanding cycling infrastructure to ease traffic and reduce emissions.", "Dedicated lanes and secure parking encourage daily commuting by bicycle.", "Public bike-sharing systems make cycling accessible even to occasional users.", "However, road safety concerns continue to deter some potential riders."] },
  { id: "ro-18", topic: "Antibiotic Resistance", correctOrder: [0, 1, 2, 3], targetBand: "79+", category: "mock",
    paragraphs: ["Antibiotic resistance is one of the most serious threats to modern medicine.", "Overuse in healthcare and agriculture has accelerated the emergence of resistant strains.", "Researchers are exploring new compounds and alternative therapies to address the crisis.", "Public awareness and prescribing guidelines are essential complementary measures."] },
  { id: "ro-19", topic: "Workplace Diversity", correctOrder: [0, 1, 2], targetBand: "65", category: "daily",
    paragraphs: ["Diverse teams have been shown to outperform homogeneous ones across many industries.", "A range of perspectives sparks creative problem-solving and innovation.", "Inclusive recruitment practices, however, require sustained leadership commitment."] },
  { id: "ro-20", topic: "Smart Agriculture", correctOrder: [0, 1, 2, 3], targetBand: "79+", realExam2026: true, category: "mock",
    paragraphs: ["Modern farms increasingly use sensors and drones to monitor crop health.", "Real-time data enables farmers to optimise irrigation and fertiliser application.", "These precision techniques boost yields while conserving resources.", "Adoption costs remain a challenge for smallholder farmers in developing regions."] },
  { id: "ro-21", topic: "Reading Comprehension", correctOrder: [0, 1, 2], targetBand: "65", category: "daily",
    paragraphs: ["Strong reading comprehension underpins success in nearly every academic subject.", "Teachers cultivate this skill through guided discussions and varied text exposure.", "Students who read regularly develop richer vocabularies and sharper analytical skills."] }
];

// ===== Dictation expansion (50 new items: dc-11 .. dc-60) =====
export const DICTATION_EXPANSION: PteDictation[] = [
  { id: "dc-11", difficulty: "hard", targetBand: "79+", realExam2026: true, category: "prediction", accent: "UK", audioText: "Sociologists examine how cultural norms influence individual behaviour." },
  { id: "dc-12", difficulty: "medium", targetBand: "65", category: "daily", accent: "US", audioText: "Modern museums use digital exhibits to attract younger visitors." },
  { id: "dc-13", difficulty: "medium", targetBand: "65", realExam2026: true, category: "prediction", accent: "AU", audioText: "Renewable energy investments continue to grow rapidly worldwide." },
  { id: "dc-14", difficulty: "easy", targetBand: "50", category: "daily", accent: "US", audioText: "The conference will be held at the central library next month." },
  { id: "dc-15", difficulty: "hard", targetBand: "79+", realExam2026: true, category: "prediction", accent: "UK", audioText: "Researchers analysed years of data before reaching their conclusions." },
  { id: "dc-16", difficulty: "medium", targetBand: "65", realExam2026: true, category: "mock", accent: "AU", audioText: "Effective leadership requires patience, empathy, and clear vision." },
  { id: "dc-17", difficulty: "medium", targetBand: "65", category: "daily", accent: "UK", audioText: "Public lectures provide opportunities to engage with leading scholars." },
  { id: "dc-18", difficulty: "hard", targetBand: "79+", realExam2026: true, category: "prediction", accent: "US", audioText: "Climate scientists model future scenarios to guide adaptation efforts." },
  { id: "dc-19", difficulty: "easy", targetBand: "50", category: "daily", accent: "UK", audioText: "New library facilities support both research and quiet study." },
  { id: "dc-20", difficulty: "hard", targetBand: "79+", realExam2026: true, category: "mock", accent: "US", audioText: "Universities are introducing more interdisciplinary programmes annually." },
  { id: "dc-21", difficulty: "medium", targetBand: "65", realExam2026: true, category: "prediction", accent: "AU", audioText: "Population growth has placed pressure on urban water resources." },
  { id: "dc-22", difficulty: "medium", targetBand: "65", category: "daily", accent: "UK", audioText: "Economists predict moderate growth across most developed economies." },
  { id: "dc-23", difficulty: "hard", targetBand: "79+", realExam2026: true, category: "prediction", accent: "US", audioText: "Genetic research is unlocking new approaches to personalised medicine." },
  { id: "dc-24", difficulty: "medium", targetBand: "65", category: "daily", accent: "AU", audioText: "The proposal received strong support from local business leaders." },
  { id: "dc-25", difficulty: "hard", targetBand: "79+", realExam2026: true, category: "mock", accent: "UK", audioText: "Linguists study how dialects evolve in immigrant communities." },
  { id: "dc-26", difficulty: "medium", targetBand: "65", category: "daily", accent: "US", audioText: "Modern psychology emphasises the role of childhood experiences." },
  { id: "dc-27", difficulty: "easy", targetBand: "50", category: "daily", accent: "AU", audioText: "The committee will publish its findings in early autumn." },
  { id: "dc-28", difficulty: "medium", targetBand: "65", realExam2026: true, category: "prediction", accent: "UK", audioText: "Industrial pollution remains a major source of environmental harm." },
  { id: "dc-29", difficulty: "hard", targetBand: "79+", realExam2026: true, category: "mock", accent: "US", audioText: "Online platforms have transformed access to academic publications." },
  { id: "dc-30", difficulty: "easy", targetBand: "50", category: "daily", accent: "AU", audioText: "Students are encouraged to consult library staff during research." },
  { id: "dc-31", difficulty: "hard", targetBand: "79+", realExam2026: true, category: "prediction", accent: "UK", audioText: "Sustainable development requires balancing economic and ecological goals." },
  { id: "dc-32", difficulty: "medium", targetBand: "65", realExam2026: true, category: "prediction", accent: "US", audioText: "Public health campaigns raise awareness about preventable diseases." },
  { id: "dc-33", difficulty: "medium", targetBand: "65", category: "daily", accent: "AU", audioText: "Engineers designed the bridge to withstand severe weather conditions." },
  { id: "dc-34", difficulty: "easy", targetBand: "50", category: "daily", accent: "UK", audioText: "Cultural festivals celebrate the heritage of local communities." },
  { id: "dc-35", difficulty: "hard", targetBand: "79+", realExam2026: true, category: "mock", accent: "US", audioText: "Recent surveys show rising interest in sustainable fashion choices." },
  { id: "dc-36", difficulty: "hard", targetBand: "79+", realExam2026: true, category: "prediction", accent: "AU", audioText: "Environmental policies often face resistance from affected industries." },
  { id: "dc-37", difficulty: "medium", targetBand: "65", category: "daily", accent: "UK", audioText: "Modern architecture frequently incorporates traditional design elements." },
  { id: "dc-38", difficulty: "hard", targetBand: "79+", realExam2026: true, category: "prediction", accent: "US", audioText: "Astronomers detected signals from a distant galactic source." },
  { id: "dc-39", difficulty: "hard", targetBand: "79+", category: "mock", accent: "AU", audioText: "Educators are exploring new ways to assess critical thinking skills." },
  { id: "dc-40", difficulty: "easy", targetBand: "50", category: "daily", accent: "UK", audioText: "Reading widely is essential for academic and personal growth." },
  { id: "dc-41", difficulty: "medium", targetBand: "65", realExam2026: true, category: "prediction", accent: "US", audioText: "Healthcare reforms aim to make treatment more accessible to all." },
  { id: "dc-42", difficulty: "easy", targetBand: "50", category: "daily", accent: "AU", audioText: "The exhibition opens to the general public next Saturday afternoon." },
  { id: "dc-43", difficulty: "medium", targetBand: "65", category: "daily", accent: "UK", audioText: "Leadership training programmes attract professionals from many sectors." },
  { id: "dc-44", difficulty: "hard", targetBand: "79+", realExam2026: true, category: "mock", accent: "US", audioText: "Scientific breakthroughs often arise from unexpected lines of inquiry." },
  { id: "dc-45", difficulty: "medium", targetBand: "65", realExam2026: true, category: "prediction", accent: "AU", audioText: "Volunteers played a crucial role during the recent recovery operations." },
  { id: "dc-46", difficulty: "easy", targetBand: "50", category: "daily", accent: "UK", audioText: "Online courses allow learners to study at their own pace." },
  { id: "dc-47", difficulty: "hard", targetBand: "79+", realExam2026: true, category: "prediction", accent: "US", audioText: "Researchers are using satellites to track changes in glacier mass." },
  { id: "dc-48", difficulty: "medium", targetBand: "65", category: "daily", accent: "AU", audioText: "Effective communication is central to managing cross-cultural teams." },
  { id: "dc-49", difficulty: "medium", targetBand: "65", category: "mock", accent: "UK", audioText: "The new policy will take effect at the start of the next quarter." },
  { id: "dc-50", difficulty: "hard", targetBand: "79+", realExam2026: true, category: "prediction", accent: "US", audioText: "Artificial intelligence is being integrated into many industrial processes." },
  { id: "dc-51", difficulty: "medium", targetBand: "65", realExam2026: true, category: "daily", accent: "AU", audioText: "Voluntary organisations support communities affected by natural disasters." },
  { id: "dc-52", difficulty: "medium", targetBand: "65", category: "daily", accent: "UK", audioText: "Authorities are investigating the cause of the recent power outage." },
  { id: "dc-53", difficulty: "hard", targetBand: "79+", realExam2026: true, category: "mock", accent: "US", audioText: "Researchers explored the long-term effects of digital learning environments." },
  { id: "dc-54", difficulty: "easy", targetBand: "50", category: "daily", accent: "AU", audioText: "Students were asked to summarise the lecture in their own words." },
  { id: "dc-55", difficulty: "hard", targetBand: "79+", realExam2026: true, category: "prediction", accent: "UK", audioText: "Modern transport networks rely heavily on real-time data monitoring." },
  { id: "dc-56", difficulty: "medium", targetBand: "65", realExam2026: true, category: "prediction", accent: "US", audioText: "Conservation efforts have helped restore several endangered species." },
  { id: "dc-57", difficulty: "hard", targetBand: "79+", realExam2026: true, category: "mock", accent: "AU", audioText: "Innovation thrives where curiosity and collaboration are equally valued." },
  { id: "dc-58", difficulty: "medium", targetBand: "65", category: "daily", accent: "UK", audioText: "The committee discussed strategies to improve graduate employability." },
  { id: "dc-59", difficulty: "hard", targetBand: "79+", realExam2026: true, category: "prediction", accent: "US", audioText: "Energy-efficient buildings reduce both operating costs and environmental impact." },
  { id: "dc-60", difficulty: "hard", targetBand: "79+", category: "mock", accent: "AU", audioText: "The seminar will explore recent developments in cognitive neuroscience." }
];

// ===== Summarize Spoken Text expansion (10 new items: ss-7 .. ss-16) =====
export const SUMMARIZE_SPOKEN_EXPANSION: PteSummarizeSpoken[] = [
  { id: "ss-7", minWords: 50, maxWords: 70, targetBand: "79+", realExam2026: true, category: "mock", accent: "UK",
    audioText: "In today's lecture we will explore the role of microbes in human health. Trillions of bacteria live in our gut, helping digest food, produce vitamins, and regulate the immune system. Research now suggests that the balance of these microbes also influences mood and mental wellbeing through the so-called gut-brain axis.",
    keyPoints: ["microbes role", "gut bacteria", "immune and digestion", "gut-brain axis"] },
  { id: "ss-8", minWords: 50, maxWords: 70, targetBand: "65", realExam2026: true, category: "prediction", accent: "AU",
    audioText: "The expansion of high-speed rail networks is reshaping travel across Europe and Asia. New lines reduce journey times between major cities, encouraging passengers to switch from short-haul flights. Beyond convenience, rail travel produces far fewer emissions per kilometre, supporting national climate targets.",
    keyPoints: ["high-speed rail", "city connections", "modal shift", "emission reduction"] },
  { id: "ss-9", minWords: 50, maxWords: 70, targetBand: "79+", category: "mock", accent: "US",
    audioText: "Behavioural economics challenges the traditional view that humans always act rationally. Researchers have shown that decisions are often influenced by mental shortcuts, social context, and emotional reactions. These insights are now applied in policymaking, marketing, and personal finance to encourage better outcomes.",
    keyPoints: ["behavioural economics", "irrational decisions", "mental shortcuts", "applications in policy"] },
  { id: "ss-10", minWords: 50, maxWords: 70, targetBand: "65", realExam2026: true, category: "daily", accent: "UK",
    audioText: "Today I want to discuss the importance of preserving indigenous languages. Many of the world's six thousand languages are spoken by small communities and risk disappearing within a generation. Documenting and teaching these languages protects unique knowledge systems and strengthens cultural identity.",
    keyPoints: ["indigenous languages", "risk of loss", "documentation", "cultural value"] },
  { id: "ss-11", minWords: 50, maxWords: 70, targetBand: "79+", realExam2026: true, category: "prediction", accent: "US",
    audioText: "Astronomers recently confirmed the existence of an exoplanet within the habitable zone of a nearby star. Detailed observations suggest that the planet may have liquid water on its surface, raising the possibility of conditions suitable for life. Future telescopes will examine its atmosphere for potential biosignatures.",
    keyPoints: ["exoplanet discovery", "habitable zone", "liquid water", "future research"] },
  { id: "ss-12", minWords: 50, maxWords: 70, targetBand: "65", category: "mock", accent: "AU",
    audioText: "The growth of e-commerce has transformed retail and logistics worldwide. Consumers now expect fast, often free delivery, pushing companies to invest heavily in warehouses, robotics, and last-mile services. While convenience has expanded, environmental and labour concerns are also increasing.",
    keyPoints: ["e-commerce growth", "delivery expectations", "logistics investment", "social and environmental concerns"] },
  { id: "ss-13", minWords: 50, maxWords: 70, targetBand: "79+", realExam2026: true, category: "prediction", accent: "UK",
    audioText: "Recent psychological studies highlight the impact of nature exposure on cognitive performance. Even brief walks in green spaces have been shown to improve attention, reduce stress, and enhance creativity. These findings are influencing urban planning and corporate wellness programmes alike.",
    keyPoints: ["nature exposure", "cognitive benefits", "stress reduction", "urban applications"] },
  { id: "ss-14", minWords: 50, maxWords: 70, targetBand: "79+", category: "mock", accent: "US",
    audioText: "Today's seminar examines the challenges of feeding a growing global population. Sustainable agriculture must increase yields while conserving water, soil, and biodiversity. Innovations in precision farming, alternative proteins, and food waste reduction are all part of the emerging solution.",
    keyPoints: ["food security", "sustainable yield", "precision farming", "waste reduction"] },
  { id: "ss-15", minWords: 50, maxWords: 70, targetBand: "79+", realExam2026: true, category: "prediction", accent: "UK",
    audioText: "Ocean acidification, caused by absorbed carbon dioxide, threatens marine ecosystems. Shellfish struggle to form shells, coral reefs weaken, and entire food chains may unravel. Scientists are calling for urgent reductions in emissions to slow this process before tipping points are reached.",
    keyPoints: ["ocean acidification", "carbon absorption", "marine impact", "emission reduction"] },
  { id: "ss-16", minWords: 50, maxWords: 70, targetBand: "65", category: "daily", accent: "AU",
    audioText: "Volunteer tourism allows travellers to combine holidays with community service. Participants might teach English, build schools, or assist with conservation projects. While well-intentioned, critics argue that short-term volunteers can sometimes cause more harm than good without proper training.",
    keyPoints: ["volunteer tourism", "community projects", "benefits", "critics' concerns"] }
];

// ===== Describe Image expansion (8 new items, emoji-visual fallback) =====
export const DESCRIBE_IMAGE_EXPANSION: PteDescribeImage[] = [
  { id: "di-5", title: "Bar chart: Top 5 countries by smartphone users (2025)", chartType: "bar", prepSeconds: 25, recordSeconds: 40, targetBand: "65", realExam2026: true, category: "prediction",
    emojiVisual: "📊\n🇨🇳 ████████████ 1.05B\n🇮🇳 ██████████ 0.87B\n🇺🇸 ███████ 0.30B\n🇮🇩 ████ 0.20B\n🇧🇷 ███ 0.15B",
    keywords: ["bar chart", "smartphone users", "China", "India", "comparison", "leading", "largest", "ranked", "data", "2025"],
    modelAnswer: "The bar chart compares the number of smartphone users across the top five countries in 2025. China leads by a wide margin with over one billion users, followed closely by India. The United States, Indonesia, and Brazil hold significantly smaller shares. Overall, the data highlights the dominance of Asian markets in global smartphone adoption." },
  { id: "di-6", title: "Pie chart: Sources of household water consumption", chartType: "pie", prepSeconds: 25, recordSeconds: 40, targetBand: "65", category: "mock",
    emojiVisual: "🥧\n💧 Toilet 27% · Shower 19% · Faucet 15%\n🌳 Outdoor 12% · Laundry 17% · Other 10%",
    keywords: ["pie chart", "water consumption", "household", "largest", "toilet", "shower", "laundry", "proportion", "percentage", "total"],
    modelAnswer: "The pie chart displays how water is used in a typical household. Toilet flushing accounts for the largest portion at around 27 percent, followed by laundry and showering. Outdoor use and faucets each take up smaller shares. Overall, indoor activities consume the majority of household water, suggesting clear opportunities for conservation." },
  { id: "di-7", title: "Line graph: Average global temperature change (1900–2025)", chartType: "line", prepSeconds: 25, recordSeconds: 40, targetBand: "79+", realExam2026: true, category: "prediction",
    emojiVisual: "📈\n1900 ━━━ 0.0°C\n1950 ━━━━━ +0.2°C\n2000 ━━━━━━━ +0.6°C\n2025 ━━━━━━━━━━ +1.2°C",
    keywords: ["line graph", "temperature", "increase", "gradual", "rise", "global warming", "trend", "steady", "over time", "climate"],
    modelAnswer: "The line graph illustrates the change in global average temperature from 1900 to 2025. Temperatures remained relatively stable during the first half of the twentieth century before starting a steady upward climb after 1950. The increase has accelerated since 2000, reaching approximately 1.2 degrees above the baseline by 2025. Overall, the data confirms a clear and accelerating warming trend." },
  { id: "di-8", title: "Map: Global distribution of major rainforests", chartType: "map", prepSeconds: 25, recordSeconds: 40, targetBand: "65", category: "daily",
    emojiVisual: "🗺️\n🌳 Amazon (S. America)\n🌳 Congo (C. Africa)\n🌳 SE Asia (Borneo, Sumatra)\n🌳 New Guinea (Oceania)",
    keywords: ["map", "rainforest", "tropical", "Amazon", "Congo", "Asia", "distribution", "continent", "biodiversity", "equator"],
    modelAnswer: "The map shows the global distribution of major rainforests. The largest concentration lies in South America, dominated by the Amazon basin. Significant rainforests are also located in central Africa around the Congo, in Southeast Asia covering Borneo and Sumatra, and in the island of New Guinea. Overall, all major rainforests cluster around the equator, reflecting their dependence on tropical climate conditions." },
  { id: "di-9", title: "Process diagram: Life cycle of a butterfly", chartType: "process", prepSeconds: 25, recordSeconds: 40, targetBand: "65", category: "mock",
    emojiVisual: "🦋 Process\n🥚 Egg → 🐛 Caterpillar → 🛌 Pupa → 🦋 Adult",
    keywords: ["life cycle", "butterfly", "stages", "egg", "caterpillar", "pupa", "adult", "metamorphosis", "process", "transformation"],
    modelAnswer: "The diagram illustrates the four stages of the butterfly life cycle. Initially, the female lays eggs on leaves. After hatching, a caterpillar emerges and feeds extensively before forming a pupa. Inside the pupa, complete metamorphosis takes place, eventually producing an adult butterfly. Finally, the adult mates and lays new eggs, completing the cycle." },
  { id: "di-10", title: "Bar chart: Renewable electricity share by region (2025)", chartType: "bar", prepSeconds: 25, recordSeconds: 40, targetBand: "79+", realExam2026: true, category: "prediction",
    emojiVisual: "📊\n🇪🇺 EU ███████ 45%\n🌎 LATAM ██████ 38%\n🌏 APAC ████ 28%\n🌍 AFR ███ 22%\n🇺🇸 NA ████ 26%",
    keywords: ["bar chart", "renewable electricity", "share", "Europe", "Latin America", "Asia", "leading", "regions", "percentage", "comparison"],
    modelAnswer: "The bar chart compares the share of renewable electricity generation across five major regions in 2025. Europe leads with around 45 percent, followed by Latin America at 38 percent. North America and Asia-Pacific lie in the middle, while Africa records the lowest share at roughly 22 percent. Overall, the figures highlight Europe's leadership and significant variation between regions." },
  { id: "di-11", title: "Line graph: University enrolment in country X (2010–2025)", chartType: "line", prepSeconds: 25, recordSeconds: 40, targetBand: "65", category: "mock",
    emojiVisual: "📈\n2010 ━━━ 1.5M\n2015 ━━━━ 2.1M\n2020 ━━━━━ 2.6M\n2025 ━━━━━━ 3.2M",
    keywords: ["line graph", "enrolment", "university", "increase", "rise", "student", "trend", "steady", "education", "period"],
    modelAnswer: "The line graph shows university enrolment in country X between 2010 and 2025. Numbers rose steadily across the period, climbing from approximately 1.5 million students in 2010 to 3.2 million by 2025. Growth was particularly strong between 2015 and 2020, reflecting expanded access to higher education. Overall, the trend indicates sustained growth in the demand for university study." },
  { id: "di-12", title: "Table: Tourism arrivals in three cities (2023 vs 2024)", chartType: "table", prepSeconds: 25, recordSeconds: 40, targetBand: "65", realExam2026: true, category: "daily",
    emojiVisual: "📋\nCity      | 2023 | 2024\nParis     | 18M  | 20M\nBangkok   | 22M  | 25M\nDubai     | 15M  | 18M",
    keywords: ["table", "tourism", "arrivals", "Paris", "Bangkok", "Dubai", "increase", "comparison", "year", "growth"],
    modelAnswer: "The table compares tourism arrivals in three major cities in 2023 and 2024. Bangkok recorded the highest figures in both years, rising from 22 million to 25 million visitors. Paris also saw an increase, climbing from 18 million to 20 million, while Dubai grew from 15 million to 18 million arrivals. Overall, all three cities experienced notable growth, reflecting a strong recovery in international tourism." }
];

// ===== Multiple Choice (Reading) — 20 items =====
export const MCQ_BANK: PteMcq[] = [
  { id: "mcq-1", topic: "Marine biology", targetBand: "65", category: "daily",
    passage: "Coral reefs are biologically diverse ecosystems that support nearly a quarter of all marine life. Rising sea temperatures, ocean acidification, and pollution have caused widespread bleaching events.",
    question: "What is the main topic of the passage?",
    options: ["Coral reefs and the threats they face", "The chemistry of seawater", "Tourism in tropical regions", "Marine fish species"],
    correctIndices: [0] },
  { id: "mcq-2", topic: "Technology", targetBand: "79+", realExam2026: true, category: "mock",
    passage: "Open-source software is maintained by global communities of volunteer developers. While the model fosters innovation and rapid iteration, questions about funding, security, and recognition remain unresolved.",
    question: "Which two challenges does the passage mention?",
    options: ["Funding sustainability", "Security audits", "Hardware costs", "Marketing campaigns"],
    correctIndices: [0, 1] },
  { id: "mcq-3", topic: "History", targetBand: "65", category: "daily",
    passage: "The Renaissance, beginning in fourteenth-century Italy, blended classical scholarship with new scientific inquiry. It produced major advances in art, anatomy, astronomy, and political theory that shaped modern Europe.",
    question: "What does the passage say about the Renaissance?",
    options: ["It originated in Asia", "It rejected classical scholarship", "It influenced multiple fields", "It was limited to painting"],
    correctIndices: [2] },
  { id: "mcq-4", topic: "Economics", targetBand: "79+", realExam2026: true, category: "prediction",
    passage: "Behavioural economics examines how psychology influences economic decisions. Findings show that people often rely on shortcuts, are influenced by social context, and weigh losses more heavily than gains.",
    question: "Which statement is supported by the passage?",
    options: ["People always act rationally", "Losses feel heavier than equivalent gains", "Social context has no effect", "Shortcuts are always avoided"],
    correctIndices: [1] },
  { id: "mcq-5", topic: "Environment", targetBand: "65", realExam2026: true, category: "prediction",
    passage: "Microplastics have been detected in oceans, drinking water, and even human blood. They originate from the breakdown of larger plastics, synthetic textiles, and personal care products.",
    question: "Select all sources of microplastics mentioned.",
    options: ["Synthetic textiles", "Personal care products", "Volcanic ash", "Solar panels"],
    correctIndices: [0, 1] },
  { id: "mcq-6", topic: "Science", targetBand: "65", realExam2026: true, category: "daily",
    passage: "Citizen science projects involve the public in data collection for research. Participants help monitor bird populations, light pollution, and water quality, multiplying the reach of professional teams.",
    question: "What is the central benefit highlighted?",
    options: ["Reduced cost of equipment", "Larger data collection capacity", "Higher salaries for scientists", "Faster computer processing"],
    correctIndices: [1] },
  { id: "mcq-7", topic: "Health", targetBand: "65", category: "daily",
    passage: "Mediterranean diets emphasise vegetables, fish, olive oil, and whole grains. Studies link this pattern to reduced risks of heart disease, diabetes, and cognitive decline.",
    question: "Select all health benefits mentioned.",
    options: ["Lower diabetes risk", "Reduced cognitive decline", "Improved heart health", "Stronger eyesight"],
    correctIndices: [0, 1, 2] },
  { id: "mcq-8", topic: "Health", targetBand: "79+", realExam2026: true, category: "prediction",
    passage: "Sleep researchers note that adolescent biological clocks shift later during puberty. Combined with early school start times, this often leads to chronic sleep loss and mood difficulties.",
    question: "Why is chronic sleep loss common in adolescents?",
    options: ["They prefer late-night activities", "Their internal clock conflicts with school schedules", "They consume too much caffeine", "They lack interest in sleep"],
    correctIndices: [1] },
  { id: "mcq-9", topic: "Environment", targetBand: "65", category: "daily",
    passage: "Hydropower is the largest source of renewable electricity. Despite its benefits, new dams can disrupt ecosystems, displace communities, and alter downstream water flow.",
    question: "Which downsides of hydropower are mentioned?",
    options: ["Ecosystem disruption", "Community displacement", "Air pollution", "Increased fossil fuel use"],
    correctIndices: [0, 1] },
  { id: "mcq-10", topic: "Society", targetBand: "65", category: "daily",
    passage: "Globalisation has accelerated cultural exchange but also raised concerns about the loss of local traditions. Communities increasingly debate how to balance openness with preservation.",
    question: "What tension does globalisation create according to the passage?",
    options: ["Openness versus preservation", "Trade versus tourism", "Politics versus economics", "Health versus education"],
    correctIndices: [0] },
  { id: "mcq-11", topic: "Technology", targetBand: "79+", realExam2026: true, category: "mock",
    passage: "Critics of artificial intelligence highlight risks of bias when systems are trained on flawed data. Fairness audits, transparency standards, and improved datasets aim to reduce these risks.",
    question: "Select all proposed solutions mentioned.",
    options: ["Fairness audits", "Transparency standards", "Improved datasets", "Banning AI entirely"],
    correctIndices: [0, 1, 2] },
  { id: "mcq-12", topic: "Science", targetBand: "79+", realExam2026: true, category: "prediction",
    passage: "Quantum computers exploit superposition and entanglement to handle problems intractable for classical machines. Yet they require near-absolute-zero environments and remain difficult to scale.",
    question: "What is one main difficulty of building quantum computers?",
    options: ["High operating temperatures", "Sensitive cooling requirements", "Large software libraries", "Lack of demand"],
    correctIndices: [1] },
  { id: "mcq-13", topic: "Environment", targetBand: "65", realExam2026: true, category: "prediction",
    passage: "Wetlands deliver flood control, water filtration, and carbon storage. Despite these benefits, more than eighty percent of global wetland area has been lost since the seventeenth century.",
    question: "What is the scale of wetland loss?",
    options: ["About twenty percent", "About fifty percent", "Over eighty percent", "Around ten percent"],
    correctIndices: [2] },
  { id: "mcq-14", topic: "Society", targetBand: "79+", category: "mock",
    passage: "Indigenous knowledge has guided ecosystem management for thousands of years. Combining this knowledge with modern science improves outcomes for forests, fisheries, and biodiversity.",
    question: "What is one key idea of the passage?",
    options: ["Indigenous knowledge contradicts science", "Combining traditions and science improves results", "Modern science has replaced indigenous methods", "Forests are managed by governments alone"],
    correctIndices: [1] },
  { id: "mcq-15", topic: "Society", targetBand: "65", category: "daily",
    passage: "Public libraries now offer digital resources, study spaces, language classes, and free internet access. They have evolved beyond their traditional role as book repositories.",
    question: "Select all services mentioned.",
    options: ["Free internet access", "Language classes", "Medical care", "Study spaces"],
    correctIndices: [0, 1, 3] },
  { id: "mcq-16", topic: "Economics", targetBand: "65", category: "mock",
    passage: "E-commerce growth has transformed logistics. Demand for fast delivery has driven investment in robotics and last-mile networks, but environmental and labour concerns are also rising.",
    question: "Which concerns are raised by the e-commerce boom?",
    options: ["Environmental impact", "Labour conditions", "Reduced product variety", "Slower shipping"],
    correctIndices: [0, 1] },
  { id: "mcq-17", topic: "Science", targetBand: "79+", realExam2026: true, category: "prediction",
    passage: "Astronomers recently confirmed an exoplanet within the habitable zone of a nearby star. Future missions will study its atmosphere for potential biosignatures of life.",
    question: "Why is this exoplanet considered scientifically important?",
    options: ["It orbits the Sun", "It lies in a habitable zone", "It is larger than Jupiter", "It contains gold reserves"],
    correctIndices: [1] },
  { id: "mcq-18", topic: "Health", targetBand: "65", category: "daily",
    passage: "Mindfulness practice involves focused attention and breathing exercises. Research shows it can reduce stress, lower blood pressure, and improve concentration.",
    question: "Select all benefits of mindfulness mentioned.",
    options: ["Stress reduction", "Lower blood pressure", "Improved concentration", "Faster reaction time"],
    correctIndices: [0, 1, 2] },
  { id: "mcq-19", topic: "Energy", targetBand: "79+", realExam2026: true, category: "prediction",
    passage: "Renewable hydrogen, made by splitting water using renewable electricity, can decarbonise heavy industry. Cost reduction remains the major obstacle to widespread adoption.",
    question: "What is the central challenge mentioned?",
    options: ["Lack of demand", "High production cost", "Limited safety", "Scarce raw materials"],
    correctIndices: [1] },
  { id: "mcq-20", topic: "Education", targetBand: "65", realExam2026: true, category: "daily",
    passage: "Inclusive education ensures students of all abilities learn together. Teachers adapt instruction, materials, and assessments so each child can participate meaningfully.",
    question: "What is the central principle of inclusive education?",
    options: ["Separating students by ability", "Teaching all students together with adaptations", "Eliminating assessments", "Reducing teacher training"],
    correctIndices: [1] }
];

// ===== Highlight Incorrect Words (Listening) — 15 items =====
export const HIGHLIGHT_INCORRECT_BANK: PteHighlightIncorrect[] = [
  { id: "hi-1", topic: "Daily life", targetBand: "65", category: "daily", accent: "UK",
    audioText: "The library will close earlier on public holidays.",
    displayText: "The library will open earlier on public holidays.",
    incorrectIndices: [3] },
  { id: "hi-2", topic: "Science", targetBand: "79+", realExam2026: true, category: "mock", accent: "US",
    audioText: "Researchers discovered new species in the deep ocean.",
    displayText: "Researchers invented new species in the deep ocean.",
    incorrectIndices: [1] },
  { id: "hi-3", topic: "Energy", targetBand: "65", realExam2026: true, category: "prediction", accent: "AU",
    audioText: "Renewable energy reduces dependence on fossil fuels.",
    displayText: "Renewable energy reduces dependence on cooking fuels.",
    incorrectIndices: [5] },
  { id: "hi-4", topic: "Education", targetBand: "50", category: "daily", accent: "UK",
    audioText: "Students must submit their assignments by Friday.",
    displayText: "Students must collect their assignments by Friday.",
    incorrectIndices: [2] },
  { id: "hi-5", topic: "Economy", targetBand: "65", category: "daily", accent: "AU",
    audioText: "Tourism contributes significantly to the local economy.",
    displayText: "Tourism contributes occasionally to the local economy.",
    incorrectIndices: [2] },
  { id: "hi-6", topic: "Environment", targetBand: "79+", realExam2026: true, category: "prediction", accent: "UK",
    audioText: "Climate change affects coastal communities most severely.",
    displayText: "Climate change affects coastal communities most rarely.",
    incorrectIndices: [6] },
  { id: "hi-7", topic: "Government", targetBand: "65", category: "mock", accent: "US",
    audioText: "The committee approved the budget after extensive debate.",
    displayText: "The committee rejected the budget after extensive debate.",
    incorrectIndices: [2] },
  { id: "hi-8", topic: "Science", targetBand: "79+", category: "mock", accent: "UK",
    audioText: "Modern psychology emphasises the role of environment.",
    displayText: "Modern psychology emphasises the role of inheritance.",
    incorrectIndices: [6] },
  { id: "hi-9", topic: "Education", targetBand: "50", category: "daily", accent: "AU",
    audioText: "The professor announced a quiz for next Monday.",
    displayText: "The professor announced a quiz for last Monday.",
    incorrectIndices: [6] },
  { id: "hi-10", topic: "Education", targetBand: "65", realExam2026: true, category: "prediction", accent: "US",
    audioText: "Online courses allow learners to study at their own pace.",
    displayText: "Online courses allow learners to study at their own desk.",
    incorrectIndices: [9] },
  { id: "hi-11", topic: "Culture", targetBand: "65", category: "daily", accent: "UK",
    audioText: "The exhibition features paintings from international museums.",
    displayText: "The exhibition features sculptures from international museums.",
    incorrectIndices: [3] },
  { id: "hi-12", topic: "Health", targetBand: "79+", realExam2026: true, category: "prediction", accent: "AU",
    audioText: "Research suggests that meditation can improve focus over time.",
    displayText: "Research suggests that meditation can reduce focus over time.",
    incorrectIndices: [5] },
  { id: "hi-13", topic: "Engineering", targetBand: "65", category: "mock", accent: "UK",
    audioText: "Engineers designed the bridge to withstand strong winds.",
    displayText: "Engineers designed the bridge to withstand strong currents.",
    incorrectIndices: [7] },
  { id: "hi-14", topic: "Education", targetBand: "50", category: "daily", accent: "US",
    audioText: "The campus radio broadcasts interviews with visiting scholars.",
    displayText: "The campus radio broadcasts interviews with leaving scholars.",
    incorrectIndices: [6] },
  { id: "hi-15", topic: "Workplace", targetBand: "79+", realExam2026: true, category: "mock", accent: "UK",
    audioText: "Effective teamwork depends on clear communication and respect.",
    displayText: "Effective teamwork depends on clear competition and respect.",
    incorrectIndices: [5] }
];


// ===== Combined banks (existing + expansion) for pages to consume =====
export const READ_ALOUD_ALL: PteReadAloud[]            = [...READ_ALOUD_BANK, ...READ_ALOUD_EXPANSION];
export const REPEAT_SENTENCE_ALL: PteRepeatSentence[]  = [...REPEAT_SENTENCE_BANK, ...REPEAT_SENTENCE_EXPANSION];
export const ESSAY_ALL: PteEssayPrompt[]               = [...ESSAY_BANK, ...ESSAY_EXPANSION];
export const SUMMARIZE_TEXT_ALL: PteSummarizeText[]    = [...SUMMARIZE_TEXT_BANK, ...SUMMARIZE_TEXT_EXPANSION];
export const FILL_BLANK_ALL: PteFillBlank[]            = [...FILL_BLANK_BANK, ...FILL_BLANK_EXPANSION];
export const REORDER_ALL: PteReorderItem[]             = [...REORDER_BANK, ...REORDER_EXPANSION];
export const DICTATION_ALL: PteDictation[]             = [...DICTATION_BANK, ...DICTATION_EXPANSION];
export const SUMMARIZE_SPOKEN_ALL: PteSummarizeSpoken[]= [...SUMMARIZE_SPOKEN_BANK, ...SUMMARIZE_SPOKEN_EXPANSION];
export const DESCRIBE_IMAGE_ALL: PteDescribeImage[]    = [...DESCRIBE_IMAGE_BANK, ...DESCRIBE_IMAGE_EXPANSION];

// Total count of practice items across all task types (used by the PTE Peak progress bar)
export const PTE_TOTAL_TASKS =
  READ_ALOUD_ALL.length + REPEAT_SENTENCE_ALL.length + ESSAY_ALL.length +
  SUMMARIZE_TEXT_ALL.length + FILL_BLANK_ALL.length + REORDER_ALL.length +
  DICTATION_ALL.length + SUMMARIZE_SPOKEN_ALL.length +
  DESCRIBE_IMAGE_ALL.length + MCQ_BANK.length + HIGHLIGHT_INCORRECT_BANK.length;

// Generic helper used by skill pages for filter UI.
export const PTE_TARGET_BANDS: PteTargetBand[] = ["50", "65", "79+"];
export const PTE_CATEGORIES: { id: PteCategory; label: string; description: string }[] = [
  { id: "daily",      label: "Daily Practice",  description: "Short, varied tasks for everyday warm-up." },
  { id: "mock",       label: "Mock Tests",      description: "Items pulled into full mock test rotations." },
  { id: "prediction", label: "Prediction Files",description: "2026 high-frequency questions to memorise." },
];
