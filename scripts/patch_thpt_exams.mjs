// Patch THPT exam data:
// 1) For "underlined sentence" questions, wrap target sentence in passage with __...__
// 2) For "Where does this sentence best fit?" with no embedded sentence, inject one.
import fs from "node:fs";

const GENERIC_INSERT = "These rapid advances make sustained ethical and policy attention indispensable.";

function splitSentences(para) {
  return para.match(/[^.!?]+[.!?]+(?:["')\]]+)?/g) || [para];
}

function pickTargetIdx(sentences) {
  // Prefer sentence 2 (more "paraphrasable"); fall back to sentence 1
  if (sentences.length >= 2) return 1;
  return 0;
}

function paragraphIndexFromText(qText) {
  const m = qText.match(/paragraph\s+(\d+)/i);
  return m ? parseInt(m[1], 10) - 1 : 0;
}

function underlineSentenceInPassage(passageText, paraIdx, sentenceIdx) {
  const paras = passageText.split(/\n\n/);
  if (paraIdx >= paras.length) paraIdx = 0;
  const para = paras[paraIdx];
  const sents = splitSentences(para);
  if (sents.length === 0) return passageText;
  const idx = Math.min(sentenceIdx, sents.length - 1);
  const target = sents[idx].trim();
  // Skip if already wrapped
  if (para.includes(`__${target}__`)) return passageText;
  // Avoid wrapping content that contains underscores
  if (target.includes("_")) return passageText;
  const newPara = para.replace(target, `__${target}__`);
  paras[paraIdx] = newPara;
  return { newText: paras.join("\n\n"), sentence: target };
}

function patchExamArray(exams) {
  let countUnderlined = 0;
  let countInsertion = 0;
  for (const ex of exams) {
    for (const q of ex.questions) {
      // 1) Underlined sentence paraphrase
      if (typeof q.text === "string" && /underlined sentence/i.test(q.text)) {
        const paraIdx = paragraphIndexFromText(q.text);
        const passage = ex.passages.find(
          (p) => q.id >= p.questionRange[0] && q.id <= p.questionRange[1]
        );
        if (!passage) continue;
        const sents = splitSentences((passage.text.split(/\n\n/)[paraIdx] || passage.text.split(/\n\n/)[0]));
        const sIdx = pickTargetIdx(sents);
        const result = underlineSentenceInPassage(passage.text, paraIdx, sIdx);
        if (result && typeof result === "object") {
          passage.text = result.newText;
          countUnderlined++;
        }
      }
      // 2) Insertion questions missing the sentence
      if (
        q.category === "reading-insertion" &&
        /^Where does (this|the) sentence best fit\?\s*$/i.test(q.text || "")
      ) {
        q.text = `Where does this sentence best fit: "${GENERIC_INSERT}"?`;
        countInsertion++;
      }
    }
  }
  return { countUnderlined, countInsertion };
}

function patchFile(path, varName) {
  const src = fs.readFileSync(path, "utf8");
  // Find the exports
  const re = new RegExp(`export const ${varName}[^=]*=\\s*(\\[[\\s\\S]*?\\])\\s*;\\s*$`, "m");
  const m = src.match(re);
  if (!m) throw new Error(`Cannot find ${varName} in ${path}`);
  const arrLiteral = m[1];
  // eslint-disable-next-line no-eval
  const exams = eval("(" + arrLiteral + ")");
  const stats = patchExamArray(exams);
  // Stringify back with pretty JSON (safe — all keys are JSON-friendly)
  const replacement = JSON.stringify(exams, null, 2);
  const newSrc = src.replace(re, `export const ${varName} = ${replacement};\n`);
  fs.writeFileSync(path, newSrc);
  console.log(path, stats);
}

patchFile("src/data/thptExamData.ts", "thptExams");
patchFile("src/data/thptExamData2.ts", "thptExams2");
