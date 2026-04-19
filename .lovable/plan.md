
Người dùng muốn nội dung Theory trong Learn Programming **dài, chi tiết, chuyên sâu hơn nữa**. Hiện tại nội dung vẫn còn ngắn và đơn giản.

## Phạm vi mở rộng

Tập trung mở rộng theory cho toàn bộ các pillar trong Learn Programming:
- **Cloud Engineer**: `cloudLessons.ts` (15 lessons) + `cloudExpansion.ts` (10 lessons)
- **Data Engineering**: `dataEngLessons.ts` (~12 modules)
- **AI Foundation**: `aiFoundationLessons.ts` (~12 modules)
- **SQL**: `sqlLessons.ts` (12 modules)
- **Programming/Python**: `programmingExpansion.ts` (5 modules)
- **ML**: `mlLessons.ts`

## Chuẩn nội dung mới (mỗi lesson theory)

Mỗi bài sẽ được mở rộng theo cấu trúc đầy đủ, **tối thiểu 6-8 sections lớn** với markdown chuẩn `## H2` đã đặt ra:

1. **Tổng quan & bối cảnh** — vì sao cần học, dùng ở đâu trong thực tế
2. **Khái niệm cốt lõi** — định nghĩa, thuật ngữ, mô hình tư duy
3. **Cách hoạt động chi tiết** — đi sâu cơ chế bên trong, có sơ đồ ASCII / bảng nếu cần
4. **Ví dụ thực tế từ doanh nghiệp** — Netflix, Spotify, Stripe, Grab, Shopee… (1-2 case study cụ thể)
5. **So sánh / đánh đổi (trade-offs)** — bảng so sánh các lựa chọn
6. **Best practices** — checklist các nguyên tắc nên làm
7. **Common pitfalls / anti-patterns** — các lỗi hay gặp + cách tránh
8. **Khi nào nên / không nên dùng** — guideline ra quyết định
9. **Liên hệ với các bài khác** — bridge học tiếp

Bổ sung:
- TheoryEn song song được mở rộng tương ứng
- Vẫn giữ format đã chuẩn hóa (H2 cho section lớn, **Bold inline:** cho ý ngắn, không lạm dụng heading nhỏ lẻ)
- Code example và Practice exercise giữ nguyên cấu trúc hiện tại (không đụng tới)
- Quiz giữ nguyên (không thay đổi)

## Cách triển khai

Vì khối lượng rất lớn (50+ lessons × ~3-5x nội dung hiện tại), sẽ làm theo **đợt ưu tiên**:

**Đợt 1 — Cloud Engineer (đang xem)**
- `cloudLessons.ts`: mở rộng 15 lessons
- `cloudExpansion.ts`: mở rộng 10 lessons

**Đợt 2 — Data & AI**
- `dataEngLessons.ts`
- `aiFoundationLessons.ts`
- `mlLessons.ts`

**Đợt 3 — SQL & Python**
- `sqlLessons.ts`
- `programmingExpansion.ts`

Trong lần triển khai này, tôi sẽ bắt đầu với **Đợt 1 (Cloud Engineer)** vì người dùng đang ở `/programming/cloud-strategy-cost`. Sau khi xác nhận chất lượng nội dung đạt yêu cầu, sẽ tiếp tục các đợt còn lại trong các message tiếp theo.

## Files chỉnh sửa (đợt 1)

- `src/data/curriculum/cloudLessons.ts` — mở rộng theory + theoryEn cho 15 lessons
- `src/data/curriculum/cloudExpansion.ts` — mở rộng theory + theoryEn cho 10 lessons

Không tạo file mới, không thay schema, không đụng UI/backend.

## Kết quả mong đợi

- Mỗi lesson Theory dài gấp 3-5 lần hiện tại
- Có chiều sâu chuyên môn (cơ chế, trade-offs, case study thật)
- Vẫn giữ readability nhờ format markdown chuẩn đã thiết lập + component `TheorySections` (chia nhỏ theo H2, có nút đánh dấu đã đọc cho từng phần)
- Học viên có thể đọc như tài liệu kỹ thuật chuyên nghiệp, không còn cảm giác "quá ngắn"
