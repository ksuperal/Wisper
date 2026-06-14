// components.jsx — Deal base component library
const { useState, useEffect, useRef } = React;

const MOVE = {
  anchor:   { label: 'ANCHOR',    bg: '#1E3A5F', text: '#60A5FA', dot: '#3B82F6' },
  mirror:   { label: 'MIRROR',    bg: '#2E1A5E', text: '#A78BFA', dot: '#8B5CF6' },
  bridge:   { label: 'BRIDGE',    bg: '#0F3540', text: '#67E8F9', dot: '#06B6D4' },
  question: { label: 'QUESTION',  bg: '#3A2800', text: '#FCD34D', dot: '#F5A623' },
  silence:  { label: 'SILENCE',   bg: '#1F2020', text: '#9CA3AF', dot: '#6B7280' },
  walkaway: { label: 'WALK AWAY', bg: '#2A0A0A', text: '#FCA5A5', dot: '#FF4D4D' },
  close:    { label: 'CLOSE',     bg: '#052E16', text: '#6EE7B7', dot: '#10B981' },
  takeit:   { label: 'TAKE IT',   bg: '#001F14', text: '#00E5A0', dot: '#00E5A0' },
};

// ── Move badge ──────────────────────────────────────────────
function MoveBadge({ type = 'anchor', compact = false }) {
  const m = MOVE[type] || MOVE.anchor;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      height: compact ? 22 : 26, padding: compact ? '0 8px' : '0 10px',
      borderRadius: 6, background: m.bg, color: m.text,
      fontSize: 11, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase',
      whiteSpace: 'nowrap',
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: m.dot, flexShrink: 0 }} />
      {m.label}
    </span>
  );
}

// ── Buttons ─────────────────────────────────────────────────
function PrimaryButton({ children, onClick, disabled, loading, style = {} }) {
  return (
    <button className="press" onClick={disabled ? undefined : onClick} disabled={disabled} style={{
      width: '100%', height: 52, borderRadius: 12, padding: '0 24px',
      background: disabled ? 'var(--deal-raised)' : 'var(--deal-signal)',
      color: disabled ? '#444' : 'var(--deal-signal-ink)',
      fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9,
      transition: 'transform 0.09s var(--ease), background 0.15s', ...style,
    }}>
      {loading && <Spinner color="#444" />}
      {children}
    </button>
  );
}
function GhostButton({ children, onClick, style = {} }) {
  return (
    <button className="press" onClick={onClick} style={{
      width: '100%', height: 52, borderRadius: 12,
      background: 'transparent', border: '1px solid var(--deal-border)',
      color: 'var(--deal-text-2)', fontSize: 15, fontWeight: 400,
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, ...style,
    }}>{children}</button>
  );
}
function Spinner({ color = 'currentColor', size = 16 }) {
  return (
    <span style={{
      width: size, height: size, borderRadius: '50%',
      border: `2px solid ${color}40`, borderTopColor: color,
      display: 'inline-block', animation: 'deal-spin 0.7s linear infinite',
    }} />
  );
}

// ── Cards ───────────────────────────────────────────────────
function Card({ children, variant = 'standard', style = {}, ...rest }) {
  const base = {
    standard: { background: 'var(--deal-surface)', border: '1px solid var(--deal-border)', borderRadius: 12, padding: 16 },
    raised:   { background: 'var(--deal-raised)',  border: '1px solid var(--deal-border)', borderRadius: 12, padding: 16 },
    signal:   { background: 'var(--deal-signal-bg)', border: '1px solid var(--deal-signal-dim)', borderRadius: 14, padding: 16, borderLeft: '4px solid var(--deal-signal)' },
    danger:   { background: 'var(--deal-danger-bg)', border: '1px solid var(--deal-danger)', borderRadius: 12, padding: 14 },
  }[variant];
  return <div style={{ ...base, ...style }} {...rest}>{children}</div>;
}

