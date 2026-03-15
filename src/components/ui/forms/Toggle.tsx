'use client';

interface ToggleProps {
  checked: boolean;
  onChange: (val: boolean) => void;
  label?: string;
  color?: string;
}

export function Toggle({ checked, onChange, label, color = '#00d4ff' }: ToggleProps) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}>
      <div
        onClick={() => onChange(!checked)}
        style={{
          width: '3.6rem', height: '2rem', borderRadius: '10rem',
          background: checked ? color : 'rgba(255,255,255,0.12)',
          position: 'relative', transition: 'background 200ms ease', flexShrink: 0,
        }}
      >
        <div style={{
          position: 'absolute', top: '0.3rem', left: checked ? '1.9rem' : '0.3rem',
          width: '1.4rem', height: '1.4rem', borderRadius: '50%', background: '#ffffff',
          transition: 'left 200ms ease', boxShadow: '0 0.1rem 0.3rem rgba(0,0,0,0.3)',
        }} />
      </div>
      {label && (
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.3rem', color: 'rgba(255,255,255,0.7)' }}>
          {label}
        </span>
      )}
    </label>
  );
}
