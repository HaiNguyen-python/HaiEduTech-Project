/**
 * @file lifestyleAcademyLessonsExpansion4.ts
 * @description Fourth expansion pack for the Lifestyle Academy - adds two
 *              mastery-level, long-form lessons per pillar with deep-dive
 *              narratives, "why it matters" context, and expanded takeaways.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

import type { LifestyleLesson } from "./lifestyleAcademyLessons";

export const LIFESTYLE_LESSONS_EXPANSION_4: LifestyleLesson[] = [
  // ── FINANCE ─────────────────────────────────────────────
  {
    id: "fin-14",
    pillar: "finance",
    level: "mastery",
    minutes: 13,
    medium: "read",
    titleVi: "Bậc thang tài sản 5 tầng - Từ tiền mặt tới di sản",
    titleEn: "The 5-Tier Wealth Ladder - From Cash to Legacy",
    subtitleVi:
      "Không phải ai giàu cũng an toàn, không phải ai an toàn cũng giàu. Bậc thang tài sản giúp bạn biết mình đang ở đâu và bước tiếp theo là gì.",
    subtitleEn:
      "Not everyone rich is safe, and not everyone safe is rich. The wealth ladder tells you where you stand and what step comes next.",
    takeaways: [
      { vi: "Tầng 1 - Tiền mặt an toàn: 3-6 tháng chi phí, trong tài khoản lãi cao, không rủi ro biến động.",
        en: "Tier 1 - Cash Safety: 3-6 months of expenses in a high-yield account, zero volatility risk." },
      { vi: "Tầng 2 - Bảo vệ: bảo hiểm sức khoẻ, nhân thọ mệnh giá 10× thu nhập, khuyết tật (disability).",
        en: "Tier 2 - Protection: health insurance, life cover ~10× income, disability insurance." },
      { vi: "Tầng 3 - Đầu tư tăng trưởng: quỹ chỉ số toàn cầu, tài khoản hưu trí ưu đãi thuế.",
        en: "Tier 3 - Growth Investing: global index funds, tax-advantaged retirement accounts." },
      { vi: "Tầng 4 - Tài sản tạo dòng tiền: bất động sản cho thuê, cổ tức, doanh nghiệp nhỏ.",
        en: "Tier 4 - Cash-flowing Assets: rentals, dividends, small businesses." },
      { vi: "Tầng 5 - Di sản: quỹ giáo dục, quỹ từ thiện, kế hoạch chuyển giao thuế tối ưu.",
        en: "Tier 5 - Legacy: education funds, charitable trusts, tax-efficient succession plans." },
      { vi: "Sai lầm phổ biến: nhảy cóc tầng - đầu tư crypto khi chưa có quỹ khẩn cấp = xây tháp trên cát.",
        en: "Common error: skipping tiers - buying crypto without an emergency fund = building on sand." },
    ],
    frameworkVi:
      "Mô hình 'Wealth Ladder' của Nick Maggiulli (Of Dollars and Data) kết hợp Ramit Sethi.",
    frameworkEn:
      "Nick Maggiulli's Wealth Ladder framework (Of Dollars and Data) blended with Ramit Sethi.",
    reflectionVi:
      "Bạn đang ở tầng nào? Nếu ngày mai mất việc 12 tháng, tài chính của bạn giữ được bao nhiêu tầng?",
    reflectionEn:
      "Which tier are you on? If you lost your job for 12 months tomorrow, which tiers would still hold?",
    drillVi:
      "30 phút: vẽ bậc thang cá nhân với số cụ thể (VND). Tô đỏ tầng chưa đủ, xanh tầng đã vững. Chọn 1 hành động tuần này.",
    drillEn:
      "30 min: draw your personal ladder with real numbers. Red = incomplete, green = solid. Pick one action for this week.",
    whyItMattersVi:
      "Đa số người trẻ 'thấy giàu' nhờ chi tiêu, không phải nhờ tài sản. Bậc thang buộc bạn nhìn thẳng vào cấu trúc thay vì cảm giác.",
    whyItMattersEn:
      "Most young people look rich through spending, not net worth. The ladder forces you to face structure, not vibes.",
    deepDiveVi: [
      "Nick Maggiulli - nhà phân tích dữ liệu tài chính - nhận thấy điều nghịch lý: có người kiếm 200 triệu/tháng mà không dám nghỉ ốm, còn có người kiếm 25 triệu vẫn ngủ ngon. Khác biệt không nằm ở thu nhập, mà nằm ở TẦNG mà số tiền được xếp vào.",
      "Tầng 1 tưởng đơn giản nhưng là tầng bị bỏ qua nhiều nhất. Không có 3 tháng chi phí trong tài khoản = mọi khoản đầu tư đều biến thành 'đầu cơ bắt buộc', vì bạn sẽ phải bán đúng lúc thị trường sụp đổ để trả tiền thuê nhà.",
      "Tầng 4 là nơi tài sản 'ngủ' biến thành thu nhập. Một người có 3 tỷ trong tài khoản tiết kiệm và một người có 3 tỷ trong bất động sản cho thuê nhìn giống nhau trên giấy, nhưng người thứ hai có thể nghỉ hưu, người thứ nhất thì không.",
      "Tầng 5 - di sản - không dành cho tỷ phú. Một khoản 100 triệu để đúng nơi có thể trả toàn bộ đại học cho một đứa cháu 20 năm sau nhờ lãi kép. Ai xây tới tầng này thay đổi cả một dòng họ.",
    ],
    deepDiveEn: [
      "Nick Maggiulli - a data-driven finance writer - noticed a paradox: some people earn $8k/month and cannot afford a sick day, while others earn $1k and sleep well. The difference is not income, it is the TIER their money sits on.",
      "Tier 1 sounds trivial but is the most-skipped step. Without 3 months of expenses saved, every investment becomes forced speculation, because you will sell at the worst moment to cover rent.",
      "Tier 4 is where sleeping assets become income. Two people each holding $120k - one in a savings account, one in a rental producing $900/month - look identical on paper, but only the second can quit their job.",
      "Tier 5 - legacy - is not just for billionaires. $5k placed correctly today can fund a nephew's university 20 years from now through compounding. Anyone who builds this tier changes an entire family line.",
    ],
  },
  {
    id: "fin-15",
    pillar: "finance",
    level: "intermediate",
    minutes: 11,
    medium: "read",
    titleVi: "Chi tiêu có ý thức - Phân biệt Giá trị, Giá cả và Chi phí ẩn",
    titleEn: "Conscious Spending - Value vs Price vs Hidden Cost",
    subtitleVi:
      "Bạn không nghèo vì mua cà phê - bạn nghèo vì không biết mỗi khoản chi thực sự 'lấy' bao nhiêu ngày tự do của tương lai.",
    subtitleEn:
      "You are not poor because of coffee - you are poor because you never learned how many days of future freedom each purchase quietly costs.",
    takeaways: [
      { vi: "Giá cả là số trên bill. Giá trị là mức độ nó phục vụ mục tiêu sống. Chúng có thể lệch 10 lần.",
        en: "Price is the number on the bill. Value is how much it serves your life goals. They can diverge 10×." },
      { vi: "Chi phí ẩn: thời gian bảo trì, không gian lưu trữ, phí đăng ký gia hạn, cơ hội mất đi.",
        en: "Hidden costs: maintenance time, storage space, renewal fees, opportunity cost." },
      { vi: "Quy tắc 'giờ làm việc': quy đổi mỗi món về số giờ làm việc phải bỏ ra sau thuế.",
        en: "The 'work-hour rule': convert every purchase into after-tax hours of work required." },
      { vi: "Chi mạnh vào 2-3 lĩnh vực mang lại niềm vui thực sự, cắt tàn bạo mọi thứ khác (Ramit Sethi).",
        en: "Spend lavishly on 2-3 areas of real joy, ruthlessly cut everything else (Ramit Sethi)." },
    ],
    frameworkVi:
      "Ma trận 'Giá cả × Giá trị' - loại bỏ ô 'giá cao × giá trị thấp' trước tiên.",
    frameworkEn:
      "The 'Price × Value' Matrix - eliminate the 'high price × low value' quadrant first.",
    reflectionVi:
      "Ba khoản chi lớn nhất tháng qua - món nào bạn vẫn nhớ vui, món nào bạn đã quên?",
    reflectionEn:
      "Your three biggest expenses last month - which one still brings joy, which one have you already forgotten?",
    drillVi:
      "7 ngày: mỗi khoản chi >200k, viết 1 dòng: 'Món này đổi lấy X giờ làm việc của mình'. Cuối tuần đánh giá.",
    drillEn:
      "7 days: for every purchase over $10, write one line: 'This trades X work-hours of my life'. Review at week's end.",
    whyItMattersVi:
      "Kỷ luật chi tiêu không phải là tự chối - mà là chọn có ý thức. Khi bạn thấy rõ 'đổi cái gì lấy cái gì', quyết định trở nên dễ dàng.",
    whyItMattersEn:
      "Spending discipline is not self-denial - it is conscious choice. When you see the trade clearly, the decision gets easy.",
    deepDiveEn: [
      "Ramit Sethi built his career on a single insight: telling everyone the same thing ('cut lattes') is bad advice. Some people genuinely love café mornings and spend their money there wisely; forcing them to quit only creates rebound spending.",
      "The real move is to identify your two or three 'money dials' - books, travel, food, fitness, gifts - and pour money in without guilt. Everything outside those dials gets cut ruthlessly.",
      "The work-hour rule reframes purchases from an abstract number into a felt cost. A $60 shirt no longer costs '$60' - it costs '2 hours of your Tuesday afternoon, after tax'. Suddenly the shirt earns or loses its place.",
    ],
    deepDiveVi: [
      "Ramit Sethi xây sự nghiệp trên một quan sát duy nhất: khuyên tất cả mọi người 'ngưng uống cà phê' là lời khuyên tệ. Một số người thực sự yêu buổi sáng ở quán, họ chi tiêu ở đó rất hợp lý; ép họ bỏ chỉ tạo ra chi tiêu bù trong lĩnh vực khác.",
      "Chiến lược đúng là xác định 2-3 'money dials' - sách, du lịch, ẩm thực, thể thao, quà tặng - và chi mạnh không hối tiếc. Mọi thứ ngoài dials đó bị cắt không thương tiếc.",
      "Quy tắc 'giờ làm việc' biến khoản chi từ con số trừu tượng thành cảm giác thật. Một chiếc áo 1,5 triệu không còn là '1,5 triệu' - mà là '5 giờ chiều thứ Ba của bạn, sau thuế'. Đột nhiên chiếc áo phải chứng minh nó xứng đáng.",
    ],
  },

  // ── ETIQUETTE ────────────────────────────────────────────
  {
    id: "eti-14",
    pillar: "etiquette",
    level: "mastery",
    minutes: 12,
    medium: "read",
    titleVi: "Nghệ thuật hiện diện trong cuộc trò chuyện - 4 tầng lắng nghe",
    titleEn: "The Art of Presence in Conversation - The 4 Levels of Listening",
    subtitleVi:
      "Không có ai muốn nói chuyện với một tấm gương phản chiếu chính họ, và cũng không ai muốn nói chuyện với một chiếc tường. Lắng nghe sâu là kỹ năng hiếm nhất ở người trẻ hôm nay.",
    subtitleEn:
      "Nobody wants to talk to a mirror of themselves, and nobody wants to talk to a wall. Deep listening is the rarest skill of the modern young professional.",
    takeaways: [
      { vi: "Tầng 1 - Lắng nghe để trả lời: bạn đang chuẩn bị câu tiếp theo trong đầu (đa số cuộc hội thoại).",
        en: "Level 1 - Listening to reply: already crafting your next line (most conversations)." },
      { vi: "Tầng 2 - Lắng nghe để hiểu nội dung: nắm được sự kiện nhưng bỏ qua cảm xúc và ý định.",
        en: "Level 2 - Listening for content: you get facts but miss emotion and intention." },
      { vi: "Tầng 3 - Lắng nghe để hiểu cảm xúc: bạn phản chiếu và gọi tên cảm xúc chính xác (Nonviolent Communication).",
        en: "Level 3 - Listening for feelings: you mirror and name the emotion precisely (NVC)." },
      { vi: "Tầng 4 - Lắng nghe để hiểu nhu cầu chưa nói: bạn nghe được câu người ta chưa dám nói ra.",
        en: "Level 4 - Listening for unspoken needs: you hear what they have not dared to say yet." },
      { vi: "Kỹ thuật 'im lặng ba nhịp': đếm 1-2-3 trước khi trả lời - hầu hết mọi người tự lấp đầy khoảng trống bằng thông tin sâu hơn.",
        en: "The 'three-beat silence': count 1-2-3 before answering - most people fill the gap with deeper information." },
      { vi: "Ghi lại 1 chi tiết cá nhân từ mỗi cuộc gặp và nhắc lại lần sau - đây là ma thuật xây dựng lòng tin.",
        en: "Log one personal detail from every meeting and reference it next time - this is trust-building magic." },
    ],
    frameworkVi:
      "'Otto Scharmer 4 Levels of Listening' (MIT) + kỹ thuật 'phản chiếu chính xác' của Chris Voss.",
    frameworkEn:
      "Otto Scharmer's 4 Levels of Listening (MIT) + Chris Voss's mirroring technique.",
    reflectionVi:
      "Trong cuộc trò chuyện gần nhất, bạn ở tầng mấy? Người kia có cảm thấy được HIỂU hay chỉ được NGHE?",
    reflectionEn:
      "In your most recent conversation, which level were you at? Did the other person feel HEARD or merely HEARD-of?",
    drillVi:
      "7 ngày: sau mỗi cuộc trò chuyện quan trọng, viết 3 dòng - sự kiện họ chia sẻ, cảm xúc bạn nhận ra, nhu cầu ẩn bạn đoán ra. Kiểm chứng ở lần gặp sau.",
    drillEn:
      "7 days: after every important conversation, write 3 lines - the facts they shared, the emotion you detected, the unspoken need you sensed. Verify next meeting.",
    whyItMattersVi:
      "Trong thời đại ai cũng phát biểu, người biết lắng nghe sâu trở thành 'thỏi nam châm' cho cơ hội, tình bạn và sự tin tưởng. Đây là siêu năng lực bị đánh giá thấp nhất trong sự nghiệp.",
    whyItMattersEn:
      "In an age when everyone broadcasts, the deep listener becomes a magnet for opportunities, friendship, and trust. It is the most underrated career superpower.",
    deepDiveEn: [
      "Otto Scharmer at MIT taught executives to notice which 'level' they were on within seconds. His finding: 90% of adult conversation lives in Level 1 - reactive, self-focused, mentally rehearsing. That is why most meetings end with everyone feeling drained and unheard.",
      "Chris Voss, former FBI hostage negotiator, discovered that a simple technique - repeating the last 1-3 words of what someone said, with a curious upward tone - almost always triggers them to keep talking and reveal more. This is 'mirroring', and it lets you reach Level 3 without asking probing questions.",
      "The deepest form (Level 4) requires you to notice what is NOT said. A colleague says, 'I guess the project is going okay.' At Level 2 you say, 'Good.' At Level 4 you say, 'It sounds like there is a piece of it that is NOT okay - want to walk me through it?' The information you unlock at Level 4 is the information that changes careers, relationships, and negotiations.",
    ],
    deepDiveVi: [
      "Otto Scharmer tại MIT huấn luyện các lãnh đạo nhận biết mình đang ở 'tầng' nào chỉ trong vài giây. Phát hiện của ông: 90% giao tiếp của người lớn nằm ở Tầng 1 - phản ứng, tự tập trung, đang diễn tập trong đầu. Đó là lý do phần lớn cuộc họp kết thúc với mọi người mệt và cảm thấy không được lắng nghe.",
      "Chris Voss, cựu đàm phán viên con tin FBI, phát hiện một kỹ thuật đơn giản - lặp lại 1-3 từ cuối cùng của người kia với giọng lên cao tò mò - gần như luôn khiến họ nói tiếp và tiết lộ nhiều hơn. Đây là 'mirroring', giúp bạn chạm tới Tầng 3 mà không cần đặt câu hỏi soi mói.",
      "Dạng sâu nhất (Tầng 4) yêu cầu bạn nghe được điều KHÔNG được nói. Một đồng nghiệp bảo: 'Dự án cũng ổn thôi.' Ở Tầng 2 bạn đáp: 'Tốt quá.' Ở Tầng 4 bạn nói: 'Nghe có vẻ có một phần nào đó KHÔNG ổn - bạn kể mình nghe không?' Thông tin bạn mở ra ở Tầng 4 chính là thông tin thay đổi sự nghiệp, các mối quan hệ và các cuộc đàm phán.",
    ],
  },
  {
    id: "eti-15",
    pillar: "etiquette",
    level: "intermediate",
    minutes: 10,
    medium: "read",
    titleVi: "Khen ngợi có cấu trúc - 3 loại khen thay đổi mối quan hệ",
    titleEn: "Structured Praise - 3 Types of Compliments That Change Relationships",
    subtitleVi:
      "Khen sai làm người khác thấy giả tạo. Khen đúng khiến họ nhớ bạn cả đời. Sự khác biệt nằm ở CÔNG THỨC, không phải sự chân thành.",
    subtitleEn:
      "Bad compliments feel fake. Good ones are remembered for life. The difference is FORMULA, not sincerity.",
    takeaways: [
      { vi: "Khen ngoại hình = ngắn hạn. Khen thành quả = trung hạn. Khen phẩm chất = dài hạn.",
        en: "Praise looks = short-lived. Praise achievement = medium-lived. Praise character = lifelong." },
      { vi: "Công thức S-B-I: Tình huống (Situation) - Hành vi (Behavior) - Tác động (Impact). Ví dụ: 'Trong buổi họp sáng nay (S), khi bạn dừng lại và hỏi ý kiến An (B), cả team đã cởi mở hơn hẳn (I).'",
        en: "The S-B-I formula: Situation - Behavior - Impact. Example: 'In this morning's meeting (S), when you paused and asked for An's view (B), the whole team opened up (I).'" },
      { vi: "Khen sau lưng > khen trước mặt: khi lời khen đến tai họ qua người thứ ba, độ tin cậy tăng gấp 5.",
        en: "Praise behind their back > praise in person: when it reaches them via a third party, credibility multiplies 5×." },
      { vi: "Không bao giờ khen kèm 'nhưng' - câu sau sẽ xoá toàn bộ câu trước.",
        en: "Never follow praise with 'but' - the second clause erases the first entirely." },
    ],
    frameworkVi:
      "Mô hình S-B-I (Center for Creative Leadership) + phân tầng khen của Adam Grant.",
    frameworkEn:
      "The S-B-I model (Center for Creative Leadership) + Adam Grant's praise hierarchy.",
    reflectionVi:
      "Lần cuối bạn khen ai đó về PHẨM CHẤT (không phải ngoại hình hay kết quả) là khi nào?",
    reflectionEn:
      "When was the last time you praised someone for their CHARACTER (not looks, not results)?",
    drillVi:
      "7 ngày: mỗi ngày gửi một tin nhắn S-B-I cho một người khác (bạn bè, đồng nghiệp, gia đình). Ghi lại phản hồi.",
    drillEn:
      "7 days: send one S-B-I message per day to a different person (friend, colleague, family). Log their responses.",
    whyItMattersEn:
      "Structured praise is the cheapest, highest-ROI social currency in existence. Ten minutes of practice makes you unforgettable.",
    whyItMattersVi:
      "Khen có cấu trúc là loại tiền tệ xã hội rẻ nhất, lợi tức cao nhất tồn tại. Mười phút luyện tập biến bạn thành người khó quên.",
    deepDiveEn: [
      "Adam Grant's research shows a hierarchy: complimenting appearance produces a quick smile and is forgotten within an hour. Complimenting achievement produces gratitude for a week. Complimenting character - naming a virtue someone lives out - is often remembered for a lifetime.",
      "The reason S-B-I works is that it is specific and unrewritable. 'Great job' can be given to anyone. 'When you paused and asked for An's view, the whole team opened up' can only apply to that exact moment - it proves you were actually watching.",
      "Third-party praise is a hidden multiplier: when someone tells them 'X was talking about how thoughtful you were with the intern', it lands harder than any direct compliment - because there is no possibility of you 'just being polite'.",
    ],
    deepDiveVi: [
      "Nghiên cứu của Adam Grant cho thấy một hệ tầng rõ ràng: khen ngoại hình tạo nụ cười ngắn và quên trong một giờ. Khen thành quả tạo lòng biết ơn kéo dài một tuần. Khen phẩm chất - gọi tên một đức tính người kia đang sống - thường được nhớ cả đời.",
      "S-B-I hoạt động vì nó cụ thể và không thể sao chép. 'Làm tốt lắm' có thể tặng cho bất kỳ ai. 'Khi bạn dừng lại và hỏi ý kiến An, cả team đã cởi mở hơn' chỉ có thể áp dụng cho đúng khoảnh khắc đó - chứng minh bạn thực sự đang quan sát.",
      "Khen gián tiếp là bội số ẩn: khi có người nói 'X vừa kể tôi nghe bạn tinh tế thế nào với thực tập sinh', câu đó chạm sâu hơn bất kỳ lời khen trực tiếp nào - vì không còn khả năng bạn 'chỉ đang lịch sự'.",
    ],
  },

  // ── PRESENCE ─────────────────────────────────────────────
  {
    id: "pre-14",
    pillar: "presence",
    level: "mastery",
    minutes: 13,
    medium: "read",
    titleVi: "Nội lực Antifragile - Vì sao có người mạnh lên sau nghịch cảnh, người khác gục hẳn",
    titleEn: "Antifragile Inner Strength - Why Some Grow From Adversity While Others Collapse",
    subtitleVi:
      "Nassim Taleb chỉ ra: trái ngược với 'mong manh' không phải 'chịu đựng' mà là 'antifragile' - mạnh lên nhờ chấn động. Đây là chìa khoá của bản lĩnh trọn đời.",
    subtitleEn:
      "Nassim Taleb showed: the opposite of 'fragile' is not 'resilient' - it is 'antifragile': stronger BECAUSE of shocks. This is the master key of lifelong grit.",
    takeaways: [
      { vi: "Mong manh: gãy khi bị đánh. Chịu đựng: không đổi khi bị đánh. Antifragile: mạnh hơn sau khi bị đánh.",
        en: "Fragile: breaks under stress. Resilient: unchanged. Antifragile: STRONGER after stress." },
      { vi: "Cơ thể là antifragile: cơ bắp mạnh lên khi bị rách nhẹ; hệ miễn dịch mạnh lên khi tiếp xúc kháng nguyên.",
        en: "The body is antifragile: muscles grow from micro-tears; immunity grows from antigen exposure." },
      { vi: "Tâm lý antifragile cần 3 điều: tiếp xúc stress nhỏ đều đặn, thời gian phục hồi đủ, ý nghĩa rút ra được.",
        en: "Psychological antifragility needs three things: small regular stress, adequate recovery, meaning extracted." },
      { vi: "Sai lầm bảo vệ quá mức: cha mẹ tránh mọi thất bại cho con → tạo ra người lớn mong manh cực độ.",
        en: "The over-protection trap: parents shielding children from every failure → produces extremely fragile adults." },
      { vi: "Nguyên tắc 'via negativa': loại bỏ cái làm bạn yếu quan trọng hơn thêm cái làm bạn mạnh.",
        en: "The 'via negativa' principle: removing what weakens you matters more than adding what strengthens you." },
      { vi: "Người antifragile có tiểu sử 'thất bại có kiểm soát' - họ đã va vấp đủ nhỏ để không sợ va vấp lớn.",
        en: "Antifragile people have a history of 'controlled failure' - they have stumbled enough small times to not fear a big one." },
    ],
    frameworkVi:
      "Mô hình 'Antifragile' của Nassim Taleb + nghiên cứu Post-Traumatic Growth (Tedeschi & Calhoun).",
    frameworkEn:
      "Nassim Taleb's Antifragile model + Post-Traumatic Growth research (Tedeschi & Calhoun).",
    reflectionVi:
      "Nhìn lại 3 khủng hoảng lớn nhất đời bạn: sau mỗi lần, bạn đã trở nên mong manh hơn, giữ nguyên, hay mạnh hơn? Yếu tố nào tạo ra khác biệt?",
    reflectionEn:
      "Look back at the 3 biggest crises of your life: after each, did you become more fragile, unchanged, or stronger? What factor made the difference?",
    drillVi:
      "30 ngày: mỗi tuần chọn một 'stress nhỏ có kiểm soát' - nói chuyện với người lạ, tắm lạnh 2 phút, thuyết trình 5 phút, gọi lại khách hàng khó. Ghi nhật ký cảm giác trước-sau.",
    drillEn:
      "30 days: each week pick one 'controlled small stress' - speak to a stranger, 2-min cold shower, 5-min public talk, call a difficult client. Journal feelings before-after.",
    whyItMattersVi:
      "Cuộc đời sẽ ném cho bạn những chấn động lớn dù bạn có sẵn sàng hay không. Câu hỏi duy nhất là: bạn đã tự luyện tập với chấn động nhỏ chưa?",
    whyItMattersEn:
      "Life will hurl big shocks at you whether you are ready or not. The only question is: have you rehearsed with the small ones?",
    deepDiveEn: [
      "Nassim Taleb's insight, born from watching financial markets, was that most of Western thinking accidentally optimises for 'resilience' - the ability to survive shocks unchanged. But nature never does this. A muscle that survives a workout unchanged is a muscle that stays weak. A bone protected from all load becomes osteoporotic.",
      "The psychological version is identical. Tedeschi and Calhoun's Post-Traumatic Growth research found that among survivors of major trauma, roughly one third emerge stronger than before - with more meaning, deeper relationships, and clearer priorities. The predictor is not the trauma itself but the presence of two things: enough recovery time, and someone with whom the survivor can extract meaning from what happened.",
      "The practical rule is counter-intuitive: to become antifragile, you must SEEK small stressors deliberately. Cold showers, hard conversations, public speaking, saying no to a friend, asking for a raise. Each one is a 'vaccine' against a bigger version of the same fear later.",
      "The via negativa principle - removing what weakens - is often more powerful than adding what strengthens. Cutting one toxic relationship, one sugar habit, or one news source often produces more strength in a month than a new gym membership does in a year.",
    ],
    deepDiveVi: [
      "Insight của Nassim Taleb, sinh ra từ quan sát thị trường tài chính, là: hầu hết tư duy phương Tây vô tình tối ưu cho 'resilience' - khả năng sống sót qua chấn động mà không đổi. Nhưng tự nhiên không bao giờ làm vậy. Một cơ bắp sống sót qua buổi tập mà không đổi là một cơ bắp vẫn yếu. Một xương được bảo vệ khỏi mọi tải trọng sẽ loãng.",
      "Phiên bản tâm lý giống hệt. Nghiên cứu Post-Traumatic Growth của Tedeschi và Calhoun phát hiện: trong những người sống sót qua chấn thương lớn, khoảng một phần ba trở nên MẠNH HƠN trước - có nhiều ý nghĩa hơn, mối quan hệ sâu hơn, ưu tiên rõ hơn. Yếu tố quyết định không phải chấn thương mà là hai điều: thời gian phục hồi đủ, và một người để cùng rút ra ý nghĩa.",
      "Quy tắc thực hành phản trực giác: để trở thành antifragile, bạn phải CHỦ ĐỘNG tìm những stress nhỏ. Tắm lạnh, cuộc trò chuyện khó, thuyết trình, nói 'không' với bạn thân, đòi tăng lương. Mỗi cái là một 'vắc-xin' cho phiên bản lớn hơn của cùng nỗi sợ sau này.",
      "Nguyên tắc via negativa - loại bỏ cái làm yếu - thường mạnh hơn thêm cái làm mạnh. Cắt một mối quan hệ độc, một thói quen đường, một nguồn tin tức tiêu cực thường tạo ra nhiều sức mạnh trong một tháng hơn cả một thẻ gym trong một năm.",
    ],
  },
  {
    id: "pre-15",
    pillar: "presence",
    level: "intermediate",
    minutes: 10,
    medium: "read",
    titleVi: "Giọng nói của người có nội lực - Tần số, tốc độ và khoảng lặng",
    titleEn: "The Voice of Inner Presence - Pitch, Pace, and Pause",
    subtitleVi:
      "Người có bản lĩnh không nói to hơn - họ nói CHẬM hơn, THẤP hơn, và biết dùng khoảng LẶNG. Điều này có thể học chỉ trong 4 tuần.",
    subtitleEn:
      "Composed people do not speak louder - they speak SLOWER, LOWER, and use SILENCE. All three are learnable in 4 weeks.",
    takeaways: [
      { vi: "Tần số: hạ giọng xuống 20-30Hz so với thường ngày - báo hiệu bình tĩnh, không phải hung hăng.",
        en: "Pitch: drop 20-30Hz below your everyday register - signals calm, not aggression." },
      { vi: "Tốc độ: 140-160 từ/phút cho nội dung quan trọng (thay vì 180+ khi hồi hộp).",
        en: "Pace: 140-160 words/min for important content (vs 180+ when anxious)." },
      { vi: "Khoảng lặng 2-3 giây trước câu quan trọng buộc não người nghe tập trung 100%.",
        en: "A 2-3 second pause before an important sentence forces the listener's brain into 100% focus." },
      { vi: "Kết thúc câu bằng giọng ĐI XUỐNG (declarative) thay vì đi lên (uptalk) - báo hiệu quyết đoán.",
        en: "End sentences with a DOWNWARD tone (declarative) instead of upward (uptalk) - signals conviction." },
    ],
    frameworkVi:
      "Bộ 3P - Pitch, Pace, Pause - do Susan Miller (voice coach cho CEO Fortune 500) hệ thống hoá.",
    frameworkEn:
      "The 3P set - Pitch, Pace, Pause - systematised by Susan Miller (voice coach for Fortune 500 CEOs).",
    reflectionVi:
      "Ghi âm 2 phút bạn nói về một chủ đề quan trọng. Nghe lại - bạn nói nhanh hay chậm hơn bạn nghĩ?",
    reflectionEn:
      "Record 2 minutes of yourself speaking on an important topic. Listen back - are you faster or slower than you thought?",
    drillVi:
      "14 ngày: mỗi sáng đọc to 3 phút văn bản với tốc độ 140 từ/phút (dùng metronome ứng dụng). Thêm 2 khoảng lặng có chủ ý mỗi phút.",
    drillEn:
      "14 days: each morning read aloud 3 minutes of text at 140 wpm (use a metronome app). Insert 2 deliberate pauses per minute.",
    whyItMattersEn:
      "Voice is the most direct signal of nervous-system state. When you master its 3P, you communicate composure BEFORE your words are even understood.",
    whyItMattersVi:
      "Giọng nói là tín hiệu trực tiếp nhất về trạng thái hệ thần kinh. Khi bạn làm chủ 3P, bạn truyền đi sự điềm tĩnh TRƯỚC KHI người khác hiểu lời bạn nói.",
    deepDiveEn: [
      "Susan Miller has coached Fortune 500 CEOs for two decades. Her most repeated observation: senior leaders do not have 'naturally powerful voices' - they have TRAINED voices. The single most common change during coaching is not volume but PACE reduction.",
      "The reason is neurological: when the listener hears rapid speech, their sympathetic nervous system fires ('speaker is stressed, I should be alert'). Slow speech with clear pauses activates the parasympathetic ('speaker is safe, I can settle in and think').",
      "Ending with uptalk - the rising tone that turns statements into questions - is one of the fastest ways to erase credibility. Practising downward declarative endings for two weeks reliably shifts how audiences perceive authority, even when the words themselves stay identical.",
    ],
    deepDiveVi: [
      "Susan Miller huấn luyện các CEO Fortune 500 suốt hai thập kỷ. Quan sát cô lặp lại nhiều nhất: các lãnh đạo cấp cao không có 'giọng nói mạnh tự nhiên' - họ có giọng được LUYỆN. Thay đổi phổ biến nhất trong quá trình huấn luyện không phải âm lượng mà là GIẢM TỐC ĐỘ.",
      "Lý do thuộc về thần kinh: khi người nghe nhận giọng nói nhanh, hệ giao cảm kích hoạt ('người nói đang stress, mình phải cảnh giác'). Giọng nói chậm với khoảng lặng rõ kích hoạt hệ đối giao cảm ('người nói đang an toàn, mình có thể lắng lại và suy nghĩ').",
      "Kết thúc bằng uptalk - giọng lên biến câu khẳng định thành câu hỏi - là một trong những cách nhanh nhất xoá bỏ độ tin cậy. Luyện đóng câu đi xuống (declarative) trong hai tuần đủ để thay đổi cách khán giả cảm nhận uy quyền của bạn, ngay cả khi lời nói giống hệt.",
    ],
  },

  // ── WELLNESS ─────────────────────────────────────────────
  {
    id: "wel-14",
    pillar: "wellness",
    level: "mastery",
    minutes: 13,
    medium: "read",
    titleVi: "Nhịp sinh học 24 giờ - Kiến trúc một ngày theo cơ thể, không theo lịch",
    titleEn: "The Circadian Blueprint - Architect Your Day By Biology, Not Calendar",
    subtitleVi:
      "Cùng một hành động ở thời điểm khác nhau tạo hiệu quả chênh lệch 4-5 lần. Đây là 'gian lận hợp pháp' của khoa học giấc ngủ.",
    subtitleEn:
      "The same action at different times produces 4-5× different results. This is the 'legal cheat code' of sleep science.",
    takeaways: [
      { vi: "0-60 phút sau khi thức: 10 phút nắng trực tiếp (không qua cửa sổ) đặt lại đồng hồ sinh học 24h.",
        en: "0-60 min after waking: 10 min of direct sunlight (not through glass) resets your 24h clock." },
      { vi: "Cà phê: uống 90-120 phút sau khi thức, không sớm hơn - tránh 'adenosine rebound' buổi chiều.",
        en: "Coffee: drink 90-120 min after waking, not earlier - prevents afternoon adenosine rebound." },
      { vi: "Tập nặng: 6-8 tiếng sau khi thức (đỉnh nhiệt độ cơ thể) - lực đỉnh cao hơn 5-15%.",
        en: "Heavy training: 6-8h after waking (body-temp peak) - 5-15% higher peak force output." },
      { vi: "Bữa ăn cuối: kết thúc ≥3 tiếng trước khi ngủ - giúp gan gỉái độc và cải thiện giấc ngủ sâu.",
        en: "Last meal: end ≥3h before sleep - allows liver detox and deepens slow-wave sleep." },
      { vi: "Ánh sáng đỏ/vàng ấm 1-2 tiếng trước ngủ; loại bỏ 100% ánh xanh - melatonin lên tự nhiên.",
        en: "Warm red/amber light 1-2h before bed; eliminate all blue light - melatonin rises naturally." },
      { vi: "Nhiệt độ phòng ngủ 18-19°C - lạnh vừa đủ để cơ thể vào giấc sâu; ấm quá phá giấc REM.",
        en: "Bedroom at 18-19°C - cool enough to trigger deep sleep; too warm destroys REM." },
    ],
    frameworkVi:
      "Bộ 'Circadian Stack' - Andrew Huberman (Stanford) + Satchin Panda (Salk Institute).",
    frameworkEn:
      "The Circadian Stack - Andrew Huberman (Stanford) + Satchin Panda (Salk Institute).",
    reflectionVi:
      "Ngày hôm qua: bạn ra nắng buổi sáng bao lâu? Uống cà phê phút thứ mấy sau khi thức? Ăn tối mấy giờ so với giờ ngủ?",
    reflectionEn:
      "Yesterday: how much morning sun did you get? What minute did you drink coffee after waking? How many hours between dinner and sleep?",
    drillVi:
      "14 ngày: 3 quy tắc - nắng 10 phút trước 9h sáng, cà phê sau 90 phút thức, ăn tối trước 19h. Chấm điểm giấc ngủ 1-10 mỗi sáng.",
    drillEn:
      "14 days: three rules - 10 min sun before 9am, coffee after 90 min awake, dinner before 7pm. Rate sleep 1-10 each morning.",
    whyItMattersEn:
      "Every cell of your body runs a 24-hour clock. When your behaviour syncs with it, everything improves at once: mood, focus, strength, immunity, longevity. When it fights it, nothing works well - no matter how many supplements you take.",
    whyItMattersVi:
      "Mỗi tế bào trong cơ thể chạy đồng hồ 24 giờ. Khi hành vi khớp với nó, mọi thứ tốt lên cùng lúc: tâm trạng, tập trung, sức mạnh, miễn dịch, tuổi thọ. Khi chống lại, không gì hoạt động tốt - dù bạn uống bao nhiêu thực phẩm chức năng.",
    deepDiveEn: [
      "Satchin Panda at the Salk Institute made a discovery that changed nutrition science: WHEN you eat matters as much as WHAT you eat. Mice given identical calories but restricted to an 8-10 hour window stayed lean and metabolically healthy; the same calories spread across 15 hours produced obesity and pre-diabetes.",
      "Andrew Huberman's morning-sun protocol works because your suprachiasmatic nucleus - the brain's master clock - reads sunlight through the eye's melanopsin receptors and sets a 16-hour countdown to melatonin release. Miss the morning signal, and your melatonin rises 2-3 hours later, wrecking sleep the same night.",
      "The 90-minute coffee delay comes from cortisol biology: your natural morning cortisol peaks in the first hour after waking. Adding caffeine on top blunts your own cortisol production, then leaves you with the classic afternoon crash. Delaying coffee by 90 minutes lets natural cortisol do its job first.",
      "Room temperature is the most underrated sleep lever. Core body temperature must drop 1-1.5°C to enter deep sleep. A room at 22°C makes this nearly impossible; 18-19°C makes it automatic. One thermostat adjustment can outperform any sleep supplement on the market.",
    ],
    deepDiveVi: [
      "Satchin Panda tại Salk Institute có phát hiện thay đổi khoa học dinh dưỡng: KHI ăn quan trọng ngang với ĂN GÌ. Chuột được cho cùng lượng calo nhưng giới hạn trong khung 8-10 giờ vẫn gầy và khoẻ mạnh chuyển hoá; cùng lượng calo trải trên 15 giờ tạo ra béo phì và tiền tiểu đường.",
      "Giao thức nắng sáng của Andrew Huberman hoạt động vì nhân trên chéo (SCN) - đồng hồ chủ của não - đọc ánh sáng qua thụ thể melanopsin ở mắt và đặt đếm ngược 16 giờ đến khi tiết melatonin. Bỏ tín hiệu buổi sáng, melatonin sẽ dâng muộn 2-3 giờ, phá giấc ngủ ngay đêm đó.",
      "Việc trì hoãn cà phê 90 phút xuất phát từ sinh học cortisol: cortisol buổi sáng tự nhiên đạt đỉnh trong giờ đầu sau khi thức. Thêm caffeine lên đó làm mất khả năng tự sản xuất cortisol, rồi để bạn với cú tuột buổi chiều kinh điển. Trì hoãn cà phê 90 phút để cortisol tự nhiên làm việc trước.",
      "Nhiệt độ phòng là đòn bẩy giấc ngủ bị đánh giá thấp nhất. Nhiệt độ lõi cơ thể phải giảm 1-1,5°C để vào ngủ sâu. Phòng 22°C khiến điều này gần như bất khả thi; 18-19°C khiến nó tự động. Một chỉnh điều hoà có thể vượt trội mọi thực phẩm bổ sung giấc ngủ trên thị trường.",
    ],
  },
  {
    id: "wel-15",
    pillar: "wellness",
    level: "intermediate",
    minutes: 10,
    medium: "read",
    titleVi: "Hydration thông minh - Nước, chất điện giải và thời điểm",
    titleEn: "Smart Hydration - Water, Electrolytes, and Timing",
    subtitleVi:
      "Uống '8 ly nước một ngày' là lời khuyên lỗi thời. Cơ thể cần đúng loại chất lỏng, đúng thời điểm - không phải đúng số lượng.",
    subtitleEn:
      "'Drink 8 glasses a day' is outdated advice. Your body needs the right fluid at the right time - not just the right quantity.",
    takeaways: [
      { vi: "500ml nước + chút muối biển ngay khi thức - bù nước sau 6-8 giờ ngủ và kích hoạt hệ tiêu hoá.",
        en: "500ml water + a pinch of sea salt on waking - replaces 6-8h of sleep dehydration and wakes the gut." },
      { vi: "Chất điện giải (natri, kali, magiê) quan trọng hơn lượng nước - thiếu chúng gây mệt hơn thiếu nước.",
        en: "Electrolytes (sodium, potassium, magnesium) matter more than water volume - deficits cause more fatigue than dehydration itself." },
      { vi: "Nước tiểu vàng nhạt = đủ nước; trong suốt = uống quá nhiều (loãng điện giải); vàng đậm = thiếu.",
        en: "Pale yellow urine = well-hydrated; clear = over-drinking (diluted electrolytes); dark yellow = deficit." },
      { vi: "Ngưng uống nước ≥90 phút trước khi ngủ - tránh phải dậy đi vệ sinh phá giấc.",
        en: "Stop drinking ≥90 min before sleep - prevents wake-ups that shatter sleep architecture." },
    ],
    frameworkVi:
      "Nguyên tắc '3-2-1 hydration' - 3 chất điện giải chính, 2 khung giờ đỉnh (sáng + trưa), 1 giờ ngưng trước ngủ.",
    frameworkEn:
      "The '3-2-1 Hydration' rule - 3 key electrolytes, 2 peak windows (morning + midday), 1 cut-off hour before sleep.",
    reflectionVi:
      "Bạn có bao giờ cảm thấy mệt mỏi buổi chiều mà đã uống đủ nước? Có thể bạn thiếu điện giải, không phải nước.",
    reflectionEn:
      "Ever feel afternoon fatigue despite drinking enough water? You may be low on electrolytes, not fluid.",
    drillVi:
      "7 ngày: sáng uống 500ml + chút muối; thay 1 ly nước lọc/ngày bằng nước có điện giải; ngưng uống sau 20h. Chấm mức năng lượng chiều 1-10.",
    drillEn:
      "7 days: 500ml + salt on waking; swap 1 plain water/day for an electrolyte drink; cut-off at 8pm. Rate afternoon energy 1-10.",
    whyItMattersEn:
      "Mild dehydration cuts cognitive performance by 10-12% and mood by even more - equivalent to a small hangover, every day, quietly.",
    whyItMattersVi:
      "Mất nước nhẹ cắt 10-12% hiệu suất nhận thức và tâm trạng còn nhiều hơn - tương đương một cơn nôn nao nhỏ, mỗi ngày, âm thầm.",
    deepDiveEn: [
      "The '8 glasses' rule has no scientific origin - it was extrapolated from a 1945 US recommendation that also noted 'much of this is contained in prepared foods'. Modern hydration science focuses on electrolyte balance, not raw volume.",
      "Athletes have known for decades: pure water without sodium and potassium can cause hyponatremia - low blood sodium - which produces the exact symptoms people assume come from dehydration (headache, fatigue, muscle cramps). Adding a pinch of salt often fixes the 'need more water' feeling instantly.",
      "The overlooked timing rule: hydrating heavily after 7pm forces 1-2 bathroom trips that fragment sleep architecture. You wake up 'hydrated but exhausted'. Front-loading fluid into morning and midday windows gives you the same daily volume without the sleep tax.",
    ],
    deepDiveVi: [
      "Quy tắc '8 ly nước' không có nguồn khoa học - nó được ngoại suy từ một khuyến nghị Mỹ năm 1945 mà chính khuyến nghị đó cũng ghi 'phần lớn lượng này đã có trong thức ăn'. Khoa học hydration hiện đại tập trung vào cân bằng điện giải, không phải khối lượng thô.",
      "Vận động viên đã biết từ lâu: nước tinh khiết không có natri và kali có thể gây hạ natri máu - tạo đúng các triệu chứng người ta nghĩ là do thiếu nước (đau đầu, mệt mỏi, chuột rút). Thêm một chút muối thường xoá tan cảm giác 'cần thêm nước' ngay lập tức.",
      "Quy tắc thời điểm bị bỏ qua: uống nhiều nước sau 19h buộc bạn dậy 1-2 lần đi vệ sinh làm vỡ kiến trúc giấc ngủ. Bạn tỉnh dậy 'đủ nước nhưng kiệt sức'. Dồn lượng nước vào khung sáng và trưa cho cùng tổng lượng ngày mà không mất giấc ngủ.",
    ],
  },
];
