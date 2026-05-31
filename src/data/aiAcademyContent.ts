/**
 * AI Academy - extended educational content per track.
 * This sidecar augments the inline TRACKS array in AIAcademy.tsx without
 * touching the existing story / sandbox / quiz data. Keyed by TrackId.
 *
 * Each track gets:
 *  - vietnamCase: A Vietnam-specific real-world story.
 *  - goldenTip:   "Mẹo vàng của thầy Hải" - signature insight.
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
  // ============== Bài 1 - Computer Vision ==============
  vision: {
    vietnamCase: {
      title: "🇻🇳 VinAI Face Recognition tại sân bay Nội Bài",
      body: "🏢 VinAI Research (thuộc Vingroup) đã triển khai hệ thống FaceID cho hai sân bay lớn nhất Việt Nam là Nội Bài và Tân Sơn Nhất. ⚡ Hành khách chỉ cần quét khuôn mặt thay vé giấy, giảm thời gian check-in từ 4 phút xuống còn 5 giây. 🎯 Độ chính xác đạt 99,2%, kể cả khi hành khách đang đeo khẩu trang (di sản công nghệ từ thời COVID-19). 🌏 Đây là một trong những hệ thống face recognition quy mô sân bay quốc tế lớn nhất khu vực Đông Nam Á.",
    },
    goldenTip:
      "Khi training model Vision, đừng chỉ thu ảnh đẹp! Hãy cố tình thêm ảnh mờ, ngược sáng, nghiêng góc 45°. Model học từ data 'xấu' mới robust ngoài đời thật - đó là bí mật của Tesla Autopilot.",
    glossary: [
      { term: "Pixel", def: "Mỗi điểm ảnh - chứa 3 con số R/G/B (0–255)." },
      { term: "Bounding Box", def: "Khung vuông AI vẽ quanh vật thể nó nhận ra." },
      { term: "Confidence Score", def: "Tỷ lệ % AI tự tin về dự đoán của mình." },
      { term: "Convolution", def: "Phép quét bộ lọc lên ảnh để tìm đặc điểm (cạnh, góc)." },
      { term: "Landmark", def: "Điểm mốc trên khuôn mặt (mắt, mũi, miệng) - FaceID dùng 30k+ điểm." },
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
      { label: "Teachable Machine - train model trong 5 phút", url: "https://teachablemachine.withgoogle.com/" },
      { label: "Quick, Draw! - AI đoán hình vẽ tay", url: "https://quickdraw.withgoogle.com/" },
      { label: "How Old Robot - Microsoft đoán tuổi", url: "https://how-old.net/" },
    ],
  },

  // ============== Bài 2 - NLP ==============
  nlp: {
    vietnamCase: {
      title: "🇻🇳 Zalo AI Lab & Chatbot Kiki",
      body: "Kiki là trợ lý ảo thuần Việt do Zalo phát triển - hiểu tiếng Việt giọng 3 miền, xử lý teen-code ('iu qá', 'k bít') và phương ngữ Nghệ An, Quảng Nam. Tích hợp trên xe VinFast VF8, Kiki phục vụ hơn 10 triệu người dùng/tháng và đứng top ASR (nhận dạng giọng nói) Tiếng Việt trên VLSP benchmark.",
    },
    goldenTip:
      "Khi dùng ChatGPT bằng tiếng Việt, hãy ra lệnh: 'Trả lời bằng tiếng Việt chuẩn, không dùng từ Hán-Việt cổ'. Chất lượng output sẽ tăng gấp đôi - vì AI mặc định học từ data Hán-Việt dày đặc trên Internet.",
    glossary: [
      { term: "Token", def: "Đơn vị nhỏ nhất AI 'nuốt' - thường là 1 từ hoặc 1 âm tiết." },
      { term: "Intent", def: "Ý định người dùng (hỏi giá, đặt hàng, phàn nàn...)." },
      { term: "Embedding", def: "Biến từ ngữ thành dãy 768 con số để máy so sánh." },
      { term: "Sentiment", def: "Phân tích cảm xúc tích cực / tiêu cực / trung lập." },
      { term: "NER", def: "Named Entity Recognition - tách tên người, địa danh, ngày tháng." },
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
      { label: "Hugging Face - chạy 1000+ NLP models miễn phí", url: "https://huggingface.co/spaces" },
      { label: "Cohere Playground", url: "https://dashboard.cohere.com/playground" },
      { label: "VnCoreNLP - bộ NLP tiếng Việt", url: "https://github.com/vncorenlp/VnCoreNLP" },
    ],
  },

  // ============== Bài 3 - Neural Networks ==============
  nn: {
    vietnamCase: {
      title: "🇻🇳 VinBigdata & mô hình đọc ảnh X-quang phổi",
      body: "Năm 2021, VinBigdata công bố dataset 18.000 ảnh X-quang ngực được 17 bác sĩ chuyên khoa gắn nhãn. Mạng neural CNN của họ phát hiện 14 bệnh lý phổi với độ chính xác 93% - ngang ngửa bác sĩ X-quang 10 năm kinh nghiệm. Đã triển khai hỗ trợ chẩn đoán tại Bệnh viện Vinmec.",
    },
    goldenTip:
      "Đừng học deep learning bằng cách thuộc công thức! Hãy mở TensorFlow Playground, kéo thanh trượt 'learning rate' và xem mạng học/sai như nào. 30 phút chơi = 3 tuần đọc sách.",
    glossary: [
      { term: "Neuron", def: "Đơn vị tính toán nhỏ: nhận input × weight → ra output." },
      { term: "Weight", def: "Con số AI 'điều chỉnh' khi học - bí mật của trí thông minh." },
      { term: "Activation", def: "Hàm 'kích hoạt' quyết định neuron có 'phát tín hiệu' hay không (ReLU, Sigmoid)." },
      { term: "Backpropagation", def: "Cách AI sửa sai: lan ngược lỗi để chỉnh weights." },
      { term: "Overfitting", def: "AI thuộc lòng data - gặp đề mới là tịt." },
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
      { label: "TensorFlow Playground - neural net trong trình duyệt", url: "https://playground.tensorflow.org/" },
      { label: "Neural Network 3D Visualizer", url: "https://www.cs.ryerson.ca/~aharley/vis/conv/" },
      { label: "Google Colab - code AI miễn phí GPU", url: "https://colab.research.google.com/" },
    ],
  },

  // ============== Bài Data - Thám tử dữ liệu ==============
  datadet: {
    vietnamCase: {
      title: "🇻🇳 VinAI thu 1 triệu ảnh người Việt để fix bias FaceID",
      body: "📷 Năm 2018, FaceID Apple bị nhiều người Việt phàn nàn vì nhận diện kém - nguyên nhân chính là dữ liệu train lệch về người da trắng. 🇻🇳 VinAI Research đã đáp lại bằng cách xây dataset hơn 1 triệu ảnh người Việt (đủ giới tính, độ tuổi, kiểu tóc, có/không kính, đeo khẩu trang). 🎯 Mô hình mới đạt 99,2% độ chính xác trên người Việt - bằng chứng sống động rằng 'data quyết định trí thông minh của AI'.",
    },
    goldenTip:
      "Trước khi train AI, hãy nhìn data như thám tử: thiếu gì? lệch gì? bẩn chỗ nào? 80% thời gian của một AI Engineer giỏi là dọn dữ liệu, chỉ 20% là code thuật toán.",
    glossary: [
      { term: "Dataset", def: "Tập dữ liệu AI dùng để học (ví dụ: 10.000 ảnh mèo)." },
      { term: "Feature", def: "Đặc trưng của 1 mẫu (chiều cao, màu, tuổi...)." },
      { term: "Label", def: "Nhãn / đáp án đúng đi kèm mỗi mẫu (mèo, chó, spam...)." },
      { term: "Bias", def: "Định kiến do dữ liệu lệch khiến AI dự đoán bất công." },
      { term: "Outlier", def: "Giá trị ngoại lai bất thường (tuổi = 999) kéo trung bình lệch." },
      { term: "Structured / Unstructured", def: "Có cấu trúc (bảng) vs phi cấu trúc (ảnh, video, text)." },
    ],
    careers: [
      "Data Engineer (25–70 triệu)",
      "Data Analyst (20–55 triệu)",
      "Data Quality Specialist",
      "ML Data Curator (mới - rất hot)",
    ],
    homework:
      "Mở 1 file Excel ở nhà (bảng điểm, danh bạ, chi tiêu...). Tìm 3 lỗi: ô trống, sai chính tả, hoặc giá trị bất thường. Sửa lại và viết 2 câu giải thích vì sao dữ liệu sạch giúp ra quyết định tốt hơn.",
    externalDemo: [
      { label: "Kaggle Datasets - kho dữ liệu miễn phí", url: "https://www.kaggle.com/datasets" },
      { label: "OpenRefine - dọn data như magic", url: "https://openrefine.org/" },
      { label: "Google Dataset Search", url: "https://datasetsearch.research.google.com/" },
    ],
  },

  // ============== Bài ML - Học máy siêu đơn giản ==============
  mlmagic: {
    vietnamCase: {
      title: "🇻🇳 Shopee dùng K-Means gom 50 triệu khách hàng",
      body: "🛍️ Shopee Việt Nam có hơn 50 triệu user. Họ dùng K-Means để gom thành các 'persona': sinh viên săn deal < 200k, mẹ bỉm sữa mua đồ trẻ em, dân văn phòng mua mỹ phẩm... 🎯 Mỗi nhóm nhận gợi ý sản phẩm khác nhau → tỷ lệ click tăng 35%. Đây là ví dụ kinh điển của Unsupervised Learning mang lại tiền tỉ.",
    },
    goldenTip:
      "Quy tắc 5 giây: nhìn data - <b>có cột 'đáp án đúng' không?</b> Có → Supervised. Không → Unsupervised. Đừng học thuộc định nghĩa, hãy nhìn data!",
    glossary: [
      { term: "Supervised", def: "Học có giám sát - data có nhãn (label) làm đáp án." },
      { term: "Unsupervised", def: "Học không giám sát - data không nhãn, AI tự tìm pattern." },
      { term: "Decision Tree", def: "Cây quyết định - chuỗi câu hỏi Yes/No để phân loại." },
      { term: "Cluster", def: "Nhóm các mẫu giống nhau mà AI tự gom được." },
      { term: "K-Means", def: "Thuật toán gom K cụm dựa trên khoảng cách giữa các điểm." },
      { term: "Classification", def: "Phân loại - gán mỗi mẫu vào 1 lớp (mèo/chó/chim)." },
    ],
    careers: [
      "Machine Learning Engineer (30–80 triệu)",
      "Data Scientist (25–60 triệu)",
      "MLOps Engineer",
      "Quant Analyst (ngân hàng, fintech)",
    ],
    homework:
      "Mở Google Sheets → tạo bảng 10 bạn cùng lớp với 2 cột (chiều cao, cân nặng). Tự tay 'gom nhóm' bằng mắt - bạn thấy mấy cụm? Đó chính là K-Means mà não bạn vừa chạy!",
    externalDemo: [
      { label: "Teachable Machine - tự train classifier 5 phút", url: "https://teachablemachine.withgoogle.com/" },
      { label: "MLDemos - visualize K-Means trực quan", url: "https://stanford.edu/class/ee103/visualizations/kmeans/kmeans.html" },
      { label: "Decision Tree Visualizer", url: "https://mlu-explain.github.io/decision-tree/" },
    ],
  },

  // ============== Bài 4 - Generative AI ==============

  genai: {
    vietnamCase: {
      title: "🇻🇳 PhởGPT - LLM thuần Việt của VinAI",
      body: "Tháng 12/2023, VinAI ra mắt PhởGPT - Large Language Model open-source đầu tiên thực sự 'made in Vietnam' với 7,5 tỷ tham số, huấn luyện trên 102GB data tiếng Việt sạch (sách giáo khoa, báo chí, văn học). PhởGPT viết văn nghị luận lớp 9, dịch Hán-Nôm và tạo thơ lục bát đúng luật - vượt GPT-3.5 trên benchmark tiếng Việt.",
    },
    goldenTip:
      "Công thức prompt thần thánh: VAI TRÒ + BỐI CẢNH + NHIỆM VỤ + RÀNG BUỘC + FORMAT. Ví dụ: 'Bạn là gia sư Toán lớp 9 [vai] cho học sinh sợ Hình [bối cảnh], giải bài này [nhiệm vụ] bằng tiếng Việt ≤200 từ [ràng buộc], trình bày dạng bullet [format]'.",
    glossary: [
      { term: "Prompt", def: "Câu lệnh bạn ra cho AI tạo sinh." },
      { term: "Token (LLM)", def: "Đơn vị tính phí ChatGPT - 1 token ≈ 0.75 từ tiếng Anh." },
      { term: "Temperature", def: "0 = trả lời cứng nhắc, 1 = sáng tạo bay bổng." },
      { term: "Hallucination", def: "AI bịa thông tin trông như thật - luôn kiểm chứng!" },
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
      { label: "Leonardo.ai - 150 ảnh free/ngày", url: "https://leonardo.ai/" },
      { label: "Suno AI - sinh bài hát từ prompt", url: "https://suno.com/" },
    ],
  },

  // ============== Bài 5 - Reinforcement Learning ==============
  rl: {
    vietnamCase: {
      title: "🇻🇳 VinFast VF8 - học lái xe trong môi trường ảo",
      body: "Trước khi chạy thử ngoài đường, VinFast huấn luyện AI tự lái trong simulator CARLA: xe ảo chạy hơn 50 triệu km mô phỏng giao thông Hà Nội (xe máy lạng lách, đèn giao thông nháy vàng). Mỗi cú va chạm ảo = -1000 điểm, mỗi km đúng làn = +1 điểm. Sau 6 tháng AI tự khám phá cách né xe máy mà không cần ai dạy.",
    },
    goldenTip:
      "Cạm bẫy RL số 1: agent học cách 'gian lận' để ăn điểm! Nếu thưởng quá cao cho việc 'đứng yên không va chạm', AI sẽ không bao giờ di chuyển. Reward design = nghệ thuật khó hơn cả code thuật toán.",
    glossary: [
      { term: "Agent", def: "Nhân vật AI đang học (xe, robot, nhân vật game)." },
      { term: "Environment", def: "Thế giới mà agent tương tác (mê cung, đường phố, bàn cờ)." },
      { term: "Reward", def: "Điểm thưởng/phạt mà environment trả về sau mỗi hành động." },
      { term: "Policy", def: "Chiến lược AI học được - 'trong tình huống X thì làm Y'." },
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
      { label: "AlphaGo Documentary - DeepMind đánh bại Lee Sedol", url: "https://www.youtube.com/watch?v=WXuK6gekU1Y" },
      { label: "Gymnasium - sandbox RL của OpenAI", url: "https://gymnasium.farama.org/" },
      { label: "Lunar Lander - chơi trực tiếp trên web", url: "https://huggingface.co/spaces/stable-baselines3/LunarLander-v2" },
    ],
  },

  // ============== Bài 6 - Ethics ==============
  ethics: {
    vietnamCase: {
      title: "🇻🇳 Vụ ChatGPT trả lời sai pháp luật Việt Nam (2023)",
      body: "Báo Tuổi Trẻ phát hiện ChatGPT tự tin trả lời 'Việt Nam không bắt buộc đội mũ bảo hiểm khi đi xe máy' - sai hoàn toàn so với Luật Giao thông 2008. Nguyên nhân: 95% data huấn luyện của OpenAI là tiếng Anh, AI tự suy diễn về luật VN. Bài học: KHÔNG bao giờ tin tuyệt đối AI ở lĩnh vực pháp lý, y tế, tài chính.",
    },
    goldenTip:
      "3 câu hỏi vàng trước khi tin AI: (1) Data huấn luyện đến năm nào? (2) AI có nguồn để kiểm chứng không? (3) Mình có chuyên gia ngành để hỏi đối chiếu không? Thiếu 1 trong 3 → coi như tham khảo, đừng quyết định.",
    glossary: [
      { term: "Bias", def: "Thiên vị do data lệch (giới, chủng tộc, vùng miền)." },
      { term: "Fairness", def: "Đo lường công bằng giữa các nhóm - disparate impact ratio." },
      { term: "Transparency", def: "AI giải thích được vì sao ra quyết định đó (XAI)." },
      { term: "Privacy", def: "Bảo vệ dữ liệu cá nhân - GDPR (EU), Luật ATTT (VN)." },
      { term: "Hallucination", def: "AI bịa fact một cách rất tự tin - không phải lỗi mà là bản chất LLM." },
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
      { label: "AI Fairness 360 - IBM toolkit phát hiện bias", url: "https://aif360.res.ibm.com/" },
      { label: "Moral Machine - MIT đạo đức xe tự lái", url: "https://www.moralmachine.net/" },
      { label: "EU AI Act - luật AI châu Âu", url: "https://artificialintelligenceact.eu/" },
    ],
    safetyNote: {
      title: "⚠️ Khi gặp AI thiên vị / xúc phạm trong đời thật",
      body: "Báo cáo nội dung AI sai/độc hại tới: (1) Nền tảng đó (Report → AI-generated abuse). (2) Cục An toàn Thông tin VN: 0339.829.929. (3) Tổng đài 113 nếu là lừa đảo có yếu tố hình sự. Lưu lại screenshot + URL trước khi báo cáo.",
    },
  },

  // ============== Bài 7 - Recommender Systems ==============
  recsys: {
    vietnamCase: {
      title: "🇻🇳 TikTok For You Page - vì sao gây nghiện đến vậy?",
      body: "Thuật toán TikTok đo MICROSECOND: bạn xem video bao lâu, lướt qua mấy giây, like/share/comment, thậm chí HOVER tay trên màn hình. Mỗi swipe = 1 lá phiếu cho AI. Người Việt Nam dùng TikTok trung bình 76 phút/ngày (2024) - top 3 thế giới. Đó là lý do Bộ TT&TT đang siết chặt kiểm duyệt và yêu cầu tắt 'thuật toán cá nhân hoá' cho trẻ <13 tuổi.",
    },
    goldenTip:
      "Muốn 'detox' thuật toán? Vào Settings → Activity → Clear watch history → lướt 3 ngày chỉ các chủ đề mới (sách, ẩm thực, du lịch). Sau 1 tuần For You Page sẽ 'reset' và bạn thoát khỏi bong bóng cũ.",
    glossary: [
      { term: "Collaborative Filtering", def: "'Người giống bạn cũng thích món này' - Netflix dùng." },
      { term: "Content-Based", def: "Gợi ý dựa trên đặc điểm sản phẩm (Spotify dùng giai điệu)." },
      { term: "Cosine Similarity", def: "Đo độ giống nhau giữa 2 vector sở thích (0 → 1)." },
      { term: "Cold Start", def: "Vấn đề khi user mới chưa có lịch sử → AI bí." },
      { term: "Filter Bubble", def: "Bong bóng lọc - bạn chỉ thấy 1 góc nhìn." },
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
      { label: "MovieLens - recommender dataset huyền thoại", url: "https://movielens.org/" },
      { label: "Spotify Audio Features API explorer", url: "https://developer.spotify.com/documentation/web-api/reference/get-audio-features" },
      { label: "How TikTok's Algorithm Works (WSJ)", url: "https://www.wsj.com/video/series/inside-tiktoks-highly-secretive-algorithm/investigation-how-tiktok-algorithm-figures-out-your-deepest-desires/6C0C2040-FF25-4827-8528-2BD6612E3796" },
    ],
  },

  // ============== Bài 8 - AIoT ==============
  aiot: {
    vietnamCase: {
      title: "🇻🇳 Đèn giao thông AI tại Bình Dương",
      body: "Năm 2023, Bình Dương triển khai 100 ngã tư đèn giao thông AIoT do FPT IS phối hợp Viettel xây dựng: camera AI đếm xe real-time, tự động kéo dài đèn xanh hướng đông xe nhất. Kết quả sau 6 tháng: giảm 30% thời gian chờ đèn đỏ, giảm 18% tai nạn giao thông. Mô hình đang nhân rộng tại Hà Nội, TP.HCM và Đà Nẵng.",
    },
    goldenTip:
      "Khi thiết kế AIoT, luôn nhớ luật 'edge first': xử lý AI ngay tại thiết bị (Raspberry Pi, Jetson Nano) trước khi gửi lên cloud. Tiết kiệm 90% băng thông + giảm độ trễ từ 200ms xuống 20ms - cực quan trọng với xe tự lái.",
    glossary: [
      { term: "IoT", def: "Internet of Things - vạn vật kết nối mạng." },
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
      { label: "ESP32 Web Simulator - code IoT online", url: "https://wokwi.com/" },
      { label: "Cisco Packet Tracer Smart City (free)", url: "https://www.netacad.com/courses/packet-tracer" },
      { label: "Edge Impulse - train Edge AI miễn phí", url: "https://edgeimpulse.com/" },
    ],
  },

  // ============== Bài 9 - Capstone (BUILD focus) ==============
  capstone: {
    vietnamCase: {
      title: "🇻🇳 Học sinh Lê Quý Đôn đoạt giải Intel ISEF với AI giám sát rừng",
      body: "Năm 2024, nhóm 3 học sinh THPT Lê Quý Đôn (Đà Nẵng) đoạt giải Intel ISEF với dự án 'ForestGuard AI' - drone tự bay tuần tra rừng phòng hộ, dùng Computer Vision (Bài 1) phát hiện khói cháy + NLP (Bài 2) cảnh báo qua Zalo + AIoT (Bài 8) gửi GPS về kiểm lâm. Mô hình tích hợp 4 công nghệ AI cơ bản - đúng tinh thần capstone!",
    },
    goldenTip:
      "Sai lầm 90% học sinh khi làm capstone: chọn đề tài quá to ('AI cứu thế giới'). Hãy làm NHỎ và HOÀN CHỈNH: 1 vấn đề cụ thể + 1 user thật + 1 demo 60 giây + 1 số liệu thuyết phục. Capstone tốt = MVP, không phải kiệt tác.",
    glossary: [
      { term: "MVP", def: "Minimum Viable Product - phiên bản nhỏ nhất dùng được." },
      { term: "Pipeline", def: "Chuỗi xử lý: thu data → clean → train → deploy." },
      { term: "MLOps", def: "Vận hành ML production - Docker, CI/CD, monitoring." },
      { term: "API", def: "Application Programming Interface - cách 2 chương trình 'nói chuyện'." },
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
      { label: "Lovable - build app AI bằng chat", url: "https://lovable.dev/" },
      { label: "n8n - workflow tự động kéo thả", url: "https://n8n.io/" },
      { label: "Make.com - kết nối 1500+ apps", url: "https://www.make.com/" },
    ],
  },

  // ============== Bài 10 - Deepfake ==============
  deepfake: {
    vietnamCase: {
      title: "🇻🇳 Vụ giả mạo MC Mai Ngọc VTV (2024)",
      body: "Đầu 2024, kẻ gian dùng deepfake ghép mặt MC Mai Ngọc (VTV) vào video quảng cáo sàn forex lừa đảo, đăng trên Facebook gây thiệt hại hàng tỷ đồng cho người xem cả tin. Công an Hà Nội đã khởi tố vụ án theo Điều 174 Bộ luật Hình sự. Bài học: dù video trông THẬT 99%, hãy verify nguồn chính thức trước khi tin.",
    },
    goldenTip:
      "Mẹo phát hiện deepfake bằng mắt thường trong 5 giây: (1) Bảo người trong video QUAY ĐẦU NGHIÊNG 90° - AI hiện tại còn yếu góc nghiêng. (2) Nhìn răng - thường mờ/dính nhau. (3) Tai có đeo hoa tai không khớp với chuyển động đầu. 3 dấu hiệu này lộ 70% deepfake.",
    glossary: [
      { term: "Deepfake", def: "Video ghép mặt do AI tạo - từ 'deep learning' + 'fake'." },
      { term: "GAN", def: "Generative Adversarial Network - 2 AI 'đấu' nhau để tạo ảnh giả siêu thật." },
      { term: "Face Swap", def: "Thay khuôn mặt A bằng khuôn mặt B trong video." },
      { term: "Voice Cloning", def: "Nhái giọng người khác chỉ từ 3 giây mẫu âm thanh." },
      { term: "Forensic", def: "Pháp y số - soi pixel/noise pattern phát hiện ảnh chỉnh sửa." },
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
      { label: "MIT Detect Fakes - test khả năng phát hiện", url: "https://detectfakes.kellogg.northwestern.edu/" },
      { label: "Deepware Scanner - quét video upload", url: "https://scanner.deepware.ai/" },
      { label: "Reality Defender - AI phát hiện deepfake", url: "https://www.realitydefender.com/" },
    ],
    safetyNote: {
      title: "⚠️ Khi bị/phát hiện deepfake xúc phạm",
      body: "Hành động ngay: (1) Chụp screenshot + lưu URL gốc. (2) Báo nền tảng (Report → impersonation / deepfake). (3) Trình báo công an phường + Cục An toàn TT 0339.829.929. (4) Hotline tư vấn tâm lý 1800.1567 nếu cần hỗ trợ. KHÔNG share lại để cảnh báo - vô tình phát tán thêm.",
    },
  },

  // ============== Bài 11 - AI Agent ==============
  agent: {
    vietnamCase: {
      title: "🇻🇳 FPT.AI Agent cho ngân hàng TPBank",
      body: "TPBank triển khai AI Agent của FPT.AI từ 2023: chatbot xử lý 80% câu hỏi khách hàng (kiểm tra số dư, chuyển khoản, mở thẻ) mà không cần nhân viên. Agent gọi 12 API ngân hàng song song, tự ra quyết định khi nào escalate cho người thật. Tiết kiệm 200 tỷ đồng/năm chi phí call center. Đây là mô hình 'autonomous agent' đầu tiên triển khai production ngân hàng VN.",
    },
    goldenTip:
      "Quy tắc 'STAR' cho agent prompt: Setup (vai trò + bối cảnh) + Tools (liệt kê API agent được dùng) + Action (nhiệm vụ cụ thể) + Result (format output mong muốn). Thiếu Tools agent sẽ 'bịa' công cụ không tồn tại - lỗi #1 khi build agent.",
    glossary: [
      { term: "Agent", def: "AI có vòng lặp 'suy nghĩ → hành động → quan sát'." },
      { term: "Tool Use", def: "Agent gọi API/function bên ngoài (search, gửi mail)." },
      { term: "Chain-of-Thought", def: "AI viết ra suy luận từng bước trước khi trả lời." },
      { term: "ReAct", def: "Pattern: Reasoning + Acting - thinking và using tool xen kẽ." },
      { term: "Multi-Agent", def: "Nhiều agent phối hợp (CEO + Coder + Tester)." },
    ],
    careers: [
      "AI Agent Engineer (siêu hot 2025)",
      "Prompt Engineer Senior",
      "Workflow Automation Specialist",
      "AI Solutions Consultant",
    ],
    homework:
      "Tạo workflow Zapier MIỄN PHÍ: 'Mỗi sáng 7h, đọc tin tức công nghệ TechCrunch → tóm tắt 3 dòng → gửi email cho mình'. Đây là agent đơn giản nhất - và cực hữu ích cho học sinh THPT muốn cập nhật xu hướng.",
    externalDemo: [
      { label: "Zapier - agent workflow no-code", url: "https://zapier.com/" },
      { label: "AutoGPT - agent tự hành open-source", url: "https://github.com/Significant-Gravitas/AutoGPT" },
      { label: "LangChain Hub - 1000+ prompt templates", url: "https://smith.langchain.com/hub" },
    ],
  },

  // ============== Bài 12 - Graduation (PRESENT focus) ==============
  graduation: {
    vietnamCase: {
      title: "🇻🇳 Nguyễn Hà Đông & câu chuyện Flappy Bird",
      body: "Năm 2014, Nguyễn Hà Đông (Hà Nội) ra mắt Flappy Bird - kiếm 50.000 USD/ngày từ quảng cáo, đứng top App Store toàn cầu. Bí quyết không phải code phức tạp mà là STORYTELLING: một con chim, một ống nước, một thông điệp 'thử thách bản thân'. Bài học cho thế hệ AI: công nghệ là phương tiện, CÂU CHUYỆN mới là thứ chinh phục người dùng.",
    },
    goldenTip:
      "Công thức pitch 60 giây thần thánh của Y Combinator: 'Chúng tôi giải quyết [vấn đề] cho [đối tượng] bằng cách [giải pháp]. Khác với [đối thủ], chúng tôi [điểm độc đáo]. Đã có [traction số liệu]'. Em hãy thử viết cho dự án AI của mình - đúng cấu trúc này tỷ lệ thành công x3.",
    glossary: [
      { term: "Pitch Deck", def: "Slide trình bày sản phẩm cho nhà đầu tư (10–15 slide)." },
      { term: "Traction", def: "Số liệu chứng minh sản phẩm có người dùng (DAU, MRR)." },
      { term: "MVP Demo", def: "Trình diễn LIVE sản phẩm - không slide tĩnh." },
      { term: "Storytelling", def: "Kể chuyện thay vì liệt kê tính năng." },
      { term: "Personal Brand", def: "Hình ảnh chuyên môn online - LinkedIn, GitHub, blog." },
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
      { label: "Gamma - sinh slide AI từ prompt", url: "https://gamma.app/" },
      { label: "Pitch.com - pitch deck miễn phí", url: "https://pitch.com/" },
      { label: "Notion - portfolio CV cho dev AI", url: "https://www.notion.so/templates/category/personal-brand" },
    ],
  },

  // ============== Bài 13 - Study Smart ==============
  study: {
    vietnamCase: { title: "🇻🇳 Học sinh chuyên Toán Hà Nội + NotebookLM", body: "Nhóm HS chuyên Toán Hà Nội Amsterdam dùng NotebookLM nạp toàn bộ SGK + đề thi Toán quốc gia 5 năm vào → AI tạo flashcard, tóm tắt, podcast nghe lúc đi học. Kết quả: 18/20 bạn đạt 9+ điểm THPT QG Toán 2024." },
    goldenTip: "Quy tắc 3 bước của thầy Hải: Tự làm trước → Hỏi AI giải thích cách (không phải đáp án) → Kiểm chứng bằng SGK. Nếu bỏ bước 1, em mất 90% kỹ năng tư duy.",
    glossary: [
      { term: "Prompt", def: "Câu lệnh em gửi cho AI. Càng cụ thể, càng đúng." },
      { term: "NotebookLM", def: "AI của Google đọc PDF/tài liệu → tạo tóm tắt, flashcard, podcast." },
      { term: "Hallucination", def: "AI bịa thông tin nghe có vẻ thật - phải luôn kiểm chứng." },
      { term: "Context", def: "Ngữ cảnh em cung cấp (lớp, môn, mục tiêu) - AI dùng để cá nhân hóa." },
    ],
    careers: ["EdTech Product Manager", "AI Tutor Designer", "Prompt Engineer cho giáo dục", "Học liệu AI Specialist"],
    homework: "Mở NotebookLM, upload 1 PDF SGK môn em yếu nhất, yêu cầu AI tạo 10 flashcard + 1 podcast 5 phút. Nghe podcast lúc đi học 3 ngày liên tiếp - kiểm tra điểm số có cải thiện không.",
    externalDemo: [
      { label: "NotebookLM - gia sư đọc PDF", url: "https://notebooklm.google.com/" },
      { label: "ChatGPT - trợ lý đa năng", url: "https://chat.openai.com/" },
      { label: "Khanmigo - gia sư AI của Khan Academy", url: "https://www.khanmigo.ai/" },
    ],
  },

  // ============== Bài 14 - Careers Map ==============
  careers: {
    vietnamCase: { title: "🇻🇳 VinAI tuyển 500 kỹ sư AI 2024–2026", body: "VinAI Research công bố kế hoạch tuyển thêm 500 kỹ sư AI từ 2024–2026, lương từ 30 triệu (junior) đến 150 triệu/tháng (senior). FPT.AI, Zalo AI Lab, VinBigdata, MoMo cũng đang ráo riết tuyển. Việt Nam được Gartner đánh giá là top 5 thị trường AI tăng trưởng nhanh nhất châu Á." },
    goldenTip: "Không cần giỏi Toán đỉnh cao mới làm AI! Prompt Engineer, AI PM, AI UX, AI Linguist - 4 nghề HOT chỉ cần tư duy tốt + tiếng Anh khá + đam mê công nghệ. Quan trọng nhất là chủ động làm dự án nhỏ ngay từ lớp 10.",
    glossary: [
      { term: "AI Engineer", def: "Xây dựng và triển khai model ML - cần Python + Toán." },
      { term: "Prompt Engineer", def: "Thiết kế câu lệnh AI cho doanh nghiệp - không cần code thành thạo." },
      { term: "AI PM", def: "Quản lý sản phẩm AI - kết hợp kinh doanh + công nghệ." },
      { term: "MLOps", def: "Vận hành hạ tầng AI cho công ty - cần biết Docker, K8s, Cloud." },
    ],
    careers: ["AI / ML Engineer (30–80 triệu)", "Data Scientist (25–60 triệu)", "Prompt Engineer (20–50 triệu)", "AI Product Manager (40–100 triệu)", "AI UX Designer (20–45 triệu)"],
    homework: "Vào LinkedIn, tìm 'AI Engineer Vietnam' → đọc 10 JD (job description). Ghi lại 5 kỹ năng được nhắc nhiều nhất. Đây chính là lộ trình tự học của em từ giờ đến hết lớp 12.",
    externalDemo: [
      { label: "VinAI Careers", url: "https://www.vinai.io/careers/" },
      { label: "FPT.AI Careers", url: "https://fpt.ai/career" },
      { label: "TopDev - việc làm IT VN", url: "https://topdev.vn/viec-lam-it/ai-ml" },
    ],
  },

  // ============== Bài 15 - Fact Check ==============
  factcheck: {
    vietnamCase: { title: "🇻🇳 Vụ AI bịa luận án Tiến sĩ tại ĐH HN 2024", body: "Năm 2024, một nghiên cứu sinh ĐH Hà Nội bị phát hiện dùng ChatGPT viết luận án Tiến sĩ với 23 trích dẫn 'sách' KHÔNG TỒN TẠI - AI hoàn toàn bịa ra. Vụ việc gây chấn động giới học thuật. Bài học: AI có thể bịa với độ tự tin 100%, người dùng phải tự kiểm chứng." },
    goldenTip: "4 dấu hiệu AI đang bịa: (1) số liệu cực cụ thể như 2.347.891 người; (2) trích dẫn sách/báo lạ; (3) ngày + tên người + thành tựu quá đẹp; (4) sự kiện lịch sử chi tiết bất thường. Gặp 1 trong 4 → mở Google kiểm tra ngay.",
    glossary: [
      { term: "Hallucination", def: "AI bịa thông tin sai sự thật, nghe rất hợp lý." },
      { term: "Cross-Check", def: "Kiểm chứng bằng nguồn thứ 2 (Wiki, sách, báo)." },
      { term: "Source Citation", def: "Yêu cầu AI dẫn nguồn - nếu không có thì 90% là bịa." },
      { term: "Red Flag", def: "Dấu hiệu đáng nghi cần kiểm chứng ngay." },
    ],
    careers: ["AI Safety Researcher", "Fact-Checking Journalist", "AI Auditor", "Content Moderation Specialist"],
    homework: "Hỏi ChatGPT 5 câu về lịch sử VN có chi tiết (tên người, năm, số liệu). Kiểm chứng từng câu trên Wikipedia tiếng Việt. Đếm xem AI bịa bao nhiêu chi tiết - kết quả sẽ làm em bất ngờ.",
    externalDemo: [
      { label: "Google Scholar - kiểm chứng học thuật", url: "https://scholar.google.com/" },
      { label: "Snopes - fact-check toàn cầu", url: "https://www.snopes.com/" },
      { label: "Wikipedia Vietnam", url: "https://vi.wikipedia.org/" },
    ],
    safetyNote: { title: "⚠️ Cảnh báo quan trọng", body: "KHÔNG BAO GIỜ nộp bài tập / luận văn 100% do AI viết mà chưa kiểm chứng từng trích dẫn. Hậu quả: đuổi học, mất bằng, tổn hại danh tiếng cả đời." },
  },

  // ============== Bài 16 - Digital Safety ==============
  safety: {
    vietnamCase: { title: "🇻🇳 Lừa đảo deepfake voice tại TP.HCM 2024", body: "Tháng 8/2024, Công an TP.HCM ghi nhận 47 vụ lừa đảo bằng giọng AI giả người thân chỉ trong 1 tháng. Tổng thiệt hại hơn 12 tỷ đồng. Thủ đoạn: lấy 3 giây ghi âm từ TikTok/Facebook → AI nhái giọng → gọi điện 'cấp cứu cần chuyển tiền'. Nạn nhân trẻ chiếm 60%." },
    goldenTip: "QUY TẮC VÀNG 3-2-1: Nghi ngờ trong 3 giây → Xác minh qua 2 kênh (gọi số cũ + hỏi người thân khác) → Báo 1 người lớn tin cậy. Áp dụng cho MỌI yêu cầu chuyển tiền / gửi giấy tờ qua điện thoại, chat.",
    glossary: [
      { term: "Deepfake Voice", def: "Giọng AI giả y hệt người thật chỉ từ 3 giây mẫu." },
      { term: "Two-Channel Verify", def: "Xác minh qua kênh thứ 2 trước khi tin." },
      { term: "Grooming", def: "Người lớn dụ dỗ trẻ em qua mạng để lừa đảo / xâm hại." },
      { term: "Phishing", def: "Lừa lấy thông tin cá nhân qua link / chat giả mạo." },
    ],
    careers: ["Cybersecurity Analyst", "Trust & Safety Officer", "Digital Forensics Investigator", "AI Policy Advisor"],
    homework: "Kiểm tra TikTok / Facebook cá nhân: gỡ mọi video / ghi âm có giọng nói em rõ ràng. Hỏi bố mẹ + người thân thiết lập 'mật khẩu gia đình' bí mật - chỉ dùng khi cần xác minh khẩn cấp.",
    externalDemo: [
      { label: "Cục An toàn Thông tin VN", url: "https://www.ais.gov.vn/" },
      { label: "Báo cáo lừa đảo: tinnhiemmang.vn", url: "https://tinnhiemmang.vn/" },
      { label: "Google Take Action", url: "https://safety.google/families/" },
    ],
    safetyNote: { title: "🚨 Số khẩn cấp cần nhớ", body: "Báo lừa đảo: 113 (Công an) hoặc 069.219.6395 (Cục An toàn TT). Bị đe dọa qua mạng: nói ngay với bố mẹ / thầy cô. Không xử lý một mình." },
  },
};
