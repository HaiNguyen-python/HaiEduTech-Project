/**
 * @file preDepartureChecklist.ts
 * @description Country-specific pre-departure checklists for study abroad students.
 *   Each task has a unique key (used as DB row identifier) and bilingual labels.
 */

export type ChecklistCategory = "visa" | "accommodation" | "finance" | "packing" | "health" | "academic";

export interface ChecklistTask {
  key: string;            // unique within country
  category: ChecklistCategory;
  titleVi: string;
  titleEn: string;
  descVi?: string;
  descEn?: string;
  daysBeforeDeparture?: number; // suggested timing
}

export interface CountryChecklist {
  code: "finland" | "china" | "uk" | "usa" | "germany" | "australia" | "korea" | "japan";
  flag: string;
  nameVi: string;
  nameEn: string;
  accentClass: string;    // tailwind gradient class
  tasks: ChecklistTask[];
}

const CATEGORY_LABEL: Record<ChecklistCategory, { vi: string; en: string }> = {
  visa: { vi: "Visa & Giấy tờ", en: "Visa & Documents" },
  accommodation: { vi: "Chỗ ở", en: "Accommodation" },
  finance: { vi: "Tài chính", en: "Finance" },
  packing: { vi: "Hành lý", en: "Packing" },
  health: { vi: "Sức khỏe", en: "Health" },
  academic: { vi: "Học vụ", en: "Academic" },
};

export const getCategoryLabel = (cat: ChecklistCategory) => CATEGORY_LABEL[cat];

