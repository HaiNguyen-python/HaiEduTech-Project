/**
 * @file lifeInFinlandData.ts
 * @description Newcomer guide content for living in Finland - admin, daily life,
 *              employment & tax, healthcare. Bilingual VI/EN with key Finnish terms.
 *              Updated for 2026 with shopping, housing, winter, student tips.
 * @author HaiEduTech
 */

export interface FinnishKeyTerm {
  fi: string;
  vi: string;
  en: string;
}

export interface SurvivalPhrase {
  fi: string;
  vi: string;
  en: string;
}

export interface NewcomerGuide {
  id: string;
  icon: string; // lucide icon name
  emoji: string;
  title: string; // Vietnamese
  titleEn: string;
  summary: string;
  summaryEn: string;
  steps: { vi: string; en: string }[];
  keyTerms: FinnishKeyTerm[];
  phrases: SurvivalPhrase[];
  proTip?: { vi: string; en: string };
  sources: { label: string; url: string }[];
  mapLinks?: { label: string; url: string }[];
}

export interface NewcomerCategory {
  id: string;
  pillar: "admin" | "daily" | "work" | "health";
  icon: string;
  emoji: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  guides: NewcomerGuide[];
}

import {
  SHOPPING_GUIDES,
  HOUSING_GUIDES,
  SEASONAL_GUIDES,
  STUDENT_TIPS_GUIDES,
  FIRST_30_DAYS_CHECKLIST_EXPANSION,
} from "./lifeInFinlandExpansion";
import {
  TRANSPORT_GUIDES,
  BANKING_GUIDES,
  CULTURE_GUIDES,
  FAMILY_HEALTH_GUIDES,
  ADVANCED_HEALTH_GUIDES,
  FIRST_30_DAYS_CHECKLIST_V2,
} from "./lifeInFinlandExpansion2";
import {
  INTEGRATION_GUIDES,
  LIBRARY_GUIDES,
  WINTER_SAFETY_GUIDES,
  FIRST_30_DAYS_CHECKLIST_V3,
} from "./lifeInFinlandExpansion3";

