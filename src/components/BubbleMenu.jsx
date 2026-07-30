import React from 'react';
import GooeyNav from './GooeyNav';

const navItems = [
  { label: 'HOME', href: '#hero' },
  { label: 'ABOUT', href: '#about' },
  { label: 'GALLERY', href: '#gallery' },
  { label: 'HIGHLIGHTS', href: '#highlights' },
  { label: 'PACKAGES', href: '#packages' },
  { label: 'REACTIONS', href: '#testimonials' },
  { label: 'CONTACT', href: '#contact' },
  { label: 'LEGAL', href: '#legal' }
];

export default function BubbleMenu({ activePageIndex, onNavigate, onOpenBooking }) {
  return (
    <div className="bubble-menu-wrapper">
      <GooeyNav
        items={navItems}
        initialActiveIndex={activePageIndex}
        onNavigate={onNavigate}
        onOpenBooking={onOpenBooking}
        particleCount={15}
        particleDistances={[90, 10]}
        particleR={100}
        animationTime={600}
        timeVariance={300}
      />
    </div>
  );
}
