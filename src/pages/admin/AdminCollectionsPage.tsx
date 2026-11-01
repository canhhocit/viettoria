import React, { useEffect, useState } from 'react';
import { Layers, Plus, Edit, X } from 'lucide-react';
import { adminApi } from '../../services/api';
import type { Collection } from '../../types';

export const AdminCollectionsPage: React.FC = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCol, setEditingCol] = useState<Partial<Collection> | null>(null);

  const loadData = async () => {
    setLoading(true);
    const cols = await adminApi.getCollections();
    setCollections(cols);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenAdd = () => {
    setEditingCol({
      code: `COL-00${collections.length + 1}`,
      name: '',
      slug: '',
      description: '',
      heroImage: '/images/chua-mot-cot.webp',
      displayOrder: collections.length + 1,
      status: 'published'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (col: Collection) => {
    setEditingCol({ ...col });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCol || !editingCol.name) return;
    setIsModalOpen(false);
    // Simulating save
    loadData();
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-paper-border">
        <div>
          <div className="flex items-center gap-2 text-brass text-xs font-mono uppercase tracking-widest">
            <Layers className="w-4 h-4" />
            <span>Phân Loại Niên Đại & Thời Kỳ</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest mt-1">
            Quản Lý Bộ Sưu Tập
          </h1>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-forest text-paper hover:bg-brass transition-colors font-mono text-xs uppercase tracking-wider font-bold flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm Bộ Sưu Tập Mới</span>
        </button>
      </div>

      {/* Collections Grid */}
      {loading ? (
        <div className="py-20 text-center font-mono text-xs text-forest">
          Đang tải danh sách bộ sưu tập...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((col) => (
            <div
              key={col.id}
              className="bg-paper border border-paper-border corner-frame p-5 space-y-4 shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="aspect-[16/10] overflow-hidden bg-forest relative border border-paper-border">
                  <img
                    src={col.heroImage}
                    alt={col.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-forest/90 px-2 py-0.5 font-mono text-[10px] text-brass border border-brass/40">
                    {col.code}
                  </div>
                </div>

                <h3 className="font-serif text-lg font-bold text-forest">{col.name}</h3>
                <p className="text-xs text-charcoal/80 font-light line-clamp-3 leading-relaxed">
                  {col.description}
                </p>
              </div>

              <div className="pt-3 border-t border-paper-border flex items-center justify-between font-mono text-xs">
                <span className="text-charcoal-muted">Thứ tự: {col.displayOrder}</span>
                <button
                  onClick={() => handleOpenEdit(col)}
                  className="px-2.5 py-1 border border-paper-border hover:border-brass text-charcoal transition-colors flex items-center gap-1"
                >
                  <Edit className="w-3 h-3 text-brass" />
                  <span>Sửa</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {isModalOpen && editingCol && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-dark/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-paper border border-brass corner-frame p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1 text-charcoal-muted hover:text-charcoal"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="font-serif text-2xl font-bold text-forest mb-4">
              {editingCol.id ? 'Sửa Bộ Sưu Tập' : 'Thêm Bộ Sưu Tập Mới'}
            </h2>

            <form onSubmit={handleSave} className="space-y-4 font-mono text-xs">
              <div>
                <label className="block text-charcoal-muted uppercase mb-1">Mã Bộ Sưu Tập</label>
                <input
                  type="text"
                  value={editingCol.code || ''}
                  onChange={e => setEditingCol({ ...editingCol, code: e.target.value })}
                  className="w-full px-3 py-2 bg-paper-warm border border-paper-border focus:border-brass focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-charcoal-muted uppercase mb-1">Tên Bộ Sưu Tập</label>
                <input
                  type="text"
                  value={editingCol.name || ''}
                  onChange={e => setEditingCol({ ...editingCol, name: e.target.value })}
                  className="w-full px-3 py-2 bg-paper-warm border border-paper-border focus:border-brass focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-charcoal-muted uppercase mb-1">Mô Tả Lịch Sử</label>
                <textarea
                  rows={3}
                  value={editingCol.description || ''}
                  onChange={e => setEditingCol({ ...editingCol, description: e.target.value })}
                  className="w-full px-3 py-2 bg-paper-warm border border-paper-border focus:border-brass focus:outline-none font-sans"
                  required
                />
              </div>

              <div>
                <label className="block text-charcoal-muted uppercase mb-1">URL Hình Ảnh</label>
                <input
                  type="text"
                  value={editingCol.heroImage || ''}
                  onChange={e => setEditingCol({ ...editingCol, heroImage: e.target.value })}
                  className="w-full px-3 py-2 bg-paper-warm border border-paper-border focus:border-brass focus:outline-none"
                  required
                />
              </div>

              <div className="pt-4 border-t border-paper-border flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-paper-border text-charcoal uppercase tracking-wider hover:bg-paper-warm"
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-forest text-paper hover:bg-brass uppercase tracking-wider font-bold shadow-md"
                >
                  Lưu Thông Tin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCollectionsPage;
