import React, { useState, useEffect, useRef } from 'react';
import BubbleMenu from './components/BubbleMenu';
import MobileHamburgerMenu from './components/MobileHamburgerMenu';
import Hero from './components/Hero';
import About from './components/About';
import Gallery from './components/Gallery';
import Highlights from './components/Highlights';
import StackedCards from './components/StackedCards';
import PackageBuilder from './components/PackageBuilder';
import Testimonials from './components/Testimonials';
import TransparencyContact from './components/TransparencyContact';
import Legal from './components/Legal';
import Footer from './components/Footer';
import { X, Check, Camera, Film, BookOpen, Sliders, Palette, Heart, MapPin, Calendar } from 'lucide-react';

export default function App() {
  const [activePageIndex, setActivePageIndex] = useState(0);

  // Global Root Modals State (Outside 3D Transformed Containers)
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState('Signature Package');

  const [lightboxPhoto, setLightboxPhoto] = useState(null);
  const [videoModal, setVideoModal] = useState(null);
  const [selectedStory, setSelectedStory] = useState(null);
  const [customizerModalOpen, setCustomizerModalOpen] = useState(false);
  const [isDesignerInquiryStage, setIsDesignerInquiryStage] = useState(false);
  const [designerInquiryForm, setDesignerInquiryForm] = useState({ name: '', email: '', phone: '', date: '', details: '' });

  const [editingTier, setEditingTier] = useState('Signature');
  const [activeCustomizerWeddingStyle, setActiveCustomizerWeddingStyle] = useState('hindu');
  const [editingCrewSession, setEditingCrewSession] = useState(null);

  // Bespoke Customizer Internal State
  const [sessions, setSessions] = useState({
    session1: { enabled: true, photo: 1, video: 1 },
    session2: { enabled: true, photo: 1, video: 1 },
    session3: { enabled: true, photo: 1, video: 1 }
  });

  const getSessionLabels = (style) => {
    if (style === 'christian') return { session1: 'Engagement', session2: 'Pre-Wedding', session3: 'Wedding Day' };
    if (style === 'muslim') return { session1: 'Haldi', session2: 'Mehendi', session3: 'Wedding Day' };
    return { session1: 'Engagement', session2: 'Wedding Eve', session3: 'Wedding Day' };
  };
  const sessionLabels = getSessionLabels(activeCustomizerWeddingStyle);

  const [features, setFeatures] = useState({
    drone: false,
    aiSharing: false,
    livestream: false,
    prewedCinema: false
  });

  const [deliverables, setDeliverables] = useState({
    album: true,
    albumPages: '80 Pages',
    teaser: true,
    fullFilm: false,
    reels: false,
    miniAlbums: false,
    retouchedPhotos: '250 Retouched Highlights'
  });

  const [addons, setAddons] = useState({
    extraAlbum: false,
    proEditing: true,
    sdeTeaser: false,
    rawFiles: false
  });

  const isTransitioningRef = useRef(false);
  const pageRefs = useRef([]);
  const pagesCount = 8;

  // Turn Sketchbook Page (rotateX vertical portrait flip engine)
  const turnSketchbookPageTo = (targetIdx) => {
    if (targetIdx < 0 || targetIdx >= pagesCount || targetIdx === activePageIndex || isTransitioningRef.current) return;

    isTransitioningRef.current = true;
    setActivePageIndex(targetIdx);

    if (pageRefs.current[targetIdx]) {
      pageRefs.current[targetIdx].scrollTop = 0;
    }

    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 850);
  };

  // Handle Wheel and Touch Scroll for 3D Sketchbook Turning
  useEffect(() => {
    let lastWheelTime = 0;
    let touchStartY = 0;

    const handleWheel = (e) => {
      if (document.querySelector('.modal.active') || document.querySelector('.lightbox-content') || document.querySelector('.gallery-album-active')) return;
      const currentPageEl = pageRefs.current[activePageIndex];
      if (!currentPageEl) return;

      const now = Date.now();
      if (now - lastWheelTime < 600) return;

      const isAtBottom = currentPageEl.scrollHeight - currentPageEl.scrollTop <= currentPageEl.clientHeight + 15;
      const isAtTop = currentPageEl.scrollTop <= 5;

      if (e.deltaY > 30 && isAtBottom) {
        if (activePageIndex < pagesCount - 1) {
          lastWheelTime = now;
          turnSketchbookPageTo(activePageIndex + 1);
        }
      } else if (e.deltaY < -30 && isAtTop) {
        if (activePageIndex > 0) {
          lastWheelTime = now;
          turnSketchbookPageTo(activePageIndex - 1);
        }
      }
    };

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (document.querySelector('.modal.active') || document.querySelector('.lightbox-content') || document.querySelector('.gallery-album-active')) return;
      const currentPageEl = pageRefs.current[activePageIndex];
      if (!currentPageEl) return;

      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY; // Positive means swipe up (scroll down)
      
      const now = Date.now();
      if (now - lastWheelTime < 600) return;

      const isAtBottom = currentPageEl.scrollHeight - currentPageEl.scrollTop <= currentPageEl.clientHeight + 15;
      const isAtTop = currentPageEl.scrollTop <= 5;

      // Swipe Up (deltaY > 50) at bottom of page
      if (deltaY > 50 && isAtBottom) {
        if (activePageIndex < pagesCount - 1) {
          lastWheelTime = now;
          turnSketchbookPageTo(activePageIndex + 1);
        }
      } 
      // Swipe Down (deltaY < -50) at top of page
      else if (deltaY < -50 && isAtTop) {
        if (activePageIndex > 0) {
          lastWheelTime = now;
          turnSketchbookPageTo(activePageIndex - 1);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [activePageIndex]);

  // Handle Keyboard Arrows for 3D Sketchbook Turning
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (document.querySelector('.modal.active') || document.querySelector('.lightbox-content') || document.querySelector('.gallery-album-active')) return;
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        if (activePageIndex < pagesCount - 1) {
          turnSketchbookPageTo(activePageIndex + 1);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        if (activePageIndex > 0) {
          turnSketchbookPageTo(activePageIndex - 1);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePageIndex]);

  const handleOpenBooking = (expTitle) => {
    setSelectedExperience(expTitle || 'Signature Package');
    setBookingModalOpen(true);
  };

  const openDesignerForTier = (tierName, style = 'hindu') => {
    setIsDesignerInquiryStage(false);
    setDesignerInquiryForm({ name: '', email: '', phone: '', date: '', details: '' });
    setEditingTier(tierName);
    setActiveCustomizerWeddingStyle(style);
    if (tierName === 'Silver') {
      setSessions({ session1: { enabled: false, photo: 1, video: 1 }, session2: { enabled: true, photo: 1, video: 1 }, session3: { enabled: true, photo: 1, video: 1 } });
      setDeliverables({ album: true, albumPages: '80 Pages', teaser: true, fullFilm: false, reels: false, miniAlbums: false, retouchedPhotos: '250 Retouched Highlights' });
    } else if (tierName === 'Diamond') {
      setSessions({ session1: { enabled: true, photo: 1, video: 1 }, session2: { enabled: true, photo: 2, video: 2 }, session3: { enabled: true, photo: 2, video: 2 } });
      setDeliverables({ album: true, albumPages: '140 Pages Luxury Printed Album', teaser: true, fullFilm: true, reels: true, miniAlbums: true, retouchedPhotos: '750+ Retouched Highlights' });
    } else {
      setSessions({ session1: { enabled: false, photo: 1, video: 1 }, session2: { enabled: true, photo: 1, video: 1 }, session3: { enabled: true, photo: 1, video: 1 } });
      setDeliverables({ album: true, albumPages: '120 Pages Luster Printed Album with Box', teaser: true, fullFilm: true, reels: false, miniAlbums: false, retouchedPhotos: '500 Retouched Highlights' });
    }
    setCustomizerModalOpen(true);
  };

  const toggleSession = (key) => {
    setSessions(prev => ({
      ...prev,
      [key]: { ...prev[key], enabled: !prev[key].enabled }
    }));
  };

  const updateCrewCount = (sessionKey, type, delta) => {
    setSessions(prev => ({
      ...prev,
      [sessionKey]: {
        ...prev[sessionKey],
        [type]: Math.max(0, prev[sessionKey][type] + delta)
      }
    }));
  };

  const totalCrewMembers = (sessions.session1.enabled ? sessions.session1.photo + sessions.session1.video : 0) +
    (sessions.session2.enabled ? sessions.session2.photo + sessions.session2.video : 0) +
    (sessions.session3.enabled ? sessions.session3.photo + sessions.session3.video : 0);

  const handleSaveConfiguration = () => {
    setIsDesignerInquiryStage(true);
  };

  const handleDesignerInquirySubmit = (e) => {
    e.preventDefault();
    const activeCrewList = [];
    if (sessions.session1.enabled) activeCrewList.push(`${sessionLabels.session1}: ${sessions.session1.photo} Photo + ${sessions.session1.video} Cinema`);
    if (sessions.session2.enabled) activeCrewList.push(`${sessionLabels.session2}: ${sessions.session2.photo} Photo + ${sessions.session2.video} Cinema`);
    if (sessions.session3.enabled) activeCrewList.push(`${sessionLabels.session3}: ${sessions.session3.photo} Photo + ${sessions.session3.video} Cinema`);

    const activeAddonsList = [];
    if (features.drone) activeAddonsList.push('Aerial Drone Cinema');
    if (features.aiSharing) activeAddonsList.push('AI Instant QR Sharing');
    if (features.livestream) activeAddonsList.push('Live Broadcast Feed');
    if (features.prewedCinema) activeAddonsList.push('Pre-Wedding Cinema');
    if (addons.extraAlbum) activeAddonsList.push('Extra Printed Album');
    if (addons.proEditing) activeAddonsList.push('Pro Cinema Color Editing');
    if (addons.sdeTeaser) activeAddonsList.push('Same-Day Edit (SDE) Teaser');
    if (addons.rawFiles) activeAddonsList.push('RAW Digital Files License');

    const activeDeliverablesList = [];
    if (deliverables.album) activeDeliverablesList.push(`${deliverables.albumPages} Printed Album`);
    if (deliverables.teaser) activeDeliverablesList.push('2-3 Min Cinema Teaser');
    if (deliverables.fullFilm) activeDeliverablesList.push('Full HD Film');
    if (deliverables.reels) activeDeliverablesList.push('Instagram & WhatsApp Reels');
    if (deliverables.miniAlbums) activeDeliverablesList.push('Mini Printed Albums');

    const msg = `Hello Brownlight Media! Here is my Bespoke Package Configuration:

📝 *Client Details:*
- Name: ${designerInquiryForm.name}
- Email: ${designerInquiryForm.email}
- Phone: ${designerInquiryForm.phone}
- Date: ${designerInquiryForm.date}
- Details: ${designerInquiryForm.details}

🏆 *Configured Tier:* ${editingTier} Package
👥 *Total Crew Members:* ${totalCrewMembers}
📷 *Crew Breakdown:*
 ${activeCrewList.map(c => ` - ${c}`).join('\n')}

✨ *Enabled Features & Premium Add-ons:* ${activeAddonsList.join(', ') || 'None'}
🎁 *Selected Deliverables:* ${activeDeliverablesList.join(', ') || 'None'}
🎨 *Retouched Photos:* ${deliverables.retouchedPhotos}`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/919876543210?text=${encoded}`, '_blank');
    setCustomizerModalOpen(false);
    setIsDesignerInquiryStage(false);
  };

  const getPageClass = (idx) => {
    if (idx === activePageIndex) return 'sketchbook-page page-active';
    if (idx < activePageIndex) return 'sketchbook-page page-prev';
    return 'sketchbook-page page-next';
  };

  return (
    <div className="app-container" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', width: '100vw' }}>

      {/* Fixed Top Left Logo */}
      <div className="logo-container">
        <img src="/website/assets/images/logo.png" alt="Brownlight Media" className="logo-img" />
      </div>

      {/* Floating Capsule Top Navbar */}
      <BubbleMenu 
        activePageIndex={activePageIndex}
        onNavigate={(idx) => turnSketchbookPageTo(idx)}
        onOpenBooking={handleOpenBooking} 
      />
      
      {/* Mobile Hamburger Navbar */}
      <MobileHamburgerMenu 
        activePageIndex={activePageIndex}
        onNavigate={(idx) => turnSketchbookPageTo(idx)}
        onOpenBooking={handleOpenBooking}
        navItems={[
          { label: 'HOME', href: '#hero' },
          { label: 'ABOUT', href: '#about' },
          { label: 'GALLERY', href: '#gallery' },
          { label: 'HIGHLIGHTS', href: '#highlights' },
          { label: 'PACKAGES', href: '#packages' },
          { label: 'REACTIONS', href: '#testimonials' },
          { label: 'CONTACT', href: '#contact' },
          { label: 'LEGAL', href: '#legal' }
        ]}
      />

      {/* 3D Portrait Sketchbook Viewport */}
      <div className="sketchbook-viewport">
        {/* Page 0: HOME */}
        <div ref={el => pageRefs.current[0] = el} className={getPageClass(0)}>
          <Hero onOpenVideo={() => setVideoModal({ title: 'Brownlight Media Showreel', url: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1' })} />
        </div>

        {/* Page 1: ABOUT */}
        <div ref={el => pageRefs.current[1] = el} className={getPageClass(1)}>
          <About />
        </div>

        {/* Page 2: GALLERY */}
        <div ref={el => pageRefs.current[2] = el} className={getPageClass(2)}>
          <Gallery onOpenLightbox={(photo) => setLightboxPhoto(photo)} />
        </div>

        {/* Page 3: HIGHLIGHTS */}
        <div ref={el => pageRefs.current[3] = el} className={getPageClass(3)}>
          <Highlights onOpenVideo={(film) => setVideoModal(film)} />
        </div>

        {/* Page 4: PACKAGES */}
        <div ref={el => pageRefs.current[4] = el} className={getPageClass(4)}>
          <PackageBuilder onNavigateToContact={() => turnSketchbookPageTo(6)} />
        </div>

        {/* Page 5: REACTIONS */}
        <div ref={el => pageRefs.current[5] = el} className={getPageClass(5)}>
          <Testimonials />
        </div>

        {/* Page 6: CONTACT */}
        <div ref={el => pageRefs.current[6] = el} className={getPageClass(6)}>
          <TransparencyContact />
        </div>

        {/* Page 7: LEGAL & FOOTER */}
        <div ref={el => pageRefs.current[7] = el} className={getPageClass(7)}>
          <Legal />
          <Footer />
        </div>
      </div>

      {/* ==========================================================================
          GLOBAL ROOT MODALS (ALWAYS PERFECTLY CENTERED RELATIVE TO SCREEN VIEWPORT)
         ========================================================================== */}

      {/* 1. GALLERY LIGHTBOX MODAL */}
      {lightboxPhoto && (
        <div className="modal active">
          <div className="modal-backdrop" onClick={() => setLightboxPhoto(null)}></div>
          <div className="lightbox-content">
            <button className="modal-close" onClick={() => setLightboxPhoto(null)}>
              <X size={20} />
            </button>
            <img src={lightboxPhoto.src} alt={lightboxPhoto.title} />
            <div className="lightbox-caption">
              {lightboxPhoto.title} — {lightboxPhoto.location}
            </div>
          </div>
        </div>
      )}

      {/* 2. CINEMA VIDEO MODAL */}
      {videoModal && (
        <div className="modal active">
          <div className="modal-backdrop" onClick={() => setVideoModal(null)}></div>
          <div className="modal-content video-modal-content" style={{ maxWidth: '1000px', width: '90%', padding: '0', background: 'transparent' }}>
            <button className="modal-close" onClick={() => setVideoModal(null)} style={{ zIndex: 10, color: '#fff', top: '-40px', right: '0' }}>
              <X size={32} />
            </button>
            <div className="iframe-container" style={{ position: 'relative', background: '#000', borderRadius: '12px', overflow: 'hidden' }}>
              {videoModal.url?.match(/\.(mp4|mov)$/i) ? (
                <video 
                  src={videoModal.url}
                  controls
                  autoPlay
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain' }}
                />
              ) : (
                <iframe
                  src={videoModal.url || 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1'}
                  title={videoModal.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                ></iframe>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3. STORY DETAILS MODAL */}
      {selectedStory && (
        <div className="modal active">
          <div className="modal-backdrop" onClick={() => setSelectedStory(null)}></div>
          <div className="modal-content" style={{ maxWidth: '720px' }}>
            <button className="modal-close" onClick={() => setSelectedStory(null)}>
              <X size={20} />
            </button>

            <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', height: '300px', marginBottom: '1.5rem' }}>
              <img src={selectedStory.image} alt={selectedStory.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <span className="section-tag">{selectedStory.category}</span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', marginBottom: '0.4rem' }}>{selectedStory.couple}</h2>
            <h4 style={{ fontSize: '1.1rem', color: 'var(--accent-gold)', marginBottom: '1rem' }}>{selectedStory.title} — {selectedStory.location}</h4>

            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              {selectedStory.storyExcerpt} We captured over 2,500 raw frames across the ceremony days, curating an heirloom collection of candid emotions, architectural portraits, and family moments.
            </p>

            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', padding: '1.2rem 1.5rem', marginBottom: '1.8rem' }}>
              <h4 style={{ fontSize: '0.82rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>
                Commissioned Deliverables
              </h4>
              <ul style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {selectedStory.features.map((feat, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <BookOpen size={14} color="#C69B66" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button className="btn btn-gold full-width" onClick={() => setSelectedStory(null)}>
              CLOSE STORY
            </button>
          </div>
        </div>
      )}

      {/* 4. BESPOKE PACKAGE DESIGNER MODAL */}
      {customizerModalOpen && (
        <div className="modal active">
          <div className="modal-backdrop" onClick={() => setCustomizerModalOpen(false)}></div>
          
          <div className="modal-content" style={{
            maxWidth: '1080px',
            width: '95%',
            background: '#0D0C10',
            color: '#FFFFFF',
            borderRadius: '16px',
            padding: '2.5rem',
            boxShadow: '0 30px 90px rgba(0,0,0,0.8)',
            border: '1px solid rgba(255,255,255,0.12)',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <button className="modal-close" onClick={() => setCustomizerModalOpen(false)} style={{ color: 'rgba(255,255,255,0.8)' }}>
              <X size={20} />
            </button>

            {/* Header */}
            <div style={{ marginBottom: '2.5rem' }}>
              <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.4rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#F5E6D3', marginBottom: '0.2rem' }}>
                {isDesignerInquiryStage ? 'FINALIZE YOUR INQUIRY' : 'BESPOKE PACKAGE DESIGNER'}
              </h2>
              <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)' }}>
                {isDesignerInquiryStage ? 'Please provide your details so we can assist you with your personalized package.' : 'Design your ideal crew and select physical/digital deliverables to suit your budget.'}
              </p>
            </div>

            {isDesignerInquiryStage ? (
              <form onSubmit={handleDesignerInquirySubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
                <input type="text" className="form-input" placeholder="Your Full Name *" required 
                       value={designerInquiryForm.name} onChange={(e) => setDesignerInquiryForm({...designerInquiryForm, name: e.target.value})} />
                <input type="email" className="form-input" placeholder="Email Address *" required 
                       value={designerInquiryForm.email} onChange={(e) => setDesignerInquiryForm({...designerInquiryForm, email: e.target.value})} />
                <input type="tel" className="form-input" placeholder="WhatsApp Phone Number *" required 
                       value={designerInquiryForm.phone} onChange={(e) => setDesignerInquiryForm({...designerInquiryForm, phone: e.target.value})} />
                <input type="date" className="form-input" required
                       value={designerInquiryForm.date} onChange={(e) => setDesignerInquiryForm({...designerInquiryForm, date: e.target.value})} />
                <textarea className="form-input" rows="3" placeholder="Tell us about your wedding location & vision..."
                       value={designerInquiryForm.details} onChange={(e) => setDesignerInquiryForm({...designerInquiryForm, details: e.target.value})}></textarea>
                
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                  <button type="button" className="btn btn-outline" onClick={() => setIsDesignerInquiryStage(false)} style={{ flex: 1, borderColor: 'rgba(255,255,255,0.3)', color: '#FFF' }}>
                    BACK
                  </button>
                  <button type="submit" className="btn btn-gold" style={{ flex: 2 }}>
                    SEND WHATSAPP INQUIRY
                  </button>
                </div>
              </form>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '2.5rem', alignItems: 'start' }}>

                {/* LEFT COLUMN: SECTIONS 1, 2, 3, 4 */}
              <div>

                {/* SECTION 1: VISUAL CURATION CREW */}
                <div style={{ marginBottom: '2.5rem' }}>
                  <div style={{ marginBottom: '1.2rem' }}>
                    <h3 style={{ fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FFFFFF' }}>
                      1. VISUAL CURATION CREW
                    </h3>
                    <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>
                      Configure the photography & cinematography crew for each session day.
                    </p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.8rem' }}>
                    {/* Session 1 */}
                    <div style={{
                      background: sessions.session1.enabled ? 'rgba(198, 155, 102, 0.08)' : 'rgba(255,255,255,0.03)',
                      border: sessions.session1.enabled ? '1px solid #C69B66' : '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      padding: '1rem 1.2rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }} onClick={() => toggleSession('session1')}>
                        <div style={{ width: '18px', height: '18px', borderRadius: '3px', border: sessions.session1.enabled ? 'none' : '1px solid rgba(255,255,255,0.3)', background: sessions.session1.enabled ? '#C69B66' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {sessions.session1.enabled && <Check size={12} color="#000" />}
                        </div>
                        <div>
                          <strong style={{ fontSize: '0.92rem', color: '#FFF' }}>{sessionLabels.session1}</strong>
                          <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)', marginTop: '2px' }}>
                            {sessions.session1.photo} Photographer + {sessions.session1.video} Videographer
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setEditingCrewSession(editingCrewSession === 'session1' ? null : 'session1')}
                        style={{
                          background: 'transparent',
                          border: '1px solid rgba(198, 155, 102, 0.6)',
                          color: '#F5E6D3',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          letterSpacing: '0.1em',
                          padding: '0.4rem 0.8rem',
                          borderRadius: '30px',
                          cursor: 'pointer'
                        }}
                      >
                        EDIT
                      </button>
                    </div>

                    {editingCrewSession === 'session1' && (
                      <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.8rem 1.2rem', borderRadius: '6px', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem' }}>
                          <span>Photos:</span>
                          <button type="button" onClick={() => updateCrewCount('session1', 'photo', -1)} style={{ width: '24px', height: '24px' }}>-</button>
                          <strong>{sessions.session1.photo}</strong>
                          <button type="button" onClick={() => updateCrewCount('session1', 'photo', 1)} style={{ width: '24px', height: '24px' }}>+</button>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem' }}>
                          <span>Videos:</span>
                          <button type="button" onClick={() => updateCrewCount('session1', 'video', -1)} style={{ width: '24px', height: '24px' }}>-</button>
                          <strong>{sessions.session1.video}</strong>
                          <button type="button" onClick={() => updateCrewCount('session1', 'video', 1)} style={{ width: '24px', height: '24px' }}>+</button>
                        </div>
                      </div>
                    )}

                    {/* Session 2 */}
                    <div style={{
                      background: sessions.session2.enabled ? 'rgba(198, 155, 102, 0.08)' : 'rgba(255,255,255,0.03)',
                      border: sessions.session2.enabled ? '1px solid #C69B66' : '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      padding: '1rem 1.2rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }} onClick={() => toggleSession('session2')}>
                        <div style={{ width: '18px', height: '18px', borderRadius: '3px', border: sessions.session2.enabled ? 'none' : '1px solid rgba(255,255,255,0.3)', background: sessions.session2.enabled ? '#C69B66' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {sessions.session2.enabled && <Check size={12} color="#000" />}
                        </div>
                        <div>
                          <strong style={{ fontSize: '0.92rem', color: '#FFF' }}>{sessionLabels.session2}</strong>
                          <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)', marginTop: '2px' }}>
                            {sessions.session2.photo} Photographer + {sessions.session2.video} Videographer
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setEditingCrewSession(editingCrewSession === 'session2' ? null : 'session2')}
                        style={{
                          background: 'transparent',
                          border: '1px solid rgba(198, 155, 102, 0.6)',
                          color: '#F5E6D3',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          letterSpacing: '0.1em',
                          padding: '0.4rem 0.8rem',
                          borderRadius: '30px',
                          cursor: 'pointer'
                        }}
                      >
                        EDIT
                      </button>
                    </div>

                    {editingCrewSession === 'session2' && (
                      <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.8rem 1.2rem', borderRadius: '6px', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem' }}>
                          <span>Photos:</span>
                          <button type="button" onClick={() => updateCrewCount('session2', 'photo', -1)} style={{ width: '24px', height: '24px' }}>-</button>
                          <strong>{sessions.session2.photo}</strong>
                          <button type="button" onClick={() => updateCrewCount('session2', 'photo', 1)} style={{ width: '24px', height: '24px' }}>+</button>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem' }}>
                          <span>Videos:</span>
                          <button type="button" onClick={() => updateCrewCount('session2', 'video', -1)} style={{ width: '24px', height: '24px' }}>-</button>
                          <strong>{sessions.session2.video}</strong>
                          <button type="button" onClick={() => updateCrewCount('session2', 'video', 1)} style={{ width: '24px', height: '24px' }}>+</button>
                        </div>
                      </div>
                    )}

                    {/* Session 3 */}
                    <div style={{
                      background: sessions.session3.enabled ? 'rgba(198, 155, 102, 0.08)' : 'rgba(255,255,255,0.03)',
                      border: sessions.session3.enabled ? '1px solid #C69B66' : '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      padding: '1rem 1.2rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }} onClick={() => toggleSession('session3')}>
                        <div style={{ width: '18px', height: '18px', borderRadius: '3px', border: sessions.session3.enabled ? 'none' : '1px solid rgba(255,255,255,0.3)', background: sessions.session3.enabled ? '#C69B66' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {sessions.session3.enabled && <Check size={12} color="#000" />}
                        </div>
                        <div>
                          <strong style={{ fontSize: '0.92rem', color: '#FFF' }}>{sessionLabels.session3}</strong>
                          <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)', marginTop: '2px' }}>
                            {sessions.session3.photo} Photographer + {sessions.session3.video} Videographer
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setEditingCrewSession(editingCrewSession === 'session3' ? null : 'session3')}
                        style={{
                          background: 'transparent',
                          border: '1px solid rgba(198, 155, 102, 0.6)',
                          color: '#F5E6D3',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          letterSpacing: '0.1em',
                          padding: '0.4rem 0.8rem',
                          borderRadius: '30px',
                          cursor: 'pointer'
                        }}
                      >
                        EDIT
                      </button>
                    </div>

                    {editingCrewSession === 'session3' && (
                      <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.8rem 1.2rem', borderRadius: '6px', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem' }}>
                          <span>Photos:</span>
                          <button type="button" onClick={() => updateCrewCount('session3', 'photo', -1)} style={{ width: '24px', height: '24px' }}>-</button>
                          <strong>{sessions.session3.photo}</strong>
                          <button type="button" onClick={() => updateCrewCount('session3', 'photo', 1)} style={{ width: '24px', height: '24px' }}>+</button>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem' }}>
                          <span>Videos:</span>
                          <button type="button" onClick={() => updateCrewCount('session3', 'video', -1)} style={{ width: '24px', height: '24px' }}>-</button>
                          <strong>{sessions.session3.video}</strong>
                          <button type="button" onClick={() => updateCrewCount('session3', 'video', 1)} style={{ width: '24px', height: '24px' }}>+</button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* SECTION 2: PREMIUM CURATION FEATURES */}
                <div style={{ marginBottom: '2.5rem' }}>
                  <div style={{ marginBottom: '1.2rem' }}>
                    <h3 style={{ fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FFFFFF' }}>
                      2. PREMIUM CURATION FEATURES
                    </h3>
                    <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>
                      Select high-end components to upgrade your visual outputs.
                    </p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.9rem' }}>
                    <div
                      onClick={() => setFeatures({ ...features, drone: !features.drone })}
                      style={{
                        background: features.drone ? 'rgba(198, 155, 102, 0.08)' : 'rgba(255,255,255,0.03)',
                        border: features.drone ? '1px solid #C69B66' : '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        padding: '1rem',
                        cursor: 'pointer',
                        display: 'flex',
                        gap: '0.8rem'
                      }}
                    >
                      <div style={{ width: '16px', height: '16px', borderRadius: '3px', marginTop: '2px', border: features.drone ? 'none' : '1px solid rgba(255,255,255,0.3)', background: features.drone ? '#C69B66' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {features.drone && <Check size={12} color="#000" />}
                      </div>
                      <div>
                        <strong style={{ fontSize: '0.85rem', color: '#FFF' }}>Aerial Drone Cinema</strong>
                        <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>4K aerial visual sweeping angles.</div>
                      </div>
                    </div>

                    <div
                      onClick={() => setFeatures({ ...features, aiSharing: !features.aiSharing })}
                      style={{
                        background: features.aiSharing ? 'rgba(198, 155, 102, 0.08)' : 'rgba(255,255,255,0.03)',
                        border: features.aiSharing ? '1px solid #C69B66' : '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        padding: '1rem',
                        cursor: 'pointer',
                        display: 'flex',
                        gap: '0.8rem'
                      }}
                    >
                      <div style={{ width: '16px', height: '16px', borderRadius: '3px', marginTop: '2px', border: features.aiSharing ? 'none' : '1px solid rgba(255,255,255,0.3)', background: features.aiSharing ? '#C69B66' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {features.aiSharing && <Check size={12} color="#000" />}
                      </div>
                      <div>
                        <strong style={{ fontSize: '0.85rem', color: '#FFF' }}>AI Instant QR Sharing</strong>
                        <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>Guests scan QR to grab photos via facial matching.</div>
                      </div>
                    </div>

                    <div
                      onClick={() => setFeatures({ ...features, livestream: !features.livestream })}
                      style={{
                        background: features.livestream ? 'rgba(198, 155, 102, 0.08)' : 'rgba(255,255,255,0.03)',
                        border: features.livestream ? '1px solid #C69B66' : '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        padding: '1rem',
                        cursor: 'pointer',
                        display: 'flex',
                        gap: '0.8rem'
                      }}
                    >
                      <div style={{ width: '16px', height: '16px', borderRadius: '3px', marginTop: '2px', border: features.livestream ? 'none' : '1px solid rgba(255,255,255,0.3)', background: features.livestream ? '#C69B66' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {features.livestream && <Check size={12} color="#000" />}
                      </div>
                      <div>
                        <strong style={{ fontSize: '0.85rem', color: '#FFF' }}>Live Broadcast Feed</strong>
                        <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>Private streaming broadcast for global family.</div>
                      </div>
                    </div>

                    <div
                      onClick={() => setFeatures({ ...features, prewedCinema: !features.prewedCinema })}
                      style={{
                        background: features.prewedCinema ? 'rgba(198, 155, 102, 0.08)' : 'rgba(255,255,255,0.03)',
                        border: features.prewedCinema ? '1px solid #C69B66' : '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        padding: '1rem',
                        cursor: 'pointer',
                        display: 'flex',
                        gap: '0.8rem'
                      }}
                    >
                      <div style={{ width: '16px', height: '16px', borderRadius: '3px', marginTop: '2px', border: features.prewedCinema ? 'none' : '1px solid rgba(255,255,255,0.3)', background: features.prewedCinema ? '#C69B66' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {features.prewedCinema && <Check size={12} color="#000" />}
                      </div>
                      <div>
                        <strong style={{ fontSize: '0.85rem', color: '#FFF' }}>Pre-Wedding Cinema</strong>
                        <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>Creative cinema concept session before event.</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SECTION 3: CURATION DELIVERABLES */}
                <div style={{ marginBottom: '2.5rem' }}>
                  <div style={{ marginBottom: '1.2rem' }}>
                    <h3 style={{ fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FFFFFF' }}>
                      3. CURATION DELIVERABLES
                    </h3>
                    <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>
                      Choose the physical and digital keepsakes for your packages.
                    </p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.9rem', marginBottom: '1.5rem' }}>
                    <div
                      onClick={() => setDeliverables({ ...deliverables, album: !deliverables.album })}
                      style={{
                        background: deliverables.album ? 'rgba(198, 155, 102, 0.08)' : 'rgba(255,255,255,0.03)',
                        border: deliverables.album ? '1px solid #C69B66' : '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        padding: '1rem',
                        cursor: 'pointer',
                        display: 'flex',
                        gap: '0.8rem'
                      }}
                    >
                      <div style={{ width: '16px', height: '16px', borderRadius: '3px', marginTop: '2px', border: deliverables.album ? 'none' : '1px solid rgba(255,255,255,0.3)', background: deliverables.album ? '#C69B66' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {deliverables.album && <Check size={12} color="#000" />}
                      </div>
                      <div>
                        <strong style={{ fontSize: '0.85rem', color: '#FFF' }}>Printed Heirloom Album</strong>
                        <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>{deliverables.albumPages} Printed Album.</div>
                      </div>
                    </div>

                    <div
                      onClick={() => setDeliverables({ ...deliverables, teaser: !deliverables.teaser })}
                      style={{
                        background: deliverables.teaser ? 'rgba(198, 155, 102, 0.08)' : 'rgba(255,255,255,0.03)',
                        border: deliverables.teaser ? '1px solid #C69B66' : '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        padding: '1rem',
                        cursor: 'pointer',
                        display: 'flex',
                        gap: '0.8rem'
                      }}
                    >
                      <div style={{ width: '16px', height: '16px', borderRadius: '3px', marginTop: '2px', border: deliverables.teaser ? 'none' : '1px solid rgba(255,255,255,0.3)', background: deliverables.teaser ? '#C69B66' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {deliverables.teaser && <Check size={12} color="#000" />}
                      </div>
                      <div>
                        <strong style={{ fontSize: '0.85rem', color: '#FFF' }}>2-3 Min Cinema Teaser</strong>
                        <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>Social-sharing cut delivered in 14 days.</div>
                      </div>
                    </div>

                    <div
                      onClick={() => setDeliverables({ ...deliverables, fullFilm: !deliverables.fullFilm })}
                      style={{
                        background: deliverables.fullFilm ? 'rgba(198, 155, 102, 0.08)' : 'rgba(255,255,255,0.03)',
                        border: deliverables.fullFilm ? '1px solid #C69B66' : '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        padding: '1rem',
                        cursor: 'pointer',
                        display: 'flex',
                        gap: '0.8rem'
                      }}
                    >
                      <div style={{ width: '16px', height: '16px', borderRadius: '3px', marginTop: '2px', border: deliverables.fullFilm ? 'none' : '1px solid rgba(255,255,255,0.3)', background: deliverables.fullFilm ? '#C69B66' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {deliverables.fullFilm && <Check size={12} color="#000" />}
                      </div>
                      <div>
                        <strong style={{ fontSize: '0.85rem', color: '#FFF' }}>Full HD Film</strong>
                        <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>Complete cinematic video assembly edit of proceedings.</div>
                      </div>
                    </div>

                    <div
                      onClick={() => setDeliverables({ ...deliverables, reels: !deliverables.reels })}
                      style={{
                        background: deliverables.reels ? 'rgba(198, 155, 102, 0.08)' : 'rgba(255,255,255,0.03)',
                        border: deliverables.reels ? '1px solid #C69B66' : '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        padding: '1rem',
                        cursor: 'pointer',
                        display: 'flex',
                        gap: '0.8rem'
                      }}
                    >
                      <div style={{ width: '16px', height: '16px', borderRadius: '3px', marginTop: '2px', border: deliverables.reels ? 'none' : '1px solid rgba(255,255,255,0.3)', background: deliverables.reels ? '#C69B66' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {deliverables.reels && <Check size={12} color="#000" />}
                      </div>
                      <div>
                        <strong style={{ fontSize: '0.85rem', color: '#FFF' }}>Instagram & WhatsApp Reels</strong>
                        <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>Fast-delivery vertical cinematic clips for social sharing.</div>
                      </div>
                    </div>

                    <div
                      onClick={() => setDeliverables({ ...deliverables, miniAlbums: !deliverables.miniAlbums })}
                      style={{
                        background: deliverables.miniAlbums ? 'rgba(198, 155, 102, 0.08)' : 'rgba(255,255,255,0.03)',
                        border: deliverables.miniAlbums ? '1px solid #C69B66' : '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        padding: '1rem',
                        cursor: 'pointer',
                        display: 'flex',
                        gap: '0.8rem'
                      }}
                    >
                      <div style={{ width: '16px', height: '16px', borderRadius: '3px', marginTop: '2px', border: deliverables.miniAlbums ? 'none' : '1px solid rgba(255,255,255,0.3)', background: deliverables.miniAlbums ? '#C69B66' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {deliverables.miniAlbums && <Check size={12} color="#000" />}
                      </div>
                      <div>
                        <strong style={{ fontSize: '0.85rem', color: '#FFF' }}>Mini Printed Albums</strong>
                        <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>Compact matching replica albums for parent gifts.</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', display: 'block', marginBottom: '0.5rem' }}>
                      RETOUCHED DIGITAL IMAGES
                    </label>
                    <select
                      value={deliverables.retouchedPhotos}
                      onChange={e => setDeliverables({ ...deliverables, retouchedPhotos: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        borderRadius: '8px',
                        color: '#FFF',
                        fontSize: '0.88rem',
                        fontFamily: 'inherit',
                        outline: 'none'
                      }}
                    >
                      <option value="0 Retouched Highlights" style={{ background: '#0D0C10', color: '#fff' }}>0 Retouched Highlights</option>
                      <option value="250 Retouched Highlights" style={{ background: '#0D0C10', color: '#fff' }}>250 Retouched Highlights</option>
                      <option value="500 Retouched Highlights" style={{ background: '#0D0C10', color: '#fff' }}>500 Retouched Highlights</option>
                      <option value="750+ Retouched Highlights" style={{ background: '#0D0C10', color: '#fff' }}>750+ Retouched Highlights</option>
                    </select>
                  </div>
                </div>

                {/* SECTION 4: EXTRA ADD-ONS & OPTIONS */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ marginBottom: '1.2rem' }}>
                    <h3 style={{ fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FFFFFF' }}>
                      4. EXTRA ADD-ONS & BESPOKE SERVICES
                    </h3>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.9rem' }}>
                    <div
                      onClick={() => setAddons({ ...addons, extraAlbum: !addons.extraAlbum })}
                      style={{
                        background: addons.extraAlbum ? 'rgba(198, 155, 102, 0.08)' : 'rgba(255,255,255,0.03)',
                        border: addons.extraAlbum ? '1px solid #C69B66' : '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        padding: '1rem',
                        cursor: 'pointer',
                        display: 'flex',
                        gap: '0.8rem'
                      }}
                    >
                      <div style={{ width: '16px', height: '16px', borderRadius: '3px', marginTop: '2px', border: addons.extraAlbum ? 'none' : '1px solid rgba(255,255,255,0.3)', background: addons.extraAlbum ? '#C69B66' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {addons.extraAlbum && <Check size={12} color="#000" />}
                      </div>
                      <div>
                        <strong style={{ fontSize: '0.85rem', color: '#FFF' }}>Extra Printed Album</strong>
                        <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>Additional designed hardbound heirloom book.</div>
                      </div>
                    </div>

                    <div
                      onClick={() => setAddons({ ...addons, proEditing: !addons.proEditing })}
                      style={{
                        background: addons.proEditing ? 'rgba(198, 155, 102, 0.08)' : 'rgba(255,255,255,0.03)',
                        border: addons.proEditing ? '1px solid #C69B66' : '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        padding: '1rem',
                        cursor: 'pointer',
                        display: 'flex',
                        gap: '0.8rem'
                      }}
                    >
                      <div style={{ width: '16px', height: '16px', borderRadius: '3px', marginTop: '2px', border: addons.proEditing ? 'none' : '1px solid rgba(255,255,255,0.3)', background: addons.proEditing ? '#C69B66' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {addons.proEditing && <Check size={12} color="#000" />}
                      </div>
                      <div>
                        <strong style={{ fontSize: '0.85rem', color: '#FFF' }}>Pro Master Color Grading</strong>
                        <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>Cinema tone grading & skin retouching.</div>
                      </div>
                    </div>

                    <div
                      onClick={() => setAddons({ ...addons, sdeTeaser: !addons.sdeTeaser })}
                      style={{
                        background: addons.sdeTeaser ? 'rgba(198, 155, 102, 0.08)' : 'rgba(255,255,255,0.03)',
                        border: addons.sdeTeaser ? '1px solid #C69B66' : '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        padding: '1rem',
                        cursor: 'pointer',
                        display: 'flex',
                        gap: '0.8rem'
                      }}
                    >
                      <div style={{ width: '16px', height: '16px', borderRadius: '3px', marginTop: '2px', border: addons.sdeTeaser ? 'none' : '1px solid rgba(255,255,255,0.3)', background: addons.sdeTeaser ? '#C69B66' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {addons.sdeTeaser && <Check size={12} color="#000" />}
                      </div>
                      <div>
                        <strong style={{ fontSize: '0.85rem', color: '#FFF' }}>Same-Day Edit (SDE) Teaser</strong>
                        <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>Screened live at the reception.</div>
                      </div>
                    </div>

                    <div
                      onClick={() => setAddons({ ...addons, rawFiles: !addons.rawFiles })}
                      style={{
                        background: addons.rawFiles ? 'rgba(198, 155, 102, 0.08)' : 'rgba(255,255,255,0.03)',
                        border: addons.rawFiles ? '1px solid #C69B66' : '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        padding: '1rem',
                        cursor: 'pointer',
                        display: 'flex',
                        gap: '0.8rem'
                      }}
                    >
                      <div style={{ width: '16px', height: '16px', borderRadius: '3px', marginTop: '2px', border: addons.rawFiles ? 'none' : '1px solid rgba(255,255,255,0.3)', background: addons.rawFiles ? '#C69B66' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {addons.rawFiles && <Check size={12} color="#000" />}
                      </div>
                      <div>
                        <strong style={{ fontSize: '0.85rem', color: '#FFF' }}>RAW Digital Files License</strong>
                        <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>Full uncompressed original camera files.</div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* RIGHT SIDEBAR: YOUR BESPOKE PACKAGE */}
              <div style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                padding: '1.8rem',
                position: 'sticky',
                top: '0'
              }}>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FFFFFF', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.8rem' }}>
                  YOUR BESPOKE PACKAGE
                </h3>

                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.6)', marginBottom: '0.6rem' }}>
                    <span>CREW COMPOSITION:</span>
                    <strong style={{ color: '#F5E6D3' }}>{totalCrewMembers} Crew Members</strong>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.78rem', color: 'rgba(255,255,255,0.8)', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    {sessions.session1.enabled && <li>• {sessionLabels.session1}: {sessions.session1.photo} Photo + {sessions.session1.video} Cinema</li>}
                    {sessions.session2.enabled && <li>• {sessionLabels.session2}: {sessions.session2.photo} Photo + {sessions.session2.video} Cinema</li>}
                    {sessions.session3.enabled && <li>• {sessionLabels.session3}: {sessions.session3.photo} Photo + {sessions.session3.video} Cinema</li>}
                  </ul>
                </div>

                <div style={{ marginBottom: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1rem' }}>
                  <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.6)', marginBottom: '0.6rem' }}>
                    SELECTED DELIVERABLES:
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.78rem', color: 'rgba(255,255,255,0.8)', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    <li>• {deliverables.retouchedPhotos}</li>
                    {deliverables.album && <li>• {deliverables.albumPages} Printed Album</li>}
                    {deliverables.teaser && <li>• 2-3 Min Cinema Teaser Reel</li>}
                    {deliverables.fullFilm && <li>• Full HD Film</li>}
                    {deliverables.reels && <li>• Instagram & WhatsApp Reels</li>}
                    {deliverables.miniAlbums && <li>• Mini Printed Albums</li>}
                  </ul>
                </div>

                <div style={{ marginBottom: '2rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1rem' }}>
                  <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.6)', marginBottom: '0.6rem' }}>
                    ENABLED PREMIUM ADD-ONS:
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.78rem', color: 'rgba(255,255,255,0.8)', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    {features.drone && <li>• Aerial Drone Cinema</li>}
                    {features.aiSharing && <li>• AI Instant QR Sharing</li>}
                    {features.livestream && <li>• Live Broadcast Feed</li>}
                    {features.prewedCinema && <li>• Pre-Wedding Cinema</li>}
                    {addons.extraAlbum && <li>• Extra Printed Album</li>}
                    {addons.proEditing && <li>• Pro Cinema Color Grading</li>}
                    {addons.sdeTeaser && <li>• Same-Day Edit Teaser</li>}
                    {addons.rawFiles && <li>• RAW Digital Files License</li>}
                    {!features.drone && !features.aiSharing && !features.livestream && !features.prewedCinema && !addons.extraAlbum && !addons.sdeTeaser && !addons.rawFiles && <li>• No extra add-ons enabled</li>}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={handleSaveConfiguration}
                  style={{
                    width: '100%',
                    padding: '0.95rem',
                    background: 'linear-gradient(135deg, #E6CA9D 0%, #C69B66 100%)',
                    color: '#0D0C10',
                    border: 'none',
                    borderRadius: '8px',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.8rem',
                    fontWeight: 800,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    boxShadow: '0 8px 25px rgba(198, 155, 102, 0.35)'
                  }}
                >
                  SAVE CONFIGURATION
                </button>
              </div>

            </div>
            )}
          </div>
        </div>
      )}

      {/* 5. GENERAL BOOKING INQUIRY MODAL */}
      {bookingModalOpen && (
        <div className="modal active">
          <div className="modal-backdrop" onClick={() => setBookingModalOpen(false)}></div>
          <div className="modal-content">
            <button className="modal-close" onClick={() => setBookingModalOpen(false)}>✕</button>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <span className="section-tag">STUDIO INQUIRY</span>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem' }}>{selectedExperience}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Direct inquiry for date availability and tailored pricing.</p>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              alert(`Inquiry received for ${selectedExperience}! Our lead team will contact you on WhatsApp.`);
              setBookingModalOpen(false);
            }}>
              <input type="text" className="form-input" placeholder="Your Full Name *" required />
              <input type="email" className="form-input" placeholder="Email Address *" required />
              <input type="tel" className="form-input" placeholder="WhatsApp Phone Number *" required />
              <input type="text" className="form-input" placeholder="Estimated Wedding Date" />
              <textarea className="form-input" rows="3" placeholder="Tell us about your wedding location & vision..."></textarea>
              <button type="submit" className="btn btn-gold full-width btn-large">SEND WHATSAPP INQUIRY</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
