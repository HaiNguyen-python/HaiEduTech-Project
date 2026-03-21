import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { BarChart3, Target, TrendingUp, Calendar, Flame } from "lucide-react";
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
} from "recharts";

const radarData = [
  { skill: "Listening", value: 75 },
  { skill: "Reading", value: 82 },
  { skill: "Writing", value: 60 },
  { skill: "Speaking", value: 68 },
  { skill: "Coding", value: 85 },
];

const velocityData = [
  { month: "Jan", score: 5.5 },
  { month: "Feb", score: 5.5 },
  { month: "Mar", score: 6.0 },
  { month: "Apr", score: 6.0 },
  { month: "May", score: 6.5 },
  { month: "Jun", score: 6.5 },
  { month: "Jul", score: 7.0 },
];

// Generate heatmap data (52 weeks × 7 days)
const heatmapData: number[][] = Array.from({ length: 52 }, () =>
  Array.from({ length: 7 }, () => Math.random() > 0.3 ? Math.floor(Math.random() * 4) + 1 : 0)
);

const heatColors = ["bg-secondary", "bg-primary/20", "bg-primary/40", "bg-primary/60", "bg-primary"];

const Dashboard = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-display font-bold mb-2 text-foreground">
            Student <span className="text-gradient">Dashboard</span>
          </h1>
          <p className="text-muted-foreground mb-8">Professional-grade learning analytics</p>

          {/* Progress card */}
          <div className="glass-card rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Progress at a Glance</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-display font-bold text-foreground">6.5</span>
                  <span className="text-muted-foreground">→</span>
                  <span className="text-3xl font-display font-bold text-primary">7.5</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">IELTS Overall · Target by Dec 2026</div>
              </div>
              <div className="w-16 h-16 rounded-full border-4 border-primary/30 flex items-center justify-center">
                <span className="text-sm font-bold text-primary">87%</span>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { icon: TrendingUp, label: "Learning Velocity", value: "+12%", color: "text-primary" },
              { icon: Flame, label: "Study Streak", value: "23 days", color: "text-orange-400" },
              { icon: Calendar, label: "Sessions", value: "142", color: "text-blue-400" },
              { icon: Target, label: "Tasks Done", value: "89%", color: "text-primary" },
            ].map((s, i) => (
              <div key={i} className="glass-card rounded-xl p-4">
                <s.icon className={`w-4 h-4 ${s.color} mb-2`} />
                <div className="text-xs text-muted-foreground">{s.label}</div>
                <div className="text-xl font-display font-bold text-foreground">{s.value}</div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Skill Radar */}
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-sm font-medium text-foreground mb-4 flex items-center gap-2">
                <Target className="w-4 h-4 text-primary" /> Skill Radar
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="hsl(215 20% 25%)" />
                    <PolarAngleAxis dataKey="skill" tick={{ fill: "hsl(215 15% 55%)", fontSize: 11 }} />
                    <Radar dataKey="value" stroke="hsl(160 84% 39%)" fill="hsl(160 84% 39%)" fillOpacity={0.15} strokeWidth={2} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Learning Velocity */}
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-sm font-medium text-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" /> Learning Velocity
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={velocityData}>
                    <CartesianGrid stroke="hsl(215 20% 18%)" strokeDasharray="3 3" />
                    <XAxis dataKey="month" tick={{ fill: "hsl(215 15% 55%)", fontSize: 11 }} axisLine={false} />
                    <YAxis domain={[4, 9]} tick={{ fill: "hsl(215 15% 55%)", fontSize: 11 }} axisLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(220 22% 10%)",
                        border: "1px solid hsl(215 20% 18%)",
                        borderRadius: "8px",
                        fontSize: "12px",
                      }}
                    />
                    <Line type="monotone" dataKey="score" stroke="hsl(160 84% 39%)" strokeWidth={2} dot={{ fill: "hsl(160 84% 39%)", r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Consistency Heatmap */}
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-sm font-medium text-foreground mb-4 flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-400" /> Consistency Heatmap
            </h3>
            <div className="overflow-x-auto">
              <div className="flex gap-[3px] min-w-[700px]">
                {heatmapData.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-[3px]">
                    {week.map((val, di) => (
                      <div
                        key={di}
                        className={`w-3 h-3 rounded-sm ${heatColors[val]}`}
                        title={`${val} sessions`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
              <span>Less</span>
              {heatColors.map((c, i) => (
                <div key={i} className={`w-3 h-3 rounded-sm ${c}`} />
              ))}
              <span>More</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
    <Footer />
  </div>
);

export default Dashboard;
