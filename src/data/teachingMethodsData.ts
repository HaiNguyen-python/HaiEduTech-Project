// Teaching Methods Library - curated pedagogical frameworks for HaiEduTech subjects
export interface TeachingMethod {
  id: string;
  name: string;
  acronym?: string;
  category: "language" | "programming" | "universal";
  subjects: string[];
  quickRead: string;
  description: string;
  steps: string[];
  bestFor: string[];
  references?: string;
}

export const TEACHING_METHODS: TeachingMethod[] = [
  {
    id: "clt",
    name: "Communicative Language Teaching",
    acronym: "CLT",
    category: "language",
    subjects: ["English", "Chinese", "Finnish"],
    quickRead: "Học ngôn ngữ qua giao tiếp thực tế thay vì học thuộc ngữ pháp khô khan.",
    description:
      "CLT đặt người học vào các tình huống giao tiếp có ý nghĩa. Giáo viên đóng vai trò người hướng dẫn (facilitator), tạo cơ hội cho học sinh sử dụng ngôn ngữ để hoàn thành nhiệm vụ thực tế (đặt món, hỏi đường, phỏng vấn xin việc).",
    steps: [
      "Warm-up: Đặt câu hỏi mở liên quan chủ đề (3-5 phút)",
      "Input: Nghe/đọc đoạn hội thoại mẫu",
      "Practice: Role-play theo cặp với tình huống cụ thể",
      "Production: Tự tạo đoạn hội thoại mới và trình bày",
      "Feedback: Sửa lỗi delayed correction sau khi hoạt động kết thúc",
    ],
    bestFor: ["Speaking", "Real-life fluency", "Adult learners", "IELTS Speaking", "TOEIC Speaking"],
  },
  {
    id: "tbl",
    name: "Task-Based Learning",
    acronym: "TBL",
    category: "language",
    subjects: ["English", "Chinese", "Finnish"],
    quickRead: "Học sinh hoàn thành nhiệm vụ cụ thể; ngôn ngữ là công cụ, không phải mục tiêu.",
    description:
      "Học sinh nhận một task có kết quả rõ ràng (lập kế hoạch chuyến đi, thiết kế poster, giải đố). Ngữ pháp và từ vựng nảy sinh tự nhiên trong quá trình thực hiện. Kết thúc bằng review ngôn ngữ.",
    steps: [
      "Pre-task: Giới thiệu task + brainstorm từ vựng cần thiết",
      "Task cycle: Học sinh làm theo nhóm 3-4 người",
      "Planning: Chuẩn bị báo cáo kết quả",
      "Report: Trình bày trước lớp",
      "Language focus: Phân tích lỗi và cấu trúc nổi bật",
    ],
    bestFor: ["B1-C1 levels", "Project work", "Group dynamics", "Critical thinking"],
  },
  {
    id: "flipped",
    name: "Flipped Classroom",
    category: "universal",
    subjects: ["English", "Chinese", "Finnish", "Programming"],
    quickRead: "Học lý thuyết ở nhà qua video; vào lớp để thực hành và giải đáp.",
    description:
      "Đảo ngược mô hình truyền thống: bài giảng video xem trước, thời gian lớp dành cho discussion, exercise, và Q&A sâu. Tăng engagement và personalization.",
    steps: [
      "Pre-class: Gửi video 8-12 phút + quiz nhanh",
      "Check-in: Khảo sát hiểu biết đầu giờ (2 phút)",
      "Apply: Bài tập ứng dụng theo cặp/nhóm",
      "Deep dive: Thầy giải đáp các điểm khó",
      "Wrap-up: Exit ticket - 1 điều học được, 1 điều còn thắc mắc",
    ],
    bestFor: ["Mature learners", "Self-paced study", "Hybrid courses", "Programming"],
  },
  {
    id: "tpr",
    name: "Total Physical Response",
    acronym: "TPR",
    category: "language",
    subjects: ["English", "Chinese", "Finnish"],
    quickRead: "Liên kết từ vựng với hành động cơ thể để ghi nhớ sâu (đặc biệt cho A1-A2).",
    description:
      "Giáo viên ra lệnh, học sinh thực hiện hành động (Stand up! Touch your nose! Avaa kirja!). Não bộ liên kết từ vựng với chuyển động → ghi nhớ vượt trội so với học vẹt.",
    steps: [
      "Modeling: Thầy ra lệnh + tự thực hiện",
      "Group response: Cả lớp làm theo",
      "Individual: Gọi từng học sinh",
      "Reverse: Học sinh ra lệnh, thầy thực hiện",
      "Story TPR: Kể chuyện ngắn, lớp diễn theo",
    ],
    bestFor: ["A1-A2 learners", "Children", "Vocabulary retention", "Finnish A1 (YKI)"],
  },
  {
    id: "pbl",
    name: "Project-Based Learning",
    acronym: "PBL",
    category: "programming",
    subjects: ["Programming", "Data Engineering", "AI/ML"],
    quickRead: "Học qua dự án thực tế kéo dài 2-4 tuần với deliverable rõ ràng.",
    description:
      "Học sinh xây dựng sản phẩm thật (website, chatbot, data pipeline) từ đầu đến cuối. Học các khái niệm khi gặp vấn đề thực tế thay vì học theo syllabus tuần tự.",
    steps: [
      "Driving question: Đặt câu hỏi mở (Build a study app for HSK learners)",
      "Plan: Phân tích yêu cầu + chọn tech stack",
      "Sprint 1: MVP cơ bản (1 tuần)",
      "Iteration: Thêm features + refactor",
      "Demo day: Trình bày + peer review",
    ],
    bestFor: ["Intermediate+ coders", "Portfolio building", "Real-world skills"],
  },
  {
    id: "pair-programming",
    name: "Pair Programming",
    category: "programming",
    subjects: ["Programming"],
    quickRead: "Hai học sinh cùng code: một Driver gõ phím, một Navigator chỉ đạo chiến lược.",
    description:
      "Hai bộ não cùng giải quyết một bài toán. Driver tập trung syntax, Navigator nhìn big picture. Đổi vai mỗi 15-20 phút. Giảm bug, tăng tư duy thuật toán.",
    steps: [
      "Pair up: Ghép cặp theo trình độ tương đương",
      "Define roles: Ai Driver, ai Navigator",
      "Code: Bắt đầu với rõ ràng requirement",
      "Switch: Đổi vai sau 15 phút (timer)",
      "Reflect: 5 phút thảo luận điều học được",
    ],
    bestFor: ["Beginner-intermediate", "Debugging skills", "Code review habits"],
  },
  {
    id: "computational-thinking",
    name: "Computational Thinking",
    category: "programming",
    subjects: ["Programming"],
    quickRead: "Dạy 4 trụ cột tư duy lập trình: Phân rã, Mẫu, Trừu tượng, Thuật toán.",
    description:
      "Trước khi gõ code, học sinh học cách: (1) Decomposition - chia nhỏ vấn đề, (2) Pattern recognition - tìm điểm chung, (3) Abstraction - bỏ chi tiết không cần thiết, (4) Algorithm design - viết các bước tuần tự.",
    steps: [
      "Real-world problem: Đưa bài toán đời thực (đặt pizza nhanh nhất)",
      "Decompose: Vẽ sơ đồ các bước con",
      "Pattern hunt: Tìm các bước lặp lại",
      "Abstract: Bỏ thông tin thừa",
      "Pseudo-code: Viết thuật toán bằng tiếng Việt trước khi code",
    ],
    bestFor: ["Absolute beginners", "Children 10+", "Logic foundation"],
  },
  {
    id: "5e-model",
    name: "5E Instructional Model",
    acronym: "5E",
    category: "universal",
    subjects: ["English", "Chinese", "Finnish", "Programming"],
    quickRead: "Khung bài giảng 5 giai đoạn: Engage, Explore, Explain, Elaborate, Evaluate.",
    description:
      "Mô hình constructivist cổ điển. Engage gây tò mò, Explore cho học sinh tự khám phá, Explain trình bày khái niệm, Elaborate ứng dụng tình huống mới, Evaluate đo lường hiểu biết.",
    steps: [
      "Engage (5 phút): Câu hỏi gây sốc, video hook",
      "Explore (15 phút): Hoạt động khám phá theo nhóm",
      "Explain (10 phút): Thầy chốt khái niệm + ví dụ",
      "Elaborate (15 phút): Bài tập ứng dụng nâng cao",
      "Evaluate (5 phút): Quiz nhanh, exit ticket",
    ],
    bestFor: ["Any subject", "50-minute classes", "Concept introduction"],
  },
];

export const PEDAGOGY_FRAMEWORKS = [
  { name: "Bloom's Taxonomy", levels: ["Remember", "Understand", "Apply", "Analyze", "Evaluate", "Create"] },
  { name: "Vygotsky's ZPD", description: "Dạy ngay vùng học sinh sắp đạt được với scaffolding." },
  { name: "Growth Mindset (Dweck)", description: "Khen quá trình thay vì tài năng bẩm sinh." },
  { name: "Cognitive Load Theory", description: "Giảm tải nhận thức không cần thiết, tăng tải tư duy hiệu quả." },
  { name: "Active Learning", description: "Học sinh chủ động làm > nghe thụ động." },
];
