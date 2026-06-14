'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'icon' | 'mic';
  fullWidth?: boolean;
  isRecording?: boolean;
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  fullWidth = false,
  isRecording = false,
  disabled,
  children,
  style,
  ...props
}: ButtonProps) {
  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 500,
    fontSize: 15,
    cursor: disabled ? 'not-allowed' : 'pointer',
    border: 'none',
    outline: 'none',
    transition: 'all 0.15s',
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      background: disabled ? 'var(--deal-raised)' : 'var(--deal-signal)',
      color: disabled ? '#444' : 'var(--deal-signal-ink)',
      height: 52,
      borderRadius: 12,
      padding: '0 24px',
      width: fullWidth ? '100%' : 'auto',
    },
    secondary: {
      background: 'transparent',
      border: '1px solid var(--deal-border)',
      color: 'var(--deal-text-2)',
      height: 52,
      borderRadius: 12,
      padding: '0 24px',
      width: fullWidth ? '100%' : 'auto',
    },
    danger: {
      background: 'transparent',
      border: '1px solid var(--deal-danger)',
      color: 'var(--deal-danger)',
      height: 44,
      borderRadius: 10,
      padding: '0 24px',
    },
    icon: {
      width: 44,
      height: 44,
      background: 'var(--deal-raised)',
      border: '1px solid var(--deal-border)',
      borderRadius: 10,
    },
    mic: {
      width: 52,
      height: 52,
      background: 'var(--deal-raised)',
      border: isRecording ? '2px solid var(--deal-danger)' : '1px solid var(--deal-border)',
      borderRadius: '50%',
      position: 'relative',
    },
  };

  return (
    <button
      className="press"
      style={{ ...baseStyles, ...variantStyles[variant], ...style }}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
