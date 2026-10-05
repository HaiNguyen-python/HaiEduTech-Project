import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Code2, ArrowLeft, ArrowRight, CheckCircle, Filter, Terminal, Layers, Trophy } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { pythonChallenges } from "@/data/pythonChallenges";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";
import PythonChallengeLeaderboard from "@/components/programming/PythonChallengeLeaderboard";
import PythonProgressChart from "@/components/programming/PythonProgressChart";
import { usePythonChallengeProgress } from "@/hooks/usePythonChallengeProgress";
import headerImage from "@/assets/python-challenges-header.jpg";

const SECTIONS = ["all", ...new Set(pythonChallenges.map(c => c.section))];
const PAGE_SIZE = 30;

const PythonChallengeList = () => {
  const { t } = useLanguage();
  const [section, setSection] = useState("all");
  const [page, setPage] = useState(1);
  const { ids, history, loading, error } = usePythonChallengeProgress();
  const filtered = useMemo(() => section === "all" ? pythonChallenges : pythonChallenges.filter(c => c.section === section), [section]);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const nextChallenge = pythonChallenges.find(c => !ids.has(c.id));
  return (
    <div className="python-lab min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6">
        <Link to="/programming" className="mb-5 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> {t("Về trang lập trình", "Back to Programming")}
        </Link>
        <header className="python-lab-header relative isolate mb-7 overflow-hidden border-y border-border">
          <img src={headerImage} width={1536} height={640} alt="" aria-hidden="true" fetchPriority="high" className="absolute inset-0 -z-20 h-full w-full object-cover object-right" />
          <div className="python-lab-header-overlay absolute inset-0 -z-10" />
          <div className="max-w-xl px-5 py-9 sm:px-9 sm:py-12">
            <p className="mb-4 flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-primary"><Terminal className="h-4 w-4" /> Python learning lab</p>
            <h1 className="mb-3 font-display text-3xl font-bold leading-tight text-foreground sm:text-4xl">150 Python Challenges</h1>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">{t("Từ dòng code đầu tiên đến dự án của riêng bạn.", "From your first line of code to your own projects.")}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild><Link to={`/python-challenges/${nextChallenge?.id ?? "001"}`}><Code2 />{t(ids.size ? "Tiếp tục luyện tập" : "Bắt đầu lập trình", ids.size ? "Continue coding" : "Start coding")}<ArrowRight /></Link></Button>
            </div>
            <div className="mt-6 max-w-xs">
              <div className="mb-2 flex justify-between text-xs font-semibold"><span className="text-muted-foreground">{t("Đã hoàn thành", "Completed")}</span><span className="text-primary">{ids.size}/150</span></div>
              <Progress value={ids.size / 150 * 100} className="h-2" />
            </div>
          </div>
        </header>
        <div className="mb-8 grid grid-cols-3 divide-x divide-border border-b border-border pb-6">
          {[{ icon: CheckCircle, value: ids.size, label: t("Bài hoàn thành", "Completed") }, { icon: Layers, value: SECTIONS.length - 1, label: t("Chủ đề", "Topics") }, { icon: Trophy, value: `${Math.round(ids.size / 150 * 100)}%`, label: t("Hành trình Python", "Python journey") }].map(s => <div key={s.label} className="flex flex-col items-center gap-1 px-2 sm:flex-row sm:justify-center sm:gap-3"><s.icon className="h-5 w-5 text-primary" /><div className="text-center sm:text-left"><p className="font-mono text-xl font-bold text-foreground">{s.value}</p><p className="text-xs text-muted-foreground">{s.label}</p></div></div>)}
        </div>
        <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_320px]">
          <section className="min-w-0" aria-label={t("Danh sách thử thách", "Challenge library")}>
            <div className="mb-6 border-b border-border pb-5">
              <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold"><Filter className="h-4 w-4 text-primary" />{t("Chủ đề", "Topics")}</h2>
              <div className="flex flex-wrap gap-2">
                {SECTIONS.map(s => <Button key={s} size="sm" variant={section === s ? "default" : "secondary"} onClick={() => { setSection(s); setPage(1); }} aria-pressed={section === s} className="h-auto min-h-8 max-w-full whitespace-normal px-2.5 py-1.5 text-left text-xs">
                  {s === "all" ? t("Tất cả", "All") : s}{s !== "all" && <span className="opacity-70">{pythonChallenges.filter(c => c.section === s).length}</span>}
                </Button>)}
              </div>
            </div>
            <div className="mb-4 flex items-center justify-between gap-3"><h2 className="font-display text-lg font-bold">{section === "all" ? t("Thử thách của bạn", "Your challenges") : section}</h2><span className="shrink-0 font-mono text-xs text-muted-foreground">{filtered.length} {t("bài", "challenges")}</span></div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {paged.map(c => {
                const done = ids.has(c.id);
                return <Link key={c.id} to={`/python-challenges/${c.id}`} className={`python-challenge-tile python-challenge-tile--${c.difficulty} group flex min-h-36 flex-col rounded-lg border p-4 transition-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${done ? "ring-1 ring-primary/40" : ""}`}>
                  <div className="mb-3 flex items-center justify-between"><span className="font-mono text-xs text-muted-foreground">{String(c.number).padStart(3, "0")}</span>{done ? <CheckCircle className="h-4 w-4 text-primary" aria-label={t("Đã hoàn thành", "Completed")} /> : <Code2 className="h-4 w-4 text-muted-foreground/60" />}</div>
                  <h3 className="mb-3 text-sm font-semibold leading-snug text-foreground">{t(c.titleVi, c.title)}</h3>
                  <div className="mt-auto flex items-center justify-between"><span className="python-challenge-difficulty font-mono text-[10px] font-bold uppercase">{t(c.difficulty === "easy" ? "Cơ bản" : c.difficulty === "medium" ? "Trung cấp" : "Nâng cao", c.difficulty)}</span><ArrowRight className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:translate-x-1" /></div>
                </Link>;
              })}
            </div>
            {totalPages > 1 && <nav className="mt-7 flex flex-wrap items-center justify-center gap-1.5" aria-label={t("Trang thử thách", "Challenge pages")}>
              <Button size="icon-sm" variant="outline" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} aria-label={t("Trang trước", "Previous page")}><ArrowLeft /></Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => <Button key={p} size="icon-sm" variant={page === p ? "default" : "ghost"} onClick={() => setPage(p)} aria-current={page === p ? "page" : undefined}>{p}</Button>)}
              <Button size="icon-sm" variant="outline" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} aria-label={t("Trang sau", "Next page")}><ArrowRight /></Button>
            </nav>}
          </section>
          <div className="grid min-w-0 gap-5">
            <PythonChallengeLeaderboard refreshKey={ids.size} />
            <PythonProgressChart ids={ids} history={history} loading={loading} error={error} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default PythonChallengeList;
