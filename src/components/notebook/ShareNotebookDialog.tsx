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
import { Search, Share2, UserMinus, Loader2, Eye, Pencil } from "lucide-react";
import {
  fetchDirectory,
  fetchShareRecipients,
  shareNotebook,
  setSharePermission,
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
  const [canEdit, setCanEdit] = useState(false);

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
    const err = await shareNotebook(notebookId, selected, canEdit);
    setSharing(false);
    if (err) {
      toast({ title: "Không chia sẻ được", description: err, variant: "destructive" });
      return;
    }
    toast({
      title: "Đã chia sẻ ✅",
      description: `${selected.length} người có thể ${canEdit ? "xem và chỉnh sửa" : "xem"} ghi chú này`,
    });
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

  const handleTogglePermission = async (r: ShareRecipient) => {
    const next = !r.can_edit;
    const err = await setSharePermission(r.share_id, next);
    if (err) {
      toast({ title: "Lỗi", description: err, variant: "destructive" });
      return;
    }
    setRecipients((prev) =>
      prev.map((x) => (x.share_id === r.share_id ? { ...x, can_edit: next } : x)),
    );
  };

  const allSelectableIds = useMemo(
    () => filtered.filter((p) => !sharedIds.has(p.user_id)).map((p) => p.user_id),
    [filtered, sharedIds],
  );
  const allSelected =
    allSelectableIds.length > 0 && allSelectableIds.every((id) => selected.includes(id));

  const toggleAll = () =>
    setSelected((prev) =>
      allSelected ? prev.filter((id) => !allSelectableIds.includes(id)) : Array.from(new Set([...prev, ...allSelectableIds])),
    );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="z-[200] max-w-xl w-[95vw] max-h-[90vh] flex flex-col gap-3">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base">
            <Share2 className="w-4 h-4" /> Chia sẻ ghi chú
          </DialogTitle>
        </DialogHeader>

        {noteTitle && (
          <p className="text-sm text-muted-foreground -mt-2 truncate">{noteTitle}</p>
        )}

        <div className="rounded-md border border-border p-2 flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium">Quyền cho người được chọn:</span>
          <div className="flex gap-1">
            <Button
              size="sm"
              variant={canEdit ? "outline" : "default"}
              onClick={() => setCanEdit(false)}
              className="h-8 gap-1 text-xs"
            >
              <Eye className="w-3.5 h-3.5" /> Chỉ xem
            </Button>
            <Button
              size="sm"
              variant={canEdit ? "default" : "outline"}
              onClick={() => setCanEdit(true)}
              className="h-8 gap-1 text-xs"
            >
              <Pencil className="w-3.5 h-3.5" /> Có thể chỉnh sửa
            </Button>
          </div>
        </div>

        {recipients.length > 0 && (
          <div className="rounded-md border border-border p-2 max-h-28 overflow-y-auto">
            <p className="text-xs font-medium mb-2">
              Đang chia sẻ với ({recipients.length}) - nhấn nhãn quyền để đổi
            </p>
            <div className="flex flex-wrap gap-1.5">
              {recipients.map((r) => (
                <Badge key={r.share_id} variant="secondary" className="gap-1 pr-1 text-sm">
                  {r.recipient_name || "Học viên"}
                  <button
                    onClick={() => handleTogglePermission(r)}
                    className={`ml-1 rounded px-1.5 py-0.5 text-[11px] font-medium ${
                      r.can_edit
                        ? "bg-primary/15 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                    title="Đổi quyền xem / chỉnh sửa"
                  >
                    {r.can_edit ? "Có thể sửa" : "Chỉ xem"}
                  </button>
                  <button
                    onClick={() => handleRevoke(r.share_id)}
                    className="ml-0.5 rounded hover:text-destructive"
                    title="Bỏ chia sẻ"
                  >
                    <UserMinus className="w-3.5 h-3.5" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            autoFocus
            placeholder="Tìm tên học viên..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9 h-11 text-base"
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {loading ? "Đang tải..." : `${filtered.length} học viên`}
          </span>
          {allSelectableIds.length > 0 && (
            <Button variant="ghost" size="sm" onClick={toggleAll} className="h-8">
              {allSelected ? "Bỏ chọn tất cả" : "Chọn tất cả"}
            </Button>
          )}
        </div>

        <div className="flex-1 min-h-[220px] max-h-[45vh] overflow-y-auto rounded-md border border-border divide-y divide-border">
          {loading ? (
            <div className="p-4 text-sm text-muted-foreground flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" /> Đang tải danh sách...
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-4 text-sm text-muted-foreground">Không tìm thấy ai phù hợp</div>
          ) : (
            filtered.map((p) => {
              const already = sharedIds.has(p.user_id);
              const checked = already || selected.includes(p.user_id);
              return (
                <label
                  key={p.user_id}
                  className={`flex items-center gap-3 px-3 py-3 text-base cursor-pointer transition-colors ${
                    already
                      ? "opacity-60 cursor-default"
                      : checked
                        ? "bg-primary/10 hover:bg-primary/15"
                        : "hover:bg-accent/60"
                  }`}
                >
                  <Checkbox
                    className="w-5 h-5"
                    checked={checked}
                    disabled={already}
                    onCheckedChange={() => toggle(p.user_id)}
                  />
                  {p.avatar_url ? (
                    <img
                      src={p.avatar_url}
                      alt=""
                      className="w-8 h-8 rounded-full object-cover shrink-0"
                    />
                  ) : (
                    <span className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm shrink-0">
                      {(p.full_name || "H").trim().charAt(0).toUpperCase()}
                    </span>
                  )}
                  <span className="truncate flex-1">{p.full_name || "Học viên"}</span>
                  {already && <span className="text-xs text-muted-foreground shrink-0">đã chia sẻ</span>}
                </label>
              );
            })
          )}
        </div>

        <div className="flex justify-end gap-2 pt-1 border-t border-border">
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

