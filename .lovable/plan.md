# Admin data review: activity/AI, classes, assignments, placement results

I checked the admin screens against the live database. Most things work, but there are five real weak points that will show wrong or incomplete numbers as the school grows. Below is what I found and what I would fix.

## What I found

**1. Duplicate student names are handled in one place only**
The main dashboard snapshot merges students who share the same name (8 such name groups exist today out of 99 profiles). The Classes, Assignments and Placement screens do not merge them, so the same person can appear several times in student pickers and lists. A teacher can assign work to the "wrong copy" of a student.

**2. Assignment creation can half-succeed silently**
When a new assignment is created, the follow-up writes (one progress row per student, one notification per student) are sent without checking whether they succeeded. If either fails, the success message still says "students notified" while some students never see the task. Currently: 1 assignment, 1 submission row, 245 notifications - so this has not bitten yet, but it will.

**3. Hidden row ceilings**
- Assignments screen: 200 assignments, 2000 submissions, 1000 students maximum.
- Placement results: 200 results maximum (6 today).
- Classes screen: student and member lists have no explicit ceiling, so they silently stop at 1000 rows.
Once any of those limits is passed, the screen quietly shows partial data with no warning.

**4. Class management has no membership safety net**
There is 1 class and 0 class members in the database, yet assignments can already be targeted "by class". Choosing a class with no members silently targets nobody. Also, saving class members deletes then re-inserts rows without checking for errors, so a failed insert can leave a class empty.

**5. Heavy dashboard snapshot**
The overview pulls 120 days of learning activity in one request (about 12,000 records, ~2.7 MB) and re-computes everything in the browser. It is cached for 3 minutes, so it works, but it is the slowest part of the page and will keep growing.

**AI usage tracking and placement results themselves look healthy** - AI calls are being logged (4,166 rows), placement results load with proper error messages, and audio playback uses time-limited signed links.

## What I would fix

1. Merge duplicate students consistently in Classes, Assignments and Placement lists, using the same name-merging rule the overview already uses, and mark merged entries so teachers can see it.
2. Make assignment creation all-or-nothing: check every write, report exactly how many students were notified, and warn clearly if any part failed.
3. Replace hidden row ceilings with proper paging plus a visible "showing X of Y" count on Assignments, Placement results and Classes.
4. Add guards to class management: warn when assigning to an empty class, show member counts next to each class name, and verify member saves before reporting success.
5. Trim the overview request to a shorter default window with an explicit longer-range option, so the page loads faster while still allowing deep review.
6. Add a small automated check that flags duplicate students, classes with no members, and assignments whose notification count does not match the number of targeted students, surfaced in the existing Health Monitor tab.

## Technical notes

- Duplicate merging: reuse the normalization used in `get_admin_dashboard_snapshot` (trim + lowercase + collapse whitespace, keep oldest profile as primary) in a shared client helper so `AdminClasses.tsx`, `AdminAssignments.tsx` and `AdminPlacementResults.tsx` behave identically.
- `AdminAssignments.tsx:497` and `:511` currently ignore the returned error; wrap the assignment + submissions + notifications sequence so failures roll the assignment back or clearly report partial delivery.
- Row caps to replace with paging: `AdminAssignments.tsx:121-125`, `AdminPlacementResults.tsx:151`, `AdminClasses.tsx:42-44` (implicit 1000).
- `AdminClasses.tsx:237-241`: delete + insert of `class_members` runs unchecked; add error handling and reload from the server after saving.
- `AdminDashboard.tsx:203`: 120-day window; make it selectable (30 / 90 / 120 days) with 30 days as default.
- Health checks added as additional entries in the existing Health Monitor list, no new tables.
- No schema changes, no route changes, no change to how students see their assignments or notifications.
