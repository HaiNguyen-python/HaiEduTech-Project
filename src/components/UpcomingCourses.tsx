import { motion } from "framer-motion";
import { CalendarDays, Clock, ArrowRight, BookOpen, Languages, Code2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { upcomingCourses, type UpcomingCourse } from "@/data/homePageData";

/** Upcoming Courses tabbed section for the Home Page */
const tabMeta = [
  { key: "english", icon: BookOpen, labelVi: "Tiếng Anh", labelEn: "English" },
  { key: "chinese", icon: Languages, labelVi: "Tiếng Trung", labelEn: "Chinese" },
  { key: "programming", icon: Code2, labelVi: "Lập trình", labelEn: "Programming" },
] as const;

const CourseCard = ({ course, index }: { course: UpcomingCourse; index: number }) => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:border-primary/30 hover:shadow-lg"
    >
      {/* Status badge */}
      <Badge
        variant={course.status === "ongoing" ? "default" : "secondary"}
        className={
          course.status === "ongoing"
            ? "mb-3 bg-primary/10 text-primary hover:bg-primary/20"
            : "mb-3 bg-accent/10 text-accent-foreground hover:bg-accent/20"
        }
      >
        {course.status === "ongoing"
          ? t("Khai giảng liên tục", "Enrolling Now")
          : `${t("Sắp khai giảng", "Starting")}: ${course.startDate}`}
      </Badge>

      <h4 className="mb-2 font-display text-lg font-semibold text-foreground">
        {t(course.name, course.nameEn)}
      </h4>

      <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
        <CalendarDays className="h-4 w-4 shrink-0 text-primary" />
        <span>{t(course.schedule, course.scheduleEn)}</span>
      </div>

      <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
        <Clock className="h-4 w-4 shrink-0 text-primary" />
        <span>{t(course.level, course.levelEn)}</span>
      </div>

      <Link
        to="/register"
        className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow transition-all hover:brightness-110"
      >
        {t("Đăng ký tư vấn", "Register for Consultation")}
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </motion.div>
  );
};

const UpcomingCourses = () => {
  const { t } = useLanguage();

  return (
    <section className="relative py-20 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 font-display text-2xl font-bold sm:text-3xl md:text-4xl">
            {t("Lịch ", "Upcoming ")}
            <span className="text-gradient">{t("Khai Giảng", "Courses")}</span>
          </h2>
          <p className="mx-auto max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
            {t(
              "Đăng ký sớm để nhận ưu đãi và được tư vấn lộ trình phù hợp",
              "Register early for exclusive benefits and personalized learning path guidance"
            )}
          </p>
        </motion.div>

        {/* Tabbed interface */}
        <Tabs defaultValue="english" className="mx-auto max-w-4xl">
          <TabsList className="mx-auto mb-8 flex w-full max-w-md">
            {tabMeta.map((tab) => (
              <TabsTrigger key={tab.key} value={tab.key} className="flex-1 gap-1.5">
                <tab.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{t(tab.labelVi, tab.labelEn)}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {tabMeta.map((tab) => (
            <TabsContent key={tab.key} value={tab.key}>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2">
                {upcomingCourses[tab.key]?.map((course, i) => (
                  <CourseCard key={course.id} course={course} index={i} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default UpcomingCourses;
