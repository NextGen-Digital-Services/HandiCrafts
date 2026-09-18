import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Users, ShoppingBag, LogOut, ArrowLeft, PlusCircle } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export function AdminSidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { logout, user } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Artisans', path: '/admin/artisans', icon: Users },
    { label: 'Products', path: '/admin/products', icon: ShoppingBag }
  ]

  const isActive = (path) => location.pathname === path

  return (
    <aside style={{
      width: '260px',
      backgroundColor: 'var(--color-charcoal)',
      color: 'var(--color-ivory)',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '2rem 1.2rem',
      borderRight: '1px solid rgba(184, 147, 95, 0.3)'
    }}>
      <div>
        <div style={{ paddingBottom: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(184, 147, 95, 0.2)' }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--color-brass-light)' }}>
            Noor-e-Kashmir
          </div>
          <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(247, 241, 230, 0.6)' }}>
            Artisan & Hang-Tag Admin
          </div>
          {user && (
            <div style={{ fontSize: '0.75rem', color: 'var(--color-brass)', marginTop: '0.4rem' }}>
              Logged in as: <strong>{user.username}</strong>
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

        <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(184, 147, 95, 0.2)' }}>
          <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--color-brass-light)', marginBottom: '0.8rem' }}>
            Quick Actions
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <Link 
              to="/admin/artisans/new" 
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'rgba(247, 241, 230, 0.8)', padding: '0.4rem 0.5rem' }}
            >
              <PlusCircle size={14} color="var(--color-brass)" />
              <span>+ Add Artisan (Gen QR)</span>
            </Link>
            <Link 
              to="/admin/products/new" 
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'rgba(247, 241, 230, 0.8)', padding: '0.4rem 0.5rem' }}
            >
              <PlusCircle size={14} color="var(--color-brass)" />
              <span>+ Add Product</span>
            </Link>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(184, 147, 95, 0.2)' }}>
        <Link
          to="/"
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
    </aside>
  )
}
