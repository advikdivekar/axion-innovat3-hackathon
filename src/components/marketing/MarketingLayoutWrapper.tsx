'use client';

import { usePathname } from 'next/navigation';
import { MarketingNav } from './MarketingNav';
import { MarketingFooter } from './MarketingFooter';

interface MarketingLayoutWrapperProps {
  children: React.ReactNode;
}

export function MarketingLayoutWrapper({ children }: MarketingLayoutWrapperProps) {
  const pathname = usePathname();
  const isApp = pathname?.startsWith('/app');

  if (isApp) {
    return <>{children}</>;
  }

  return (
    <div>
      <MarketingNav />
      <main>
        {children}
      </main>
      <MarketingFooter />
    </div>
  );
}
