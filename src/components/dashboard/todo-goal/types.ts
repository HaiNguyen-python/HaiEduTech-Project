// Types for the study goal and to-do module.
export interface StudyGoal {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  category: string;
  target_date: string | null;
  target_metric: string | null;
  progress_pct: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface StudyTask {
  id: string;
  user_id: string;
  goal_id: string | null;
  title: string;
  notes: string | null;
  priority: "high" | "medium" | "low";
  difficulty: number;
  contribution_pct: number;
  due_date: string | null;
  completed_at: string | null;
  is_ai_suggested: boolean;
  ai_rationale: string | null;
  created_at: string;
  updated_at: string;
}

export const GOAL_CATEGORIES = [
  { value: "ielts", labelVi: "IELTS", labelEn: "IELTS" },
  { value: "yki", labelVi: "YKI (Finnish)", labelEn: "YKI (Finnish)" },
  { value: "hsk", labelVi: "HSK (Chinese)", labelEn: "HSK (Chinese)" },
  { value: "programming", labelVi: "Lập trình", labelEn: "Programming" },
  { value: "other", labelVi: "Khác", labelEn: "Other" },
];
