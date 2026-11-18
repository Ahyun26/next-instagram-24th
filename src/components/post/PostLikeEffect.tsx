'use client';

import { useEffect, useId, useRef } from 'react';

interface PostLikeEffectProps {
  onComplete: () => void;
}

export default function PostLikeEffect({ onComplete }: PostLikeEffectProps) {
  const gradientId = useId();
  const heartRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const heart = heartRef.current;
    if (!heart) return;

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const keyframes: Keyframe[] = reducedMotion
      ? [
          { offset: 0, opacity: 0 },
          { offset: 0.4, opacity: 1 },
          { offset: 0.6, opacity: 1 },
          { offset: 1, opacity: 0 },
        ]
      : [
          { offset: 0, transform: 'scale(0)', opacity: 0 },
          { offset: 0.4, transform: 'scale(1.2) rotate(16deg)', opacity: 0.8 },
          { offset: 0.6, transform: 'scale(1)', opacity: 1 },
          { offset: 1, transform: 'scale(0.9) translateY(-800px)', opacity: 0 },
        ];
    const animation = heart.animate(
      keyframes.map((frame) => ({ ...frame, easing: 'ease-in-out' })),
      { duration: 1000, fill: 'forwards' }
    );
    // 종료 이벤트와 별개로 1초 후 요소 자체도 제거한다.
    const timeout = window.setTimeout(onComplete, 1000);

    return () => {
      window.clearTimeout(timeout);
      animation.cancel();
    };
  }, [onComplete]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
    >
      <span ref={heartRef} className="block opacity-0">
        <svg className="block" viewBox="0 0 48 48" width="128" height="128">
          <defs>
            <linearGradient gradientTransform="rotate(35)" id={gradientId}>
              <stop offset="0%" stopColor="#FF7A00" />
              <stop offset="40%" stopColor="#FF0169" />
              <stop offset="100%" stopColor="#D300C5" />
            </linearGradient>
          </defs>
          <path
            d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"
            fill={`url(#${gradientId})`}
          />
        </svg>
      </span>
    </div>
  );
}
