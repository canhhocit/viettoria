import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Share2, Camera, HelpingHandIcon } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-brass/25 bg-paper-deep/40 text-ink px-4 py-12 sm:px-6 lg:px-8 select-none">
      <div className="mx-auto max-w-7xl">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-8">
          {/* Column 1: Brand & Philosophy */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block" aria-label="Viettoria Trang chủ">
              <img
                src="/viettoria-noback.svg"
                alt="Viettoria"
                className="h-8 sm:h-9 w-auto object-contain"
              />
            </Link>
            <p className="font-serif text-xs sm:text-sm text-brown-dark leading-relaxed max-w-sm">
              Tái hiện kiệt tác kiến trúc Việt Nam dưới dạng mô hình in 3D tinh xảo kết hợp nền tảng số hóa tương tác đa giác quan, đưa câu chuyện sử Việt đến gần hơn với mọi thế hệ.
            </p>
            
          </div>

          {/* Column 2: 5 Monuments Collection */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-brown-dark font-semibold">
              TÁC PHẨM DI SẢN
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-serif">
              <li>
                <Link
                  to="/products/chua-mot-cot"
                  className="text-brown-dark hover:text-brown-dark hover:underline transition-colors flex items-center justify-between pr-4"
                >
                  <span>Chùa Một Cột</span>
                  <span className="font-mono text-[11px] opacity-70">Hà Nội</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/products/khue-van-cac"
                  className="text-brown-dark hover:text-brown-dark hover:underline transition-colors flex items-center justify-between pr-4"
                >
                  <span>Khuê Văn Các</span>
                  <span className="font-mono text-[11px] opacity-70">Hà Nội</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/products/cot-co-ha-noi"
                  className="text-brown-dark hover:text-brown-dark hover:underline transition-colors flex items-center justify-between pr-4"
                >
                  <span>Cột Cờ Hà Nội</span>
                  <span className="font-mono text-[11px] opacity-70">Hà Nội</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/products/ngo-mon-hue"
                  className="text-brown-dark hover:text-brown-dark hover:underline transition-colors flex items-center justify-between pr-4"
                >
                  <span>Ngọ Môn Huế</span>
                  <span className="font-mono text-[11px] opacity-70">Thừa Thiên Huế</span>
                </Link>
              </li>
              
              <li>
                <Link
                  to="/products"
                  className="text-brown-dark hover:text-brown-dark hover:underline transition-colors flex items-center justify-between pr-4"
                >
                  <span>Tác phẩm khác</span>
                  <span className="font-mono text-[11px] opacity-70">Khám phá ngay</span>
                </Link>
              </li>

            </ul>
          </div>

          {/* Column 3: Atelier & Story */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-brown-dark font-semibold">
              VIETTORIA
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-serif text-brown-dark">
              <li>
                <Link to="/about" className="hover:text-brown-dark hover:underline transition-colors block">
                  Về Viettoria
                </Link>
              </li>
              <li>
                <Link to="/collections" className="hover:text-brown-dark hover:underline transition-colors block">
                  Bộ sưu tập
                </Link>
              </li>
              <li>
                <Link to="/map" className="hover:text-brown-dark hover:underline transition-colors block">
                  Bản đồ di sản
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="hover:text-brown-dark hover:underline transition-colors block">
                  Góc nhìn di sản
                </Link>
              </li>
              <li>
                <Link to="/admin/login" className="hover:text-brown-dark hover:underline transition-colors block font-mono text-[11px] text-brown-dark font-semibold">
                  Cổng Quản Trị CMS
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Social */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-brown-dark font-semibold">
              KẾT NỐI
            </h4>
            <div className="space-y-2.5 text-xs sm:text-[13px] text-brown-dark font-serif">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-brown-dark shrink-0" />
                <a href="mailto:contact@viettoria.vn" className="hover:text-brown-dark transition-colors">
                  contact@viettoria.vn
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-brown-dark shrink-0 mt-0.5" />
                <span>Hà Nội, Việt Nam</span>
              </div>
              <div className="flex items-start gap-2">
                <HelpingHandIcon className="w-3.5 h-3.5 text-brown-dark shrink-0 mt-0.5" />
                <span>Hỗ trợ 24/7</span>
              </div>
            </div>

            {/* Social & Action Button */}
            <div className="flex items-center gap-2 pt-2">
              <button 
                className="w-8 h-8 flex items-center justify-center border border-paper-border text-brown-dark hover:bg-paper-warm hover:text-ink transition-all rounded-[2px]"
                title="Chia sẻ di sản"
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>
              <button 
                className="w-8 h-8 flex items-center justify-center border border-paper-border text-brown-dark hover:bg-paper-warm hover:text-ink transition-all rounded-[2px]"
                title="Thư viện hình ảnh"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
              
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-8 border-t border-paper-border pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-charcoal-muted">
          <p>© 2026 VIETTORIA. Khắc dạ nhớ nguồn — Đưa nét Việt vươn xa.</p>
          <p className="mt-2 sm:mt-0 font-serif italic text-brown-dark">
            Mô hình kiến trúc và câu chuyện di sản Việt Nam
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
