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

export function patternDrillSentenceIpa(sentence: string, dictionary: Record<string, string>): string | null {
  const ipa = phraseToIpa(sentence, { ...dictionary, ...PATTERN_WORD_IPA });
  return ipa ? formatIpa(ipa) : null;
}