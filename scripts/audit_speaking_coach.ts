import { speakingCoachLanguages } from "../src/data/speakingCoachData";
import { speakingMinimalPairs } from "../src/data/speakingMinimalPairs";
import { speakingFreeTalkTopics, fillerPatterns } from "../src/data/speakingFreeTalkTopics";
import { existsSync } from "node:fs";

const langs = Object.keys(speakingCoachLanguages);
let problems = 0;
const p = (m: string) => { problems++; console.log("ISSUE:", m); };

for (const l of langs) {
  const cfg = (speakingCoachLanguages as any)[l];
  const themes = cfg.themes ?? [];
  const sentences = themes.flatMap((t: any) => t.sentences);
  console.log(`${l}: themes=${themes.length} sentences=${sentences.length} pairs=${(speakingMinimalPairs as any)[l]?.length ?? 0} topics=${(speakingFreeTalkTopics as any)[l]?.length ?? 0} fillers=${(fillerPatterns as any)[l]?.length ?? 0}`);
  if (!(speakingMinimalPairs as any)[l]?.length) p(`${l}: no minimal pairs`);
  if (!(speakingFreeTalkTopics as any)[l]?.length) p(`${l}: no free talk topics`);
  if (!(fillerPatterns as any)[l]?.length) p(`${l}: no filler patterns`);

  // duplicate ids
  const tids = new Map<string, number>();
  themes.forEach((t: any) => tids.set(t.id, (tids.get(t.id) ?? 0) + 1));
  [...tids].filter(([, c]) => c > 1).forEach(([id]) => p(`${l}: duplicate theme id ${id}`));
  const sids = new Map<string, number>();
  sentences.forEach((s: any) => sids.set(s.id, (sids.get(s.id) ?? 0) + 1));
  [...sids].filter(([, c]) => c > 1).forEach(([id]) => p(`${l}: duplicate sentence id ${id}`));
  sentences.forEach((s: any) => {
    if (!s.text?.trim()) p(`${l}: empty text ${s.id}`);
    if (!s.translation?.trim()) p(`${l}: missing translation ${s.id}`);
  });
  const textSeen = new Map<string, string>();
  sentences.forEach((s: any) => {
    const normalized = String(s.text ?? "").toLocaleLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
    const previous = textSeen.get(normalized);
    if (previous) p(`${l}: duplicate sentence text ${previous} / ${s.id}`);
    else if (normalized) textSeen.set(normalized, s.id);
  });
  themes.forEach((t: any) => { if ((t.sentences?.length ?? 0) < 6) p(`${l}: theme ${t.id} has ${t.sentences?.length} sentences`); });

  // every theme name must appear exactly once per language
  const normName = (s: string) => String(s ?? "").toLocaleLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
  const nameSeen = new Map<string, string>();
  const nameViSeen = new Map<string, string>();
  themes.forEach((t: any) => {
    const en = normName(t.name);
    const vi = normName(t.nameVi);
    if (nameSeen.has(en)) p(`${l}: duplicate theme name "${t.name}" (${nameSeen.get(en)} / ${t.id})`);
    else nameSeen.set(en, t.id);
    if (nameViSeen.has(vi)) p(`${l}: duplicate theme nameVi "${t.nameVi}" (${nameViSeen.get(vi)} / ${t.id})`);
    else nameViSeen.set(vi, t.id);
  });

  // topic levels
  const levels = new Set((((speakingFreeTalkTopics as any)[l]) ?? []).map((t: any) => t.level));
  ["A1","A2","B1","B2","C1"].forEach(lv => { if (!levels.has(lv)) p(`${l}: free talk missing level ${lv}`); });
  (((speakingFreeTalkTopics as any)[l]) ?? []).forEach((t: any) => {
    if (!t.id?.trim() || !t.level) p(`${l}: free talk topic missing id/level`);
    if (!t.prompt || !t.promptVi) p(`${l}: topic ${t.id} missing prompt/promptVi`);
    if (!t.ideas?.length) p(`${l}: topic ${t.id} no ideas`);
    if (t.ideas?.some((idea: unknown) => typeof idea !== "string" || !idea.trim())) p(`${l}: topic ${t.id} has invalid ideas`);
  });

  // minimal pairs
  const pairs = ((speakingMinimalPairs as any)[l]) ?? [];
  const pid = new Set<string>();
  pairs.forEach((x: any) => {
    if (pid.has(x.id)) p(`${l}: duplicate pair id ${x.id}`); pid.add(x.id);
    if (x.a === x.b) p(`${l}: pair ${x.id} identical words`);
    if (!x.tipVi || !x.tipEn) p(`${l}: pair ${x.id} missing tips`);
    if (!x.sound) p(`${l}: pair ${x.id} missing sound label`);
    if (!x.a?.trim() || !x.b?.trim()) p(`${l}: pair ${x.id} missing a word`);
    if (l === "english" && (!x.aIpa || !x.bIpa)) p(`${l}: pair ${x.id} missing IPA`);
  });
  const seenWords = new Map<string,string>();
  pairs.forEach((x:any)=>{ const k = `${x.a}|${x.b}`; if (seenWords.has(k)) p(`${l}: duplicate pair words ${k}`); seenWords.set(k,x.id); });
}
[
  "greetings", "daily-life", "travel", "work", "education", "health",
  "technology", "nature", "food", "culture", "shopping", "community",
].forEach((name) => {
  if (!existsSync(new URL(`../src/assets/speaking-chibi-${name}.jpg`, import.meta.url))) {
    p(`missing speaking illustration: ${name}`);
  }
});
console.log(problems ? `\n${problems} problems` : "\nOK - no problems found");
