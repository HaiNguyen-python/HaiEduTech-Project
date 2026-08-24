/**
 * @file Classroom3D.tsx
 * @description Interactive 3D classroom for the Admin Dashboard. Each student is
 *   an avatar at a desk; colour encodes status (red = needs attention,
 *   green = improving, blue = stable, amber = average, grey = inactive).
 *   Falls back to a 2D colour grid on mobile / reduced motion.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useMemo, useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, RoundedBox } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { normalizeForSearch } from "@/lib/adminData";
import type { StudentState } from "@/lib/rlEngine";
import {
  buildClassroomLayout,
  formatLastActive,
  tierCounts,
  TIER_META,
  TIER_ORDER,
  type ClassroomSeat,
  type ClassroomTier,
  type LastActivity,
} from "@/lib/classroom3d";
import {
  School, Search, Maximize2, Minimize2, ChevronDown, ChevronUp,
  Eye, Users, Boxes, RotateCcw,
} from "lucide-react";

interface Props {
  students: StudentState[];
  lastActivityByUser: Map<string, LastActivity>;
  classAvg: number;
  onSelectStudent: (s: StudentState) => void;
  selectedUserId?: string | null;
}

type CameraPreset = "class" | "top" | "alert";

const PRESETS: Record<CameraPreset, [number, number, number]> = {
  class: [0, 9, 16],
  top: [0, 22, 0.01],
  alert: [0, 4.5, -9],
};

/* ------------------------------------------------------------------ avatar */

