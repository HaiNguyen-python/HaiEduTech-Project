import { toast } from "sonner";

/**
 * Unified handler for AI edge-function responses.
 * Detects credit-exhausted / rate-limited / unavailable states and surfaces
 * a friendly toast to the user instead of failing silently.
 *
 * Returns true if the response was an error that was handled; false otherwise.
 */
export function handleAiError(
  err: unknown,
  opts: { context?: string; silent?: boolean } = {},
): { handled: boolean; kind: "credits" | "rate" | "unavailable" | "unknown"; message: string } {
  const ctx = opts.context ? ` (${opts.context})` : "";
  // Supabase functions.invoke error shape
  const anyErr = err as any;
  const status: number | undefined =
    anyErr?.status ?? anyErr?.context?.status ?? anyErr?.response?.status;
  const bodyText: string =
    (typeof anyErr?.message === "string" ? anyErr.message : "") +
    " " +
    (typeof anyErr?.error === "string" ? anyErr.error : "") +
    " " +
    (typeof anyErr?.context?.body === "string" ? anyErr.context.body : "");
  const lower = bodyText.toLowerCase();

  const isCredits =
    status === 402 ||
    lower.includes("credits exhausted") ||
    lower.includes("credits_exhausted") ||
    lower.includes("payment required");
  const isRate =
    status === 429 ||
    lower.includes("rate limit") ||
    lower.includes("rate_limited") ||
    lower.includes("too many request");
  const isUnavailable =
    status === 503 ||
    status === 504 ||
    lower.includes("unavailable") ||
    lower.includes("timed out");

  if (isCredits) {
    const message = `⚠️ Hệ thống AI tạm hết tài nguyên${ctx}. Vui lòng thử lại sau hoặc liên hệ thầy Hải.`;
    if (!opts.silent) toast.error(message, { duration: 5500 });
    return { handled: true, kind: "credits", message };
  }
  if (isRate) {
    const message = `Quá nhiều yêu cầu cùng lúc${ctx}. Vui lòng đợi vài giây rồi thử lại.`;
    if (!opts.silent) toast.warning(message, { duration: 4000 });
    return { handled: true, kind: "rate", message };
  }
  if (isUnavailable) {
    const message = `Dịch vụ AI đang chậm/không phản hồi${ctx}. Vui lòng thử lại sau ít phút.`;
    if (!opts.silent) toast.error(message, { duration: 4500 });
    return { handled: true, kind: "unavailable", message };
  }
  return {
    handled: false,
    kind: "unknown",
    message: anyErr?.message || "Đã có lỗi xảy ra",
  };
}

/**
 * Inspect a JSON payload returned from an edge function for AI-availability fields.
 * Some edge functions return { error, fallback } with HTTP 200 instead of throwing.
 */
export function checkAiPayload(
  data: any,
  opts: { context?: string; silent?: boolean } = {},
): boolean {
  if (!data) return false;
  const errStr = String(data.error ?? "").toLowerCase();
  if (
    data.fallback === true ||
    errStr.includes("credits_exhausted") ||
    errStr.includes("credits exhausted") ||
    errStr.includes("rate_limited") ||
    errStr.includes("ai_unavailable")
  ) {
    handleAiError({ status: 402, message: data.error || "" }, opts);
    return true;
  }
  return false;
}
