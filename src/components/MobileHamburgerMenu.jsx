import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function MobileHamburgerMenu({ activePageIndex, onNavigate, onOpenBooking, navItems }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (idx) => {
    onNavigate(idx);
    setIsOpen(false);
  };

  return (
    <div className="mobile-hamburger-wrapper">
      <button 
        className="hamburger-btn"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} color="#C69B66" /> : <Menu size={24} color="#C69B66" />}
      </button>

      {isOpen && (
        <div className="mobile-menu-overlay">
          <ul className="mobile-menu-list">
            {navItems.map((item, idx) => (
              <li 
                key={item.label}
                className={activePageIndex === idx ? 'active' : ''}
                onClick={() => handleNavClick(idx)}
              >
                {item.label}
              </li>
            ))}
            <li className="booking-btn" onClick={() => { onOpenBooking(); setIsOpen(false); }}>
              BOOK NOW
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
