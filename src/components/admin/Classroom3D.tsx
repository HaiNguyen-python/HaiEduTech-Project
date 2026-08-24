/**
 * @file Classroom3D.tsx
 * @description Interactive 3D classroom for the Admin Dashboard. Each student is
 *   a small seated avatar with a name tag above the head; colour encodes status
 *   (red = needs attention, green = improving, blue = stable, amber = average,
 *   grey = inactive). Seats follow the academic ranking of the class.
 *   Falls back to a 2D colour grid on mobile / reduced motion.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useMemo, useRef, useState, useEffect, Suspense, useCallback, type ReactNode } from "react";
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
  LayoutGrid, ScanLine, UserRound, Armchair,
} from "lucide-react";
import "@fontsource/urbanist/600.css";
import "@fontsource/urbanist/700.css";
import "@fontsource/epilogue/400.css";
import "@fontsource/epilogue/600.css";

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
  deskApron: new THREE.BoxGeometry(1.16, 0.26, 0.06),
  deskLeg: new THREE.BoxGeometry(0.07, 0.6, 0.07),
  neck: new THREE.CylinderGeometry(0.075, 0.09, 0.12, 10),
  shoe: new THREE.BoxGeometry(0.18, 0.1, 0.3),
};

const DARK = new THREE.MeshStandardMaterial({ color: "#1e293b", roughness: 0.5 });
const SKIN = new THREE.MeshStandardMaterial({ color: "#f5d0a9", roughness: 0.45 });
const WOOD = new THREE.MeshStandardMaterial({ color: "#d7c4a3", roughness: 0.62 });
const WOOD_EDGE = new THREE.MeshStandardMaterial({ color: "#9b815f", roughness: 0.7 });
const METAL = new THREE.MeshStandardMaterial({ color: "#65758b", roughness: 0.42, metalness: 0.35 });
const CHAIR = new THREE.MeshStandardMaterial({ color: "#376fae", roughness: 0.58 });
const SHOE = new THREE.MeshStandardMaterial({ color: "#334155", roughness: 0.72 });
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

const shirtMat = (tier: ClassroomTier, dimmed: boolean) => {
  const material = TIER_MATS.get(`${tier}-${dimmed ? "dim" : tier === "idle" ? "faded" : "solid"}`);
  return material ?? DARK;
};

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
      <mesh geometry={GEO.deskApron} material={WOOD_EDGE} position={[0, 0.51, 1.08]} />
      <mesh geometry={GEO.deskLeg} material={METAL} position={[-0.55, 0.32, 0.74]} />
      <mesh geometry={GEO.deskLeg} material={METAL} position={[0.55, 0.32, 0.74]} />
      <mesh geometry={GEO.deskLeg} material={METAL} position={[-0.55, 0.32, 1.02]} />
      <mesh geometry={GEO.deskLeg} material={METAL} position={[0.55, 0.32, 1.02]} />

      {/* chair */}
      <mesh geometry={GEO.chairSeat} material={CHAIR} position={[0, 0.42, -0.08]} />
      <mesh geometry={GEO.chairBack} material={CHAIR} position={[0, 0.63, -0.33]} />
      <mesh geometry={GEO.chairLeg} material={METAL} position={[-0.24, 0.19, -0.28]} />
      <mesh geometry={GEO.chairLeg} material={METAL} position={[0.24, 0.19, -0.28]} />
      <mesh geometry={GEO.chairLeg} material={METAL} position={[-0.24, 0.19, 0.1]} />
      <mesh geometry={GEO.chairLeg} material={METAL} position={[0.24, 0.19, 0.1]} />

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
        <mesh geometry={GEO.shoe} material={SHOE} position={[-0.12, -0.23, 0.47]} />
        <mesh geometry={GEO.shoe} material={SHOE} position={[0.12, -0.23, 0.47]} />

        {/* torso */}
        <mesh geometry={GEO.torso} material={mat} position={[0, 0.3, 0]} />
        <mesh geometry={GEO.neck} material={SKIN} position={[0, 0.58, 0]} />

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

