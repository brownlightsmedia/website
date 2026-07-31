import React, { useState } from 'react';
import { Camera, Film, CheckCircle2, Clock, Calendar, Users, ShoppingBag, Plus } from 'lucide-react';

const EVENTS_LIST = [
  'Engagement', 'Betrothal', 'Haldi', 'Mehndi', 'Fixation Ceremony', 'Wedding Eve', 'Wedding Day', 'Reception'
];

export default function DreamPackage({ onCheckout }) {
  const [showBuilder, setShowBuilder] = useState(false);
  const [numDays, setNumDays] = useState(1);
  const [isCustomDays, setIsCustomDays] = useState(false);
  const [daysConfig, setDaysConfig] = useState([
      { id: 1, events: [] }
  ]);
  
  const [retouchedPhotos, setRetouchedPhotos] = useState(50);
  const [instagramReels, setInstagramReels] = useState(2);
  const [highlightVideo, setHighlightVideo] = useState('3-6 mins');
  const [albumPages, setAlbumPages] = useState('40 leaves (80 pages)');

  const updateNumDays = (newNum) => {
    setNumDays(newNum);
    const newConfig = [...daysConfig];
    if (newNum > newConfig.length) {
      for (let i = newConfig.length + 1; i <= newNum; i++) {
        newConfig.push({ id: i, events: [] });
      }
    } else {
      newConfig.length = newNum;
    }
    setDaysConfig(newConfig);
  };

  const handleNumDaysChange = (option) => {
    if (option === 'more') {
      setIsCustomDays(true);
      if (daysConfig.length < 5) updateNumDays(5);
    } else {
      setIsCustomDays(false);
      updateNumDays(option);
    }
  };

  const handleAddDay = () => {
    updateNumDays(numDays + 1);
  };

  const toggleEvent = (dayIndex, eventName) => {
    const newConfig = [...daysConfig];
    const events = newConfig[dayIndex].events;
    const existing = events.find(e => e.name === eventName);
    
    if (existing) {
        newConfig[dayIndex].events = events.filter(e => e.name !== eventName);
    } else {
        newConfig[dayIndex].events.push({ 
            name: eventName, 
            startTime: '09:00', 
            endTime: '13:00', 
            photographers: 1, 
            cinematographers: 1 
        });
    }
    setDaysConfig(newConfig);
  };

  const updateEventConfig = (dayIndex, eventIndex, field, value) => {
    const newConfig = [...daysConfig];
    newConfig[dayIndex].events[eventIndex][field] = value;
    setDaysConfig(newConfig);
  };

  const handleCheckoutClick = () => {
    const packageData = {
        type: 'Dream',
        daysConfig,
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
          <span className="section-tag">FULLY CUSTOM</span>
          <h2 style={{ fontFamily: "'Great Vibes', cursive", fontSize: '4.5rem', color: 'var(--text-primary)', marginBottom: '0.5rem', fontWeight: 400 }}>Dream Package</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
            Build your perfect wedding experience from the ground up.
          </p>
      </div>

      {!showBuilder ? (
          <div>
            <div style={{ marginBottom: '3rem' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={20} color="var(--accent-gold)"/> Package Highlights</h3>
                <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)' }}>
                    <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}><Calendar size={18} color="var(--accent-gold)" style={{ marginTop: '2px' }}/> Choose exactly how many days your program lasts.</li>
                    <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}><Clock size={18} color="var(--accent-gold)" style={{ marginTop: '2px' }}/> Select specific events and set custom start and end timings.</li>
                    <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}><Users size={18} color="var(--accent-gold)" style={{ marginTop: '2px' }}/> Pick the exact number of Photographers and Cinematographers per event.</li>
                    <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}><Film size={18} color="var(--accent-gold)" style={{ marginTop: '2px' }}/> Fully customize your final output deliverables.</li>
                </ul>
            </div>
            
            <button className="btn btn-gold full-width" style={{ padding: '1.2rem', fontSize: '1.1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }} onClick={() => setShowBuilder(true)}>
                Build Your Dream Package
            </button>
          </div>
      ) : (
          <div>
            {/* Step 1: Days */}
            <div style={{ marginBottom: '3rem', background: 'rgba(0,0,0,0.02)', padding: '2rem', borderRadius: '12px' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Calendar size={20} color="var(--accent-gold)"/> 1. Program Duration</h3>
        <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.8rem', color: 'var(--text-secondary)' }}>How many days is the program?</label>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {[1, 2, 3, 4, 'more'].map(option => (
                  <button 
                      key={option}
                      onClick={() => handleNumDaysChange(option)}
                      className={(option === 'more' && isCustomDays) || (!isCustomDays && numDays === option) ? 'btn btn-gold' : 'btn btn-outline'}
                      style={{ flex: 1, padding: '0.8rem', minWidth: '80px' }}
                  >
                      {option === 'more' ? 'More than 4 days' : `${option} Day${option > 1 ? 's' : ''}`}
                  </button>
              ))}
          </div>
      </div>

      {/* Step 2 & 3: Events & Crew Config */}
      <div style={{ marginBottom: '3rem' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Clock size={20} color="var(--accent-gold)"/> 2. Schedule & Crew</h3>
        
        {daysConfig.map((day, dIdx) => (
            <div key={day.id} style={{ marginBottom: '2rem', border: '1px solid var(--border-light)', padding: '1.5rem', borderRadius: '12px', background: '#fff' }}>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--accent-gold)' }}>Day {day.id}</h4>
                
                <div style={{ marginBottom: '1.5rem' }}>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.8rem' }}>Select Events for Day {day.id}:</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {EVENTS_LIST.map(eventName => {
                            const isSelected = day.events.some(e => e.name === eventName);
                            return (
                                <button 
                                    key={eventName}
                                    onClick={() => toggleEvent(dIdx, eventName)}
                                    className={isSelected ? 'btn btn-gold' : 'btn btn-outline'}
                                    style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', borderRadius: '20px' }}
                                >
                                    {eventName} {isSelected && <CheckCircle2 size={12} style={{ marginLeft: '4px', display: 'inline' }}/>}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {day.events.length > 0 && (
                    <div style={{ marginTop: '1.5rem' }}>
                        {day.events.map((ev, evIdx) => (
                            <div key={evIdx} style={{ paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-light)' }}>
                                <h5 style={{ fontSize: '1rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>{ev.name}</h5>
                                
                                {/* Time Inputs */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>Start Time</label>
                                        <input type="time" value={ev.startTime} onChange={(e) => updateEventConfig(dIdx, evIdx, 'startTime', e.target.value)} style={{ width: '100%', padding: '0.6rem', border: '1px solid var(--border-light)', borderRadius: '6px' }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>End Time</label>
                                        <input type="time" value={ev.endTime} onChange={(e) => updateEventConfig(dIdx, evIdx, 'endTime', e.target.value)} style={{ width: '100%', padding: '0.6rem', border: '1px solid var(--border-light)', borderRadius: '6px' }} />
                                    </div>
                                </div>

                                {/* Crew Selection */}
                                <div>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.8rem' }}><Users size={14}/> Crew Selection</label>
                                    <div className="crew-grid">
                                        {/* Photographers */}
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', padding: '0.6rem', border: '1px solid var(--border-light)', borderRadius: '6px' }}>
                                            <span style={{ fontSize: '0.8rem' }}>Photographers</span>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <button onClick={() => updateEventConfig(dIdx, evIdx, 'photographers', Math.max(0, ev.photographers - 1))} style={{ width: '24px', height: '24px', background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', borderRadius: '4px', cursor: 'pointer' }}>-</button>
                                                <span style={{ fontSize: '0.9rem', width: '16px', textAlign: 'center' }}>{ev.photographers}</span>
                                                <button onClick={() => updateEventConfig(dIdx, evIdx, 'photographers', ev.photographers + 1)} style={{ width: '24px', height: '24px', background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', borderRadius: '4px', cursor: 'pointer' }}>+</button>
                                            </div>
                                        </div>
                                        {/* Cinematographers */}
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', padding: '0.6rem', border: '1px solid var(--border-light)', borderRadius: '6px' }}>
                                            <span style={{ fontSize: '0.8rem' }}>Cinematographers</span>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <button onClick={() => updateEventConfig(dIdx, evIdx, 'cinematographers', Math.max(0, ev.cinematographers - 1))} style={{ width: '24px', height: '24px', background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', borderRadius: '4px', cursor: 'pointer' }}>-</button>
                                                <span style={{ fontSize: '0.9rem', width: '16px', textAlign: 'center' }}>{ev.cinematographers}</span>
                                                <button onClick={() => updateEventConfig(dIdx, evIdx, 'cinematographers', ev.cinematographers + 1)} style={{ width: '24px', height: '24px', background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', borderRadius: '4px', cursor: 'pointer' }}>+</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        ))}
        {isCustomDays && (
            <button onClick={handleAddDay} className="btn btn-outline full-width" style={{ marginTop: '1rem', padding: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                <Plus size={18} /> Add Day {numDays + 1}
            </button>
        )}
      </div>

      <div style={{ height: '1px', background: 'var(--border-light)', margin: '2rem 0' }}></div>

      {/* Step 4: Outputs */}
      <div style={{ marginBottom: '3rem' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Film size={20} color="var(--accent-gold)"/> 3. Customizable Output</h3>
        
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
      </div>

      <button className="btn btn-gold full-width" style={{ padding: '1.2rem', fontSize: '1.1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }} onClick={handleCheckoutClick}>
        <ShoppingBag size={20} /> Checkout Dream Package
      </button>
      
      <button className="btn btn-outline full-width" style={{ padding: '1rem', fontSize: '1rem', marginTop: '1rem' }} onClick={() => setShowBuilder(false)}>
        Cancel
      </button>

          </div>
      )}

    </div>
  );
}
