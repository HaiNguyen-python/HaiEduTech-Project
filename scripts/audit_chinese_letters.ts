// Run: bun scripts/audit_chinese_letters.ts
import { loadLetters } from "../src/data/chineseLetters";

const letters = await loadLetters();
const issues: string[] = [];
const ids = new Set<string>(); const texts = new Set<string>();
for (const l of letters) {
  if (ids.has(l.id)) issues.push(`dup id ${l.id}`); ids.add(l.id);
  if (texts.has(l.zh)) issues.push(`dup text ${l.id}`); texts.add(l.zh);
  if (!l.zh.trim() || !l.pinyin.trim() || !l.vi.trim()) issues.push(`${l.id}: missing part`);
  const han = (l.zh.match(/[\u4e00-\u9fff]/g) ?? []).length;
  const syl = l.pinyin.split(/[\s，。！？、；：,.!?;:“”（）()]+/).filter((s) => /[a-zü]/i.test(s)).length;
  if (Math.abs(han - syl) > 2) issues.push(`${l.id}: pinyin ${syl} vs hanzi ${han}`);
  for (const w of l.words) if (!l.zh.includes(w.w)) issues.push(`${l.id}: keyword ${w.w} not in letter`);
  if (/[—–]/.test(l.zh + l.vi + l.words.map((w) => w.vi).join(""))) issues.push(`${l.id}: em-dash`);
  if (!["1-2", "3-4", "5-6"].includes(l.level)) issues.push(`${l.id}: bad level`);
}
console.log(`Letters: ${letters.length}. Issues: ${issues.length}`);
issues.forEach((i) => console.log(" -", i));
if (issues.length) process.exitCode = 1;
