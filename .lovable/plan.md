## Báo cáo kiểm tra audio toàn trang

Đã quét toàn bộ codebase (70+ component dùng audio) và test trực tiếp 3 edge function TTS. Kết quả:

### ✅ HOẠT ĐỘNG TỐT (proxy Google TTS + fallback)


| Ngôn ngữ        | Edge function    | Status                                  | Pages                                                                                                             |
| --------------- | ---------------- | --------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Tiếng Việt      | `vietnamese-tts` | 200 OK, MP3 hợp lệ                      | Alphabet, Phrasebook, Poetry, Vocabulary, History, Kids, Foreigners, Folklore, Daily, Dictation                   |
| Tiếng Phần Lan  | `finnish-tts`    | 200 OK, MP3 hợp lệ                      | Finnish Beginner/Vocab/Arcade, YKI Dashboard, YKI B1, Listening, Speaking                                         |
| Tiếng Thụy Điển | `swedish-tts`    | 200 OK, MP3 hợp lệ (vừa fix turn trước) | Swedish Beginner (30-Day + 16 Lessons), Vocabulary, Skills/Listening/Speaking/Reading Lab, Interactive Curriculum |


### ⚠️ RỦI RO CAO - có thể KHÔNG nghe được audio

Các môn dưới đây **chỉ dùng `window.speechSynthesis` của trình duyệt**, không có proxy Google TTS dự phòng. Trên Linux/Chromium server, preview sandbox, một số máy Windows thiếu voice pack, hoặc mobile Chrome → **silent / không phát ra tiếng**:


| Môn                           | File                                  | Lang        |
| ----------------------------- | ------------------------------------- | ----------- |
| **Tiếng Anh - Pronunciation** | `EnglishPronunciation.tsx`            | en-US       |
| **IELTS Vocabulary**          | `IeltsVocabulary.tsx`                 | en-US       |
| **TOEIC Vocabulary**          | `ToeicVocabulary.tsx`                 | en-US       |
| **SAT Vocabulary**            | `SatVocabulary.tsx`                   | en-US       |
| **PTE Vocabulary**            | `PteVocabulary.tsx`                   | en-US/en-AU |
| **Cambridge YLE Vocabulary**  | `CambridgeYleVocabulary.tsx`          | en-US/en-GB |
| **HSK Vocabulary**            | `HskVocabulary.tsx`                   | zh-CN       |
| **HSK Grammar**               | `HskGrammar.tsx`                      | zh-CN       |
| **Chinese Reading**           | `ChineseReading.tsx`                  | zh-CN       |
| **Conversational Chinese**    | `ChineseConversationalLessonView.tsx` | zh-CN       |


Triệu chứng: bấm nút loa → không có tiếng, không có lỗi rõ ràng. Đặc biệt nghiêm trọng với `zh-CN` vì nhiều browser không có voice tiếng Trung mặc định.

### Kế hoạch khắc phục

**1. Tạo 2 edge function mới (mirror `swedish-tts`)**

- `supabase/functions/english-tts/index.ts` - proxy Google Translate `tl=en`
- `supabase/functions/chinese-tts/index.ts` - proxy Google Translate `tl=zh-CN`

Cả 2 trả về `{audioBase64, mimeType}` giống `swedish-tts` / `finnish-tts` / `vietnamese-tts`.

**2. Tạo 2 helper client (mirror `swedishTts.ts`)**

- `src/lib/englishTts.ts` → `playEnglishTts(text, {playbackRate, speechRate, accent})`
  - Thứ tự fallback: proxy edge function → Google Translate trực tiếp (gtx + tw-ob) → `speechSynthesis` en-US/en-GB.
- `src/lib/chineseTts.ts` → `playChineseTts(text, {...})`
  - Thứ tự fallback: proxy → Google direct → `speechSynthesis` zh-CN.

**3. Refactor 10 page nói trên** thay block `new SpeechSynthesisUtterance` bằng `playEnglishTts` / `playChineseTts`. Giữ nguyên UI, chỉ thay logic phát.

**4. Verify**

- Curl test 2 edge function mới (giống cách đã test `swedish-tts`).
- Reload các trang IELTS Vocab, TOEIC Vocab, HSK Vocab, Chinese Reading bằng Playwright, bấm nút loa, kiểm tra log console + network request `/functions/v1/english-tts` (hoặc `chinese-tts`) trả 200 + MP3.

### Phạm vi không thay đổi

- Vietnamese / Finnish / Swedish: đã hoạt động, giữ nguyên.
- Các component speaking / listening đã proxy (SpeakingGrader, ShadowingPractice, IeltsListening): giữ nguyên.
- UI/UX nút loa, tốc độ phát, hotkey: không đổi.

Bạn duyệt plan này thì mình triển khai ngay.

ok 