/**
 * @file lifeInFinlandExpansion2.ts
 * @description Phase-2 mở rộng Life in Finland (2026): giao thông công cộng,
 *              ngân hàng & BankID, phong cách giao tiếp & sisu, gia đình &
 *              chăm sóc trẻ em (Neuvola), nha khoa, sức khỏe tâm thần.
 *              Bổ sung 6 guide mới + 8 checklist items.
 * @author HaiEduTech
 */

import type { NewcomerGuide, ChecklistItem } from "./lifeInFinlandData";

// ============================================================
// GIAO THÔNG CÔNG CỘNG (Daily pillar)
// ============================================================
export const TRANSPORT_GUIDES: NewcomerGuide[] = [
  {
    id: "public-transport-2026",
    icon: "Bus",
    emoji: "🚌",
    title: "Giao thông công cộng (HSL, Nysse, Föli)",
    titleEn: "Public Transport (HSL, Nysse, Föli)",
    sources: [{ label: "www.hsl.fi", url: "https://www.hsl.fi/en/tickets-and-fares" }, { label: "www.hsl.fi", url: "https://www.hsl.fi/en/citybikes" }, { label: "www.vr.fi", url: "https://www.vr.fi/en/discounts-on-train-tickets" }],
    summary: "Vé theo vùng và loại; vé xe đạp thành phố là sản phẩm riêng, không mặc nhiên nằm trong vé giao thông công cộng.",
    summaryEn: "Tickets depend on zones and type; city-bike access is a separate product, not automatically included in public transport tickets.",
    steps: [
          { vi: "Tải ứng dụng của nhà vận hành và kiểm tra phương thức trả tiền được hỗ trợ.", en: "Use the operator’s app and check supported payment methods." },
          { vi: "Xem bảng giá hiện hành cho đúng vùng, loại vé và nhóm khách; không dùng một giá chung cho toàn vùng Helsinki.", en: "Check current fares for your zones, ticket type and customer group; there is no single fare for the whole Helsinki region." },
          { vi: "Xe đạp công cộng có mùa hoạt động, thời gian một lượt và phụ phí riêng; kiểm tra nhà vận hành trước khi dùng.", en: "City bikes have separate operating seasons, ride durations and extra charges; check the operator before using them." },
          { vi: "VR giảm giá sinh viên theo điều kiện và loại tàu; kiểm tra giấy tờ được chấp nhận và giá chuyến cụ thể.", en: "VR student discounts depend on conditions and train type; check accepted documents and the fare for your trip." },
          { vi: "Vé bay thay đổi theo ngày, hành lý và hãng; so sánh tổng chi phí, không dựa vào mức giá quảng cáo cố định.", en: "Flight prices vary by date, baggage and carrier; compare total cost rather than a fixed advertised fare." },
          { vi: "Có vé hợp lệ theo hướng dẫn trước khi lên; phí kiểm tra và ngoại lệ khác nhau giữa nhà vận hành.", en: "Have a valid ticket as instructed before boarding; inspection fees and exceptions vary by operator." },
        ],
    keyTerms: [
      { fi: "Lippu", vi: "Vé", en: "Ticket" },
      { fi: "Aikataulu", vi: "Thời gian biểu", en: "Schedule" },
      { fi: "Pysäkki", vi: "Trạm dừng", en: "Stop" },
      { fi: "Vaihto", vi: "Chuyển tuyến", en: "Transfer / change" },
      { fi: "Lähijuna", vi: "Tàu ngoại ô", en: "Commuter train" },
    ],
    phrases: [
      { fi: "Mistä saan kuukausilipun?", vi: "Tôi mua vé tháng ở đâu?", en: "Where can I get a monthly pass?" },
      { fi: "Millä pysäkillä jäätte pois?", vi: "Bạn xuống trạm nào?", en: "Which stop are you getting off at?" },
      { fi: "Onko tämä juna Tampereelle?", vi: "Tàu này có đi Tampere không?", en: "Is this train going to Tampere?" },
    ],
    proTip: { vi: "Kiểm tra điều kiện giảm giá sinh viên HSL và xác minh khi cần; không giả định chỉ cần dưới 30 tuổi hoặc thẻ có ảnh.", en: "Check HSL student-discount eligibility and renew verification when required; do not assume being under 30 or holding a photo card is enough." },
    mapLinks: [
      { label: "HSL Helsinki", url: "https://www.hsl.fi/en" },
      { label: "VR Train Tickets", url: "https://www.vr.fi/en" },
    ],
  },
];

