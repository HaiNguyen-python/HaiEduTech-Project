import { useState } from "react";
import { Link } from "react-router-dom";
import { icons, ArrowLeft, BookOpen, BriefcaseBusiness, CheckCircle2, Coffee, MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { vietnameseConversationalPillars, allVietnameseConvLessons } from "@/data/vietnameseConversationalCurriculum";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const VN_CONV_STORAGE_KEY = "conv-vn-progress";
export const readVnProgress = (): string[] => {
  try { return JSON.parse(localStorage.getItem(VN_CONV_STORAGE_KEY) || "[]"); } catch { return []; }
};
const PILLAR_ICONS = [Coffee, BriefcaseBusiness, MessageCircle];
const getIcon = (name: string) => (icons as Record<string, typeof BookOpen>)[name] ?? BookOpen;

const VietnameseConversationalDashboard = () => {
  const { t } = useLanguage();
  const [completed] = useState<string[]>(readVnProgress);
  const progress = Math.round((completed.length / allVietnameseConvLessons.length) * 100);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <section className="border-b border-border bg-card">
          <div className="container mx-auto max-w-6xl px-4 py-8 lg:py-11">
            <Link to="/learn-vietnamese" className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-primary">
              <ArrowLeft className="h-4 w-4" /> {t("Tiếng Việt", "Vietnamese")}
            </Link>
            <h1 className="text-3xl font-extrabold sm:text-5xl">Interactive <span className="text-primary">Tiếng Việt</span> Curriculum</h1>
            <p className="mt-4 max-w-3xl text-base font-medium leading-7 text-muted-foreground">
              {t(`${allVietnameseConvLessons.length} bài hội thoại theo 3 trụ cột: Đời sống, Công việc và Giao tiếp xã hội.`, `${allVietnameseConvLessons.length} conversation lessons across Daily Life, Business and Social communication.`)}
            </p>
            <div className="mt-5 max-w-md">
              <p className="text-sm font-bold text-muted-foreground">{t("Tiến độ tổng", "Overall progress")}: {progress}%</p>
              <Progress value={progress} className="mt-2 h-2.5" />
            </div>
          </div>
        </section>

        <section className="container mx-auto max-w-6xl px-4 py-8">
          <Tabs defaultValue={vietnameseConversationalPillars[0].id}>
            <TabsList className="grid h-auto w-full grid-cols-3 gap-1 p-1.5">
              {vietnameseConversationalPillars.map((p, i) => {
                const Icon = PILLAR_ICONS[i];
                return (
                  <TabsTrigger key={p.id} value={p.id} className="min-h-14 gap-2 whitespace-normal text-xs sm:text-sm">
                    <Icon className="h-4 w-4 shrink-0" /><span className="hidden md:inline">{t(p.titleVi, p.title)}</span><span className="md:hidden">{i + 1}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
            {vietnameseConversationalPillars.map((p, i) => (
              <TabsContent key={p.id} value={p.id} className="mt-6">
                <header className="mb-5 border-l-4 border-primary bg-card p-5 shadow-sm">
                  <p className="text-sm font-extrabold uppercase text-primary">{t("Chặng", "Pillar")} {i + 1}</p>
                  <h2 className="mt-1 text-2xl font-extrabold">{t(p.titleVi, p.title)}</h2>
                  <p className="mt-2 font-medium text-muted-foreground">{p.description}</p>
                </header>
                <div className="grid gap-4 sm:grid-cols-2">
                  {p.lessons.map((l) => {
                    const Icon = getIcon(l.icon);
                    const done = completed.includes(l.id);
                    return (
                      <Link key={l.id} to={`/learn-vietnamese/conversational/learn/${l.id}`}>
                        <Card className="h-full transition-shadow hover:shadow-md">
                          <CardContent className="flex gap-4 p-5">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary"><Icon className="h-6 w-6" /></div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline">{l.level}</Badge>
                                {done && <CheckCircle2 className="h-4 w-4 text-primary" />}
                              </div>
                              <h3 className="mt-1 text-lg font-extrabold">{l.title}</h3>
                              <p className="text-sm font-semibold text-primary">{l.titleVi}</p>
                              <p className="mt-1 text-sm text-muted-foreground">{l.description}</p>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default VietnameseConversationalDashboard;
