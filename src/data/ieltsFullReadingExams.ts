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
];