export const PRE_DEPARTURE_CHECKLISTS: CountryChecklist[] = [
  {
    code: "finland",
    flag: "🇫🇮",
    nameVi: "Phần Lan",
    nameEn: "Finland",
    accentClass: "from-blue-500 to-cyan-500",
    tasks: [
      { key: "fi-residence-permit", category: "visa", titleVi: "Xin Residence Permit (Migri)", titleEn: "Apply for Residence Permit (Migri)", descVi: "Nộp online tại enterfinland.fi, mất 1-3 tháng.", descEn: "Apply online at enterfinland.fi (1-3 months processing).", daysBeforeDeparture: 90 },
      { key: "fi-passport-valid", category: "visa", titleVi: "Hộ chiếu còn hạn ≥ 18 tháng", titleEn: "Passport valid ≥ 18 months", daysBeforeDeparture: 120 },
      { key: "fi-bio-appointment", category: "visa", titleVi: "Đặt lịch thu sinh trắc học VFS", titleEn: "Book biometrics appointment (VFS)", daysBeforeDeparture: 75 },
      { key: "fi-housing", category: "accommodation", titleVi: "Đăng ký ký túc xá HOAS/TOAS", titleEn: "Apply for HOAS/TOAS student housing", descVi: "Cạnh tranh cao tại Helsinki - đăng ký càng sớm càng tốt.", descEn: "Highly competitive in Helsinki - apply early.", daysBeforeDeparture: 120 },
      { key: "fi-bank-proof", category: "finance", titleVi: "Chứng minh tài chính €560/tháng × 12 tháng", titleEn: "Proof of funds €560/month × 12 months", daysBeforeDeparture: 90 },
      { key: "fi-insurance", category: "health", titleVi: "Bảo hiểm y tế €30,000+ (SIP/Tata AIG)", titleEn: "Health insurance €30,000+ coverage", daysBeforeDeparture: 60 },
      { key: "fi-warm-clothes", category: "packing", titleVi: "Áo khoác mùa đông −20°C, găng, ủng", titleEn: "Winter coat for −20°C, gloves, snow boots", descVi: "Mua tại VN rẻ hơn 50% so với Helsinki.", descEn: "50% cheaper to buy in Vietnam than Helsinki.", daysBeforeDeparture: 30 },
      { key: "fi-power-adapter", category: "packing", titleVi: "Adapter Type C/F (chuẩn EU)", titleEn: "Power adapter Type C/F (EU standard)", daysBeforeDeparture: 14 },
      { key: "fi-academic-docs", category: "academic", titleVi: "Bằng đại học + bảng điểm dịch công chứng", titleEn: "Notarized degree + transcript translation", daysBeforeDeparture: 60 },
      { key: "fi-orientation", category: "academic", titleVi: "Đăng ký Orientation Week của trường", titleEn: "Register for university Orientation Week", daysBeforeDeparture: 30 },
      { key: "fi-flight-arrival", category: "packing", titleVi: "Vé máy bay đến Helsinki/Tampere", titleEn: "Flight ticket to Helsinki/Tampere", daysBeforeDeparture: 45 },
      { key: "fi-language-basics", category: "academic", titleVi: "Học 50 từ tiếng Phần Lan cơ bản (Hei, Kiitos…)", titleEn: "Learn 50 basic Finnish words (Hei, Kiitos…)", daysBeforeDeparture: 21 },
    ],
  },
  {
    code: "china",
    flag: "🇨🇳",
    nameVi: "Trung Quốc",
    nameEn: "China",
    accentClass: "from-red-500 to-orange-500",
    tasks: [
      { key: "cn-x1-x2-visa", category: "visa", titleVi: "Xin visa du học X1 (>180 ngày) hoặc X2", titleEn: "Apply for X1 (>180 days) or X2 student visa", daysBeforeDeparture: 60 },
      { key: "cn-jw202", category: "visa", titleVi: "Có Form JW201/JW202 từ trường", titleEn: "Receive JW201/JW202 form from university", daysBeforeDeparture: 90 },
      { key: "cn-physical-exam", category: "health", titleVi: "Khám sức khoẻ tổng quát (mẫu Trung)", titleEn: "Medical exam on Chinese gov form", descVi: "Phải khám tại bệnh viện được chỉ định.", descEn: "Must use authorized hospital list.", daysBeforeDeparture: 45 },
      { key: "cn-dorm", category: "accommodation", titleVi: "Đặt KTX trường (rẻ hơn thuê ngoài)", titleEn: "Reserve on-campus dormitory", daysBeforeDeparture: 90 },
      { key: "cn-residence-permit", category: "visa", titleVi: "Đổi visa thành Residence Permit trong 30 ngày", titleEn: "Convert visa to Residence Permit within 30 days", descVi: "Bắt buộc khi tới TQ.", descEn: "Mandatory after arrival.", daysBeforeDeparture: 0 },
      { key: "cn-wechat-pay", category: "finance", titleVi: "Cài WeChat Pay + Alipay (liên kết Visa quốc tế)", titleEn: "Set up WeChat Pay + Alipay with international card", daysBeforeDeparture: 14 },
      { key: "cn-vpn", category: "packing", titleVi: "VPN trả phí đáng tin cậy (ExpressVPN/Astrill)", titleEn: "Reliable paid VPN (ExpressVPN/Astrill)", descVi: "Để truy cập Google/Facebook/Instagram.", descEn: "For Google/Facebook/Instagram access.", daysBeforeDeparture: 7 },
      { key: "cn-hsk-cert", category: "academic", titleVi: "Mang bản gốc chứng chỉ HSK", titleEn: "Bring original HSK certificate", daysBeforeDeparture: 7 },
      { key: "cn-sim-card", category: "packing", titleVi: "Đăng ký SIM China Mobile/Unicom khi tới", titleEn: "Get China Mobile/Unicom SIM upon arrival", daysBeforeDeparture: 0 },
      { key: "cn-flight", category: "packing", titleVi: "Vé bay đến Bắc Kinh/Thượng Hải/Quảng Châu", titleEn: "Flight to Beijing/Shanghai/Guangzhou", daysBeforeDeparture: 30 },
      { key: "cn-cash-rmb", category: "finance", titleVi: "Đổi 5,000-10,000 RMB tiền mặt", titleEn: "Exchange 5,000-10,000 RMB cash", daysBeforeDeparture: 14 },
    ],
  },
  {
    code: "uk",
    flag: "🇬🇧",
    nameVi: "Anh Quốc",
    nameEn: "United Kingdom",
    accentClass: "from-indigo-500 to-purple-600",
    tasks: [
      { key: "uk-cas", category: "academic", titleVi: "Nhận CAS từ trường (Confirmation of Acceptance)", titleEn: "Receive CAS from university", daysBeforeDeparture: 90 },
      { key: "uk-student-visa", category: "visa", titleVi: "Nộp Student Visa qua VFS Global", titleEn: "Submit Student Visa via VFS Global", descVi: "Bao gồm IHS surcharge ~£776/năm.", descEn: "Includes IHS surcharge ~£776/year.", daysBeforeDeparture: 75 },
      { key: "uk-tb-test", category: "health", titleVi: "Xét nghiệm Lao (TB Test) tại IOM", titleEn: "Tuberculosis (TB) test at IOM clinic", daysBeforeDeparture: 60 },
      { key: "uk-bank-proof", category: "finance", titleVi: "Chứng minh £1,334/tháng (London) hoặc £1,023/tháng", titleEn: "Proof of £1,334/month (London) or £1,023/month", daysBeforeDeparture: 60 },
      { key: "uk-housing", category: "accommodation", titleVi: "Đặt KTX trường hoặc nhà private (Unite/iQ)", titleEn: "Book uni dorm or private (Unite/iQ Student)", daysBeforeDeparture: 90 },
      { key: "uk-brp", category: "visa", titleVi: "Lấy BRP card trong 10 ngày sau khi đến", titleEn: "Collect BRP card within 10 days of arrival", daysBeforeDeparture: 0 },
      { key: "uk-monzo", category: "finance", titleVi: "Mở tài khoản Monzo/Revolut từ VN", titleEn: "Open Monzo/Revolut account from Vietnam", daysBeforeDeparture: 30 },
      { key: "uk-adapter", category: "packing", titleVi: "Adapter Type G (3 chấu vuông UK)", titleEn: "UK Type G plug adapter (3 square pins)", daysBeforeDeparture: 14 },
      { key: "uk-gp-register", category: "health", titleVi: "Đăng ký GP (bác sĩ gia đình NHS) khi tới", titleEn: "Register with GP (NHS family doctor) on arrival", daysBeforeDeparture: 0 },
      { key: "uk-rain-coat", category: "packing", titleVi: "Áo mưa + ô gập (mưa quanh năm)", titleEn: "Rain jacket + folding umbrella (year-round rain)", daysBeforeDeparture: 14 },
      { key: "uk-flight", category: "packing", titleVi: "Vé bay đến Heathrow/Manchester", titleEn: "Flight to Heathrow/Manchester", daysBeforeDeparture: 45 },
      { key: "uk-academic-docs", category: "academic", titleVi: "Bằng + bảng điểm + IELTS bản gốc", titleEn: "Original degree + transcript + IELTS", daysBeforeDeparture: 14 },
    ],
  },
  {
    code: "usa",
    flag: "🇺🇸",
    nameVi: "Hoa Kỳ",
    nameEn: "United States",
    accentClass: "from-blue-600 to-red-500",
    tasks: [
      { key: "us-i20", category: "academic", titleVi: "Nhận I-20 từ trường", titleEn: "Receive I-20 form from university", daysBeforeDeparture: 120 },
      { key: "us-sevis-fee", category: "finance", titleVi: "Đóng SEVIS Fee $350 (FMJfee.com)", titleEn: "Pay SEVIS Fee $350 (FMJfee.com)", daysBeforeDeparture: 90 },
      { key: "us-ds160", category: "visa", titleVi: "Điền DS-160 + đặt phỏng vấn lãnh sự", titleEn: "Fill DS-160 + book consulate interview", daysBeforeDeparture: 75 },
      { key: "us-f1-visa", category: "visa", titleVi: "Phỏng vấn xin visa F-1 (HCM/HN)", titleEn: "F-1 visa interview (HCMC/Hanoi)", descVi: "Mang theo I-20, SEVIS, bank statement, học bổng.", descEn: "Bring I-20, SEVIS, bank statement, award letter.", daysBeforeDeparture: 60 },
      { key: "us-vaccine-records", category: "health", titleVi: "Bản sao tiêm chủng (MMR, Varicella, Tdap)", titleEn: "Vaccination records (MMR, Varicella, Tdap)", daysBeforeDeparture: 45 },
      { key: "us-housing", category: "accommodation", titleVi: "Đăng ký on-campus housing (deadline tháng 5)", titleEn: "Register on-campus housing (May deadline)", daysBeforeDeparture: 120 },
      { key: "us-bank-proof", category: "finance", titleVi: "Chứng minh $30,000-$70,000/năm trong sao kê", titleEn: "Bank statement showing $30,000-$70,000/year", daysBeforeDeparture: 60 },
      { key: "us-credit-card", category: "finance", titleVi: "Mở thẻ Visa/MC quốc tế tại VN", titleEn: "Open international Visa/MC credit card", daysBeforeDeparture: 30 },
      { key: "us-adapter", category: "packing", titleVi: "Adapter Type A/B (110V US plug)", titleEn: "US Type A/B plug adapter (110V)", daysBeforeDeparture: 14 },
      { key: "us-prescription", category: "health", titleVi: "Mang đơn thuốc + thuốc cá nhân 6 tháng", titleEn: "Bring prescriptions + 6-month medication supply", daysBeforeDeparture: 21 },
      { key: "us-flight", category: "packing", titleVi: "Vé bay đến sân bay gần trường", titleEn: "Flight to nearest US airport", daysBeforeDeparture: 60 },
      { key: "us-orientation", category: "academic", titleVi: "Đăng ký International Student Orientation", titleEn: "Register for International Student Orientation", daysBeforeDeparture: 21 },
      { key: "us-ssn-plan", category: "finance", titleVi: "Tìm hiểu thủ tục SSN/ITIN sau khi tới", titleEn: "Plan SSN/ITIN application post-arrival", daysBeforeDeparture: 0 },
    ],
  },
  // ============ Germany ============
  {
    code: "germany",
    flag: "🇩🇪",
    nameVi: "Đức",
    nameEn: "Germany",
    accentClass: "from-yellow-500 to-red-600",
    tasks: [
      { key: "de-zulassung", category: "academic", titleVi: "Nhận Zulassungsbescheid (giấy nhập học)", titleEn: "Receive Zulassungsbescheid (admission letter)", daysBeforeDeparture: 120 },
      { key: "de-blocked-account", category: "finance", titleVi: "Mở Blocked Account €11,904 (Expatrio/Fintiba)", titleEn: "Open Blocked Account €11,904 (Expatrio/Fintiba)", descVi: "Bắt buộc cho visa du học.", descEn: "Mandatory for student visa.", daysBeforeDeparture: 90 },
      { key: "de-student-visa", category: "visa", titleVi: "Nộp National Visa (D) tại ĐSQ Đức HN/HCM", titleEn: "Apply for National Visa (D) at German embassy", daysBeforeDeparture: 75 },
      { key: "de-health-insurance", category: "health", titleVi: "Bảo hiểm public (TK/AOK ~€120/tháng)", titleEn: "Public health insurance (TK/AOK ~€120/mo)", daysBeforeDeparture: 45 },
      { key: "de-anmeldung", category: "visa", titleVi: "Đăng ký cư trú (Anmeldung) trong 14 ngày sau khi tới", titleEn: "Register address (Anmeldung) within 14 days of arrival", daysBeforeDeparture: 0 },
      { key: "de-housing", category: "accommodation", titleVi: "Tìm WG/Studentenwerk - cạnh tranh khốc liệt", titleEn: "Find WG/Studentenwerk dorm - extremely competitive", descVi: "Bắt đầu tìm 3-4 tháng trước.", descEn: "Start hunting 3-4 months ahead.", daysBeforeDeparture: 120 },
      { key: "de-n26", category: "finance", titleVi: "Mở tài khoản N26/DKB sau khi có Anmeldung", titleEn: "Open N26/DKB bank account after Anmeldung", daysBeforeDeparture: 0 },
      { key: "de-adapter", category: "packing", titleVi: "Adapter Type F (Schuko, 2 chấu tròn)", titleEn: "Type F (Schuko) plug adapter", daysBeforeDeparture: 14 },
      { key: "de-a1-german", category: "academic", titleVi: "Học A1 tiếng Đức cơ bản (Guten Tag, Danke…)", titleEn: "Learn A1 basic German (Guten Tag, Danke…)", daysBeforeDeparture: 60 },
      { key: "de-warm-coat", category: "packing", titleVi: "Áo khoác mùa đông −10°C + ủng chống trượt", titleEn: "Winter coat for −10°C + non-slip boots", daysBeforeDeparture: 21 },
      { key: "de-semester-ticket", category: "academic", titleVi: "Đọc kỹ Semester Ticket (bao gồm tàu vùng)", titleEn: "Understand Semester Ticket (covers regional trains)", daysBeforeDeparture: 0 },
      { key: "de-academic-docs", category: "academic", titleVi: "APS Certificate + bảng điểm dịch công chứng", titleEn: "APS Certificate + notarized translated transcript", daysBeforeDeparture: 90 },
      { key: "de-flight", category: "packing", titleVi: "Vé bay đến Frankfurt/Munich/Berlin", titleEn: "Flight to Frankfurt/Munich/Berlin", daysBeforeDeparture: 45 },
      { key: "de-cash-euro", category: "finance", titleVi: "Đổi €500-€1,000 tiền mặt cho tuần đầu", titleEn: "Exchange €500-€1,000 cash for first week", daysBeforeDeparture: 14 },
      { key: "de-rundfunk", category: "finance", titleVi: "Chuẩn bị phí Rundfunkbeitrag €18.36/tháng", titleEn: "Budget Rundfunkbeitrag radio fee €18.36/mo", descVi: "Bắt buộc, không thể từ chối.", descEn: "Mandatory, cannot opt out.", daysBeforeDeparture: 0 },
    ],
  },

  // ============ Australia ============
  {
    code: "australia",
    flag: "🇦🇺",
    nameVi: "Úc",
    nameEn: "Australia",
    accentClass: "from-green-600 to-amber-500",
    tasks: [
      { key: "au-coe", category: "academic", titleVi: "Nhận CoE (Confirmation of Enrolment)", titleEn: "Receive CoE (Confirmation of Enrolment)", daysBeforeDeparture: 120 },
      { key: "au-genuine-student", category: "visa", titleVi: "Chuẩn bị bài luận Genuine Student (GS)", titleEn: "Prepare Genuine Student (GS) statement", descVi: "Thay thế GTE từ 2024 - trọng số rất cao.", descEn: "Replaced GTE in 2024 - very heavily weighted.", daysBeforeDeparture: 75 },
      { key: "au-subclass-500", category: "visa", titleVi: "Nộp visa Subclass 500 online (immi.gov.au)", titleEn: "Apply Subclass 500 visa online (immi.gov.au)", daysBeforeDeparture: 60 },
      { key: "au-oshc", category: "health", titleVi: "Mua OSHC (Bupa/Medibank/Allianz) toàn khóa", titleEn: "Buy OSHC (Bupa/Medibank/Allianz) full duration", daysBeforeDeparture: 45 },
      { key: "au-bank-proof", category: "finance", titleVi: "Chứng minh AUD 29,710/năm sinh hoạt + học phí", titleEn: "Proof of AUD 29,710/yr living + tuition", daysBeforeDeparture: 60 },
      { key: "au-housing", category: "accommodation", titleVi: "Đặt on-campus / homestay tuần đầu", titleEn: "Book on-campus / homestay for first week", daysBeforeDeparture: 30 },
      { key: "au-tfn", category: "finance", titleVi: "Đăng ký TFN (Tax File Number) sau khi tới", titleEn: "Apply for TFN (Tax File Number) after arrival", descVi: "Bắt buộc nếu muốn đi làm partime 48h/2 tuần.", descEn: "Required to work 48h/fortnight legally.", daysBeforeDeparture: 0 },
      { key: "au-bank", category: "finance", titleVi: "Mở tài khoản CommBank/ANZ từ VN", titleEn: "Open CommBank/ANZ account from Vietnam", daysBeforeDeparture: 30 },
      { key: "au-adapter", category: "packing", titleVi: "Adapter Type I (3 chấu xéo)", titleEn: "Type I plug adapter (slanted 3-pin)", daysBeforeDeparture: 14 },
      { key: "au-sun-protection", category: "health", titleVi: "Kem chống nắng SPF 50+ + nón rộng vành", titleEn: "SPF 50+ sunscreen + wide-brim hat", descVi: "Tia UV ở Úc cao gấp 3 lần VN.", descEn: "UV index in Australia is 3x Vietnam's.", daysBeforeDeparture: 14 },
      { key: "au-no-food", category: "packing", titleVi: "KHÔNG mang thịt, hạt giống, đồ gỗ (biosecurity)", titleEn: "DO NOT bring meat, seeds, wooden items (biosecurity)", descVi: "Phạt lên đến AUD 6,260.", descEn: "Fines up to AUD 6,260.", daysBeforeDeparture: 7 },
      { key: "au-myki-opal", category: "packing", titleVi: "Cài app Opal (Sydney) hoặc Myki (Melbourne)", titleEn: "Install Opal (Sydney) or Myki (Melbourne) app", daysBeforeDeparture: 7 },
      { key: "au-orientation", category: "academic", titleVi: "Đăng ký O-Week của trường", titleEn: "Register for university O-Week", daysBeforeDeparture: 21 },
      { key: "au-flight", category: "packing", titleVi: "Vé bay đến Sydney/Melbourne/Brisbane", titleEn: "Flight to Sydney/Melbourne/Brisbane", daysBeforeDeparture: 60 },
      { key: "au-driver-license", category: "academic", titleVi: "Mang bản dịch công chứng GPLX (lái xe < 3 tháng)", titleEn: "Bring notarized VN driver's license translation", daysBeforeDeparture: 14 },
    ],
  },

  // ============ South Korea ============
  {
    code: "korea",
    flag: "🇰🇷",
    nameVi: "Hàn Quốc",
    nameEn: "South Korea",
    accentClass: "from-pink-500 to-rose-600",
    tasks: [
      { key: "kr-admission", category: "academic", titleVi: "Nhận Letter of Admission từ trường", titleEn: "Receive Letter of Admission from university", daysBeforeDeparture: 120 },
      { key: "kr-d2-visa", category: "visa", titleVi: "Xin visa D-2 (du học) tại ĐSQ Hàn HN/HCM", titleEn: "Apply D-2 student visa at Korean embassy", daysBeforeDeparture: 60 },
      { key: "kr-bank-proof", category: "finance", titleVi: "Chứng minh USD 20,000+ trong sao kê 6 tháng", titleEn: "Bank statement USD 20,000+ over 6 months", daysBeforeDeparture: 60 },
      { key: "kr-tb-test", category: "health", titleVi: "Xét nghiệm Lao (TB) tại bệnh viện chỉ định", titleEn: "TB (tuberculosis) test at authorized hospital", daysBeforeDeparture: 45 },
      { key: "kr-arc", category: "visa", titleVi: "Đăng ký ARC (Alien Registration Card) trong 90 ngày", titleEn: "Register ARC (Alien Registration Card) within 90 days", daysBeforeDeparture: 0 },
      { key: "kr-housing", category: "accommodation", titleVi: "Đặt KTX trường hoặc Goshiwon gần campus", titleEn: "Book uni dorm or Goshiwon near campus", daysBeforeDeparture: 75 },
      { key: "kr-tmoney", category: "packing", titleVi: "Mua T-money card khi đến (tàu điện ngầm + bus)", titleEn: "Get T-money card on arrival (subway + bus)", daysBeforeDeparture: 0 },
      { key: "kr-bank", category: "finance", titleVi: "Mở KB/Woori/Shinhan account sau khi có ARC", titleEn: "Open KB/Woori/Shinhan account after ARC", daysBeforeDeparture: 0 },
      { key: "kr-kakao", category: "packing", titleVi: "Cài KakaoTalk + KakaoMap (thay Google Maps)", titleEn: "Install KakaoTalk + KakaoMap (replaces Google Maps)", daysBeforeDeparture: 7 },
      { key: "kr-adapter", category: "packing", titleVi: "Adapter Type C/F (220V, giống EU)", titleEn: "Type C/F plug adapter (220V, EU-style)", daysBeforeDeparture: 14 },
      { key: "kr-topik", category: "academic", titleVi: "Mang chứng chỉ TOPIK bản gốc (nếu có)", titleEn: "Bring original TOPIK certificate (if any)", daysBeforeDeparture: 14 },
      { key: "kr-nhis", category: "health", titleVi: "Đăng ký NHIS (bảo hiểm y tế quốc gia) sau 6 tháng", titleEn: "Enroll in NHIS national health insurance after 6 months", daysBeforeDeparture: 0 },
      { key: "kr-cash-won", category: "finance", titleVi: "Đổi ₩500,000-₩1,000,000 tiền mặt", titleEn: "Exchange ₩500,000-₩1,000,000 cash", daysBeforeDeparture: 14 },
      { key: "kr-winter-coat", category: "packing", titleVi: "Áo khoác mùa đông −15°C (Seoul rất lạnh tháng 1)", titleEn: "Winter coat for −15°C (Seoul brutal in January)", daysBeforeDeparture: 21 },
      { key: "kr-orientation", category: "academic", titleVi: "Đăng ký International Orientation tuần OT", titleEn: "Register for International Student OT week", daysBeforeDeparture: 21 },
      { key: "kr-flight", category: "packing", titleVi: "Vé bay đến Incheon (ICN) hoặc Gimpo (GMP)", titleEn: "Flight to Incheon (ICN) or Gimpo (GMP)", daysBeforeDeparture: 45 },
    ],
  },

  // ============ Japan ============
  {
    code: "japan",
    flag: "🇯🇵",
    nameVi: "Nhật Bản",
    nameEn: "Japan",
    accentClass: "from-red-500 to-pink-500",
    tasks: [
      { key: "jp-coe", category: "visa", titleVi: "Nhận COE (Certificate of Eligibility) từ trường", titleEn: "Receive COE (Certificate of Eligibility) from school", descVi: "Mất 2-3 tháng để trường xin từ Cục Xuất Nhập Cảnh.", descEn: "Takes 2-3 months - school applies to Immigration.", daysBeforeDeparture: 120 },
      { key: "jp-student-visa", category: "visa", titleVi: "Nộp visa Student tại ĐSQ Nhật (cần COE bản gốc)", titleEn: "Apply Student visa at Japan embassy (needs original COE)", daysBeforeDeparture: 45 },
      { key: "jp-bank-proof", category: "finance", titleVi: "Chứng minh ¥1.5-2 triệu/năm trong sao kê", titleEn: "Bank statement ¥1.5-2M/year", daysBeforeDeparture: 90 },
      { key: "jp-residence-card", category: "visa", titleVi: "Nhận Zairyu Card (thẻ cư trú) ngay tại sân bay", titleEn: "Receive Zairyu Card at the airport on arrival", daysBeforeDeparture: 0 },
      { key: "jp-ward-office", category: "visa", titleVi: "Đăng ký địa chỉ tại ward office trong 14 ngày", titleEn: "Register address at ward office within 14 days", daysBeforeDeparture: 0 },
      { key: "jp-housing", category: "accommodation", titleVi: "Đặt KTX trường hoặc share-house (Sakura House)", titleEn: "Book uni dorm or share-house (Sakura House)", descVi: "Thuê private cần guarantor + key money.", descEn: "Private rentals need guarantor + key money.", daysBeforeDeparture: 75 },
      { key: "jp-nhi", category: "health", titleVi: "Đăng ký NHI (National Health Insurance) tại ward office", titleEn: "Enroll in NHI at ward office", descVi: "~¥2,000/tháng, bắt buộc.", descEn: "~¥2,000/mo, mandatory.", daysBeforeDeparture: 0 },
      { key: "jp-bank", category: "finance", titleVi: "Mở Japan Post Bank / Shinsei sau khi có MyNumber", titleEn: "Open Japan Post Bank / Shinsei after MyNumber issued", daysBeforeDeparture: 0 },
      { key: "jp-suica", category: "packing", titleVi: "Mua thẻ Suica/Pasmo tại sân bay (tàu + tiện lợi)", titleEn: "Get Suica/Pasmo card at the airport (trains + konbini)", daysBeforeDeparture: 0 },
      { key: "jp-adapter", category: "packing", titleVi: "Adapter Type A (2 chấu dẹt, 100V)", titleEn: "Type A plug adapter (2 flat pins, 100V)", descVi: "Điện 100V - một số đồ VN có thể yếu hơn.", descEn: "100V - some Vietnam-bought devices run weak.", daysBeforeDeparture: 14 },
      { key: "jp-jlpt", category: "academic", titleVi: "Mang chứng chỉ JLPT bản gốc (nếu có)", titleEn: "Bring original JLPT certificate (if any)", daysBeforeDeparture: 14 },
      { key: "jp-hanko", category: "packing", titleVi: "Đặt khắc Hanko (con dấu cá nhân) - cần cho ngân hàng", titleEn: "Order a Hanko (personal seal) - needed for bank accounts", daysBeforeDeparture: 30 },
      { key: "jp-line", category: "packing", titleVi: "Cài LINE (mọi giao tiếp ở Nhật đều qua LINE)", titleEn: "Install LINE (everyone in Japan uses LINE)", daysBeforeDeparture: 7 },
      { key: "jp-cash-yen", category: "finance", titleVi: "Đổi ¥100,000-¥200,000 tiền mặt (Nhật vẫn cash-heavy)", titleEn: "Exchange ¥100,000-¥200,000 cash (Japan is still cash-heavy)", daysBeforeDeparture: 14 },
      { key: "jp-orientation", category: "academic", titleVi: "Đăng ký Orientation cho sinh viên quốc tế", titleEn: "Register for International Student Orientation", daysBeforeDeparture: 21 },
      { key: "jp-flight", category: "packing", titleVi: "Vé bay đến Narita/Haneda/Kansai", titleEn: "Flight to Narita/Haneda/Kansai", daysBeforeDeparture: 60 },
      { key: "jp-earthquake-app", category: "health", titleVi: "Cài Yurekuru Call (cảnh báo động đất sớm)", titleEn: "Install Yurekuru Call (earthquake early warning)", daysBeforeDeparture: 7 },
    ],
  },
];

export const findCountry = (code: string) =>
  PRE_DEPARTURE_CHECKLISTS.find((c) => c.code === code);
