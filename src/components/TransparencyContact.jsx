import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Mail, Phone, MapPin, Send, CheckCircle2, ShieldCheck, Clock, Award } from 'lucide-react';

export default function TransparencyContact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    location: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    setSubmitted(true);

    const msg = `Hello Brownlight Media!

New Studio Inquiry:
👤 Name: ${formData.name}
📧 Email: ${formData.email}
📱 Phone: ${formData.phone}
📅 Event Date: ${formData.date}
📍 Location: ${formData.location}
💬 Message: ${formData.message}`;

    const encoded = encodeURIComponent(msg);
    setTimeout(() => {
      window.open(`https://wa.me/919876543210?text=${encoded}`, '_blank');
    }, 1000);
  };

  return (
    <section className="section-padding" id="contact" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="section-tag">GET IN TOUCH</span>
          <h2 className="section-title">Direct Studio Inquiries</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.4rem', fontSize: '0.92rem' }}>
            We invite you to reach out directly to check date availability or discuss your vision.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3rem',
          alignItems: 'start'
        }}>
          {/* Left Column: Direct Contact Info */}
          <div>
            <div style={{
              background: '#fff',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-lg)',
              padding: '2.5rem',
              boxShadow: '0 10px 30px rgba(18, 18, 18, 0.05)',
              marginBottom: '2rem'
            }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
                Studio Direct Line
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'var(--accent-gold-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Phone size={20} color="#C69B66" />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.1em' }}>DIRECT CALL & WHATSAPP</span>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 600 }}>+91 88488 39266</h4>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'var(--accent-gold-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Mail size={20} color="#C69B66" />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.1em' }}>OFFICIAL INQUIRIES</span>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 600 }}>brownlightmedia@gmail.com</h4>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'var(--accent-gold-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MapPin size={20} color="#C69B66" />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.1em' }}>STUDIO LOCATION</span>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 600 }}>Kozhikode, Kerala</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div style={{
            background: '#fff',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-lg)',
            padding: '2.8rem 2.5rem',
            boxShadow: '0 16px 36px rgba(18, 18, 18, 0.06)'
          }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <CheckCircle2 size={54} color="#C69B66" style={{ margin: '0 auto 1rem' }} />
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', marginBottom: '0.6rem' }}>Inquiry Received!</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                  Thank you, {formData.name}. Opening WhatsApp to send your inquiry directly to our lead creative team.
                </p>
                <button className="btn btn-gold" onClick={() => setSubmitted(false)}>SEND ANOTHER INQUIRY</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '1.5rem' }}>Send a Message</h3>

                <div className="contact-form-grid">
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Your Full Name *"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                  />
                  <input
                    type="email"
                    className="form-input"
                    placeholder="Email Address *"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="contact-form-grid">
                  <input
                    type="tel"
                    className="form-input"
                    placeholder="WhatsApp Phone *"
                    required
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  />
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Estimated Wedding Date"
                    value={formData.date}
                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>

                <input
                  type="text"
                  className="form-input"
                  placeholder="Wedding Location / Venue"
                  value={formData.location}
                  onChange={e => setFormData({ ...formData, location: e.target.value })}
                />

                <textarea
                  className="form-input"
                  rows="4"
                  placeholder="Tell us about your wedding vision..."
                  style={{ resize: 'vertical' }}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                ></textarea>

                <button type="submit" className="btn btn-gold full-width btn-large" style={{ marginTop: '0.5rem' }}>
                  <Send size={16} style={{ marginRight: '0.5rem' }} /> SUBMIT DIRECT INQUIRY
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
