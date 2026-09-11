# Nâng cấp Specialized Language Hub thành lộ trình chuyên ngành 5 bài

## Mục tiêu

Mở rộng Specialized Language Hub từ 4 lên 6 ngôn ngữ: English, Chinese, Vietnamese, Finnish, Swedish và Japanese. Mỗi yêu cầu sẽ tạo một lộ trình 5 bài theo ngành nghề, có học, luyện tập, kiểm tra và theo dõi tiến độ thay vì chỉ hiển thị một bài đọc dài.

Giữ nguyên địa chỉ `/specialized-language`, các liên kết hiện có, chức năng lưu vào Notebook và xuất PDF.

## 1. Bổ sung Swedish và Japanese

- Thêm Swedish và Japanese vào bước chọn ngôn ngữ, màu nhận diện, cờ và thông tin hiển thị.
- Thêm liên kết `Specialized Swedish` vào menu Swedish và `Specialized Japanese` vào menu Japanese.
- Chuẩn hóa nội dung theo từng ngôn ngữ:
  - Chinese: Hanzi + Pinyin có dấu thanh.
  - Japanese: Kana/Kanji + Romaji khi cần.
  - Swedish và Finnish: chú ý phát âm, biến đổi từ và văn hóa công sở Bắc Âu.
  - Vietnamese và English: phát âm, cách dùng tự nhiên và ngữ cảnh nghề nghiệp.
- Khi địa chỉ chứa ngôn ngữ không hợp lệ, tự dùng English thay vì để trạng thái lỗi.

## 2. Tổ chức lại phần khảo sát nhu cầu

Giữ luồng ngắn gọn nhưng bổ sung đủ dữ liệu để AI tạo đúng trình độ:

1. Ngôn ngữ đích và trình độ hiện tại: Beginner, Elementary, Intermediate, Advanced.
2. Lĩnh vực chuyên ngành, gồm các lựa chọn sẵn và ô nhập ngành riêng.
3. Vai trò công việc và tình huống thường gặp.
4. Mục tiêu, thời lượng học mỗi ngày và yêu cầu riêng.

- Dịch toàn bộ nút, hướng dẫn, thông báo và trạng thái theo ngôn ngữ giao diện English/Vietnamese.
- Sắp xếp lại lựa chọn để không chật trên điện thoại; dùng thẻ đều chiều cao, chữ dễ đọc và trạng thái chọn rõ ràng.
- Thêm màn hình xác nhận ngắn trước khi tạo để học sinh kiểm tra đầu vào.

## 3. Lộ trình 5 bài chuyên ngành

Mỗi lần tạo sẽ trả về một lộ trình nhất quán:

1. **Core Vocabulary** - thuật ngữ nền tảng và cụm từ nghề nghiệp.
2. **Workplace Communication** - hội thoại và tình huống thực tế.
3. **Documents & Technical Language** - email, báo cáo, hướng dẫn hoặc tài liệu đúng ngành.
4. **Problem Solving & Cultural Communication** - xử lý vấn đề, phép lịch sự và khác biệt văn hóa.
5. **Performance Challenge** - nhiệm vụ tổng hợp sát mục tiêu đã chọn.

Mỗi bài gồm:

- Mục tiêu học rõ ràng và thời lượng dự kiến.
- 8-10 từ/cụm từ, nghĩa, loại từ, cách đọc, câu ví dụ và bản dịch.
- 1 tình huống nghề nghiệp với hội thoại 4-6 lượt.
- 1 điểm ngữ pháp hoặc cấu trúc giao tiếp phù hợp.
- Ghi chú phát âm và văn hóa đúng ngôn ngữ.
- 2 bài luyện ngắn và quiz 5 câu.
- Tóm tắt kiến thức cần nhớ trước khi sang bài tiếp theo.

## 4. Trải nghiệm học tương tác

- Thay trang kết quả dài bằng thanh lộ trình 5 bài và khu vực học từng bài; trên điện thoại dùng danh sách thu gọn.
- Chỉ mở bài tiếp theo khi học sinh hoàn thành quiz bài hiện tại với ít nhất 75%; bài chưa đạt được làm lại và lưu điểm tốt nhất.
- Thêm nút nghe cho từ, ví dụ và từng câu hội thoại, dùng đúng giọng English, Chinese, Vietnamese, Finnish, Swedish hoặc Japanese.
- Thêm luyện nói lại câu mẫu bằng nhận diện giọng nói khi trình duyệt hỗ trợ; luôn có phương án học tiếp nếu thiết bị không hỗ trợ micro.
- Đánh dấu trực tiếp cụm từ quan trọng trong hội thoại, không tạo thêm hộp từ khóa trùng lặp.
- Hiện tiến độ lộ trình, số bài đã qua, điểm quiz và bài đang học.

