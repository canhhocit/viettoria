import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { QrCode, Menu, X, Shield } from 'lucide-react';

interface HeaderProps {
  onOpenQRModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenQRModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/', label: 'Trang Chủ' },
    { to: '/collections', label: 'Bộ Sưu Tập' },
    { to: '/products', label: 'Tác Phẩm Di Sản' },
    { to: '/map', label: 'Bản Đồ Di Sản' },
    { to: '/blogs', label: 'Góc Nhìn Di Sản' },
    { to: '/about', label: 'Về Viettoria' },
  ];

  return (
    <header 
      className={`sticky top-0 z-50 border-b border-[#D8CCB8] bg-[#F9F4E8]/95 backdrop-blur-md text-[#3B2B1D] transition-all duration-300 ${
        isScrolled ? 'py-1 shadow-sm' : 'py-0'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className={`flex items-center justify-between transition-all duration-300 ${
            isScrolled ? 'h-14 sm:h-16' : 'h-20'
          }`}
        >
          {/* Brand Logo - Pure SVG Identity from Reference */}
          <Link to="/" className="flex items-center gap-2 group focus:outline-none shrink-0" aria-label="Viettoria Trang chủ">
            <img
              src="/viettoria-noback.svg"
              alt="Viettoria"
              className={`w-auto object-contain transition-all duration-300 ${
                isScrolled ? 'h-7 sm:h-8' : 'h-8 sm:h-9'
              }`}
            />
          </Link>

          {/* Desktop Navigation Links - Heritage Pill Style */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2 text-xs font-mono uppercase tracking-wider shrink-0" aria-label="Menu chính">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `whitespace-nowrap transition-all duration-200 py-1.5 px-3 rounded-[2px] font-semibold ${
                    isActive
                      ? 'bg-[#745C42] text-white shadow-xs'
                      : 'text-[#554231] hover:text-[#745C42] hover:bg-[#ede4d2]/60'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2.5">
            {/* Quick QR Scanner Button */}
            <button
              onClick={onOpenQRModal}
              className={`inline-flex items-center gap-2 border border-[#B88A38] bg-[#F3EBDD] text-[#745C42] hover:bg-[#745C42] hover:text-white transition-all font-mono uppercase tracking-wider font-semibold rounded-[2px] shadow-xs ${
                isScrolled ? 'px-3 py-1.5 text-[11px]' : 'px-3.5 py-2 text-xs'
              }`}
              title="Mở trình quét tem QR trên đế mô hình"
            >
              <QrCode className="w-3.5 h-3.5 text-[#B88A38]" />
              <span className="hidden sm:inline">Quét Tem QR</span>
            </button>

            {/* Admin CMS Portal Link */}
            <Link
              to="/admin/dashboard"
              className={`hidden md:inline-flex items-center gap-1.5 border border-[#D8CCB8] hover:border-[#745C42] text-[#796857] hover:text-[#3B2B1D] font-mono uppercase tracking-wider transition-colors rounded-[2px] ${
                isScrolled ? 'px-2.5 py-1.5 text-[11px]' : 'px-3 py-2 text-xs'
              }`}
              title="Cổng quản trị nội dung CMS"
            >
              <Shield className="w-3.5 h-3.5 text-[#B88A38]" />
              <span>CMS</span>
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 border border-[#D8CCB8] text-[#3B2B1D] hover:border-[#745C42] hover:text-[#745C42] lg:hidden transition-colors rounded-[2px]"
              aria-label="Mở danh mục điều hướng"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#D8CCB8] bg-[#F9F4E8] px-4 pt-4 pb-6 space-y-3">
          <nav className="flex flex-col space-y-1.5 text-xs font-mono uppercase tracking-wider">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2.5 rounded-[2px] transition-colors ${
                    isActive
                      ? 'bg-[#745C42] text-white font-bold'
                      : 'text-[#554231] hover:text-[#745C42] hover:bg-[#ede4d2]/60'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="pt-4 border-t border-[#D8CCB8] flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQRModal();
              }}
              className="w-full py-2.5 px-4 bg-[#745C42] text-white font-mono text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 rounded-[2px]"
            >
              <QrCode className="w-4 h-4" />
              <span>Quét Tem QR Mô Hình</span>
            </button>
            <Link
              to="/admin/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2 px-4 border border-[#D8CCB8] text-[#554231] hover:text-[#3B2B1D] font-mono text-xs uppercase tracking-wider text-center rounded-[2px]"
            >
              Truy Cập Quản Trị CMS
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
