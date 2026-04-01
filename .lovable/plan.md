

# Plan: Fix Finnish Audio Pronunciation

## Problem
The current `speakFinnish` function uses the browser's `SpeechSynthesis` API with `lang: "fi-FI"`. Most browsers **do not have a Finnish voice installed**, so it falls back to the default English voice — producing incorrect pronunciation.

## Solution
Replace `SpeechSynthesis` with **Google Translate TTS** audio, which reliably supports Finnish pronunciation without any API key.

### How it works
Play audio from URL: `https://translate.google.com/translate_tts?ie=UTF-8&q=TEXT&tl=fi&client=tw-ob`

This produces native-quality Finnish pronunciation for any word or sentence.

### Changes in `src/pages/YkiDashboard.tsx`

1. **Replace the global `speakFinnish` function** (line 73-86):
```typescript
const speakFinnish = (text: string) => {
  const audio = new Audio(
    `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=fi&client=tw-ob`
  );
  audio.playbackRate = 0.85;
  audio.play().catch(() => {
    // Fallback to SpeechSynthesis if blocked
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "fi-FI";
    u.rate = 0.8;
    window.speechSynthesis.speak(u);
  });
};
```

2. **Update the `VocabCard` inline audio** (line 459-474) to use the same Google TTS approach with `isPlaying` state management.

3. **Update `FlashcardView` audio** buttons to use the same function.

### Fallback
If Google TTS is blocked (e.g., CORS in some environments), it gracefully falls back to the existing `SpeechSynthesis` method.

| File | Change |
|------|--------|
| `src/pages/YkiDashboard.tsx` | Replace 3 TTS implementations with Google Translate TTS + SpeechSynthesis fallback |