function StatCard({ value, label }) {
  return (
    <div style={{
      flex: 1, background: 'var(--deal-surface)', border: '1px solid var(--deal-border)',
      borderRadius: 10, padding: 14,
    }}>
      <div style={{ fontSize: 24, fontWeight: 600, color: 'var(--deal-signal)', letterSpacing: '-0.02em' }}>{value}</div>
      <div className="caption" style={{ marginTop: 2, color: 'var(--deal-text-3)' }}>{label}</div>
    </div>
  );
}

// ── Live dot + thinking ─────────────────────────────────────
function LiveDot({ size = 7, color = 'var(--deal-danger)' }) {
  return (
    <span style={{ position: 'relative', width: size, height: size, display: 'inline-block' }}>
      <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: color,
        animation: 'deal-live-pulse 1.2s var(--ease) infinite' }} />
      <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: color }} />
    </span>
  );
}

function ThinkingDots({ label = 'Analyzing their position...' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <div style={{ display: 'flex', gap: 7 }}>
        {[0, 1, 2].map(i => (
          <span key={i} style={{
            width: 8, height: 8, borderRadius: '50%', background: 'var(--deal-signal)',
            animation: 'deal-think 1.2s ease-in-out infinite', animationDelay: `${i * 0.15}s`,
          }} />
        ))}
      </div>
      <div style={{ fontSize: 12, color: 'var(--deal-text-3)' }}>{label}</div>
    </div>
  );
}

// ── Status pill ─────────────────────────────────────────────
function StatusPill({ status }) {
  const map = {
    won:     { bg: 'var(--deal-signal-bg)', text: 'var(--deal-signal)', bd: 'var(--deal-signal-dim)', label: 'Won' },
    lost:    { bg: 'var(--deal-danger-bg)', text: '#FCA5A5', bd: '#FF4D4D40', label: 'Lost' },
    ongoing: { bg: 'var(--deal-raised)', text: 'var(--deal-text-2)', bd: 'var(--deal-border)', label: 'Ongoing' },
  };
  const s = map[status] || map.ongoing;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 10px',
      borderRadius: 999, background: s.bg, color: s.text, border: `1px solid ${s.bd}`,
      fontSize: 11, fontWeight: 500,
    }}>{s.label}</span>
  );
}

// ── Pills (category / style) ────────────────────────────────
function Pill({ children, selected, onClick, style = {} }) {
  return (
    <button className="press" onClick={onClick} style={{
      height: 34, padding: '0 14px', borderRadius: 999, flexShrink: 0,
      fontSize: 13, fontWeight: selected ? 600 : 500,
      background: selected ? 'var(--deal-signal)' : 'var(--deal-raised)',
      color: selected ? 'var(--deal-signal-ink)' : 'var(--deal-text-3)',
      border: selected ? '1px solid var(--deal-signal)' : '1px solid var(--deal-border)',
      transition: 'all 0.15s var(--ease)', ...style,
    }}>{children}</button>
  );
}

// ── Field (label + input/textarea) ──────────────────────────
function Field({ label, helper, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      {label && <div className="caption" style={{ marginBottom: 8 }}>{label}</div>}
      {children}
      {helper && <div style={{ fontSize: 11, color: 'var(--deal-text-3)', marginTop: 6, lineHeight: 1.5 }}>{helper}</div>}
    </div>
  );
}

function TextInput({ value, onChange, placeholder, inputMode, style = {} }) {
  const [focus, setFocus] = useState(false);
  return (
    <input value={value} onChange={e => onChange?.(e.target.value)} placeholder={placeholder}
      inputMode={inputMode}
      onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} style={{
      width: '100%', height: 48, borderRadius: 10, padding: '0 14px',
      background: 'var(--deal-surface)', color: 'var(--deal-text-1)', fontSize: 14,
      border: `1px solid ${focus ? 'var(--deal-signal)' : 'var(--deal-border)'}`,
      outline: 'none', transition: 'border-color 0.15s', ...style,
    }} />
  );
}

