/** Build only the Pattern Drilling vocabulary, without a dictionary dependency
 * in the browser. Run: bun scripts/build_pattern_drill_ipa.ts
 * Source: cmu-pronouncing-dictionary 3.0.0 (ISC), lexical checks below.
 */
import { writeFileSync } from "node:fs";
import { dictionary } from "cmu-pronouncing-dictionary";
import { getPatterns, fillSentence } from "../src/data/patternDrills";
import { cmuPhonemicIpa } from "./lib/cmuPhonemicIpa";

// Broad GA teaching forms. Preserve compound boundaries; choose the lexical
// sense used in the curriculum. Heteronyms that vary by sentence stay runtime.
const overrides: Record<string, string> = {
  "wi-fi": "ˈwaɪˌfaɪ", pho: "fɝ", "second-hand": "ˌsɛkəndˈhænd",
  "double-check": "ˌdʌbəlˈtʃɛk", "cost-effective": "ˌkɑstɪˈfɛktɪv",
  "long-standing": "ˌlɔŋˈstændɪŋ", "long-term": "ˌlɔŋˈtɝm",
  scalable: "ˈskeɪləbəl", scalability: "ˌskeɪləˈbɪləti",
  overthought: "ˌoʊvɚˈθɔt", email: "ˈiˌmeɪl", reading: "ˈɹidɪŋ",
  read: "ɹid", live: "lɪv", lived: "lɪvd", use: "juz", reuse: "ˌɹiˈjuz",
  misread: "ˌmɪsˈɹɛd", address: "əˈdɹɛs", addresses: "əˈdɹɛsɪz",
  refund: "ˈɹiˌfʌnd", transport: "ˈtɹænsˌpɔɹt", implement: "ˈɪmpləˌmɛnt",
  overlook: "ˌoʊvɚˈlʊk", overlooks: "ˌoʊvɚˈlʊks", outweighs: "ˌaʊtˈweɪz",
  office: "ˈɔfɪs", ticket: "ˈtɪkɪt", tickets: "ˈtɪkɪts", minutes: "ˈmɪnɪts",
  visit: "ˈvɪzɪt", message: "ˈmɛsɪdʒ", damage: "ˈdæmɪdʒ", village: "ˈvɪlɪdʒ",
  limited: "ˈlɪmɪtɪd", acted: "ˈæktɪd", anticipated: "ænˈtɪsəˌpeɪtɪd",
  avoided: "əˈvɔɪdɪd", calculated: "ˈkælkjəˌleɪtɪd", expected: "ɪkˈspɛktɪd",
  extended: "ɪkˈstɛndɪd", granted: "ˈɡɹæntɪd", included: "ɪnˈkludɪd",
  tested: "ˈtɛstɪd", changes: "ˈtʃeɪndʒɪz", courses: "ˈkɔɹsɪz",
  consequences: "ˈkɑnsəkwɛnsɪz", glasses: "ˈɡlæsɪz", prices: "ˈpɹaɪsɪz",
  promises: "ˈpɹɑmɪsɪz", reduces: "ɹɪˈdusɪz", practice: "ˈpɹæktɪs",
  practical: "ˈpɹæktɪkəl", schedule: "ˈskɛdʒul", monday: "ˈmʌndeɪ",
  nobody: "ˈnoʊbədi", photo: "ˈfoʊtoʊ", kilo: "ˈkiloʊ", thirty: "ˈθɝti",
  hospital: "ˈhɑspɪtəl", tomorrow: "təˈmɑɹoʊ", probably: "ˈpɹɑbəbli",
  company: "ˈkʌmpəni", usually: "ˈjuʒuəli", everyone: "ˈɛvɹiwʌn",
  "everyone's": "ˈɛvɹiwʌnz", someone: "ˈsʌmwʌn", halfway: "ˌhæfˈweɪ",
  passport: "ˈpæsˌpɔɹt", password: "ˈpæsˌwɝd", weekend: "ˈwikˌɛnd",
  teamwork: "ˈtimˌwɝk", portfolio: "pɔɹtˈfoʊlioʊ", underestimated: "ˌʌndɚˈɛstəˌmeɪtɪd",
  online: "ˈɑnˌlaɪn", suggest: "səɡˈdʒɛst", suggestion: "səɡˈdʒɛstʃən",
};

const words = [...new Set(getPatterns("english").flatMap((pattern) => pattern.fills.flatMap((fill) =>
  fillSentence(pattern.frame, fill.w).toLowerCase().split(/\s+/)
    .map((word) => word.replace(/[^a-z'-]/g, "")),
)))].sort();
const entries: Record<string, string> = {};
for (const word of words) {
  const source = dictionary[word];
  if (!overrides[word] && !source) throw new Error(`Missing audited pronunciation: ${word}`);
  entries[word] = overrides[word] ?? cmuPhonemicIpa(source);
}
writeFileSync("src/data/patternDrillPronunciations.json", `${JSON.stringify(entries, null, 2)}\n`);
console.info(`Built ${words.length} reviewed Pattern Drilling word pronunciations.`);