'use client';

import { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const STEPS = [
  { label: 'CONNECTING TO ETHEREUM...', color: '#00d4ff', delay: 800 },
  { label: 'LOADING DAO DATA...',        color: '#d075ff', delay: 1400 },
  { label: 'INITIALIZING AI AGENTS...',  color: '#f59e0b', delay: 2000 },
  { label: 'RENDERING UNIVERSE...',      color: '#baf24a', delay: 2800 },
] as const;

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    STEPS.forEach((step, i) => {
      const t = setTimeout(() => {
        setActiveStep(i);
        if (i > 0) setCompletedSteps(prev => [...prev, i - 1]);
      }, step.delay);
      timers.push(t);
    });

    const lastComplete = setTimeout(() => {
      setCompletedSteps([0, 1, 2, 3]);
    }, 3200);
    timers.push(lastComplete);

    const done = setTimeout(() => {
      onComplete();
    }, 3600);
    timers.push(done);

    // Animate progress bar
    const start = performance.now();
    const duration = 3200;
    let rafId: number;
    const animate = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setProgress(p * (2 - p)); // ease-out quad
      if (p < 1) rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      timers.forEach(clearTimeout);
      cancelAnimationFrame(rafId);
    };
  }, [onComplete]);

  return (
    <div style={{
      position: 'fixed', inset: 0, background: '#050508', zIndex: 9999,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    }}>
      {/* Dot grid background */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(rgba(0,212,255,0.06) 1px, transparent 1px)',
        backgroundSize: '3.2rem 3.2rem', pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4rem' }}>

        {/* SVG concentric rings */}
        <div style={{ position: 'relative', width: '12rem', height: '12rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="120" height="120" viewBox="0 0 120 120" style={{ position: 'absolute', inset: 0 }}>
            {/* Ring 1 — cyan, 3s */}
            <circle cx="60" cy="60" r="52" fill="none" stroke="#00d4ff" strokeWidth="1" strokeOpacity="0.2" />
            <circle cx="60" cy="60" r="52" fill="none" stroke="#00d4ff" strokeWidth="1.5"
              strokeDasharray="326.7" strokeDashoffset="0"
              style={{ animation: 'ring1 3s linear infinite', transformOrigin: 'center', transform: 'rotate(-90deg)' }}
            />
            {/* Ring 2 — purple, 4s reverse */}
            <circle cx="60" cy="60" r="40" fill="none" stroke="#d075ff" strokeWidth="1" strokeOpacity="0.15" />
            <circle cx="60" cy="60" r="40" fill="none" stroke="#d075ff" strokeWidth="1.5"
              strokeDasharray="251.3" strokeDashoffset="0"
              style={{ animation: 'ring2 4s linear infinite reverse', transformOrigin: 'center', transform: 'rotate(-90deg)' }}
            />
            {/* Ring 3 — cyan slow, 6s */}
            <circle cx="60" cy="60" r="28" fill="none" stroke="#00d4ff" strokeWidth="1" strokeOpacity="0.1" />
            <circle cx="60" cy="60" r="28" fill="none" stroke="#00d4ff" strokeWidth="1"
              strokeDasharray="175.9" strokeDashoffset="0"
              style={{ animation: 'ring3 6s linear infinite', transformOrigin: 'center', transform: 'rotate(-90deg)' }}
            />
          </svg>
          {/* Center core */}
          <div style={{
            position: 'absolute', width: '3.6rem', height: '3.6rem', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,212,255,0.3) 0%, rgba(0,212,255,0.05) 70%)',
            border: '1px solid rgba(0,212,255,0.5)',
            boxShadow: '0 0 2.4rem rgba(0,212,255,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L22 7V17L12 22L2 17V7L12 2Z" stroke="#00d4ff" strokeWidth="1.5" fill="none" />
              <circle cx="12" cy="12" r="2.5" fill="#00d4ff" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontFamily: 'Orbitron, sans-serif', fontSize: '2.4rem', fontWeight: 900,
            letterSpacing: '0.3em', color: '#ffffff', marginBottom: '0.6rem',
          }}>
            AXION
          </div>
          <div style={{
            fontFamily: 'Orbitron, sans-serif', fontSize: '1rem', fontWeight: 700,
            letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase',
          }}>
            INITIALIZING SYSTEMS
          </div>
        </div>

        {/* Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '34rem' }}>
          {STEPS.map((step, i) => {
            const done = completedSteps.includes(i);
            const active = activeStep === i && !done;
            return (
              <div key={step.label} style={{
                display: 'flex', alignItems: 'center', gap: '1rem',
                opacity: i <= activeStep ? 1 : 0.25,
                transition: 'opacity 300ms ease',
              }}>
                <div style={{
                  width: '1.6rem', height: '1.6rem', borderRadius: '50%', flexShrink: 0,
                  border: `1px solid ${done ? step.color : 'rgba(255,255,255,0.12)'}`,
                  background: done ? `${step.color}22` : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 250ms ease',
                }}>
                  {done ? (
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1 4l2 2 4-4" stroke={step.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : active ? (
                    <div style={{ width: '0.6rem', height: '0.6rem', borderRadius: '50%', background: step.color, animation: 'dot-pulse 1s infinite' }} />
                  ) : null}
                </div>
                <span style={{
                  fontFamily: 'JetBrains Mono, monospace', fontSize: '1rem',
                  color: done ? step.color : active ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.2)',
                  letterSpacing: '0.05em', transition: 'color 250ms ease',
                }}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div style={{ width: '34rem' }}>
          <div style={{ height: '0.2rem', background: 'rgba(255,255,255,0.06)', borderRadius: '0.1rem', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${progress * 100}%`,
              background: 'linear-gradient(90deg, #00d4ff 0%, #d075ff 100%)',
              boxShadow: '0 0 0.8rem rgba(0,212,255,0.5)',
              transition: 'width 100ms linear',
            }} />
          </div>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '0.9rem',
            color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em',
            marginTop: '0.6rem', textAlign: 'right',
          }}>
            {Math.round(progress * 100)}%
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ring1 {
          from { stroke-dashoffset: 326.7; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes ring2 {
          from { stroke-dashoffset: 0; }
          to   { stroke-dashoffset: 251.3; }
        }
        @keyframes ring3 {
          from { stroke-dashoffset: 175.9; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes dot-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.6); }
        }
      `}</style>
    </div>
  );
}
