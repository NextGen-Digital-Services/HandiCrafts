import React from 'react'

export function SectionHeading({ 
  eyebrow, 
  title, 
  subtitle, 
  centered = false, 
  light = false,
  className = '' 
}) {
  return (
    <div className={`${centered ? 'text-center' : ''} ${className}`} style={{ marginBottom: '3rem', textAlign: centered ? 'center' : 'left' }}>
      {eyebrow && (
        <span className={`eyebrow ${light ? 'eyebrow-light' : ''}`}>
          {eyebrow}
        </span>
      )}
      {title && (
        <h2 style={{ fontSize: '2.4rem', marginTop: '0.2rem', color: light ? 'var(--color-ivory)' : 'var(--color-bordeaux-deep)' }}>
          {title}
        </h2>
      )}
      <div className={`brass-line ${centered ? 'brass-line-center' : ''}`} />
      {subtitle && (
        <p style={{ 
          fontSize: '1.05rem', 
          color: light ? 'rgba(247, 241, 230, 0.8)' : 'var(--color-walnut)', 
          maxWidth: centered ? '680px' : '100%', 
          margin: centered ? '0 auto' : '0' 
        }}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
