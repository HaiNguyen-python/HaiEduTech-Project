import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Wifi } from "lucide-react";
import type { OnlineUser } from "@/hooks/useYourCornerPresence";

interface Props {
  users: OnlineUser[];
  currentUserId: string;
  onOpenChat: (u: OnlineUser) => void;
}

export default function OnlineUsersPanel({ users, currentUserId, onOpenChat }: Props) {
  const others = users.filter((u) => u.user_id !== currentUserId);

  return (
    <Card className="p-5 backdrop-blur-md bg-white/80 dark:bg-card/80 border-primary/10 shadow-sm">
      <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
        </span>
        Đang học cùng bạn
        <span className="ml-auto text-xs font-medium text-emerald-600">{users.length}</span>
      </h3>

      {others.length === 0 ? (
        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
          <Wifi className="w-3.5 h-3.5" /> Chưa có bạn nào online. Rủ bạn vào học nhé!
        </p>
      ) : (
        <ul className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
          {others.map((u) => {
            const name = u.full_name?.trim() || "Học viên";
            const initial = name.split(/\s+/).slice(-1)[0]?.[0]?.toUpperCase() || "?";
            return (
              <li key={u.user_id}>
                <button
                  type="button"
                  onClick={() => onOpenChat(u)}
                  className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-muted text-left group"
                >
                  <div className="relative shrink-0">
                    <Avatar className="h-8 w-8">
                      {u.avatar_url && <AvatarImage src={u.avatar_url} alt={name} />}
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-emerald-500 text-white text-xs">
                        {initial}
                      </AvatarFallback>
                    </Avatar>
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-background" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold truncate">{name}</div>
                    <div className="text-[10px] text-muted-foreground">Đang online</div>
                  </div>
                  <span className="opacity-0 group-hover:opacity-100 text-[10px] text-primary font-medium transition">
                    Nhắn tin
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}
