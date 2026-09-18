import React, { createContext, useContext, useState, useEffect } from 'react'
import {
  loginAPI,
  getStoredToken,
  getStoredUser,
  setStoredAuth,
  clearStoredAuth,
  STORAGE_KEYS
} from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => getStoredToken())
  const [user, setUser] = useState(() => getStoredUser())
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!getStoredToken())
  const [isLoading, setIsLoading] = useState(false)

  // Listen for storage events across tabs
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === STORAGE_KEYS.TOKEN || e.key === STORAGE_KEYS.IS_LOGGED_IN) {
        const storedToken = getStoredToken()
        const storedUser = getStoredUser()
        setToken(storedToken)
        setUser(storedUser)
        setIsAuthenticated(!!storedToken)
      }
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  /**
   * Execute Login API call and synchronously update local storage & state
   */
  const login = async (username, password) => {
    setIsLoading(true)
    try {
      const response = await loginAPI(username, password)
      
      if (response.success) {
        // Synchronously set local & session storage BEFORE updating React state
        setStoredAuth(response.token, response.user)
        
        setToken(response.token)
        setUser(response.user)
        setIsAuthenticated(true)
        
        return { success: true }
      } else {
        return {
          success: false,
          error: response.message || 'Login failed. Please check credentials.'
        }
      }
    } catch (err) {
      return {
        success: false,
        error: err.message || 'An unexpected authentication error occurred.'
      }
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Logout user and clear all storage synchronously
   */
  const logout = () => {
    clearStoredAuth()
    setToken(null)
    setUser(null)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated,
        isLoading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
