import { useState, useEffect, useCallback, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import {
  DollarSign, TrendingUp, TrendingDown, Search, Calendar,
  BookOpen, Users, ArrowUpRight, Download, Brain, Target, Lightbulb,
  RefreshCw, Plus, CreditCard, CheckCircle2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose
} from "@/components/ui/dialog";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, PieChart, Pie, Cell, ComposedChart, Line
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";

// Revenue log row type
interface RevenueLog {
  id: string;
  student_name: string;
  course: string;
  payment_year: number;
  amount: number;
  status: string;
  kpi_met: boolean;
  notes: string | null;
  created_at: string;
}

// Tuition record type
interface TuitionRecord {
  id: string;
  student_name: string;
  course: string;
  payment_month: number;
  payment_year: number;
  amount: number;
  payment_method: string;
  note: string | null;
  entered_by: string;
  created_at: string;
}

interface YearlyIncomeSummary {
  year: number;
  amount: number;
}

// Color palette for charts
const CHART_COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#8b5cf6", "#ef4444", "#06b6d4"];

// Course categories
const COURSE_OPTIONS = ["IELTS", "TOEIC", "Chinese", "Programming", "Rental", "Investment", "Other"];

// Payment methods
const PAYMENT_METHODS = [
  { value: "bank_transfer", label: "Chuyển khoản", labelEn: "Bank Transfer" },
  { value: "cash", label: "Tiền mặt", labelEn: "Cash" },
  { value: "momo", label: "MoMo", labelEn: "MoMo" },
  { value: "other", label: "Khác", labelEn: "Other" },
];

const normalizeYearlyIncomeSummary = (items: unknown): YearlyIncomeSummary[] => {
  if (!Array.isArray(items)) return [];

  return items
    .filter((item): item is YearlyIncomeSummary => (
      typeof item === "object" &&
      item !== null &&
      typeof (item as YearlyIncomeSummary).year === "number" &&
      typeof (item as YearlyIncomeSummary).amount === "number"
    ))
    .sort((a, b) => a.year - b.year);
};

// Format Vietnamese currency
const formatCurrency = (val: number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(val);

// Student list from spreadsheet for dropdown
const STUDENT_LIST = [
  "Minh Thư", "Nguyễn Quang", "Huy Hoàng", "Khánh Trân", "Huỳnh Như",
  "Long Giang", "Nhật Minh", "Quỳnh Anh", "Phương Anh", "Thanh Quyên",
  "Khánh Hà", "Uyễn Vy", "Thành Phúc", "Xuân Nguyên", "Bảo Nghi",
  "Thanh Phương", "Thới Hòa", "Minh Huy", "Đông Phương", "Nghi Ân (Cherry)",
  "Võ Thành Lộc", "Minh Khang", "Thanh Mai", "Thanh Tùng", "Đăng Khôi",
  "Minh Kiệt", "Anh Đức", "Thảo Trúc", "Thanh Trúc", "Anh Dũng"
].sort();

const IncomeManagement = () => {
  const { t } = useLanguage();
  const [logs, setLogs] = useState<RevenueLog[]>([]);
  const [tuitionRecords, setTuitionRecords] = useState<TuitionRecord[]>([]);
  const [yearlyIncomeSummary, setYearlyIncomeSummary] = useState<YearlyIncomeSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [search, setSearch] = useState("");
  const [yearFilter, setYearFilter] = useState("all");
  const [courseFilter, setCourseFilter] = useState("all");
  const [showEntryForm, setShowEntryForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Form state
  const [formStudentName, setFormStudentName] = useState("");
  const [formStudentSearch, setFormStudentSearch] = useState("");
  const [formCourse, setFormCourse] = useState("IELTS");
  const [formMonth, setFormMonth] = useState(String(new Date().getMonth() + 1));
  const [formYear, setFormYear] = useState(String(new Date().getFullYear()));
  const [formAmount, setFormAmount] = useState("");
  const [formMethod, setFormMethod] = useState("bank_transfer");
  const [formNote, setFormNote] = useState("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    const [{ data: revData }, { data: tuiData }] = await Promise.all([
      supabase.from("revenue_logs").select("*").order("payment_year", { ascending: false }),
      supabase.from("tuition_records").select("*").order("created_at", { ascending: false }),
    ]);
    setLogs((revData as RevenueLog[]) || []);
    setTuitionRecords((tuiData as TuitionRecord[]) || []);
    setLoading(false);
  }, []);

  const fetchSheetIncomeSummary = useCallback(async () => {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData?.session?.access_token;
      if (!token) return;

      const { data, error } = await supabase.functions.invoke("sync-google-sheet", {
        body: { summaryOnly: true },
        headers: { Authorization: `Bearer ${token}` },
      });

      if (error) throw error;
      setYearlyIncomeSummary(normalizeYearlyIncomeSummary(data?.yearly_income));
    } catch (err) {
      console.error("Summary sync error:", err);
    }
  }, []);

  useEffect(() => {
    fetchData();
    fetchSheetIncomeSummary();
  }, [fetchData, fetchSheetIncomeSummary]);

  useEffect(() => {
    const channel = supabase
      .channel("tuition_records_realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "tuition_records" }, () => {
        fetchData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchData]);

  const handleSync = async () => {
    setSyncing(true);
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData?.session?.access_token;
      if (!token) {
        toast.error(t("Vui lòng đăng nhập lại", "Please login again"));
        setSyncing(false);
        return;
      }

      const { data, error } = await supabase.functions.invoke("sync-google-sheet", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (error) throw error;

      await fetchData();
      setYearlyIncomeSummary(normalizeYearlyIncomeSummary(data?.yearly_income));

      const msg = t(
        `Đồng bộ thành công! Tổng từ Sheet: ${data.total_sheet_rows}, Đã nhập: ${data.inserted}`,
        `Synced! Sheet rows: ${data.total_sheet_rows}, Inserted: ${data.inserted}`
      );
      toast.success(msg);
    } catch (err: any) {
      console.error("Sync error:", err);
      toast.error(t("Lỗi đồng bộ: " + (err.message || "Unknown"), "Sync error: " + (err.message || "Unknown")));
    } finally {
      setSyncing(false);
    }
  };

  const dbRevenueByYear = useMemo(() => {
    const totals = new Map<number, number>();

    logs.forEach((log) => {
      totals.set(log.payment_year, (totals.get(log.payment_year) || 0) + Number(log.amount));
    });

    tuitionRecords.forEach((record) => {
      totals.set(record.payment_year, (totals.get(record.payment_year) || 0) + Number(record.amount));
    });

    return Array.from(totals.entries())
      .map(([year, amount]) => ({ year: String(year), amount }))
      .sort((a, b) => Number(a.year) - Number(b.year));
  }, [logs, tuitionRecords]);

  const years = [...new Set([...logs.map((l) => l.payment_year), ...tuitionRecords.map((r) => r.payment_year)])].sort((a, b) => a - b);
  const courses = [...new Set([...logs.map((l) => l.course), ...tuitionRecords.map((r) => r.course)])].sort();

  const revenueByYear = useMemo(() => {
    if (yearlyIncomeSummary.length > 0) {
      return yearlyIncomeSummary.map((item) => ({
        year: String(item.year),
        amount: Number(item.amount),
      }));
    }

    return dbRevenueByYear;
  }, [dbRevenueByYear, yearlyIncomeSummary]);

  const totalRevenue = revenueByYear.reduce((sum, item) => sum + item.amount, 0);

  const growthRates = revenueByYear.map((item, i) => {
    if (i === 0) return { ...item, growth: null };
    const prev = revenueByYear[i - 1].amount;
    return { ...item, growth: prev > 0 ? ((item.amount - prev) / prev) * 100 : null };
  });

  const forecast = useMemo(() => {
    if (revenueByYear.length < 2) return null;

    const hasCurrent2026 = revenueByYear.some((item) => item.year === "2026");
    const forecastYear = hasCurrent2026
      ? "2026"
      : String(Number(revenueByYear[revenueByYear.length - 1].year) + 1);

    const historicalSeries = revenueByYear.filter((item) => item.year !== forecastYear);
    const baseSeries = historicalSeries.length >= 2 ? historicalSeries : revenueByYear;
    if (baseSeries.length < 2) return null;

    const yoyRates: number[] = [];
    for (let i = 1; i < baseSeries.length; i++) {
      const prev = baseSeries[i - 1].amount;
      if (prev > 0) {
        yoyRates.push((baseSeries[i].amount - prev) / prev);
      }
    }
    if (yoyRates.length === 0) return null;

    const avgGrowth = yoyRates.reduce((sum, rate) => sum + rate, 0) / yoyRates.length;
    const variance = yoyRates.reduce((sum, rate) => sum + (rate - avgGrowth) ** 2, 0) / yoyRates.length;
    const stdDev = Math.sqrt(variance);
    const isConsistent = stdDev < Math.abs(avgGrowth) * 0.5;

    let forecastAmount: number;
    const lastYearAmount = baseSeries[baseSeries.length - 1].amount;

    if (isConsistent) {
      forecastAmount = lastYearAmount * (1 + avgGrowth);
    } else {
      const n = baseSeries.length;
      const xValues = baseSeries.map((_, i) => i);
      const yValues = baseSeries.map((d) => d.amount);
      const sumX = xValues.reduce((sum, x) => sum + x, 0);
      const sumY = yValues.reduce((sum, y) => sum + y, 0);
      const sumXY = xValues.reduce((sum, x, i) => sum + x * yValues[i], 0);
      const sumX2 = xValues.reduce((sum, x) => sum + x * x, 0);
      const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
      const intercept = (sumY - slope * sumX) / n;
      forecastAmount = intercept + slope * n;
    }

    const currentYearAmount = revenueByYear.find((item) => item.year === forecastYear)?.amount ?? null;

    const chartData = baseSeries.map((item) => ({
      year: item.year,
      actual: item.amount,
      forecast: null as number | null,
      currentYearAmount: null as number | null,
      trend: item.amount,
    }));

    chartData.push({
      year: forecastYear,
      actual: null,
      forecast: Math.round(forecastAmount),
      currentYearAmount,
      trend: Math.round(forecastAmount),
    });

    return {
      amount: Math.round(forecastAmount),
      currentYearAmount,
      forecastYear,
      avgGrowthRate: avgGrowth * 100,
      method: isConsistent ? "average" : "regression",
      chartData,
    };
  }, [revenueByYear]);

  const revenueByCourse = courses.map((course) => ({
    name: course,
    value: logs.filter((log) => log.course === course).reduce((sum, log) => sum + Number(log.amount), 0) +
      tuitionRecords.filter((record) => record.course === course).reduce((sum, record) => sum + Number(record.amount), 0),
  })).sort((a, b) => b.value - a.value);

  const filtered = logs.filter((log) => {
    const matchSearch = log.student_name.toLowerCase().includes(search.toLowerCase());
    const matchYear = yearFilter === "all" || log.payment_year === Number(yearFilter);
    const matchCourse = courseFilter === "all" || log.course === courseFilter;
    return matchSearch && matchYear && matchCourse;
  });

  const kpiMetCount = new Set(logs.filter((log) => log.kpi_met).map((log) => log.student_name)).size;
  const totalStudents = new Set(logs.map((log) => log.student_name)).size;

  const handleExport = () => {
    const header = "Student,Course,Year,Amount,Status,KPI\n";
    const rows = filtered
      .map((log) => `"${log.student_name}","${log.course}",${log.payment_year},${log.amount},${log.status},${log.kpi_met}`)
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "revenue_report.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Submit tuition payment
  const handleSubmitPayment = async () => {
    if (!formStudentName || !formAmount || Number(formAmount) <= 0) {
      toast.error(t("Vui lòng điền đầy đủ thông tin", "Please fill all required fields"));
      return;
    }

    setSubmitting(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error(t("Bạn cần đăng nhập", "Please login first"));
      setSubmitting(false);
      return;
    }

    const { error } = await supabase.from("tuition_records").insert({
      student_name: formStudentName,
      course: formCourse,
      payment_month: Number(formMonth),
      payment_year: Number(formYear),
      amount: Number(formAmount),
      payment_method: formMethod,
      note: formNote || null,
      entered_by: user.id,
    });

    if (error) {
      if (error.code === "23505") {
        toast.error(t(
          "Bản ghi trùng lặp! Học viên này đã có thanh toán trong tháng/năm này.",
          "Duplicate entry! This student already has a payment for this month/year."
        ));
      } else {
        toast.error(error.message);
      }
      setSubmitting(false);
      return;
    }

    // Show success animation
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);

    toast.success(t("Ghi nhận thanh toán thành công!", "Payment recorded successfully!"));

    // Reset form
    setFormStudentName("");
    setFormAmount("");
    setFormNote("");
    setSubmitting(false);
    setShowEntryForm(false);

    // Refresh data
    fetchData();
  };

  // Filtered student list for dropdown search
  const filteredStudents = STUDENT_LIST.filter(s =>
    s.toLowerCase().includes(formStudentSearch.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Success animation overlay */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
          >
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="bg-background rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-3"
            >
              <CheckCircle2 className="w-16 h-16 text-emerald-500" />
              <p className="text-lg font-bold text-emerald-600">
                {t("Thành công!", "Success!")}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Bar: Sync + Add Payment */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground">
          {t("Quản lý Thu nhập", "Income Management")}
        </h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSync}
            disabled={syncing}
            className="gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${syncing ? "animate-spin" : ""}`} />
            {t("Đồng bộ", "Sync Now")}
          </Button>
          <Dialog open={showEntryForm} onOpenChange={setShowEntryForm}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-1.5 bg-emerald-600 hover:bg-emerald-700">
                <Plus className="w-3.5 h-3.5" />
                {t("Nhập học phí", "Add Payment")}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-emerald-500" />
                  {t("Nhập thanh toán học phí", "Record Tuition Payment")}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-2">
                {/* Student Name */}
                <div className="space-y-1.5">
                  <Label>{t("Tên học viên", "Student Name")} *</Label>
                  <Input
                    placeholder={t("Tìm tên học viên...", "Search student name...")}
                    value={formStudentSearch}
                    onChange={(e) => {
                      setFormStudentSearch(e.target.value);
                      setFormStudentName(e.target.value);
                    }}
                  />
                  {formStudentSearch && !STUDENT_LIST.includes(formStudentName) && (
                    <div className="max-h-32 overflow-auto border rounded-md bg-background">
                      {filteredStudents.map((s) => (
                        <button
                          key={s}
                          className="w-full text-left px-3 py-1.5 text-sm hover:bg-muted transition-colors"
                          onClick={() => {
                            setFormStudentName(s);
                            setFormStudentSearch(s);
                          }}
                        >
                          {s}
                        </button>
                      ))}
                      {filteredStudents.length === 0 && (
                        <p className="px-3 py-2 text-xs text-muted-foreground">
                          {t("Tên mới - sẽ tạo bản ghi mới", "New name - will create new record")}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Course */}
                <div className="space-y-1.5">
                  <Label>{t("Chương trình", "Course")} *</Label>
                  <Select value={formCourse} onValueChange={setFormCourse}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {COURSE_OPTIONS.map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Month/Year */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label>{t("Tháng", "Month")} *</Label>
                    <Select value={formMonth} onValueChange={setFormMonth}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => (
                          <SelectItem key={i + 1} value={String(i + 1)}>
                            {t(`Tháng ${i + 1}`, `Month ${i + 1}`)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label>{t("Năm", "Year")} *</Label>
                    <Select value={formYear} onValueChange={setFormYear}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {[2024, 2025, 2026, 2027].map((y) => (
                          <SelectItem key={y} value={String(y)}>{y}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Amount */}
                <div className="space-y-1.5">
                  <Label>{t("Số tiền (VNĐ)", "Amount (VNĐ)")} *</Label>
                  <Input
                    type="number"
                    placeholder="e.g. 3000000"
                    value={formAmount}
                    onChange={(e) => setFormAmount(e.target.value)}
                    min={0}
                  />
                  {formAmount && Number(formAmount) > 0 && (
                    <p className="text-xs text-emerald-600 font-mono">
                      = {formatCurrency(Number(formAmount))}
                    </p>
                  )}
                </div>

                {/* Payment Method */}
                <div className="space-y-1.5">
                  <Label>{t("Phương thức", "Payment Method")}</Label>
                  <Select value={formMethod} onValueChange={setFormMethod}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {PAYMENT_METHODS.map((m) => (
                        <SelectItem key={m.value} value={m.value}>
                          {t(m.label, m.labelEn)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Note */}
                <div className="space-y-1.5">
                  <Label>{t("Ghi chú", "Note")}</Label>
                  <Textarea
                    placeholder={t("Ghi chú thêm...", "Additional notes...")}
                    value={formNote}
                    onChange={(e) => setFormNote(e.target.value)}
                    rows={2}
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">{t("Hủy", "Cancel")}</Button>
                </DialogClose>
                <Button
                  onClick={handleSubmitPayment}
                  disabled={submitting || !formStudentName || !formAmount}
                  className="bg-emerald-600 hover:bg-emerald-700 gap-1.5"
                >
                  {submitting ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  )}
                  {t("Ghi nhận", "Submit")}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-emerald-500">
          <CardContent className="pt-5 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t("Tổng doanh thu", "Total Revenue")}
                </p>
                <p className="text-xl font-bold text-emerald-600 mt-1">
                  {formatCurrency(totalRevenue)}
                </p>
              </div>
              <div className="h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {growthRates.slice(-3).map((item) => (
          <Card key={item.year} className="border-l-4 border-l-blue-500">
            <CardContent className="pt-5 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {t(`Doanh thu ${item.year}`, `Revenue ${item.year}`)}
                  </p>
                  <p className="text-lg font-bold text-foreground mt-1">
                    {formatCurrency(item.amount)}
                  </p>
                  {item.growth !== null && (
                    <div className={`flex items-center gap-1 text-xs mt-0.5 ${item.growth >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                      {item.growth >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {item.growth >= 0 ? "+" : ""}{item.growth.toFixed(1)}%
                    </div>
                  )}
                </div>
                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* KPI & Student summary row */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-5 pb-4 flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">
              <Users className="w-5 h-5 text-violet-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase">{t("Tổng học viên", "Total Students")}</p>
              <p className="text-2xl font-bold">{totalStudents}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5 pb-4 flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
              <ArrowUpRight className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase">{t("Đạt KPI", "KPI Met")}</p>
              <p className="text-2xl font-bold text-emerald-600">
                {kpiMetCount}/{totalStudents}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue by Year Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              {t("Doanh thu theo năm", "Revenue by Year")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={revenueByYear}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="year" />
                <YAxis tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`} />
                <Tooltip
                  formatter={(value: number) => [formatCurrency(value), t("Doanh thu", "Revenue")]}
                />
                <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
                  {revenueByYear.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue by Course Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-500" />
              {t("Phân bổ theo chương trình", "Distribution by Course")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={revenueByCourse}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  innerRadius={50}
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {revenueByCourse.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Forecast 2026 */}
      {forecast && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid lg:grid-cols-3 gap-6"
        >
          <Card className="lg:col-span-2 border-t-4 border-t-amber-500">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-amber-500" />
                {t("Dự báo doanh thu 2026", "Revenue Forecast 2026")}
                <Badge variant="outline" className="ml-2 text-xs font-normal">
                  {forecast.method === "average"
                    ? t("Tăng trưởng trung bình", "Avg Growth Rate")
                    : t("Hồi quy tuyến tính", "Linear Regression")}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={320}>
                <ComposedChart data={forecast.chartData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="year" />
                  <YAxis tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`} />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (!active || !payload?.length) return null;
                      const isForecast = label === "2026";
                      const value = payload[0]?.value as number;
                      return (
                        <div className="rounded-lg border bg-background px-3 py-2 shadow-xl text-xs">
                          <p className="font-semibold mb-1">{label}</p>
                          <p className="text-emerald-600 font-mono font-medium">
                            {formatCurrency(value)}
                          </p>
                          {isForecast && forecast.current2026 && (
                            <p className="text-blue-500 font-mono text-[11px]">
                              {t("Hiện tại", "Current")}: {formatCurrency(forecast.current2026)}
                            </p>
                          )}
                          {isForecast && (
                            <p className="text-muted-foreground mt-1 text-[11px] max-w-[200px]">
                              {t(
                                `Dự báo dựa trên tốc độ tăng trưởng trung bình ${forecast.avgGrowthRate.toFixed(1)}%`,
                                `Forecast based on avg growth rate of ${forecast.avgGrowthRate.toFixed(1)}%`
                              )}
                            </p>
                          )}
                        </div>
                      );
                    }}
                  />
                  <Legend />
                  <Bar dataKey="actual" name={t("Thực tế", "Actual")} fill="#10b981" radius={[6, 6, 0, 0]} barSize={40} />
                  <Bar dataKey="current2026" name={t("Hiện tại 2026", "Current 2026")} fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={40} />
                  <Bar dataKey="forecast" name={t("Dự báo", "Forecast")} fill="#f59e0b" radius={[6, 6, 0, 0]} barSize={40} opacity={0.7} strokeDasharray="5 5" stroke="#f59e0b" />
                  <Line dataKey="trend" name={t("Xu hướng", "Trend")} type="monotone" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4, fill: "#3b82f6" }} activeDot={{ r: 6 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
            <Card className="h-full border-t-4 border-t-violet-500">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Brain className="w-4 h-4 text-violet-500" />
                  {t("Phân tích AI", "AI Insights")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="rounded-lg bg-amber-50 dark:bg-amber-900/20 p-4 space-y-1">
                  <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
                    <Target className="w-4 h-4" />
                    <span className="text-xs font-semibold uppercase tracking-wider">{t("Mục tiêu 2026", "Target 2026")}</span>
                  </div>
                  <p className="text-xl font-bold text-amber-700 dark:text-amber-300">{formatCurrency(forecast.amount)}</p>
                  {forecast.current2026 && (
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-blue-600 font-medium">
                        {t("Hiện tại", "Current")}: {formatCurrency(forecast.current2026)}
                      </p>
                      <Badge variant="outline" className="text-[10px]">
                        {((forecast.current2026 / forecast.amount) * 100).toFixed(0)}%
                      </Badge>
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground">
                    {t(`Tăng trưởng TB: ${forecast.avgGrowthRate >= 0 ? "+" : ""}${forecast.avgGrowthRate.toFixed(1)}%/năm`, `Avg growth: ${forecast.avgGrowthRate >= 0 ? "+" : ""}${forecast.avgGrowthRate.toFixed(1)}%/year`)}
                  </p>
                </div>
                <div className="rounded-lg bg-emerald-50 dark:bg-emerald-900/20 p-4 space-y-1">
                  <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-xs font-semibold uppercase tracking-wider">{t("Phân tích xu hướng", "Trend Analysis")}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {forecast.avgGrowthRate >= 0
                      ? t("Doanh thu có xu hướng tăng ổn định. Tiếp tục duy trì chiến lược tuyển sinh hiện tại.", "Revenue shows a steady upward trend. Continue current enrollment strategy.")
                      : t("Doanh thu có xu hướng giảm. Cần đánh giá lại chiến lược giá và chương trình học.", "Revenue declining. Re-evaluate pricing and course offerings.")}
                  </p>
                </div>
                <div className="rounded-lg bg-violet-50 dark:bg-violet-900/20 p-4 space-y-1">
                  <div className="flex items-center gap-2 text-violet-700 dark:text-violet-400">
                    <Lightbulb className="w-4 h-4" />
                    <span className="text-xs font-semibold uppercase tracking-wider">{t("Khuyến nghị", "Recommendation")}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {t("Để đạt mục tiêu này, cần tăng tỷ lệ chuyển đổi học viên IELTS thêm 5% và mở thêm ít nhất 2 lớp TOEIC mới trong Q1-Q2.", "To hit this target, increase IELTS conversion by 5% and open 2+ new TOEIC classes in Q1-Q2.")}
                  </p>
                </div>
                <p className="text-[10px] text-muted-foreground/70 italic">
                  {forecast.method === "average"
                    ? t("* Dự báo sử dụng tốc độ tăng trưởng trung bình (YoY)", "* Forecast uses average YoY growth rate")
                    : t("* Dự báo sử dụng mô hình hồi quy tuyến tính (bảo thủ)", "* Forecast uses conservative linear regression")}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}

      {/* Recent Tuition Records */}
      {tuitionRecords.length > 0 && (
        <Card className="border-t-4 border-t-emerald-500">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-emerald-500" />
              {t("Thanh toán gần đây", "Recent Payments")}
              <Badge variant="secondary" className="ml-1">{tuitionRecords.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-auto max-h-[300px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("Học viên", "Student")}</TableHead>
                    <TableHead>{t("Chương trình", "Course")}</TableHead>
                    <TableHead className="text-center">{t("Tháng/Năm", "Month/Year")}</TableHead>
                    <TableHead className="text-right">{t("Số tiền", "Amount")}</TableHead>
                    <TableHead>{t("Phương thức", "Method")}</TableHead>
                    <TableHead>{t("Thời gian", "Date")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tuitionRecords.slice(0, 10).map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="font-medium">{r.student_name}</TableCell>
                      <TableCell><Badge variant="secondary" className="text-xs">{r.course}</Badge></TableCell>
                      <TableCell className="text-center">{r.payment_month}/{r.payment_year}</TableCell>
                      <TableCell className="text-right font-mono font-semibold text-emerald-600">
                        {formatCurrency(Number(r.amount))}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {PAYMENT_METHODS.find(m => m.value === r.payment_method)?.label || r.payment_method}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {new Date(r.created_at).toLocaleDateString("vi-VN")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters & Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
            <CardTitle className="text-base">
              {t("Chi tiết học phí", "Tuition Details")}
            </CardTitle>
            <Button variant="outline" size="sm" onClick={handleExport} className="gap-1.5">
              <Download className="w-3.5 h-3.5" />
              {t("Xuất CSV", "Export CSV")}
            </Button>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={t("Tìm theo tên học viên...", "Search by student name...")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={yearFilter} onValueChange={setYearFilter}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder={t("Năm", "Year")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("Tất cả", "All Years")}</SelectItem>
                {years.map((y) => (
                  <SelectItem key={y} value={String(y)}>{y}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={courseFilter} onValueChange={setCourseFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder={t("Chương trình", "Course")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("Tất cả", "All Courses")}</SelectItem>
                {courses.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-auto max-h-[500px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("Học viên", "Student")}</TableHead>
                  <TableHead>{t("Chương trình", "Course")}</TableHead>
                  <TableHead className="text-center">{t("Năm", "Year")}</TableHead>
                  <TableHead className="text-right">{t("Số tiền", "Amount")}</TableHead>
                  <TableHead className="text-center">{t("Trạng thái", "Status")}</TableHead>
                  <TableHead className="text-center">KPI</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      {t("Không có dữ liệu", "No data found")}
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-medium">{log.student_name}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="text-xs">
                          {log.course}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">{log.payment_year}</TableCell>
                      <TableCell className="text-right font-mono font-semibold text-emerald-600">
                        {formatCurrency(Number(log.amount))}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          className={`text-xs ${
                            log.status === "paid"
                              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                              : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                          }`}
                        >
                          {log.status === "paid" ? t("Đã đóng", "Paid") : t("Chưa đóng", "Pending")}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        {log.kpi_met ? (
                          <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 text-xs">
                            ✓
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-xs text-muted-foreground">✗</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IncomeManagement;
