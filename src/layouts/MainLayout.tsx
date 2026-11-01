import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { QRScanModal } from '../components/common/QRScanModal';

export const MainLayout: React.FC = () => {
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-paper text-charcoal font-sans selection:bg-brass selection:text-white">
      {/* Editorial Header */}
      <Header onOpenQRModal={() => setIsQRModalOpen(true)} />

      {/* Main Outlet */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Universal Footer */}
      <Footer />

      {/* QR Code Scanner / Resolver Modal */}
      <QRScanModal 
        isOpen={isQRModalOpen} 
        onClose={() => setIsQRModalOpen(false)} 
      />
    </div>
  );
};

export default MainLayout;
