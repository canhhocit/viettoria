import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Share2, Camera, HelpingHandIcon } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#D8CCB8] bg-[#E2D3BA] text-[#3B2B1D] px-4 pt-14 pb-8 sm:px-6 lg:px-8 select-none">
      <div className="mx-auto max-w-7xl">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12">
          {/* Column 1: Brand & Philosophy */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block" aria-label="Viettoria Trang chủ">
              <img
                src="/viettoria-noback.svg"
                alt="Viettoria"
                className="h-8 sm:h-9 w-auto object-contain"
              />
            </Link>
            <p className="font-serif text-xs sm:text-sm text-[#554231] leading-relaxed max-w-sm">
              Tái hiện kiệt tác kiến trúc Việt Nam dưới dạng mô hình in 3D tinh xảo kết hợp nền tảng số hóa tương tác đa giác quan, đưa câu chuyện sử Việt đến gần hơn với mọi thế hệ.
            </p>
            
          </div>

          {/* Column 2: 5 Monuments Collection */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#745C42] font-semibold">
              TÁC PHẨM DI SẢN
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-serif">
              <li>
                <Link
                  to="/products/chua-mot-cot"
                  className="text-[#4e3c2c] hover:text-[#745C42] hover:underline transition-colors flex items-center justify-between pr-4"
                >
                  <span>Chùa Một Cột</span>
                  <span className="font-mono text-[11px] opacity-70">Hà Nội</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/products/khue-van-cac"
                  className="text-[#4e3c2c] hover:text-[#745C42] hover:underline transition-colors flex items-center justify-between pr-4"
                >
                  <span>Khuê Văn Các</span>
                  <span className="font-mono text-[11px] opacity-70">Hà Nội</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/products/cot-co-ha-noi"
                  className="text-[#4e3c2c] hover:text-[#745C42] hover:underline transition-colors flex items-center justify-between pr-4"
                >
                  <span>Cột Cờ Hà Nội</span>
                  <span className="font-mono text-[11px] opacity-70">Hà Nội</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/products/ngo-mon-hue"
                  className="text-[#4e3c2c] hover:text-[#745C42] hover:underline transition-colors flex items-center justify-between pr-4"
                >
                  <span>Ngọ Môn Huế</span>
                  <span className="font-mono text-[11px] opacity-70">Thừa Thiên Huế</span>
                </Link>
              </li>
              
              <li>
                <Link
                  to="/products"
                  className="text-[#4e3c2c] hover:text-[#745C42] hover:underline transition-colors flex items-center justify-between pr-4"
                >
                  <span>Tác phẩm khác</span>
                  <span className="font-mono text-[11px] opacity-70">Khám phá ngay</span>
                </Link>
              </li>

            </ul>
          </div>

          {/* Column 3: Atelier & Story */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#745C42] font-semibold">
              VIETTORIA
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-serif text-[#4e3c2c]">
              <li>
                <Link to="/about" className="hover:text-[#745C42] hover:underline transition-colors block">
                  Về Viettoria
                </Link>
              </li>
              <li>
                <Link to="/collections" className="hover:text-[#745C42] hover:underline transition-colors block">
                  Bộ sưu tập
                </Link>
              </li>
              <li>
                <Link to="/map" className="hover:text-[#745C42] hover:underline transition-colors block">
                  Bản đồ di sản
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="hover:text-[#745C42] hover:underline transition-colors block">
                  Góc nhìn di sản
                </Link>
              </li>
              <li>
                <Link to="/admin/login" className="hover:text-[#745C42] hover:underline transition-colors block font-mono text-[11px] text-[#745C42] font-semibold">
                  Cổng Quản Trị CMS
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Social */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#745C42] font-semibold">
              KẾT NỐI
            </h4>
            <div className="space-y-2.5 text-xs sm:text-[13px] text-[#554231] font-serif">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#745C42] shrink-0" />
                <a href="mailto:contact@viettoria.vn" className="hover:text-[#745C42] transition-colors">
                  contact@viettoria.vn
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#745C42] shrink-0 mt-0.5" />
                <span>Hà Nội, Việt Nam</span>
              </div>
              <div className="flex items-start gap-2">
                <HelpingHandIcon className="w-3.5 h-3.5 text-[#745C42] shrink-0 mt-0.5" />
                <span>Hỗ trợ 24/7</span>
              </div>
            </div>

            {/* Social & Action Button */}
            <div className="flex items-center gap-2 pt-2">
              <button 
                className="w-8 h-8 flex items-center justify-center border border-[#d8ccb8] text-[#554231] hover:bg-[#ede4d2] hover:text-[#3B2B1D] transition-all rounded-[2px]"
                title="Chia sẻ di sản"
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>
              <button 
                className="w-8 h-8 flex items-center justify-center border border-[#d8ccb8] text-[#554231] hover:bg-[#ede4d2] hover:text-[#3B2B1D] transition-all rounded-[2px]"
                title="Thư viện hình ảnh"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
              
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-8 border-t border-[#D8CCB8] pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#796857]">
          <p>© 2026 VIETTORIA. Khắc dạ nhớ nguồn — Đưa nét Việt vươn xa.</p>
          <p className="mt-2 sm:mt-0 font-serif italic text-[#554231]">
            Mô hình kiến trúc và câu chuyện di sản Việt Nam
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
