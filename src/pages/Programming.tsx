import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Code2, ArrowRight } from "lucide-react";

const roadmap = [
  { grade: "Grade 1–3", topic: "Scratch & Visual Programming", desc: "Logic & algorithmic thinking through block-based coding." },
  { grade: "Grade 4–6", topic: "Python Fundamentals", desc: "Variables, loops, functions — building the foundation." },
  { grade: "Grade 7–9", topic: "Data Structures & Web Basics", desc: "HTML/CSS/JS, lists, dictionaries, intro to databases." },
  { grade: "Grade 10–12", topic: "Data Engineering & AI", desc: "SQL, ETL pipelines, pandas, machine learning basics." },
  { grade: "Career", topic: "Professional Data Engineering", desc: "Spark, Kafka, Cloud platforms, portfolio projects." },
];

const Programming = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-medium mb-4">
            <Code2 className="w-3 h-3" /> Programming Lab
          </div>
          <h1 className="text-4xl font-display font-bold mb-4 text-foreground">
            K-12 to <span className="text-gradient">Career</span>
          </h1>
          <p className="text-muted-foreground mb-12">
            A structured roadmap from visual programming to professional Data Engineering & AI — designed for young learners.
          </p>

          {/* Career Path Roadmap */}
          <h3 className="text-xl font-display font-semibold text-foreground mb-6">Career Path Roadmap</h3>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-primary/10" />

            <div className="space-y-6">
              {roadmap.map((r, i) => (
                <motion.div
                  key={r.grade}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.12 }}
                  className="flex gap-4 relative"
                >
                  <div className="w-10 h-10 shrink-0 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center z-10">
                    <span className="text-[10px] font-mono font-bold text-primary">{i + 1}</span>
                  </div>
                  <div className="glass-card rounded-xl p-4 flex-1">
                    <div className="text-xs text-primary font-mono mb-1">{r.grade}</div>
                    <h4 className="font-display font-semibold text-foreground mb-1">{r.topic}</h4>
                    <p className="text-sm text-muted-foreground">{r.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
    <Footer />
  </div>
);

export default Programming;
