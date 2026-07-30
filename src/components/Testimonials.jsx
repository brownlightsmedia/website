import React, { useState } from 'react';
import { Star, User, PlusCircle, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

const reviewsData = [
  {
    id: 1,
    name: 'Aina Gamos',
    role: 'Bride',
    quote: 'We fell in love with Brownlight Media visual styling from day one. Their candid team made us feel extremely natural, and the color grading on our film is cinema-grade!'
  },
  {
    id: 2,
    name: 'Deeshna Chandanattil',
    role: 'Bride',
    quote: 'Brilliant crew to collaborate with for massive milestones. They just nail modern photography trends, adding a classic film touch to our wedding albums.'
  },
  {
    id: 3,
    name: 'Malavika Mohan',
    role: 'Editorial Client',
    quote: 'Their portrait sessions are extremely professional. They spend time setting up perfect lighting, directing poses, and delivering breathtaking high-resolution prints.'
  }
];

export default function Testimonials() {
  const [reviews, setReviews] = useState(reviewsData);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [quote, setQuote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
    setReviews(prev => [
      { id: Date.now(), name, role: role || 'Client', quote },
      ...prev
    ]);
    setSubmitted(true);
    setTimeout(() => {
      setShowForm(false);
      setSubmitted(false);
      setName('');
      setRole('');
      setQuote('');
    }, 2000);
  };

  return (
    <section className="section-padding" id="testimonials" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="section-tag">TESTIMONIALS</span>
          <h2 className="section-title">Client Reactions</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.4rem', fontSize: '0.9rem' }}>
            Stories and authentic feedback from couples who trusted us with their big day.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          {reviews.map(rev => (
            <div
              key={rev.id}
              style={{
                background: '#fff',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-lg)',
                padding: '2.5rem 2rem',
                boxShadow: '0 10px 25px rgba(18,18,18,0.04)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', gap: '4px', color: 'var(--accent-gold)', marginBottom: '1.2rem' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>

                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '1.5rem' }}>
                  "{rev.quote}"
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', borderTop: '1px solid var(--border-light)', paddingTop: '1rem' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'var(--accent-gold-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <User size={18} color="#C69B66" />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>{rev.name}</h4>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{rev.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Share Experience Button */}
        <div style={{ textAlign: 'center' }}>
          <button className="btn btn-outline" onClick={() => setShowForm(!showForm)}>
            <PlusCircle size={16} /> SHARE YOUR EXPERIENCE
          </button>
        </div>

        {/* Review Form Modal */}
        {showForm && (
          <div className="modal active">
            <div className="modal-backdrop" onClick={() => setShowForm(false)}></div>
            <div className="modal-content" style={{ maxWidth: '520px' }}>
              <button className="modal-close" onClick={() => setShowForm(false)}>✕</button>

              {submitted ? (
                <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                  <CheckCircle2 size={48} color="#C69B66" style={{ margin: '0 auto 1rem' }} />
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem' }}>Thank You!</h3>
                  <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Your reaction has been published to our live testimonials.</p>
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit}>
                  <div style={{ textAlign: 'center', marginBottom: '1.8rem' }}>
                    <span className="section-tag">SHARE YOUR THOUGHTS</span>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem' }}>Add Your Reaction</h3>
                  </div>

                  <input
                    type="text"
                    className="form-input"
                    placeholder="Your Name *"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />

                  <input
                    type="text"
                    className="form-input"
                    placeholder="Relation / Role (e.g. Groom, Bride, Family)"
                    value={role}
                    onChange={e => setRole(e.target.value)}
                  />

                  <textarea
                    className="form-input"
                    rows="4"
                    placeholder="Write your review quote..."
                    required
                    value={quote}
                    onChange={e => setQuote(e.target.value)}
                  ></textarea>

                  <button type="submit" className="btn btn-gold full-width">SUBMIT REACTION</button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