// ============================================================
// NGÂN HÀNG & BANKID NÂNG CAO (Admin pillar)
// ============================================================
export const BANKING_GUIDES: NewcomerGuide[] = [
  {
    id: "banking-bankid-2026",
    icon: "Landmark",
    emoji: "🏦",
    title: "Ngân hàng & định danh mạnh (Pankkitunnukset)",
    titleEn: "Banking & Strong Identification (Pankkitunnukset)",
    sources: [{ label: "www.suomi.fi", url: "https://www.suomi.fi/instructions-and-support/identification" }, { label: "www.kyberturvallisuuskeskus.fi", url: "https://www.kyberturvallisuuskeskus.fi/en" }, { label: "poliisi.fi", url: "https://poliisi.fi/en/report-a-crime" }],
    summary: "Định danh mạnh có thể dùng mã ngân hàng, chứng thư di động hoặc thẻ định danh được chấp nhận; không phải dịch vụ nào cũng chỉ nhận mã ngân hàng.",
    summaryEn: "Strong identification may use accepted banking credentials, mobile certificates or identity cards; services do not all require bank credentials exclusively.",
    steps: [
          { vi: "So sánh ngân hàng theo ngôn ngữ phục vụ, phí và giấy tờ; tránh xếp hạng ngân hàng nào dễ duyệt nhất.", en: "Compare banks by service languages, fees and documents; avoid assuming one bank approves newcomers most easily." },
          { vi: "Liên hệ hoặc đặt lịch theo hướng dẫn của từng ngân hàng; thời gian xử lý khác nhau.", en: "Contact or book according to each bank’s instructions; processing times vary." },
          { vi: "Mang giấy tờ định danh và thông tin địa chỉ, nguồn tiền được yêu cầu; phí mở/thẻ không cố định.", en: "Bring requested identity, address and source-of-funds documentation; account/card fees are not fixed." },
          { vi: "Xác nhận cách nhận thẻ và kích hoạt mã định danh; không chia sẻ mã hoặc chấp nhận yêu cầu xác nhận lạ.", en: "Confirm card delivery and credential activation; never disclose codes or approve unexpected requests." },
          { vi: "Nếu dùng MobilePay, kiểm tra điều kiện tài khoản, số điện thoại, hạn mức và phí.", en: "If using MobilePay, check account/phone requirements, limits and fees." },
          { vi: "Thẻ và thanh toán điện tử phổ biến; hỏi cửa hàng về phương thức được nhận, không giả định mọi nơi từ chối tiền mặt.", en: "Cards and electronic payments are common; ask which methods a shop accepts rather than assuming all reject cash." },
        ],
    keyTerms: [
      { fi: "Pankkitili", vi: "Tài khoản ngân hàng", en: "Bank account" },
      { fi: "Pankkitunnukset", vi: "Mã BankID", en: "BankID codes" },
      { fi: "Tilisiirto", vi: "Chuyển khoản", en: "Bank transfer" },
      { fi: "Pankkikortti", vi: "Thẻ ngân hàng", en: "Debit card" },
      { fi: "Lainahakemus", vi: "Đơn xin vay", en: "Loan application" },
    ],
    phrases: [
      { fi: "Haluaisin avata pankkitilin.", vi: "Tôi muốn mở tài khoản ngân hàng.", en: "I'd like to open a bank account." },
      { fi: "Milloin saan pankkitunnukset?", vi: "Khi nào tôi nhận được BankID?", en: "When will I receive my BankID codes?" },
      { fi: "Voinko maksaa MobilePaylla?", vi: "Tôi trả bằng MobilePay được không?", en: "Can I pay with MobilePay?" },
    ],
    proTip: { vi: "Nếu lộ mã hoặc nghi chuyển tiền lừa đảo, gọi ngân hàng ngay để khóa dịch vụ, sau đó báo cảnh sát qua poliisi.fi; 112 chỉ khi có khẩn cấp.", en: "If credentials are compromised or a transfer seems fraudulent, call your bank immediately to block access, then report through poliisi.fi; use 112 only for emergencies." },
  },
];

