/**
 * Co-founders team grid for the EdTech agency landing page.
 * Showcases the 3 co-founders: pedagogical lead + 2 full-stack engineers.
 */
import { GraduationCap, Code2, Database, Mail, Linkedin, Github, MapPin, Award } from "lucide-react";

interface Lang { lang: "vi" | "en"; }

const t = (lang: "vi" | "en", vi: string, en: string) => (lang === "vi" ? vi : en);

export function CofoundersTeam({ lang }: Lang) {
  const members = [
    {
      name: "Nguyen Tran Thanh Hai",
      role: t(lang, "Đồng sáng lập - EdTech Engineer", "Co-founder - EdTech Engineer"),
      tag: t(lang, "CO-FOUNDER · PEDAGOGY & AI", "CO-FOUNDER · PEDAGOGY & AI"),
      icon: GraduationCap,
      gradient: "from-emerald-500 to-teal-500",
      location: "Vietnam · Finland",
      bio: t(
        lang,
        "Thạc sĩ Ngôn ngữ & Văn hóa Anh, Kỹ sư ICT chuyên ngành Data Engineering & AI tại Phần Lan, hơn 15 năm kinh nghiệm sư phạm trực tiếp tại lớp học.",
        "Master of English Language & Culture, ICT Engineer specializing in Data Engineering & AI from Finland, with 15+ years of pedagogical experience in the classroom.",
      ),
      highlights: [
        t(lang, "15+ năm giảng dạy", "15+ years teaching"),
        t(lang, "Data Eng & AI · Phần Lan", "Data Eng & AI · Finland"),
        t(lang, "Thiết kế chương trình LMS", "LMS curriculum design"),
      ],
      links: { email: "contact@haiedutech.com" },
    },
    {
      name: "Tran Thanh Phuc",
      role: t(lang, "Đồng sáng lập · AI / Full-Stack Engineer", "Co-founder · AI / Full-Stack Engineer"),
      tag: "AI · LLM · Cloud",
      icon: Code2,
      gradient: "from-blue-500 to-indigo-500",
      location: "Helsinki, Finland",
      bio: t(
        lang,
        "Kỹ sư AI đa năng nền tảng Full-Stack vững chắc. 4 công bố khoa học bình duyệt về Machine Learning. Thành thạo Python, AWS, LLMs, SQL, CI/CD. Erasmus Mundus Scholar (EDISS).",
        "Versatile AI engineer with a strong full-stack background. 4 peer-reviewed ML publications. Proficient in Python, AWS, LLMs, SQL, CI/CD. Erasmus Mundus Scholar (EDISS).",
      ),
      highlights: [
        t(lang, "Cựu thực tập sinh MediaTek & AILiveSim", "Ex-MediaTek & AILiveSim intern"),
        t(lang, "RAG · LangChain · AutoGen", "RAG · LangChain · AutoGen"),
        t(lang, "ICSA 2026 Accepted Paper", "ICSA 2026 Accepted Paper"),
      ],
      links: {
        email: "phuc.t.dev@gmail.com",
        linkedin: "https://linkedin.com/in/phuc-thanh-tran/",
        github: "https://github.com/phuc-tr",
      },
    },
    {
      name: "Tran Van Nhat",
      role: t(lang, "Đồng sáng lập · Senior Web Developer", "Co-founder · Senior Web Developer"),
      tag: ".NET · SQL · Web Systems",
      icon: Database,
      gradient: "from-violet-500 to-fuchsia-500",
      location: "Turku, Finland",
      bio: t(
        lang,
        "Senior Full-Stack Developer hơn 10 năm kinh nghiệm xây dựng hệ thống ngân hàng (Hong Leong, VIB, Standard Chartered), bất động sản, du lịch và TMĐT. Chuyên sâu .NET, SQL Server, Web platforms.",
        "Senior Full-Stack Developer with 10+ years building banking systems (Hong Leong, VIB, Standard Chartered), real estate, travel and e-commerce platforms. Expert in .NET, SQL Server, web platforms.",
      ),
      highlights: [
        t(lang, "Banking · Fintech experience", "Banking · Fintech experience"),
        ".NET · MVC · Entity Framework",
        t(lang, "Phân tích & thiết kế hệ thống", "Systems analysis & design"),
      ],
      links: { email: "nhattv252@gmail.com" },
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-background via-emerald-50/30 to-background dark:via-emerald-950/10">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-semibold mb-4">
            <Award className="w-3.5 h-3.5" />
            {t(lang, "Đội ngũ sáng lập", "Our Co-founders")}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground">
            {t(lang, "Đội Ngũ Sáng Lập", "Meet the Co-founders")}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground">
            {t(
              lang,
              "Ba đồng sáng lập kết hợp nhiều năm kinh nghiệm sư phạm, kỹ thuật phần mềm và AI - cam kết xây dựng những hệ thống EdTech thực sự hữu ích cho người dạy & người học.",
              "Three co-founders combining many years of pedagogy, software engineering and AI - committed to building EdTech systems that genuinely serve teachers and learners.",
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {members.map((m) => {
            const Icon = m.icon;
            return (
              <article
                key={m.name}
                className="group relative rounded-2xl border border-border/70 bg-card/90 backdrop-blur-sm p-6 sm:p-7 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${m.gradient}`} />
                <div className="flex items-start gap-4 mb-4">
                  <div className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${m.gradient} text-white flex items-center justify-center shadow-lg`}>
                    <Icon className="w-7 h-7" strokeWidth={2} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {m.tag}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-foreground leading-tight mt-0.5">
                      {m.name}
                    </h3>
                    <p className="text-sm font-medium text-primary mt-1">{m.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                  <MapPin className="w-3.5 h-3.5" />
                  {m.location}
                </div>

                <p className="text-sm text-foreground/80 leading-relaxed mb-4">
                  {m.bio}
                </p>

                <ul className="space-y-1.5 mb-5">
                  {m.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-xs sm:text-[13px] text-foreground/75">
                      <span className={`mt-1 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${m.gradient} flex-shrink-0`} />
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-2 pt-4 border-t border-border/60">
                  {m.links.email && (
                    <a
                      href={`mailto:${m.links.email}`}
                      aria-label={`Email ${m.name}`}
                      className="w-9 h-9 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  )}
                  {m.links.linkedin && (
                    <a
                      href={m.links.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`LinkedIn ${m.name}`}
                      className="w-9 h-9 rounded-lg bg-muted hover:bg-[#0A66C2] hover:text-white flex items-center justify-center transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {m.links.github && (
                    <a
                      href={m.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`GitHub ${m.name}`}
                      className="w-9 h-9 rounded-lg bg-muted hover:bg-foreground hover:text-background flex items-center justify-center transition-colors"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default CofoundersTeam;
