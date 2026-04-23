const VIETNAMESE_CHAR_PATTERN = /[À-ỹĐđ]/;

export const containsVietnamese = (value?: string | null) =>
  Boolean(value && VIETNAMESE_CHAR_PATTERN.test(value));

export const pickEnglishGrammarCopy = (
  preferred?: string | null,
  fallback?: string | null,
  generic = ""
) => {
  const candidates = [preferred, fallback].map((item) => item?.trim()).filter(Boolean) as string[];

  const englishCandidate = candidates.find((item) => !containsVietnamese(item));
  if (englishCandidate) return englishCandidate;

  return generic || candidates[0] || "";
};