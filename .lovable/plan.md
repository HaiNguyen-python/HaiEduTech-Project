

## Plan: Restructure IELTS Section & Enhance Writing Practice

### Summary

Restructure IELTS navigation into 3 distinct sub-pages, remove "AI" terminology, add bilingual vocabulary bank, and integrate reference tools (Dictionary, Ozdic, Thesaurus) as a collapsible sidebar in the Writing Practice page.

### Changes

#### 1. Update Navigation Menu
**File: `src/components/Navbar.tsx`**
- Update `englishSubs` array to show 3 IELTS entries:
  - `{ to: "/english/ielts", label: "🎯 Chương trình IELTS" }`
  - `{ to: "/ielts-writing-practice", label: "✍️ Luyện viết IELTS" }`
  - `{ to: "/ai-grading", label: "📝 Chấm điểm IELTS" }`

#### 2. Remove "AI" Terminology from Writing Practice
**File: `src/pages/IeltsWritingPractice.tsx`**
- Heading: "Luyện viết Task 1 & Task 2 với hệ thống chấm điểm theo tiêu chí IELTS chính thức"
- Button "AI tạo đề mới" → "Tạo đề mới"
- Button "Nộp bài & chấm điểm AI" → "Nộp bài & Chấm điểm"
- Remove Sparkles icon from generate button

#### 3. Remove "AI" Terminology from Grading Page
**File: `src/pages/AIGrading.tsx`**
- Update headings/labels to remove "AI" references, use "Hệ thống chấm điểm" instead

#### 4. Bilingual Vocabulary Bank
**File: `src/pages/IeltsWritingPractice.tsx`**
- Update vocabulary bank display to show bilingual format: "English term (Vietnamese meaning)"
- Update `src/data/ieltsWritingPrompts.ts` vocabulary entries to include Vietnamese translations in format "term (nghĩa tiếng Việt)"

#### 5. Reference Tools Sidebar
**File: `src/pages/IeltsWritingPractice.tsx`**
- Add a collapsible "Reference Toolbox" panel with 3 tabs:
  - **Cambridge Dictionary**: Embedded search using `dictionary.cambridge.org` iframe/link
  - **Ozdic Collocation**: Direct link to `ozdic.com` opened in a small embedded panel
  - **Thesaurus**: Link to `thesaurus.com` for synonyms
- Use a Sheet or collapsible right-side panel that can be toggled without leaving the writing environment
- On desktop: floating button that opens a slide-out panel
- On mobile: bottom sheet

#### 6. Update English Page Banner
**File: `src/pages/English.tsx`**
- Update the IELTS Writing Practice banner text to remove "AI" references
- Change description to match new professional terminology

### File Summary

| File | Action |
|------|--------|
| `src/components/Navbar.tsx` | Update — restructure IELTS sub-menu |
| `src/pages/IeltsWritingPractice.tsx` | Update — remove AI labels, add bilingual vocab, add reference sidebar |
| `src/pages/AIGrading.tsx` | Update — remove AI terminology |
| `src/pages/English.tsx` | Update — banner text |
| `src/data/ieltsWritingPrompts.ts` | Update — bilingual vocabulary entries |

### Execution Order

1. Update Navbar with new IELTS menu structure
2. Remove AI terminology from IeltsWritingPractice + AIGrading + English pages
3. Update vocabulary bank to bilingual format
4. Add Reference Toolbox sidebar to Writing Practice page

