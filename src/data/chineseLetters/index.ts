export type { ZhLetter, ZhLetterWord } from "./types";
import type { ZhLetter } from "./types";

export const LETTER_PARTS = 3;

/** Loads all letters lazily so the book is only downloaded when the tab is opened. */
export const loadLetters = async (): Promise<ZhLetter[]> => {
  const mods = await Promise.all([
    import("./part01"),
    import("./part02"),
    import("./part03"),
  ]);
  return mods.flatMap((m) => m.letters);
};
