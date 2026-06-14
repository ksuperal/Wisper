'use client';

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function BottomSheet({ open, onClose, children }: BottomSheetProps) {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 40,
        background: 'rgba(0,0,0,0.7)',
        display: 'flex',
        alignItems: 'flex-end',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          background: 'var(--deal-surface)',
          borderTop: '1px solid var(--deal-border)',
          borderRadius: '24px 24px 0 0',
          padding: '12px 20px 28px',
        }}
      >
        <div
          style={{
            width: 32,
            height: 4,
            borderRadius: 999,
            background: 'var(--deal-border)',
            margin: '0 auto 16px',
          }}
        />
        {children}
      </div>
    </div>
  );
}
