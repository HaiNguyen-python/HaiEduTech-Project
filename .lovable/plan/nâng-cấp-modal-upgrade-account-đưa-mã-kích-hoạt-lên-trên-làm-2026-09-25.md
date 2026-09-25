# Nâng cấp modal Upgrade Account: đưa mã kích hoạt lên trên + làm mới Perks

## Mục tiêu (theo yêu cầu của thầy)
1. Đưa ô "Học viên nội bộ - Dùng mã kích hoạt" và phần nhập mã lên **trên** phần thanh toán.
2. Đưa 2 ô **Card Payment** và **Bank Transfer** xuống **dưới** phần mã kích hoạt.
3. Cập nhật lại danh sách **Premium Perks** để thuyết phục nâng cấp tài khoản hơn.

File duy nhất bị chỉnh: `src/components/UpgradeAccountModal.tsx`.
Không đổi logic backend, không đổi giá, không đổi thứ tự tab nội bộ.

## 1. Sắp xếp lại bố cục modal

Trật tự hiển thị sau khi đổi:

```text
┌─ Header vàng Premium ─────────────────────────┐
│ 1. Premium Perks (grid 2-3 cột, làm mới)      │
│ 2. MÃ KÍCH HOẠT (nút viền đứt + ô nhập mã)    │
│ 3. Card Payment  |  Bank Transfer (2 ô lớn)   │
│ 4. Nội dung tab đang chọn (online/bank)       │
└───────────────────────────────────────────────┘
```

Chi tiết:
- Di chuyển nút viền đứt "Internal student - Use activation code" và panel nhập mã (`tab === "code"`) lên **trước** lưới 2 ô thanh toán.
- Giữ nguyên hành vi: bấm nút mã → mở panel nhập mã ngay dưới nó; khi tab đang là "code", 2 ô thanh toán vẫn hiển thị bên dưới nhưng không active.
- Panel "online" (Stripe) và "bank" (2 khối chuyển khoản VN/Phần Lan + nút xác nhận) giữ nguyên, nằm dưới 2 ô tab như cũ.
- Giá và nhãn "Only 19 EUR / year", "Only 19 EUR/ year (599k VND)" giữ nguyên như vừa chỉnh.

## 2. Làm mới Premium Perks (dựa trên tính năng có thật của trang)

Thay 12 mục hiện tại bằng danh sách hấp dẫn, song ngữ (vi/en), có điểm nhấn "giá trị". Đề xuất 10 mục:

1. 🔓 Toàn bộ bài học mọi khóa — English, Chinese, Finnish, Vietnamese, Japanese, Programming
2. 📝 Trọn bộ đề thi mô phỏng — Cambridge, IELTS, TOEIC, THPT (125+ đề, chấm chi tiết)
3. 🤖 AI Chấm Writing & Speaking không giới hạn — IELTS/TOEIC band 7.5+ feedback
4. 🎖️ Chứng chỉ hoàn thành khóa — Business, Academic, AI Academy (kèm link kiểm tra thật `/verify/:code`)
5. 🧠 Learning DNA & báo cáo tiến bộ cá nhân — radar kỹ năng, PDF xuất báo cáo
6. 🎮 Trò chơi & Leaderboards — Game Center, Mountain/Great Wall Climber, Duel 1v1
7. 📚 Siêu từ điển + Sổ tay học viên — từ vựng, flashcard, Daily Word Mission đầy đủ
8. 🎓 Tư vấn học bổng & lộ trình sự nghiệp — Scholarship AI Advisor, Career Roadmap
9. 🚀 Nhận bài học mới sớm nhất — nội dung cập nhật hằng ngày
10. 🛡️ Hỗ trợ ưu tiên từ Thầy Hải — phản hồi nhanh qua email/Chatbot

Nguyên tắc: mỗi mục 1 emoji + tiêu đề ngắn + mô tả 1 dòng, giữ `t()` song ngữ như hiện tại; grid 2 cột mobile / 3 cột desktop không đổi. Không thêm mục chưa có tính năng thật trên trang.

## 3. Kiểm tra

- Build OK (tsgo không lỗi).
- Playwright: mở modal Upgrade Account trong preview, xác nhận thứ tự mới (mã trên, thanh toán dưới), nhập mã sai hiện thông báo, các khối chuyển khoản VN/Phần Lan hiển thị đúng.
