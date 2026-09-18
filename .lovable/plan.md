# Yêu cầu đăng nhập để dùng các chức năng học

Khách chưa đăng nhập sẽ chỉ xem được các trang giới thiệu. Mọi trang học, luyện tập, game, chatbot, sổ tay, bảng xếp hạng... đều hiện màn hình mời đăng nhập thay cho nội dung, và địa chỉ trang vẫn giữ nguyên để Google tiếp tục tìm thấy.

## Trang vẫn công khai

- Trang chủ, Chào mừng, Giới thiệu
- Liên hệ, Điều khoản, Bảo mật, Huỷ nhận email
- Đăng nhập, Đăng ký, Quên mật khẩu, Đặt lại mật khẩu
- Trang 404

Tất cả các trang còn lại (khoảng 220 địa chỉ) yêu cầu đăng nhập.

## Màn hình mời đăng nhập

Khi khách mở một trang cần đăng nhập:

- Địa chỉ trang không đổi, tiêu đề và mô tả trang cho Google vẫn giữ nguyên nên nội dung vẫn được lập chỉ mục.
- Ở giữa trang hiện một thẻ lịch sự: logo, tên phần học lấy từ chính địa chỉ trang, một dòng giới thiệu ngắn, 4 điểm lợi ích khi có tài khoản (tiến độ được lưu, bài tập của thầy, bảng xếp hạng, trợ lý AI).
- Hai nút: **Đăng nhập** và **Tạo tài khoản miễn phí**, cùng liên kết "Về trang chủ". Sau khi đăng nhập xong, hệ thống tự đưa về đúng trang khách đang muốn xem.
- Song ngữ Việt/Anh theo ngôn ngữ đang chọn, dùng đúng bảng màu và kiểu chữ hiện tại.
- Trong lúc kiểm tra phiên đăng nhập chỉ hiện vòng tròn tải, không nhá màn hình mời đăng nhập với người đã đăng nhập.

## Giữ nguyên những thứ đã có

- Toàn bộ địa chỉ trang, mã bài học và tiến độ học viên không thay đổi.
- Quyền quản trị (trang quản trị, trang trợ lý, quản lý học viên) vẫn kiểm tra vai trò như hiện tại, chỉ thêm một lớp yêu cầu đăng nhập ở ngoài.
- Không khoá theo trình độ hay theo gói học: mọi nội dung vẫn mở hết cho người đã đăng nhập, đúng nguyên tắc hiện tại của trường.

## Chi tiết kỹ thuật

- Thêm `src/components/AuthGate.tsx`: đọc phiên bằng `supabase.auth.getSession()` + `onAuthStateChange`, ba trạng thái `loading | authed | guest`. Khi `guest` render `LoginInvite` (component nội bộ cùng file, nhận `pathname`) thay cho `children`.
- Thêm `src/lib/publicRoutes.ts`: hằng `PUBLIC_PATHS` (khớp chính xác) + hàm `isPublicPath(pathname)` dùng cho cả `/`, `/home`, `/welcome`, `/about`, `/contact`, `/privacy`, `/terms`, `/unsubscribe`, `/login`, `/signup`, `/forgot-password`, `/reset-password`, và nhánh `/insights`, `/dich-vu-web` giữ công khai cho SEO marketing.
- Trong `src/App.tsx` bọc một lần duy nhất bên trong `<BrowserRouter>`: `<AuthGate><Routes>...</Routes></AuthGate>` — `AuthGate` dùng `useLocation()` và `isPublicPath()` để quyết định, nên không phải sửa 236 dòng `<Route>` và không đổi cấu trúc route.
- Nút Đăng nhập điều hướng `/login?next=<pathname+search>`; cập nhật `src/pages/Login.tsx` và `src/pages/Signup.tsx` đọc tham số `next` và `navigate(next)` sau khi có phiên (mặc định `/dashboard` như hiện tại).
- Tên phần học trên thẻ mời đăng nhập suy ra từ đoạn đầu của đường dẫn qua một bảng nhãn song ngữ nhỏ trong `publicRoutes.ts` (english, chinese, ielts, toeic, finnish, japanese, swedish, vietnamese, programming, sat, games, your-corner, ...), mặc định "Nội dung học".
- SEO: thẻ `<title>`/`<meta>` do từng trang tự đặt sẽ không còn chạy khi nội dung bị thay; vì vậy `LoginInvite` tự đặt `document.title` và `meta[name=description]` theo nhãn phần học đó, và `index.html` cùng `public/sitemap.xml` giữ nguyên để trình thu thập vẫn thấy cấu trúc trang.
- Không thay đổi cơ sở dữ liệu, không thay đổi RLS, không thêm gói phụ thuộc mới.
