import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Music, Mic, Languages, Sparkles, BookOpen, Play, ArrowLeft, CheckCircle2, XCircle, Globe, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

type SongLanguage = "english" | "chinese" | "finnish" | "vietnamese";

interface LyricWord {
  w: string;
  ipa?: string;
  pinyin?: string;
  meaning: string;
}
interface LyricLine {
  original: string;
  translation: string;
  words?: LyricWord[];
}
interface CoreVocab {
  word: string;
  ipa?: string;
  pinyin?: string;
  meaning: string;
  example: string;
}
interface BlankItem {
  lineIndex: number;
  blanks: { wordIndex: number; answer: string }[];
}
interface Song {
  id: string;
  language: SongLanguage;
  title: string;
  artist: string;
  difficulty: "easy" | "intermediate" | "advanced";
  youtube_id: string | null;
  album_art_url: string | null;
  cultural_note: string | null;
  cultural_note_en: string | null;
  is_public_domain: boolean;
  lyrics: LyricLine[];
  core_vocab: CoreVocab[];
  blanks_quiz: BlankItem[];
}

// Soft brand color per language
const LANG_THEME: Record<SongLanguage, { from: string; to: string; ring: string; label: string }> = {
  english: { from: "from-violet-500/15", to: "to-fuchsia-500/10", ring: "ring-violet-400/30", label: "EN" },
  chinese: { from: "from-rose-500/15", to: "to-amber-500/10", ring: "ring-rose-400/30", label: "中" },
  finnish: { from: "from-sky-500/15", to: "to-cyan-400/10", ring: "ring-sky-400/30", label: "FI" },
  vietnamese: { from: "from-emerald-500/15", to: "to-yellow-400/10", ring: "ring-emerald-400/30", label: "VN" },
};

const DIFFICULTY_COLOR: Record<string, string> = {
  easy: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
  intermediate: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30",
  advanced: "bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30",
};

interface Props {
  language: SongLanguage;
}

