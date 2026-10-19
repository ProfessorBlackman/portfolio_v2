'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
const VISIBLE_MS = 6000;

/** Small rewards for the curious: a console note and a Konami-code rooster. */
export const EasterEggs: React.FC = () => {
  const [showRooster, setShowRooster] = useState(false);

  useEffect(() => {
    console.log(
      '%cMETHUSELAH.%c\n\nCurious enough to open the console? Good — that’s the right instinct.\nThere’s a rooster in here somewhere: ↑ ↑ ↓ ↓ ← → ← → B A',
      'font: 600 14px sans-serif; letter-spacing: .04em;',
      'font: 12px monospace; color: #4f6f1f;',
    );
  }, []);

  useEffect(() => {
    let position = 0;
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest('input, textarea, [contenteditable="true"]')) return;

      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      position = key === KONAMI[position] ? position + 1 : key === KONAMI[0] ? 1 : 0;
      if (position === KONAMI.length) {
        position = 0;
        setShowRooster(true);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    if (!showRooster) return;
    const timer = window.setTimeout(() => setShowRooster(false), VISIBLE_MS);
    return () => window.clearTimeout(timer);
  }, [showRooster]);

  if (!showRooster) return null;

  return (
    <div
      role="status"
      className="fixed bottom-4 right-4 z-[70] flex items-end gap-3 rooster-pop"
    >
      <p className="mb-16 max-w-[13rem] bg-ink text-paper px-4 py-3 text-sm leading-snug">
        Cock-a-doodle-deploy. <span className="text-signal">You found me.</span>
      </p>
      <button
        type="button"
        onClick={() => setShowRooster(false)}
        aria-label="Dismiss the rooster"
        className="block"
      >
        <Image src="/mascot/rooster.webp" alt="" width={560} height={544} className="w-32 md:w-40 h-auto drop-shadow-lg" />
      </button>
    </div>
  );
};
