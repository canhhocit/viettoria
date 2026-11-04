import React from 'react';
import { HeritageLoader } from './HeritageLoader';

interface SkeletonProps {
  className?: string;
}

export const SkeletonBox: React.FC<SkeletonProps> = ({ className = '' }) => (
  <div className={`heritage-shimmer border border-paper-border/60 ${className}`} />
);

export const SkeletonText: React.FC<SkeletonProps> = ({ className = 'h-4 w-full' }) => (
  <div className={`heritage-shimmer rounded-none ${className}`} />
);

export const PageLoadingHeritage: React.FC<{ 
  message?: string;
  submessage?: string;
  blur?: boolean;
}> = ({ 
  message = 'Đang khởi tạo không gian khảo cứu di sản...',
  submessage = 'Nền tảng số hóa kiến trúc Viettoria',
  blur = true
}) => {
  return (
    <div className="relative min-h-[75vh] w-full flex items-center justify-center bg-paper">
      <HeritageLoader
        variant="overlay"
        size="lg"
        blur={blur}
        message={message}
        submessage={submessage}
        showWordmark={true}
        theme="paper"
      />
    </div>
  );
};
