'use client';

interface PillProps {
  children: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export function Pill({ children, selected, onClick, style }: PillProps) {
  return (
    <button
      className="press"
      onClick={onClick}
      style={{
        height: 34,
        padding: '0 14px',
        borderRadius: 999,
        flexShrink: 0,
        fontSize: 13,
        fontWeight: selected ? 600 : 500,
        background: selected ? 'var(--deal-signal)' : 'var(--deal-raised)',
        color: selected ? 'var(--deal-signal-ink)' : 'var(--deal-text-3)',
        border: selected ? '1px solid var(--deal-signal)' : '1px solid var(--deal-border)',
        transition: 'all 0.15s var(--ease)',
        ...style,
      }}
    >
      {children}
    </button>
  );
}
