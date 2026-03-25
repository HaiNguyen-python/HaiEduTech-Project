// RL (Reinforcement Learning) Intervention Engine
// Analyzes student activity data and generates personalized recommendations

export interface StudentState {
  userId: string;
  fullName: string;
  totalActivities: number;
  avgScore: number;
  recentTrend: "improving" | "declining" | "stable";
  lastActive: string;
  skillBreakdown: Record<string, { score: number; count: number }>;
  weakestAreas: string[];
  strongestAreas: string[];
}

export interface RLRecommendation {
  action: string;
  actionVi: string;
  priority: "high" | "medium" | "low";
  details: string;
  detailsVi: string;
  category: string;
  resource?: string;
}

// Category label mapping for human-readable names
const CATEGORY_LABELS: Record<string, { en: string; vi: string }> = {
  "word-form": { en: "Word Form", vi: "Từ loại" },
  "connector": { en: "Connectors", vi: "Liên từ" },
  "preposition": { en: "Prepositions", vi: "Giới từ" },
  "collocation": { en: "Collocations", vi: "Cụm từ cố định" },
  "grammar": { en: "Grammar", vi: "Ngữ pháp" },
  "vocabulary": { en: "Vocabulary", vi: "Từ vựng" },
  "phrasal-verb": { en: "Phrasal Verbs", vi: "Cụm động từ" },
  "reading-detail": { en: "Reading Detail", vi: "Đọc chi tiết" },
  "reading-inference": { en: "Reading Inference", vi: "Suy luận" },
  "reading-summary": { en: "Reading Summary", vi: "Tóm tắt" },
  "reading-paraphrase": { en: "Paraphrase", vi: "Diễn đạt lại" },
  "ielts_writing": { en: "IELTS Writing", vi: "Viết IELTS" },
  "ielts_speaking": { en: "IELTS Speaking", vi: "Nói IELTS" },
  "python_challenge": { en: "Python", vi: "Python" },
};

// Compute student state from activity logs
export function computeStudentState(
  userId: string,
  fullName: string,
  activities: Array<{
    activity_type: string;
    score: number | null;
    max_score: number | null;
    metadata: any;
    created_at: string;
  }>
): StudentState {
  const skillMap: Record<string, { totalScore: number; count: number }> = {};

  // Process each activity to extract skill-level data
  for (const act of activities) {
    const score = act.score ?? 0;
    const maxScore = act.max_score ?? 10;
    const normalized = (score / maxScore) * 10;

    // If metadata has category breakdown (e.g., THPT exams), use it
    if (act.metadata?.categoryStats) {
      const stats = act.metadata.categoryStats as Record<string, { correct: number; total: number }>;
      for (const [cat, data] of Object.entries(stats)) {
        if (!skillMap[cat]) skillMap[cat] = { totalScore: 0, count: 0 };
        skillMap[cat].totalScore += (data.correct / data.total) * 10;
        skillMap[cat].count++;
      }
    } else {
      // Use activity type as the skill category
      const cat = act.activity_type;
      if (!skillMap[cat]) skillMap[cat] = { totalScore: 0, count: 0 };
      skillMap[cat].totalScore += normalized;
      skillMap[cat].count++;
    }
  }

  // Build skill breakdown
  const skillBreakdown: Record<string, { score: number; count: number }> = {};
  for (const [cat, data] of Object.entries(skillMap)) {
    skillBreakdown[cat] = {
      score: Math.round((data.totalScore / data.count) * 10) / 10,
      count: data.count,
    };
  }

  // Sort by score to find weakest/strongest
  const sorted = Object.entries(skillBreakdown).sort((a, b) => a[1].score - b[1].score);
  const weakestAreas = sorted.slice(0, 3).map(([k]) => k);
  const strongestAreas = sorted.slice(-3).reverse().map(([k]) => k);

  // Compute recent trend from last 5 activities
  const recent = activities.slice(-5);
  let trend: "improving" | "declining" | "stable" = "stable";
  if (recent.length >= 3) {
    const firstHalf = recent.slice(0, Math.floor(recent.length / 2));
    const secondHalf = recent.slice(Math.floor(recent.length / 2));
    const avgFirst = firstHalf.reduce((s, a) => s + ((a.score ?? 0) / (a.max_score ?? 10)) * 10, 0) / firstHalf.length;
    const avgSecond = secondHalf.reduce((s, a) => s + ((a.score ?? 0) / (a.max_score ?? 10)) * 10, 0) / secondHalf.length;
    if (avgSecond - avgFirst > 0.5) trend = "improving";
    else if (avgFirst - avgSecond > 0.5) trend = "declining";
  }

  const avgScore = activities.length > 0
    ? activities.reduce((s, a) => s + ((a.score ?? 0) / (a.max_score ?? 10)) * 10, 0) / activities.length
    : 0;

  return {
    userId,
    fullName,
    totalActivities: activities.length,
    avgScore: Math.round(avgScore * 10) / 10,
    recentTrend: trend,
    lastActive: activities.length > 0 ? activities[activities.length - 1].created_at : "",
    skillBreakdown,
    weakestAreas,
    strongestAreas,
  };
}

