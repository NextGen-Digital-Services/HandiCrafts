import React from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ErrorBoundary } from './components/ui/ErrorBoundary'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { PageTransition } from './components/layout/PageTransition'
import { ProtectedRoute } from './components/admin/ProtectedRoute'

// Public Pages
import { Home } from './pages/Home'
import { Collections } from './pages/Collections'
import { ProductDetail } from './pages/ProductDetail'
import { OurStory } from './pages/OurStory'
import { ArtisanStory } from './pages/ArtisanStory'
import { Heritage } from './pages/Heritage'
import { Contact } from './pages/Contact'

// Admin Pages
import { Login } from './pages/admin/Login'
import { Dashboard } from './pages/admin/Dashboard'
import { ArtisansList } from './pages/admin/ArtisansList'
import { ArtisanForm } from './pages/admin/ArtisanForm'
import { ProductsList } from './pages/admin/ProductsList'
import { ProductForm } from './pages/admin/ProductForm'

export default function App() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  return (
    <ErrorBoundary>
      <AuthProvider>
        <div className="site-wrapper">
          {!isAdminRoute && <Navbar />}

          <div className="main-content">
            <PageTransition>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/collections" element={<Collections />} />
                <Route path="/collections/:category" element={<Collections />} />
                <Route path="/product/:slug" element={<ProductDetail />} />
                <Route path="/our-story" element={<OurStory />} />
                <Route path="/our-story/:artisanSlug" element={<ArtisanStory />} />
                <Route path="/heritage" element={<Heritage />} />
                <Route path="/contact" element={<Contact />} />

                {/* Admin Routes */}
                <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="/admin/login" element={<Login />} />
                
                <Route path="/admin/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/admin/artisans" element={
                  <ProtectedRoute>
                    <ArtisansList />
                  </ProtectedRoute>
                } />
                <Route path="/admin/artisans/new" element={
                  <ProtectedRoute>
                    <ArtisanForm />
                  </ProtectedRoute>
                } />
                <Route path="/admin/artisans/edit/:id" element={
                  <ProtectedRoute>
                    <ArtisanForm />
                  </ProtectedRoute>
                } />
                <Route path="/admin/products" element={
                  <ProtectedRoute>
                    <ProductsList />
                  </ProtectedRoute>
                } />
                <Route path="/admin/products/new" element={
                  <ProtectedRoute>
                    <ProductForm />
                  </ProtectedRoute>
                } />
                <Route path="/admin/products/edit/:id" element={
                  <ProtectedRoute>
                    <ProductForm />
                  </ProtectedRoute>
                } />

                {/* Fallback Catch-All Route */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </PageTransition>
          </div>

          {!isAdminRoute && <Footer />}
        </div>
      </AuthProvider>
    </ErrorBoundary>
  )
}
