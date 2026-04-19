

## Vấn đề

Trong flashcard (và cả list view), nhiều mục HSK là **từ ghép nhiều ký tự** (ví dụ: 你好, 谢谢, 对不起, 没关系, 再见), nhưng component `HanziStrokeOrder` **chỉ render ký tự đầu tiên** qua `character.charAt(0)`. Hệ quả:

- Phiên âm hiển thị đầy đủ: `nǐ hǎo`, `duì bu qǐ`, `méi guānxi`
- Nhưng chữ Hán chỉ hiện 1 ký tự: 你, 对, 没

→ Trông như "chữ thiếu so với phiên âm".

Lý do code cũ chỉ lấy 1 ký tự: `hanzi-writer` chỉ vẽ được **một ký tự** mỗi instance.

## Giải pháp

Render **mỗi ký tự thành một `HanziStrokeOrder` riêng**, xếp ngang cạnh nhau. Mỗi ký tự vẫn có nét bút chạy độc lập.

### Fix 1: `HanziStrokeOrder.tsx` — chỉ vẽ 1 ký tự (đã đúng), nhưng giảm size mặc định để xếp ngang gọn hơn

Giữ nguyên logic vẽ 1 ký tự, không cần đổi.

### Fix 2: Tạo wrapper `HanziWord` trong `HskVocabulary.tsx` (hoặc inline)

Một component nhỏ nhận `character: string`, tách thành mảng ký tự (lọc bỏ ký tự không phải Hán tự nếu có), và render mỗi ký tự bằng `HanziStrokeOrder`:

```tsx
const HanziWord = ({ characters, size }: { characters: string; size: number }) => {
  const chars = Array.from(characters); // hỗ trợ surrogate pairs
  // Co kích thước mỗi ký tự nếu từ dài để vừa khung
  const perCharSize = chars.length >= 3 ? Math.floor(size * 0.75) : size;
  return (
    <div className="flex items-center justify-center gap-1 flex-wrap">
      {chars.map((c, i) => (
        <HanziStrokeOrder key={i} character={c} size={perCharSize} />
      ))}
    </div>
  );
};
```

Áp dụng cho:
- **Flashcard front** (line 64): thay `<HanziStrokeOrder character={word.character} size={120} />` → `<HanziWord characters={word.character} size={110} />`
- **List view** (line 425): thay `<HanziStrokeOrder character={w.character} size={100} />` → `<HanziWord characters={w.character} size={84} />`
- **List view** (line 430): xóa luôn `<h3 className="font-bold text-foreground text-2xl">{w.character}</h3>` trùng lặp (giờ HanziWord đã hiển thị đầy đủ chữ rồi), chỉ giữ pinyin.

### Kết quả mong đợi

- 你好 → hiện 2 ký tự "你 好" cạnh nhau, mỗi ký tự đều có nét bút.
- 对不起 → hiện 3 ký tự "对 不 起" (size nhỏ hơn để vừa khung).
- 谢谢 → hiện "谢 谢".
- Ký tự đơn (như 我, 他, 她) → giữ nguyên 1 ký tự lớn như cũ.
- Phiên âm và chữ Hán giờ khớp nhau hoàn toàn.

### Files thay đổi

- `src/pages/HskVocabulary.tsx` — thêm component `HanziWord` nội bộ; thay 2 chỗ dùng `HanziStrokeOrder`; xóa `<h3>` chữ Hán trùng trong list view.

Không cần đổi `HanziStrokeOrder.tsx`.

