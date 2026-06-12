
# Plan: Unified Pet XP System (Option A)

## Mục tiêu
Pet hiện chỉ nhận XP từ 2 nguồn (`ai_academy_xp_v1` + `haiedu_programming_xp_v1`) → học IELTS/HSK/Finnish/TOEIC/SAT/Vocab không làm Pet lên cấp. Sau khi triển khai, **mọi hành động học** trên platform sẽ feed Pet, có toast "+XP", và Pet sẽ celebrate khi đạt mốc.

## Kiến trúc mới

### 1. Hook trung tâm mới: `usePetXP.ts`
- Key localStorage: `haiedu_pet_xp_v1` = `{ xp: number, log: [{source, amount, ts}] (giữ 50 entry gần nhất) }`
- Sync vào Supabase table `user_pet_xp` (cột: user_id, total_xp, updated_at) — đa thiết bị
- Export hàm thuần `awardPetXP(amount, source, opts?)`:
  - Cộng vào localStorage + DB
  - Fire `window.dispatchEvent(new CustomEvent("pet:xp", { detail: { amount, source } }))`
  - Nếu `opts.celebrate !== false` → fire `pet:star` (Pet nhảy múa 60s)
  - Toast "+{amount} XP từ {source}" qua `use-toast`

### 2. Biểu phí XP (XP table)
| Hành động | XP | Source |
|---|---|---|
| Mastered 1 từ vocab (IELTS/HSK/TOEIC/SAT/Finnish/Cambridge…) | +5 | `vocab` |
| Hoàn thành 1 lecture (IELTS/TOEIC/Cambridge/Finnish/THPT) | +20 | `lecture` |
| Pass quiz có sao (mỗi sao) | +10 | `quiz` |
| Hoàn thành 1 mock exam | +50 | `exam` |
| Speaking coach hoàn thành 1 câu shadow | +3 | `speaking` |
| Writing AI grading submit | +15 | `writing` |
| AI Academy lesson/quiz (giữ nguyên) | qua bridge | `ai-academy` |
| Programming module/challenge (giữ nguyên) | qua bridge | `programming` |

### 3. Cập nhật `useStudyPet.ts`
- Bỏ logic đọc 2 key cũ, đọc `haiedu_pet_xp_v1.xp` (cộng dồn từ Supabase khi đăng nhập)
- Migration: lần đầu chạy nếu `haiedu_pet_xp_v1` chưa có → seed = `ai_academy_xp_v1.xp + haiedu_programming_xp_v1.xp` để không mất tiến độ cũ
- Lắng nghe `pet:xp` để refresh ngay (không cần reload)

### 4. Bridge cho 2 hệ cũ
- `useAIAcademyXP.awardXP` và `useProgrammingXP` (nếu có): wrap thêm `awardPetXP(amount, "ai-academy" | "programming", { celebrate: flag === "star" })`
- Không phá UI/HUD hiện tại của AI Academy

### 5. Điểm tích hợp (call sites)
Thêm `awardPetXP(...)` tại các hook/component sau:
- `useMasteredVocab.toggle` — khi `wasMastered === false` (thêm mới) → +5, source `vocab:{subject}`
- `useIeltsLectureProgress` / `useToeicLectureProgress` — khi mark complete → +20
- `useHskSRS`, `useReviewQueue` — khi review pass → +5
- `useSatStars` — mỗi sao mới → +10
- `IeltsMasterQuiz`, `CambridgeMockExam`, `SatMockExam`, `ToeicExams`, `NationalExamPrep`, `HskTestHub` — submit exam → +50
- `SpeakingCoachPage` / Finnish speaking → +3 mỗi câu pass
- IELTS/Finnish writing eval submit → +15

### 6. UI feedback
- Khi `pet:xp` fire: toast nhỏ góc dưới phải `+{n} XP 🐾` (debounce 800ms để gom nhiều event liền nhau)
- Pet HUD/Pet card: thêm dòng "Hoạt động gần nhất: {source} +{xp}" lấy từ `log[0]`
- Trong `PetCard`/dashboard pet: thêm nút "?" mở dialog **"Cách tăng XP cho Pet"** liệt kê bảng XP ở mục 2 (i18n VI/EN)

### 7. Backend
Migration tạo bảng:
```sql
create table public.user_pet_xp (
  user_id uuid primary key references auth.users(id) on delete cascade,
  total_xp int not null default 0,
  last_source text,
  updated_at timestamptz not null default now()
);
grant select, insert, update on public.user_pet_xp to authenticated;
grant all on public.user_pet_xp to service_role;
alter table public.user_pet_xp enable row level security;
create policy "own_pet_xp_select" on public.user_pet_xp for select to authenticated using (auth.uid() = user_id);
create policy "own_pet_xp_upsert" on public.user_pet_xp for insert to authenticated with check (auth.uid() = user_id);
create policy "own_pet_xp_update" on public.user_pet_xp for update to authenticated using (auth.uid() = user_id);
```

## Phạm vi không động đến
- AI Academy HUD, level table, daily quest → giữ nguyên (chỉ thêm bridge)
- Programming XP UI → giữ nguyên
- `LEVEL_THRESHOLDS` của Pet trong `useStudyPet` → giữ nguyên (vẫn hợp lý với scale mới)

## Rủi ro & xử lý
- **Lạm phát XP**: ngưỡng đã calibrate cho scale mới (~25 từ mastered = level up đầu). Nếu thấy lên cấp quá nhanh sau test thực tế, sẽ điều chỉnh hệ số ở mục 2.
- **Double-count**: `useMasteredVocab` chỉ cộng khi `!wasMastered` (toggle thêm), không cộng khi un-mark.
- **Migration mất XP**: seed một lần duy nhất, có flag `_migrated_v1` để không seed lại.

## Deliverable
- Hook mới: `src/hooks/usePetXP.ts` (+ helper export `awardPetXP`)
- Sửa: `useStudyPet.ts`, `useAIAcademyXP.ts`, `useMasteredVocab.ts`, các hook lecture/exam/speaking liệt kê ở mục 5
- Component mới: `PetXPGuideDialog.tsx` + nút mở trong Pet card
- Migration Supabase: bảng `user_pet_xp`
- Memory update: `mem://features/pet-xp-system`
