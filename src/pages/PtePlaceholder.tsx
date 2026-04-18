/**
 * @file PtePlaceholder.tsx
 * @description Coming-soon placeholder for PTE modules under construction.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import PteShell from "@/components/pte/PteShell";
import { Construction } from "lucide-react";
import { useParams } from "react-router-dom";

const TITLES: Record<string, { title: string; sub: string }> = {
  writing: { title: "Writing Practice", sub: "Essay & Summarize Written Text" },
  reading: { title: "Reading Practice", sub: "Fill in Blanks & Re-order Paragraphs" },
  listening: { title: "Listening Practice", sub: "Dictation & Summarize Spoken Text" },
};

const PtePlaceholder = () => {
  const { skill = "writing" } = useParams();
  const meta = TITLES[skill] || { title: "PTE Module", sub: "" };
  return (
    <PteShell title={meta.title} subtitle={meta.sub}>
      <div className="bg-white rounded-2xl border border-[#003580]/15 p-8 text-center shadow-sm">
        <Construction className="mx-auto text-[#003580] mb-3" size={48} />
        <h2 className="text-xl font-bold text-[#003580]">Coming in the next build pass</h2>
        <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto">
          The {meta.title} module is being assembled with timed exercises, AI scoring, and
          notebook integration. Continue practising Speaking while we finish this section.
        </p>
      </div>
    </PteShell>
  );
};

export default PtePlaceholder;