function TextArea({ value, onChange, placeholder, minHeight = 80, disabled, style = {} }) {
  const [focus, setFocus] = useState(false);
  return (
    <textarea value={value} onChange={e => onChange?.(e.target.value)} placeholder={placeholder}
      disabled={disabled}
      onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} style={{
      width: '100%', minHeight, borderRadius: 12, padding: 14,
      background: 'var(--deal-surface)', color: disabled ? '#333' : 'var(--deal-text-1)',
      fontSize: 14, lineHeight: 1.6,
      border: `1px solid ${focus ? 'var(--deal-signal)' : 'var(--deal-border)'}`,
      outline: 'none', transition: 'border-color 0.15s', ...style,
    }} />
  );
}

// ── Icon (Lucide-style inline svgs, stroked) ────────────────
function Icon({ name, size = 20, color = 'currentColor', strokeWidth = 2 }) {
  const paths = {
    chevronLeft: <polyline points="15 18 9 12 15 6" />,
    chevronRight: <polyline points="9 18 15 12 9 6" />,
    arrowRight: <><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></>,
    x: <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>,
    mic: <><path d="M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" /><path d="M19 10v1a7 7 0 0 1-14 0v-1" /><line x1="12" y1="18" x2="12" y2="22" /></>,
    home: <><path d="M3 10l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z" /></>,
    sessions: <><rect x="3" y="4" width="18" height="16" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="8" y1="14" x2="16" y2="14" /></>,
    stats: <><line x1="6" y1="20" x2="6" y2="12" /><line x1="12" y1="20" x2="12" y2="6" /><line x1="18" y1="20" x2="18" y2="14" /></>,
    profile: <><circle cx="12" cy="8" r="4" /><path d="M4 21v-1a6 6 0 0 1 12 0v1" transform="translate(2 0)" /></>,
    share: <><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.6" y1="13.5" x2="15.4" y2="17.5" /><line x1="15.4" y1="6.5" x2="8.6" y2="10.5" /></>,
    handshake: <><path d="M11 17l2 2a1 1 0 0 0 1.4 0l3-3" /><path d="M2 12l3-3 5 5" /><path d="M14 8l-2.5 2.5a1.4 1.4 0 0 1-2-2L13 4l4 4 5-1" /></>,
    check: <polyline points="20 6 9 17 4 12" />,
    refresh: <><polyline points="23 4 23 10 17 10" /><path d="M20.5 15a9 9 0 1 1-2.1-9.4L23 10" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 15 14" /></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
      strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
}

// ── Diamond logo mark ───────────────────────────────────────
function DiamondMark({ size = 48, color = 'var(--deal-signal)' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M24 3 L43 24 L24 45 L5 24 Z" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M24 3 L33 24 L24 45 L15 24 Z" stroke={color} strokeWidth="2.5" strokeLinejoin="round" opacity="0.55" />
      <path d="M5 24 L43 24" stroke={color} strokeWidth="2.5" opacity="0.55" />
    </svg>
  );
}

// ── Reveal: transition-based entrance (degrades to visible if timeline frozen) ──
function Reveal({ children, y = 8, dur = 300, className = '', style = {}, ...rest }) {
  const [inn, setInn] = useState(false);
  useEffect(() => { setInn(true); }, []);
  return (
    <div className={className} style={{
      opacity: inn ? 1 : 0,
      transform: inn ? 'none' : `translateY(${y}px)`,
      transition: `opacity ${dur}ms var(--ease), transform ${dur}ms var(--ease)`,
      ...style,
    }} {...rest}>{children}</div>
  );
}

Object.assign(window, {
  MOVE, MoveBadge, PrimaryButton, GhostButton, Spinner, Card, StatCard,
  LiveDot, ThinkingDots, StatusPill, Pill, Field, TextInput, TextArea, Icon, DiamondMark, Reveal,
});
