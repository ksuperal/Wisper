// chrome.jsx — shared app chrome + demo data
const { useState: useStateC } = React;

// Status bar occupies ~ top 60px of the device; screens start below it.
const STATUS_H = 60;

// ── Top bar (back + title + optional right) ─────────────────
function TopBar({ title, onBack, backLabel = 'chevron', right, close }) {
  return (
    <div style={{
      height: 56, display: 'flex', alignItems: 'center', padding: '0 12px',
      position: 'relative', flexShrink: 0,
    }}>
      <div style={{ width: 64, display: 'flex', justifyContent: 'flex-start' }}>
        {onBack && (
          <button className="press" onClick={onBack} style={{
            display: 'flex', alignItems: 'center', gap: 2, height: 44, padding: '0 6px',
            color: close ? 'var(--deal-text-2)' : 'var(--deal-text-2)', fontSize: 15,
          }}>
            {close ? <Icon name="x" size={20} color="var(--deal-text-2)" />
                   : <Icon name="chevronLeft" size={20} color="var(--deal-text-2)" />}
            {close && <span style={{ marginLeft: 2 }}>Close</span>}
          </button>
        )}
      </div>
      <div style={{
        flex: 1, textAlign: 'center', fontSize: 15, fontWeight: 500, color: 'var(--deal-text-1)',
      }}>{title}</div>
      <div style={{ width: 64, display: 'flex', justifyContent: 'flex-end' }}>{right}</div>
    </div>
  );
}

// ── Live session top bar ────────────────────────────────────
function LiveTopBar({ title, move }) {
  return (
    <div style={{
      height: 52, display: 'flex', alignItems: 'center', padding: '0 20px',
      borderBottom: '1px solid var(--deal-raised)', flexShrink: 0,
    }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 7 }}>
        <LiveDot />
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.05em', color: 'var(--deal-danger)' }}>LIVE</span>
      </div>
      <div style={{ fontSize: 12, color: 'var(--deal-text-3)' }}>{title}</div>
      <div style={{ flex: 1, textAlign: 'right', fontSize: 11, color: 'var(--deal-text-4)' }}>Move {move}</div>
    </div>
  );
}

