/**
 * @file notebookShareService.ts
 * @description Sharing layer for student_notebooks. A note owner (typically a
 * teacher) picks recipients; each recipient sees the note read-only in their own
 * notebook, live-updated, with an option to save an editable copy.
 *
 * NOTE: shared notes are never written into the private notebook snapshot cache
 * (see notebookService.ts invariants) - they are always fetched fresh.
 *
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { supabase } from "@/integrations/supabase/client";

const db = supabase as any;

export interface DirectoryPerson {
  user_id: string;
  full_name: string | null;
  avatar_url: string | null;
}

export interface SharedNotebook {
  share_id: string;
  notebook_id: string;
  title: string;
  content: string;
  subject: string;
  updated_at: string;
  owner_id: string;
  owner_name: string;
  owner_avatar: string | null;
  shared_at: string;
  can_edit: boolean;
}

export interface ShareRecipient {
  share_id: string;
  recipient_id: string;
  recipient_name: string;
  recipient_avatar: string | null;
  can_edit: boolean;
}

/** People the current user can share with (same directory as Your Corner). */
export const fetchDirectory = async (): Promise<DirectoryPerson[]> => {
  const { data, error } = await db.rpc("get_your_corner_directory");
  if (error) return [];
  return (data || []) as DirectoryPerson[];
};

/** Share one note with many recipients. Returns an error message or null. */
export const shareNotebook = async (
  notebookId: string,
  recipientIds: string[],
  canEdit = false,
): Promise<string | null> => {
  if (!recipientIds.length) return "no_recipients";
  const { error } = await db.rpc("share_notebook", {
    _notebook_id: notebookId,
    _recipient_ids: recipientIds,
    _can_edit: canEdit,
  });
  return error ? error.message : null;
};

/** Owner switches a recipient between view-only and edit. */
export const setSharePermission = async (
  shareId: string,
  canEdit: boolean,
): Promise<string | null> => {
  const { error } = await db.rpc("set_notebook_share_permission", {
    _share_id: shareId,
    _can_edit: canEdit,
  });
  return error ? error.message : null;
};

/** Recipient with edit rights saves changes back to the shared note. */
export const updateSharedNotebook = async (
  notebookId: string,
  patch: { title?: string; content?: string },
): Promise<string | null> => {
  const { error } = await db
    .from("student_notebooks")
    .update({ ...patch, updated_at: new Date().toISOString() })
    .eq("id", notebookId);
  return error ? error.message : null;
};

/** Who a note is currently shared with (owner only). */
export const fetchShareRecipients = async (
  notebookId: string,
): Promise<ShareRecipient[]> => {
  const { data, error } = await db.rpc("list_notebook_share_recipients", {
    _notebook_id: notebookId,
  });
  if (error) return [];
  return (data || []) as ShareRecipient[];
};

/** Revoke a share (owner only). */
export const unshareNotebook = async (shareId: string): Promise<string | null> => {
  const { error } = await db.from("notebook_shares").delete().eq("id", shareId);
  return error ? error.message : null;
};

/** Notes other people shared with me. */
export const fetchSharedWithMe = async (): Promise<SharedNotebook[]> => {
  const { data, error } = await db.rpc("list_notebooks_shared_with_me");
  if (error) return [];
  return (data || []) as SharedNotebook[];
};

/** Recipient hides a shared note from their own list (does not delete it). */
export const hideSharedNotebook = async (shareId: string): Promise<string | null> => {
  const { error } = await db
    .from("notebook_shares")
    .update({ hidden_by_recipient: true })
    .eq("id", shareId);
  return error ? error.message : null;
};

/** Recipient saves an editable copy into their own notebook. */
export const saveSharedCopy = async (
  note: Pick<SharedNotebook, "title" | "content" | "subject" | "owner_name">,
): Promise<string | null> => {
  const { data: auth } = await supabase.auth.getUser();
  const uid = auth?.user?.id;
  if (!uid) return "not_authenticated";
  const { error } = await db.from("student_notebooks").insert({
    user_id: uid,
    title: `${note.title || "Ghi chú"} (từ ${note.owner_name})`,
    content: note.content || "",
    subject: note.subject || "general",
    is_public: false,
  });
  if (error) return error.message;
  window.dispatchEvent(new CustomEvent("notebook:updated"));
  return null;
};
