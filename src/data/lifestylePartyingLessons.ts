/**
 * @file lifestylePartyingLessons.ts
 * @description Sixth pillar of the Lifestyle Academy: Parties & Events.
 *              15 bilingual lessons across foundation / intermediate / mastery,
 *              covering planning, hosting, social conversation, networking and
 *              formal dining etiquette, each with a framework, drill, reflection,
 *              "why it matters" context, deep dive and a safety note.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

import type { LifestyleLesson } from "./lifestyleAcademyLessons";

export const LIFESTYLE_PARTYING_LESSONS: LifestyleLesson[] = [
  // ── FOUNDATION ───────────────────────────────────────────
  {
    id: "pty-01",
    pillar: "partying",
    level: "foundation",
    minutes: 8,
    medium: "read",
    titleVi: "Lên kế hoạch một buổi tiệc từ con số không",
    titleEn: "Planning a Party From Zero",
    subtitleVi:
      "Bốn quyết định đầu tiên quyết định 80% chất lượng buổi tiệc: mục đích, ngày, địa điểm, số khách.",
    subtitleEn:
      "Four early decisions drive 80% of a party's quality: purpose, date, venue, headcount.",
    takeaways: [
      { vi: "Viết một câu mục đích trước khi làm bất cứ việc gì: 'Buổi tiệc này thành công nếu khách cảm thấy ...'.",
        en: "Write one purpose sentence before anything else: 'This party works if guests feel ...'." },
      { vi: "Chốt bốn trụ cột theo thứ tự: mục đích, ngày giờ, địa điểm, số khách. Mọi thứ khác phụ thuộc vào chúng.",
        en: "Lock the four pillars in order: purpose, date and time, venue, headcount. Everything else depends on them." },
      { vi: "Số khách quyết định địa điểm và ngân sách, nên hãy ước lượng thực tế rồi cộng thêm 10% dự phòng.",
        en: "Headcount drives venue and budget, so estimate honestly then add a 10% buffer." },
      { vi: "Lùi ngược từ ngày tiệc: 3 tuần gửi lời mời, 1 tuần chốt số khách, 1 ngày kiểm tra lần cuối.",
        en: "Work backwards from the date: invite at 3 weeks, confirm numbers at 1 week, final check 1 day before." },
    ],
    frameworkVi:
      "Khung 4 Trụ Cột: Mục đích, Ngày giờ, Địa điểm, Số khách. Chốt xong bốn ô này thì mọi lựa chọn còn lại trở nên dễ dàng.",
    frameworkEn:
      "The 4-Pillar Frame: Purpose, Date, Venue, Headcount. Once those four boxes are filled, every other choice becomes easy.",
    reflectionVi:
      "Buổi tiệc gần nhất bạn tham gia mà thấy vui thật sự: điều gì tạo ra cảm giác đó, không gian hay con người?",
    reflectionEn:
      "Think of the last party you genuinely enjoyed: what created that feeling, the space or the people?",
    drillVi:
      "Chọn một dịp thật trong 3 tháng tới. Viết ra giấy đúng bốn dòng: mục đích, ngày giờ, địa điểm, số khách dự kiến.",
    drillEn:
      "Pick a real occasion in the next 3 months. Write exactly four lines: purpose, date and time, venue, expected headcount.",
    whyItMattersVi:
      "Phần lớn buổi tiệc thất bại không vì thiếu tiền mà vì thiếu quyết định sớm, khiến mọi việc dồn vào 24 giờ cuối.",
    whyItMattersEn:
      "Most parties fail not from lack of money but from late decisions that push all the work into the final 24 hours.",
    deepDiveVi: [
      "Một buổi tiệc là một sản phẩm nhỏ có thời hạn cứng. Khi bạn viết ra câu mục đích, bạn tự động có tiêu chí để nói không: nếu mục đích là 'để bạn cũ có không gian nói chuyện', thì nhạc lớn và trò chơi ồn ào là lựa chọn sai, dù nghe hấp dẫn.",
      "Hãy dùng một tờ giấy duy nhất cho toàn bộ kế hoạch. Bốn trụ cột ở trên, danh sách việc ở dưới, mỗi việc có tên người phụ trách. Bản kế hoạch một trang dễ cập nhật và dễ chia sẻ hơn mười tin nhắn rải rác trong nhóm chat.",
    ],
    deepDiveEn: [
      "A party is a small product with a hard deadline. Writing the purpose sentence gives you a way to say no: if the purpose is 'give old friends room to talk', then loud music and noisy games are the wrong call, however fun they sound.",
      "Keep the whole plan on one page. Four pillars at the top, tasks below, each task with an owner. A one-page plan is easier to update and share than ten scattered messages in a group chat.",
    ],
    illustrationEmojis: ["📋", "📅", "📍", "🎈"],
    safetyNotesVi:
      "Kiểm tra giới hạn số người và quy định về tiếng ồn của địa điểm trước khi gửi lời mời.",
    safetyNotesEn:
      "Check the venue's capacity limit and noise rules before you send any invitations.",
  },
  {
    id: "pty-02",
    pillar: "partying",
    level: "foundation",
    minutes: 7,
    medium: "read",
    titleVi: "Lời mời và RSVP - Trả lời sao cho lịch sự",
    titleEn: "Invitations and RSVP - Replying Politely",
    subtitleVi:
      "Cách đọc một lời mời, trả lời đúng hạn, và từ chối mà vẫn giữ được quan hệ.",
    subtitleEn:
      "How to read an invitation, reply on time, and decline without damaging the relationship.",
    takeaways: [
      { vi: "RSVP nghĩa là chủ tiệc cần con số chính xác. Trả lời trong 48 giờ là chuẩn mực lịch sự.",
        en: "RSVP means the host needs an exact number. Replying within 48 hours is the polite standard." },
      { vi: "Đọc kỹ ba thông tin: giờ bắt đầu, mã trang phục, và có được dẫn theo người khác hay không.",
        en: "Read three details carefully: start time, dress code, and whether you may bring a guest." },
      { vi: "Từ chối theo công thức: cảm ơn, nói không rõ ràng, chúc mừng dịp đó. Không cần bịa lý do dài.",
        en: "Decline with a formula: thank them, say no clearly, wish the occasion well. No long invented excuse needed." },
      { vi: "Đã nhận lời thì hãy đến. Hủy sát giờ khiến chủ tiệc mất tiền và mất chỗ đã giữ.",
        en: "If you accept, show up. A last-minute cancellation costs the host money and a reserved seat." },
    ],
    frameworkVi:
      "Công thức trả lời ba bước: Cảm ơn, Trả lời rõ ràng, Nói thêm một câu ấm áp.",
    frameworkEn:
      "The three-step reply: Thank, Answer clearly, Add one warm line.",
    reflectionVi:
      "Bạn có thói quen để lời mời 'treo' vài ngày chưa trả lời không, và điều đó khiến người mời cảm thấy thế nào?",
    reflectionEn:
      "Do you tend to leave invitations unanswered for days, and how does that leave the host feeling?",
    drillVi:
      "Viết sẵn hai mẫu tin nhắn ngắn trong ghi chú điện thoại: một mẫu nhận lời, một mẫu từ chối lịch sự.",
    drillEn:
      "Save two short message templates in your phone notes: one to accept, one to decline politely.",
    whyItMattersVi:
      "Chủ tiệc phải đặt món, thuê chỗ và xếp bàn dựa trên câu trả lời của bạn, nên sự im lặng là một chi phí thật.",
    whyItMattersEn:
      "Hosts order food, book space and seat tables based on your answer, so silence has a real cost.",
    deepDiveVi: [
      "Lời mời là một câu hỏi có hạn chót ngầm. Khi bạn trả lời sớm, bạn tặng chủ tiệc thứ quý nhất là sự chắc chắn. Khi bạn im lặng, họ phải đoán, và đoán sai luôn dẫn tới thừa thức ăn hoặc thiếu ghế.",
      "Từ chối không phải là điều thô lỗ; thô lỗ là để người khác chờ. Một câu 'Cảm ơn bạn đã nghĩ tới mình, lần này mình không tham gia được, chúc buổi tiệc thật vui' là đủ lịch sự trong hầu hết mọi hoàn cảnh.",
    ],
    deepDiveEn: [
      "An invitation is a question with an implied deadline. Replying early gives the host the most valuable thing you have: certainty. Staying silent forces them to guess, and guesses end in wasted food or missing chairs.",
      "Declining is not rude; leaving someone waiting is. 'Thank you for thinking of me, I can't make it this time, I hope it's a wonderful evening' is polite enough for almost every situation.",
    ],
    illustrationEmojis: ["✉️", "✅", "🙏", "📮"],
    safetyNotesVi:
      "Không chia sẻ địa chỉ hoặc lời mời riêng tư của người khác lên mạng xã hội.",
    safetyNotesEn:
      "Never post someone else's private address or invitation on social media.",
  },
  {
    id: "pty-03",
    pillar: "partying",
    level: "foundation",
    minutes: 8,
    medium: "read",
    titleVi: "Danh sách khách và sơ đồ chỗ ngồi",
    titleEn: "Guest Lists and Seating Plans",
    subtitleVi:
      "Chọn ai, ngồi cạnh ai: hai quyết định âm thầm tạo nên không khí của cả buổi tiệc.",
    subtitleEn:
      "Who you invite and who sits together: two quiet decisions that shape the whole mood.",
    takeaways: [
      { vi: "Chia khách thành ba nhóm: nhóm cốt lõi, nhóm mở rộng, nhóm nếu còn chỗ. Mời theo thứ tự này.",
        en: "Split guests into three tiers: core, extended, and if-space-allows. Invite in that order." },
      { vi: "Mỗi bàn nên có ít nhất một người dễ bắt chuyện để cuộc trò chuyện không bị tắt.",
        en: "Seat at least one easy talker at every table so conversation never dies." },
      { vi: "Đừng để một người ngồi giữa toàn người lạ mà không có điểm chung nào.",
        en: "Never seat someone among strangers with no shared ground at all." },
      { vi: "Tách những cặp có xung đột đã biết, nhưng đừng để họ ở hai đầu đối diện gây chú ý.",
        en: "Separate known conflicts, but not so dramatically that everyone notices." },
    ],
    frameworkVi:
      "Quy tắc 3 Vòng: vòng cốt lõi, vòng mở rộng, vòng dự phòng, kết hợp nguyên tắc 'mỗi bàn một người kết nối'.",
    frameworkEn:
      "The 3-Ring Rule: core ring, extended ring, reserve ring, paired with 'one connector per table'.",
    reflectionVi:
      "Trong nhóm bạn của mình, ai là người luôn giúp người mới cảm thấy được chào đón?",
    reflectionEn:
      "In your circle, who reliably makes newcomers feel welcome?",
    drillVi:
      "Lấy một dịp sắp tới, viết danh sách khách theo ba vòng, rồi vẽ sơ đồ bàn với ít nhất một người kết nối mỗi bàn.",
    drillEn:
      "Take an upcoming occasion, list guests in three rings, then sketch a table plan with one connector per table.",
    whyItMattersVi:
      "Khách không nhớ món ăn lâu, nhưng họ nhớ rất lâu cảm giác bị bỏ rơi ở một chiếc bàn im lặng.",
    whyItMattersEn:
      "Guests forget the food quickly, but they remember for years the feeling of being stranded at a silent table.",
    deepDiveVi: [
      "Danh sách khách là công cụ thiết kế, không chỉ là danh sách tên. Khi bạn nghĩ theo ba vòng, bạn tránh được hai lỗi phổ biến: mời quá nhiều rồi vượt ngân sách, hoặc bỏ sót người thân thiết vì quên.",
      "Sơ đồ chỗ ngồi hoạt động như một mạng lưới. Hãy tìm điểm chung có thể nói ra thành lời cho từng cặp ngồi cạnh nhau, ví dụ cùng học một ngành hoặc cùng thích leo núi. Nếu bạn không tìm được điểm chung nào, hãy đổi chỗ.",
    ],
    deepDiveEn: [
      "A guest list is a design tool, not just a set of names. Thinking in three rings avoids the two classic errors: over-inviting past your budget, or forgetting someone close to you.",
      "A seating plan works like a network. For each neighbouring pair, find a shared thread you could say out loud, such as the same field of study or a love of hiking. If you cannot find one, change the seats.",
    ],
    illustrationEmojis: ["🪑", "👥", "🗂️", "🤝"],
    safetyNotesVi:
      "Giữ danh sách khách ở chế độ riêng tư và tôn trọng người muốn giấu việc mình tham dự.",
    safetyNotesEn:
      "Keep the guest list private and respect anyone who does not want their attendance known.",
  },
  {
    id: "pty-04",
    pillar: "partying",
    level: "foundation",
    minutes: 8,
    medium: "read",
    titleVi: "Ngân sách tiệc - Chi tiêu thông minh, không cắt niềm vui",
    titleEn: "Party Budgets - Spending Smart Without Cutting the Joy",
    subtitleVi:
      "Phân bổ tiền theo tỷ lệ, biết chỗ nào nên tiết kiệm và chỗ nào tuyệt đối không nên.",
    subtitleEn:
      "Allocate by percentage, know where to save and where you must not.",
    takeaways: [
      { vi: "Tỷ lệ khởi điểm: 45% đồ ăn và uống, 25% địa điểm, 15% trang trí và nhạc, 15% dự phòng.",
        en: "Starting split: 45% food and drink, 25% venue, 15% décor and music, 15% buffer." },
      { vi: "Tính chi phí theo đầu người trước, rồi nhân với số khách. Cách này chặn ngay việc vượt ngân sách.",
        en: "Cost per head first, then multiply by headcount. This stops overspending immediately." },
      { vi: "Nên tiết kiệm ở trang trí, không nên tiết kiệm ở lượng đồ ăn và chỗ ngồi.",
        en: "Save on décor, never on food quantity or seating." },
      { vi: "Nếu chia tiền cùng bạn bè, nói rõ số tiền và cách chuyển trước khi tiệc diễn ra.",
        en: "If you split costs with friends, state the amount and payment method before the event." },
    ],
    frameworkVi:
      "Ngân sách theo đầu người: tổng chi phí chia cho số khách, đối chiếu với con số bạn thực sự sẵn lòng chi.",
    frameworkEn:
      "Per-head budgeting: total cost divided by headcount, checked against what you truly want to spend.",
    reflectionVi:
      "Lần gần nhất bạn chi quá tay cho một dịp vui, khoản nào thực sự khiến khách hạnh phúc hơn?",
    reflectionEn:
      "The last time you overspent on a celebration, which line item actually made guests happier?",
    drillVi:
      "Lập bảng 5 dòng cho một buổi tiệc 20 người: ăn, uống, địa điểm, trang trí, dự phòng. Tính chi phí mỗi người.",
    drillEn:
      "Build a 5-row table for a 20-person party: food, drink, venue, décor, buffer. Compute the per-head cost.",
    whyItMattersVi:
      "Một buổi tối vui vẻ không nên để lại ba tháng lo tiền, và điều đó hoàn toàn tránh được bằng vài phép tính.",
    whyItMattersEn:
      "One good evening should not leave three months of money stress, and a few sums prevent exactly that.",
    deepDiveVi: [
      "Ngân sách tiệc dễ trượt vì các khoản nhỏ cộng dồn im lặng: thêm một khay bánh, thêm chùm bóng, thêm cuốc xe. Khi bạn quy mọi thứ về chi phí mỗi người, những khoản nhỏ đó lập tức hiện ra dưới dạng con số dễ thấy.",
      "Khoản dự phòng 15% không phải là xa xỉ. Nó là chỗ để bạn xử lý một khách thêm, một chiếc taxi muộn, hoặc một món phải đổi vì có người dị ứng, mà không phá vỡ cả kế hoạch.",
    ],
    deepDiveEn: [
      "Party budgets slip because small items add up quietly: one more tray, one more balloon bundle, one more ride. Converting everything to per-head cost makes those extras visible as numbers.",
      "The 15% buffer is not a luxury. It is where you absorb one extra guest, one late taxi, or one dish swapped for an allergy, without breaking the plan.",
    ],
    illustrationEmojis: ["💰", "🧾", "🍽️", "📊"],
    safetyNotesVi:
      "Không vay nợ hoặc dùng thẻ tín dụng trả góp chỉ để tổ chức một buổi tiệc.",
    safetyNotesEn:
      "Never borrow money or use credit instalments just to fund a party.",
  },
  {
    id: "pty-05",
    pillar: "partying",
    level: "foundation",
    minutes: 9,
    medium: "read",
    titleVi: "Kịch bản thời gian - Dòng chảy của một buổi tiệc",
    titleEn: "The Run of Show - How an Evening Should Flow",
    subtitleVi:
      "Chia buổi tiệc thành các đoạn có nhịp: chào đón, hâm nóng, cao trào, hạ nhiệt, kết thúc.",
    subtitleEn:
      "Break the evening into beats: welcome, warm-up, peak, cool-down, close.",
    takeaways: [
      { vi: "Ba mươi phút đầu là đoạn dễ hỏng nhất, nên luôn có người đón khách và một thứ để khách cầm trong tay.",
        en: "The first 30 minutes break most easily, so always have a greeter and something for guests to hold." },
      { vi: "Đặt cao trào ở khoảng hai phần ba buổi tiệc, không phải ở cuối cùng.",
        en: "Place the peak around two thirds through, not at the very end." },
      { vi: "Mỗi đoạn nên có một tín hiệu chuyển: đổi nhạc, tắt bớt đèn, hoặc dọn bàn.",
        en: "Give each beat a transition signal: change the music, dim the lights, or clear the table." },
      { vi: "Nói rõ giờ kết thúc để khách ra về tự nhiên, không cần chủ nhà phải nhắc.",
        en: "Announce the end time so guests leave naturally without the host prompting them." },
    ],
    frameworkVi:
      "Kịch bản 5 Đoạn: Chào đón, Hâm nóng, Cao trào, Hạ nhiệt, Kết thúc, mỗi đoạn có mốc giờ cụ thể.",
    frameworkEn:
      "The 5-Beat Run of Show: Welcome, Warm-up, Peak, Cool-down, Close, each with a clock time.",
    reflectionVi:
      "Bạn thường thấy buổi tiệc mất đà ở đoạn nào, và điều gì có thể lấp khoảng trống đó?",
    reflectionEn:
      "Where do parties usually lose momentum for you, and what could fill that gap?",
    drillVi:
      "Viết kịch bản 5 đoạn cho một buổi tối 4 giờ, ghi rõ giờ bắt đầu từng đoạn và tín hiệu chuyển đoạn.",
    drillEn:
      "Write a 5-beat run of show for a 4-hour evening, with a start time and a transition signal for each beat.",
    whyItMattersVi:
      "Không khí tiệc là kết quả của nhịp thời gian, và nhịp đó có thể thiết kế trước chứ không phụ thuộc may mắn.",
    whyItMattersEn:
      "Party atmosphere is a product of timing, and timing can be designed in advance rather than left to luck.",
    deepDiveVi: [
      "Khách bước vào một không gian lạ với hai câu hỏi ngầm: mình nên đứng đâu, và mình nên làm gì. Một ly nước trong tay và một người chào đón trả lời cả hai câu hỏi trong mười giây, đó là lý do đoạn chào đón quan trọng hơn mọi món trang trí.",
      "Nếu bạn đặt cao trào ở phút cuối, khách sẽ ra về trong lúc năng lượng còn dâng cao và buổi tiệc bị đứt đoạn. Đặt cao trào sớm hơn rồi hạ nhiệt bằng nhạc nhẹ và trò chuyện giúp mọi người ra về đúng lúc và thấy trọn vẹn.",
    ],
    deepDiveEn: [
      "Guests enter an unfamiliar space with two silent questions: where do I stand, and what do I do. A drink in hand and a greeter answer both within ten seconds, which is why the welcome beat matters more than any decoration.",
      "If you put the peak in the final minutes, guests leave while energy is still rising and the evening feels cut off. Peaking earlier and cooling down with softer music and conversation lets people leave on time and feel complete.",
    ],
    illustrationEmojis: ["⏱️", "🎶", "🎉", "🌙"],
    safetyNotesVi:
      "Luôn dừng phục vụ đồ uống có cồn trước giờ kết thúc và chuẩn bị nước cùng đồ ăn nhẹ.",
    safetyNotesEn:
      "Always stop serving alcohol before the closing time and keep water and light food available.",
  },
  // ── INTERMEDIATE ─────────────────────────────────────────
  {
    id: "pty-06",
    pillar: "partying",
    level: "intermediate",
    minutes: 9,
    medium: "read",
    titleVi: "Địa điểm, đồ ăn và đồ uống - Ba lựa chọn khó nhất",
    titleEn: "Venue, Food and Drinks - The Three Hardest Calls",
    subtitleVi:
      "Cách chọn không gian phù hợp, tính lượng đồ ăn, và dựng quầy nước cho mọi người kể cả người không uống cồn.",
    subtitleEn:
      "Choosing the right space, sizing the food, and building a drinks station that includes non-drinkers.",
    takeaways: [
      { vi: "Không gian nên hơi nhỏ hơn nhu cầu tuyệt đối: chật một chút tạo ấm áp, quá rộng tạo cảm giác trống.",
        en: "Pick a space slightly smaller than the maximum: a little tight feels warm, too large feels empty." },
      { vi: "Tiệc đứng: tính 8 đến 10 miếng nhỏ mỗi người trong hai giờ đầu.",
        en: "Standing reception: plan 8 to 10 small bites per person over the first two hours." },
      { vi: "Luôn có ít nhất hai lựa chọn không cồn thật ngon, không chỉ là nước lọc.",
        en: "Always offer at least two genuinely good non-alcoholic options, not just tap water." },
      { vi: "Hỏi trước về dị ứng và chế độ ăn khi gửi lời mời, không hỏi lúc khách đã tới.",
        en: "Ask about allergies and diets when inviting, not when guests have already arrived." },
    ],
    frameworkVi:
      "Bộ ba VFD: Venue phù hợp mục đích, Food tính theo đầu người, Drinks có nhánh không cồn ngang bằng.",
    frameworkEn:
      "The VFD trio: Venue matched to purpose, Food sized per head, Drinks with an equal non-alcoholic branch.",
    reflectionVi:
      "Bạn từng dự buổi tiệc nào mà không gian phá vỡ không khí, và cụ thể điều gì gây ra chuyện đó?",
    reflectionEn:
      "Have you been to a party where the space broke the mood, and what exactly caused it?",
    drillVi:
      "Chọn một địa điểm thật gần bạn, viết ra sức chứa, lượng bàn ghế, và thực đơn 6 món kèm 3 đồ uống không cồn.",
    drillEn:
      "Pick a real venue near you, note its capacity and seating, then draft a 6-item menu with 3 non-alcoholic drinks.",
    whyItMattersVi:
      "Ba lựa chọn này chiếm phần lớn ngân sách và cũng là ba thứ khách cảm nhận rõ nhất ngay khi bước vào.",
    whyItMattersEn:
      "These three choices consume most of the budget and are the three things guests notice first.",
    deepDiveVi: [
      "Không gian điều khiển hành vi. Trần cao và phòng rộng khiến người ta nói to và tản ra; góc ấm với ghế thấp khiến người ta ngồi lâu và nói sâu. Hãy chọn không gian theo kiểu trò chuyện bạn muốn, chứ không theo hình ảnh đẹp trên mạng.",
      "Về đồ uống, hãy đối xử với người không uống cồn như khách chính chứ không phải ngoại lệ. Một quầy nước ép, trà lạnh và soda có lát cam giúp họ có thứ để cầm trong tay và không phải giải thích lựa chọn của mình cả buổi.",
    ],
    deepDiveEn: [
      "Space drives behaviour. High ceilings and wide rooms make people speak up and spread out; a warm corner with low seats makes people stay and talk deeply. Choose the space for the conversation you want, not for the photos.",
      "On drinks, treat non-drinkers as primary guests rather than exceptions. A station with juices, iced tea and soda with citrus gives them something to hold and spares them from explaining their choice all evening.",
    ],
    illustrationEmojis: ["🏛️", "🍢", "🥤", "🧾"],
    safetyNotesVi:
      "Ghi rõ món chứa hạt, sữa, hải sản và giữ lối thoát hiểm luôn thông thoáng.",
    safetyNotesEn:
      "Label dishes containing nuts, dairy or shellfish and keep exit routes clear at all times.",
  },
  {
    id: "pty-07",
    pillar: "partying",
    level: "intermediate",
    minutes: 7,
    medium: "read",
    titleVi: "Thiếp mời và thông tin - Viết một lời mời rõ ràng",
    titleEn: "Invitations and Information - Writing a Clear Invite",
    subtitleVi:
      "Sáu thông tin bắt buộc và giọng điệu phù hợp cho tiệc thân mật hay sự kiện trang trọng.",
    subtitleEn:
      "The six required details, and the right tone for a casual party or a formal event.",
    takeaways: [
      { vi: "Sáu thông tin bắt buộc: dịp gì, ai mời, khi nào, ở đâu, trang phục, hạn trả lời.",
        en: "Six required details: occasion, host, when, where, dress code, reply-by date." },
      { vi: "Nói rõ có được dẫn theo người khác hay không, vì đây là nguồn hiểu nhầm phổ biến nhất.",
        en: "State clearly whether guests may bring someone, the most common source of confusion." },
      { vi: "Thiệp trang trọng dùng câu đầy đủ và ngôi thứ ba; tin nhắn thân mật có thể ngắn và ấm.",
        en: "Formal invitations use full sentences and third person; casual messages can be short and warm." },
      { vi: "Thêm một dòng thực tế: chỗ đậu xe, lối vào, hoặc cách di chuyển bằng xe công cộng.",
        en: "Add one practical line: parking, which entrance, or how to arrive by public transport." },
    ],
    frameworkVi:
      "Danh mục 6 Ô: Dịp, Chủ tiệc, Thời gian, Địa điểm, Trang phục, Hạn trả lời. Thiếu ô nào là tạo ra một câu hỏi.",
    frameworkEn:
      "The 6-Box Checklist: Occasion, Host, Time, Place, Dress, Reply-by. Every missing box creates a question.",
    reflectionVi:
      "Lời mời nào từng khiến bạn phải nhắn hỏi thêm, và thông tin nào đã bị thiếu?",
    reflectionEn:
      "Which invitation once forced you to ask a follow-up question, and what detail was missing?",
    drillVi:
      "Viết hai phiên bản cho cùng một dịp: một thiệp trang trọng ba dòng và một tin nhắn thân mật hai dòng.",
    drillEn:
      "Write two versions of one invitation: a three-line formal card and a two-line casual message.",
    whyItMattersVi:
      "Một lời mời rõ ràng giúp khách đến đúng giờ, mặc đúng kiểu, và tự tin thay vì lo lắng.",
    whyItMattersEn:
      "A clear invitation gets guests there on time, dressed right, and confident instead of anxious.",
    deepDiveVi: [
      "Lời mời là giao diện đầu tiên của buổi tiệc. Khách đọc nó và dựng trong đầu hình ảnh về mức độ trang trọng, số người, và cách họ nên hành xử. Nếu giao diện mơ hồ, họ sẽ đoán, và một nửa số người sẽ đoán sai.",
      "Giọng điệu quyết định mức trang trọng nhiều hơn cả loại giấy. Câu 'Kính mời quý vị dự tiệc tối' và câu 'Tối thứ Bảy nhà mình có tiệc nhỏ, tới nhé' gửi hai tín hiệu hoàn toàn khác nhau về trang phục và cách ứng xử.",
    ],
    deepDiveEn: [
      "The invitation is the party's first interface. Guests read it and build a mental picture of formality, size and expected behaviour. If the interface is vague, they guess, and half of them guess wrong.",
      "Tone signals formality more than paper does. 'You are cordially invited to dinner' and 'small get-together at ours on Saturday, come by' send completely different messages about dress and conduct.",
    ],
    illustrationEmojis: ["💌", "🖋️", "📎", "🕰️"],
    safetyNotesVi:
      "Với sự kiện mở, đừng công khai địa chỉ nhà riêng; hãy yêu cầu xác nhận rồi gửi riêng.",
    safetyNotesEn:
      "For open events, never publish a private home address; ask people to confirm, then send it directly.",
  },
  {
    id: "pty-08",
    pillar: "partying",
    level: "intermediate",
    minutes: 8,
    medium: "practice",
    titleVi: "Giới thiệu và bắt tay - Ba mươi giây đầu tiên",
    titleEn: "Introductions and Handshakes - The First Thirty Seconds",
    subtitleVi:
      "Tự giới thiệu, giới thiệu hai người với nhau, và nhớ tên người vừa gặp.",
    subtitleEn:
      "Introducing yourself, introducing two people, and remembering the name you just heard.",
    takeaways: [
      { vi: "Tự giới thiệu ba phần: tên, một câu về bạn, một câu hỏi mở cho người kia.",
        en: "Introduce yourself in three parts: name, one line about you, one open question for them." },
      { vi: "Khi giới thiệu hai người, hãy tặng họ một điểm chung để bắt đầu nói chuyện.",
        en: "When introducing two people, hand them a shared thread to start on." },
      { vi: "Nhắc lại tên ngay sau khi nghe, đó là cách ghi nhớ đơn giản và hiệu quả nhất.",
        en: "Repeat the name right after you hear it, the simplest and most effective way to remember." },
      { vi: "Bắt tay vừa phải, mắt nhìn nhau, và tôn trọng người không muốn tiếp xúc cơ thể.",
        en: "Shake firmly but gently, meet the eyes, and respect anyone who prefers no physical contact." },
    ],
    frameworkVi:
      "Mô hình N-1-Q: Name, một câu về mình, một Question dành cho người đối diện.",
    frameworkEn:
      "The N-1-Q model: Name, one line about yourself, one Question for the other person.",
    reflectionVi:
      "Bạn thường quên tên người mới gặp sau bao lâu, và điều gì đang xảy ra trong đầu bạn lúc đó?",
    reflectionEn:
      "How fast do you forget a new name, and what is happening in your head at that moment?",
    drillVi:
      "Luyện to thành tiếng ba lần phần tự giới thiệu 15 giây, sau đó tập giới thiệu hai người bạn quen với nhau.",
    drillEn:
      "Say your 15-second self-introduction aloud three times, then practise introducing two friends to each other.",
    whyItMattersVi:
      "Ba mươi giây đầu quyết định người ta có muốn tiếp tục nói chuyện với bạn hay không.",
    whyItMattersEn:
      "The first thirty seconds decide whether someone wants to keep talking to you.",
    deepDiveVi: [
      "Người ta quên tên không phải vì trí nhớ kém mà vì lúc nghe tên họ đang lo về lượt nói của mình. Chuyển sự chú ý sang người kia, nhắc lại tên trong câu đầu tiên, và bạn sẽ nhớ được đa số trường hợp.",
      "Giới thiệu hai người là một hành động rộng lượng nhỏ. Câu 'Đây là Lan, bạn ấy cũng vừa chuyển sang ngành dữ liệu như anh' vừa nêu tên vừa mở sẵn chủ đề, giúp họ nói tiếp mà không phải mò mẫm.",
    ],
    deepDiveEn: [
      "People forget names not from weak memory but because they were busy rehearsing their own turn. Shift attention to the other person, repeat the name in your first sentence, and you will keep most of them.",
      "Introducing two people is a small act of generosity. 'This is Lan, she also moved into data work recently' gives both a name and an opening topic, so they can continue without fumbling.",
    ],
    illustrationEmojis: ["🤝", "🗣️", "🧠", "😊"],
    safetyNotesVi:
      "Không bắt tay hoặc chạm vai nếu người đối diện không chủ động; hãy chào bằng lời và nụ cười.",
    safetyNotesEn:
      "Do not shake hands or touch a shoulder unless the other person offers; a spoken greeting and a smile are enough.",
  },
  {
    id: "pty-09",
    pillar: "partying",
    level: "intermediate",
    minutes: 9,
    medium: "practice",
    titleVi: "Trò chuyện nhẹ - Từ chào hỏi tới câu chuyện thật",
    titleEn: "Small Talk - From Greeting to Real Conversation",
    subtitleVi:
      "Mở lời, giữ nhịp, đào sâu, và rời cuộc trò chuyện một cách lịch sự.",
    subtitleEn:
      "Opening, sustaining, deepening, and exiting a conversation politely.",
    takeaways: [
      { vi: "Mở lời bằng hoàn cảnh chung: món ăn, không gian, cách bạn biết chủ tiệc.",
        en: "Open with shared context: the food, the space, how you know the host." },
      { vi: "Dùng câu hỏi mở bắt đầu bằng 'thế nào' và 'điều gì', tránh câu hỏi chỉ trả lời có hoặc không.",
        en: "Ask open questions starting with 'how' and 'what', avoid yes-or-no questions." },
      { vi: "Nghe để tìm 'móc': một chi tiết trong câu trả lời để hỏi tiếp thay vì đổi chủ đề.",
        en: "Listen for the hook: one detail in their answer to follow up on instead of switching topics." },
      { vi: "Rời đi lịch sự: nói lý do ngắn, cảm ơn, và nếu được thì giới thiệu họ với người khác.",
        en: "Exit gracefully: give a short reason, thank them, and if you can, hand them to someone else." },
    ],
    frameworkVi:
      "Vòng ARE: Anchor vào hoàn cảnh, Reveal một chi tiết về mình, Encourage bằng câu hỏi mở.",
    frameworkEn:
      "The ARE loop: Anchor in the context, Reveal one detail about yourself, Encourage with an open question.",
    reflectionVi:
      "Cuộc trò chuyện nào ở buổi tiệc từng khiến bạn thấy dễ chịu, và người kia đã làm gì?",
    reflectionEn:
      "Which party conversation felt easy for you, and what did the other person do?",
    drillVi:
      "Viết 5 câu mở lời và 5 câu hỏi đào sâu, rồi thử dùng ít nhất hai câu trong lần gặp gỡ tới.",
    drillEn:
      "Write 5 openers and 5 deepening questions, then use at least two of them at your next gathering.",
    whyItMattersVi:
      "Trò chuyện nhẹ không hề nông; nó là cây cầu bắt buộc phải đi qua để tới những cuộc nói chuyện sâu.",
    whyItMattersEn:
      "Small talk is not shallow; it is the required bridge to every deeper conversation.",
    deepDiveVi: [
      "Người giỏi giao tiếp không nói nhiều hơn, họ hỏi tốt hơn và nghe kỹ hơn. Sau mỗi câu trả lời luôn có một chi tiết đáng hỏi tiếp, ví dụ một địa danh, một khó khăn, hoặc một sở thích. Chọn chi tiết đó và cuộc trò chuyện tự đi sâu.",
      "Rời cuộc trò chuyện là kỹ năng ít được dạy nhưng rất cần. Đứng mãi vì sợ mất lịch sự khiến cả hai kiệt sức. Một câu 'Rất vui được nói chuyện, mình đi lấy thêm nước và sẽ gặp lại bạn sau' là đủ và hoàn toàn lịch sự.",
    ],
    deepDiveEn: [
      "Skilled conversationalists do not talk more, they ask better and listen harder. Every answer contains a detail worth following: a place, a difficulty, an interest. Pick that detail and the conversation deepens on its own.",
      "Exiting is the rarely taught half of the skill. Staying out of politeness exhausts both people. 'It was good to talk, I'm going to refill my drink and I'll catch you later' is enough and entirely polite.",
    ],
    illustrationEmojis: ["💬", "👂", "🎯", "🚪"],
    safetyNotesVi:
      "Tránh hỏi về thu nhập, tôn giáo, chính trị hoặc chuyện riêng tư với người mới gặp.",
    safetyNotesEn:
      "Avoid asking about income, religion, politics or private matters with someone you just met.",
  },
  {
    id: "pty-10",
    pillar: "partying",
    level: "intermediate",
    minutes: 9,
    medium: "read",
    titleVi: "Kết nối chuyên nghiệp trong tiệc - Networking không giả tạo",
    titleEn: "Professional Networking at Parties - Connecting Without Faking",
    subtitleVi:
      "Cách xây quan hệ nghề nghiệp ở sự kiện xã giao mà không biến buổi tiệc thành cuộc chào hàng.",
    subtitleEn:
      "Building professional relationships at social events without turning the party into a sales pitch.",
    takeaways: [
      { vi: "Mục tiêu là ba cuộc trò chuyện chất lượng, không phải mười lăm tấm danh thiếp.",
        en: "Aim for three quality conversations, not fifteen business cards." },
      { vi: "Hỏi về công việc theo cách con người: điều gì đang thú vị, điều gì đang khó.",
        en: "Ask about work in human terms: what is interesting right now, what is hard right now." },
      { vi: "Cho trước khi nhận: giới thiệu một người, gửi một bài viết, chia sẻ một kinh nghiệm.",
        en: "Give before you ask: introduce someone, send an article, share an experience." },
      { vi: "Theo dõi trong 48 giờ bằng một tin nhắn nhắc lại chi tiết cụ thể đã nói.",
        en: "Follow up within 48 hours with a message referencing one specific detail you discussed." },
    ],
    frameworkVi:
      "Quy tắc 3-1-48: ba cuộc trò chuyện thật, một hành động cho đi, theo dõi trong 48 giờ.",
    frameworkEn:
      "The 3-1-48 rule: three real conversations, one act of giving, follow up within 48 hours.",
    reflectionVi:
      "Bạn thấy khó chịu khi ai đó tiếp cận mình vì lợi ích. Ranh giới giữa chân thành và tính toán nằm ở đâu?",
    reflectionEn:
      "It feels bad when someone approaches you for gain. Where is the line between sincerity and calculation?",
    drillVi:
      "Chuẩn bị hai câu hỏi mở về công việc và một mẫu tin nhắn theo dõi 3 dòng để dùng sau sự kiện.",
    drillEn:
      "Prepare two open questions about work and a 3-line follow-up message template to use after the event.",
    whyItMattersVi:
      "Cơ hội nghề nghiệp thường đến từ quan hệ yếu, tức những người bạn chỉ gặp trong các dịp như thế này.",
    whyItMattersEn:
      "Career opportunities often arrive through weak ties, the people you only meet at occasions like these.",
    deepDiveVi: [
      "Điều làm networking trở nên khó chịu không phải mục đích nghề nghiệp mà là sự thiếu quan tâm thật. Nếu bạn hỏi một câu và không nghe câu trả lời, người kia cảm nhận được ngay. Ngược lại, chỉ cần nhớ đúng một chi tiết họ kể là đủ tạo thiện cảm lâu dài.",
      "Buổi tiệc không phải nơi chốt việc. Nó là nơi tạo lý do để liên hệ lại. Vì vậy hãy đầu tư vào chất lượng của tin nhắn theo dõi hơn là vào số lượng người bạn kịp gặp trong hai giờ.",
    ],
    deepDiveEn: [
      "What makes networking unpleasant is not the professional motive but the absence of real interest. Ask a question and fail to listen, and the other person feels it instantly. Remember one concrete detail they shared, and goodwill lasts for years.",
      "A party is not where deals close. It is where you earn a reason to reach out again. So invest in the quality of your follow-up message rather than the number of people you managed to greet in two hours.",
    ],
    illustrationEmojis: ["🪪", "🌐", "🤝", "📬"],
    safetyNotesVi:
      "Không chia sẻ thông tin liên lạc của người khác cho bên thứ ba mà chưa được họ đồng ý.",
    safetyNotesEn:
      "Never pass someone's contact details to a third party without their consent.",
  },
  // ── MASTERY ──────────────────────────────────────────────
  {
    id: "pty-11",
    pillar: "partying",
    level: "mastery",
    minutes: 8,
    medium: "read",
    titleVi: "Mã trang phục - Đọc hiểu và mặc đúng",
    titleEn: "Dress Codes - Reading Them and Getting Them Right",
    subtitleVi:
      "Từ smart casual tới black tie: mỗi mã trang phục thực sự yêu cầu điều gì.",
    subtitleEn:
      "From smart casual to black tie: what each dress code actually requires.",
    takeaways: [
      { vi: "Smart casual: áo có cổ hoặc áo dệt kim, quần âu hoặc chân váy, giày da. Không quần thể thao.",
        en: "Smart casual: collared shirt or fine knit, tailored trousers or a skirt, leather shoes. No sportswear." },
      { vi: "Cocktail: bộ suit tối màu hoặc đầm ngắn ngang đầu gối, phụ kiện tinh giản.",
        en: "Cocktail: a dark suit or a knee-length dress, restrained accessories." },
      { vi: "Black tie: áo tuxedo nơ đen hoặc đầm dài. Đây là mã trang trọng nhất trong tiệc thông thường.",
        en: "Black tie: a tuxedo with a black bow tie, or a floor-length gown. The most formal common code." },
      { vi: "Nếu không rõ, hãy hỏi chủ tiệc và mặc nhỉnh hơn một bậc thay vì kém một bậc.",
        en: "When unsure, ask the host and dress one notch up rather than one notch down." },
    ],
    frameworkVi:
      "Thang 4 Bậc: Casual, Smart Casual, Cocktail, Black Tie. Xác định bậc trước khi chọn từng món.",
    frameworkEn:
      "The 4-Step Ladder: Casual, Smart Casual, Cocktail, Black Tie. Identify the step before picking items.",
    reflectionVi:
      "Lần nào bạn cảm thấy mặc lệch so với mọi người, và cảm giác đó ảnh hưởng thế nào tới cả buổi tối?",
    reflectionEn:
      "When did you feel dressed out of step with everyone, and how did that shape your whole evening?",
    drillVi:
      "Mở tủ quần áo và ghép sẵn một bộ cho mỗi bậc: smart casual, cocktail, và bậc trang trọng nhất bạn có.",
    drillEn:
      "Open your wardrobe and assemble one outfit per step: smart casual, cocktail, and the most formal you own.",
    whyItMattersVi:
      "Trang phục đúng mã giúp bạn tan vào không khí buổi tiệc và tập trung vào con người thay vì lo về mình.",
    whyItMattersEn:
      "The right dress code lets you blend into the evening and focus on people instead of worrying about yourself.",
    deepDiveVi: [
      "Mã trang phục là một dạng ngôn ngữ chung. Khi chủ tiệc ghi 'cocktail', họ đang nói về mức độ trang trọng, thời lượng đứng, và cả kiểu ảnh sẽ được chụp. Hiểu tín hiệu này giúp bạn quyết định nhanh mà không cần mua đồ mới.",
      "Nguyên tắc an toàn nhất là đơn giản hoá: một bộ tối màu vừa vặn, một đôi giày da sạch, và phụ kiện tối giản có thể đi qua ba trong bốn bậc. Tiền nên đầu tư vào độ vừa vặn chứ không vào chi tiết cầu kỳ.",
    ],
    deepDiveEn: [
      "A dress code is shared language. When a host writes 'cocktail', they are describing formality, how long you will stand, and even the kind of photos to expect. Reading that signal lets you decide fast without buying anything new.",
      "The safest principle is simplification: one well-fitted dark outfit, clean leather shoes and minimal accessories will carry you through three of the four steps. Spend on fit rather than on ornament.",
    ],
    illustrationEmojis: ["👔", "👗", "👞", "🎀"],
    safetyNotesVi:
      "Chọn giày bạn đi được nhiều giờ và mang theo áo khoác nhẹ nếu sự kiện ở ngoài trời.",
    safetyNotesEn:
      "Choose shoes you can stand in for hours, and bring a light layer for outdoor events.",
  },
  {
    id: "pty-12",
    pillar: "partying",
    level: "mastery",
    minutes: 10,
    medium: "read",
    titleVi: "Nghi thức bàn tiệc - Dao, nĩa, ly và nhịp ăn",
    titleEn: "Table Manners - Cutlery, Glasses and the Pace of a Meal",
    subtitleVi:
      "Ngồi vào bàn tiệc sang trọng mà không lo dùng sai dụng cụ hay sai thứ tự.",
    subtitleEn:
      "Sitting down at a formal table without fearing the wrong tool or the wrong order.",
    takeaways: [
      { vi: "Dùng dụng cụ từ ngoài vào trong theo từng món; dụng cụ phía trên đĩa dành cho món tráng miệng.",
        en: "Work from the outside in, course by course; the tools above the plate are for dessert." },
      { vi: "Bánh mì và đĩa nhỏ ở bên trái, các loại ly ở bên phải.",
        en: "Bread and the small plate sit on your left, glasses on your right." },
      { vi: "Khăn ăn đặt trên chân ngay khi ngồi; khi rời bàn tạm thời thì để lên ghế hoặc bên trái đĩa.",
        en: "Napkin on your lap as you sit; leaving briefly, place it on your chair or to the left of the plate." },
      { vi: "Đặt dao và nĩa song song hướng bốn giờ để báo hiệu bạn đã ăn xong.",
        en: "Rest knife and fork parallel at the four o'clock position to signal you have finished." },
    ],
    frameworkVi:
      "Nguyên tắc Ngoài Vào Trong kết hợp bản đồ bàn tiệc: đồ ăn bên trái, đồ uống bên phải.",
    frameworkEn:
      "The Outside-In principle plus the table map: food on the left, drinks on the right.",
    reflectionVi:
      "Điều gì ở bàn tiệc trang trọng khiến bạn lo nhất, và thông tin nào sẽ xoá bỏ nỗi lo đó?",
    reflectionEn:
      "What worries you most at a formal table, and which single piece of knowledge would remove it?",
    drillVi:
      "Bày một bộ dụng cụ đầy đủ ở nhà cho ba món, rồi ăn một bữa theo đúng thứ tự ngoài vào trong.",
    drillEn:
      "Set a full three-course place setting at home, then eat one meal using the outside-in order.",
    whyItMattersVi:
      "Khi không phải lo về dụng cụ, bạn dành toàn bộ sự chú ý cho người ngồi cạnh, đó mới là mục đích của bữa tiệc.",
    whyItMattersEn:
      "Free of cutlery anxiety, you give full attention to the person beside you, which is the point of the dinner.",
    deepDiveVi: [
      "Nghi thức bàn tiệc tồn tại để giảm ma sát, không để phân loại con người. Mọi quy tắc đều xuất phát từ một ý đơn giản: giúp bữa ăn diễn ra trôi chảy và không ai phải chờ hay phải đoán.",
      "Nhịp ăn quan trọng hơn kỹ thuật. Hãy ăn cùng tốc độ với bàn, đợi chủ tiệc bắt đầu, và giữ tay không bận rộn khi người khác đang nói. Nếu bạn dùng sai dụng cụ, không ai lịch sự sẽ nhắc, nên cứ tiếp tục tự nhiên.",
    ],
    deepDiveEn: [
      "Table etiquette exists to reduce friction, not to sort people. Every rule comes from one simple idea: keep the meal flowing so nobody has to wait or guess.",
      "Pace matters more than technique. Eat at the table's speed, wait for the host to begin, and keep your hands still while someone else is speaking. If you pick the wrong tool, no polite person will mention it, so carry on naturally.",
    ],
    illustrationEmojis: ["🍽️", "🍷", "🥖", "🧻"],
    safetyNotesVi:
      "Nếu bạn dị ứng thực phẩm, hãy nói với nhân viên phục vụ ngay khi ngồi xuống, đừng đợi món được mang ra.",
    safetyNotesEn:
      "If you have a food allergy, tell the service staff as you sit down rather than waiting for the dish to arrive.",
  },
  {
    id: "pty-13",
    pillar: "partying",
    level: "mastery",
    minutes: 9,
    medium: "practice",
    titleVi: "Làm chủ tiệc - Nghệ thuật khiến khách cảm thấy được chăm sóc",
    titleEn: "Hosting - The Art of Making Guests Feel Cared For",
    subtitleVi:
      "Đón khách, kết nối người lạ, giữ nhịp buổi tối, và tiễn khách một cách ấm áp.",
    subtitleEn:
      "Greeting, connecting strangers, keeping the rhythm, and sending guests home warmly.",
    takeaways: [
      { vi: "Chào từng khách trong 60 giây đầu và đưa họ tới một người khác thay vì để họ tự tìm chỗ.",
        en: "Greet every guest within their first 60 seconds and walk them to someone rather than leaving them adrift." },
      { vi: "Quét phòng mỗi 20 phút để tìm người đang đứng một mình.",
        en: "Scan the room every 20 minutes for anyone standing alone." },
      { vi: "Việc của chủ tiệc là kết nối, không phải nấu nướng liên tục trong bếp.",
        en: "The host's job is connecting people, not staying in the kitchen all night." },
      { vi: "Tiễn khách ra tận cửa và nói một câu cụ thể về điều bạn thấy vui khi họ tới.",
        en: "See guests to the door and say one specific thing you enjoyed about their being there." },
    ],
    frameworkVi:
      "Vòng chăm sóc GLOW: Greet, Link tới người khác, Observe phòng, Wave goodbye tại cửa.",
    frameworkEn:
      "The GLOW host loop: Greet, Link them to someone, Observe the room, Wave goodbye at the door.",
    reflectionVi:
      "Chủ tiệc nào từng khiến bạn cảm thấy được chào đón nhất, và họ đã làm điều gì cụ thể?",
    reflectionEn:
      "Which host made you feel most welcome, and what specifically did they do?",
    drillVi:
      "Trước buổi tiệc tới, viết ra ba cặp khách bạn sẽ giới thiệu với nhau và điểm chung của từng cặp.",
    drillEn:
      "Before your next gathering, write three guest pairs you will introduce and the shared thread for each.",
    whyItMattersVi:
      "Khách đánh giá buổi tiệc bằng cảm giác được nhìn thấy, không bằng độ tinh xảo của món ăn.",
    whyItMattersEn:
      "Guests judge a party by how seen they felt, not by how refined the food was.",
    deepDiveVi: [
      "Chủ tiệc giỏi hoạt động như một bộ định tuyến. Họ không giữ cuộc trò chuyện cho riêng mình mà chuyển khách tới đúng người, kèm một câu mở đầu. Chỉ cần làm điều đó năm lần trong buổi tối là cả phòng tự chuyển động.",
      "Hãy chuẩn bị trước để giải phóng chính mình. Món nguội làm sẵn, nước bày sẵn, nhạc đã chọn sẵn: mọi phút bạn ở trong bếp là một phút không ai kết nối các nhóm khách với nhau.",
    ],
    deepDiveEn: [
      "A good host works like a router. They do not keep conversations for themselves; they route guests to the right person with an opening line. Do that five times in an evening and the whole room moves on its own.",
      "Prepare in advance to free yourself. Cold dishes made ahead, water already out, music already chosen: every minute in the kitchen is a minute nobody is connecting your groups of guests.",
    ],
    illustrationEmojis: ["🚪", "🥂", "👀", "💛"],
    safetyNotesVi:
      "Biết trước lối thoát hiểm, có sẵn hộp sơ cứu, và giữ số điện thoại một người khách tin cậy.",
    safetyNotesEn:
      "Know the exit routes, keep a first-aid kit nearby, and have the number of one trusted guest.",
  },
  {
    id: "pty-14",
    pillar: "partying",
    level: "mastery",
    minutes: 10,
    medium: "read",
    titleVi: "Sự kiện trang trọng và tiệc công ty",
    titleEn: "Formal Events and Corporate Parties",
    subtitleVi:
      "Chúc mừng, phát biểu ngắn, thứ tự ưu tiên và ranh giới nghề nghiệp trong không gian xã giao.",
    subtitleEn:
      "Toasts, short speeches, protocol order and professional boundaries in a social space.",
    takeaways: [
      { vi: "Phát biểu chúc mừng nên dài 60 đến 90 giây, gồm một câu chuyện nhỏ và một lời chúc rõ ràng.",
        en: "A toast should run 60 to 90 seconds: one small story and one clear wish." },
      { vi: "Chào theo thứ tự ưu tiên: khách danh dự, cấp trên, đồng nghiệp, rồi những người còn lại.",
        en: "Greet in protocol order: guests of honour, senior leaders, colleagues, then everyone else." },
      { vi: "Tiệc công ty vẫn là không gian công việc; điều bạn nói ở đó sẽ đi làm cùng bạn ngày hôm sau.",
        en: "A corporate party is still a work space; what you say there comes to the office with you." },
      { vi: "Giữ lượng cồn ở mức bạn vẫn nhớ rõ mọi cuộc trò chuyện, hoặc chọn không uống.",
        en: "Keep alcohol at a level where you remember every conversation, or skip it entirely." },
    ],
    frameworkVi:
      "Cấu trúc chúc mừng 3 nhịp: Cảm ơn, Một câu chuyện cụ thể, Một lời chúc hướng tương lai.",
    frameworkEn:
      "The 3-beat toast: Thank, one specific story, one forward-looking wish.",
    reflectionVi:
      "Bạn muốn đồng nghiệp nhớ điều gì về mình sau một buổi tiệc công ty?",
    reflectionEn:
      "What do you want colleagues to remember about you after a corporate party?",
    drillVi:
      "Viết và đọc to một bài chúc mừng 90 giây cho một dịp thật, bấm đồng hồ để kiểm tra thời lượng.",
    drillEn:
      "Write and read aloud a 90-second toast for a real occasion, timing yourself to check the length.",
    whyItMattersVi:
      "Sự kiện trang trọng là nơi danh tiếng nghề nghiệp được xây hoặc bị tổn hại rất nhanh.",
    whyItMattersEn:
      "Formal events are where professional reputation is built, or damaged, unusually fast.",
    deepDiveVi: [
      "Một bài chúc mừng tốt luôn cụ thể. Thay vì nói 'chị ấy là người tuyệt vời', hãy kể một chi tiết thật: chị ấy ở lại tới mười giờ đêm để giúp nhóm hoàn thành báo cáo. Chi tiết tạo cảm xúc, còn tính từ chung thì trôi qua vô nghĩa.",
      "Trong tiệc công ty, hãy giữ ba ranh giới: không bàn chuyện lương của người khác, không phê bình đồng nghiệp vắng mặt, và không biến buổi tối thành cuộc thương lượng công việc. Ba ranh giới này bảo vệ bạn hiệu quả hơn mọi kỹ năng giao tiếp.",
    ],
    deepDiveEn: [
      "A good toast is always specific. Instead of 'she is wonderful', tell one real detail: she stayed until ten at night to help the team finish the report. Details create feeling; generic adjectives pass unnoticed.",
      "At corporate events, hold three boundaries: do not discuss other people's pay, do not criticise absent colleagues, and do not turn the evening into a negotiation. Those three boundaries protect you better than any social skill.",
    ],
    illustrationEmojis: ["🥂", "🎤", "🏢", "🎖️"],
    safetyNotesVi:
      "Không lái xe sau khi uống; sắp xếp trước phương tiện về nhà trước khi buổi tiệc bắt đầu.",
    safetyNotesEn:
      "Never drive after drinking; arrange your ride home before the event starts.",
  },
  {
    id: "pty-15",
    pillar: "partying",
    level: "mastery",
    minutes: 9,
    medium: "read",
    titleVi: "Xử lý tình huống khó - Khi buổi tiệc đi lệch hướng",
    titleEn: "Handling Difficult Situations - When a Party Goes Sideways",
    subtitleVi:
      "Khách uống quá nhiều, tranh luận căng thẳng, người bị bỏ rơi, và cách kết thúc an toàn.",
    subtitleEn:
      "Guests who drink too much, heated arguments, someone left out, and how to close safely.",
    takeaways: [
      { vi: "Can thiệp sớm và nhẹ nhàng: đưa nước, đổi chủ đề, mời người đó ra chỗ yên tĩnh hơn.",
        en: "Intervene early and gently: bring water, change the topic, invite the person somewhere quieter." },
      { vi: "Với tranh luận căng thẳng, hãy tách hai người bằng một việc cụ thể thay vì phân xử đúng sai.",
        en: "For heated arguments, separate the pair with a concrete errand instead of judging who is right." },
      { vi: "Không để ai ra về một mình trong trạng thái không an toàn; gọi xe và xác nhận họ đã tới nhà.",
        en: "Never let anyone leave alone while unsafe; call a car and confirm they got home." },
      { vi: "Nếu có hành vi quấy rối, ưu tiên an toàn của người bị ảnh hưởng và yêu cầu người kia rời đi.",
        en: "If harassment occurs, put the affected person's safety first and ask the other person to leave." },
    ],
    frameworkVi:
      "Quy trình CALM: Check tình trạng, Approach riêng tư, Lead tới chỗ an toàn, Manage đường về nhà.",
    frameworkEn:
      "The CALM protocol: Check the state, Approach privately, Lead to a safe spot, Manage the journey home.",
    reflectionVi:
      "Bạn từng thấy một tình huống khó ở buổi tiệc mà không ai xử lý. Điều gì đã ngăn mọi người hành động?",
    reflectionEn:
      "Have you seen a difficult moment at a party that nobody handled? What stopped people from acting?",
    drillVi:
      "Viết trước ba câu bạn sẽ dùng: một câu mời uống nước, một câu tách tranh luận, một câu đề nghị gọi xe.",
    drillEn:
      "Write three sentences in advance: one to offer water, one to break up an argument, one to offer a ride home.",
    whyItMattersVi:
      "Một buổi tiệc được nhớ mãi vì cách người ta xử lý khoảnh khắc xấu, không phải vì mười khoảnh khắc đẹp.",
    whyItMattersEn:
      "A party is remembered for how the bad moment was handled, not for the ten good ones.",
    deepDiveVi: [
      "Hầu hết tình huống khó đều có tín hiệu sớm: giọng nói cao dần, một người im lặng rút khỏi nhóm, ly rượu được rót liên tục. Can thiệp ở giai đoạn tín hiệu luôn dễ hơn và ít gây mất mặt hơn can thiệp lúc đã bùng nổ.",
      "Hãy chuẩn bị trước một kế hoạch đơn giản: ai là người bạn sẽ nhờ hỗ trợ, số điện thoại xe, chỗ yên tĩnh để nói chuyện riêng, và nước cùng đồ ăn nhẹ luôn có sẵn. Khi kế hoạch đã có, bạn hành động thay vì đứng do dự.",
    ],
    deepDiveEn: [
      "Most difficult situations announce themselves early: a rising voice, someone quietly withdrawing, a glass being refilled again and again. Acting at the signal stage is easier and far less humiliating than acting after the blow-up.",
      "Prepare a simple plan: who you will ask for help, the number for a car, a quiet place for a private word, and water plus light food always within reach. With a plan in place you act instead of hesitating.",
    ],
    illustrationEmojis: ["🚕", "💧", "🛟", "🤍"],
    safetyNotesVi:
      "Trong trường hợp có nguy hiểm về sức khoẻ hoặc an toàn, hãy gọi ngay dịch vụ cấp cứu địa phương.",
    safetyNotesEn:
      "If there is any health or safety emergency, call your local emergency services immediately.",
  },
];
