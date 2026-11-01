import React, { useState } from 'react';
import { HERITAGE_COLLECTION } from '../../data/mockHeritage';
import type { HeritageSKU } from '../../types/heritage';
import { MapPin, Calendar, ArrowUpRight, Sparkles } from 'lucide-react';

interface CollectionGridProps {
  onSelectSKU: (sku: HeritageSKU) => void;
}

export const CollectionGrid: React.FC<CollectionGridProps> = ({ onSelectSKU }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filteredItems = HERITAGE_COLLECTION.filter(item => {
    if (selectedFilter === 'hanoi') return item.location.includes('Hà Nội');
    if (selectedFilter === 'hue') return item.location.includes('Huế');
    if (selectedFilter === 'saigon') return item.location.includes('Hồ Chí Minh');
    return true;
  });

  return (
    <section id="collection-section" className="py-24 bg-paper border-b border-paper-border heritage-grain">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-paper-border pb-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-brass text-xs font-mono tracking-widest uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bộ Sưu Tập Giới Hạn Giai Đoạn MVP</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-forest font-bold tracking-tight">
              Ngũ Đại Di Sản Việt Nam
            </h2>
          </div>

          {/* Regional Filter Tabs */}
          <div className="mt-6 md:mt-0 flex items-center gap-2">
            {[
              { id: 'all', label: 'Toàn Bộ (5 Di Sản)' },
              { id: 'hanoi', label: 'Thăng Long - Hà Nội' },
              { id: 'hue', label: 'Cố Đô Huế' },
              { id: 'saigon', label: 'Sài Gòn - Gia Định' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors duration-150 ${
                  selectedFilter === tab.id
                    ? 'bg-forest text-paper font-semibold'
                    : 'bg-paper-warm text-charcoal hover:bg-brass hover:text-paper border border-paper-border'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Collection Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className="group bg-paper-warm border border-paper-border hover:border-brass transition-all duration-200 flex flex-col justify-between corner-frame"
            >
              {/* Image Container with Passe-partout Frame */}
              <div className="relative h-64 overflow-hidden p-3 bg-paper">
                <img
                  src={item.heroImage}
                  alt={item.name}
                  className="w-full h-full object-cover filter contrast-[1.05] group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute top-5 left-5 bg-forest-dark/90 text-brass text-[10px] font-mono px-2.5 py-1 border border-brass/30">
                  {item.code}
                </div>
                <div className="absolute bottom-5 right-5 bg-paper/90 text-forest text-[11px] font-mono px-2 py-0.5 border border-paper-border">
                  TỶ LỆ {item.scale}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-charcoal-muted font-mono mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-brass" />
                      <span>{item.epoch}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-brass" />
                      <span>{item.location}</span>
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-forest group-hover:text-brass transition-colors duration-150">
                    {item.name}
                  </h3>
                  <p className="text-xs text-brass font-medium mt-0.5 mb-3 font-serif">
                    {item.subName}
                  </p>
                  <p className="text-xs text-charcoal/80 font-light leading-relaxed line-clamp-2">
                    {item.significance}
                  </p>
                </div>

                {/* Specs & Pricing */}
                <div className="pt-4 border-t border-paper-border space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-charcoal-muted">CHIỀU CAO: {item.heightCm} CM</span>
                    <span className="text-forest font-bold text-sm">
                      {item.price.toLocaleString('vi-VN')} VNĐ
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectSKU(item)}
                      className="flex-1 py-2.5 text-xs font-mono uppercase tracking-wider text-center bg-forest text-paper hover:bg-brass transition-colors duration-150 font-semibold"
                    >
                      Khám Phá Di Sản
                    </button>
                    <button
                      onClick={() => onSelectSKU(item)}
                      className="p-2.5 border border-forest text-forest hover:bg-forest hover:text-paper transition-colors duration-150"
                      title="Mở thông tin chi tiết"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
