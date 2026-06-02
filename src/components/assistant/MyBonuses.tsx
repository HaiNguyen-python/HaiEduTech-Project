import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gift, Loader2, Sparkles } from "lucide-react";

interface BonusRow {
  id: string;
  amount: number;
  reason: string;
  created_at: string;
}

const fmtVnd = (n: number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(n);

interface Props {
  userId: string;
}

// Shows bonuses awarded to the assistant in the current month.
const MyBonuses = ({ userId }: Props) => {
  const [rows, setRows] = useState<BonusRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const monthStart = new Date();
      monthStart.setDate(1);
      monthStart.setHours(0, 0, 0, 0);
      const { data } = await supabase
        .from("assistant_bonuses")
        .select("id, amount, reason, created_at")
        .eq("user_id", userId)
        .gte("created_at", monthStart.toISOString())
        .order("created_at", { ascending: false });
      setRows((data as BonusRow[]) || []);
      setLoading(false);
    };
    load();
  }, [userId]);

  const total = rows.reduce((s, r) => s + Number(r.amount || 0), 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center justify-between gap-2">
          <span className="flex items-center gap-2">
            <Gift className="w-4 h-4 text-amber-500" />
            Tiền thưởng tháng này
          </span>
          <span className="text-sm font-normal text-muted-foreground">
            Tổng: <b className="text-amber-600">{fmtVnd(total)}</b>
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-6">
            <Loader2 className="w-5 h-5 animate-spin text-primary" />
          </div>
        ) : rows.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4 text-center">
            Chưa có khoản thưởng nào trong tháng. Hoàn thành tốt công việc để nhận thưởng!
          </p>
        ) : (
          <ul className="space-y-2">
            {rows.map((r) => (
              <li
                key={r.id}
                className="flex items-start justify-between gap-3 p-3 rounded-lg bg-amber-500/5 border border-amber-500/20"
              >
                <div className="flex items-start gap-2 min-w-0">
                  <Sparkles className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm text-foreground break-words">{r.reason}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {new Date(r.created_at).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                </div>
                <span className="tabular-nums font-bold text-amber-600 whitespace-nowrap">
                  +{fmtVnd(r.amount)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export default MyBonuses;
