// Topic-based speaking tips for the Situations tab.
// Derives 3-4 takeaway tips from a situation's title/description keywords.

export interface SituationTip {
  en: string;
  vi: string;
}

interface TipRule {
  keywords: string[];
  tips: SituationTip[];
}

const RULES: TipRule[] = [
  {
    keywords: ["opening", "open a presentation", "hook", "introduction", "intro"],
    tips: [
      { en: "Hook in the first 10 seconds with a question, statistic, or short story.", vi: "Mở đầu trong 10 giây bằng câu hỏi, số liệu hoặc câu chuyện ngắn." },
      { en: "Preview your agenda in 3 clear points so the audience knows what's coming.", vi: "Giới thiệu dàn ý 3 điểm rõ ràng để khán giả biết bài nói có gì." },
      { en: "Smile and pause after your first sentence; confidence is felt, not rushed.", vi: "Mỉm cười và ngắt nhịp sau câu đầu; sự tự tin nằm ở việc không vội." },
    ],
  },
  {
    keywords: ["closing", "conclusion", "wrap", "ending", "end a presentation"],
    tips: [
      { en: "End with a 1-sentence call to action so the audience knows the next step.", vi: "Kết bằng 1 câu kêu gọi hành động để khán giả biết bước tiếp theo." },
      { en: "Recap 3 key takeaways instead of summarising every slide.", vi: "Tóm tắt 3 điểm chính thay vì lặp lại toàn bộ slide." },
      { en: "Thank the audience first, then invite questions; don't blur the two.", vi: "Cảm ơn khán giả trước rồi mới mời hỏi; đừng gộp vào nhau." },
    ],
  },
  {
    keywords: ["q&a", "qa", "questions", "handling questions", "objection"],
    tips: [
      { en: "Repeat the question before answering to buy thinking time.", vi: "Nhắc lại câu hỏi trước khi trả lời để có thêm thời gian suy nghĩ." },
      { en: "If you don't know, say 'Let me follow up on that' instead of guessing.", vi: "Nếu chưa biết, hãy nói 'Tôi sẽ gửi lại sau' thay vì đoán bừa." },
      { en: "Bridge tough questions back to your key message: 'That ties into…'.", vi: "Kéo câu hỏi khó về thông điệp chính: 'Điều này liên quan đến…'." },
    ],
  },
  {
    keywords: ["data", "chart", "slide", "visual", "graph", "statistic"],
    tips: [
      { en: "Read the axis first, then the trend, then the insight - in that order.", vi: "Đọc trục trước, rồi đến xu hướng, cuối cùng là kết luận - theo thứ tự." },
      { en: "Pair each number with a comparison so it feels meaningful.", vi: "Mỗi con số nên đi kèm phép so sánh để có sức nặng." },
      { en: "Use 'increased by' for change and 'reached' for milestones.", vi: "Dùng 'increased by' cho mức tăng và 'reached' cho cột mốc." },
    ],
  },
  {
    keywords: ["meeting", "kickoff", "agenda", "stand-up", "standup"],
    tips: [
      { en: "Share the agenda in chat before talking so everyone aligns fast.", vi: "Gửi agenda lên chat trước khi nói để mọi người căn nhanh." },
      { en: "Park off-topic items: 'Let's take that offline.'", vi: "Gác chuyện ngoài lề: 'Mình bàn riêng nhé.'" },
      { en: "Close with owners and deadlines, never just 'we'll figure it out'.", vi: "Kết bằng người phụ trách và deadline, không nói chung chung." },
    ],
  },
  {
    keywords: ["negotiation", "negotiate", "deal", "price", "salary"],
    tips: [
      { en: "Let the other side name a number first when you can.", vi: "Để bên kia nêu con số trước nếu có thể." },
      { en: "Anchor with a range, not a single point: 'between X and Y'.", vi: "Neo bằng khoảng giá, đừng chốt 1 con số: 'từ X đến Y'." },
      { en: "Trade, don't concede: 'If you can do A, I can do B.'", vi: "Trao đổi, đừng nhượng bộ: 'Nếu bạn làm A, tôi làm B.'" },
    ],
  },
  {
    keywords: ["interview", "job interview", "candidate"],
    tips: [
      { en: "Use STAR: Situation, Task, Action, Result - in 60-90 seconds.", vi: "Áp dụng STAR: Hoàn cảnh, Nhiệm vụ, Hành động, Kết quả - trong 60-90 giây." },
      { en: "Quantify results: '%', 'time saved', 'users impacted'.", vi: "Định lượng kết quả: '%', 'thời gian tiết kiệm', 'số người dùng'." },
      { en: "Prepare 2 thoughtful questions about the team, not just the role.", vi: "Chuẩn bị 2 câu hỏi sâu về đội nhóm, không chỉ về vị trí." },
    ],
  },
  {
    keywords: ["smalltalk", "small talk", "networking", "introduce yourself", "self-introduction"],
    tips: [
      { en: "Open with a shared context: the venue, the weather, the speaker.", vi: "Mở đầu bằng điểm chung: địa điểm, thời tiết, diễn giả." },
      { en: "Ask open questions ('What brings you here?'), not yes/no.", vi: "Hỏi câu mở ('Điều gì đưa bạn tới đây?'), tránh có/không." },
      { en: "Exit gracefully: 'It was great chatting - let's stay in touch.'", vi: "Rút lui khéo: 'Rất vui được trò chuyện - mình giữ liên lạc nhé.'" },
    ],
  },
  {
    keywords: ["email", "writing", "report", "memo"],
    tips: [
      { en: "Lead with the ask in the first line; details after.", vi: "Đặt yêu cầu chính ngay câu đầu; chi tiết để sau." },
      { en: "One email = one purpose. Split if you need two answers.", vi: "Một email = một mục đích. Tách ra nếu cần hai câu trả lời." },
      { en: "End with a clear next step and a deadline.", vi: "Kết bằng bước tiếp theo rõ ràng và deadline." },
    ],
  },
  {
    keywords: ["feedback", "review", "performance"],
    tips: [
      { en: "Describe behaviour, not personality: 'When you did X, the impact was Y.'", vi: "Mô tả hành vi, không phán xét tính cách: 'Khi bạn làm X, kết quả là Y.'" },
      { en: "Give one strength for every area to improve to keep balance.", vi: "Mỗi điểm cần cải thiện đi kèm một điểm mạnh để giữ cân bằng." },
      { en: "Close by agreeing on one concrete change, not five.", vi: "Kết thúc bằng một thay đổi cụ thể, không phải năm." },
    ],
  },
  {
    keywords: ["complaint", "customer", "support", "apologise", "apologize"],
    tips: [
      { en: "Acknowledge feelings before facts: 'I understand this is frustrating.'", vi: "Ghi nhận cảm xúc trước sự việc: 'Tôi hiểu điều này gây khó chịu.'" },
      { en: "Own the issue with 'we', solve with 'I'.", vi: "Nhận trách nhiệm bằng 'we', giải pháp dùng 'I'." },
      { en: "Promise only what you can deliver - then follow up in writing.", vi: "Chỉ hứa điều có thể làm - và gửi xác nhận bằng văn bản." },
    ],
  },
  {
    keywords: ["storytelling", "story", "narrative", "anecdote"],
    tips: [
      { en: "Use the 3-act shape: setup → tension → resolution.", vi: "Áp dụng 3 hồi: bối cảnh → mâu thuẫn → giải quyết." },
      { en: "Name one character so the audience has someone to root for.", vi: "Đặt tên một nhân vật để khán giả có người để theo." },
      { en: "End with the lesson; don't make the audience guess.", vi: "Kết bằng bài học; đừng để khán giả tự đoán." },
    ],
  },
];

const DEFAULT_TIPS: SituationTip[] = [
  { en: "Slow down 10% - clarity beats speed in any conversation.", vi: "Nói chậm lại 10% - rõ ràng quan trọng hơn tốc độ." },
  { en: "Mirror the other person's key word once; it builds rapport instantly.", vi: "Lặp lại một từ khoá của đối phương; tạo thiện cảm tức thì." },
  { en: "Close every exchange with one concrete next step.", vi: "Kết mỗi đoạn hội thoại bằng một bước tiếp theo cụ thể." },
];

export function getSituationTips(title?: string, descriptionEn?: string, descriptionVi?: string): SituationTip[] {
  const hay = `${title ?? ""} ${descriptionEn ?? ""} ${descriptionVi ?? ""}`.toLowerCase();
  for (const rule of RULES) {
    if (rule.keywords.some((k) => hay.includes(k))) return rule.tips;
  }
  return DEFAULT_TIPS;
}
