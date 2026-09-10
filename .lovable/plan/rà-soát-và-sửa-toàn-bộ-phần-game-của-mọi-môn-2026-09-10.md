# Rà soát và sửa toàn bộ phần game của mọi môn

Đã kiểm tra thực tế trong code toàn bộ khu game: Chinese Arcade, Vietnamese Arcade, Finnish Arcade, Multi-Lang Arcade, Cambridge Arcade/Fun Zone, Programming Arcade (SQL Dungeon, Pipeline Plumber, AI Parameter Tuner, Code Galaxy), Vocab Arena (9 mini game), Game Hub tiếng Việt (Timeline, Shadow Fight, Culture Detective, Duel Battle, Word Meteor), Fact or Myth và các nhân vật leo núi.

## Lỗi đã xác minh

Kỹ thuật
1. Chơi lại bằng cách tải lại cả trang ở 4 game tiếng Trung (`src/pages/ChineseArcade.tsx:261,540,804,1106`) - mất trạng thái, tải lại toàn bộ trang, khác hẳn các arcade khác.
2. Không lưu điểm ở: Vietnamese Arcade, Finnish Arcade, Multi-Lang Arcade, cả 4 game Programming Arcade và Fact or Myth. Chơi xong không vào bảng xếp hạng, không vào lịch sử hoạt động.
3. Không game arcade nào ghi nhận ôn từ vựng về Bộ não ghi nhớ (không nơi nào gọi `recordVocabReviewTracked`), dù nhiều game là game từ vựng.
4. Không dừng giọng đọc khi rời game: mọi game chỉ hủy giọng trước khi đọc câu mới, không hủy khi thoát - rời giữa lúc đang đọc thì tiếng vẫn chạy.
5. `src/pages/ProgrammingArcade.tsx:256` chạy hiệu ứng theo bộ đếm thời gian mà không dọn khi rời game.
6. Hai chế độ tiếng Trung (Pinyin Match ở dòng 261 và game ở dòng 804) không gọi lưu điểm, trong khi Hotpot Chef và Sentence Builder có.

Nội dung
7. SQL Dungeon chỉ có 3 câu đố rồi lặp lại từ đầu; Code Galaxy 8 snippet mỗi nhánh - quá mỏng cho một "arcade".
8. Trang Programming Arcade ghi "3 mini-game" nhưng thực tế có 4 game (`ProgrammingArcade.tsx:496` so với danh sách dòng 476-479).
9. Phần code trong game lập trình đã đúng chuẩn tiếng Anh - không cần sửa.

Hiển thị
10. Bong bóng từ rơi trong game tiếng Trung (`ChineseArcade.tsx:309-315`) dùng chiều rộng cố định và không kẹp trong khung, có thể tràn ra ngoài màn hình nhỏ.
11. Các arcade dùng nhiều màu chữ/nền cố định (chủ ý theme neon tối), cần soát riêng các trạng thái hover để chữ không bị mờ trên nền sáng.

## Việc sẽ làm

Bước 1 - Sửa lỗi kỹ thuật
- Thay tải lại trang bằng chơi lại tại chỗ (giữ điểm cao, chế độ, tên người chơi) cho 4 game tiếng Trung.
- Thêm lưu điểm cho Vietnamese, Finnish, Multi-Lang, 4 game Programming, Fact or Myth và 2 chế độ tiếng Trung còn thiếu; mỗi game một mã riêng, có chốt chống ghi trùng.
- Các game từ vựng ghi nhận từ trả lời đúng về Bộ não ghi nhớ (đúng theo môn: tiếng Trung, tiếng Việt, Phần Lan, Cambridge...).
- Dừng giọng đọc và dọn bộ đếm thời gian khi rời mọi game.

Bước 2 - Nội dung
- Tăng SQL Dungeon lên 10 câu đố (SELECT, WHERE, COUNT, ORDER BY, JOIN cơ bản) song ngữ, đáp án tiếng Anh; bổ sung snippet cho Code Galaxy.
- Sửa số lượng game hiển thị và mô tả trang cho khớp thực tế.

Bước 3 - Hiển thị
- Kẹp bong bóng từ rơi trong khung, dùng chiều rộng linh hoạt để không tràn trên điện thoại.
- Chạy lại kiểm tra tương phản hover cho toàn bộ trang game.

Bước 4 - Kiểm tra
- Kiểm tra kiểu dữ liệu, chạy audit hover, mở từng trang game trên máy tính và điện thoại, chơi thử tới màn kết thúc để xác nhận điểm được lưu và không còn lỗi console.

## Chi tiết kỹ thuật
- Dùng `submitGameScore` (`src/lib/submitGameScore.ts`) cho arcade theo môn, `logArenaGame` cho Vocab Arena; thêm `recordVocabReviewTracked(subject, correctWords)` từ `src/lib/vocabReview.ts`.
- Chơi lại bằng cách reset state hoặc remount qua `key` (runId), không dùng `window.location.reload()`.
- Thêm `useEffect` cleanup gọi `window.speechSynthesis.cancel()` và `clearInterval` khi unmount ở các file game.
- Không đổi route, không đổi khóa lưu tiến độ, không đổi bảng dữ liệu; chỉ thêm dòng vào `game_scores` và `user_vocab_mastered` qua helper hiện có.
