'use client';

export function LiveDot({ size = 7 }: { size?: number }) {
  return (
    <span style={{ position: 'relative', width: size, height: size, display: 'inline-block' }}>
      <span
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background: 'var(--deal-danger)',
          animation: 'deal-live-pulse 1.2s var(--ease) infinite',
        }}
      />
      <span
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background: 'var(--deal-danger)',
        }}
      />
    </span>
  );
}
