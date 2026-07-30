import React, { useEffect, useState } from 'react';

export default function HeartCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, input, select, textarea, .tab-btn, .stack-card, .package-card-v2')) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        transform: `translate3d(${pos.x - 10}px, ${pos.y - 10}px, 0) scale(${isHovered ? 1.3 : 1})`,
        transition: 'transform 0.15s ease-out',
        opacity: pos.x === -100 ? 0 : 1
      }}
    >
      {/* Delicate Small Heart Icon */}
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="#C69B66"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        style={{
          filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.3))'
        }}
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </div>
  );
}
