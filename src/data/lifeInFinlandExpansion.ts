/**
 * @file lifeInFinlandExpansion.ts
 * @description Bài học mở rộng cho Life in Finland - chợ, đồ cũ, nhà ở,
 *              mùa đông, SIM/internet, tips du học sinh. Dữ liệu cập nhật 2026.
 * @author HaiEduTech
 */

import type { NewcomerGuide, ChecklistItem } from "./lifeInFinlandData";

// ============================================================
// CHỢ & MUA SẮM (Daily pillar)
// ============================================================

export const SHOPPING_GUIDES: NewcomerGuide[] = [
  {
    id: "grocery-shopping-2026",
    icon: "ShoppingCart",
    emoji: "🛒",
    title: "Hướng dẫn đi chợ siêu thị (2026)",
    titleEn: "Grocery Shopping Guide (2026)",
    sources: [{ label: "www.ruokavirasto.fi", url: "https://www.ruokavirasto.fi/en/foodstuffs/instructions-for-consumers/" }],
        summary: "Lập ngân sách theo giá thực tế tại nơi ở; không có giá chợ hoặc mức lạm phát cố định dùng cho mọi gia đình.",
    summaryEn: "Budget using actual local prices; there is no fixed grocery cost or inflation rate suitable for every household.",
    steps: [
          { vi: "Lập danh sách và ngân sách dựa trên nhu cầu, khẩu phần và giá đơn vị.", en: "Make a list and budget based on needs, portions and unit prices." },
          { vi: "Kiểm tra nhãn hạn dùng: viimeinen käyttöpäivä là hạn sử dụng an toàn, parasta ennen là tốt nhất trước ngày ghi.", en: "Check date labels: viimeinen käyttöpäivä is the use-by date; parasta ennen is best-before." },
          { vi: "Xem ưu đãi trong ứng dụng cửa hàng; giá hàng cận hạn và giờ giảm khác nhau theo cửa hàng.", en: "Check store apps for offers; near-expiry prices and markdown times vary by store." },
          { vi: "So sánh đồ tươi, đông lạnh và sản phẩm theo mùa; không giả định một chuỗi luôn rẻ hơn.", en: "Compare fresh, frozen and seasonal products; do not assume one chain is always cheaper." },
          { vi: "Mang túi dùng lại; phí túi và đồng xu/đồng token cho xe đẩy tùy cửa hàng.", en: "Bring reusable bags; bag charges and trolley coins/tokens vary by store." },
        ],
    keyTerms: [
      { fi: "Ruokakauppa", vi: "Cửa hàng tạp hóa", en: "Grocery store" },
      { fi: "Tarjous", vi: "Khuyến mãi", en: "Special offer" },
      { fi: "Päiväys", vi: "Hạn sử dụng", en: "Expiry date" },
      { fi: "Ostoskärry", vi: "Xe đẩy", en: "Shopping cart" },
      { fi: "Kassa", vi: "Quầy thanh toán", en: "Checkout counter" },
    ],
    phrases: [
      { fi: "Missä ovat maitotuotteet?", vi: "Khu sản phẩm sữa ở đâu?", en: "Where are the dairy products?" },
      { fi: "Onko tämä alennuksessa?", vi: "Cái này có đang giảm giá không?", en: "Is this on discount?" },
      { fi: "Saanko kuitin, kiitos?", vi: "Cho tôi hóa đơn nhé.", en: "Can I have the receipt, please?" },
    ],
    proTip: { vi: "Chợ Á có thể có nguyên liệu quen thuộc; kiểm tra giờ mở cửa, giá và tình trạng cửa hàng hiện tại.", en: "Asian shops may stock familiar ingredients; check current opening hours, prices and availability." },
    mapLinks: [
      { label: "Vii Voan Asian Market Helsinki", url: "https://www.google.com/maps/search/Vii+Voan+Helsinki" },
      { label: "Hoan Nam Market", url: "https://www.google.com/maps/search/Hoan+Nam+Market+Helsinki" },
      { label: "Hakaniemi Market Hall", url: "https://www.google.com/maps/search/Hakaniemen+Kauppahalli" },
    ],
  },
  {
    id: "market-types-finland",
    icon: "Store",
    emoji: "🏪",
    title: "Các loại chợ ở Phần Lan",
    titleEn: "Types of Markets in Finland",
    sources: [{ label: "www.infofinland.fi", url: "https://www.infofinland.fi/en/settling-in-finland/everyday-life-in-finland" }],
        summary: "Các lựa chọn gồm siêu thị, chợ trong nhà, chợ quảng trường, nhóm REKO và cửa hàng Á; lịch hoạt động tùy địa phương.",
    summaryEn: "Options include supermarkets, indoor market halls, market squares, REKO groups and Asian shops; schedules vary locally.",
    steps: [
          { vi: "Xem giờ và địa chỉ trên trang cửa hàng trước khi đi, kể cả Chủ nhật và ngày lễ.", en: "Check store hours and addresses before visiting, including Sundays and holidays." },
          { vi: "Chợ trong nhà có quầy thực phẩm và dịch vụ khác nhau; so sánh giá và nguồn gốc sản phẩm.", en: "Indoor markets have different food stalls and services; compare prices and product origins." },
          { vi: "Chợ quảng trường hoạt động theo mùa và sự kiện; kiểm tra lịch của thành phố hoặc nhà tổ chức.", en: "Market squares operate seasonally and for events; check city or organiser schedules." },
          { vi: "Với REKO, xem lịch đặt/nhận hàng, phương thức thanh toán và người bán trong nhóm địa phương.", en: "For REKO, check local ordering/pickup schedules, payment methods and sellers." },
          { vi: "Cửa hàng Á có danh mục hàng khác nhau; hỏi về thành phần và dị ứng nếu cần.", en: "Asian shops stock different products; ask about ingredients and allergens when needed." },
        ],
    keyTerms: [
      { fi: "Tori", vi: "Chợ ngoài trời", en: "Outdoor market square" },
      { fi: "Kauppahalli", vi: "Chợ trong nhà", en: "Indoor market hall" },
      { fi: "Lähiruoka", vi: "Thực phẩm địa phương", en: "Local food" },
      { fi: "Aasialainen kauppa", vi: "Chợ châu Á", en: "Asian market" },
    ],
    phrases: [
      { fi: "Onko tämä lähiruokaa?", vi: "Đây có phải đồ địa phương không?", en: "Is this local food?" },
      { fi: "Mistä löydän aasialaisen kaupan?", vi: "Tôi tìm chợ Á ở đâu?", en: "Where can I find an Asian market?" },
    ],
    proTip: { vi: "Không coi lịch nhận REKO hoặc giờ chợ là giống nhau ở mọi thành phố.", en: "Do not assume REKO pickup schedules or market hours are the same in every city." },
  },
  {
    id: "second-hand-shopping",
    icon: "Recycle",
    emoji: "♻️",
    title: "Mua đồ cũ (Kirpputori)",
    titleEn: "Second-hand Shopping (Kirpputori)",
    sources: [{ label: "www.kkv.fi", url: "https://www.kkv.fi/en/consumer-affairs/" }, { label: "www.kyberturvallisuuskeskus.fi", url: "https://www.kyberturvallisuuskeskus.fi/en" }],
        summary: "Đồ cũ có thể giảm chi phí và rác thải; kiểm tra tình trạng, an toàn và quyền người mua trước khi trả tiền.",
    summaryEn: "Second-hand items can reduce costs and waste; check condition, safety and buyer rights before paying.",
    steps: [
          { vi: "Tìm cửa hàng đồ cũ hoặc trung tâm tái sử dụng; kiểm tra giờ, chính sách đổi trả và tình trạng hàng.", en: "Find thrift shops or reuse centres; check hours, return policies and item condition." },
          { vi: "Trên chợ online, xác minh người bán và dùng kênh thanh toán an toàn; tránh liên kết vận chuyển/thanh toán do người lạ gửi.", en: "On online marketplaces, verify the seller and use safe payment channels; avoid shipping/payment links sent by strangers." },
          { vi: "Hỏi rõ đồ cho miễn phí có được phép lấy không; không lấy đồ ở sân, kho hoặc thùng rác khi chưa có sự đồng ý.", en: "Ask whether free items may be collected; do not take items from yards, storage or bins without permission." },
          { vi: "Nếu bán đồ tại kirpputori, xem phí thuê quầy, hoa hồng và trách nhiệm khi mất hàng; không có mức thu nhập bảo đảm.", en: "If selling through a flea market, check shelf fees, commission and liability for losses; earnings are not guaranteed." },
          { vi: "Thận trọng với đồ điện, ghế trẻ em và thiết bị an toàn; quyền người mua khác nhau giữa cửa hàng và người bán tư nhân.", en: "Be cautious with electrical items, child seats and safety equipment; buyer rights differ between businesses and private sellers." },
        ],
    keyTerms: [
      { fi: "Kirpputori", vi: "Chợ đồ cũ", en: "Flea market" },
      { fi: "Käytetty", vi: "Đã qua sử dụng", en: "Used / second-hand" },
      { fi: "Ilmainen", vi: "Miễn phí", en: "Free" },
      { fi: "Hyväkuntoinen", vi: "Tình trạng tốt", en: "In good condition" },
      { fi: "Nouto", vi: "Tự đến lấy", en: "Pickup (buyer collects)" },
    ],
    phrases: [
      { fi: "Onko tämä vielä myynnissä?", vi: "Cái này còn bán không?", en: "Is this still for sale?" },
      { fi: "Voinko tulla katsomaan?", vi: "Tôi đến xem được không?", en: "Can I come and see it?" },
      { fi: "Onko hinta neuvoteltavissa?", vi: "Giá có thương lượng được không?", en: "Is the price negotiable?" },
      { fi: "Otan sen!", vi: "Tôi lấy nó!", en: "I'll take it!" },
    ],
    proTip: { vi: "Lập danh sách đồ cần thiết và so sánh tổng chi phí gồm vận chuyển, không chỉ giá món đồ.", en: "List essentials and compare total cost including transport, not only the item price." },
    mapLinks: [
      { label: "Tori.fi (online)", url: "https://www.tori.fi" },
      { label: "UFF Helsinki stores", url: "https://www.google.com/maps/search/UFF+Helsinki" },
      { label: "Fida second-hand", url: "https://www.google.com/maps/search/Fida+second+hand" },
    ],
  },
];

