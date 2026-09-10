/**
 * @file lifestyleAcademyLessons.ts
 * @description In-depth lesson catalogue for the Lifestyle Academy - 4 pillars.
 *              Each lesson has a bilingual title, subtitle, key takeaways, a
 *              practical framework, a reflection prompt, and a suggested drill.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

export type LifestylePillarKey =
  | "finance"
  | "etiquette"
  | "presence"
  | "wellness"
  | "selfstudy"
  | "partying";

export interface LifestyleLesson {
  id: string;
  pillar: LifestylePillarKey;
  level: "foundation" | "intermediate" | "mastery";
  minutes: number;
  medium: "read" | "audio" | "practice";
  titleVi: string;
  titleEn: string;
  subtitleVi: string;
  subtitleEn: string;
  /** 3-6 punchy bilingual takeaways students can screenshot and revisit. */
  takeaways: { vi: string; en: string }[];
  /** A named model / framework so the lesson feels like a "system", not tips. */
  frameworkVi: string;
  frameworkEn: string;
  /** Written reflection question - journaling / self-coaching prompt. */
  reflectionVi: string;
  reflectionEn: string;
  /** A concrete 5-15 minute drill to internalise the lesson. */
  drillVi: string;
  drillEn: string;
  /** Optional deeper narrative - 2-4 paragraphs of expanded context. */
  deepDiveVi?: string[];
  deepDiveEn?: string[];
  /** Optional "why it matters" bilingual paragraph. */
  whyItMattersVi?: string;
  whyItMattersEn?: string;
  /** Optional bilingual safety note (used by the Parties & Events pillar). */
  safetyNotesVi?: string;
  safetyNotesEn?: string;
  /** Optional emoji cluster used for the card illustration banner. */
  illustrationEmojis?: string[];
}

