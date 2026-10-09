/**
 * @file rlEngine.ts
 * @description RL (Reinforcement Learning) Intervention Engine for HaiEduTech Platform.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 * @license Private / Proprietary - No unauthorized copying or distribution.
 */

export type LearningDomain = "english" | "chinese" | "programming";

export interface StudentState {
  userId: string;
  fullName: string;
  totalActivities: number;
  scoredActivities: number;
  interventionReasons: Array<"low-score" | "recent-low-score">;
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
    domain?: string | null;
  }>
): StudentState {
  const orderedActivities = [...activities].sort((a, b) => Date.parse(a.created_at) - Date.parse(b.created_at));
  const scoredActs = orderedActivities.filter(a =>
    Number.isFinite(a.score) && Number.isFinite(a.max_score) && a.score != null && a.max_score != null &&
    a.max_score > 0 && a.score >= 0 && a.score <= a.max_score && !(a.max_score === 1 && a.score === 0)
  );
  const skillMap: Record<string, { totalScore: number; count: number }> = {};
  const domainMap: Record<LearningDomain, { totalScore: number; count: number }> = {
    english: { totalScore: 0, count: 0 },
    chinese: { totalScore: 0, count: 0 },
    programming: { totalScore: 0, count: 0 },
  };

  // Process each activity to extract skill-level data.
  // Skip rows that have no real score (heartbeat / daily_login / vocab tracking
  // markers) so the average isn't dragged down to 0.
  for (const act of scoredActs) {
    if (act.score == null || act.max_score == null || (act.max_score ?? 0) <= 0) continue;
    // Skip "completion markers" (max=1, score=0) that some legacy modules log
    // when a lesson is opened without producing a real score — these would
    // otherwise drag avg toward 0.
    if (act.max_score === 1 && (act.score ?? 0) === 0) continue;
    const score = act.score;
    const maxScore = act.max_score;
    const normalized = (score / maxScore) * 10;
    const rawDomain = (act.domain as string) || "english";
    // Map unknown domains (e.g., "platform") to "english" to avoid undefined access
    const domain: LearningDomain = (rawDomain in domainMap ? rawDomain : "english") as LearningDomain;

    // Aggregate domain-level data
    domainMap[domain].totalScore += normalized;
    domainMap[domain].count++;

    // If metadata has category breakdown (e.g., THPT exams), use it
    if (act.metadata?.categoryStats) {
      const stats = act.metadata.categoryStats as Record<string, { correct: number; total: number }>;
      for (const [cat, data] of Object.entries(stats)) {
        if (!Number.isFinite(data.correct) || !Number.isFinite(data.total) || data.total <= 0 || data.correct < 0 || data.correct > data.total) continue;
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

  // Compare six attempts within the same activity/domain, not unrelated skills.
  const latest = scoredActs.at(-1);
  const recent = latest ? scoredActs.filter(a => a.activity_type === latest.activity_type && a.domain === latest.domain).slice(-6) : [];
  const average = (rows: typeof scoredActs) => rows.reduce((sum, a) => sum + ((a.score ?? 0) / (a.max_score ?? 1)) * 10, 0) / rows.length;
  let recentAverage = 0;
  let trend: "improving" | "declining" | "stable" = "stable";
  if (recent.length === 6) {
    const avgFirst = average(recent.slice(0, 3));
    recentAverage = average(recent.slice(3));
    if (recentAverage - avgFirst >= 1) trend = "improving";
    else if (avgFirst - recentAverage >= 1) trend = "declining";
  }

  const avgScore = scoredActs.length > 0
    ? scoredActs.reduce((s, a) => s + ((a.score ?? 0) / (a.max_score ?? 10)) * 10, 0) / scoredActs.length
    : 0;

  const interventionReasons: StudentState["interventionReasons"] = [];
  if (scoredActs.length >= 3 && avgScore < 5) interventionReasons.push("low-score");
  if (trend === "declining" && recentAverage < 5) interventionReasons.push("recent-low-score");
  return {
    userId,
    fullName,
    totalActivities: activities.length,
    scoredActivities: scoredActs.length,
    interventionReasons,
    avgScore: Math.round(avgScore * 10) / 10,
    recentTrend: trend,
    lastActive: orderedActivities.at(-1)?.created_at ?? "",
    skillBreakdown,
    weakestAreas,
    strongestAreas,
    domainBreakdown,
  };
}

export function needsStudentIntervention(state: StudentState): boolean {
  return state.interventionReasons.length > 0;
}

export function interventionReason(state: StudentState, isVi: boolean): string {
  return state.interventionReasons.map(reason => reason === "low-score"
    ? (isVi ? `TB dưới 50% (${state.scoredActivities} bài có điểm)` : `Average below 50% (${state.scoredActivities} scored attempts)`)
    : (isVi ? "3 bài gần nhất cùng kỹ năng dưới 50%, giảm ít nhất 1/10" : "Latest 3 same-skill attempts below 50%, drop of at least 1/10")
  ).join("; ");
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
  if (state.interventionReasons.includes("recent-low-score")) {
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
  if (state.interventionReasons.includes("low-score")) {
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
    if (strongest[1].avgScore - weakest[1].avgScore > 2) {
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
