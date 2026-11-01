import React, { useState } from 'react';
import type { HeritageSKU } from '../../types/heritage';
import { MOCK_USER_SCAN } from '../../data/mockHeritage';
import { InteractiveViewerFallback } from '../viewer3d/InteractiveViewerFallback';
import { 
  Award, 
  Globe2, 
  Sparkles, 
  Share2, 
  Check, 
  ArrowLeft 
} from 'lucide-react';

interface QRProductExperienceProps {
  heritage: HeritageSKU;
  onBackToHome: () => void;
}

export const QRProductExperience: React.FC<QRProductExperienceProps> = ({
  heritage,
  onBackToHome,
}) => {
  const [hasLitUp, setHasLitUp] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const handleCopyShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="bg-paper min-h-screen py-8 heritage-grain">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation & Breadcrumb */}
        <div className="flex items-center justify-between border-b border-paper-border pb-4 mb-8">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-charcoal hover:text-brass transition-colors duration-150"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay Lại Trang Chủ Viettoria</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-600 animate-pulse"></span>
            <span className="text-[11px] font-mono text-forest uppercase tracking-wider font-semibold">
              ĐÃ XÁC THỰC MÃ QR VẬT THỂ
            </span>
          </div>
        </div>

        {/* Digital Certificate of Authenticity Banner */}
        <div className="bg-forest text-paper p-6 sm:p-8 border border-brass corner-frame mb-12 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-48 h-48 bg-brass/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Left Badge */}
            <div className="md:col-span-8 space-y-2">
              <div className="flex items-center gap-2 text-brass text-xs font-mono tracking-widest uppercase">
                <Award className="w-4 h-4" />
                <span>CHỨNG THƯ SỞ HỮU DI SẢN KỸ THUẬT SỐ</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-4xl font-bold text-paper">
                {heritage.name}
              </h1>
              <p className="text-xs text-brass font-medium font-serif italic">
                {heritage.subName} • {heritage.epoch}
              </p>
              <p className="text-xs text-paper-warm/80 leading-relaxed font-light max-w-2xl pt-2">
                Chúc mừng bạn đã sở hữu mô hình di sản vật thể chính hãng từ Viettoria Atelier. Bản sao số tương tác bên dưới được đồng bộ trực tiếp từ con tem QR trên đế mô hình của bạn.
              </p>
            </div>

            {/* Right Telemetry Box */}
            <div className="md:col-span-4 bg-forest-dark border border-brass/40 p-4 space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-forest-light pb-1.5">
                <span className="text-paper-warm/60">MÃ ĐỊNH DANH:</span>
                <span className="text-brass font-bold">{heritage.provenance.certificationNumber}</span>
              </div>
              <div className="flex items-center justify-between border-b border-forest-light pb-1.5">
                <span className="text-paper-warm/60">PHIÊN BẢN:</span>
                <span className="text-paper">{heritage.provenance.edition}</span>
              </div>
              <div className="flex items-center justify-between border-b border-forest-light pb-1.5">
                <span className="text-paper-warm/60">TIÊU CHUẨN:</span>
                <span className="text-emerald-400 font-semibold">{heritage.provenance.materialGrade}</span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-paper-warm/60">TỶ LỆ THỰC:</span>
                <span className="text-brass">{heritage.scale} (Cao {heritage.heightCm}cm)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid: 3D Stage + Heritage Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          {/* Left: 3D Viewer Interactive */}
          <div className="lg:col-span-8">
            <InteractiveViewerFallback heritage={heritage} />
          </div>

          {/* Right: Social Pride & Action Bar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Light up the World Card */}
            <div className="bg-paper-warm border border-paper-border p-6 corner-frame space-y-4">
              <div className="flex items-center gap-2 text-brass text-xs font-mono uppercase tracking-wider">
                <Globe2 className="w-4 h-4" />
                <span>BẢN ĐỒ THẮP SÁNG SỬ VIỆT</span>
              </div>

              <h3 className="font-serif text-lg font-bold text-forest">
                Ghi Dấu Hành Trình Di Sản Của Bạn
              </h3>
              <p className="text-xs text-charcoal/70 leading-relaxed font-light">
                Mỗi lượt quét mã QR ở khắp năm châu sẽ thắp sáng một điểm tự hào của non sông Việt Nam trên bản đồ di sản toàn cầu.
              </p>

              <button
                onClick={() => setHasLitUp(true)}
                disabled={hasLitUp}
                className={`w-full py-3 px-4 text-xs font-mono uppercase tracking-wider font-semibold transition-colors duration-150 flex items-center justify-center gap-2 ${
                  hasLitUp
                    ? 'bg-emerald-800 text-paper cursor-default'
                    : 'bg-forest text-paper hover:bg-brass'
                }`}
              >
                {hasLitUp ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>Đã Thắp Sáng Điểm Của Bạn!</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-brass" />
                    <span>Thắp Sáng Điểm Check-In</span>
                  </>
                )}
              </button>

              {/* Global Scans List */}
              <div className="pt-3 border-t border-paper-border space-y-2">
                <span className="text-[10px] font-mono text-charcoal-muted uppercase block">
                  Điểm kích hoạt gần đây trên thế giới:
                </span>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                  {MOCK_USER_SCAN.globalPoints.map(pt => (
                    <div key={pt.city} className="p-2 bg-paper border border-paper-border flex items-center justify-between">
                      <span className="text-charcoal truncate">{pt.city}</span>
                      <span className="text-brass font-bold">{pt.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Share / Bragging Card */}
            <div className="bg-paper border border-paper-border p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-forest font-semibold">
                  Chia Sẻ Cùng Cộng Đồng
                </span>
                <Share2 className="w-4 h-4 text-brass" />
              </div>
              <p className="text-xs text-charcoal/70 leading-relaxed">
                Lan tỏa vẻ đẹp di sản văn hiến cùng hashtag <span className="font-mono text-forest font-bold">#ViettoriaHeritage</span> và <span className="font-mono text-forest font-bold">#SuVietTrenVai</span>.
              </p>
              <button
                onClick={handleCopyShare}
                className="w-full py-2.5 text-xs font-mono uppercase tracking-wider border border-forest text-forest hover:bg-forest hover:text-paper transition-colors duration-150 font-semibold"
              >
                {copiedLink ? 'Đã Sao Chép Liên Kết!' : 'Sao Chép Link Khoe Bạn Bè'}
              </button>
            </div>
          </div>
        </div>

        {/* Deep Dive Historical Chronicle */}
        <div className="bg-paper-warm border border-paper-border p-8 corner-frame space-y-6 max-w-4xl mx-auto">
          <div className="border-b border-paper-border pb-4">
            <span className="text-xs font-mono text-brass uppercase tracking-widest">
              TƯ LIỆU LỊCH SỬ CHÍNH XÁC
            </span>
            <h2 className="font-serif text-3xl font-bold text-forest mt-1">
              Chuyện Kể Về Đóa Sen Năm Kỷ Sửu (1049)
            </h2>
          </div>

          <div className="space-y-4 text-sm text-charcoal/85 leading-relaxed font-light">
            <p>
              {heritage.overview}
            </p>
            <p>
              {heritage.architecturalStory}
            </p>
            <blockquote className="p-4 bg-paper border-l-4 border-brass italic font-serif text-forest text-base my-4">
              "Trụ đá vươn lên giữa hồ nước vuông, nâng đỡ đài hoa sen thanh tịnh. Đó không chỉ là nơi thờ Phật, mà là ước vọng trường tồn nghìn năm của vương triều và lòng dân Đại Việt."
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
};
