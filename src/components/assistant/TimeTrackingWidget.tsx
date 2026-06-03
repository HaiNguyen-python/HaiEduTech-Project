import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarClock, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface Props {
  userId: string;
  onChange?: () => void;
}

// Returns a `datetime-local` formatted string for the current moment, in local TZ.
const nowLocal = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 16);
};

const TimeTrackingWidget = ({ userId, onChange }: Props) => {
  const [clockIn, setClockIn] = useState<string>(nowLocal());
  const [clockOut, setClockOut] = useState<string>(nowLocal());
  const [submitting, setSubmitting] = useState(false);

  const durationHours = (() => {
    if (!clockIn || !clockOut) return 0;
    const inMs = new Date(clockIn).getTime();
    const outMs = new Date(clockOut).getTime();
    if (Number.isNaN(inMs) || Number.isNaN(outMs)) return 0;
    return Math.max(0, (outMs - inMs) / 3600000);
  })();

  const handleSubmit = async () => {
    if (!clockIn || !clockOut) {
      toast.error("Vui lòng nhập thời gian bắt đầu và kết thúc");
      return;
    }
    const inDate = new Date(clockIn);
    const outDate = new Date(clockOut);
    if (outDate <= inDate) {
      toast.error("Thời gian kết thúc phải sau thời gian bắt đầu");
      return;
    }
    if (outDate.getTime() - inDate.getTime() > 16 * 3600 * 1000) {
      toast.error("Một phiên không thể dài hơn 16 giờ");
      return;
    }
    setSubmitting(true);
    // Server-side trigger computes duration_hours, salary and status.
    const { error } = await supabase.from("time_logs").insert({
      user_id: userId,
      clock_in: inDate.toISOString(),
      clock_out: outDate.toISOString(),
    });
    setSubmitting(false);
    if (error) {
      toast.error("Không thể ghi nhận phiên làm việc", { description: error.message });
      return;
    }
    toast.success("Đã ghi nhận phiên làm việc");
    setClockIn(nowLocal());
    setClockOut(nowLocal());
    onChange?.();
  };

  return (
    <Card className="border-border/60 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/5 via-background to-emerald-500/5 border-b border-border/60">
        <CardTitle className="text-base flex items-center gap-2">
          <CalendarClock className="w-4 h-4 text-primary" />
          Ghi nhận phiên làm việc
        </CardTitle>
        <p className="text-xs text-muted-foreground mt-1">
          Tự điền khoảng thời gian bạn đã làm việc trong ngày. Hệ thống tự tổng hợp công và lương vào bảng tháng.
        </p>
      </CardHeader>
      <CardContent className="p-6 space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Bắt đầu
            </label>
            <Input
              type="datetime-local"
              value={clockIn}
              onChange={(e) => setClockIn(e.target.value)}
              className="font-mono"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Kết thúc
            </label>
            <Input
              type="datetime-local"
              value={clockOut}
              onChange={(e) => setClockOut(e.target.value)}
              className="font-mono"
            />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg border border-border/60 bg-secondary/40 px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="w-4 h-4 text-primary" />
            Tổng thời lượng
          </div>
          <span className="text-lg font-semibold text-foreground tabular-nums">
            {Math.floor(durationHours)}<span className="text-xs font-normal text-muted-foreground"> giờ </span>
            {Math.round((durationHours - Math.floor(durationHours)) * 60)}<span className="text-xs font-normal text-muted-foreground"> phút</span>
            <span className="ml-2 text-xs text-muted-foreground">({durationHours.toFixed(2)}h)</span>
          </span>
        </div>

        <Button onClick={handleSubmit} disabled={submitting || durationHours <= 0} size="lg" className="w-full gap-2">
          {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <CalendarClock className="w-4 h-4" />}
          Lưu phiên làm việc
        </Button>
      </CardContent>
    </Card>
  );
};

export default TimeTrackingWidget;