const _NEWCOMER_CATEGORIES_BASE: NewcomerCategory[] = [
  {
    id: "admin",
    pillar: "admin",
    icon: "FileText",
    emoji: "🛂",
    title: "Thủ tục hành chính",
    titleEn: "Administrative Basics",
    description: "Đăng ký cư trú, mở tài khoản ngân hàng và các giấy tờ cốt lõi.",
    descriptionEn: "Registration, banking, and core paperwork for residency.",
    guides: [
      {
        id: "dvv-registration",
        icon: "BadgeCheck",
        emoji: "🪪",
        title: "Đăng ký thông tin cá nhân tại DVV",
        titleEn: "Register at DVV (Digital and Population Data Services)",
        sources: [{ label: "dvv.fi", url: "https://dvv.fi/en/foreigner-registration" }, { label: "dvv.fi", url: "https://dvv.fi/en/moving" }],
        summary: "Đăng ký thông tin cá nhân tại DVV; mã định danh, địa chỉ và đô thị thường trú là các thông tin khác nhau.",
        summaryEn: "Register personal details with DVV; a personal identity code, address and municipality of residence are distinct records.",
        steps: [
          { vi: "Kiểm tra xem Migri hoặc cơ quan thuế đã cấp henkilötunnus cho bạn chưa; có mã không đồng nghĩa đã có kotikunta.", en: "Check whether Migri or the Tax Administration has already issued your personal identity code; a code does not itself establish a municipality of residence." },
          { vi: "Xem hướng dẫn DVV dành cho người nước ngoài, điền biểu mẫu phù hợp và đặt lịch xác minh danh tính nếu được yêu cầu.", en: "Read DVV foreigner-registration instructions, complete the appropriate form and book identity verification if required." },
          { vi: "Mang giấy tờ gốc theo hướng dẫn: hộ chiếu, giấy phép hoặc quyền cư trú và giấy tờ gia đình; có thể cần hợp pháp hóa và bản dịch. Thời gian xử lý thay đổi.", en: "Bring original documents as instructed: passport, residence permit or right of residence, and family documents; legalisation and translations may be needed. Processing times vary." },
          { vi: "Nộp ilmoitus muutosta khi chuyển nhà: có thể nộp sớm nhất một tháng trước và phải nộp chậm nhất một tuần sau khi chuyển. Địa chỉ mới không tự động thay đổi quyền cư trú.", en: "Submit a notification of move no earlier than one month before and no later than one week after moving. A new address does not automatically change residence rights." },
        ],
        keyTerms: [
          { fi: "Henkilötunnus", vi: "Mã định danh cá nhân", en: "Personal identity code" },
          { fi: "Oleskelulupa", vi: "Giấy phép cư trú", en: "Residence permit" },
          { fi: "Kotikunta", vi: "Đô thị thường trú", en: "Municipality of residence" },
          { fi: "Maistraatti", vi: "Tên cũ của DVV", en: "Former name for DVV" },
        ],
        phrases: [
          {
            fi: "Haluaisin rekisteröityä Suomeen.",
            vi: "Tôi muốn đăng ký cư trú tại Phần Lan.",
            en: "I would like to register in Finland.",
          },
          {
            fi: "Tarvitsen henkilötunnuksen.",
            vi: "Tôi cần mã định danh cá nhân.",
            en: "I need a personal identity code.",
          },
          {
            fi: "Tässä on passini ja oleskelulupani.",
            vi: "Đây là hộ chiếu và giấy phép cư trú của tôi.",
            en: "Here is my passport and residence permit.",
          },
        ],
        proTip: { vi: "Giữ mã định danh an toàn, chỉ cung cấp khi thật sự cần qua kênh tin cậy; không chia sẻ mã ngân hàng hoặc mật khẩu.", en: "Keep your identity code secure and disclose it only when needed through trusted channels; never disclose banking codes or passwords." },
        mapLinks: [
          { label: "DVV Helsinki", url: "https://www.google.com/maps/search/DVV+Helsinki" },
          { label: "DVV Tampere", url: "https://www.google.com/maps/search/DVV+Tampere" },
        ],
      },
      {
        id: "bank-account",
        icon: "Landmark",
        emoji: "🏦",
        title: "Mở tài khoản & định danh điện tử mạnh",
        titleEn: "Open a Finnish Bank Account & Strong Identification",
        sources: [{ label: "www.infofinland.fi", url: "https://www.infofinland.fi/en" }, { label: "www.suomi.fi", url: "https://www.suomi.fi/instructions-and-support/identification" }],
        summary: "Tài khoản ngân hàng và định danh điện tử mạnh là hai dịch vụ riêng; hỏi ngân hàng về điều kiện của từng dịch vụ.",
        summaryEn: "A bank account and strong electronic identification are separate services; ask your bank about the requirements for each.",
        steps: [
          { vi: "So sánh ngân hàng và bảng phí hiện hành; không ngân hàng nào bảo đảm duyệt nhanh hoặc miễn phí cho mọi người mới đến.", en: "Compare banks and current fee schedules; no bank guarantees fast approval or free services for every newcomer." },
          { vi: "Hỏi trước về giấy tờ nhận dạng được chấp nhận, địa chỉ, cư trú và nguồn tiền; mang giấy tờ ngân hàng yêu cầu.", en: "Ask which identity, address, residence and source-of-funds documents are accepted; bring the documents requested by the bank." },
          { vi: "Yêu cầu thông tin về verkkopankkitunnukset dùng cho định danh mạnh. Một số dịch vụ công cũng hỗ trợ chứng thư di động hoặc thẻ định danh; có kênh khác nếu chưa đăng nhập điện tử được.", en: "Ask about online banking credentials usable for strong identification. Some public services also accept a mobile certificate or identity card; alternatives exist if you cannot sign in electronically." },
          { vi: "Kích hoạt ứng dụng và thẻ theo hướng dẫn ngân hàng; nếu dùng MobilePay, kiểm tra điều kiện, hạn mức và phí hiện hành.", en: "Activate the app and card following bank instructions; if using MobilePay, check current eligibility, limits and fees." },
        ],
        keyTerms: [
          { fi: "Pankkitili", vi: "Tài khoản ngân hàng", en: "Bank account" },
          { fi: "Verkkopankkitunnukset", vi: "Mã ngân hàng điện tử (BankID)", en: "Online banking credentials (BankID)" },
          { fi: "Vahva tunnistautuminen", vi: "Định danh điện tử mạnh", en: "Strong electronic identification" },
        ],
        phrases: [
          { fi: "Haluaisin avata pankkitilin.", vi: "Tôi muốn mở tài khoản ngân hàng.", en: "I would like to open a bank account." },
          { fi: "Tarvitsen verkkopankkitunnukset.", vi: "Tôi cần mã ngân hàng điện tử.", en: "I need online banking codes." },
        ],
        proTip: { vi: "S-Etukortti liên quan đến tư cách thành viên hợp tác xã; so sánh phần góp vốn và phí dịch vụ thay vì hiểu là luôn miễn phí.", en: "S-Etukortti is linked to cooperative membership; compare membership contributions and service fees rather than assuming it is always free." },
      },
      {
        id: "kela-card",
        icon: "HeartHandshake",
        emoji: "💳",
        title: "Đăng ký Kela (Bảo hiểm xã hội)",
        titleEn: "Apply for Kela Card (Social Security)",
        sources: [{ label: "www.kela.fi", url: "https://www.kela.fi/moving-to-finland" }, { label: "www.kela.fi", url: "https://www.kela.fi/kela-card" }],
        summary: "Kela đánh giá quyền hưởng từng trợ cấp theo hoàn cảnh. Thẻ Kela chứng minh bảo hiểm y tế, không tự cấp quyền dùng y tế công hay mọi trợ cấp.",
        summaryEn: "Kela assesses each benefit based on your circumstances. A Kela card shows health-insurance coverage; it does not itself grant public healthcare or every benefit.",
        steps: [
          { vi: "Thông báo việc chuyển đến Phần Lan cho Kela qua OmaKela hoặc biểu mẫu hiện hành.", en: "Notify Kela of your move to Finland through OmaKela or the current form." },
          { vi: "Kiểm tra quyền hưởng theo cư trú, việc làm và loại trợ cấp; sinh viên quốc tế không tự động được trợ cấp học tập hoặc nhà ở.", en: "Check eligibility based on residence, employment and the benefit in question; international students do not automatically qualify for study or housing support." },
          { vi: "Nộp đơn cho thẻ Kela hoặc trợ cấp cần thiết và giấy tờ Kela yêu cầu; theo dõi thời gian xử lý hiện hành.", en: "Apply for a Kela card or the benefit you need and provide requested documents; check current processing times." },
          { vi: "Quyền dùng y tế công thường căn cứ kotikunta hoặc quyền điều trị riêng; hỏi Kela và cơ quan y tế khu vực nếu chưa rõ.", en: "Public healthcare entitlement usually depends on a municipality of residence or a separate right to treatment; ask Kela and the local healthcare provider if unsure." },
        ],
        proTip: { vi: "Đọc quyết định cho từng trợ cấp; có thẻ Kela không đồng nghĩa chắc chắn được opintotuki hoặc asumistuki.", en: "Read the decision for each benefit; having a Kela card does not guarantee study or housing support." },
        keyTerms: [
          { fi: "Kela", vi: "Cơ quan an sinh xã hội", en: "Social Insurance Institution" },
          { fi: "Sairausvakuutus", vi: "Bảo hiểm y tế", en: "Health insurance" },
          { fi: "Opintotuki", vi: "Trợ cấp sinh viên", en: "Study allowance" },
        ],
        phrases: [
          { fi: "Haluan hakea Kela-korttia.", vi: "Tôi muốn xin thẻ Kela.", en: "I want to apply for a Kela card." },
          { fi: "Olen muuttanut Suomeen pysyvästi.", vi: "Tôi đã chuyển đến Phần Lan định cư.", en: "I have moved to Finland permanently." },
        ],
      },
    ],
  },
  {
    id: "daily",
    pillar: "daily",
    icon: "ShoppingBag",
    emoji: "🛒",
    title: "Đời sống hàng ngày",
    titleEn: "Daily Life",
    description: "Giao thông, siêu thị, tái chế và những thói quen rất 'Phần Lan'.",
    descriptionEn: "Transport, supermarkets, recycling and other very 'Finnish' habits.",
    guides: [
      {
        id: "public-transport",
        icon: "Bus",
        emoji: "🚌",
        title: "Giao thông công cộng (HSL & VR)",
        titleEn: "Public Transport (HSL & VR)",
        sources: [{ label: "www.hsl.fi", url: "https://www.hsl.fi/en/tickets-and-fares" }, { label: "www.vr.fi", url: "https://www.vr.fi/en" }],
        summary: "Dùng nhà vận hành giao thông địa phương và VR cho tàu liên tỉnh; giá phụ thuộc vùng, loại vé và hành trình.",
        summaryEn: "Use your local transport operator and VR for long-distance trains; fares depend on zones, ticket type and route.",
        steps: [
          { vi: "Tìm hành trình trên HSL, Nysse hoặc Föli tùy nơi ở; kiểm tra vùng vé và thời hạn hiệu lực.", en: "Plan your route with HSL, Nysse or Föli depending on where you live; check zones and validity." },
          { vi: "So sánh vé đơn, ngày và mùa theo số lần đi thực tế; không giả định mức tiết kiệm cố định.", en: "Compare single, day and season tickets against your actual travel; do not assume a fixed saving." },
          { vi: "Với VR, kiểm tra lịch chạy, điều kiện đổi/hủy và quyền giảm giá trên vr.fi; giá rẻ không được bảo đảm theo thời điểm đặt.", en: "For VR, check timetables, change/cancellation terms and discounts on vr.fi; cheap fares are not guaranteed by booking a set time ahead." },
        ],
        keyTerms: [
          { fi: "Kausilippu", vi: "Vé tháng", en: "Monthly travel pass" },
          { fi: "Kertalippu", vi: "Vé một lượt", en: "Single ticket" },
          { fi: "Juna", vi: "Tàu hỏa", en: "Train" },
          { fi: "Bussi", vi: "Xe buýt", en: "Bus" },
        ],
        phrases: [
          { fi: "Yksi aikuisten lippu Tampereelle, kiitos.", vi: "Cho tôi một vé người lớn đi Tampere.", en: "One adult ticket to Tampere, please." },
          { fi: "Mistä saan kausilipun?", vi: "Tôi mua vé tháng ở đâu?", en: "Where can I get a monthly pass?" },
        ],
        proTip: { vi: "HSL có các nhóm giảm giá riêng với điều kiện cụ thể. Kiểm tra quyền lợi hiện hành của trẻ em, sinh viên và người cao tuổi trước khi mua.", en: "HSL has separate discount groups with specific requirements. Check current child, student and senior eligibility before buying." },
      },
      {
        id: "recycling",
        icon: "Recycle",
        emoji: "♻️",
        title: "Quy tắc tái chế (Kierrätys)",
        titleEn: "Recycling Rules",
        sources: [{ label: "rinkiin.fi", url: "https://rinkiin.fi/en/for-households/" }, { label: "www.palpa.fi", url: "https://www.palpa.fi/beverage-container-recycling/deposit-refund-system/" }, { label: "www.kierratys.info", url: "https://www.kierratys.info/" }],
        summary: "Phân loại theo hướng dẫn địa phương; Rinki thu gom bao bì, không phải mọi loại rác.",
        summaryEn: "Follow local sorting instructions; Rinki collects packaging, not every type of waste.",
        steps: [
          { vi: "Tách rác hữu cơ, giấy, bao bì carton, bao bì nhựa, bao bì thủy tinh, kim loại và rác hỗn hợp theo nơi ở.", en: "Separate bio-waste, paper, cardboard packaging, plastic packaging, glass packaging, metal and mixed waste according to local rules." },
          { vi: "Hoàn chai/lon có ký hiệu đặt cọc tại điểm nhận phù hợp; số tiền phụ thuộc loại bao bì và hệ thống Pantti.", en: "Return eligible deposit-marked bottles/cans at a suitable return point; the refund depends on packaging and the deposit system." },
          { vi: "Pin và đồ điện tử đi đến điểm chuyên dụng hoặc cửa hàng nhận lại; không bỏ vào thùng bao bì Rinki. Quần áo còn dùng tốt có thể quyên góp, đồ hỏng theo hướng dẫn dệt may địa phương.", en: "Take batteries and electronics to dedicated collection or retailer take-back points, not Rinki packaging bins. Donate usable clothing; follow local textile instructions for damaged items." },
        ],
        proTip: { vi: "Kiểm tra bản đồ kierratys.info và hướng dẫn của đơn vị quản lý rác tại địa phương.", en: "Check kierratys.info and the sorting instructions of your local waste authority." },
        keyTerms: [
          { fi: "Kierrätys", vi: "Tái chế", en: "Recycling" },
          { fi: "Pullonpalautus", vi: "Hoàn vỏ chai lấy tiền", en: "Bottle deposit return" },
          { fi: "Biojäte", vi: "Rác hữu cơ", en: "Bio-waste" },
          { fi: "Sekajäte", vi: "Rác hỗn hợp", en: "Mixed waste" },
        ],
        phrases: [
          { fi: "Missä on lähin pullonpalautus?", vi: "Máy đổi vỏ chai gần nhất ở đâu?", en: "Where is the nearest bottle return?" },
          { fi: "Mihin laitan biojätteen?", vi: "Tôi bỏ rác hữu cơ vào đâu?", en: "Where do I put bio-waste?" },
        ],
      },
      {
        id: "supermarkets",
        icon: "ShoppingCart",
        emoji: "🛍️",
        title: "Mẹo đi siêu thị (S-Ryhmä, K, Lidl)",
        titleEn: "Supermarket Tips (S-Ryhmä vs K-Ryhmä vs Lidl)",
        sources: [{ label: "www.infofinland.fi", url: "https://www.infofinland.fi/en/settling-in-finland/everyday-life-in-finland" }],
        summary: "S-Ryhmä, K-Ryhmä và Lidl là các chuỗi phổ biến; giá và khuyến mãi thay đổi theo cửa hàng và sản phẩm.",
        summaryEn: "S-Ryhmä, K-Ryhmä and Lidl are common chains; prices and offers vary by store and product.",
        steps: [
          { vi: "So sánh đơn giá theo kg/lít, giá thường và điều kiện ưu đãi thành viên.", en: "Compare unit prices per kilogram/litre, regular prices and membership conditions." },
          { vi: "Thẻ khách hàng không có cùng điều kiện: kiểm tra phí, phần góp vốn và cách tích điểm/Bonus trước khi đăng ký.", en: "Loyalty cards have different terms: check fees, membership contributions and points/Bonus rules before joining." },
          { vi: "Giảm giá hàng cận hạn và giờ mở cửa do từng cửa hàng quyết định; xem thông tin chính thức của cửa hàng.", en: "Near-expiry markdowns and opening hours are set by each store; check its official information." },
        ],
        proTip: { vi: "Mang túi dùng lại và giữ hóa đơn; ưu đãi không phải lúc nào cũng là lựa chọn rẻ nhất.", en: "Bring reusable bags and keep receipts; an advertised offer is not always the cheapest option." },
        keyTerms: [
          { fi: "Tarjous", vi: "Khuyến mãi", en: "Offer / discount" },
          { fi: "Bonus", vi: "Tiền hoàn lại", en: "Cashback bonus" },
          { fi: "Aukioloajat", vi: "Giờ mở cửa", en: "Opening hours" },
        ],
        phrases: [
          { fi: "Onko teillä S-Etukorttia?", vi: "Bạn có thẻ S-Etukortti không? (Câu hỏi của thu ngân)", en: "Do you have an S-Etukortti? (Cashier question)" },
          { fi: "Maksan kortilla.", vi: "Tôi thanh toán bằng thẻ.", en: "I pay by card." },
        ],
      },
    ],
  },
  {
    id: "work",
    pillar: "work",
    icon: "Briefcase",
    emoji: "💼",
    title: "Việc làm & Thuế",
    titleEn: "Employment & Tax",
    description: "Verokortti, văn hóa làm việc, và quyền lợi nhân viên cơ bản.",
    descriptionEn: "Tax cards, work culture, and basic employee rights.",
    guides: [
      {
        id: "tax-card",
        icon: "Receipt",
        emoji: "🧾",
        title: "Lấy thẻ thuế (Verokortti)",
        titleEn: "Get a Tax Card (Verokortti)",
        sources: [{ label: "www.vero.fi", url: "https://www.vero.fi/en/individuals/tax-cards-and-tax-returns/tax_card/" }],
        summary: "Thuế phụ thuộc thu nhập và hoàn cảnh cá nhân. Với lương, nếu chủ sử dụng không có thông tin thẻ thuế, thường khấu trừ 60%.",
        summaryEn: "Tax depends on income and personal circumstances. For wages, an employer without tax-card information generally withholds 60%.",
        steps: [
          { vi: "Xem thẻ thuế trong MyTax hoặc liên hệ Vero nếu chưa có định danh điện tử mạnh.", en: "Check your tax card in MyTax or contact Vero if you do not have strong electronic identification." },
          { vi: "Ước tính thu nhập cho cả năm dương lịch và các khoản khấu trừ; học bổng và thu nhập kinh doanh có quy tắc riêng.", en: "Estimate income for the full calendar year and deductions; grants and business income have separate rules." },
          { vi: "Hỏi chủ sử dụng có nhận thông tin trực tiếp từ Vero không; gửi thẻ thuế nếu được yêu cầu.", en: "Ask whether your employer receives tax-card details directly from Vero; provide the card if requested." },
          { vi: "Theo dõi giới hạn thu nhập và xin thẻ thuế điều chỉnh khi dự báo thay đổi.", en: "Monitor the income ceiling and request a revised tax card if your estimate changes." },
        ],
        keyTerms: [
          { fi: "Verokortti", vi: "Thẻ thuế", en: "Tax card" },
          { fi: "Veroprosentti", vi: "Tỉ lệ thuế", en: "Tax rate %" },
          { fi: "Palkka", vi: "Lương", en: "Salary" },
          { fi: "Verotoimisto", vi: "Văn phòng thuế", en: "Tax office" },
        ],
        phrases: [
          { fi: "Tarvitsen uuden verokortin.", vi: "Tôi cần thẻ thuế mới.", en: "I need a new tax card." },
          { fi: "Mikä on minun veroprosenttini?", vi: "Tỉ lệ thuế của tôi là bao nhiêu?", en: "What is my tax rate?" },
        ],
        proTip: { vi: "Không có mức thuế sinh viên cố định theo một ngưỡng thu nhập; dùng công cụ Vero và phân biệt thuế với các khoản đóng góp bảo hiểm.", en: "There is no fixed student tax rate tied to one income threshold; use Vero tools and distinguish tax from insurance contributions." },
      },
      {
        id: "work-culture",
        icon: "Users",
        emoji: "🤝",
        title: "Văn hóa làm việc & quyền lợi",
        titleEn: "Work Culture & Employee Rights",
        sources: [{ label: "tyosuojelu.fi", url: "https://tyosuojelu.fi/en/employment-relationship" }, { label: "tyosuojelu.fi", url: "https://tyosuojelu.fi/en/employment-relationship/annual-holidays" }],
        summary: "Quyền lao động căn cứ luật, hợp đồng và thỏa ước áp dụng; phép năm không luôn là năm tuần ngay từ khi mới làm.",
        summaryEn: "Employment rights depend on law, your contract and the applicable collective agreement; five weeks of leave is not automatic when starting work.",
        steps: [
          { vi: "Thống nhất giờ làm và báo sớm nếu đến muộn; giao tiếp rõ ràng với quản lý.", en: "Agree working times and inform your manager promptly if delayed; communicate clearly." },
          { vi: "Yêu cầu hợp đồng hoặc thông tin điều kiện lao động bằng văn bản; kiểm tra thỏa ước TES áp dụng và mức lương.", en: "Request a contract or written employment terms; check the applicable collective agreement and pay." },
          { vi: "Nghỉ hằng ngày và hằng tuần thường có mức tối thiểu theo luật, nhưng có ngoại lệ; hỏi đơn vị bảo vệ lao động khi lịch ca không rõ.", en: "Daily and weekly rest normally have statutory minimums, but exceptions exist; ask occupational safety authorities if your shift pattern is unclear." },
          { vi: "Tìm hiểu công đoàn và quỹ thất nghiệp: đây là hai tổ chức/dịch vụ khác nhau, quyền trợ cấp phụ thuộc điều kiện.", en: "Learn about unions and unemployment funds: they are distinct organisations/services, and benefit eligibility has conditions." },
        ],
        proTip: { vi: "Lưu hợp đồng, bảng lương và giờ làm. Liên hệ cơ quan bảo vệ lao động nếu bị trả lương sai hoặc điều kiện không an toàn.", en: "Keep contracts, payslips and working-hour records. Contact occupational safety authorities for incorrect pay or unsafe conditions." },
        keyTerms: [
          { fi: "Työsopimus", vi: "Hợp đồng lao động", en: "Employment contract" },
          { fi: "Loma", vi: "Phép năm", en: "Paid vacation" },
          { fi: "Ammattiliitto", vi: "Công đoàn", en: "Trade union" },
          { fi: "Ylityö", vi: "Làm thêm giờ", en: "Overtime" },
        ],
        phrases: [
          { fi: "Milloin on lounastauko?", vi: "Giờ nghỉ trưa khi nào?", en: "When is the lunch break?" },
          { fi: "Voinko ottaa loman heinäkuussa?", vi: "Tôi có thể nghỉ phép tháng 7 không?", en: "Can I take vacation in July?" },
        ],
      },
    ],
  },
  {
    id: "health",
    pillar: "health",
    icon: "HeartPulse",
    emoji: "🏥",
    title: "Y tế & An toàn",
    titleEn: "Healthcare & Safety",
    description: "Trạm y tế công, tổng đài cấp cứu 112, và thuốc kê đơn.",
    descriptionEn: "Public health centers, emergency 112, and prescriptions.",
    guides: [
      {
        id: "health-center",
        icon: "Stethoscope",
        emoji: "🩺",
        title: "Trạm y tế (Terveysasema)",
        titleEn: "Local Health Center (Terveysasema)",
        sources: [{ label: "www.infofinland.fi", url: "https://www.infofinland.fi/en/health" }, { label: "www.kanta.fi", url: "https://www.kanta.fi/en/mykanta" }, { label: "116117.fi", url: "https://116117.fi/en" }],
        summary: "Dịch vụ y tế công do khu vực phúc lợi tổ chức; Helsinki và Åland có cơ cấu riêng. Hỏi nhà cung cấp về quyền điều trị và phí.",
        summaryEn: "Public healthcare is organised by wellbeing services counties; Helsinki and Åland have separate arrangements. Ask the provider about entitlement and charges.",
        steps: [
          { vi: "Tìm trạm y tế và cách đặt lịch trên trang khu vực phúc lợi hoặc Helsinki; giờ điện thoại khác nhau theo nơi.", en: "Find your health centre and booking instructions on your wellbeing services county or Helsinki website; phone hours vary." },
          { vi: "MyKanta cho xem hồ sơ và đơn thuốc, không phải cổng đặt lịch khám thông thường; dùng kênh đặt lịch của nhà cung cấp.", en: "MyKanta shows records and prescriptions, not general appointment booking; use your provider’s booking channel." },
          { vi: "Với vấn đề y tế gấp nhưng không đe dọa tính mạng, gọi 116 117 trước khi đi cấp cứu tại các vùng có dịch vụ; Åland có hướng dẫn riêng. Nguy hiểm tính mạng: 112.", en: "For urgent but non-life-threatening problems, call 116 117 before attending urgent care where the service operates; Åland has separate instructions. Life-threatening emergency: 112." },
          { vi: "Mang giấy tờ định danh và thông tin thuốc, quyền điều trị/bảo hiểm khi cần. Không trì hoãn cấp cứu vì chưa có thẻ Kela.", en: "Bring identification and medication details, and entitlement/insurance documents when needed. Do not delay emergency care because you lack a Kela card." },
        ],
        proTip: { vi: "Phí và thời gian hẹn tùy dịch vụ, tuổi và khu vực; thẻ Kela không bảo đảm mọi khám chữa bệnh miễn phí.", en: "Fees and waiting times depend on service, age and region; a Kela card does not guarantee free treatment." },
        keyTerms: [
          { fi: "Terveysasema", vi: "Trạm y tế công", en: "Public health center" },
          { fi: "Lääkäri", vi: "Bác sĩ", en: "Doctor" },
          { fi: "Resepti", vi: "Đơn thuốc", en: "Prescription" },
          { fi: "Apteekki", vi: "Hiệu thuốc", en: "Pharmacy" },
        ],
        phrases: [
          { fi: "Haluaisin varata ajan lääkärille.", vi: "Tôi muốn đặt lịch khám bác sĩ.", en: "I would like to book a doctor's appointment." },
          { fi: "Minulla on kuumetta ja yskää.", vi: "Tôi bị sốt và ho.", en: "I have a fever and cough." },
        ],
      },
      {
        id: "emergency-112",
        icon: "PhoneCall",
        emoji: "🚨",
        title: "Số khẩn cấp 112",
        titleEn: "Emergency Number 112",
        sources: [{ label: "112.fi", url: "https://112.fi/en/erc-number" }, { label: "112.fi", url: "https://112.fi/en/112-suomi-application" }],
        summary: "Gọi 112 khi tính mạng, sức khỏe, tài sản hoặc môi trường đang bị đe dọa khẩn cấp.",
        summaryEn: "Call 112 when life, health, property or the environment is in immediate danger.",
        steps: [
          { vi: "Gọi 112 miễn phí; cho biết sự việc và vị trí, trả lời câu hỏi và làm theo hướng dẫn.", en: "Call 112 free of charge; describe the incident and location, answer questions and follow instructions." },
          { vi: "Không cúp máy trước khi được cho phép. Nếu cần, nói bạn cần hỗ trợ ngôn ngữ.", en: "Do not hang up until instructed. Say if you need language assistance." },
          { vi: "Trong ứng dụng 112 Suomi, bật quyền vị trí và thực hiện cuộc gọi qua ứng dụng để hỗ trợ truyền vị trí; vẫn nói địa chỉ/địa điểm cho tổng đài.", en: "In 112 Suomi, enable location permissions and call through the app to help transmit your location; still tell the operator your address/location." },
        ],
        keyTerms: [
          { fi: "Hätänumero", vi: "Số khẩn cấp", en: "Emergency number" },
          { fi: "Ambulanssi", vi: "Xe cứu thương", en: "Ambulance" },
          { fi: "Poliisi", vi: "Cảnh sát", en: "Police" },
          { fi: "Palokunta", vi: "Cứu hỏa", en: "Fire brigade" },
        ],
        phrases: [
          { fi: "Tarvitsen apua! Soittakaa ambulanssi!", vi: "Tôi cần giúp đỡ! Gọi xe cứu thương!", en: "I need help! Call an ambulance!" },
          { fi: "Osoitteeni on...", vi: "Địa chỉ của tôi là...", en: "My address is..." },
        ],
        proTip: { vi: "Không dùng 112 cho tư vấn thông thường; vấn đề y tế gấp không đe dọa tính mạng có thể gọi 116 117 theo vùng.", en: "Do not use 112 for routine advice; urgent non-life-threatening medical problems may use 116 117 according to the region." },
      },
    ],
  },
];

