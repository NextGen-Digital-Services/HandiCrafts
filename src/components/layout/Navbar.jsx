import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ShieldCheck, UserCheck } from 'lucide-react'
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

        {/* Desktop Nav */}
        <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
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
              onClick={() => setIsOpen(false)}
            >
              {isAuthenticated ? <UserCheck size={14} /> : <ShieldCheck size={14} />}
              <span>{isAuthenticated ? 'Admin Portal' : 'Artisan Admin'}</span>
            </Link>
          </li>
        </ul>

        {/* Mobile Toggle */}
        <button 
          className="mobile-menu-btn" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Navigation"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>
    </nav>
  )
}
