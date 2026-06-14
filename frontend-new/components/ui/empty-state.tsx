'use client';

import { Button } from './button';

interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
      <div style={{ fontSize: 48, marginBottom: 12 }}>{icon}</div>
      <h3
        style={{
          fontSize: 16,
          fontWeight: 500,
          color: 'var(--deal-text-1)',
          marginBottom: 8,
        }}
      >
        {title}
      </h3>
      <p style={{ fontSize: 14, color: 'var(--deal-text-3)', marginBottom: 20 }}>
        {description}
      </p>
      {action && (
        <Button variant="primary" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}
