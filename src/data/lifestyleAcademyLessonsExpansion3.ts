/**
 * @file lifestyleAcademyLessonsExpansion3.ts
 * @description Third-tier depth expansion: 2 richer mastery lessons per pillar
 *              with long-form deepDive narrative and "why it matters" context.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

import type { LifestyleLesson } from "./lifestyleAcademyLessons";

export const LIFESTYLE_LESSONS_EXPANSION_3: LifestyleLesson[] = [
  // ── FINANCE ─────────────────────────────────────────────
  {
    id: "fin-12",
    pillar: "finance",
    level: "mastery",
    minutes: 13,
    medium: "read",
    titleVi: "Bảng cân đối cá nhân - Đọc sức khoẻ tài chính trong 5 phút",
    titleEn: "Personal Balance Sheet - Read Your Financial Health in 5 Minutes",
    subtitleVi:
      "Doanh nghiệp có bảng cân đối kế toán, bạn cũng cần một cái. Không có nó, mọi quyết định tài chính đều là phỏng đoán.",
    subtitleEn:
      "Businesses run on balance sheets - so should you. Without one, every money decision is a guess.",
    illustrationEmojis: ["📊", "💼", "🏦", "📈"],
    takeaways: [
      { vi: "Tài sản ròng = Tài sản (tiền, đầu tư, nhà) - Nợ (thẻ tín dụng, vay mua nhà, vay tiêu dùng).",
        en: "Net worth = Assets (cash, investments, property) minus Liabilities (credit cards, mortgage, consumer debt)." },
      { vi: "Tài sản 'nóng' (tạo thu nhập) vs tài sản 'nguội' (chỉ giữ giá trị) - tỷ lệ lý tưởng 70/30 sau 30 tuổi.",
        en: "'Hot' assets (income-producing) vs 'cold' assets (value-holding) - ideal ratio 70/30 after age 30." },
      { vi: "Đo tài sản ròng hàng quý - xu hướng quan trọng hơn con số tuyệt đối.",
        en: "Measure net worth quarterly - the trend matters more than the absolute number." },
      { vi: "Chỉ số an toàn: Quỹ khẩn cấp ≥ 6 tháng chi tiêu, tỷ lệ nợ/thu nhập < 36%.",
        en: "Safety metrics: emergency fund ≥ 6 months of expenses, debt-to-income ratio under 36%." },
      { vi: "Tài sản ròng âm ở tuổi 25 là bình thường; ở tuổi 40 là báo động đỏ.",
        en: "Negative net worth at 25 is normal; at 40 it is a red alert." },
    ],
    frameworkVi:
      "Ma trận Kiyosaki 2x2: Tài sản/Nợ × Nóng/Nguội - dịch chuyển dần sang góc 'Tài sản nóng'.",
    frameworkEn:
      "Kiyosaki 2x2 matrix: Asset/Liability × Hot/Cold - migrate progressively toward the 'Hot Asset' quadrant.",
    deepDiveVi: [
      "Hầu hết người trẻ theo dõi thu nhập nhưng không theo dõi tài sản ròng. Đây là lỗi cơ bản: thu nhập là 'dòng chảy', tài sản ròng là 'hồ chứa'. Một người kiếm 50 triệu/tháng nhưng tiêu 55 triệu/tháng đang nghèo đi mỗi ngày, kể cả khi họ 'trông có vẻ giàu'.",
      "Bảng cân đối cá nhân trả lời một câu hỏi duy nhất: nếu tôi dừng làm việc ngày mai, tôi có thể sống được bao lâu? Con số này gọi là 'runway tài chính'. Người tự do tài chính có runway vô hạn - tài sản của họ tạo đủ thu nhập để trang trải chi phí.",
      "Cách xây bảng cân đối trong 5 phút: liệt kê mọi tài khoản có tiền/đầu tư (tài sản), mọi khoản đang nợ (nợ), lấy hiệu số. Cập nhật vào ngày 1 mỗi quý. Vẽ đường xu hướng - nếu đường đi ngang hoặc xuống trong 4 quý liên tiếp, bạn cần thay đổi cấu trúc chi tiêu hoặc thu nhập.",
    ],
    deepDiveEn: [
      "Most young earners track income but never track net worth. This is a foundational mistake: income is a 'flow', net worth is a 'reservoir'. Someone earning 50M/month but spending 55M/month is getting poorer every single day, even while 'looking rich'.",
      "A personal balance sheet answers exactly one question: if I stopped working tomorrow, how long could I live? That number is your 'financial runway'. Financially free people have infinite runway - their assets throw off enough income to cover expenses.",
      "How to build one in 5 minutes: list every account holding money or investments (assets), every outstanding debt (liabilities), take the difference. Update on the 1st of every quarter. Plot the trend line - if it stays flat or drops for 4 consecutive quarters, your cost structure or income mix has to change.",
    ],
    whyItMattersVi:
      "Bạn không thể cải thiện điều mình không đo lường. Bảng cân đối cá nhân là 'la bàn' - không có nó, mọi lời khuyên tài chính đều vô nghĩa.",
    whyItMattersEn:
      "You cannot improve what you do not measure. A personal balance sheet is your compass - without it, every piece of financial advice is noise.",
    reflectionVi:
      "Nếu bạn phải công bố tài sản ròng cho chính mình 3 năm sau, con số bạn muốn thấy là bao nhiêu - và điều gì cần thay đổi ngay tuần này?",
    reflectionEn:
      "If you had to publish your net worth to your future self 3 years out, what number would you want to see - and what has to change this week?",
    drillVi:
      "Trong 30 phút hôm nay: tạo bảng tính Google Sheet với 2 cột 'Tài sản' và 'Nợ'. Điền mọi con số. Ghi ngày. Đặt lịch nhắc quý sau cập nhật.",
    drillEn:
      "In 30 minutes today: open a Google Sheet with two columns 'Assets' and 'Liabilities'. Fill every number. Timestamp it. Schedule a quarterly reminder to update.",
  },
  {
    id: "fin-13",
    pillar: "finance",
    level: "mastery",
    minutes: 11,
    medium: "read",
    titleVi: "Bảo hiểm đúng cách - Lá chắn tài chính, không phải sản phẩm đầu tư",
    titleEn: "Insurance Done Right - A Financial Shield, Not an Investment Product",
    subtitleVi:
      "90% người trẻ hoặc mua sai bảo hiểm, hoặc không có bảo hiểm. Cả hai đều đắt như nhau khi tai nạn xảy ra.",
    subtitleEn:
      "Nine out of ten young adults either buy the wrong insurance or none at all - both cost equally when disaster strikes.",
    illustrationEmojis: ["🛡️", "🏥", "📋", "🪪"],
    takeaways: [
      { vi: "Nguyên tắc 1: Bảo hiểm để chuyển giao rủi ro thảm khốc, không phải để 'sinh lời'.",
        en: "Rule 1: Insurance transfers catastrophic risk - it is not a yield product." },
      { vi: "Ưu tiên: Bảo hiểm sức khoẻ > Bảo hiểm tai nạn > Bảo hiểm nhân thọ tử kỳ > Bảo hiểm nhà.",
        en: "Priority: Health > Accident > Term Life > Home insurance." },
      { vi: "Tránh bảo hiểm nhân thọ trọn đời/liên kết đầu tư trừ khi bạn thu nhập cao và đã tối đa các kênh ưu đãi thuế.",
        en: "Avoid whole-life / investment-linked policies unless you are high-income and have maxed all tax-advantaged accounts." },
      { vi: "Quy tắc 10x: Bảo hiểm nhân thọ tử kỳ = 10 lần thu nhập năm, thời hạn phủ tới khi con út tốt nghiệp.",
        en: "The 10x rule: term life coverage = 10x annual income, term long enough to cover until your youngest child graduates." },
      { vi: "Đọc kỹ 'điều khoản loại trừ' trước khi ký - đây là nơi 80% khiếu nại bị từ chối.",
        en: "Read the 'exclusions' clause before signing - 80% of denied claims live in this section." },
    ],
    frameworkVi:
      "Ma trận rủi ro Xác suất × Mức độ: chỉ bảo hiểm cho 'Xác suất thấp × Mức độ thảm khốc'.",
    frameworkEn:
      "Probability × Severity risk matrix: only insure 'Low probability × Catastrophic severity' events.",
    deepDiveVi: [
      "Ngành bảo hiểm bán 'sự an tâm' bằng cách trộn hai sản phẩm khác nhau: bảo vệ rủi ro và tích luỹ. Khi trộn, bạn trả nhiều hơn 3-5 lần cho cùng một mức bảo vệ, và lợi suất tích luỹ thường thấp hơn quỹ chỉ số. Nguyên tắc vàng của người thông minh: 'Buy term, invest the difference' - mua bảo hiểm tử kỳ rẻ, đầu tư phần chênh vào ETF.",
      "Ba câu hỏi trước khi mua bất kỳ bảo hiểm nào: (1) Nếu điều xấu này xảy ra mà không có bảo hiểm, tài chính gia đình có sụp đổ không? (2) Xác suất xảy ra là bao nhiêu? (3) Chi phí bảo hiểm hàng năm có dưới 3% thu nhập không? Nếu bất kỳ câu nào trả lời 'không', hãy suy nghĩ lại.",
      "Sai lầm phổ biến nhất: mua bảo hiểm nhân thọ khi chưa có ai phụ thuộc tài chính vào bạn. Bảo hiểm nhân thọ là để bảo vệ 'người sống' - nếu không ai sẽ khổ khi bạn mất, bạn không cần nó. Ngược lại, sinh viên nên có bảo hiểm tai nạn - rẻ và bảo vệ khỏi rủi ro thực sự có thể xảy ra.",
    ],
    deepDiveEn: [
      "The insurance industry sells 'peace of mind' by bundling two very different products: risk protection and accumulation. When bundled, you pay 3-5x more for the same coverage, and the accumulation side typically underperforms a plain index fund. The wealthy rule of thumb: 'Buy term, invest the difference' - buy cheap term life, invest the spread in ETFs.",
      "Three questions before buying any policy: (1) If this bad event happened uninsured, would my family's finances collapse? (2) What is the probability it happens? (3) Is the annual premium under 3% of my income? If any answer is 'no', reconsider.",
      "The most common mistake: buying life insurance when nobody is financially dependent on you. Life insurance protects 'the living' - if nobody suffers financially when you die, you do not need it. Conversely, students should carry accident insurance - it is cheap and covers real, high-probability risks.",
    ],
    whyItMattersVi:
      "Một quyết định bảo hiểm sai có thể tốn 200-500 triệu đồng trong 20 năm. Đây là quyết định đắt thứ hai đời bạn, sau nhà.",
    whyItMattersEn:
      "One wrong insurance decision can cost $10-20k over 20 years - the second most expensive decision of your life after housing.",
    reflectionVi:
      "Hợp đồng bảo hiểm hiện tại của bạn thực sự bảo vệ điều gì - và bạn có thể giải thích nó cho một đứa trẻ 10 tuổi trong 30 giây không?",
    reflectionEn:
      "What does your current insurance policy actually protect - and can you explain it to a 10-year-old in 30 seconds?",
    drillVi:
      "Trong tuần này: lấy hợp đồng bảo hiểm hiện có, tìm mục 'Điều khoản loại trừ'. Đọc kỹ, gạch chân 3 điểm bạn không biết trước đó.",
    drillEn:
      "This week: pull out your current policy, find the 'Exclusions' section. Read it slowly, underline 3 items you did not know before.",
  },

  // ── ETIQUETTE ───────────────────────────────────────────
  {
    id: "eti-12",
    pillar: "etiquette",
    level: "mastery",
    minutes: 12,
    medium: "read",
    titleVi: "Nghệ thuật từ chối - Nói 'không' mà không đốt cầu nối",
    titleEn: "The Art of Saying No - Declining Without Burning Bridges",
    subtitleVi:
      "Người trưởng thành nói 'không' nhiều hơn 'có'. Nhưng cách nói 'không' quyết định bạn có còn được mời lần sau hay không.",
    subtitleEn:
      "Adults say 'no' far more often than 'yes' - but how you say it decides whether you are ever asked again.",
    illustrationEmojis: ["🙅", "🤝", "💬", "🕊️"],
    takeaways: [
      { vi: "Công thức 3 lớp: Cảm ơn - Từ chối rõ ràng - Đề xuất giải pháp thay thế.",
        en: "3-layer formula: Thank - Decline clearly - Offer an alternative path." },
      { vi: "Không giải thích quá nhiều - lý do càng dài, càng nghe như bào chữa.",
        en: "Do not over-explain - the longer the reason, the more it sounds like an excuse." },
      { vi: "Câu vàng: 'Cảm ơn anh/chị đã nghĩ đến em. Lần này em không thể tham gia, nhưng em rất muốn kết nối vào [thời điểm khác].'",
        en: "The golden line: 'Thanks for thinking of me. I cannot take this on, but I would love to reconnect on [alt time].'" },
      { vi: "Từ chối trong 24h - im lặng quá lâu tạo ra kỳ vọng, và kỳ vọng bị phụ luôn đau hơn lời từ chối thẳng.",
        en: "Decline within 24 hours - silence creates expectations, and broken expectations hurt more than a direct no." },
      { vi: "Nói 'không' với việc = nói 'có' với ưu tiên. Không có gì miễn phí, kể cả sự dễ chịu.",
        en: "Saying no to a task = saying yes to your priorities. Nothing is free, not even being agreeable." },
    ],
    frameworkVi:
      "Mô hình 'Không nhưng...' của Adam Grant - giữ mối quan hệ trong khi bảo vệ thời gian.",
    frameworkEn:
      "Adam Grant's 'No, but...' model - preserve the relationship while protecting your time.",
    deepDiveVi: [
      "Người không biết từ chối trở thành 'người tốt bụng bận rộn' - luôn có mặt cho người khác, không bao giờ có mặt cho ước mơ của mình. Warren Buffett nói: 'Sự khác biệt giữa người thành công và người rất thành công là người rất thành công nói không với gần như mọi thứ.'",
      "Vấn đề không phải nói không - vấn đề là nói không mà không làm người khác tổn thương. Nghiên cứu của Vanessa Bohns (Cornell) cho thấy chúng ta đánh giá quá cao mức độ khó chịu của người nghe khi bị từ chối - họ quên rất nhanh, còn ta thì day dứt hàng tuần.",
      "Ba loại từ chối tinh tế: (1) Từ chối kèm định hướng - 'Việc này Minh làm giỏi hơn em nhiều.' (2) Từ chối kèm thời điểm - 'Em không thể tuần này, nhưng tháng sau em rảnh.' (3) Từ chối kèm nguyên tắc - 'Em có quy tắc không nhận việc ngoài giờ vào thứ Sáu để dành cho gia đình.' Loại 3 mạnh nhất vì nó bảo vệ nguyên tắc, không phải người.",
    ],
    deepDiveEn: [
      "People who cannot decline become 'busy nice people' - always present for others, never present for their own ambitions. Warren Buffett: 'The difference between successful people and very successful people is that very successful people say no to almost everything.'",
      "The problem is not saying no - it is saying no without wounding. Vanessa Bohns (Cornell) shows we vastly overestimate how much a listener minds being told no. They forget within days; we agonise for weeks.",
      "Three tactful declines: (1) Redirect - 'Minh is actually much better at this than me.' (2) Time-shift - 'I cannot this week, but next month I am open.' (3) Principle-based - 'I have a rule against Friday-evening work to protect family time.' Number 3 is strongest because you defend a principle, not reject a person.",
    ],
    whyItMattersVi:
      "Thời gian là tài sản duy nhất không thể tái tạo. Mỗi lần 'có' miễn cưỡng là một lần rút cạn tài sản đó.",
    whyItMattersEn:
      "Time is the one asset you cannot regenerate. Every reluctant yes is a withdrawal from that account.",
    reflectionVi:
      "Bạn đã nói 'có' với điều gì trong tháng qua mà đáng lẽ nên nói 'không' - và bạn đã đánh mất điều gì để nói 'có' đó?",
    reflectionEn:
      "What did you say yes to last month that you should have said no to - and what did the yes cost you?",
    drillVi:
      "Tuần này: từ chối 2 yêu cầu bằng công thức 3 lớp. Ghi lại phản ứng của người kia - so với nỗi lo trong đầu bạn.",
    drillEn:
      "This week: decline two requests using the 3-layer formula. Record the other party's actual reaction vs the one your anxiety predicted.",
  },
  {
    id: "eti-13",
    pillar: "etiquette",
    level: "mastery",
    minutes: 10,
    medium: "read",
    titleVi: "Etiquette bàn ăn quốc tế - Từ Michelin tới bàn tiệc doanh nhân",
    titleEn: "Global Dining Etiquette - From Michelin to Business Banquets",
    subtitleVi:
      "Trong 60 phút bữa tối, đối tác có thể quyết định mở hợp tác 10 năm hoặc lịch sự chào tạm biệt mãi mãi.",
    subtitleEn:
      "Across a 60-minute dinner, a partner can decide to open a decade of collaboration - or politely say goodbye forever.",
    illustrationEmojis: ["🍽️", "🍷", "🥂", "🍴"],
    takeaways: [
      { vi: "Quy tắc BMW: Bread trái, Meal giữa, Water phải - không bao giờ nhầm ly nước với ly người khác.",
        en: "BMW rule: Bread left, Meal centre, Water right - never grab your neighbour's glass by mistake." },
      { vi: "Dao dĩa 'từ ngoài vào trong' - dụng cụ ngoài cùng cho món đầu tiên.",
        en: "Cutlery 'outside in' - the outermost tool is for the first course." },
      { vi: "Đặt dao dĩa 4h30 trên đĩa = 'tôi đã xong'. Đặt bắt chéo = 'chưa xong, tôi chỉ nghỉ'.",
        en: "Cutlery at 4:30 on the plate = 'I am done'. Crossed = 'pause, not finished'." },
      { vi: "Rượu vang: cầm cuống ly (stem), không cầm bầu - tránh làm ấm rượu và để lại dấu vân tay.",
        en: "Wine: hold the stem, not the bowl - avoid warming the wine and leaving fingerprints." },
      { vi: "Nói chuyện công việc chỉ sau món khai vị - phần đầu là để 'thấy con người', không phải 'chốt deal'.",
        en: "Talk business only after the appetiser - the opening is to 'see the person', not 'close the deal'." },
      { vi: "Không bao giờ trách người phục vụ trước mặt khách - cách bạn đối xử người dưới quyền là bài kiểm tra thật của lãnh đạo.",
        en: "Never scold service staff in front of a guest - how you treat those with less power is the real leadership test." },
    ],
    frameworkVi:
      "Mô hình 3 giai đoạn của Emily Post: Kết nối con người (khai vị) - Xây lòng tin (chính) - Chốt hoặc kế hoạch (tráng miệng).",
    frameworkEn:
      "Emily Post's 3-phase model: Human connection (appetiser) - Trust building (main) - Close or next step (dessert).",
    deepDiveVi: [
      "Bàn ăn không phải nơi để ăn - đó là sân khấu quan sát. Đối tác giàu kinh nghiệm sẽ đọc bạn qua: cách bạn xử lý thực đơn phức tạp, cách bạn nói với người phục vụ, cách bạn xử lý một món ăn không hợp khẩu vị, cách bạn giành hay để người khác trả tiền. Mỗi hành động là một 'tín hiệu tính cách' rẻ để phát ra và đắt để giả tạo.",
      "Sự khác biệt văn hoá quan trọng: Ở Pháp, ăn hết đĩa = tôn trọng đầu bếp; ở Trung Quốc, chừa lại một chút = tôn trọng chủ nhà đã đãi đủ; ở Nhật, không bao giờ cắm đũa thẳng vào bát cơm (giống nghi thức tang lễ). Không biết = không thô lỗ, nhưng biết = một dấu hiệu tinh tế về sự chuẩn bị.",
      "Nguyên tắc vàng cho tiệc doanh nhân: chọn món giữa dải giá của thực đơn (không rẻ nhất, không đắt nhất), không gọi món quá phức tạp (mì spaghetti, tôm hùm nguyên con - khó ăn thanh lịch), uống rượu chậm hơn chủ tiệc một bậc, và luôn đứng lên khi có người quan trọng đến bàn - kể cả nếu đó là người dưới quyền bạn.",
    ],
    deepDiveEn: [
      "The dinner table is not a place to eat - it is an observation stage. Experienced partners read you through: how you handle a complex menu, how you speak to service staff, how you manage a dish you dislike, whether you fight for or gracefully accept the bill. Every action is a 'character signal' - cheap to send, expensive to fake.",
      "Cultural nuances matter: In France, clean your plate = respect for the chef; in China, leave a little = respect for a generous host; in Japan, never plant chopsticks vertically in rice (it mimics funeral rites). Not knowing is not rude - but knowing is a subtle mark of preparation.",
      "Golden rules for business dinners: order from the middle of the price range (never the cheapest, never the most expensive), avoid unwieldy dishes (spaghetti, whole lobster - hard to eat elegantly), drink one notch slower than your host, and always stand when someone important arrives at the table - even if they are junior to you.",
    ],
    whyItMattersVi:
      "Ở tầng cao của sự nghiệp, kỹ năng chuyên môn được giả định. Cái tách bạn khỏi đám đông là cách bạn cầm ly rượu.",
    whyItMattersEn:
      "At the upper tier of any career, technical skill is assumed. What separates you from the crowd is how you hold a wine glass.",
    reflectionVi:
      "Bữa ăn quan trọng gần nhất - bạn nhớ gì về đối tác qua cách họ hành xử tại bàn, và họ có thể nhớ gì về bạn?",
    reflectionEn:
      "Your most recent important meal - what do you remember about the other person's behaviour, and what might they remember about yours?",
    drillVi:
      "Trước bữa tối doanh nhân tiếp theo: xem video 10 phút về BMW rule + cách cầm ly rượu, tập trước gương 5 phút.",
    drillEn:
      "Before your next business dinner: watch a 10-minute video on the BMW rule + wine-glass grip, then rehearse for 5 minutes in front of a mirror.",
  },

  // ── PRESENCE & RESILIENCE ───────────────────────────────
  {
    id: "pre-12",
    pillar: "presence",
    level: "mastery",
    minutes: 13,
    medium: "read",
    titleVi: "Silent Confidence - Vì sao người tự tin nhất trong phòng nói ít nhất",
    titleEn: "Silent Confidence - Why the Most Confident Person Speaks Least",
    subtitleVi:
      "Người thiếu tự tin lấp đầy khoảng lặng. Người tự tin sử dụng khoảng lặng như một công cụ.",
    subtitleEn:
      "The unconfident fill every silence. The confident use silence as a tool.",
    illustrationEmojis: ["🧘", "🕯️", "🎯", "🤫"],
    takeaways: [
      { vi: "Khoảng lặng 3 giây trước khi trả lời = 'tôi đang cân nhắc', không phải 'tôi không biết'.",
        en: "A 3-second pause before answering says 'I am weighing', not 'I do not know'." },
      { vi: "Người tự tin không cần giải thích quá nhiều - lời nói ít, sức nặng lớn.",
        en: "The confident do not over-explain - fewer words, more weight." },
      { vi: "Tư thế 'anchored': hai chân bằng nhau, vai thả lỏng, ánh mắt ổn định 3-5 giây trước khi rời.",
        en: "'Anchored' posture: feet even, shoulders soft, eye contact steady for 3-5 seconds before drifting." },
      { vi: "Không tranh giành lời - chờ người khác xong, rồi nói. Ngắt lời báo hiệu bất an, không phải quyền lực.",
        en: "Do not fight for the floor - wait, then speak. Interrupting signals insecurity, not power." },
      { vi: "Giọng nói kết câu đi xuống (downward inflection) = tuyên bố. Đi lên = câu hỏi. Người tự tin tuyên bố nhiều hơn hỏi.",
        en: "Downward sentence inflection = statement. Upward = question. The confident state more than they ask." },
      { vi: "Không cần được đồng ý để yên tâm - đây là chỉ số duy nhất phân biệt tự tin thật với tự tin giả.",
        en: "Not needing agreement to feel steady is the single marker separating real confidence from performed confidence." },
    ],
    frameworkVi:
      "Mô hình 'Presence Triangle' của Amy Cuddy: Posture (thân) - Pace (nhịp) - Pause (khoảng lặng).",
    frameworkEn:
      "Amy Cuddy's 'Presence Triangle': Posture - Pace - Pause.",
    deepDiveVi: [
      "Có một nghịch lý: người muốn trông tự tin nhất thường là người ít tự tin nhất. Họ nói to hơn, nhanh hơn, nhiều hơn - để lấp đầy khoảng trống mà nỗi bất an tạo ra. Trong khi đó, người tự tin thật sự thoải mái với khoảng lặng - vì họ không cần sự chấp thuận của người khác để cảm thấy đủ.",
      "Thí nghiệm Harvard của Amy Cuddy (2012) cho thấy: chỉ cần đứng ở tư thế 'quyền lực' 2 phút trước cuộc họp, testosterone tăng 20%, cortisol giảm 25%. Cơ thể không diễn - cơ thể đi trước tâm trí. Bạn không cần cảm thấy tự tin để hành động tự tin; hành động tự tin sẽ tạo ra cảm giác tự tin.",
      "Ba dấu hiệu 'silent confidence' người khác đọc trong 7 giây đầu tiên: (1) Bạn không nhìn xuống điện thoại khi đợi - bạn nhìn quanh phòng, thoải mái. (2) Bạn ngồi thẳng nhưng không cứng - lưng vững, vai không lên tận tai. (3) Bạn không cười giả tạo - nụ cười đến khi có lý do đến, không đến để làm hài lòng ai.",
      "Bài tập tinh vi nhất: 'chậm hơn một nhịp'. Trong cuộc trò chuyện tiếp theo, cố tình phản hồi chậm hơn thói quen 1 nhịp - dừng, thở, rồi nói. Bạn sẽ thấy đối phương chú ý hơn, và bản thân nghe rõ hơn.",
    ],
    deepDiveEn: [
      "There is a paradox: those who most want to look confident are usually the least confident. They speak louder, faster, more - to fill the void their anxiety creates. Meanwhile, the genuinely confident sit comfortably in silence - because they do not need approval to feel whole.",
      "Amy Cuddy's Harvard experiment (2012) showed: two minutes in a 'power pose' before a meeting raised testosterone 20% and dropped cortisol 25%. The body does not perform - the body leads the mind. You do not need to feel confident to act confident; acting confident produces the feeling.",
      "Three 'silent confidence' signals others read in the first 7 seconds: (1) You do not stare at your phone while waiting - you scan the room, at ease. (2) You sit upright but not stiff - back solid, shoulders not glued to your ears. (3) You do not force smiles - a smile arrives with a reason, not to please.",
      "The subtlest drill: 'one beat slower'. In your next conversation, deliberately respond one beat slower than usual - pause, breathe, then speak. You will find the other person listens more, and you hear yourself more clearly.",
    ],
    whyItMattersVi:
      "Tự tin không phải là nói to hơn - đó là ổn định hơn khi mọi thứ xung quanh không ổn định.",
    whyItMattersEn:
      "Confidence is not speaking louder - it is remaining steady when everything around you is not.",
    reflectionVi:
      "Khoảnh khắc gần nhất bạn nói quá nhiều - điều gì thực sự khiến bạn không thể im lặng?",
    reflectionEn:
      "The most recent moment you over-spoke - what was actually making silence unbearable?",
    drillVi:
      "3 ngày: trong mọi cuộc trò chuyện, thêm khoảng lặng 3 giây trước mỗi câu trả lời quan trọng. Ghi nhận thay đổi trong cách người khác lắng nghe.",
    drillEn:
      "3 days: in every conversation, insert a 3-second pause before any important reply. Note how the other person's listening changes.",
  },
  {
    id: "pre-13",
    pillar: "presence",
    level: "mastery",
    minutes: 12,
    medium: "audio",
    titleVi: "Bảng khoáng chất tinh thần - 5 nguồn năng lượng nội tâm không cạn",
    titleEn: "The Mental Minerals Chart - 5 Inner Energy Sources That Do Not Deplete",
    subtitleVi:
      "Cà phê, dopamine, thành tựu - tất cả đều cạn. Có 5 nguồn năng lượng nội tâm không bao giờ cạn nếu biết khai thác.",
    subtitleEn:
      "Caffeine, dopamine, achievement - all deplete. There are five inner energy sources that never run dry if you know how to tap them.",
    illustrationEmojis: ["🪨", "🌊", "🔥", "🌱", "☀️"],
    takeaways: [
      { vi: "Khoáng chất 1 - Mục đích (Ikigai): Lý do sáng sớm thức dậy. Không có = mọi động lực khác cạn nhanh.",
        en: "Mineral 1 - Purpose (Ikigai): Your reason to wake early. Without it, every other motivator burns fast." },
      { vi: "Khoáng chất 2 - Kết nối sâu: 1 người thực sự hiểu bạn > 100 người theo dõi bạn.",
        en: "Mineral 2 - Deep connection: One person who truly gets you > 100 who follow you." },
      { vi: "Khoáng chất 3 - Sự tiến bộ hữu hình: Ghi lại 3 bước tiến mỗi tuần - dù nhỏ.",
        en: "Mineral 3 - Visible progress: Log 3 small wins each week - no matter how small." },
      { vi: "Khoáng chất 4 - Sự đóng góp: Cho đi tạo năng lượng bền hơn nhận về (nghiên cứu Ed Diener).",
        en: "Mineral 4 - Contribution: Giving generates more durable energy than receiving (Ed Diener research)." },
      { vi: "Khoáng chất 5 - Sự thiêng liêng: Một nghi thức nhỏ hàng ngày kết nối bạn với điều lớn hơn bản thân.",
        en: "Mineral 5 - The sacred: A daily micro-ritual connecting you to something larger than yourself." },
    ],
    frameworkVi:
      "Ma trận Martin Seligman - Mô hình PERMA mở rộng: Positive - Engagement - Relationships - Meaning - Accomplishment - Sacred.",
    frameworkEn:
      "Martin Seligman's PERMA framework extended: Positive - Engagement - Relationships - Meaning - Accomplishment - Sacred.",
    deepDiveVi: [
      "Có sự khác biệt cơ bản giữa 'năng lượng vay' và 'năng lượng gốc'. Cà phê, đường, dopamine từ mạng xã hội - đây là năng lượng vay: bạn trả lãi bằng cạn kiệt sau đó. Năng lượng gốc đến từ nội tâm và không cần phục hồi - vì nó không rút, mà nạp.",
      "Khoáng chất 1 - Mục đích: Viktor Frankl (sống sót Holocaust) viết trong 'Man's Search for Meaning': người có 'lý do để sống' (why) chịu đựng được gần như mọi 'cách sống' (how). Không cần mục đích to lớn - chỉ cần rõ ràng.",
      "Khoáng chất 4 - Sự đóng góp là ít được nói nhất. Nghiên cứu 40 năm của Đại học Harvard theo dõi 268 người từ tuổi 20 tới 80 kết luận: yếu tố dự đoán tốt nhất cho hạnh phúc tuổi 80 không phải giàu, không phải nổi tiếng - mà là chất lượng của các mối quan hệ và cảm giác đã đóng góp cho ai đó ngoài bản thân.",
      "Bài tập tổng hợp: mỗi Chủ nhật, chấm điểm 5 khoáng chất từ 1-5. Khoáng chất nào dưới 3 = 'đói khoáng' - tuần sau ưu tiên nạp lại. Đây là cách tự chẩn đoán sức khoẻ tinh thần trung dài hạn, không đợi đến khi kiệt sức mới nhận ra.",
    ],
    deepDiveEn: [
      "There is a fundamental difference between 'borrowed energy' and 'source energy'. Coffee, sugar, social-media dopamine - these are borrowed: you pay interest with depletion afterwards. Source energy comes from within and needs no recovery - because it does not withdraw, it deposits.",
      "Mineral 1 - Purpose: Viktor Frankl (Holocaust survivor) wrote in Man's Search for Meaning that anyone with a 'why to live' can endure almost any 'how'. Purpose need not be grand - only clear.",
      "Mineral 4 - Contribution is the least discussed. Harvard's 40-year study following 268 men from age 20 to 80 concluded: the single best predictor of late-life happiness was not wealth or fame - it was relationship quality and the felt sense of having contributed to someone beyond yourself.",
      "Integration drill: every Sunday, score all 5 minerals 1-5. Any mineral under 3 = 'deficiency' - refill it as next week's priority. This is how you diagnose long-arc mental health before burnout announces itself.",
    ],
    whyItMattersVi:
      "Kiệt sức tuổi 30 hiếm khi vì làm quá nhiều - nó vì rút mãi từ tài khoản khoáng chất mà không nạp lại.",
    whyItMattersEn:
      "Burnout at 30 is rarely from doing too much - it is from withdrawing from the mineral account without ever depositing back.",
    reflectionVi:
      "Trong 5 khoáng chất, khoáng chất nào của bạn đang 'đói' nhất - và điều gì cản bạn nạp lại nó?",
    reflectionEn:
      "Among the 5 minerals, which is most 'starved' right now - and what is stopping you from refilling it?",
    drillVi:
      "Chủ nhật này: chấm điểm 5 khoáng chất. Với khoáng chất thấp nhất, lên kế hoạch 1 hành động 30 phút cho tuần sau.",
    drillEn:
      "This Sunday: score all 5 minerals. For the lowest one, schedule a single 30-minute action for next week.",
  },

  // ── WELLNESS ────────────────────────────────────────────
  {
    id: "wel-12",
    pillar: "wellness",
    level: "mastery",
    minutes: 12,
    medium: "read",
    titleVi: "Longevity 101 - 4 chỉ số máu quyết định 20 năm khoẻ mạnh cuối đời",
    titleEn: "Longevity 101 - 4 Blood Markers That Decide Your Final 20 Healthy Years",
    subtitleVi:
      "Bạn không cần đợi đến 60 tuổi mới biết cơ thể có 'khoẻ thật' hay không - 4 chỉ số này cho biết ngay ở tuổi 25.",
    subtitleEn:
      "You do not need to wait until 60 to find out if your body is truly healthy - 4 markers reveal it at 25.",
    illustrationEmojis: ["🩸", "🧬", "❤️", "🔬"],
    takeaways: [
      { vi: "Chỉ số 1 - HbA1c (đường huyết trung bình 3 tháng): Mục tiêu < 5.4%. > 5.7% = tiền tiểu đường, thầm lặng nhưng huỷ hoại.",
        en: "Marker 1 - HbA1c (3-month average blood sugar): Target < 5.4%. > 5.7% = pre-diabetes, silent but destructive." },
      { vi: "Chỉ số 2 - ApoB (cholesterol xấu chính xác hơn LDL): Mục tiêu < 80 mg/dL cho người dưới 50 tuổi.",
        en: "Marker 2 - ApoB (a more accurate 'bad cholesterol' than LDL): Target < 80 mg/dL under age 50." },
      { vi: "Chỉ số 3 - hs-CRP (viêm mạn tính): Mục tiêu < 1.0 mg/L. Viêm là 'gốc rễ' của phần lớn bệnh mạn tính.",
        en: "Marker 3 - hs-CRP (chronic inflammation): Target < 1.0 mg/L. Inflammation is the root of most chronic disease." },
      { vi: "Chỉ số 4 - Vitamin D: Mục tiêu 40-60 ng/mL. Thiếu = miễn dịch yếu, tâm trạng đi xuống, xương yếu.",
        en: "Marker 4 - Vitamin D: Target 40-60 ng/mL. Deficient = weak immunity, low mood, fragile bones." },
      { vi: "Xét nghiệm 1 năm/lần từ tuổi 25 - rẻ hơn 1 ly cà phê/tháng, quan trọng hơn mọi thực phẩm bổ sung.",
        en: "Test once a year from age 25 - cheaper than a monthly coffee, more important than any supplement." },
    ],
    frameworkVi:
      "Khung 'Medicine 3.0' của Peter Attia: chuyển từ 'chữa bệnh khi có triệu chứng' sang 'tối ưu chỉ số 20 năm trước khi có triệu chứng'.",
    frameworkEn:
      "Peter Attia's 'Medicine 3.0' framework: shift from 'treating symptoms' to 'optimising markers 20 years before symptoms'.",
    deepDiveVi: [
      "Y học truyền thống là 'phản ứng': đợi bạn có triệu chứng, rồi chữa. Medicine 3.0 (Peter Attia) là 'dự đoán': đo các chỉ số dài hạn để can thiệp 20 năm trước khi bệnh xảy ra. Bệnh tim, tiểu đường, Alzheimer, ung thư - tất cả bắt đầu từ 20-30 tuổi, không phải 50-60 tuổi khi được chẩn đoán.",
      "HbA1c là chỉ số quan trọng nhất người trẻ bỏ qua. Nó cho biết đường huyết trung bình 3 tháng qua. Ở mức 5.7-6.4% (tiền tiểu đường), bạn chưa 'bị bệnh' nhưng đã ở đường ray dẫn tới tiểu đường type 2 trong 5-10 năm. Tin tốt: đảo ngược được bằng vận động Zone 2 và ăn ít tinh bột tinh chế.",
      "ApoB đo số 'hạt' cholesterol xấu, chính xác hơn LDL truyền thống. Hai người có LDL bằng nhau nhưng ApoB khác nhau có rủi ro tim mạch chênh 2-3 lần. Nếu ApoB > 100 ở tuổi 30, cần can thiệp - trước tiên bằng chế độ ăn, sau đó bằng thuốc nếu không đủ.",
      "Chi phí xét nghiệm 4 chỉ số ở Việt Nam khoảng 500.000-800.000 đồng, ở Mỹ khoảng 100-200 USD. So với chi phí điều trị bệnh mạn tính (hàng trăm triệu tới tỷ đồng suốt đời), đây là ROI cao nhất trong sức khoẻ. Ngày sinh nhật hàng năm - đặt lịch xét nghiệm như một 'quà cho tôi tương lai'.",
    ],
    deepDiveEn: [
      "Traditional medicine is 'reactive': wait for symptoms, then treat. Medicine 3.0 (Peter Attia) is 'predictive': measure long-arc markers to intervene 20 years before disease appears. Heart disease, diabetes, Alzheimer's, cancer - all begin in the 20s-30s, not the 50s-60s when they get named.",
      "HbA1c is the marker young people most often miss. It reveals average blood sugar over the past 3 months. At 5.7-6.4% (pre-diabetic), you are not yet 'sick' but firmly on the track to type-2 diabetes within 5-10 years. Good news: reversible with Zone 2 cardio and lower refined carbs.",
      "ApoB counts the actual 'particle' number of bad cholesterol - more accurate than legacy LDL. Two people with identical LDL but different ApoB have 2-3x different cardiovascular risk. If ApoB > 100 at age 30, intervene - diet first, medication only if diet is insufficient.",
      "The 4-marker test costs roughly $20-40 in Vietnam and $100-200 in the US. Compared to the lifetime cost of chronic disease treatment (tens to hundreds of thousands of dollars), this is the single highest ROI decision in health. Every birthday - book the test as 'a gift to future me'.",
    ],
    whyItMattersVi:
      "Bạn không sống thêm bằng cách hoảng loạn khi có bệnh - bạn sống thêm bằng cách đo lường trước khi có triệu chứng.",
    whyItMattersEn:
      "You do not add years by panicking when disease appears - you add years by measuring before symptoms exist.",
    reflectionVi:
      "Lần cuối bạn xét nghiệm máu tổng quát là bao giờ - và bạn có thực sự đọc kết quả, hay chỉ để nó 'ngủ' trong hồ sơ?",
    reflectionEn:
      "When was your last full blood panel - and did you actually read the results, or let them sleep in a folder?",
    drillVi:
      "Trong tháng này: đặt lịch xét nghiệm 4 chỉ số. Sau khi nhận kết quả, chụp ảnh và lưu vào một album 'Sức khoẻ - Longevity' - so sánh mỗi năm.",
    drillEn:
      "This month: book the 4-marker panel. When you get results, photograph them and archive in a 'Health - Longevity' folder - compare yearly.",
  },
  {
    id: "wel-13",
    pillar: "wellness",
    level: "mastery",
    minutes: 11,
    medium: "practice",
    titleVi: "Ánh sáng, nhiệt độ & thời gian - 3 đòn bẩy sinh học miễn phí bạn đang bỏ lỡ",
    titleEn: "Light, Temperature & Timing - 3 Free Biological Levers You Are Missing",
    subtitleVi:
      "Trước khi mua bất kỳ thực phẩm bổ sung nào, hãy tối ưu 3 đầu vào miễn phí này - chúng mạnh hơn 90% supplement.",
    subtitleEn:
      "Before buying any supplement, optimise these 3 free inputs - they outperform 90% of supplements.",
    illustrationEmojis: ["☀️", "❄️", "🌙", "⏰"],
    takeaways: [
      { vi: "Ánh sáng sáng sớm (10-30 phút trong 1 giờ đầu sau khi thức) - tái lập đồng hồ sinh học, tăng cortisol đúng lúc.",
        en: "Morning sunlight (10-30 min within the first hour after waking) - resets circadian rhythm and cortisol timing." },
      { vi: "Ánh sáng tối (< 10 lux) sau 22h - báo cho não sản xuất melatonin, sâu giấc ngủ REM.",
        en: "Dim light (< 10 lux) after 10pm - signals the brain to produce melatonin and deepen REM sleep." },
      { vi: "Tắm nước lạnh 2-3 phút mỗi sáng - tăng dopamine 250%, kéo dài 2-4 giờ (nghiên cứu Andrew Huberman).",
        en: "Cold shower 2-3 min each morning - raises dopamine 250%, lasting 2-4 hours (Huberman research)." },
      { vi: "Nhiệt độ phòng ngủ 18-20°C - nhiệt độ cơ thể phải giảm 1°C để vào giấc ngủ sâu.",
        en: "Bedroom temp 18-20°C - core body temperature must drop 1°C to enter deep sleep." },
      { vi: "Ăn trong khung 10-12h/ngày (time-restricted eating) - đồng bộ chuyển hoá với đồng hồ sinh học.",
        en: "Eat within a 10-12h window (time-restricted eating) - align metabolism with the circadian clock." },
      { vi: "Không caffeine sau 14h - caffeine có nửa đời 6 giờ, uống 15h nghĩa là 21h vẫn còn 50% trong máu.",
        en: "No caffeine after 2pm - caffeine's half-life is 6 hours; a 3pm coffee leaves 50% in your blood at 9pm." },
    ],
    frameworkVi:
      "Mô hình 'Circadian Trio' của Satchin Panda: Ánh sáng (light) - Thức ăn (food) - Vận động (movement) - cả ba phải đồng bộ.",
    frameworkEn:
      "Satchin Panda's 'Circadian Trio' model: Light - Food - Movement - all three must synchronise.",
    deepDiveVi: [
      "Cơ thể bạn có khoảng 100+ đồng hồ sinh học nhỏ trong từng cơ quan - gan, thận, ruột, não - tất cả đều đợi tín hiệu 'bây giờ là ngày' hoặc 'bây giờ là đêm'. Tín hiệu chính là ánh sáng qua mắt. Không có ánh sáng sáng sớm = đồng hồ chạy sai = kém ngủ, giảm năng lượng, tăng cortisol không đúng lúc.",
      "Nghiên cứu năm 2022 của Andrew Huberman (Stanford) cho thấy: 10 phút ánh sáng mặt trời trực tiếp trong 30 phút đầu sau khi thức làm tăng cortisol đúng lúc (buổi sáng - tốt), giảm cortisol buổi tối (giúp ngủ), và tăng dopamine cả ngày. Không có mặt trời (mưa, mùa đông)? Đèn 10.000 lux thay thế - đầu tư 50-100 USD, dùng cả đời.",
      "Tắm nước lạnh là 'công cụ vàng' đơn giản nhất. 2-3 phút ở 10-15°C sau tắm nước ấm: co mạch, kích hoạt hệ thần kinh giao cảm, giải phóng norepinephrine và dopamine. Hiệu ứng kéo dài 2-4 giờ - đủ cho một buổi sáng tập trung. Miễn phí, không phụ thuộc, không tác dụng phụ khi làm đúng.",
      "Time-restricted eating (TRE) không phải là ăn kiêng - đó là 'ăn đúng giờ'. Ăn trong khung 10-12 giờ (ví dụ 8h-18h) đồng bộ enzyme tiêu hoá, insulin, và melatonin. Nghiên cứu của Satchin Panda cho thấy TRE cải thiện HbA1c, huyết áp, và chất lượng giấc ngủ - mà không cần thay đổi những gì bạn ăn.",
    ],
    deepDiveEn: [
      "Your body runs 100+ small biological clocks in every organ - liver, kidneys, gut, brain - all waiting for a signal saying 'it is day now' or 'it is night now'. The master signal is light through the eyes. No morning light = clock drift = poor sleep, low energy, mistimed cortisol.",
      "Andrew Huberman (Stanford) research (2022): 10 minutes of direct sunlight within the first 30 minutes after waking raises cortisol at the right time (morning - good), reduces evening cortisol (helps sleep), and boosts dopamine all day. No sun (rain, winter)? A 10,000-lux lamp substitutes - $50-100 investment, decades of use.",
      "Cold showers are the simplest 'golden tool'. 2-3 minutes at 10-15°C at the end of a warm shower: vasoconstriction, sympathetic activation, norepinephrine and dopamine release. Effect lasts 2-4 hours - enough for one focused morning. Free, no dependency, no side effects done correctly.",
      "Time-restricted eating (TRE) is not dieting - it is 'eating on time'. Eating within a 10-12 hour window (e.g. 8am-6pm) synchronises digestive enzymes, insulin, and melatonin. Satchin Panda's research shows TRE improves HbA1c, blood pressure, and sleep quality - without changing what you eat.",
    ],
    whyItMattersVi:
      "Sinh học không đàm phán. Bạn có thể chống lại nó 10-20 năm, sau đó nó gửi hoá đơn - dưới dạng bệnh mạn tính.",
    whyItMattersEn:
      "Biology does not negotiate. You can fight it for 10-20 years, then it sends the bill - as chronic disease.",
    reflectionVi:
      "Trong 3 đòn bẩy (ánh sáng - nhiệt độ - thời gian), đòn bẩy nào bạn đang xem thường nhất - và điều gì sẽ khác nếu bạn tối ưu nó 30 ngày?",
    reflectionEn:
      "Among the 3 levers (light - temperature - timing), which are you neglecting most - and what would 30 days of optimising it change?",
    drillVi:
      "7 ngày liên tiếp: (1) 10 phút ánh sáng sáng sớm ngoài trời, (2) tắm nước lạnh 2 phút cuối, (3) không ăn sau 20h. Chấm chất lượng giấc ngủ 1-10 mỗi tối.",
    drillEn:
      "7 consecutive days: (1) 10 min outdoor morning sunlight, (2) 2-min cold rinse at shower end, (3) no eating after 8pm. Rate sleep quality 1-10 each night.",
  },
];
