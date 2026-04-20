/**
 * @file lifeInFinlandData.ts
 * @description Newcomer guide content for living in Finland — admin, daily life,
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
        title: "Đăng ký tại DVV (Maistraatti)",
        titleEn: "Register at DVV (Digital and Population Data Services)",
        summary:
          "DVV cấp Henkilötunnus (mã định danh cá nhân) — chìa khóa để mở mọi cánh cửa hành chính ở Phần Lan.",
        summaryEn:
          "DVV issues your Henkilötunnus (personal identity code) — the key that unlocks every administrative door in Finland.",
        steps: [
          {
            vi: "Đặt lịch hẹn online tại dvv.fi (chọn 'Foreigner registration').",
            en: "Book an appointment online at dvv.fi (choose 'Foreigner registration').",
          },
          {
            vi: "Chuẩn bị: hộ chiếu, giấy phép cư trú (Oleskelulupa), hợp đồng thuê nhà, giấy đăng ký kết hôn (nếu có).",
            en: "Prepare: passport, residence permit (Oleskelulupa), rental contract, marriage certificate (if applicable).",
          },
          {
            vi: "Đến đúng giờ; nhân viên sẽ nhập dữ liệu và cấp Henkilötunnus trong 1-2 tuần qua thư.",
            en: "Arrive on time; staff will register your data and mail your Henkilötunnus within 1-2 weeks.",
          },
          {
            vi: "Cập nhật địa chỉ (Kotikunta) ngay khi chuyển nhà — bắt buộc trong 1 tuần.",
            en: "Update your address (Kotikunta) as soon as you move — required within one week.",
          },
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
        proTip: {
          vi: "Lưu Henkilötunnus vào ví điện tử và KHÔNG chia sẻ qua email/SMS. Đây là dữ liệu nhạy cảm cấp 1.",
          en: "Save your Henkilötunnus in a secure wallet and NEVER share it via email/SMS. It is top-tier sensitive data.",
        },
        mapLinks: [
          { label: "DVV Helsinki", url: "https://www.google.com/maps/search/DVV+Helsinki" },
          { label: "DVV Tampere", url: "https://www.google.com/maps/search/DVV+Tampere" },
        ],
      },
      {
        id: "bank-account",
        icon: "Landmark",
        emoji: "🏦",
        title: "Mở tài khoản ngân hàng & BankID",
        titleEn: "Open a Finnish Bank Account & Strong Identification (BankID)",
        summary:
          "Vahva tunnistautuminen (BankID) là 'CMND số' — bắt buộc để dùng Kela, Vero, OmaPosti, Migri online.",
        summaryEn:
          "Strong Identification (BankID) is your 'digital ID' — required for Kela, Vero, OmaPosti, Migri online services.",
        steps: [
          { vi: "Chọn ngân hàng: OP, Nordea, S-Pankki, Danske Bank, hoặc Aktia.", en: "Pick a bank: OP, Nordea, S-Pankki, Danske Bank, or Aktia." },
          { vi: "Đặt lịch hẹn (varaa aika); mang hộ chiếu, Henkilötunnus, hợp đồng lao động hoặc giấy nhập học.", en: "Book an appointment (varaa aika); bring passport, Henkilötunnus, employment contract or admission letter." },
          { vi: "Yêu cầu Verkkopankkitunnukset (mã ngân hàng online) để có BankID.", en: "Request Verkkopankkitunnukset (online banking codes) to obtain BankID." },
          { vi: "Kích hoạt MobilePay hoặc Pivo để chuyển tiền nhanh trong nước.", en: "Activate MobilePay or Pivo for instant domestic transfers." },
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
        proTip: {
          vi: "Sinh viên nên chọn S-Pankki (miễn phí) hoặc OP (giao diện tiếng Anh tốt nhất).",
          en: "Students should choose S-Pankki (free) or OP (best English UI).",
        },
      },
      {
        id: "kela-card",
        icon: "HeartHandshake",
        emoji: "💳",
        title: "Đăng ký Kela (Bảo hiểm xã hội)",
        titleEn: "Apply for Kela Card (Social Security)",
        summary:
          "Kela cấp thẻ KELA-kortti — giảm giá thuốc, hỗ trợ y tế công, trợ cấp sinh viên (opintotuki) và trợ cấp nhà ở (asumistuki).",
        summaryEn:
          "Kela issues your KELA-kortti — discounts on medication, public healthcare access, study allowance (opintotuki), and housing benefit (asumistuki).",
        steps: [
          { vi: "Sau khi có Henkilötunnus, vào kela.fi → 'Apply for benefits' hoặc đến văn phòng Kela gần nhất.", en: "After you have a Henkilötunnus, go to kela.fi → 'Apply for benefits' or visit the nearest Kela office." },
          { vi: "Điền Form Y77 (cư dân chuyển đến Phần Lan); kèm hợp đồng lao động/học tập.", en: "Fill in Form Y77 (resident moving to Finland); attach employment/study contract." },
          { vi: "Đợi 3-8 tuần để Kela quyết định xem bạn có thuộc diện bảo hiểm xã hội không.", en: "Wait 3-8 weeks for Kela to decide if you qualify for social insurance coverage." },
          { vi: "Khi được duyệt, thẻ KELA sẽ gửi qua bưu điện trong 2 tuần.", en: "Once approved, your KELA card arrives by mail within 2 weeks." },
        ],
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
        summary:
          "HSL phục vụ thủ đô Helsinki; VR là tàu hỏa liên tỉnh. Mua vé qua app — rẻ và tiện hơn vé giấy.",
        summaryEn:
          "HSL serves the Helsinki capital region; VR runs intercity trains. Buying tickets via app is cheaper and faster than paper.",
        steps: [
          { vi: "Tải app HSL (Helsinki) hoặc Nysse (Tampere), Föli (Turku) tùy thành phố.", en: "Install HSL (Helsinki) or Nysse (Tampere), Föli (Turku) depending on your city." },
          { vi: "Mua vé tháng (kausilippu) nếu đi học/đi làm hàng ngày — tiết kiệm 50%.", en: "Buy a monthly pass (kausilippu) for daily commute — saves up to 50%." },
          { vi: "Tàu liên tỉnh: đặt vé sớm tại vr.fi; ghế phổ thông từ 9€ nếu mua trước 1 tháng.", en: "Intercity trains: book early at vr.fi; economy seats from €9 if purchased one month ahead." },
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
        proTip: {
          vi: "Trẻ em dưới 7 tuổi đi MIỄN PHÍ trên HSL. Người 65+ có vé senior giảm 50%.",
          en: "Children under 7 ride HSL FREE. Seniors 65+ get 50% off.",
        },
      },
      {
        id: "recycling",
        icon: "Recycle",
        emoji: "♻️",
        title: "Quy tắc tái chế (Kierrätys)",
        titleEn: "Recycling Rules",
        summary:
          "Phần Lan tái chế ~50% rác hộ gia đình. Mỗi loại rác có thùng riêng — phân loại sai có thể bị phạt.",
        summaryEn:
          "Finland recycles ~50% of household waste. Each type has its own bin — improper sorting can incur fines.",
        steps: [
          { vi: "Tách: Bio (rác thực phẩm), Paper, Cardboard, Glass, Metal, Plastic.", en: "Separate: Bio (food), Paper, Cardboard, Glass, Metal, Plastic." },
          { vi: "Trả chai/lon nhựa & kim loại tại Pullonpalautus (máy đổi tiền) ở mọi siêu thị — 0.10–0.40€/chai.", en: "Return bottles/cans at Pullonpalautus (reverse vending machines) in any supermarket — €0.10–0.40 each." },
          { vi: "Quần áo cũ bỏ vào thùng UFF hoặc Fida; pin/đồ điện tử mang đến Rinki-piste.", en: "Drop old clothes at UFF or Fida bins; batteries/electronics go to Rinki-piste collection points." },
        ],
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
        summary:
          "S-Ryhmä (Prisma, S-market) tặng tiền hoàn (bonus); K-Ryhmä (K-Citymarket) chất lượng cao; Lidl rẻ nhất.",
        summaryEn:
          "S-Ryhmä (Prisma, S-market) gives cashback bonus; K-Ryhmä (K-Citymarket) is premium; Lidl is the cheapest.",
        steps: [
          { vi: "Đăng ký thẻ S-Etukortti hoặc K-Plussa MIỄN PHÍ ngay tại quầy — hoàn 1-5% mỗi tháng.", en: "Sign up for the S-Etukortti or K-Plussa loyalty card FREE at the counter — 1-5% cashback monthly." },
          { vi: "Mã giảm giá -30% / -50% trên thực phẩm gần hết hạn vào sau 20:00 hàng ngày.", en: "Look for -30% / -50% stickers on food nearing expiry after 20:00 daily." },
          { vi: "Chủ nhật nhiều cửa hàng đóng cửa sớm hoặc nghỉ — kiểm tra giờ trên Google.", en: "Many shops close early or shut on Sundays — check hours on Google first." },
        ],
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
        summary:
          "Mọi người đi làm ở Phần Lan đều cần Verokortti. Không có nó, công ty sẽ trừ 60% thuế mặc định.",
        summaryEn:
          "Everyone working in Finland needs a Verokortti. Without it, employers withhold 60% tax by default.",
        steps: [
          { vi: "Vào vero.fi → đăng nhập bằng BankID → 'Tax card and prepayments'.", en: "Go to vero.fi → log in with BankID → 'Tax card and prepayments'." },
          { vi: "Khai thu nhập dự kiến trong năm (lương + học bổng + freelance).", en: "Declare your expected annual income (salary + scholarship + freelance)." },
          { vi: "Tải PDF Verokortti và gửi cho HR/payroll, hoặc cho phép Vero tự gửi.", en: "Download the Verokortti PDF and send it to HR/payroll, or allow Vero to send it automatically." },
          { vi: "Cập nhật ngay nếu thu nhập thay đổi để tránh bị nợ thuế cuối năm.", en: "Update immediately if income changes to avoid back-taxes at year end." },
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
        proTip: {
          vi: "Sinh viên làm thêm dưới 19,000€/năm chỉ chịu thuế ~10%. Đừng quên khai học bổng.",
          en: "Students earning under €19,000/year pay only ~10% tax. Don't forget to declare scholarships.",
        },
      },
      {
        id: "work-culture",
        icon: "Users",
        emoji: "🤝",
        title: "Văn hóa làm việc & quyền lợi",
        titleEn: "Work Culture & Employee Rights",
        summary:
          "Phần Lan ưu tiên cân bằng cuộc sống — 5 tuần phép/năm, đi đúng giờ, im lặng là tôn trọng.",
        summaryEn:
          "Finland prioritizes work-life balance — 5 weeks paid leave, strict punctuality, silence is respect.",
        steps: [
          { vi: "Đến đúng giờ ± 5 phút; trễ là dấu hiệu không chuyên nghiệp.", en: "Arrive exactly on time ± 5 minutes; lateness signals unprofessionalism." },
          { vi: "Hợp đồng phải ghi rõ TES (collective agreement) — quy định lương tối thiểu theo ngành.", en: "Contracts must reference a TES (collective agreement) — sets sector minimum wages." },
          { vi: "Có quyền 11 giờ nghỉ giữa 2 ca, và ít nhất 35 giờ liên tục mỗi tuần.", en: "Right to 11 hours of rest between shifts and at least 35 continuous hours per week." },
          { vi: "Tham gia công đoàn (Ammattiliitto) để được bảo vệ pháp lý + quỹ thất nghiệp.", en: "Join a trade union (Ammattiliitto) for legal protection + unemployment fund." },
        ],
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
        summary:
          "Mỗi Kotikunta có Terveysasema riêng. Đặt lịch online hoặc gọi sáng sớm (7:00) khi có chỗ trống.",
        summaryEn:
          "Each municipality (Kotikunta) has its own Terveysasema. Book online or call early morning (7:00) when slots open.",
        steps: [
          { vi: "Tìm trạm y tế của bạn trên trang web kunta (ví dụ: hel.fi, tampere.fi).", en: "Find your health center on the municipal website (e.g. hel.fi, tampere.fi)." },
          { vi: "Đăng nhập omakanta.fi để xem hồ sơ y tế, đơn thuốc và đặt lịch.", en: "Log in at omakanta.fi to view medical records, prescriptions and book appointments." },
          { vi: "Nếu cần khẩn cấp ngoài giờ, gọi tổng đài tư vấn y tế: 116 117.", en: "For non-emergency after-hours advice, call the medical helpline: 116 117." },
          { vi: "Mang theo Kela-kortti & passport mỗi lần đi khám.", en: "Bring your Kela card & passport to every appointment." },
        ],
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
        summary:
          "112 là số DUY NHẤT cho cảnh sát, cứu hỏa, cứu thương. Tải app 112 Suomi để định vị bạn tự động.",
        summaryEn:
          "112 is the SINGLE number for police, fire, ambulance. Install the 112 Suomi app for automatic geolocation.",
        steps: [
          { vi: "Gọi 112 (miễn phí, hoạt động cả khi không có SIM hoặc khóa máy).", en: "Dial 112 (free, works even without SIM or with a locked phone)." },
          { vi: "Nói chậm bằng tiếng Anh: 'I need an ambulance / police / fire' + địa chỉ.", en: "Speak slowly in English: 'I need an ambulance / police / fire' + address." },
          { vi: "Cài app '112 Suomi' để vị trí GPS gửi tự động — quan trọng khi ở vùng xa.", en: "Install the '112 Suomi' app so GPS sends automatically — vital in remote areas." },
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
        proTip: {
          vi: "Đừng ngại gọi 112 chỉ vì tiếng Anh không tốt — tổng đài viên đều thông thạo tiếng Anh.",
          en: "Don't hesitate to call 112 because of weak English — operators are all fluent in English.",
        },
      },
    ],
  },
];

// ============================================================
// Merge expansion guides (2026) into base categories
// ============================================================
export const NEWCOMER_CATEGORIES: NewcomerCategory[] = _NEWCOMER_CATEGORIES_BASE.map((cat) => {
  if (cat.id === "admin") return { ...cat, guides: [...cat.guides, ...HOUSING_GUIDES] };
  if (cat.id === "daily") return { ...cat, guides: [...cat.guides, ...SHOPPING_GUIDES, ...SEASONAL_GUIDES] };
  if (cat.id === "work") return { ...cat, guides: [...cat.guides, ...STUDENT_TIPS_GUIDES] };
  return cat;
});
export interface ChecklistItem {
  key: string;
  vi: string;
  en: string;
  category: "admin" | "daily" | "work" | "health";
  week: 1 | 2 | 3 | 4;
}

export const FIRST_30_DAYS_CHECKLIST: ChecklistItem[] = [
  { key: "passport-copy", vi: "Sao chụp hộ chiếu & Oleskelulupa (3 bản)", en: "Photocopy passport & residence permit (3 copies)", category: "admin", week: 1 },
  { key: "dvv-appointment", vi: "Đặt lịch hẹn DVV", en: "Book DVV appointment", category: "admin", week: 1 },
  { key: "sim-card", vi: "Mua SIM Phần Lan (DNA, Telia, Elisa)", en: "Buy a Finnish SIM (DNA, Telia, Elisa)", category: "daily", week: 1 },
  { key: "rental-contract", vi: "Ký hợp đồng thuê nhà & lưu PDF", en: "Sign rental contract & save PDF", category: "admin", week: 1 },
  { key: "henkilotunnus", vi: "Nhận Henkilötunnus từ DVV", en: "Receive Henkilötunnus from DVV", category: "admin", week: 2 },
  { key: "bank-account", vi: "Mở tài khoản ngân hàng + BankID", en: "Open bank account + activate BankID", category: "admin", week: 2 },
  { key: "hsl-card", vi: "Đăng ký vé tháng giao thông công cộng", en: "Buy public transport monthly pass", category: "daily", week: 2 },
  { key: "loyalty-cards", vi: "Đăng ký thẻ S-Etukortti hoặc K-Plussa", en: "Sign up for S-Etukortti or K-Plussa", category: "daily", week: 2 },
  { key: "kela-application", vi: "Nộp đơn xin Kela (Form Y77)", en: "Submit Kela application (Form Y77)", category: "admin", week: 3 },
  { key: "tax-card", vi: "Tải Verokortti từ vero.fi", en: "Download Verokortti from vero.fi", category: "work", week: 3 },
  { key: "omakanta", vi: "Đăng nhập omakanta.fi và xác thực", en: "Log in to omakanta.fi and verify", category: "health", week: 3 },
  { key: "terveysasema", vi: "Tìm Terveysasema gần nhà", en: "Locate the nearest Terveysasema", category: "health", week: 3 },
  { key: "112-app", vi: "Cài app 112 Suomi", en: "Install the 112 Suomi app", category: "health", week: 3 },
  { key: "library-card", vi: "Đăng ký thẻ thư viện (miễn phí)", en: "Get a library card (free)", category: "daily", week: 4 },
  { key: "union", vi: "Tham gia công đoàn ngành (nếu đi làm)", en: "Join a trade union (if employed)", category: "work", week: 4 },
  { key: "kela-card", vi: "Nhận thẻ KELA qua bưu điện", en: "Receive KELA card by mail", category: "admin", week: 4 },
  { key: "recycling-points", vi: "Tìm điểm tái chế (Rinki-piste) gần nhất", en: "Find the nearest Rinki recycling point", category: "daily", week: 4 },
  { key: "language-course", vi: "Đăng ký khóa tiếng Phần Lan miễn phí (kotoutumiskoulutus)", en: "Enroll in free Finnish course (integration training)", category: "work", week: 4 },
  ...FIRST_30_DAYS_CHECKLIST_EXPANSION,
];

// Latest Migri / community resources (2026)
export const COMMUNITY_RESOURCES = [
  { title: "Migri — Latest Updates 2026", url: "https://migri.fi/en/news", emoji: "📰" },
  { title: "InfoFinland (Official multilingual portal)", url: "https://www.infofinland.fi/en", emoji: "🌐" },
  { title: "Người Việt tại Phần Lan (Facebook)", url: "https://www.facebook.com/groups/nguoivietphanlan", emoji: "👥" },
  { title: "Vietnam Association in Finland", url: "https://www.facebook.com/vietnamfinland", emoji: "🤝" },
  { title: "Helsinki International House", url: "https://www.google.com/maps/search/International+House+Helsinki", emoji: "🏛️" },
  { title: "Tori.fi — Buy used in Finland", url: "https://www.tori.fi", emoji: "♻️" },
  { title: "HOAS — Helsinki student housing", url: "https://www.hoas.fi/en/", emoji: "🏠" },
  { title: "Kela — Benefits 2026", url: "https://www.kela.fi/web/en", emoji: "💳" },
  { title: "Vero — Tax info 2026", url: "https://www.vero.fi/en/", emoji: "🧾" },
];

export const NEWCOMER_BADGE = {
  badgeId: "integrated-resident",
  badgeName: "Integrated Resident",
  badgeIcon: "🇫🇮",
};
