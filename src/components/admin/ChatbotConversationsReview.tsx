/**
 * ChatbotConversationsReview - Teacher/admin view of every student's
 * AI Study Pet conversation. Lets staff confirm the chatbot is being
 * used for learning (not abuse/off-topic) and spot students who may
 * need a check-in.
 */
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Flag, FlagOff, Search, User } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };
type ChatRow = {
  id: string;
  user_id: string;
  messages: Msg[];
  message_count: number;
  pet_name: string | null;
  pet_level: number | null;
  flagged: boolean;
  flag_reason: string | null;
  updated_at: string;
  studentName?: string;
  studentEmail?: string;
};

const ChatbotConversationsReview = () => {
  const [rows, setRows] = useState<ChatRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [onlyFlagged, setOnlyFlagged] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data } = await (supabase as any)
      .from("chatbot_conversations")
      .select("id, user_id, messages, message_count, pet_name, pet_level, flagged, flag_reason, updated_at")
      .order("updated_at", { ascending: false })
      .limit(200);
    const conversations = (data || []) as ChatRow[];

    // Resolve student profiles in one round-trip
    const ids = Array.from(new Set(conversations.map((c) => c.user_id)));
    let profiles: Record<string, { full_name?: string; email?: string }> = {};
    if (ids.length) {
      const { data: profs } = await supabase
        .from("profiles")
        .select("id, full_name, email")
        .in("id", ids);
      profiles = Object.fromEntries((profs || []).map((p: any) => [p.id, p]));
    }
    setRows(
      conversations.map((c) => ({
        ...c,
        studentName: profiles[c.user_id]?.full_name || "Học viên",
        studentEmail: profiles[c.user_id]?.email,
      }))
    );
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => {
      if (onlyFlagged && !r.flagged) return false;
      if (!q) return true;
      if (r.studentName?.toLowerCase().includes(q)) return true;
      if (r.studentEmail?.toLowerCase().includes(q)) return true;
      if (r.pet_name?.toLowerCase().includes(q)) return true;
      return r.messages?.some((m) => m.content?.toLowerCase().includes(q));
    });
  }, [rows, query, onlyFlagged]);

  const current = filtered.find((r) => r.id === selected) || filtered[0];

  const toggleFlag = async (row: ChatRow) => {
    const next = !row.flagged;
    await (supabase as any)
      .from("chatbot_conversations")
      .update({ flagged: next, flag_reason: next ? "Đánh dấu để kiểm tra" : null })
      .eq("id", row.id);
    setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, flagged: next } : r)));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          Hội thoại AI Pet của học sinh
          <Badge variant="secondary">{rows.length}</Badge>
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Kiểm tra học sinh sử dụng chatbot có đúng mục đích học tập không. Cờ đỏ giúp lưu lại các cuộc trò chuyện cần theo dõi.
        </p>
      </CardHeader>
      <CardContent>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm theo học sinh, email, tên pet, từ khóa..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button
            variant={onlyFlagged ? "default" : "outline"}
            size="sm"
            onClick={() => setOnlyFlagged((v) => !v)}
          >
            <Flag className="mr-1.5 h-4 w-4" /> Chỉ cờ đỏ
          </Button>
          <Button variant="outline" size="sm" onClick={load}>Tải lại</Button>
        </div>

        <div className="grid gap-3 lg:grid-cols-[320px_1fr]">
          {/* Conversation list */}
          <ScrollArea className="h-[520px] rounded-md border">
            {loading && <div className="p-4 text-sm text-muted-foreground">Đang tải...</div>}
            {!loading && filtered.length === 0 && (
              <div className="p-4 text-sm text-muted-foreground">Chưa có hội thoại nào.</div>
            )}
            {!loading && filtered.map((r) => {
              const active = current?.id === r.id;
              const last = r.messages?.[r.messages.length - 1];
              const preview = (last?.content || "").slice(0, 70);
              return (
                <button
                  key={r.id}
                  onClick={() => setSelected(r.id)}
                  className={`w-full border-b px-3 py-2.5 text-left text-sm transition-colors ${active ? "bg-primary/10" : "hover:bg-muted/60"}`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-1.5 font-semibold truncate">
                      <User className="h-3.5 w-3.5 text-primary" />
                      <span className="truncate">{r.studentName}</span>
                    </span>
                    {r.flagged && <Flag className="h-3.5 w-3.5 shrink-0 text-destructive" />}
                  </div>
                  <div className="mt-0.5 text-[11px] text-muted-foreground">
                    {r.pet_name ? `🐾 ${r.pet_name}` : "🐾 Pet"}
                    {r.pet_level ? ` · LV.${r.pet_level}` : ""}
                    {" · "}{r.message_count} tin · {new Date(r.updated_at).toLocaleDateString("vi-VN")}
                  </div>
                  <div className="mt-1 line-clamp-2 text-[11px] text-muted-foreground">{preview}</div>
                </button>
              );
            })}
          </ScrollArea>

          {/* Transcript */}
          <ScrollArea className="h-[520px] rounded-md border">
            {!current && <div className="p-4 text-sm text-muted-foreground">Chọn một học sinh để xem hội thoại.</div>}
            {current && (
              <div className="p-3">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2 rounded-md bg-muted/60 px-3 py-2 text-xs">
                  <div>
                    <div className="font-semibold text-sm">{current.studentName}</div>
                    <div className="text-muted-foreground">
                      {current.studentEmail} · 🐾 {current.pet_name || "Pet"} · LV.{current.pet_level || "?"} · {current.message_count} tin
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant={current.flagged ? "destructive" : "outline"}
                    onClick={() => toggleFlag(current)}
                  >
                    {current.flagged ? <><FlagOff className="mr-1 h-3.5 w-3.5" /> Bỏ cờ</> : <><Flag className="mr-1 h-3.5 w-3.5" /> Đánh dấu</>}
                  </Button>
                </div>
                <div className="space-y-2">
                  {(current.messages || []).map((m, i) => (
                    <div
                      key={i}
                      className={`rounded-lg px-3 py-2 text-sm whitespace-pre-wrap ${
                        m.role === "user" ? "bg-primary/10 ml-6" : "bg-muted mr-6"
                      }`}
                    >
                      <div className="mb-0.5 text-[10px] font-semibold uppercase text-muted-foreground">
                        {m.role === "user" ? "Học sinh" : "AI Pet"}
                      </div>
                      <div>{m.content}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatbotConversationsReview;
