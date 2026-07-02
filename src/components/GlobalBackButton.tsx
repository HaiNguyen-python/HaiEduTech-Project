import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCallback } from "react";

/**
 * Global floating "Go back" button rendered once inside <BrowserRouter>.
 * Hidden on top-level entry routes where "back" is meaningless.
 */
const HIDDEN_ROUTES = new Set<string>([
  "/",
  "/home",
  "/welcome",
  "/login",
  "/signup",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/unsubscribe",
]);

const GlobalBackButton = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    // Prefer real browser history; fall back to /home for direct entries.
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/home");
    }
  }, [navigate]);

  const path = location.pathname.replace(/\/+$/, "") || "/";
  if (HIDDEN_ROUTES.has(path)) return null;

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Quay lại trang trước"
      className="fixed top-20 left-3 sm:left-4 z-40 inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/85 px-3 py-1.5 text-xs sm:text-sm font-semibold text-foreground shadow-sm backdrop-blur transition hover:bg-background hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
    >
      <ArrowLeft className="h-4 w-4" />
      <span>Quay lại</span>
    </button>
  );
};

export default GlobalBackButton;
