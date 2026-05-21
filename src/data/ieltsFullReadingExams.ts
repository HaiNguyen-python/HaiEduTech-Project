/**
 * @file ieltsFullReadingExams.ts
 * @description Full-text IELTS Academic Reading mock exams (Passage + mixed
 *   question formats: multiple choice, matching headings, fill-in-the-blanks).
 *   Each exam is self-contained; durations follow the official IELTS spec
 *   (60 minutes per full Reading paper — here per single passage we use 20m).
 */

export type ReadingQuestionType = "multiple-choice" | "matching-headings" | "fill-blank";

export interface ReadingQuestion {
  /** 1-based question number used for navigation matrix */
  number: number;
  type: ReadingQuestionType;
  prompt: string;
  /** For multiple-choice: array of options. Letter labels are auto-rendered (A, B, C...) */
  options?: string[];
  /**
   * For matching-headings: array of {label, text} where label is the roman / letter
   * shown in the dropdown.
   */
  headings?: { label: string; text: string }[];
  /** Canonical correct answer (case-insensitive comparison). */
  answer: string;
  /** Optional explanation revealed in review mode. */
  explanation?: string;
}

export interface ReadingExam {
  id: string;
  title: string;
  level: "Easy" | "Medium" | "Hard";
  durationMinutes: number;
  passageTitle: string;
  /** Plain-text passage. Paragraphs are split on blank lines. Lead each paragraph
   *  with its letter label, e.g. "A. ..." to support matching-headings questions. */
  passage: string;
  questions: ReadingQuestion[];
}

