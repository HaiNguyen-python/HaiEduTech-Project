/**
 * @file lifeInFinlandExpansion3.ts
 * @description Phase-3 expansion (2026): integration courses, libraries & free
 *              culture, Finnish working culture deep-dive, recycling system,
 *              winter driving safety, and extra checklist items.
 * @author HaiEduTech
 */

import type { NewcomerGuide, ChecklistItem } from "./lifeInFinlandData";

// ============================================================
// WORK / EDUCATION pillar additions
// ============================================================
export const INTEGRATION_GUIDES: NewcomerGuide[] = [
  {
    id: "kotoutumiskoulutus-2026",
    icon: "GraduationCap",
    emoji: "🎓",
    title: "Kotoutumiskoulutus - Khóa hòa nhập miễn phí",
    titleEn: "Integration training (free Finnish course)",
    sources: [{ label: "tyomarkkinatori.fi", url: "https://tyomarkkinatori.fi/en/personal-customers" }, { label: "kotoutuminen.fi", url: "https://kotoutuminen.fi/en/integration-training" }, { label: "www.kela.fi", url: "https://www.kela.fi/general-social-security-benefit" }, { label: "migri.fi", url: "https://migri.fi/en/language-skills" }],
    summary: "Từ 2025, dịch vụ việc làm chuyển sang đô thị/khu vực việc làm. Khóa hòa nhập và trợ cấp tùy kế hoạch, điều kiện và quyết định riêng.",
    summaryEn: "Since 2025, employment services are organised by municipalities/employment areas. Integration training and benefits depend on a plan, eligibility and individual decisions.",
    steps: [
          { vi: "Nếu phù hợp hoàn cảnh, đăng ký tìm việc tại Job Market Finland và liên hệ cơ quan việc làm địa phương; người không thuộc lực lượng lao động hỏi dịch vụ hòa nhập đô thị.", en: "Where appropriate, register as a jobseeker at Job Market Finland and contact local employment services; people outside the labour force can ask municipal integration services." },
          { vi: "Yêu cầu đánh giá nhu cầu và kế hoạch hòa nhập; cơ quan địa phương quyết định cách đánh giá ngôn ngữ và phân lớp, không chỉ Testipiste.", en: "Request a needs assessment and integration plan; local authorities choose language assessment and placement methods, not only Testipiste." },
          { vi: "Lịch, thời lượng và thực tập tùy khóa; hỏi điều kiện tham gia và hỗ trợ thu nhập, không có mức trợ cấp bảo đảm cho mọi người học.", en: "Schedules, duration and placements vary; ask about participation and income support, as no benefit rate is guaranteed to every trainee." },
          { vi: "Khóa có đánh giá cuối khóa theo chương trình; YKI là kỳ thi riêng và không tự động tổ chức trong mọi khóa. Quốc tịch có nhiều điều kiện và cách chứng minh ngôn ngữ.", en: "Courses include programme assessment; YKI is a separate exam and is not automatically included in every course. Citizenship has multiple requirements and ways to prove language skills." },
        ],
    keyTerms: [
      { fi: "Kotoutumiskoulutus", vi: "Khóa hòa nhập", en: "Integration training" },
      { fi: "Työllisyyspalvelut", vi: "Dịch vụ việc làm địa phương", en: "Local employment services" },
      { fi: "Työharjoittelu", vi: "Thực tập", en: "Work placement" },
      { fi: "Kielitaito", vi: "Trình độ tiếng", en: "Language proficiency" },
    ],
    phrases: [
      { fi: "Haluaisin aloittaa kotoutumiskoulutuksen.", vi: "Tôi muốn bắt đầu khóa hòa nhập.", en: "I'd like to start integration training." },
      { fi: "Milloin seuraava kurssi alkaa?", vi: "Khoá tiếp theo bắt đầu khi nào?", en: "When does the next course start?" },
    ],
    proTip: { vi: "Dùng Job Market Finland và cơ quan đô thị thay cho TE-toimisto cũ; kiểm tra thay đổi trợ cấp trực tiếp với Kela.", en: "Use Job Market Finland and municipal authorities rather than former TE offices; check benefit changes directly with Kela." },
  },
];

