/**
 * Triggers browser download of a QR code element rendered inside an SVG or Canvas element.
 * @param {string} elementId - DOM ID of the QR wrapper container
 * @param {string} fileName - File name for saved PNG image
 */
export function downloadQRCodePNG(elementId, fileName = 'artisan-hangtag-qr.png') {
  const container = document.getElementById(elementId)
  if (!container) return false

  const svg = container.querySelector('svg')
  const canvas = container.querySelector('canvas')

  if (canvas) {
    const imageURI = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.download = fileName
    link.href = imageURI
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    return true
  }

  if (svg) {
    const svgData = new XMLSerializer().serializeToString(svg)
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
    const URL = window.URL || window.webkitURL || window
    const blobURL = URL.createObjectURL(svgBlob)
    
    const image = new Image()
    image.onload = () => {
      const cvs = document.createElement('canvas')
      cvs.width = svg.clientWidth || 300
      cvs.height = svg.clientHeight || 300
      const context = cvs.getContext('2d')
      
      // Draw background
      context.fillStyle = '#FFFFFF'
      context.fillRect(0, 0, cvs.width, cvs.height)
      context.drawImage(image, 0, 0)
      
      const png = cvs.toDataURL('image/png')
      const link = document.createElement('a')
      link.download = fileName
      link.href = png
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(blobURL)
    }
    image.src = blobURL
    return true
  }

  return false
}
