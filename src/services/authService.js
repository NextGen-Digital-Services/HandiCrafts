/**
 * Authentication Service
 * Handles API communication, token storage, and environment configuration.
 */

// Dynamically determine API base URL based on environment variables (Vercel / Localhost)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 
  (import.meta.env.DEV ? 'http://localhost:5000/api' : '/api')

export const STORAGE_KEYS = {
  TOKEN: 'admin_token',
  USER: 'admin_user',
  IS_LOGGED_IN: 'isAdminLoggedIn'
}

/**
 * Perform login API call with fallback for client demo mode
 */
export async function loginAPI(username, password) {
  try {
    // Attempt real API request if custom backend URL is configured
    if (import.meta.env.VITE_API_BASE_URL) {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Login failed. Please check your credentials.')
      }

      return {
        success: true,
        token: data.token || `jwt_token_${Date.now()}`,
        user: data.user || { username, role: 'admin' }
      }
    }
  } catch (err) {
    // If backend endpoint failed or is not reachable in production/dev
    console.warn('Backend API unavailable, using production demo fallback mode:', err.message)
  }

  // Simulated API response delay (400ms) for realistic UX & testing loading state
  await new Promise((resolve) => setTimeout(resolve, 400))

  // Auth validation logic
  if (username === 'admin' && password === 'kashmir123') {
    const token = `jwt_token_nk_admin_${Date.now()}`
    const user = {
      username: 'admin',
      name: 'Atelier Administrator',
      role: 'super_admin'
    }

    return {
      success: true,
      token,
      user
    }
  } else {
    return {
      success: false,
      message: 'Invalid credentials. Use admin / kashmir123 for demo access.'
    }
  }
}

/**
 * Synchronously retrieve stored auth token with fallback check for refresh persistence
 */
export function getStoredToken() {
  try {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN) || sessionStorage.getItem(STORAGE_KEYS.TOKEN)
    if (token) return token

    // Backward compatibility fallback for legacy 'isAdminLoggedIn' flag
    const isLoggedIn = localStorage.getItem(STORAGE_KEYS.IS_LOGGED_IN) || sessionStorage.getItem(STORAGE_KEYS.IS_LOGGED_IN)
    if (isLoggedIn === 'true' || isLoggedIn === true) {
      return 'jwt_token_persistent_admin'
    }

    return null
  } catch {
    return null
  }
}

/**
 * Synchronously retrieve stored user info with fallback check for refresh persistence
 */
export function getStoredUser() {
  try {
    const userStr = localStorage.getItem(STORAGE_KEYS.USER) || sessionStorage.getItem(STORAGE_KEYS.USER)
    if (userStr) return JSON.parse(userStr)

    const isLoggedIn = localStorage.getItem(STORAGE_KEYS.IS_LOGGED_IN) || sessionStorage.getItem(STORAGE_KEYS.IS_LOGGED_IN)
    if (isLoggedIn === 'true' || isLoggedIn === true) {
      return {
        username: 'admin',
        name: 'Atelier Administrator',
        role: 'super_admin'
      }
    }

    return null
  } catch {
    return null
  }
}

/**
 * Synchronously save auth credentials to localStorage and sessionStorage
 */
export function setStoredAuth(token, user) {
  try {
    localStorage.setItem(STORAGE_KEYS.TOKEN, token)
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user))
    localStorage.setItem(STORAGE_KEYS.IS_LOGGED_IN, 'true')

    sessionStorage.setItem(STORAGE_KEYS.TOKEN, token)
    sessionStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user))
    sessionStorage.setItem(STORAGE_KEYS.IS_LOGGED_IN, 'true')
  } catch (err) {
    console.error('Failed to set stored auth credentials:', err)
  }
}

/**
 * Clear stored auth credentials from localStorage and sessionStorage
 */
export function clearStoredAuth() {
  try {
    localStorage.removeItem(STORAGE_KEYS.TOKEN)
    localStorage.removeItem(STORAGE_KEYS.USER)
    localStorage.setItem(STORAGE_KEYS.IS_LOGGED_IN, 'false')

    sessionStorage.removeItem(STORAGE_KEYS.TOKEN)
    sessionStorage.removeItem(STORAGE_KEYS.USER)
    sessionStorage.setItem(STORAGE_KEYS.IS_LOGGED_IN, 'false')
  } catch (err) {
    console.error('Failed to clear stored auth credentials:', err)
  }
}
