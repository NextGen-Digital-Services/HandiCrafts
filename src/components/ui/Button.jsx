import React from 'react'
import { Loader2 } from 'lucide-react'

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  onClick, 
  type = 'button',
  icon: Icon,
  disabled = false,
  isLoading = false,
  ...props
}) {
  const sizeClass = size === 'sm' ? 'btn-sm' : size === 'lg' ? 'btn-lg' : ''
  const variantClass = `btn-${variant}`

  return (
    <button
      type={type}
      className={`btn ${variantClass} ${sizeClass} ${className}`}
      onClick={onClick}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="animate-spin" size={size === 'sm' ? 16 : 18} style={{ animation: 'spin 1s linear infinite' }} />
      ) : (
        Icon && <Icon size={size === 'sm' ? 16 : 18} />
      )}
      <span>{children}</span>
    </button>
  )
}
