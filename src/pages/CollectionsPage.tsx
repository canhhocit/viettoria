import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Layers, ArrowRight } from 'lucide-react';
import { publicApi } from '../services/api';
import type { Collection } from '../types';
import { PageLoadingHeritage } from '../components/common/HeritageSkeleton';
import { HeritageTimeline } from '../components/common/HeritageTimeline';

export const CollectionsPage: React.FC = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    publicApi.getCollections().then((data) => {
      setCollections(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <PageLoadingHeritage message="Đang tải các bộ sưu tập di sản kiến trúc..." />;
  }

  return (
    <div className="bg-paper min-h-screen py-12 sm:py-20 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Page Header */}
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-brass text-xs font-mono uppercase tracking-widest">
            <Layers className="w-4 h-4" />
            <span>Phân Loại Niên Đại & Kiến Trúc</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-forest leading-tight">
            Các Tuyển Tập Di Sản
          </h1>
          <p className="text-base text-charcoal/80 font-light leading-relaxed">
            Mỗi bộ sưu tập đại diện cho một thời kỳ hoàng kim của kiến trúc Việt Nam. Chúng tôi tái hiện từng cấu kiện với lòng thành kính và tiêu chuẩn kỹ thuật số bảo tàng học.
          </p>
        </div>

        {/* Chronological Heritage Timeline (1049 - 1863) */}
        <section>
          <HeritageTimeline />
        </section>

        {/* Collections Grid Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-paper-border pb-3">
            <h2 className="font-serif text-2xl font-bold text-forest">
              Danh Mục Bộ Sưu Tập Theo Thời Kỳ
            </h2>
            <span className="text-xs font-mono text-charcoal-muted uppercase">
              {collections.length} Tuyển Tập
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections.map((col) => (
              <div
                key={col.id}
                className="bg-paper-warm border border-paper-border hover:border-brass transition-all corner-frame overflow-hidden flex flex-col justify-between group shadow-sm"
              >
                <div>
                  <div className="aspect-[16/10] overflow-hidden bg-forest relative">
                    <img
                      src={col.heroImage}
                      alt={col.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-forest/90 border border-brass/50 px-2.5 py-1 text-[11px] font-serif uppercase tracking-wider text-brass">
                      Tuyển Tập
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 space-y-3">
                    <h3 className="font-serif text-2xl font-bold text-forest group-hover:text-brass transition-colors">
                      {col.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-charcoal/80 font-light leading-relaxed">
                      {col.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 sm:p-8 pt-0 border-t border-paper-border mt-4">
                  <div className="pt-4 flex items-center justify-between">
                    <span className="text-xs font-mono text-charcoal-muted">
                      {col.productsCount || 1} Công trình nghiên cứu
                    </span>

                    <Link
                      to={`/collections/${col.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-forest font-bold group-hover:text-brass transition-colors"
                    >
                      <span>Khám phá bộ sưu tập</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CollectionsPage;