// ============================================================
// HOUSING & UTILITIES (Admin pillar)
// ============================================================

export const HOUSING_GUIDES: NewcomerGuide[] = [
  {
    id: "finding-housing-2026",
    icon: "Home",
    emoji: "🏠",
    title: "Tìm nhà ở Phần Lan (2026)",
    titleEn: "Finding Housing in Finland (2026)",
    sources: [{ label: "www.infofinland.fi", url: "https://www.infofinland.fi/en/housing/rental-housing" }, { label: "www.kela.fi", url: "https://www.kela.fi/student-housing-supplement" }],
        summary: "Đăng ký nhà sinh viên sớm và so sánh nhà tư nhân; giá, hàng chờ và tiêu chí ưu tiên thay đổi theo nhà cung cấp.",
    summaryEn: "Apply early for student housing and compare private rentals; prices, queues and priority criteria vary by provider.",
    steps: [
          { vi: "Tìm HOAS, TOAS, TYS hoặc PSOAS theo thành phố; xem điều kiện, thời hạn hồ sơ và loại phòng. Không có bảo đảm ưu tiên chung cho mọi sinh viên quốc tế.", en: "Find HOAS, TOAS, TYS or PSOAS for your city; check eligibility, application validity and room types. There is no universal priority guarantee for international students." },
          { vi: "So sánh nhà tư nhân, vị trí, chi phí đi lại và tổng tiền thuê gồm điện, nước, internet.", en: "Compare private rentals, location, commuting costs and total rent including electricity, water and internet." },
          { vi: "Phân biệt thuê chung với thuê lại; xác nhận người cho thuê có quyền cho thuê và ký hợp đồng rõ ràng.", en: "Distinguish shared renting from subletting; verify the lessor has the right to rent and use a clear contract." },
          { vi: "Tiền bảo đảm không được vượt quá ba tháng tiền thuê. Với hợp đồng không thời hạn, thời gian báo trước của người thuê thường một tháng; hợp đồng có thời hạn có quy tắc khác.", en: "Security cannot exceed three months’ rent. For an open-ended lease, the tenant’s notice period is generally one month; fixed-term leases have different rules." },
          { vi: "Từ tháng 8/2025, đa số sinh viên đủ điều kiện chuyển sang opintotuen asumislisä. Sinh viên sống cùng con có thể thuộc yleinen asumistuki; hỏi Kela về hoàn cảnh riêng.", en: "Since August 2025, most eligible students use the student housing supplement. Students living with their child may fall under general housing allowance; ask Kela about your circumstances." },
        ],
    keyTerms: [
      { fi: "Vuokra-asunto", vi: "Căn hộ cho thuê", en: "Rental apartment" },
      { fi: "Vuokrasopimus", vi: "Hợp đồng thuê nhà", en: "Rental contract" },
      { fi: "Vuokravakuus", vi: "Tiền đặt cọc", en: "Security deposit" },
      { fi: "Kimppakämppä", vi: "Nhà ở chung", en: "Shared apartment" },
      { fi: "Yhtiövastike", vi: "Phí quản lý chung cư", en: "Building maintenance fee" },
    ],
    phrases: [
      { fi: "Onko asunto vielä vapaana?", vi: "Căn hộ còn trống không?", en: "Is the apartment still available?" },
      { fi: "Milloin voin tulla katsomaan?", vi: "Khi nào tôi có thể đến xem?", en: "When can I come to view it?" },
      { fi: "Sisältyykö vuokraan vesi ja sähkö?", vi: "Tiền thuê có bao gồm điện nước không?", en: "Does the rent include water and electricity?" },
    ],
    proTip: { vi: "Xác minh chủ nhà và hợp đồng trước khi chuyển tiền; nếu nghi lừa đảo, liên hệ ngân hàng ngay và báo qua poliisi.fi.", en: "Verify the landlord and contract before transferring money; for suspected fraud, contact your bank immediately and report through poliisi.fi." },
  },
  {
    id: "sim-internet-2026",
    icon: "Wifi",
    emoji: "📶",
    title: "SIM điện thoại & Internet (2026)",
    titleEn: "Phone SIM & Internet (2026)",
    sources: [{ label: "www.traficom.fi", url: "https://www.traficom.fi/en/communications/broadband-and-telephone" }, { label: "europa.eu", url: "https://europa.eu/youreurope/citizens/consumers/internet-telecoms/mobile-roaming-costs/index_en.htm" }],
        summary: "DNA, Telia và Elisa cung cấp SIM trả trước và gói thuê bao; so sánh vùng phủ sóng, giá và điều kiện hiện hành.",
    summaryEn: "DNA, Telia and Elisa offer prepaid SIMs and subscriptions; compare coverage, prices and current terms.",
    steps: [
          { vi: "Kiểm tra vùng phủ sóng tại địa chỉ ở/làm việc và điện thoại có hỗ trợ SIM/eSIM hay không.", en: "Check coverage at home/work and whether your phone supports the SIM/eSIM." },
          { vi: "SIM trả trước có thể mua tại cửa hàng và một số quầy bán lẻ; không dựa vào lời hứa SIM miễn phí ở sân bay.", en: "Prepaid SIMs are sold in shops and some retail kiosks; do not rely on promises of a free airport SIM." },
          { vi: "Gói trả sau có yêu cầu xác minh danh tính, tín dụng hoặc tiền đặt cọc tùy nhà mạng; hỏi trước khi ký.", en: "Postpaid plans may require identity verification, credit checks or a deposit; ask before signing." },
          { vi: "Hỏi chủ nhà xem internet có trong tiền thuê không và cần kích hoạt hay mua router riêng không.", en: "Ask your landlord whether internet is included and whether activation or a separate router is needed." },
          { vi: "Roaming EU/EEA thường theo quy tắc roam-like-at-home nhưng có giới hạn sử dụng hợp lý và data; kiểm tra gói cước, không áp dụng cho mọi điểm đến hoặc mạng tàu/máy bay.", en: "EU/EEA roaming generally follows roam-like-at-home rules with fair-use and data limits; check your plan, as not every destination or ship/aircraft network is covered." },
        ],
    keyTerms: [
      { fi: "Liittymä", vi: "Gói cước", en: "Phone subscription" },
      { fi: "Prepaid", vi: "Trả trước", en: "Prepaid" },
      { fi: "Datapaketti", vi: "Gói dữ liệu", en: "Data package" },
      { fi: "Kuukausimaksu", vi: "Phí hàng tháng", en: "Monthly fee" },
    ],
    phrases: [
      { fi: "Haluaisin liittymän, jossa on rajaton data.", vi: "Tôi muốn gói data không giới hạn.", en: "I'd like a plan with unlimited data." },
      { fi: "Toimiiko tämä SIM EU:ssa?", vi: "SIM này dùng được ở EU không?", en: "Does this SIM work in the EU?" },
    ],
    proTip: { vi: "So sánh giá sau khuyến mãi, thời hạn ràng buộc và chi phí hủy; giá quảng cáo không nhất thiết là giá dài hạn.", en: "Compare post-promotion prices, commitment periods and cancellation costs; advertised prices may not be long-term prices." },
  },
];

