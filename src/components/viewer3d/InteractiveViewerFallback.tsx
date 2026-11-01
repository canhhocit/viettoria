import React, { useState } from 'react';
import type { HeritageSKU, ArchitecturalHotspot } from '../../types/heritage';
import { Layers, RotateCcw, Eye, Volume2, ShieldCheck } from 'lucide-react';

interface ViewerProps {
  heritage: HeritageSKU;
  onSelectHotspot?: (hotspot: ArchitecturalHotspot) => void;
}

export const InteractiveViewerFallback: React.FC<ViewerProps> = ({ heritage, onSelectHotspot }) => {
  const [viewMode, setViewMode] = useState<'turntable' | 'exploded' | 'hotspots'>('turntable');
  const [rotationAngle, setRotationAngle] = useState<number>(35);
  const [explodedDistance, setExplodedDistance] = useState<number>(40);
  const [activeHotspotId, setActiveHotspotId] = useState<string>(heritage.hotspots[0]?.id || '');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  const activeHotspot = heritage.hotspots.find(h => h.id === activeHotspotId) || heritage.hotspots[0];

  return (
    <div className="relative bg-[#0E1A15] text-paper border border-brass/40 corner-frame shadow-2xl overflow-hidden">
      {/* Top Telemetry Bar */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-forest-dark border-b border-brass/30 text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 text-brass">
            <span className="w-2 h-2 bg-brass animate-pulse inline-block"></span>
            <span>BẢN SAO SỐ DI SẢN</span>
          </span>
          <span className="text-paper/40">|</span>
          <span className="text-paper-warm/80">MÃ: {heritage.code}</span>
          <span className="text-paper/40">|</span>
          <span className="text-paper-warm/80">TỶ LỆ: {heritage.scale}</span>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1 mt-2 sm:mt-0">
          <button
            onClick={() => setViewMode('turntable')}
            className={`px-3 py-1 text-[11px] uppercase tracking-wider transition-colors duration-150 ${
              viewMode === 'turntable'
                ? 'bg-brass text-forest font-semibold'
                : 'text-paper/70 hover:text-paper bg-forest border border-brass/20'
            }`}
          >
            Xoay 360°
          </button>
          <button
            onClick={() => setViewMode('exploded')}
            className={`px-3 py-1 text-[11px] uppercase tracking-wider transition-colors duration-150 flex items-center gap-1 ${
              viewMode === 'exploded'
                ? 'bg-brass text-forest font-semibold'
                : 'text-paper/70 hover:text-paper bg-forest border border-brass/20'
            }`}
          >
            <Layers className="w-3 h-3" />
            <span>Bóc Tách Mộng</span>
          </button>
          <button
            onClick={() => setViewMode('hotspots')}
            className={`px-3 py-1 text-[11px] uppercase tracking-wider transition-colors duration-150 flex items-center gap-1 ${
              viewMode === 'hotspots'
                ? 'bg-brass text-forest font-semibold'
                : 'text-paper/70 hover:text-paper bg-forest border border-brass/20'
            }`}
          >
            <Eye className="w-3 h-3" />
            <span>Điểm Chú Giải</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="relative min-h-[460px] sm:min-h-[520px] flex items-center justify-center p-6 bg-gradient-to-b from-[#10241D] to-[#0A1410] overflow-hidden select-none">
        {/* Subtle Architectural Blueprint Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(184,138,68,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(184,138,68,0.06)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

        {/* MODE 1: Turntable Orbit */}
        {viewMode === 'turntable' && (
          <div className="relative w-full max-w-md flex flex-col items-center">
            {/* Visual model representation with dynamic angle styling */}
            <div 
              className="relative w-72 h-80 sm:w-84 sm:h-96 flex items-center justify-center transition-transform duration-100 ease-out cursor-grab active:cursor-grabbing"
              style={{ transform: `rotateY(${rotationAngle}deg)` }}
            >
              <img
                src={heritage.heroImage}
                alt={heritage.name}
                className="w-full h-full object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)] border border-brass/20 p-2 bg-forest/40"
              />
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-forest-dark/90 px-3 py-1 border border-brass/40 text-[10px] font-mono tracking-widest text-brass">
                GÓC QUAN SÁT: {Math.round(rotationAngle)}°
              </div>
            </div>

            {/* Rotation Control Slider */}
            <div className="w-full mt-6 bg-forest-dark/80 p-3 border border-brass/30 flex items-center gap-4">
              <RotateCcw className="w-4 h-4 text-brass shrink-0" />
              <input
                type="range"
                min="0"
                max="360"
                value={rotationAngle}
                onChange={(e) => setRotationAngle(Number(e.target.value))}
                className="w-full accent-brass cursor-pointer"
              />
              <span className="font-mono text-xs text-brass w-12 text-right">{rotationAngle}°</span>
            </div>
            <p className="text-[11px] text-paper-warm/50 mt-2 font-mono">
              Kéo thanh trượt hoặc tương tác để xoay quan sát toàn cảnh 360 độ
            </p>
          </div>
        )}

        {/* MODE 2: Exploded Blueprint */}
        {viewMode === 'exploded' && (
          <div className="w-full max-w-2xl flex flex-col items-center">
            <div className="relative w-full h-96 flex flex-col items-center justify-center space-y-4">
              {heritage.explodedLayers.map((layer, index) => {
                const offset = (index - 1) * (explodedDistance * 0.9);
                return (
                  <div
                    key={layer.layerIndex}
                    style={{ transform: `translateY(${offset}px)` }}
                    className="w-full max-w-md bg-forest/90 border border-brass/50 p-4 transition-all duration-300 relative shadow-xl"
                  >
                    <div className="flex items-center justify-between text-xs font-mono text-brass mb-1">
                      <span>{layer.title}</span>
                      <span className="text-[10px] text-paper/50">LỚP {layer.layerIndex}</span>
                    </div>
                    <p className="text-xs text-paper-warm/80 leading-relaxed font-light">
                      {layer.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Explosion Distance Control */}
            <div className="w-full max-w-md mt-6 bg-forest-dark/80 p-3 border border-brass/30 flex items-center gap-4">
              <span className="text-xs font-mono text-brass shrink-0">BÓC TÁCH MỘNG:</span>
              <input
                type="range"
                min="10"
                max="80"
                value={explodedDistance}
                onChange={(e) => setExplodedDistance(Number(e.target.value))}
                className="w-full accent-brass cursor-pointer"
              />
              <span className="font-mono text-xs text-brass">{explodedDistance}%</span>
            </div>
          </div>
        )}

        {/* MODE 3: Hotspots */}
        {viewMode === 'hotspots' && (
          <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Visual with interactive hotspot pins */}
            <div className="relative w-full h-80 flex items-center justify-center bg-forest/40 border border-brass/30 p-2">
              <img
                src={heritage.heroImage}
                alt={heritage.name}
                className="w-full h-full object-contain filter drop-shadow-xl"
              />
              {/* Hotspot buttons pinned on top */}
              {heritage.hotspots.map((hs, idx) => {
                const isActive = hs.id === activeHotspotId;
                // Positions customized for Chùa Một Cột
                const positions = [
                  { top: '22%', left: '50%' }, // Roof
                  { top: '48%', left: '46%' }, // Bracket
                  { top: '68%', left: '48%' }, // Column
                  { top: '85%', left: '50%' }, // Pond
                ];
                const pos = positions[idx] || { top: '50%', left: '50%' };

                return (
                  <button
                    key={hs.id}
                    onClick={() => {
                      setActiveHotspotId(hs.id);
                      if (onSelectHotspot) onSelectHotspot(hs);
                    }}
                    style={{ top: pos.top, left: pos.left }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center border transition-all duration-150 ${
                      isActive
                        ? 'bg-brass text-forest border-paper scale-110 shadow-[0_0_15px_#B88A44]'
                        : 'bg-forest-dark text-brass border-brass hover:bg-brass hover:text-forest'
                    }`}
                  >
                    <span className="text-[11px] font-bold font-mono">{idx + 1}</span>
                  </button>
                );
              })}
            </div>

            {/* Hotspot Information Card */}
            {activeHotspot && (
              <div className="bg-forest-dark p-6 border-l-2 border-brass space-y-3">
                <div className="flex items-center justify-between text-[10px] font-mono text-brass uppercase tracking-wider">
                  <span>CHI TIẾT KIẾN TRÚC VIỆT</span>
                  <span>KHỐI MỘNG #{activeHotspot.category}</span>
                </div>
                <h4 className="font-serif text-xl text-paper font-semibold">
                  {activeHotspot.title}
                </h4>
                <p className="text-xs text-brass font-medium">
                  {activeHotspot.subtitle}
                </p>
                <p className="text-xs text-paper-warm/80 leading-relaxed font-light">
                  {activeHotspot.description}
                </p>
                <div className="pt-2 text-[10px] text-paper-warm/50 font-mono border-t border-forest-light">
                  Thông số đo đạc chuẩn theo hồ sơ khảo cứu kiến trúc thời Lý.
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Status & Audio Guide Action */}
      <div className="p-4 bg-forest-dark border-t border-brass/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-2 text-paper-warm/70">
          <ShieldCheck className="w-4 h-4 text-brass" />
          <span>Vật liệu in 3D: PETG an toàn, không chứa BPA • Bền nhiệt & tia UV</span>
        </div>

        <button
          onClick={() => setIsPlayingAudio(!isPlayingAudio)}
          className={`inline-flex items-center gap-2 px-4 py-2 border transition-colors duration-150 ${
            isPlayingAudio
              ? 'bg-brass text-forest border-brass font-bold'
              : 'border-brass/50 text-brass hover:bg-brass hover:text-forest'
          }`}
        >
          <Volume2 className="w-3.5 h-3.5" />
          <span>{isPlayingAudio ? 'Đang Phát Thuyết Minh...' : 'Nghe Thuyết Minh Âm Thanh'}</span>
        </button>
      </div>

      {/* Live Audio Transcript Drawer when playing */}
      {isPlayingAudio && (
        <div className="p-4 bg-forest border-t border-brass/40 text-xs text-paper-warm/90 leading-relaxed animate-fadeIn">
          <div className="flex items-center justify-between text-brass mb-1 font-mono text-[10px]">
            <span>{heritage.audioGuide.title}</span>
            <span>{heritage.audioGuide.narrator}</span>
          </div>
          <p className="italic font-serif text-paper">"{heritage.audioGuide.transcript}"</p>
        </div>
      )}
    </div>
  );
};
