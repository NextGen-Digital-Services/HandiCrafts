import React from 'react'

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo)
  }

  handleReload = () => {
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FFFDF9',
          padding: '2rem',
          fontFamily: 'sans-serif'
        }}>
          <div style={{
            maxWidth: '500px',
            width: '100%',
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            padding: '2.5rem',
            border: '2px solid #B8935F',
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
            textAlign: 'center'
          }}>
            <h2 style={{ color: '#4A1525', marginBottom: '1rem' }}>
              Atelier Notice
            </h2>
            <p style={{ color: '#3A2A22', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
              An unexpected display issue occurred. Please click below to return to the Noor-e-Kashmir main page.
            </p>
            <button
              onClick={this.handleReload}
              style={{
                backgroundColor: '#4A1525',
                color: '#F7F1E6',
                border: 'none',
                padding: '0.8rem 1.8rem',
                borderRadius: '6px',
                fontSize: '0.9rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Return to Public Atelier Home
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
