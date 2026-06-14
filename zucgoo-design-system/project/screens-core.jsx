// screens-core.jsx — splash, dashboard, setup, strategy brief
const { useState: useS, useEffect: useE, useRef: useR } = React;

// Generic screen shell: clears the status bar, fills height, vertical flex.
function Screen({ children, pad = true }) {
  return (
    <Reveal y={14} dur={320} style={{
      height: '100%', display: 'flex', flexDirection: 'column',
      paddingTop: STATUS_H,
    }}>{children}</Reveal>
  );
}
const SafeBottom = ({ h = 24 }) => <div style={{ height: h, flexShrink: 0 }} />;

// ── 1. Splash / onboarding ──────────────────────────────────
function SplashScreen({ onStart }) {
  const [slide, setSlide] = useS(0);
  const slides = [
    { eyebrow: 'CO-PILOT', title: 'Your negotiation co-pilot', body: 'A Harvard-trained negotiator in your pocket. Calm, tactical, always on your side.', art: 'phone' },
    { eyebrow: 'INPUT', title: 'Tell Deal what happened', body: 'Type or whisper what they just said. That\'s all it needs.', art: 'input' },
    { eyebrow: 'OUTPUT', title: 'Get your exact next move', body: 'One tactic. One line to say. One reason why. In under two seconds.', art: 'move' },
  ];
  const s = slides[slide];

  const Art = ({ kind }) => {
    if (kind === 'phone') return (
      <div style={{ width: 150, height: 200, borderRadius: 22, border: '1px solid var(--deal-border)', background: 'var(--deal-surface)', padding: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><LiveDot size={6} /><span style={{ fontSize: 9, color: 'var(--deal-danger)', fontWeight: 600 }}>LIVE</span></div>
        <Card variant="signal" style={{ padding: 12, flex: 1 }}>
          <MoveBadge type="anchor" compact />
          <div style={{ height: 6 }} />
          <div style={{ height: 7, borderRadius: 3, background: '#ffffff22', marginBottom: 5 }} />
          <div style={{ height: 7, borderRadius: 3, background: '#ffffff22', width: '80%', marginBottom: 5 }} />
          <div style={{ height: 7, borderRadius: 3, background: '#ffffff14', width: '60%' }} />
        </Card>
      </div>
    );
    if (kind === 'input') return (
      <div style={{ width: 190 }}>
        <div className="caption" style={{ marginBottom: 8 }}>WHAT DID THEY SAY?</div>
        <div style={{ borderRadius: 12, border: '1px solid var(--deal-signal)', background: 'var(--deal-surface)', padding: 14, fontSize: 13, color: 'var(--deal-text-2)', lineHeight: 1.5 }}>
          "$88,000 really is our absolute ceiling."<span style={{ borderLeft: '2px solid var(--deal-signal)', marginLeft: 2, animation: 'deal-live-pulse 1.2s infinite' }} />
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
          <div style={{ width: 44, height: 44, borderRadius: 999, border: '1px solid var(--deal-border)', background: 'var(--deal-raised)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="mic" size={18} color="var(--deal-text-2)" /></div>
          <div style={{ flex: 1, height: 44, borderRadius: 12, background: 'var(--deal-signal)' }} />
        </div>
      </div>
    );
    return (
      <Card variant="signal" style={{ width: 200 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <MoveBadge type="anchor" /><span style={{ fontSize: 11, color: 'var(--deal-text-4)' }}>Move 1</span>
        </div>
        <div className="caption" style={{ color: 'var(--deal-signal)', margin: '12px 0 6px' }}>SAY THIS:</div>
        <div style={{ fontSize: 13, lineHeight: 1.6, color: '#fff' }}>"I was expecting to be in the $103–108K range."</div>
      </Card>
    );
  };

  return (
    <Screen>
      <div style={{ padding: '8px 20px 0', display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <DiamondMark size={40} />
          <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: '-0.03em' }}>Deal</div>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 28px', textAlign: 'center', gap: 28 }}>
        <div style={{ height: 210, display: 'flex', alignItems: 'center' }} key={slide} className="anim-fade"><Art kind={s.art} /></div>
        <div>
          <div className="caption" style={{ color: 'var(--deal-signal)', marginBottom: 12 }}>{s.eyebrow}</div>
          <div style={{ fontSize: 24, fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 12 }}>{s.title}</div>
          <div style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--deal-text-2)', maxWidth: 300, margin: '0 auto' }}>{s.body}</div>
        </div>
      </div>

      <div style={{ padding: '0 20px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {slides.map((_, i) => (
            <button key={i} onClick={() => setSlide(i)} style={{ width: i === slide ? 18 : 6, height: 6, borderRadius: 999, background: i === slide ? 'var(--deal-signal)' : 'var(--deal-border)', transition: 'all 0.3s var(--ease)' }} />
          ))}
        </div>
        <div style={{ width: '100%' }}>
          <button onClick={onStart} style={{ background: 'none', color: 'var(--deal-text-3)', fontSize: 13, width: '100%', textAlign: 'center', marginBottom: 14, height: 24 }}>Sign in</button>
          <PrimaryButton onClick={() => slide < 2 ? setSlide(slide + 1) : onStart()}>
            {slide < 2 ? 'Next' : 'Get started'} <Icon name="arrowRight" size={18} color="var(--deal-signal-ink)" />
          </PrimaryButton>
        </div>
      </div>
      <SafeBottom />
    </Screen>
  );
}

// ── 2. Dashboard ────────────────────────────────────────────
function DashboardScreen({ onStart, onOpenSession, tab, onTab }) {
  return (
    <Screen>
      {/* top bar */}
      <div style={{ height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: 11, color: 'var(--deal-text-3)' }}>Good morning</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <DiamondMark size={18} /><span style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.02em' }}>Deal</span>
          </div>
        </div>
        <div style={{ width: 34, height: 34, borderRadius: 999, background: 'var(--deal-raised)', border: '1px solid var(--deal-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, color: 'var(--deal-text-2)' }}>{DEMO.user.initials}</div>
      </div>

      <div className="deal-scroll" style={{ flex: 1, overflowY: 'auto', padding: '4px 20px 0' }}>
        {/* hero cta */}
        <button onClick={onStart} className="press" style={{
          width: '100%', textAlign: 'left', background: 'var(--deal-signal)', borderRadius: 16,
          padding: 20, marginBottom: 16, position: 'relative', overflow: 'hidden',
        }}>
          <div className="caption" style={{ color: 'var(--deal-signal-dim)', fontWeight: 600 }}>START NEGOTIATION</div>
          <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--deal-signal-ink)', marginTop: 8, maxWidth: 220, letterSpacing: '-0.01em' }}>What are you negotiating?</div>
          <div style={{ position: 'absolute', right: 18, bottom: 18 }}><Icon name="arrowRight" size={22} color="var(--deal-signal-dim)" strokeWidth={2.4} /></div>
        </button>

        {/* stats */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
          <StatCard value={DEMO.stats.sessions} label="Sessions" />
          <StatCard value={DEMO.stats.won} label="Total won" />
        </div>

        {/* recent */}
        <SectionLabel color="#444" style={{ margin: '20px 0 10px' }}>Recent sessions</SectionLabel>
        <div style={{ background: 'var(--deal-surface)', border: '1px solid var(--deal-border)', borderRadius: 12, overflow: 'hidden' }}>
          {DEMO.sessions.map((s, i) => (
            <SessionRow key={s.id} s={s} last={i === DEMO.sessions.length - 1} onClick={() => onOpenSession(s)} />
          ))}
        </div>
        <SafeBottom h={16} />
      </div>

      <TabBar active={tab} onChange={onTab} />
      <SafeBottom h={20} />
    </Screen>
  );
}

function SessionRow({ s, last, onClick }) {
  const amtColor = s.amount && s.amount.startsWith('−') ? 'var(--deal-signal)' : 'var(--deal-signal)';
  return (
    <button onClick={onClick} className="press" style={{
      width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px',
      borderBottom: last ? 'none' : '1px solid var(--deal-raised)', textAlign: 'left',
    }}>
      <div style={{ width: 36, height: 36, borderRadius: 9, background: 'var(--deal-raised)', border: '1px solid var(--deal-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon name="handshake" size={18} color="var(--deal-signal)" />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 500, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.title}</div>
        <div style={{ fontSize: 12, color: 'var(--deal-text-3)', marginTop: 2 }}>{s.date} · {s.moves} moves</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
        <StatusPill status={s.status} />
        {s.amount && <span style={{ fontSize: 13, fontWeight: 500, color: amtColor }}>{s.amount}</span>}
      </div>
    </button>
  );
}

Object.assign(window, { Screen, SafeBottom, SplashScreen, DashboardScreen, SessionRow });
