/**
 * Audits every English Grammar lesson's interactive exercises.
 * Run: bunx tsx scripts/audit_grammar_exercises.mjs  (or: bun scripts/audit_grammar_exercises.mjs)
 */
import { allGrammarModules } from "../src/data/languageCurriculum/index.ts";

const VI = /[ăâđêôơưàáạảãằắặẳẵầấậẩẫèéẹẻẽềếệểễìíịỉĩòóọỏõồốộổỗờớợởỡùúụủũừứựửữỳýỵỷỹ]/i;
const MIN = 7;
const errors = [];
const typeCount = {};
let lessons = 0;

const norm = (s) => s.toLowerCase().replace(/[.,!?;:"'`]/g, "").replace(/\s+/g, " ").trim();

for (const mod of allGrammarModules) {
  for (const lesson of mod.lessons) {
    lessons += 1;
    const id = `${mod.id}/${lesson.id}`;
    const ex = lesson.exercises || [];
    if (ex.length < MIN) errors.push(`${id}: only ${ex.length} exercises (min ${MIN})`);

    const seen = new Set();
    for (const e of ex) {
      typeCount[e.type] = (typeCount[e.type] || 0) + 1;
      const sig = JSON.stringify(e);
      if (seen.has(sig)) errors.push(`${id}: duplicate ${e.type} exercise`);
      seen.add(sig);
      if (VI.test(e.instructionEn || "")) errors.push(`${id}: Vietnamese leak in instructionEn (${e.type})`);

      if (e.type === "fill-in-blank") {
        e.sentences.forEach((s, i) => {
          const text = s.textEn || s.text;
          if (!text.includes("___")) errors.push(`${id}: fill-in-blank #${i + 1} has no blank`);
          if (!s.answer?.trim()) errors.push(`${id}: fill-in-blank #${i + 1} missing answer`);
          if (VI.test(text)) errors.push(`${id}: Vietnamese leak in fill-in-blank #${i + 1}`);
        });
      }

      if (e.type === "sentence-reorder") {
        e.items.forEach((item, i) => {
          const tok = (v) => v.toLowerCase().replace(/[.,!?;:"'`]/g, " ").split(/\s+/).filter(Boolean).sort().join(" ");
          const target = tok(item.correctEn || item.correct);
          const given = tok(item.scrambled.join(" "));
          if (target !== given) errors.push(`${id}: reorder #${i + 1} word set mismatch`);
        });
      }

      if (e.type === "error-correction") {
        e.items.forEach((item, i) => {
          if (item.wrong.trim().toLowerCase() === item.correct.trim().toLowerCase()) errors.push(`${id}: error-correction #${i + 1} wrong == correct`);
          if (!/^[A-Z"']/.test(item.correct)) errors.push(`${id}: error-correction #${i + 1} correct not a sentence`);
          if (VI.test(item.wrong) || VI.test(item.correct)) errors.push(`${id}: Vietnamese leak in error-correction #${i + 1}`);
        });
      }

      if (e.type === "transformation") {
        e.items.forEach((item, i) => {
          if (norm(item.prompt) === norm(item.target)) errors.push(`${id}: transformation #${i + 1} prompt == target`);
          if (!item.goal) errors.push(`${id}: transformation #${i + 1} missing goal`);
          if (VI.test(item.prompt) || VI.test(item.target)) errors.push(`${id}: Vietnamese leak in transformation #${i + 1}`);
        });
      }

      if (e.type === "multiple-choice") {
        const keys = [];
        e.questions.forEach((q, i) => {
          if (q.options.length < 3) errors.push(`${id}: mcq #${i + 1} has < 3 options`);
          if (new Set(q.options.map(norm)).size !== q.options.length) errors.push(`${id}: mcq #${i + 1} duplicate options`);
          if (q.answer < 0 || q.answer >= q.options.length) errors.push(`${id}: mcq #${i + 1} bad answer index`);
          if (!q.explanation) errors.push(`${id}: mcq #${i + 1} missing explanation`);
          if (VI.test(q.question)) errors.push(`${id}: Vietnamese leak in mcq #${i + 1}`);
          keys.push(q.answer);
        });
        if (keys.length >= 3 && new Set(keys).size === 1) errors.push(`${id}: all mcq keys identical (${keys[0]})`);
      }

      if (e.type === "matching") {
        if (e.pairs.length < 3) errors.push(`${id}: matching has < 3 pairs`);
        if (new Set(e.pairs.map((p) => norm(p.right))).size !== e.pairs.length)
          errors.push(`${id}: matching has duplicate right-hand items`);
        e.pairs.forEach((p, i) => {
          if (!p.left?.trim() || !p.right?.trim()) errors.push(`${id}: matching pair #${i + 1} empty`);
          if (VI.test(p.right)) errors.push(`${id}: Vietnamese leak in matching pair #${i + 1}`);
        });
      }

      if (e.type === "dictation") {
        e.sentences.forEach((s, i) => {
          if (!/[.?!]["']?$/.test(s.text)) errors.push(`${id}: dictation #${i + 1} missing final punctuation`);
          if (s.text.split(/\s+/).length < 4) errors.push(`${id}: dictation #${i + 1} too short`);
          if (VI.test(s.text)) errors.push(`${id}: Vietnamese leak in dictation #${i + 1}`);
        });
      }
    }

    const kinds = new Set(ex.map((e) => e.type));
    if (kinds.size < 4) errors.push(`${id}: only ${kinds.size} exercise types (min 4)`);
  }
}

console.log(`Lessons audited: ${lessons}`);
console.log("Exercise types:", typeCount);
if (errors.length) {
  console.log(`\nISSUES (${errors.length}):`);
  errors.slice(0, 80).forEach((e) => console.log(" -", e));
  process.exit(1);
}
console.log("\nAll grammar exercises passed the audit.");
