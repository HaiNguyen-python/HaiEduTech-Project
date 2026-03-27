import { useState, useEffect, useCallback, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  DollarSign, TrendingUp, TrendingDown, Search, Calendar,
  BookOpen, Users, ArrowUpRight, Download, Brain, Target, Lightbulb
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, PieChart, Pie, Cell, ComposedChart, Line
} from "recharts";
import { motion } from "framer-motion";

// Revenue log row type
interface RevenueLog {
  id: string;
  student_name: string;
  course: string;
  payment_year: number;
  amount: number;
  status: string;
  kpi_met: boolean;
  created_at: string;
}

// Color palette for charts
const CHART_COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#8b5cf6", "#ef4444"];

// Format Vietnamese currency
const formatCurrency = (val: number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(val);

const IncomeManagement = () => {
  const { t } = useLanguage();
  const [logs, setLogs] = useState<RevenueLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [yearFilter, setYearFilter] = useState("all");
  const [courseFilter, setCourseFilter] = useState("all");

  const fetchData = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("revenue_logs")
      .select("*")
      .order("payment_year", { ascending: false });
    setLogs((data as RevenueLog[]) || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Derived data
  const totalRevenue = logs.reduce((s, l) => s + Number(l.amount), 0);
  const years = [...new Set(logs.map((l) => l.payment_year))].sort();
  const courses = [...new Set(logs.map((l) => l.course))];

  const revenueByYear = years.map((y) => ({
    year: String(y),
    amount: logs.filter((l) => l.payment_year === y).reduce((s, l) => s + Number(l.amount), 0),
  }));

  // Growth rates between consecutive years
  const growthRates = revenueByYear.map((item, i) => {
    if (i === 0) return { ...item, growth: null };
    const prev = revenueByYear[i - 1].amount;
    return { ...item, growth: prev > 0 ? ((item.amount - prev) / prev) * 100 : null };
  });

  // Revenue forecast calculation using average growth rate with linear regression fallback
  const forecast = useMemo(() => {
    if (revenueByYear.length < 2) return null;

    // Calculate YoY growth rates
    const yoyRates: number[] = [];
    for (let i = 1; i < revenueByYear.length; i++) {
      const prev = revenueByYear[i - 1].amount;
      if (prev > 0) {
        yoyRates.push((revenueByYear[i].amount - prev) / prev);
      }
    }

    if (yoyRates.length === 0) return null;

    // Check growth consistency (standard deviation)
    const avgGrowth = yoyRates.reduce((s, r) => s + r, 0) / yoyRates.length;
    const variance = yoyRates.reduce((s, r) => s + (r - avgGrowth) ** 2, 0) / yoyRates.length;
    const stdDev = Math.sqrt(variance);
    const isConsistent = stdDev < Math.abs(avgGrowth) * 0.5;

    let forecastAmount: number;
    const lastYearAmount = revenueByYear[revenueByYear.length - 1].amount;

    if (isConsistent) {
      // Use average growth rate
      forecastAmount = lastYearAmount * (1 + avgGrowth);
    } else {
      // Conservative linear regression
      const n = revenueByYear.length;
      const xValues = revenueByYear.map((_, i) => i);
      const yValues = revenueByYear.map((d) => d.amount);
      const sumX = xValues.reduce((s, x) => s + x, 0);
      const sumY = yValues.reduce((s, y) => s + y, 0);
      const sumXY = xValues.reduce((s, x, i) => s + x * yValues[i], 0);
      const sumX2 = xValues.reduce((s, x) => s + x * x, 0);
      const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
      const intercept = (sumY - slope * sumX) / n;
      forecastAmount = intercept + slope * n;
    }

    // Build composed chart data
    const chartData = revenueByYear.map((d) => ({
      year: d.year,
      actual: d.amount,
      forecast: null as number | null,
      trend: d.amount,
    }));

    chartData.push({
      year: "2026",
      actual: null as number | null,
      forecast: Math.round(forecastAmount),
      trend: Math.round(forecastAmount),
    });

    return {
      amount: Math.round(forecastAmount),
      avgGrowthRate: avgGrowth * 100,
      method: isConsistent ? "average" : "regression",
      chartData,
    };
  }, [revenueByYear]);

  // Pie chart: revenue by course
  const revenueByCourse = courses.map((c) => ({
    name: c,
    value: logs.filter((l) => l.course === c).reduce((s, l) => s + Number(l.amount), 0),
  }));

  // Filtered table data
  const filtered = logs.filter((l) => {
    const matchSearch = l.student_name.toLowerCase().includes(search.toLowerCase());
    const matchYear = yearFilter === "all" || l.payment_year === Number(yearFilter);
    const matchCourse = courseFilter === "all" || l.course === courseFilter;
    return matchSearch && matchYear && matchCourse;
  });

  // KPI stats
  const kpiMetCount = new Set(logs.filter((l) => l.kpi_met).map((l) => l.student_name)).size;
  const totalStudents = new Set(logs.map((l) => l.student_name)).size;

  // Export CSV
  const handleExport = () => {
    const header = "Student,Course,Year,Amount,Status,KPI\n";
    const rows = filtered
      .map((l) => `"${l.student_name}","${l.course}",${l.payment_year},${l.amount},${l.status},${l.kpi_met}`)
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "revenue_report.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
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
