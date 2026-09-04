import { speakingPracticeData } from "../src/data/speakingPracticeData";
const issues: string[] = [];
const add = (s: string) => issues.push(s);
for (const part of [1,2,3] as const) {
  for (const q of speakingPracticeData[`part${part}`]) {
    const ul = q.useful_language;
    const vb = ul.vocabulary_bank || [];
    // duplicate phrases inside a question
    const ph = vb.map(v => v.phrase.toLowerCase().trim());
    if (new Set(ph).size !== ph.length) add(`${q.id}: duplicate vocab phrase`);
    for (const v of vb) {
      if (!v.vietnamese || !v.vietnamese.trim()) add(`${q.id}: vocab "${v.phrase}" missing Vietnamese`);
      if (/[\u00C0-\u1EF9]/.test(v.phrase)) add(`${q.id}: vocab phrase has Vietnamese diacritics: ${v.phrase}`);
      if (!/[\u00C0-\u1EF9]/.test(v.vietnamese || "") && (v.vietnamese||"").split(/\s+/).length < 2) add(`${q.id}: suspicious VI gloss "${v.vietnamese}" for "${v.phrase}"`);
    }
    const st = (ul.model_structures||[]).map(s=>s.toLowerCase().trim());
    if (new Set(st).size !== st.length) add(`${q.id}: duplicate structure`);
    const id2 = (ul.brainstorming_ideas||[]).map(s=>s.toLowerCase().trim());
    if (new Set(id2).size !== id2.length) add(`${q.id}: duplicate idea`);
    for (const f of [q.question, q.model_answer, ...st, ...id2]) {
      if (/—|–/.test(f)) add(`${q.id}: dash char in "${f.slice(0,40)}"`);
      if (/\s{2,}/.test(f)) add(`${q.id}: double space in "${f.slice(0,40)}"`);
    }
    // bold markers balanced in model answer
    const stars = (q.model_answer.match(/\*\*/g)||[]).length;
    if (stars % 2 !== 0) add(`${q.id}: unbalanced ** in model answer`);
    // model answer should use at least one target phrase
    const used = vb.some(v => q.model_answer.toLowerCase().includes(v.phrase.toLowerCase().split(" ")[0]));
    if (!used) add(`${q.id}: model answer uses none of the vocab`);
    if (part === 2) {
      if (!q.prompts || q.prompts.length < 3) add(`${q.id}: part2 prompts < 3`);
      if (!/describe|talk about|tell/i.test(q.question)) add(`${q.id}: part2 question not a cue card task`);
    }
    if (!q.topic || !q.topic.trim()) add(`${q.id}: empty topic`);
  }
}
console.log(issues.length ? `${issues.length} issues` : "0 issues");
const byType: Record<string, number> = {};
issues.forEach(i => { const k = i.split(": ")[1]?.split(" ").slice(0,4).join(" ") || i; byType[k]=(byType[k]||0)+1; });
Object.entries(byType).sort((a,b)=>b[1]-a[1]).forEach(([k,v])=>console.log(v, "|", k));
console.log("---samples---");
issues.slice(0,15).forEach(i=>console.log(" -",i));
