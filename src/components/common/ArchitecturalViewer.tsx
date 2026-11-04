import React, { useState, useEffect } from 'react';
import { Maximize2, Eye, ShieldCheck, Ruler, Layers, X, ZoomIn, Box } from 'lucide-react';
import type { Product } from '../../types';
import { resolve3DModelUrl, resolveImageUrl, handleImageFallback, VIETTORIA_IMAGES } from '../../utils/mediaResolver';

interface ArchitecturalViewerProps {
  product: Product;
}

export const ArchitecturalViewer: React.FC<ArchitecturalViewerProps> = ({ product }) => {
  const [activeTab, setActiveTab] = useState<'3d' | 'photos'>('3d');
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

  // Gallery angles combining hero, gallery images and authentic atelier photos
  const rawGallery = product.galleryImages && product.galleryImages.length > 0 
    ? product.galleryImages 
    : [product.heroImage, VIETTORIA_IMAGES.productHighlight, VIETTORIA_IMAGES.monumentDetail1];

  const angles = [
    {
      title: 'Góc Trực Diện Chính Diện',
      caption: 'Trục đối xứng đăng đối, kết cấu chuẩn mực theo thư tịch cổ',
      src: resolveImageUrl(product.heroImage),
    },
    ...rawGallery.map((img, idx) => ({
      title: `Góc Khảo Cứu & Cấu Kiện 0${idx + 2}`,
      caption: 'Tỉ lệ kết cấu mộng ngàm xà nách, đầu đao uốn cong thanh thoát',
      src: resolveImageUrl(img, VIETTORIA_IMAGES.monumentDetail1),
    })),
  ];

  const currentImage = angles[selectedAngle] || angles[0];
  const model3dUrl = resolve3DModelUrl(product.model3dUrl || product.slug);

  return (
    <div className="bg-[#F3EBDD] border border-[#D8CCB8] relative rounded-[2px] shadow-xs overflow-hidden">
      {/* Top Header: Tab Selector & Specs */}
      <div className="p-3.5 sm:p-4 border-b border-[#D8CCB8] flex flex-wrap items-center justify-between gap-3 bg-[#F9F4E8]">
        {/* View Mode Tabs */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setActiveTab('3d')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-[2px] transition-all ${
              activeTab === '3d'
                ? 'bg-[#745C42] text-white font-semibold shadow-xs'
                : 'bg-[#EDE4D2] text-[#554231] hover:text-[#745C42] hover:bg-[#E2D3BA]'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span>Mô Hình 3D Số Hóa</span>
          </button>

          <button
            onClick={() => setActiveTab('photos')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-[2px] transition-all ${
              activeTab === 'photos'
                ? 'bg-[#745C42] text-white font-semibold shadow-xs'
                : 'bg-[#EDE4D2] text-[#554231] hover:text-[#745C42] hover:bg-[#E2D3BA]'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Tư Liệu Thực Địa</span>
          </button>
        </div>

        {/* Technical specs indicators */}
        <div className="flex items-center gap-3 sm:gap-4 text-xs font-mono text-[#796857]">
          <span className="flex items-center gap-1.5">
            <Ruler className="w-3.5 h-3.5 text-[#B88A38]" />
            <span>Tỷ lệ {product.modelSpecs.scale}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#B88A38]" />
            <span>{product.modelSpecs.partsCount} Cấu Kiện</span>
          </span>
        </div>
      </div>

      {/* Main Viewport */}
      {activeTab === '3d' ? (
        /* 3D WebGL Model Viewport */
        <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-[#FAF7F0] flex items-center justify-center">
          {/* @ts-expect-error Google model-viewer custom element */}
          <model-viewer
            src={model3dUrl}
            poster={currentImage.src}
            alt={`Mô hình 3D ${product.name}`}
            camera-controls
            auto-rotate
            shadow-intensity="1.2"
            exposure="1.05"
            loading="lazy"
            style={{ width: '100%', height: '100%', backgroundColor: '#FAF7F0' }}
          >
            {/* Fallback Slot inside model-viewer if WebGL is disabled */}
            <div slot="poster" className="w-full h-full flex items-center justify-center bg-[#FAF7F0]">
              <img
                src={currentImage.src}
                alt={product.name}
                className="w-full h-full object-contain"
                onError={(e) => handleImageFallback(e, VIETTORIA_IMAGES.productHighlight)}
              />
            </div>
          {/* @ts-expect-error Google model-viewer custom element */}
          </model-viewer>

          {/* Top-Right Badge: Authenticity Guarantee */}
          <div className="absolute top-4 right-4 bg-[#142820]/90 backdrop-blur-sm border border-[#B88A38]/50 px-3 py-1.5 text-white text-[10px] font-mono uppercase tracking-widest flex items-center gap-1.5 shadow-md pointer-events-none rounded-[2px]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#B88A38]" />
            <span>Tệp 3D Draco Chuẩn PBR</span>
          </div>

          {/* Bottom Floating Control Hint */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
            <div className="bg-[#142820]/85 backdrop-blur-sm border border-white/15 text-white px-3 py-1.5 text-xs font-mono tracking-wider max-w-[85%] rounded-[2px]">
              <span className="text-[#B88A38] font-bold">Tương tác 3D:</span>{' '}
              <span className="text-white/80 font-light hidden sm:inline">Kéo chuột để xoay 360°, cuộn để phóng to/thu nhỏ</span>
            </div>
          </div>
        </div>
      ) : (
        /* Photographic Inspection Viewport */
        <div 
          onClick={() => setIsZoomModalOpen(true)}
          className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-[#FAF7F0] flex items-center justify-center group cursor-zoom-in"
          title="Nhấp để phóng to chi tiết"
        >
          <img
            src={currentImage.src}
            alt={`${product.name} - ${currentImage.title}`}
            onError={(e) => handleImageFallback(e, VIETTORIA_IMAGES.productHighlight)}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Blueprint Grid Lines Overlay Subtle */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-15 bg-[linear-gradient(to_right,#B88A38_1px,transparent_1px),linear-gradient(to_bottom,#B88A38_1px,transparent_1px)] bg-[size:32px_32px]"
            aria-hidden="true"
          />

          {/* Top-Right Badge */}
          <div className="absolute top-4 right-4 bg-[#142820]/90 backdrop-blur-sm border border-[#B88A38]/50 px-3 py-1.5 text-white text-[10px] font-mono uppercase tracking-widest flex items-center gap-1.5 shadow-md pointer-events-none rounded-[2px]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#B88A38]" />
            <span>Tư Liệu Thực Địa Chuẩn Xác</span>
          </div>

          {/* Center Hover Magnifier Hint */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="bg-[#142820]/85 border border-[#B88A38]/60 px-4 py-2 text-white text-xs font-mono tracking-widest uppercase flex items-center gap-2 shadow-xl backdrop-blur-sm rounded-[2px]">
              <ZoomIn className="w-4 h-4 text-[#B88A38]" />
              <span>Soi Chi Tiết Cấu Kiện</span>
            </div>
          </div>

          {/* Bottom Floating Bar */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
            <div className="bg-[#142820]/85 backdrop-blur-sm border border-white/15 text-white px-3 py-1.5 text-xs font-mono tracking-wider max-w-[80%] pointer-events-auto rounded-[2px]">
              <span className="text-[#B88A38] font-bold">{currentImage.title}:</span>{' '}
              <span className="text-white/80 font-light hidden sm:inline">{currentImage.caption}</span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsZoomModalOpen(true);
              }}
              className="p-2.5 bg-[#142820]/85 hover:bg-[#745C42] text-white border border-[#B88A38]/40 pointer-events-auto transition-colors shadow-lg rounded-[2px]"
              title="Phóng to chi tiết khảo cứu"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Angle Selector Tabs (Visible in photo mode or for reference) */}
      <div className="p-3 bg-[#F9F4E8] border-t border-[#D8CCB8] flex items-center gap-2 overflow-x-auto">
        {angles.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setActiveTab('photos');
              setSelectedAngle(idx);
            }}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-mono tracking-wider whitespace-nowrap transition-all border rounded-[2px] ${
              activeTab === 'photos' && selectedAngle === idx
                ? 'bg-[#745C42] text-white border-[#745C42] font-semibold shadow-xs'
                : 'bg-[#F3EBDD] border-[#D8CCB8] text-[#554231] hover:border-[#B88A38] hover:text-[#3B2B1D]'
            }`}
          >
            <span>Góc 0{idx + 1}</span>
          </button>
        ))}
      </div>

      {/* Fullscreen Zoom Modal */}
      {isZoomModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-[#0D1C16]/95 flex flex-col items-center justify-center p-4 backdrop-blur-md"
          onClick={() => setIsZoomModalOpen(false)}
        >
          {/* Close button in top corner */}
          <button 
            onClick={() => setIsZoomModalOpen(false)}
            className="absolute top-6 right-6 p-2 bg-[#142820] border border-[#B88A38]/50 text-white hover:bg-[#745C42] transition-colors shadow-xl rounded-[2px]"
            title="Đóng (Phím Esc)"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative max-w-5xl max-h-[85vh] overflow-hidden" onClick={e => e.stopPropagation()}>
            <img
              src={currentImage.src}
              alt={currentImage.title}
              onError={(e) => handleImageFallback(e, VIETTORIA_IMAGES.productHighlight)}
              className="max-w-full max-h-[80vh] object-contain border border-[#B88A38]/60 shadow-2xl rounded-[2px]"
            />
            <div className="mt-3 flex items-center justify-between text-xs font-mono text-white tracking-wider uppercase">
              <span className="text-[#B88A38] font-bold">{product.name} — {currentImage.title}</span>
              <span className="text-white/60 text-[11px]">Nhấp ra ngoài hoặc bấm ESC để đóng</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArchitecturalViewer;
