/**
 * Presentation & Public Speaking Studio - scenario bank + local speech analytics.
 * All heuristics run client-side so the studio still gives feedback offline.
 */

export type StudioMode = "scripted" | "impromptu";

export interface PresentationScenario {
  id: string;
  label: string;
  labelVi: string;
  audience: string;
  mode: StudioMode[];
  prompt: string;
  script: string;
  qaSeeds: string[];
}

export const PRESENTATION_SCENARIOS: PresentationScenario[] = [
  {
    id: "tech-pitch",
    label: "Tech Startup Pitch",
    labelVi: "Pitch khởi nghiệp công nghệ",
    audience: "Seed-stage investors",
    mode: ["scripted", "impromptu"],
    prompt:
      "Pitch your EdTech product in 3 minutes: problem, solution, traction, market size, team, and the ask.",
    script:
      "Good morning. Every year, four million Vietnamese students sit a high-stakes English exam, yet fewer than one in five can afford a personal tutor.\nThat is the gap we close. Our platform gives every learner an AI coach that listens, grades, and rebuilds the study plan overnight.\nFirst, let me show you the traction. In nine months we have grown to forty thousand monthly learners with a seventy-one percent week-four retention rate.\nSecond, the market. English test preparation in Southeast Asia is a two-point-one billion dollar market growing at fourteen percent a year.\nThird, the team. We combine fifteen years of classroom teaching with data engineering experience from Finland.\nTo summarise, we are raising eight hundred thousand dollars to expand into two new markets and double our content engine. Thank you - I am happy to take your questions.",
    qaSeeds: [
      "What stops a large incumbent from copying this in six months?",
      "Your retention looks strong - how do you prove it is not just early-adopter bias?",
    ],
  },
  {
    id: "thesis-defense",
    label: "Academic Thesis Defence",
    labelVi: "Bảo vệ luận văn",
    audience: "Examination committee",
    mode: ["scripted", "impromptu"],
    prompt:
      "Defend your thesis in 4 minutes: research gap, method, key findings, limitations, contribution.",
    script:
      "Distinguished members of the committee, thank you for your time. My thesis examines how adaptive feedback affects speaking fluency among upper-secondary learners.\nTo begin with, the literature treats fluency gains as a function of practice volume, yet it rarely isolates the quality of feedback.\nMoving on to the method, I ran a twelve-week quasi-experiment with two hundred and forty participants across four schools.\nThe central finding is that learners receiving word-level feedback improved fluency by zero-point-eight of a band, twice the gain of the control group.\nHowever, I must acknowledge two limitations: a single geographic region, and self-reported practice time.\nIn conclusion, this study contributes a replicable feedback protocol that schools can adopt without extra teaching hours. I welcome your questions.",
    qaSeeds: [
      "How do you rule out the novelty effect of the technology itself?",
      "Why did you choose a quasi-experimental design rather than a randomised trial?",
    ],
  },
  {
    id: "ielts-part3",
    label: "IELTS Speaking Part 3",
    labelVi: "IELTS Speaking Part 3",
    audience: "IELTS examiner",
    mode: ["impromptu", "scripted"],
    prompt:
      "Discuss: Should public speaking be a compulsory school subject? Develop both sides, then take a position.",
    script:
      "That is an interesting question. On the whole, I would argue that public speaking deserves a place in the core curriculum.\nOn the one hand, supporters point out that confident speakers do better in interviews and negotiations, so the skill has clear economic value.\nOn the other hand, critics claim that timetables are already crowded and that shy students may find compulsory presentations stressful.\nHaving said that, the pressure can be reduced with small-group formats rather than a whole-school auditorium.\nSo overall, I believe the benefits outweigh the drawbacks, provided that assessment focuses on progress rather than performance.",
    qaSeeds: [
      "Some people say online communication has made speaking skills less important - what do you think?",
      "How could schools assess speaking fairly without discouraging quieter students?",
    ],
  },
  {
    id: "exec-update",
    label: "Executive Business Update",
    labelVi: "Báo cáo cho ban điều hành",
    audience: "Leadership team",
    mode: ["scripted", "impromptu"],
    prompt:
      "Deliver a 2-minute quarterly update: headline result, two drivers, one risk, next actions.",
    script:
      "Thanks for making time. Here is the headline: we closed the quarter at one-point-four million in revenue, eight percent ahead of plan.\nThe first driver was the enterprise renewal cycle, where we retained ninety-four percent of accounts by value.\nThe second driver was pricing discipline; average contract value rose by eleven percent with no increase in churn.\nThe main risk I want to flag is delivery capacity - two of our three implementation leads are fully booked until November.\nTherefore I am asking for approval to bring forward two hires. I will follow up with the detailed plan by Friday. Over to you for questions.",
    qaSeeds: [
      "If we do not approve the hires, what exactly slips and by how long?",
      "How much of the revenue beat is one-off rather than repeatable?",
    ],
  },
  {
    id: "conference-talk",
    label: "Conference Lightning Talk",
    labelVi: "Bài nói hội thảo ngắn",
    audience: "Industry conference",
    mode: ["scripted", "impromptu"],
    prompt:
      "Give a 3-minute lightning talk on one idea worth spreading in education technology.",
    script:
      "Let me start with a number: the average learner forgets seventy percent of a new word within a week.\nMy talk today makes one claim - spaced practice is the cheapest upgrade any classroom can make.\nFirstly, consider how review timing works. A word revisited on day one, day three and day seven survives far longer than a word drilled ten times in one evening.\nSecondly, this costs nothing but scheduling. No new textbook, no new device.\nTo wrap up, if you change only one thing after this talk, change when your students review, not how much. Thank you.",
    qaSeeds: [
      "How would you convince a teacher with no extra planning time to adopt this?",
      "What evidence would change your mind about spaced practice?",
    ],
  },
];

