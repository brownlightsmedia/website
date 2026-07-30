import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play, MapPin, ChevronDown } from 'lucide-react';

export default function Hero({ onOpenVideo }) {

  return (
    <section className="hero-section" id="hero" style={{
      position: 'relative',
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      paddingTop: '6rem',
      paddingBottom: '3rem',
      color: '#FFFFFF'
    }}>
      {/* Full-Bleed Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 1
        }}
      >
        <source src="/website/assets/video/hero-bg-compressed.mp4" type="video/mp4" />
      </video>

      {/* Translucent Dark Gradient Overlay for Readability */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, rgba(18, 18, 18, 0.65) 0%, rgba(18, 18, 18, 0.45) 50%, rgba(18, 18, 18, 0.85) 100%)',
        zIndex: 2
      }} />

      <div className="container" style={{
        position: 'relative',
        zIndex: 3,
        textAlign: 'center',
        maxWidth: '900px',
        margin: '0 auto',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <span className="section-tag" style={{ color: '#F5E6D3', letterSpacing: '0.35em' }}>
            WHO DARE TO LOVE
          </span>

          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(3.8rem, 7.5vw, 6.5rem)',
            lineHeight: 1.02,
            margin: '1.2rem 0 1.8rem',
            fontWeight: 400,
            color: '#FFFFFF',
            letterSpacing: '-0.02em',
            textShadow: '0 4px 20px rgba(0,0,0,0.5)'
          }}>
            Crafting Timeless <br />
            <span style={{ fontStyle: 'italic', color: '#F5E6D3' }}>Wedding Stories.</span>
          </h1>

          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '1.15rem',
            color: 'rgba(255, 255, 255, 0.9)',
            maxWidth: '640px',
            margin: '0 auto 2.8rem',
            lineHeight: 1.7,
            textShadow: '0 2px 10px rgba(0,0,0,0.4)'
          }}>
            Luxury wedding photography & cinematic films for deeply passionate couples across Kerala, India & worldwide.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.4rem', flexWrap: 'wrap' }}>
            <a href="#about" className="btn btn-gold btn-large">
              EXPLORE WORK <ArrowRight size={16} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
