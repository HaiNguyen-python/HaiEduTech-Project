/**
 * @file pteLessonsData.ts
 * @description PTE Academic strategy lessons (English only): 12 lessons, 3 per skill.
 *   Each lesson carries a method walkthrough, a worked example, scoring notes,
 *   drills and a 5-question quiz. Pure data - no side effects.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

export type PteLessonSkill = "speaking" | "writing" | "reading" | "listening";

export interface PteLessonQuiz {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export interface PteLessonStep {
  title: string;
  detail: string;
}

export interface PteLesson {
  id: string;
  skill: PteLessonSkill;
  title: string;
  taskTypes: string;
  targetBand: string;
  minutes: number;
  overview: string;
  objectives: string[];
  steps: PteLessonStep[];
  example: { prompt: string; model: string; notes: string[] };
  scoring: string[];
  mistakes: string[];
  drills: string[];
  practiceRoute: string;
  quiz: PteLessonQuiz[];
}

export const PTE_SKILL_META: Record<PteLessonSkill, { label: string; route: string; accent: string }> = {
  speaking: { label: "Speaking", route: "/pte/speaking", accent: "from-[#003580] to-[#0052cc]" },
  writing: { label: "Writing", route: "/pte/writing", accent: "from-[#0052cc] to-[#1e40af]" },
  reading: { label: "Reading", route: "/pte/reading", accent: "from-[#1e40af] to-[#003580]" },
  listening: { label: "Listening", route: "/pte/listening", accent: "from-[#0052cc] to-[#003580]" },
};

export const PTE_LESSONS: PteLesson[] = [
  /* ============================ SPEAKING ============================ */
  {
    id: "pl-sp-1",
    skill: "speaking",
    title: "Read Aloud: chunking and the 35-second window",
    taskTypes: "Read Aloud",
    targetBand: "50 - 79+",
    minutes: 12,
    overview:
      "Read Aloud scores Content, Oral Fluency and Pronunciation at the same time. The single biggest score driver is not speed but smooth, uninterrupted delivery of meaningful chunks. You get roughly 35-40 seconds of preparation and then one recording attempt with no pause button.",
    objectives: [
      "Split any academic sentence into 3-6 breath chunks before the microphone opens",
      "Keep a steady pace of about 140-160 words per minute without hesitation",
      "Recover from a misread word without restarting the sentence",
    ],
    steps: [
      { title: "1. Scan for structure", detail: "In preparation time, mark the commas, the main verb and any long noun phrase. These are your natural chunk borders." },
      { title: "2. Mark stress words", detail: "Underline the content words (nouns, main verbs, adjectives). Function words such as of, the, that stay unstressed and fast." },
      { title: "3. Whisper-rehearse the hard words", detail: "Say technical or multi-syllable words once at low volume so the first attempt on record is not the first attempt ever." },
      { title: "4. Deliver in one flow", detail: "Start speaking within one second of the beep, keep the pace even, and never repeat a word. Self-correction costs more fluency marks than the original slip." },
      { title: "5. Land the ending", detail: "Drop the pitch on the final chunk so the recording sounds finished rather than cut off." },
    ],
    example: {
      prompt: "Urban planners increasingly argue that public transport, rather than private car ownership, holds the key to reducing congestion in rapidly expanding cities.",
      model:
        "Urban planners increasingly argue / that public transport, / rather than private car ownership, / holds the key to reducing congestion / in rapidly expanding cities.",
      notes: [
        "Five chunks, one breath each - no chunk longer than about eight words",
        "Stress: planners, argue, public transport, private car, congestion, expanding cities",
        "Slight pause before and after the contrast phrase rather than private car ownership",
      ],
    },
    scoring: [
      "Content: every word must be read; skipped or added words cost content marks",
      "Oral Fluency: rewards even rhythm, punishes repetition, false starts and long silences",
      "Pronunciation: rewards clear vowels and word stress, not a native accent",
    ],
    mistakes: [
      "Reading word by word so the rhythm becomes robotic",
      "Restarting the sentence after mispronouncing one word",
      "Rushing the first three words before the microphone has fully opened",
    ],
    drills: [
      "Take three Read Aloud items and mark chunk borders with a slash before recording",
      "Record the same sentence twice: once slowly, once at target pace, then compare fluency",
      "Read only the stressed words aloud, then read the full sentence keeping that rhythm",
    ],
    practiceRoute: "/pte/speaking",
    quiz: [
      {
        question: "What should you do if you mispronounce one word halfway through a Read Aloud item?",
        options: [
          "Keep going and finish the sentence smoothly",
          "Stop and start the whole sentence again",
          "Repeat just that word twice, clearly",
          "Pause for three seconds to reset",
        ],
        answer: 0,
        explanation: "Fluency is scored across the whole recording, so a restart or repetition costs more than a single unclear word.",
      },
      {
        question: "Which pace best matches a high Oral Fluency score in Read Aloud?",
        options: ["About 90 words per minute", "About 140-160 words per minute", "As fast as possible", "Whatever pace avoids all pauses, even 200+ wpm"],
        answer: 1,
        explanation: "Around 140-160 wpm is fast enough to sound natural and slow enough to keep pronunciation clear.",
      },
      {
        question: "How many chunks is a typical 35-word Read Aloud sentence best divided into?",
        options: ["1", "3-6", "10-12", "One chunk per word"],
        answer: 1,
        explanation: "Three to six breath chunks keeps each unit meaningful and short enough to deliver without hesitation.",
      },
      {
        question: "Which words normally carry the stress in an academic sentence?",
        options: ["Articles and prepositions", "Content words: nouns, main verbs, adjectives", "The last word of every clause only", "Every second word"],
        answer: 1,
        explanation: "English rhythm stresses content words; function words stay short and unstressed.",
      },
      {
        question: "Pronunciation in PTE Speaking is scored mainly on:",
        options: [
          "Sounding like a native British or American speaker",
          "Clear, intelligible vowels, consonants and word stress",
          "Speaking very loudly",
          "Using a formal accent",
        ],
        answer: 1,
        explanation: "The rubric rewards intelligibility and correct stress, not a particular native accent.",
      },
    ],
  },
  {
    id: "pl-sp-2",
    skill: "speaking",
    title: "Repeat Sentence: memory buffer and shadow technique",
    taskTypes: "Repeat Sentence",
    targetBand: "50 - 79+",
    minutes: 10,
    overview:
      "Repeat Sentence is the highest-value Speaking task because it feeds both the Speaking and the Listening score. You hear the sentence once and must reproduce it immediately. Success depends on holding meaning, not on holding individual words.",
    objectives: [
      "Hold 8-12 word sentences in working memory using meaning groups",
      "Reproduce sentence rhythm and intonation, not just the words",
      "Produce a partial answer confidently when memory fails",
    ],
    steps: [
      { title: "1. Listen for the story, not the letters", detail: "Convert the sentence into a mental picture: who does what, where, why. Images survive in memory far longer than word lists." },
      { title: "2. Mirror the rhythm", detail: "Copy the speaker's stress pattern. Matching rhythm often pulls forgotten words back automatically." },
      { title: "3. Start within one second", detail: "The recording begins immediately; waiting to reconstruct the sentence wastes the response window and looks like hesitation." },
      { title: "4. Keep going when you lose a word", detail: "Say the chunks you remember in the original order at normal speed. Partial content with good fluency outscores a broken full attempt." },
      { title: "5. Never comment on your answer", detail: "No sorry, no um, no I forgot. Any extra words are treated as content errors." },
    ],
    example: {
      prompt: "The seminar on renewable energy has been moved to the lecture theatre on the second floor.",
      model: "The seminar on renewable energy / has been moved to the lecture theatre / on the second floor.",
      notes: [
        "Mental image: a seminar sign being carried upstairs to room 2",
        "Three meaning groups, each about six words",
        "Stress: seminar, renewable energy, moved, lecture theatre, second floor",
      ],
    },
    scoring: [
      "Content: scored on how many words appear in the correct order",
      "Oral Fluency: an even, single-flow delivery outscores a stop-start recall",
      "Repeat Sentence also contributes to your Listening score",
    ],
    mistakes: [
      "Trying to memorise letter by letter instead of meaning group by meaning group",
      "Long silence at the start while reconstructing the whole sentence",
      "Adding filler such as um or sorry, which counts against content",
    ],
    drills: [
      "Shadow ten sentences: speak along with the audio at a half-second delay",
      "Listen once, draw the sentence as a quick sketch, then speak from the sketch",
      "Practise sentences that are one or two words longer than your comfortable limit",
    ],
    practiceRoute: "/pte/speaking",
    quiz: [
      {
        question: "Why is Repeat Sentence considered high value in PTE?",
        options: [
          "It only appears in easy tests",
          "It contributes to both Speaking and Listening scores",
          "It has no time limit",
          "It is scored only on pronunciation",
        ],
        answer: 1,
        explanation: "Repeat Sentence is an integrated-skills task feeding both the Speaking and Listening scores.",
      },
      {
        question: "You remember only about 70% of the sentence. Best action?",
        options: [
          "Stay silent to avoid errors",
          "Say the remembered chunks fluently in the original order",
          "Say random academic words to fill the time",
          "Apologise then guess",
        ],
        answer: 1,
        explanation: "Partial content delivered fluently still scores content plus full fluency credit.",
      },
      {
        question: "Which memory strategy works best for Repeat Sentence?",
        options: [
          "Memorising individual letters",
          "Converting the sentence into a mental image or meaning group",
          "Counting the words",
          "Writing the whole sentence down first",
        ],
        answer: 1,
        explanation: "Meaning-based encoding survives far longer in working memory than isolated words.",
      },
      {
        question: "How soon should you begin speaking after the audio ends?",
        options: ["Within about one second", "After five seconds of planning", "Only when you can recall every word", "After the timer reaches zero"],
        answer: 0,
        explanation: "The recording starts immediately, so a delayed start is recorded as hesitation.",
      },
      {
        question: "Saying \"sorry, I forgot\" during your answer will:",
        options: ["Be ignored by the scoring engine", "Count as incorrect content", "Improve fluency", "Restart the recording"],
        answer: 1,
        explanation: "Everything you say is transcribed and compared with the target sentence, so extra words hurt content.",
      },
    ],
  },
  {
    id: "pl-sp-3",
    skill: "speaking",
    title: "Describe Image and Retell Lecture: reusable templates",
    taskTypes: "Describe Image · Retell Lecture",
    targetBand: "65 - 79+",
    minutes: 14,
    overview:
      "These two tasks give you 40 seconds to speak. Candidates lose marks by describing randomly and running out of ideas at second 20. A fixed template converts the task into filling four slots, which protects fluency even when the topic is unfamiliar.",
    objectives: [
      "Apply a four-slot template to any chart, map, process or photograph",
      "Take symbol-based notes during a 90-second lecture",
      "Fill the full 40-second window without dead air",
    ],
    steps: [
      { title: "1. Open with the topic", detail: "Describe Image: 'The bar chart compares ... over ...'. Retell Lecture: 'The lecturer discussed ...'." },
      { title: "2. Give the headline fact", detail: "One clear high, low, trend or main claim. This is the single most heavily weighted content point." },
      { title: "3. Add two supporting details", detail: "Two numbers, two categories, two stages or two examples from your notes. Two is enough - depth beats breadth here." },
      { title: "4. Close with significance", detail: "'Overall, the data suggests ...' or 'In conclusion, the lecturer argued ...'. A closing line guarantees you never stop early." },
      { title: "5. Take notes with symbols", detail: "For Retell Lecture use arrows, plus and minus signs, and first letters only. Full words cost too much time." },
    ],
    example: {
      prompt: "A line graph showing electric vehicle sales in four countries between 2015 and 2025.",
      model:
        "The line graph compares electric vehicle sales in four countries from 2015 to 2025. Overall, sales rose sharply in every market. The steepest growth was in China, which more than tripled after 2020, while Germany showed steady but slower increases. Japan remained the lowest throughout the period. Overall, the data suggests that electric vehicles moved from a niche to a mainstream choice within a decade.",
      notes: [
        "Slot 1 topic, slot 2 headline trend, slot 3 two supporting comparisons, slot 4 significance",
        "Runs about 38 seconds at a natural pace",
        "Uses trend verbs: rose sharply, tripled, steady increases, remained lowest",
      ],
    },
    scoring: [
      "Content: rewards accurate key features, not the number of features",
      "Oral Fluency: dead air after 20 seconds is the most common score killer",
      "Pronunciation: numbers and country or category names must stay clear",
    ],
    mistakes: [
      "Listing every data point until time runs out mid-sentence",
      "Guessing values that are not shown on the image",
      "Writing full sentences as lecture notes and then losing the audio thread",
    ],
    drills: [
      "Describe three different image types with the same four-slot template",
      "Note a 90-second lecture using symbols only, then retell from those symbols",
      "Record yourself and check that speech continues past the 35-second mark",
    ],
    practiceRoute: "/pte/speaking",
    quiz: [
      {
        question: "What is the main benefit of using a fixed template for Describe Image?",
        options: [
          "It guarantees a perfect content score",
          "It protects fluency by removing planning pressure",
          "It shortens the response to 20 seconds",
          "It replaces the need to look at the image",
        ],
        answer: 1,
        explanation: "The template gives you a structure to fill, which prevents hesitation and dead air.",
      },
      {
        question: "Which slot should come first in the template?",
        options: ["A conclusion", "The topic statement", "The smallest detail", "Your personal opinion"],
        answer: 1,
        explanation: "Naming the topic orients the scorer and buys thinking time for the headline fact.",
      },
      {
        question: "How many supporting details are usually enough in a 40-second response?",
        options: ["Two", "Six", "Ten", "As many as you can list"],
        answer: 0,
        explanation: "Two well-described details fit the time window and score better than a rushed list.",
      },
      {
        question: "The best note-taking method for Retell Lecture is:",
        options: [
          "Full sentences",
          "Symbols, arrows and first letters",
          "No notes at all",
          "Copying the slide text word for word",
        ],
        answer: 1,
        explanation: "Symbol notes are fast enough to keep up with the audio while still triggering recall.",
      },
      {
        question: "Stopping at second 20 with silence until the timer ends will mostly damage:",
        options: ["Grammar", "Oral Fluency", "Spelling", "Vocabulary range"],
        answer: 1,
        explanation: "Long silence inside the response window is directly penalised by the fluency rubric.",
      },
    ],
  },

  /* ============================ WRITING ============================ */
  {
    id: "pl-wr-1",
    skill: "writing",
    title: "Summarize Written Text: the one-sentence rule",
    taskTypes: "Summarize Written Text",
    targetBand: "50 - 79+",
    minutes: 12,
    overview:
      "You must compress a passage into a single sentence of 5-75 words in 10 minutes. Form is scored first: two sentences, or a missing full stop, can reduce the whole item to zero regardless of quality.",
    objectives: [
      "Produce one grammatical sentence between 30 and 45 words",
      "Join main ideas with coordination and subordination instead of full stops",
      "Check form, spelling and capitalisation before submitting",
    ],
    steps: [
      { title: "1. Find the main claim", detail: "Usually the first or last sentence of the passage. Mark it." },
      { title: "2. Find two supports", detail: "Reasons, causes, results or contrasts. Ignore examples, names and statistics unless the passage is built on them." },
      { title: "3. Use a joining frame", detail: "'Although X, Y, because Z' or 'X, which Y, has led to Z'. Frames guarantee one sentence." },
      { title: "4. Keep length in the safe zone", detail: "Aim for 30-45 words: long enough to cover content, short enough to control grammar." },
      { title: "5. Final form check", detail: "One capital letter at the start, one full stop at the end, no other full stop anywhere." },
    ],
    example: {
      prompt: "A passage arguing that remote work raises productivity for focused tasks but weakens team innovation and mentoring of junior staff.",
      model:
        "Although remote work can raise individual productivity on focused tasks by removing office interruptions, it also weakens collaborative innovation and reduces the informal mentoring that junior employees rely on, which is why many organisations now prefer hybrid arrangements.",
      notes: [
        "43 words, one sentence, one full stop",
        "Although ... , it also ... , which is why ... links three ideas without a break",
        "No examples or statistics copied from the passage",
      ],
    },
    scoring: [
      "Form: one sentence, 5-75 words, or the item scores zero",
      "Content: the main claim plus the key supporting relationship",
      "Grammar and Vocabulary: accurate complex structure and paraphrasing",
    ],
    mistakes: [
      "Writing two sentences, which zeroes the form score",
      "Copying a whole sentence from the passage with no paraphrase",
      "Producing a 70-word sentence that loses grammatical control",
    ],
    drills: [
      "Rewrite three passages using only the frame 'Although X, Y, because Z'",
      "Take a summary you wrote and cut it from 60 words to 40 without losing content",
      "Practise a 60-second form check: capital, full stop, word count",
    ],
    practiceRoute: "/pte/writing",
    quiz: [
      {
        question: "What is the permitted length for Summarize Written Text?",
        options: ["5-75 words", "50-70 words", "200-300 words", "Exactly 40 words"],
        answer: 0,
        explanation: "The task requires a single sentence of 5 to 75 words.",
      },
      {
        question: "Writing two sentences instead of one will:",
        options: ["Lose one content mark", "Reduce the form score to zero", "Have no effect", "Improve grammar range"],
        answer: 1,
        explanation: "Form is a pass/fail criterion: more than one sentence scores zero for form.",
      },
      {
        question: "Which frame reliably keeps your answer to one sentence?",
        options: [
          "First ... Second ... Finally ...",
          "Although X, Y, because Z",
          "In conclusion. Therefore.",
          "X. However, Y.",
        ],
        answer: 1,
        explanation: "Subordination with although and because joins ideas without any sentence break.",
      },
      {
        question: "The safest target length for control and content is:",
        options: ["10-15 words", "30-45 words", "60-75 words", "Over 75 words"],
        answer: 1,
        explanation: "30-45 words covers the main idea and supports while remaining grammatically controllable.",
      },
      {
        question: "Which detail should usually be left out of the summary?",
        options: ["The main claim", "The key contrast", "Individual examples and statistics", "The causal relationship"],
        answer: 2,
        explanation: "Examples and figures are supporting detail; the summary needs the main claim and its key relationships.",
      },
    ],
  },
  {
    id: "pl-wr-2",
    skill: "writing",
    title: "Essay: the 5-paragraph 250-word machine",
    taskTypes: "Write Essay",
    targetBand: "65 - 79+",
    minutes: 16,
    overview:
      "You have 20 minutes for a 200-300 word essay. The scoring engine rewards a clear position, developed paragraphs, accurate grammar and academic vocabulary. A pre-learned structure lets you spend your thinking time on ideas rather than layout.",
    objectives: [
      "Identify the prompt type: opinion, discussion, problem-solution or advantage-disadvantage",
      "Produce a five-paragraph essay of 240-280 words within 20 minutes",
      "Use topic sentences, one developed example per body paragraph and a paraphrased conclusion",
    ],
    steps: [
      { title: "1. Classify the prompt (1 minute)", detail: "Do you agree? = opinion. Discuss both views = discussion. What problems and solutions = problem-solution." },
      { title: "2. Plan two body ideas (2 minutes)", detail: "Write only two keywords per body paragraph. Two developed reasons beat four thin ones." },
      { title: "3. Introduction (3 sentences)", detail: "Paraphrase the prompt, note the debate, state your position clearly." },
      { title: "4. Body paragraphs (4-5 sentences each)", detail: "Topic sentence, explanation, concrete example, mini conclusion linking back to the position." },
      { title: "5. Conclusion and check (3 minutes)", detail: "Restate the position in new words, add one implication, then check word count, spelling and paragraph breaks." },
    ],
    example: {
      prompt: "Some people believe university education should be free for all students. To what extent do you agree?",
      model:
        "Introduction: paraphrase + position (I largely agree, with one condition).\nBody 1: Access - free tuition removes financial barriers, widening the talent pool; example: Nordic systems with high graduate rates.\nBody 2: Return on public investment - graduates pay higher taxes and staff essential services; example: publicly funded medical training.\nBody 3 (concession): Unlimited funding strains budgets, so means-tested support may be fairer.\nConclusion: restate position + implication for national skills policy.",
      notes: [
        "Each body paragraph contains one idea, one explanation, one example",
        "The concession paragraph raises Grammar and Development scores",
        "Target 240-280 words, comfortably inside the 200-300 range",
      ],
    },
    scoring: [
      "Content and Development: a clear position developed with reasons and examples",
      "Form: 200-300 words; outside the range costs marks heavily",
      "Grammar, Vocabulary, Spelling and Linguistic Range are all scored separately",
    ],
    mistakes: [
      "Listing four undeveloped reasons instead of developing two",
      "Memorised template phrases with no link to the actual prompt",
      "Running to 320 words and leaving no time to check spelling",
    ],
    drills: [
      "Write introductions only for five different prompts in 15 minutes",
      "Expand one keyword into a full body paragraph in 5 minutes",
      "Take an old essay and replace five basic words with academic alternatives",
    ],
    practiceRoute: "/pte/writing",
    quiz: [
      {
        question: "What is the required word range for the PTE essay?",
        options: ["100-150", "200-300", "300-400", "No limit"],
        answer: 1,
        explanation: "The essay must be between 200 and 300 words; outside this range the form score drops sharply.",
      },
      {
        question: "How many developed body ideas suit a 20-minute essay best?",
        options: ["One", "Two", "Four", "Six"],
        answer: 1,
        explanation: "Two well-developed ideas allow explanation plus example, which is what the development criterion rewards.",
      },
      {
        question: "A body paragraph is strongest when it contains:",
        options: [
          "A list of unrelated facts",
          "Topic sentence, explanation, example, mini conclusion",
          "Only a rhetorical question",
          "Three separate opinions",
        ],
        answer: 1,
        explanation: "That four-move pattern shows development, which is scored independently of content.",
      },
      {
        question: "The introduction should end with:",
        options: ["An example", "A clear statement of your position", "A statistic", "A question"],
        answer: 1,
        explanation: "A stated position lets the rest of the essay demonstrate consistent argument.",
      },
      {
        question: "Why is a memorised template risky if it is not adapted?",
        options: [
          "Templates are banned",
          "Content that does not address the prompt loses content marks",
          "It makes the essay too short",
          "Spelling is scored lower",
        ],
        answer: 1,
        explanation: "Content is scored against the actual prompt, so generic sentences add words but no credit.",
      },
    ],
  },
  {
    id: "pl-wr-3",
    skill: "writing",
    title: "Spelling, grammar range and the two-minute proofread",
    taskTypes: "Write Essay · Summarize Written Text",
    targetBand: "65 - 79+",
    minutes: 10,
    overview:
      "Spelling, grammar and vocabulary are scored as separate traits in PTE Writing, so a well-argued essay can still lose several points to avoidable slips. A fixed proofreading routine recovers those points in about two minutes.",
    objectives: [
      "Apply one consistent spelling convention throughout a response",
      "Use three reliable complex structures without grammar errors",
      "Run a four-pass proofread in under two minutes",
    ],
    steps: [
      { title: "1. Pick one convention", detail: "British or American spelling is both accepted, but do not mix organise and organization in the same essay." },
      { title: "2. Use safe complex structures", detail: "Relative clauses (which/that), concessive clauses (although), and cause clauses (because/so that). These raise range with low risk." },
      { title: "3. Pass 1 - endings", detail: "Check third-person s, plural s, and past tense -ed on every verb." },
      { title: "4. Pass 2 - articles and agreement", detail: "Check a/an/the and that each subject matches its verb." },
      { title: "5. Pass 3 and 4 - spelling and form", detail: "Scan for your most common misspellings, then confirm word count, paragraph breaks and final punctuation." },
    ],
    example: {
      prompt: "Weak sentence: Many student thinks that technology have improve education, becuase it give more access to informations.",
      model:
        "Corrected: Many students think that technology has improved education because it gives greater access to information.",
      notes: [
        "student → students (plural), thinks → think (agreement)",
        "have improve → has improved (tense and form)",
        "becuase → because (spelling); informations → information (uncountable)",
      ],
    },
    scoring: [
      "Spelling is a separate trait: repeated errors lower it independently of content",
      "Grammar rewards accurate complex sentences, not merely long sentences",
      "Vocabulary rewards precise academic word choice and collocation",
    ],
    mistakes: [
      "Mixing British and American spelling in one response",
      "Attempting rare structures that collapse into errors",
      "Submitting with zero proofreading because time was spent writing more words",
    ],
    drills: [
      "Correct ten deliberately faulty sentences focusing on agreement and articles",
      "Rewrite five simple sentences as complex ones using although, which and because",
      "Time a two-minute four-pass proofread on your last essay",
    ],
    practiceRoute: "/pte/writing",
    quiz: [
      {
        question: "Which spelling approach is safest in PTE Writing?",
        options: [
          "Mix British and American forms freely",
          "Choose one convention and stay consistent",
          "Always use American only",
          "Avoid long words entirely",
        ],
        answer: 1,
        explanation: "Both conventions are accepted, but inconsistency within one response is penalised.",
      },
      {
        question: "Which sentence is grammatically correct?",
        options: [
          "Many students thinks technology have improved education.",
          "Many students think technology has improved education.",
          "Many student think technology has improve education.",
          "Many students thinking technology improved education.",
        ],
        answer: 1,
        explanation: "Plural subject with base verb think, and singular technology with has improved.",
      },
      {
        question: "\"Information\" in academic English is:",
        options: ["Countable, so informations is correct", "Uncountable, so information has no plural", "Always plural", "Used with a/an"],
        answer: 1,
        explanation: "Information is uncountable; the plural form is a common and visible error.",
      },
      {
        question: "Which structure raises grammar range with the lowest risk?",
        options: ["Inverted conditionals", "Relative clauses with which or that", "Cleft sentences with it was not until", "Subjunctive were clauses"],
        answer: 1,
        explanation: "Relative clauses are easy to control while still counting as complex structure.",
      },
      {
        question: "How much time should a proofread take in a 20-minute essay?",
        options: ["Zero, use every minute writing", "About two minutes", "Ten minutes", "Only if you finish early"],
        answer: 1,
        explanation: "Two minutes is enough for a structured four-pass check and recovers separately scored marks.",
      },
    ],
  },

  /* ============================ READING ============================ */
  {
    id: "pl-rd-1",
    skill: "reading",
    title: "Fill in the Blanks: collocation and grammar signals",
    taskTypes: "Reading Fill in the Blanks · R&W Fill in the Blanks",
    targetBand: "50 - 79+",
    minutes: 12,
    overview:
      "Both blank tasks are decided by two things: which word normally partners the surrounding words (collocation) and which grammatical form the slot demands. Reading the whole sentence before choosing is faster than testing every option.",
    objectives: [
      "Predict the part of speech required by each blank before looking at options",
      "Use collocation partners to eliminate two options immediately",
      "Manage time so each blank takes under 40 seconds",
    ],
    steps: [
      { title: "1. Read the full sentence first", detail: "Meaning across the clause boundary usually decides the answer, not the two words next to the gap." },
      { title: "2. Name the missing part of speech", detail: "After the or a comes a noun; after is or was often a participle or adjective; before a noun expect an adjective." },
      { title: "3. Look for collocation partners", detail: "carry out research, play a role, pose a risk, draw a conclusion. If an option does not collocate, drop it." },
      { title: "4. Check the connector logic", detail: "however, therefore, despite and moreover tell you whether the blank continues or reverses the idea." },
      { title: "5. Answer every blank", detail: "There is no penalty for a wrong guess, and partial credit applies across blanks in one item." },
    ],
    example: {
      prompt: "Researchers ______ out a longitudinal study, ______ the long-term effects of screen time on adolescent sleep.",
      model: "Answers: carried (collocation: carry out a study) / examining (participle clause describing the study).",
      notes: [
        "Blank 1 is fixed by the collocation carry out, not by meaning alone",
        "Blank 2 follows a comma with no subject, so an -ing participle fits",
        "Options such as made or did break the standard academic collocation",
      ],
    },
    scoring: [
      "Partial credit: each correct blank earns marks, so never leave gaps empty",
      "Reading Fill in the Blanks contributes only to Reading",
      "Reading & Writing Fill in the Blanks contributes to both Reading and Writing",
    ],
    mistakes: [
      "Reading only the words immediately around the gap",
      "Choosing a word that fits meaning but breaks the grammatical form",
      "Spending three minutes on one blank and running out of Reading time",
    ],
    drills: [
      "List 20 academic verb-noun collocations and test yourself in both directions",
      "Cover the options and predict the part of speech for ten blanks",
      "Do a timed set with a 40-second-per-blank limit",
    ],
    practiceRoute: "/pte/reading",
    quiz: [
      {
        question: "Which word completes the academic collocation \"______ out research\"?",
        options: ["make", "carry", "take", "give"],
        answer: 1,
        explanation: "Carry out research is the standard academic collocation.",
      },
      {
        question: "Should you leave a blank empty if you are unsure?",
        options: ["Yes, wrong answers lose marks", "No, there is no penalty and partial credit applies", "Only in the last item", "Only if two options look equal"],
        answer: 1,
        explanation: "Blanks are scored with partial credit and no negative marking, so always guess.",
      },
      {
        question: "A blank directly after \"the\" most likely needs:",
        options: ["A verb in past tense", "A noun or noun phrase", "A conjunction", "An adverb of frequency"],
        answer: 1,
        explanation: "Determiners such as the are followed by nouns or by adjective plus noun.",
      },
      {
        question: "The connector \"despite\" signals that the blank continues which relationship?",
        options: ["Contrast", "Addition", "Cause", "Sequence"],
        answer: 0,
        explanation: "Despite introduces a contrast, so the surrounding ideas must oppose each other.",
      },
      {
        question: "Which Fill in the Blanks task also affects your Writing score?",
        options: ["Reading Fill in the Blanks", "Reading & Writing Fill in the Blanks", "Neither", "Both equally"],
        answer: 1,
        explanation: "The Reading & Writing variant is an integrated task contributing to both scores.",
      },
    ],
  },
  {
    id: "pl-rd-2",
    skill: "reading",
    title: "Re-order Paragraphs: finding the anchor",
    taskTypes: "Re-order Paragraphs",
    targetBand: "65 - 79+",
    minutes: 12,
    overview:
      "Re-order Paragraphs is scored on adjacent pairs, so getting two boxes correctly next to each other already earns marks. The reliable method is to find the opening paragraph first, then chain the rest using reference words.",
    objectives: [
      "Identify the anchor paragraph using full nouns and absence of reference words",
      "Chain paragraphs using pronouns, demonstratives and linkers",
      "Secure adjacent-pair marks even when the full order is uncertain",
    ],
    steps: [
      { title: "1. Find the anchor", detail: "The first paragraph introduces full names and concepts with no this, these, such or however." },
      { title: "2. Follow the reference chain", detail: "A paragraph starting with this process or these findings must follow the paragraph that named the process or findings." },
      { title: "3. Use time and logic markers", detail: "later, subsequently, as a result, in contrast show sequence and cause." },
      { title: "4. Place the closing paragraph", detail: "Conclusions, implications and recommendations belong last." },
      { title: "5. Lock in the safe pairs", detail: "If you are unsure about the middle, keep the pairs you are confident about adjacent; each correct pair still scores." },
    ],
    example: {
      prompt: "Four paragraphs about a study on urban tree cover.",
      model:
        "Order: (A) introduces the study and the term urban canopy → (C) explains the method used in that study → (B) reports these results → (D) discusses the implications for city planning.",
      notes: [
        "A is the anchor: full noun phrases, no back-reference",
        "C begins 'To measure this canopy', which points back to A",
        "B begins 'These results', which must follow the method paragraph",
        "D contains 'Overall, planners should', a typical closing move",
      ],
    },
    scoring: [
      "Scored per correct adjacent pair, not on the whole sequence",
      "Contributes to the Reading score only",
      "No negative marking for an incorrect order",
    ],
    mistakes: [
      "Starting from the paragraph that looks most interesting rather than the anchor",
      "Ignoring reference words such as this, these and such",
      "Rearranging everything at the last minute and breaking pairs that were already correct",
    ],
    drills: [
      "Take five items and only identify the anchor paragraph, checking accuracy",
      "Highlight every reference word before ordering",
      "Time yourself to two minutes per item",
    ],
    practiceRoute: "/pte/reading",
    quiz: [
      {
        question: "Re-order Paragraphs is scored on:",
        options: ["The entire sequence only", "Each correct adjacent pair", "The first paragraph only", "Total words moved"],
        answer: 1,
        explanation: "Marks are awarded for every correctly adjacent pair, so partial order still scores.",
      },
      {
        question: "Which feature identifies the opening paragraph?",
        options: [
          "It starts with However",
          "It introduces full nouns with no back-reference",
          "It contains a conclusion",
          "It is the shortest",
        ],
        answer: 1,
        explanation: "The anchor must be understandable alone, so it names concepts in full without this or these.",
      },
      {
        question: "A paragraph beginning \"These findings suggest\" must come after:",
        options: [
          "The conclusion",
          "The paragraph that reported findings",
          "The introduction only",
          "Any paragraph with a number in it",
        ],
        answer: 1,
        explanation: "These refers back, so the referenced findings must already have appeared.",
      },
      {
        question: "Which linker most often signals a later paragraph?",
        options: ["Firstly", "Consequently", "In this report", "For example"],
        answer: 1,
        explanation: "Consequently marks a result, which depends on earlier information.",
      },
      {
        question: "You are unsure of the middle order. Best strategy?",
        options: [
          "Randomise everything",
          "Keep confident pairs adjacent and guess the rest",
          "Leave the item blank",
          "Reverse the whole order",
        ],
        answer: 1,
        explanation: "Since scoring is pair-based, protecting confident pairs preserves marks.",
      },
    ],
  },
  {
    id: "pl-rd-3",
    skill: "reading",
    title: "Multiple Choice and Highlight Incorrect Words",
    taskTypes: "Multiple Choice (single & multiple) · Highlight Incorrect Words",
    targetBand: "50 - 79+",
    minutes: 12,
    overview:
      "Multiple-choice multiple-answer items carry negative marking, and Highlight Incorrect Words demands reading and listening at the same time. Both reward disciplined restraint: select only what you can justify.",
    objectives: [
      "Apply negative-marking logic to multiple-answer items",
      "Detect paraphrase-based distractors in single-answer items",
      "Track audio against text and mark mismatches without falling behind",
    ],
    steps: [
      { title: "1. Read the question stem twice", detail: "Note whether it asks for the main idea, the writer's tone, or a specific detail. Each type has different distractors." },
      { title: "2. Justify with a line of text", detail: "Choose an option only if you can point to the words that support it. Otherwise leave it." },
      { title: "3. Respect negative marking", detail: "In multiple-answer items each wrong selection cancels a correct one, so two confident answers beat four hopeful ones." },
      { title: "4. Highlight Incorrect Words: follow with your eyes", detail: "Move your eyes along the text at the speaker's pace and click the instant a word does not match." },
      { title: "5. Never re-scan backwards", detail: "The audio does not stop. If you miss one word, stay with the speaker instead of hunting for it." },
    ],
    example: {
      prompt: "Text: 'The committee rejected the proposal because the funding was insufficient.' Audio: 'The committee accepted the proposal because the funding was insufficient.'",
      model: "Highlight: accepted (the audio contradicts the printed word rejected).",
      notes: [
        "Only one word differs; the rest of the sentence is identical",
        "Clicking extra words costs marks through negative marking",
        "Meaning-level mismatches like accept/reject are the most common trap",
      ],
    },
    scoring: [
      "Multiple-choice single answer: no negative marking, so always answer",
      "Multiple-choice multiple answers: negative marking, select conservatively",
      "Highlight Incorrect Words: each wrong click subtracts from correct clicks",
    ],
    mistakes: [
      "Selecting every plausible option in multiple-answer items",
      "Choosing an option because it repeats words from the text without matching meaning",
      "Losing the audio line in Highlight Incorrect Words after one missed word",
    ],
    drills: [
      "Do ten multiple-answer items and record how negative marking changes your score",
      "For each wrong answer, write the exact line of text that disproves it",
      "Practise Highlight Incorrect Words with the audio at normal speed only",
    ],
    practiceRoute: "/pte/reading",
    quiz: [
      {
        question: "Which task type has negative marking?",
        options: [
          "Multiple choice, single answer",
          "Multiple choice, multiple answers",
          "Re-order Paragraphs",
          "Reading Fill in the Blanks",
        ],
        answer: 1,
        explanation: "Multiple-answer items subtract marks for incorrect selections.",
      },
      {
        question: "In a single-answer multiple choice item you should:",
        options: ["Leave it blank if unsure", "Always answer, since there is no penalty", "Select two options", "Answer only main-idea questions"],
        answer: 1,
        explanation: "Single-answer items have no negative marking, so a guess is free.",
      },
      {
        question: "A distractor that repeats several words from the passage is often:",
        options: ["Always correct", "A word-matching trap with the wrong meaning", "Grammatically wrong", "The main idea"],
        answer: 1,
        explanation: "Word overlap without meaning match is the classic PTE distractor design.",
      },
      {
        question: "In Highlight Incorrect Words, missing one word should be followed by:",
        options: [
          "Scrolling back to find it",
          "Staying with the speaker's current position",
          "Restarting the audio",
          "Clicking the nearest word anyway",
        ],
        answer: 1,
        explanation: "The audio continues, so re-scanning backwards causes further losses.",
      },
      {
        question: "How many options should you select in a multiple-answer item when you are confident about two?",
        options: ["Two", "All of them", "Four", "None"],
        answer: 0,
        explanation: "With negative marking, only justified selections should be made.",
      },
    ],
  },

  /* ============================ LISTENING ============================ */
  {
    id: "pl-ls-1",
    skill: "listening",
    title: "Write from Dictation: the highest-value listening task",
    taskTypes: "Write from Dictation",
    targetBand: "50 - 79+",
    minutes: 12,
    overview:
      "Write from Dictation feeds both Listening and Writing and is scored word by word, which makes it the best return on practice time in the whole test. The technique is a fast skeleton note followed by a controlled reconstruction.",
    objectives: [
      "Capture a first-letter skeleton of a 9-12 word sentence on one hearing",
      "Reconstruct the sentence with correct spelling and word forms",
      "Secure partial credit when one or two words are lost",
    ],
    steps: [
      { title: "1. Write a skeleton, not words", detail: "Note the first letters and any number: 'T lct wl b hld in t mn aud tmrw'." },
      { title: "2. Type immediately", detail: "Working memory fades in seconds; convert the skeleton into full words before it disappears." },
      { title: "3. Restore grammar", detail: "Add articles, plural s and past tense that your skeleton dropped. These are scored words too." },
      { title: "4. Check spelling of academic words", detail: "Misspelled words score zero, so prefer a correctly spelled near-synonym only if you cannot spell the original." },
      { title: "5. Keep every word you heard", detail: "Scoring is per correct word, so an incomplete but accurate sentence still earns most of the marks." },
    ],
    example: {
      prompt: "Audio: \"The assignment deadline has been extended until the end of next week.\"",
      model: "Skeleton: 'T assgn dline hs bn extd until t end o nxt wk' → typed: The assignment deadline has been extended until the end of next week.",
      notes: [
        "12 words, every one scored separately",
        "has been extended must keep the full passive form",
        "Correct spelling of assignment and deadline is essential",
      ],
    },
    scoring: [
      "Scored per correct word, so partial answers still gain marks",
      "Contributes to both Listening and Writing",
      "Spelling errors make a word count as incorrect",
    ],
    mistakes: [
      "Trying to write full words during the audio and falling behind",
      "Leaving out small words such as the, a and been",
      "Rewriting the sentence in your own words instead of reproducing it",
    ],
    drills: [
      "Do ten dictations using a first-letter skeleton only",
      "Rebuild yesterday's dictation sentences from memory and check spelling",
      "Drill the 50 most common academic nouns for spelling accuracy",
    ],
    practiceRoute: "/pte/listening",
    quiz: [
      {
        question: "Write from Dictation contributes to which scores?",
        options: ["Listening only", "Listening and Writing", "Speaking and Listening", "Reading and Writing"],
        answer: 1,
        explanation: "It is an integrated task feeding both the Listening and the Writing score.",
      },
      {
        question: "How is Write from Dictation scored?",
        options: ["All or nothing", "Per correct word", "Per sentence", "On meaning only"],
        answer: 1,
        explanation: "Each correctly spelled word in the right place earns credit, so partial answers still score.",
      },
      {
        question: "The best note-taking method during the audio is:",
        options: ["Full words", "First letters and numbers", "No notes", "Phonetic symbols"],
        answer: 1,
        explanation: "A first-letter skeleton is fast enough to keep pace with the speaker.",
      },
      {
        question: "A misspelled word in dictation is:",
        options: ["Counted as correct", "Counted as incorrect", "Worth half a mark", "Ignored"],
        answer: 1,
        explanation: "Spelling accuracy is required for a word to count.",
      },
      {
        question: "Which words are most commonly and most costly to omit?",
        options: ["Long academic nouns", "Small function words such as the, a, been", "Numbers", "Adjectives"],
        answer: 1,
        explanation: "Function words are easy to drop but are scored exactly like content words.",
      },
    ],
  },
  {
    id: "pl-ls-2",
    skill: "listening",
    title: "Summarize Spoken Text: note frames for 60 seconds of audio",
    taskTypes: "Summarize Spoken Text",
    targetBand: "65 - 79+",
    minutes: 14,
    overview:
      "You hear a 60-90 second lecture once and write 50-70 words in 10 minutes. The task rewards a summary that keeps the lecture's structure: main claim, two supports, conclusion. A prepared note frame makes this possible on one hearing.",
    objectives: [
      "Take structured notes in four boxes while listening",
      "Write 50-70 words containing the main idea and two supports",
      "Finish with two minutes to spare for a form and spelling check",
    ],
    steps: [
      { title: "1. Draw the frame before the audio", detail: "Four boxes: TOPIC, POINT 1, POINT 2, CONCLUSION. Fill them as you listen." },
      { title: "2. Catch the signposts", detail: "'Today I want to look at', 'the first reason', 'however', 'so overall' mark exactly where each box begins." },
      { title: "3. Write 3-4 sentences", detail: "One topic sentence, two support sentences, one closing sentence lands naturally inside 50-70 words." },
      { title: "4. Paraphrase, do not quote", detail: "Vocabulary is scored, so change at least the verbs and adjectives." },
      { title: "5. Check word count and form", detail: "Under 40 or over 100 words is heavily penalised; confirm capitals and full stops." },
    ],
    example: {
      prompt: "Lecture: sleep and memory consolidation - deep sleep reorganises information, and students who sleep after studying outperform those who stay awake.",
      model:
        "The lecturer explained that sleep is essential for memory consolidation. During deep sleep the brain reorganises information gathered during the day and transfers short-term memories into long-term storage. Research comparing students showed that those who slept after studying performed better in tests than those who stayed awake all night. Sleep is therefore part of effective study.",
      notes: [
        "62 words, four sentences, matching the four note boxes",
        "Paraphrases consolidation, transfers, reorganises rather than copying",
        "Ends with the lecturer's implication rather than a new idea",
      ],
    },
    scoring: [
      "Form: 50-70 words is the target range",
      "Content: main idea plus supporting points from the lecture",
      "Grammar, Vocabulary and Spelling are each scored separately",
    ],
    mistakes: [
      "Notes that copy full sentences and lose the rest of the audio",
      "Adding your own opinion, which is not in the lecture",
      "Writing 100+ words and losing form marks",
    ],
    drills: [
      "Fill the four-box frame for five lectures without writing a summary",
      "Write summaries from your notes only, never replaying the audio",
      "Cut a 90-word draft down to 65 words while keeping all key points",
    ],
    practiceRoute: "/pte/listening",
    quiz: [
      {
        question: "What is the target word range for Summarize Spoken Text?",
        options: ["5-75", "50-70", "200-300", "100-150"],
        answer: 1,
        explanation: "The task asks for a 50-70 word summary.",
      },
      {
        question: "Which note structure best fits this task?",
        options: [
          "A single long paragraph",
          "Four boxes: topic, point 1, point 2, conclusion",
          "A word-for-word transcript",
          "Only numbers and dates",
        ],
        answer: 1,
        explanation: "The four-box frame mirrors the lecture structure and the required summary shape.",
      },
      {
        question: "Adding your own opinion to the summary will:",
        options: ["Raise the content score", "Lose content marks because it is not in the lecture", "Improve vocabulary", "Count as a conclusion"],
        answer: 1,
        explanation: "Content is judged against the lecture, so unsupported additions do not earn credit.",
      },
      {
        question: "Which phrase signals a new support point in a lecture?",
        options: ["Today I want to look at", "The first reason is", "In summary", "Thank you"],
        answer: 1,
        explanation: "The first reason is introduces a supporting point, which belongs in box two.",
      },
      {
        question: "Why should you paraphrase rather than quote the lecture?",
        options: [
          "Quoting is not allowed",
          "Vocabulary is a separately scored trait",
          "It saves time",
          "Quotes break the word limit",
        ],
        answer: 1,
        explanation: "Paraphrasing demonstrates vocabulary range, which is scored independently of content.",
      },
    ],
  },
  {
    id: "pl-ls-3",
    skill: "listening",
    title: "Listening accuracy set: fill blanks, missing word and correct summary",
    taskTypes: "Listening Fill in the Blanks · Select Missing Word · Highlight Correct Summary",
    targetBand: "50 - 79+",
    minutes: 12,
    overview:
      "The short Listening items are decided by prediction. If you know what kind of word or ending the audio is heading towards, you only need to confirm it rather than decode it under pressure.",
    objectives: [
      "Predict the grammatical form of each listening blank before the audio plays",
      "Use tone and final linkers to choose the missing word",
      "Reject summary options that overstate or contradict the audio",
    ],
    steps: [
      { title: "1. Preview the transcript gaps", detail: "In Listening Fill in the Blanks you see the text first. Predict the part of speech and likely word for each gap." },
      { title: "2. Type the exact word you hear", detail: "Spelling counts. Do not substitute a synonym." },
      { title: "3. Select Missing Word: track the argument", detail: "The final missing word completes the speaker's conclusion, so follow whether the tone is positive, negative or cautious." },
      { title: "4. Highlight Correct Summary: eliminate extremes", detail: "Options with all, never, proves or completely usually overstate what the audio said." },
      { title: "5. Match scope, not keywords", detail: "The correct summary covers the whole recording, not just its opening sentence." },
    ],
    example: {
      prompt: "Audio ends: 'So although the early results looked promising, we must treat these conclusions as strictly ...'",
      model: "Missing word: provisional (or preliminary) - the although clause plus must treat signals caution, not certainty.",
      notes: [
        "although + promising sets up a contrast with a cautious ending",
        "Options such as proven or final contradict the hedging",
        "Predicting tone is faster than decoding the final syllable",
      ],
    },
    scoring: [
      "Listening Fill in the Blanks: per correct, correctly spelled word",
      "Select Missing Word and Highlight Correct Summary: single answer, no negative marking",
      "All three contribute to the Listening score only",
    ],
    mistakes: [
      "Writing a synonym instead of the exact word heard",
      "Choosing a summary option because it repeats words from the audio",
      "Ignoring hedging language such as may, tends to and suggests",
    ],
    drills: [
      "Predict every blank's part of speech before playing the audio, then check",
      "Do five Select Missing Word items and write down the tone of each ending",
      "For each wrong summary option, name the exact overstatement",
    ],
    practiceRoute: "/pte/listening",
    quiz: [
      {
        question: "In Listening Fill in the Blanks you should type:",
        options: ["Any synonym", "The exact word you hear, correctly spelled", "The first letter only", "A paraphrase"],
        answer: 1,
        explanation: "The task checks exact recognition and spelling of the word heard.",
      },
      {
        question: "An audio ending with \"although early results looked promising, conclusions remain ...\" most likely ends with:",
        options: ["proven", "provisional", "final", "certain"],
        answer: 1,
        explanation: "The although contrast plus hedging signals a cautious word such as provisional.",
      },
      {
        question: "Summary options containing \"always\" or \"proves\" are usually wrong because they:",
        options: ["Are too short", "Overstate what an academic speaker claims", "Use difficult vocabulary", "Repeat the topic"],
        answer: 1,
        explanation: "Academic lectures hedge; absolute claims rarely match the recording.",
      },
      {
        question: "Which of these Listening tasks has negative marking?",
        options: ["Select Missing Word", "Highlight Correct Summary", "Neither of these two", "Both of these two"],
        answer: 2,
        explanation: "Both are single-answer items with no penalty, so always answer them.",
      },
      {
        question: "The correct summary option must match:",
        options: ["The first sentence only", "The scope of the whole recording", "The longest option", "The most technical wording"],
        answer: 1,
        explanation: "Correct summaries cover the whole recording rather than one part of it.",
      },
    ],
  },
];

export const PTE_LESSON_COUNT = PTE_LESSONS.length;

export const getPteLesson = (id: string) => PTE_LESSONS.find((l) => l.id === id);

export const getPteLessonsBySkill = (skill: PteLessonSkill) =>
  PTE_LESSONS.filter((l) => l.skill === skill);

export const PTE_LESSON_QUIZ_TOTAL = PTE_LESSONS.reduce((s, l) => s + l.quiz.length, 0);
