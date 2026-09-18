/**
 * @file cambridgeReadingDepth.ts
 * @description Lengthens the shortest Cambridge reading texts so students have
 *              real context to work with instead of a single sentence that gives
 *              the key away. Extra sentences are neutral setting details: they
 *              never mention any option of the questions attached to the text, so
 *              no answer changes and no new ambiguity appears.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { CambridgeMockExam, CambridgeMockQuestion } from "./cambridgeMockExamData";

/** Official style expects this much reading context per level. */
const MIN_WORDS: Record<string, number> = {
  starters: 42, movers: 70, flyers: 75, ket: 80, pet: 95,
};

const hash = (value: string) => {
  let h = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
};

/**
 * A filler sentence with logic guards. `requires` must appear in the text so the
 * sentence has something to refer to, and `forbids` blocks sentences that would
 * contradict the text (sunshine added to a rainy day, a group added to a text
 * about one person).
 */
type Filler = string | { text: string; requires?: RegExp; forbids?: RegExp };
type Pool = { match: RegExp; young: Filler[]; older: Filler[] };

/** Text of a filler entry. */
const fillerText = (f: Filler): string => (typeof f === "string" ? f : f.text);

/** A filler may only be used when it does not contradict the reading text. */
const fillerFits = (f: Filler, passage: string): boolean => {
  if (typeof f === "string") return true;
  if (f.requires && !f.requires.test(passage)) return false;
  if (f.forbids && f.forbids.test(passage)) return false;
  return true;
};

const PEOPLE = /\b(we|they|friends?|famil|children|kids|class|students?|pupils?|people|staff|visitors?|members?|customers?|brother|sister|mum|mother|dad|father|parents)\b/i;
const INDOORS = /\b(house|home|room|bedroom|kitchen|class|classroom|school|shop|library|museum|centre|center|office|hall|flat|building|cafe|hotel)\b/i;
const BAD_WEATHER = /\b(rain|rains|rained|raining|rainy|snow|snowy|wind|windy|storm|cold|cloud|cloudy|umbrella|night|dark|wet)\b/i;

const GENERAL_YOUNG: Filler[] = [
  { text: "The sun is out and the sky is very blue.", forbids: BAD_WEATHER },
  { text: "It is a nice day and the birds are singing.", forbids: BAD_WEATHER },
  { text: "Everyone is happy and nobody is late.", requires: PEOPLE },
  { text: "They laugh a lot and talk about their week.", requires: PEOPLE },
  { text: "There are two big windows and a green door.", requires: INDOORS },
  { text: "The room is clean and quiet today.", requires: INDOORS },
  { text: "Everybody brings a bag with water and a snack.", requires: /\b(trip|visit|park|farm|beach|club|picnic|walk|game|match|sport|school)\b/i },
  { text: "It takes about ten minutes to walk there.", requires: /\b(park|school|shop|beach|library|museum|farm|station|house|club|centre|center|zoo|pool)\b/i },
  { text: "The plan is simple and easy to remember.", requires: /\b(plan|trip|day|week|club|lesson|game|party|match|holiday)\b/i },
  { text: "Names and times are written in big letters so nobody makes a mistake.", requires: /\b(notice|sign|time|list|board|timetable|poster|letter|message|email)\b/i },
  { text: "Nobody needs to bring anything special.", requires: /\b(bring|need|club|trip|party|class|lesson|game|visit)\b/i },
  { text: "There is a lot to see and do there.", requires: /\b(park|farm|zoo|museum|beach|city|town|festival|centre|center|club|pool|market)\b/i },
];

