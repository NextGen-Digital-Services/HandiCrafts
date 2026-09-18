import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Save } from 'lucide-react'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { slugify } from '../../utils/slugify'
import { AdminSidebar } from '../../components/admin/AdminSidebar'
import { Button } from '../../components/ui/Button'

export function ProductForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = Boolean(id)

  const [products, setProducts] = useLocalStorage('products', [])
  const [artisans] = useLocalStorage('artisans', [])

  const categories = [
    'Pashmina Shawls',
    'Sozni Embroidery',
    'Kani Weaves',
    'Paper Mache',
    'Walnut Wood Carving',
    'Namda & Crewel'
  ]

  const [formData, setFormData] = useState({
    title: '',
    category: 'Pashmina Shawls',
    price: 45000,
    description: '',
    detailsText: '',
    careInstructions: 'Dry clean only. Store wrapped in breathable muslin cloth.',
    image: 'https://images.unsplash.com/photo-1606744888344-49423b812d02?auto=format&fit=crop&q=80&w=1000',
    linkedArtisanId: '',
    isFeatured: false
  })

  useEffect(() => {
    if (isEditing) {
      const existing = products.find((p) => p.id === id)
      if (existing) {
        setFormData({
          title: existing.title || '',
          category: existing.category || 'Pashmina Shawls',
          price: existing.price || 45000,
          description: existing.description || '',
          detailsText: existing.details ? existing.details.join('\n') : '',
          careInstructions: existing.careInstructions || '',
          image: existing.image || '',
          linkedArtisanId: existing.linkedArtisanId || '',
          isFeatured: Boolean(existing.isFeatured)
        })
      }
    }
  }, [id, isEditing])

  const handleSubmit = (e) => {
    e.preventDefault()

    let computedSlug = slugify(formData.title) || 'product'
    let suffix = 1
    let uniqueSlug = computedSlug
    while (products.some((p) => p.slug === uniqueSlug && p.id !== id)) {
      suffix++
      uniqueSlug = `${computedSlug}-${suffix}`
    }

    const details = formData.detailsText
      .split('\n')
      .map((d) => d.trim())
      .filter(Boolean)

    const productPayload = {
      id: isEditing ? id : `prod-${Date.now()}`,
      slug: uniqueSlug,
      title: formData.title,
      category: formData.category,
      price: Number(formData.price),
      description: formData.description,
      details,
      careInstructions: formData.careInstructions,
      image: formData.image,
      gallery: [formData.image],
      linkedArtisanId: formData.linkedArtisanId,
      isFeatured: formData.isFeatured,
      createdAt: isEditing ? (products.find((p) => p.id === id)?.createdAt || new Date().toISOString()) : new Date().toISOString()
    }

    if (isEditing) {
      setProducts(products.map((p) => (p.id === id ? productPayload : p)))
    } else {
      setProducts([productPayload, ...products])
    }

    navigate('/admin/products')
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-ivory)' }}>
      <AdminSidebar />

      <main style={{ flex: 1, padding: '2.5rem' }}>
        <Link 
          to="/admin/products" 
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
          <ArrowLeft size={16} /> Back to Products
        </Link>

        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', color: 'var(--color-bordeaux-deep)', marginBottom: '0.5rem' }}>
          {isEditing ? `Edit Product: ${formData.title}` : 'Add New Kashmiri Masterpiece'}
        </h1>
        <p style={{ color: 'rgba(58, 42, 34, 0.7)', fontSize: '0.9rem', marginBottom: '2.5rem' }}>
          Enter product specification and cross-link it to a master artisan profile.
        </p>

        <form onSubmit={handleSubmit} style={{ backgroundColor: '#FFFFFF', padding: '2.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-brass-light)', boxShadow: 'var(--shadow-card)', maxWidth: '800px' }}>
          <div className="form-group">
            <label className="form-label">Product Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="form-input"
              placeholder="e.g. Royal Bordeaux Sozni Needlework Pashmina"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="form-group">
              <label className="form-label">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="form-select"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Price (INR) *</label>
              <input
                type="number"
                required
                min={100}
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Linked Master Artisan (Optional)</label>
            <select
              value={formData.linkedArtisanId}
              onChange={(e) => setFormData({ ...formData, linkedArtisanId: e.target.value })}
              className="form-select"
            >
              <option value="">-- No Linked Artisan --</option>
              {artisans.map((a) => (
                <option key={a.id} value={a.id}>{a.name} ({a.craftTechnique})</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Main Image URL *</label>
            <input
              type="url"
              required
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description *</label>
            <textarea
              rows={4}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="form-textarea"
              placeholder="Product overview and heritage backstory..."
            />
          </div>

          <div className="form-group">
            <label className="form-label">Details / Specifications (One per line)</label>
            <textarea
              rows={4}
              value={formData.detailsText}
              onChange={(e) => setFormData({ ...formData, detailsText: e.target.value })}
              className="form-textarea"
              placeholder="100% Pure Hand-Spun Pashmina\nDimensions: 100cm x 200cm\nGI Certified..."
            />
          </div>

          <div className="form-group">
            <label className="form-label">Care Instructions</label>
            <input
              type="text"
              value={formData.careInstructions}
              onChange={(e) => setFormData({ ...formData, careInstructions: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <input
              type="checkbox"
              id="isFeatured"
              checked={formData.isFeatured}
              onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
              style={{ width: '18px', height: '18px' }}
            />
            <label htmlFor="isFeatured" className="form-label" style={{ marginBottom: 0, cursor: 'pointer' }}>
              Feature this piece on Home Page spotlight
            </label>
          </div>

          <Button type="submit" variant="primary" size="lg" icon={Save} style={{ width: '100%', justifyContent: 'center', marginTop: '1.5rem' }}>
            {isEditing ? 'Update Catalogue Product' : 'Save New Masterpiece Product'}
          </Button>
        </form>
      </main>
    </div>
  )
}
