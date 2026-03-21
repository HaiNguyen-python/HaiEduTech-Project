import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Languages, CheckCircle } from "lucide-react";

const modules = [
  {
    title: "Elementary Chinese",
    level: "Beginner",
    desc: "Build your foundation with pinyin, tones, basic characters and everyday phrases.",
    features: ["Pinyin & tone mastery", "200+ essential characters", "Daily conversation drills"],
  },
  {
    title: "HSK Preparation",
    level: "HSK 1–6",
    desc: "Structured preparation for all levels of the HSK proficiency test.",
    features: ["Vocabulary by HSK level", "Reading & listening practice", "Mock exams & scoring"],
  },
  {
    title: "Conversational Chinese",
    level: "All Levels",
    desc: "Practical speaking skills for travel, business and daily life in Chinese-speaking environments.",
    features: ["Real-world dialogues", "Cultural context", "Pronunciation coaching"],
  },
];

const Chinese = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/30 bg-red-500/5 text-red-400 text-xs font-medium mb-4">
            <Languages className="w-3 h-3" /> Chinese Corner
          </div>
          <h1 className="text-4xl font-display font-bold mb-4 text-foreground">
            Chinese <span className="text-gradient">Modules</span>
          </h1>
          <p className="text-muted-foreground mb-12">
            From zero to fluency — structured modules covering Elementary, HSK, and Conversational Chinese.
          </p>

          <div className="space-y-6">
            {modules.map((m, i) => (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-xl p-6"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-display font-semibold text-foreground">{m.title}</h3>
                  <span className="text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground">{m.level}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{m.desc}</p>
                <ul className="space-y-1.5">
                  {m.features.map((f) => (
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

export default Chinese;
