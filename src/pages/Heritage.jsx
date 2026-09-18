import React from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, HeartHandshake, Compass, Award, Sparkles } from 'lucide-react'
import { SectionHeading } from '../components/ui/SectionHeading'

export function Heritage() {
  const milestones = [
    { year: "1380 AD", title: "Arrival of Persian Artisans", desc: "Mir Sayyid Ali Hamadani brings 700 Persian craftsmen to the Kashmir Valley, establishing handloom weaving, paper mache, and wood carving." },
    { year: "1796 AD", title: "The Royal French Craze", desc: "Napoleon Bonaparte gifts Empress Josephine a Kashmiri Kani shawl, sparking a multi-century European high-fashion obsession." },
    { year: "2010 AD", title: "Geographical Indication (GI) Tag", desc: "Kashmir Pashmina receives official GI protection to safeguard genuine hand-spun down fibre against power-loom counterfeits." },
    { year: "2021 AD", title: "UNESCO Creative City", desc: "Srinagar is designated a UNESCO Creative City for Crafts and Folk Art, recognizing its rare concentrated artisan heritage." },
    { year: "Present Day", title: "Noor-e-Kashmir QR Atelier", desc: "Connecting ancient physical craft hang-tags to digital artisan storytelling through physical QR verification." }
  ]

  return (
    <div>
      {/* Hero */}
      <section style={{
        backgroundColor: 'var(--color-bordeaux-deep)',
        color: 'var(--color-ivory)',
        padding: '5rem 0 4rem',
        textAlign: 'center',
        borderBottom: '2px solid var(--color-brass)'
      }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <span className="eyebrow eyebrow-light">Six Centuries of Craft Mastery</span>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: '3rem', color: 'var(--color-ivory)', marginTop: '0.5rem', marginBottom: '1.5rem' }}>
            The Heritage of Noor-e-Kashmir
          </h1>
          <p style={{ fontSize: '1.15rem', lineHeight: '1.8', color: 'rgba(247, 241, 230, 0.85)' }}>
            We bridge old-world Kashmiri artisan ateliers with international luxury standards. Every piece we present is a living testament to patience, heritage, and human dignity.
          </p>
        </div>
      </section>

      {/* Main Narrative */}
      <section className="section">
        <div className="container" style={{ maxWidth: '900px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center', marginBottom: '4rem' }}>
            <div>
              <img
                src="https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&q=80&w=1000"
                alt="Kashmiri Weaver"
                style={{ borderRadius: 'var(--radius-md)', border: '1px solid var(--color-brass)', boxShadow: 'var(--shadow-card)' }}
              />
            </div>
            <div>
              <span className="eyebrow">Our Philosophy</span>
              <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--color-bordeaux-deep)' }}>
                Preserving Human Artistry in a Machine Age
              </h2>
              <p style={{ color: 'rgba(58, 42, 34, 0.85)', lineHeight: '1.7', marginBottom: '1rem' }}>
                Fast fashion and automated power looms threaten to erode techniques that required six hundred years to perfect. Noor-e-Kashmir was founded as a high-artisan sanctuary.
              </p>
              <p style={{ color: 'rgba(58, 42, 34, 0.85)', lineHeight: '1.7' }}>
                We refuse machine shortcuts. By embedding digital hang-tag QR technology directly into physical labels, we guarantee absolute transparency and direct artisan royalties.
              </p>
            </div>
          </div>

          {/* Timeline */}
          <SectionHeading
            eyebrow="Chronology"
            title="Milestones of Kashmiri Craft"
            centered
          />

          <div style={{ position: 'relative', paddingLeft: '2rem', borderLeft: '2px solid var(--color-brass)', margin: '3rem 0' }}>
            {milestones.map((item, idx) => (
              <div key={idx} style={{ marginBottom: '2.5rem', position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  left: '-2.55rem',
                  top: '0.2rem',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-bordeaux)',
                  border: '2px solid var(--color-brass-light)'
                }} />
                <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--color-brass)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {item.year}
                </span>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--color-bordeaux-deep)', margin: '0.2rem 0 0.5rem' }}>
                  {item.title}
                </h3>
                <p style={{ color: 'rgba(58, 42, 34, 0.8)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
