import { useRef, useState } from "react";
import { Download, Loader2 } from "lucide-react";
import logo from "@/assets/certificate-logo.jpg.asset.json";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { exportScheduleImage } from "@/lib/scheduleImageExport";
import { useToast } from "@/hooks/use-toast";

type Kind = "notice" | "thanks" | "reminder" | "rules";
const TEMPLATES: Record<Kind, { label: string; title: string; body: string }> = {
  notice: {
    label: "Thông báo",
    title: "THÔNG BÁO GỬI QUÝ PHỤ HUYNH",
    body: "Kính gửi Quý Phụ huynh lớp {lop},\n\nHaiEduTech xin trân trọng thông báo:\n• Lịch học tuần tới: [ghi lịch học]\n• Nội dung trọng tâm: [ghi nội dung]\n• Thay đổi (nếu có): [ghi thay đổi]\n\nRất mong Quý Phụ huynh nhắc nhở các con tham gia đầy đủ và đúng giờ. Mọi thắc mắc xin liên hệ thầy Hải qua số 0962.823.800.\n\nTrân trọng cảm ơn!",
  },
  thanks: {
    label: "Thư cảm ơn",
    title: "THƯ CẢM ƠN QUÝ PHỤ HUYNH",
    body: "Kính gửi Quý Phụ huynh lớp {lop},\n\nThay mặt HaiEduTech, thầy xin gửi lời cảm ơn chân thành đến Quý Phụ huynh đã tin tưởng và đồng hành cùng các con trong suốt thời gian qua.\n\nSự quan tâm, động viên của gia đình chính là động lực lớn giúp các con tiến bộ mỗi ngày - cả về kiến thức, sự tự tin lẫn thói quen học tập.\n\nHaiEduTech sẽ tiếp tục nỗ lực để mang đến cho các con những giờ học chất lượng, vui vẻ và hiệu quả.\n\nKính chúc Quý Phụ huynh và gia đình luôn mạnh khỏe, hạnh phúc!",
  },
  reminder: {
    label: "Dặn dò",
    title: "LỜI DẶN DÒ HỌC VIÊN & PHỤ HUYNH",
    body: "Kính gửi Quý Phụ huynh lớp {lop},\n\nĐể các con học tập hiệu quả, thầy xin gửi một vài lời dặn dò:\n• Vào lớp trước 5 phút, kiểm tra micro, camera và đường truyền.\n• Hoàn thành bài tập về nhà trước buổi học kế tiếp.\n• Ôn từ vựng 10-15 phút mỗi ngày trên website haiedutech.com.\n• Chuẩn bị vở ghi, bút và tai nghe khi học.\n• Báo nghỉ trước ít nhất 24 giờ nếu con không thể tham gia.\n\nRất mong Quý Phụ huynh cùng thầy nhắc nhở và theo dõi các con.\n\nTrân trọng!",
  },
  rules: {
    label: "Nội quy lớp học",
    title: "NỘI QUY LỚP HỌC",
    body: "Áp dụng cho lớp {lop}\n\n1. Đi học đúng giờ, tham gia đầy đủ các buổi học.\n2. Bật camera trong suốt buổi học trực tuyến; giữ trật tự, tập trung.\n3. Tôn trọng thầy cô và bạn bè; sử dụng ngôn ngữ lịch sự.\n4. Không sử dụng điện thoại, ứng dụng khác khi chưa được phép.\n5. Hoàn thành bài tập về nhà đúng hạn.\n6. Xin phép trước ít nhất 24 giờ khi vắng mặt; buổi vắng không báo sẽ không được học bù.\n7. Học phí đóng đúng hạn theo thông báo của trung tâm.\n\nRất mong Quý Phụ huynh phối hợp để lớp học luôn hiệu quả và vui vẻ.",
  },
};

