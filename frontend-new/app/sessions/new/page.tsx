'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Screen, SafeBottom } from '@/components/layout/screen';
import { TopBar } from '@/components/layout/top-bar';
import { StepProgress } from '@/components/ui/step-progress';
import { Pill } from '@/components/ui/pill';
import { Field } from '@/components/ui/field';
import { TextInput } from '@/components/ui/text-input';
import { TextArea } from '@/components/ui/text-area';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icons';
import { CATEGORIES } from '@/lib/constants';

export default function SetupStep1Page() {
  const router = useRouter();
  const [data, setData] = useState({
    category: '',
    goal: '',
    offer: '',
    floor: '',
  });

  const isValid = data.category && data.goal && data.offer && data.floor;

  const handleNext = () => {
    // Store data in sessionStorage
    sessionStorage.setItem('setupData', JSON.stringify(data));
    router.push('/sessions/new/step-2');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--deal-ink)', display: 'flex', flexDirection: 'column' }}>
      <Screen>
        <TopBar title="New negotiation" onBack={() => router.back()} />
        <div style={{ padding: '4px 20px 0', flexShrink: 0 }}>
          <StepProgress step={1} total={2} />
        </div>

        <div className="deal-scroll" style={{ flex: 1, overflowY: 'auto', padding: '24px 20px 0' }}>
          <h1 style={{ fontSize: 18, fontWeight: 500, marginBottom: 18 }}>The situation</h1>

          <div className="caption" style={{ marginBottom: 10 }}>NEGOTIATION TYPE</div>
          <div className="deal-scroll" style={{ display: 'flex', gap: 8, overflowX: 'auto', margin: '0 -20px 20px', padding: '0 20px' }}>
            {CATEGORIES.map((cat) => (
              <Pill
                key={cat.id}
                selected={data.category === cat.id}
                onClick={() => setData({ ...data, category: cat.id })}
              >
                {cat.label}
              </Pill>
            ))}
          </div>

          <Field label="WHAT DO YOU WANT TO ACHIEVE?">
            <TextArea
              value={data.goal}
              onChange={(v) => setData({ ...data, goal: v })}
              placeholder="Get a salary of $95,000 plus a 6-month review."
              minHeight={72}
            />
          </Field>

          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <Field label="THEIR OFFER">
                <TextInput
                  value={data.offer}
                  onChange={(v) => setData({ ...data, offer: v })}
                  placeholder="$82,000"
                  inputMode="decimal"
                />
              </Field>
            </div>
            <div style={{ flex: 1 }}>
              <Field label="WALK-AWAY">
                <TextInput
                  value={data.floor}
                  onChange={(v) => setData({ ...data, floor: v })}
                  placeholder="$88,000"
                  inputMode="decimal"
                />
              </Field>
            </div>
          </div>

          <div style={{ fontSize: 11, color: 'var(--deal-text-3)', marginTop: -6, lineHeight: 1.5, marginBottom: 12 }}>
            Your walk-away stays private. Deal uses it to know when to tell you to stop.
          </div>
          <SafeBottom h={12} />
        </div>

        <div style={{ padding: '12px 20px', borderTop: '1px solid var(--deal-raised)', flexShrink: 0 }}>
          <Button variant="primary" fullWidth onClick={handleNext} disabled={!isValid}>
            Next <Icon name="arrowRight" size={18} color={isValid ? 'var(--deal-signal-ink)' : '#444'} />
          </Button>
        </div>
        <SafeBottom h={16} />
      </Screen>
    </div>
  );
}