// ─────────────────────────────────────────────────────────
// FINANCE - Build wealth through small, daily habits
// ─────────────────────────────────────────────────────────
const finance: LifestyleLesson[] = [
  {
    id: "fin-01",
    pillar: "finance",
    level: "foundation",
    minutes: 8,
    medium: "read",
    titleVi: "Quy tắc 6 hũ tiền - Kiến trúc tài chính tối giản",
    titleEn: "The 6-Jar System - A Minimalist Money Architecture",
    subtitleVi:
      "Phân bổ mỗi đồng thu nhập vào 6 mục đích rõ ràng, tránh 'tiêu bao nhiêu còn bấy nhiêu'.",
    subtitleEn:
      "Route every dollar of income into six purpose-driven jars so you stop living paycheck to paycheck.",
    takeaways: [
      { vi: "55% Thiết yếu · 10% Giáo dục · 10% Đầu tư dài hạn · 10% Tự do tài chính · 10% Hưởng thụ · 5% Cho đi.",
        en: "55% Necessities · 10% Education · 10% Long-term Investing · 10% Financial Freedom · 10% Play · 5% Give." },
      { vi: "Tự động hoá chuyển khoản trong 24h đầu sau khi có lương - tiền không kịp 'bốc hơi'.",
        en: "Automate transfers within 24h of payday - money never sits long enough to evaporate." },
      { vi: "Hũ 'Tự do tài chính' là bất khả xâm phạm; chỉ dùng để mua tài sản tạo thu nhập thụ động.",
        en: "The Financial Freedom jar is untouchable - only for buying assets that pay you back." },
      { vi: "Nếu 55% thiết yếu > thu nhập, vấn đề không phải kỷ luật mà là cấu trúc chi phí cố định.",
        en: "If Necessities exceed 55%, the problem isn't discipline - it's your fixed-cost structure." },
    ],
    frameworkVi:
      "Mô hình T. Harv Eker - 6 tài khoản riêng biệt, tự động chuyển theo % ngay khi thu nhập về.",
    frameworkEn:
      "T. Harv Eker's 6-Jar Model - six separate accounts, auto-split by percentage on payday.",
    reflectionVi:
      "Nhìn lại 3 tháng gần nhất: hũ nào của bạn thực sự trống rỗng, và điều đó phản ánh giá trị sống nào?",
    reflectionEn:
      "Look back on the past 3 months: which jar is truly empty, and what life value does that reveal?",
    drillVi:
      "Mở app ngân hàng, thiết lập 3 lệnh chuyển khoản tự động: 10% vào 'Tự do tài chính', 10% 'Giáo dục', 10% 'Đầu tư'.",
    drillEn:
      "Open your banking app and set up three automatic transfers: 10% to Freedom, 10% to Education, 10% to Investing.",
  },
  {
    id: "fin-02",
    pillar: "finance",
    level: "foundation",
    minutes: 7,
    medium: "read",
    titleVi: "Lãi kép & Thời gian - Vũ khí tài chính mạnh nhất của người trẻ",
    titleEn: "Compound Interest & Time - A Young Person's Strongest Weapon",
    subtitleVi:
      "Vì sao bắt đầu năm 22 tuổi có thể vượt người bắt đầu năm 32 tuổi, dù đóng góp ít hơn.",
    subtitleEn:
      "Why starting at 22 with less money can beat starting at 32 with more.",
    takeaways: [
      { vi: "Quy tắc 72: chia 72 cho lãi suất % để biết số năm gấp đôi tiền (7% ≈ 10.3 năm).",
        en: "Rule of 72: divide 72 by your % return to see doubling time (7% ≈ 10.3 years)." },
      { vi: "$200/tháng từ tuổi 22 tại 8% → ~$700k lúc 60. Bắt đầu năm 32 → chỉ ~$300k.",
        en: "$200/mo from age 22 at 8% → ~$700k by 60. Start at 32 → only ~$300k." },
      { vi: "Lãi kép cần 3 nhiên liệu: thời gian, tính đều đặn, và không rút giữa chừng.",
        en: "Compound growth needs three fuels: time, consistency, and no early withdrawals." },
      { vi: "'Tôi tương lai' là một con người thật - hãy chuyển khoản cho họ trước khi đi cà phê.",
        en: "'Future You' is a real person - pay them before you buy coffee." },
    ],
    frameworkVi:
      "Công thức FV = P × (1 + r)^n - biến thời gian thành đòn bẩy lớn nhất.",
    frameworkEn:
      "Formula FV = P × (1 + r)^n - turning time into your biggest leverage.",
    reflectionVi:
      "Nếu 'tôi năm 40 tuổi' viết thư cho bạn hôm nay, họ xin bạn dừng ngay khoản chi nào?",
    reflectionEn:
      "If '40-year-old you' wrote a letter today, what single expense would they beg you to stop?",
    drillVi:
      "Vào compoundinterestcalculator.io, mô phỏng 3 kịch bản: $50, $200, $500 / tháng × 30 năm × 8%.",
    drillEn:
      "On compoundinterestcalculator.io, simulate three scenarios: $50, $200, $500 / month × 30 years × 8%.",
  },
  {
    id: "fin-03",
    pillar: "finance",
    level: "intermediate",
    minutes: 9,
    medium: "read",
    titleVi: "Tránh bẫy tiêu dùng - Giải mã tâm lý học của Marketing",
    titleEn: "Avoiding Consumer Traps - Decoding the Psychology of Marketing",
    subtitleVi:
      "5 nguyên lý tâm lý mà quảng cáo dùng để đánh cắp ví của bạn - và cách vô hiệu hoá chúng.",
    subtitleEn:
      "The 5 psychological levers ads use to steal your wallet - and how to disarm them.",
    takeaways: [
      { vi: "Neo giá (Anchoring): giá gốc gạch chéo khiến giá mới trông 'rẻ' - luôn so sánh với giá thị trường, không với giá neo.",
        en: "Anchoring: crossed-out prices make the sale price look cheap - always compare to market, not the anchor." },
      { vi: "Khan hiếm giả (FOMO): 'chỉ còn 2 phần' → hoãn 48h trước khi mua bất cứ gì > 1 triệu.",
        en: "Manufactured scarcity: 'only 2 left' → sleep 48h on any purchase over $50." },
      { vi: "Chi phí ẩn: quy đổi giá thành 'số giờ làm việc' - chiếc túi 5 triệu = 40 giờ đời bạn.",
        en: "Hidden cost: convert prices to 'work hours' - a $200 bag = ~10 hours of your life." },
      { vi: "Trả góp 0% vẫn là nợ - bạn trả bằng tự do tương lai, không phải bằng lãi suất.",
        en: "0% instalments are still debt - you pay with future freedom, not interest." },
    ],
    frameworkVi:
      "Bộ lọc 4 câu hỏi trước mua: (1) Tôi có cần nó tuần sau không? (2) Nó thay thế thứ gì? (3) Đây có phải quyết định lúc mệt/buồn/say? (4) '48h' đã qua chưa?",
    frameworkEn:
      "4-Question Pre-Purchase Filter: (1) Will I still need this next week? (2) What does it replace? (3) Am I tired/sad/tipsy? (4) Has 48h passed?",
    reflectionVi:
      "Món đắt tiền cuối cùng bạn hối tiếc - cảm xúc gốc rễ khi mua là gì (khoe, thưởng cho bản thân, sợ bỏ lỡ)?",
    reflectionEn:
      "Your last regretted purchase - what root emotion drove it (status, self-reward, FOMO)?",
    drillVi:
      "Xoá 3 app mua sắm khỏi màn hình chính điện thoại trong 14 ngày; ghi lại số lần bạn muốn mở chúng.",
    drillEn:
      "Remove 3 shopping apps from your home screen for 14 days; log every craving to open them.",
  },
  {
    id: "fin-04",
    pillar: "finance",
    level: "intermediate",
    minutes: 10,
    medium: "read",
    titleVi: "Quỹ khẩn cấp - Tấm đệm 6 tháng cho tự do lựa chọn",
    titleEn: "Emergency Fund - A 6-Month Cushion for Freedom of Choice",
    subtitleVi:
      "Vì sao quỹ khẩn cấp quan trọng hơn đầu tư khi bạn dưới 30 tuổi.",
    subtitleEn:
      "Why an emergency fund matters more than investing when you're under 30.",
    takeaways: [
      { vi: "Mục tiêu: 3-6 tháng chi phí thiết yếu, giữ trong tài khoản tiết kiệm lãi suất cao (không đầu tư).",
        en: "Target: 3-6 months of essential expenses in a high-yield savings account (not invested)." },
      { vi: "Không có quỹ khẩn cấp = mọi khủng hoảng nhỏ trở thành khủng hoảng nợ.",
        en: "No emergency fund = every small crisis becomes a debt crisis." },
      { vi: "Nó mua cho bạn quyền nói 'không' - với sếp tồi, mối quan hệ độc hại, quyết định vội vàng.",
        en: "It buys you the right to say 'no' - to bad bosses, toxic relationships, rushed decisions." },
      { vi: "Xây theo bậc: 1 tháng → 3 tháng → 6 tháng. Mỗi mốc ăn mừng nhỏ để duy trì động lực.",
        en: "Build in tiers: 1 → 3 → 6 months. Celebrate each milestone to keep momentum." },
    ],
    frameworkVi:
      "Chiến lược 'Freedom Fund Ladder' - 3 tài khoản: tuần (thanh khoản), tháng (khẩn cấp), năm (cơ hội).",
    frameworkEn:
      "The 'Freedom Fund Ladder' - 3 accounts: weekly (liquid), monthly (emergency), yearly (opportunity).",
    reflectionVi:
      "Nếu mất thu nhập ngày mai, bạn sống được bao nhiêu ngày mà không vay và không thay đổi lối sống?",
    reflectionEn:
      "If income vanished tomorrow, how many days could you live without borrowing or downgrading?",
    drillVi:
      "Tính chi phí thiết yếu 1 tháng của bạn (thuê nhà + ăn + đi lại + hoá đơn). Nhân 3. Đây là mốc đầu tiên.",
    drillEn:
      "Compute your essential monthly cost (rent + food + transit + bills). Multiply by 3. That's your first milestone.",
  },
  {
    id: "fin-05",
    pillar: "finance",
    level: "mastery",
    minutes: 12,
    medium: "read",
    titleVi: "Đầu tư chỉ số (Index Fund) - Chiến lược của Warren Buffett cho người bận rộn",
    titleEn: "Index Fund Investing - Warren Buffett's Strategy for Busy People",
    subtitleVi:
      "Vì sao 90% quỹ đầu tư chủ động thua S&P 500, và cách người bình thường tận dụng điều đó.",
    subtitleEn:
      "Why 90% of active funds lose to the S&P 500 - and how normal people exploit that.",
    takeaways: [
      { vi: "Index fund = mua cả thị trường thay vì đoán cổ phiếu; phí quản lý chỉ 0.03-0.2%.",
        en: "Index funds = buy the whole market instead of guessing stocks; fees are just 0.03-0.2%." },
      { vi: "DCA (Dollar-Cost Averaging): đầu tư đều đặn hàng tháng bất kể thị trường lên/xuống.",
        en: "DCA (Dollar-Cost Averaging): invest a fixed amount monthly regardless of market swings." },
      { vi: "Không xem giá hàng ngày - thời gian ở trong thị trường quan trọng hơn 'canh thị trường'.",
        en: "Don't watch prices daily - time in the market beats timing the market." },
      { vi: "Đa dạng hoá: 60% cổ phiếu toàn cầu · 30% trái phiếu · 10% tiền mặt (điều chỉnh theo tuổi).",
        en: "Diversify: 60% global equities · 30% bonds · 10% cash (adjust by age)." },
    ],
    frameworkVi:
      "Chiến lược 3-Fund Portfolio của Bogleheads: VTI (US Total) · VXUS (International) · BND (Bonds).",
    frameworkEn:
      "Bogleheads' 3-Fund Portfolio: VTI (US Total) · VXUS (International) · BND (Bonds).",
    reflectionVi:
      "Bạn tin rằng mình 'khôn hơn thị trường', hay bạn khiêm tốn để thị trường làm việc thay bạn?",
    reflectionEn:
      "Do you believe you're 'smarter than the market' - or humble enough to let it work for you?",
    drillVi:
      "Mở tài khoản môi giới (Vanguard/Fidelity/local broker), cài lệnh mua tự động $100 vào VT hàng tháng.",
    drillEn:
      "Open a brokerage (Vanguard/Fidelity/local), set an auto-buy of $100/month into a global index (VT).",
  },
];

