// src/hooks/useDAOData.ts
'use client';

import { useEffect } from 'react';
import { useDAOStore } from '@/store/daoStore';

export function useDAOData() {
  const isLoading = useDAOStore((s) => s.isLoading);
  const isHydrated = useDAOStore((s) => s.isHydrated);
  const error = useDAOStore((s) => s.error);
  const refreshAll = useDAOStore((s) => s.refreshAll);

  useEffect(() => {
    if (!isHydrated && !isLoading) {
      refreshAll();
    }
  }, [isHydrated, isLoading, refreshAll]);

  return { isLoading, isHydrated, error, refetch: refreshAll };
}
