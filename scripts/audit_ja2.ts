import { VOCAB_TOPICS } from "@/data/japanese/vocab";
import { KANJI_GROUPS } from "@/data/japanese/kanji";
import { JA_QUIZ_EXTRA } from "@/data/japanese/quizBank";
import { GREETINGS_EXTRA, COUNTERS, VOCAB_EXTRA, KANJI_EXTRA, DIALOGUES_EXTRA, GRAMMAR_EXTRA, JA_QUIZ } from "@/data/japaneseExpansion";
import { VOCAB_EXTRA_2, KANJI_EXTRA_2, DIALOGUES_EXTRA_2, GRAMMAR_EXTRA_2, JA_QUIZ_EXTRA_2 } from "@/data/japanese/expansion2";
import { VOCAB_EXTRA_3, KANJI_EXTRA_3 } from "@/data/japanese/expansion3";
import { GRAMMAR_EXTRA_3, DIALOGUES_EXTRA_3, JA_QUIZ_EXTRA_3 } from "@/data/japanese/expansion4";
import { VOCAB_EXTRA_5, KANJI_EXTRA_5 } from "@/data/japanese/expansion5";
import { GRAMMAR_EXTRA_6_PACK, DIALOGUES_EXTRA_6_PACK, JA_QUIZ_EXTRA_6_PACK } from "@/data/japanese/expansion6";
import { JA_LISTENING, JA_DICTATION } from "@/data/japanese/practice";
import { JA_MOCK_EXAMS } from "@/data/japanese/jlptExams";
import { JA_CULTURE } from "@/data/japanese/culture";

let issues = 0;
const bad = (m: string) => { issues++; console.log("ISSUE:", m); };
const words = new Map<string,string>();
for (const g of [...VOCAB_TOPICS, ...VOCAB_EXTRA, ...VOCAB_EXTRA_2, ...VOCAB_EXTRA_3, ...VOCAB_EXTRA_5] as any[])
  for (const it of g.items) {
    if (!it.romaji || !it.vi || !it.en) bad(`vocab missing ${g.topic} ${it.jp}`);
    if (words.has(it.jp)) bad(`dup word ${it.jp} (${words.get(it.jp)} / ${g.topic})`); else words.set(it.jp, g.topic);
  }
const ks = new Map<string,string>();
for (const k of [...KANJI_GROUPS.flatMap((g:any)=>g.items), ...KANJI_EXTRA, ...KANJI_EXTRA_2, ...KANJI_EXTRA_3, ...KANJI_EXTRA_5] as any[]) {
  if (ks.has(k.kanji)) bad(`dup kanji ${k.kanji}`); else ks.set(k.kanji, "x");
  if (!k.on || !k.kun || !k.meaning_vi || !k.meaning_en) bad(`kanji missing fields ${k.kanji}`);
  if (!/^[\u4e00-\u9fff]$/.test(k.kanji)) bad(`kanji not single han char: ${k.kanji}`);
}
const allQ = [...JA_QUIZ, ...JA_QUIZ_EXTRA, ...JA_QUIZ_EXTRA_2, ...JA_QUIZ_EXTRA_3, ...JA_QUIZ_EXTRA_6_PACK] as any[];
const dist: Record<number, number> = {};
const qs = new Set<string>();
allQ.forEach((q) => {
  dist[q.answer] = (dist[q.answer] || 0) + 1;
  if (q.answer < 0 || q.answer >= q.options.length) bad(`bad answer idx ${q.q}`);
  if (new Set(q.options).size !== q.options.length) bad(`dup options ${q.q}`);
  if (!q.explain_vi || !q.explain_en) bad(`quiz no explain ${q.q}`);
  if (qs.has(q.q)) bad(`dup question ${q.q}`); else qs.add(q.q);
});
const dlgs = [...DIALOGUES_EXTRA, ...DIALOGUES_EXTRA_2, ...DIALOGUES_EXTRA_3, ...DIALOGUES_EXTRA_6_PACK] as any[];
for (const d of dlgs) d.lines.forEach((l:any)=>{ if(!l.romaji||!l.vi||!l.en) bad(`dlg missing ${d.title} ${l.jp}`); });
for (const g of [...GRAMMAR_EXTRA, ...GRAMMAR_EXTRA_2, ...GRAMMAR_EXTRA_3, ...GRAMMAR_EXTRA_6_PACK] as any[]) if(!g.examples?.length) bad(`grammar no ex ${g.title}`);
for (const l of JA_LISTENING) { if(!l.romaji||!l.explain_vi||!l.explain_en) bad(`listening missing ${l.id}`); if(l.answer>=l.options.length) bad(`listening idx ${l.id}`); }
for (const d of JA_DICTATION) if(!d.kana||!d.romaji||!d.vi||!d.en) bad(`dictation missing ${d.id}`);
const examIds = new Set<string>();
for (const e of JA_MOCK_EXAMS) {
  if (examIds.has(e.id)) bad(`dup exam ${e.id}`); else examIds.add(e.id);
  e.questions.forEach((q,i)=>{ if(!q.explain_vi||!q.explain_en) bad(`exam ${e.id} q${i} no explain`); if(q.answer>=q.options.length) bad(`exam ${e.id} q${i} idx`); });
}
for (const c of JA_CULTURE) { if(!c.body_vi?.length||!c.body_en?.length) bad(`culture ${c.id}`); (c.phrases||[]).forEach(p=>{ if(!p.romaji||!p.vi||!p.en) bad(`culture phrase ${c.id} ${p.jp}`); }); }
console.log({ words: words.size, kanji: ks.size, quiz: allQ.length, dist, dialogues: dlgs.length, listening: JA_LISTENING.length, dictation: JA_DICTATION.length, exams: JA_MOCK_EXAMS.length, culture: JA_CULTURE.length, greetings: GREETINGS_EXTRA.length, counters: COUNTERS.length });
console.log("TOTAL ISSUES", issues);
