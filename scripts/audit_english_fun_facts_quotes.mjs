import { readFileSync, readdirSync } from "node:fs";
import { extname, join } from "node:path";

const files = [
  "src/data/englishFunFacts.ts",
  "src/data/englishFunFactsExpansion.ts",
];

const visibleUiFiles = [
  "src/components/PhrasePractice.tsx",
  "src/components/TranslationPractice.tsx",
  "src/components/GrammarPractice.tsx",
  "src/components/IdeaPractice.tsx",
  "src/components/CohesionLab.tsx",
  "src/components/cohesion/LinkerBank.tsx",
  "src/components/cohesion/ParagraphReorder.tsx",
  "src/components/cohesion/CohesionAnalyser.tsx",
  "src/pages/IeltsWritingPractice.tsx",
];

const collectSourceFiles = (directory) => readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
  const path = join(directory, entry.name);
  if (entry.isDirectory()) return collectSourceFiles(path);
  return [".ts", ".tsx", ".js", ".jsx"].includes(extname(path)) ? [path] : [];
});

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

for (const file of visibleUiFiles) {
  const source = readFileSync(file, "utf8");
  const straightQuoteWrappers = [
    ...source.matchAll(/>"\{[^}\n]+\}"</g),
    ...source.matchAll(/`[^`\n]*"\$\{[^}\n]+\}"[^`\n]*`/g),
  ];
  for (const match of straightQuoteWrappers) {
    issues.push(`${file}: visible quotation uses straight marks in ${match[0].slice(0, 90)}…`);
  }

  const reversedCurlyQuotes = [...source.matchAll(/”[^\n”“]{1,160}“/g)];
  for (const match of reversedCurlyQuotes) {
    issues.push(`${file}: reversed curly quotes in ${match[0].slice(0, 90)}…`);
  }
}

for (const file of collectSourceFiles("src")) {
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, index) => {
    const closingBeforeContent = /(^|[\s([{>:])”(?=[\p{L}\p{N}{])/u.test(line);
    const openingAfterContent = /(?<=[\p{L}\p{N}}.!?])“(?=$|[\s,.;:!?)}\]<])/u.test(line);
    if (closingBeforeContent || openingAfterContent) {
      issues.push(`${file}:${index + 1}: reversed curly quotation mark`);
    }
  });
}

if (issues.length) {
  console.error(issues.join("\n"));
  process.exit(1);
}

console.info("English Fun Facts quote audit passed.");