// ============================================================
// PHONG CÁCH GIAO TIẾP & SISU (Work pillar)
// ============================================================
export const CULTURE_GUIDES: NewcomerGuide[] = [
  {
    id: "social-etiquette-sisu",
    icon: "Sparkle",
    emoji: "🤫",
    title: "Văn hóa giao tiếp Phần Lan & Sisu",
    titleEn: "Finnish Social Etiquette & Sisu",
    sources: [{ label: "www.infofinland.fi", url: "https://www.infofinland.fi/en/information-about-finland/cultures-and-religions-in-finland/finnish-customs" }],
    summary: "Đúng giờ, bình đẳng và không gian riêng thường được coi trọng; cách giao tiếp khác nhau theo người và hoàn cảnh.",
    summaryEn: "Punctuality, equality and personal space are often valued; communication varies by person and situation.",
    steps: [
          { vi: "Không cần lấp đầy mọi khoảng im lặng; hỏi rõ nếu bạn chưa hiểu.", en: "You need not fill every silence; ask for clarification when needed." },
          { vi: "Chào phù hợp hoàn cảnh; ôm, bắt tay và tiếp xúc cá nhân phụ thuộc sự đồng thuận và mối quan hệ.", en: "Greet appropriately; hugs, handshakes and personal contact depend on consent and the relationship." },
          { vi: "Đến giờ đã hẹn và báo nếu muộn; không có quy tắc chính thức phải sớm đúng 10 phút.", en: "Arrive at the agreed time and notify others of delays; there is no official rule requiring exactly ten minutes early." },
          { vi: "Sauna tự nguyện; xem quy định nơi tắm về đồ bơi, khăn, khu riêng hoặc chung và tôn trọng sự riêng tư.", en: "Sauna participation is voluntary; check swimwear/towel and mixed/separate-area rules and respect privacy." },
          { vi: "Cho người khác không gian và hỏi nếu chưa rõ; không có khoảng cách xếp hàng cố định áp dụng cho mọi người.", en: "Give people space and ask if unsure; no fixed queue distance applies to everyone." },
          { vi: "Sisu thường diễn tả kiên trì trước khó khăn; nhờ giúp đỡ vẫn phù hợp và lành mạnh.", en: "Sisu often describes perseverance in adversity; asking for help is still appropriate and healthy." },
          { vi: "Gặp gỡ sau giờ làm không bắt buộc uống rượu; chọn hình thức giao lưu bạn thoải mái.", en: "After-work socialising does not require alcohol; choose activities you are comfortable with." },
          { vi: "Khi được mời đến nhà, hỏi về giày, quà hoặc ăn uống; sở thích gia đình khác nhau.", en: "When invited home, ask about shoes, gifts or food; household preferences differ." },
        ],
    keyTerms: [
      { fi: "Sisu", vi: "Tinh thần kiên cường", en: "Finnish grit / perseverance" },
      { fi: "Hiljaisuus", vi: "Sự im lặng", en: "Silence" },
      { fi: "Tasa-arvo", vi: "Bình đẳng", en: "Equality" },
      { fi: "Täsmällisyys", vi: "Đúng giờ", en: "Punctuality" },
      { fi: "Sauna", vi: "Phòng xông hơi", en: "Sauna" },
    ],
    phrases: [
      { fi: "Anteeksi häiriö.", vi: "Xin lỗi vì làm phiền.", en: "Sorry for the disturbance." },
      { fi: "Mennäänkö saunaan?", vi: "Đi tắm sauna nhé?", en: "Shall we go to the sauna?" },
      { fi: "Pidetään yhteyttä.", vi: "Giữ liên lạc nhé.", en: "Let's stay in touch." },
    ],
    proTip: { vi: "Tránh khái quát mọi người Phần Lan; lịch sự, lắng nghe và hỏi là cách tốt nhất.", en: "Avoid generalising about all Finns; politeness, listening and asking are the best approach." },
  },
];

