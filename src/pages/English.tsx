import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight, CheckCircle } from "lucide-react";

const programs = [
  {
    title: "Cambridge Starters–PET",
    level: "Beginner → Intermediate",
    desc: "Foundation English for young learners through Cambridge Assessment.",
    features: ["Age-appropriate curriculum", "Interactive activities", "Progress testing"],
  },
  {
    title: "IELTS Preparation",
    level: "Intermediate → Advanced",
    desc: "Comprehensive IELTS preparation with AI-powered grading and feedback.",
    features: ["4-skill training", "AI Writing & Speaking grader", "Mock tests & scoring"],
  },
  {
    title: "TOEIC Program",
    level: "Intermediate",
    desc: "Business English proficiency for career advancement.",
    features: ["Listening & Reading focus", "Business vocabulary", "Timed practice tests"],
  },
  {
    title: "National High School Exam",
    level: "Grade 10–12",
    desc: "Targeted preparation for Vietnam's national English exam.",
    features: ["Curriculum-aligned", "Grammar & vocabulary drills", "Exam strategies"],
  },
];

const English = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/5 text-blue-400 text-xs font-medium mb-4">
            <BookOpen className="w-3 h-3" /> English Hub
          </div>
          <h1 className="text-4xl font-display font-bold mb-4 text-foreground">
            English <span className="text-gradient">Programs</span>
          </h1>
          <p className="text-muted-foreground mb-12">
            From Cambridge young learners to IELTS band 8.0+ — structured programs with AI-enhanced feedback.
          </p>

          <div className="space-y-6">
            {programs.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-xl p-6"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-display font-semibold text-foreground">{p.title}</h3>
                  <span className="text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground">{p.level}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{p.desc}</p>
                <ul className="space-y-1.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-secondary-foreground">
                      <CheckCircle className="w-3.5 h-3.5 text-primary" /> {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
    <Footer />
  </div>
);

export default English;
