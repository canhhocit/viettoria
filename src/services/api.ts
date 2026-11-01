import type { 
  Collection, 
  Product, 
  StoryBlock, 
  BlogPost, 
  MediaItem, 
  DashboardStats 
} from '../types/index';
import { 
  FALLBACK_COLLECTIONS, 
  FALLBACK_PRODUCTS, 
  FALLBACK_STORY_BLOCKS, 
  FALLBACK_BLOGS,
  FALLBACK_MEDIA 
} from '../data/fallbackData';

const API_BASE = 'http://localhost:5000/api';

const getAuthHeaders = (): Record<string, string> => {
  const token = localStorage.getItem('viettoria_admin_token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

// --- PUBLIC API ---
export const publicApi = {
  async getCollections(): Promise<Collection[]> {
    try {
      const res = await fetch(`${API_BASE}/public/collections`);
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {
      // Fallback
    }
    return FALLBACK_COLLECTIONS.filter(c => c.status === 'published');
  },

  async getCollectionBySlug(slug: string): Promise<(Collection & { products: Product[] }) | null> {
    try {
      const res = await fetch(`${API_BASE}/public/collections/${slug}`);
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {
      // Fallback
    }
    const col = FALLBACK_COLLECTIONS.find(c => c.slug === slug);
    if (!col) return null;
    const prods = FALLBACK_PRODUCTS.filter(p => p.collectionId === col.id && p.status === 'published');
    return { ...col, products: prods };
  },

  async getProducts(params?: { collectionId?: string; search?: string }): Promise<Product[]> {
    try {
      const query = new URLSearchParams();
      if (params?.collectionId) query.set('collectionId', params.collectionId);
      if (params?.search) query.set('search', params.search);
      const res = await fetch(`${API_BASE}/public/products?${query.toString()}`);
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {
      // Fallback
    }
    let list = FALLBACK_PRODUCTS.filter(p => p.status === 'published');
    if (params?.collectionId) {
      list = list.filter(p => p.collectionId === params.collectionId);
    }
    if (params?.search) {
      const q = params.search.toLowerCase();
      list = list.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.code.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q)
      );
    }
    return list;
  },

  async getProductBySlugOrCode(slugOrCode: string): Promise<Product | null> {
    try {
      const res = await fetch(`${API_BASE}/public/products/${slugOrCode}`);
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {
      // Fallback
    }
    const lower = slugOrCode.toLowerCase();
    const prod = FALLBACK_PRODUCTS.find(p => 
      p.slug.toLowerCase() === lower || p.code.toLowerCase() === lower
    );
    if (!prod) return null;

    const col = FALLBACK_COLLECTIONS.find(c => c.id === prod.collectionId);
    const storyBlocks = FALLBACK_STORY_BLOCKS.filter(b => b.productId === prod.id && b.status === 'published');
    const relatedProducts = FALLBACK_PRODUCTS.filter(p => p.collectionId === prod.collectionId && p.id !== prod.id).slice(0, 3);

    return {
      ...prod,
      collection: col,
      storyBlocks,
      relatedProducts
    };
  },

  async resolveQR(code: string): Promise<{ targetUrl: string; product: Product } | null> {
    try {
      const res = await fetch(`${API_BASE}/public/qr-resolve?code=${encodeURIComponent(code)}`);
      if (res.ok) {
        const json = await res.json();
        const fullProd = await this.getProductBySlugOrCode(json.data.slug);
        if (fullProd) {
          return { targetUrl: json.data.targetUrl, product: fullProd };
        }
      }
    } catch {
      // Fallback
    }
    const prod = FALLBACK_PRODUCTS.find(p => p.code.toLowerCase() === code.toLowerCase());
    if (!prod) return null;
    return {
      targetUrl: `/products/${prod.slug}?code=${encodeURIComponent(prod.code)}`,
      product: prod
    };
  },

  async getBlogs(): Promise<BlogPost[]> {
    try {
      const res = await fetch(`${API_BASE}/public/blogs`);
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {
      // Fallback
    }
    return FALLBACK_BLOGS.filter(b => b.status === 'published');
  },

  async getBlogBySlug(slug: string): Promise<BlogPost | null> {
    try {
      const res = await fetch(`${API_BASE}/public/blogs/${slug}`);
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {
      // Fallback
    }
    const blog = FALLBACK_BLOGS.find(b => b.slug === slug);
    return blog || null;
  },

  async getFeatured(): Promise<{
    heroProduct: Product;
    featuredProducts: Product[];
    collections: Collection[];
    latestBlogs: BlogPost[];
  }> {
    try {
      const res = await fetch(`${API_BASE}/public/featured`);
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {
      // Fallback
    }
    const heroProduct = FALLBACK_PRODUCTS.find(p => p.isHeroRelease) || FALLBACK_PRODUCTS[0];
    const featuredProducts = FALLBACK_PRODUCTS.filter(p => p.id !== heroProduct.id).slice(0, 4);
    const collections = FALLBACK_COLLECTIONS.slice(0, 3);
    const latestBlogs = FALLBACK_BLOGS.slice(0, 3);

    return { heroProduct, featuredProducts, collections, latestBlogs };
  }
};

// --- ADMIN CMS API ---
export const adminApi = {
  async login(username: string, password: string): Promise<{ token: string; user: { fullName: string; username: string } }> {
    try {
      const res = await fetch(`${API_BASE}/admin/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (res.ok) {
        const json = await res.json();
        localStorage.setItem('viettoria_admin_token', json.data.token);
        return json.data;
      }
      const errJson = await res.json();
      throw new Error(errJson.message || 'Đăng nhập thất bại');
    } catch (err: unknown) {
      // Local fallback auth
      if (username === 'admin' && password === 'viettoria@2026') {
        const mockToken = 'mock-jwt-token-viettoria-2026';
        localStorage.setItem('viettoria_admin_token', mockToken);
        return {
          token: mockToken,
          user: { fullName: 'Quản Trị Viên Viettoria', username: 'admin' }
        };
      }
      throw err;
    }
  },

  logout(): void {
    localStorage.removeItem('viettoria_admin_token');
  },

  isAuthenticated(): boolean {
    return Boolean(localStorage.getItem('viettoria_admin_token'));
  },

  async getDashboard(): Promise<{ stats: DashboardStats; recentProducts: Product[]; recentBlogs: BlogPost[] }> {
    try {
      const res = await fetch(`${API_BASE}/admin/dashboard`, {
        headers: getAuthHeaders()
      });
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {
      // Fallback
    }
    return {
      stats: {
        totalProducts: FALLBACK_PRODUCTS.length,
        publishedProducts: FALLBACK_PRODUCTS.filter(p => p.status === 'published').length,
        totalCollections: FALLBACK_COLLECTIONS.length,
        totalBlogs: FALLBACK_BLOGS.length,
        totalStoryBlocks: FALLBACK_STORY_BLOCKS.length,
        totalMedia: FALLBACK_MEDIA.length
      },
      recentProducts: FALLBACK_PRODUCTS.slice(0, 5),
      recentBlogs: FALLBACK_BLOGS.slice(0, 5)
    };
  },

  async getProducts(): Promise<Product[]> {
    try {
      const res = await fetch(`${API_BASE}/admin/products`, { headers: getAuthHeaders() });
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {
      // Fallback
    }
    return FALLBACK_PRODUCTS;
  },

  async getProductById(id: string): Promise<Product & { storyBlocks: StoryBlock[] }> {
    try {
      const res = await fetch(`${API_BASE}/admin/products/${id}`, { headers: getAuthHeaders() });
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {
      // Fallback
    }
    const p = FALLBACK_PRODUCTS.find(item => item.id === id) || FALLBACK_PRODUCTS[0];
    const storyBlocks = FALLBACK_STORY_BLOCKS.filter(b => b.productId === p.id);
    return { ...p, storyBlocks };
  },

  async createProduct(data: Partial<Product>): Promise<Product> {
    try {
      const res = await fetch(`${API_BASE}/admin/products`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      });
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
      const err = await res.json();
      throw new Error(err.message || 'Lỗi tạo sản phẩm');
    } catch (err) {
      console.warn('Backend not responding, updating local state', err);
      return data as Product;
    }
  },

  async updateProduct(id: string, data: Partial<Product>): Promise<Product> {
    try {
      const res = await fetch(`${API_BASE}/admin/products/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      });
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
      const err = await res.json();
      throw new Error(err.message || 'Lỗi cập nhật sản phẩm');
    } catch (err) {
      console.warn('Backend not responding', err);
      return { id, ...data } as Product;
    }
  },

  async deleteProduct(id: string): Promise<void> {
    try {
      await fetch(`${API_BASE}/admin/products/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
    } catch (err) {
      console.warn('Backend delete error', err);
    }
  },

  async getStories(productId: string): Promise<StoryBlock[]> {
    try {
      const res = await fetch(`${API_BASE}/admin/products/${productId}/stories`, { headers: getAuthHeaders() });
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {
      // Fallback
    }
    return FALLBACK_STORY_BLOCKS.filter(b => b.productId === productId);
  },

  async createStory(productId: string, data: Partial<StoryBlock>): Promise<StoryBlock> {
    try {
      const res = await fetch(`${API_BASE}/admin/products/${productId}/stories`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      });
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch (err) {
      console.warn('Backend error', err);
    }
    return { id: `block-${Date.now()}`, productId, ...data } as StoryBlock;
  },

  async updateStory(id: string, data: Partial<StoryBlock>): Promise<StoryBlock> {
    try {
      const res = await fetch(`${API_BASE}/admin/stories/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      });
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch (err) {
      console.warn('Backend error', err);
    }
    return { id, ...data } as StoryBlock;
  },

  async deleteStory(id: string): Promise<void> {
    try {
      await fetch(`${API_BASE}/admin/stories/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
    } catch (err) {
      console.warn('Backend error', err);
    }
  },

  async reorderStories(productId: string, blockIds: string[]): Promise<void> {
    try {
      await fetch(`${API_BASE}/admin/products/${productId}/stories/reorder`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ blockIds })
      });
    } catch (err) {
      console.warn('Backend error', err);
    }
  },

  async getCollections(): Promise<Collection[]> {
    try {
      const res = await fetch(`${API_BASE}/admin/collections`, { headers: getAuthHeaders() });
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {
      // Fallback
    }
    return FALLBACK_COLLECTIONS;
  },

  async getBlogs(): Promise<BlogPost[]> {
    try {
      const res = await fetch(`${API_BASE}/admin/blogs`, { headers: getAuthHeaders() });
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {
      // Fallback
    }
    return FALLBACK_BLOGS;
  },

  async getMedia(): Promise<MediaItem[]> {
    try {
      const res = await fetch(`${API_BASE}/admin/media`, { headers: getAuthHeaders() });
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {
      // Fallback
    }
    return FALLBACK_MEDIA;
  }
};
