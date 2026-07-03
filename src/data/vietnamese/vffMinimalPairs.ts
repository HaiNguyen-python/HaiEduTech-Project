/**
 * Vietnamese Minimal Pairs - critical for foreigner pronunciation.
 * Grouped by challenge type. Used in Pronunciation Lab.
 */

export interface MinimalPair {
  id: string;
  a: { word: string; ipa: string; meaning: string };
  b: { word: string; ipa: string; meaning: string };
  challenge: string;
  challengeEn: string;
  category: "tone" | "vowel" | "consonant" | "ending";
}

export const vffMinimalPairs: MinimalPair[] = [
  // ---------- Tone pairs ----------
  { id: "t1", a: { word: "ma", ipa: "/maː˧/", meaning: "ghost" }, b: { word: "má", ipa: "/maː˧˥/", meaning: "mother (S)" }, challenge: "Bằng vs Sắc", challengeEn: "Level vs Rising", category: "tone" },
  { id: "t2", a: { word: "ma", ipa: "/maː˧/", meaning: "ghost" }, b: { word: "mà", ipa: "/maː˨˩/", meaning: "but" }, challenge: "Bằng vs Huyền", challengeEn: "Level vs Falling", category: "tone" },
  { id: "t3", a: { word: "mả", ipa: "/maː˧˩˧/", meaning: "grave" }, b: { word: "mã", ipa: "/maː˧ˀ˥/", meaning: "code" }, challenge: "Hỏi vs Ngã", challengeEn: "Dipping vs Broken-rising", category: "tone" },
  { id: "t4", a: { word: "má", ipa: "/maː˧˥/", meaning: "mother" }, b: { word: "mạ", ipa: "/maː˧ˀ˨/", meaning: "seedling" }, challenge: "Sắc vs Nặng", challengeEn: "Rising vs Heavy-drop", category: "tone" },
  { id: "t5", a: { word: "bán", ipa: "/ɓaːn˧˥/", meaning: "sell" }, b: { word: "bàn", ipa: "/ɓaːn˨˩/", meaning: "table" }, challenge: "Sắc vs Huyền", challengeEn: "Rising vs Falling", category: "tone" },

  // ---------- Vowel pairs ----------
  { id: "v1", a: { word: "an", ipa: "/aːn/", meaning: "peace" }, b: { word: "ăn", ipa: "/an/", meaning: "eat" }, challenge: "a dài vs ă ngắn", challengeEn: "Long a vs short ă", category: "vowel" },
  { id: "v2", a: { word: "cơm", ipa: "/kəːm/", meaning: "rice" }, b: { word: "câm", ipa: "/kəm/", meaning: "mute" }, challenge: "ơ dài vs â ngắn", challengeEn: "Long ơ vs short â", category: "vowel" },
  { id: "v3", a: { word: "thư", ipa: "/tʰɨ/", meaning: "letter" }, b: { word: "thu", ipa: "/tʰu/", meaning: "autumn" }, challenge: "ư vs u", challengeEn: "Vietnamese ư /ɨ/ vs u", category: "vowel" },
  { id: "v4", a: { word: "mê", ipa: "/me/", meaning: "obsessed" }, b: { word: "mơ", ipa: "/məː/", meaning: "dream" }, challenge: "ê vs ơ", challengeEn: "ê vs ơ", category: "vowel" },

  // ---------- Consonant pairs ----------
  { id: "c1", a: { word: "cha", ipa: "/caː/", meaning: "father" }, b: { word: "tra", ipa: "/ʈaː/", meaning: "check" }, challenge: "ch vs tr", challengeEn: "ch vs retroflex tr", category: "consonant" },
  { id: "c2", a: { word: "xa", ipa: "/saː/", meaning: "far" }, b: { word: "sa", ipa: "/ʂaː/", meaning: "fall" }, challenge: "x vs s (Nam)", challengeEn: "x vs retroflex s (Southern)", category: "consonant" },
  { id: "c3", a: { word: "da", ipa: "/zaː/ (N) / /jaː/ (S)", meaning: "skin" }, b: { word: "gia", ipa: "/zaː/", meaning: "family" }, challenge: "d vs gi", challengeEn: "d vs gi", category: "consonant" },
  { id: "c4", a: { word: "nam", ipa: "/naːm/", meaning: "south / male" }, b: { word: "năm", ipa: "/nam/", meaning: "year / five" }, challenge: "am vs ăm", challengeEn: "am vs ăm", category: "ending" },

  // ---------- Endings ----------
  { id: "e1", a: { word: "anh", ipa: "/aːɲ/", meaning: "older brother" }, b: { word: "an", ipa: "/aːn/", meaning: "peace" }, challenge: "nh vs n cuối", challengeEn: "final nh vs n", category: "ending" },
  { id: "e2", a: { word: "bác", ipa: "/ɓaːk̚/", meaning: "uncle" }, b: { word: "bát", ipa: "/ɓaːt̚/", meaning: "bowl" }, challenge: "c cuối vs t cuối", challengeEn: "final c vs final t", category: "ending" },
];

export const minimalPairCategories = ["tone", "vowel", "consonant", "ending"] as const;
