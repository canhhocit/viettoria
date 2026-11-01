import React, { useState } from 'react';
import { QrCode, Menu, X, Bot, Map, Layers } from 'lucide-react';

interface HeaderProps {
  activeTab?: string;
  onNavigate?: (tab: string) => void;
  onOpenAIModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  activeTab = 'home', 
  onNavigate,
  onOpenAIModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const handleTabClick = (tab: string) => {
    if (onNavigate) onNavigate(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 px-3 py-3 text-white sm:px-4" style={{ marginBottom: '-88px' }}>
      <div className="glass-navbar mx-auto w-full max-w-7xl px-3 py-2.5 sm:px-5 lg:px-7">
        <div className="flex w-full items-center justify-between gap-x-3">
          {/* Brand Logo & Title */}
          <button 
            onClick={() => handleTabClick('home')}
            className="flex min-w-0 items-center gap-3 text-left focus:outline-none"
          >
            <span className="grid h-10 w-10 flex-none place-items-center rounded-full border border-[#f6d99b]/40 bg-white/10 text-[#f6d99b] shadow-[inset_0_1px_0_rgba(255,255,255,0.24)]">
              <span className="font-serif font-bold text-lg text-[#f6d99b]">V</span>
            </span>
            <span className="min-w-0">
              <span className="block truncate font-serif text-xl font-bold leading-5 text-[#f6d99b]">
                Di Sản Việt <span className="text-xs font-sans text-white/60 font-normal">VIETTORIA</span>
              </span>
              <span className="hidden truncate text-[11px] text-white/70 sm:block font-light">
                Khám phá lịch sử, kết nối tự hào
              </span>
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-white/85">
            <button
              onClick={() => handleTabClick('home')}
              className={`glass-navbar-link px-3.5 py-1.5 transition ${
                activeTab === 'home' ? 'bg-white/20 text-[#f6d99b] font-semibold' : 'hover:text-white'
              }`}
            >
              Trang chủ
            </button>
            <button
              onClick={() => handleTabClick('map')}
              className={`glass-navbar-link px-3.5 py-1.5 transition flex items-center gap-1.5 ${
                activeTab === 'map' ? 'bg-white/20 text-[#f6d99b] font-semibold' : 'hover:text-white'
              }`}
            >
              <Map className="w-4 h-4 text-[#f6d99b]" />
              <span>Bản đồ di sản</span>
            </button>
            <button
              onClick={() => handleTabClick('collection')}
              className={`glass-navbar-link px-3.5 py-1.5 transition ${
                activeTab === 'collection' ? 'bg-white/20 text-[#f6d99b] font-semibold' : 'hover:text-white'
              }`}
            >
              Bộ sưu tập
            </button>
            <button
              onClick={() => handleTabClick('assembly')}
              className={`glass-navbar-link px-3.5 py-1.5 transition flex items-center gap-1.5 ${
                activeTab === 'assembly' ? 'bg-white/20 text-[#f6d99b] font-semibold' : 'hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4 text-[#f6d99b]" />
              <span>Bóc tách mộng</span>
            </button>
            <button
              onClick={() => onOpenAIModal && onOpenAIModal()}
              className="glass-navbar-link px-3.5 py-1.5 transition text-[#f6d99b] hover:bg-white/10 flex items-center gap-1.5 font-semibold"
            >
              <Bot className="w-4 h-4 text-[#f6d99b]" />
              <span>Hỏi AI hướng dẫn</span>
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleTabClick('qr-demo')}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-[#f6d99b] text-[#102832] hover:bg-white transition-all shadow-md font-mono uppercase tracking-wider"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Quét Tem QR</span>
            </button>

            <button
              onClick={() => onOpenAIModal && onOpenAIModal()}
              className="glass-navbar-button hidden sm:grid h-9 w-9 place-items-center rounded-full text-white/90 border border-white/20 hover:bg-white/20"
              title="Hướng dẫn viên AI"
            >
              <Bot className="w-4 h-4 text-[#f6d99b]" />
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="glass-navbar-button grid h-9 w-9 place-items-center rounded-full text-white/90 border border-white/20 lg:hidden"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <nav className="mt-3 pt-3 border-t border-white/15 flex flex-col gap-2 text-sm font-medium text-white/90 lg:hidden">
            <button
              onClick={() => handleTabClick('home')}
              className="px-4 py-2 text-left rounded-lg hover:bg-white/10 text-white"
            >
              Trang chủ
            </button>
            <button
              onClick={() => handleTabClick('map')}
              className="px-4 py-2 text-left rounded-lg hover:bg-white/10 text-white flex items-center gap-2"
            >
              <Map className="w-4 h-4 text-[#f6d99b]" />
              <span>Bản đồ di sản</span>
            </button>
            <button
              onClick={() => handleTabClick('collection')}
              className="px-4 py-2 text-left rounded-lg hover:bg-white/10 text-white"
            >
              Bộ sưu tập (5 SKU)
            </button>
            <button
              onClick={() => handleTabClick('assembly')}
              className="px-4 py-2 text-left rounded-lg hover:bg-white/10 text-white flex items-center gap-2"
            >
              <Layers className="w-4 h-4 text-[#f6d99b]" />
              <span>Bóc tách mộng gỗ 2.5D</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenAIModal) onOpenAIModal();
              }}
              className="px-4 py-2 text-left rounded-lg bg-[#f6d99b]/20 text-[#f6d99b] flex items-center gap-2 font-semibold"
            >
              <Bot className="w-4 h-4" />
              <span>Hỏi hướng dẫn viên AI</span>
            </button>
            <button
              onClick={() => handleTabClick('qr-demo')}
              className="mt-1 px-4 py-2 text-center rounded-full bg-[#f6d99b] text-[#102832] font-semibold text-xs uppercase font-mono"
            >
              Mở trang quét tem QR
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};
