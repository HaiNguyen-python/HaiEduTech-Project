/**
 * @file JobOpportunities.tsx
 * @description Job Opportunities Hub — Finland-first tech jobs for Data/AI/Language Technology.
 */
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Search, ExternalLink, Bookmark, BookmarkCheck, Briefcase, MapPin,
  Building2, Globe2, Sparkles, ChevronDown, Linkedin, Info, RefreshCw,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import {
  jobCompanies, jobResources, tipsForFinland,
  type JobRole, type Region, type CompanySize, type WorkMode,
} from "@/data/jobOpportunities";
import { toast } from "@/hooks/use-toast";

const STORAGE_KEY = "job-bookmarks-v1";

const roleLabel: Record<JobRole | "all", string> = {
  all: "All Roles",
  "data-engineer": "Data Engineer",
  "ai-engineer": "AI Engineer",
  "language-tech": "Language Technology",
};

const roleEmoji: Record<JobRole, string> = {
  "data-engineer": "🔄",
  "ai-engineer": "🧠",
  "language-tech": "🗣️",
};

const regionLabel: Record<Region | "all", string> = {
  all: "All Regions",
  finland: "🇫🇮 Finland",
  nordic: "🇸🇪🇳🇴🇩🇰 Nordic",
  "eu-remote": "🇪🇺 EU Remote",
  global: "🌍 Global",
};

const sizeLabel: Record<CompanySize | "all", string> = {
  all: "Any Size",
  startup: "Startup",
  mid: "Mid-size",
  enterprise: "Enterprise",
  research: "Research",
};

const workModeLabel: Record<WorkMode | "all", string> = {
  all: "Any Mode",
  onsite: "Onsite",
  hybrid: "Hybrid",
  remote: "Remote",
};