// ============================================================
// GIA ĐÌNH & TRẺ EM - NEUVOLA (Health pillar)
// ============================================================
export const FAMILY_HEALTH_GUIDES: NewcomerGuide[] = [
  {
    id: "neuvola-family-2026",
    icon: "Baby",
    emoji: "👶",
    title: "Neuvola - Trung tâm chăm sóc mẹ và bé miễn phí",
    titleEn: "Neuvola - Free Maternal & Child Health Center",
    sources: [{ label: "www.kela.fi", url: "https://www.kela.fi/maternity-grant" }, { label: "www.kela.fi", url: "https://www.kela.fi/pregnancy-allowance" }, { label: "www.kela.fi", url: "https://www.kela.fi/parental-allowance" }, { label: "www.infofinland.fi", url: "https://www.infofinland.fi/en/family/children/early-childhood-education" }],
    summary: "Neuvola cung cấp chăm sóc thai kỳ và trẻ nhỏ trong hệ thống y tế công; liên hệ dịch vụ khu vực về quyền dùng và lịch khám.",
    summaryEn: "Neuvola provides maternity and young-child care within public healthcare; contact regional services about entitlement and visits.",
    steps: [
          { vi: "Liên hệ neuvola khi biết mình mang thai; số và cách đặt hẹn ở trang khu vực phúc lợi hoặc Helsinki, không phải MyKanta.", en: "Contact neuvola when you know you are pregnant; booking details are on your wellbeing services county or Helsinki website, not MyKanta." },
          { vi: "Kela có äitiysavustus (hộp đồ hoặc tiền) cho người đủ điều kiện; thời điểm khám, thai kỳ và hạn nộp đơn có điều kiện riêng. Kiểm tra Kela hiện hành.", en: "Kela offers maternity grant support (a package or cash) for eligible applicants; medical-exam timing, pregnancy stage and application deadlines have conditions. Check current Kela guidance." },
          { vi: "Sinh tại bệnh viện công có thể có phí chăm sóc nội trú theo ngày; không mặc nhiên miễn phí hoặc chỉ trả ngày đầu.", en: "Public-hospital childbirth may involve daily inpatient charges; it is not automatically free or charged only on the first day." },
          { vi: "Hệ thống hiện dùng raskausraha và vanhempainraha; quyền hưởng, ngày trợ cấp và cách chia phụ thuộc hoàn cảnh, không dùng mô hình äitiysraha cũ.", en: "The current system uses pregnancy allowance and parental allowance; eligibility, days and sharing depend on circumstances, not the old maternity-allowance model." },
          { vi: "Neuvola theo dõi phát triển và vaccine theo chương trình; lịch cụ thể và nhu cầu bổ sung do nhân viên y tế đánh giá.", en: "Neuvola monitors development and programme vaccinations; staff assess the visit schedule and additional needs." },
          { vi: "Xin nhà trẻ qua đô thị; phí tùy thu nhập, quy mô gia đình, giờ chăm sóc và mức phí hiện hành.", en: "Apply for early childhood education through your municipality; fees depend on income, family size, care hours and current rates." },
        ],
    keyTerms: [
      { fi: "Neuvola", vi: "Trung tâm chăm sóc mẹ và bé", en: "Maternal & child clinic" },
      { fi: "Äitiyspakkaus", vi: "Hộp đồ sơ sinh Kela", en: "Maternity box" },
      { fi: "Päiväkoti", vi: "Nhà trẻ", en: "Daycare" },
      { fi: "Lapsilisä", vi: "Tiền trợ cấp con", en: "Child benefit" },
      { fi: "Vanhempainraha", vi: "Trợ cấp cha mẹ", en: "Parental allowance" },
    ],
    phrases: [
      { fi: "Olen raskaana, haluaisin varata ajan neuvolaan.", vi: "Tôi đang mang thai, muốn đặt lịch Neuvola.", en: "I'm pregnant, I'd like to book a Neuvola appointment." },
      { fi: "Milloin saan äitiyspakkauksen?", vi: "Khi nào tôi nhận được Maternity Box?", en: "When will I receive the maternity box?" },
    ],
    proTip: { vi: "Đóng thuế hoặc cư trú không tự bảo đảm mọi trợ cấp Kela; hỏi về từng khoản và theo dõi hạn nộp.", en: "Paying taxes or living in Finland does not automatically guarantee all Kela benefits; check each benefit and its deadline." },
  },
];

