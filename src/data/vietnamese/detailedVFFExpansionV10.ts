/**
 * @file detailedVFFExpansionV10.ts
 * @description Đợt 10 mở rộng - 5 bài Vietnamese-for-Foreigners chuyên sâu:
 * ngân hàng, thuê nhà, đi làm, bưu điện/giao hàng, mời bạn về nhà.
 * Mỗi bài có scenario, dialogue, grammar points, cultural notes và practice.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { detailedVFFModules, type DetailedLesson, type DetailedModule } from "./detailedVietnameseData";

const bankLesson: DetailedLesson = {
  id: "vff-bank-account",
  title: "Ở ngân hàng - Mở tài khoản",
  titleEn: "At the Bank - Opening an Account",
  icon: "🏦",
  scenario: "Bạn đến ngân hàng để mở tài khoản và đăng ký ngân hàng số.",
  scenarioEn: "You go to a bank to open an account and register for online banking.",
  dialogue: [
    { speaker: "You", speakerLabel: "Bạn", vi: "Chị ơi, em muốn mở tài khoản ạ.", en: "Excuse me, I'd like to open an account.", keyWords: [{ word: "mở tài khoản", pronunciation: "mở tài khoản", meaning: "to open an account", tone: "hoi" }] },
    { speaker: "Teller", speakerLabel: "Giao dịch viên", vi: "Anh cho em xem hộ chiếu và thẻ tạm trú nhé.", en: "May I see your passport and residence card?", keyWords: [{ word: "hộ chiếu", pronunciation: "hộ chiếu", meaning: "passport", tone: "nang" }] },
    { speaker: "You", speakerLabel: "Bạn", vi: "Đây ạ. Em có cần điền mẫu gì không?", en: "Here you are. Do I need to fill in any form?" },
    { speaker: "Teller", speakerLabel: "Giao dịch viên", vi: "Anh điền mẫu này và ký vào ba chỗ có dấu X.", en: "Fill in this form and sign in the three places marked X.", keyWords: [{ word: "ký", pronunciation: "ký", meaning: "to sign", tone: "sac" }] },
    { speaker: "You", speakerLabel: "Bạn", vi: "Mở tài khoản có mất phí không chị?", en: "Is there a fee to open the account?" },
    { speaker: "Teller", speakerLabel: "Giao dịch viên", vi: "Miễn phí, nhưng phải duy trì số dư tối thiểu năm mươi nghìn.", en: "It's free, but you must keep a minimum balance of fifty thousand.", keyWords: [{ word: "số dư", pronunciation: "số dư", meaning: "balance", tone: "sac" }] },
    { speaker: "You", speakerLabel: "Bạn", vi: "Em muốn đăng ký cả ngân hàng số nữa.", en: "I'd also like to register for online banking." },
    { speaker: "Teller", speakerLabel: "Giao dịch viên", vi: "Được, anh tải ứng dụng rồi nhập số điện thoại này.", en: "Sure, download the app and enter this phone number." },
    { speaker: "You", speakerLabel: "Bạn", vi: "Bao lâu thì em nhận được thẻ ạ?", en: "How long until I receive my card?" },
    { speaker: "Teller", speakerLabel: "Giao dịch viên", vi: "Khoảng năm ngày làm việc, ngân hàng sẽ gọi anh đến lấy.", en: "About five working days; we'll call you to pick it up." },
  ],
  grammarPoints: [
    {
      pattern: "muốn + động từ",
      patternEn: "muốn + verb (to want to)",
      explanation: "'Muốn' đứng trước động từ để nói mong muốn. Thêm 'ạ' ở cuối để lịch sự.",
      explanationEn: "'Muốn' precedes a verb to express a wish. Add 'ạ' at the end for politeness.",
      examples: [
        { vi: "Em muốn mở tài khoản.", en: "I want to open an account." },
        { vi: "Tôi muốn chuyển tiền.", en: "I want to transfer money." },
      ],
    },
    {
      pattern: "có ... không?",
      patternEn: "có ... không? (yes/no question)",
      explanation: "Khung 'có ... không?' tạo câu hỏi đóng. Trả lời ngắn: 'Có ạ' hoặc 'Không ạ'.",
      explanationEn: "The frame 'có ... không?' forms a yes/no question. Short answers: 'Có ạ' or 'Không ạ'.",
      examples: [
        { vi: "Mở tài khoản có mất phí không?", en: "Is there a fee to open an account?" },
        { vi: "Anh có mang hộ chiếu không?", en: "Did you bring your passport?" },
      ],
    },
  ],
  culturalNotes: [
    { title: "Giấy tờ luôn cần bản gốc", titleEn: "Originals are expected", content: "Ngân hàng Việt Nam thường yêu cầu bản gốc hộ chiếu và thẻ tạm trú, kèm bản sao. Hãy mang cả hai để tránh phải quay lại.", contentEn: "Vietnamese banks usually want original passport and residence card plus photocopies. Bring both to avoid a second trip." },
    { title: "Giờ nghỉ trưa", titleEn: "Lunch break", content: "Nhiều chi nhánh nghỉ trưa từ 11h30 đến 13h. Nên đến buổi sáng sớm.", contentEn: "Many branches close for lunch from 11:30 to 13:00, so arrive early in the morning." },
  ],
  practice: {
    type: "fill-blank",
    instruction: "Điền từ còn thiếu vào câu.",
    instructionEn: "Fill in the missing word.",
    items: [
      { question: "Em ___ mở tài khoản ạ.", questionEn: "I ___ to open an account.", options: ["muốn", "được", "bị"], answer: 0, explanation: "'Muốn' diễn tả mong muốn.", explanationEn: "'Muốn' expresses a wish." },
      { question: "Mở tài khoản ___ mất phí không?", questionEn: "___ there a fee to open an account?", options: ["có", "là", "rất"], answer: 0, explanation: "Khung câu hỏi 'có ... không?'.", explanationEn: "The 'có ... không?' question frame." },
      { question: "Anh cho em xem ___ nhé.", questionEn: "May I see your ___?", options: ["hộ chiếu", "số dư", "chi nhánh"], answer: 0, explanation: "Ngân hàng cần xem hộ chiếu.", explanationEn: "The bank needs to see the passport." },
    ],
  },
};

const rentLesson: DetailedLesson = {
  id: "vff-renting-house",
  title: "Thuê nhà - Xem phòng và thương lượng",
  titleEn: "Renting - Viewing and Negotiating",
  icon: "🔑",
  scenario: "Bạn đi xem một căn hộ nhỏ và thương lượng giá, tiền cọc, hợp đồng.",
  scenarioEn: "You view a small apartment and negotiate price, deposit and contract.",
  dialogue: [
    { speaker: "You", speakerLabel: "Bạn", vi: "Chị ơi, căn này giá bao nhiêu một tháng ạ?", en: "How much is this place per month?" },
    { speaker: "Owner", speakerLabel: "Chủ nhà", vi: "Bảy triệu, chưa gồm điện nước em nhé.", en: "Seven million, utilities not included.", keyWords: [{ word: "chưa gồm", pronunciation: "chưa gồm", meaning: "not including", tone: "ngang" }] },
    { speaker: "You", speakerLabel: "Bạn", vi: "Em thuê dài hạn, chị bớt chút được không?", en: "I'll rent long term - could you lower it a bit?", keyWords: [{ word: "bớt", pronunciation: "bớt", meaning: "to reduce", tone: "sac" }] },
    { speaker: "Owner", speakerLabel: "Chủ nhà", vi: "Nếu em ký một năm thì chị lấy sáu triệu tám.", en: "If you sign for a year, I'll take six million eight." },
    { speaker: "You", speakerLabel: "Bạn", vi: "Em phải đặt cọc bao nhiêu ạ?", en: "How much deposit do I need?", keyWords: [{ word: "đặt cọc", pronunciation: "đặt cọc", meaning: "to pay a deposit", tone: "nang" }] },
    { speaker: "Owner", speakerLabel: "Chủ nhà", vi: "Cọc một tháng, trả trước một tháng.", en: "One month deposit, one month in advance." },
    { speaker: "You", speakerLabel: "Bạn", vi: "Nhà có đăng ký tạm trú cho em không chị?", en: "Will you register my temporary residence?" },
    { speaker: "Owner", speakerLabel: "Chủ nhà", vi: "Có, chị làm giúp em ở phường.", en: "Yes, I'll do it at the ward office for you." },
    { speaker: "You", speakerLabel: "Bạn", vi: "Nếu máy nước nóng hỏng thì ai sửa ạ?", en: "If the water heater breaks, who fixes it?" },
    { speaker: "Owner", speakerLabel: "Chủ nhà", vi: "Chị sửa, em chỉ cần gọi cho chị.", en: "I do - just call me." },
  ],
  grammarPoints: [
    {
      pattern: "Nếu ... thì ...",
      patternEn: "Nếu ... thì ... (if ... then ...)",
      explanation: "Dùng để nêu điều kiện. Trong thương lượng, 'nếu' giúp đề nghị nhẹ nhàng.",
      explanationEn: "Used to state a condition. In negotiation, 'nếu' softens a proposal.",
      examples: [
        { vi: "Nếu em ký một năm thì chị bớt giá.", en: "If you sign for a year, I'll lower the price." },
        { vi: "Nếu máy hỏng thì gọi cho chị.", en: "If the machine breaks, call me." },
      ],
    },
    {
      pattern: "... được không?",
      patternEn: "... được không? (asking permission or a favour)",
      explanation: "Đặt ở cuối câu để hỏi khả năng hoặc xin phép một cách lịch sự.",
      explanationEn: "Placed at the end of a sentence to ask whether something is possible, politely.",
      examples: [
        { vi: "Chị bớt chút được không?", en: "Could you reduce it a little?" },
        { vi: "Em xem phòng bây giờ được không?", en: "May I see the room now?" },
      ],
    },
  ],
  culturalNotes: [
    { title: "Tạm trú là bắt buộc", titleEn: "Residence registration is required", content: "Người nước ngoài phải được chủ nhà khai báo tạm trú tại công an phường. Hãy hỏi rõ trước khi ký hợp đồng.", contentEn: "Foreigners must be registered with the local ward police by the landlord. Confirm this before signing." },
    { title: "Điện nước tính riêng", titleEn: "Utilities billed separately", content: "Giá thuê thường chưa gồm điện nước, internet và phí quản lý. Hãy hỏi đơn giá mỗi số điện.", contentEn: "Rent usually excludes electricity, water, internet and management fees. Ask the per-unit electricity rate." },
  ],
  practice: {
    type: "fill-blank",
    instruction: "Chọn từ đúng.",
    instructionEn: "Choose the correct word.",
    items: [
      { question: "Chị ___ chút được không?", questionEn: "Could you ___ a little?", options: ["bớt", "thêm", "trả"], answer: 0, explanation: "'Bớt' nghĩa là giảm giá.", explanationEn: "'Bớt' means to reduce the price." },
      { question: "___ em ký một năm thì giá rẻ hơn.", questionEn: "___ I sign for a year, the price is lower.", options: ["Nếu", "Vì", "Nhưng"], answer: 0, explanation: "Câu điều kiện dùng 'nếu ... thì'.", explanationEn: "Conditional sentences use 'nếu ... thì'." },
      { question: "Em phải ___ một tháng.", questionEn: "I must pay a ___ of one month.", options: ["đặt cọc", "đặt phòng", "đặt hàng"], answer: 0, explanation: "'Đặt cọc' là tiền bảo đảm.", explanationEn: "'Đặt cọc' is the security deposit." },
    ],
  },
};

const workLesson: DetailedLesson = {
  id: "vff-first-day-work",
  title: "Ngày đầu đi làm - Giới thiệu và xin việc nhỏ",
  titleEn: "First Day at Work - Introductions and Small Requests",
  icon: "💼",
  scenario: "Bạn bắt đầu công việc mới ở một công ty Việt Nam và làm quen đồng nghiệp.",
  scenarioEn: "You start a new job at a Vietnamese company and meet your colleagues.",
  dialogue: [
    { speaker: "Manager", speakerLabel: "Quản lý", vi: "Đây là bạn mới của phòng mình, em giới thiệu đi.", en: "This is our new team member - please introduce yourself." },
    { speaker: "You", speakerLabel: "Bạn", vi: "Em xin chào cả phòng. Em tên là Anna, em phụ trách dữ liệu.", en: "Hello everyone. My name is Anna and I'm in charge of data.", keyWords: [{ word: "phụ trách", pronunciation: "phụ trách", meaning: "to be in charge of", tone: "nang" }] },
    { speaker: "Colleague", speakerLabel: "Đồng nghiệp", vi: "Chào Anna, em ngồi cạnh anh nhé. Có gì cứ hỏi anh.", en: "Hi Anna, sit next to me. Ask me anything." },
    { speaker: "You", speakerLabel: "Bạn", vi: "Dạ vâng. Anh cho em hỏi giờ họp sáng là mấy giờ ạ?", en: "Thank you. May I ask what time the morning meeting is?" },
    { speaker: "Colleague", speakerLabel: "Đồng nghiệp", vi: "Chín giờ, họp nhanh mười lăm phút thôi.", en: "Nine o'clock, a quick fifteen-minute stand-up." },
    { speaker: "You", speakerLabel: "Bạn", vi: "Em cần xin tài khoản nội bộ thì gặp ai ạ?", en: "Who should I see about an internal account?" },
    { speaker: "Colleague", speakerLabel: "Đồng nghiệp", vi: "Em nhắn cho chị Lan bên IT, chị ấy làm nhanh lắm.", en: "Message Lan in IT - she's very quick." },
    { speaker: "You", speakerLabel: "Bạn", vi: "Buổi trưa mọi người ăn ở đâu ạ?", en: "Where does everyone have lunch?" },
    { speaker: "Colleague", speakerLabel: "Đồng nghiệp", vi: "Cả nhóm ăn cơm ở căng tin tầng một, em đi cùng nhé.", en: "The team eats at the first-floor canteen - come with us." },
    { speaker: "You", speakerLabel: "Bạn", vi: "Dạ, em cảm ơn anh nhiều ạ.", en: "Thank you very much." },
  ],
  grammarPoints: [
    {
      pattern: "Anh/chị cho em hỏi ...",
      patternEn: "Anh/chị cho em hỏi ... (May I ask ...)",
      explanation: "Cách mở đầu lịch sự khi hỏi đồng nghiệp lớn tuổi hơn hoặc cấp trên.",
      explanationEn: "A polite opener when asking an older colleague or a superior.",
      examples: [
        { vi: "Anh cho em hỏi giờ họp mấy giờ ạ?", en: "May I ask what time the meeting is?" },
        { vi: "Chị cho em hỏi hồ sơ này gửi ai ạ?", en: "May I ask who this file goes to?" },
      ],
    },
    {
      pattern: "cứ + động từ",
      patternEn: "cứ + verb (go ahead and ...)",
      explanation: "'Cứ' khuyến khích người nghe làm việc gì mà không cần e dè.",
      explanationEn: "'Cứ' encourages the listener to go ahead without hesitation.",
      examples: [
        { vi: "Có gì cứ hỏi anh.", en: "Go ahead and ask me anything." },
        { vi: "Em cứ dùng máy này.", en: "Feel free to use this machine." },
      ],
    },
  ],
  culturalNotes: [
    { title: "Gọi anh/chị thay vì tên", titleEn: "Use anh/chị, not bare names", content: "Ở công ty Việt Nam, gọi 'anh Nam', 'chị Lan' thân thiện và tôn trọng hơn gọi tên trơn.", contentEn: "In Vietnamese offices, 'anh Nam' or 'chị Lan' sounds warmer and more respectful than a bare first name." },
    { title: "Bữa trưa là lúc gắn kết", titleEn: "Lunch is bonding time", content: "Đi ăn trưa cùng nhóm là cách nhanh nhất để hoà nhập. Từ chối nhiều lần có thể bị coi là xa cách.", contentEn: "Joining team lunches is the fastest way to fit in; repeatedly declining can seem distant." },
  ],
  practice: {
    type: "fill-blank",
    instruction: "Hoàn thành câu cho phù hợp.",
    instructionEn: "Complete the sentence appropriately.",
    items: [
      { question: "Anh ___ em hỏi giờ họp ạ?", questionEn: "May I ___ about the meeting time?", options: ["cho", "làm", "đưa"], answer: 0, explanation: "Mẫu lịch sự: 'cho em hỏi'.", explanationEn: "Polite pattern: 'cho em hỏi'." },
      { question: "Có gì ___ hỏi anh.", questionEn: "Go ahead and ask me anything.", options: ["cứ", "đã", "vẫn"], answer: 0, explanation: "'Cứ' mang nghĩa khuyến khích.", explanationEn: "'Cứ' has an encouraging sense." },
      { question: "Em ___ dữ liệu của phòng.", questionEn: "I'm ___ the team's data.", options: ["phụ trách", "phụ huynh", "phụ kiện"], answer: 0, explanation: "'Phụ trách' là chịu trách nhiệm.", explanationEn: "'Phụ trách' means to be responsible for." },
    ],
  },
};

const deliveryLesson: DetailedLesson = {
  id: "vff-post-delivery",
  title: "Bưu điện và giao hàng - Nhận, gửi, khiếu nại",
  titleEn: "Post and Delivery - Sending, Receiving, Complaining",
  icon: "📦",
  scenario: "Bạn gửi một bưu kiện về nước và xử lý một đơn giao hàng bị chậm.",
  scenarioEn: "You send a parcel home and deal with a delayed delivery order.",
  dialogue: [
    { speaker: "You", speakerLabel: "Bạn", vi: "Em muốn gửi bưu kiện này sang Phần Lan ạ.", en: "I'd like to send this parcel to Finland.", keyWords: [{ word: "bưu kiện", pronunciation: "bưu kiện", meaning: "parcel", tone: "nang" }] },
    { speaker: "Clerk", speakerLabel: "Nhân viên", vi: "Trong đó có gì anh? Có đồ ăn hay pin không?", en: "What's inside? Any food or batteries?" },
    { speaker: "You", speakerLabel: "Bạn", vi: "Chỉ có quần áo và một hộp trà thôi ạ.", en: "Just clothes and a box of tea." },
    { speaker: "Clerk", speakerLabel: "Nhân viên", vi: "Gửi nhanh bảy ngày hay tiết kiệm ba tuần anh?", en: "Express in seven days or economy in three weeks?" },
    { speaker: "You", speakerLabel: "Bạn", vi: "Cho em gửi nhanh. Phí bao nhiêu ạ?", en: "Express, please. How much is it?" },
    { speaker: "Clerk", speakerLabel: "Nhân viên", vi: "Một triệu hai. Anh điền tên và địa chỉ người nhận vào đây.", en: "One million two. Fill in the recipient's name and address here.", keyWords: [{ word: "người nhận", pronunciation: "người nhận", meaning: "recipient", tone: "nang" }] },
    { speaker: "You", speakerLabel: "Bạn", vi: "Em tra mã vận đơn ở đâu ạ?", en: "Where can I track the shipment?", keyWords: [{ word: "mã vận đơn", pronunciation: "mã vận đơn", meaning: "tracking number", tone: "nga" }] },
    { speaker: "Clerk", speakerLabel: "Nhân viên", vi: "Anh nhập mã trên biên nhận vào trang web của bưu điện.", en: "Enter the code on your receipt on the post office website." },
    { speaker: "You", speakerLabel: "Bạn", vi: "Còn đơn hàng hôm qua của em bị chậm, em khiếu nại thế nào ạ?", en: "My order from yesterday is late - how do I file a complaint?" },
    { speaker: "Clerk", speakerLabel: "Nhân viên", vi: "Anh gọi tổng đài, đọc mã đơn, họ sẽ kiểm tra và gọi lại.", en: "Call the hotline, give the order code, and they'll check and call you back." },
  ],
  grammarPoints: [
    {
      pattern: "Cho em + động từ",
      patternEn: "Cho em + verb (let me / I'll take)",
      explanation: "Dùng khi đặt hàng hoặc yêu cầu dịch vụ, nghe nhẹ nhàng hơn 'tôi muốn'.",
      explanationEn: "Used when ordering or requesting a service; softer than 'tôi muốn'.",
      examples: [
        { vi: "Cho em gửi nhanh.", en: "I'll take express shipping." },
        { vi: "Cho em xin biên nhận.", en: "Please give me the receipt." },
      ],
    },
    {
      pattern: "bị + tính từ/động từ",
      patternEn: "bị + adjective/verb (negative passive)",
      explanation: "'Bị' dùng cho việc không mong muốn: bị chậm, bị mất, bị hỏng.",
      explanationEn: "'Bị' marks unwanted events: delayed, lost, broken.",
      examples: [
        { vi: "Đơn hàng bị chậm.", en: "The order is delayed." },
        { vi: "Bưu kiện bị mất.", en: "The parcel was lost." },
      ],
    },
  ],
  culturalNotes: [
    { title: "Gọi trước khi giao", titleEn: "A call before delivery", content: "Người giao hàng thường gọi điện trước vài phút. Hãy chuẩn bị một câu ngắn: 'Anh để ở cổng giúp em nhé.'", contentEn: "Couriers usually call a few minutes ahead. Keep a short line ready: 'Please leave it at the gate.'" },
    { title: "Thanh toán khi nhận", titleEn: "Cash on delivery", content: "COD rất phổ biến. Nên có tiền lẻ vì người giao hàng ít khi đủ tiền thối.", contentEn: "COD is very common. Keep small notes, as couriers rarely carry change." },
  ],
  practice: {
    type: "fill-blank",
    instruction: "Điền từ thích hợp.",
    instructionEn: "Fill in the suitable word.",
    items: [
      { question: "Đơn hàng của em ___ chậm.", questionEn: "My order ___ delayed.", options: ["bị", "được", "có"], answer: 0, explanation: "'Bị' dùng cho việc không mong muốn.", explanationEn: "'Bị' marks an unwanted event." },
      { question: "___ em gửi nhanh ạ.", questionEn: "___ me take express shipping.", options: ["Cho", "Bán", "Lấy"], answer: 0, explanation: "'Cho em ...' là cách yêu cầu lịch sự.", explanationEn: "'Cho em ...' is a polite request." },
      { question: "Em tra ___ ở đâu ạ?", questionEn: "Where do I check the ___?", options: ["mã vận đơn", "người nhận", "biên nhận"], answer: 0, explanation: "Mã vận đơn dùng để theo dõi đơn.", explanationEn: "The tracking number is used to follow the shipment." },
    ],
  },
};

const guestLesson: DetailedLesson = {
  id: "vff-inviting-guests",
  title: "Mời bạn về nhà - Làm chủ nhà kiểu Việt",
  titleEn: "Inviting Friends Home - Hosting the Vietnamese Way",
  icon: "🏡",
  scenario: "Bạn mời đồng nghiệp Việt đến nhà ăn cơm và học cách mời, gắp, tiễn khách.",
  scenarioEn: "You invite Vietnamese colleagues home for a meal and learn to invite, serve and see guests off.",
  dialogue: [
    { speaker: "You", speakerLabel: "Bạn", vi: "Chủ nhật này anh chị đến nhà em ăn cơm nhé.", en: "Come over for a meal at my place this Sunday." },
    { speaker: "Guest", speakerLabel: "Khách", vi: "Ôi quý hoá quá. Em mang gì đến được không?", en: "How lovely. Can I bring something?" },
    { speaker: "You", speakerLabel: "Bạn", vi: "Anh chị đến là vui rồi, không cần mang gì đâu.", en: "Just coming is enough - no need to bring anything." },
    { speaker: "Guest", speakerLabel: "Khách", vi: "Vậy em mang ít trái cây thôi nhé.", en: "Then I'll just bring some fruit." },
    { speaker: "You", speakerLabel: "Bạn", vi: "Mời anh chị vào nhà, mời ngồi ạ.", en: "Please come in and have a seat.", keyWords: [{ word: "mời", pronunciation: "mời", meaning: "to invite / please", tone: "huyen" }] },
    { speaker: "Guest", speakerLabel: "Khách", vi: "Nhà em gọn gàng quá!", en: "Your place is so tidy!" },
    { speaker: "You", speakerLabel: "Bạn", vi: "Em mời cả nhà ăn cơm. Anh chị dùng thêm canh nhé.", en: "Please start eating. Have some more soup." },
    { speaker: "Guest", speakerLabel: "Khách", vi: "Cảm ơn em, em nấu ngon thật đấy.", en: "Thank you - you really cook well." },
    { speaker: "You", speakerLabel: "Bạn", vi: "Anh chị ăn thêm chút nữa đi, còn nhiều mà.", en: "Do have a bit more, there's plenty." },
    { speaker: "Guest", speakerLabel: "Khách", vi: "Em no rồi. Hôm nào đến nhà anh chị chơi nhé.", en: "I'm full. Come visit us next time." },
  ],
  grammarPoints: [
    {
      pattern: "Mời + người + động từ",
      patternEn: "Mời + person + verb (polite invitation)",
      explanation: "'Mời' mở đầu lời mời trang trọng, dùng cả khi mời vào nhà, mời ngồi, mời ăn.",
      explanationEn: "'Mời' opens a formal invitation - to enter, to sit, to eat.",
      examples: [
        { vi: "Mời anh chị vào nhà.", en: "Please come in." },
        { vi: "Em mời cả nhà ăn cơm.", en: "Please everyone, let's eat." },
      ],
    },
    {
      pattern: "... đi / ... nhé",
      patternEn: "... đi / ... nhé (softening suggestions)",
      explanation: "'Đi' thúc nhẹ, 'nhé' làm câu thân mật và mềm hơn khi mời hoặc đề nghị.",
      explanationEn: "'Đi' gently urges; 'nhé' makes an invitation friendly and soft.",
      examples: [
        { vi: "Anh ăn thêm chút nữa đi.", en: "Do have a bit more." },
        { vi: "Chủ nhật anh chị đến nhé.", en: "Please come on Sunday." },
      ],
    },
  ],
  culturalNotes: [
    { title: "Mời trước khi ăn", titleEn: "Invite before eating", content: "Người nhỏ tuổi thường mời cả bàn trước khi bắt đầu: 'Con mời cả nhà ăn cơm.' Bỏ qua câu này bị coi là thiếu lễ.", contentEn: "The youngest usually invites the table before starting: 'Con mời cả nhà ăn cơm.' Skipping it looks impolite." },
    { title: "Khách mang quà nhỏ", titleEn: "Guests bring a small gift", content: "Khách hay mang trái cây, bánh hoặc trà. Chủ nhà nhận bằng hai tay và không mở quà ngay.", contentEn: "Guests often bring fruit, cake or tea. Hosts receive it with both hands and do not open it immediately." },
  ],
  practice: {
    type: "fill-blank",
    instruction: "Chọn cách nói phù hợp.",
    instructionEn: "Choose the appropriate expression.",
    items: [
      { question: "___ anh chị vào nhà.", questionEn: "___ come in.", options: ["Mời", "Cho", "Bảo"], answer: 0, explanation: "'Mời' dùng cho lời mời trang trọng.", explanationEn: "'Mời' is used for polite invitations." },
      { question: "Anh ăn thêm chút nữa ___.", questionEn: "Do have a bit more ___.", options: ["đi", "à", "chứ"], answer: 0, explanation: "'Đi' thúc nhẹ người nghe.", explanationEn: "'Đi' gently urges the listener." },
      { question: "Chủ nhật anh chị đến ___.", questionEn: "Please come on Sunday ___.", options: ["nhé", "không", "rồi"], answer: 0, explanation: "'Nhé' làm lời mời thân mật hơn.", explanationEn: "'Nhé' makes the invitation friendlier." },
    ],
  },
};

const cityLifeModule: DetailedModule = {
  id: "vff-city-life-v10",
  title: "Sống ở thành phố - Thủ tục và quan hệ",
  titleEn: "City Life - Paperwork and Relationships",
  icon: "🏙️",
  color: "from-sky-500 to-indigo-600",
  description: "Năm tình huống thực tế: ngân hàng, thuê nhà, ngày đầu đi làm, bưu kiện và mời khách về nhà.",
  descriptionEn: "Five real-life scenarios: the bank, renting, your first day at work, parcels and hosting guests.",
  lessons: [bankLesson, rentLesson, workLesson, deliveryLesson, guestLesson],
};

detailedVFFModules.push(cityLifeModule);

export const detailedVFFExpansionV10Count = cityLifeModule.lessons.length;
