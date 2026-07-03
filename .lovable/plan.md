# Kế hoạch: Vietnamese for Foreigners - Professional Edition

## Bối cảnh

Đã có `/learn-vietnamese/for-foreigners` với 5 module chủ đề (Xưng hô, Ẩm thực, Di chuyển, Kết bạn, Công sở) + Survival. Nội dung tốt nhưng **thiếu lộ trình chuẩn theo cấp độ, thiếu bảng chữ cái/phát âm bài bản, thiếu ngữ pháp nền tảng, thiếu đánh giá/chứng chỉ**. Mục tiêu: biến thành khóa học chuẩn quốc tế cho người nước ngoài học tiếng Việt.

## Mục tiêu

1. Lộ trình rõ ràng theo **CEFR A1 → A2 → B1** (tương đương chuẩn VSL/ACTFL).
2. Nền tảng phát âm/ngữ pháp **có hệ thống**, không nhảy thẳng vào tình huống.
3. Trải nghiệm học **tương tác** (nghe-nói-đọc-viết) với chấm tự động.
4. Có **placement test + progress tracking + certificate** khi hoàn thành cấp độ.
5. Giao diện **song ngữ EN/VI mặc định EN** (người nước ngoài là user chính).

## Kiến trúc trang mới

```text
/learn-vietnamese/for-foreigners  (Hub - redesign)
├── Placement Test  (10-15 câu → gợi ý cấp độ A1/A2/B1)
├── Level A1 - Foundation  (Survival Vietnamese)
│   ├── 1. Alphabet & Pronunciation  (29 chữ + 6 thanh + minimal pairs)
│   ├── 2. Numbers, Time, Dates
│   ├── 3. Greetings & Self-introduction
│   ├── 4. Family & Pronouns (anh/chị/em system)
│   ├── 5. Basic Grammar: SVO, classifiers, "là"
│   └── A1 Checkpoint Test
├── Level A2 - Everyday Life  (module hiện có tái cấu trúc)
│   ├── Food & Ordering | Transport | Shopping | Directions
│   ├── Grammar: past/future markers (đã/đang/sẽ), questions
│   └── A2 Checkpoint Test
├── Level B1 - Fluency
│   ├── Work & Email | Health | News reading | Opinions
│   ├── Grammar: passive, relative clauses, conjunctions
│   └── B1 Checkpoint + Certificate
├── Skill Labs (cross-level)
│   ├── Listening Lab  (dialogue TTS 0.8x/1x, gap-fill)
│   ├── Pronunciation Lab  (record + Web Speech API scoring, hiện có ở /english/pronunciation - port sang VI)
│   ├── Writing Lab  (diacritic typing drills, sentence builder)
│   └── Culture Notes (giữ module hiện có làm tài liệu bổ trợ)
└── My Progress  (streak, mastered words, badges A1/A2/B1)
```

## Nội dung cần thêm (data)

- `a1Foundation.ts`: 5 lessons × (10 vocab + 3 dialogues + 5 quiz + pronunciation drill)
- `a2Everyday.ts`: tái sử dụng `detailedVFFModules` + bổ sung grammar block mỗi lesson
- `b1Fluency.ts`: 5 lessons mới cho công việc/tin tức/quan điểm
- `placementTestVFF.ts`: 15 câu adaptive (5 A1 + 5 A2 + 5 B1)
- `vffGrammarPoints.ts`: 25 điểm ngữ pháp cốt lõi (SVO, classifier, tense markers, questions, negation, comparison, passive, relative clause…)
- `vffMinimalPairs.ts`: cặp phát âm dễ nhầm (ma/má/mà/mả/mã/mạ, ăn/anh, ê/ơ…)

## Tính năng UI mới

1. **Level roadmap** ngang (giống Duolingo path) với node A1→A2→B1, unlock theo checkpoint.
2. **Placement Test wizard** 3 bước, kết quả gợi ý start level + lưu localStorage `vff_level`.
3. **Grammar Card** component: công thức + 3 ví dụ + common mistake (như English Grammar hiện có).
4. **Pronunciation Recorder**: Web Speech API `vi-VN`, so sánh transcript → % accuracy (tái dùng pattern từ Finnish/English Speaking).
5. **Diacritic Typing Drill**: gõ có dấu (Telex/VNI helper), chấm tự động.
6. **Certificate modal** PDF khi đạt ≥80% checkpoint (dùng jsPDF đã có).

## Chi tiết kỹ thuật

- Route mới: `/learn-vietnamese/for-foreigners/a1`, `/a2`, `/b1`, `/placement`, `/labs/:type`
- Progress: bảng Supabase `vff_progress` (user_id, level, lesson_id, score, completed_at) + RLS + GRANT theo chuẩn dự án; fallback localStorage cho guest.
- TTS: dùng edge function `vietnamese-tts` hiện có, rate 0.85 cho A1, 1.0 cho B1.
- IPA: dùng `vietnameseToIpa` sẵn có cho mọi vocab entry.
- i18n: mặc định EN cho VFF pages (override `useLanguage` khi vào section này lần đầu).
- SEO: title "Learn Vietnamese - A1/A2/B1 Course for Foreigners | HaiEduTech".
- Tuân thủ Core rules: gradient Royal Blue → Emerald, semantic tokens, không hardcode màu, mobile-first.

## Phạm vi giai đoạn 1 (đề xuất triển khai ngay)

1. Redesign Hub `/for-foreigners` với level roadmap + placement CTA.
2. Tạo Level A1 hoàn chỉnh: 5 lessons + checkpoint + pronunciation lab.
3. Wrap module hiện có thành Level A2.
4. Placement Test 15 câu.
5. Progress tracking (localStorage + Supabase table).

Giai đoạn 2 (sau khi phase 1 ổn): Level B1, Writing Lab, Certificate PDF, tích hợp AI grading cho speaking.

## Câu hỏi cần xác nhận

- Đồng ý phạm vi Phase 1 như trên, hay muốn làm gọn hơn (chỉ A1 + Placement) / mở rộng hơn (gồm cả B1 luôn)?
- Có cần **giọng nói người bản xứ thu sẵn** (mp3) cho A1 phát âm, hay dùng TTS Google là đủ?
- Có phát hành **certificate PDF có chữ ký thầy Hải** khi hoàn thành mỗi level không?

làm hết tất cả phần trên, nhớ rà soát lại và đảm bảo tính chuyên nghiệp nhất cho phần nội dung 