const GENERAL_OLDER: Filler[] = [
  { text: "The atmosphere is relaxed and nobody seems to be in a hurry.", requires: INDOORS },
  { text: "Most people there agree that the routine works well for them.", requires: PEOPLE },
  { text: "Anyone who wants more information can read the whole notice again carefully.", requires: /\b(notice|sign|advert|information|text|letter|email|leaflet|timetable|poster)\b/i },
  { text: "Little by little, habits like these shape the rest of the day.", requires: /\b(habit|routine|every day|daily|morning|evening|afternoon|week)\b/i },
  { text: "The details matter here, because each one changes what a reader should do next.", requires: /\b(must|should|need|rule|price|cost|time|open|closed)\b/i },
  { text: "Reports from other towns describe very similar experiences.", requires: /\b(town|city|school|company|club|centre|center|project|scheme|study|research)\b/i },
  { text: "Visitors usually say the same thing after their first week there.", requires: /\b(visitors?|students?|members?|customers?|people|staff|guests?)\b/i },
  { text: "The figures have stayed at about the same level for three years.", requires: /\b(percent|number|numbers|price|cost|money|study|research|survey|figures?|data)\b/i },
  { text: "Organisers plan to publish more details later in the year.", requires: /\b(event|club|project|programme|program|course|festival|company|school|centre|center|scheme|trip|competition)\b/i },
  { text: "Staff answer questions by email within two working days.", requires: /\b(email|contact|office|staff|company|centre|center|school|shop|service|booking)\b/i },
  { text: "The same idea is now being used in several other places.", requires: /\b(idea|project|method|system|scheme|programme|program|plan|technology|research|design)\b/i },
  { text: "Costs are lower than many first-time visitors expect.", requires: /\b(price|prices|cost|costs|money|cheap|expensive|pay|ticket|fee)\b/i },
  { text: "Anyone can join at any point in the term, whatever their level.", requires: /\b(class|course|club|lesson|term|group|training|session|workshop)\b/i },
];

const POOLS: Pool[] = [
  {
    match: /school|class|teacher|lesson|homework|pupil|student/i,
    young: [
      "The classroom has a big board and a shelf of story books.",
      "After the lesson the children put their pencils in a box.",
      "The teacher smiles and asks everyone to sit down quietly.",
      "There is a picture of a farm on the wall near the door.",
    ],
    older: [
      "The timetable is pinned beside the door so nobody forgets a room change.",
      "Most students finish their notes before the bell and compare answers.",
      "Teachers there prefer short tasks with a clear goal for each lesson.",
      "A noticeboard in the corridor lists the clubs that meet after school.",
    ],
  },
  {
    match: /weather|rain|snow|sun|cloud|wind|hot|cold/i,
    young: [
      "The children look out of the window before they go out.",
      "They take a coat and a hat because the wind is strong.",
      "Later the clouds move away and the garden is warm again.",
      "The street is wet, so everybody walks slowly.",
    ],
    older: [
      "The forecast changes twice a day at this time of year.",
      "Locals dress in layers because the temperature drops after four o'clock.",
      "Nobody plans an outdoor event without checking the app first.",
      "By evening the wind usually calms down and the air feels fresher.",
    ],
  },
  {
    match: /animal|dog|cat|bird|fish|zoo|farm|horse|elephant/i,
    young: [
      "The animals have water and food in a big bowl.",
      "A small bird sits on the fence and sings.",
      "The children are quiet so they do not frighten it.",
      "There is a picture of the animal on a sign near the gate.",
    ],
    older: [
      "Keepers there record what each animal eats every single day.",
      "Visitors are asked to stay behind the low wooden fence.",
      "The centre works with a local vet who visits twice a month.",
      "Signs explain where the animals live in the wild.",
    ],
  },
  {
    match: /food|eat|lunch|dinner|breakfast|cook|kitchen|cake|bread|fruit/i,
    young: [
      "The kitchen smells very good and the table is ready.",
      "There is water and juice for everyone.",
      "After lunch they wash the plates together.",
      "The bread is warm and the fruit is on a blue plate.",
    ],
    older: [
      "The menu changes with the season, so regulars always ask what is new.",
      "Most of the vegetables come from a farm outside the town.",
      "Portions are small, which means people order two or three dishes.",
      "The kitchen closes early, so the staff prepare everything in the morning.",
    ],
  },
  {
    match: /sport|football|swim|run|game|team|match|play|bike/i,
    young: [
      "The team wears blue shirts and white shoes.",
      "They practise for one hour and then drink water.",
      "Their friends watch and clap from the grass.",
      "Everyone has fun, even when they do not win.",
    ],
    older: [
      "Training sessions start with fifteen minutes of stretching.",
      "The coach reviews the previous match before anyone touches a ball.",
      "Players who arrive late warm up on their own at the side.",
      "The club posts the results online the same evening.",
    ],
  },
  {
    match: /travel|trip|holiday|bus|train|plane|hotel|city|beach|museum/i,
    young: [
      "They put their bags in the car and close the door.",
      "The trip is not long and the road is quiet.",
      "At the end of the day they take a photo together.",
      "Everyone is tired but nobody wants to go home.",
    ],
    older: [
      "Tickets are cheaper if you book them the week before.",
      "The station is a ten minute walk from the main square.",
      "Most visitors spend the morning outside and the afternoon indoors.",
      "Staff at the desk hand out a small map with the opening hours.",
    ],
  },
  {
    match: /computer|internet|phone|app|robot|technolog|online|screen|data/i,
    young: [
      "The screen is small but the pictures are clear.",
      "They use it for thirty minutes and then go outside.",
      "An adult helps them when something does not work.",
      "They save their work before they turn it off.",
    ],
    older: [
      "Updates arrive automatically, so the version numbers change often.",
      "Users say the interface is simple once they learn where things are.",
      "The company collects feedback through a short monthly survey.",
      "Battery life is still the feature people complain about most.",
    ],
  },
  {
    match: /environment|plastic|recycl|rubbish|waste|pollut|climate|tree|energy/i,
    young: [
      "They put paper in one box and plastic in another.",
      "The garden has three young trees near the wall.",
      "Everyone helps, so the job is quick.",
      "The bins are green and easy to find.",
    ],
    older: [
      "Collections happen twice a week, and residents sort the material at home.",
      "The scheme costs very little once the containers are in place.",
      "Reports show that habits change faster when results are made public.",
      "Similar projects in nearby towns started with a single street.",
    ],
  },
  {
    match: /doctor|hospital|health|ill|sick|medicine|exercise|sleep/i,
    young: [
      "The room is warm and there are toys on a low table.",
      "A nurse gives them a sticker before they leave.",
      "They must drink water and sleep early.",
      "Their mother waits with them near the window.",
    ],
    older: [
      "Appointments last around fifteen minutes, so notes are made in advance.",
      "Patients are advised to walk for half an hour every day.",
      "The clinic sends a reminder by message the day before.",
      "Simple changes to sleep and diet often make the biggest difference.",
    ],
  },
];

