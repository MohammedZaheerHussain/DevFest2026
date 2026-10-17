import React from 'react';

export const Doodles: React.FC = () => {
  return (
    <div aria-hidden className="doodles-container pointer-events-none">
      {/* 1. Asterisk star on top-left */}
      <svg
        className="doodle-star"
        viewBox="0 0 80 80"
        stroke="currentColor"
        strokeWidth="2.5"
      >
        {[0, 30, 60, 90, 120, 150].map((r) => (
          <line
            key={r}
            x1="40"
            y1="4"
            x2="40"
            y2="76"
            transform={`rotate(${r} 40 40)`}
          />
        ))}
      </svg>

      {/* 2. Three Mint circles stacked on top-right */}
      <div className="doodle-dots-column">
        {[0, 1, 2].map((k) => (
          <span key={k} className="doodle-circle" />
        ))}
      </div>

      {/* 3. Wireframe globe on bottom-left */}
      <svg
        className="doodle-globe"
        viewBox="0 0 80 80"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      >
        <circle cx="40" cy="40" r="34" />
        <ellipse cx="40" cy="40" rx="15" ry="34" />
        <path d="M6 40h68M12 22h56M12 58h56" />
      </svg>

      {/* 4. Code brackets mark on bottom-right */}
      <div className="doodle-brackets">
        <span className="bracket-left">{'<'}</span>
        <span className="bracket-right">{'>'}</span>
      </div>
    </div>
  );
};
