/**
 * Explicit, bilingual foundation guidance for every Business English core lesson.
 * Each lesson separates the rule, the practical sequence and the common mistake.
 */
export interface BusinessTeachingGuide {
  rule: { en: string[]; vi: string[] };
  apply: { en: string[]; vi: string[] };
  watch: { en: string[]; vi: string[] };
}

export const businessEnglishTeachingGuides: Record<string, BusinessTeachingGuide> = {
  "biz-email-1": {
    rule: { en: ["Use this structure: specific subject + purpose in line 1 + detail in line 2 + next action + professional close."], vi: ["Dùng cấu trúc: tiêu đề cụ thể + mục đích ở dòng 1 + chi tiết ở dòng 2 + bước tiếp theo + lời kết chuyên nghiệp."] },
    apply: { en: ["1. Write the subject as topic plus required action.", "2. State why you are writing before adding detail.", "3. End with who should do what by when. Example: Q3 report - review needed by Friday."], vi: ["1. Viết tiêu đề theo mẫu chủ đề cộng việc cần xử lý.", "2. Nêu lý do viết trước khi thêm chi tiết.", "3. Kết bằng ai cần làm gì và trước khi nào. Ví dụ: Q3 report - review needed by Friday."] },
    watch: { en: ["Do not use a vague subject such as Hello or Some questions. Use the recipient's name when you know it, and do not begin a first business email with How are you?"], vi: ["Không dùng tiêu đề mơ hồ như Hello hoặc Some questions. Hãy gọi đúng tên người nhận khi đã biết và không mở email công việc đầu tiên bằng How are you?"] },
  },
  "biz-email-2": {
    rule: { en: ["A complete request contains three elements in one clear sentence: polite modal + exact action and deadline + business reason."], vi: ["Một lời đề nghị đầy đủ có ba thành phần trong một câu rõ ràng: modal lịch sự + hành động và thời hạn chính xác + lý do công việc."] },
    apply: { en: ["1. Choose the level: Can you for familiar colleagues, Could you for neutral requests, or I would appreciate it if for formal requests.", "2. Name the deliverable and time.", "3. Add so that or because to explain the need."], vi: ["1. Chọn mức độ: Can you với đồng nghiệp thân, Could you cho yêu cầu trung tính, hoặc I would appreciate it if cho yêu cầu trang trọng.", "2. Nêu sản phẩm cần giao và thời gian.", "3. Thêm so that hoặc because để giải thích lý do."] },
    watch: { en: ["Could you send the forecast by 15:00 so I can update the board deck? is clearer than Send it today. Do not soften so much that the action or deadline disappears."], vi: ["Could you send the forecast by 15:00 so I can update the board deck? rõ hơn Send it today. Không làm mềm đến mức mất việc cần làm hoặc thời hạn."] },
  },
  "biz-email-3": {
    rule: { en: ["Use four moves for bad news: one sincere apology + brief neutral cause + corrective action + new measurable commitment."], vi: ["Dùng bốn bước khi báo tin không thuận lợi: một lời xin lỗi chân thành + nguyên nhân ngắn gọn, trung tính + biện pháp khắc phục + cam kết mới đo được."] },
    apply: { en: ["1. Name the exact problem and its impact.", "2. Explain without blaming a person or team.", "3. Give the fix and a date: We moved the order to air freight; it will arrive by 12 June."], vi: ["1. Nêu chính xác vấn đề và tác động.", "2. Giải thích nhưng không đổ lỗi cho cá nhân hoặc nhóm.", "3. Nêu cách xử lý và ngày mới: Chúng tôi chuyển đơn sang đường hàng không; hàng sẽ đến trước 12 tháng 6."] },
    watch: { en: ["Do not write It is not my fault or repeat sorry several times. A customer needs ownership, a remedy and a reliable update time."], vi: ["Không viết It is not my fault hoặc lặp lại sorry nhiều lần. Khách hàng cần người nhận trách nhiệm, cách khắc phục và thời điểm cập nhật đáng tin cậy."] },
  },
  "biz-email-4": {
    rule: { en: ["A follow-up repeats only the context, one outstanding action and its deadline, while keeping the original email thread."], vi: ["Email nhắc việc chỉ lặp lại ngữ cảnh, một việc còn tồn và thời hạn của việc đó, đồng thời giữ nguyên chuỗi email cũ."] },
    apply: { en: ["1. Open neutrally with Just following up on my email of [date].", "2. Restate the action and deadline.", "3. Offer redirection if another person now owns the task."], vi: ["1. Mở đầu trung tính bằng Just following up on my email of [ngày].", "2. Nhắc lại việc cần làm và thời hạn.", "3. Cho phép người nhận chỉ sang đúng người nếu việc đã chuyển phụ trách."] },
    watch: { en: ["Use factual urgency such as We risk missing Friday's print deadline. Avoid sarcasm, blame and long copies of the original request."], vi: ["Dùng mức cấp thiết dựa trên dữ kiện như Chúng ta có nguy cơ lỡ hạn in thứ Sáu. Tránh châm chọc, đổ lỗi và chép lại toàn bộ yêu cầu cũ."] },
  },
  "biz-meet-1": {
    rule: { en: ["Chair a meeting through a fixed cycle: purpose + agenda and time + named turns + action recap with owner and deadline."], vi: ["Điều phối cuộc họp theo chu trình cố định: mục tiêu + chương trình và thời lượng + gọi tên từng lượt + chốt việc với người phụ trách và thời hạn."] },
    apply: { en: ["1. Open: The goal today is to agree the launch date.", "2. Control the discussion: Hanh, please start with the numbers; let us park pricing until the end.", "3. Close: Nam sends the forecast by Thursday 16:00."], vi: ["1. Mở họp: Mục tiêu hôm nay là chốt ngày ra mắt.", "2. Điều phối: Hạnh trình bày số liệu trước; ta tạm gác phần giá đến cuối.", "3. Chốt: Nam gửi dự báo trước 16:00 thứ Năm."] },
    watch: { en: ["An agenda alone is not an outcome. Never close with vague actions such as Someone should check this; every action needs one owner and one date."], vi: ["Chương trình họp chưa phải là kết quả. Không chốt bằng việc mơ hồ như Ai đó nên kiểm tra; mỗi việc cần đúng một người phụ trách và một thời hạn."] },
  },
  "biz-meet-2": {
    rule: { en: ["Make a contribution in three moves: viewpoint + relevant evidence + invitation for another function to respond."], vi: ["Nêu ý kiến theo ba bước: quan điểm + bằng chứng liên quan + mời một bộ phận khác phản hồi."] },
    apply: { en: ["1. Signal the lens: From a cost perspective...", "2. Support the claim with a number, source or recent example.", "3. Hand over: How does that look from the product side?"], vi: ["1. Báo hiệu góc nhìn: From a cost perspective...", "2. Chứng minh nhận định bằng số liệu, nguồn hoặc ví dụ gần đây.", "3. Chuyển lượt: Phía sản phẩm nhìn nhận việc này thế nào?"] },
    watch: { en: ["Use The data suggests when evidence is incomplete. Do not present an assumption as a fact or repeat I think without giving support."], vi: ["Dùng The data suggests khi bằng chứng chưa đầy đủ. Không trình bày giả định như sự thật hoặc lặp I think mà không đưa dẫn chứng."] },
  },
  "biz-meet-3": {
    rule: { en: ["Disagree with the idea, not the person: acknowledge the valid point + state the concern + give a reason or alternative."], vi: ["Phản biện ý tưởng, không công kích con người: ghi nhận điểm hợp lý + nêu lo ngại + đưa lý do hoặc phương án khác."] },
    apply: { en: ["1. Acknowledge: I see your point about speed.", "2. Qualify: However, I am concerned about support capacity.", "3. Propose: Could we keep three test days instead?"], vi: ["1. Ghi nhận: Tôi hiểu ý về tốc độ.", "2. Nêu giới hạn: Tuy nhiên, tôi lo về năng lực hỗ trợ.", "3. Đề xuất: Ta có thể giữ ba ngày kiểm thử không?"] },
    watch: { en: ["I disagree, You are wrong and That makes no sense close the discussion. Partial agreement is often more accurate than total agreement or rejection."], vi: ["I disagree, You are wrong và That makes no sense làm cuộc trao đổi bế tắc. Đồng ý một phần thường chính xác hơn đồng ý hoặc bác bỏ hoàn toàn."] },
  },
  "biz-meet-4": {
    rule: { en: ["End every meeting with decision + action items in owner-verb-object-deadline form + confirmation + location of the minutes."], vi: ["Kết mỗi cuộc họp bằng quyết định + việc cần làm theo mẫu người phụ trách-động từ-đối tượng-thời hạn + xác nhận + nơi gửi biên bản."] },
    apply: { en: ["1. Read back the exact decision.", "2. Assign each deliverable to one owner with a date and time.", "3. Ask Does that match everyone's notes? and state when minutes will be circulated."], vi: ["1. Đọc lại quyết định chính xác.", "2. Giao mỗi sản phẩm cho một người với ngày và giờ cụ thể.", "3. Hỏi Nội dung này có khớp ghi chú của mọi người không? và nói khi nào sẽ gửi biên bản."] },
    watch: { en: ["We should probably do this soon is not an action item. Avoid shared ownership without a lead person and avoid deadlines such as ASAP."], vi: ["We should probably do this soon không phải việc được giao rõ ràng. Tránh giao chung mà không có người chính và tránh thời hạn như ASAP."] },
  },
  "biz-pres-1": {
    rule: { en: ["Structure a business presentation as attention + purpose + roadmap, then use signposts and finish with one recommendation."], vi: ["Cấu trúc bài thuyết trình theo trình tự thu hút + mục đích + lộ trình, sau đó dùng câu chuyển ý và kết bằng một đề xuất."] },
    apply: { en: ["1. Open with the business fact or problem.", "2. Tell listeners what you will cover and when questions are taken.", "3. Move between sections with signposts and close on the required decision."], vi: ["1. Mở bằng dữ kiện hoặc vấn đề kinh doanh.", "2. Cho người nghe biết các phần sẽ trình bày và thời điểm hỏi đáp.", "3. Dùng câu dẫn khi chuyển phần và kết bằng quyết định cần có."] },
    watch: { en: ["Ten minutes supports about three main ideas, not thirty slides. Rehearse the first and final sentences so the message starts and ends decisively."], vi: ["Mười phút phù hợp với khoảng ba ý chính, không phải ba mươi slide. Hãy luyện kỹ câu đầu và câu cuối để thông điệp mở và kết dứt khoát."] },
  },
  "biz-pres-2": {
    rule: { en: ["Describe data in this order: chart scope + overall trend + selected key figures + business meaning."], vi: ["Mô tả số liệu theo thứ tự: phạm vi biểu đồ + xu hướng chung + số liệu chính được chọn + ý nghĩa kinh doanh."] },
    apply: { en: ["1. Name the measure, period and unit.", "2. Summarise the pattern before individual numbers.", "3. Compare only the figures that support the conclusion: Revenue peaked at 2.4 billion in August."], vi: ["1. Nêu chỉ số, thời kỳ và đơn vị.", "2. Tóm tắt xu hướng trước khi đọc từng con số.", "3. Chỉ so sánh số liệu phục vụ kết luận: Doanh thu đạt đỉnh 2,4 tỷ vào tháng Tám."] },
    watch: { en: ["Increase by 5% means the amount of change; increase to 5% means the final level. Do not list every point or confuse correlation with cause."], vi: ["Increase by 5% là mức thay đổi; increase to 5% là mức cuối cùng. Không đọc mọi điểm dữ liệu hoặc nhầm tương quan với nguyên nhân."] },
  },
  "biz-pres-3": {
    rule: { en: ["Handle a question through listen + restate + direct answer + one supporting fact + confirmation."], vi: ["Xử lý câu hỏi theo chuỗi nghe + diễn đạt lại + trả lời trực tiếp + một dẫn chứng + xác nhận."] },
    apply: { en: ["1. Restate the question to confirm its meaning.", "2. Answer the central point in one sentence and add evidence.", "3. Ask Does that answer your question? or promise a specific follow-up time if data is unavailable."], vi: ["1. Diễn đạt lại câu hỏi để xác nhận đã hiểu.", "2. Trả lời trọng tâm trong một câu rồi thêm dẫn chứng.", "3. Hỏi Câu trả lời đã đủ chưa? hoặc hẹn thời điểm phản hồi cụ thể nếu chưa có số liệu."] },
    watch: { en: ["Never invent a figure. With a hostile objection, acknowledge the underlying concern without accepting a personal attack."], vi: ["Không bao giờ bịa số liệu. Với phản biện căng thẳng, hãy ghi nhận mối lo cốt lõi nhưng không chấp nhận công kích cá nhân."] },
  },
  "biz-pres-4": {
    rule: { en: ["A strong close states one recommendation + quantified benefit + consequence of acting or waiting + exact decision needed."], vi: ["Phần kết mạnh nêu một đề xuất + lợi ích định lượng + hệ quả của hành động hoặc trì hoãn + quyết định chính xác cần có."] },
    apply: { en: ["1. Restate the problem in one line.", "2. Recommend one action and connect it to value.", "3. Make the ask explicit: approval of 50 million dong today, then pause for a response."], vi: ["1. Nhắc lại vấn đề trong một dòng.", "2. Đề xuất một hành động và gắn với giá trị.", "3. Nêu yêu cầu thật cụ thể: phê duyệt 50 triệu đồng hôm nay, rồi dừng để nhận phản hồi."] },
    watch: { en: ["That is all, thank you does not drive a decision. Do not introduce a new argument in the close or hide the requested action."], vi: ["That is all, thank you không dẫn tới quyết định. Không đưa lập luận mới ở phần kết hoặc che mờ hành động cần người nghe thực hiện."] },
  },
  "biz-call-1": {
    rule: { en: ["Open a business call with identity + organisation + requested person + purpose, all within the first two sentences."], vi: ["Mở cuộc gọi công việc bằng danh tính + tổ chức + người cần gặp + mục đích, tất cả trong hai câu đầu."] },
    apply: { en: ["1. Say This is [name] from [company].", "2. Ask for the person and briefly state the topic.", "3. If unavailable, leave a complete message or agree an exact callback time."], vi: ["1. Nói This is [tên] from [công ty].", "2. Xin gặp đúng người và nêu ngắn gọn chủ đề.", "3. Nếu họ vắng mặt, để lại lời nhắn đầy đủ hoặc chốt giờ gọi lại chính xác."] },
    watch: { en: ["Do not leave only your name. A useful message includes caller, company, reason, callback number and preferred response time."], vi: ["Không chỉ để lại tên. Lời nhắn hữu ích phải có người gọi, công ty, lý do, số gọi lại và thời điểm mong muốn phản hồi."] },
  },
  "biz-call-2": {
    rule: { en: ["In an online meeting, make turns explicit and describe a technical problem together with the fix in one calm sentence."], vi: ["Trong họp trực tuyến, hãy phân lượt rõ ràng và nêu sự cố kỹ thuật cùng cách xử lý trong một câu bình tĩnh."] },
    apply: { en: ["1. Name speakers in order: Hanh first, then Nam.", "2. State the observable issue: You are breaking up.", "3. Propose the smallest fix: Please turn off video; I will share the link in chat."], vi: ["1. Gọi tên người nói theo thứ tự: Hạnh trước, sau đó Nam.", "2. Nêu hiện tượng quan sát được: Tiếng của bạn đang ngắt quãng.", "3. Đề xuất cách xử lý nhỏ nhất: Hãy tắt video; tôi sẽ gửi liên kết trong ô chat."] },
    watch: { en: ["Do not express frustration or let everyone talk at once. Ask permission before recording and confirm that important links are accessible."], vi: ["Không bộc lộ bực bội hoặc để mọi người nói cùng lúc. Hãy xin phép trước khi ghi hình và xác nhận các liên kết quan trọng đều truy cập được."] },
  },
  "biz-call-3": {
    rule: { en: ["Use brief, safe and specific small talk to build rapport, then signal clearly when the business discussion begins."], vi: ["Dùng chuyện xã giao ngắn, an toàn và cụ thể để tạo thiện cảm, sau đó báo hiệu rõ khi bắt đầu phần công việc."] },
    apply: { en: ["1. Ask an open question about travel, the venue or shared industry context.", "2. Listen and ask one relevant follow-up.", "3. Transition after about two minutes: Shall we make a start?"], vi: ["1. Hỏi câu mở về chuyến đi, địa điểm hoặc bối cảnh ngành chung.", "2. Lắng nghe và hỏi tiếp một câu liên quan.", "3. Chuyển sang công việc sau khoảng hai phút: Shall we make a start?"] },
    watch: { en: ["With a new contact, avoid salary, politics, religion, age and marital status. Do not turn small talk into a long personal interview."], vi: ["Với người mới gặp, tránh lương, chính trị, tôn giáo, tuổi và tình trạng hôn nhân. Không biến chuyện xã giao thành cuộc hỏi đời tư kéo dài."] },
  },
  "biz-call-4": {
    rule: { en: ["Arrange appointments with two concrete options, one confirmed choice and an explicit time zone."], vi: ["Sắp lịch bằng hai lựa chọn cụ thể, một lựa chọn được xác nhận và múi giờ được nêu rõ."] },
    apply: { en: ["1. Offer two dates and times rather than asking when someone is free.", "2. Repeat the selected time in both relevant time zones.", "3. Send a written invitation with duration, link and agenda immediately after the call."], vi: ["1. Đưa hai ngày giờ thay vì hỏi người kia rảnh khi nào.", "2. Nhắc lại giờ đã chọn theo cả hai múi giờ liên quan.", "3. Gửi lịch mời bằng văn bản có thời lượng, liên kết và chương trình ngay sau cuộc gọi."] },
    watch: { en: ["When rescheduling, apologise, give a brief reason and offer a replacement in the same message. Tentative is not confirmed."], vi: ["Khi đổi lịch, hãy xin lỗi, nêu lý do ngắn và đề xuất lịch thay thế trong cùng tin nhắn. Tentative nghĩa là chưa được xác nhận."] },
  },
  "biz-nego-1": {
    rule: { en: ["A complete quotation defines scope + unit and total price + inclusions and exclusions + terms + validity period."], vi: ["Báo giá đầy đủ xác định phạm vi + đơn giá và tổng giá + khoản bao gồm và không bao gồm + điều kiện + thời hạn hiệu lực."] },
    apply: { en: ["1. Itemise the product, quantity and delivery location.", "2. State currency, VAT, shipping, deposit and lead time explicitly.", "3. End with This quotation is valid for 14 days and invite clarification."], vi: ["1. Liệt kê sản phẩm, số lượng và địa điểm giao.", "2. Nêu rõ tiền tệ, VAT, vận chuyển, đặt cọc và thời gian giao hàng.", "3. Kết bằng Báo giá có hiệu lực 14 ngày và mời khách yêu cầu làm rõ."] },
    watch: { en: ["Never leave tax, shipping or scope implied. Check that unit price multiplied by quantity matches the stated total."], vi: ["Không để thuế, vận chuyển hoặc phạm vi ở trạng thái ngầm hiểu. Kiểm tra đơn giá nhân số lượng phải khớp tổng giá đã nêu."] },
  },
  "biz-nego-2": {
    rule: { en: ["Trade every concession conditionally: If they give X, we can give Y. Prepare the limit before negotiation begins."], vi: ["Đánh đổi mọi nhượng bộ bằng điều kiện: Nếu họ cho X, ta có thể cho Y. Xác định giới hạn trước khi đàm phán."] },
    apply: { en: ["1. Identify your interest and walk-away point.", "2. Ask what the other side values besides price.", "3. Link movement: If you order 500 units, we can reduce the price by 5%."], vi: ["1. Xác định lợi ích và ngưỡng rút lui của mình.", "2. Hỏi bên kia coi trọng điều gì ngoài giá.", "3. Gắn hai nhượng bộ: Nếu đặt 500 sản phẩm, chúng tôi có thể giảm giá 5%."] },
    watch: { en: ["Do not give an unconditional discount or call an offer final unless it truly is. Positions are demands; interests explain why those demands matter."], vi: ["Không giảm giá vô điều kiện hoặc gọi một đề nghị là cuối cùng khi chưa đúng. Lập trường là yêu cầu; lợi ích giải thích vì sao yêu cầu đó quan trọng."] },
  },
  "biz-nego-3": {
    rule: { en: ["A professional complaint uses verifiable facts + business impact + one specific remedy; the reply uses ownership + action + timing."], vi: ["Khiếu nại chuyên nghiệp dùng dữ kiện kiểm chứng được + tác động kinh doanh + một cách xử lý cụ thể; phản hồi cần nhận trách nhiệm + hành động + thời gian."] },
    apply: { en: ["1. Record order number, promised date and actual condition.", "2. Quantify the impact and request replacement, refund or credit.", "3. In the reply, acknowledge the issue and state the next update time."], vi: ["1. Ghi số đơn, ngày đã hứa và tình trạng thực tế.", "2. Định lượng tác động và yêu cầu đổi hàng, hoàn tiền hoặc ghi có.", "3. Khi phản hồi, xác nhận vấn đề và nêu thời điểm cập nhật tiếp theo."] },
    watch: { en: ["Do not argue about fault in the first reply or promise a remedy you cannot deliver. Separate immediate recovery from later root-cause analysis."], vi: ["Không tranh luận lỗi thuộc về ai trong phản hồi đầu hoặc hứa cách xử lý không thể thực hiện. Tách việc khắc phục ngay khỏi phân tích nguyên nhân gốc sau đó."] },
  },
  "biz-nego-4": {
    rule: { en: ["Read contract modals literally: shall creates an obligation, may grants a right, and subject to or provided that creates a condition."], vi: ["Đọc động từ tình thái trong hợp đồng theo nghĩa chính xác: shall tạo nghĩa vụ, may trao quyền, còn subject to hoặc provided that tạo điều kiện."] },
    apply: { en: ["1. Identify the party responsible in each clause.", "2. Mark the action, deadline, condition and consequence.", "3. Paraphrase the clause in plain language and request written clarification before signing if meaning remains uncertain."], vi: ["1. Xác định bên chịu trách nhiệm trong từng điều khoản.", "2. Đánh dấu hành động, thời hạn, điều kiện và hệ quả.", "3. Diễn giải bằng lời đơn giản và yêu cầu làm rõ bằng văn bản trước khi ký nếu còn chưa chắc."] },
    watch: { en: ["Do not treat shall and may as interchangeable. Contract language has legal consequences, so this lesson supports language understanding rather than replacing legal advice."], vi: ["Không coi shall và may là tương đương. Ngôn ngữ hợp đồng có hệ quả pháp lý, vì vậy bài này hỗ trợ hiểu ngôn ngữ chứ không thay thế tư vấn pháp lý."] },
  },
  "biz-career-1": {
    rule: { en: ["Write each CV achievement as past-tense action verb + task or scope + measurable result + business outcome."], vi: ["Viết mỗi thành tích CV theo mẫu động từ hành động quá khứ + nhiệm vụ hoặc phạm vi + kết quả đo được + tác động kinh doanh."] },
    apply: { en: ["1. Replace Responsible for with Led, launched, reduced or streamlined.", "2. Add scale, time, percentage or money.", "3. Connect the number to value: Grew followers to 22,000, increasing enquiries by 35%."], vi: ["1. Thay Responsible for bằng Led, launched, reduced hoặc streamlined.", "2. Thêm quy mô, thời gian, tỷ lệ hoặc tiền.", "3. Gắn số liệu với giá trị: Tăng người theo dõi lên 22.000, giúp lượt hỏi tăng 35%."] },
    watch: { en: ["Do not list duties without results or invent metrics. Keep tense and formatting consistent, and tailor the top third to the role's genuine keywords."], vi: ["Không chỉ liệt kê nhiệm vụ hoặc bịa số liệu. Giữ thời động từ và định dạng nhất quán, đồng thời điều chỉnh phần đầu theo từ khóa thực sự của vị trí."] },
  },
  "biz-career-2": {
    rule: { en: ["Use three short paragraphs: why this role and company + why you with two proof points + availability and interview request."], vi: ["Dùng ba đoạn ngắn: vì sao chọn vị trí và công ty + vì sao bạn phù hợp với hai bằng chứng + thời gian có thể bắt đầu và đề nghị phỏng vấn."] },
    apply: { en: ["1. Name the role and one company-specific reason.", "2. Match two quantified achievements to two job requirements.", "3. State notice period or availability and ask for a conversation."], vi: ["1. Nêu vị trí và một lý do riêng gắn với công ty.", "2. Ghép hai thành tích có số liệu với hai yêu cầu tuyển dụng.", "3. Nêu thời gian báo trước hoặc ngày có thể bắt đầu và đề nghị trao đổi."] },
    watch: { en: ["Avoid generic claims such as hard-working team player and do not repeat the CV. Keep the letter under 250 words and address a named person where possible."], vi: ["Tránh lời tự nhận chung chung như hard-working team player và không chép lại CV. Giữ thư dưới 250 từ và gửi đúng tên người phụ trách khi có thể."] },
  },
  "biz-career-3": {
    rule: { en: ["Answer behavioural questions with STAR: Situation gives brief context, Task names your responsibility, Action shows your decisions, Result proves impact and learning."], vi: ["Trả lời câu hỏi hành vi bằng STAR: Situation nêu bối cảnh ngắn, Task nêu trách nhiệm, Action cho thấy quyết định của bạn, Result chứng minh tác động và bài học."] },
    apply: { en: ["1. Give Situation and Task in about two sentences.", "2. Spend most time on two or three actions using I.", "3. Finish with a measurable result and what you changed afterwards; target 60 to 90 seconds."], vi: ["1. Nêu Situation và Task trong khoảng hai câu.", "2. Dành phần lớn thời gian cho hai hoặc ba hành động, dùng I.", "3. Kết bằng kết quả đo được và điều bạn thay đổi sau đó; mục tiêu 60 đến 90 giây."] },
    watch: { en: ["Do not spend the whole answer on background or say we when the interviewer needs your contribution. Never invent a result; explain qualitative evidence if no metric exists."], vi: ["Không dành toàn bộ câu trả lời cho bối cảnh hoặc dùng we khi nhà tuyển dụng cần biết đóng góp của bạn. Không bịa kết quả; nếu không có số liệu, hãy nêu bằng chứng định tính."] },
  },
  "biz-career-4": {
    rule: { en: ["A professional introduction states what you do + whom you help + the result you create, in one memorable sentence."], vi: ["Lời giới thiệu nghề nghiệp nêu bạn làm gì + giúp ai + tạo ra kết quả gì, trong một câu dễ nhớ."] },
    apply: { en: ["1. Build a 20-second value statement: I help EdTech teams turn learner data into product decisions.", "2. Add one shared context when connecting online.", "3. Make a small, specific request and follow up within 48 hours."], vi: ["1. Tạo câu giá trị 20 giây: Tôi giúp các nhóm EdTech biến dữ liệu học viên thành quyết định sản phẩm.", "2. Thêm một ngữ cảnh chung khi kết nối trực tuyến.", "3. Đưa đề nghị nhỏ, cụ thể và liên hệ lại trong 48 giờ."] },
    watch: { en: ["Do not send an empty connection request or immediately ask a new contact for a job. Networking begins with relevance and a manageable next step."], vi: ["Không gửi lời mời kết nối trống hoặc vừa gặp đã xin việc. Kết nối nghề nghiệp bắt đầu bằng sự liên quan và một bước tiếp theo vừa phải."] },
  },
};