/**
 * @file Classroom3D.tsx
 * @description Interactive 3D classroom for the Admin Dashboard. Each student is
 *   a small seated avatar with a name tag above the head; colour encodes status
 *   (red = needs attention, green = improving, blue = stable, amber = average,
 *   grey = inactive). Seats follow the academic ranking of the class.
 *   Falls back to a 2D colour grid on mobile / reduced motion.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useMemo, useRef, useState, useEffect, Suspense, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, RoundedBox } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useLanguage } from "@/contexts/LanguageContext";
import { normalizeForSearch } from "@/lib/adminData";
import type { StudentState } from "@/lib/rlEngine";
import {
  buildClassroomLayout,
  formatLastActive,
  shortName,
  tierCounts,
  TIER_META,
  TIER_ORDER,
  type ClassroomSeat,
  type ClassroomTier,
  type LastActivity,
  type SeatingMode,
} from "@/lib/classroom3d";
import {
  School, Search, Maximize2, Minimize2, ChevronDown, ChevronUp,
  Eye, Users, Boxes, RotateCcw, Trophy, AlertTriangle, Activity, TrendingUp, Target,
  LayoutGrid, ScanLine, UserRound, X,
} from "lucide-react";
import "@fontsource/sora/600.css";
import "@fontsource/sora/700.css";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/600.css";

interface Props {
  students: StudentState[];
  lastActivityByUser: Map<string, LastActivity>;
  classAvg: number;
  onSelectStudent: (s: StudentState) => void;
  selectedUserId?: string | null;
}

type CameraPreset = "class" | "top" | "alert";

const PRESETS: Record<CameraPreset, [number, number, number]> = {
  class: [0, 11, 20],
  top: [0, 22, 0.01],
  alert: [0, 4.5, -9],
};

/* ----------------------------------------------- shared geometry (one copy) */

const GEO = {
  head: new THREE.SphereGeometry(0.23, 18, 16),
  torso: new THREE.CapsuleGeometry(0.22, 0.34, 4, 12),
  arm: new THREE.CapsuleGeometry(0.075, 0.3, 3, 8),
  leg: new THREE.BoxGeometry(0.15, 0.34, 0.15),
  eye: new THREE.SphereGeometry(0.035, 8, 8),
  hair: new THREE.SphereGeometry(0.245, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2),
  bun: new THREE.SphereGeometry(0.11, 12, 10),
  ring: new THREE.RingGeometry(0.42, 0.62, 36),
  crown: new THREE.TorusGeometry(0.2, 0.032, 8, 20),
  chairSeat: new THREE.BoxGeometry(0.6, 0.07, 0.55),
  chairBack: new THREE.BoxGeometry(0.6, 0.42, 0.07),
  chairLeg: new THREE.BoxGeometry(0.06, 0.34, 0.06),
  deskTop: new THREE.BoxGeometry(1.3, 0.08, 0.72),
  deskLeg: new THREE.BoxGeometry(0.07, 0.6, 0.07),
};

const DARK = new THREE.MeshStandardMaterial({ color: "#1e293b", roughness: 0.5 });
const SKIN = new THREE.MeshStandardMaterial({ color: "#f5d0a9", roughness: 0.45 });
const WOOD = new THREE.MeshStandardMaterial({ color: "#e6ebf3", roughness: 0.65 });
const METAL = new THREE.MeshStandardMaterial({ color: "#c3ccd9", roughness: 0.5, metalness: 0.25 });
const CHAIR = new THREE.MeshStandardMaterial({ color: "#94a3b8", roughness: 0.6 });
const GOLD = new THREE.MeshStandardMaterial({ color: "#facc15", emissive: "#facc15", emissiveIntensity: 0.85 });

type MatKind = "solid" | "faded" | "dim";

