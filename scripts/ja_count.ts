import { VOCAB_EXTRA_5, KANJI_EXTRA_5 } from "../src/data/japanese/expansion5";
import { GRAMMAR_EXTRA_6, DIALOGUES_EXTRA_6, JA_QUIZ_EXTRA_6 } from "../src/data/japanese/expansion6";
const words = VOCAB_EXTRA_5.flatMap(t=>t.items);
const dupW = words.map(w=>w.jp).filter((v,i,a)=>a.indexOf(v)!==i);
const dupK = KANJI_EXTRA_5.map(k=>k.kanji).filter((v,i,a)=>a.indexOf(v)!==i);
const badQ = JA_QUIZ_EXTRA_6.filter(q=>q.options.length!==4||q.answer<0||q.answer>3||new Set(q.options).size!==4);
const badG = GRAMMAR_EXTRA_6.filter(g=>!g.examples.length||g.examples.some(e=>!e.jp||!e.vi||!e.en||!e.romaji));
const badD = DIALOGUES_EXTRA_6.filter(d=>d.lines.length<6||d.lines.some(l=>!l.jp||!l.vi||!l.en));
const nonJa = [...words.map(w=>w.jp), ...GRAMMAR_EXTRA_6.flatMap(g=>g.examples.map(e=>e.jp)), ...DIALOGUES_EXTRA_6.flatMap(d=>d.lines.map(l=>l.jp))]
  .filter(s=>!/[\u3040-\u30ff\u4e00-\u9faf]/.test(s) || /[\u0400-\u04ff]/.test(s));
console.log({words: words.length, kanji: KANJI_EXTRA_5.length, grammar: GRAMMAR_EXTRA_6.length, dialogues: DIALOGUES_EXTRA_6.length, quiz: JA_QUIZ_EXTRA_6.length});
console.log({dupW, dupK, badQ: badQ.map(q=>q.q), badG: badG.map(g=>g.title), badD: badD.map(d=>d.title), nonJa});
