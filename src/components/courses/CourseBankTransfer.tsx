/**
 * @file CourseBankTransfer.tsx
 * @description Premium-styled bank transfer cards (Vietnam VietQR + Finland SEPA) for course payments.
 */
import { useState } from "react";
import { Copy, Check, ShieldCheck, Landmark, ScanLine } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import staticQr from "@/assets/vietcombank-qr.png";

interface CourseBankTransferProps {
  eur: number;
  vnd: number;
  reference: string;
}

const VIETCOMBANK = {
  code: "VCB",
  account: "1025536199",
  holder: "NGUYEN TRAN THANH HAI",
  branch: "Tan Binh Branch Headquarters",
};

const NORDEA = {
  iban: "FI09 1040 3500 5258 23",
  holder: "Nguyen Tran Thanh Hai",
};

const VietnamMark = () => (
  <span className="relative inline-flex h-7 w-10 shrink-0 items-center justify-center overflow-hidden rounded-sm bg-destructive shadow-sm" aria-label="Vietnam">
    <span className="text-sm text-accent">★</span>
  </span>
);

const FinlandMark = () => (
  <span
    className="relative inline-flex h-7 w-10 shrink-0 items-center justify-center overflow-hidden rounded-sm border border-border bg-white shadow-sm"
    aria-label="Finland"
  >
    <span className="absolute top-0 h-full w-[20%] bg-blue-700" style={{ left: "30%" }} />
    <span className="absolute left-0 h-[20%] w-full bg-blue-700" style={{ top: "40%" }} />
  </span>
);

const CopyRow = ({ label, value, copyValue, mono = false, tone }: { label: string; value: string; copyValue?: string; mono?: boolean; tone: "amber" | "sky" }) => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(copyValue ?? value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard may be unavailable in some browsers; the visible value remains selectable.
    }
  };
  return (
    <div className={`grid grid-cols-[92px_minmax(0,1fr)_auto] items-center gap-2 border-b py-1.5 last:border-0 sm:grid-cols-[110px_minmax(0,1fr)_auto] ${tone === "sky" ? "border-sky-200/50 dark:border-sky-800/30" : "border-amber-200/50 dark:border-amber-800/30"}`}>
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <span className={`min-w-0 break-words text-right text-foreground ${mono ? "font-mono text-xs sm:text-sm" : "text-sm font-semibold"} ${copyValue ? "font-extrabold" : ""}`} title={value}>{value}</span>
      <button
        type="button" onClick={copy}
        className={`rounded-md border bg-white p-1 transition shrink-0 dark:bg-card ${tone === "sky" ? "border-sky-300 dark:border-sky-700 hover:bg-sky-100 dark:hover:bg-sky-900/30" : "border-amber-300 dark:border-amber-700 hover:bg-amber-100 dark:hover:bg-amber-900/30"}`}
        aria-label={`${copied ? "Copied" : "Copy"} ${label}`} title={`${copied ? "Copied" : "Copy"} ${label}`}
      >
        {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  );
};

export const CourseBankTransfer = ({ eur, vnd, reference }: CourseBankTransferProps) => {
  const { t } = useLanguage();
  const vndText = `${new Intl.NumberFormat("vi-VN").format(vnd)}₫`;
  const qrSrc = `https://img.vietqr.io/image/VCB-${VIETCOMBANK.account}-compact2.png?amount=${vnd}&addInfo=${encodeURIComponent(reference.slice(0, 25))}&accountName=${encodeURIComponent(VIETCOMBANK.holder)}`;
  const [qrFailed, setQrFailed] = useState(false);

  return (
    <div className="min-w-0 space-y-4">
      {/* Vietnam - Vietcombank */}
      <div className="rounded-xl border-2 border-amber-500/30 bg-gradient-to-br from-amber-50 to-yellow-50 p-3 dark:border-amber-700/40 dark:from-amber-950/30 dark:to-yellow-950/20 sm:p-4">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <VietnamMark />
          <ShieldCheck className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          <h4 className="text-base font-bold text-foreground">Vietnam · Vietcombank</h4>
          <span className="ml-auto rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-800 dark:bg-amber-900/40 dark:text-amber-200">{vndText}</span>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-[170px,minmax(0,1fr)]">
          <div className="mx-auto w-[170px] max-w-full rounded-xl border border-amber-200 bg-white p-1.5 shadow-sm dark:border-amber-700/50">
            <img
              src={qrFailed ? staticQr : qrSrc}
              onError={() => setQrFailed(true)}
              alt="VietQR Vietcombank"
              loading="lazy"
              className="h-auto w-full rounded-md"
            />
            <div className="mt-0.5 flex items-center justify-center gap-1 text-[10px] font-medium text-muted-foreground">
              <ScanLine className="h-3 w-3" /> {t("Quét VietQR để chuyển nhanh", "Scan VietQR to pay")}
            </div>
          </div>
          <div className="min-w-0 space-y-1.5">
            <CopyRow tone="amber" label={t("Ngân hàng", "Bank")} value="Vietcombank" />
            <CopyRow tone="amber" label={t("Số tài khoản", "Account")} value={VIETCOMBANK.account} copyValue={VIETCOMBANK.account} />
            <CopyRow tone="amber" label={t("Chủ tài khoản", "Holder")} value={VIETCOMBANK.holder} />
            <CopyRow tone="amber" label={t("Số tiền", "Amount")} value={vndText} copyValue={String(vnd)} />
            <CopyRow tone="amber" label={t("Nội dung", "Reference")} value={reference} mono />
          </div>
        </div>
      </div>

      {/* Finland - Nordea */}
      <div className="rounded-xl border-2 border-sky-500/30 bg-gradient-to-br from-sky-50 to-blue-50 p-3 dark:border-sky-700/40 dark:from-sky-950/30 dark:to-blue-950/20 sm:p-4">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <FinlandMark />
          <Landmark className="h-5 w-5 text-sky-600 dark:text-sky-400" />
          <h4 className="text-base font-bold text-foreground">Finland · Nordea</h4>
          <span className="ml-auto rounded-full bg-sky-100 px-2.5 py-1 text-xs font-bold text-sky-800 dark:bg-sky-900/40 dark:text-sky-200">{eur} EUR</span>
        </div>
        <div className="min-w-0 space-y-1.5">
          <CopyRow tone="sky" label="IBAN" value={NORDEA.iban} copyValue="FI0910403500525823" mono />
          <CopyRow tone="sky" label={t("Chủ tài khoản", "Holder")} value={NORDEA.holder} />
          <CopyRow tone="sky" label={t("Số tiền", "Amount")} value={`${eur} EUR`} copyValue={String(eur)} />
          <CopyRow tone="sky" label={t("Nội dung", "Reference")} value={reference} mono />
        </div>
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground">
        {t("Sau khi chuyển khoản, thầy Hải sẽ xác nhận và liên hệ để xếp lớp.", "After your transfer, Teacher Hai will confirm and contact you about scheduling.")}
      </p>
    </div>
  );
};
