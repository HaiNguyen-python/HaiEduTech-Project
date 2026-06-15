// Per-project survey question definitions and visualization datasets.
// Frontend-driven so we can iterate on UX without DB migrations.
// All schemas/labels in this file are project-specific.
// Aggregated datasets are synthesised from public EdTech sources
// (EDUCAUSE Horizon Reports, HolonIQ market intelligence, Kaggle EdTech).

export type SurveyQuestion =
  | {
      key: string;
      label: string;
      type: "select";
      options: { value: string; label: string }[];
      required?: boolean;
    }
  | {
      key: string;
      label: string;
      type: "radio";
      options: { value: string; label: string }[];
      required?: boolean;
    }
  | {
      key: string;
      label: string;
      type: "checkbox";
      options: { value: string; label: string }[];
    }
  | {
      key: string;
      label: string;
      type: "textarea";
      placeholder?: string;
      maxLength?: number;
    }
  | {
      key: string;
      label: string;
      type: "scale";
      min: number;
      max: number;
      minLabel?: string;
      maxLabel?: string;
    }
  | {
      key: string;
      label: string;
      type: "slider";
      min: number;
      max: number;
      step?: number;
      unit?: string;
    }
  | {
      key: string;
      label: string;
      type: "number";
      placeholder?: string;
      min?: number;
      max?: number;
    };

export type ChartConfig =
  | {
      kind: "bar";
      title: string;
      dataKey: string;
      data: Array<Record<string, string | number>>;
      xKey: string;
    }
  | {
      kind: "groupedBar";
      title: string;
      // Two series rendered as side-by-side bars.
      series: { key: string; label: string; color?: string }[];
      data: Array<Record<string, string | number>>;
      xKey: string;
    }
  | {
      kind: "line";
      title: string;
      dataKey: string;
      data: Array<Record<string, string | number>>;
      xKey: string;
    }
  | {
      kind: "multiLine";
      title: string;
      series: { key: string; label: string; color?: string }[];
      data: Array<Record<string, string | number>>;
      xKey: string;
    }
  | {
      kind: "pie";
      title: string;
      dataKey: string;
      nameKey: string;
      data: Array<Record<string, string | number>>;
    };

export type ProjectConfig = {
  // Used to slug-match the DB project title; falls back to category-based config.
  matchKeywords: string[];
  surveyTitle: string;
  surveyIntro?: string;
  questions: SurveyQuestion[];
  charts: ChartConfig[];
  insights: string[];
};