// ============================================================
// DAILY pillar additions
// ============================================================
export const LIBRARY_GUIDES: NewcomerGuide[] = [
  {
    id: "library-helmet",
    icon: "BookOpen",
    emoji: "📚",
    title: "Thư viện Helmet & Yle Areena",
    titleEn: "Helmet libraries & Yle Areena",
    sources: [{ label: "www.helmet.fi", url: "https://helmet.finna.fi/?lng=en-gb" }, { label: "areena.yle.fi", url: "https://areena.yle.fi/" }],
    summary: "Thẻ và mượn tài liệu thư viện thường miễn phí; in ấn, trả muộn hoặc một số dịch vụ có thể có phí. Yle Areena có quyền xem và phụ đề theo chương trình.",
    summaryEn: "Library cards and borrowing are generally free; printing, late returns or some services may cost extra. Yle Areena access and subtitles vary by programme.",
    steps: [
          { vi: "Helmet phục vụ Helsinki, Espoo, Kauniainen và Vantaa; xem giấy tờ, địa chỉ và quy định trẻ em khi đăng ký thẻ.", en: "Helmet serves Helsinki, Espoo, Kauniainen and Vantaa; check identification, address and children’s card requirements." },
          { vi: "Kiểm tra giới hạn mượn, hạn trả và giờ trả sách theo thư viện; không mọi điểm trả mở 24/7.", en: "Check borrowing limits, due dates and return hours; not every return point is open 24/7." },
          { vi: "Phòng và thiết bị có thể cần đặt qua trang thành phố/nhà cung cấp; không phải tất cả qua một ứng dụng Helmet.", en: "Rooms and equipment may require booking through city/provider services; they are not all booked through one Helmet app." },
          { vi: "Trên Yle Areena, xem lựa chọn phụ đề và hạn xem của từng chương trình; tiếng Anh không luôn có và một số nội dung bị giới hạn vùng.", en: "On Yle Areena, check subtitles and availability for each programme; English is not always available and some content is region-restricted." },
        ],
    keyTerms: [
      { fi: "Kirjasto", vi: "Thư viện", en: "Library" },
      { fi: "Lainata", vi: "Mượn", en: "To borrow" },
      { fi: "Palauttaa", vi: "Trả lại", en: "To return" },
      { fi: "Tekstitys", vi: "Phụ đề", en: "Subtitles" },
    ],
    phrases: [
      { fi: "Haluaisin hankkia kirjastokortin.", vi: "Tôi muốn làm thẻ thư viện.", en: "I'd like to make a library card." },
      { fi: "Onko teillä suomenkielisiä helppolukuisia kirjoja?", vi: "Có sách dễ đọc tiếng Phần không?", en: "Do you have easy-reading Finnish books?" },
    ],
    proTip: { vi: "Hỏi thư viện về selkokirjat và tài liệu học Finnish phù hợp trình độ.", en: "Ask librarians about easy-language books and Finnish-learning materials for your level." },
  },
  {
    id: "recycling-2026",
    icon: "Recycle",
    emoji: "♻️",
    title: "Hệ thống tái chế Rinki & Pantti",
    titleEn: "Rinki recycling & Pantti deposits",
    sources: [{ label: "rinkiin.fi", url: "https://rinkiin.fi/en/for-households/" }, { label: "www.palpa.fi", url: "https://www.palpa.fi/beverage-container-recycling/deposit-refund-system/" }, { label: "www.hsy.fi", url: "https://www.hsy.fi/en/waste-and-recycling/" }],
    summary: "Rinki dành cho bao bì; Pantti hoàn khoản đặt cọc đã trả, không phải thu nhập hoặc khoản tiết kiệm cố định.",
    summaryEn: "Rinki is for packaging; Pantti returns a deposit you paid, not a fixed income or saving.",
    steps: [
          { vi: "Theo hướng dẫn địa phương, tách rác hữu cơ, bao bì, giấy và rác đặc biệt; không dùng cùng một thùng cho mọi loại.", en: "Follow local instructions for bio-waste, packaging, paper and special waste; do not use one bin for all materials." },
          { vi: "Kiểm tra logo đặt cọc trên chai/lon và giữ nguyên mã để máy đọc; khoản hoàn theo loại vỏ.", en: "Check the deposit mark and keep the barcode readable; refunds depend on container type." },
          { vi: "Đồ điện tử và pin mang đến điểm chuyên dụng hoặc cửa hàng nhận lại theo điều kiện; xác nhận trước loại thiết bị và phí.", en: "Take electronics/batteries to dedicated or eligible retailer collection points; confirm accepted devices and charges first." },
          { vi: "Quyên góp quần áo sạch còn sử dụng tốt; dệt may hỏng theo hướng dẫn địa phương, không tự bỏ vào thùng quyên góp.", en: "Donate clean usable clothing; follow local rules for damaged textiles rather than placing them in donation bins." },
        ],
    keyTerms: [
      { fi: "Kierrätys", vi: "Tái chế", en: "Recycling" },
      { fi: "Lajittelu", vi: "Phân loại", en: "Sorting" },
      { fi: "Pantti", vi: "Đặt cọc vỏ chai", en: "Bottle deposit" },
      { fi: "Biojäte", vi: "Rác hữu cơ", en: "Bio waste" },
    ],
    phrases: [
      { fi: "Missä on lähin Sortti-asema?", vi: "Trạm phân loại gần nhất ở đâu?", en: "Where is the nearest sorting station?" },
      { fi: "Voinko palauttaa nämä pullot tänne?", vi: "Tôi có thể trả vỏ chai ở đây không?", en: "Can I return these bottles here?" },
    ],
    proTip: { vi: "Xem điểm thu gom tại kierratys.info và hướng dẫn HSY hoặc đơn vị địa phương.", en: "Use kierratys.info and HSY or your local waste authority’s instructions." },
  },
];

