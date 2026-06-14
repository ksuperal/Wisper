'use client';

interface FieldProps {
  label?: string;
  helper?: string;
  children: React.ReactNode;
}

export function Field({ label, helper, children }: FieldProps) {
  return (
    <div style={{ marginBottom: 16 }}>
      {label && <div className="caption" style={{ marginBottom: 8 }}>{label}</div>}
      {children}
      {helper && (
        <div style={{ fontSize: 11, color: 'var(--deal-text-3)', marginTop: 6, lineHeight: 1.5 }}>
          {helper}
        </div>
      )}
    </div>
  );
}
