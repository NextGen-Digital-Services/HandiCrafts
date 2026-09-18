import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, ShieldCheck, HeartHandshake, Award, QrCode } from 'lucide-react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { SectionHeading } from '../components/ui/SectionHeading'
import { StatCounter } from '../components/ui/StatCounter'
import { ProductCard } from '../components/shop/ProductCard'
import { ArtisanCard } from '../components/artisan/ArtisanCard'
import { Button } from '../components/ui/Button'
import { fadeUpVariant, staggerContainerVariant } from '../hooks/useScrollReveal'

export function Home() {
  const [artisans] = useLocalStorage('artisans', [])
  const [products] = useLocalStorage('products', [])

  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 3)
  const spotlightArtisan = artisans.length > 0 ? artisans[0] : null

  return (
    <div>
      {/* HERO SECTION */}
      <section style={{
        position: 'relative',
        minHeight: '88vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(180deg, rgba(61,15,28,0.7) 0%, rgba(61,15,28,0.85) 100%), url("https://images.unsplash.com/photo-1606744888344-49423b812d02?auto=format&fit=crop&q=80&w=2000")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'var(--color-ivory)',
        padding: '4rem 0'
      }}>
        <div className="container">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainerVariant}
            style={{ maxWidth: '820px' }}
          >
            <motion.span variants={fadeUpVariant} className="eyebrow eyebrow-light" style={{ marginBottom: '1rem' }}>
              Authentic Kashmiri Handicrafts Atelier
            </motion.span>
            
            <motion.h1 
              variants={fadeUpVariant}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.8rem, 5.5vw, 4.8rem)',
                fontWeight: '400',
                color: 'var(--color-ivory)',
                lineHeight: 1.1,
                marginBottom: '1.5rem'
              }}
            >
              Old-World Kashmiri Craftsmanship, <br />
              <span style={{ fontStyle: 'italic', color: 'var(--color-brass-light)' }}>Rendered with Atelier Precision.</span>
            </motion.h1>

            <motion.p 
              variants={fadeUpVariant}
              style={{
                fontSize: '1.15rem',
                lineHeight: '1.7',
                color: 'rgba(247, 241, 230, 0.85)',
                marginBottom: '2.5rem',
                maxWidth: '680px'
              }}
            >
              Every pure Pashmina shawl, hand-stitched Sozni embroidery, and carved walnut timber piece is individually tagged with a physical hang-tag QR linking directly to its master creator's story.
            </motion.p>

            <motion.div variants={fadeUpVariant} style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap' }}>
              <Link to="/collections" className="btn btn-lg btn-brass">
                <span>Explore Collections</span>
                <ArrowRight size={18} />
              </Link>
              <Link to="/our-story" className="btn btn-lg btn-outline-light">
                <span>Meet Our Artisans</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* STATS STRIP WITH ANIMATED COUNTER */}
      <section style={{ backgroundColor: 'var(--color-ivory-deep)', borderBottom: '1px solid rgba(184, 147, 95, 0.3)', padding: '2.5rem 0' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem'
          }}>
            <StatCounter value={650} suffix="+" label="Years of Kashmiri Heritage" icon={Award} />
            <StatCounter value={120} suffix=" hrs" label="Handwork Per Masterpiece" icon={Sparkles} />
            <StatCounter value={100} suffix="%" label="Pure Pashmina GI Certified" icon={ShieldCheck} />
            <StatCounter value={48} suffix="+" label="Master Guild Artisans" icon={HeartHandshake} />
          </div>
        </div>
      </section>

      {/* FEATURED MASTERPIECES */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Curated Atelier Selection"
            title="Featured Heirloom Pieces"
            subtitle="Each creation represents dozens of hours of hand weaving, needlework, or precision wood relief carving."
            centered
          />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem'
          }}>
            {featuredProducts.map((product) => {
              const artisan = artisans.find((a) => a.id === product.linkedArtisanId)
              return (
                <ProductCard key={product.id} product={product} artisan={artisan} />
              )
            })}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <Link to="/collections" className="btn btn-outline">
              <span>View Full Collection</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* THE CRAFT BEHIND EVERY PIECE (ARTISAN TEASER) */}
      <section className="section section-bordeaux">
        <div className="container">
          <SectionHeading
            eyebrow="Artisan Hang-Tag QR System"
            title="The Craft Behind Every Piece"
            subtitle="We believe luxury is incomplete without provenance. Scan the physical brass QR tag on your garment to land on the artist's personal page."
            centered
            light
          />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2.5rem',
            alignItems: 'center'
          }}>
            {artisans.slice(0, 3).map((artisan) => (
              <motion.div
                key={artisan.id}
                whileHover={{ y: -6 }}
                style={{
                  backgroundColor: 'var(--color-bordeaux-deep)',
                  borderRadius: 'var(--radius-md)',
                  padding: '2rem',
                  border: '1px solid var(--color-brass)',
                  color: 'var(--color-ivory)',
                  textAlign: 'center'
                }}
              >
                <img
                  src={artisan.portraitImage}
                  alt={artisan.name}
                  style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    margin: '0 auto 1.2rem',
                    border: '2px solid var(--color-brass-light)'
                  }}
                />
                <h3 style={{ fontSize: '1.3rem', color: 'var(--color-ivory)', marginBottom: '0.4rem' }}>
                  {artisan.name}
                </h3>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-brass-light)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
                  {artisan.craftTechnique}
                </div>
                <p style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: '0.95rem', color: 'rgba(247, 241, 230, 0.85)', marginBottom: '1.5rem' }}>
                  "{artisan.quote}"
                </p>
                <Link to={`/our-story/${artisan.slug}`} className="btn btn-sm btn-brass">
                  <span>Read Story & QR</span>
                  <QrCode size={14} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED ARTISAN SPOTLIGHT */}
      {spotlightArtisan && (
        <section className="section">
          <div className="container">
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '4rem',
              alignItems: 'center'
            }}>
              <div>
                <img
                  src={spotlightArtisan.coverImage}
                  alt={spotlightArtisan.name}
                  style={{
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-card)',
                    maxHeight: '480px',
                    width: '100%',
                    objectFit: 'cover',
                    border: '1px solid var(--color-brass)'
                  }}
                />
              </div>

              <div>
                <span className="eyebrow">Artisan Spotlight</span>
                <h2 style={{ fontSize: '2.5rem', color: 'var(--color-bordeaux-deep)', marginBottom: '1rem' }}>
                  {spotlightArtisan.name}
                </h2>
                <div style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--color-brass)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.2rem' }}>
                  {spotlightArtisan.craftTechnique} • {spotlightArtisan.location}
                </div>

                <blockquote style={{
                  fontFamily: 'var(--font-heading)',
                  fontStyle: 'italic',
                  fontSize: '1.2rem',
                  color: 'var(--color-bordeaux-deep)',
                  borderLeft: '3px solid var(--color-brass)',
                  paddingLeft: '1rem',
                  marginBottom: '1.5rem'
                }}>
                  "{spotlightArtisan.quote}"
                </blockquote>

                <p style={{ color: 'rgba(58, 42, 34, 0.85)', lineHeight: '1.7', marginBottom: '2rem' }}>
                  {spotlightArtisan.storyParagraphs ? spotlightArtisan.storyParagraphs[0] : ''}
                </p>

                <Link to={`/our-story/${spotlightArtisan.slug}`} className="btn btn-primary">
                  <span>Discover {spotlightArtisan.name}'s Story</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* HERITAGE PLEDGE STRIP */}
      <section className="section section-alt">
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2.5rem',
            textAlign: 'center'
          }}>
            <div style={{ padding: '1.5rem' }}>
              <ShieldCheck size={36} color="var(--color-bordeaux)" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>GI Authenticity Certified</h3>
              <p style={{ fontSize: '0.9rem', color: 'rgba(58, 42, 34, 0.75)' }}>
                Every textile features official Geographical Indication certification confirming raw Himalayan origin.
              </p>
            </div>

            <div style={{ padding: '1.5rem' }}>
              <HeartHandshake size={36} color="var(--color-bordeaux)" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Direct Artisan Compensation</h3>
              <p style={{ fontSize: '0.9rem', color: 'rgba(58, 42, 34, 0.75)' }}>
                Over 70% of retail value flows directly to the craftsman who spent weeks constructing your piece.
              </p>
            </div>

            <div style={{ padding: '1.5rem' }}>
              <QrCode size={36} color="var(--color-bordeaux)" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Hang-Tag Provenance QR</h3>
              <p style={{ fontSize: '0.9rem', color: 'rgba(58, 42, 34, 0.75)' }}>
                Scan the brass tag attached to your garment to immediately view your craftsman's video & bio.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
