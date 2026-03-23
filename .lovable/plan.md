

## Plan: Expand Programming Curriculum to 200+ Lessons with Enhanced IDE

### Summary

This is a massive curriculum expansion across 4 categories (AI Foundation, SQL & Database, Data Engineering, Machine Learning), upgrading the lesson data, IDE layout, and adding progress tracking with skill visualization.

### Current State

- `programmingLessonData.ts` has ~1815 lines with ~10 lessons per module across 5 pillars
- Each module has `course: "data-ai"` and contains theory, code, exercise, quiz
- IDE uses Pyodide (Python) and sql.js (SQL) in-browser
- Lesson page (`ProgrammingLesson.tsx`) has a 2-column layout with sidebar navigation

### Technical Approach

The request for 50 modules × 4 categories = 200 modules is too large for a single static file (would be 50,000+ lines). Instead, we'll use a **hybrid approach**:

1. **Seed data**: Expand `programmingLessonData.ts` to ~10-12 modules per category (covering all key topics at varying difficulty levels)
2. **AI-generated expansion**: Use the existing `generate-and-store-lesson` edge function to let teachers bulk-generate additional lessons per category on demand
3. **Difficulty levels**: Add a `level` field (1-5) to the `ProgrammingLesson` interface for progressive filtering

### Changes

#### 1. Expand Lesson Data Structure
**File: `src/data/programmingLessonData.ts`**
- Add `level: 1|2|3|4|5` and `difficulty: "beginner"|"intermediate"|"advanced"` fields to `ProgrammingLesson` interface
- Expand each category to 10-12 modules with specific topics:

**AI Foundation** (~12 modules): History of AI, Neural Network Basics, Activation Functions, Loss Functions & Optimization, Gradient Descent, CNNs, RNNs & Sequences, Transformers & Attention, LLMs & Prompt Engineering, Fine-tuning, RAG Systems, AI Ethics & Governance

**SQL & Database** (~12 modules): SELECT Basics, WHERE & Filtering, Aggregate Functions, GROUP BY & HAVING, JOINs (INNER/LEFT/RIGHT/FULL), Subqueries, CTEs, Window Functions, Indexing & Performance, Database Design & Normalization, Stored Procedures, Query Optimization

**Data Engineering** (~12 modules): Python for Data (Pandas basics), Data Cleaning, CSV/JSON/API Ingestion, ETL Pipeline Design, Data Modeling (Star/Snowflake Schema), Data Warehousing Concepts, Batch vs Stream Processing, Data Quality & Validation, Orchestration (Airflow concepts), Cloud Data Platforms, Data Lake Architecture, Production Pipelines

**Machine Learning** (~12 modules): Linear Regression, Logistic Regression, Decision Trees, Random Forests, SVMs, K-Means Clustering, Feature Engineering, Cross-Validation, Hyperparameter Tuning, Model Evaluation Metrics, Ensemble Methods, MLOps & Deployment

#### 2. Split Data Into Separate Files
**New files:**
- `src/data/curriculum/aiFoundationLessons.ts`
- `src/data/curriculum/sqlLessons.ts`
- `src/data/curriculum/dataEngLessons.ts`
- `src/data/curriculum/mlLessons.ts`
- `src/data/curriculum/index.ts` (barrel export + combined array)

Each file exports its modules array. The main `programmingLessonData.ts` imports and re-exports for backward compatibility.

#### 3. Enhanced IDE Layout (3-Panel)
**File: `src/pages/ProgrammingLesson.tsx`**
- Redesign to a 3-panel layout using `react-resizable-panels` (already installed as `src/components/ui/resizable.tsx`):
  - **Left**: Theory/instructions panel (collapsible sidebar with module navigation)
  - **Center**: Code editor (CodeMirror with Python/SQL)
  - **Right**: Console output + test results
- On mobile: Stack vertically (Theory → Editor → Console)
- Add a "Run Tests" button that validates output against expected results stored in lesson data

#### 4. Add Test Cases to Lesson Data
- Extend `ProgrammingLesson` interface with:
  ```typescript
  testCases?: { input: string; expectedOutput: string; description: string }[];
  ```
- Each coding exercise includes 2-3 hidden test cases for validation

#### 5. Skill Progress Visualization
**New file: `src/components/SkillRadarChart.tsx`**
- Use Recharts `RadarChart` to show skill growth across sub-domains (e.g., for SQL: Queries, Joins, Optimization, Design)
- Track completion per module in localStorage
- Display after each completed exercise

#### 6. Next-Step Recommendation Logic
**New file: `src/components/LearningRecommendation.tsx`**
- Simple RL-inspired logic: track scores per module, suggest next exercise based on:
  - Incomplete modules at current difficulty level
  - Weakest skill areas (lowest quiz scores)
  - Progressive difficulty unlock (Level N+1 unlocks after 70%+ on Level N)
- Display as a card after exercise completion: "Recommended next: [Module Name] — [Reason]"

#### 7. Solution Explanations
- Add `solutionExplanation: string` field to `ProgrammingLesson` interface
- Show detailed step-by-step explanation after submission via an expandable panel

### File Summary

| File | Action |
|------|--------|
| `src/data/curriculum/aiFoundationLessons.ts` | Create — 12 modules |
| `src/data/curriculum/sqlLessons.ts` | Create — 12 modules |
| `src/data/curriculum/dataEngLessons.ts` | Create — 12 modules |
| `src/data/curriculum/mlLessons.ts` | Create — 12 modules |
| `src/data/curriculum/index.ts` | Create — barrel export |
| `src/data/programmingLessonData.ts` | Update — new interface fields, import from curriculum/ |
| `src/pages/ProgrammingLesson.tsx` | Rewrite — 3-panel resizable layout, test runner, recommendations |
| `src/components/SkillRadarChart.tsx` | Create — Recharts radar for skill visualization |
| `src/components/LearningRecommendation.tsx` | Create — next-step suggestion component |
| `src/pages/Programming.tsx` | Update — show difficulty filters, module counts per pillar |

### Execution Order

1. Create curriculum data files (4 category files + index)
2. Update `programmingLessonData.ts` interface and imports
3. Build `SkillRadarChart` and `LearningRecommendation` components
4. Rewrite `ProgrammingLesson.tsx` with 3-panel layout + test runner + recommendations
5. Update `Programming.tsx` with difficulty filters and updated module counts

