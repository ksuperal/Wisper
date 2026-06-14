'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DiamondMark } from '@/components/ui/diamond-mark';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icons';
import { SafeBottom } from '@/components/layout/screen';

const SLIDES = [
  {
    title: 'Your real-time negotiation coach',
    desc: 'Deal listens to your conversation and tells you exactly what to say — move by move.',
    icon: (
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: 'var(--deal-signal-bg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
        }}
      >
        <Icon name="mic" size={32} color="var(--deal-signal)" />
      </div>
    ),
  },
  {
    title: 'Built on proven tactics',
    desc: 'We teach you Anchoring, Mirroring, Bridging, and 20+ other techniques from professional negotiators.',
    icon: (
      <div
        style={{
          fontSize: 56,
          color: 'var(--deal-signal)',
          textAlign: 'center',
          margin: '0 auto 24px',
          fontWeight: 600,
        }}
      >
        🎯
      </div>
    ),
  },
  {
    title: 'Private and secure',
    desc: 'Your data stays on your device. We never share your negotiations with anyone.',
    icon: (
      <div
        style={{
          fontSize: 56,
          color: 'var(--deal-signal)',
          textAlign: 'center',
          margin: '0 auto 24px',
          fontWeight: 600,
        }}
      >
        🔒
      </div>
    ),
  },
];

export default function HomePage() {
  const router = useRouter();
  const [slide, setSlide] = useState(0);

  const isLast = slide === SLIDES.length - 1;
  const current = SLIDES[slide];

  const handleNext = () => {
    if (isLast) {
      router.push('/dashboard');
    } else {
      setSlide(slide + 1);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--deal-ink)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* Skip */}
      {!isLast && (
        <button
          onClick={() => router.push('/dashboard')}
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            background: 'none',
            border: 'none',
            color: 'var(--deal-text-3)',
            fontSize: 14,
            cursor: 'pointer',
            padding: 0,
            zIndex: 10,
          }}
        >
          Skip
        </button>
      )}

      {/* Content */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 32px',
          textAlign: 'center',
        }}
      >
        {/* Logo on first slide only */}
        {slide === 0 && (
          <div style={{ marginBottom: 48 }}>
            <DiamondMark size={48} />
            <h1
              style={{
                fontSize: 32,
                fontWeight: 500,
                color: 'var(--deal-text-1)',
                letterSpacing: '-0.03em',
                marginTop: 16,
              }}
            >
              Deal
            </h1>
          </div>
        )}

        {/* Icon */}
        {current.icon}

        {/* Title */}
        <h2
          style={{
            fontSize: 24,
            fontWeight: 500,
            color: 'var(--deal-text-1)',
            marginBottom: 12,
            lineHeight: 1.3,
          }}
        >
          {current.title}
        </h2>

        {/* Description */}
        <p
          style={{
            fontSize: 15,
            color: 'var(--deal-text-2)',
            lineHeight: 1.6,
            maxWidth: 340,
          }}
        >
          {current.desc}
        </p>
      </div>

      {/* Dots */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 8,
          padding: '0 20px 24px',
        }}
      >
        {SLIDES.map((_, i) => (
          <div
            key={i}
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: i === slide ? 'var(--deal-signal)' : 'var(--deal-text-4)',
              transition: 'background 0.2s',
            }}
          />
        ))}
      </div>

      {/* CTA */}
      <div style={{ padding: '0 20px 20px' }}>
        <Button variant="primary" fullWidth onClick={handleNext}>
          {isLast ? (
            'Get started'
          ) : (
            <>
              Next <Icon name="arrowRight" size={18} color="var(--deal-signal-ink)" />
            </>
          )}
        </Button>
      </div>
      <SafeBottom h={16} />
    </div>
  );
}
