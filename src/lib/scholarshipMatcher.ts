/**
 * @file scholarshipMatcher.ts
 * @description Compute a 0-100 "Match Score" between a student profile and a
 *   scholarship listing. Pure functions, no side effects, fully unit-testable.
 */

import type { Scholarship } from "@/data/globalScholarshipData";

export interface StudentProfileLite {
  gpa?: number | null;
  ielts_score?: number | null;
  toefl_score?: number | null;
  sat_score?: number | null;
  field_of_study?: string | null;
  activities?: string | null;
  work_experience_years?: number | null;
  target_country?: string | null;
  target_level?: string | null;
}

export interface MatchResult {
  score: number; // 0-100
  band: "low" | "medium" | "high" | "elite";
  reasons: string[]; // What you already have
  improvements: string[]; // How to improve
}

const BAND = (score: number): MatchResult["band"] => {
  if (score >= 85) return "elite";
  if (score >= 70) return "high";
  if (score >= 50) return "medium";
  return "low";
};

/**
 * Heuristic match scoring across 5 weighted dimensions:
 *  - Country fit          (20%)
 *  - Level fit            (15%)
 *  - English proficiency  (25%)
 *  - Academic strength    (20%)
 *  - Profile depth        (20%)
 */
export function computeMatchScore(
  profile: StudentProfileLite,
  scholarship: Scholarship
): MatchResult {
  let score = 0;
  const reasons: string[] = [];
  const improvements: string[] = [];

  // --- 1. Country fit (20pts) ---
  if (profile.target_country && profile.target_country === scholarship.country) {
    score += 20;
    reasons.push(`Target country matches (${scholarship.country})`);
  } else if (profile.target_country) {
    improvements.push(
      `Update target country to "${scholarship.country}" if interested in this program`
    );
  } else {
    improvements.push("Set your target country in your profile");
  }

  // --- 2. Level fit (15pts) ---
  if (profile.target_level && scholarship.levels.includes(profile.target_level as any)) {
    score += 15;
    reasons.push(`Level matches (${profile.target_level})`);
  } else {
    improvements.push(
      `This scholarship covers ${scholarship.levels.join(" / ")} — set your target level accordingly`
    );
  }

  // --- 3. English proficiency (25pts) ---
  const requiresEnglish = scholarship.requirementsEn.some(r =>
    /IELTS|TOEFL|English/i.test(r)
  );
  if (requiresEnglish) {
    if (profile.ielts_score && profile.ielts_score >= 7.0) {
      score += 25;
      reasons.push(`Strong IELTS score (${profile.ielts_score})`);
    } else if (profile.ielts_score && profile.ielts_score >= 6.5) {
      score += 18;
      reasons.push(`Solid IELTS score (${profile.ielts_score})`);
      improvements.push("Push IELTS to 7.0+ for top-tier scholarships");
    } else if (profile.ielts_score && profile.ielts_score >= 6.0) {
      score += 10;
      reasons.push(`IELTS ${profile.ielts_score} meets baseline`);
      improvements.push("Aim for IELTS 6.5+ to be competitive");
    } else if (profile.toefl_score && profile.toefl_score >= 90) {
      score += 22;
      reasons.push(`TOEFL ${profile.toefl_score} is competitive`);
    } else {
      improvements.push("Take IELTS (target 6.5+) or TOEFL (target 90+)");
    }
  } else {
    // Scholarship is in non-English-speaking country — give partial credit if any score exists
    if (profile.ielts_score || profile.toefl_score) {
      score += 15;
      reasons.push("English certification on file");
    } else {
      score += 8;
    }
  }

  // --- 4. Academic strength (20pts) — GPA on 4.0 scale ---
  if (profile.gpa != null) {
    if (profile.gpa >= 3.7) {
      score += 20;
      reasons.push(`Excellent GPA (${profile.gpa.toFixed(2)})`);
    } else if (profile.gpa >= 3.3) {
      score += 14;
      reasons.push(`Strong GPA (${profile.gpa.toFixed(2)})`);
      improvements.push("Try to maintain GPA above 3.7 for top scholarships");
    } else if (profile.gpa >= 3.0) {
      score += 8;
      reasons.push(`GPA ${profile.gpa.toFixed(2)} meets minimum`);
      improvements.push("Boost GPA towards 3.5+ to be competitive");
    } else {
      improvements.push("Most full scholarships expect GPA ≥ 3.0 (US scale)");
    }
  } else {
    improvements.push("Add your GPA to your profile for an accurate score");
  }

  // --- 5. Profile depth (20pts) — activities, experience, narrative ---
  let depth = 0;
  const activitiesLen = (profile.activities || "").trim().length;
  if (activitiesLen >= 200) {
    depth += 12;
    reasons.push("Detailed activities & leadership profile");
  } else if (activitiesLen >= 50) {
    depth += 7;
    improvements.push("Expand your activities list with measurable achievements");
  } else {
    improvements.push("Document leadership, volunteering, and projects (200+ chars)");
  }
  if ((profile.work_experience_years || 0) >= 2) {
    depth += 8;
    reasons.push(`${profile.work_experience_years}+ years work experience`);
  } else if ((profile.work_experience_years || 0) >= 1) {
    depth += 4;
    improvements.push("Aim for 2+ years professional experience for Master/PhD awards");
  } else {
    improvements.push("Internships count — log any 1-2 years of relevant experience");
  }
  score += depth;

  // Clamp & finalize
  score = Math.max(0, Math.min(100, Math.round(score)));

  // Cap improvements list
  const trimmedImprovements = improvements.slice(0, 4);

  return {
    score,
    band: BAND(score),
    reasons: reasons.slice(0, 4),
    improvements: trimmedImprovements,
  };
}

export const BAND_COLOR: Record<MatchResult["band"], string> = {
  low: "text-rose-500 stroke-rose-500",
  medium: "text-amber-500 stroke-amber-500",
  high: "text-emerald-500 stroke-emerald-500",
  elite: "text-violet-500 stroke-violet-500",
};

export const BAND_LABEL: Record<MatchResult["band"], { en: string; vi: string }> = {
  low: { en: "Build foundation", vi: "Cần củng cố hồ sơ" },
  medium: { en: "Promising", vi: "Có tiềm năng" },
  high: { en: "Strong match", vi: "Phù hợp cao" },
  elite: { en: "Elite match", vi: "Hoàn toàn xứng tầm" },
};
