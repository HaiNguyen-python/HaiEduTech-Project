/**
 * @file motivationLetterOpeners.ts
 * @description Curated opener paragraphs ("hooks") across 6 fields used by the
 *   Inspiration Gallery inside MotivationLetterGuide. Each item includes a
 *   "why it works" deconstruction so students can borrow the technique.
 */
export interface OpenerSample {
  id: string;
  fieldVi: string;
  fieldEn: string;
  gradient: string; // tailwind gradient class
  emoji: string;
  openerEn: string;
  openerVi: string;
  whyItWorksEn: string;
  whyItWorksVi: string;
}

export const OPENER_SAMPLES: OpenerSample[] = [
  {
    id: "engineering",
    fieldVi: "Kỹ thuật",
    fieldEn: "Engineering",
    gradient: "from-sky-500 to-indigo-600",
    emoji: "⚙️",
    openerEn: "At 11pm on the night before our prototype demo, our 3D-printed gear stripped itself in front of a panel of investors - and I realised that mechanical failure is almost never about the metal: it is about the unstated assumption nobody bothered to write down. That collapse, and the redesign that followed, is what makes me want to study Robotics at TU Delft.",
    openerVi: "11 giờ đêm trước buổi demo, bánh răng in 3D của nhóm mình bị tróc răng ngay trước nhà đầu tư - và mình nhận ra: hỏng cơ khí gần như không bao giờ là lỗi vật liệu, mà là một giả định ngầm chưa ai viết ra giấy. Sự sụp đổ đó, và bản thiết kế lại sau đó, là lý do mình muốn học Robotics tại TU Delft.",
    whyItWorksEn: "Concrete sensory detail (3D-printed gear, 11pm), a public stake (investors), and a thesis that names a real program - not a generic field.",
    whyItWorksVi: "Chi tiết cụ thể (bánh răng in 3D, 11h đêm), bối cảnh có 'cọc đặt' (nhà đầu tư), và mệnh đề chính nêu đúng chương trình - không nói chung chung.",
  },
  {
    id: "public-health",
    fieldVi: "Y tế công cộng",
    fieldEn: "Public Health",
    gradient: "from-emerald-500 to-teal-600",
    emoji: "🩺",
    openerEn: "A young mother who had walked nine kilometres to ask whether the second dose of measles vaccine was 'still safe' for her two-year-old taught me, in under three minutes, that the most decisive variable in any health system is rarely biology - it is trust. That conversation is the reason I am applying to the MPH at Karolinska Institutet.",
    openerVi: "Một người mẹ đi bộ chín cây số chỉ để hỏi mũi sởi thứ hai có 'còn an toàn' cho con hai tuổi của chị không - chị đã dạy mình trong chưa đầy ba phút rằng biến số quyết định nhất của một hệ thống y tế hiếm khi là sinh học, mà là niềm tin. Cuộc nói chuyện ấy là lý do mình nộp MPH tại Karolinska Institutet.",
    whyItWorksEn: "Names a real human (the mother), uses a measurable detail (9 km), and reframes the field around an insight - not around the applicant.",
    whyItWorksVi: "Có nhân vật thật (người mẹ), chi tiết đo được (9km), và định nghĩa lại ngành xoay quanh một insight - không xoay quanh bản thân.",
  },
  {
    id: "education",
    fieldVi: "Giáo dục",
    fieldEn: "Education",
    gradient: "from-amber-500 to-orange-600",
    emoji: "📚",
    openerEn: "Minh could decode every English word on the IELTS reading paper and still not tell me what the paragraph meant - and after fourteen years of schooling, nobody before me had asked why. That single fifteen-year-old, finally diagnosed with a specific reading comprehension impairment, is the reason I want to study Learning Problems and Impairments at Leiden.",
    openerVi: "Minh đọc trôi chảy từng chữ trong bài IELTS Reading nhưng không nói được đoạn văn đang nói gì - và sau 14 năm đi học, chưa ai từng hỏi vì sao. Cậu học sinh 15 tuổi ấy, cuối cùng được chẩn đoán có rối loạn đọc hiểu chuyên biệt, là lý do mình muốn học Learning Problems and Impairments tại Leiden.",
    whyItWorksEn: "A small protagonist (one student), an under-stated injustice (14 years undiagnosed), and a precise program name. No vague 'passion for education'.",
    whyItWorksVi: "Nhân vật nhỏ (một học sinh), một bất công nói khẽ (14 năm không được chẩn đoán), tên chương trình chính xác. Không 'đam mê giáo dục' chung chung.",
  },
  {
    id: "cs-ai",
    fieldVi: "Khoa học máy tính / AI",
    fieldEn: "CS / AI",
    gradient: "from-violet-500 to-fuchsia-600",
    emoji: "🤖",
    openerEn: "When my chatbot answered a grieving user with a cheerful joke, I closed the laptop and did not open it for three days. It was the first time I understood that an alignment failure is not a bug report - it is a small moral injury. That weekend is why I want to study Responsible AI at ETH Zürich.",
    openerVi: "Khi chatbot của mình đáp lại một người dùng đang chịu mất mát bằng một câu đùa, mình đóng laptop và không mở lại trong ba ngày. Đó là lần đầu mình hiểu rằng một lỗi alignment không phải là bug report - đó là một tổn thương đạo đức nhỏ. Cuối tuần ấy là lý do mình muốn học Responsible AI tại ETH Zürich.",
    whyItWorksEn: "Vulnerability + technical specificity. 'Alignment failure' signals you read the literature; the moral framing signals maturity.",
    whyItWorksVi: "Có sự tổn thương + thuật ngữ chuyên môn ('alignment failure') chứng tỏ bạn đã đọc tài liệu; cách đóng khung đạo đức cho thấy độ chín.",
  },
  {
    id: "business",
    fieldVi: "Kinh doanh / MBA",
    fieldEn: "Business / MBA",
    gradient: "from-rose-500 to-pink-600",
    emoji: "💼",
    openerEn: "In month four of running our delivery startup, our churn rate jumped 18 points in a single week - and the cause was not the product, the price, or the competitor: it was a 90-second checkout step we had never timed. That number, and the painful operations rebuild that followed, taught me what I cannot learn from a textbook, and is why I am applying to the INSEAD MBA.",
    openerVi: "Tháng thứ tư khởi nghiệp giao hàng, tỉ lệ rời bỏ của khách nhảy 18 điểm chỉ trong một tuần - không phải vì sản phẩm, giá hay đối thủ, mà vì một bước thanh toán 90 giây chưa từng có ai bấm đồng hồ. Con số đó, và đợt 'đập đi xây lại' vận hành sau nó, dạy mình điều sách không dạy nổi - và là lý do mình nộp MBA tại INSEAD.",
    whyItWorksEn: "Specific KPI (18 points, 90 seconds) → credible founder voice. Honest mistake → growth mindset without humblebrag.",
    whyItWorksVi: "KPI cụ thể (18 điểm, 90 giây) → giọng founder đáng tin. Lỗi thật → tư duy trưởng thành, không khoe khéo.",
  },
  {
    id: "arts",
    fieldVi: "Nghệ thuật & Thiết kế",
    fieldEn: "Arts & Design",
    gradient: "from-cyan-500 to-blue-600",
    emoji: "🎨",
    openerEn: "I spent six months photographing the disappearing tile floors of old Hanoi shophouses before I admitted to myself that I was not documenting nostalgia - I was studying the grammar of how a city remembers. That shift, from souvenir to syntax, is what I want to develop into a master's body of work at the Royal College of Art.",
    openerVi: "Mình mất sáu tháng chụp các nền gạch hoa cũ của nhà phố Hà Nội trước khi thừa nhận với chính mình: mình không đang ghi lại nỗi nhớ - mình đang nghiên cứu ngữ pháp của cách một thành phố ghi nhớ. Bước chuyển từ 'kỷ vật' sang 'cú pháp' ấy là thứ mình muốn phát triển thành body of work bậc thạc sĩ tại Royal College of Art.",
    whyItWorksEn: "Sensory image (tile floors) + an intellectual reframe ('grammar', 'syntax'). Shows the candidate already thinks like a researcher-artist.",
    whyItWorksVi: "Hình ảnh giác quan (gạch hoa) + một sự định nghĩa lại tri thức ('ngữ pháp', 'cú pháp'). Cho thấy ứng viên đã tư duy như nghệ sĩ-nghiên cứu.",
  },
];

