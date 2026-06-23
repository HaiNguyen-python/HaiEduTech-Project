Kết quả rà soát nhanh:
- Lovable Cloud backend đang phản hồi bình thường, không thấy dấu hiệu backend bị sập.
- AI credit chưa hết: workspace còn khoảng 24.78 credits. Lỗi AI balance chỉ ảnh hưởng nút AI tạo poll, không phải nguyên nhân làm Your Corner load chậm hay mất nhắn tin.
- Your Corner chậm chủ yếu do UI đang tải thêm widget nặng ngay khi vào trang, đặc biệt `StoryBar` gọi `get_streak_leaderboard`, đây đang là một trong các truy vấn chậm nhất toàn hệ thống.
- Tính năng nhắn tin chưa mất dữ liệu, bảng tin nhắn vẫn có dữ liệu. Nhưng Messenger hiện chỉ render khi đã chọn một bạn online trong sidebar, nên nếu không có ai online hoặc sidebar bị ẩn trên mobile/tablet thì người dùng tưởng tính năng nhắn tin đã biến mất.

Kế hoạch sửa:
1. Khôi phục điểm vào Messenger rõ ràng
   - Hiển thị khung/nút `Tin nhắn` cố định trong Your Corner thay vì chỉ hiện sau khi chọn người online.
   - Trên desktop: luôn có Messenger ở sidebar phải.
   - Trên mobile/tablet: thêm nút mở Messenger dạng floating hoặc card gọn để không bị mất chức năng.
   - Giữ khả năng bấm người online để mở chat trực tiếp.

2. Tăng tốc load ban đầu của Your Corner
   - Không tải `StoryBar` ngay lúc vào trang vì nó gọi truy vấn streak rất nặng.
   - Chuyển `StoryBar` sang lazy/idle load sau khi feed chính đã hiện, hoặc tạm bỏ khỏi above-the-fold.
   - Giảm các animation nền gây re-render liên tục nếu cần, ưu tiên feed, composer và Messenger hiện trước.

3. Tối ưu truy vấn Messenger
   - Thêm index phù hợp cho chiều inbox `recipient_id/sender_id/created_at` vì hiện chỉ có index chiều `sender_id/recipient_id`.
   - Giữ RLS hiện tại, nhưng cải thiện query để inbox và thread nhanh hơn.

4. Kiểm tra lại quyền gửi tin nhắn
   - Rà soát insert/update policy cho `your_corner_messages`.
   - Nếu cần, điều chỉnh migration để người đăng nhập gửi tin cho học viên khác được ổn định, không bị lỗi quyền.
   - Không mở nhắn tin cho khách chưa đăng nhập.

5. Cải thiện thông báo trạng thái
   - Khi Messenger đang tải danh bạ/tin nhắn, hiển thị trạng thái rõ ràng.
   - Khi gửi lỗi do quyền, mạng hoặc phiên đăng nhập, hiện thông báo dễ hiểu hơn thay vì chỉ báo chung chung.

Technical details:
- Frontend: `src/pages/YourCorner.tsx`, `src/components/your-corner/Messenger.tsx`, có thể thêm component launcher nhỏ cho mobile.
- Database: migration thêm index cho `your_corner_messages` và nếu cần tối ưu lại RPC/feed. Không liên quan AI Gateway.
- Không chạm vào phần nội dung bài học hay các module Swedish.