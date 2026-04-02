

## Plan: Fix Chinese Roleplay to Use Chinese Language

### Problem
The `ConversationalRoleplay` component and `roleplay-chat` edge function are hardcoded for English conversation practice. When used in the Chinese lesson view, the AI still responds in English instead of Chinese.

### Changes

**1. Add `language` prop to `ConversationalRoleplay` component**
- File: `src/components/ConversationalRoleplay.tsx`
- Add optional `language` prop (default: `"english"`)
- Pass it to the edge function in the request body

**2. Update the `roleplay-chat` edge function to handle language**
- File: `supabase/functions/roleplay-chat/index.ts`
- Accept a `language` parameter from the request body
- Switch the system prompt based on language:
  - `"chinese"`: Instruct AI to roleplay in Chinese (using Hanzi + Pinyin), correct Chinese grammar, and give tips in parentheses with Vietnamese translations
  - `"english"` (default): Keep current English behavior
  - `"finnish"`: Roleplay in Finnish with corrections and Vietnamese tips

**3. Pass `language="chinese"` from Chinese lesson view**
- File: `src/pages/ChineseConversationalLessonView.tsx`
- Add `language="chinese"` to the `<ConversationalRoleplay>` component at line 365

**4. Pass `language="english"` from English lesson view (if applicable)**
- File: `src/pages/ConversationalLessonView.tsx` (verify and add if missing)

### Technical details
- The system prompt for Chinese will instruct the AI to respond primarily in Chinese characters with Pinyin in brackets, provide Vietnamese translations for key phrases, and correct Chinese tones/grammar
- Speech recognition in the component should also switch `lang` to `"zh-CN"` when language is Chinese, and `"fi-FI"` for Finnish
- TTS `speakText` function should use the appropriate `lang` code based on the language prop

