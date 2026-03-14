'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface StatCounterProps {
  value: string;
  label: string;
  prefix?: string;
  suffix?: string;
}

export default function StatCounter({ value, label, prefix = '', suffix = '' }: StatCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = numericValue / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= numericValue) {
        setDisplayValue(numericValue);
        clearInterval(timer);
      } else {
        setDisplayValue(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [numericValue]);

  return (
    <div className="flex flex-col items-center">
      <div className="font-mono text-3xl font-bold text-text-primary mb-2 tracking-tighter">
        {prefix}{displayValue.toLocaleString(undefined, { maximumFractionDigits: 1 })}{suffix}
      </div>
      <div className="font-orbitron text-[9px] text-text-tertiary tracking-[0.3em] uppercase">
        {label}
      </div>
    </div>
  );
}
