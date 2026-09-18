import React from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { SectionHeading } from '../components/ui/SectionHeading'
import { ArtisanCard } from '../components/artisan/ArtisanCard'

export function OurStory() {
  const [artisans] = useLocalStorage('artisans', [])

  return (
    <div className="section">
      <div className="container">
        <SectionHeading
          eyebrow="The Kashmiri Guild"
          title="Master Artisan Hub & Provenance"
          subtitle="Behind every hand-knotted fringe and needlework stitch is an individual artist keeping six centuries of Himalayan culture alive. Every profile below auto-generates a QR printed on our physical product hang-tags."
          centered
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {artisans.map((artisan, index) => {
            // Rhythmic alternating layout: even index = large featured card, odd = compact layout
            const isFeatured = index % 2 === 0
            return (
              <ArtisanCard
                key={artisan.id}
                artisan={artisan}
                isFeatured={isFeatured}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
