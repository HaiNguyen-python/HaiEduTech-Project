---
name: AI Pedagogical Center
description: Trung tâm Sư phạm AI trong Admin Strategy tab — 6 tab gồm Methods Library (8 phương pháp CLT/TBL/Flipped/TPR/PBL/Pair/CT/5E), Situational Solver, Lesson Plan Optimizer, Learning Style Advisor, Weekly Challenge, Personal Diary
type: feature
---

## Vị trí
- Tab **Strategy** trong `/admin-dashboard` → component `AiPedagogicalCenter` (cuối tab, sau AI Marketing Kit)

## Kiến trúc
- **Edge Function**: `supabase/functions/pedagogical-assistant/index.ts`
  - Model: `google/gemini-2.5-pro` qua Lovable AI Gateway
  - 4 modes: `situational | lessonPlan | learningStyle | weeklyChallenge`
  - JWT bắt buộc + check role teacher/admin
  - Trả về JSON nghiêm ngặt (response_format: json_object) + extractJson() repair
  - Log usage vào `api_usage_log` (domain: "pedagogy")

## Database
- `teaching_diary` — lưu tình huống đã giải quyết (scenario_type, challenge, ai_solution JSONB, tags, outcome_rating)
- `lesson_plan_reviews` — lưu giáo án đã được AI review (title, subject, original_plan, ai_feedback, quality_score)
- RLS: chỉ owner + role teacher/admin

## 6 Tab UI
1. **Methods** — 8 phương pháp curated trong `src/data/teachingMethodsData.ts` (CLT, TBL, Flipped, TPR, PBL, Pair Programming, Computational Thinking, 5E) + filter category, expandable cards
2. **Solver** — Form scenario type + context + challenge → AI trả về diagnosis, immediateAction, longTermStrategy, sampleDialogue, frameworkApplied, redFlags. Có nút "Save Diary"
3. **Plan AI** — Upload draft lesson plan → AI trả qualityScore (0-100), strengths, improvements, missingElements, bloomLevels, rewriteSnippet. Auto-lưu vào DB
4. **Style** — Chọn VAK/RW + topic → AI trả approach, activities (name/duration/description), materials, exampleScript
5. **Challenge** — Weekly Teaching Challenge với title/description/difficulty/successMetric/reflectionQuestions
6. **Diary** — Lịch sử các tình huống đã save, collapsible cards

## Pedagogy frameworks
System prompts dùng: Active Learning, Bloom's Taxonomy, Constructivism, Vygotsky's ZPD, Carol Dweck Growth Mindset, UDL, 5E Model, Cognitive Load Theory.

## Brand
Soft emerald + royal blue gradient. Lucide icons: Brain, BookOpen, MessageCircle, Lightbulb, Trophy, History, FileText, Users.
