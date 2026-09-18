import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { PlusCircle, Search, Edit, Trash2, ExternalLink, QrCode } from 'lucide-react'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { AdminSidebar } from '../../components/admin/AdminSidebar'

export function ArtisansList() {
  const [artisans, setArtisans] = useLocalStorage('artisans', [])
  const [searchQuery, setSearchQuery] = useState('')

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this artisan profile and its QR tag mapping?')) {
      setArtisans(artisans.filter((a) => a.id !== id))
    }
  }

  const filteredArtisans = artisans.filter((a) => 
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.craftTechnique.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.location.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-ivory)' }}>
      <AdminSidebar />

      <main style={{ flex: 1, padding: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', color: 'var(--color-bordeaux-deep)' }}>
              Master Artisans & Hang-Tag QRs
            </h1>
            <p style={{ color: 'rgba(58, 42, 34, 0.7)', fontSize: '0.9rem' }}>
              Create and maintain individual artisan profiles. Each entry generates a downloadable QR code.
            </p>
          </div>

          <Link to="/admin/artisans/new" className="btn btn-brass">
            <PlusCircle size={16} /> Add New Artisan (Gen QR)
          </Link>
        </div>

        {/* Search */}
        <div style={{ marginBottom: '2rem', maxWidth: '400px', position: 'relative' }}>
          <input
            type="text"
            placeholder="Search artisans by name, technique, location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '2.5rem' }}
          />
          <Search size={16} color="var(--color-brass)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
        </div>

        {/* Artisans Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
          {filteredArtisans.map((artisan) => (
            <div
              key={artisan.id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                padding: '1.8rem',
                border: '1px solid var(--color-brass-light)',
                boxShadow: 'var(--shadow-soft)',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.2rem' }}>
                  <img
                    src={artisan.portraitImage || artisan.coverImage}
                    alt={artisan.name}
                    style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--color-brass)' }}
                  />
                  <div>
                    <h3 style={{ fontSize: '1.2rem', color: 'var(--color-bordeaux-deep)' }}>{artisan.name}</h3>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-brass)', fontWeight: '600', textTransform: 'uppercase' }}>
                      {artisan.craftTechnique}
                    </div>
                  </div>
                </div>

                <p style={{ fontSize: '0.85rem', fontStyle: 'italic', color: 'rgba(58, 42, 34, 0.8)', marginBottom: '1.2rem', borderLeft: '2px solid var(--color-brass)', paddingLeft: '0.6rem' }}>
                  "{artisan.quote}"
                </p>

                <div style={{ fontSize: '0.8rem', color: 'gray', marginBottom: '1.5rem' }}>
                  <div><strong>Location:</strong> {artisan.location}</div>
                  <div><strong>Hours Taken:</strong> {artisan.hoursTaken} Hand Hours</div>
                  <div><strong>Story Slug:</strong> <code>{artisan.slug}</code></div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--color-ivory-deep)' }}>
                <Link to={`/admin/artisans/edit/${artisan.id}`} className="btn btn-sm btn-outline" style={{ gap: '0.4rem' }}>
                  <Edit size={14} /> Edit & QR
                </Link>

                <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                  <Link to={`/our-story/${artisan.slug}`} target="_blank" title="View Public Story QR Page" style={{ color: 'var(--color-brass)' }}>
                    <ExternalLink size={18} />
                  </Link>
                  <button onClick={() => handleDelete(artisan.id)} style={{ color: '#E57373' }} title="Delete Artisan">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
