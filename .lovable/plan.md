

## Plan: Sửa font/dấu thơ Việt Nam & Thêm bài tập sau mỗi bài thơ

### 1. Sửa lỗi nhảy dấu / sai font

**Nguyên nhân:** Thẻ `<pre>` kết hợp `font-serif` khiến trình duyệt render sai dấu tiếng Việt (combining diacritics bị tách rời). 

**Giải pháp:** Thay `<pre className="font-serif">` bằng `<p>` hoặc `<div>` với `whitespace-pre-wrap` và font hỗ trợ Vietnamese tốt hơn (system font stack hoặc `font-sans`).

**File:** `src/pages/VietnamesePoetry.tsx`
- Dòng 72: `<pre className="whitespace-pre-wrap font-serif ...">` → `<div className="whitespace-pre-wrap font-sans text-lg ...">`
- Dòng 74: Tương tự cho phần dịch tiếng Anh

### 2. Sửa lỗi chính tả trong data

**File:** `src/data/vietnamese/poetryData.ts`
- Dòng 358: `Maimai` → `Mai mai`

### 3. Thêm bài tập (quiz) sau mỗi bài thơ

**File:** `src/data/vietnamese/poetryData.ts`
- Thêm trường `exercises` vào interface `VietnamesePoem`:
  ```
  exercises: {
    question: string;
    questionEn: string;
    options: string[];
    correctIndex: number;
    explanation: string;
    explanationEn: string;
  }[]
  ```
- Mỗi bài thơ thêm 3-4 câu hỏi trắc nghiệm về nội dung, nghệ thuật, từ vựng

**File:** `src/pages/VietnamesePoetry.tsx`
- Thêm section "📝 Bài tập" sau phần Vocabulary
- UI: Hiển thị câu hỏi trắc nghiệm, click chọn đáp án, feedback đúng/sai với giải thích
- State: `answers` object, `showResults` boolean

### Files thay đổi

| File | Action |
|------|--------|
| `src/pages/VietnamesePoetry.tsx` | Sửa `<pre>` → `<div>`, thêm quiz section |
| `src/data/vietnamese/poetryData.ts` | Sửa typo "Maimai", thêm exercises cho 10 bài thơ |

