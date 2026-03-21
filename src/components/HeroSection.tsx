import { motion } from "framer-motion";
import { ArrowRight, Sparkles, GraduationCap, Database, Brain } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
    {/* Background */}
    <div className="absolute inset-0">
      <img src={heroBg} alt="" className="w-full h-full object-cover opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      <div className="absolute inset-0 cyber-grid opacity-20" />
    </div>

    {/* Floating orbs */}
    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" />
    <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-primary/3 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />

    <div className="container mx-auto px-6 relative z-10 pt-20">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            Data-Driven Education & AI-Powered Learning
          </div>

          <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6">
            Learn{" "}
            <span className="text-gradient">Smarter</span>
            <br />
            with an{" "}
            <span className="text-gradient">Engineer-Tutor</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Master English, Chinese & Programming with a tutor who combines
            linguistic expertise with data engineering — powered by AI analytics
            to accelerate your progress.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          <Link
            to="/ai-grading"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:brightness-110 transition-all shadow-lg shadow-primary/25"
          >
            <Brain className="w-5 h-5" />
            Try AI Grading
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border bg-secondary text-secondary-foreground font-semibold hover:bg-secondary/80 transition-all"
          >
            Learn More
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-3 gap-6 max-w-lg mx-auto"
        >
          {[
            { icon: GraduationCap, value: "3+", label: "Languages" },
            { icon: Database, value: "AI", label: "Powered Grading" },
            { icon: Brain, value: "K-12", label: "Programming" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <s.icon className="w-5 h-5 text-primary mx-auto mb-1" />
              <div className="text-2xl font-display font-bold text-foreground">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

export default HeroSection;
