# Chuẩn hóa câu ví dụ cho toàn bộ từ vựng tiếng Phần Lan

## Vấn đề đã xác nhận

`src/data/finnishVocabData.ts` chứa 2.867 từ, và phần lớn câu ví dụ được sinh tự động từ khoảng 10 khuôn mẫu quay vòng, nên có 3 lỗi lớn:

1. Sai ngữ nghĩa (vô lý):
   - "Keittiö maksaa noin kaksikymmentä euroa." → "The kitchen costs about twenty euros."
   - "Ostin olohuonen eilen kaupasta." → "I bought a living room from the shop yesterday."
   - "Voitko antaa minulle pihan, kiitos?" → "Could you give me the yard, please?"
2. Sai ngữ pháp/biến cách: `kotin`, `makuuhuonea`, `olohuonen`, `porrasn`, `seinäa`, `asuntosta` (đúng: `kodin`, `makuuhuonetta`, `olohuoneen`, `porrasta`, `seinää`, `asunnosta`).
3. Lặp mẫu: chỉ vài cấu trúc dùng lại hàng trăm lần ("Hän puhui X:sta pitkään", "Minulla ei ole X juuri nyt", "Yritin löytää X koko aamun"...).

Phần từ vựng của giáo trình YKI (`src/data/finnishCurriculum/vocabulary*.ts`) là nội dung viết tay và đã ổn - sẽ chỉ rà soát, không viết lại.

## Cách làm

Áp dụng đúng mô hình đã dùng thành công cho tiếng Thụy Điển (normalizer + overrides), thay vì sửa tay 2.867 dòng dữ liệu:

1. **Bộ sinh câu ví dụ mới, có ý nghĩa** - theo chủ đề (32 category) và từ loại (noun/verb/adjective/adverb...). Ví dụ:
   - Nhà ở: "Keittiössä on iso pöytä." / "Nukun makuuhuoneessa joka yö."
   - Đồ ăn: "Ostin leipää kaupasta tänään."
   - Động từ: "Minä luen kirjaa joka ilta."
   - Tính từ: "Tämä huone on todella siisti."
   Mỗi từ chọn mẫu theo hàm băm ổn định (deterministic) để câu không đổi giữa các lần tải, và để phân bố mẫu đều - không còn 300 câu giống nhau.

2. **Máy biến cách tiếng Phần Lan (đủ dùng cho A1-B1)**: xử lý inessive (-ssa/-ssä), elative (-sta/-stä), partitive, genitive theo quy tắc hòa âm nguyên âm (a/ä) và biến đổi phụ âm (k/p/t: katto → katon, porras → portaan). Chỉ dùng mẫu câu ở dạng mà bộ biến cách xử lý an toàn cho từng loại từ; từ nào không chắc sẽ dùng mẫu chỉ cần dạng nguyên (nominative) để không bao giờ sinh ra dạng sai.

3. **Danh sách override viết tay** cho các từ khó/ngoại lệ và các từ tần suất cao (khoảng 250-350 từ A1 hay gặp nhất: nhà ở, ăn uống, cơ thể, gia đình, thời gian, số, động từ cơ bản) - câu tự nhiên 100%, kèm bản dịch tiếng Anh đúng.

4. **Câu dịch tiếng Anh** được sinh song song với câu Phần Lan để nghĩa luôn khớp (hiện tại nhiều cặp lệch nghĩa).

5. **Bộ kiểm tra tự động (audit script)**: quét toàn bộ 2.867 từ và báo lỗi nếu (a) một mẫu dùng quá N lần, (b) câu không chứa từ đang học, (c) tồn tại dạng biến cách trong danh sách nghi vấn, (d) câu Phần Lan và tiếng Anh không cùng cấu trúc. Chạy đến khi sạch.

## Chi tiết kỹ thuật

- Tệp mới: `src/data/finnishExampleNormalizer.ts` (bộ sinh + biến cách), `src/data/finnishExampleOverrides.ts` (câu viết tay), `src/lib/finnishMorphology.ts` (biến cách + hòa âm nguyên âm).
- `src/data/finnishVocabData.ts`: giữ nguyên dữ liệu thô, bọc export cuối cùng qua normalizer (`export const finnishVocabData = RAW.map(normalizeFinnishExample)`) - giống cách Swedish đang làm, nên các trang dùng dữ liệu này (`FinnishVocabulary.tsx`, flashcards, luyện gõ/nói, SRS) tự nhận nội dung mới.
- Script kiểm tra: `scripts/audit_finnish_examples.mjs`.
- Không đổi UI, không đổi schema, không ảnh hưởng giáo trình YKI hay Speaking Coach.

## Kết quả mong đợi

Mọi câu ví dụ trong mục từ vựng tiếng Phần Lan rõ nghĩa, đúng biến cách, đa dạng cấu trúc, và câu dịch tiếng Anh khớp nghĩa.
