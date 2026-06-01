/**
 * @file placementTest.ts
 * @description 40-question CEFR placement test bank (A1 → C2).
 *
 * Layout:
 *   Listening 12 | Reading 16 | Writing 7 | Speaking 5
 *
 * The shape of each item is deliberately discriminated so the renderer
 * can switch on `type` to draw a completely different interactive UI.
 *
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

export type Cefr = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
export type Skill = "listening" | "reading" | "writing" | "speaking";

export interface BaseQ {
  id: number;
  skill: Skill;
  cefr: Cefr;
  prompt: string;
}

/* ── Listening ─────────────────────────────────────────────────────── */
export interface ListenImageQ extends BaseQ {
  skill: "listening";
  type: "listen-image";              // Q1-Q4
  audioText: string;                  // spoken via SpeechSynthesis
  options: { emoji: string; label: string }[];
  correct: number;
}
export interface ListenMcqQ extends BaseQ {
  skill: "listening";
  type: "listen-mcq";                 // Q5-Q8
  audioText: string;
  options: string[];
  correct: number;
}
export interface ListenDictationQ extends BaseQ {
  skill: "listening";
  type: "listen-dictation";           // Q9-Q12
  audioText: string;                  // long monologue
  blanks: string[];                   // sequential answers
  template: string;                   // sentence with ___ markers
}

/* ── Reading ───────────────────────────────────────────────────────── */
export interface ReadMcqQ extends BaseQ {
  skill: "reading";
  type: "read-mcq";                   // Q13-Q17
  options: string[];
  correct: number;
}
export interface ReadClozeQ extends BaseQ {
  skill: "reading";
  type: "read-cloze";                 // Q18-Q22
  paragraph: string;                  // contains [[0]] [[1]] markers
  choices: string[][];
  correct: number[];
}
export interface ReadAnalyticalQ extends BaseQ {
  skill: "reading";
  type: "read-analytical";            // Q23-Q28
  passage: string;
  options: string[];
  correct: number;
}

/* ── Writing ───────────────────────────────────────────────────────── */
export interface WriteScrambleQ extends BaseQ {
  skill: "writing";
  type: "write-scramble";             // Q29-Q31
  tokens: string[];                   // shuffled
  answer: string;                     // canonical sentence
}
export interface WritePictureQ extends BaseQ {
  skill: "writing";
  type: "write-picture";              // Q32-Q34
  emoji: string;
  hint: string;
  minWords: number;
}
export interface WriteEssayQ extends BaseQ {
  skill: "writing";
  type: "write-essay";                // Q35
  minWords: number;
  maxWords: number;
}

/* ── Speaking ──────────────────────────────────────────────────────── */
export interface SpeakReadAloudQ extends BaseQ {
  skill: "speaking";
  type: "speak-read";                 // Q36-Q37
  text: string;
}
export interface SpeakReplyQ extends BaseQ {
  skill: "speaking";
  type: "speak-reply";                // Q38-Q39
  audioText: string;
  seconds: number;
}
export interface SpeakPresentQ extends BaseQ {
  skill: "speaking";
  type: "speak-present";              // Q40
  prepSeconds: number;
  recordSeconds: number;
}

export type PlacementQuestion =
  | ListenImageQ | ListenMcqQ | ListenDictationQ
  | ReadMcqQ | ReadClozeQ | ReadAnalyticalQ
  | WriteScrambleQ | WritePictureQ | WriteEssayQ
  | SpeakReadAloudQ | SpeakReplyQ | SpeakPresentQ;