// ============================================================
// NHA KHOA & SỨC KHỎE TÂM THẦN (Health pillar)
// ============================================================
export const ADVANCED_HEALTH_GUIDES: NewcomerGuide[] = [
  {
    id: "dental-care-2026",
    icon: "Smile",
    emoji: "🦷",
    title: "Nha khoa công + tư (Hammashoito)",
    titleEn: "Dental Care - Public + Private",
    sources: [{ label: "www.infofinland.fi", url: "https://www.infofinland.fi/en/health/dental-care" }, { label: "www.kela.fi", url: "https://www.kela.fi/dental-care" }],
    summary: "Dùng nha khoa công, tư hoặc YTHS nếu đủ điều kiện; phí và thời gian chờ tùy nơi, điều trị và mức độ khẩn cấp.",
    summaryEn: "Use public, private or eligible YTHS dental care; fees and waits vary by provider, procedure and urgency.",
    steps: [
          { vi: "Liên hệ nha khoa khu vực để được đánh giá nhu cầu; xem phí khám và điều trị hiện hành.", en: "Contact regional dental services for a care assessment; check current examination and treatment charges." },
          { vi: "Với tư nhân, hỏi báo giá gồm xét nghiệm/phí dịch vụ. YTHS có điều kiện sinh viên riêng; không bảo đảm hẹn cùng ngày.", en: "For private care, request an estimate including tests/service charges. YTHS has separate student eligibility; same-day appointments are not guaranteed." },
          { vi: "Kela hoàn nha khoa tư theo mức cho từng thủ thuật và điều kiện, không phải 30–50% toàn hóa đơn; kiểm tra bảng hoàn hiện hành.", en: "Kela reimburses private dental care by procedure and conditions, not 30–50% of the whole bill; check current reimbursement rates." },
          { vi: "Nha khoa công cho người dưới 18 tuổi thường miễn phí; chỉnh nha dựa trên nhu cầu y khoa, không bao gồm mọi yêu cầu thẩm mỹ.", en: "Public dental care for under-18s is generally free; orthodontics are based on medical need, not every cosmetic request." },
          { vi: "Trước điều trị ở nước ngoài, kiểm tra quyền hoàn, kế hoạch chăm sóc tiếp và rủi ro; không giả định giá hoặc chất lượng tương đương.", en: "Before treatment abroad, check reimbursement entitlement, follow-up arrangements and risks; do not assume equivalent prices or quality." },
        ],
    keyTerms: [
      { fi: "Hammashoito", vi: "Khám nha khoa", en: "Dental care" },
      { fi: "Hammaslääkäri", vi: "Bác sĩ nha khoa", en: "Dentist" },
      { fi: "Paikkaus", vi: "Trám răng", en: "Filling" },
      { fi: "Hammaskivi", vi: "Cao răng", en: "Tartar" },
      { fi: "Oikomishoito", vi: "Niềng răng", en: "Orthodontics / braces" },
    ],
    phrases: [
      { fi: "Hammasta särkee.", vi: "Tôi đau răng.", en: "I have a toothache." },
      { fi: "Tarvitsen hammaslääkärin tarkastuksen.", vi: "Tôi cần khám răng định kỳ.", en: "I need a dental checkup." },
    ],
    proTip: { vi: "Đau/sưng răng cấp cần được đánh giá kịp thời; quyền hoàn không chỉ dựa vào việc có henkilötunnus.", en: "Acute dental pain/swelling needs timely assessment; reimbursement does not depend solely on having a personal identity code." },
  },
  {
    id: "mental-health-support-2026",
    icon: "HeartHandshake",
    emoji: "🧠",
    title: "Hỗ trợ sức khỏe tâm thần (Mielenterveys)",
    titleEn: "Mental Health Support (Mielenterveys)",
    sources: [{ label: "mieli.fi", url: "https://mieli.fi/en/support-and-help/crisis-helpline/" }, { label: "www.yths.fi", url: "https://www.yths.fi/en/" }, { label: "www.kela.fi", url: "https://www.kela.fi/rehabilitative-psychotherapy" }, { label: "www.mielenterveystalo.fi", url: "https://www.mielenterveystalo.fi/en" }],
    summary: "Có hỗ trợ qua y tế công, YTHS, MIELI và chương trình tự trợ giúp; điều kiện, ngôn ngữ và giờ phục vụ khác nhau.",
    summaryEn: "Support is available through public healthcare, YTHS, MIELI and self-help programmes; eligibility, languages and hours vary.",
    steps: [
          { vi: "Nếu đang có nguy hiểm tức thời, gọi 112. Với MIELI, kiểm tra số và giờ tiếng Anh trên trang chính thức trước khi gọi; đường dây khủng hoảng không thay cho cấp cứu.", en: "For immediate danger, call 112. For MIELI, check current English phone numbers/hours on its official page; a crisis line is not emergency dispatch." },
          { vi: "Sinh viên đủ điều kiện liên hệ YTHS qua YTHSDigi (thay Self từ tháng 5/2026); dịch vụ không phải trung tâm cấp cứu hoặc bảo đảm trị liệu không giới hạn.", en: "Eligible students contact YTHS through YTHSDigi (replacing Self in May 2026); it is not an emergency service or a guarantee of unlimited therapy." },
          { vi: "Mielenterveystalo có chương trình tự trợ giúp; trị liệu có hướng dẫn hoặc điều trị chuyên môn có thể cần giới thiệu/đánh giá.", en: "Mielenterveystalo offers self-help programmes; guided therapy or specialist treatment may require referral/assessment." },
          { vi: "Kela rehabilitative psychotherapy cần điều kiện và quyết định riêng; hỗ trợ tối đa ba năm, 80 buổi/năm và 200 buổi tổng cộng, không phải hoàn 60% mặc định.", en: "Kela rehabilitative psychotherapy requires eligibility and a separate decision; support is available for up to three years, 80 sessions/year and 200 in total, not a default 60% refund." },
          { vi: "Giữ giấc ngủ và hoạt động phù hợp; hỏi nhân viên y tế về vitamin D hoặc đèn trị liệu thay vì tự dùng liều cao.", en: "Maintain sleep and suitable activity; ask a clinician about vitamin D or light therapy rather than using high doses yourself." },
          { vi: "Tìm nhóm hỗ trợ đáng tin cậy qua trường hoặc tổ chức chuyên môn; cộng đồng không thay thế chăm sóc y khoa.", en: "Find trusted peer support through your institution or professional organisations; community support does not replace medical care." },
        ],
    keyTerms: [
      { fi: "Mielenterveys", vi: "Sức khỏe tâm thần", en: "Mental health" },
      { fi: "Terapeutti", vi: "Nhà trị liệu", en: "Therapist" },
      { fi: "Masennus", vi: "Trầm cảm", en: "Depression" },
      { fi: "Ahdistus", vi: "Lo âu", en: "Anxiety" },
      { fi: "Kaamos", vi: "Mùa đêm dài (cực Bắc)", en: "Polar night" },
    ],
    phrases: [
      { fi: "Tunnen oloni masentuneeksi.", vi: "Tôi cảm thấy trầm buồn.", en: "I feel depressed." },
      { fi: "Tarvitsen apua.", vi: "Tôi cần giúp đỡ.", en: "I need help." },
      { fi: "Voinko saada lähetteen terapeutille?", vi: "Tôi xin giấy giới thiệu đến nhà trị liệu được không?", en: "Can I get a referral to a therapist?" },
    ],
    proTip: { vi: "Nhờ giúp đỡ là hợp lý; nếu triệu chứng ảnh hưởng học tập hoặc sinh hoạt, liên hệ y tế sớm.", en: "Seeking help is appropriate; contact healthcare early if symptoms affect studies or daily functioning." },
  },
];

