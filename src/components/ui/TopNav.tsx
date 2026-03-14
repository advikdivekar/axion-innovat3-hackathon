import { ActionButton } from './ActionButton';

export function TopNav() {
  return (
    <nav className="w-full border-cosmos-b bg-[var(--void-deep)]/80 backdrop-blur-md sticky top-0 z-50 transition-all font-mono">
      {/* 1440px constraint to match SectionContainer */}
      <div className="max-w-[1440px] mx-auto flex items-stretch h-16 relative">
        <div className="cgp-crosshair cgp-crosshair-bl" />
        <div className="cgp-crosshair cgp-crosshair-br" />

        {/* Logo Block */}
        <div className="border-cosmos-r px-6 flex items-center justify-center bg-[var(--void-deepest)]">
          <span className="font-display font-bold text-lg tracking-widest text-text-primary drop-shadow-[0_0_8px_rgba(0,240,255,0.5)]">
            DAO<span className="text-[var(--cosmos-cyan)]">.OS</span>
          </span>
        </div>

        {/* Technical Data Block (Hidden on mobile) */}
        <div className="hidden lg:flex items-center px-6 border-cosmos-r text-[10px] text-[var(--text-secondary)] uppercase tracking-widest gap-4">
          <span>[NET: <span className="text-[var(--cosmos-cyan)] drop-shadow-[0_0_5px_var(--cosmos-cyan)]">OPTIMAL</span>]</span>
          <span>[TPS: 4,021]</span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex flex-1 items-center justify-center gap-12 text-xs uppercase tracking-widest font-bold">
          <a href="#" className="text-text-primary hover:text-[var(--cosmos-cyan)] transition-colors relative group">
            Incubation
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--cosmos-cyan)] transition-all group-hover:w-full drop-shadow-[0_0_8px_var(--cosmos-cyan)]" />
          </a>
          <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--cosmos-cyan)] transition-colors relative group">
            Portfolio
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--cosmos-cyan)] transition-all group-hover:w-full drop-shadow-[0_0_8px_var(--cosmos-cyan)]" />
          </a>
          <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--cosmos-cyan)] transition-colors relative group">
            Network
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--cosmos-cyan)] transition-all group-hover:w-full drop-shadow-[0_0_8px_var(--cosmos-cyan)]" />
          </a>
        </div>
        <div className="flex-1 md:hidden" /> {/* Flex spacer for mobile */}

        {/* Action Button Block */}
        <div className="border-cosmos-l flex items-stretch px-4 py-2 bg-[var(--void-deepest)]">
          <button className="glow-button h-full text-[10px]">
            Initialize
          </button>
        </div>

      </div>
    </nav>
  );
}