// ─────────────────────────────────────────────────────────
// ETIQUETTE - Speak less, listen deeper, influence more
// ─────────────────────────────────────────────────────────
const etiquette: LifestyleLesson[] = [
  {
    id: "etq-01",
    pillar: "etiquette",
    level: "foundation",
    minutes: 7,
    medium: "read",
    titleVi: "Lắng nghe chủ động - Kỹ năng tạo ảnh hưởng bị đánh giá thấp nhất",
    titleEn: "Active Listening - The Most Underrated Influence Skill",
    subtitleVi:
      "Người ta nhớ cảm giác khi trò chuyện với bạn, không phải câu nói của bạn.",
    subtitleEn:
      "People remember how you made them feel - not the clever line you said.",
    takeaways: [
      { vi: "Nghe để hiểu, không phải để trả lời - dừng chuẩn bị câu đáp trong đầu.",
        en: "Listen to understand, not to reply - stop rehearsing your comeback." },
      { vi: "Kỹ thuật 'paraphrase': lặp lại ý người kia bằng lời của bạn trước khi trả lời.",
        en: "The paraphrase move: restate their point in your words before responding." },
      { vi: "3 giây im lặng sau khi họ nói xong - cho phép suy nghĩ sâu hơn xuất hiện.",
        en: "Three seconds of silence after they finish - lets deeper thoughts surface." },
      { vi: "Câu hỏi mở > câu hỏi có/không. 'Điều gì khiến bạn nghĩ vậy?' mở cửa; 'Bạn có chắc không?' đóng cửa.",
        en: "Open questions > yes/no. 'What led you there?' opens; 'Are you sure?' closes." },
    ],
    frameworkVi:
      "Mô hình HEAR: Halt (dừng) · Engage (giao tiếp mắt) · Anticipate (kỳ vọng học điều gì mới) · Replay (nhắc lại).",
    frameworkEn:
      "The HEAR model: Halt · Engage (eye contact) · Anticipate (expect to learn) · Replay (paraphrase).",
    reflectionVi:
      "Trong cuộc trò chuyện gần nhất, bạn dành bao nhiêu % thời gian để nghe thực sự (không chuẩn bị lời)?",
    reflectionEn:
      "In your last conversation, what % of the time were you truly listening (not preparing your reply)?",
    drillVi:
      "3 ngày tới: trong mọi cuộc trò chuyện, paraphrase ít nhất 1 lần trước khi đưa ý kiến.",
    drillEn:
      "For 3 days: in every conversation, paraphrase at least once before offering your opinion.",
  },
  {
    id: "etq-02",
    pillar: "etiquette",
    level: "foundation",
    minutes: 8,
    medium: "read",
    titleVi: "Đặt giới hạn duyên dáng - Nói 'không' mà không cần xin lỗi",
    titleEn: "Elegant Boundaries - Saying 'No' Without Apology",
    subtitleVi:
      "Người trưởng thành nói 'không' như một thông tin, không phải một lời xin lỗi kéo dài.",
    subtitleEn:
      "Mature adults deliver 'no' as information, not as a drawn-out apology.",
    takeaways: [
      { vi: "Công thức: Cảm ơn + Từ chối rõ ràng + Không giải thích quá mức. 'Cảm ơn đã nghĩ đến mình. Lần này mình không tham gia được.'",
        en: "Formula: Thank + Clear no + No over-explaining. 'Thanks for thinking of me. I can't join this time.'" },
      { vi: "'Không' đầy đủ là một câu - không cần lý do dài dòng để nghe hợp lệ.",
        en: "'No' is a complete sentence - no long reason is needed for it to be valid." },
      { vi: "Trì hoãn có ý thức: 'Để mình xem lịch rồi trả lời trong 24h' - tránh 'yes' phản xạ.",
        en: "Intentional pause: 'Let me check and get back within 24h' - avoids reflexive yeses." },
      { vi: "Mỗi 'không' cho việc không quan trọng là một 'có' cho việc quan trọng.",
        en: "Every 'no' to the unimportant is a 'yes' to what matters." },
    ],
    frameworkVi:
      "Mô hình 3T: Thanks · Truth (câu từ chối 1 dòng) · Turnaround (gợi ý thay thế nếu muốn).",
    frameworkEn:
      "The 3T Model: Thanks · Truth (one-line no) · Turnaround (optional alternative).",
    reflectionVi:
      "Lời 'có' gần nhất khiến bạn kiệt sức - bạn đã đánh đổi điều gì để giữ hoà khí?",
    reflectionEn:
      "Your last exhausting 'yes' - what did you trade to keep the peace?",
    drillVi:
      "Tuần này, từ chối 3 lời mời không thực sự quan trọng bằng công thức 3T, không giải thích lại.",
    drillEn:
      "This week, decline 3 non-essential requests with the 3T formula - do not re-explain if pushed.",
  },
  {
    id: "etq-03",
    pillar: "etiquette",
    level: "intermediate",
    minutes: 9,
    medium: "read",
    titleVi: "Small talk có chiều sâu - Vượt qua thời tiết trong 60 giây",
    titleEn: "Deep Small Talk - Past the Weather in 60 Seconds",
    subtitleVi:
      "Cách chuyển một câu chào xã giao thành cuộc trò chuyện thực sự đáng nhớ.",
    subtitleEn:
      "How to turn a polite hello into a memorable conversation.",
    takeaways: [
      { vi: "Thay 'Bạn làm gì?' bằng 'Bạn đang phấn khích với dự án gì gần đây?' - mở ra năng lượng thay vì nhãn nghề nghiệp.",
        en: "Swap 'What do you do?' with 'What project has you excited lately?' - opens energy, not job labels." },
      { vi: "F.O.R.D. - 4 chủ đề an toàn: Family, Occupation, Recreation, Dreams. Dreams là cấp mở nhất.",
        en: "F.O.R.D. - 4 safe topics: Family, Occupation, Recreation, Dreams. Dreams unlocks the most." },
      { vi: "Câu hỏi tiếp nối 'Điều gì khiến bạn chọn con đường đó?' đưa cuộc trò chuyện sâu 2 lớp.",
        en: "The follow-up 'What drew you to that path?' takes any topic two layers deeper." },
      { vi: "Tự tiết lộ có cân xứng: bạn chia sẻ trước một chút, họ sẽ mở lòng gấp đôi.",
        en: "Reciprocal self-disclosure: share a little first - they'll open up twice as much." },
    ],
    frameworkVi:
      "Thang trò chuyện 4 tầng: Sự kiện → Ý kiến → Cảm xúc → Giá trị. Đi lên một tầng mỗi 2 phút.",
    frameworkEn:
      "The 4-Rung Ladder: Facts → Opinions → Feelings → Values. Climb one rung every 2 minutes.",
    reflectionVi:
      "Bạn dừng trò chuyện ở tầng nào vì sợ 'quá sâu'? Điều gì thực sự khiến bạn ngại?",
    reflectionEn:
      "Which rung do you stop at from fear of 'going too deep'? What are you really guarding?",
    drillVi:
      "Buổi gặp gỡ tiếp theo, đặt 3 câu hỏi 'Điều gì khiến bạn…' liên tiếp. Đếm câu chuyện bạn thu được.",
    drillEn:
      "At your next social event, ask three 'What drew you to…' questions in a row. Count the stories you collect.",
  },
  {
    id: "etq-04",
    pillar: "etiquette",
    level: "intermediate",
    minutes: 10,
    medium: "read",
    titleVi: "Nhạy văn hoá - Điều bạn không biết mình đang xúc phạm",
    titleEn: "Cultural Fluency - What You Don't Know You're Offending",
    subtitleVi:
      "Người thực sự lịch sự trên toàn cầu học cách quan sát trước khi hành động.",
    subtitleEn:
      "Truly polite global citizens learn to observe before they act.",
    takeaways: [
      { vi: "Cấp độ ngữ cảnh: văn hoá high-context (VN, JP, FI) nói ít, ngầm hiểu nhiều; low-context (US, DE) nói rõ, thẳng.",
        en: "Context levels: high-context cultures (VN, JP, FI) say less and imply more; low-context (US, DE) say it plain." },
      { vi: "Khoảng cách quyền lực: ở FI/SE gọi giáo sư bằng tên; ở VN/JP thêm chức danh và họ.",
        en: "Power distance: in FI/SE address professors by first name; in VN/JP always add title + family name." },
      { vi: "Quà tặng: chẵn số thường xui ở TQ, chai rượu tránh ở nước Hồi giáo, hoa cúc trắng chỉ dùng viếng ở VN.",
        en: "Gifts: even numbers are unlucky in CN, avoid alcohol in Muslim regions, white chrysanthemums = funerals in VN." },
      { vi: "Nguyên tắc vàng: hỏi và quan sát 3 tình huống trước khi đưa giả định.",
        en: "Golden rule: ask and observe 3 situations before assuming any norm." },
    ],
    frameworkVi:
      "Bản đồ 8 chiều Erin Meyer: giao tiếp, đánh giá, thuyết phục, lãnh đạo, quyết định, tin cậy, bất đồng, thời gian.",
    frameworkEn:
      "Erin Meyer's 8-dimension map: communicating, evaluating, persuading, leading, deciding, trusting, disagreeing, scheduling.",
    reflectionVi:
      "Lần gần nhất bạn 'chắc chắn' về điều gì đó ở văn hoá khác - bạn dựa vào phim ảnh hay trải nghiệm thật?",
    reflectionEn:
      "The last time you were 'sure' about another culture - was that from films or real experience?",
    drillVi:
      "Chọn 1 văn hoá bạn sẽ sống/làm việc cùng. Đọc chương tương ứng trong 'The Culture Map' + phỏng vấn 1 người bản địa.",
    drillEn:
      "Pick 1 culture you'll live/work with. Read its chapter in 'The Culture Map' + interview one native.",
  },
  {
    id: "etq-05",
    pillar: "etiquette",
    level: "mastery",
    minutes: 11,
    medium: "practice",
    titleVi: "Giao tiếp phi bạo lực - Nói sự thật mà không phá vỡ mối quan hệ",
    titleEn: "Nonviolent Communication - Truth Without Breaking Relationships",
    subtitleVi:
      "Cách nói điều khó nghe mà đối phương vẫn muốn tiếp tục lắng nghe bạn.",
    subtitleEn:
      "How to say the hard thing while the other person still wants to keep listening.",
    takeaways: [
      { vi: "Công thức OFNR: Observation (quan sát) + Feeling (cảm xúc) + Need (nhu cầu) + Request (yêu cầu).",
        en: "OFNR: Observation + Feeling + Need + Request - the 4-step honest sentence." },
      { vi: "Quan sát ≠ phán xét: 'Anh đi trễ 20 phút' (quan sát) chứ không phải 'Anh vô trách nhiệm' (phán xét).",
        en: "Observation ≠ judgment: 'You arrived 20 min late' (fact) not 'You're irresponsible' (label)." },
      { vi: "Cảm xúc thật là 1 từ: buồn, thất vọng, lo - không phải 'em cảm thấy anh không tôn trọng em' (đó là suy diễn).",
        en: "Real feelings are 1 word: sad, disappointed, worried - 'I feel disrespected' is an interpretation." },
      { vi: "Yêu cầu cụ thể, có thể làm được, và có thể từ chối được - nếu không, đó là mệnh lệnh.",
        en: "Requests must be specific, actionable, and refusable - otherwise it's a demand." },
    ],
    frameworkVi:
      "Mô hình Marshall Rosenberg (NVC) - kết nối trước khi thuyết phục.",
    frameworkEn:
      "Marshall Rosenberg's NVC - connection before persuasion.",
    reflectionVi:
      "Câu bạn muốn nói với một người quan trọng nhưng chưa dám - hãy viết lại theo công thức OFNR.",
    reflectionEn:
      "The thing you've wanted to say to someone important - rewrite it using the OFNR formula.",
    drillVi:
      "Viết 1 email OFNR dài 4 câu cho tình huống căng thẳng thực tế; gửi hoặc giữ nháp 24h rồi đọc lại.",
    drillEn:
      "Write a 4-sentence OFNR email for a real tension; send it, or hold it 24h and re-read.",
  },
];

