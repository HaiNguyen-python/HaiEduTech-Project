import { useEffect, useRef, useCallback } from "react";
import HanziWriter from "hanzi-writer";

interface HanziStrokeOrderProps {
  character: string;
  size?: number;
}

const HanziStrokeOrder = ({ character, size = 120 }: HanziStrokeOrderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const writerRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = "";
    
    // For multi-character words, only show first character
    const char = character.charAt(0);
    
    const showFallback = () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = `<span style="font-size:${size * 0.6}px;color:#334155;font-weight:bold;line-height:${size}px">${char}</span>`;
      }
    };

    try {
      writerRef.current = HanziWriter.create(containerRef.current, char, {
        width: size,
        height: size,
        padding: 8,
        strokeAnimationSpeed: 1.5,
        delayBetweenStrokes: 300,
        showOutline: true,
        strokeColor: "#334155",
        outlineColor: "#e2e8f0",
        radicalColor: "#3b82f6",
        charDataLoader: (charToLoad: string, onComplete: (data: any) => void) => {
          fetch(`https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0.1/${charToLoad}.json`)
            .then((res) => {
              if (!res.ok) throw new Error("not found");
              return res.json();
            })
            .then((data) => onComplete(data))
            .catch(() => {
              showFallback();
            });
        },
        onLoadCharDataError: () => {
          showFallback();
        },
      });
    } catch {
      showFallback();
    }

    return () => {
      writerRef.current = null;
    };
  }, [character, size]);

  const handleAnimate = useCallback(() => {
    writerRef.current?.animateCharacter();
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center cursor-pointer"
      onClick={handleAnimate}
      title="Click to animate stroke order"
    >
      <div ref={containerRef} className="flex items-center justify-center" />
      <p className="text-[10px] text-muted-foreground mt-1">Click để xem nét bút</p>
    </div>
  );
};

export default HanziStrokeOrder;
