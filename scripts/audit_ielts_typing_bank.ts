// Run: bunx tsx scripts/audit_ielts_typing_bank.ts
import { typingSentences, TYPING_CATEGORIES } from "../src/data/ieltsTypingBank";

const issues: string[] = [];
const ids = new Set<string>();
const texts = new Set<string>();
for (const s of typingSentences) {
  if (ids.has(s.id)) issues.push(`dup id ${s.id}`);
  ids.add(s.id);
  const k = s.text.toLowerCase();
  if (texts.has(k)) issues.push(`dup text ${s.id}`);
  texts.add(k);
  if (!s.text.trim() || !s.vi.trim() || !s.structure.trim()) issues.push(`${s.id}: empty field`);
  if (!s.text.toLowerCase().includes(s.structure.toLowerCase())) issues.push(`${s.id}: structure "${s.structure}" not in text`);
  if (/[—–]/.test(s.text + s.vi)) issues.push(`${s.id}: em-dash`);
  if (!["B2", "C1", "C2"].includes(s.level)) issues.push(`${s.id}: bad level`);
  if (!TYPING_CATEGORIES[s.task].some((c) => c.key === s.category)) issues.push(`${s.id}: bad category`);
}
for (const task of [1, 2] as const)
  for (const c of TYPING_CATEGORIES[task]) {
    const n = typingSentences.filter((s) => s.task === task && s.category === c.key).length;
    if (n < 10) issues.push(`T${task} ${c.key}: only ${n}`);
  }
console.log(`Sentences: ${typingSentences.length}. Issues: ${issues.length}`);
issues.forEach((i) => console.log(" -", i));
if (issues.length) process.exitCode = 1;
