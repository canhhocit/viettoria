import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Share2, Camera, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative overflow-hidden bg-[#523f24] text-[#f8f1e3] border-t border-[#b8aa8d]/30 select-none">
      {/* Background Heritage Grain Texture */}
      <div className="heritage-grain pointer-events-none absolute inset-0 opacity-25"></div>

      {/* Subtle Radial Glow in Center */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_40%,rgba(184,138,68,0.08),transparent_50%)]"></div>

      {/* Faint Bronze Drum Watermark on Right */}
      <img
        src="/images/trong-dong.webp"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-[-8%] sm:right-[-4%] lg:right-[0%] top-1/2 -translate-y-1/2 h-[135%] max-w-none opacity-[0.16] object-contain select-none mix-blend-screen"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Column 1: Brand Atelier */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 flex-none flex items-center justify-center border border-[#f6d99b]/60 bg-white/10 text-[#f6d99b] shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] font-serif font-bold text-xl">
                V
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#fffaf0] leading-tight tracking-wide">
                  VIETTORIA
                </h3>
                <p className="text-[11px] uppercase tracking-[0.22em] text-[#d8c7a5] font-medium mt-0.5 font-mono">
                  PHYGITAL HERITAGE ATELIER
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-[13px] text-[#f2e9d8]/90 leading-relaxed font-light max-w-sm pt-1">
              Tái hiện kiệt tác kiến trúc Việt Nam dưới dạng mô hình in 3D tinh xảo kết hợp nền tảng số hóa tương tác đa giác quan, đưa câu chuyện sử Việt đến gần hơn với mọi thế hệ.
            </p>
          </div>

          {/* Column 2: KHÁM PHÁ */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#f8f2e4]">
              KHÁM PHÁ
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-[13px] text-[#e8dec8] font-light">
              <li>
                <Link to="/collections" className="hover:text-white transition-colors block">
                  Bộ sưu tập di sản
                </Link>
              </li>
              <li>
                <Link to="/products/chua-mot-cot" className="hover:text-white transition-colors block">
                  Chùa Một Cột (Hero)
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white transition-colors block">
                  Danh mục 5 tác phẩm
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="hover:text-white transition-colors block">
                  Góc nhìn di sản
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: THÔNG TIN */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#f8f2e4]">
              THÔNG TIN
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-[13px] text-[#e8dec8] font-light">
              <li>
                <Link to="/about" className="hover:text-white transition-colors block">
                  Về Viettoria Atelier
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors block">
                  Đề án Phenikaa PSI 2026
                </Link>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer block">
                  Tiêu chuẩn BioPETG
                </span>
              </li>
              <li>
                <Link to="/admin/login" className="hover:text-white transition-colors block font-mono text-[11px] text-brass-subtle">
                  Cổng Quản Trị CMS
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: KẾT NỐI VỚI CHÚNG TÔI */}
          <div className="lg:col-span-4 space-y-3.5">
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#f8f2e4]">
              KẾT NỐI VỚI CHÚNG TÔI
            </h4>

            <div className="space-y-2.5 text-xs sm:text-[13px] text-[#f2e9d8]/95 font-light">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#f6d99b] shrink-0" />
                <a href="mailto:contact@viettoria.vn" className="hover:text-white transition-colors">
                  contact@viettoria.vn
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#f6d99b] shrink-0" />
                <span>Trường Đại học Phenikaa, Hà Nội, Việt Nam</span>
              </div>
            </div>

            {/* Social Circle Icons & Pill Action Button */}
            <div className="flex items-center gap-2.5 pt-2">
              <button 
                className="w-9 h-9 flex items-center justify-center border border-white/25 text-[#f2e9d8] hover:bg-white/15 hover:text-white transition-all shadow-sm"
                title="Chia sẻ di sản"
              >
                <Share2 className="w-4 h-4" />
              </button>

              <button 
                className="w-9 h-9 flex items-center justify-center border border-white/25 text-[#f2e9d8] hover:bg-white/15 hover:text-white transition-all shadow-sm"
                title="Thư viện hình ảnh"
              >
                <Camera className="w-4 h-4" />
              </button>

              <Link
                to="/collections"
                className="inline-flex items-center gap-1.5 border border-[#f6d99b]/60 bg-transparent px-4 py-2 text-xs font-medium text-[#fffaf0] hover:bg-[#f6d99b] hover:text-[#523f24] transition-all shadow-sm"
              >
                <span className="font-serif text-[13px]">Khám phá ngay</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#f6d99b]" />
              </Link>
            </div>
          </div>
        </div>

        {/* Delicate Divider Line */}
        <div className="mt-12 border-t border-[#d8c7a5]/25 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#d8c7a5]/80 font-light">
          <p>© 2026 VIETTORIA. Khắc dạ nhớ nguồn — Đưa sử Việt vươn xa.</p>
          <p className="mt-2 sm:mt-0 font-serif italic text-[#e8dec8]/90">
            Dự án tham dự Sáng tạo - Khởi nghiệp Phenikaa 2026 (PSI 2026).
          </p>
        </div>
      </div>
    </footer>
  );
};
