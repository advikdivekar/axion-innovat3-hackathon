import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { ScannerLine } from './ScannerLine';

interface SectionContainerProps {
  children: ReactNode;
  className?: string;
  crosshairs?: ('tl' | 'tr' | 'bl' | 'br')[];
  borderBottom?: boolean;
  withScanner?: boolean;
}

export function SectionContainer({ 
  children, 
  className,
  crosshairs = [],
  borderBottom = true,
  withScanner = false
}: SectionContainerProps) {
  return (
    <section className={cn(
      "relative w-full max-w-[1440px] mx-auto",
      borderBottom && "border-cosmos-b",
      className
    )}>
      {withScanner && <ScannerLine />}
      
      {crosshairs.includes('tl') && <div className="cgp-crosshair cgp-crosshair-tl"></div>}
      {crosshairs.includes('tr') && <div className="cgp-crosshair cgp-crosshair-tr"></div>}
      {crosshairs.includes('bl') && <div className="cgp-crosshair cgp-crosshair-bl"></div>}
      {crosshairs.includes('br') && <div className="cgp-crosshair cgp-crosshair-br"></div>}
      
      {children}
    </section>
  );
}
