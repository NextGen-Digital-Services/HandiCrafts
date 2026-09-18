import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { PlusCircle, Search, Edit, Trash2, ExternalLink } from 'lucide-react'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { AdminSidebar } from '../../components/admin/AdminSidebar'
import { formatINR } from '../../utils/slugify'

export function ProductsList() {
  const [products, setProducts] = useLocalStorage('products', [])
  const [artisans] = useLocalStorage('artisans', [])
  const [searchQuery, setSearchQuery] = useState('')

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this product from the atelier catalogue?')) {
      setProducts(products.filter((p) => p.id !== id))
    }
  }

  const filteredProducts = (products || []).filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-main">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.25rem', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', color: 'var(--color-bordeaux-deep)' }}>
              Product Catalogue Management
            </h1>
            <p style={{ color: 'rgba(58, 42, 34, 0.7)', fontSize: '0.9rem' }}>
              Add and edit luxury Kashmiri products. Map each piece to its master artisan.
            </p>
          </div>

          <Link to="/admin/products/new" className="btn btn-primary" style={{ flex: '1 1 auto', maxWidth: 'max-content' }}>
            <PlusCircle size={16} /> Add New Product
          </Link>
        </div>

        {/* Search */}
        <div style={{ marginBottom: '2rem', maxWidth: '400px', width: '100%', position: 'relative' }}>
          <input
            type="text"
            placeholder="Search products by title or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '2.5rem' }}
          />
          <Search size={16} color="var(--color-brass)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
        </div>

        {/* Products Table */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-md)', padding: '1.25rem', border: '1px solid var(--color-brass-light)', boxShadow: 'var(--shadow-soft)' }}>
          <div className="table-responsive">
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem', minWidth: '600px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-ivory-deep)', color: 'var(--color-brass)' }}>
                  <th style={{ padding: '0.8rem' }}>Product</th>
                  <th style={{ padding: '0.8rem' }}>Category</th>
                  <th style={{ padding: '0.8rem' }}>Price</th>
                  <th style={{ padding: '0.8rem' }}>Linked Artisan</th>
                  <th style={{ padding: '0.8rem' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => {
                  const artisan = (artisans || []).find((a) => a.id === product.linkedArtisanId)
                  return (
                    <tr key={product.id} style={{ borderBottom: '1px solid var(--color-ivory-deep)' }}>
                      <td style={{ padding: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <img
                          src={product.image}
                          alt={product.title}
                          style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-sm)', objectFit: 'cover', flexShrink: 0 }}
                        />
                        <div>
                          <strong style={{ color: 'var(--color-bordeaux-deep)' }}>{product.title}</strong>
                          <div style={{ fontSize: '0.75rem', color: 'gray' }}>/product/{product.slug}</div>
                        </div>
                      </td>
                      <td style={{ padding: '0.8rem' }}>{product.category}</td>
                      <td style={{ padding: '0.8rem', fontWeight: '600', color: 'var(--color-bordeaux)' }}>
                        {formatINR(product.price)}
                      </td>
                      <td style={{ padding: '0.8rem' }}>
                        {artisan ? (
                          <span style={{ fontSize: '0.85rem', color: 'var(--color-walnut)' }}>{artisan.name}</span>
                        ) : (
                          <span style={{ fontSize: '0.8rem', color: 'gray' }}>Unlinked</span>
                        )}
                      </td>
                      <td style={{ padding: '0.8rem' }}>
                        <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                          <Link to={`/admin/products/edit/${product.id}`} style={{ color: 'var(--color-bordeaux)' }} title="Edit Product">
                            <Edit size={16} />
                          </Link>
                          <Link to={`/product/${product.slug}`} target="_blank" style={{ color: 'var(--color-brass)' }} title="View Public Detail Page">
                            <ExternalLink size={16} />
                          </Link>
                          <button onClick={() => handleDelete(product.id)} style={{ color: '#E57373', padding: '0.2rem' }} title="Delete Product">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
