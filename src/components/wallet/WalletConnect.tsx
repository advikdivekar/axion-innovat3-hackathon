// src/components/wallet/WalletConnect.tsx
'use client';

import { useState, useCallback } from 'react';
import clsx from 'clsx';

interface WalletConnectProps {
  onConnect?: (address: string) => void;
  compact?: boolean;
}

export function WalletConnect({ onConnect, compact = false }: WalletConnectProps) {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connect = useCallback(async () => {
    if (typeof window === 'undefined' || !window.ethereum) { setError('No wallet detected'); return; }
    setIsConnecting(true);
    setError(null);
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts && accounts.length > 0) { setAddress(accounts[0]); onConnect?.(accounts[0]); }
    } catch (err: any) {
      setError(err.code === 4001 ? 'Connection rejected' : 'Connection failed');
    } finally {
      setIsConnecting(false);
    }
  }, [onConnect]);

  const truncate = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  if (address) {
    return (
      <button onClick={() => setAddress(null)} className="flex items-center gap-2 px-3 py-1.5 rounded border border-[rgba(0,255,136,0.3)] text-[#00ff88] hover:border-[rgba(0,255,136,0.5)] transition-all duration-200 font-mono text-xs">
        <div className="w-2 h-2 rounded-full bg-[#00ff88]" />
        {truncate(address)}
      </button>
    );
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button onClick={connect} disabled={isConnecting} className={clsx('px-3 py-1.5 rounded text-xs font-display uppercase tracking-[0.12em] border border-[rgba(0,240,255,0.3)] text-[#00f0ff] hover:border-[rgba(0,240,255,0.6)] hover:shadow-[0_0_15px_rgba(0,240,255,0.15)] transition-all duration-200', isConnecting && 'opacity-50 animate-pulse cursor-wait')}>
        {isConnecting ? 'CONNECTING...' : compact ? 'CONNECT' : 'CONNECT WALLET'}
      </button>
      {error && <span className="text-[9px] text-[#ff2d6a] font-mono">{error}</span>}
    </div>
  );
}

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on?: (event: string, handler: (...args: any[]) => void) => void;
    };
  }
}