// ============================================================
// HEALTH pillar additions
// ============================================================
export const WINTER_SAFETY_GUIDES: NewcomerGuide[] = [
  {
    id: "winter-driving",
    icon: "Snowflake",
    emoji: "❄️",
    title: "Lái xe & đi bộ an toàn mùa đông",
    titleEn: "Winter driving & walking safety",
    sources: [{ label: "poliisi.fi", url: "https://poliisi.fi/en" }, { label: "www.liikenneturva.fi", url: "https://www.liikenneturva.fi/en/" }, { label: "en.ilmatieteenlaitos.fi", url: "https://en.ilmatieteenlaitos.fi/" }, { label: "116117.fi", url: "https://116117.fi/en" }],
    summary: "Lốp đông cần từ tháng 11 đến tháng 3 khi thời tiết hoặc đường yêu cầu; giày chống trượt và phản quang giúp đi bộ an toàn.",
    summaryEn: "Winter tyres are needed from November through March when weather or roads require them; shoe grippers and reflectors help pedestrian safety.",
    steps: [
          { vi: "Đánh giá thời tiết và thay lốp phù hợp trước khi lái; lốp đinh không bắt buộc, lốp ma sát phù hợp cũng được dùng.", en: "Assess conditions and fit suitable tyres before driving; studs are not mandatory, as suitable non-studded winter tyres are also allowed." },
          { vi: "Dùng liukuesteet cho giày và bước cẩn thận; jääpiikit thường là dụng cụ thoát thân khi rơi xuống băng, không tên chuẩn của đinh giày.", en: "Use liukuesteet shoe grippers and walk carefully; jääpiikit normally means ice-rescue picks, not the standard name for shoe grips." },
          { vi: "Người đi bộ trên đường khi tối thường phải dùng phản quang phù hợp; heijastin là vật phản quang, không phải đèn.", en: "Pedestrians on roads in darkness should generally use a suitable reflector; heijastin is a reflector, not a lamp." },
          { vi: "Theo dõi cảnh báo FMI và thông tin đường; giảm tốc và tăng khoảng cách trong điều kiện xấu.", en: "Follow FMI warnings and road information; reduce speed and increase spacing in poor conditions." },
        ],
    keyTerms: [
      { fi: "Talvirengas", vi: "Lốp đông", en: "Winter tyre" },
      { fi: "Liukuesteet", vi: "Đế chống trượt cho giày", en: "Shoe ice grippers" },
      { fi: "Heijastin", vi: "Vật phản quang", en: "Reflector" },
      { fi: "Liukastua", vi: "Trượt ngã", en: "To slip" },
    ],
    phrases: [
      { fi: "Onko tie liukas tänään?", vi: "Hôm nay đường có trơn không?", en: "Is the road slippery today?" },
      { fi: "Tarvitsen talvirenkaat autooni.", vi: "Tôi cần lốp đông cho xe.", en: "I need winter tyres for my car." },
    ],
    proTip: { vi: "Sau ngã, đánh giá chấn thương: nguy hiểm tính mạng gọi 112; vấn đề y tế gấp gọi 116 117 theo vùng. Phí tùy quyền điều trị và dịch vụ, không bảo đảm Kela trả 100%.", en: "After a fall, assess the injury: call 112 for life-threatening danger; for urgent medical advice use 116 117 where available. Costs depend on entitlement and service; Kela does not guarantee 100% coverage." },
  },
];

// ============================================================
// EXTRA CHECKLIST ITEMS
// ============================================================
export const FIRST_30_DAYS_CHECKLIST_V3: ChecklistItem[] = [
  { key: "library-helmet-card", vi: "Đăng ký thẻ thư viện Helmet/Vaski/Piki", en: "Sign up for Helmet/Vaski/Piki library card", category: "daily", week: 2 },
  { key: "te-palvelut", vi: "Đăng ký tìm việc trên Job Market Finland nếu phù hợp hoàn cảnh", en: "Register as a jobseeker on Job Market Finland if appropriate", category: "work", week: 3 },
  { key: "integration-plan", vi: "Hỏi dịch vụ hòa nhập/việc làm đô thị về kế hoạch hòa nhập nếu phù hợp", en: "Ask municipal integration/employment services about an integration plan if applicable", category: "work", week: 3 },
  { key: "winter-tyres", vi: "Kiểm tra lốp đông tháng 11–3 khi thời tiết/đường yêu cầu (nếu lái xe)", en: "Check winter tyres November–March when conditions require them (if driving)", category: "daily", week: 4 },
  { key: "reflector", vi: "Mua vật phản quang (heijastin) phù hợp cho đi bộ khi tối", en: "Get a suitable reflector (heijastin) for walking in darkness", category: "daily", week: 2 },
  { key: "pantti-routine", vi: "Bắt đầu lưu chai để hoàn Pantti", en: "Start saving bottles for Pantti refunds", category: "daily", week: 3 },
  { key: "yle-areena", vi: "Xem quyền truy cập và lựa chọn phụ đề của chương trình Yle Areena", en: "Check Yle Areena programme access and available subtitles", category: "daily", week: 2 },
];
