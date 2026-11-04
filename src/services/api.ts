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
} from '../data/fallbackData';

const API_BASE = (import.meta.env.VITE_API_BASE_URL as string) || 'http://localhost:8081/api';

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

async function adminRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: { ...getAuthHeaders(), ...init.headers },
  });
  const payload = await response.json().catch(() => null) as {
    data?: T;
    message?: string;
    success?: boolean;
  } | null;

  if (!response.ok || payload?.success === false) {
    if (response.status === 401 || response.status === 403) {
      localStorage.removeItem('viettoria_admin_token');
      window.dispatchEvent(new Event('viettoria:unauthorized'));
    }
    throw new Error(payload?.message || `Yêu cầu thất bại (${response.status})`);
  }

  return payload?.data as T;
}

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
    let response: Response;
    try {
      response = await fetch(`${API_BASE}/admin/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
    } catch {
      throw new Error('Không kết nối được máy chủ. Kiểm tra backend rồi thử lại.');
    }
    const payload = await response.json().catch(() => null) as {
      data?: { token: string; user: { fullName: string; username: string } };
      message?: string;
    } | null;
    if (!response.ok || !payload?.data?.token) {
      throw new Error(payload?.message || (response.ok ? 'Máy chủ không trả token đăng nhập.' : 'Đăng nhập thất bại.'));
    }
    localStorage.setItem('viettoria_admin_token', payload.data.token);
    localStorage.setItem('viettoria_admin_user', JSON.stringify(payload.data.user));
    return payload.data;
  },

  logout(): void {
    localStorage.removeItem('viettoria_admin_token');
    localStorage.removeItem('viettoria_admin_user');
  },

  isAuthenticated(): boolean {
    return Boolean(localStorage.getItem('viettoria_admin_token'));
  },

  async getDashboard(): Promise<{ stats: DashboardStats; recentProducts: Product[]; recentBlogs: BlogPost[] }> {
    return adminRequest('/admin/dashboard');
  },

  async getProducts(): Promise<Product[]> {
    return adminRequest('/admin/products');
  },

  async getProductById(id: string): Promise<Product & { storyBlocks: StoryBlock[] }> {
    return adminRequest(`/admin/products/${encodeURIComponent(id)}`);
  },

  async createProduct(data: Partial<Product>): Promise<Product> {
    return adminRequest('/admin/products', { method: 'POST', body: JSON.stringify(data) });
  },

  async updateProduct(id: string, data: Partial<Product>): Promise<Product> {
    return adminRequest(`/admin/products/${encodeURIComponent(id)}`, { method: 'PUT', body: JSON.stringify(data) });
  },

  async deleteProduct(id: string): Promise<void> {
    await adminRequest(`/admin/products/${encodeURIComponent(id)}`, { method: 'DELETE' });
  },

  async getStories(productId: string): Promise<StoryBlock[]> {
    return adminRequest(`/admin/products/${encodeURIComponent(productId)}/stories`);
  },

  async createStory(productId: string, data: Partial<StoryBlock>): Promise<StoryBlock> {
    return adminRequest(`/admin/products/${encodeURIComponent(productId)}/stories`, { method: 'POST', body: JSON.stringify(data) });
  },

  async updateStory(id: string, data: Partial<StoryBlock>): Promise<StoryBlock> {
    return adminRequest(`/admin/stories/${encodeURIComponent(id)}`, { method: 'PUT', body: JSON.stringify(data) });
  },

  async deleteStory(id: string): Promise<void> {
    await adminRequest(`/admin/stories/${encodeURIComponent(id)}`, { method: 'DELETE' });
  },

  async reorderStories(productId: string, blockIds: string[]): Promise<void> {
    await adminRequest(`/admin/products/${encodeURIComponent(productId)}/stories/reorder`, { method: 'PUT', body: JSON.stringify({ blockIds }) });
  },

  async getCollections(): Promise<Collection[]> {
    return adminRequest('/admin/collections');
  },

  async createCollection(data: Partial<Collection>): Promise<Collection> {
    return adminRequest('/admin/collections', { method: 'POST', body: JSON.stringify(data) });
  },

  async updateCollection(id: string, data: Partial<Collection>): Promise<Collection> {
    return adminRequest(`/admin/collections/${encodeURIComponent(id)}`, { method: 'PUT', body: JSON.stringify(data) });
  },

  async deleteCollection(id: string): Promise<void> {
    await adminRequest(`/admin/collections/${encodeURIComponent(id)}`, { method: 'DELETE' });
  },

  async getBlogs(): Promise<BlogPost[]> {
    return adminRequest('/admin/blogs');
  },

  async createBlog(data: Partial<BlogPost>): Promise<BlogPost> {
    return adminRequest('/admin/blogs', { method: 'POST', body: JSON.stringify(data) });
  },

  async updateBlog(id: string, data: Partial<BlogPost>): Promise<BlogPost> {
    return adminRequest(`/admin/blogs/${encodeURIComponent(id)}`, { method: 'PUT', body: JSON.stringify(data) });
  },

  async deleteBlog(id: string): Promise<void> {
    await adminRequest(`/admin/blogs/${encodeURIComponent(id)}`, { method: 'DELETE' });
  },

  async getMedia(): Promise<MediaItem[]> {
    return adminRequest('/admin/media');
  }
};
