'use client';

import { Session } from '@/lib/types';
import { StatusPill } from '../ui/status-pill';
import { Icon } from '../ui/icons';

interface SessionRowProps {
  session: Session;
  last?: boolean;
  onClick: () => void;
}

export function SessionRow({ session, last, onClick }: SessionRowProps) {
  const amountColor = 'var(--deal-signal)';

  return (
    <button
      onClick={onClick}
      className="press"
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '14px 16px',
        borderBottom: last ? 'none' : '1px solid var(--deal-raised)',
        textAlign: 'left',
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 9,
          background: 'var(--deal-raised)',
          border: '1px solid var(--deal-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Icon name="handshake" size={18} color="var(--deal-signal)" />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: '#fff',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {session.title}
        </div>
        <div style={{ fontSize: 12, color: 'var(--deal-text-3)', marginTop: 2 }}>
          {new Date(session.createdAt).toLocaleDateString()} · {session.moveCount} moves
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
        <StatusPill status={session.status} />
        {session.finalAmount && (
          <span style={{ fontSize: 13, fontWeight: 500, color: amountColor }}>
            +${session.finalAmount.toLocaleString()}
          </span>
        )}
      </div>
    </button>
  );
}
