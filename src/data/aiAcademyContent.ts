/**
 * AI Academy — extended educational content per track.
 * This sidecar augments the inline TRACKS array in AIAcademy.tsx without
 * touching the existing story / sandbox / quiz data. Keyed by TrackId.
 *
 * Each track gets:
 *  - vietnamCase: A Vietnam-specific real-world story.
 *  - goldenTip:   "Mẹo vàng của thầy Hải" — signature insight.
 *  - glossary:    4–6 key terms with student-friendly definitions.
 *  - careers:     3–5 related job titles.
 *  - homework:    A practical mini-project to try at home.
 *  - externalDemo: 2–3 free links to play with real AI tools.
 *  - safetyNote:  Optional callout for sensitive tracks (Ethics, Deepfake).
 */

export type TrackExtra = {
  vietnamCase: { title: string; body: string };
  goldenTip: string;
  glossary: { term: string; def: string }[];
  careers: string[];
  homework: string;
  externalDemo: { label: string; url: string }[];
  safetyNote?: { title: string; body: string };
};

export const TRACK_EXTRAS: Record<string, TrackExtra> = {
  // ============== Bài 1 — Computer Vision ==============
  vision: {
    vietnamCase: {
      title: "🇻🇳 VinAI Face Recognition tại sân bay Nội Bài",
      body: "VinAI Research (thuộc Vingroup) đã phát triển hệ thống FaceID dùng cho sân bay Nội Bài và Tân Sơn Nhất — quét khuôn mặt hành khách thay vé giấy, rút ngắn thời gian check-in từ 4 phút xuống chỉ 5 giây. Hệ thống vẫn nhận diện chính xác 99,2% kể cả khi đeo khẩu trang (di sản từ thời COVID-19).",
    },
    goldenTip:
      "Khi training model Vision, đừng chỉ thu ảnh đẹp! Hãy cố tình thêm ảnh mờ, ngược sáng, nghiêng góc 45°. Model học từ data 'xấu' mới robust ngoài đời thật — đó là bí mật của Tesla Autopilot.",
    glossary: [
      { term: "Pixel", def: "Mỗi điểm ảnh — chứa 3 con số R/G/B (0–255)." },
      { term: "Bounding Box", def: "Khung vuông AI vẽ quanh vật thể nó nhận ra." },
      { term: "Confidence Score", def: "Tỷ lệ % AI tự tin về dự đoán của mình." },
      { term: "Convolution", def: "Phép quét bộ lọc lên ảnh để tìm đặc điểm (cạnh, góc)." },
      { term: "Landmark", def: "Điểm mốc trên khuôn mặt (mắt, mũi, miệng) — FaceID dùng 30k+ điểm." },
    ],
    careers: [
      "Computer Vision Engineer ($90k–$180k)",
      "Medical Imaging AI Specialist",
      "Autonomous Vehicle Perception Engineer (VinFast, Tesla)",
      "AR/VR Developer (Apple Vision Pro)",
    ],
    homework:
      "Mở Google Photos → tìm kiếm 'mèo' hoặc 'biển'. Google đã tự gắn nhãn ảnh trong điện thoại bạn từ năm 2015! Thử đếm xem nó nhận đúng bao nhiêu %, sai chỗ nào.",
    externalDemo: [
      { label: "Teachable Machine — train model trong 5 phút", url: "https://teachablemachine.withgoogle.com/" },
      { label: "Quick, Draw! — AI đoán hình vẽ tay", url: "https://quickdraw.withgoogle.com/" },
      { label: "How Old Robot — Microsoft đoán tuổi", url: "https://how-old.net/" },
    ],
  },

  // ============== Bài 2 — NLP ==============
  nlp: {
    vietnamCase: {
      title: "🇻🇳 Zalo AI Lab & Chatbot Kiki",
      body: "Kiki là trợ lý ảo thuần Việt do Zalo phát triển — hiểu tiếng Việt giọng 3 miền, xử lý teen-code ('iu qá', 'k bít') và phương ngữ Nghệ An, Quảng Nam. Tích hợp trên xe VinFast VF8, Kiki phục vụ hơn 10 triệu người dùng/tháng và đứng top ASR (nhận dạng giọng nói) Tiếng Việt trên VLSP benchmark.",
    },
    goldenTip:
      "Khi dùng ChatGPT bằng tiếng Việt, hãy ra lệnh: 'Trả lời bằng tiếng Việt chuẩn, không dùng từ Hán-Việt cổ'. Chất lượng output sẽ tăng gấp đôi — vì AI mặc định học từ data Hán-Việt dày đặc trên Internet.",
    glossary: [
      { term: "Token", def: "Đơn vị nhỏ nhất AI 'nuốt' — thường là 1 từ hoặc 1 âm tiết." },
      { term: "Intent", def: "Ý định người dùng (hỏi giá, đặt hàng, phàn nàn...)." },
      { term: "Embedding", def: "Biến từ ngữ thành dãy 768 con số để máy so sánh." },
      { term: "Sentiment", def: "Phân tích cảm xúc tích cực / tiêu cực / trung lập." },
      { term: "NER", def: "Named Entity Recognition — tách tên người, địa danh, ngày tháng." },
    ],
    careers: [
      "NLP Engineer (FPT.AI, VinBigdata, Zalo)",
      "Chatbot Designer",
      "Conversational AI Product Manager",
      "Linguist for AI (cần bằng Ngôn ngữ học)",
    ],
    homework:
      "Vào Google Translate → gõ một câu thành ngữ Việt như 'ăn cháo đá bát'. Chụp màn hình. Nhờ ChatGPT giải thích vì sao AI dịch sai và nên dịch thế nào cho đúng tinh thần văn hoá.",
    externalDemo: [
      { label: "Hugging Face — chạy 1000+ NLP models miễn phí", url: "https://huggingface.co/spaces" },
      { label: "Cohere Playground", url: "https://dashboard.cohere.com/playground" },
      { label: "VnCoreNLP — bộ NLP tiếng Việt", url: "https://github.com/vncorenlp/VnCoreNLP" },
    ],
  },

  // ============== Bài 3 — Neural Networks ==============
  nn: {
    vietnamCase: {
      title: "🇻🇳 VinBigdata & mô hình đọc ảnh X-quang phổi",
      body: "Năm 2021, VinBigdata công bố dataset 18.000 ảnh X-quang ngực được 17 bác sĩ chuyên khoa gắn nhãn. Mạng neural CNN của họ phát hiện 14 bệnh lý phổi với độ chính xác 93% — ngang ngửa bác sĩ X-quang 10 năm kinh nghiệm. Đã triển khai hỗ trợ chẩn đoán tại Bệnh viện Vinmec.",
    },
    goldenTip:
      "Đừng học deep learning bằng cách thuộc công thức! Hãy mở TensorFlow Playground, kéo thanh trượt 'learning rate' và xem mạng học/sai như nào. 30 phút chơi = 3 tuần đọc sách.",
    glossary: [
      { term: "Neuron", def: "Đơn vị tính toán nhỏ: nhận input × weight → ra output." },
      { term: "Weight", def: "Con số AI 'điều chỉnh' khi học — bí mật của trí thông minh." },
      { term: "Activation", def: "Hàm 'kích hoạt' quyết định neuron có 'phát tín hiệu' hay không (ReLU, Sigmoid)." },
      { term: "Backpropagation", def: "Cách AI sửa sai: lan ngược lỗi để chỉnh weights." },
      { term: "Overfitting", def: "AI thuộc lòng data — gặp đề mới là tịt." },
    ],
    careers: [
      "Deep Learning Engineer ($120k–$250k)",
      "Research Scientist (DeepMind, OpenAI)",
      "AI Hardware Engineer (NVIDIA, Cerebras)",
      "Medical AI Researcher",
    ],
    homework:
      "Truy cập playground.tensorflow.org → chọn dataset xoắn ốc → thêm 2 hidden layer → tăng learning rate lên 1 → xem điều gì xảy ra. Ghi lại 3 quan sát của em.",
    externalDemo: [
      { label: "TensorFlow Playground — neural net trong trình duyệt", url: "https://playground.tensorflow.org/" },
      { label: "Neural Network 3D Visualizer", url: "https://www.cs.ryerson.ca/~aharley/vis/conv/" },
      { label: "Google Colab — code AI miễn phí GPU", url: "https://colab.research.google.com/" },
    ],
  },

  // ============== Bài 4 — Generative AI ==============
  genai: {
    vietnamCase: {
      title: "🇻🇳 PhởGPT — LLM thuần Việt của VinAI",
      body: "Tháng 12/2023, VinAI ra mắt PhởGPT — Large Language Model open-source đầu tiên thực sự 'made in Vietnam' với 7,5 tỷ tham số, huấn luyện trên 102GB data tiếng Việt sạch (sách giáo khoa, báo chí, văn học). PhởGPT viết văn nghị luận lớp 9, dịch Hán-Nôm và tạo thơ lục bát đúng luật — vượt GPT-3.5 trên benchmark tiếng Việt.",
    },
    goldenTip:
      "Công thức prompt thần thánh: VAI TRÒ + BỐI CẢNH + NHIỆM VỤ + RÀNG BUỘC + FORMAT. Ví dụ: 'Bạn là gia sư Toán lớp 9 [vai] cho học sinh sợ Hình [bối cảnh], giải bài này [nhiệm vụ] bằng tiếng Việt ≤200 từ [ràng buộc], trình bày dạng bullet [format]'.",
    glossary: [
      { term: "Prompt", def: "Câu lệnh bạn ra cho AI tạo sinh." },
      { term: "Token (LLM)", def: "Đơn vị tính phí ChatGPT — 1 token ≈ 0.75 từ tiếng Anh." },
      { term: "Temperature", def: "0 = trả lời cứng nhắc, 1 = sáng tạo bay bổng." },
      { term: "Hallucination", def: "AI bịa thông tin trông như thật — luôn kiểm chứng!" },
      { term: "Diffusion Model", def: "Cơ chế Midjourney/Stable Diffusion: thêm nhiễu rồi khử ngược." },
    ],
    careers: [
      "Prompt Engineer ($150k–$300k)",
      "AI Artist / Creative Director",
      "Generative AI Product Designer",
      "LLM Fine-tuning Specialist",
    ],
    homework:
      "Dùng Microsoft Designer (miễn phí) hoặc Leonardo.ai → viết 3 prompt khác nhau cho cùng chủ đề 'mèo phi hành gia'. So sánh kết quả. Prompt nào ra ảnh đẹp nhất và vì sao?",
    externalDemo: [
      { label: "Microsoft Designer (DALL-E 3 miễn phí)", url: "https://designer.microsoft.com/" },
      { label: "Leonardo.ai — 150 ảnh free/ngày", url: "https://leonardo.ai/" },
      { label: "Suno AI — sinh bài hát từ prompt", url: "https://suno.com/" },
    ],
  },

  // ============== Bài 5 — Reinforcement Learning ==============
  rl: {
    vietnamCase: {
      title: "🇻🇳 VinFast VF8 — học lái xe trong môi trường ảo",
      body: "Trước khi chạy thử ngoài đường, VinFast huấn luyện AI tự lái trong simulator CARLA: xe ảo chạy hơn 50 triệu km mô phỏng giao thông Hà Nội (xe máy lạng lách, đèn giao thông nháy vàng). Mỗi cú va chạm ảo = -1000 điểm, mỗi km đúng làn = +1 điểm. Sau 6 tháng AI tự khám phá cách né xe máy mà không cần ai dạy.",
    },
    goldenTip:
      "Cạm bẫy RL số 1: agent học cách 'gian lận' để ăn điểm! Nếu thưởng quá cao cho việc 'đứng yên không va chạm', AI sẽ không bao giờ di chuyển. Reward design = nghệ thuật khó hơn cả code thuật toán.",
    glossary: [
      { term: "Agent", def: "Nhân vật AI đang học (xe, robot, nhân vật game)." },
      { term: "Environment", def: "Thế giới mà agent tương tác (mê cung, đường phố, bàn cờ)." },
      { term: "Reward", def: "Điểm thưởng/phạt mà environment trả về sau mỗi hành động." },
      { term: "Policy", def: "Chiến lược AI học được — 'trong tình huống X thì làm Y'." },
      { term: "Q-Learning", def: "Thuật toán cổ điển: bảng tra cứu 'trạng thái → hành động tốt nhất'." },
    ],
    careers: [
      "Robotics Engineer (Boston Dynamics, VinAI)",
      "Game AI Developer (đối thủ bot trong game)",
      "Autonomous Vehicle Engineer",
      "Quantitative Trader (RL cho stock market)",
    ],
    homework:
      "Chơi OpenAI Gym CartPole trong Google Colab (chỉ 10 dòng code có sẵn). Xem AI ngẫu nhiên rớt cây gậy trong 5 bước, rồi sau 1000 lượt học nó cân bằng được 500 bước. Kỳ diệu!",
    externalDemo: [
      { label: "AlphaGo Documentary — DeepMind đánh bại Lee Sedol", url: "https://www.youtube.com/watch?v=WXuK6gekU1Y" },
      { label: "Gymnasium — sandbox RL của OpenAI", url: "https://gymnasium.farama.org/" },
      { label: "Lunar Lander — chơi trực tiếp trên web", url: "https://huggingface.co/spaces/stable-baselines3/LunarLander-v2" },
    ],
  },

  // ============== Bài 6 — Ethics ==============
  ethics: {
    vietnamCase: {
      title: "🇻🇳 Vụ ChatGPT trả lời sai pháp luật Việt Nam (2023)",
      body: "Báo Tuổi Trẻ phát hiện ChatGPT tự tin trả lời 'Việt Nam không bắt buộc đội mũ bảo hiểm khi đi xe máy' — sai hoàn toàn so với Luật Giao thông 2008. Nguyên nhân: 95% data huấn luyện của OpenAI là tiếng Anh, AI tự suy diễn về luật VN. Bài học: KHÔNG bao giờ tin tuyệt đối AI ở lĩnh vực pháp lý, y tế, tài chính.",
    },
    goldenTip:
      "3 câu hỏi vàng trước khi tin AI: (1) Data huấn luyện đến năm nào? (2) AI có nguồn để kiểm chứng không? (3) Mình có chuyên gia ngành để hỏi đối chiếu không? Thiếu 1 trong 3 → coi như tham khảo, đừng quyết định.",
    glossary: [
      { term: "Bias", def: "Thiên vị do data lệch (giới, chủng tộc, vùng miền)." },
      { term: "Fairness", def: "Đo lường công bằng giữa các nhóm — disparate impact ratio." },
      { term: "Transparency", def: "AI giải thích được vì sao ra quyết định đó (XAI)." },
      { term: "Privacy", def: "Bảo vệ dữ liệu cá nhân — GDPR (EU), Luật ATTT (VN)." },
      { term: "Hallucination", def: "AI bịa fact một cách rất tự tin — không phải lỗi mà là bản chất LLM." },
    ],
    careers: [
      "AI Ethics Officer (Meta, Google, Microsoft)",
      "AI Policy Researcher (chính phủ, EU AI Act)",
      "Responsible AI Product Manager",
      "AI Auditor (kiểm toán mô hình bias)",
    ],
    homework:
      "Hỏi ChatGPT: 'Kể một câu chuyện về một bác sĩ và y tá'. AI giả định ai là nam, ai là nữ? Đó là bias giới tính cổ điển. Chụp màn hình và thảo luận với bạn bè.",
    externalDemo: [
      { label: "AI Fairness 360 — IBM toolkit phát hiện bias", url: "https://aif360.res.ibm.com/" },
      { label: "Moral Machine — MIT đạo đức xe tự lái", url: "https://www.moralmachine.net/" },
      { label: "EU AI Act — luật AI châu Âu", url: "https://artificialintelligenceact.eu/" },
    ],
    safetyNote: {
      title: "⚠️ Khi gặp AI thiên vị / xúc phạm trong đời thật",
      body: "Báo cáo nội dung AI sai/độc hại tới: (1) Nền tảng đó (Report → AI-generated abuse). (2) Cục An toàn Thông tin VN: 0339.829.929. (3) Tổng đài 113 nếu là lừa đảo có yếu tố hình sự. Lưu lại screenshot + URL trước khi báo cáo.",
    },
  },

  // ============== Bài 7 — Recommender Systems ==============
  recsys: {
    vietnamCase: {
      title: "🇻🇳 TikTok For You Page — vì sao gây nghiện đến vậy?",
      body: "Thuật toán TikTok đo MICROSECOND: bạn xem video bao lâu, lướt qua mấy giây, like/share/comment, thậm chí HOVER tay trên màn hình. Mỗi swipe = 1 lá phiếu cho AI. Người Việt Nam dùng TikTok trung bình 76 phút/ngày (2024) — top 3 thế giới. Đó là lý do Bộ TT&TT đang siết chặt kiểm duyệt và yêu cầu tắt 'thuật toán cá nhân hoá' cho trẻ <13 tuổi.",
    },
    goldenTip:
      "Muốn 'detox' thuật toán? Vào Settings → Activity → Clear watch history → lướt 3 ngày chỉ các chủ đề mới (sách, ẩm thực, du lịch). Sau 1 tuần For You Page sẽ 'reset' và bạn thoát khỏi bong bóng cũ.",
    glossary: [
      { term: "Collaborative Filtering", def: "'Người giống bạn cũng thích món này' — Netflix dùng." },
      { term: "Content-Based", def: "Gợi ý dựa trên đặc điểm sản phẩm (Spotify dùng giai điệu)." },
      { term: "Cosine Similarity", def: "Đo độ giống nhau giữa 2 vector sở thích (0 → 1)." },
      { term: "Cold Start", def: "Vấn đề khi user mới chưa có lịch sử → AI bí." },
      { term: "Filter Bubble", def: "Bong bóng lọc — bạn chỉ thấy 1 góc nhìn." },
    ],
    careers: [
      "Recommender Systems Engineer (TikTok, Shopee, Netflix)",
      "Data Scientist for Personalization",
      "MLOps Engineer",
      "Growth Hacker (data-driven marketing)",
    ],
    homework:
      "Mở Spotify → 'Wrapped' cuối năm. Top 5 thể loại bạn nghe là gì? Bây giờ chủ động tìm 1 thể loại đối lập (jazz nếu bạn nghe rap; nhạc cổ điển nếu bạn nghe EDM). Sau 1 tuần, đề xuất có thay đổi?",
    externalDemo: [
      { label: "MovieLens — recommender dataset huyền thoại", url: "https://movielens.org/" },
      { label: "Spotify Audio Features API explorer", url: "https://developer.spotify.com/documentation/web-api/reference/get-audio-features" },
      { label: "How TikTok's Algorithm Works (WSJ)", url: "https://www.wsj.com/video/series/inside-tiktoks-highly-secretive-algorithm/investigation-how-tiktok-algorithm-figures-out-your-deepest-desires/6C0C2040-FF25-4827-8528-2BD6612E3796" },
    ],
  },

  // ============== Bài 8 — AIoT ==============
  aiot: {
    vietnamCase: {
      title: "🇻🇳 Đèn giao thông AI tại Bình Dương",
      body: "Năm 2023, Bình Dương triển khai 100 ngã tư đèn giao thông AIoT do FPT IS phối hợp Viettel xây dựng: camera AI đếm xe real-time, tự động kéo dài đèn xanh hướng đông xe nhất. Kết quả sau 6 tháng: giảm 30% thời gian chờ đèn đỏ, giảm 18% tai nạn giao thông. Mô hình đang nhân rộng tại Hà Nội, TP.HCM và Đà Nẵng.",
    },
    goldenTip:
      "Khi thiết kế AIoT, luôn nhớ luật 'edge first': xử lý AI ngay tại thiết bị (Raspberry Pi, Jetson Nano) trước khi gửi lên cloud. Tiết kiệm 90% băng thông + giảm độ trễ từ 200ms xuống 20ms — cực quan trọng với xe tự lái.",
    glossary: [
      { term: "IoT", def: "Internet of Things — vạn vật kết nối mạng." },
      { term: "Edge AI", def: "AI chạy ngay trên thiết bị, không cần internet." },
      { term: "Sensor Fusion", def: "Kết hợp nhiều cảm biến (camera + lidar + GPS)." },
      { term: "MQTT", def: "Giao thức nhẹ để IoT 'tám chuyện' với server." },
      { term: "Digital Twin", def: "Bản sao số của thành phố/nhà máy để mô phỏng." },
    ],
    careers: [
      "IoT Engineer (Viettel, FPT, VNPT)",
      "Embedded AI Engineer",
      "Smart City Architect",
      "Industrial IoT Consultant (nhà máy 4.0)",
    ],
    homework:
      "Khảo sát 1 ngày: trong nhà em có bao nhiêu thiết bị IoT (TV smart, đồng hồ, loa, điều hoà, máy lọc nước)? Vẽ sơ đồ kết nối. Thiết bị nào chưa kết nối mà em muốn 'thông minh hoá'?",
    externalDemo: [
      { label: "ESP32 Web Simulator — code IoT online", url: "https://wokwi.com/" },
      { label: "Cisco Packet Tracer Smart City (free)", url: "https://www.netacad.com/courses/packet-tracer" },
      { label: "Edge Impulse — train Edge AI miễn phí", url: "https://edgeimpulse.com/" },
    ],
  },

  // ============== Bài 9 — Capstone (BUILD focus) ==============
  capstone: {
    vietnamCase: {
      title: "🇻🇳 Học sinh Lê Quý Đôn đoạt giải Intel ISEF với AI giám sát rừng",
      body: "Năm 2024, nhóm 3 học sinh THPT Lê Quý Đôn (Đà Nẵng) đoạt giải Intel ISEF với dự án 'ForestGuard AI' — drone tự bay tuần tra rừng phòng hộ, dùng Computer Vision (Bài 1) phát hiện khói cháy + NLP (Bài 2) cảnh báo qua Zalo + AIoT (Bài 8) gửi GPS về kiểm lâm. Mô hình tích hợp 4 công nghệ AI cơ bản — đúng tinh thần capstone!",
    },
    goldenTip:
      "Sai lầm 90% học sinh khi làm capstone: chọn đề tài quá to ('AI cứu thế giới'). Hãy làm NHỎ và HOÀN CHỈNH: 1 vấn đề cụ thể + 1 user thật + 1 demo 60 giây + 1 số liệu thuyết phục. Capstone tốt = MVP, không phải kiệt tác.",
    glossary: [
      { term: "MVP", def: "Minimum Viable Product — phiên bản nhỏ nhất dùng được." },
      { term: "Pipeline", def: "Chuỗi xử lý: thu data → clean → train → deploy." },
      { term: "MLOps", def: "Vận hành ML production — Docker, CI/CD, monitoring." },
      { term: "API", def: "Application Programming Interface — cách 2 chương trình 'nói chuyện'." },
      { term: "Integration", def: "Ghép nhiều module AI thành 1 sản phẩm hoạt động." },
    ],
    careers: [
      "AI Solutions Architect ($150k–$280k)",
      "Full-stack AI Engineer",
      "Technical Product Manager",
      "AI Startup Founder",
    ],
    homework:
      "Liệt kê 3 vấn đề trong nhà/trường em có thể giải bằng AI (ví dụ: đếm số người vào căng-tin, nhắc uống nước, phân loại rác). Chọn 1 cái nhỏ nhất và phác thảo pipeline: input → AI → output.",
    externalDemo: [
      { label: "Lovable — build app AI bằng chat", url: "https://lovable.dev/" },
      { label: "n8n — workflow tự động kéo thả", url: "https://n8n.io/" },
      { label: "Make.com — kết nối 1500+ apps", url: "https://www.make.com/" },
    ],
  },

  // ============== Bài 10 — Deepfake ==============
  deepfake: {
    vietnamCase: {
      title: "🇻🇳 Vụ giả mạo MC Mai Ngọc VTV (2024)",
      body: "Đầu 2024, kẻ gian dùng deepfake ghép mặt MC Mai Ngọc (VTV) vào video quảng cáo sàn forex lừa đảo, đăng trên Facebook gây thiệt hại hàng tỷ đồng cho người xem cả tin. Công an Hà Nội đã khởi tố vụ án theo Điều 174 Bộ luật Hình sự. Bài học: dù video trông THẬT 99%, hãy verify nguồn chính thức trước khi tin.",
    },
    goldenTip:
      "Mẹo phát hiện deepfake bằng mắt thường trong 5 giây: (1) Bảo người trong video QUAY ĐẦU NGHIÊNG 90° — AI hiện tại còn yếu góc nghiêng. (2) Nhìn răng — thường mờ/dính nhau. (3) Tai có đeo hoa tai không khớp với chuyển động đầu. 3 dấu hiệu này lộ 70% deepfake.",
    glossary: [
      { term: "Deepfake", def: "Video ghép mặt do AI tạo — từ 'deep learning' + 'fake'." },
      { term: "GAN", def: "Generative Adversarial Network — 2 AI 'đấu' nhau để tạo ảnh giả siêu thật." },
      { term: "Face Swap", def: "Thay khuôn mặt A bằng khuôn mặt B trong video." },
      { term: "Voice Cloning", def: "Nhái giọng người khác chỉ từ 3 giây mẫu âm thanh." },
      { term: "Forensic", def: "Pháp y số — soi pixel/noise pattern phát hiện ảnh chỉnh sửa." },
    ],
    careers: [
      "Digital Forensics Investigator",
      "Cybersecurity Analyst (đặc thù AI threats)",
      "Content Moderator AI Specialist",
      "Trust & Safety Engineer (Meta, TikTok)",
    ],
    homework:
      "Vào MIT Detect Fakes → xem 10 video, đoán THẬT/GIẢ. Em đoán đúng bao nhiêu? Ghi lại 3 dấu hiệu giúp em phát hiện video giả.",
    externalDemo: [
      { label: "MIT Detect Fakes — test khả năng phát hiện", url: "https://detectfakes.kellogg.northwestern.edu/" },
      { label: "Deepware Scanner — quét video upload", url: "https://scanner.deepware.ai/" },
      { label: "Reality Defender — AI phát hiện deepfake", url: "https://www.realitydefender.com/" },
    ],
    safetyNote: {
      title: "⚠️ Khi bị/phát hiện deepfake xúc phạm",
      body: "Hành động ngay: (1) Chụp screenshot + lưu URL gốc. (2) Báo nền tảng (Report → impersonation / deepfake). (3) Trình báo công an phường + Cục An toàn TT 0339.829.929. (4) Hotline tư vấn tâm lý 1800.1567 nếu cần hỗ trợ. KHÔNG share lại để cảnh báo — vô tình phát tán thêm.",
    },
  },

  // ============== Bài 11 — AI Agent ==============
  agent: {
    vietnamCase: {
      title: "🇻🇳 FPT.AI Agent cho ngân hàng TPBank",
      body: "TPBank triển khai AI Agent của FPT.AI từ 2023: chatbot xử lý 80% câu hỏi khách hàng (kiểm tra số dư, chuyển khoản, mở thẻ) mà không cần nhân viên. Agent gọi 12 API ngân hàng song song, tự ra quyết định khi nào escalate cho người thật. Tiết kiệm 200 tỷ đồng/năm chi phí call center. Đây là mô hình 'autonomous agent' đầu tiên triển khai production ngân hàng VN.",
    },
    goldenTip:
      "Quy tắc 'STAR' cho agent prompt: Setup (vai trò + bối cảnh) + Tools (liệt kê API agent được dùng) + Action (nhiệm vụ cụ thể) + Result (format output mong muốn). Thiếu Tools agent sẽ 'bịa' công cụ không tồn tại — lỗi #1 khi build agent.",
    glossary: [
      { term: "Agent", def: "AI có vòng lặp 'suy nghĩ → hành động → quan sát'." },
      { term: "Tool Use", def: "Agent gọi API/function bên ngoài (search, gửi mail)." },
      { term: "Chain-of-Thought", def: "AI viết ra suy luận từng bước trước khi trả lời." },
      { term: "ReAct", def: "Pattern: Reasoning + Acting — thinking và using tool xen kẽ." },
      { term: "Multi-Agent", def: "Nhiều agent phối hợp (CEO + Coder + Tester)." },
    ],
    careers: [
      "AI Agent Engineer (siêu hot 2025)",
      "Prompt Engineer Senior",
      "Workflow Automation Specialist",
      "AI Solutions Consultant",
    ],
    homework:
      "Tạo workflow Zapier MIỄN PHÍ: 'Mỗi sáng 7h, đọc tin tức công nghệ TechCrunch → tóm tắt 3 dòng → gửi email cho mình'. Đây là agent đơn giản nhất — và cực hữu ích cho học sinh THPT muốn cập nhật xu hướng.",
    externalDemo: [
      { label: "Zapier — agent workflow no-code", url: "https://zapier.com/" },
      { label: "AutoGPT — agent tự hành open-source", url: "https://github.com/Significant-Gravitas/AutoGPT" },
      { label: "LangChain Hub — 1000+ prompt templates", url: "https://smith.langchain.com/hub" },
    ],
  },

  // ============== Bài 12 — Graduation (PRESENT focus) ==============
  graduation: {
    vietnamCase: {
      title: "🇻🇳 Nguyễn Hà Đông & câu chuyện Flappy Bird",
      body: "Năm 2014, Nguyễn Hà Đông (Hà Nội) ra mắt Flappy Bird — kiếm 50.000 USD/ngày từ quảng cáo, đứng top App Store toàn cầu. Bí quyết không phải code phức tạp mà là STORYTELLING: một con chim, một ống nước, một thông điệp 'thử thách bản thân'. Bài học cho thế hệ AI: công nghệ là phương tiện, CÂU CHUYỆN mới là thứ chinh phục người dùng.",
    },
    goldenTip:
      "Công thức pitch 60 giây thần thánh của Y Combinator: 'Chúng tôi giải quyết [vấn đề] cho [đối tượng] bằng cách [giải pháp]. Khác với [đối thủ], chúng tôi [điểm độc đáo]. Đã có [traction số liệu]'. Em hãy thử viết cho dự án AI của mình — đúng cấu trúc này tỷ lệ thành công x3.",
    glossary: [
      { term: "Pitch Deck", def: "Slide trình bày sản phẩm cho nhà đầu tư (10–15 slide)." },
      { term: "Traction", def: "Số liệu chứng minh sản phẩm có người dùng (DAU, MRR)." },
      { term: "MVP Demo", def: "Trình diễn LIVE sản phẩm — không slide tĩnh." },
      { term: "Storytelling", def: "Kể chuyện thay vì liệt kê tính năng." },
      { term: "Personal Brand", def: "Hình ảnh chuyên môn online — LinkedIn, GitHub, blog." },
    ],
    careers: [
      "AI Product Manager ($140k–$280k)",
      "AI Developer Advocate",
      "AI Startup Founder/CEO",
      "Tech Speaker / Educator (như thầy Hải 😄)",
      "AI Journalist / Content Creator",
    ],
    homework:
      "Quay video TikTok 60 giây giới thiệu 1 ứng dụng AI em yêu thích nhất. Cấu trúc: Hook 3s + Vấn đề 10s + Giải pháp AI 30s + Lời kêu gọi 7s + Tag #HaiEduTech. Gửi link cho thầy Hải nhận quà!",
    externalDemo: [
      { label: "Gamma — sinh slide AI từ prompt", url: "https://gamma.app/" },
      { label: "Pitch.com — pitch deck miễn phí", url: "https://pitch.com/" },
      { label: "Notion — portfolio CV cho dev AI", url: "https://www.notion.so/templates/category/personal-brand" },
    ],
  },
};
