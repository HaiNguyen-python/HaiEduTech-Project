/**
 * Dialog explaining exactly which actions feed the AI Study Pet's XP.
 */
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HelpCircle, Sparkles } from "lucide-react";

interface Props {
  triggerClassName?: string;
}

const ROWS: { action: string; xp: string; src: string }[] = [
  { action: "Đánh dấu 1 từ vựng là 'Đã thuộc' (mọi vocab: IELTS, HSK, TOEIC, SAT, Finnish, Cambridge, THPT…)", xp: "+5", src: "vocab" },
  { action: "Hoàn thành 1 bài giảng (lecture) IELTS / TOEIC / Cambridge / Finnish / THPT", xp: "+20", src: "lecture" },
  { action: "Ôn 1 từ HSK SRS với mức 'Good' hoặc 'Easy'", xp: "+5", src: "vocab:hsk" },
  { action: "Đánh dấu sao trên một bài SAT (lesson / drill / exam)", xp: "+10", src: "quiz" },
  { action: "Hoàn thành 1 bài thi mock (IELTS / HSK / TOEIC / SAT / Cambridge / THPT)", xp: "+50", src: "exam" },
  { action: "Luyện 1 câu Speaking Coach hoặc Finnish speaking đạt yêu cầu", xp: "+3", src: "speaking" },
  { action: "Nộp bài writing để AI chấm (IELTS / Finnish)", xp: "+15", src: "writing" },
  { action: "Mở bài học AI Academy", xp: "+10", src: "ai-academy" },
  { action: "Vượt 1 quiz AI Academy (3 sao = +30 đến +210)", xp: "+20 trở lên", src: "ai-academy" },
  { action: "Hoàn thành 1 module Programming Lab", xp: "+50", src: "programming" },
  { action: "Vượt Daily Code Challenge (Python)", xp: "+100", src: "programming" },
  { action: "Hoàn thành 3 nhiệm vụ hằng ngày của AI Academy", xp: "+50", src: "daily-quest" },
];

const PetXPGuideDialog = ({ triggerClassName }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className={triggerClassName} aria-label="Cách tăng XP cho Pet">
          <HelpCircle className="w-4 h-4 mr-1" /> Cách tăng XP cho Pet
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Sparkles className="w-5 h-5 text-amber-500" />
            Cách tăng XP cho AI Study Pet 🐾
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3 text-sm">
          <p className="text-muted-foreground">
            Mỗi hành động học tập trên HaiEduTech đều cộng XP cho Pet của bạn.
            Càng nhiều XP, Pet càng tiến hoá: <b>Baby → Apprentice → Master → Legendary → Mythic</b>.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="py-2 px-3 font-semibold">Hành động</th>
                  <th className="py-2 px-3 font-semibold text-right w-32">XP</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r, i) => (
                  <tr key={i} className="border-b border-border/40 hover:bg-muted/30">
                    <td className="py-2 px-3">{r.action}</td>
                    <td className="py-2 px-3 text-right font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      {r.xp}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="rounded-lg border border-amber-300/50 bg-amber-50 dark:bg-amber-950/30 p-3 text-xs">
            <b>Mẹo giữ Pet vui (Happiness 100):</b> ôn lại các từ "Đã thuộc" trước khi quá 14 ngày —
            mỗi từ quá hạn làm Pet mất 4 điểm vui vẻ. Vào mục "Ôn lại từ vựng" để xoá nợ.
          </div>
          <div className="text-xs text-muted-foreground">
            XP được lưu offline (localStorage) và đồng bộ với tài khoản khi bạn đăng nhập — học trên điện thoại,
            mở Pet trên máy tính vẫn thấy đúng cấp.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PetXPGuideDialog;