/** Filler words tracked live. */
export const FILLER_PATTERNS: { label: string; regex: RegExp }[] = [
  { label: "um", regex: /\b(um|umm|uhm)\b/gi },
  { label: "ah", regex: /\b(ah|uh|er|erm)\b/gi },
  { label: "like", regex: /\blike\b(?!\s+(?:to|this|that|a|an|the|it|you|him|her|them|my|our))/gi },
  { label: "you know", regex: /\byou know\b/gi },
  { label: "actually", regex: /\bactually\b/gi },
  { label: "basically", regex: /\bbasically\b/gi },
  { label: "sort of", regex: /\b(sort of|kind of)\b/gi },
];

/** Signposting language that earns credit for structure. */
export const SIGNPOST_PHRASES = [
  "first of all", "firstly", "first", "to begin with", "secondly", "second",
  "thirdly", "next", "moving on", "moving on to", "turning to", "let me start with",
  "let me show you", "on the one hand", "on the other hand", "however",
  "having said that", "in contrast", "for example", "for instance", "as a result",
  "therefore", "consequently", "to summarise", "to summarize", "in summary",
  "to wrap up", "in conclusion", "so overall", "the main point is", "here is the headline",
  "finally", "to conclude",
];

/** Band 8.0+ / executive-register vocabulary. */
export const ADVANCED_VOCAB = [
  "pivotal", "compelling", "substantial", "unprecedented", "robust", "nuanced",
  "leverage", "mitigate", "sustainable", "scalable", "trajectory", "discipline",
  "retention", "traction", "differentiator", "replicable", "quasi-experimental",
  "outweigh", "drawbacks", "detrimental", "instrumental", "profound",
  "counterintuitive", "meticulous", "prevalent", "viable", "consolidate",
  "articulate", "advocate", "acknowledge", "underscore", "demonstrate",
];

export const WEAK_UPGRADES: { weak: RegExp; strong: string }[] = [
  { weak: /\bvery important\b/gi, strong: "pivotal" },
  { weak: /\bvery big\b/gi, strong: "substantial" },
  { weak: /\bvery good\b/gi, strong: "compelling" },
  { weak: /\ba lot of\b/gi, strong: "a considerable amount of" },
  { weak: /\bgood results\b/gi, strong: "strong outcomes" },
  { weak: /\bbad\b/gi, strong: "detrimental" },
  { weak: /\bthings\b/gi, strong: "factors" },
  { weak: /\bstuff\b/gi, strong: "elements" },
  { weak: /\bshow\b/gi, strong: "demonstrate" },
  { weak: /\bhelp a lot\b/gi, strong: "make a decisive difference" },
];

export const countWords = (text: string) =>
  text.trim() ? text.trim().split(/\s+/).filter(Boolean).length : 0;

export interface FillerHit { label: string; count: number }

export function countFillers(text: string): { total: number; hits: FillerHit[] } {
  const hits = FILLER_PATTERNS.map((f) => ({
    label: f.label,
    count: (text.match(f.regex) || []).length,
  })).filter((h) => h.count > 0);
  return { total: hits.reduce((s, h) => s + h.count, 0), hits };
}

