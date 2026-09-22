# Rà soát và mở rộng phần bài học Tiếng Việt

## Hiện trạng (đã kiểm tra trực tiếp trong dữ liệu)

Tổng cộng 156 bài trong 19 nhóm bài học:

| Nhóm | Số bài | Ghi chú |
|---|---|---|
| Ngữ pháp (5 nhóm) | 52 | đủ nội dung |
| Từ vựng (5 nhóm) | 48 | đủ nội dung |
| Đọc hiểu (4 nhóm) | 27 | 2 nhóm quá ít bài (3 và 2) |
| Văn hoá - Truyện dân gian (4 nhóm) | 29 | 20 bài thiếu từ vựng/câu hỏi |

Ba vấn đề xác thực được:

1. **20 bài truyện dân gian thiếu chuẩn**: nhóm "vn-folklore" (10 bài) và "vn-folklore-advanced" (10 bài) có dưới 10 từ vựng hoặc dưới 5 câu hỏi mỗi bài, trong khi mọi nhóm khác đều đạt chuẩn.
2. **6 nhóm bài quá mỏng**: "vn-adv-reading" (2 bài), "vn-adv-grammar" (2 bài), "vn-culture-expanded" (2 bài) - cả 6 bài này cũng thiếu từ vựng/câu hỏi; thêm "vn-reading-adv" (3), "vn-folk-arts" (3), "vn-gram-adv-comm" (5), "vn-vocab-specialized" (5).
3. **Các phần luyện tập phụ còn ít nội dung**: bài đọc cho người nước ngoài 7 bài, bài nghe 9 bài, sổ tay tình huống 15 bộ, nghe chép chính tả 3 mức × 10 câu, Daily Vietnamese 30 ngày.

## Kế hoạch mở rộng

### Giai đoạn 1 - Chuẩn hoá 26 bài đang thiếu
Bổ sung cho từng bài truyện dân gian và 6 bài trong 3 nhóm mỏng: đủ tối thiểu 10 từ vựng có ví dụ song ngữ và 5 câu hỏi trắc nghiệm có giải thích, đúng chuẩn đang dùng ở các nhóm khác. Không đổi mã bài nên tiến độ học viên giữ nguyên.

### Giai đoạn 2 - Thêm 40 bài mới
- Ngữ pháp nâng cao & giao tiếp: +10 bài (câu ghép, cách nói giảm nói tránh, ngôn ngữ trang trọng, viết email/đơn từ, thành ngữ trong hội thoại).
- Từ vựng chuyên đề: +10 bài (công sở, y tế, ngân hàng, pháp lý, công nghệ, môi trường).
- Đọc hiểu: +12 bài dài 300-500 từ (tin tức, tản văn, phỏng vấn, khoa học thường thức) chia cho 4 nhóm đọc, ưu tiên 2 nhóm đang chỉ có 2-3 bài.
- Văn hoá & nghệ thuật dân gian: +8 bài (chèo, cải lương, tranh Đông Hồ, ca trù, lễ hội vùng miền).

### Giai đoạn 3 - Mở rộng phần luyện tập
- Bài đọc cho người nước ngoài: 7 → 21 bài (A1/A2/B1 mỗi mức 7).
- Bài nghe: 9 → 21 bài.
- Sổ tay tình huống: 15 → 24 bộ (bệnh viện, ngân hàng, thuê nhà, sự cố đi lại, phỏng vấn, khai báo hành chính).
- Nghe chép chính tả: mỗi mức 10 → 20 câu.
- Daily Vietnamese: 30 → 60 ngày.

### Giai đoạn 4 - Kiểm tra chất lượng
Script đếm và kiểm tra tự động: mọi bài đạt tối thiểu 10 từ vựng + 5 câu hỏi, không trùng mã bài, không trùng từ vựng trong cùng nhóm, đáp án trắc nghiệm hợp lệ, đủ hai ngôn ngữ Việt - Anh. Kiểm tra thực tế trên máy tính và điện thoại.

## Chi tiết kỹ thuật

- Bài mới đi vào các file expansion mới (`src/data/vietnamese/expansionV11*.ts`, `vffReadingExpansion.ts`, `vffListeningExpansion.ts`, `phrasebookExpansionV11.ts`, `dailyVietnameseExpansionV11.ts`) theo mẫu `expansionV10.ts`: push lesson vào module hiện có, đúng interface `VietnameseLesson`/`VietnameseModule` trong `src/data/vietnamese/types.ts`, import side-effect trong `src/data/vietnameseCurriculumData.ts`.
- Việc chuẩn hoá 26 bài thiếu sẽ sửa tại chỗ trong `folkloreLessons.ts`, `lessonsExpansion.ts` (giữ nguyên `id`, chỉ thêm `vocabulary`/`quiz`).
- Không thay đổi route, không thay đổi backend, không đổi khoá tiến độ trong localStorage/Supabase.
- Kiểm tra: `bunx tsgo --noEmit`, script audit mới `scripts/audit_vietnamese_lessons.ts`, ESLint, và Playwright cho `/learn-vietnamese` + các trang con.