// ============ Sanity Check helpers ============

export interface SanityIssue {
  type: "cliche" | "length" | "structure";
  severity: "warn" | "error";
  messageVi: string;
  messageEn: string;
  suggestionVi?: string;
  suggestionEn?: string;
  matchedText?: string;
}

export interface SanityReport {
  wordCount: number;
  targetMin: number;
  targetMax: number;
  issues: SanityIssue[];
  score: number; // 0-100
}

const CLICHES: Array<{ regex: RegExp; vi: string; en: string; fixVi: string; fixEn: string }> = [
  {
    regex: /\b(since|ever since|from the time)\s+(i\s+was\s+)?(a\s+)?(young\s+)?child(hood)?\b/i,
    vi: 'Mở đầu "since I was a child / from childhood"',
    en: 'Opener "since I was a child / from childhood"',
    fixVi: "Thay bằng một khoảnh khắc cụ thể trong 2-3 năm gần đây.",
    fixEn: "Replace with a specific moment from the last 2-3 years.",
  },
  {
    regex: /\b(passionate|passion)\s+(about|for)\b/i,
    vi: 'Cụm "passionate about / passion for"',
    en: 'Phrase "passionate about / passion for"',
    fixVi: "Đừng nói bạn đam mê - chứng minh qua một hành động đo được.",
    fixEn: "Don't say you're passionate - prove it with one measurable action.",
  },
  {
    regex: /\b(dream\s+(has\s+)?(come|became)\s+true|life[-\s]?long\s+dream)\b/i,
    vi: 'Cụm "dream came true / lifelong dream"',
    en: 'Phrase "dream came true / lifelong dream"',
    fixVi: "Thay bằng một mục tiêu cụ thể, có deadline.",
    fixEn: "Replace with a concrete, deadline-bound goal.",
  },
  {
    regex: /\b(ever\s+since\s+i\s+can\s+remember|as\s+long\s+as\s+i\s+can\s+remember)\b/i,
    vi: 'Cụm "ever since I can remember"',
    en: 'Phrase "ever since I can remember"',
    fixVi: "Cho một mốc thời gian chính xác (năm, lớp, sự kiện).",
    fixEn: "Give an exact time anchor (year, grade, event).",
  },
  {
    regex: /\b(in\s+today'?s\s+(rapidly\s+changing\s+|globalized\s+|interconnected\s+)?world)\b/i,
    vi: 'Cụm "in today\'s (rapidly changing) world"',
    en: 'Phrase "in today\'s (rapidly changing) world"',
    fixVi: "Bỏ - cụm này không thêm thông tin nào.",
    fixEn: "Delete - this phrase adds zero information.",
  },
  {
    regex: /\b(prestigious|world[-\s]?renowned|world[-\s]?class)\s+(university|institution|program)\b/i,
    vi: "Tâng bốc trường ('prestigious / world-renowned university')",
    en: "Flattering the school ('prestigious / world-renowned university')",
    fixVi: "Bỏ tính từ tâng bốc, đi thẳng vào một môn học / lab cụ thể.",
    fixEn: "Drop the flattery - name a specific course or lab instead.",
  },
  {
    regex: /\b(i\s+would\s+be\s+(deeply\s+|extremely\s+)?(grateful|honou?red)\s+if)\b/i,
    vi: 'Cụm "I would be honored / grateful if"',
    en: 'Phrase "I would be honored / grateful if"',
    fixVi: "Diễn đạt tự tin hơn: 'I look forward to contributing…'",
    fixEn: "Be more confident: 'I look forward to contributing…'",
  },
  {
    regex: /\b(hard[-\s]?working|team\s+player|fast\s+learner|out\s+of\s+the\s+box)\b/i,
    vi: 'Buzzword CV ("hard-working / team player / fast learner")',
    en: 'CV buzzword ("hard-working / team player / fast learner")',
    fixVi: "Thay bằng một bằng chứng cụ thể (con số, dự án).",
    fixEn: "Replace with concrete evidence (a number, a project).",
  },
];

export const analyzeMotivationLetter = (
  text: string,
  targetMin = 500,
  targetMax = 650,
): SanityReport => {
  const cleaned = text.trim();
  const words = cleaned ? cleaned.split(/\s+/).filter(Boolean) : [];
  const wc = words.length;
  const issues: SanityIssue[] = [];

  // Length
  if (wc > 0 && wc < targetMin) {
    issues.push({
      type: "length",
      severity: "warn",
      messageVi: `Quá ngắn: ${wc}/${targetMin} từ tối thiểu.`,
      messageEn: `Too short: ${wc}/${targetMin} min words.`,
      suggestionVi: "Bổ sung thêm chi tiết ở đoạn 2 (Academic Background) hoặc đoạn 3 (Why This Program).",
      suggestionEn: "Add more detail to paragraph 2 (Academic Background) or paragraph 3 (Why This Program).",
    });
  } else if (wc > targetMax) {
    issues.push({
      type: "length",
      severity: "warn",
      messageVi: `Quá dài: ${wc}/${targetMax} từ tối đa - 1 trang A4 chỉ chứa được ~550 từ.`,
      messageEn: `Too long: ${wc}/${targetMax} max - one A4 page only fits ~550 words.`,
      suggestionVi: "Cắt mỗi đoạn 15-20% mà không bỏ chi tiết cụ thể.",
      suggestionEn: "Trim 15-20% from each paragraph without removing concrete details.",
    });
  }

  // Clichés
  for (const c of CLICHES) {
    const m = text.match(c.regex);
    if (m) {
      issues.push({
        type: "cliche",
        severity: "warn",
        messageVi: c.vi,
        messageEn: c.en,
        suggestionVi: c.fixVi,
        suggestionEn: c.fixEn,
        matchedText: m[0],
      });
    }
  }

  // Structure: needs at least one number / quantifier
  if (cleaned && !/\b\d+([.,]\d+)?\s*(%|\/|years?|months?|gpa|usd|eur|£|\$|€)?\b/i.test(cleaned)) {
    issues.push({
      type: "structure",
      severity: "warn",
      messageVi: "Chưa có con số/định lượng - committee tin con số hơn tính từ.",
      messageEn: "No numbers/quantifiers - committees trust numbers more than adjectives.",
      suggestionVi: "Thêm ít nhất 1 con số (GPA, % cải thiện, kích thước dataset, …).",
      suggestionEn: "Add at least one number (GPA, % improvement, dataset size, …).",
    });
  }

  // Score: 100 - 10 per warn - 25 per error - length penalty
  let score = 100;
  issues.forEach((i) => (score -= i.severity === "error" ? 25 : 10));
  if (wc === 0) score = 0;
  score = Math.max(0, Math.min(100, score));

  return { wordCount: wc, targetMin, targetMax, issues, score };
};
