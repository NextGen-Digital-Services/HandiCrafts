import React from 'react'

export function Badge({ children, variant = 'default', className = '' }) {
  const variantClass = variant === 'brass' 
    ? 'badge-brass' 
    : variant === 'bordeaux' 
    ? 'badge-bordeaux' 
    : variant === 'saffron'
    ? 'badge-saffron'
    : ''

  return (
    <span className={`badge ${variantClass} ${className}`}>
      {children}
    </span>
  )
}
