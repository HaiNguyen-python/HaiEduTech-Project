

## Plan: Sửa lỗi "Failed to connect to AI" trong Roleplay

### Nguyên nhân gốc

Perplexity API yêu cầu messages phải xen kẽ đúng thứ tự: `user → assistant → user → assistant...`. Hiện tại:

1. `startConversation` gửi 1 user message (prompt khởi tạo) nhưng chỉ lưu response assistant vào state
2. Khi user gửi tin tiếp theo, mảng messages gửi đi là: `[assistant, user]` — bắt đầu bằng assistant → Perplexity trả lỗi 400

### Thay đổi (file: `src/components/ConversationalRoleplay.tsx`)

**Sửa `startConversation`**: Lưu cả user message khởi tạo vào state, không chỉ assistant response.

Thay đổi dòng ~126:
```tsx
// Trước (chỉ lưu assistant)
setMessages([{ role: "assistant", content: assistantSoFar }]);

// Sau (lưu cả user prompt ban đầu + assistant)  
const initUserMsg: Msg = { role: "user", content: `Start the roleplay...` };
setMessages([initUserMsg, { role: "assistant", content: assistantSoFar }]);
```

**Sửa `sendMessage`**: Đảm bảo mảng messages gửi đi luôn bắt đầu bằng user message. Thêm logic sanitize trước khi gửi:

```tsx
// Đảm bảo messages xen kẽ đúng user/assistant
const sanitized = visibleMessages.filter((m, i) => {
  if (i === 0) return m.role === "user";
  return m.role !== visibleMessages[i - 1].role;
});
```

### Phạm vi
- 1 file: `src/components/ConversationalRoleplay.tsx`
- Không thay đổi edge function `roleplay-chat` (vẫn dùng Perplexity API)
- Không ảnh hưởng UI

