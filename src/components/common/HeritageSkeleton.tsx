import React from 'react';

interface SkeletonProps {
  className?: string;
}

export const SkeletonBox: React.FC<SkeletonProps> = ({ className = '' }) => (
  <div className={`heritage-shimmer border border-paper-border/60 ${className}`} />
);

export const SkeletonText: React.FC<SkeletonProps> = ({ className = 'h-4 w-full' }) => (
  <div className={`heritage-shimmer rounded-none ${className}`} />
);

export const PageLoadingHeritage: React.FC<{ message?: string }> = ({ 
  message = 'Đang khởi tạo không gian khảo cứu di sản...' 
}) => {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center bg-paper px-4 py-16 animate-fade-up">
      {/* Heritage Frame with Shimmer */}
      <div className="w-full max-w-xl p-8 bg-paper-warm border border-brass/40 corner-frame space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-paper-border pb-4">
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 flex items-center justify-center border border-brass/60 bg-forest text-brass font-serif font-bold text-xs">
              V
            </span>
            <span className="text-[11px] font-mono tracking-widest uppercase text-brass font-semibold">
              VIETTORIA ATELIER
            </span>
          </div>
          <span className="text-[10px] font-mono text-charcoal-muted uppercase">
            1:120 SCALE
          </span>
        </div>

        {/* Shimmer placeholders */}
        <div className="space-y-3">
          <div className="h-6 w-3/4 heritage-shimmer" />
          <div className="h-3 w-full heritage-shimmer" />
          <div className="h-3 w-5/6 heritage-shimmer" />
        </div>

        <div className="h-36 w-full heritage-shimmer border border-paper-border/70" />

        <div className="pt-2 flex items-center justify-between text-xs font-mono text-charcoal-muted">
          <span className="inline-flex items-center gap-2 text-forest font-semibold">
            <span className="w-2 h-2 bg-brass inline-block animate-pulse" />
            {message}
          </span>
          <span className="text-[10px] text-paper-muted font-mono tracking-widest uppercase">
            VIETTORIA
          </span>
        </div>
      </div>
    </div>
  );
};
