import { useState } from "react";
import { Copy, Check, Landmark } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Row = ({ label, value, copyValue }: { label: string; value: string; copyValue?: string }) => {
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex items-center justify-between gap-3 py-1.5">
      <span className="text-sm text-muted-foreground">{label}</span>
      <button
        type="button"
        onClick={() => { navigator.clipboard?.writeText(copyValue ?? value); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
        className="inline-flex items-center gap-1.5 text-right text-sm font-semibold text-foreground hover:text-primary"
      >
        {value}
        {copied ? <Check className="h-3.5 w-3.5 text-primary" /> : <Copy className="h-3.5 w-3.5 opacity-60" />}
      </button>
    </div>
  );
};

export const CourseBankTransfer = ({ eur, vnd, reference }: { eur: number; vnd: number; reference: string }) => {
  const { t } = useLanguage();
  const vndText = `${new Intl.NumberFormat("vi-VN").format(vnd)}₫`;
  return (
    <div className="mt-6">
      <h4 className="mb-3 flex items-center gap-2 font-bold text-foreground">
        <Landmark className="h-4 w-4 text-primary" />
        {t("Hoặc chuyển khoản ngân hàng", "Or pay by bank transfer")}
      </h4>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-border bg-muted/30 p-4">
          <p className="mb-2 font-semibold text-foreground">🇻🇳 Vietnam · Vietcombank</p>
          <Row label={t("Số tiền", "Amount")} value={vndText} copyValue={String(vnd)} />
          <Row label={t("Số tài khoản", "Account")} value="1025536199" />
          <Row label={t("Chủ tài khoản", "Holder")} value="NGUYEN TRAN THANH HAI" />
          <Row label={t("Nội dung", "Reference")} value={reference} />
        </div>
        <div className="rounded-lg border border-border bg-muted/30 p-4">
          <p className="mb-2 font-semibold text-foreground">🇫🇮 Finland · Nordea</p>
          <Row label={t("Số tiền", "Amount")} value={`${eur} EUR`} copyValue={String(eur)} />
          <Row label="IBAN" value="FI09 1040 3500 5258 23" copyValue="FI0910403500525823" />
          <Row label={t("Chủ tài khoản", "Holder")} value="Nguyen Tran Thanh Hai" />
          <Row label={t("Nội dung", "Reference")} value={reference} />
        </div>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">
        {t("Sau khi chuyển khoản, thầy Hải sẽ xác nhận và liên hệ để xếp lớp.", "After your transfer, Teacher Hai will confirm and contact you about scheduling.")}
      </p>
    </div>
  );
};
