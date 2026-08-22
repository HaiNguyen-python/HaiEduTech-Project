/**
 * @file VocabBrain3D.tsx
 * @description WebGL brain-shaped memory map. Every mastered word is a neuron:
 * freshly reviewed words glow, words left unreviewed fade out, mimicking how
 * human memory decays. Front-facing neurons also render the word itself as a
 * crisp HTML label overlaid on the canvas (no extra font assets, no workers).
 *
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import {
  buildScaffold,
  buildSynapses,
  pickLabelCandidates,
  tierForDays,
  type BrainNeuron,
  type LabelCandidate,
} from "./vocabBrainModel";

export type LabelDensity = "low" | "medium" | "high";

interface Props {
  neurons: BrainNeuron[];
  onSelect: (word: string) => void;
  /** Word highlighted by the parent (selected card). */
  selected: string | null;
  showLabels?: boolean;
  density?: LabelDensity;
  paused?: boolean;
  /** Word typed in the search box - always labelled and highlighted. */
  focusWord?: string | null;
}

/** A label ready to be drawn in DOM space (percentages of the canvas box). */
interface ScreenLabel {
  word: string;
  left: number;
  top: number;
  color: string;
  opacity: number;
  key: boolean;
}

const DENSITY_LIMIT: Record<LabelDensity, number> = { low: 22, medium: 48, high: 90 };

const VERT = /* glsl */ `
  attribute float aSize;
  attribute float aAlpha;
  attribute float aPhase;
  varying vec3 vColor;
  varying float vAlpha;
  uniform float uTime;
  void main() {
    vColor = color;
    // Slow pulse: bright neurons breathe faster than faded ones.
    float pulse = 0.82 + 0.18 * sin(uTime * (0.8 + aAlpha * 1.6) + aPhase * 6.2831);
    vAlpha = aAlpha * pulse;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * (300.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const FRAG = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vec2 d = gl_PointCoord - vec2(0.5);
    float r = length(d);
    if (r > 0.5) discard;
    // Soft glow falloff.
    float a = vAlpha * smoothstep(0.5, 0.06, r);
    gl_FragColor = vec4(vColor + vec3(0.35) * (1.0 - smoothstep(0.0, 0.28, r)), a);
  }
`;

/**
 * Projects front-facing neurons to screen space a few times per second and
 * hands the winning labels to the DOM overlay.
 */
const LabelProjector = ({
  neurons,
  selected,
  focusWord,
  density,
  onLabels,
}: {
  neurons: BrainNeuron[];
  selected: string | null;
  focusWord?: string | null;
  density: LabelDensity;
  onLabels: (labels: ScreenLabel[]) => void;
}) => {
  const { camera } = useThree();
  const last = useRef(0);
  const v = useRef(new THREE.Vector3());
  const camDir = useRef(new THREE.Vector3());

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (t - last.current < 0.16) return; // ~6 refreshes per second
    last.current = t;

    camDir.current.copy(camera.position).normalize();
    const dist = camera.position.length();
    // Zoomed in -> more labels; far away -> fewer.
    const zoomFactor = THREE.MathUtils.clamp(3.6 / Math.max(dist, 0.001), 0.45, 1.8);
    const limit = Math.round(DENSITY_LIMIT[density] * zoomFactor);

    const items: LabelCandidate[] = neurons.map(n => {
      v.current.set(n.x, n.y, n.z);
      const facing = v.current.clone().normalize().dot(camDir.current);
      v.current.project(camera);
      return { neuron: n, sx: v.current.x, sy: v.current.y, facing };
    });

    const forced = [selected, focusWord].filter((w): w is string => !!w);
    const picked = pickLabelCandidates(items, limit, 0.09, forced);

    onLabels(
      picked.map(({ neuron, sx, sy }) => {
        const info = tierForDays(neuron.days);
        const isKey =
          selected?.toLowerCase() === neuron.word.toLowerCase() ||
          focusWord?.toLowerCase() === neuron.word.toLowerCase();
        return {
          word: neuron.word,
          left: (sx * 0.5 + 0.5) * 100,
          top: (-sy * 0.5 + 0.5) * 100,
          color: isKey ? "#ffffff" : info.color,
          opacity: isKey ? 1 : Math.max(info.alpha, 0.78),
          key: isKey,
        };
      }),
    );
  });

  return null;
};

