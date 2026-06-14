'use client';

import { Icon } from '../ui/icons';

interface ListBlockProps {
  items: string[];
  color: string;
  icon?: string;
  arrow?: boolean;
}

export function ListBlock({ items, color, icon, arrow }: ListBlockProps) {
  return (
    <div>
      {items.map((text, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            gap: 10,
            alignItems: 'flex-start',
            padding: '10px 0',
            borderBottom: i < items.length - 1 ? '1px solid var(--deal-raised)' : 'none',
          }}
        >
          {arrow ? (
            <span style={{ color, fontWeight: 700, fontSize: 14, lineHeight: 1.5 }}>→</span>
          ) : icon ? (
            <Icon name={icon} size={16} color={color} strokeWidth={2.4} />
          ) : null}
          <span style={{ fontSize: 13, color: 'var(--deal-text-2)', lineHeight: 1.6 }}>
            {text}
          </span>
        </div>
      ))}
    </div>
  );
}
