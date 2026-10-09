import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Code2, ArrowLeft, ArrowRight, CheckCircle, Filter, Terminal, Layers, Trophy, LockKeyhole, Braces } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { pythonChallenges } from "@/data/pythonChallenges";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useMemo } from "react";
import PythonChallengeLeaderboard from "@/components/programming/PythonChallengeLeaderboard";
import PythonProgressChart from "@/components/programming/PythonProgressChart";
import PythonCheatsheet from "@/components/programming/PythonCheatsheet";
import { usePythonChallengeProgress } from "@/hooks/usePythonChallengeProgress";
import headerImage from "@/assets/python-challenges-header.jpg";
import { isPythonChallengeUnlocked } from "@/lib/pythonChallengeProgress";
import superheroFly from "@/assets/python-superhero-fly.png";
import superheroCode from "@/assets/python-superhero-code.png";
import superheroCelebrate from "@/assets/python-superhero-celebrate.png";
import superheroIdea from "@/assets/python-superhero-idea.png";
import superheroShield from "@/assets/python-superhero-shield.png";
import superheroRocket from "@/assets/python-superhero-rocket.png";

const SECTIONS = ["all", ...new Set(pythonChallenges.map(c => c.section))];
const PAGE_SIZE = 30;
const TILE_CLASSES = { easy: "python-challenge-tile--easy", medium: "python-challenge-tile--medium", hard: "python-challenge-tile--hard" };
const SUPERHERO_POSES = [superheroFly, superheroCode, superheroCelebrate, superheroIdea, superheroShield, superheroRocket];

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
            <div className="mb-6 flex flex-wrap items-center gap-3 border-b border-border pb-5">
              <span className="flex items-center gap-2 text-sm font-semibold"><Filter className="h-4 w-4 text-primary" />{t("Chủ đề", "Topics")}</span>
              <Select value={section} onValueChange={s => { setSection(s); setPage(1); }}>
                <SelectTrigger className="h-9 w-full max-w-xs sm:w-72" aria-label={t("Chọn chủ đề", "Choose a topic")}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-80">
                  {SECTIONS.map(s => <SelectItem key={s} value={s}>
                    <span className="flex items-center justify-between gap-3">
                      <span>{s === "all" ? t("Tất cả", "All") : s}</span>
                      <span className="font-mono text-xs text-muted-foreground">{pythonChallenges.filter(c => c.section === s).length}</span>
                    </span>
                  </SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4 flex items-center justify-between gap-3"><h2 className="font-display text-lg font-bold">{section === "all" ? t("Thử thách của bạn", "Your challenges") : section}</h2><span className="shrink-0 font-mono text-xs text-muted-foreground">{filtered.length} {t("bài", "challenges")}</span></div>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
              {paged.map(c => {
                const done = ids.has(c.id);
                const unlocked = !loading && isPythonChallengeUnlocked(c.id, ids);
                const status = done ? t("Hoàn thành", "Completed") : unlocked ? t("Sẵn sàng", "Ready to code") : t("Đã khóa", "Locked");
                const contents = <>
                  <div className="python-tile-toolbar flex items-center justify-between gap-2 px-4 py-2.5"><span className="flex min-w-0 items-center gap-2 font-mono text-xs"><Terminal className="h-3.5 w-3.5 shrink-0" />challenge_{c.id}.py</span><span className="python-tile-dots flex gap-1" aria-hidden="true"><i /><i /><i /></span></div>
                  <div className="relative flex flex-1 flex-col p-4">
                    <div className="mb-3 flex h-24 items-center justify-between gap-3">
                      <img src={SUPERHERO_POSES[(Number(c.id) - 1) % SUPERHERO_POSES.length]} width={384} height={384} loading="lazy" alt="" aria-hidden="true" className="h-24 w-24 shrink-0 object-contain motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:rotate-3 motion-safe:group-hover:scale-105" />
                      <div className="flex flex-col items-end gap-3"><span className="python-challenge-difficulty font-mono text-[11px] font-semibold">#{c.id}</span><span className="python-tile-icon flex h-9 w-9 items-center justify-center rounded-lg">{done ? <CheckCircle className="h-5 w-5" /> : unlocked ? <Braces className="h-5 w-5" /> : <LockKeyhole className="h-5 w-5" />}</span></div>
                    </div>
                    <h3 className="mb-2 text-base font-semibold leading-snug text-foreground">{t(c.titleVi, c.title)}</h3>
                    <p className="mb-5 line-clamp-1 text-xs text-muted-foreground">{c.section}</p>
                    <div className="mt-auto flex items-center justify-between gap-2 border-t-2 border-dashed border-border/70 pt-3"><span className="python-tile-status flex items-center gap-1.5 text-xs font-semibold">{done ? <CheckCircle className="h-3.5 w-3.5" /> : unlocked ? <Code2 className="h-3.5 w-3.5" /> : <LockKeyhole className="h-3.5 w-3.5" />}{status}</span><span className="python-challenge-difficulty font-mono text-[10px] uppercase">{t(c.difficulty === "easy" ? "Cơ bản" : c.difficulty === "medium" ? "Trung cấp" : "Nâng cao", c.difficulty)}</span></div>
                  </div>
                </>;
                const tileClass = `python-challenge-tile ${TILE_CLASSES[c.difficulty]} ${done ? "python-tile--done" : unlocked ? "python-tile--ready" : "python-tile--locked"} group flex min-h-72 flex-col overflow-hidden rounded-xl text-left`;
                return unlocked ? <Link key={c.id} to={`/python-challenges/${c.id}`} className={tileClass} aria-label={`${c.id}: ${t(c.titleVi, c.title)} - ${status}`}>{contents}</Link> : <div key={c.id} className={tileClass} aria-disabled="true" title={loading ? t("Đang tải tiến độ", "Loading progress") : t(`Hoàn thành bài ${nextChallenge?.id ?? "001"} để tiếp tục mở khóa.`, `Complete challenge ${nextChallenge?.id ?? "001"} to continue unlocking.`)}>{contents}</div>;
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
