import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Clock, Hammer, ShoppingBag, ArrowLeft, ArrowRight, Award, Sparkles } from 'lucide-react'
import { formatINR } from '../../utils/slugify'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import { QRCard } from './QRCard'

export function ArtisanStoryLayout({ artisan, linkedProduct }) {
  if (!artisan) return null

  return (
    <article style={{ backgroundColor: 'var(--color-ivory)', minHeight: '100vh', paddingBottom: '6rem' }}>
      {/* 1. Full-bleed cover image with name overlay */}
      <section style={{ position: 'relative', height: '70vh', minHeight: '480px', width: '100%', overflow: 'hidden' }}>
        <img
          src={artisan.coverImage || artisan.portraitImage}
          alt={artisan.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(61,15,28,0.2) 0%, rgba(61,15,28,0.85) 100%)',
          display: 'flex',
          alignItems: 'flex-end',
          paddingBottom: '4rem'
        }}>
          <div className="container">
            <Link 
              to="/our-story" 
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.4rem', 
                color: 'var(--color-brass-light)', 
                fontSize: '0.85rem', 
                fontWeight: '600', 
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '1.2rem'
              }}
            >
              <ArrowLeft size={16} /> Back to Artisan Hub
            </Link>

            <div style={{ marginBottom: '0.5rem' }}>
              <Badge variant="brass">{artisan.craftTechnique}</Badge>
            </div>

            <h1 style={{
              fontFamily: 'var(--font-heading)',
              fontStyle: 'italic',
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              color: 'var(--color-ivory)',
              lineHeight: 1.1,
              maxWidth: '900px'
            }}>
              {artisan.name}
            </h1>
          </div>
        </div>
      </section>

      {/* 2. Stats Row (Icon + Label + Value) */}
      <section style={{ backgroundColor: 'var(--color-bordeaux-deep)', color: 'var(--color-ivory)', padding: '2.5rem 0', borderBottom: '2px solid var(--color-brass)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2rem',
            textAlign: 'center'
          }}>
            <div style={{ borderRight: '1px solid rgba(184, 147, 95, 0.3)', padding: '0.5rem' }}>
              <Hammer size={24} color="var(--color-brass-light)" style={{ marginBottom: '0.5rem' }} />
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-brass-light)' }}>Craft Technique</div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', marginTop: '0.2rem' }}>{artisan.craftTechnique}</div>
            </div>

            <div style={{ borderRight: '1px solid rgba(184, 147, 95, 0.3)', padding: '0.5rem' }}>
              <Clock size={24} color="var(--color-brass-light)" style={{ marginBottom: '0.5rem' }} />
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-brass-light)' }}>Hours Per Piece</div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', marginTop: '0.2rem' }}>{artisan.hoursTaken} Hand Hours</div>
            </div>

            <div style={{ borderRight: '1px solid rgba(184, 147, 95, 0.3)', padding: '0.5rem' }}>
              <MapPin size={24} color="var(--color-brass-light)" style={{ marginBottom: '0.5rem' }} />
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-brass-light)' }}>Atelier Location</div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', marginTop: '0.2rem' }}>{artisan.location}</div>
            </div>

            <div style={{ padding: '0.5rem' }}>
              <Award size={24} color="var(--color-brass-light)" style={{ marginBottom: '0.5rem' }} />
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-brass-light)' }}>Master Status</div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', marginTop: '0.2rem' }}>GI Guild Certified</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Pull-quote & Story Column */}
      <section className="section">
        <div className="container" style={{ maxWidth: '840px' }}>
          {/* Pull-quote */}
          <blockquote style={{
            fontFamily: 'var(--font-heading)',
            fontStyle: 'italic',
            fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)',
            color: 'var(--color-bordeaux-deep)',
            textAlign: 'center',
            lineHeight: '1.4',
            margin: '0 0 3.5rem 0',
            position: 'relative',
            padding: '2rem 1.5rem',
            borderTop: '1px solid var(--color-brass)',
            borderBottom: '1px solid var(--color-brass)'
          }}>
            "{artisan.quote}"
          </blockquote>

          {/* Portrait + Narrative */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2.5rem', marginBottom: '4rem' }}>
            {artisan.portraitImage && (
              <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <img
                  src={artisan.portraitImage}
                  alt={artisan.name}
                  style={{
                    width: '240px',
                    height: '240px',
                    objectFit: 'cover',
                    borderRadius: '50%',
                    border: '4px solid var(--color-brass)',
                    margin: '0 auto',
                    boxShadow: 'var(--shadow-card)'
                  }}
                />
                <div style={{ marginTop: '0.8rem', fontSize: '0.85rem', fontStyle: 'italic', color: 'var(--color-walnut)' }}>
                  {artisan.name} at work in {artisan.location}
                </div>
              </div>
            )}

            <div style={{ fontSize: '1.1rem', lineHeight: '1.85', color: 'var(--color-walnut)' }}>
              {artisan.storyParagraphs && artisan.storyParagraphs.map((paragraph, idx) => (
                <p key={idx} style={{ marginBottom: '1.6rem' }}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Asymmetric Process Gallery */}
      {artisan.processGallery && artisan.processGallery.length > 0 && (
        <section className="section section-alt">
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span className="eyebrow">Behind the Craft</span>
              <h2 style={{ fontSize: '2.2rem' }}>The Atelier Process</h2>
              <div className="brass-line brass-line-center" />
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.5rem'
            }}>
              {artisan.processGallery.map((imgUrl, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    borderRadius: 'var(--radius-sm)',
                    overflow: 'hidden',
                    height: i % 2 === 0 ? '340px' : '260px',
                    boxShadow: 'var(--shadow-soft)'
                  }}
                >
                  <img
                    src={imgUrl}
                    alt={`${artisan.name} process ${i + 1}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. Flagship Linked Product & Hang-Tag QR Showcase */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: linkedProduct ? '1fr 1fr' : '1fr', gap: '3rem', alignItems: 'center' }}>
            {/* Linked Product Card */}
            {linkedProduct && (
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-lg)',
                padding: '2.5rem',
                border: '1px solid var(--color-brass-light)',
                boxShadow: 'var(--shadow-card)'
              }}>
                <span className="eyebrow">Masterpiece Connection</span>
                <h3 style={{ fontSize: '1.8rem', color: 'var(--color-bordeaux-deep)', marginBottom: '1rem' }}>
                  Shop {artisan.name.split(' ')[0]}'s Handcraft
                </h3>
                <p style={{ fontSize: '0.95rem', color: 'rgba(58, 42, 34, 0.8)', marginBottom: '1.5rem' }}>
                  This individual story page is embedded directly into the physical hang-tag QR attached to this masterpiece.
                </p>

                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  <img
                    src={linkedProduct.image}
                    alt={linkedProduct.title}
                    style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-brass)' }}
                  />
                  <div>
                    <h4 style={{ fontSize: '1.15rem', color: 'var(--color-bordeaux-deep)' }}>{linkedProduct.title}</h4>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', color: 'var(--color-bordeaux)', fontWeight: '600', margin: '0.3rem 0' }}>
                      {formatINR(linkedProduct.price)}
                    </div>
                    <Link to={`/product/${linkedProduct.slug}`} className="btn btn-sm btn-primary">
                      <span>View Product</span>
                      <ShoppingBag size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Live Hangtag QR Card */}
            <div>
              <QRCard artisanSlug={artisan.slug} artisanName={artisan.name} />
            </div>
          </div>

          {/* 6. Closing CTA */}
          <div style={{ textAlign: 'center', marginTop: '5rem', paddingTop: '3rem', borderTop: '1px solid rgba(184, 147, 95, 0.3)' }}>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Sustaining Kashmiri Heritage</h3>
            <p style={{ color: 'rgba(58, 42, 34, 0.8)', maxWidth: '600px', margin: '0 auto 2rem' }}>
              Every item purchased directly supports {artisan.name} and their family workshop in {artisan.location}.
            </p>
            <Link to="/our-story" className="btn btn-outline-dark">
              <ArrowLeft size={16} />
              <span>Meet More Master Artisans</span>
            </Link>
          </div>
        </div>
      </section>
    </article>
  )
}
