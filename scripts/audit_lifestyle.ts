import { LIFESTYLE_LESSONS as lifestyleLessons } from "../src/data/lifestyleAcademyLessons";
const all = lifestyleLessons as any[];
const byPillar: Record<string, any[]> = {};
const ids = new Set<string>();
const issues: string[] = [];
for (const l of all) {
  (byPillar[l.pillar] ||= []).push(l);
  if (ids.has(l.id)) issues.push(`dup id ${l.id}`);
  ids.add(l.id);
  if (!l.takeaways || l.takeaways.length < 3) issues.push(`${l.id}: <3 takeaways`);
  if (!l.deepDiveVi || !l.deepDiveEn) issues.push(`${l.id}: no deep dive`);
  else if (l.deepDiveVi.length !== l.deepDiveEn.length) issues.push(`${l.id}: deep dive length mismatch`);
  if (!l.whyItMattersVi || !l.whyItMattersEn) issues.push(`${l.id}: no whyItMatters`);
  if (!l.illustrationEmojis || l.illustrationEmojis.length === 0) issues.push(`${l.id}: no emojis`);
  for (const k of ["titleVi","titleEn","subtitleVi","subtitleEn","frameworkVi","frameworkEn","reflectionVi","reflectionEn","drillVi","drillEn"]) {
    if (!l[k] || String(l[k]).trim().length < 8) issues.push(`${l.id}: weak ${k}`);
  }
  if ((l.takeaways||[]).some((t:any)=>!t.vi||!t.en)) issues.push(`${l.id}: takeaway missing lang`);
  if (String(JSON.stringify(l)).includes("—")) issues.push(`${l.id}: em-dash`);
  if (!l.minutes || l.minutes < 4) issues.push(`${l.id}: minutes`);
}
const PILLARS = ["finance","etiquette","presence","wellness","selfstudy","partying"];
for (const p of PILLARS) if (!byPillar[p]) issues.push(`missing pillar ${p}`);
if (all.length !== 102) issues.push(`expected 102 lessons, got ${all.length}`);
for (const l of all) if (l.pillar === "partying" && (!l.safetyNotesVi || !l.safetyNotesEn)) issues.push(`${l.id}: no safety note`);
console.log("total", all.length);
for (const [k,v] of Object.entries(byPillar)) {
  const lv: Record<string,number> = {};
  v.forEach(l => lv[l.level]=(lv[l.level]||0)+1);
  console.log(k, v.length, JSON.stringify(lv));
}
console.log("issues", issues.length);
const counts: Record<string,number> = {};
issues.forEach(i => { const k = i.split(": ")[1] || i; counts[k]=(counts[k]||0)+1; });
console.log(counts);
console.log(issues.slice(0,25).join("\n"));
