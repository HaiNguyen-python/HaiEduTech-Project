/**
 * AI Academy — extra quiz banks per track.
 * Adds MultipleChoice + Scenario questions to complement the drag-drop quiz.
 * Keyed by TrackId. Used as "Luyện thêm" practice (no double star rewards).
 */
import type { MCQuestion } from "@/components/ai-academy/MultipleChoiceQuiz";
import type { ScenarioQuestion } from "@/components/ai-academy/ScenarioQuiz";

export type QuizExtra = {
  mc: MCQuestion[];
  scenario: ScenarioQuestion[];
};

export const QUIZ_EXTRAS: Record<string, QuizExtra> = {
  // ============== Bài 1 — Vision ==============
  vision: {
    mc: [
      {
        prompt: "Trong Computer Vision, 'bounding box' là gì?",
        options: [
          "Hộp đựng dữ liệu trong RAM",
          "Khung vuông AI vẽ quanh vật thể nó nhận ra",
          "Bộ lọc làm mờ ảnh",
          "Một loại camera đặc biệt",
        ],
        answer: 1,
        explanation: "Bounding box là khung chữ nhật bao quanh đối tượng được phát hiện, kèm nhãn và confidence score.",
      },
      {
        prompt: "Vì sao Tesla cần hàng triệu km dữ liệu đi đường thật?",
        options: [
          "Để quảng cáo cho mạnh",
          "Để model gặp đủ tình huống lạ (mưa, biển báo bẩn, người băng đường)",
          "Vì AI tốn pin",
          "Để tải bản đồ Google",
        ],
        answer: 1,
        explanation: "Model Vision chỉ giỏi khi training data đa dạng — kể cả những tình huống xấu và hiếm gặp.",
      },
    ],
    scenario: [
      {
        situation: "Trường bạn lắp camera FaceID điểm danh. Một bạn đeo khẩu trang đen kín, AI báo 'không nhận ra'.",
        prompt: "Bạn nên làm gì?",
        choices: [
          { label: "Yêu cầu bạn ấy bỏ khẩu trang giữa mùa cúm", verdict: "wrong", feedback: "Vi phạm sức khoẻ — không phải lỗi của học sinh." },
          { label: "Báo giáo viên ghi nhận thủ công, đề xuất thu thêm ảnh khẩu trang để train lại model", verdict: "good", feedback: "Đúng quy trình: con người là backup, dữ liệu mới giúp AI tốt hơn." },
          { label: "Coi như bạn ấy nghỉ học", verdict: "wrong", feedback: "Bất công và sai phạm — AI sai thì người chịu thiệt là học sinh." },
        ],
      },
    ],
  },

  // ============== Bài 2 — NLP ==============
  nlp: {
    mc: [
      {
        prompt: "Tokenization nghĩa là gì?",
        options: [
          "Mã hoá mật khẩu",
          "Cắt câu thành các đơn vị nhỏ (từ/ký tự) rồi gán ID số",
          "Dịch ngôn ngữ",
          "Nén file văn bản",
        ],
        answer: 1,
        explanation: "AI không hiểu chữ — phải biến chữ thành dãy số (token IDs) trước khi tính toán.",
      },
      {
        prompt: "Câu 'iu qá đi mà 🥺' khi đưa vào chatbot tiếng Việt nên xử lý thế nào?",
        options: [
          "Trả lời ngay bằng emoji",
          "Chuẩn hoá thành 'yêu quá đi mà' rồi mới phân tích intent",
          "Xoá toàn bộ emoji",
          "Báo lỗi 'không hiểu'",
        ],
        answer: 1,
        explanation: "Bước normalization (chuẩn hoá teen-code) là sống còn cho NLP tiếng Việt.",
      },
    ],
    scenario: [
      {
        situation: "Bạn xây chatbot cho shop quần áo. Khách nhắn: 'sale chưa shop ơi gửi link đi'.",
        prompt: "Chatbot nên phân loại intent này là gì?",
        choices: [
          { label: "Intent 'Chào hỏi'", verdict: "wrong", feedback: "Không có lời chào — đây là yêu cầu thông tin." },
          { label: "Intent 'Hỏi khuyến mãi' → trả về link landing page sale", verdict: "good", feedback: "Đúng — keyword 'sale' + 'link' rất rõ ý định." },
          { label: "Intent 'Phàn nàn'", verdict: "wrong", feedback: "Không có dấu hiệu tiêu cực." },
        ],
      },
    ],
  },

  // ============== Bài 3 — Neural Network ==============
  nn: {
    mc: [
      {
        prompt: "'Trọng số' (weight) trong neural network giống nhất với cái gì?",
        options: [
          "Cân nặng của máy chủ",
          "Độ quan trọng của mỗi đầu vào khi ra quyết định",
          "Tốc độ wifi",
          "Số lớp của mạng",
        ],
        answer: 1,
        explanation: "Weight quyết định mỗi tín hiệu đầu vào ảnh hưởng bao nhiêu đến đầu ra.",
      },
      {
        prompt: "Khi training, neural network 'học' bằng cách nào?",
        options: [
          "Tự nghĩ ra đáp án",
          "Điều chỉnh weight dần dần để giảm sai số (backpropagation)",
          "Tải đáp án từ internet",
          "Chờ người dạy gõ tay",
        ],
        answer: 1,
        explanation: "Mỗi lần dự đoán sai, model điều chỉnh weight một chút — lặp hàng triệu lần.",
      },
    ],
    scenario: [
      {
        situation: "Bạn train mô hình dự đoán giá nhà. Sau 100 epoch, accuracy 99% trên training set nhưng 60% trên dữ liệu mới.",
        prompt: "Hiện tượng này gọi là gì và làm sao?",
        choices: [
          { label: "Overfitting — cần thêm dữ liệu hoặc dùng regularization/dropout", verdict: "good", feedback: "Chính xác! Model học thuộc lòng training set thay vì hiểu quy luật." },
          { label: "Underfitting — train thêm 1000 epoch nữa", verdict: "wrong", feedback: "Ngược lại — train thêm chỉ khiến overfit nặng hơn." },
          { label: "Bình thường, deploy thôi", verdict: "wrong", feedback: "Gap 39% là dấu hiệu nguy hiểm — model sẽ thất bại ngoài đời thật." },
        ],
      },
    ],
  },

  // ============== Bài 4 — Generative AI ==============
  genai: {
    mc: [
      {
        prompt: "Vì sao ChatGPT đôi khi 'bịa' thông tin sai nhưng nghe rất tự tin?",
        options: [
          "Vì cố tình lừa",
          "Vì nó dự đoán từ tiếp theo dựa trên xác suất, không tra cứu sự thật",
          "Vì internet hỏng",
          "Vì tiếng Việt khó",
        ],
        answer: 1,
        explanation: "Đây gọi là 'hallucination' — model sinh chữ trôi chảy nhưng không có cơ chế kiểm chứng sự thật.",
      },
      {
        prompt: "Prompt engineering là gì?",
        options: [
          "Học lập trình C++",
          "Nghệ thuật viết câu lệnh đầu vào để LLM trả lời tốt hơn",
          "Sửa bug ChatGPT",
          "Tạo logo bằng AI",
        ],
        answer: 1,
        explanation: "Cùng một model, prompt khéo cho kết quả gấp nhiều lần prompt dở.",
      },
    ],
    scenario: [
      {
        situation: "Bạn nhờ ChatGPT viết bài văn về Nguyễn Du. Nó nói Nguyễn Du sinh năm 1820 (sai — thực ra 1765).",
        prompt: "Bạn nên làm gì?",
        choices: [
          { label: "Tin và nộp bài", verdict: "wrong", feedback: "Sẽ bị điểm kém — LLM có thể bịa năm sinh." },
          { label: "Đối chiếu với SGK / Wikipedia trước khi dùng", verdict: "good", feedback: "Đúng — luôn fact-check, đặc biệt với số liệu lịch sử." },
          { label: "Hỏi lại 5 lần đến khi nó nói cùng đáp án", verdict: "risky", feedback: "Model có thể 'tự tin' lặp lại cái sai — phải tra nguồn ngoài." },
        ],
      },
    ],
  },

  // ============== Bài 5 — Reinforcement Learning ==============
  rl: {
    mc: [
      {
        prompt: "Reinforcement Learning học bằng cái gì?",
        options: [
          "Sách giáo khoa",
          "Phần thưởng (reward) và hình phạt (penalty) sau mỗi hành động",
          "Hình ảnh có nhãn",
          "Bảng câu hỏi",
        ],
        answer: 1,
        explanation: "Agent thử-sai, mỗi hành động tốt được +điểm, hành động xấu bị -điểm — học từ trải nghiệm.",
      },
      {
        prompt: "AlphaGo (Google DeepMind) đánh bại nhà vô địch cờ Vây thế giới năm 2016 bằng kỹ thuật chính nào?",
        options: [
          "Học thuộc 100 ván của Lee Sedol",
          "Reinforcement Learning + self-play (tự đấu với chính mình hàng triệu ván)",
          "Hỏi Google",
          "Brute-force tính tất cả nước đi",
        ],
        answer: 1,
        explanation: "AlphaGo Zero tự chơi với chính nó 40 ngày, không cần dữ liệu con người.",
      },
    ],
    scenario: [
      {
        situation: "Bạn train AI chơi Mario. Bạn cho +1 điểm mỗi giây sống sót. Sau 1 tuần, AI chỉ đứng yên một chỗ.",
        prompt: "Vì sao và sửa thế nào?",
        choices: [
          { label: "Reward design sai — phải thêm +10 khi đi sang phải, +100 khi qua màn", verdict: "good", feedback: "Đúng! Đứng yên = sống sót lâu nhất theo cách bạn đặt reward. Phải thưởng đúng mục tiêu thật." },
          { label: "AI bị hỏng, cài lại", verdict: "wrong", feedback: "AI làm đúng theo reward bạn đặt — lỗi là ở thiết kế reward." },
          { label: "Tăng tốc độ máy tính", verdict: "wrong", feedback: "Không liên quan — vấn đề là logic, không phải hiệu năng." },
        ],
      },
    ],
  },

  // ============== Bài 6 — Ethics ==============
  ethics: {
    mc: [
      {
        prompt: "Bias trong AI thường đến từ đâu?",
        options: [
          "Phần cứng GPU",
          "Dữ liệu training thiếu cân bằng (thiếu phụ nữ, người da màu, người nghèo…)",
          "Lập trình viên cố ý",
          "Lỗi internet",
        ],
        answer: 1,
        explanation: "Garbage in, garbage out — model phản ánh chính xác sự thiên lệch của dữ liệu.",
      },
      {
        prompt: "GDPR (luật bảo vệ dữ liệu EU) cho phép người dùng làm gì?",
        options: [
          "Bán dữ liệu của mình",
          "Yêu cầu công ty xoá toàn bộ dữ liệu cá nhân ('right to be forgotten')",
          "Copy AI miễn phí",
          "Kiện AI ra toà",
        ],
        answer: 1,
        explanation: "Quyền được lãng quên là quyền cơ bản trong GDPR và Luật An ninh mạng VN 2018.",
      },
    ],
    scenario: [
      {
        situation: "Bạn phát hiện một ứng dụng AI 'soi tướng' chấm điểm IQ học sinh qua khuôn mặt rồi gửi kết quả cho phụ huynh.",
        prompt: "Đây có phải vấn đề đạo đức không?",
        choices: [
          { label: "Có — đây là pseudoscience, gây tổn thương tâm lý trẻ và phân biệt đối xử", verdict: "good", feedback: "Đúng! Không có cơ sở khoa học nào liên kết khuôn mặt với IQ. Cần báo cáo." },
          { label: "Không — AI nói đúng thì sao", verdict: "wrong", feedback: "AI 'nói gì' không quan trọng nếu không có nền tảng khoa học." },
          { label: "Tuỳ — nếu app trả phí thì OK", verdict: "wrong", feedback: "Trả phí không hợp pháp hoá lừa đảo khoa học." },
        ],
      },
    ],
  },

  // ============== Bài 7 — Recommender System ==============
  recsys: {
    mc: [
      {
        prompt: "Vì sao TikTok 'gây nghiện' đến vậy?",
        options: [
          "Vì video quá ngắn",
          "Vì thuật toán đề xuất học nhanh sở thích cá nhân từ thời gian xem từng giây",
          "Vì có nhạc hay",
          "Vì màn hình dọc",
        ],
        answer: 1,
        explanation: "TikTok tối ưu thời gian giữ chân (dwell time) — đó là feedback signal mạnh nhất trong recsys.",
      },
      {
        prompt: "'Filter bubble' nghĩa là gì?",
        options: [
          "Bong bóng xà phòng",
          "Việc bạn chỉ thấy nội dung khớp với quan điểm sẵn có → khó tiếp xúc ý kiến khác",
          "Bộ lọc Instagram",
          "Tính năng chặn quảng cáo",
        ],
        answer: 1,
        explanation: "Recsys càng cá nhân hoá càng dễ tạo 'bong bóng' — vấn đề lớn của mạng xã hội hiện đại.",
      },
    ],
    scenario: [
      {
        situation: "YouTube cứ đề xuất video âm mưu giả khoa học cho em trai bạn (lớp 7) suốt 1 tuần.",
        prompt: "Bạn nên làm gì?",
        choices: [
          { label: "Vào lịch sử xem, xoá các video đó và nhấn 'Not interested' + 'Don't recommend channel'", verdict: "good", feedback: "Đúng — đây là cách 'dạy lại' thuật toán hiệu quả nhất." },
          { label: "Để vậy, em sẽ tự chán", verdict: "risky", feedback: "Recsys càng đề xuất, em càng xem → vòng lặp xấu." },
          { label: "Cấm em xem YouTube luôn", verdict: "risky", feedback: "Cực đoan — nên hướng dẫn em cách dùng tỉnh táo." },
        ],
      },
    ],
  },

  // ============== Bài 8 — AIoT ==============
  aiot: {
    mc: [
      {
        prompt: "AIoT là viết tắt của gì?",
        options: [
          "AI on Tablet",
          "Artificial Intelligence of Things — AI chạy trên thiết bị IoT",
          "All-In-One Toolkit",
          "Auto Internet of Things",
        ],
        answer: 1,
        explanation: "AIoT = AI + IoT — đặt model AI lên thiết bị nhỏ (camera, đồng hồ, cảm biến) để xử lý ngay tại chỗ.",
      },
      {
        prompt: "Edge computing có ưu điểm gì so với gửi mọi thứ lên cloud?",
        options: [
          "Tốn pin hơn",
          "Phản hồi nhanh (millisecond), bảo mật riêng tư, vẫn chạy khi mất mạng",
          "Đắt hơn",
          "Cần internet 5G",
        ],
        answer: 1,
        explanation: "Edge xử lý ngay tại thiết bị — không phải đợi server, không lộ dữ liệu, không phụ thuộc mạng.",
      },
    ],
    scenario: [
      {
        situation: "Trường lắp camera AI đếm số học sinh ở căng-tin để cảnh báo quá tải. Camera gửi video gốc lên cloud xử lý.",
        prompt: "Cách làm này có vấn đề gì?",
        choices: [
          { label: "Lộ quyền riêng tư + tốn băng thông — nên chạy AI ngay trên camera (edge), chỉ gửi con số đếm", verdict: "good", feedback: "Chuẩn! AIoT đúng nghĩa là xử lý tại edge, không stream video gốc." },
          { label: "Không sao, cloud an toàn mà", verdict: "risky", feedback: "Cloud có thể bị hack — và stream 24/7 mặt học sinh là rủi ro lớn." },
          { label: "Camera tốt thì OK", verdict: "wrong", feedback: "Vấn đề là kiến trúc, không phải chất lượng camera." },
        ],
      },
    ],
  },

  // ============== Bài 9 — Capstone ==============
  capstone: {
    mc: [
      {
        prompt: "MLOps là gì?",
        options: [
          "Một loại GPU",
          "Quy trình đưa model AI từ phòng thí nghiệm ra production: deploy, monitor, retrain",
          "Phần mềm vẽ biểu đồ",
          "Thư viện Python",
        ],
        answer: 1,
        explanation: "MLOps = DevOps cho ML — không có MLOps, model 'chết' ngay sau khi launch vì data drift.",
      },
      {
        prompt: "Sau khi deploy, vì sao phải monitor model liên tục?",
        options: [
          "Vì sợ hacker",
          "Vì data thực tế thay đổi theo thời gian (data drift) → accuracy tụt dần",
          "Vì điện thoại nhanh nóng",
          "Vì luật bắt buộc",
        ],
        answer: 1,
        explanation: "Ví dụ: model dự đoán hành vi mua sắm năm 2019 sẽ sai bét sau COVID-19. Phải retrain định kỳ.",
      },
    ],
    scenario: [
      {
        situation: "Nhóm bạn xây xong chatbot tư vấn tuyển sinh. Demo 100% chính xác. Sau 3 tháng, học sinh than 'chatbot trả lời sai chương trình mới'.",
        prompt: "Nguyên nhân chính là gì?",
        choices: [
          { label: "Chương trình tuyển sinh đã thay đổi — cần cập nhật knowledge base và retrain", verdict: "good", feedback: "Đúng — đây chính là data drift điển hình." },
          { label: "Chatbot bị virus", verdict: "wrong", feedback: "Không liên quan." },
          { label: "Học sinh hỏi kiểu lạ", verdict: "risky", feedback: "Có thể có, nhưng nguyên nhân chính vẫn là nội dung đã cũ." },
        ],
      },
    ],
  },

  // ============== Bài 10 — Deepfake ==============
  deepfake: {
    mc: [
      {
        prompt: "Deepfake được tạo ra bằng kỹ thuật AI nào?",
        options: [
          "Photoshop nâng cao",
          "GAN (Generative Adversarial Network) hoặc diffusion model",
          "Cắt ghép video tay",
          "Filter Instagram",
        ],
        answer: 1,
        explanation: "GAN gồm 2 model: 1 sinh giả, 1 chấm giả — đấu nhau đến khi giả như thật.",
      },
      {
        prompt: "Cách nhận biết deepfake video phổ biến nhất?",
        options: [
          "Nhìn vào logo",
          "Quan sát chớp mắt bất thường, ánh sáng da không đều, đồng bộ miệng-tiếng lệch",
          "Đếm pixel",
          "Hỏi YouTube",
        ],
        answer: 1,
        explanation: "Deepfake hiện tại vẫn yếu ở chi tiết: răng, tai, tóc bay, bóng đổ trên cổ.",
      },
    ],
    scenario: [
      {
        situation: "Bạn nhận video gọi Zalo từ 'mẹ' yêu cầu chuyển 20 triệu gấp vì 'đang cấp cứu'. Mặt và giọng đúng mẹ.",
        prompt: "Bạn nên làm gì?",
        choices: [
          { label: "Cúp máy, gọi lại số mẹ ĐÃ LƯU + hỏi 1 câu mà chỉ mẹ con biết (kỷ niệm riêng)", verdict: "good", feedback: "Đúng! Đây là chiến thuật chống deepfake hiệu quả nhất hiện nay." },
          { label: "Chuyển ngay vì sợ mẹ chết", verdict: "wrong", feedback: "Đây chính xác là bẫy lừa đảo deepfake — đã có nạn nhân mất tiền tỉ tại VN năm 2023." },
          { label: "Đăng Facebook hỏi mọi người", verdict: "risky", feedback: "Mất thời gian — phải xác minh trực tiếp với người thân ngay." },
        ],
      },
    ],
  },

  // ============== Bài 11 — Agent / Workflow ==============
  agent: {
    mc: [
      {
        prompt: "AI Agent khác chatbot truyền thống ở điểm nào?",
        options: [
          "Đẹp hơn",
          "Có thể tự lập kế hoạch nhiều bước và gọi công cụ (tools) để thực thi",
          "Chạy nhanh hơn",
          "Miễn phí",
        ],
        answer: 1,
        explanation: "Agent = LLM + planning + tools (web search, code, email…) — có thể tự hoàn thành task phức tạp.",
      },
      {
        prompt: "Trong workflow agent, 'tool calling' nghĩa là gì?",
        options: [
          "Gọi điện thoại",
          "LLM tự quyết định khi nào cần dùng tool nào (search, code, API…) và truyền tham số phù hợp",
          "Mua công cụ trên Shopee",
          "Tải app",
        ],
        answer: 1,
        explanation: "Tool calling cho phép LLM mở rộng khả năng vượt khỏi 'nói chuyện' sang 'làm việc'.",
      },
    ],
    scenario: [
      {
        situation: "Bạn xây agent đặt vé máy bay tự động. Khách bảo 'đặt vé Hà Nội-Sài Gòn tuần sau giá rẻ nhất'. Agent đặt luôn không hỏi lại.",
        prompt: "Vấn đề ở đây là gì?",
        choices: [
          { label: "Thiếu bước xác nhận con người (human-in-the-loop) trước khi thực hiện hành động không thể hoàn tác", verdict: "good", feedback: "Chuẩn — agent làm việc lớn phải có 'confirm' trước hành động không reversible." },
          { label: "Agent chạy chậm", verdict: "wrong", feedback: "Không phải vấn đề chính." },
          { label: "Khách phải tự đặt", verdict: "risky", feedback: "Mục tiêu là tự động, nhưng vẫn phải có checkpoint." },
        ],
      },
    ],
  },

  // ============== Bài 12 — Graduation ==============
  graduation: {
    mc: [
      {
        prompt: "Khi pitch dự án AI 60 giây, điều quan trọng nhất nên nói đầu tiên là gì?",
        options: [
          "Tên team",
          "Vấn đề bạn giải quyết và vì sao nó quan trọng (problem statement)",
          "Công nghệ dùng",
          "Giá tiền",
        ],
        answer: 1,
        explanation: "Investor / giám khảo quan tâm 'why' trước 'how'. Không có vấn đề thật → không ai cần giải pháp.",
      },
      {
        prompt: "Nghề nào KHÔNG phải nghề AI điển hình?",
        options: [
          "Prompt Engineer",
          "ML Engineer",
          "AI Ethicist",
          "Thợ sửa xe máy (không dùng AI)",
        ],
        answer: 3,
        explanation: "3 nghề đầu đều cực kỳ hot trong ngành AI 2026.",
      },
    ],
    scenario: [
      {
        situation: "Bạn pitch dự án 'AI chấm bài tự động' trước ban giám khảo. Có người hỏi: 'Lỡ AI chấm sai oan cho học sinh thì sao?'",
        prompt: "Bạn nên trả lời thế nào?",
        choices: [
          { label: "Trình bày cơ chế human-in-the-loop: AI chấm sơ bộ, giáo viên duyệt lại các case điểm thấp/biên", verdict: "good", feedback: "Tuyệt! Cho thấy bạn hiểu rủi ro và đã thiết kế quy trình giảm thiểu." },
          { label: "AI hiện đại không bao giờ sai", verdict: "wrong", feedback: "Mất uy tín ngay — mọi AI đều có thể sai." },
          { label: "Đó là vấn đề của trường", verdict: "wrong", feedback: "Né trách nhiệm — pitch fail." },
        ],
      },
    ],
  },
};
