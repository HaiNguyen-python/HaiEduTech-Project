import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Code2, Languages, MapPin, Award } from "lucide-react";

const timeline = [
  { year: "2014–2018", title: "B.A. Teaching English (TESOL)", place: "HCMUE, Vietnam", icon: GraduationCap },
  { year: "2019–2020", title: "M.A. English Language & Culture", place: "Univ. of Eastern Finland", icon: GraduationCap },
  { year: "2019–2021", title: "Senior Sushi Chef & Manager", place: "Espoo & Helsinki, Finland", icon: Briefcase },
  { year: "2022–2024", title: "Teacher & Language Center Manager", place: "Tieng Anh Thay Hai, HCMC", icon: Languages },
  { year: "2024–Now", title: "B.Sc. ICT (Data Engineering focus)", place: "Turku UAS, Finland", icon: Code2 },
  { year: "2025–Now", title: "ICT Business Analyst Intern", place: "Flyer Technology, Melbourne (Remote)", icon: Briefcase },
];

const skills = [
  "Python", "SQL", "Apache Spark", "Kafka", "Airflow", "PostgreSQL",
  "MongoDB", "Snowflake", "BigQuery", "Docker", "Kubernetes", "AWS/Azure/GCP",
  "TensorFlow", "PyTorch", "Pandas", "Scikit-learn",
];

const About = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Finland · Vietnam · Remote</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Hai <span className="text-gradient">Nguyen</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-4">
            Engineer · Educator · Multilingual Tutor
          </p>
          <p className="text-secondary-foreground mb-8">
            With a Master's in English Linguistics, a Bachelor's in TESOL, and currently pursuing a degree in ICT with a focus on
            Data Engineering, I bridge the gap between language education and technology. I speak English, Chinese, and Vietnamese fluently.
          </p>

          {/* Certifications placeholder */}
          <div className="glass-card rounded-xl p-6 mb-12">
            <h3 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" /> Professional Certifications
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-[4/3] rounded-lg bg-secondary/50 border border-border/50 flex items-center justify-center text-xs text-muted-foreground">
                  Certificate {i}
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <h3 className="text-xl font-display font-semibold text-foreground mb-6">Journey</h3>
          <div className="space-y-4 mb-12">
            {timeline.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4 items-start"
              >
                <div className="w-10 h-10 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center">
                  <t.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-xs text-primary font-mono">{t.year}</div>
                  <div className="text-sm font-medium text-foreground">{t.title}</div>
                  <div className="text-xs text-muted-foreground">{t.place}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tech skills */}
          <h3 className="text-xl font-display font-semibold text-foreground mb-4">Tech Stack</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <span key={s} className="px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground text-xs font-mono">
                {s}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
    <Footer />
  </div>
);

export default About;
