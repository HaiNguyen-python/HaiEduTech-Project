# Plan: Brand Google Sign-in thành HaiEduTech

## Mục tiêu
Khi người dùng bấm "Đăng nhập với Google", màn hình `accounts.google.com` hiển thị logo/tên **HaiEduTech** thay vì Lovable.

## Ràng buộc kỹ thuật
- Trang `accounts.google.com` do Google kiểm soát, không thể sửa bằng code frontend.
- Brand trên màn hình Google lấy từ **OAuth consent screen** của Google Cloud project.
- Lovable Cloud Managed OAuth mặc định sẽ hiển thị tên Lovable; muốn đổi thành HaiEduTech cần dùng **Google OAuth client riêng (BYOK)**.
- Không được chỉnh sửa file auto-gen `src/integrations/lovable/index.ts` hoặc `src/integrations/supabase/client.ts`.
- Logo HaiEduTech đã được upload, có thể dùng làm asset CDN.

## Các bước thực hiện

### 1. Kiểm tra cấu hình auth hiện tại
- Xác nhận project đang dùng Lovable Cloud Managed OAuth hay BYOK.
- Kiểm tra provider Google đã bật và redirect_uri cấu hình đúng chưa.
- Nếu đang dùng managed OAuth, cần chuyển sang BYOK để có branding tùy chỉnh.

### 2. Cải thiện trang login của ứng dụng
- Thay thế/tăng cường logo HaiEduTech ở trang `/login` (hiện chỉ có icon `LogIn`).
- Đảm bảo nút "Tiếp tục với Google" rõ ràng thuộc về HaiEduTech.
- Giữ nguyên logic `lovable.auth.signInWithOAuth` và `redirect_uri: window.location.origin`.

### 3. Hướng dẫn/cấu hình Google Cloud OAuth BYOK (nếu cần)
- Tạo/cập nhật Google Cloud project với tên ứng dụng **HaiEduTech**.
- Cấu hình OAuth consent screen:
  - App name: **HaiEduTech**
  - User support email: `contact@haiedutech.com`
  - Developer contact: `contact@haiedutech.com`
  - Logo: logo HaiEduTech (PNG/JPG, yêu cầu kích thước của Google).
  - Authorized domains: `haiedutech.com`, `lovable.app`.
- Tạo Web OAuth Client ID với redirect URI từ Lovable Cloud Auth Settings.
- Thêm Client ID và Client Secret vào **Lovable Cloud Authentication Settings > Google Auth Provider**.
- Gọi lại `supabase--configure_social_auth` để xác nhận provider Google vẫn bật.

### 4. Kiểm thử
- Đăng xuất và thử đăng nhập lại bằng Google.
- Chụp màn hình màn hình Google Sign-in xác nhận hiển thị **HaiEduTech**.
- Kiểm tra đăng nhập vẫn hoạt động trên preview và custom domain.

## Deliverables
- Trang `/login` của app hiển thị brand HaiEduTech rõ ràng.
- Màn hình Google Sign-in hiển thị **HaiEduTech** thay vì Lovable (sau khi cấu hình BYOK).
- Không ảnh hưởng đến routes, backend, hoặc progress/storage keys.

## Lưu ý cho người dùng
- Nếu không muốn tự tạo Google OAuth client, màn hình Google sẽ tiếp tục hiển thị Lovable vì đó là managed OAuth của Lovable Cloud.
- Việc cấu hình BYOK yêu cầu quyền quản trị Google Cloud Console và phải xác minh ứng dụng nếu dùng scopes nhạy cảm (hiện tại chỉ cần email/profile nên không cần xác minh nghiêm ngặt).
