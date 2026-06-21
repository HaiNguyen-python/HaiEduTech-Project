import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Send, ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { OnlineUser } from "@/hooks/useYourCornerPresence";

type Message = {
  id: string;
  sender_id: string;
  recipient_id: string;
  content: string;
  read_at: string | null;
  created_at: string;
};

type Peer = {
  user_id: string;
  full_name: string | null;
  avatar_url: string | null;
};

type RecentPeer = Peer & {
  last_message: string;
  last_at: string;
  unread: number;
  last_from_me: boolean;
};

interface Props {
  currentUserId: string;
  activePeer: Peer | null;
  setActivePeer: (p: Peer | null) => void;
  onlineUsers: OnlineUser[];
  directory?: Peer[];
}


const QUICK_EMOJIS = ["👍", "❤️", "😂", "🔥", "🎉", "👏", "💪", "🤔"];

function formatTime(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  const sameDay = d.toDateString() === now.toDateString();
  if (sameDay) return d.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
  const diffDays = Math.floor((now.getTime() - d.getTime()) / 86400000);
  if (diffDays < 7) return d.toLocaleDateString("vi-VN", { weekday: "short", hour: "2-digit", minute: "2-digit" });
  return d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" });
}


/**
 * Inline Messenger card for Your Corner.
 * - Shows inbox (recent conversations) when no peer selected
 * - Shows thread + composer when a peer is selected
 * - Realtime DMs via Supabase Realtime
 */
