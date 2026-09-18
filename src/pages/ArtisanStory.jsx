import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { ArtisanStoryLayout } from '../components/artisan/ArtisanStoryLayout'

export function ArtisanStory() {
  const { artisanSlug } = useParams()
  const [artisans] = useLocalStorage('artisans', [])
  const [products] = useLocalStorage('products', [])

  const artisan = artisans.find((a) => a.slug === artisanSlug)
  const linkedProduct = artisan ? products.find((p) => p.id === artisan.linkedProductId) : null

  if (!artisan) {
    return (
      <div className="section" style={{ textAlign: 'center', padding: '6rem 1rem' }}>
        <div className="container">
          <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>Artisan Story Not Found</h2>
          <p style={{ color: 'rgba(58, 42, 34, 0.7)', marginBottom: '2rem' }}>
            The artisan profile linked to this QR code tag could not be located or may have been updated.
          </p>
          <Link to="/our-story" className="btn btn-primary">
            <ArrowLeft size={16} /> Explore All Artisans
          </Link>
        </div>
      </div>
    )
  }

  return (
    <ArtisanStoryLayout
      artisan={artisan}
      linkedProduct={linkedProduct}
    />
  )
}
