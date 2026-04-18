

## Kế hoạch sửa 5 vấn đề

### 1. Chinese Vocabulary — Stroke Order (HanziStrokeOrder.tsx)

**Nguyên nhân hiện tại**: Component đã dùng jsDelivr CDN (CDN có hoạt động — đã verify trả về 200 OK cho `你.json`). Vấn đề là khi animation chạy xong hoặc khi click lại, có thể character "dính" ở trạng thái cuối, không reset, hoặc có lỗi rendering trên một số ký tự phức tạp.

**Sửa**:
- Thêm trạng thái loading (spinner) trong khi tải data
- Reset character về trạng thái outline trước khi animate lại (gọi `hideCharacter()` rồi `animateCharacter()`)
- Bắt thêm `onLoadCharDataSuccess` để xác nhận load thành công
- Thử CDN dự phòng thứ 2 (unpkg) nếu jsDelivr fail
- Hiển thị thông báo "Đang tải nét bút..." trong lúc fetch

### 2. AI Roleplay không kết nối được (Conversational English)

**Nguyên nhân**: `supabase/functions/roleplay-chat/index.ts` yêu cầu JWT auth bắt buộc (return 401 nếu không có Bearer token). Khi học sinh chưa login hoặc session hết hạn → 401 → "Failed to connect to AI". Đồng thời cần đảm bảo `PERPLEXITY_API_KEY` đã cấu hình.

**Sửa**:
- Đổi `roleplay-chat` thành **optional auth** giống như `chat` function (cho phép guest dùng nhưng vẫn check token nếu có)
- Thêm error log chi tiết trong edge function để debug
- Phía client (`ConversationalRoleplay.tsx`): hiển thị thông báo lỗi rõ ràng (toast) thay vì chỉ alert ngắn
- Verify `PERPLEXITY_API_KEY` qua `fetch_secrets`; nếu thiếu → request user add secret

### 3. Chatbot chỉ trả lời kiến thức, hướng học phí/đăng ký sang Zalo

**Sửa system prompt trong** `supabase/functions/chat/index.ts`:
- Thêm GUARDRAIL mới: nếu câu hỏi liên quan đến **học phí, đăng ký, lộ trình lớp, lịch học, ưu đãi** → trả lời chuẩn:
  - VI: "Để được tư vấn chi tiết về khóa học và học phí, em vui lòng liên hệ Zalo thầy Hải qua số **0962.823.800** nhé! 📞"
  - EN: "For detailed course and tuition consultation, please contact Teacher Hai on Zalo at **0962.823.800** 📞"
- Tăng cường focus vào kiến thức: ngữ pháp, từ vựng, kỹ năng, giải thích bài tập
- Loại bỏ phần "SALES & COURSE COUNSELING" hiện tại (đang chủ động gợi ý khóa học)

### 4. Notebook Phrase Practice chỉ lưu 1-2 câu — Lỗi merge

**Nguyên nhân (PhrasePractice.tsx dòng 142-170)**: Dùng `.eq("title", title).maybeSingle()` — nếu có **nhiều rows trùng title** (từ race condition hoặc lần lưu trước tạo duplicate), `.maybeSingle()` sẽ throw error, làm `saveErr` không null → toast success không hiển thị → các lần sau cũng fail luôn.

**Sửa**:
- Đổi `.maybeSingle()` → `.limit(1)` rồi lấy `data[0]` an toàn
- Thêm `console.error(saveErr)` để log lỗi rõ ràng
- Hiển thị toast lỗi với message cụ thể khi save fail (thay vì im lặng)
- Đảm bảo upsert dùng `id` của row mới nhất, tránh tạo duplicate

### 5. Notebook icon che ô nhập chatbot

**Nguyên nhân (FloatingNotebook.tsx dòng 282)**: Notebook button ở `bottom-6 right-24` (96px từ phải). Chatbot button ở `bottom-6 right-6`. Khi mở chatbot, panel chatbot mở rộng từ phải qua trái — notebook button vẫn nổi trên đó che mất ô input.

**Sửa**:
- Khi chatbot mở (`open === true`), **ẩn notebook button** (hoặc dịch xuống dưới)
- Cách đơn giản nhất: Lắng nghe state chatbot qua **window event** hoặc **shared context**:
  - Tạo custom event `chatbot:toggle` trong ChatBot.tsx (`window.dispatchEvent`)
  - FloatingNotebook lắng nghe event và toggle visibility/position
- Hoặc giải pháp đơn giản hơn: dịch notebook button lên cao hơn (ví dụ `bottom-24`) khi chatbot mở rộng

**Files thay đổi**:
| File | Thay đổi |
|------|----------|
| `src/components/HanziStrokeOrder.tsx` | Loading state + reset trước animate + fallback CDN |
| `supabase/functions/roleplay-chat/index.ts` | Optional auth, log lỗi chi tiết |
| `src/components/ConversationalRoleplay.tsx` | Hiển thị toast lỗi rõ ràng |
| `supabase/functions/chat/index.ts` | Cập nhật system prompt: chỉ kiến thức, redirect học phí qua Zalo |
| `src/components/PhrasePractice.tsx` | Sửa logic save: dùng `.limit(1)` thay `.maybeSingle()`, log lỗi |
| `src/components/FloatingNotebook.tsx` | Ẩn/dịch button khi chatbot mở (qua custom event) |
| `src/components/ChatBot.tsx` | Dispatch `chatbot:toggle` event khi open/close |

