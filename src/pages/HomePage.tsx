import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { publicApi } from '../services/api';
import type { Product, Collection, BlogPost } from '../types';
import { FALLBACK_BLOGS, FALLBACK_COLLECTIONS, FALLBACK_PRODUCTS } from '../data/fallbackData';
import { resolve3DModelUrl, resolveImageUrl, handleImageFallback } from '../utils/mediaResolver';

const productPoster: Record<string, string> = {
  'chua-mot-cot': '/3D/chua-mot-cot-poster.webp',
  'khue-van-cac': '/3D/khue-van-cac-poster.webp',
  'cot-co-ha-noi': '/3D/cot-co-ha-noi-poster.webp',
  'ngo-mon-hue': '/3D/ngo-mon-hue-poster.webp',
  'ben-nha-rong': '/3D/ben-nha-rong-poster.webp',
};

const productTurntable: Record<string, string> = {
  'chua-mot-cot': '/3D/chua-mot-cot-card.webm',
  'khue-van-cac': '/3D/khue-van-cac-card.webm',
  'cot-co-ha-noi': '/3D/cot-co-ha-noi-card.webm',
  'ngo-mon-hue': '/3D/ngo-mon-hue-card.webm',
  'ben-nha-rong': '/3D/ben-nha-rong-card.webm',
};

const imageFor = (path?: string | null, slug?: string) =>
  resolveImageUrl(path || (slug ? productPoster[slug] : undefined));

const useReducedMotionPreference = () => {
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    setReducedMotion(preference.matches);
    preference.addEventListener('change', updatePreference);
    return () => preference.removeEventListener('change', updatePreference);
  }, []);

  return reducedMotion;
};

