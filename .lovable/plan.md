
Mục tiêu
- Sửa lại riêng 3 chữ `ơ`, `ư`, `g` trong stroke guide để nhìn tự nhiên hơn, bám sát nét viết tay phổ thông, không còn cảm giác rời rạc hoặc méo form.

Phạm vi thay đổi
- File chính: `src/data/vietnamese/alphabetData.ts`
- Không đổi UI/component render, không đổi tốc độ animation ở bước này.

Cách triển khai
1. Sửa `ơ`
   - Vẽ lại nét móc để bắt đầu sát mép trên-phải của thân `o`, không còn “bay” ra ngoài.
   - Thu gọn độ cong của móc và đặt lại điểm neo để móc nhìn liền mạch với thân chữ.

2. Sửa `ư`
   - Giữ form `u` hiện có, nhưng dời nét móc bám sát đầu nét sổ phải.
   - Làm móc gọn, rõ, ngắn hơn và ôm sát thân chữ thay vì tách rời.

3. Sửa `g`
   - Không dùng bụng to kiểu oval chung như hiện tại.
   - Thu nhỏ bụng để chữ `g` rõ form hơn.
   - Vẽ lại nét thứ hai: đi xuống dưới baseline, lượn thành đuôi rồi đá ngược lên trên ở điểm kết thúc, tránh cảm giác bỏ lửng phía dưới.

4. Rà soát lại mô tả nét viết
   - Nếu cần, chỉnh nhẹ `strokeDescription` của `g` để khớp với nét kết thúc mới.

Chi tiết kỹ thuật
- Giữ nguyên hệ tọa độ `viewBox 0 0 40 70`.
- Chỉ sửa `strokePaths` cho 3 entry: `g`, `ơ`, `ư`.
- Các path mới sẽ bám theo các guide line hiện có:
  - x-height khoảng `y=24`
  - baseline khoảng `y=52`
  - descender không vượt quá vùng dưới `y=65`
- Ưu tiên form chữ viết tay 1 tầng, đặc biệt với `g`.

Kiểm tra sau khi sửa
- Mở `/learn-vietnamese/alphabet` và replay từng chữ `ơ`, `ư`, `g`.
- Xác nhận:
  1. nét móc của `ơ` và `ư` bám sát thân chữ;
  2. `g` có bụng nhỏ hơn, nhìn rõ là chữ `g`;
  3. nét cuối của `g` kết thúc hướng lên trên, không dừng lửng ở phía dưới;
  4. không có nét nào bị lệch khỏi khung hoặc chạm mép viewBox.
