import React, { useState, useEffect } from 'react';
import { Maximize2, Eye, ShieldCheck, Ruler, Layers, X, ZoomIn } from 'lucide-react';
import type { Product } from '../../types';

interface ArchitecturalViewerProps {
  product: Product;
}

export const ArchitecturalViewer: React.FC<ArchitecturalViewerProps> = ({ product }) => {
  const [selectedAngle, setSelectedAngle] = useState(0);
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);

  // Close zoom modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsZoomModalOpen(false);
    };
    if (isZoomModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isZoomModalOpen]);

  // Gallery angles combining hero and gallery images
  const angles = [
    {
      title: 'Góc Trực Diện Chính Diện',
      caption: 'Trục đối xứng đăng đối, cột trụ tròn đặt trên hồ Linh Chiểu',
      src: product.heroImage,
    },
    ...(product.galleryImages || []).map((img, idx) => ({
      title: `Góc Phối Cảnh & Chi Tiết 0${idx + 2}`,
      caption: 'Tỉ lệ kết cấu xà nách, đầu đao uốn cong thanh thoát',
      src: img,
    })),
  ];

  const currentImage = angles[selectedAngle] || angles[0];

  return (
    <div className="bg-paper-warm border border-paper-border corner-frame relative">
      {/* Top Status & Scale Indicator */}
      <div className="p-4 border-b border-paper-border flex flex-wrap items-center justify-between gap-3 bg-paper">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-brass inline-block"></span>
          <span className="text-[11px] font-mono uppercase tracking-widest text-forest font-semibold">
            Khung Khảo Sát Kiến Trúc Đa Điểm Nhìn
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-charcoal-muted">
          <span className="flex items-center gap-1.5">
            <Ruler className="w-3.5 h-3.5 text-brass" />
            <span>Tỷ lệ {product.modelSpecs.scale}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-brass" />
            <span>{product.modelSpecs.partsCount} Mộng Gỗ</span>
          </span>
        </div>
      </div>

      {/* Main Photographic Inspection Viewport */}
      <div 
        onClick={() => setIsZoomModalOpen(true)}
        className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-forest-dark flex items-center justify-center group cursor-zoom-in"
        title="Nhấp để soi chi tiết cấu kiện"
      >
        <img
          src={currentImage.src}
          alt={`${product.name} - ${currentImage.title}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Blueprint Grid Lines Overlay Subtle */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#B88A44_1px,transparent_1px),linear-gradient(to_bottom,#B88A44_1px,transparent_1px)] bg-[size:32px_32px]"
          aria-hidden="true"
        />

        {/* Top-Right Badge: Authenticity Guarantee */}
        <div className="absolute top-4 right-4 bg-forest/90 backdrop-blur-sm border border-brass/50 px-3 py-1.5 text-paper text-[10px] font-mono uppercase tracking-widest flex items-center gap-1.5 shadow-md pointer-events-none">
          <ShieldCheck className="w-3.5 h-3.5 text-brass" />
          <span>Tư Liệu Thực Địa Chuẩn Xác</span>
        </div>

        {/* Center Hover Magnifier Hint */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-forest-dark/80 border border-brass/60 px-4 py-2 text-paper text-xs font-mono tracking-widest uppercase flex items-center gap-2 shadow-2xl backdrop-blur-sm">
            <ZoomIn className="w-4 h-4 text-brass" />
            <span>Soi Chi Tiết Cấu Kiện</span>
          </div>
        </div>

        {/* Bottom Floating Bar */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
          <div className="bg-forest/85 backdrop-blur-sm border border-paper/15 text-paper px-3 py-1.5 text-xs font-mono tracking-wider max-w-[80%] pointer-events-auto">
            <span className="text-brass font-bold">{currentImage.title}:</span>{' '}
            <span className="text-paper/80 font-light hidden sm:inline">{currentImage.caption}</span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsZoomModalOpen(true);
            }}
            className="p-2.5 bg-forest/85 hover:bg-brass hover:text-forest text-paper border border-brass/40 pointer-events-auto transition-colors shadow-lg"
            title="Phóng to chi tiết khảo cứu"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Angle Selector Tabs */}
      <div className="p-3 bg-paper border-t border-paper-border flex items-center gap-2 overflow-x-auto">
        {angles.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedAngle(idx)}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-mono tracking-wider whitespace-nowrap transition-all border ${
              selectedAngle === idx
                ? 'bg-forest text-paper border-forest font-semibold shadow-sm'
                : 'bg-paper-warm border-paper-border text-charcoal hover:border-brass'
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-brass" />
            <span>Góc 0{idx + 1}</span>
          </button>
        ))}
      </div>

      {/* Fullscreen Zoom Modal */}
      {isZoomModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-forest-dark/95 flex flex-col items-center justify-center p-4 backdrop-blur-md animate-fade-up"
          onClick={() => setIsZoomModalOpen(false)}
        >
          {/* Close button in top corner */}
          <button 
            onClick={() => setIsZoomModalOpen(false)}
            className="absolute top-6 right-6 p-2 bg-forest border border-brass/50 text-paper hover:bg-brass hover:text-forest transition-colors shadow-xl"
            title="Đóng (Phím Esc)"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative max-w-5xl max-h-[85vh] overflow-hidden" onClick={e => e.stopPropagation()}>
            <img
              src={currentImage.src}
              alt={currentImage.title}
              className="max-w-full max-h-[80vh] object-contain border border-brass/60 shadow-2xl"
            />
            <div className="mt-3 flex items-center justify-between text-xs font-mono text-paper tracking-wider uppercase">
              <span className="text-brass font-bold">{product.name} — {currentImage.title}</span>
              <span className="text-paper/60 text-[11px]">Nhấp ngoài hoặc phím ESC để đóng</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArchitecturalViewer;
