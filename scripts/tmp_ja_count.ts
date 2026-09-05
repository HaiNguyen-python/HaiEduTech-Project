import { VOCAB_EXTRA_2, KANJI_EXTRA_2, DIALOGUES_EXTRA_2, GRAMMAR_EXTRA_2, JA_QUIZ_EXTRA_2 } from "../src/data/japanese/expansion2";
import { VOCAB_TOPICS } from "../src/data/japanese/vocab";
import { KANJI_GROUPS } from "../src/data/japanese/kanji";
import { VOCAB_EXTRA, KANJI_EXTRA } from "../src/data/japaneseExpansion";
let issues = 0;
const seenWord = new Set<string>([...VOCAB_TOPICS.flatMap(g=>g.items.map(i=>i.jp)), ...VOCAB_EXTRA.flatMap(g=>g.items.map(i=>i.jp))]);
for (const g of VOCAB_EXTRA_2) for (const it of g.items) {
  if (seenWord.has(it.jp)) { console.log("dup word", it.jp); issues++; }
  seenWord.add(it.jp);
  if (!it.romaji || !it.vi || !it.en) { console.log("empty", it.jp); issues++; }
}
const seenK = new Set<string>([...KANJI_GROUPS.flatMap(g=>g.items.map(i=>i.kanji)), ...KANJI_EXTRA.map(k=>k.kanji)]);
for (const k of KANJI_EXTRA_2) { if (seenK.has(k.kanji)) { console.log("dup kanji", k.kanji); issues++; } seenK.add(k.kanji); }
const qs = new Set<string>();
for (const q of JA_QUIZ_EXTRA_2) {
  if (q.options.length !== 4) { console.log("opts", q.q); issues++; }
  if (q.answer < 0 || q.answer > 3) { console.log("ans", q.q); issues++; }
  if (new Set(q.options).size !== 4) { console.log("dup opts", q.q); issues++; }
  if (qs.has(q.q)) { console.log("dup q", q.q); issues++; }
  qs.add(q.q);
  if (!q.explain_vi || !q.explain_en) { console.log("no explain", q.q); issues++; }
}
for (const g of GRAMMAR_EXTRA_2) if (g.examples.length < 2) { console.log("grammar ex", g.title); issues++; }
for (const d of DIALOGUES_EXTRA_2) if (d.lines.length < 5) { console.log("dialogue lines", d.title); issues++; }
const all = JSON.stringify([VOCAB_EXTRA_2, KANJI_EXTRA_2, DIALOGUES_EXTRA_2, GRAMMAR_EXTRA_2, JA_QUIZ_EXTRA_2]);
if (/[\u2013\u2014]/.test(all)) { console.log("dash found"); issues++; }
const answerSpread = [0,1,2,3].map(i=>JA_QUIZ_EXTRA_2.filter(q=>q.answer===i).length);
console.log("words", VOCAB_EXTRA_2.reduce((n,g)=>n+g.items.length,0), "kanji", KANJI_EXTRA_2.length, "dialogues", DIALOGUES_EXTRA_2.length, "grammar", GRAMMAR_EXTRA_2.length, "quiz", JA_QUIZ_EXTRA_2.length, "spread", answerSpread);
console.log("Issues:", issues);
