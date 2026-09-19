# Rà soát Readiness + Chứng chỉ hoàn thành Business/Academic English

## Phần 1 - Kết quả rà soát Readiness (đã kiểm tra code hiện tại)

Những điểm đang chạy đúng:

- Ánh xạ 6 chủ đề nền tảng và toàn bộ 43 bài Communication Lab của hai lộ trình đã đủ, không trùng, không thiếu (test `purposeEnglishReadiness.test.ts` kiểm tra điều này).
- Điểm quiz chỉ giữ lần làm tốt nhất, không suy đoán điểm cho tiến độ cũ; có cảnh báo "làm lại quiz để tăng độ tin cậy".
- Có trạng thái rỗng, bảng số liệu song song với biểu đồ, gợi ý kỹ năng yếu nhất.

Những điểm cần chỉnh để dữ liệu và biểu đồ thật ổn định:

1. Điểm quiz của Communication Lab đang được lưu nhưng **không được dùng** trong công thức (lab chỉ tính theo hoàn thành). Sẽ đưa điểm lab vào phần 20% của trục: một nửa theo hoàn thành, một nửa theo điểm lab tốt nhất, và cập nhật lại phần chú thích công thức cho khớp.
2. Sau khi làm quiz trong tab Bài nền tảng, thẻ readiness cập nhật nhờ callback, nhưng nếu người học mở hai tab trình duyệt thì điểm không đồng bộ. Sẽ đọc lại điểm readiness trong cùng handler đồng bộ tiến độ đang có.
3. Đối tượng dữ liệu của mỗi trục đang mang theo cả danh sách ID cấu hình nội bộ. Sẽ trả về đúng các trường hiển thị cho gọn và tránh lệ thuộc ngoài ý muốn.
4. Nhãn 6 trục tiếng Việt khá dài nên dễ bị cắt trên điện thoại. Sẽ rút gọn nhãn hiển thị trên biểu đồ (giữ nhãn đầy đủ ở bảng số liệu bên dưới) và ẩn vạch số bán kính gây rối.
5. Bổ sung test cho công thức có điểm lab và cho trường hợp chủ đề chưa có dữ liệu, để không xuất hiện giá trị NaN hay vượt 100.

Không đổi công thức trọng số tổng (45/25/10/20), không đổi route, ID bài, thứ tự mở khoá hay khoá lưu tiến độ.

## Phần 2 - Chứng chỉ hoàn thành

Điều kiện nhận chứng chỉ cho mỗi lộ trình (Business hoặc Academic):

- Hoàn thành **toàn bộ** 24 bài nền tảng và toàn bộ Communication Lab của lộ trình đó.
- Điểm Readiness tổng đạt tối thiểu **70/100**, để chứng chỉ phản ánh chất lượng chứ chỉ là số bài đã click.

Trải nghiệm:

- Thêm thẻ **Chứng chỉ hoàn thành** ngay trong tab Readiness. Khi chưa đủ điều kiện, thẻ hiện rõ còn thiếu bao nhiêu bài nền tảng, bao nhiêu lab và cần thêm bao nhiêu điểm readiness, kèm nút mở đúng phần còn thiếu.
- Khi đủ điều kiện, mở trang chứng chỉ riêng: `/english/business/certificate` và `/english/academic/certificate`.
- Trang chứng chỉ: ô nhập tên học viên (tự điền sẵn tên hồ sơ nếu có), bản chứng chỉ in được gồm tên khoá, số bài đã hoàn thành, điểm readiness, mức readiness song ngữ, ngày cấp, chữ ký Mr. Hai, mã chứng chỉ và mã QR xác thực, nút tải PDF.
- Chứng chỉ song ngữ theo ngôn ngữ đang chọn, nêu rõ đây là chứng nhận hoàn thành khoá học của HaiEduTech, không phải chứng chỉ trình độ quốc tế.
- Giáo viên/quản trị mở được trang chứng chỉ để xem mẫu, có nhãn ghi rõ là bản xem trước.

## Thay đổi kỹ thuật

- Mở rộng `src/lib/purposeEnglishReadiness.ts`: đưa điểm lab vào trục, làm sạch dữ liệu trục, thêm hàm thuần tính điều kiện chứng chỉ (còn thiếu gì, đã đủ chưa) và mã chứng chỉ tất định theo lộ trình + tên.
- Cập nhật `PurposeEnglishReadiness.tsx`: nhãn biểu đồ gọn, chú thích công thức mới, thẻ trạng thái chứng chỉ với nút điều hướng.
- Tạo `src/pages/PurposeEnglishCertificate.tsx` dùng chung cho hai lộ trình, đọc tiến độ từ cùng các khoá localStorage hiện có (`haiedu-business-english-v1`, `haiedu-academic-english-v1`, `-communication`, `-phrases`, `-readiness-scores`), xuất PDF bằng html2canvas + jsPDF theo đúng cách trang chứng chỉ tiếng Việt đang làm.
- Thêm hai route lazy trong `src/App.tsx`, giữ nguyên cơ chế yêu cầu đăng nhập hiện tại.
- Ghi nhận hoạt động cấp chứng chỉ qua `logStudentActivity` với loại hoạt động sẵn có của từng lộ trình; không thêm bảng dữ liệu mới.
- Bổ sung test cho công thức readiness mới và cho logic đủ/chưa đủ điều kiện chứng chỉ.

## Kiểm tra trước khi hoàn tất

- Vitest công thức readiness và điều kiện chứng chỉ; audit ánh xạ core/lab vẫn đạt.
- TypeScript và ESLint sạch.
- Kiểm tra trực tiếp desktop và mobile: biểu đồ không tràn nhãn, thẻ chứng chỉ hiện đúng phần còn thiếu, trang chứng chỉ hiển thị và tải PDF được.
