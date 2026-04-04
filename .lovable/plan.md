

## Plan: Expand & Reorganize Finnish Mock Exams by Skill

### What changes

**1. Add skill filter tabs in the Kokeet section**

Replace the current flat grid of 16 modules with a filtered view organized by skill:
- 📖 Lukeminen (Reading) — 4 modules, 16 lessons
- 🎧 Kuunteleminen (Listening) — 4 modules, 16 lessons  
- ✍️ Kirjoittaminen (Writing) — 4 modules, 18 lessons
- 🎙️ Puhuminen (Speaking) — 4 modules, 18 lessons
- 📋 Kaikki (All) — show everything (default)

Each module card shows a completion badge (e.g., "3/5 ✓") and a green checkmark if all lessons are done.

**2. Add new mock exam content (Expansion 4)**

Create `src/data/finnishCurriculum/mockExamExpansion4.ts` with 5 new lessons per skill (20 total), all closely modeled on real YKI A2 exam format:

- **Reading (5)**: Official notices (Kela letter, library rules), classified ads, event programs, medicine instructions — each with 4-5 comprehension questions
- **Listening (5)**: Supermarket announcements, phone calls to services (Kela, doctor), radio traffic updates, neighbor conversations — each with 3-4 questions
- **Writing (5)**: Formal complaint to housing company, response to job ad, message to child's teacher, booking confirmation email, feedback form — each with sample answer and keyword evaluation
- **Speaking (5)**: Pharmacy visit, describing daily routine, asking for directions, phone call to cancel appointment, introducing family — each with sample answer and quiz

**3. Show completion status on module cards**

On the Kokeet module grid, each card displays:
- Progress indicator: "3/5 completed"
- Green checkmark overlay when all lessons in that module are done

### Files to modify/create

1. **`src/data/finnishCurriculum/mockExamExpansion4.ts`** — new file with 4 modules × 5 lessons = 20 new exam tasks
2. **`src/data/finnishCurriculum/index.ts`** — export the new expansion
3. **`src/pages/YkiDashboard.tsx`** — add skill filter sub-tabs in Kokeet view, import new data, show per-module completion progress on cards

### Technical details

In `YkiDashboard.tsx`:
- Add state `mockSkillFilter` with values `"all" | "reading" | "listening" | "writing" | "speaking"`
- Filter `allMockExamModules` by checking if module `id` contains the skill keyword
- On each module card, compute `completedCount / totalCount` from `progress` state and display it
- The sub-tabs render only when `activePillar === "mock-exams"` and no module is selected

