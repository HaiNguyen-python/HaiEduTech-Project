import { PARAPHRASE_BANK, PARA_TOPICS } from "../src/data/ieltsParaphraseBank";
const issues: string[] = [];
const ids = new Set<string>(), srcs = new Set<string>();
for (const it of PARAPHRASE_BANK) {
  if (ids.has(it.id)) issues.push(`dup id ${it.id}`); ids.add(it.id);
  const s = it.source.toLowerCase();
  if (srcs.has(s)) issues.push(`dup source ${it.id}`); srcs.add(s);
  const all = [it.source, it.vi, it.models.B2, it.models.C1, it.models.C2];
  if (all.some((x) => !x?.trim())) issues.push(`empty ${it.id}`);
  if (all.some((x) => x.includes("—"))) issues.push(`em-dash ${it.id}`);
  (["B2", "C1", "C2"] as const).forEach((l) => { if (it.models[l].toLowerCase() === s) issues.push(`model same as source ${it.id} ${l}`); });
  if (!it.techniques.length) issues.push(`no techniques ${it.id}`);
}
for (const t of [1, 2] as const) for (const tp of PARA_TOPICS[t]) {
  const n = PARAPHRASE_BANK.filter((i) => i.task === t && i.topic === tp.key).length;
  if (n < 8) issues.push(`T${t} ${tp.key} only ${n}`);
}
console.log(`items=${PARAPHRASE_BANK.length} issues=${issues.length}`);
issues.forEach((i) => console.log(i));
