# Phase 3 - Vietnamese for Foreigners (VFF)

Sau khi Phase 1 (A1/B1 + Placement + Pronunciation Lab) và Phase 2 (A2 + 6 Skill Labs + SRS) đã hoàn tất, Phase 3 tập trung vào **chiều sâu AI, âm thanh chuẩn bản ngữ, và đồng bộ đám mây** để module đạt chuẩn thương mại.

## 1. AI Speaking Roleplay Pro (nâng cấp)

Nâng `VFFSpeakingRoleplay` từ cây thoại tĩnh sang hội thoại AI thực sự.

- Edge function `vff-roleplay-ai` gọi Lovable AI Gateway (google/gemini-2.5-flash) đóng vai: Cô bán phở, Anh Grab, Lễ tân khách sạn, Bác sĩ, Cảnh sát giao thông.
- Web Speech API (`vi-VN`) → text → AI phản hồi tiếng Việt + gợi ý bản dịch EN.
- Chấm điểm: độ tự nhiên, ngữ pháp, dùng đúng đại từ (anh/chị/em/cô/chú).
- Nút "Xin gợi ý" khi bí, và "Rewind" để nói lại.

## 2. Native Speaker Audio Pack

Thay TTS bằng audio bản ngữ cho 200 câu lõi A1 + 150 câu A2.

- Tạo bucket Storage `vff-audio` (public read).
- Bảng `vff_audio_clips` (id, level, key, url, speaker, region North/South).
- Fallback: nếu chưa có clip → dùng `playVietnameseTts`.
- Component `NativeAudioButton` với chọn giọng Bắc/Nam.
- Bước đầu dùng ElevenLabs qua edge function `vff-tts-native` để pre-generate & cache vào Storage (chạy 1 lần, không tốn credit runtime).

## 3. Adaptive Placement Test 2.0

Nâng `VFFPlacementTest` từ 15 câu tĩnh → adaptive.

- Item bank 60 câu (20/level) trong `vffPlacementBank.ts`, gắn độ khó 1-5.
- Thuật toán 2-PL đơn giản: đúng → khó hơn, sai → dễ hơn; dừng khi độ tin cậy > 0.8 hoặc đạt 20 câu.
- Kết quả trả về: CEFR level, điểm mạnh/yếu theo 4 kỹ năng, lộ trình đề xuất.

## 4. AI Writing Grader

Bổ sung tab "AI Chấm bài" vào `VFFWritingLab`.

- Edge function `vff-writing-grade` (Lovable AI gemini-2.5-flash) chấm: dấu thanh, ngữ pháp, từ vựng, mạch lạc (0-10 mỗi tiêu chí).
- Highlight lỗi inline + gợi ý sửa song ngữ.
- Lưu bài + điểm vào `vff_writing_submissions` cho lịch sử tiến bộ.

## 5. Culture Video Immersion

Thêm trang `VFFVideoLounge.tsx`.

- 12 clip YouTube nhúng theo chủ đề (đường phố Hà Nội, phở, Tết, chợ nổi...).
- Mỗi clip: transcript song ngữ VI/EN có timestamp, quiz 3 câu, glossary 5 từ.
- Data: `vffVideoBank.ts`.

## 6. Cloud Sync tiến độ

Chuyển `useVFFProgress` từ localStorage-only sang **hybrid** localStorage + Supabase.

- Bảng `vff_progress` (user_id, level_key, lesson_id, score, mastered_words jsonb, streak, updated_at).
- RLS: mỗi user chỉ đọc/ghi row của mình. GRANT cho authenticated + service_role.
- Guest vẫn dùng localStorage; đăng nhập → merge lên cloud.

## 7. Weakness Radar + Learning Path

Trang `VFFAnalytics.tsx`: biểu đồ Recharts radar 5 kỹ năng (Nghe/Nói/Đọc/Viết/Phát âm) dựa trên điểm đã lưu; gợi ý 3 bài học ưu tiên tuần này.

## 8. Certificate 2.0

Nâng `VFFCertificate`: yêu cầu ≥ 80% ở cả 3 checkpoint A1/A2/B1 + hoàn thành ≥ 1 lần Speaking Roleplay + 1 bài Writing chấm ≥ 7. Chứng chỉ có QR verify link công khai.

---

## Chi tiết kỹ thuật

**Files sẽ tạo mới:**

- `supabase/functions/vff-roleplay-ai/index.ts`
- `supabase/functions/vff-writing-grade/index.ts`
- `supabase/functions/vff-tts-native/index.ts` (pre-gen script)
- `src/data/vietnamese/vffPlacementBank.ts`
- `src/data/vietnamese/vffVideoBank.ts`
- `src/components/vff/NativeAudioButton.tsx`
- `src/pages/VFFVideoLounge.tsx`
- `src/pages/VFFAnalytics.tsx`
- `src/hooks/useVFFCloudSync.ts`

**Files sẽ sửa:**

- `src/pages/VFFSpeakingRoleplay.tsx` (thêm chế độ AI)
- `src/pages/VFFWritingLab.tsx` (thêm tab AI Chấm)
- `src/pages/VFFPlacementTest.tsx` (thuật toán adaptive)
- `src/pages/VFFCertificate.tsx` (điều kiện + QR)
- `src/pages/VFFHubPro.tsx` (thêm card Video, Analytics)
- `src/hooks/useVFFProgress.ts` (hybrid sync)
- `src/App.tsx` (2 route mới)

**Migration DB:**

```sql
create table public.vff_progress (...);
create table public.vff_audio_clips (...);
create table public.vff_writing_submissions (...);
-- GRANT + RLS đầy đủ
```

**Credits/chi phí:** Roleplay + Writing dùng Lovable AI gemini-2.5-flash (rẻ). Native audio pre-generate 1 lần, runtime free.

---

## Thứ tự triển khai đề xuất

1. Cloud Sync (nền cho các phần sau lưu điểm)
2. AI Speaking Roleplay Pro
3. AI Writing Grader
4. Adaptive Placement 2.0
5. Native Audio Pack (A1 trước, A2 sau)
6. Video Lounge + Analytics + Certificate 2.0

Muốn triển khai **toàn bộ Phase 3** hay chọn 2-3 mục ưu tiên trước? Và có muốn đầu tư Native Speaker Audio (ElevenLabs) ngay không, hay tiếp tục TTS cho tới Phase 4?

&nbsp;

làm toàn bộ 