const ROOM_MATERIALS = {
  wall: new THREE.MeshStandardMaterial({ color: "#f8fafc", roughness: 0.88 }),
  wallWarm: new THREE.MeshStandardMaterial({ color: "#eef3f1", roughness: 0.9 }),
  floor: new THREE.MeshStandardMaterial({ color: "#d7c4a3", roughness: 0.76 }),
  frame: new THREE.MeshStandardMaterial({ color: "#e2e8f0", roughness: 0.48, metalness: 0.16 }),
  glass: new THREE.MeshPhysicalMaterial({ color: "#dbeafe", transparent: true, opacity: 0.3, roughness: 0.1, transmission: 0.35 }),
  foliage: new THREE.MeshStandardMaterial({ color: "#10b981", roughness: 0.84 }),
  pot: new THREE.MeshStandardMaterial({ color: "#e7e1d6", roughness: 0.76 }),
  shelf: new THREE.MeshStandardMaterial({ color: "#a98d68", roughness: 0.7 }),
  board: new THREE.MeshStandardMaterial({ color: "#163d35", roughness: 0.38 }),
};

const WindowWall = ({ width, depth }: { width: number; depth: number }) => (
  <group position={[-width / 2 + 0.08, 3.2, 0]}>
    <mesh position={[0, 0, 0]}><boxGeometry args={[0.16, 6.4, depth]} /><primitive object={ROOM_MATERIALS.wallWarm} attach="material" /></mesh>
    {[-depth * 0.3, 0, depth * 0.3].map((z) => (
      <group key={z} position={[0.12, 0.45, z]}>
        <mesh rotation={[0, Math.PI / 2, 0]}><planeGeometry args={[Math.min(3.8, depth / 4), 3.7]} /><primitive object={ROOM_MATERIALS.glass} attach="material" /></mesh>
        <mesh position={[0, 0, -Math.min(1.9, depth / 8)]}><boxGeometry args={[0.14, 4.1, 0.12]} /><primitive object={ROOM_MATERIALS.frame} attach="material" /></mesh>
        <mesh position={[0, 0, Math.min(1.9, depth / 8)]}><boxGeometry args={[0.14, 4.1, 0.12]} /><primitive object={ROOM_MATERIALS.frame} attach="material" /></mesh>
        <mesh><boxGeometry args={[0.14, 0.12, Math.min(3.8, depth / 4)]} /><primitive object={ROOM_MATERIALS.frame} attach="material" /></mesh>
      </group>
    ))}
  </group>
);

const Plant = ({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) => (
  <group position={position} scale={scale}>
    <mesh position={[0, 0.33, 0]}><cylinderGeometry args={[0.27, 0.36, 0.65, 18]} /><primitive object={ROOM_MATERIALS.pot} attach="material" /></mesh>
    {[[-0.2, 0.9, 0], [0.2, 1.05, 0.05], [0, 1.2, -0.12], [-0.12, 1.38, 0.08]].map((p, i) => (
      <mesh key={i} position={p as [number, number, number]} rotation={[0, i * 0.8, i % 2 ? 0.45 : -0.45]}>
        <sphereGeometry args={[0.18, 10, 8]} /><primitive object={ROOM_MATERIALS.foliage} attach="material" />
      </mesh>
    ))}
  </group>
);

const ClassroomShell = ({ width, depth }: { width: number; depth: number }) => (
  <group>
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow><planeGeometry args={[width, depth]} /><primitive object={ROOM_MATERIALS.floor} attach="material" /></mesh>
    {Array.from({ length: Math.max(6, Math.round(width / 2)) }, (_, i) => (
      <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[-width / 2 + (i + 1) * (width / Math.max(6, Math.round(width / 2))), 0.008, 0]}>
        <planeGeometry args={[0.018, depth]} /><meshBasicMaterial color="#b89d78" transparent opacity={0.45} />
      </mesh>
    ))}
    <mesh position={[0, 3.2, -depth / 2]}><boxGeometry args={[width, 6.4, 0.18]} /><primitive object={ROOM_MATERIALS.wall} attach="material" /></mesh>
    <mesh position={[width / 2, 3.2, 0]}><boxGeometry args={[0.18, 6.4, depth]} /><primitive object={ROOM_MATERIALS.wallWarm} attach="material" /></mesh>
    <mesh position={[0, 6.35, 0]}><boxGeometry args={[width, 0.16, depth]} /><primitive object={ROOM_MATERIALS.wall} attach="material" /></mesh>
    <WindowWall width={width} depth={depth} />
    {[-width * 0.25, width * 0.25].map((x) => (
      <group key={x} position={[x, 6.12, -0.5]}>
        <mesh><boxGeometry args={[2.8, 0.09, 0.62]} /><meshStandardMaterial color="#ffffff" emissive="#fff7d6" emissiveIntensity={0.35} /></mesh>
      </group>
    ))}
    <Plant position={[width / 2 - 0.8, 0, -depth / 2 + 0.9]} />
    <Plant position={[-width / 2 + 0.85, 0, -depth / 2 + 0.8]} scale={0.8} />
  </group>
);

