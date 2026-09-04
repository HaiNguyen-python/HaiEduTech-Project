import { speakingPracticeData } from "../src/data/speakingPracticeData";
const stem = (w: string) => w.replace(/(ing|ies|ed|es|s)$/, "");
for (const part of [1,2,3] as const) for (const q of speakingPracticeData[`part${part}`]) {
  const vb = q.useful_language.vocabulary_bank||[];
  const ans = q.model_answer.toLowerCase();
  const used = vb.some(v => { const ws = v.phrase.toLowerCase().replace(/^(to|a|an|the)\s+/,"").split(/[^a-z']+/).filter(w=>w.length>3&&!["your","something","someone"].includes(w)); return ws.some(w=>ans.includes(stem(w))); });
  if (!used) console.log(`### ${q.id}\nQ: ${q.question}\nA: ${q.model_answer}\nBANK: ${vb.map(v=>v.phrase).join(" / ")}`);
}
