'use client';

import React from 'react';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  variant?: 'light' | 'dark';
}

export function TextInput({ label, error, variant = 'light', style, ...props }: TextInputProps) {
  const isDark = variant === 'dark';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
      {label && (
        <label style={{
          fontFamily: 'Inter, sans-serif', fontSize: '1.2rem', fontWeight: 600,
          color: isDark ? 'rgba(255,255,255,0.7)' : '#4a5568', letterSpacing: '0.02em',
        }}>
          {label}
        </label>
      )}
      <input
        {...props}
        style={{
          height: '4rem', padding: '0 1.4rem',
          background: isDark ? 'rgba(255,255,255,0.04)' : '#ffffff',
          border: `1px solid ${error ? '#ff5c16' : isDark ? 'rgba(255,255,255,0.12)' : '#e2e8f0'}`,
          borderRadius: '0.8rem', outline: 'none',
          fontFamily: 'Inter, sans-serif', fontSize: '1.4rem',
          color: isDark ? '#ffffff' : '#0a0a0a',
          transition: 'border-color 150ms ease',
          width: '100%',
          ...style,
        }}
        onFocus={e => {
          (e.currentTarget as HTMLElement).style.borderColor = isDark ? 'rgba(0,212,255,0.4)' : '#00d4ff';
        }}
        onBlur={e => {
          (e.currentTarget as HTMLElement).style.borderColor = error ? '#ff5c16' : isDark ? 'rgba(255,255,255,0.12)' : '#e2e8f0';
        }}
      />
      {error && (
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.1rem', color: '#ff5c16' }}>{error}</span>
      )}
    </div>
  );
}
