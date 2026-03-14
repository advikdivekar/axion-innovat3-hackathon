'use client';

import ModulePageHero from '@/components/marketing/ModulePageHero';
import ModuleShowcase from '@/components/marketing/ModuleShowcase';
import Link from 'next/link';

export default function TreasuryPage() {
  const features = [
    { 
      title: 'Live Balance Tracking', 
      description: 'Real-time multi-chain balance monitoring. See every token in your DAO treasury across all protocols in one interface.', 
      icon: '💰' 
    },
    { 
      title: 'Token Flow Maps', 
      description: 'Visualize how funds move in and out of the treasury. Identify large transfers and unusual patterns instantly.', 
      icon: '⚡' 
    },
    { 
      title: 'DeFi Position Monitoring', 
      description: 'Track the health of your LP positions, staking, and yields. AI-powered runway estimation for DAO operations.', 
      icon: '🌀' 
    },
    { 
      title: 'Risk Alerts', 
      description: 'Automated alerts for treasury drains, rug-pulls, or bridge exploits. Your financial security is our primary mission.', 
      icon: '🛡️' 
    }
  ];

  return (
    <div className="bg-void-deepest min-h-screen">
      <ModulePageHero 
        title="THE TREASURY REACTOR" 
        tagline="Your treasury is a living reactor. Monitor every token. Detect every anomaly." 
        accentColor="gold" 
      />

      {/* Visual Showcase (CSS Simulation) */}
      <section className="py-24 border-b border-black/5">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 holo-panel aspect-square flex items-center justify-center p-12 overflow-hidden bg-void-mid">
             <div className="relative w-full h-full">
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-32 h-32 rounded-full bg-gold-500/10 border-2 border-gold-500 animate-pulse shadow-[0_0_100px_rgba(255,215,0,0.4)]"></div>
                   <div className="absolute w-48 h-48 rounded-full border border-gold-500/20 animate-spin" style={{ animationDuration: '10s' }}></div>
                   <div className="absolute w-64 h-64 rounded-full border border-gold-500/10 animate-spin" style={{ animationDuration: '20s', animationDirection: 'reverse' }}></div>
                </div>
                {/* Simulated Energy Lines */}
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-500/30 to-transparent"></div>
                <div className="absolute top-0 left-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-gold-500/30 to-transparent"></div>
                <div className="absolute top-[20%] right-[20%] text-gold-500 font-mono text-xs">FLOW_RATE: 2.4 ETH/HR</div>
                <div className="absolute bottom-[20%] left-[20%] text-gold-500 font-mono text-xs">READY_FOR_FUSION</div>
             </div>
          </div>
          <div className="order-1 lg:order-2">
            <span className="font-orbitron text-sm text-gold-500 tracking-widest uppercase">0002. TREASURY THERMODYNAMICS</span>
            <h2 className="text-xl mt-4 mb-8">THE PULSE OF WEALTH</h2>
            <p className="font-rajdhani text-lg text-text-tertiary mb-12 leading-relaxed">
              Managing a DAO treasury shouldn&apos;t feel like reading a spreadsheet. The Treasury Reactor transforms complex financial data into a thermal visualization of asset flow, liquidity depth, and risk exposure.
            </p>
            <div className="flex flex-col gap-4">
               <div className="h-2 w-full bg-black/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gold-500 w-[68%]" />
               </div>
               <div className="flex justify-between font-mono text-[10px] text-text-tertiary uppercase">
                  <span>Stability Index</span>
                  <span className="text-gold-500">68% NORMAL</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      <ModuleShowcase features={features} accentColor="gold" />

      {/* Final CTA */}
      <section className="py-32 text-center bg-void-deepest">
         <div className="container mx-auto px-6">
            <h2 className="text-hero mb-8">SECURE THE BAG</h2>
            <Link href="/app/treasury" className="glow-btn !text-gold-500 border-gold-500 shadow-[0_0_30px_rgba(255,215,0,0.3)] hover:!bg-gold-500">
              Launch Command Center →
            </Link>
         </div>
      </section>
    </div>
  );
}