const contentTokens = (text: string): string[] =>
  text.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(w => w.length > 3);

/** A filler sentence may not mention any option of the questions on this text. */
const isSafe = (sentence: string, forbidden: Set<string>): boolean =>
  !contentTokens(sentence).some(w => forbidden.has(w));

/** Signs, notices and short emails are meant to be brief in the real exam. */
const REALIA = /^\s*(Sign|Notice|Note|Email|Message|Advert|Advertisement|Poster|Text message|Label|Menu|Timetable|Invitation)\b/i;

const wordCount = (text: string) => text.split(/\s+/).filter(Boolean).length;

const buildFiller = (
  passage: string,
  level: string,
  seed: string,
  forbidden: Set<string>,
  needed: number
): string[] => {
  const young = level === "starters" || level === "movers" || level === "flyers";
  const pool = POOLS.find(p => p.match.test(passage));
  const candidates = [
    ...(pool ? (young ? pool.young : pool.older) : []),
  ]
    .filter(f => fillerFits(f, passage))
    .map(fillerText)
    .filter(s => isSafe(s, forbidden));

  const out: string[] = [];
  let added = 0;
  const start = hash(seed) % Math.max(candidates.length, 1);
  for (let i = 0; i < candidates.length && added < needed; i += 1) {
    const sentence = candidates[(start + i) % candidates.length];
    if (out.includes(sentence)) continue;
    out.push(sentence);
    added += wordCount(sentence);
  }
  return out;
};

/** Append neutral context to reading texts that are shorter than the level standard. */
export const deepenCambridgeReading = (exam: CambridgeMockExam): CambridgeMockExam => {
  const min = MIN_WORDS[exam.level] ?? 100;

  // Options of every question that shares a text must stay unique to that text.
  const forbiddenByPassage = new Map<string, Set<string>>();
  exam.questions.forEach(q => {
    if (q.section !== "Reading & Writing" || !q.passage) return;
    const set = forbiddenByPassage.get(q.passage) ?? new Set<string>();
    q.options.forEach(o => contentTokens(o).forEach(w => set.add(w)));
    contentTokens(q.question).forEach(w => set.add(w));
    forbiddenByPassage.set(q.passage, set);
  });

  const rewritten = new Map<string, string>();
  forbiddenByPassage.forEach((forbidden, passage) => {
    if (REALIA.test(passage)) return;
    const missing = min - wordCount(passage);
    if (missing <= 0) return;
    const filler = buildFiller(passage, exam.level, `${exam.id}-${passage.slice(0, 24)}`, forbidden, missing);
    if (filler.length === 0) return;
    rewritten.set(passage, `${passage.trim()} ${filler.join(" ")}`.trim());
  });

  if (rewritten.size === 0) return exam;

  const questions: CambridgeMockQuestion[] = exam.questions.map(q =>
    q.passage && rewritten.has(q.passage) ? { ...q, passage: rewritten.get(q.passage)! } : q
  );
  return { ...exam, questions };
};
