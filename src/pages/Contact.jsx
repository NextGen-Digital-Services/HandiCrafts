import React, { useState } from 'react'
import { MapPin, Phone, Mail, Clock, CheckCircle, Send, Sparkles } from 'lucide-react'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Button } from '../components/ui/Button'

export function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Inquiry',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Atelier Concierge"
          title="Connect with Noor-e-Kashmir"
          subtitle="Whether inquiring about private bespoke commissions, wholesale hang-tag authentication, or visiting our Srinagar studio, our team awaits your message."
          centered
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3.5rem', alignItems: 'start' }}>
          {/* Atelier Contact Details */}
          <div style={{
            backgroundColor: 'var(--color-bordeaux-deep)',
            color: 'var(--color-ivory)',
            padding: '2.5rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-brass)'
          }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: '1.8rem', color: 'var(--color-ivory)', marginBottom: '1.5rem' }}>
              Private Atelier & Workshop
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <MapPin color="var(--color-brass-light)" size={22} style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                <div>
                  <h4 style={{ fontSize: '0.95rem', color: 'var(--color-brass-light)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Location</h4>
                  <p style={{ fontSize: '0.95rem', color: 'rgba(247, 241, 230, 0.85)' }}>
                    Boulevard Road, Opp. Dal Lake Gate 2,<br />
                    Srinagar, Jammu & Kashmir 190001
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <Phone color="var(--color-brass-light)" size={22} style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                <div>
                  <h4 style={{ fontSize: '0.95rem', color: 'var(--color-brass-light)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Concierge Phone</h4>
                  <p style={{ fontSize: '0.95rem', color: 'rgba(247, 241, 230, 0.85)' }}>
                    +91 194 245 8890 / +91 9858 000 111
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <Mail color="var(--color-brass-light)" size={22} style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                <div>
                  <h4 style={{ fontSize: '0.95rem', color: 'var(--color-brass-light)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Email</h4>
                  <p style={{ fontSize: '0.95rem', color: 'rgba(247, 241, 230, 0.85)' }}>
                    concierge@noor-e-kashmir.com
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <Clock color="var(--color-brass-light)" size={22} style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                <div>
                  <h4 style={{ fontSize: '0.95rem', color: 'var(--color-brass-light)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Hours</h4>
                  <p style={{ fontSize: '0.95rem', color: 'rgba(247, 241, 230, 0.85)' }}>
                    Monday – Saturday: 10:00 AM – 7:00 PM IST
                  </p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div style={{
              height: '180px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: 'var(--radius-sm)',
              border: '1px dashed var(--color-brass)',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              textAlign: 'center',
              color: 'var(--color-brass-light)',
              padding: '1rem'
            }}>
              <span style={{ fontSize: '0.85rem' }}>[ Interactive Kashmir Dal Lake Atelier Map View ]</span>
            </div>
          </div>

          {/* Contact Form */}
          <div style={{
            backgroundColor: '#FFFFFF',
            padding: '2.5rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-brass-light)',
            boxShadow: 'var(--shadow-card)'
          }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <CheckCircle size={54} color="var(--color-bordeaux)" style={{ marginBottom: '1.2rem' }} />
                <h3 style={{ fontSize: '1.8rem', color: 'var(--color-bordeaux-deep)', marginBottom: '0.6rem' }}>
                  Dispatch Received
                </h3>
                <p style={{ color: 'rgba(58, 42, 34, 0.8)', fontSize: '1rem', marginBottom: '2rem' }}>
                  Thank you, {formData.name}. Our atelier concierge will review your message and reply within 24 hours.
                </p>
                <Button variant="brass" onClick={() => setSubmitted(false)}>
                  Send Another Inquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{ fontSize: '1.6rem', color: 'var(--color-bordeaux-deep)', marginBottom: '1.5rem' }}>
                  Send an Inquiry
                </h3>

                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-input"
                    placeholder="Lord / Lady / Full Name"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="form-input"
                    placeholder="your.name@domain.com"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Inquiry Nature</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="form-select"
                  >
                    <option value="Bespoke Commission">Bespoke Custom Commission</option>
                    <option value="Hang-Tag QR Verification">Hang-Tag QR Verification</option>
                    <option value="Press / Editorial">Press & Editorial Inquiries</option>
                    <option value="Private Appointment">Private Studio Visit in Srinagar</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Your Message *</label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="form-textarea"
                    placeholder="Please share details regarding your commission or inquiry..."
                  />
                </div>

                <Button type="submit" variant="primary" size="lg" icon={Send} style={{ width: '100%', justifyContent: 'center' }}>
                  Dispatch Inquiry
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
