'use client';

interface StepProgressProps {
  step: number;
  total?: number;
}

export function StepProgress({ step, total = 2 }: StepProgressProps) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: 3,
              borderRadius: 999,
              background: i < step ? 'var(--deal-signal)' : 'var(--deal-border)',
              transition: 'background 0.3s',
            }}
          />
        ))}
      </div>
      <div style={{ fontSize: 11, color: 'var(--deal-text-3)', textAlign: 'center' }}>
        Step {step} of {total}
      </div>
    </div>
  );
}
