import {
  ZH_CONNECTORS,
  ZH_ESSAYS,
  ZH_GRAMMAR,
  ZH_PARAPHRASE,
  ZH_TRANSLATION,
  ZH_TYPING,
  ZH_VOCAB,
  ZH_LEVELS,
} from "../src/data/chineseWritingBank";

const errors: string[] = [];
const banks = { essays: ZH_ESSAYS, vocab: ZH_VOCAB, grammar: ZH_GRAMMAR, connectors: ZH_CONNECTORS, translation: ZH_TRANSLATION, paraphrase: ZH_PARAPHRASE, typing: ZH_TYPING };

for (const [name, rows] of Object.entries(banks)) {
  const ids = new Set<string>();
  for (const row of rows) {
    if (ids.has(row.id)) errors.push(`${name}: duplicate id ${row.id}`);
    ids.add(row.id);
    if (!(row as { level?: string }).level) errors.push(`${name}: ${row.id} missing level`);
  }
}

for (const item of ZH_VOCAB) {
  if (![item.word, item.pinyin, item.vi, item.en, item.ex, item.exPinyin, item.exVi].every((value) => value?.trim())) {
    errors.push(`vocab: ${item.id} missing word, meaning, Pinyin, or example detail`);
  }
  if (!item.ex.includes(item.word)) errors.push(`vocab: ${item.id} example does not contain ${item.word}`);
}

for (const item of [...ZH_GRAMMAR, ...ZH_CONNECTORS]) {
  if (![item.pattern, item.pinyin, item.vi, item.ex, item.exPinyin, item.exVi].every((value) => value.trim())) {
    errors.push(`pattern: ${item.id} missing usage or example detail`);
  }
}

for (const item of [...ZH_TRANSLATION, ...ZH_PARAPHRASE, ...ZH_TYPING]) {
  if (![item.zh, item.pinyin, item.vi].every((value) => value.trim())) errors.push(`sentence: ${item.id} missing text, Pinyin, or meaning`);
}

const counts = Object.fromEntries(Object.entries(banks).map(([name, rows]) => [name, Object.fromEntries(ZH_LEVELS.map((level) => [level, rows.filter((row) => row.level === level).length]))]));
console.log(JSON.stringify(counts, null, 2));
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log("Chinese writing audit passed.");