const JobOpportunities = () => {
  const [role, setRole] = useState<JobRole | "all">("all");
  const [region, setRegion] = useState<Region | "all">("finland");
  const [size, setSize] = useState<CompanySize | "all">("all");
  const [workMode, setWorkMode] = useState<WorkMode | "all">("all");
  const [search, setSearch] = useState("");
  const [savedOnly, setSavedOnly] = useState(false);
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());

  // Load bookmarks
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setBookmarks(new Set(JSON.parse(raw)));
    } catch (e) {
      // ignore
    }
  }, []);

  const toggleBookmark = (id: string) => {
    const next = new Set(bookmarks);
    if (next.has(id)) {
      next.delete(id);
      toast({ title: "Removed from saved", description: "Company removed from your bookmarks." });
    } else {
      next.add(id);
      toast({ title: "⭐ Saved!", description: "Added to your bookmarks." });
    }
    setBookmarks(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return jobCompanies.filter((c) => {
      if (role !== "all" && !c.roles.includes(role)) return false;
      if (region !== "all" && c.region !== region) return false;
      if (size !== "all" && c.size !== size) return false;
      if (workMode !== "all" && c.workMode !== workMode) return false;
      if (savedOnly && !bookmarks.has(c.id)) return false;
      if (q) {
        const hay = `${c.name} ${c.city} ${c.country} ${c.description} ${c.techStack.join(" ")}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [role, region, size, workMode, search, savedOnly, bookmarks]);

  const stats = useMemo(() => {
    const finland = jobCompanies.filter((c) => c.region === "finland").length;
    const totalRoles = jobCompanies.reduce((acc, c) => acc + c.roles.length, 0);
    return {
      companies: jobCompanies.length,
      finland,
      finlandPct: Math.round((finland / jobCompanies.length) * 100),
      roles: totalRoles,
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-6 pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-medium mb-4">
              <Briefcase className="w-3 h-3" /> Job Opportunities Hub
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold mb-3 leading-tight">
              Find Your Next Role in Tech{" "}
              <span className="text-gradient">🇫🇮</span>
            </h1>
            <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
              Curated companies hiring <strong>Data Engineers</strong>, <strong>AI Engineers</strong> and{" "}
              <strong>Language Technology</strong> talent — Finland-first, plus Nordic and EU Remote.
            </p>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-3 max-w-2xl mx-auto mt-6">
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">{stats.companies}</div>
                <div className="text-xs text-muted-foreground mt-1">Companies</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-emerald-600">{stats.finland}</div>
                <div className="text-xs text-muted-foreground mt-1">🇫🇮 Finland-based ({stats.finlandPct}%)</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-violet-600">3</div>
                <div className="text-xs text-muted-foreground mt-1">Career Tracks</div>
              </Card>
            </div>
          </motion.div>

          {/* Live Jobs Notice */}
          <Card className="p-4 mb-6 border-amber-500/30 bg-gradient-to-r from-amber-500/5 to-orange-500/5">
            <div className="flex items-start gap-3">
              <div className="shrink-0 w-8 h-8 rounded-full bg-amber-500/15 flex items-center justify-center">
                <Info className="w-4 h-4 text-amber-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-bold text-sm mb-1 flex items-center gap-2">
                  <RefreshCw className="w-3.5 h-3.5 text-amber-600" />
                  How job listings stay fresh
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  This hub shows a <strong>curated list of companies</strong> that consistently hire for Data, AI, and Language Tech roles in Finland.
                  The companies don't change often, but <strong>actual job openings update every day</strong> — just click{" "}
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-primary/10 text-primary font-semibold">
                    <Linkedin className="w-3 h-3" /> Live Jobs
                  </span>{" "}
                  on any card to see today's openings (the LinkedIn search is pre-filtered by company + Finland and refreshes in real time).
                  For broader hunting, use the <strong>Top Resources</strong> below — Duunitori and Work in Finland are updated by employers daily.
                </p>
              </div>
            </div>
          </Card>

          {/* Top Resources Panel */}
          <Card className="p-5 mb-8 bg-gradient-to-r from-primary/5 to-emerald-500/5 border-primary/20">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-primary" />
              <h2 className="font-display font-bold text-sm">Top Resources for Finland Job Hunt</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              {jobResources.map((r) => (
                <a
                  key={r.id}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-1 p-3 rounded-lg bg-card border border-border hover:border-primary/40 hover:shadow-sm transition-all"
                >
                  <div className="flex items-center gap-1.5">
                    <span className="text-base">{r.emoji}</span>
                    <span className="font-semibold text-xs group-hover:text-primary transition-colors line-clamp-1">
                      {r.name}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground line-clamp-2">{r.description}</p>
                </a>
              ))}
            </div>
          </Card>

          {/* Role Tabs */}
          <div className="flex flex-wrap gap-2 mb-4">
            {(["all", "data-engineer", "ai-engineer", "language-tech"] as const).map((r) => (
              <Button
                key={r}
                variant={role === r ? "default" : "outline"}
                size="sm"
                onClick={() => setRole(r)}
                className="text-xs"
              >
                {r !== "all" && <span className="mr-1">{roleEmoji[r as JobRole]}</span>}
                {roleLabel[r]}
              </Button>
            ))}
          </div>

          {/* Search + filters */}
          <div className="space-y-3 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by company, tech stack, city..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {/* Region */}
              {(["all", "finland", "nordic", "eu-remote", "global"] as const).map((r) => (
                <Badge
                  key={`region-${r}`}
                  variant={region === r ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/10 text-xs"
                  onClick={() => setRegion(r)}
                >
                  {regionLabel[r]}
                </Badge>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {/* Size */}
              {(["all", "startup", "mid", "enterprise", "research"] as const).map((s) => (
                <Badge
                  key={`size-${s}`}
                  variant={size === s ? "secondary" : "outline"}
                  className="cursor-pointer hover:bg-secondary/80 text-xs"
                  onClick={() => setSize(s)}
                >
                  <Building2 className="w-3 h-3 mr-1" />
                  {sizeLabel[s]}
                </Badge>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              {(["all", "onsite", "hybrid", "remote"] as const).map((m) => (
                <Badge
                  key={`mode-${m}`}
                  variant={workMode === m ? "secondary" : "outline"}
                  className="cursor-pointer hover:bg-secondary/80 text-xs"
                  onClick={() => setWorkMode(m)}
                >
                  <Globe2 className="w-3 h-3 mr-1" />
                  {workModeLabel[m]}
                </Badge>
              ))}

              <Badge
                variant={savedOnly ? "default" : "outline"}
                className="cursor-pointer text-xs ml-auto"
                onClick={() => setSavedOnly(!savedOnly)}
              >
                <BookmarkCheck className="w-3 h-3 mr-1" />
                Saved only ({bookmarks.size})
              </Badge>
            </div>
          </div>

          <div className="text-xs text-muted-foreground mb-4">
            Showing <strong>{filtered.length}</strong> of {jobCompanies.length} companies
          </div>

          {/* Company cards */}
          {filtered.length === 0 ? (
            <Card className="p-12 text-center">
              <Briefcase className="w-12 h-12 mx-auto mb-3 text-muted-foreground/40" />
              <p className="text-muted-foreground text-sm">No companies match your filters. Try clearing some.</p>
            </Card>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {filtered.map((c, i) => {
                const saved = bookmarks.has(c.id);
                return (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(i * 0.03, 0.3), duration: 0.3 }}
                  >
                    <Card className={`p-5 h-full flex flex-col transition-all hover:shadow-md hover:border-primary/30 ${c.highlight ? "border-primary/40 bg-primary/[0.02]" : ""}`}>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-start gap-3 min-w-0 flex-1">
                          <div className="text-3xl shrink-0">{c.emoji}</div>
                          <div className="min-w-0">
                            <h3 className="font-display font-bold text-base truncate">{c.name}</h3>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                              <MapPin className="w-3 h-3" />
                              <span className="truncate">{c.city}, {c.country}</span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleBookmark(c.id)}
                          className="shrink-0 p-1.5 rounded-md hover:bg-accent transition-colors"
                          aria-label={saved ? "Remove bookmark" : "Save"}
                        >
                          {saved ? (
                            <BookmarkCheck className="w-4 h-4 text-primary fill-primary" />
                          ) : (
                            <Bookmark className="w-4 h-4 text-muted-foreground" />
                          )}
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {c.roles.map((r) => (
                          <Badge key={r} variant="secondary" className="text-[10px]">
                            {roleEmoji[r]} {roleLabel[r]}
                          </Badge>
                        ))}
                        <Badge variant="outline" className="text-[10px]">
                          {sizeLabel[c.size]}
                        </Badge>
                        <Badge variant="outline" className="text-[10px]">
                          {workModeLabel[c.workMode]}
                        </Badge>
                      </div>

                      <p className="text-xs text-muted-foreground leading-relaxed mb-3 flex-1">
                        {c.description}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {c.techStack.slice(0, 6).map((t) => (
                          <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-mono">
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <Button asChild size="sm" variant="default" className="flex-1 text-xs">
                          <a href={c.careerUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-3 h-3" />
                            Career Page
                          </a>
                        </Button>
                        <Button asChild size="sm" variant="outline" className="flex-1 text-xs">
                          <a href={c.liveJobsUrl} target="_blank" rel="noopener noreferrer">
                            <Linkedin className="w-3 h-3" />
                            Live Jobs
                          </a>
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Tips section */}
          <Card className="p-5 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 border-emerald-500/20">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <h2 className="font-display font-bold text-sm">Tips for Working in Finland 🇫🇮</h2>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {tipsForFinland.map((t, i) => (
                <AccordionItem key={i} value={`tip-${i}`} className="border-emerald-500/10">
                  <AccordionTrigger className="text-sm font-semibold hover:text-emerald-700 text-left">
                    {t.title}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs text-muted-foreground leading-relaxed">
                    {t.body}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default JobOpportunities;
