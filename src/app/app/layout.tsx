'use client';

import { useState } from 'react';
import { UniverseCanvas } from '@/components/canvas/UniverseCanvas';
import { StatusBar } from '@/components/ui/StatusBar';
import { Sidebar } from '@/components/ui/Sidebar';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { useUIStore } from '@/store/uiStore';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [isLoading, setIsLoading] = useState(true);
  const { sidebarCollapsed } = useUIStore();

  const sidebarWidth = sidebarCollapsed ? 64 : 220;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        background: 'var(--void-deepest)',
      }}
    >
      {/* z=0 — 3D canvas layer */}
      <UniverseCanvas />

      {/* z=10+ — 2D UI layer */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 10,
          pointerEvents: 'none',
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 600ms ease',
        }}
      >
        {/* Status bar */}
        <div style={{ pointerEvents: 'auto' }}>
          <StatusBar />
        </div>

        {/* Sidebar */}
        <div style={{ pointerEvents: 'auto' }}>
          <Sidebar />
        </div>

        {/* Main content area */}
        <main
          style={{
            position: 'absolute',
            top: 40,            // below status bar
            left: sidebarWidth, // beside sidebar
            right: 0,
            bottom: 0,
            overflow: 'auto',
            pointerEvents: 'auto',
            transition: 'left 250ms cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          {children}
        </main>
      </div>

      {/* z=100 — Loading screen */}
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}
    </div>
  );
}