// ============================================================
// Merge expansion guides (2026) into base categories
// ============================================================
export const NEWCOMER_CATEGORIES: NewcomerCategory[] = _NEWCOMER_CATEGORIES_BASE.map((cat) => {
  if (cat.id === "admin") return { ...cat, guides: [...cat.guides, ...HOUSING_GUIDES, ...BANKING_GUIDES] };
  if (cat.id === "daily") return { ...cat, guides: [...cat.guides, ...SHOPPING_GUIDES, ...SEASONAL_GUIDES, ...TRANSPORT_GUIDES, ...LIBRARY_GUIDES] };
  if (cat.id === "work") return { ...cat, guides: [...cat.guides, ...STUDENT_TIPS_GUIDES, ...CULTURE_GUIDES, ...INTEGRATION_GUIDES] };
  if (cat.id === "health") return { ...cat, guides: [...cat.guides, ...FAMILY_HEALTH_GUIDES, ...ADVANCED_HEALTH_GUIDES, ...WINTER_SAFETY_GUIDES] };
  return cat;
});
export const LIFE_IN_FINLAND_REVIEW_DATE = "2026-10-08";

export interface ChecklistItem {
  key: string;
  vi: string;
  en: string;
  category: "admin" | "daily" | "work" | "health";
  week: 1 | 2 | 3 | 4;
}

