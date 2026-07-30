import React from 'react';
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="site-footer" id="contact" style={{ background: 'var(--bg-dark)', color: 'var(--text-light)', paddingTop: '6rem' }}>
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '3rem',
        paddingBottom: '5rem'
      }}>
        {/* Brand */}
        <div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 700, letterSpacing: '0.15em', marginBottom: '0.2rem' }}>
            BROWNLIGHT
          </div>
          <div style={{ fontSize: '0.6rem', letterSpacing: '0.5em', color: 'var(--accent-gold)', fontWeight: 600, marginBottom: '1.2rem' }}>
            M E D I A
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.5rem', maxWidth: '300px' }}>
            Luxury wedding photography & cinematography for the dreamers and the deeply in love. Capturing raw emotions across India & worldwide.
          </p>
          <div style={{ display: 'flex', gap: '0.8rem' }}>
            <a href="https://www.instagram.com/brownlightsmedia/" target="_blank" rel="noreferrer" style={{
              width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'
            }} aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="https://www.behance.net/brownlightmedia" target="_blank" rel="noreferrer" style={{
              width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: '0.8rem'
            }} aria-label="Behance">
              Be
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ fontSize: '0.8rem', letterSpacing: '0.15em', fontWeight: 700, color: 'var(--accent-gold)', marginBottom: '1.5rem' }}>
            QUICK LINKS
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            <li><a href="#hero">Home</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#portfolio">Portfolio</a></li>
            <li><a href="#packages">Experiences</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        {/* Experiences */}
        <div>
          <h4 style={{ fontSize: '0.8rem', letterSpacing: '0.15em', fontWeight: 700, color: 'var(--accent-gold)', marginBottom: '1.5rem' }}>
            EXPERIENCES
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            <li><a href="#packages">Intimate Weddings</a></li>
            <li><a href="#packages">Signature Celebrations</a></li>
            <li><a href="#packages">Destination Royal</a></li>
            <li><a href="#portfolio">Cinematic Wedding Films</a></li>
            <li><a href="#portfolio">Pre-Wedding Stories</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 style={{ fontSize: '0.8rem', letterSpacing: '0.15em', fontWeight: 700, color: 'var(--accent-gold)', marginBottom: '1.5rem' }}>
            CONTACT DETAILS
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}><Phone size={14} color="#C69B66" /> +91 70341 77708</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}><Mail size={14} color="#C69B66" /> hello@brownlightmedia.com</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}><MapPin size={14} color="#C69B66" /> Kerala, India & Worldwide</li>
          </ul>
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--border-dark)', padding: '2rem 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <p>© 2026 Brownlight Media. All Rights Reserved.</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
