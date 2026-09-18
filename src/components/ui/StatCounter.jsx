import React from 'react'
import { motion } from 'framer-motion'
import { useCounter } from '../../hooks/useCounter'

export function StatCounter({ value, suffix = '', label, icon: Icon }) {
  const [isInView, setIsInView] = React.useState(false)
  const count = useCounter(value, 2000, isInView)

  return (
    <motion.div 
      onViewportEnter={() => setIsInView(true)}
      viewport={{ once: true }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '1.5rem',
        borderRight: '1px solid rgba(184, 147, 95, 0.3)'
      }}
    >
      {Icon && <Icon size={28} color="var(--color-brass)" style={{ marginBottom: '0.75rem' }} />}
      <div style={{ 
        fontFamily: 'var(--font-heading)', 
        fontSize: '2.8rem', 
        fontWeight: '600', 
        color: 'var(--color-bordeaux-deep)',
        lineHeight: 1
      }}>
        {count}{suffix}
      </div>
      <div style={{ 
        fontSize: '0.85rem', 
        textTransform: 'uppercase', 
        letterSpacing: '0.1em', 
        color: 'var(--color-walnut)',
        marginTop: '0.5rem',
        fontWeight: '500'
      }}>
        {label}
      </div>
    </motion.div>
  )
}
