/**
 * @file cambridgeListeningUpgrade.ts
 * @description Cambridge listening items were authored as a single spoken line,
 *              which is far shorter and easier than the real papers - especially
 *              at KET and PET level. This pass rebuilds every listening script as
 *              a multi turn recording of the right length for its level:
 *              a setting line, natural chat, distractor ideas that are explicitly
 *              ruled out, the key line itself (kept verbatim so the answer stays
 *              supported) and a closing turn that does not reveal the key.
 *
 *              Everything is deterministic (hash of exam id + question id), so
 *              scripts never change between renders and the audit stays stable.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { CambridgeMockExam, CambridgeMockQuestion } from "./cambridgeMockExamData";
import { articleiseAction, isNegativeQuestion } from "./cambridgeListeningSupport";


/** Minimum spoken words per level, matching official recording length. */
const WORD_TARGET: Record<string, number> = {
  starters: 42,
  movers: 60,
  flyers: 88,
  ket: 125,
  pet: 165,
};

type Voices = { a: string; b: string; keyIsA: boolean };

/** Voice pairs that fit the level: young children at YLE, adults at KET/PET. */
const VOICE_SETS: Record<string, Voices[]> = {
  starters: [
    { a: "Woman", b: "Boy", keyIsA: true },
    { a: "Man", b: "Girl", keyIsA: true },
    { a: "Girl", b: "Boy", keyIsA: false },
  ],
  movers: [
    { a: "Teacher", b: "Student", keyIsA: true },
    { a: "Woman", b: "Boy", keyIsA: true },
    { a: "Girl", b: "Boy", keyIsA: false },
  ],
  flyers: [
    { a: "Teacher", b: "Student", keyIsA: true },
    { a: "Man", b: "Girl", keyIsA: true },
    { a: "Woman", b: "Boy", keyIsA: true },
  ],
  ket: [
    { a: "Interviewer", b: "Woman", keyIsA: false },
    { a: "Presenter", b: "Man", keyIsA: false },
    { a: "Woman", b: "Man", keyIsA: false },
  ],
  pet: [
    { a: "Interviewer", b: "Expert", keyIsA: false },
    { a: "Presenter", b: "Guest", keyIsA: false },
    { a: "Woman", b: "Man", keyIsA: false },
  ],
};

const hash = (text: string): number => {
  let h = 0;
  for (let i = 0; i < text.length; i += 1) h = (h * 31 + text.charCodeAt(i)) % 100000;
  return h;
};

const words = (text: string): number => text.trim().split(/\s+/).filter(Boolean).length;

