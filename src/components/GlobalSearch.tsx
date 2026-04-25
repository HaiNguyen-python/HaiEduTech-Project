/**
 * @file GlobalSearch.tsx
 * @description Cmd/Ctrl+K command palette indexing all main routes including Study Abroad modules.
 */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator,
} from "@/components/ui/command";
import {
  Search, Compass, FolderLock, FileText, GraduationCap, Briefcase, BookOpen, Newspaper,
  Code2, Languages, Globe, MessageSquare, PenTool, Map, Award, Cpu, Library, Swords, Heart, Brain,
  Home as HomeIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface SearchEntry {
  to: string;
  label: string;
  group: string;
  icon: React.ComponentType<{ className?: string }>;
  keywords?: string;
}

interface GlobalSearchProps {
  variant?: "icon" | "button";
}

const GlobalSearch = ({ variant = "icon" }: GlobalSearchProps) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Cmd/Ctrl+K toggles palette
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((p) => !p);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const go = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  // Searchable index - Study Abroad routes prioritized
  const studyAbroad: SearchEntry[] = [
    { to: "/study-abroad", label: t("Cổng du học", "Study Abroad Hub"), group: "abroad", icon: Compass, keywords: "study abroad du hoc portal" },
    { to: "/study-abroad/documents", label: t("Hồ sơ của tôi (Vault)", "My Documents Vault"), group: "abroad", icon: FolderLock, keywords: "documents vault transcripts ho so" },
    { to: "/study-abroad/motivation-letter", label: t("Motivation Letter Master", "Motivation Letter Guide"), group: "abroad", icon: FileText, keywords: "motivation letter ml master" },
    { to: "/study-abroad/sat", label: t("Lộ trình SAT", "SAT Roadmap"), group: "abroad", icon: Map, keywords: "sat roadmap" },
    { to: "/study-abroad/phd", label: t("PhD Global Pathway", "PhD Pathway"), group: "abroad", icon: GraduationCap, keywords: "phd doctorate cold email research proposal" },
    { to: "/global-scholarship", label: t("Tư vấn học bổng cùng Mr. Hai", "Scholarship Consulting with Mr. Hai"), group: "abroad", icon: Newspaper, keywords: "scholarship hoc bong mr hai advisor" },
  ];

  const learning: SearchEntry[] = [
    { to: "/english", label: t("Học Tiếng Anh", "Learn English"), group: "learn", icon: BookOpen },
    { to: "/english/ielts", label: "IELTS Program", group: "learn", icon: BookOpen },
    { to: "/english/toeic", label: "TOEIC", group: "learn", icon: BookOpen },
    { to: "/english/grammar", label: t("Ngữ pháp tiếng Anh", "English Grammar"), group: "learn", icon: PenTool },
    { to: "/chinese", label: t("Học Tiếng Trung", "Learn Chinese"), group: "learn", icon: Languages },
    { to: "/learn-vietnamese", label: t("Học Tiếng Việt", "Learn Vietnamese"), group: "learn", icon: Globe },
    { to: "/finnish", label: t("Học Tiếng Phần Lan", "Learn Finnish"), group: "learn", icon: Languages },
    { to: "/programming", label: t("Học Lập Trình", "Learn Programming"), group: "learn", icon: Code2 },
    { to: "/python-challenges", label: t("150 Thử thách Python", "150 Python Challenges"), group: "learn", icon: Code2 },
  ];

  const practice: SearchEntry[] = [
    { to: "/ielts-vocabulary", label: t("Từ vựng IELTS", "IELTS Vocabulary"), group: "practice", icon: Library },
    { to: "/toeic-vocabulary", label: t("Từ vựng TOEIC", "TOEIC Vocabulary"), group: "practice", icon: Library },
    { to: "/chinese/hsk/vocabulary", label: t("Từ vựng HSK", "HSK Vocabulary"), group: "practice", icon: Library },
    { to: "/ielts-writing-practice", label: t("Luyện viết IELTS", "IELTS Writing Practice"), group: "practice", icon: PenTool },
    { to: "/ielts-speaking-practice", label: t("Luyện nói IELTS", "IELTS Speaking Practice"), group: "practice", icon: MessageSquare },
    { to: "/ai-grading", label: t("Chấm điểm AI", "AI Grading"), group: "practice", icon: Cpu },
    { to: "/vocab-arena", label: "Vocab Arena", group: "practice", icon: Swords },
  ];

  const general: SearchEntry[] = [
    { to: "/", label: t("Trang chủ", "Home"), group: "general", icon: HomeIcon },
    { to: "/about", label: t("Giới thiệu", "About"), group: "general", icon: Brain },
    { to: "/dashboard", label: t("Bảng điều khiển", "Dashboard"), group: "general", icon: Award },
    { to: "/notebook", label: t("Sổ tay", "Notebook"), group: "general", icon: PenTool },
    { to: "/contact", label: t("Liên hệ", "Contact"), group: "general", icon: MessageSquare },
    { to: "/for-vietnamese-children", label: t("Vì Trẻ Em VN", "For Vietnamese Children"), group: "general", icon: Heart },
  ];

  const renderGroup = (entries: SearchEntry[]) =>
    entries.map((e) => (
      <CommandItem
        key={e.to}
        value={`${e.label} ${e.keywords ?? ""}`}
        onSelect={() => go(e.to)}
        className="cursor-pointer"
      >
        <e.icon className="mr-2 h-4 w-4 text-primary" />
        <span>{e.label}</span>
      </CommandItem>
    ));

  return (
    <>
      {variant === "icon" ? (
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9"
          onClick={() => setOpen(true)}
          aria-label={t("Tìm kiếm", "Search")}
          title={t("Tìm kiếm (Ctrl+K)", "Search (Ctrl+K)")}
        >
          <Search className="h-4 w-4" />
        </Button>
      ) : (
        <Button
          variant="outline"
          onClick={() => setOpen(true)}
          className="gap-2 text-muted-foreground hover:text-foreground"
        >
          <Search className="h-4 w-4" />
          <span className="hidden sm:inline">{t("Tìm kiếm...", "Search...")}</span>
          <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px]">
            ⌘K
          </kbd>
        </Button>
      )}

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder={t("Tìm trang, bài học, hồ sơ du học...", "Search pages, lessons, study abroad...")} />
        <CommandList>
          <CommandEmpty>{t("Không tìm thấy kết quả.", "No results found.")}</CommandEmpty>

          <CommandGroup heading={t("🌍 Du học", "🌍 Study Abroad")}>
            {renderGroup(studyAbroad)}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading={t("📚 Học tập", "📚 Learn")}>
            {renderGroup(learning)}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading={t("✏️ Luyện tập", "✏️ Practice")}>
            {renderGroup(practice)}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading={t("⚙️ Khác", "⚙️ General")}>
            {renderGroup(general)}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default GlobalSearch;