// ============================================================
// CHECKLIST V2 (8 items mới)
// ============================================================
export const FIRST_30_DAYS_CHECKLIST_V2: ChecklistItem[] = [
  { key: "hsl-app", vi: "Cài app HSL/Nysse/Föli", en: "Install HSL/Nysse/Föli app", category: "daily", week: 1 },
  { key: "mobilepay", vi: "Cài MobilePay (chuyển tiền P2P)", en: "Install MobilePay (P2P transfers)", category: "admin", week: 2 },
  { key: "vsaf-join", vi: "Tìm hội sinh viên hoặc cộng đồng đáng tin cậy qua trường", en: "Find a trusted student association or community through your institution", category: "daily", week: 2 },
  { key: "neuvola-register", vi: "Đăng ký Neuvola (nếu có thai/em bé)", en: "Register at Neuvola (if pregnant/with baby)", category: "health", week: 3 },
  { key: "dental-checkup", vi: "Đặt lịch khám răng định kỳ đầu tiên", en: "Book first dental checkup", category: "health", week: 4 },
  { key: "self-app", vi: "Sinh viên đủ điều kiện: kiểm tra YTHSDigi trên trang YTHS", en: "Eligible students: access YTHSDigi through the YTHS website", category: "health", week: 2 },
  { key: "sauna-experience", vi: "Trải nghiệm sauna công cộng đầu tiên", en: "First public sauna experience", category: "daily", week: 3 },
  { key: "mielenterveystalo", vi: "Bookmark Mielenterveystalo.fi", en: "Bookmark Mielenterveystalo.fi", category: "health", week: 4 },
];
