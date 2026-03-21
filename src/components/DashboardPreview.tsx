import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Target, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from "recharts";

const radarData = [
  { skill: "Listening", value: 75 },
  { skill: "Reading", value: 82 },
  { skill: "Writing", value: 60 },
  { skill: "Speaking", value: 68 },
  { skill: "Coding", value: 85 },
];

const DashboardPreview = () => (
  <section className="py-24 relative">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
          Professional-Grade <span className="text-gradient">Analytics</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Track your progress with a data-engineer-designed dashboard
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card rounded-xl p-6 max-w-4xl mx-auto"
      >
        <div className="grid md:grid-cols-3 gap-6">
          {/* Radar */}
          <div className="md:col-span-1">
            <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" /> Skill Radar
            </h4>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="hsl(215 20% 25%)" />
                  <PolarAngleAxis dataKey="skill" tick={{ fill: "hsl(215 15% 55%)", fontSize: 10 }} />
                  <Radar dataKey="value" stroke="hsl(160 84% 39%)" fill="hsl(160 84% 39%)" fillOpacity={0.15} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Stats cards */}
          <div className="md:col-span-2 grid grid-cols-2 gap-4">
            {[
              { icon: TrendingUp, label: "Learning Velocity", value: "+12%", sub: "vs last month" },
              { icon: Calendar, label: "Study Streak", value: "23 days", sub: "Keep going!" },
              { icon: BarChart3, label: "Tasks Completed", value: "142", sub: "This semester" },
              { icon: Target, label: "Current → Target", value: "6.5 → 7.5", sub: "IELTS Overall" },
            ].map((s, i) => (
              <div key={i} className="bg-secondary/50 rounded-lg p-4">
                <s.icon className="w-4 h-4 text-primary mb-2" />
                <div className="text-xs text-muted-foreground mb-1">{s.label}</div>
                <div className="text-lg font-display font-bold text-foreground">{s.value}</div>
                <div className="text-[10px] text-muted-foreground">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:underline"
          >
            <BarChart3 className="w-4 h-4" /> View Full Dashboard
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
);

export default DashboardPreview;
