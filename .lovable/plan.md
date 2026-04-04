

## Plan: Sắp xếp lại menu IELTS Program cho gọn gàng hơn

### Hiện trạng
Menu IELTS Program hiện có **8 mục** liệt kê dạng phẳng, gây cảm giác lộn xộn:
1. Overview & Roadmap
2. IELTS Lectures
3. IELTS Vocabulary
4. Vocab Arena
5. Sample Essays 8.0+
6. Writing Practice
7. Speaking Practice
8. Grading Portal

### Thay đổi (file: `src/components/Navbar.tsx`)

**Nhóm lại thành 3 cụm logic, dùng divider/label phân tách:**

| Nhóm | Mục | Ghi chú |
|------|-----|---------|
| **Học & Ôn** | Overview & Roadmap, IELTS Lectures | Lý thuyết + bài giảng |
| **Từ vựng** | IELTS Vocabulary, Vocab Arena | Gộp 2 mục từ vựng lại gần nhau |
| **Luyện tập & Chấm điểm** | Writing Practice, Speaking Practice, Sample Essays 8.0+, Grading Portal | Thực hành + đánh giá |

**Cách triển khai:**
- Sắp xếp lại thứ tự mảng `ieltsChildren` theo nhóm logic
- Thêm **divider items** (separator) giữa các nhóm — dùng item đặc biệt có `label: "---"` hoặc thêm thuộc tính `divider: true`
- Render divider trong dropdown bằng `<Separator />` khi gặp item có flag divider
- Giảm từ 8 mục rời rạc xuống 3 nhóm rõ ràng

**Thứ tự mới:**
```
── Học & Ôn ──
  Overview & Roadmap
  IELTS Lectures
──────────────
  IELTS Vocabulary
  Vocab Arena
──────────────
  Writing Practice
  Speaking Practice
  Sample Essays 8.0+
  Grading Portal
```

### Chi tiết kỹ thuật
- Thêm thuộc tính `divider?: boolean` vào interface `SubItem`
- Thêm 2 divider items vào mảng `ieltsChildren`
- Cập nhật logic render dropdown (khoảng dòng 400-430) để render `<Separator>` khi gặp divider item
- Không thay đổi routes hay trang nào khác

