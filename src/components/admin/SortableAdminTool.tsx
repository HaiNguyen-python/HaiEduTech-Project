import type { ReactNode } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SortableAdminTool({ id, label, enabled, children }: { id: string; label: string; enabled: boolean; children: ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id, disabled: !enabled });
  return <div ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition }} className={`relative flex items-center rounded-md ${isDragging ? "z-30 bg-sidebar-accent opacity-70 ring-2 ring-sidebar-ring" : ""}`}>
    <div className="min-w-0 flex-1">{children}</div>
    {enabled && <Button variant="ghost" size="icon" className="size-7 shrink-0 touch-none cursor-grab text-muted-foreground active:cursor-grabbing" aria-label={`Move ${label}`} title={`Move ${label}`} {...attributes} {...listeners}><GripVertical className="size-4" /></Button>}
  </div>;
}