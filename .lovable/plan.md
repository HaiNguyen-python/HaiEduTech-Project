

Mục tiêu: Mở rộng đáng kể nội dung SAT (bài học + từ vựng) để học sinh có nhiều tài liệu luyện tập hơn.

## Hiện trạng

Đang có 2 file SAT:
- `englishSat.ts`: 3 modules (Reading & Writing, Advanced Vocabulary, Writing & Language) — ~9 lessons
- `englishSatExpansion.ts`: 2 modules (SAT Math Vocabulary, Advanced Reading Comprehension) — ~5 lessons

Tổng cộng: **5 modules / ~14 lessons**. Cần mở rộng thêm để phong phú.

## Plan: Tạo file `englishSatExpansion2.ts` với 4 modules mới

### Module 1: SAT Grammar Mastery (4 lessons)
Tập trung sâu vào ngữ pháp xuất hiện nhiều trong SAT Writing & Language:
1. **Subject-Verb Agreement Traps** — collective nouns, intervening phrases, indefinite pronouns
2. **Pronoun Clarity & Agreement** — antecedent ambiguity, who/whom, that/which
3. **Modifier Placement** — dangling modifiers, misplaced modifiers
4. **Parallel Structure** — lists, comparisons, correlative conjunctions

### Module 2: SAT High-Frequency Vocabulary Expansion (4 lessons)
Bổ sung 80+ từ vựng SAT thường gặp:
1. **Academic Verbs** (20 words: scrutinize, advocate, refute, corroborate, undermine...)
2. **Descriptive Adjectives** (20 words: ambiguous, pragmatic, meticulous, ephemeral...)
3. **Abstract Nouns** (20 words: paradigm, dichotomy, conjecture, anomaly...)
4. **Transition & Tone Words** (20 words: notwithstanding, albeit, henceforth, ostensibly...)

### Module 3: SAT Punctuation & Mechanics (3 lessons)
1. **Commas, Semicolons & Colons** — usage rules with SAT-style examples
2. **Apostrophes & Possessives** — singular/plural, it's vs its
3. **Dashes & Parentheses** — non-essential information

### Module 4: SAT Essay & Argument Analysis (3 lessons)
1. **Identifying Author's Purpose & Tone**
2. **Rhetorical Devices** (ethos, pathos, logos, analogy, repetition)
3. **Evidence-Based Argumentation** — claim, evidence, reasoning structure

**Tổng thêm**: 4 modules, 14 lessons, ~80 vocab entries, ~40 quiz questions, ~30 exercises.

### Files thay đổi
| File | Thay đổi |
|------|----------|
| `src/data/languageCurriculum/englishSatExpansion2.ts` | **Tạo mới**: 4 modules SAT chuyên sâu |
| `src/data/languageCurriculum/index.ts` | Import + spread `satExpansionModules2` vào `allEnglishModules` |

### Lưu ý kỹ thuật
- Mỗi lesson có đủ: `theory`, `theoryEn`, `proTips`, `vocabulary` (≥5 entries cho lesson vocab), `exercises` (fill-in-blank/sentence-reorder), `quiz` (≥3 MCQ)
- `category: "sat"` để tự động hiển thị trong section "Interactive SAT Lessons" trên `/english/sat`
- `language: "english"`
- Tuân thủ schema `LanguageModule` từ `types.ts`
- Bilingual VI/EN cho mọi field hiển thị

