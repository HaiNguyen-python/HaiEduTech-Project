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
  code: "finland" | "china" | "uk" | "usa";
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
      { key: "fi-housing", category: "accommodation", titleVi: "Đăng ký ký túc xá HOAS/TOAS", titleEn: "Apply for HOAS/TOAS student housing", descVi: "Cạnh tranh cao tại Helsinki — đăng ký càng sớm càng tốt.", descEn: "Highly competitive in Helsinki — apply early.", daysBeforeDeparture: 120 },
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
];

export const findCountry = (code: string) =>
  PRE_DEPARTURE_CHECKLISTS.find((c) => c.code === code);
