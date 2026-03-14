// src/app/providers.tsx
'use client';

import { useEffect, useRef } from 'react';
import { useDAOStore } from '@/store/daoStore';
import { useEventStore } from '@/store/eventStore';
import { POLLING } from '@/lib/constants';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const { refreshAll } = useDAOStore.getState();
    const { startDemoMode } = useEventStore.getState();

    refreshAll();

    const pollInterval = setInterval(() => {
      useDAOStore.getState().refreshAll();
    }, POLLING.BLOCKCHAIN_DATA);

    const demoTimer = setTimeout(() => {
      startDemoMode();
    }, 3000);

    return () => {
      clearInterval(pollInterval);
      clearTimeout(demoTimer);
      useEventStore.getState().stopDemoMode();
    };
  }, []);

  return <>{children}</>;
}
