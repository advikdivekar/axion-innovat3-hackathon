import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  children: React.ReactNode;
}

export function ActionButton({ 
  children, 
  variant = 'primary', 
  className, 
  ...props 
}: ActionButtonProps) {
  return (
    <button
      className={cn(
        "font-display text-xs uppercase tracking-widest py-3 px-6 transition-all duration-300 relative overflow-hidden group flex items-center gap-2",
        {
          "bg-[var(--color-cgp-orange)] text-text-primary hover:bg-[#e66e00] hover:-translate-y-0.5 shadow-[0_4px_14px_0_rgba(255,122,0,0.39)] hover:shadow-[0_6px_20px_0_rgba(255,122,0,0.5)]": variant === 'primary',
          "bg-transparent text-[var(--color-cgp-black)] border border-[var(--color-cgp-black)] hover:bg-[var(--color-cgp-black)] hover:text-text-primary": variant === 'outline',
          "bg-transparent text-[var(--color-cgp-black)] hover:text-[var(--color-cgp-orange)]": variant === 'ghost',
        },
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {variant === 'primary' && (
        <span className="w-1.5 h-1.5 bg-black rounded-full group-hover:scale-150 transition-transform"></span>
      )}
    </button>
  );
}
