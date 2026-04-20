/**
 * @file badgeAwards.ts
 * @description Helper to award curriculum badges (e.g. Lead Engineer) when a learner
 *              finishes all lessons of a module. Stores a record in `player_badges`.
 * @author HaiEduTech
 */
import { supabase } from "@/integrations/supabase/client";

export interface BadgeDescriptor {
  badgeId: string;
  badgeName: string;
  badgeIcon: string;
}

const completedKey = (moduleId: string) => `haiedu_module_completed_${moduleId}`;

/**
 * Mark a lesson as completed locally and, when every lesson in the list is done,
 * award the badge in Supabase (idempotent — duplicates are ignored).
 */
export async function trackLessonCompletion(
  moduleId: string,
  lessonId: string,
  allLessonIds: string[],
  badge: BadgeDescriptor
): Promise<{ awarded: boolean }> {
  const storageKey = completedKey(moduleId);
  let completed: string[] = [];
  try {
    completed = JSON.parse(localStorage.getItem(storageKey) || "[]");
  } catch {
    completed = [];
  }
  if (!completed.includes(lessonId)) completed.push(lessonId);
  localStorage.setItem(storageKey, JSON.stringify(completed));

  const allDone = allLessonIds.every((id) => completed.includes(id));
  if (!allDone) return { awarded: false };

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { awarded: false };

  // Skip if already awarded
  const { data: existing } = await supabase
    .from("player_badges")
    .select("id")
    .eq("user_id", user.id)
    .eq("badge_id", badge.badgeId)
    .maybeSingle();

  if (existing) return { awarded: false };

  const { error } = await supabase.from("player_badges").insert({
    user_id: user.id,
    badge_id: badge.badgeId,
    badge_name: badge.badgeName,
    badge_icon: badge.badgeIcon,
  });

  return { awarded: !error };
}

export const LEAD_ENGINEER_BADGE: BadgeDescriptor = {
  badgeId: "lead-engineer",
  badgeName: "Lead Engineer",
  badgeIcon: "⚙️",
};
