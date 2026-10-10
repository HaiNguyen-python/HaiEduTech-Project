import { useRef, useState } from "react";
import { Download, Loader2 } from "lucide-react";
import logo from "@/assets/certificate-logo.jpg.asset.json";
import thankYouBackground from "@/assets/parent-thank-you-background.png.asset.json";
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
    body: "Kính gửi Quý Phụ huynh cùng các em học viên lớp {lop},\n\nHaiEduTech xin trân trọng thông báo:\n• Lịch học tuần tới: [ghi lịch học]\n• Nội dung trọng tâm: [ghi nội dung]\n• Thay đổi (nếu có): [ghi thay đổi]\n\nRất mong Quý Phụ huynh nhắc nhở các em và các em học viên thu xếp tham gia đầy đủ, đúng giờ. Mọi thắc mắc xin liên hệ thầy Hải qua www.haiedutech.com.\n\nTrân trọng cảm ơn!",
  },
  thanks: {
    label: "Thư cảm ơn",
    title: "THƯ TRI ÂN QUÝ PHỤ HUYNH · HÀNH TRÌNH 15 NĂM",
    body: "Kính gửi Quý Phụ huynh cùng các em học viên,\n\nNhân dịp kỷ niệm 15 năm thành lập lớp tiếng Anh thầy Hải, thầy xin gửi đến Quý Phụ huynh và các em lời cảm ơn chân thành và sâu sắc vì đã tin tưởng, gửi gắm và đồng hành cùng thầy trên hành trình học tập.\n\nNhìn lại chặng đường ấy, điều thầy trân quý nhất không chỉ là những bài học đã dạy, mà là được chứng kiến mỗi học viên từng bước trưởng thành: từ ngập ngừng đến tự tin bày tỏ, từ một câu hỏi nhỏ đến niềm vui khám phá kiến thức mới. Phía sau mỗi bước tiến ấy luôn có sự chăm chút, kiên nhẫn của gia đình và cả nỗ lực bền bỉ của chính các em.\n\nTừ lớp tiếng Anh thầy Hải ngày đầu, hôm nay HaiEduTech đã có mặt tại Phần Lan, tiếp nối hành trình xây dựng môi trường học tập Ngoại ngữ & Công nghệ quốc tế dành cho học viên Việt Nam ở nhiều độ tuổi và nhiều quốc gia. Dù các em đang học phổ thông, là sinh viên hay đã đi làm, dù ở Việt Nam, Phần Lan hay một nơi xa khác, thầy mong lớp học luôn là nơi các em được kết nối, được lắng nghe và tự tin mở rộng cánh cửa ra thế giới.\n\nNgoại ngữ giúp các em hiểu và giao tiếp với thế giới; công nghệ giúp các em khám phá, sáng tạo và chủ động trong thời đại số. Kết hợp hai lĩnh vực ấy, thầy mong mang đến không chỉ kiến thức, mà còn tinh thần tự học, tư duy cởi mở và sự tự tin để mỗi người tìm được con đường phù hợp với mình, đồng thời luôn trân trọng cội nguồn Việt Nam.\n\nMười lăm năm là một dấu mốc đáng nhớ, nhưng cũng là lời nhắc thầy tiếp tục học hỏi, đổi mới và tận tâm với từng giờ dạy. Thầy sẽ tiếp tục nỗ lực để mỗi buổi học đều có giá trị, để các em được khích lệ khi gặp khó khăn và được ghi nhận trong từng tiến bộ, dù nhỏ.\n\nCảm ơn Quý Phụ huynh đã dành cho thầy sự tin yêu và những góp ý chân thành; cảm ơn các em học viên đã luôn giữ cho lớp học một không khí chăm chỉ, cởi mở và đầy năng lượng. Sự đồng hành ấy là nền tảng quý giá để lớp tiếng Anh thầy Hải, nay là HaiEduTech, tiếp tục vững bước.\n\nKính chúc Quý Phụ huynh cùng các em học viên nhiều sức khỏe, bình an và hạnh phúc. Chúc các em luôn giữ niềm vui học tập, lòng ham hiểu biết và sự tự tin theo đuổi những ước mơ của mình.\n\nTrân trọng và biết ơn!",
  },
  reminder: {
    label: "Dặn dò & Nội quy",
    title: "DẶN DÒ & NỘI QUY LỚP HỌC",
    body: "Kính gửi Quý Phụ huynh cùng các em học viên lớp {lop},\n\nĐể mỗi buổi học diễn ra hiệu quả trong không khí tích cực, thầy mong Quý Phụ huynh và các em cùng lưu ý:\n\n1. CHUẨN BỊ & THAM GIA\nĐi học đúng giờ; chuẩn bị vở ghi, bút và tài liệu. Với buổi học trực tuyến, kiểm tra micro, camera và đường truyền trước khi vào lớp; chọn không gian yên tĩnh.\n\n2. TÔN TRỌNG & TẬP TRUNG\nLắng nghe thầy và các bạn, sử dụng lời nói lịch sự, mạnh dạn đặt câu hỏi khi chưa hiểu. Sử dụng micro, camera theo hướng dẫn của thầy; không mở trò chơi hoặc ứng dụng ngoài nội dung học khi chưa được phép.\n\n3. DUY TRÌ THÓI QUEN HỌC TẬP\nHoàn thành bài tập theo hướng dẫn, ôn lại kiến thức đều đặn và luyện tập trên www.haiedutech.com. Khi gặp khó khăn, các em hãy trao đổi với thầy để được hỗ trợ.\n\n4. PHỐI HỢP GIỮA GIA ĐÌNH & LỚP HỌC\nQuý Phụ huynh vui lòng thông báo sớm khi các em cần nghỉ hoặc có khó khăn ảnh hưởng đến việc học; theo dõi thông báo về lịch học, bài tập và học phí của lớp. Với học viên đã trưởng thành, các em chủ động thông báo trực tiếp với thầy. Các vấn đề về lịch học hoặc học bù sẽ được trao đổi trực tiếp với thầy.\n\nSự nhắc nhở nhẹ nhàng và động viên của gia đình, cùng ý thức tự giác của các em, sẽ giúp lớp học luôn thân thiện, tôn trọng và trách nhiệm, để mỗi người tiến bộ bền vững theo cách của mình. Cảm ơn Quý Phụ huynh và các em đã cùng thầy giữ gìn một lớp học như vậy.\n\nTrân trọng!",
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
    try { await exportScheduleImage(ref.current, `HaiEduTech-${TEMPLATES[kind].label}-${kind === "thanks" ? "Hanh-trinh-15-nam" : className}.png`.replace(/\s+/g, "_")); }
    catch { toast({ title: "Không tải được ảnh", variant: "destructive" }); }
    finally { setBusy(false); }
  };
  const text = body.split("{lop}").join(className || "...");

  return <Card>
    <CardHeader><CardTitle>Mẫu thư gửi Phụ huynh</CardTitle><CardDescription>Thông báo · Tri ân 15 năm · Dặn dò & Nội quy (gửi Phụ huynh và học viên)</CardDescription></CardHeader>
    <CardContent className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">{(Object.keys(TEMPLATES) as Kind[]).map(k => <Button key={k} size="sm" variant={k === kind ? "default" : "outline"} onClick={() => pick(k)}>{TEMPLATES[k].label}</Button>)}</div>
        {kind !== "thanks" && <div className="space-y-1.5"><Label>Tên lớp</Label><Input value={className} onChange={e => setClassName(e.target.value)} /></div>}
        <div className="space-y-1.5"><Label>Tiêu đề</Label><Input value={title} onChange={e => setTitle(e.target.value)} /></div>
        <div className="space-y-1.5"><Label>{kind === "thanks" ? "Nội dung thư gửi chung Quý Phụ huynh và học viên" : <>Nội dung ({"{lop}"} = tên lớp)</>}</Label><Textarea rows={14} value={body} onChange={e => setBody(e.target.value)} /></div>
        <Button onClick={download} disabled={busy} className="gap-2">{busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}Tải ảnh gửi PH</Button>
      </div>
      <div className="overflow-x-auto">
        <div ref={ref} className="parent-letter">
          {kind === "thanks" && <img className="parent-letter__background" src={thankYouBackground.url} alt="" aria-hidden="true" crossOrigin="anonymous" />}
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
      .parent-letter{position:relative;isolation:isolate;width:720px;max-width:100%;margin:0 auto;padding:40px 48px;background:hsl(var(--schedule-paper, 0 0% 100%));color:hsl(var(--schedule-ink, 222 47% 11%));border:10px solid transparent;border-image:linear-gradient(135deg,#3B82F6,#10B981) 1;font-family:inherit;overflow-wrap:break-word}
      .parent-letter > :not(.parent-letter__background){position:relative;z-index:1}
      .parent-letter__background{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:44% center;opacity:.16;pointer-events:none;z-index:0}
      .parent-letter__brand{font-family:"Dancing Script",cursive;font-weight:700;font-size:2em;letter-spacing:0;background:linear-gradient(90deg,#2563EB,#059669);-webkit-background-clip:text;background-clip:text;color:transparent!important;-webkit-text-fill-color:transparent}
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
      .parent-letter footer{margin-top:28px;padding-top:16px;border-top:1px solid #10B98155;display:flex;flex-direction:column;align-items:center;gap:4px;font-size:.85em;text-align:center}
      .parent-letter__contact{display:inline-flex;align-items:center;gap:10px;flex-wrap:wrap}
      .parent-letter__contact span{font-weight:700;color:#2563EB}
      .parent-letter__contact em{font-style:normal;color:#64748B}
      .parent-letter__contact i{width:4px;height:4px;border-radius:9999px;background:#10B98188;flex:none}
      .parent-letter__slogan{color:#059669;font-size:.92em}
    `}</style>
  </Card>;
}
