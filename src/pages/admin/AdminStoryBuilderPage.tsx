import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  BookOpen, 
  Plus, 
  ArrowUp, 
  ArrowDown, 
  Trash2, 
  Eye, 
  EyeOff, 
  Edit, 
  ArrowLeft, 
  X,
  FileText,
  Image,
  Clock,
  Sparkles,
  Hammer
} from 'lucide-react';
import { adminApi } from '../../services/api';
import type { StoryBlock, Product, StoryBlockType } from '../../types';

export const AdminStoryBuilderPage: React.FC = () => {
  const isDemo = adminApi.isDemoSession();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [stories, setStories] = useState<StoryBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingBlock, setEditingBlock] = useState<Partial<StoryBlock> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadData = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const prod = await adminApi.getProductById(id);
      setProduct(prod);
      setStories(prod.storyBlocks || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không tải được nội dung tác phẩm.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const handleOpenAdd = (type: StoryBlockType) => {
    setEditingBlock({
      productId: id,
      type,
      title: '',
      subtitle: '',
      content: '',
      mediaUrl: '',
      mediaCaption: '',
      highlightBadge: type === 'highlight' ? 'Kiến Trúc Độc Bản' : undefined,
      displayOrder: stories.length + 1,
      status: 'published',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (block: StoryBlock) => {
    setEditingBlock({ ...block });
    setIsModalOpen(true);
  };

  const handleSaveBlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlock || !editingBlock.title || !id) return;

    setSaving(true);
    setError(null);
    try {
      if (editingBlock.id) await adminApi.updateStory(editingBlock.id, editingBlock);
      else await adminApi.createStory(id, editingBlock);
      setIsModalOpen(false);
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không lưu được khối nội dung.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteBlock = async (blockId: string) => {
    if (window.confirm('Bạn có chắc muốn xóa khối nội dung này?')) {
      setError(null);
      try { await adminApi.deleteStory(blockId); await loadData(); }
      catch (err) { setError(err instanceof Error ? err.message : 'Không xóa được khối nội dung.'); }
    }
  };

  const handleToggleStatus = async (block: StoryBlock) => {
    const newStatus = block.status === 'published' ? 'hidden' : 'published';
    setError(null);
    try { await adminApi.updateStory(block.id, { status: newStatus }); await loadData(); }
    catch (err) { setError(err instanceof Error ? err.message : 'Không đổi được trạng thái khối nội dung.'); }
  };

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    if (!id) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= stories.length) return;

    const previousStories = stories;
    const newStories = [...stories];
    const temp = newStories[index];
    newStories[index] = newStories[targetIndex];
    newStories[targetIndex] = temp;

    setStories(newStories);
    const blockIds = newStories.map(s => s.id);
    setError(null);
    try { await adminApi.reorderStories(id, blockIds); }
    catch (err) {
      setStories(previousStories);
      setError(err instanceof Error ? err.message : 'Không đổi được thứ tự khối nội dung.');
    }
  };

  const getBlockTypeIcon = (type: StoryBlockType) => {
    switch (type) {
      case 'text': return <FileText className="w-4 h-4 text-brass" />;
      case 'image': return <Image className="w-4 h-4 text-brass" />;
      case 'text_image': return <BookOpen className="w-4 h-4 text-brass" />;
      case 'timeline': return <Clock className="w-4 h-4 text-brass" />;
      case 'highlight': return <Sparkles className="w-4 h-4 text-brass" />;
      case 'assembly': return <Hammer className="w-4 h-4 text-brass" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-paper-border">
        <div>
          <Link
            to="/admin/products"
            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-charcoal-muted hover:text-forest transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Quay lại danh mục sản phẩm</span>
          </Link>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest">
            Biên Tập Story Blocks: {product?.name || 'Đang tải...'}
          </h1>
          <p className="text-xs font-mono text-brass-dark uppercase tracking-wider mt-1">
            Mã Tác Phẩm: {product?.code} • {stories.length} khối nội dung
          </p>
        </div>

        {/* Add Block Dropdown / Quick Buttons */}
        {!isDemo && <div className="flex flex-wrap gap-2">
          {(['text', 'image', 'text_image', 'timeline', 'highlight', 'assembly'] as StoryBlockType[]).map((type) => (
            <button
              key={type}
              onClick={() => handleOpenAdd(type)}
              className="px-3 py-1.5 bg-paper border border-paper-border hover:border-brass text-forest hover:bg-paper-warm transition-colors font-mono text-[11px] uppercase tracking-wider flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-3 h-3 text-brass" />
              <span>+{type}</span>
            </button>
          ))}
        </div>}
      </div>

      {error && <div role="alert" className="border border-terracotta/40 bg-terracotta/10 p-3 text-sm text-terracotta">{error}</div>}

      {/* Story Blocks List */}
      {loading ? (
        <div className="py-20 text-center font-mono text-xs text-forest">
          Đang tải các khối câu chuyện...
        </div>
      ) : stories.length === 0 ? (
        <div className="py-16 text-center space-y-3 bg-paper border border-paper-border p-8">
          <p className="font-serif text-lg font-bold text-forest">Chưa có khối Story nào cho tác phẩm này</p>
          <p className="text-xs text-charcoal-muted">Hãy chọn một trong các nút "+text", "+image", "+timeline" phía trên để tạo khối đầu tiên.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {stories.map((block, idx) => (
            <div
              key={block.id}
              className={`bg-paper border transition-all corner-frame p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                block.status === 'hidden' ? 'opacity-60 border-paper-border bg-paper-warm/40' : 'border-paper-border hover:border-brass shadow-sm'
              }`}
            >
              {/* Block Info */}
              <div className="flex items-start gap-4 max-w-2xl">
                <div className="w-8 h-8 flex-none bg-paper-warm border border-paper-border flex items-center justify-center font-mono text-xs font-bold text-forest">
                  {idx + 1}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider bg-paper-warm px-2 py-0.5 border border-paper-border">
                      {getBlockTypeIcon(block.type)}
                      <span>{block.type}</span>
                    </span>
                    {block.subtitle && (
                      <span className="text-[11px] font-mono text-charcoal-muted uppercase">
                        {block.subtitle}
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-base font-bold text-forest">
                    {block.title}
                  </h3>

                  <p className="text-xs text-charcoal/80 font-light line-clamp-2">
                    {block.content}
                  </p>
                </div>
              </div>

              {/* Action Toolbar */}
              {!isDemo && <div className="flex items-center gap-2 self-end md:self-center font-mono text-xs">
                {/* Reorder Buttons */}
                <button
                  onClick={() => handleMove(idx, 'up')}
                  disabled={idx === 0}
                  className="p-1.5 border border-paper-border hover:border-brass disabled:opacity-20 text-charcoal"
                  title="Di chuyển lên"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => handleMove(idx, 'down')}
                  disabled={idx === stories.length - 1}
                  className="p-1.5 border border-paper-border hover:border-brass disabled:opacity-20 text-charcoal"
                  title="Di chuyển xuống"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>

                {/* Visibility Toggle */}
                <button
                  onClick={() => handleToggleStatus(block)}
                  className={`p-1.5 border ${
                    block.status === 'published'
                      ? 'border-forest/40 text-forest bg-forest/10 hover:bg-forest/20'
                      : 'border-charcoal/20 text-charcoal-muted hover:text-charcoal'
                  }`}
                  title={block.status === 'published' ? 'Đang hiển thị (Nhấp để ẩn)' : 'Đang ẩn (Nhấp để hiển thị)'}
                >
                  {block.status === 'published' ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                </button>

                {/* Edit Button */}
                <button
                  onClick={() => handleOpenEdit(block)}
                  className="p-1.5 border border-paper-border hover:border-brass text-charcoal transition-colors"
                  title="Chỉnh sửa nội dung"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => handleDeleteBlock(block.id)}
                  className="p-1.5 border border-paper-border hover:border-terracotta text-terracotta transition-colors"
                  title="Xóa khối này"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>}
            </div>
          ))}
        </div>
      )}

      {/* Edit / Add Modal */}
      {!isDemo && isModalOpen && editingBlock && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-dark/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-paper border border-brass corner-frame p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1 text-charcoal-muted hover:text-charcoal"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="font-serif text-2xl font-bold text-forest mb-4">
              {editingBlock.id ? 'Biên Tập Story Block' : `Thêm Khối [${editingBlock.type?.toUpperCase()}]`}
            </h2>

            {error && <div role="alert" className="mb-4 border border-terracotta/40 bg-terracotta/10 p-3 text-sm text-terracotta">{error}</div>}

            <form onSubmit={handleSaveBlock} className="space-y-4 font-mono text-xs">
              <div>
                <label className="block text-charcoal-muted uppercase mb-1">Tiêu Đề Khối</label>
                <input
                  type="text"
                  value={editingBlock.title || ''}
                  onChange={e => setEditingBlock({ ...editingBlock, title: e.target.value })}
                  className="w-full px-3 py-2 bg-paper-warm border border-paper-border focus:border-brass focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-charcoal-muted uppercase mb-1">Tiêu Đề Phụ / Nhãn</label>
                <input
                  type="text"
                  value={editingBlock.subtitle || ''}
                  onChange={e => setEditingBlock({ ...editingBlock, subtitle: e.target.value })}
                  placeholder="Khảo cứu lịch sử..."
                  className="w-full px-3 py-2 bg-paper-warm border border-paper-border focus:border-brass focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-charcoal-muted uppercase mb-1">Nội Dung Văn Bản</label>
                <textarea
                  rows={5}
                  value={editingBlock.content || ''}
                  onChange={e => setEditingBlock({ ...editingBlock, content: e.target.value })}
                  className="w-full px-3 py-2 bg-paper-warm border border-paper-border focus:border-brass focus:outline-none font-sans"
                  required
                />
              </div>

              {(editingBlock.type === 'image' || editingBlock.type === 'text_image') && (
                <>
                  <div>
                    <label className="block text-charcoal-muted uppercase mb-1">URL Hình Ảnh</label>
                    <input
                      type="text"
                      value={editingBlock.mediaUrl || ''}
                      onChange={e => setEditingBlock({ ...editingBlock, mediaUrl: e.target.value })}
                      placeholder="/3D/chua-mot-cot-poster.webp hoặc URL Cloudinary/backend"
                      className="w-full px-3 py-2 bg-paper-warm border border-paper-border focus:border-brass focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-charcoal-muted uppercase mb-1">Chú Thích Hình Ảnh</label>
                    <input
                      type="text"
                      value={editingBlock.mediaCaption || ''}
                      onChange={e => setEditingBlock({ ...editingBlock, mediaCaption: e.target.value })}
                      className="w-full px-3 py-2 bg-paper-warm border border-paper-border focus:border-brass focus:outline-none"
                    />
                  </div>
                </>
              )}

              {editingBlock.type === 'highlight' && (
                <div>
                  <label className="block text-charcoal-muted uppercase mb-1">Huy Hiệu Điểm Nhấn</label>
                  <input
                    type="text"
                    value={editingBlock.highlightBadge || ''}
                    onChange={e => setEditingBlock({ ...editingBlock, highlightBadge: e.target.value })}
                    placeholder="Kiến Trúc Độc Bản"
                    className="w-full px-3 py-2 bg-paper-warm border border-paper-border focus:border-brass focus:outline-none"
                  />
                </div>
              )}

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
                  {saving ? 'Đang lưu…' : 'Lưu Khối Nội Dung'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminStoryBuilderPage;
