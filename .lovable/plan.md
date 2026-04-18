
## Plan: Tính năng "Rewrite the Upgraded Sentence"

### Mục tiêu
Sau khi AI trả về kết quả với "Band 7.5+ Upgrade", hiển thị thêm 1 phần luyện tập mới yêu cầu học sinh **gõ lại chính xác câu nâng cấp** đó để ghi nhớ cấu trúc ngữ pháp bậc cao.

### Logic UX

**Hiển thị**: Ngay dưới block "Band 7.5+ Upgrade" trong Result card.

**Flow**:
1. Học sinh đọc câu upgraded
2. Textarea trống xuất hiện với prompt: *"Viết lại câu nâng cấp ở trên để ghi nhớ cấu trúc"*
3. Nút **"Check My Rewrite"** → so sánh client-side (không gọi AI để tiết kiệm)
4. So sánh thông minh:
   - Normalize: lowercase, bỏ dấu câu thừa, trim multiple spaces
   - Tính % độ giống (word-level diff)
   - **≥95%**: ✅ "Hoàn hảo! Bạn đã ghi nhớ cấu trúc."
   - **80-94%**: 🟡 Hiển thị các từ sai/thiếu (highlight đỏ trong câu của HS)
   - **<80%**: 🔴 "Hãy thử lại — đọc kỹ câu mẫu"
5. Nút **"Show Answer"** để xem lại câu mẫu (nếu cần)
6. Nút **"Try Again"** reset textarea

### State mới trong `PhrasePractice.tsx`
```ts
const [rewriteText, setRewriteText] = useState("");
const [rewriteResult, setRewriteResult] = useState<{
  accuracy: number;
  diffHtml: string;  // câu HS với từ sai highlight
  message: string;
} | null>(null);
```

### Reset khi nào
- Khi chọn phrase mới → reset rewrite
- Khi submit câu mới → reset rewrite
- Khi nhấn "Try Again" → chỉ clear textarea + result

### Hàm so sánh (utility nhỏ inline)
```ts
const compareRewrite = (original: string, attempt: string) => {
  const normalize = (s: string) => s.toLowerCase().replace(/[.,!?;:]/g, "").replace(/\s+/g, " ").trim();
  const o = normalize(original).split(" ");
  const a = normalize(attempt).split(" ");
  // Word-by-word match, trả về accuracy + HTML highlight
}
```

### Files thay đổi
| File | Thay đổi |
|------|----------|
| `src/components/PhrasePractice.tsx` | Thêm state + UI block "Rewrite Practice" + utility so sánh |

### Lưu ý
- **Không gọi AI** → tiết kiệm Perplexity credit, phản hồi tức thì
- Bilingual labels (VI/EN) theo `useLanguage`
- Mobile-first: textarea min-h 100px, font 16px+
- Không lưu vào Notebook (chỉ là exercise nhớ cấu trúc)
- Khi học sinh đạt ≥95% → toast confetti nhẹ + sparkle icon
