# Gọn menu Tiếng Việt + thêm 36 bài học mới

## 1. Thu gọn menu thả xuống Tiếng Việt

Hiện menu Tiếng Việt có 2 mục lẻ ở trên, 4 nhóm ở giữa, 3 mục lẻ ở dưới cùng với 2 đường kẻ - nhìn dài và rời rạc. Sẽ gộp lại còn **2 mục nhanh + 4 nhóm**, mọi mục lẻ được đưa vào nhóm phù hợp:

- Tổng quan
- Kiểm tra trình độ & Cá nhân hoá
- 📚 Chương trình học: Ngữ pháp, Từ vựng, Lịch sử & Văn hoá, Quốc ca, Tiếng Việt chuyên ngành
- 🎎 Văn hoá & Đời sống: Ẩm thực, Du lịch & Vùng miền, Văn hoá & Phong tục, Phim & Hội thoại, Học qua bài hát
- 🎯 Luyện tập & Tương tác: Trò chơi, Arcade Hub, Daily Vietnamese, Phrasebook tình huống, Speaking Coach
- 🌏 Cho người học đặc biệt: Vietnamese for Foreigners, Cho trẻ Việt kiều

Bỏ 2 đường kẻ không còn cần thiết. Hai nhóm "Văn hoá & Đời sống" và "Cho người học đặc biệt" hiện thiếu tiêu đề khi mở ra, sẽ bổ sung tiêu đề song ngữ. Không đổi bất kỳ đường dẫn nào, nên các liên kết cũ vẫn hoạt động.

## 2. Thêm 9 bài học cho mỗi mục (tổng 36 bài mới)

Tất cả bài mới đều song ngữ Việt - Anh, có lý thuyết, tối thiểu 10 từ vựng kèm ví dụ, và 5 câu hỏi trắc nghiệm có giải thích, đúng chuẩn nội dung đang dùng.

- **Ngữ pháp + Từ vựng (9 bài)**: 5 bài ngữ pháp ứng dụng (câu bị động, câu điều kiện, liên từ nối ý, câu hỏi tu từ, rút gọn câu) và 4 bộ từ vựng mới (công việc & phỏng vấn, sức khoẻ & y tế, tiền bạc & mua sắm, môi trường & thời tiết).
- **Văn hoá & Đời sống (9 bài)**: 3 bài ẩm thực, 2 bài vùng miền, 2 bài văn hoá & phong tục, 2 bài phim & hội thoại - viết theo đúng dạng dữ liệu của từng trang đó.
- **Luyện tập & Tương tác (9 bài)**: 5 chủ đề Daily Vietnamese mới và 4 bộ Phrasebook tình huống mới (bệnh viện, ngân hàng, thuê nhà, sự cố khi đi lại).
- **Người nước ngoài & Trẻ Việt kiều (9 bài)**: 5 bài cho Vietnamese for Foreigners (A1-B1) và 4 bài cho trẻ Việt kiều, đều có phát âm, ví dụ và câu hỏi kiểm tra.

Bài mới được thêm vào cuối các danh sách hiện có nên tiến độ học đã lưu của học viên không bị ảnh hưởng.

## Chi tiết kỹ thuật

- `src/components/Navbar.tsx`: viết lại `vietnameseSubs` thành 2 link + 4 group `children`, bỏ 2 divider `#vn-div1`/`#vn-div2`, thêm nhánh tiêu đề cho `groupLabel` `vn-culture` và `vn-foreigners` trong bảng map tiêu đề nhóm (khoảng dòng 891-925). Menu mobile dùng cùng mảng nên tự cập nhật.
- Bài học ngữ pháp/từ vựng: file mới `src/data/vietnamese/expansionV10.ts` theo mẫu `expansionV9.ts` (push lesson vào các module hiện có, đúng interface `VietnameseLesson` trong `src/data/vietnamese/types.ts`), import side-effect trong `src/data/vietnameseCurriculumData.ts`.
- Nội dung văn hoá/luyện tập/người nước ngoài: thêm vào các file `*Expansion.ts` tương ứng (`cuisineExpansion`, `regionsExpansion`, `cultureExpansion`, `filmsExpansion`, `dailyVietnameseExpansion`, `phrasebookExpansion`, `detailedVFFExpansionV9`, `kidsExpansion3`) hoặc file expansion mới cùng dạng, giữ nguyên id cũ và chỉ dùng id mới không trùng.
- Kiểm tra: `bunx tsgo --noEmit`, script đếm/audit nội dung Vietnamese hiện có, và kiểm tra thực tế menu + các trang trên desktop và mobile.
- Không thay đổi backend, route, hay dữ liệu tiến độ.
