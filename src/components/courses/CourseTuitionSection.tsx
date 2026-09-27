import { ArrowRight, CalendarDays, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export type TuitionSubject = "english" | "chinese" | "programming";

interface TuitionCourse {
  nameVi: string;
  nameEn: string;
  groupPrice: number;
  key: string;
}

// Reference rate: 1 EUR = 31,000 VND (display only, settled per invoice)
export const EUR_TO_VND = 31000;

const formatVnd = (eur: number) => {
  const vnd = eur * EUR_TO_VND;
  return `${new Intl.NumberFormat("vi-VN").format(vnd)}₫`;
};

const COURSE_DURATION = "12 tuần / 12 weeks";
const COURSE_SESSIONS = "24 buổi - 36 giờ mỗi khóa";

export const tuitionBySubject: Record<TuitionSubject, TuitionCourse[]> = {
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

const PriceOption = ({ eur, type, href, privateClass = false }: { eur: number; type: string; href: string; privateClass?: boolean }) => (
  <div className={`flex min-w-0 flex-col items-start border-t border-tuition-line pt-4 sm:items-center sm:text-center lg:border-t-0 lg:border-l lg:py-2 lg:pl-5 ${privateClass ? "bg-tuition-wash/80 px-3 pb-4 sm:px-4 lg:rounded-md lg:border lg:border-tuition-line lg:py-3" : ""}`}>
    <span className="mb-2 text-xs font-bold text-tuition-subtle">{type}</span>
    <span className="font-sora text-xl font-bold leading-tight text-tuition-ink">
      {eur} <span className="font-manrope text-xs font-semibold text-tuition-subtle">EUR</span>
    </span>
    <span className="mt-1 whitespace-nowrap text-sm font-medium text-tuition-subtle">≈ {formatVnd(eur)}</span>
    <Button asChild variant="link" className="mt-2 h-auto p-0 text-sm font-bold text-tuition-teal hover:text-tuition-ink">
      <Link to={href} aria-label={`${type} - ${eur} EUR - Đăng ký / Register`}>
        Đăng ký / Register <ArrowRight className="ml-1 h-3.5 w-3.5" />
      </Link>
    </Button>
  </div>
);

const CourseTuitionSection = ({ subject }: { subject: TuitionSubject }) => {
  const courses = tuitionBySubject[subject];

  return (
    <section aria-labelledby={`${subject}-tuition-heading`} className="course-tuition mb-14 border-y border-tuition-line bg-tuition-surface text-tuition-ink">
      <div className="border-b border-tuition-line px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-tuition-teal">
              <GraduationCap className="h-4 w-4" />
              <span>Học trực tiếp cùng Thầy Hải / Learn directly with Teacher Hai</span>
            </div>
            <h2 id={`${subject}-tuition-heading`} className="font-sora text-2xl font-bold text-tuition-ink sm:text-3xl">
              {headingBySubject[subject]}
            </h2>
            <p className="mt-2 text-base text-tuition-subtle">
              Học phí trọn khóa 12 tuần / Tuition for one complete 12-week course
            </p>
          </div>
          <Button asChild size="lg" className="w-full shrink-0 bg-tuition-teal text-tuition-surface hover:bg-tuition-ink sm:w-auto">
            <Link to="/register">
              Đăng ký tư vấn / Register
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="divide-y divide-tuition-line">
        {courses.map((course) => (
          <div key={course.key} className="grid gap-x-4 gap-y-5 px-5 py-7 transition-colors hover:bg-tuition-wash/30 sm:grid-cols-2 sm:px-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,0.9fr)_minmax(0,0.85fr)_minmax(0,0.95fr)] lg:items-center lg:gap-x-6 lg:px-10 lg:py-7 motion-reduce:transition-none">
            <div className="min-w-0 sm:col-span-2 lg:col-span-1">
              <Link to={`/register?course=${course.key}`} className="group inline-flex items-start gap-2 font-sora text-lg font-bold leading-snug text-tuition-teal hover:underline focus-visible:underline">
                <span>{course.nameVi}</span>
                <ArrowRight className="mt-1 h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
              </Link>
              <p className="mt-1 text-sm text-tuition-subtle">{course.nameEn}</p>
            </div>
            <div className="min-w-0 sm:col-span-2 lg:col-span-1">
              <span className="flex items-center gap-2 text-sm font-semibold text-tuition-ink">
                <CalendarDays className="h-4 w-4 shrink-0 text-tuition-teal" />
                {COURSE_DURATION}
              </span>
              <span className="mt-1 block text-sm text-tuition-subtle lg:pl-6">{COURSE_SESSIONS}</span>
            </div>
            <PriceOption eur={course.groupPrice} type="Lớp nhóm / Group class" href={`/register?course=${course.key}&class=group`} />
            <PriceOption eur={course.groupPrice * 3} type="Kèm 1-1 / One-to-one" privateClass href={`/register?course=${course.key}&class=private`} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CourseTuitionSection;
