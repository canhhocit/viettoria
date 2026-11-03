import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, ArrowRight, ShieldCheck, Compass } from 'lucide-react';

export interface HeritageSiteLocation {
  id: string;
  code: string;
  name: string;
  subName: string;
  slug: string;
  epoch: string;
  city: 'hanoi' | 'hue' | 'saigon';
  cityName: string;
  location: string;
  lat: number;
  lng: number;
  heroImage: string;
  scale: string;
  heightCm: number;
  description: string;
}

export const HERITAGE_SITES: HeritageSiteLocation[] = [
  {
    id: '1',
    code: 'VT-HN-001',
    name: 'Chùa Một Cột',
    subName: 'Diên Hựu Tự — Liên Hoa Đài',
    slug: 'chua-mot-cot',
    epoch: 'Thời Lý (Năm 1049)',
    city: 'hanoi',
    cityName: 'Thăng Long — Hà Nội',
    location: 'Đội Cấn, Ba Đình, Hà Nội',
    lat: 21.0358,
    lng: 105.8335,
    heroImage: '/images/chua-mot-cot-hero.webp',
    scale: '1:120',
    heightCm: 12.0,
    description: 'Đài hoa sen nghìn năm tuổi, biểu tượng kiến trúc Phật giáo kinh thành Thăng Long thời Lý thịnh trị.',
  },
  {
    id: '2',
    code: 'VT-HN-002',
    name: 'Khuê Văn Các',
    subName: 'Gác Vẻ Đẹp Sao Khuê',
    slug: 'khue-van-cac',
    epoch: 'Triều Nguyễn (Năm 1805)',
    city: 'hanoi',
    cityName: 'Thăng Long — Hà Nội',
    location: 'Văn Miếu - Quốc Tử Giám, Đống Đa, Hà Nội',
    lat: 21.0286,
    lng: 105.8355,
    heroImage: '/images/khue-van-cac.webp',
    scale: '1:120',
    heightCm: 14.5,
    description: 'Biểu tượng tinh hoa hiếu học của đất kinh kỳ, kiến trúc gỗ lầu vuông giao hòa trời đất.',
  },
  {
    id: '3',
    code: 'VT-HN-003',
    name: 'Cột Cờ Hà Nội',
    subName: 'Kỳ Đài Thăng Long',
    slug: 'cot-co-ha-noi',
    epoch: 'Triều Nguyễn (Năm 1812)',
    city: 'hanoi',
    cityName: 'Thăng Long — Hà Nội',
    location: '28A Điện Biên Phủ, Ba Đình, Hà Nội',
    lat: 21.0324,
    lng: 105.8398,
    heroImage: '/images/cot-co-ha-noi.webp',
    scale: '1:200',
    heightCm: 16.5,
    description: 'Kỳ đài kiên cố xây dựng bằng gạch vồ nung, chứng nhân lịch sử thăng trầm của kinh đô nghìn năm.',
  },
  {
    id: '4',
    code: 'VT-HUE-004',
    name: 'Ngọ Môn Huế',
    subName: 'Cửa Chính Hoàng Thành Huế',
    slug: 'ngo-mon-hue',
    epoch: 'Triều Nguyễn (Năm 1833)',
    city: 'hue',
    cityName: 'Cố Đô Huế',
    location: 'Hoàng Thành Huế, TP. Huế, Thừa Thiên Huế',
    lat: 16.4697,
    lng: 107.5786,
    heroImage: '/images/ngo-mon-hue.webp',
    scale: '1:200',
    heightCm: 10.5,
    description: 'Đỉnh cao kiến trúc cung đình triều Nguyễn với kết cấu lầu Ngũ Phụng chín tầng đao cong lộng lẫy.',
  },
  {
    id: '5',
    code: 'VT-SG-005',
    name: 'Bến Nhà Rồng',
    subName: 'Thương Cảng Sài Gòn 1863',
    slug: 'ben-nha-rong',
    epoch: 'Cận Đại (Năm 1863)',
    city: 'saigon',
    cityName: 'Sài Gòn — Gia Định',
    location: '01 Nguyễn Tất Thành, Quận 4, TP. Hồ Chí Minh',
    lat: 10.7681,
    lng: 106.7067,
    heroImage: '/images/ben-nha-rong.webp',
    scale: '1:150',
    heightCm: 12.5,
    description: 'Giao thoa giữa kiến trúc Pháp thuộc và hoa văn rồng Á Đông bên dòng sông Sài Gòn phồn hoa.',
  },
];

