'use client';

interface StatCardProps {
  value: string;
  label: string;
}

export function StatCard({ value, label }: StatCardProps) {
  return (
    <div
      style={{
        flex: 1,
        background: 'var(--deal-surface)',
        border: '1px solid var(--deal-border)',
        borderRadius: 10,
        padding: 14,
      }}
    >
      <div
        style={{
          fontSize: 24,
          fontWeight: 600,
          color: 'var(--deal-signal)',
          letterSpacing: '-0.02em',
        }}
      >
        {value}
      </div>
      <div className="caption" style={{ marginTop: 2, color: 'var(--deal-text-3)' }}>
        {label}
      </div>
    </div>
  );
}
