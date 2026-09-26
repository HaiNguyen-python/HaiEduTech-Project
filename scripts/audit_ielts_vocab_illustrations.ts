import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { ieltsVocabData } from "../src/data/ieltsVocabData";
import { curatedIeltsWords } from "../src/lib/ieltsVocabIllustrations";

const directory = join(import.meta.dir, "../src/assets/ielts-vocab");
const words = new Set(ieltsVocabData.map(item => item.word.trim().toLowerCase()));
const curated = new Set(curatedIeltsWords);
const files = readdirSync(directory).filter(name => name.endsWith(".jpg"));
const problems: string[] = [];

if (curated.size !== curatedIeltsWords.length) problems.push("Duplicate word in curated list");
for (const word of curated) {
  if (!words.has(word)) problems.push(`Unknown vocabulary word: ${word}`);
  const filename = `${word}.jpg`;
  if (!existsSync(join(directory, filename))) problems.push(`Missing image: ${filename}`);
  else if (readFileSync(join(directory, filename)).length < 10_000) problems.push(`Suspiciously small image: ${filename}`);
}
for (const file of files) if (!curated.has(file.slice(0, -4))) problems.push(`Unmapped image: ${file}`);

console.log(`IELTS vocabulary illustrations: ${curated.size}/${words.size} distinct words covered; ${problems.length} mapping/file errors`);
for (const problem of problems) console.error(problem);
if (problems.length) process.exitCode = 1;