/** One shirt material per tier / visibility state. */
function buildTierMaterials() {
  const map = new Map<string, THREE.MeshStandardMaterial>();
  for (const tier of TIER_ORDER) {
    const meta = TIER_META[tier];
    const variants: Record<MatKind, number> = { solid: 1, faded: 0.55, dim: 0.12 };
    for (const kind of Object.keys(variants) as MatKind[]) {
      map.set(
        `${tier}-${kind}`,
        new THREE.MeshStandardMaterial({
          color: meta.color,
          emissive: meta.emissive,
          emissiveIntensity: 0.3,
          roughness: 0.35,
          metalness: 0.1,
          transparent: variants[kind] < 1,
          opacity: variants[kind],
        }),
      );
    }
  }
  return map;
}
const TIER_MATS = buildTierMaterials();

const shirtMat = (tier: ClassroomTier, dimmed: boolean) =>
  TIER_MATS.get(`${tier}-${dimmed ? "dim" : tier === "idle" ? "faded" : "solid"}`)!;

/* ------------------------------------------------------------------ avatar */

interface AnimEntry {
  seat: ClassroomSeat;
  body: THREE.Group;
  ring: THREE.Mesh;
}

const StudentAvatar = ({
  seat,
  dimmed,
  selected,
  crowded,
  showFullLabel,
  vi,
  register,
  onHover,
  onSelect,
}: {
  seat: ClassroomSeat;
  dimmed: boolean;
  selected: boolean;
  crowded: boolean;
  showFullLabel: boolean;
  vi: boolean;
  register: (e: AnimEntry | null, id: string) => void;
  onHover: (seat: ClassroomSeat | null) => void;
  onSelect: (seat: ClassroomSeat) => void;
}) => {
  const body = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);
  const meta = TIER_META[seat.tier];
  const mat = shirtMat(seat.tier, dimmed);
  const hasBun = seat.seed % 3 === 0;
  const topThree = seat.rank <= 3 && seat.student.totalActivities > 0;

  useEffect(() => {
    if (body.current && ring.current) {
      register({ seat, body: body.current, ring: ring.current }, seat.student.userId);
    }
    return () => register(null, seat.student.userId);
  }, [register, seat]);

  return (
    <group position={[seat.x, 0, seat.z]}>
      {/* desk in front of the student */}
      <mesh geometry={GEO.deskTop} material={WOOD} position={[0, 0.66, 0.74]} />
      <mesh geometry={GEO.deskLeg} material={METAL} position={[-0.55, 0.32, 0.74]} />
      <mesh geometry={GEO.deskLeg} material={METAL} position={[0.55, 0.32, 0.74]} />

      {/* chair */}
      <mesh geometry={GEO.chairSeat} material={CHAIR} position={[0, 0.42, -0.08]} />
      <mesh geometry={GEO.chairBack} material={CHAIR} position={[0, 0.63, -0.33]} />
      <mesh geometry={GEO.chairLeg} material={METAL} position={[-0.24, 0.19, -0.28]} />
      <mesh geometry={GEO.chairLeg} material={METAL} position={[0.24, 0.19, -0.28]} />

      {/* floor status ring */}
      <mesh ref={ring} geometry={GEO.ring} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.012, 0]}>
        <meshBasicMaterial color={meta.color} transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>

      {/* clickable seated figure */}
      <group
        ref={body}
        position={[0, 0.46, 0]}
        onPointerOver={(e) => { e.stopPropagation(); onHover(seat); }}
        onPointerOut={(e) => { e.stopPropagation(); onHover(null); }}
        onClick={(e) => { e.stopPropagation(); onSelect(seat); }}
      >
        {/* legs tucked under the desk */}
        <mesh geometry={GEO.leg} material={mat} position={[-0.12, -0.12, 0.22]} rotation={[-1.1, 0, 0]} />
        <mesh geometry={GEO.leg} material={mat} position={[0.12, -0.12, 0.22]} rotation={[-1.1, 0, 0]} />

        {/* torso */}
        <mesh geometry={GEO.torso} material={mat} position={[0, 0.3, 0]} />

        {/* arms resting on the desk */}
        <mesh geometry={GEO.arm} material={mat} position={[-0.26, 0.3, 0.28]} rotation={[-1.15, 0, 0.25]} />
        <mesh geometry={GEO.arm} material={mat} position={[0.26, 0.3, 0.28]} rotation={[-1.15, 0, -0.25]} />

        {/* head + minimal face looking at the whiteboard */}
        <mesh geometry={GEO.head} material={dimmed ? mat : SKIN} position={[0, 0.72, 0]} />
        {!dimmed && (
          <>
            <mesh geometry={GEO.hair} material={DARK} position={[0, 0.735, 0]} />
            {hasBun && <mesh geometry={GEO.bun} material={DARK} position={[0, 0.9, -0.12]} />}
            <mesh geometry={GEO.eye} material={DARK} position={[-0.08, 0.73, -0.21]} />
            <mesh geometry={GEO.eye} material={DARK} position={[0.08, 0.73, -0.21]} />
          </>
        )}

        {topThree && !dimmed && (
          <mesh geometry={GEO.crown} material={GOLD} position={[0, 0.99, 0]} rotation={[-Math.PI / 2, 0, 0]} />
        )}
        {selected && (
          <mesh geometry={GEO.crown} material={GOLD} position={[0, -0.42, 0]} rotation={[-Math.PI / 2, 0, 0]} />
        )}
      </group>

      {/* Progressive labels keep large classes readable. */}
      <Html position={[0, 1.72, 0]} center distanceFactor={13} zIndexRange={[20, 0]}>
        <div
          className={`classroom-label pointer-events-none select-none whitespace-nowrap border shadow-sm ${showFullLabel ? "px-2 py-1" : "px-1.5 py-0.5"}`}
          style={{
            borderColor: meta.color,
            background: dimmed ? "hsl(var(--classroom-surface) / 0.35)" : "hsl(var(--classroom-surface) / 0.94)",
            opacity: dimmed ? 0.35 : 1,
            fontSize: crowded ? 11 : 13,
            lineHeight: 1.15,
          }}
        >
          <span className="font-bold" style={{ color: meta.color }}>#{seat.rank}</span>
          {showFullLabel && (
            <>
              <span className="mx-1 font-semibold text-foreground">
                {crowded ? shortName(seat.student.fullName) : seat.student.fullName}
              </span>
              <span className="text-muted-foreground">{seat.student.avgScore ? `${seat.student.avgScore}/10` : (vi ? "chưa có" : "n/a")}</span>
            </>
          )}
        </div>
      </Html>
    </group>
  );
};