export default function SongLibrary({ language }: Props) {
  const { t } = useLanguage();
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Song | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("language_songs")
        .select("*")
        .eq("language", language)
        .eq("is_published", true)
        .order("display_order", { ascending: true });
      if (!mounted) return;
      if (!error && data) setSongs(data as unknown as Song[]);
      setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, [language]);

  const theme = LANG_THEME[language];

  if (loading) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        <Music className="w-10 h-10 mx-auto mb-3 animate-pulse" />
        {t("Đang tải bài hát...", "Loading songs...")}
      </div>
    );
  }

  if (selected) {
    return <SongDetail song={selected} theme={theme} onBack={() => setSelected(null)} />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative overflow-hidden rounded-2xl border bg-gradient-to-br ${theme.from} ${theme.to} p-6 md:p-8`}
      >
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-background/80 backdrop-blur flex items-center justify-center shadow-lg">
            <Music className="w-7 h-7 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-1">
              {t("Học qua bài hát", "Learn through Songs")}
            </h2>
            <p className="text-sm md:text-base text-muted-foreground">
              {t(
                "Lyrics song ngữ • Hover từ để dịch • Karaoke highlight • Bài tập điền từ",
                "Bilingual lyrics • Hover words to translate • Karaoke highlight • Fill-in-blanks quiz",
              )}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Song grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {songs.map((song, i) => (
            <motion.div
              key={song.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card
                onClick={() => setSelected(song)}
                className={`group cursor-pointer overflow-hidden border-2 hover:border-primary/40 hover:shadow-xl transition-all bg-gradient-to-br ${theme.from} ${theme.to}`}
              >
                <div className="relative aspect-video overflow-hidden bg-muted">
                  {song.album_art_url ? (
                    <img
                      src={song.album_art_url}
                      alt={song.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Music className="w-12 h-12 text-muted-foreground/40" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/95 flex items-center justify-center shadow-2xl">
                      <Play className="w-6 h-6 text-primary ml-1" fill="currentColor" />
                    </div>
                  </div>
                  {song.is_public_domain && (
                    <Badge className="absolute top-2 left-2 bg-emerald-500/90 text-white border-0 text-[10px]">
                      <Globe className="w-3 h-3 mr-1" />
                      Public Domain
                    </Badge>
                  )}
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base leading-tight line-clamp-2">{song.title}</CardTitle>
                  <p className="text-xs text-muted-foreground truncate">{song.artist}</p>
                </CardHeader>
                <CardContent className="pt-0 pb-4 flex items-center gap-2 flex-wrap">
                  <Badge variant="outline" className={DIFFICULTY_COLOR[song.difficulty]}>
                    {song.difficulty.toUpperCase()}
                  </Badge>
                  <Badge variant="outline" className="text-[10px]">
                    <BookOpen className="w-3 h-3 mr-1" />
                    {song.core_vocab?.length ?? 0} {t("từ", "words")}
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {songs.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <Music className="w-10 h-10 mx-auto mb-3 opacity-40" />
          {t("Chưa có bài hát.", "No songs yet.")}
        </div>
      )}
    </div>
  );
}

// =====================================================
// SONG DETAIL — Player + Lyrics + Vocab + Quiz
// =====================================================
function SongDetail({
  song,
  theme,
  onBack,
}: {
  song: Song;
  theme: { from: string; to: string; ring: string; label: string };
  onBack: () => void;
}) {
  const { t } = useLanguage();
  const [karaokeIndex, setKaraokeIndex] = useState<number>(-1);
  const [karaokePlaying, setKaraokePlaying] = useState(false);

  // Karaoke: simple line-based highlight with manual timer (auto-advance)
  useEffect(() => {
    if (!karaokePlaying) return;
    const interval = setInterval(() => {
      setKaraokeIndex((prev) => {
        if (prev >= song.lyrics.length - 1) {
          setKaraokePlaying(false);
          return -1;
        }
        return prev + 1;
      });
    }, 4000); // ~4s per line
    return () => clearInterval(interval);
  }, [karaokePlaying, song.lyrics.length]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <Button variant="ghost" onClick={onBack} className="gap-2">
        <ArrowLeft className="w-4 h-4" />
        {t("Quay lại thư viện", "Back to library")}
      </Button>

      {/* Header card */}
      <div className={`rounded-2xl border bg-gradient-to-br ${theme.from} ${theme.to} p-6`}>
        <div className="flex items-start gap-3 mb-2">
          <Music className="w-7 h-7 text-primary mt-1 flex-shrink-0" />
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold">{song.title}</h2>
            <p className="text-sm text-muted-foreground">{song.artist}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          <Badge variant="outline" className={DIFFICULTY_COLOR[song.difficulty]}>
            {song.difficulty.toUpperCase()}
          </Badge>
          {song.is_public_domain && (
            <Badge className="bg-emerald-500/90 text-white border-0">Public Domain</Badge>
          )}
        </div>
      </div>

      {/* YouTube embed with thumbnail fallback — some official artist videos block embedding */}
      {song.youtube_id && (
        <YouTubePlayer videoId={song.youtube_id} title={song.title} />
      )}

      <Tabs defaultValue="lyrics" className="w-full">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl mx-auto">
          <TabsTrigger value="lyrics" className="gap-1.5 text-xs sm:text-sm">
            <Languages className="w-3.5 h-3.5" />
            {t("Lyrics", "Lyrics")}
          </TabsTrigger>
          <TabsTrigger value="vocab" className="gap-1.5 text-xs sm:text-sm">
            <BookOpen className="w-3.5 h-3.5" />
            {t("Từ vựng", "Vocab")}
          </TabsTrigger>
          <TabsTrigger value="quiz" className="gap-1.5 text-xs sm:text-sm">
            <Sparkles className="w-3.5 h-3.5" />
            {t("Điền từ", "Blanks")}
          </TabsTrigger>
          <TabsTrigger value="culture" className="gap-1.5 text-xs sm:text-sm">
            <Globe className="w-3.5 h-3.5" />
            {t("Văn hóa", "Culture")}
          </TabsTrigger>
        </TabsList>

        {/* LYRICS */}
        <TabsContent value="lyrics" className="mt-6">
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle className="text-lg flex items-center gap-2">
                <Mic className="w-5 h-5 text-primary" />
                {t("Lyrics song ngữ", "Bilingual lyrics")}
              </CardTitle>
              <Button
                size="sm"
                variant={karaokePlaying ? "default" : "outline"}
                onClick={() => {
                  if (karaokePlaying) {
                    setKaraokePlaying(false);
                    setKaraokeIndex(-1);
                  } else {
                    setKaraokeIndex(0);
                    setKaraokePlaying(true);
                  }
                }}
                className="gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                {karaokePlaying ? t("Dừng", "Stop") : t("Karaoke", "Karaoke")}
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <TooltipProvider delayDuration={150}>
                {song.lyrics.map((line, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: karaokeIndex === i ? 1.02 : 1,
                      backgroundColor:
                        karaokeIndex === i ? "hsl(var(--primary) / 0.08)" : "transparent",
                    }}
                    transition={{ duration: 0.3 }}
                    className={`p-3 rounded-lg border-l-4 ${
                      karaokeIndex === i
                        ? "border-primary shadow-md"
                        : "border-transparent hover:border-muted-foreground/30"
                    }`}
                  >
                    <div className="text-base md:text-lg font-medium leading-relaxed flex flex-wrap gap-x-1 gap-y-0.5">
                      {renderInteractiveLine(line)}
                    </div>
                    <p className="text-sm text-muted-foreground italic mt-1">{line.translation}</p>
                  </motion.div>
                ))}
              </TooltipProvider>
            </CardContent>
          </Card>
        </TabsContent>

        {/* VOCAB */}
        <TabsContent value="vocab" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {song.core_vocab.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-baseline gap-2 mb-1 flex-wrap">
                      <span className="font-display text-xl font-bold text-primary">{v.word}</span>
                      {v.pinyin && (
                        <span className="text-sm text-amber-600 dark:text-amber-400">{v.pinyin}</span>
                      )}
                      {v.ipa && (
                        <span className="text-xs text-muted-foreground font-mono">{v.ipa}</span>
                      )}
                    </div>
                    <p className="text-sm font-medium">{v.meaning}</p>
                    <p className="text-xs text-muted-foreground italic mt-1">"{v.example}"</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* QUIZ */}
        <TabsContent value="quiz" className="mt-6">
          <BlanksQuiz song={song} />
        </TabsContent>

        {/* CULTURE */}
        <TabsContent value="culture" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                {t("Bối cảnh văn hóa", "Cultural context")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {song.cultural_note && (
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-sm font-medium text-muted-foreground mb-1">🇻🇳 Tiếng Việt</p>
                  <p className="text-base leading-relaxed">{song.cultural_note}</p>
                </div>
              )}
              {song.cultural_note_en && (
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-sm font-medium text-muted-foreground mb-1">🇬🇧 English</p>
                  <p className="text-base leading-relaxed">{song.cultural_note_en}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}

// Render words inside a line, with hover-translate tooltips for known words
function renderInteractiveLine(line: LyricLine) {
  const tokens = line.original.split(/(\s+)/); // preserve spaces
  const wordMap = new Map<string, LyricWord>();
  (line.words ?? []).forEach((w) => wordMap.set(w.w.toLowerCase(), w));

  return tokens.map((tok, idx) => {
    if (/^\s+$/.test(tok)) return <span key={idx}>{tok}</span>;
    const cleaned = tok.replace(/[.,!?;:'"()，。！？]/g, "");
    const match = wordMap.get(cleaned.toLowerCase());
    if (!match) {
      return <span key={idx}>{tok}</span>;
    }
    return (
      <Tooltip key={idx}>
        <TooltipTrigger asChild>
          <span className="cursor-help underline decoration-dotted decoration-primary/60 underline-offset-4 hover:bg-primary/10 rounded px-0.5 transition-colors">
            {tok}
          </span>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          <div className="space-y-0.5">
            <p className="font-bold text-base">{match.w}</p>
            {match.pinyin && <p className="text-xs text-amber-300">{match.pinyin}</p>}
            {match.ipa && <p className="text-xs font-mono opacity-80">{match.ipa}</p>}
            <p className="text-sm">{match.meaning}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    );
  });
}

// =====================================================
// FILL IN THE BLANKS QUIZ
// =====================================================
function BlanksQuiz({ song }: { song: Song }) {
  const { t } = useLanguage();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const items = song.blanks_quiz ?? [];
  const totalBlanks = useMemo(
    () => items.reduce((sum, it) => sum + it.blanks.length, 0),
    [items],
  );
  const correctCount = useMemo(() => {
    if (!submitted) return 0;
    let c = 0;
    items.forEach((it) => {
      it.blanks.forEach((b) => {
        const key = `${it.lineIndex}-${b.wordIndex}`;
        if ((answers[key] ?? "").trim().toLowerCase() === b.answer.toLowerCase()) c++;
      });
    });
    return c;
  }, [submitted, answers, items]);

  if (items.length === 0) {
    return (
      <Card>
        <CardContent className="py-10 text-center text-muted-foreground">
          {t("Bài hát này chưa có bài tập điền từ.", "No fill-in-blanks for this song yet.")}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          {t("Nghe và điền vào chỗ trống", "Listen & fill in the blanks")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item) => {
          const line = song.lyrics[item.lineIndex];
          if (!line) return null;
          const words = line.original.split(/\s+/);
          const blankMap = new Map(item.blanks.map((b) => [b.wordIndex, b.answer]));
          return (
            <div key={item.lineIndex} className="p-3 rounded-lg bg-muted/40">
              <div className="flex flex-wrap items-center gap-1.5 text-base">
                {words.map((w, wi) => {
                  if (blankMap.has(wi)) {
                    const key = `${item.lineIndex}-${wi}`;
                    const correct = blankMap.get(wi)!;
                    const userVal = answers[key] ?? "";
                    const isCorrect =
                      submitted && userVal.trim().toLowerCase() === correct.toLowerCase();
                    const isWrong = submitted && !isCorrect;
                    return (
                      <span key={wi} className="inline-flex items-center gap-1">
                        <input
                          type="text"
                          value={userVal}
                          disabled={submitted}
                          onChange={(e) =>
                            setAnswers((p) => ({ ...p, [key]: e.target.value }))
                          }
                          className={`inline-block w-24 px-2 py-1 text-sm rounded border-2 bg-background ${
                            isCorrect
                              ? "border-emerald-500 text-emerald-700"
                              : isWrong
                                ? "border-rose-500 text-rose-700"
                                : "border-primary/40 focus:border-primary"
                          } focus:outline-none`}
                          placeholder="___"
                        />
                        {submitted && isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        )}
                        {submitted && isWrong && (
                          <span className="text-xs text-emerald-600 ml-1">→ {correct}</span>
                        )}
                      </span>
                    );
                  }
                  return <span key={wi}>{w}</span>;
                })}
              </div>
              <p className="text-xs text-muted-foreground italic mt-1">{line.translation}</p>
            </div>
          );
        })}

        <div className="flex items-center gap-3 pt-2">
          {!submitted ? (
            <Button onClick={() => setSubmitted(true)} className="gap-2">
              <CheckCircle2 className="w-4 h-4" />
              {t("Kiểm tra đáp án", "Check answers")}
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={() => {
                setSubmitted(false);
                setAnswers({});
              }}
            >
              {t("Làm lại", "Try again")}
            </Button>
          )}
          {submitted && (
            <Badge
              variant="outline"
              className={
                correctCount === totalBlanks
                  ? "bg-emerald-500/15 text-emerald-700 border-emerald-500/30"
                  : "bg-amber-500/15 text-amber-700 border-amber-500/30"
              }
            >
              {correctCount} / {totalBlanks}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
