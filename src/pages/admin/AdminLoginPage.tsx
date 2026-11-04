import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { KeyRound, User, ArrowRight, AlertCircle, Eye } from 'lucide-react';
import { adminApi } from '../../services/api';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingMode, setLoadingMode] = useState<'admin' | 'demo' | null>(null);

  const finishLogin = () => {
    const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/admin/dashboard';
    navigate(from, { replace: true });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setLoadingMode('admin');

    try {
      await adminApi.login(username.trim(), password);
      finishLogin();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Đăng nhập thất bại. Vui lòng kiểm tra kết nối và thông tin đăng nhập.');
      }
    } finally {
      setLoading(false);
      setLoadingMode(null);
    }
  };

  const handleDemoLogin = async () => {
    setError(null);
    setLoading(true);
    setLoadingMode('demo');
    try {
      await adminApi.loginDemo();
      finishLogin();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Không thể mở bản demo lúc này.');
    } finally {
      setLoading(false);
      setLoadingMode(null);
    }
  };

  return (
    <div className="min-h-screen bg-forest flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background Subtle Elements */}
      <div className="heritage-grain absolute inset-0 opacity-20 pointer-events-none" />
      <div aria-hidden="true" className="heritage-dong-son pointer-events-none absolute -right-32 top-1/2 h-[85vh] w-[85vh] -translate-y-1/2 opacity-[0.15] mix-blend-screen" />

      <div className="relative z-10 w-full max-w-md bg-paper border border-brass corner-frame p-8 sm:p-10 shadow-2xl space-y-6">
        {/* Atelier Logo Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 mx-auto flex items-center justify-center border-2 border-brass bg-forest text-brass font-serif font-bold text-2xl shadow-inner">
            V
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest tracking-wider">
            VIETTORIA CMS
          </h1>
          <p className="text-xs font-mono text-brass-dark uppercase tracking-widest">
            Hệ Thống Biên Tập & Điều Hành Di Sản Số
          </p>
        </div>

        {error && (
          <div className="p-3 bg-terracotta/10 border border-terracotta/40 text-terracotta text-xs font-mono flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="border border-brass/50 bg-paper-warm p-4">
          <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-brass-dark">Trải nghiệm nhanh</p>
          <p className="mt-1.5 text-xs leading-relaxed text-charcoal-muted">Tài khoản demo dùng tên quản trị cấu hình bằng ADMIN_USERNAME ở BE. Phiên demo chỉ có quyền xem dữ liệu, không cần mật khẩu.</p>
          <dl className="mt-3 grid grid-cols-2 gap-3 border-y border-brass/25 py-3 font-mono text-[11px]">
            <div>
              <dt className="text-charcoal-muted">Tài khoản</dt>
              <dd className="mt-1 select-all font-semibold text-forest">ADMIN_USERNAME (BE)</dd>
            </div>
            <div>
              <dt className="text-charcoal-muted">Mật khẩu</dt>
              <dd className="mt-1 font-semibold text-forest">Không cần · chỉ xem</dd>
            </div>
          </dl>
          <button
            type="button"
            onClick={() => void handleDemoLogin()}
            disabled={loading}
            className="mt-3 flex w-full items-center justify-center gap-2 border border-forest bg-forest px-4 py-3 text-xs font-mono font-bold uppercase tracking-wider text-paper transition-colors hover:bg-brass hover:text-forest disabled:cursor-wait disabled:opacity-60"
          >
            <Eye className="h-4 w-4" />
            <span>{loadingMode === 'demo' ? 'Đang mở bản demo...' : 'Đăng nhập demo'}</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-charcoal-muted mb-1.5">
              Tài Khoản Quản Trị
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-charcoal-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nhập tên đăng nhập..."
                autoComplete="username"
                className="w-full pl-9 pr-4 py-2.5 bg-paper-warm border border-paper-border focus:border-brass text-xs font-mono focus:outline-none transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-charcoal-muted mb-1.5">
              Mật Khẩu
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-charcoal-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu..."
                autoComplete="current-password"
                className="w-full pl-9 pr-4 py-2.5 bg-paper-warm border border-paper-border focus:border-brass text-xs font-mono focus:outline-none transition-colors"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-forest text-paper hover:bg-brass transition-colors font-mono text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
          >
            <span>{loadingMode === 'admin' ? 'Đang Xác Thực...' : 'Đăng Nhập Quản Trị'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-paper-border text-center">
          <Link
            to="/"
            className="text-xs font-mono uppercase tracking-wider text-charcoal-muted hover:text-forest transition-colors"
          >
            ← Quay lại website công khai
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
