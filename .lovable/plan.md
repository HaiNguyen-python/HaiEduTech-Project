# Đề xuất mở rộng: Vietnamese for Foreigners (sau Phase 1)

Hiện đã có: Hub Pro, Placement Test, A1/A2/B1 Level Pages, Pronunciation Lab, Grammar Reference (25 điểm), Certificate PDF, Progress Tracking (localStorage). Dưới đây là các mục cần thêm để đưa khóa học lên tầm "chuyên nghiệp quốc tế" ngang VSL/Duolingo/Pimsleur.

## 1. Nội dung học thuật (Content Depth)

- **A2 Content Pack riêng** (`a2Everyday.ts`): hiện A2 dùng tạm module cũ. Cần 6 bài chuẩn cấu trúc giống A1/B1: Ăn uống, Đi lại, Mua sắm, Hỏi đường, Sức khỏe, Thời tiết - mỗi bài 12 vocab + 3 dialogue + 2 grammar + drill + quiz.
- **B2 Advanced** (mở rộng CEFR): tin tức, tranh luận, văn học ngắn - dành cho học viên muốn du học/định cư VN.
- **Kanji-of-Vietnamese - Hán Việt Roots**: 100 gốc Hán Việt phổ biến (quốc, gia, học, sinh...) giúp người biết chữ Hán học nhanh gấp 3.
- **Regional Dialects Mini-Course**: Bắc vs Trung vs Nam - phát âm, từ vựng khác biệt (bố/ba/tía, quả/trái...).

## 2. Kỹ năng còn thiếu (Skill Labs mới)

- **Listening Lab**: dialogue TTS 0.75x/1x/1.25x, gap-fill transcript, dictation mode, 20 bài nghe theme (chợ, taxi, khách sạn, bệnh viện...).
- **Writing Lab**: 
  - Diacritic Typing Drill (gõ dấu Telex/VNI có helper)
  - Sentence Builder (kéo-thả từ)
  - Guided Composition (viết email/tin nhắn theo template, AI chấm)
- **Reading Lab**: 15 bài đọc graded (A1: biển hiệu/menu → B1: bài báo ngắn) + câu hỏi hiểu.
- **Speaking Roleplay** (giống Conversational EN/ZH đã có): AI đóng vai chủ quán, tài xế Grab, lễ tân... dùng Perplexity + TTS VN.

## 3. Tương tác & Gamification

- **SRS Flashcard System** (Spaced Repetition) cho toàn bộ vocab VFF - port từ `useHskSRS`/`useMasteredVocab`.
- **Daily Challenge**: 5 phút/ngày mix 4 kỹ năng, giữ streak.
- **VFF Leaderboard**: điểm mastered words, hòa vào hệ thống leaderboard chung.
- **Achievement Badges**: "Tone Master" (100% minimal pair), "Diacritic Ninja", "Bún Bò Ordering Pro"...
- **Study Buddy Chatbot** - "Cô Mai" AI tutor VN chuyên trả lời câu hỏi ngữ pháp bằng EN.

## 4. Văn hóa & Ngữ cảnh thực tế

- **Culture Deep-Dives** (đọc kèm audio): Tết, đám cưới, cà phê sữa đá, giao thông xe máy, mặc cả ở chợ - có "Do & Don't".
- **Survival Phrase Cards** in được (PDF): danh thiếp dịch tên món ăn, dị ứng, cấp cứu.
- **Video Immersion**: nhúng clip YouTube ngắn (vlog, quảng cáo VN) + transcript có dấu + glossary click-to-translate.
- **Map-based Scenarios**: chọn quận Hà Nội/HCM → mở khóa dialogue địa phương.

## 5. Đánh giá & Chứng chỉ

- **Adaptive Mid-Level Tests**: giữa A1, giữa A2 (không chỉ cuối cấp).
- **Speaking Exam** với AI grading (Perplexity chấm phát âm + ngữ pháp + trôi chảy, thang 0-9 giống IELTS).
- **Writing Exam** chấm tự động: chính tả dấu, ngữ pháp, tính mạch lạc.
- **Certificate nâng cấp**: chữ ký thầy Hải, QR verify link, mã chứng chỉ unique lưu Supabase.
- **VSL/ACTFL Mapping**: hiển thị "tương đương VSL bậc 2" bên cạnh CEFR.

## 6. Cá nhân hóa & Progress

- **Supabase Sync** (`vff_progress` table với RLS + GRANT) - đồng bộ cross-device.
- **Learning Path Personalization**: sau placement, hỏi mục tiêu (du lịch/kết hôn/làm việc/du học) → path riêng.
- **Weakness Radar**: chart 6 kỹ năng (tone, vocab, grammar, listening, speaking, reading) từ dữ liệu quiz.
- **Study Reminder**: email nhắc học hàng ngày (dùng edge function có sẵn).

## 7. Trải nghiệm & UX

- **Native Speaker Audio**: thu MP3 giọng thật cho 200 câu core A1 (thay TTS) - upload Supabase Storage.
- **IPA + Vietnamese Phonetic Both**: song song IPA quốc tế + phiên âm giả tiếng mẹ đẻ (ví dụ EN speaker: "chào" = "chow").
- **Slow-motion Mouth Diagram** cho 6 thanh + âm khó (ng, tr, nh, ư, ơ).
- **Offline PWA**: cache A1 lessons học offline.
- **Print-friendly Worksheets** cho giáo viên.

## 8. Ecosystem & Marketing

- **Free Trial Lesson** landing riêng SEO ("Learn Vietnamese Free - A1 Lesson 1").
- **Teacher Dashboard**: giáo viên tạo lớp, gán bài, xem tiến độ học viên.
- **Community Forum / Language Exchange**: match người học VN <-> người học EN.
- **Blog Study Tips** bằng EN để hút SEO ("How to master 6 Vietnamese tones").

## Đề xuất thứ tự ưu tiên (Phase 2/3/4)

```text
Phase 2 (cốt lõi thiếu):     A2 Content Pack + Listening Lab + Writing Lab + SRS + Supabase sync
Phase 3 (chiều sâu):         Speaking Roleplay AI + Cultural Deep-Dives + Native Audio + Adaptive tests
Phase 4 (mở rộng):           B2 + Hán Việt + Dialects + Teacher Dashboard + Community + PWA
```

## Câu hỏi cần xác nhận

- Muốn bắt đầu **Phase 2 toàn bộ** hay chỉ chọn 2-3 hạng mục ưu tiên nhất?
- Có ưu tiên **Speaking Roleplay AI** (nặng backend, tốn credit AI) sớm không, hay để Phase 3?
- Có muốn đầu tư **thu âm giọng bản xứ** ngay Phase 2 hay tiếp tục dùng TTS Google/Edge?

&nbsp;

làm hết cho tôi trong 1 lượt luôn đi 