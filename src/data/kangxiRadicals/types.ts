// Type definitions for the 214 Kangxi Radicals dataset.
// Each radical includes pictographic origin, modern usage notes,
// and example characters that contain the radical.

export interface KangxiRadical {
  /** Radical number (1-214 in the traditional Kangxi order) */
  number: number;
  /** The radical character (e.g. 木) */
  radical: string;
  /** Optional simplified or component variant (e.g. 氵 for 水) */
  variants?: string[];
  /** Pinyin reading with tone marks */
  pinyin: string;
  /** Vietnamese name (Hán-Việt) */
  vietnameseName: string;
  /** English meaning */
  englishName: string;
  /** Number of strokes */
  strokes: number;
  /** Pictographic origin / etymology in Vietnamese */
  originVi: string;
  /** Pictographic origin / etymology in English */
  originEn: string;
  /** Detailed meaning and usage in Vietnamese */
  meaningVi: string;
  /** Detailed meaning and usage in English */
  meaningEn: string;
  /** Mnemonic / memory tip in Vietnamese */
  mnemonicVi: string;
  /** Common position inside compound characters */
  position?: "left" | "right" | "top" | "bottom" | "enclosing" | "any";
  /** Example characters that include this radical */
  examples: KangxiExample[];
  /** Quick category for filtering (Nature, Body, Tool, etc.) */
  category: KangxiCategory;
}

export interface KangxiExample {
  character: string;
  pinyin: string;
  meaningVi: string;
  meaningEn: string;
}

export type KangxiCategory =
  | "Nature"
  | "Body"
  | "Person"
  | "Tool"
  | "Animal"
  | "Plant"
  | "Action"
  | "Number"
  | "Object"
  | "Abstract"
  | "Building"
  | "Food";

export const KANGXI_CATEGORIES: KangxiCategory[] = [
  "Nature",
  "Body",
  "Person",
  "Tool",
  "Animal",
  "Plant",
  "Action",
  "Number",
  "Object",
  "Abstract",
  "Building",
  "Food",
];