export default function ParentLetterTemplates() {
  const { toast } = useToast();
  const ref = useRef<HTMLDivElement>(null);
  const [kind, setKind] = useState<Kind>("notice");
  const [className, setClassName] = useState("IELTS Foundation");
  const [title, setTitle] = useState(TEMPLATES.notice.title);
  const [body, setBody] = useState(TEMPLATES.notice.body);
  const [busy, setBusy] = useState(false);
  const date = new Date().toLocaleDateString("vi-VN");

  const pick = (k: Kind) => { setKind(k); setTitle(TEMPLATES[k].title); setBody(TEMPLATES[k].body); };
  const download = async () => {
    if (!ref.current) return;
    setBusy(true);
    try { await exportScheduleImage(ref.current, `HaiEduTech-${TEMPLATES[kind].label}-${className}.png`.replace(/\s+/g, "_")); }
    catch { toast({ title: "Không tải được ảnh", variant: "destructive" }); }
    finally { setBusy(false); }
  };
  const text = body.split("{lop}").join(className || "...");

  return <Card>
    <CardHeader><CardTitle>Mẫu thư gửi Phụ huynh</CardTitle><CardDescription>Thông báo, thư cảm ơn, dặn dò, nội quy - chọn mẫu, sửa nội dung rồi tải ảnh gửi Zalo cho PH.</CardDescription></CardHeader>
    <CardContent className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">{(Object.keys(TEMPLATES) as Kind[]).map(k => <Button key={k} size="sm" variant={k === kind ? "default" : "outline"} onClick={() => pick(k)}>{TEMPLATES[k].label}</Button>)}</div>
        <div className="space-y-1.5"><Label>Tên lớp</Label><Input value={className} onChange={e => setClassName(e.target.value)} /></div>
        <div className="space-y-1.5"><Label>Tiêu đề</Label><Input value={title} onChange={e => setTitle(e.target.value)} /></div>
        <div className="space-y-1.5"><Label>Nội dung ({"{lop}"} = tên lớp)</Label><Textarea rows={14} value={body} onChange={e => setBody(e.target.value)} /></div>
        <Button onClick={download} disabled={busy} className="gap-2">{busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}Tải ảnh gửi PH</Button>
      </div>
      <div className="overflow-x-auto">
        <div ref={ref} className="parent-letter">
          <header className="parent-letter__head">
            <img src={logo.url} alt="Logo HaiEduTech" crossOrigin="anonymous" onError={e => { if (!e.currentTarget.src.endsWith("/favicon-192.png")) e.currentTarget.src = "/favicon-192.png"; }} />
            <div><strong>HaiEduTech</strong><p>Language & Technology Learning Center</p></div>
            <span>{date}</span>
          </header>
          <h2>{title}</h2>
          <div className="parent-letter__body">{text}</div>
          <div className="parent-letter__sign"><p>Giáo viên phụ trách</p><strong>Mr. Hai Nguyen</strong></div>
          <footer><span>www.haiedutech.com · 0962.823.800</span><em>The Unique Intersection of language and technology</em></footer>
        </div>
      </div>
    </CardContent>
    <style>{`
      .parent-letter{width:720px;max-width:none;margin:0 auto;padding:40px 48px;background:hsl(var(--schedule-paper, 0 0% 100%));color:hsl(var(--schedule-ink, 222 47% 11%));border:10px solid transparent;border-image:linear-gradient(135deg,#3B82F6,#10B981) 1;font-family:inherit}
      .teaching-poster--export.parent-letter{width:1080px;padding:64px 72px;font-size:22px}
      .parent-letter__head{display:flex;align-items:center;gap:14px;padding-bottom:16px;border-bottom:2px solid #10B981}
      .parent-letter__head img{width:64px;height:64px;border-radius:50%;object-fit:cover}
      .parent-letter__head strong{font-size:1.4em;color:#2563EB}.parent-letter__head p{font-size:.85em;color:#059669;margin:0}
      .parent-letter__head span{margin-left:auto;font-size:.85em;opacity:.7}
      .parent-letter h2{text-align:center;font-size:1.6em;font-weight:800;margin:28px 0 20px;background:linear-gradient(90deg,#2563EB,#059669);-webkit-background-clip:text;background-clip:text;color:transparent}
      .parent-letter__body{white-space:pre-wrap;line-height:1.7;font-size:1em}
      .parent-letter__sign{text-align:right;margin-top:28px}.parent-letter__sign p{margin:0;font-style:italic;opacity:.7}.parent-letter__sign strong{font-size:1.2em;color:#2563EB}
      .parent-letter footer{margin-top:28px;padding-top:14px;border-top:1px solid #10B98155;display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px;font-size:.85em}
      .parent-letter footer span{font-weight:700;color:#2563EB}.parent-letter footer em{color:#059669}
    `}</style>
  </Card>;
}
