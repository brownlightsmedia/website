import React, { useState } from 'react';
import FlowingMenu from './FlowingMenu';
import { X, MapPin, Camera, Sparkles } from 'lucide-react';

const portfolioItems = [
  { 
    id: 1, 
    link: '#work', 
    text: 'Royal Udaipur Vows', 
    location: 'Udaipur, Rajasthan',
    category: 'Destination Wedding',
    image: '/website/assets/images/hero.jpg',
    features: ['Multi-Day Palace Coverage', 'Full Senior 6-Crew Team', '4K Aerial Drone Cinema', 'Handcrafted Leather Album']
  },
  { 
    id: 2, 
    link: '#work', 
    text: 'Sunset Serenade', 
    location: 'Kerala Coast',
    category: 'Pre-Wedding Shoot',
    image: '/website/assets/images/portfolio1.jpg',
    features: ['Golden Hour Beach Session', 'Candid Outdoor Styling', 'Cinematic Highlight Teaser', 'Digital High-Res Gallery']
  },
  { 
    id: 3, 
    link: '#work', 
    text: 'Intimate Joy', 
    location: 'Kochi, Kerala',
    category: 'Engagement Ceremony',
    image: '/website/assets/images/about.jpg',
    features: ['Candid Ceremony Coverage', 'Traditional & Contemporary Portraits', 'Private Online Gallery Preview', 'Fine-Art Editing']
  },
  { 
    id: 4, 
    link: '#work', 
    text: 'Palace Mandap', 
    location: 'Jaipur, Rajasthan',
    category: 'Royal Celebration',
    image: '/website/assets/images/portfolio3.jpg',
    features: ['Night Mandap Illumination', 'Heritage Architecture Backdrops', 'High-Dynamic Cinema Color Grading', 'Luster Printed Hardbound Book']
  },
  { 
    id: 5, 
    link: '#work', 
    text: 'Haldi Celebration', 
    location: 'Calicut, Kerala',
    category: 'Traditional Rituals',
    image: '/website/assets/images/portfolio2.jpg',
    features: ['Vibrant Marigold & Color Shots', 'Candid Emotion Focus', 'Same-Day Edit Highlights', 'Raw High-Res Files License']
  },
  { 
    id: 6, 
    link: '#work', 
    text: 'Destination Vows', 
    location: 'Dubai, UAE',
    category: 'International Destination',
    image: '/website/assets/images/film.jpg',
    features: ['Desert & Skyline Sunset Shoots', 'Full Film & Cinema Teasers', 'Dual Senior Photographers', 'Luxury Canvas Prints']
  },
];

export default function SelectedWorksFlowingMenu() {
  const [selectedGallery, setSelectedGallery] = useState(null);

  return (
    <section className="portfolio-section section-padding" id="work" style={{ backgroundColor: '#FAF9F5', paddingBottom: '4rem' }}>
      <div className="container" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <span className="section-tag">PORTFOLIO</span>
        <h2 className="section-title" style={{ color: '#121212' }}>Selected Works</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.4rem' }}>
          Click on any title to open the full gallery features & details.
        </p>
      </div>

      <div style={{ height: '560px', position: 'relative', borderTop: '1px solid rgba(18, 18, 18, 0.12)', borderBottom: '1px solid rgba(18, 18, 18, 0.12)' }}>
        <FlowingMenu 
          items={portfolioItems} 
          speed={15}
          textColor="#121212"
          bgColor="#FAF9F5"
          marqueeBgColor="#121212"
          marqueeTextColor="#FAF9F5"
          borderColor="rgba(18, 18, 18, 0.12)"
          onSelectItem={(item) => {
            const found = portfolioItems.find(p => p.text === item.text);
            setSelectedGallery(found || item);
          }}
        />
      </div>

      {/* Gallery Feature Modal */}
      {selectedGallery && (
        <div className="modal active">
          <div className="modal-backdrop" onClick={() => setSelectedGallery(null)}></div>
          <div className="modal-content" style={{ maxWidth: '680px' }}>
            <button className="modal-close" onClick={() => setSelectedGallery(null)}>
              <X size={24} />
            </button>

            <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', height: '280px', marginBottom: '1.8rem' }}>
              <img src={selectedGallery.image} alt={selectedGallery.text} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--accent-gold)', marginBottom: '0.4rem' }}>
              <MapPin size={16} />
              <span style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.15em' }}>{selectedGallery.location || 'Featured Location'}</span>
            </div>

            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.4rem', marginBottom: '0.6rem' }}>
              {selectedGallery.text}
            </h3>

            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Category: <strong>{selectedGallery.category || 'Wedding Gallery'}</strong>
            </p>

            <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1.2rem', marginBottom: '1.8rem' }}>
              <h4 style={{ fontSize: '0.85rem', letterSpacing: '0.15em', fontWeight: 700, marginBottom: '1rem', color: 'var(--accent-gold)' }}>
                INCLUDED FEATURES & CREATIVE SERVICES
              </h4>
              <ul style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                {(selectedGallery.features || ['Full Event Coverage', 'High-Res Digital Edits', 'Cinematic Highlight Teaser', 'Private Online Gallery']).map((feat, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                    <Sparkles size={14} color="#C69B66" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button className="btn btn-gold full-width" onClick={() => setSelectedGallery(null)}>
              CLOSE GALLERY VIEW
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