const NeuronCloud = ({
  neurons,
  onSelect,
  selected,
  focusWord,
  onHover,
}: Props & { onHover: (n: BrainNeuron | null) => void }) => {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  const { geometry, synapseGeometry } = useMemo(() => {
    const count = neurons.length;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const size = new Float32Array(count);
    const alpha = new Float32Array(count);
    const phase = new Float32Array(count);
    const c = new THREE.Color();

    neurons.forEach((n, i) => {
      pos[i * 3] = n.x;
      pos[i * 3 + 1] = n.y;
      pos[i * 3 + 2] = n.z;
      const info = tierForDays(n.days);
      c.set(info.color);
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
      const isSelected =
        selected?.toLowerCase() === n.word.toLowerCase() ||
        focusWord?.toLowerCase() === n.word.toLowerCase();
      size[i] = 0.085 * info.scale * (isSelected ? 2.1 : 1);
      alpha[i] = isSelected ? 1 : info.alpha;
      phase[i] = (i % 97) / 97;
    });

    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("color", new THREE.BufferAttribute(col, 3));
    g.setAttribute("aSize", new THREE.BufferAttribute(size, 1));
    g.setAttribute("aAlpha", new THREE.BufferAttribute(alpha, 1));
    g.setAttribute("aPhase", new THREE.BufferAttribute(phase, 1));

    // Connective fibres between nearby neurons.
    const pairs = buildSynapses(neurons);
    const lp = new Float32Array(pairs.length * 6);
    const lc = new Float32Array(pairs.length * 6);
    pairs.forEach(([a, b], i) => {
      const na = neurons[a];
      const nb = neurons[b];
      lp.set([na.x, na.y, na.z, nb.x, nb.y, nb.z], i * 6);
      const ia = tierForDays(na.days);
      const ib = tierForDays(nb.days);
      c.set(ia.color).multiplyScalar(ia.alpha * 0.8);
      lc.set([c.r, c.g, c.b], i * 6);
      c.set(ib.color).multiplyScalar(ib.alpha * 0.8);
      lc.set([c.r, c.g, c.b], i * 6 + 3);
    });
    const sg = new THREE.BufferGeometry();
    sg.setAttribute("position", new THREE.BufferAttribute(lp, 3));
    sg.setAttribute("color", new THREE.BufferAttribute(lc, 3));

    return { geometry: g, synapseGeometry: sg };
  }, [neurons, selected, focusWord]);

  // Two scaffold layers: a crisp outer shell for the silhouette and a very dim
  // inner cloud so the brain reads as a solid volume.
  const scaffoldOuter = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(buildScaffold(3600), 3));
    return g;
  }, []);

  const scaffoldInner = useMemo(() => {
    const src = buildScaffold(1800);
    const inner = new Float32Array(src.length);
    for (let i = 0; i < src.length; i += 1) inner[i] = src[i] * 0.82;
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(inner, 3));
    return g;
  }, []);

  useFrame(({ clock }) => {
    if (matRef.current) matRef.current.uniforms.uTime.value = clock.getElapsedTime();
  });

  const handleMove = (e: ThreeEvent<PointerEvent>) => {
    if (typeof e.index === "number") {
      setHovered(e.index);
      onHover(neurons[e.index] ?? null);
    }
  };

  const hoveredNeuron = hovered !== null ? neurons[hovered] : null;

  return (
    <group>
      {/* Cortex scaffold: faint tissue so the brain shape always reads. */}
      <points geometry={scaffoldOuter} raycast={() => null}>
        <pointsMaterial
          color="#93c5fd"
          size={0.015}
          sizeAttenuation
          transparent
          opacity={0.45}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <points geometry={scaffoldInner} raycast={() => null}>
        <pointsMaterial
          color="#3b82f6"
          size={0.01}
          sizeAttenuation
          transparent
          opacity={0.12}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <lineSegments geometry={synapseGeometry}>
        <lineBasicMaterial vertexColors transparent opacity={0.28} blending={THREE.AdditiveBlending} depthWrite={false} />
      </lineSegments>

      <points
        geometry={geometry}
        onPointerMove={handleMove}
        onPointerOut={() => { setHovered(null); onHover(null); }}
        onClick={(e) => {
          if (typeof e.index === "number") onSelect(neurons[e.index].word);
        }}
      >
        <shaderMaterial
          ref={matRef}
          vertexShader={VERT}
          fragmentShader={FRAG}
          uniforms={{ uTime: { value: 0 } }}
          transparent
          vertexColors
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Translucent cortex shell + rim glow so the shape reads as a brain. */}
      <mesh scale={[0.98, 0.8, 1.24]} position={[0, 0.16, 0]}>
        <sphereGeometry args={[0.92, 40, 28]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.05} side={THREE.BackSide} />
      </mesh>
      <mesh scale={[1.04, 0.86, 1.3]} position={[0, 0.16, 0]}>
        <sphereGeometry args={[0.94, 40, 28]} />
        <meshBasicMaterial
          color="#10b981"
          transparent
          opacity={0.035}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {hoveredNeuron && (
        <mesh position={[hoveredNeuron.x, hoveredNeuron.y, hoveredNeuron.z]}>
          <ringGeometry args={[0.05, 0.075, 24]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.85} side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  );
};

