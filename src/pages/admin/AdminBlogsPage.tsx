import React, { useEffect, useState } from 'react';
import { Plus, Edit, CheckCircle, X, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { adminApi } from '../../services/api';
import type { BlogPost } from '../../types';

export const AdminBlogsPage: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Partial<BlogPost> | null>(null);

  const loadData = async () => {
    setLoading(true);
    const data = await adminApi.getBlogs();
    setBlogs(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenAdd = () => {
    setEditingBlog({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      coverImage: '/images/chua-mot-cot.webp',
      author: 'Ban Cố Vấn Văn Hóa',
      category: 'Khảo Cứu Kiến Trúc',
      readTime: '5 phút đọc',
      publishedAt: '2026-03-30',
      status: 'published'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (blog: BlogPost) => {
    setEditingBlog({ ...blog });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog || !editingBlog.title) return;
    setIsModalOpen(false);
    loadData();
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-paper-border">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest mt-1">
            Quản Lý Góc Văn Hóa
          </h1>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-forest text-paper hover:bg-brass transition-colors font-mono text-xs uppercase tracking-wider font-bold flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Bài Viết Mới</span>
        </button>
      </div>

      {/* Blog List Table */}
      <div className="bg-paper border border-paper-border corner-frame overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-paper-warm border-b border-paper-border text-charcoal-muted font-mono uppercase tracking-wider">
              <th className="p-4">Tiêu Đề Bài Viết</th>
              <th className="p-4">Chuyên Mục</th>
              <th className="p-4">Tác Giả</th>
              <th className="p-4">Ngày Đăng</th>
              <th className="p-4">Trạng Thái</th>
              <th className="p-4 text-right">Thao Tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-paper-border font-mono">
            {loading ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-forest">
                  Đang tải danh sách bài viết...
                </td>
              </tr>
            ) : blogs.map((b) => (
              <tr key={b.id} className="hover:bg-paper-warm/50 transition-colors">
                <td className="p-4">
                  <div className="font-serif font-bold text-forest text-sm line-clamp-1">{b.title}</div>
                  <div className="text-[11px] font-sans text-charcoal-muted line-clamp-1">{b.excerpt}</div>
                </td>
                <td className="p-4">
                  <span className="bg-paper-warm px-2 py-1 border border-paper-border text-brass font-bold">
                    {b.category}
                  </span>
                </td>
                <td className="p-4 text-charcoal">{b.author}</td>
                <td className="p-4 text-charcoal-muted">{b.publishedAt}</td>
                <td className="p-4">
                  <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold text-forest bg-forest/10 px-2 py-0.5 border border-forest/20">
                    <CheckCircle className="w-3 h-3" />
                    <span>Xuất Bản</span>
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleOpenEdit(b)}
                      className="p-1.5 border border-paper-border hover:border-brass text-charcoal"
                      title="Sửa bài viết"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <Link
                      to={`/blogs/${b.slug}`}
                      target="_blank"
                      className="p-1.5 border border-paper-border hover:border-forest text-charcoal"
                      title="Xem bài viết công khai"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {isModalOpen && editingBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-dark/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-paper border border-brass corner-frame p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1 text-charcoal-muted hover:text-charcoal"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="font-serif text-2xl font-bold text-forest mb-4">
              {editingBlog.id ? 'Biên Tập Bài Viết Khảo Cứu' : 'Soạn Bài Viết Mới'}
            </h2>

            <form onSubmit={handleSave} className="space-y-4 font-mono text-xs">
              <div>
                <label className="block text-charcoal-muted uppercase mb-1">Tiêu Đề Bài Viết</label>
                <input
                  type="text"
                  value={editingBlog.title || ''}
                  onChange={e => setEditingBlog({ ...editingBlog, title: e.target.value })}
                  className="w-full px-3 py-2 bg-paper-warm border border-paper-border focus:border-brass focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-charcoal-muted uppercase mb-1">Chuyên Mục</label>
                  <input
                    type="text"
                    value={editingBlog.category || ''}
                    onChange={e => setEditingBlog({ ...editingBlog, category: e.target.value })}
                    className="w-full px-3 py-2 bg-paper-warm border border-paper-border focus:border-brass focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-charcoal-muted uppercase mb-1">Tác Giả</label>
                  <input
                    type="text"
                    value={editingBlog.author || ''}
                    onChange={e => setEditingBlog({ ...editingBlog, author: e.target.value })}
                    className="w-full px-3 py-2 bg-paper-warm border border-paper-border focus:border-brass focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-charcoal-muted uppercase mb-1">Đoạn Trích Tóm Tắt (Excerpt)</label>
                <textarea
                  rows={2}
                  value={editingBlog.excerpt || ''}
                  onChange={e => setEditingBlog({ ...editingBlog, excerpt: e.target.value })}
                  className="w-full px-3 py-2 bg-paper-warm border border-paper-border focus:border-brass focus:outline-none font-sans"
                  required
                />
              </div>

              <div>
                <label className="block text-charcoal-muted uppercase mb-1">Nội Dung Đầy Đủ (Đoạn văn cách nhau bởi 2 dấu xuống dòng)</label>
                <textarea
                  rows={8}
                  value={editingBlog.content || ''}
                  onChange={e => setEditingBlog({ ...editingBlog, content: e.target.value })}
                  className="w-full px-3 py-2 bg-paper-warm border border-paper-border focus:border-brass focus:outline-none font-sans"
                  required
                />
              </div>

              <div>
                <label className="block text-charcoal-muted uppercase mb-1">URL Ảnh Bìa</label>
                <input
                  type="text"
                  value={editingBlog.coverImage || ''}
                  onChange={e => setEditingBlog({ ...editingBlog, coverImage: e.target.value })}
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
                  Lưu Bài Viết
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBlogsPage;
