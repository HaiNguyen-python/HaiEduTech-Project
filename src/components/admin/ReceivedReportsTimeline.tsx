import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Loader2, MessageSquare } from "lucide-react";

interface ReportRow {
  id: string;
  user_id: string;
  work_summary: string;
  feedback: string | null;
  screenshot_urls: string[];
  created_at: string;
  authorName?: string;
  signedUrls?: string[];
}

const ReceivedReportsTimeline = () => {
  const [reports, setReports] = useState<ReportRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [zoom, setZoom] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("daily_reports")
        .select("id, user_id, work_summary, feedback, screenshot_urls, created_at")
        .order("created_at", { ascending: false })
        .limit(50);

      const reportsBase = (data as ReportRow[]) || [];

      // Fetch author names
      const ids = [...new Set(reportsBase.map((r) => r.user_id))];
      const { data: profiles } = ids.length
        ? await supabase.from("profiles").select("id, full_name").in("id", ids)
        : { data: [] as any };
      const nameMap = new Map<string, string>();
      for (const p of profiles || []) nameMap.set((p as any).id, (p as any).full_name || "Cộng tác viên");

      // Generate signed URLs for each report's attachments (1h)
      const enriched: ReportRow[] = await Promise.all(
        reportsBase.map(async (r) => {
          let signed: string[] = [];
          if (r.screenshot_urls?.length) {
            const { data: urls } = await supabase.storage
              .from("report-attachments")
              .createSignedUrls(r.screenshot_urls, 3600);
            signed = (urls || []).map((u: any) => u.signedUrl).filter(Boolean);
          }
          return { ...r, authorName: nameMap.get(r.user_id), signedUrls: signed };
        })
      );

      setReports(enriched);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-primary" />
          Báo cáo từ cộng tác viên
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
        ) : reports.length === 0 ? (
          <p className="text-sm text-muted-foreground py-6 text-center">Chưa có báo cáo nào.</p>
        ) : (
          <ol className="relative border-l border-border space-y-6 pl-5">
            {reports.map((r) => (
              <li key={r.id} className="relative">
                <span className="absolute -left-[27px] top-1.5 w-3 h-3 rounded-full bg-primary ring-4 ring-primary/15" />
                <div className="flex items-baseline justify-between flex-wrap gap-2 mb-1">
                  <p className="font-semibold text-foreground text-sm">{r.authorName}</p>
                  <p className="text-xs text-muted-foreground tabular-nums">
                    {new Date(r.created_at).toLocaleString("vi-VN")}
                  </p>
                </div>
                <div className="rounded-lg bg-secondary/50 border border-border/60 p-3 space-y-2">
                  <p className="text-sm text-foreground whitespace-pre-wrap">{r.work_summary}</p>
                  {r.feedback && (
                    <div className="text-sm border-l-2 border-amber-500 pl-2 text-muted-foreground italic whitespace-pre-wrap">
                      💡 {r.feedback}
                    </div>
                  )}
                  {r.signedUrls && r.signedUrls.length > 0 && (
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 pt-1">
                      {r.signedUrls.map((u, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setZoom(u)}
                          className="aspect-square rounded-md overflow-hidden border border-border hover:ring-2 hover:ring-primary transition"
                        >
                          <img src={u} alt={`Bug screenshot ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>
        )}
      </CardContent>

      <Dialog open={!!zoom} onOpenChange={(o) => !o && setZoom(null)}>
        <DialogContent className="max-w-4xl p-2 bg-background">
          <DialogTitle className="sr-only">Screenshot preview</DialogTitle>
          {zoom && <img src={zoom} alt="Full screenshot" className="w-full h-auto max-h-[80vh] object-contain rounded" />}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ReceivedReportsTimeline;
