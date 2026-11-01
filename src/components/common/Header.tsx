import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { QrCode, Menu, X, Shield } from 'lucide-react';

interface HeaderProps {
  onOpenQRModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenQRModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const navLinks = [
    { to: '/', label: 'Trang Chủ' },
    { to: '/collections', label: 'Bộ Sưu Tập' },
    { to: '/products', label: 'Tác Phẩm Di Sản' },
    { to: '/blogs', label: 'Góc Nhìn Di Sản' },
    { to: '/about', label: 'Về Viettoria' },
  ];

  return (
    <header className="sticky top-0 z-40 atelier-navbar text-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Atelier Identity */}
          <Link to="/" className="flex items-center gap-3.5 group focus:outline-none">
            <span className="w-10 h-10 flex items-center justify-center border border-brass/60 bg-forest-dark text-brass font-serif font-bold text-xl group-hover:border-brass-light transition-colors shadow-inner">
              V
            </span>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-widest text-paper group-hover:text-brass-light transition-colors leading-none">
                VIETTORIA
              </span>
              <span className="text-[10px] font-mono tracking-editorial uppercase text-brass font-medium mt-1">
                Phygital Heritage Collectibles
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-mono tracking-wider uppercase" aria-label="Menu chính">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `py-2 border-b-2 transition-colors duration-150 ${
                    isActive
                      ? 'border-brass text-brass-light font-bold'
                      : 'border-transparent text-paper/80 hover:text-paper hover:border-paper/40'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Quick QR Scanner Button */}
            <button
              onClick={onOpenQRModal}
              className="inline-flex items-center gap-2 px-4 py-2 border border-brass text-brass hover:bg-brass hover:text-forest transition-colors font-mono text-xs uppercase tracking-wider font-semibold shadow-sm"
              title="Mở trình quét tem QR trên đế mô hình"
            >
              <QrCode className="w-4 h-4" />
              <span className="hidden sm:inline">Quét Tem QR</span>
            </button>

            {/* Admin CMS Portal Link */}
            <Link
              to="/admin/dashboard"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 bg-forest-dark border border-paper/20 hover:border-brass text-paper/70 hover:text-brass text-xs font-mono uppercase tracking-wider transition-colors"
              title="Cổng quản trị nội dung CMS"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>CMS</span>
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 border border-paper/20 text-paper hover:border-brass hover:text-brass lg:hidden transition-colors"
              aria-label="Mở danh mục điều hướng"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-brass/30 bg-forest-dark px-4 pt-4 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2 text-xs font-mono uppercase tracking-wider">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2.5 border-l-2 transition-colors ${
                    isActive
                      ? 'border-brass bg-forest text-brass font-bold'
                      : 'border-transparent text-paper/80 hover:text-paper hover:bg-forest/50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="pt-4 border-t border-paper/15 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQRModal();
              }}
              className="w-full py-2.5 px-4 bg-brass text-forest font-mono text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2"
            >
              <QrCode className="w-4 h-4" />
              <span>Quét Tem QR Mô Hình</span>
            </button>
            <Link
              to="/admin/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2 px-4 border border-paper/30 text-paper/80 font-mono text-xs uppercase tracking-wider text-center"
            >
              Truy Cập Quản Trị CMS
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
