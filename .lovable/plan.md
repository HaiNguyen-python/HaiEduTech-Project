# Lock all learning content behind Premium

## Goal
Anyone without Premium can see only intro pages. Every lesson, test, game, dictionary tool and AI feature is locked. Premium opens when a learner:
- enters the code haiedutech2026, or
- pays online (29 EUR card) or by bank transfer after you approve it.
Teachers, admins and assistants still have full access.

## What stays open (without Premium)
- Home, About, Contact, Tutor profile, Charity page
- Course overview pages: title, description and lesson list, with a lock icon on every lesson
- Scholarship and Insights articles (for search visibility), pricing, certificate check, sign in and sign up
- Student dashboard basics: profile and Upgrade button

## What gets locked
- Every lesson in every course, with no free lessons: IELTS, TOEIC, Cambridge, SAT, THPT, HSK/HSKK, YKI/Finnish, Japanese, Vietnamese, Conversational EN/ZH/FI, Grammar, Business/Academic, Programming/Python, AI Academy, VFF
- All mock exams and tests, including the first one
- AI grading, Speaking Coach, chatbot study features, Counseling Hub AI
- Vocabulary banks, Daily Word Mission, Game Center, Super Dictionary, Notebook, songs
- Certificate and PDF downloads

A locked page shows a clear "Premium required" screen with two buttons: "Enter activation code" and "Upgrade", both opening the existing Upgrade window. Visitors who are not signed in are asked to sign in first.

## Approach
1. List every page and sort it into "open" or "locked", so none are missed.
2. Add one route-level Premium guard in App.tsx and wrap every locked route. This covers the whole page instead of adding locks one by one inside pages.
3. Set the free allowances to zero: FREE_LESSONS 3 to 0, 1 free mock exam to 0, 3 free AI grades to 0. The in-page locks that already exist then agree with the route guard.
4. Put Premium checks in the paid AI server functions, so the locks cannot be bypassed by calling them directly. Staff and Premium users pass; everyone else gets a 403 "premium_required" error.
5. Update the Upgrade window and comparison table text to say "Free: intro only" instead of "3 free lessons".
6. Test with Playwright as a signed-out visitor, a free account and a staff account on a sample of locked pages.

## Technical details
- New `src/components/PremiumRoute.tsx` uses `usePremium()`. While loading it shows a skeleton. When there is no user it sends the visitor to `/auth?redirect=`. When there is no Premium it shows the locked screen with `openUpgradeModal()`.
- `usePremium` already treats staff and `status='active'` with a valid expiry as Premium. The activation code and Stripe webhook already write this, so no database change is needed.
- Server functions use `_shared/premium.ts`, calling `has_premium(auth.uid())` after checking the user's login token.
- Update the memory note on free limits (freemium-gates) to "intro only".
