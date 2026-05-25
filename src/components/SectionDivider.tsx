/** Subtle SVG wave divider between sections. Uses primary token colors. */
interface Props {
  flip?: boolean;
  className?: string;
}

const SectionDivider = ({ flip = false, className = "" }: Props) => (
  <div
    className={`pointer-events-none w-full overflow-hidden leading-[0] ${className}`}
    style={{ transform: flip ? "rotate(180deg)" : undefined }}
    aria-hidden
  >
    <svg
      viewBox="0 0 1440 70"
      preserveAspectRatio="none"
      className="block h-[40px] w-full sm:h-[55px]"
    >
      <defs>
        <linearGradient id="hetWaveGrad" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="hsl(var(--primary) / 0.10)" />
          <stop offset="50%" stopColor="hsl(var(--accent) / 0.12)" />
          <stop offset="100%" stopColor="hsl(var(--primary) / 0.10)" />
        </linearGradient>
      </defs>
      <path
        d="M0,40 C240,70 480,10 720,30 C960,50 1200,20 1440,40 L1440,70 L0,70 Z"
        fill="url(#hetWaveGrad)"
      />
    </svg>
  </div>
);

export default SectionDivider;
