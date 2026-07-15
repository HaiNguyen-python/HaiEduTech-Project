/**
 * @file main.tsx
 * @description Application entry point for HaiEduTech Platform.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 * @license Private / Proprietary - No unauthorized copying or distribution.
 */
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import "./lib/audioRecovery";
import App from "./App.tsx";
import "./index.css";

// Runtime assert: refuse to boot if the Supabase URL is not HTTPS.
// Prevents accidental plaintext transport if env is misconfigured.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
if (supabaseUrl && typeof supabaseUrl === "string" && !supabaseUrl.startsWith("https://")) {
  throw new Error("VITE_SUPABASE_URL must use HTTPS.");
}

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