export const FIRST_30_DAYS_CHECKLIST: ChecklistItem[] = [
  { key: "passport-copy", vi: "Lưu bản sao hộ chiếu và giấy phép cư trú an toàn khi cần", en: "Keep secure copies of passport and residence permit when needed", category: "admin", week: 1 },
  { key: "dvv-appointment", vi: "Đặt lịch hẹn DVV", en: "Book DVV appointment", category: "admin", week: 1 },
  { key: "sim-card", vi: "Mua SIM Phần Lan (DNA, Telia, Elisa)", en: "Buy a Finnish SIM (DNA, Telia, Elisa)", category: "daily", week: 1 },
  { key: "rental-contract", vi: "Ký hợp đồng thuê nhà & lưu PDF", en: "Sign rental contract & save PDF", category: "admin", week: 1 },
  { key: "henkilotunnus", vi: "Kiểm tra mã định danh đã có; đăng ký DVV và theo dõi hồ sơ nếu cần", en: "Check existing identity code; apply to DVV and follow up if needed", category: "admin", week: 2 },
  { key: "bank-account", vi: "Hỏi điều kiện tài khoản và định danh điện tử mạnh tại ngân hàng", en: "Check bank-account and strong-identification requirements", category: "admin", week: 2 },
  { key: "hsl-card", vi: "Đăng ký vé tháng giao thông công cộng", en: "Buy public transport monthly pass", category: "daily", week: 2 },
  { key: "loyalty-cards", vi: "Đăng ký thẻ S-Etukortti hoặc K-Plussa", en: "Sign up for S-Etukortti or K-Plussa", category: "daily", week: 2 },
  { key: "kela-application", vi: "Thông báo chuyển đến và kiểm tra quyền hưởng Kela, dùng biểu mẫu hiện hành", en: "Notify Kela of your move and check eligibility using current forms", category: "admin", week: 3 },
  { key: "tax-card", vi: "Tải Verokortti từ vero.fi", en: "Download Verokortti from vero.fi", category: "work", week: 3 },
  { key: "omakanta", vi: "Đăng nhập omakanta.fi và xác thực", en: "Log in to omakanta.fi and verify", category: "health", week: 3 },
  { key: "terveysasema", vi: "Tìm Terveysasema gần nhà", en: "Locate the nearest Terveysasema", category: "health", week: 3 },
  { key: "112-app", vi: "Cài app 112 Suomi", en: "Install the 112 Suomi app", category: "health", week: 3 },
  { key: "library-card", vi: "Đăng ký thẻ thư viện (miễn phí)", en: "Get a library card (free)", category: "daily", week: 4 },
  { key: "union", vi: "Tham gia công đoàn ngành (nếu đi làm)", en: "Join a trade union (if employed)", category: "work", week: 4 },
  { key: "kela-card", vi: "Theo dõi đơn thẻ Kela nếu đủ điều kiện (thời gian tùy hồ sơ)", en: "Follow up a Kela-card application if eligible (processing varies)", category: "admin", week: 4 },
  { key: "recycling-points", vi: "Tìm điểm tái chế (Rinki-piste) gần nhất", en: "Find the nearest Rinki recycling point", category: "daily", week: 4 },
  { key: "language-course", vi: "Hỏi dịch vụ địa phương hoặc trường về khóa Finnish phù hợp và điều kiện", en: "Ask local services or your institution about suitable Finnish courses and eligibility", category: "work", week: 4 },
  ...FIRST_30_DAYS_CHECKLIST_EXPANSION,
  ...FIRST_30_DAYS_CHECKLIST_V2,
  ...FIRST_30_DAYS_CHECKLIST_V3,
];

