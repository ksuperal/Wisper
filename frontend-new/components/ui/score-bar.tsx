'use client';

import { useEffect, useState } from 'react';

interface ScoreBarProps {
  score: number;
  max?: number;
  animate?: boolean;
}

export function ScoreBar({ score, max = 10, animate = true }: ScoreBarProps) {
  const [width, setWidth] = useState(0);
  const percentage = (score / max) * 100;

  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => setWidth(percentage), 200);
      return () => clearTimeout(timer);
    } else {
      setWidth(percentage);
    }
  }, [percentage, animate]);

  return (
    <div
      style={{
        height: 6,
        borderRadius: 999,
        background: 'var(--deal-raised)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${width}%`,
          background: 'var(--deal-signal)',
          borderRadius: 999,
          transition: 'width 0.8s var(--ease)',
        }}
      />
    </div>
  );
}
