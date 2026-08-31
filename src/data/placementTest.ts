/**
 * @file placementTest.ts
 * @description 40-question CEFR placement test bank - A1 → C1.
 *
 * Difficulty design:
 *   • A1 starts at functional sentences, NOT single words (e.g. avoid "An apple.")
 *   • Listening mixes images, short dialogues, MCQs, numbers/time, and dictation
 *     from the very first questions to reflect a real entrance-test rhythm.
 *   • Ceiling is C1 so strong students are separated from the IELTS 6.5+ group.
 *
 * Layout:
 *   Listening 13 | Reading 17 | Writing 5 | Speaking 5
 *   Levels: A1 6 | A2 8 | B1 10 | B2 10 | C1 6
 *
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

export type Cefr = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
export type Skill = "listening" | "reading" | "writing" | "speaking";

/** Optional sub-domain used by the Programming bank (logic / python / sql / ai). */
export type TechDomain = "logic" | "python" | "sql" | "ai";

export interface BaseQ {
  id: number;
  skill: Skill;
  cefr: Cefr;
  prompt: string;
  /** Programming-only sub-metric category. Ignored by other subjects. */
  domain?: TechDomain;
}

/* ── Listening ─────────────────────────────────────────────────────── */
export interface ListenImageQ extends BaseQ {
  skill: "listening";
  type: "listen-image";
  audioText: string;
  options: { emoji: string; label: string }[];
  correct: number;
}
export interface ListenMcqQ extends BaseQ {
  skill: "listening";
  type: "listen-mcq";
  audioText: string;
  options: string[];
  correct: number;
}
export interface ListenDictationQ extends BaseQ {
  skill: "listening";
  type: "listen-dictation";
  audioText: string;
  blanks: string[];
  template: string;
}

/* ── Reading ───────────────────────────────────────────────────────── */
export interface ReadMcqQ extends BaseQ {
  skill: "reading";
  type: "read-mcq";
  options: string[];
  correct: number;
  code?: string;
  language?: string;
  schema?: string;
}
export interface ReadClozeQ extends BaseQ {
  skill: "reading";
  type: "read-cloze";
  paragraph: string;
  choices: string[][];
  correct: number[];
}
export interface ReadAnalyticalQ extends BaseQ {
  skill: "reading";
  type: "read-analytical";
  passage: string;
  options: string[];
  correct: number;
}

/* ── Writing ───────────────────────────────────────────────────────── */
export interface WriteScrambleQ extends BaseQ {
  skill: "writing";
  type: "write-scramble";
  tokens: string[];
  answer: string;
}
export interface WritePictureQ extends BaseQ {
  skill: "writing";
  type: "write-picture";
  emoji: string;
  hint: string;
  minWords: number;
}
export interface WriteEssayQ extends BaseQ {
  skill: "writing";
  type: "write-essay";
  minWords: number;
  maxWords: number;
}

/* ── Speaking ──────────────────────────────────────────────────────── */
export interface SpeakReadAloudQ extends BaseQ {
  skill: "speaking";
  type: "speak-read";
  text: string;
}
export interface SpeakReplyQ extends BaseQ {
  skill: "speaking";
  type: "speak-reply";
  audioText: string;
  seconds: number;
}
export interface SpeakPresentQ extends BaseQ {
  skill: "speaking";
  type: "speak-present";
  prepSeconds: number;
  recordSeconds: number;
}

export type PlacementQuestion =
  | ListenImageQ | ListenMcqQ | ListenDictationQ
  | ReadMcqQ | ReadClozeQ | ReadAnalyticalQ
  | WriteScrambleQ | WritePictureQ | WriteEssayQ
  | SpeakReadAloudQ | SpeakReplyQ | SpeakPresentQ;

/**
 * 40 items, level-balanced: A1 6 | A2 8 | B1 10 | B2 10 | C1 6.
 * Every reading item carries real context (note, message, sign, passage), so
 * no question is a bare grammar gap. Listening dialogues use speaker labels
 * that the audio engine reads with two different voices and never speaks out.
 */
