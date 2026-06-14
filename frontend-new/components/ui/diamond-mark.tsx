'use client';

interface DiamondMarkProps {
  size?: number;
  color?: string;
}

export function DiamondMark({ size = 48, color = 'var(--deal-signal)' }: DiamondMarkProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path
        d="M24 3 L43 24 L24 45 L5 24 Z"
        stroke={color}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M24 3 L33 24 L24 45 L15 24 Z"
        stroke={color}
        strokeWidth="2.5"
        strokeLinejoin="round"
        opacity="0.55"
      />
      <path d="M5 24 L43 24" stroke={color} strokeWidth="2.5" opacity="0.55" />
    </svg>
  );
}
