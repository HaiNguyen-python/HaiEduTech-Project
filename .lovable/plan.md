## Bối cảnh

Phần Programming hiện có **341 bài học** trải dài 30 file (Python Pathway, SQL, Web Dev, Software Eng, ML, DL, NLP, RL, Cloud, Data Eng, EdTech, AI Foundation, Cybersecurity, Interactive Labs, Mastery Labs...). Mỗi bài đã có `theory`, `theoryEn`, `code`, `exercise`, `exerciseEn`, và 5 quiz song ngữ.

Sau khi quét tự động, mình thấy **đa số bài đã khá đầy đủ** (5–8KB theory mỗi bài). Tuy nhiên có một nhóm bài nhỏ hơn cần làm giàu thêm: chủ yếu nằm ở `sqlLessons`, `webDevLessons` (mở đầu), `softwareEngLessons` (vài bài CI/CD), `edtechAiInEdtech` (lesson 5–6), `nlpAdvanced` (#7), `programmingInteractiveLabs` (vài lab).

Vì việc rewrite toàn bộ 341 bài cùng lúc rất rủi ro (file lớn, dễ sót typo, mất nhiều phiên), mình đề xuất chia thành **các đợt nhỏ, gọn, kiểm tra build sau mỗi đợt**.

## Cách làm cho MỖI bài

Giữ nguyên cấu trúc, chỉ **mở rộng nhẹ +30–50%**, song ngữ EN+VI đầy đủ:

1. Thêm mục **"Khi nào dùng / When to use"** (1 đoạn ngắn, ví dụ thực tế).
2. Thêm **"Bẫy hay gặp / Common pitfalls"** (3–4 gạch đầu dòng).
3. Bổ sung 1 ví dụ ngắn hoặc bảng so sánh nếu thiếu.
4. Thêm 1–2 câu giải thích sâu hơn cho mỗi quiz (giữ nguyên số quiz 5).
5. Đảm bảo `theoryEn` luôn cập nhật song song.

KHÔNG đổi: `id`, `title`, `level`, `difficulty`, `code`, đáp án đúng của quiz, thứ tự bài.

## Lộ trình đề xuất (mỗi đợt = 1 lần phản hồi)

| Đợt | Module | File | Số bài |
|---|---|---|---|
| 1 | SQL Fundamentals | `sqlLessons.ts` | 12 |
| 2 | Web Development | `webDevLessons.ts` | ~10 |
| 3 | Software Engineering | `softwareEngLessons.ts` | ~10 |
| 4 | Programming Expansion (Python nâng cao) | `programmingExpansion.ts` | ~12 |
| 5 | Interactive Labs + Mastery Labs | 2 file | ~14 |
| 6 | AI Foundation | `aiFoundationLessons.ts` | ~14 |
| 7 | Machine Learning | `mlLessons.ts` | ~12 |
| 8 | Deep Learning | `dlLessons.ts` | ~12 |
| 9 | NLP (lessons + expansion + advanced + production) | 4 file | ~20 |
| 10 | Reinforcement Learning | `rlLessons.ts` | ~12 |
| 11 | Data Engineering | `dataEngLessons.ts` | ~15 |
| 12 | Cloud (lessons + expansion) | 2 file | ~20 |
| 13 | EdTech (lessons + expansion + advanced + AI in EdTech + research) | 5 file | ~35 |
| 14 | Python Pathway (Introduction to Programming) | `pythonPathway.ts` | ~12 |
| 15 | Cybersecurity (vừa thêm) | `cybersecurityLessons.ts` | 12 |

Sau mỗi đợt mình sẽ:
- Verify build pass.
- Báo lại số bài đã enrich và file đã chạm.
- Chờ bạn confirm "tiếp tục" để qua đợt sau.

## Bắt đầu từ đâu?

Mình đề xuất khởi động **Đợt 1: SQL Fundamentals** (vì đây là module được audit cho thấy nhiều bài có theory ngắn nhất, và SQL là nền tảng nhiều người mới học cần rõ).

Bạn duyệt plan này thì mình sẽ chạy Đợt 1 ngay; nếu muốn đổi thứ tự (ví dụ ưu tiên Python Pathway / Cybersecurity / EdTech trước), cứ nói.
