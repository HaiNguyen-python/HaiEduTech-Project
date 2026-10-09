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
