import { cn } from '@/lib/utils';

interface ScannerLineProps {
  className?: string;
  duration?: string;
}

export function ScannerLine({ className, duration = '8s' }: ScannerLineProps) {
  return (
    <div 
      className={cn("scanner-line overflow-hidden pointer-events-none", className)}
      style={{ animationDuration: duration }}
    />
  );
}
