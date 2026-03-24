/**
 * Structured data for the Home Page:
 * - Upcoming courses (tabbed by field)
 * - Learning roadmaps (step-by-step paths)
 * - Success metrics
 */

// ─── Upcoming Courses ────────────────────────────────────────────────────────

export interface UpcomingCourse {
  id: string;
  name: string;
  nameEn: string;
  status: "ongoing" | "upcoming";
  startDate?: string; // only for "upcoming"
  schedule: string;
  scheduleEn: string;
  level: string;
  levelEn: string;
}

export const upcomingCourses: Record<string, UpcomingCourse[]> = {
  english: [
    {
      id: "ielts-mastery",
      name: "IELTS Mastery 7.5",
      nameEn: "IELTS Mastery 7.5",
      status: "ongoing",
      schedule: "T2 - T4 - T6, 19:30",
      scheduleEn: "Mon - Wed - Fri, 19:30",
      level: "Trung cấp - Nâng cao",
      levelEn: "Intermediate – Advanced",
    },
    {
      id: "toeic-700",
      name: "TOEIC 700+",
      nameEn: "TOEIC 700+",
      status: "ongoing",
      schedule: "T3 - T5, 18:00",
      scheduleEn: "Tue - Thu, 18:00",
      level: "Sơ cấp - Trung cấp",
      levelEn: "Elementary – Intermediate",
    },
    {
      id: "cambridge-starters",
      name: "Cambridge Starters & Movers",
      nameEn: "Cambridge Starters & Movers",
      status: "upcoming",
      startDate: "2026-05-10",
      schedule: "T7 - CN, 09:00",
      scheduleEn: "Sat - Sun, 09:00",
      level: "Thiếu nhi",
      levelEn: "Young Learners",
    },
    {
      id: "ielts-foundation",
      name: "IELTS Foundation 5.5",
      nameEn: "IELTS Foundation 5.5",
      status: "upcoming",
      startDate: "2026-06-01",
      schedule: "T2 - T4 - T6, 17:30",
      scheduleEn: "Mon - Wed - Fri, 17:30",
      level: "Sơ cấp",
      levelEn: "Elementary",
    },
    {
      id: "toeic-500",
      name: "TOEIC 500+ Nền tảng",
      nameEn: "TOEIC 500+ Foundation",
      status: "ongoing",
      schedule: "T7 - CN, 14:00",
      scheduleEn: "Sat - Sun, 14:00",
      level: "Sơ cấp",
      levelEn: "Elementary",
    },
    {
      id: "english-conv",
      name: "Tiếng Anh Giao tiếp",
      nameEn: "Conversational English",
      status: "ongoing",
      schedule: "T2 - T4, 18:00",
      scheduleEn: "Mon - Wed, 18:00",
      level: "Mọi trình độ",
      levelEn: "All Levels",
    },
  ],
  chinese: [
    {
      id: "hsk3-4",
      name: "HSK 3-4 Fast-track",
      nameEn: "HSK 3-4 Fast-track",
      status: "ongoing",
      schedule: "T3 - T5 - T7, 19:00",
      scheduleEn: "Tue - Thu - Sat, 19:00",
      level: "Trung cấp",
      levelEn: "Intermediate",
    },
    {
      id: "chinese-conv",
      name: "Tiếng Trung Giao tiếp",
      nameEn: "Conversational Chinese",
      status: "ongoing",
      schedule: "T2 - T4, 18:30",
      scheduleEn: "Mon - Wed, 18:30",
      level: "Sơ cấp",
      levelEn: "Beginner",
    },
    {
      id: "hsk1-2",
      name: "HSK 1-2 Nhập môn",
      nameEn: "HSK 1-2 Starter",
      status: "upcoming",
      startDate: "2026-05-15",
      schedule: "T7 - CN, 14:00",
      scheduleEn: "Sat - Sun, 14:00",
      level: "Sơ cấp",
      levelEn: "Beginner",
    },
    {
      id: "hsk5-6",
      name: "HSK 5-6 & Business Chinese",
      nameEn: "HSK 5-6 & Business Chinese",
      status: "upcoming",
      startDate: "2026-07-01",
      schedule: "T2 - T4 - T6, 20:00",
      scheduleEn: "Mon - Wed - Fri, 20:00",
      level: "Nâng cao",
      levelEn: "Advanced",
    },
  ],
  programming: [
    {
      id: "python-basics",
      name: "Python Fundamentals",
      nameEn: "Python Fundamentals",
      status: "ongoing",
      schedule: "T3 - T5, 20:00",
      scheduleEn: "Tue - Thu, 20:00",
      level: "Beginner",
      levelEn: "Beginner",
    },
    {
      id: "sql-pipeline",
      name: "SQL & Data Pipeline",
      nameEn: "SQL & Data Pipeline",
      status: "ongoing",
      schedule: "T2 - T4 - T6, 20:30",
      scheduleEn: "Mon - Wed - Fri, 20:30",
      level: "Intermediate",
      levelEn: "Intermediate",
    },
    {
      id: "ai-ml-intro",
      name: "AI & Machine Learning Intro",
      nameEn: "AI & Machine Learning Intro",
      status: "upcoming",
      startDate: "2026-06-15",
      schedule: "T7, 10:00",
      scheduleEn: "Sat, 10:00",
      level: "Intermediate",
      levelEn: "Intermediate",
    },
    {
      id: "data-eng-adv",
      name: "Data Engineering Nâng cao",
      nameEn: "Advanced Data Engineering",
      status: "upcoming",
      startDate: "2026-07-01",
      schedule: "T2 - T4 - T6, 19:00",
      scheduleEn: "Mon - Wed - Fri, 19:00",
      level: "Nâng cao",
      levelEn: "Advanced",
    },
  ],
};

