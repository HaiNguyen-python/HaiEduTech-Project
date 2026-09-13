export type SoundCoachCategory = "mouth" | "tongue" | "air" | "length" | "tone" | "ending" | "general";

export interface WordDifference {
  prefix: string;
  focus: string;
  suffix: string;
}

const LATIN_WORD = /^[\p{Script=Latin}\p{M}'’-]+$/u;

export function splitWordDifference(word: string, other: string): WordDifference | null {
  if (!LATIN_WORD.test(word) || !LATIN_WORD.test(other) || word === other) return null;

  let prefixLength = 0;
  while (
    prefixLength < word.length &&
    prefixLength < other.length &&
    word[prefixLength]?.toLocaleLowerCase() === other[prefixLength]?.toLocaleLowerCase()
  ) {
    prefixLength += 1;
  }

  let suffixLength = 0;
  while (
    suffixLength < word.length - prefixLength &&
    suffixLength < other.length - prefixLength &&
    word[word.length - 1 - suffixLength]?.toLocaleLowerCase() === other[other.length - 1 - suffixLength]?.toLocaleLowerCase()
  ) {
    suffixLength += 1;
  }

  const focusEnd = suffixLength ? word.length - suffixLength : word.length;
  const focus = word.slice(prefixLength, focusEnd);
  if (!focus) return null;
  return {
    prefix: word.slice(0, prefixLength),
    focus,
    suffix: word.slice(focusEnd),
  };
}

export function classifySoundTip(sound: string, tipVi: string, tipEn: string): SoundCoachCategory {
  const text = `${sound} ${tipVi} ${tipEn}`.toLocaleLowerCase();
  if (/tone|thanh|pitch|cao độ|accent/.test(text)) return "tone";
  if (/long|short|length|dài|ngắn|double|gấp đôi|nhịp/.test(text)) return "length";
  if (/final|âm cuối|ending/.test(text)) return "ending";
  if (/tongue|lưỡi|retroflex|gum|nướu|teeth|răng/.test(text)) return "tongue";
  if (/air|hơi|aspirat|voiced|rung|breath/.test(text)) return "air";
  if (/lip|môi|mouth|miệng|open|tròn/.test(text)) return "mouth";
  return "general";
}

export function shouldRecordWeakSound(bestAttemptCorrect: boolean): boolean {
  return !bestAttemptCorrect;
}