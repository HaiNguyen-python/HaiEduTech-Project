/**
 * NLPSandbox — "Train your Chatbot"
 * Students map keyword → custom reply. The mini engine tokenizes the user's
 * message, lowercases & matches against trained intents (simple contains
 * match). Demonstrates intent classification in a friendly way.
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, Plus, Trash2, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Intent = { id: string; keyword: string; reply: string };
type ChatMsg = { who: "user" | "bot"; text: string };

const NLPSandbox = () => {
  const [intents, setIntents] = useState<Intent[]>([
    { id: "1", keyword: "hello", reply: "Xin chào bạn! 👋" },
    { id: "2", keyword: "homework", reply: "Mình giúp bạn ôn bài nhé! 📚" },
    { id: "3", keyword: "game", reply: "Học xong rồi chơi nha 🎮" },
  ]);
  const [draft, setDraft] = useState({ keyword: "", reply: "" });
  const [chat, setChat] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");

  const addIntent = () => {
    const k = draft.keyword.trim().toLowerCase();
    const r = draft.reply.trim();
    if (!k || !r) return;
    setIntents((p) => [...p, { id: Date.now().toString(), keyword: k, reply: r }]);
    setDraft({ keyword: "", reply: "" });
  };

  const removeIntent = (id: string) =>
    setIntents((p) => p.filter((i) => i.id !== id));

  const send = () => {
    const msg = input.trim();
    if (!msg) return;
    const lower = msg.toLowerCase();
    const hit = intents.find((i) => lower.includes(i.keyword));
    const reply = hit
      ? hit.reply
      : "Mình chưa được dạy câu này 🤖 — hãy thêm intent mới ở bên trái!";
    setChat((p) => [...p, { who: "user", text: msg }, { who: "bot", text: reply }]);
    setInput("");
  };

  return (
    <div className="grid md:grid-cols-2 gap-3">
      {/* Trainer */}
      <div className="rounded-2xl border-2 border-fuchsia-400/40 bg-fuchsia-500/5 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Bot className="w-4 h-4 text-fuchsia-600" />
          <h4 className="font-bold text-sm">🧠 Dạy chatbot (Intents)</h4>
        </div>
        <div className="space-y-2 max-h-44 overflow-y-auto mb-3">
          {intents.map((i) => (
            <div key={i.id} className="flex items-center gap-2 p-2 rounded-lg bg-background border">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-fuchsia-500/15 text-fuchsia-700 dark:text-fuchsia-300">
                {i.keyword}
              </span>
              <span className="text-xs flex-1 truncate">{i.reply}</span>
              <button onClick={() => removeIntent(i.id)} className="text-rose-500 hover:text-rose-700">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <Input
            placeholder="Từ khoá (vd: bài tập)"
            value={draft.keyword}
            onChange={(e) => setDraft({ ...draft, keyword: e.target.value })}
            className="text-sm"
          />
          <Input
            placeholder="Câu trả lời tự động"
            value={draft.reply}
            onChange={(e) => setDraft({ ...draft, reply: e.target.value })}
            className="text-sm"
          />
          <Button onClick={addIntent} className="w-full bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white">
            <Plus className="w-4 h-4 mr-1" /> Thêm intent
          </Button>
        </div>
      </div>

      {/* Chat */}
      <div className="rounded-2xl border-2 border-purple-400/40 bg-gradient-to-br from-purple-500/5 to-indigo-500/5 p-4 flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <MessageSquare className="w-4 h-4 text-purple-600" />
          <h4 className="font-bold text-sm">💬 Thử nói với bot</h4>
        </div>
        <div className="flex-1 min-h-[180px] max-h-[260px] overflow-y-auto space-y-2 mb-3 p-2 rounded-lg bg-background/60">
          {chat.length === 0 && (
            <p className="text-xs text-muted-foreground text-center py-8">
              Gõ "hello" hoặc "game" để bot trả lời 👇
            </p>
          )}
          <AnimatePresence initial={false}>
            {chat.map((m, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${m.who === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[80%] px-3 py-1.5 rounded-2xl text-sm ${
                  m.who === "user"
                    ? "bg-purple-600 text-white rounded-br-sm"
                    : "bg-background border rounded-bl-sm"
                }`}>
                  {m.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Nhắn gì đó..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            className="text-sm"
          />
          <Button onClick={send} size="icon" className="bg-purple-600 text-white">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NLPSandbox;