// ============================================================
// MÙA ĐÔNG & MÙA HÈ (Daily pillar)
// ============================================================

export const SEASONAL_GUIDES: NewcomerGuide[] = [
  {
    id: "winter-survival-2026",
    icon: "Snowflake",
    emoji: "❄️",
    title: "Sống sót mùa đông Phần Lan",
    titleEn: "Surviving Finnish Winter",
    sources: [{ label: "en.ilmatieteenlaitos.fi", url: "https://en.ilmatieteenlaitos.fi/" }, { label: "www.ruokavirasto.fi", url: "https://www.ruokavirasto.fi/en/foodstuffs/healthy-diet/nutrients/vitamin-d/" }, { label: "poliisi.fi", url: "https://poliisi.fi/en/traffic-safety" }],
        summary: "Thời tiết mùa đông khác nhau theo vùng và năm; theo dõi dự báo, cảnh báo và chuẩn bị đồ phù hợp.",
    summaryEn: "Winter conditions vary by region and year; follow forecasts/warnings and prepare suitable clothing.",
    steps: [
          { vi: "Mặc nhiều lớp, giữ tay/chân/đầu ấm và chọn giày phù hợp điều kiện, không cần một thương hiệu cụ thể.", en: "Dress in layers, keep hands/feet/head warm and choose footwear for conditions; no particular brand is required." },
          { vi: "Vitamin D: nhu cầu và bổ sung tùy tuổi, chế độ ăn, thai kỳ và bệnh lý. Xem hướng dẫn Ruokavirasto hoặc hỏi nhân viên y tế; không tự dùng 50–100µg/ngày như liều chuẩn.", en: "Vitamin D needs/supplementation depend on age, diet, pregnancy and health. Follow Finnish Food Authority guidance or ask a clinician; do not use 50–100µg/day as a default dose." },
          { vi: "Dùng liukuesteet cho giày khi đường đóng băng và bước ngắn, chậm; tháo khi vào sàn không phù hợp.", en: "Use shoe ice grippers on icy routes and take short, slow steps; remove them on unsuitable indoor floors." },
          { vi: "Giữ lịch ngủ và hoạt động ngoài trời phù hợp; hỏi chuyên viên y tế nếu buồn kéo dài hoặc muốn dùng đèn trị liệu.", en: "Keep a sleep routine and suitable outdoor activity; ask a clinician about persistent low mood or light therapy." },
          { vi: "Lốp đông cần từ tháng 11 đến tháng 3 khi thời tiết/đường yêu cầu; có thể dùng lốp đinh hoặc lốp ma sát phù hợp.", en: "Winter tyres are required from November through March when weather/road conditions require them; suitable studded or non-studded winter tyres may be used." },
          { vi: "Theo dõi dự báo và trang FMI trước khi đi vùng xa; không có bảo đảm nhìn thấy cực quang.", en: "Check forecasts and FMI information before remote travel; seeing the northern lights is not guaranteed." },
        ],
    keyTerms: [
      { fi: "Talvi", vi: "Mùa đông", en: "Winter" },
      { fi: "Pakkanen", vi: "Lạnh giá (dưới 0°C)", en: "Frost / sub-zero cold" },
      { fi: "Lumi", vi: "Tuyết", en: "Snow" },
      { fi: "Liukastuminen", vi: "Trượt ngã", en: "Slipping" },
      { fi: "Kaamosmasennus", vi: "Trầm cảm mùa đông", en: "Winter depression (SAD)" },
    ],
    phrases: [
      { fi: "On todella kylmä tänään!", vi: "Hôm nay lạnh kinh khủng!", en: "It's really cold today!" },
      { fi: "Ovatko tiet liukkaat?", vi: "Đường có trơn không?", en: "Are the roads slippery?" },
    ],
    proTip: { vi: "Mang phản quang, sạc điện thoại và cho người khác biết hành trình khi đi vùng xa.", en: "Wear reflectors, charge your phone and tell someone your route for remote trips." },
  },
];

