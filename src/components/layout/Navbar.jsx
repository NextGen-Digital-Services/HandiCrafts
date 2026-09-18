import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ShieldCheck, UserCheck, ArrowRight } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const { isAuthenticated } = useAuth()

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Collections', path: '/collections' },
    { label: 'Artisan Hub', path: '/our-story' },
    { label: 'Our Heritage', path: '/heritage' },
    { label: 'Contact', path: '/contact' }
  ]

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="brand-logo" onClick={() => setIsOpen(false)}>
          <span className="brand-title">Noor-e-Kashmir</span>
          <span className="brand-subtitle">Heritage Atelier</span>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              to={isAuthenticated ? '/admin/dashboard' : '/admin/login'}
              className="badge badge-brass"
              style={{ padding: '0.4rem 0.9rem', fontSize: '0.75rem', gap: '0.4rem' }}
            >
              {isAuthenticated ? <UserCheck size={14} /> : <ShieldCheck size={14} />}
              <span>{isAuthenticated ? 'Admin Portal' : 'Artisan Admin'}</span>
            </Link>
          </li>
        </ul>

        {/* Mobile Toggle Button */}
        <button 
          className="mobile-menu-btn" 
          onClick={() => setIsOpen(true)}
          aria-label="Open Navigation Menu"
        >
          <Menu size={26} />
        </button>
      </div>

      {/* Mobile Menu Drawer Overlay */}
      {isOpen && (
        <div className="drawer-overlay" onClick={() => setIsOpen(false)}>
          <div className="drawer-content" onClick={(e) => e.stopPropagation()}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-brass-light)' }}>
                <div className="brand-logo">
                  <span className="brand-title" style={{ fontSize: '1.3rem' }}>Noor-e-Kashmir</span>
                  <span className="brand-subtitle" style={{ fontSize: '0.55rem' }}>Heritage Atelier</span>
                </div>
                <button onClick={() => setIsOpen(false)} style={{ color: 'var(--color-bordeaux-deep)', padding: '0.4rem' }}>
                  <X size={26} />
                </button>
              </div>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.8rem 1rem',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '1rem',
                        fontWeight: '500',
                        color: isActive(link.path) ? 'var(--color-bordeaux)' : 'var(--color-walnut)',
                        backgroundColor: isActive(link.path) ? 'var(--color-ivory-deep)' : 'transparent'
                      }}
                    >
                      <span>{link.label}</span>
                      <ArrowRight size={16} opacity={0.6} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ paddingTop: '1.5rem', borderTop: '1px solid var(--color-brass-light)' }}>
              <Link
                to={isAuthenticated ? '/admin/dashboard' : '/admin/login'}
                onClick={() => setIsOpen(false)}
                className="btn btn-brass"
                style={{ width: '100%', justifyContent: 'center', gap: '0.5rem' }}
              >
                {isAuthenticated ? <UserCheck size={18} /> : <ShieldCheck size={18} />}
                <span>{isAuthenticated ? 'Admin Dashboard' : 'Artisan Admin Portal'}</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
