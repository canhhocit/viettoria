import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { KeyRound, User, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';
import { adminApi } from '../../services/api';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('viettoria@2026');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await adminApi.login(username.trim(), password);
      const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/admin/dashboard';
      navigate(from, { replace: true });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Đăng nhập thất bại. Vui lòng kiểm tra lại tài khoản.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-forest flex flex-col justify-center items-center p-4 relative overflow-hidden select-none">
      {/* Background Subtle Elements */}
      <div className="heritage-grain absolute inset-0 opacity-20 pointer-events-none" />
      <img
        src="/images/trong-dong.webp"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-1/2 -translate-y-1/2 h-[130%] opacity-[0.06] object-contain mix-blend-screen"
      />

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
                className="w-full pl-9 pr-4 py-2.5 bg-paper-warm border border-paper-border focus:border-brass text-xs font-mono focus:outline-none transition-colors"
                required
              />
            </div>
          </div>

          {/* Test Credentials Quick Box */}
          <div className="p-3 bg-paper-warm border border-paper-border text-[11px] font-mono text-charcoal/80 space-y-1">
            <div className="flex items-center gap-1.5 text-brass font-bold uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tài Khoản Thử Nghiệm Hệ Thống:</span>
            </div>
            <p>Tài khoản: <code className="bg-paper px-1 py-0.5 border border-paper-border">admin</code></p>
            <p>Mật khẩu: <code className="bg-paper px-1 py-0.5 border border-paper-border">viettoria@2026</code></p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-forest text-paper hover:bg-brass transition-colors font-mono text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
          >
            <span>{loading ? 'Đang Xác Thực...' : 'Đăng Nhập Quản Trị'}</span>
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