// ─────────────────────────────────────────────────────────
// PRESENCE - Merged Grace & Mental Resilience
// ─────────────────────────────────────────────────────────
const presence: LifestyleLesson[] = [
  {
    id: "prs-01",
    pillar: "presence",
    level: "foundation",
    minutes: 7,
    medium: "audio",
    titleVi: "Điều tiết giọng nói - Uy quyền không cần lên tone",
    titleEn: "Vocal Modulation - Authority Without Raising Your Voice",
    subtitleVi:
      "Cách người có khí chất dùng giọng nói để dẫn dắt phòng họp mà không cần âm lượng.",
    subtitleEn:
      "How people with presence lead a room through voice - without volume.",
    takeaways: [
      { vi: "Kết thúc câu bằng tone đi xuống → thể hiện chắc chắn. Đi lên → biến câu khẳng định thành câu hỏi.",
        en: "End sentences with a downward pitch → certainty. Upward → turns statements into questions." },
      { vi: "Nhịp thở bụng cho giọng vang, không phải giọng ngực căng thẳng.",
        en: "Diaphragmatic breathing creates a resonant voice - not a tense chest voice." },
      { vi: "Sử dụng khoảng lặng 2 giây trước điểm quan trọng - kéo sự chú ý hơn cả lớn tiếng.",
        en: "Use a 2-second silence before your key point - commands attention more than loudness." },
      { vi: "Nói chậm hơn 10% bạn nghĩ là bình thường - người điềm tĩnh luôn nói chậm hơn.",
        en: "Speak 10% slower than feels normal - composed people always speak slower." },
    ],
    frameworkVi:
      "Bộ 4 nhịp Alan Alda: Pace · Pitch · Pause · Power (nhấn từ khoá).",
    frameworkEn:
      "Alan Alda's 4-P: Pace · Pitch · Pause · Power (key-word emphasis).",
    reflectionVi:
      "Nghe lại 1 phút bạn nói (ghi âm): bạn muốn giữ điều gì, và điều gì làm bạn nghe 'nhỏ' hơn con người thật?",
    reflectionEn:
      "Record 60 seconds of yourself speaking: what do you want to keep, and what makes you sound 'smaller' than you are?",
    drillVi:
      "Đọc to 1 đoạn 200 từ mỗi ngày × 7 ngày: đánh dấu 3 từ nhấn, 2 chỗ dừng. Ghi âm ngày 1 và ngày 7 để so sánh.",
    drillEn:
      "Read 200 words aloud daily × 7 days: mark 3 emphasis words, 2 pauses. Record days 1 and 7 to compare.",
  },
  {
    id: "prs-02",
    pillar: "presence",
    level: "foundation",
    minutes: 8,
    medium: "read",
    titleVi: "Ngôn ngữ cơ thể của người tự tin - Chiếm không gian mà không hung hăng",
    titleEn: "Confident Body Language - Owning Space Without Aggression",
    subtitleVi:
      "Vì sao bạn được đánh giá trong 7 giây - và cách 'tái đàm phán' ấn tượng đó.",
    subtitleEn:
      "Why you're judged in 7 seconds - and how to 'renegotiate' that impression.",
    takeaways: [
      { vi: "Chân đứng vững rộng bằng vai, trọng lượng dàn đều - chân run tay sẽ run theo.",
        en: "Feet shoulder-width, weight evenly balanced - jittery feet trigger jittery hands." },
      { vi: "Vai kéo xuống + về sau, mở ngực → tăng testosterone và giảm cortisol (nghiên cứu Amy Cuddy).",
        en: "Shoulders down and back, chest open → raises testosterone, lowers cortisol (Amy Cuddy)." },
      { vi: "Giao tiếp mắt kiểu 'tam giác' - di chuyển giữa hai mắt và trán trong 60% thời gian nói chuyện.",
        en: "'Triangle' eye contact - move between both eyes and forehead ~60% of speaking time." },
      { vi: "Tay để hở lòng bàn tay khi giải thích → tăng độ tin cậy; tay giấu trong túi → giảm.",
        en: "Open-palm gestures increase trust; hands in pockets decrease it." },
    ],
    frameworkVi:
      "Tư thế 'high-power pose' 2 phút trước sự kiện - thay đổi hoá học não bộ trước khi bạn bước vào phòng.",
    frameworkEn:
      "2-minute high-power pose before events - shifts your neurochemistry before you enter the room.",
    reflectionVi:
      "Trong 3 tình huống gần nhất bạn thấy 'nhỏ bé', tư thế của bạn thu lại ở đâu (vai, tay, chân)?",
    reflectionEn:
      "In the last 3 moments you felt small, where did your body shrink (shoulders, hands, feet)?",
    drillVi:
      "2 phút power-pose trong phòng tắm, mỗi sáng, 14 ngày. Ghi 'mood score' 1-10 trước/sau cuộc họp.",
    drillEn:
      "2-minute power-pose in the bathroom, every morning, 14 days. Log a 1-10 mood score before/after meetings.",
  },
  {
    id: "prs-03",
    pillar: "presence",
    level: "intermediate",
    minutes: 9,
    medium: "read",
    titleVi: "Tư duy Stoic - Bình tĩnh giữa bão dựa trên triết học 2000 năm",
    titleEn: "Stoic Mindset - Calm in the Storm, 2,000-Year Playbook",
    subtitleVi:
      "Marcus Aurelius điều hành đế chế La Mã giữa dịch bệnh - bằng 3 nguyên lý.",
    subtitleEn:
      "Marcus Aurelius ran the Roman Empire through a plague - with 3 principles.",
    takeaways: [
      { vi: "Nhị phân kiểm soát: chỉ dồn năng lượng vào điều bạn kiểm soát (hành động, phản ứng), buông điều bạn không (thời tiết, ý kiến).",
        en: "Dichotomy of control: pour energy into what you control (actions, reactions), release what you don't (weather, opinions)." },
      { vi: "Trở ngại là con đường: 'The obstacle is the way' - mỗi khó khăn là dữ liệu, không phải hình phạt.",
        en: "'The obstacle is the way' - every hardship is data, not punishment." },
      { vi: "Memento mori - hình dung cái chết mỗi sáng để đưa hiện tại về đúng tỷ lệ.",
        en: "Memento mori - visualise mortality daily to right-size the present." },
      { vi: "Nghiền ngẫm buổi tối (evening review): 3 câu hỏi - Ta đã làm sai gì? Ta đã làm đúng gì? Ta cần cải thiện gì?",
        en: "Evening review: What did I do wrong? What did I do well? What must I improve?" },
    ],
    frameworkVi:
      "3 kỷ luật Epictetus: Nhận thức · Hành động · Ý chí - bộ ba tạo bản lĩnh nội tâm.",
    frameworkEn:
      "Epictetus' 3 disciplines: Perception · Action · Will - the inner resilience triad.",
    reflectionVi:
      "Nỗi lo lớn nhất tuần này: bao nhiêu % nằm trong tầm kiểm soát, bao nhiêu % là 'thời tiết'?",
    reflectionEn:
      "This week's biggest worry: what % is in your control, what % is 'weather'?",
    drillVi:
      "5 phút mỗi tối × 21 ngày: viết evening review 3 câu hỏi Stoic. Đọc lại toàn bộ vào ngày 22.",
    drillEn:
      "5 minutes each evening × 21 days: write the Stoic 3-question review. Read them all on day 22.",
  },
  {
    id: "prs-04",
    pillar: "presence",
    level: "intermediate",
    minutes: 8,
    medium: "audio",
    titleVi: "Tái định khung nhận thức (CBT) - Đổi câu chuyện, đổi cảm xúc",
    titleEn: "Cognitive Reframing (CBT) - Change the Story, Change the Feeling",
    subtitleVi:
      "Sự kiện không tạo ra cảm xúc - diễn giải của bạn về sự kiện mới tạo ra cảm xúc.",
    subtitleEn:
      "Events don't create emotions - your interpretation of events does.",
    takeaways: [
      { vi: "Nhận diện 10 lỗi tư duy phổ biến: đọc suy nghĩ, dự đoán tương lai, tuyệt đối hoá, cá nhân hoá…",
        en: "Spot the 10 cognitive distortions: mind-reading, fortune-telling, black-and-white, personalisation…" },
      { vi: "Kỹ thuật 'bằng chứng ủng hộ / phản đối' - chấm điểm suy nghĩ như một luật sư.",
        en: "The 'evidence for/against' technique - cross-examine thoughts like a lawyer." },
      { vi: "Thay 'Tôi sẽ thất bại' bằng 'Đây là điều tôi chưa giỏi - hôm nay'. Cùng sự thật, khung khác.",
        en: "Swap 'I'll fail' for 'This is something I'm not yet good at - today.' Same facts, different frame." },
      { vi: "Hỏi 'Bạn thân của tôi trong tình huống này sẽ nói gì với tôi?' để rời khỏi giọng tự phê bình.",
        en: "Ask 'What would my best friend say in this?' to escape your inner critic voice." },
    ],
    frameworkVi:
      "Mô hình ABC của Albert Ellis: Activating event → Belief → Consequence. Sửa B để đổi C.",
    frameworkEn:
      "Albert Ellis' ABC model: Activating event → Belief → Consequence. Edit B to change C.",
    reflectionVi:
      "Suy nghĩ tự động 'tôi không đủ giỏi' - 3 bằng chứng phản đối gần đây nhất là gì?",
    reflectionEn:
      "The automatic thought 'I'm not good enough' - what are 3 recent pieces of counter-evidence?",
    drillVi:
      "3 lần / ngày × 7 ngày: bắt gặp 1 suy nghĩ tiêu cực, viết ra, tìm 2 bằng chứng ủng hộ + 2 phản đối.",
    drillEn:
      "3×/day × 7 days: catch one negative thought, write it down, list 2 pro + 2 con pieces of evidence.",
  },
  {
    id: "prs-05",
    pillar: "presence",
    level: "mastery",
    minutes: 10,
    medium: "read",
    titleVi: "Sức hút (Charisma) - Ma trận Warmth × Competence",
    titleEn: "Charisma - The Warmth × Competence Matrix",
    subtitleVi:
      "Người có sức hút không sinh ra đã có - họ luyện tập 2 tín hiệu cụ thể.",
    subtitleEn:
      "Charismatic people aren't born - they train two specific signals.",
    takeaways: [
      { vi: "Warmth = họ có thích tôi không? Tín hiệu: giao tiếp mắt, cười tự nhiên, nghiêng người về phía trước.",
        en: "Warmth = do they like me? Signals: eye contact, natural smile, leaning in." },
      { vi: "Competence = họ có làm được không? Tín hiệu: tư thế mở, giọng vững, ngôn từ chính xác.",
        en: "Competence = can they deliver? Signals: open posture, steady voice, precise language." },
      { vi: "Warmth cao + Competence thấp → đáng yêu nhưng không được tin. Ngược lại → được nể nhưng không được yêu.",
        en: "High warmth + low competence → loved not trusted. Reverse → respected not liked." },
      { vi: "Sự hiện diện đầy đủ (full presence) là bí mật lớn nhất - không nhìn điện thoại khi nói chuyện.",
        en: "Full presence is the biggest secret - no phone-glancing while talking." },
    ],
    frameworkVi:
      "Ma trận Amy Cuddy - 4 góc phần tư của ấn tượng đầu tiên.",
    frameworkEn:
      "Amy Cuddy's Matrix - the four quadrants of first impressions.",
    reflectionVi:
      "Trong mắt 3 người quen nhất, bạn được xem là warmth cao hay competence cao? Bạn cần cân bằng gì?",
    reflectionEn:
      "In the eyes of 3 close people, are you seen as high warmth or high competence? What needs balancing?",
    drillVi:
      "1 tuần: mỗi cuộc gặp, để điện thoại úp xuống + giao tiếp mắt 3 giây khi chào. Ghi phản hồi cảm nhận.",
    drillEn:
      "1 week: phone face-down every meeting + 3-second eye contact on hello. Log the vibe shift you notice.",
  },
];

