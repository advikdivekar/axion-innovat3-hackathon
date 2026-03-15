'use client';

import dynamic from 'next/dynamic';

// Dynamically import the Three.js scene with SSR disabled
const UniverseScene = dynamic(() => import('./UniverseScene'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--void-deepest)',
        zIndex: 0,
      }}
    />
  ),
});

export function UniverseCanvas() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'auto',
      }}
    >
      <UniverseScene />
    </div>
  );
}
