/**
 * @file placementTest.ts
 * @description 40-question CEFR placement test bank - scoped to A1 → B2.
 *
 * Difficulty design:
 *   • A1 starts at functional sentences, NOT single words (e.g. avoid "An apple.")
 *   • Listening mixes images, short dialogues, MCQs, numbers/time, and dictation
 *     from the very first questions to reflect a real entrance-test rhythm.
 *   • Ceiling is B2 to match the target audience (HS / early uni / IELTS 5.5–6.5).
 *
 * Layout:
 *   Listening 12 | Reading 16 | Writing 7 | Speaking 5
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

export const PLACEMENT_TEST: PlacementQuestion[] = [
  /* ───── Listening 12 - A1 → B2, mixed formats from the start ───── */

  // Q1 - A1 image, but a full sentence (not one word)
  { id: 1, skill: "listening", cefr: "A1", type: "listen-image",
    prompt: "Listen to the sentence. What is the person holding?",
    audioText: "Look - the little girl is holding a red apple in her hand.",
    correct: 0,
    options: [
      { emoji: "🍎", label: "A red apple" }, { emoji: "🍌", label: "A banana" },
      { emoji: "🥪", label: "A sandwich" }, { emoji: "📕", label: "A red book" },
    ]},

  // Q2 - A1 MCQ on numbers (mixed format already at question 2)
  { id: 2, skill: "listening", cefr: "A1", type: "listen-mcq",
    prompt: "How old is Minh's brother?",
    audioText: "Hi, I'm Minh. I am twelve years old and my younger brother is nine.",
    options: ["7", "9", "12", "19"], correct: 1 },

  // Q3 - A1 image (location)
  { id: 3, skill: "listening", cefr: "A1", type: "listen-image",
    prompt: "Where is the cat?",
    audioText: "The black cat is sleeping under the kitchen table.",
    correct: 2,
    options: [
      { emoji: "🛏️", label: "On the bed" }, { emoji: "🪑", label: "On the chair" },
      { emoji: "🍽️", label: "Under the table" }, { emoji: "🚪", label: "Near the door" },
    ]},

  // Q4 - A2 MCQ time / schedule
  { id: 4, skill: "listening", cefr: "A2", type: "listen-mcq",
    prompt: "What time does the English class start tomorrow?",
    audioText: "Just a reminder - tomorrow's English class is at quarter past eight, not at eight thirty.",
    options: ["8:00", "8:15", "8:30", "8:45"], correct: 1 },

  // Q5 - A2 image (weather + activity)
  { id: 5, skill: "listening", cefr: "A2", type: "listen-image",
    prompt: "What is the weather like, and what does she take?",
    audioText: "It's raining outside, so Lan is taking her umbrella to school.",
    correct: 1,
    options: [
      { emoji: "☀️🕶️", label: "Sunny - sunglasses" },
      { emoji: "🌧️☂️", label: "Rainy - umbrella" },
      { emoji: "❄️🧤", label: "Snowy - gloves" },
      { emoji: "🌬️🧣", label: "Windy - scarf" },
    ]},

  // Q6 - A2 short conversation MCQ
  { id: 6, skill: "listening", cefr: "A2", type: "listen-mcq",
    prompt: "What does the woman order?",
    audioText: "Waiter: Are you ready to order? Woman: Yes, I'll have a chicken sandwich and an orange juice, please. No coffee today.",
    options: [
      "Coffee and a sandwich",
      "Chicken sandwich and orange juice",
      "Tea and a salad",
      "Just an orange juice"], correct: 1 },

  // Q7 - B1 MCQ (meeting change - reason)
  { id: 7, skill: "listening", cefr: "B1", type: "listen-mcq",
    prompt: "Why was the meeting moved?",
    audioText: "Hi team - the marketing review has been pushed from three to four thirty because the client's flight is delayed.",
    options: [
      "The room was double-booked",
      "The client's flight is delayed",
      "The manager is sick",
      "The slides are not ready"], correct: 1 },

  // Q8 - B1 MCQ (apology / inference)
  { id: 8, skill: "listening", cefr: "B1", type: "listen-mcq",
    prompt: "Why is the speaker apologising?",
    audioText: "I'm really sorry I'm late - there was an accident on the highway and traffic was completely stopped for almost twenty minutes.",
    options: [
      "He forgot the meeting",
      "Traffic was blocked by an accident",
      "His car broke down",
      "He overslept"], correct: 1 },

  // Q9 - B1 short dictation
  { id: 9, skill: "listening", cefr: "B1", type: "listen-dictation",
    prompt: "Listen and fill in the missing words.",
    audioText: "My sister usually goes to the gym three times a week after work.",
    template: "My sister usually goes to the ___ three times a ___ after ___.",
    blanks: ["gym", "week", "work"] },

  // Q10 - B2 MCQ (announcement, main idea)
  { id: 10, skill: "listening", cefr: "B2", type: "listen-mcq",
    prompt: "What is the main point of the announcement?",
    audioText: "We're upgrading the office network this Saturday, so please save your work and log out before six PM on Friday to avoid losing files.",
    options: [
      "A new company policy is starting",
      "Employees must back up their files before a scheduled network upgrade",
      "The office will close for the weekend",
      "A team-building event is on Saturday"], correct: 1 },

  // Q11 - B2 MCQ (recommendation / nuance)
  { id: 11, skill: "listening", cefr: "B2", type: "listen-mcq",
    prompt: "What does the speaker recommend?",
    audioText: "Although the report is comprehensive, I'd suggest tightening the conclusion and adding two more charts before sending it to the client.",
    options: [
      "Rewrite the entire report",
      "Send the report as it is",
      "Shorten the conclusion and add more charts",
      "Replace the existing charts"], correct: 2 },

  // Q12 - B2 dictation
  { id: 12, skill: "listening", cefr: "B2", type: "listen-dictation",
    prompt: "Listen and fill in the missing words.",
    audioText: "Reading regularly helps students develop critical thinking and a wider vocabulary.",
    template: "Reading regularly helps students develop ___ thinking and a wider ___.",
    blanks: ["critical", "vocabulary"] },

  /* ───── Reading 16 - A1 → B2 ───── */
  { id: 13, skill: "reading", cefr: "A1", type: "read-mcq",
    prompt: "She ___ a teacher.",
    options: ["am", "is", "are", "be"], correct: 1 },
  { id: 14, skill: "reading", cefr: "A1", type: "read-mcq",
    prompt: "I have ___ apple every morning.",
    options: ["a", "an", "the", "-"], correct: 1 },
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
  { id: 20, skill: "reading", cefr: "B1", type: "read-cloze",
    prompt: "Choose the best word for each blank.",
    paragraph: "Remote work [[0]] flexibility, but it also [[1]] strong discipline and a [[2]] workspace at home.",
    choices: [["offers","offer","offered"],["requires","require","requiring"],["dedicated","dedicate","dedicating"]],
    correct: [0,0,0] },
  { id: 21, skill: "reading", cefr: "B2", type: "read-cloze",
    prompt: "Choose the best word for each blank.",
    paragraph: "Despite the rapid [[0]] of social media, face-to-face conversation remains [[1]] for building [[2]] relationships.",
    choices: [["rise","raise","arise"],["essential","essentially","essence"],["meaningful","meaning","means"]],
    correct: [0,0,0] },
  { id: 22, skill: "reading", cefr: "B2", type: "read-cloze",
    prompt: "Choose the best word for each blank.",
    paragraph: "Climate change is [[0]] coastal cities to invest [[1]] in flood defences; otherwise repair costs will [[2]] every year.",
    choices: [["forcing","force","forced"],["heavily","heavy","heavier"],["soar","sore","source"]],
    correct: [0,0,0] },

  { id: 23, skill: "reading", cefr: "B1", type: "read-analytical",
    prompt: "What is the main idea of the passage?",
    passage: "Many Vietnamese high-school students now study English not only for school exams but also for travel, online courses and future jobs. Apps and YouTube make it easy to listen to native speakers every day, while group classes still help with speaking practice. Most teachers agree that mixing self-study with a real class gives the best results.",
    options: [
      "English is only useful for passing school exams",
      "Apps have replaced classroom teachers in Vietnam",
      "A mix of self-study and classes works best for learning English",
      "YouTube is the only way to hear native speakers"], correct: 2 },
  { id: 24, skill: "reading", cefr: "B1", type: "read-analytical",
    prompt: "What does the writer suggest about sleep?",
    passage: "Teenagers often stay up late scrolling on their phones, then feel tired in class the next morning. Doctors recommend at least eight hours of sleep and putting the phone away thirty minutes before bed. Students who follow this routine usually find it easier to concentrate and remember new vocabulary.",
    options: [
      "Phones do not affect sleep",
      "Eight hours of sleep and less phone time help students learn better",
      "Teenagers should sleep less to study more",
      "Doctors disagree about how much sleep is needed"], correct: 1 },
  { id: 25, skill: "reading", cefr: "B2", type: "read-analytical",
    prompt: "What can be inferred about AI tutors?",
    passage: "Adaptive AI tutors promise to personalise instruction at scale, adjusting difficulty in response to each learner's performance. However, early deployments show that without a teacher's judgement, the system can mistake disengagement for mastery and push students through material they haven't really understood. The most successful pilots therefore combine AI feedback with regular human check-ins.",
    options: [
      "AI tutors can fully replace human teachers",
      "AI alone reliably tells mastery from disengagement",
      "Combining AI with human oversight produces stronger results",
      "Personalised learning does not work with AI"], correct: 2 },
  { id: 26, skill: "reading", cefr: "B2", type: "read-analytical",
    prompt: "Which sentence best summarises the passage?",
    passage: "Urban planners increasingly see green corridors not as decoration but as vital infrastructure. Mature tree canopies lower street temperatures by several degrees, reduce stormwater runoff and improve residents' mental wellbeing. Cities that integrate native vegetation along roads also report less respiratory illness and stronger community ties.",
    options: [
      "Green corridors are mainly decorative",
      "Urban trees damage city drainage",
      "Green corridors deliver clear health, climate and social benefits",
      "Native plants are too expensive for most cities"], correct: 2 },
  { id: 27, skill: "reading", cefr: "B2", type: "read-analytical",
    prompt: "What is the writer's main argument?",
    passage: "While standardised tests are often defended as objective, recent research shows they reflect family income as much as ability. Wealthier students can pay for prep courses, tutors and stress coaching that lift their scores. Universities that rely only on these tests therefore risk rewarding background rather than identifying real talent.",
    options: [
      "Standardised tests measure ability fairly",
      "Family wealth strongly distorts standardised test scores",
      "Universities should expand standardised testing",
      "Prep courses are unavailable to most students"], correct: 1 },
  { id: 28, skill: "reading", cefr: "B2", type: "read-analytical",
    prompt: "Which conclusion is best supported by the passage?",
    passage: "The spread of AI image and writing tools has worried many creative workers, much as the camera once worried painters. Yet history suggests that each new medium expands rather than shrinks creative work - provided artists learn to use the new tools instead of only resisting them. Those who flourish treat the technology as a collaborator, not a competitor.",
    options: [
      "AI will inevitably end creative professions",
      "Artists who adapt to new tools tend to thrive in technological shifts",
      "The camera reduced demand for visual art",
      "Resisting new media is the smartest response"], correct: 1 },

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

  { id: 32, skill: "writing", cefr: "A2", type: "write-picture",
    prompt: "Write a complete sentence describing the picture.",
    emoji: "🌧️☂️", hint: "Talk about the weather and what you take.", minWords: 6 },
  { id: 33, skill: "writing", cefr: "B1", type: "write-picture",
    prompt: "Write a complete sentence describing the picture.",
    emoji: "🍜👩‍🍳", hint: "Mention the food and who is cooking.", minWords: 7 },
  { id: 34, skill: "writing", cefr: "B1", type: "write-picture",
    prompt: "Write a complete sentence (with a linking word) describing the picture.",
    emoji: "🏫📚", hint: "Use 'because' or 'although'.", minWords: 10 },

  { id: 35, skill: "writing", cefr: "B2", type: "write-essay",
    prompt: "Some people think technology has made students lazier, while others believe it has helped them learn more. Discuss both views and give your own opinion. (80–120 words)",
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
  { id: 39, skill: "speaking", cefr: "B1", type: "speak-reply",
    prompt: "Listen to the question, then reply within 30 seconds.",
    audioText: "Tell me about a place in Vietnam you would recommend to a foreign friend, and explain why.",
    seconds: 30 },

  { id: 40, skill: "speaking", cefr: "B2", type: "speak-present",
    prompt: "Some students want to study abroad after high school, while others prefer to stay in Vietnam. Prepare for 30 seconds, then present your view for 60 seconds.",
    prepSeconds: 30, recordSeconds: 60 },
];

export const SKILL_LABEL: Record<Skill, string> = {
  listening: "Listening", reading: "Reading", writing: "Writing", speaking: "Speaking",
};

/**
 * Map total score (0-100) → CEFR band.
 * Scoped to A1–B2 since the bank no longer contains C1/C2 items.
 */
export function inferCefr(total: number): Cefr {
  if (total >= 78) return "B2";
  if (total >= 58) return "B1";
  if (total >= 37) return "A2";
  return "A1";
}
