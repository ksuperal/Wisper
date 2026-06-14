'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Screen, SafeBottom } from '@/components/layout/screen';
import { TopBar } from '@/components/layout/top-bar';
import { StepProgress } from '@/components/ui/step-progress';
import { Pill } from '@/components/ui/pill';
import { Field } from '@/components/ui/field';
import { TextArea } from '@/components/ui/text-area';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icons';

const STYLES = [
  { id: 'collaborative', label: 'Collaborative', help: 'Preserve the relationship' },
  { id: 'balanced', label: 'Balanced', help: 'Firm but professional' },
  { id: 'hardball', label: 'Hardball', help: 'Maximum outcome' },
];

export default function SetupStep2Page() {
  const router = useRouter();
  const [data, setData] = useState({
    leverage: '',
    pressure: '',
    style: 'balanced',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load data from step 1
    const step1Data = sessionStorage.getItem('setupData');
    if (!step1Data) {
      router.push('/sessions/new');
    }
  }, [router]);

  const handleGenerate = () => {
    setLoading(true);
    // Merge with step 1 data
    const step1Data = JSON.parse(sessionStorage.getItem('setupData') || '{}');
    const fullData = { ...step1Data, ...data };
    sessionStorage.setItem('fullSetupData', JSON.stringify(fullData));

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      router.push('/sessions/1/strategy');
    }, 1400);
  };

  const activeStyle = STYLES.find((s) => s.id === data.style) || STYLES[1];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--deal-ink)', display: 'flex', flexDirection: 'column' }}>
      <Screen>
        <TopBar title="New negotiation" onBack={() => router.back()} />
        <div style={{ padding: '4px 20px 0', flexShrink: 0 }}>
          <StepProgress step={2} total={2} />
        </div>

        <div className="deal-scroll" style={{ flex: 1, overflowY: 'auto', padding: '24px 20px 0' }}>
          <h1 style={{ fontSize: 18, fontWeight: 500, marginBottom: 18 }}>Your leverage</h1>

          <Field
            label="WHY DO YOU HAVE POWER?"
            helper="The more detail, the better the strategy."
          >
            <TextArea
              value={data.leverage}
              onChange={(v) => setData({ ...data, leverage: v })}
              placeholder="I have a competing offer from Company B for $91K. They've been hiring for this role for 3 months…"
              minHeight={100}
            />
          </Field>

          <Field label="WHAT PRESSURE MIGHT THEY BE UNDER? (OPTIONAL)">
            <TextArea
              value={data.pressure}
              onChange={(v) => setData({ ...data, pressure: v })}
              placeholder="End of quarter, hiring freeze coming…"
              minHeight={72}
            />
          </Field>

          <div className="caption" style={{ marginBottom: 10 }}>HOW AGGRESSIVE?</div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            {STYLES.map((s) => (
              <Pill
                key={s.id}
                selected={data.style === s.id}
                onClick={() => setData({ ...data, style: s.id })}
                style={{ flex: 1, justifyContent: 'center' }}
              >
                {s.label}
              </Pill>
            ))}
          </div>
          <div style={{ fontSize: 12, color: 'var(--deal-text-3)', textAlign: 'center' }}>
            {activeStyle.help}
          </div>
          <SafeBottom h={12} />
        </div>

        <div style={{ padding: '12px 20px', borderTop: '1px solid var(--deal-raised)', flexShrink: 0 }}>
          <Button variant="primary" fullWidth onClick={handleGenerate} disabled={loading}>
            {loading ? (
              'Building your playbook…'
            ) : (
              <>
                Generate my strategy <Icon name="arrowRight" size={18} color="var(--deal-signal-ink)" />
              </>
            )}
          </Button>
        </div>
        <SafeBottom h={16} />
      </Screen>
    </div>
  );
}