/* --------------------------------------------------------------- classroom */

const Room = ({
  seats,
  cols,
  rows,
  classAvg,
  alertCount,
  activeWeek,
  topNames,
  vi,
  dimSet,
  labelSet,
  crowded,
  selectedUserId,
  onHover,
  onSelect,
}: {
  seats: ClassroomSeat[];
  cols: number;
  rows: number;
  classAvg: number;
  alertCount: number;
  activeWeek: number;
  topNames: string[];
  vi: boolean;
  dimSet: Set<string> | null;
  labelSet: Set<string>;
  crowded: boolean;
  selectedUserId?: string | null;
  onHover: (s: ClassroomSeat | null) => void;
  onSelect: (s: ClassroomSeat) => void;
}) => {
  const w = Math.max(10, cols * 2.1 + 3);
  const d = Math.max(10, rows * 2.3 + 5);

  // Single animation loop for the whole room (instead of one per avatar).
  const entries = useRef(new Map<string, AnimEntry>());
  const register = useCallback((e: AnimEntry | null, id: string) => {
    if (e) entries.current.set(id, e);
    else entries.current.delete(id);
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    entries.current.forEach((entry) => {
      const { seat, body, ring } = entry;
      const dimmed = !!dimSet && !dimSet.has(seat.student.userId);
      const isSel = selectedUserId === seat.student.userId;
      const pulses = seat.tier === "alert" || seat.tier === "progress";
      body.position.y = 0.46 + (pulses && !dimmed ? Math.sin(t * 2 + seat.col + seat.row) * 0.035 : 0);
      body.rotation.y = isSel ? Math.sin(t * 1.4) * 0.25 : 0;
      const base = 0.55 + seat.glow * 0.35;
      ring.scale.setScalar(seat.activeThisWeek && !dimmed ? base + Math.sin(t * 2.4 + seat.col) * 0.06 : base);
      const m = ring.material as THREE.MeshBasicMaterial;
      m.opacity = dimmed ? 0.05 : 0.3 + seat.glow * 0.45;
    });
  });

  return (
    <group>
      {/* floor + back wall */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[w, d]} />
        <meshStandardMaterial color="#f6f9ff" roughness={0.9} />
      </mesh>
      <gridHelper args={[Math.max(w, d), Math.round(Math.max(w, d) / 2.1), "#d3dcea", "#e9eff7"]} position={[0, 0.005, 0]} />
      <mesh position={[0, 3.4, -d / 2]}>
        <planeGeometry args={[w, 6.8]} />
        <meshStandardMaterial color="#e8effa" roughness={0.95} />
      </mesh>

      {/* whiteboard */}
      <group position={[0, 2.4, -d / 2 + 0.35]}>
        <RoundedBox args={[Math.min(w * 0.72, 12), 3.2, 0.18]} radius={0.07} smoothness={2}>
          <meshStandardMaterial color="#ffffff" roughness={0.45} />
        </RoundedBox>
        <Html position={[0, 0.1, 0.14]} center distanceFactor={12} transform>
          <div className="select-none text-center rounded-md bg-white px-4 py-2" style={{ width: 360 }}>
            <p className="text-[20px] font-bold text-slate-900">
              {vi ? "Lớp học HaiEduTech" : "HaiEduTech Classroom"}
            </p>
            <p className="text-[15px] font-semibold text-blue-700 mt-1">
              {`${vi ? "Điểm TB lớp" : "Class average"}: ${classAvg}/10 · ${activeWeek} ${vi ? "em học tuần này" : "active this week"}`}
            </p>
            <p className="text-[14px] font-semibold mt-1" style={{ color: alertCount ? "#dc2626" : "#059669" }}>
              {alertCount
                ? `${alertCount} ${vi ? "học sinh cần chú ý" : "students need attention"}`
                : vi ? "Không có học sinh cần can thiệp" : "No students need intervention"}
            </p>
            {topNames.length > 0 && (
              <p className="text-[13px] text-slate-600 mt-1">
                🏆 {vi ? "Top 3" : "Top 3"}: {topNames.join(" · ")}
              </p>
            )}
          </div>
        </Html>
      </group>

      {seats.map((seat) => (
        <StudentAvatar
          key={seat.student.userId}
          seat={seat}
          dimmed={!!dimSet && !dimSet.has(seat.student.userId)}
          selected={selectedUserId === seat.student.userId}
          crowded={crowded}
          showFullLabel={labelSet.has(seat.student.userId)}
          vi={vi}
          register={register}
          onHover={onHover}
          onSelect={onSelect}
        />
      ))}
    </group>
  );
};

