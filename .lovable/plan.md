# Nâng cấp Sound Drill thành phòng luyện âm có hướng dẫn

## Kết quả rà soát hiện tại

- Sound Drill đang có **62 cặp âm** cho 6 ngôn ngữ: tiếng Anh có 12 cặp, năm ngôn ngữ còn lại có 10 cặp mỗi ngôn ngữ.
- Nội dung cặp âm, phiên âm và mẹo song ngữ đã có, nhưng màn hình chỉ yêu cầu “nói từ được tô sáng” nên người học chưa biết cần nghe gì, nhìn vị trí miệng nào và sửa như thế nào.
- Hai từ được đặt cạnh nhau nhưng chưa có nút nghe đối chiếu liên tiếp, chưa làm nổi bật phần âm khác nhau và mẹo khẩu hình còn nằm như một dòng chú thích rời rạc.
- Khi nhận diện trả về “chưa rõ”, giao diện nói “hãy thử lại” nhưng nút ghi âm bị khóa; người học chỉ có thể chuyển sang từ tiếp theo. Trường hợp phát âm sai cũng chưa có vòng sửa lỗi tại chỗ.
- Kết quả cuối mới chỉ có phần trăm và danh sách âm yếu, chưa cho biết nên luyện lại cặp nào và chưa tạo cảm giác tiến bộ trong từng lượt.

## Hướng nâng cấp

### 1. Biến bài tập thành quy trình 3 bước dễ hiểu

Mỗi câu luyện sẽ luôn hiển thị thanh hướng dẫn:

1. **Nghe và so sánh** - nghe từng từ hoặc nghe cặp A → B liên tiếp.
2. **Nhìn khẩu hình** - đọc mẹo về môi, lưỡi, luồng hơi, độ dài hoặc thanh điệu.
3. **Nói từ mục tiêu** - thu âm và xem hệ thống nghe thành từ nào.

Bước hiện tại được nhấn rõ; người mới có thể làm đúng trình tự nhưng vẫn được phép nghe lại bất cứ lúc nào.

### 2. Thiết kế lại thành “Sound Lab” sinh động

- Đồng bộ phong cách Vibrant glassmorphism đã chọn cho Shadowing: Royal Blue, Emerald, Warm Gold, Sora và Manrope.
- Dùng bố cục phòng luyện hai vùng trên máy tính, một cột trên điện thoại.
- Vùng trái là bảng so sánh hai âm với nút nghe riêng, nút **Nghe cả cặp**, phiên âm và trạng thái đang phát.
- Vùng phải là “Pronunciation Coach”: chỉ dẫn khẩu hình nổi bật, biểu tượng trực quan theo loại âm và từ mục tiêu lớn, rõ.
- Thêm dải sóng âm nhẹ khi phát hoặc thu, tôn trọng chế độ giảm chuyển động.

### 3. Làm khác biệt giữa hai từ dễ nhìn và dễ nghe

- Tách phần giống nhau và phần âm khác nhau trong cặp từ khi có thể xác định an toàn; phần khác biệt dùng màu nhấn, không thay đổi chính tả gốc.
- Với chữ Hán, kana, thanh điệu hoặc các cặp không thể tách ký tự hữu ích, ưu tiên Pinyin/romaji/nhãn âm và mẹo phát âm thay vì tô sai ký tự.
- Nút **Nghe cả cặp** phát A, nghỉ ngắn, rồi phát B; không cho âm thanh chồng nhau hoặc phát lặp do bấm nhanh.

### 4. Tạo vòng sửa lỗi ngay tại chỗ

- Sau mỗi lần nói, hiện rõ: **Từ mục tiêu**, **Hệ thống nghe được**, và kết quả đúng/sai/chưa rõ.
- Sai hoặc chưa rõ sẽ mở ngay hai lựa chọn: **Nghe lại từ mẫu** và **Thử lại**; không ép chuyển câu.
- Khi thử lại, giữ nguyên cặp âm và mẹo để người học sửa có chủ đích.
- Một câu chỉ được tính một lần khi chuyển tiếp; kết quả tốt nhất trong các lần thử được dùng để ghi điểm, tránh tăng điểm do bấm lặp.
- Từ yếu chỉ được ghi nhận khi người học rời câu mà chưa phát âm đúng, tránh lưu nhầm sau một lần nhận diện chưa rõ.

### 5. Phản hồi và kết quả có tính huấn luyện

- Phản hồi đúng dùng Emerald và lời khích lệ ngắn; sai dùng hướng dẫn cụ thể; chưa rõ dùng Warm Gold thay vì coi như sai.
- Hiện tiến độ 1/10, số câu đã đúng và chuỗi đúng liên tiếp trong buổi luyện.
- Trang kết quả chia thành: điểm tổng, số cặp đã làm chủ, âm cần luyện thêm và nút luyện lại riêng các âm yếu.
- Giữ điều kiện hoàn thành hiện có: đạt ít nhất 80% vẫn kích hoạt điểm hoàn hảo của Speaking Coach.

### 6. Giữ nguyên phạm vi và hợp đồng hiện có

- Giữ route `/speaking-coach/:language`, tab `drill`, ID của 62 cặp âm, TTS, nhận diện giọng nói, từ yếu và callback điểm hoàn hảo.
- Không thay đổi các chế độ Sentences, Shadowing, Free Talk hoặc Weak Words.
- Giữ song ngữ Việt - Anh và hỗ trợ đủ English, Chinese, Japanese, Finnish, Swedish, Vietnamese.

## Chi tiết kỹ thuật

- Tách logic phiên luyện thành trạng thái rõ ràng: `listen`, `coach`, `speak`, `feedback`.
- Bổ sung bộ phân loại gợi ý trực quan từ dữ liệu hiện có: vị trí lưỡi, môi, luồng hơi, độ dài, âm cuối và thanh điệu; luôn có phương án hướng dẫn chung nếu không khớp loại.
- Điều chỉnh nhận diện để cho phép retry trên cùng mục, đồng thời khóa ghi điểm trùng và hủy âm thanh/ghi âm khi đổi câu hoặc đổi ngôn ngữ.
- Dùng token phạm vi Speaking Coach, không dùng màu cứng trong thành phần.

## Kiểm tra hoàn tất

- Thêm kiểm thử cho retry sau `unclear`/`wrong`, best-attempt scoring, không ghi từ yếu sớm và phát cặp âm tuần tự.
- Mở rộng audit để kiểm tra đủ ID, nhãn âm, mẹo song ngữ, từ không trùng và dữ liệu phiên âm cần thiết.
- Kiểm tra trình duyệt cho cả 6 ngôn ngữ trên máy tính và điện thoại: nghe từng từ, nghe cả cặp, thu/dừng, thử lại, chuyển câu, kết quả, dark mode, giảm chuyển động và không tràn ngang.
