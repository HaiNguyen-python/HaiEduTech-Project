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