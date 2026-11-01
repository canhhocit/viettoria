import React from 'react';
import { Compass, MapPin, Layers } from 'lucide-react';
import { HeritageMap } from '../components/common/HeritageMap';

export const HeritageMapPage: React.FC = () => {
  return (
    <div className="bg-paper min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Page Header */}
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-brass text-xs font-mono uppercase tracking-widest">
            <Compass className="w-4 h-4" />
            <span>Hệ Thống Tọa Độ & Bản Đồ Số</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-forest leading-tight">
            Bản Đồ Di Sản Kiến Trúc Việt Nam
          </h1>
          <p className="text-base text-charcoal/80 font-light leading-relaxed">
            Hành trình khảo cứu thực địa từ Thăng Long nghìn năm văn hiến, qua Quần thể Di tích Cố đô Huế, đến Thương cảng Sài Gòn phương Nam. Khám phá tọa độ GPS nguyên bản và thông số kiến trúc của từng kiệt tác.
          </p>
        </div>

        {/* The Leaflet Map Component */}
        <section>
          <HeritageMap />
        </section>

        {/* Micro-specs information banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-paper-border text-xs font-mono">
          <div className="p-5 bg-paper-warm border border-paper-border space-y-2">
            <div className="flex items-center gap-2 text-brass font-bold">
              <MapPin className="w-4 h-4" />
              <span>3 VÙNG ĐẤT DI SẢN</span>
            </div>
            <p className="text-charcoal/80 font-light text-[11px] leading-relaxed">
              Bắc Bộ (Hà Nội), Trung Bộ (Huế) và Nam Bộ (TP. Hồ Chí Minh) — tái hiện dòng chảy lịch sử liền mạch gần một thiên niên kỷ.
            </p>
          </div>

          <div className="p-5 bg-paper-warm border border-paper-border space-y-2">
            <div className="flex items-center gap-2 text-brass font-bold">
              <Layers className="w-4 h-4" />
              <span>5 TỌA ĐỘ THỰC ĐỊA CHUẨN XÁC</span>
            </div>
            <p className="text-charcoal/80 font-light text-[11px] leading-relaxed">
              Mỗi tọa độ được đối soát chuẩn xác với vị trí thực tế tại thực địa, liên kết trực tiếp với mô hình thu nhỏ 1:120 và Audio Guide.
            </p>
          </div>

          <div className="p-5 bg-paper-warm border border-paper-border space-y-2">
            <div className="flex items-center gap-2 text-brass font-bold">
              <Compass className="w-4 h-4" />
              <span>CÔNG NGHỆ BẢN ĐỒ LEAFLET</span>
            </div>
            <p className="text-charcoal/80 font-light text-[11px] leading-relaxed">
              Vận hành trên nền tảng bản đồ mã nguồn mở Leaflet kết hợp lớp phủ Carto Voyager, bảo đảm tốc độ phản hồi tức thì và không phụ thuộc API độc quyền.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeritageMapPage;
