

## Plan: Mở rộng từ vựng, kiểm tra hình ảnh & thêm bài tập 4 kỹ năng tiếng Phần Lan

### Phạm vi thay đổi

Có 3 việc chính cần làm:

1. **Thêm từ vựng mới** vào các module hiện có (expansion4 chỉ có ~15 từ/module, cần thêm)
2. **Bổ sung hình ảnh Unsplash** cho các từ chưa có trong `VOCAB_IMAGES` (nhiều từ trong expansion3, expansion4 như `onnellinen`, `tietokone`, `hotelli`, `äiti`, `veli`, `kahvi`, `omena`, `riisi`, `lenkkeily`, `uinti`, `maalaus`, `peli`, `kalastus`, `pyöräily`, `valokuvaus`, `yskä`, `hammas`, `terve`, `vauva`, `serkku`, `täti`, `vaimo`, `mummo`, `ukki`, `mehu`, `sokeri`, `suola`)
3. **Thêm bài tập luyện 4 kỹ năng** (Đọc, Nghe, Viết, Nói) vào curriculum

---

### File thay đổi

| File | Nội dung |
|------|----------|
| `src/pages/YkiDashboard.tsx` | Thêm ~50 entry vào `VOCAB_IMAGES` cho các từ thiếu hình; thêm ~30 entry vào `WORD_ILLUSTRATIONS`; thêm entries vào `CATEGORY_IMAGES` cho category `family`, `body`, `hobbies`, `drinks` |
| `src/data/finnishCurriculum/vocabularyExpansion4.ts` | Mở rộng mỗi module thêm 5-8 từ mới (tổng ~25 từ mới) |
| `src/data/finnishCurriculum/lessonsExpansion2.ts` | Thêm 2 module bài tập mới: "Luku- ja kuunteluharjoitukset" (Reading & Listening exercises) với fill-in-blank + quiz |
| `src/data/finnishCurriculum/mockExamExpansion3.ts` | Thêm bài tập kỹ năng viết và nói chi tiết hơn, với sample answers và rubric |

### Chi tiết kỹ thuật

**Hình ảnh:** Sử dụng Unsplash photos phù hợp với nghĩa từ. Ví dụ:
- `äiti` → ảnh mẹ con, `vauva` → ảnh em bé, `omena` → ảnh táo
- `lenkkeily` → ảnh người chạy bộ, `kalastus` → ảnh câu cá
- Kiểm tra và sửa các Unsplash ID không hợp lệ (broken images)

**Từ vựng mới (expansion4):**
- Family: thêm `setä` (uncle), `anoppi` (mother-in-law), `sisarus` (sibling)
- Food: thêm `pasta`, `voileipä` (sandwich), `jäätelö` (ice cream), `kanä` (chicken)
- Hobbies: thêm `hiihtäminen` (skiing), `luistelu` (skating), `puutarha` (garden)
- Health: thêm `nenä` (nose), `selkä` (back), `vatsa` (stomach), `flunssa` (flu)

**Bài tập 4 kỹ năng:**
- **Đọc (Lukeminen):** Thêm 2 bài đọc hiểu A2 với câu hỏi trắc nghiệm
- **Nghe (Kuuntelu):** Thêm 2 bài nghe (transcript + quiz), tích hợp TTS
- **Viết (Kirjoittaminen):** Thêm 3 writing prompts mới với sample answers vào `SAMPLE_ANSWERS`
- **Nói (Puhuminen):** Thêm 2 bài nói roleplay mới với từ vựng gợi ý

