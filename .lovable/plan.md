
## Plan: Đổi nút + Lưu câu vào Sổ tay

### 1. Đổi nhãn nút
Trong `src/components/PhrasePractice.tsx`:
- "Submit for AI Grading" → **"Submit for Grading"** (EN)
- "Chấm điểm AI" → **"Nộp bài chấm"** (VI)

### 2. Lưu câu vào Sổ tay (Notebook)
Sau khi AI chấm xong thành công, tự động insert 1 entry vào bảng `student_notebooks` (Supabase) với:

| Field | Value |
|-------|-------|
| `title` | `IELTS Writing Practice Task 1` hoặc `IELTS Writing Practice Task 2` (theo `taskType` prop) |
| `subject` | `IELTS Writing` |
| `content` | HTML formatted: phrase, câu của học sinh, điểm số, feedback ngắn, phiên bản nâng cấp |
| `user_id` | `auth.uid()` |

**Logic chi tiết** trong `handleSubmit` của `PhrasePractice.tsx`:
- Sau khi `setResult(data)` thành công
- Check `supabase.auth.getUser()` — nếu logged in → insert vào `student_notebooks`
- Nếu guest (chưa login) → chỉ lưu localStorage như cũ + toast nhẹ "Đăng nhập để lưu vào sổ tay"
- Toast success: "Đã lưu vào Sổ tay ghi chú"

**Content HTML template** (gọn gàng, đúng chuẩn tiptap đang dùng ở Notebook):
```html
<h3>"[phrase]"</h3>
<p><em>Meaning: [meaning]</em></p>
<p><strong>My sentence:</strong> [userSentence]</p>
<p><strong>Score:</strong> [score]/10</p>
<p><strong>Grammar feedback:</strong> [grammarFeedback]</p>
<p><strong>Phrase feedback:</strong> [phraseFeedback]</p>
<p><strong>Band 7.5+ Upgrade:</strong> [upgradedVersion]</p>
```

### 3. Files thay đổi
| File | Thay đổi |
|------|---------|
| `src/components/PhrasePractice.tsx` | Đổi label nút + thêm logic insert vào `student_notebooks` sau khi chấm xong |

### Lưu ý
- Không cần migration mới — bảng `student_notebooks` đã tồn tại (đang dùng ở `Notebook.tsx`)
- Subject `IELTS Writing` sẽ thêm vào `SUBJECTS` array trong `Notebook.tsx` nếu chưa có (cần xác nhận khi implement)
- DOMPurify không cần vì content do AI sinh ra + system tự gen, không từ user HTML
