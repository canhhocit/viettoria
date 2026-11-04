import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Box, 
  Plus, 
  Edit, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  ExternalLink,
  BookOpen,
  X
} from 'lucide-react';
import { adminApi } from '../../services/api';
import type { Product, Collection } from '../../types';
import { resolveImageUrl, handleImageFallback } from '../../utils/mediaResolver';

export const AdminProductsPage: React.FC = () => {
  const isDemo = adminApi.isDemoSession();
  const [products, setProducts] = useState<Product[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [prods, cols] = await Promise.all([adminApi.getProducts(), adminApi.getCollections()]);
      setProducts(prods);
      setCollections(cols);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không tải được danh sách mô hình.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenAdd = () => {
    setEditingProduct({
      code: `VT-NEW-00${products.length + 1}`,
      name: '',
      subName: '',
      slug: '',
      collectionId: collections[0]?.id || 'col-ly',
      epoch: 'Thời Lý',
      location: 'Hà Nội',
      shortDescription: '',
      heroImage: '/3D/chua-mot-cot-poster.webp',
      galleryImages: [],
      displayOrder: products.length + 1,
      status: 'published',
      isHeroRelease: false,
      modelSpecs: {
        scale: '1:120',
        heightCm: 12,
        widthCm: 10,
        weightGrams: 400,
        material: 'BioPETG Khoáng Đá',
        partsCount: 20,
        finishing: 'Sơn then & thếp vàng thủ công'
      }
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditingProduct({ ...product });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct || !editingProduct.name) return;

    setSaving(true);
    setError(null);
    try {
      if (editingProduct.id) await adminApi.updateProduct(editingProduct.id, editingProduct);
      else await adminApi.createProduct(editingProduct);
      setIsModalOpen(false);
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không lưu được tác phẩm.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tác phẩm này?')) {
      setError(null);
      try { await adminApi.deleteProduct(id); await loadData(); }
      catch (err) { setError(err instanceof Error ? err.message : 'Không xóa được tác phẩm.'); }
    }
  };

  const handleToggleStatus = async (p: Product) => {
    const newStatus = p.status === 'published' ? 'draft' : 'published';
    setError(null);
    try { await adminApi.updateProduct(p.id, { status: newStatus }); await loadData(); }
    catch (err) { setError(err instanceof Error ? err.message : 'Không đổi được trạng thái tác phẩm.'); }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-paper-border">
        <div>
          <div className="flex items-center gap-2 text-brass text-xs font-mono uppercase tracking-widest">
            <Box className="w-4 h-4" />
            <span>Quản Trị Tác Phẩm & Hồ Sơ Di Sản</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest mt-1">
            Danh Mục Mô Hình Kiến Trúc
          </h1>
        </div>

        {!isDemo && <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-forest text-paper hover:bg-brass transition-colors font-mono text-xs uppercase tracking-wider font-bold flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm Mô Hình Mới</span>
        </button>}
      </div>

      {error && <div role="alert" className="border border-terracotta/40 bg-terracotta/10 p-3 text-sm text-terracotta">{error}</div>}

      {/* Table Card */}
      <div className="bg-paper border border-paper-border corner-frame overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-paper-warm border-b border-paper-border text-charcoal-muted font-mono uppercase tracking-wider">
                <th className="p-4">Tác Phẩm</th>
                <th className="p-4">Mã SKU</th>
                <th className="p-4">Địa Điểm & Niên Đại</th>
                <th className="p-4">Tỷ Lệ / Mộng</th>
                <th className="p-4">Trạng Thái</th>
                <th className="p-4 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-paper-border font-mono">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-forest">
                    Đang tải danh sách tác phẩm...
                  </td>
                </tr>
              ) : products.map((product) => (
                <tr key={product.id} className="hover:bg-paper-warm/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={resolveImageUrl(product.heroImage)}
                        alt={product.name}
                        onError={(e) => handleImageFallback(e)}
                        className="w-12 h-10 object-cover border border-paper-border bg-forest shrink-0"
                      />
                      <div>
                        <div className="font-serif font-bold text-forest text-sm">{product.name}</div>
                        <div className="text-[11px] font-sans text-charcoal-muted italic">{product.subName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="bg-paper-warm px-2 py-1 border border-paper-border text-forest font-bold">
                      {product.code}
                    </span>
                    {product.isHeroRelease && (
                      <span className="block mt-1 text-[10px] text-brass uppercase font-bold">
                        Hero Release
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <div>{product.location}</div>
                    <div className="text-charcoal-muted text-[11px]">{product.epoch}</div>
                  </td>
                  <td className="p-4">
                    <div>{product.modelSpecs.scale}</div>
                    <div className="text-brass font-bold text-[11px]">{product.modelSpecs.partsCount} mộng</div>
                  </td>
                  <td className="p-4">
                    {isDemo ? <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider ${product.status === 'published' ? 'bg-forest/15 text-forest border border-forest/30' : 'bg-charcoal/10 text-charcoal-muted border border-charcoal/20'}`}>
                      {product.status === 'published' ? 'Đã xuất bản' : 'Bản nháp'}
                    </span> : <button
                      onClick={() => handleToggleStatus(product)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider ${
                        product.status === 'published'
                          ? 'bg-forest/15 text-forest border border-forest/30'
                          : 'bg-charcoal/10 text-charcoal-muted border border-charcoal/20'
                      }`}
                    >
                      {product.status === 'published' ? (
                        <>
                          <CheckCircle className="w-3 h-3 text-forest" />
                          <span>Xuất Bản</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3 h-3 text-charcoal-muted" />
                          <span>Bản Nháp</span>
                        </>
                      )}
                    </button>}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/admin/products/${product.id}/stories`}
                        className="px-2.5 py-1.5 bg-forest text-paper hover:bg-brass transition-colors uppercase tracking-wider text-[11px] flex items-center gap-1 font-bold"
                        title="Biên tập các khối câu chuyện lịch sử"
                      >
                        <BookOpen className="w-3 h-3" />
                        <span>Stories</span>
                      </Link>

                      {!isDemo && <button
                        onClick={() => handleOpenEdit(product)}
                        className="p-1.5 border border-paper-border hover:border-brass text-charcoal transition-colors"
                        title="Chỉnh sửa thông số mô hình"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>}

                      <Link
                        to={`/products/${product.slug}`}
                        target="_blank"
                        className="p-1.5 border border-paper-border hover:border-forest text-charcoal transition-colors"
                        title="Xem trang công khai"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>

                      {!isDemo && <button
                        onClick={() => handleDelete(product.id)}
                        className="p-1.5 border border-paper-border hover:border-terracotta text-terracotta transition-colors"
                        title="Xóa mô hình"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Add Modal */}
      {!isDemo && isModalOpen && editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-dark/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-paper border border-brass corner-frame p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1 text-charcoal-muted hover:text-charcoal"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="font-serif text-2xl font-bold text-forest mb-6">
              {editingProduct.id ? 'Chỉnh Sửa Thông Tin Mô Hình' : 'Thêm Mô Hình Kiến Trúc Mới'}
            </h2>

            {error && <div role="alert" className="mb-4 border border-terracotta/40 bg-terracotta/10 p-3 text-sm text-terracotta">{error}</div>}

            <form onSubmit={handleSave} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-charcoal-muted uppercase mb-1">Mã SKU Di Sản</label>
                  <input
                    type="text"
                    value={editingProduct.code || ''}
                    onChange={e => setEditingProduct({ ...editingProduct, code: e.target.value })}
                    className="w-full px-3 py-2 bg-paper-warm border border-paper-border focus:border-brass focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-charcoal-muted uppercase mb-1">Slug URL</label>
                  <input
                    type="text"
                    value={editingProduct.slug || ''}
                    onChange={e => setEditingProduct({ ...editingProduct, slug: e.target.value })}
                    placeholder="chua-mot-cot"
                    className="w-full px-3 py-2 bg-paper-warm border border-paper-border focus:border-brass focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-charcoal-muted uppercase mb-1">Tên Công Trình</label>
                  <input
                    type="text"
                    value={editingProduct.name || ''}
                    onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full px-3 py-2 bg-paper-warm border border-paper-border focus:border-brass focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-charcoal-muted uppercase mb-1">Tên Chữ Hán / Tên Phụ</label>
                  <input
                    type="text"
                    value={editingProduct.subName || ''}
                    onChange={e => setEditingProduct({ ...editingProduct, subName: e.target.value })}
                    placeholder="Diên Hựu Tự — Liên Hoa Đài"
                    className="w-full px-3 py-2 bg-paper-warm border border-paper-border focus:border-brass focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-charcoal-muted uppercase mb-1">Địa Điểm</label>
                  <input
                    type="text"
                    value={editingProduct.location || ''}
                    onChange={e => setEditingProduct({ ...editingProduct, location: e.target.value })}
                    className="w-full px-3 py-2 bg-paper-warm border border-paper-border focus:border-brass focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-charcoal-muted uppercase mb-1">Niên Đại Lịch Sử</label>
                  <input
                    type="text"
                    value={editingProduct.epoch || ''}
                    onChange={e => setEditingProduct({ ...editingProduct, epoch: e.target.value })}
                    className="w-full px-3 py-2 bg-paper-warm border border-paper-border focus:border-brass focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-charcoal-muted uppercase mb-1">Bộ Sưu Tập</label>
                  <select
                    value={editingProduct.collectionId || ''}
                    onChange={e => setEditingProduct({ ...editingProduct, collectionId: e.target.value })}
                    className="w-full px-3 py-2 bg-paper-warm border border-paper-border focus:border-brass focus:outline-none"
                  >
                    {collections.map(col => (
                      <option key={col.id} value={col.id}>{col.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-charcoal-muted uppercase mb-1">Mô Tả Ngắn</label>
                <textarea
                  rows={3}
                  value={editingProduct.shortDescription || ''}
                  onChange={e => setEditingProduct({ ...editingProduct, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 bg-paper-warm border border-paper-border focus:border-brass focus:outline-none font-sans"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-charcoal-muted uppercase mb-1">Tỷ Lệ Điêu Khắc</label>
                  <input
                    type="text"
                    value={editingProduct.modelSpecs?.scale || '1:120'}
                    onChange={e => setEditingProduct({
                      ...editingProduct,
                      modelSpecs: { ...editingProduct.modelSpecs!, scale: e.target.value }
                    })}
                    className="w-full px-3 py-2 bg-paper-warm border border-paper-border focus:border-brass focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-charcoal-muted uppercase mb-1">Số Khớp Mộng Gỗ</label>
                  <input
                    type="number"
                    value={editingProduct.modelSpecs?.partsCount || 20}
                    onChange={e => setEditingProduct({
                      ...editingProduct,
                      modelSpecs: { ...editingProduct.modelSpecs!, partsCount: parseInt(e.target.value, 10) || 0 }
                    })}
                    className="w-full px-3 py-2 bg-paper-warm border border-paper-border focus:border-brass focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-charcoal-muted uppercase mb-1">Vật Liệu Cốt Lõi</label>
                  <input
                    type="text"
                    value={editingProduct.modelSpecs?.material || 'BioPETG Khoáng Đá'}
                    onChange={e => setEditingProduct({
                      ...editingProduct,
                      modelSpecs: { ...editingProduct.modelSpecs!, material: e.target.value }
                    })}
                    className="w-full px-3 py-2 bg-paper-warm border border-paper-border focus:border-brass focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-charcoal-muted uppercase mb-1">URL Ảnh Bìa Đại Diện</label>
                  <input
                    type="text"
                    value={editingProduct.heroImage || ''}
                    onChange={e => setEditingProduct({ ...editingProduct, heroImage: e.target.value })}
                  placeholder="/3D/chua-mot-cot-poster.webp hoặc URL Cloudinary..."
                    className="w-full px-3 py-2 bg-paper-warm border border-paper-border focus:border-brass focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-charcoal-muted uppercase mb-1">Đường Dẫn Mô Hình 3D (.glb)</label>
                  <input
                    type="text"
                    value={editingProduct.model3dUrl || ''}
                    onChange={e => setEditingProduct({ ...editingProduct, model3dUrl: e.target.value })}
                  placeholder="/3D/chua-mot-cot.glb hoặc URL Cloudinary/backend"
                    className="w-full px-3 py-2 bg-paper-warm border border-paper-border focus:border-brass focus:outline-none"
                  />
                </div>
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
                  disabled={saving}
                  className="px-6 py-2 bg-forest text-paper hover:bg-brass uppercase tracking-wider font-bold shadow-md disabled:opacity-50"
                >
                  {saving ? 'Đang lưu…' : 'Lưu Thông Tin'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductsPage;
