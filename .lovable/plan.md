# Chuẩn hóa toàn bộ bài học Programming sang tiếng Anh

## Mục tiêu
- Mọi nội dung học tập trong khu vực Programming hiển thị bằng tiếng Anh, không phụ thuộc ngôn ngữ chung của website.
- Mọi Knowledge Check dùng câu hỏi, lựa chọn và giải thích bằng tiếng Anh chính xác.
- Giữ nguyên route, module ID, lesson ID, tiến độ, XP, badge, điểm số, thứ tự bài và hợp đồng dữ liệu hiện có.

## Phạm vi
- Các bài học chuẩn dùng trang Programming Lesson: Python cơ bản, AI, SQL, Data Engineering, ML, Cloud, Deep Learning, NLP, Reinforcement Learning, Software Engineering, Web Development, Cybersecurity, EdTech, Prompt Engineering, Startup và các lab mở rộng.
- Introduction to Programming / Python Pathway, gồm nội dung, cạm bẫy, bài thực hành, mini project và quiz.
- Data Structures & Algorithms, gồm lý thuyết, độ phức tạp và quiz củng cố.
- AI Academy, kiểm tra lại toàn bộ nội dung và quiz đang dùng tiếng Anh.
- Scratch Adventure chỉ trong các phần mang tính bài học/hướng dẫn. Các game, dashboard và công cụ không phải bài học sẽ không bị đổi ngoài những nhãn cần thiết để luồng học không lẫn tiếng Việt.

## Các bước thực hiện

### 1. Lập danh mục đầy đủ trước khi sửa
- Duyệt từ các mảng dữ liệu thực sự được route Programming sử dụng, không chỉ tìm theo từ khóa.
- Tạo danh sách module, lesson, Knowledge Check và trường nội dung cần chuẩn hóa.
- Phân biệt nội dung gốc, bản mở rộng, Python Pathway, DSA, AI Academy và nội dung tạo động để không bỏ sót hoặc sửa nhầm dữ liệu không được hiển thị.

### 2. Chuẩn hóa nội dung bài học sang tiếng Anh
- Chuyển tiêu đề, lý thuyết, hướng dẫn, bài tập, cạm bẫy, mini project, ví dụ, chú thích code và thông báo trong luồng bài học sang tiếng Anh tự nhiên.
- Với dữ liệu song ngữ hiện có, dùng bản tiếng Anh làm nguồn hiển thị cố định trong Programming và sửa những bản tiếng Anh còn thiếu, lẫn tiếng Việt hoặc dịch máy khó hiểu.
- Giữ nguyên code đúng kỹ thuật; chỉ đổi tên biến, comment và chuỗi minh họa còn tiếng Việt khi việc đổi không làm sai ví dụ.
- Đổi phần thử thách tạo động sang yêu cầu tiếng Anh và ngăn fallback về nội dung tiếng Việt.

### 3. Chuẩn hóa toàn bộ Knowledge Check
- Bổ sung tiếng Anh cho mọi câu hỏi, lựa chọn và giải thích còn fallback sang tiếng Việt.
- Chuẩn hóa cấu trúc quiz để renderer không cần tra bản dịch rời theo chuỗi câu hỏi, nhưng vẫn tương thích dữ liệu cũ trong thời gian chuyển đổi.
- Giữ nguyên chỉ số đáp án khi chỉ dịch; nếu sửa lựa chọn hoặc thứ tự, cập nhật đáp án tương ứng.
- Duy trì cơ chế xáo trộn lựa chọn hiện tại: giao diện có thể đổi vị trí A/B/C/D nhưng chấm theo chỉ số gốc.

### 4. Kiểm định chất lượng và tính đúng của đáp án
- Thêm audit tự động duyệt toàn bộ curriculum đang được export và báo lỗi khi thiếu tiếng Anh, còn văn bản tiếng Việt ngoài danh sách tên riêng cho phép, quiz rỗng, lựa chọn trùng, đáp án vượt phạm vi hoặc giải thích thiếu.
- Rà soát ngữ nghĩa từng Knowledge Check: chỉ có một đáp án đúng, câu hỏi không mơ hồ, đáp án phù hợp lý thuyết và giải thích thực sự chứng minh đáp án.
- Kiểm tra riêng câu hỏi có code, toán, SQL, bảo mật, AI và kiến thức có thể lỗi thời; sửa nội dung sai thay vì chỉ dịch nguyên văn.
- Bổ sung test cho chấm điểm, câu điền code không phân biệt hoa thường theo quy tắc hiện tại, và việc không còn fallback tiếng Việt trên chế độ Programming English-only.

### 5. Kiểm tra hoàn tất
- Chạy audit toàn bộ corpus, TypeScript, lint và test liên quan.
- Kiểm tra trực tiếp trên desktop và mobile các nhóm đại diện, gồm Prompt Engineering trong ảnh, Python Pathway, DSA, AI Academy và ít nhất một bài của mỗi pillar chuẩn.
- Với mỗi bài mẫu, kiểm tra Theory, code, Practice Exercise, Knowledge Check, Submit, giải thích đáp án, Retry, Next lesson và lưu tiến độ.
- Chỉ hoàn tất khi audit không còn nội dung tiếng Việt ngoài tên riêng được duyệt và không còn Knowledge Check lỗi cấu trúc hoặc đáp án.

## Chi tiết kỹ thuật
- Mở rộng kiểu quiz dùng chung để hỗ trợ `questionEn`, `optionsEn`, `explanationEn` nhất quán, thay cho ép kiểu trong trang hiển thị.
- Thêm script audit riêng cho Programming và lệnh chạy trong bộ kiểm tra dự án.
- Không đổi route, ID, localStorage key, activity type, cache key, ngưỡng đạt 60% hay điều kiện nhận badge.
- Không thay đổi giao diện hoặc chức năng ngoài phạm vi ngôn ngữ và độ chính xác nội dung.
