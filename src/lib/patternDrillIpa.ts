import { formatIpa, phraseToIpa } from "@/lib/englishIpa";

// American-English curriculum words missing from the shared dictionary.
const PATTERN_WORD_IPA: Record<string, string> = {
  pho: "fɜː",
  "wi-fi": "ˈwaɪ faɪ",
  favourite: "ˈfeɪvɚɪt",
  neighbour: "ˈneɪbɚ",
  "second-hand": "ˌsɛkənd ˈhænd",
  "double-check": "ˌdʌbəl ˈtʃɛk",
  "cost-effective": "ˌkɔst ɪˈfɛktɪv",
  scalable: "ˈskeɪləbəl",
  scalability: "ˌskeɪləˈbɪləti",
  "long-standing": "ˌlɔŋ ˈstændɪŋ",
};

const extendedDictionaries = new WeakMap<Record<string, string>, Record<string, string>>();

export function patternDrillSentenceIpa(sentence: string, dictionary: Record<string, string>): string | null {
  let extended = extendedDictionaries.get(dictionary);
  if (!extended) {
    extended = { ...dictionary, ...PATTERN_WORD_IPA };
    extendedDictionaries.set(dictionary, extended);
  }
  const ipa = phraseToIpa(sentence, extended);
  return ipa ? formatIpa(ipa) : null;
}