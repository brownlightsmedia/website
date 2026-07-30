import React, { useState } from 'react';
import { MapPin, Calendar, ArrowRight, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const storyDeck = [
  {
    id: 1,
    couple: 'Shahabaz & Shahina',
    title: 'A Royal Promise',
    location: 'Kerala, India',
    date: 'Recent',
    category: 'DESTINATION WEDDING',
    image: '/website/assets/images/about.jpg',
    storyExcerpt: 'Surrounded by heritage and tradition, Shahabaz and Shahina celebrated their beautiful union with their closest family and friends.',
    features: ['3-Day Coverage', '2 Photographers', '2 Cinematographers', 'Aerial Drone Cinema', 'Handcrafted Heirloom Book']
  },
  {
    id: 2,
    couple: 'Anu & Vishnu',
    title: 'Sunset Coast Serenade',
    location: 'Kerala, India',
    date: 'Recent',
    category: 'BEACHFRONT CEREMONY',
    image: '/website/assets/images/anu & vishnu/IMG_5667.jpg',
    storyExcerpt: 'An intimate barefoot beach wedding as dusk set over the sea, featuring acoustic live music and organic golden hour portraits.',
    features: ['2-Day Coverage', '2 Photographers', '1 Cinematographer', 'AI Instant QR Sharing', 'Mini Parent Albums']
  },
  {
    id: 3,
    couple: 'Manasa',
    title: 'Heritage Elegance',
    location: 'Kerala, India',
    date: 'Recent',
    category: 'HERITAGE CELEBRATION',
    image: '/website/assets/images/manasa/1.JPEG',
    storyExcerpt: 'Grand traditional rituals framed under historic chandeliers and vintage arches, capturing four generations of family reunions.',
    features: ['4-Day Coverage', '3 Photographers', '3 Cinematographers', 'Live Broadcast Feed', '140-Page Master Book']
  },
  {
    id: 4,
    couple: 'Akshay & Nivya',
    title: 'Backwater Tranquility',
    location: 'Kerala, India',
    date: 'Recent',
    category: 'INTIMATE WEDDING',
    image: '/website/assets/images/akshay & nivya/IMG_2098.JPG',
    storyExcerpt: 'A serene celebration along the backwaters, reflecting the calm and deep love Akshay and Nivya share for each other.',
    features: ['2-Day Coverage', '2 Photographers', '2 Cinematographers', 'Drone Cinema', 'Luxury Album']
  },
  {
    id: 5,
    couple: 'Monika Thomas',
    title: 'Urban Chic Nuptials',
    location: 'Kerala, India',
    date: 'Recent',
    category: 'CITY WEDDING',
    image: '/website/assets/images/portfolio1.jpg',
    storyExcerpt: 'A modern, chic city wedding with stunning architectural backdrops and an unforgettable evening reception.',
    features: ['1-Day Coverage', '1 Photographer', '1 Cinematographer', 'Social Reels', 'Standard Book']
  },
  {
    id: 6,
    couple: 'Shazad & Fiza',
    title: 'A Timeless Vow',
    location: 'Kerala, India',
    date: 'Recent',
    category: 'DESTINATION WEDDING',
    image: '/website/assets/images/shahzad & fiza/IMG_5587.jpg',
    storyExcerpt: 'A breathtaking celebration of love, filled with laughter, tears of joy, and a promise that lasts a lifetime.',
    features: ['3-Day Coverage', '2 Photographers', '2 Cinematographers', 'Teaser Reel', 'Master Book']
  }
];

export default function StackedCards({ onOpenStory }) {
  const [cards, setCards] = useState(storyDeck);

  const flipCard = () => {
    setCards((prev) => {
      const copy = [...prev];
      const first = copy.shift();
      copy.push(first);
      return copy;
    });
  };

  return (
    <section className="section-padding" id="stories" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-tag">REAL WEDDING STORIES</span>
          <h2 className="section-title">Feature Couple Stories</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.4rem', fontSize: '0.9rem' }}>
            Click anywhere on the card to flip through our real wedding couple stories.
          </p>
        </div>

        <div className="stack-container" style={{ perspective: '1200px' }}>
          <AnimatePresence>
            {cards.map((card, index) => {
              const isTop = index === 0;

              return (
                <motion.div
                  key={card.id}
                  className="stack-card"
                  style={{
                    zIndex: cards.length - index,
                    background: '#FFFFFF',
                    color: 'var(--text-primary)'
                  }}
                  animate={{
                    top: index * 12,
                    scale: 1 - index * 0.04,
                    opacity: 1 - index * 0.18
                  }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  onClick={isTop ? flipCard : undefined}
                >
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '2rem', alignItems: 'center' }}>
                    <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', height: '280px' }}>
                      <img src={card.image} alt={card.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--accent-gold)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em' }}>
                        <Heart size={14} fill="currentColor" />
                        <span>{card.category}</span>
                      </div>

                      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', lineHeight: 1.1, marginBottom: '0.5rem' }}>
                        {card.couple}
                      </h3>

                      <h4 style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 500, marginBottom: '0.8rem' }}>
                        {card.title}
                      </h4>

                      <div style={{ display: 'flex', gap: '1.2rem', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.2rem' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><MapPin size={14} color="#C69B66" /> {card.location}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Calendar size={14} color="#C69B66" /> {card.date}</span>
                      </div>

                      <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                        {card.storyExcerpt}
                      </p>

                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <button
                          className="btn btn-outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenStory(card);
                          }}
                        >
                          VIEW STORY DETAILS <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
