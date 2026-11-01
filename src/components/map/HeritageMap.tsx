import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  MapPin, 
  Eye, 
  MessageSquare, 
  Compass
} from 'lucide-react';
import type { HeritageSKU } from '../../types/heritage';
import { HERITAGE_COLLECTION } from '../../data/mockHeritage';

export interface SatelliteLandmark {
  id: string;
  name: string;
  subName: string;
  region: 'north' | 'central' | 'south';
  province: string;
  address: string;
  yearBuilt: string;
  significance: string;
  lat: number;
  lng: number;
  zoomLevel: number;
  linkedSKUId?: string;
  image: string;
  highlights: string[];
}

export type MapLandmark = SatelliteLandmark;

export const SATELLITE_LANDMARKS: SatelliteLandmark[] = [
  {
    id: 'chua-mot-cot',
    name: 'Chùa Một Cột (Liên Hoa Đài)',
    subName: 'Diên Hựu Tự — Đóa Sen Thời Lý',
    region: 'north',
    province: 'Hà Nội',
    address: 'Phố Chùa Một Cột, Đội Cấn, Ba Đình, Hà Nội',
    yearBuilt: 'Năm 1049 (Thời Lý Thái Tông)',
    significance: 'Đỉnh cao triết lý Phật giáo Đại Việt với trụ đá độc nhất vươn lên giữa hồ Linh Chiểu.',
    lat: 21.03584,
    lng: 105.83361,
    zoomLevel: 18,
    linkedSKUId: 'chua-mot-cot',
    image: '/images/chua-mot-cot.webp',
    highlights: ['Trụ đá nguyên khối đường kính 1.2m', '8 thanh consol đòn gánh bung nở', 'Mái đao uốn cong thanh thoát']
  },
  {
    id: 'khue-van-cac',
    name: 'Khuê Văn Các (Văn Miếu)',
    subName: 'Gác Sao Khuê — Quốc Tử Giám',
    region: 'north',
    province: 'Hà Nội',
    address: 'Văn Miếu - Quốc Tử Giám, Đống Đa, Hà Nội',
    yearBuilt: 'Năm 1805 (Thời Nguyễn)',
    significance: 'Biểu tượng văn hiến nghìn năm Thăng Long, tôn vinh tinh thần đạo học và hiền tài.',
    lat: 21.02931,
    lng: 105.83604,
    zoomLevel: 18,
    linkedSKUId: 'khue-van-cac',
    image: '/images/van-mieu-quoc-tu-giam.webp',
    highlights: ['Cửa sổ tròn sao Khuê tỏa tia sáng', 'Tám mái chồng diêm cổ kính', 'Kết cấu Trời tròn Đất vuông']
  },
  {
    id: 'cot-co-ha-noi',
    name: 'Cột Cờ Hà Nội (Kỳ Đài)',
    subName: 'Kỳ Đài Thăng Long',
    region: 'north',
    province: 'Hà Nội',
    address: 'Số 28A Điện Biên Phủ, Ba Đình, Hà Nội',
    yearBuilt: 'Năm 1812 (Thời Gia Long)',
    significance: 'Chứng nhân lịch sử kiên cường qua hai cuộc kháng chiến, lá cờ đỏ sao vàng tung bay trên đỉnh cao.',
    lat: 21.03254,
    lng: 105.83965,
    zoomLevel: 18,
    linkedSKUId: 'cot-co-ha-noi',
    image: '/images/hoang-thanh-thang-long.webp',
    highlights: ['Tháp gạch bát giác 39 lỗ hoa thị', '3 tầng chóp cụt giật cấp uy nghiêm', 'Cầu thang xoắn 54 bậc']
  },
  {
    id: 'ngo-mon-hue',
    name: 'Ngọ Môn — Đại Nội Cố Đô Huế',
    subName: 'Cổng Chính Hoàng Thành Cố Đô',
    region: 'central',
    province: 'Thừa Thiên Huế',
    address: 'Đoàn Thị Điểm, Thuận Thành, Thành phố Huế',
    yearBuilt: 'Năm 1833 (Thời Minh Mạng)',
    significance: 'Đỉnh cao kiến trúc cung đình triều Nguyễn, nơi hội tụ nghệ thuật đục chạm đá và sơn son thếp vàng.',
    lat: 16.46973,
    lng: 107.57794,
    zoomLevel: 17,
    linkedSKUId: 'ngo-mon-hue',
    image: '/images/thua-thien-hue.webp',
    highlights: ['Lầu Ngũ Phụng 100 cây cột lim', 'Ngói hoàng lưu ly và thanh lưu ly', '5 cửa vòm đá nguyên khối']
  },
  {
    id: 'dien-hoa-khiem',
    name: 'Điện Hòa Khiêm — Lăng Tự Đức',
    subName: 'Nơi Thờ Vua Tự Đức & Hoàng Hậu',
    region: 'central',
    province: 'Thừa Thiên Huế',
    address: 'Đoàn Nhữ Hải, Thủy Xuân, Thành phố Huế',
    yearBuilt: 'Năm 1867 (Thời Tự Đức)',
    significance: 'Không gian lăng tẩm mang chất thơ lãng mạn bậc nhất xứ Huế, hòa quyện non nước hữu tình.',
    lat: 16.43282,
    lng: 107.56545,
    zoomLevel: 17,
    image: '/images/lang-vua-tu-duc.webp',
    highlights: ['Hồ Lưu Khiêm và nhà tạ Xung Khiêm', 'Kiến trúc gỗ sơn then cổ kính', 'Bia đá Khiêm Cung Ký đồ sộ']
  },
  {
    id: 'ben-nha-rong',
    name: 'Bến Nhà Rồng — Bảo Tàng Hồ Chí Minh',
    subName: 'Thương Cảng Sài Gòn Lịch Sử',
    region: 'south',
    province: 'TP. Hồ Chí Minh',
    address: 'Số 1 Nguyễn Tất Thành, Phường 12, Quận 4, TP.HCM',
    yearBuilt: 'Năm 1863 (Thời Cận Đại)',
    significance: 'Điểm khởi đầu của hành trình 30 năm bôn ba tìm đường cứu nước của Chủ tịch Hồ Chí Minh.',
    lat: 10.76813,
    lng: 106.70675,
    zoomLevel: 17,
    linkedSKUId: 'ben-nha-rong',
    image: '/images/dinh-doc-lap.webp',
    highlights: ['Đôi rồng gốm men xanh trên nóc nhà', 'Giao thoa kiến trúc Pháp - Á Đông', 'Vị thế bên dòng sông Sài Gòn']
  }
];

