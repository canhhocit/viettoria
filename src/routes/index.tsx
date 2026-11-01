import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';

// Public Pages
import HomePage from '../pages/HomePage';
import CollectionsPage from '../pages/CollectionsPage';
import CollectionDetailPage from '../pages/CollectionDetailPage';
import ProductsPage from '../pages/ProductsPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import QRResolverPage from '../pages/QRResolverPage';
import AboutPage from '../pages/AboutPage';
import BlogsPage from '../pages/BlogsPage';
import BlogDetailPage from '../pages/BlogDetailPage';

// Admin CMS Pages
import AdminLoginPage from '../pages/admin/AdminLoginPage';
import AdminDashboardPage from '../pages/admin/AdminDashboardPage';
import AdminProductsPage from '../pages/admin/AdminProductsPage';
import AdminStoryBuilderPage from '../pages/admin/AdminStoryBuilderPage';
import AdminCollectionsPage from '../pages/admin/AdminCollectionsPage';
import AdminBlogsPage from '../pages/admin/AdminBlogsPage';
import AdminMediaPage from '../pages/admin/AdminMediaPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/collections" element={<CollectionsPage />} />
        <Route path="/collections/:slug" element={<CollectionDetailPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:slug" element={<ProductDetailPage />} />
        
        {/* QR Code Resolvers */}
        <Route path="/product" element={<QRResolverPage />} />
        <Route path="/p" element={<QRResolverPage />} />
        <Route path="/p/:code" element={<QRResolverPage />} />

        {/* Brand & Culture */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/blogs/:slug" element={<BlogDetailPage />} />
      </Route>

      {/* Admin Auth Route */}
      <Route path="/admin/login" element={<AdminLoginPage />} />

      {/* Protected Admin CMS Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboardPage />} />
        <Route path="products" element={<AdminProductsPage />} />
        <Route path="products/:id/stories" element={<AdminStoryBuilderPage />} />
        <Route path="collections" element={<AdminCollectionsPage />} />
        <Route path="blogs" element={<AdminBlogsPage />} />
        <Route path="media" element={<AdminMediaPage />} />
      </Route>

      {/* Catch-all fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
