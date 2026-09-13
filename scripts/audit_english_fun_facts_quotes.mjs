import { readFileSync } from "node:fs";

const files = [
  "src/data/englishFunFacts.ts",
  "src/data/englishFunFactsExpansion.ts",
];

const issues = [];
for (const file of files) {
  const source = readFileSync(file, "utf8");
  const strings = [...source.matchAll(/\b(?:headline|headlineVi|hook|hookVi|reveal|revealVi|example|exampleVi):\s*"((?:\\.|[^"\\])*)"/g)];
  for (const match of strings) {
    const rendered = match[1]
      .replace(/([\p{L}\p{N}])'(?=[\p{L}\p{N}])/gu, "$1’")
      .replace(/(^|[^\p{L}\p{N}])'(?=[\p{L}\p{N}])/gu, "$1‘")
      .replace(/'/g, "’");
    const opens = [...rendered].filter((char) => char === "‘").length;
    const closes = [...rendered].filter((char) => char === "’").length;
    const apostrophes = [...rendered.matchAll(/[\p{L}\p{N}]’[\p{L}\p{N}]/gu)].length;
    if (opens !== closes - apostrophes) {
      issues.push(`${file}: unbalanced quotes in ${match[0].slice(0, 90)}…`);
    }
  }
}

if (issues.length) {
  console.error(issues.join("\n"));
  process.exit(1);
}

console.info("English Fun Facts quote audit passed.");