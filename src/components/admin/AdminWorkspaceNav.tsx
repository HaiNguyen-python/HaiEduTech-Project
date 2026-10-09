import { useEffect, useState } from "react";
import { DndContext, PointerSensor, KeyboardSensor, closestCenter, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { supabase } from "@/integrations/supabase/client";
import { moveTool, normalizeToolOrder, type ToolOrder } from "@/lib/adminToolOrder";
import SortableAdminTool from "./SortableAdminTool";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  BarChart3,
  Bell,
  BookOpen,
  Brain,
  Building2,
  CalendarDays,
  ChartNoAxesCombined,
  ClipboardCheck,
  ClipboardList,
  DollarSign,
  ExternalLink,
  FileSearch,
  FileText,
  Gauge,
  Languages,
  Award,
  HeartPulse,
  LayoutDashboard,
  LibraryBig,
  MessageSquareText,
  Microscope,
  Quote,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  UserCog,
  Users,
  GripVertical, RotateCcw, Check,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

export type AdminTabGroup = "overview" | "students" | "learning" | "content-research" | "private" | "operations";

type NavItem = {
  id: string;
  labelVi: string;
  labelEn: string;
  icon: LucideIcon;
  teacherOnly?: boolean;
};

// eslint-disable-next-line react-refresh/only-export-components
export const ADMIN_NAV_GROUPS: Array<{
  id: AdminTabGroup;
  labelVi: string;
  labelEn: string;
  icon: LucideIcon;
  items: NavItem[];
}> = [
  {
    id: "overview",
    labelVi: "Tổng quan",
    labelEn: "Overview",
    icon: LayoutDashboard,
    items: [
      { id: "overview", labelVi: "Trung tâm điều hành", labelEn: "Command center", icon: Gauge },
      { id: "system", labelVi: "Trạng thái hệ thống", labelEn: "System status", icon: Activity },
    ],
  },
  {
    id: "students",
    labelVi: "Học viên",
    labelEn: "Students",
    icon: Users,
    items: [
      { id: "students", labelVi: "Danh sách học viên", labelEn: "Student overview", icon: Users },
      { id: "insights", labelVi: "Mối quan tâm", labelEn: "User insights", icon: Search },
      { id: "attendance", labelVi: "Điểm danh", labelEn: "Attendance", icon: CalendarDays },
      { id: "feedback", labelVi: "Phản hồi", labelEn: "Feedback", icon: MessageSquareText },
      { id: "chatbot", labelVi: "Hội thoại chatbot", labelEn: "Chatbot reviews", icon: Sparkles },
    ],
  },
  {
    id: "learning",
    labelVi: "Học tập & AI",
    labelEn: "Learning & AI",
    icon: Brain,
    items: [
      { id: "rl-engine", labelVi: "Hệ thống can thiệp", labelEn: "RL engine", icon: Brain },
      { id: "rl-interventions", labelVi: "Can thiệp tự động", labelEn: "RL dispatcher", icon: Bell },
      { id: "strategy", labelVi: "Chiến lược", labelEn: "Strategy", icon: ChartNoAxesCombined },
      { id: "dictionary", labelVi: "Từ điển", labelEn: "Dictionary", icon: BookOpen },
      { id: "content-studio", labelVi: "Xưởng nội dung", labelEn: "Content studio", icon: LibraryBig },
    ],
  },
  {
    id: "content-research",
    labelVi: "Nội dung & Nghiên cứu",
    labelEn: "Content & Research",
    icon: Microscope,
    items: [
      { id: "deep-dives", labelVi: "Bài giảng chuyên sâu", labelEn: "Deep-dives", icon: BookOpen },
      { id: "phd-research", labelVi: "Nghiên cứu Tiến sĩ", labelEn: "PhD research", icon: Microscope },
      { id: "edtech-insights", labelVi: "Nghiên cứu EdTech", labelEn: "EdTech insights", icon: FileSearch },
    ],
  },
  {
    id: "private",
    labelVi: "Học riêng",
    labelEn: "Private study",
    icon: Languages,
    items: [
      { id: "private-languages", labelVi: "Phần Lan & Thụy Điển", labelEn: "Finnish & Swedish", icon: Languages, teacherOnly: true },
    ],
  },
  {
    id: "operations",
    labelVi: "Vận hành",
    labelEn: "Operations",
    icon: Settings2,
    items: [
      { id: "income", labelVi: "Thu nhập", labelEn: "Income", icon: DollarSign, teacherOnly: true },
      { id: "assistants", labelVi: "Cộng tác viên", labelEn: "Assistants", icon: UserCog },
      { id: "schedule", labelVi: "Lịch học", labelEn: "Schedule", icon: CalendarDays },
      { id: "report-logs", labelVi: "Báo cáo email", labelEn: "Report logs", icon: ClipboardList },
      { id: "service-requests", labelVi: "Yêu cầu dịch vụ", labelEn: "Service requests", icon: ClipboardCheck },
      { id: "testimonials", labelVi: "Kết quả học viên", labelEn: "Student results", icon: Quote },
      { id: "certificates", labelVi: "Chứng chỉ", labelEn: "Certificates", icon: Award },
      { id: "course-notices", labelVi: "Giấy báo khóa học", labelEn: "Course notices", icon: FileText, teacherOnly: true },
      { id: "health", labelVi: "Giám sát hệ thống", labelEn: "Health monitor", icon: HeartPulse },
    ],
  },
];

// eslint-disable-next-line react-refresh/only-export-components
export const ADMIN_TAB_TO_GROUP = Object.fromEntries(
  ADMIN_NAV_GROUPS.flatMap((group) => group.items.map((item) => [item.id, group.id])),
) as Record<string, AdminTabGroup>;

interface AdminWorkspaceNavProps {
  activeTab: string;
  isTeacher: boolean;
  isVietnamese: boolean;
  onTabChange: (tab: string, group: AdminTabGroup) => void;
}

const quickLinks = [
  { path: "/admin/assignments", labelVi: "Quản lý bài tập", labelEn: "Assignments", icon: ClipboardList },
  { path: "/admin/classes", labelVi: "Quản lý lớp học", labelEn: "Class management", icon: Building2 },
  { path: "/admin/placement-test-results", labelVi: "Kết quả đầu vào", labelEn: "Placement results", icon: ClipboardCheck },
];

export default function AdminWorkspaceNav({
  activeTab,
  isTeacher,
  isVietnamese,
  onTabChange,
}: AdminWorkspaceNavProps) {
  const navigate = useNavigate();
  const { setOpenMobile } = useSidebar();
  const defaults = Object.fromEntries(ADMIN_NAV_GROUPS.map(group => [group.id, group.items.map(item => item.id)]));
  const [order, setOrder] = useState<ToolOrder>(defaults);
  const [storageKey, setStorageKey] = useState<string | null>(null);
  const [reordering, setReordering] = useState(false);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));
  useEffect(() => {
    let cancelled = false;
    supabase.auth.getUser().then(({ data }) => {
      if (cancelled || !data.user) return;
      const key = `admin-tool-order-v1:${data.user.id}`;
      setStorageKey(key);
      try { setOrder(normalizeToolOrder(JSON.parse(localStorage.getItem(key) || "null"), defaults)); } catch { setOrder(defaults); }
    });
    return () => { cancelled = true; };
  }, []);
  const persistOrder = (next: ToolOrder) => {
    setOrder(next);
    if (storageKey) { try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch { /* Ordering remains available for this session. */ } }
  };
  const onDragEnd = ({ active, over }: DragEndEvent) => { if (over) persistOrder(moveTool(order, String(active.id), String(over.id))); };
  const itemById = new Map(ADMIN_NAV_GROUPS.flatMap(group => group.items).map(item => [item.id, item]));
  const text = (vi: string, en: string) => (isVietnamese ? vi : en);

  const selectTab = (tab: string, group: AdminTabGroup) => {
    onTabChange(tab, group);
    setOpenMobile(false);
  };

  return (
    <Sidebar collapsible="icon" className="admin-sidebar border-r border-sidebar-border bg-sidebar">
      <SidebarHeader className="border-b border-sidebar-border bg-sidebar px-3 py-4">
        <div className="flex items-center gap-3 overflow-hidden px-1">
          <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <ShieldCheck className="size-5" />
          </div>
          <div className="min-w-0 group-data-[collapsible=icon]:hidden">
            <p className="font-display text-base font-bold text-sidebar-foreground">HaiEduTech</p>
            <p className="text-xs font-medium text-muted-foreground">Admin workspace</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-sidebar px-2 py-3">
        <div className="flex items-center justify-end gap-1 group-data-[collapsible=icon]:hidden">
          {reordering && <Button variant="ghost" size="icon" className="size-7" title={text("Khôi phục thứ tự", "Reset tool order")} aria-label="Reset tool order" onClick={() => persistOrder(defaults)}><RotateCcw className="size-4" /></Button>}
          <Button variant={reordering ? "secondary" : "ghost"} size="sm" className="h-8 gap-1.5 text-xs" disabled={!storageKey} onClick={() => setReordering(value => !value)}>{reordering ? <Check className="size-3.5" /> : <GripVertical className="size-3.5" />}{reordering ? text("Xong", "Done") : text("Sắp xếp", "Arrange tools")}</Button>
        </div>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        {ADMIN_NAV_GROUPS.map((group) => {
          const visibleItems = (order[group.id] || []).flatMap(id => { const item = itemById.get(id); return item && (!item.teacherOnly || isTeacher) ? [item] : []; });
          if (visibleItems.length === 0) return null;
          const GroupIcon = group.icon;
          return (
            <SidebarGroup key={group.id} className="py-1">
              <SidebarGroupLabel className="gap-2 font-bold uppercase tracking-wide">
                <GroupIcon />
                {text(group.labelVi, group.labelEn)}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SortableContext items={visibleItems.map(item => item.id)} strategy={verticalListSortingStrategy}>
                  {visibleItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SortableAdminTool id={item.id} label={text(item.labelVi, item.labelEn)} enabled={reordering}>
                      <SidebarMenuButton
                        isActive={activeTab === item.id}
                        tooltip={text(item.labelVi, item.labelEn)}
                        onClick={() => selectTab(item.id, ADMIN_TAB_TO_GROUP[item.id])}
                        className="h-9 font-medium data-[active=true]:font-semibold"
                      >
                        <item.icon />
                        <span>{text(item.labelVi, item.labelEn)}</span>
                      </SidebarMenuButton>
                      </SortableAdminTool>
                    </SidebarMenuItem>
                  ))}
                  </SortableContext>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}
        </DndContext>

        {isTeacher && (
          <SidebarGroup className="border-t border-sidebar-border pt-3">
            <SidebarGroupLabel>{text("Truy cập nhanh", "Quick access")}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {quickLinks.map((item) => (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      tooltip={text(item.labelVi, item.labelEn)}
                      onClick={() => navigate(item.path)}
                      className="h-9 font-medium"
                    >
                      <item.icon />
                      <span>{text(item.labelVi, item.labelEn)}</span>
                      <ExternalLink className="ml-auto size-3 opacity-50 group-data-[collapsible=icon]:hidden" />
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border bg-sidebar p-3">
        <div className="flex items-center gap-2 rounded-md border border-admin-success/20 bg-admin-success/10 px-3 py-2 text-admin-success group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-2">
          <span className="size-2 shrink-0 rounded-full bg-admin-success" aria-hidden="true" />
          <span className="truncate text-xs font-semibold group-data-[collapsible=icon]:hidden">
            {text("Hệ thống ổn định", "System operational")}
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/")}
          className="justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-2"
        >
          <ExternalLink className="size-4" />
          <span className="group-data-[collapsible=icon]:hidden">{text("Về trang học", "Learning site")}</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}