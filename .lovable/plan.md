

# Plan: Fix Listening Audio Overlapping

## Root Cause

The `speakFinnish` function in `YkiDashboard.tsx` is **fire-and-forget**:

```typescript
const speakFinnish = (text: string) => {
  void playFinnishTts(text).then(...); // void = no awaitable promise returned
};
```

When `playListeningAudio` does `await speakFinnish(line)`, the `await` resolves **immediately** because `speakFinnish` returns `undefined`. All dialogue lines fire simultaneously, causing overlap.

Additionally, `playFromUrl` in `finnishTts.ts` calls `stopActiveAudio()` at the start — so each new line **kills** the previous one mid-playback.

## Fix

### 1. `src/pages/YkiDashboard.tsx` — Fix `playListeningAudio`

Replace `await speakFinnish(line)` with `await playFinnishTts(line)` directly, so the promise is properly awaited:

```typescript
const playListeningAudio = async () => {
  if (!selectedLesson?.theory || isPlayingListening) return;
  setIsPlayingListening(true);
  try {
    const dialogueLines = extractFinnishDialogue(selectedLesson.theory);
    if (dialogueLines.length === 0) {
      await playFinnishTts(selectedLesson.theory.replace(/[#*>_\[\]()]/g, "").substring(0, 500));
    } else {
      for (const line of dialogueLines) {
        await playFinnishTts(line);  // ← properly awaits each line
        await new Promise(r => setTimeout(r, 800));
      }
    }
  } catch {
    // handled
  } finally {
    setIsPlayingListening(false);
  }
};
```

### 2. Add stop/cancel support

Add a `listeningCancelRef` to allow stopping playback mid-dialogue, and check it between lines so the loop can exit early if the user clicks stop.

| File | Change |
|------|--------|
| `src/pages/YkiDashboard.tsx` | Use `await playFinnishTts()` instead of `await speakFinnish()` in listening loop; add cancel ref for stop button |

