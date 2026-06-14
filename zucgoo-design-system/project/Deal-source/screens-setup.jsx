// screens-setup.jsx — setup step 1, step 2, strategy brief
const { useState: useSet, useEffect: useSetE } = React;

// ── 3. Setup step 1 ─────────────────────────────────────────
function Setup1Screen({ onBack, onNext, data, setData }) {
  const valid = data.cat && data.goal && data.offer && data.floor;
  return (
    <Screen>
      <TopBar title="New negotiation" onBack={onBack} />
      <div style={{ padding: '4px 20px 0', flexShrink: 0 }}><StepDots step={1} /></div>

      <div className="deal-scroll" style={{ flex: 1, overflowY: 'auto', padding: '24px 20px 0' }}>
        <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 18 }}>The situation</div>

        <div className="caption" style={{ marginBottom: 10 }}>NEGOTIATION TYPE</div>
        <div className="deal-scroll" style={{ display: 'flex', gap: 8, overflowX: 'auto', margin: '0 -20px 20px', padding: '0 20px' }}>
          {CATS.map(c => (
            <Pill key={c.id} selected={data.cat === c.id} onClick={() => setData({ ...data, cat: c.id })}>{c.label}</Pill>
          ))}
        </div>

        <Field label="WHAT DO YOU WANT TO ACHIEVE?">
          <TextArea value={data.goal} onChange={v => setData({ ...data, goal: v })} placeholder="Get a salary of $95,000 plus a 6-month review." minHeight={72} />
        </Field>

        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <Field label="THEIR OFFER">
              <TextInput value={data.offer} onChange={v => setData({ ...data, offer: v })} placeholder="$82,000" inputMode="decimal" />
            </Field>
          </div>
          <div style={{ flex: 1 }}>
            <Field label="WALK-AWAY">
              <TextInput value={data.floor} onChange={v => setData({ ...data, floor: v })} placeholder="$88,000" inputMode="decimal" />
            </Field>
          </div>
        </div>
        <div style={{ fontSize: 11, color: 'var(--deal-text-3)', marginTop: -6, lineHeight: 1.5 }}>
          Your walk-away stays private. Deal uses it to know when to tell you to stop.
        </div>
        <SafeBottom h={12} />
      </div>

      <div style={{ padding: '12px 20px', borderTop: '1px solid var(--deal-raised)', flexShrink: 0 }}>
        <PrimaryButton onClick={onNext} disabled={!valid}>Next <Icon name="arrowRight" size={18} color={valid ? 'var(--deal-signal-ink)' : '#444'} /></PrimaryButton>
      </div>
      <SafeBottom h={16} />
    </Screen>
  );
}

// ── 4. Setup step 2 ─────────────────────────────────────────
function Setup2Screen({ onBack, onGenerate, data, setData }) {
  const [loading, setLoading] = useSet(false);
  const styles = [
    { id: 'collaborative', label: 'Collaborative', help: 'Preserve the relationship' },
    { id: 'balanced', label: 'Balanced', help: 'Firm but professional' },
    { id: 'hardball', label: 'Hardball', help: 'Maximum outcome' },
  ];
  const go = () => { setLoading(true); setTimeout(() => { setLoading(false); onGenerate(); }, 1400); };
  const active = styles.find(s => s.id === (data.style || 'balanced'));

  return (
    <Screen>
      <TopBar title="New negotiation" onBack={onBack} />
      <div style={{ padding: '4px 20px 0', flexShrink: 0 }}><StepDots step={2} /></div>

      <div className="deal-scroll" style={{ flex: 1, overflowY: 'auto', padding: '24px 20px 0' }}>
        <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 18 }}>Your leverage</div>

        <Field label="WHY DO YOU HAVE POWER?" helper="The more detail, the better the strategy.">
          <TextArea value={data.leverage} onChange={v => setData({ ...data, leverage: v })} placeholder="I have a competing offer from Company B for $91K. They've been hiring for this role for 3 months…" minHeight={100} />
        </Field>

        <Field label="WHAT PRESSURE MIGHT THEY BE UNDER? (OPTIONAL)">
          <TextArea value={data.pressure} onChange={v => setData({ ...data, pressure: v })} placeholder="End of quarter, hiring freeze coming…" minHeight={72} />
        </Field>

        <div className="caption" style={{ marginBottom: 10 }}>HOW AGGRESSIVE?</div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
          {styles.map(s => (
            <Pill key={s.id} selected={(data.style || 'balanced') === s.id} onClick={() => setData({ ...data, style: s.id })} style={{ flex: 1, justifyContent: 'center' }}>{s.label}</Pill>
          ))}
        </div>
        <div style={{ fontSize: 12, color: 'var(--deal-text-3)', textAlign: 'center' }}>{active.help}</div>
        <SafeBottom h={12} />
      </div>

      <div style={{ padding: '12px 20px', borderTop: '1px solid var(--deal-raised)', flexShrink: 0 }}>
        <PrimaryButton onClick={go} loading={loading} disabled={loading}>
          {loading ? 'Building your playbook…' : <>Generate my strategy <Icon name="arrowRight" size={18} color="var(--deal-signal-ink)" /></>}
        </PrimaryButton>
      </div>
      <SafeBottom h={16} />
    </Screen>
  );
}

