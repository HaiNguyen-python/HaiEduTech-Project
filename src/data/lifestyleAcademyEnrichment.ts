/**
 * @file lifestyleAcademyEnrichment.ts
 * @description Depth layer for the Lifestyle Academy. The first four pillars of
 *              lessons were written before the lesson type gained "why it
 *              matters", "deep dive" and illustration fields, so this file adds
 *              that missing depth per lesson id. The aggregator merges these in
 *              without overwriting anything a lesson already defines.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

export interface LifestyleEnrichment {
  whyItMattersVi: string;
  whyItMattersEn: string;
  deepDiveVi: string[];
  deepDiveEn: string[];
  illustrationEmojis: string[];
}

/** Keyed by lesson id. Only ids listed here are enriched. */
export const LIFESTYLE_ENRICHMENT: Record<string, LifestyleEnrichment> = {
  /* ─────────────── FINANCE ─────────────── */
  "fin-01": {
    whyItMattersVi:
      "Phần lớn người trẻ không thiếu thu nhập, họ thiếu một cấu trúc để tiền đi đúng chỗ. Có hệ thống hũ, bạn ra quyết định một lần rồi tự động hoá mãi mãi.",
    whyItMattersEn:
      "Most young earners do not lack income, they lack a structure that sends money to the right place. With jars you decide once, then automate forever.",
    deepDiveVi: [
      "Ý tưởng cốt lõi của hệ thống hũ là chuyển gánh nặng từ ý chí sang thiết kế. Mỗi lần bạn phải tự hỏi 'tháng này tiêu bao nhiêu là hợp lý', bạn đang tiêu tốn năng lượng ra quyết định. Khi tỉ lệ đã cố định và lệnh chuyển khoản đã hẹn giờ, kỷ luật trở thành mặc định.",
      "Điều quan trọng không phải là 6 con số tuyệt đối, mà là mỗi đồng đều có tên. Sinh viên có thể chạy phiên bản 70/10/10/10 với bốn hũ. Người có gia đình có thể tách hũ 'Thiết yếu' thành 'Nhà' và 'Chăm sóc'. Cấu trúc quan trọng hơn tỉ lệ.",
      "Hãy đánh giá hệ thống theo quý, không theo tuần. Một tháng lệch không nói lên gì, nhưng ba tháng liền hũ Thiết yếu vượt 60% là dấu hiệu bạn cần đàm phán lại chi phí cố định: tiền thuê, phương tiện đi lại, các gói thuê bao.",
    ],
    deepDiveEn: [
      "The core idea is to move the burden from willpower to design. Every time you ask yourself 'how much can I spend this month?' you are burning decision energy. Once the percentages are fixed and the transfers are scheduled, discipline becomes the default state.",
      "What matters is not the six exact numbers, it is that every dollar has a name. A student can run a four-jar 70/10/10/10 version. A parent can split Necessities into Home and Care. Structure beats ratios.",
      "Review the system quarterly, not weekly. One noisy month means nothing, but three months of Necessities above 60% is a signal to renegotiate fixed costs: rent, transport, subscriptions.",
    ],
    illustrationEmojis: ["🏺", "💸", "📊"],
  },
  "fin-02": {
    whyItMattersVi:
      "Lãi kép là công cụ duy nhất mà người trẻ có nhiều hơn người giàu: thời gian. Hiểu nó năm 22 tuổi đáng giá hơn bất kỳ mẹo đầu tư nào.",
    whyItMattersEn:
      "Compounding is the one resource young people hold more of than wealthy people: time. Understanding it at 22 is worth more than any investing tip.",
    deepDiveVi: [
      "Với lợi suất thực 8%/năm, mỗi 9 năm số tiền của bạn nhân đôi. Người bắt đầu ở tuổi 22 có thêm một lần nhân đôi so với người bắt đầu ở 31, và lần nhân đôi cuối cùng luôn là lần lớn nhất. Đây là lý do 'bắt đầu sớm với ít tiền' thắng 'bắt đầu muộn với nhiều tiền'.",
      "Lãi kép cũng hoạt động ngược lại với nợ tiêu dùng. Thẻ tín dụng 24%/năm nhân đôi khoản nợ trong khoảng 3 năm. Vì vậy thứ tự đúng luôn là: xoá nợ lãi cao trước, rồi mới tối ưu đầu tư.",
      "Kẻ thù thật sự của lãi kép không phải lợi suất thấp mà là sự ngắt mạch: rút tiền giữa đường, đổi chiến lược mỗi năm, phí quản lý 2%. Duy trì liên tục 20 năm quan trọng hơn chọn đúng thời điểm.",
    ],
    deepDiveEn: [
      "At a real 8% return your money doubles roughly every nine years. Starting at 22 buys you one extra doubling over starting at 31, and the final doubling is always the largest one. That is why starting early with little beats starting late with more.",
      "Compounding also runs in reverse on consumer debt. A card at 24% doubles the balance in about three years, which is why the correct order is always: clear high-interest debt first, then optimise investing.",
      "The real enemy of compounding is not a low return, it is interruption: withdrawing early, switching strategy yearly, paying 2% in fees. Staying invested for twenty years matters more than timing entries.",
    ],
    illustrationEmojis: ["⏳", "📈", "🌱"],
  },
  "fin-03": {
    whyItMattersVi:
      "Bạn không thể tiết kiệm nhiều hơn tốc độ marketing khiến bạn tiêu. Nhận diện được đòn tâm lý là cách rẻ nhất để tăng tỉ lệ tiết kiệm.",
    whyItMattersEn:
      "You cannot save faster than marketing makes you spend. Recognising the psychological levers is the cheapest way to raise your savings rate.",
    deepDiveVi: [
      "Năm đòn phổ biến nhất là khan hiếm giả (chỉ còn 2 suất), mỏ neo giá (gạch giá cũ), chia nhỏ chi phí (chỉ 99k/tháng), bằng chứng xã hội (10.000 người đã mua) và phần thưởng tức thì (giao trong 2 giờ). Cả năm đều nhắm vào hệ thống cảm xúc, không phải lý trí.",
      "Cách phản đòn hiệu quả nhất không phải là 'ý chí mạnh hơn' mà là chèn thời gian vào giữa cảm xúc và thanh toán: quy tắc 48 giờ với mọi món trên một mức tiền bạn tự đặt, xoá thẻ đã lưu trên điện thoại, mua sắm theo danh sách viết trước.",
      "Hãy đổi đơn vị đo. Thay vì hỏi 'món này bao nhiêu tiền', hãy hỏi 'món này bằng bao nhiêu giờ làm việc của tôi'. Cùng một chiếc tai nghe, 3 triệu đồng nghe nhẹ hơn nhiều so với 'hai ngày làm việc'.",
    ],
    deepDiveEn: [
      "The five common levers are false scarcity (only 2 left), price anchoring (a struck-through original), cost fragmentation (just $4 a month), social proof (10,000 sold) and instant reward (2-hour delivery). All five target the emotional system, not reason.",
      "The strongest counter is not more willpower, it is inserting time between feeling and payment: a 48-hour rule above a threshold you set, deleting saved cards from your phone, and shopping only from a list written beforehand.",
      "Change your unit of measurement. Instead of 'how much does this cost', ask 'how many hours of my work is this'. The same headphones sound much lighter at $120 than at 'two working days'.",
    ],
    illustrationEmojis: ["🛒", "🧠", "🚫"],
  },
  "fin-04": {
    whyItMattersVi:
      "Quỹ dự phòng không sinh lời, nó mua cho bạn quyền nói không: không phải vay nóng, không phải nhận việc tệ, không phải bán tài sản đúng lúc thị trường giảm.",
    whyItMattersEn:
      "An emergency fund does not earn much, it buys you the right to say no: no payday loans, no bad job out of desperation, no selling assets in a downturn.",
    deepDiveVi: [
      "Con số 3 đến 6 tháng chi phí thiết yếu là điểm khởi đầu, không phải chân lý. Người làm freelance hoặc thu nhập theo hoa hồng nên nhắm 9 tháng; người có hợp đồng dài hạn và bạn đời cùng thu nhập có thể yên tâm với 3 tháng.",
      "Điểm quan trọng bị bỏ qua là tính chất của số tiền, không phải kích cỡ: nó phải truy cập được trong 24 đến 48 giờ, không biến động giá, và tách khỏi tài khoản chi tiêu hằng ngày để không bị 'ăn nhầm'.",
      "Trước 30 tuổi, quỹ dự phòng nên đứng trước đầu tư vì rủi ro lớn nhất của bạn là buộc phải bán tài sản ở đáy. Sau khi quỹ đủ, mọi đồng dư mới nên chảy sang hũ đầu tư dài hạn.",
    ],
    deepDiveEn: [
      "Three to six months of essential expenses is a starting point, not a law. Freelancers and commission earners should target nine months; someone on a long contract with a dual-income household can sleep well at three.",
      "The overlooked part is the character of the money, not its size: reachable within 24 to 48 hours, no price volatility, and held away from your daily spending account so it never gets nibbled.",
      "Before 30, the fund comes before investing because your biggest risk is being forced to sell assets at the bottom. Once it is full, every extra dollar should flow into the long-term investing jar.",
    ],
    illustrationEmojis: ["🛟", "🏦", "🧯"],
  },
  "fin-05": {
    whyItMattersVi:
      "Nếu bạn chỉ học một chiến lược đầu tư trong đời, quỹ chỉ số là chiến lược có tỉ lệ thành công cao nhất cho người không làm tài chính chuyên nghiệp.",
    whyItMattersEn:
      "If you learn only one investing strategy in your life, index funds have the highest success rate for anyone who is not a full-time finance professional.",
    deepDiveVi: [
      "Lý do quỹ chỉ số thắng không phải vì nó thông minh hơn, mà vì nó rẻ hơn và không mắc lỗi hành vi. Chênh 1,5% phí mỗi năm trong 30 năm có thể lấy đi khoảng một phần ba tài sản cuối cùng của bạn.",
      "Ba tham số bạn cần kiểm tra trước khi mua bất kỳ quỹ nào: phí quản lý hằng năm, sai số so với chỉ số tham chiếu, và quy mô tài sản của quỹ. Tên quỹ và bảng xếp hạng một năm gần nhất gần như không có giá trị dự báo.",
      "Cách thực thi quan trọng hơn lựa chọn: đầu tư định kỳ một số tiền cố định mỗi tháng, không xem bảng giá hằng ngày, và chỉ tái cân bằng một hoặc hai lần mỗi năm. Kế hoạch nhàm chán là kế hoạch tồn tại được qua khủng hoảng.",
    ],
    deepDiveEn: [
      "Index funds win not because they are smarter but because they are cheaper and do not make behavioural mistakes. A 1.5% annual fee gap over thirty years can quietly remove about a third of your final portfolio.",
      "Check three parameters before buying any fund: annual expense ratio, tracking error against its benchmark, and total assets under management. Fund names and one-year league tables have almost no predictive value.",
      "Execution matters more than selection: invest a fixed amount monthly, stop checking prices daily, and rebalance once or twice a year. A boring plan is the plan that survives a crash.",
    ],
    illustrationEmojis: ["📉", "🧮", "🐢"],
  },
  "fin-06": {
    whyItMattersVi:
      "Một tài khoản tiết kiệm duy nhất vừa mất giá vì lạm phát, vừa dễ bị tiêu vào việc không khẩn cấp. Ba lớp phòng thủ giải quyết cả hai vấn đề.",
    whyItMattersEn:
      "A single savings account both loses value to inflation and gets spent on non-emergencies. Three layers of defence solve both problems at once.",
    deepDiveVi: [
      "Lớp một là tiền mặt sống: khoảng một tháng chi phí trong tài khoản thanh toán, dùng cho sự cố trong ngày. Lớp hai là hai đến ba tháng trong tiền gửi ngắn hạn hoặc quỹ tiền tệ, rút trong một đến hai ngày. Lớp ba là hai đến ba tháng ở kỳ hạn dài hơn với lợi suất tốt hơn.",
      "Việc phân lớp tạo ra một 'ma sát lành mạnh'. Bạn vẫn đủ tiền cho tình huống thật, nhưng việc rút lớp ba đòi hỏi vài bước, đủ để chặn quyết định bốc đồng.",
      "Nguyên tắc nạp lại quan trọng như nguyên tắc rút. Sau mỗi lần dùng, hãy đặt lệnh nạp lại tự động trong ba tháng tiếp theo, trước khi tăng chi tiêu ở bất kỳ hũ nào khác.",
    ],
    deepDiveEn: [
      "Layer one is living cash: about one month of expenses in your current account for same-day incidents. Layer two is two to three months in short-term deposits or a money market fund, reachable in a day or two. Layer three is two to three months at a longer term with a better yield.",
      "Layering creates healthy friction. You still have money for genuine emergencies, but reaching layer three takes a few steps, which is usually enough to stop an impulsive decision.",
      "The refill rule matters as much as the withdrawal rule. After any use, schedule automatic top-ups over the next three months before you raise spending in any other jar.",
    ],
    illustrationEmojis: ["🧱", "🏦", "🛡️"],
  },
  "fin-07": {
    whyItMattersVi:
      "Phân bổ tài sản quyết định phần lớn kết quả dài hạn của bạn, lớn hơn nhiều so với việc chọn được mã cổ phiếu nào.",
    whyItMattersEn:
      "Asset allocation drives most of your long-run outcome, far more than picking the right individual stock.",
    deepDiveVi: [
      "Ba câu hỏi quyết định tỉ lệ: khi nào bạn cần tiền, bạn chịu được mức giảm bao nhiêu phần trăm mà vẫn ngủ được, và thu nhập của bạn có ổn định không. Tuổi chỉ là biến thứ tư.",
      "Tiền cần dùng trong ba năm tới không nên nằm trong cổ phiếu, bất kể bạn 22 hay 42 tuổi. Ngược lại, tiền cho mục tiêu 15 năm mà giữ toàn bộ ở tiền gửi là một rủi ro lạm phát bị che giấu.",
      "Hãy viết ra tỉ lệ mục tiêu và ngưỡng lệch cho phép, ví dụ 5%. Khi thị trường làm lệch quá ngưỡng, bạn tái cân bằng theo quy tắc đã viết chứ không theo cảm xúc của ngày hôm đó.",
    ],
    deepDiveEn: [
      "Three questions set your ratio: when you need the money, how large a drawdown you can hold without panicking, and how stable your income is. Age is only the fourth variable.",
      "Money needed within three years does not belong in equities, whether you are 22 or 42. Conversely, money for a fifteen-year goal parked entirely in deposits carries a hidden inflation risk.",
      "Write down your target weights and an allowed drift band, for example 5%. When markets push you outside the band, you rebalance by the written rule rather than by that day's mood.",
    ],
    illustrationEmojis: ["🥧", "⚖️", "🎯"],
  },
  "fin-08": {
    whyItMattersVi:
      "Sai lầm đắt nhất trong đầu tư gần như luôn là sai lầm hành vi, không phải sai lầm phân tích. Biết tên thiên kiến giúp bạn nhận ra nó khi đang mắc.",
    whyItMattersEn:
      "The most expensive investing mistakes are almost always behavioural, not analytical. Naming a bias helps you notice it while it is happening.",
    deepDiveVi: [
      "Bốn thiên kiến gây tổn thất lớn nhất: sợ mất mát khiến bạn bán ở đáy, thiên kiến xác nhận khiến bạn chỉ đọc tin ủng hộ quyết định cũ, thiên kiến quen thuộc khiến bạn dồn tiền vào cổ phiếu công ty mình, và tự tin quá mức khiến bạn giao dịch quá nhiều.",
      "Cách chữa không phải là 'suy nghĩ kỹ hơn' mà là ràng buộc trước: viết luận điểm đầu tư và điều kiện bán ngay khi mua, đặt lệnh định kỳ tự động, và giới hạn số lần xem danh mục mỗi tháng.",
      "Một nhật ký quyết định dài ba dòng cho mỗi giao dịch là công cụ rẻ nhất để phát hiện mẫu hành vi của chính bạn sau một năm.",
    ],
    deepDiveEn: [
      "Four biases do the most damage: loss aversion makes you sell at the bottom, confirmation bias makes you read only what supports an old decision, familiarity bias concentrates you in your employer's stock, and overconfidence makes you trade too often.",
      "The cure is not thinking harder, it is pre-commitment: write your thesis and your sell conditions at the moment you buy, automate recurring purchases, and cap how often you look at the portfolio.",
      "A three-line decision journal per trade is the cheapest tool for spotting your own behavioural patterns a year later.",
    ],
    illustrationEmojis: ["🪞", "📝", "🎢"],
  },
  "fin-09": {
    whyItMattersVi:
      "Một đồng thuế tối ưu hợp pháp có giá trị bằng một đồng lợi nhuận đầu tư, nhưng chắc chắn hơn nhiều vì không phụ thuộc thị trường.",
    whyItMattersEn:
      "A dollar saved through legal tax planning is worth as much as a dollar of investment return, and far more certain because it does not depend on markets.",
    deepDiveVi: [
      "Bốn đòn cơ bản hầu như ai cũng dùng được: khai đúng và đủ các khoản giảm trừ phụ thuộc, tận dụng các tài khoản hưu trí hoặc bảo hiểm được ưu đãi thuế, ghi nhận chi phí hợp lệ nếu bạn có thu nhập tự do, và chọn đúng thời điểm ghi nhận thu nhập lớn.",
      "Điều kiện tiên quyết cho cả bốn là hồ sơ. Không có hoá đơn, hợp đồng và sao kê được lưu theo tháng thì mọi quyền lợi hợp pháp đều trở nên không thể chứng minh.",
      "Ranh giới đạo đức và pháp lý rất rõ: tối ưu là dùng đúng các quy định đã có, còn che giấu thu nhập là hành vi vi phạm. Khi một phương án đòi hỏi bạn phải giấu, hãy dừng lại và hỏi chuyên gia thuế.",
    ],
    deepDiveEn: [
      "Four levers are available to almost everyone: claiming every dependant deduction you qualify for, using tax-advantaged retirement or insurance accounts, recording legitimate expenses if you have self-employed income, and timing large one-off income.",
      "All four depend on one prerequisite: documentation. Without invoices, contracts and statements filed monthly, every legal entitlement becomes unprovable.",
      "The line is clear: optimisation uses rules that already exist, hiding income is a violation. If a scheme requires concealment, stop and ask a qualified tax adviser.",
    ],
    illustrationEmojis: ["🧾", "🗂️", "⚖️"],
  },
  "fin-10": {
    whyItMattersVi:
      "Khoảng cách giữa lợi suất của thị trường và lợi suất thực tế của nhà đầu tư chính là giá của cảm xúc. Đó là khoản phí duy nhất bạn có thể tự xoá.",
    whyItMattersEn:
      "The gap between market returns and actual investor returns is the price of emotion. It is the one fee you can remove entirely by yourself.",
    deepDiveVi: [
      "Nghiên cứu Dalbar nhiều năm cho thấy nhà đầu tư cá nhân thường thu về thấp hơn thị trường vài điểm phần trăm mỗi năm, chủ yếu vì mua khi tin tức tốt và bán khi tin tức xấu.",
      "Cơ chế phía sau là sự bất đối xứng cảm xúc: cảm giác đau khi mất 20% mạnh hơn nhiều so với niềm vui khi lãi 20%. Vì vậy quyết định trong lúc thị trường giảm gần như luôn bị thiên lệch về hành động.",
      "Ba biện pháp thực tế: chỉ mở danh mục vào một ngày cố định mỗi tháng, viết trước một trang 'kế hoạch khi thị trường giảm 30%', và tự động hoá việc mua để bạn không phải quyết định gì trong lúc hoảng loạn.",
    ],
    deepDiveEn: [
      "Years of Dalbar research show retail investors typically capture several percentage points less than the market each year, mostly by buying on good news and selling on bad.",
      "The mechanism is emotional asymmetry: losing 20% hurts far more than gaining 20% feels good, so decisions made during declines are almost always biased toward action.",
      "Three practical defences: open your portfolio on one fixed day each month, write a one-page plan for a 30% drawdown in advance, and automate buying so no decision is needed while you are panicking.",
    ],
    illustrationEmojis: ["🎭", "📆", "🧘"],
  },
  "fin-11": {
    whyItMattersVi:
      "Bảo hiểm mua đúng giúp một biến cố lớn không xoá sạch mười năm tích luỹ. Mua sai thì mỗi tháng bạn trả tiền cho thứ mình không cần.",
    whyItMattersEn:
      "Insurance bought well keeps one catastrophe from erasing ten years of saving. Bought badly, you pay monthly for cover you never needed.",
    deepDiveVi: [
      "Nguyên tắc gốc: bảo hiểm là để chuyển giao rủi ro thảm khốc, không phải để tích luỹ. Ưu tiên theo thứ tự là sức khoẻ, thu nhập nếu bạn là trụ cột, rồi tài sản lớn như nhà và xe.",
      "Ba cái bẫy phổ biến là gộp đầu tư vào hợp đồng bảo vệ khiến cả hai đều kém hiệu quả, khai báo sức khoẻ không đầy đủ dẫn tới bị từ chối chi trả, và mua mức bồi thường quá thấp so với chi phí thực tế.",
      "Trước khi ký, hãy đọc đúng ba mục: điều khoản loại trừ, thời gian chờ, và cách tính bồi thường. Ba mục này quyết định giá trị thực của hợp đồng nhiều hơn toàn bộ phần giới thiệu.",
    ],
    deepDiveEn: [
      "The root principle: insurance transfers catastrophic risk, it does not accumulate wealth. Priority order is health, then income protection if you are a breadwinner, then large assets like a home or car.",
      "The three traps are bundling investment into a protection contract so both perform poorly, incomplete health disclosure that voids a future claim, and buying a payout limit far below real costs.",
      "Before signing, read exactly three sections: exclusions, waiting periods, and how the payout is calculated. Those three decide the real value of the policy more than the entire brochure.",
    ],
    illustrationEmojis: ["🛡️", "📋", "🏥"],
  },

  /* ─────────────── ETIQUETTE ─────────────── */
  "etq-01": {
    whyItMattersVi:
      "Lắng nghe chủ động là kỹ năng ảnh hưởng duy nhất bạn có thể dùng ngay hôm nay mà không cần chức danh, kinh nghiệm hay quyền lực.",
    whyItMattersEn:
      "Active listening is the one influence skill you can use today without a title, seniority or power.",
    deepDiveVi: [
      "Nghe chủ động khác nghe im lặng. Nó gồm ba hành vi quan sát được: phản chiếu nội dung bằng lời của bạn, gọi tên cảm xúc bạn nghe thấy, và đặt một câu hỏi mở dựa trên điều vừa nghe chứ không dựa trên điều bạn muốn nói.",
      "Rào cản lớn nhất là 'nghe để trả lời'. Khi bạn đang soạn câu đáp trong đầu, bạn chỉ còn một phần chú ý cho người đối diện, và họ cảm nhận được điều đó qua ánh mắt và nhịp đáp.",
      "Bài kiểm tra đơn giản: sau mỗi cuộc trò chuyện, bạn có thể tóm tắt điều người kia quan tâm nhất bằng một câu mà họ sẽ đồng ý không? Nếu không, bạn vừa nói chứ chưa nghe.",
    ],
    deepDiveEn: [
      "Active listening is not silent listening. It has three observable behaviours: paraphrasing content in your own words, naming the emotion you hear, and asking one open question built on what was said rather than on what you wanted to say.",
      "The biggest barrier is listening in order to reply. While you draft your answer internally, only part of your attention remains available, and the other person feels it in your eyes and response timing.",
      "A simple test: after each conversation, can you summarise what mattered most to the other person in one sentence they would agree with? If not, you talked rather than listened.",
    ],
    illustrationEmojis: ["👂", "💬", "🤝"],
  },
  "etq-02": {
    whyItMattersVi:
      "Ranh giới rõ ràng bảo vệ cả bạn và quan hệ. Lời từ chối mơ hồ khiến người khác tiếp tục hỏi, còn bạn thì âm thầm oán trách.",
    whyItMattersEn:
      "Clear boundaries protect both you and the relationship. A vague no keeps others asking, and quietly builds resentment in you.",
    deepDiveVi: [
      "Cấu trúc ba phần hoạt động tốt trong hầu hết tình huống: ghi nhận đề nghị, nói không một cách trực tiếp, rồi đưa ra thứ bạn thực sự có thể làm. Không cần thêm lời xin lỗi kéo dài, vì xin lỗi biến ranh giới thành đề nghị thương lượng.",
      "Sự khó chịu khi từ chối phần lớn đến từ niềm tin rằng giá trị của bạn nằm ở mức độ hữu dụng. Khi niềm tin đó chưa được xử lý, mọi kịch bản từ chối đều nghe giả tạo.",
      "Hãy tách 'không cho việc này' khỏi 'không với người này'. Một câu nói rõ điều đó, ví dụ 'tuần này tôi không nhận thêm được, nhưng tôi vẫn muốn hỗ trợ dự án của bạn', giữ được cả ranh giới và quan hệ.",
    ],
    deepDiveEn: [
      "A three-part structure works in most situations: acknowledge the request, decline directly, then offer what you genuinely can do. No extended apology is needed, because apologising turns a boundary into an opening offer.",
      "Most of the discomfort of declining comes from believing your worth equals your usefulness. Until that belief is examined, every no script will sound fake.",
      "Separate 'no to this task' from 'no to this person'. One sentence that makes it explicit, such as 'I can't take more on this week, but I still want to support your project', preserves both the boundary and the relationship.",
    ],
    illustrationEmojis: ["🚪", "✋", "🕊️"],
  },
  "etq-03": {
    whyItMattersVi:
      "Sáu mươi giây đầu quyết định cuộc trò chuyện sẽ dừng ở phép lịch sự hay đi tới điều đáng nhớ. Đây là kỹ năng học được, không phải tính cách.",
    whyItMattersEn:
      "The first sixty seconds decide whether a conversation stays polite or becomes memorable. This is a learnable skill, not a personality trait.",
    deepDiveVi: [
      "Công thức là chuyển từ dữ liệu sang câu chuyện. Thay vì hỏi 'bạn làm nghề gì', hãy hỏi 'điều gì đưa bạn tới lĩnh vực này'. Câu hỏi thứ hai mời người ta kể, và kể là nơi sự kết nối xuất hiện.",
      "Ba tầng chiều sâu hữu ích: bối cảnh, lựa chọn, rồi giá trị. Bạn đi từ 'bạn đang làm gì' sang 'vì sao bạn chọn con đường đó' và cuối cùng 'điều gì khiến nó đáng làm với bạn'. Không nên nhảy tầng quá nhanh.",
      "Hãy cho đi trước một chút thông tin về mình. Tự tiết lộ ở mức vừa phải là tín hiệu an toàn, giúp người kia dám nói sâu hơn mà không thấy như đang bị phỏng vấn.",
    ],
    deepDiveEn: [
      "The formula is moving from data to story. Instead of 'what do you do', ask 'what brought you into that field'. The second question invites narration, and narration is where connection happens.",
      "Three useful depth layers: context, then choice, then value. You move from 'what are you working on' to 'why did you pick that path' to 'what makes it worth doing for you'. Do not skip layers too quickly.",
      "Offer a little about yourself first. Moderate self-disclosure is a safety signal that lets the other person go deeper without feeling interviewed.",
    ],
    illustrationEmojis: ["🗣️", "🔍", "✨"],
  },
  "etq-04": {
    whyItMattersVi:
      "Trong môi trường quốc tế, thiện chí không bù được thiếu hiểu biết văn hoá. Quan sát trước khi hành động là dạng tôn trọng cao nhất.",
    whyItMattersEn:
      "In international settings good intentions do not offset cultural blind spots. Observing before acting is the highest form of respect.",
    deepDiveVi: [
      "Ba trục dễ gây va chạm nhất: mức độ trực tiếp khi phản hồi, khoảng cách quyền lực khi nói với người lớn tuổi hoặc cấp trên, và cách hiểu về thời gian và đúng giờ. Hầu hết hiểu lầm nằm ở ba trục này chứ không ở nghi thức bàn ăn.",
      "Chiến lược an toàn là 'quan sát, hỏi, rồi làm'. Trong hai mươi phút đầu ở môi trường mới, hãy chú ý ai nói trước, người ta phản hồi bằng lời hay bằng im lặng, và mức độ thoải mái với đùa vui.",
      "Khi đã lỡ sai, cách xử lý quan trọng hơn lỗi. Một câu ngắn nhận biết, không phòng vệ, và một câu hỏi để học sẽ khôi phục quan hệ nhanh hơn mọi lời giải thích dài.",
    ],
    deepDiveEn: [
      "Three axes cause most friction: how directly feedback is given, power distance when speaking with elders or seniors, and how time and punctuality are understood. Most misunderstandings live here, not at the dinner table.",
      "The safe strategy is observe, ask, then act. In your first twenty minutes in a new setting, notice who speaks first, whether disagreement is voiced or held in silence, and how much humour is welcome.",
      "When you do get it wrong, the repair matters more than the mistake. A short non-defensive acknowledgement plus one question to learn restores the relationship faster than any long explanation.",
    ],
    illustrationEmojis: ["🌍", "👀", "🙏"],
  },
  "etq-05": {
    whyItMattersVi:
      "Giao tiếp phi bạo lực cho bạn cách nói ra sự thật khó nghe mà người đối diện vẫn còn muốn nghe tiếp. Đó là kỹ năng giữ được quan hệ dài hạn.",
    whyItMattersEn:
      "Nonviolent communication gives you a way to say the hard thing while the other person still wants to keep listening. It is the skill that preserves long relationships.",
    deepDiveVi: [
      "Bốn bước là quan sát, cảm xúc, nhu cầu, đề nghị. Bước dễ hỏng nhất là bước một: 'bạn luôn trễ' là đánh giá, còn 'ba buổi họp tuần này bắt đầu muộn 15 phút' là quan sát. Đánh giá kích hoạt phòng vệ, quan sát thì không.",
      "Bước nhu cầu là bước bị bỏ qua nhiều nhất, nhưng nó chuyển cuộc nói chuyện từ đúng sai sang cùng giải quyết. Khi bạn nói rõ nhu cầu, ví dụ cần dự đoán được tiến độ, đối phương có thể giúp mà không phải thừa nhận mình xấu.",
      "Đề nghị cần cụ thể, khả thi và ở dạng hành động. 'Hãy tôn trọng thời gian của tôi' là mong muốn; 'bạn nhắn trước 30 phút nếu đến muộn' là đề nghị có thể thực hiện.",
    ],
    deepDiveEn: [
      "The four steps are observation, feeling, need, request. Step one fails most often: 'you are always late' is an evaluation, while 'three meetings this week started 15 minutes late' is an observation. Evaluation triggers defence, observation does not.",
      "The need step is skipped most often, yet it moves the conversation from blame to joint problem-solving. Naming a need, such as predictable timelines, lets the other person help without admitting to being a bad person.",
      "A request must be specific, doable and phrased as an action. 'Respect my time' is a wish; 'message me 30 minutes ahead if you'll be late' is a request that can actually be fulfilled.",
    ],
    illustrationEmojis: ["🕊️", "🧩", "💬"],
  },
  "eti-06": {
    whyItMattersVi:
      "Người được xem là thông minh trong phòng thường là người đặt câu hỏi mở đúng lúc, không phải người nói nhiều nhất.",
    whyItMattersEn:
      "The person seen as smart in the room is usually the one asking the right open question, not the one talking most.",
    deepDiveVi: [
      "Câu hỏi tốt có ba đặc điểm: mở, không gợi ý câu trả lời, và dựa trên điều vừa được nói. Câu hỏi kém thường là câu khẳng định trá hình, kiểu 'bạn không nghĩ là nên làm cách kia sao?'.",
      "Một bộ ba dùng được ở gần như mọi cuộc họp: 'Điều gì khiến bạn nghĩ vậy?', 'Nếu điều này đúng thì hệ quả tiếp theo là gì?', và 'Chúng ta đang giả định điều gì mà chưa kiểm tra?'.",
      "Sau khi hỏi, hãy để im lặng ba đến năm giây. Khoảng lặng ngắn đó là nơi câu trả lời thật xuất hiện; lấp nó bằng lời giải thích của bạn sẽ xoá luôn giá trị của câu hỏi.",
    ],
    deepDiveEn: [
      "A good question has three traits: it is open, it does not smuggle in the answer, and it builds on what was just said. Weak questions are usually statements in disguise, like 'don't you think we should do it the other way?'.",
      "One trio works in almost any meeting: 'What makes you think that?', 'If that is true, what follows next?', and 'What are we assuming but have not tested?'.",
      "After asking, hold three to five seconds of silence. That short pause is where the real answer appears; filling it with your own explanation erases the value of the question.",
    ],
    illustrationEmojis: ["❓", "💡", "🤔"],
  },
  "eti-07": {
    whyItMattersVi:
      "Người bận rộn quét email trong tám giây đầu. Viết rõ ràng không phải là kỹ năng văn chương, đó là cách tôn trọng thời gian của người khác.",
    whyItMattersEn:
      "Busy people scan an email in the first eight seconds. Writing clearly is not a literary skill, it is a way of respecting other people's time.",
    deepDiveVi: [
      "Cấu trúc BLUF đặt kết luận và đề nghị lên đầu, rồi mới đến bối cảnh. Người đọc nắm được việc cần làm ngay dòng đầu và có thể quyết định đọc tiếp hay không.",
      "Ba chi tiết tăng tỉ lệ phản hồi rõ rệt: tiêu đề chứa hành động và mốc thời gian, mỗi email chỉ một yêu cầu, và câu cuối nêu rõ ai làm gì trước ngày nào.",
      "Chọn kênh cũng là phép lịch sự. Việc cần lưu vết và có nhiều người liên quan thì dùng email; việc cần phản hồi trong giờ thì dùng chat; việc có nguy cơ hiểu sai cảm xúc thì gọi điện.",
    ],
    deepDiveEn: [
      "The BLUF structure puts the conclusion and the request first, then the context. The reader knows what is needed in line one and can decide whether to keep reading.",
      "Three details visibly raise response rates: a subject line containing an action and a deadline, exactly one request per email, and a closing line stating who does what by when.",
      "Channel choice is etiquette too. Use email when a decision needs a record and several people; use chat when you need a reply within the hour; call when tone could easily be misread.",
    ],
    illustrationEmojis: ["✉️", "⏱️", "✅"],
  },
  "eti-08": {
    whyItMattersVi:
      "Xung đột không xử lý sẽ không biến mất, nó chỉ chuyển thành khoảng cách. Một cuộc nói chuyện khó làm tốt có thể làm quan hệ sâu hơn.",
    whyItMattersEn:
      "Unhandled conflict does not disappear, it turns into distance. One hard conversation handled well can deepen a relationship.",
    deepDiveVi: [
      "DESC là bốn bước: mô tả sự việc, nói cảm nhận, nêu cụ thể điều bạn đề nghị, và làm rõ hệ quả tích cực nếu thay đổi xảy ra. Điểm mạnh của nó là buộc bạn chuẩn bị bằng dữ kiện thay vì cảm xúc thô.",
      "Cầu nối giải cứu dùng khi cuộc nói chuyện nóng lên: gọi tên tình trạng đang xảy ra, tái khẳng định mục tiêu chung, rồi đề nghị tạm dừng có thời hạn. Ví dụ: 'Chúng ta đang căng lên rồi. Cả hai đều muốn dự án này chạy. Nghỉ mười phút rồi quay lại nhé?'.",
      "Chọn thời điểm và nơi chốn là một nửa kết quả. Không góp ý riêng tư trước mặt người khác, không mở chủ đề khó khi một trong hai đang đói, mệt hoặc sắp vào họp.",
    ],
    deepDiveEn: [
      "DESC has four steps: describe the facts, express your feeling, specify the request, and clarify the positive consequence of change. Its strength is forcing you to prepare with evidence instead of raw emotion.",
      "The rescue bridge is for when the temperature rises: name what is happening, restate the shared goal, then propose a time-boxed pause. For example: 'We're getting heated. We both want this project to work. Ten minutes and come back?'.",
      "Timing and setting are half the outcome. Never give private feedback in front of others, and never open a hard topic when either person is hungry, exhausted or about to enter a meeting.",
    ],
    illustrationEmojis: ["🌉", "🔥", "🤝"],
  },
  "eti-09": {
    whyItMattersVi:
      "Đàm phán giỏi không phải là thắng, mà là phát hiện thông tin bị che. Người biết hỏi và biết nghe thường mang về nhiều hơn người nói to.",
    whyItMattersEn:
      "Good negotiation is not winning, it is uncovering hidden information. The person who asks and listens usually takes home more than the loud one.",
    deepDiveVi: [
      "Ba công cụ dễ áp dụng nhất: phản chiếu ba từ cuối của đối phương để họ nói thêm, gọi tên cảm xúc bạn cảm nhận được, và dùng câu hỏi hiệu chỉnh dạng 'làm thế nào' hoặc 'điều gì' thay vì câu hỏi có hoặc không.",
      "Mục tiêu của việc gọi tên cảm xúc không phải là thao túng mà là hạ nhiệt. Khi cảm xúc được đặt lên bàn, phần lý trí của cả hai bên mới quay lại làm việc.",
      "Chuẩn bị luôn gồm ba số: mức mong muốn, mức chấp nhận thấp nhất, và phương án tốt nhất nếu không đạt thoả thuận. Không có số thứ ba, bạn sẽ đàm phán từ vị thế sợ mất.",
    ],
    deepDiveEn: [
      "The three most usable tools: mirror the other side's last three words so they keep talking, label the emotion you sense, and use calibrated 'how' or 'what' questions instead of yes-or-no ones.",
      "Labelling emotions is not manipulation, it is de-escalation. Once feeling is on the table, the rational parts of both brains come back to work.",
      "Preparation always includes three numbers: your target, your walk-away point, and your best alternative if there is no deal. Without the third, you negotiate from fear of loss.",
    ],
    illustrationEmojis: ["🎧", "🪞", "🤲"],
  },
  "eti-10": {
    whyItMattersVi:
      "Phần lớn ấn tượng nghề nghiệp của bạn hiện nay được tạo ra qua chữ viết và màn hình. Sự tinh tế số vì thế trở thành kỹ năng thăng tiến.",
    whyItMattersEn:
      "Most of your professional impression is now formed through text and screens, which makes digital grace a promotion skill.",
    deepDiveVi: [
      "Ba nguyên tắc nền: rõ ràng hơn là ngắn gọn bằng mọi giá, phản hồi trong khung thời gian mà kênh đó ngụ ý, và giả định thiện chí khi đọc một tin nhắn cụt.",
      "Trong họp trực tuyến, ba chi tiết tạo khác biệt lớn: bật camera ở những cuộc họp cần ra quyết định, tắt micro khi không nói nhưng đừng biến mất hoàn toàn, và tóm tắt kết luận bằng một tin nhắn sau họp.",
      "Đừng gửi tin nhắn cảm xúc mạnh trong lúc đang cảm xúc mạnh. Viết nháp, đợi mười phút, đọc lại và hỏi 'nếu câu này bị chụp lại thì mình có thoải mái không'.",
    ],
    deepDiveEn: [
      "Three base rules: clarity beats brevity at all costs, reply within the window that the channel implies, and assume good intent when reading a blunt message.",
      "In video meetings three details make a large difference: camera on for decision meetings, mic muted when not speaking but do not vanish entirely, and a short post-meeting message summarising what was decided.",
      "Never send an emotionally loaded message while emotionally loaded. Draft it, wait ten minutes, reread it and ask whether you would be comfortable if it were screenshotted.",
    ],
    illustrationEmojis: ["💻", "🎥", "⌨️"],
  },
  "eti-11": {
    whyItMattersVi:
      "Người luôn nói có không phải là người tử tế, họ chỉ đang cạn kiệt. Từ chối có kỹ năng giúp bạn giữ được cả ranh giới và quan hệ.",
    whyItMattersEn:
      "People who always say yes are not kinder, they are depleted. Skilful declining preserves both your boundary and the relationship.",
    deepDiveVi: [
      "Năm mẫu câu hữu ích: không kèm lý do ngắn, không kèm phương án thay thế, không kèm điều kiện thời gian, không kèm giới thiệu người phù hợp hơn, và không dứt khoát khi việc đó vi phạm giá trị của bạn.",
      "Mấu chốt là tách lời từ chối khỏi lời xin phép. Câu 'mình không nhận thêm được tuần này' là thông tin; câu 'mình xin lỗi, không biết có được không, hay là...' mời người khác thương lượng tiếp.",
      "Hãy tính chi phí cơ hội trước khi trả lời. Mỗi lời đồng ý là một lời từ chối ngầm với việc khác, thường là việc quan trọng hơn nhưng không có ai đứng bên cạnh nhắc bạn.",
    ],
    deepDiveEn: [
      "Five usable templates: no with a short reason, no with an alternative, no with a time condition, no with a better-suited referral, and a hard no when the request crosses a value.",
      "The key is separating a decline from a request for permission. 'I can't take more on this week' is information; 'sorry, I'm not sure if I can, or maybe...' invites further negotiation.",
      "Price the opportunity cost before answering. Every yes is a silent no to something else, usually something more important that has nobody standing next to you to advocate for it.",
    ],
    illustrationEmojis: ["🙅", "📝", "⚖️"],
  },

  /* ─────────────── PRESENCE ─────────────── */
  "prs-01": {
    whyItMattersVi:
      "Người nghe quyết định mức độ tin bạn từ cách giọng nói vận hành, trước khi họ kịp đánh giá nội dung bạn nói.",
    whyItMattersEn:
      "Listeners decide how much to trust you from how your voice behaves, before they have evaluated a single argument.",
    deepDiveVi: [
      "Bốn tham số của giọng nói là cao độ, tốc độ, âm lượng và khoảng lặng. Uy quyền hầu như luôn đến từ hạ cao độ ở cuối câu, giảm tốc độ và tăng khoảng lặng, chứ không đến từ tăng âm lượng.",
      "Lỗi phổ biến nhất là 'uptalk', tức lên giọng ở cuối câu khẳng định. Nó khiến câu nói nghe như câu hỏi và làm người nghe nghi ngờ chính điều bạn vừa nói.",
      "Cách luyện thực tế: ghi âm 60 giây nói tự do mỗi ngày, nghe lại và chỉ sửa một tham số mỗi tuần. Sửa cả bốn cùng lúc sẽ tạo ra giọng nói nghe giả.",
    ],
    deepDiveEn: [
      "A voice has four parameters: pitch, pace, volume and pause. Authority almost always comes from dropping pitch at the end of sentences, slowing pace and lengthening pauses, not from raising volume.",
      "The most common flaw is uptalk, letting pitch rise at the end of a statement. It makes the sentence sound like a question and invites the listener to doubt what you just said.",
      "A practical drill: record 60 seconds of free speech daily, listen back, and fix only one parameter per week. Fixing all four at once produces a voice that sounds artificial.",
    ],
    illustrationEmojis: ["🎙️", "📉", "🤫"],
  },
  "prs-02": {
    whyItMattersVi:
      "Cơ thể bạn nói trước khi bạn kịp mở lời. Tư thế mở và ổn định được đọc là năng lực, còn co rúm bị đọc là bất an.",
    whyItMattersEn:
      "Your body speaks before you do. Open, settled posture reads as competence, while a collapsed frame reads as insecurity.",
    deepDiveVi: [
      "Ba trụ cột là chân đứng vững bằng vai, vai mở và không nâng, và bàn tay ở trong tầm nhìn. Bàn tay ẩn dưới bàn hoặc trong túi làm giảm cảm nhận về sự minh bạch.",
      "Ranh giới giữa tự tin và hung hăng nằm ở nhịp độ, không ở kích cỡ tư thế. Chuyển động chậm, dứt khoát và ít lặp lại được đọc là bình tĩnh; chiếm không gian kèm động tác nhanh bị đọc là đe doạ.",
      "Hãy lưu ý các bằng chứng về 'power posing' đã bị tranh luận nhiều trong nghiên cứu tâm lý. Hiệu ứng chắc chắn hơn là ở cách người khác nhìn bạn và ở việc bạn thở dễ hơn khi ngực không bị nén.",
    ],
    deepDiveEn: [
      "Three pillars: feet grounded at shoulder width, shoulders open and not lifted, hands visible. Hands hidden under a table or in pockets reduce perceived transparency.",
      "The line between confident and aggressive is tempo, not size. Slow, decisive, non-repetitive movement reads as calm; taking space with fast movement reads as threatening.",
      "Note that the 'power posing' literature has been heavily debated in psychology. The more reliable effects are how others perceive you and the fact that you breathe more easily when your chest is not compressed.",
    ],
    illustrationEmojis: ["🧍", "🫱", "🪞"],
  },
  "prs-03": {
    whyItMattersVi:
      "Chủ nghĩa Stoic không dạy bạn hết cảm xúc, nó dạy bạn tách điều kiểm soát được khỏi điều không. Đó là bộ lọc giảm lo lắng nhanh nhất.",
    whyItMattersEn:
      "Stoicism does not teach you to stop feeling, it teaches you to separate what you control from what you do not. It is the fastest anxiety filter available.",
    deepDiveVi: [
      "Công cụ trung tâm là phép phân đôi kiểm soát: hành động, phản ứng và tiêu chuẩn của bạn thuộc phạm vi kiểm soát; kết quả, ý kiến người khác và thời tiết thì không. Hầu hết đau khổ đến từ việc đổ năng lượng vào cột thứ hai.",
      "Hai bài thực hành có hiệu quả cao là premeditatio malorum, tức hình dung trước điều tệ nhất để giảm bất ngờ, và nhật ký buổi tối ba câu theo cách của Marcus Aurelius.",
      "Cần phân biệt Stoic với đè nén. Stoic ghi nhận cảm xúc rồi chọn hành động theo giá trị; đè nén là phủ nhận cảm xúc, và về lâu dài nó làm tăng căng thẳng chứ không giảm.",
    ],
    deepDiveEn: [
      "The central tool is the dichotomy of control: your actions, responses and standards are inside it; outcomes, other people's opinions and the weather are not. Most suffering comes from pouring energy into the second column.",
      "Two high-yield practices are premeditatio malorum, rehearsing the worst case to remove surprise, and a three-line evening journal in the style of Marcus Aurelius.",
      "Distinguish stoicism from suppression. A stoic acknowledges the emotion and then acts on values; suppression denies the emotion and, over time, raises stress rather than lowering it.",
    ],
    illustrationEmojis: ["🏛️", "⚖️", "🌊"],
  },
  "prs-04": {
    whyItMattersVi:
      "Cảm xúc của bạn phần lớn đến từ cách bạn diễn giải sự việc, không từ bản thân sự việc. Sửa được diễn giải là sửa được cảm xúc.",
    whyItMattersEn:
      "Your feelings come mostly from how you interpret an event, not from the event itself. Fix the interpretation and the feeling shifts.",
    deepDiveVi: [
      "Mô hình ABC là nền tảng: A là sự việc, B là niềm tin hoặc cách diễn giải, C là hệ quả cảm xúc. Người ta thường tin A gây ra C, nhưng chính B mới là mắt xích có thể sửa.",
      "Bốn méo mó nhận thức xuất hiện nhiều nhất ở người trẻ: đọc suy nghĩ người khác, tổng quát hoá quá mức, tư duy tất cả hoặc không gì, và cá nhân hoá. Đặt tên đúng méo mó đã giảm được phần lớn sức nặng của nó.",
      "Tái định khung không phải là tư duy tích cực cưỡng bức. Câu hỏi đúng là 'cách giải thích nào vừa đúng với dữ kiện vừa hữu ích cho hành động tiếp theo', không phải 'làm sao để thấy vui'.",
    ],
    deepDiveEn: [
      "The ABC model is the foundation: A is the event, B is the belief or interpretation, C is the emotional consequence. People assume A causes C, but B is the editable link.",
      "Four distortions dominate in young adults: mind reading, overgeneralising, all-or-nothing thinking and personalising. Naming the distortion accurately already removes much of its weight.",
      "Reframing is not forced positivity. The right question is 'which interpretation is both consistent with the facts and useful for my next action', not 'how do I feel happy about this'.",
    ],
    illustrationEmojis: ["🔄", "🧠", "📓"],
  },
  "prs-05": {
    whyItMattersVi:
      "Sức hút không phải phép thuật, nó là kết quả của hai tín hiệu người ta đọc ở bạn: bạn có ấm áp không, và bạn có năng lực không.",
    whyItMattersEn:
      "Charisma is not magic, it is the product of two signals people read in you: are you warm, and are you capable?",
    deepDiveVi: [
      "Ma trận cho bốn ô: ấm áp thấp và năng lực thấp gây thương hại, năng lực cao nhưng lạnh gây nể mà xa cách, ấm áp cao nhưng năng lực thấp gây thiện cảm mà không được tin việc, còn cao cả hai tạo ra sức hút thật.",
      "Hầu hết người có chuyên môn thất bại ở trục ấm áp, không ở trục năng lực. Cách sửa rẻ nhất là nhớ chi tiết cá nhân, hỏi lại chuyện lần trước, và ghi nhận công của người khác trước mặt người thứ ba.",
      "Ấm áp không đồng nghĩa dễ dãi. Bạn có thể vừa nói không rõ ràng vừa giữ ấm áp bằng cách giải thích lý do và bày tỏ quan tâm tới mục tiêu của người kia.",
    ],
    deepDiveEn: [
      "The matrix gives four quadrants: low warmth and low competence draws pity, high competence with coldness earns respect but distance, high warmth with low competence earns affection but not responsibility, and high on both is real charisma.",
      "Most experts fail on the warmth axis, not the competence axis. The cheapest fixes are remembering personal details, following up on last time's story, and crediting others in front of a third party.",
      "Warmth is not compliance. You can decline clearly and stay warm by explaining the reason and showing interest in the other person's goal.",
    ],
    illustrationEmojis: ["✨", "🔥", "🧊"],
  },
  "pre-06": {
    whyItMattersVi:
      "Khi khủng hoảng, giọng nói bên trong thường là giọng tệ nhất. Chuyển sang ngôi thứ ba tạo khoảng cách vừa đủ để suy nghĩ trở lại.",
    whyItMattersEn:
      "In a crisis your inner voice is usually your worst adviser. Switching to third person creates just enough distance for thinking to resume.",
    deepDiveVi: [
      "Nghiên cứu của Ethan Kross về 'self-distancing' cho thấy nói với mình bằng tên riêng, ví dụ 'Hải, tình huống thật sự là gì?', giúp giảm cường độ cảm xúc và cải thiện chất lượng quyết định so với dùng 'tôi'.",
      "Cơ chế là chuyển từ trải nghiệm sang quan sát. Khi bạn tự gọi tên mình, não xử lý tình huống giống như đang tư vấn cho một người bạn, và lời khuyên cho bạn bè luôn tỉnh táo hơn lời tự nhủ.",
      "Bộ ba câu hỏi để dùng ngay: 'Điều gì đang thực sự xảy ra?', 'Trong đó phần nào mình kiểm soát được?', 'Bước nhỏ nhất mình làm trong 10 phút tới là gì?'.",
    ],
    deepDiveEn: [
      "Ethan Kross's work on self-distancing shows that addressing yourself by name, for example 'Hai, what is actually happening here?', lowers emotional intensity and improves decision quality compared with using 'I'.",
      "The mechanism is a shift from experiencing to observing. Using your own name makes the brain process the situation as if advising a friend, and advice to friends is always more level-headed than self-talk.",
      "Three questions to use immediately: 'What is actually happening?', 'Which part of this do I control?', 'What is the smallest step I can take in the next ten minutes?'.",
    ],
    illustrationEmojis: ["🗨️", "🪞", "🧭"],
  },
  "pre-07": {
    whyItMattersVi:
      "Bảy giây đầu tiên tạo ra một giả thuyết về bạn, và mọi điều bạn nói sau đó đều bị đọc qua giả thuyết ấy.",
    whyItMattersEn:
      "The first seven seconds create a hypothesis about you, and everything you say afterwards is read through it.",
    deepDiveVi: [
      "Năm vi cử chỉ đáng luyện: giao tiếp mắt khoảng ba giây rồi rời tự nhiên, bàn tay mở khi nói, nghiêng nhẹ đầu khi nghe, dừng lại trước khi trả lời, và hướng bàn chân về phía người đang nói.",
      "Điểm ít ai để ý là sự nhất quán. Một nụ cười kèm vai căng và tay siết lại tạo tín hiệu lẫn lộn, và người nghe luôn tin phần cơ thể chứ không tin phần khuôn mặt.",
      "Hãy luyện từng cử chỉ một tuần trong các tình huống thấp áp lực, ví dụ khi mua cà phê, trước khi mang vào cuộc họp quan trọng.",
    ],
    deepDiveEn: [
      "Five micro-gestures worth drilling: about three seconds of eye contact then a natural break, open palms while speaking, a slight head tilt while listening, a pause before answering, and feet oriented toward the speaker.",
      "The underrated factor is consistency. A smile paired with tight shoulders and clenched hands sends a mixed signal, and observers always trust the body over the face.",
      "Practise one gesture per week in low-stakes settings, such as ordering coffee, before bringing it into a high-stakes meeting.",
    ],
    illustrationEmojis: ["👐", "👁️", "⏳"],
  },
  "pre-08": {
    whyItMattersVi:
      "Amor fati không phải là thích mọi điều xảy ra, mà là dừng việc tiêu năng lượng để chống lại điều đã xảy ra rồi.",
    whyItMattersEn:
      "Amor fati is not liking everything that happens, it is stopping the energy drain of fighting what has already happened.",
    deepDiveVi: [
      "Có ba tầng phản ứng với nghịch cảnh: chống lại, chấp nhận, và dùng nó làm nguyên liệu. Tầng ba là nơi Nietzsche và các nhà Stoic gặp nhau, và cũng là tầng duy nhất tạo ra hành động.",
      "Câu hỏi vận hành là 'điều này cho phép mình làm gì mà trước đây mình không thấy'. Đây không phải là tô hồng, mà là tìm bậc thang thực tế trong hoàn cảnh mới.",
      "Cần một ranh giới đạo đức rõ: amor fati áp dụng cho hoàn cảnh không thể đảo ngược, không dùng để biện minh cho việc chịu đựng bất công hoặc quan hệ độc hại có thể thay đổi được.",
    ],
    deepDiveEn: [
      "There are three response levels to adversity: resisting it, accepting it, and using it as raw material. The third is where Nietzsche and the Stoics meet, and it is the only one that produces action.",
      "The working question is 'what does this now allow me to do that I could not see before'. That is not gloss, it is looking for a real foothold in the new situation.",
      "One ethical boundary matters: amor fati applies to irreversible circumstances, not as a justification for enduring injustice or a harmful relationship you could actually change.",
    ],
    illustrationEmojis: ["🌱", "🗿", "🔥"],
  },
  "pre-09": {
    whyItMattersVi:
      "Chín mươi giây đầu của một khủng hoảng quyết định phần còn lại. Có một điểm neo được luyện trước giúp bạn không hành động từ nỗi hoảng.",
    whyItMattersEn:
      "The first ninety seconds of a crisis shape the rest of it. A pre-trained anchor keeps you from acting out of panic.",
    deepDiveVi: [
      "Quy trình bốn bước dễ nhớ: thở ra dài hơn hít vào, đặt chân chắc xuống sàn và gọi tên ba thứ đang thấy, gọi tên cảm xúc bằng một từ, rồi chọn một hành động nhỏ có thể làm ngay.",
      "Lý do thở ra dài có hiệu quả là nó tăng hoạt động phó giao cảm và làm chậm nhịp tim. Đây là cách can thiệp sinh lý trực tiếp nhất mà không cần dụng cụ gì.",
      "Điểm neo phải được luyện lúc bình thường mới dùng được lúc khủng hoảng. Ba mươi giây mỗi ngày trong hai tuần là đủ để nó trở thành phản xạ.",
    ],
    deepDiveEn: [
      "A memorable four-step protocol: exhale longer than you inhale, plant your feet and name three things you can see, name the emotion in one word, then choose one small action you can take now.",
      "Long exhales work because they raise parasympathetic activity and slow the heart rate. It is the most direct physiological intervention available with no equipment.",
      "An anchor must be trained on calm days to be usable on hard ones. Thirty seconds daily for two weeks is enough for it to become reflexive.",
    ],
    illustrationEmojis: ["⚓", "🌬️", "🦶"],
  },
  "pre-10": {
    whyItMattersVi:
      "Chín mươi phút đầu ngày là khoảng thời gian bạn kiểm soát nhiều nhất. Cách bạn dùng nó thường quyết định chất lượng của mười hai giờ còn lại.",
    whyItMattersEn:
      "The first ninety minutes of your day are the most controllable ones you own, and how you spend them usually decides the quality of the remaining twelve hours.",
    deepDiveVi: [
      "Năm khối hai mươi phút là ánh sáng và vận động, nước và dinh dưỡng, tĩnh lặng hoặc viết, một việc quan trọng nhất, rồi mới đến thông tin bên ngoài. Trật tự quan trọng hơn nội dung.",
      "Sai lầm phổ biến nhất là đảo khối cuối lên đầu. Mở điện thoại trước khi làm bất cứ điều gì khác giao quyền định hình cảm xúc buổi sáng cho thuật toán và cho việc của người khác.",
      "Không cần đủ năm khối. Người có con nhỏ hoặc làm ca có thể chạy phiên bản hai khối mười phút; giá trị đến từ tính lặp lại, không từ độ dài.",
    ],
    deepDiveEn: [
      "The five twenty-minute blocks are light and movement, water and food, stillness or writing, your single most important task, and only then external information. The order matters more than the content.",
      "The most common error is moving the last block to the front. Opening your phone before anything else hands the shaping of your morning mood to an algorithm and to other people's agendas.",
      "You do not need all five. A parent of small children or a shift worker can run a two-block ten-minute version; the value comes from repetition, not duration.",
    ],
    illustrationEmojis: ["🌅", "🧱", "📵"],
  },
  "pre-11": {
    whyItMattersVi:
      "Bạn không phải là suy nghĩ của bạn. Nhận ra khoảng cách đó là bước chuyển lớn nhất từ bị cảm xúc dẫn dắt sang hành động theo giá trị.",
    whyItMattersEn:
      "You are not your thoughts. Noticing that gap is the biggest shift from being led by emotion to acting on values.",
    deepDiveVi: [
      "ACT gọi kỹ thuật này là cognitive defusion. Thay vì 'tôi thất bại', bạn nói 'tôi đang có suy nghĩ rằng tôi thất bại'. Câu thứ hai vẫn thừa nhận suy nghĩ nhưng không đồng nhất bạn với nó.",
      "Mục tiêu của ACT không phải là loại bỏ suy nghĩ khó chịu mà là giảm mức độ nó điều khiển hành vi. Bạn có thể vừa lo lắng vừa gửi email quan trọng, và đó chính là thành công.",
      "Bộ đôi thực hành hằng ngày là gắn nhãn 'đây là một suy nghĩ' khi tự phê phán, rồi hỏi 'hành động nào phù hợp với giá trị của mình trong mười phút tới'.",
    ],
    deepDiveEn: [
      "ACT calls this cognitive defusion. Instead of 'I am a failure', you say 'I am having the thought that I am a failure'. The second sentence acknowledges the thought without merging you with it.",
      "ACT's goal is not eliminating uncomfortable thoughts but reducing how much they steer behaviour. Being anxious and still sending the important email is the definition of success here.",
      "The daily pair of practices: label self-criticism as 'this is a thought', then ask 'what action fits my values in the next ten minutes'.",
    ],
    illustrationEmojis: ["🎈", "🏷️", "🧭"],
  },

  /* ─────────────── WELLNESS ─────────────── */
  "wel-01": {
    whyItMattersVi:
      "Không có chất bổ nào bù được giấc ngủ thiếu. Ngủ đủ là điều kiện nền cho học tập, tâm trạng và miễn dịch, và nó miễn phí.",
    whyItMattersEn:
      "No supplement compensates for lost sleep. Sufficient sleep is the base condition for learning, mood and immunity, and it costs nothing.",
    deepDiveVi: [
      "Một đêm gồm nhiều chu kỳ khoảng 90 phút, trong đó giấc ngủ sâu tập trung ở nửa đầu và giấc REM ở nửa sau. Vì vậy thức khuya rồi ngủ bù buổi sáng cắt mất phần REM, phần liên quan mạnh tới trí nhớ và điều hoà cảm xúc.",
      "Ba đòn có tác động lớn nhất là giờ thức cố định, ánh sáng mạnh trong giờ đầu sau khi thức, và tránh caffeine sau khoảng đầu giờ chiều vì thời gian bán huỷ của nó khoảng năm đến sáu giờ.",
      "Nếu bạn ngủ đủ giờ mà vẫn buồn ngủ ban ngày kéo dài, ngáy to hoặc ngừng thở khi ngủ, đây là lúc gặp bác sĩ chứ không phải lúc thử thêm mẹo. Đó có thể là dấu hiệu rối loạn cần chẩn đoán.",
    ],
    deepDiveEn: [
      "A night is made of roughly 90-minute cycles, with deep sleep concentrated in the first half and REM in the second. Staying up late and sleeping in therefore cuts REM, the stage most tied to memory and emotional regulation.",
      "The three highest-impact levers are a fixed wake time, bright light in the first hour after waking, and avoiding caffeine after early afternoon, since its half-life is roughly five to six hours.",
      "If you sleep enough hours yet stay sleepy all day, snore heavily or stop breathing during sleep, that is a doctor's visit, not another hack. It can indicate a disorder that needs diagnosis.",
    ],
    illustrationEmojis: ["😴", "🌙", "⏰"],
  },
  "wel-02": {
    whyItMattersVi:
      "Zone 2 là vùng cường độ mà bạn vẫn nói chuyện được. Đây là cách rẻ nhất để cải thiện thể lực nền mà không cần chịu đau.",
    whyItMattersEn:
      "Zone 2 is the intensity at which you can still hold a conversation. It is the cheapest way to build base fitness without suffering.",
    deepDiveVi: [
      "Ở cường độ thấp và kéo dài, cơ thể sử dụng chất béo làm nhiên liệu chính và kích thích sinh ty thể, tức là tăng khả năng sản xuất năng lượng của tế bào. Đó là lý do vùng này cải thiện sức bền hằng ngày rõ hơn các buổi tập nặng ngắt quãng.",
      "Cách đo đơn giản nhất không cần thiết bị là bài kiểm tra nói: bạn nói được câu dài nhưng không hát được. Nhịp tim ước lượng khoảng 60 đến 70% mức tối đa, nhưng bài kiểm tra nói đủ dùng cho hầu hết mọi người.",
      "Liều lượng thực tế là 150 phút mỗi tuần chia thành ba đến năm buổi, đi bộ nhanh cũng tính. Nếu bạn có bệnh tim mạch hoặc lâu không vận động, hãy tham khảo bác sĩ trước khi tăng khối lượng.",
    ],
    deepDiveEn: [
      "At low, sustained intensity the body burns fat as its main fuel and stimulates mitochondrial biogenesis, increasing your cells' capacity to produce energy. That is why this zone improves everyday endurance more visibly than short, hard intervals.",
      "The simplest equipment-free gauge is the talk test: you can speak full sentences but not sing. Heart rate lands around 60 to 70% of maximum, but the talk test is accurate enough for most people.",
      "A practical dose is 150 minutes a week across three to five sessions, and brisk walking counts. If you have a cardiovascular condition or have been inactive for a long time, consult a doctor before adding volume.",
    ],
    illustrationEmojis: ["🚶", "❤️", "🔋"],
  },
  "wel-03": {
    whyItMattersVi:
      "Bạn không cần chọn đúng chế độ ăn hoàn hảo. Bạn cần vài nguyên tắc đủ đơn giản để duy trì mười năm.",
    whyItMattersEn:
      "You do not need to pick the perfect diet. You need a few principles simple enough to keep for ten years.",
    deepDiveVi: [
      "Năm nguyên tắc thay được phần lớn các chế độ ăn: ưu tiên thực phẩm ít qua chế biến, có protein ở mỗi bữa, ăn nhiều rau và chất xơ, uống đủ nước, và ăn chậm để tín hiệu no kịp xuất hiện.",
      "Lý do các chế độ ăn khắt khe thất bại không nằm ở sinh học mà ở tính bền. Chế độ nào bạn duy trì được sáu tháng luôn thắng chế độ tối ưu bạn bỏ sau ba tuần.",
      "Đây là hướng dẫn chung cho người trưởng thành khoẻ mạnh. Nếu bạn có bệnh chuyển hoá, đang mang thai, hoặc dùng thuốc dài hạn, hãy để chuyên gia dinh dưỡng hoặc bác sĩ điều chỉnh cụ thể.",
    ],
    deepDiveEn: [
      "Five principles replace most diets: favour minimally processed food, include protein at every meal, eat plenty of vegetables and fibre, drink enough water, and eat slowly so satiety signals arrive in time.",
      "Strict diets fail for reasons of sustainability rather than biology. The plan you keep for six months always beats the optimal plan you abandon after three weeks.",
      "This is general guidance for healthy adults. If you have a metabolic condition, are pregnant, or take long-term medication, let a dietitian or doctor tailor the specifics.",
    ],
    illustrationEmojis: ["🥗", "🍗", "💧"],
  },
  "wel-04": {
    whyItMattersVi:
      "Hơi thở là cách duy nhất bạn tác động trực tiếp lên hệ thần kinh tự chủ trong vài giây, ở bất cứ đâu, không tốn gì.",
    whyItMattersEn:
      "Breathing is the only way you can directly influence your autonomic nervous system within seconds, anywhere, at no cost.",
    deepDiveVi: [
      "Nguyên lý chung: hít vào kích hoạt giao cảm, thở ra kích hoạt phó giao cảm. Vì vậy muốn bình tĩnh thì kéo dài pha thở ra, còn muốn tỉnh táo thì kéo dài pha hít vào.",
      "Ba bài đủ cho mọi tình huống là thở 4-6 để hạ căng thẳng, physiological sigh gồm hai lần hít nối tiếp rồi thở ra dài để reset nhanh, và thở hộp 4-4-4-4 để giữ tập trung trước khi trình bày.",
      "Nếu bạn bị hen, bệnh tim mạch, đang mang thai hoặc từng có cơn hoảng loạn, hãy tránh các kỹ thuật nín thở lâu hoặc thở nhanh sâu, và hỏi bác sĩ trước.",
    ],
    deepDiveEn: [
      "The general principle: inhalation activates the sympathetic branch, exhalation the parasympathetic one. To calm down, lengthen the exhale; to sharpen up, lengthen the inhale.",
      "Three drills cover most situations: 4-6 breathing to lower stress, the physiological sigh of two stacked inhales followed by a long exhale for a fast reset, and box breathing 4-4-4-4 to hold focus before presenting.",
      "If you have asthma or a cardiovascular condition, are pregnant, or have a history of panic attacks, avoid long breath holds and rapid deep breathing, and ask a doctor first.",
    ],
    illustrationEmojis: ["🌬️", "🫁", "🧘"],
  },
  "wel-05": {
    whyItMattersVi:
      "Cuộn điện thoại hai giờ không phải là nghỉ. Nếu bạn nghỉ mà vẫn mệt, gần như luôn là vì bạn đang nghỉ sai loại.",
    whyItMattersEn:
      "Two hours of scrolling is not rest. If rest leaves you tired, it is almost always because you are resting in the wrong category.",
    deepDiveVi: [
      "Có nhiều loại nghỉ khác nhau: thể chất, tinh thần, cảm xúc, cảm giác, xã hội, sáng tạo và tĩnh lặng. Người làm việc trí óc thường thiếu nghỉ cảm giác và nghỉ tinh thần, nhưng lại cố bù bằng nghỉ thể chất.",
      "Dấu hiệu bạn đang nghỉ sai loại là cảm giác cạn sau khi nghỉ, khó tập trung dù đã ngủ đủ, và dễ bực với những việc nhỏ.",
      "Cách chẩn đoán rẻ: một tuần cho điểm bảy loại nghỉ mỗi tối, rồi dành chín mươi phút cuối tuần cho loại điểm thấp nhất. Dữ liệu của chính bạn đáng tin hơn mọi lời khuyên chung.",
    ],
    deepDiveEn: [
      "Rest comes in several kinds: physical, mental, emotional, sensory, social, creative and spiritual stillness. Knowledge workers usually lack sensory and mental rest but try to compensate with physical rest.",
      "Signs you are resting in the wrong category: feeling drained after rest, poor focus despite enough sleep, and irritation at small things.",
      "A cheap diagnostic: score all seven kinds nightly for a week, then give ninety weekend minutes to the lowest one. Your own data beats any generic advice.",
    ],
    illustrationEmojis: ["🛌", "🎨", "🔇"],
  },
  "wel-06": {
    whyItMattersVi:
      "Khối cơ là tài sản sức khoẻ giảm dần theo tuổi nếu không được bảo trì. Tập kháng lực là hình thức bảo trì hiệu quả nhất.",
    whyItMattersEn:
      "Muscle is a health asset that depreciates with age unless maintained, and resistance training is the most effective maintenance available.",
    deepDiveVi: [
      "Sau khoảng ba mươi tuổi, khối cơ có xu hướng giảm dần nếu không có tín hiệu tải trọng. Cơ không chỉ là thẩm mỹ: nó liên quan tới độ nhạy insulin, mật độ xương và khả năng độc lập khi lớn tuổi.",
      "Liều lượng tối thiểu có hiệu quả rất khiêm tốn: hai buổi mỗi tuần, mỗi buổi bốn đến sáu động tác đa khớp, hai đến ba set gần mức khó. Tăng tiến từ từ quan trọng hơn khối lượng lớn.",
      "Ưu tiên kỹ thuật trước tải trọng. Người mới nên bắt đầu bằng trọng lượng cơ thể và máy, và nếu có vấn đề khớp hoặc cột sống thì nên tập cùng huấn luyện viên có chứng chỉ hoặc chuyên gia vật lý trị liệu.",
    ],
    deepDiveEn: [
      "After roughly age thirty, muscle mass tends to decline without a loading signal. Muscle is not cosmetic: it relates to insulin sensitivity, bone density and independence in later life.",
      "The minimum effective dose is modest: two sessions a week, four to six multi-joint movements each, two to three sets close to challenging. Gradual progression matters more than large volume.",
      "Put technique before load. Beginners should start with bodyweight and machines, and anyone with joint or spine issues should train with a certified coach or physiotherapist.",
    ],
    illustrationEmojis: ["🏋️", "🦴", "📈"],
  },
  "wel-07": {
    whyItMattersVi:
      "Ánh sáng là tín hiệu thời gian mạnh nhất cho cơ thể. Mười phút ngoài trời buổi sáng chỉnh được cả chu kỳ ngủ và tâm trạng trong ngày.",
    whyItMattersEn:
      "Light is the strongest timing signal your body has. Ten outdoor minutes in the morning can set both your sleep cycle and your daytime mood.",
    deepDiveVi: [
      "Ánh sáng buổi sáng tác động qua các tế bào hạch võng mạc cảm quang, gửi tín hiệu tới nhân trên chéo, nơi điều phối đồng hồ sinh học. Kết quả là melatonin buổi tối xuất hiện đúng giờ hơn.",
      "Cường độ quan trọng hơn thời lượng. Ngoài trời trời râm vẫn mạnh hơn nhiều lần so với đèn trong nhà, nên mười phút ngoài hiên có giá trị hơn một giờ cạnh cửa sổ đóng.",
      "Vế còn lại là buổi tối: giảm ánh sáng mạnh và ánh sáng xanh trong hai giờ trước khi ngủ. Chỉ làm buổi sáng mà bỏ buổi tối thì hiệu quả chỉ còn một nửa.",
    ],
    deepDiveEn: [
      "Morning light works through intrinsically photosensitive retinal ganglion cells that signal the suprachiasmatic nucleus, the master clock. The result is evening melatonin arriving on schedule.",
      "Intensity matters more than duration. Even an overcast outdoor sky is many times brighter than indoor lighting, so ten minutes on a balcony beats an hour beside a closed window.",
      "The other half is the evening: cut bright and blue-heavy light in the two hours before bed. Doing only the morning half gives you roughly half the benefit.",
    ],
    illustrationEmojis: ["☀️", "👁️", "🌃"],
  },
  "wel-08": {
    whyItMattersVi:
      "Đếm calo cả đời là kế hoạch thất bại. Quy tắc 80/20 giữ được kết quả mà không cần biến bữa ăn thành bài toán.",
    whyItMattersEn:
      "Counting calories forever is a failing plan. The 80/20 rule keeps results without turning every meal into arithmetic.",
    deepDiveVi: [
      "Ý tưởng là 80% bữa ăn theo nguyên tắc nền, còn 20% dành cho linh hoạt xã hội và món bạn thích. Phần 20% không phải là thất bại, nó chính là cơ chế giúp phần 80% tồn tại lâu dài.",
      "Thay vì đếm, hãy dùng công cụ thị giác: nửa đĩa rau, một phần tư protein, một phần tư tinh bột, cộng một nguồn chất béo tốt. Cách này chính xác đủ dùng cho mục tiêu sức khoẻ chung.",
      "Nếu bạn có tiền sử rối loạn ăn uống, cách tiếp cận theo tỉ lệ và theo hình ảnh thường an toàn hơn việc theo dõi số liệu, nhưng vẫn nên làm cùng chuyên gia.",
    ],
    deepDiveEn: [
      "The idea is that 80% of meals follow your base principles while 20% covers social flexibility and food you love. The 20% is not failure, it is the mechanism that lets the 80% survive.",
      "Instead of counting, use a visual tool: half the plate vegetables, a quarter protein, a quarter starch, plus a source of good fat. That is accurate enough for general health goals.",
      "If you have a history of disordered eating, ratio-based and visual approaches are usually safer than numeric tracking, but still work with a professional.",
    ],
    illustrationEmojis: ["🍽️", "🎂", "⚖️"],
  },
  "wel-09": {
    whyItMattersVi:
      "Ruột và não trao đổi tín hiệu liên tục. Bữa ăn không giải thích được toàn bộ tâm trạng, nhưng nó là biến số bạn kiểm soát mỗi ngày.",
    whyItMattersEn:
      "Gut and brain exchange signals constantly. Meals do not explain your whole mood, but they are a variable you control daily.",
    deepDiveVi: [
      "Trục não-ruột hoạt động qua dây thần kinh phế vị, hệ miễn dịch và các chất chuyển hoá do vi sinh vật tạo ra. Đây là con đường hai chiều: căng thẳng làm thay đổi tiêu hoá, và tiêu hoá cũng ảnh hưởng ngược lại.",
      "Điều được ủng hộ mạnh nhất trong nghiên cứu hiện nay là ăn đa dạng chất xơ, thêm thực phẩm lên men, ngủ đủ và giảm rượu. Các tuyên bố rằng một chủng men vi sinh cụ thể chữa được lo âu thì vẫn chưa đủ bằng chứng.",
      "Cần nói rõ giới hạn: dinh dưỡng không thay thế điều trị. Nếu bạn có triệu chứng lo âu hoặc trầm cảm kéo dài, hãy tìm hỗ trợ y tế chuyên môn song song với việc cải thiện lối sống.",
    ],
    deepDiveEn: [
      "The brain-gut axis runs through the vagus nerve, the immune system and metabolites produced by microbes. It is bidirectional: stress changes digestion, and digestion feeds back to mood.",
      "What current research supports most strongly is fibre diversity, fermented foods, adequate sleep and less alcohol. Claims that a specific probiotic strain cures anxiety remain insufficiently evidenced.",
      "State the limit clearly: nutrition does not replace treatment. If anxiety or low mood persists, seek professional medical support alongside lifestyle changes.",
    ],
    illustrationEmojis: ["🦠", "🥬", "🧠"],
  },
  "wel-10": {
    whyItMattersVi:
      "Ngồi mười giờ mỗi ngày định hình lại cơ thể bạn. Đau cổ và vai hiếm khi là vấn đề của một buổi, nó là kết quả của một nghìn giờ tư thế lặp lại.",
    whyItMattersEn:
      "Sitting ten hours a day reshapes your body. Neck and shoulder pain is rarely about one session, it is a thousand hours of repeated posture.",
    deepDiveVi: [
      "Mỗi khoảng nghiêng đầu về trước làm tăng đáng kể tải trọng lên cột sống cổ, nên tư thế đầu chúi khi xem điện thoại là nguồn tải lớn nhất trong ngày với nhiều người.",
      "Ba điều chỉnh có tác động nhất là đưa đỉnh màn hình lên ngang mắt, đặt điện thoại lên cao thay vì cúi xuống, và đứng dậy di chuyển vài phút mỗi ba mươi tới bốn mươi lăm phút.",
      "Không có tư thế hoàn hảo, chỉ có tư thế được thay đổi thường xuyên. Thêm hai bài đơn giản mỗi ngày là gập vai và kéo giãn ngực để bù cho thời gian khép vai về trước.",
      "Nếu bạn có đau lan xuống tay, tê hoặc yếu cơ, đó là dấu hiệu cần bác sĩ hoặc chuyên gia vật lý trị liệu, không phải cần tập thêm.",
    ],
    deepDiveEn: [
      "Every degree of forward head tilt meaningfully increases load on the cervical spine, which makes phone-looking posture the single largest daily load for many people.",
      "The three highest-impact adjustments are raising the top of your screen to eye level, lifting the phone instead of bending your neck, and standing up to move for a few minutes every thirty to forty-five minutes.",
      "There is no perfect posture, only posture that changes often. Add two simple daily drills: shoulder retractions and a chest stretch to offset hours of rounded shoulders.",
      "Pain radiating into an arm, numbness or weakness is a signal for a doctor or physiotherapist, not for more exercises.",
    ],
    illustrationEmojis: ["💻", "🦴", "🧍"],
  },
  "wel-11": {
    whyItMattersVi:
      "Lạnh và nóng là những tác nhân gây stress ngắn có kiểm soát. Dùng đúng liều, chúng giúp bạn luyện khả năng bình tĩnh dưới áp lực.",
    whyItMattersEn:
      "Cold and heat are controlled short-term stressors. Used at the right dose, they train your ability to stay calm under pressure.",
    deepDiveVi: [
      "Tiếp xúc lạnh làm tăng noradrenaline và tạo cơ hội luyện phản ứng bình tĩnh trước tín hiệu báo động. Xông nóng thường xuyên được liên hệ với các dấu hiệu tim mạch tốt hơn trong các nghiên cứu dân số ở Phần Lan, tuy đây là dữ liệu quan sát, không phải bằng chứng nhân quả.",
      "Liều lượng thực tế được nhắc tới nhiều là vài phút lạnh mỗi tuần chia thành nhiều lần ngắn, và mười lăm đến hai mươi phút xông nóng vài lần mỗi tuần. Nhiều hơn không tự động tốt hơn.",
      "Đây là phần cần cảnh báo an toàn rõ ràng: không tắm lạnh hoặc xông nóng một mình nếu bạn có bệnh tim, huyết áp không kiểm soát, đang mang thai, hoặc có tiền sử ngất. Không dùng rượu kèm theo, và luôn có người biết bạn đang ở đó.",
      "Nếu mục tiêu của bạn là tăng cơ ngay sau buổi tập kháng lực, hãy để khoảng cách vài giờ trước khi tắm lạnh, vì lạnh ngay sau tập có thể làm giảm tín hiệu thích nghi.",
    ],
    deepDiveEn: [
      "Cold exposure raises noradrenaline and gives you a chance to rehearse a calm response to an alarm signal. Regular sauna use is associated with better cardiovascular markers in Finnish population studies, though that is observational data rather than proof of causation.",
      "Commonly cited practical doses are a few minutes of cold per week split into short exposures, and fifteen to twenty minutes of sauna a few times weekly. More is not automatically better.",
      "This topic needs an explicit safety note: do not plunge or sauna alone if you have heart disease, uncontrolled blood pressure, are pregnant, or have a history of fainting. Never combine with alcohol, and always let someone know where you are.",
      "If your goal is muscle growth right after resistance training, leave a few hours before cold exposure, since immediate cold may blunt the adaptation signal.",
    ],
    illustrationEmojis: ["🧊", "🔥", "⚠️"],
  },
};