export default function Messenger({ currentUserId, activePeer, setActivePeer, onlineUsers, directory = [] }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [unread, setUnread] = useState(0);
  const [recent, setRecent] = useState<RecentPeer[]>([]);
  const [showEmoji, setShowEmoji] = useState(false);
  const [search, setSearch] = useState("");
  const [fetchedDir, setFetchedDir] = useState<Peer[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const activePeerRef = useRef<Peer | null>(activePeer);
  useEffect(() => { activePeerRef.current = activePeer; }, [activePeer]);

  // Fetch full classmate directory via SECURITY DEFINER RPC
  useEffect(() => {
    (async () => {
      const { data } = await supabase.rpc("get_your_corner_directory" as any);
      if (data) setFetchedDir(data.map((d: any) => ({ user_id: d.user_id, full_name: d.full_name, avatar_url: d.avatar_url })));
    })();
  }, [currentUserId]);

  const mergedDirectory = useMemo(() => {
    const map = new Map<string, Peer>();
    [...fetchedDir, ...directory].forEach((p) => {
      if (p.user_id && p.user_id !== currentUserId && !map.has(p.user_id)) map.set(p.user_id, p);
    });
    return Array.from(map.values());
  }, [fetchedDir, directory, currentUserId]);


  // Load recent conversations + unread badge with last-message preview
  const loadRecent = useCallback(async () => {
    const { data } = await supabase
      .from("your_corner_messages")
      .select("sender_id, recipient_id, read_at, content, created_at")
      .or(`sender_id.eq.${currentUserId},recipient_id.eq.${currentUserId}`)
      .order("created_at", { ascending: false })
      .limit(120);
    if (!data) return;

    const peerIds: string[] = [];
    let unreadCount = 0;
    const meta = new Map<string, { last_message: string; last_at: string; unread: number; last_from_me: boolean }>();
    data.forEach((m: any) => {
      const other = m.sender_id === currentUserId ? m.recipient_id : m.sender_id;
      if (!meta.has(other)) {
        peerIds.push(other);
        meta.set(other, {
          last_message: m.content,
          last_at: m.created_at,
          unread: 0,
          last_from_me: m.sender_id === currentUserId,
        });
      }
      if (m.recipient_id === currentUserId && !m.read_at) {
        unreadCount++;
        const cur = meta.get(other)!;
        cur.unread += 1;
      }
    });
    setUnread(unreadCount);

    if (peerIds.length > 0) {
      const { data: profs } = await supabase.rpc("get_public_profiles", { _ids: peerIds });
      const profMap = new Map<string, any>();
      (profs ?? []).forEach((p: any) => profMap.set(p.id, p));
      setRecent(
        peerIds
          .filter((id) => profMap.has(id))
          .map((id) => {
            const p = profMap.get(id);
            const m = meta.get(id)!;
            return { user_id: id, full_name: p.full_name, avatar_url: p.avatar_url, ...m };
          })
      );
    } else {
      setRecent([]);
    }
  }, [currentUserId]);

  useEffect(() => {
    loadRecent();
    const ch = supabase
      .channel(`ycm-inbox-${currentUserId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "your_corner_messages", filter: `recipient_id=eq.${currentUserId}` },
        (payload) => {
          loadRecent();
          const m = payload.new as Message;
          const inThisThread = activePeerRef.current && m.sender_id === activePeerRef.current.user_id;
          if (!inThisThread) {
            toast.message("💬 Tin nhắn mới", {
              description: m.content.length > 60 ? m.content.slice(0, 60) + "..." : m.content,
            });
          }
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(ch);
    };
  }, [currentUserId, loadRecent]);


  // Load conversation with active peer + realtime
  useEffect(() => {
    if (!activePeer) {
      setMessages([]);
      return;
    }
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from("your_corner_messages")
        .select("*")
        .or(
          `and(sender_id.eq.${currentUserId},recipient_id.eq.${activePeer.user_id}),and(sender_id.eq.${activePeer.user_id},recipient_id.eq.${currentUserId})`
        )
        .order("created_at", { ascending: true })
        .limit(200);
      if (!cancelled && data) {
        setMessages(data as Message[]);
        const unreadIds = (data as Message[])
          .filter((m) => m.recipient_id === currentUserId && !m.read_at)
          .map((m) => m.id);
        if (unreadIds.length) {
          await supabase
            .from("your_corner_messages")
            .update({ read_at: new Date().toISOString() })
            .in("id", unreadIds);
          loadRecent();
        }
      }
    })();

    const ch = supabase
      .channel(`ycm-thread-${currentUserId}-${activePeer.user_id}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "your_corner_messages" },
        (payload) => {
          const m = payload.new as Message;
          const isThread =
            (m.sender_id === currentUserId && m.recipient_id === activePeer.user_id) ||
            (m.sender_id === activePeer.user_id && m.recipient_id === currentUserId);
          if (!isThread) return;
          setMessages((prev) => (prev.find((p) => p.id === m.id) ? prev : [...prev, m]));
          if (m.recipient_id === currentUserId) {
            supabase
              .from("your_corner_messages")
              .update({ read_at: new Date().toISOString() })
              .eq("id", m.id)
              .then(() => loadRecent());
          }
        }
      )
      .subscribe();
    return () => {
      cancelled = true;
      supabase.removeChannel(ch);
    };
  }, [activePeer, currentUserId, loadRecent]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages.length]);

  const send = async () => {
    if (!activePeer || !draft.trim()) return;
    setSending(true);
    const content = draft.trim().slice(0, 2000);
    const optimistic: Message = {
      id: `tmp-${Date.now()}`,
      sender_id: currentUserId,
      recipient_id: activePeer.user_id,
      content,
      read_at: null,
      created_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, optimistic]);
    setDraft("");
    const { data, error } = await supabase
      .from("your_corner_messages")
      .insert({
        sender_id: currentUserId,
        recipient_id: activePeer.user_id,
        content,
      })
      .select()
      .single();
    if (error) {
      setMessages((prev) => prev.filter((m) => m.id !== optimistic.id));
      toast.error("Không gửi được tin nhắn");
    } else if (data) {
      setMessages((prev) => prev.map((m) => (m.id === optimistic.id ? (data as Message) : m)));
    }
    setSending(false);
  };

  const onlineMap = useMemo(() => new Set(onlineUsers.map((u) => u.user_id)), [onlineUsers]);

  const peerName = activePeer?.full_name?.trim() || "Học viên";
  const peerInitial = peerName.split(/\s+/).slice(-1)[0]?.[0]?.toUpperCase() || "?";

  return (
    <Card className="backdrop-blur-md bg-white/85 dark:bg-card/85 border-primary/15 shadow-sm overflow-hidden flex flex-col" style={{ minHeight: 320 }}>
      <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-600/90 to-emerald-600/90 text-white">
        {activePeer && (
          <button onClick={() => setActivePeer(null)} className="hover:bg-white/20 rounded p-1" aria-label="Quay lại">
            <ArrowLeft className="w-4 h-4" />
          </button>
        )}
        <MessageCircle className="w-4 h-4" />
        <div className="font-semibold text-sm flex-1 truncate">
          {activePeer ? peerName : "Tin nhắn"}
        </div>
        {!activePeer && unread > 0 && (
          <span className="text-[10px] font-bold bg-rose-500 px-1.5 py-0.5 rounded-full">{unread}</span>
        )}
      </div>

      {!activePeer ? (
        <div className="flex-1 flex flex-col">
          {/* Search */}
          <div className="p-2 border-b">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="🔎 Tìm cuộc trò chuyện..."
              className="w-full text-xs px-2.5 py-1.5 rounded-md bg-muted/60 focus:bg-background focus:outline-none focus:ring-1 focus:ring-primary/40"
            />
          </div>
          <div className="flex-1 overflow-y-auto p-2 max-h-96">
            {recent.length > 0 && (
              <div className="px-1 pb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Trò chuyện gần đây
              </div>
            )}
            {recent
              .filter((p) => {
                if (!search.trim()) return true;
                const q = search.toLowerCase();
                return (p.full_name ?? "").toLowerCase().includes(q) || p.last_message.toLowerCase().includes(q);
              })
              .map((p) => {
                const n = p.full_name?.trim() || "Học viên";
                const ini = n.split(/\s+/).slice(-1)[0]?.[0]?.toUpperCase() || "?";
                const preview = (p.last_from_me ? "Bạn: " : "") + p.last_message;
                return (
                  <button
                    key={p.user_id}
                    onClick={() => setActivePeer(p)}
                    className="w-full flex items-center gap-2 p-2 rounded-md hover:bg-muted text-left"
                  >
                    <div className="relative shrink-0">
                      <Avatar className="h-10 w-10">
                        {p.avatar_url && <AvatarImage src={p.avatar_url} alt={n} />}
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-emerald-500 text-white text-xs">
                          {ini}
                        </AvatarFallback>
                      </Avatar>
                      {onlineMap.has(p.user_id) && (
                        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-background" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-sm truncate ${p.unread > 0 ? "font-bold" : "font-semibold"}`}>{n}</span>
                        <span className="text-[10px] text-muted-foreground shrink-0">{formatTime(p.last_at)}</span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-[11px] truncate ${p.unread > 0 ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                          {preview}
                        </span>
                        {p.unread > 0 && (
                          <span className="text-[10px] font-bold bg-rose-500 text-white px-1.5 py-0.5 rounded-full shrink-0">
                            {p.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}

            {/* Directory: start a new chat with any classmate */}
            {(() => {
              const recentIds = new Set(recent.map((r) => r.user_id));
              const others = directory
                .filter((d) => d.user_id !== currentUserId && !recentIds.has(d.user_id))
                .filter((d) => {
                  if (!search.trim()) return true;
                  return (d.full_name ?? "").toLowerCase().includes(search.toLowerCase());
                });
              // Sort: online first, then alpha
              others.sort((a, b) => {
                const ao = onlineMap.has(a.user_id) ? 0 : 1;
                const bo = onlineMap.has(b.user_id) ? 0 : 1;
                if (ao !== bo) return ao - bo;
                return (a.full_name ?? "").localeCompare(b.full_name ?? "");
              });
              if (others.length === 0 && recent.length === 0) {
                return (
                  <div className="text-center text-xs text-muted-foreground p-6">
                    Chưa có học viên nào để nhắn tin.
                    <br />Hãy quay lại sau khi các bạn vào trang nhé!
                  </div>
                );
              }
              if (others.length === 0) return null;
              return (
                <>
                  <div className="px-1 pt-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    ✨ Bắt đầu trò chuyện ({others.length})
                  </div>
                  {others.map((p) => {
                    const n = p.full_name?.trim() || "Học viên";
                    const ini = n.split(/\s+/).slice(-1)[0]?.[0]?.toUpperCase() || "?";
                    const online = onlineMap.has(p.user_id);
                    return (
                      <button
                        key={p.user_id}
                        onClick={() => setActivePeer(p)}
                        className="w-full flex items-center gap-2 p-2 rounded-md hover:bg-muted text-left"
                      >
                        <div className="relative shrink-0">
                          <Avatar className="h-9 w-9">
                            {p.avatar_url && <AvatarImage src={p.avatar_url} alt={n} />}
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-emerald-500 text-white text-xs">
                              {ini}
                            </AvatarFallback>
                          </Avatar>
                          {online && (
                            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-background" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold truncate">{n}</div>
                          <div className="text-[10px] text-muted-foreground">
                            {online ? "🟢 Đang online" : "Bấm để gửi tin"}
                          </div>
                        </div>
                        <span className="text-[10px] text-primary font-medium">Nhắn</span>
                      </button>
                    );
                  })}
                </>
              );
            })()}
          </div>

        </div>
      ) : (
        <>
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-2 bg-muted/30 max-h-72 min-h-[180px]">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center gap-2 text-muted-foreground py-6">
                <Avatar className="h-12 w-12">
                  {activePeer.avatar_url && <AvatarImage src={activePeer.avatar_url} alt={peerName} />}
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-emerald-500 text-white">
                    {peerInitial}
                  </AvatarFallback>
                </Avatar>
                <p className="text-sm font-medium text-foreground">{peerName}</p>
                <p className="text-xs">Gửi tin nhắn đầu tiên 👋</p>
              </div>
            ) : (
              messages.map((m, i) => {
                const mine = m.sender_id === currentUserId;
                const prev = messages[i - 1];
                const showTime = !prev || new Date(m.created_at).getTime() - new Date(prev.created_at).getTime() > 5 * 60 * 1000;
                const isLastMine = mine && i === messages.length - 1;
                return (
                  <div key={m.id}>
                    {showTime && (
                      <div className="text-center text-[10px] text-muted-foreground my-1">{formatTime(m.created_at)}</div>
                    )}
                    <div className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[80%] px-3 py-1.5 rounded-2xl text-sm whitespace-pre-wrap break-words ${
                          mine
                            ? "bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-br-sm"
                            : "bg-background border rounded-bl-sm"
                        }`}
                      >
                        {m.content}
                      </div>
                    </div>
                    {isLastMine && (
                      <div className="text-right text-[10px] text-muted-foreground mt-0.5 pr-1">
                        {m.read_at ? "✓✓ Đã xem" : m.id.startsWith("tmp-") ? "Đang gửi..." : "✓ Đã gửi"}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Quick emoji bar */}
          {showEmoji && (
            <div className="border-t bg-muted/40 px-2 py-1.5 flex flex-wrap gap-1">
              {QUICK_EMOJIS.map((e) => (
                <button
                  key={e}
                  type="button"
                  onClick={() => setDraft((d) => d + e)}
                  className="text-lg hover:scale-125 transition-transform"
                >
                  {e}
                </button>
              ))}
            </div>
          )}

          <div className="border-t p-2 flex items-end gap-1.5 bg-background">
            <button
              type="button"
              onClick={() => setShowEmoji((v) => !v)}
              className="shrink-0 h-9 w-9 rounded-md hover:bg-muted text-lg"
              aria-label="Emoji"
            >
              😊
            </button>
            <Textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  if (!sending && draft.trim()) send();
                }
              }}
              placeholder="Nhắn tin... (Enter để gửi)"
              className="min-h-[38px] max-h-24 resize-none text-sm"
              maxLength={2000}
            />
            <Button
              type="button"
              size="icon"
              onClick={send}
              disabled={sending || !draft.trim()}
              className="shrink-0 h-9 w-9 bg-gradient-to-br from-blue-600 to-emerald-600 text-white"
            >
              {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </Button>
          </div>
          <div className="px-3 pb-1.5 text-[10px] text-muted-foreground">
            {draft.length}/2000 · Enter để gửi, Shift+Enter xuống dòng
          </div>
        </>
      )}

    </Card>
  );
}
