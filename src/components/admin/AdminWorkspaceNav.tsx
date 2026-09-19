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
  Gauge,
  HeartPulse,
  LayoutDashboard,
  LibraryBig,
  MessageSquareText,
  Microscope,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  UserCog,
  Users,
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

export type AdminTabGroup = "overview" | "students" | "learning" | "content-research" | "operations";

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
      { id: "certificates", labelVi: "Chứng chỉ", labelEn: "Certificates", icon: Award },
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
        {ADMIN_NAV_GROUPS.map((group) => {
          const visibleItems = group.items.filter((item) => !item.teacherOnly || isTeacher);
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
                  {visibleItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        isActive={activeTab === item.id}
                        tooltip={text(item.labelVi, item.labelEn)}
                        onClick={() => selectTab(item.id, group.id)}
                        className="h-9 font-medium data-[active=true]:font-semibold"
                      >
                        <item.icon />
                        <span>{text(item.labelVi, item.labelEn)}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}

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