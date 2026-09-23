/**
 * @file dictationExpansion.ts
 * @description Bổ sung 10 câu cho mỗi mức nghe chép chính tả (dễ, trung bình, khó).
 */
export const dictationExtraSentences: Record<string, { text: string; hint?: string }[]> = {
  easy: [
    { text: "Em ăn cơm chưa?", hint: "Hỏi thăm" },
    { text: "Bố tôi đọc báo buổi sáng.", hint: "Gia đình" },
    { text: "Trời hôm nay hơi lạnh.", hint: "Thời tiết" },
    { text: "Tôi uống một ly nước cam.", hint: "Đồ uống" },
    { text: "Chị ấy làm ở bệnh viện.", hint: "Nghề nghiệp" },
    { text: "Chúng tôi đi chợ mỗi sáng.", hint: "Sinh hoạt" },
    { text: "Nhà tôi ở gần công viên.", hint: "Nơi ở" },
    { text: "Con chó chạy ra ngoài sân.", hint: "Động vật" },
    { text: "Tôi học tiếng Việt ba tháng rồi.", hint: "Học tập" },
    { text: "Xin lỗi, tôi đến muộn.", hint: "Xin lỗi" },
  ],
  medium: [
    { text: "Cuối tuần này gia đình tôi sẽ về quê thăm bà.", hint: "Gia đình" },
    { text: "Anh vui lòng gửi cho tôi hoá đơn qua thư điện tử.", hint: "Công việc" },
    { text: "Đường phố Hà Nội rất đông vào giờ cao điểm.", hint: "Giao thông" },
    { text: "Tôi muốn đổi phòng vì phòng này khá ồn.", hint: "Khách sạn" },
    { text: "Bác sĩ nói tôi nên uống nhiều nước và nghỉ ngơi.", hint: "Sức khoẻ" },
    { text: "Chúng ta nên đặt vé máy bay sớm để giá rẻ hơn.", hint: "Du lịch" },
    { text: "Món bún chả này vừa thơm vừa không quá mặn.", hint: "Ẩm thực" },
    { text: "Tháng sau tôi chuyển sang làm việc ở chi nhánh Đà Nẵng.", hint: "Công việc" },
    { text: "Trước khi mua, bạn hãy so sánh giá ở vài cửa hàng.", hint: "Mua sắm" },
    { text: "Hôm qua mưa lớn nên buổi họp bị hoãn lại.", hint: "Thời tiết" },
  ],
  hard: [
    { text: "Ca trù là loại hình nghệ thuật kết hợp thơ ca và âm nhạc truyền thống.", hint: "Nghệ thuật" },
    { text: "Việt Nam là một trong những nước xuất khẩu cà phê lớn nhất thế giới.", hint: "Kinh tế" },
    { text: "Hội An được công nhận là di sản văn hoá thế giới vào năm 1999.", hint: "Di sản" },
    { text: "Tranh Đông Hồ được in trên giấy dó bằng những bản khắc gỗ.", hint: "Mỹ thuật" },
    { text: "Chợ nổi ở miền Tây phản ánh đời sống gắn bó với sông nước.", hint: "Vùng miền" },
    { text: "Nghề dệt lụa ở Vạn Phúc đã tồn tại hơn một nghìn năm.", hint: "Làng nghề" },
    { text: "Cải lương ra đời ở Nam Bộ đầu thế kỷ hai mươi.", hint: "Sân khấu" },
    { text: "Việc bảo tồn tiếng nói của các dân tộc thiểu số là nhiệm vụ cấp thiết.", hint: "Ngôn ngữ" },
    { text: "Ruộng bậc thang Mù Cang Chải trở nên rực rỡ vào mùa lúa chín.", hint: "Thiên nhiên" },
    { text: "Chữ Quốc ngữ giúp việc học đọc và viết trở nên dễ dàng hơn nhiều.", hint: "Lịch sử" },
  ],
};
