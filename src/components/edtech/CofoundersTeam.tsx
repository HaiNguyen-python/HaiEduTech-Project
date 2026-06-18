/**
 * Co-founders team grid for the EdTech agency landing page.
 * Showcases the 3 co-founders: pedagogical lead + 2 full-stack engineers.
 */
import { GraduationCap, Code2, Database, Mail, Linkedin, Github, FileText, MapPin, Award } from "lucide-react";

interface Lang { lang: "vi" | "en"; }

const t = (lang: "vi" | "en", vi: string, en: string) => (lang === "vi" ? vi : en);

export function CofoundersTeam({ lang }: Lang) {
  const members = [
    {
      name: "Nguyễn Trần Thanh Hải",
      role: t(lang, "Đồng sáng lập · EdTech Engineer", "Co-founder · EdTech Engineer"),
      tag: "CO-FOUNDER · PEDAGOGY & AI",
      icon: GraduationCap,
      gradient: "from-emerald-500 to-teal-500",
      location: "Helsinki, Finland",
      avatar: "/__l5e/assets-v1/ef35ac2f-4235-4cbc-a08d-30df3ad66d04/hai-avatar.png",
      bio: t(
        lang,
        "Thạc sĩ Ngôn ngữ & Văn hóa Anh, Kỹ sư ICT chuyên ngành Data Engineering & AI tại Phần Lan. Hơn 15 năm giảng dạy IELTS, TOEIC, HSK và tiếng Việt cho người nước ngoài. Sáng lập HaiEduTech, trực tiếp thiết kế kiến trúc LMS và tích hợp AI (RAG, LLM) phục vụ cá nhân hoá lộ trình học.",
        "Master of English Language & Culture and ICT Engineer (Data Engineering & AI) trained in Finland. 15+ years teaching IELTS, TOEIC, HSK and Vietnamese for foreigners. Founder of HaiEduTech, leading LMS architecture and AI integration (RAG, LLM) for personalised learning paths.",
      ),
      slogan: t(
        lang,
        "\"Tận tâm với từng bài giảng — kiến tạo trải nghiệm học tập chuyên nghiệp.\"",
        "\"Dedicated to every lesson — crafting professional learning experiences.\"",
      ),
      highlights: [
        t(lang, "15+ năm giảng dạy ngôn ngữ & luyện thi", "15+ years teaching languages & exam prep"),
        t(lang, "MA Eng & Culture · BEng Data & AI · Phần Lan", "MA Eng & Culture · BEng Data & AI · Finland"),
        t(lang, "Kiến trúc LMS & tích hợp AI (RAG, LLM)", "LMS architecture & AI integration (RAG, LLM)"),
      ],
      links: {
        email: "contact@haiedutech.com",
        linkedin: "https://www.linkedin.com/in/hainguyen2401/",
        github: "https://github.com/HaiNguyen-python",
        cv: "https://drive.google.com/file/d/1OlIlpm3Vxb8uzw0EMa3WBLrzNvU3FzgR/view?usp=sharing",
      },
    },
    {
      name: "Trần Thanh Phúc",
      role: t(lang, "Đồng sáng lập · AI / Full-Stack Engineer", "Co-founder · AI / Full-Stack Engineer"),
      tag: "CO-FOUNDER · AI · LLM · CLOUD",
      icon: Code2,
      gradient: "from-blue-500 to-indigo-500",
      location: "Turku, Finland",
      avatar: "/__l5e/assets-v1/e51964bf-c9b1-4731-82c2-6693d6bf761c/phuc-avatar.png",
      bio: t(
        lang,
        "Thạc sĩ Erasmus Mundus EDISS (European Master in Data-Intensive Software Systems), Kỹ sư AI & Full-Stack với 4 công bố khoa học bình duyệt về Machine Learning, trong đó có paper được chấp nhận tại ICSA 2026. Thành thạo Python, AWS, LLMs, RAG/LangChain/AutoGen, SQL và CI/CD; từng thực tập tại MediaTek và AILiveSim.",
        "Erasmus Mundus EDISS MSc (European Master in Data-Intensive Software Systems), AI & full-stack engineer with 4 peer-reviewed ML publications including an ICSA 2026 accepted paper. Proficient in Python, AWS, LLMs, RAG/LangChain/AutoGen, SQL and CI/CD; former MediaTek and AILiveSim intern.",
      ),
      slogan: t(
        lang,
        "\"Chuyên sâu công nghệ AI — cam kết chất lượng từng dòng code.\"",
        "\"Deeply immersed in AI technology — committed to quality in every line of code.\"",
      ),
      highlights: [
        t(lang, "Erasmus Mundus Scholar · EDISS", "Erasmus Mundus Scholar · EDISS"),
        t(lang, "4 bài báo ML bình duyệt · ICSA 2026", "4 peer-reviewed ML papers · ICSA 2026"),
        "Python · AWS · RAG · LangChain · AutoGen",
      ],
      links: {
        email: "phuc.t.dev@gmail.com",
        linkedin: "https://linkedin.com/in/phuc-thanh-tran/",
        github: "https://github.com/phuc-tr",
        cv: "https://drive.google.com/file/d/1JeTkOadC4pK9AbkPGvKAnm8OX1rynH9Y/view?usp=drive_link",
      },
    },
    {
      name: "Trần Văn Nhật",
      role: t(lang, "Đồng sáng lập · Senior Web Developer, Software Architecture", "Co-founder · Senior Web Developer, Software Architecture"),
      tag: "CO-FOUNDER · .NET · SQL · WEB SYSTEMS",
      icon: Database,
      gradient: "from-violet-500 to-fuchsia-500",
      location: "Turku, Finland",
      avatar: "/__l5e/assets-v1/80ca939c-2c0e-41fc-a9ab-caf86e904404/nhat-avatar.png",
      bio: t(
        lang,
        "Senior Full-Stack Developer với hơn 10 năm kinh nghiệm phân tích, thiết kế và triển khai hệ thống cho các ngân hàng lớn (Hong Leong, VIB, Standard Chartered) cùng các nền tảng bất động sản, du lịch và TMĐT. Chuyên sâu .NET, ASP.NET MVC, Entity Framework, SQL Server và kiến trúc phần mềm hướng dịch vụ, ưu tiên bảo mật và hiệu năng cho hệ thống doanh nghiệp quy mô lớn.",
        "Senior full-stack developer with 10+ years analysing, designing and shipping platforms for major banks (Hong Leong, VIB, Standard Chartered) as well as real estate, travel and e-commerce systems. Specialised in .NET, ASP.NET MVC, Entity Framework, SQL Server and service-oriented architectures, focused on security and performance for large enterprise platforms.",
      ),
      slogan: t(
        lang,
        "\"Xây dựng hệ thống vững chắc — phục vụ khách hàng tận tâm.\"",
        "\"Building robust systems — serving clients with unwavering dedication.\"",
      ),
      highlights: [
        t(lang, "Kinh nghiệm Banking & Fintech quy mô lớn", "Banking & fintech experience at scale"),
        ".NET · ASP.NET MVC · Entity Framework · SQL Server",
        t(lang, "Phân tích & thiết kế kiến trúc phần mềm", "Software architecture & system design"),
      ],
      links: { email: "nhattv252@gmail.com", cv: "https://drive.google.com/file/d/101dOOS68Kz7pyPzkvjS_gJUmo63DcHNQ/view?usp=drive_link" },
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
                  {m.avatar ? (
                    <img
                      src={m.avatar}
                      alt={m.name}
                      className="flex-shrink-0 w-14 h-14 rounded-2xl object-cover shadow-lg"
                    />
                  ) : (
                    <div className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${m.gradient} text-white flex items-center justify-center shadow-lg`}>
                      <Icon className="w-7 h-7" strokeWidth={2} />
                    </div>
                  )}
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

                {m.slogan && (
                  <p className="text-sm italic text-foreground/70 leading-relaxed mb-3 border-l-2 border-border pl-3">
                    {m.slogan}
                  </p>
                )}

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
                  {m.links.cv && (
                    <a
                      href={m.links.cv}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`CV ${m.name}`}
                      className="w-9 h-9 rounded-lg bg-muted hover:bg-violet-600 hover:text-white flex items-center justify-center transition-colors"
                    >
                      <FileText className="w-4 h-4" />
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