interface HeritageMapProps {
  onSelectLandmark?: (landmark: SatelliteLandmark) => void;
  onOpenAIWithLandmark?: (landmark: any) => void;
  onViewSKU?: (sku: HeritageSKU) => void;
}

export const HeritageMap: React.FC<HeritageMapProps> = ({
  onSelectLandmark,
  onOpenAIWithLandmark,
  onViewSKU,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  const [activeLandmarkId, setActiveLandmarkId] = useState<string>('chua-mot-cot');
  const [mapStyle, setMapStyle] = useState<'satellite' | 'street'>('satellite');

  const activeLandmark = SATELLITE_LANDMARKS.find(l => l.id === activeLandmarkId) || SATELLITE_LANDMARKS[0];

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Center on Vietnam or Chùa Một Cột initially
      const map = L.map(mapContainerRef.current, {
        center: [21.03584, 105.83361],
        zoom: 17,
        zoomControl: false,
        attributionControl: false,
      });

      // Add Zoom Control at bottom right
      L.control.zoom({ position: 'bottomright' }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Remove existing tile layer if any
    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    // High Resolution Satellite Imagery from Esri ArcGIS
    const tileUrl = mapStyle === 'satellite'
      ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
      : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

    const maxZoom = mapStyle === 'satellite' ? 19 : 19;

    const newTileLayer = L.tileLayer(tileUrl, {
      maxZoom,
      subdomains: 'abcd',
    }).addTo(map);

    tileLayerRef.current = newTileLayer;

    // Clear old markers
    Object.values(markersRef.current).forEach(m => map.removeLayer(m));
    markersRef.current = {};

    // Add Custom Heritage Markers
    SATELLITE_LANDMARKS.forEach((landmark) => {
      const isSelected = landmark.id === activeLandmarkId;

      const markerHtml = `
        <div class="relative group cursor-pointer">
          ${isSelected ? '<div class="absolute -inset-2 rounded-full border-2 border-[#f6d99b] animate-ping opacity-75"></div>' : ''}
          <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-bold shadow-2xl transition-transform duration-200 ${
            isSelected
              ? 'bg-[#f6d99b] text-[#102832] scale-110 border-2 border-white'
              : 'bg-[#102832]/90 text-[#f6d99b] border border-[#f6d99b]/60 hover:scale-105'
          }">
            <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span class="truncate max-w-[130px]">${landmark.name.split('(')[0]}</span>
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        html: markerHtml,
        className: 'custom-heritage-marker',
        iconSize: [140, 36],
        iconAnchor: [70, 18],
      });

      const marker = L.marker([landmark.lat, landmark.lng], { icon: customIcon })
        .addTo(map)
        .on('click', () => {
          handleFlyToLandmark(landmark);
        });

      markersRef.current[landmark.id] = marker;
    });

  }, [mapStyle, activeLandmarkId]);

  // Smoothly Fly To Landmark with Satellite Zoom
  const handleFlyToLandmark = (landmark: SatelliteLandmark) => {
    setActiveLandmarkId(landmark.id);
    if (onSelectLandmark) onSelectLandmark(landmark);

    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([landmark.lat, landmark.lng], landmark.zoomLevel, {
        duration: 1.8,
        easeLinearity: 0.25,
      });
    }
  };

  // Quick Region Zoom Presets
  const handleRegionPreset = (region: 'vietnam' | 'hanoi' | 'hue' | 'saigon') => {
    if (!mapInstanceRef.current) return;
    if (region === 'vietnam') {
      mapInstanceRef.current.flyTo([16.0, 107.5], 6, { duration: 1.5 });
    } else if (region === 'hanoi') {
      mapInstanceRef.current.flyTo([21.033, 105.836], 15, { duration: 1.5 });
    } else if (region === 'hue') {
      mapInstanceRef.current.flyTo([16.455, 107.572], 14, { duration: 1.5 });
    } else if (region === 'saigon') {
      mapInstanceRef.current.flyTo([10.772, 106.701], 15, { duration: 1.5 });
    }
  };

  const handleExplore3D = (landmark: SatelliteLandmark) => {
    if (landmark.linkedSKUId && onViewSKU) {
      const sku = HERITAGE_COLLECTION.find(s => s.id === landmark.linkedSKUId);
      if (sku) onViewSKU(sku);
    }
  };

  return (
    <div className="bg-[#f7f3eb] py-16 border-b border-[#b8aa8d] heritage-grain">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#b8aa8d] pb-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-[#9b7a3a] text-xs font-mono tracking-widest uppercase mb-2">
              <Compass className="w-3.5 h-3.5 text-[#9b7a3a]" />
              <span>Bản Đồ Không Gian Vệ Tinh Trực Quan</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#5a4325] font-bold tracking-tight">
              Khám Phá Di Sản Qua Vệ Tinh
            </h2>
          </div>

          {/* Quick Region Jump Bar */}
          <div className="mt-4 md:mt-0 flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-[#776f62] uppercase mr-1">Vùng trọng điểm:</span>
            {[
              { id: 'vietnam', label: 'Toàn Cảnh' },
              { id: 'hanoi', label: 'Hà Nội' },
              { id: 'hue', label: 'Cố Đô Huế' },
              { id: 'saigon', label: 'TP. Hồ Chí Minh' },
            ].map(preset => (
              <button
                key={preset.id}
                onClick={() => handleRegionPreset(preset.id as any)}
                className="px-3 py-1 text-xs font-mono uppercase tracking-wider rounded-full bg-[#fffaf0] border border-[#b8aa8d] text-[#6f5830] hover:bg-[#6f5830] hover:text-white transition-all shadow-sm"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Satellite Map & Inspection Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Leaflet Satellite Map Frame */}
          <div className="lg:col-span-8 relative h-[520px] sm:h-[600px] rounded-2xl overflow-hidden border border-[#b8aa8d] shadow-2xl bg-[#102832]">
            {/* The Leaflet Map Canvas */}
            <div ref={mapContainerRef} className="w-full h-full z-0"></div>

            {/* Top Floating Control Bar */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-[#102832]/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-xs font-mono text-white shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-semibold text-[#f6d99b]">🛰️ VỆ TINH TRỰC QUAN</span>
              <span className="text-white/40">|</span>
              <span className="truncate max-w-[150px]">{activeLandmark.name}</span>
            </div>

            {/* Layer Switcher (Satellite vs Street) */}
            <div className="absolute top-4 right-4 z-10 flex items-center bg-[#102832]/90 backdrop-blur-md rounded-full border border-white/20 p-1 shadow-lg text-xs font-mono">
              <button
                onClick={() => setMapStyle('satellite')}
                className={`px-3 py-1 rounded-full transition-all ${
                  mapStyle === 'satellite'
                    ? 'bg-[#f6d99b] text-[#102832] font-bold shadow-sm'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                Vệ Tinh HD
              </button>
              <button
                onClick={() => setMapStyle('street')}
                className={`px-3 py-1 rounded-full transition-all ${
                  mapStyle === 'street'
                    ? 'bg-[#f6d99b] text-[#102832] font-bold shadow-sm'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                Nhãn Phố
              </button>
            </div>

            {/* Quick Landmark Selector Strip at Bottom */}
            <div className="absolute bottom-4 left-4 right-16 z-10 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {SATELLITE_LANDMARKS.map(lm => (
                <button
                  key={lm.id}
                  onClick={() => handleFlyToLandmark(lm)}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all shadow-md flex items-center gap-1.5 ${
                    lm.id === activeLandmarkId
                      ? 'bg-[#f6d99b] text-[#102832] font-bold scale-105 border border-white'
                      : 'bg-[#102832]/85 text-white/90 hover:bg-[#6f5830] border border-white/20'
                  }`}
                >
                  <MapPin className="w-3 h-3 text-[#f6d99b]" />
                  <span>{lm.name.split('(')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Landmark Deep Inspection Panel */}
          <div className="lg:col-span-4 bg-[#fffaf0] border border-[#b8aa8d] rounded-2xl p-6 sm:p-7 shadow-xl space-y-5">
            {/* Top Badges */}
            <div className="flex items-center justify-between border-b border-[#b8aa8d]/50 pb-3">
              <span className="text-xs font-mono text-[#9b7a3a] font-semibold flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{activeLandmark.province}</span>
              </span>
              <span className="text-[11px] font-mono text-[#776f62]">
                {activeLandmark.yearBuilt}
              </span>
            </div>

            {/* Real Landmark Photo */}
            <div className="relative h-44 rounded-xl overflow-hidden border border-[#b8aa8d]/60 shadow-sm bg-[#102832]">
              <img
                src={activeLandmark.image}
                alt={activeLandmark.name}
                className="w-full h-full object-cover filter contrast-[1.05]"
              />
              <div className="absolute bottom-2 left-2 bg-[#102832]/90 text-[#f6d99b] text-[10px] font-mono px-2 py-0.5 rounded border border-[#f6d99b]/40">
                {activeLandmark.address}
              </div>
            </div>

            {/* Names & Overview */}
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#5a4325]">
                {activeLandmark.name}
              </h3>
              <p className="text-xs text-[#9b7a3a] font-serif font-medium mt-0.5">
                {activeLandmark.subName}
              </p>
              <p className="text-xs text-[#2d2820]/85 leading-relaxed font-light mt-3">
                {activeLandmark.significance}
              </p>
            </div>

            {/* Architectural Highlights */}
            <div className="p-3.5 rounded-xl bg-[#efe6d2]/70 border border-[#b8aa8d]/60 space-y-2">
              <span className="text-[10px] font-mono text-[#776f62] uppercase tracking-wider block font-semibold">
                Đặc Điểm Khảo Cứu Nổi Bật:
              </span>
              <ul className="space-y-1.5 text-xs text-[#2d2820]">
                {activeLandmark.highlights.map((h, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9b7a3a]"></span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              {activeLandmark.linkedSKUId && (
                <button
                  onClick={() => handleExplore3D(activeLandmark)}
                  className="w-full py-3 px-4 rounded-full bg-[#6f5830] text-[#fffaf0] hover:bg-[#9b7a3a] transition-all text-xs font-mono uppercase tracking-wider font-semibold flex items-center justify-center gap-2 shadow-md"
                >
                  <Eye className="w-4 h-4 text-[#f6d99b]" />
                  <span>Khám Phá Bản Sao Số 3D</span>
                </button>
              )}

              <button
                onClick={() => onOpenAIWithLandmark && onOpenAIWithLandmark(activeLandmark)}
                className="w-full py-3 px-4 rounded-full border border-[#6f5830] bg-[#fffaf0] text-[#6f5830] hover:bg-white hover:text-[#9b7a3a] transition-all text-xs font-mono uppercase tracking-wider font-semibold flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-[#9b7a3a]" />
                <span>Hỏi Hướng Dẫn Viên AI</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
