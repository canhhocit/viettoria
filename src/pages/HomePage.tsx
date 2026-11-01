import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  QrCode, 
  BookOpen
} from 'lucide-react';
import { publicApi } from '../services/api';
import type { Product, Collection, BlogPost } from '../types';

export const HomePage: React.FC = () => {
  const [heroProduct, setHeroProduct] = useState<Product | null>(null);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    publicApi.getFeatured().then((data) => {
      if (mounted) {
        setHeroProduct(data.heroProduct);
        setCollections(data.collections);
        setBlogs(data.latestBlogs);
        setLoading(false);
      }
    });
    return () => { mounted = false; };
  }, []);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-paper text-forest font-mono text-xs">
        ĐANG KHỞI TẠO KHÔNG GIAN DI SẢN...
      </div>
    );
  }

  return (
    <div className="bg-paper text-charcoal">
      {/* 1. EDITORIAL HERO SECTION */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden bg-forest-dark text-paper">
        {/* Ambient Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-25 filter grayscale contrast-125 pointer-events-none"
        >
          <source src="/videos/hero-background.webm" type="video/webm" />
        </video>

        {/* Heritage Pattern Overlay */}
        <div className="heritage-grain absolute inset-0 opacity-40 pointer-events-none" />
        
        {/* Faint Dong Son Watermark */}
        <img
          src="/images/trong-dong.webp"
          alt=""
          aria-hidden="true"
          className="absolute -right-24 sm:-right-12 top-1/2 -translate-y-1/2 h-[120%] opacity-[0.08] pointer-events-none object-contain select-none mix-blend-screen"
        />

        {/* Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-brass/60 bg-forest/80 backdrop-blur-sm text-brass text-xs font-mono uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Phygital Heritage Collectibles • Phenikaa PSI 2026</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-paper leading-[1.15]">
            Di Sản Kiến Trúc Việt Nam,<br />
            <span className="italic font-normal text-brass-subtle">Thu Nhỏ Trọn Vẹn Trên Tay Bạn</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-paper/80 font-light leading-relaxed">
            VIETTORIA không bán một mô hình thu nhỏ đơn thuần. VIETTORIA mang đến một cách mới để khám phá, hiểu và lưu giữ những câu chuyện nghìn năm của kiến trúc và văn hóa Việt Nam.
          </p>

          {/* CTA Group */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/products/chua-mot-cot"
              className="w-full sm:w-auto px-8 py-3.5 bg-brass text-forest hover:bg-brass-light transition-colors font-mono text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2.5 shadow-lg group"
            >
              <span>Khám Phá Chùa Một Cột (Hero)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/collections"
              className="w-full sm:w-auto px-8 py-3.5 border border-paper/40 text-paper hover:border-brass hover:text-brass transition-colors font-mono text-xs uppercase tracking-widest"
            >
              <span>Xem Toàn Bộ 5 Tuyệt Tác</span>
            </Link>
          </div>

          {/* Micro Specs Banner */}
          <div className="pt-8 sm:pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-paper/15 text-left font-mono">
            <div>
              <span className="text-[10px] text-paper/50 uppercase tracking-widest block">Tỷ lệ điêu khắc</span>
              <span className="font-serif text-base text-brass font-bold">1:120 Chuẩn Xác</span>
            </div>
            <div>
              <span className="text-[10px] text-paper/50 uppercase tracking-widest block">Vật liệu sinh học</span>
              <span className="font-serif text-base text-brass font-bold">BioPETG Bền Vững</span>
            </div>
            <div>
              <span className="text-[10px] text-paper/50 uppercase tracking-widest block">Kỹ thuật liên kết</span>
              <span className="font-serif text-base text-brass font-bold">Mộng Gỗ Không Keo</span>
            </div>
            <div>
              <span className="text-[10px] text-paper/50 uppercase tracking-widest block">Không gian số</span>
              <span className="font-serif text-base text-brass font-bold">QR Audio Guide</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BRAND PHILOSOPHY / 3 TRỤ CỘT PHYGITAL */}
      <section className="py-20 sm:py-28 border-b border-paper-border bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-brass font-semibold">
              Triết Lý Chế Tác
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest">
              Mô Thức Phygital Heritage
            </h2>
            <p className="text-sm text-charcoal-muted font-light leading-relaxed">
              Sự giao thoa hoàn hảo giữa tay nghề thủ công, công nghệ in 3D nano-layer và nền tảng số hóa di sản.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1 */}
            <div className="p-8 bg-paper-warm border border-paper-border hover:border-brass transition-all corner-frame space-y-4">
              <div className="w-12 h-12 flex items-center justify-center bg-forest text-brass border border-brass">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-forest">
                1. Mô Hình Vật Lý Tinh Xảo
              </h3>
              <p className="text-sm text-charcoal/80 font-light leading-relaxed">
                Được sản xuất từ vật liệu BioPETG thân thiện môi trường, tái hiện chuẩn xác từng khớp mộng ngậm gỗ và góc đao cong với dung sai quang học dưới 0.08mm.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-8 bg-paper-warm border border-paper-border hover:border-brass transition-all corner-frame space-y-4">
              <div className="w-12 h-12 flex items-center justify-center bg-forest text-brass border border-brass">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-forest">
                2. Storytelling Lịch Sử Chuẩn Xác
              </h3>
              <p className="text-sm text-charcoal/80 font-light leading-relaxed">
                Mỗi công trình không đơn thuần là đồ lưu niệm, mà là một pho sử liệu sống động được thẩm định nghiêm ngặt từ các văn bia, mộc bản và chuyên gia sử học.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-8 bg-paper-warm border border-paper-border hover:border-brass transition-all corner-frame space-y-4">
              <div className="w-12 h-12 flex items-center justify-center bg-forest text-brass border border-brass">
                <QrCode className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-forest">
                3. Trải Nghiệm Số Qua Tem QR
              </h3>
              <p className="text-sm text-charcoal/80 font-light leading-relaxed">
                Dưới đế mỗi mô hình là tem mã QR độc bản. Người sở hữu quét mã để mở khóa bản thu âm Audio Guide độc quyền và tài liệu khảo cứu kiến trúc chuyên sâu.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HERO PRODUCT SPOTLIGHT: CHÙA MỘT CỘT */}
      {heroProduct && (
        <section className="py-20 sm:py-28 bg-forest text-paper relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Model Image & Inspection Framing */}
              <div className="lg:col-span-7">
                <div className="relative border border-brass/40 corner-frame bg-forest-dark overflow-hidden group shadow-2xl">
                  <img
                    src={heroProduct.heroImage}
                    alt={heroProduct.name}
                    className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-forest/90 border border-brass/60 px-3 py-1 font-mono text-[10px] text-brass uppercase tracking-widest">
                    Mã Tác Phẩm: {heroProduct.code}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-forest/90 border border-paper/20 px-3 py-1 font-mono text-xs text-paper">
                    Tỷ lệ {heroProduct.modelSpecs.scale} • Cao {heroProduct.modelSpecs.heightCm}cm
                  </div>
                </div>
              </div>

              {/* Right Column: Hero Information */}
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-brass text-xs font-mono uppercase tracking-widest">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Tác Phẩm Tinh Hoa Trọng Tâm (Hero Release)</span>
                  </div>
                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-paper">
                    {heroProduct.name}
                  </h2>
                  <p className="font-serif italic text-brass-subtle text-lg">
                    {heroProduct.subName}
                  </p>
                </div>

                <p className="text-sm sm:text-base text-paper/80 font-light leading-relaxed">
                  {heroProduct.shortDescription}
                </p>

                {/* Technical Specifications Snapshot */}
                <div className="p-4 bg-forest-dark border border-brass/30 grid grid-cols-2 gap-3 text-xs font-mono">
                  <div>
                    <span className="text-paper/50 block">Niên Đại:</span>
                    <span className="text-paper font-semibold">{heroProduct.epoch}</span>
                  </div>
                  <div>
                    <span className="text-paper/50 block">Địa Điểm:</span>
                    <span className="text-paper font-semibold">{heroProduct.location}</span>
                  </div>
                  <div>
                    <span className="text-paper/50 block">Số Chi Tiết Mộng:</span>
                    <span className="text-brass font-bold">{heroProduct.modelSpecs.partsCount} Bộ phận</span>
                  </div>
                  <div>
                    <span className="text-paper/50 block">Vật Liệu:</span>
                    <span className="text-paper font-semibold">{heroProduct.modelSpecs.material}</span>
                  </div>
                </div>

                {/* Call to action */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <Link
                    to={`/products/${heroProduct.slug}`}
                    className="px-6 py-3.5 bg-brass text-forest hover:bg-brass-light transition-colors font-mono text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 shadow-md"
                  >
                    <span>Khám Phá Di Sản & Bản Thu Âm</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    to={`/products/${heroProduct.slug}?section=assembly`}
                    className="px-5 py-3.5 border border-paper/30 text-paper hover:border-brass hover:text-brass transition-colors font-mono text-xs uppercase tracking-wider text-center"
                  >
                    Xem Khớp Mộng Gỗ
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. FEATURED COLLECTIONS GRID */}
      <section className="py-20 sm:py-28 border-b border-paper-border bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-brass font-semibold">
                Tuyển Tập Di Sản
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest">
                Các Bộ Sưu Tập Kiến Trúc
              </h2>
            </div>

            <Link
              to="/collections"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-forest font-bold hover:text-brass transition-colors"
            >
              <span>Xem Tất Cả Bộ Sưu Tập</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {collections.map((col) => (
              <Link
                key={col.id}
                to={`/collections/${col.slug}`}
                className="group block bg-paper-warm border border-paper-border hover:border-brass transition-all corner-frame overflow-hidden"
              >
                <div className="aspect-[16/10] overflow-hidden bg-forest relative">
                  <img
                    src={col.heroImage}
                    alt={col.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-forest/90 border border-brass/50 px-2.5 py-1 text-[10px] font-mono uppercase text-brass">
                    {col.code}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="font-serif text-xl font-bold text-forest group-hover:text-brass transition-colors">
                    {col.name}
                  </h3>
                  <p className="text-xs text-charcoal/80 font-light line-clamp-3 leading-relaxed">
                    {col.description}
                  </p>
                  <div className="pt-2 flex items-center justify-between text-xs font-mono text-charcoal-muted border-t border-paper-border">
                    <span>{col.productsCount || 1} Tác phẩm</span>
                    <span className="text-brass group-hover:translate-x-1 transition-transform flex items-center gap-1 font-bold">
                      Chi tiết <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CULTURAL ESSAYS / BLOG PREVIEW */}
      <section className="py-20 sm:py-28 bg-paper-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-brass font-semibold">
                Nghiên Cứu & Bảo Tồn
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest">
                Góc Nhìn Di Sản
              </h2>
            </div>

            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-forest font-bold hover:text-brass transition-colors"
            >
              <span>Xem Thư Viện Bài Viết</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <article
                key={blog.id}
                className="bg-paper border border-paper-border hover:border-brass transition-all corner-frame overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/10] overflow-hidden bg-forest">
                    <img
                      src={blog.coverImage}
                      alt={blog.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-6 space-y-2.5">
                    <div className="flex items-center justify-between text-[11px] font-mono text-charcoal-muted">
                      <span className="text-brass font-semibold">{blog.category}</span>
                      <span>{blog.readTime}</span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-forest hover:text-brass transition-colors leading-snug">
                      <Link to={`/blogs/${blog.slug}`}>
                        {blog.title}
                      </Link>
                    </h3>

                    <p className="text-xs text-charcoal/80 font-light line-clamp-3 leading-relaxed">
                      {blog.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-paper-border mt-4">
                  <div className="flex items-center justify-between pt-3 text-[11px] font-mono text-charcoal-muted">
                    <span>Tác giả: {blog.author}</span>
                    <Link to={`/blogs/${blog.slug}`} className="text-brass font-bold hover:underline">
                      Đọc tiếp →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
