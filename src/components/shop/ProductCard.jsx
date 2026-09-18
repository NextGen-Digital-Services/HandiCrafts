import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import { formatINR } from '../../utils/slugify'
import { Badge } from '../ui/Badge'

export function ProductCard({ product, artisan }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        border: '1px solid rgba(184, 147, 95, 0.25)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        boxShadow: 'var(--shadow-soft)'
      }}
    >
      <Link to={`/product/${product.slug}`} style={{ position: 'relative', display: 'block', overflow: 'hidden', paddingTop: '115%' }}>
        <img
          src={product.image}
          alt={product.title}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease'
          }}
          className="product-card-img"
        />
        <div style={{ position: 'absolute', top: '1rem', left: '1rem', display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          <Badge variant="brass">{product.category}</Badge>
        </div>
      </Link>

      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div>
          {artisan && (
            <div style={{ fontSize: '0.75rem', color: 'var(--color-brass)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
              Crafted by {artisan.name}
            </div>
          )}
          <h3 style={{ fontSize: '1.15rem', lineHeight: '1.35', marginBottom: '0.6rem' }}>
            <Link to={`/product/${product.slug}`} style={{ color: 'var(--color-bordeaux-deep)' }}>
              {product.title}
            </Link>
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'rgba(58, 42, 34, 0.8)', lineClamp: 2, WebkitLineClamp: 2, display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden', marginBottom: '1.2rem' }}>
            {product.description}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid rgba(184, 147, 95, 0.2)' }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: '600', color: 'var(--color-bordeaux)' }}>
            {formatINR(product.price)}
          </div>
          <Link 
            to={`/product/${product.slug}`}
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.3rem',
              fontSize: '0.8rem', 
              fontWeight: '600',
              textTransform: 'uppercase',
              color: 'var(--color-bordeaux)',
              letterSpacing: '0.05em'
            }}
          >
            <span>View Piece</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
