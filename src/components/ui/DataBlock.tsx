import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface DataBlockProps {
  label: string;
  value: ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  highlight?: boolean;
  className?: string;
}

export function DataBlock({ label, value, trend, trendValue, highlight = false, className }: DataBlockProps) {
  return (
    <div className={cn(
      "flex flex-col gap-1 p-3 bg-black/40 border-l-2",
      highlight ? "border-[var(--color-neon-cyan)]" : "border-[var(--color-glass-border)]",
      className
    )}>
      <span className="text-[10px] uppercase tracking-widest text-gray-500 font-mono">
        {label}
      </span>
      <div className="flex items-baseline gap-2">
        <span className={cn(
          "font-display text-lg",
          highlight ? "text-[var(--color-neon-cyan)]" : "text-text-primary"
        )}>
          {value}
        </span>
        
        {trend && trendValue && (
          <span className={cn(
            "text-[10px] font-mono",
            trend === 'up' && "text-green-700",
            trend === 'down' && "text-[var(--color-alert-red)]",
            trend === 'neutral' && "text-gray-400"
          )}>
            {trend === 'up' ? '▲' : trend === 'down' ? '▼' : '▬'} {trendValue}
          </span>
        )}
      </div>
    </div>
  );
}