const useHomeScrollReveal = (containerRef: React.RefObject<HTMLElement | null>, reducedMotion: boolean) => {
  useEffect(() => {
    const container = containerRef.current;
    if (!container || reducedMotion || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -48px 0px', threshold: 0.12 });

    const observeTargets = () => {
      container.querySelectorAll<HTMLElement>('[data-home-reveal]:not(.is-visible)')
        .forEach((target) => observer.observe(target));
    };

    container.classList.add('home-reveal-ready');
    observeTargets();

    const mutations = new MutationObserver(observeTargets);
    mutations.observe(container, { childList: true, subtree: true });

    return () => {
      mutations.disconnect();
      observer.disconnect();
      container.classList.remove('home-reveal-ready');
    };
  }, [containerRef, reducedMotion]);
};

const InteractiveModelStage: React.FC<{ product: Product; reducedMotion: boolean; }> = ({ product, reducedMotion }) => {
  const [viewerAvailable, setViewerAvailable] = useState(() =>
    typeof window !== 'undefined' && Boolean(window.customElements?.get('model-viewer')),
  );
  const [modelLoaded, setModelLoaded] = useState(false);
  const [modelFailed, setModelFailed] = useState(false);
  const poster = productPoster[product.slug] || imageFor(product.heroImage);
  const modelUrl = resolve3DModelUrl(product.model3dUrl || product.slug);
  const turntable = productTurntable[product.slug];

  useEffect(() => {
    if (window.customElements.get('model-viewer')) {
      setViewerAvailable(true);
      return;
    }

    let mounted = true;
    const fallbackTimer = window.setTimeout(() => {
      if (mounted) setViewerAvailable(false);
    }, 4000);

    void window.customElements.whenDefined('model-viewer').then(() => {
      if (!mounted) return;
      window.clearTimeout(fallbackTimer);
      setViewerAvailable(true);
    });

    return () => {
      mounted = false;
      window.clearTimeout(fallbackTimer);
    };
  }, []);

  const useTurntableFallback = reducedMotion === false && Boolean(turntable) && (!viewerAvailable || modelFailed || !modelLoaded);

  return (
    <>
      <img
        src={poster}
        alt=""
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full object-contain mix-blend-multiply transition-opacity duration-700 ${modelLoaded ? 'opacity-0' : 'opacity-100'}`}
        onError={(event) => handleImageFallback(event, '/3D/chua-mot-cot-poster.webp')}
      />
      {useTurntableFallback && (
        <video
          key={`${product.slug}-preview`}
          src={turntable}
          poster={poster}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-contain mix-blend-multiply transition-opacity duration-700 ${modelLoaded ? 'opacity-0' : 'opacity-100'}`}
        />
      )}
      {viewerAvailable && !modelFailed && (
        // @ts-expect-error Custom element is registered by model-viewer.min.js in index.html.
        <model-viewer
          key={`${product.slug}-model`}
          src={modelUrl}
          alt={`Mô hình 3D có thể xoay của ${product.name}`}
          camera-controls
          auto-rotate={reducedMotion ? undefined : ''}
          rotation-per-second="14deg"
          shadow-intensity="0.8"
          exposure="1.05"
          loading="eager"
          reveal="auto"
          style={{ width: '100%', height: '100%', backgroundColor: 'transparent', touchAction: 'pan-y' }}
          onLoad={() => setModelLoaded(true)}
          onError={() => setModelFailed(true)}
          className={`home-model-viewer absolute inset-0 h-full w-full transition-opacity duration-700 ${modelLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
      <div className="pointer-events-none absolute left-4 top-4 z-10 bg-[#F7F3EA]/90 px-3 py-1.5 text-[11px] text-[#5D4A31]">
        {modelLoaded ? 'Mô hình 3D · Kéo để xoay' : modelFailed ? 'Bản xem trước 360°' : viewerAvailable ? 'Đang mở mô hình 3D…' : 'Bản xem trước 360°'}
      </div>
    </>
  );
};

const ScrollyHeritage: React.FC<{ products: Product[]; }> = ({ products }) => {
  const reducedMotion = useReducedMotionPreference();
  const [activeIndex, setActiveIndex] = useState(0);
  const chapterRefs = useRef<Array<HTMLElement | null>>([]);
  const activeProduct = products[activeIndex] || products[0];

  useEffect(() => {
    const chapters = chapterRefs.current.filter((chapter): chapter is HTMLElement => chapter !== null);
    if (chapters.length === 0 || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver((entries) => {
      const closestChapter = entries
        .filter((entry) => entry.isIntersecting)
        .sort((first, second) => {
          const firstDistance = Math.abs(first.boundingClientRect.top + first.boundingClientRect.height / 2 - window.innerHeight / 2);
          const secondDistance = Math.abs(second.boundingClientRect.top + second.boundingClientRect.height / 2 - window.innerHeight / 2);
          return firstDistance - secondDistance;
        })[0];

      if (closestChapter) {
        setActiveIndex(Number(closestChapter.target.getAttribute('data-chapter-index')));
      }
    }, { rootMargin: '-40% 0px -40% 0px', threshold: 0 });

    chapters.forEach((chapter) => observer.observe(chapter));
    return () => observer.disconnect();
  }, [products]);

  if (products.length === 0 || !activeProduct) return null;

  const jumpToChapter = (index: number) => {
    chapterRefs.current[index]?.scrollIntoView({
      behavior: reducedMotion ? 'auto' : 'smooth',
      block: 'center',
    });
  };

  return (
    <section id="hanh-trinh-di-san" className="home-story-section border-y border-[#D8CCB8] bg-[#F7F3EA]">
      <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-16 lg:py-24">
        <header data-home-reveal className="mb-9 max-w-2xl sm:mb-12">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8D6A39]">Một vòng qua di sản Việt</p>
          <h2 className="font-display text-3xl leading-tight text-[#29241D] sm:text-4xl lg:text-5xl">Mỗi công trình, một câu chuyện</h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[#665C4D] sm:text-base">
            Cuộn trang để lần lượt ngắm các mô hình 3D và khám phá câu chuyện phía sau từng dấu ấn kiến trúc.
          </p>
        </header>

        <div className="grid items-start gap-7 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div data-home-reveal className="home-story-stage sticky top-[76px] z-10 h-[min(62vw,390px)] min-h-[250px] overflow-hidden border border-[#D4C7B1] bg-[#EAE2D3] shadow-sm lg:top-24 lg:h-[min(68vh,650px)] lg:min-h-[480px]">
            <InteractiveModelStage key={activeProduct.slug} product={activeProduct} reducedMotion={reducedMotion} />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-[#2B241C]/85 via-[#2B241C]/35 to-transparent px-5 pb-5 pt-16 text-[#FFF9EE] sm:px-7 sm:pb-7">
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-[#E4C98C]">Đang xem mô hình</p>
                <p className="mt-1 font-display text-xl sm:text-2xl">{activeProduct.name}</p>
              </div>
              <span className="font-mono text-xs tracking-[0.14em] text-white/80">0{activeIndex + 1} / 0{products.length}</span>
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[2px] bg-white/25" aria-hidden="true">
              <div className="h-full bg-[#D4AF67] transition-[width] duration-700" style={{ width: `${((activeIndex + 1) / products.length) * 100}%` }} />
            </div>
          </div>

          <div className="home-story-chapters">
            {products.map((product, index) => (
              <article
                key={product.id}
                id={`di-san-${product.slug}`}
                data-chapter-index={index}
                ref={(element) => { chapterRefs.current[index] = element; }}
                className={`home-story-chapter flex min-h-[58vh] flex-col justify-center border-b border-[#D8CCB8] py-10 transition-all duration-700 last:border-0 lg:min-h-[68vh] ${activeIndex === index ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-60'}`}
              >
                <div className="mb-5 flex items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-[#846741]">
                  <span className="font-mono">0{index + 1}</span>
                  <span className="h-px w-8 bg-[#BBA784]" />
                  <span>{product.location}</span>
                </div>
                <h3 className="font-display text-3xl leading-tight text-[#29241D] sm:text-4xl">{product.name}</h3>
                <p className="mt-2 font-display text-base italic text-[#826846]">{product.subName}</p>
                <p className="mt-5 max-w-lg text-sm leading-7 text-[#665C4D] sm:text-base">{product.shortDescription}</p>
                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-[#D8CCB8] pt-4 text-xs text-[#786A55]">
                  <span>{product.epoch}</span>
                  <Link to={`/products/${product.slug}`} className="inline-flex items-center gap-2 font-semibold text-[#735735] transition-colors hover:text-[#9C3D28]">
                    Tìm hiểu công trình <ArrowRight size={14} strokeWidth={1.6} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        <nav className="mt-7 flex flex-wrap gap-2 lg:ml-[calc(52.5%-1rem)]" aria-label="Chọn công trình đang xem">
          {products.map((product, index) => (
            <button
              key={product.id}
              type="button"
              onClick={() => jumpToChapter(index)}
              aria-pressed={activeIndex === index}
              className={`border px-3 py-2 text-xs transition-colors ${activeIndex === index ? 'border-[#735735] bg-[#735735] text-[#FFF9EE]' : 'border-[#D4C7B1] text-[#695B47] hover:border-[#735735]'}`}
            >
              0{index + 1} · {product.name}
            </button>
          ))}
        </nav>
      </div>
    </section>
  );
};

export const HomePage: React.FC = () => {
  const mainRef = useRef<HTMLElement>(null);
  const initialHero = FALLBACK_PRODUCTS.find((product) => product.isHeroRelease) || FALLBACK_PRODUCTS[0];
  const [heroProduct, setHeroProduct] = useState<Product | null>(initialHero || null);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>(FALLBACK_PRODUCTS.filter((product) => !product.isHeroRelease).slice(0, 4));
  const [collections, setCollections] = useState<Collection[]>(FALLBACK_COLLECTIONS);
  const [blogs, setBlogs] = useState<BlogPost[]>(FALLBACK_BLOGS);
  const [heroVideoReady, setHeroVideoReady] = useState(false);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotionPreference();
  useHomeScrollReveal(mainRef, prefersReducedMotion);

  const storyProducts = useMemo(() => {
    const products = [...(heroProduct ? [heroProduct] : []), ...featuredProducts];
    return [...new Map(products.map((product) => [product.id, product])).values()].slice(0, 3);
  }, [featuredProducts, heroProduct]);

  useEffect(() => {
    let mounted = true;
    publicApi.getFeatured().then((data) => {
      if (!mounted) return;
      setHeroProduct(data.heroProduct);
      setFeaturedProducts(data.featuredProducts || []);
      setCollections(data.collections);
      setBlogs(data.latestBlogs);
    });
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video || prefersReducedMotion || typeof IntersectionObserver === 'undefined') return;

    let heroVisible = false;
    const updatePlayback = () => {
      if (heroVisible && !document.hidden) {
        void video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      heroVisible = entry.isIntersecting;
      updatePlayback();
    }, { threshold: 0.05 });

    observer.observe(video);
    document.addEventListener('visibilitychange', updatePlayback);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', updatePlayback);
      video.pause();
    };
  }, [prefersReducedMotion]);

  return (
    <main ref={mainRef} className="bg-[#F5F0E5] text-[#29241D]">
      <section id="hero" className="home-hero relative isolate flex min-h-[620px] overflow-hidden bg-[#0D1C16] text-[#FAF7F0] md:min-h-[calc(100svh-80px)]">
        <img
          src="/videos/hero-background-poster.webp"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {!prefersReducedMotion && (
          <video
            ref={heroVideoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/videos/hero-background-poster.webp"
            aria-hidden="true"
            onLoadedMetadata={(event) => {
              if (event.currentTarget.currentTime < 1) event.currentTarget.currentTime = 1;
            }}
            onSeeked={() => setHeroVideoReady(true)}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${heroVideoReady ? 'opacity-100' : 'opacity-0'}`}
          >
            <source src="/videos/hero-background.webm" type="video/webm" />
          </video>
        )}
        <div className="home-hero-scrim absolute inset-0" aria-hidden="true" />
        <div className="home-hero-drum pointer-events-none absolute -right-[17vw] top-1/2 z-[1] h-[82vw] w-[82vw] max-h-[920px] max-w-[920px] -translate-y-1/2 sm:-right-[10vw] lg:right-[-5vw] lg:h-[64vw] lg:w-[64vw]" aria-hidden="true">
          <img src="/images/trong-dong.webp" alt="" className="home-dong-son h-full w-full object-contain opacity-25 mix-blend-screen" />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-[1440px] items-center px-5 pb-24 pt-16 sm:px-8 lg:px-16">
          <div className="max-w-[760px] animate-fade-up py-10">
            <p className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E1C47F]">
              <span className="h-px w-9 bg-[#C49A45]" />
              Di sản Việt Nam · Viettoria
            </p>
            <h1 className="font-display text-[clamp(3rem,5.5vw,5.2rem)] font-medium leading-[1.04] tracking-[-0.035em] text-[#FAF7F0]">
              Di sản Việt Nam,<br />
              <em className="font-normal text-[#E2C681]">thu nhỏ trên tay.</em>
            </h1>
            <p className="mt-6 max-w-[540px] text-base leading-7 text-white/85 sm:text-lg sm:leading-8">
              Khám phá những công trình tiêu biểu qua mô hình 3D, câu chuyện lịch sử và những góc nhìn mới về di sản Việt.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/collections" className="inline-flex min-h-12 items-center gap-3 bg-[#B88A44] px-6 py-3 text-sm font-semibold text-[#142820] transition-colors hover:bg-[#D4AF67]">
                Khám phá bộ sưu tập <ArrowRight size={16} strokeWidth={1.7} />
              </Link>
              <Link to="/about" className="inline-flex min-h-12 items-center gap-2 border border-white/45 px-5 py-3 text-sm text-[#FAF7F0] transition-colors hover:border-[#E2C681] hover:text-[#E2C681]">
                Câu chuyện Viettoria
              </Link>
            </div>
            <div className="mt-11 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/25 pt-4 text-xs tracking-wide text-white/75">
              <span>Mô hình kiến trúc</span><span className="h-1 w-1 bg-[#C49A45]" /><span>Câu chuyện di sản</span><span className="h-1 w-1 bg-[#C49A45]" /><span>Trải nghiệm 3D</span>
            </div>
          </div>
        </div>
        <a href="#hanh-trinh-di-san" className="absolute bottom-6 left-5 z-10 inline-flex items-center gap-2 text-xs tracking-wide text-white/80 transition-colors hover:text-white sm:left-8 lg:left-16">
          Cuộn để khám phá <ArrowDown size={14} strokeWidth={1.5} />
        </a>
      </section>

      <ScrollyHeritage products={storyProducts} />

      <section id="bo-suu-tap" className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-16 lg:py-24">
        <div data-home-reveal className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-[#D2C7B5] pb-5 sm:mb-10">
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8D6A39]">Chọn theo câu chuyện bạn yêu thích</p>
            <h2 className="font-display text-3xl text-[#29241D] sm:text-4xl">Bộ sưu tập di sản</h2>
          </div>
          <Link to="/collections" className="inline-flex items-center gap-2 pb-1 text-sm font-semibold text-[#735735] hover:text-[#9C3D28]">
            Xem tất cả <ArrowRight size={15} strokeWidth={1.6} />
          </Link>
        </div>

        <div className="grid gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection) => {
            const representative = storyProducts.find((product) => product.collectionId === collection.id);
            const poster = imageFor(representative?.heroImage || collection.heroImage, representative?.slug);
            return (
              <Link key={collection.id} to={`/collections/${collection.slug}`} data-home-reveal className="group block border-b border-[#D2C7B5] pb-5">
                <div className="relative mb-4 flex aspect-[1.32/0.9] items-center justify-center overflow-hidden bg-[#EAE2D3]">
                  <img
                    src={poster}
                    alt={collection.name}
                    onError={(event) => handleImageFallback(event, '/3D/chua-mot-cot-poster.webp')}
                    className="h-full w-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-[1.035]"
                  />
                  <span className="absolute left-3 top-3 bg-[#F7F3EA]/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.13em] text-[#735735]">{collection.productsCount || 1} tác phẩm</span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl text-[#332B20] transition-colors group-hover:text-[#80633D]">{collection.name}</h3>
                    <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-[#746A5A]">{collection.description}</p>
                  </div>
                  <ArrowRight size={17} strokeWidth={1.4} className="mt-1 shrink-0 text-[#9A7846] transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="border-y border-[#D5CBB9] bg-[#E9E1D2]">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-5 py-14 sm:px-8 md:grid-cols-[0.8fr_1.2fr] lg:px-16">
          <div data-home-reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8D6A39]">Ghi chép về di sản</p>
            <h2 className="mt-3 font-display text-3xl text-[#30281E] sm:text-4xl">Câu chuyện phía sau công trình</h2>
            <p className="mt-3 max-w-sm text-sm leading-6 text-[#6C6253]">Đọc thêm về kiến trúc, con người và những dấu mốc làm nên từng di sản.</p>
            <Link to="/blogs" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#735735] hover:text-[#9C3D28]">Đọc bài viết <ArrowRight size={14} /></Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {blogs.slice(0, 2).map((blog, index) => (
              <article key={blog.id} data-home-reveal className="border-t border-[#BDAE96] pt-4">
                <p className="text-[11px] uppercase tracking-[0.14em] text-[#806847]">{blog.category} · 0{index + 1}</p>
                <h3 className="mt-3 font-display text-2xl leading-snug text-[#352D22]"><Link to={`/blogs/${blog.slug}`} className="transition-colors hover:text-[#80633D]">{blog.title}</Link></h3>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#706656]">{blog.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