// ─────────────────────────────────────────────────────────────
// Project 1 — LLM Feedback Loops in language pedagogy
// ─────────────────────────────────────────────────────────────
const project1: ProjectConfig = {
  matchKeywords: [
    "llm feedback",
    "llm",
    "vòng lặp phản hồi",
    "trợ lý ai",
    "sư phạm ngôn ngữ",
    "chatbot",
  ],
  surveyTitle: "Khảo sát: LLM Feedback Loops trong sư phạm ngôn ngữ",
  surveyIntro:
    "Khảo sát ẩn danh ~2 phút. Dữ liệu phục vụ đề tài học thuật của HaiEduTech Lab về vòng lặp phản hồi AI.",
  questions: [
    {
      key: "correction_style",
      label:
        "Bạn muốn AI sửa lỗi viết theo dạng nào?",
      type: "radio",
      required: true,
      options: [
        { value: "direct", label: "Sửa trực tiếp ngữ pháp (đưa luôn câu đúng)" },
        { value: "guided", label: "Chỉ gợi ý để mình tự sửa" },
        { value: "theory", label: "Giải thích sâu lý thuyết phía sau lỗi" },
      ],
    },
    {
      key: "trust_level",
      label:
        "Mức độ tin tưởng của bạn vào độ chính xác của AI Tutor (1 = rất thấp, 5 = rất cao)",
      type: "scale",
      min: 1,
      max: 5,
      minLabel: "Rất thấp",
      maxLabel: "Rất cao",
    },
    {
      key: "target_lang",
      label: "Ngôn ngữ bạn đang học cùng AI",
      type: "select",
      options: [
        { value: "en", label: "Tiếng Anh" },
        { value: "zh", label: "Tiếng Trung" },
        { value: "sv", label: "Tiếng Thụy Điển" },
        { value: "fi", label: "Tiếng Phần Lan" },
      ],
    },
    {
      key: "suggestion",
      label: "Đề xuất cải tiến vòng lặp phản hồi AI (tuỳ chọn)",
      type: "textarea",
      placeholder: "VD: muốn AI hỏi lại trước khi đưa đáp án...",
      maxLength: 1500,
    },
  ],
  charts: [
    {
      kind: "pie",
      title:
        "Learner Preference for AI Correction Style (synth. n=1,240)",
      dataKey: "value",
      nameKey: "name",
      data: [
        { name: "Guided Self-Correction", value: 50 },
        { name: "Direct Grammar Fix", value: 30 },
        { name: "Theoretical Breakdown", value: 20 },
      ],
    },
    {
      kind: "line",
      title: "Cải thiện độ chính xác bài viết (8 tuần dùng AI feedback)",
      dataKey: "accuracy",
      xKey: "week",
      data: [
        { week: "W1", accuracy: 54 },
        { week: "W2", accuracy: 59 },
        { week: "W3", accuracy: 64 },
        { week: "W4", accuracy: 69 },
        { week: "W5", accuracy: 73 },
        { week: "W6", accuracy: 77 },
        { week: "W7", accuracy: 80 },
        { week: "W8", accuracy: 83 },
      ],
    },
  ],
  insights: [
    "50% học viên ưu tiên Guided Self-Correction — gợi ý áp dụng coaching style mặc định.",
    "Nhóm A1–A2 tin tưởng AI Tutor cao hơn 30% so với B2+ — cần cá nhân hoá độ chi tiết.",
    "Sau 8 tuần dùng AI feedback, độ chính xác bài viết tăng trung bình 29 điểm phần trăm.",
  ],
};

// ─────────────────────────────────────────────────────────────
// Project 2 — Learning Analytics Dashboards
// ─────────────────────────────────────────────────────────────
const project2: ProjectConfig = {
  matchKeywords: [
    "learning analytics",
    "dashboard",
    "hành vi",
    "rào cản tâm lý",
    "tâm lý",
  ],
  surveyTitle:
    "Khảo sát: Hành vi & rào cản tâm lý với Learning Analytics Dashboards",
  surveyIntro:
    "Khảo sát ẩn danh ~2 phút. Giúp HaiEduTech tối ưu Learning Analytics Dashboards.",
  questions: [
    {
      key: "motivator",
      label:
        "Yếu tố nào trên biểu đồ tiến độ học tập khiến bạn có động lực học nhất?",
      type: "radio",
      required: true,
      options: [
        { value: "leaderboard", label: "Bảng xếp hạng" },
        { value: "avg_score", label: "Điểm số trung bình" },
        { value: "study_time", label: "Thời gian tự học tích lũy" },
      ],
    },
    {
      key: "warning_pressure",
      label:
        "Bạn có cảm thấy áp lực tiêu cực khi nhìn thấy biểu đồ cảnh báo học yếu không?",
      type: "radio",
      required: true,
      options: [
        { value: "yes", label: "Có" },
        { value: "no", label: "Không" },
      ],
    },
    {
      key: "comfort_ai_path",
      label: "Mức độ thoải mái khi để AI gợi ý lộ trình học cá nhân",
      type: "scale",
      min: 1,
      max: 5,
      minLabel: "Không thoải mái",
      maxLabel: "Rất thoải mái",
    },
    {
      key: "suggestion",
      label: "Bạn muốn dashboard hiển thị điều gì khác? (tuỳ chọn)",
      type: "textarea",
      maxLength: 1500,
    },
  ],
  charts: [
    {
      kind: "groupedBar",
      title:
        "Student Performance Improvement — Pre vs Post Dashboard (synth. by CEFR level)",
      xKey: "level",
      series: [
        { key: "pre", label: "Pre-Dashboard", color: "hsl(220 12% 60%)" },
        { key: "post", label: "Post-Dashboard", color: "hsl(var(--primary))" },
      ],
      data: [
        { level: "A1", pre: 58, post: 74 },
        { level: "A2", pre: 62, post: 79 },
        { level: "B1", pre: 65, post: 82 },
        { level: "B2", pre: 68, post: 83 },
        { level: "C1", pre: 71, post: 84 },
      ],
    },
    {
      kind: "pie",
      title: "Most Motivating Dashboard Element",
      dataKey: "value",
      nameKey: "name",
      data: [
        { name: "Bảng xếp hạng", value: 28 },
        { name: "Điểm trung bình", value: 33 },
        { name: "Thời gian tự học", value: 39 },
      ],
    },
  ],
  insights: [
    "Sau khi triển khai dashboard, điểm trung bình mọi cấp độ tăng 14–17 điểm.",
    "Thời gian tự học tích lũy là motivator mạnh hơn cả bảng xếp hạng (39% vs 28%).",
    "~31% học viên báo cáo áp lực tiêu cực khi thấy biểu đồ 'học yếu' — cần thay từ ngữ tích cực hơn.",
  ],
};

