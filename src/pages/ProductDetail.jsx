import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Sparkles, QrCode, CheckCircle } from 'lucide-react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { formatINR } from '../utils/slugify'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'

export function ProductDetail() {
  const { slug } = useParams()
  const [products] = useLocalStorage('products', [])
  const [artisans] = useLocalStorage('artisans', [])

  const product = (products || []).find((p) => p.slug === slug)
  const artisan = product ? (artisans || []).find((a) => a.id === product.linkedArtisanId) : null

  const [activeImage, setActiveImage] = useState(() => {
    return product ? product.image : ''
  })
  const [addedToCart, setAddedToCart] = useState(false)

  if (!product) {
    return (
      <div className="section" style={{ textAlign: 'center', padding: '6rem 1rem' }}>
        <div className="container">
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Piece Not Found</h2>
          <p style={{ color: 'rgba(58, 42, 34, 0.7)', marginBottom: '2rem' }}>
            The requested Kashmir handicraft masterpiece could not be located in our atelier catalogue.
          </p>
          <Link to="/collections" className="btn btn-primary">
            <ArrowLeft size={16} /> Back to Collections
          </Link>
        </div>
      </div>
    )
  }

  const images = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image]

  const handleAddToCart = () => {
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 4000)
  }

  return (
    <div className="section">
      <div className="container">
        {/* Back Link */}
        <Link 
          to="/collections" 
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.4rem', 
            color: 'var(--color-brass)', 
            fontSize: '0.85rem', 
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '1.5rem'
          }}
        >
          <ArrowLeft size={16} /> Back to Collections
        </Link>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem', alignItems: 'start' }}>
          {/* Gallery Column */}
          <div>
            <div style={{
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              border: '1px solid var(--color-brass)',
              marginBottom: '1rem',
              backgroundColor: '#FFFFFF',
              boxShadow: 'var(--shadow-card)'
            }}>
              <img
                src={activeImage || product.image}
                alt={product.title}
                style={{ width: '100%', height: 'clamp(300px, 45vh, 520px)', objectFit: 'cover' }}
              />
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div style={{ display: 'flex', gap: '0.6rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(img)}
                    style={{
                      width: '70px',
                      height: '70px',
                      borderRadius: 'var(--radius-sm)',
                      overflow: 'hidden',
                      flexShrink: 0,
                      border: `2px solid ${activeImage === img ? 'var(--color-bordeaux)' : 'transparent'}`,
                      opacity: activeImage === img ? 1 : 0.7,
                      cursor: 'pointer'
                    }}
                  >
                    <img src={img} alt="Thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Column */}
          <div>
            <div style={{ marginBottom: '0.6rem' }}>
              <Badge variant="brass">{product.category}</Badge>
            </div>

            <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', color: 'var(--color-bordeaux-deep)', marginBottom: '0.8rem', lineHeight: '1.2' }}>
              {product.title}
            </h1>

            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', color: 'var(--color-bordeaux)', fontWeight: '600', marginBottom: '1.25rem' }}>
              {formatINR(product.price)}
            </div>

            <p style={{ fontSize: '1rem', lineHeight: '1.7', color: 'var(--color-walnut)', marginBottom: '1.5rem' }}>
              {product.description}
            </p>

            {/* Specifications */}
            {product.details && product.details.length > 0 && (
              <div style={{ backgroundColor: 'var(--color-ivory-deep)', padding: '1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', borderLeft: '3px solid var(--color-brass)' }}>
                <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-brass)', marginBottom: '0.6rem' }}>
                  Atelier Specifications
                </h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {product.details.map((detail, idx) => (
                    <li key={idx} style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: 'var(--color-brass)' }}>•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Care Instructions */}
            {product.careInstructions && (
              <div style={{ marginBottom: '1.5rem', fontSize: '0.85rem', color: 'rgba(58, 42, 34, 0.8)' }}>
                <strong>Care & Storage:</strong> {product.careInstructions}
              </div>
            )}

            {/* Actions */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2.5rem' }}>
              <Button 
                variant="primary" 
                size="lg"
                onClick={handleAddToCart}
                style={{ flex: 1, justifyContent: 'center' }}
              >
                {addedToCart ? (
                  <>
                    <CheckCircle size={18} /> Reserved in Private Cart
                  </>
                ) : (
                  <>
                    <Sparkles size={18} /> Reserve This Piece
                  </>
                )}
              </Button>
            </div>

            {/* CROSS-LINKED ARTISAN CARD */}
            {artisan && (
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                padding: '1.5rem',
                border: '2px solid var(--color-brass)',
                boxShadow: 'var(--shadow-card)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-brass)', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.8rem' }}>
                  <QrCode size={16} />
                  <span>Physical Hang-Tag QR Artisan</span>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  <img
                    src={artisan.portraitImage}
                    alt={artisan.name}
                    style={{ width: '70px', height: '70px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--color-brass)', flexShrink: 0 }}
                  />
                  <div>
                    <h4 style={{ fontSize: '1.1rem', color: 'var(--color-bordeaux-deep)' }}>{artisan.name}</h4>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-brass)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0.2rem 0' }}>
                      {artisan.craftTechnique}
                    </div>
                    <p style={{ fontSize: '0.85rem', fontStyle: 'italic', color: 'rgba(58, 42, 34, 0.8)', marginBottom: '0.6rem' }}>
                      "{artisan.quote.substring(0, 65)}..."
                    </p>
                    <Link to={`/our-story/${artisan.slug}`} className="btn btn-sm btn-brass">
                      <span>View Artist Story & Hang-Tag QR →</span>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
