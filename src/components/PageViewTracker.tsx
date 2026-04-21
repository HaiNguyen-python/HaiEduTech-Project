import { usePageViewTracker } from "@/hooks/usePageViewTracker";

/**
 * Renders nothing — enables global page-view tracking via React Router location.
 * Must be mounted INSIDE <BrowserRouter>.
 */
const PageViewTracker = () => {
  usePageViewTracker();
  return null;
};

export default PageViewTracker;
