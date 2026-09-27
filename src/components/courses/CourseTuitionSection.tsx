import { ArrowRight, CalendarDays, GraduationCap, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type TuitionSubject = "english" | "chinese" | "programming";

interface TuitionCourse {
  nameVi: string;
  nameEn: string;
  groupPrice: number;
  key: string;
}

// Reference rate: 1 EUR = 31,000 VND (display only, settled per invoice)
const EUR_TO_VND = 31000;

const formatVnd = (eur: number) => {
  const vnd = eur * EUR_TO_VND;
  return `${new Intl.NumberFormat("vi-VN").format(vnd)}₫`;
};

const COURSE_DURATION = "12 tuần / 12 weeks";
const COURSE_SESSIONS = "24 buổi - 36 giờ mỗi khóa";

const tuitionBySubject: Record<TuitionSubject, TuitionCourse[]> = {
  english: [
    { nameVi: "Luyện thi IELTS (Cơ bản - Nâng cao)", nameEn: "IELTS Preparation", groupPrice: 210, key: "english_ielts" },
    { nameVi: "Tiếng Anh Giao Tiếp & Thương mại", nameEn: "Business English", groupPrice: 210, key: "english_business" },
    { nameVi: "Luyện thi SAT", nameEn: "SAT Preparation", groupPrice: 250, key: "english_sat" },
    { nameVi: "Cambridge Starters - Movers - Flyers", nameEn: "Cambridge Starters - Movers - Flyers", groupPrice: 160, key: "english_starters" },
    { nameVi: "Cambridge KET - PET", nameEn: "Cambridge KET - PET", groupPrice: 180, key: "english_ket" },
  ],
  chinese: [
    { nameVi: "HSK 1 - HSK 3", nameEn: "HSK 1 - HSK 3", groupPrice: 180, key: "chinese_hsk" },
    { nameVi: "Giao tiếp căn bản", nameEn: "Basic Conversation", groupPrice: 180, key: "chinese_conversation" },
  ],
  programming: [
    { nameVi: "Lập trình Python", nameEn: "Python Programming", groupPrice: 180, key: "programming_python" },
    { nameVi: "Nền tảng Trí tuệ Nhân tạo", nameEn: "AI Foundation", groupPrice: 180, key: "programming_ai" },
  ],
};

const headingBySubject: Record<TuitionSubject, string> = {
  english: "Khóa học Tiếng Anh / English Courses",
  chinese: "Khóa học Tiếng Trung / Chinese Courses",
  programming: "Khóa học Lập trình / Programming Courses",
};

const subjectStyles: Record<TuitionSubject, { header: string; accent: string; chip: string; button: "default" | "destructive" | "secondary" }> = {
  english: { header: "bg-primary/5", accent: "text-primary", chip: "bg-primary/10", button: "default" },
  chinese: { header: "bg-destructive/5", accent: "text-destructive", chip: "bg-destructive/10", button: "destructive" },
  programming: { header: "bg-accent/10", accent: "text-accent-foreground", chip: "bg-accent/40", button: "secondary" },
};

const PriceCell = ({ eur, accent, chip }: { eur: number; accent: string; chip: string }) => (
  <div className="inline-flex flex-col items-start">
    <span className={cn("inline-flex items-baseline gap-1 rounded-full px-3 py-1 font-display text-xl font-bold", accent, chip)}>
      {eur}
      <span className="text-sm font-semibold opacity-80">EUR</span>
    </span>
    <span className="mt-1 pl-1 text-xs font-medium text-muted-foreground">≈ {formatVnd(eur)}</span>
  </div>
);

const CourseTuitionSection = ({ subject }: { subject: TuitionSubject }) => {
  const courses = tuitionBySubject[subject];
  const styles = subjectStyles[subject];

  return (
    <section aria-labelledby={`${subject}-tuition-heading`} className="mb-14 border-y border-border bg-card shadow-sm shadow-primary/5">
      <div className={cn("border-b border-border bg-gradient-to-r from-background via-background to-transparent px-5 py-6 sm:px-7", styles.header)}>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className={cn("mb-2 flex items-center gap-2 text-sm font-semibold", styles.accent)}>
              <GraduationCap className="h-4 w-4" />
              <span>Học trực tiếp cùng Thầy Hải / Learn directly with Teacher Hai</span>
            </div>
            <h2 id={`${subject}-tuition-heading`} className="font-display text-2xl font-bold text-foreground sm:text-3xl">
              {headingBySubject[subject]}
            </h2>
            <p className="mt-2 text-base text-muted-foreground">
              Học phí trọn khóa 12 tuần / Tuition for one complete 12-week course
            </p>
          </div>
          <Button asChild size="lg" variant={styles.button} className="w-full shrink-0 sm:w-auto">
            <Link to="/register">
              Đăng ký tư vấn / Register
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left">
          <thead className="border-b border-border bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-6 py-4 font-semibold">Khóa học / Course</th>
              <th className="px-6 py-4 font-semibold">Thời lượng / Duration</th>
              <th className="px-6 py-4 font-semibold">Lớp nhóm / Group class</th>
              <th className="px-6 py-4 font-semibold">Kèm 1-1 / One-to-one</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/70">
            {courses.map((course, index) => (
              <tr key={course.nameEn} className={cn("transition-colors hover:bg-muted/40", index % 2 === 1 && "bg-muted/20")}>
                <td className="px-6 py-5">
                  <Link to={`/register?course=${course.key}`} className="group inline-flex items-start gap-2 font-semibold text-primary hover:underline focus-visible:underline">
                    <span>{course.nameVi}<span className="mt-1 block text-sm font-normal text-muted-foreground">{course.nameEn}</span></span>
                    <ArrowRight className="mt-1 h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
                  </Link>
                </td>
                <td className="px-6 py-5 text-foreground">
                  <span className="inline-flex items-center gap-2 text-sm">
                    <CalendarDays className={cn("h-4 w-4", styles.accent)} />
                    {COURSE_DURATION}
                  </span>
                  <span className="mt-1 block text-xs font-medium text-muted-foreground">{COURSE_SESSIONS}</span>
                </td>
                <td className="px-6 py-5">
                  <PriceCell eur={course.groupPrice} accent={styles.accent} chip={styles.chip} />
                  <Link to={`/register?course=${course.key}&class=group`} className="mt-2 flex items-center gap-1 text-xs font-semibold text-primary hover:underline"><CreditCard className="h-3.5 w-3.5" />Đăng ký / Register</Link>
                </td>
                <td className="px-6 py-5">
                  <div className="inline-flex flex-col items-start">
                    <span className="font-display text-lg font-semibold text-foreground">
                      {course.groupPrice * 3}
                      <span className="ml-1 text-sm font-semibold text-muted-foreground">EUR</span>
                    </span>
                    <span className="mt-1 text-xs font-medium text-muted-foreground">≈ {formatVnd(course.groupPrice * 3)}</span>
                    <Link to={`/register?course=${course.key}&class=private`} className="mt-2 flex items-center gap-1 text-xs font-semibold text-primary hover:underline"><CreditCard className="h-3.5 w-3.5" />Đăng ký / Register</Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </section>
  );
};

export default CourseTuitionSection;
