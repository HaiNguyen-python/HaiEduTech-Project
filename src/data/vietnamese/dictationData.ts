// Vietnamese Dictation Data - sentences for listening & writing practice

export interface DictationLevel {
  id: string;
  label: string;
  labelEn: string;
  icon: string;
  sentences: { text: string; hint?: string }[];
}

export const dictationLevels: DictationLevel[] = [
  {
    id: "easy",
    label: "Dễ",
    labelEn: "Easy",
    icon: "🌱",
    sentences: [
      { text: "Xin chào, tôi tên là Hải.", hint: "Câu chào hỏi" },
      { text: "Hôm nay trời đẹp quá.", hint: "Thời tiết" },
      { text: "Tôi thích ăn phở bò.", hint: "Ẩm thực" },
      { text: "Bạn ơi, mấy giờ rồi?", hint: "Hỏi giờ" },
      { text: "Cảm ơn bạn rất nhiều.", hint: "Cảm ơn" },
      { text: "Mẹ tôi nấu ăn rất ngon.", hint: "Gia đình" },
      { text: "Tôi đi học mỗi ngày.", hint: "Trường học" },
      { text: "Con mèo nằm trên ghế.", hint: "Động vật" },
      { text: "Anh ấy là bạn tôi.", hint: "Giới thiệu" },
      { text: "Nước Việt Nam rất đẹp.", hint: "Đất nước" },
    ],
  },
  {
    id: "medium",
    label: "Trung bình",
    labelEn: "Medium",
    icon: "🌿",
    sentences: [
      { text: "Sáng nay tôi dậy sớm để tập thể dục.", hint: "Thói quen" },
      { text: "Hà Nội có nhiều di tích lịch sử nổi tiếng.", hint: "Du lịch" },
      { text: "Chúng tôi cùng nhau học tiếng Việt rất vui.", hint: "Học tập" },
      { text: "Mùa xuân ở Việt Nam có hoa mai và hoa đào.", hint: "Thiên nhiên" },
      { text: "Bà ngoại kể cho tôi nghe chuyện cổ tích.", hint: "Văn hóa" },
      { text: "Thầy giáo giảng bài rất dễ hiểu.", hint: "Trường học" },
      { text: "Buổi chiều chúng tôi đi dạo ở công viên.", hint: "Sinh hoạt" },
      { text: "Người Việt Nam rất hiếu khách và thân thiện.", hint: "Văn hóa" },
      { text: "Tôi muốn đi du lịch Đà Nẵng vào mùa hè.", hint: "Du lịch" },
      { text: "Ông nội tôi trồng rau trong vườn mỗi sáng.", hint: "Gia đình" },
    ],
  },
  {
    id: "hard",
    label: "Khó",
    labelEn: "Hard",
    icon: "🌳",
    sentences: [
      { text: "Truyện Kiều là tác phẩm văn học kinh điển của Nguyễn Du.", hint: "Văn học" },
      { text: "Nghệ thuật múa rối nước là di sản văn hóa phi vật thể của Việt Nam.", hint: "Nghệ thuật" },
      { text: "Phong tục cúng ông Công ông Táo diễn ra vào ngày hai mươi ba tháng Chạp.", hint: "Phong tục" },
      { text: "Chiến thắng Điện Biên Phủ năm 1954 đã kết thúc chín năm kháng chiến chống Pháp.", hint: "Lịch sử" },
      { text: "Áo dài là trang phục truyền thống thể hiện nét đẹp duyên dáng của phụ nữ Việt Nam.", hint: "Văn hóa" },
      { text: "Đồng bằng sông Cửu Long được mệnh danh là vựa lúa lớn nhất cả nước.", hint: "Địa lý" },
      { text: "Lễ hội chùa Hương thu hút hàng triệu du khách mỗi năm.", hint: "Lễ hội" },
      { text: "Tiếng Việt có sáu thanh điệu khiến nhiều người nước ngoài gặp khó khăn khi học.", hint: "Ngôn ngữ" },
      { text: "Nhà thơ Hồ Xuân Hương được mệnh danh là bà chúa thơ Nôm.", hint: "Văn học" },
      { text: "Kiến trúc chùa Một Cột mang hình dáng một bông sen nở trên mặt nước.", hint: "Kiến trúc" },
    ],
  },
];
