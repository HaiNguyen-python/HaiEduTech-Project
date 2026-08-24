# IELTS Listening: 30 Full Tests + Content & Audio Audit

## Current state (verified)

- 52 practice sets exist across `ieltsListeningPractice.ts` + 7 expansion files: 13 per section (S1-S4), no duplicate ids.
- Only 40 of them have exactly 10 questions. 16 sets are short: S2 has 4 (5, 6, 6, 7 questions), S3 has 4 (6, 6, 6, 8), S4 has 4 (6, 8, 8, 8). S1 is fully complete.
- `ieltsFullListeningTests.ts` defines only 13 full tests, and tests 10-13 re-use sets already used in tests 1-9.
- Audio is browser TTS with chunking, per-speaker voice/pitch profiles and estimated durations in `ListeningPracticeSetCard.tsx`.

## Goal

30 unique full tests (Q1-Q40 each), every section built from a distinct 10-question set, plus a content and audio-quality pass over all sets.

## Work plan

### 1. Fix the 16 short sets
Extend each to exactly 10 questions, keeping the existing topic and transcript, and lengthening the transcript where needed so every new answer is actually spoken. Result: 13 usable sets per section.

### 2. Add 68 new sets (17 per section)
New Cambridge-style sets, so each section reaches 30 usable sets:
- Section 1 (17 new): phone/service transactions - clinic booking, bike rental, catering order, removals quote, sports club, ferry tickets, evening class, lost property, bank account, dentist, car service, festival stall, homestay, museum group booking, gym induction, laundry service, conference registration.
- Section 2 (17 new): monologues/maps - campus tour, recycling centre, theatre backstage, nature reserve, city bus network, new library building, workplace safety briefing, hostel rules, botanical garden map, sports centre plan, radio traffic report, wildlife park, town regeneration, boat trip briefing, science fair layout, staff orientation, arts festival programme.
- Section 3 (17 new): tutor-student discussions - literature review, questionnaire design, group presentation split, lab report rewrite, placement choice, data analysis problems, module selection, poster session, ethics approval, case study, field survey, dissertation timeline, coding project, interview transcripts, exchange semester, group conflict, viva preparation.
- Section 4 (17 new): academic lectures - memory and sleep, urban heat islands, migration of birds, food security, hydro power, language endangerment, glass recycling, antibiotics resistance, soil carbon, animal navigation, ancient trade routes, noise pollution, robotics in agriculture, tidal energy, volcanic ash and aviation, biodiversity corridors, museum conservation science.

Every new set includes: `context`/`contextVi` with the correct word-limit instruction, full transcript, 10 questions with `maxWords` on all fill-ins, `matchingOptions` for matching sets, `formTitle`/`formLayout` for Section 1 forms, and `mapSvg` for labelling sets.

### 3. Rebuild the 30 full tests
Rewrite `ieltsFullListeningTests.ts` so tests 1-30 each use four distinct sets (one per section) with no set reused across tests, and 30-minute timers.

### 4. Automated content validation
Add a script/test that checks every set and every full test for:
- exactly 10 questions per set, exactly 40 per full test;
- each fill-in answer literally appears in the transcript (spelled-out numbers accepted);
- `maxWords` respected by the answer itself;
- MCQ answer index in range, no duplicate options, and the key supported by the transcript;
- matching letters all present in `matchingOptions`, balanced letter distribution (no answer bias like all-A);
- unique set ids, no orphan question without transcript support, `{n}` placeholders in `formLayout` matching the fill-in count.

### 5. Recording quality pass
For each transcript:
- normalise speaker labels so the multi-voice engine assigns a consistent distinct voice per speaker, including the Section 4 single-lecturer case;
- spell letters/postcodes/phone numbers with hyphen-separated characters so TTS reads them clearly and slowly;
- ensure natural chunk lengths (no chunk over ~35 words) so audio never truncates mid-sentence, and add the standard section pauses;
- keep Section 1-3 at conversational rate and Section 4 slightly slower;
- confirm the estimated duration and progress bar match the real playback length so the timer and "audio finished" state stay accurate.

### 6. Verification
Run the validator plus a browser pass on a full test: play a section end-to-end, submit, and confirm band score, answer key, evidence highlighting and transcript reveal all work.

## Technical notes

- Files touched: `src/data/ieltsListeningPractice*.ts` (short sets fixed), several new `src/data/ieltsListeningPracticeExpansion8..N.ts` files for the 68 new sets, `src/data/ieltsFullListeningTests.ts`, small helper tweaks in `ListeningPracticeSetCard.tsx` / `ListeningFullTestEngine.tsx` if the audit finds timing bugs, plus a validation script under `scripts/`.
- Content is added in batches (one expansion file per ~8 sets) to keep files reviewable; the "By Question Type" tab automatically picks up all new sets.
