import { ArrowRight, CalendarDays, GraduationCap, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type TuitionSubject = "english" | "chinese" | "programming";

interface TuitionCourse {
  nameVi: string;
  nameEn: string;
  groupPrice: number;
}

const tuitionBySubject: Record<TuitionSubject, TuitionCourse[]> = {
  english: [
    { nameVi: "Luyện thi IELTS", nameEn: "IELTS Preparation", groupPrice: 210 },
    { nameVi: "Tiếng Anh Thương mại", nameEn: "Business English", groupPrice: 210 },
    { nameVi: "Cambridge Starters - Movers - Flyers", nameEn: "Cambridge Starters - Movers - Flyers", groupPrice: 160 },
    { nameVi: "Cambridge KET - PET", nameEn: "Cambridge KET - PET", groupPrice: 180 },
  ],
  chinese: [
    { nameVi: "HSK 1 - HSK 3", nameEn: "HSK 1 - HSK 3", groupPrice: 180 },
    { nameVi: "Giao tiếp căn bản", nameEn: "Basic Conversation", groupPrice: 180 },
  ],
  programming: [
    { nameVi: "Lập trình Python", nameEn: "Python Programming", groupPrice: 180 },
    { nameVi: "Nền tảng Trí tuệ Nhân tạo", nameEn: "AI Foundation", groupPrice: 180 },
  ],
};

const headingBySubject: Record<TuitionSubject, string> = {
  english: "Khóa học Tiếng Anh / English Courses",
  chinese: "Khóa học Tiếng Trung / Chinese Courses",
  programming: "Khóa học Lập trình / Programming Courses",
};

const subjectStyles: Record<TuitionSubject, { header: string; accent: string; button: "default" | "destructive" | "secondary" }> = {
  english: { header: "bg-primary/5", accent: "text-primary", button: "default" },
  chinese: { header: "bg-destructive/5", accent: "text-destructive", button: "destructive" },
  programming: { header: "bg-accent/10", accent: "text-accent-foreground", button: "secondary" },
};

const CourseTuitionSection = ({ subject }: { subject: TuitionSubject }) => {
  const courses = tuitionBySubject[subject];
  const styles = subjectStyles[subject];

  return (
    <section aria-labelledby={`${subject}-tuition-heading`} className="mb-14 overflow-hidden rounded-lg border border-border bg-card shadow-sm">
      <div className={cn("border-b border-border px-5 py-6 sm:px-7", styles.header)}>
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

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[700px] border-collapse text-left">
          <thead className="bg-muted/60 text-sm text-muted-foreground">
            <tr>
              <th className="px-6 py-4 font-semibold">Khóa học / Course</th>
              <th className="px-6 py-4 font-semibold">Thời lượng / Duration</th>
              <th className="px-6 py-4 font-semibold">Lớp nhóm / Group class</th>
              <th className="px-6 py-4 font-semibold">Kèm 1-1 / One-to-one</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {courses.map((course) => (
              <tr key={course.nameEn} className="transition-colors hover:bg-muted/30">
                <td className="px-6 py-5">
                  <p className="font-semibold text-foreground">{course.nameVi}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{course.nameEn}</p>
                </td>
                <td className="px-6 py-5 text-foreground">12 tuần / 12 weeks</td>
                <td className={cn("px-6 py-5 text-xl font-bold", styles.accent)}>{course.groupPrice} EUR</td>
                <td className="px-6 py-5 font-semibold text-foreground">{course.groupPrice * 3} EUR</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-4 p-4 md:hidden">
        {courses.map((course) => (
          <article key={course.nameEn} className="rounded-lg border border-border bg-background p-5">
            <h3 className="font-display text-lg font-bold text-foreground">{course.nameVi}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{course.nameEn}</p>
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDays className={cn("h-4 w-4", styles.accent)} />
              <span>12 tuần / 12 weeks</span>
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-4">
              <div>
                <dt className="flex items-center gap-1 text-xs text-muted-foreground"><Users className="h-3.5 w-3.5" /> Lớp nhóm / Group</dt>
                <dd className={cn("mt-1 text-xl font-bold", styles.accent)}>{course.groupPrice} EUR</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Kèm 1-1 / One-to-one</dt>
                <dd className="mt-1 text-xl font-bold text-foreground">{course.groupPrice * 3} EUR</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>

      <p className="border-t border-border bg-muted/40 px-5 py-4 text-sm text-muted-foreground sm:px-7">
        Học phí kèm riêng 1-1 bằng 3 lần học phí lớp nhóm. / One-to-one tuition is three times the group-class fee.
      </p>
    </section>
  );
};

export default CourseTuitionSection;