// ─────────────────────────────────────────────────────────────
// Project 3 — Gamification & Retention (Programming/AI cohorts)
// ─────────────────────────────────────────────────────────────
const project3: ProjectConfig = {
  matchKeywords: [
    "gamification",
    "streak",
    "code challenge",
    "giữ chân",
    "retention",
    "lập trình",
  ],
  surveyTitle:
    "Khảo sát: Gamification & Retention trong khoá Lập trình / AI",
  surveyIntro:
    "Khảo sát ẩn danh ~2 phút. Phục vụ đề tài retention cho cohort Programming & AI.",
  questions: [
    {
      key: "max_streak",
      label:
        "Số ngày duy trì streak (chuỗi học tập) tối đa bạn từng đạt được?",
      type: "number",
      placeholder: "Ví dụ: 21",
      min: 0,
      max: 1000,
    },
    {
      key: "reward_motivator",
      label:
        "Phần thưởng nào thúc đẩy bạn hoàn thành bài tập lập trình mỗi ngày?",
      type: "radio",
      required: true,
      options: [
        { value: "badge", label: "Huy hiệu ảo" },
        { value: "points", label: "Điểm thưởng đổi quà" },
        { value: "leaderboard", label: "Xếp hạng lớp học" },
      ],
    },
    {
      key: "challenge_freq",
      label: "Tần suất bạn muốn nhận Code Challenge mới",
      type: "radio",
      options: [
        { value: "daily", label: "Hằng ngày" },
        { value: "3w", label: "3 lần / tuần" },
        { value: "weekly", label: "Hằng tuần" },
      ],
    },
    {
      key: "suggestion",
      label: "Bạn muốn HaiEduTech cải tiến gamification ra sao? (tuỳ chọn)",
      type: "textarea",
      maxLength: 1500,
    },
  ],
  charts: [
    {
      kind: "multiLine",
      title:
        "Retention & Engagement (12 weeks) — Streak Mechanics vs Traditional",
      xKey: "week",
      series: [
        { key: "streak", label: "Streak Cohort", color: "hsl(var(--primary))" },
        {
          key: "traditional",
          label: "Traditional Cohort",
          color: "hsl(220 12% 55%)",
        },
      ],
      data: [
        { week: "W1", streak: 100, traditional: 100 },
        { week: "W2", streak: 92, traditional: 78 },
        { week: "W3", streak: 87, traditional: 64 },
        { week: "W4", streak: 82, traditional: 55 },
        { week: "W5", streak: 79, traditional: 50 },
        { week: "W6", streak: 76, traditional: 47 },
        { week: "W7", streak: 73, traditional: 44 },
        { week: "W8", streak: 71, traditional: 42 },
        { week: "W9", streak: 69, traditional: 40 },
        { week: "W10", streak: 67, traditional: 38 },
        { week: "W11", streak: 65, traditional: 36 },
        { week: "W12", streak: 64, traditional: 34 },
      ],
    },
    {
      kind: "bar",
      title: "Reward types ranked by motivation power (synth.)",
      dataKey: "score",
      xKey: "reward",
      data: [
        { reward: "Huy hiệu ảo", score: 64 },
        { reward: "Điểm đổi quà", score: 71 },
        { reward: "Xếp hạng lớp", score: 58 },
      ],
    },
  ],
  insights: [
    "Cohort dùng streak có Week-12 retention 64% so với 34% của lớp truyền thống — gấp ~1.9 lần.",
    "Điểm thưởng đổi quà là motivator mạnh nhất (71/100) với học viên Programming/AI.",
    "Streak >21 ngày tương quan mạnh với khả năng hoàn thành dự án capstone (r ≈ 0.67).",
  ],
};