interface HeritageMapProps {
  initialSiteId?: string;
  compactHeight?: boolean;
}

export const HeritageMap: React.FC<HeritageMapProps> = ({ 
  initialSiteId, 
  compactHeight = false 
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  const [activeSite, setActiveSite] = useState<HeritageSiteLocation>(
    HERITAGE_SITES.find(s => s.id === initialSiteId) || HERITAGE_SITES[0]
  );
  const [activeRegion, setActiveRegion] = useState<'all' | 'hanoi' | 'hue' | 'saigon'>('all');

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapRef.current) return; // Map already initialized

    // Initialize Leaflet map
    const map = L.map(mapContainerRef.current, {
      center: [16.5, 107.0],
      zoom: 6,
      zoomControl: false,
      scrollWheelZoom: true,
      attributionControl: true,
    });

    // Custom Zoom control at bottom right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Reliable High-Speed TileLayer (100% Accessible in Vietnam & Globally, No API Key Required)
    const tileLayer = L.tileLayer('https://mt{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      subdomains: ['0', '1', '2', '3'],
      attribution: '&copy; Google Maps &bull; Dữ liệu khảo cứu VIETTORIA',
      maxZoom: 20,
    });
    tileLayer.addTo(map);

    mapRef.current = map;

    // Auto fit bounds to encompass all 5 heritage sites across Vietnam
    const bounds = L.latLngBounds(HERITAGE_SITES.map(s => [s.lat, s.lng]));
    map.fitBounds(bounds, { padding: [40, 40] });

    // Handle container resize cleanly
    setTimeout(() => {
      map.invalidateSize();
    }, 200);

    // Create markers for each heritage site
    HERITAGE_SITES.forEach((site) => {
      const isHero = site.code === 'VT-HN-001';
      
      // Antique Atelier Pin Icon
      const icon = L.divIcon({
        className: 'heritage-custom-pin',
        html: `
          <div style="
            position: relative;
            width: 38px;
            height: 38px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: ${isHero ? '#B88A44' : '#142820'};
            color: ${isHero ? '#142820' : '#FAF7F0'};
            border: 2px solid #FAF7F0;
            box-shadow: 0 4px 12px rgba(13, 28, 22, 0.45);
            cursor: pointer;
            transition: all 0.2s ease;
          ">
            <span style="font-family: 'Cinzel', serif; font-size: 13px; font-weight: bold;">
              ${site.id}
            </span>
            <div style="
              position: absolute;
              bottom: -6px;
              left: 50%;
              transform: translateX(-50%);
              width: 0;
              height: 0;
              border-left: 5px solid transparent;
              border-right: 5px solid transparent;
              border-top: 6px solid ${isHero ? '#B88A44' : '#142820'};
            "></div>
          </div>
        `,
        iconSize: [38, 44],
        iconAnchor: [19, 44],
        popupAnchor: [0, -42],
      });

      const marker = L.marker([site.lat, site.lng], { 
        icon,
        zIndexOffset: isHero ? 1000 : 100 - parseInt(site.id),
      }).addTo(map);

      // Tooltip on hover
      marker.bindTooltip(`<b>${site.code}</b>: ${site.name}`, {
        direction: 'top',
        offset: [0, -44],
        className: 'heritage-map-tooltip',
      });

      // Popup with Heritage Atelier styling
      const popupHtml = `
        <div style="
          font-family: 'Be Vietnam Pro', sans-serif;
          min-width: 220px;
          padding: 8px 4px;
          background: #FAF7F0;
          color: #1B1E1B;
        ">
          <div style="font-family: monospace; font-size: 10px; color: #B88A44; letter-spacing: 0.15em; text-transform: uppercase; font-weight: bold; margin-bottom: 4px;">
            ${site.code} • ${site.epoch}
          </div>
          <h4 style="font-family: 'Cinzel', serif; font-size: 15px; font-weight: bold; color: #142820; margin: 0 0 4px 0;">
            ${site.name}
          </h4>
          <p style="font-size: 11px; color: #525952; margin: 0 0 8px 0; line-height: 1.4;">
            ${site.location}
          </p>
          <div style="font-family: monospace; font-size: 10px; color: #142820; border-top: 1px solid #DCD4C4; padding-top: 6px;">
            Tỷ lệ ${site.scale} • Cao ${site.heightCm}cm
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml, {
        className: 'heritage-atelier-popup',
        closeButton: true,
      });

      marker.on('click', () => {
        setActiveSite(site);
      });

      markersRef.current[site.id] = marker;
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Fly to region or site
  const flyToRegion = (region: 'all' | 'hanoi' | 'hue' | 'saigon') => {
    setActiveRegion(region);
    const map = mapRef.current;
    if (!map) return;

    if (region === 'all') {
      const allBounds = L.latLngBounds(HERITAGE_SITES.map(s => [s.lat, s.lng]));
      map.flyToBounds(allBounds, { padding: [50, 50], duration: 1.2 });
    } else if (region === 'hanoi') {
      map.flyTo([21.032, 105.836], 15, { duration: 1.2 });
      const hanoiSite = HERITAGE_SITES.find(s => s.city === 'hanoi');
      if (hanoiSite) setActiveSite(hanoiSite);
    } else if (region === 'hue') {
      map.flyTo([16.4697, 107.5786], 15, { duration: 1.2 });
      const hueSite = HERITAGE_SITES.find(s => s.city === 'hue');
      if (hueSite) setActiveSite(hueSite);
    } else if (region === 'saigon') {
      map.flyTo([10.7681, 106.7067], 15, { duration: 1.2 });
      const sgSite = HERITAGE_SITES.find(s => s.city === 'saigon');
      if (sgSite) setActiveSite(sgSite);
    }
  };

  const focusSite = (site: HeritageSiteLocation) => {
    setActiveSite(site);
    const map = mapRef.current;
    if (!map) return;

    map.flyTo([site.lat, site.lng], 16, { duration: 1.0 });

    const marker = markersRef.current[site.id];
    if (marker) {
      marker.openPopup();
    }
  };

  return (
    <div className="bg-paper border border-brass/40 corner-frame shadow-xl overflow-hidden flex flex-col lg:flex-row">
      {/* Left Sidebar: Heritage Site Navigator */}
      <div className="w-full lg:w-96 bg-paper-warm border-b lg:border-b-0 lg:border-r border-paper-border p-6 flex flex-col justify-between space-y-6 shrink-0">
        <div className="space-y-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-brass text-xs font-mono uppercase tracking-widest">
              <Compass className="w-4 h-4" />
              <span>Bản Đồ Số Thực Địa (Leaflet Engine)</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-forest">
              Tọa Độ Di Sản Kiến Trúc
            </h3>
            <p className="text-xs text-charcoal/80 font-light leading-relaxed">
              Khám phá vị trí địa lý nguyên bản của 5 tuyệt tác kiến trúc trải dài khắp ba miền đất nước.
            </p>
          </div>

          {/* Quick Region Selector Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 bg-paper border border-paper-border text-xs font-mono">
            <button
              onClick={() => flyToRegion('all')}
              className={`py-1.5 px-2 text-center transition-colors ${
                activeRegion === 'all'
                  ? 'bg-forest text-brass font-bold'
                  : 'text-charcoal-muted hover:text-forest'
              }`}
            >
              Toàn Cảnh
            </button>
            <button
              onClick={() => flyToRegion('hanoi')}
              className={`py-1.5 px-2 text-center transition-colors ${
                activeRegion === 'hanoi'
                  ? 'bg-forest text-brass font-bold'
                  : 'text-charcoal-muted hover:text-forest'
              }`}
            >
              Hà Nội (3)
            </button>
            <button
              onClick={() => flyToRegion('hue')}
              className={`py-1.5 px-2 text-center transition-colors ${
                activeRegion === 'hue'
                  ? 'bg-forest text-brass font-bold'
                  : 'text-charcoal-muted hover:text-forest'
              }`}
            >
              Huế (1)
            </button>
            <button
              onClick={() => flyToRegion('saigon')}
              className={`py-1.5 px-2 text-center transition-colors ${
                activeRegion === 'saigon'
                  ? 'bg-forest text-brass font-bold'
                  : 'text-charcoal-muted hover:text-forest'
              }`}
            >
              Sài Gòn (1)
            </button>
          </div>

          {/* Heritage Sites Mini List */}
          <div className="space-y-2 max-h-56 lg:max-h-64 overflow-y-auto pr-1">
            {HERITAGE_SITES.map((site) => {
              const isSelected = activeSite.id === site.id;
              return (
                <button
                  key={site.id}
                  onClick={() => focusSite(site)}
                  className={`w-full text-left p-3 border transition-all flex items-start justify-between gap-3 ${
                    isSelected
                      ? 'bg-forest text-paper border-brass font-semibold shadow-sm'
                      : 'bg-paper border-paper-border text-charcoal hover:border-brass/70'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono">
                      <span className={isSelected ? 'text-brass font-bold' : 'text-brass'}>
                        {site.code}
                      </span>
                      <span className={isSelected ? 'text-paper/60' : 'text-charcoal-muted'}>
                        • {site.cityName.split('—')[0]}
                      </span>
                    </div>
                    <div className="font-serif text-sm font-bold">
                      {site.name}
                    </div>
                  </div>

                  <span className={`text-[10px] font-mono px-1.5 py-0.5 border ${
                    isSelected 
                      ? 'border-brass/50 bg-forest-dark text-brass' 
                      : 'border-paper-border bg-paper-warm text-charcoal-muted'
                  }`}>
                    {site.scale}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Heritage Spotlight Card */}
        <div className="p-4 bg-forest text-paper border border-brass/50 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-brass font-bold uppercase">{activeSite.code}</span>
            <span className="text-paper/60 text-[11px]">{activeSite.epoch}</span>
          </div>

          <div className="space-y-1">
            <h4 className="font-serif text-lg font-bold text-paper">
              {activeSite.name}
            </h4>
            <p className="text-[11px] text-brass-subtle italic">
              {activeSite.subName}
            </p>
          </div>

          <p className="text-xs text-paper/80 font-light line-clamp-2 leading-relaxed">
            {activeSite.description}
          </p>

          <div className="pt-2 flex items-center justify-between border-t border-paper/15 text-xs font-mono">
            <span className="flex items-center gap-1 text-brass text-[11px]">
              <MapPin className="w-3.5 h-3.5" />
              <span className="truncate max-w-[150px]">{activeSite.location}</span>
            </span>

            <Link
              to={`/products/${activeSite.slug}`}
              className="text-brass hover:text-brass-light flex items-center gap-1 font-bold group"
            >
              <span>Khảo cứu</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Right: Leaflet Map Viewport */}
      <div 
        className={`relative flex-1 bg-paper-warm ${
          compactHeight ? 'min-h-[360px] lg:min-h-[440px]' : 'min-h-[420px] lg:min-h-[560px]'
        }`}
      >
        {/* Leaflet DOM container */}
        <div 
          ref={mapContainerRef} 
          className="absolute inset-0 w-full h-full z-10"
        />

        {/* Subtle Watermark Overlay to preserve Heritage Aesthetic */}
        <div 
          className="absolute top-4 left-4 z-20 bg-forest/85 backdrop-blur-sm border border-brass/50 px-3 py-1.5 text-paper text-[10px] font-mono uppercase tracking-widest flex items-center gap-1.5 shadow-md pointer-events-none"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-brass" />
          <span>Bản Đồ Di Sản Leaflet • Tọa Độ Thực Địa</span>
        </div>

        {/* Top-Right Quick Legend */}
        <div className="absolute top-4 right-4 z-20 bg-paper/95 backdrop-blur-sm border border-paper-border px-3 py-1.5 text-charcoal text-[11px] font-mono hidden sm:flex items-center gap-3 shadow-md pointer-events-none">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-brass inline-block"></span>
            <span>Hero (Chùa Một Cột)</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-forest inline-block"></span>
            <span>Di Sản Khảo Cứu</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeritageMap;
