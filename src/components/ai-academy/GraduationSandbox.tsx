/**
 * GraduationSandbox — pick a presentation topic, then generate a holographic
 * graduation certificate modal with the signed-in user's name (printable).
 */
import { useEffect, useState } from "react";
import { GraduationCap, Printer, X, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { BonusGames } from "./SandboxBonusGames";

const GR_TF = [
  { q: "Hoàn thành đồ án giúp bạn tổng hợp kiến thức đã học.", a: true },
  { q: "Trình bày đồ án không cần luyện tập.", a: false, why: "Luyện trước giúp tự tin & rõ ý." },
  { q: "Một đề tài tốt nên có vấn đề thực tế cần giải quyết.", a: true },
  { q: "Bằng AI Academy có thể in ra để khoe ba mẹ.", a: true },
  { q: "Học AI xong là không cần học thêm gì nữa.", a: false, why: "AI thay đổi hàng tháng — cần học suốt đời." },
];
const GR_PAIRS = [
  { a: "Capstone", b: "Đồ án tốt nghiệp tổng kết khoá" },
  { a: "Pitch", b: "Bài thuyết trình ngắn về ý tưởng" },
  { a: "Portfolio", b: "Bộ sưu tập sản phẩm để khoe" },
  { a: "Lifelong learning", b: "Tinh thần học suốt đời" },
];

const TOPICS = [
  { id: "vision", label: "Computer Vision cho FaceID", emoji: "👁️" },
  { id: "nlp", label: "Chatbot tiếng Việt thông minh", emoji: "💬" },
  { id: "genai", label: "Trợ lý sáng tạo nội dung", emoji: "✨" },
  { id: "agent", label: "AI Agent tự động hoá học tập", emoji: "🤖" },
  { id: "smart", label: "Smart City giảm kẹt xe", emoji: "🏙️" },
];

const GraduationSandbox = () => {
  const [topic, setTopic] = useState(TOPICS[0]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("Học viên HaiEduTech");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const meta = data.user?.user_metadata as { full_name?: string } | undefined;
      const fn = meta?.full_name || data.user?.email?.split("@")[0];
      if (fn) setName(fn);
    });
  }, []);

  const print = () => window.print();

  return (
    <div className="space-y-2.5">
      <p className="text-xs text-muted-foreground">
        🎓 Chọn chủ đề đồ án rồi tạo <b>Bằng tốt nghiệp AI Academy</b> mang tên bạn.
      </p>

      <div className="grid grid-cols-1 gap-1.5">
        {TOPICS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTopic(t)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border-2 transition text-left ${
              topic.id === t.id
                ? "border-fuchsia-500 bg-fuchsia-500/10"
                : "border-border hover:border-fuchsia-300"
            }`}
          >
            <span className="text-lg">{t.emoji}</span>
            {t.label}
          </button>
        ))}
      </div>

      <button
        onClick={() => setOpen(true)}
        className="w-full py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-amber-400 via-fuchsia-500 to-purple-600 shadow-lg active:scale-95"
      >
        <Sparkles className="w-4 h-4 inline mr-1" />
        Tạo bằng tốt nghiệp
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur p-4 print:bg-white print:p-0"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-2xl rounded-3xl p-6 sm:p-10 text-center shadow-2xl bg-gradient-to-br from-amber-50 via-fuchsia-50 to-cyan-50 border-4 border-double border-amber-400 print:border-amber-600"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 p-1 rounded-full bg-white/80 hover:bg-white print:hidden"
            >
              <X className="w-4 h-4" />
            </button>

            <GraduationCap className="w-12 h-12 mx-auto text-fuchsia-600" />
            <div className="text-[10px] uppercase tracking-[0.3em] text-amber-700 mt-2">
              HaiEduTech · AI Academy
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl bg-gradient-to-r from-amber-600 via-fuchsia-600 to-purple-700 bg-clip-text text-transparent mt-2">
              Bằng tốt nghiệp AI
            </h2>
            <p className="text-sm text-slate-700 mt-4">Trao tặng học viên</p>
            <p className="font-display font-black text-2xl sm:text-3xl text-slate-900 mt-1">
              {name}
            </p>
            <p className="text-sm text-slate-700 mt-4 max-w-md mx-auto">
              Đã hoàn thành xuất sắc 12 chặng AI Academy và bảo vệ thành công đồ án:
            </p>
            <p className="font-bold text-base sm:text-lg text-fuchsia-700 mt-1">
              {topic.emoji} {topic.label}
            </p>

            <div className="mt-6 flex items-end justify-between gap-4 text-[11px] text-slate-600">
              <div className="text-left">
                <div className="border-t border-slate-400 pt-1 w-32">Ngày cấp</div>
                <div>{new Date().toLocaleDateString("vi-VN")}</div>
              </div>
              <div className="text-4xl">🏆</div>
              <div className="text-right">
                <div className="border-t border-slate-400 pt-1 w-32">Thầy Nguyễn Hải</div>
                <div>Founder · HaiEduTech</div>
              </div>
            </div>

            <button
              onClick={print}
              className="mt-6 px-5 py-2 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-amber-500 to-fuchsia-600 shadow active:scale-95 print:hidden"
            >
              <Printer className="w-4 h-4 inline mr-1" /> In bằng
            </button>
          </div>
        </div>
      )}

      <BonusGames tfItems={GR_TF} matchPairs={GR_PAIRS} accent="from-amber-500 to-fuchsia-600" border="border-amber-400/40" />
    </div>
  );
};

export default GraduationSandbox;
