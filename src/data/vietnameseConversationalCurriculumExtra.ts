// Additional Vietnamese interactive curriculum lessons (4 per pillar), same structure as the base lessons.
import type { VnConvLesson } from "./vietnameseConversationalCurriculum";

export const vietnameseExtraLessons: Record<string, VnConvLesson[]> = {
  "daily-life": [
    {
      id: "vn-dl-05-family", title: "Family & Relationships", titleVi: "Gia đình & Quan hệ", icon: "Users", level: "A1",
      description: "Talk about your family members and ask about others.",
      situations: [
        {
          title: "Showing a Family Photo", description: "Explaining who is who in a photo.",
          culturalNote: "Vietnamese uses different words for relatives on the father's side (nội) and the mother's side (ngoại).",
          dialogue: [
            { speaker: "Hoa", line: "Đây là ảnh gia đình mình.", en: "This is my family photo." },
            { speaker: "Tom", line: "Nhà bạn có mấy người?", en: "How many people are in your family?" },
            { speaker: "Hoa", line: "Nhà mình có năm người: bố, mẹ, anh trai, em gái và mình.", en: "Five: dad, mum, older brother, younger sister and me." },
            { speaker: "Tom", line: "Anh trai bạn làm nghề gì?", en: "What does your brother do?" },
            { speaker: "Hoa", line: "Anh ấy là bác sĩ.", en: "He is a doctor." },
          ],
        },
        {
          title: "Visiting Grandparents", description: "Talking about a weekend visit.",
          dialogue: [
            { speaker: "Minh", line: "Cuối tuần này cậu làm gì?", en: "What are you doing this weekend?" },
            { speaker: "Nam", line: "Mình về quê thăm ông bà ngoại.", en: "I'm going home to visit my maternal grandparents." },
            { speaker: "Minh", line: "Ông bà cậu sống ở đâu?", en: "Where do they live?" },
            { speaker: "Nam", line: "Ông bà sống ở Nam Định.", en: "They live in Nam Dinh." },
          ],
        },
      ],
      vocabulary: [
        { vi: "gia đình", en: "family", example: "Gia đình tôi rất vui vẻ.", exampleEn: "My family is very cheerful." },
        { vi: "bố mẹ", en: "parents", example: "Bố mẹ tôi là giáo viên.", exampleEn: "My parents are teachers." },
        { vi: "anh trai", en: "older brother", example: "Anh trai tôi 30 tuổi.", exampleEn: "My older brother is 30." },
        { vi: "em gái", en: "younger sister", example: "Em gái tôi còn đi học.", exampleEn: "My younger sister is still at school." },
        { vi: "ông bà", en: "grandparents", example: "Ông bà sống cùng chúng tôi.", exampleEn: "My grandparents live with us." },
        { vi: "làm nghề gì", en: "what job", example: "Chị làm nghề gì?", exampleEn: "What do you do?" },
      ],
      structures: [
        { pattern: "Nhà + [subject] + có + mấy + người?", explanation: "Ask about family size.", examples: [{ vi: "Nhà anh có mấy người?", en: "How many people are in your family?" }, { vi: "Nhà em có bốn người.", en: "There are four people in my family." }] },
        { pattern: "[Subject] + làm nghề gì?", explanation: "Ask about someone's job.", examples: [{ vi: "Bố bạn làm nghề gì?", en: "What does your dad do?" }, { vi: "Mẹ tôi làm y tá.", en: "My mum is a nurse." }] },
      ],
      quiz: [
        { q: "'Em gái' means...", options: ["Older sister", "Younger sister", "Mother", "Aunt"], answer: 1 },
        { q: "Grandparents on the mother's side are...", options: ["ông bà nội", "ông bà ngoại", "bố mẹ", "cô chú"], answer: 1 },
        { q: "'Nhà bạn có mấy người?' asks about...", options: ["Your address", "Family size", "Your job", "Your age"], answer: 1 },
        { q: "'Làm nghề gì?' means...", options: ["Where do you live?", "What is your job?", "How old are you?", "What's your name?"], answer: 1 },
      ],
    },
    {
      id: "vn-dl-06-time", title: "Time & Daily Routine", titleVi: "Thời gian & Sinh hoạt", icon: "Clock", level: "A1",
      description: "Tell the time and describe your daily schedule.",
      situations: [
        {
          title: "What Time Is It?", description: "Asking a stranger for the time.",
          dialogue: [
            { speaker: "Khách", line: "Xin lỗi, bây giờ là mấy giờ ạ?", en: "Excuse me, what time is it?" },
            { speaker: "Người đi đường", line: "Bây giờ là tám giờ kém mười lăm.", en: "It's a quarter to eight." },
            { speaker: "Khách", line: "Cảm ơn anh. Em sắp muộn rồi!", en: "Thanks. I'm about to be late!" },
          ],
        },
        {
          title: "My Morning", description: "Describing a daily routine.",
          culturalNote: "Many Vietnamese people start early: markets open around 5 a.m. and lunch is often around 11:30.",
          dialogue: [
            { speaker: "Lan", line: "Bạn thường dậy lúc mấy giờ?", en: "What time do you usually get up?" },
            { speaker: "Mai", line: "Mình thường dậy lúc sáu giờ sáng.", en: "I usually get up at 6 a.m." },
            { speaker: "Lan", line: "Sau đó bạn làm gì?", en: "What do you do after that?" },
            { speaker: "Mai", line: "Mình tập thể dục, ăn sáng rồi đi làm.", en: "I exercise, have breakfast, then go to work." },
          ],
        },
      ],
      vocabulary: [
        { vi: "mấy giờ", en: "what time", example: "Mấy giờ chúng ta đi?", exampleEn: "What time do we leave?" },
        { vi: "kém", en: "to (minutes before)", example: "Chín giờ kém năm.", exampleEn: "Five to nine." },
        { vi: "rưỡi", en: "half past", example: "Bảy giờ rưỡi.", exampleEn: "Half past seven." },
        { vi: "thường", en: "usually", example: "Tôi thường uống cà phê.", exampleEn: "I usually drink coffee." },
        { vi: "dậy", en: "to get up", example: "Hôm nay tôi dậy muộn.", exampleEn: "I got up late today." },
        { vi: "muộn", en: "late", example: "Xin lỗi, tôi đến muộn.", exampleEn: "Sorry, I'm late." },
      ],
      structures: [
        { pattern: "[Hour] + giờ + kém / rưỡi", explanation: "Tell the time.", examples: [{ vi: "Mười giờ rưỡi.", en: "Half past ten." }, { vi: "Sáu giờ kém mười.", en: "Ten to six." }] },
        { pattern: "[Action 1], rồi + [action 2]", explanation: "Sequence of actions (then).", examples: [{ vi: "Tôi ăn sáng rồi đi học.", en: "I have breakfast, then go to school." }] },
      ],
      quiz: [
        { q: "'Bảy giờ rưỡi' is...", options: ["7:00", "7:15", "7:30", "6:30"], answer: 2 },
        { q: "'Tám giờ kém mười lăm' is...", options: ["8:15", "7:45", "8:45", "7:15"], answer: 1 },
        { q: "'Thường' means...", options: ["Never", "Usually", "Today", "Late"], answer: 1 },
        { q: "Which word links actions as 'then'?", options: ["rồi", "nhưng", "hay", "vì"], answer: 0 },
      ],
    },
    {
      id: "vn-dl-07-health", title: "At the Doctor", titleVi: "Đi khám bệnh", icon: "Stethoscope", level: "A2",
      description: "Describe symptoms and understand simple medical advice.",
      situations: [
        {
          title: "At the Clinic", description: "Explaining symptoms to a doctor.",
          dialogue: [
            { speaker: "Bác sĩ", line: "Chị bị làm sao?", en: "What's wrong?" },
            { speaker: "Bệnh nhân", line: "Tôi bị đau đầu và sốt từ hôm qua.", en: "I've had a headache and fever since yesterday." },
            { speaker: "Bác sĩ", line: "Chị có bị ho không?", en: "Do you have a cough?" },
            { speaker: "Bệnh nhân", line: "Có, tôi ho nhiều vào buổi tối.", en: "Yes, I cough a lot in the evening." },
            { speaker: "Bác sĩ", line: "Chị bị cảm rồi. Uống thuốc này ngày ba lần nhé.", en: "You have a cold. Take this medicine three times a day." },
          ],
        },
        {
          title: "At the Pharmacy", description: "Buying medicine.",
          culturalNote: "Pharmacies (nhà thuốc) are everywhere in Vietnam and pharmacists often give basic advice.",
          dialogue: [
            { speaker: "Khách", line: "Chị ơi, em muốn mua thuốc đau bụng.", en: "I'd like some medicine for a stomach ache." },
            { speaker: "Dược sĩ", line: "Em uống thuốc này sau khi ăn nhé.", en: "Take this after meals." },
            { speaker: "Khách", line: "Một ngày uống mấy viên ạ?", en: "How many pills a day?" },
            { speaker: "Dược sĩ", line: "Mỗi lần một viên, ngày hai lần.", en: "One pill each time, twice a day." },
          ],
        },
      ],
      vocabulary: [
        { vi: "đau đầu", en: "headache", example: "Tôi hay bị đau đầu.", exampleEn: "I often get headaches." },
        { vi: "sốt", en: "fever", example: "Con tôi bị sốt cao.", exampleEn: "My child has a high fever." },
        { vi: "ho", en: "to cough", example: "Anh ấy ho suốt đêm.", exampleEn: "He coughed all night." },
        { vi: "bị cảm", en: "to have a cold", example: "Trời lạnh nên tôi bị cảm.", exampleEn: "It's cold so I caught a cold." },
        { vi: "thuốc", en: "medicine", example: "Nhớ uống thuốc đúng giờ.", exampleEn: "Remember to take your medicine on time." },
        { vi: "nhà thuốc", en: "pharmacy", example: "Nhà thuốc ở gần đây.", exampleEn: "The pharmacy is nearby." },
      ],
      structures: [
        { pattern: "[Subject] + bị + [symptom]", explanation: "'bị' is used for bad things that happen to you.", examples: [{ vi: "Tôi bị đau răng.", en: "I have a toothache." }, { vi: "Em bị ốm.", en: "I'm sick." }] },
        { pattern: "Ngày + [number] + lần", explanation: "Frequency per day.", examples: [{ vi: "Uống ngày hai lần.", en: "Take twice a day." }] },
      ],
      quiz: [
        { q: "'Sốt' means...", options: ["Cough", "Fever", "Headache", "Medicine"], answer: 1 },
        { q: "Which verb is used with symptoms?", options: ["được", "bị", "có thể", "đi"], answer: 1 },
        { q: "'Ngày ba lần' means...", options: ["Three days", "Three times a day", "Every three days", "Three pills"], answer: 1 },
        { q: "Where do you buy medicine?", options: ["Nhà hàng", "Nhà thuốc", "Nhà sách", "Ngân hàng"], answer: 1 },
      ],
    },
    {
      id: "vn-dl-08-housing", title: "Renting a Room", titleVi: "Thuê nhà", icon: "Home", level: "B1",
      description: "Ask about rooms, rent, bills and house rules.",
      situations: [
        {
          title: "Viewing a Room", description: "Talking to a landlord.",
          culturalNote: "Landlords usually ask for one or two months' deposit (tiền cọc). Electricity is often charged per kWh separately.",
          dialogue: [
            { speaker: "Người thuê", line: "Chào cô, cháu gọi hỏi về phòng cho thuê ạ.", en: "Hello, I called about the room for rent." },
            { speaker: "Chủ nhà", line: "Phòng này rộng hai mươi mét vuông, có điều hòa.", en: "This room is 20 square metres with air conditioning." },
            { speaker: "Người thuê", line: "Tiền thuê một tháng bao nhiêu ạ?", en: "How much is the monthly rent?" },
            { speaker: "Chủ nhà", line: "Bốn triệu, chưa bao gồm điện nước.", en: "Four million, not including electricity and water." },
            { speaker: "Người thuê", line: "Cháu phải đặt cọc bao nhiêu ạ?", en: "How much deposit do I need to pay?" },
            { speaker: "Chủ nhà", line: "Đặt cọc một tháng nhé.", en: "One month's deposit." },
          ],
        },
        {
          title: "House Rules", description: "Asking about rules.",
          dialogue: [
            { speaker: "Người thuê", line: "Ở đây có giờ giới nghiêm không ạ?", en: "Is there a curfew here?" },
            { speaker: "Chủ nhà", line: "Cổng đóng lúc mười một giờ đêm.", en: "The gate closes at 11 p.m." },
            { speaker: "Người thuê", line: "Cháu có được nấu ăn trong phòng không?", en: "Am I allowed to cook in the room?" },
            { speaker: "Chủ nhà", line: "Được, nhưng phải giữ vệ sinh chung.", en: "Yes, but keep shared areas clean." },
          ],
        },
      ],
      vocabulary: [
        { vi: "thuê", en: "to rent", example: "Tôi muốn thuê căn hộ.", exampleEn: "I want to rent an apartment." },
        { vi: "tiền cọc", en: "deposit", example: "Tiền cọc là hai tháng.", exampleEn: "The deposit is two months." },
        { vi: "điện nước", en: "utilities", example: "Tiền điện nước tính riêng.", exampleEn: "Utilities are charged separately." },
        { vi: "bao gồm", en: "to include", example: "Giá đã bao gồm internet.", exampleEn: "The price includes internet." },
        { vi: "hợp đồng", en: "contract", example: "Hợp đồng thuê sáu tháng.", exampleEn: "A six-month lease." },
        { vi: "chủ nhà", en: "landlord", example: "Chủ nhà rất thân thiện.", exampleEn: "The landlord is very friendly." },
      ],
      structures: [
        { pattern: "chưa bao gồm + [item]", explanation: "Not yet including.", examples: [{ vi: "Giá chưa bao gồm thuế.", en: "The price excludes tax." }] },
        { pattern: "[Subject] + có được + [verb] + không?", explanation: "Ask for permission.", examples: [{ vi: "Tôi có được nuôi mèo không?", en: "Can I keep a cat?" }] },
      ],
      quiz: [
        { q: "'Tiền cọc' means...", options: ["Rent", "Deposit", "Tax", "Bill"], answer: 1 },
        { q: "'Chưa bao gồm điện nước' means...", options: ["Utilities included", "Utilities not included", "No electricity", "Free water"], answer: 1 },
        { q: "'Có được ... không?' asks for...", options: ["Price", "Permission", "Time", "Location"], answer: 1 },
        { q: "'Hợp đồng' means...", options: ["Contract", "Key", "Room", "Gate"], answer: 0 },
      ],
    },
  ],
  business: [
    {
      id: "vn-bz-05-email", title: "Emails & Messages", titleVi: "Email & Tin nhắn công việc", icon: "Mail", level: "B1",
      description: "Write and discuss polite work emails and Zalo messages.",
      situations: [
        {
          title: "Following Up an Email", description: "Checking if a colleague received an email.",
          culturalNote: "Zalo is the most popular messaging app for work in Vietnam. Start messages with a polite greeting.",
          dialogue: [
            { speaker: "Hà", line: "Chị Thu ơi, chị đã nhận được email của em chưa ạ?", en: "Thu, have you received my email?" },
            { speaker: "Thu", line: "Chị nhận rồi, nhưng chưa kịp đọc.", en: "I got it but haven't had time to read it." },
            { speaker: "Hà", line: "Dạ, chị phản hồi giúp em trước thứ Sáu nhé.", en: "Please reply before Friday." },
            { speaker: "Thu", line: "Ừ, chị sẽ gửi lại trong chiều nay.", en: "OK, I'll reply this afternoon." },
          ],
        },
        {
          title: "Attaching a File", description: "Asking for a missing attachment.",
          dialogue: [
            { speaker: "Khách hàng", line: "Anh ơi, email không có file đính kèm.", en: "Your email has no attachment." },
            { speaker: "Nhân viên", line: "Xin lỗi anh, em gửi lại ngay ạ.", en: "Sorry, I'll resend it right away." },
            { speaker: "Khách hàng", line: "Anh gửi qua Zalo luôn cũng được.", en: "You can send it via Zalo too." },
          ],
        },
      ],
      vocabulary: [
        { vi: "nhận được", en: "to receive", example: "Tôi đã nhận được hàng.", exampleEn: "I have received the goods." },
        { vi: "phản hồi", en: "to respond", example: "Cảm ơn anh đã phản hồi.", exampleEn: "Thanks for your reply." },
        { vi: "file đính kèm", en: "attachment", example: "Vui lòng xem file đính kèm.", exampleEn: "Please see the attachment." },
        { vi: "gửi lại", en: "to resend", example: "Em gửi lại báo cáo nhé.", exampleEn: "I'll resend the report." },
        { vi: "trước", en: "before", example: "Nộp trước thứ Hai.", exampleEn: "Submit before Monday." },
        { vi: "vui lòng", en: "please (formal)", example: "Vui lòng xác nhận.", exampleEn: "Please confirm." },
      ],
      structures: [
        { pattern: "[Subject] + đã + [verb] + chưa?", explanation: "Ask if something has been done yet.", examples: [{ vi: "Anh đã ký chưa?", en: "Have you signed yet?" }, { vi: "Chị đã gửi chưa?", en: "Have you sent it yet?" }] },
        { pattern: "Vui lòng + [verb]", explanation: "Formal request in writing.", examples: [{ vi: "Vui lòng trả lời email này.", en: "Please reply to this email." }] },
      ],
      quiz: [
        { q: "'File đính kèm' means...", options: ["Signature", "Attachment", "Subject line", "Inbox"], answer: 1 },
        { q: "'Đã ... chưa?' asks...", options: ["Will you?", "Have you ... yet?", "Can you?", "Why?"], answer: 1 },
        { q: "'Vui lòng' is used in...", options: ["Casual chat", "Formal requests", "Complaints only", "Greetings"], answer: 1 },
        { q: "'Phản hồi' means...", options: ["To respond", "To forward", "To delete", "To print"], answer: 0 },
      ],
    },
    {
      id: "vn-bz-06-presentation", title: "Giving a Presentation", titleVi: "Thuyết trình", icon: "Presentation", level: "B1",
      description: "Open, structure and close a short work presentation.",
      situations: [
        {
          title: "Opening the Talk", description: "Introducing a presentation.",
          dialogue: [
            { speaker: "Người trình bày", line: "Kính thưa quý vị, hôm nay tôi xin trình bày về kết quả quý ba.", en: "Ladies and gentlemen, today I'll present the Q3 results." },
            { speaker: "Người trình bày", line: "Bài trình bày gồm ba phần chính.", en: "The presentation has three main parts." },
            { speaker: "Người trình bày", line: "Đầu tiên là doanh thu, tiếp theo là chi phí, cuối cùng là kế hoạch.", en: "First revenue, next costs, finally plans." },
          ],
        },
        {
          title: "Handling Questions", description: "Taking questions at the end.",
          culturalNote: "Audiences may be quiet; inviting questions warmly and thanking each asker helps.",
          dialogue: [
            { speaker: "Người trình bày", line: "Quý vị có câu hỏi nào không ạ?", en: "Are there any questions?" },
            { speaker: "Đồng nghiệp", line: "Anh có thể giải thích thêm về biểu đồ này không?", en: "Could you explain this chart further?" },
            { speaker: "Người trình bày", line: "Cảm ơn câu hỏi của chị. Biểu đồ cho thấy doanh thu tăng mười phần trăm.", en: "Thanks for the question. The chart shows revenue rose 10%." },
          ],
        },
      ],
      vocabulary: [
        { vi: "trình bày", en: "to present", example: "Tôi sẽ trình bày ý tưởng.", exampleEn: "I will present the idea." },
        { vi: "doanh thu", en: "revenue", example: "Doanh thu năm nay tăng.", exampleEn: "Revenue rose this year." },
        { vi: "chi phí", en: "costs", example: "Chúng ta cần giảm chi phí.", exampleEn: "We need to cut costs." },
        { vi: "biểu đồ", en: "chart", example: "Mời xem biểu đồ sau.", exampleEn: "Please see the following chart." },
        { vi: "tăng", en: "to increase", example: "Giá xăng tăng.", exampleEn: "Fuel prices increased." },
        { vi: "kế hoạch", en: "plan", example: "Kế hoạch năm sau rất rõ.", exampleEn: "Next year's plan is clear." },
      ],
      structures: [
        { pattern: "Đầu tiên..., tiếp theo..., cuối cùng...", explanation: "Signpost the order of ideas.", examples: [{ vi: "Đầu tiên, tôi giới thiệu nhóm.", en: "First, I'll introduce the team." }] },
        { pattern: "[Chart] + cho thấy + [finding]", explanation: "Describe data.", examples: [{ vi: "Số liệu cho thấy khách hàng hài lòng.", en: "The data shows customers are satisfied." }] },
      ],
      quiz: [
        { q: "'Doanh thu' means...", options: ["Costs", "Revenue", "Profit loss", "Budget"], answer: 1 },
        { q: "Which word means 'finally'?", options: ["Đầu tiên", "Tiếp theo", "Cuối cùng", "Sau đó"], answer: 2 },
        { q: "'Cho thấy' means...", options: ["To show", "To hide", "To ask", "To sell"], answer: 0 },
        { q: "A formal opening to an audience is...", options: ["Ê các bạn", "Kính thưa quý vị", "Chào em", "Alo"], answer: 1 },
      ],
    },
    {
      id: "vn-bz-07-customer", title: "Customer Service", titleVi: "Chăm sóc khách hàng", icon: "Headphones", level: "B1",
      description: "Handle complaints politely and offer solutions.",
      situations: [
        {
          title: "A Late Delivery", description: "A customer complains about a delayed order.",
          dialogue: [
            { speaker: "Khách hàng", line: "Tôi đặt hàng một tuần rồi mà vẫn chưa nhận được.", en: "I ordered a week ago and still haven't received it." },
            { speaker: "Nhân viên", line: "Dạ, em rất xin lỗi anh về sự bất tiện này.", en: "I'm very sorry for the inconvenience." },
            { speaker: "Nhân viên", line: "Anh cho em xin mã đơn hàng để kiểm tra ạ.", en: "May I have your order number to check?" },
            { speaker: "Khách hàng", line: "Mã đơn là VN1024.", en: "The order number is VN1024." },
            { speaker: "Nhân viên", line: "Đơn của anh sẽ được giao vào ngày mai, và bên em miễn phí vận chuyển ạ.", en: "It will be delivered tomorrow, and shipping is free." },
          ],
        },
        {
          title: "Returning a Product", description: "Asking for an exchange.",
          dialogue: [
            { speaker: "Khách hàng", line: "Sản phẩm bị lỗi, tôi muốn đổi cái khác.", en: "The product is faulty, I want an exchange." },
            { speaker: "Nhân viên", line: "Dạ được ạ. Chị còn giữ hóa đơn không?", en: "Of course. Do you still have the receipt?" },
            { speaker: "Khách hàng", line: "Có, hóa đơn đây.", en: "Yes, here it is." },
          ],
        },
      ],
      vocabulary: [
        { vi: "đặt hàng", en: "to order", example: "Tôi đặt hàng trên mạng.", exampleEn: "I ordered online." },
        { vi: "bất tiện", en: "inconvenience", example: "Xin lỗi vì sự bất tiện.", exampleEn: "Sorry for the inconvenience." },
        { vi: "mã đơn hàng", en: "order number", example: "Vui lòng cung cấp mã đơn hàng.", exampleEn: "Please provide your order number." },
        { vi: "bị lỗi", en: "faulty", example: "Máy này bị lỗi.", exampleEn: "This machine is faulty." },
        { vi: "đổi", en: "to exchange", example: "Tôi muốn đổi size.", exampleEn: "I want to change the size." },
        { vi: "hóa đơn", en: "receipt / invoice", example: "Cho tôi xin hóa đơn.", exampleEn: "Could I have the receipt?" },
      ],
      structures: [
        { pattern: "[Clause] + mà vẫn chưa + [verb]", explanation: "Express frustration: but still not yet.", examples: [{ vi: "Tôi gọi ba lần mà vẫn chưa ai nghe.", en: "I called three times and still no one answered." }] },
        { pattern: "Cho em xin + [item]", explanation: "Very polite request.", examples: [{ vi: "Cho em xin số điện thoại.", en: "May I have your phone number?" }] },
      ],
      quiz: [
        { q: "'Xin lỗi vì sự bất tiện' means...", options: ["Thank you for waiting", "Sorry for the inconvenience", "Please wait", "Goodbye"], answer: 1 },
        { q: "'Hóa đơn' means...", options: ["Receipt", "Refund", "Product", "Discount"], answer: 0 },
        { q: "'Cho em xin...' is...", options: ["Rude", "A polite request", "A complaint", "An apology"], answer: 1 },
        { q: "'Bị lỗi' describes a product that is...", options: ["New", "Faulty", "Cheap", "Popular"], answer: 1 },
      ],
    },
    {
      id: "vn-bz-08-teamwork", title: "Teamwork & Deadlines", titleVi: "Làm việc nhóm & Hạn chót", icon: "ListChecks", level: "B2",
      description: "Assign tasks, report progress and negotiate deadlines.",
      situations: [
        {
          title: "Dividing Tasks", description: "A team lead assigns work.",
          dialogue: [
            { speaker: "Trưởng nhóm", line: "Tuần này mình chia việc nhé. Hùng phụ trách thiết kế.", en: "Let's divide the work. Hung handles design." },
            { speaker: "Hùng", line: "Vâng, em sẽ hoàn thành bản nháp trước thứ Tư.", en: "OK, I'll finish the draft before Wednesday." },
            { speaker: "Trưởng nhóm", line: "Linh lo phần nội dung, được không?", en: "Linh takes care of content, OK?" },
            { speaker: "Linh", line: "Được ạ, nhưng em cần thêm số liệu từ phòng kinh doanh.", en: "Sure, but I need data from the sales department." },
          ],
        },
        {
          title: "Asking for an Extension", description: "Requesting more time.",
          culturalNote: "Explain the reason and propose a new date; it shows responsibility.",
          dialogue: [
            { speaker: "Linh", line: "Anh ơi, em e là không kịp hạn chót thứ Sáu.", en: "I'm afraid I can't meet Friday's deadline." },
            { speaker: "Trưởng nhóm", line: "Có vấn đề gì vậy em?", en: "What's the problem?" },
            { speaker: "Linh", line: "Phòng kinh doanh gửi số liệu muộn. Em xin lùi sang thứ Hai được không ạ?", en: "Sales sent the data late. Could I move it to Monday?" },
            { speaker: "Trưởng nhóm", line: "Được, nhưng thứ Hai phải xong nhé.", en: "OK, but it must be done by Monday." },
          ],
        },
      ],
      vocabulary: [
        { vi: "phụ trách", en: "to be in charge of", example: "Chị ấy phụ trách marketing.", exampleEn: "She is in charge of marketing." },
        { vi: "hạn chót", en: "deadline", example: "Hạn chót là ngày mai.", exampleEn: "The deadline is tomorrow." },
        { vi: "bản nháp", en: "draft", example: "Gửi tôi bản nháp trước.", exampleEn: "Send me the draft first." },
        { vi: "kịp", en: "in time", example: "Tôi không kịp tàu.", exampleEn: "I didn't make the train in time." },
        { vi: "lùi", en: "to postpone", example: "Cuộc họp lùi sang chiều.", exampleEn: "The meeting was moved to the afternoon." },
        { vi: "hoàn thành", en: "to complete", example: "Dự án đã hoàn thành.", exampleEn: "The project is complete." },
      ],
      structures: [
        { pattern: "[Subject] + e là + [bad news]", explanation: "Softly introduce bad news (I'm afraid).", examples: [{ vi: "Em e là sẽ đến muộn.", en: "I'm afraid I'll be late." }] },
        { pattern: "lùi sang + [time]", explanation: "Move to a later time.", examples: [{ vi: "Lùi sang tuần sau nhé.", en: "Let's move it to next week." }] },
      ],
      quiz: [
        { q: "'Hạn chót' means...", options: ["Meeting", "Deadline", "Salary", "Holiday"], answer: 1 },
        { q: "'Em e là...' is used to...", options: ["Give good news", "Soften bad news", "Say thanks", "Greet"], answer: 1 },
        { q: "'Phụ trách' means...", options: ["To be in charge of", "To quit", "To hire", "To rest"], answer: 0 },
        { q: "'Không kịp' means...", options: ["Too early", "Not in time", "On time", "Finished"], answer: 1 },
      ],
    },
  ],
  social: [
    {
      id: "vn-so-05-hobbies", title: "Hobbies & Free Time", titleVi: "Sở thích & Thời gian rảnh", icon: "Music", level: "A2",
      description: "Talk about what you like doing and make small talk.",
      situations: [
        {
          title: "Getting to Know a Friend", description: "Chatting about hobbies.",
          dialogue: [
            { speaker: "Vy", line: "Lúc rảnh bạn thích làm gì?", en: "What do you like doing in your free time?" },
            { speaker: "Khoa", line: "Mình thích đá bóng và nghe nhạc.", en: "I like playing football and listening to music." },
            { speaker: "Vy", line: "Bạn thích nghe nhạc gì?", en: "What music do you like?" },
            { speaker: "Khoa", line: "Mình thích nhạc Trịnh Công Sơn nhất.", en: "I like Trinh Cong Son's music best." },
          ],
        },
        {
          title: "Weekend Activities", description: "Suggesting a hobby together.",
          culturalNote: "Karaoke is a hugely popular social activity with friends and colleagues.",
          dialogue: [
            { speaker: "Vy", line: "Cuối tuần đi hát karaoke không?", en: "Want to go to karaoke this weekend?" },
            { speaker: "Khoa", line: "Mình hát dở lắm, nhưng đi cho vui!", en: "I sing badly, but let's go for fun!" },
            { speaker: "Vy", line: "Không sao, quan trọng là vui thôi.", en: "No problem, the fun is what matters." },
          ],
        },
      ],
      vocabulary: [
        { vi: "rảnh", en: "free (time)", example: "Tối nay tôi rảnh.", exampleEn: "I'm free tonight." },
        { vi: "sở thích", en: "hobby", example: "Sở thích của tôi là đọc sách.", exampleEn: "My hobby is reading." },
        { vi: "đá bóng", en: "to play football", example: "Chiều nào tôi cũng đá bóng.", exampleEn: "I play football every afternoon." },
        { vi: "nhất", en: "the most", example: "Tôi thích mùa thu nhất.", exampleEn: "I like autumn the most." },
        { vi: "dở", en: "bad (at)", example: "Tôi nấu ăn dở.", exampleEn: "I'm bad at cooking." },
        { vi: "cho vui", en: "for fun", example: "Chơi cho vui thôi.", exampleEn: "Just playing for fun." },
      ],
      structures: [
        { pattern: "[Subject] + thích + [activity] + nhất", explanation: "Say what you like most.", examples: [{ vi: "Em thích bơi nhất.", en: "I like swimming most." }] },
        { pattern: "[Verb/Adj] + lắm", explanation: "Very (casual, after the word).", examples: [{ vi: "Phim này hay lắm.", en: "This film is very good." }] },
      ],
      quiz: [
        { q: "'Sở thích' means...", options: ["Job", "Hobby", "Friend", "Weekend"], answer: 1 },
        { q: "'Lúc rảnh' means...", options: ["At work", "In free time", "In the morning", "At school"], answer: 1 },
        { q: "Where does 'lắm' go?", options: ["Before the adjective", "After the adjective", "At the start", "It is not used"], answer: 1 },
        { q: "'Cho vui' means...", options: ["For money", "For fun", "For work", "For health"], answer: 1 },
      ],
    },
    {
      id: "vn-so-06-travel", title: "Travel Stories", titleVi: "Kể chuyện du lịch", icon: "Plane", level: "B1",
      description: "Describe past trips and give travel recommendations.",
      situations: [
        {
          title: "Back from Đà Nẵng", description: "Telling a friend about a holiday.",
          dialogue: [
            { speaker: "Thảo", line: "Chuyến đi Đà Nẵng của cậu thế nào?", en: "How was your trip to Da Nang?" },
            { speaker: "Tuấn", line: "Tuyệt lắm! Mình đã đi Bà Nà và tắm biển Mỹ Khê.", en: "Amazing! I went to Ba Na and swam at My Khe beach." },
            { speaker: "Thảo", line: "Cậu có ghé Hội An không?", en: "Did you stop by Hoi An?" },
            { speaker: "Tuấn", line: "Có chứ, phố cổ về đêm đẹp như tranh.", en: "Of course, the old town at night is as pretty as a painting." },
          ],
        },
        {
          title: "Giving Advice", description: "Recommending when to travel.",
          culturalNote: "Central Vietnam has a rainy season from about September to December.",
          dialogue: [
            { speaker: "Thảo", line: "Mình nên đi vào tháng mấy?", en: "Which month should I go?" },
            { speaker: "Tuấn", line: "Cậu nên đi vào mùa hè, tránh mùa mưa bão.", en: "You should go in summer and avoid the storm season." },
            { speaker: "Thảo", line: "Có nên thuê xe máy không?", en: "Should I rent a motorbike?" },
            { speaker: "Tuấn", line: "Nên, đi xe máy rất tiện và rẻ.", en: "Yes, motorbikes are convenient and cheap." },
          ],
        },
      ],
      vocabulary: [
        { vi: "chuyến đi", en: "trip", example: "Chuyến đi rất đáng nhớ.", exampleEn: "The trip was memorable." },
        { vi: "ghé", en: "to stop by", example: "Tôi ghé nhà bạn một lát.", exampleEn: "I'll stop by your house briefly." },
        { vi: "phố cổ", en: "old quarter", example: "Phố cổ Hà Nội rất đông.", exampleEn: "Hanoi's Old Quarter is busy." },
        { vi: "nên", en: "should", example: "Bạn nên mang ô.", exampleEn: "You should bring an umbrella." },
        { vi: "tránh", en: "to avoid", example: "Tránh giờ cao điểm.", exampleEn: "Avoid rush hour." },
        { vi: "tiện", en: "convenient", example: "Ở đây đi lại rất tiện.", exampleEn: "Getting around here is convenient." },
      ],
      structures: [
        { pattern: "[Subject] + đã + [verb] (past)", explanation: "'đã' marks a completed action.", examples: [{ vi: "Tôi đã đến Huế.", en: "I have been to Hue." }] },
        { pattern: "[A] + đẹp như + [B]", explanation: "Comparison: as ... as.", examples: [{ vi: "Cô ấy hát hay như ca sĩ.", en: "She sings as well as a singer." }] },
      ],
      quiz: [
        { q: "'Nên' means...", options: ["Must not", "Should", "Can't", "Already"], answer: 1 },
        { q: "'Đã' usually marks...", options: ["Future", "Past / completed", "Question", "Negation"], answer: 1 },
        { q: "'Ghé' means...", options: ["To stop by", "To leave", "To fly", "To swim"], answer: 0 },
        { q: "'Tránh mùa mưa' means...", options: ["Enjoy the rain", "Avoid the rainy season", "Wait for rain", "Rainy trip"], answer: 1 },
      ],
    },
    {
      id: "vn-so-07-condolence", title: "Congratulations & Condolences", titleVi: "Chúc mừng & Chia buồn", icon: "Gift", level: "B1",
      description: "Say the right words at weddings, birthdays and difficult moments.",
      situations: [
        {
          title: "At a Wedding", description: "Congratulating a newly married couple.",
          culturalNote: "Wedding guests usually give money in an envelope (phong bì) instead of a gift.",
          dialogue: [
            { speaker: "Khách", line: "Chúc mừng hai bạn! Chúc trăm năm hạnh phúc.", en: "Congratulations! Wishing you a lifetime of happiness." },
            { speaker: "Cô dâu", line: "Cảm ơn anh đã đến dự.", en: "Thank you for coming." },
            { speaker: "Khách", line: "Chúc hai bạn sớm có tin vui nhé.", en: "Hope you'll have good news (a baby) soon." },
          ],
        },
        {
          title: "Offering Sympathy", description: "Comforting a colleague who lost a relative.",
          dialogue: [
            { speaker: "Đồng nghiệp", line: "Em rất tiếc khi nghe tin về bà của chị.", en: "I'm so sorry to hear about your grandmother." },
            { speaker: "Chị Hương", line: "Cảm ơn em. Chị vẫn còn buồn lắm.", en: "Thank you. I'm still very sad." },
            { speaker: "Đồng nghiệp", line: "Chị cần gì cứ nói với em nhé.", en: "If you need anything, just tell me." },
          ],
        },
      ],
      vocabulary: [
        { vi: "chúc mừng", en: "congratulations", example: "Chúc mừng sinh nhật!", exampleEn: "Happy birthday!" },
        { vi: "hạnh phúc", en: "happiness", example: "Chúc bạn luôn hạnh phúc.", exampleEn: "Wishing you happiness always." },
        { vi: "dự", en: "to attend", example: "Tôi sẽ dự đám cưới.", exampleEn: "I'll attend the wedding." },
        { vi: "rất tiếc", en: "very sorry", example: "Tôi rất tiếc về chuyện đó.", exampleEn: "I'm very sorry about that." },
        { vi: "chia buồn", en: "to offer condolences", example: "Xin chia buồn cùng gia đình.", exampleEn: "My condolences to the family." },
        { vi: "phong bì", en: "envelope (gift money)", example: "Tôi chuẩn bị phong bì mừng cưới.", exampleEn: "I prepared a wedding envelope." },
      ],
      structures: [
        { pattern: "Chúc + [person] + [wish]", explanation: "Make a wish for someone.", examples: [{ vi: "Chúc chị thành công.", en: "Wishing you success." }, { vi: "Chúc bạn mau khỏe.", en: "Get well soon." }] },
        { pattern: "[Subject] + cần gì cứ + [verb]", explanation: "Offer help: whatever you need, just...", examples: [{ vi: "Anh cần gì cứ gọi em.", en: "If you need anything, just call me." }] },
      ],
      quiz: [
        { q: "'Chia buồn' means...", options: ["Congratulate", "Offer condolences", "Celebrate", "Invite"], answer: 1 },
        { q: "What do wedding guests usually give?", options: ["Flowers", "An envelope with money", "Food", "Nothing"], answer: 1 },
        { q: "'Chúc bạn mau khỏe' means...", options: ["Happy birthday", "Get well soon", "Good luck", "Safe trip"], answer: 1 },
        { q: "'Rất tiếc' means...", options: ["Very happy", "Very sorry", "Very busy", "Very tired"], answer: 1 },
      ],
    },
    {
      id: "vn-so-08-news", title: "Talking About the News", titleVi: "Bàn luận thời sự", icon: "Newspaper", level: "B2",
      description: "Discuss current events, report what you heard and express concern.",
      situations: [
        {
          title: "Rising Prices", description: "Colleagues discuss the economy.",
          dialogue: [
            { speaker: "Phong", line: "Nghe nói giá xăng lại tăng từ tuần sau.", en: "I heard fuel prices rise again next week." },
            { speaker: "Nga", line: "Thật à? Như vậy thì giá thực phẩm cũng sẽ tăng theo.", en: "Really? Then food prices will rise too." },
            { speaker: "Phong", line: "Đúng vậy, người lao động sẽ gặp nhiều khó khăn.", en: "Exactly, workers will face more difficulties." },
            { speaker: "Nga", line: "Mong là chính phủ có biện pháp hỗ trợ kịp thời.", en: "Hopefully the government will provide timely support." },
          ],
        },
        {
          title: "Environment", description: "Discussing air pollution.",
          culturalNote: "Air quality in Hanoi is a common topic in winter; many people check AQI apps daily.",
          dialogue: [
            { speaker: "An", line: "Dạo này Hà Nội ô nhiễm không khí nghiêm trọng quá.", en: "Hanoi's air pollution is very serious lately." },
            { speaker: "Bình", line: "Mình nghĩ nên hạn chế xe máy ở trung tâm.", en: "I think motorbikes should be limited downtown." },
            { speaker: "An", line: "Ý kiến hay, nhưng cần phát triển giao thông công cộng trước.", en: "Good idea, but public transport must be developed first." },
          ],
        },
      ],
      vocabulary: [
        { vi: "nghe nói", en: "I heard that", example: "Nghe nói anh ấy chuyển việc.", exampleEn: "I heard he changed jobs." },
        { vi: "khó khăn", en: "difficulty", example: "Chúng tôi vượt qua khó khăn.", exampleEn: "We overcame difficulties." },
        { vi: "biện pháp", en: "measure", example: "Cần có biện pháp mạnh.", exampleEn: "Strong measures are needed." },
        { vi: "ô nhiễm", en: "pollution", example: "Ô nhiễm nguồn nước rất nguy hiểm.", exampleEn: "Water pollution is dangerous." },
        { vi: "nghiêm trọng", en: "serious", example: "Tình hình khá nghiêm trọng.", exampleEn: "The situation is quite serious." },
        { vi: "hạn chế", en: "to limit", example: "Hãy hạn chế dùng túi nilon.", exampleEn: "Limit plastic bag use." },
      ],
      structures: [
        { pattern: "Nghe nói + [news]", explanation: "Report information you heard.", examples: [{ vi: "Nghe nói mai trời mưa.", en: "I heard it will rain tomorrow." }] },
        { pattern: "Như vậy thì + [consequence]", explanation: "State a consequence: in that case.", examples: [{ vi: "Như vậy thì chúng ta phải đi sớm.", en: "In that case we must leave early." }] },
      ],
      quiz: [
        { q: "'Nghe nói' means...", options: ["Speak loudly", "I heard that", "Listen carefully", "Say again"], answer: 1 },
        { q: "'Ô nhiễm' means...", options: ["Traffic", "Pollution", "Weather", "Economy"], answer: 1 },
        { q: "'Như vậy thì' introduces...", options: ["A reason", "A consequence", "A question", "A greeting"], answer: 1 },
        { q: "'Hạn chế' means...", options: ["To limit", "To expand", "To ignore", "To buy"], answer: 0 },
      ],
    },
  ],
};
