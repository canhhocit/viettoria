import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight, ArrowUpRight, Ruler, ScanLine } from 'lucide-react';
import { publicApi } from '../services/api';
import type { Product, Collection, BlogPost } from '../types';
import { PageLoadingHeritage } from '../components/common/HeritageSkeleton';
import { resolveImageUrl, handleImageFallback } from '../utils/mediaResolver';

const productPoster: Record<string, string> = {
  'chua-mot-cot': '/3D/chua-mot-cot-poster.webp',
  'khue-van-cac': '/3D/khue-van-cac-poster.webp',
  'cot-co-ha-noi': '/3D/cot-co-ha-noi-poster.webp',
  'ngo-mon-hue': '/3D/ngo-mon-hue-poster.webp',
  'ben-nha-rong': '/3D/ben-nha-rong-poster.webp',
};

const imageFor = (path?: string | null, slug?: string) => {
  if (slug && productPoster[slug]) return productPoster[slug];
  if (path?.startsWith('/images/')) return '/3D/chua-mot-cot-poster.webp';
  return resolveImageUrl(path);
};

export const HomePage: React.FC = () => {
  const [heroProduct, setHeroProduct] = useState<Product | null>(null);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    publicApi.getFeatured().then((data) => {
      if (!mounted) return;
      setHeroProduct(data.heroProduct);
      setCollections(data.collections);
      setBlogs(data.latestBlogs);
      setLoading(false);
    });
    return () => { mounted = false; };
  }, []);

  if (loading) return <PageLoadingHeritage message="Đang mở hồ sơ di sản..." />;

  return (
    <main className="atelier-home bg-[#F5F0E5] text-[#29241D]">
      <section className="atelier-hero relative overflow-hidden">
        <div className="atelier-blueprint" aria-hidden="true" />
        <div className="relative mx-auto grid min-h-[650px] max-w-[1440px] items-center gap-4 px-6 py-14 sm:px-10 lg:min-h-[700px] lg:grid-cols-[0.88fr_1.12fr] lg:px-20">
          <div className="relative z-10 max-w-[540px] py-8 lg:py-0">
            <div className="mb-7 flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-[#80633D]">
              <span className="h-px w-9 bg-[#A47D42]" />
              Di sản Việt Nam · Tuyển tập mô hình
            </div>
            <h1 className="font-display text-[clamp(3.1rem,6.2vw,6.2rem)] font-medium leading-[0.94] tracking-[-0.045em] text-[#262119]">
              Di sản Việt Nam,<br /><em className="font-normal text-[#715739]">thu nhỏ trên tay.</em>
            </h1>
            <p className="mt-7 max-w-[430px] text-[15px] leading-7 text-[#5D5549] sm:text-base">
              Những công trình đã làm nên dáng hình đất Việt, được tái hiện thành mô hình lắp ghép tinh xảo và hồ sơ di sản số.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link to="/products" className="atelier-button inline-flex items-center gap-3 bg-[#765936] px-6 py-3.5 text-[11px] uppercase tracking-[0.16em] text-[#FFF9ED] transition-colors hover:bg-[#4E3A25]">
                Khám phá tuyển tập <ArrowUpRight size={15} strokeWidth={1.5} />
              </Link>
              <Link to="/about" className="inline-flex items-center gap-2 border-b border-[#B5A78F] px-2 py-3 text-sm text-[#514635] transition-colors hover:border-[#765936] hover:text-[#765936]">
                Câu chuyện Viettoria <ArrowRight size={14} strokeWidth={1.5} />
              </Link>
            </div>
            <div className="mt-14 flex items-center gap-5 border-t border-[#CFC5B2] pt-5 text-[10px] uppercase tracking-[0.18em] text-[#776C5A]">
              <span>Hà Nội</span><span className="h-px w-7 bg-[#B7A98F]"/><span>Huế</span><span className="h-px w-7 bg-[#B7A98F]"/><span>Sài Gòn</span>
            </div>
          </div>

          <div className="atelier-hero-art relative mx-auto w-full max-w-[760px] lg:ml-auto">
            <div className="absolute inset-[8%_4%_5%_7%] border border-[#C8B99F]" />
            <div className="absolute inset-[11%_7%_8%_10%] border border-[#DDD2BE]" />
            <div className="absolute right-[7%] top-[5%] z-10 hidden text-right font-mono text-[11px] leading-5 tracking-[0.13em] text-[#887552] sm:block">HỒ SƠ KIẾN TRÚC<br/>MÃ SƯU TẬP · 001</div>
            <img
              src="/3D/chua-mot-cot-poster.webp"
              alt="Mô hình kiến trúc di sản Việt Nam được tái hiện dưới dạng mô hình thu nhỏ"
              className="atelier-artifact-float relative z-[1] aspect-[1.12/1] w-full object-contain brightness-125 mix-blend-multiply"
              onError={(e) => handleImageFallback(e, '/3D/chua-mot-cot-poster.webp')}
            />
            <div className="absolute bottom-[8%] left-[6%] z-10 flex items-center gap-3 border-l border-[#9A7846] bg-[#F5F0E5]/90 px-4 py-2.5">
              <Ruler size={17} strokeWidth={1.3} className="text-[#80633D]" />
              <div><p className="text-[11px] uppercase tracking-[0.14em] text-[#887552]">Mô hình chế tác</p><p className="mt-1 font-display text-lg leading-none text-[#30281E]">Tỷ lệ 1:120</p></div>
            </div>
            <div className="absolute bottom-[10%] right-[7%] z-10 flex h-12 w-12 items-center justify-center border border-[#B9A681] text-[#765936]" aria-hidden="true"><ScanLine size={19} strokeWidth={1.2}/></div>
          </div>
        </div>
        <a href="#tuyen-tap" className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#837660] lg:flex">Cuộn để khám phá <ArrowDown size={13} /></a>
      </section>

      <section className="border-y border-[#D7CDBB] bg-[#FBF8F0]">
        <div className="mx-auto grid max-w-[1440px] divide-y divide-[#D7CDBB] px-6 sm:px-10 md:grid-cols-3 md:divide-x md:divide-y-0 lg:px-20">
          {[
            ['01', 'Tái hiện công trình', 'Mô hình kiến trúc thu nhỏ với cấu kiện có thể lắp ghép.'],
            ['02', 'Lưu giữ câu chuyện', 'Tư liệu và lát cắt lịch sử đi cùng từng công trình.'],
            ['03', 'Khám phá không gian số', 'Mở hồ sơ di sản và mô hình 3D qua trải nghiệm trực tuyến.'],
          ].map(([number, title, description]) => <div key={number} className="flex gap-5 py-7 md:px-8 md:first:pl-0 md:last:pr-0">
            <span className="font-display text-2xl italic text-[#9B7A4D]">{number}</span><div><h2 className="font-display text-xl text-[#352D22]">{title}</h2><p className="mt-1.5 max-w-xs text-sm leading-6 text-[#716756]">{description}</p></div>
          </div>)}
        </div>
      </section>

      <section id="tuyen-tap" className="mx-auto max-w-[1440px] px-6 py-20 sm:px-10 sm:py-28 lg:px-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5 border-b border-[#CFC5B2] pb-5">
          <div><p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-[#9A7846]">Tuyển tập mở đầu · 2026</p><h2 className="font-display text-4xl text-[#30281E] sm:text-5xl">Những công trình tiêu biểu</h2></div>
          <Link to="/products" className="mb-1 inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-[#65533A] hover:text-[#9A7846]">Toàn bộ tác phẩm <ArrowRight size={15}/></Link>
        </div>
        {heroProduct && <Link to={`/products/${heroProduct.slug}`} className="group mb-12 grid overflow-hidden border border-[#D5CBB9] bg-[#EAE2D3] md:grid-cols-[1.2fr_0.8fr]">
          <div className="relative flex min-h-[300px] items-center justify-center overflow-hidden bg-[#E8DFCE] p-5 sm:min-h-[420px] sm:p-10">
            <img src={imageFor(heroProduct.heroImage, heroProduct.slug)} alt={heroProduct.name} onError={(e) => handleImageFallback(e, '/3D/chua-mot-cot-poster.webp')} className="h-full max-h-[490px] w-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-[1.035]"/>
            <span className="absolute left-5 top-5 border border-[#BDAA8A] px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] text-[#725B3B]">Tác phẩm nổi bật</span>
          </div>
          <div className="flex flex-col justify-center p-7 sm:p-12 lg:p-16">
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#967346]">{heroProduct.epoch}</p>
            <h3 className="mt-4 font-display text-4xl leading-tight text-[#30281E] sm:text-5xl">{heroProduct.name}</h3>
            <p className="mt-2 font-display text-lg italic text-[#806847]">{heroProduct.subName}</p>
            <p className="mt-6 max-w-md text-sm leading-7 text-[#665C4D]">{heroProduct.shortDescription}</p>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-y border-[#D0C4B0] py-4 text-[11px] uppercase tracking-[0.1em] text-[#746956]"><span>{heroProduct.modelSpecs.scale} · Tỷ lệ mô hình</span><span>{heroProduct.modelSpecs.heightCm} cm · Chiều cao</span><span>{heroProduct.modelSpecs.partsCount} cấu kiện</span></div>
            <span className="mt-7 inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#735735]">Xem hồ sơ công trình <ArrowUpRight size={15}/></span>
          </div>
        </Link>}
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection, index) => {
            const slug = ['chua-mot-cot', 'ngo-mon-hue', 'ben-nha-rong'][index] || 'khue-van-cac';
            const poster = productPoster[slug];
            return <Link key={collection.id} to={`/collections/${collection.slug}`} className="group border-b border-[#D7CDBB] pb-5">
              <div className="relative mb-4 flex aspect-[1.25/0.82] items-center justify-center overflow-hidden bg-[#E9E1D2]">
                <img src={poster || imageFor(collection.heroImage)} alt={collection.name} onError={(e) => handleImageFallback(e, '/3D/chua-mot-cot-poster.webp')} className="h-full w-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-[1.04]" />
                <span className="absolute left-3 top-3 font-mono text-[11px] tracking-[0.12em] text-[#77684F]">0{index + 1} / VI</span>
              </div>
              <div className="flex items-start justify-between gap-3"><div><h3 className="font-display text-2xl text-[#332B20] group-hover:text-[#80633D]">{collection.name}</h3><p className="mt-1 line-clamp-2 text-sm leading-5 text-[#746A5A]">{collection.description}</p></div><ArrowUpRight size={17} strokeWidth={1.3} className="mt-1 shrink-0 text-[#9A7846] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"/></div>
            </Link>;
          })}
        </div>
      </section>

      <section className="border-y border-[#D5CBB9] bg-[#E9E1D2]">
        <div className="mx-auto grid max-w-[1440px] items-center gap-8 px-6 py-14 sm:px-10 md:grid-cols-[0.8fr_1.2fr] lg:px-20">
          <div><p className="text-[10px] uppercase tracking-[0.24em] text-[#967346]">Ghi chép từ xưởng</p><h2 className="mt-3 font-display text-4xl text-[#30281E]">Vật thể và ký ức</h2><p className="mt-3 max-w-sm text-sm leading-6 text-[#6C6253]">Những câu chuyện về kiến trúc, kỹ nghệ chế tác và hành trình gìn giữ di sản.</p><Link to="/blogs" className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-[#735735]">Đọc bài viết <ArrowRight size={14}/></Link></div>
          <div className="grid gap-4 sm:grid-cols-2">{blogs.slice(0, 2).map((blog, index) => <article key={blog.id} className="border-t border-[#BDAE96] pt-4"><p className="text-[11px] uppercase tracking-[0.16em] text-[#92754D]">{blog.category} · 0{index + 1}</p><h3 className="mt-3 font-display text-2xl leading-snug text-[#352D22]"><Link to={`/blogs/${blog.slug}`} className="hover:text-[#80633D]">{blog.title}</Link></h3><p className="mt-2 line-clamp-2 text-sm leading-6 text-[#706656]">{blog.excerpt}</p></article>)}</div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
