import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const domeImages = [
  { src: '/assets/images/hero.jpg', title: 'Royal Udaipur Vows', tag: 'Destination' },
  { src: '/assets/images/about.jpg', title: 'Candid Laughter', tag: 'Emotional' },
  { src: '/assets/images/portfolio1.jpg', title: 'Sunset Serenade', tag: 'Pre-Wedding' },
  { src: '/assets/images/portfolio2.jpg', title: 'Haldi Celebration', tag: 'Traditional' },
  { src: '/assets/images/portfolio3.jpg', title: 'Palace Night Mandap', tag: 'Royal' },
  { src: '/assets/images/film.jpg', title: 'Cinematic Moments', tag: 'Film Frame' },
];

export default function DomeGallery() {
  const [rotateY, setRotateY] = useState(0);

  return (
    <section className="dome-gallery-section section-padding" id="vault">
      <div className="container" style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <span className="section-tag">
          <Sparkles size={14} style={{ display: 'inline', marginRight: '0.4rem', verticalAlign: 'middle' }} />
          3D SPHERICAL VAULT
        </span>
        <h2 className="section-title" style={{ color: '#fff' }}>Interactive 3D Dome Gallery</h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '550px', margin: '0.8rem auto 0' }}>
          Drag or move your mouse across the vault to explore our 3D spherical wedding archive.
        </p>
      </div>

      <div 
        className="dome-container"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          setRotateY(x * 0.08);
        }}
      >
        <motion.div 
          className="dome-sphere"
          style={{ transform: `rotateY(${rotateY}deg)` }}
          transition={{ type: 'spring', stiffness: 80, damping: 20 }}
        >
          {domeImages.map((img, i) => {
            const angle = (i / domeImages.length) * 360;
            const radius = 380;
            return (
              <motion.div
                key={i}
                className="dome-item"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                }}
                whileHover={{ scale: 1.1, zIndex: 100 }}
              >
                <img src={img.src} alt={img.title} />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  inset: 'auto 0 0 0',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
                  padding: '1rem',
                  color: '#fff'
                }}>
                  <span style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: 'var(--accent-gold)', fontWeight: 700 }}>
                    {img.tag}
                  </span>
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 500 }}>
                    {img.title}
                  </h4>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