// Generate RL-based recommendations for a student
export function generateRecommendations(state: StudentState): RLRecommendation[] {
  const recommendations: RLRecommendation[] = [];

  // Rule 1: Address weakest areas with high priority
  for (const area of state.weakestAreas) {
    const skill = state.skillBreakdown[area];
    if (!skill || skill.score >= 7) continue;

    const label = CATEGORY_LABELS[area] || { en: area, vi: area };
    const severity = skill.score < 4 ? "high" : skill.score < 6 ? "medium" : "low";

    recommendations.push({
      action: `Assign focused practice on ${label.en}`,
      actionVi: `Giao bài tập tập trung về ${label.vi}`,
      priority: severity as "high" | "medium" | "low",
      details: `Student scores ${skill.score}/10 in ${label.en} (${skill.count} attempts). Recommend targeted exercises to improve.`,
      detailsVi: `Học sinh đạt ${skill.score}/10 ở ${label.vi} (${skill.count} lần thử). Cần giao bài tập chuyên sâu.`,
      category: area,
    });
  }

  // Rule 2: Declining trend warning
  if (state.recentTrend === "declining") {
    recommendations.push({
      action: "Schedule 1-on-1 review session",
      actionVi: "Lên lịch buổi ôn tập 1-1",
      priority: "high",
      details: `Student's recent scores are declining. Average: ${state.avgScore}/10. Consider a personalized review session.`,
      detailsVi: `Điểm số gần đây đang giảm. Trung bình: ${state.avgScore}/10. Cần buổi ôn tập cá nhân.`,
      category: "general",
    });
  }

  // Rule 3: Low activity warning
  if (state.totalActivities < 5) {
    recommendations.push({
      action: "Encourage more practice",
      actionVi: "Khuyến khích luyện tập thêm",
      priority: "medium",
      details: `Student has only ${state.totalActivities} activities. Encourage consistent daily practice.`,
      detailsVi: `Học sinh chỉ có ${state.totalActivities} hoạt động. Khuyến khích luyện tập đều đặn mỗi ngày.`,
      category: "engagement",
    });
  }

  // Rule 4: Overall low score
  if (state.avgScore < 5 && state.totalActivities >= 3) {
    recommendations.push({
      action: "Lower difficulty level",
      actionVi: "Giảm độ khó bài tập",
      priority: "high",
      details: `Overall average ${state.avgScore}/10 is below passing. Consider easier content to build confidence.`,
      detailsVi: `Trung bình tổng thể ${state.avgScore}/10 dưới mức đạt. Nên giảm độ khó để xây dựng sự tự tin.`,
      category: "difficulty",
    });
  }

  // Rule 5: High performer - challenge them
  if (state.avgScore >= 8.5 && state.totalActivities >= 5) {
    recommendations.push({
      action: "Increase challenge level",
      actionVi: "Tăng độ khó bài tập",
      priority: "low",
      details: `Excellent performer (${state.avgScore}/10). Push advanced content to maintain engagement.`,
      detailsVi: `Học sinh xuất sắc (${state.avgScore}/10). Đẩy nội dung nâng cao để duy trì hứng thú.`,
      category: "advancement",
    });
  }

  // Sort by priority
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  recommendations.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  return recommendations;
}

// Get category label
export function getCategoryLabel(cat: string, isVi: boolean): string {
  const label = CATEGORY_LABELS[cat];
  return label ? (isVi ? label.vi : label.en) : cat;
}
