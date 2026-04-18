/**
 * @file PteShell.tsx
 * @description Reusable PTE Blue layout wrapper with header, breadcrumb, and footer.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Navbar from "@/components/Navbar";

interface PteShellProps {
  title: string;
  subtitle?: string;
  backTo?: string;
  backLabel?: string;
  children: ReactNode;
}

const PteShell = ({ title, subtitle, backTo = "/pte", backLabel = "PTE Hub", children }: PteShellProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#f4f7fb]">
      <Navbar />
      <header className="bg-[#003580] text-white shadow-md mt-[var(--navbar-h,56px)]">
        <div className="container mx-auto px-4 sm:px-6 py-5">
          <Link
            to={backTo}
            className="inline-flex items-center gap-1 text-white/80 hover:text-white text-sm mb-2 transition-colors"
          >
            <ChevronLeft size={16} /> {backLabel}
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{title}</h1>
          {subtitle && <p className="text-white/85 mt-1 text-sm sm:text-base">{subtitle}</p>}
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-6 sm:py-8 w-full max-w-5xl">
        {children}
      </main>
      <footer className="bg-[#003580] text-white/80 text-center text-xs py-4">
        PTE Academic Prep · HaiEduTech © 2026
      </footer>
    </div>
  );
};

export default PteShell;
