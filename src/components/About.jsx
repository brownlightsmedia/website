import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Award, Heart, Globe, ArrowRight } from 'lucide-react';

export default function About() {
  return (
    <section className="section-padding" id="about" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
      <div className="container">
        <div className="about-grid">
          
          {/* Left Image Stack */}
          <div style={{ position: 'relative' }}>
            <div className="bw-image about-image" style={{
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: '0 20px 45px rgba(18, 18, 18, 0.1)',
              backgroundImage: 'url(/website/assets/images/ABOUT.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }} />
          </div>

          {/* Right Text Content */}
          <div>
            <span className="section-tag">ABOUT BROWNLIGHT MEDIA</span>
            <h2 className="section-title" style={{ marginBottom: '1.4rem', fontSize: '2.4rem' }}>
              Crafting stories through <br />
              <span style={{ fontStyle: 'italic', color: 'var(--accent-gold)' }}>light, emotion, and creativity.</span>
            </h2>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.2rem' }}>
              Born in Kozhikode, Kerala, from the shared dream of Ashkar, Nihal, and Ashir, Brown Lights Media is driven by a profound love for storytelling. What began with a single Sony A7 III has evolved into a passionate pursuit of timeless photography and cinema.
            </p>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '2rem' }}>
              We approach every celebration with a fresh perspective, blending aesthetics, creativity, and thoughtful planning. Our goal isn't just to capture fleeting moments, but to craft unforgettable memories that last forever.
            </p>

            {/* Stats Row */}
            <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', borderTop: '1px solid var(--border-light)', paddingTop: '1.5rem' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.4rem', color: 'var(--accent-gold)' }}>6+</h3>
                <span style={{ fontFamily: 'var(--font-subtitle)', fontSize: '1.2rem', fontWeight: 400, color: 'var(--text-muted)' }}>YEARS OF EXPERIENCE</span>
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.4rem', color: 'var(--accent-gold)' }}>300+</h3>
                <span style={{ fontFamily: 'var(--font-subtitle)', fontSize: '1.2rem', fontWeight: 400, color: 'var(--text-muted)' }}>WEDDING FILMING</span>
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.4rem', color: 'var(--accent-gold)' }}>12</h3>
                <span style={{ fontFamily: 'var(--font-subtitle)', fontSize: '1.2rem', fontWeight: 400, color: 'var(--text-muted)' }}>DESTINATIONS</span>
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.4rem', color: 'var(--accent-gold)' }}>100%</h3>
                <span style={{ fontFamily: 'var(--font-subtitle)', fontSize: '1.2rem', fontWeight: 400, color: 'var(--text-muted)' }}>CLIENT SATISFACTION</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