/* ----------------------------------------------------------------- exports */

const Classroom3D = ({ students, lastActivityByUser, classAvg, onSelectStudent, selectedUserId }: Props) => {
  const { t, lang } = useLanguage();
  const vi = lang === "vi";
  const [open, setOpen] = useState(true);
  const [full, setFull] = useState(false);
  const [flat, setFlat] = useState(false);
  const [seating, setSeating] = useState<SeatingMode>("rank");
  const [tierFilter, setTierFilter] = useState<ClassroomTier | null>(null);
  const [query, setQuery] = useState("");
  const [hovered, setHovered] = useState<ClassroomSeat | null>(null);
  const [visible, setVisible] = useState(true);
  const controls = useRef<OrbitControlsImpl | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);

  // Reduced motion / small screens -> 2D grid mode
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || window.innerWidth < 768) setFlat(true);
  }, []);

  // Pause rendering when the canvas is off-screen or the tab is hidden.
  useEffect(() => {
    if (flat || !open) return;
    const el = stageRef.current;
    if (!el) return;
    const onVis = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting && !document.hidden),
      { threshold: 0.05 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [flat, open]);

  const { seats, cols, rows } = useMemo(
    () => buildClassroomLayout(students, lastActivityByUser, seating),
    [students, lastActivityByUser, seating],
  );
  const counts = useMemo(() => tierCounts(seats), [seats]);
  const crowded = seats.length > 40;

  const stats = useMemo(() => {
    const activeWeek = seats.filter((s) => s.activeThisWeek).length;
    const lowScore = seats.filter((s) => s.student.totalActivities > 0 && s.student.avgScore < 5).length;
    const improving = seats.filter((s) => s.student.recentTrend === "improving").length;
    const topNames = [...seats]
      .sort((a, b) => a.rank - b.rank)
      .filter((s) => s.student.totalActivities > 0)
      .slice(0, 3)
      .map((s) => shortName(s.student.fullName));
    return { activeWeek, lowScore, improving, topNames };
  }, [seats]);

  // Set of highlighted students (null = everyone visible)
  const dimSet = useMemo(() => {
    const q = normalizeForSearch(query);
    if (!tierFilter && !q) return null;
    const s = new Set<string>();
    for (const seat of seats) {
      const tierOk = !tierFilter || seat.tier === tierFilter;
      const nameOk = !q || normalizeForSearch(seat.student.fullName).includes(q);
      if (tierOk && nameOk) s.add(seat.student.userId);
    }
    return s;
  }, [seats, tierFilter, query]);

  const selectedSeat = useMemo(
    () => seats.find((seat) => seat.student.userId === selectedUserId) || null,
    [seats, selectedUserId],
  );

  const labelSet = useMemo(() => {
    const labels = new Set<string>();
    const q = normalizeForSearch(query);
    for (const seat of seats) {
      const isPriority = seat.rank <= 3 || seat.tier === "alert";
      const isMatch = !!q && normalizeForSearch(seat.student.fullName).includes(q);
      if (isPriority || isMatch || seat.student.userId === selectedUserId || seat.student.userId === hovered?.student.userId) {
        labels.add(seat.student.userId);
      }
    }
    return labels;
  }, [hovered, query, seats, selectedUserId]);

  const applyPreset = (p: CameraPreset) => {
    const c = controls.current;
    if (!c) return;
    const [x, y, z] = PRESETS[p];
    c.object.position.set(x, y, z);
    c.target.set(0, p === "top" ? 0 : 1, p === "alert" ? -rows * 1.0 : 0);
    c.update();
  };

  const focusSeat = (seat: ClassroomSeat) => {
    const c = controls.current;
    if (c) {
      c.object.position.set(seat.x + 2.4, 3.2, seat.z + 5.2);
      c.target.set(seat.x, 1.1, seat.z);
      c.update();
    }
    onSelectStudent(seat.student);
  };

  const gotoFirstAlert = () => {
    const seat = [...seats].filter((s) => s.tier === "alert").sort((a, b) => a.rank - b.rank)[0];
    if (!seat) return;
    setTierFilter("alert");
    focusSeat(seat);
  };

  const canvasHeight = full ? "h-[calc(100vh-190px)]" : "h-[440px] sm:h-[560px]";

  const statChips = (
    <div className="grid grid-cols-2 divide-x divide-y border-b border-border/60 sm:grid-cols-4 sm:divide-y-0">
      {[
        { icon: Users, label: t("Học sinh", "Students"), value: students.length, tier: null as ClassroomTier | null, color: "text-primary" },
        { icon: Activity, label: t("Học tuần này", "Active this week"), value: stats.activeWeek, tier: null, color: "text-emerald-600" },
        { icon: AlertTriangle, label: t("Điểm dưới 5", "Below 5/10"), value: stats.lowScore, tier: "alert" as ClassroomTier, color: "text-red-600" },
        { icon: TrendingUp, label: t("Đang tiến bộ", "Improving"), value: stats.improving, tier: "progress" as ClassroomTier, color: "text-green-600" },
      ].map((s) => (
        <button
          key={s.label}
          onClick={() => s.tier && setTierFilter(tierFilter === s.tier ? null : s.tier)}
          className={`flex min-h-16 items-center gap-3 px-4 py-3 text-left transition-colors ${s.tier ? "hover:bg-muted/50" : "cursor-default"}`}
        >
          <s.icon className={`w-4 h-4 shrink-0 ${s.color}`} />
          <span className="min-w-0">
            <span className="font-classroom-heading block text-lg font-bold tabular-nums leading-none">{s.value}</span>
            <span className="block text-xs text-muted-foreground truncate">{s.label}</span>
          </span>
        </button>
      ))}
    </div>
  );

  const legend = (
    <div className="space-y-1.5">
      {TIER_ORDER.map((tier) => {
        const m = TIER_META[tier];
        const active = tierFilter === tier;
        return (
          <button
            key={tier}
            onClick={() => setTierFilter(active ? null : tier)}
            className={`flex w-full items-center gap-2 rounded-md border px-2.5 py-2 text-sm font-medium transition-all ${
              active ? "border-primary bg-primary/10 text-foreground" : "border-transparent text-muted-foreground hover:border-border hover:bg-muted/60"
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: m.color }} />
            {vi ? m.vi : m.en}
            <span className="ml-auto tabular-nums font-bold">{counts[tier]}</span>
          </button>
        );
      })}
      {counts.alert > 0 && (
        <button
          onClick={gotoFirstAlert}
          className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-md border border-destructive/30 bg-destructive/10 px-2.5 py-2 text-xs font-semibold text-destructive hover:bg-destructive/15"
        >
          <Target className="w-3 h-3" /> {t("Tới em cần chú ý", "Go to attention")}
        </button>
      )}
      {(tierFilter || query) && (
        <button
          onClick={() => { setTierFilter(null); setQuery(""); }}
          className="flex w-full items-center justify-center gap-1 rounded-md border border-border px-2.5 py-2 text-xs text-muted-foreground hover:bg-muted/60"
        >
          <RotateCcw className="w-3 h-3" /> {t("Xóa lọc", "Clear")}
        </button>
      )}
    </div>
  );

  return (
    <Card className={`mb-6 border-border/60 ${full ? "fixed inset-3 z-50 overflow-auto bg-background shadow-2xl" : ""}`}>
      <CardHeader className="pb-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <School className="w-5 h-5 text-primary" />
            {t("Lớp học 3D trực quan", "Interactive 3D Classroom")}
            <span className="text-xs font-normal text-muted-foreground">
              {students.length} {t("học sinh", "students")}
            </span>
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5"
              onClick={() => setSeating((m) => (m === "rank" ? "attention" : "rank"))}
            >
              {seating === "rank" ? <Trophy className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
              {seating === "rank" ? t("Xếp theo thứ hạng", "Seated by rank") : t("Ưu tiên cần chú ý", "Attention first")}
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5" onClick={() => setFlat((f) => !f)}>
              {flat ? <Boxes className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              {flat ? t("Chế độ 3D", "3D mode") : t("Chế độ phẳng", "Flat mode")}
            </Button>
            <Button variant="outline" size="sm" onClick={() => setFull((f) => !f)}>
              {full ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setOpen((o) => !o)}>
              {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </CardHeader>

      {open && (
        <CardContent className="space-y-3">
          {statChips}
          <div className="flex flex-col lg:flex-row lg:items-center gap-3">
            <div className="relative w-full lg:max-w-xs">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("Tìm học sinh...", "Find a student...")}
                className="pl-8 h-9"
              />
            </div>
            {legend}
          </div>

          {students.length === 0 ? (
            <p className="text-muted-foreground text-center py-10">{t("Chưa có dữ liệu học sinh", "No student data yet")}</p>
          ) : flat ? (
            /* ---------- 2D fallback grid (same ranking order) ---------- */
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {seats
                .filter((s) => !dimSet || dimSet.has(s.student.userId))
                .map((seat) => {
                  const m = TIER_META[seat.tier];
                  return (
                    <button
                      key={seat.student.userId}
                      onClick={() => onSelectStudent(seat.student)}
                      className={`text-left p-3 rounded-xl border transition-all hover:shadow-md ${
                        selectedUserId === seat.student.userId ? "border-primary ring-1 ring-primary/40" : "border-border/60"
                      }`}
                      style={{ backgroundColor: `${m.color}14` }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold tabular-nums" style={{ color: m.color }}>#{seat.rank}</span>
                        <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: m.color }} />
                        <span className="font-semibold text-sm truncate">{seat.student.fullName}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {seat.student.avgScore || "-"}/10 · {seat.student.totalActivities} {t("hoạt động", "activities")}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatLastActive(seat.lastActiveMs, vi)}
                      </p>
                    </button>
                  );
                })}
            </div>
          ) : (
            <>
              <div className="flex flex-wrap gap-2">
                {([
                  { key: "class", label: t("Toàn lớp", "Whole class") },
                  { key: "top", label: t("Nhìn từ trên", "Top view") },
                  { key: "alert", label: t("Hàng cần chú ý", "Attention row") },
                ] as const).map((p) => (
                  <Button key={p.key} variant="secondary" size="sm" onClick={() => applyPreset(p.key)}>
                    {p.label}
                  </Button>
                ))}
                <span className="flex items-center gap-1 text-xs text-muted-foreground ml-1">
                  <Users className="w-3.5 h-3.5" />
                  {t("Chỗ ngồi theo thứ hạng học tập · kéo để quay · bấm avatar để xem chi tiết",
                     "Seats follow academic rank · drag to rotate · click an avatar for details")}
                </span>
              </div>

              <div
                ref={stageRef}
                className={`relative w-full ${canvasHeight} rounded-xl overflow-hidden border border-border/60 bg-gradient-to-b from-sky-50 to-slate-100 dark:from-slate-900 dark:to-slate-800`}
              >
                <Canvas
                  shadows={false}
                  dpr={[1, 1.5]}
                  gl={{ antialias: seats.length <= 40, powerPreference: "high-performance" }}
                  camera={{ position: [0, 7 + rows * 0.55, 12 + rows * 1.15], fov: 45 }}
                  frameloop={visible ? "always" : "demand"}
                >
                  <color attach="background" args={["#eef4fb"]} />
                  <ambientLight intensity={0.8} />
                  <hemisphereLight args={["#ffffff", "#c9d6e8", 0.5]} />
                  <directionalLight position={[6, 12, 8]} intensity={0.85} />
                  <directionalLight position={[-8, 6, -6]} intensity={0.3} />
                  <Suspense fallback={null}>
                    <Room
                      seats={seats}
                      cols={cols}
                      rows={rows}
                      classAvg={classAvg}
                      alertCount={counts.alert}
                      activeWeek={stats.activeWeek}
                      topNames={stats.topNames}
                      vi={vi}
                      dimSet={dimSet}
                      crowded={crowded}
                      selectedUserId={selectedUserId}
                      onHover={setHovered}
                      onSelect={focusSeat}
                    />
                    {hovered && (
                      <Html position={[hovered.x, 2.3, hovered.z]} center distanceFactor={14} zIndexRange={[40, 20]}>
                        <div className="pointer-events-none rounded-lg border border-border/70 bg-background/95 px-2.5 py-1.5 shadow-lg text-[11px] leading-snug whitespace-nowrap">
                          <p className="font-bold">#{hovered.rank} · {hovered.student.fullName}</p>
                          <p>{t("Điểm TB", "Avg")}: <b>{hovered.student.avgScore || "-"}</b>/10 · {hovered.student.totalActivities} {t("HĐ", "acts")}</p>
                          <p style={{ color: TIER_META[hovered.tier].color }}>
                            {vi ? TIER_META[hovered.tier].vi : TIER_META[hovered.tier].en}
                            {" · "}
                            {hovered.student.recentTrend === "improving"
                              ? t("tiến bộ", "improving")
                              : hovered.student.recentTrend === "declining"
                                ? t("giảm", "declining")
                                : t("ổn định", "stable")}
                          </p>
                          <p className="text-muted-foreground">{formatLastActive(hovered.lastActiveMs, vi)}</p>
                        </div>
                      </Html>
                    )}
                  </Suspense>
                  <OrbitControls
                    ref={controls}
                    enablePan
                    maxPolarAngle={Math.PI / 2.05}
                    minDistance={4}
                    maxDistance={40}
                    target={[0, 1, 0]}
                  />
                </Canvas>
              </div>
            </>
          )}
        </CardContent>
      )}
    </Card>
  );
};

export default Classroom3D;
