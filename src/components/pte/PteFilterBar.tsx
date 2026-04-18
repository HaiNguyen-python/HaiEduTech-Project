/**
 * @file PteFilterBar.tsx
 * @description Reusable filter chips for PTE modules: Target Band, Real Exam 2026, Category.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { Flame, Target, Layers } from "lucide-react";
import type { PteTargetBand, PteCategory, PteTags } from "@/data/pteData";

export interface PteFilterState {
  band: PteTargetBand | "all";
  realExam2026: boolean;
  category: PteCategory | "all";
}

export const DEFAULT_PTE_FILTERS: PteFilterState = {
  band: "all",
  realExam2026: false,
  category: "all",
};

interface Props {
  value: PteFilterState;
  onChange: (next: PteFilterState) => void;
  resultCount: number;
  totalCount: number;
}

const BANDS: { id: PteTargetBand | "all"; label: string }[] = [
  { id: "all", label: "All bands" },
  { id: "50", label: "PTE 50" },
  { id: "65", label: "PTE 65" },
  { id: "79+", label: "PTE 79+" },
];

const CATEGORIES: { id: PteCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "daily", label: "Daily" },
  { id: "mock", label: "Mock" },
  { id: "prediction", label: "Prediction" },
];

const PteFilterBar = ({ value, onChange, resultCount, totalCount }: Props) => {
  const Chip = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
    <button
      type="button"
      onClick={onClick}
      className={`text-xs px-2.5 py-1 rounded-full border transition-colors font-medium ${
        active
          ? "bg-[#003580] text-white border-[#003580]"
          : "bg-white text-slate-700 border-slate-300 hover:border-[#003580]/50"
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="bg-white rounded-xl border border-[#003580]/15 p-3 sm:p-4 mb-4 shadow-sm">
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 uppercase tracking-wide">
          <Target size={12} /> Band
        </span>
        {BANDS.map(b => (
          <Chip key={b.id} active={value.band === b.id} onClick={() => onChange({ ...value, band: b.id })}>
            {b.label}
          </Chip>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 uppercase tracking-wide">
          <Layers size={12} /> Category
        </span>
        {CATEGORIES.map(c => (
          <Chip key={c.id} active={value.category === c.id} onClick={() => onChange({ ...value, category: c.id })}>
            {c.label}
          </Chip>
        ))}
        <Chip
          active={value.realExam2026}
          onClick={() => onChange({ ...value, realExam2026: !value.realExam2026 })}
        >
          <span className="inline-flex items-center gap-1">
            <Flame size={11} className={value.realExam2026 ? "text-orange-200" : "text-orange-500"} />
            Real Exam 2026
          </span>
        </Chip>
      </div>
      <p className="text-[11px] text-slate-500">
        Showing <span className="font-semibold text-[#003580]">{resultCount}</span> of {totalCount}
      </p>
    </div>
  );
};

export default PteFilterBar;

/** Apply filter to any PTE bank item carrying PteTags. */
export const applyPteFilter = <T extends PteTags>(items: T[], f: PteFilterState): T[] => {
  return items.filter(it => {
    if (f.band !== "all" && it.targetBand !== f.band) return false;
    if (f.realExam2026 && !it.realExam2026) return false;
    if (f.category !== "all" && it.category !== f.category) return false;
    return true;
  });
};
