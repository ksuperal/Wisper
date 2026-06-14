'use client';

interface CardProps {
  children: React.ReactNode;
  variant?: 'standard' | 'raised' | 'signal' | 'danger';
  style?: React.CSSProperties;
  onClick?: () => void;
}

export function Card({ children, variant = 'standard', style, onClick }: CardProps) {
  const variants = {
    standard: {
      background: 'var(--deal-surface)',
      border: '1px solid var(--deal-border)',
      borderRadius: 12,
      padding: 16,
    },
    raised: {
      background: 'var(--deal-raised)',
      border: '1px solid var(--deal-border)',
      borderRadius: 12,
      padding: 16,
    },
    signal: {
      background: 'var(--deal-signal-bg)',
      border: '1px solid var(--deal-signal-dim)',
      borderRadius: 14,
      padding: 16,
      borderLeft: '4px solid var(--deal-signal)',
    },
    danger: {
      background: 'var(--deal-danger-bg)',
      border: '1px solid var(--deal-danger)',
      borderRadius: 12,
      padding: 14,
    },
  };

  return <div onClick={onClick} style={{ ...variants[variant], ...style }}>{children}</div>;
}
