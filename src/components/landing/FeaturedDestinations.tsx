import React, { useState } from 'react';
import { Search, MapPin, ArrowRight, Play } from 'lucide-react';
import type { HeritageSKU } from '../../types/heritage';
import { HERITAGE_COLLECTION } from '../../data/mockHeritage';

interface FeaturedDestinationsProps {
  onSelectSKU: (sku: HeritageSKU) => void;
  onOpenMap: () => void;
  onOpenAssembly: () => void;
}

const DESTINATIONS = [
  {
    id: 'chua-mot-cot',
    name: 'Chùa Một Cột (Liên Hoa Đài)',
    province: 'Hà Nội',
    image: '/images/chua-mot-cot.webp',
    hasModel: true,
    skuId: 'chua-mot-cot',
  },
  {
    id: 'van-mieu',
    name: 'Khuê Văn Các (Văn Miếu)',
    province: 'Hà Nội',
    image: '/images/van-mieu-quoc-tu-giam.webp',
    hasModel: true,
    skuId: 'khue-van-cac',
  },
  {
    id: 'hoang-thanh',
    name: 'Hoàng Thành Thăng Long',
    province: 'Hà Nội',
    image: '/images/hoang-thanh-thang-long.webp',
    hasModel: true,
    skuId: 'cot-co-ha-noi',
  },
  {
    id: 'thua-thien-hue',
    name: 'Ngọ Môn — Cố Đô Huế',
    province: 'Huế',
    image: '/images/thua-thien-hue.webp',
    hasModel: true,
    skuId: 'ngo-mon-hue',
  },
  {
    id: 'lang-tu-duc',
    name: 'Điện Hòa Khiêm — Lăng Tự Đức',
    province: 'Huế',
    image: '/images/lang-vua-tu-duc.webp',
    hasModel: false,
  },
  {
    id: 'dinh-doc-lap',
    name: 'Bến Nhà Rồng & Dinh Độc Lập',
    province: 'TP. Hồ Chí Minh',
    image: '/images/dinh-doc-lap.webp',
    hasModel: true,
    skuId: 'ben-nha-rong',
  },
];