// ── Bottom tab bar ──────────────────────────────────────────
function TabBar({ active, onChange }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'sessions', label: 'Sessions', icon: 'sessions' },
    { id: 'stats', label: 'Stats', icon: 'stats' },
    { id: 'profile', label: 'Profile', icon: 'profile' },
  ];
  return (
    <div style={{
      height: 64, display: 'flex', borderTop: '1px solid var(--deal-raised)',
      background: 'var(--deal-ink)', flexShrink: 0, paddingBottom: 0,
    }}>
      {tabs.map(t => {
        const on = active === t.id;
        return (
          <button key={t.id} className="press" onClick={() => onChange?.(t.id)} style={{
            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', gap: 4, position: 'relative', paddingTop: 6,
          }}>
            {on && <span style={{ position: 'absolute', top: 0, width: 22, height: 2, borderRadius: 2, background: 'var(--deal-signal)' }} />}
            <Icon name={t.icon} size={23} color={on ? 'var(--deal-signal)' : '#444'} strokeWidth={2} />
            <span style={{ fontSize: 11, color: on ? 'var(--deal-signal)' : '#444', fontWeight: on ? 500 : 400 }}>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ── Bottom sheet ────────────────────────────────────────────
function BottomSheet({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{
      position: 'absolute', inset: 0, zIndex: 40,
      background: 'rgba(0,0,0,0.7)', animation: 'deal-fade 0.2s ease both',
      display: 'flex', alignItems: 'flex-end',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: '100%', background: 'var(--deal-surface)', borderTop: '1px solid var(--deal-border)',
        borderRadius: '24px 24px 0 0', padding: '12px 20px 28px',
        animation: 'deal-sheet-up 0.3s var(--ease) both',
      }}>
        <div style={{ width: 32, height: 4, borderRadius: 999, background: 'var(--deal-border)', margin: '0 auto 16px' }} />
        {children}
      </div>
    </div>
  );
}

// ── Section label ───────────────────────────────────────────
function SectionLabel({ children, color = 'var(--deal-text-3)', dot, style = {} }) {
  return (
    <div className="caption" style={{ display: 'flex', alignItems: 'center', gap: 7, color, ...style }}>
      {dot && <span style={{ width: 7, height: 7, borderRadius: '50%', background: dot }} />}
      {children}
    </div>
  );
}

// ── Step indicator ──────────────────────────────────────────
function StepDots({ step, total = 2 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        {Array.from({ length: total }).map((_, i) => (
          <React.Fragment key={i}>
            <span style={{
              width: 8, height: 8, borderRadius: '50%',
              background: i + 1 <= step ? 'var(--deal-signal)' : 'var(--deal-border)',
              transition: 'background 0.3s',
            }} />
            {i < total - 1 && <span style={{ width: 28, height: 2, background: i + 1 < step ? 'var(--deal-signal-dim)' : 'var(--deal-border)' }} />}
          </React.Fragment>
        ))}
      </div>
      <div style={{ fontSize: 11, color: 'var(--deal-text-3)' }}>Step {step} of {total}</div>
    </div>
  );
}

// ── Demo data ───────────────────────────────────────────────
const DEMO = {
  user: { name: 'Alex Rivera', initials: 'AR' },
  stats: { sessions: 7, won: '$23K' },
  sessions: [
    { id: 's1', cat: 'salary', title: 'Salary · TechCorp', date: 'June 13', moves: 4, status: 'ongoing', amount: null },
    { id: 's2', cat: 'rent', title: 'Rent renewal', date: 'May 28', moves: 6, status: 'won', amount: '−$2.4K/yr' },
    { id: 's3', cat: 'vendor', title: 'SaaS contract · Figma', date: 'May 12', moves: 5, status: 'won', amount: '−$8K' },
    { id: 's4', cat: 'salary', title: 'Raise · current role', date: 'Apr 30', moves: 3, status: 'lost', amount: null },
  ],
  // live session scripted moves
  moves: [
    {
      n: 1, type: 'anchor',
      say: 'Based on my research and the market data for this role, I was expecting to be in the $103–108K range.',
      why: 'Sets a high, defensible reference point before they name a number.',
      watch: 'If they flinch or go quiet — your anchor landed. Hold it.',
      they: 'Whoa. Our band for this role tops out around $88,000.',
    },
    {
      n: 2, type: 'mirror',
      say: '"Tops out around $88,000"?',
      why: 'Repeating their ceiling invites them to justify — and often soften — it.',
      watch: 'Silence after the mirror means they\'re reconsidering. Don\'t fill it.',
      they: 'Well, $88K is the standard band, but there might be some flexibility.',
    },
    {
      n: 3, type: 'bridge',
      say: 'I appreciate you going to bat for me. If base salary has a ceiling, can we look at a signing bonus or an earlier review at 6 months?',
      why: 'Gives them a face-saving yes on a different budget line.',
      watch: 'If they say "let me check" — they\'re not at their ceiling.',
      they: 'Let me see what I can do on a signing bonus. Maybe $5K.',
    },
    {
      n: 4, type: 'close',
      say: 'That works. $93K base with the $5K signing bonus and a 6-month review — can we put that in writing today?',
      why: 'Locks the gains and adds the review while goodwill is high.',
      watch: 'Push for "in writing today" — verbal offers drift.',
      they: 'Done. I\'ll send the revised offer this afternoon.',
    },
  ],
};

const CATS = [
  { id: 'salary', label: 'Salary' },
  { id: 'rent', label: 'Rent' },
  { id: 'contract', label: 'Contract' },
  { id: 'medical', label: 'Medical' },
  { id: 'vendor', label: 'Vendor' },
  { id: 'other', label: 'Other' },
];

Object.assign(window, {
  STATUS_H, TopBar, LiveTopBar, TabBar, BottomSheet, SectionLabel, StepDots, DEMO, CATS,
});