// ============================================================
// TIPS RIÊNG CHO DU HỌC SINH (Work pillar)
// ============================================================

export const STUDENT_TIPS_GUIDES: NewcomerGuide[] = [
  {
    id: "student-life-hacks-2026",
    icon: "GraduationCap",
    emoji: "🎓",
    title: "20 Tips vàng cho du học sinh mới sang (2026)",
    titleEn: "20 Golden Tips for New Students (2026)",
    sources: [{ label: "www.kela.fi", url: "https://www.kela.fi/meal-subsidy" }, { label: "www.kela.fi", url: "https://www.kela.fi/healthcare-fee-for-students-in-higher-education" }, { label: "migri.fi", url: "https://migri.fi/en/working-and-internships-during-studies" }, { label: "migri.fi", url: "https://migri.fi/en/extended-permit" }],
        summary: "Các mẹo cho sinh viên: kiểm tra điều kiện riêng về cư trú, quyền làm việc, y tế và giảm giá; không phải ai cũng hưởng mọi quyền lợi.",
    summaryEn: "Student tips: check individual conditions for residence, work rights, healthcare and discounts; not everyone receives every entitlement.",
    steps: [
          { vi: "Dùng thẻ sinh viên được nơi cung cấp chấp nhận (ví dụ Frank/Tuudo); kiểm tra giảm giá từng dịch vụ.", en: "Use a student ID accepted by the provider (for example Frank/Tuudo); check each service’s discount." },
          { vi: "Bữa ăn cơ bản có trợ giá Kela cho sinh viên đủ điều kiện có giá tối đa 3,10 EUR năm 2026; bữa đặc biệt có giá khác.", en: "A standard Kela-subsidised meal for eligible students costs at most EUR 3.10 in 2026; special meals have different prices." },
          { vi: "Mượn giáo trình, dùng tài nguyên trường và sách truy cập mở hợp pháp; hỏi thư viện về bản quyền.", en: "Borrow textbooks and use university resources and lawful open-access books; ask the library about licensing." },
          { vi: "Giấy phép cư trú diện học tập thường cho phép làm bình quân 30 giờ/tuần; giới hạn tính bình quân, không phải giới hạn cứng từng tuần. Kiểm tra Migri và giấy phép của bạn.", en: "A residence permit for studies generally permits an average of 30 work hours per week; this is an average, not a fixed weekly cap. Check Migri and your permit." },
          { vi: "Xem chương trình thể thao do trường cung cấp và bảng phí hiện tại.", en: "Check your institution’s sports services and current prices." },
          { vi: "Dùng thư viện công; thiết bị và tài liệu có thể mượn khác nhau theo chi nhánh.", en: "Use public libraries; available equipment and materials vary by branch." },
          { vi: "Đi xe đạp: đèn trắng/vàng trước, đỏ sau khi tối hoặc tầm nhìn kém; xem luật và trang an toàn giao thông.", en: "Cycling: use a white/yellow front light and red rear light in darkness or poor visibility; check traffic rules and safety guidance." },
          { vi: "Hỏi trường về khóa Finnish; khóa hòa nhập do dịch vụ địa phương sắp xếp theo kế hoạch, không tự động miễn phí cho mọi sinh viên.", en: "Ask your institution about Finnish courses; local services arrange integration training under a plan, not automatically for every student." },
          { vi: "Tìm hội sinh viên và mạng hỗ trợ qua trường; kiểm tra nhóm và lịch sự kiện trước khi tham gia.", en: "Find student associations and support networks through your institution; check groups and event schedules before joining." },
          { vi: "Chuyển tiền quốc tế: so sánh phí, tỷ giá, thời gian và tổng tiền người nhận nhận được.", en: "International transfers: compare fees, exchange rates, timing and the recipient’s final amount." },
          { vi: "Gọi qua internet có thể tiết kiệm; vẫn có chi phí data và điều kiện roaming.", en: "Internet calls may save money; data costs and roaming terms still apply." },
          { vi: "Mua vật dụng thiết yếu theo ngân sách; so sánh đồ cũ, độ an toàn và phí vận chuyển.", en: "Buy essentials within your budget; compare used items, safety and delivery costs." },
          { vi: "Dùng dự báo và cảnh báo thời tiết FMI; ứng dụng thương mại là lựa chọn bổ sung.", en: "Use FMI forecasts and weather warnings; commercial apps are additional options." },
          { vi: "Tìm hành trình và vé trên trang nhà vận hành địa phương; mua đúng vùng và thời hạn.", en: "Plan routes and tickets with your local operator; buy the correct zones and validity." },
          { vi: "Kiểm tra phòng có nội thất và đồ dùng gì trước khi đến; không phải nhà sinh viên nào cũng có giường.", en: "Check what furniture and supplies are included before arrival; not every student flat includes a bed." },
          { vi: "Vaccine miễn phí phụ thuộc chương trình quốc gia, tuổi và nhóm nguy cơ; hỏi y tế sinh viên hoặc trạm y tế.", en: "Free vaccines depend on the national programme, age and risk group; ask student healthcare or your health centre." },
          { vi: "Sinh viên đại học đủ điều kiện dùng YTHS/FSHS; phí Kela 2026 là 35,35 EUR/học kỳ, có ngoại lệ. Dịch vụ không có phí khám thông thường, nhưng có thể có phí bỏ hẹn.", en: "Eligible higher-education students use YTHS/FSHS; the 2026 Kela fee is EUR 35.35 per term, with exemptions. Ordinary visits have no appointment fee, but missed-appointment charges may apply." },
          { vi: "Xin gia hạn trước khi giấy phép hết hạn; phí và thời gian xử lý phụ thuộc loại hồ sơ và cách nộp, xem Migri hiện hành.", en: "Apply for an extension before your permit expires; fees and processing times depend on application type/method, so check current Migri guidance." },
          { vi: "Tìm việc qua trường, Job Market Finland và mạng nghề nghiệp; xác minh nhà tuyển dụng và quyền làm việc.", en: "Look for work through your institution, Job Market Finland and professional networks; verify employers and your work rights." },
          { vi: "Giữ liên hệ xã hội và nhờ hỗ trợ khi cần; không có thời hạn bảo đảm đạt B1 hoặc hòa nhập.", en: "Maintain social connections and seek support when needed; there is no guaranteed deadline for reaching B1 or settling in." },
        ],
    keyTerms: [
      { fi: "Opiskelija", vi: "Sinh viên", en: "Student" },
      { fi: "Opiskelijakortti", vi: "Thẻ sinh viên", en: "Student ID" },
      { fi: "Opintotuki", vi: "Trợ cấp học tập", en: "Study allowance" },
      { fi: "Asuntola", vi: "Ký túc xá", en: "Student dorm" },
      { fi: "Lukukausimaksu", vi: "Học phí học kỳ", en: "Tuition fee per semester" },
    ],
    phrases: [
      { fi: "Olen vaihto-opiskelija.", vi: "Tôi là sinh viên trao đổi.", en: "I'm an exchange student." },
      { fi: "Onko opiskelija-alennusta?", vi: "Có giảm giá sinh viên không?", en: "Is there a student discount?" },
      { fi: "Voitko auttaa minua suomen kielen kanssa?", vi: "Bạn giúp tôi tiếng Phần Lan được không?", en: "Can you help me with Finnish?" },
    ],
    proTip: { vi: "Điều kiện Kela và giấy phép cư trú là hai vấn đề khác nhau; kiểm tra cả hai trước khi nhận việc hoặc xin trợ cấp.", en: "Kela eligibility and residence-permit conditions are separate issues; check both before taking work or claiming support." },
  },
  {
    id: "vietnamese-community-2026",
    icon: "Users",
    emoji: "🇻🇳",
    title: "Cộng đồng Việt tại Phần Lan",
    titleEn: "Vietnamese Community in Finland",
    sources: [{ label: "www.infofinland.fi", url: "https://www.infofinland.fi/en" }, { label: "vnembassy-helsinki.mofa.gov.vn", url: "https://vnembassy-helsinki.mofa.gov.vn/en-us/Pages/default.aspx" }],
        summary: "Kết nối cộng đồng Việt và cộng đồng địa phương; kiểm tra thông tin nhóm, sự kiện và dịch vụ lãnh sự từ nguồn hiện hành.",
    summaryEn: "Connect with Vietnamese and local communities; verify current group, event and consular information.",
    steps: [
          { vi: "Tìm nhóm cộng đồng qua người quen hoặc trường; không chia sẻ giấy tờ, mã định danh hay chuyển tiền cho người chưa xác minh.", en: "Find community groups through trusted contacts or your institution; do not share documents/identity codes or send money to unverified contacts." },
          { vi: "Dịch vụ lãnh sự: xem địa chỉ, lịch hẹn và giấy tờ trên trang Đại sứ quán Việt Nam tại Phần Lan trước khi đi.", en: "For consular services, check the Vietnamese Embassy in Finland’s current address, appointments and documents before visiting." },
          { vi: "Xem thông tin nhà hàng/cửa hàng đang hoạt động và giờ mở cửa; không coi gợi ý cộng đồng là chứng nhận chất lượng.", en: "Check current restaurant/shop availability and opening hours; community recommendations are not quality certifications." },
          { vi: "Ngày và địa điểm Tết, Trung Thu và các sự kiện khác do nhà tổ chức công bố mỗi năm.", en: "Organisers announce dates and venues for Tết, Mid-Autumn and other events each year." },
          { vi: "Việc làm phải tuân thủ quyền làm việc, hợp đồng và TES áp dụng; không có mức lương hoặc yêu cầu ngôn ngữ chung cho mọi nhà hàng.", en: "Work must comply with work rights, contracts and applicable collective agreements; there is no universal pay rate or language requirement for restaurants." },
        ],
    keyTerms: [
      { fi: "Vietnamilainen", vi: "Người Việt", en: "Vietnamese (person)" },
      { fi: "Yhteisö", vi: "Cộng đồng", en: "Community" },
      { fi: "Suurlähetystö", vi: "Đại sứ quán", en: "Embassy" },
      { fi: "Tapahtuma", vi: "Sự kiện", en: "Event" },
    ],
    phrases: [
      { fi: "Olen vietnamilainen.", vi: "Tôi là người Việt Nam.", en: "I am Vietnamese." },
      { fi: "Onko täällä vietnamilaista yhteisöä?", vi: "Ở đây có cộng đồng Việt không?", en: "Is there a Vietnamese community here?" },
    ],
    proTip: { vi: "Hỏi trường về buddy/mentor programme; thời lượng và người hỗ trợ tùy chương trình.", en: "Ask your institution about buddy/mentor programmes; duration and support vary." },
    mapLinks: [
      { label: "Vietnamese Embassy Helsinki", url: "https://www.google.com/maps/search/Vietnam+Embassy+Helsinki+Kulosaarentie" },
      { label: "Saigon Restaurant Helsinki", url: "https://www.google.com/maps/search/Saigon+Restaurant+Helsinki" },
    ],
  },
];