export const PLACEMENT_TEST: PlacementQuestion[] = [
  /* ══════════════ A1 - 6 items ══════════════ */
  { id: 1, skill: "listening", cefr: "A1", type: "listen-image",
    prompt: "Listen to the sentence. What is the person holding?",
    audioText: "Look - the little girl is holding a red apple in her hand.",
    correct: 0,
    options: [
      { emoji: "🍎", label: "A red apple" }, { emoji: "🍌", label: "A banana" },
      { emoji: "🥪", label: "A sandwich" }, { emoji: "📕", label: "A red book" },
    ]},
  { id: 2, skill: "listening", cefr: "A1", type: "listen-mcq",
    prompt: "How old is Minh's brother?",
    audioText: "Hi, I'm Minh. I am twelve years old and my younger brother is nine.",
    options: ["7", "9", "12", "19"], correct: 1 },
  { id: 3, skill: "reading", cefr: "A1", type: "read-mcq",
    prompt: "Read the message from Linh's mother:\n\n\"Linh, your English teacher is at the door. ___ waiting for you outside.\"\n\nChoose the best word for the blank.",
    options: ["He am", "She is", "They are", "It be"], correct: 1 },
  { id: 4, skill: "reading", cefr: "A1", type: "read-mcq",
    prompt: "Read the note on the fridge:\n\n\"Breakfast is ready. Please eat ___ egg and drink your milk before school.\"\n\nChoose the best word for the blank.",
    options: ["a", "an", "the", "some"], correct: 1 },
  { id: 5, skill: "writing", cefr: "A1", type: "write-scramble",
    prompt: "You are introducing yourself to a new classmate. Re-order the words.",
    tokens: ["My", "name", "is", "Linh"], answer: "My name is Linh" },
  { id: 6, skill: "speaking", cefr: "A1", type: "speak-read",
    prompt: "Read the sentence aloud clearly.",
    text: "My family lives in a small house near the river." },

  /* ══════════════ A2 - 8 items ══════════════ */
  { id: 7, skill: "listening", cefr: "A2", type: "listen-mcq",
    prompt: "What time does the English class start tomorrow?",
    audioText: "Teacher: Just a reminder - tomorrow's English class is at quarter past eight, not at eight thirty.",
    options: ["8:00", "8:15", "8:30", "8:45"], correct: 1 },
  { id: 8, skill: "listening", cefr: "A2", type: "listen-image",
    prompt: "What is the weather like, and what does she take?",
    audioText: "It's raining outside, so Lan is taking her umbrella to school.",
    correct: 1,
    options: [
      { emoji: "☀️🕶️", label: "Sunny - sunglasses" },
      { emoji: "🌧️☂️", label: "Rainy - umbrella" },
      { emoji: "❄️🧤", label: "Snowy - gloves" },
      { emoji: "🌬️🧣", label: "Windy - scarf" },
    ]},
  { id: 9, skill: "listening", cefr: "A2", type: "listen-mcq",
    prompt: "What does the woman order?",
    audioText: "Waiter: Are you ready to order? Woman: Yes, I'll have a chicken sandwich and an orange juice, please. No coffee today.",
    options: [
      "Coffee and a sandwich",
      "Chicken sandwich and orange juice",
      "Tea and a salad",
      "Just an orange juice"], correct: 1 },
  { id: 10, skill: "reading", cefr: "A2", type: "read-mcq",
    prompt: "Read the postcard:\n\n\"Dear Ha, we ___ to Da Nang last summer and the beach was beautiful. See you soon! - Nam\"\n\nChoose the best word for the blank.",
    options: ["go", "going", "went", "gone"], correct: 2 },
  { id: 11, skill: "reading", cefr: "A2", type: "read-mcq",
    prompt: "Read the sign at the library door:\n\n\"Quiet please. There ___ many students studying inside.\"\n\nChoose the best word for the blank.",
    options: ["is", "are", "be", "been"], correct: 1 },
  { id: 12, skill: "reading", cefr: "A2", type: "read-mcq",
    prompt: "Read the chat message:\n\n\"My brother is 1.8 metres and I am only 1.6 metres, so he is ___ than me.\"\n\nChoose the best word for the blank.",
    options: ["tall", "taller", "tallest", "more tall"], correct: 1 },
  { id: 13, skill: "writing", cefr: "A2", type: "write-scramble",
    prompt: "Tell a friend what you did yesterday. Re-order the words.",
    tokens: ["yesterday", "to", "We", "went", "the", "cinema"], answer: "We went to the cinema yesterday" },
  { id: 14, skill: "speaking", cefr: "A2", type: "speak-read",
    prompt: "Read the sentence aloud clearly.",
    text: "On weekends, I usually meet my friends and play football together." },

  /* ══════════════ B1 - 10 items ══════════════ */
  { id: 15, skill: "listening", cefr: "B1", type: "listen-mcq",
    prompt: "Why was the meeting moved?",
    audioText: "Man: Hi team - the marketing review has been pushed from three to four thirty because the client's flight is delayed.",
    options: [
      "The room was double-booked",
      "The client's flight is delayed",
      "The manager is sick",
      "The slides are not ready"], correct: 1 },
  { id: 16, skill: "listening", cefr: "B1", type: "listen-mcq",
    prompt: "Why is the speaker apologising?",
    audioText: "Woman: I'm really sorry I'm late - there was an accident on the highway and traffic was completely stopped for almost twenty minutes.",
    options: [
      "She forgot the meeting",
      "Traffic was blocked by an accident",
      "Her car broke down",
      "She overslept"], correct: 1 },
  { id: 17, skill: "listening", cefr: "B1", type: "listen-dictation",
    prompt: "Listen and fill in the missing words.",
    audioText: "My sister usually goes to the gym three times a week after work.",
    template: "My sister usually goes to the ___ three times a ___ after ___.",
    blanks: ["gym", "week", "work"] },
  { id: 18, skill: "reading", cefr: "B1", type: "read-cloze",
    prompt: "This is from a school newsletter. Choose the best word for each blank.",
    paragraph: "Many young Vietnamese students [[0]] abroad every year in [[1]] of better education and broader [[2]].",
    choices: [["go","goes","gone"],["search","searches","searching"],["experience","experiences","experienced"]],
    correct: [0,0,1] },
  { id: 19, skill: "reading", cefr: "B1", type: "read-cloze",
    prompt: "This is from a blog post about learning. Choose the best word for each blank.",
    paragraph: "Technology has [[0]] the way we learn, making knowledge [[1]] available to almost [[2]].",
    choices: [["changed","change","changing"],["widely","wide","wider"],["everyone","anyone","someone"]],
    correct: [0,0,0] },
  { id: 20, skill: "reading", cefr: "B1", type: "read-cloze",
    prompt: "This is from a company handbook. Choose the best word for each blank.",
    paragraph: "Remote work [[0]] flexibility, but it also [[1]] strong discipline and a [[2]] workspace at home.",
    choices: [["offers","offer","offered"],["requires","require","requiring"],["dedicated","dedicate","dedicating"]],
    correct: [0,0,0] },
  { id: 21, skill: "reading", cefr: "B1", type: "read-analytical",
    prompt: "What is the main idea of the passage?",
    passage: "Many Vietnamese high-school students now study English not only for school exams but also for travel, online courses and future jobs. Apps and YouTube make it easy to listen to native speakers every day, while group classes still help with speaking practice. Most teachers agree that mixing self-study with a real class gives the best results.",
    options: [
      "English is only useful for passing school exams",
      "Apps have replaced classroom teachers in Vietnam",
      "A mix of self-study and classes works best for learning English",
      "YouTube is the only way to hear native speakers"], correct: 2 },
  { id: 22, skill: "reading", cefr: "B1", type: "read-analytical",
    prompt: "What does the writer suggest about sleep?",
    passage: "Teenagers often stay up late scrolling on their phones, then feel tired in class the next morning. Doctors recommend at least eight hours of sleep and putting the phone away thirty minutes before bed. Students who follow this routine usually find it easier to concentrate and remember new vocabulary.",
    options: [
      "Phones do not affect sleep",
      "Eight hours of sleep and less phone time help students learn better",
      "Teenagers should sleep less to study more",
      "Doctors disagree about how much sleep is needed"], correct: 1 },
  { id: 23, skill: "writing", cefr: "B1", type: "write-picture",
    prompt: "Write one complete sentence about the picture, using a linking word.",
    emoji: "🏫📚", hint: "Use 'because' or 'although' and mention the school and studying.", minWords: 10 },
  { id: 24, skill: "speaking", cefr: "B1", type: "speak-reply",
    prompt: "Listen to the question, then reply within 30 seconds.",
    audioText: "Examiner: Can you describe your favourite hobby and explain why you enjoy it?",
    seconds: 30 },

  /* ══════════════ B2 - 10 items ══════════════ */
  { id: 25, skill: "listening", cefr: "B2", type: "listen-mcq",
    prompt: "What is the main point of the announcement?",
    audioText: "Announcer: We're upgrading the office network this Saturday, so please save your work and log out before six PM on Friday to avoid losing files.",
    options: [
      "A new company policy is starting",
      "Employees must save their work before a scheduled network upgrade",
      "The office will close for the weekend",
      "A team-building event is on Saturday"], correct: 1 },
  { id: 26, skill: "listening", cefr: "B2", type: "listen-mcq",
    prompt: "What does the speaker recommend?",
    audioText: "Man: Although the report is comprehensive, I'd suggest tightening the conclusion and adding two more charts before sending it to the client.",
    options: [
      "Rewrite the entire report",
      "Send the report as it is",
      "Shorten the conclusion and add more charts",
      "Replace the existing charts"], correct: 2 },
  { id: 27, skill: "listening", cefr: "B2", type: "listen-dictation",
    prompt: "Listen and fill in the missing words.",
    audioText: "Reading regularly helps students develop critical thinking and a wider vocabulary.",
    template: "Reading regularly helps students develop ___ thinking and a wider ___.",
    blanks: ["critical", "vocabulary"] },
  { id: 28, skill: "reading", cefr: "B2", type: "read-cloze",
    prompt: "This is from a newspaper opinion column. Choose the best word for each blank.",
    paragraph: "Despite the rapid [[0]] of social media, face-to-face conversation remains [[1]] for building [[2]] relationships.",
    choices: [["rise","raise","arise"],["essential","essentially","essence"],["meaningful","meaning","means"]],
    correct: [0,0,0] },
  { id: 29, skill: "reading", cefr: "B2", type: "read-cloze",
    prompt: "This is from a city council report. Choose the best word for each blank.",
    paragraph: "Climate change is [[0]] coastal cities to invest [[1]] in flood defences; otherwise repair costs will [[2]] every year.",
    choices: [["forcing","force","forced"],["heavily","heavy","heavier"],["soar","sore","source"]],
    correct: [0,0,0] },
  { id: 30, skill: "reading", cefr: "B2", type: "read-analytical",
    prompt: "What can be inferred about AI tutors?",
    passage: "Adaptive AI tutors promise to personalise instruction at scale, adjusting difficulty in response to each learner's performance. However, early deployments show that without a teacher's judgement, the system can mistake disengagement for mastery and push students through material they haven't really understood. The most successful pilots therefore combine AI feedback with regular human check-ins.",
    options: [
      "AI tutors can fully replace human teachers",
      "AI alone reliably tells mastery from disengagement",
      "Combining AI with human oversight produces stronger results",
      "Personalised learning does not work with AI"], correct: 2 },
  { id: 31, skill: "reading", cefr: "B2", type: "read-analytical",
    prompt: "Which sentence best summarises the passage?",
    passage: "Urban planners increasingly see green corridors not as decoration but as vital infrastructure. Mature tree canopies lower street temperatures by several degrees, reduce stormwater runoff and improve residents' mental wellbeing. Cities that integrate native vegetation along roads also report less respiratory illness and stronger community ties.",
    options: [
      "Green corridors are mainly decorative",
      "Urban trees damage city drainage",
      "Green corridors deliver clear health, climate and social benefits",
      "Native plants are too expensive for most cities"], correct: 2 },
  { id: 32, skill: "reading", cefr: "B2", type: "read-analytical",
    prompt: "What is the writer's main argument?",
    passage: "While standardised tests are often defended as objective, recent research shows they reflect family income as much as ability. Wealthier students can pay for prep courses, tutors and stress coaching that lift their scores. Universities that rely only on these tests therefore risk rewarding background rather than identifying real talent.",
    options: [
      "Standardised tests measure ability fairly",
      "Family wealth strongly distorts standardised test scores",
      "Universities should expand standardised testing",
      "Prep courses are unavailable to most students"], correct: 1 },
  { id: 33, skill: "writing", cefr: "B2", type: "write-essay",
    prompt: "Some people think technology has made students lazier, while others believe it has helped them learn more. Discuss both views and give your own opinion. (80-120 words)",
    minWords: 80, maxWords: 120 },
  { id: 34, skill: "speaking", cefr: "B2", type: "speak-reply",
    prompt: "Listen to the question, then reply within 30 seconds.",
    audioText: "Examiner: Tell me about a place in Vietnam you would recommend to a foreign friend, and explain why it is worth visiting.",
    seconds: 30 },

  /* ══════════════ C1 - 6 items ══════════════ */
  { id: 35, skill: "listening", cefr: "C1", type: "listen-mcq",
    prompt: "What is the lecturer's attitude towards the new funding model?",
    audioText: "Presenter: The new funding model is, on paper, an elegant solution. In practice, though, it rewards departments that already publish heavily and quietly penalises the smaller programmes that take longer to produce results - a trade-off the committee has yet to acknowledge.",
    options: [
      "Fully supportive of the model",
      "Cautiously critical of an unacknowledged trade-off",
      "Indifferent to how funding is allocated",
      "Convinced the model will be cancelled"], correct: 1 },
  { id: 36, skill: "listening", cefr: "C1", type: "listen-dictation",
    prompt: "Listen and fill in the missing words.",
    audioText: "The findings were compelling, yet the researchers deliberately understated their conclusions to avoid overgeneralising from a small sample.",
    template: "The findings were ___, yet the researchers deliberately ___ their conclusions to avoid overgeneralising from a small ___.",
    blanks: ["compelling", "understated", "sample"] },
  { id: 37, skill: "reading", cefr: "C1", type: "read-cloze",
    prompt: "This is from an academic journal abstract. Choose the best word for each blank.",
    paragraph: "The study [[0]] a widely held assumption, arguing that motivation is less a fixed trait than a [[1]] of feedback quality, and its authors urge institutions to act [[2]] on that evidence.",
    choices: [["challenges","challenging","challenged"],["by-product","byproducts","producing"],["decisively","decisive","decision"]],
    correct: [0,0,0] },
  { id: 38, skill: "reading", cefr: "C1", type: "read-analytical",
    prompt: "Which statement best reflects the writer's position?",
    passage: "Advocates of open-plan offices cite spontaneous collaboration, but the evidence is more equivocal than the design brochures suggest. Studies tracking employee communication after such renovations found face-to-face exchanges fell sharply, while digital messaging rose - as though workers, deprived of privacy, retreated into headphones and chat windows. That does not condemn open plans outright; it does mean the benefits must be engineered deliberately rather than assumed.",
    options: [
      "Open-plan offices reliably increase face-to-face collaboration",
      "Open-plan offices should be abandoned entirely",
      "Claimed collaboration benefits do not appear automatically and must be designed for",
      "Digital messaging is a sign that open-plan design has succeeded"], correct: 2 },
  { id: 39, skill: "writing", cefr: "C1", type: "write-essay",
    prompt: "Some governments argue that university education should be free for everyone, while others believe students should share the cost. Evaluate both positions and justify your own, referring to fairness and funding. (140-200 words)",
    minWords: 140, maxWords: 200 },
  { id: 40, skill: "speaking", cefr: "C1", type: "speak-present",
    prompt: "Present your view: \"Artificial intelligence will widen, not narrow, the gap between strong and weak students.\" Prepare for 45 seconds, then speak for 90 seconds with clear reasoning and examples.",
    prepSeconds: 45, recordSeconds: 90 },
];

export const SKILL_LABEL: Record<Skill, string> = {
  listening: "Listening", reading: "Reading", writing: "Writing", speaking: "Speaking",
};

/**
 * Fallback map from a plain total (0-100) to a CEFR band. The placement page
 * uses the band-weighted model in `@/lib/placement/placementModel`; this
 * remains for legacy callers and for the non-English subject banks.
 */
export function inferCefr(total: number): Cefr {
  if (total >= 88) return "C1";
  if (total >= 72) return "B2";
  if (total >= 54) return "B1";
  if (total >= 34) return "A2";
  return "A1";
}
