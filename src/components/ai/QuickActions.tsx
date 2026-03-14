// src/components/ai/QuickActions.tsx
'use client';

interface QuickActionsProps {
  onAction: (command: string) => void;
}

const QUICK_COMMANDS = [
  { label: 'SUMMARIZE', command: 'Give me a 30-second summary of the current DAO state.' },
  { label: 'RISKS', command: 'What are the top 3 risks facing this DAO right now?' },
  { label: 'PREDICT', command: 'Predict the outcome of the most active proposal.' },
  { label: 'HEALTH', command: 'Run a full health check on the treasury.' },
  { label: 'THREATS', command: 'Are there any active security threats?' },
];

export function QuickActions({ onAction }: QuickActionsProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {QUICK_COMMANDS.map((cmd) => (
        <button key={cmd.label} onClick={() => onAction(cmd.command)} className="px-3 py-1 rounded text-[10px] font-display uppercase tracking-[0.15em] border border-[rgba(0,240,255,0.2)] text-[#8892a8] hover:border-[rgba(0,240,255,0.5)] hover:text-[#00f0ff] hover:shadow-[0_0_10px_rgba(0,240,255,0.1)] transition-all duration-200 cursor-pointer bg-[rgba(0,240,255,0.03)]">
          {cmd.label}
        </button>
      ))}
    </div>
  );
}
