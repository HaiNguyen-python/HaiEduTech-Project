import { useEffect, useRef, useCallback, useState } from "react";
import HanziWriter from "hanzi-writer";
import { Loader2 } from "lucide-react";

interface HanziStrokeOrderProps {
  character: string;
  size?: number;
  compact?: boolean;
}

const CDN_URLS = [
  "https://cdnjs.cloudflare.com/ajax/libs/hanzi-writer-data/2.0.1",
  "https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0.1",
  "https://unpkg.com/hanzi-writer-data@2.0.1",
  "https://esm.sh/hanzi-writer-data@2.0.1",
];

const HanziStrokeOrder = ({ character, size = 120, compact = false }: HanziStrokeOrderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const writerRef = useRef<any>(null);
  const autoPlayedRef = useRef(false);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    // Use a dedicated inner node that HanziWriter owns, so React never touches its children
    const host = document.createElement("div");
    host.style.width = `${size}px`;
    host.style.height = `${size}px`;
    containerRef.current.appendChild(host);

    setLoading(true);
    setFailed(false);
    setHasPlayed(false);
    autoPlayedRef.current = false;

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

    let cancelled = false;

    try {
      writerRef.current = HanziWriter.create(host, char, {
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
              if (cancelled) return;
              setLoading(false);
              onComplete(data);
              if (!autoPlayedRef.current) {
                autoPlayedRef.current = true;
                setTimeout(() => {
                  if (cancelled) return;
                  try {
                    writerRef.current?.animateCharacter({
                      onComplete: () => !cancelled && setHasPlayed(true),
                    });
                  } catch {
                    setHasPlayed(true);
                  }
                }, 400);
              }
            })
            .catch(() => {
              if (cancelled) return;
              setLoading(false);
              setFailed(true);
            });
        },
        onLoadCharDataError: () => {
          if (cancelled) return;
          setLoading(false);
          setFailed(true);
        },
      });
    } catch {
      setLoading(false);
      setFailed(true);
    }

    return () => {
      cancelled = true;
      writerRef.current = null;
      // Safely detach the host node managed by HanziWriter
      if (host.parentNode) {
        try { host.parentNode.removeChild(host); } catch { /* ignore */ }
      }
    };
  }, [character, size]);

  const handleAnimate = useCallback(() => {
    const w = writerRef.current;
    if (!w) return;
    try {
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
      title="Click để xem lại nét bút"
    >
      <div ref={containerRef} className="flex items-center justify-center relative" style={{ width: size, height: size }}>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/30 rounded">
            <Loader2 size={20} className="animate-spin text-primary" />
          </div>
        )}
      </div>
      {!compact && (
        <p className="text-[10px] text-muted-foreground mt-1">
          {loading ? "Đang tải nét bút..." : hasPlayed ? "Click để xem lại nét bút" : "Đang vẽ nét bút..."}
        </p>
      )}
    </div>
  );
};

export default HanziStrokeOrder;
