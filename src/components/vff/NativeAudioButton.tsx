/**
 * NativeAudioButton - plays a native-speaker clip from vff_audio_clips storage if available,
 * otherwise falls back to Vietnamese TTS.
 */
import { useState, useEffect } from "react";
import { Volume2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { playVietnameseTts } from "@/lib/vietnameseTts";

interface Props {
  text: string;
  clipKey?: string;
  region?: "north" | "south";
  playbackRate?: number;
  size?: "sm" | "default" | "icon";
  variant?: "outline" | "ghost" | "secondary";
}

const cache = new Map<string, string | null>();

export default function NativeAudioButton({ text, clipKey, region = "north", playbackRate = 0.95, size = "icon", variant = "ghost" }: Props) {
  const [busy, setBusy] = useState(false);
  const [url, setUrl] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    if (!clipKey) { setUrl(null); return; }
    const cacheKey = `${clipKey}:${region}`;
    if (cache.has(cacheKey)) { setUrl(cache.get(cacheKey) ?? null); return; }
    (async () => {
      const { data } = await supabase.from("vff_audio_clips").select("audio_url").eq("clip_key", clipKey).eq("region", region).maybeSingle();
      const u = data?.audio_url ?? null;
      cache.set(cacheKey, u);
      setUrl(u);
    })();
  }, [clipKey, region]);

  const play = async () => {
    if (busy) return;
    setBusy(true);
    try {
      if (url) {
        const audio = new Audio(url);
        audio.playbackRate = playbackRate;
        await audio.play();
        audio.onended = () => setBusy(false);
        return;
      }
      await playVietnameseTts(text, { playbackRate });
    } catch { /* ignore */ }
    setBusy(false);
  };

  return (
    <Button size={size} variant={variant} onClick={play} aria-label="Play audio" className="shrink-0">
      {busy ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Volume2 className="w-3.5 h-3.5" />}
    </Button>
  );
}
