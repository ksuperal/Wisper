'use client';

interface ScreenProps {
  children: React.ReactNode;
}

export function Screen({ children }: ScreenProps) {
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {children}
    </div>
  );
}

export function SafeBottom({ h = 24 }: { h?: number }) {
  return <div style={{ height: h, flexShrink: 0 }} />;
}
