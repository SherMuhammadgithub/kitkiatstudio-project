type WaveDividerProps = {
  color: string;
  flip?: boolean;
  className?: string;
};

/**
 * Soft wavy seam between two sections. `color` fills the wave and should
 * match the section that sits below it; `flip` mirrors it vertically for
 * seams that curve the opposite way.
 */
export function WaveDivider({ color, flip, className = "" }: WaveDividerProps) {
  return (
    <svg
      viewBox="0 0 1440 160"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-x-0 top-0 h-24 w-full sm:h-32 ${flip ? "-scale-y-100" : ""} ${className}`}
      aria-hidden
    >
      <path
        d="M0,80 C180,140 360,20 600,60 C840,100 1020,10 1260,70 C1350,95 1440,60 1440,60 L1440,160 L0,160 Z"
        fill={color}
      />
    </svg>
  );
}
