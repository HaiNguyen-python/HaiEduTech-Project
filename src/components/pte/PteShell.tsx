/**
 * @file PteShell.tsx
 * @description Reusable PTE Blue layout wrapper with header, breadcrumb, and footer.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface PteShellProps {
  title: string;
  subtitle?: string;
  backTo?: string;
  backLabel?: string;
  children: ReactNode;
}

const PteShell = ({ title, subtitle, backTo = "/pte", backLabel = "PTE Hub", children }: PteShellProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <header className="bg-primary text-primary-foreground shadow-md mt-[var(--navbar-h,56px)]">
        <div className="container mx-auto px-4 sm:px-6 py-5">
          <Link
            to={backTo}
            className="inline-flex items-center gap-1 text-primary-foreground/80 hover:text-primary-foreground text-sm mb-2 transition-colors"
          >
            <ChevronLeft size={16} /> {backLabel}
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold">{title}</h1>
          {subtitle && <p className="text-primary-foreground/85 mt-1 text-sm sm:text-base">{subtitle}</p>}
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-6 sm:py-8 w-full max-w-5xl">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PteShell;
