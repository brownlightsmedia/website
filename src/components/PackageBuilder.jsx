import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Send } from 'lucide-react';
import SignaturePackage from './SignaturePackage';
import DreamPackage from './DreamPackage';

export default function PackageBuilder({ onNavigateToContact }) {
  const [activeTab, setActiveTab] = useState('signature'); // 'signature' or 'dream'
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedPackageData, setSelectedPackageData] = useState(null);
  const [showGiftBox, setShowGiftBox] = useState(false);
  
  const [formData, setFormData] = useState({
      name: '',
      email: '',
      contact: '',
      weddingEveDate: '',
      weddingDayDate: '',
      date: '' // General date for Dream package
  });

  const handleCheckout = (packageData) => {
      setSelectedPackageData(packageData);
      setBookingModalOpen(true);
  };

  const handleBookingSubmit = (e) => {
      e.preventDefault();
      setBookingModalOpen(false);
      
      // If it's a signature package, show the gift box animation BEFORE sending to WhatsApp
      if (selectedPackageData?.type === 'Signature') {
          setShowGiftBox(true);
          setTimeout(() => {
              setShowGiftBox(false);
              processBookingPayload();
          }, 7500);
      } else {
          // Dream package goes straight to WhatsApp
          processBookingPayload();
      }
  };

  const processBookingPayload = () => {
      let payload = '';

      if (selectedPackageData?.type === 'Signature') {
          payload = `Hello Brownlight Media! I would like to confirm my booking for the Signature Package:

👤 *Client Details*
- Name: ${formData.name}
- Email: ${formData.email}
- Contact: ${formData.contact}
- Wedding Eve Date: ${formData.weddingEveDate}
- Wedding Day Date: ${formData.weddingDayDate}

📷 *Customized Output:*
- Edited photos: ${selectedPackageData.retouchedPhotos} pics
- Instagram film video x ${selectedPackageData.instagramReels}
- Wedding highlight video: ${selectedPackageData.highlightVideo}
- Album: ${selectedPackageData.albumPages}

🎁 *Complimentary Gifts Included:* Mini album, Signature online album, Table calendar, Photo frame`;
      } else if (selectedPackageData?.type === 'Dream') {
          const scheduleSummary = selectedPackageData.daysConfig.map(day => {
              if (day.events.length === 0) return `Day ${day.id}: No events selected`;
              const eventsList = day.events.map(ev => 
                  `  - ${ev.name} (${ev.startTime} to ${ev.endTime}) | ${ev.photographers} Photographers, ${ev.cinematographers} Cinematographers`
              ).join('\n');
              return `*Day ${day.id}*\n${eventsList}`;
          }).join('\n\n');

          payload = `Hello Brownlight Media! I have designed my own Dream Package:

👤 *Client Details*
- Name: ${formData.name}
- Email: ${formData.email}
- Contact: ${formData.contact}
- Program Start Date: ${formData.date}

📅 *Program Schedule & Crew:*
${scheduleSummary}

📷 *Customized Output:*
- Edited photos: ${selectedPackageData.retouchedPhotos} pics
- Instagram film video x ${selectedPackageData.instagramReels}
- Wedding highlight video: ${selectedPackageData.highlightVideo}
- Album: ${selectedPackageData.albumPages}`;
      }
      
      // WhatsApp Number placeholder (will be replaced by user later)
      const encoded = encodeURIComponent(payload);
      window.open(`https://wa.me/919876543210?text=${encoded}`, '_blank');
      
      if (onNavigateToContact) {
          onNavigateToContact();
      }
  };

  return (
    <section className="section-padding" id="packages" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Side-by-Side Package Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem', alignItems: 'start' }}>
            <SignaturePackage onCheckout={handleCheckout} />
            <DreamPackage onCheckout={handleCheckout} />
        </div>

      </div>

      {/* Booking Form Modal via Portal to fix scroll/transform issues */}
      {bookingModalOpen && createPortal(
        <div className="modal active" style={{ zIndex: 100000 }}>
          <div className="modal-backdrop" onClick={() => setBookingModalOpen(false)}></div>
          <div className="modal-content" style={{ maxWidth: '500px', padding: '3rem 2.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-light)' }}>
            <button className="modal-close" onClick={() => setBookingModalOpen(false)} style={{ background: 'rgba(0,0,0,0.05)', color: 'var(--text-primary)' }}>
              <X size={20} />
            </button>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--accent-gold)', textAlign: 'center' }}>Secure Your Booking</h3>
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '2rem' }}>
                Fill out the details below to finalize your {selectedPackageData?.type} package.
            </p>

            <form onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>Full Name</label>
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-light)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }} placeholder="John Doe" />
                </div>
                <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>Email Address</label>
                    <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-light)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }} placeholder="john@example.com" />
                </div>
                <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>Contact Number</label>
                    <input type="tel" required value={formData.contact} onChange={(e) => setFormData({...formData, contact: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-light)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }} placeholder="+91 98765 43210" />
                </div>

                {selectedPackageData?.type === 'Signature' ? (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>Wedding Eve Date</label>
                            <input type="date" required value={formData.weddingEveDate} onChange={(e) => setFormData({...formData, weddingEveDate: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-light)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>Wedding Day Date</label>
                            <input type="date" required value={formData.weddingDayDate} onChange={(e) => setFormData({...formData, weddingDayDate: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-light)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }} />
                        </div>
                    </div>
                ) : (
                    <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>Program Start Date</label>
                        <input type="date" required value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-light)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }} />
                    </div>
                )}

                <button type="submit" className="btn btn-gold full-width" style={{ marginTop: '1rem', padding: '1rem', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <Send size={18} /> Confirm Booking
                </button>
            </form>
          </div>
        </div>,
        document.body
      )}

      {/* Gift Box Reveal Modal via Portal */}
      {showGiftBox && createPortal(
        <div className="gift-box-modal" style={{ zIndex: 110000 }}>
            <div className="giftbox">
                <div className="giftbox-ribbon"></div>
                <div className="giftbox-lid">
                    <div className="giftbox-lid-ribbon"></div>
                </div>
            </div>
            <div className="gift-reveal-content">
                <h2>Signature Package</h2>
                <div style={{ background: 'rgba(255,255,255,0.1)', padding: '2rem', borderRadius: '12px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}>
                    <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Booking Confirmed! You've unlocked:</p>
                    <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left', display: 'inline-block' }}>
                        <li style={{ marginBottom: '0.5rem' }}>✓ {selectedPackageData?.retouchedPhotos} Edited Photos</li>
                        <li style={{ marginBottom: '0.5rem' }}>✓ {selectedPackageData?.instagramReels}x Instagram Films</li>
                        <li style={{ marginBottom: '0.5rem' }}>✓ {selectedPackageData?.highlightVideo} Highlight Video</li>
                        <li style={{ marginBottom: '1.5rem' }}>✓ {selectedPackageData?.albumPages} Album</li>
                    </ul>
                    
                    <h4 style={{ fontSize: '1.1rem', color: 'var(--accent-gold)', marginBottom: '1rem' }}>🎁 Complimentary Gifts Included</h4>
                    <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left', display: 'inline-block' }}>
                        <li>✨ Mini Album</li>
                        <li>✨ Signature Album Online</li>
                        <li>✨ Table Calendar</li>
                        <li>✨ Photo Frame</li>
                    </ul>
                </div>
                <p style={{ marginTop: '2rem', fontSize: '0.9rem', opacity: 0.7 }}>Redirecting to WhatsApp...</p>
            </div>
        </div>,
        document.body
      )}

    </section>
  );
}
