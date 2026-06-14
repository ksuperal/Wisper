'use client';

import { useState } from 'react';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  inputMode?: 'text' | 'decimal' | 'numeric';
  style?: React.CSSProperties;
}

export function TextInput({
  value,
  onChange,
  placeholder,
  disabled,
  inputMode = 'text',
  style,
}: TextInputProps) {
  const [focus, setFocus] = useState(false);

  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      inputMode={inputMode}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      style={{
        width: '100%',
        height: 48,
        borderRadius: 10,
        padding: '0 14px',
        background: 'var(--deal-surface)',
        color: 'var(--deal-text-1)',
        fontSize: 14,
        border: `1px solid ${focus ? 'var(--deal-signal)' : 'var(--deal-border)'}`,
        outline: 'none',
        transition: 'border-color 0.15s',
        ...style,
      }}
    />
  );
}