export function findSignposts(text: string): string[] {
  const lower = ` ${text.toLowerCase()} `;
  const found = SIGNPOST_PHRASES.filter((p) => lower.includes(` ${p} `) || lower.includes(` ${p},`));
  // Prefer the longest match when phrases overlap (e.g. "first" vs "first of all").
  return found.filter((p) => !found.some((q) => q !== p && q.includes(p)));
}

export function findAdvancedVocab(text: string): string[] {
  const lower = text.toLowerCase();
  return ADVANCED_VOCAB.filter((w) => new RegExp(`\\b${w}\\b`, "i").test(lower));
}

export function paceLabel(wpm: number): { tone: "slow" | "good" | "fast"; text: string } {
  if (wpm < 100) return { tone: "slow", text: "Too slow - add energy" };
  if (wpm > 160) return { tone: "fast", text: "Too fast - breathe" };
  return { tone: "good", text: "Great pace" };
}

export interface StudioReport {
  overall: number;
  axes: { axis: string; score: number }[];
  wpm: number;
  durationSec: number;
  words: number;
  fillers: { total: number; hits: FillerHit[] };
  signposts: string[];
  advanced: string[];
  eyeContact: number;
  strengths: string[];
  fixes: string[];
  qaQuestions: string[];
  aiSourced?: boolean;
}

interface AnalyzeInput {
  transcript: string;
  durationSec: number;
  eyeContact: number;
  targetWpm: number;
  targetDurationSec: number;
  scenario: PresentationScenario;
  mode: StudioMode;
}

const clamp = (n: number, lo = 0, hi = 100) => Math.max(lo, Math.min(hi, Math.round(n)));

/** Deterministic local scoring, used alone offline and as the base for AI coaching. */
export function analyzeSession(input: AnalyzeInput): StudioReport {
  const { transcript, durationSec, eyeContact, targetWpm, targetDurationSec, scenario, mode } = input;
  const words = countWords(transcript);
  const minutes = Math.max(durationSec / 60, 1 / 60);
  const wpm = Math.round(words / minutes);
  const fillers = countFillers(transcript);
  const signposts = findSignposts(transcript);
  const advanced = findAdvancedVocab(transcript);

  const fillerRate = words > 0 ? (fillers.total / words) * 100 : 0;
  const sentences = transcript.split(/[.!?]+/).map((s) => s.trim()).filter(Boolean);
  const avgSentence = sentences.length ? words / sentences.length : words;

  const pacing = clamp(100 - Math.min(60, (Math.abs(wpm - targetWpm) / targetWpm) * 130));
  const fluency = clamp(100 - fillerRate * 9 - (avgSentence > 34 ? 12 : 0));
  const clarity = clamp(64 + Math.min(20, sentences.length * 2) - (avgSentence > 30 ? 14 : 0) - fillerRate * 3);
  const signposting = clamp(28 + signposts.length * 13);
  const persuasive = clamp(
    42 + advanced.length * 7 + Math.min(18, signposts.length * 4) +
      (/\d/.test(transcript) ? 12 : 0) - fillerRate * 2,
  );

  const durationFit = clamp(100 - (Math.abs(durationSec - targetDurationSec) / Math.max(targetDurationSec, 1)) * 90);
  const axes = [
    { axis: "Clarity", score: clarity },
    { axis: "Fluency", score: fluency },
    { axis: "Persuasiveness", score: persuasive },
    { axis: "Pacing", score: pacing },
    { axis: "Signposting", score: signposting },
  ];
  const overall = clamp(
    axes.reduce((s, a) => s + a.score, 0) / axes.length * 0.82 +
      durationFit * 0.1 + eyeContact * 0.08,
  );

  const strengths: string[] = [];
  if (signposts.length >= 3)
    strengths.push(`Clear structure - you signposted ${signposts.length} times ("${signposts.slice(0, 3).join('", "')}").`);
  if (fillerRate < 2)
    strengths.push("Very few filler words, so your ideas landed without noise.");
  if (wpm >= 110 && wpm <= 155)
    strengths.push(`Confident delivery pace at ${wpm} WPM - inside the ideal 120-150 band.`);
  if (advanced.length >= 2)
    strengths.push(`Strong register: you used ${advanced.slice(0, 3).join(", ")}.`);
  if (eyeContact >= 65)
    strengths.push(`You held the camera line ${eyeContact}% of the time, which reads as authority.`);
  if (/\d/.test(transcript)) strengths.push("You supported claims with concrete numbers, not vague praise.");
  if (durationSec >= targetDurationSec * 0.8)
    strengths.push("You sustained the full turn without trailing off early.");

  const fixes: string[] = [];
  if (fillers.total > 2)
    fixes.push(`Cut fillers: ${fillers.hits.map((h) => `"${h.label}" x${h.count}`).join(", ")}. Replace each one with a silent half-second pause.`);
  if (wpm > 160) fixes.push(`Slow from ${wpm} to about ${targetWpm} WPM - pause fully at every full stop.`);
  if (wpm < 100 && words > 20)
    fixes.push(`Lift the pace from ${wpm} to about ${targetWpm} WPM; group words into phrases instead of word-by-word delivery.`);
  if (signposts.length < 3)
    fixes.push('Add explicit signposts: "To begin with...", "Moving on to...", "To summarise...".');
  const upgrade = WEAK_UPGRADES.find((u) => u.weak.test(transcript));
  if (upgrade)
    fixes.push(`Upgrade weak wording - replace "${(transcript.match(upgrade.weak) || [""])[0]}" with "${upgrade.strong}".`);
  if (eyeContact < 55)
    fixes.push(`Eye contact was ${eyeContact}%. Look at the lens, not the script, for the first and last sentence of every point.`);
  if (durationSec < targetDurationSec * 0.6)
    fixes.push(`You spoke ${Math.round(durationSec)}s of a ${Math.round(targetDurationSec)}s target - add one example per point.`);
  if (mode === "impromptu" && sentences.length < 4)
    fixes.push("In Q&A defence mode, answer in three moves: position, reason, example.");

  return {
    overall,
    axes,
    wpm,
    durationSec: Math.round(durationSec),
    words,
    fillers,
    signposts,
    advanced,
    eyeContact,
    strengths: strengths.slice(0, 3),
    fixes: fixes.slice(0, 2),
    qaQuestions: scenario.qaSeeds.slice(0, 2),
  };
}

