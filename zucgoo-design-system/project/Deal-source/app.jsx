// app.jsx — Deal router, state machine, tweaks
const { useState: useA, useEffect: useAE, useRef: useAR } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "signal": ["#00E5A0", "#00CC8F", "#001A12", "#004D35", "#001F14"],
  "font": "Inter",
  "tone": "balanced",
  "glow": true
}/*EDITMODE-END*/;

// tone → opening anchor copy
const TONE_COPY = {
  collaborative: "I'm genuinely excited about this role. Based on the market data, I was hoping we could work toward the $100–105K range together — is there room for that?",
  balanced: "Based on my research and the market data for this role, I was expecting to be in the $103–108K range.",
  hardball: "Market for this role is $103–108K, and I have a competing offer at $91K. I'd need a number that reflects that to move forward.",
};

const FONT_STACK = {
  Inter: "'Inter', -apple-system, system-ui, sans-serif",
  "Space Grotesk": "'Space Grotesk', -apple-system, system-ui, sans-serif",
  "IBM Plex Sans": "'IBM Plex Sans', -apple-system, system-ui, sans-serif",
};

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [screen, setScreen] = useA('splash');
  const [tab, setTab] = useA('home');
  const [data, setData] = useA({ cat: 'salary', goal: '', offer: '', floor: '', leverage: '', pressure: '', style: 'balanced' });
  const [outcome, setOutcome] = useA('won');
  const [scale, setScale] = useA(1);
  const stageRef = useAR(null);

  // scale device to viewport
  useAE(() => {
    const fit = () => {
      const vw = window.innerWidth, vh = window.innerHeight;
      setScale(Math.min(1, (vh - 32) / 874, (vw - 24) / 402));
    };
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

  const go = (s) => setScreen(s);
  // dev/verify escape hatch — jump to any screen
  useAE(() => { window.__dealGo = go; }, []);

  // build move set with tone applied to move 1
  const tonedMoves = React.useMemo(() => {
    const m = DEMO.moves.map(x => ({ ...x }));
    m[0] = { ...m[0], say: TONE_COPY[t.tone] || TONE_COPY.balanced };
    return m;
  }, [t.tone]);

  // expose toned moves for live/strategy
  window.__tonedMoves = tonedMoves;

  const cssVars = {
    '--deal-signal': t.signal[0],
    '--deal-signal-2': t.signal[1],
    '--deal-signal-ink': t.signal[2],
    '--deal-signal-dim': t.signal[3],
    '--deal-signal-bg': t.signal[4],
    '--deal-font': FONT_STACK[t.font] || FONT_STACK.Inter,
  };

  const renderScreen = () => {
    switch (screen) {
      case 'splash':
        return <SplashScreen onStart={() => go('dashboard')} />;
      case 'dashboard':
        return <DashboardScreen tab={tab} onTab={setTab}
          onStart={() => go('setup1')}
          onOpenSession={(s) => { setOutcome(s.status === 'won' ? 'won' : 'walked'); go(s.status === 'ongoing' ? 'live' : 'debrief'); }} />;
      case 'setup1':
        return <Setup1Screen data={data} setData={setData} onBack={() => go('dashboard')} onNext={() => go('setup2')} />;
      case 'setup2':
        return <Setup2Screen data={data} setData={setData} onBack={() => go('setup1')} onGenerate={() => go('strategy')} />;
      case 'strategy':
        return <StrategyScreen tone={t.tone} onClose={() => go('dashboard')} onStartSession={() => go('live')} />;
      case 'live':
        return <LiveScreen moves={tonedMoves} onEnd={(o) => { setOutcome(o); go('end'); }} />;
      case 'end':
        return <SessionEndScreen presetOutcome={outcome} onClose={() => go('dashboard')} onDebrief={(o) => { setOutcome(o); go('debrief'); }} />;
      case 'debrief':
        return <DebriefScreen outcome={outcome} onClose={() => go('dashboard')} onShare={() => go('win')} />;
      case 'win':
        return <WinCardScreen onClose={() => go('debrief')} />;
      default:
        return null;
    }
  };

  return (
    <div ref={stageRef} style={{
      width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'radial-gradient(circle at 50% 30%, #161616 0%, #050505 70%)', overflow: 'hidden',
    }}>
      <div style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}>
        <IOSDevice dark width={402} height={874}>
          <div className="deal-root" style={{ ...cssVars, fontFamily: 'var(--deal-font)' }} data-glow={t.glow ? '1' : '0'}>
            <div key={screen} style={{ height: '100%' }}>{renderScreen()}</div>
          </div>
        </IOSDevice>
      </div>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Signal accent" />
        <TweakColor label="Color" value={t.signal}
          options={[
            ["#00E5A0", "#00CC8F", "#001A12", "#004D35", "#001F14"],
            ["#2E8BFF", "#2877E0", "#04122B", "#143A6B", "#06172E"],
            ["#F5A623", "#E0931A", "#2A1A00", "#5A3E0A", "#1F1402"],
            ["#A78BFA", "#9472F0", "#16102B", "#3A2E6B", "#14102A"],
          ]}
          onChange={(v) => setTweak('signal', v)} />
        <TweakToggle label="Move-card glow" value={t.glow} onChange={(v) => setTweak('glow', v)} />

        <TweakSection label="Typography" />
        <TweakSelect label="Font" value={t.font} options={['Inter', 'Space Grotesk', 'IBM Plex Sans']} onChange={(v) => setTweak('font', v)} />

        <TweakSection label="AI negotiation style" />
        <TweakRadio label="Tone" value={t.tone} options={['collaborative', 'balanced', 'hardball']} onChange={(v) => setTweak('tone', v)} />
        <div style={{ fontSize: 11, color: '#888', padding: '2px 2px 0', lineHeight: 1.5 }}>
          Rewrites the opening move in the playbook & live session.
        </div>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
