/**
 * @file AmbientOrbs.tsx
 * @description Fixed-position ambient gradient orbs that drift with CSS keyframes.
 * GPU-accelerated, no scroll listeners. Respects reduced-motion.
 */
const AmbientOrbs = () => {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden motion-reduce:hidden"
    >
      <div
        className="absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full blur-3xl opacity-40"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary) / 0.55), transparent 70%)",
          willChange: "transform",
          animation: "orb-drift-a 22s ease-in-out infinite",
        }}
      />
      <div
        className="absolute top-1/3 -right-40 h-[520px] w-[520px] rounded-full blur-3xl opacity-35"
        style={{
          background: "radial-gradient(circle, hsl(160 84% 45% / 0.5), transparent 70%)",
          willChange: "transform",
          animation: "orb-drift-b 28s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-[380px] w-[380px] rounded-full blur-3xl opacity-25"
        style={{
          background: "radial-gradient(circle, hsl(42 92% 60% / 0.45), transparent 70%)",
          willChange: "transform",
          animation: "orb-drift-c 32s ease-in-out infinite",
        }}
      />
      <style>{`
        @keyframes orb-drift-a {
          0%,100% { transform: translate3d(0,0,0) scale(1); }
          50% { transform: translate3d(60px,40px,0) scale(1.1); }
        }
        @keyframes orb-drift-b {
          0%,100% { transform: translate3d(0,0,0) scale(1); }
          50% { transform: translate3d(-80px,60px,0) scale(1.08); }
        }
        @keyframes orb-drift-c {
          0%,100% { transform: translate3d(0,0,0) scale(1); }
          50% { transform: translate3d(40px,-50px,0) scale(1.12); }
        }
      `}</style>
    </div>
  );
};

export default AmbientOrbs;