// ─────────────────────────────────────────────────────────
// WELLNESS - New pillar: Physical health
// ─────────────────────────────────────────────────────────
const wellness: LifestyleLesson[] = [
  {
    id: "wel-01",
    pillar: "wellness",
    level: "foundation",
    minutes: 8,
    medium: "read",
    titleVi: "Kiến trúc giấc ngủ - Vũ khí phục hồi mạnh nhất, miễn phí",
    titleEn: "Sleep Architecture - Your Most Powerful Recovery Tool, Free",
    subtitleVi:
      "Giấc ngủ không phải 'thời gian chết' - đó là khi não bạn dọn rác và ghi nhớ dài hạn.",
    subtitleEn:
      "Sleep isn't 'downtime' - it's when the brain clears waste and consolidates memory.",
    takeaways: [
      { vi: "90 phút = 1 chu kỳ ngủ. Đặt báo thức theo bội số của 90 phút, không phải 8 giờ tròn.",
        en: "90 minutes = one sleep cycle. Set alarms in multiples of 90 min, not round 8-hour marks." },
      { vi: "Ánh sáng buổi sáng 10 phút trong 30 phút đầu ngày → chỉnh nhịp sinh học tốt hơn cà phê.",
        en: "10 min of morning sunlight in your first 30 min → resets circadian rhythm better than coffee." },
      { vi: "Không caffeine sau 14:00 - thời gian bán huỷ 5-6h, ảnh hưởng chất lượng giấc sâu.",
        en: "No caffeine after 2 PM - 5-6h half-life eats into deep sleep quality." },
      { vi: "Phòng ngủ 18-20°C, tối hoàn toàn, không màn hình 30 phút trước ngủ.",
        en: "Bedroom 18-20°C, fully dark, no screens 30 min before bed." },
    ],
    frameworkVi:
      "Bộ 4 trụ cột của Matthew Walker: Regularity · Darkness · Cool · Calm.",
    frameworkEn:
      "Matthew Walker's 4 pillars: Regularity · Darkness · Cool · Calm.",
    reflectionVi:
      "1 tuần qua, giờ ngủ trung bình của bạn lệch bao nhiêu phút giữa các đêm? Sự lệch đó ảnh hưởng năng lượng như thế nào?",
    reflectionEn:
      "Over the past week, how many minutes did your bedtime drift night to night? How did that affect your energy?",
    drillVi:
      "7 ngày: cố định giờ đi ngủ và giờ dậy trong khoảng ±30 phút, kể cả cuối tuần. Ghi năng lượng buổi sáng 1-10.",
    drillEn:
      "7 days: keep bedtime and wake-time within ±30 min, weekends included. Log a 1-10 morning energy score.",
  },
  {
    id: "wel-02",
    pillar: "wellness",
    level: "foundation",
    minutes: 9,
    medium: "read",
    titleVi: "Vận động hàng ngày - Zone 2 và câu chuyện của ty thể",
    titleEn: "Daily Movement - Zone 2 and the Mitochondria Story",
    subtitleVi:
      "Vì sao đi bộ nhanh 45 phút, 4 lần/tuần đánh bại 90% lịch tập phức tạp.",
    subtitleEn:
      "Why brisk walking 45 min × 4/week beats 90% of complicated workout plans.",
    takeaways: [
      { vi: "Zone 2 = nhịp tim 60-70% max, đủ để nói câu ngắn nhưng không hát được.",
        en: "Zone 2 = 60-70% max HR - you can hold a short conversation but not sing." },
      { vi: "Zone 2 xây ty thể (nhà máy năng lượng) → tăng sức bền, giảm stress, cải thiện chuyển hoá.",
        en: "Zone 2 builds mitochondria → endurance, stress resilience, and metabolic health improve." },
      { vi: "10.000 bước không phải phép màu - 7.000-8.000 bước đã cho 90% lợi ích tim mạch.",
        en: "10k steps isn't magic - 7-8k already captures ~90% of cardiovascular benefit." },
      { vi: "Kết hợp 2 buổi kháng lực/tuần (push, pull, squat, hinge) → giữ khối cơ và mật độ xương sau tuổi 30.",
        en: "Add 2 resistance sessions/week (push, pull, squat, hinge) → preserves muscle and bone density past 30." },
    ],
    frameworkVi:
      "Công thức Peter Attia: 180 phút Zone 2 + 2 buổi tạ + 1 buổi Zone 5 (VO2 max) mỗi tuần.",
    frameworkEn:
      "Peter Attia's formula: 180 min Zone 2 + 2 strength sessions + 1 Zone 5 (VO2 max) session per week.",
    reflectionVi:
      "'Không có thời gian tập' - thực sự bạn có mất bao nhiêu phút mỗi ngày trên mạng xã hội?",
    reflectionEn:
      "'No time to exercise' - how many minutes do you actually spend on social media per day?",
    drillVi:
      "14 ngày: đi bộ nhanh 30 phút / ngày ngoài trời. Không nghe podcast dày đặc - để đầu óc nghỉ.",
    drillEn:
      "14 days: brisk 30-min walk outdoors daily. Skip heavy podcasts - let your mind idle.",
  },
  {
    id: "wel-03",
    pillar: "wellness",
    level: "intermediate",
    minutes: 10,
    medium: "read",
    titleVi: "Dinh dưỡng tối giản - 5 nguyên tắc thay thế 50 chế độ ăn",
    titleEn: "Minimalist Nutrition - 5 Principles That Replace 50 Diets",
    subtitleVi:
      "Bỏ qua tất cả các trend - 5 quy tắc này là điểm chung của mọi nghiên cứu dài hạn.",
    subtitleEn:
      "Skip every trend - these 5 rules are the common denominator of every long-term study.",
    takeaways: [
      { vi: "Protein: 1.2-1.6 g/kg cân nặng/ngày. Đây là dinh dưỡng khó bù nhất khi già.",
        en: "Protein: 1.2-1.6 g/kg body weight/day. The hardest nutrient to make up for later in life." },
      { vi: "Ăn 'màu' - 5 màu rau củ/ngày phủ hầu hết vi chất và chất chống oxy hoá.",
        en: "Eat the rainbow - 5 vegetable colours/day covers most micronutrients and antioxidants." },
      { vi: "Uống nước theo cân nặng: cân nặng (kg) × 30 ml = mức tối thiểu.",
        en: "Water: bodyweight (kg) × 30 ml = your daily minimum." },
      { vi: "Đường thêm < 25 g/ngày (WHO). Kiểm tra nhãn - 'không đường' vẫn có thể chứa syrup ngô.",
        en: "Added sugar < 25 g/day (WHO). Read labels - 'sugar-free' can still hide corn syrup." },
      { vi: "80/20: 80% ăn thực phẩm nguyên bản, 20% linh hoạt xã hội. Đủ để đi được 30 năm.",
        en: "80/20: 80% whole foods, 20% social flexibility. Sustainable for 30 years." },
    ],
    frameworkVi:
      "Bộ 5 Michael Pollan: 'Ăn thức ăn. Không quá nhiều. Chủ yếu là thực vật.' + đủ protein + đủ nước.",
    frameworkEn:
      "Michael Pollan's rules: 'Eat food. Not too much. Mostly plants.' + enough protein + enough water.",
    reflectionVi:
      "Ghi lại 1 ngày ăn thật của bạn không chỉnh sửa - có bao nhiêu bữa là 'thức ăn' và bao nhiêu là 'sản phẩm thực phẩm'?",
    reflectionEn:
      "Log one honest day of eating - how many meals were 'food' vs 'food products'?",
    drillVi:
      "7 ngày: chụp ảnh mọi bữa ăn (không chia sẻ), đánh dấu ✓ nếu có protein + 3 màu rau củ. Đếm số ✓.",
    drillEn:
      "7 days: photograph every meal (privately). Tag ✓ if it has protein + 3 veg colours. Count your ✓.",
  },
  {
    id: "wel-04",
    pillar: "wellness",
    level: "intermediate",
    minutes: 7,
    medium: "audio",
    titleVi: "Hơi thở - Nút reset thần kinh miễn phí bạn luôn mang theo",
    titleEn: "Breath - The Free Nervous-System Reset You Always Carry",
    subtitleVi:
      "3 kỹ thuật thở có nghiên cứu ủng hộ, dùng trước phỏng vấn, sau tranh cãi, trước ngủ.",
    subtitleEn:
      "3 research-backed breath techniques for interviews, arguments, and pre-sleep.",
    takeaways: [
      { vi: "Physiological sigh (Andrew Huberman): 2 hít vào mũi + 1 thở ra dài qua miệng × 3 lần → giảm lo âu tức thì.",
        en: "Physiological sigh (Huberman): 2 nasal inhales + 1 long mouth exhale × 3 → drops anxiety instantly." },
      { vi: "Box breathing 4-4-4-4 (Navy SEAL): dùng trước sự kiện áp lực để ổn định nhịp tim.",
        en: "Box breathing 4-4-4-4 (Navy SEAL): before high-pressure moments to steady heart rate." },
      { vi: "4-7-8 (Andrew Weil) trước ngủ: hít 4 · giữ 7 · thở ra 8. Kích hoạt hệ đối giao cảm.",
        en: "4-7-8 (Andrew Weil) pre-sleep: inhale 4 · hold 7 · exhale 8. Triggers parasympathetic state." },
      { vi: "Thở qua mũi (không mũi kín) mặc định - cải thiện oxy hoá và giấc ngủ.",
        en: "Nasal breathing as default (unless blocked) - improves oxygenation and sleep." },
    ],
    frameworkVi:
      "Bảng chọn: lo âu → sigh · trước áp lực → box · trước ngủ → 4-7-8.",
    frameworkEn:
      "Cheat-sheet: anxious → sigh · pre-pressure → box · pre-sleep → 4-7-8.",
    reflectionVi:
      "Khoảnh khắc căng thẳng gần nhất - hơi thở của bạn ở đâu (ngực trên, bụng, nín)? Bạn có nhận ra kịp không?",
    reflectionEn:
      "Your last stressful moment - where was your breath (upper chest, belly, held)? Did you notice in time?",
    drillVi:
      "Cài báo 3 lần/ngày × 7 ngày: dừng, 2 physiological sigh, quay lại việc đang làm.",
    drillEn:
      "Set 3 alarms/day × 7 days: pause, 2 physiological sighs, return to work.",
  },
  {
    id: "wel-05",
    pillar: "wellness",
    level: "mastery",
    minutes: 11,
    medium: "read",
    titleVi: "Thời gian nghỉ chủ động - Vì sao 'chill mà mệt' là dấu hiệu nguy hiểm",
    titleEn: "Active Recovery - Why 'Chilling but Tired' Is a Red Flag",
    subtitleVi:
      "Nghỉ ngơi thật sự không xảy ra khi bạn cuộn Instagram - nó cần thiết kế.",
    subtitleEn:
      "Real rest doesn't happen while you scroll - it must be designed.",
    takeaways: [
      { vi: "7 loại nghỉ (Saundra Dalton-Smith): thể chất, tinh thần, cảm xúc, xã hội, giác quan, sáng tạo, tâm linh.",
        en: "7 types of rest (Dalton-Smith): physical, mental, emotional, social, sensory, creative, spiritual." },
      { vi: "'Mệt' phổ biến ở người trẻ là mệt giác quan (sensory) - điều trị: 1 giờ không màn hình mỗi tối.",
        en: "The common 'tired' in youth is sensory fatigue - cure: 1 screen-free hour every evening." },
      { vi: "Mệt xã hội cần 'thời gian yên tĩnh với chính mình', không phải 'thêm cà phê với bạn'.",
        en: "Social fatigue needs alone-time - not another coffee with friends." },
      { vi: "Rest ≠ recovery ≠ sleep. Ba khái niệm tách biệt - thiếu bất kỳ khái niệm nào tạo 'kiệt sức yên tĩnh'.",
        en: "Rest ≠ recovery ≠ sleep. Three separate concepts - missing any creates 'quiet burnout'." },
    ],
    frameworkVi:
      "Bảng chẩn đoán 7 loại mệt của Saundra Dalton-Smith - chọn đúng liều thuốc, không phải 'ngủ thêm'.",
    frameworkEn:
      "Dalton-Smith's 7-type fatigue diagnostic - pick the right remedy, not just 'sleep more'.",
    reflectionVi:
      "Nếu 3 giờ nghỉ tiếp theo hoàn toàn của bạn, không ai đánh giá - bạn sẽ làm gì (không phải nên làm gì)?",
    reflectionEn:
      "If your next 3 free hours had zero judgement - what would you actually do (not 'should' do)?",
    drillVi:
      "1 tuần: chấm điểm 7 loại nghỉ mỗi tối (1-10). Cuối tuần, dành 90 phút cho loại điểm thấp nhất.",
    drillEn:
      "1 week: score all 7 rest types nightly (1-10). Weekend: spend 90 min on the lowest one.",
  },
];

