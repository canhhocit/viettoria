import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { 
  MapPin, 
  Ruler, 
  CheckCircle 
} from 'lucide-react';
import { publicApi } from '../services/api';
import type { Product } from '../types';
import { ArchitecturalViewer } from '../components/common/ArchitecturalViewer';
import { AudioPlayer } from '../components/common/AudioPlayer';
import { StoryBlockRenderer } from '../components/story/StoryBlockRenderer';
import { ScaleRuler } from '../components/common/ScaleRuler';
import { PageLoadingHeritage } from '../components/common/HeritageSkeleton';
import { resolveImageUrl, handleImageFallback } from '../utils/mediaResolver';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const codeParam = searchParams.get('code');
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      setLoading(true);
      publicApi.getProductBySlugOrCode(slug).then((data) => {
        setProduct(data);
        setLoading(false);
      });
    }
  }, [slug]);

  if (loading) {
    return <PageLoadingHeritage message="Đang tải dữ liệu..." />;
  }

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-paper text-center px-4">
        <h2 className="font-serif text-2xl font-bold text-forest mb-2">Không tìm thấy tác phẩm di sản</h2>
        <p className="text-sm text-charcoal-muted mb-6">Mã tác phẩm hoặc đường dẫn không hợp lệ.</p>
        <Link to="/products" className="px-5 py-2.5 bg-forest text-paper font-mono text-xs uppercase tracking-wider">
          Xem danh mục tác phẩm
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-paper min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Đường dẫn điều hướng" className="flex items-center gap-2 text-xs font-mono text-charcoal-muted uppercase tracking-wider">
          <Link to="/" className="hover:text-forest transition-colors">Trang Chủ</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-forest transition-colors">Tác Phẩm</Link>
          <span>/</span>
          <span className="text-brass font-bold">{product.name}</span>
        </nav>

        {/* QR Deep-link Welcome Toast/Banner (When code parameter is present) */}
        {codeParam && (
          <div className="p-4 sm:p-5 bg-forest text-paper border border-brass corner-frame flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl animate-fadeIn">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex-none bg-brass text-forest flex items-center justify-center font-bold">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase tracking-wider text-brass font-bold">
                    Xác Thực Thành Công Tem QR Di Sản Độc Bản
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-paper/90 font-light mt-0.5">
                  Chào mừng bạn đến với mô hình <strong className="font-semibold text-brass-subtle">{product.name}</strong> trên tay bạn! Không gian số và Audio Guide độc quyền đã được mở khóa.
                </p>
              </div>
            </div>

            <div className="text-[11px] font-mono text-brass-subtle uppercase tracking-widest shrink-0">
              Định Danh Vật Lý 1:120
            </div>
          </div>
        )}

        {/* Product Identity Header */}
        <div className="space-y-4 max-w-4xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 bg-paper-warm border border-paper-border text-forest text-xs uppercase tracking-wider font-medium">
              {product.epoch}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-charcoal-muted">
              <MapPin className="w-3.5 h-3.5 text-brass" />
              <span>{product.location}</span>
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-forest">
            {product.name}
          </h1>

          <p className="font-serif italic text-brass-dark text-lg sm:text-xl">
            {product.subName}
          </p>

          <p className="text-base sm:text-lg text-charcoal/85 font-light leading-relaxed max-w-3xl">
            {product.shortDescription}
          </p>
        </div>

        {/* Architectural Inspection Frame */}
        <section className="space-y-4">
          

          <ArchitecturalViewer product={product} />
        </section>

        {/* Audio Guide Section */}
        {product.audioGuide && (
          <section className="mx-auto max-w-5xl space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-forest">
                Audio Guide Thuyết Minh Lịch Sử
              </h2>
              <span className="text-xs font-mono text-brass uppercase font-semibold">
                Độc quyền cho chủ sở hữu mô hình
              </span>
            </div>

            <AudioPlayer audioGuide={product.audioGuide} heritageName={product.name} />
          </section>
        )}

        {/* Modular Story Blocks Section */}
        {product.storyBlocks && product.storyBlocks.length > 0 && (
          <section className="space-y-6 pt-6">
            <div className="border-b border-paper-border pb-4 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-brass font-semibold block mb-1">
                  Khảo Luận Chuyên Sâu
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest">
                  Hành Trình Di Sản Qua Các Thế Kỷ
                </h2>
              </div>
            </div>

            <div className="space-y-8">
              {product.storyBlocks.map((block) => (
                <StoryBlockRenderer 
                  key={block.id} 
                  block={block} 
                  heritageName={product.name} 
                />
              ))}
            </div>
          </section>
        )}

        {/* Interactive Scale Ruler & Hand Perspective */}
        <section className="space-y-4">
          <ScaleRuler 
            modelSpecs={product.modelSpecs} 
            heritageName={product.name} 
          />
        </section>

        {/* Technical Specifications Sheet */}
        <section className="py-12 bg-paper-warm border border-paper-border corner-frame p-6 sm:p-10 space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-brass text-xs font-mono uppercase tracking-widest">
              <Ruler className="w-4 h-4" />
              <span>Tiêu Chuẩn Kỹ Thuật Chế Tác</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest">
              Bảng Thông Số Mô Hình Thu Nhỏ
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4 border-t border-paper-border">
            <div className="space-y-1">
              <span className="text-xs font-mono text-charcoal-muted uppercase">Tỷ Lệ Điêu Khắc</span>
              <p className="font-serif text-xl font-bold text-forest">{product.modelSpecs.scale}</p>
              <p className="text-[11px] text-charcoal/70 font-light">Chuẩn tỷ lệ kiến trúc truyền thống</p>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono text-charcoal-muted uppercase">Kích Thước Thực Tế</span>
              <p className="font-serif text-xl font-bold text-forest">
                {product.modelSpecs.heightCm} × {product.modelSpecs.widthCm} cm
              </p>
              <p className="text-[11px] text-charcoal/70 font-light">
                Khối lượng tịnh: {product.modelSpecs.weightGrams}g
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono text-charcoal-muted uppercase">Vật Liệu Cốt Lõi</span>
              <p className="font-serif text-xl font-bold text-forest">{product.modelSpecs.material}</p>
              <p className="text-[11px] text-charcoal/70 font-light">Thân thiện môi trường, chống ẩm mốc</p>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono text-charcoal-muted uppercase">Kỹ Nghệ Chế Tác</span>
              <p className="font-serif text-xl font-bold text-brass">
                {product.modelSpecs.partsCount} Cấu Kiện Tinh Xảo
              </p>
              <p className="text-[11px] text-charcoal/70 font-light">{product.modelSpecs.finishing}</p>
            </div>
          </div>
        </section>

        {/* Related Products Section */}
        {product.relatedProducts && product.relatedProducts.length > 0 && (
          <section className="space-y-6 pt-8 border-t border-paper-border">
            <h2 className="font-serif text-2xl font-bold text-forest">
              Các Tác Phẩm Cùng Thời Kỳ
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {product.relatedProducts.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/products/${rel.slug}`}
                  className="group bg-paper-warm border border-paper-border hover:border-brass transition-all corner-frame p-5 block space-y-3"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-forest">
                    <img
                      src={resolveImageUrl(rel.heroImage)}
                      alt={rel.name}
                      onError={(e) => handleImageFallback(e)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] text-brass uppercase font-serif tracking-wider">{rel.epoch}</span>
                    <h3 className="font-serif text-lg font-bold text-forest group-hover:text-brass transition-colors">
                      {rel.name}
                    </h3>
                    <p className="text-xs text-charcoal-muted font-light">{rel.location}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