const VocabBrain3D = ({
  neurons,
  onSelect,
  selected,
  showLabels = true,
  density = "medium",
  paused = false,
  focusWord = null,
}: Props) => {
  const [labels, setLabels] = useState<ScreenLabel[]>([]);
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);

  return (
    <div className="relative h-full w-full">
      <Canvas
        dpr={[1, 1.8]}
        camera={{ position: [0, 0.3, 3.4], fov: 45 }}
        raycaster={{ params: { Points: { threshold: 0.05 } } as any }}
        style={{ touchAction: "none", cursor: "grab" }}
      >
        <ambientLight intensity={0.8} />
        <NeuronCloud
          neurons={neurons}
          onSelect={onSelect}
          selected={selected}
          focusWord={focusWord}
          onHover={(n) => setHoveredWord(n?.word ?? null)}
        />
        {showLabels && (
          <LabelProjector
            neurons={neurons}
            selected={selected}
            focusWord={focusWord}
            density={density}
            onLabels={setLabels}
          />
        )}
        <OrbitControls
          autoRotate={!paused}
          autoRotateSpeed={0.6}
          enablePan={false}
          minDistance={1.8}
          maxDistance={6}
          zoomSpeed={0.6}
        />
      </Canvas>

      {/* Word labels drawn in DOM space so the text stays perfectly crisp. */}
      {showLabels && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {labels.map((l, i) => (
            <button
              key={`${l.word}-${i}`}
              onClick={() => onSelect(l.word)}

              style={{
                left: `${l.left}%`,
                top: `${l.top}%`,
                color: l.color,
                opacity: l.opacity,
                textShadow: "0 1px 3px rgba(2,6,23,0.95), 0 0 8px rgba(2,6,23,0.9)",
              }}
              className={`pointer-events-auto absolute -translate-x-1/2 -translate-y-[150%] whitespace-nowrap font-semibold leading-none transition-opacity hover:!opacity-100 ${
                l.key ? "text-sm font-extrabold" : "text-[11px]"
              }`}
            >
              {l.word}
            </button>
          ))}
        </div>
      )}

      {hoveredWord && (
        <div className="pointer-events-none absolute left-1/2 top-3 -translate-x-1/2 rounded-lg bg-black/60 px-3 py-1 text-sm font-bold text-white backdrop-blur">
          {hoveredWord}
        </div>
      )}
    </div>
  );
};

export default VocabBrain3D;
