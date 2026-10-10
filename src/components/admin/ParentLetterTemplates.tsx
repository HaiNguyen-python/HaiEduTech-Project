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

type Kind = "notice" | "thanks" | "reminder";
const TEMPLATES: Record<Kind, { label: string; title: string; body: string }> = {
  notice: {
    label: "Thông báo",
    title: "THÔNG BÁO GỬI QUÝ PHỤ HUYNH",
    body: "Kính gửi Quý Phụ huynh lớp {lop},\n\nHaiEduTech xin trân trọng thông báo:\n• Lịch học tuần tới: [ghi lịch học]\n• Nội dung trọng tâm: [ghi nội dung]\n• Thay đổi (nếu có): [ghi thay đổi]\n\nRất mong Quý Phụ huynh nhắc nhở các con tham gia đầy đủ và đúng giờ. Mọi thắc mắc xin liên hệ thầy Hải qua www.haiedutech.com.\n\nTrân trọng cảm ơn!",
  },
  thanks: {
    label: "Thư cảm ơn",
    title: "TRI ÂN QUÝ PHỤ HUYNH",
    body: "Kính gửi Quý Phụ huynh,\n\nNhân dịp kỷ niệm 15 năm thành lập lớp tiếng Anh thầy Hải, thầy xin gửi đến Quý Phụ huynh lời cảm ơn chân thành và sâu sắc vì đã tin tưởng, gửi gắm và đồng hành cùng thầy trên hành trình học tập của các con.\n\nNhìn lại chặng đường ấy, điều thầy trân quý nhất không chỉ là những bài học đã dạy, mà là được chứng kiến các con từng bước trưởng thành: từ ngập ngừng đến tự tin bày tỏ, từ một câu hỏi nhỏ đến niềm vui khám phá kiến thức mới. Phía sau mỗi bước tiến ấy luôn có sự chăm chút, kiên nhẫn và động viên của gia đình.\n\nTừ lớp tiếng Anh thầy Hải ngày đầu, hôm nay HaiEduTech đã có mặt tại Phần Lan, tiếp nối hành trình xây dựng môi trường học tập Ngoại ngữ & Công nghệ quốc tế dành cho học sinh Việt Nam đang sinh sống ở nhiều quốc gia. Dù các con ở Việt Nam, Phần Lan hay một nơi xa khác, thầy mong lớp học luôn là nơi các con được kết nối, được lắng nghe và tự tin mở rộng cánh cửa ra thế giới.\n\nNgoại ngữ giúp các con hiểu và giao tiếp với thế giới; công nghệ giúp các con khám phá, sáng tạo và chủ động trong thời đại số. Kết hợp hai lĩnh vực ấy, thầy mong mang đến không chỉ kiến thức, mà còn tinh thần tự học, tư duy cởi mở và lòng tự tin để mỗi em tìm được con đường phù hợp với mình, đồng thời luôn trân trọng cội nguồn Việt Nam.\n\nMười lăm năm là một dấu mốc đáng nhớ, nhưng cũng là lời nhắc thầy tiếp tục học hỏi, đổi mới và tận tâm với từng giờ dạy. Thầy sẽ tiếp tục nỗ lực để mỗi buổi học đều có giá trị, để các con được khích lệ khi gặp khó khăn và được ghi nhận trong từng tiến bộ, dù nhỏ.\n\nCảm ơn Quý Phụ huynh đã dành cho thầy sự tin yêu, những góp ý chân thành và cơ hội được góp một phần vào hành trình trưởng thành của các con. Sự đồng hành ấy là nền tảng quý giá để lớp tiếng Anh thầy Hải, nay là HaiEduTech, tiếp tục vững bước.\n\nKính chúc Quý Phụ huynh cùng gia đình sức khỏe, bình an và hạnh phúc. Chúc các con luôn giữ niềm vui học tập, lòng ham hiểu biết và sự tự tin theo đuổi những ước mơ của mình.\n\nTrân trọng và biết ơn!",
  },
  reminder: {
    label: "Dặn dò & Nội quy",
    title: "DẶN DÒ & NỘI QUY LỚP HỌC",
    body: "Kính gửi Quý Phụ huynh lớp {lop},\n\nĐể mỗi buổi học diễn ra hiệu quả trong không khí tích cực, thầy mong Quý Phụ huynh cùng các con lưu ý:\n\n1. CHUẨN BỊ & THAM GIA\nĐi học đúng giờ; chuẩn bị vở ghi, bút và tài liệu. Với buổi học trực tuyến, kiểm tra micro, camera và đường truyền trước khi vào lớp; chọn không gian yên tĩnh.\n\n2. TÔN TRỌNG & TẬP TRUNG\nLắng nghe thầy và bạn bè, sử dụng lời nói lịch sự, mạnh dạn đặt câu hỏi khi chưa hiểu. Sử dụng micro, camera theo hướng dẫn của thầy; không mở trò chơi hoặc ứng dụng ngoài nội dung học khi chưa được phép.\n\n3. DUY TRÌ THÓI QUEN HỌC TẬP\nHoàn thành bài tập theo hướng dẫn, ôn lại kiến thức đều đặn và luyện tập trên www.haiedutech.com. Khi gặp khó khăn, các con hãy trao đổi với thầy để được hỗ trợ.\n\n4. PHỐI HỢP GIỮA GIA ĐÌNH & LỚP HỌC\nQuý Phụ huynh vui lòng thông báo sớm khi con cần nghỉ hoặc có khó khăn ảnh hưởng đến việc học; theo dõi thông báo về lịch học, bài tập và học phí của lớp. Các vấn đề về lịch học hoặc học bù sẽ được trao đổi trực tiếp với thầy.\n\nSự nhắc nhở nhẹ nhàng và động viên của gia đình sẽ giúp các con xây dựng tinh thần tự giác, học tập vui vẻ và tiến bộ bền vững. Cảm ơn Quý Phụ huynh đã cùng thầy giữ gìn một lớp học thân thiện, tôn trọng và trách nhiệm.\n\nTrân trọng!",
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
    try { await exportScheduleImage(ref.current, `HaiEduTech-${TEMPLATES[kind].label}-${kind === "thanks" ? "15-nam" : className}.png`.replace(/\s+/g, "_")); }
    catch { toast({ title: "Không tải được ảnh", variant: "destructive" }); }
    finally { setBusy(false); }
  };
  const text = body.split("{lop}").join(className || "...");

  return <Card>
    <CardHeader><CardTitle>Mẫu thư gửi Phụ huynh</CardTitle><CardDescription>Thông báo · Tri ân 15 năm · Dặn dò & Nội quy</CardDescription></CardHeader>
    <CardContent className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">{(Object.keys(TEMPLATES) as Kind[]).map(k => <Button key={k} size="sm" variant={k === kind ? "default" : "outline"} onClick={() => pick(k)}>{TEMPLATES[k].label}</Button>)}</div>
        {kind !== "thanks" && <div className="space-y-1.5"><Label>Tên lớp</Label><Input value={className} onChange={e => setClassName(e.target.value)} /></div>}
        <div className="space-y-1.5"><Label>Tiêu đề</Label><Input value={title} onChange={e => setTitle(e.target.value)} /></div>
        <div className="space-y-1.5"><Label>{kind === "thanks" ? "Nội dung thư gửi chung Quý Phụ huynh" : <>Nội dung ({"{lop}"} = tên lớp)</>}</Label><Textarea rows={14} value={body} onChange={e => setBody(e.target.value)} /></div>
        <Button onClick={download} disabled={busy} className="gap-2">{busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}Tải ảnh gửi PH</Button>
      </div>
      <div className="overflow-x-auto">
        <div ref={ref} className="parent-letter">
          <header className="parent-letter__head">
            <img src={logo.url} alt="Logo HaiEduTech" crossOrigin="anonymous" onError={e => { if (!e.currentTarget.src.endsWith("/favicon-192.png")) e.currentTarget.src = "/favicon-192.png"; }} />
            <div><strong className="parent-letter__brand">HaiEduTech</strong><p>Language & Technology Learning Center</p></div>
            <span>{date}</span>
          </header>
          <h2>{title}</h2>
          <div className="parent-letter__body">{text}</div>
          <div className="parent-letter__sign"><p>Giáo viên phụ trách</p><strong>Thầy Hải</strong></div>
          <footer>
            <div className="parent-letter__contact">
              <span>www.haiedutech.com</span><i /><em>contact@haiedutech.com</em><i /><em>0962.823.800</em>
            </div>
            <em className="parent-letter__slogan">The Unique Intersection of language and technology</em>
          </footer>
        </div>
      </div>
    </CardContent>
    <style>{`
      .parent-letter{width:720px;max-width:100%;margin:0 auto;padding:40px 48px;background:hsl(var(--schedule-paper, 0 0% 100%));color:hsl(var(--schedule-ink, 222 47% 11%));border:10px solid transparent;border-image:linear-gradient(135deg,#3B82F6,#10B981) 1;font-family:inherit;overflow-wrap:break-word}
      .teaching-poster--export.parent-letter{width:1080px;max-width:none;padding:64px 72px;font-size:22px;border-image:none;border-color:hsl(var(--primary))}
      .teaching-poster--export.parent-letter h2{background:none;-webkit-text-fill-color:hsl(var(--primary));color:hsl(var(--primary))}
      @media(max-width:640px){.parent-letter:not(.teaching-poster--export){padding:24px 20px}.parent-letter__head{flex-wrap:wrap}}
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