import { LIFESTYLE_LESSONS_EXPANSION } from "./lifestyleAcademyLessonsExpansion";
import { LIFESTYLE_LESSONS_EXPANSION_2 } from "./lifestyleAcademyLessonsExpansion2";
import { LIFESTYLE_LESSONS_EXPANSION_3 } from "./lifestyleAcademyLessonsExpansion3";
import { LIFESTYLE_LESSONS_EXPANSION_4 } from "./lifestyleAcademyLessonsExpansion4";
import { LIFESTYLE_LESSONS_EXPANSION_5 } from "./lifestyleAcademyLessonsExpansion5";
import { LIFESTYLE_SELF_STUDY_LESSONS } from "./lifestyleSelfStudyLessons";
import { LIFESTYLE_PARTYING_LESSONS } from "./lifestylePartyingLessons";

import { LIFESTYLE_ENRICHMENT } from "./lifestyleAcademyEnrichment";

const byPillar = (source: LifestyleLesson[], key: LifestylePillarKey) =>
  source.filter((l) => l.pillar === key);

/**
 * Attach the depth layer (why it matters / deep dive / illustration emojis) to
 * lessons written before those fields existed. Anything the lesson already
 * defines always wins, so future hand-written content is never overwritten.
 */
const withDepth = (lesson: LifestyleLesson): LifestyleLesson => {
  const extra = LIFESTYLE_ENRICHMENT[lesson.id];
  if (!extra) return lesson;
  return {
    ...lesson,
    whyItMattersVi: lesson.whyItMattersVi ?? extra.whyItMattersVi,
    whyItMattersEn: lesson.whyItMattersEn ?? extra.whyItMattersEn,
    deepDiveVi: lesson.deepDiveVi ?? extra.deepDiveVi,
    deepDiveEn: lesson.deepDiveEn ?? extra.deepDiveEn,
    illustrationEmojis: lesson.illustrationEmojis ?? extra.illustrationEmojis,
  };
};

