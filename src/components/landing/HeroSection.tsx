import React from 'react';
import type { HeritageSKU } from '../../types/heritage';
import { QrCode, Compass, Eye } from 'lucide-react';

interface HeroSectionProps {
  heroItem?: HeritageSKU;
  onExploreMap: () => void;
  onOpenQRDemo: () => void;
  onExploreAssembly: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreMap,
  onOpenQRDemo,
  onExploreAssembly,
}) => {
  return (
    <section className="relative min-h-[720px] lg:min-h-[820px] overflow-hidden border-b border-[#b8aa8d] bg-[#f8f1e3]">
      {/* Background Video / Heritage Panorama */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/hero-background.webm"
        poster="/images/van-mieu-quoc-tu-giam.webp"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />

      {/* Dimming & Ambient Paper Gradient Fades */}
      <div className="pointer-events-none absolute inset-0 bg-[rgba(45,40,32,0.12)]"></div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-full bg-gradient-to-r from-[rgba(248,241,227,0.96)] via-[rgba(248,241,227,0.85)] to-transparent md:w-[78%] lg:w-[64%]"></div>
      <div className="heritage-grain pointer-events-none absolute inset-y-0 left-0 w-full opacity-40 md:w-[78%] lg:w-[64%]"></div>

      {/* Watermark Chim Lạc (Bronze Drum Bird Motif from Disanviet) */}
      <img
        className="pointer-events-none absolute bottom-4 left-0 z-10 h-[28%] w-auto object-contain opacity-85 sm:h-[34%] lg:h-[38%]"
        src="/images/chim-lac.webp"
        alt=""
        aria-hidden="true"
      />

      {/* Content Container */}
      <div className="relative z-20 mx-auto flex h-full min-h-[720px] lg:min-h-[820px] max-w-7xl items-center px-4 py-28 sm:px-6 lg:px-8">
        <div className="flex w-full max-w-2xl flex-col justify-center py-6 lg:max-w-[620px]">
          {/* Eyebrow Dotted Tag */}
          <div className="flex items-center gap-2">
            <p className="w-fit border-b border-dotted border-[#6f5830] pb-1 font-serif text-2xl text-[#6f5830] sm:text-3xl">
              Văn minh Đại Việt
            </p>
            <span className="text-xs font-mono text-[#9b7a3a] uppercase tracking-widest bg-white/70 px-2 py-0.5 rounded border border-[#b8aa8d]">
              PSI 2026
            </span>
          </div>

          {/* Grand Heading */}
          <h1 className="mt-4 font-serif text-5xl leading-[1.08] text-[#5a4325] sm:text-6xl xl:text-7xl font-bold tracking-tight">
            Di Sản <br />
            <span className="text-[#9b7a3a] italic font-normal">Việt Nam</span>
          </h1>

          {/* Subheading */}
          <p className="mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-[#2d2820] font-light">
            Hành trình số hóa bảo tàng, di tích và tái hiện kiệt tác kiến trúc Thăng Long - Cố đô Huế thành mô hình in 3D tinh xảo kết hợp nền tảng số hóa tương tác đa giác quan.
          </p>

          {/* Call to Actions */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={onExploreMap}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 bg-[#6f5830] text-[#fffaf0] hover:bg-[#9b7a3a] transition-all shadow-lg text-sm font-semibold tracking-wide"
            >
              <Compass className="w-4 h-4 text-[#f6d99b]" />
              <span>Khám Phá Bản Đồ Di Sản</span>
            </button>

            <button
              onClick={onOpenQRDemo}
              className="inline-flex items-center gap-2 rounded-full px-5 py-3.5 border border-[#6f5830] bg-[#fffaf0]/80 text-[#6f5830] hover:bg-white hover:text-[#9b7a3a] transition-all text-sm font-semibold tracking-wide shadow-sm"
            >
              <QrCode className="w-4 h-4" />
              <span>Quét Tem QR Mô Hình</span>
            </button>

            <button
              onClick={onExploreAssembly}
              className="inline-flex items-center gap-2 px-4 py-3.5 text-xs font-mono text-[#6f5830] hover:text-[#9b7a3a] transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span>Bóc tách mộng gỗ 2.5D →</span>
            </button>
          </div>

          {/* 4-Item Quick Telemetry Bar (Reverse-Engineered from Disanviet L1 array) */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-[#b8aa8d] pt-6 text-left">
            <div>
              <span className="block text-sm font-serif font-bold text-[#2d2820]">Tỷ Lệ 1:120</span>
              <span className="mt-1 block text-xs text-[#776f62] font-light">Khảo cứu thực tế di tích</span>
            </div>
            <div>
              <span className="block text-sm font-serif font-bold text-[#2d2820]">Mộng Gỗ 24 Chi Tiết</span>
              <span className="mt-1 block text-xs text-[#776f62] font-light">Không dùng keo công nghiệp</span>
            </div>
            <div>
              <span className="block text-sm font-serif font-bold text-[#2d2820]">Nhựa Sinh Thái PETG</span>
              <span className="mt-1 block text-xs text-[#776f62] font-light">Không độc hại, bền 15+ năm</span>
            </div>
            <div>
              <span className="block text-sm font-serif font-bold text-[#2d2820]">Chứng Thư Số QR</span>
              <span className="mt-1 block text-xs text-[#776f62] font-light">Định danh bản quyền độc bản</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
