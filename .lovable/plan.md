# Vocab Arena: sửa lỗi điều hướng + thêm 4 mini game mới

## Kết quả rà soát (đã xác minh trong code)

Lỗi điều hướng (đúng như bạn phát hiện):

1. **Không có nút thoát khi đang chơi Solo Challenge** - `GameEngine` không có nút Thoát, nên đang chơi muốn ra phải tải lại trang.
2. **Không có nút thoát ở màn "Đang chờ giáo viên bắt đầu"** trong Classroom Battle - học sinh vào sai phòng là bị kẹt.
3. **Không có nút thoát khi đang chơi Classroom Battle** (dùng chung `GameEngine`).
4. **Nút "Chơi lại" ở màn kết thúc của Word Hunt, Definition Sprint, Synonym Showdown và Word Scramble gọi `window.location.reload()`** - tải lại cả trang, ném người học về menu Vocab Arena, mất tên người chơi và chế độ Solo/Team. Đúng ra chỉ cần chơi lại chính game đó.
5. **Nút Back của trình duyệt không hoạt động trong Arena** - mọi màn đều là state nội bộ, không gắn vào URL, nên bấm Back là rời hẳn trang.

Lỗi nội dung/dữ liệu:

6. **Memory Match và Word Scramble không lưu điểm cao** (chỉ Hunt, Sprint, Synonym có `saveHighScore`) - vương miện kỷ lục trên 2 thẻ game này luôn trống.
7. **Không mini game nào ghi điểm về hệ thống** - chỉ Solo Challenge ghi vào `game_scores` và log hoạt động. Mini game chỉ lưu local, nên bảng xếp hạng lớp, streak và Vocabulary Brain không nhận điểm.
8. **Mini game không ghi nhận ôn tập từ vựng** - từ trả lời đúng không được tính là một lần ôn, nên chơi game không giúp từ chìm vào long-term memory của bộ não 3D.
9. **Mini game lấy từ ngẫu nhiên trong toàn bộ 800 từ**, không ưu tiên từ học sinh đã đánh dấu ⭐ hoặc đang mờ dần - chơi vui nhưng không đúng nhu cầu ôn.

## Phần 1 - Sửa lỗi

- Thêm nút **Thoát** (kèm hộp xác nhận khi đang chơi) vào `GameEngine` để dùng chung cho Solo và Classroom Battle.
- Thêm nút **Rời phòng** ở màn chờ giáo viên; xoá bản ghi tham gia phòng khi rời.
- Thay `window.location.reload()` bằng hàm `restart()` nội bộ ở cả 4 mini game: giữ tên người chơi, chế độ Solo/Team và điểm cao.
- Thêm nút **Về menu game** ngay cạnh "Chơi lại" ở mọi màn kết thúc.
- Đồng bộ màn hình Arena với URL (`?screen=mini-games`...) để nút Back của trình duyệt lùi từng bước thay vì rời trang.
- Bổ sung `saveHighScore` cho Memory Match và Word Scramble.
- Ghi điểm mini game về `game_scores` (mỗi game một `game_type` riêng) + log hoạt động, và ghi nhận ôn tập từ đúng qua `recordVocabReviewTracked` để nuôi Vocabulary Brain và mission hàng ngày.
- Mini game ưu tiên trộn từ đã ⭐ và từ đang mờ dần vào bộ câu hỏi (vẫn đủ từ nếu học sinh chưa đánh dấu gì).

## Phần 2 - 4 mini game mới cho từ vựng IELTS

Chọn theo dữ liệu có sẵn trong ngân hàng từ (synonyms, collocations, example, category, part of speech) nên không cần AI, chạy nhanh và luôn đúng đáp án:

1. **Collocation Snap** - hiện nửa cụm ("academic ___"), chọn/kéo nửa còn lại. Dạy cách dùng từ tự nhiên, ăn điểm Lexical Resource cho Writing/Speaking.
2. **Odd One Out** - 4 từ, chọn từ không cùng nhóm nghĩa. Rèn phân biệt từ đồng nghĩa gần nghĩa.
3. **Context Cloze Rush** - lấy câu ví dụ thật, ẩn từ khoá, chọn từ đúng trong 4 lựa chọn theo thời gian. Học từ trong ngữ cảnh chứ không học rời.
4. **Listening Catch (nghe - gõ)** - máy đọc từ bằng TTS, học sinh gõ lại; có nút nghe chậm. Vừa luyện chính tả vừa luyện nghe.

Tất cả game mới dùng lại khung sẵn có: header điểm/thoát, combo x1.5 - x2 - x3, pháo hoa, âm thanh, bảng điểm cao, chế độ Solo và Đội 2 người, và cùng ghi điểm về hệ thống như Phần 1.

## Chi tiết kỹ thuật

- `src/components/vocab-arena/GameEngine.tsx`: thêm prop `onQuit` + dialog xác nhận.
- `src/pages/VocabArena.tsx`: truyền `onQuit`, đồng bộ `phase` với query param, dùng `useSearchParams`.
- `src/components/vocab-arena/ClassroomBattle.tsx`: nút rời phòng ở màn chờ và khi đang chơi.
- `src/components/vocab-arena/MiniGames.tsx`: bỏ `window.location.reload()`, thêm `restart`/`onExit` ở FinalScreen, thêm `saveHighScore` cho memory + scramble.
- Tách 4 game mới thành `src/components/vocab-arena/games/` để file MiniGames không phình quá lớn, dùng chung helper chọn từ trong `gameFx.ts`.
- Hàm chung `logArenaGame(gameKey, score, accuracy, words)` ghi `game_scores` + `logStudentActivity` + `recordVocabReviewTracked("ielts", correctWords)`.
