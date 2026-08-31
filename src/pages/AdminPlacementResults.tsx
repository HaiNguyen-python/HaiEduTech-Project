/**
 * @file AdminPlacementResults.tsx
 * @description Diagnostic dashboard for Teacher Hai to review placement
 *   test submissions: per-skill radar/bar chart, essay viewer, audio
 *   playback queue, and class-assignment dropdown.
 *
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, RefreshCw, FileText, AudioLines, Loader2, CheckCircle2,
  Sparkles, Download, AlertCircle,
} from "lucide-react";
import {
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, Radar, BarChart, Bar, XAxis, YAxis, Tooltip,
} from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import { PLACEMENT_TEST } from "@/data/placementTest";
import { RECOMMENDED_CLASSES } from "@/lib/placement/placementModel";

interface PlacementBandStat {
  cefr: string;
  right: number;
  total: number;
  rate: number | null;
  reached: boolean;
}

interface PlacementInsight {
  recommended_class?: string;
  confidence?: string;
  highest_secure_band?: string | null;
  weakest_areas?: string[];
  notes?: string[];
  bands?: PlacementBandStat[];
  early_exit_band?: string | null;
}

interface PlacementRow {
  id: string;
  user_id: string;
  student_name: string | null;
  listening_score: number;
  reading_score: number;
  writing_score: number;
  speaking_score: number;
  total_score: number;
  cefr_band: string | null;
  answers: Record<string, unknown> | null;
  essays: Record<string, string>;
  audio_urls: Record<string, string>;
  assigned_class: string | null;
  status: string;
  created_at: string;
}

const FRAME =
  "bg-white border border-slate-200 rounded-2xl shadow-[0_1px_2px_rgba(15,23,42,0.04)]";

const CLASS_OPTIONS = [
  ...RECOMMENDED_CLASSES,
  "Cambridge Starters",
  "Cambridge Movers/Flyers",
  "Chinese HSK 1-2",
  "Chinese HSK 3-4",
  "Finnish YKI A2",
  "Programming Intro Cohort",
  "Custom 1-on-1 Coaching",
];

const CONFIDENCE_LABEL: Record<string, string> = {
  high: "High confidence",
  medium: "Medium confidence",
  low: "Low confidence",
};

const readInsight = (row: PlacementRow | null): PlacementInsight | null => {
  const raw = (row?.answers as Record<string, unknown> | null)?.__placement;
  if (!raw || typeof raw !== "object") return null;
  return raw as PlacementInsight;
};

/** Speaking recordings live in a private bucket - sign each path on demand. */
const SpeakingClip = ({ path }: { path: string }) => {
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    setUrl(null); setError(false);
    // Legacy rows may already hold a full URL.
    if (/^https?:\/\//.test(path)) { setUrl(path); return; }
    void supabase.storage.from("placement-audio").createSignedUrl(path, 3600)
      .then(({ data, error: e }) => {
        if (!active) return;
        if (e || !data?.signedUrl) setError(true);
        else setUrl(data.signedUrl);
      });
    return () => { active = false; };
  }, [path]);

  if (error) {
    return (
      <p className="text-xs text-rose-600 flex items-center gap-1">
        <AlertCircle className="w-3 h-3" /> Could not load the recording
      </p>
    );
  }
  if (!url) {
    return (
      <p className="text-xs text-slate-500 flex items-center gap-1">
        <Loader2 className="w-3 h-3 animate-spin" /> Loading audio…
      </p>
    );
  }
  return (
    <div className="space-y-1">
      <audio controls src={url} className="w-full h-9" />
      <a
        href={url} download
        className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-900"
      >
        <Download className="w-3 h-3" /> Download
      </a>
    </div>
  );
};


