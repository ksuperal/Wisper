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
        height: 64,
        display: 'flex',
        borderTop: '1px solid var(--deal-raised)',
        background: 'var(--deal-ink)',
        flexShrink: 0,
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
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
              position: 'relative',
              paddingTop: 6,
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
              size={23}
              color={isActive ? 'var(--deal-signal)' : '#444'}
              strokeWidth={2}
            />
            <span
              style={{
                fontSize: 11,
                color: isActive ? 'var(--deal-signal)' : '#444',
                fontWeight: isActive ? 500 : 400,
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
