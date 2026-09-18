import { useState, useEffect } from 'react'
import { INITIAL_ARTISANS } from '../data/seedArtisans'
import { INITIAL_PRODUCTS } from '../data/seedProducts'

/**
 * Custom hook to sync state with localStorage and pre-seed initial data if empty.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key)
      if (stored) {
        return JSON.parse(stored)
      }
      
      // Pre-seed default data if key doesn't exist yet
      if (key === 'artisans') {
        localStorage.setItem('artisans', JSON.stringify(INITIAL_ARTISANS))
        return INITIAL_ARTISANS
      }
      if (key === 'products') {
        localStorage.setItem('products', JSON.stringify(INITIAL_PRODUCTS))
        return INITIAL_PRODUCTS
      }
      
      localStorage.setItem(key, JSON.stringify(initialValue))
      return initialValue
    } catch (e) {
      console.error(`Error reading localStorage key "${key}":`, e)
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      console.error(`Error writing localStorage key "${key}":`, e)
    }
  }, [key, value])

  return [value, setValue]
}
