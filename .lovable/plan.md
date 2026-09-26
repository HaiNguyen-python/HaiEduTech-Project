# Hiển thị khóa học và học phí từ ba nút trang chủ

## Mục tiêu
- Giữ nguyên ba nút `English Courses`, `Chinese Courses`, `Programming Courses` và các đường dẫn hiện tại.
- Khi người dùng vào trang môn học, đặt một khu vực học phí song ngữ Việt - Anh gần đầu trang để nhìn thấy trước nội dung học trực tuyến.
- Chỉ bổ sung phần giới thiệu khóa học và học phí, không thay đổi Premium, thanh toán 29 EUR/năm, quyền truy cập bài học hoặc backend.

## Nội dung học phí

### Tiếng Anh / English
| Khóa học / Course | Thời lượng / Duration | Lớp nhóm / Group class | Kèm 1-1 / One-to-one |
|---|---:|---:|---:|
| IELTS Preparation | 12 tuần / 12 weeks | 210 EUR | 630 EUR |
| Business English | 12 tuần / 12 weeks | 210 EUR | 630 EUR |
| Cambridge Starters - Movers - Flyers | 12 tuần / 12 weeks | 160 EUR | 480 EUR |
| Cambridge KET - PET | 12 tuần / 12 weeks | 180 EUR | 540 EUR |

### Tiếng Trung / Chinese
| Khóa học / Course | Thời lượng / Duration | Lớp nhóm / Group class | Kèm 1-1 / One-to-one |
|---|---:|---:|---:|
| HSK 1 - HSK 3 | 12 tuần / 12 weeks | 180 EUR | 540 EUR |
| Giao tiếp căn bản / Basic Conversation | 12 tuần / 12 weeks | 180 EUR | 540 EUR |

### Lập trình / Programming
| Khóa học / Course | Thời lượng / Duration | Lớp nhóm / Group class | Kèm 1-1 / One-to-one |
|---|---:|---:|---:|
| Python | 12 tuần / 12 weeks | 180 EUR | 540 EUR |
| AI Foundation | 12 tuần / 12 weeks | 180 EUR | 540 EUR |

## Giao diện
- Tạo một khối học phí dùng chung để ba trang nhất quán, nhưng mỗi môn giữ màu nhận diện hiện có.
- Trình bày dạng bảng rõ ràng trên máy tính và dạng thẻ dễ đọc trên điện thoại, không để nội dung tràn ngang.
- Làm nổi bật giá lớp nhóm, đồng thời ghi rõ giá 1-1 bằng ba lần học phí lớp nhóm.
- Mỗi trang có nút `Đăng ký tư vấn / Register for Consultation` dẫn đến biểu mẫu đăng ký hiện có.
- Không dùng ảnh chụp được gửi làm tài nguyên; ảnh chỉ dùng để xác định đúng ba nút cần giữ nguyên.

## Kỹ thuật
- Bổ sung dữ liệu học phí tập trung và một thành phần hiển thị dùng chung, sau đó gắn vào các trang `/english`, `/chinese`, `/programming`.
- Dùng hệ thống màu, nút và kiểu chữ hiện có; không tạo bảng dữ liệu mới và không sửa luồng thanh toán Premium.
- Nội dung luôn hiện đồng thời tiếng Việt và tiếng Anh như đã chọn, không phụ thuộc nút đổi ngôn ngữ.

## Kiểm tra
- Xác nhận cả ba nút trang chủ vẫn mở đúng trang môn học.
- Kiểm tra đủ 8 dòng khóa học, đúng thời lượng và các phép tính 1-1: 630, 480, 540 EUR.
- Kiểm tra trên màn hình máy tính và điện thoại, bao gồm nút đăng ký tư vấn.
- Xác nhận trang vẫn tải bình thường và không ảnh hưởng các bài học hiện có.
