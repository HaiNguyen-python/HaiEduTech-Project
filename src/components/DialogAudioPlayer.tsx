/**
 * Seekable, speed-adjustable dialog audio player.
 * Pre-generates one concatenated WAV from the multi-voice TTS pipeline so the
 * browser can natively scrub and adjust playbackRate (0.9-1.3x).
 */
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, RotateCcw, Loader2, AlertTriangle } from "lucide-react";
import { prepareDialogAudio } from "@/lib/dialogAudioBlob";
import type { DialogLang } from "@/lib/multiVoiceDialog";

interface Props {
  transcript: string;
  lang: DialogLang;
  accentClass?: string; // tailwind classes for the Play button gradient
}

const formatTime = (s: number): string => {
  if (!isFinite(s) || s < 0) s = 0;
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

const DialogAudioPlayer = ({ transcript, lang, accentClass }: Props) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const urlRef = useRef<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [rate, setRate] = useState(1.0);

  // Reset when transcript changes
  useEffect(() => {
    if (audioRef.current) { try { audioRef.current.pause(); } catch { /* ignore */ } }
    if (urlRef.current) { URL.revokeObjectURL(urlRef.current); urlRef.current = null; }
    audioRef.current = null;
    setStatus("idle");
    setPlaying(false);
    setCurrent(0);
    setDuration(0);
  }, [transcript, lang]);

  // Cleanup on unmount
  useEffect(() => () => {
    if (audioRef.current) { try { audioRef.current.pause(); } catch { /* ignore */ } }
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
  }, []);

  const ensureLoaded = async (): Promise<HTMLAudioElement | null> => {
    if (audioRef.current) return audioRef.current;
    setStatus("loading");
    const res = await prepareDialogAudio(transcript, lang);
    if (!res) { setStatus("error"); return null; }
    urlRef.current = res.url;
    const a = new Audio(res.url);
    a.playbackRate = rate;
    a.ontimeupdate = () => setCurrent(a.currentTime);
    a.onloadedmetadata = () => setDuration(isFinite(a.duration) ? a.duration : res.duration);
    a.onended = () => setPlaying(false);
    a.onpause = () => setPlaying(false);
    a.onplay = () => setPlaying(true);
    audioRef.current = a;
    setDuration(res.duration);
    setStatus("ready");
    return a;
  };

  const handlePlayPause = async () => {
    const a = await ensureLoaded();
    if (!a) return;
    if (a.paused) {
      try { await a.play(); } catch { /* ignore */ }
    } else {
      a.pause();
    }
  };

  const handleSeek = (v: number[]) => {
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = Math.min(v[0], duration);
    setCurrent(a.currentTime);
  };

  const handleRate = (v: number[]) => {
    const r = Math.max(0.9, Math.min(1.3, v[0]));
    setRate(r);
    if (audioRef.current) audioRef.current.playbackRate = r;
  };

  const handleRestart = () => {
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = 0;
    setCurrent(0);
    if (a.paused) void a.play().catch(() => {});
  };

  return (
    <div className="space-y-3 rounded-xl border border-border bg-card/50 p-3 sm:p-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          size="sm"
          onClick={handlePlayPause}
          disabled={status === "loading"}
          className={accentClass ?? "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"}
        >
          {status === "loading" ? (
            <><Loader2 className="h-4 w-4 mr-1 animate-spin" /> Loading...</>
          ) : playing ? (
            <><Pause className="h-4 w-4 mr-1" /> Pause</>
          ) : (
            <><Play className="h-4 w-4 mr-1" /> Play Audio</>
          )}
        </Button>
        <Button size="sm" variant="outline" onClick={handleRestart} disabled={status !== "ready"}>
          <RotateCcw className="h-4 w-4 mr-1" /> Restart
        </Button>
        <div className="ml-auto text-xs text-muted-foreground tabular-nums">
          {formatTime(current)} / {formatTime(duration)}
        </div>
      </div>

      {/* Progress / seek bar */}
      <Slider
        value={[current]}
        min={0}
        max={Math.max(duration, 0.01)}
        step={0.1}
        onValueChange={handleSeek}
        disabled={status !== "ready"}
        aria-label="Audio progress"
      />

      {/* Speed slider */}
      <div className="flex items-center gap-3">
        <span className="text-xs text-muted-foreground shrink-0">🎚 Speed</span>
        <Slider
          value={[rate]}
          min={0.9}
          max={1.3}
          step={0.05}
          onValueChange={handleRate}
          className="flex-1"
          aria-label="Playback speed"
        />
        <span className="text-xs font-medium tabular-nums w-12 text-right">{rate.toFixed(2)}x</span>
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 text-xs text-destructive">
          <AlertTriangle className="h-3.5 w-3.5" />
          Could not load audio. Please try again.
        </div>
      )}
    </div>
  );
};

export default DialogAudioPlayer;
