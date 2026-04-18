
## Plan: Tối giản nội dung lưu Notebook + Append vào 1 entry duy nhất

### Mục tiêu
1. **Chỉ lưu 2 phần**: câu học sinh viết + câu Band 7.5+ Upgrade (bỏ score, grammar feedback, phrase feedback, meaning)
2. **Append mode**: tất cả câu mới từ cùng Task (1 hoặc 2) sẽ được nối vào **cùng 1 notebook entry** thay vì tạo entry mới mỗi lần

### Logic mới trong `PhrasePractice.tsx`

**Sau khi AI chấm xong:**
1. Query `student_notebooks` tìm entry có `title = "IELTS Writing Practice Task {taskType}"` của user (lấy mới nhất)
2. Tạo block HTML mới gọn:
   ```html
   <hr/>
   <p><strong>📝 "[phrase]"</strong> <em>([timestamp])</em></p>
   <p><strong>My sentence:</strong> [userSentence]</p>
   <p><strong>Band 7.5+ Upgrade:</strong> [upgradedVersion]</p>
   ```
3. **Nếu entry tồn tại** → `UPDATE` content = existing + new block, set `updated_at = now()`
4. **Nếu chưa có** → `INSERT` entry mới với block đầu tiên (không có `<hr/>` ở đầu)

### Files thay đổi
| File | Thay đổi |
|------|----------|
| `src/components/PhrasePractice.tsx` | Refactor block save → query + upsert append logic |

### Lưu ý kỹ thuật
- Task 1 và Task 2 = 2 entries riêng biệt (mỗi task 1 sổ duy nhất, append liên tục)
- Toast message giữ nguyên: "Đã lưu vào Sổ tay ghi chú"
- Guest user: vẫn lưu localStorage như cũ
- Không cần migration — bảng `student_notebooks` đã hỗ trợ UPDATE qua RLS `auth.uid() = user_id`
