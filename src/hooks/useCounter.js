import { useState, useEffect } from 'react'

/**
 * Animated counter hook that ticks up from 0 to endValue when triggered.
 */
export function useCounter(endValue, duration = 2000, trigger = true) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!trigger) return

    let startTime = null
    let animationFrame = null

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      
      // Easing formula (easeOutExpo)
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setCount(Math.floor(easeProgress * endValue))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step)
      } else {
        setCount(endValue)
      }
    }

    animationFrame = requestAnimationFrame(step)

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame)
    }
  }, [endValue, duration, trigger])

  return count
}
