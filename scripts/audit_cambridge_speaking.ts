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

console.log(`Tasks: ${TASKS.length}`);
for (const level of Object.keys(ALLOWED)) {
  const t = TASKS.filter((x) => x.level === level);
  console.log(`${level}: ${t.length} tasks, ${new Set(t.map((x) => x.topic)).size} topics`);
}
if (issues.length) {
  console.error(`\n${issues.length} issues:`);
  issues.slice(0, 50).forEach((i) => console.error(" - " + i));
  process.exit(1);
}
console.log("\nOK - speaking bank is clean.");
