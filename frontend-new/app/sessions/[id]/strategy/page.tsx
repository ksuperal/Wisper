'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Screen, SafeBottom } from '@/components/layout/screen';
import { TopBar } from '@/components/layout/top-bar';
import { Card } from '@/components/ui/card';
import { MoveBadge } from '@/components/ui/move-badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icons';
import { SectionLabel } from '@/components/screens/section-label';
import { DEMO_MOVES } from '@/lib/constants';
import { generateStrategy, getSession, checkBackendHealth } from '@/lib/api';

export default function StrategyPage() {
  const router = useRouter();
  const params = useParams();
  const sessionId = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [strategy, setStrategy] = useState<any>(null);
  const [sessionData, setSessionData] = useState<any>(null);

  useEffect(() => {
    const loadStrategy = async () => {
      try {
        const isBackendHealthy = await checkBackendHealth();

        if (isBackendHealthy && sessionId !== '1') {
          // Load real session data
          const session = await getSession(sessionId);
          setSessionData(session);

          // Generate strategy
          const strategyData = await generateStrategy(sessionId);
          setStrategy(strategyData);
        } else {
          // Use demo data
          setStrategy({
            target_range: '$95–100K',
            floor: '$88K',
            gap: '$13K',
            opening_move: DEMO_MOVES[0].say,
            their_likely_moves: [
              '"That\'s our budget ceiling."',
              '"We need a decision by Friday."',
              '"You\'re our top candidate." — creates urgency.',
            ],
            your_leverage: [
              'Competing offer: $91K from Company B.',
              "3 months open role — they're moving slowly.",
              'Bridge to signing bonus if base salary stalls.',
            ],
          });
          setSessionData({
            type: 'Salary',
            id: '1',
          });
        }
      } catch (error) {
        console.error('Failed to load strategy:', error);
        // Fall back to demo data
        setStrategy({
          target_range: '$95–100K',
          floor: '$88K',
          gap: '$13K',
          opening_move: DEMO_MOVES[0].say,
          their_likely_moves: [
            '"That\'s our budget ceiling."',
            '"We need a decision by Friday."',
            '"You\'re our top candidate." — creates urgency.',
          ],
          your_leverage: [
            'Competing offer: $91K from Company B.',
            "3 months open role — they're moving slowly.",
            'Bridge to signing bonus if base salary stalls.',
          ],
        });
        setSessionData({
          type: 'Salary',
          id: '1',
        });
      } finally {
        setLoading(false);
      }
    };

    loadStrategy();
  }, [sessionId]);

  if (loading || !strategy) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: 'var(--deal-ink)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 15, color: 'var(--deal-text-2)' }}>
            Building your playbook...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--deal-ink)', display: 'flex', flexDirection: 'column' }}>
      <Screen>
        <TopBar title="Your playbook" onBack={() => router.push('/dashboard')} close />

        <div className="deal-scroll" style={{ flex: 1, overflowY: 'auto', padding: '4px 20px 0' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                height: 24,
                padding: '0 10px',
                borderRadius: 999,
                background: 'var(--deal-signal)',
                color: 'var(--deal-signal-ink)',
                fontSize: 11,
                fontWeight: 600,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: 'var(--deal-signal-ink)',
                }}
              />{' '}
              READY
            </span>
          </div>
          <div style={{ fontSize: 16, fontWeight: 500 }}>
            {sessionData?.type || 'Salary'} · TechCorp
          </div>
          <div style={{ fontSize: 12, color: 'var(--deal-text-3)', marginBottom: 16 }}>
            {new Date().toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </div>

          {/* Range card */}
          <Card style={{ padding: 0, marginBottom: 16, display: 'flex' }}>
            {[
              { label: 'Target', val: strategy.target_range, c: 'var(--deal-signal)' },
              { label: 'Floor', val: strategy.floor, c: '#fff' },
              { label: 'Gap', val: strategy.gap, c: '#fff' },
            ].map((col, i) => (
              <div
                key={col.label}
                style={{
                  flex: 1,
                  padding: 16,
                  borderLeft: i ? '1px solid var(--deal-border)' : 'none',
                }}
              >
                <div className="caption" style={{ fontSize: 10 }}>
                  {col.label}
                </div>
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: col.c,
                    marginTop: 6,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {col.val}
                </div>
              </div>
            ))}
          </Card>

          {/* Opening move */}
          <Card variant="signal" style={{ marginBottom: 20 }}>
            <MoveBadge type="anchor" />
            <div className="caption" style={{ color: 'var(--deal-signal)', margin: '12px 0 8px' }}>
              YOUR OPENING LINE
            </div>
            <div
              style={{
                fontSize: 15,
                lineHeight: 1.6,
                color: '#E8E8E8',
                fontStyle: 'italic',
              }}
            >
              "{strategy.opening_move}"
            </div>
          </Card>

          {/* Their moves */}
          <SectionLabel style={{ marginBottom: 12 }}>THEIR LIKELY MOVES</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
            {strategy.their_likely_moves.map((text: string, i: number) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span
                  style={{
                    color: 'var(--deal-warn)',
                    fontWeight: 700,
                    fontSize: 14,
                    lineHeight: 1.5,
                    flexShrink: 0,
                  }}
                >
                  !
                </span>
                <span style={{ fontSize: 13, color: 'var(--deal-text-2)', lineHeight: 1.5 }}>
                  {text}
                </span>
              </div>
            ))}
          </div>

          {/* Leverage */}
          <SectionLabel style={{ marginBottom: 12 }}>YOUR LEVERAGE</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
            {strategy.your_leverage.map((text: string, i: number) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <Icon name="check" size={16} color="var(--deal-signal)" strokeWidth={2.4} />
                <span style={{ fontSize: 13, color: 'var(--deal-text-2)', lineHeight: 1.5 }}>
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: '12px 20px', borderTop: '1px solid var(--deal-raised)', flexShrink: 0 }}>
          <Button
            variant="primary"
            fullWidth
            onClick={() => {
              sessionStorage.setItem('currentSessionId', sessionId);
              router.push('/live');
            }}
          >
            I'm ready — start session
          </Button>
          <div style={{ fontSize: 11, color: '#444', textAlign: 'center', marginTop: 10 }}>
            Your strategy is saved. Return anytime.
          </div>
        </div>
        <SafeBottom h={16} />
      </Screen>
    </div>
  );
}