export const IELTS_FULL_READING_EXAMS: ReadingExam[] = [
  {
    id: "rx-1",
    title: "The Rise of Renewable Energy",
    level: "Medium",
    durationMinutes: 20,
    passageTitle: "The Rise of Renewable Energy",
    passage:
`A. In 2023, renewable energy overtook coal as the world's largest source of electricity for the first time in over a century, marking a profound turning point in the global energy transition. The International Energy Agency reported that solar photovoltaic capacity alone grew by 32% year-on-year, with China responsible for nearly two-thirds of the new installations. Analysts described the shift as both inevitable and faster than many had predicted only a decade earlier.

B. Surveys conducted across thirty nations show that more than 70% of citizens now support a faster move away from fossil fuels, even when it means short-term price increases. Young people in particular consistently rate climate change among their top three concerns, ahead of unemployment in many advanced economies. This shift in public sentiment has emboldened politicians to set tighter emissions targets — although whether those targets are actually met remains a separate question.

C. Yet wind and solar power are intermittent: the sun does not always shine and the wind does not always blow. Without affordable, large-scale energy storage, grids still depend on natural-gas plants to fill the gaps when generation drops. Engineers describe storage as the single missing piece of the renewable puzzle. Several emerging technologies, including iron-air batteries and gravity storage, promise dramatic cost reductions but have not yet been deployed at scale.

D. Building such storage is expensive. A recent IEA report estimates the world needs to invest over USD 800 billion in batteries by 2030 to keep pace with renewable growth. Critics warn that the upfront cost will fall disproportionately on lower-income households unless governments redesign electricity tariffs and provide targeted subsidies. Supporters counter that the long-term savings — in lower fuel imports, cleaner air, and reduced climate damage — vastly outweigh the initial outlay.`,
    questions: [
      {
        number: 1,
        type: "matching-headings",
        prompt: "Choose the most suitable heading for Paragraph A.",
        headings: [
          { label: "i", text: "The cost of going green" },
          { label: "ii", text: "A historic shift in power generation" },
          { label: "iii", text: "Storage – the missing piece" },
          { label: "iv", text: "Public attitudes turning positive" },
        ],
        answer: "ii",
        explanation: "Paragraph A focuses on renewables overtaking coal — a historic shift.",
      },
      {
        number: 2,
        type: "matching-headings",
        prompt: "Choose the most suitable heading for Paragraph B.",
        headings: [
          { label: "i", text: "The cost of going green" },
          { label: "ii", text: "A historic shift in power generation" },
          { label: "iii", text: "Storage – the missing piece" },
          { label: "iv", text: "Public attitudes turning positive" },
        ],
        answer: "iv",
        explanation: "Paragraph B presents survey data showing >70% public support.",
      },
      {
        number: 3,
        type: "matching-headings",
        prompt: "Choose the most suitable heading for Paragraph C.",
        headings: [
          { label: "i", text: "The cost of going green" },
          { label: "ii", text: "A historic shift in power generation" },
          { label: "iii", text: "Storage – the missing piece" },
          { label: "iv", text: "Public attitudes turning positive" },
        ],
        answer: "iii",
        explanation: "Paragraph C explicitly calls storage the missing piece of the puzzle.",
      },
      {
        number: 4,
        type: "matching-headings",
        prompt: "Choose the most suitable heading for Paragraph D.",
        headings: [
          { label: "i", text: "The cost of going green" },
          { label: "ii", text: "A historic shift in power generation" },
          { label: "iii", text: "Storage – the missing piece" },
          { label: "iv", text: "Public attitudes turning positive" },
        ],
        answer: "i",
        explanation: "Paragraph D centres on the USD 800 billion investment needed.",
      },
      {
        number: 5,
        type: "multiple-choice",
        prompt: "According to Paragraph A, which country was responsible for the largest share of new solar installations in 2023?",
        options: ["The United States", "Germany", "China", "India"],
        answer: "China",
      },
      {
        number: 6,
        type: "multiple-choice",
        prompt: "Why do grids still rely on natural-gas plants according to the passage?",
        options: [
          "Gas is cheaper than renewables",
          "Wind and solar are intermittent",
          "Storage technology is illegal",
          "Public opinion opposes renewables",
        ],
        answer: "Wind and solar are intermittent",
      },
      {
        number: 7,
        type: "multiple-choice",
        prompt: "What concern do critics raise about the cost of storage?",
        options: [
          "It will damage the environment",
          "It will fall on lower-income households",
          "It will slow down renewable growth",
          "It will benefit only China",
        ],
        answer: "It will fall on lower-income households",
      },
      {
        number: 8,
        type: "fill-blank",
        prompt: "Complete: 'Solar photovoltaic capacity grew by ___% year-on-year in 2023.'",
        answer: "32",
      },
      {
        number: 9,
        type: "fill-blank",
        prompt: "Complete: 'Surveys covered ___ nations.'",
        answer: "thirty",
      },
      {
        number: 10,
        type: "fill-blank",
        prompt: "Complete: 'The world needs to invest over USD ___ billion in batteries by 2030.'",
        answer: "800",
      },
    ],
  },

  {
    id: "rx-2",
    title: "The Science of Sleep",
    level: "Hard",
    durationMinutes: 20,
    passageTitle: "Why We Sleep — and Why We Sleep Less",
    passage:
`A. For most of human history, sleep was governed by sunlight. People rose with dawn, worked through daylight hours and rested when darkness fell. The invention of artificial lighting in the late nineteenth century severed this ancient connection, and the average adult in industrialised societies now sleeps roughly two hours less per night than their counterparts did in 1900. Sleep scientists describe this trend as one of the most profound, and least debated, behavioural shifts of the modern era.

B. The consequences of chronic sleep deprivation are now well documented. Studies from leading universities have linked sustained sleep loss to weakened immunity, impaired memory consolidation, weight gain, and a heightened risk of cardiovascular disease. Cognitively, even a single night of restricted sleep can reduce attention span by up to 30%, with effects on judgement comparable to mild alcohol intoxication. Such findings have prompted a growing number of employers to revisit workplace policies that have traditionally rewarded long hours over genuine productivity.

C. Yet, despite this evidence, sleep remains stubbornly undervalued. In many cultures, exhaustion is worn as a badge of honour, while sleeping well is dismissed as laziness. Sleep researcher Matthew Walker has argued that the routine sacrifice of sleep is "a slow form of self-euthanasia". Whether such language is helpful or unnecessarily alarmist is debated, but the underlying message — that sleep is biologically non-negotiable — has begun to reach a wider audience.

D. Practical strategies for better sleep are well known: regular bed and wake times, dim lighting in the evening, limited caffeine after midday, and a cool, dark bedroom. The challenge is rarely the advice itself but the willingness to follow it. Until our cultural attitude to rest catches up with the science, the modern epidemic of sleep deprivation is unlikely to recede.`,
    questions: [
      {
        number: 1,
        type: "multiple-choice",
        prompt: "How much less do adults sleep today compared with 1900, according to Paragraph A?",
        options: ["About 30 minutes", "About 1 hour", "About 2 hours", "About 4 hours"],
        answer: "About 2 hours",
      },
      {
        number: 2,
        type: "multiple-choice",
        prompt: "Which of the following is NOT listed as a consequence of chronic sleep deprivation?",
        options: [
          "Weakened immunity",
          "Impaired memory",
          "Improved creativity",
          "Cardiovascular risk",
        ],
        answer: "Improved creativity",
      },
      {
        number: 3,
        type: "multiple-choice",
        prompt: "Sleep loss after a single restricted night is compared to:",
        options: ["A severe migraine", "Mild alcohol intoxication", "A bout of flu", "Caffeine withdrawal"],
        answer: "Mild alcohol intoxication",
      },
      {
        number: 4,
        type: "multiple-choice",
        prompt: "What is Matthew Walker's stance on the routine sacrifice of sleep?",
        options: [
          "He believes it is harmless",
          "He calls it 'a slow form of self-euthanasia'",
          "He considers it culturally important",
          "He has no opinion on the matter",
        ],
        answer: "He calls it 'a slow form of self-euthanasia'",
      },
      {
        number: 5,
        type: "matching-headings",
        prompt: "Choose the most suitable heading for Paragraph A.",
        headings: [
          { label: "i", text: "Practical solutions and remaining obstacles" },
          { label: "ii", text: "Cultural attitudes that resist change" },
          { label: "iii", text: "Severing the link between sunlight and sleep" },
          { label: "iv", text: "Documented physical and mental costs" },
        ],
        answer: "iii",
      },
      {
        number: 6,
        type: "matching-headings",
        prompt: "Choose the most suitable heading for Paragraph B.",
        headings: [
          { label: "i", text: "Practical solutions and remaining obstacles" },
          { label: "ii", text: "Cultural attitudes that resist change" },
          { label: "iii", text: "Severing the link between sunlight and sleep" },
          { label: "iv", text: "Documented physical and mental costs" },
        ],
        answer: "iv",
      },
      {
        number: 7,
        type: "matching-headings",
        prompt: "Choose the most suitable heading for Paragraph C.",
        headings: [
          { label: "i", text: "Practical solutions and remaining obstacles" },
          { label: "ii", text: "Cultural attitudes that resist change" },
          { label: "iii", text: "Severing the link between sunlight and sleep" },
          { label: "iv", text: "Documented physical and mental costs" },
        ],
        answer: "ii",
      },
      {
        number: 8,
        type: "matching-headings",
        prompt: "Choose the most suitable heading for Paragraph D.",
        headings: [
          { label: "i", text: "Practical solutions and remaining obstacles" },
          { label: "ii", text: "Cultural attitudes that resist change" },
          { label: "iii", text: "Severing the link between sunlight and sleep" },
          { label: "iv", text: "Documented physical and mental costs" },
        ],
        answer: "i",
      },
      {
        number: 9,
        type: "fill-blank",
        prompt: "Complete: 'Even one night of restricted sleep can reduce attention span by up to ___%.'",
        answer: "30",
      },
      {
        number: 10,
        type: "fill-blank",
        prompt: "Complete: 'Caffeine should be limited after ___.'",
        answer: "midday",
      },
    ],
  },

  // =====================================================================
  // Full IELTS-style mock tests (Cambridge format: ~13 questions per passage,
  // mixed question types, 20 minutes per passage)
  // =====================================================================

  {
    id: "rx-3",
    title: "Cambridge-Style Test 25 — The Story of the Bicycle",
    level: "Medium",
    durationMinutes: 20,
    passageTitle: "The Story of the Bicycle",
    passage:
`A. The bicycle, in something close to its modern form, first appeared in Europe in the 1860s. Earlier wooden 'running machines', propelled by the rider pushing both feet against the ground, had circulated since the early nineteenth century but offered limited practical use. The decisive breakthrough came when French blacksmith Pierre Michaux fitted pedals directly to the front wheel of such a machine in 1864, creating what was soon nicknamed the 'boneshaker' for its uncomfortable iron-rimmed ride over cobbled streets.

B. The 1870s ushered in the dramatic 'penny-farthing', whose enormous front wheel — sometimes more than one and a half metres across — allowed riders to cover greater distances with each pedal stroke. Yet the design was notoriously dangerous: a sudden stop could throw the rider head-first over the handlebars, an accident so frequent it acquired its own name, the 'header'. Cycling, in this era, remained the preserve of athletic young men with both money and nerve.

C. Everything changed in 1885, when English inventor John Kemp Starley introduced the Rover 'safety bicycle', featuring two wheels of equal size and a chain-driven rear wheel. Combined with John Boyd Dunlop's pneumatic tyre, patented three years later, the safety bicycle was suddenly comfortable, fast and, crucially, accessible to women. Cycling clubs sprang up across Britain, and within a decade the bicycle had become the most affordable form of personal transport the world had ever seen.

D. The social consequences were profound. For the first time, working-class men and women could travel beyond walking distance for work, courtship or leisure, weakening the rigid geographies of class and parish. The American suffragist Susan B. Anthony famously declared that the bicycle had "done more to emancipate women than anything else in the world", freeing them from chaperones and from impractical Victorian dress.

E. Today, more than a century later, the bicycle is enjoying a renaissance. Concerns about climate change, congestion and public health have prompted cities from Copenhagen to Bogotá to invest heavily in dedicated cycling infrastructure. In the Netherlands, where dedicated paths now exceed 35,000 kilometres, more than a quarter of all journeys are made by bike. Few inventions of the Victorian age have proved so quietly, and so consistently, useful.`,
    questions: [
      { number: 1, type: "matching-headings", prompt: "Choose the best heading for Paragraph A.",
        headings: [
          { label: "i", text: "A modern revival driven by green concerns" },
          { label: "ii", text: "The first pedal-driven design" },
          { label: "iii", text: "Liberation across class and gender" },
          { label: "iv", text: "The dangerous golden age of the giant wheel" },
          { label: "v", text: "The breakthrough of equal-sized wheels" },
        ], answer: "ii" },
      { number: 2, type: "matching-headings", prompt: "Choose the best heading for Paragraph B.",
        headings: [
          { label: "i", text: "A modern revival driven by green concerns" },
          { label: "ii", text: "The first pedal-driven design" },
          { label: "iii", text: "Liberation across class and gender" },
          { label: "iv", text: "The dangerous golden age of the giant wheel" },
          { label: "v", text: "The breakthrough of equal-sized wheels" },
        ], answer: "iv" },
      { number: 3, type: "matching-headings", prompt: "Choose the best heading for Paragraph C.",
        headings: [
          { label: "i", text: "A modern revival driven by green concerns" },
          { label: "ii", text: "The first pedal-driven design" },
          { label: "iii", text: "Liberation across class and gender" },
          { label: "iv", text: "The dangerous golden age of the giant wheel" },
          { label: "v", text: "The breakthrough of equal-sized wheels" },
        ], answer: "v" },
      { number: 4, type: "matching-headings", prompt: "Choose the best heading for Paragraph D.",
        headings: [
          { label: "i", text: "A modern revival driven by green concerns" },
          { label: "ii", text: "The first pedal-driven design" },
          { label: "iii", text: "Liberation across class and gender" },
          { label: "iv", text: "The dangerous golden age of the giant wheel" },
          { label: "v", text: "The breakthrough of equal-sized wheels" },
        ], answer: "iii" },
      { number: 5, type: "matching-headings", prompt: "Choose the best heading for Paragraph E.",
        headings: [
          { label: "i", text: "A modern revival driven by green concerns" },
          { label: "ii", text: "The first pedal-driven design" },
          { label: "iii", text: "Liberation across class and gender" },
          { label: "iv", text: "The dangerous golden age of the giant wheel" },
          { label: "v", text: "The breakthrough of equal-sized wheels" },
        ], answer: "i" },
      { number: 6, type: "multiple-choice", prompt: "Who fitted pedals to the front wheel in 1864?",
        options: ["John Kemp Starley", "John Boyd Dunlop", "Pierre Michaux", "Susan B. Anthony"], answer: "Pierre Michaux" },
      { number: 7, type: "multiple-choice", prompt: "Why was the penny-farthing dangerous?",
        options: ["The pedals broke easily", "Riders could be thrown over the handlebars", "It rusted in the rain", "It was too heavy to steer"], answer: "Riders could be thrown over the handlebars" },
      { number: 8, type: "multiple-choice", prompt: "What change made cycling accessible to women?",
        options: ["The boneshaker", "The Rover safety bicycle with pneumatic tyres", "The penny-farthing", "Dedicated cycling clubs"], answer: "The Rover safety bicycle with pneumatic tyres" },
      { number: 9, type: "fill-blank", prompt: "Complete: 'Starley introduced the Rover safety bicycle in ___.'", answer: "1885" },
      { number: 10, type: "fill-blank", prompt: "Complete: 'Dunlop patented the ___ tyre three years later.'", answer: "pneumatic" },
      { number: 11, type: "fill-blank", prompt: "Complete: 'In the Netherlands, more than a ___ of all journeys are made by bike.'", answer: "quarter" },
      { number: 12, type: "fill-blank", prompt: "Complete: 'Dutch cycle paths now exceed ___ kilometres.'", answer: "35,000" },
      { number: 13, type: "multiple-choice", prompt: "What is the writer's overall view of the bicycle?",
        options: ["A dangerous Victorian relic", "A quietly useful invention enjoying a revival", "A purely recreational object", "An expensive luxury"], answer: "A quietly useful invention enjoying a revival" },
    ],
  },

  {
    id: "rx-4",
    title: "Cambridge-Style Test 26 — How Coral Reefs Build Themselves",
    level: "Hard",
    durationMinutes: 20,
    passageTitle: "How Coral Reefs Build Themselves",
    passage:
`A. Coral reefs are among the oldest and most productive ecosystems on Earth. Although they cover less than 1% of the ocean floor, they support an estimated 25% of all marine species. The Great Barrier Reef alone — visible from space — has been growing, dying back and regrowing for at least 20 million years. Despite this antiquity, the underlying biology was only properly understood in the nineteenth century, when Charles Darwin proposed that atolls form as coral grows upward on slowly subsiding volcanic islands.

B. A coral colony is, strictly speaking, an assembly of thousands of tiny animals called polyps, each only a few millimetres across. Each polyp secretes a hard calcium-carbonate skeleton beneath itself; as polyps reproduce and new generations build on top of older skeletons, the colony grows. Reef-building corals grow remarkably slowly — typically between 0.3 and 2 centimetres a year — which is why even a small reef may be hundreds, or even thousands, of years old.

C. The key to a coral's success is a partnership, or symbiosis, with single-celled algae called zooxanthellae. These algae live inside the coral's tissues, providing up to 90% of the coral's energy through photosynthesis in exchange for a sheltered home and a steady supply of nutrients. It is also the zooxanthellae that give corals their famous colours: when corals are stressed by heat, they expel the algae and turn ghostly white — the process known as bleaching.

D. Mass bleaching events were almost unknown before the 1980s but have since become alarmingly common. Marine biologists recorded five global bleaching events between 1998 and 2023, with the Great Barrier Reef alone suffering four. Although corals can recover if conditions improve, repeated bleaching weakens their reproductive capacity and leaves the entire ecosystem more vulnerable to disease and storm damage.

E. Restoration efforts are now under way around the world. Scientists in Australia have begun selectively breeding heat-tolerant corals; teams in the Caribbean attach coral fragments to underwater 'nurseries' before transplanting them to damaged sites. Promising as these projects are, researchers are unanimous that they cannot, on their own, save the reefs. Without rapid cuts in greenhouse-gas emissions, the underlying threat of ocean warming will continue to outpace any local intervention.`,
    questions: [
      { number: 1, type: "multiple-choice", prompt: "What proportion of marine species do coral reefs support?",
        options: ["About 1%", "About 10%", "About 25%", "About 50%"], answer: "About 25%" },
      { number: 2, type: "multiple-choice", prompt: "Who first explained how atolls form?",
        options: ["A team of Australian biologists", "Charles Darwin", "Caribbean restoration scientists", "Nineteenth-century geologists"], answer: "Charles Darwin" },
      { number: 3, type: "multiple-choice", prompt: "What gives corals their colour?",
        options: ["Calcium-carbonate skeletons", "Symbiotic zooxanthellae algae", "Polyp tissues", "Surrounding seawater"], answer: "Symbiotic zooxanthellae algae" },
      { number: 4, type: "multiple-choice", prompt: "Why is coral bleaching considered serious?",
        options: ["It changes the colour of beaches", "It makes corals more vulnerable to disease and storms", "It speeds up reef growth", "It stops algae from reproducing"], answer: "It makes corals more vulnerable to disease and storms" },
      { number: 5, type: "matching-headings", prompt: "Choose the best heading for Paragraph A.",
        headings: [
          { label: "i", text: "Local rescue projects and their limits" },
          { label: "ii", text: "The slow architecture of a colony" },
          { label: "iii", text: "An ancient and biodiverse ecosystem" },
          { label: "iv", text: "A bleaching crisis since the 1980s" },
          { label: "v", text: "The hidden partner inside the coral" },
        ], answer: "iii" },
      { number: 6, type: "matching-headings", prompt: "Choose the best heading for Paragraph B.",
        headings: [
          { label: "i", text: "Local rescue projects and their limits" },
          { label: "ii", text: "The slow architecture of a colony" },
          { label: "iii", text: "An ancient and biodiverse ecosystem" },
          { label: "iv", text: "A bleaching crisis since the 1980s" },
          { label: "v", text: "The hidden partner inside the coral" },
        ], answer: "ii" },
      { number: 7, type: "matching-headings", prompt: "Choose the best heading for Paragraph C.",
        headings: [
          { label: "i", text: "Local rescue projects and their limits" },
          { label: "ii", text: "The slow architecture of a colony" },
          { label: "iii", text: "An ancient and biodiverse ecosystem" },
          { label: "iv", text: "A bleaching crisis since the 1980s" },
          { label: "v", text: "The hidden partner inside the coral" },
        ], answer: "v" },
      { number: 8, type: "matching-headings", prompt: "Choose the best heading for Paragraph D.",
        headings: [
          { label: "i", text: "Local rescue projects and their limits" },
          { label: "ii", text: "The slow architecture of a colony" },
          { label: "iii", text: "An ancient and biodiverse ecosystem" },
          { label: "iv", text: "A bleaching crisis since the 1980s" },
          { label: "v", text: "The hidden partner inside the coral" },
        ], answer: "iv" },
      { number: 9, type: "matching-headings", prompt: "Choose the best heading for Paragraph E.",
        headings: [
          { label: "i", text: "Local rescue projects and their limits" },
          { label: "ii", text: "The slow architecture of a colony" },
          { label: "iii", text: "An ancient and biodiverse ecosystem" },
          { label: "iv", text: "A bleaching crisis since the 1980s" },
          { label: "v", text: "The hidden partner inside the coral" },
        ], answer: "i" },
      { number: 10, type: "fill-blank", prompt: "Complete: 'Reef-building corals grow only ___ to 2 cm per year.'", answer: "0.3" },
      { number: 11, type: "fill-blank", prompt: "Complete: 'Zooxanthellae provide up to ___% of a coral's energy.'", answer: "90" },
      { number: 12, type: "fill-blank", prompt: "Complete: 'There were ___ global bleaching events between 1998 and 2023.'", answer: "five" },
      { number: 13, type: "fill-blank", prompt: "Complete: 'Without cuts in greenhouse-gas emissions, ocean ___ will continue to threaten reefs.'", answer: "warming" },
    ],
  },

  {
    id: "rx-5",
    title: "Cambridge-Style Test 27 — The Quiet Rise of Remote Work",
    level: "Medium",
    durationMinutes: 20,
    passageTitle: "The Quiet Rise of Remote Work",
    passage:
`A. The idea of working from home is, in historical terms, very old. For most of human history, the household and the workplace were one and the same: farmers, weavers, blacksmiths and shopkeepers all conducted their trade from where they lived. The clear separation of 'home' and 'work' is largely a product of the Industrial Revolution, when factories drew labourers out of their cottages and into large, centralised workplaces. Surprisingly, then, the modern phenomenon of remote work represents not a leap forward but in some ways a return to a much older pattern of life.

B. The term 'telecommuting' was coined in 1972 by Jack Nilles, an American engineer who argued that if 'one in seven urban commuters did not have to travel to work', the United States could reduce its dependence on imported oil. For three decades, however, the idea remained marginal. Most managers continued to believe — without firm evidence — that productivity required physical supervision, and the technology to support reliable home offices was both slow and expensive.

C. The transformation arrived suddenly. Between 2020 and 2022, a global health crisis forced an estimated 60% of office workers in the United States, the United Kingdom and much of Western Europe to work from home for extended periods. Cloud-based collaboration tools, video conferencing and high-speed broadband — all of which had been available for years — were finally adopted on a mass scale. By 2023, hybrid working, in which staff split their time between home and office, had become the default in many large organisations.

D. The benefits, for many workers, have been considerable. A 2023 study published in Nature found that hybrid workers were no less productive than their fully in-office peers, while reporting significantly higher job satisfaction and lower levels of burnout. They saved, on average, 72 minutes a day previously lost to commuting — time many redirected towards exercise, family or sleep.

E. The picture is not uniformly positive. Critics warn that remote work risks weakening the casual interactions that drive creativity and mentorship. Younger employees, in particular, may struggle to build professional networks if they rarely meet colleagues in person. There is also evidence that remote work has widened the gap between knowledge workers, who can perform their jobs anywhere, and service workers, who cannot — raising fresh questions about fairness in the post-pandemic economy.`,
    questions: [
      { number: 1, type: "matching-headings", prompt: "Choose the best heading for Paragraph A.",
        headings: [
          { label: "i", text: "An idea proposed but ignored" },
          { label: "ii", text: "Productivity and personal time gains" },
          { label: "iii", text: "An old pattern, freshly rediscovered" },
          { label: "iv", text: "New inequalities and missed connections" },
          { label: "v", text: "A crisis-driven adoption of waiting technologies" },
        ], answer: "iii" },
      { number: 2, type: "matching-headings", prompt: "Choose the best heading for Paragraph B.",
        headings: [
          { label: "i", text: "An idea proposed but ignored" },
          { label: "ii", text: "Productivity and personal time gains" },
          { label: "iii", text: "An old pattern, freshly rediscovered" },
          { label: "iv", text: "New inequalities and missed connections" },
          { label: "v", text: "A crisis-driven adoption of waiting technologies" },
        ], answer: "i" },
      { number: 3, type: "matching-headings", prompt: "Choose the best heading for Paragraph C.",
        headings: [
          { label: "i", text: "An idea proposed but ignored" },
          { label: "ii", text: "Productivity and personal time gains" },
          { label: "iii", text: "An old pattern, freshly rediscovered" },
          { label: "iv", text: "New inequalities and missed connections" },
          { label: "v", text: "A crisis-driven adoption of waiting technologies" },
        ], answer: "v" },
      { number: 4, type: "matching-headings", prompt: "Choose the best heading for Paragraph D.",
        headings: [
          { label: "i", text: "An idea proposed but ignored" },
          { label: "ii", text: "Productivity and personal time gains" },
          { label: "iii", text: "An old pattern, freshly rediscovered" },
          { label: "iv", text: "New inequalities and missed connections" },
          { label: "v", text: "A crisis-driven adoption of waiting technologies" },
        ], answer: "ii" },
      { number: 5, type: "matching-headings", prompt: "Choose the best heading for Paragraph E.",
        headings: [
          { label: "i", text: "An idea proposed but ignored" },
          { label: "ii", text: "Productivity and personal time gains" },
          { label: "iii", text: "An old pattern, freshly rediscovered" },
          { label: "iv", text: "New inequalities and missed connections" },
          { label: "v", text: "A crisis-driven adoption of waiting technologies" },
        ], answer: "iv" },
      { number: 6, type: "multiple-choice", prompt: "Who coined the term 'telecommuting'?",
        options: ["A British prime minister", "Jack Nilles, an American engineer", "A 2023 Nature researcher", "A Western European union"], answer: "Jack Nilles, an American engineer" },
      { number: 7, type: "multiple-choice", prompt: "Why did remote work remain marginal until 2020 according to the writer?",
        options: ["The technology was too cheap", "Workers refused to adopt it", "Managers assumed productivity required supervision", "Governments had banned it"], answer: "Managers assumed productivity required supervision" },
      { number: 8, type: "multiple-choice", prompt: "What did the 2023 Nature study conclude about hybrid workers?",
        options: ["They were less productive than in-office peers", "They reported higher satisfaction with no productivity loss", "They worked longer hours overall", "They had more health problems"], answer: "They reported higher satisfaction with no productivity loss" },
      { number: 9, type: "multiple-choice", prompt: "What concern is raised about younger employees?",
        options: ["They cannot use the technology", "They struggle to build professional networks", "They refuse hybrid arrangements", "They earn lower salaries"], answer: "They struggle to build professional networks" },
      { number: 10, type: "fill-blank", prompt: "Complete: 'The term telecommuting was coined in ___.'", answer: "1972" },
      { number: 11, type: "fill-blank", prompt: "Complete: 'An estimated ___% of office workers worked from home during 2020–2022.'", answer: "60" },
      { number: 12, type: "fill-blank", prompt: "Complete: 'Hybrid workers saved on average ___ minutes per day previously lost to commuting.'", answer: "72" },
      { number: 13, type: "fill-blank", prompt: "Complete: 'Remote work has widened the gap between knowledge workers and ___ workers.'", answer: "service" },
    ],
  },
];
