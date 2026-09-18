import React from 'react'
import { useParams } from 'react-router-dom'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { SectionHeading } from '../components/ui/SectionHeading'
import { ProductGrid } from '../components/shop/ProductGrid'

export function Collections() {
  const { category } = useParams()
  const [products] = useLocalStorage('products', [])
  const [artisans] = useLocalStorage('artisans', [])

  const initialCat = category ? category.replace(/-/g, ' ') : 'all'

  return (
    <div className="section" style={{ minHeight: '80vh' }}>
      <div className="container">
        <SectionHeading
          eyebrow="Heirloom Atelier Catalogue"
          title="Kashmiri Masterpiece Collections"
          subtitle="Explore our curated collection of hand-woven Pashmina shawls, fine needlework Sozni embroidery, 24K gold paper mache, and relief-carved walnut wood."
          centered
        />

        <ProductGrid
          products={products}
          artisans={artisans}
          initialCategory={initialCat}
        />
      </div>
    </div>
  )
}
