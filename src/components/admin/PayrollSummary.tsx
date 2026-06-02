import { Fragment, useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Loader2, Wallet, Gift, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface BonusRow {
  id: string;
  user_id: string;
  amount: number;
  reason: string;
  created_at: string;
}

interface Aggregated {
  user_id: string;
  name: string;
  entries: number;
  totalHours: number;
  baseSalary: number;
  bonusTotal: number;
  bonuses: BonusRow[];
}

const fmtVnd = (n: number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(n);

const PRESET_BONUSES = [100_000, 200_000, 500_000, 1_000_000];

const PayrollSummary = () => {
  const [rows, setRows] = useState<Aggregated[]>([]);
  const [loading, setLoading] = useState(true);
  // Bonus grant dialog state
  const [target, setTarget] = useState<Aggregated | null>(null);
  const [amount, setAmount] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);

    const [{ data: logs }, { data: profiles }, { data: assistantRoles }, { data: bonuses }] = await Promise.all([
      supabase
        .from("time_logs")
        .select("user_id, duration_hours, calculated_salary, status")
        .eq("status", "completed")
        .gte("clock_in", monthStart.toISOString()),
      supabase.from("profiles").select("id, full_name"),
      supabase.from("user_roles").select("user_id").eq("role", "assistant"),
      supabase
        .from("assistant_bonuses")
        .select("id, user_id, amount, reason, created_at")
        .gte("created_at", monthStart.toISOString())
        .order("created_at", { ascending: false }),
    ]);

    const nameMap = new Map<string, string>();
    for (const p of profiles || []) nameMap.set((p as any).id, (p as any).full_name || "Cộng tác viên");

    const assistantIds = new Set((assistantRoles || []).map((r: any) => r.user_id));

    const agg = new Map<string, Aggregated>();
    for (const uid of assistantIds) {
      agg.set(uid, {
        user_id: uid,
        name: nameMap.get(uid) || "Cộng tác viên",
        entries: 0,
        totalHours: 0,
        baseSalary: 0,
        bonusTotal: 0,
        bonuses: [],
      });
    }
    for (const l of logs || []) {
      const uid = (l as any).user_id;
      const cur =
        agg.get(uid) ||
        { user_id: uid, name: nameMap.get(uid) || "Cộng tác viên", entries: 0, totalHours: 0, baseSalary: 0, bonusTotal: 0, bonuses: [] };
      cur.entries += 1;
      cur.totalHours += Number((l as any).duration_hours) || 0;
      cur.baseSalary += Number((l as any).calculated_salary) || 0;
      agg.set(uid, cur);
    }
    for (const b of bonuses || []) {
      const uid = (b as any).user_id;
      const cur =
        agg.get(uid) ||
        { user_id: uid, name: nameMap.get(uid) || "Cộng tác viên", entries: 0, totalHours: 0, baseSalary: 0, bonusTotal: 0, bonuses: [] };
      cur.bonuses.push(b as BonusRow);
      cur.bonusTotal += Number((b as any).amount) || 0;
      agg.set(uid, cur);
    }

    const arr = Array.from(agg.values()).sort(
      (a, b) => b.baseSalary + b.bonusTotal - (a.baseSalary + a.bonusTotal),
    );
    setRows(arr);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const openGrant = (row: Aggregated) => {
    setTarget(row);
    setAmount("");
    setReason("");
  };

  const submitBonus = async () => {
    if (!target) return;
    const numAmount = Number(amount);
    if (!numAmount || numAmount <= 0) {
      toast.error("Vui lòng nhập số tiền thưởng hợp lệ");
      return;
    }
    if (!reason.trim()) {
      toast.error("Vui lòng nhập lý do thưởng");
      return;
    }
    setSubmitting(true);
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase.from("assistant_bonuses").insert({
      user_id: target.user_id,
      amount: numAmount,
      reason: reason.trim(),
      granted_by: user?.id,
    });
    setSubmitting(false);
    if (error) {
      toast.error("Không thể trao thưởng", { description: error.message });
      return;
    }
    toast.success(`Đã trao thưởng ${fmtVnd(numAmount)} cho ${target.name}!`);
    setTarget(null);
    load();
  };

  const revokeBonus = async (id: string) => {
    const ok = window.confirm("Thu hồi khoản thưởng này?");
    if (!ok) return;
    const { error } = await supabase.from("assistant_bonuses").delete().eq("id", id);
    if (error) {
      toast.error("Không thể thu hồi", { description: error.message });
      return;
    }
    toast.success("Đã thu hồi khoản thưởng");
    load();
  };

  const grandHours = rows.reduce((s, r) => s + r.totalHours, 0);
  const grandBase = rows.reduce((s, r) => s + r.baseSalary, 0);
  const grandBonus = rows.reduce((s, r) => s + r.bonusTotal, 0);
  const grandTotal = grandBase + grandBonus;

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Wallet className="w-4 h-4 text-emerald-600" />
            Tổng kết thu nhập tháng này (Lương cứng 50.000 VND/giờ + Thưởng)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : rows.length === 0 ? (
            <p className="text-sm text-muted-foreground py-6 text-center">Chưa có cộng tác viên nào.</p>
          ) : (
            <>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cộng tác viên</TableHead>
                      <TableHead className="text-right">Phiên</TableHead>
                      <TableHead className="text-right">Tổng giờ</TableHead>
                      <TableHead className="text-right">Lương cứng</TableHead>
                      <TableHead className="text-right">Thưởng</TableHead>
                      <TableHead className="text-right">Tổng nhận</TableHead>
                      <TableHead className="text-right">Hành động</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rows.map((r) => (
                      <>
                        <TableRow key={r.user_id}>
                          <TableCell className="font-medium">{r.name}</TableCell>
                          <TableCell className="text-right tabular-nums">{r.entries}</TableCell>
                          <TableCell className="text-right tabular-nums">{r.totalHours.toFixed(2)}</TableCell>
                          <TableCell className="text-right tabular-nums">{fmtVnd(r.baseSalary)}</TableCell>
                          <TableCell className="text-right tabular-nums text-amber-600 font-medium">
                            {r.bonusTotal > 0 ? fmtVnd(r.bonusTotal) : "—"}
                          </TableCell>
                          <TableCell className="text-right tabular-nums text-emerald-600 font-bold">
                            {fmtVnd(r.baseSalary + r.bonusTotal)}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button size="sm" variant="outline" className="gap-1.5" onClick={() => openGrant(r)}>
                              <Gift className="w-3.5 h-3.5" /> Thưởng
                            </Button>
                          </TableCell>
                        </TableRow>
                        {r.bonuses.length > 0 && (
                          <TableRow key={`${r.user_id}-bonuses`} className="bg-amber-500/5 hover:bg-amber-500/5">
                            <TableCell colSpan={7} className="py-2">
                              <div className="space-y-1.5">
                                <div className="text-xs font-medium text-muted-foreground">Lịch sử thưởng tháng này:</div>
                                {r.bonuses.map((b) => (
                                  <div key={b.id} className="flex items-center justify-between text-xs gap-3 px-2 py-1 rounded bg-background">
                                    <span className="text-muted-foreground tabular-nums whitespace-nowrap">
                                      {new Date(b.created_at).toLocaleDateString("vi-VN")}
                                    </span>
                                    <span className="flex-1 truncate">{b.reason}</span>
                                    <span className="tabular-nums font-semibold text-amber-600 whitespace-nowrap">{fmtVnd(b.amount)}</span>
                                    <button
                                      onClick={() => revokeBonus(b.id)}
                                      className="text-muted-foreground hover:text-destructive transition-colors"
                                      title="Thu hồi"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm border-t pt-3 flex-wrap gap-2">
                <span className="text-muted-foreground">Tổng cộng tháng này</span>
                <span className="font-bold">
                  {grandHours.toFixed(2)}h · Lương {fmtVnd(grandBase)} ·{" "}
                  <span className="text-amber-600">Thưởng {fmtVnd(grandBonus)}</span> ={" "}
                  <span className="text-emerald-600">{fmtVnd(grandTotal)}</span>
                </span>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!target} onOpenChange={(o) => !o && setTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-amber-500" /> Trao thưởng cho {target?.name}
            </DialogTitle>
            <DialogDescription>
              Ghi nhận đóng góp xuất sắc của Cộng tác viên. Khoản thưởng sẽ được cộng vào thu nhập tháng này.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bonus-amount">Số tiền thưởng (VND)</Label>
              <Input
                id="bonus-amount"
                type="number"
                inputMode="numeric"
                min={1000}
                step={1000}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="VD: 200000"
              />
              <div className="flex flex-wrap gap-1.5 pt-1">
                {PRESET_BONUSES.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setAmount(String(p))}
                    className="text-xs px-2 py-1 rounded-md bg-secondary hover:bg-secondary/70 transition-colors tabular-nums"
                  >
                    +{fmtVnd(p)}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bonus-reason">Lý do thưởng</Label>
              <Textarea
                id="bonus-reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="VD: Hoàn thành xuất sắc đợt rà soát đề HSK, phát hiện và sửa 30+ lỗi dữ liệu..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setTarget(null)} disabled={submitting}>
              Hủy
            </Button>
            <Button onClick={submitBonus} disabled={submitting} className="gap-1.5">
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Gift className="w-4 h-4" />}
              Xác nhận trao thưởng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PayrollSummary;
