/**
 * @file vffPlacement.ts
 * @description Persists a "Vietnamese for Foreigners" placement run into the
 *   shared `placement_test_results` table so teachers see it in the placement
 *   dashboard and can approve a class, exactly like every other subject.
 *   Guests keep their local VFF progress and simply skip the insert.
 *
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { supabase } from "@/integrations/supabase/client";
import { logStudentActivity } from "@/hooks/useActivityLogger";

export interface VffPlacementRun {
  /** Percentage of items answered correctly (0-100). */
  scorePct: number;
  /** Recommended CEFR level from the VFF bank. */
  level: "A1" | "A2" | "B1";
  correct: number;
  totalItems: number;
  /** "adaptive" or "standard" - stored for reference. */
  mode: "adaptive" | "standard";
  durationSeconds?: number;
}

/** Insert the run for signed-in students. Never throws - saving is best-effort. */
export const saveVffPlacementRun = async (run: VffPlacementRun): Promise<void> => {
  try {
    const { data: auth } = await supabase.auth.getUser();
    const user = auth.user;
    if (!user) return;

    const { data: prof } = await supabase
      .from("profiles").select("full_name").eq("id", user.id).maybeSingle();

    await supabase.from("placement_test_results").insert({
      user_id: user.id,
      student_name: prof?.full_name ?? user.email ?? "Student",
      listening_score: 0,
      reading_score: run.scorePct,
      writing_score: 0,
      speaking_score: 0,
      total_score: run.scorePct,
      cefr_band: run.level,
      subject: "vietnamese-vff",
      status: "pending",
      duration_seconds: run.durationSeconds ?? null,
      answers: {
        __subject: "vietnamese-vff",
        __placement: {
          recommended_class: `Vietnamese for Foreigners (${run.level})`,
          confidence: run.mode === "adaptive" ? "medium" : "low",
          highest_secure_band: run.level,
          weakest_areas: [],
          notes: [
            `${run.mode === "adaptive" ? "Adaptive" : "Standard"} VFF placement`,
            `${run.correct}/${run.totalItems} correct`,
          ],
        },
      } as never,
      essays: {} as never,
      audio_urls: {} as never,
    });

    logStudentActivity({
      activityType: "placement_test",
      activityId: "vietnamese-vff",
      score: run.scorePct,
      maxScore: 100,
      timeSpentSeconds: run.durationSeconds,
      
      metadata: { subject: "vietnamese-vff", level: run.level, mode: run.mode },
    });
  } catch {
    /* placement history is a bonus - never block the student's result screen */
  }
};
