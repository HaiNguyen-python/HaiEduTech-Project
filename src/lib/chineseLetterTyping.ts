import { pinyin } from "pinyin-pro";

/** Punctuation remains visible, but only Hanzi/text advances the typing cursor. */
const IGNORED_TYPING_CHARACTERS = /[\s，。！？、；：,.!?;:"“”‘’（）()…—\-·《》]/g;

export const normalizeLetterTyping = (text: string): string =>
  text.replace(IGNORED_TYPING_CHARACTERS, "");

export function letterDisplayCharacters(text: string) {
  let typingIndex = 0;
  return Array.from(text).map((character) => ({
    character,
    typingIndex: normalizeLetterTyping(character) ? typingIndex++ : null,
  }));
}
/** Fallback for keyboards exposing trailing Pinyin without composition events. */
export const liveChineseTyping = (text: string): string =>
  normalizeLetterTyping(text.replace(/[a-züv\u0300-\u036fāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ'’]+$/iu, ""));

const plainPinyin = (text: string) => text.toLowerCase().replace(/ü/g, "v")
  .normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/u:/g, "v")
  .replace(/[\s'’1-5]/g, "");

const LATIN = /[a-züvāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/iu;
const LATIN_RUN = /[a-züvāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ'’\s1-5]/iu;

export type ChineseTypingResolution = {
  /** Hanzi typed so far; Pinyin syllables that match the target count as their Hanzi. */
  chars: string[];
  /** Hanzi currently being typed as Pinyin, if any. */
  active: number | null;
  /** True when the pending Pinyin cannot continue the expected syllable. */
  pendingError: boolean;
  complete: boolean;
};

/** Resolve committed Hanzi plus Pinyin (draft or committed Latin letters) against the target. */
export function resolveChineseTyping(target: string, typed: string, draft = ""): ChineseTypingResolution {
  const goal = Array.from(normalizeLetterTyping(target));
  const syllables = goal.length ? pinyin(goal.join(""), { toneType: "none", type: "array" }).map(plainPinyin) : [];
  const source = Array.from(draft && !typed.includes(draft) ? typed + draft : typed);
  const chars: string[] = [];
  let active: number | null = null;
  let pendingError = false;
  for (let i = 0; i < source.length; ) {
    const c = source[i];
    if (!LATIN.test(c)) {
      if (normalizeLetterTyping(c)) { chars.push(c); active = null; pendingError = false; }
      i++;
      continue;
    }
    let j = i;
    while (j < source.length && LATIN_RUN.test(source[j])) j++;
    let rest = plainPinyin(source.slice(i, j).join(""));
    let matched = 0;
    while (rest && chars.length < goal.length) {
      const syllable = syllables[chars.length];
      if (!syllable || !rest.startsWith(syllable)) break;
      chars.push(goal[chars.length]);
      rest = rest.slice(syllable.length);
      matched++;
    }
    if (rest && chars.length < goal.length) {
      active = chars.length;
      pendingError = !(syllables[chars.length] ?? "").startsWith(rest);
    } else {
      active = matched ? chars.length - 1 : null;
      pendingError = false;
    }
    i = j;
  }
  return { chars, active, pendingError, complete: goal.length > 0 && chars.length >= goal.length };
}

/** One active syllable maps to one Hanzi, never to Latin-letter positions. */
export function activePinyinIndex(target: string, typed: string, draft = ""): number | null {
  return resolveChineseTyping(target, typed, draft).active;
}
