

## Plan: Thêm câu trả lời mẫu cho tất cả bài Speaking tiếng Phần Lan còn thiếu

Hiện tại chỉ có `mockExamExpansion.ts` (5 bài) và `mockExamExpansion3.ts` (5 bài) đã có `sampleAnswer`. Còn **8 bài Speaking** trong 2 file khác chưa có — đó là lý do bạn không thấy phần bài mẫu.

### File thay đổi

| File | Nội dung |
|------|----------|
| `src/data/finnishCurriculum/mockExamData.ts` | Thêm `sampleAnswer` cho 5 bài: Kerro itsestäsi, Apteekissa, Kuvaile kuvaa, Työhaastattelu, Naapurin kanssa |
| `src/data/finnishCurriculum/mockExamExpansion2.ts` | Thêm `sampleAnswer` cho 3 bài: Lääkärissä, Työhaastattelu, Asuntonäyttö |

### Ví dụ sampleAnswer sẽ thêm

- **Kerro itsestäsi:** "Nimeni on Maria ja olen kotoisin Vietnamista. Asun nyt Helsingissä perheeni kanssa. Opiskelen suomea ja työskentelen ravintolassa. Vapaa-ajallani tykkään lukea ja kävellä luonnossa. Opiskelen suomea, koska haluan asua Suomessa pysyvästi."
- **Työhaastattelu (mockExamData):** "Nimeni on Anna. Minulla on kokemusta myyjän työstä kaksi vuotta. Hain tätä työpaikkaa, koska pidän asiakaspalvelusta. Olen ahkera ja luotettava. Kyllä, voin työskennellä viikonloppuisin."
- **Apteekissa:** "Hei, minulla on kovaa päänsärkyä. Tarvitsen särkylääkettä. Mitä suosittelette? Ei, minulla ei ole allergioita. Paljonko lääke maksaa? Kiitos, otan sen!"

Giao diện `SpeakingRecorder` đã sẵn sàng hiển thị `sampleAnswer` — chỉ cần bổ sung data là phần bài mẫu + nút nghe + đánh giá sẽ tự xuất hiện.

