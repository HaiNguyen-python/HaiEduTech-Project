// AI Pedagogical Center - Teacher coaching hub with 4 tools
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { toast } from "sonner";
import {
  Brain, BookOpen, MessageCircle, Lightbulb, Sparkles, Loader2, ChevronDown,
  Trophy, FileText, Users, Target, Save, History, Zap, AlertTriangle, CheckCircle2,
} from "lucide-react";
import { TEACHING_METHODS, PEDAGOGY_FRAMEWORKS } from "@/data/teachingMethodsData";

const SCENARIO_TYPES = [
  { value: "motivation", label: "🎯 Động lực học tập" },
  { value: "behavior", label: "⚠️ Vấn đề hành vi" },
  { value: "obstacle", label: "🧩 Trở ngại học thuật" },
  { value: "parent", label: "👨‍👩‍👧 Tương tác phụ huynh" },
  { value: "burnout", label: "😴 Học sinh kiệt sức" },
  { value: "general", label: "💬 Tình huống khác" },
];

const LEARNING_STYLES = [
  { value: "Visual", label: "👁️ Visual (Hình ảnh)" },
  { value: "Auditory", label: "👂 Auditory (Nghe)" },
  { value: "Kinesthetic", label: "✋ Kinesthetic (Vận động)" },
  { value: "Reading-Writing", label: "📝 Reading-Writing (Đọc-Viết)" },
];

