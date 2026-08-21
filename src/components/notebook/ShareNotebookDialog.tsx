/**
 * @file ShareNotebookDialog.tsx
 * @description Pick people who should see a notebook note (read-only) in their
 * own notebook. Owner can also revoke existing shares.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Search, Share2, UserMinus, Loader2 } from "lucide-react";
import {
  fetchDirectory,
  fetchShareRecipients,
  shareNotebook,
  unshareNotebook,
  type DirectoryPerson,
  type ShareRecipient,
} from "@/lib/notebookShareService";

interface Props {
  notebookId: string | null;
  noteTitle?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ShareNotebookDialog = ({ notebookId, noteTitle, open, onOpenChange }: Props) => {
  const { toast } = useToast();
  const [people, setPeople] = useState<DirectoryPerson[]>([]);
  const [recipients, setRecipients] = useState<ShareRecipient[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [sharing, setSharing] = useState(false);

  useEffect(() => {
    if (!open || !notebookId) return;
    setSelected([]);
    setQuery("");
    setLoading(true);
    (async () => {
      const [dir, rec] = await Promise.all([
        fetchDirectory(),
        fetchShareRecipients(notebookId),
      ]);
      setPeople(dir);
      setRecipients(rec);
      setLoading(false);
    })();
  }, [open, notebookId]);

  const sharedIds = useMemo(() => new Set(recipients.map((r) => r.recipient_id)), [recipients]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return people.filter((p) => !q || (p.full_name || "").toLowerCase().includes(q));
  }, [people, query]);

  const toggle = (id: string) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const handleShare = async () => {
    if (!notebookId || !selected.length) return;
    setSharing(true);
    const err = await shareNotebook(notebookId, selected);
    setSharing(false);
    if (err) {
      toast({ title: "Không chia sẻ được", description: err, variant: "destructive" });
      return;
    }
    toast({ title: "Đã chia sẻ ✅", description: `${selected.length} người sẽ thấy ghi chú này` });
    setSelected([]);
    setRecipients(await fetchShareRecipients(notebookId));
  };

  const handleRevoke = async (shareId: string) => {
    const err = await unshareNotebook(shareId);
    if (err) {
      toast({ title: "Lỗi", description: err, variant: "destructive" });
      return;
    }
    setRecipients((prev) => prev.filter((r) => r.share_id !== shareId));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base">
            <Share2 className="w-4 h-4" /> Chia sẻ ghi chú
          </DialogTitle>
        </DialogHeader>

        {noteTitle && (
          <p className="text-sm text-muted-foreground -mt-2 truncate">{noteTitle}</p>
        )}

        {recipients.length > 0 && (
          <div className="rounded-md border border-border p-2">
            <p className="text-xs font-medium mb-2">Đang chia sẻ với ({recipients.length})</p>
            <div className="flex flex-wrap gap-1.5">
              {recipients.map((r) => (
                <Badge key={r.share_id} variant="secondary" className="gap-1 pr-1">
                  {r.recipient_name || "Học viên"}
                  <button
                    onClick={() => handleRevoke(r.share_id)}
                    className="ml-0.5 rounded hover:text-destructive"
                    title="Bỏ chia sẻ"
                  >
                    <UserMinus className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Tìm tên học viên..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="max-h-64 overflow-y-auto rounded-md border border-border divide-y divide-border">
          {loading ? (
            <div className="p-4 text-sm text-muted-foreground flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" /> Đang tải danh sách...
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-4 text-sm text-muted-foreground">Không tìm thấy ai phù hợp</div>
          ) : (
            filtered.map((p) => {
              const already = sharedIds.has(p.user_id);
              return (
                <label
                  key={p.user_id}
                  className={`flex items-center gap-3 px-3 py-2 text-sm cursor-pointer hover:bg-accent/50 ${
                    already ? "opacity-60" : ""
                  }`}
                >
                  <Checkbox
                    checked={already || selected.includes(p.user_id)}
                    disabled={already}
                    onCheckedChange={() => toggle(p.user_id)}
                  />
                  <span className="truncate flex-1">{p.full_name || "Học viên"}</span>
                  {already && <span className="text-xs text-muted-foreground">đã chia sẻ</span>}
                </label>
              );
            })
          )}
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Đóng</Button>
          <Button onClick={handleShare} disabled={!selected.length || sharing} className="gap-2">
            <Share2 className="w-4 h-4" />
            {sharing ? "Đang chia sẻ..." : `Chia sẻ (${selected.length})`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareNotebookDialog;
