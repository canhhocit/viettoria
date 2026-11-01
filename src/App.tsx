import React, { useState } from 'react';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { HeroSection } from './components/landing/HeroSection';
import { FeaturedDestinations } from './components/landing/FeaturedDestinations';
import { AssemblySection } from './components/landing/AssemblySection';
import { CollectionGrid } from './components/landing/CollectionGrid';
import { QRProductExperience } from './components/qr/QRProductExperience';
import { HeritageMap, type MapLandmark } from './components/map/HeritageMap';
import { AITourGuideModal } from './components/ai/AITourGuideModal';
import { CommunityExperiences } from './components/community/CommunityExperiences';
import { HERITAGE_COLLECTION } from './data/mockHeritage';
import type { HeritageSKU } from './types/heritage';
import { Bot } from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedSKU, setSelectedSKU] = useState<HeritageSKU>(HERITAGE_COLLECTION[0]);
  const [isAIModalOpen, setIsAIModalOpen] = useState<boolean>(false);
  const [activeLandmarkForAI, setActiveLandmarkForAI] = useState<MapLandmark | null>(null);

  // Tab & Page navigation
  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSKU = (sku: HeritageSKU) => {
    setSelectedSKU(sku);
    setActiveTab('qr-demo');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAIWithLandmark = (landmark: MapLandmark) => {
    setActiveLandmarkForAI(landmark);
    setIsAIModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f1e3] text-[#2d2820] font-sans selection:bg-[#9b7a3a] selection:text-white">
      {/* Universal Floating Glass Header */}
      <Header 
        activeTab={activeTab} 
        onNavigate={handleNavigate} 
        onOpenAIModal={() => {
          setActiveLandmarkForAI(null);
          setIsAIModalOpen(true);
        }}
      />

      {/* Main Content Areas */}
      <main className="flex-1">
        {activeTab === 'qr-demo' ? (
          <QRProductExperience
            heritage={selectedSKU}
            onBackToHome={() => handleNavigate('home')}
          />
        ) : activeTab === 'map' ? (
          <div className="py-8 pt-24">
            <HeritageMap
              onOpenAIWithLandmark={handleOpenAIWithLandmark}
              onViewSKU={handleSelectSKU}
            />
            <CommunityExperiences />
          </div>
        ) : (
          <>
            {/* Cinematic Hero Landing (Inspired by Disanviet) */}
            <HeroSection
              heroItem={selectedSKU}
              onExploreMap={() => {
                const el = document.getElementById('map-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else handleNavigate('map');
              }}
              onOpenQRDemo={() => handleNavigate('qr-demo')}
              onExploreAssembly={() => {
                const el = document.getElementById('assembly-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else handleNavigate('assembly');
              }}
            />

            {/* Featured Destinations Grid & 3D Showcase */}
            <FeaturedDestinations
              onSelectSKU={handleSelectSKU}
              onOpenMap={() => {
                const el = document.getElementById('map-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenAssembly={() => {
                const el = document.getElementById('assembly-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Interactive Vietnam Heritage Map */}
            <div id="map-section">
              <HeritageMap
                onOpenAIWithLandmark={handleOpenAIWithLandmark}
                onViewSKU={handleSelectSKU}
              />
            </div>

            {/* Assembly & Mộng Gỗ 2.5D Section */}
            <div id="assembly-section">
              <AssemblySection heritage={selectedSKU} />
            </div>

            {/* Ngũ Đại Di Sản Collection Grid */}
            <div id="collection-section">
              <CollectionGrid onSelectSKU={handleSelectSKU} />
            </div>

            {/* Community Travelers Showcase */}
            <CommunityExperiences />
          </>
        )}
      </main>

      {/* Floating AI Tour Guide Launcher */}
      <aside aria-label="Trợ lý du lịch" className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => {
            setActiveLandmarkForAI(null);
            setIsAIModalOpen(true);
          }}
          className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#102832] text-[#fffaf0] border border-[#f6d99b]/50 shadow-2xl hover:bg-[#6f5830] transition-all font-mono text-xs uppercase tracking-wider group hover:scale-105"
          title="Mở hướng dẫn viên AI"
        >
          <div className="w-6 h-6 rounded-full border border-[#f6d99b] flex items-center justify-center bg-white/10">
            <Bot className="w-3.5 h-3.5 text-[#f6d99b]" />
          </div>
          <span className="font-semibold">Hỏi Hướng Dẫn Viên AI</span>
        </button>
      </aside>

      {/* AI Tour Guide Chatbot Modal */}
      <AITourGuideModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        initialLandmark={activeLandmarkForAI}
      />

      {/* Universal Heritage Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default App;
