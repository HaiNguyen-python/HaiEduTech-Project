import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

const Row = ({ label, value, copyValue }: { label: string; value: string; copyValue?: string }) => {
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
    <div className="grid grid-cols-[minmax(5rem,0.36fr)_minmax(0,1fr)_2rem] items-center gap-2 border-b border-border/60 py-2.5 last:border-b-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="min-w-0 break-words text-right text-sm font-semibold text-foreground" title={value}>{value}</span>
      <Button
        type="button" variant="ghost" size="icon-sm" onClick={copy}
        className="shrink-0" aria-label={`${copied ? "Copied" : "Copy"} ${label}`} title={`${copied ? "Copied" : "Copy"} ${label}`}
      >
        {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
      </Button>
    </div>
  );
};

export const CourseBankTransfer = ({ eur, vnd, reference }: { eur: number; vnd: number; reference: string }) => {
  const { t } = useLanguage();
  const vndText = `${new Intl.NumberFormat("vi-VN").format(vnd)}₫`;
  return (
    <div className="min-w-0">
      <div className="divide-y divide-border">
        <div className="pb-4">
          <p className="mb-2 font-semibold text-foreground">🇻🇳 Vietnam · Vietcombank</p>
          <Row label={t("Số tiền", "Amount")} value={vndText} copyValue={String(vnd)} />
          <Row label={t("Số tài khoản", "Account")} value="1025536199" />
          <Row label={t("Chủ tài khoản", "Holder")} value="NGUYEN TRAN THANH HAI" />
          <Row label={t("Nội dung", "Reference")} value={reference} />
        </div>
        <div className="pt-4">
          <p className="mb-2 font-semibold text-foreground">🇫🇮 Finland · Nordea</p>
          <Row label={t("Số tiền", "Amount")} value={`${eur} EUR`} copyValue={String(eur)} />
          <Row label="IBAN" value="FI09 1040 3500 5258 23" copyValue="FI0910403500525823" />
          <Row label={t("Chủ tài khoản", "Holder")} value="Nguyen Tran Thanh Hai" />
          <Row label={t("Nội dung", "Reference")} value={reference} />
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        {t("Sau khi chuyển khoản, thầy Hải sẽ xác nhận và liên hệ để xếp lớp.", "After your transfer, Teacher Hai will confirm and contact you about scheduling.")}
      </p>
    </div>
  );
};
