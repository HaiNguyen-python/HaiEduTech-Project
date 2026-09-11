/**
 * DataIntegrityCard — read-only admin data checks (duplicate students,
 * empty classes, undelivered assignment notifications).
 *
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useCallback, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw, Database, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { runAdminIntegrityChecks, type IntegrityCheck } from "@/lib/adminIntegrity";

const ICON = {
  ok: <CheckCircle2 className="w-4 h-4 text-emerald-600" />,
  warn: <AlertTriangle className="w-4 h-4 text-amber-600" />,
  fail: <XCircle className="w-4 h-4 text-red-600" />,
};

const DataIntegrityCard = () => {
  const [checks, setChecks] = useState<IntegrityCheck[]>([]);
  const [loading, setLoading] = useState(true);

  const run = useCallback(async () => {
    setLoading(true);
    setChecks(await runAdminIntegrityChecks());
    setLoading(false);
  }, []);

  useEffect(() => { void run(); }, [run]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-3 space-y-0">
        <CardTitle className="text-base flex items-center gap-2">
          <Database className="w-4 h-4 text-primary" />
          Toàn vẹn dữ liệu / Data integrity
        </CardTitle>
        <Button variant="outline" size="sm" onClick={run} disabled={loading} className="gap-1.5">
          {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
          Kiểm tra lại
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {loading && checks.length === 0 ? (
          <p className="text-sm text-muted-foreground">Đang kiểm tra dữ liệu…</p>
        ) : (
          checks.map((c) => (
            <div key={c.name} className="flex items-start gap-2 rounded-lg border border-border p-3">
              <span className="mt-0.5">{ICON[c.status]}</span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground">
                  {c.nameVi} <span className="font-normal text-muted-foreground">/ {c.name}</span>
                </p>
                <p className="text-sm text-muted-foreground break-words">{c.detailVi}</p>
                <p className="text-xs text-muted-foreground break-words">{c.detail}</p>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default DataIntegrityCard;