// ============================================================
// CHECKLIST MỞ RỘNG (week 4 + week 5–8 long-term)
// ============================================================

export const FIRST_30_DAYS_CHECKLIST_EXPANSION: ChecklistItem[] = [
  { key: "tori-account", vi: "Tạo tài khoản Tori.fi để mua đồ cũ", en: "Create Tori.fi account for second-hand", category: "daily", week: 1 },
  { key: "welcome-sim", vi: "Lấy Welcome SIM miễn phí ở sân bay (nếu mới đến)", en: "Pick up free Welcome SIM at airport (if just arrived)", category: "daily", week: 1 },
  { key: "vitamin-d", vi: "Mua Vitamin D 50–100µg (Oct–Mar)", en: "Buy Vitamin D 50–100µg (Oct–Mar)", category: "health", week: 2 },
  { key: "ice-grippers", vi: "Mua liukuesteet (đinh chống trượt) cho mùa đông", en: "Buy ice grippers (liukuesteet) for winter", category: "daily", week: 2 },
  { key: "frank-app", vi: "Cài app Frank/Tuudo (thẻ sinh viên số)", en: "Install Frank/Tuudo (digital student ID)", category: "work", week: 2 },
  { key: "asian-market", vi: "Tìm chợ Á gần nhất (Vii Voan, Hoan Nam, Tokyokan)", en: "Locate nearest Asian market (Vii Voan, Hoan Nam, Tokyokan)", category: "daily", week: 3 },
  { key: "reko-group", vi: "Tham gia REKO Facebook group ở thành phố bạn", en: "Join your city's REKO Facebook group", category: "daily", week: 3 },
  { key: "asumistuki", vi: "Nộp đơn xin trợ cấp nhà Yleinen asumistuki", en: "Apply for Kela housing benefit (Yleinen asumistuki)", category: "admin", week: 3 },
  { key: "winter-jacket", vi: "Đầu tư áo khoác mùa đông + bốt chống trượt", en: "Invest in winter jacket + waterproof boots", category: "daily", week: 4 },
  { key: "vietnamese-community", vi: "Tham gia FB 'Người Việt tại Phần Lan' & VSAF", en: "Join 'Vietnamese in Finland' FB & VSAF", category: "daily", week: 4 },
  { key: "remittance-app", vi: "Cài Wise/Revolut để chuyển tiền về VN rẻ", en: "Install Wise/Revolut for cheap VN remittance", category: "admin", week: 4 },
  { key: "weather-app", vi: "Cài Foreca / Yle Säätutka (dự báo thời tiết)", en: "Install Foreca / Yle Säätutka (weather)", category: "daily", week: 4 },
];
