import { useSessionTracker } from "@/hooks/useSessionTracker";

/**
 * Renders nothing - just enables session tracking globally.
 * Mounted once in App.tsx so the heartbeat runs everywhere.
 */
const SessionTracker = () => {
  useSessionTracker();
  return null;
};

export default SessionTracker;
