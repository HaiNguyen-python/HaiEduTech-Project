import { useEffect, useRef, useCallback, useState } from "react";
import HanziWriter from "hanzi-writer";
import { Loader2 } from "lucide-react";

interface HanziStrokeOrderProps {
  character: string;
  size?: number;
}

const CDN_URLS = [
  "https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0.1",
  "https://unpkg.com/hanzi-writer-data@2.0.1",
];

const HanziStrokeOrder = ({ character, size = 120 }: HanziStrokeOrderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const writerRef = useRef<any>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = "";
    setLoading(true);
    setFailed(false);

    const char = character.charAt(0);

    const fetchWithFallback = async (charToLoad: string): Promise<any> => {
      for (const cdn of CDN_URLS) {
        try {
          const res = await fetch(`${cdn}/${charToLoad}.json`);
          if (res.ok) return await res.json();
        } catch {
          // try next CDN
        }
      }
      throw new Error("All CDNs failed");
    };

    try {
      writerRef.current = HanziWriter.create(containerRef.current, char, {
        width: size,
        height: size,
        padding: 8,
        strokeAnimationSpeed: 1.2,
        delayBetweenStrokes: 250,
        showOutline: true,
        strokeColor: "#334155",
        outlineColor: "#e2e8f0",
        radicalColor: "#3b82f6",
        charDataLoader: (charToLoad: string, onComplete: (data: any) => void) => {
          fetchWithFallback(charToLoad)
            .then((data) => {
              setLoading(false);
              onComplete(data);
            })
            .catch(() => {
              setLoading(false);
              setFailed(true);
            });
        },
        onLoadCharDataError: () => {
          setLoading(false);
          setFailed(true);
        },
      });
    } catch {
      setLoading(false);
      setFailed(true);
    }

    return () => {
      writerRef.current = null;
    };
  }, [character, size]);

  const handleAnimate = useCallback(() => {
    const w = writerRef.current;
    if (!w) return;
    try {
      // Reset to outline state then animate
      w.hideCharacter();
      setTimeout(() => {
        w.animateCharacter();
      }, 150);
    } catch {
      try { w.animateCharacter(); } catch { /* ignore */ }
    }
  }, []);

  if (failed) {
    return (
      <div className="flex flex-col items-center justify-center" style={{ width: size, height: size + 20 }}>
        <span style={{ fontSize: size * 0.6, color: "#334155", fontWeight: "bold", lineHeight: `${size}px` }}>
          {character.charAt(0)}
        </span>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col items-center justify-center cursor-pointer"
      onClick={handleAnimate}
      title="Click để xem nét bút"
    >
      <div ref={containerRef} className="flex items-center justify-center relative" style={{ width: size, height: size }}>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/30 rounded">
            <Loader2 size={20} className="animate-spin text-primary" />
          </div>
        )}
      </div>
      <p className="text-[10px] text-muted-foreground mt-1">
        {loading ? "Đang tải nét bút..." : "Click để xem nét bút"}
      </p>
    </div>
  );
};

export default HanziStrokeOrder;
