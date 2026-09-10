/**
 * @file lifestyleAcademyLessonsExpansion5.ts
 * @description Fifth expansion pack for the Lifestyle Academy. Fills content
 *              gaps found in the curriculum review: three extra lessons per
 *              original pillar (finance, etiquette, presence, wellness).
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

import type { LifestyleLesson } from "./lifestyleAcademyLessons";

export const LIFESTYLE_LESSONS_EXPANSION_5: LifestyleLesson[] = [
  // ── FINANCE ─────────────────────────────────────────────
  {
    id: "fin-16",
    pillar: "finance",
    level: "foundation",
    minutes: 9,
    medium: "read",
    titleVi: "Đọc phiếu lương và hiểu thuế thu nhập cá nhân",
    titleEn: "Reading a Payslip and Understanding Income Tax",
    subtitleVi:
      "Lương gộp không phải tiền bạn nhận. Biết từng dòng trên phiếu lương giúp bạn không bị trả sai và không bị nộp thừa.",
    subtitleEn:
      "Gross pay is not what lands in your account. Knowing each payslip line stops you being underpaid or overtaxed.",
    takeaways: [
      { vi: "Lương gộp trừ bảo hiểm bắt buộc, trừ thuế thu nhập, cộng phụ cấp bằng lương thực nhận.",
        en: "Gross pay minus mandatory insurance, minus income tax, plus allowances equals net pay." },
      { vi: "Thuế thu nhập cá nhân tính theo bậc luỹ tiến: chỉ phần thu nhập vượt bậc mới chịu thuế suất cao hơn.",
        en: "Personal income tax is progressive: only the income above each bracket pays the higher rate." },
      { vi: "Giảm trừ bản thân và người phụ thuộc làm giảm thu nhập chịu thuế, nhưng phải khai mới được tính.",
        en: "Personal and dependant deductions lower taxable income, but only if you actually register them." },
      { vi: "Lưu mọi phiếu lương và biên lai thuế ít nhất 5 năm; đây là hồ sơ cho vay và cho visa.",
        en: "Keep every payslip and tax receipt for at least 5 years. These are your loan and visa documents." },
      { vi: "Hợp đồng thời vụ thường bị tạm trừ thuế 10%; nếu cả năm dưới ngưỡng, bạn được hoàn lại.",
        en: "Short-term contracts often have 10% withheld; if your annual income is under the threshold you can reclaim it." },
    ],
    frameworkVi:
      "Bảng đối chiếu 5 dòng: Lương gộp - Bảo hiểm - Giảm trừ - Thu nhập chịu thuế - Thực nhận.",
    frameworkEn:
      "A 5-line reconciliation: Gross - Insurance - Deductions - Taxable income - Net pay.",
    reflectionVi:
      "Bạn có thể tự tính lại lương thực nhận tháng trước từ lương gộp mà không cần hỏi ai không?",
    reflectionEn:
      "Could you recompute last month's net pay from your gross pay without asking anyone?",
    drillVi:
      "15 phút: lấy 1 phiếu lương (của bạn hoặc mẫu trên mạng). Dựng bảng 5 dòng và tự tính lại lương thực nhận. So sánh với số trên phiếu.",
    drillEn:
      "15 min: take one payslip (yours or a sample). Build the 5-line table and recompute net pay yourself, then compare with the stated figure.",
    whyItMattersVi:
      "Rất nhiều người đi làm nhiều năm mà chưa từng đọc hiểu phiếu lương của mình, nên không phát hiện được thiếu bảo hiểm hay trừ thuế sai.",
    whyItMattersEn:
      "Many people work for years without ever reading their own payslip, so missing insurance or wrong tax deductions go unnoticed.",
    deepDiveVi: [
      "Sai lầm thường gặp nhất của người mới đi làm là so sánh hai công việc bằng con số lương gộp. Một chỗ trả gộp cao nhưng không đóng bảo hiểm đầy đủ và không có phụ cấp có thể cho thực nhận thấp hơn, đồng thời để lại lỗ hổng trong lịch sử bảo hiểm sau này.",
      "Cơ chế luỹ tiến hay bị hiểu sai thành 'lên bậc là toàn bộ lương bị đánh thuế cao hơn'. Thực tế chỉ phần vượt ngưỡng chịu thuế suất mới, nên việc nhận thêm thu nhập gần như luôn có lợi về tuyệt đối.",
      "Với sinh viên làm thêm, phần bị tạm trừ 10% thường bị coi là mất luôn. Nếu tổng thu nhập cả năm dưới ngưỡng chịu thuế, bạn có thể làm thủ tục hoàn thuế và nhận lại toàn bộ. Việc này cần chứng từ, nên hãy giữ mọi giấy tờ ngay từ công việc đầu tiên.",
    ],
    deepDiveEn: [
      "The most common mistake for new workers is comparing two jobs by gross salary. A job with higher gross pay but incomplete insurance and no allowances can deliver lower net pay while leaving gaps in your future insurance record.",
      "Progressive taxation is often misread as 'moving up a bracket taxes all my income higher'. In reality only the portion above the threshold pays the new rate, so earning more is almost always better in absolute terms.",
      "Students working part time usually treat the 10% withholding as money gone. If your annual income falls under the taxable threshold you can file for a refund and get all of it back. That requires paperwork, so keep every document from your very first job.",
    ],
    illustrationEmojis: ["🧾", "🏦", "📑", "💵"],
  },
  {
    id: "fin-17",
    pillar: "finance",
    level: "intermediate",
    minutes: 10,
    medium: "practice",
    titleVi: "Đàm phán lương cho công việc đầu tiên",
    titleEn: "Negotiating Salary for Your First Job",
    subtitleVi:
      "Con số bạn chốt ở công việc đầu tiên trở thành mốc cho mọi lần tăng sau. Mười phút đàm phán ảnh hưởng nhiều năm.",
    subtitleEn:
      "The number you accept in your first job becomes the base for every later raise. Ten minutes of negotiation echoes for years.",
    takeaways: [
      { vi: "Trước khi nói số, hỏi khoảng lương của vị trí; ai nói số trước thường mất lợi thế.",
        en: "Before naming a number, ask for the role's range. Whoever speaks first usually loses ground." },
      { vi: "Chuẩn bị 3 số: mức mong muốn, mức chấp nhận được, mức từ chối. Viết ra giấy trước buổi họp.",
        en: "Prepare 3 numbers: target, acceptable and walk-away. Write them down before the meeting." },
      { vi: "Dựa vào bằng chứng: dự án đã làm, kết quả đo được, mức thị trường của 3 tin tuyển dụng tương tự.",
        en: "Anchor on evidence: past projects, measurable results, and the market range from 3 similar job posts." },
      { vi: "Nếu lương cứng không tăng được, đàm phán mục khác: đào tạo, thiết bị, ngày phép, xét tăng sau 6 tháng.",
        en: "If base pay is fixed, negotiate elsewhere: training budget, equipment, leave days, a 6-month review." },
      { vi: "Câu an toàn: 'Dựa trên phạm vi công việc và mức thị trường, tôi mong muốn khoảng X. Anh chị thấy thế nào?'",
        en: "A safe line: based on the scope and the market range, I am aiming for around X. How does that sit with you?" },
    ],
    frameworkVi:
      "Chuẩn bị BATNA (Fisher & Ury) cộng bộ ba số Target - Acceptable - Walk-away.",
    frameworkEn:
      "BATNA preparation (Fisher and Ury) plus the Target - Acceptable - Walk-away trio.",
    reflectionVi:
      "Nếu nhà tuyển dụng đưa mức thấp hơn 20% mong đợi, bạn sẽ nói câu gì đầu tiên?",
    reflectionEn:
      "If an employer offers 20% below your target, what exactly would your first sentence be?",
    drillVi:
      "15 phút: tìm 3 tin tuyển dụng cùng vị trí, ghi khoảng lương. Viết 3 số của bạn và tập nói to câu mở đàm phán 3 lần.",
    drillEn:
      "15 min: find 3 job posts for the same role and note their ranges. Write your 3 numbers and say your opening line out loud 3 times.",
    whyItMattersVi:
      "Phần lớn ứng viên trẻ nhận luôn lời đề nghị đầu tiên vì sợ mất cơ hội. Đàm phán lịch sự gần như không bao giờ làm mất lời mời làm việc.",
    whyItMattersEn:
      "Most young candidates accept the first offer out of fear. A polite negotiation almost never costs you the offer.",
    deepDiveVi: [
      "Khái niệm BATNA nghĩa là phương án tốt nhất nếu thương lượng thất bại. Sinh viên mới ra trường thường tin mình không có BATNA, nhưng thực tế BATNA có thể là một tin tuyển dụng khác đang chờ, một khoá học ngắn, hoặc đơn giản là ba tháng tiếp tục tìm việc. Chỉ cần biết mình có phương án, giọng nói của bạn đã khác.",
      "Nếu bị hỏi mức mong muốn ngay đầu buổi, cách xử lý an toàn là trả lại câu hỏi một lần: 'Anh chị có thể cho biết khoảng lương của vị trí này không, để tôi xem có phù hợp với kỳ vọng của mình?' Nếu bị hỏi lần thứ hai, hãy đưa một khoảng chứ đừng đưa một con số duy nhất.",
      "Đàm phán không chỉ về lương. Một khoản ngân sách học 10 triệu mỗi năm hoặc một cam kết xét tăng sau sáu tháng đôi khi có giá trị hơn 500 nghìn mỗi tháng, đặc biệt trong hai năm đầu khi tốc độ học quan trọng hơn thu nhập.",
    ],
    deepDiveEn: [
      "BATNA means your best alternative if the negotiation fails. New graduates often believe they have none, but a BATNA can be another live application, a short course, or simply three more months of searching. Just knowing you have an alternative changes your voice.",
      "If asked for your expectation immediately, the safe move is to return the question once: could you share the range for this role, so I can check it against my expectations? If asked a second time, give a range rather than a single figure.",
      "Negotiation is not only about pay. An annual training budget or a written commitment to a six-month review can be worth more than a small monthly increase, especially in your first two years when learning speed matters more than income.",
    ],
    illustrationEmojis: ["🤝", "📊", "🗣️", "📈"],
  },
  {
    id: "fin-18",
    pillar: "finance",
    level: "intermediate",
    minutes: 9,
    medium: "read",
    titleVi: "Nhận diện lừa đảo trực tuyến và bảo vệ tài khoản",
    titleEn: "Spotting Online Scams and Protecting Your Accounts",
    subtitleVi:
      "Mọi vụ lừa đảo hiện đại đều dùng ba nguyên liệu: gấp gáp, quyền lực và bí mật. Nhận ra ba dấu hiệu đó là đủ.",
    subtitleEn:
      "Every modern scam uses three ingredients: urgency, authority and secrecy. Spotting those three is enough.",
    takeaways: [
      { vi: "Không cơ quan hợp pháp nào yêu cầu chuyển tiền hay đọc mã OTP qua điện thoại.",
        en: "No legitimate authority asks you to transfer money or read an OTP code over the phone." },
      { vi: "Lợi nhuận cam kết cao và không rủi ro là dấu hiệu chắc chắn của mô hình lừa đảo.",
        en: "Guaranteed high returns with no risk is a certain sign of a scam." },
      { vi: "Bật xác thực hai lớp cho email và ngân hàng; email là chìa khoá của mọi tài khoản khác.",
        en: "Enable two-factor authentication on email and banking. Email is the key to every other account." },
      { vi: "Dùng mật khẩu khác nhau cho từng dịch vụ, quản lý bằng trình quản lý mật khẩu chứ không bằng trí nhớ.",
        en: "Use a different password per service, managed by a password manager rather than memory." },
      { vi: "Quy tắc 10 phút: mọi yêu cầu tiền gấp đều phải chờ 10 phút và gọi lại bằng số bạn tự tra.",
        en: "The 10-minute rule: any urgent money request waits 10 minutes while you call back on a number you looked up." },
      { vi: "Nếu đã chuyển tiền, báo ngân hàng trong vòng vài giờ đầu; đó là cửa sổ duy nhất còn cơ hội phong toả.",
        en: "If money has left, tell the bank within the first hours. That is the only window where a freeze may work." },
    ],
    frameworkVi:
      "Bộ ba cảnh báo Urgency - Authority - Secrecy, cộng quy tắc 10 phút và gọi lại số tự tra.",
    frameworkEn:
      "The Urgency - Authority - Secrecy warning triad, plus the 10-minute rule and an independently looked-up callback.",
    reflectionVi:
      "Nếu hôm nay email của bạn bị chiếm, những tài khoản nào sẽ bị mất theo?",
    reflectionEn:
      "If your email were taken over today, which other accounts would fall with it?",
    drillVi:
      "15 phút: bật xác thực hai lớp cho email và ngân hàng. Đổi 3 mật khẩu đang dùng lặp lại. Lưu số hotline chính thức của ngân hàng vào danh bạ.",
    drillEn:
      "15 min: turn on two-factor authentication for email and banking. Change 3 reused passwords. Save your bank's official hotline in your contacts.",
    whyItMattersVi:
      "Người trẻ thường tin mình quá hiểu công nghệ để bị lừa, nhưng các vụ lừa hiện nay nhắm vào cảm xúc chứ không nhắm vào kiến thức kỹ thuật.",
    whyItMattersEn:
      "Young people often assume they are too tech-literate to be scammed, yet modern scams target emotion rather than technical knowledge.",
    deepDiveVi: [
      "Kịch bản phổ biến nhất mở đầu bằng một cuộc gọi nói bạn đang liên quan tới một vụ việc, kèm yêu cầu giữ bí mật vì đang trong quá trình điều tra. Ba yếu tố gấp gáp, quyền lực và bí mật xuất hiện cùng lúc, khiến vùng suy nghĩ chậm của não bị vô hiệu.",
      "Cách phòng vệ hiệu quả nhất không phải học hết mọi hình thức lừa đảo mới, mà là dựng một quy trình cố định: dừng 10 phút, không nói mã, và luôn gọi lại bằng số bạn tự tra trên trang chính thức. Quy trình này vô hiệu hoá cả những kịch bản chưa từng xuất hiện.",
      "Về mặt kỹ thuật, hai lớp bảo vệ tạo ra khác biệt lớn nhất là xác thực hai bước và mật khẩu không lặp. Phần lớn vụ chiếm tài khoản không do bị hack tinh vi, mà do một mật khẩu cũ bị rò rỉ ở dịch vụ khác rồi được thử lại ở email và ngân hàng.",
    ],
    deepDiveEn: [
      "The most common script opens with a call claiming you are linked to a case, plus a demand for secrecy because an investigation is underway. Urgency, authority and secrecy arrive together, which disables the slow-thinking part of the brain.",
      "The best defence is not learning every new scam format but building a fixed procedure: pause 10 minutes, never read out codes, and always call back using a number you looked up on the official site. That procedure defeats scripts that do not exist yet.",
      "Technically, the two layers that matter most are two-step verification and non-reused passwords. Most account takeovers are not sophisticated hacks but an old leaked password from another service retried on your email and bank.",
    ],
    illustrationEmojis: ["🚨", "🔐", "📞", "🛡️"],
  },

  // ── ETIQUETTE ───────────────────────────────────────────
  {
    id: "eti-16",
    pillar: "etiquette",
    level: "foundation",
    minutes: 9,
    medium: "read",
    titleVi: "Phép lịch sự khi viết - Email, tin nhắn và nhóm chat",
    titleEn: "Written Etiquette - Email, Messages and Group Chats",
    subtitleVi:
      "Người đọc chỉ có chữ của bạn, không có giọng và nét mặt. Cấu trúc rõ ràng chính là sự tôn trọng.",
    subtitleEn:
      "Readers only have your words, not your voice or face. Clear structure is itself a form of respect.",
    takeaways: [
      { vi: "Tiêu đề email phải nói việc và hạn: 'Xin xác nhận lịch phỏng vấn trước thứ Năm'.",
        en: "An email subject should state the task and the deadline: request to confirm interview time before Thursday." },
      { vi: "Cấu trúc 4 dòng: chào, việc cần, thông tin nền, câu hỏi hoặc đề nghị cụ thể.",
        en: "A 4-line structure: greeting, the ask, background, then one specific question or request." },
      { vi: "Không gửi một ý thành năm tin nhắn liên tiếp; gộp thành một tin đọc được trong 20 giây.",
        en: "Do not split one idea into five consecutive messages. Combine into one message readable in 20 seconds." },
      { vi: "Trong nhóm chat, nhắc tên người chịu trách nhiệm và ghi rõ hạn, tránh câu 'ai làm giúp với'.",
        en: "In group chats, name the responsible person and the deadline instead of writing 'can someone help'." },
      { vi: "Trả lời trong 24 giờ dù chưa xong việc: 'Tôi đã nhận, sẽ trả lời đầy đủ trước thứ Sáu'.",
        en: "Reply within 24 hours even if unfinished: I have received this and will answer fully before Friday." },
      { vi: "Đọc lại một lượt trước khi gửi; câu viết lúc nóng luôn tốn nhiều thời gian sửa hơn về sau.",
        en: "Reread once before sending. A sentence written while angry always costs more time to repair later." },
    ],
    frameworkVi:
      "Khung BLUF (Bottom Line Up Front) cho email công việc, cộng quy tắc một tin một ý.",
    frameworkEn:
      "The BLUF (Bottom Line Up Front) frame for work email, plus a one-message-one-idea rule.",
    reflectionVi:
      "Email gần nhất bạn gửi cho thầy cô hoặc nhà tuyển dụng: người đọc có biết ngay họ cần làm gì không?",
    reflectionEn:
      "Your most recent email to a teacher or employer: would the reader immediately know what to do?",
    drillVi:
      "12 phút: viết lại 1 email cũ của bạn theo khung 4 dòng, tiêu đề có việc và hạn. So sánh độ dài trước và sau.",
    drillEn:
      "12 min: rewrite one of your old emails in the 4-line frame with a subject naming task and deadline. Compare the length before and after.",
    whyItMattersVi:
      "Phần lớn ấn tượng đầu tiên trong học tập và công việc hiện nay đến từ chữ viết, không từ gặp mặt. Một email rõ ràng mở nhiều cánh cửa hơn bạn tưởng.",
    whyItMattersEn:
      "Most first impressions in study and work now arrive in writing, not in person. A clear email opens more doors than you expect.",
    deepDiveVi: [
      "BLUF là nguyên tắc viết của quân đội Hoa Kỳ: đặt kết luận và yêu cầu ở câu đầu, phần giải thích xuống dưới. Lý do đơn giản là người đọc bận có thể dừng sau câu đầu mà vẫn hành động đúng. Học sinh thường làm ngược lại, kể hoàn cảnh trong sáu câu rồi mới nói cần gì.",
      "Trong nhóm chat, hiện tượng tán loãng trách nhiệm rất mạnh: khi một yêu cầu gửi cho tất cả, nó thực chất không gửi cho ai. Chỉ cần thêm tên người và một hạn cụ thể, tỷ lệ việc được làm tăng rõ rệt.",
      "Một chi tiết nhỏ nhưng thay đổi cảm nhận của người đọc là câu xác nhận đã nhận. Người ta ít khi khó chịu vì phải chờ, họ khó chịu vì không biết mình có đang bị bỏ quên hay không.",
    ],
    deepDiveEn: [
      "BLUF is a United States military writing rule: put the conclusion and the request in the first sentence and push explanation below. The reason is simple, a busy reader can stop after line one and still act correctly. Students usually do the opposite, six sentences of context before the ask.",
      "In group chats, diffusion of responsibility is strong: a request addressed to everyone is effectively addressed to nobody. Adding one name and one deadline measurably raises the chance the task gets done.",
      "One small detail that changes how readers feel is an acknowledgement message. People rarely mind waiting; they mind not knowing whether they have been forgotten.",
    ],
    illustrationEmojis: ["✉️", "💬", "🧷", "⌛"],
  },
  {
    id: "eti-17",
    pillar: "etiquette",
    level: "intermediate",
    minutes: 10,
    medium: "practice",
    titleVi: "Cho và nhận phản hồi - Công thức SBI và cách nghe lời khó",
    titleEn: "Giving and Receiving Feedback - The SBI Formula",
    subtitleVi:
      "Phản hồi tốt nói về hành vi trong một tình huống cụ thể, không nói về tính cách con người.",
    subtitleEn:
      "Good feedback describes behaviour in a specific situation, never a person's character.",
    takeaways: [
      { vi: "SBI: Situation (tình huống), Behaviour (hành vi quan sát được), Impact (ảnh hưởng thực tế).",
        en: "SBI: Situation, observable Behaviour, and real Impact." },
      { vi: "Nói 'trong buổi họp sáng nay, khi anh cắt lời tôi hai lần, tôi mất mạch trình bày' thay vì 'anh vô lễ'.",
        en: "Say 'in this morning's meeting, when you interrupted me twice, I lost my thread' rather than 'you are rude'." },
      { vi: "Xin phép trước khi góp ý: 'Em có thể chia sẻ một quan sát không?' làm giảm phòng vệ đáng kể.",
        en: "Ask permission first. 'May I share one observation?' significantly lowers defensiveness." },
      { vi: "Khi nhận phản hồi, việc đầu tiên là hỏi ví dụ cụ thể, không phải giải thích ngay.",
        en: "When receiving feedback, ask for a concrete example first instead of explaining yourself." },
      { vi: "Tách phản hồi thành ba loại: đánh giá, huấn luyện, ghi nhận; hỏi rõ bạn đang nhận loại nào.",
        en: "Separate feedback into three kinds: evaluation, coaching and appreciation, and ask which one this is." },
      { vi: "Cảm ơn rồi xin 24 giờ suy nghĩ là câu trả lời trưởng thành nhất cho lời phê bình gay gắt.",
        en: "Thanking someone and asking for 24 hours to reflect is the most mature reply to harsh criticism." },
    ],
    frameworkVi:
      "SBI (Center for Creative Leadership) cộng phân loại ba loại phản hồi của Stone & Heen.",
    frameworkEn:
      "SBI (Center for Creative Leadership) plus Stone and Heen's three feedback types.",
    reflectionVi:
      "Lời phê bình nào từng làm bạn tổn thương nhất, và phần nào trong đó thực sự đúng?",
    reflectionEn:
      "Which criticism hurt you most, and which part of it was actually true?",
    drillVi:
      "15 phút: viết 2 phản hồi theo SBI, một cho việc bạn muốn ai đó tiếp tục làm, một cho việc bạn muốn họ thay đổi. Đọc to và cắt hết tính từ về con người.",
    drillEn:
      "15 min: write 2 SBI messages, one for behaviour to continue and one to change. Read them aloud and delete every adjective about the person.",
    whyItMattersVi:
      "Khả năng nhận lời khó mà không sụp đổ hoặc phản đòn quyết định tốc độ tiến bộ của bạn nhanh hơn hầu hết kỹ năng khác.",
    whyItMattersEn:
      "The ability to take hard feedback without collapsing or counter-attacking speeds up your growth more than almost any other skill.",
    deepDiveVi: [
      "SBI ra đời để chữa một lỗi phổ biến: phản hồi trượt từ hành vi sang bản chất. Khi nghe 'em không cẩn thận', người nhận buộc phải bảo vệ danh tính của mình. Khi nghe 'trong bản báo cáo hôm qua có bốn số liệu chưa khớp, khách hàng phải hỏi lại', người nhận chỉ cần sửa bốn số liệu.",
      "Stone và Heen chỉ ra rằng phần lớn xung đột phản hồi xuất phát từ việc hai bên nói hai loại khác nhau. Bạn mong được ghi nhận, người kia đang huấn luyện; bạn nghĩ đang được huấn luyện, thực ra đang bị đánh giá. Một câu hỏi mở đầu giải quyết được điều này.",
      "Với người nhận, chiến lược hiệu quả là tách phần đúng ra khỏi cách nói. Cách nói có thể tệ, ví dụ vẫn có thể chính xác. Người tiến bộ nhanh là người biết lọc hạt kiến thức ra khỏi lớp vỏ khó chịu, thay vì bỏ cả hai.",
    ],
    deepDiveEn: [
      "SBI exists to fix one frequent error: feedback sliding from behaviour into identity. Hearing 'you are careless' forces the listener to defend who they are. Hearing 'in yesterday's report four figures did not match and the client had to ask again' means they only need to fix four figures.",
      "Stone and Heen show that most feedback conflicts start because the two sides are exchanging different types. You wanted appreciation while they were coaching; you thought you were being coached while you were being evaluated. One opening question resolves this.",
      "For the receiver, the effective strategy is separating the valid content from the delivery. The delivery may be bad while the example is still accurate. Fast improvers extract the useful grain from the unpleasant shell instead of discarding both.",
    ],
    illustrationEmojis: ["🪞", "🗣️", "🤲", "🌱"],
  },
  {
    id: "eti-18",
    pillar: "etiquette",
    level: "intermediate",
    minutes: 10,
    medium: "read",
    titleVi: "Bàn ăn và tiếp khách khi ra nước ngoài",
    titleEn: "Dining and Hosting Etiquette Abroad",
    subtitleVi:
      "Bàn ăn là nơi các nền văn hoá bộc lộ rõ nhất. Biết vài quy tắc nền giúp bạn thoải mái thay vì căng thẳng.",
    subtitleEn:
      "The dining table is where cultures show themselves most clearly. A few base rules let you relax instead of tensing up.",
    takeaways: [
      { vi: "Bắc Âu và Đức: đúng giờ tuyệt đối, đến sớm 5 phút, mang quà nhỏ như hoa hoặc bánh.",
        en: "In the Nordics and Germany: strict punctuality, arrive 5 minutes early, bring a small gift like flowers or pastries." },
      { vi: "Nhật: chờ chủ nhà mời trước khi ăn, không cắm đũa dựng đứng, nói cảm ơn trước và sau bữa.",
        en: "Japan: wait for the host's invitation, never stand chopsticks upright, and thank before and after the meal." },
      { vi: "Anh và Mỹ: chia hoá đơn là bình thường; hỏi 'chúng ta chia đều hay từng người?' rất lịch sự.",
        en: "In the UK and US, splitting a bill is normal, and asking whether to split evenly or pay individually is polite." },
      { vi: "Việt Nam và Trung Quốc: người mời thường trả toàn bộ; rót nước cho người lớn tuổi trước khi rót cho mình.",
        en: "In Vietnam and China the host usually pays, and you pour for elders before pouring for yourself." },
      { vi: "Điện thoại úp mặt và để ngoài bàn ở mọi nền văn hoá; đây là quy tắc chung an toàn nhất.",
        en: "Phone face down and off the table works in every culture. It is the safest universal rule." },
      { vi: "Không rõ quy tắc thì quan sát chủ nhà 10 giây và làm theo; bắt chước lịch sự hơn phỏng đoán.",
        en: "When unsure, watch the host for 10 seconds and copy them. Mirroring is politer than guessing." },
    ],
    frameworkVi:
      "Quy tắc Quan sát - Bắt chước - Hỏi khi cần, đặt trên bản đồ văn hoá cao và thấp ngữ cảnh.",
    frameworkEn:
      "An Observe - Mirror - Ask rule set on top of the high-context and low-context culture map.",
    reflectionVi:
      "Trong bữa ăn với người nước ngoài gần nhất, chi tiết nào khiến bạn thấy không chắc chắn nhất?",
    reflectionEn:
      "At your last meal with people from another country, which detail left you least sure of yourself?",
    drillVi:
      "12 phút: chọn 1 quốc gia bạn có thể tới học hoặc làm việc. Viết 6 quy tắc bàn ăn và 3 câu tiếng bản địa: mời, cảm ơn, xin phép rời bàn.",
    drillEn:
      "12 min: pick one country you may study or work in. Write 6 table rules and 3 local phrases: inviting, thanking, and excusing yourself from the table.",
    whyItMattersVi:
      "Nhiều quyết định về học bổng, thực tập và hợp tác được hình thành trong bữa ăn chứ không trong phòng họp.",
    whyItMattersEn:
      "Many decisions about scholarships, internships and partnerships form over a meal rather than in a meeting room.",
    deepDiveVi: [
      "Điểm khác biệt lớn nhất giữa các nền văn hoá bàn ăn không nằm ở dao thìa mà nằm ở mức trực tiếp. Trong nền văn hoá thấp ngữ cảnh như Bắc Âu, khi được hỏi bạn có muốn thêm không, câu trả lời không nghĩa là không. Trong nền văn hoá cao ngữ cảnh, từ chối lần đầu có thể chỉ là phép lịch sự.",
      "Việc trả tiền cũng mang thông điệp khác nhau. Ở Việt Nam, tranh trả tiền là biểu hiện của sự trọng tình; ở Hà Lan hay Phần Lan, cố trả phần của người khác có thể khiến họ thấy bị coi là không tự lo được. Hiểu điều này giúp bạn tránh cả hai hướng mất lịch sự.",
      "Nếu bạn là người mời, ba việc nhỏ tạo cảm giác chuyên nghiệp: hỏi trước về dị ứng và chế độ ăn, gửi địa chỉ kèm giờ rõ ràng, và giới thiệu từng người ở bàn bằng một câu ngắn về việc họ làm.",
    ],
    deepDiveEn: [
      "The biggest difference between dining cultures is not cutlery but directness. In low-context cultures such as the Nordics, when asked whether you want more, no means no. In high-context cultures a first refusal can be pure politeness.",
      "Paying carries different messages too. In Vietnam, competing to pay signals warmth; in the Netherlands or Finland, insisting on covering someone can imply they cannot look after themselves. Knowing this helps you avoid rudeness in either direction.",
      "If you are the host, three small acts read as professional: ask about allergies and diets in advance, send the address with a clear time, and introduce each person at the table with one sentence about what they do.",
    ],
    illustrationEmojis: ["🍽️", "🌏", "🥢", "🎁"],
  },

  // ── PRESENCE ────────────────────────────────────────────
  {
    id: "pre-16",
    pillar: "presence",
    level: "intermediate",
    minutes: 10,
    medium: "read",
    titleVi: "Đứng lên sau thất bại - Quy trình phục hồi 72 giờ",
    titleEn: "Recovering After Failure - A 72-Hour Comeback Routine",
    subtitleVi:
      "Điểm trượt, phỏng vấn thất bại, dự án đổ vỡ. Điều quyết định không phải cú rơi, mà là 72 giờ sau đó.",
    subtitleEn:
      "A failed exam, a lost interview, a collapsed project. What matters is not the fall but the 72 hours after it.",
    takeaways: [
      { vi: "Giờ 0-12: chỉ chăm cơ thể. Ăn, ngủ, đi bộ. Không ra quyết định lớn, không nhắn tin dài.",
        en: "Hours 0-12: care for the body only. Eat, sleep, walk. No big decisions and no long messages." },
      { vi: "Giờ 12-24: viết ra sự việc bằng dữ liệu, tách phần bạn kiểm soát được và phần không.",
        en: "Hours 12-24: write the event as facts, separating what you controlled from what you did not." },
      { vi: "Giờ 24-48: xin phản hồi từ 1 người biết việc; hỏi 'nếu là em, anh chị sẽ làm khác điều gì?'",
        en: "Hours 24-48: ask one informed person for feedback: what would you have done differently in my place?" },
      { vi: "Giờ 48-72: chọn đúng 1 hành động nhỏ và làm ngay để lấy lại cảm giác kiểm soát.",
        en: "Hours 48-72: choose exactly one small action and do it to regain a sense of control." },
      { vi: "Không tổng quát hoá: 'lần này tôi chuẩn bị thiếu phần nghe' khác hẳn 'tôi không có khiếu ngoại ngữ'.",
        en: "Do not generalise: 'this time my listening prep was thin' is very different from 'I have no language talent'." },
      { vi: "Kể lại thất bại đúng một lần cho một người tin cậy; kể mười lần biến nó thành danh tính.",
        en: "Tell the story once to one trusted person. Telling it ten times turns it into an identity." },
    ],
    frameworkVi:
      "Quy trình 72 giờ dựng trên ba chiều lý giải của Martin Seligman: tạm thời, cục bộ, không phải bản chất.",
    frameworkEn:
      "A 72-hour routine built on Martin Seligman's three explanatory dimensions: temporary, specific, not personal.",
    reflectionVi:
      "Thất bại lớn nhất của bạn 2 năm trước: hôm nay nó còn ảnh hưởng gì, và bạn đã học được gì cụ thể?",
    reflectionEn:
      "Your biggest failure two years ago: what impact does it still have today, and what did you concretely learn?",
    drillVi:
      "15 phút: chọn 1 thất bại gần đây. Chia giấy thành 2 cột: điều tôi kiểm soát được và điều ngoài tầm. Viết 1 hành động cho cột thứ nhất và làm hôm nay.",
    drillEn:
      "15 min: pick a recent failure. Split a page into two columns, what I controlled and what I did not. Write one action for the first column and do it today.",
    whyItMattersVi:
      "Ai cũng sẽ thất bại nhiều lần. Người có quy trình phục hồi mất vài ngày, người không có quy trình có thể mất vài năm.",
    whyItMattersEn:
      "Everyone fails repeatedly. People with a recovery routine lose days, people without one can lose years.",
    deepDiveVi: [
      "Martin Seligman nghiên cứu cách con người tự giải thích biến cố xấu và thấy ba chiều quyết định mức độ hồi phục: chuyện này tạm thời hay mãi mãi, chỉ ở một mảng hay ở toàn bộ cuộc sống, và do hoàn cảnh cụ thể hay do bản chất tôi. Cùng một điểm trượt, hai cách kể tạo hai tương lai khác nhau.",
      "Lý do phần đầu của quy trình chỉ tập trung vào cơ thể là vì phán đoán trong 12 giờ đầu gần như luôn sai lệch. Thiếu ngủ và cortisol cao làm mọi việc trông nghiêm trọng hơn thực tế. Rất nhiều quyết định bỏ học, bỏ việc, cắt liên lạc được đưa ra đúng trong khoảng thời gian này.",
      "Bước xin phản hồi khó nhất nhưng cắt ngắn thời gian hồi phục nhiều nhất, vì nó biến một khối cảm xúc mờ thành một danh sách kỹ thuật cụ thể. Khi thất bại có tên gọi rõ ràng, nó không còn là bản án về con người bạn nữa.",
    ],
    deepDiveEn: [
      "Martin Seligman studied how people explain bad events and found three dimensions that shape recovery: is this temporary or permanent, limited to one area or spread across my whole life, and caused by specific circumstances or by who I am. The same failed exam, told two ways, produces two futures.",
      "The routine starts with the body because judgement in the first 12 hours is almost always distorted. Sleep loss and high cortisol make everything look more severe than it is. A great many decisions to quit school, quit jobs or cut off people are made in exactly that window.",
      "Asking for feedback is the hardest step and the one that shortens recovery most, because it converts a blurry emotional mass into a concrete technical list. Once a failure has a precise name, it stops being a verdict about who you are.",
    ],
    illustrationEmojis: ["🌅", "🧱", "📝", "🔁"],
  },
  {
    id: "pre-17",
    pillar: "presence",
    level: "intermediate",
    minutes: 9,
    medium: "practice",
    titleVi: "Đặt giới hạn và nói lời từ chối tử tế",
    titleEn: "Setting Boundaries and Saying No Kindly",
    subtitleVi:
      "Mỗi lời đồng ý là một lời từ chối với việc khác. Nói không rõ ràng và tử tế là kỹ năng bảo vệ thời gian.",
    subtitleEn:
      "Every yes is a no to something else. Saying no clearly and kindly is the skill that protects your time.",
    takeaways: [
      { vi: "Công thức 3 phần: cảm ơn, từ chối rõ ràng, đề xuất phương án thay thế nếu có.",
        en: "A 3-part formula: thank them, refuse clearly, then offer an alternative if one exists." },
      { vi: "Không cần giải thích dài; một câu lý do là đủ, càng dài càng mở đường thương lượng.",
        en: "No long explanation is needed. One sentence of reason is enough; longer invites negotiation." },
      { vi: "Câu mẫu: 'Cảm ơn đã nghĩ tới em. Tuần này em không nhận thêm việc. Sau ngày 20 em có thể giúp.'",
        en: "A model line: thank you for thinking of me. I am not taking on more this week. After the 20th I can help." },
      { vi: "Trả lời chậm là quyền của bạn: 'Để em xem lịch và trả lời trước tối nay' luôn hợp lệ.",
        en: "Delaying is allowed: let me check my schedule and reply before this evening is always valid." },
      { vi: "Giới hạn phải có hậu quả rõ ràng, nếu không nó chỉ là lời đề nghị.",
        en: "A boundary needs a stated consequence, otherwise it is only a request." },
      { vi: "Cảm giác tội lỗi sau khi từ chối là bình thường và giảm dần; nó không có nghĩa bạn sai.",
        en: "Guilt after refusing is normal and fades. It does not mean you were wrong." },
    ],
    frameworkVi:
      "Công thức từ chối 3 phần cộng nguyên tắc giới hạn phải có hậu quả (Nedra Tawwab).",
    frameworkEn:
      "The 3-part refusal formula plus the principle that boundaries need consequences (Nedra Tawwab).",
    reflectionVi:
      "Việc nào bạn đang nhận mà đáng lẽ nên từ chối, và bạn đang trả giá bằng thời gian của điều gì?",
    reflectionEn:
      "Which commitment should you have refused, and what is it costing you time away from?",
    drillVi:
      "12 phút: viết 3 lời từ chối theo công thức 3 phần cho 3 tình huống thật. Đọc to từng câu và cắt bỏ mọi lời xin lỗi thừa.",
    drillEn:
      "12 min: write 3 refusals in the 3-part formula for 3 real situations. Read each aloud and cut every unnecessary apology.",
    whyItMattersVi:
      "Người luôn đồng ý dần trở thành người không ai tin để giao việc quan trọng, vì họ luôn quá tải và trễ hạn.",
    whyItMattersEn:
      "People who always say yes gradually become people nobody trusts with important work, because they are permanently overloaded and late.",
    deepDiveVi: [
      "Điểm khó của việc từ chối không phải câu chữ mà là niềm tin bên dưới: nếu tôi nói không, người ta sẽ nghĩ tôi ích kỷ. Thực tế trong công việc, người từ chối rõ ràng và giữ đúng cam kết còn lại được tin nhiều hơn người nhận hết rồi làm dở.",
      "Giới hạn không có hậu quả thì chỉ là lời đề nghị. Nói 'anh đừng gọi em sau 10 giờ đêm' mà vẫn bắt máy lúc 11 giờ nghĩa là giới hạn đó không tồn tại. Hậu quả không cần gay gắt: không bắt máy, trả lời sáng hôm sau là đủ.",
      "Với văn hoá coi trọng quan hệ như Việt Nam, phần đề xuất phương án thay thế rất quan trọng. Nó cho người kia thấy bạn từ chối việc, không từ chối con người, và giữ được quan hệ dài hạn trong khi vẫn giữ thời gian của mình.",
    ],
    deepDiveEn: [
      "The hard part of refusing is not the wording but the belief underneath: if I say no, they will think I am selfish. In practice, at work, someone who refuses clearly and delivers on what remains is trusted more than someone who accepts everything and delivers poorly.",
      "A boundary without a consequence is merely a request. Saying 'please do not call me after 10pm' while answering at 11 means the boundary does not exist. The consequence need not be harsh: not answering and replying next morning is enough.",
      "In relationship-focused cultures the alternative-offer step matters a lot. It shows the other person you are refusing the task rather than them, which preserves the long-term relationship while protecting your time.",
    ],
    illustrationEmojis: ["🚧", "🙏", "⌚", "🧘"],
  },
  {
    id: "pre-18",
    pillar: "presence",
    level: "mastery",
    minutes: 11,
    medium: "read",
    titleVi: "Quản lý năng lượng theo tuần thay vì quản lý thời gian",
    titleEn: "Managing Energy Across the Week Instead of Managing Time",
    subtitleVi:
      "Lịch của bạn có thể kín mà vẫn không tạo ra kết quả, nếu việc khó bị đặt vào giờ năng lượng thấp.",
    subtitleEn:
      "A full calendar can still produce nothing if hard work sits in your low-energy hours.",
    takeaways: [
      { vi: "Xác định 2 khung giờ đỉnh của bạn trong ngày và bảo vệ chúng cho việc khó nhất.",
        en: "Identify your 2 peak windows each day and defend them for your hardest work." },
      { vi: "Xếp việc theo loại năng lượng: sáng tạo, phân tích, giao tiếp, hành chính, không xếp theo mức độ gấp.",
        en: "Group tasks by energy type - creative, analytical, social, administrative - not by urgency." },
      { vi: "Gộp việc cùng loại vào cùng buổi để giảm chi phí chuyển ngữ cảnh.",
        en: "Batch similar tasks into the same session to cut context-switching costs." },
      { vi: "Một tuần cần ít nhất 1 buổi trống hoàn toàn; đó là nơi hấp thụ mọi việc phát sinh.",
        en: "Every week needs at least one fully empty session to absorb whatever comes up." },
      { vi: "Theo dõi năng lượng 1-5 bốn lần mỗi ngày trong 1 tuần trước khi thiết kế lại lịch.",
        en: "Rate energy 1-5 four times a day for one week before redesigning your schedule." },
      { vi: "Nghỉ chủ động 15 phút giữa hai khối mạnh có giá trị hơn 3 giờ làm việc lờ đờ liên tục.",
        en: "A deliberate 15-minute break between two strong blocks beats 3 hours of foggy continuous work." },
    ],
    frameworkVi:
      "Energy Management (Loehr & Schwartz) áp dụng theo bản đồ năng lượng 7 ngày và gộp việc theo loại.",
    frameworkEn:
      "Energy management (Loehr and Schwartz) applied through a 7-day energy map and task batching.",
    reflectionVi:
      "Giờ nào trong ngày bạn làm việc khó tốt nhất, và tuần này bạn đã dùng giờ đó cho việc gì?",
    reflectionEn:
      "Which hour of the day do you do hard work best, and what did you actually spend it on this week?",
    drillVi:
      "20 phút: vẽ bảng 7 ngày × 4 mốc giờ. Điền mức năng lượng dự đoán 1-5. Chuyển 2 việc khó nhất tuần sau vào 2 ô điểm cao nhất.",
    drillEn:
      "20 min: draw a 7-day by 4-slot grid and fill in predicted energy 1-5. Move next week's 2 hardest tasks into the 2 highest-scoring slots.",
    whyItMattersVi:
      "Thời gian là hằng số, năng lượng thì thay đổi và có thể tái tạo. Ai quản lý năng lượng thắng người chỉ quản lý lịch.",
    whyItMattersEn:
      "Time is fixed, energy varies and can be renewed. Whoever manages energy beats whoever only manages a calendar.",
    deepDiveVi: [
      "Loehr và Schwartz làm việc với vận động viên đỉnh cao và nhận thấy điều họ tối ưu không phải số giờ tập mà là chu kỳ căng và hồi phục. Áp dụng cho học tập, một tuần gồm bốn khối căng có hồi phục đầy đủ tạo ra nhiều tiến bộ hơn mười khối căng nối liền nhau.",
      "Chi phí chuyển ngữ cảnh thường bị bỏ qua vì nó vô hình. Một buổi chiều xen kẽ đọc tài liệu, trả lời tin nhắn, làm bài tập và gọi điện có thể tiêu tốn nhiều năng lượng hơn một buổi chỉ làm bài tập, dù tổng lượng việc ít hơn.",
      "Buổi trống trong tuần không phải sự xa xỉ mà là van an toàn. Lịch kín 100% chắc chắn sẽ vỡ, và khi vỡ, việc bị đẩy lùi thường là việc quan trọng nhưng không gấp, tức là chính việc tạo ra tương lai của bạn.",
    ],
    deepDiveEn: [
      "Loehr and Schwartz worked with elite athletes and found what they optimised was not training hours but cycles of stress and recovery. Applied to studying, a week of four hard blocks with real recovery produces more progress than ten hard blocks back to back.",
      "Context-switching costs are ignored because they are invisible. An afternoon alternating between reading, replying to messages, doing exercises and taking calls can drain more energy than an afternoon of exercises alone, even with less total work done.",
      "An empty session is not a luxury but a safety valve. A 100% full calendar will break, and when it breaks the tasks pushed out are usually important but not urgent, which is exactly the work that builds your future.",
    ],
    illustrationEmojis: ["🔋", "📅", "🌊", "🧭"],
  },

  // ── WELLNESS ────────────────────────────────────────────
  {
    id: "wel-16",
    pillar: "wellness",
    level: "foundation",
    minutes: 8,
    medium: "read",
    titleVi: "Bảo vệ mắt và cột sống trong đời sống màn hình",
    titleEn: "Protecting Your Eyes and Spine in a Screen-Heavy Life",
    subtitleVi:
      "Học 8 tiếng trước màn hình mỗi ngày cần một bộ quy tắc, giống như thể thao cần khởi động.",
    subtitleEn:
      "Eight hours a day in front of a screen needs a rule set, just as sport needs a warm-up.",
    takeaways: [
      { vi: "Quy tắc 20-20-20: mỗi 20 phút, nhìn vật cách 20 feet (khoảng 6 mét) trong 20 giây.",
        en: "The 20-20-20 rule: every 20 minutes, look at something 20 feet (about 6 metres) away for 20 seconds." },
      { vi: "Đỉnh màn hình ngang tầm mắt, cách mặt bằng một sải tay, hơi nghiêng ra sau 10 độ.",
        en: "Top of the screen at eye level, an arm's length away, tilted back about 10 degrees." },
      { vi: "Nháy mắt có ý thức: khi tập trung, tần số nháy giảm tới 60% gây khô mắt.",
        en: "Blink deliberately. Focused work can cut blink rate by up to 60%, drying the eyes." },
      { vi: "Cứ 45 phút đứng lên 2 phút; cột sống chịu tải tĩnh kém hơn chịu tải thay đổi.",
        en: "Stand for 2 minutes every 45; the spine tolerates changing load better than static load." },
      { vi: "Ba động tác chống gù: kéo vai ra sau, ngửa cổ nhẹ, gập hông đứng chạm ngón chân.",
        en: "Three anti-slouch moves: shoulder retractions, gentle neck extensions, and standing toe reaches." },
      { vi: "Ánh sáng phòng phải sáng bằng hoặc hơn màn hình; màn hình sáng trong phòng tối gây mỏi nhanh nhất.",
        en: "Room light should match or exceed screen brightness. A bright screen in a dark room tires eyes fastest." },
    ],
    frameworkVi:
      "Bộ ba 20-20-20, quy tắc ba góc vuông cho tư thế ngồi, và nhịp đứng 45/2.",
    frameworkEn:
      "The 20-20-20 rule, the three right angles posture rule, and a 45/2 standing rhythm.",
    reflectionVi:
      "Cuối ngày học, phần nào của cơ thể bạn đau trước nhất: mắt, cổ, vai hay lưng dưới?",
    reflectionEn:
      "At the end of a study day, which part hurts first: eyes, neck, shoulders or lower back?",
    drillVi:
      "10 phút: điều chỉnh bàn ghế theo ba góc vuông (khuỷu, hông, đầu gối). Kê màn hình lên sách cho đúng tầm mắt. Đặt hẹn 20 phút một lần trong 2 giờ tới.",
    drillEn:
      "10 min: adjust desk and chair to three right angles (elbows, hips, knees). Raise the screen on books to eye level. Set a 20-minute reminder for the next 2 hours.",
    whyItMattersVi:
      "Mỏi mắt và đau cổ vai làm giảm thời gian học được mỗi ngày nhiều hơn hầu hết học sinh nhận ra, và tích tụ thành vấn đề dài hạn.",
    whyItMattersEn:
      "Eye strain and neck pain cut daily study capacity more than most students realise, and accumulate into long-term problems.",
    deepDiveVi: [
      "Hội chứng thị giác màn hình gồm khô mắt, mờ tạm thời và đau đầu vùng trán. Nguyên nhân chính không phải ánh sáng xanh mà là hai yếu tố cơ học: mắt giữ tiêu cự gần quá lâu và tần số nháy giảm mạnh. Vì thế biện pháp hiệu quả nhất là đổi khoảng cách tiêu cự định kỳ, không phải mua kính lọc.",
      "Về tư thế, ba góc vuông là mốc dễ nhớ nhất: khuỷu tay, hông và đầu gối đều khoảng 90 độ, hai bàn chân chạm sàn. Nếu ghế quá cao, kê chân bằng chồng sách; nếu bàn quá cao, nâng ghế và kê chân. Chi phí bằng không nhưng thay đổi rõ trong một tuần.",
      "Đầu người nặng khoảng 5 kg ở vị trí trung tính, nhưng khi chúi về trước 45 độ, lực tác động lên cột sống cổ tăng lên nhiều lần. Đó là lý do việc nhìn điện thoại trong lòng gây đau cổ nhanh hơn cả việc ngồi máy tính lâu.",
    ],
    deepDiveEn: [
      "Computer vision syndrome includes dry eyes, temporary blur and frontal headaches. The main cause is not blue light but two mechanical factors: holding a near focus too long and a sharply reduced blink rate. So the most effective fix is periodically changing focal distance, not buying filter glasses.",
      "For posture, three right angles is the easiest anchor: elbows, hips and knees near 90 degrees with both feet on the floor. If the chair is too high, rest your feet on a stack of books; if the desk is too high, raise the chair and support your feet. Zero cost, visible difference within a week.",
      "A human head weighs roughly 5 kg in a neutral position, but tilted forward 45 degrees the load on the cervical spine multiplies. That is why looking at a phone in your lap causes neck pain faster than long computer sessions.",
    ],
    illustrationEmojis: ["👀", "🪑", "🧍", "💡"],
  },
  {
    id: "wel-17",
    pillar: "wellness",
    level: "foundation",
    minutes: 9,
    medium: "read",
    titleVi: "Nước và dinh dưỡng đơn giản cho ngày học dài",
    titleEn: "Hydration and Simple Nutrition for Long Study Days",
    subtitleVi:
      "Không cần chế độ ăn phức tạp. Ba nguyên tắc về nước, đạm và chỉ số đường huyết đủ giữ đầu bạn sáng cả ngày.",
    subtitleEn:
      "You do not need a complex diet. Three rules on water, protein and glycaemic load keep your head clear all day.",
    takeaways: [
      { vi: "Mất khoảng 2% nước cơ thể đã làm giảm khả năng tập trung và tăng cảm giác mệt.",
        en: "Losing around 2% of body water already reduces concentration and increases fatigue." },
      { vi: "Đặt bình nước 1 lít trên bàn và uống hết trước trưa; đo lường dễ hơn ước lượng.",
        en: "Keep a 1-litre bottle on the desk and finish it before noon. Measuring beats guessing." },
      { vi: "Bữa sáng có đạm (trứng, sữa chua, đậu) giữ đường huyết ổn định hơn bánh mì ngọt.",
        en: "A protein breakfast (eggs, yoghurt, beans) holds blood sugar steadier than sweet pastries." },
      { vi: "Cơm trắng nhiều kèm nước ngọt gây tụt đường huyết sau 60-90 phút, đúng lúc bắt đầu học chiều.",
        en: "A big white-rice meal with soda triggers a slump 60-90 minutes later, right as afternoon study starts." },
      { vi: "Bữa nhẹ tốt cho buổi học: hạt, chuối, sữa chua không đường, trứng luộc.",
        en: "Good study snacks: nuts, a banana, unsweetened yoghurt, a boiled egg." },
      { vi: "Cà phê trước 14 giờ và tối đa 2 ly; caffeine có thời gian bán rã 5-6 giờ.",
        en: "Coffee before 2pm and at most 2 cups. Caffeine has a 5-6 hour half-life." },
    ],
    frameworkVi:
      "Ba trục đơn giản: đủ nước theo bình đo, đạm mỗi bữa, hạn chế tinh bột nhanh vào giữa ngày.",
    frameworkEn:
      "Three simple axes: measured hydration, protein at every meal, and limited fast carbohydrates midday.",
    reflectionVi:
      "Bạn thường buồn ngủ vào giờ nào, và bạn đã ăn gì khoảng 90 phút trước đó?",
    reflectionEn:
      "What time do you usually get sleepy, and what did you eat about 90 minutes earlier?",
    drillVi:
      "10 phút: ghi lại 3 bữa hôm qua. Khoanh bữa thiếu đạm. Lên kế hoạch bữa sáng mai có đạm và đặt bình 1 lít lên bàn học.",
    drillEn:
      "10 min: write down yesterday's 3 meals and circle the one without protein. Plan a protein breakfast for tomorrow and put a 1-litre bottle on your desk.",
    whyItMattersVi:
      "Rất nhiều buổi học kém hiệu quả bị gán cho thiếu động lực, trong khi nguyên nhân thật chỉ là thiếu nước và một bữa ăn sai thời điểm.",
    whyItMattersEn:
      "Many unproductive study sessions get blamed on motivation when the real cause is dehydration and one badly timed meal.",
    deepDiveVi: [
      "Cảm giác khát xuất hiện muộn hơn mức mất nước có ý nghĩa, nên chờ khát mới uống là chậm. Cách kiểm tra đơn giản là màu nước tiểu: vàng nhạt là ổn, vàng đậm là đã thiếu. Với học sinh dùng máy lạnh hoặc học ngoài trời nóng, nhu cầu tăng thêm rõ rệt.",
      "Về đường huyết, điều quan trọng không phải tránh tinh bột mà là tránh tinh bột đơn độc. Cùng một bát cơm, nếu ăn kèm đạm và rau thì tốc độ hấp thu chậm lại và đường huyết không nhảy vọt rồi rơi. Đây là lý do bữa trưa cân bằng giữ bạn tỉnh táo tới chiều.",
      "Caffeine không tạo thêm năng lượng, nó chỉ chặn tín hiệu buồn ngủ tích tụ. Uống muộn nghĩa là tín hiệu bị chặn vào đúng lúc cần cho giấc ngủ, và giấc ngủ kém lại làm hôm sau cần thêm caffeine. Cắt vòng lặp này bằng một mốc giờ cố định là thay đổi rẻ nhất bạn có thể làm.",
    ],
    deepDiveEn: [
      "Thirst appears later than meaningful fluid loss, so waiting until you feel thirsty is already late. A simple check is urine colour: pale yellow is fine, dark yellow means you are behind. Air conditioning or hot outdoor conditions raise the need noticeably.",
      "On blood sugar, the point is not avoiding carbohydrates but avoiding carbohydrates alone. The same bowl of rice eaten with protein and vegetables is absorbed more slowly, so glucose does not spike and crash. That is why a balanced lunch keeps you alert into the afternoon.",
      "Caffeine does not add energy, it blocks the accumulated sleepiness signal. Drinking late blocks that signal exactly when sleep needs it, and poor sleep then demands more caffeine tomorrow. Breaking the loop with one fixed cut-off time is the cheapest change available.",
    ],
    illustrationEmojis: ["💧", "🥚", "🍌", "☕"],
  },
  {
    id: "wel-18",
    pillar: "wellness",
    level: "intermediate",
    minutes: 8,
    medium: "practice",
    titleVi: "Vận động xen kẽ - Những khoảng 3 phút cứu ngày học dài",
    titleEn: "Movement Snacks - The 3-Minute Breaks That Save a Study Day",
    subtitleVi:
      "Không có thời gian tới phòng gym vẫn không sao. Sáu khoảng vận động 3 phút mỗi ngày đủ đổi tình trạng cơ thể.",
    subtitleEn:
      "No time for the gym is fine. Six 3-minute movement snacks a day are enough to change how your body feels.",
    takeaways: [
      { vi: "Sau bữa ăn, đi bộ 5-10 phút giúp hạ đỉnh đường huyết và giảm buồn ngủ buổi chiều.",
        en: "A 5-10 minute walk after meals lowers the glucose peak and reduces afternoon drowsiness." },
      { vi: "Bộ 3 phút cơ bản: 20 squat, 10 chống đẩy vào tường, 30 giây plank, 10 vươn tay lên cao.",
        en: "A basic 3-minute set: 20 squats, 10 wall push-ups, a 30-second plank, 10 overhead reaches." },
      { vi: "Sáu khoảng 3 phút rải trong ngày cộng lại nhiều hơn một buổi tập 15 phút bỏ dở.",
        en: "Six 3-minute snacks across the day add up to more than one abandoned 15-minute workout." },
      { vi: "Gắn vận động vào việc đã có: mỗi lần đi vệ sinh làm 10 squat, mỗi lần đun nước làm 10 chống đẩy tường.",
        en: "Anchor movement to existing habits: 10 squats each bathroom trip, 10 wall push-ups while the kettle boils." },
      { vi: "Cầu thang thay thang máy là bài Zone 2 miễn phí và không cần đổi quần áo.",
        en: "Stairs instead of the lift are free Zone 2 work and need no change of clothes." },
      { vi: "Ba tuần đầu chỉ cần giữ được nhịp; tăng khối lượng sau khi thói quen đã đứng vững.",
        en: "For the first three weeks only keep the rhythm. Increase volume after the habit holds." },
    ],
    frameworkVi:
      "Exercise Snacking kết hợp Habit Stacking (BJ Fogg): gắn mỗi khoảng 3 phút vào một hành vi đã có.",
    frameworkEn:
      "Exercise snacking combined with habit stacking (BJ Fogg): anchor each 3-minute snack to an existing behaviour.",
    reflectionVi:
      "Hôm qua bạn ngồi liên tục dài nhất bao nhiêu phút, và điều gì khiến bạn đứng lên?",
    reflectionEn:
      "What was your longest unbroken sitting stretch yesterday, and what finally made you stand up?",
    drillVi:
      "10 phút: chọn 3 hành vi bạn làm mỗi ngày. Gắn 1 động tác 30 giây vào mỗi hành vi. Làm thử đủ 3 lần hôm nay và đánh dấu vào lịch.",
    drillEn:
      "10 min: pick 3 daily behaviours and attach one 30-second movement to each. Complete all 3 today and tick them on a calendar.",
    whyItMattersVi:
      "Ngồi liên tục nhiều giờ ảnh hưởng tới sức khoẻ theo cách mà một buổi tập cuối tuần không bù lại được. Điều quan trọng là tần suất ngắt quãng, không phải cường độ.",
    whyItMattersEn:
      "Hours of unbroken sitting affects health in ways one weekend workout cannot offset. What matters is how often you break it, not how hard you train.",
    deepDiveVi: [
      "Khái niệm vận động xen kẽ xuất phát từ quan sát rằng lợi ích của vận động đến từ tổng khối lượng và từ việc ngắt các đợt ngồi dài, chứ không bắt buộc phải gói vào một buổi tập liên tục. Điều này cực kỳ có lợi cho học sinh và người làm việc bàn giấy vì nó xoá bỏ lý do không có thời gian.",
      "Đi bộ sau ăn là ví dụ rõ nhất về tỷ lệ lợi ích trên công sức. Chỉ mười phút đi chậm quanh nhà làm giảm rõ rệt đỉnh đường huyết sau bữa, và chính đỉnh đường huyết đó là nguyên nhân của cảm giác nặng đầu đầu giờ chiều.",
      "Habit stacking của BJ Fogg giải quyết phần khó nhất là nhớ làm. Thay vì dựa vào ý chí, bạn dùng một hành vi đã tự động làm điểm khởi phát: sau khi đánh răng, sau khi mở máy tính, sau khi đun nước. Sau khoảng ba tuần, chuỗi này chạy mà không cần nghĩ.",
    ],
    deepDiveEn: [
      "Exercise snacking comes from the observation that the benefits of movement follow total volume and the breaking of long sitting bouts, rather than requiring one continuous session. That is extremely useful for students and desk workers because it removes the no-time excuse.",
      "A post-meal walk is the clearest example of benefit per unit of effort. Ten slow minutes around the house measurably lowers the after-meal glucose peak, and that peak is what produces the heavy-headed feeling in early afternoon.",
      "BJ Fogg's habit stacking solves the hardest part, remembering to do it. Instead of relying on willpower you use an already automatic behaviour as the trigger: after brushing teeth, after opening the laptop, after boiling water. After about three weeks the chain runs without thought.",
    ],
    illustrationEmojis: ["🚶", "🏋️", "🪜", "⏱️"],
  },
];
