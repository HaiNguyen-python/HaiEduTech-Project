/**
 * @file VocabBrain3D.tsx
 * @description WebGL brain-shaped memory map. Every mastered word is a neuron:
 * freshly reviewed words glow, words left unreviewed fade out, mimicking how
 * human memory decays. Lazy-loaded so the three.js bundle never blocks the page.
 *
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { buildSynapses, tierForDays, type BrainNeuron } from "./vocabBrainModel";

interface Props {
  neurons: BrainNeuron[];
  onSelect: (word: string) => void;
  /** Word highlighted by the parent (selected card). */
  selected: string | null;
}

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

const NeuronCloud = ({ neurons, onSelect, selected }: Props) => {
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
      const isSelected = selected === n.word;
      size[i] = 0.055 * info.scale * (isSelected ? 2.1 : 1);
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
  }, [neurons, selected]);

  useFrame(({ clock }) => {
    if (matRef.current) matRef.current.uniforms.uTime.value = clock.getElapsedTime();
  });

  const handleMove = (e: ThreeEvent<PointerEvent>) => {
    if (typeof e.index === "number") setHovered(e.index);
  };

  const hoveredNeuron = hovered !== null ? neurons[hovered] : null;

  return (
    <group>
      <lineSegments geometry={synapseGeometry}>
        <lineBasicMaterial vertexColors transparent opacity={0.28} blending={THREE.AdditiveBlending} depthWrite={false} />
      </lineSegments>

      <points
        geometry={geometry}
        onPointerMove={handleMove}
        onPointerOut={() => setHovered(null)}
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

      {/* Translucent cortex shell so the shape reads as a brain, not a blob. */}
      <mesh scale={[0.98, 0.8, 1.22]} position={[0, 0.16, 0]}>
        <sphereGeometry args={[0.9, 32, 24]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.045} side={THREE.BackSide} />
      </mesh>

      {hoveredNeuron && (
        <mesh position={[hoveredNeuron.x, hoveredNeuron.y, hoveredNeuron.z]}>
          <ringGeometry args={[0.05, 0.075, 24]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.8} side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  );
};

const VocabBrain3D = ({ neurons, onSelect, selected }: Props) => (
  <Canvas
    dpr={[1, 1.8]}
    camera={{ position: [0, 0.3, 3.4], fov: 45 }}
    raycaster={{ params: { Points: { threshold: 0.05 } } as any }}
    style={{ touchAction: "none", cursor: "grab" }}
  >
    <ambientLight intensity={0.8} />
    <NeuronCloud neurons={neurons} onSelect={onSelect} selected={selected} />
    <OrbitControls
      autoRotate
      autoRotateSpeed={0.6}
      enablePan={false}
      minDistance={1.8}
      maxDistance={6}
      zoomSpeed={0.6}
    />
  </Canvas>
);

export default VocabBrain3D;
