'use client';

interface SectionLabelProps {
  children: React.ReactNode;
  dot?: string;
  color?: string;
  style?: React.CSSProperties;
}

export function SectionLabel({ children, dot, color, style }: SectionLabelProps) {
  return (
    <div
      className="caption"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        color: color || 'var(--deal-text-3)',
        ...style,
      }}
    >
      {dot && (
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: dot,
            flexShrink: 0,
          }}
        />
      )}
      {children}
    </div>
  );
}
