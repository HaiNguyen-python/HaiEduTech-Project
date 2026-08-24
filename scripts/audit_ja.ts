import { VOCAB_TOPICS } from "@/data/japanese/vocab";
import { KANJI_GROUPS } from "@/data/japanese/kanji";
import { JA_QUIZ_EXTRA } from "@/data/japanese/quizBank";
import { GREETINGS_EXTRA, COUNTERS, VOCAB_EXTRA, KANJI_EXTRA, DIALOGUES_EXTRA, GRAMMAR_EXTRA, JA_QUIZ } from "@/data/japaneseExpansion";
const seen=new Map<string,string>();
for (const g of [...VOCAB_TOPICS, ...VOCAB_EXTRA] as any[]) for (const it of g.items){
  if(!it.romaji||!it.vi||!it.en) console.log("MISSING field", g.topic, it.jp);
  if(seen.has(it.jp)) console.log("DUP word", it.jp, seen.get(it.jp), "|", g.topic);
  else seen.set(it.jp, g.topic);
}
const ks=new Map<string,string>();
for (const g of [...KANJI_GROUPS] as any[]) for (const k of g.items){
  if(ks.has(k.kanji)) console.log("DUP kanji", k.kanji, ks.get(k.kanji), g.group); else ks.set(k.kanji,g.group);
  if(!k.on||!k.kun||!k.example||!k.meaning_vi) console.log("kanji missing", k.kanji);
}
for (const k of KANJI_EXTRA as any[]) if(ks.has(k.kanji)) console.log("DUP kanji legacy", k.kanji, ks.get(k.kanji));
const allQ=[...JA_QUIZ, ...JA_QUIZ_EXTRA] as any[];
const dist:Record<number,number>={};
allQ.forEach((q,i)=>{
  dist[q.answer]=(dist[q.answer]||0)+1;
  if(q.answer<0||q.answer>=q.options.length) console.log("bad answer idx", i, q.q);
  if(new Set(q.options).size!==q.options.length) console.log("dup options", i, q.q);
  if(!q.explain_vi||!q.explain_en) console.log("no explain", i, q.q);
});
console.log("quiz count", allQ.length, "answer dist", dist);
console.log("vocab words", seen.size, "kanji", ks.size);
const dq=new Map<string,number>(); allQ.forEach((q,i)=>{ if(dq.has(q.q)) console.log("DUP question", q.q); else dq.set(q.q,i);});
for (const d of [...DIALOGUES_EXTRA] as any[]) d.lines.forEach((l:any)=>{ if(!l.romaji||!l.vi||!l.en) console.log("dlg missing", d.title, l.jp); });
for (const g of GRAMMAR_EXTRA as any[]) if(!g.examples?.length) console.log("grammar no ex", g.title);
console.log("dialogues", DIALOGUES_EXTRA.length, "grammar", GRAMMAR_EXTRA.length, "greetings", GREETINGS_EXTRA.length, "counters", COUNTERS.length);
