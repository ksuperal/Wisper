'use client';

import { Move } from '@/lib/types';
import { MoveBadge } from './move-badge';

interface MoveCardProps {
  move: Move;
}

export function MoveCard({ move }: MoveCardProps) {
  return (
    <div
      className="move-card"
      style={{
        background: 'var(--deal-signal-bg)',
        border: '1px solid var(--deal-signal-dim)',
        borderLeft: '4px solid var(--deal-signal)',
        borderRadius: 14,
        padding: 16,
      }}
    >
      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <MoveBadge type={move.type} />
        <span style={{ fontSize: 11, color: '#444' }}>Move {move.n}</span>
      </div>

      {/* SAY THIS */}
      <div className="caption" style={{ color: 'var(--deal-signal)', margin: '14px 0 6px' }}>
        SAY THIS:
      </div>
      <div
        style={{
          background: 'rgba(0,0,0,0.32)',
          borderRadius: 8,
          padding: 12,
          fontSize: 15,
          lineHeight: 1.65,
          color: '#fff',
        }}
      >
        {move.say}
      </div>

      {/* Divider */}
      <div style={{ borderTop: '1px solid var(--deal-signal-dim)', margin: '14px 0 0' }} />

      {/* WHY */}
      <div className="caption" style={{ margin: '12px 0 4px' }}>WHY</div>
      <div style={{ fontSize: 13, color: '#888', lineHeight: 1.5 }}>{move.why}</div>

      {/* WATCH FOR */}
      <div className="caption" style={{ margin: '12px 0 4px' }}>WATCH FOR</div>
      <div style={{ fontSize: 13, color: '#888', lineHeight: 1.5 }}>{move.watch}</div>
    </div>
  );
}

export function ThinkingCard() {
  return (
    <div
      style={{
        background: 'var(--deal-surface)',
        border: '1px solid var(--deal-border)',
        borderRadius: 14,
        padding: '44px 20px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <div style={{ display: 'flex', gap: 7 }}>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: 'var(--deal-signal)',
                animation: 'deal-think 1.2s ease-in-out infinite',
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>
        <div style={{ fontSize: 12, color: 'var(--deal-text-3)' }}>
          Analyzing their position...
        </div>
      </div>
    </div>
  );
}
