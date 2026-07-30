import React, { useState } from 'react';
import { Camera, Film, CheckCircle2, Sliders, ShoppingBag, X } from 'lucide-react';

export default function SignaturePackage({ onCheckout }) {
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [retouchedPhotos, setRetouchedPhotos] = useState(50);
  const [instagramReels, setInstagramReels] = useState(2);
  const [highlightVideo, setHighlightVideo] = useState('3-6 mins');
  const [albumPages, setAlbumPages] = useState('40 leaves (80 pages)');
  
  const handleCheckoutClick = () => {
    const packageData = {
        type: 'Signature',
        retouchedPhotos,
        instagramReels,
        highlightVideo,
        albumPages
    };
    onCheckout(packageData);
  };

  return (
    <div style={{ background: 'var(--bg-secondary)', borderRadius: '20px', padding: '3rem', border: '1px solid var(--border-light)' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="section-tag">PREMIUM</span>
          <h2 style={{ fontFamily: "'Great Vibes', cursive", fontSize: '4.5rem', color: 'var(--text-primary)', marginBottom: '0.5rem', fontWeight: 400 }}>Signature</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
            Our exclusive, expertly curated wedding experience.
          </p>
      </div>

      <div style={{ marginBottom: '3rem' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Camera size={20} color="var(--accent-gold)"/> The Crew</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div>
                <h4 style={{ fontSize: '1rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>Wedding Eve</h4>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li style={{ fontSize: '0.9rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={14} color="var(--accent-gold)"/> 1 Lead Candid Photographer</li>
                    <li style={{ fontSize: '0.9rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={14} color="var(--accent-gold)"/> 1 Lead Candid Cinematographer</li>
                </ul>
            </div>
            <div>
                <h4 style={{ fontSize: '1rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>Wedding Day</h4>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li style={{ fontSize: '0.9rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={14} color="var(--accent-gold)"/> 1 Lead Candid Photographer</li>
                    <li style={{ fontSize: '0.9rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={14} color="var(--accent-gold)"/> 1 Lead Candid Cinematographer</li>
                </ul>
            </div>
        </div>
      </div>

      <div style={{ height: '1px', background: 'var(--border-light)', margin: '2rem 0' }}></div>

      <div style={{ marginBottom: showCustomizer ? '3rem' : '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}><Film size={20} color="var(--accent-gold)"/> Deliverables</h3>
        </div>
        
        {!showCustomizer ? (
            <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)' }}>
                <li style={{ marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={14} color="var(--accent-gold)"/> Edited photos (up to 50 pics)</li>
                <li style={{ marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={14} color="var(--accent-gold)"/> Soft Copies (USB & Google Drive)</li>
                <li style={{ marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={14} color="var(--accent-gold)"/> Instagram film video x 2</li>
                <li style={{ marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={14} color="var(--accent-gold)"/> Wedding highlight video (3-6 minutes)</li>
                <li style={{ marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={14} color="var(--accent-gold)"/> Album 40 leaves (80 pages)</li>
                <li style={{ marginTop: '1.5rem', color: 'var(--accent-gold)', fontWeight: 600 }}>+ Complimentary: Mini album, Signature online album, Table calendar, Photo frame</li>
            </ul>
        ) : (
            <div>
                {/* Photos */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Edited Photos (up to)</label>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        {[50, 80, 100].map(val => (
                            <button 
                                key={val}
                                onClick={() => setRetouchedPhotos(val)}
                                className={retouchedPhotos === val ? 'btn btn-gold' : 'btn btn-outline'}
                                style={{ flex: 1, padding: '0.5rem' }}
                            >
                                {val} pics
                            </button>
                        ))}
                    </div>
                </div>

                {/* Reels */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Instagram Film Videos</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <button className="btn btn-outline" style={{ padding: '0.5rem 1rem' }} onClick={() => setInstagramReels(Math.max(1, instagramReels - 1))}>-</button>
                        <span style={{ fontSize: '1.2rem', fontWeight: 600, width: '40px', textAlign: 'center' }}>{instagramReels}</span>
                        <button className="btn btn-outline" style={{ padding: '0.5rem 1rem' }} onClick={() => setInstagramReels(Math.min(5, instagramReels + 1))}>+</button>
                    </div>
                </div>

                {/* Highlight Video */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Wedding Highlight Video</label>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        {['3-6 mins', '6-8 mins'].map(val => (
                            <button 
                                key={val}
                                onClick={() => setHighlightVideo(val)}
                                className={highlightVideo === val ? 'btn btn-gold' : 'btn btn-outline'}
                                style={{ flex: 1, padding: '0.5rem' }}
                            >
                                {val}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Album */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Premium Album</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                        {['40 leaves (80 pages)', '60 leaves (120 pages)', '75 leaves (150 pages)'].map(val => (
                            <button 
                                key={val}
                                onClick={() => setAlbumPages(val)}
                                className={albumPages === val ? 'btn btn-gold' : 'btn btn-outline'}
                                style={{ flex: 1, padding: '0.5rem', minWidth: '180px' }}
                            >
                                {val}
                            </button>
                        ))}
                    </div>
                </div>
                
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '1rem' }}>* Also includes Soft Copies (USB & Google Drive) and Complimentary Gifts</p>
            </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
        <button className="btn btn-outline full-width" style={{ padding: '1rem', fontSize: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }} onClick={() => setShowCustomizer(!showCustomizer)}>
            <Sliders size={18} /> {showCustomizer ? 'Hide Customizations' : 'Customize Outputs'}
        </button>
        <button className="btn btn-gold full-width" style={{ padding: '1.2rem', fontSize: '1.1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }} onClick={handleCheckoutClick}>
            <ShoppingBag size={20} /> Checkout Signature
        </button>
      </div>

    </div>
  );
}
