# Lifestyle Academy: menu, lesson pop-up, illustrations, content review

## What you will get

1. **"Kỹ năng Tự học" xuất hiện trong menu Lifestyle.** Mục này đã có 15 bài trên trang nhưng chưa có trong menu thả xuống, nên bạn không tìm thấy. Sẽ thêm vào ngay dưới "Thân thể Khoẻ mạnh".

2. **Bấm vào bài học sẽ mở pop-up rộng giữa màn hình.** Lưới 3 cột giữ nguyên như hiện tại. Thẻ bài học chỉ hiển thị ảnh, tiêu đề, mô tả ngắn, thời lượng. Toàn bộ nội dung (Vì sao quan trọng, Khung tư duy, Đào sâu, Điểm cốt lõi, Câu hỏi phản chiếu, Bài tập) chuyển vào pop-up với khổ đọc rộng, dễ đọc, cuộn được, đóng bằng nút X hoặc phím Esc.

3. **Ảnh minh họa riêng cho từng bài.** 87 ảnh, mỗi bài một ảnh phù hợp nội dung, hiển thị ở đầu thẻ và ở đầu pop-up. Ảnh lưu trên CDN nên trang vẫn nhẹ và tải dần khi cuộn.

4. **In đậm cụm từ quan trọng trong bài.** Tên mô hình, tên tác giả, con số và quy tắc chính (ví dụ **quy tắc 20-20-20**, **BATNA**, **lãi kép**) sẽ được in đậm trong phần Đào sâu, Khung tư duy và Điểm cốt lõi để dễ ghi nhớ.

5. **Rà soát và viết lại 87 bài.** Kiểm tra tên tác giả/mô hình, số liệu, thuật ngữ, bản dịch song ngữ và chính tả; sửa chỗ sai; viết lại các đoạn khô khan cho sinh động, có ví dụ cụ thể.

## Cách làm (chi tiết kỹ thuật)

### Menu
- `src/components/Navbar.tsx` (dòng 494-502): thêm `{ to: "/lifestyle-academy?pillar=selfstudy", label: t("📚 Kỹ năng Tự học", "📚 Self-Study Skills") }`. Trang đã đọc `?pillar=` và tự lọc + cuộn nên không cần thay đổi khác.

### Pop-up bài học
- Tách phần chi tiết trong `LessonCard` (hiện là accordion `AnimatePresence` trong `src/pages/LifestyleAcademy.tsx`) thành component mới `src/components/lifestyle/LessonDialog.tsx`.
- Dùng shadcn `Dialog` có sẵn: `max-w-3xl`, nội dung cuộn `max-h-[85vh]`, khoá cuộn trang, trả focus về thẻ khi đóng, `aria-label` đầy đủ, ảnh ở đầu pop-up.
- Thẻ trong lưới rút gọn: ảnh 16:9, chip cấp độ, tiêu đề, mô tả 2 dòng, thời lượng/kiểu bài, nút "Xem bài học đầy đủ" mở pop-up.
- Mobile: pop-up chiếm gần hết chiều ngang, chữ tối thiểu 16px.

### Ảnh minh họa
- Tạo 87 ảnh theo lô từng trụ cột, phong cách thống nhất: minh họa phẳng hiện đại, bảng màu theo trụ cột (Tài chính hổ phách, Ứng xử ngọc lục bảo, Khí chất xanh mòng, Thân thể hồng, Tự học tím indigo), không có chữ trong ảnh.
- Mỗi ảnh 1024x576, đẩy lên CDN bằng `lovable-assets create`, lưu con trỏ `.asset.json` trong `src/assets/lifestyle/`.
- Thêm bản đồ `src/data/lifestyleLessonImages.ts` map `lesson.id` -> url; thiếu ảnh thì rơi về dải màu + `illustrationEmojis` đã có trong dữ liệu.
- `loading="lazy"`, `alt` mô tả nội dung bài, kích thước cố định để không nhảy layout.

### In đậm cụm từ
- Thêm `src/lib/lifestyleEmphasis.tsx`: nhận đoạn văn, in đậm theo danh sách thuật ngữ/tên riêng/quy tắc số (dạng `\d+-\d+-\d+`, `20-20-20`, `1-3-7-21`) bằng cách tách chuỗi và bọc `<strong>`, không dùng `dangerouslySetInnerHTML`.
- Áp dụng cho Khung tư duy, Đào sâu, Điểm cốt lõi trong pop-up.

### Rà soát nội dung 87 bài
- Duyệt lần lượt 5 trụ cột: `lifestyleAcademyLessons.ts`, `Expansion` 1-5, `lifestyleSelfStudyLessons.ts`, `lifestyleAcademyEnrichment.ts`.
- Kiểm tra: tên tác giả/mô hình đúng người, số liệu và ngưỡng hợp lý, thuật ngữ tài chính/sức khoẻ chính xác, bản VI và EN cùng nghĩa và cùng số đoạn, không dùng dấu gạch ngang dài, không trùng ID, mỗi bài đủ 4-5 điểm cốt lõi.
- Viết lại các đoạn khô khan: thêm ví dụ cụ thể, câu ngắn hơn, mở đầu bằng tình huống thật của học sinh.
- Mở rộng `scripts/audit_lifestyle.ts`: kiểm tra thêm ảnh phủ 100% bài, độ dài tối thiểu deep dive, cân đối VI/EN, và giữ mốc 87 bài / 5 trụ cột.

### Không thay đổi
Routes, ID bài học, tiến trình đã lưu, backend, các trang khác.

### Kiểm tra trước khi báo xong
`bunx tsgo --noEmit`, `scripts/audit_lifestyle.ts` phải 0 lỗi, và mở trang thật trên máy tính và điện thoại: menu có mục Tự học, pop-up mở/đóng đúng, ảnh hiện đủ, chữ rõ.
