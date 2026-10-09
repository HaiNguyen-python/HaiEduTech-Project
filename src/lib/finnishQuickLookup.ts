import { finnishDictionary } from "@/data/finnishCurriculum/finnishDictData";
const words = new Map(finnishDictionary.map(entry => [entry.finnish.normalize("NFC").toLocaleLowerCase("fi"), entry]));
export function finnishQuickLookup(word: string) {
  const item = words.get(word.trim().normalize("NFC").toLocaleLowerCase("fi"));
  if (!item) return null;
  return {
    entry: { word: item.finnish, phonetic: "", phonetics: [], meanings: [{ partOfSpeech: item.partOfSpeech, definitions: [{ definition: item.english, example: item.example ?? "" }] }] },
    viTranslations: { "def-0-0": item.vietnamese },
  };
}
