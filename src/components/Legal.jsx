import React from 'react';
import { ShieldCheck, FileText, Lock, RefreshCw } from 'lucide-react';

export default function Legal() {
  return (
    <section className="section-padding" id="legal" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="section-tag">POLICIES & TERMS</span>
          <h2 className="section-title">Terms & Legal Standards</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.4rem', fontSize: '0.9rem' }}>
            Our commitment to clear contracts, copyright licensing, and client trust.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
          <div style={{ background: '#fff', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)', padding: '2rem' }}>
            <FileText size={28} color="#C69B66" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', marginBottom: '0.6rem' }}>Commission Contract</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              All commissions are backed by an official studio contract detailing session dates, crew sizes, deliverables, and payment schedules.
            </p>
          </div>

          <div style={{ background: '#fff', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)', padding: '2rem' }}>
            <ShieldCheck size={28} color="#C69B66" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', marginBottom: '0.6rem' }}>Copyright & Licensing</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Couples receive full personal print & digital sharing rights for all retouched high-resolution files without watermarks.
            </p>
          </div>

          <div style={{ background: '#fff', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)', padding: '2rem' }}>
            <Lock size={28} color="#C69B66" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', marginBottom: '0.6rem' }}>Privacy & Confidentiality</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              We respect your privacy. High-profile NDA sessions and private online galleries are available upon request.
            </p>
          </div>

          <div style={{ background: '#fff', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)', padding: '2rem' }}>
            <RefreshCw size={28} color="#C69B66" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', marginBottom: '0.6rem' }}>Rescheduling Policy</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Flexible date rescheduling within 12 months for unforeseen events, subject to studio calendar availability.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
