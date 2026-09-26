// Audit the IELTS Writing prompt bank. Run: bunx tsx scripts/audit_ielts_writing_prompts.ts
import { writingPrompts } from "../src/data/ieltsWritingPrompts";

const issues: string[] = [];
const MIN = 8;
const ids = new Map<string, number>();
const counts: Record<string, number> = {};
const words = (s: string) => new Set(s.toLowerCase().replace(/[^a-z\s]/g, " ").split(/\s+/).filter((w) => w.length > 3));

for (const p of writingPrompts) {
  ids.set(p.id, (ids.get(p.id) || 0) + 1);
  const type = p.taskType === 1 ? (p.chartType === "line" || p.chartData?.chart_type === "area" ? "line" : p.chartType) : p.essayType;
  const key = `T${p.taskType}:${type}`;
  counts[key] = (counts[key] || 0) + 1;
  if (!p.prompt?.trim()) issues.push(`${p.id}: empty prompt`);
  if (p.prompt.includes("—")) issues.push(`${p.id}: em-dash in prompt`);
  if (/[ăâđêôơưạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]/i.test(p.prompt)) issues.push(`${p.id}: Vietnamese in prompt`);
  if (p.writingGuide.length < 4) issues.push(`${p.id}: guide < 4`);
  if (p.vocabularyBank.length < 6) issues.push(`${p.id}: vocab < 6`);
  if (p.brainstormingIdeas.length < 4) issues.push(`${p.id}: ideas < 4`);
  if (p.taskType === 1) {
    if (p.chartType === "process") {
      const n = p.processData?.steps.length ?? 0;
      if (n < 5 || n > 12) issues.push(`${p.id}: process needs 5-12 steps (has ${n})`);
    } else if (p.chartType === "map") {
      if (!p.mapData || p.mapData.before.elements.length < 2 || p.mapData.after.elements.length < 2) issues.push(`${p.id}: missing map`);
    } else {
      for (const c of [p.chartData, p.chartData2].filter(Boolean)) {
        if (!c!.data.length) issues.push(`${p.id}: empty chart`);
        for (const r of c!.data) {
          if (r[c!.x_axis] === undefined) issues.push(`${p.id}: row without x label`);
          for (const s of c!.series) if (typeof r[s] !== "number") issues.push(`${p.id}: ${s} not numeric`);
        }
        if (c!.chart_type === "pie") {
          const sum = c!.data.reduce((a, r) => a + Number(r[c!.series[0]]), 0);
          if (Math.abs(sum - 100) > 1) issues.push(`${p.id}: pie "${c!.title}" sums to ${sum}`);
        }
      }
      if (!p.chartData) issues.push(`${p.id}: no chart data`);
    }
  }
}
for (const [id, c] of ids) if (c > 1) issues.push(`duplicate id ${id}`);
for (let i = 0; i < writingPrompts.length; i++) for (let j = i + 1; j < writingPrompts.length; j++) {
  const a = words(writingPrompts[i].prompt), b = words(writingPrompts[j].prompt);
  const inter = [...a].filter((w) => b.has(w)).length;
  const sim = inter / Math.min(a.size, b.size);
  if (sim > 0.7) issues.push(`near-duplicate: ${writingPrompts[i].id} ~ ${writingPrompts[j].id} (${sim.toFixed(2)})`);
}
for (const k of ["T1:bar", "T1:line", "T1:pie", "T1:table", "T1:map", "T1:process", "T2:opinion", "T2:discussion", "T2:advantage-disadvantage", "T2:problem-solution", "T2:direct-question"])
  if ((counts[k] || 0) < MIN) issues.push(`${k}: only ${counts[k] || 0} prompts`);

console.log(`Prompts: ${writingPrompts.length}`, counts);
console.log(`Issues: ${issues.length}`);
issues.forEach((i) => console.log(" -", i));
if (issues.length) process.exitCode = 1;
