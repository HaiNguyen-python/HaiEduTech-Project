/**
 * @file aiQuota.ts
 * @description Free AI grading quota for non-Premium learners (3 full gradings per account).
 * Premium state is mirrored here by usePremium so non-hook call sites can check it.
 */
import { toast } from "sonner";

export const FREE_AI_GRADES = 3;
export const AI_QUOTA_EVENT = "haiedutech:ai-quota-changed";

let cache: { uid: string | null; isPremium: boolean; ready: boolean } = { uid: null, isPremium: false, ready: false };

export const setPremiumCache = (uid: string | null, isPremium: boolean) => {
  cache = { uid, isPremium, ready: true };
};

const keyFor = (uid: string | null) => `haiedu-ai-grades-${uid ?? "guest"}`;

export const getAiGradesUsed = (uid: string | null = cache.uid): number => {
  try {
    return Number(localStorage.getItem(keyFor(uid)) || 0) || 0;
  } catch {
    return 0;
  }
};

export const getAiGradesRemaining = () =>
  cache.isPremium ? Infinity : Math.max(0, FREE_AI_GRADES - getAiGradesUsed());

/**
 * Call right before starting a full AI grading. Returns false (and opens the
 * upgrade modal) once the free quota is used up.
 */
export const consumeAiGrade = (): boolean => {
  if (cache.isPremium) return true;
  const used = getAiGradesUsed();
  if (used >= FREE_AI_GRADES) {
    toast.error("Bạn đã dùng hết 3 lượt chấm AI miễn phí / You've used your 3 free AI gradings", {
      description: "Nâng cấp Premium (29 EUR/năm) để chấm AI không giới hạn. Upgrade for unlimited AI grading.",
    });
    window.dispatchEvent(new Event("haiedutech:open-upgrade"));
    return false;
  }
  try {
    localStorage.setItem(keyFor(cache.uid), String(used + 1));
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new Event(AI_QUOTA_EVENT));
  const left = FREE_AI_GRADES - used - 1;
  toast.message(`Lượt chấm AI miễn phí còn lại: ${left}/${FREE_AI_GRADES} · Free AI gradings left: ${left}`);
  return true;
};
