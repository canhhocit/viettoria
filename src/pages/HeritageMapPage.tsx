import React from 'react';
import { Compass } from 'lucide-react';
import { HeritageMap } from '../components/common/HeritageMap';

export const HeritageMapPage: React.FC = () => {
  return (
    <div className="bg-paper min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Page Header */}
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-brass text-xs font-mono uppercase tracking-widest">
            <Compass className="w-4 h-4" />
            <span>Hệ Thống Tọa Độ & Bản Đồ Số</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-forest leading-tight">
            Bản Đồ Di Sản Kiến Trúc Việt Nam
          </h1>
          <p className="text-sm text-charcoal/80 font-normal leading-relaxed">
            Chọn một điểm để xem vị trí và tọa độ.
          </p>
        </div>

        {/* The Leaflet Map Component */}
        <section>
          <HeritageMap />
        </section>

      </div>
    </div>
  );
};

export default HeritageMapPage;