// ─── Learning Roadmaps ───────────────────────────────────────────────────────

export interface RoadmapStep {
  step: number;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  icon: string; // Lucide icon name
  color: string; // Tailwind color class
}

export interface LearningRoadmap {
  id: string;
  title: string;
  titleEn: string;
  steps: RoadmapStep[];
}

export const learningRoadmaps: LearningRoadmap[] = [
  {
    id: "english",
    title: "Lộ trình Tiếng Anh",
    titleEn: "English Roadmap",
    steps: [
      {
        step: 1,
        title: "Cambridge Starters / Movers",
        titleEn: "Cambridge Starters / Movers",
        description: "Xây dựng nền tảng vững chắc cho trẻ",
        descriptionEn: "Build a solid foundation for young learners",
        icon: "Baby",
        color: "from-sky-400 to-sky-500",
      },
      {
        step: 2,
        title: "PET / KET",
        titleEn: "PET / KET",
        description: "Chứng chỉ Cambridge quốc tế",
        descriptionEn: "International Cambridge certifications",
        icon: "Award",
        color: "from-blue-400 to-blue-500",
      },
      {
        step: 3,
        title: "IELTS Foundation",
        titleEn: "IELTS Foundation",
        description: "Nắm vững cấu trúc và kỹ năng IELTS",
        descriptionEn: "Master IELTS structure and core skills",
        icon: "BookOpen",
        color: "from-indigo-400 to-indigo-500",
      },
      {
        step: 4,
        title: "IELTS Intensive 7.5+",
        titleEn: "IELTS Intensive 7.5+",
        description: "Luyện thi chuyên sâu, mục tiêu band 7.5+",
        descriptionEn: "Intensive prep targeting band 7.5+",
        icon: "Target",
        color: "from-primary to-emerald-500",
      },
    ],
  },
  {
    id: "chinese",
    title: "Lộ trình Tiếng Trung",
    titleEn: "Chinese Roadmap",
    steps: [
      {
        step: 1,
        title: "HSK 1-2 (Cơ bản)",
        titleEn: "HSK 1-2 (Basic)",
        description: "Pinyin, bộ thủ và từ vựng cơ bản",
        descriptionEn: "Pinyin, radicals and basic vocabulary",
        icon: "Languages",
        color: "from-red-400 to-red-500",
      },
      {
        step: 2,
        title: "HSK 3-4 (Trung cấp)",
        titleEn: "HSK 3-4 (Intermediate)",
        description: "Ngữ pháp nâng cao và giao tiếp tự tin",
        descriptionEn: "Advanced grammar and confident communication",
        icon: "MessageSquare",
        color: "from-orange-400 to-orange-500",
      },
      {
        step: 3,
        title: "HSK 5-6 & Business",
        titleEn: "HSK 5-6 & Business Chinese",
        description: "Thành thạo và ứng dụng thương mại",
        descriptionEn: "Fluency and business application",
        icon: "Briefcase",
        color: "from-amber-500 to-yellow-500",
      },
    ],
  },
  {
    id: "programming",
    title: "Lộ trình Lập trình (Data Engineering)",
    titleEn: "Programming Roadmap (Data Engineering)",
    steps: [
      {
        step: 1,
        title: "Coding Logic",
        titleEn: "Coding Logic",
        description: "Python cơ bản, biến, vòng lặp, hàm",
        descriptionEn: "Python basics, variables, loops, functions",
        icon: "Code2",
        color: "from-emerald-400 to-emerald-500",
      },
      {
        step: 2,
        title: "Data Mastery",
        titleEn: "Data Mastery",
        description: "SQL, Database Schema, Relational Algebra",
        descriptionEn: "SQL, Database Schema, Relational Algebra",
        icon: "Database",
        color: "from-teal-400 to-teal-500",
      },
      {
        step: 3,
        title: "Engineering",
        titleEn: "Engineering",
        description: "ETL Pipelines, Data Warehousing, Airflow",
        descriptionEn: "ETL Pipelines, Data Warehousing, Airflow",
        icon: "Workflow",
        color: "from-blue-500 to-indigo-500",
      },
      {
        step: 4,
        title: "AI / ML",
        titleEn: "AI / ML",
        description: "Supervised Learning, Model Deployment, Neural Networks",
        descriptionEn: "Supervised Learning, Model Deployment, Neural Networks",
        icon: "Brain",
        color: "from-violet-500 to-purple-500",
      },
    ],
  },
];

// ─── Success Metrics ─────────────────────────────────────────────────────────

export interface SuccessMetric {
  value: string;
  valueEn: string;
  label: string;
  labelEn: string;
  icon: string;
}

export const successMetrics: SuccessMetric[] = [
  {
    value: "95%",
    valueEn: "95%",
    label: "Tỷ lệ đạt mục tiêu",
    labelEn: "Goal Achievement Rate",
    icon: "TrendingUp",
  },
  {
    value: "200+",
    valueEn: "200+",
    label: "Bài viết được chấm mỗi ngày",
    labelEn: "AI-Graded Essays Daily",
    icon: "FileCheck",
  },
  {
    value: "1:1",
    valueEn: "1:1",
    label: "Báo cáo cá nhân hóa",
    labelEn: "Personalized Data Reports",
    icon: "BarChart3",
  },
  {
    value: "500+",
    valueEn: "500+",
    label: "Học viên đang theo học",
    labelEn: "Active Students",
    icon: "Users",
  },
];