## 5. Lưu, tiếp tục học và xuất nội dung

- Khách chưa đăng nhập lưu lộ trình và tiến độ trên thiết bị.
- Học sinh đăng nhập lưu lộ trình, câu trả lời, điểm tốt nhất và bài đang học vào dữ liệu riêng của mình, có kiểm soát truy cập theo chủ tài khoản.
- Cho phép tiếp tục lộ trình gần nhất, tạo lộ trình mới hoặc xóa lộ trình cũ.
- Nút lưu Notebook lưu đúng bài đang xem hoặc toàn bộ lộ trình, tránh tạo bản ghi trùng khi bấm nhiều lần.
- PDF mới có mục lục 5 bài, hỗ trợ Unicode cho Vietnamese, Chinese, Japanese, Finnish và Swedish; nếu phông PDF không thể hiện đúng, xuất bản in HTML thay vì tạo file lỗi ký tự.

## 6. Tăng độ tin cậy của nội dung AI

- Nâng cấu trúc phản hồi từ một bài sang đối tượng `curriculum` gồm đúng 5 bài và kiểm tra đầy đủ dữ liệu trước khi hiển thị.
- Quy định rõ cấp độ, số lượng từ, hội thoại, bài tập, đáp án và giải thích cho quiz.
- Kiểm tra ngôn ngữ đầu ra: phần học bằng ngôn ngữ đích, phần giải thích/bản dịch theo ngôn ngữ giao diện.
- Giữ cơ chế sửa JSON hiện có, đồng thời bổ sung kiểm tra cấu trúc và thông báo tạo lại rõ ràng nếu AI trả thiếu bài.
- Xử lý riêng lỗi giới hạn, hết credit và lỗi tạm thời; chỉ thử lại có giới hạn với lỗi có thể thử lại.
- Không hiển thị nội dung rỗng, `undefined`, đáp án sai cấu trúc hoặc nguồn trùng lặp.

## 7. Hình ảnh và bố cục

- Giữ hình ảnh ngành nghề làm tín hiệu chính nhưng thay liên kết ảnh ngoài bằng tài nguyên nội bộ ổn định.
- Giảm chiều cao phần đầu để lộ bước học đầu tiên ngay trong màn hình đầu; giữ hình ghép trên desktop và dùng một dải hình gọn trên mobile.
- Mở rộng khu vực học nhưng giới hạn độ dài dòng; thanh lộ trình cố định vừa phải trên desktop và không che nội dung.
- Chuẩn hóa tương phản chữ, trạng thái hover/focus, khoảng cách, nút hành động và hiển thị dark mode.

## 8. Chi tiết kỹ thuật

- Cập nhật `src/pages/SpecializedLanguage.tsx`: kiểu ngôn ngữ, biểu mẫu, giao diện lộ trình, bài học, quiz, âm thanh, luyện nói, lưu và tiếp tục.
- Tách các phần lớn thành component nhỏ cho khảo sát, thanh lộ trình, từ vựng, hội thoại, quiz và tổng kết để trang dễ bảo trì.
- Cập nhật `src/components/Navbar.tsx` với liên kết Swedish và Japanese.
- Cập nhật `supabase/functions/generate-specialized-lesson/index.ts` để nhận 6 ngôn ngữ, cấp độ và thời lượng; trả lộ trình 5 bài đã kiểm tra cấu trúc.
- Thêm bảng tiến độ/lộ trình thuộc riêng từng học sinh với quyền đọc, tạo, sửa, xóa theo chủ tài khoản; cấp quyền truy cập dữ liệu đúng vai trò trong cùng migration.
- Giữ nguyên đường dẫn, dữ liệu bài học khác, Notebook hiện có và các hệ thống học ngôn ngữ khác.

## 9. Kiểm tra trước khi hoàn tất

- TypeScript và kiểm tra tương phản hover.
- Kiểm tra hàm tạo thật cho cả 6 ngôn ngữ; xác nhận đúng 5 bài, đúng chữ viết, quiz có một đáp án hợp lệ và không có trường rỗng.
- Kiểm tra lưu/khôi phục tiến độ cho khách và người đăng nhập, quy tắc qua bài 75%, làm lại quiz, Notebook và PDF.
- Kiểm tra nghe và luyện nói trên các ngôn ngữ có hỗ trợ; xác nhận phương án dự phòng khi micro hoặc giọng đọc không khả dụng.
- Trình duyệt desktop 1280px và mobile 390px: toàn bộ 4 bước khảo sát, thanh 5 bài, nội dung, quiz, nút điều hướng, menu Swedish/Japanese, không tràn ngang và không che chữ.
