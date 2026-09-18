import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Clock, MapPin, Sparkles } from 'lucide-react'
import { Badge } from '../ui/Badge'

export function ArtisanCard({ artisan, isFeatured = false }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25 }}
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        border: '1px solid rgba(184, 147, 95, 0.3)',
        display: 'grid',
        gridTemplateColumns: isFeatured ? '1fr 1fr' : '1fr',
        height: '100%',
        boxShadow: 'var(--shadow-soft)'
      }}
    >
      <div style={{ position: 'relative', minHeight: isFeatured ? '360px' : '280px', overflow: 'hidden' }}>
        <img
          src={artisan.portraitImage || artisan.coverImage}
          alt={artisan.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
        <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
          <Badge variant="bordeaux">{artisan.craftTechnique}</Badge>
        </div>
      </div>

      <div style={{ padding: isFeatured ? '2.5rem' : '1.8rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', fontSize: '0.8rem', color: 'var(--color-brass)', marginBottom: '0.6rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <MapPin size={14} /> {artisan.location}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Clock size={14} /> {artisan.hoursTaken} Hand Hours
            </span>
          </div>

          <h3 style={{ fontSize: isFeatured ? '1.8rem' : '1.35rem', color: 'var(--color-bordeaux-deep)', marginBottom: '0.8rem' }}>
            {artisan.name}
          </h3>

          <p style={{ 
            fontFamily: 'var(--font-heading)', 
            fontStyle: 'italic', 
            fontSize: isFeatured ? '1.1rem' : '0.95rem', 
            color: 'var(--color-walnut)',
            borderLeft: '2px solid var(--color-brass)',
            paddingLeft: '0.8rem',
            marginBottom: '1.2rem',
            lineHeight: '1.5'
          }}>
            "{artisan.quote}"
          </p>
        </div>

        <Link
          to={`/our-story/${artisan.slug}`}
          className="btn btn-outline"
          style={{ alignSelf: 'flex-start', marginTop: '1rem' }}
        >
          <span>Meet {artisan.name.split(' ')[0]}</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </motion.div>
  )
}
