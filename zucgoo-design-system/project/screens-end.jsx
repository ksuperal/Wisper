// screens-end.jsx — session end, debrief, win card
const { useState: useEnd, useEffect: useEndE, useRef: useEndR } = React;

// count-up hook. Base value = target so a frozen rAF timeline still shows the
// real number; when rAF runs, the first tick starts the climb from 0.
function useCountUp(target, dur = 700, run = true, decimals = 0) {
  const [v, setV] = useEnd(target);
  useEndE(() => {
    if (!run) return;
    let raf, start;
    const tick = t => {
      if (!start) start = t;
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run]);
  return decimals ? v.toFixed(decimals) : Math.round(v);
}

// ── 8. Session end ──────────────────────────────────────────
function SessionEndScreen({ onClose, onDebrief, presetOutcome }) {
  const [outcome, setOutcome] = useEnd(presetOutcome || 'won');
  const [agreed, setAgreed] = useEnd('$93,000 base + $5K signing bonus');
  const [feeling, setFeeling] = useEnd('In control');
  const outcomes = [
    { id: 'won', label: 'Won the deal', c: 'var(--deal-signal)' },
    { id: 'ongoing', label: 'Still ongoing', c: 'var(--deal-warn)' },
    { id: 'walked', label: 'I walked away', c: 'var(--deal-text-2)' },
    { id: 'theywalked', label: 'They walked away', c: 'var(--deal-danger)' },
  ];
  const feelings = ['Confident', 'Nervous', 'In control', 'Pressured', 'Neutral'];

  return (
    <Screen>
      <TopBar title="" onBack={onClose} close />
      <div className="deal-scroll" style={{ flex: 1, overflowY: 'auto', padding: '0 20px' }}>
        <div style={{ fontSize: 22, fontWeight: 500, letterSpacing: '-0.02em' }}>How did it go?</div>
        <div style={{ fontSize: 14, color: 'var(--deal-text-3)', marginTop: 6, marginBottom: 22 }}>Tell us the outcome so we can debrief you.</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 22 }}>
          {outcomes.map(o => {
            const on = outcome === o.id;
            return (
              <button key={o.id} onClick={() => setOutcome(o.id)} className="press" style={{
                height: 70, borderRadius: 12, background: 'var(--deal-surface)',
                border: `1px solid ${on ? o.c : 'var(--deal-border)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 500, color: on ? '#fff' : 'var(--deal-text-2)',
                transition: 'border-color 0.15s', position: 'relative',
              }}>
                {on && <span style={{ position: 'absolute', top: 10, right: 10, width: 7, height: 7, borderRadius: '50%', background: o.c }} />}
                {o.label}
              </button>
            );
          })}
        </div>

        <Field label="WHAT WAS AGREED?">
          <TextArea value={agreed} onChange={setAgreed} minHeight={64} placeholder="$93,000 salary + $5K signing bonus" />
        </Field>

        <div className="caption" style={{ marginBottom: 10 }}>HOW DID YOU FEEL?</div>
        <div className="deal-scroll" style={{ display: 'flex', gap: 8, overflowX: 'auto', margin: '0 -20px', padding: '0 20px' }}>
          {feelings.map(f => (
            <Pill key={f} selected={feeling === f} onClick={() => setFeeling(f)}>{f}</Pill>
          ))}
        </div>
        <SafeBottom h={16} />
      </div>

      <div style={{ padding: '12px 20px', borderTop: '1px solid var(--deal-raised)', flexShrink: 0 }}>
        <PrimaryButton onClick={() => onDebrief(outcome)}>Get my debrief <Icon name="arrowRight" size={18} color="var(--deal-signal-ink)" /></PrimaryButton>
      </div>
      <SafeBottom h={16} />
    </Screen>
  );
}

// ── 9. Debrief ──────────────────────────────────────────────
function DebriefScreen({ onClose, onShare, outcome = 'won' }) {
  const won = outcome === 'won';
  const gain = useCountUp(11000, 800, true);
  const score = useCountUp(7.8, 900, true, 1);
  const [barW, setBarW] = useEnd(0);
  useEndE(() => { const t = setTimeout(() => setBarW(78), 200); return () => clearTimeout(t); }, []);

  return (
    <Screen>
      <TopBar title="Session debrief" onBack={onClose} right={
        <button className="press" style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="share" size={20} color="var(--deal-text-2)" /></button>
      } />

      <div className="deal-scroll" style={{ flex: 1, overflowY: 'auto', padding: '4px 20px 0' }}>
        {/* result header */}
        <Card variant="signal" style={{ borderLeft: '1px solid var(--deal-signal-dim)', marginBottom: 18 }}>
          <div style={{ fontSize: 11, color: 'var(--deal-text-3)' }}>Salary · TechCorp · June 13</div>
          <div style={{ fontSize: 13, color: 'var(--deal-text-2)', margin: '6px 0 10px' }}>$82K → $93K + $5K signing</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <div className="" style={{ fontSize: 36, fontWeight: 600, color: 'var(--deal-signal)', letterSpacing: '-0.03em' }}>+${gain.toLocaleString()}</div>
            <span style={{ display: 'inline-flex', alignItems: 'center', height: 22, padding: '0 9px', borderRadius: 999, background: 'var(--deal-signal-bg)', border: '1px solid var(--deal-signal-dim)', color: 'var(--deal-signal)', fontSize: 11, fontWeight: 500 }}>Above target</span>
          </div>
        </Card>

        {/* score */}
        <Card style={{ marginBottom: 22 }}>
          <div className="caption" style={{ marginBottom: 8 }}>NEGOTIATION SCORE</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 12, whiteSpace: 'nowrap' }}>
            <span style={{ fontSize: 40, fontWeight: 600, letterSpacing: '-0.02em' }}>{score}</span>
            <span style={{ fontSize: 20, color: 'var(--deal-text-3)' }}>/ 10</span>
          </div>
          <div style={{ height: 6, borderRadius: 999, background: 'var(--deal-raised)', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${barW}%`, background: 'var(--deal-signal)', borderRadius: 999, transition: 'width 0.8s var(--ease)' }} />
          </div>
        </Card>

        {/* what worked */}
        <SectionLabel dot="var(--deal-signal)" style={{ marginBottom: 12 }}>WHAT WORKED</SectionLabel>
        <ListBlock color="var(--deal-signal)" icon="check" items={[
          'Your anchor at $103–108K reset their entire range upward.',
          'Mirroring "$88,000" made them volunteer flexibility.',
          'Bridging to a signing bonus unlocked a new budget line.',
        ]} />

        {/* improve */}
        <SectionLabel dot="var(--deal-warn)" color="var(--deal-warn)" style={{ margin: '24px 0 12px' }}>DO BETTER NEXT TIME</SectionLabel>
        <ListBlock color="var(--deal-warn)" arrow items={[
          'You revealed your floor a touch early — hold it longer.',
          'Could have pushed the 6-month review to 3 months.',
          'Ask for the offer in writing before saying yes.',
        ]} />

        {/* their tactics */}
        <SectionLabel style={{ margin: '24px 0 12px' }}>THEY USED ON YOU</SectionLabel>
        <div className="deal-scroll" style={{ display: 'flex', gap: 8, overflowX: 'auto', margin: '0 -20px 8px', padding: '0 20px' }}>
          {['False ceiling', 'Social proof', 'Time pressure'].map(t => (
            <span key={t} style={{ flexShrink: 0, height: 32, display: 'inline-flex', alignItems: 'center', padding: '0 14px', borderRadius: 999, background: 'var(--deal-raised)', border: '1px solid var(--deal-border)', color: 'var(--deal-text-2)', fontSize: 13 }}>{t}</span>
          ))}
        </div>
        <SafeBottom h={16} />
      </div>

      {won && (
        <div style={{ padding: '12px 20px', borderTop: '1px solid var(--deal-raised)', flexShrink: 0 }}>
          <button onClick={onShare} className="press" style={{ width: '100%', height: 52, borderRadius: 12, background: 'var(--deal-danger)', color: '#fff', fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <Icon name="share" size={18} color="#fff" /> Share my win
          </button>
        </div>
      )}
      <SafeBottom h={16} />
    </Screen>
  );
}

function ListBlock({ items, color, icon, arrow }) {
  return (
    <div>
      {items.map((t, i) => (
        <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '10px 0', borderBottom: i < items.length - 1 ? '1px solid var(--deal-raised)' : 'none' }}>
          {arrow ? <span style={{ color, fontWeight: 700, fontSize: 14, lineHeight: 1.5 }}>→</span> : <Icon name={icon} size={16} color={color} strokeWidth={2.4} />}
          <span style={{ fontSize: 13, color: 'var(--deal-text-2)', lineHeight: 1.6 }}>{t}</span>
        </div>
      ))}
    </div>
  );
}

// ── 10. Win card (share) ────────────────────────────────────
function WinCardScreen({ onClose }) {
  const gain = useCountUp(11000, 900, true);
  return (
    <Reveal dur={300} style={{ height: '100%', background: '#001A12', display: 'flex', flexDirection: 'column', paddingTop: STATUS_H }}>
      <div style={{ padding: '8px 20px', display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={onClose} className="press" style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="x" size={22} color="var(--deal-signal-dim)" /></button>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* the card */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 32px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 9, marginBottom: 8 }}>
            <DiamondMark size={30} />
            <span style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--deal-signal)' }}>Deal</span>
          </div>
          <div style={{ height: 1, background: 'var(--deal-signal-dim)', margin: '24px 0' }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 13, color: 'var(--deal-text-3)' }}>I just negotiated</div>
            <div style={{ fontSize: 52, fontWeight: 600, color: 'var(--deal-signal)', letterSpacing: '-0.04em', margin: '8px 0 4px' }}>+${gain.toLocaleString()}</div>
            <div style={{ fontSize: 14, color: '#888' }}>more in salary</div>
          </div>
          <div style={{ height: 1, background: 'var(--deal-signal-dim)', margin: '24px 0' }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 13, color: 'var(--deal-text-3)' }}>$82,000 → $93,000</div>
            <div style={{ fontSize: 12, color: '#444', marginTop: 4 }}>TechCorp · June 2026</div>
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <span style={{ fontSize: 12, color: 'var(--deal-signal-dim)' }}>getdeal.app</span>
          </div>
        </div>

        {/* share buttons */}
        <div style={{ padding: '0 20px 16px', display: 'flex', gap: 10, justifyContent: 'center' }}>
          {['Copy', 'Instagram', 'X', 'WhatsApp'].map(s => (
            <button key={s} className="press" style={{ flex: 1, height: 48, borderRadius: 12, background: '#00271A', border: '1px solid var(--deal-signal-dim)', color: 'var(--deal-signal)', fontSize: 12, fontWeight: 500 }}>{s}</button>
          ))}
        </div>
      </div>
      <SafeBottom h={18} />
    </Reveal>
  );
}

Object.assign(window, { useCountUp, SessionEndScreen, DebriefScreen, ListBlock, WinCardScreen });
