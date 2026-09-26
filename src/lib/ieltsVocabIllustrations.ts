/** Curated, meaning-checked IELTS vocabulary photographs. Add new words only after visual review. */
import { curatedIeltsWords } from "@/data/ieltsVocabIllustrationWords";

const files = import.meta.glob<string>("../assets/ielts-vocab/*.jpg", { eager: true, query: "?url", import: "default" });
const images = Object.fromEntries(curatedIeltsWords.map(word => [word, files[`../assets/ielts-vocab/${word}.jpg`]]));

export function getIeltsVocabIllustration(word: string): string | undefined {
  return images[word.trim().toLowerCase()];
}