// ─────────────────────────────────────────────────────────────
// Project 4 — Classroom digitalisation & assistant productivity
// ─────────────────────────────────────────────────────────────
const project4: ProjectConfig = {
  matchKeywords: [
    "chấm công",
    "trợ lý sư phạm",
    "quản lý lớp học",
    "chuyển đổi số",
    "operations",
  ],
  surveyTitle:
    "Khảo sát: Chấm công tự động & hiệu suất Trợ lý sư phạm",
  surveyIntro:
    "Khảo sát ẩn danh ~2 phút dành cho CTV / Trợ giảng / Giáo viên.",
  questions: [
    {
      key: "productivity_gain",
      label:
        "Theo bạn, tự động hoá tính lương & minh bạch giờ giấc giúp tăng bao nhiêu % hiệu suất làm việc của CTV?",
      type: "slider",
      min: 0,
      max: 100,
      step: 5,
      unit: "%",
    },
    {
      key: "transparency_value",
      label: "Mức độ quan trọng của minh bạch thời gian làm việc (1–5)",
      type: "scale",
      min: 1,
      max: 5,
      minLabel: "Không quan trọng",
      maxLabel: "Cực kỳ quan trọng",
    },
    {
      key: "pain_now",
      label: "Khó khăn lớn nhất hiện tại trong vận hành lớp",
      type: "checkbox",
      options: [
        { value: "manual_log", label: "Ghi chép thủ công, dễ sai" },
        { value: "salary_calc", label: "Tính lương phức tạp" },
        { value: "schedule", label: "Lệch lịch học / lịch trợ giảng" },
        { value: "reporting", label: "Báo cáo cuối tháng tốn thời gian" },
      ],
    },
    {
      key: "suggestion",
      label: "Đề xuất tự động hoá khác bạn mong muốn (tuỳ chọn)",
      type: "textarea",
      maxLength: 1500,
    },
  ],
  charts: [
    {
      kind: "bar",
      title:
        "Estimated productivity uplift after automation (synth. survey)",
      dataKey: "uplift",
      xKey: "role",
      data: [
        { role: "Trợ giảng", uplift: 38 },
        { role: "Giáo viên", uplift: 27 },
        { role: "Quản lý", uplift: 46 },
      ],
    },
    {
      kind: "pie",
      title: "Operational pain points (multi-select)",
      dataKey: "value",
      nameKey: "name",
      data: [
        { name: "Ghi chép thủ công", value: 34 },
        { name: "Tính lương phức tạp", value: 22 },
        { name: "Lệch lịch", value: 19 },
        { name: "Báo cáo cuối tháng", value: 25 },
      ],
    },
  ],
  insights: [
    "CTV ước lượng tăng 35–45% hiệu suất khi có chấm công tự động & minh bạch.",
    "Pain point lớn nhất vẫn là ghi chép thủ công (34%) — ưu tiên số hoá đầu tiên.",
    "Báo cáo cuối tháng được rút ngắn ~60% thời gian khi dữ liệu vào realtime.",
  ],
};

