/**
 * @file phdCountryGuides.ts
 * @description Country-specific PhD strategies (8 destinations) with funding, top unis,
 *              requirements, timeline anchors and red flags. Bilingual EN/VI strings.
 * @author HaiEduTech
 */

export interface PhdCountryGuide {
  id: string;
  nameEn: string;
  nameVi: string;
  flag: string;
  gradient: string;
  strategyEn: string;
  strategyVi: string;
  tipsEn: string[];
  tipsVi: string[];
  fundingEn: string;
  fundingVi: string;
  stipendUsdPerMonth: string; // e.g. "$2,400 – $3,100"
  typicalDeadlineEn: string;
  typicalDeadlineVi: string;
  topUnis: string[];
  requirements: {
    ielts: string;
    toefl: string;
    gpa: string;
    gre: string;
    other: string;
    otherVi: string;
  };
  timeline: { whenEn: string; whenVi: string; doEn: string; doVi: string }[];
  redFlagsEn: string[];
  redFlagsVi: string[];
}

export const PHD_COUNTRY_GUIDES: PhdCountryGuide[] = [
  {
    id: "europe",
    nameEn: "EU (NL / DE / Nordics)",
    nameVi: "Châu Âu (Hà Lan / Đức / Bắc Âu)",
    flag: "🇪🇺",
    gradient: "from-sky-500 to-blue-600",
    strategyEn: "Apply to advertised project-based PhDs (paid employee).",
    strategyVi: "Apply vào project PhD đã có vacancy (PhD = nhân viên có lương).",
    tipsEn: [
      "Search Academic Positions, EURAXESS, FindAPhD, university job boards.",
      "PhD is a salaried 3–4 year contract, full social benefits.",
      "Supervisor is already assigned to the project - apply directly.",
      "Usually NO standalone research proposal needed.",
      "Motivation letter must connect YOUR skills to the project keywords.",
    ],
    tipsVi: [
      "Tìm trên Academic Positions, EURAXESS, FindAPhD, web tuyển dụng từng trường.",
      "PhD = hợp đồng có lương 3–4 năm, đủ phúc lợi xã hội.",
      "Supervisor đã được gán sẵn cho project - apply trực tiếp.",
      "Thường KHÔNG cần research proposal riêng.",
      "Motivation letter phải nối kỹ năng của em với keyword của project.",
    ],
    fundingEn: "Built into the contract + Marie Skłodowska-Curie / DAAD / NWO grants.",
    fundingVi: "Đã có sẵn trong hợp đồng + Marie Curie / DAAD / NWO bổ sung.",
    stipendUsdPerMonth: "$2,400 – $3,300",
    typicalDeadlineEn: "Rolling - most positions open Jan–Apr and Sep–Nov.",
    typicalDeadlineVi: "Liên tục - nhiều vị trí mở Jan–Apr và Sep–Nov.",
    topUnis: ["TU Delft (NL)", "ETH Zürich (CH)", "KTH (SE)", "Aalto (FI)", "TU Munich (DE)"],
    requirements: { ielts: "6.5+ (7.0 preferred)", toefl: "90+", gpa: "3.3 / 4.0", gre: "Not required", other: "Master's degree mandatory", otherVi: "Bắt buộc có bằng Thạc sĩ" },
    timeline: [
      { whenEn: "T-12 m", whenVi: "T-12 tháng", doEn: "Identify 5 research groups", doVi: "Khoanh vùng 5 nhóm nghiên cứu" },
      { whenEn: "T-6 m", whenVi: "T-6 tháng", doEn: "IELTS 6.5+, polish CV (EU format)", doVi: "IELTS 6.5+, hoàn thiện CV chuẩn EU" },
      { whenEn: "T-3 m", whenVi: "T-3 tháng", doEn: "Apply to 8–10 vacancies", doVi: "Apply 8–10 vacancy" },
    ],
    redFlagsEn: [
      "Sending generic motivation letters that don't mention the project ID.",
      "Skipping the supervisor's recent papers in the application.",
    ],
    redFlagsVi: [
      "Gửi motivation letter chung chung không nhắc mã project.",
      "Không đọc paper mới nhất của supervisor trước khi apply.",
    ],
  },
  {
    id: "us",
    nameEn: "USA / Canada",
    nameVi: "Mỹ / Canada",
    flag: "🇺🇸",
    gradient: "from-red-500 to-rose-600",
    strategyEn: "Cold email professors + strong SOP + 3 LoRs (5–6 year program).",
    strategyVi: "Cold email giáo sư + SOP mạnh + 3 LoR (chương trình 5–6 năm).",
    tipsEn: [
      "PhD = 5–6 years, funded via TA / RA / Fellowships.",
      "ALWAYS cold email 8–15 supervisors BEFORE the December deadline.",
      "GRE: optional at many top schools post-2024 - check each program.",
      "TOEFL ≥100 (or IELTS ≥7.0 - confirm school accepts it).",
      "SOP must tell ONE coherent research story across past, present, future.",
    ],
    tipsVi: [
      "PhD = 5–6 năm, funding qua TA / RA / Fellowship.",
      "BẮT BUỘC cold email 8–15 supervisor TRƯỚC deadline tháng 12.",
      "GRE: nhiều top school đã optional sau 2024 - check từng chương trình.",
      "TOEFL ≥100 (hoặc IELTS ≥7.0 - xác nhận trường có nhận IELTS).",
      "SOP phải kể MỘT câu chuyện nghiên cứu xuyên suốt: quá khứ → hiện tại → tương lai.",
    ],
    fundingEn: "Fulbright, VEF, Vingroup, school fellowships (~$30K–$45K/yr + tuition waiver).",
    fundingVi: "Fulbright, VEF, Vingroup, fellowship của trường (~$30K–$45K/năm + miễn học phí).",
    stipendUsdPerMonth: "$2,500 – $3,800",
    typicalDeadlineEn: "Dec 1 – Jan 15 (fall intake).",
    typicalDeadlineVi: "1/12 – 15/1 (nhập học mùa thu).",
    topUnis: ["MIT", "Stanford", "CMU", "UC Berkeley", "U Toronto"],
    requirements: { ielts: "7.0+", toefl: "100+", gpa: "3.5 / 4.0", gre: "Optional at many schools", other: "3 LoRs + SOP + writing sample (SocSci)", otherVi: "3 thư giới thiệu + SOP + writing sample (SocSci)" },
    timeline: [
      { whenEn: "T-15 m", whenVi: "T-15 tháng", doEn: "GRE/TOEFL, list 30 supervisors", doVi: "GRE/TOEFL, list 30 supervisor" },
      { whenEn: "T-9 m", whenVi: "T-9 tháng", doEn: "Cold email & narrow to 12", doVi: "Cold email & chốt 12 trường" },
      { whenEn: "T-3 m", whenVi: "T-3 tháng", doEn: "Submit by Dec 1", doVi: "Nộp trước 1/12" },
    ],
    redFlagsEn: [
      "Mass-emailing 50 professors with identical text.",
      "SOP that brags about GPA instead of showing research taste.",
    ],
    redFlagsVi: [
      "Gửi cùng 1 email cho 50 giáo sư.",
      "SOP khoe GPA thay vì thể hiện 'research taste'.",
    ],
  },
  {
    id: "uk",
    nameEn: "United Kingdom",
    nameVi: "Vương quốc Anh",
    flag: "🇬🇧",
    gradient: "from-indigo-500 to-blue-700",
    strategyEn: "Research Proposal + DTP / CDT funded programs.",
    strategyVi: "Research Proposal + xin DTP / CDT có funding.",
    tipsEn: [
      "PhD = 3–4 years; UKRI funded studentships cover stipend + fees.",
      "Doctoral Training Partnerships (DTP) and Centres for Doctoral Training (CDT) are the gold path.",
      "Self-funded admissions are easy - funded ones are competitive.",
      "Research Proposal: 1500–2000 words, very structured.",
      "Chevening does NOT fund PhDs; use Commonwealth Scholarships.",
    ],
    tipsVi: [
      "PhD = 3–4 năm; UKRI studentship lo cả sinh hoạt phí + học phí.",
      "DTP (Doctoral Training Partnership) và CDT (Centre for Doctoral Training) là 'cửa vàng' funding.",
      "Admit tự túc dễ - admit có funding mới cạnh tranh.",
      "Research Proposal: 1500–2000 từ, cấu trúc rất chặt.",
      "Chevening KHÔNG cấp cho PhD; dùng Commonwealth Scholarships thay thế.",
    ],
    fundingEn: "UKRI (£19,237/yr 2024), Commonwealth, Gates Cambridge, Clarendon (Oxford).",
    fundingVi: "UKRI (£19,237/năm 2024), Commonwealth, Gates Cambridge, Clarendon (Oxford).",
    stipendUsdPerMonth: "$2,100 – $2,600",
    typicalDeadlineEn: "Nov–Jan for funded; rolling for self-funded.",
    typicalDeadlineVi: "Nov–Jan cho funded; liên tục cho self-funded.",
    topUnis: ["Oxford", "Cambridge", "Imperial College", "UCL", "Edinburgh"],
    requirements: { ielts: "7.0 (no band <6.5)", toefl: "100+", gpa: "Upper Second (2:1)+", gre: "Not required", other: "Research proposal 1500–2000 words", otherVi: "Research proposal 1500–2000 từ" },
    timeline: [
      { whenEn: "T-12 m", whenVi: "T-12 tháng", doEn: "Draft proposal, contact supervisors", doVi: "Phác proposal, liên hệ supervisor" },
      { whenEn: "T-6 m", whenVi: "T-6 tháng", doEn: "IELTS 7.0, finalise proposal", doVi: "IELTS 7.0, chốt proposal" },
      { whenEn: "T-3 m", whenVi: "T-3 tháng", doEn: "Submit before funding deadline", doVi: "Nộp trước hạn funding" },
    ],
    redFlagsEn: [
      "Submitting a proposal without a supervisor pre-agreement.",
      "Proposing a topic outside the department's strengths.",
    ],
    redFlagsVi: [
      "Nộp proposal khi chưa có supervisor đồng ý sơ bộ.",
      "Đề tài lệch hoàn toàn thế mạnh của khoa.",
    ],
  },
  {
    id: "australia",
    nameEn: "Australia",
    nameVi: "Úc",
    flag: "🇦🇺",
    gradient: "from-amber-500 to-orange-600",
    strategyEn: "Strong Research Proposal + RTP scholarship (Group of Eight).",
    strategyVi: "Research Proposal mạnh + xin RTP (ưu tiên nhóm Go8).",
    tipsEn: [
      "RTP (Research Training Program) = full funding (stipend + fees + OSHC).",
      "Find a supervisor in your area BEFORE submitting application.",
      "Research Proposal: 5–10 pages, very specific methodology.",
      "Group of Eight (Go8): Melbourne, ANU, Sydney, UNSW, Monash, UQ, UWA, Adelaide.",
      "IELTS ≥6.5 overall, no band <6.0.",
    ],
    tipsVi: [
      "RTP (Research Training Program) = full funding (sinh hoạt phí + học phí + bảo hiểm OSHC).",
      "Tìm supervisor cùng hướng nghiên cứu TRƯỚC khi nộp hồ sơ.",
      "Research Proposal: 5–10 trang, methodology phải rất cụ thể.",
      "Group of Eight (Go8): Melbourne, ANU, Sydney, UNSW, Monash, UQ, UWA, Adelaide.",
      "IELTS ≥6.5 overall, không band nào <6.0.",
    ],
    fundingEn: "RTP (~A$32,192/yr 2024), University top-ups, Australia Awards.",
    fundingVi: "RTP (~A$32,192/năm 2024), top-up của trường, Australia Awards.",
    stipendUsdPerMonth: "$1,900 – $2,500",
    typicalDeadlineEn: "Apr–Oct depending on round.",
    typicalDeadlineVi: "Apr–Oct tuỳ đợt xét.",
    topUnis: ["U Melbourne", "ANU", "U Sydney", "UNSW", "Monash"],
    requirements: { ielts: "6.5 (no band <6.0)", toefl: "90+", gpa: "3.2 / 4.0", gre: "Not required", other: "5–10 page Research Proposal + supervisor agreement", otherVi: "Research Proposal 5–10 trang + supervisor đồng ý" },
    timeline: [
      { whenEn: "T-12 m", whenVi: "T-12 tháng", doEn: "Email supervisors, draft proposal", doVi: "Email supervisor, phác proposal" },
      { whenEn: "T-9 m", whenVi: "T-9 tháng", doEn: "Lock supervisor, polish proposal", doVi: "Chốt supervisor, hoàn thiện proposal" },
      { whenEn: "T-3 m", whenVi: "T-3 tháng", doEn: "Apply for RTP round", doVi: "Apply RTP đúng đợt" },
    ],
    redFlagsEn: [
      "Submitting proposal before supervisor agrees.",
      "Vague methodology section.",
    ],
    redFlagsVi: [
      "Nộp proposal khi supervisor chưa đồng ý.",
      "Phần methodology mơ hồ.",
    ],
  },
  {
    id: "japan",
    nameEn: "Japan (MEXT)",
    nameVi: "Nhật Bản (MEXT)",
    flag: "🇯🇵",
    gradient: "from-rose-400 to-pink-600",
    strategyEn: "MEXT (Embassy or University Recommendation) + Research Plan.",
    strategyVi: "MEXT (qua Đại sứ quán hoặc University Rec) + Research Plan.",
    tipsEn: [
      "Two MEXT tracks: Embassy Rec (Apr–Jun apply) and University Rec (varies).",
      "Letter of acceptance from a Japanese supervisor is the deciding factor.",
      "Research Plan: 2–3 pages, very feasible, includes monthly schedule.",
      "Japanese language not required for English programs, but bonus N3+.",
      "Stipend covers all living costs; tuition fully waived.",
    ],
    tipsVi: [
      "Hai luồng MEXT: Embassy Rec (apply Apr–Jun) và University Rec (tuỳ trường).",
      "Letter of Acceptance từ giáo sư Nhật là yếu tố quyết định.",
      "Research Plan: 2–3 trang, rất khả thi, có lịch nghiên cứu theo tháng.",
      "Không bắt buộc tiếng Nhật cho chương trình English, nhưng N3+ là điểm cộng lớn.",
      "Sinh hoạt phí đủ sống thoải mái; học phí miễn 100%.",
    ],
    fundingEn: "MEXT ¥145,000–¥148,000/month + return airfare + tuition waiver.",
    fundingVi: "MEXT ¥145,000–¥148,000/tháng + vé máy bay khứ hồi + miễn học phí.",
    stipendUsdPerMonth: "$950 – $1,000 (low CoL)",
    typicalDeadlineEn: "Embassy Rec: Apr–Jun. University Rec: Oct–Dec.",
    typicalDeadlineVi: "Embassy Rec: Apr–Jun. University Rec: Oct–Dec.",
    topUnis: ["U Tokyo", "Kyoto U", "Osaka U", "Tohoku U", "Tokyo Tech"],
    requirements: { ielts: "6.5+", toefl: "90+", gpa: "3.0 / 4.0", gre: "Not required", other: "Letter of acceptance from JP supervisor", otherVi: "Letter of Acceptance từ giáo sư Nhật" },
    timeline: [
      { whenEn: "T-15 m", whenVi: "T-15 tháng", doEn: "Email JP supervisors with research plan", doVi: "Email giáo sư Nhật kèm research plan" },
      { whenEn: "T-9 m", whenVi: "T-9 tháng", doEn: "Get Letter of Acceptance", doVi: "Xin Letter of Acceptance" },
      { whenEn: "T-3 m", whenVi: "T-3 tháng", doEn: "Apply via Embassy or University", doVi: "Apply qua Đại sứ quán hoặc trường" },
    ],
    redFlagsEn: [
      "Skipping supervisor contact and applying cold.",
      "Research plan too ambitious for 3 years.",
    ],
    redFlagsVi: [
      "Không liên hệ supervisor trước mà apply 'lạnh'.",
      "Research plan quá tham vọng cho 3 năm.",
    ],
  },
  {
    id: "korea",
    nameEn: "South Korea (GKS)",
    nameVi: "Hàn Quốc (GKS)",
    flag: "🇰🇷",
    gradient: "from-fuchsia-500 to-rose-500",
    strategyEn: "Global Korea Scholarship (GKS) + Korean language year.",
    strategyVi: "Global Korea Scholarship (GKS) + 1 năm tiếng Hàn.",
    tipsEn: [
      "GKS: 1 year Korean language + 3 years PhD, all paid.",
      "Two tracks: Embassy Track and University Track - apply only ONE.",
      "TOPIK Level 5+ removes the language year requirement.",
      "Self-Introduction + Study Plan are scored very strictly.",
      "Health check is real - chronic illness can disqualify.",
    ],
    tipsVi: [
      "GKS: 1 năm tiếng Hàn + 3 năm PhD, học bổng toàn phần.",
      "Hai luồng: Embassy Track và University Track - chỉ chọn MỘT.",
      "TOPIK Level 5+ được miễn năm học tiếng Hàn.",
      "Self-Introduction + Study Plan chấm rất gắt.",
      "Khám sức khoẻ là 'thật' - bệnh mãn tính có thể bị loại.",
    ],
    fundingEn: "₩1.35M/month + tuition + airfare + ₩2M settlement + medical.",
    fundingVi: "₩1.35 triệu/tháng + học phí + vé máy bay + ₩2 triệu định cư + bảo hiểm y tế.",
    stipendUsdPerMonth: "$1,000 – $1,100",
    typicalDeadlineEn: "Embassy: Feb. University: Mar.",
    typicalDeadlineVi: "Embassy: tháng 2. University: tháng 3.",
    topUnis: ["SNU", "KAIST", "Yonsei", "Korea U", "POSTECH"],
    requirements: { ielts: "5.5+ (or TOPIK 5)", toefl: "75+", gpa: "80/100", gre: "Not required", other: "Self-Intro + Study Plan + Health Check", otherVi: "Self-Intro + Study Plan + Khám sức khoẻ" },
    timeline: [
      { whenEn: "T-10 m", whenVi: "T-10 tháng", doEn: "Pick 3 universities + draft Study Plan", doVi: "Chọn 3 trường + viết Study Plan" },
      { whenEn: "T-6 m", whenVi: "T-6 tháng", doEn: "IELTS 5.5+ or TOPIK 5", doVi: "IELTS 5.5+ hoặc TOPIK 5" },
      { whenEn: "T-2 m", whenVi: "T-2 tháng", doEn: "Submit Embassy or University track", doVi: "Nộp Embassy hoặc University track" },
    ],
    redFlagsEn: [
      "Applying to both Embassy and University tracks (auto-reject).",
      "Generic Study Plan that lists too many topics.",
    ],
    redFlagsVi: [
      "Apply cả Embassy lẫn University track (bị loại tự động).",
      "Study Plan chung chung, liệt kê quá nhiều đề tài.",
    ],
  },
  {
    id: "finland",
    nameEn: "Finland",
    nameVi: "Phần Lan",
    flag: "🇫🇮",
    gradient: "from-cyan-500 to-blue-600",
    strategyEn: "Doctoral school admission + project-based funding.",
    strategyVi: "Vào doctoral school + funding theo project nghiên cứu.",
    tipsEn: [
      "PhD is fully tuition-free for all nationalities.",
      "Funding sources: doctoral school grants, Academy of Finland, foundations (KAUTE, KONE).",
      "Working language is English in STEM doctoral schools.",
      "Mentor recommends you to the doctoral school after lab fit.",
      "Strong industry ties - many PhDs co-funded by companies (Nokia, KONE, Wärtsilä).",
    ],
    tipsVi: [
      "PhD miễn 100% học phí cho mọi quốc tịch.",
      "Nguồn funding: doctoral school grant, Academy of Finland, các quỹ (KAUTE, KONE).",
      "Ngôn ngữ làm việc tại doctoral school STEM là tiếng Anh.",
      "Mentor giới thiệu em vào doctoral school sau khi 'fit' phòng lab.",
      "Liên kết doanh nghiệp mạnh - nhiều PhD đồng tài trợ bởi công ty (Nokia, KONE, Wärtsilä).",
    ],
    fundingEn: "€2,100–€2,800/month + free healthcare + heavy student discounts.",
    fundingVi: "€2,100–€2,800/tháng + y tế miễn phí + giảm giá sinh viên rất nhiều.",
    stipendUsdPerMonth: "$2,300 – $3,000",
    typicalDeadlineEn: "Rolling for projects; Academy of Finland calls in Sep–Oct.",
    typicalDeadlineVi: "Project liên tục; Academy of Finland gọi Sep–Oct.",
    topUnis: ["Aalto", "U Helsinki", "Tampere U", "U Oulu", "U Turku"],
    requirements: { ielts: "6.5+", toefl: "92+", gpa: "3.2 / 4.0", gre: "Not required", other: "Master's + lab fit interview", otherVi: "Bằng Thạc sĩ + phỏng vấn lab fit" },
    timeline: [
      { whenEn: "T-10 m", whenVi: "T-10 tháng", doEn: "Email research groups, refine CV", doVi: "Email nhóm nghiên cứu, chuẩn hoá CV" },
      { whenEn: "T-6 m", whenVi: "T-6 tháng", doEn: "Lab visit / interview", doVi: "Thăm lab / phỏng vấn" },
      { whenEn: "T-3 m", whenVi: "T-3 tháng", doEn: "Doctoral school formal application", doVi: "Hồ sơ chính thức vào doctoral school" },
    ],
    redFlagsEn: [
      "Applying with a research idea not aligned with the group.",
      "No clear funding plan when contacting supervisor.",
    ],
    redFlagsVi: [
      "Đề xuất ý tưởng không khớp hướng của nhóm.",
      "Không có phương án funding rõ ràng khi liên hệ supervisor.",
    ],
  },
  {
    id: "singapore",
    nameEn: "Singapore (A*STAR, NTU, NUS)",
    nameVi: "Singapore (A*STAR, NTU, NUS)",
    flag: "🇸🇬",
    gradient: "from-emerald-500 to-teal-600",
    strategyEn: "A*STAR SINGA + NTU/NUS PhD scholarships.",
    strategyVi: "A*STAR SINGA + học bổng PhD của NTU/NUS.",
    tipsEn: [
      "SINGA: full 4-year scholarship, ~S$2,500/month + bench fees + tuition.",
      "Apply directly via SINGA portal (Jan or Jul rounds).",
      "GRE optional but recommended for top labs.",
      "Singapore PhD is intense - expect 60h+ research weeks.",
      "English entirely - no local language needed.",
    ],
    tipsVi: [
      "SINGA: học bổng 4 năm, ~S$2,500/tháng + phí lab + học phí.",
      "Apply qua cổng SINGA (đợt Jan hoặc Jul).",
      "GRE không bắt buộc nhưng nên có cho lab top.",
      "PhD ở Singapore cường độ rất cao - 60h+/tuần là bình thường.",
      "Hoàn toàn bằng tiếng Anh - không cần ngôn ngữ địa phương.",
    ],
    fundingEn: "SINGA S$2,500/mo (yr1–2) → S$3,000/mo + S$1,000 settlement.",
    fundingVi: "SINGA S$2,500/tháng (năm 1–2) → S$3,000/tháng + S$1,000 hỗ trợ ban đầu.",
    stipendUsdPerMonth: "$1,850 – $2,250",
    typicalDeadlineEn: "Jan 1 & Jul 1 (SINGA rounds).",
    typicalDeadlineVi: "1/1 & 1/7 (đợt SINGA).",
    topUnis: ["NUS", "NTU", "A*STAR institutes", "SUTD", "SMU"],
    requirements: { ielts: "6.5+", toefl: "85+", gpa: "3.3 / 4.0 (First Class preferred)", gre: "Optional, 320+ helpful", other: "2 LoRs + Research Statement", otherVi: "2 thư giới thiệu + Research Statement" },
    timeline: [
      { whenEn: "T-12 m", whenVi: "T-12 tháng", doEn: "Shortlist 5 A*STAR institutes", doVi: "Lọc 5 viện A*STAR" },
      { whenEn: "T-6 m", whenVi: "T-6 tháng", doEn: "Email PIs, refine Research Statement", doVi: "Email PI, hoàn thiện Research Statement" },
      { whenEn: "T-2 m", whenVi: "T-2 tháng", doEn: "SINGA portal submission", doVi: "Nộp qua cổng SINGA" },
    ],
    redFlagsEn: [
      "Generic Research Statement not tailored to the lab.",
      "Underestimating workload culture.",
    ],
    redFlagsVi: [
      "Research Statement chung chung, không 'may đo' theo lab.",
      "Coi thường cường độ làm việc.",
    ],
  },
];
