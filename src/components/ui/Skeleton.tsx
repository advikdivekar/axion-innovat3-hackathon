'use client';

interface SkeletonProps {
  isLoading: boolean;
  children: React.ReactNode;
  height?: string;
  borderRadius?: string;
  width?: string;
}

export function Skeleton({ isLoading, children, height = '4rem', borderRadius = '0.8rem', width = '100%' }: SkeletonProps) {
  if (isLoading) {
    return (
      <div
        className="skeleton"
        style={{ height, borderRadius, width }}
        aria-hidden="true"
      />
    );
  }
  return <>{children}</>;
}

// Multi-row skeleton for lists/tables
interface SkeletonListProps {
  rows?: number;
  rowHeight?: string;
  gap?: string;
}

export function SkeletonList({ rows = 5, rowHeight = '5.6rem', gap = '1.2rem' }: SkeletonListProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap }}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="skeleton" style={{ height: rowHeight, borderRadius: '0.8rem' }} />
      ))}
    </div>
  );
}
