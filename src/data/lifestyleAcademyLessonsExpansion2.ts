/**
 * @file lifestyleAcademyLessonsExpansion2.ts
 * @description Second depth & breadth expansion for the Lifestyle Academy.
 *              Adds 3 more mastery-tier lessons per pillar (12 total),
 *              bringing each pillar to 11 lessons and the catalogue to 44.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

import type { LifestyleLesson } from "./lifestyleAcademyLessons";

export const LIFESTYLE_LESSONS_EXPANSION_2: LifestyleLesson[] = [
  // ── FINANCE ─────────────────────────────────────────────
  {
    id: "fin-09",
    pillar: "finance",
    level: "mastery",
    minutes: 12,
    medium: "read",
    titleVi: "Thuế cá nhân thông minh - 4 đòn bẩy hợp pháp mà 90% người trẻ bỏ lỡ",
    titleEn: "Smart Personal Tax - 4 Legal Levers 90% of Young Earners Miss",
    subtitleVi:
      "Thu nhập không bằng thu nhập sau thuế. Người giàu không kiếm nhiều hơn, họ giữ được nhiều hơn nhờ cấu trúc thuế đúng.",
    subtitleEn:
      "Gross income is not take-home income. The wealthy do not earn more - they keep more through the right tax structure.",
    takeaways: [
      { vi: "Đòn bẩy 1: Tài khoản hưu trí ưu đãi thuế (401k/IRA/quỹ hưu tự nguyện) - tiết kiệm 22-32% ngay lập tức.",
        en: "Lever 1: Tax-advantaged retirement accounts (401k/IRA/voluntary pension) - save 22-32% instantly." },
      { vi: "Đòn bẩy 2: Chi phí giáo dục và sức khoẻ được khấu trừ - lưu hoá đơn ngay từ tháng 1.",
        en: "Lever 2: Education and health expenses are deductible - archive receipts from January." },
      { vi: "Đòn bẩy 3: Đăng ký hộ kinh doanh cá thể cho thu nhập phụ - chuyển từ thuế TNCN sang thuế khoán.",
        en: "Lever 3: Register a sole proprietorship for side income - shift from progressive PIT to flat tax." },
      { vi: "Đòn bẩy 4: Chọn đúng thời điểm bán tài sản - giữ >1 năm ở nhiều nước = thuế thấp hơn hẳn.",
        en: "Lever 4: Time asset sales - holding over 1 year in many jurisdictions cuts capital-gains tax significantly." },
      { vi: "Sai lầm phổ biến: 'né thuế' phi pháp thay vì 'tối ưu thuế' hợp pháp - rủi ro pháp lý phá huỷ nhiều năm tích luỹ.",
        en: "Common mistake: illegal tax evasion instead of legal tax optimisation - one audit undoes years of savings." },
      { vi: "Nguyên tắc vàng: cứ mỗi 1.000 USD thuế tiết kiệm hợp pháp = 1.000 USD đầu tư miễn phí.",
        en: "Golden rule: every $1,000 in legal tax savings = $1,000 of free capital to invest." },
    ],
    frameworkVi:
      "Ma trận 4-đòn-bẩy: Trì hoãn (defer) - Khấu trừ (deduct) - Chuyển đổi (convert) - Định thời (time).",
    frameworkEn:
      "The 4-Lever Matrix: Defer - Deduct - Convert - Time.",
    reflectionVi:
      "Năm ngoái bạn đã trả bao nhiêu thuế TNCN? Nếu bạn tiết kiệm được 20% hợp pháp, số đó có thể trở thành gì sau 20 năm lãi kép?",
    reflectionEn:
      "How much personal income tax did you pay last year? If you legally saved 20% of that, what could it become after 20 years of compounding?",
    drillVi:
      "Cuối tuần: liệt kê 12 khoản chi lớn năm ngoái, đánh dấu khoản nào có thể khấu trừ. Đặt lịch quý để nạp tài khoản hưu trí.",
    drillEn:
      "This weekend: list your 12 biggest expenses last year, mark which are deductible, and set a quarterly reminder to fund a retirement account.",
  },
  {
    id: "fin-10",
    pillar: "finance",
    level: "mastery",
    minutes: 11,
    medium: "read",
    titleVi: "Tâm lý đầu tư - Vì sao IQ cao vẫn thua thị trường",
    titleEn: "Investor Psychology - Why High IQ Still Loses to the Market",
    subtitleVi:
      "Nghiên cứu Dalbar cho thấy nhà đầu tư cá nhân trung bình chỉ đạt 3-4% khi thị trường trả 10% - khoảng cách này là 'thuế cảm xúc'.",
    subtitleEn:
      "Dalbar research shows the average retail investor earns 3-4% when the market returns 10% - that gap is the 'emotion tax'.",
    takeaways: [
      { vi: "Loss aversion: mất 100 đau gấp 2 lần niềm vui được 100 - đây là lý do bạn bán đáy.",
        en: "Loss aversion: losing $100 hurts twice as much as gaining $100 - this is why you sell at the bottom." },
      { vi: "Recency bias: gán trọng số quá lớn cho tin tức 30 ngày gần nhất - đây là lý do bạn mua đỉnh.",
        en: "Recency bias: overweighting the last 30 days of news - this is why you buy at the top." },
      { vi: "Herding: theo đám đông là chiến lược sinh tồn cổ đại, nhưng là chiến lược thua trên thị trường.",
        en: "Herding: following the crowd was an ancient survival strategy but is a losing market strategy." },
      { vi: "Chỉ số biến động (VIX) là thước đo sợ hãi - dùng nó ngược lại (mua khi VIX > 30).",
        en: "The VIX is the fear gauge - use it inversely (buy when VIX > 30)." },
      { vi: "Bộ đệm 72 giờ: giữa 'muốn giao dịch' và 'thực hiện lệnh' - 80% quyết định bốc đồng biến mất.",
        en: "The 72-hour buffer: between 'want to trade' and 'place the order' - 80% of impulse decisions vanish." },
    ],
    frameworkVi:
      "Bản đồ Kahneman: Hệ thống 1 (nhanh, cảm xúc) chọn cổ phiếu; Hệ thống 2 (chậm, phân tích) chọn danh mục.",
    frameworkEn:
      "Kahneman's Map: System 1 (fast, emotional) picks stocks; System 2 (slow, analytical) picks portfolios.",
    reflectionVi:
      "Lần gần nhất bạn mua/bán vì cảm xúc - nếu chờ 72 giờ, quyết định có thay đổi không?",
    reflectionEn:
      "The last time you traded emotionally - had you waited 72 hours, would you still have pressed the button?",
    drillVi:
      "30 ngày: viết nhật ký giao dịch. Trước mỗi lệnh, ghi 3 lý do và mức cảm xúc 1-10. Xem lại vào cuối tháng.",
    drillEn:
      "30 days: keep a trade journal. Before each order, write 3 rationales and rate emotion 1-10. Review at month end.",
  },
  {
    id: "fin-11",
    pillar: "finance",
    level: "mastery",
    minutes: 12,
    medium: "read",
    titleVi: "Bảo hiểm đúng cách - Chi ít, phủ lớn, tránh 3 cái bẫy phổ biến",
    titleEn: "Insurance Done Right - Pay Less, Cover More, Dodge 3 Common Traps",
    subtitleVi:
      "Bảo hiểm là chuyển giao rủi ro thảm hoạ, không phải sản phẩm đầu tư. Nhầm lẫn hai điều này khiến người trẻ mua sai hàng thập kỷ.",
    subtitleEn:
      "Insurance is catastrophic-risk transfer, not an investment product. Confusing the two costs young people decades of returns.",
    takeaways: [
      { vi: "Ưu tiên 3 loại: sức khoẻ, tai nạn nghiêm trọng, và nhân thọ có thời hạn (term life) - đủ cho 90% nhu cầu.",
        en: "Prioritise three: health, critical illness/accident, and term life - covers 90% of real needs." },
      { vi: "Bẫy 1: 'Bảo hiểm liên kết đầu tư' (ULIP) tính phí 30-60% năm đầu; term life + đầu tư chỉ số hiệu quả hơn 4-6x.",
        en: "Trap 1: Unit-linked policies charge 30-60% fees year 1; term life + index investing outperforms 4-6x." },
      { vi: "Bẫy 2: Mua thiếu (dưới 10 lần thu nhập năm) - biến 'bảo hiểm' thành 'quà an ủi'.",
        en: "Trap 2: Underinsuring (under 10x annual income) turns 'insurance' into a 'consolation gift'." },
      { vi: "Bẫy 3: Không cập nhật người thụ hưởng sau hôn nhân/ly hôn/sinh con - hồ sơ pháp lý sẽ đấu tranh nhiều năm.",
        en: "Trap 3: Not updating beneficiaries after marriage/divorce/birth - legal claims can drag on for years." },
      { vi: "Nguyên tắc chi phí: tổng phí bảo hiểm nên < 5-8% thu nhập ròng.",
        en: "Cost rule: total premiums should stay under 5-8% of net income." },
    ],
    frameworkVi:
      "Ma trận 'Xác suất × Hậu quả': chỉ bảo hiểm khi xác suất thấp nhưng hậu quả thảm hoạ; còn lại - tự bảo hiểm bằng quỹ khẩn cấp.",
    frameworkEn:
      "The 'Probability × Consequence' Matrix: insure only low-probability catastrophic events; self-insure the rest via emergency fund.",
    reflectionVi:
      "Nếu bạn qua đời hôm nay, gia đình có đủ tiền sống trong 10 năm để ổn định không?",
    reflectionEn:
      "If you passed away today, would your family have enough to live stably for the next 10 years?",
    drillVi:
      "Tuần này: liệt kê tất cả bảo hiểm hiện có, tính tổng phí/năm, so với 10 lần thu nhập. Nếu thiếu, xin báo giá term life.",
    drillEn:
      "This week: list every current policy, sum annual premiums, compare cover to 10x income. If short, request term life quotes.",
  },

  // ── ETIQUETTE ───────────────────────────────────────────
  {
    id: "eti-09",
    pillar: "etiquette",
    level: "mastery",
    minutes: 11,
    medium: "read",
    titleVi: "Đàm phán không đối đầu - Công thức Chris Voss (cựu FBI)",
    titleEn: "Non-adversarial Negotiation - The Chris Voss (Ex-FBI) Formula",
    subtitleVi:
      "Đàm phán hay không phải là 'thắng-thua' mà là 'phát hiện thông tin ẩn'. Cựu chuyên gia bắt cóc FBI dạy 4 công cụ ngôn ngữ ai cũng dùng được.",
    subtitleEn:
      "Great negotiation is not win-lose - it is uncovering hidden information. An ex-FBI hostage negotiator teaches four linguistic tools anyone can use.",
    takeaways: [
      { vi: "Mirroring: lặp lại 3 từ cuối câu đối phương - họ nói tiếp và tiết lộ nhiều hơn.",
        en: "Mirroring: repeat the last 3 words the other person said - they keep talking and reveal more." },
      { vi: "Labeling: 'Có vẻ như anh đang lo về X…' - gọi tên cảm xúc làm giảm cường độ 40%.",
        en: "Labeling: 'It seems you're worried about X…' - naming an emotion cuts its intensity by 40%." },
      { vi: "Câu hỏi hiệu chuẩn: 'Làm sao tôi có thể làm điều đó?' - chuyển gánh nặng giải pháp về phía họ.",
        en: "Calibrated questions: 'How am I supposed to do that?' - shifts the burden of solutions to them." },
      { vi: "'Không' là điểm khởi đầu, không phải kết thúc - người ta cần cảm giác kiểm soát trước khi hợp tác.",
        en: "'No' is the start, not the end - people need to feel in control before they cooperate." },
      { vi: "Giọng DJ đêm khuya: trầm, chậm, xuống ở cuối câu - hạ nhịp tim đối phương 5-10 nhịp/phút.",
        en: "Late-night DJ voice: low, slow, falling at sentence end - lowers the other's heart rate by 5-10 bpm." },
    ],
    frameworkVi:
      "Mô hình 'Tactical Empathy' - Chris Voss (Never Split the Difference).",
    frameworkEn:
      "The 'Tactical Empathy' Model - Chris Voss (Never Split the Difference).",
    reflectionVi:
      "Cuộc đàm phán gần nhất bạn thất bại - bạn đã cố 'thắng' hay đã cố 'hiểu'?",
    reflectionEn:
      "In your most recent failed negotiation - were you trying to 'win', or trying to 'understand'?",
    drillVi:
      "7 ngày: dùng mirroring 3 lần/ngày trong hội thoại thường - quan sát người khác nói dài hơn bao nhiêu %.",
    drillEn:
      "7 days: use mirroring 3x/day in casual conversation - measure how much longer people speak.",
  },
  {
    id: "eti-10",
    pillar: "etiquette",
    level: "mastery",
    minutes: 10,
    medium: "read",
    titleVi: "Ứng xử số - Etiquette trong email, chat và video call năm 2026",
    titleEn: "Digital Etiquette - Email, Chat & Video Call Manners for 2026",
    subtitleVi:
      "70% giao tiếp công việc giờ đây là văn bản. Người tinh tế online được thăng chức trước - đơn giản vì họ đỡ tốn thời gian của người khác.",
    subtitleEn:
      "70% of work communication is now written. Digitally graceful people get promoted first - simply because they save others' time.",
    takeaways: [
      { vi: "Email: dòng chủ đề = tóm tắt hành động, không phải chủ đề. 'Cần duyệt trước 5PM thứ 6' thay vì 'Câu hỏi'.",
        en: "Email: subject line = action summary, not topic. 'Need approval by Fri 5PM' beats 'Question'." },
      { vi: "Chat: một tin nhắn = một suy nghĩ. Đừng 'Chào anh' - đợi - 'Rảnh không?' - đợi - hỏi.",
        en: "Chat: one message = one thought. Never 'Hi' - wait - 'Are you free?' - wait - ask." },
      { vi: "Video call: camera ngang mắt, ánh sáng trước mặt, tắt mic mặc định - báo hiệu bạn tôn trọng thời gian tập thể.",
        en: "Video call: camera at eye level, light in front, default mute - signals respect for group time." },
      { vi: "'Reply-all' chỉ dùng khi mọi người đều cần hành động; ngược lại - 'reply' đơn.",
        en: "'Reply-all' only when everyone needs to act - otherwise just 'reply'." },
      { vi: "Tin nhắn muộn: '(gửi giờ này để tôi khỏi quên - không cần trả lời ngay)' - vàng cho quan hệ.",
        en: "Late-hour message: 'sending now so I don't forget - no need to reply until tomorrow' - relationship gold." },
    ],
    frameworkVi:
      "Nguyên tắc R.O.I. số: Respect (tôn trọng thời gian) - Optimise (tối ưu số chữ) - Intent (nói rõ hành động cần).",
    frameworkEn:
      "Digital R.O.I. Principle: Respect (their time) - Optimise (word count) - Intent (state the ask clearly).",
    reflectionVi:
      "10 email cuối bạn gửi - dòng chủ đề nào giúp người nhận biết ngay phải làm gì?",
    reflectionEn:
      "Your last 10 emails - which subject lines told the reader exactly what to do?",
    drillVi:
      "1 tuần: viết mọi email theo cấu trúc TL;DR (2 dòng) - Context - Ask - Deadline. Đo lường thời gian phản hồi.",
    drillEn:
      "1 week: write every email as TL;DR (2 lines) - Context - Ask - Deadline. Measure reply time.",
  },
  {
    id: "eti-11",
    pillar: "etiquette",
    level: "mastery",
    minutes: 11,
    medium: "read",
    titleVi: "Nghệ thuật nói 'Không' - 5 khuôn mẫu giữ mối quan hệ mà vẫn giữ ranh giới",
    titleEn: "The Art of Saying 'No' - 5 Templates That Preserve Both Relationship and Boundary",
    subtitleVi:
      "Người luôn nói 'có' không phải người tốt bụng - họ là người kiệt sức và bực bội thầm lặng. Kỹ năng nói không đúng cách là dấu hiệu của trưởng thành.",
    subtitleEn:
      "People who always say 'yes' are not kind - they are burnt out and quietly resentful. Skilful 'no' is a mark of maturity.",
    takeaways: [
      { vi: "Khuôn 1 - Kính-Từ chối-Định hướng: 'Cảm ơn đã nghĩ đến mình. Lần này mình không tham gia được. Nhưng anh X có thể phù hợp.'",
        en: "Template 1 - Honour-Decline-Redirect: 'Thanks for thinking of me. I can't join this one. But X may be a fit.'" },
      { vi: "Khuôn 2 - Chưa phải bây giờ: 'Không phải không - chỉ là chưa. Hỏi lại mình vào tháng 3 nhé.'",
        en: "Template 2 - Not now: 'It's not a no - it's a not now. Please re-ask me in March.'" },
      { vi: "Khuôn 3 - Ngân sách rõ ràng: 'Tuần này mình đã kín; nếu thêm việc, mình phải bỏ Y - anh muốn ưu tiên cái nào?'",
        en: "Template 3 - Transparent capacity: 'My week is full - to add this, I'd drop Y. Which do you want prioritised?'" },
      { vi: "Khuôn 4 - Giá trị đối lập: 'Việc này rất quý, nhưng đi ngược với mục tiêu Q1 mình đã cam kết với sếp.'",
        en: "Template 4 - Values clash: 'This is meaningful, but it conflicts with the Q1 goal I committed to my manager.'" },
      { vi: "Khuôn 5 - Im lặng chủ động: 24-48h không trả lời, sau đó phản hồi ngắn - phần lớn 'ask' tự biến mất.",
        en: "Template 5 - Active silence: 24-48h no reply, then a short response - many asks self-dissolve." },
      { vi: "Nguyên tắc gốc: mỗi 'có' với người khác là một 'không' với chính bạn.",
        en: "Root principle: every 'yes' to others is a 'no' to yourself." },
    ],
    frameworkVi:
      "Mô hình 'Positive No' - William Ury (đồng tác giả Getting to Yes): Yes-No-Yes (giá trị-ranh giới-lối đi).",
    frameworkEn:
      "The 'Positive No' Model - William Ury (co-author of Getting to Yes): Yes-No-Yes (value-limit-path).",
    reflectionVi:
      "Lần cuối bạn nói 'có' rồi hối hận - cảm xúc nào bên trong đã che mờ tiếng 'không'?",
    reflectionEn:
      "The last time you said 'yes' and regretted it - which inner emotion silenced the 'no'?",
    drillVi:
      "7 ngày: nói 'không' ít nhất 2 lần với yêu cầu nhỏ. Viết nhật ký cảm xúc trước và sau - so sánh dự đoán vs thực tế.",
    drillEn:
      "7 days: say 'no' at least twice to small requests. Journal emotions before and after - compare predictions to reality.",
  },

  // ── PRESENCE ────────────────────────────────────────────
  {
    id: "pre-09",
    pillar: "presence",
    level: "mastery",
    minutes: 12,
    medium: "read",
    titleVi: "Điểm neo tâm trí - Kỹ thuật giữ bình tĩnh trong 90 giây đầu khủng hoảng",
    titleEn: "Mental Anchoring - Staying Calm in the First 90 Seconds of Any Crisis",
    subtitleVi:
      "Nghiên cứu của Jill Bolte Taylor: một phản ứng cảm xúc thô chỉ tồn tại 90 giây - vượt qua nó là kỹ năng có thể huấn luyện.",
    subtitleEn:
      "Jill Bolte Taylor's research: a raw emotional reaction lasts only 90 seconds - riding it out is a trainable skill.",
    takeaways: [
      { vi: "Giây 0-15: cảm nhận vị trí cơ thể (chân chạm đất) - kích hoạt vỏ não trước, ức chế hạch hạnh nhân.",
        en: "Seconds 0-15: feel body location (feet on ground) - activates prefrontal cortex, dampens amygdala." },
      { vi: "Giây 15-45: đặt tên cảm xúc bằng 2 từ ('Tôi đang giận và sợ') - fMRI cho thấy giảm 40% hoạt động cảm xúc.",
        en: "Seconds 15-45: name emotion in 2 words ('I feel angry and afraid') - fMRI shows 40% drop in emotional activity." },
      { vi: "Giây 45-90: hít thở 4-7-8 (4 vào, 7 giữ, 8 ra) - kích hoạt dây thần kinh phế vị, giảm nhịp tim.",
        en: "Seconds 45-90: 4-7-8 breath (4 in, 7 hold, 8 out) - activates vagus nerve, lowers heart rate." },
      { vi: "Sau 90 giây: câu hỏi hiệu chuẩn 'Điều tệ nhất có thể xảy ra là gì, và tôi sẽ vẫn ổn chứ?'",
        en: "After 90 seconds: calibrated question 'What's the worst that can happen, and will I still be okay?'" },
      { vi: "Nguyên lý: bạn không kiểm soát được cảm xúc đến, nhưng kiểm soát được cảm xúc ở lại.",
        en: "Principle: you cannot control emotions arriving - you can control emotions staying." },
    ],
    frameworkVi:
      "Quy tắc 90 giây - Jill Bolte Taylor + Chuỗi Body-Label-Breath-Reframe.",
    frameworkEn:
      "The 90-Second Rule - Jill Bolte Taylor + the Body-Label-Breath-Reframe chain.",
    reflectionVi:
      "Khủng hoảng gần nhất bạn phản ứng vội - nếu chờ 90 giây, phản ứng sẽ khác không?",
    reflectionEn:
      "The last crisis you reacted to quickly - would your response differ if you had waited 90 seconds?",
    drillVi:
      "14 ngày: mỗi khi cảm xúc mạnh xuất hiện, bấm giờ 90 giây - chỉ hành động sau đó. Ghi nhật ký kết quả.",
    drillEn:
      "14 days: whenever a strong emotion hits, set a 90-second timer - act only after. Journal the outcomes.",
  },
  {
    id: "pre-10",
    pillar: "presence",
    level: "mastery",
    minutes: 11,
    medium: "read",
    titleVi: "Nghi lễ buổi sáng của người bản lĩnh - 5 khối 20 phút thay đổi cả ngày",
    titleEn: "The Composed Person's Morning Ritual - Five 20-Minute Blocks That Reshape a Day",
    subtitleVi:
      "Bạn không cần dậy 4h sáng. Bạn cần một chuỗi nghi lễ ngắn, ổn định, đưa hệ thần kinh về trạng thái nền tảng trước khi thế giới yêu cầu bạn.",
    subtitleEn:
      "You do not need to wake at 4AM. You need a short, consistent ritual that sets your nervous system to baseline before the world demands anything.",
    takeaways: [
      { vi: "Khối 1 - Ánh sáng (10-20 phút): ánh nắng trực tiếp vào mắt trong 10 phút đầu - reset đồng hồ sinh học (Huberman).",
        en: "Block 1 - Light (10-20 min): direct sunlight in the first 10 minutes - resets circadian clock (Huberman)." },
      { vi: "Khối 2 - Chuyển động (10-20 phút): đi bộ nhanh hoặc bài tập kháng lực nhẹ - kích hoạt dopamine nền.",
        en: "Block 2 - Movement (10-20 min): brisk walk or light resistance - primes baseline dopamine." },
      { vi: "Khối 3 - Nạp nước và đạm (10 phút): 500ml nước + 25-30g đạm - ổn định đường huyết đến trưa.",
        en: "Block 3 - Hydration and protein (10 min): 500ml water + 25-30g protein - stable glucose until noon." },
      { vi: "Khối 4 - Viết 3 dòng (5-10 phút): 1 điều biết ơn, 1 điều muốn kiểm soát, 1 điều buông bỏ.",
        en: "Block 4 - Three-line journal (5-10 min): 1 gratitude, 1 thing to control, 1 thing to release." },
      { vi: "Khối 5 - Deep-work 90 phút: không họp, không tin nhắn, một công việc quan trọng nhất trong ngày.",
        en: "Block 5 - 90-min deep work: no meetings, no messages, the single most important task of the day." },
      { vi: "Nguyên tắc gốc: khối lớn nhất phải rơi vào 3 giờ đầu sau khi thức - đây là 'giờ vàng nhận thức'.",
        en: "Root rule: your biggest block belongs in the first 3 hours after waking - the 'cognitive prime hours'." },
    ],
    frameworkVi:
      "Chuỗi 5 khối 'Sunlight-Move-Fuel-Reflect-Deep' - dựa trên Andrew Huberman + Cal Newport.",
    frameworkEn:
      "The 5-block chain 'Sunlight-Move-Fuel-Reflect-Deep' - based on Andrew Huberman + Cal Newport.",
    reflectionVi:
      "60 phút đầu ngày hôm qua - bạn đã cho, hay đã lấy, từ hệ thần kinh của mình?",
    reflectionEn:
      "The first 60 minutes of yesterday - did you deposit, or withdraw, from your nervous system?",
    drillVi:
      "14 ngày: thực hiện tối thiểu 3 trong 5 khối. Chấm điểm năng lượng lúc 2PM (1-10). So sánh trước và sau.",
    drillEn:
      "14 days: complete at least 3 of the 5 blocks. Score your 2PM energy (1-10). Compare before vs after.",
  },
  {
    id: "pre-11",
    pillar: "presence",
    level: "mastery",
    minutes: 12,
    medium: "read",
    titleVi: "Ranh giới nội tâm - Phân biệt 'bạn' với 'suy nghĩ của bạn' (ACT therapy)",
    titleEn: "Inner Boundaries - Separating 'You' From 'Your Thoughts' (ACT Therapy)",
    subtitleVi:
      "Người không phân biệt được mình với suy nghĩ của mình sống như nạn nhân của cái đầu chính họ. ACT (Acceptance and Commitment Therapy) dạy 3 công cụ giải nhốt.",
    subtitleEn:
      "People who cannot separate themselves from their thoughts live as hostages of their own mind. ACT teaches three tools to escape the cage.",
    takeaways: [
      { vi: "Kỹ thuật 1 - 'Tôi đang có suy nghĩ rằng…' thay vì 'Tôi là kẻ thất bại' - đưa suy nghĩ từ chủ ngữ thành đối tượng.",
        en: "Tool 1 - 'I'm having the thought that…' instead of 'I'm a failure' - moves the thought from subject to object." },
      { vi: "Kỹ thuật 2 - Hát suy nghĩ tiêu cực theo giai điệu 'Chúc mừng sinh nhật' - giảm sức mạnh cảm xúc 60-70%.",
        en: "Tool 2 - Sing the negative thought to 'Happy Birthday' - drops emotional charge by 60-70%." },
      { vi: "Kỹ thuật 3 - Đặt tên cho 'giọng nói phê phán' bên trong ('Ông Sếp Nội Tâm') - biến monologue thành đối thoại.",
        en: "Tool 3 - Name the inner critic ('The Inner Boss') - turns monologue into dialogue." },
      { vi: "Bạn không phải là suy nghĩ của mình - bạn là ý thức đang quan sát suy nghĩ.",
        en: "You are not your thoughts - you are the awareness observing them." },
      { vi: "Suy nghĩ tiêu cực đến trung bình 6.000 lần/ngày - đấu tranh với từng cái là kiệt sức; quan sát là tự do.",
        en: "About 6,000 thoughts pass daily - fighting each one exhausts; observing them frees." },
      { vi: "Không nhắm loại bỏ suy nghĩ tiêu cực - nhắm giảm mức độ tin và độ dính với chúng.",
        en: "Goal is not to eliminate negative thoughts - it is to reduce belief and stickiness." },
    ],
    frameworkVi:
      "Chuỗi 'Defusion' của ACT - Steven Hayes: Notice - Name - Neutralise - Refocus on values.",
    frameworkEn:
      "ACT's 'Defusion' chain - Steven Hayes: Notice - Name - Neutralise - Refocus on values.",
    reflectionVi:
      "Suy nghĩ nào lặp đi lặp lại nhất trong đầu bạn tuần này - nếu bạn tin nó ít hơn 30%, cuộc sống sẽ khác đi thế nào?",
    reflectionEn:
      "Which thought repeats most this week - if you believed it 30% less, how would life differ?",
    drillVi:
      "7 ngày: mỗi lần suy nghĩ tự phê phán xuất hiện, thêm câu 'Tôi đang có suy nghĩ rằng…'. Đếm số lần và cường độ.",
    drillEn:
      "7 days: whenever a self-critical thought appears, prefix it with 'I'm having the thought that…'. Track frequency and intensity.",
  },

  // ── WELLNESS ────────────────────────────────────────────
  {
    id: "wel-06",
    pillar: "wellness",
    level: "mastery",
    minutes: 11,
    medium: "read",
    titleVi: "Sức khoẻ ruột - Trục não-ruột và vì sao 'lo âu' đôi khi bắt đầu từ bữa ăn",
    titleEn: "Gut Health - The Brain-Gut Axis and Why 'Anxiety' Sometimes Starts With Lunch",
    subtitleVi:
      "90% serotonin (hormone hạnh phúc) được sản xuất ở ruột. Chăm sóc hệ vi sinh đường ruột đôi khi hiệu quả hơn cả thuốc chống trầm cảm nhẹ.",
    subtitleEn:
      "Around 90% of serotonin is produced in the gut. Caring for your microbiome sometimes outperforms mild antidepressants.",
    takeaways: [
      { vi: "Đa dạng vi sinh > số lượng: mục tiêu ăn 30 loại thực vật khác nhau mỗi tuần (dự án American Gut).",
        en: "Microbial diversity > quantity: aim for 30 different plant foods per week (American Gut Project)." },
      { vi: "Chất xơ prebiotic (tỏi, hành, chuối xanh, yến mạch) nuôi vi khuẩn tốt - không thay được bằng viên bổ sung.",
        en: "Prebiotic fibre (garlic, onion, green banana, oats) feeds good bacteria - supplements cannot replace it." },
      { vi: "Thực phẩm lên men (kim chi, sữa chua sống, kombucha) cung cấp probiotic đa dạng.",
        en: "Fermented foods (kimchi, live yoghurt, kombucha) supply diverse probiotics." },
      { vi: "Đường tinh chế và chất tạo ngọt nhân tạo làm nghiêng cán cân sang vi khuẩn xấu trong 48-72 giờ.",
        en: "Refined sugar and artificial sweeteners tilt balance toward bad bacteria within 48-72 hours." },
      { vi: "Ăn trong khung 10-12 giờ (time-restricted eating) cho ruột 'giờ nghỉ' - giảm viêm hệ thống.",
        en: "Eating within a 10-12h window (time-restricted eating) gives the gut rest - reduces systemic inflammation." },
      { vi: "Stress mãn tính phá vi sinh nhanh hơn cả chế độ ăn tệ - thiền và giấc ngủ là 'thuốc bổ ruột' miễn phí.",
        en: "Chronic stress damages the microbiome faster than a bad diet - meditation and sleep are free 'gut supplements'." },
    ],
    frameworkVi:
      "Bộ 3 nuôi ruột: Đa dạng thực vật - Lên men - Nhịn nhẹ đêm (Sonnenburg & Spector).",
    frameworkEn:
      "The Gut Trinity: Plant diversity - Fermentation - Overnight fast (Sonnenburg & Spector).",
    reflectionVi:
      "7 ngày qua, bạn ăn bao nhiêu loại thực vật khác nhau? (không phải khẩu phần - chủng loại)",
    reflectionEn:
      "Over the past 7 days, how many different plant foods did you eat? (not portions - species)",
    drillVi:
      "1 tuần: ghi tên mọi loại thực vật đã ăn. Mục tiêu >25. Bổ sung 1 loại lên men 5 ngày/tuần.",
    drillEn:
      "1 week: log every plant food eaten. Target >25. Add one fermented food 5 days a week.",
  },
  {
    id: "wel-07",
    pillar: "wellness",
    level: "mastery",
    minutes: 12,
    medium: "read",
    titleVi: "Tư thế và cột sống - Phòng chống 'công nghệ vẹo' của thế hệ ngồi 10 giờ/ngày",
    titleEn: "Posture & Spine - Preventing 'Tech Neck' in the 10-Hour-Sitting Generation",
    subtitleVi:
      "Trung bình đầu cúi 45 độ khi nhìn điện thoại tạo lực 22kg lên cổ. Không sửa từ 20 tuổi = đau lưng mãn tính lúc 35.",
    subtitleEn:
      "A head tilted 45 degrees for phone use loads 22kg on the neck. Not fixing it in your 20s = chronic back pain by 35.",
    takeaways: [
      { vi: "Quy tắc màn hình: đỉnh màn hình ngang lông mày, cách mắt 50-70cm - buộc cổ giữ tự nhiên.",
        en: "Screen rule: top of screen at eyebrow level, 50-70cm from eyes - forces natural neck alignment." },
      { vi: "Bàn phím và chuột: khuỷu tay 90 độ, cổ tay thẳng - phòng chống hội chứng ống cổ tay.",
        en: "Keyboard and mouse: elbows at 90 degrees, wrists neutral - prevents carpal tunnel." },
      { vi: "Cứ 30 phút ngồi = 2 phút đứng dậy hoặc đi lại (nghiên cứu Levine, Mayo Clinic).",
        en: "Every 30 minutes seated = 2 minutes standing or walking (Levine research, Mayo Clinic)." },
      { vi: "3 bài mở ngực hàng ngày: doorway stretch, wall angel, thoracic extension - 5 phút total.",
        en: "3 daily chest openers: doorway stretch, wall angel, thoracic extension - 5 min total." },
      { vi: "Cơ bụng sâu (transverse abdominis) là 'áo giáp cột sống' - bài tập dead bug + bird dog 5 phút/ngày.",
        en: "Deep core (transverse abdominis) is your 'spinal armour' - 5 min/day of dead bug + bird dog." },
      { vi: "Đau lưng dai dẳng thường không phải vấn đề cột sống - mà là yếu cơ mông và khớp hông cứng.",
        en: "Chronic back pain is often not a spine issue - but weak glutes and stiff hips." },
    ],
    frameworkVi:
      "Bộ 'Mở-Kích hoạt-Ổn định' - Kelly Starrett (Becoming a Supple Leopard).",
    frameworkEn:
      "The 'Mobilise-Activate-Stabilise' set - Kelly Starrett (Becoming a Supple Leopard).",
    reflectionVi:
      "Bạn có nhớ lần cuối bạn thức dậy mà lưng và cổ hoàn toàn không đau? Bao lâu rồi?",
    reflectionEn:
      "Do you remember the last time you woke up with zero back or neck pain? How long ago was that?",
    drillVi:
      "14 ngày: đặt báo mỗi 30 phút - đứng dậy 60 giây. Sáng và tối làm 5 phút bộ 3 bài mở ngực.",
    drillEn:
      "14 days: alarm every 30 min - stand for 60 seconds. Morning and evening, 5 min of the 3 chest openers.",
  },
  {
    id: "wel-08",
    pillar: "wellness",
    level: "mastery",
    minutes: 12,
    medium: "read",
    titleVi: "Nhiệt độ cực trị - Tắm lạnh và xông nóng thay đổi hệ thần kinh thế nào",
    titleEn: "Extreme Temperature - How Cold Plunges & Saunas Rewire Your Nervous System",
    subtitleVi:
      "Không phải trào lưu Instagram. Nghiên cứu Phần Lan 20 năm: xông nóng 4-7 lần/tuần giảm 40% nguy cơ tử vong tim mạch. Tắm lạnh 3 phút tăng dopamine 250% trong 2 giờ.",
    subtitleEn:
      "Not an Instagram fad. A 20-year Finnish study: 4-7 sauna sessions/week cut cardiovascular mortality by 40%. Cold plunge for 3 min raises dopamine 250% for 2 hours.",
    takeaways: [
      { vi: "Lạnh: 11-15°C trong 2-4 phút - đủ để kích hoạt norepinephrine, mỡ nâu, và khả năng chịu stress.",
        en: "Cold: 11-15°C for 2-4 min - enough to activate norepinephrine, brown fat, and stress tolerance." },
      { vi: "Nóng: 80-100°C trong 15-30 phút - kích hoạt heat shock proteins, giảm viêm hệ thống.",
        en: "Heat: 80-100°C for 15-30 min - activates heat shock proteins, reduces systemic inflammation." },
      { vi: "Thứ tự: LẠNH trước - NÓNG sau nếu tập thể thao (không cản trở tăng cơ). Ngược lại nếu để ngủ.",
        en: "Order: COLD first, HEAT after if training (does not blunt hypertrophy). Reverse for sleep." },
      { vi: "Chống chỉ định: tim mạch nặng, phụ nữ mang thai, huyết áp cao chưa kiểm soát - hỏi bác sĩ trước.",
        en: "Contraindications: severe cardiac, pregnancy, uncontrolled hypertension - consult a doctor first." },
      { vi: "Với người mới: tắm vòi sen kết thúc 30 giây lạnh × 5 ngày → nâng dần đến 3 phút.",
        en: "Beginners: end shower with 30s cold × 5 days → build up to 3 min." },
      { vi: "Lợi ích tinh thần lớn nhất không phải sinh học - là bằng chứng 'tôi có thể chọn khó chịu và vẫn ổn'.",
        en: "The biggest mental benefit is not biological - it is the proof that 'I can choose discomfort and be fine'." },
    ],
    frameworkVi:
      "Nguyên tắc 'Hormesis' - stress nhẹ có kiểm soát làm cơ thể mạnh hơn (Rhonda Patrick + Susanna Søberg).",
    frameworkEn:
      "The 'Hormesis' Principle - controlled mild stress makes the body stronger (Rhonda Patrick + Susanna Søberg).",
    reflectionVi:
      "Bạn tránh khó chịu nhỏ nhất trong ngày (nước lạnh, đói nhẹ, im lặng)? Cái tránh đó đang huấn luyện bạn thành ai?",
    reflectionEn:
      "You avoid the smallest daily discomforts (cold water, mild hunger, silence)? Who is that avoidance training you to become?",
    drillVi:
      "14 ngày: kết thúc mỗi lần tắm bằng 30-90 giây nước lạnh nhất có thể. Nhật ký cảm giác 5 phút sau.",
    drillEn:
      "14 days: end every shower with 30-90 seconds of the coldest water tolerable. Journal how you feel 5 min after.",
  },
];
