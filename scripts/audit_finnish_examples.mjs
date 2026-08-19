/**
 * Audits generated Finnish vocabulary examples:
 *  - template over-use
 *  - example must contain the headword stem
 *  - suspicious inflected endings
 *  - Finnish / English sentence pair sanity
 * Run: node scripts/audit_finnish_examples.mjs
 */
import { readFileSync } from "node:fs";
import { execSync } from "node:child_process";

const tmp = "/tmp/finnish_examples.json";
execSync(
  `bunx tsx -e "import {finnishVocabData} from './src/data/finnishVocabData';import {writeFileSync} from 'node:fs';writeFileSync('${tmp}', JSON.stringify(finnishVocabData));"`,
  { stdio: "inherit" }
);
const rows = JSON.parse(readFileSync(tmp, "utf8"));

const skeleton = (s) => s.replace(/[A-Za-zÄÖÅäöå]+/g, "X");
const counts = new Map();
const problems = [];

for (const r of rows) {
  const fi = r.example || "";
  const en = r.exampleEn || "";
  const sk = skeleton(fi);
  counts.set(sk, (counts.get(sk) || 0) + 1);

  if (!fi || !en) problems.push(["empty", r.word, fi]);
  const stem = r.word.slice(0, Math.max(3, r.word.length - 2)).toLowerCase();
  if (!fi.toLowerCase().includes(stem)) problems.push(["missing-word", r.word, fi]);
  if (/\b\w+(nn|aa|ää)?[a-zäö]*(sn|äa|ea juuri)\b/.test(fi)) problems.push(["bad-form", r.word, fi]);
  if (!/[.?!]$/.test(fi)) problems.push(["no-end", r.word, fi]);
  if (!/[.?!]$/.test(en)) problems.push(["no-end-en", r.word, en]);
  if (fi.endsWith("?") !== en.endsWith("?")) problems.push(["mismatch-type", r.word, `${fi} | ${en}`]);
}

const over = [...counts.entries()].filter(([, n]) => n > 45).sort((a, b) => b[1] - a[1]);
console.log("total words:", rows.length);
console.log("distinct structures:", counts.size);
console.log("\ntop structures:");
for (const [sk, n] of [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10)) console.log(n, sk);
console.log("\nover-used (>45):", over.length);
console.log("\nproblems:", problems.length);
for (const p of problems.slice(0, 30)) console.log(p.join(" :: "));
