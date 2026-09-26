/** Curated, meaning-checked IELTS vocabulary photographs. Add new words only after visual review. */
const curatedWords = [
  "commerce", "academic", "curriculum", "literacy", "pedagogy", "scholarship", "seminar", "thesis",
  "algorithm", "encryption", "cybersecurity", "database", "robotics", "biotechnology", "automation", "bandwidth",
  "biodiversity", "pollution", "hypothesis", "assessment", "innovation", "graduate", "tuition", "plagiarism",
] as const;

const files = import.meta.glob<string>("../assets/ielts-vocab/*.jpg", { eager: true, query: "?url", import: "default" });
const images = Object.fromEntries(curatedWords.map(word => [word, files[`../assets/ielts-vocab/${word}.jpg`]]));

export function getIeltsVocabIllustration(word: string): string | undefined {
  return images[word.trim().toLowerCase()];
}