export const PLACEMENT_TEST: PlacementQuestion[] = [
  /* ───── Listening 12 ───── */
  { id: 1, skill: "listening", cefr: "A1", type: "listen-image",
    prompt: "Choose the picture that matches what you hear.",
    audioText: "An apple.", correct: 0,
    options: [
      { emoji: "🍎", label: "Apple" }, { emoji: "🍌", label: "Banana" },
      { emoji: "🥕", label: "Carrot" }, { emoji: "🍇", label: "Grapes" },
    ]},
  { id: 2, skill: "listening", cefr: "A1", type: "listen-image",
    prompt: "Choose the picture that matches what you hear.",
    audioText: "A small brown dog.", correct: 2,
    options: [
      { emoji: "🐱", label: "Cat" }, { emoji: "🐰", label: "Rabbit" },
      { emoji: "🐶", label: "Dog" }, { emoji: "🐦", label: "Bird" },
    ]},
  { id: 3, skill: "listening", cefr: "A2", type: "listen-image",
    prompt: "What is the weather like today?",
    audioText: "It is raining heavily this afternoon.", correct: 1,
    options: [
      { emoji: "☀️", label: "Sunny" }, { emoji: "🌧️", label: "Rainy" },
      { emoji: "❄️", label: "Snowy" }, { emoji: "🌬️", label: "Windy" },
    ]},
  { id: 4, skill: "listening", cefr: "A2", type: "listen-image",
    prompt: "Where is the speaker going?",
    audioText: "I am taking the train to the airport now.", correct: 3,
    options: [
      { emoji: "🏫", label: "School" }, { emoji: "🏥", label: "Hospital" },
      { emoji: "🏦", label: "Bank" }, { emoji: "✈️", label: "Airport" },
    ]},

  { id: 5, skill: "listening", cefr: "B1", type: "listen-mcq",
    prompt: "What time does the meeting start?",
    audioText: "The marketing review meeting was moved from three to four thirty this afternoon.",
    options: ["3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM"], correct: 3 },
  { id: 6, skill: "listening", cefr: "B1", type: "listen-mcq",
    prompt: "Why is the speaker apologising?",
    audioText: "Sorry I'm late — there was a serious accident on the highway and traffic was completely stopped for twenty minutes.",
    options: ["He forgot the meeting", "Traffic accident delayed him", "His car broke down", "He overslept"], correct: 1 },
  { id: 7, skill: "listening", cefr: "B2", type: "listen-mcq",
    prompt: "What is the main topic of the announcement?",
    audioText: "We're upgrading the office network this Saturday, so please save your work and log out before six PM on Friday to avoid losing files.",
    options: ["A new office policy", "A scheduled network upgrade", "Hiring announcements", "A weekend party"], correct: 1 },
  { id: 8, skill: "listening", cefr: "B2", type: "listen-mcq",
    prompt: "What does the speaker recommend?",
    audioText: "Although the report is comprehensive, I would suggest tightening the conclusion and adding two more charts before sending it to the client.",
    options: ["Rewriting the entire report", "Adding charts and revising the conclusion", "Sending it as it is", "Replacing the charts"], correct: 1 },

  { id: 9, skill: "listening", cefr: "C1", type: "listen-dictation",
    prompt: "Listen and fill in the missing words.",
    audioText: "Renewable energy has become essential for sustainable development around the world.",
    template: "Renewable ___ has become ___ for sustainable ___ around the world.",
    blanks: ["energy", "essential", "development"] },
  { id: 10, skill: "listening", cefr: "C1", type: "listen-dictation",
    prompt: "Listen and fill in the missing words.",
    audioText: "Critical thinking enables learners to evaluate evidence and reach independent conclusions.",
    template: "Critical ___ enables learners to evaluate ___ and reach independent ___.",
    blanks: ["thinking", "evidence", "conclusions"] },
  { id: 11, skill: "listening", cefr: "C2", type: "listen-dictation",
    prompt: "Listen and fill in the missing words.",
    audioText: "The unprecedented advancement of artificial intelligence demands rigorous ethical frameworks worldwide.",
    template: "The unprecedented ___ of artificial intelligence demands rigorous ___ frameworks ___.",
    blanks: ["advancement", "ethical", "worldwide"] },
  { id: 12, skill: "listening", cefr: "C2", type: "listen-dictation",
    prompt: "Listen and fill in the missing words.",
    audioText: "Globalisation has irrevocably transformed traditional economies, fostering interdependence among nations.",
    template: "Globalisation has irrevocably ___ traditional ___, fostering ___ among nations.",
    blanks: ["transformed", "economies", "interdependence"] },

  /* ───── Reading 16 ───── */
  { id: 13, skill: "reading", cefr: "A1", type: "read-mcq",
    prompt: "She ___ a teacher.",
    options: ["am", "is", "are", "be"], correct: 1 },
  { id: 14, skill: "reading", cefr: "A1", type: "read-mcq",
    prompt: "I have ___ apple every morning.",
    options: ["a", "an", "the", "—"], correct: 1 },
  { id: 15, skill: "reading", cefr: "A2", type: "read-mcq",
    prompt: "They ___ to Da Nang last summer.",
    options: ["go", "going", "went", "gone"], correct: 2 },
  { id: 16, skill: "reading", cefr: "A2", type: "read-mcq",
    prompt: "There ___ many students in the library.",
    options: ["is", "are", "be", "been"], correct: 1 },
  { id: 17, skill: "reading", cefr: "A2", type: "read-mcq",
    prompt: "My brother is ___ than me.",
    options: ["tall", "taller", "tallest", "more tall"], correct: 1 },

  { id: 18, skill: "reading", cefr: "B1", type: "read-cloze",
    prompt: "Choose the best word for each blank.",
    paragraph: "Many young Vietnamese students [[0]] abroad every year in [[1]] of better education and broader [[2]].",
    choices: [["go","goes","gone"],["search","searches","searching"],["experience","experiences","experienced"]],
    correct: [0,0,1] },
  { id: 19, skill: "reading", cefr: "B1", type: "read-cloze",
    prompt: "Choose the best word for each blank.",
    paragraph: "Technology has [[0]] the way we learn, making knowledge [[1]] available to almost [[2]].",
    choices: [["changed","change","changing"],["widely","wide","wider"],["everyone","anyone","someone"]],
    correct: [0,0,0] },
  { id: 20, skill: "reading", cefr: "B2", type: "read-cloze",
    prompt: "Choose the best word for each blank.",
    paragraph: "Despite the [[0]] of social media, real human conversation remains [[1]] for building [[2]] relationships.",
    choices: [["rise","raise","arise"],["essential","essentially","essence"],["meaningful","meaning","means"]],
    correct: [0,0,0] },
  { id: 21, skill: "reading", cefr: "B2", type: "read-cloze",
    prompt: "Choose the best word for each blank.",
    paragraph: "Climate change [[0]] coastal cities to invest [[1]] in flood defences, otherwise damages will [[2]] insurance costs.",
    choices: [["forces","force","forcing"],["heavily","heavy","heavier"],["soar","sore","source"]],
    correct: [0,0,0] },
  { id: 22, skill: "reading", cefr: "B2", type: "read-cloze",
    prompt: "Choose the best word for each blank.",
    paragraph: "Remote work [[0]] flexibility but it [[1]] requires strong discipline and a [[2]] workspace at home.",
    choices: [["offers","offer","offered"],["also","too","either"],["dedicated","dedicate","dedicating"]],
    correct: [0,0,0] },

  { id: 23, skill: "reading", cefr: "C1", type: "read-analytical",
    prompt: "What is the author's main argument?",
    passage: "While many policymakers continue to champion standardised testing as an objective measure of academic ability, a growing body of research challenges this orthodoxy. Recent meta-analyses indicate that such tests disproportionately reflect socio-economic background rather than intrinsic intellectual capacity. Wealthier students access preparatory courses, private tutors, and stress-management coaching that materially inflate scores. Consequently, universities relying solely on these metrics risk entrenching inequality rather than identifying genuine talent.",
    options: [
      "Standardised tests measure intelligence accurately",
      "Wealth significantly distorts standardised test outcomes",
      "Universities should expand standardised testing programmes",
      "Coaching is unavailable to most students"], correct: 1 },
  { id: 24, skill: "reading", cefr: "C1", type: "read-analytical",
    prompt: "Which sentence best summarises the passage?",
    passage: "Urban planners increasingly recognise that green corridors are not merely aesthetic flourishes but vital infrastructure. Mature tree canopies lower ambient temperatures by up to four degrees, mitigate stormwater runoff, and contribute measurably to residents' mental wellbeing. Cities that integrate native vegetation into transport networks report reduced respiratory illness and stronger community cohesion. The economic return on each dollar invested in urban forestry consistently exceeds five-fold over a decade.",
    options: [
      "Green corridors are decorative additions to cities",
      "Urban trees damage stormwater systems",
      "Green corridors deliver measurable health, climate and economic benefits",
      "Native vegetation is too costly for most municipalities"], correct: 2 },
  { id: 25, skill: "reading", cefr: "C1", type: "read-analytical",
    prompt: "What can be inferred about AI tutoring?",
    passage: "Adaptive AI tutors promise to personalise instruction at scale, dynamically adjusting difficulty in response to each learner's performance. However, early deployments reveal that without a teacher's contextual judgement, the algorithms can mistake disengagement for mastery, accelerating students through material they have not truly internalised. The most successful pilots therefore pair AI feedback loops with deliberate human checkpoints, ensuring conceptual gaps are surfaced before they compound.",
    options: [
      "AI tutors can fully replace human teachers",
      "AI alone reliably distinguishes mastery from disengagement",
      "Combining AI with human oversight yields stronger outcomes",
      "Personalised learning is incompatible with adaptive AI"], correct: 2 },
  { id: 26, skill: "reading", cefr: "C2", type: "read-analytical",
    prompt: "What rhetorical strategy does the author primarily use?",
    passage: "Proponents of perpetual economic growth seldom acknowledge the planetary constraints that render their model untenable in the long run. Exponential expansion within a finite biosphere is not merely imprudent — it is arithmetically impossible. To insist otherwise is to confuse aspiration with feasibility, mistaking the cadence of quarterly reports for the longer rhythms of ecology. A more honest economics would treat sufficiency, not accumulation, as its central category.",
    options: [
      "Statistical illustration",
      "Logical refutation of an opposing premise",
      "Historical narrative",
      "Anecdotal storytelling"], correct: 1 },
  { id: 27, skill: "reading", cefr: "C2", type: "read-analytical",
    prompt: "Which conclusion is best supported by the passage?",
    passage: "The diffusion of generative models throughout creative industries has provoked anxieties not unlike those that greeted the printing press or the camera. Yet history suggests that each disruptive medium ultimately expands rather than contracts the field of human expression — provided practitioners adapt their craft to leverage the new affordances rather than merely resist them. The artists who flourish in such transitions are those who treat the technology as collaborator rather than competitor.",
    options: [
      "Generative AI will inevitably eliminate creative professions",
      "Historical precedent suggests that creative fields expand when artists embrace new media",
      "The printing press reduced demand for written work",
      "Resistance is the most effective response to new media"], correct: 1 },
  { id: 28, skill: "reading", cefr: "C2", type: "read-analytical",
    prompt: "What is the author's stance toward language preservation?",
    passage: "When a language dies, an entire epistemology disappears with it: a unique cartography of kinship, ecology, and metaphor accumulated over millennia. Documentation projects, however well-funded, capture only fossilised fragments. Genuine revitalisation requires that a language be spoken in homes, sung at weddings, and quarrelled over in markets. Without these everyday vernacular contexts, even the most meticulous archive becomes a museum of ghosts.",
    options: [
      "Archiving is sufficient to preserve endangered languages",
      "Living everyday use is essential for genuine language survival",
      "Language loss is intellectually inconsequential",
      "Documentation projects should be discontinued"], correct: 1 },

  /* ───── Writing 7 ───── */
  { id: 29, skill: "writing", cefr: "A1", type: "write-scramble",
    prompt: "Re-order the words to form a correct sentence.",
    tokens: ["My", "name", "is", "Linh"], answer: "My name is Linh" },
  { id: 30, skill: "writing", cefr: "A1", type: "write-scramble",
    prompt: "Re-order the words to form a correct sentence.",
    tokens: ["She", "coffee", "drinks", "every", "morning"], answer: "She drinks coffee every morning" },
  { id: 31, skill: "writing", cefr: "A2", type: "write-scramble",
    prompt: "Re-order the words to form a correct sentence.",
    tokens: ["yesterday", "to", "We", "went", "the", "cinema"], answer: "We went to the cinema yesterday" },

  { id: 32, skill: "writing", cefr: "B1", type: "write-picture",
    prompt: "Write a complete sentence describing the picture.",
    emoji: "🌧️☂️", hint: "Talk about the weather and what you take.", minWords: 6 },
  { id: 33, skill: "writing", cefr: "B1", type: "write-picture",
    prompt: "Write a complete sentence describing the picture.",
    emoji: "🍜👩‍🍳", hint: "Mention the food and who is cooking.", minWords: 7 },
  { id: 34, skill: "writing", cefr: "B2", type: "write-picture",
    prompt: "Write a complete sentence (with a linking word) describing the picture.",
    emoji: "🏫📚", hint: "Use 'because' or 'although'.", minWords: 10 },

  { id: 35, skill: "writing", cefr: "C1", type: "write-essay",
    prompt: "Some people think technology has made students lazier, while others believe it has empowered them. Discuss both views and give your own opinion. (80-120 words)",
    minWords: 80, maxWords: 120 },

  /* ───── Speaking 5 ───── */
  { id: 36, skill: "speaking", cefr: "A1", type: "speak-read",
    prompt: "Read the sentence aloud clearly.",
    text: "My family lives in a small house near the river." },
  { id: 37, skill: "speaking", cefr: "A2", type: "speak-read",
    prompt: "Read the sentence aloud clearly.",
    text: "On weekends, I usually meet my friends and play football together." },

  { id: 38, skill: "speaking", cefr: "B1", type: "speak-reply",
    prompt: "Listen to the question, then reply within 30 seconds.",
    audioText: "Can you describe your favourite hobby and explain why you enjoy it?",
    seconds: 30 },
  { id: 39, skill: "speaking", cefr: "B2", type: "speak-reply",
    prompt: "Listen to the question, then reply within 30 seconds.",
    audioText: "What are the advantages and disadvantages of studying abroad?",
    seconds: 30 },

  { id: 40, skill: "speaking", cefr: "C1", type: "speak-present",
    prompt: "Should artificial intelligence be allowed to grade student essays? Prepare for 30 seconds, then present your argument for 60 seconds.",
    prepSeconds: 30, recordSeconds: 60 },
];

export const SKILL_LABEL: Record<Skill, string> = {
  listening: "Listening", reading: "Reading", writing: "Writing", speaking: "Speaking",
};

/** Map total score (0-100) → CEFR band. */
export function inferCefr(total: number): Cefr {
  if (total >= 90) return "C2";
  if (total >= 78) return "C1";
  if (total >= 65) return "B2";
  if (total >= 50) return "B1";
  if (total >= 35) return "A2";
  return "A1";
}
