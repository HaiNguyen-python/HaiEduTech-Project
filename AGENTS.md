- Interpersonal Skills: `lifestyle` for placement, `interpersonal` for activity; separate tables prevent duplicate charts.
- Keep IELTS vocabulary photos in a one-word map separate from emoji resolution.
- Home results use only published `testimonials`; staff manage all; never hardcode or generate them; hide when empty.
- Tuition uses `CourseTuitionSection`, `--tuition-*` tokens and one responsive list to keep prices and the 3x one-to-one rule consistent.
- Derive registration prices from the shared catalog; server-validate EUR prices and separate course payments from Premium.
- Keep only the exact `/english`, `/chinese`, `/programming`, and `/register` overview routes public; nested learning routes remain authentication and Premium protected.
- Keep auth emails in the shared six HaiEduTech templates deployed through the auth hook.
- Use shared `normalizeMath` for Programming math; audit malformed delimiters.
- HSK visuals use Hanzi-aware mappings and stable category fallbacks to avoid generic icons.

- Public nav: Home, About, English, Chinese, Finnish, Vietnamese, Technology, Interpersonal Skills, Your Corner. Finnish is open to signed-in users; hide JA/SV (teacher-gated), Specialized Language and Super Dictionary; preserve course URLs.
- Keep YKI Writing exams in one typed bank to prevent drift; original A2 typing stays separate, preserving exam IDs and length-based levels.
- Format Finnish and English model-letter layout through the shared letter formatter, preserving wording and testing closing/signature separation to prevent inline sign-offs.
- Keep uploaded Finnish YKI B1 Speaking exams in one typed bank grouped by exam and the four official practice parts, so prompts and trilingual model answers stay aligned.
- Keep uploaded YKI B1 Reading documents in a separate typed bank with original mixed question formats; auto-score choices and provide reference guidance for short answers to avoid false exact-match grading.
- Pattern Drilling shares selectors/language metadata, case-ready Finnish bank/TTS and scoped CMU IPA to preserve grammar, audio and stress.
- Writing-practice tasks use unseen random selection with a single Next action; Chinese vocabulary and pattern tasks always show a complete Hanzi, Pinyin, and meaning example.
- Course notices use tuition defaults, one language snapshot per recipient, and the staff-only single-notice function.
- TOEIC vocabulary uses the shared Word Quest and Daily Mission engines with its own storage namespace and existing TOEIC mastery subject, so learning progress never collides with IELTS.
- TOEIC shares Part guides/techniques; `toeicLectureContent.test.ts` audits IDs, keys and evidence.
- TOEIC S/W: audit `toeicSWContentSets` with `toeicSwAudit.test.ts`; grade text, not session-only audio.
- Python Challenge rankings count distinct completed challenge IDs from activity logs through an authenticated read-only function, preventing repeat attempts from inflating totals.
- Generate 999 Letters into lazy-loaded `src/data/chineseLetters/part*.ts`; regenerate Pinyin/keywords and audit with `scripts/audit_chinese_letters.ts` to avoid bundle bloat.
- Chinese typing modes preserve punctuation via `chineseLetterTyping` and share IME-aware input: committed text drives grading; map active Pinyin to one Hanzi and guard IME Enter to prevent premature errors.
- Python theory shares book banks, TheorySections, CodeMirror and harness; preserve IDs/progress. Python/DSA tiles use images and token overlays.
- Generate Python Challenges from `scripts/python_challenges/spec_*.py` via `build.py`; audit and browser grading share `pythonChallengeHarness.ts`.
- Python charts group unique challenge completions into six areas; date growth from earliest activity, never invent ability grades.
- Python views share unlock/merged progress; completion refreshes access and editor Next. Grouped cheatsheet uses a typed bank with Python execution audits; GUI examples are desktop-only and syntax-checked.
- IELTS Reading shares task groups, compact heading pools and ReaderPassage across rooms; preserve source IDs/theme scope and keep choose-TWO pairs intact as two marks in 40-slot papers for aligned grading.
- Code Typing uses quote-aware numeric formatting. Lessons share CodeBlock with local scrolling; preserve nesting/literals and fix syntax at source to avoid corrupting code.

- Finnish games share Finnish TTS and stop audio on exit; native fallback requires a Finnish voice, never English.

- Dictionary: local Finnish entries, deferred EN translations; reject stale request IDs.
- IELTS lesson summaries use subject visuals and evidence checks, not grammar defaults.
- PTE shares sourced 22-type rules, protected attempts and exact-ID mini-set links; audit mismatch indices/adjacent pairs; label estimates, not official scores.
- PhD and admin sorting: follow `docs/phd-research.md` for persistence and access safety.

- Admin flags share rlEngine. Chinese/Interpersonal use shared sequential locks and completion PDFs; completed lessons remain reviewable; no unverifiable issuance codes.