// Latest Migri / community resources (2026)
export const COMMUNITY_RESOURCES = [
  { title: "Migri - Latest Updates 2026", url: "https://migri.fi/en/news", emoji: "📰" },
  { title: "InfoFinland (Official multilingual portal)", url: "https://www.infofinland.fi/en", emoji: "🌐" },
  { title: "Người Việt tại Phần Lan (Facebook)", url: "https://www.facebook.com/groups/nguoivietphanlan", emoji: "👥" },
  { title: "Vietnam Association in Finland", url: "https://www.facebook.com/vietnamfinland", emoji: "🤝" },
  { title: "Helsinki International House", url: "https://ihhelsinki.fi/", emoji: "🏛️" },
  { title: "Tori.fi - Buy used in Finland", url: "https://www.tori.fi", emoji: "♻️" },
  { title: "HOAS - Helsinki student housing", url: "https://www.hoas.fi/en/", emoji: "🏠" },
  { title: "Kela - Benefits 2026", url: "https://www.kela.fi", emoji: "💳" },
  { title: "Vero - Tax info 2026", url: "https://www.vero.fi/en/", emoji: "🧾" },
];

export const NEWCOMER_BADGE = {
  badgeId: "integrated-resident",
  badgeName: "Integrated Resident",
  badgeIcon: "🇫🇮",
};