export default function AiPedagogicalCenter() {
  const [activeTab, setActiveTab] = useState("library");
  const [loading, setLoading] = useState(false);

  // Situational Solver state
  const [scenarioType, setScenarioType] = useState("motivation");
  const [studentContext, setStudentContext] = useState("");
  const [challenge, setChallenge] = useState("");
  const [situationResult, setSituationResult] = useState<any>(null);

  // Lesson Plan Optimizer state
  const [planTitle, setPlanTitle] = useState("");
  const [planSubject, setPlanSubject] = useState("English");
  const [planLevel, setPlanLevel] = useState("Intermediate");
  const [planText, setPlanText] = useState("");
  const [planResult, setPlanResult] = useState<any>(null);

  // Learning Style state
  const [styleChoice, setStyleChoice] = useState("Visual");
  const [styleTopic, setStyleTopic] = useState("");
  const [styleSubject, setStyleSubject] = useState("English");
  const [styleResult, setStyleResult] = useState<any>(null);

  // Weekly Challenge state
  const [challengeData, setChallengeData] = useState<any>(null);

  // Diary state
  const [diary, setDiary] = useState<any[]>([]);

  // Library state
  const [methodFilter, setMethodFilter] = useState<string>("all");

  useEffect(() => {
    if (activeTab === "diary") loadDiary();
  }, [activeTab]);

  const loadDiary = async () => {
    const { data } = await supabase
      .from("teaching_diary")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);
    setDiary(data || []);
  };

  const callAssistant = async (mode: string, payload: any) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("pedagogical-assistant", {
        body: { mode, payload },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data?.result;
    } catch (e: any) {
      toast.error(e.message || "AI request failed");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const solveSituation = async () => {
    if (!challenge.trim()) return toast.error("Please describe the challenge");
    const result = await callAssistant("situational", { scenarioType, studentContext, challenge });
    if (result) {
      setSituationResult(result);
      toast.success("Pedagogical solution generated");
    }
  };

  const saveSituationToDiary = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || !situationResult) return;
    const { error } = await supabase.from("teaching_diary").insert({
      user_id: user.id,
      scenario_type: scenarioType,
      student_context: studentContext,
      challenge,
      ai_solution: situationResult,
      tags: [scenarioType],
    });
    if (error) return toast.error("Save failed");
    toast.success("Saved to your Teaching Diary 📖");
  };

  const optimizeLessonPlan = async () => {
    if (!planText.trim() || !planTitle.trim()) return toast.error("Add title and plan text");
    const result = await callAssistant("lessonPlan", {
      title: planTitle, subject: planSubject, level: planLevel, originalPlan: planText,
    });
    if (result) {
      setPlanResult(result);
      toast.success("Lesson plan reviewed");
      // Persist
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from("lesson_plan_reviews").insert({
          user_id: user.id, title: planTitle, subject: planSubject, level: planLevel,
          original_plan: planText, ai_feedback: result, quality_score: result.qualityScore || null,
        });
      }
    }
  };

  const suggestForStyle = async () => {
    if (!styleTopic.trim()) return toast.error("Enter a topic");
    const result = await callAssistant("learningStyle", {
      style: styleChoice, topic: styleTopic, subject: styleSubject,
    });
    if (result) setStyleResult(result);
  };

  const newWeeklyChallenge = async () => {
    const result = await callAssistant("weeklyChallenge", {
      subjects: ["English", "Chinese", "Finnish", "Programming"],
      previousChallenge: challengeData?.title,
    });
    if (result) {
      setChallengeData(result);
      toast.success("New challenge ready 🏆");
    }
  };

  const filteredMethods = methodFilter === "all"
    ? TEACHING_METHODS
    : TEACHING_METHODS.filter((m) => m.category === methodFilter);

  return (
    <Card className="border-2 border-emerald-200/60 dark:border-emerald-900/40 bg-gradient-to-br from-emerald-50/40 via-background to-blue-50/30 dark:from-emerald-950/20 dark:to-blue-950/20">
      <CardHeader className="border-b border-emerald-100 dark:border-emerald-900/30">
        <CardTitle className="flex items-center gap-3 text-2xl">
          <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500 to-blue-600">
            <Brain className="h-6 w-6 text-white" />
          </div>
          <div>
            <div className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              AI Pedagogical Center
            </div>
            <p className="text-sm font-normal text-muted-foreground mt-1">
              Trung tâm Sư phạm AI · Thư viện phương pháp + Trợ lý xử lý tình huống lớp học
            </p>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 h-auto gap-1">
            <TabsTrigger value="library" className="flex items-center gap-1.5 py-2">
              <BookOpen className="h-4 w-4" /> <span className="hidden sm:inline">Methods</span>
            </TabsTrigger>
            <TabsTrigger value="solver" className="flex items-center gap-1.5 py-2">
              <MessageCircle className="h-4 w-4" /> <span className="hidden sm:inline">Solver</span>
            </TabsTrigger>
            <TabsTrigger value="lesson" className="flex items-center gap-1.5 py-2">
              <FileText className="h-4 w-4" /> <span className="hidden sm:inline">Plan AI</span>
            </TabsTrigger>
            <TabsTrigger value="style" className="flex items-center gap-1.5 py-2">
              <Users className="h-4 w-4" /> <span className="hidden sm:inline">Style</span>
            </TabsTrigger>
            <TabsTrigger value="challenge" className="flex items-center gap-1.5 py-2">
              <Trophy className="h-4 w-4" /> <span className="hidden sm:inline">Challenge</span>
            </TabsTrigger>
            <TabsTrigger value="diary" className="flex items-center gap-1.5 py-2">
              <History className="h-4 w-4" /> <span className="hidden sm:inline">Diary</span>
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: METHODS LIBRARY */}
          <TabsContent value="library" className="space-y-4 mt-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {["all", "language", "programming", "universal"].map((cat) => (
                <Button
                  key={cat}
                  variant={methodFilter === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMethodFilter(cat)}
                  className="capitalize"
                >
                  {cat === "all" ? "Tất cả" : cat}
                </Button>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {filteredMethods.map((m) => (
                <Collapsible key={m.id}>
                  <Card className="border-emerald-100 dark:border-emerald-900/30 hover:border-emerald-300 transition-all">
                    <CollapsibleTrigger className="w-full text-left">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-bold text-base">{m.name}</h3>
                              {m.acronym && <Badge variant="secondary">{m.acronym}</Badge>}
                            </div>
                            <p className="text-sm text-muted-foreground">{m.quickRead}</p>
                          </div>
                          <ChevronDown className="h-4 w-4 flex-shrink-0 mt-1" />
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {m.subjects.map((s) => (
                            <Badge key={s} variant="outline" className="text-xs">{s}</Badge>
                          ))}
                        </div>
                      </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent className="pt-0 space-y-3 text-sm">
                        <p className="text-foreground/80 leading-relaxed">{m.description}</p>
                        <div>
                          <h4 className="font-semibold text-emerald-700 dark:text-emerald-400 mb-1.5 flex items-center gap-1.5">
                            <Target className="h-3.5 w-3.5" /> Các bước thực hiện:
                          </h4>
                          <ol className="list-decimal list-inside space-y-1 text-foreground/75">
                            {m.steps.map((s, i) => <li key={i}>{s}</li>)}
                          </ol>
                        </div>
                        <div>
                          <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-1.5">Phù hợp nhất cho:</h4>
                          <div className="flex flex-wrap gap-1">
                            {m.bestFor.map((b) => (
                              <Badge key={b} className="bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200 hover:bg-blue-100">
                                {b}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>
              ))}
            </div>

            <Card className="bg-gradient-to-br from-blue-50 to-emerald-50 dark:from-blue-950/30 dark:to-emerald-950/30 border-blue-200 dark:border-blue-900/40 mt-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-amber-500" /> Khung lý thuyết nền tảng
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {PEDAGOGY_FRAMEWORKS.map((f) => (
                  <div key={f.name} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold">{f.name}:</span>{" "}
                      <span className="text-muted-foreground">
                        {(f as any).description || ((f as any).levels && (f as any).levels.join(" → "))}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 2: SITUATIONAL SOLVER */}
          <TabsContent value="solver" className="space-y-4 mt-6">
            <Card className="bg-card border-emerald-200 dark:border-emerald-900/40">
              <CardContent className="p-5 space-y-3">
                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Loại tình huống</label>
                    <Select value={scenarioType} onValueChange={setScenarioType}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {SCENARIO_TYPES.map((s) => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Bối cảnh học sinh (tuổi, lớp, đặc điểm)</label>
                    <Input
                      value={studentContext}
                      onChange={(e) => setStudentContext(e.target.value)}
                      placeholder="VD: Nam, lớp 11, học PTE 6 tháng, IELTS 6.0"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Mô tả thách thức cụ thể</label>
                  <Textarea
                    value={challenge}
                    onChange={(e) => setChallenge(e.target.value)}
                    placeholder="VD: Học sinh giỏi nhưng có vẻ chán PTE, không tham gia phát biểu trong 3 buổi liên tiếp..."
                    rows={4}
                  />
                </div>
                <Button onClick={solveSituation} disabled={loading} className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:opacity-90">
                  {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Sparkles className="h-4 w-4 mr-2" />}
                  Phân tích & Đề xuất giải pháp
                </Button>
              </CardContent>
            </Card>

            {situationResult && (
              <Card className="border-emerald-300 dark:border-emerald-700 bg-gradient-to-br from-emerald-50/60 to-blue-50/40 dark:from-emerald-950/30 dark:to-blue-950/20">
                <CardHeader className="pb-3 flex-row justify-between items-start">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Brain className="h-5 w-5 text-emerald-600" /> Giải pháp sư phạm
                    </CardTitle>
                    {situationResult.frameworkApplied && (
                      <Badge className="mt-2 bg-emerald-600">{situationResult.frameworkApplied}</Badge>
                    )}
                  </div>
                  <Button size="sm" variant="outline" onClick={saveSituationToDiary}>
                    <Save className="h-4 w-4 mr-1.5" /> Save Diary
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  {situationResult.diagnosis && (
                    <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-md border border-amber-200 dark:border-amber-900/40">
                      <h4 className="font-semibold mb-1 flex items-center gap-1.5"><Zap className="h-4 w-4 text-amber-600" /> Chẩn đoán nguyên nhân</h4>
                      <p>{situationResult.diagnosis}</p>
                    </div>
                  )}
                  {situationResult.immediateAction?.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-emerald-700 dark:text-emerald-400 mb-1.5">⚡ Hành động ngay</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {situationResult.immediateAction.map((a: string, i: number) => <li key={i}>{a}</li>)}
                      </ul>
                    </div>
                  )}
                  {situationResult.longTermStrategy?.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-1.5">🎯 Chiến lược dài hạn</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {situationResult.longTermStrategy.map((a: string, i: number) => <li key={i}>{a}</li>)}
                      </ul>
                    </div>
                  )}
                  {situationResult.sampleDialogue?.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-1.5">💬 Mẫu hội thoại tham khảo</h4>
                      <div className="space-y-1.5 bg-card p-3 rounded-md border">
                        {situationResult.sampleDialogue.map((d: any, i: number) => (
                          <div key={i} className={d.speaker === "Teacher" ? "text-emerald-700 dark:text-emerald-400" : "text-foreground/80 pl-4"}>
                            <span className="font-semibold">{d.speaker}:</span> {d.line}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {situationResult.redFlags?.length > 0 && (
                    <div className="p-3 bg-red-50 dark:bg-red-950/30 rounded-md border border-red-200 dark:border-red-900/40">
                      <h4 className="font-semibold mb-1 flex items-center gap-1.5 text-red-700 dark:text-red-400">
                        <AlertTriangle className="h-4 w-4" /> Cờ đỏ cần chú ý
                      </h4>
                      <ul className="list-disc list-inside space-y-1">
                        {situationResult.redFlags.map((r: string, i: number) => <li key={i}>{r}</li>)}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* TAB 3: LESSON PLAN OPTIMIZER */}
          <TabsContent value="lesson" className="space-y-4 mt-6">
            <Card>
              <CardContent className="p-5 space-y-3">
                <div className="grid md:grid-cols-3 gap-3">
                  <Input value={planTitle} onChange={(e) => setPlanTitle(e.target.value)} placeholder="Tiêu đề bài học" />
                  <Select value={planSubject} onValueChange={setPlanSubject}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["English", "Chinese", "Finnish", "Programming", "IELTS", "TOEIC", "PTE", "HSK"].map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={planLevel} onValueChange={setPlanLevel}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["Beginner", "Elementary", "Intermediate", "Upper-Intermediate", "Advanced"].map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Textarea
                  value={planText}
                  onChange={(e) => setPlanText(e.target.value)}
                  placeholder="Dán giáo án nháp ở đây (mục tiêu, các hoạt động, thời gian, tài liệu...)"
                  rows={10}
                  className="font-mono text-sm"
                />
                <Button onClick={optimizeLessonPlan} disabled={loading} className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:opacity-90">
                  {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Sparkles className="h-4 w-4 mr-2" />}
                  Phân tích & Tối ưu giáo án
                </Button>
              </CardContent>
            </Card>

            {planResult && (
              <Card className="border-blue-300 dark:border-blue-800">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">📊 AI Review</CardTitle>
                    {typeof planResult.qualityScore === "number" && (
                      <Badge className={`text-base px-3 py-1 ${planResult.qualityScore >= 80 ? "bg-emerald-600" : planResult.qualityScore >= 60 ? "bg-amber-500" : "bg-red-500"}`}>
                        Score: {planResult.qualityScore}/100
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  {planResult.strengths?.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-emerald-700 mb-1.5">✅ Điểm mạnh</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {planResult.strengths.map((s: string, i: number) => <li key={i}>{s}</li>)}
                      </ul>
                    </div>
                  )}
                  {planResult.improvements?.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-amber-700 mb-1.5">🔧 Đề xuất cải tiến</h4>
                      <div className="space-y-2">
                        {planResult.improvements.map((imp: any, i: number) => (
                          <div key={i} className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 rounded-md">
                            <div className="font-semibold text-amber-900 dark:text-amber-200">{imp.section}</div>
                            <div className="text-foreground/70 text-xs mt-1">⚠️ {imp.issue}</div>
                            <div className="text-emerald-700 dark:text-emerald-400 text-sm mt-1">💡 {imp.suggestion}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {planResult.missingElements?.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-red-700 mb-1.5">❌ Yếu tố còn thiếu</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {planResult.missingElements.map((m: string, i: number) => (
                          <Badge key={i} variant="destructive">{m}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {planResult.bloomLevels?.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-blue-700 mb-1.5">🧠 Bloom's levels covered</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {planResult.bloomLevels.map((b: string) => (
                          <Badge key={b} className="bg-blue-600">{b}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {planResult.rewriteSnippet && (
                    <div>
                      <h4 className="font-semibold text-purple-700 mb-1.5">✨ Phiên bản viết lại</h4>
                      <div className="p-3 bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/40 rounded-md whitespace-pre-wrap font-mono text-xs">
                        {planResult.rewriteSnippet}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* TAB 4: LEARNING STYLE */}
          <TabsContent value="style" className="space-y-4 mt-6">
            <Card>
              <CardContent className="p-5 space-y-3">
                <div className="grid md:grid-cols-3 gap-3">
                  <Select value={styleChoice} onValueChange={setStyleChoice}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {LEARNING_STYLES.map((s) => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Select value={styleSubject} onValueChange={setStyleSubject}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["English", "Chinese", "Finnish", "Programming", "IELTS"].map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input value={styleTopic} onChange={(e) => setStyleTopic(e.target.value)} placeholder="Chủ đề cần dạy" />
                </div>
                <Button onClick={suggestForStyle} disabled={loading} className="w-full bg-gradient-to-r from-emerald-600 to-teal-600">
                  {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Sparkles className="h-4 w-4 mr-2" />}
                  Gợi ý cách dạy
                </Button>
              </CardContent>
            </Card>

            {styleResult && (
              <Card className="border-teal-300 dark:border-teal-800">
                <CardHeader>
                  <CardTitle className="text-lg">🎯 Chiến lược cho {styleChoice} learner</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  {styleResult.approach && (
                    <p className="text-foreground/85 leading-relaxed">{styleResult.approach}</p>
                  )}
                  {styleResult.activities?.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2 text-teal-700">🎨 Hoạt động đề xuất</h4>
                      {styleResult.activities.map((a: any, i: number) => (
                        <div key={i} className="p-2.5 bg-teal-50 dark:bg-teal-950/30 rounded-md mb-2 border border-teal-200 dark:border-teal-900/40">
                          <div className="flex items-center gap-2 font-semibold text-teal-900 dark:text-teal-200">
                            {a.name} <Badge variant="outline" className="text-xs">{a.duration}</Badge>
                          </div>
                          <p className="text-xs mt-1 text-foreground/70">{a.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {styleResult.materials?.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-blue-700 mb-1.5">🛠 Materials cần chuẩn bị</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {styleResult.materials.map((m: string, i: number) => (
                          <Badge key={i} variant="secondary">{m}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {styleResult.exampleScript && (
                    <div className="p-3 bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/40 rounded-md italic">
                      "💬 {styleResult.exampleScript}"
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* TAB 5: WEEKLY CHALLENGE */}
          <TabsContent value="challenge" className="space-y-4 mt-6">
            <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-amber-200 dark:border-amber-900/40">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-amber-600" /> Teaching Challenge of the Week
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!challengeData ? (
                  <div className="text-center py-6">
                    <Trophy className="h-12 w-12 text-amber-500 mx-auto mb-3" />
                    <p className="text-muted-foreground mb-4">Chưa có thử thách nào tuần này. Hãy nhận một thử thách mới để giữ tinh thần giảng dạy luôn tươi mới!</p>
                    <Button onClick={newWeeklyChallenge} disabled={loading} className="bg-gradient-to-r from-amber-500 to-orange-500">
                      {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Sparkles className="h-4 w-4 mr-2" />}
                      Nhận thử thách mới
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold text-amber-900 dark:text-amber-200">{challengeData.title}</h3>
                        {challengeData.difficulty && (
                          <Badge className={
                            challengeData.difficulty === "Hard" ? "bg-red-600" :
                            challengeData.difficulty === "Medium" ? "bg-amber-500" : "bg-emerald-600"
                          }>{challengeData.difficulty}</Badge>
                        )}
                      </div>
                      <p className="text-foreground/85 leading-relaxed">{challengeData.description}</p>
                      {challengeData.subject && (
                        <p className="mt-2 text-sm"><span className="font-semibold">📚 Áp dụng:</span> {challengeData.subject}</p>
                      )}
                    </div>
                    {challengeData.successMetric && (
                      <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 rounded-md">
                        <h4 className="font-semibold text-emerald-700 mb-1">🎯 Tiêu chí thành công</h4>
                        <p className="text-sm">{challengeData.successMetric}</p>
                      </div>
                    )}
                    {challengeData.reflectionQuestions?.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-blue-700 mb-1.5">📝 Câu hỏi reflection</h4>
                        <ul className="list-decimal list-inside space-y-1 text-sm">
                          {challengeData.reflectionQuestions.map((q: string, i: number) => <li key={i}>{q}</li>)}
                        </ul>
                      </div>
                    )}
                    <Button onClick={newWeeklyChallenge} disabled={loading} variant="outline" className="w-full">
                      {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Sparkles className="h-4 w-4 mr-2" />}
                      Đổi thử thách khác
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 6: PERSONAL DIARY */}
          <TabsContent value="diary" className="space-y-4 mt-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-lg">📖 Personal Teaching Diary</h3>
              <Badge variant="secondary">{diary.length} entries</Badge>
            </div>
            {diary.length === 0 ? (
              <Card><CardContent className="p-8 text-center text-muted-foreground">
                <History className="h-10 w-10 mx-auto mb-2 opacity-50" />
                Chưa có ghi chép nào. Lưu các tình huống đã giải quyết từ tab "Solver" để xây dựng nhật ký phát triển sư phạm.
              </CardContent></Card>
            ) : (
              <div className="space-y-3">
                {diary.map((entry) => (
                  <Collapsible key={entry.id}>
                    <Card className="border-emerald-100">
                      <CollapsibleTrigger className="w-full text-left">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant="outline">{entry.scenario_type}</Badge>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(entry.created_at).toLocaleDateString("vi-VN")}
                                </span>
                              </div>
                              <p className="text-sm font-medium line-clamp-2">{entry.challenge}</p>
                            </div>
                            <ChevronDown className="h-4 w-4" />
                          </div>
                        </CardHeader>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <CardContent className="pt-0 text-sm space-y-2">
                          {entry.student_context && (
                            <p><strong>Bối cảnh:</strong> {entry.student_context}</p>
                          )}
                          {entry.ai_solution?.diagnosis && (
                            <p><strong>Chẩn đoán:</strong> {entry.ai_solution.diagnosis}</p>
                          )}
                          {entry.ai_solution?.immediateAction?.length > 0 && (
                            <div>
                              <strong>Hành động:</strong>
                              <ul className="list-disc list-inside text-xs">
                                {entry.ai_solution.immediateAction.slice(0, 3).map((a: string, i: number) => <li key={i}>{a}</li>)}
                              </ul>
                            </div>
                          )}
                        </CardContent>
                      </CollapsibleContent>
                    </Card>
                  </Collapsible>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