const Avatar = ({
  seat,
  dimmed,
  selected,
  onHover,
  onSelect,
}: {
  seat: ClassroomSeat;
  dimmed: boolean;
  selected: boolean;
  onHover: (seat: ClassroomSeat | null) => void;
  onSelect: (seat: ClassroomSeat) => void;
}) => {
  const group = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);
  const meta = TIER_META[seat.tier];
  const bodyH = seat.height;
  const pulses = seat.tier === "alert" || seat.tier === "progress";

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (group.current) {
      const bob = pulses ? Math.sin(t * 2 + seat.col + seat.row) * 0.05 : 0;
      group.current.position.y = 0.42 + bob;
      if (selected) group.current.rotation.y = t * 0.6;
      else group.current.rotation.y = 0;
    }
    if (ring.current) {
      const base = 0.5 + seat.glow * 0.35;
      const s = seat.activeThisWeek ? base + Math.sin(t * 2.4 + seat.col) * 0.06 : base;
      ring.current.scale.setScalar(s);
      const mat = ring.current.material as THREE.MeshBasicMaterial;
      mat.opacity = dimmed ? 0.06 : 0.35 + seat.glow * 0.4;
    }
  });

  const opacity = dimmed ? 0.12 : seat.tier === "idle" ? 0.55 : 1;

  return (
    <group position={[seat.x, 0, seat.z]}>
      {/* desk */}
      <RoundedBox args={[1.35, 0.09, 0.75]} radius={0.04} smoothness={2} position={[0, 0.62, 0.72]}>
        <meshStandardMaterial color="#e2e8f0" roughness={0.6} transparent opacity={dimmed ? 0.15 : 0.9} />
      </RoundedBox>
      <mesh position={[0, 0.3, 0.72]}>
        <boxGeometry args={[0.08, 0.6, 0.08]} />
        <meshStandardMaterial color="#cbd5e1" transparent opacity={dimmed ? 0.12 : 0.85} />
      </mesh>

      {/* floor status ring */}
      <mesh ref={ring} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.012, 0]}>
        <ringGeometry args={[0.42, 0.62, 40]} />
        <meshBasicMaterial color={meta.color} transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>

      {/* clickable avatar */}
      <group
        ref={group}
        position={[0, 0.42, 0]}
        onPointerOver={(e) => { e.stopPropagation(); onHover(seat); }}
        onPointerOut={(e) => { e.stopPropagation(); onHover(null); }}
        onClick={(e) => { e.stopPropagation(); onSelect(seat); }}
      >
        <mesh position={[0, bodyH / 2, 0]}>
          <capsuleGeometry args={[0.27, bodyH * 0.7, 6, 14]} />
          <meshStandardMaterial
            color={meta.color}
            emissive={meta.emissive}
            emissiveIntensity={selected ? 1.1 : 0.35}
            roughness={0.35}
            metalness={0.15}
            transparent
            opacity={opacity}
          />
        </mesh>
        <mesh position={[0, bodyH + 0.24, 0]}>
          <sphereGeometry args={[0.24, 20, 20]} />
          <meshStandardMaterial
            color={meta.color}
            emissive={meta.emissive}
            emissiveIntensity={selected ? 1.2 : 0.45}
            roughness={0.28}
            transparent
            opacity={opacity}
          />
        </mesh>
        {selected && (
          <mesh position={[0, bodyH + 0.78, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.22, 0.035, 10, 28]} />
            <meshStandardMaterial color="#facc15" emissive="#facc15" emissiveIntensity={0.9} />
          </mesh>
        )}
      </group>
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
  vi,
  dimSet,
  selectedUserId,
  onHover,
  onSelect,
}: {
  seats: ClassroomSeat[];
  cols: number;
  rows: number;
  classAvg: number;
  alertCount: number;
  vi: boolean;
  dimSet: Set<string> | null;
  selectedUserId?: string | null;
  onHover: (s: ClassroomSeat | null) => void;
  onSelect: (s: ClassroomSeat) => void;
}) => {
  const w = Math.max(10, cols * 2.1 + 3);
  const d = Math.max(10, rows * 2.3 + 5);

  return (
    <group>
      {/* floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[w, d]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.9} />
      </mesh>
      <gridHelper args={[Math.max(w, d), Math.round(Math.max(w, d) / 2.1), "#cbd5e1", "#e2e8f0"]} position={[0, 0.005, 0]} />

      {/* whiteboard */}
      <group position={[0, 2.2, -d / 2 + 0.35]}>
        <RoundedBox args={[Math.min(w * 0.7, 11), 2.9, 0.18]} radius={0.06} smoothness={2}>
          <meshStandardMaterial color="#ffffff" roughness={0.5} />
        </RoundedBox>
        <Html position={[0, 0.1, 0.14]} center distanceFactor={12} transform>
          <div className="select-none text-center rounded-md bg-white px-4 py-2" style={{ width: 320 }}>
            <p className="text-[20px] font-bold text-slate-900">
              {vi ? "Lớp học HaiEduTech" : "HaiEduTech Classroom"}
            </p>
            <p className="text-[15px] font-semibold text-blue-700 mt-1">
              {`${vi ? "Điểm TB lớp" : "Class average"}: ${classAvg}/10`}
            </p>
            <p className="text-[14px] font-semibold mt-1" style={{ color: alertCount ? "#dc2626" : "#059669" }}>
              {alertCount
                ? `${alertCount} ${vi ? "học sinh cần chú ý" : "students need attention"}`
                : vi ? "Không có học sinh cần can thiệp" : "No students need intervention"}
            </p>
          </div>
        </Html>
      </group>

      {seats.map((seat) => (
        <Avatar
          key={seat.student.userId}
          seat={seat}
          dimmed={!!dimSet && !dimSet.has(seat.student.userId)}
          selected={selectedUserId === seat.student.userId}
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
  const [tierFilter, setTierFilter] = useState<ClassroomTier | null>(null);
  const [query, setQuery] = useState("");
  const [hovered, setHovered] = useState<ClassroomSeat | null>(null);
  const controls = useRef<OrbitControlsImpl | null>(null);

  // Reduced motion / small screens -> 2D grid mode
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || window.innerWidth < 768) setFlat(true);
  }, []);

  const { seats, cols, rows } = useMemo(
    () => buildClassroomLayout(students, lastActivityByUser),
    [students, lastActivityByUser],
  );
  const counts = useMemo(() => tierCounts(seats), [seats]);

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

  const applyPreset = (p: CameraPreset) => {
    const c = controls.current;
    if (!c) return;
    const [x, y, z] = PRESETS[p];
    c.object.position.set(x, y, z);
    c.target.set(0, p === "top" ? 0 : 1, p === "alert" ? -rows * 1.0 : 0);
    c.update();
  };

  const canvasHeight = full ? "h-[calc(100vh-190px)]" : "h-[440px] sm:h-[520px]";

  const legend = (
    <div className="flex flex-wrap gap-2">
      {TIER_ORDER.map((tier) => {
        const m = TIER_META[tier];
        const active = tierFilter === tier;
        return (
          <button
            key={tier}
            onClick={() => setTierFilter(active ? null : tier)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium transition-all ${
              active ? "border-primary bg-primary/10 text-foreground" : "border-border/60 text-muted-foreground hover:bg-muted/60"
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: m.color }} />
            {vi ? m.vi : m.en}
            <span className="tabular-nums font-bold">{counts[tier]}</span>
          </button>
        );
      })}
      {(tierFilter || query) && (
        <button
          onClick={() => { setTierFilter(null); setQuery(""); }}
          className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-border/60 text-xs text-muted-foreground hover:bg-muted/60"
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
            /* ---------- 2D fallback grid ---------- */
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
                  {t("Kéo để quay · lăn chuột để zoom · bấm avatar để xem chi tiết",
                     "Drag to rotate · scroll to zoom · click an avatar for details")}
                </span>
              </div>

              <div className={`relative w-full ${canvasHeight} rounded-xl overflow-hidden border border-border/60 bg-gradient-to-b from-sky-50 to-slate-100 dark:from-slate-900 dark:to-slate-800`}>
                <Canvas
                  shadows={false}
                  dpr={[1, 1.6]}
                  camera={{ position: PRESETS.class, fov: 45 }}
                  frameloop="always"
                >
                  <color attach="background" args={["#eef4fb"]} />
                  <ambientLight intensity={0.85} />
                  <directionalLight position={[6, 12, 8]} intensity={0.9} />
                  <directionalLight position={[-8, 6, -6]} intensity={0.35} />
                  <Suspense fallback={null}>
                    <Room
                      seats={seats}
                      cols={cols}
                      rows={rows}
                      classAvg={classAvg}
                      alertCount={counts.alert}
                      vi={vi}
                      dimSet={dimSet}
                      selectedUserId={selectedUserId}
                      onHover={setHovered}
                      onSelect={(s) => onSelectStudent(s.student)}
                    />
                    {hovered && (
                      <Html position={[hovered.x, hovered.height + 1.35, hovered.z]} center distanceFactor={14}>
                        <div className="pointer-events-none rounded-lg border border-border/70 bg-background/95 px-2.5 py-1.5 shadow-lg text-[11px] leading-snug whitespace-nowrap">
                          <p className="font-bold">{hovered.student.fullName}</p>
                          <p>{t("Điểm TB", "Avg")}: <b>{hovered.student.avgScore || "-"}</b>/10 · {hovered.student.totalActivities} {t("HĐ", "acts")}</p>
                          <p style={{ color: TIER_META[hovered.tier].color }}>
                            {vi ? TIER_META[hovered.tier].vi : TIER_META[hovered.tier].en}
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
