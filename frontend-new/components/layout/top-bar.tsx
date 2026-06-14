'use client';

import { Icon } from '../ui/icons';

interface TopBarProps {
  title: string;
  onBack?: () => void;
  close?: boolean;
  right?: React.ReactNode;
}

export function TopBar({ title, onBack, close, right }: TopBarProps) {
  return (
    <div
      style={{
        height: 56,
        display: 'flex',
        alignItems: 'center',
        padding: '0 12px',
        position: 'relative',
        flexShrink: 0,
      }}
    >
      <div style={{ width: 64, display: 'flex', justifyContent: 'flex-start' }}>
        {onBack && (
          <button
            className="press"
            onClick={onBack}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              height: 44,
              padding: '0 6px',
              color: 'var(--deal-text-2)',
              fontSize: 15,
            }}
          >
            {close ? (
              <>
                <Icon name="x" size={20} color="var(--deal-text-2)" />
                <span style={{ marginLeft: 2 }}>Close</span>
              </>
            ) : (
              <Icon name="chevronLeft" size={20} color="var(--deal-text-2)" />
            )}
          </button>
        )}
      </div>
      <div
        style={{
          flex: 1,
          textAlign: 'center',
          fontSize: 15,
          fontWeight: 500,
          color: 'var(--deal-text-1)',
        }}
      >
        {title}
      </div>
      <div style={{ width: 64, display: 'flex', justifyContent: 'flex-end' }}>{right}</div>
    </div>
  );
}
