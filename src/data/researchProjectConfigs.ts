// Per-project survey question definitions and visualization datasets.
// Frontend-driven so we can iterate on UX without DB migrations.
// All schemas/labels in this file are project-specific.

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
      kind: "line";
      title: string;
      dataKey: string;
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

// Config #1 — AI Chatbot pedagogy for language learning
const project1: ProjectConfig = {
  matchKeywords: ["chatbot", "ngoại ngữ", "english", "swedish", "chinese"],
  surveyTitle: "Khảo sát: AI Chatbot trong sửa lỗi ngoại ngữ",
  surveyIntro:
    "Khảo sát ẩn danh ~2 phút. Dữ liệu phục vụ đề tài học thuật HaiEduTech Lab.",
  questions: [
    {
      key: "trust_ai",
      label: "Bạn có tin tưởng hoàn toàn vào sửa lỗi ngữ pháp của AI không?",
      type: "radio",
      required: true,
      options: [
        { value: "fully", label: "Tin hoàn toàn" },
        { value: "mostly", label: "Tin phần lớn, vẫn kiểm tra lại" },
        { value: "rarely", label: "Hiếm khi tin" },
        { value: "never", label: "Không tin" },
      ],
    },
    {
      key: "explain_lang",
      label: "Bạn muốn AI giải thích lỗi bằng ngôn ngữ nào?",
      type: "radio",
      required: true,
      options: [
        { value: "vi", label: "Tiếng Việt" },
        { value: "target", label: "Tiếng Anh / Thuỵ Điển / Trung (ngôn ngữ đích)" },
        { value: "bilingual", label: "Song ngữ (cả Việt + ngôn ngữ đích)" },
      ],
    },
    {
      key: "level",
      label: "Cấp độ hiện tại của bạn",
      type: "select",
      options: [
        { value: "a1", label: "A1 — Mới bắt đầu" },
        { value: "a2", label: "A2 — Sơ cấp" },
        { value: "b1", label: "B1 — Trung cấp" },
        { value: "b2", label: "B2 — Trung cao" },
        { value: "c1", label: "C1+ — Cao cấp" },
      ],
    },
    {
      key: "useful_features",
      label: "Tính năng AI nào bạn thấy hữu ích nhất?",
      type: "checkbox",
      options: [
        { value: "grammar", label: "Sửa lỗi ngữ pháp" },
        { value: "pronunciation", label: "Sửa phát âm" },
        { value: "vocab_suggest", label: "Gợi ý từ vựng" },
        { value: "roleplay", label: "Đóng vai hội thoại" },
        { value: "writing_feedback", label: "Chấm bài viết chi tiết" },
      ],
    },
    {
      key: "satisfaction",
      label: "Mức độ hài lòng tổng thể với AI chatbot dạy ngoại ngữ",
      type: "scale",
      min: 1,
      max: 5,
      minLabel: "Rất kém",
      maxLabel: "Xuất sắc",
    },
    {
      key: "comment",
      label: "Đề xuất cải tiến của bạn (tuỳ chọn)",
      type: "textarea",
      placeholder: "VD: muốn AI giải thích từ vựng bằng cả ví dụ thực tế...",
      maxLength: 1500,
    },
  ],
  charts: [
    {
      kind: "bar",
      title: "Tỷ lệ chấp nhận sửa lỗi của AI theo cấp độ học viên (A1–B1)",
      dataKey: "acceptance",
      xKey: "level",
      data: [
        { level: "A1", acceptance: 86 },
        { level: "A2", acceptance: 78 },
        { level: "B1", acceptance: 64 },
        { level: "B2", acceptance: 52 },
        { level: "C1", acceptance: 41 },
      ],
    },
    {
      kind: "pie",
      title: "Ngôn ngữ giải thích được ưa thích",
      dataKey: "value",
      nameKey: "name",
      data: [
        { name: "Tiếng Việt", value: 48 },
        { name: "Ngôn ngữ đích", value: 21 },
        { name: "Song ngữ", value: 31 },
      ],
    },
    {
      kind: "line",
      title: "Cải thiện độ chính xác (8 tuần dùng AI feedback)",
      dataKey: "accuracy",
      xKey: "week",
      data: [
        { week: "W1", accuracy: 54 },
        { week: "W2", accuracy: 58 },
        { week: "W3", accuracy: 63 },
        { week: "W4", accuracy: 69 },
        { week: "W5", accuracy: 72 },
        { week: "W6", accuracy: 76 },
        { week: "W7", accuracy: 79 },
        { week: "W8", accuracy: 82 },
      ],
    },
  ],
  insights: [
    "Học viên A1–A2 chấp nhận sửa lỗi AI cao hơn 30% so với B2+ — gợi ý cá nhân hoá độ chi tiết theo cấp độ.",
    "Gần 80% người học muốn giải thích có yếu tố tiếng Việt (đơn ngữ hoặc song ngữ).",
    "Sau 8 tuần dùng AI feedback, độ chính xác bài viết tăng trung bình 28 điểm phần trăm.",
  ],
};

