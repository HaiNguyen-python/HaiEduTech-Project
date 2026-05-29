import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Props {
  character: string;
  pinyin: string;
  meaning: string;
}

const HskMnemonic = ({ character, pinyin, meaning }: Props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{ radicals: string; story: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleToggle = async () => {
    const next = !open;
    setOpen(next);
    if (next && !data && !loading) {
      setLoading(true);
      setError(null);
      try {
        const { data: res, error: err } = await supabase.functions.invoke("hsk-mnemonic", {
          body: { character, pinyin, meaning },
        });
        if (err) throw err;
        if (res?.radicals && res?.story) {
          setData({ radicals: res.radicals, story: res.story });
        } else {
          setError("Không tạo được mẹo nhớ. Thử lại sau.");
        }
      } catch (e) {
        setError("Lỗi kết nối. Thử lại sau.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="mt-3">
      <button
        type="button"
        onClick={handleToggle}
        className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg border border-amber-400/40 bg-amber-50/60 dark:bg-amber-500/10 text-amber-900 dark:text-amber-100 text-sm font-semibold hover:bg-amber-100/70 dark:hover:bg-amber-500/20 transition-colors"
      >
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-4 h-4" />
          Mẹo nhớ từ
        </span>
        <span className="text-xs opacity-70">{open ? "Ẩn" : "Xem"}</span>
      </button>
      {open && (
        <div className="mt-2 p-3 rounded-lg border border-amber-300/50 bg-amber-50/40 dark:bg-amber-500/5 text-sm space-y-2">
          {loading && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" /> Đang phân tích bộ thủ...
            </div>
          )}
          {error && <p className="text-red-500 text-xs">{error}</p>}
          {data && (
            <>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-amber-700 dark:text-amber-300 mb-1">
                  Bộ thủ
                </p>
                <p className="text-foreground whitespace-pre-wrap leading-relaxed">{data.radicals}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-amber-700 dark:text-amber-300 mb-1">
                  Câu chuyện nhớ chữ
                </p>
                <p className="text-foreground italic leading-relaxed">{data.story}</p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default HskMnemonic;