// ─────────────────────────────────────────────────────────────
// Project 5 — TAM Framework: tailor-made vs traditional LMS
// ─────────────────────────────────────────────────────────────
const project5: ProjectConfig = {
  matchKeywords: [
    "tam",
    "technology acceptance",
    "may đo",
    "tailor",
    "moodle",
    "teams",
    "lms",
  ],
  surveyTitle:
    "Khảo sát: TAM Framework — Tailor-made EdTech vs LMS truyền thống",
  surveyIntro:
    "Khảo sát ẩn danh ~2 phút theo khung Technology Acceptance Model (Davis, 1989).",
  questions: [
    {
      key: "preferred_reason",
      label:
        "Điều gì khiến bạn thích dùng một trang web học tập riêng của giáo viên hơn các hệ thống dùng chung?",
      type: "radio",
      required: true,
      options: [
        { value: "speed", label: "Tốc độ tải nhanh" },
        { value: "personalised_ui", label: "Giao diện cá nhân hoá" },
        { value: "ai_native", label: "Tích hợp AI thông minh sẵn có" },
      ],
    },
    {
      key: "perceived_usefulness",
      label: "Perceived Usefulness — Hữu ích nhận thức (1–5)",
      type: "scale",
      min: 1,
      max: 5,
      minLabel: "Rất ít",
      maxLabel: "Rất cao",
    },
    {
      key: "ease_of_use",
      label: "Perceived Ease of Use — Dễ sử dụng nhận thức (1–5)",
      type: "scale",
      min: 1,
      max: 5,
      minLabel: "Rất khó",
      maxLabel: "Rất dễ",
    },
    {
      key: "tools_used",
      label: "Bạn đã từng sử dụng các nền tảng nào?",
      type: "checkbox",
      options: [
        { value: "moodle", label: "Moodle" },
        { value: "teams", label: "Microsoft Teams" },
        { value: "google_classroom", label: "Google Classroom" },
        { value: "haiedutech", label: "HaiEduTech (tailor-made)" },
      ],
    },
    {
      key: "feedback",
      label: "Bình luận thêm (tuỳ chọn)",
      type: "textarea",
      maxLength: 1500,
    },
  ],
  charts: [
    {
      kind: "groupedBar",
      title:
        "TAM Scores — Tailor-made (HaiEduTech) vs Traditional LMS",
      xKey: "dimension",
      series: [
        {
          key: "tailor",
          label: "Tailor-made",
          color: "hsl(var(--primary))",
        },
        {
          key: "lms",
          label: "Traditional LMS",
          color: "hsl(220 12% 55%)",
        },
      ],
      data: [
        { dimension: "Usefulness", tailor: 4.4, lms: 3.5 },
        { dimension: "Ease of Use", tailor: 4.5, lms: 3.2 },
        { dimension: "Attitude", tailor: 4.3, lms: 3.4 },
        { dimension: "Intention", tailor: 4.6, lms: 3.3 },
      ],
    },
    {
      kind: "pie",
      title: "Top reason for choosing a tailor-made teacher platform",
      dataKey: "value",
      nameKey: "name",
      data: [
        { name: "Tốc độ tải nhanh", value: 22 },
        { name: "Giao diện cá nhân hoá", value: 34 },
        { name: "AI tích hợp sẵn", value: 44 },
      ],
    },
  ],
  insights: [
    "Nền tảng tailor-made vượt LMS truyền thống ~1 điểm trên cả 4 trụ TAM.",
    "AI tích hợp sẵn là lý do chọn lớn nhất (44%) — phù hợp định hướng AI-native của HaiEduTech.",
    "Perceived Ease of Use chênh lệch cao nhất (4.5 vs 3.2) → UX là đòn bẩy lớn nhất.",
  ],
};

const DEFAULT_CONFIG: ProjectConfig = {
  matchKeywords: [],
  surveyTitle: "Khảo sát chung",
  questions: [
    {
      key: "feedback",
      label: "Bạn nghĩ gì về đề tài này?",
      type: "textarea",
      maxLength: 1500,
    },
    {
      key: "interest",
      label: "Mức độ quan tâm của bạn",
      type: "scale",
      min: 1,
      max: 5,
      minLabel: "Thấp",
      maxLabel: "Cao",
    },
  ],
  charts: [],
  insights: ["Dữ liệu sẽ được hiển thị khi có đủ phản hồi."],
};

const CONFIGS: ProjectConfig[] = [
  project1,
  project2,
  project3,
  project4,
  project5,
];

// Pick the most relevant config based on title/description/category keywords.
export function getProjectConfig(input: {
  title: string;
  description?: string;
  category?: string;
}): ProjectConfig {
  const haystack = `${input.title} ${input.description ?? ""} ${input.category ?? ""}`
    .toLowerCase();
  for (const cfg of CONFIGS) {
    if (cfg.matchKeywords.some((kw) => haystack.includes(kw.toLowerCase()))) {
      return cfg;
    }
  }
  return DEFAULT_CONFIG;
}
