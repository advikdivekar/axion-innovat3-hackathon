'use client';

import React from 'react';
import { Search } from 'lucide-react';

interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'style'> {
  variant?: 'light' | 'dark';
}

export function SearchInput({ variant = 'light', ...props }: SearchInputProps) {
  const isDark = variant === 'dark';
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <Search
        size={14}
        color={isDark ? 'rgba(255,255,255,0.3)' : '#94a3b8'}
        style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
      />
      <input
        {...props}
        style={{
          height: '4rem', padding: '0 1.4rem 0 3.6rem', width: '100%',
          background: isDark ? 'rgba(255,255,255,0.04)' : '#ffffff',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0'}`,
          borderRadius: '0.8rem', outline: 'none',
          fontFamily: 'Inter, sans-serif', fontSize: '1.3rem',
          color: isDark ? '#ffffff' : '#0a0a0a',
          transition: 'border-color 150ms ease',
        }}
        onFocus={e => ((e.currentTarget as HTMLElement).style.borderColor = isDark ? 'rgba(0,212,255,0.4)' : '#00d4ff')}
        onBlur={e => ((e.currentTarget as HTMLElement).style.borderColor = isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0')}
      />
    </div>
  );
}
