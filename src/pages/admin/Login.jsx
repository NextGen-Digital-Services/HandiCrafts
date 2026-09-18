import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShieldCheck, Lock, User, AlertCircle } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { Button } from '../../components/ui/Button'

export function Login() {
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('kashmir123')
  const [error, setError] = useState('')
  const { login, isLoading, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard', { replace: true })
    }
  }, [isAuthenticated, navigate])

  const handleLogin = async (e) => {
    // Explicitly prevent browser default submit refresh action
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }

    setError('')

    if (!username.trim() || !password.trim()) {
      setError('Please provide both username and password.')
      return
    }

    const result = await login(username, password)

    if (result.success) {
      // Synchronous local storage update guarantees state is set before navigation
      navigate('/admin/dashboard', { replace: true })
    } else {
      setError(result.error || 'Authentication failed. Please check credentials.')
    }
  }

  const handleDemoFill = () => {
    setUsername('admin')
    setPassword('kashmir123')
    setError('')
  }

  return (
    <div style={{
      minHeight: '85vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'var(--color-ivory)',
      padding: '2rem 1rem'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-lg)',
        padding: '2.5rem',
        border: '2px solid var(--color-brass)',
        boxShadow: 'var(--shadow-card)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-bordeaux)',
            color: 'var(--color-brass-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem'
          }}>
            <ShieldCheck size={28} />
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', color: 'var(--color-bordeaux-deep)' }}>
            Artisan Admin Login
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'rgba(58, 42, 34, 0.7)' }}>
            Manage master artisan profiles & hang-tag QR generation
          </p>
        </div>

        {error && (
          <div style={{
            backgroundColor: '#FFEBEE',
            color: '#C62828',
            padding: '0.75rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1.5rem'
          }}>
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} noValidate>
          <div className="form-group">
            <label className="form-label">Admin Username</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="form-input"
                style={{ paddingLeft: '2.4rem' }}
                disabled={isLoading}
              />
              <User size={16} color="var(--color-brass)" style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-input"
                style={{ paddingLeft: '2.4rem' }}
                disabled={isLoading}
              />
              <Lock size={16} color="var(--color-brass)" style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <div 
            onClick={handleDemoFill}
            style={{ 
              backgroundColor: 'var(--color-ivory-deep)', 
              padding: '0.75rem', 
              borderRadius: '4px', 
              fontSize: '0.75rem', 
              color: 'var(--color-walnut)', 
              marginBottom: '1.5rem',
              cursor: 'pointer',
              border: '1px dashed var(--color-brass)'
            }}
            title="Click to auto-fill demo credentials"
          >
            <strong>Demo Credentials (Click to Auto-fill):</strong><br />
            Username: <code>admin</code><br />
            Password: <code>kashmir123</code>
          </div>

          <Button 
            type="submit" 
            variant="primary" 
            size="lg" 
            style={{ width: '100%', justifyContent: 'center' }}
            isLoading={isLoading}
            disabled={isLoading}
          >
            Access Admin Portal
          </Button>
        </form>
      </div>
    </div>
  )
}
