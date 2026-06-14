'use client';

import { useRouter } from 'next/navigation';
import { Screen, SafeBottom } from '@/components/layout/screen';
import { TopBar } from '@/components/layout/top-bar';
import { Card } from '@/components/ui/card';
import { DiamondMark } from '@/components/ui/diamond-mark';
import { Button } from '@/components/ui/button';

export default function WinCardPage() {
  const router = useRouter();

  const handleShare = () => {
    // In real app, would trigger native share or copy image
    alert('Share functionality would trigger here');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--deal-ink)', display: 'flex', flexDirection: 'column' }}>
      <Screen>
        <TopBar title="Share your win" onBack={() => router.push('/dashboard')} close />

        <div className="deal-scroll" style={{ flex: 1, overflowY: 'auto', padding: '24px 20px 0' }}>
          <div style={{ fontSize: 13, color: 'var(--deal-text-3)', marginBottom: 16, textAlign: 'center' }}>
            Your shareable win card
          </div>

          {/* Win Card */}
          <Card
            style={{
              background: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 100%)',
              padding: 32,
              marginBottom: 20,
              border: '1px solid var(--deal-signal)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
              <DiamondMark size={32} />
            </div>

            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <div className="caption" style={{ color: 'var(--deal-signal)', marginBottom: 8 }}>
                I WON
              </div>
              <div
                style={{
                  fontSize: 48,
                  fontWeight: 700,
                  color: 'var(--deal-signal)',
                  letterSpacing: '-0.03em',
                  marginBottom: 4,
                }}
              >
                $11,000
              </div>
              <div style={{ fontSize: 13, color: 'var(--deal-text-2)' }}>
                in my salary negotiation
              </div>
            </div>

            <div
              style={{
                borderTop: '1px solid var(--deal-raised)',
                paddingTop: 20,
                display: 'flex',
                justifyContent: 'space-around',
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <div className="caption" style={{ fontSize: 10, marginBottom: 6 }}>SCORE</div>
                <div style={{ fontSize: 24, fontWeight: 600, color: '#fff' }}>87</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div className="caption" style={{ fontSize: 10, marginBottom: 6 }}>MOVES</div>
                <div style={{ fontSize: 24, fontWeight: 600, color: '#fff' }}>4</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div className="caption" style={{ fontSize: 10, marginBottom: 6 }}>TIME</div>
                <div style={{ fontSize: 24, fontWeight: 600, color: '#fff' }}>12m</div>
              </div>
            </div>

            <div
              style={{
                marginTop: 24,
                fontSize: 11,
                color: 'var(--deal-text-3)',
                textAlign: 'center',
              }}
            >
              Powered by Deal
            </div>
          </Card>

          <div style={{ fontSize: 12, color: 'var(--deal-text-3)', textAlign: 'center', lineHeight: 1.6 }}>
            Share this card to inspire others to negotiate fearlessly.
          </div>

          <SafeBottom h={12} />
        </div>

        <div style={{ padding: '12px 20px', borderTop: '1px solid var(--deal-raised)', flexShrink: 0 }}>
          <Button variant="primary" fullWidth onClick={handleShare}>
            Share card
          </Button>
          <div style={{ textAlign: 'center', marginTop: 10 }}>
            <button
              onClick={() => router.push('/dashboard')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--deal-text-3)',
                fontSize: 12,
                cursor: 'pointer',
                padding: 0,
              }}
            >
              Back to dashboard
            </button>
          </div>
        </div>
        <SafeBottom h={16} />
      </Screen>
    </div>
  );
}
