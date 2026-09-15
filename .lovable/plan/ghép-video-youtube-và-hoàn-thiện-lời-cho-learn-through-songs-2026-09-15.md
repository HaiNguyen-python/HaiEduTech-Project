# Ghép video YouTube và hoàn thiện lời cho Learn through Songs

## Hiện trạng đã kiểm tra (truy vấn dữ liệu thật)

Thư viện có 49 bài: Anh 13, Trung 12, Phần Lan 12, Việt 12.

- **22 bài chưa có video YouTube nào**:
  - Anh (7): She'll Be Coming 'Round the Mountain, Oh! Susanna, Happy Birthday to You, Auld Lang Syne, London Bridge Is Falling Down, Amazing Grace, Home on the Range
  - Trung (6): 送别, 拔萝卜, 王老先生有块地, 丢手绢, 咏鹅, 静夜思
  - Phần Lan (4): Tuu tuu tupakkarulla, Piiri pieni pyörii, Joulupuu on rakennettu, Kalliolle kukkulalle
  - Việt (5): Nu Na Nu Nống, Dung Dăng Dung Dẻ, Rồng Rắn Lên Mây, Thả Đỉa Ba Ba, Bà Còng Đi Chợ
- **6 bài đang bị ẩn** (is_published = false) dù có link: 世上只有妈妈好, 生日快乐歌, 小毛驴, The Wheels on the Bus, Päivänsäde ja Menninkäinen, Pikku Kakkonen.
- **Lời còn ngắn**: trung bình 5,8 dòng (Trung), 7,8 (Anh), 8,5 (Phần Lan), 8,2 (Việt); nhiều bài chỉ 4 dòng, tức mới là đoạn trích.

## Việc sẽ làm

### 1. Ghép video cho 22 bài còn trống
- Tìm video cho từng bài, ưu tiên bản chính thức hoặc bản lyric/karaoke thiếu nhi rõ lời, đúng ngôn ngữ.
- Xác thực từng link trước khi lưu: video còn phát được, tiêu đề đúng bài và đúng ngôn ngữ (không nhận bản tiếng Anh cho bài Trung/Phần Lan).
- Nếu một bài thật sự không có nguồn hợp lệ, giữ nguyên trạng và ghi rõ trong báo cáo cuối, không lưu link sai.

### 2. Xem lại 6 bài đang bị ẩn
- Kiểm tra lại link của các bài này; nếu video còn sống và đúng bài thì bật hiện lại, nếu chết thì thay video mới rồi bật.

### 3. Hoàn thiện lời bài hát
- Bổ sung đầy đủ các đoạn của bài (verse, điệp khúc, phần lặp thật có trong bản thu), không dùng "..." hay "lặp lại điệp khúc".
- Mỗi dòng có bản dịch tiếng Việt tự nhiên; bài tiếng Trung có Hanzi + Pinyin đầy đủ.
- Ưu tiên phần lời trùng với video đã ghép để học viên hát theo được.

### 4. Cập nhật từ vựng và bài điền từ theo lời mới
- Mỗi bài có tối thiểu 5 từ trọng tâm (nghĩa + ví dụ) và các câu điền từ trỏ đúng dòng, đúng từ có chứa đáp án.

### 5. Kiểm duyệt tự động
- Chạy lại `scripts/audit-language-songs.mjs` cho toàn bộ 49 bài đến khi 0 lỗi: không bài trống, không thiếu bản dịch/Pinyin, không dấu rút gọn, không quiz trỏ sai dòng, không trùng tên bài.
- Kiểm tra trực tiếp 4 trang `/songs/english|chinese|finnish|vietnamese` trên desktop và mobile: video phát được, lời không tràn ngang, karaoke kết thúc đúng dòng cuối.

## Chi tiết kỹ thuật

- Dữ liệu sửa trong bảng `language_songs` (`youtube_id`, `lyrics`, `core_vocab`, `blanks_quiz`, `is_published`) bằng migration UPDATE, không hard-code trong frontend.
- Xác thực link bằng YouTube oEmbed (`/oembed?url=...`): phản hồi rỗng = video bị xoá/riêng tư; so tiêu đề trả về với tiêu đề bài để phát hiện sai bài.
- Không đổi route, UUID bài, thứ tự hiển thị hay giao diện `SongLibrary.tsx` (giữ nút "Open on YouTube" dự phòng).
