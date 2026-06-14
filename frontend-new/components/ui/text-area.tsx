'use client';

import { useState } from 'react';

interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  minHeight?: number;
  style?: React.CSSProperties;
}

export function TextArea({
  value,
  onChange,
  placeholder,
  disabled,
  minHeight = 80,
  style,
}: TextAreaProps) {
  const [focus, setFocus] = useState(false);

  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      style={{
        width: '100%',
        minHeight,
        borderRadius: 12,
        padding: 14,
        background: 'var(--deal-surface)',
        color: disabled ? '#333' : 'var(--deal-text-1)',
        fontSize: 14,
        lineHeight: 1.6,
        border: `1px solid ${focus ? 'var(--deal-signal)' : 'var(--deal-border)'}`,
        outline: 'none',
        transition: 'border-color 0.15s',
        resize: 'none',
        ...style,
      }}
    />
  );
}
