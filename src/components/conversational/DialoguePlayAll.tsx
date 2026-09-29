import { useEffect, useRef, useState } from "react";
import { Headphones, Square } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  lines: string[];
  play: (text: string) => Promise<unknown>;
  stop: () => void;
  onLineChange?: (index: number | null) => void;
  label?: string;
  hint?: string;
}

/** Plays every line of a dialogue in order so learners listen before practising. */
const DialoguePlayAll = ({ lines, play, stop, onLineChange, label = "Play full conversation", hint = "Listen to the whole conversation first, then practise each line." }: Props) => {
  const [playing, setPlaying] = useState(false);
  const token = useRef(0);

  useEffect(() => () => { token.current++; stop(); }, [stop]);

  const handleStop = () => {
    token.current++;
    stop();
    setPlaying(false);
    onLineChange?.(null);
  };

  const handlePlay = async () => {
    if (playing) return handleStop();
    const my = ++token.current;
    setPlaying(true);
    for (let i = 0; i < lines.length; i++) {
      if (my !== token.current) return;
      onLineChange?.(i);
      await play(lines[i]);
      if (my !== token.current) return;
      await new Promise((r) => setTimeout(r, 450));
    }
    if (my === token.current) {
      setPlaying(false);
      onLineChange?.(null);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-md border border-primary/30 bg-primary/5 p-3">
      <Button type="button" onClick={handlePlay} className="gap-2" variant={playing ? "outline" : "default"}>
        {playing ? <Square className="h-4 w-4" /> : <Headphones className="h-4 w-4" />}
        {playing ? "Stop" : label}
      </Button>
      <p className="text-sm font-medium text-muted-foreground">{hint}</p>
    </div>
  );
};

export default DialoguePlayAll;
