// screens-live.jsx — live session (core), thinking state, mic, history
const { useState: useL, useEffect: useLE, useRef: useLR } = React;

function LiveScreen({ onEnd, moves: movesProp }) {
  const moves = movesProp || DEMO.moves;
  const [idx, setIdx] = useL(0);          // current move index
  const [phase, setPhase] = useL('move'); // 'move' | 'thinking'
  const [input, setInput] = useL('');
  const [recording, setRecording] = useL(false);
  const [histOpen, setHistOpen] = useL(false);
  const [revealKey, setRevealKey] = useL(0);
  const recTimer = useLR(null);
  const scrollRef = useLR(null);

  const move = moves[idx];
  const isLast = idx === moves.length - 1;

  useLE(() => () => clearTimeout(recTimer.current), []);

  // simulate whisper → fill textarea
  const toggleMic = () => {
    if (recording) {
      clearTimeout(recTimer.current);
      setRecording(false);
      return;
    }
    setRecording(true);
    recTimer.current = setTimeout(() => {
      setInput(move.they);
      setRecording(false);
    }, 1500);
  };

  const getMove = () => {
    if (!input.trim() || phase === 'thinking') return;
    if (isLast) { onEnd('won'); return; }
    setPhase('thinking');
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
    setTimeout(() => {
      setIdx(i => i + 1);
      setInput('');
      setPhase('move');
      setRevealKey(k => k + 1);
    }, 1700);
  };

  const history = moves.slice(0, idx); // moves already passed

  return (
    <Screen>
      <LiveTopBar title="Salary · TechCorp" move={move.n} />

      {/* context bar */}
      <div style={{ padding: '8px 20px', borderBottom: '1px solid var(--deal-surface)', flexShrink: 0 }}>
        <span style={{ fontSize: 11, color: 'var(--deal-text-4)' }}>Goal $95K · Floor $88K · Offer $82K</span>
      </div>

      {/* scroll area */}
      <div ref={scrollRef} className="deal-scroll" style={{ flex: 1, overflowY: 'auto', padding: '16px 20px 8px' }}>
        {phase === 'thinking' ? (
          <Reveal dur={250} style={{ background: 'var(--deal-surface)', border: '1px solid var(--deal-border)', borderRadius: 14, padding: '44px 20px', display: 'flex', justifyContent: 'center' }}>
            <ThinkingDots />
          </Reveal>
        ) : (
          <MoveCard key={revealKey} move={move} />
        )}

        {/* history */}
        {history.length > 0 && (
          <div style={{ marginTop: 18 }}>
            <button onClick={() => setHistOpen(o => !o)} style={{ display: 'flex', alignItems: 'center', gap: 6, width: '100%' }}>
              <span className="caption" style={{ color: '#444' }}>Previous moves · {history.length}</span>
              <span style={{ marginLeft: 'auto', transform: histOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}>
                <Icon name="chevronRight" size={14} color="#444" />
              </span>
            </button>
            {histOpen && (
              <div className="anim-fade" style={{ marginTop: 8 }}>
                {history.map(h => (
                  <div key={h.n} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: '1px solid var(--deal-raised)' }}>
                    <MoveBadge type={h.type} compact />
                    <span style={{ flex: 1, fontSize: 12, color: 'var(--deal-text-2)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{h.say}</span>
                    <span style={{ fontSize: 11, color: '#444', flexShrink: 0 }}>#{h.n}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* input area */}
      <div style={{ borderTop: '1px solid var(--deal-raised)', padding: '12px 20px 12px', flexShrink: 0, background: 'var(--deal-ink)' }}>
        <div className="caption" style={{ marginBottom: 8, color: 'var(--deal-text-3)' }}>WHAT DID THEY JUST SAY?</div>

        <div style={{ position: 'relative' }}>
          <TextArea value={input} onChange={setInput} disabled={phase === 'thinking'} minHeight={58}
            placeholder={recording ? 'Listening…' : 'Type or tap mic to whisper…'} />
          {recording && (
            <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
              <LiveDot size={6} /><span style={{ fontSize: 11, color: 'var(--deal-danger)' }}>0:0{Math.floor(Math.random()*3)+1}</span>
            </div>
          )}
        </div>

        {/* action row */}
        <div style={{ display: 'flex', gap: 10, marginTop: 10, alignItems: 'center' }}>
          <MicButton recording={recording} onClick={toggleMic} disabled={phase === 'thinking'} />
          <PrimaryButton onClick={getMove} disabled={phase === 'thinking' || !input.trim()} style={{ flex: 1, height: 52 }}>
            {phase === 'thinking' ? 'Thinking…'
              : isLast ? <>Close the deal <Icon name="check" size={18} color={input.trim() ? 'var(--deal-signal-ink)' : '#444'} strokeWidth={2.4} /></>
              : <>Get my move <Icon name="arrowRight" size={18} color={input.trim() ? 'var(--deal-signal-ink)' : '#444'} /></>}
          </PrimaryButton>
        </div>

        {/* danger row */}
        <div style={{ display: 'flex', marginTop: 12 }}>
          <button onClick={() => onEnd('won')} className="press" style={{ flex: 1, height: 32, fontSize: 13, color: 'var(--deal-signal)', fontWeight: 500 }}>Deal closed</button>
          <div style={{ width: 1, background: 'var(--deal-raised)', margin: '4px 0' }} />
          <button onClick={() => onEnd('walked')} className="press" style={{ flex: 1, height: 32, fontSize: 13, color: 'var(--deal-danger)', fontWeight: 500 }}>Walk away</button>
        </div>
      </div>
      <SafeBottom h={18} />
    </Screen>
  );
}

// ── Move card ───────────────────────────────────────────────
function MoveCard({ move }) {
  return (
    <Reveal y={10} dur={280} className="move-card" style={{
      background: 'var(--deal-signal-bg)', border: '1px solid var(--deal-signal-dim)',
      borderLeft: '4px solid var(--deal-signal)', borderRadius: 14, padding: 16,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <MoveBadge type={move.type} />
        <span style={{ fontSize: 11, color: '#444' }}>Move {move.n}</span>
      </div>

      <div className="caption" style={{ color: 'var(--deal-signal)', margin: '14px 0 6px' }}>SAY THIS:</div>
      <div style={{ background: 'rgba(0,0,0,0.32)', borderRadius: 8, padding: 12, fontSize: 15, lineHeight: 1.65, color: '#fff' }}>
        {move.say}
      </div>

      <div style={{ borderTop: '1px solid var(--deal-signal-dim)', margin: '14px 0 0' }} />
      <div className="caption" style={{ margin: '12px 0 4px' }}>WHY</div>
      <div style={{ fontSize: 13, color: '#888', lineHeight: 1.5 }}>{move.why}</div>

      <div className="caption" style={{ margin: '12px 0 4px' }}>WATCH FOR</div>
      <div style={{ fontSize: 13, color: '#888', lineHeight: 1.5 }}>{move.watch}</div>
    </Reveal>
  );
}

// ── Mic button with pulse ring ──────────────────────────────
function MicButton({ recording, onClick, disabled }) {
  return (
    <button onClick={disabled ? undefined : onClick} className="press" style={{
      width: 52, height: 52, borderRadius: 999, position: 'relative', flexShrink: 0,
      background: 'var(--deal-raised)',
      border: recording ? '2px solid var(--deal-danger)' : '1px solid var(--deal-border)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      opacity: disabled ? 0.4 : 1,
    }}>
      {recording && <span style={{ position: 'absolute', inset: -2, borderRadius: 999, border: '2px solid var(--deal-danger)', animation: 'deal-mic-ring 1s ease-out infinite' }} />}
      <Icon name="mic" size={22} color={recording ? 'var(--deal-danger)' : 'var(--deal-text-2)'} />
    </button>
  );
}

Object.assign(window, { LiveScreen, MoveCard, MicButton });
