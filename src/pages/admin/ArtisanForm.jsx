import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Save, Sparkles, QrCode, Plus, Trash2 } from 'lucide-react'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { slugify } from '../../utils/slugify'
import { AdminSidebar } from '../../components/admin/AdminSidebar'
import { Button } from '../../components/ui/Button'
import { QRCard } from '../../components/artisan/QRCard'

export function ArtisanForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = Boolean(id)

  const [artisans, setArtisans] = useLocalStorage('artisans', [])
  const [products] = useLocalStorage('products', [])

  const [formData, setFormData] = useState({
    name: '',
    craftTechnique: '',
    location: '',
    hoursTaken: 80,
    linkedProductId: '',
    quote: '',
    coverImage: 'https://images.unsplash.com/photo-1606744888344-49423b812d02?auto=format&fit=crop&q=80&w=1600',
    portraitImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800',
    storyText: '',
    processGallery: [
      'https://images.unsplash.com/photo-1606744888344-49423b812d02?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&q=80&w=800'
    ]
  })

  const [slug, setSlug] = useState('')

  useEffect(() => {
    if (isEditing) {
      const existing = artisans.find((a) => a.id === id)
      if (existing) {
        setFormData({
          name: existing.name || '',
          craftTechnique: existing.craftTechnique || '',
          location: existing.location || '',
          hoursTaken: existing.hoursTaken || 80,
          linkedProductId: existing.linkedProductId || '',
          quote: existing.quote || '',
          coverImage: existing.coverImage || '',
          portraitImage: existing.portraitImage || '',
          storyText: existing.storyParagraphs ? existing.storyParagraphs.join('\n\n') : '',
          processGallery: existing.processGallery || []
        })
        setSlug(existing.slug || slugify(existing.name))
      }
    }
  }, [id, isEditing])

  const handleNameChange = (e) => {
    const nameVal = e.target.value
    setFormData({ ...formData, name: nameVal })
    if (!isEditing || !slug) {
      setSlug(slugify(nameVal))
    }
  }

  const handleGalleryChange = (index, value) => {
    const updated = [...formData.processGallery]
    updated[index] = value
    setFormData({ ...formData, processGallery: updated })
  }

  const addGalleryField = () => {
    if (formData.processGallery.length < 6) {
      setFormData({
        ...formData,
        processGallery: [...formData.processGallery, '']
      })
    }
  }

  const removeGalleryField = (index) => {
    const updated = formData.processGallery.filter((_, i) => i !== index)
    setFormData({ ...formData, processGallery: updated })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    let computedSlug = slugify(formData.name) || 'artisan'
    // Ensure slug uniqueness among other artisans
    let suffix = 1
    let uniqueSlug = computedSlug
    while (artisans.some((a) => a.slug === uniqueSlug && a.id !== id)) {
      suffix++
      uniqueSlug = `${computedSlug}-${suffix}`
    }

    const storyParagraphs = formData.storyText
      .split('\n\n')
      .map((p) => p.trim())
      .filter(Boolean)

    const artisanPayload = {
      id: isEditing ? id : `art-${Date.now()}`,
      slug: uniqueSlug,
      name: formData.name,
      craftTechnique: formData.craftTechnique,
      location: formData.location,
      hoursTaken: Number(formData.hoursTaken),
      linkedProductId: formData.linkedProductId,
      quote: formData.quote,
      coverImage: formData.coverImage,
      portraitImage: formData.portraitImage,
      storyParagraphs,
      processGallery: formData.processGallery.filter(Boolean),
      createdAt: isEditing ? (artisans.find((a) => a.id === id)?.createdAt || new Date().toISOString()) : new Date().toISOString()
    }

    if (isEditing) {
      setArtisans(artisans.map((a) => (a.id === id ? artisanPayload : a)))
    } else {
      setArtisans([artisanPayload, ...artisans])
    }

    navigate('/admin/artisans')
  }

  const liveSlug = slugify(formData.name) || 'artisan-name'

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-ivory)' }}>
      <AdminSidebar />

      <main style={{ flex: 1, padding: '2.5rem' }}>
        <Link 
          to="/admin/artisans" 
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.4rem', 
            color: 'var(--color-brass)', 
            fontSize: '0.85rem', 
            fontWeight: '600', 
            marginBottom: '1.5rem' 
          }}
        >
          <ArrowLeft size={16} /> Back to Artisans
        </Link>

        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', color: 'var(--color-bordeaux-deep)', marginBottom: '0.5rem' }}>
          {isEditing ? `Edit Artisan: ${formData.name}` : 'Add Master Artisan Profile'}
        </h1>
        <p style={{ color: 'rgba(58, 42, 34, 0.7)', fontSize: '0.9rem', marginBottom: '2.5rem' }}>
          Fill in the story details to auto-generate the live physical hang-tag QR code.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '3.5rem', alignItems: 'start' }}>
          {/* Form Column */}
          <form onSubmit={handleSubmit} style={{ backgroundColor: '#FFFFFF', padding: '2.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-brass-light)', boxShadow: 'var(--shadow-card)' }}>
            <div className="form-group">
              <label className="form-label">Artisan Full Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={handleNameChange}
                className="form-input"
                placeholder="e.g. Master Ghulam Hassan Mir"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div className="form-group">
                <label className="form-label">Craft / Technique *</label>
                <input
                  type="text"
                  required
                  value={formData.craftTechnique}
                  onChange={(e) => setFormData({ ...formData, craftTechnique: e.target.value })}
                  className="form-input"
                  placeholder="e.g. Sozni Embroidery (Fine Needlework)"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Location / Atelier *</label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="form-input"
                  placeholder="e.g. Downtown Srinagar, Old City"
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div className="form-group">
                <label className="form-label">Hours Taken Per Piece *</label>
                <input
                  type="number"
                  required
                  min={1}
                  max={500}
                  value={formData.hoursTaken}
                  onChange={(e) => setFormData({ ...formData, hoursTaken: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Linked Flagship Product (Optional)</label>
                <select
                  value={formData.linkedProductId}
                  onChange={(e) => setFormData({ ...formData, linkedProductId: e.target.value })}
                  className="form-select"
                >
                  <option value="">-- Select Linked Product --</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>{p.title}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Artisan Pull-Quote *</label>
              <input
                type="text"
                required
                value={formData.quote}
                onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                className="form-input"
                placeholder='e.g. "With every single needle stitch, I breathe life into centuries of Kashmiri soul."'
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div className="form-group">
                <label className="form-label">Cover Image URL *</label>
                <input
                  type="url"
                  required
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Portrait Image URL *</label>
                <input
                  type="url"
                  required
                  value={formData.portraitImage}
                  onChange={(e) => setFormData({ ...formData, portraitImage: e.target.value })}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Story Narrative (Paragraphs separated by blank line) *</label>
              <textarea
                rows={6}
                required
                value={formData.storyText}
                onChange={(e) => setFormData({ ...formData, storyText: e.target.value })}
                className="form-textarea"
                placeholder="Paragraph 1...\n\nParagraph 2..."
              />
            </div>

            {/* Process Gallery Fields */}
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                <label className="form-label" style={{ marginBottom: 0 }}>Process Gallery Image URLs (Up to 6)</label>
                {formData.processGallery.length < 6 && (
                  <button type="button" onClick={addGalleryField} style={{ fontSize: '0.8rem', color: 'var(--color-bordeaux)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    <Plus size={14} /> Add Image URL
                  </button>
                )}
              </div>
              {formData.processGallery.map((url, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => handleGalleryChange(idx, e.target.value)}
                    className="form-input"
                    placeholder={`Process photo URL ${idx + 1}`}
                  />
                  <button type="button" onClick={() => removeGalleryField(idx)} style={{ color: '#E57373', padding: '0 0.5rem' }}>
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            <Button type="submit" variant="primary" size="lg" icon={Save} style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}>
              {isEditing ? 'Update Artisan & QR Mapping' : 'Save Artisan & Generate Hang-Tag QR'}
            </Button>
          </form>

          {/* Live QR Preview Column */}
          <div style={{ position: 'sticky', top: '100px' }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--color-bordeaux-deep)', marginBottom: '1rem', textAlign: 'center' }}>
              Live Hang-Tag QR Code
            </h3>
            <QRCard
              artisanSlug={liveSlug}
              artisanName={formData.name || 'Master Artisan'}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