/** Strip the "Listen:" wrapper and the surrounding quotes of the authored line. */
const coreLine = (passage: string): string => {
  let text = passage.replace(/^\s*Listen:\s*/i, "").trim();
  text = text.replace(/\n+/g, " ").trim();
  const quoted = text.match(/^['"“](.*)['"”]$/s);
  if (quoted) text = quoted[1].trim();
  return text.replace(/\s+/g, " ");
};

const normalise = (text: string): string =>
  text.toLowerCase().replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();

/** Days, months, titles and names keep their capital letter inside a sentence. */
const PROPER = /^(monday|tuesday|wednesday|thursday|friday|saturday|sunday|january|february|march|april|may|june|july|august|september|october|november|december|mr|mrs|miss|ms|english|maths|london|paris)\b/i;

const lower = (text: string): string =>
  PROPER.test(text) || /^[A-Z]{2,}|^[£$]|^\d/.test(text)
    ? text
    : text.charAt(0).toLowerCase() + text.slice(1);

/**
 * Wrong options that are safe to name as rejected ideas: real words, not part of
 * the key and not already mentioned in the authored line. Negative stems ("What
 * does the centre NOT accept?") get no rejections at all, because there every
 * wrong option must stay audible in the recording.
 */
const rejectable = (q: CambridgeMockQuestion, core: string): string[] => {
  if (isNegativeQuestion(q.question)) return [];
  const key = normalise(q.options[q.correctAnswer] ?? "");
  const plain = normalise(core);
  return q.options
    .filter((_, i) => i !== q.correctAnswer)
    .map(o => o.trim())
    .filter(o => o.length > 1)
    .filter(o => !/^(yes|no|maybe|none|all of them|we don't know)$/i.test(o))
    .filter(o => {
      const n = normalise(o);
      return n.length > 0 && n !== key && !key.includes(n) && !n.includes(key) && !plain.includes(n);
    })
    .map(o => o.replace(/\.$/, ""))
    .map(o => lower(o));
};

/** Numbers, clock times and prices need their own wording to sound natural. */
const isQuantity = (text: string): boolean =>
  /^[£$]?\d+([.,:]\d+)?\s*(a\.?m\.?|p\.?m\.?|o'clock|pounds|dollars|hours?|hrs?|minutes?|mins?|days?|weeks?|months?|years?|kilometres?|km|metres?|m|people|students?|times?|degrees?)?\.?$/i.test(
    text.trim()
  );


/** Openers set the scene without hinting at the key. */
const OPENERS: Record<string, string[]> = {
  starters: [
    "You will hear a short conversation about {theme}. Listen carefully.",
    "You will hear two people talking about {theme}. Listen twice.",
  ],
  movers: [
    "You will hear a conversation about {theme}. Listen twice.",
    "You will hear two people talking about {theme}. Listen and choose the right answer.",
  ],
  flyers: [
    "You will hear a conversation about {theme}. Listen and choose the right answer.",
    "You will hear a short interview about {theme}. Listen twice.",
  ],
  ket: [
    "You will hear a conversation about {theme}. You will hear the recording twice.",
    "Listen to two people discussing {theme}. Choose the correct answer.",
    "You will hear part of a radio programme about {theme}.",
  ],
  pet: [
    "You will hear a conversation about {theme}. You will hear the recording twice.",
    "Listen to an interview about {theme}. Choose the best answer for the question.",
    "You will hear part of a talk about {theme}. Some details change while they speak.",
  ],
};

/** Small talk before the key line. */
const CHAT: Record<string, string[]> = {
  starters: [
    "Hello! How are you today?",
    "I am fine, thank you.",
    "Look over there!",
    "That is very nice.",
    "Can you tell me more, please?",
  ],
  movers: [
    "Hi! Have you got a minute?",
    "Yes, of course. What do you want to know?",
    "I am writing about it for my class project.",
    "That sounds like a good idea.",
    "Let me check my notebook first.",
  ],
  flyers: [
    "Thanks for helping me with my project.",
    "No problem. Ask me anything you like.",
    "I wrote some notes yesterday, but I want to check them.",
    "Good idea. It is easy to mix the details up.",
    "Let me read my questions one by one.",
  ],
  ket: [
    "Thanks for coming in to talk to us today.",
    "It is a pleasure. There is quite a lot to explain.",
    "I have read a few things about it, but I am not sure they are up to date.",
    "That is a fair point. Some of the information online is a year old now.",
    "So let us go through the main facts together.",
    "Take your time and write the important parts down.",
  ],
  pet: [
    "Thanks for joining us in the studio this afternoon.",
    "Thank you for inviting me. It is a subject I know well.",
    "Before we start, I should say that a few details were changed recently.",
    "Yes, that is right, so the older leaflets are not accurate any more.",
    "Our listeners often ask about this, so let us be very clear.",
    "I will explain what actually happens now, step by step.",
    "That will be useful for anyone planning to go.",
  ],
};

/** Ways to name and reject a wrong idea. */
const REJECT: Record<string, string[]> = {
  starters: ["Is it {x}? No, it is not {x}.", "It is not {x}."],
  movers: [
    "Some people say it is {x}, but that is not right.",
    "It is not {x}, so do not write that.",
  ],
  flyers: [
    "My friend thought it was {x}, but she was wrong.",
    "It is definitely not {x}, although a lot of people think so.",
  ],
  ket: [
    "A lot of people expect {x}, because the old leaflet said so, but that is not the case now.",
    "We did think about {x} at first, but that plan was dropped.",
    "It is certainly not {x} any more.",
  ],
  pet: [
    "Many people assume it is {x}, because that is what happened last year, but not any longer.",
    "There were two early suggestions, {x} being the most popular one, but neither of them went ahead.",
    "I should make it clear that {x} is no longer the case.",
    "The website still mentions {x}, which is wrong and we are getting it corrected.",
  ],
};

/**
 * Rejections for numbers, times and prices. Saying "It is not 25." sounds wrong
 * in a recording, so these wordings frame the number as an out of date detail.
 */
const QUANTITY_REJECT: Record<string, string[]> = {
  starters: ["My friend said {x}, but that is not right.", "It was {x} last week, but not now."],
  movers: [
    "My old notebook says {x}, but I have to change that.",
    "The poster said {x}, and that information is old.",
  ],
  flyers: [
    "My friend wrote down {x}, but she copied it from an old page.",
    "The first plan was {x}, and then everything moved.",
  ],
  ket: [
    "The old leaflet printed {x}, and that has now changed.",
    "It used to be {x} last year, so please do not use that figure.",
  ],
  pet: [
    "The website still shows {x}, which is left over from last season and is not correct.",
    "The original announcement said {x}, but that was revised before it opened.",
  ],
};

/** Theme flavoured lines so scripts about food do not sound like scripts about travel. */
const THEME_CHAT: string[] = [
  "I would like to ask you about {theme}.",
  "People keep talking about {theme} at the moment, so I am curious.",
  "There is a lot to say about {theme}, is there not?",
  "I did some reading about {theme} before I came here.",
];

/**
 * Options that are actions ("postpone meeting", "take the bus") cannot follow
 * "It is not ...", so they get their own rejection wordings.
 */
const isAction = (text: string): boolean =>
  /^(write|read|buy|take|use|go|cook|play|walk|cycle|swim|call|ask|visit|postpone|cancel|book|bring|wear|study|join|help|meet|send|wait|start|finish|change|recycle|save|plant|skip|move|stay|leave|order|pay|watch|listen|drive|fly|run|clean|paint|open|close|delay|repeat|share|check)\b/i.test(
    text.trim()
  );

const ACTION_REJECT: Record<string, string[]> = {
  starters: ["We are not going to {x}.", "First I wanted to {x}, but not now."],
  movers: [
    "At first I wanted to {x}, but I changed my mind.",
    "We are not going to {x}, so do not write that.",
  ],
  flyers: [
    "My friend thought we would {x}, but that is not the plan.",
    "We talked about how to {x}, and then we decided against it.",
  ],
  ket: [
    "A lot of people expect us to {x}, but that idea was dropped.",
    "We did plan to {x} last month, and that is no longer true.",
  ],
  pet: [
    "Many people assume we will {x}, because that is what happened last year.",
    "One early suggestion was to {x}, but it never went ahead.",
  ],
};


/** Closing turns that add length without repeating the key. */
const CLOSERS: Record<string, string[]> = {
  starters: ["Thank you! Goodbye.", "Now you know. See you later!"],
  movers: ["Thanks a lot. That helps me.", "Great, I have written it down. Bye!"],
  flyers: ["Thank you very much. My project is nearly finished now.", "That is all my questions. Thanks for your time."],
  ket: [
    "Thank you. I will make sure our readers get the correct information this time.",
    "That is very helpful. I have written all of it in my notes.",
  ],
  pet: [
    "Thank you. I am sure our listeners found that far clearer than the leaflet did.",
    "That is all we have time for today, but the details are on the noticeboard as well.",
  ],
};

const pick = <T,>(pool: T[], seed: number): T => pool[seed % pool.length];

/** Theme from a title like "PET Mock Test 11 - City Life & Community". */
const themeOf = (exam: CambridgeMockExam): string => {
  const part = exam.title.split(/\s[-–]\s/)[1] ?? exam.title;
  return part.trim().toLowerCase() || "everyday life";
};

/** Split a passage into sentences, keeping the end punctuation. */
const sentencesOf = (text: string): string[] =>
  (text.match(/[^.!?]+[.!?]*/g) ?? [text]).map(s => s.trim()).filter(Boolean);

/** Lines that start a reply, so the speaker must change before them. */
const REPLY_START =
  /^(yes|no|yeah|sure|certainly|of course|ok|okay|right|well|thanks|thank you|sorry|i'd like|i would like|i'll|i will|that's|that is|good (morning|afternoon|evening)|hello|hi)\b/i;

/**
 * Many authored key lines are a whole mini scene ("Good afternoon, how can I
 * help you? I'd like to book a table ... What time? 7:30, please."). Read as one
 * speaker turn that sounds absurd, so those are detected and split into turns.
 */
const isSceneDialogue = (core: string): boolean => {
  const parts = sentencesOf(core);
  if (parts.length < 3) return false;
  return /\?/.test(core) || parts.some(p => REPLY_START.test(p));
};

/** Turn a mini scene into alternating turns: a question ends a turn, a reply starts one. */
const splitTurns = (core: string): string[] => {
  const parts = sentencesOf(core);
  const turns: string[] = [];
  let current: string[] = [];
  let breakBefore = false;
  parts.forEach(part => {
    if (current.length && (breakBefore || REPLY_START.test(part))) {
      turns.push(current.join(" "));
      current = [];
    }
    current.push(part);
    breakBefore = /\?$/.test(part);
  });
  if (current.length) turns.push(current.join(" "));
  return turns;
};

/** Neutral two person casts for scene dialogues, where interview roles do not fit. */
const SCENE_VOICES: Record<string, [string, string]> = {
  starters: ["Woman", "Boy"],
  movers: ["Woman", "Boy"],
  flyers: ["Woman", "Girl"],
  ket: ["Woman", "Man"],
  pet: ["Woman", "Man"],
};

/** Polite in scene padding that fits any service or everyday conversation. */
const SCENE_FILLER: string[] = [
  "Of course. Let me just check that for you.",
  "Thank you, that is very kind.",
  "One moment, please.",
  "Is there anything else you need today?",
  "No, that is everything, thank you.",
  "Let me write the details down so I do not forget them.",
];

const SCENE_CLOSERS: string[] = [
  "Lovely. We will see you then. Goodbye!",
  "Thank you very much. Goodbye!",
  "That is all booked for you. Have a good day!",
];

/**
 * Scene scripts get their rejected ideas as a natural check question and answer
 * instead of the "the old leaflet said" wording, which only fits an interview.
 */
const sceneReject = (x: string): [string, string] =>
  isQuantity(x)
    ? [`Sorry, was that ${x}?`, `No, not ${x}.`]
    : isAction(x)
      ? [`Sorry, did you want to ${articleiseAction(lower(x))}?`, `No, not that.`]
      : [`Sorry, did you say ${lower(x)}?`, `No, not ${lower(x)}.`];

/** Build a script for a key line that already contains a whole conversation. */
const buildSceneScript = (
  exam: CambridgeMockExam,
  q: CambridgeMockQuestion,
  core: string,
  seed: number
): string => {
  const level = exam.level;
  const target = WORD_TARGET[level] ?? 80;
  const [voiceA, voiceB] = SCENE_VOICES[level] ?? SCENE_VOICES.flyers;
  const theme = themeOf(exam);
  const opener = pick(OPENERS[level] ?? OPENERS.flyers, seed).replace("{theme}", theme);

  const turns = splitTurns(core);
  const lines: string[] = [`Narrator: ${opener}`];

  // Wrong ideas are checked back after the scene, the way people really confirm
  // a detail, instead of the "the old leaflet said" wording of an interview.
  const rejects = rejectable(q, core).slice(0, level === "starters" || level === "movers" ? 1 : 2);

  const body: string[] = [...turns];
  rejects.forEach(x => {
    const [ask, answer] = sceneReject(x);
    body.push(ask, answer);
  });

  const closer = pick(SCENE_CLOSERS, seed);
  let used = words(opener) + words(closer) + body.reduce((s, l) => s + words(l), 0);

  // Pad with polite in scene lines only while the recording is short for the level.
  let filler = 0;
  while (used < target && filler < SCENE_FILLER.length) {
    const text = SCENE_FILLER[(seed + filler) % SCENE_FILLER.length];
    body.push(text);
    used += words(text);
    filler += 1;
  }

  // Voices alternate strictly, so the same person never speaks twice in a row.
  body.forEach((text, i) => lines.push(`${i % 2 === 0 ? voiceA : voiceB}: ${text}`));
  lines.push(`${body.length % 2 === 0 ? voiceA : voiceB}: ${closer}`);
  return `Listen:\n${lines.join("\n")}`;
};

const buildScript = (exam: CambridgeMockExam, q: CambridgeMockQuestion): string => {
  const core = coreLine(q.passage ?? "");
  if (!core) return q.passage ?? "";

  const level = exam.level;
  const target = WORD_TARGET[level] ?? 80;
  const seed = hash(`${exam.id}#${q.id}#${core.length}`);
  // A key line that is already a whole scene must be split into turns, never
  // read out as one absurd speaker turn inside an interview.
  if (isSceneDialogue(core)) return buildSceneScript(exam, q, core, seed);
  const voices = pick(VOICE_SETS[level] ?? VOICE_SETS.flyers, seed);
  const theme = themeOf(exam);
  // The theme line is inserted after the greeting so each paper sounds different.
  const baseChat = CHAT[level] ?? CHAT.flyers;
  const chat = [
    baseChat[0],
    baseChat[1],
    pick(THEME_CHAT, seed + 3).replace("{theme}", theme),
    ...baseChat.slice(2),
  ];
  const rejects = rejectable(q, core);

  const opener = pick(OPENERS[level] ?? OPENERS.flyers, seed).replace("{theme}", theme);
  const lines: string[] = [`Narrator: ${opener}`];

  // Rejected ideas raise the difficulty: the student must hear the contrast.
  const rejectPool = REJECT[level] ?? REJECT.flyers;
  const quantityPool = QUANTITY_REJECT[level] ?? QUANTITY_REJECT.flyers;
  const actionPool = ACTION_REJECT[level] ?? ACTION_REJECT.flyers;
  const rejectLines = rejects
    .slice(0, level === "starters" || level === "movers" ? 1 : 2)
    .map((x, i) =>
      pick(isQuantity(x) ? quantityPool : isAction(x) ? actionPool : rejectPool, seed + i).replace(
        /\{x\}/g,
        isAction(x) ? articleiseAction(lower(x)) : lower(x)
      )
    );

  const closer = pick(CLOSERS[level] ?? CLOSERS.flyers, seed);
  const fixed = words(opener) + words(core) + words(closer) + rejectLines.reduce((s, l) => s + words(l), 0);

  // Chat lines keep their authored order so the conversation stays logical, and
  // they all sit before the key line so the recording ends right after it.
  const minChat = level === "starters" ? 2 : level === "movers" ? 3 : level === "flyers" ? 3 : 4;
  const before: string[] = [];
  let used = fixed;
  for (let i = 0; i < chat.length; i += 1) {
    if (i >= minChat && used >= target) break;
    before.push(chat[i]);
    used += words(chat[i]);
  }


  // Chat alternates naturally, then the speaker who knows the facts says the
  // rejected ideas and the key line, and the other one closes the recording.
  const keyVoice = voices.keyIsA ? voices.a : voices.b;
  const otherVoice = voices.keyIsA ? voices.b : voices.a;
  before.forEach((text, i) => {
    // The one asking questions opens, the one who knows the facts replies.
    lines.push(`${i % 2 === 0 ? otherVoice : keyVoice}: ${text}`);
  });
  [...rejectLines, core].forEach(text => lines.push(`${keyVoice}: ${text}`));
  lines.push(`${otherVoice}: ${closer}`);

  return `Listen:\n${lines.join("\n")}`;

};

/** Rebuild every listening script of one paper at the right length. */
export const upgradeCambridgeListening = (exam: CambridgeMockExam): CambridgeMockExam => ({
  ...exam,
  questions: exam.questions.map(q =>
    q.section === "Listening" && q.passage ? { ...q, passage: buildScript(exam, q) } : q
  ),
});
