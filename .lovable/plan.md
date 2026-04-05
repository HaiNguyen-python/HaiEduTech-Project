

## Plan: Expand Cambridge Lectures — Add 15 New Lessons (Starters to PET)

### Current State
- 15 lectures total: 3 per level (Starters, Movers, Flyers, KET, PET) + 1 shared vocabulary lesson
- Each lecture has ~50 lines of structured data (steps, rules, practice, vocab, quiz)

### Expansion: Add 3 new lectures per level = 15 new lectures (total: 30)

Since `cambridgeLecturesData.ts` is already 921 lines, the new 15 lectures will be added in a new expansion file to keep things manageable.

### New Lectures by Level

**Starters (3 new)**
1. **Animals & Body Parts** — Reading & Writing: match words to pictures of animals and body parts
2. **My Family & Friends** — Speaking: describe family members using simple adjectives
3. **Numbers & Counting to 20** — Listening: number dictation and quantity matching

**Movers (3 new)**
4. **Weather & Seasons** — Vocabulary: weather words, seasons, and "What's the weather like?" patterns
5. **Daily Routines & Time** — Listening: clock times and daily activity sequences
6. **Adjective Adventure** — Reading & Writing: comparatives (bigger, smaller, faster)

**Flyers (3 new)**
7. **Past Tense Stories** — Reading & Writing: irregular past tenses in story context
8. **Giving Directions** — Speaking: map-based directions with turn left/right, go straight
9. **Compound Nouns & Word Building** — Vocabulary: bedroom, classroom, football, etc.

**KET (3 new)**
10. **Shopping & Money** — Speaking: role-play buying items, asking prices, making decisions
11. **Present Perfect vs Past Simple** — Reading & Writing: "Have you ever...?" vs "I went..."
12. **Informal Letter Writing** — Reading & Writing: 100-word letters to a friend

**PET (3 new)**
13. **Reported Speech** — Reading & Writing: "She said that..." transformations
14. **Photo Description** — Speaking: Part 3 photo comparison and opinion giving
15. **Sentence Transformation** — Reading & Writing: Part 1 key word transformations

### Technical Approach

1. **Create** `src/data/cambridgeLecturesExpansion.ts` — contains all 15 new `CambridgeLecture` objects
2. **Update** `src/data/cambridgeLecturesData.ts` — import and merge the expansion into `allCambridgeLectures`
3. Each lecture includes: 3 step-by-step guides, 3 illustrated rules, 3 watch-outs, 3 practice items, 4-6 vocabulary items, 3 quiz questions, parent info (EN + VI)

### Files
- `src/data/cambridgeLecturesExpansion.ts` (new, ~900 lines)
- `src/data/cambridgeLecturesData.ts` (update export array)

