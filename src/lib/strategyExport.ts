// Export Business Strategy report to PDF and Excel
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";

export async function exportStrategyToPdf(elementId: string, filename = "haiedu-strategy-report"): Promise<void> {
  const el = document.getElementById(elementId);
  if (!el) throw new Error("Strategy container not found");

  const canvas = await html2canvas(el, {
    scale: 2,
    backgroundColor: "#ffffff",
    useCORS: true,
    logging: false,
  });

  const imgData = canvas.toDataURL("image/jpeg", 0.92);
  const pdf = new jsPDF("p", "mm", "a4");
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = pdfWidth - 20;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  // Cover header
  pdf.setFontSize(18);
  pdf.setTextColor(59, 130, 246);
  pdf.text("HaiEduTech - Business Strategy Report", 10, 12);
  pdf.setFontSize(10);
  pdf.setTextColor(100);
  pdf.text(`Generated: ${new Date().toLocaleString()}`, 10, 18);

  let position = 22;
  let heightLeft = imgHeight;

  pdf.addImage(imgData, "JPEG", 10, position, imgWidth, imgHeight);
  heightLeft -= pdfHeight - position;

  while (heightLeft > 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, "JPEG", 10, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;
  }

  pdf.save(`${filename}-${Date.now()}.pdf`);
}

export interface StrategyExcelData {
  marketShare: any[];
  pricing: any[];
  margin: any[];
  seasonal: any[];
  ltv: any[];
  kpis: Record<string, string | number>;
}

export function exportStrategyToExcel(data: StrategyExcelData, filename = "haiedu-strategy-report"): void {
  const wb = XLSX.utils.book_new();

  // KPI summary sheet
  const kpiRows = Object.entries(data.kpis).map(([k, v]) => ({ Metric: k, Value: v }));
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(kpiRows), "KPI Summary");

  if (data.marketShare.length) XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(data.marketShare), "Market Share");
  if (data.pricing.length) XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(data.pricing), "Pricing Benchmark");
  if (data.margin.length) XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(data.margin), "Profit Margin");
  if (data.seasonal.length) XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(data.seasonal), "Seasonality");
  if (data.ltv.length) XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(data.ltv), "LTV by Cohort");

  XLSX.writeFile(wb, `${filename}-${Date.now()}.xlsx`);
}
