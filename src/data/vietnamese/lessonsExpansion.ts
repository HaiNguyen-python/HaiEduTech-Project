import type { VietnameseModule } from "./types";

export const vietnameseLessonsExpansionModules: VietnameseModule[] = [
  {
    id: "vn-adv-reading",
    title: "Đọc hiểu nâng cao",
    titleEn: "Advanced Reading",
    icon: "📖",
    color: "from-blue-500 to-blue-700",
    category: "reading",
    description: "Báo chí và văn học hiện đại Việt Nam",
    descriptionEn: "Vietnamese journalism and modern literature",
    lessons: [
      {
        id: "vn-adv-journalism",
        title: "Đọc báo tiếng Việt",
        titleEn: "Reading Vietnamese News",
        level: "advanced",
        theory: `# Đọc báo tiếng Việt

## Cấu trúc bài báo
1. **Tít bài (Headline)**: Ngắn gọn, gây chú ý
2. **Sapo (Lead)**: Tóm tắt nội dung chính
3. **Thân bài**: Chi tiết, trích dẫn, số liệu
4. **Kết bài**: Nhận xét, đánh giá

## Thể loại báo chí
- **Tin tức**: Sự kiện thời sự
- **Phóng sự**: Điều tra, phản ánh
- **Bình luận**: Quan điểm, phân tích
- **Phỏng vấn**: Hỏi đáp với nhân vật

## Từ vựng báo chí thường gặp
- "Theo nguồn tin..." — According to sources...
- "Sự kiện diễn ra..." — The event took place...
- "Hậu quả nghiêm trọng..." — Serious consequences...`,
        theoryEn: `# Reading Vietnamese News
Article structure: headline, lead, body, conclusion.
Types: news, reportage, commentary, interview.`,
        vocabulary: [
          { word: "phóng sự", meaning: "reportage", meaningEn: "reportage", example: "Đài truyền hình phát phóng sự về biến đổi khí hậu.", exampleEn: "Đài truyền hình phát phóng sự về biến đổi khí hậu." },
          { word: "bình luận", meaning: "commentary", meaningEn: "commentary", example: "Bài bình luận phân tích tình hình kinh tế.", exampleEn: "Bài bình luận phân tích tình hình kinh tế." },
          { word: "trích dẫn", meaning: "quotation", meaningEn: "quotation", example: "Bài báo trích dẫn lời chuyên gia.", exampleEn: "Bài báo trích dẫn lời chuyên gia." },
          { word: "thời sự", meaning: "current affairs", meaningEn: "current affairs", example: "Bản tin thời sự lúc 19h.", exampleEn: "Bản tin thời sự lúc 19h." },
        ],
        quiz: [
          { question: "'Sapo' trong báo chí Việt Nam là gì?", questionEn: "'Sapo' trong báo chí Việt Nam là gì?", options: ["Tiêu đề bài báo", "Phần tóm tắt ở đầu bài", "Kết luận", "Chú thích ảnh"], answer: 1, explanation: "Sapo (lead) là phần tóm tắt nội dung chính ở đầu bài.", explanationEn: "Sapo (lead) là phần tóm tắt nội dung chính ở đầu bài." },
          { question: "'Phóng sự' là thể loại:", questionEn: "'Phóng sự' là thể loại:", options: ["Tin ngắn", "Điều tra, phản ánh sâu", "Quảng cáo", "Thơ văn"], answer: 1, explanation: "Phóng sự là thể loại báo chí điều tra, phản ánh sâu về một vấn đề.", explanationEn: "Phóng sự là thể loại báo chí điều tra, phản ánh sâu về một vấn đề." },
        ],
      },
      {
        id: "vn-adv-literature",
        title: "Văn học hiện đại Việt Nam",
        titleEn: "Modern Vietnamese Literature",
        level: "advanced",
        theory: `# Văn học hiện đại Việt Nam

## Các tác giả tiêu biểu
- **Nam Cao** (1915-1951): "Chí Phèo", "Lão Hạc" — hiện thực phê phán
- **Nguyễn Du** (1766-1820): "Truyện Kiều" — kiệt tác văn học
- **Xuân Diệu** (1916-1985): "Vội vàng" — thơ lãng mạn
- **Tố Hữu** (1920-2002): Thơ cách mạng

## Các trào lưu văn học
1. **Văn học trung đại**: Thơ chữ Hán, chữ Nôm
2. **Văn học hiện thực phê phán** (1930-1945)
3. **Văn học cách mạng** (1945-1975)
4. **Văn học đổi mới** (1986-nay)

## Phân tích tác phẩm
- Chủ đề: Tác phẩm nói về điều gì?
- Nhân vật: Tính cách, số phận
- Nghệ thuật: Biện pháp tu từ, ngôn ngữ`,
        theoryEn: `# Modern Vietnamese Literature
Key authors: Nam Cao, Nguyễn Du, Xuân Diệu.
Literary periods: medieval, critical realism, revolutionary, renovation (đổi mới).`,
        vocabulary: [
          { word: "hiện thực phê phán", meaning: "critical realism", meaningEn: "critical realism", example: "Nam Cao là đại diện của trào lưu hiện thực phê phán.", exampleEn: "Nam Cao là đại diện của trào lưu hiện thực phê phán." },
          { word: "kiệt tác", meaning: "masterpiece", meaningEn: "masterpiece", example: "Truyện Kiều là kiệt tác văn học Việt Nam.", exampleEn: "Truyện Kiều là kiệt tác văn học Việt Nam." },
          { word: "biện pháp tu từ", meaning: "rhetorical device", meaningEn: "rhetorical device", example: "Thơ sử dụng nhiều biện pháp tu từ.", exampleEn: "Thơ sử dụng nhiều biện pháp tu từ." },
          { word: "trào lưu", meaning: "literary movement", meaningEn: "literary movement", example: "Thơ Mới là một trào lưu văn học lớn.", exampleEn: "Thơ Mới là một trào lưu văn học lớn." },
        ],
        quiz: [
          { question: "Tác giả của 'Truyện Kiều' là ai?", questionEn: "Tác giả của 'Truyện Kiều' là ai?", options: ["Nam Cao", "Nguyễn Du", "Xuân Diệu", "Tố Hữu"], answer: 1, explanation: "Nguyễn Du (1766-1820) là tác giả của kiệt tác Truyện Kiều.", explanationEn: "Nguyễn Du (1766-1820) là tác giả của kiệt tác Truyện Kiều." },
          { question: "'Đổi mới' trong văn học bắt đầu từ năm nào?", questionEn: "'Đổi mới' trong văn học bắt đầu từ năm nào?", options: ["1945", "1975", "1986", "2000"], answer: 2, explanation: "Văn học đổi mới bắt đầu từ năm 1986 cùng với chính sách đổi mới kinh tế.", explanationEn: "Văn học đổi mới bắt đầu từ năm 1986 cùng với chính sách đổi mới kinh tế." },
        ],
      },
    ],
  },
  {
    id: "vn-adv-grammar",
    title: "Ngữ pháp nâng cao",
    titleEn: "Advanced Grammar",
    icon: "✍️",
    color: "from-purple-500 to-purple-700",
    category: "grammar",
    description: "Câu phức và văn phong học thuật",
    descriptionEn: "Complex sentences and academic style",
    lessons: [
      {
        id: "vn-adv-complex-sent",
        title: "Câu phức trong tiếng Việt",
        titleEn: "Complex Sentences in Vietnamese",
        level: "advanced",
        theory: `# Câu phức trong tiếng Việt

## 1. Câu ghép đẳng lập
Nối bằng: **và, hoặc, nhưng, còn, hay**
- "Anh ấy giỏi **và** chăm chỉ."
- "Trời mưa **nhưng** tôi vẫn đi."

## 2. Câu ghép chính phụ

### Nguyên nhân - kết quả
- **Vì...nên...**: "Vì trời mưa nên tôi ở nhà."
- **Do...nên...**: "Do thiếu kinh nghiệm nên anh ấy gặp khó khăn."

### Điều kiện
- **Nếu...thì...**: "Nếu cố gắng thì sẽ thành công."
- **Miễn là...**: "Miễn là bạn đồng ý, tôi sẽ làm."

### Nhượng bộ
- **Mặc dù...nhưng...**: "Mặc dù khó nhưng tôi không bỏ cuộc."
- **Dù...vẫn...**: "Dù mệt, anh ấy vẫn làm việc."

### Mục đích
- **Để...**: "Tôi học chăm để thi đỗ."`,
        theoryEn: `# Complex Sentences in Vietnamese
1. Coordinating: và (and), nhưng (but), hoặc (or)
2. Subordinating: vì...nên (because...so), nếu...thì (if...then), mặc dù...nhưng (although...but)`,
        vocabulary: [
          { word: "đẳng lập", meaning: "coordinating", meaningEn: "coordinating", example: "Câu ghép đẳng lập nối bằng 'và', 'nhưng'.", exampleEn: "Câu ghép đẳng lập nối bằng 'và', 'nhưng'." },
          { word: "chính phụ", meaning: "subordinating", meaningEn: "subordinating", example: "Câu ghép chính phụ có vế chính và vế phụ.", exampleEn: "Câu ghép chính phụ có vế chính và vế phụ." },
          { word: "nhượng bộ", meaning: "concession", meaningEn: "concession", example: "'Mặc dù...nhưng' là cặp từ nhượng bộ.", exampleEn: "'Mặc dù...nhưng' là cặp từ nhượng bộ." },
        ],
        quiz: [
          { question: "'Vì trời mưa nên tôi ở nhà' là câu ghép:", questionEn: "'Vì trời mưa nên tôi ở nhà' là câu ghép:", options: ["Đẳng lập", "Chính phụ (nguyên nhân-kết quả)", "Câu đơn", "Câu hỏi"], answer: 1, explanation: "Đây là câu ghép chính phụ với quan hệ nguyên nhân (vì) - kết quả (nên).", explanationEn: "Đây là câu ghép chính phụ với quan hệ nguyên nhân (vì) - kết quả (nên)." },
          { question: "Cặp từ nào biểu thị quan hệ nhượng bộ?", questionEn: "Cặp từ nào biểu thị quan hệ nhượng bộ?", options: ["Vì...nên", "Nếu...thì", "Mặc dù...nhưng", "Để..."], answer: 2, explanation: "'Mặc dù...nhưng' biểu thị quan hệ nhượng bộ.", explanationEn: "'Mặc dù...nhưng' biểu thị quan hệ nhượng bộ." },
        ],
      },
      {
        id: "vn-adv-academic",
        title: "Văn phong học thuật",
        titleEn: "Academic Writing Style",
        level: "advanced",
        theory: `# Văn phong học thuật

## Đặc điểm
- Khách quan, logic, chính xác
- Tránh dùng ngôi thứ nhất (tôi) → dùng "tác giả", "nghiên cứu này"
- Dùng từ Hán-Việt nhiều hơn

## So sánh: Văn nói vs Văn viết học thuật
| Văn nói | Văn viết |
|---------|----------|
| nói | trình bày |
| dùng | sử dụng |
| cho thấy | chứng minh |
| vì | do, bởi |
| rất nhiều | đa số, phần lớn |

## Cấu trúc bài nghiên cứu
1. **Đặt vấn đề**: Giới thiệu chủ đề
2. **Cơ sở lý luận**: Tổng quan nghiên cứu
3. **Phương pháp**: Cách thực hiện
4. **Kết quả**: Phát hiện
5. **Kết luận**: Tóm tắt, kiến nghị`,
        theoryEn: `# Academic Writing Style
Characteristics: objective, logical, precise. Use formal vocabulary. Research paper structure: introduction, literature review, methodology, results, conclusion.`,
        vocabulary: [
          { word: "trình bày", meaning: "to present/state", meaningEn: "to present/state", example: "Bài viết trình bày kết quả nghiên cứu.", exampleEn: "Bài viết trình bày kết quả nghiên cứu." },
          { word: "chứng minh", meaning: "to prove/demonstrate", meaningEn: "to prove/demonstrate", example: "Số liệu chứng minh giả thuyết đúng.", exampleEn: "Số liệu chứng minh giả thuyết đúng." },
          { word: "kiến nghị", meaning: "recommendation", meaningEn: "recommendation", example: "Tác giả đưa ra kiến nghị cải thiện.", exampleEn: "Tác giả đưa ra kiến nghị cải thiện." },
          { word: "phương pháp", meaning: "methodology", meaningEn: "methodology", example: "Phương pháp nghiên cứu là khảo sát.", exampleEn: "Phương pháp nghiên cứu là khảo sát." },
        ],
        quiz: [
          { question: "Trong văn học thuật, thay vì 'nói' ta dùng:", questionEn: "Trong văn học thuật, thay vì 'nói' ta dùng:", options: ["Kể", "Trình bày", "Nói chuyện", "Tán gẫu"], answer: 1, explanation: "'Trình bày' là từ trang trọng hơn 'nói' trong văn học thuật.", explanationEn: "'Trình bày' là từ trang trọng hơn 'nói' trong văn học thuật." },
          { question: "Văn phong học thuật cần đặc điểm gì nhất?", questionEn: "Văn phong học thuật cần đặc điểm gì nhất?", options: ["Cảm xúc mạnh mẽ", "Khách quan và logic", "Ngôn ngữ hoa mỹ", "Dùng nhiều tiếng lóng"], answer: 1, explanation: "Văn phong học thuật yêu cầu tính khách quan và logic.", explanationEn: "Văn phong học thuật yêu cầu tính khách quan và logic." },
        ],
      },
    ],
  },
  {
    id: "vn-culture-expanded",
    title: "Văn hóa Việt Nam",
    titleEn: "Vietnamese Culture",
    icon: "🎎",
    color: "from-red-500 to-red-700",
    category: "folklore",
    description: "Lễ hội truyền thống và ẩm thực vùng miền",
    descriptionEn: "Traditional festivals and regional cuisine",
    lessons: [
      {
        id: "vn-culture-festivals",
        title: "Lễ hội truyền thống",
        titleEn: "Traditional Festivals",
        level: "intermediate",
        theory: `# Lễ hội truyền thống Việt Nam

## Tết Nguyên Đán (Lunar New Year)
- Lễ hội lớn nhất năm
- Thời gian: Tháng 1 âm lịch
- Phong tục: Chúc Tết, lì xì, cúng ông bà, ăn bánh chưng
- Hoa: Mai (miền Nam), Đào (miền Bắc)

## Tết Trung Thu (Mid-Autumn Festival)
- Ngày 15 tháng 8 âm lịch
- Dành cho trẻ em: rước đèn, phá cỗ
- Bánh trung thu, đèn lồng

## Lễ Vu Lan (Gratitude Festival)
- Ngày 15 tháng 7 âm lịch
- Tưởng nhớ cha mẹ, ông bà
- Cài hoa hồng: đỏ (còn mẹ), trắng (mất mẹ)

## Giỗ Tổ Hùng Vương
- Ngày 10 tháng 3 âm lịch
- Tưởng nhớ các Vua Hùng — tổ tiên dân tộc
- "Dù ai đi ngược về xuôi, nhớ ngày Giỗ Tổ mồng Mười tháng Ba"`,
        theoryEn: `# Traditional Vietnamese Festivals
Major festivals: Tết (Lunar New Year), Mid-Autumn, Vu Lan (Gratitude), Hùng King Anniversary.`,
        vocabulary: [
          { word: "lì xì", meaning: "lucky money envelope", meaningEn: "lucky money envelope", example: "Trẻ em nhận lì xì vào dịp Tết.", exampleEn: "Trẻ em nhận lì xì vào dịp Tết." },
          { word: "rước đèn", meaning: "lantern procession", meaningEn: "lantern procession", example: "Trẻ em rước đèn đêm Trung Thu.", exampleEn: "Trẻ em rước đèn đêm Trung Thu." },
          { word: "phong tục", meaning: "custom/tradition", meaningEn: "custom/tradition", example: "Phong tục cúng ông bà rất quan trọng.", exampleEn: "Phong tục cúng ông bà rất quan trọng." },
          { word: "tổ tiên", meaning: "ancestors", meaningEn: "ancestors", example: "Người Việt luôn nhớ ơn tổ tiên.", exampleEn: "Người Việt luôn nhớ ơn tổ tiên." },
        ],
        quiz: [
          { question: "Hoa đặc trưng ngày Tết ở miền Bắc là gì?", questionEn: "Hoa đặc trưng ngày Tết ở miền Bắc là gì?", options: ["Hoa mai", "Hoa đào", "Hoa sen", "Hoa cúc"], answer: 1, explanation: "Hoa đào là biểu tượng Tết ở miền Bắc, hoa mai ở miền Nam.", explanationEn: "Hoa đào là biểu tượng Tết ở miền Bắc, hoa mai ở miền Nam." },
          { question: "Tết Trung Thu chủ yếu dành cho ai?", questionEn: "Tết Trung Thu chủ yếu dành cho ai?", options: ["Người già", "Trẻ em", "Phụ nữ", "Thanh niên"], answer: 1, explanation: "Tết Trung Thu là lễ hội dành cho trẻ em.", explanationEn: "Tết Trung Thu là lễ hội dành cho trẻ em." },
        ],
      },
      {
        id: "vn-culture-cuisine",
        title: "Ẩm thực vùng miền",
        titleEn: "Regional Cuisine",
        level: "intermediate",
        theory: `# Ẩm thực vùng miền Việt Nam

## Miền Bắc
- **Phở Hà Nội**: Nước dùng trong, thịt bò/gà
- **Bún chả**: Chả nướng ăn kèm bún
- **Bánh cuốn**: Bánh tráng mỏng nhân thịt
- Đặc điểm: Thanh đạm, ít cay

## Miền Trung
- **Bún bò Huế**: Cay, đậm đà
- **Mì Quảng**: Nước ít, nhiều rau
- **Bánh xèo miền Trung**: Giòn, nhỏ
- Đặc điểm: Cay, đậm đà, nhiều gia vị

## Miền Nam
- **Hủ tiếu Nam Vang**: Nước dùng ngọt
- **Cơm tấm**: Cơm gạo tấm với sườn nướng
- **Bánh mì Sài Gòn**: Nhân phong phú
- Đặc điểm: Ngọt, nhiều dừa, nhiều rau sống`,
        theoryEn: `# Regional Vietnamese Cuisine
North: subtle flavors (phở, bún chả). Central: spicy, bold (bún bò Huế). South: sweet, coconut-rich (cơm tấm, hủ tiếu).`,
        vocabulary: [
          { word: "thanh đạm", meaning: "light/subtle (taste)", meaningEn: "light/subtle (taste)", example: "Ẩm thực miền Bắc thanh đạm.", exampleEn: "Ẩm thực miền Bắc thanh đạm." },
          { word: "đậm đà", meaning: "rich/bold (flavor)", meaningEn: "rich/bold (flavor)", example: "Bún bò Huế có vị đậm đà.", exampleEn: "Bún bò Huế có vị đậm đà." },
          { word: "gia vị", meaning: "spices/seasonings", meaningEn: "spices/seasonings", example: "Món ăn miền Trung nhiều gia vị.", exampleEn: "Món ăn miền Trung nhiều gia vị." },
          { word: "đặc sản", meaning: "specialty/delicacy", meaningEn: "specialty/delicacy", example: "Phở là đặc sản Hà Nội.", exampleEn: "Phở là đặc sản Hà Nội." },
        ],
        quiz: [
          { question: "Đặc điểm ẩm thực miền Trung là:", questionEn: "Đặc điểm ẩm thực miền Trung là:", options: ["Thanh đạm", "Ngọt", "Cay và đậm đà", "Nhiều dừa"], answer: 2, explanation: "Ẩm thực miền Trung nổi tiếng với vị cay và đậm đà.", explanationEn: "Ẩm thực miền Trung nổi tiếng với vị cay và đậm đà." },
          { question: "Bún bò Huế là đặc sản vùng nào?", questionEn: "Bún bò Huế là đặc sản vùng nào?", options: ["Miền Bắc", "Miền Trung", "Miền Nam", "Tây Nguyên"], answer: 1, explanation: "Bún bò Huế là đặc sản của Huế, thuộc miền Trung.", explanationEn: "Bún bò Huế là đặc sản của Huế, thuộc miền Trung." },
        ],
      },
    ],
  },
];
