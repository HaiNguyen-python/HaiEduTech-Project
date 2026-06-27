import { useEffect, useState } from "react";
import { ArrowUp, Rocket } from "lucide-react";

/**
 * Cute "Back to top" button used at the end of each programming section.
 * Renders inline at the bottom of a section AND a floating chip that
 * appears once the learner scrolls down a bit.
 */
const BackToTopButton = ({ label = "Về đầu trang", floating = true }: { label?: string; floating?: boolean }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!floating) return;
    const onScroll = () => setShow(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [floating]);

  const goTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      {/* Inline cute button - sits at end of section */}
      <div className="flex justify-center my-8">
        <button
          onClick={goTop}
          className="group relative inline-flex items-center gap-2 rounded-full px-6 py-3
                     bg-gradient-to-r from-sky-400 via-indigo-400 to-fuchsia-400
                     text-white font-semibold shadow-lg shadow-indigo-300/40
                     hover:shadow-xl hover:shadow-indigo-400/50 hover:-translate-y-1
                     transition-all duration-300 active:scale-95"
          aria-label={label}
        >
          <span className="text-xl group-hover:animate-bounce">🚀</span>
          <span>{label}</span>
          <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          <span className="absolute -top-2 -right-2 text-base group-hover:rotate-12 transition-transform">✨</span>
        </button>
      </div>

      {/* Floating chip - bottom right, appears on scroll */}
      {floating && show && (
        <button
          onClick={goTop}
          className="fixed bottom-24 right-4 md:right-6 z-40
                     w-12 h-12 rounded-full
                     bg-gradient-to-br from-pink-400 via-fuchsia-400 to-indigo-500
                     text-white shadow-xl shadow-fuchsia-400/40
                     hover:scale-110 active:scale-95 transition-transform
                     flex items-center justify-center group"
          aria-label={label}
          title={label}
        >
          <Rocket className="w-5 h-5 -rotate-45 group-hover:-translate-y-0.5 transition-transform" />
          <span className="absolute -top-1 -right-1 text-xs">⭐</span>
        </button>
      )}
    </>
  );
};

export default BackToTopButton;
