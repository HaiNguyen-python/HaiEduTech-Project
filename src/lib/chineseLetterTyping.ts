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

/** One active syllable maps to one Hanzi, never to Latin-letter positions. */
export function activePinyinIndex(target: string, typed: string, draft = ""): number | null {
  const trailing = typed.match(/[a-züvāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ'’\s1-5]+$/iu)?.[0] ?? "";
  let remaining = plainPinyin(draft || trailing);
  if (!remaining) return null;
  const prefix = normalizeLetterTyping(typed.slice(0, typed.length - trailing.length));
  const syllables = pinyin(normalizeLetterTyping(target), { toneType: "none", type: "array" });
  let index = prefix.length;
  while (index < syllables.length) {
    const syllable = plainPinyin(syllables[index]);
    if (remaining === syllable || syllable.startsWith(remaining)) return index;
    if (!remaining.startsWith(syllable) || !syllable) return index;
    remaining = remaining.slice(syllable.length);
    index++;
  }
  return null;
}
