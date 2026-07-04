/**
 * Shared helper: append a block to the user's "IELTS Cohesion Practice Task N" notebook.
 * Reused by all four Cohesion Lab sub-modes.
 */
import { supabase } from "@/integrations/supabase/client";

export const escapeCohesionHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function appendCohesionNotebook(
  block: string,
  taskType: 1 | 2,
  toastFns: {
    success: (msg: string) => void;
    error: (msg: string) => void;
    info: (msg: string) => void;
  }
): Promise<boolean> {
  try {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData?.user) {
      toastFns.info("Sign in to save to your notebook");
      return false;
    }
    const title = `IELTS Cohesion Practice Task ${taskType}`;
    const { data: rows, error: fetchErr } = await supabase
      .from("student_notebooks")
      .select("id, content")
      .eq("user_id", userData.user.id)
      .eq("title", title)
      .order("updated_at", { ascending: false })
      .limit(1);

    if (fetchErr) {
      toastFns.error(`Save failed: ${fetchErr.message}`);
      return false;
    }

    const existing = rows && rows.length > 0 ? rows[0] : null;
    const nowIso = new Date().toISOString();

    if (existing) {
      const { error } = await supabase
        .from("student_notebooks")
        .update({ content: `${existing.content || ""}<hr/>${block}`, updated_at: nowIso })
        .eq("id", existing.id)
        .eq("user_id", userData.user.id);
      if (error) {
        toastFns.error(`Save failed: ${error.message}`);
        return false;
      }
    } else {
      const { error } = await supabase.from("student_notebooks").insert({
        user_id: userData.user.id,
        title,
        subject: "ielts",
        content: block,
        is_public: false,
      });
      if (error) {
        toastFns.error(`Save failed: ${error.message}`);
        return false;
      }
    }

    window.dispatchEvent(new CustomEvent("notebook:updated"));
    toastFns.success("Saved to your Notebook");
    return true;
  } catch (e) {
    console.error("Cohesion notebook save error:", e);
    toastFns.error("Could not save to notebook");
    return false;
  }
}
