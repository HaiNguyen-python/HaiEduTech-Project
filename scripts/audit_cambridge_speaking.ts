/**
 * Guardrail for the Cambridge Speaking Practice bank.
 * Run: bunx tsx scripts/audit_cambridge_speaking.ts
 * Fails when the bank breaks official exam structure, repeats prompts, or
 * shows a picture that does not match the question.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { existsSync } from "node:fs";
import { cleanCambridgeSpeakingTasks as TASKS } from "../src/data/cambridgeSpeakingTasks";
import { speakingImageMap } from "../src/data/cambridgeSpeakingImageMap";

const ALLOWED: Record<string, string[]> = {
  starters: ["Part 1 - Scene card", "Part 2 - Object cards", "Part 3 - Personal questions"],
  movers: ["Part 1 - Find the differences", "Part 2 - Picture story", "Part 3 - Odd one out", "Part 4 - Personal questions"],
  flyers: ["Part 1 - Find the differences", "Part 2 - Information exchange", "Part 3 - Picture story", "Part 4 - Personal questions"],
  ket: ["Part 1 - Interview", "Part 2 - Discussion"],
  pet: ["Part 1 - Interview", "Part 2 - Long turn", "Part 3 - Collaborative task", "Part 4 - Discussion"],
};

const issues: string[] = [];
const words = (s: string) => new Set(s.toLowerCase().replace(/[^a-z ]/g, "").split(/\s+/).filter((w) => w.length > 3));
const sim = (a: Set<string>, b: Set<string>) => {
  let hit = 0; a.forEach((w) => { if (b.has(w)) hit++; });
  return hit / Math.max(a.size, b.size, 1);
};

const ids = new Set<string>();
for (const t of TASKS) {
  if (ids.has(t.id)) issues.push(`duplicate id ${t.id}`);
  ids.add(t.id);
  if (!ALLOWED[t.level]?.includes(t.part)) issues.push(`${t.level} ${t.id}: invalid part "${t.part}"`);
  if (!t.usefulLanguage?.length) issues.push(`${t.id}: no useful language`);
  if (!t.sampleAnswer) issues.push(`${t.id}: no sample answer`);
  if (/\b(three|four|five|six|seven|eight)\s+(differences|things that are different)\b/i.test(t.prompt))
    issues.push(`${t.id}: asks for a fixed number of differences`);
  const qs = t.prompt.split(/(?<=\?)\s+/).filter((s) => s.trim().endsWith("?"));
  if ((t.level === "starters" || t.level === "movers") && qs.length > 2)
    issues.push(`${t.id}: too many questions for ${t.level}`);
}

for (const [level, parts] of Object.entries(ALLOWED)) {
  for (const part of parts) {
    const n = TASKS.filter((t) => t.level === level && t.part === part).length;
    if (n < 10) issues.push(`${level} / ${part}: only ${n} tasks (min 10)`);
  }
}

const byBucket = new Map<string, { id: string; w: Set<string> }[]>();
for (const t of TASKS) {
  const key = `${t.level}|${t.part}`;
  const list = byBucket.get(key) ?? [];
  const w = words(t.prompt);
  const near = list.find((o) => sim(o.w, w) >= 0.78);
  if (near) issues.push(`${t.id}: near-duplicate of ${near.id}`);
  list.push({ id: t.id, w });
  byBucket.set(key, list);
}

// ---- Picture mapping -------------------------------------------------
// Every picture is assigned explicitly. The map decides what a task shows,
// so it must exist for picture parts, point at a real asset, use the right
// picture type, and never appear on a text-only card.
const DIFF_PART = /find the differences/i;
const STORY_PART = /picture story/i;
const PICTURE_PART = /find the differences|picture story|scene card|long turn|object cards/i;
const NO_PICTURE_PART = /odd one out|collaborative task|interview|personal questions|information exchange/i;
const imageUse = new Map<string, number>();

for (const t of TASKS) {
  const key = speakingImageMap[t.id];
  if (!key) {
    // Cards that list their items in the prompt ("these games: a kite, a bike
    // and a book") are read from the text, exactly like an odd-one-out card.
    const listsItemsInPrompt = /:\s*(?:a|an|the)\s[^.?]*,\s/i.test(t.prompt);
    if (PICTURE_PART.test(t.part) && !listsItemsInPrompt && !/talk about a book|point to|discuss these/i.test(t.prompt))
      issues.push(`${t.id}: picture part "${t.part}" has no picture assigned`);
    continue;
  }
  if (!existsSync(`src/assets/cambridge-speaking/${key}.jpg`)) issues.push(`${t.id}: picture "${key}" does not exist`);
  if (NO_PICTURE_PART.test(t.part) && !/look at (?:the|this|these)|photo|picture/i.test(t.prompt))
    issues.push(`${t.id}: "${t.part}" should not show a picture`);
  if (DIFF_PART.test(t.part) && !/-diff$/.test(key)) issues.push(`${t.id}: differences task uses non A/B picture "${key}"`);
  if (STORY_PART.test(t.part) && !/-story$|lost-cat$/.test(key)) issues.push(`${t.id}: story task uses non-story picture "${key}"`);
  if (!DIFF_PART.test(t.part) && /-diff$/.test(key)) issues.push(`${t.id}: non-differences task uses an A/B sheet "${key}"`);
  imageUse.set(key, (imageUse.get(key) ?? 0) + 1);
}
for (const [key, n] of imageUse) if (n > 12) issues.push(`picture "${key}" is reused by ${n} tasks (max 12)`);

console.log(`Tasks: ${TASKS.length}`);
for (const level of Object.keys(ALLOWED)) {
  const t = TASKS.filter((x) => x.level === level);
  console.log(`${level}: ${t.length} tasks, ${new Set(t.map((x) => x.topic)).size} topics`);
}
console.log(`Pictures: ${Object.keys(speakingImageMap).length} tasks mapped to ${imageUse.size} images`);
if (issues.length) {
  console.error(`\n${issues.length} issues:`);
  issues.slice(0, 50).forEach((i) => console.error(" - " + i));
  process.exit(1);
}
console.log("\nOK - speaking bank is clean.");
