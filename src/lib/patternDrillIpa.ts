import { formatIpa, phraseToIpa } from "@/lib/englishIpa";
import pronunciations from "@/data/patternDrillPronunciations.json";

const extendedDictionaries = new WeakMap<Record<string, string>, Record<string, string>>();

export function patternDrillSentenceIpa(sentence: string, dictionary: Record<string, string>): string | null {
  let extended = extendedDictionaries.get(dictionary);
  if (!extended) {
    extended = { ...dictionary, ...pronunciations };
    extendedDictionaries.set(dictionary, extended);
  }
  const words = sentence.toLowerCase().replace(/[’‘]/g, "'")
    .split(/\s+/).map((word) => word.replace(/[^a-z'-]/g, "")).filter(Boolean);
  const parts: string[] = [];
  for (let index = 0; index < words.length; index++) {
    const word = words[index];
    const next = words[index + 1];
    // Habitual 'used to' /just/ is not the verb 'used a sample' /juzd/.
    // 'the' has /ði/ before a vowel sound, not simply a vowel letter.
    let ipa = phraseToIpa(word, extended);
    if (word === "used" && next === "to") ipa = "just";
    if (word === "the" && next) {
      const following = phraseToIpa(next, extended)?.replace(/[ˈˌ]/g, "");
      ipa = following && /^[ɑæʌɔaɛɝɚeɪioʊuə]/u.test(following) ? "ði" : "ðə";
    }
    if (!ipa) return null;
    parts.push(ipa);
  }
  return parts.length ? formatIpa(parts.join(" ")) : null;
}