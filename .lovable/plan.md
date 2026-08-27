# Rà soát toàn bộ câu ví dụ tiếng Phần Lan

## Lỗi đã xác nhận (chạy `scripts/audit_finnish_examples.mjs` trên 2.867 từ)

Câu ví dụ ở mục Finnish Vocabulary được sinh tự động bởi `src/data/finnishExampleNormalizer.ts` (mẫu câu theo category + từ loại) với danh sách viết tay `finnishExampleOverrides.ts`. Audit hiện báo 97 vấn đề và 4 cấu trúc bị dùng quá 45 lần. Các nhóm lỗi thật:

1. **Tính từ bị gắn nhãn "noun"** nên chạy vào mẫu câu danh từ, sinh ra câu vô nghĩa:
   - `suolainen` (salty) → "Pidän tästä suolaisesta enemmän kuin muista."
   - `herkullinen` (delicious) → "Voisinko saada vähän herkullista, kiitos?"
   - `pilvinen`, `sateinen`, `jäinen` → "Seuraan jäistä uutisista joka päivä."
2. **Danh từ động tính (-minen)** dùng mẫu dành cho bộ phận cơ thể/thời tiết:
   - `oksentaminen`, `nieleminen` → "Minun täytyy hoitaa oksentamista paremmin."
   - `sulaminen` → "Suomalaiset puhuvat usein sulamisesta."
3. **Mẫu câu không khớp về tính người / tính vật**:
   - `vuokralainen` (tenant) → "Siivosin vuokralaista lauantaina." (dọn dẹp… người thuê)
   - `kärpänen`, `ampiainen`, `hyönteinen` → "Lapset haluavat nähdä kärpästä eläinpuistossa." (xem ruồi ở sở thú)
   - `hevonen`, `varpunen` → mẫu "Näin … metsässä" dùng lẫn cho vật nuôi/động vật hoang.
4. **Sai logic ngữ nghĩa về bữa ăn / thời gian**: `päivällinen` (dinner) → "Syön päivällistä usein aamiaisella." (ăn bữa tối vào bữa sáng).
5. **Lặp cấu trúc**: 4 khuôn câu dùng >45 lần (nhiều nhất 44+ lần cho một khung), nên nhiều thẻ từ đọc giống nhau.
6. **Từ có biến cách bất quy tắc** (`käsi`, `vesi`, `lumi`, `porras`, `eteinen`) hiện dựa vào cơ chế fallback, cần override viết tay để chắc chắn đúng.

Phần từ vựng giáo trình YKI (`src/data/finnishCurriculum/vocabulary*.ts`) là nội dung viết tay - sẽ rà soát bằng script, chỉ sửa chỗ sai, không viết lại.

## Cách sửa

1. **Phân loại từ chính xác hơn trong normalizer**
   - Nhận diện tính từ theo hậu tố (`-inen`, `-llinen`, `-kas`, `-ton`) kết hợp kiểm tra nghĩa tiếng Anh (nghĩa không phải danh từ đếm được) → đưa sang `ADJ_TEMPLATES`.
   - Thêm nhóm mẫu riêng cho danh từ `-minen`/`-nta` (hành động): "Nieleminen on vaikeaa, kun kurkku on kipeä."
   - Thêm nhóm mẫu cho **người** (`-lainen`, `-ja`, gloss chỉ người) tách khỏi mẫu đồ vật.

2. **Thêm điều kiện `needs` cho các mẫu dễ sai nghĩa**
   - Mẫu "Siivosin {w}" chỉ dùng cho phòng/không gian.
   - Mẫu "nähdä {w} eläinpuistossa" chỉ cho động vật lớn; côn trùng dùng mẫu riêng ("Kesällä {w} häiritsee pihalla.").
   - Mẫu bữa ăn: bỏ "aamiaisella" cố định, chọn thời điểm khớp với nghĩa (aamiainen/lounas/päivällinen).
   - Mẫu thời tiết chia hai nhóm: hiện tượng (lumi, sade) và mô tả (pilvinen → tính từ).

3. **Tăng độ đa dạng**: mở rộng mỗi pool lên 6-8 mẫu và chọn mẫu theo hash của (từ + category) để không còn khuôn nào vượt ~30 lần.

4. **Mở rộng danh sách override viết tay** cho ~120 từ khó/tần suất cao (bất quy tắc biến cách, từ chỉ người, bộ phận cơ thể dạng số nhiều, từ trừu tượng), câu Phần Lan + bản dịch tiếng Anh khớp nghĩa 100%.

5. **Nâng cấp script audit** (`scripts/audit_finnish_examples.mjs`)
   - Giảm báo động sai: so khớp từ theo gốc có xét biến âm (`käsi/kädet`, `vesi/vettä`, `lumi/lunta`).
   - Thêm kiểm tra ngữ nghĩa: tính từ không được dùng mẫu danh từ, danh từ chỉ người không dùng mẫu đồ vật, tên bữa ăn không xuất hiện cùng bữa khác, côn trùng không ở sở thú.
   - Kiểm tra cặp FI/EN cùng loại câu, cùng thời, mọi câu kết thúc bằng dấu câu.
   - Cảnh báo nếu một khuôn câu vượt 30 lần.
   - Chạy lặp đến khi báo 0 lỗi.

6. **Rà soát dữ liệu YKI viết tay** bằng cùng script (chế độ chỉ báo cáo) và sửa tay những câu sai ngữ pháp/nghĩa được phát hiện.

## Chi tiết kỹ thuật

- Sửa: `src/data/finnishExampleNormalizer.ts` (phân loại POS, pool mẫu mới, guard `needs`), `src/data/finnishExampleOverrides.ts` (thêm override), `src/lib/finnishMorphology.ts` (bổ sung danh sách bất quy tắc để không sinh dạng sai), `scripts/audit_finnish_examples.mjs`.
- Không đổi UI, không đổi schema, không ảnh hưởng Speaking Coach hay flashcards - các trang dùng chung export đã chuẩn hóa.

## Kết quả mong đợi

Mọi câu ví dụ trong Finnish Vocabulary đúng ngữ pháp (biến cách, hòa âm nguyên âm), hợp logic ngữ nghĩa, đa dạng cấu trúc, và bản dịch tiếng Anh khớp nghĩa; audit báo 0 lỗi.
