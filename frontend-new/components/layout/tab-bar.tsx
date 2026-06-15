'use client';

import { Icon } from '../ui/icons';

interface TabBarProps {
  active: string;
  onChange?: (tab: string) => void;
}

const TABS = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'sessions', label: 'Sessions', icon: 'sessions' },
  { id: 'stats', label: 'Stats', icon: 'stats' },
  { id: 'profile', label: 'Profile', icon: 'profile' },
];

export function TabBar({ active, onChange }: TabBarProps) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 64,
        display: 'flex',
        borderTop: '1px solid var(--deal-raised)',
        background: 'rgba(10, 10, 10, 0.95)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: '0 -2px 12px rgba(0, 0, 0, 0.4)',
        zIndex: 100,
        width: '100%',
        maxWidth: '100vw',
        overflow: 'hidden',
      }}
    >
      {TABS.map((tab) => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            className="press"
            onClick={() => onChange?.(tab.id)}
            style={{
              flex: 1,
              minWidth: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
              position: 'relative',
              paddingTop: 6,
              paddingLeft: 4,
              paddingRight: 4,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {isActive && (
              <span
                style={{
                  position: 'absolute',
                  top: 0,
                  width: 22,
                  height: 2,
                  borderRadius: 2,
                  background: 'var(--deal-signal)',
                }}
              />
            )}
            <Icon
              name={tab.icon}
              size={22}
              color={isActive ? 'var(--deal-signal)' : '#444'}
              strokeWidth={2}
            />
            <span
              style={{
                fontSize: 10,
                color: isActive ? 'var(--deal-signal)' : '#444',
                fontWeight: isActive ? 500 : 400,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '100%',
                lineHeight: 1.2,
              }}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
