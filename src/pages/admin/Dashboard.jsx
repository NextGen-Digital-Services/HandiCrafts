import React from 'react'
import { Link } from 'react-router-dom'
import { Users, ShoppingBag, QrCode, PlusCircle, ExternalLink, Trash2, Edit } from 'lucide-react'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { AdminSidebar } from '../../components/admin/AdminSidebar'
import { Button } from '../../components/ui/Button'
import { formatINR } from '../../utils/slugify'

export function Dashboard() {
  const [artisans] = useLocalStorage('artisans', [])
  const [products] = useLocalStorage('products', [])

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-ivory)' }}>
      <AdminSidebar />

      <main style={{ flex: 1, padding: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', color: 'var(--color-bordeaux-deep)' }}>
              Atelier Overview & QR Hub
            </h1>
            <p style={{ color: 'rgba(58, 42, 34, 0.7)', fontSize: '0.9rem' }}>
              Manage master artisans, physical hang-tag QR generation, and luxury collections.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/admin/artisans/new" className="btn btn-brass">
              <PlusCircle size={16} /> Add Artisan (Gen QR)
            </Link>
            <Link to="/admin/products/new" className="btn btn-primary">
              <PlusCircle size={16} /> Add Product
            </Link>
          </div>
        </div>

        {/* METRIC SUMMARY CARDS */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-md)',
            padding: '1.8rem',
            border: '1px solid var(--color-brass-light)',
            boxShadow: 'var(--shadow-soft)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: '600', textTransform: 'uppercase', color: 'var(--color-brass)', letterSpacing: '0.1em' }}>Total Artisans</span>
              <Users size={22} color="var(--color-bordeaux)" />
            </div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.4rem', fontWeight: '600', color: 'var(--color-bordeaux-deep)' }}>
              {artisans.length}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(58, 42, 34, 0.6)', marginTop: '0.4rem' }}>
              Each with live story QR page
            </div>
          </div>

          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-md)',
            padding: '1.8rem',
            border: '1px solid var(--color-brass-light)',
            boxShadow: 'var(--shadow-soft)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: '600', textTransform: 'uppercase', color: 'var(--color-brass)', letterSpacing: '0.1em' }}>Catalogue Products</span>
              <ShoppingBag size={22} color="var(--color-bordeaux)" />
            </div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.4rem', fontWeight: '600', color: 'var(--color-bordeaux-deep)' }}>
              {products.length}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(58, 42, 34, 0.6)', marginTop: '0.4rem' }}>
              Cross-linked to artisan profiles
            </div>
          </div>

          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-md)',
            padding: '1.8rem',
            border: '1px solid var(--color-brass-light)',
            boxShadow: 'var(--shadow-soft)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: '600', textTransform: 'uppercase', color: 'var(--color-brass)', letterSpacing: '0.1em' }}>Active Hang-Tag QRs</span>
              <QrCode size={22} color="var(--color-brass)" />
            </div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.4rem', fontWeight: '600', color: 'var(--color-bordeaux-deep)' }}>
              {artisans.length}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(58, 42, 34, 0.6)', marginTop: '0.4rem' }}>
              Ready for high-res PNG download
            </div>
          </div>
        </div>

        {/* RECENT ARTISANS TABLE */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-md)',
          padding: '2rem',
          border: '1px solid var(--color-brass-light)',
          marginBottom: '3rem',
          boxShadow: 'var(--shadow-soft)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--color-bordeaux-deep)' }}>Registered Master Artisans</h3>
            <Link to="/admin/artisans" style={{ fontSize: '0.85rem', color: 'var(--color-bordeaux)', fontWeight: '600' }}>
              View All Artisans →
            </Link>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-ivory-deep)', color: 'var(--color-brass)' }}>
                  <th style={{ padding: '0.8rem' }}>Artisan</th>
                  <th style={{ padding: '0.8rem' }}>Craft Technique</th>
                  <th style={{ padding: '0.8rem' }}>Location</th>
                  <th style={{ padding: '0.8rem' }}>Hand Hours</th>
                  <th style={{ padding: '0.8rem' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {artisans.slice(0, 5).map((artisan) => (
                  <tr key={artisan.id} style={{ borderBottom: '1px solid var(--color-ivory-deep)' }}>
                    <td style={{ padding: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                      <img
                        src={artisan.portraitImage || artisan.coverImage}
                        alt={artisan.name}
                        style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <div>
                        <strong style={{ color: 'var(--color-bordeaux-deep)' }}>{artisan.name}</strong>
                        <div style={{ fontSize: '0.75rem', color: 'gray' }}>/our-story/{artisan.slug}</div>
                      </div>
                    </td>
                    <td style={{ padding: '0.8rem' }}>{artisan.craftTechnique}</td>
                    <td style={{ padding: '0.8rem' }}>{artisan.location}</td>
                    <td style={{ padding: '0.8rem' }}>{artisan.hoursTaken} hrs</td>
                    <td style={{ padding: '0.8rem' }}>
                      <div style={{ display: 'flex', gap: '0.6rem' }}>
                        <Link to={`/admin/artisans/edit/${artisan.id}`} style={{ color: 'var(--color-bordeaux)' }} title="Edit Artisan / QR">
                          <Edit size={16} />
                        </Link>
                        <Link to={`/our-story/${artisan.slug}`} target="_blank" style={{ color: 'var(--color-brass)' }} title="View Public Story QR Page">
                          <ExternalLink size={16} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
