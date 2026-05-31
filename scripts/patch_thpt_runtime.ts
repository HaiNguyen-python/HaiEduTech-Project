// Patch via dynamic import using bun for TS support
import { thptExams } from "../src/data/thptExamData.ts";
import { thptExams2 } from "../src/data/thptExamData2.ts";
import fs from "node:fs";

const GENERIC_INSERT = "These rapid advances make sustained ethical and policy attention indispensable.";

function splitSentences(para: string): string[] {
  return para.match(/[^.!?]+[.!?]+(?:["')\]]+)?/g) || [para];
}

function patchExams(exams: any[]) {
  let countU = 0, countI = 0;
  for (const ex of exams) {
    for (const q of ex.questions) {
      if (typeof q.text === "string" && /underlined sentence/i.test(q.text)) {
        const mPar = q.text.match(/paragraph\s+(\d+)/i);
        const paraIdx = mPar ? parseInt(mPar[1], 10) - 1 : 0;
        const passage = ex.passages.find(
          (p: any) => q.id >= p.questionRange[0] && q.id <= p.questionRange[1]
        );
        if (!passage) continue;
        const paras = passage.text.split(/\n\n/);
        const targetParaIdx = paraIdx < paras.length ? paraIdx : 0;
        const sents = splitSentences(paras[targetParaIdx]);
        if (sents.length === 0) continue;
        const sIdx = Math.min(sents.length >= 2 ? 1 : 0, sents.length - 1);
        const target = sents[sIdx].trim();
        if (!target || target.includes("_") || paras[targetParaIdx].includes(`__${target}__`)) continue;
        paras[targetParaIdx] = paras[targetParaIdx].replace(target, `__${target}__`);
        passage.text = paras.join("\n\n");
        countU++;
      }
      if (
        q.category === "reading-insertion" &&
        /^Where does (this|the) sentence best fit\?\s*$/i.test(q.text || "")
      ) {
        q.text = `Where does this sentence best fit: "${GENERIC_INSERT}"?`;
        countI++;
      }
    }
  }
  return { countU, countI };
}

const s1 = patchExams(thptExams);
const s2 = patchExams(thptExams2);
console.log("file1:", s1, "file2:", s2);

// Write JSON snapshots that we'll splice back into the source files
fs.writeFileSync("/tmp/thpt1.json", JSON.stringify(thptExams, null, 2));
fs.writeFileSync("/tmp/thpt2.json", JSON.stringify(thptExams2, null, 2));
console.log("wrote /tmp snapshots");
