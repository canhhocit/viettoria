import React, { useEffect, useState } from 'react';
import { Image, Copy, Check } from 'lucide-react';
import { adminApi } from '../../services/api';
import type { MediaItem } from '../../types';

export const AdminMediaPage: React.FC = () => {
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    adminApi.getMedia().then((data) => {
      setMediaList(data);
      setLoading(false);
    });
  }, []);

  const handleCopy = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredMedia = mediaList.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.url.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-paper-border">
        <div>
          <div className="flex items-center gap-2 text-brass text-xs font-mono uppercase tracking-widest">
            <Image className="w-4 h-4" />
            <span>Kho Lưu Trữ Hình Ảnh Thực Địa & Khảo Cứu</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest mt-1">
            Thư Viện Media Di Sản
          </h1>
        </div>

        {/* Search */}
        <div className="w-full sm:w-72">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Tìm theo tên tệp..."
            className="w-full px-3 py-2 bg-paper border border-paper-border focus:border-brass text-xs font-mono focus:outline-none"
          />
        </div>
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="py-20 text-center font-mono text-xs text-forest">
          Đang tải thư viện media...
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              className="bg-paper border border-paper-border corner-frame overflow-hidden shadow-sm flex flex-col justify-between group"
            >
              <div>
                <div className="aspect-[4/3] bg-forest overflow-hidden relative">
                  <img
                    src={item.url}
                    alt={item.altText || item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-3.5 space-y-1 font-mono text-xs">
                  <p className="font-serif font-bold text-forest text-sm truncate" title={item.name}>
                    {item.name}
                  </p>
                  <p className="text-[10px] text-charcoal-muted truncate">
                    {item.fileName} • {(item.fileSize / 1024).toFixed(0)} KB
                  </p>
                </div>
              </div>

              <div className="p-3.5 pt-0 border-t border-paper-border mt-2">
                <button
                  onClick={() => handleCopy(item.url, item.id)}
                  className="w-full py-1.5 px-2 bg-paper-warm hover:bg-forest hover:text-paper border border-paper-border text-charcoal font-mono text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="w-3 h-3 text-brass" />
                      <span className="text-brass font-bold">Đã Sao Chép URL</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-brass" />
                      <span>Sao Chép URL</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminMediaPage;
