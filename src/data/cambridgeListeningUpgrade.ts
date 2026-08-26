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
import { isNegativeQuestion, normaliseText as normaliseShared } from "./cambridgeListeningSupport";


/** Minimum spoken words per level, matching official recording length. */
const WORD_TARGET: Record<string, number> = {
  starters: 42,
  movers: 60,
  flyers: 88,
  ket: 125,
  pet: 165,
};

type Voices = { a: string; b: string };

/** Voice pairs that fit the level: young children at YLE, adults at KET/PET. */
const VOICE_SETS: Record<string, Voices[]> = {
  starters: [{ a: "Woman", b: "Boy" }, { a: "Man", b: "Girl" }, { a: "Girl", b: "Boy" }],
  movers: [{ a: "Teacher", b: "Student" }, { a: "Woman", b: "Boy" }, { a: "Girl", b: "Boy" }],
  flyers: [{ a: "Teacher", b: "Student" }, { a: "Man", b: "Girl" }, { a: "Woman", b: "Boy" }],
  ket: [{ a: "Interviewer", b: "Woman" }, { a: "Presenter", b: "Man" }, { a: "Woman", b: "Man" }],
  pet: [{ a: "Interviewer", b: "Expert" }, { a: "Presenter", b: "Guest" }, { a: "Woman", b: "Man" }],
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

/**
 * Wrong options that are safe to name as rejected ideas: real words, not part of
 * the key and not already mentioned in the authored line.
 */
const rejectable = (q: CambridgeMockQuestion, core: string): string[] => {
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
    .map(o => (/^[A-Z]{2,}/.test(o) ? o : o.charAt(0).toLowerCase() + o.slice(1)));
};

const lower = (text: string): string => text.charAt(0).toLowerCase() + text.slice(1);

/** Openers set the scene without hinting at the key. */
const OPENERS: Record<string, string[]> = {
  starters: [
    "You will hear a short talk about {theme}. Listen carefully.",
    "Listen to two friends talking about {theme}.",
    "You will hear a girl and her mum talking about {theme}.",
  ],
  movers: [
    "You will hear a conversation about {theme}. Listen twice.",
    "Listen to a boy telling his teacher about {theme}.",
    "You will hear two children planning something about {theme}.",
  ],
  flyers: [
    "You will hear a conversation about {theme}. Listen and choose the right answer.",
    "Listen to a girl asking questions about {theme}.",
    "You will hear a short interview about {theme}.",
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
    "A lot of people expect {x}, and that is what the old leaflet said.",
    "We did think about {x} at first, but that plan was dropped.",
    "It is certainly not {x} any more.",
  ],
  pet: [
    "Many people assume it is {x}, because that is what happened last year.",
    "There were two early suggestions, {x} being the most popular one, but neither of them went ahead.",
    "I should make it clear that {x} is no longer the case.",
    "The website still mentions {x}, and we are trying to get that corrected.",
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

const buildScript = (exam: CambridgeMockExam, q: CambridgeMockQuestion): string => {
  const core = coreLine(q.passage ?? "");
  if (!core) return q.passage ?? "";

  const level = exam.level;
  const target = WORD_TARGET[level] ?? 80;
  const seed = hash(`${exam.id}#${q.id}#${core.length}`);
  const voices = pick(VOICE_SETS[level] ?? VOICE_SETS.flyers, seed);
  const chat = CHAT[level] ?? CHAT.flyers;
  const rejects = rejectable(q, core);

  const opener = pick(OPENERS[level] ?? OPENERS.flyers, seed).replace("{theme}", themeOf(exam));
  const lines: string[] = [`Narrator: ${opener}`];

  // Rejected ideas raise the difficulty: the student must hear the contrast.
  const rejectPool = REJECT[level] ?? REJECT.flyers;
  const rejectLines = rejects
    .slice(0, level === "starters" || level === "movers" ? 1 : 2)
    .map((x, i) => pick(rejectPool, seed + i).replace(/\{x\}/g, lower(x)));

  const closer = pick(CLOSERS[level] ?? CLOSERS.flyers, seed);
  const fixed = words(opener) + words(core) + words(closer) + rejectLines.reduce((s, l) => s + words(l), 0);

  // Chat lines keep their authored order so the conversation stays logical, and
  // they all sit before the key line so the recording ends right after it.
  const minChat = level === "starters" ? 2 : level === "movers" ? 2 : level === "flyers" ? 3 : 4;
  const before: string[] = [];
  let used = fixed;
  for (let i = 0; i < chat.length; i += 1) {
    if (i >= minChat && used >= target) break;
    before.push(chat[i]);
    used += words(chat[i]);
  }

  const middle = [...before, ...rejectLines, core];
  middle.forEach((text, i) => {
    lines.push(`${i % 2 === 0 ? voices.a : voices.b}: ${text}`);
  });
  lines.push(`${middle.length % 2 === 0 ? voices.a : voices.b}: ${closer}`);

  return `Listen:\n${lines.join("\n")}`;

};

/** Rebuild every listening script of one paper at the right length. */
export const upgradeCambridgeListening = (exam: CambridgeMockExam): CambridgeMockExam => ({
  ...exam,
  questions: exam.questions.map(q =>
    q.section === "Listening" && q.passage ? { ...q, passage: buildScript(exam, q) } : q
  ),
});
