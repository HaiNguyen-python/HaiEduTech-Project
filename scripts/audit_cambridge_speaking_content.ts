/**
 * @file audit_cambridge_speaking_content.ts
 * @description Audits the Cambridge Speaking Practice bank: repeated follow-up
 *   questions inside a level+topic, missing content fields, and over-used images.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { cleanCambridgeSpeakingTasks as cambridgeSpeakingTasks } from "../src/data/cambridgeSpeakingTasks";
import { speakingImageMap as CAMBRIDGE_SPEAKING_IMAGE_MAP } from "../src/data/cambridgeSpeakingImageMap";

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, " ").trim();
const issues: string[] = [];

// 1. duplicate follow-up questions inside the same level + topic
const seen = new Map<string, Set<string>>();
for (const t of cambridgeSpeakingTasks) {
  const scope = `${t.level}|${norm(t.topic)}`;
  const set = seen.get(scope) ?? new Set<string>();
  for (const q of t.examiner ?? []) {
    const k = norm(q);
    if (set.has(k)) issues.push(`DUP QUESTION [${scope}] ${t.id}: "${q}"`);
    set.add(k);
  }
  seen.set(scope, set);
}

// 2. content completeness
for (const t of cambridgeSpeakingTasks) {
  if ((t.examiner?.length ?? 0) < 3) issues.push(`FEW QUESTIONS ${t.id} (${t.examiner?.length ?? 0})`);
  if ((t.usefulLanguage?.length ?? 0) < 4) issues.push(`FEW PHRASES ${t.id} (${t.usefulLanguage?.length ?? 0})`);
  if (!t.sampleAnswer || t.sampleAnswer.trim().length < 20) issues.push(`WEAK SAMPLE ${t.id}`);
  if (!t.prompt?.trim()) issues.push(`NO PROMPT ${t.id}`);
  if (!t.minSeconds || t.minSeconds < 10) issues.push(`BAD MINSECONDS ${t.id}`);
  for (const q of t.examiner ?? []) {
    if (!/[.?!]$/.test(q.trim())) issues.push(`NO PUNCTUATION ${t.id}: "${q}"`);
  }
}

// 3. image reuse
const usage = new Map<string, string[]>();
const ids = new Set(cambridgeSpeakingTasks.map((t) => t.id));
for (const [taskId, key] of Object.entries(CAMBRIDGE_SPEAKING_IMAGE_MAP)) {
  if (!ids.has(taskId)) issues.push(`IMAGE MAP ORPHAN ${taskId} -> ${key}`);
  usage.set(key, [...(usage.get(key) ?? []), taskId]);
}
const MAX_REUSE = 3;
for (const [key, list] of usage) {
  if (list.length > MAX_REUSE) issues.push(`IMAGE OVERUSED ${key} x${list.length}`);
}

const byLevel: Record<string, number> = {};
for (const t of cambridgeSpeakingTasks) byLevel[t.level] = (byLevel[t.level] ?? 0) + 1;
console.log("tasks", cambridgeSpeakingTasks.length, byLevel);
console.log("mapped tasks", Object.keys(CAMBRIDGE_SPEAKING_IMAGE_MAP).length, "distinct images", usage.size);
console.log(issues.slice(0, 60).join("\n"));
console.log("TOTAL ISSUES", issues.length);