const AdminPlacementResults = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState<PlacementRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "approved">("all");
  const [groupByClass, setGroupByClass] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("placement_test_results")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) {
      toast.error("Could not load results.");
    } else {
      const list = (data ?? []) as unknown as PlacementRow[];
      setRows(list);
      setSelectedId((cur) => cur ?? list[0]?.id ?? null);
    }
    setLoading(false);
  }, []);

  useEffect(() => { void load(); }, [load]);

  // Auto-refresh when a student submits a new run.
  useEffect(() => {
    const channel = supabase
      .channel("placement-results-admin")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "placement_test_results" },
        () => { void load(); }
      )
      .subscribe();
    return () => { void supabase.removeChannel(channel); };
  }, [load]);

  const selected = useMemo(
    () => rows.find((r) => r.id === selectedId) ?? null,
    [rows, selectedId]
  );
  const insight = useMemo(() => readInsight(selected), [selected]);

  const visibleRows = useMemo(() => {
    const filtered = statusFilter === "all"
      ? rows
      : rows.filter((r) => (r.status ?? "pending") === statusFilter);
    if (!groupByClass) return filtered;
    return [...filtered].sort((a, b) => {
      const ka = readInsight(a)?.recommended_class ?? a.assigned_class ?? "zzz";
      const kb = readInsight(b)?.recommended_class ?? b.assigned_class ?? "zzz";
      return ka.localeCompare(kb) || b.created_at.localeCompare(a.created_at);
    });
  }, [rows, statusFilter, groupByClass]);

  const chartData = useMemo(() => selected ? [
    { skill: "Listening",  value: selected.listening_score },
    { skill: "Reading",    value: selected.reading_score },
    { skill: "Writing",    value: selected.writing_score },
    { skill: "Speaking",   value: selected.speaking_score },
  ] : [], [selected]);


  const saveAssignment = async (cls: string) => {
    if (!selected) return;
    const { error } = await supabase
      .from("placement_test_results")
      .update({ assigned_class: cls, status: "approved" })
      .eq("id", selected.id);
    if (error) {
      toast.error("Could not save assignment.");
    } else {
      toast.success(`Assigned to ${cls}`);
      void load();
    }
  };

  const speakingQs = PLACEMENT_TEST.filter((q) => q.skill === "speaking");
  const essayQs = PLACEMENT_TEST.filter(
    (q) => q.type === "write-picture" || q.type === "write-essay"
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <header className="flex items-center justify-between mb-6">
          <div>
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 mb-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <h1 className="text-2xl font-bold text-slate-900">
              Placement Test Diagnostic Results
            </h1>
            <p className="text-sm text-slate-500">
              {rows.length} submissions · review skill breakdowns and approve class placement.
            </p>
          </div>
          <Button variant="outline" onClick={load} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-1 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </header>

        <div className="grid lg:grid-cols-[280px_1fr] gap-5">
          {/* ── Submission list ─────────────────────────────── */}
          <aside className={`${FRAME} p-3 max-h-[80vh] overflow-y-auto`}>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {(["all", "pending", "approved"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold border transition-colors
                    ${statusFilter === s
                      ? "bg-slate-900 text-white border-slate-900"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}
                >
                  {s === "all" ? "All" : s === "pending" ? "Pending" : "Approved"}
                </button>
              ))}
              <button
                onClick={() => setGroupByClass((v) => !v)}
                className={`px-2.5 py-1 rounded-full text-xs font-semibold border transition-colors
                  ${groupByClass
                    ? "bg-emerald-600 text-white border-emerald-600"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}
              >
                Group by class
              </button>
            </div>
            {loading && rows.length === 0 && (
              <div className="text-sm text-slate-500 p-3 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> Loading…
              </div>
            )}
            {!loading && visibleRows.length === 0 && (
              <p className="text-sm text-slate-500 p-3">No submissions yet.</p>
            )}
            {visibleRows.map((r) => (
              <button
                key={r.id}

                onClick={() => setSelectedId(r.id)}
                className={`w-full text-left px-3 py-2 rounded-lg mb-1 border transition-all
                  ${selectedId === r.id
                    ? "border-slate-900 bg-slate-50"
                    : "border-transparent hover:bg-slate-50"}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-slate-900 truncate">
                    {r.student_name ?? "Student"}
                  </span>
                  <span className="text-xs font-bold text-slate-700">{r.cefr_band}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500 mt-0.5">
                  <span>{new Date(r.created_at).toLocaleDateString()}</span>
                  <span>{r.total_score}/100</span>
                </div>
                {r.status === "approved" ? (
                  <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 mt-1">
                    <CheckCircle2 className="w-3 h-3" /> {r.assigned_class}
                  </span>
                ) : readInsight(r)?.recommended_class ? (
                  <span className="inline-flex items-center gap-1 text-[11px] text-slate-500 mt-1">
                    <Sparkles className="w-3 h-3" /> {readInsight(r)?.recommended_class}
                  </span>
                ) : null}

              </button>
            ))}
          </aside>

          {/* ── Diagnostic profile ──────────────────────────── */}
          {!selected ? (
            <div className={`${FRAME} p-10 text-center text-slate-500`}>
              Select a submission to view diagnostics.
            </div>
          ) : (
            <section className="space-y-5">
              {/* Header card */}
              <div className={`${FRAME} p-5`}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      {selected.student_name}
                    </h2>
                    <p className="text-sm text-slate-500">
                      Submitted {new Date(selected.created_at).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-slate-900">
                        {selected.total_score}
                      </div>
                      <div className="text-xs text-slate-500">Total / 100</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-emerald-600">
                        {selected.cefr_band}
                      </div>
                      <div className="text-xs text-slate-500">CEFR Band</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Placement analysis */}
              <div className={`${FRAME} p-5`}>
                <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> Placement analysis
                </h3>
                {!insight ? (
                  <p className="text-sm italic text-slate-500">
                    Submission from before the placement upgrade - no level breakdown stored.
                  </p>
                ) : (
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className="px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-semibold">
                        {insight.recommended_class ?? "No class suggestion"}
                      </span>
                      {insight.confidence && (
                        <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                          {CONFIDENCE_LABEL[insight.confidence] ?? insight.confidence}
                        </span>
                      )}
                      <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                        Highest secure band: {insight.highest_secure_band ?? "none"}
                      </span>
                      {insight.early_exit_band && (
                        <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold">
                          Stopped early at {insight.early_exit_band}
                        </span>
                      )}
                    </div>

                    {insight.bands && insight.bands.length > 0 && (
                      <div className="overflow-x-auto">
                        <table className="w-full min-w-[420px] text-sm">
                          <thead>
                            <tr className="text-left text-xs text-slate-500">
                              <th className="py-1.5">Level</th>
                              <th className="py-1.5">Correct</th>
                              <th className="py-1.5">Accuracy</th>
                              <th className="py-1.5">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {insight.bands.map((b) => (
                              <tr key={b.cefr} className="border-t border-slate-100">
                                <td className="py-1.5 font-semibold text-slate-800">{b.cefr}</td>
                                <td className="py-1.5 text-slate-700">{b.right}/{b.total}</td>
                                <td className="py-1.5 text-slate-700">
                                  {b.rate == null ? "—" : `${Math.round(b.rate * 100)}%`}
                                </td>
                                <td className="py-1.5">
                                  {b.reached ? (
                                    <span className="text-emerald-700 text-xs font-medium">Attempted</span>
                                  ) : (
                                    <span className="text-slate-400 text-xs italic">Not reached</span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {insight.weakest_areas && insight.weakest_areas.length > 0 && (
                      <p className="text-sm text-slate-700">
                        <b>Focus first on:</b> {insight.weakest_areas.join(" · ")}
                      </p>
                    )}
                    {insight.notes?.map((n) => (
                      <p key={n} className="text-xs text-slate-500">{n}</p>
                    ))}
                  </div>
                )}
              </div>



              {/* Charts row */}
              <div className="grid md:grid-cols-2 gap-5">
                <div className={`${FRAME} p-5`}>
                  <h3 className="text-sm font-semibold text-slate-700 mb-3">
                    Skill Radar
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={chartData}>
                        <PolarGrid stroke="#e2e8f0" />
                        <PolarAngleAxis dataKey="skill" tick={{ fill: "#334155", fontSize: 12 }} />
                        <PolarRadiusAxis domain={[0, 100]} tick={{ fill: "#94a3b8", fontSize: 10 }} />
                        <Radar
                          dataKey="value" stroke="#0f172a"
                          fill="#0f172a" fillOpacity={0.18}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className={`${FRAME} p-5`}>
                  <h3 className="text-sm font-semibold text-slate-700 mb-3">
                    Score Breakdown
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData}>
                        <XAxis dataKey="skill" tick={{ fontSize: 12, fill: "#334155" }} />
                        <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "#94a3b8" }} />
                        <Tooltip />
                        <Bar dataKey="value" fill="#0f172a" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Essays */}
              <div className={`${FRAME} p-5`}>
                <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4" /> Written responses
                </h3>
                <div className="space-y-4">
                  {essayQs.map((q) => {
                    const text = selected.essays?.[String(q.id)];
                    return (
                      <div key={q.id} className="border border-slate-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 rounded bg-slate-100 text-xs font-semibold text-slate-700">
                            Q{q.id}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-slate-900 text-xs font-semibold text-white">
                            {q.cefr}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mb-2">{q.prompt}</p>
                        <p className="text-sm text-slate-800 whitespace-pre-wrap leading-6">
                          {text?.trim() || <span className="italic text-slate-400">— no answer —</span>}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Speaking audio */}
              <div className={`${FRAME} p-5`}>
                <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                  <AudioLines className="w-4 h-4" /> Speaking recordings
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {speakingQs.map((q) => {
                    const url = selected.audio_urls?.[String(q.id)];
                    return (
                      <div key={q.id} className="border border-slate-200 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-0.5 rounded bg-slate-100 text-xs font-semibold text-slate-700">
                            Q{q.id}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-slate-900 text-xs font-semibold text-white">
                            {q.cefr}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mb-2 line-clamp-2">{q.prompt}</p>
                        {url ? (
                          <audio controls src={url} className="w-full h-9" />
                        ) : (
                          <p className="text-xs italic text-slate-400">No recording uploaded</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Class assignment */}
              <div className={`${FRAME} p-5`}>
                <h3 className="text-sm font-semibold text-slate-700 mb-3">
                  Approve class placement
                </h3>
                <div className="flex flex-wrap items-center gap-3">
                  <select
                    value={selected.assigned_class ?? ""}
                    onChange={(e) => saveAssignment(e.target.value)}
                    className="flex-1 min-w-[240px] px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
                  >
                    <option value="" disabled>Select recommended class…</option>
                    {CLASS_OPTIONS.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  {selected.status === "approved" && (
                    <span className="inline-flex items-center gap-1 text-sm text-emerald-700 font-medium">
                      <CheckCircle2 className="w-4 h-4" /> Approved
                    </span>
                  )}
                </div>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminPlacementResults;
