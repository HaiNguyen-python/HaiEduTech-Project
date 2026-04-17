

## Plan: CV Clinic — AI-powered CV Review trong Interview Questions

### Mục tiêu
Thêm tính năng **CV Clinic** trong trang `/programming/interview-questions` cho phép user:
1. Upload CV (PDF/DOCX/TXT) hoặc paste text
2. Chọn target role (AI Engineer / Data Engineer / Language Tech)
3. AI phân tích → trả về **Match Score** + feedback chi tiết theo Nordic/Finland tech market standards

### UX Flow

**Vị trí**: Tab/section mới "🩺 CV Clinic" bên cạnh tabs hiện có (AI Engineer / Data Engineer) trong `InterviewQuestions.tsx`.

**Layout 2 cột**:
- **Left panel** — Input:
  - Drag-drop upload zone (PDF/DOCX/TXT, max 5MB) + nút "Or paste text"
  - Textarea fallback hiển thị text đã extract
  - Dropdown: Target Role (AI Engineer / Data Engineer / ML Engineer / Language Tech / Custom)
  - Optional: paste Job Description để match chính xác hơn
  - Nút "🔍 Analyze CV"

- **Right panel** — Result (sau khi analyze):
  - **Match Score** (0-100) hiển thị bằng circular progress + verdict (Strong fit / Good fit / Needs work / Mismatch)
  - **Score Breakdown** (5 tiêu chí, mỗi cái 0-20):
    - Technical Skills Match
    - Experience Relevance
    - Project Impact & Metrics
    - Keywords/ATS Optimization
    - Structure & Clarity
  - **✅ Strengths** (3-5 điểm mạnh)
  - **⚠️ Gaps & Missing Skills** (skill thiếu so với role)
  - **🔧 Specific Improvements** (rewrite suggestions cho 3-5 bullets cụ thể, có before/after)
  - **🎯 Nordic Market Tips** (CV format Phần Lan: 1-2 trang, no photo, English OK, etc.)
  - Nút **Copy Report** + **Download as PDF** + **Re-analyze**

### Technical Approach

**Frontend** (`src/components/CVClinic.tsx` mới + tích hợp vào `InterviewQuestions.tsx`):
- File upload: dùng `<input type="file">` + parse client-side
  - **PDF**: `pdfjs-dist` (đã quen thuộc với React/Vite)
  - **DOCX**: `mammoth` library (DOCX → plain text)
  - **TXT**: read as text
- State management: `useState` cho cv text, role, loading, result
- Display dùng cấu trúc cards có icon + colored sections (giống style hiện có của Interview Questions)

**Backend** (`supabase/functions/analyze-cv/index.ts` mới):
- Nhận `{ cvText, targetRole, jobDescription? }`
- Validate: cvText length 100-15000 chars, role enum
- Gọi **Lovable AI Gateway** với `google/gemini-2.5-pro` (cần reasoning mạnh để đánh giá CV)
- Dùng **tool calling** để extract structured output:
  ```ts
  {
    matchScore: number,           // 0-100
    verdict: "strong" | "good" | "needs-work" | "mismatch",
    breakdown: {
      technicalSkills: number,    // 0-20
      experience: number,
      projectImpact: number,
      atsKeywords: number,
      structure: number,
    },
    strengths: string[],          // 3-5 items
    gaps: { skill: string, why: string, howToFix: string }[],
    improvements: { 
      original: string, 
      improved: string, 
      reason: string 
    }[],
    nordicTips: string[],         // 3-5 Finland-specific tips
  }
  ```
- System prompt: chuyên gia tuyển dụng Nordic tech market, tập trung Data/AI/Language Tech, biết cả ATS optimization
- Handle 429/402 errors, return có CORS headers
- `verify_jwt = false` để guest cũng dùng được (giống các function hiện có)

**Privacy**: CV text **không lưu vào database** — chỉ gửi đến AI và return result. Hiển thị notice "Your CV is processed in real-time and not stored."

### Files

| File | Thay đổi |
|------|----------|
| `src/components/CVClinic.tsx` (NEW) | UI component đầy đủ: upload, parse, analyze, display |
| `src/pages/InterviewQuestions.tsx` | Thêm tab/section "🩺 CV Clinic" mount component |
| `supabase/functions/analyze-cv/index.ts` (NEW) | Edge function gọi Lovable AI với tool calling |
| `package.json` | + `pdfjs-dist` và `mammoth` |

### Lưu ý
- Dùng **Lovable AI** (LOVABLE_API_KEY có sẵn) — không cần API key user
- File parse 100% client-side → không upload binary lên server
- Hiển thị loading state với skeleton/spinner trong khi AI xử lý (~10-20s)
- Toast error rõ ràng khi rate limit (429) hoặc credits hết (402)

