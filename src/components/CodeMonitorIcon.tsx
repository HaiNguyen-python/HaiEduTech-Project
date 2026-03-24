import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";

/**
 * Animated "code monitor" icon for HaiEduTech branding.
 * Renders a mini laptop with blinking syntax-highlighted code lines.
 */

const codeSnippets = [
  ["<HaiEduTech />", "data.train()", "model.fit()"],
  ["import AI", "score = 8.5", "export default"],
  ["def learn():", "return skills", "deploy(app)"],
];

const CodeMonitorIcon: React.FC<{ size?: number }> = ({ size = 32 }) => {
  const [snippetIdx, setSnippetIdx] = useState(0);

  // Rotate code snippets every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSnippetIdx(prev => (prev + 1) % codeSnippets.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const lines = codeSnippets[snippetIdx];
  const w = size;
  const h = size;
  const screenPad = 3;
  const lineH = (h * 0.55) / 3;

  // Syntax highlight colors
  const lineColors = ["#A78BFA", "#FBBF24", "#34D399"];

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" className="shrink-0">
      {/* Monitor body */}
      <rect x={2} y={1} width={w - 4} height={h * 0.72} rx={3} ry={3}
        stroke="#94A3B8" strokeWidth={1.5} fill="#1E293B" />

      {/* Screen area with code lines */}
      {lines.map((line, i) => (
        <motion.text
          key={`${snippetIdx}-${i}`}
          x={screenPad + 3}
          y={6 + i * lineH + lineH * 0.7}
          fontSize={5.5}
          fontFamily="monospace"
          fill={lineColors[i]}
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut",
          }}
        >
          {line}
        </motion.text>
      ))}

      {/* Stand */}
      <rect x={w * 0.35} y={h * 0.74} width={w * 0.3} height={h * 0.08} rx={1} fill="#94A3B8" />
      {/* Base */}
      <rect x={w * 0.2} y={h * 0.82} width={w * 0.6} height={h * 0.06} rx={1.5} fill="#94A3B8" />
    </svg>
  );
};

export default CodeMonitorIcon;
