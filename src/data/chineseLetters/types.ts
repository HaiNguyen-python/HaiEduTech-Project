export interface ZhLetterWord { w: string; py: string; vi: string; lv: number }
export interface ZhLetter {
  id: string;
  vol: 1 | 2;
  /** Letter number or title from the book. */
  label: string;
  zh: string;
  pinyin: string;
  vi: string;
  level: "1-2" | "3-4" | "5-6" | string;
  /** HSK keywords found in the letter, hardest first. */
  words: ZhLetterWord[];
}
