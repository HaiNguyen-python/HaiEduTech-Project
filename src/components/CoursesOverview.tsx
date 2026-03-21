import { motion } from "framer-motion";
import { BookOpen, Languages, Code2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const courses = [
  {
    icon: BookOpen,
    title: "English Hub",
    description: "IELTS, TOEIC, Cambridge (Starters–PET), and National High School Exam preparation with AI-powered feedback.",
    tags: ["IELTS", "TOEIC", "Cambridge", "High School"],
    to: "/english",
    color: "from-blue-500/20 to-blue-600/5",
  },
  {
    icon: Languages,
    title: "Chinese Corner",
    description: "From Elementary to HSK and Conversational Chinese — structured modules for every level.",
    tags: ["Elementary", "HSK", "Conversational"],
    to: "/chinese",
    color: "from-red-500/20 to-red-600/5",
  },
  {
    icon: Code2,
    title: "Programming Lab",
    description: "K-12 coding curriculum with Data Engineering & AI Foundations. Interactive Career Path Roadmap included.",
    tags: ["Python", "Data", "AI", "K-12"],
    to: "/programming",
    color: "from-primary/20 to-primary/5",
  },
];

const CoursesOverview = () => (
  <section className="py-24 relative">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
          Multi-Disciplinary <span className="text-gradient">Learning</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Three specialized tracks designed with data-driven methodology
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {courses.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
          >
            <Link
              to={c.to}
              className="block glass-card rounded-xl p-6 h-full hover:border-primary/30 transition-all group"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${c.color} flex items-center justify-center mb-4`}>
                <c.icon className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-2 text-foreground">{c.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{c.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {c.tags.map((t) => (
                  <span key={t} className="text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground">
                    {t}
                  </span>
                ))}
              </div>
              <span className="inline-flex items-center gap-1 text-sm text-primary font-medium group-hover:gap-2 transition-all">
                Explore <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default CoursesOverview;
