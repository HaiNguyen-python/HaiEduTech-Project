# Lifestyle Academy: nhóm bài theo trụ cột, cân đối đầu trang, rà soát trước khi publish

## 1. Ở mục "All": chia rõ từng trụ cột, có nút thu gọn

- Khi bộ lọc là "All", danh sách 102 bài không còn là một lưới liền mạch. Thay vào đó chia thành 6 khối theo trụ cột, đúng thứ tự: Finance, Etiquette, Presence & Resilience, Wellness, Self-Study, Parties.
- Mỗi khối có một dải tiêu đề riêng: icon và màu của trụ cột, tên song ngữ, số bài, số bài đã đạt (75%+ quiz), và mũi tên thu gọn/mở lại. Bấm vào cả dải tiêu đề là thu gọn hoặc mở; bàn phím dùng Enter/Space.
- Có đường phân cách và nền nhạt theo màu trụ cột để mắt thấy ngay ranh giới giữa các nhóm.
- Mặc định cả 6 nhóm đang mở. Trạng thái thu gọn được nhớ lại khi quay lại trang.
- Thêm hai nút nhỏ "Thu gọn tất cả" / "Mở tất cả" phía trên danh sách.
- Khi chọn một trụ cột cụ thể, hoặc khi đang tìm kiếm, danh sách hiển thị phẳng như hiện nay (không nhóm), để kết quả tìm kiếm không bị ẩn trong nhóm đóng.

## 2. Cân đối lại phần đầu trang

Phần đầu trang hiện các dòng chữ sát nhau nên nhìn chật:

- Tiêu đề lớn: giãn khoảng cách giữa hai dòng, thêm khoảng thở phía dưới.
- Dòng mô tả: giãn dòng thoáng hơn, giới hạn độ rộng để mỗi dòng ngắn hơn, dễ đọc.
- Nhãn "Chương trình cao cấp", tiêu đề, mô tả, ô tìm kiếm, dãy nút lọc, ba ô số liệu: khoảng cách giữa các tầng tăng đều, nhất quán, không còn dính nhau.
- Ba ô số liệu (102 / 6 / 7-12) nới rộng khoảng cách và thoáng bên trong; trên điện thoại vẫn đủ chỗ, chữ tối thiểu 16px.
- Vẫn giữ nội dung sát lề trên như bạn đã yêu cầu trước đó, chỉ phân bố lại khoảng trống bên trong.

## 3. Rà soát toàn bộ Lifestyle trước khi publish

Kỹ thuật:
- Chạy kiểm tra TypeScript và `scripts/audit_lifestyle.ts` (phải 0 lỗi): 6 trụ cột, 102 bài, song ngữ đủ, quiz 4 câu 4 đáp án, deep dive tối thiểu 4 đoạn và 1000 ký tự mỗi ngôn ngữ, không dấu gạch ngang dài.
- Mở rộng audit: kiểm tra 100% bài có ảnh riêng và không bị dùng lại quá nhiều, ID không trùng.
- Kiểm tra tiến trình: khách (lưu trên máy) và người đã đăng nhập (lưu trên hệ thống) đều lấy điểm cao nhất; chỉ bài từ 75% mới tính vào biểu đồ.
- Kiểm tra trên máy tính và điện thoại: mở/đóng pop-up, thu gọn nhóm, làm quiz 2/4 (chưa đạt) và 3/4 (đạt), biểu đồ cập nhật đúng.

Nội dung:
- Rà lại tiêu đề trang và mô tả tìm kiếm đang ghi "4 trụ cột" - cập nhật thành 6 trụ cột cho đúng.
- Soát chính tả, sự khớp nghĩa giữa bản Việt và Anh, tên mô hình và con số trong phần đào sâu của cả 102 bài; sửa các đoạn còn khô, thiếu ví dụ.

Hình ảnh:
- Đối chiếu 102 ảnh với nội dung bài; ảnh nào lệch chủ đề thì tạo lại.
- Kiểm tra ảnh tải đúng, có chữ mô tả cho người khiếm thị, không nhảy khung khi cuộn.

## Chi tiết kỹ thuật

- `src/pages/LifestyleAcademy.tsx`: thêm `groupedLessons` (memo theo thứ tự trụ cột) dùng khi `filter === "all" && !query`; component mới `PillarLessonGroup` với header là `<button>` (`aria-expanded`, `aria-controls`), body là lưới `md:grid-cols-2 xl:grid-cols-3` bọc trong `AnimatePresence` + `motion.div` height animation. Trạng thái mở/đóng lưu ở `localStorage` key `het:lifestyle-groups-open-v1`.
- Header dùng `PILLAR_STYLES` và `PILLARS` đã có (icon, `iconBg`, `accentText`, `chipBg`, `border`) - không thêm màu mới, không sửa token.
- Tinh chỉnh hero: `leading-[1.1]` cho `h1`, tăng `mt-*` giữa các tầng, `gap-5` cho lưới StatChip, `py-*` trong `StatChip`.
- Cập nhật `SEO` title/description và JSDoc đầu file cho đúng 6 trụ cột.
- Mở rộng `scripts/audit_lifestyle.ts` với kiểm tra ảnh (dùng `LIFESTYLE_LESSON_IMAGES`).
- Không đổi: route, ID bài học, dữ liệu tiến trình đã lưu, backend, các trang khác.
