import React from 'react';
import { ArrowUpRight, BookOpen, Clock } from 'lucide-react';

const journalPosts = [
  {
    id: 1,
    title: 'The Art of Destination Weddings in Kerala',
    category: 'DESTINATION GUIDE',
    readTime: '5 Min Read',
    image: '/website/assets/images/portfolio1.jpg',
    excerpt: 'From backwater coconut groves in Kumarakom to misty tea gardens in Munnar, discover top venues and photography secrets for destination weddings in Kerala.'
  },
  {
    id: 2,
    title: 'Mastering Golden Hour Lighting for Evening Pheras',
    category: 'PHOTOGRAPHY INSIGHTS',
    readTime: '4 Min Read',
    image: '/website/assets/images/hero.jpg',
    excerpt: 'How we manipulate low-angle natural light and warm ambient torches to craft painterly portraits during evening outdoor mandap ceremonies.'
  },
  {
    id: 3,
    title: 'Why Handcrafted Leather Albums Outlast Digital Files',
    category: 'HERITAGE PRINTS',
    readTime: '6 Min Read',
    image: '/website/assets/images/portfolio3.jpg',
    excerpt: 'A deep dive into archival luster papers, flush-mount binding, and custom leather covers built to preserve family legacies across decades.'
  }
];

export default function Journal() {
  return (
    <section className="section-padding" id="journal" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="section-tag">THE JOURNAL</span>
          <h2 className="section-title">Stories & Articles</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.4rem', fontSize: '0.9rem' }}>
            Insights, photography guides, and creative musings from our studio.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {journalPosts.map(post => (
            <article
              key={post.id}
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: '0 10px 25px rgba(18,18,18,0.04)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ height: '220px', overflow: 'hidden' }}>
                  <img src={post.image} alt={post.title} className="bw-image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                <div style={{ padding: '2rem 1.8rem 1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.8rem', fontSize: '0.75rem', color: 'var(--accent-gold)', fontWeight: 700, letterSpacing: '0.15em' }}>
                    <span>{post.category}</span>
                    <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 500 }}>
                      <Clock size={12} /> {post.readTime}
                    </span>
                  </div>

                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 400, marginBottom: '0.8rem', lineHeight: 1.25 }}>
                    {post.title}
                  </h3>

                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div style={{ padding: '0 1.8rem 1.8rem' }}>
                <a href="#contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text-primary)' }}>
                  READ ARTICLE <ArrowUpRight size={14} color="#C69B66" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
