// Placeholder hook - AI image generation has been disabled
export function useVocabImage(_character: string, _pinyin: string, _definition: string) {
  return {
    imageUrl: null as string | null,
    isLoading: false,
    error: null as string | null,
    generateImage: () => {},
  };
}
