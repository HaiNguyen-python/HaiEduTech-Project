/** Audit for new Japanese modules: reading, practice2, verbs, counters, keigo. */
import { JA_READING } from "../src/data/japanese/reading";
import { JA_LISTENING_2, JA_DICTATION_2 } from "../src/data/japanese/practice2";
import { JA_VERBS, JA_VERB_FORM_LABELS } from "../src/data/japanese/verbForms";
import { JA_COUNTERS } from "../src/data/japanese/counters";
import { JA_KEIGO_ROWS, JA_KEIGO_PHRASES } from "../src/data/japanese/keigo";

const issues: string[] = [];
const jp = /[\u3040-\u30ff\u4e00-\u9faf]/;
const bad = /[\u0400-\u04FF\uAC00-\uD7AF]/;

JA_READING.forEach((p) => {
  const n = p.body.length;
  if (!n) issues.push(`${p.id}: empty body`);
  if (p.romaji.length !== n || p.trans_vi.length !== n || p.trans_en.length !== n)
    issues.push(`${p.id}: paragraph arrays mismatch`);
  p.body.forEach((b, i) => { if (!jp.test(b) || bad.test(b)) issues.push(`${p.id} para ${i}: not Japanese`); });
  if (p.vocab.length < 4) issues.push(`${p.id}: too few vocab`);
  if (p.questions.length < 3) issues.push(`${p.id}: too few questions`);
  p.questions.forEach((q, i) => {
    if (q.options.length !== 4) issues.push(`${p.id} q${i}: needs 4 options`);
    if (q.answer < 0 || q.answer > 3) issues.push(`${p.id} q${i}: bad answer index`);
    if (new Set(q.options).size !== q.options.length) issues.push(`${p.id} q${i}: duplicate options`);
    if (!q.evidence || !p.body.join(" ").includes(q.evidence.replace(/[。「」]/g, "").slice(0, 6)))
      issues.push(`${p.id} q${i}: evidence not grounded`);
    if (!q.explain_vi || !q.explain_en) issues.push(`${p.id} q${i}: missing explanation`);
  });
});

JA_LISTENING_2.forEach((l) => {
  if (!jp.test(l.audio) || bad.test(l.audio)) issues.push(`${l.id}: audio not Japanese`);
  if (l.options.length < 3) issues.push(`${l.id}: too few options`);
  if (l.answer < 0 || l.answer >= l.options.length) issues.push(`${l.id}: bad answer`);
});
JA_DICTATION_2.forEach((d) => {
  if (!jp.test(d.audio) || bad.test(d.audio)) issues.push(`${d.id}: audio not Japanese`);
  if (!d.kana || !d.romaji || !d.vi || !d.en) issues.push(`${d.id}: missing field`);
});

const dicts = new Set<string>();
JA_VERBS.forEach((v) => {
  if (dicts.has(v.dict)) issues.push(`verb ${v.dict}: duplicate`);
  dicts.add(v.dict);
  if (!jp.test(v.dict) || bad.test(v.dict)) issues.push(`verb ${v.dict}: not Japanese`);
  JA_VERB_FORM_LABELS.forEach((f) => {
    const val = v.forms[f.key];
    if (!val || !jp.test(val) || bad.test(val)) issues.push(`verb ${v.dict}: bad ${f.key}`);
  });
});

JA_COUNTERS.forEach((c) => {
  if (c.readings.length !== 10) issues.push(`${c.id}: needs 10 readings`);
  c.readings.forEach((r, i) => { if (!jp.test(r) || bad.test(r)) issues.push(`${c.id} reading ${i + 1}: invalid`); });
  if (!jp.test(c.example_jp)) issues.push(`${c.id}: example not Japanese`);
});

JA_KEIGO_ROWS.forEach((r) => {
  [r.plain, r.polite, r.sonkei, r.kenjo].forEach((x, i) => {
    if (!x || !jp.test(x) || bad.test(x)) issues.push(`${r.id}: field ${i} invalid`);
  });
});
JA_KEIGO_PHRASES.forEach((p) => {
  if (!jp.test(p.jp) || bad.test(p.jp)) issues.push(`${p.id}: phrase invalid`);
  if (!p.vi || !p.en || !p.when_vi || !p.when_en) issues.push(`${p.id}: missing field`);
});

console.log("reading", JA_READING.length, "listening2", JA_LISTENING_2.length, "dictation2", JA_DICTATION_2.length,
  "verbs", JA_VERBS.length, "counters", JA_COUNTERS.length, "keigo rows", JA_KEIGO_ROWS.length, "keigo phrases", JA_KEIGO_PHRASES.length);
console.log("TOTAL ISSUES", issues.length);
issues.slice(0, 40).forEach((i) => console.log(" -", i));
