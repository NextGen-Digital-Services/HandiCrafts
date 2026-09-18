import React, { useState } from 'react'
import { Search, Filter } from 'lucide-react'
import { ProductCard } from './ProductCard'

export function ProductGrid({ products, artisans, initialCategory = 'all' }) {
  const [activeCategory, setActiveCategory] = useState(initialCategory)
  const [searchQuery, setSearchQuery] = useState('')

  const categories = [
    { label: 'All Crafts', id: 'all' },
    { label: 'Pashmina Shawls', id: 'Pashmina Shawls' },
    { label: 'Sozni Embroidery', id: 'Sozni Embroidery' },
    { label: 'Kani Weaves', id: 'Kani Weaves' },
    { label: 'Paper Mache', id: 'Paper Mache' },
    { label: 'Walnut Wood Carving', id: 'Walnut Wood Carving' },
    { label: 'Namda & Crewel', id: 'Namda & Crewel' }
  ]

  const filteredProducts = products.filter((product) => {
    const matchesCategory = 
      activeCategory === 'all' || 
      product.category.toLowerCase() === activeCategory.toLowerCase() ||
      (activeCategory.includes('pashmina') && product.category.includes('Pashmina')) ||
      (activeCategory.includes('sozni') && product.category.includes('Sozni')) ||
      (activeCategory.includes('kani') && product.category.includes('Kani')) ||
      (activeCategory.includes('paper') && product.category.includes('Paper')) ||
      (activeCategory.includes('walnut') && product.category.includes('Walnut')) ||
      (activeCategory.includes('namda') && product.category.includes('Namda'))

    const matchesSearch = 
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesSearch
  })

  return (
    <div>
      {/* Search & Category Filter Toolbar */}
      <div style={{ marginBottom: '3rem' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          gap: '1.5rem', 
          flexWrap: 'wrap',
          marginBottom: '1.8rem'
        }}>
          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            {categories.map((cat) => {
              const isActive = activeCategory.toLowerCase() === cat.id.toLowerCase()
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    padding: '0.55rem 1.1rem',
                    fontSize: '0.85rem',
                    fontWeight: '500',
                    borderRadius: '50px',
                    transition: 'all 0.2s ease',
                    backgroundColor: isActive ? 'var(--color-bordeaux)' : '#FFFFFF',
                    color: isActive ? 'var(--color-ivory)' : 'var(--color-walnut)',
                    border: `1px solid ${isActive ? 'var(--color-bordeaux)' : 'rgba(184, 147, 95, 0.35)'}`,
                    cursor: 'pointer'
                  }}
                >
                  {cat.label}
                </button>
              )
            })}
          </div>

          {/* Search Box */}
          <div style={{ position: 'relative', width: '280px' }}>
            <input
              type="text"
              placeholder="Search by craft or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '2.5rem', borderRadius: '50px', fontSize: '0.85rem' }}
            />
            <Search size={16} color="var(--color-brass)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
          </div>
        </div>
      </div>

      {/* Grid */}
      {filteredProducts.length > 0 ? (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
          gap: '2rem' 
        }}>
          {filteredProducts.map((product) => {
            const artisan = artisans.find((a) => a.id === product.linkedArtisanId)
            return (
              <ProductCard 
                key={product.id} 
                product={product} 
                artisan={artisan} 
              />
            )
          })}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '4rem 1rem', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-md)', border: '1px dashed var(--color-brass)' }}>
          <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>No masterpieces found</h3>
          <p style={{ color: 'rgba(58, 42, 34, 0.7)', fontSize: '0.95rem' }}>
            Try selecting a different category or clearing your search term.
          </p>
        </div>
      )}
    </div>
  )
}
