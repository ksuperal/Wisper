'use client';

import { MoveType } from '@/lib/types';
import { MOVE_CONFIGS } from '@/lib/constants';

interface MoveBadgeProps {
  type: MoveType;
  compact?: boolean;
}

export function MoveBadge({ type, compact = false }: MoveBadgeProps) {
  const config = MOVE_CONFIGS[type];

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        height: compact ? 22 : 26,
        padding: compact ? '0 8px' : '0 10px',
        borderRadius: 6,
        background: config.bgColor,
        color: config.textColor,
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: config.color,
          flexShrink: 0,
        }}
      />
      {config.label}
    </span>
  );
}
