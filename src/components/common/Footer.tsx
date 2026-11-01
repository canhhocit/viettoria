import React from 'react';
import { Mail, MapPin, Share2, Camera, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate?: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="relative overflow-hidden bg-[#523f24] text-[#f8f1e3] border-t border-[#b8aa8d]/30">
      {/* Background Heritage Grain Texture */}
      <div className="heritage-grain pointer-events-none absolute inset-0 opacity-25"></div>

      {/* Subtle Radial Glow in Center */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_40%,rgba(184,138,68,0.08),transparent_50%)]"></div>

      {/* Mờ ảo Mặt Trống Đồng Đông Sơn (Faint Bronze Drum Watermark on Right) */}
      <img
        src="/images/trong-dong.webp"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-[-8%] sm:right-[-4%] lg:right-[0%] top-1/2 -translate-y-1/2 h-[135%] max-w-none opacity-[0.16] object-contain select-none mix-blend-screen"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        {/* Main 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Column 1: Brand Atelier */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="grid h-12 w-12 flex-none place-items-center rounded-full border border-[#f6d99b]/60 bg-white/10 text-[#f6d99b] shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]">
                <span className="font-serif font-bold text-xl text-[#f6d99b]">V</span>
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#fffaf0] leading-tight tracking-wide">
                  Di Sản Việt
                </h3>
                <p className="text-[11px] uppercase tracking-[0.22em] text-[#d8c7a5] font-medium mt-0.5">
                  KHÁM PHÁ • KẾT NỐI • GÌN GIỮ
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-[13px] text-[#f2e9d8]/90 leading-relaxed font-light max-w-sm pt-1">
              Hành trình số hóa di tích, bảo tàng và ký ức văn hóa, đưa di sản Việt Nam đến gần hơn với mọi thế hệ.
            </p>
          </div>

          {/* Column 2: KHÁM PHÁ */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#f8f2e4]">
              KHÁM PHÁ
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-[13px] text-[#e8dec8] font-light">
              <li>
                <button 
                  onClick={() => onNavigate && onNavigate('map')}
                  className="hover:text-white transition-colors text-left"
                >
                  Khám phá bản đồ
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate && onNavigate('assembly')}
                  className="hover:text-white transition-colors text-left"
                >
                  Bảo tàng 3D
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate && onNavigate('collection')}
                  className="hover:text-white transition-colors text-left"
                >
                  Câu chuyện lịch sử
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate && onNavigate('home')}
                  className="hover:text-white transition-colors text-left"
                >
                  Điểm đến nổi bật
                </button>
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
                <span className="hover:text-white transition-colors cursor-pointer block">
                  Về Di Sản Việt
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer block">
                  Đóng góp tư liệu
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer block">
                  Điều khoản sử dụng
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer block">
                  Chính sách bảo mật
                </span>
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
                <span className="hover:text-white transition-colors">hello@disanviet.vn</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#f6d99b] shrink-0" />
                <span>Hà Nội, Việt Nam</span>
              </div>
            </div>

            {/* Social Circle Icons & Pill Action Button */}
            <div className="flex items-center gap-2.5 pt-1.5">
              <button 
                className="grid h-9 w-9 place-items-center rounded-full border border-white/25 text-[#f2e9d8] hover:bg-white/15 hover:text-white transition-all shadow-sm"
                title="Chia sẻ di sản"
              >
                <Share2 className="w-4 h-4" />
              </button>

              <button 
                className="grid h-9 w-9 place-items-center rounded-full border border-white/25 text-[#f2e9d8] hover:bg-white/15 hover:text-white transition-all shadow-sm"
                title="Hình ảnh & Khoảnh khắc"
              >
                <Camera className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate && onNavigate('map')}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#f6d99b]/60 bg-transparent px-4 py-2 text-xs font-medium text-[#fffaf0] hover:bg-[#f6d99b] hover:text-[#523f24] transition-all shadow-sm"
              >
                <span className="font-serif text-[13px]">Khám phá ngay</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#f6d99b] group-hover:text-[#523f24]" />
              </button>
            </div>
          </div>
        </div>

        {/* Delicate Divider Line */}
        <div className="mt-12 border-t border-[#d8c7a5]/25 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#d8c7a5]/80 font-light">
          <p>© 2026 Di Sản Việt. Gìn giữ ký ức, lan tỏa tự hào.</p>
          <p className="mt-2 sm:mt-0 font-serif italic text-[#e8dec8]/90">
            Được xây dựng với tình yêu dành cho văn hóa Việt Nam.
          </p>
        </div>
      </div>
    </footer>
  );
};
