import React, { useState } from 'react'
import { QRCodeSVG, QRCodeCanvas } from 'qrcode.react'
import { Download, Copy, Check, QrCode } from 'lucide-react'
import { downloadQRCodePNG } from '../../utils/qrHelpers'
import { Button } from '../ui/Button'

export function QRCard({ artisanSlug, artisanName }) {
  const [copied, setCopied] = useState(false)

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://noor-e-kashmir.com'
  const storyUrl = `${origin}/our-story/${artisanSlug}`
  const qrElementId = `artisan-qr-${artisanSlug}`

  const handleCopyLink = () => {
    navigator.clipboard.writeText(storyUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  const handleDownloadPNG = () => {
    const filename = `hangtag-qr-${artisanSlug}.png`
    downloadQRCodePNG(qrElementId, filename)
  }

  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      border: '2px solid var(--color-brass)',
      borderRadius: 'var(--radius-md)',
      padding: '2rem',
      textAlign: 'center',
      boxShadow: 'var(--shadow-card)',
      maxWidth: '380px',
      margin: '0 auto'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', color: 'var(--color-brass)', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1.2rem' }}>
        <QrCode size={16} />
        <span>Artisan Hang-Tag QR</span>
      </div>

      <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', marginBottom: '0.3rem', color: 'var(--color-bordeaux-deep)' }}>
        Scan to meet the artist
      </h4>
      <p style={{ fontSize: '0.8rem', color: 'rgba(58, 42, 34, 0.7)', marginBottom: '1.5rem' }}>
        Printed on physical product tags for {artisanName || 'the artisan'}
      </p>

      {/* QR Code Container */}
      <div 
        id={qrElementId} 
        style={{ 
          padding: '1.2rem', 
          backgroundColor: 'var(--color-ivory)', 
          border: '1px solid var(--color-brass-light)',
          borderRadius: 'var(--radius-sm)',
          display: 'inline-block',
          marginBottom: '1.5rem'
        }}
      >
        <QRCodeCanvas
          value={storyUrl}
          size={180}
          bgColor="#F7F1E6"
          fgColor="#3D0F1C"
          level="H"
          includeMargin={true}
        />
      </div>

      <div style={{ fontSize: '0.75rem', color: 'var(--color-walnut)', wordBreak: 'break-all', marginBottom: '1.5rem', backgroundColor: 'var(--color-ivory-deep)', padding: '0.5rem', borderRadius: '4px' }}>
        {storyUrl}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        <Button 
          variant="brass" 
          onClick={handleDownloadPNG}
          icon={Download}
          style={{ width: '100%', justifyContent: 'center' }}
        >
          Download QR (PNG)
        </Button>
        <Button 
          variant="outline" 
          onClick={handleCopyLink}
          icon={copied ? Check : Copy}
          style={{ width: '100%', justifyContent: 'center' }}
        >
          {copied ? 'Link Copied!' : 'Copy Story Link'}
        </Button>
      </div>
    </div>
  )
}
