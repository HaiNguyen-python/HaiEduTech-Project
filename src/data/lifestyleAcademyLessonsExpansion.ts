/**
 * @file lifestyleAcademyLessonsExpansion.ts
 * @description Depth & breadth expansion for the Lifestyle Academy curriculum.
 *              Adds 3 more advanced lessons per pillar with richer takeaways,
 *              deep-dive commentary, and common pitfalls, so each pillar has
 *              8 lessons instead of 5.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

import type { LifestyleLesson } from "./lifestyleAcademyLessons";

export const LIFESTYLE_LESSONS_EXPANSION: LifestyleLesson[] = [
  // ── FINANCE ─────────────────────────────────────────────
  {
    id: "fin-06",
    pillar: "finance",
    level: "intermediate",
    minutes: 10,
    medium: "read",
    titleVi: "Quỹ khẩn cấp thông minh - 3 lớp phòng thủ tài chính",
    titleEn: "The Smart Emergency Fund - 3 Layers of Financial Defense",
    subtitleVi:
      "Không phải cứ để 6 tháng chi tiêu trong tài khoản tiết kiệm là đủ. Chia thành 3 lớp giúp tiền vừa an toàn, vừa không mất giá theo lạm phát.",
    subtitleEn:
      "Stashing 6 months of expenses in one savings account is not enough. Splitting into three layers keeps money safe without letting inflation eat it alive.",
    takeaways: [
      { vi: "Lớp 1: 1 tháng chi tiêu trong tài khoản chính, rút được ngay trong 5 phút.",
        en: "Layer 1: 1 month of expenses in your main account, accessible within 5 minutes." },
      { vi: "Lớp 2: 2-3 tháng trong tài khoản tiết kiệm lãi cao, rút trong 1-2 ngày làm việc.",
        en: "Layer 2: 2-3 months in a high-yield savings account, accessible within 1-2 business days." },
      { vi: "Lớp 3: 2-3 tháng trong chứng chỉ tiền gửi ngắn hạn hoặc quỹ trái phiếu, rút trong 1 tuần.",
        en: "Layer 3: 2-3 months in short-term CDs or bond funds, accessible within a week." },
      { vi: "Chỉ mở lớp 2 và lớp 3 khi lớp trước đã đầy - đừng nhảy cóc vì tham lãi suất.",
        en: "Only build higher layers after the lower one is full - never skip ahead chasing yield." },
      { vi: "Định nghĩa 'khẩn cấp' bằng văn bản để tránh dùng quỹ này cho iPhone mới hay du lịch.",
        en: "Write down what counts as an 'emergency' so this fund never pays for a new phone or vacation." },
      { vi: "Nạp lại quỹ khẩn cấp là ưu tiên số 1 ngay sau khi rút - trước cả đầu tư.",
        en: "Refilling the fund after use is priority #1 - even before resuming investments." },
    ],
    frameworkVi:
      "Mô hình 3 lớp phòng thủ (1-2-3): thanh khoản giảm dần, lãi suất tăng dần, rủi ro vẫn gần bằng 0.",
    frameworkEn:
      "The 1-2-3 Defense Layer Model: liquidity decreases outward, yield increases outward, risk stays near zero.",
    reflectionVi:
      "Nếu hôm nay bạn mất việc, bạn có thể sống bao lâu mà không phải bán tài sản đầu tư hay vay nợ?",
    reflectionEn:
      "If you lost your income today, how long could you live without selling investments or taking on debt?",
    drillVi:
      "Tuần này: tính tổng chi tiêu trung bình 3 tháng, chia cho 6 để có 'một tháng', rồi lên kế hoạch nạp từng lớp trong 12 tháng tới.",
    drillEn:
      "This week: average your last 3 months of expenses, divide by 6 to get one 'month', then map out how to fill each layer over the next 12 months.",
  },
  {
    id: "fin-07",
    pillar: "finance",
    level: "intermediate",
    minutes: 11,
    medium: "read",
    titleVi: "Phân bổ tài sản theo tuổi và mục tiêu - Không phải cứ trẻ là all-in cổ phiếu",
    titleEn: "Asset Allocation by Age and Goals - Being Young Doesn't Mean 100% Stocks",
    subtitleVi:
      "Câu 'trẻ thì mạo hiểm' đúng một nửa. Phân bổ tốt phải trả lời 3 câu: khi nào cần tiền, chịu được lỗ bao nhiêu, và tâm lý bạn thực sự bền cỡ nào.",
    subtitleEn:
      "The advice 'young means risky' is only half true. Great allocation answers three questions: when do you need the money, how much loss can you handle, and how strong is your temperament really.",
    takeaways: [
      { vi: "Tiền cần trong 0-2 năm: 0% cổ phiếu. Đây là 'tiền không được phép giảm'.",
        en: "Money needed in 0-2 years: 0% stocks. This is money that cannot be allowed to drop." },
      { vi: "Tiền cần trong 3-7 năm: 30-60% cổ phiếu, còn lại trái phiếu và tiền mặt.",
        en: "Money needed in 3-7 years: 30-60% stocks, rest in bonds and cash." },
      { vi: "Tiền cần sau 10 năm: 80-100% cổ phiếu chỉ số toàn cầu, cân đối mỗi năm 1 lần.",
        en: "Money needed after 10 years: 80-100% global index stocks, rebalance once a year." },
      { vi: "Test tâm lý: nếu danh mục giảm 40% trong 6 tháng, bạn còn ngủ được không? Nếu không - giảm tỷ trọng cổ phiếu.",
        en: "Temperament test: if your portfolio drops 40% in 6 months, can you still sleep? If not, reduce stock weight." },
      { vi: "Rebalance là 'bán cao, mua thấp' tự động - nhưng chỉ khi lệch >5% mới đáng làm.",
        en: "Rebalancing is automatic 'sell high, buy low' - but only worth doing when the drift exceeds 5%." },
      { vi: "Vàng và crypto: tối đa 5-10% danh mục, coi là bảo hiểm chứ không phải cỗ máy làm giàu.",
        en: "Gold and crypto: max 5-10% of portfolio, treat as insurance not as a wealth machine." },
    ],
    frameworkVi:
      "Bộ khung 'Bucket Strategy' của Harold Evensky: chia tiền theo thời gian cần dùng, không theo cảm xúc.",
    frameworkEn:
      "Harold Evensky's Bucket Strategy: allocate by time horizon, not by mood.",
    reflectionVi:
      "Liệt kê 3 mục tiêu tài chính cụ thể (số tiền + thời điểm). Danh mục hiện tại của bạn có phản ánh cả 3 không?",
    reflectionEn:
      "List 3 concrete financial goals (amount + timing). Does your current portfolio reflect all three?",
    drillVi:
      "Vẽ 3 chiếc xô: 0-2 năm, 3-7 năm, 10+ năm. Ghi số tiền cần và tỷ lệ cổ phiếu/trái phiếu cho từng xô.",
    drillEn:
      "Draw 3 buckets: 0-2 years, 3-7 years, 10+ years. Note the amount needed and the stock/bond mix for each.",
  },
  {
    id: "fin-08",
    pillar: "finance",
    level: "mastery",
    minutes: 12,
    medium: "read",
    titleVi: "Thiên kiến hành vi - Vì sao người thông minh vẫn thua thị trường",
    titleEn: "Behavioral Biases - Why Smart People Still Lose to the Market",
    subtitleVi:
      "IQ không cứu bạn khỏi bán tháo khi thị trường sập, cũng không ngăn bạn dồn hết vào cổ phiếu công ty đang làm. Nhận diện thiên kiến quan trọng hơn học phân tích.",
    subtitleEn:
      "IQ won't save you from panic-selling in a crash, or from putting everything into your employer's stock. Spotting biases matters more than mastering analysis.",
    takeaways: [
      { vi: "Loss aversion: đau vì mất 1 triệu gấp 2 lần vui vì được 1 triệu - dẫn tới bán quá sớm khi lỗ.",
        en: "Loss aversion: losing $1 hurts twice as much as gaining $1 - leading to premature panic-selling." },
      { vi: "Recency bias: gán quá nhiều trọng số cho tin tức mới - mua đỉnh khi ai cũng hào hứng.",
        en: "Recency bias: over-weighting the latest news - buying tops when everyone is excited." },
      { vi: "Confirmation bias: chỉ đọc phân tích ủng hộ điều bạn đã tin - danh mục dần lệch nguy hiểm.",
        en: "Confirmation bias: only reading takes that agree with you - portfolio drifts dangerously off balance." },
      { vi: "Home bias: dồn 80%+ vào cổ phiếu nước mình dù nước mình chỉ chiếm 2-30% GDP toàn cầu.",
        en: "Home bias: overweighting local stocks even though your country is only 2-30% of global GDP." },
      { vi: "Sunk cost: giữ khoản đầu tư lỗ chỉ vì 'đã bỏ nhiều tiền vào rồi'. Tiền đã bỏ không quyết định tương lai.",
        en: "Sunk cost: holding a losing bet just because 'you already put money in'. Past money doesn't dictate the future." },
      { vi: "Overconfidence: nam giới trẻ giao dịch nhiều hơn 45%, và lợi nhuận thấp hơn 2.65%/năm (Barber & Odean 2001).",
        en: "Overconfidence: young men trade 45% more than average, and earn 2.65%/year less (Barber & Odean 2001)." },
    ],
    frameworkVi:
      "Danh sách 'stop the bleed' 6 thiên kiến của Daniel Kahneman - đọc lại trước MỌI quyết định lớn về tiền.",
    frameworkEn:
      "Daniel Kahneman's 6-bias 'stop the bleed' checklist - re-read before EVERY major money decision.",
    reflectionVi:
      "Nhớ lại quyết định tài chính bạn hối tiếc nhất. Thiên kiến nào (trong 6 cái trên) đã dẫn dắt bạn?",
    reflectionEn:
      "Recall the money decision you regret most. Which of the 6 biases was really pulling the strings?",
    drillVi:
      "In danh sách 6 thiên kiến, dán bên máy tính. Trước bất kỳ giao dịch nào >5% danh mục, đọc lại và ghi 1 câu 'tôi bị thiên kiến X, hoặc không'.",
    drillEn:
      "Print the 6-bias list and stick it by your screen. Before any trade >5% of your portfolio, re-read it and write 'I'm being biased by X, or not'.",
  },

  // ── ETIQUETTE ───────────────────────────────────────────
  {
    id: "eti-06",
    pillar: "etiquette",
    level: "intermediate",
    minutes: 9,
    medium: "read",
    titleVi: "Nghệ thuật hỏi câu hỏi hay - Người thông minh không nói giỏi, họ hỏi giỏi",
    titleEn: "The Art of Great Questions - Smart People Don't Talk Well, They Ask Well",
    subtitleVi:
      "Một câu hỏi tốt cho đối phương cảm giác được nhìn thấy, được coi trọng, và mở ra chiều sâu mà 10 câu nói không làm được.",
    subtitleEn:
      "One good question makes the other person feel seen, respected, and opens a depth that ten statements cannot.",
    takeaways: [
      { vi: "Tránh câu hỏi Yes/No. Đổi 'Bạn thích công việc này không?' thành 'Điều gì trong công việc khiến bạn hào hứng nhất?'.",
        en: "Avoid yes/no questions. Swap 'Do you like your job?' with 'What part of your work energizes you most?'." },
      { vi: "Công thức 'What/How + cảm xúc': 'Cảm giác thế nào khi...?', 'Điều gì khiến bạn tự hào nhất về...?'.",
        en: "Formula 'What/How + feeling': 'How did it feel when...?', 'What are you most proud of about...?'." },
      { vi: "Nguyên tắc 5 giây im lặng sau câu trả lời - 80% thông tin sâu nằm ở câu trả lời thứ 2, không phải thứ 1.",
        en: "5-second silence rule after their answer - 80% of the deep content is in their second reply, not the first." },
      { vi: "Câu hỏi 'hồi tưởng cụ thể' mạnh hơn 'ý kiến chung': 'Kể tôi nghe lần gần nhất bạn...' > 'Bạn nghĩ gì về...'.",
        en: "Specific-recall questions beat general-opinion questions: 'Tell me about the last time you...' > 'What do you think of...'." },
      { vi: "Không dùng câu hỏi để 'gài' hay khoe kiến thức - đối phương nhận ra ngay và đóng cửa cảm xúc.",
        en: "Don't use questions to trap or show off - people sense it instantly and close down emotionally." },
    ],
    frameworkVi:
      "Mô hình FORD + WAIT của Michael Bungay Stanier: Family, Occupation, Recreation, Dreams - Why Am I Talking?",
    frameworkEn:
      "Michael Bungay Stanier's FORD + WAIT model: Family, Occupation, Recreation, Dreams - Why Am I Talking?",
    reflectionVi:
      "Trong cuộc trò chuyện gần nhất, bạn hỏi bao nhiêu câu? Bao nhiêu câu là mở, bao nhiêu là đóng?",
    reflectionEn:
      "In your last conversation, how many questions did you ask? How many were open vs closed?",
    drillVi:
      "3 ngày tới, mỗi cuộc trò chuyện đặt ít nhất 3 câu hỏi mở kiểu 'What/How + cảm xúc'. Ghi nhật ký ngắn về phản ứng đối phương.",
    drillEn:
      "For the next 3 days, ask at least 3 open 'What/How + feeling' questions per conversation. Journal briefly on their reactions.",
  },
  {
    id: "eti-07",
    pillar: "etiquette",
    level: "intermediate",
    minutes: 8,
    medium: "read",
    titleVi: "Nghệ thuật viết email và tin nhắn chuyên nghiệp - Ít, rõ, tôn trọng thời gian",
    titleEn: "The Art of Professional Email and Messaging - Brief, Clear, Time-Respecting",
    subtitleVi:
      "Người bận rộn đọc email trong 8 giây đầu. Cấu trúc BLUF (Bottom Line Up Front) là món quà bạn tặng người đọc.",
    subtitleEn:
      "Busy people scan an email in the first 8 seconds. BLUF (Bottom Line Up Front) structure is a gift to your reader.",
    takeaways: [
      { vi: "Tiêu đề = kết luận + hành động cần thiết. 'Xin duyệt ngân sách Q1 - hạn 20/1' thay vì 'Về việc ngân sách'.",
        en: "Subject = conclusion + action needed. 'Approval needed: Q1 budget - due Jan 20' beats 'Regarding budget'." },
      { vi: "Câu đầu tiên trả lời 'Tôi cần gì từ bạn?'. Đừng bắt người đọc lội qua 3 đoạn để tìm.",
        en: "The first line answers 'What do I need from you?'. Don't make readers wade through 3 paragraphs to find it." },
      { vi: "Một email = một chủ đề. Nhiều chủ đề = nhiều email hoặc bulleted list rõ ràng.",
        en: "One email = one topic. Multiple topics = multiple emails or a clean bulleted list." },
      { vi: "Đoạn văn tối đa 3 dòng. Người đọc trên điện thoại - đoạn dài thành khối chữ đáng sợ.",
        en: "Paragraphs max 3 lines. Readers are on phones - long paragraphs turn into intimidating walls of text." },
      { vi: "Kết bằng câu hỏi cụ thể hoặc deadline. 'Bạn có thể xác nhận trước 5pm thứ 5 không?' > 'Cho tôi biết nhé'.",
        en: "End with a specific question or deadline. 'Can you confirm by 5pm Thursday?' > 'Let me know'." },
      { vi: "Không CC để 'gây áp lực' - đó là hành vi thụ động hung hăng người nhận không quên.",
        en: "Never CC to apply pressure - it is passive-aggressive and the recipient will not forget." },
    ],
    frameworkVi:
      "Cấu trúc BLUF: Bottom Line - Bối cảnh - Chi tiết - Hành động cần thiết - Deadline.",
    frameworkEn:
      "The BLUF structure: Bottom Line - Context - Details - Action needed - Deadline.",
    reflectionVi:
      "Đọc lại 5 email bạn gửi tuần này. Nếu bạn là người nhận bận rộn, email nào bạn sẽ trả lời trước? Vì sao?",
    reflectionEn:
      "Reread 5 emails you sent this week. If you were a busy recipient, which would you reply to first? Why?",
    drillVi:
      "Viết lại email dài nhất gần đây theo BLUF. Đếm số từ trước và sau - mục tiêu giảm 40% mà không mất thông tin.",
    drillEn:
      "Rewrite your longest recent email using BLUF. Count words before and after - target a 40% reduction with no loss of info.",
  },
  {
    id: "eti-08",
    pillar: "etiquette",
    level: "mastery",
    minutes: 11,
    medium: "read",
    titleVi: "Xử lý xung đột không để lại vết sẹo - Kỹ thuật DESC + Rescue Bridge",
    titleEn: "Conflict Without Scars - The DESC + Rescue Bridge Technique",
    subtitleVi:
      "Người lớn không tránh xung đột, họ điều hướng xung đột. Một cuộc đối thoại khó được xử lý đúng còn giúp mối quan hệ sâu hơn.",
    subtitleEn:
      "Grown-ups don't avoid conflict, they navigate it. A hard conversation handled well can deepen the relationship.",
    takeaways: [
      { vi: "D - Describe: mô tả sự việc bằng dữ kiện, không diễn giải. 'Bạn đi trễ 15 phút 3 lần tuần này' không phải 'Bạn thiếu tôn trọng'.",
        en: "D - Describe: state facts, not interpretations. 'You were 15 min late 3 times this week' not 'You are disrespectful'." },
      { vi: "E - Express: nói cảm xúc bằng 'Tôi cảm thấy...', không phải 'Bạn làm tôi...'.",
        en: "E - Express: say feelings with 'I feel...', not 'You make me...'." },
      { vi: "S - Specify: yêu cầu cụ thể, quan sát được. 'Nhắn tin nếu trễ hơn 5 phút' thay vì 'Chú ý hơn nhé'.",
        en: "S - Specify: request must be concrete and observable. 'Text me if you'll be more than 5 min late' beats 'Be more attentive'." },
      { vi: "C - Consequences: nói rõ hệ quả tích cực nếu thay đổi (không phải đe doạ). 'Khi mình đúng giờ, mình có thêm 30 phút quý giá'.",
        en: "C - Consequences: state positive consequences of change (not threats). 'When we're on time, we get 30 more quality minutes'." },
      { vi: "Rescue Bridge: nếu đối phương phòng thủ, dừng nội dung, gọi tên cảm xúc: 'Có vẻ mình đang căng - mình có nên tạm nghỉ 10 phút?'.",
        en: "Rescue Bridge: if the other side gets defensive, pause the content and name the feeling: 'It seems we're tense - should we take 10 min?'." },
      { vi: "Kết thúc bằng lời khẳng định mối quan hệ: 'Tớ nói vì tớ muốn tụi mình tốt hơn' - không phải 'ai đúng'.",
        en: "Close with a relationship affirmation: 'I say this because I want us better' - not who is right." },
    ],
    frameworkVi:
      "Mô hình DESC của Sharon và Gordon Bower, kết hợp Rescue Bridge từ 'Crucial Conversations'.",
    frameworkEn:
      "The DESC model by Sharon and Gordon Bower, combined with the Rescue Bridge from 'Crucial Conversations'.",
    reflectionVi:
      "Cuộc xung đột nào bạn tránh nhất hiện tại? Chi phí thật của việc tránh né đó (thời gian, năng lượng, mối quan hệ) là bao nhiêu?",
    reflectionEn:
      "Which conflict are you avoiding most right now? What is the true cost (time, energy, relationships) of that avoidance?",
    drillVi:
      "Chọn 1 xung đột nhỏ. Viết ra kịch bản đầy đủ DESC (4 câu, mỗi bước 1 câu). Đọc to 3 lần trước khi thực sự nói.",
    drillEn:
      "Pick one small conflict. Write out the full DESC script (4 lines, one per step). Read it aloud 3 times before the real talk.",
  },

  // ── PRESENCE ────────────────────────────────────────────
  {
    id: "pre-06",
    pillar: "presence",
    level: "intermediate",
    minutes: 10,
    medium: "read",
    titleVi: "Kỹ thuật 'ngôi thứ ba' - Cách nói chuyện với chính mình khi khủng hoảng",
    titleEn: "The Third-Person Technique - How to Talk to Yourself in a Crisis",
    subtitleVi:
      "Nghiên cứu Ethan Kross (Michigan) cho thấy: tự nói chuyện bằng tên riêng thay vì 'tôi' giảm 30-40% mức lo âu trong tình huống áp lực cao.",
    subtitleEn:
      "Research by Ethan Kross (Michigan) shows that talking to yourself by name instead of 'I' cuts anxiety 30-40% in high-pressure situations.",
    takeaways: [
      { vi: "Thay 'Tôi sẽ thất bại' bằng 'Nam ơi, chuyện gì tệ nhất có thể xảy ra?'.",
        en: "Swap 'I'll fail' with 'Nam, what's the worst that can actually happen?'." },
      { vi: "Ngôn ngữ ngôi 3 tạo khoảng cách tâm lý - bạn nhìn tình huống như 1 người bạn nhìn từ bên ngoài.",
        en: "Third-person language creates psychological distance - you see the situation as a friend from outside." },
      { vi: "Kết hợp với câu hỏi 'Trong 10 năm nữa, điều này còn quan trọng không?' để rút gọn 90% lo âu.",
        en: "Combine with 'Will this matter in 10 years?' to shrink 90% of anxiety." },
      { vi: "Người dùng kỹ thuật này ra quyết định 'khôn ngoan hơn' theo đánh giá độc lập của người thứ 3.",
        en: "Users of this technique make 'wiser' decisions as judged by independent third parties." },
      { vi: "Không phải để 'chối bỏ cảm xúc' - vẫn thừa nhận cảm xúc, chỉ đổi góc nhìn.",
        en: "Not for denying feelings - still acknowledge them, only shift the viewpoint." },
    ],
    frameworkVi:
      "Distanced Self-Talk của Ethan Kross - dùng tên riêng, ngôi thứ 3, và câu hỏi tương lai.",
    frameworkEn:
      "Ethan Kross's Distanced Self-Talk - use your own name, third person, and future-time questions.",
    reflectionVi:
      "Khi bạn tự phê bình khắc nghiệt nhất, bạn có nói với người bạn thân nhất những từ đó không?",
    reflectionEn:
      "When you self-criticize harshest, would you say those same words to your closest friend?",
    drillVi:
      "Lần tiếp theo bạn lo âu: viết 3 câu bằng ngôi thứ 3 dùng tên riêng của mình, đọc to. Đo mức lo âu 1-10 trước/sau.",
    drillEn:
      "Next time you're anxious: write 3 sentences in third person using your own name, read them aloud. Rate anxiety 1-10 before and after.",
  },
  {
    id: "pre-07",
    pillar: "presence",
    level: "intermediate",
    minutes: 9,
    medium: "read",
    titleVi: "Ngôn ngữ cơ thể quyền lực - 5 vi cử chỉ tạo dấu ấn trong 7 giây đầu",
    titleEn: "Powerful Body Language - 5 Micro-Gestures That Land in the First 7 Seconds",
    subtitleVi:
      "Người khác đánh giá năng lực và độ đáng tin của bạn trong 7 giây đầu, dựa 80% vào phi ngôn ngữ. Vài chi tiết nhỏ đảo ngược cả ấn tượng.",
    subtitleEn:
      "People judge your competence and trustworthiness in the first 7 seconds, 80% based on non-verbals. A few small details flip the whole impression.",
    takeaways: [
      { vi: "Chân đứng rộng bằng vai, trọng tâm đều - báo hiệu 'tôi thuộc về đây'.",
        en: "Feet shoulder-width apart, weight even - signals 'I belong here'." },
      { vi: "Cằm song song sàn nhà, không nghếch lên (kiêu) hay cúi xuống (rụt rè).",
        en: "Chin parallel to the floor, not tilted up (arrogant) or down (timid)." },
      { vi: "Bắt tay chắc, 2 lần lắc, mắt gặp mắt trong toàn bộ thời gian - văn hoá phương Tây.",
        en: "Handshake firm, two pumps, eye contact for the full duration - Western contexts." },
      { vi: "Tay đặt hờ, không giấu sau lưng hay trong túi - lòng bàn tay lộ 30% báo hiệu cởi mở.",
        en: "Hands rested visible, not behind back or in pockets - palms 30% visible signals openness." },
      { vi: "Không rung chân, gõ ngón tay, hay chạm mặt - đây là 'leak' căng thẳng người khác đọc được ngay.",
        en: "No leg bouncing, finger tapping, or face touching - these are anxiety leaks others read instantly." },
      { vi: "Cười bằng mắt (Duchenne smile) - có nếp nhăn đuôi mắt, không chỉ nhếch môi.",
        en: "Smile with your eyes (Duchenne smile) - crinkles at the corners, not just lifted lips." },
    ],
    frameworkVi:
      "Ma trận Warmth × Competence của Amy Cuddy - phải nhìn 'ấm' TRƯỚC khi được nhìn 'giỏi'.",
    frameworkEn:
      "Amy Cuddy's Warmth × Competence matrix - you must be seen as 'warm' BEFORE you're seen as 'competent'.",
    reflectionVi:
      "Ghi hình 1 phút bạn tự giới thiệu. Xem lại không tiếng. Bạn thấy 'ấm' hay 'lạnh'? 'Chắc chắn' hay 'phập phồng'?",
    reflectionEn:
      "Record 1 minute of yourself introducing yourself. Watch muted. Do you look 'warm' or 'cold'? 'Solid' or 'shaky'?",
    drillVi:
      "3 ngày: mỗi buổi sáng đứng gương 2 phút thực hành 5 vi cử chỉ trên. Chọn 1 cái yếu nhất và cải thiện.",
    drillEn:
      "3 days: 2 mirror-minutes every morning practicing the 5 micro-gestures. Pick the weakest and drill it.",
  },
  {
    id: "pre-08",
    pillar: "presence",
    level: "mastery",
    minutes: 12,
    medium: "practice",
    titleVi: "Amor Fati - Nghệ thuật yêu chính hoàn cảnh của mình",
    titleEn: "Amor Fati - The Art of Loving Your Own Circumstances",
    subtitleVi:
      "'Amor Fati' (yêu số phận) của Nietzsche không phải cam chịu. Đó là kỹ năng biến mọi chuyện xảy ra thành nguyên liệu cho sự trưởng thành.",
    subtitleEn:
      "Nietzsche's 'Amor Fati' (love of fate) is not resignation. It's the skill of turning whatever happens into raw material for growth.",
    takeaways: [
      { vi: "Không chỉ 'chấp nhận' - mà chủ động chọn nói 'có' với hiện thực, kể cả điều đau đớn.",
        en: "Not just 'accept' - actively say yes to reality, including the painful parts." },
      { vi: "Câu thần chú: 'Nếu tôi được chọn lại, tôi vẫn chọn điều này' - kiểm tra mức chấp nhận thật.",
        en: "Mantra: 'If I could choose again, I'd choose this' - a real acceptance check." },
      { vi: "Bài tập 'the obstacle is the way' của Marcus Aurelius - hỏi 'chướng ngại này dạy tôi điều gì?'.",
        en: "Marcus Aurelius's 'the obstacle is the way' - ask 'what is this obstacle teaching me?'." },
      { vi: "Khác với 'toxic positivity': vẫn cho phép mình đau, nhưng không bị đau nghiền nát.",
        en: "Different from toxic positivity: you still let yourself hurt, without being crushed by it." },
      { vi: "Người thực hành lâu dài trở nên 'antifragile' - không chỉ hồi phục, mà mạnh hơn sau va đập.",
        en: "Long-term practitioners become 'antifragile' - not just recovering, but stronger after impact." },
    ],
    frameworkVi:
      "Kỹ thuật 3 bước: 1) Ghi nhận sự thật, 2) Hỏi 'Điều này có thể là món quà gì?', 3) Chọn hành động tiếp theo.",
    frameworkEn:
      "3-step technique: 1) Acknowledge the fact, 2) Ask 'What gift could this be?', 3) Choose the next action.",
    reflectionVi:
      "Điều tệ nhất xảy ra với bạn 3 năm trước - hôm nay bạn thấy nó đã mang lại bài học/con người/cơ hội nào?",
    reflectionEn:
      "The worst thing that happened to you 3 years ago - what lesson, person, or opportunity did it eventually deliver?",
    drillVi:
      "14 ngày: mỗi tối viết 1 điều 'khó chịu' xảy ra hôm đó + 1 câu 'món quà tiềm ẩn' của nó. Đọc lại vào ngày 15.",
    drillEn:
      "14 days: each night write one thing that annoyed you + one line on its 'hidden gift'. Reread on day 15.",
  },

  // ── WELLNESS ────────────────────────────────────────────
  {
    id: "wel-06",
    pillar: "wellness",
    level: "intermediate",
    minutes: 10,
    medium: "read",
    titleVi: "Tập kháng lực - Vũ khí chống lão hoá mạnh hơn cardio",
    titleEn: "Resistance Training - A Stronger Anti-Aging Weapon Than Cardio",
    subtitleVi:
      "Sau tuổi 30, khối cơ giảm 3-8% mỗi thập kỷ. Không tập kháng lực = mất khối cơ = mất khả năng độc lập ở tuổi 70.",
    subtitleEn:
      "After age 30, muscle mass drops 3-8% per decade. No resistance training = muscle loss = losing independence in your 70s.",
    takeaways: [
      { vi: "2 buổi/tuần, 30-45 phút là đủ để dừng và đảo ngược sarcopenia (mất cơ do tuổi).",
        en: "2 sessions/week, 30-45 min is enough to stop and reverse age-related muscle loss (sarcopenia)." },
      { vi: "5 động tác nền tảng: squat, deadlift, đẩy ngực, kéo lưng, đẩy vai - bao phủ 90% nhóm cơ.",
        en: "5 foundational moves: squat, deadlift, chest press, row, overhead press - cover 90% of muscle groups." },
      { vi: "Progressive overload - mỗi 1-2 tuần tăng thêm 2.5kg hoặc 1 rep, cơ thể chỉ đáp ứng khi bị thách thức.",
        en: "Progressive overload - add 2.5kg or 1 rep every 1-2 weeks; the body only adapts when challenged." },
      { vi: "Grip strength (lực nắm tay) là chỉ số dự đoán tuổi thọ chính xác hơn cả huyết áp.",
        en: "Grip strength predicts longevity more accurately than blood pressure." },
      { vi: "Protein 1.6-2.2g/kg cân nặng/ngày là điều kiện cần - không có protein đủ, cơ không phát triển dù tập đúng.",
        en: "Protein 1.6-2.2g/kg body weight/day is required - without enough, muscles don't grow even with perfect training." },
      { vi: "Người tập kháng lực đều đặn có tỷ lệ chết do mọi nguyên nhân giảm 15-20% (Br J Sports Med 2022).",
        en: "Regular resistance trainers have 15-20% lower all-cause mortality (Br J Sports Med 2022)." },
    ],
    frameworkVi:
      "Chương trình 'Starting Strength' của Mark Rippetoe - 3 buổi/tuần, chỉ 5 động tác, tăng đều đặn.",
    frameworkEn:
      "Mark Rippetoe's 'Starting Strength' - 3 sessions/week, only 5 moves, steady progression.",
    reflectionVi:
      "Bạn có thể tự đứng dậy từ ghế thấp mà không dùng tay chống không? Nếu không - bạn đã bắt đầu mất chức năng cơ bản.",
    reflectionEn:
      "Can you stand up from a low chair without using your hands? If not, you're already losing basic function.",
    drillVi:
      "Tuần 1: 2 buổi tập, mỗi buổi 3 hiệp × 8 reps của 5 động tác cơ bản (bodyweight nếu chưa có tạ). Ghi lại số kg và reps.",
    drillEn:
      "Week 1: 2 sessions, each 3 sets × 8 reps of the 5 basic moves (bodyweight if no weights yet). Log weight and reps.",
  },
  {
    id: "wel-07",
    pillar: "wellness",
    level: "foundation",
    minutes: 8,
    medium: "read",
    titleVi: "Ánh sáng buổi sáng - Cách 'lập trình' đồng hồ sinh học 10 phút mỗi ngày",
    titleEn: "Morning Light - How to 'Program' Your Circadian Clock in 10 Minutes a Day",
    subtitleVi:
      "Ánh sáng mặt trời trực tiếp trong 10 phút sau khi thức dậy đồng bộ hoá 100+ nhịp sinh học, cải thiện giấc ngủ, tâm trạng và tiêu hoá cùng lúc.",
    subtitleEn:
      "10 minutes of direct sunlight after waking synchronizes 100+ biological rhythms, improving sleep, mood, and digestion at once.",
    takeaways: [
      { vi: "10.000 lux ánh nắng > 500 lux đèn trong nhà. Kính cửa sổ chặn 50%+ tia UV cần thiết - phải ra ngoài.",
        en: "10,000 lux of sunlight > 500 lux of indoor light. Window glass blocks 50%+ of the needed UV - go outside." },
      { vi: "Trong 30-60 phút đầu sau khi mở mắt là cửa sổ vàng - cortisol tăng đỉnh, thiết lập nhịp cả ngày.",
        en: "The first 30-60 min after waking is the golden window - cortisol peaks, setting the rhythm for the day." },
      { vi: "Ngày nhiều mây? Vẫn ra ngoài 15-20 phút - vẫn nhận đủ tín hiệu quang.",
        en: "Cloudy day? Still go outside 15-20 min - you still receive enough light signal." },
      { vi: "Không đeo kính râm trong 10 phút này - mắt cần tín hiệu ánh sáng trực tiếp.",
        en: "No sunglasses during these 10 min - your eyes need the direct light signal." },
      { vi: "Kết hợp với đi bộ chậm 10 phút - vận động nhẹ giúp cortisol chuyển hoá đúng chu kỳ.",
        en: "Combine with a slow 10-min walk - light movement helps cortisol cycle properly." },
      { vi: "Kết quả sau 2 tuần đều đặn: ngủ nhanh hơn 20-30 phút, tỉnh táo hơn buổi chiều.",
        en: "Result after 2 consistent weeks: falling asleep 20-30 min faster, more alert in the afternoon." },
    ],
    frameworkVi:
      "Giao thức 'AM Sunlight Anchor' của Andrew Huberman - 10 phút ánh sáng trực tiếp trong 1 giờ đầu sau khi thức.",
    frameworkEn:
      "Andrew Huberman's 'AM Sunlight Anchor' protocol - 10 min of direct light in the first hour after waking.",
    reflectionVi:
      "Trong 7 ngày qua, bạn có bao nhiêu buổi sáng thực sự ra ngoài trong 1 giờ đầu? Nếu <3 - đó là đòn bẩy lớn.",
    reflectionEn:
      "In the past 7 days, how many mornings did you actually step outside in the first hour? If <3, that's your biggest lever.",
    drillVi:
      "14 ngày: đặt báo thức 'sunlight' cách báo thức chính 10 phút. Ra ngoài không điện thoại, không kính râm.",
    drillEn:
      "14 days: set a 'sunlight' alarm 10 min after your main alarm. Step outside with no phone and no sunglasses.",
  },
  {
    id: "wel-08",
    pillar: "wellness",
    level: "mastery",
    minutes: 12,
    medium: "read",
    titleVi: "Nutrition 80/20 - Ăn uống bền vững không cần đếm calo cả đời",
    titleEn: "80/20 Nutrition - Sustainable Eating Without Counting Calories Forever",
    subtitleVi:
      "Đếm calo hoạt động ngắn hạn nhưng phá hoại mối quan hệ với ăn uống. Nguyên tắc 80/20 tạo kỷ luật mà không tạo ám ảnh.",
    subtitleEn:
      "Calorie counting works short term but wrecks your relationship with food. The 80/20 rule builds discipline without obsession.",
    takeaways: [
      { vi: "80% bữa ăn: thực phẩm nguyên bản (rau, thịt/cá, trứng, hạt, ngũ cốc nguyên hạt). 20%: bất cứ thứ gì bạn thích.",
        en: "80% of meals: whole foods (vegetables, meat/fish, eggs, nuts, whole grains). 20%: anything you want." },
      { vi: "Nguyên tắc 'protein trước': mỗi bữa bắt đầu bằng 30g protein - giảm 40% thèm ăn vặt.",
        en: "'Protein first' rule: start each meal with 30g protein - cuts snack cravings 40%." },
      { vi: "Uống 500ml nước 30 phút trước bữa - giảm 20% calo bữa đó mà không thấy đói.",
        en: "500ml water 30 min before a meal - cuts 20% of that meal's calories without hunger." },
      { vi: "Không cấm đoán tuyệt đối - thứ bị cấm càng gợi thèm. 'Không phải bây giờ' > 'Không bao giờ'.",
        en: "No absolute bans - forbidden foods trigger cravings. 'Not right now' beats 'never'." },
      { vi: "Ngưỡng đói 1-10: ăn khi 3-4, dừng khi 6-7. Không đợi đói lả (≤2) hay ăn đến 'no căng' (≥8).",
        en: "Hunger scale 1-10: eat at 3-4, stop at 6-7. Don't wait until starving (≤2) or eat to 'stuffed' (≥8)." },
      { vi: "Chất xơ 30-40g/ngày là chỉ số dự đoán sức khoẻ đường ruột và tuổi thọ mạnh nhất.",
        en: "Fiber 30-40g/day is the strongest predictor of gut health and longevity." },
    ],
    frameworkVi:
      "Nguyên tắc 80/20 của Michael Pollan: 'Eat food. Not too much. Mostly plants.' - đơn giản, không cần app.",
    frameworkEn:
      "Michael Pollan's 80/20 rule: 'Eat food. Not too much. Mostly plants.' - simple, no app required.",
    reflectionVi:
      "Trong tuần qua, bạn ăn bao nhiêu bữa 'thực phẩm nguyên bản' vs 'thực phẩm chế biến sẵn'? Tỷ lệ có gần 80/20 không?",
    reflectionEn:
      "This past week, how many meals were 'whole food' vs 'ultra-processed'? Was it close to 80/20?",
    drillVi:
      "7 ngày: chụp ảnh mọi bữa ăn (không đếm calo). Cuối tuần, đánh dấu tỷ lệ nguyên bản/chế biến. Điều chỉnh 1 bữa/ngày.",
    drillEn:
      "7 days: photo every meal (no calorie counting). At week's end, mark the whole/processed ratio. Adjust one meal per day.",
  },
];