// ── 5. Strategy brief ───────────────────────────────────────
function StrategyScreen({ onClose, onStartSession, tone = 'balanced' }) {
  const opening = (window.__tonedMoves && window.__tonedMoves[0] && window.__tonedMoves[0].say) ||
    "Based on my research and the market data for this role, I was expecting to be in the $103–108K range.";
  return (
    <Screen>
      <TopBar title="Your playbook" onBack={onClose} close />

      <div className="deal-scroll" style={{ flex: 1, overflowY: 'auto', padding: '4px 20px 0' }}>
        {/* header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 24, padding: '0 10px', borderRadius: 999, background: 'var(--deal-signal)', color: 'var(--deal-signal-ink)', fontSize: 11, fontWeight: 600 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--deal-signal-ink)' }} /> READY
          </span>
        </div>
        <div style={{ fontSize: 16, fontWeight: 500 }}>Salary · TechCorp</div>
        <div style={{ fontSize: 12, color: 'var(--deal-text-3)', marginBottom: 16 }}>June 13, 2026</div>

        {/* range card */}
        <Card style={{ padding: 0, marginBottom: 16, display: 'flex' }}>
          {[
            { label: 'Target', val: '$95–100K', c: 'var(--deal-signal)' },
            { label: 'Floor', val: '$88K', c: '#fff' },
            { label: 'Gap', val: '$13K', c: '#fff' },
          ].map((col, i) => (
            <div key={col.label} style={{ flex: 1, padding: 16, borderLeft: i ? '1px solid var(--deal-border)' : 'none' }}>
              <div className="caption" style={{ fontSize: 10 }}>{col.label}</div>
              <div style={{ fontSize: 18, fontWeight: 600, color: col.c, marginTop: 6, letterSpacing: '-0.02em' }}>{col.val}</div>
            </div>
          ))}
        </Card>

        {/* opening move */}
        <Card variant="signal" style={{ marginBottom: 20 }}>
          <MoveBadge type="anchor" />
          <div className="caption" style={{ color: 'var(--deal-signal)', margin: '12px 0 8px' }}>YOUR OPENING LINE</div>
          <div style={{ fontSize: 15, lineHeight: 1.6, color: '#E8E8E8', fontStyle: 'italic' }}>
            "{opening}"
          </div>
        </Card>

        {/* their moves */}
        <SectionLabel style={{ marginBottom: 12 }}>THEIR LIKELY MOVES</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
          {[
            '"That\'s our budget ceiling."',
            '"We need a decision by Friday."',
            '"You\'re our top candidate." — creates urgency.',
          ].map((t, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <span style={{ color: 'var(--deal-warn)', fontWeight: 700, fontSize: 14, lineHeight: 1.5, flexShrink: 0 }}>!</span>
              <span style={{ fontSize: 13, color: 'var(--deal-text-2)', lineHeight: 1.5 }}>{t}</span>
            </div>
          ))}
        </div>

        {/* leverage */}
        <SectionLabel style={{ marginBottom: 12 }}>YOUR LEVERAGE</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
          {[
            'Competing offer: $91K from Company B.',
            '3 months open role — they\'re moving slowly.',
            'Bridge to signing bonus if base salary stalls.',
          ].map((t, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <Icon name="check" size={16} color="var(--deal-signal)" strokeWidth={2.4} />
              <span style={{ fontSize: 13, color: 'var(--deal-text-2)', lineHeight: 1.5 }}>{t}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '12px 20px', borderTop: '1px solid var(--deal-raised)', flexShrink: 0 }}>
        <PrimaryButton onClick={onStartSession}>I'm ready — start session</PrimaryButton>
        <div style={{ fontSize: 11, color: '#444', textAlign: 'center', marginTop: 10 }}>Your strategy is saved. Return anytime.</div>
      </div>
      <SafeBottom h={16} />
    </Screen>
  );
}

Object.assign(window, { Setup1Screen, Setup2Screen, StrategyScreen });
