/**
 * @file vite.config.ts
 * @description Vite build configuration for HaiEduTech Platform.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 * @license Private / Proprietary - No unauthorized copying or distribution.
 */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
      // Do not mangle top-level/vendor symbols: Recharts can crash in
      // production with "Cannot access 'e' before initialization" when
      // aggressive top-level mangling rewrites lexical declarations.
      mangle: false,
      format: {
        comments: false,
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Heavy static data — split into separate chunks so page shells load fast
          if (id.includes("/src/data/hskVocab/")) return "data-hsk-vocab";
          if (id.includes("/src/data/hskTests/")) return "data-hsk-tests";
          if (id.includes("/src/data/curriculum/")) return "data-curriculum-programming";
          if (id.includes("/src/data/vietnamese/")) return "data-vietnamese";
          if (id.includes("/src/data/finnishCurriculum/")) return "data-finnish-curriculum";
          if (/\/src\/data\/cambridgeKids/i.test(id)) return "data-cambridge-kids";
          if (/\/src\/data\/cambridgeLectures/i.test(id)) return "data-cambridge-lectures";
          if (/\/src\/data\/ielts(Reading|Listening|Full|Lectures|Vocab|Writing|Speaking|Grammar)/i.test(id)) return "data-ielts";
          if (/\/src\/data\/toeic/i.test(id)) return "data-toeic";
          if (/\/src\/data\/sat/i.test(id)) return "data-sat";
          if (/\/src\/data\/thpt/i.test(id)) return "data-thpt";
          if (/\/src\/data\/programmingLesson/i.test(id)) return "data-programming-lessons";

          // Vendor splits
          if (id.includes("node_modules")) {
            if (/[\\/]react-dom[\\/]|[\\/]react-router-dom[\\/]|[\\/]react[\\/]/.test(id)) return "vendor-react";
            if (id.includes("@radix-ui")) return "vendor-ui";
            if (id.includes("recharts")) return "vendor-charts";
            if (id.includes("framer-motion")) return "vendor-motion";
            if (id.includes("@supabase")) return "vendor-supabase";
            if (id.includes("@tanstack/react-query")) return "vendor-query";
            if (id.includes("codemirror")) return "vendor-codemirror";
            if (id.includes("@tiptap")) return "vendor-tiptap";
            if (id.includes("hanzi-writer")) return "vendor-hanzi";
            if (id.includes("dompurify")) return "vendor-sanitize";
          }
        },
      },
    },
  },
}));
