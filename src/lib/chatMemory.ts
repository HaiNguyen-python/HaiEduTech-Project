/**
 * chatMemory - long-term notes the virtual Teacher Hai keeps about a student.
 *
 * The assistant may end an answer with hidden lines like
 * `[[REMEMBER: goal = IELTS 7.0 in June]]`. We strip those from the visible
 * reply and store them per signed-in student, then feed them back on the next
 * conversation so the twin picks up where it left off.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { supabase } from "@/integrations/supabase/client";

export type ChatMemoryRow = { id: string; key: string; value: string; updated_at: string };

const TOKEN_RE = /\[\[REMEMBER:\s*([^=\]]{1,60}?)\s*=\s*([^\]]{1,300}?)\s*\]\]/gi;
export const MEMORY_TOKEN_RE = /\[\[REMEMBER:[^\]]*\]\]/gi;

/** Pull memory items out of an assistant reply. */
export const extractMemories = (text: string): Array<{ key: string; value: string }> => {
  const out: Array<{ key: string; value: string }> = [];
  for (const match of text.matchAll(TOKEN_RE)) {
    const key = match[1].trim().toLowerCase().slice(0, 60);
    const value = match[2].trim().slice(0, 300);
    if (key && value && !out.some((m) => m.key === key)) out.push({ key, value });
  }
  return out.slice(0, 6);
};

/** Remove the hidden memory tokens before showing or saving the reply. */
export const stripMemoryTokens = (text: string): string =>
  text.replace(MEMORY_TOKEN_RE, "").replace(/\n{3,}/g, "\n\n").trim();

export const loadChatMemories = async (): Promise<ChatMemoryRow[]> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];
  const { data, error } = await supabase
    .from("chatbot_student_memory")
    .select("id, key, value, updated_at")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false })
    .limit(40);
  if (error) {
    console.warn("[chatMemory] load failed", error.message);
    return [];
  }
  return (data ?? []) as ChatMemoryRow[];
};

export const saveChatMemories = async (
  items: Array<{ key: string; value: string }>,
): Promise<boolean> => {
  if (items.length === 0) return false;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;
  const { error } = await supabase
    .from("chatbot_student_memory")
    .upsert(
      items.map((m) => ({ user_id: user.id, key: m.key, value: m.value, updated_at: new Date().toISOString() })),
      { onConflict: "user_id,key" },
    );
  if (error) {
    console.warn("[chatMemory] save failed", error.message);
    return false;
  }
  return true;
};

export const deleteChatMemory = async (id: string): Promise<boolean> => {
  const { error } = await supabase.from("chatbot_student_memory").delete().eq("id", id);
  if (error) {
    console.warn("[chatMemory] delete failed", error.message);
    return false;
  }
  return true;
};

export const clearChatMemories = async (): Promise<boolean> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;
  const { error } = await supabase.from("chatbot_student_memory").delete().eq("user_id", user.id);
  if (error) {
    console.warn("[chatMemory] clear failed", error.message);
    return false;
  }
  return true;
};

/** Format for the system context block sent to the chat function. */
export const formatMemoriesForContext = (rows: ChatMemoryRow[]): string =>
  rows.length === 0
    ? "  - (nothing remembered yet)"
    : rows.map((r) => `  - ${r.key}: ${r.value}`).join("\n");
