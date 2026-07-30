import React from 'react';
import { Sun, Palette, Eye, ShieldCheck } from 'lucide-react';

const pillars = [
  {
    icon: Sun,
    title: 'Organic Light Manipulation',
    desc: 'We harness natural golden hour light and subtle directional fill to create soft, romantic skin tones and painterly shadows.'
  },
  {
    icon: Palette,
    title: 'Custom Cinema Color Grading',
    desc: 'Every photograph and film sequence passes through our bespoke color grading suite, inspired by classic film stocks and timeless oil paintings.'
  },
  {
    icon: Eye,
    title: 'Unobtrusive Candid Curation',
    desc: 'We blend into the background as quiet observers, capturing fleeting glances, joyful tears, and real laughter without artificial posing.'
  },
  {
    icon: ShieldCheck,
    title: 'Heritage Preservation',
    desc: 'Your wedding legacy is printed on archival museum-grade paper bound in handcrafted leather to endure across generations.'
  }
];

export default function Philosophy() {
  return (
    <section className="section-padding" id="philosophy" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="section-tag">OUR CREATIVE PHILOSOPHY</span>
          <h2 className="section-title">The Art of Storytelling</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '2.5rem 2rem',
                  boxShadow: '0 10px 25px rgba(18,18,18,0.04)',
                  transition: 'transform 0.4s ease'
                }}
              >
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  background: 'var(--accent-gold-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem'
                }}>
                  <Icon size={24} color="#C69B66" />
                </div>

                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 400, marginBottom: '0.8rem' }}>
                  {pillar.title}
                </h3>

                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