const TeacherZone = ({ width, depth }: { width: number; depth: number }) => (
  <group>
    <group position={[width / 2 - 2, 0, -depth / 2 + 1.4]}>
      {[0, 0.7, 1.4, 2.1].map((y) => <mesh key={y} position={[0, y + 0.18, 0]}><boxGeometry args={[1.7, 0.12, 0.65]} /><primitive object={ROOM_MATERIALS.shelf} attach="material" /></mesh>)}
      {[-0.65, 0.65].map((x) => <mesh key={x} position={[x, 1.25, 0]}><boxGeometry args={[0.1, 2.7, 0.65]} /><primitive object={ROOM_MATERIALS.shelf} attach="material" /></mesh>)}
    </group>
    <group position={[width / 2 - 3.3, 0, -depth / 2 + 0.8]}>
      <mesh position={[0, 0.82, 0]}><boxGeometry args={[2.1, 0.12, 0.85]} /><primitive object={WOOD} attach="material" /></mesh>
      {[-0.85, 0.85].flatMap((x) => [-0.28, 0.28].map((z) => <mesh key={`${x}-${z}`} position={[x, 0.4, z]}><boxGeometry args={[0.1, 0.8, 0.1]} /><primitive object={METAL} attach="material" /></mesh>))}
    </group>
  </group>
);

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
      <ClassroomShell width={w} depth={d} />
      <TeacherZone width={w} depth={d} />

      {/* whiteboard */}
      <group position={[0, 2.4, -d / 2 + 0.35]}>
        <RoundedBox args={[Math.min(w * 0.72, 12), 3.2, 0.18]} radius={0.07} smoothness={2}>
          <primitive object={ROOM_MATERIALS.board} attach="material" />
        </RoundedBox>
        <Html position={[0, 0.1, 0.14]} center distanceFactor={12} transform>
          <div className="select-none rounded-md border border-white/15 bg-[#163d35]/95 px-5 py-3 text-center shadow-xl" style={{ width: 380 }}>
            <p className="text-[20px] font-bold text-white">
              {vi ? "Lớp học HaiEduTech" : "HaiEduTech Classroom"}
            </p>
            <p className="mt-1 text-[15px] font-semibold text-emerald-200">
              {`${vi ? "Điểm TB lớp" : "Class average"}: ${classAvg}/10 · ${activeWeek} ${vi ? "em học tuần này" : "active this week"}`}
            </p>
            <p className="mt-1 text-[14px] font-semibold" style={{ color: alertCount ? "#fca5a5" : "#6ee7b7" }}>
              {alertCount
                ? `${alertCount} ${vi ? "học sinh cần chú ý" : "students need attention"}`
                : vi ? "Không có học sinh cần can thiệp" : "No students need intervention"}
            </p>
            {(topNames?.length ?? 0) > 0 && (
              <p className="mt-1 text-[13px] text-slate-200">
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
  const safeStudents = students ?? [];
  const safeLastActivityByUser = lastActivityByUser ?? new Map<string, LastActivity>();

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
    () => buildClassroomLayout(safeStudents, safeLastActivityByUser, seating),
    [safeStudents, safeLastActivityByUser, seating],
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

  const canvasHeight = full ? "h-[calc(100vh-150px)]" : "h-[560px] xl:h-[650px]";

  const statChips = (
    <div className="grid grid-cols-2 divide-x divide-y border-b border-border/60 sm:grid-cols-4 sm:divide-y-0">
      {[
        { icon: Users, label: t("Học sinh", "Students"), value: safeStudents.length, tier: null as ClassroomTier | null, color: "text-primary" },
        { icon: Activity, label: t("Học tuần này", "Active this week"), value: stats.activeWeek, tier: null, color: "text-emerald-600" },
        { icon: AlertTriangle, label: t("Điểm dưới 5", "Below 5/10"), value: stats.lowScore, tier: "alert" as ClassroomTier, color: "text-red-600" },
        { icon: TrendingUp, label: t("Đang tiến bộ", "Improving"), value: stats.improving, tier: "progress" as ClassroomTier, color: "text-green-600" },
      ].map((s) => (
        <Button
          key={s.label}
          variant="ghost"
          onClick={() => s.tier && setTierFilter(tierFilter === s.tier ? null : s.tier)}
          className={`h-auto min-h-16 justify-start rounded-none px-4 py-3 text-left transition-colors ${s.tier ? "hover:bg-muted/50" : "cursor-default"}`}
        >
          <s.icon className={`w-4 h-4 shrink-0 ${s.color}`} />
          <span className="min-w-0">
            <span className="font-classroom-heading block text-lg font-bold tabular-nums leading-none">{s.value}</span>
            <span className="block text-xs text-muted-foreground truncate">{s.label}</span>
          </span>
        </Button>
      ))}
    </div>
  );

  const legend = (
    <div className="space-y-1.5">
      {TIER_ORDER.map((tier) => {
        const m = TIER_META[tier];
        const active = tierFilter === tier;
        return (
          <Button
            key={tier}
            variant="ghost"
            onClick={() => setTierFilter(active ? null : tier)}
            className={`h-auto w-full justify-start gap-2 rounded-md border px-2.5 py-2 text-sm font-medium transition-all ${
              active ? "border-primary bg-primary/10 text-foreground" : "border-transparent text-muted-foreground hover:border-border hover:bg-muted/60"
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: m.color }} />
            {vi ? m.vi : m.en}
            <span className="ml-auto tabular-nums font-bold">{counts[tier]}</span>
          </Button>
        );
      })}
      {counts.alert > 0 && (
        <Button
          variant="ghost"
          onClick={gotoFirstAlert}
          className="mt-2 h-auto w-full gap-1.5 rounded-md border border-destructive/30 bg-destructive/10 px-2.5 py-2 text-xs font-semibold text-destructive hover:bg-destructive/15"
        >
          <Target className="w-3 h-3" /> {t("Tới em cần chú ý", "Go to attention")}
        </Button>
      )}
      {(tierFilter || query) && (
        <Button
          variant="ghost"
          onClick={() => { setTierFilter(null); setQuery(""); }}
          className="h-auto w-full gap-1 rounded-md border border-border px-2.5 py-2 text-xs text-muted-foreground hover:bg-muted/60"
        >
          <RotateCcw className="w-3 h-3" /> {t("Xóa lọc", "Clear")}
        </Button>
      )}
    </div>
  );

  const iconControl = (label: string, icon: ReactNode, action: () => void) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9" onClick={action} aria-label={label}>{icon}</Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );

  return (
    <TooltipProvider delayDuration={200}>
    <Card className={`font-classroom-body mb-6 overflow-hidden border-border/60 classroom-command-shadow ${full ? "fixed inset-3 z-50 overflow-auto bg-background" : ""}`}>
      <CardHeader className="border-b border-border/50 bg-card/90 px-4 py-4 backdrop-blur-md sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary"><School className="h-5 w-5" /></span>
            <div>
              <CardTitle className="font-classroom-heading text-xl font-bold">{t("Lớp học 3D trực quan", "Interactive 3D Classroom")}</CardTitle>
              <p className="mt-0.5 text-sm text-muted-foreground">{t("Không gian lớp học Bắc Âu", "Nordic learning space")} · {safeStudents.length} {t("học sinh", "students")} · {seating === "rank" ? t("xếp theo thành tích", "ranked seating") : t("ưu tiên cần chú ý", "attention first")}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-700 sm:flex"><span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />{t("Đang hoạt động", "Live")}</span>
            {!flat && (
              <div className="hidden rounded-md bg-muted p-1 lg:flex">
                {([
                  { key: "class", label: t("Toàn lớp", "Whole class") },
                  { key: "top", label: t("Từ trên", "Top view") },
                  { key: "alert", label: t("Cần chú ý", "Attention") },
                ] as const).map((preset, index) => (
                  <Button key={preset.key} variant={index === 0 ? "secondary" : "ghost"} size="sm" className="h-8 rounded-sm px-3 text-xs" onClick={() => applyPreset(preset.key)}>{preset.label}</Button>
                ))}
              </div>
            )}
            {iconControl(seating === "rank" ? t("Ưu tiên học sinh cần chú ý", "Attention-first seating") : t("Xếp lại theo thứ hạng", "Ranked seating"), seating === "rank" ? <Trophy className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />, () => setSeating((mode) => mode === "rank" ? "attention" : "rank"))}
            {iconControl(flat ? t("Chế độ 3D", "3D mode") : t("Chế độ phẳng", "Flat mode"), flat ? <Boxes className="h-4 w-4" /> : <Eye className="h-4 w-4" />, () => setFlat((value) => !value))}
            {iconControl(full ? t("Thu nhỏ", "Exit fullscreen") : t("Toàn màn hình", "Fullscreen"), full ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />, () => setFull((value) => !value))}
            {iconControl(open ? t("Thu gọn", "Collapse") : t("Mở rộng", "Expand"), open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />, () => setOpen((value) => !value))}
          </div>
        </div>
      </CardHeader>

      {open && (
        <CardContent className="p-0">
          {safeStudents.length === 0 ? (
            <p className="text-muted-foreground text-center py-10">{t("Chưa có dữ liệu học sinh", "No student data yet")}</p>
          ) : flat ? (
            /* ---------- 2D fallback grid (same ranking order) ---------- */
            <div className="grid grid-cols-2 gap-2 p-4 sm:grid-cols-3 lg:grid-cols-4">
              {seats
                .filter((s) => !dimSet || dimSet.has(s.student.userId))
                .map((seat) => {
                  const m = TIER_META[seat.tier];
                  return (
                    <Button
                      variant="ghost"
                      key={seat.student.userId}
                      onClick={() => onSelectStudent(seat.student)}
                      className={`h-auto justify-start text-left p-3 rounded-md border transition-all hover:shadow-md ${
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
                    </Button>
                  );
                })}
            </div>
          ) : (
            <div className="relative bg-[hsl(var(--classroom-canvas))] p-3 sm:p-4">
              <div className="mb-3 space-y-2 lg:hidden">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t("Tìm học sinh...", "Find a student...")} className="h-9 bg-card pl-8" />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {TIER_ORDER.map((tier) => {
                    const meta = TIER_META[tier];
                    return <Button key={tier} variant={tierFilter === tier ? "secondary" : "outline"} size="sm" className="shrink-0 gap-1.5" onClick={() => setTierFilter(tierFilter === tier ? null : tier)}><span className="h-2 w-2 rounded-full" style={{ backgroundColor: meta.color }} />{vi ? meta.vi : meta.en} {counts[tier]}</Button>;
                  })}
                </div>
              </div>
              <div className={`grid overflow-hidden rounded-md border border-border/70 bg-card shadow-xl xl:grid-cols-[minmax(0,1fr)_300px] ${canvasHeight}`}>
                <div ref={stageRef} className="relative min-h-0 overflow-hidden bg-[hsl(var(--classroom-canvas))]">
                <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1 rounded-md border border-border/60 bg-card/90 p-1.5 shadow-lg backdrop-blur-xl">
                  {([
                    { key: "class", icon: LayoutGrid, label: t("Toàn lớp", "Whole class") },
                    { key: "top", icon: ScanLine, label: t("Từ trên", "Top view") },
                    { key: "alert", icon: Target, label: t("Cần chú ý", "Attention") },
                  ] as const).map((preset) => <Button key={preset.key} variant="ghost" size="sm" className="gap-1.5" aria-label={preset.label} onClick={() => applyPreset(preset.key)}><preset.icon className="h-4 w-4" /><span className="hidden sm:inline">{preset.label}</span></Button>)}
                </div>
                <Canvas
                  shadows
                  dpr={[1, 1.5]}
                  gl={{ antialias: seats.length <= 40, powerPreference: "high-performance" }}
                  camera={{ position: [0, 7 + rows * 0.55, 12 + rows * 1.15], fov: 45 }}
                  frameloop={visible ? "always" : "demand"}
                >
                  <color attach="background" args={["#dceaf1"]} />
                  <fog attach="fog" args={["#e7eff3", 18, 50]} />
                  <ambientLight intensity={0.62} />
                  <hemisphereLight args={["#fffdf4", "#9fb5ad", 0.7]} />
                  <directionalLight position={[-10, 12, 8]} intensity={1.25} castShadow shadow-mapSize={[1024, 1024]} />
                  <directionalLight position={[8, 7, -5]} intensity={0.38} color="#dbeafe" />
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
                      labelSet={labelSet}
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
                <aside className="hidden min-h-0 overflow-y-auto border-l border-border/70 bg-card xl:block">
                  <div className="border-b border-border/60 p-5">
                    <p className="font-classroom-heading text-xs font-bold uppercase text-muted-foreground">{t("Trung tâm quản lý", "Management center")}</p>
                    <div className="relative mt-3">
                      <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t("Tìm học sinh...", "Find a student...")} className="h-9 bg-muted/40 pl-8" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 border-b border-border/60 p-4">
                    <div className="rounded-md bg-primary/5 p-3"><Users className="mb-2 h-4 w-4 text-primary" /><b className="block text-xl">{safeStudents.length}</b><span className="text-xs text-muted-foreground">{t("Học sinh", "Students")}</span></div>
                    <div className="rounded-md bg-emerald-500/5 p-3"><Activity className="mb-2 h-4 w-4 text-emerald-600" /><b className="block text-xl">{stats.activeWeek}</b><span className="text-xs text-muted-foreground">{t("Học tuần này", "Active week")}</span></div>
                  </div>
                  <div className="border-b border-border/60 p-4">
                    <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">{t("Trạng thái lớp", "Class status")}</p>
                    {legend}
                  </div>
                  <div className="p-4">
                    {selectedSeat ? (
                      <div>
                        <div className="mb-3 flex items-start justify-between gap-2"><div><p className="font-classroom-heading font-semibold">{selectedSeat.student.fullName}</p><p className="text-xs text-muted-foreground">#{selectedSeat.rank} · {vi ? TIER_META[selectedSeat.tier].vi : TIER_META[selectedSeat.tier].en}</p></div><UserRound className="h-5 w-5 text-primary" /></div>
                        <div className="grid grid-cols-2 gap-2 border-y border-border/60 py-3 text-sm"><div><p className="text-xs text-muted-foreground">{t("Điểm TB", "Average")}</p><b>{selectedSeat.student.avgScore || "-"}/10</b></div><div><p className="text-xs text-muted-foreground">{t("Hoạt động", "Activities")}</p><b>{selectedSeat.student.totalActivities}</b></div></div>
                        <p className="mt-3 text-xs text-muted-foreground">{formatLastActive(selectedSeat.lastActiveMs, vi)}</p>
                      </div>
                    ) : (
                      <div className="py-3 text-center"><Armchair className="mx-auto mb-2 h-6 w-6 text-muted-foreground" /><p className="text-sm font-medium">{t("Chọn một học sinh trong lớp", "Select a student in the room")}</p><p className="mt-1 text-xs text-muted-foreground">{t("Thông tin học tập sẽ hiện tại đây", "Learning details will appear here")}</p></div>
                    )}
                  </div>
                </aside>
              </div>
              <div className="mt-3 hidden grid-cols-4 gap-2 lg:grid xl:hidden">{statChips}</div>
            </div>
          )}
        </CardContent>
      )}
    </Card>
    </TooltipProvider>
  );
};

export default Classroom3D;
