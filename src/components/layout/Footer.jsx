import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, QrCode, Mail, ArrowRight, Check } from 'lucide-react'

export function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 5000)
    }
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-brand">
            <Link to="/" className="brand-logo" style={{ color: 'var(--color-ivory)' }}>
              <span className="brand-title" style={{ color: 'var(--color-ivory)' }}>Noor-e-Kashmir</span>
              <span className="brand-subtitle">Heritage Atelier</span>
            </Link>
            <p>
              Curating authentic Kashmiri pashmina, hand-embroidered textiles, paper mache, and carved walnut timber with Italian atelier level refinement and ethical artisan revenue sharing.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: '1.2rem', color: 'var(--color-brass-light)', fontSize: '0.85rem' }}>
              <QrCode size={18} />
              <span>Physical Hang-Tag QR Verification System</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-heading">Collections</h4>
            <ul className="footer-links">
              <li><Link to="/collections/sozni-embroidery">Sozni Needlework</Link></li>
              <li><Link to="/collections/pashmina-shawls">Pashmina Shawls</Link></li>
              <li><Link to="/collections/kani-weaves">Kani Jamawar</Link></li>
              <li><Link to="/collections/paper-mache">24K Paper Mache</Link></li>
              <li><Link to="/collections/walnut-wood-carving">Carved Walnut Wood</Link></li>
              <li><Link to="/collections/namda-crewel">Crewel & Namda Rugs</Link></li>
            </ul>
          </div>

          {/* Atelier Links */}
          <div>
            <h4 className="footer-heading">The Atelier</h4>
            <ul className="footer-links">
              <li><Link to="/our-story">Artisan Hub</Link></li>
              <li><Link to="/heritage">Centuries of Heritage</Link></li>
              <li><Link to="/contact">Atelier Contact</Link></li>
              <li><Link to="/admin/login">Artisan Admin Portal</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-newsletter">
            <h4 className="footer-heading">Private Dispatch</h4>
            <p style={{ fontSize: '0.85rem', color: 'rgba(247, 241, 230, 0.75)', marginBottom: '1rem' }}>
              Subscribe to receive invitations to new master artisan releases and limited collection previews.
            </p>
            <form onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="btn btn-brass"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                {subscribed ? (
                  <>
                    <Check size={16} /> Subscribed
                  </>
                ) : (
                  <>
                    <span>Subscribe</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} Noor-e-Kashmir Heritage Atelier. All rights reserved. Handcrafted in Srinagar, Kashmir.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>GI Certified Authenticity</span>
            <span>100% Artisan Revenue Guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