export const FeaturedDestinations: React.FC<FeaturedDestinationsProps> = ({
  onSelectSKU,
  onOpenMap,
  onOpenAssembly,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filtered = DESTINATIONS.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.province.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCardClick = (dest: typeof DESTINATIONS[0]) => {
    if (dest.skuId) {
      const sku = HERITAGE_COLLECTION.find(s => s.id === dest.skuId);
      if (sku) onSelectSKU(sku);
    } else {
      onOpenMap();
    }
  };

  return (
    <div className="relative overflow-hidden bg-[#f7f3eb] py-14">
      {/* Background Watermark Trống Đồng from Disanviet */}
      <img
        className="pointer-events-none absolute left-0 top-1/2 z-0 h-[85%] w-auto -translate-y-1/2 scale-150 object-contain opacity-20"
        src="/images/trong-dong-half.webp"
        alt=""
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Title & Search Bar */}
        <div className="flex flex-col justify-between gap-4 border-b border-[#b8aa8d] pb-5 sm:flex-row sm:items-end">
          <div className="flex flex-wrap items-end gap-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#776f62] font-mono">
                Dấu tích và địa danh
              </p>
              <h2 className="mt-1 font-serif text-3xl sm:text-4xl text-[#5a4325] font-bold">
                Điểm Đến Nổi Bật
              </h2>
            </div>

            {/* Search Input Box */}
            <div className="flex max-w-xs items-center rounded-full border border-[#b8aa8d] bg-[#fffaf0] px-4 py-1.5 shadow-sm">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm di tích, tỉnh thành..."
                className="w-full bg-transparent text-xs text-[#2d2820] placeholder:text-[#776f62] focus:outline-none"
              />
              <Search className="w-4 h-4 text-[#6f5830] shrink-0" />
            </div>
          </div>

          <button
            onClick={onOpenMap}
            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#6f5830] hover:text-[#9b7a3a] transition-colors font-semibold"
          >
            <span>Xem trên bản đồ</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 6 Destination Cards Grid (Disanviet layout) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {filtered.map(dest => (
            <div
              key={dest.id}
              onClick={() => handleCardClick(dest)}
              className="group relative block aspect-[4/3] cursor-pointer overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-[#b8aa8d]/60 bg-[#2d2820]"
            >
              <img
                src={dest.image}
                alt={dest.name}
                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.92)] via-[rgba(0,0,0,0.4)] to-transparent"></div>

              {dest.hasModel && (
                <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-[#f6d99b] text-[#102832] font-mono text-[9px] font-bold uppercase shadow-sm">
                  Mô Hình 3D
                </div>
              )}

              <div className="absolute inset-x-0 bottom-0 p-3 text-white">
                <p className="text-xs font-serif font-bold leading-snug line-clamp-2 text-[#fffaf0]">
                  {dest.name}
                </p>
                <p className="mt-1 flex items-center gap-1 text-[10px] text-white/75 font-mono">
                  <MapPin className="w-2.5 h-2.5 text-[#f6d99b]" />
                  <span>{dest.province}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Cinematic 3D Showcase Banner (Reverse-Engineered from Disanviet) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-6">
          {/* Main 3D Feature Card */}
          <div className="lg:col-span-8 relative min-h-[380px] overflow-hidden rounded-2xl border border-[#b8aa8d] bg-[#102832] text-[#fffaf0] shadow-xl">
            <img
              src="/images/van-mieu-quoc-tu-giam.webp"
              alt="Tham quan 3D Văn Miếu"
              className="absolute inset-0 h-full w-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#102832] via-[#102832]/50 to-transparent"></div>

            <div className="relative p-6 sm:p-8 space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#f6d99b]">
                Không Gian Số & Tháo Lắp Mộng
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                Bảo Tàng & Mô Hình 3D Tương Tác
              </h3>
              <p className="text-xs sm:text-sm text-white/80 max-w-lg font-light leading-relaxed">
                Tự do xoay 360 độ, zoom cận cảnh từng đường đao mái ngói và bóc tách cấu kiện mộng gỗ Chùa Một Cột, Khuê Văn Các với độ phân giải cao.
              </p>
            </div>

            {/* Big Play / View Button */}
            <button
              onClick={onOpenAssembly}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#f8f1e3]/90 text-[#5a4325] flex items-center justify-center shadow-2xl hover:scale-110 transition-transform group"
              title="Khám phá 3D ngay"
            >
              <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" />
            </button>

            {/* Thumbnail Gallery Strip at Bottom */}
            <div className="absolute bottom-5 inset-x-6 flex items-end justify-between gap-4">
              <div className="hidden sm:flex items-center gap-2">
                {[
                  '/images/chua-mot-cot.webp',
                  '/images/van-mieu-quoc-tu-giam.webp',
                  '/images/hoang-thanh-thang-long.webp',
                  '/images/thua-thien-hue.webp',
                ].map((thumb, idx) => (
                  <img
                    key={idx}
                    src={thumb}
                    alt=""
                    className="h-12 w-16 rounded border border-[#b8aa8d]/60 object-cover opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
                  />
                ))}
              </div>

              <button
                onClick={onOpenAssembly}
                className="rounded-full bg-[#f8f1e3]/90 px-4 py-2 text-xs font-semibold text-[#5a4325] hover:bg-white transition-colors font-mono"
              >
                Bắt đầu khám phá 3D →
              </button>
            </div>
          </div>

          {/* Side Card: "Bạn có câu chuyện về di sản?" */}
          <div className="lg:col-span-4 h-full rounded-2xl border border-[#b8aa8d] bg-[#efe6d2] p-6 shadow-lg flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#776f62]">
                Sứ Mệnh Cộng Đồng
              </span>
              <h4 className="font-serif text-2xl font-bold text-[#5a4325]">
                Bạn Có Câu Chuyện Về Di Sản?
              </h4>
              <p className="text-xs text-[#776f62] leading-relaxed font-light">
                Chia sẻ hình ảnh, câu chuyện và ký ức địa phương để cùng Viettoria gìn giữ và số hóa các dấu ấn lịch sử hào hùng của non sông Việt Nam.
              </p>
            </div>

            <div className="pt-6">
              <img
                src="/images/bao-tang-lich-su.webp"
                alt="Chia sẻ di sản"
                className="w-full h-32 rounded-lg object-cover mb-4 border border-[#b8aa8d]/40"
              />
              <button
                onClick={onOpenMap}
                className="w-full py-2.5 rounded-full bg-[#6f5830] text-[#fffaf0] hover:bg-[#9b7a3a] text-xs font-semibold tracking-wider transition-colors font-mono uppercase"
              >
                Xem Toàn Bộ 34 Tỉnh Thành
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
