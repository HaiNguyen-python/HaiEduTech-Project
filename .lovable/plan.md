

## Plan: Thêm hình minh họa nhỏ cho từ vựng IELTS

### Ý tưởng
Sử dụng Lovable AI (model `google/gemini-2.5-flash-image`) để tạo hình minh họa nhỏ cho mỗi từ vựng ngay khi người dùng xem. Hình sẽ hiển thị ở góc phải trên mỗi card từ vựng, giúp học sinh liên tưởng trực quan.

### Cách tiếp cận: AI sinh hình on-demand + cache

Vì có 800 từ, không thể tạo sẵn 800 ảnh tĩnh. Thay vào đó:
1. Khi card từ vựng hiển thị → gọi AI sinh hình minh họa nhỏ (icon-style, 128x128)
2. Cache kết quả vào `localStorage` để không phải gọi lại
3. Hiển thị placeholder (emoji/icon) trong khi chờ load

### Thay đổi chi tiết

#### 1. Tạo hook `useVocabIllustration.ts`
- Nhận `word` + `definition` → gọi edge function sinh hình
- Cache base64 vào localStorage (key: `vocab-img-{word}`)
- Trả về `{ imageUrl, isLoading }`

#### 2. Tạo edge function `generate-vocab-image`
- Nhận word + definition
- Gọi Lovable AI gateway với prompt: "Simple flat illustration icon of [word]: [definition]. Minimal, clean, white background, no text, suitable as vocabulary flashcard illustration. 128x128px"
- Trả về base64 image

#### 3. Cập nhật `src/pages/IeltsVocabulary.tsx`
- Trong list view: thêm hình minh họa 64x64px ở góc phải trên card (bên cạnh nút audio/star)
- Trong flashcard view: thêm hình minh họa ở mặt trước flashcard
- Dùng skeleton loader khi đang tải hình

### Layout thay đổi (list card)
```text
┌──────────────────────────────────┐
│  academic          [🖼️] 🔊 ⭐   │
│  /ˌæk.əˈdem.ɪk/                │
│  B2 | Education                  │
│  relating to education...        │
│  thuộc về học thuật              │
│  "Academic research requires..." │
│  ┌─ Synonyms ──────────────┐    │
│  │ scholarly  educational  │    │
│  └─────────────────────────┘    │
└──────────────────────────────────┘
```

### Files thay đổi
- `src/hooks/useVocabIllustration.ts` — **mới** (hook gọi AI + cache)
- `supabase/functions/generate-vocab-image/index.ts` — **mới** (edge function)
- `src/pages/IeltsVocabulary.tsx` — thêm hình minh họa vào card + flashcard

### Lưu ý kỹ thuật
- Hình chỉ sinh khi card hiển thị (lazy), không tải hết 800 từ cùng lúc
- Cache localStorage giúp tránh gọi API lặp lại
- Fallback: nếu AI không sinh được hình → hiển thị emoji liên quan đến category (📚 Education, 💻 Technology, 🌍 Environment...)

