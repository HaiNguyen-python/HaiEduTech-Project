/**
 * @file GitBranchingSimulator.tsx
 * @description Interactive Gitflow simulator. Lets students commit, branch, switch and merge,
 *              then see the resulting graph in SVG plus a JetBrains Mono terminal log.
 * @author HaiEduTech
 */
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { GitBranch, GitCommit, GitMerge, RotateCcw, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Commit {
  id: string;
  branch: string;
  message: string;
  parents: string[];
  /** sequential x position assigned at insertion */
  x: number;
}

const BRANCH_LANES: Record<string, { y: number; color: string; label: string }> = {
  main: { y: 60, color: "hsl(217 91% 60%)", label: "main" },
  develop: { y: 130, color: "hsl(160 84% 39%)", label: "develop" },
  "feature/login": { y: 200, color: "hsl(38 92% 50%)", label: "feature/login" },
  "feature/payment": { y: 270, color: "hsl(280 70% 60%)", label: "feature/payment" },
  hotfix: { y: 340, color: "hsl(0 84% 60%)", label: "hotfix/urgent" },
};

const initialCommits: Commit[] = [
  { id: "c1", branch: "main", message: "init", parents: [], x: 60 },
  { id: "c2", branch: "develop", message: "branch develop", parents: ["c1"], x: 130 },
];

const newId = () => `c${Math.random().toString(36).slice(2, 7)}`;

const GitBranchingSimulator = () => {
  const [commits, setCommits] = useState<Commit[]>(initialCommits);
  const [currentBranch, setCurrentBranch] = useState("develop");
  const [log, setLog] = useState<string[]>([
    "$ git init",
    "$ git checkout -b develop",
  ]);

  const tips = useMemo(() => {
    const map = new Map<string, Commit>();
    [...commits].reverse().forEach((c) => {
      if (!map.has(c.branch)) map.set(c.branch, c);
    });
    return map;
  }, [commits]);

  const nextX = useMemo(() => Math.max(...commits.map((c) => c.x), 60) + 70, [commits]);

  const append = (line: string) => setLog((l) => [...l, line]);

  const handleCommit = () => {
    const tip = tips.get(currentBranch);
    if (!tip) return;
    const id = newId();
    const message = `feat: change ${commits.length + 1}`;
    setCommits((c) => [
      ...c,
      { id, branch: currentBranch, message, parents: [tip.id], x: nextX },
    ]);
    append(`$ git commit -m "${message}"`);
    append(`  [${currentBranch} ${id}] ${message}`);
  };

  const handleBranch = (branch: string) => {
    if (currentBranch === branch) return;
    const sourceTip = tips.get(currentBranch);
    if (!tips.has(branch) && sourceTip) {
      // Create new branch from current tip
      const id = newId();
      setCommits((c) => [
        ...c,
        { id, branch, message: `branch from ${currentBranch}`, parents: [sourceTip.id], x: nextX },
      ]);
      append(`$ git checkout -b ${branch}`);
    } else {
      append(`$ git checkout ${branch}`);
    }
    setCurrentBranch(branch);
  };

  const handleMerge = (target: string) => {
    if (target === currentBranch) {
      append(`$ # cannot merge ${currentBranch} into itself`);
      return;
    }
    const sourceTip = tips.get(currentBranch);
    const targetTip = tips.get(target);
    if (!sourceTip || !targetTip) return;
    const id = newId();
    setCommits((c) => [
      ...c,
      {
        id,
        branch: target,
        message: `merge ${currentBranch} → ${target}`,
        parents: [targetTip.id, sourceTip.id],
        x: nextX,
      },
    ]);
    append(`$ git checkout ${target}`);
    append(`$ git merge ${currentBranch}`);
    append(`  Merge commit [${target} ${id}]`);
    setCurrentBranch(target);
  };

  const handleReset = () => {
    setCommits(initialCommits);
    setCurrentBranch("develop");
    setLog(["$ git init", "$ git checkout -b develop"]);
  };

  const width = Math.max(720, nextX + 80);
  const branches = Object.keys(BRANCH_LANES);

  return (
    <div className="rounded-2xl border border-border bg-card p-4 sm:p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <GitBranch className="w-5 h-5 text-primary" />
        <h3 className="font-display font-bold text-foreground">Git Branching Simulator</h3>
        <span className="ml-auto text-xs text-muted-foreground">
          Branch hiện tại: <span className="font-mono-code font-semibold text-foreground">{currentBranch}</span>
        </span>
      </div>

      {/* Action toolbar */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Button size="sm" onClick={handleCommit} className="gap-1.5">
          <GitCommit className="w-4 h-4" /> Commit
        </Button>
        {branches.map((b) => (
          <Button
            key={b}
            size="sm"
            variant={currentBranch === b ? "default" : "outline"}
            onClick={() => handleBranch(b)}
            className="gap-1.5"
          >
            <GitBranch className="w-3.5 h-3.5" /> {b}
          </Button>
        ))}
        <Button
          size="sm"
          variant="secondary"
          onClick={() => handleMerge(currentBranch === "main" ? "develop" : "main")}
          className="gap-1.5"
        >
          <GitMerge className="w-4 h-4" /> Merge → {currentBranch === "main" ? "develop" : "main"}
        </Button>
        <Button size="sm" variant="ghost" onClick={handleReset} className="gap-1.5">
          <RotateCcw className="w-4 h-4" /> Reset
        </Button>
      </div>

      {/* SVG graph */}
      <div className="overflow-x-auto rounded-xl border border-border bg-background mb-4">
        <svg width={width} height={400} className="block">
          {/* Lane labels */}
          {branches.map((b) => (
            <g key={b}>
              <line
                x1={20}
                x2={width - 10}
                y1={BRANCH_LANES[b].y}
                y2={BRANCH_LANES[b].y}
                stroke={BRANCH_LANES[b].color}
                strokeOpacity={0.18}
                strokeWidth={2}
                strokeDasharray="4 6"
              />
              <text
                x={20}
                y={BRANCH_LANES[b].y - 8}
                fill={BRANCH_LANES[b].color}
                style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, fontWeight: 600 }}
              >
                {BRANCH_LANES[b].label}
              </text>
            </g>
          ))}

          {/* Edges */}
          {commits.map((c) =>
            c.parents.map((pid) => {
              const parent = commits.find((p) => p.id === pid);
              if (!parent) return null;
              return (
                <path
                  key={`${c.id}-${pid}`}
                  d={`M ${parent.x} ${BRANCH_LANES[parent.branch]?.y ?? 60} C ${
                    (parent.x + c.x) / 2
                  } ${BRANCH_LANES[parent.branch]?.y ?? 60}, ${(parent.x + c.x) / 2} ${
                    BRANCH_LANES[c.branch]?.y ?? 60
                  }, ${c.x} ${BRANCH_LANES[c.branch]?.y ?? 60}`}
                  fill="none"
                  stroke={BRANCH_LANES[c.branch]?.color ?? "#888"}
                  strokeWidth={2}
                  strokeOpacity={0.6}
                />
              );
            })
          )}

          {/* Nodes */}
          {commits.map((c) => {
            const isMerge = c.parents.length > 1;
            return (
              <motion.g
                key={c.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <circle
                  cx={c.x}
                  cy={BRANCH_LANES[c.branch]?.y ?? 60}
                  r={isMerge ? 10 : 8}
                  fill={BRANCH_LANES[c.branch]?.color ?? "#666"}
                  stroke="hsl(var(--card))"
                  strokeWidth={3}
                />
                <text
                  x={c.x}
                  y={(BRANCH_LANES[c.branch]?.y ?? 60) + 24}
                  textAnchor="middle"
                  fill="hsl(var(--muted-foreground))"
                  style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9 }}
                >
                  {c.id}
                </text>
              </motion.g>
            );
          })}
        </svg>
      </div>

      {/* Terminal log */}
      <div className="rounded-xl bg-slate-950 text-emerald-300 p-3 font-mono-code text-xs overflow-x-auto max-h-48 overflow-y-auto">
        <div className="flex items-center gap-1.5 text-slate-400 mb-2">
          <Terminal className="w-3.5 h-3.5" />
          <span>Terminal · zsh</span>
        </div>
        {log.map((line, i) => (
          <div key={i} className="whitespace-pre">
            {line}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GitBranchingSimulator;
