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
};
