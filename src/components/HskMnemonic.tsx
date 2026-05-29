import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Component {
  char: string;
  hanviet: string;
  meaning: string;
}

interface Props {
  character: string;
  pinyin: string;
  meaning: string;
}

const HskMnemonic = ({ character, pinyin, meaning }: Props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{
    components: Component[];
    formula: string;
    story: string;
  } | null>(null);
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
        if (res?.components && res?.formula && res?.story) {
          setData({
            components: res.components,
            formula: res.formula,
            story: res.story,
          });
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

  // Highlight radical characters inside the story with capsule styling.
  const renderStory = (text: string, comps: Component[]) => {
    if (!comps.length) return text;
    const chars = comps.map((c) => c.char).filter(Boolean);
    const escaped = chars.map((c) => c.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    const re = new RegExp(`(${escaped.join("|")})`, "g");
    return text.split(re).map((seg, i) =>
      chars.includes(seg) ? (
        <span
          key={i}
          className="inline-block px-1.5 py-0.5 mx-0.5 rounded-md bg-amber-200/70 dark:bg-amber-400/30 text-amber-900 dark:text-amber-100 font-bold"
        >
          {seg}
        </span>
      ) : (
        <span key={i}>{seg}</span>
      ),
    );
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
          Bộ thủ bí kíp
        </span>
        <span className="text-xs opacity-70">{open ? "Ẩn" : "Xem"}</span>
      </button>

      <div
        className={`grid transition-all duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="p-4 rounded-xl border border-amber-300/50 bg-gradient-to-br from-amber-50/80 to-orange-50/60 dark:from-amber-500/10 dark:to-orange-500/5 space-y-4">
            {loading && (
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Loader2 className="w-4 h-4 animate-spin" /> Đang phân tích bộ thủ...
              </div>
            )}
            {error && <p className="text-red-500 text-xs">{error}</p>}
            {data && (
              <>
                {/* Top: big character */}
                <div className="text-center">
                  <div className="inline-block text-6xl sm:text-7xl font-bold text-amber-900 dark:text-amber-100 leading-none">
                    {character}
                  </div>
                  {pinyin && (
                    <p className="mt-1 text-sm text-amber-700/80 dark:text-amber-200/70 italic">
                      {pinyin}
                    </p>
                  )}
                </div>

                {/* Middle: radical breakdown capsules */}
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300 mb-2">
                    Bộ thủ cấu thành
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {data.components.map((c, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-100/80 dark:bg-amber-400/15 border border-amber-300/60 dark:border-amber-400/30"
                      >
                        <span className="text-2xl font-bold text-amber-900 dark:text-amber-100">
                          {c.char}
                        </span>
                        <div className="text-left leading-tight">
                          <div className="text-xs font-semibold text-amber-800 dark:text-amber-200">
                            {c.hanviet}
                          </div>
                          <div className="text-[11px] text-amber-700/80 dark:text-amber-200/70">
                            {c.meaning}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {data.formula && (
                    <p className="mt-2 text-center text-base font-bold text-amber-900 dark:text-amber-100 tracking-wide">
                      {data.formula}
                    </p>
                  )}
                </div>

                {/* Bottom: etymology story */}
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300 mb-1">
                    Câu chuyện bộ thủ
                  </p>
                  <p className="text-foreground leading-relaxed text-sm sm:text-base">
                    {renderStory(data.story, data.components)}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HskMnemonic;
