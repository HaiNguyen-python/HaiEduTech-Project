/**
 * @file mentorStories.ts
 * @description Static success stories of HaiEduTech alumni now studying abroad.
 *   Used by the Mentor Hub to inspire and guide future applicants.
 */

export interface MentorStory {
  id: string;
  name: string;
  avatar: string;        // emoji avatar
  university: string;
  country: string;
  flag: string;
  program: string;
  yearStart: number;
  fromVi: string;
  fromEn: string;
  achievementVi: string;
  achievementEn: string;
  quoteVi: string;
  quoteEn: string;
  tags: string[];
}

export const MENTOR_STORIES: MentorStory[] = [
  {
    id: "linh-aalto",
    name: "Linh N.",
    avatar: "👩‍🎓",
    university: "Aalto University",
    country: "Finland",
    flag: "🇫🇮",
    program: "MSc Data Science",
    yearStart: 2024,
    fromVi: "Hà Nội — Tốt nghiệp Bách Khoa GPA 3.6",
    fromEn: "Hanoi — Bach Khoa graduate GPA 3.6",
    achievementVi: "Học bổng EDUFI 100% học phí + €1500/tháng sinh hoạt phí.",
    achievementEn: "EDUFI Fellowship: 100% tuition + €1500/month stipend.",
    quoteVi: "Mẹo nhỏ: viết Motivation Letter gắn với SDG sẽ tăng 50% tỉ lệ shortlist.",
    quoteEn: "Tip: tying your Motivation Letter to SDGs boosts shortlist rate by 50%.",
    tags: ["EDUFI", "Data Science", "Finland"],
  },
  {
    id: "minh-tsinghua",
    name: "Minh T.",
    avatar: "👨‍💻",
    university: "Tsinghua University",
    country: "China",
    flag: "🇨🇳",
    program: "MSc Computer Science",
    yearStart: 2023,
    fromVi: "TP.HCM — UEH, HSK5, IELTS 7.0",
    fromEn: "Ho Chi Minh — UEH, HSK5, IELTS 7.0",
    achievementVi: "CSC Scholarship full ride + nghiên cứu AI tại Lab top 1 châu Á.",
    achievementEn: "CSC Scholarship full ride + AI research at Asia's #1 lab.",
    quoteVi: "HSK 5 không bắt buộc nhưng giúp hồ sơ nổi bật hẳn so với ứng viên 'English-only'.",
    quoteEn: "HSK 5 isn't required but makes you stand out from English-only candidates.",
    tags: ["CSC", "Tsinghua", "AI Research"],
  },
  {
    id: "huong-oxford",
    name: "Hương P.",
    avatar: "👩‍🏫",
    university: "University of Oxford",
    country: "United Kingdom",
    flag: "🇬🇧",
    program: "MPhil Education",
    yearStart: 2024,
    fromVi: "Đà Nẵng — Sư Phạm GPA 3.8, IELTS 8.0",
    fromEn: "Da Nang — Education major GPA 3.8, IELTS 8.0",
    achievementVi: "Chevening Scholar + Clarendon Fund — tổng giá trị £55,000/năm.",
    achievementEn: "Chevening Scholar + Clarendon Fund — total £55,000/year.",
    quoteVi: "Đầu tư 6 tháng cho 4 essays Chevening đáng giá hơn 6 năm tiết kiệm tiền.",
    quoteEn: "6 months on 4 Chevening essays is worth more than 6 years of saving.",
    tags: ["Chevening", "Oxford", "Education"],
  },
  {
    id: "duy-mit",
    name: "Duy V.",
    avatar: "👨‍🔬",
    university: "MIT",
    country: "United States",
    flag: "🇺🇸",
    program: "PhD Electrical Engineering",
    yearStart: 2023,
    fromVi: "Hà Nội — VinUni GPA 3.95, 2 paper IEEE",
    fromEn: "Hanoi — VinUni GPA 3.95, 2 IEEE papers",
    achievementVi: "Full PhD funding $52,000/năm + research assistantship.",
    achievementEn: "Full PhD funding $52,000/year + research assistantship.",
    quoteVi: "Cold email cho 30 giáo sư trước khi nộp — 5 người reply, 2 mời phỏng vấn.",
    quoteEn: "Cold-emailed 30 profs before applying — 5 replied, 2 interviewed me.",
    tags: ["MIT", "PhD", "EE"],
  },
  {
    id: "nga-helsinki",
    name: "Nga L.",
    avatar: "👩‍⚕️",
    university: "University of Helsinki",
    country: "Finland",
    flag: "🇫🇮",
    program: "MSc Public Health",
    yearStart: 2025,
    fromVi: "Cần Thơ — Y Dược, kinh nghiệm WHO 2 năm",
    fromEn: "Can Tho — Medical school, 2 yrs WHO experience",
    achievementVi: "Học bổng Helsinki 100% + công việc bán thời gian tại Helsinki Hospital.",
    achievementEn: "Helsinki 100% scholarship + part-time job at Helsinki Hospital.",
    quoteVi: "YKI A2 không bắt buộc cho Master, nhưng mở cửa job ngay tuần đầu.",
    quoteEn: "YKI A2 isn't required for Master's, but opens job doors in week 1.",
    tags: ["Public Health", "Helsinki", "EDUFI"],
  },
  {
    id: "langtech-helsinki-2026",
    name: "Mai A.",
    avatar: "👩‍💻",
    university: "University of Helsinki",
    country: "Finland",
    flag: "🇫🇮",
    program: "MA Language Technology",
    yearStart: 2026,
    fromVi: "Hà Nội — Cử nhân Ngôn ngữ học, IELTS 7.5, biết Python cơ bản",
    fromEn: "Hanoi — BA Linguistics, IELTS 7.5, basic Python",
    achievementVi: "Trúng tuyển MA Language Technology 2026 — chương trình NLP hàng đầu Bắc Âu, miễn 100% học phí EU/EEA-equivalent.",
    achievementEn: "Admitted to MA Language Technology 2026 — Nordic top NLP program, 100% tuition waiver track.",
    quoteVi: "Hồ sơ mạnh nhất là khi bạn ghép Linguistics + Code: portfolio GitHub 3 dự án NLP nhỏ giúp mình vượt qua các ứng viên CS thuần.",
    quoteEn: "The winning combo is Linguistics + Code: a GitHub portfolio of 3 small NLP projects beat pure-CS applicants.",
    tags: ["Helsinki", "NLP", "Language Tech", "2026"],
  },
  {
    id: "phuc-stanford",
    name: "Phúc K.",
    avatar: "👨‍🎓",
    university: "Stanford University",
    country: "United States",
    flag: "🇺🇸",
    program: "MS Computer Science",
    yearStart: 2024,
    fromVi: "TP.HCM — FPT Univ GPA 3.9, Google L4 intern",
    fromEn: "HCMC — FPT University GPA 3.9, Google L4 intern",
    achievementVi: "Knight-Hennessy Scholar — học bổng toàn phần 3 năm trị giá $200,000.",
    achievementEn: "Knight-Hennessy Scholar — full ride 3 years worth $200,000.",
    quoteVi: "Câu chuyện cá nhân (story arc) quan trọng hơn GPA hay GRE.",
    quoteEn: "Your story arc matters more than GPA or GRE scores.",
    tags: ["Stanford", "Knight-Hennessy", "CS"],
  },
];