// Config #2 — Online learner behaviour with Data/AI tools
const project2: ProjectConfig = {
  matchKeywords: [
    "hành vi",
    "rào cản",
    "tâm lý",
    "data",
    "ai assistant",
    "trực tuyến",
  ],
  surveyTitle: "Khảo sát: Hành vi & rào cản tâm lý với công cụ Data/AI",
  surveyIntro:
    "Khảo sát ẩn danh ~2 phút. Giúp HaiEduTech tối ưu trải nghiệm Data/AI cho học viên.",
  questions: [
    {
      key: "barrier",
      label: "Rào cản lớn nhất khi bạn dùng công cụ AI để học là gì?",
      type: "radio",
      required: true,
      options: [
        { value: "trust", label: "Không tin vào độ chính xác" },
        { value: "complexity", label: "Giao diện phức tạp, khó dùng" },
        { value: "privacy", label: "Lo ngại quyền riêng tư dữ liệu" },
        { value: "motivation", label: "Thiếu động lực duy trì" },
        { value: "language", label: "Rào cản ngôn ngữ (AI nói tiếng Anh)" },
      ],
    },
    {
      key: "frequency",
      label: "Tần suất bạn dùng dashboard tiến độ học",
      type: "radio",
      required: true,
      options: [
        { value: "daily", label: "Hằng ngày" },
        { value: "weekly", label: "Vài lần / tuần" },
        { value: "monthly", label: "Vài lần / tháng" },
        { value: "rarely", label: "Hiếm khi" },
      ],
    },
    {
      key: "valued_metrics",
      label: "Chỉ số nào bạn quan tâm nhất trên dashboard?",
      type: "checkbox",
      options: [
        { value: "streak", label: "Streak ngày học liên tiếp" },
        { value: "accuracy", label: "Độ chính xác bài tập" },
        { value: "vocab", label: "Số từ đã thuộc" },
        { value: "time", label: "Tổng thời gian học" },
        { value: "rank", label: "Bảng xếp hạng" },
      ],
    },
    {
      key: "comfort",
      label: "Mức độ thoải mái khi để AI gợi ý lộ trình học cá nhân",
      type: "scale",
      min: 1,
      max: 5,
      minLabel: "Không thoải mái",
      maxLabel: "Rất thoải mái",
    },
    {
      key: "suggestion",
      label: "Bạn muốn HaiEduTech cải thiện trải nghiệm Data/AI như thế nào?",
      type: "textarea",
      maxLength: 1500,
    },
  ],
  charts: [
    {
      kind: "bar",
      title: "Rào cản tâm lý hàng đầu khi dùng AI để học",
      dataKey: "count",
      xKey: "barrier",
      data: [
        { barrier: "Niềm tin", count: 42 },
        { barrier: "Phức tạp", count: 31 },
        { barrier: "Quyền riêng tư", count: 24 },
        { barrier: "Động lực", count: 38 },
        { barrier: "Ngôn ngữ", count: 19 },
      ],
    },
    {
      kind: "pie",
      title: "Tần suất sử dụng dashboard",
      dataKey: "value",
      nameKey: "name",
      data: [
        { name: "Hằng ngày", value: 22 },
        { name: "Vài lần/tuần", value: 41 },
        { name: "Vài lần/tháng", value: 24 },
        { name: "Hiếm khi", value: 13 },
      ],
    },
    {
      kind: "line",
      title: "Mức độ tương tác với gợi ý AI (12 tuần)",
      dataKey: "engagement",
      xKey: "week",
      data: [
        { week: "W1", engagement: 35 },
        { week: "W2", engagement: 48 },
        { week: "W4", engagement: 56 },
        { week: "W6", engagement: 61 },
        { week: "W8", engagement: 67 },
        { week: "W10", engagement: 72 },
        { week: "W12", engagement: 76 },
      ],
    },
  ],
  insights: [
    "42% học viên có rào cản về 'niềm tin' với AI — cần minh bạch nguồn dữ liệu & giải thích lý do gợi ý.",
    "63% học viên dùng dashboard ít nhất vài lần/tuần — chứng minh giá trị duy trì động lực.",
    "Engagement với gợi ý AI tăng gấp đôi sau 12 tuần khi giao diện được Việt hoá đầy đủ.",
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

const CONFIGS: ProjectConfig[] = [project1, project2];

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
