/**
 * @file cambridgeListeningSupport.ts
 * @description Shared helpers that decide whether a Cambridge listening script
 *              actually supports the key of its question. Used by the clarity
 *              pass, the script upgrade pass and the content audit so all three
 *              agree on what "supported" means.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

const NUMBER_WORDS: Record<string, string> = {
  "0": "zero", "1": "one", "2": "two", "3": "three", "4": "four", "5": "five",
  "6": "six", "7": "seven", "8": "eight", "9": "nine", "10": "ten",
  "11": "eleven", "12": "twelve", "13": "thirteen", "14": "fourteen",
  "15": "fifteen", "16": "sixteen", "17": "seventeen", "18": "eighteen",
  "19": "nineteen", "20": "twenty", "30": "thirty", "40": "forty", "50": "fifty",
};

/** Lower case, strip punctuation but keep digits and the time colon. */
export const normaliseText = (text: string): string =>
  text.toLowerCase().replace(/[^a-z0-9: ]/g, " ").replace(/\s+/g, " ").trim();

const numberToWords = (value: number): string => {
  if (NUMBER_WORDS[String(value)]) return NUMBER_WORDS[String(value)];
  if (value > 20 && value < 100) {
    const tens = Math.floor(value / 10) * 10;
    const unit = value % 10;
    const tensWord = NUMBER_WORDS[String(tens)] ?? "";
    return unit ? `${tensWord} ${NUMBER_WORDS[String(unit)]}` : tensWord;
  }
  return String(value);
};

/** Spoken forms of a clock time such as 3:30 or "6 pm". */
const timeVariants = (text: string): string[] => {
  const out: string[] = [];
  const clock = text.match(/(\d{1,2}):(\d{2})/);
  if (clock) {
    const hour = Number(clock[1]);
    const minute = Number(clock[2]);
    const hourWord = numberToWords(hour);
    if (minute === 0) out.push(`${hourWord} o clock`, `${hour} o clock`);
    else if (minute === 30) out.push(`half past ${hourWord}`, `${hourWord} thirty`);
    else if (minute === 15) out.push(`quarter past ${hourWord}`, `${hourWord} fifteen`);
    else if (minute === 45) out.push(`quarter to ${numberToWords(hour + 1)}`, `${hourWord} forty five`);
    else out.push(`${hourWord} ${numberToWords(minute)}`);
  }
  const simple = text.match(/^(\d{1,2})\s*(am|pm)$/i);
  if (simple) {
    const hourWord = numberToWords(Number(simple[1]));
    out.push(`${hourWord} o clock`, `${hourWord} ${simple[2].toLowerCase()}`);
  }
  return out;
};

/** Spoken form of a price such as "£22.50". */
const priceVariants = (text: string): string[] => {
  const money = text.match(/[£$](\d+)(?:\.(\d{2}))?/);
  if (!money) return [];
  const pounds = numberToWords(Number(money[1]));
  const pence = money[2] ? Number(money[2]) : 0;
  const unit = /\$/.test(text) ? "dollars" : "pounds";
  return pence
    ? [`${pounds} ${unit} ${numberToWords(pence)}`, `${money[1]} ${unit} ${money[2]}`]
    : [`${pounds} ${unit}`];
};

/** All spoken variants of an option text that a script may legitimately use. */
export const answerVariants = (answer: string): string[] => {
  const plain = normaliseText(answer);
  const variants = new Set<string>([plain]);

  // Articles are often dropped in the option text ("a dog" vs "dog").
  variants.add(plain.replace(/^(a|an|the)\s+/, ""));

  const digits = plain.match(/\d+/g) ?? [];
  digits.forEach(digit => {
    variants.add(plain.replace(digit, numberToWords(Number(digit))));
    variants.add(numberToWords(Number(digit)));
  });

  // Action options are spoken with an article ("postpone the meeting").
  variants.add(normaliseText(articleiseAction(answer)));

  timeVariants(answer).forEach(v => variants.add(normaliseText(v)));
  priceVariants(answer).forEach(v => variants.add(normaliseText(v)));

  return [...variants].filter(Boolean);
};

/** True when the transcript states the key in a form a listener can hear. */
export const isAnswerSupported = (transcript: string, answer: string): boolean => {
  const plain = normaliseText(transcript);
  if (!plain) return false;
  return answerVariants(answer).some(variant => variant.length > 0 && plain.includes(variant));
};

/** Negative stems ("What does the centre NOT accept?") must keep every option audible. */
export const isNegativeQuestion = (question: string): boolean =>
  /\bnot\b|\bdoesn't\b|\bdon't\b|\bnever\b|\bfalse\b|\bwrong\b/i.test(question);

/**
 * Text for the audio player: speaker labels such as "Narrator:" or "Teacher:"
 * are layout cues for the printed script, not words a recording says out loud.
 */
export const listeningScriptToSpeech = (passage: string): string =>
  passage
    .replace(/^\s*Listen:\s*/i, "")
    .split(/\n+/)
    .map(line => line.replace(/^\s*['"“]?\s*[A-Z][A-Za-z .']{0,20}?:\s*/, "").trim())
    .filter(Boolean)
    .join("\n")
    .replace(/&/g, "and");

export interface ListeningSpeechTurn {
  speaker: string;
  text: string;
}

/**
 * Preserve turn boundaries for recording playback while removing every label
 * from the text sent to TTS. The labels control pacing only and are never read.
 */
export const listeningScriptTurns = (passage: string): ListeningSpeechTurn[] =>
  passage
    .replace(/^\s*Listen:\s*/i, "")
    .split(/\n+/)
    .map(line => {
      const clean = line.trim().replace(/^[\s'"“]+/, "").replace(/[\s'"”]+$/, "");
      const labelled = clean.match(/^([A-Z][A-Za-z .']{0,20}?):\s*(.+)$/);
      return {
        speaker: labelled?.[1]?.trim() || "Speaker",
        text: (labelled?.[2] || clean).replace(/&/g, "and").trim(),
      };
    })
    .filter(turn => Boolean(turn.text));

/** "postpone meeting" -> "postpone the meeting" so action options read naturally. */
export const articleiseAction = (text: string): string =>
  text.replace(
    /^([a-z]+)\s+(?!(the|a|an|my|your|his|her|our|their|some|any|this|that|to|it)\b)([a-z]+)$/i,
    "$1 the $3"
  );