// Interleave expansion lessons per pillar so each pillar reads as a continuous
// curriculum (foundation -> intermediate -> mastery) instead of being split.
export const LIFESTYLE_LESSONS: LifestyleLesson[] = [
  ...finance,   ...byPillar(LIFESTYLE_LESSONS_EXPANSION, "finance"),   ...byPillar(LIFESTYLE_LESSONS_EXPANSION_2, "finance"),   ...byPillar(LIFESTYLE_LESSONS_EXPANSION_3, "finance"),   ...byPillar(LIFESTYLE_LESSONS_EXPANSION_4, "finance"),   ...byPillar(LIFESTYLE_LESSONS_EXPANSION_5, "finance"),
  ...etiquette, ...byPillar(LIFESTYLE_LESSONS_EXPANSION, "etiquette"), ...byPillar(LIFESTYLE_LESSONS_EXPANSION_2, "etiquette"), ...byPillar(LIFESTYLE_LESSONS_EXPANSION_3, "etiquette"), ...byPillar(LIFESTYLE_LESSONS_EXPANSION_4, "etiquette"), ...byPillar(LIFESTYLE_LESSONS_EXPANSION_5, "etiquette"),
  ...presence,  ...byPillar(LIFESTYLE_LESSONS_EXPANSION, "presence"),  ...byPillar(LIFESTYLE_LESSONS_EXPANSION_2, "presence"),  ...byPillar(LIFESTYLE_LESSONS_EXPANSION_3, "presence"),  ...byPillar(LIFESTYLE_LESSONS_EXPANSION_4, "presence"),  ...byPillar(LIFESTYLE_LESSONS_EXPANSION_5, "presence"),
  ...wellness,  ...byPillar(LIFESTYLE_LESSONS_EXPANSION, "wellness"),  ...byPillar(LIFESTYLE_LESSONS_EXPANSION_2, "wellness"),  ...byPillar(LIFESTYLE_LESSONS_EXPANSION_3, "wellness"),  ...byPillar(LIFESTYLE_LESSONS_EXPANSION_4, "wellness"),  ...byPillar(LIFESTYLE_LESSONS_EXPANSION_5, "wellness"),
  ...LIFESTYLE_SELF_STUDY_LESSONS,
  ...LIFESTYLE_PARTYING_LESSONS,
].map(withDepth);

