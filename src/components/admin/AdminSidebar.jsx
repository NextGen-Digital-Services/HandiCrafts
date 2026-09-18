import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Users, ShoppingBag, LogOut, ArrowLeft, PlusCircle, Menu, X, ShieldCheck } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export function AdminSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { logout, user } = useAuth()

  const handleLogout = () => {
    logout()
    setMobileOpen(false)
    navigate('/admin/login')
  }

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Artisans & QRs', path: '/admin/artisans', icon: Users },
    { label: 'Product Catalogue', path: '/admin/products', icon: ShoppingBag }
  ]

  const isActive = (path) => location.pathname === path

  const sidebarContent = (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
      <div>
        <div style={{ paddingBottom: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(184, 147, 95, 0.2)' }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--color-brass-light)' }}>
            Noor-e-Kashmir
          </div>
          <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(247, 241, 230, 0.6)' }}>
            Artisan & Hang-Tag Admin
          </div>
          {user && (
            <div style={{ fontSize: '0.75rem', color: 'var(--color-brass)', marginTop: '0.5rem' }}>
              Admin: <strong>{user.username}</strong>
            </div>
          )}
        </div>

        <nav>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {navItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.path)
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.8rem',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      color: active ? 'var(--color-ivory)' : 'rgba(247, 241, 230, 0.7)',
                      backgroundColor: active ? 'var(--color-bordeaux)' : 'transparent',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Icon size={18} color={active ? 'var(--color-brass-light)' : 'rgba(247, 241, 230, 0.7)'} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div style={{ marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(184, 147, 95, 0.2)' }}>
          <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--color-brass-light)', marginBottom: '0.8rem' }}>
            Quick Actions
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Link 
              to="/admin/artisans/new"
              onClick={() => setMobileOpen(false)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'rgba(247, 241, 230, 0.85)', padding: '0.4rem 0.5rem' }}
            >
              <PlusCircle size={15} color="var(--color-brass)" />
              <span>+ Add Artisan (Gen QR)</span>
            </Link>
            <Link 
              to="/admin/products/new"
              onClick={() => setMobileOpen(false)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'rgba(247, 241, 230, 0.85)', padding: '0.4rem 0.5rem' }}
            >
              <PlusCircle size={15} color="var(--color-brass)" />
              <span>+ Add Product</span>
            </Link>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(184, 147, 95, 0.2)' }}>
        <Link
          to="/"
          onClick={() => setMobileOpen(false)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            fontSize: '0.85rem',
            color: 'var(--color-brass-light)'
          }}
        >
          <ArrowLeft size={16} />
          <span>View Public Atelier</span>
        </Link>
        <button
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            fontSize: '0.85rem',
            color: '#E57373',
            cursor: 'pointer',
            textAlign: 'left',
            background: 'none',
            border: 'none',
            padding: 0
          }}
        >
          <LogOut size={16} />
          <span>Admin Logout</span>
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Topbar (< 1024px) */}
      <header className="admin-topbar-mobile">
        <Link to="/admin/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <ShieldCheck size={22} color="var(--color-brass-light)" />
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: 'var(--color-brass-light)' }}>
            Noor-e-Kashmir Admin
          </span>
        </Link>

        <button 
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ color: 'var(--color-brass-light)', padding: '0.4rem' }}
          aria-label="Toggle Admin Menu"
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="drawer-overlay" onClick={() => setMobileOpen(false)}>
          <div className="drawer-content" style={{ backgroundColor: 'var(--color-charcoal)', color: 'var(--color-ivory)' }} onClick={(e) => e.stopPropagation()}>
            {sidebarContent}
          </div>
        </div>
      )}

      {/* Desktop Sidebar (>= 1024px) */}
      <aside className="desktop-admin-sidebar" style={{
        width: '260px',
        backgroundColor: 'var(--color-charcoal)',
        color: 'var(--color-ivory)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '2rem 1.2rem',
        borderRight: '1px solid rgba(184, 147, 95, 0.3)',
        flexShrink: 0
      }}>
        {sidebarContent}
      </aside>
    </>
  )
}
