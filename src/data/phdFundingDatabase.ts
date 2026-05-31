/**
 * @file phdFundingDatabase.ts
 * @description Curated PhD scholarship & funding programs (~28) used by PhdFundingDatabase.
 * @author HaiEduTech
 */

export type PhdFundingTier = "full" | "stipend" | "tuition" | "supplement";
export type PhdFundingField = "STEM" | "SocSci" | "Business" | "Arts" | "Any";

export interface PhdFunding {
  id: string;
  name: string;
  country: string; // ISO-friendly label
  flag: string;
  tier: PhdFundingTier;
  amountEn: string;
  amountVi: string;
  fields: PhdFundingField[];
  deadlineEn: string;
  deadlineVi: string;
  noteEn: string;
  noteVi: string;
  url: string;
}

export const PHD_FUNDING: PhdFunding[] = [
  // EU
  { id: "marie-curie", name: "Marie Skłodowska-Curie Actions", country: "EU", flag: "🇪🇺", tier: "full",
    amountEn: "€3,400+/mo + mobility allowance", amountVi: "€3,400+/tháng + phụ cấp di chuyển",
    fields: ["STEM", "SocSci", "Any"],
    deadlineEn: "Rolling - calls Mar / Sep", deadlineVi: "Liên tục - gọi tháng 3 / 9",
    noteEn: "Project-based fellowships across all EU institutions.", noteVi: "Fellowship theo project tại mọi viện EU.",
    url: "https://marie-sklodowska-curie-actions.ec.europa.eu/" },
  { id: "daad", name: "DAAD Research Grants (Germany)", country: "Germany", flag: "🇩🇪", tier: "full",
    amountEn: "€1,300/mo + tuition + health", amountVi: "€1,300/tháng + học phí + bảo hiểm",
    fields: ["STEM", "SocSci", "Any"],
    deadlineEn: "Annually Oct–Nov", deadlineVi: "Hằng năm Oct–Nov",
    noteEn: "Top Vietnamese-friendly funder for German PhDs.", noteVi: "Nguồn quen thuộc với học viên Việt cho PhD ở Đức.",
    url: "https://www.daad.de/" },
  { id: "nwo", name: "NWO Talent Programme (Netherlands)", country: "Netherlands", flag: "🇳🇱", tier: "stipend",
    amountEn: "€2,800+/mo (PhD employee)", amountVi: "€2,800+/tháng (PhD = nhân viên)",
    fields: ["STEM", "SocSci"],
    deadlineEn: "Rolling per project", deadlineVi: "Liên tục theo project",
    noteEn: "PhDs are paid staff in NL universities.", noteVi: "PhD ở Hà Lan là nhân viên có lương.",
    url: "https://www.nwo.nl/" },
  { id: "swiss-gov", name: "Swiss Government Excellence Scholarships", country: "Switzerland", flag: "🇨🇭", tier: "full",
    amountEn: "CHF 1,920/mo + tuition + health", amountVi: "CHF 1,920/tháng + học phí + bảo hiểm",
    fields: ["Any"],
    deadlineEn: "Aug–Dec", deadlineVi: "Aug–Dec",
    noteEn: "Highly selective, ~3 Vietnamese awards/year.", noteVi: "Rất chọn lọc, ~3 suất/năm cho VN.",
    url: "https://www.sbfi.admin.ch/sbfi/en/home/education/scholarships-and-grants/swiss-government-excellence-scholarships.html" },

  // UK
  { id: "ukri-dtp", name: "UKRI Doctoral Training Partnerships", country: "UK", flag: "🇬🇧", tier: "full",
    amountEn: "£19,237/yr + tuition + research costs", amountVi: "£19,237/năm + học phí + chi phí nghiên cứu",
    fields: ["STEM", "SocSci"],
    deadlineEn: "Nov–Jan", deadlineVi: "Nov–Jan",
    noteEn: "Most prestigious UK PhD funding.", noteVi: "Funding PhD danh giá nhất ở UK.",
    url: "https://www.ukri.org/" },
  { id: "gates-cambridge", name: "Gates Cambridge", country: "UK", flag: "🇬🇧", tier: "full",
    amountEn: "Full fees + £19,500 stipend + travel", amountVi: "Toàn phần học phí + £19,500 sinh hoạt + đi lại",
    fields: ["Any"],
    deadlineEn: "Dec (US Round Oct)", deadlineVi: "Dec (vòng US Oct)",
    noteEn: "Cambridge only - outstanding intellectual ability.", noteVi: "Chỉ ĐH Cambridge - học lực xuất sắc.",
    url: "https://www.gatescambridge.org/" },
  { id: "clarendon", name: "Clarendon Scholarship (Oxford)", country: "UK", flag: "🇬🇧", tier: "full",
    amountEn: "Full fees + £19,237 stipend", amountVi: "Toàn phần học phí + £19,237 sinh hoạt",
    fields: ["Any"],
    deadlineEn: "Jan (with Oxford admission)", deadlineVi: "Tháng 1 (cùng hồ sơ Oxford)",
    noteEn: "Auto-considered when you apply to Oxford.", noteVi: "Tự động xét khi apply Oxford.",
    url: "https://www.ox.ac.uk/clarendon" },
  { id: "commonwealth", name: "Commonwealth PhD Scholarships", country: "UK", flag: "🇬🇧", tier: "full",
    amountEn: "Tuition + £1,236/mo + flights", amountVi: "Học phí + £1,236/tháng + vé máy bay",
    fields: ["Any"],
    deadlineEn: "Oct–Dec", deadlineVi: "Oct–Dec",
    noteEn: "For low/middle-income Commonwealth countries.", noteVi: "Dành cho công dân Commonwealth thu nhập trung-thấp.",
    url: "https://cscuk.fcdo.gov.uk/" },

  // US / Canada
  { id: "fulbright-vn", name: "Fulbright Vietnamese Student Program", country: "USA", flag: "🇺🇸", tier: "full",
    amountEn: "Full tuition + $1,800/mo + insurance", amountVi: "Toàn phần học phí + $1,800/tháng + bảo hiểm",
    fields: ["SocSci", "STEM"],
    deadlineEn: "Apr 15", deadlineVi: "15/4",
    noteEn: "Prestige + alumni network for Vietnamese students.", noteVi: "Danh giá + mạng lưới cựu sinh viên cho người Việt.",
    url: "https://vn.usembassy.gov/education-culture/fulbright-program/" },
  { id: "vef", name: "Vietnam Education Foundation (VEF 2.0)", country: "USA", flag: "🇺🇸", tier: "full",
    amountEn: "Full STEM PhD funding", amountVi: "Tài trợ toàn phần PhD STEM",
    fields: ["STEM"],
    deadlineEn: "Sep", deadlineVi: "Tháng 9",
    noteEn: "Vietnamese STEM scholars; partners with US universities.", noteVi: "Cho học giả STEM Việt; hợp tác trường Mỹ.",
    url: "https://www.vef2.org/" },
  { id: "vingroup-vinif", name: "Vingroup VinIF Overseas PhD", country: "Global", flag: "🌐", tier: "full",
    amountEn: "Up to $80,000/yr × 4 yrs", amountVi: "Tối đa $80,000/năm × 4 năm",
    fields: ["STEM"],
    deadlineEn: "May–Jun", deadlineVi: "May–Jun",
    noteEn: "Top Vietnamese-funded scholarship for STEM PhDs abroad.", noteVi: "HB top do quỹ Việt cấp cho PhD STEM nước ngoài.",
    url: "https://vinif.org/" },
  { id: "knight-hennessy", name: "Knight-Hennessy Scholars (Stanford)", country: "USA", flag: "🇺🇸", tier: "full",
    amountEn: "Full Stanford funding + leadership program", amountVi: "Toàn phần Stanford + chương trình lãnh đạo",
    fields: ["Any"],
    deadlineEn: "Oct", deadlineVi: "Tháng 10",
    noteEn: "Cross-disciplinary; ~100 awards/yr globally.", noteVi: "Liên ngành; ~100 suất/năm toàn cầu.",
    url: "https://knight-hennessy.stanford.edu/" },
  { id: "vanier", name: "Vanier Canada Graduate Scholarship", country: "Canada", flag: "🇨🇦", tier: "full",
    amountEn: "CAD $50,000/yr × 3 yrs", amountVi: "CAD $50,000/năm × 3 năm",
    fields: ["STEM", "SocSci"],
    deadlineEn: "Nov", deadlineVi: "Tháng 11",
    noteEn: "Nominated by Canadian university - contact early.", noteVi: "Trường Canada đề cử - liên hệ sớm.",
    url: "https://vanier.gc.ca/" },
  { id: "trudeau", name: "Trudeau Foundation Doctoral Scholarship", country: "Canada", flag: "🇨🇦", tier: "full",
    amountEn: "CAD $40,000/yr + research allowance", amountVi: "CAD $40,000/năm + phụ cấp nghiên cứu",
    fields: ["SocSci", "Arts"],
    deadlineEn: "Dec", deadlineVi: "Tháng 12",
    noteEn: "Humanities & social sciences focus.", noteVi: "Tập trung nhân văn & xã hội.",
    url: "https://www.trudeaufoundation.ca/" },

  // Australia / NZ
  { id: "rtp", name: "Research Training Program (RTP)", country: "Australia", flag: "🇦🇺", tier: "full",
    amountEn: "A$32,192/yr + tuition + OSHC", amountVi: "A$32,192/năm + học phí + OSHC",
    fields: ["Any"],
    deadlineEn: "Apr–Oct (multiple rounds)", deadlineVi: "Apr–Oct (nhiều đợt)",
    noteEn: "Awarded by each Australian university.", noteVi: "Mỗi trường Úc tự xét.",
    url: "https://www.education.gov.au/research-training-program" },
  { id: "australia-awards", name: "Australia Awards Scholarships", country: "Australia", flag: "🇦🇺", tier: "full",
    amountEn: "Tuition + living + travel + OSHC", amountVi: "Học phí + sinh hoạt + đi lại + OSHC",
    fields: ["Any"],
    deadlineEn: "Apr 30", deadlineVi: "30/4",
    noteEn: "Government-to-government priority sectors.", noteVi: "Hợp tác chính phủ, ưu tiên ngành chiến lược.",
    url: "https://www.dfat.gov.au/people-to-people/australia-awards" },
  { id: "nz-doctoral", name: "New Zealand Commonwealth Scholarships", country: "New Zealand", flag: "🇳🇿", tier: "full",
    amountEn: "Full tuition + NZ$31,000/yr stipend", amountVi: "Toàn phần học phí + NZ$31,000/năm",
    fields: ["Any"],
    deadlineEn: "Mar–Apr", deadlineVi: "Mar–Apr",
    noteEn: "All public NZ universities.", noteVi: "Tất cả ĐH công lập NZ.",
    url: "https://www.nzscholarships.govt.nz/" },

  // Asia
  { id: "mext", name: "MEXT Scholarship (Japan)", country: "Japan", flag: "🇯🇵", tier: "full",
    amountEn: "¥145,000/mo + flights + tuition waiver", amountVi: "¥145,000/tháng + vé máy bay + miễn học phí",
    fields: ["Any"],
    deadlineEn: "Embassy: Apr–Jun · Uni: Oct–Dec", deadlineVi: "ĐSQ: Apr–Jun · Trường: Oct–Dec",
    noteEn: "Most popular Japan PhD scholarship.", noteVi: "Học bổng PhD ở Nhật phổ biến nhất.",
    url: "https://www.studyinjapan.go.jp/" },
  { id: "gks", name: "Global Korea Scholarship (GKS)", country: "South Korea", flag: "🇰🇷", tier: "full",
    amountEn: "₩1.35M/mo + tuition + Korean year", amountVi: "₩1.35 triệu/tháng + học phí + 1 năm tiếng Hàn",
    fields: ["Any"],
    deadlineEn: "Embassy: Feb · Uni: Mar", deadlineVi: "ĐSQ: tháng 2 · Trường: tháng 3",
    noteEn: "Includes intensive Korean language year.", noteVi: "Có 1 năm học tiếng Hàn cường độ cao.",
    url: "https://www.studyinkorea.go.kr/" },
  { id: "singa", name: "A*STAR SINGA Award", country: "Singapore", flag: "🇸🇬", tier: "full",
    amountEn: "S$2,500–3,000/mo + tuition + S$1,000 settle", amountVi: "S$2,500–3,000/tháng + học phí + S$1,000 định cư",
    fields: ["STEM"],
    deadlineEn: "Jan 1 & Jul 1", deadlineVi: "1/1 & 1/7",
    noteEn: "STEM-only; world-class research labs.", noteVi: "Chỉ STEM; lab nghiên cứu đẳng cấp.",
    url: "https://www.a-star.edu.sg/Scholarships/for-graduate-studies/singapore-international-graduate-award-singa" },
  { id: "ntu-psp", name: "NTU President's Graduate Scholarship", country: "Singapore", flag: "🇸🇬", tier: "full",
    amountEn: "S$2,700–3,200/mo + tuition", amountVi: "S$2,700–3,200/tháng + học phí",
    fields: ["STEM", "Business"],
    deadlineEn: "Nov & May", deadlineVi: "Nov & May",
    noteEn: "Outstanding First Class honours.", noteVi: "Yêu cầu First Class danh dự.",
    url: "https://www.ntu.edu.sg/admissions/graduate/scholarships" },
  { id: "tsinghua-csc", name: "Chinese Government Scholarship (CSC)", country: "China", flag: "🇨🇳", tier: "full",
    amountEn: "¥3,500/mo + tuition + insurance", amountVi: "¥3,500/tháng + học phí + bảo hiểm",
    fields: ["Any"],
    deadlineEn: "Jan–Apr", deadlineVi: "Jan–Apr",
    noteEn: "Wide network including Tsinghua, PKU, Fudan.", noteVi: "Mạng lưới rộng: Tsinghua, PKU, Fudan…",
    url: "https://www.campuschina.org/" },
  { id: "yenching", name: "Yenching Academy (Peking University)", country: "China", flag: "🇨🇳", tier: "full",
    amountEn: "Full tuition + ¥3,500/mo", amountVi: "Toàn phần học phí + ¥3,500/tháng",
    fields: ["SocSci"],
    deadlineEn: "Dec", deadlineVi: "Tháng 12",
    noteEn: "Master-style cohort; pathway to China PhD.", noteVi: "Cohort kiểu Master; bệ phóng PhD ở Trung Quốc.",
    url: "https://yenchingacademy.pku.edu.cn/" },

  // Nordic
  { id: "academy-finland", name: "Academy of Finland Postdoc Pool", country: "Finland", flag: "🇫🇮", tier: "supplement",
    amountEn: "€2,100–2,800/mo via projects", amountVi: "€2,100–2,800/tháng qua project",
    fields: ["STEM", "SocSci"],
    deadlineEn: "Sep call", deadlineVi: "Đợt tháng 9",
    noteEn: "Indirect path: join a funded project.", noteVi: "Đi qua project đã có funding.",
    url: "https://www.aka.fi/en/" },
  { id: "sweden-csn", name: "Swedish PhD Employment Path", country: "Sweden", flag: "🇸🇪", tier: "stipend",
    amountEn: "SEK 30,000–35,000/mo (employee)", amountVi: "SEK 30,000–35,000/tháng (nhân viên)",
    fields: ["STEM", "SocSci"],
    deadlineEn: "Rolling per position", deadlineVi: "Liên tục theo vị trí",
    noteEn: "PhDs in Sweden are paid employees with pension.", noteVi: "PhD ở Thuỵ Điển là nhân viên có lương hưu.",
    url: "https://www.universityadmissions.se/" },
  { id: "norad-norway", name: "NORHED II PhD Track (Norway)", country: "Norway", flag: "🇳🇴", tier: "full",
    amountEn: "NOK 491,200/yr + research support", amountVi: "NOK 491,200/năm + hỗ trợ nghiên cứu",
    fields: ["SocSci", "STEM"],
    deadlineEn: "Project-dependent", deadlineVi: "Tuỳ project",
    noteEn: "Capacity-building partnerships with VN universities.", noteVi: "Hợp tác xây dựng năng lực với trường VN.",
    url: "https://www.norad.no/" },

  // Global
  { id: "rhodes", name: "Rhodes Scholarship (Oxford)", country: "UK", flag: "🇬🇧", tier: "full",
    amountEn: "Full Oxford tuition + £18,180 stipend", amountVi: "Toàn phần học phí Oxford + £18,180 sinh hoạt",
    fields: ["Any"],
    deadlineEn: "Aug (Vietnam constituency: Global)", deadlineVi: "Tháng 8 (VN thuộc Global)",
    noteEn: "Leadership focus, age <26.", noteVi: "Trọng tâm lãnh đạo, dưới 26 tuổi.",
    url: "https://www.rhodeshouse.ox.ac.uk/" },
  { id: "schwarzman", name: "Schwarzman Scholars (Tsinghua)", country: "China", flag: "🇨🇳", tier: "full",
    amountEn: "Tuition + room + $5,000 travel + $4,000 stipend", amountVi: "Học phí + ký túc + $5,000 đi lại + $4,000 sinh hoạt",
    fields: ["SocSci", "Business"],
    deadlineEn: "Sep–Oct", deadlineVi: "Sep–Oct",
    noteEn: "1-year Master then often pivots to PhD elsewhere.", noteVi: "Master 1 năm rồi thường rẽ sang PhD nơi khác.",
    url: "https://www.schwarzmanscholars.org/" },
];

export const PHD_FUNDING_COUNTRIES = Array.from(new Set(PHD_FUNDING.map((f) => f.country))).sort();
export const PHD_FUNDING_FIELDS: PhdFundingField[] = ["STEM", "SocSci", "Business", "Arts", "Any"];
export const PHD_FUNDING_TIERS: PhdFundingTier[] = ["full", "stipend", "tuition", "supplement"];
