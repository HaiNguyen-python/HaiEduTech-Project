import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Square, Clock, Loader2 } from "lucide-react";
import { toast } from "sonner";

// Hourly rate (VND) is enforced by the DB trigger; this constant is only
// for live preview while clocked in.
const HOURLY_RATE = 50000;

interface ActiveLog {
  id: string;
  clock_in: string;
}

const fmtVnd = (n: number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(n);

const fmtDuration = (sec: number) => {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};

interface Props {
  userId: string;
  onChange?: () => void;
}

const TimeTrackingWidget = ({ userId, onChange }: Props) => {
  const [active, setActive] = useState<ActiveLog | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [now, setNow] = useState(Date.now());

  const fetchActive = useCallback(async () => {
    const { data } = await supabase
      .from("time_logs")
      .select("id, clock_in")
      .eq("user_id", userId)
      .eq("status", "active")
      .order("clock_in", { ascending: false })
      .limit(1)
      .maybeSingle();
    setActive(data as ActiveLog | null);
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    fetchActive();
  }, [fetchActive]);

  // Live tick every second when clocked in
  useEffect(() => {
    if (!active) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [active]);

  const handleStart = async () => {
    setSubmitting(true);
    const { error } = await supabase
      .from("time_logs")
      .insert({ user_id: userId, clock_in: new Date().toISOString() });
    setSubmitting(false);
    if (error) {
      toast.error("Không thể bắt đầu", { description: error.message });
      return;
    }
    toast.success("Đã bắt đầu phiên làm việc!");
    fetchActive();
    onChange?.();
  };

  const handleStop = async () => {
    if (!active) return;
    setSubmitting(true);
    const { error } = await supabase
      .from("time_logs")
      .update({ clock_out: new Date().toISOString() })
      .eq("id", active.id);
    setSubmitting(false);
    if (error) {
      toast.error("Không thể kết thúc", { description: error.message });
      return;
    }
    toast.success("Đã kết thúc và tính lương!");
    setActive(null);
    onChange?.();
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6 flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  const elapsedSec = active ? Math.max(0, Math.floor((now - new Date(active.clock_in).getTime()) / 1000)) : 0;
  const previewSalary = active ? (elapsedSec / 3600) * HOURLY_RATE : 0;

  return (
    <Card className="border-border/60 bg-gradient-to-br from-primary/5 via-background to-emerald-500/5">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Chấm Công / Time Tracking</h2>
        </div>

        {active ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Thời gian đang làm</p>
                <p className="text-3xl font-bold font-mono tabular-nums text-primary">{fmtDuration(elapsedSec)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Lương dự kiến (50.000đ/giờ)</p>
                <p className="text-3xl font-bold tabular-nums text-emerald-600">{fmtVnd(previewSalary)}</p>
              </div>
            </div>
            <Button
              onClick={handleStop}
              disabled={submitting}
              size="lg"
              variant="destructive"
              className="w-full gap-2"
            >
              <Square className="w-5 h-5 fill-current" /> Kết Thúc Công Việc
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Bấm Bắt Đầu để mở phiên làm việc mới. Hệ thống sẽ tự tính giờ và lương theo mức <b>50.000 VND/giờ</b>.
            </p>
            <Button
              onClick={handleStart}
              disabled={submitting}
              size="lg"
              className="w-full gap-2 bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <Play className="w-5 h-5 fill-current" /> Bắt Đầu Làm Việc
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TimeTrackingWidget;