export type TokenKind = "filler" | "signpost" | "advanced" | "plain";

export interface TranscriptToken { text: string; kind: TokenKind }

/** Colour-coded transcript tokens for the report viewer. */
export function tokenizeTranscript(transcript: string): TranscriptToken[] {
  const signposts = SIGNPOST_PHRASES.slice().sort((a, b) => b.length - a.length);
  const words = transcript.split(/(\s+)/);
  const tokens: TranscriptToken[] = [];
  let i = 0;
  while (i < words.length) {
    const chunk = words[i];
    if (/^\s+$/.test(chunk)) { tokens.push({ text: chunk, kind: "plain" }); i += 1; continue; }
    // Try multi-word signpost match starting here.
    const ahead = words.slice(i, i + 8).join("").toLowerCase();
    const phrase = signposts.find((p) => ahead.startsWith(p));
    if (phrase) {
      let consumed = "";
      let j = i;
      while (j < words.length && consumed.replace(/\s+$/, "").length < phrase.length) {
        consumed += words[j];
        j += 1;
      }
      tokens.push({ text: consumed, kind: "signpost" });
      i = j;
      continue;
    }
    const bare = chunk.replace(/[^A-Za-z'-]/g, "").toLowerCase();
    const isFiller = FILLER_PATTERNS.some((f) => new RegExp(`^(?:${f.regex.source.replace(/\\b|\(\?!.*?\)/g, "").replace(/[()]/g, "")})$`, "i").test(bare));
    const kind: TokenKind = isFiller
      ? "filler"
      : ADVANCED_VOCAB.includes(bare)
        ? "advanced"
        : "plain";
    tokens.push({ text: chunk, kind });
    i += 1;
  }
  return tokens;
}

/** Highlight content (stress) words in the teleprompter. */
const FUNCTION_WORDS = new Set([
  "a", "an", "the", "and", "or", "but", "so", "if", "of", "to", "in", "on", "at", "for",
  "with", "from", "by", "as", "is", "are", "was", "were", "be", "been", "am", "do", "does",
  "did", "have", "has", "had", "will", "would", "can", "could", "may", "might", "shall",
  "should", "must", "that", "this", "these", "those", "it", "its", "we", "you", "i", "he",
  "she", "they", "them", "our", "your", "my", "his", "her", "their", "there", "here", "not",
  "no", "yes", "than", "then", "up", "out", "about", "into", "over", "also", "very", "just",
]);

export const isStressWord = (word: string) => {
  const bare = word.replace(/[^A-Za-z'-]/g, "").toLowerCase();
  return bare.length > 2 && !FUNCTION_WORDS.has(bare);
};
