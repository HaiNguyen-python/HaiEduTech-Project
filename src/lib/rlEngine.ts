// RL (Reinforcement Learning) Intervention Engine
// Analyzes student activity data and generates personalized recommendations

export type LearningDomain = "english" | "chinese" | "programming";

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
  domainBreakdown: Record<LearningDomain, { count: number; avgScore: number }>;
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
  "conv_english": { en: "Conversational English", vi: "Giao tiếp tiếng Anh" },
  "conv_chinese": { en: "Conversational Chinese", vi: "Giao tiếp tiếng Hoa" },
  "thpt_exam": { en: "THPT Exam", vi: "Thi THPT" },
  "sql_exercise": { en: "SQL", vi: "SQL" },
  "coding_quiz": { en: "Coding Quiz", vi: "Quiz lập trình" },
};

// Domain labels
export const DOMAIN_LABELS: Record<LearningDomain, { en: string; vi: string; color: string; icon: string }> = {
  english: { en: "English", vi: "Tiếng Anh", color: "hsl(217, 91%, 60%)", icon: "🇬🇧" },
  chinese: { en: "Chinese", vi: "Tiếng Hoa", color: "hsl(0, 84%, 60%)", icon: "🇨🇳" },
  programming: { en: "Programming", vi: "Lập trình", color: "hsl(142, 76%, 36%)", icon: "💻" },
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
    domain?: string;
  }>
): StudentState {
  const skillMap: Record<string, { totalScore: number; count: number }> = {};
  const domainMap: Record<LearningDomain, { totalScore: number; count: number }> = {
    english: { totalScore: 0, count: 0 },
    chinese: { totalScore: 0, count: 0 },
    programming: { totalScore: 0, count: 0 },
  };

  // Process each activity to extract skill-level data
  for (const act of activities) {
    const score = act.score ?? 0;
    const maxScore = act.max_score ?? 10;
    const normalized = (score / maxScore) * 10;
    const domain = (act.domain as LearningDomain) || "english";

    // Aggregate domain-level data
    domainMap[domain].totalScore += normalized;
    domainMap[domain].count++;

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

  // Build domain breakdown
  const domainBreakdown: Record<LearningDomain, { count: number; avgScore: number }> = {
    english: { count: domainMap.english.count, avgScore: domainMap.english.count > 0 ? Math.round((domainMap.english.totalScore / domainMap.english.count) * 10) / 10 : 0 },
    chinese: { count: domainMap.chinese.count, avgScore: domainMap.chinese.count > 0 ? Math.round((domainMap.chinese.totalScore / domainMap.chinese.count) * 10) / 10 : 0 },
    programming: { count: domainMap.programming.count, avgScore: domainMap.programming.count > 0 ? Math.round((domainMap.programming.totalScore / domainMap.programming.count) * 10) / 10 : 0 },
  };

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
    domainBreakdown,
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

  // Rule 6: Cross-domain imbalance detection
  const domainEntries = Object.entries(state.domainBreakdown).filter(([, d]) => d.count > 0);
  if (domainEntries.length >= 2) {
    const sorted = domainEntries.sort((a, b) => a[1].avgScore - b[1].avgScore);
    const weakest = sorted[0];
    const strongest = sorted[sorted.length - 1];
    if (strongest[1].avgScore - weakest[0 as any][1].avgScore > 2) {
      const wLabel = DOMAIN_LABELS[weakest[0] as LearningDomain];
      const sLabel = DOMAIN_LABELS[strongest[0] as LearningDomain];
      recommendations.push({
        action: `Rebalance: more ${wLabel.en}, less ${sLabel.en}`,
        actionVi: `Cân bằng: tăng ${wLabel.vi}, giảm ${sLabel.vi}`,
        priority: "medium",
        details: `${sLabel.en} avg ${strongest[1].avgScore}/10 vs ${wLabel.en} avg ${weakest[1].avgScore}/10. Shift focus to weaker domain.`,
        detailsVi: `${sLabel.vi} TB ${strongest[1].avgScore}/10 vs ${wLabel.vi} TB ${weakest[1].avgScore}/10. Cần tập trung vào mảng yếu hơn.`,
        category: "cross-domain",
      });
    }
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
