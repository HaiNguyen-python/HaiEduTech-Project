/**
 * EdTechArchDiagram - clean, responsive architecture diagram for EdTech
 * platform layers. Replaces a brittle ASCII diagram that broke under
 * proportional fonts and syntax highlighting.
 */
import { Monitor, Server, Database, Sparkles, BarChart3, ArrowRight, ArrowDown } from "lucide-react";

interface LayerProps {
  icon: React.ReactNode;
  title: string;
  items: string[];
  color: string; // tailwind gradient classes
  border: string;
}

const Layer = ({ icon, title, items, color, border }: LayerProps) => (
  <div className={`flex-1 min-w-[140px] rounded-xl border ${border} bg-gradient-to-br ${color} p-4 shadow-sm`}>
    <div className="flex items-center gap-2 mb-2">
      <div className="w-8 h-8 rounded-lg bg-background/70 flex items-center justify-center">{icon}</div>
      <h4 className="font-semibold text-sm text-foreground">{title}</h4>
    </div>
    <ul className="space-y-0.5">
      {items.map((i) => (
        <li key={i} className="text-xs text-muted-foreground">• {i}</li>
      ))}
    </ul>
  </div>
);

const Arrow = ({ dir = "right" }: { dir?: "right" | "down" }) => (
  <div className="flex items-center justify-center text-primary shrink-0">
    {dir === "right" ? <ArrowRight className="w-5 h-5" /> : <ArrowDown className="w-5 h-5" />}
  </div>
);

const EdTechArchDiagram = () => {
  return (
    <div className="my-6 rounded-2xl border border-border/60 bg-card/60 p-5 md:p-6 backdrop-blur-sm">
      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-4 font-semibold">
        🏗️ EdTech Platform Architecture
      </p>

      {/* Top row: Frontend → API → Database ↔ AI Services */}
      <div className="flex flex-col md:flex-row items-stretch gap-3">
        <Layer
          icon={<Monitor className="w-4 h-4 text-blue-500" />}
          title="Frontend"
          items={["React / RN", "PWA", "Mobile-first"]}
          color="from-blue-500/10 to-blue-500/5"
          border="border-blue-500/30"
        />
        <div className="hidden md:flex"><Arrow /></div>
        <div className="md:hidden flex justify-center"><Arrow dir="down" /></div>

        <Layer
          icon={<Server className="w-4 h-4 text-emerald-500" />}
          title="API Layer"
          items={["REST / RPC", "Edge Functions", "Auth + Rate limit"]}
          color="from-emerald-500/10 to-emerald-500/5"
          border="border-emerald-500/30"
        />
        <div className="hidden md:flex"><Arrow /></div>
        <div className="md:hidden flex justify-center"><Arrow dir="down" /></div>

        <Layer
          icon={<Database className="w-4 h-4 text-amber-500" />}
          title="Database"
          items={["Postgres", "Vector (pgvector)", "Row-level security"]}
          color="from-amber-500/10 to-amber-500/5"
          border="border-amber-500/30"
        />
        <div className="hidden md:flex"><Arrow /></div>
        <div className="md:hidden flex justify-center"><Arrow dir="down" /></div>

        <Layer
          icon={<Sparkles className="w-4 h-4 text-purple-500" />}
          title="AI Services"
          items={["LLM (chat, grading)", "TTS / STT", "Embeddings"]}
          color="from-purple-500/10 to-purple-500/5"
          border="border-purple-500/30"
        />
      </div>

      {/* Connector down */}
      <div className="flex justify-center my-3">
        <ArrowDown className="w-5 h-5 text-primary" />
      </div>

      {/* Analytics base */}
      <div className="rounded-xl border border-pink-500/30 bg-gradient-to-r from-pink-500/10 via-rose-500/5 to-pink-500/10 p-4">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-lg bg-background/70 flex items-center justify-center">
            <BarChart3 className="w-4 h-4 text-pink-500" />
          </div>
          <h4 className="font-semibold text-sm text-foreground">Analytics & Mastery</h4>
        </div>
        <p className="text-xs text-muted-foreground ml-10">
          Events · Cohorts · A/B testing · Mastery tracking · Retention
        </p>
      </div>

      <p className="mt-4 text-xs text-muted-foreground italic">
        Every layer is <span className="font-semibold text-foreground">versioned + instrumented</span> so you can experiment and roll back safely.
      </p>
    </div>
  );
};

export default EdTechArchDiagram;
