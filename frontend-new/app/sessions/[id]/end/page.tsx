'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Screen, SafeBottom } from '@/components/layout/screen';
import { TopBar } from '@/components/layout/top-bar';
import { Card } from '@/components/ui/card';
import { Pill } from '@/components/ui/pill';
import { Field } from '@/components/ui/field';
import { TextArea } from '@/components/ui/text-area';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icons';

const OUTCOMES = [
  { id: 'won', label: 'Won the deal', c: 'var(--deal-signal)' },
  { id: 'ongoing', label: 'Still ongoing', c: 'var(--deal-warn)' },
  { id: 'walked', label: 'I walked away', c: 'var(--deal-text-2)' },
  { id: 'theywalked', label: 'They walked away', c: 'var(--deal-danger)' },
];

const FEELINGS = [
  { id: 'confident', label: 'Confident' },
  { id: 'nervous', label: 'Nervous' },
  { id: 'control', label: 'In control' },
  { id: 'pressured', label: 'Pressured' },
  { id: 'neutral', label: 'Neutral' },
];

export default function SessionEndPage() {
  const router = useRouter();
  const [data, setData] = useState({
    outcome: 'won',
    agreed: '',
    feeling: 'confident',
  });
  const [loading, setLoading] = useState(false);

  const handleDebrief = () => {
    setLoading(true);
    sessionStorage.setItem('sessionEndData', JSON.stringify(data));
    setTimeout(() => {
      setLoading(false);
      router.push('/sessions/1/debrief');
    }, 1200);
  };

  const selectedOutcome = OUTCOMES.find((o) => o.id === data.outcome) || OUTCOMES[0];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--deal-ink)', display: 'flex', flexDirection: 'column' }}>
      <Screen>
        <TopBar title="Session ended" onBack={() => router.push('/live')} />

        <div className="deal-scroll" style={{ flex: 1, overflowY: 'auto', padding: '24px 20px 0' }}>
          <h1 style={{ fontSize: 18, fontWeight: 500, marginBottom: 18 }}>How did it go?</h1>

          <div className="caption" style={{ marginBottom: 12 }}>OUTCOME</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
            {OUTCOMES.map((outcome) => (
              <Card
                key={outcome.id}
                onClick={() => setData({ ...data, outcome: outcome.id })}
                style={{
                  padding: 16,
                  cursor: 'pointer',
                  border: data.outcome === outcome.id ? `2px solid ${outcome.c}` : '2px solid transparent',
                  background: data.outcome === outcome.id ? 'var(--deal-raised)' : 'var(--deal-panel)',
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: data.outcome === outcome.id ? outcome.c : 'var(--deal-text-2)',
                    textAlign: 'center',
                  }}
                >
                  {outcome.label}
                </div>
              </Card>
            ))}
          </div>

          <Field label="WHAT WAS AGREED?" helper="Or where did you leave it?">
            <TextArea
              value={data.agreed}
              onChange={(v) => setData({ ...data, agreed: v })}
              placeholder="They agreed to $95K with a 6-month review."
              minHeight={88}
            />
          </Field>

          <div className="caption" style={{ marginBottom: 10 }}>HOW DID YOU FEEL?</div>
          <div className="deal-scroll" style={{ display: 'flex', gap: 8, overflowX: 'auto', margin: '0 -20px 20px', padding: '0 20px' }}>
            {FEELINGS.map((feeling) => (
              <Pill
                key={feeling.id}
                selected={data.feeling === feeling.id}
                onClick={() => setData({ ...data, feeling: feeling.id })}
              >
                {feeling.label}
              </Pill>
            ))}
          </div>

          <SafeBottom h={12} />
        </div>

        <div style={{ padding: '12px 20px', borderTop: '1px solid var(--deal-raised)', flexShrink: 0 }}>
          <Button variant="primary" fullWidth onClick={handleDebrief} disabled={loading}>
            {loading ? (
              'Analyzing your session…'
            ) : (
              <>
                Get my debrief <Icon name="arrowRight" size={18} color="var(--deal-signal-ink)" />
              </>
            )}
          </Button>
        </div>
        <SafeBottom h={16} />
      </Screen>
    </div>
  );
}
