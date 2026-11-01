import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, ArrowRight, Clock, User } from 'lucide-react';
import { publicApi } from '../services/api';
import type { BlogPost } from '../types';

export const BlogsPage: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    publicApi.getBlogs().then((data) => {
      setBlogs(data);
      setLoading(false);
    });
  }, []);

  const categories = ['all', ...Array.from(new Set(blogs.map(b => b.category)))];

  const filteredBlogs = selectedCategory === 'all'
    ? blogs
    : blogs.filter(b => b.category === selectedCategory);

  return (
    <div className="bg-paper min-h-screen py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-brass text-xs font-mono uppercase tracking-widest">
            <FileText className="w-4 h-4" />
            <span>Nghiên Cứu Lịch Sử & Kỹ Thuật Số Hóa</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-forest leading-tight">
            Góc Nhìn Di Sản
          </h1>
          <p className="text-base text-charcoal/80 font-light leading-relaxed">
            Các khảo cứu chuyên sâu về kiến trúc cổ, kỹ nghệ chế tác mộng gỗ truyền thống và hành trình đưa di sản nghìn năm hòa nhịp vào đời sống đương đại.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-paper-border pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors border ${
                selectedCategory === cat
                  ? 'bg-forest text-paper border-forest font-semibold'
                  : 'bg-paper-warm text-charcoal border-paper-border hover:border-brass'
              }`}
            >
              {cat === 'all' ? 'Tất Cả Bài Viết' : cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        {loading ? (
          <div className="py-20 text-center font-mono text-xs text-forest">
            ĐANG TẢI BÀI VIẾT KHẢO CỨU...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <article
                key={blog.id}
                className="bg-paper-warm border border-paper-border hover:border-brass transition-all corner-frame overflow-hidden flex flex-col justify-between group shadow-sm"
              >
                <div>
                  <div className="aspect-[16/10] overflow-hidden bg-forest">
                    <img
                      src={blog.coverImage}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-mono text-charcoal-muted">
                      <span className="text-brass font-semibold uppercase">{blog.category}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{blog.readTime}</span>
                      </span>
                    </div>

                    <h2 className="font-serif text-xl font-bold text-forest group-hover:text-brass transition-colors leading-snug">
                      <Link to={`/blogs/${blog.slug}`}>
                        {blog.title}
                      </Link>
                    </h2>

                    <p className="text-xs text-charcoal/80 font-light line-clamp-3 leading-relaxed">
                      {blog.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-paper-border mt-4">
                  <div className="pt-4 flex items-center justify-between text-xs font-mono text-charcoal-muted">
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-brass" />
                      <span>{blog.author}</span>
                    </span>

                    <Link
                      to={`/blogs/${blog.slug}`}
                      className="inline-flex items-center gap-1 text-brass font-bold hover:underline"
                    >
                      <span>Đọc tiếp</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogsPage;
