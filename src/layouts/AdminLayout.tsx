import React, { useEffect, useState } from 'react';
import { Outlet, NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Box, 
  Layers, 
  FileText, 
  Image, 
  LogOut, 
  ExternalLink, 
  Shield, 
  Menu, 
  X,
  Compass
} from 'lucide-react';
import { adminApi } from '../services/api';

export const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<{ fullName: string; username: string } | null>(null);

  useEffect(() => {
    if (!adminApi.isAuthenticated()) {
      navigate('/admin/login', { replace: true, state: { from: location } });
    } else {
      setUser({
        fullName: 'Quản Trị Viên Viettoria',
        username: 'admin'
      });
    }
  }, [navigate, location]);

  const handleLogout = () => {
    adminApi.logout();
    navigate('/admin/login', { replace: true });
  };

  const navItems = [
    { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Tổng Quan' },
    { to: '/admin/products', icon: Box, label: 'Mô Hình & Stories' },
    { to: '/admin/collections', icon: Layers, label: 'Bộ Sưu Tập' },
    { to: '/admin/blogs', icon: FileText, label: 'Góc Văn Hóa' },
    { to: '/admin/media', icon: Image, label: 'Thư Viện Media' },
  ];

  return (
    <div className="min-h-screen bg-[#F0EDE6] text-charcoal flex flex-col md:flex-row font-sans">
      {/* Mobile Top Header */}
      <div className="md:hidden bg-forest text-paper px-4 py-3 flex items-center justify-between border-b border-brass/30">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-brass" />
          <span className="font-serif font-bold text-lg tracking-wider">VIETTORIA CMS</span>
        </div>
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1.5 border border-paper/20 text-paper"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-forest text-paper flex flex-col justify-between border-r border-brass/25 transform transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:h-screen
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Brand Header */}
        <div>
          <div className="p-6 border-b border-paper/10">
            <Link to="/" className="flex items-center gap-3">
              <span className="w-9 h-9 flex items-center justify-center border border-brass text-brass font-serif font-bold text-lg bg-forest-dark">
                V
              </span>
              <div>
                <h1 className="font-serif font-bold text-xl tracking-wider text-paper">VIETTORIA</h1>
                <p className="text-[10px] font-mono text-brass uppercase tracking-widest">Heritage CMS Studio</p>
              </div>
            </Link>
          </div>

          {/* Nav Items */}
          <nav className="p-4 space-y-1 font-mono text-xs uppercase tracking-wider">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-3 transition-colors ${
                      isActive
                        ? 'bg-brass text-forest font-bold shadow-sm'
                        : 'text-paper/75 hover:text-paper hover:bg-forest-light'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* User Info & Footer Actions */}
        <div className="p-4 border-t border-paper/10 bg-forest-dark space-y-3 font-mono text-xs">
          <div className="px-2 py-1.5">
            <p className="text-paper font-medium text-xs truncate">{user?.fullName || 'Ban Quản Trị'}</p>
            <p className="text-[10px] text-brass uppercase tracking-widest">Hệ thống sản xuất 3D</p>
          </div>

          <div className="pt-2 border-t border-paper/10 flex flex-col gap-1.5">
            <Link
              to="/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-2 py-1.5 text-paper/70 hover:text-brass transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Xem Website Công Khai</span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-2 py-1.5 text-terracotta-light hover:text-paper hover:bg-terracotta/20 transition-colors text-left"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Đăng Xuất</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        <header className="hidden md:flex items-center justify-between h-16 px-8 bg-paper border-b border-paper-border shrink-0">
          <div className="flex items-center gap-2 text-xs font-mono text-charcoal-muted uppercase tracking-wider">
            <Compass className="w-4 h-4 text-brass" />
            <span>Khu vực điều hành và biên tập di sản số</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-forest bg-brass/15 px-2.5 py-1 border border-brass/30">
              Chế độ: Đã kết nối API
            </span>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
