'use client';

import { SessionStatus } from '@/lib/types';

interface StatusPillProps {
  status: SessionStatus;
}

export function StatusPill({ status }: StatusPillProps) {
  const variants = {
    won: {
      bg: 'var(--deal-signal-bg)',
      text: 'var(--deal-signal)',
      border: 'var(--deal-signal-dim)',
      label: 'Won',
    },
    lost: {
      bg: 'var(--deal-danger-bg)',
      text: '#FCA5A5',
      border: '#FF4D4D40',
      label: 'Lost',
    },
    ongoing: {
      bg: 'var(--deal-raised)',
      text: 'var(--deal-text-2)',
      border: 'var(--deal-border)',
      label: 'Ongoing',
    },
    walked: {
      bg: 'var(--deal-raised)',
      text: 'var(--deal-text-2)',
      border: 'var(--deal-border)',
      label: 'Walked',
    },
  };

  const variant = variants[status] || variants.ongoing;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        height: 24,
        padding: '0 10px',
        borderRadius: 999,
        background: variant.bg,
        color: variant.text,
        border: `1px solid ${variant.border}`,
        fontSize: 11,
        fontWeight: 500,
      }}
    >
      {variant.label}
    </span>
  );
}
