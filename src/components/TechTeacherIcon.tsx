import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";

/**
 * Unified "Tech-Teacher" brand icon for HaiEduTech.
 * A stylized teacher figure whose head is a laptop screen
 * displaying blinking syntax-highlighted code lines.
 */

const codeSnippets = [
  ["<HaiEdu />", "data.fit()", "score=8.5"],
  ["import AI", "model(x)", "deploy()"],
  ["def learn:", "return ok", "export {}"],
];

const TechTeacherIcon: React.FC<{ size?: number }> = ({ size = 36 }) => {
  const [snippetIdx, setSnippetIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSnippetIdx(prev => (prev + 1) % codeSnippets.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const lines = codeSnippets[snippetIdx];
  const lineColors = ["#A78BFA", "#FBBF24", "#34D399"];

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      className="shrink-0"
      animate={{ rotate: [0, 2, -2, 1, -1, 0] }}
      transition={{ duration: 3, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
      whileHover={{ scale: 1.1 }}
    >
      {/* Monitor/Head — rounded rectangle */}
      <rect x={6} y={1} width={28} height={20} rx={3} fill="#1E293B" stroke="url(#iconGrad)" strokeWidth={1.5} />

      {/* Screen glare highlight */}
      <rect x={8} y={3} width={24} height={16} rx={2} fill="#0F172A" />

      {/* Blinking code lines inside screen */}
      {lines.map((line, i) => (
        <motion.text
          key={`${snippetIdx}-${i}`}
          x={10}
          y={8 + i * 5}
          fontSize={4}
          fontFamily="monospace"
          fill={lineColors[i]}
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.35, ease: "easeInOut" }}
        >
          {line}
        </motion.text>
      ))}

      {/* Monitor stand */}
      <rect x={17} y={21} width={6} height={3} rx={0.5} fill="#94A3B8" />
      {/* Monitor base */}
      <rect x={13} y={24} width={14} height={2} rx={1} fill="#94A3B8" />

      {/* Body/shoulders — simple friendly shape */}
      <path d="M10 32 C10 27, 20 26, 20 26 C20 26, 30 27, 30 32 L30 36 Q30 38 28 38 L12 38 Q10 38 10 36 Z"
        fill="url(#iconGrad)" opacity={0.9} />

      {/* Waving hand — right side */}
      <motion.g
        animate={{ rotate: [0, 20, -10, 15, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
        style={{ transformOrigin: "33px 30px" }}
      >
        <circle cx={35} cy={27} r={2.5} fill="#FCD34D" />
        {/* Fingers */}
        <rect x={34} y={23.5} width={1.2} height={2.5} rx={0.6} fill="#FCD34D" />
        <rect x={35.5} y={23} width={1.2} height={3} rx={0.6} fill="#FCD34D" />
        <rect x={32.5} y={24} width={1.2} height={2.2} rx={0.6} fill="#FCD34D" />
      </motion.g>

      {/* Gradient definition */}
      <defs>
        <linearGradient id="iconGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
};

export default TechTeacherIcon;
