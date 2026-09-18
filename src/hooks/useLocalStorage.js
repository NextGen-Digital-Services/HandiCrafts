import { useState, useEffect } from 'react'
import { INITIAL_ARTISANS } from '../data/seedArtisans'
import { INITIAL_PRODUCTS } from '../data/seedProducts'

/**
 * Custom hook to sync state with localStorage and pre-seed initial data if empty.
 * Includes window/SSR safety checks to prevent crashes in constrained environments.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    if (typeof window === 'undefined' || !window.localStorage) {
      if (key === 'artisans') return INITIAL_ARTISANS
      if (key === 'products') return INITIAL_PRODUCTS
      return initialValue
    }

    try {
      const stored = localStorage.getItem(key)
      if (stored) {
        return JSON.parse(stored)
      }
      
      // Pre-seed default data if key doesn't exist yet
      if (key === 'artisans') {
        try {
          localStorage.setItem('artisans', JSON.stringify(INITIAL_ARTISANS))
        } catch (e) {
          console.warn('Unable to write initial artisans to localStorage:', e)
        }
        return INITIAL_ARTISANS
      }
      if (key === 'products') {
        try {
          localStorage.setItem('products', JSON.stringify(INITIAL_PRODUCTS))
        } catch (e) {
          console.warn('Unable to write initial products to localStorage:', e)
        }
        return INITIAL_PRODUCTS
      }
      
      try {
        localStorage.setItem(key, JSON.stringify(initialValue))
      } catch (e) {
        console.warn(`Unable to write key "${key}" to localStorage:`, e)
      }
      return initialValue
    } catch (e) {
      console.error(`Error reading localStorage key "${key}":`, e)
      if (key === 'artisans') return INITIAL_ARTISANS
      if (key === 'products') return INITIAL_PRODUCTS
      return initialValue
    }
  })

  useEffect(() => {
    if (typeof window === 'undefined' || !window.localStorage) return
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      console.error(`Error writing localStorage key "${key}":`, e)
    }
  }, [key, value])

  return [value, setValue]
}
